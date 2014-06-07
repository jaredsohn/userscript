// ==UserScript==

// @name          Google, Facebook, psdata.no, posten.no, Secure Pro part II :S

// @description   Google, Facebook, psdata.no, posten.no, Secure Pro part II :S
// @namespace    href=*
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

// @include       https://mail.google.com/*
// @include       https://www.google.tld/calendar/*
// @include       https://docs.google.tld/*
// @include       https://spreadsheets.google.tld/*
// @include       https://www.google.tld/reader/*
// @include       https://www.google.tld/bookmarks/*
// @include       https://www.google.tld/history/*
// @include       https://groups.google.tld/*
// @include       https://sites.google.tld/*
// @include       https://knol.google.tld/*
// @include       https://www.google.tld/notebook/*
// @include       https://www.google.tld/webmasters/tools/*
// @include       https://www.google.tld/contacts
// @include       https://www.google.tld/voice/*
// @include       https://www.google.tld/finance*
// @include       https://www.google.tld/dictionary*

// @include    https://*facebook.com*
// @include    https://*.facebook.com*
// @include    https://*apps.facebook.com*
// @include    https://*psdata.no/*
// @include    https://*ps.no/*
// @include     https://*facebook.com/login.php
// @include     https://*facebook.com/index.php*
// @include     https://*qxl.no*
// @include    https://*static.ak.fbcdn.net*
// @include    https://*static.ak.facebook.com*
// @include    https://*.wikipedia.org/*
// @include    https://*netshop.no


// ==/UserScript==


var lianks = document.evaluate(
"//a[contains(@href, 'http')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < lianks.snapshotLength; i++) {
var link = lianks.snapshotItem(i);
link.href = link.href.replace("http","https")
link.href = link.href.replace("httpss","https");
}

// ChangeLog
// Added netshop
// Added wikipedia and updated to the latest google secure pro