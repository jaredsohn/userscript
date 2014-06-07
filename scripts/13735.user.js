// ==UserScript==
// @name          ADVANsCEne Anti-security
// @namespace     uri:opaquepink@gmail.com,2007-11:ADVANsCEne
// @description   Enables the statusbar and right-clicking for the sidebar.
// @include       http://advanscene.com/html/sidfr.php
// @include       http://*.advanscene.com/html/sidfr.php
// ==/UserScript==
// Enable right-clicking, and delete the attribute just to tidy it up.
document.getElementsByTagName('body')[0].setAttribute("oncontextmenu","");
document.getElementsByTagName('body')[0].removeAttribute("oncontextmenu");
// Walk through the menu links and delete their statusbar emptying codes.
var links = document.getElementsByTagName('a');
for (var i=0;i<links.length;i++){
	if (links[i].getAttribute("class")=="menulink"){
		links[i].removeAttribute("onmousedown");
		links[i].removeAttribute("onmouseout");
		links[i].removeAttribute("onmouseover");
	}
}