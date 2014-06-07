// ==UserScript==
// @name           Spam Alliance In-GAme Chat by abcdef
// @version        1.0
// @namespace      abcdef
// @description    This is the official spam allince chat!
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================

var version="1.0";
var displayedflag = 0;

unsafeWindow.displaychat = function() {
	if(displayedflag == 0) {
		document.getElementById("chatframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://www6.shoutmix.com/?sachat" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showchat = function() {
	if(document.getElementById("chatbar").style.left == "-802px")
	{
		document.getElementById("chatbar").style.left = "0px;"
	}
	document.getElementById("chatbar").style.left = "0px;"
}

unsafeWindow.hidechat = function() {
	document.getElementById("chatbar").style.left = "-802px;"
}

vchatbar = document.createElement("div");
vchatbar.setAttribute("id", "chatbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vchatbar);


var wkHTML = '<div id="chattab" onmouseover="showchat()" onclick="hidechat()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://www.cubeupload.com/files/f46600chatbg.png);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/scripts/show/79242">Spam alliance in-game chat by abcdef</a></div>'
	+ '<div id="chatframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaychat()">Mouse over this area to load the chat</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://www.cubeupload.com/files/f46600chatbg.png);background-repeat:no-repeat;"></div>';

GM_addStyle("#chatbar { background:url(http://www.cubeupload.com/files/f46600chatbg.png); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#chatbar:hover { left:0px; }");
GM_addStyle("#chattab { background:url(http://www.cubeupload.com/files/c46000chat.png); width:41px; height:123px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#chattab:hover { cursor: pointer; } ");

document.getElementById("chatbar").innerHTML = wkHTML;

///// End of script /////
