// ==UserScript==
// @name       GMail Auth-Switch In Same Tab
// @namespace  http://fluffypenguin.org
// @version    0.4
// @description  This makes sure that the gmail auth switcher doesn't open a new tab.
// @match    http://mail.google.com/*
// @match    https://mail.google.com/*
// @copyright  Mike Lundy <userscripts@fluffypenguin.org>
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function install() {
    var id = $("#gb");
    if (id.length == 0) {
        setTimeout(install, 1000);
        return;
    }
    var auth = id.find('a[aria-haspopup=true] > span:contains("@")').parent();
    if (auth.length != 1) {
        window.alert("Could not find the auth switcher :(");
        return;
    }
    //console.log($.makeArray(id));
    
    auth.click(function() {
        var a = $('a[href*="mail.google.com/mail/u/"]');
        a.removeAttr('target');
    });
}

$(install)