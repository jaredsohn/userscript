// ==UserScript==
// @name           Block Mr Pregnant
// @namespace      http://www.pobox.com/~teridon
// @description    Prevents you from viewing that sick fuck
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

// Toggle this to turn on global logging
var log = false;

var channel = document.getElementById("watch-channel-stats");

var user = document.evaluate("a/text()", channel, null, XPathResult.STRING_TYPE, null).stringValue;


if (log) { GM_log("user is " + user); }

if ( user == "mrpregnant" ) {
    var notice = window.document.createElement( "notice" );
    notice.id = "notice";
    notice.innerHTML = "<center><br><br><h3><font color=red> MR PREGNANT IS A SICK FUCK!</font></h3></center>";
    var base = document.getElementById("baseDiv");
    base.parentNode.appendChild(notice);
    base.parentNode.removeChild(base);
}