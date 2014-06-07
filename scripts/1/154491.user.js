// ==UserScript==
// @name        Gmail Preview Pane Tweaks
// @namespace   http://userscripts.org/users/494426
// @include     http*://mail.google.*/*
// @version     2
// @updateURL   http://userscripts.org/scripts/source/154491.meta.js
// @grant       GM_addStyle
// ==/UserScript==

// Hide the sidebar.
GM_addStyle('.Bs .Bu:nth-child(2), .Bs .Bu:nth-child(3) { display:none; }');

// Adjust the width so that the preview pane does not overflow.
GM_addStyle('.Bs .Bu > .nH.if { margin-right: 4px !important; }');
GM_addStyle('.Bs .Bu > .nH.if > .nH > .nH.hx { min-width: auto !important; width: auto !important; }');

// Remove the horizontal scrollbar from the list pane.
GM_addStyle('.apP .nH, .apN .nH { width: 99.5% !important; }');
