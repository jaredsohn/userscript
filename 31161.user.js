// ==UserScript==
// @name           IVV chat
// @namespace      http://s2.ba.ikariam.com/*
// @description    chat (popravljen refresh bug) stavljen novi chat koji pamti napisano
// @include        http://s2.ba.ikariam.com/*
// @include        http://s2.ba.ikariam.com
// ==/UserScript==


var version="1";

var displayedflag = 0;



unsafeWindow.displayshout = function() {

	if(displayedflag == 0) {

		document.getElementById("shoutframe").innerHTML = '<iframe width="200" border="0" frameborder="0" height="100%" src="http://552932.myshoutbox.com/" style="margin-left:0px;"></iframe>';

		displayedflag = 1;

	}

}




unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";

}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-216px";	

}





vshoutbar = document.createElement("div");

vshoutbar.setAttribute("id", "shoutbar");



var body = document.getElementsByTagName("body");



body[0].appendChild(vshoutbar);




document.getElementById("shoutbar").innerHTML ='<div id="shouttab" ondblclick="showshout()" onclick="hideshout()"><a style="height:75%;width:80%;"></a></div>'

	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:200px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img444.imageshack.us/img444/7013/backshoutsv0.png);background-repeat:no-repeat;">'

	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://ivv.forumi.hr/">In vino veritas</a></div>'

	+ '<div id="shoutframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displayshout()">Mouse over this area to load the shoutbox</div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://img403.imageshack.us/img403/5998/shoutbarbgbotly1.gif);background-repeat:no-repeat;"></div>';



GM_addStyle("#shoutbar { background:url(http://img254.imageshack.us/img254/7359/shoutrightxi1.png); padding-top:33px; width:210px; position:fixed; left:-216px; top:150px; bottom:50px; border:1px black solid; z-index:50;");

GM_addStyle("#shouttab {background:url(http://img341.imageshack.us/img341/9650/shouttabxo0.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; } ");

GM_addStyle("#shouttab:click { left: 0px; } ");

