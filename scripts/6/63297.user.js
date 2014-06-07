// ==UserScript==
// @name           Lighthouse UI Hacks
// @namespace      planetargon
// @description    Robby's Lighthouse UI hacks
// @include        https://*.lighthouseapp.com/*
// @include        http://*.lighthouseapp.com/*
// ==/UserScript==


// i like to use the search box a lot... not a fan of it being hidden
// TODO: add keyboard hotkey to switch focus to search box
window.document.getElementById('quick-search-bar').style.display = "block";

// open the change notification window, hide the toggle link
window.document.getElementById('select-watchers').style.display = "block";
