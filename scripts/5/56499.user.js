// ==UserScript==
// @name           jcms mm
// @namespace      kiyo
// @description    autohunt mm
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==

//A HUGE thanks to Wr3cktangle for guiding me along with this one

if (document.getElementById("captcha_session") != null)
{
document.body.innerHTML = document.body.innerHTML + "<br /><br />MythMonger Smart Autohunt detected a captcha. Stopping refresh.<br /><br /><br />";
}
else
{
setTimeout(function() {document.location = 'http://apps.facebook.com/mythmonger/turn.php';} , ((unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds * 1000) + (Math.round(Math.random() * 2) + 1) * 1000));
}