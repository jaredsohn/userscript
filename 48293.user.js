// ==UserScript==
// @name           Google Images direct links
// @author         Dwoo
// @version        2014.1.31
// @namespace      http://userscripts.org/scripts/show/48293
// @updateURL      https://userscripts.org/scripts/source/48293.meta.js
// @download       http://userscripts.org/scripts/source/48293.user.js
// @description    Makes images link directly to the original in Google Images search. The source website link is moved to the white URL at the bottom of the image. Also gives the option to always use the basic (old) version of Google Images.
// @include        http*://*.google.*/
// @include        http*://*.google.*/#*
// @include        http*://*.google.*/search*
// @include        http*://*.google.*/webhp*
// @include        http*://*.google.*/img*
// @include        http*://*.google.*/images*
// @include        http*://images.google.*
// ==/UserScript==

(function () {

function cleanClick(e) {
	var a = e.target, url;
	if ((a.tagName === 'A' || (a.tagName === 'IMG' && (a = a.parentNode) && a.tagName === 'A')) && (url = a.href.match(/imgurl=([^&]+)/))) {
		a.href = decodeURIComponent(decodeURIComponent(url[1]));
	}
}

function removeTail(e) {
	var a = e.target;
	if ((a.tagName === 'A' || (a.tagName === 'IMG' && (a = a.parentNode) && a.tagName === 'A')) && (/iact=/).test(a.href)) {
		a.href = a.href.replace(/.iact=.*/, '');
	}
}

function cleanPopUp(e) {
	if (e.target.parentNode.id !== 'rg_haln') {
		return;
	}

	var img = document.getElementById('rg_hl');
	try {
		var site = document.getElementById('rg_hr');
		var a = document.createElement('a');
		a.innerHTML = site.innerHTML;
		a.setAttribute('style', 'text-decoration: inherit; color: inherit;');
		if ((/newwindow=1/).test(document.location.href)) {
			a.setAttribute('target', '_blank');
		}
		a.setAttribute('href', decodeURIComponent(decodeURIComponent(img.href.match(/imgrefurl=([^&]+)/)[1])));
		site.replaceChild(a, site.firstChild);
	} catch (e) {}
	var name = document.getElementById('rg_hta');
	name.href = img.href = decodeURIComponent(decodeURIComponent(img.href.match(/imgurl=([^&]+)/)[1]));
}

function fixLinks() {
	try {
		var images = document.getElementById('rg_s').getElementsByClassName('rg_di');
	
		for (var i in images) {
			try {
				var image = images[i];
				if (image.classList.contains('done')) {
					continue;
				}
				image.classList.add('done');
				var img = image.getElementsByTagName('img')[0];
				img.addEventListener('click', function(e){if(!e.ctrlKey){e.stopPropagation();}});
				var a = img.parentNode;
				var span = image.getElementsByTagName('span')[0];
				span.innerHTML = span.innerHTML.replace(/&nbsp;-&nbsp;(.*)/, '&nbsp;-&nbsp;<a href="'+decodeURIComponent(decodeURIComponent(a.href.match(/imgrefurl=([^&]+)/)[1]))+'" style="color: inherit;"'+((/newwindow=1/).test(document.location.href)?' target="_blank"':'')+'>$1</a>');
				span.getElementsByTagName('a')[0].addEventListener("click", function(e){if(!e.ctrlKey){e.stopPropagation();}});
			} catch (e) {
				continue;
			}
		}
	} catch (e) {}
}

function checkNew(e) {
	if (e.target.id && e.target.id.startsWith('page')) {
		fixLinks();
	}
}

if ((/\/imgres\?/).test(document.location.href)) {
	window.location.replace(decodeURIComponent(location.search.match(/imgurl=([^&]+)&/)[1]));
}
else {
	document.addEventListener('click', cleanClick);
	document.addEventListener('mouseup', removeTail);
	document.addEventListener('DOMNodeInserted', cleanPopUp);
	document.addEventListener('DOMNodeInserted', checkNew);
	fixLinks();
}
})();
