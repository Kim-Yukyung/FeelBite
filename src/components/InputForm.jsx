import React, { useState } from 'react';
import { getFoodSuggestion } from '../api/gemini';

function InputForm({ setResult, setLoading }) {
  const [input, setInput] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) {
      setResult('⛔ 감정 상태를 입력해주세요.');
      return;
    }

    setLoading(true);
    setResult('');
    try {
      const res = await getFoodSuggestion(input);
      setResult(res);
    } catch (error) {
      setResult('⚠️ 음식 추천 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none shadow"
        rows="4"
        placeholder="지금 기분이나 감정 상태를 간단히 적어주세요 :) (예: 오늘 우울해요)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        onClick={handleAnalyze}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-full shadow transition-all"
      >
        감정 기반 음식 추천받기
      </button>
    </div>
  );
}

export default InputForm;
