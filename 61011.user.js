// ==UserScript==
// @name           UserScripts.org Simple User Home Redirect
// @namespace      www.example.com
// @description    Redirects http://userscripts.org/home (useless "dashboard") to http://userscripts.org/home/scripts (much more useful). Pressing the back button will not trap you in an infinite loop of redirection.
// @include        http://userscripts.org/home
// ==/UserScript==
location.replace("http://userscripts.org/home/scripts");