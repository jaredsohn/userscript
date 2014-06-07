// ==UserScript==
// @name           Ikariam Chat (Ynot)
// @namespace      http://s*.ikariam.*/*
// @description    Um Chat Portugu�s para todos que jogam Ikariam
// @include        http://s*.ikariam.*/*
// ==/UserScript==



var version="1";

var displayedflag = 0;



unsafeWindow.displayshout = function() {

	if(displayedflag == 0) {

		document.getElementById("shoutframe").innerHTML = '<iframe width="200" border="0" frameborder="0" height="100%" src="http://553661.myshoutbox.com/" style="margin-left:0px;"></iframe>';

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

	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:200px;position:absolute;top:0px;left:0px;height:30px;background:url(http://www.picamatic.com/show/2008/08/14/03/812980_211x30.png);background-repeat:no-repeat;">'

	+ 'Ikariam Chat</div>'

	+ '<div id="shoutframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displayshout()">Coloca o rato em cima da frase para carregar o Chat</div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://www.picamatic.com/show/2008/08/14/03/812977_800x3.gif);background-repeat:no-repeat;"></div>';



GM_addStyle("#shoutbar { background:url(http://www.picamatic.com/show/2008/08/14/03/812976_11x596.png); padding-top:33px; width:210px; position:fixed; left:-216px; top:150px; bottom:50px; border:1px black solid; z-index:50;");

GM_addStyle("#shouttab {background:url(http://www.picamatic.com/show/2008/08/14/02/812954_41x154.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; } ");

GM_addStyle("#shouttab:click { left: 0px; } ");

