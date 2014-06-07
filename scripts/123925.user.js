// ==UserScript==
// @id             www.google.com-d2fd3946-611b-4b0f-8481-4cd87bf66a45@spanishgringo
// @name           Better Contrast Google Analytics
// @version        1.0
// @namespace      spanishgringo
// @author         Spanishgringo
// @description    Use the new GA interface but with proper contrast. Join the Contrast Rebellion!
// @include        https://www.google.com/analytics/web/*
// ==/UserScript==

/* my blog - http://spanishgringo.blogspot.com */
/* check out my other scripts if you like this one:  -   http://userscripts.org/users/54575/scripts  */

var hcGA = document.createElement("link");
hcGA.type="text/css";
hcGA.href="https://dl.dropbox.com/u/232/gadgets/betterContrast-GA/final-20120103-ga-better-contrast-spanishgringo.css";
hcGA.rel="stylesheet";
document.getElementsByTagName("head")[0].appendChild(hcGA);