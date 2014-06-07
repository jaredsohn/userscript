// ==UserScript==
// @id             JustJustin.YoutubePlaylistTitleDescription
// @name           Youtube Playlist Videos To Description
// @version        1.0
// @namespace      JustJustin
// @author         JustJustin
// @license        WTFPL; http://sam.zoy.org/wtfpl/COPYING
// @description    Fills playlist description with the titles of the videos in the list.
// @include        http://*youtube.com/playlist*action_edit*
// @include        https://*youtube.com/playlist*action_edit*
// @run-at         document-end
// ==/UserScript==

/* LICENSE
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 * Version 2, December 2004
 *
 * Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 *
 * Everyone is permitted to copy and distribute verbatim or modified
 * copies of this license document, and changing it is allowed as long
 * as the name is changed.
 *
 * DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 * TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 * 0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law.
 */

var $base;
var config = {
	debug: true
};
$base = function(selector, root){
	if(root == null) {
		root = document.body;
	}
	return root.querySelector(selector);
};

$base.extend = function(object, data){
	var key, val;
	for(key in data){
		val = data[key];
		object[key] = val;
	}
};

$base.extend($base, {
	hasClass: function(el, klass){
		var i;
		for(i = 0; i < el.classList.length; ++i){
			if(el.classList[i] == klass){
				return true;
			}
		}
		return false;
	},
	attr: function(el, val) {
		var attributes = el.attributes;
		return (attributes[val] === undefined) ? false: attributes[val].value;
	},
	after: function(root, el) {
		if(root.nextSibling){
			return root.parentNode.insertBefore(el, root.nextSibling);
		}
		return root.parentNode.appendChild(el);
	},
	before: function(root, el) {
		return root.parentNode.insertBefore(el, root);
	},
	el: function(tagname, attrs) {
		var el = document.createElement(tagname);
		var attr;
		for( attr in attrs ){
			el.setAttribute(attr, attrs[attr]);
		}
		return el;
	},
	firstParent: function(root, tag, limit) {
		if(limit === 0) { return false; }
		if( root.parentNode.tagName.toLowerCase() == tag.toLowerCase() ) {
			return root.parentNode;
		}
		if(root.parentNode == document.body){
			return false;
		}
		return $base.firstParent(root.parentNode, tag, limit - 1);
	},
	remove: function(el) {
		return el.parentNode.removeChild(el);
	},
	log: function(obj, severe) {
		if(severe || config.debug) {
			console.log(obj); //This is going to fuck up horribly with regular firefox I think
			//TODO FIX ^^^
		}
	}
});

playlistDescription = function(){
	playlistDescription.init();
}
$base.extend(playlistDescription, {
	init: function() {
		playlistDescription.dialog();
	},
	dialog: function() {
		var $el = $base.el('button', {
			'class': 'yt-uix-button yt-uix-button-default',
			role: 'button',
			onclick: ';return false;',
			type: 'button'
			});
		var $span = $base.el('button', {
			'class': 'yt-uix-button-content'
			});
		$span.innerHTML = 'Copy Titles to Description';
		$el.appendChild($span);
		$el.addEventListener('click', playlistDescription.doIt, false);
		$base.after($base('.secondary-pane textarea'), $el);
	},
	doIt: function() {
		var text;
		text = playlistDescription.getFullTitles();
		playlistDescription.setDescription(text);
	},
	getFullTitles: function() {
		var text = '';
		var containers = document.querySelectorAll('.video-title');
		for(var i = 0; i < containers.length; ++i){
			if($base.attr(containers[i], 'data-tooltip-text')) {
				text = text + $base.attr(containers[i], 'data-tooltip-text') + '\n';
				continue;
			}
			text = text + containers[i].innerHTML + '\n';
		}
		return text;
	},
	setDescription: function(text) {
		document.querySelector('.secondary-pane textarea').value = text;
	}
});

playlistDescription();