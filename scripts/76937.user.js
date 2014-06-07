// ==UserScript==
// @name          g-Schedule To Google Calendar
// @namespace     http://userstyles.org
// @description	  g-ScheduleをGoogle Calendarに登録するボタンを表示します
// @author        ry0mura1
// @homepage      http://userscripts.org/users/ry0mura1
// @include       http://g-schedule.com/cgi-bin/g_refer.cgi
// [出欠確認]ボタンで表示される一覧の右側にボタンを表示します。
// 日付がうまく取得できなかった場合はボタンが表示されません
// 時刻がうまく取得できなかった場合や、開始終了が同じ時刻である場合は終日の予定として扱います
// 
// ==/UserScript==
(function() {

var d=document;
var trs = d.getElementsByTagName('body')[0].getElementsByTagName('table')[0].getElementsByTagName('tr');

for(var i=0; i<trs.length; i++) {
  trs[i].appendChild(getButton(trs[i]));
}


function getButton(tr) {
  var newTd = d.createElement('td');

  var tds = tr.getElementsByTagName('td');
  var attend   = tds[0].firstChild.firstChild.data;  // ex) 出席|欠席 など
  var date = tds[1].getElementsByTagName('input')[5].value;   // ex) 04月04(日)
  var timespan = tds[3].firstChild.data;                      // ex) 11:00-13:00
  var title    = encodeURIComponent(tds[5].firstChild.data);  // ex) イベント名
  var location = tds[7].firstChild ? encodeURIComponent(tds[7].firstChild.data) : ''; // ex) 場所
  var details = tds[9].firstChild ? encodeURIComponent(tds[9].firstChild.data) : '';  // ex) 詳細情報

  var datePtn = /([0-1][0-9])[^0-9]*([0-3][0-9])/;
  var dateMatch = datePtn.exec(date);

  var timePtn = /([0-2][0-9]):([0-5][0-9])-([0-2][0-9]):([0-5][0-9])/;
  var timeMatch = timePtn.exec(timespan);

  if(dateMatch==null||dateMatch.length<2) {
    return newTd;
  }

  var year = new Date().getFullYear();

  var gdate = '';
  if(timeSpanAvailable(timeMatch)) {
    var beginMonth = Number(dateMatch[1]);
    var beginDate  = Number(dateMatch[2]);
    var beginHour = Number(timeMatch[1]);
    var beginMin  = Number(timeMatch[2]);
    var endHour = Number(timeMatch[3]);
    var endMin  = Number(timeMatch[4]);
    var beginTime = new Date(year, beginMonth, beginDate, beginHour, beginMin);
    var endTime = carryoutEndTime(beginTime, new Date(year, beginMonth, beginDate, endHour, endMin));
    var gdate = getGoogleTime(beginTime) + '/' + getGoogleTime(endTime);
  } else {
    var dateStr = '' + year + dateMatch[1] + dateMatch[2];
    gdate = dateStr + '/' + dateStr;  // 終日 (ex. 20060415/20060415
  }

  var trp = (attend=='出席') ? 'true' : 'false';

  var hrefparam='?action=TEMPLATE&text=' + title 
            + '&dates=' + gdate
            + '&sprop=name:' + title
            + '&location=' + location
            + '&trp=' + trp
            + '&details=' + details;

  var a = d.createElement('a');
  a.href = 'http://www.google.com/calendar/event' + hrefparam;
  a.target = '_blank';   // is there any better way ?
  var img = d.createElement('img');
  img.src='http://www.google.com/calendar/images/ext/gc_button1_ja.gif';
  img.alt='add g-cal';
  a.appendChild(img);

  newTd.appendChild(a);

  return newTd;
}

function timeSpanAvailable(timeMatch) {
  if(timeMatch!=null||timeMatch.length>4) {
    if(timeMatch[1]!=timeMatch[3] || timeMatch[2]!=timeMatch[4]) {
      return true;  // 開始と終了が違う時刻
    }
  }
  return false;
}

function carryoutEndTime(beginTime, endTime) {
  if(beginTime.getTime() > endTime.getTime()) {
    return new Date(endTime.getTime() + 86400000);  // 86400000 = 1000*60*60*24 (１日後)
  } else {
    return endTime;
  }
}

function get2DigitStr(number) {
  return (number < 10 ? '0' : '') + number;
}

function getGoogleTime(date) {  // 20100515133000Z
  var month = get2DigitStr(date.getUTCMonth());
  var day  = get2DigitStr(date.getUTCDate());
  var hour = get2DigitStr(date.getUTCHours());
  var min  = get2DigitStr(date.getUTCMinutes());
  return '' + date.getUTCFullYear() + month + day + 'T' + hour + min + '00Z';
}

})();
