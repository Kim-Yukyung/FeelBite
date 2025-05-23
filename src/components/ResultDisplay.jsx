import React from 'react';

function ResultDisplay({ result }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '오늘의 감정 & 음식 추천 🍽️',
        text: result,
        url: window.location.href,
      });
    } else {
      alert('이 브라우저는 공유 기능을 지원하지 않습니다 😥');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full bg-gray-50 p-6 rounded-xl border border-gray-200 shadow space-y-3">
        <h2 className="text-md font-semibold text-rose-600">📋 추천 결과</h2>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">{result}</p>
      </div>
      <button
        onClick={handleShare}
        className="bg-rose-400 hover:bg-rose-500 text-white font-medium py-2 px-6 rounded-full shadow hover:-translate-y-0.5 hover:shadow-md transition duration-200"
      >
        📤 친구에게 공유하기
      </button>
    </div>
  );
}

export default ResultDisplay;
