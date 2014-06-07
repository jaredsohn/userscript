// ==UserScript==
// @name           Myspace - Date in Messages
// @namespace      http://www.myspace.com/tp_
// @include        http://messaging.myspace.com/*

// ==/UserScript==

 var theInput = document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_bodyTextBox");
 var d = new Date();
 var currYear = d.getFullYear();
 var currMonth = d.getMonth() + 1;
 var currDate = d.getDate();
 var currHour = d.getHours();
 var currMin = d.getMinutes();
 var PM=0;

 if("currHour">"12")
     currHour=currHour-12;

 time = "\n\n\nSent At: \n" + (currHour < 10 ? "0" : "") + currHour + ":" +
     (currMin < 10 ? "0" : "") + currMin + " " +
     currYear + "/" +
     (currMonth < 10 ? "0" : "") + currMonth + "/" +
     (currDate < 10 ? "0" : "") + currDate;
 
 theInput.value = time;
