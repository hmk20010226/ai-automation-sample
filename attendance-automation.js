function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const event = data.events[0];
    const message = event.message.text;

    // AI処理（簡易）
    const aiResponse = callAI(message);

    // スプレッドシート記録
    saveToSheet(message, aiResponse);

    // LINE返信
    replyToLine(event.replyToken, aiResponse);

    return ContentService.createTextOutput("OK");

  } catch (error) {
    Logger.log(error);
    return ContentService.createTextOutput("ERROR");
  }
}


// ■ AI処理（ダミー：ChatGPT/Claudeに置き換え可能）
function callAI(message) {
  // 簡易分類ロジック
  if (message.includes("予約")) {
    return "予約についてですね。詳細を教えてください。";
  } else if (message.includes("料金")) {
    return "料金に関するお問い合わせですね。プランをご案内します。";
  } else {
    return "お問い合わせありがとうございます。内容を確認いたします。";
  }
}


// ■ スプレッドシート保存
function saveToSheet(message, response) {
  const sheet = SpreadsheetApp.openById("スプレッドシートID").getSheetByName("シート1");
  sheet.appendRow([
    new Date(),
    message,
    response
  ]);
}


// ■ LINE返信
function replyToLine(replyToken, message) {
  const url = "https://api.line.me/v2/bot/message/reply";

  const payload = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: message
      }
    ]
  };

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer LINEチャネルアクセストークン"
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
