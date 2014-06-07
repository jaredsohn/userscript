// ==UserScript==
// @name           Mobile01 Today
// @namespace      http://www.mobile01.com/apps
// @description    Highlight threads posted today (not reply)
// @include        http://www.mobile01.com/*
// ==/UserScript==

var alltags = document.getElementsByClassName('topic_reply');
var myToday = new Date();

var mYear = myToday.getFullYear();
var mMonth = leftPadZero(myToday.getMonth()+1);
var mDay = leftPadZero(myToday.getDate());

var tYear, tMonth, tDay;

function leftPadZero(str)  { return (str.length==1) ? '0'+str : str; }

for(var t=0;t<alltags.length;t++){
  
  o=alltags[t];
  mytags = o.getElementsByClassName('bk11');	
  
  for (var j=0;j<mytags.length;j++) {
  
     k = mytags[j];

     tYear = k.innerHTML.substring(0,4);
     tMonth = leftPadZero(k.innerHTML.substring(5,7));
     tDay = leftPadZero(k.innerHTML.substring(8,10));

     if (mYear==tYear&&mMonth==tMonth&&mDay==tDay) {
	   	o.innerHTML='<span style="background-color:#FFFF00" >'+o.innerHTML+'</span>';
	 }
   }
}