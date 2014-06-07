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
// select "Google Secure Pro", and click Uninstall.
//
// This is a fork of GmailSecure.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook, Google ++ Secure Pro (Part I) 
// @description   Forces gMail, gCal, Google Docs & Spreadsheets, Google Reader, facebook, posten.no and psdata.no  to use secure connection.
// @include       http://mail.google.com/*
// @include       http://www.google.tld/calendar/*
// @include       http://docs.google.tld/*
// @include       http://spreadsheets.google.tld/*
// @include       http://www.google.tld/reader/*
// @include       http://www.google.tld/bookmarks/*
// @include       http://www.google.tld/history/*
// @include       http://groups.google.tld/*
// @include       http://sites.google.tld/*
// @include       http://knol.google.tld/*
// @include       http://www.google.tld/notebook/*
// @include       http://www.google.tld/webmasters/tools/*
// @include       http://www.google.tld/contacts
// @include       http://www.google.tld/voice/*
// @include       http://www.google.tld/finance*
// @include       http://www.google.tld/dictionary*

// @include    http://*facebook.com*
// @include    http://*.facebook.com*
// @include    http://*apps.facebook.com*
// @include    http://*psdata.no/*
// @include    http://*ps.no/*
// @include     http://*facebook.com/login.php
// @include     http://*facebook.com/index.php*
// @include     http://*qxl.no*
// @include    http://*static.ak.fbcdn.net*
// @include    http://*static.ak.facebook.com*
// @include    http://*.wikipedia.org/*
// @include    http://*netshop.no
// ==/UserScript==
//

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}

//
// ChangeLog
// 0.1 - 2006-10-13 - Removed spreadsheets from the script.  
// It does not support SSL.
// 0.2.1 - 2007-04-10 - Added Google Reader and Google Spreadsheets.
// 0.4 - 2007-05-02 - Added Google History and Google Bookmarks.
// 0.5 - 2007-05-09 - Added iGoogle
// 0.6 - 2007-05-10 - Removed iGoogle.  Noticed it won't allow user to search from the SSL iGoogle.  Researching workaround..
// 0.8 - 2008-03-24 - Added Google Groups
// 0.9 - 2008-07-24 - Added Google Sites
// By mike
// 0.8.1 - 2008-04-02 - Added facebook, posten.no and psdata.no
// 0.8.2 - 2008-04-22 - Added qxl.no
// 0.9.1 - 2008-07-30 - Added netshop and the latest from the original google secure pro
// 0.9.2 - 2009-05-24 - Added the latest from Google secure pro. 
// 0.9.3 - 2010-11-07 - Added Wikipedia, updated from the latest Google Secure pro. 