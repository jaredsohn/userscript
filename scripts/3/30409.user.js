// ==UserScript==
// @name           realitatea.v0.1
// @namespace      http://userscripts.org/users_gmtro
// @include        http://www.realitatea.net/
// @include        http://www.realitatea.net/*
// ==/UserScript==

// recomandat a se utiliza cu una din extensiile Adbloc
// pagina principala
// banner forum -->out
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV { display: none; }");
// cele mai importante stiri -->out!
GM_addStyle("#box_important_news { display: none; }");
// topuri realitatea tv --> out!
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > DIV:first-child + DIV > DIV > A:first-child + DIV + DIV + SCRIPT + DIV + DIV + DIV + DIV {display: none;}");
// reclama Money channel --> out!
GM_addStyle(".promo300 { display: none; }");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV {display: none;}");
//mobinews --> out!
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > DIV:first-child + TABLE + DIV + OBJECT + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV {display: none;}");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > UL {display:none;}");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > DIV:first-child + TABLE + DIV + OBJECT + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV {display: none;}");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > UL { display: none; }");
// tabel de link-uri -->out!
GM_addStyle(".footerRC {display:none;}");
// reclame realitatea --> out!
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV { display: none; }");
GM_addStyle(".promo728 {height:0px;!important}");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > OBJECT {Display: none; height:0px;}");
GM_addStyle(".promo160 {display:none; height:0px;!important}");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV + DIV > OBJECT {Display: none; height:0px;}");
// resize fereastra video
var d = document.getElementById("box_video_news"); 
d.setAttribute("style", "overflow: auto; height: 400px;");
// redefineste spatiul intre rubrici pe dreapta
GM_addStyle(".right_col_spacer {height:3px;!important}");
// pagini din diverse sectiuni
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV > DIV:first-child {display : none; height : 0px; }");
GM_addStyle("#mainBody > DIV:first-child + DIV + DIV + DIV + DIV + DIV + DIV + DIV {display : none; height : 0px; }");
// articole citite --> partial out!
/*
var x_all = document.getElementsByTagName('*');
for (var i = 0; i < x_all.length; i++) {
    element = all[i];
    if (element.nodeName == 'col288') {
	   element.setAttribute("width","100px");
   } 
}
//Create an array 
var allPageTags = new Array(); 
function doSomethingWithClasses(theClass) {
//Populate the array with all the page tags
var allPageTags=document.getElementsByTagName("*");
//Cycle through the tags using a for loop
for (i=0; i<allPageTags.length; i++) {
//Pick out the tags with our class name
if (allPageTags[i].className==theClass) {
//Manipulate this in whatever way you want
allPageTags[i].style.width='100px';
}
}
var dd = document.doSomethingWithClasses(col288);
dd.setatribute("width","100px");
*/