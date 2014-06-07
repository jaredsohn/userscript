// ==UserScript==
// @name          transformScreen
// @namespace     tmcscreen
// @description   resizes Transformice so you can see the entire playable level, not just the cropped screen
// Author: knux
// @include       http://www.transformice.com/*
// ==/UserScript==
(function(){a = document.getElementsByTagName("embed")[0]; a.width = a.height = 2000;})()