// ==UserScript==
// @name        SMS members finder
// @namespace   https://blog.wtako.coms.hk
// @include     http://forum*.hkgolden.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description Find SMS members on HKGolden and highlight them.
// @version     0.0.1a
// @grant       none
// ==/UserScript==

function locateSMSMembers() {
    $("tr[userid]").each(function () {
        if ($(this).attr("userid") >= 416324) {
            $(this).find("td").css({"background-color": "#888888"});
        }
    });
}

setInterval(function(){locateSMSMembers()}, 1000);