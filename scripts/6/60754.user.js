// ==UserScript==
// @name           LyricsFreak Fixed
// @namespace      #aVg
// @include        http://www.lyricsfreak.com/*
// @description    Kills non-ABP advertisements, and re-enables selection of lyrics.
// @version        0.1
// ==/UserScript==
(function() {
if(top && top.location != location) return;
document = document.wrappedJSObject;
function single(A) {return document.evaluate("."+A, document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B, C) {
	A = document.evaluate("."+A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
	return loop;
}
var loc = location.pathname.substring(1);
loop("//div[@class='ringtone']", remove)("//iframe", remove);
remove($("songlyrics"))(single("//div[@class='meta_l']"));
$("lyrics").addEventListener("load", function() {
	var lyr = $("iframe_lyrics").contentDocument;
	lyr.oncontextmenu = lyr.onmousedown = lyr.onclick = lyr.onselectstart = lyr.onselect = null;
}, true);
})();