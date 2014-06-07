// ==UserScript==
// @name           HootSuite - Disable "Wake Up" v0.2
// @namespace      CRD
// @description    Disables the "wake up" function in HootSuite.
// @include        http://hootsuite.com/*
// ==/UserScript==

if( navigator.userAgent.indexOf('Firefox') > -1 )
{
    // reset timer every 20 mins
    if( typeof unsafeWindow.resetUserInactiveTimer != 'undefined' )
        setInterval( function() { unsafeWindow.resetUserInactiveTimer(); }, 1200000 ); 
}
else
{
    var s = document.createElement('script');
    s.innerHTML = 'setInterval( function() { resetUserInactiveTimer(); }, 1200000 );';
    document.body.appendChild(s);
}