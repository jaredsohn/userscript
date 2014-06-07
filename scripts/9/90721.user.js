// ==UserScript==
// @name           Show First Post of Keyword on Haiku
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    Show First Post of Keyword on Haiku
// @version        1.0.6
// @include        http://h.hatena.ne.jp/keyword/*
// ==/UserScript==
(function (){
var POST_LIMITTER = 20000;
var keyword;
if (location.href.match(/http:\/\/h\.hatena\.ne\.jp\/keyword\/([^?]+)/))
	keyword = RegExp.$1;
else
	retrun;
var link1 = document.createElement('a');
link1.href = '#';
link1.appendChild(document.createTextNode('>>1'));
var linkLi = document.createElement('li');
linkLi.appendChild(link1);
var target = document.querySelector('.stream-mode > ul');
target.insertBefore(linkLi, target.firstChild);
link1.addEventListener('click', redirectFirstPost, false);
function redirectFirstPost() {
	link1.textContent = 'loading...';
	link1.removeEventListener('click', redirectFirstPost, false);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/keywords/show/' + keyword + '.json');
	xhr.onreadystatechange = function(){
		if (xhr.readyState !== 4) {
			return;
		}
		if (xhr.status !== 200) {
			link1.textContent = 'error';
			return;
		}
		var res = JSON.parse(xhr.responseText);
		var entry_count = res['entry_count'] - 0;
		if (entry_count > POST_LIMITTER) {
			link1.textContent = 'over ' + POST_LIMITTER + ' post';
			return;
		}
		link1.textContent = 'loading...(' + entry_count + 'post)';
		var count = 20;
		var page = Math.floor((entry_count - 1) / count) + 1;
		var url2 = '/keyword/' + keyword + '?page=' + page;
		var xhr2 = new XMLHttpRequest();
		xhr2.open('GET', url2);
		xhr2.onreadystatechange = function(){
			if (xhr2.readyState !== 4) {
				return;
			}
			if (xhr2.status !== 200) {
				link1.textContent = 'error';
				return;
			}
			var res2txt = xhr2.responseText;
			var htmlgotten = createHTML(res2txt);
			var entriesgotten = htmlgotten.querySelectorAll('.entries > .entry');
			if (entriesgotten.length < 3) {
				link1.textContent = 'error';
				return;
			}
			var lastNode = entriesgotten[entriesgotten.length-2];
			var entries = document.querySelector('.entries');
			entries.insertBefore(lastNode.cloneNode(true), entries.querySelector('.stream-mode').nextSibling);
			linkLi.style.display = 'none';
		};
		xhr2.send(null);
	};
	xhr.send(null);
}
// via AutoPatchWork
// https://chrome.google.com/extensions/detail/aeolcjbaammbkgaiagooljfdepnjmkfd
function createHTML(source){
	// http://gist.github.com/198443
	var doc = document.implementation.createHTMLDocument ?
	document.implementation.createHTMLDocument('HTMLParser') :
		document.implementation.createDocument(null, 'html', null);
	var range = document.createRange();
	range.selectNodeContents(document.documentElement);
	var fragment = range.createContextualFragment(source);
	var headChildNames = {title: true, meta: true, link: true, script: true, style: true, /*object: true,*/ base: true/*, isindex: true,*/};
	var child,
	head = doc.querySelector('head') || doc.createElement('head'),
	body = doc.querySelector('body') || doc.createElement('body');
	while ((child = fragment.firstChild)) {
		if (
			(child.nodeType === Node.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) || 
			(child.nodeType === Node.TEXT_NODE &&/\S/.test(child.nodeValue))
		   )
			break;
		head.appendChild(child);
	}
	body.appendChild(fragment);
	doc.documentElement.appendChild(head);
	doc.documentElement.appendChild(body);
	return doc;
}
})();
