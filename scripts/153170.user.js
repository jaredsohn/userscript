// ==UserScript==
// @name                Removes Wikipedia Orange Ad
// @namespace	        http://philhq.com
// @description	        Suppresses ads on wikipedia
// @include		http://*.wikipedia.org/*
// ==/UserScript==

var deleted = document.getElementById("siteNotice");
deleted.parentNode.removeChild(deleted);