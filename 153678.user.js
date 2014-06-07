// ==UserScript==
// @name           Change YouTube Logo to Subscriptions and Subscription redirection
// @version        2.3
// @author	  	   Caruniom
// @description    Changes the link of the YouTube Logo to the Subscription Page and redirects you to rhe subscription page.
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==
if (location.pathname === "/")
{window.location.replace("//www.youtube.com/feed/subscriptions");}
var logoLink = document.getElementById("logo-container");
logoLink.setAttribute("href","//www.youtube.com/feed/subscriptions");