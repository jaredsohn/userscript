// ==UserScript==
// Copyright by Andre Neubauer
// @name           IS24 Facebook Open Graph Integration
//@description Adds Like-Button to an IS24 expose
// @include        http://www.immobilienscout24.de/*
// @exclude        http://www.immobilienscout24.de/de/*
// @exclude        http://www.immobilienscout24.de/modules/*
// ==/UserScript==

window.addEventListener('load', function() {
	addMetaInfo('og:title', document.title);
	addMetaInfo('og:site_name', 'ImmobilienScout24');
	addMetaInfo('og:url', getExposeLink());
	addMetaInfo('og:type', 'company');
	addMetaInfo('og:image', document.getElementById('expose_img').src);
	addMetaInfo('fb:admins', '100000119724665');
	
	replaceFacebookLink();
}, true);

replaceFacebookLink = function() {
	var links = getElementsByClassName('fb_share_link');
	if(links.length == 0) {	
		return;
	}
	var fbLink = links[0];
	var linkListItem = fbLink.parentNode;
	
	// removeShare-link
	linkListItem.removeChild(fbLink);
	
	// add Like-button
	var iframe = document.createElement('iframe');
		
	iframe.src = 'http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(getExposeLink()) + '&layout=button_count&show_faces=false&width=450&height=50&action=like&colorscheme=light';
	iframe.scrolling = 'no';
	iframe.frameborder = 0;
	iframe.style.border = 'none';
	iframe.style.overflow = 'hidden';
	iframe.style.width = '450px';
	iframe.style.height = '40px';
	linkListItem.appendChild(iframe);
}

getExposeLink = function() {
	var exposeLink = self.location.href;
	var paramPos = exposeLink.indexOf('?');
	if(paramPos == -1) {
		return exposeLink;
	}
	return exposeLink.substring(0, paramPos);
}

addMetaInfo = function(property, value) {
	meta = document.createElement('meta')
	meta.name = property;
	meta.content = value;
	document.getElementsByTagName('head').item(0).appendChild(meta);
}

getElementsByClassName = function(cls) {
	var returnNode = [];
	var myclass = new RegExp('\\b'+cls+'\\b');
	
	var elem = document.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) returnNode.push(elem[i]);
	}
	return returnNode;
}; 