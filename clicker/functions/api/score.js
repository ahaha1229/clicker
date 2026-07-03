// 注意: この簡易コードはメモリ上に一時保存するため、
// Cloudflareのサーバーが再起動するとスコアがリセットされます（お試し用です）
let rankings = [
  { username: "伝説のプログラマ", score: 999 },
  { username: "初心者キラー", score: 100 }
];

export async function onRequestGet() {
  // スコアの高い順に並び替えて上位10件を返す
  const topScores = rankings.sort((a, b) => b.score - a.score).slice(0, 10);
  return new Response(JSON.stringify(topScores), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost(context) {
  const data = await context.request.json();
  
  if (data.username && typeof data.score === 'number') {
    rankings.push({ username: data.username, score: data.score });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
