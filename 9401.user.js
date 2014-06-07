// ==UserScript==
// @name           TwinCreeks link fixer
// @namespace      twin-creeks.com/league-updates
// @description    Fix the TwinCreeks links that the damn webmasters are too retarded to fix
// @include        http://www.twin-creeks.com/*
// ==/UserScript==

for (var i=0; i<document.links.length; i++) {
        document.links[i].href = document.links[i].href.replace("%5C","/");
}