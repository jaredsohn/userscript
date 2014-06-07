// ==UserScript==

// @name          FB hide remember me

// @namespace     http://www.hipusic.com

// @description   Hide the remember me checkbox on Facebook.

// @include       http*://www.facebook.com/*

// ==/UserScript==

document.getElementById("persist_box").checked = false;