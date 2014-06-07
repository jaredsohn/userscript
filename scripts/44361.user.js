// ==UserScript==
// @name           Mobile01 Today
// @namespace      http://www.mobile01.com/apps
// @include        http://www.mobile01.com/*
// ==/UserScript==

var alltags = document.getElementsByClassName('tablelist forumlist');
var myToday = new Date();

var mYear = myToday.getFullYear();
var mMonth = leftPadZero(myToday.getMonth()+1);
var mDay = leftPadZero(myToday.getDate());

var tYear, tMonth, tDay;

function leftPadZero(str)  { return (str.length==1) ? '0'+str : str; }

for(var t=0;t<alltags.length;t++){
  
  o=alltags[t];
  //mytags = o.getElementsByTagName('p');	
  mytags = o.getElementsByClassName('authur');	
  
  for (var j=0;j<mytags.length;j++) {
  
     k = mytags[j];

     ptags = k.getElementsByTagName('p');
     
     for (var p=0;p<ptags.length;p++) {
        pdate = ptags[p];
  
        tYear = pdate.innerHTML.substring(0,4);
        tMonth = leftPadZero(pdate.innerHTML.substring(5,7));
        tDay = leftPadZero(pdate.innerHTML.substring(8,10));

        if (mYear==tYear&&mMonth==tMonth&&mDay==tDay) {
           pdate.innerHTML='<span style="background-color:#FFFF00" >'+pdate.innerHTML+'</span>';
        }
      }
   }
}