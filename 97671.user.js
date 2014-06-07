// ==UserScript==
// @name           youfaggot
// @namespace      http://wakachan.org/unyl/
// @description    youtube preview for wakaba in general and /unyl/ in particular
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @include        http://fgs221.appspot.com/*
// @include        http://fgs223.appspot.com/*
// @author         unylnonymous
// ==/UserScript==

var templates = {
	'^http(s)?://(www\\.)?youtube\.com/watch\\?.*?v=([^&]+)' : 'http://www.youtube.com/embed/dragons?rel=0', // usual youtube links
	'^http(s)?://(www\\.)?youtube\.com/v/([^&]+)' : 'http://www.youtube.com/embed/dragons?rel=0', // fullscreen youtube links
	'^http(s)?://(www\\.)?youtu.be\/(.+)' : 'http://www.youtube.com/embed/dragons?rel=0', // short youtube links
	'^http(s)?://(www\\.)?vimeo\\.com/(\\d+)$' : 'http://player.vimeo.com/video/dragons?title=0&amp;byline=0&amp;portrait=0', 
}

function extract_id(href) {
	for (var key in templates) {
		var id = href.match(new RegExp(key));
		if (id) {
			return id[3];
		}
	}
}

function template(href) {
	for (var key in templates) {
		var id = href.match(new RegExp(key));
		if (id) {
			return templates[key].replace('dragons', id[3]);
		}
	}
}

function youtubeit(href) {
	var width = 560;
	var height = 340;

	var iframe = document.createElement('iframe');
	iframe.width = width;
	iframe.height = height;
	iframe.src = href;
	iframe.setAttribute('frameborder', 0);
	
	return iframe;
}

function collapse_youtube(event) {
	event.preventDefault();
	event.stopPropagation();
	
	var a = event.target;
	var obj_link = template(event.target.href);
	
	var anchor = a.parentNode.parentNode.parentNode;
	var objects = anchor.getElementsByTagName('iframe');

	for (var obj_index in objects) {
		var src = objects[obj_index].getAttribute('src');
		
		if (src == obj_link) {
			anchor.removeChild(objects[obj_index].parentNode);
		
			a.firstChild.nodeValue = '[+]';
			a.removeEventListener('click', collapse_youtube, false);
			a.addEventListener('click', expand_youtube, false);
			
			return;
		}
	}
}

function expand_youtube(event) {
	event.preventDefault();
	event.stopPropagation();
	
	var a = event.target;
	var href = template(event.target.href);
	
	var view = document.createElement('div');
	view.appendChild(youtubeit(href));
	view.appendChild(document.createElement('br'));
	view.appendChild(document.createElement('br'));
	
	var anchor = a.parentNode.parentNode.parentNode;

	anchor.appendChild(view);
	
	a.firstChild.nodeValue = '[-]';
	a.removeEventListener('click', expand_youtube, false);
	a.addEventListener('click', collapse_youtube, false);
}

function expander(link, expand_link) {
	var expander_item = document.createElement('span');
	var a = document.createElement('a');
	a.href = link;
	a.appendChild(document.createTextNode('[+]'));
	
	a.addEventListener('click', expand_youtube, false);
		
	expander_item.appendChild(document.createTextNode(' '));	
	expander_item.appendChild(a);
	
	return expander_item;
}

function youtube_all() { 
	
	var nodelist = document.getElementsByTagName('a');
	for (var i = 0; i < nodelist.length; ++i) {
		var candidateLink = nodelist[i];
		if (candidateLink.href 
		&& candidateLink.href == candidateLink.text) {
			for (var key in templates) {
				if (extract_id(candidateLink.href)) {
					candidateLink.parentNode.insertBefore(expander(candidateLink), candidateLink.nextSibling);
					break;
				}
			}
		}
	}

};

(function() { 
	
	youtube_all();

})();

