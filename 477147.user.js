// ==UserScript==
// @id             point-nsfw-hider
// @name           Point NSFW hider
// @version        1.0
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        http://point.im/*
// @include        https://point.im/*
// @include        http://*.point.im/*
// @include        https://*.point.im/*
// @run-at         document-end
// @homepage http://userscripts.org/scripts/show/477147
// @updateURL http://userscripts.org/scripts/source/477147.user.js
// ==/UserScript==
(function(){
	var HIDE_TAGS = ['nsfw', '18+', 'эротика'];
	var placeholder = document.createElement('span');
	placeholder.setAttribute(
		'style',
		'background: #FFF; outline: 1px dashed #ccc; position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer;z-index: 1;'
	);
	placeholder.setAttribute('title', 'Показать.');
	function insert_cover(post_el)
	{
		var image_block = post_el.querySelector('.text .postimg');
		if (image_block) {
			image_block.style.position = 'relative';
			var new_cover = placeholder.cloneNode(true);
			new_cover.addEventListener('click', remove_cover, false);
			image_block.appendChild(new_cover);
		}
	}
	function remove_cover(ev)
	{
		ev.preventDefault();
		ev.stopPropagation();
		var target = ev.target;
		target.parentNode.removeChild(target);
	}
	function hide_in_list()
	{
		var posts = document.querySelectorAll('#content .post');
		for (var i = 0, len = posts.length; i < len; i++) {
			var current = posts[i];
			var tag_els = current.querySelectorAll('.tag');
			for (var j = 0, len2 = tag_els.length; j < len2; j++) {
				var current_tag = tag_els[j].textContent.trim().toLowerCase();
				if (HIDE_TAGS.indexOf(current_tag) !== -1) {
					insert_cover(current);
					break;
				}
			}
		}
	}
	function hide_in_comments(top_post_el)
	{
		var tag_els = top_post_el.querySelectorAll('.tag');
		for (var i = 0, len = tag_els.length; i < len; i++) {
			var current_tag = tag_els[i].textContent.trim().toLowerCase();
			if (HIDE_TAGS.indexOf(current_tag) !== -1) {
				var posts = document.querySelectorAll('#content .post');
				for (var i = 0, len = posts.length; i < len; i++) {
					insert_cover(posts[i]);
				}
				return;
			}
		}
	}
	var top_post_el = document.getElementById('top-post');
	if (top_post_el) {
		hide_in_comments(top_post_el);
	} else {
		hide_in_list();
	}
})();
