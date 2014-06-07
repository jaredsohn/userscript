// ==UserScript==
// @name           Tumblr Dashboard Filter
// @namespace      http://userscripts.org/users/130678
// @description    RegExp filter for Tumblr Dashboard.
// @include        http://www.tumblr.com/dashboard*
// @require        https://gist.github.com/raw/3238/bc5f6bd5fb64b1baf6aa17423735a1816f36b358/dollarX.js

// ==/UserScript==

filter = new RegExp(GM_getValue("filter"), "m");
posts = document.getElementById("posts");

var applyFilter = function(node){
	if(filter.test($X("string()", node))){
		posts.removeChild(node);
		window.Minibuffer.execute('LDRize::paragraph-position-correct');
	}
}

$X('li[contains(concat(" ", normalize-space(@class), " "), " post ") and not(contains(concat(" ", normalize-space(@class), " "), " new_post "))]', posts).forEach(applyFilter);

document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){
	applyFilter(evt.target);
}, false);

GM_registerMenuCommand("Configure Dashboard Filter", function(){GM_setValue("filter", prompt("Set filter (RegExp)", GM_getValue("filter")));});