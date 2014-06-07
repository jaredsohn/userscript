// ==UserScript==
// @name           PL Relayout Posts
// @namespace      pl
// @include        http://www.planet-liebe.de*
// ==/UserScript==

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		jQuery = unsafeWindow.jQuery;
		relayoutPosts();
	}
}
GM_wait();


function relayoutPosts(){
	var posts = jQuery(".tborder_post");
	posts.each(
		function(intIndex){
			var current = jQuery(this);
			var left = current.find(".avatar_block");
			var usercellmiddle = current.find(".user_cell_middle");
			var usercellright = current.find(".user_cell_right");
			current.find(".user_cell_left").remove().children().appendTo(left);
			var span = jQuery("<span></span>");
			var postBlock = current.find(".postcount_block").remove();
			span.text("#" + postBlock.text());
			usercellmiddle.find("div").prepend(span);
			usercellright.children().appendTo(left).css("width","80px").css("padding-top","5px");
			current.find(".textbuttons").children().appendTo(usercellright);
		}
	)
}
