// ==UserScript==
// @name           Remove Grooveshark Ad
// @namespace      http://www.imsethstevenson.com
// @description    Removes the grooveshark ad to return grooveshark to it's full width glory.
// @version        1.1
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

var adBar = document.getElementById('adBar');
adBar.style.display = 'none';

var mainContentWrapper = document.getElementById('mainContentWrapper');
mainContentWrapper.style.width = "100%";
