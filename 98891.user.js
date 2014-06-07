// ==UserScript==
// @name           Fix Go To Page
// @namespace      http://www.facepunch.com/
// @include        *facepunch.com/threads/*
// @include        *facepunch.com/forums/*
// ==/UserScript==
if (typeof(google) == 'undefined') {
    ChromeKludge(unsafeWindow.THIS_SCRIPT);
}
else {
    // http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + ChromeKludge + ')(THIS_SCRIPT);'));
    document.head.appendChild(script);
}
function ChromeKludge(towhere) {
    var each = document.getElementsByClassName('pagination');
    for (var i in each) {
        each[i].action = "/"+towhere+".php";
    }
}