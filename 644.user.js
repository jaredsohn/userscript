// MetacriticByScore
// v0.2
// Copyright (c) 2005, Wayne Burkett 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// This is a Greasemonkey user script. 
// http://greasemonkey.mozdev.org/

// ==UserScript==
// @name          MetacriticByScore
// @namespace     http://dionidium.com/projects/greasemonkey/
// @description   Auto-sort sidebar reviews on metacritic.com by score
// @include       http://metacritic.com*
// @include       http://www.metacritic.com*
// ==/UserScript==

(function() {
    if (document.title.match('Reviews')) {
        for (var i = 1; i <= 2; i += 1) {
            MM_showHideLayers('sortbyname' + i,'','hide');
            MM_showHideLayers('sortbyscore' + i,'','show');
        }
    }
})();

// 2005-05-01 - 0.2 - linted
// 2005-04-24 - 0.1 - released
