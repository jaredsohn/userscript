// ==UserScript==
// @name         Remove the Ads and the white space on the right!
// @namespace    khani3s
// @include      http*://mail.google.com/*
// @author       Khani3s
// @description  This userscript is meant to remove the ADS and THE WHITE SPACE ON RIGHT on your Gmail
// @version      1.0.2
// ==/UserScript==

GM_addStyle(".adC { display:none; }"); // Remove the whitespace!
GM_addStyle(".mq { display:none; }"); // sticky footer
GM_addStyle(".z0DeRc { display:none; }"); // message detail footer
GM_addStyle(".oM { display:none; }"); // good ol gmail ads right sidebar
GM_addStyle(".u7 { display:none; }"); // 'about these links' link
GM_addStyle(".nH.PS { display:none; }"); // Removes the Gmail ads that appear at the bottom of your email messages
GM_addStyle(".ao8 table tr td.Bu + td.Bu { display:none; }"); // Remove the whitespace when using Preview Plane Plugin from Labs
GM_addStyle("td.Bu.yPPMxf { display:none; }"); // Remove the whitespace when using Preview Plane Plugin from Labs **Fix**