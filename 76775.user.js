// ==UserScript==
// @name         Old Wikipedia Logo
// @namespace     http://localhost/
// @description   Get the old wikipedia logo back!
// @include      http://*.wikipedia.*/*

// ==/UserScript==
var oldLogo = document.getElementById('p-logo');
var newLogo = document.createElement("div");
newLogo.id = "p-logo";
newLogo.innerHTML = '<a style="background-image: url(http://upload.wikimedia.org/wikipedia/commons/1/12/Wikipedia.png);" href="/wiki/Main_Page" title="Visit the main page"></a>';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);