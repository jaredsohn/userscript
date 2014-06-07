// ==UserScript==
// @name           Lifehacker AU redirect to US site
// @namespace      blurg!
// @description    redirect Lifehacker AU to US site (cause AU version is shit)
// @include        http://www.lifehacker.com.au/
// @include        http://*.lifehacker.com/
// ==/UserScript==

var winL = window.location;

if(winL.host.match('.au')){
    winL.href=winL.href.replace('www.lifehacker.com.au','us.lifehacker.com');
}