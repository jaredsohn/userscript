// ==UserScript==
// @name          javadocs 1.4.2
// @namespace     http://youngpup.net/userscripts
// @description   Automatically redirects from java 1.5.0 documentation to 1.4.2
// @include       http://java.sun.com/*
// ==/UserScript==

if (location.pathname.indexOf('/1.5.0/') > -1) {
  location.href = location.href.replace(/\/1\.5\.0\//, "/1.4.2/");
}