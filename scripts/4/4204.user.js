// UFIS! Universal Flickr Image Search
// version 001 ALPHA
// no copyright
// done by lscherff
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Extras/Manage User Scripts,
// select "UFIS!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          UFIS!
// @namespace     http://www.khm.de/~lscherff/ufis
// @description   Add a button to enable instant flickr CBIR and tag search for any JPG you come across.
// @include       *
// @exclude       http://www.khm.de/~lscherff/ufis/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// To turn the script on/off click: Extras/User Script Commands/Toggle UFIS!
// 
// --------------------------------------------------------------------
//
// Version: 001 ALPHA
// Todo:
// - Use another CBIR system (one with more diverse image data and HTTP API)
// - Eliminate common words using some wordnet interface (http://wordnet.princeton.edu/links#web)
// - Button-images are not placed correctly over images that float right/center 

var flicks;
var retrs;
var flickrTags;
var currentURI;
var yOffset, xOffset;
var viewFIS;
var tmpView;

function done() {
	if (tmpView) document.body.removeChild(tmpView); tmpView = null;
	var srcImg = document.createElement('img'); srcImg.src = currentURI;
	var width = srcImg.width + 488; if (width==488) width = 500;	// middle image determines total width
	var x = xOffset-width/2; if (x<20) x = 20;
	var y = yOffset-100; if (y<0) y = 0;
	if (viewFIS) {
		x = parseInt(viewFIS.style.left);
		y = parseInt(viewFIS.style.top);
		document.body.removeChild(viewFIS);
	}
	viewFIS = document.createElement('div');
	viewFIS.style.position = 'absolute';
	viewFIS.style.zIndex = '1001';
	
	viewFIS.style.width = width+'px';
	viewFIS.style.top = y+'px';
	viewFIS.style.left = x+'px';
	viewFIS.style.backgroundColor = 'white';
	viewFIS.style.border = 'solid black 1px';
	viewFIS.style.color = '#505050';
	viewFIS.style.fontFamily = 'Helvetica,Arial,sans-serif !important';
	viewFIS.style.fontSize = '10pt !important';
	viewFIS.style.textAlign = 'left';
	document.body.appendChild(viewFIS);
	
	viewFIS.innerHTML = '<h1 style="font-family: Times New Roman; font-size: 14pt; padding: 4px; "><a href="http://www.khm.de/~lscherff/ufis" target="_blank" style="text-decoration: none; color: #c0c0c0; font-family: Times New Roman;">UFIS!</a> is giving you some <a href="http://www.khm.de/~lscherff/ufis" target="_blank" style="text-decoration: none; color: #c0c0c0; font-family: Times New Roman; ">similar</a> images.</h1>';
	var flickDiv = document.createElement('div');
	flickDiv.setAttribute('style','float: left; ');
	flickDiv.style.width = '240px';
	flickDiv.style.textAlign = 'right';
	flickDiv.style.verticalAlign = 'top';
	if (flicks.firstChild) {
		insertImages(flickDiv,0,flicks);
		var p = document.createElement('p');
		p.innerHTML = '...via <a href="http://flickr.com/search/" target="_blank" style="text-decoration: none; color: #c0c0c0; font-family: Helvetica,Arial,sans-serif; ">flickr tag search</a> (using tags '+flickrTags.replace(/,/g,', ')+')'
		flickDiv.appendChild(p);
	} else 	flickDiv.innerHTML += '<p style="margin: 2px;"><a href="http://www.flickr.com/photos/search/" target="_blank" style="text-decoration: none; color: #c0c0c0; font-family: Helvetica,Arial,sans-serif; font-size: 10pt; ">flickr tag search</a> did not find any images for tag(s) '+flickrTags.replace(/,/g,', ')+'</p>';
	viewFIS.appendChild(flickDiv);
	
	retrDiv = document.createElement('div');
	retrDiv.setAttribute('style','float: right; ');
	retrDiv.style.width = '240px';
	retrDiv.style.textAlign = 'left';
	retrDiv.style.verticalAlign = 'top';
	if (retrs.firstChild) {
		insertImages(retrDiv,0,retrs);
		var p = document.createElement('p');
		p.innerHTML = '...via <a href="http://labs.systemone.at/retrievr" style="text-decoration: none; color: #c0c0c0; font-family: Helvetica,Arial,sans-serif; ">retrievr</a>';
		retrDiv.appendChild(p);
	} else retrDiv.innerHTML += '<p style="margin: 2px;"><a href="http://labs.systemone.at/retrievr/" style="text-decoration: none; color: #c0c0c0; font-family: Helvetica,Arial,sans-serif; ">retrievr</a> did not find any images</p>';
	viewFIS.appendChild(retrDiv);
	
	var middleDiv = document.createElement('div');
	middleDiv.style.margin = '0 240px 0 240px';
	var css = 'float: none; ';
	srcImg.style.margin = '2px';
	middleDiv.appendChild(srcImg);
	viewFIS.appendChild(middleDiv);
	
	var closeFIS = document.createElement('img');
	closeFIS.style.position = 'absolute';
	closeFIS.style.top = '4px';
	closeFIS.style.right = '4px';
	closeFIS.style.border = 'solid black 1px';
	closeFIS.src = 'http://www.khm.de/~lscherff/ufis/close.gif';
	closeFIS.addEventListener('click', function(event) {
		document.body.removeChild(viewFIS);
		viewFIS = null;
		event.stopPropagation();
		event.preventDefault();
	}, true);
	viewFIS.appendChild(closeFIS);
}

function insertImages(targetDiv,from,sourceDiv) {
	var child = targetDiv.firstChild;
	if (child) while (child.nextSibling) { var next = child.nextSibling; targetDiv.removeChild(child); child = next; }
	if (from>0) {
		var lesser = document.createElement('p');
		var lessLnk = document.createElement('a');
		var lessFrom = from-6; if (lessFrom<0) lessfrom = 0;
		lessLnk.appendChild(document.createTextNode((lessFrom+1)+' - '+(lessFrom+6)));
		lessLnk.addEventListener('click', function(event) {
			insertImages(targetDiv,lessFrom,sourceDiv);
			event.stopPropagation();
			event.preventDefault();
		}, true);
		lesser.appendChild(lessLnk); 
		targetDiv.insertBefore(lesser,child);
	}
	var stop = from+6;
	for (var i=from; i<stop; i++) {
		var container = document.createElement('span');
		container.style.position = 'relative';
		var blaImage = document.createElement('img');
		blaImage.setAttribute('src', 'http://www.khm.de/~lscherff/ufis/ufis.gif');
		blaImage.setAttribute('width','10');
		blaImage.setAttribute('height','10');
		blaImage.setAttribute('data',sourceDiv.childNodes[i].firstChild.src);
		blaImage.setAttribute('alt',sourceDiv.childNodes[i].firstChild.getAttribute('alt'));
		blaImage.setAttribute('style','position: absolute; bottom: 5px; left: 2px; border: solid black 1px; padding: 0px; margin: 0px; ');
		blaImage.addEventListener('click', function(event) {
			var URI = event.target.getAttribute("data");
			currentURI = URI;
			retrieveImages(URI, event.target.getAttribute('alt'));
			event.stopPropagation();
			event.preventDefault();
		}, true);
		container.appendChild(sourceDiv.childNodes[i].cloneNode(true));
		container.appendChild(blaImage);
		targetDiv.insertBefore(container,child);
	}
	var moreFrom = from+6;
	if 	(moreFrom<sourceDiv.childNodes.length) {
		var morer = document.createElement('p');
		var moreLnk = document.createElement('a');
		var moreTo = moreFrom+7; if (moreTo>=sourceDiv.childNodes.length) moreTo = sourceDiv.childNodes.length;
		moreLnk.appendChild(document.createTextNode('next '+(moreFrom+1)+' - '+moreTo+' (of '+sourceDiv.childNodes.length+')'));
		moreLnk.addEventListener('click', function(event) {
			insertImages(targetDiv,moreFrom,sourceDiv);
			event.stopPropagation();
			event.preventDefault();
		}, true);
		morer.appendChild(moreLnk); 
		targetDiv.insertBefore(morer,child);
	}
}

function parseFlickrResponse(responseDetails) {
	GM_log('PFR');
	var text = responseDetails.responseText;
	var parser = new DOMParser();
	var responseDOM = parser.parseFromString(responseDetails.responseText, "application/xml");
	GM_log(responseDOM);
	var photos = responseDOM.getElementsByTagName('photo');
	GM_log('length: '+photos.length);
	var flickrDiv = document.createElement('div');
	if (photos.length==0) {
		flicks = flickrDiv;
	} else {
		for (var i=0; i<photos.length; i++) {
			var imgLink = document.createElement('a');
			imgLink.href = 'http://www.flickr.com/photos/'+photos[i].getAttribute('owner')+'/'+photos[i].getAttribute('id');
			imgLink.target = '_blank';
			var img = document.createElement('img');
			img.src = 'http://static.flickr.com/'+photos[i].getAttribute('server')+'/'+photos[i].getAttribute('id')+'_'+photos[i].getAttribute('secret')+'_t.jpg';
			img.setAttribute('style', 'margin: 2px; border: none; float: none; ');
			imgLink.appendChild(img);
			flickrDiv.appendChild(imgLink);
		}
		flicks = flickrDiv;
	}
	if (retrs!=null) done();
}

function parseRetrievrImages(responseDetails) {
	GM_log('PRI');
	GM_setValue('flickr',false);
	var html = responseDetails.responseText;
	var imgTags = html.match(/<a href[^<]*<img[^>]*><\/a>/g);
	var allImgs;
	if (!imgTags) allImgs = '';
	else {
		for (var i=0; i<imgTags.length; i++) {
			var pattern = /<a href=\\"([^\\]*)[^<]*<img src=\\"([^\\]*)\\".*/;
			pattern.exec(imgTags[i]);
			var aHref = RegExp.$1;
			var imgSrc = RegExp.$2;
			if (imgSrc.indexOf('http://')>-1 && aHref.indexOf('http://'>-1))
				allImgs += '<a href="'+aHref+'" target="_blank"><img src="'+imgSrc+'" style="border: none; margin: 2px; float: none; " /></a>';
		}
	}
	var retrievrDiv = document.createElement('div');
	retrievrDiv.innerHTML = allImgs;
	retrs = retrievrDiv;
	if (retrs.firstChild) retrs.removeChild(retrs.firstChild);	// don't ask me why
	if (flicks!=null) done();
}

function parseRetrievrResponse(responseDetails) {
	GM_log('PRR');
	GM_setValue('retrievr',false);
	var html = responseDetails.responseText;
	var iframeTag = html.match(/<iframe .*>/g);
	var pattern = /(src=")([^"]*)(".*)/;
	pattern.exec(iframeTag);
	var src = RegExp.$2;
	src = 'http://labs.systemone.at' + src;
	GM_xmlhttpRequest({
		method: 'GET',
		url: src,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/xhtml+xml',
		},
		onload: parseRetrievrImages
	});
}

function retrieveImages(URI,alt) {
    if (tmpView) document.body.removeChild(tmpView);
	tmpView = document.createElement('div');
	tmpView.style.padding = '2px';
	tmpView.style.position = 'absolute';
	tmpView.style.backgroundColor = 'white';
	tmpView.style.border = 'solid black 1px';
	tmpView.style.top = yOffset-10+'px';
	tmpView.style.left = xOffset-40+'px';
	var tp = document.createElement('span');
	tp.style.paddingRight = '30px';
	tp.appendChild(document.createTextNode("UFIS! is searching... "));
	tmpView.appendChild(tp);
	var abort = document.createElement('img');
	abort.style.position = 'absolute';
	abort.style.top = '2px';
	abort.style.right = '2px';
	abort.style.border = 'solid black 1px';
	abort.src = 'http://www.khm.de/~lscherff/ufis/close.gif';
	abort.addEventListener('click', function(event) {
		document.body.removeChild(tmpView);
		event.stopPropagation();
		event.preventDefault();
	}, true);
	tmpView.appendChild(abort);
	document.body.appendChild(tmpView);
	
	flicks = null; retrs = null;
	flickrTags = '';
	// get from retrievr
	var end = URI.indexOf('.jpg');
	if (end<URI.length-4) URI = URI.substring(0,end+4);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://labs.systemone.at/retrievr/?url=' + URI,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/xhtml+xml',
		},
		onload: parseRetrievrResponse
	});
	if (URI.indexOf('http://static.flickr.com')>-1) {
		var pattern = /(static.flickr.com\/[^\/]*\/)([^_]*)/;
		pattern.exec(URI);
		var flickrId = RegExp.$2;
		if (flickrId) {
			var flickrURI = 'http://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=86e1a4a541d4c0442c4a37592780d14f&photo_id='+flickrId;
			GM_xmlhttpRequest({
				method: 'GET',
				url: flickrURI,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
					'Accept': 'application/xhtml+xml',
				},
				onload: function(responseDetails) {
					var allTags = '';
					var parser = new DOMParser();
					var responseDOM = parser.parseFromString(responseDetails.responseText, "application/xml");
					var tags = responseDOM.getElementsByTagName('tag');
					for (var i=0; i<tags.length; i++) {
						allTags += tags[i].firstChild.nodeValue;
						if (i<tags.length-1) allTags+=',';
					}
					flickrTags = allTags;
					getFromFlickr();
				}
			});
		}
	} else {
		if (flickrTags=='') {
			URI = URI.replace(/ /g,'%2C');
			var pattern = /(find similar images for: )(.*)/;
			pattern.exec(alt);
			alt = RegExp.$2;
			if (alt == '' || alt == 'null') {
				// use page title
				var title = document.getElementsByTagName("title");
				if (title.length>0) {
					alt = title[0].text;
					alt = alt.replace(/ /g,',');
				} 
				if (alt == '' || alt == 'null') {
					// use filename
					alt = URI.match(/\/[^\/]*\.jpg/)[0];
					alt = alt.substring(1,alt.length-4);
				}
			} else alt = alt.replace(/ /g,',');
			flickrTags = alt;
			getFromFlickr();
		}
	}
}

function getFromFlickr() {
	var flickrURI = 'http://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=86e1a4a541d4c0442c4a37592780d14f&per_page=25&page=1&tags='+flickrTags;
	GM_xmlhttpRequest({
		method: 'GET',
		url: flickrURI,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/xhtml+xml',
		},
		onload: parseFlickrResponse
	});
}

function addFlink() {
	var imgs = document.getElementsByTagName('img');
	for (var i=0; i<imgs.length; ) {
		var image = imgs[i];
		if (image.getAttribute('src') && image.getAttribute('src').indexOf('.gif')<0 && image.getAttribute('src').indexOf('.jpg')>0) {
			var parent = image.parentNode;
			var URI;
			var src = image.getAttribute('src');
			if (src.indexOf('/') == 0) src = src.substring(1,src.length);
			if (image.getAttribute('src').search('http://')>-1) URI = src;
			else {
				URI = 'http://' + location.hostname + location.pathname;
				if (URI.lastIndexOf('/') < URI.length-1)	URI = URI.substring(0,URI.lastIndexOf('/')+1);
				URI = URI + src;
			}
			var container = document.createElement('div');
			container.style.position = 'relative';
			var blaImage = document.createElement('img');
			blaImage.setAttribute('src', 'http://www.khm.de/~lscherff/ufis/ufis.gif');
			blaImage.setAttribute('width','10');
			blaImage.setAttribute('height','10');
			blaImage.setAttribute('data',URI);
			blaImage.setAttribute('alt', 'find similar images for: '+image.getAttribute('alt'));
			blaImage.setAttribute('style', 'position: absolute; top: -2px; left: -2px; border: solid black 1px; float: left; ');
			blaImage.addEventListener('click', function(event) {
				var URI = event.target.getAttribute("data");
				yOffset = event.pageY;
				xOffset = event.pageX;
				currentURI = URI;
				if (viewFIS) document.body.removeChild(viewFIS); viewFIS = null;
				retrieveImages(URI, event.target.getAttribute('alt'));
				event.stopPropagation();
				event.preventDefault();
			}, true);
			container.appendChild(image.cloneNode(true));
			container.appendChild(blaImage);
			image.parentNode.replaceChild(container, image);
			i+=2;
		} else i++;
	}
}

GM_registerMenuCommand('Toggle UFIS!', function(event) {
	var on = GM_getValue('on', false);
	on = !on;
	GM_setValue('on',on);
	if (on) addFlink();
});

if (!GM_getValue('on', false)) return;
else window.addEventListener(
		'load', 
		addFlink(),
		true);
