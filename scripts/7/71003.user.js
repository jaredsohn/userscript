// ==UserScript==
// @name           Lostpedia++
// @namespace      #aVg
// @description    Makes Lostpedia easier on the brain. Skips intersital ads, removes crap.
// @include        http://lostpedia.wikia.com/*
// @version        0.1.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
function single(A, B) {if(!B) return;return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var loc = location.pathname.substring(1), next = $("skip_ad");
if(next) {
	location.replace(next.href);
	return;
}
if((document.title = document.title.replace(/(?: - )?Lostpedia - The Lost Encyclopedia/, ""))=="") document.title = "Home";
if(loc=="wiki/Main_Page") remove($("spoilerwarning"))(single("/../../../..", $("Legal")));
else if(loc.indexOf("wiki/File:")==0) {
	var img = single("//img", $("file"));
	img.src = img.parentNode.href;
	img.removeAttribute("width");
	img.removeAttribute("height");
}
if(loc.indexOf("wiki/")==0) remove(single("/..", $("te-editanon")));
remove($("wikiaBranding"))($("siteNotice"))($("control_share_feature"))(single("/..", $("fe_sharefeature_img")))($("menu-item_55"))($("monaco_footer"));
GM_addStyle("#sidebar_1{padding-bottom:0}");
})();