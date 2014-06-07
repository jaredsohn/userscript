// ==UserScript==
// @name           4ki timetable
// @namespace      4ki
// @description    Автоматически показывает расписание с сайта http://coop.chuvashia.ru/wml/ на завтрашний день
// @include        http://coop.chuvashia.ru/wml/
// ==/UserScript==


//Впишите сюда код группы
var CODE = "МЭ-81д"; 

document.documentElement.getElementsByTagName("input")[2].value= CODE;
var d = new Date();
d.setDate(d.getDate()+1);
var days = d.getDate();
if (days < 10) {
	days = "0" + days;
}
var mon = d.getMonth();
if (mon < 10) {
	mon = "0" + mon;
}
var date = days+"." + mon+"."+d.getFullYear();
document.documentElement.getElementsByTagName("input")[3].value = date;
document.documentElement.getElementsByTagName("input")[4].click();