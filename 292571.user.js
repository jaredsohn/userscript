// ==UserScript==
// @name            Logo youtube

// @description    Changes the link of the YouTube Logo to the Subscription Page and redirects you to rhe subscription page.
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// ==/UserScript==
if (location.pathname === "/")
{window.location.replace("//www.youtube.com/channel/HChfZhJdhTqX8");}
var logoLink = document.getElementById("logo-container");
logoLink.setAttribute("href","//www.youtube.com/channel/HChfZhJdhTqX8");