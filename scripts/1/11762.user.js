// ==UserScript==
// @name           Google Experimental Search Redirect
// @namespace      http://christopherjones.us
// @description    Redirects the search to google's experimental left-hand search page
// @include        http://*.google.*/search?
// ==/UserScript==

var addr = window.location.href;
if(addr.indexOf('&esrch')==-1){
window.location.href = window.location.href.replace(/q=/, '&esrch=RefinementBarLhsGradientPreview&q=');
}
