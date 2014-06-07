// ==UserScript==
// @name           SkinU Reveal
// @namespace      #aVg
// @include        http://*skinu.com/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
window.addEventListener("load", function() {
function single(A, B) {return document.evaluate("." + A, B, null, 9, null).singleNodeValue}
function runScript() {
	var swf = document.getElementById("copyright"), img = new Image();
	if(!swf) return;
	swf = single("//object", swf);
	img.src = "/syncshow/ajaxscripts/ajax_detailed/copyright.php?image=" + single("//param[@name='flashvars']", swf).value.match(/image=([^&]+)/)[1];
	swf = swf.parentNode;
	swf.parentNode.replaceChild(img, swf);
}
runScript();
var jq = unsafeWindow.$,  ajax = jq.ajax;
jq.ajax = function(obj) {
	var succ = obj.success;
	if(obj.url.indexOf("/syncshow/ajaxscripts/")==0) obj.success = function(html) {
		succ(html);
		runScript();
	};
	ajax(obj);
};
}, false);