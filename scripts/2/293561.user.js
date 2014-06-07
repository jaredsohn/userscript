// ==UserScript==
// @name          Hide gliffy
// @namespace     http://redlion.net/flspafford
// @description	  Hide warning about gliffy
// @require  http://code.jquery.com/jquery-1.6.2.js
// @include       /^https?://.*\.atlassian\.net/wiki.*$/
// @grant       none
// ==/UserScript==
//Change Log:

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main ()
{
    //document.title  = 'NOT the!';

    $("div.gliffy-webpanel-footer") .hide ();
}						