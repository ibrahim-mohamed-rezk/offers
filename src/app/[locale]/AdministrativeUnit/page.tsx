"use client";

import ArxAndUniLogos from "@/components/icons/ArxAndUniLogos";
import HeroLogo from "@/components/icons/heroLogo";
import Slide from "@/components/Slide";
import React, { useRef } from "react";
import PrintButton from "@/components/PrintButton";

// UNI Logo component for the slides
const UniLogo = () => (
  <div className="text-white">
    <p className="text-[24px] font-bold tracking-wider">UNI</p>
  </div>
);

export default function UniSeriesAdministrativePresentation() {
  const contentRef = useRef<HTMLDivElement>(null);
  // Payment plan data
  const paymentData = [
    {
      id: 1,
      type: "قسط ربع سنوي",
      date: "01-12-2025",
      remaining: "266,250",
      discount: "0",
      net: "266,250",
    },
    {
      id: 2,
      type: "قسط ربع سنوي",
      date: "05-03-2024",
      remaining: "266,250",
      discount: "0",
      net: "266,250",
    },
    {
      id: 3,
      type: "قسط ربع سنوي",
      date: "01-12-2025",
      remaining: "266,250",
      discount: "0",
      net: "266,250",
    },
    {
      id: 4,
      type: "قسط ربع سنوي",
      date: "05-03-2024",
      remaining: "266,250",
      discount: "0",
      net: "266,250",
    },
    {
      id: 5,
      type: "قسط ربع سنوي",
      date: "01-12-2025",
      remaining: "266,250",
      discount: "31,300",
      net: "234,950",
      hasDiscount: true,
    },
  ];

  return (
    <div
      className="min-h-screen py-8 px-4 print:p-0"
      style={{
        background: "#444",
        fontFamily: "SST Arabic, Arial, sans-serif",
      }}
    >
      <PrintButton contentRef={contentRef} />
      <div
        ref={contentRef}
        id="print-content"
        className="flex flex-col gap-8 max-w-4xl mx-auto print:gap-0 print:mx-0 print:max-w-none"
      >
        {/* Slide 1: Hero - UNI Series */}
        <Slide gradient>
          <div className="flex items-center justify-center w-full h-[407px]">
            <HeroLogo />
          </div>
        </Slide>

        {/* Slide 2: Welcome Message */}
        <Slide gradient>
          <div className="p-[13px]">
            <div className="w-full px-[80px] flex border border-white/5 flex-col items-center justify-center h-[407px] text-center">
              <h2 className="text-white text-[22px] font-medium mb-6">
                مبسوطين إنك بقيت جزء من عيلة آركس
              </h2>
              <div className="text-white text-[14px] leading-relaxed mt-[36px] font-normal">
                <p>
                  وخطوتك دي بالنسبة لنا أكتر من استلام وحدة دي بداية شراكة طويلة
                  مبنية على ثقة وتقدير متبادل
                </p>
              </div>
              <div className="text-[#ffcf57] text-[14px] font-medium mt-[25px]">
                <p>وعلشان نديك أقصى استفادة من قرارك</p>
                <p className="mt-[10px]">
                  وفرنالك خطة سداد معجلة تديك خصم خاص عند السداد المبكر.
                </p>
              </div>
              <p className="text-white text-[19px] font-medium mt-[64px]">
                كل ما تختار تسبق بخطوة… مكسبك بيزيد
              </p>
            </div>
          </div>
        </Slide>

        {/* Slide 3: Early Payment Plan */}
        <Slide gradient>
          <div className="p-[13px]">
            <div className="border bg-white/5 border-white/5">
              <h2 className="text-white mt-[25px] text-[20px] font-bold text-center mb-4">
                كشف السداد المبكر - Early Payment Plan
              </h2>

              {/* Customer Info */}
              <div className="flex px-[25px] justify-between gap-8 mt-[30px] text-[10px]">
                <div className="flex flex-col gap-[15px]">
                  <div className="flex gap-[5px] items-center">
                    <span className="text-[#ffcf57]">اسم العميل:</span>
                    <span className="text-white font-bold text-[12px]">
                      سوسو محمد فكرى محمد شرف
                    </span>
                  </div>
                  <div className="flex gap-[5px] items-center">
                    <span className="text-[#ffcf57]">القطعة:</span>
                    <span className="text-white font-medium">
                      يونى (8) شمال الجامعة القطعه رقم (27)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                  <div className="flex gap-[5px] items-center">
                    <span className="text-[#ffcf57]">النموذج:</span>
                    <span className="text-white font-bold">محل (5)/(6)</span>
                  </div>
                  <div className="flex gap-[5px] items-center">
                    <span className="text-[#ffcf57]">الدور:</span>
                    <span className="text-white font-bold">الميزانين</span>
                  </div>
                </div>
              </div>

              {/* Payment Table */}
              <div className="mt-[25px] overflow-hidden">
                {/* Table Header */}
                <div className="bg-white/20 h-[33px] grid grid-cols-6 text-[10px] text-white font-medium">
                  <div className="flex items-center justify-center border-l border-white/10">
                    م
                  </div>
                  <div className="flex items-center justify-center border-l border-white/10">
                    نوع القسط
                  </div>
                  <div className="flex items-center justify-center border-l border-white/10">
                    تاريخ الاستحقاق
                  </div>
                  <div className="flex items-center justify-center border-l border-white/10">
                    المبلغ المتبقي
                  </div>
                  <div className="flex items-center justify-center border-l border-white/10 text-[#ffcf57]">
                    قيمة الخصم
                  </div>
                  <div className="flex items-center justify-center text-[9px]">
                    الصافي بعد الخصم
                  </div>
                </div>

                {/* Table Body */}
                <div className="bg-[#d9d9d9]/10">
                  {paymentData.map((row, index) => (
                    <div
                      key={row.id}
                      className={`h-[22px] grid grid-cols-6 text-[10px] text-white ${
                        index % 2 === 1 ? "bg-white/10" : ""
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {row.id}
                      </div>
                      <div className="flex items-center justify-center">
                        {row.type}
                      </div>
                      <div className="flex items-center justify-center">
                        {row.date}
                      </div>
                      <div className="flex items-center justify-center">
                        {row.remaining}
                      </div>
                      <div className="flex items-center justify-center text-[#ffcf57]">
                        {row.discount}
                      </div>
                      <div className="flex items-center justify-center">
                        {row.net}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Row */}
                <div className="h-[34px] grid grid-cols-6 text-[10px] bg-transparent border-t border-white/20">
                  <div className="col-span-2 flex items-center justify-end pr-4 text-white font-medium">
                    إجمالي الوحدة :
                  </div>
                  <div className="flex items-center justify-center"></div>
                  <div className="flex items-center justify-center text-white font-medium">
                    1,331,250
                  </div>
                  <div className="flex items-center justify-center text-[#ffcf57] font-bold">
                    31,300
                  </div>
                  <div className="flex items-center justify-center text-white">
                    1,277,750
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 4: Finishing Offers Intro */}
        <Slide gradient>
          <div className="p-[13px]">
            <div className="w-full px-[80px] flex border border-white/5 flex-col items-center justify-center h-[382px] text-center">
              <h2 className="text-white text-[22px] font-medium">
                علشان تستلم وحدتك وانت مطمن
              </h2>
              <div className="mt-[64px]">
                <p className="text-[#ffcf57] text-[53.514px] font-bold leading-tight">
                  وفرنالك
                </p>
                <p className="text-[#ffcf57] text-[22px] font-bold mt-[20px]">
                  عروض تشطيب مدروسة تريحك من أي تفاصيل
                </p>
              </div>
              <p className="text-white text-[20px] font-medium mt-[64px]">
                وتخلي كل حاجة جاهزة على ذوقك
              </p>
            </div>
          </div>
        </Slide>

        {/* Slide 5: Super Lux Package - Administrative Unit - Part 1 */}
        <Slide gradient>
          <div className="p-[14px]">
            <div className="bg-white/5 w-full mx-auto relative">
              {/* Header with title and UNI logo */}
              <div className="flex justify-between items-start py-[20px] px-[18px]">
                <UniLogo />
                <h2 className="text-white text-[20px] font-bold text-right">
                  باقة التشطيب ( سوبرلوكس ) الوحدة الادارية
                </h2>
              </div>

              {/* Section: اعمال السباكة - with 2-column table */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال السباكة
                </span>
              </div>
              <div className="flex">
                {/* Right side - main content (larger) */}
                <div className="flex-1 py-[12px] px-[18px] text-white text-[10px] text-right leading-[20px]">
                  <p>
                    • اعمال تاسيس المواسير والصرف للحمامات والمطبخ ( ماسورة بى
                    فى سى 3 بوصة - مواسير حرارى تركى - كوع تركى 90 درجة - ليات
                    تغذية 1/2 بوصة )
                  </p>
                  <p>
                    • توريد وتركيب طقم حمام ديورافيت المانى او ما يعادلة ( قاعدة
                    معلقة + شطاف + خلاط - اكسسوارات )
                  </p>
                  <p>• توريد وتركيب سخان كهرباء 50 لتر اوليمبيك او ما يعادلة</p>
                  <p>• توريد و تركيب خلاط حوض GROHE او ما يعادلة</p>
                  <p>• توريد وتركيب حوض رخام صناعى بالكاونتر</p>
                </div>
                {/* Left side - small column with additional items */}
                <div className="w-[150px] bg-white/5 border-r border-white/10 py-[12px] px-[10px] text-white text-[9px] text-right leading-[18px]">
                  <p>• خلاط جروهى - حوض معلق</p>
                  <p>• سيفون ارضى المانى</p>
                  <p>• فلتر مياه 3 مراحل</p>
                  <p>• عداد مياه</p>
                </div>
              </div>

              {/* Section: اعمال الكهرباء */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال الكهرباء
                </span>
              </div>
              <div className="py-[12px] px-[18px]">
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • اعمال تشطيب الكهرباء ( خراطيم - سلك سويدى - مفاتيح وبرايز
                  شنايدر - لوحة توزيع شنايدر - قاطع تيار - طبلون كهرباء )
                </p>
              </div>

              {/* Section: اعمال الارضيات */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال الارضيات
                </span>
              </div>
              <div className="py-[12px] px-[18px]">
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • توريد وتركيب بورسلين ارضيات اسبانى 60*60 او ما يعادلة ( HDF
                  1 متر * 1 متر اختيارى + 45 ج/م اضافى )
                </p>
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • توريد وتركيب وزر MDF او ما يعادلة
                </p>
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • توريد وتركيب سيراميك ارضيات و حوائط الحمام كليوباترا 30*60
                </p>
              </div>

              {/* Section: اعمال المعجون */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال المعجون
                </span>
              </div>
              <div className="py-[12px] px-[18px]">
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • تأسيس وتشطيب المعجون والدهانات ( جوتن ) بالوان حسب اختيار
                  العميل ( سيلر مائى - 3 سكينة معجون - 3 اوجة بلاستيك )
                </p>
              </div>

              {/* Section: اعمال التاسيسات المواد */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال التاسيسات المواد
                </span>
              </div>
              <div className="py-[12px] px-[18px]">
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • اعمال تاسيس التكييفات نحاس - صرف - كهرباء حسب الرسم من عدد 1
                  الى 2 تكييف حسب المساحة مع توفير نقطة كهرباء
                </p>
                <p className="text-white text-[10px] text-right leading-[20px]">
                  • تاسيس نقطة انترنت فى مكان واحد فقط داخل الوحدة مع توفير
                  الفيشة
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Super Lux Package - Administrative Unit - Part 2 */}
        <Slide gradient>
          <div className="p-[14px]">
            <div className="bg-white/5 w-full mx-auto relative">
              {/* Section: اعمال الاسقف */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center mt-[20px]">
                <span className="text-white text-[16px] font-medium">
                  اعمال الاسقف
                </span>
              </div>
              <div className="flex">
                {/* Right side - main content */}
                <div className="flex-1 py-[12px] px-[18px] text-white text-[10px] text-right leading-[20px]">
                  <p>
                    • توريد وتركيب سقف معلق جيبسون بورد للحمام مع عمل فتحات
                    للاضاءة والشفاط
                  </p>
                  <p>• تشطيب السقف المعلق ( سكينة معجون + وش دهان )</p>
                  <p>
                    • توريد وتركيب سقف معلق 60*60 المانى او ما يعادلة مع الهيكل
                    المعدنى للمكتب
                  </p>
                </div>
                {/* Left side - small column */}
                <div className="w-[150px] bg-white/5 border-r border-white/10 py-[12px] px-[10px] text-white text-[9px] text-right leading-[18px]">
                  <p>• كشافات ليد 60*60</p>
                </div>
              </div>

              {/* Section: اعمال الكهرباء ( الاجهزة والتشطيبات ) */}
              <div className="bg-white/20 h-[33px] w-full flex items-center justify-center">
                <span className="text-white text-[16px] font-medium">
                  اعمال الكهرباء ( الاجهزة والتشطيبات )
                </span>
              </div>
              <div className="flex">
                {/* Right side - main content */}
                <div className="flex-1 py-[12px] px-[18px] text-white text-[10px] text-right leading-[20px]">
                  <p>
                    • توريد وتركيب وحدات اضاءة ليد ( اسبوتات ) للحمام حسب
                    التصميم المقدم من الشركة
                  </p>
                  <p>
                    • توريد وتركيب كشافات ليد 60*60 للسقف المعلق حسب المساحة
                  </p>
                  <p>• توريد وتركيب شفاط حمام توشيبا او ما يعادلة</p>
                  <p>• توريد وتركيب جرس باب + انتركم صوت او ما يعادلة</p>
                </div>
                {/* Left side - small column */}
                <div className="w-[150px] bg-white/5 border-r border-white/10 py-[12px] px-[10px] text-white text-[9px] text-right leading-[18px]">
                  <p>• عدد 2 اسبوت ليد</p>
                  <p>• مراية ليد</p>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-white/20 w-full h-[117px] overflow-hidden mt-[20px]">
                {/* Cost per meter row */}
                <div className="flex justify-between items-start px-[16px] pt-[16px]">
                  <div className="flex flex-col gap-[11px] items-start w-[150px]">
                    <div className="flex gap-[4px] items-end text-white">
                      <span className="text-[14px] font-bold">7,667</span>
                      <span className="text-[9.977px]">
                        جنيه مصرى لكل متر مربع
                      </span>
                    </div>
                    <div className="flex gap-[2px] items-start text-white text-right">
                      <span className="text-[9px] font-light">
                        بالاضافه الى نسبة الاشراف
                      </span>
                      <span className="text-[10px] font-medium">15%</span>
                    </div>
                  </div>
                  <span className="text-white text-[10px] font-medium">
                    تكلفة تشطيب / المتر المربع
                  </span>
                </div>

                {/* Divider line */}
                <div className="w-full h-px bg-white/30 mt-[16px]" />

                {/* Total row - yellow background */}
                <div className="bg-[#ffe9a6] h-[47px] w-full flex justify-between items-center px-[16px]">
                  <div className="flex gap-[4px] items-end text-black">
                    <span className="text-[14px] font-bold">8,000</span>
                    <span className="text-[9.977px]">
                      جنيه مصرى لكل متر مربع
                    </span>
                  </div>
                  <span className="text-black text-[10.077px] font-medium">
                    يصبح الاجمالي
                  </span>
                </div>
              </div>

              {/* Notes Section */}
              <div className="flex gap-[8px] items-start justify-center py-[15px]">
                <div className="bg-white/20 w-[60px] h-[42px] flex items-center justify-center">
                  <span className="text-white text-[8px] text-center">
                    ملحوظات هامه
                  </span>
                </div>
                <div className="w-[400px] text-white text-[9px] text-right leading-[18px]">
                  <p>
                    • الدفعات تكون بناءا على المراحل المعتمده مع العميل و تكون
                    مقدما فى كل مرحله.
                  </p>
                  <p>• مدة التشطيب : من شهر و نصف الى شهرين</p>
                  <p>
                    • الحساب بالفواتير الفعليه لكل بند بالاضافه الى 15% نسبة
                    الاشراف.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 7: Referral Benefits */}
        <Slide gradient>
          <div className="py-12 px-8 text-center">
            <div className="mb-8">
              <h2 className="text-white text-xl font-medium mb-3">
                💰 وعلشان مكسبك يكبر معانا 💰
              </h2>
              <p className="text-white text-sm">
                وفرنا لك خصومات ومزايا بتكبر مع كل ترشيح ناجح
              </p>
            </div>

            <div className="flex justify-center gap-12 my-12">
              {/* 3% Discount */}
              <div className="text-center">
                <p className="text-[#ffcf57] text-lg font-bold mb-2">
                  خصـــــــــــم
                </p>
                <p className="text-[#ffcf57] text-7xl font-bold leading-none">
                  3%
                </p>
                <p className="text-white text-xs mt-3 max-w-[140px]">
                  عن كل عميل من طرفك يتم ترشيحه وإتمام الشراء
                </p>
              </div>

              {/* 5% Discount */}
              <div className="text-center">
                <p className="text-[#ffcf57] text-lg font-bold mb-2">
                  خصـــــــــــم
                </p>
                <p className="text-[#ffcf57] text-7xl font-bold leading-none">
                  5%
                </p>
                <p className="text-white text-base mt-3">على الوحدات الجديدة</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-white text-lg font-bold mb-2">
                مكسبك من مكسبنا
              </p>
              <p className="text-white text-sm">
                وشراكتنا مكملة معاك خطوة بخطوة
              </p>
            </div>
          </div>
        </Slide>
        {/* Slide 8: Thank You */}
        <Slide gradient>
          <div className="relative h-[432px]">
            <div className="px-8 h-full flex flex-col items-center justify-center">
              <p className="text-white text-[101.923px] font-bold">شكراً</p>
            </div>
            <div className="flex items-center justify-center absolute bottom-[21px] left-0 right-0">
              <ArxAndUniLogos />
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
}
