"use client";

import ArxAndUniLogos from "@/components/icons/ArxAndUniLogos";
import HeroLogo from "@/components/icons/heroLogo";
import UniLogo from "@/components/icons/UniLogo";
import SectionHeader from "@/components/SectionHeader";
import Slide from "@/components/Slide";
import React, { useRef, useMemo } from "react";
import PrintButton from "@/components/PrintButton";
import { useSearchParams } from "next/navigation";
import customersData from "@/libs/data/customers_data.json";

export default function UniSeriesPresentation() {
  const contentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const clientName = searchParams.get("client");

  // Load client data from JSON
  // Load client data from JSON
  const clientData = useMemo(() => {
    if (!clientName) {
      // Default data if no client specified
      return {
        customerName: "الهام عوض احمد العزبى",
        units: [
          {
            unitCode: "8",
            unitModel: "محل (9)",
            floor: "-",
            installments: [
              {
                id: 1,
                type: "قسط ربع سنوي",
                date: "-",
                remaining: "61,000",
                discount: "0",
                net: "61,000",
                amount: 61000,
                amountBeforeDiscount: 61000,
                amountDiscount: 0,
              },
              {
                id: 2,
                type: "قسط ربع سنوي",
                date: "-",
                remaining: "61,000",
                discount: "0",
                net: "61,000",
                amount: 61000,
                amountBeforeDiscount: 61000,
                amountDiscount: 0,
              },
              {
                id: 3,
                type: "قسط ربع سنوي",
                date: "-",
                remaining: "61,000",
                discount: "0",
                net: "61,000",
                amount: 61000,
                amountBeforeDiscount: 61000,
                amountDiscount: 0,
              },
              {
                id: 4,
                type: "قسط ربع سنوي",
                date: "-",
                remaining: "61,000",
                discount: "0",
                net: "61,000",
                amount: 61000,
                amountBeforeDiscount: 61000,
                amountDiscount: 0,
              },
            ],
          },
        ],
      };
    }

    const client = customersData.العملاء.find(
      (c) => c.اسم_العميل === clientName
    );

    if (!client || !client.الوحدات) {
      return {
        customerName: clientName,
        units: [],
      };
    }

    return {
      customerName: client.اسم_العميل,
      units: client.الوحدات.map((unit) => ({
        unitCode: (unit as any).الكود || "-",
        unitModel: unit.النموذج,
        floor: (unit as any).الدور || "-",
        installments: unit.الاقساط.map((inst) => ({
          id: inst.رقم_القسط,
          type: inst.نوع_القسط || "-",
          date: inst.تاريخ_الاستحقاق || "-",
          remaining: inst.المبلغ_المتبقي.toLocaleString("en-US"),
          discount: ("قيمة_الخصم" in inst
            ? inst.قيمة_الخصم
            : 0
          )?.toLocaleString("en-US"),
          net: inst.الصافي_بعد_الخصم.toLocaleString("en-US"),
          amount: inst.الصافي_بعد_الخصم,
          amountBeforeDiscount: inst.المبلغ_المتبقي,
          amountDiscount: "قيمة_الخصم" in inst ? inst.قيمة_الخصم : 0,
        })),
      })),
    };
  }, [clientName]);

  const { customerName, units } = clientData;

  return (
    <div
      className="min-h-screen py-8 px-4 print:p-0"
      style={{
        background: "#444",
        fontFamily: "SST Arabic, Arial, sans-serif",
      }}
      dir="rtl"
    >
      <PrintButton contentRef={contentRef} />
      <div
        ref={contentRef}
        id="print-content"
        className="flex flex-col gap-8 max-w-4xl mx-auto print:gap-0 print:mx-0 print:max-w-none"
      >
        {/* Slide 1: Hero - UNI Series */}
        <Slide gradient>
          <div className=" flex items-center justify-center w-full h-[520px]">
            <HeroLogo />
          </div>
        </Slide>

        {/* Slide 2: Welcome Message */}
        <Slide gradient>
          <div className="p-[13px] ">
            <div className="w-full px-[80px] flex border border-white/5 flex-col items-center justify-center h-[520px] text-center">
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

        {/* Slide 3: Early Payment Plan (Per Unit) */}
        {units.map((unit, index) => {
          const totalRemaining = unit.installments
            .reduce((sum, inst) => sum + (inst.amount || 0), 0)
            .toLocaleString("en-US");

          const totalRemainingBeforeDiscount = unit.installments
            .reduce((sum, inst) => sum + (inst.amountBeforeDiscount || 0), 0)
            .toLocaleString("en-US");

          const totalDiscount = unit.installments
            .reduce((sum, inst) => sum + (inst.amountDiscount || 0), 0)
            .toLocaleString("en-US");

          return (
            <Slide key={index} gradient>
              <div className="p-[13px]">
                <div className="border bg-white/5 border-white/5 ">
                  <h2 className="text-white mt-[30px] text-lg font-bold text-center mb-4">
                    كشف السداد المبكر - Early Payment Plan
                  </h2>

                  {/* Customer Info */}
                  <div className="flex px-[25px] justify-between gap-8 mt-[33px] text-sm">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 items-center">
                        <span className="text-[#ffcf57]">اسم العميل:</span>
                        <span className="text-white font-bold">
                          {customerName}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="text-[#ffcf57]">الكود:</span>
                        <span className="text-white font-medium">
                          {unit.unitCode}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 items-center">
                        <span className="text-[#ffcf57]">النموذج:</span>
                        <span className="text-white font-bold">
                          {unit.unitModel}
                        </span>
                      </div>
                      <div className="flex gap-[5px] items-center">
                        <span className="text-[#ffcf57]">الدور:</span>
                        <span className="text-white font-bold">
                          {unit.floor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Table */}
                  <div className="bg-white/5 mt-[10px] overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-white/20 grid border border-white/5 grid-cols-6 gap-2  text-xs text-white font-medium">
                      <div className="text-center border-l border-white/5 h-full py-2  ">
                        م
                      </div>
                      <div className="text-center border-l border-white/5 h-full py-2 ">
                        نوع القسط
                      </div>
                      <div className="text-center border-l border-white/5 h-full py-2 ">
                        تاريخ الاستحقاق
                      </div>
                      <div className="text-center border-l border-white/5 h-full py-2 ">
                        المبلغ المتبقي
                      </div>
                      <div className="text-center text-[#ffcf57] border-l border-white/5 h-full py-2 ">
                        قيمة الخصم
                      </div>
                      <div className="text-center text-nowrap py-2 ps-1 text-[11px] ">
                        الصافي بعد الخصم
                      </div>
                    </div>

                    {/* Table Rows */}
                    {unit.installments.map((row, index) => (
                      <div
                        key={row.id}
                        className={`grid grid-cols-6 gap-2 py-2 px-3 text-xs text-white ${
                          index % 2 === 1 ? "bg-white/10" : ""
                        }`}
                      >
                        <div className="text-center">{row.id}</div>
                        <div className="text-right">{row.type}</div>
                        <div className="text-center">{row.date}</div>
                        <div className="text-center">{row.remaining}</div>
                        <div className="text-center text-[#ffcf57]">
                          {row.discount}
                        </div>
                        <div className="text-center">{row.net}</div>
                      </div>
                    ))}

                    {/* Total Row */}
                    <div className="grid grid-cols-6 gap-2 py-3 px-3 text-xs border-t border-white/20">
                      <div className="col-span-2 text-white font-medium text-right">
                        إجمالي الوحدة :
                      </div>
                      <div className="text-center"></div>
                      <div className="text-center text-white font-medium">
                        {totalRemainingBeforeDiscount}
                      </div>
                      <div className="text-center text-[#ffcf57] font-bold">
                        {totalDiscount}
                      </div>
                      <div className="text-center text-white">
                        {totalRemaining}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slide>
          );
        })}

        {/* Slide 4: Finishing Offers Intro */}
        <Slide gradient>
          <div className="py-20 px-8 text-center">
            <h2 className="text-white text-xl font-medium mb-8">
              علشان تستلم وحدتك وانت مطمن
            </h2>
            <div className="mb-8">
              <p className="text-[#ffcf57] text-4xl font-bold mb-4">وفرنالك</p>
              <p className="text-[#ffcf57] text-xl font-bold">
                عروض تشطيب مدروسة تريحك من أي تفاصيل
              </p>
            </div>
            <p className="text-white text-lg font-medium">
              وتخلي كل حاجة جاهزة على ذوقك
            </p>
          </div>
        </Slide>

        {/* Slide 5: Super Lux Package Details */}
        <Slide gradient>
          <div className="py-6 px-6 bg-white/5">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-lg font-bold text-right mb-6">
                باقة التشطيب ( سوبرلوكس ) للوحدة التجارية
              </h2>
              <UniLogo />
            </div>

            {/* Electrical Works */}
            <SectionHeader>اعمال الكهرباء</SectionHeader>
            <ul className="text-white text-xs text-right py-3 px-4 list-disc list-inside leading-relaxed">
              <li>
                اعمال تشطيب الكهرباء ( خراطيم ابو العز - اسلاك سويدي - مفاتيح
                وبرايز فينوس - مفاتيح قواطع شنايدر - كشافات طوارئ - ساوند سيستم
                ) شامل المصنعيات
              </li>
            </ul>

            {/* Floor Works */}
            <SectionHeader>اعمال الارضيات</SectionHeader>
            <ul className="text-white text-xs text-right py-3 px-4 list-disc list-inside leading-relaxed">
              <li>توريد وتركيب ارضيات سيراميك كليوباترا قطع ليزر 60*60</li>
            </ul>

            {/* Marble & Granite */}
            <SectionHeader>اعمال الرخام والجرانيت</SectionHeader>
            <ul className="text-white text-xs text-right py-3 px-4 list-disc list-inside leading-relaxed space-y-2">
              <li>
                بالمتر الطولي توريد وتركيب درج سلم الوحده الخلفي نيو حلايب
              </li>
              <li>
                بالمتر المربع توريد وتركيب ترابيع + وزر قطعه واحده سلم الوحده
                الخلفي نيو حلايب
              </li>
              <li>
                توريد وتركيب ارضيات وحوائط سيراميك كليوباترا قطع ليزر 60*60 (
                للحمامات والاوفيس والبلكونات )
              </li>
            </ul>
            <SectionHeader>اعمال الدهانات</SectionHeader>
            <div className="text-white text-xs text-right py-3 px-4 leading-relaxed">
              <ul className="list-disc list-inside mb-3">
                <li>
                  تاسيس وتشطيب الحوائط والاسقف ( جيوتن ) بالوان حسب اختيار
                  العميل عباره عن :
                </li>
              </ul>
              <div className="flex flex-wrap gap-4 justify-start text-xs pr-4">
                <span>- وش سيلر مائي مقاوم</span>
                <span>- عدد 2 سكينة معجون اكريليك 900</span>
                <span>- عدد 1 بطانة بلاستيك</span>
              </div>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Super Lux Package Details */}
        <Slide gradient>
          <div className="py-6 px-6 bg-white/5">
            {/* Paint Works */}
            <div className="text-white text-xs text-right py-3 px-4 leading-relaxed">
              <div className="flex flex-wrap gap-4 justify-start text-xs pr-4 mt-2">
                <span>- عدد 3 وش تشطيب بلاستيك</span>
                <span>
                  - عدد 1 سكينه معجون بـــلاسـتيك + عـدد 1 سكـــينه معـــجون
                  مقـــاوم للشــــروخ
                </span>
              </div>
            </div>

            {/* Ceiling Works */}
            <SectionHeader>اعمال الاسقف</SectionHeader>
            <ul className="text-white text-xs text-right py-3 px-4 list-disc list-inside leading-relaxed">
              <li>
                توريد وتركيب اسقف جيبسوم بورد ابيض للاستقبال والغرف والطرقات حسب
                الرسومات والتصميم ( كناوف + صاج بدوي 0.40 + زوايا للثبيت فيشر
                ومسمار )
              </li>
            </ul>

            {/* AC Works */}
            <SectionHeader>اعمال التكييفات</SectionHeader>
            <ul className="text-white text-xs text-right py-3 px-4 list-disc list-inside leading-relaxed">
              <li>اعمال تاسيس التكييفات (نحاس وصرف)</li>
            </ul>

            {/* Pricing Box */}
            <div className="bg-white/20 rounded mt-4 overflow-hidden">
              <div className="flex justify-between items-center py-3 px-4 border-b border-white/20">
                <div className="text-right">
                  <span className="text-white text-xs font-medium">
                    تكلفة تشطيب / المتر المربع
                  </span>
                </div>
                <div className="text-left">
                  <div className="flex items-end gap-1">
                    <span className="text-white text-sm font-bold">5,283</span>
                    <span className="text-white text-xs">
                      جنيه مصرى لكل متر مربع
                    </span>
                  </div>
                  <div className="text-white text-xs mt-1">
                    <span className="text-xs">بالاضافه الى نسبة الاشراف</span>
                    <span className="font-medium mr-1">15%</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#ffe9a6]">
                <div className="text-right">
                  <span className="text-black text-xs font-medium">
                    يصبح الاجمالي
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-black text-sm font-bold">6,076</span>
                  <span className="text-black text-xs">
                    جنيه مصرى لكل متر مربع
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-3 mt-4">
              <div className="bg-white/20 px-3 py-2 text-white text-xs text-center">
                ملحوظات هامه
              </div>
              <ul className="text-white text-xs text-right list-disc list-inside leading-relaxed flex-1">
                <li>
                  الدفعات تكون بناءا على المراحل المعتمده مع العميل و تكون مقدما
                  فى كل مرحله.
                </li>
                <li>مدة التشطيب : من شهر و نصف الى شهرين</li>
                <li>
                  الحساب بالفواتير الفعليه لكل بند بالاضافه الى 15% نسبة
                  الاشراف.
                </li>
              </ul>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Referral Benefits */}
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

        {/* Slide 7: Thank You */}
        <Slide gradient>
          <div className="relative">
            <div className=" px-8 h-[520px] flex flex-col items-center justify-center">
              <p className="text-white text-7xl font-bold mb-12">شكراً</p>
            </div>
            <div className=" flex items-center justify-center absolute bottom-[21px] left-0 right-0">
              <ArxAndUniLogos />
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
}
