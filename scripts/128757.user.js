// ==UserScript==
// @name           CSS Hyphenation
// @namespace      https://github.com/astanin
// @description    Enable CSS hyphenation everywhere.
//                 If lang attribute is missing, lang=defaultLang is assumed.
//                 Edit script code and set appropriate defaultLang language code.
// @include        http://*
// @include        https://*
// ==/UserScript==

var defaultLang = 'en';

// set LANG attribute if missing
var head=document.getElementsByTagName('head').item(0);
var html=document.getElementsByTagName('html').item(0);
var lang = html.getAttribute('xml:lang');
if (lang != '' && lang != null) {
	html.lang = lang;
} else if (html.lang == '') {
	html.lang = defaultLang;
}
html.lang = html.lang.substr(0, 2);

// enable CSS hyphenation
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "* {-webkit-hyphens:auto;-moz-hyphens:auto;hyphens:auto;}";
document.body.appendChild(css);
