// ==UserScript==
// @name           Chromium status local time
// @namespace      chromium-status
// @description    Changes times on chromium status page from UTC to local time in 12h format (1pm instead of 13:00).
// @match          http://chromium-status.appspot.com/*
// @match          https://chromium-status.appspot.com/*
// @version        0.8
// ==/UserScript==

(function(){var y=', '+new Date().getFullYear(),j={0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'},m={0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'};[].forEach.call(document.querySelectorAll('table[border] td:nth-of-type(2)'),function(el,i){if(i==0){el.width=160;}else{var d,p=el.textContent.split(',');p.splice(1,0,y);d=new Date(p.join(''));el.textContent=j[d.getDay()]+' '+m[d.getMonth()]+' '+(d.getDate()<10?'0':'')+d.getDate()+', '+(d.getHours()>12?(d.getHours()-12==0?'12':d.getHours()-12):(d.getHours()==0?'12':d.getHours()))+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+' '+(d.getHours()>12?'p':'a')+'m';}});}());