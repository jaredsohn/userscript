// ==UserScript==
// @name           DPreview forum Flat view
// @namespace      by pippozzo
// @author         pippoz
// @description    Load "Flat view" in DPreview forum pages automatically
// @include        *forums.dpreview.com*
// @version        1.0
// @date           2011-01-17
// ==/UserScript==
//window.location.href = window.location.href.replace(/read.asp?/, 'readflat.asp?changemode=1&');

var regExp = /read.asp/;
if (regExp.test(window.location.href)) {
    window.location.href = window.location.href.replace(/read.asp?/, 'readflat.asp?changemode=1&');
}