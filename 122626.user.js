// ==UserScript==
// @name           eRepublik shout linker
// @namespace      eshoutlink
// @description    eRepublik shout linker
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en?viewPost=*
// ==/UserScript==

(function(){
	var p = unsafeWindow;
	if(window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	};
	var jQuery = p.jQuery;

	createUI();

	function createUI(){
		jQuery(".post_actions").each(function(index,element){
			var post_id = jQuery(element).parent().parent().attr('id');
			var id_split = post_id.split('_');
			var post_id = id_split[1];
			jQuery(element).append('<span class="shout-perma-dot">·</span> <a href="http://www.erepublik.com/en?viewPost='+ post_id +'" class="shout-permalink">Permalink</a>');
		});


		jQuery("[trigger=previous_posts]").live('click', function(){
			window.setTimeout(dodo, 1200);
		});
 	}

	function dodo(){
		jQuery(".shout-perma-dot").remove();
		jQuery(".shout-permalink").remove();
		jQuery(".post_actions").each(function(index,element){
			var post_id = jQuery(element).parent().parent().attr('id');
			var id_split = post_id.split('_');
			var post_id = id_split[1];
			jQuery(element).append('<span class="shout-perma-dot">·</span> <a href="http://www.erepublik.com/en?viewPost='+ post_id +'" class="shout-permalink">Permalink</a>');
		});
	}

})();

