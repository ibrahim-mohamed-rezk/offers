
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Set viewport to match the slide dimensions exactly
    await page.setViewport({
      width: 596,
      height: 520,
      deviceScaleFactor: 2, // High resolution for better quality
    });

    await page.goto(targetUrl, {
      waitUntil: "networkidle0", // Wait for all network connections to finish
      timeout: 60000,
    });

    // Count actual slides to limit pages
    const slideCount = await page.evaluate(() => {
      const slides = document.querySelectorAll("#print-content > div");
      return slides.length;
    });

    console.log(`Detected ${slideCount} slides`);

    // Inject additional CSS to ensure no extra pages
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `
        @media print {
          #print-content > div:last-child::after {
            content: "";
            display: none !important;
          }
          body::after, html::after {
            content: "";
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    });

    // Generate PDF with explicit page range
    const pdfBuffer = await page.pdf({
      width: "596px",
      height: "520px",
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      displayHeaderFooter: false,
      omitBackground: false,
      // Ensure we capture the print styles and respect CSS @page rules
      preferCSSPageSize: true,
      // Explicitly limit to only the slides we have
      pageRanges: `1-${slideCount}`,
    });

    await browser.close();

    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="presentation.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (browser) await browser.close();
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(error) },
      { status: 500 }
    );
  }
}
