// ==UserScript==
// @name          OGame - Remove tutorial and changelog buttons
// @version       0.2
// @description   This script remove the tutorial button and the changelog button, for more graphically-friend ;)
// @downloadURL   http://userscripts.org/scripts/source/179059.user.js
// @updateURL     http://userscripts.org/scripts/source/179059.meta.js
// @include       http://*.ogame.gameforge.com/game/index.php*   
// @copyright     Copyright (C) 2013 by BoGnY | www.worldoftech.it
// ==/UserScript==

var tutorial = document.getElementById("helper");
tutorial.remove();

var changelog = document.getElementById("changelog_link");
changelog.remove();