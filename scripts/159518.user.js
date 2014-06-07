// ==UserScript==
// @name        Automatic BBCode Insertion
// @namespace   fc
// @include     http*://*friendcodes.com/forums/*
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_registerMenuCommand
// ==/UserScript==
function BBSet() {
	GM_setValue("BBCode",prompt("BBCode to insert? (Change this with the Greasemonkey menu)"));
}
if (!GM_getValue("BBCode")) {
	BBSet();
}
GM_registerMenuCommand("ChangeBBCode", BBSet)

if (window.location.href.indexOf("newreply.php") > -1) {
	setTimeout(
		function(){
		
			var targetTextbox = document.getElementsByTagName("textarea")[0];
			
			if (targetTextbox) {
				targetTextbox.value += GM_getValue("BBCode");
			}
			else { debug("Textbox not found"); }
		}
	,500);
}