// ==UserScript==
// @name         Current hatena
// @author       NAGATA Hiroaki
// @namespace    http://handlename.net
// @description  Display hatena bookmark count on top of page
// ==/UserScript==

(function() {
	var uri = location.href.replace(/#/, '%23');
	
	var span = document.createElement('span');
	span.style.position = 'fixed';
	span.style.top = '0';
	span.style.left = '0';
	span.style.maxHeight = '13px';
	span.style.opacity = '0.3';
	span.style.zIndex = '9999';
	span.addEventListener('mouseover', function() {
		this.style.opacity = '1.0';
	}, false);
	span.addEventListener('mouseout', function() {
		this.style.opacity = '0.3';
	}, false);
	
	var img = document.createElement('img');
	img.setAttribute('src', 'http://b.hatena.ne.jp/entry/image/' + uri);
	
	var a = document.createElement('a');
	a.setAttribute('href', 'http://b.hatena.ne.jp/entry/' + uri);
	a.setAttribute('target', '_blank');
	
	a.appendChild(img);
	span.appendChild(a);
	document.body.appendChild(span);
})();
