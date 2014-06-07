// ==UserScript==
// @name           dpreview redirect to flat threadview
// @namespace      webmonkey
// @include        http://forums.dpreview.com/forums/read.asp*
// ==/UserScript==

var match = (/http:\/\/forums.dpreview.com\/forums\/read.asp\?(.*)/).exec(window.location.href);
if (match[1]) {
    window.location = "http://forums.dpreview.com/forums/readflat.asp?"+match[1]+"&changemode=1";
}
