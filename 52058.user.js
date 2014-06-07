// ==UserScript==
// @name           Skip header on Manga Toshokan
// @author         Andreas Jung (sd-daken.deviantart.com)
// @description    Skips the header on Manga Toshokan when reading a manga. (i.e. jumps down to the manga page...)
// @namespace      http://www.w3.org/1999/xhtml 
// @include        http://www.mangatoshokan.com/read/*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

var l = window.location.href;

if ( l.indexOf('#') == -1 ) {
   window.location.replace(l + '#readerPage');
}