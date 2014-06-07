// 103FM Live
// version 0.2
// יג באייר התשס"ח
//  2008-05-18
// Copyright (c) 2008, Amiad B.
// contact: http://www.contactify.com/4f7bc
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "103FM Live", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           103FM Live
// @description    Fix 103FM
// @include       http://www.103.fm/include/* 
// @include       http://103.fm/include/*
// ==/UserScript==

(function() {
var url=window.location.href;
var radio="http://switch3.castup.net/cunet/gmp.asp?ai=546&ak=null&ar="
if (url=="http://www.103.fm/include/OnLineView.aspx") {
window.location.href = 'http://switch3.castup.net/cunet/gmp.asp?ai=546&ar=103fm_promo,live01';}
else{
var istart=url.indexOf("start")+6;
var iend=url.length;
url=url.substring(istart, iend);
url=radio+url;
window.location.href =url;
}
})();
