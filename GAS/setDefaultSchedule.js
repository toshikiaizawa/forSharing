function main() {
  const calendar = CalendarApp.getCalendarById(''); // 自分のカレンダー
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('random');

  const date = new Date(); // 今日の日付
  const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0);  // 9:00
  const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 22, 0); // 22:00

  // 15分刻みでC5から計算（C5が0番目）
  const slotCount = ((22 - 9) * 4); // 13時間 * 4スロット
  const startRow = 5; // C5
  for (let i = 0; i < slotCount; i++) {
    sheet.getRange(startRow + i, 3).setValue(''); // C列の値を初期化
  }

  const events = calendar.getEvents(startTime, endTime);

  for (const event of events) {
    const eventStart = event.getStartTime();
    const eventEnd = event.getEndTime();

    // イベントが対象時間内にあるかチェック
    const clampedStart = new Date(Math.max(eventStart.getTime(), startTime.getTime()));
    const clampedEnd = new Date(Math.min(eventEnd.getTime(), endTime.getTime()));

    let slotStartIndex = Math.floor((clampedStart.getHours() - 9) * 4 + clampedStart.getMinutes() / 15);
    let slotEndIndex = Math.ceil((clampedEnd.getHours() - 9) * 4 + clampedEnd.getMinutes() / 15);

    // 範囲外を除外
    slotStartIndex = Math.max(0, slotStartIndex);
    slotEndIndex = Math.min(slotCount, slotEndIndex);

    for (let i = slotStartIndex; i < slotEndIndex; i++) {
      sheet.getRange(startRow + i, 3).setValue(event.getTitle());
    }
  }
}

