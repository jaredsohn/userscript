// ==UserScript==
// @name aPOL_Shoutbox
// @description Shoutbox for aPOL Ikariam by fantattoo@qasq
// @version 0.1
// @include http://*.ikariam.*/*
// @author fantattoo&qasq based by whiskers script
// ==/UserScript==


var version="0.1.2";
var displayedflag = 0;


unsafeWindow.displayshout = function() {
if(displayedflag == 0) {
document.getElementById("shoutframe").innerHTML = '<iframe src="http://www.freeshoutbox.net/aPOL" width="300" height="100%" frameborder="0" allowtransparency="true" ></iframe>';
displayedflag = 1;
}
}

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
document.getElementById("shoutbar").style.left="-316px";
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:305px;position:absolute;top:0px;left:0px;height:30px;background:url(http://s14.ikariam.pl/skin/layout/bg_stone.jpg);">'
+ '</div>'
+ '<div id="shoutframe" style="position:absolute;top:3px;bottom:3px;righ:3px;" onmouseover="displayshout()"><center>Najedz kursorem by pokazac Shoutbox aPOL Ikariam</center></div>'

+ '<div style="width:310px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://s14.ikariam.pl/skin/layout/bg_stone.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://s14.ikariam.pl/skin/layout/bg_stone.jpg); padding-top:33px; width:310px; position:absolute; left:-316px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img26.imageshack.us/img26/145/91835775.png); width:39px; height:134px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");