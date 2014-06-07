// ==UserScript==
// @name           The YNC - Anti-Plugs
// @namespace      SZG7hVR37BE6r
// @description    Removes Underground Videos and Paid Advertiesments ("Plugs") found within The YNC's content
// @lastupdated    2013-05-23
// @version        1.6
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 6.0.2
// @include        http://www.theync.com/*
// @include        http://theync.com/*
// ==/UserScript==

var allDivs = document.getElementsByTagName('div');
for (var i in allDivs) {
    if (allDivs[i].className == "yncHPRThumbHolder" || allDivs[i].className == "yncHPLThumbHolder") {
        if (RegExp("ugTitle").test(allDivs[i].innerHTML)) {
            allDivs[i].style.display = "none";
        }
        if (RegExp("yncHPThumbStatsPaidAd").test(allDivs[i].innerHTML)) {
            allDivs[i].style.display = "none";
        }
    }
}
