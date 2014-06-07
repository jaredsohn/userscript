// ==UserScript==
// @id             juick-nsfw-hider
// @name           Juick NSFW hider
// @version        1.0
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        http://juick.com/*
// @include        https://juick.com/*
// @run-at         document-end
// @homepage http://userscripts.org/scripts/show/477085
// @updateURL http://userscripts.org/scripts/source/477085.user.js
// ==/UserScript==
(function(){
	var HIDE_TAGS = ['nsfw', '18+', 'эротика'];
	var placeholder = document.createElement('span');
	placeholder.setAttribute(
		'style',
		'background: #FFF; outline: 1px dashed #ccc; position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer;'
	);
	placeholder.setAttribute('title', 'Показать.');
	// add_to_child - add to .ir child (list) or directly (separate post with comments)
	function insert_cover(post_el, add_to_child)
	{
		var image_block = (add_to_child) ? post_el.querySelector('.ir') : post_el;
		if (image_block) {
			image_block.style.position = 'relative';
			var new_cover = placeholder.cloneNode(true);
			new_cover.addEventListener('click', remove_cover, false);
			image_block.appendChild(new_cover);
		}
	}
	function remove_cover(ev)
	{
		var target = ev.target;
		target.parentNode.removeChild(target);
	}
	function juick_hide_in_list()
	{
		var posts = document.querySelectorAll('#content > article');
		for (var i = 0, len = posts.length; i < len; i++) {
			var current = posts[i];
			var tag_els = current.querySelectorAll('.u > a');
			// skip first as it's a username
			for (var j = 1, len2 = tag_els.length; j < len2; j++) {
				var current_tag = tag_els[j].textContent.trim().toLowerCase();
				if (HIDE_TAGS.indexOf(current_tag) !== -1) {
					insert_cover(current, true);
					break;
				}
			}
		}
	}
	function juick_hide_in_comments()
	{
		var tag_els = document.querySelectorAll('.msgthread .msg-tags > a');
		for (var i = 0, len = tag_els.length; i < len; i++) {
			var current_tag = tag_els[i].textContent.trim().toLowerCase();
			if (HIDE_TAGS.indexOf(current_tag) !== -1) {
				var posts = document.querySelectorAll('#content .msg .msg-media');
				for (var i = 0, len = posts.length; i < len; i++) {
					insert_cover(posts[i]);
				}
				return;
			}
		}
	}
	juick_hide_in_list();
	juick_hide_in_comments();
})();
