// ==UserScript==
// @name           Delete unpinned posts
// @namespace      http://userscripts.org/users/130678
// @description    for heavy reblogger.
// @include        http://www.tumblr.com/dashboard*
// @require        http://gist.github.com/3238.txt
// ==/UserScript==
var threshold = 20;
var removeCount = 10;
var removePost = function(node, index){
	if(index + 1 >= removeCount){
		return;
	}
	var y = node.offsetHeight * -1 - 16;
	node.parentNode.removeChild(node);
	window.scrollBy(0, y);
}
var boot = function(){
	AutoPagerize.addFilter(
		function(){
			posts = document.getElementById("posts");
			var postUnpinned = $X('li[contains(concat(" ", normalize-space(@class), " "), " post ") and not(contains(concat(" ", normalize-space(@class), " "), " new_post ")) and not(contains(concat(" ", normalize-space(@class), " "), " gm_ldrize_pinned "))]', posts);
			if(postUnpinned.length > threshold){
				postUnpinned.forEach(removePost);
				window.Minibuffer.execute('LDRize::paragraph-position-correct');
			}
		}
	);
};
if (window.AutoPagerize) {
	boot();
} else {
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}

