// ==UserScript==
// @name           Cleanup: GMail
// @description    Remove unwanted elements from GMail
// @include        http*://*mail.google.com/*mail/*

// ==/UserScript==


// remove labels box
document.getElementById('nb_0').style.display="none";


// remove invites box
document.getElementById('nb_1').style.display="none";
