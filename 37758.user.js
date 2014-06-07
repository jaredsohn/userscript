// ==UserScript==
// @name           Netload.in++
// @namespace      #avg
// @description    Captcha helper, auto-wait and auto-download for netload.in.
// @include        http://*netload.in/*
// @version        0.1.2
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function single(A, B){return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function $(A){return document.getElementById(A)}
var freeBtn = single("//div[@class='Free_dl']/a"), cp = single("//input[@name='captcha_check']");
if (freeBtn)
	location.replace(freeBtn.href);
else if(cp) {
	$("changeDiv").style.display = "none";
	$("downloadDiv").style.display = "inline";
	cp.focus();
	cp.addEventListener("keyup", function(A) {
		this.value = this.value.replace(/[^\d]/g, "");
		if(this.value.length == 4) document.forms[0].submit();
	}, false);
	unsafeWindow.popUnder = new Function();
} else {
	$("downloadDiv").addEventListener("DOMAttrModified", function() {
		var link = single("//a", this);
		link.textContent = "The download is starting... (the location  is contained within this link)";
		location.href = link.href;
	}, false);
}