// ==UserScript==
// @name           Netflix Instant Default Queue
// @namespace      netflix-instant-default-queue
// @description    Makes the Instant Queue the default queue
// @include        http://www.netflix.com/*
// ==/UserScript==

var li = document.getElementById('qTab');
if (li) {
    var a = li.childNodes[1];
    if (a) {
	a.href = 'http://www.netflix.com/Queue?inqt=wn&lnkctr=queueTab-ELECTRONIC'
    }
}
