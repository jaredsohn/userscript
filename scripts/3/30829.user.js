// ==UserScript==
// @name           Torrent Reactor++
// @description    Packed with loads of useful fixes which make this site worthy and safe.
// @include        http://www.torrentreactor.net/*
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)// @version        0.1
// ==/UserScript==
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var loc = location.pathname.substring(1);
if(loc.indexOf("torrents")==0) {
	remove(single("//div[@class='buttons'][2]"))(single("//img[@alt='Secure download']/.."))(single("//img[@alt='Usenet 5x faster downloads']/.."))(single("//img[@alt='Direct downloads']/.."))(single("//a[@href='http://www.torrentprivacy.com/index.php?ref=1']/../.."))(single("//a[.='Get the UseNet Client']/../.."));
	single("//textarea[@name='comment']").style.width = "100%";
} else if(loc=="") {
	remove(single("//div[@class='p']"));
	document.title = "Home";
} else if(loc=="search.php") {
	var first = single("//p[@class='subheader'][2]"), next = first.previousSibling, c;
	while(next) {
		c = next.previousSibling;
		remove(next);
		next = c;
	}
	remove(single("//a[.='Usenet, try it now']/../.."));
	var s = single("//form[@action='/search.php']/table");
	s.style.width = "100%";
	s.parentNode.className = "avg";
	GM_addStyle(".avg input[type='text'] {width:241px!important;} .avg select {width:250px !important;}");
} else if(loc=="browse.php")
	remove(single("//td[@colspan='3']/.."));
remove(single("//a[contains(@href, 'http://links.torrentreactor.net/go.php?id=')]/.."))(single("//a[@href='http://www.nutorrent.com']/.."))($("advert-120"))(single("//a[@href='http://torrentreactornet.ourtoolbar.com']/.."))(single("//a[@href='/adv.php']/.."))(single("//a[@href='http://torrentreactornet.ourtoolbar.com/exe']/.."));
$("kw").setAttribute("style", "background-color: white; padding: 4px 4px 4px 31px; margin-top: -4px; height: 24px; margin-left: -26px; -moz-border-radius: 9px 9px 9px 9px; border: 2px solid; width: 777px;");
var btn = single("//input[@type='image']");
btn.type = "button";
btn.value = "Search";
btn.setAttribute("style", "margin-left: 20px; width: 129px; margin-bottom: 10px; -moz-border-radius: 8px 8px 8px 8px; border: 2px solid red; color: white; background-color: DarkGreen; font-weight: bold; height: 25px;");