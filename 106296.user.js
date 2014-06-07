// ==UserScript==
// @name           Heise.de - First Post
// @namespace      https://github.com/LenAnderson/
// @downloadURL    https://github.com/LenAnderson/Heise-First-Post/raw/master/heise_first_post.user.js
// @version        0.1
// @include        http://www.heise.de/*/foren/*/list/*
// ==/UserScript==
 
(function() {
 
var links = document.getElementsByTagName('a');
var i=0;
var spinner = document.createElement('img');
spinner.src = 'data:image/gif;base64,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';
spinner.width = '16';
spinner.height = '16';
spinner.alt = 'Loading first post...';
spinner.id = 'heiseforum_list_spinner';
spinner.style.cssFloat = 'left';
function findNext() {
	while (i<links.length && (links[i] == null || links[i] == undefined || !links[i].href.match(/^.+\/foren\/.+\/read\/$/)))
		i++;
}
 
function retrieve() {
	if (links[i].href != null && links[i].href != undefined && links[i].href.match(/^.+\/foren\/.+\/read\/$/) &&
			links[i].getAttribute('heiseforum_list_loaded') == null) {
		links[i].setAttribute('heiseforum_list_loaded', '1');
		links[i].parentNode.insertBefore(spinner, links[i]);
		var req = new XMLHttpRequest();
		req.open('GET', links[i].href, true);
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				links[i].title = '';
				var tooltip = document.createElement('div');
				tooltip.className = 'heise_first_post';
				tooltip.innerHTML = req.responseText.replace(/(\r|\n)/g,'').replace(/^.+<p class="posting_text">(.+?)<\/p>.+/, '$1');
				links[i].parentNode.appendChild(tooltip);
				i++;
				findNext();
				spinner.parentNode.removeChild(spinner);
				retrieve();
			}
		};
		req.send(null);
	}
}
 
function style() {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML += 'div.thread_title { position: relative; }\r\n';
	style.innerHTML +=  'div.thread_title > div.heise_first_post { display: none; max-width: 600px; background: white; position: absolute; left: 20px; border: 2px solid black; z-index: 1; padding: 0 5px; }\r\n';
	style.innerHTML += 'div.thread_title:hover > div.heise_first_post { display: block; }\r\n';
	document.body.appendChild(style);
}
 
style();
findNext();
retrieve();
 
})();