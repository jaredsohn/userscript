// ==UserScript==
// @name     _Gaydar logout and in
// @include  http://gaydar.co.uk/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a major design
    change introduced in GM 1.0.
    It restores the sandbox.
*/

//--- Note that the contains() text is case-sensitive.
var TargetLink          = $("a:contains('Sign Out')")

if (TargetLink  &&  TargetLink.length) 
    window.location.href    = TargetLink[0].href

waitForKeyElements ("#loginButton", clickTargetButton);

function clickTargetButton (jNode) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('click', true, true);
    jNode[0].dispatchEvent (clickEvent);
}

//--- Reload after 1 hour (1000 * 60 * 60 milliseconds)
setTimeout (location.reload, 1000 * 60 * 60);
