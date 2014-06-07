// ==UserScript==
// @name           XAT-TROYANOS todas las pantallas
// @description    Chatbox editado a la tele TROYANOS
// @version        1.3
// @include        http://s3.ikariam.fr/*
// @include        http://ikariam.malisis.net/*
// @include        http://ikariam.ogame-world.com/*
// @author         Alex--
// ==/UserScript==


var version="0.2";

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.right="-75px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.right="-156px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:150px;position:absolute;top:0px;right:-0px;height:90px;">'
	+ '<br/><a style="color: #f10707;"" target="_blank" href="" ></a><br/><a style="color: #f10707;" href="" target="_blank"></a> <br/> <a style="color: #f10707;"  target="_blank" href="" ></a>" </div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;left:4px;""><iframe src="http://troyanos.forumfree.net/?f=6414237" width="700" height="300" frameborder="0" allowtransparency="true"></iframe></div>'

	+ '<div style="width:150px;position:absolute;bottom:0px;right:-100px;height:3px;background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { padding-top:33px; width:150px; position:absolute; right:-100px; top:200px; border:none; z-index:200;");

