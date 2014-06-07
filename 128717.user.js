// ==UserScript==
// @name           View All Icons on Dreamwidth Icon Pages
// @namespace      http://userscripts.org/users/441457
// @description    Display all icons when viewing a user's icon page on Dreamwidth.
// @include        http://*.dreamwidth.org/icons
// @include        http://*.dreamwidth.org/icons?sortorder=keyword
// ==/UserScript==

(function() {
location.replace(location+=(location.search?'&':'?')+'view=all');
})();