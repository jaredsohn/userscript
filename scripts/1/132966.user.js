// ==UserScript==
// @name           GR-Tools | Bilderverwaltung
// @namespace      http://gr-tools.justlep.net/
// @description    Zeigt bei der Einzelbildansicht in der Bilder-Verwaltung die anderen Bilder der aktuellen Galerie mit an.
// @include        http*://www.gayromeo.com/*mitglieder/administration/pictures/overview.php?*
// @include        http*://www.gayromeo.com/*mitglieder/administration/pictures/edit.php?id=*
// @include        http*://www.planetromeo.com/*mitglieder/administration/pictures/overview.php?*
// @include        http*://www.planetromeo.com/*mitglieder/administration/pictures/edit.php?id=*
// @include        http*://83.98.143.20/*mitglieder/administration/pictures/overview.php?*
// @include        http*://83.98.143.20/*mitglieder/administration/pictures/edit.php?id=*
// @version $Revision: 1.10 $
// @date    $Date: 2012/05/12 08:06:37 $
// @author LeP <gr-tools@justlep.net>
// @icon data:image/gif;base64,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%3D
// ==/UserScript==

var CACHE_NAME = 'grtimagecache',
	LAST_GALLERY_URL_PARAM = 'grtlastgalleryblubs',
	NEXT_IMAGE_URL_PARAM = 'grtnextimageblubs',
	leftWin = (top.wrappedJSObject||top).document.getElementsByName('mitte')[0].contentWindow.document.getElementsByName('navibar')[0].contentWindow,
	doc = (self.wrappedJSObject || self).document,
	leftDoc = leftWin.document,
	isGallery = /folder=-?\d+/.test(self.location.href),
	isOverviewAfterComment = /action=comment&id=\d+/.test(self.location.href),
	imageParam = (self.location.href.match(/(id=\d+)/)||[])[0],
	isImage = !!imageParam,
	getCache = function() {
		return leftDoc.body.getAttribute(CACHE_NAME) || '';
	},
	setCache = function(html) {
		leftDoc.body.setAttribute(CACHE_NAME, html||'');
	},
	saveCurrentGalleryUrl = function() {
		leftDoc.body.setAttribute(LAST_GALLERY_URL_PARAM, self.location.href);
	},
	getLastGalleryUrl = function() {
		return leftDoc.body.getAttribute(LAST_GALLERY_URL_PARAM) || '';
	},
	setNextImageUrl = function(url) {
		leftDoc.body.setAttribute(NEXT_IMAGE_URL_PARAM, url||''); 
	},
	getNextImageUrl = function() {
		return leftDoc.body.getAttribute(NEXT_IMAGE_URL_PARAM) || '';
	};

if (isOverviewAfterComment) {

	// jump to next image in the current gallery OR to the current gallery's picture overview
	var nextImageOrGalleryUrl = getNextImageUrl() || getLastGalleryUrl();
	if (nextImageOrGalleryUrl) {
		self.location.href = nextImageOrGalleryUrl;
	}

} else if (isGallery) {

	var cache = [],
		pics = doc.getElementsByClassName('thumb');

	for (var i=0; i<pics.length; i++) {
		var html = pics[i].parentNode.parentNode.innerHTML;
		cache.push(html);
	}
	
	setCache(cache.join('&nbsp;'));
	saveCurrentGalleryUrl();

} else if (isImage) {

	var html = getCache(),
		isMoreThatOne = (html.match(/<img/g)||[]).length > 1;
	
	if (isMoreThatOne) {
		var h1 = doc.getElementsByTagName('h1')[0],
			div = doc.createElement('div');

		div.id = 'grtimageblablubs';
		div.innerHTML = html;
		h1.parentNode.insertBefore(div, h1);
	}

	var st = doc.createElement('style');
	st.type = 'text/css';
	st.innerHTML = '#grtimageblablubs img {max-height:40px;max-width:40px} #grtimageblablubs a.blubs img {border:2px solid #fc0}';
	doc.getElementsByTagName('head')[0].appendChild(st);
	var as = doc.getElementById('grtimageblablubs').getElementsByTagName('a'),
		currentFound = false;
	setNextImageUrl();
	for (var i=0; i<as.length; i++) {
		var a = as[i],
			isCurrent = a.href.indexOf(imageParam) >= 0;
		if (!isCurrent && !currentFound) continue;
		if (!isCurrent && currentFound) {
			setNextImageUrl(a.href);
			break;
		}
		as[i].className = 'blubs';
		currentFound = true;
	}
}