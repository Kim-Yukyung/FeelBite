const foodByFeeling = {
  '우울': '따뜻한 국물요리(된장국, 미소된장국)이나 달콤한 과일(딸기, 바나나)',
  '스트레스': '마그네슘이 풍부한 견과류(아몬드, 호두)와 다크초콜릿',
  '피곤': '비타민B군이 풍부한 바나나, 고구마, 오트밀',
  '기분 좋아': '상큼한 샐러드나 플레인 요거트, 과일 스무디',
  '불안': '카모마일차, 라벤더차, 따뜻한 닭죽',
  '긴장': '미역국이나 따뜻한 현미밥, 호박죽',
  '짜증': '단백질이 풍부한 두부 요리, 계란찜, 우유',
  '행복': '부드러운 디저트(젤리, 마카롱), 시원한 에이드',
  '혼란': '고구마 스프, 따뜻한 우유, 토스트',
  '외로움': '따뜻한 커피 또는 밀크티, 베이커리류(크루아상, 롤케이크)',
  '무기력': '신선한 채소볶음, 새콤한 유자차, 에너지바',
  '설렘': '딸기 케이크, 레모네이드, 말랑한 젤리',
  '짜게 먹고 싶음': '김치볶음밥, 멸치볶음, 라면',
  '달달한 게 땡김': '초콜릿, 마들렌, 바닐라 아이스크림'
};

export async function getFoodSuggestion(userInput) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  const feeling = Object.keys(foodByFeeling).find((f) => userInput.includes(f));
  const food = foodByFeeling[feeling] || '소화 잘 되는 따뜻한 음식';

  const prompt = `사용자가 "${userInput}"라고 했어요. 추천 음식은 "${food}"입니다. 이 감정 상태를 위로할 수 있는 음식 추천과 따뜻한 설명을 이모지와 함께 2~3문장으로 알려줘.`;
  
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '⚠️ Gemini 응답 형식이 예상과 다릅니다.'
    );
  } catch (error) {
    console.error('❌ Gemini API 오류:', error);
    return '⚠️ 분석 중 오류가 발생했습니다.';
  }
}
