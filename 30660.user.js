// ==UserScript==
// @name	YouTube embedded replacer w/ titles & thumbnails
// @author	mgorny
// @namespace	http://mgorny.jogger.pl/
// @version	0.2
// @description	Replaces YT players embedded on sites with thumbnail-links to the videos and titles (if GM is available).
// @ujs:download	http://userscripts.org/scripts/source/30660.user.js
// @include	*
// ==/UserScript==

var tmp = document.getElementsByTagName('object');
var i, obj;
var objs = new Array();
var out = new Array();

	// step 1 - prepare list of objects to replace
for (i = 0; obj = tmp[i]; i++) { // else after child replacement objs[i+1] would be undefined
	objs[i] = obj;
}

	// step 2 - replace players with thumbnail-links
for (i = 0; obj = objs[i]; i++) {
	var embed = obj.getElementsByTagName('embed');

	var url; 
	if (embed[0])
		url = embed[0].getAttribute('src');
	else
		url = obj.getAttribute('data');
	var suffix = url.split('http://www.youtube.com/v/');

	if (!suffix[0] && suffix[1]) { 
		var id = suffix[1].split('&')[0];

		var text = document.createTextNode('Open video on YouTube');
		var anchor = document.createElement('a');
		anchor.setAttribute('href', 'http://www.youtube.com/watch?v='+id);

			// not nicest piece of HTML
		anchor.style.display	= 'table-cell';
		anchor.style.width	= (embed[0] ? embed[0].getAttribute('width')+'px' : obj.style.width);
		anchor.style.height	= (embed[0] ? embed[0].getAttribute('height')+'px' : obj.style.height);
		anchor.style.textAlign	= 'center';
		anchor.style.verticalAlign = 'middle';
		anchor.style.border	= 'solid';

		var bg = document.createElement('img');
		bg.setAttribute('src', 'http://i.ytimg.com/vi/'+id+'/default.jpg');
		bg.style.width		= ((embed[0] ? embed[0].getAttribute('width') : obj.style.width.split('px')[0]) / 2) + 'px';

		var br = document.createElement('br');
		anchor.appendChild(bg);
		anchor.appendChild(br);
		anchor.appendChild(text);

		var father = obj.parentNode;
		father.replaceChild(anchor, obj);

		out[i] = anchor;
	}
}

	// step 3 - try to fetch video titles
if (GM_xmlhttpRequest) {
	function doRequest() {
		var anchor = out.shift();
		if (!anchor) return;

		var url = anchor.getAttribute('href');

		try {
			GM_xmlhttpRequest({
				method:	'GET',
				url:	url,
				onload:	function(resp) {
					var title = resp.responseText.split('<title>YouTube - ');
					if (title[1]) {
						title = title[1].split('</title>');
						if (title[0]) {
							title = title[0].replace('&quot;', '"').replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&');
							anchor.childNodes[2].nodeValue = title;
							anchor.style.fontSize = 'large';
							anchor.style.fontStyle = 'italic';
						}
					}
				}
			});
		} catch (err) {
		};

		doRequest();
	}

	doRequest();
}
