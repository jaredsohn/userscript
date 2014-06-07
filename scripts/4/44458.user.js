// ==UserScript==
// @name           Forum Search Age
// @namespace      GLB
// @include        http://goallineblitz.com/game/search_forum.pl*
// ==/UserScript==

var container = document.getElementById('league_box')
container.innerHTML = '<div id="league_box"><div class="fieldheading">Age of posts in days:</div><input name="age"></div>'