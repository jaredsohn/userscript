// ==UserScript==
// @name بيانات اللاعب
// @description سكربت يستخدم لـ إخراج بيانات اللاعب من ملفة الشخصي
// @author Mr.403
// @include http://ae*.tribalwars.ae/game.php*
// ==/UserScript==
// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

var body = document.getElementById("content_value");
var table = body.getElementsByTagName('table')[1];
var player = table.getElementsByTagName('tr')[0].textContent;
var points = table.getElementsByTagName('td')[1].textContent;
var rang = table.getElementsByTagName('td')[3].textContent;
var adv = table.getElementsByTagName('td')[5].textContent;
var ally = table.getElementsByTagName('a')[0].textContent;
var table1 = body.getElementsByTagName('table')[2];
var vil = table1.getElementsByTagName('th')[0].textContent;
var start = vil.indexOf("(") + 1;
var end = vil.indexOf(")");
var village = vil.substring(start, end);
alert	("اللاعب : [player]" + player + "[/player]\n"
		+ "النقاط: " + points + "\n"
		+ "الترتيب : " + rang + "\n"
		+ "أفضل لاعب (المجموع) : " + adv+ "\n"
		+ "القبيلة : " + "[ally]" + ally + "[/ally]" + "\n"
		+ "عدد القرى : " + village);