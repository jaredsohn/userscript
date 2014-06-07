// ==UserScript==
// @name          Leprobest
// @namespace     http://leprosorium.ru/
// @description   Покажи мне лучшее
// @match         http://leprosorium.ru/
// @include       http://leprosorium.ru/
// @include       http://leprosorium.ru/#
// @include       http://leprosorium.ru/pages/*
// @version       1.0
// ==/UserScript==

// links
var links = document.getElementsByTagName('a');
for(var i in links) { 
	var link = links[i]; 
	if(typeof link == 'object') { 
		if(link.getAttribute('href').match(/comments\/\d+/)) { 
			var parent = link.parentNode;
			if(parent && parent.tagName.match(/span/i) && !parent.getAttribute('best')) {
				var slash = document.createElement('span');
				slash.innerHTML = ' / ';
				parent.appendChild(slash);

				var a = document.createElement('a');
				a.setAttribute('href', link.getAttribute('href').replace(/(.*comments\/\d+)(.*)/, '$1/best$2'));
				a.setAttribute('title', 'лучшие комментарии');
				a.innerHTML = 'лучшее';
				parent.appendChild(a);

				parent.setAttribute('best', 1);
			}
		} 
	} 
}

// more button
var divs = document.getElementsByTagName('div');
for(var i in divs) {
	var div = divs[i];

	if(div.className && div.className.match(new RegExp('(\\s|^)load_more_posts(\\s|$)'))) {
		div.setAttribute('onclick', "var num_divs = document.getElementsByTagName('div').length; function wait_new_posts(){ if(num_divs == document.getElementsByTagName('div').length) window.setTimeout(wait_new_posts, 100); else { var links = document.getElementsByTagName('a'); for(var i in links) { var link = links[i]; if(typeof link == 'object') { if(link.getAttribute('href').match(/comments\\/\\d+/)) { var parent = link.parentNode; if(parent && parent.tagName.match(/span/i) && !parent.getAttribute('best')) { var slash = document.createElement('span'); slash.innerHTML = ' / '; parent.appendChild(slash); var a = document.createElement('a'); a.setAttribute('href', link.getAttribute('href').replace(/(.*comments\\/\\d+)(.*)/, '$1/best$2')); a.setAttribute('title', 'лучшие комментарии'); a.innerHTML = 'лучшее'; parent.appendChild(a); parent.setAttribute('best', 1); } } } } } } wait_new_posts();" + divs[i].getAttribute('onclick'));
	}
}