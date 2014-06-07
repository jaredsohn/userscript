// ==UserScript==
// @name          Cleaner GMail
// @version       0.02
// @description   Clean interface for GMail!
// @author 	      ASHKOOL (http://www.ashkool.com/)
// @grant         GM_addStyle
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==

// Hide the side ads
GM_addStyle('.Bs .Bu:nth-child(2) { display:none; }');
GM_addStyle('.Bs .Bu:nth-child(3) { display:none; }');
GM_addStyle('.PS { display:none; }');

// Adjust the width so that the preview pane does not overflow.
GM_addStyle('.Bs .Bu > .nH.if { margin-right: 4px !important; }');
GM_addStyle('.Bs .Bu > .nH.if > .nH > .nH.hx { min-width: auto !important; width: auto !important; }');

// Remove Google Bar & adjust positions
GM_addStyle('.qp { position:absolute !important; }'); // Reposition Google Bar
GM_addStyle('#gbz { display:none !important; }'); // Remove Google Links
GM_addStyle('#gbx3 { display:none !important; }'); // Remove Black Bar
GM_addStyle('.no { height: 0px !important; } '); // Remove Google+ Block
GM_addStyle('#gbq1 { display:none !important; }'); // Remove Google Logo
GM_addStyle('#gbx1 { display:none !important; }'); // Remove Border at Compose Button
GM_addStyle('#gbqfbw { display:none !important; }'); // Remove Search Button
GM_addStyle('#gbqf { position:absolute !important; top:-15px !important; left:-160px !important; min-width:140px !important;}'); // Reposition Search Box

// Remove GMAIL Text
GM_addStyle('.aki { visibility:hidden !important;}');

// Remove Footers
GM_addStyle('.aeG { visibility:hidden !important;}');