// app/layout.tsx
import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "銀髮族體適能 AI 建議系統",
  description: "由中華國際全方位照護學會提供的 AI 體適能建議平台"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen bg-[#fdfaf7] text-gray-800">
        {/* 一頁式排版，不使用導覽列與 Link */}
        <div className="flex flex-col">
          {/* 頂部標題區塊 */}
          <div className="bg-[#e3d9cf] p-4 flex flex-col items-center">
            <Image src="/logo.jpg" alt="Logo" width={64} height={64} className="rounded-full mb-2" />
            <div className="text-center text-sm font-semibold text-[#6e3b3b] leading-snug mb-4">
              中華國際全方位照護學會<br />AI 評估系統
            </div>
          </div>

          {/* 主內容區 */}
          <main className="flex-1 p-4 md:p-10 w-full">
            {children}

            {/* CTA 標語區塊（取代原學員照片） */}
            <div className="mt-10 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf7-MdDk3BPi9qfvjKSEzaPJG35LFIReIe9xAK_h2Tf_cxIgQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-lg md:text-xl font-bold text-white bg-[#d97f72] hover:bg-[#c46d61] px-6 py-3 rounded-lg shadow transition-all"
              >
                立即報名銀髮健身俱樂部<br />邁向樂活人生 💪
              </a>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
