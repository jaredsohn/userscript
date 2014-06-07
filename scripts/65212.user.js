// ==UserScript==
// @name           4shared Folder View Improver
// @namespace      #aVgs
// @description    Improves the folder view.
// @include        http://www.4shared.com/dir/*
// @version        0.1.1
// @license        Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
remove(single("/..", $("folderadsoverall")))($("arPublisher"))(single("//td[@class='footer']/.."))(single("//td[@class='note']"));
unsafeWindow.selectAllOrNone();
var click = document.createEvent("MouseEvents");
click.initEvent("click", true, true);
single("//img[@alt='Links']/..").dispatchEvent(click);
unsafeWindow.selectAllOrNone();
loop("//input[@readonly or @disabled]", function() {
	this.removeAttribute("readonly");
	this.removeAttribute("disabled");
});
document.title = "Share Folder - " + document.title.substring(57);
single("//td[@class='caption']").textContent = "Viewing folder \"" + document.title.substring(15) + "\"";
})();