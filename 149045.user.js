// ==UserScript==
// @id github.com-d86a8bf3-0cf3-4cb5-b311-3b20f108a4ab@scriptish
// @name Github Service Hooks sorter
// @version 1.3
// @namespace https://github.com/
// @author Thomas LEVEIL
// @description Sort your Github Service Hooks by putting the enabled one at the top
// @include /^https?:\/\/github\.com\/[^/]+\/[^/]+\/admin/[^/]+$/i
// @run-at window-load
// @updateURL https://raw.github.com/gist/3778981/github_hooks_sorter_userscript.js
// ==/UserScript==

var $ = unsafeWindow.$;

$.getScript("https://raw.github.com/Sjeiti/TinySort/master/src/jquery.tinysort.min.js", function(data, textStatus, jqxhr) {
	$('ul.hook-list>li').tsort({order:"desc",attr:"class"});
});