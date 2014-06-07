// ==UserScript==
// @name         Remove the Ads and the white space on the right also with preview pane labs!
// @namespace    vitorreus
// @include        http*://mail.google.com/*
// @author       vitorreus
// @description  Based on khani3s's script, this userscript is meant to remove the ADS and THE WHITE SPACE ON RIGHT on your Gmail also when preview pane labs extension is enabled.
// ==/UserScript==

GM_addStyle(".adC { display:none; }"); // Remove the whitespace!
GM_addStyle(".mq { display:none; }"); // sticky footer
GM_addStyle(".z0DeRc { display:none; }"); // message detail footer
GM_addStyle(".oM { display:none; }"); // good ol gmail ads right sidebar
GM_addStyle(".u7 { display:none; }"); // 'about these links' link
GM_addStyle(".nH.PS { display:none; }"); // Removes the Gmail ads that appear at the bottom of your email messages
GM_addStyle("table.Bs tr td:nth-child(2)  { display:none;  }");  // Remove the whitespace from pane labs