// ==UserScript==
// @name        Travian planer
// @namespace   1234
// @description sakrivanje footera
// @include     http://www.travian-planner.com/*
// @include     http://www.travian-planner.com/index.php*
// @include     http://travian-planner.com/*
// @include     http://travian-planner.com/index.php*
// @version     1
// ==/UserScript==

	var elmDeleted = document.getElementById("footer");
	elmDeleted.parentNode.removeChild(elmDeleted);