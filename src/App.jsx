import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl border border-rose-100 space-y-6">
        <h1 className="text-3xl font-bold text-center text-rose-500 relative">
          FeelBite
          <span className="block w-6 h-1 bg-rose-400 mx-auto mt-1 rounded"></span>
        </h1>
        <InputForm setResult={setResult} setLoading={setLoading} />
        {loading && (
          <p className="text-center text-rose-400 animate-pulse">🍽️ 추천 생성 중입니다...</p>
        )}
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default App;
