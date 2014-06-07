// ==UserScript==
// @name           Tom's Hardware gallery full view
// @match          http://www.tomshardware.com/gallery/*
// ==/UserScript==
var imgOnclick = document.getElementById('zoom').parentNode.getAttribute('onclick');
var location = imgOnclick.substring(imgOnclick.indexOf('\'')+1);
location = location.substring(0,location.indexOf('\''));
window.location.href = location;