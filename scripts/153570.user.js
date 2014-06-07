// ==UserScript==
// @name        Youtube Homepage Modifier
// @namespace   Made by: Ian
// @description This script redirects the user to the Uploads Only part of the Subscriptions segment.
// @include     http://www.youtube.com/*
// @include	https://www.youtube.com/*
// @include	youtube.com/*
// @include	www.youtube.com/*
// @version     1.2
// ==/UserScript==
document.getElementById('logo-container').setAttribute('href', 'https://www.youtube.com/feed/subscriptions/u');