// ==UserScript==
// @name           Grepolis Alarm RU (Chrome compatible)
// @namespace      http://userscripts.org/users/483059
// @description    Будильник
// @version        1.0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match          http://*.grepolis.*/game*
// ==/UserScript==
var divh=document.createElement('div');divh.setAttribute("onmouseover","ajuda();");divh.setAttribute("onmouseout","ajuda2();");divh.style.zIndex='10';divh.id='hk';divh.style.position='absolute';divh.style.top='28px';divh.style.left='475px';divh.style.height='32px';divh.style.width='31px';divh.style.backgroundImage='url(http://allykx1.no.sapo.pt/hkpng.png)';divh.style.backgroundColor='#2D5487';document.body.appendChild(divh);$('<div id="menu12" style="z-index:100;position:relative;width:133px;height:20px;"></div>').appendTo('#units_sidebar');$("#menu12").css("background-image","url(http://allykx1.no.sapo.pt/menu19.png)");$('<a id="alarmea" style="color:#FC6;padding-left:10px" href=" " >Будильник</a><br/>').appendTo('#menu12');$('#alarmea').attr('onclick','javascript:$.getScript("http://allykx1.no.sapo.pt/user/alarm.js")');