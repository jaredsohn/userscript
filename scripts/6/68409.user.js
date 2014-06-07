// ==UserScript==
// @name           Facebook - Remove "Home" button
// @namespace      Facebook - Remove "Home" button
// @include        http://*.facebook.com/*
// ==/UserScript==

PageNav = document.getElementById("pageNav");
PageNav.getElementsByTagName("li")[0].style.display = "none";