// ==UserScript==
// @name           Elvira
// @namespace      http://userscripts.org/users/62663
// @include        http://elvira.mav-start.hu/elvira.dll/xslms/*
// ==/UserScript==

var mentr = document.getElementById('menetrend').childNodes[1]
for (i=1;i<mentr.rows.length;i++) {
  if (mentr.rows[i].cells[4].textContent.indexOf(':') != -1 && mentr.rows[i].cells[2].textContent != mentr.rows[i].cells[4].textContent) {
   if (mentr.rows[i].cells[2].textContent.replace(':','') > mentr.rows[i].cells[4].textContent.replace(':','')) mentr.rows[i].cells[4].childNodes[0].style.color = 'blue'
 }
  if (mentr.rows[i].cells[5].textContent.indexOf(':') != -1 && mentr.rows[i].cells[3].textContent != mentr.rows[i].cells[5].textContent) {
   if (mentr.rows[i].cells[3].textContent.replace(':','') > mentr.rows[i].cells[5].textContent.replace(':','')) mentr.rows[i].cells[5].childNodes[0].style.color = 'blue'
 }
}