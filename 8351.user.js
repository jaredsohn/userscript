// ==UserScript==
// @name          Userscripts - Error Redirect
// @namespace     http://www.myspace.com/tp_
// @description   Redirects you from the "Monkey" error page, back to the homepage
// @include       http://userscripts.org/sessions

if (document.location.href='http://userscripts.org/sessions') {document.location.href='http://userscripts.org/'}