// ==UserScript==
// @name           MailRefresh
// @namespace      http://userscripts.org/scripts/review/56367
// @include        https://anywhere.exchserver.com/owa/*
// ==/UserScript==

var _interval = 30000;

window.setTimeout(CheckMessages, _interval);

function CheckMessages()
{
    var elm = document.getElementById("lnkHdrcheckmessages");
    
    if (elm)
    {
        location.reload();
    }
    window.setTimeout(CheckMessages, _interval);
}