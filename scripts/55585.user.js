// ==UserScript==
// @name           Fretplay Fixer
// @namespace      #aVg
// @description    Heavily fixes this piece of shit tab site.
// @include        http://www.fretplay.com/tabs/*
// @version        0.1.1
// ==/UserScript==
(function() {
function remove(A) {if(A) A.parentNode.removeChild(A);return remove;}
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
function $(A) {return document.getElementById(A)}
if(location.href.indexOf("printer-friendly.php") != -1) {
	remove(single("//a"));
	return;
}
let(vid = document.embeds[0]) vid.src = vid.src.replace("&autoStart=true","");
remove(single("//div[@class='slide'][4]"))($("footer"))(single("//div[@class='scroller']/../../../.."))(single("//table[@align='right']"))(single("//iframe[@id='bredde728']/.."))(single("//a[@title='Guitar lessons']/.."));
document.getElementById("content_container").scrollIntoView(true);
document.title = document.title.substring(0, document.title.length - 20);
})();