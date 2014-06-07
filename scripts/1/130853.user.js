// ==UserScript==
// @name          Canli Altin Yorum Silici
// @version 0.0.2
// @description   Canli altin sitesindeki facebook yorumlarini siler
// @include       http://www.canlialtinfiyatlari.com/*
// ==/UserScript==

///html/body/div/table/tbody/tr/td[2]/table/tbody/tr[3]/td/center[2]
alert(3);
var div    = document.body.getElementsByTag("div");
alert(4);
var table1 = div[0].getElementsByTag("table");
alert(5);
var tbody1 = table1[0].getElementsByTag("tbody");
alert(6);
var tr1 = tbody1[0].getElementsByTag("tr");
alert(7);
var td1 = tr1[0].getElementsByTag("td");
alert(8);
var table2 = td1[1].getElementsByTag("table");
alert(9);
var tbody2 = table2[0].getElementsByTag("tbody");
alert(10);
var tr2 = tbody[0].getElementsByTag("tr");
alert(11);
var td2 = tr2[2].getElementsByTag("td");
alert(12);
var center = td2[0].getElementsByTag("center");
alert(13);
var facebook = center[1];
alert(14);
center.removeChild(facebook);
alert(15);

