// ==UserScript==
// @name          BYM Auto-Refresh
// @namespace     
// @description   This script will keep you logged into BYM so you can never be attacked
// @include       http://apps.facebook.com/backyardmonsters/*
// @exclude       
// ==/UserScript==

window.setTimeout(function() { document.location.reload(); } , 2400);