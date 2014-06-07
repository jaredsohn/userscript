// ==UserScript==
// @name Google Calendar Overflow
// @description Removes the scrollbar from Google Calendar.
// @include http://*.google.com/calendar/*
// @include https://*.google.com/calendar/*
// ==/UserScript==

document.getElementsByTagName("html")[0].style.overflow = "hidden";
