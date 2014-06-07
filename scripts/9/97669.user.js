// ==UserScript==
// @name           spoiler tag
// @namespace      http://wakachan.org/unyl/
// @description    spoilertag for wakaba in general and /unyl/ in particular
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @author         unylnonymous
// ==/UserScript==

var styles = {
	'Futaba' : '.wakachong-spoiler { background: #F0D0B6; color: #F0D0B6; } .wakachong-spoiler:hover { color: #800000; }',
	'Burichan' : '.wakachong-spoiler { background: #000; color: #000; } .wakachong-spoiler:hover { color: #FFF; }', 
	'Photon' : '.wakachong-spoiler { background: #BBB; color: #BBB; } .wakachong-spoiler:hover { color: #333; }', 
	'Gurochan' : '.wakachong-spoiler { background: #CA927B; color: #CA927B; } .wakachong-spoiler:hover { color: #000; }', 
}

var style_cookie = 'wakabastyle';
var default_style = 'Futaba';
var spoiler_regexp = new RegExp('%%([^%]+)%%', 'g');

function getElementsByClass(search_class, tag, node) {
	var class_elemenths = new Array();
	for (var child in node.getElementsByTagName(tag)) {
		if (child.className == search_class) {
			class_elemenths.push(child)
		}
	}
	return class_elemenths;
}

function get_style() {
	var cookies = document.cookie.split(';');
	for (var i in cookies) {
		var value = cookies[i].split('=');
		if (value[0].replace(/^\s|\s$/g, '') == style_cookie) {
			return value[1].replace(/^\s|\s$/g, '');
		}
	}

	return '';
}

function instrument_css() {
	var wakabastyle = get_style();
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode((wakabastyle in styles) && styles[wakabastyle] || styles[default_style]));
	
	document.getElementsByTagName('head')[0].appendChild(style);
}

function place_spoilers(collection) {
	for (var i = 0; i < collection.length; ++i) {
		collection[i].innerHTML = collection[i].innerHTML.replace(spoiler_regexp, '<span class="wakachong-spoiler">$1</span>');
	}
}

(function() { 
	
	instrument_css();

	place_spoilers(document.getElementsByTagName('blockquote')); // posts
	place_spoilers(getElementsByClass('unkfunc', 'blockquote', document)); // quotation in posts

})();

