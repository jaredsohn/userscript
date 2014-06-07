// Spaces event_alert (c) Netscape 2011
// ==UserScript==
// @name          spaces event_alert
// @description   Attention! Быдлокод.
// @author        Netscape
// @version       1.4
// @include       http://spaces.ru/mysite/*
// ==/UserScript==

var timeReload;

function $( id ) { return document.getElementById( id ); }

function funk(t)
{
    timeReload = t;
}

funk(GM_getValue('time',0));

GM_registerMenuCommand("Off", function(){
GM_setValue('time',0);
window.location.reload(true);
});

GM_registerMenuCommand("5 sec", function(){
GM_setValue('time',5);
window.location.reload(true);
});

GM_registerMenuCommand("30 sec", function(){
GM_setValue('time',30);
window.location.reload(true);
});

GM_registerMenuCommand("1 min", function(){
GM_setValue('time',60);
window.location.reload(true);
});

GM_registerMenuCommand("2 min", function(){
GM_setValue('time',120);
window.location.reload(true);
});

GM_registerMenuCommand("5 min", function(){
GM_setValue('time',300);
window.location.reload(true);
});

GM_registerMenuCommand("Your value", function(){
var v = prompt ("Enter time (in seconds):", "0");
if(v==0) { alert("The script is disabled."); GM_setValue('time',0); }
else
GM_setValue('time',v);
window.location.reload(true);
});

if (timeReload)
{
  c0 = String.fromCharCode(1055); c_0 = "";
  c1 = String.fromCharCode(1046); c_1 = "";
  c1_1 = String.fromCharCode(1091);
  c2 = String.fromCharCode(1051); c_2 = "";
  c3 = String.fromCharCode(1043); c_3 = "";
  c4 = String.fromCharCode(1044); c_4 = "";
  c5 = String.fromCharCode(1060); c_5 = "";
  c5_1 = String.fromCharCode(1086);
  c6 = String.fromCharCode(1044); c_6 = "";
  c6_1 = String.fromCharCode(1072);
  p = new Array();
  s = new Array();
  c = 0;
  theClass = "newevent";
  p = $('navi');
  s = p.getElementsByTagName("*");
  for (var i=0; i<s.length; i++)
  {
    if (s[i].className==theClass) 
    {
      text=s[i-1].innerHTML;
        if (text[0]==c0)
        {
	  c_0 = text[0]+text[1]+text[2]+text[3]+text[4]+s[i].innerHTML+"\n";
        }
        else if (text[0]==c1&&text[1]==c1_1)
        {
	  c_1 = text[0]+text[1]+text[2]+s[i].innerHTML+"\n";
        }
        else if (text[0]==c2)
        {
	  c_2 = text[0]+text[1]+text[2]+text[3]+text[4]+s[i].innerHTML+"\n";
        }
        else if (text[0]==c3)
        {
	  c_3 = text[0]+text[1]+text[2]+text[3]+text[4]+text[5]+text[6]+text[7]+s[i].innerHTML+"\n";
        }
        else if (text[0]==c4)
        {
	  c_4 = text[0]+text[1]+text[2]+text[3]+text[4]+text[5]+text[6]+s[i].innerHTML+"\n";
        }
        else if (text[0]==c5&&text[1]==c5_1)
        {
	  c_5 = text[0]+text[1]+text[2]+text[3]+s[i].innerHTML+"\n";
        }
	else if (text[0]==c6&&text[1]==c6_1)
        {
	  c_6 = text[0]+text[1]+text[2]+text[3]+text[4]+text[5]+text[6]+s[i].innerHTML+"\n";
        }
    }
  }

  if (c_0!="" || c_1!="" || c_2!="" || c_3!="" || c_4!="" || c_5!="" || c_6!="")
    alert("\u041d\u043e\u0432\u044b\u0435 \u0441\u043e\u0431\u044b\u0442\u0438\u044f:\n\n"+c_0+c_1+c_2+c_3+c_4+c_5+c_6);
  delete s;
  delete p;
  if(timeReload)
  setTimeout("window.location.reload(true)",timeReload*1000);
}
