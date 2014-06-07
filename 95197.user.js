// ==UserScript==
// @name          UnAustralianPunch
// @version       2.0
// @namespace     watDoIPutHere?
// @description   Returns subforums where they belong
// @include       http://www.facepunch.com/forums/*
// ==/UserScript==

if (typeof(google) == 'undefined')
{
    ChromeKludge(unsafeWindow.jQuery);
}
else
{
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')(jQuery);'));
    document.head.appendChild(script);
}

function ChromeKludge($)
{
    $('.forums:not(:has(tbody))').remove();
    $('#above_threadlist').before($('.forums:has(tbody)'));
}