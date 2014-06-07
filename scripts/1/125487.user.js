// ==UserScript== 
// @name Google SSL Auto-redirect
// @namespace http://www.hsingchou.info/
// @description Redirect all unencrypted Google search queries and Reader subscriptions to SSL.
// @include http://www.google.*/search*
// @include http://www.google.*/reader*
// ==/UserScript==

var currentURL=document.URL;
currentURL="https"+currentURL.slice(4);
window.location = currentURL;
