// ==UserScript==
// @name           tekquest_calendar
// @namespace      tekquest
// @description    hack tekquest calendar
// @include        http://tekquest.tekelec.com:8088/wre/common/html/calendar.html
// ==/UserScript==

//instansiate the Calendar object....

// in firefox, it seems the script 
// "http://tekquest.tekelec.com:8088/wre/common/scripts/I18NCalendarResources.js"
// is executed later than calendar.js
// so bToday is not set.

// hack to paste all code here.

// Javascript Calendar Resources.

setTimeout("calendar=new Calendar();calendar.init();pgload();", 2000);

