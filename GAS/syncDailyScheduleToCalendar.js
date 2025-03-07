function createEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('');
  const data = sheet.getRange('').getValues();
  const calendarId = ''; 
  const calendar = CalendarApp.getCalendarById(calendarId);
  const today = new Date(); // 今日の日付を基準にする

  for (let i = 1; i < data.length; i++) { // 1行目がヘッダーならi=1から開始
    let timeStr = data[i][0]; // 時刻
    let eventName = data[i][1]; // イベント名

    if (!timeStr || !eventName) continue; // 空行をスキップ

    let timeParts = timeStr.split(':'); // "9:00" → ["9", "00"]
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 
                             parseInt(timeParts[0]), parseInt(timeParts[1]));

    calendar.createEvent(eventName, startTime, new Date(startTime.getTime() + 60 * 60 * 1000)); // 1時間のイベント
  }
}

