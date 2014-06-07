// ==UserScript==
// @name            تغير خط السيرفر العربي & الحقوق محفوظة لخالد
// @author         haDyy
// @description    Changes travian font to tahoma (the coolest arabic font for websites)-غير خط موقع ترافيان إلى خط تاهوما -أجمل خط للمواقع
// @include        http://*.travian.ae/*
// ==/UserScript==

//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}"; 
cssStyle += "h1{font-family:arial;font-size:190%;}"; 
cssStyle += ".p1 label{float:right;}"; 
cssStyle += "#ltbw0{right:284px;}"; 
GM_addStyle(cssStyle);