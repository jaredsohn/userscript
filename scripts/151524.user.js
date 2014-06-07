// ==UserScript==
// @name        FurAffinity Message Center Home Link
// @namespace   http://userscripts.org/users/483358
// @include     *.furaffinity.net/*
// @grant       none
// @version     1.1
// ==/UserScript==

var elatester = document.getElementsByTagName("a");
for (var i=0;i<elatester.length;i++) {
	if (elatester[i].textContent.match("No Messages") && elatester[i].href=="") {
		elatester[i].innerHTML="No Messages";
		elatester[i].href="http://www.furaffinity.net/controls/messages/";
	}
}
elatester = document.getElementsByClassName("no-messages");
elatester[0].innerHTML = '<b><i><a href="' + document.URL.replace(/(http\:\/\/[^/]*\.furaffinity\.net\/msg\/(?:submissions|others)).*/g, "$1") + '/">There are no messages to list</a></i></b>';