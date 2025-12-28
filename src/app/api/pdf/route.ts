
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

    // Set viewport to match the design width roughly, or A4 Landscape ratio
    // A4 landscape is approx 1123 x 794 pixels at 96 DPI
    await page.setViewport({
      width: 1123,
      height: 794,
      deviceScaleFactor: 2, // High resolution for better quality
    });

    await page.goto(targetUrl, {
      waitUntil: "networkidle0", // Wait for all network connections to finish
      timeout: 60000,
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: false,
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      // Ensure we capture the print styles
      preferCSSPageSize: true, 
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
