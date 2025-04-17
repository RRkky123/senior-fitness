"use client";

import { useState } from "react";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    chairStandCount: "",
    walkSpeed: "",
    gripStrength: "",
    painArea: "",
    medicalHistory: "",
    exerciseHabit: "",
  });

  const [sections, setSections] = useState<{
    focus: string[],
    frequency: string[],
    caution: string[]
  } | null>(null);

  const [aiMessage, setAiMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const grip = parseFloat(formData.gripStrength);
    const chairStand = parseInt(formData.chairStandCount);
    const walkSpeed = parseFloat(formData.walkSpeed);
    const hasExercise = formData.exerciseHabit === "有";

    const focus: string[] = [];
    const frequency: string[] = [];
    const caution: string[] = [];

    if (!isNaN(grip) && grip < 18) {
      focus.push("手部與前臂肌群");
    }
    if (!isNaN(chairStand) && chairStand < 12) {
      focus.push("下肢肌力與平衡控制");
    }
    if (!isNaN(walkSpeed) && walkSpeed > 6) {
      focus.push("步態與下肢穩定性");
    }

    if (!hasExercise) {
      frequency.push("每週進行 2~3 次阻力訓練，每次 30 分鐘，並搭配暖身及緩和運動共計90分鐘");
      frequency.push("可採用隔日訓練，從彈力帶或低阻力訓練設備開始");
    } else {
      frequency.push("持續訓練頻率，可逐步增加強度");
    }

    if (formData.medicalHistory.includes("骨質疏鬆")) {
      caution.push("避免彎腰扭轉、負重深蹲等高衝擊動作，建議緩慢增加訓練強度");
    }
    if (formData.painArea) {
      caution.push("避免加劇疼痛區域，並諮詢專業調整動作");
    }

    if (focus.length === 0) {
      focus.push("建議維持全身性阻力訓練");
    }
    if (frequency.length === 0) {
      frequency.push("每週訓練 2~3 次，每次 20~30 分鐘，並搭配暖身及緩和運動共計90分鐘");
    }
    if (caution.length === 0) {
      caution.push("請保持暖身、緩和並視情況調整強度");
    }

    const gptExplanation = `
依據您提供的數據分析如下：
- 握力 ${grip} kg，略低於建議值，手部與前臂需加強。
- 坐姿起立 ${chairStand} 次，建議進行下肢強化訓練。
- 行走時間 ${walkSpeed} 秒，應加強下肢穩定與步態控制。
請循序漸進開始訓練，注意安全與姿勢。`;

    setSections({ focus, frequency, caution });
    setAiMessage(gptExplanation);

    // 資料寫入 FormSubmit
    try {
      const res = await fetch("https://formsubmit.co/ajax/9a69d62c142a33e72ea439ab0fe6a502", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      setSubmitStatus(result.success ? "✅ 已送出表單至信箱！" : "⚠️ 送出失敗");
    } catch (error) {
      console.error(error);
      setSubmitStatus("⚠️ 發生錯誤，請稍後再試");
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">📝 銀髮族 AI 體適能評估</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-6 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" placeholder="姓名" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="age" placeholder="年齡" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="height" placeholder="身高 (cm)" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="weight" placeholder="體重 (kg)" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="chairStandCount" placeholder="30秒坐姿起立次數" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="walkSpeed" placeholder="四公尺行走時間（秒）" className="border p-2 rounded w-full" onChange={handleChange} />
          <input name="gripStrength" placeholder="上肢握力（kg）" className="border p-2 rounded w-full" onChange={handleChange} />
        </div>
        <textarea name="painArea" placeholder="疼痛或活動受限部位" className="border p-2 rounded w-full" onChange={handleChange} />
        <textarea name="medicalHistory" placeholder="疾病史（如：高血壓、糖尿病）" className="border p-2 rounded w-full" onChange={handleChange} />
        <select name="exerciseHabit" className="border p-2 rounded w-full" onChange={handleChange}>
          <option value="">是否有運動習慣？</option>
          <option value="有">有</option>
          <option value="無">無</option>
        </select>
        <button type="submit" className="bg-[#A85E3B] text-white px-4 py-2 rounded hover:bg-[#8b4f33]">
          ✅ 產生建議
        </button>
        {submitStatus && <p className="text-sm mt-2 text-gray-600">{submitStatus}</p>}
      </form>

      {sections && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#fef9f5] border border-orange-200 p-4 rounded">
            <h2 className="font-semibold mb-2 text-[#A85E3B]">📌 訓練重點</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {sections.focus.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-[#f3f9f3] border border-green-200 p-4 rounded">
            <h2 className="font-semibold mb-2 text-green-700">⏰ 頻率與方式</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {sections.frequency.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-[#fffdf2] border border-yellow-200 p-4 rounded">
            <h2 className="font-semibold mb-2 text-yellow-700">⚠️ 注意事項</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {sections.caution.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}

      {aiMessage && (
        <div className="bg-[#f2f1ff] border border-purple-200 mt-6 p-4 rounded">
          <h2 className="text-md font-semibold mb-2 text-purple-700">🧠 AI 解釋說明</h2>
          <p className="text-sm text-gray-800 whitespace-pre-line">{aiMessage}</p>
        </div>
      )}
    </div>
  );
}
