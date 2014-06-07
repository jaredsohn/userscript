// ==UserScript==
// @name           Merriam-Webster++
// @namespace      #aVg
// @description    Your favorite dictionary, minus the bullshit.
// @include        http://www.merriam-webster.com/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function $(A) {return document.getElementById(A)}
function single() {if(arguments.length==2 && !arguments[1]) return;return document.evaluate("." + arguments[0], arguments[1] || document.body, null, 9, null).singleNodeValue}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B(A.snapshotItem(I));
	return loop
}
var loc = location.pathname.substring(1);
function remove(A) {console.log(A);if(A) A.parentNode.removeChild(A);return remove}
GM_addStyle("td.left_col div.logo {height:129px;width:160px;} .logo a {display:block;max-height:140px;overflow:hidden} body{background-color:#1E41B7} .search_bar {background:#E7EFFF!important;text-align:center} div.search_bar form  {padding-left:0} td.right_col div.page_content {margin-right:0} body.page.search.dictionary div.page_content {background:none;padding-top:0}");
remove(single("//div[@class='hnav_bar']"))($("editors-picks-promo"))($("google_creative_4"));
loop("//a[.='Premium Services']/..", remove)("//a[@href='/info/advertising.htm']/..", remove);
if(loc.indexOf("dictionary/")==0) {
	var share = single("/form/div", $("sharethis"));
	for(var i = 35; i>=0; --i) share.removeChild(share.firstChild);
	document.title = document.title.substring(0, document.title.length - 63);
} else if(loc.indexOf("thesaurus/")==0) {
	document.title = document.title.substring(0, document.title.length - 59) + "[Thesaurus]";
	remove(single("//form[@name='highlight_all']/.."));
}