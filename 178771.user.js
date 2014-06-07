// ==UserScript==
// @name        Make AMOS language selection taller
// @namespace   http://userscripts.org/
// @description The Moodle translation tool (AMOS) has a ridiculously small language selection box. Since that list contains hundreds of languages, this script makes it taller so it's easier to navigate.
// @include     http://lang.moodle.org/local/amos/view.php
// @grant       none
// @version     1
// ==/UserScript==
document.getElementById("amosfilter_flng").size = 30;