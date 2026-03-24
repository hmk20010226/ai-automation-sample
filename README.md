## ■ 強み（できること）
業務フロー設計からAI連携・自動化まで一貫して構築可能

# AI業務自動化サンプル

## ■ 概要
LINE・AI・スプレッドシートを連携し、業務フロー全体を自動化する仕組みを構築

## ■ できること
・LINEからの入力を自動取得  
・AIによる内容分類・処理  
・スプレッドシートへの自動記録  
・条件に応じた自動返信  

## ■ 使用ツール
・ChatGPT / Claude / Gemini  
・Google Apps Script（GAS）  
・LINE Messaging API  

## ■ 構成
LINE → Webhook → GAS → AI処理 → スプレッドシート保存 → 自動返信  
※実際の業務で使用することを想定した設計

## ■ 実装イメージ（GASサンプル）
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const message = data.events[0].message.text;

  // AI処理（簡易例）
  const aiResponse = callAI(message);

  // スプレッドシートに保存
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("log");
  sheet.appendRow([new Date(), message, aiResponse]);

  // LINE返信
  replyToLine(data.events[0].replyToken, aiResponse);
}

function callAI(text) {
  // ChatGPTやClaude APIを想定
  return "AI処理結果：" + text;
}

function replyToLine(token, message) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const payload = {
    replyToken: token,
    messages: [{ type: "text", text: message }]
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(payload)
  });
}
