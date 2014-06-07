// ==UserScript==
// @name           Ikariam Simulator Tab
// @version        0.1
// @namespace      EnigmaBrand
// @description    This extension adds a tab on the left side of the game browser game Ikariam located at http://ikariam.org or http://ikariam.com that will slide out to reveal the Ikariam Simulator located at http://ikariam.immortal-nights.com/ikafight/index.php?battleType=land when moused over. To close the window that slides out, simply click on the Tab again!
// @Autor          EnigmaBrand - I just edit it, to make it work whit the simulator. Not every player will find the wiki to usefull, especially the experience players.(Taz2781)
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================

//
// This extension was made by EnigmaBrand.
//

var version=" v0.1";
var displayedflag = 0;

unsafeWindow.displaysimulator = function() {
	if(displayedflag == 0) {
		document.getElementById("simulatorframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://ikariam.immortal-nights.com/ikafight/" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showsimulator = function() {
	if(document.getElementById("simulatorbar").style.left == "-802px")
	{
		document.getElementById("simulatorbar").style.left = "0px;"
	}
	document.getElementById("simulatorbar").style.left = "0px;"
}

unsafeWindow.hidesimulator = function() {
	document.getElementById("simulatorbar").style.left = "-802px;"
}

vsimulatorbar = document.createElement("div");
vsimulatorbar.setAttribute("id", "simulatorbar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vsimulatorbar);


var wkHTML = '<div id="simulatortab" onmouseover="showsimulator()" onclick="hidesimulator()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://ikariamwikibar.googlepages.com/wikibar_bgtop.gif);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;">Ikariam Simulator Bar'+version+'</a></div>'
	+ '<div id="simulatorframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaysimulator()">Mouse over this area to load the simulator</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://ikariamwikibar.googlepages.com/wikibar_bgbot.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#simulatorbar { background:url(http://ikariamwikibar.googlepages.com/wikibar_bgmid.gif); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#simulatorbar:hover { left:0px; }");
GM_addStyle("#simulatortab { background:url(http://i26.tinypic.com/296m051.gif); width:26px; height:100px; position:absolute; right:-26px; top:4px; } ");
GM_addStyle("#simulatortab:hover { cursor: pointer; } ");

document.getElementById("simulatorbar").innerHTML = wkHTML;

///// End of script /////