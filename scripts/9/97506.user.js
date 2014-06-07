/* vim: ts=4 noet ai :
$Id: $

High Res Flickr 

Rewrites Flickr thumbnails and images to a higher-resolution so that 
they don't look like minute specks on a 1600x1200 display.

Copyright (c) 2006 very1silent@yahoo.com

Derived from "Link Original Image" which is (c) 2005-2006 J.Q. la Poutre
and licensed under the Gnu Public License version 2.

LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========
1.01: initial released verison
1.02: Add support for tag page view, block rewrites on thumbnail page view 
      in "all sizes"

*/
// ==UserScript==
// @name           High Res Flickr
// @namespace      http://www.geocities.com/user/very1silent/
// @description    Convert the Flickr web site to use high-resolution images appropriate for 1600x1200 displays
// @include        http:*flickr.com/*
// @exclude        http://flickr.com/photos/organize*
// @exclude        http://www.flickr.com/photos/organize*
// @exclude	   http://www.flickr.com/photo_zoom.gne?*size=t
// @exclude        http://www.flickr.com/search/*

// @version	       1.02
// ==/UserScript==


// use Firebug if available
function myLog(msg) {
	try {
		unsafeWindow.console.log(msg);
	} catch (e) {
		GM_log(msg);
	}
}


// function for adding debug info on top of flickr pages
function addToLog(aMessage){
//	var p = document.getElementById('debug');
//	if(p) p.innerHTML += '<br />' + aMessage;
}

// Real-world big versions are always JPEGs.  If there isn't one,
// flickr returns particular GIF which is 2900 bytes long
function CheckBig(href, img) {
	var pattern1 = new RegExp("Content-Type\:\ image\/gif");
	var pattern2 = new RegExp("Content-Length\:\ 2900");
	GM_xmlhttpRequest({
		method: "GET",
		url: href,
		headers: {
			"User-agent": "Mozilla/4.0 (compatible) Greasemonkey (Flickr Group Display)",
			"Accept": "application/atom+xml,application/xml,text/xml",
			},
		onload: function onloadCallback(responseDetails) {
			addToLog('<hr />responseDetails.finalUrl:' + responseDetails.finalUrl);
			addToLog('<hr />responseDetails.responseHeaders:' + responseDetails.responseHeaders);
			if (responseDetails.status == 200 && 
			    !pattern1.test(responseDetails.responseHeaders) &&
			    !pattern2.test(responseDetails.responseHeaders)) {
				img.src = href;
				img.width = img.width * 2;
				img.height = img.height *2;
				img.className = "AltReflect";
			}
		},
		});
}



var RewritePage = {
	hlist: {},
	tmr: null,
	photoSizesArray:[],
	photoId:-1,
	// funcs
	add: function(img, linkHref, label) {
		this.hlist[img.src] = new ImgLink(img, linkHref, label);
	},
	remove: function(img) {
		var obj = this.hlist[img.src];
		if (obj) {
			obj.removeIcon();
			delete this.hlist[img.src];
		}
	},
	reshuffle: function() {
		for (var i in RewritePage.hlist) {
			RewritePage.hlist[i].reshuffle();
		}
	},
	// wait some millisecs to avoid very rapidly repeated invocation
	reshuffleSoon: function() {
		if (RewritePage.tmr) clearTimeout(RewritePage.tmr);
		RewritePage.tmr = setTimeout(RewritePage.reshuffle, 12);
	},
	insertLinks: function(doc) {

		// Example: http://static.flickr.com/33/55621048_77aea67ae5_l.jpg
		//          http://static.flickr.com/71/196046852_491ba6a98d_s.jpg
		// http://developer.mozilla.org/en/docs/DOM:document.evaluate
		var list = doc.getElementsByTagName("img");
		var list2 = doc.getElementsByTagName("p");
		var list3 = doc.getElementsByTagName("div");
		var list4 = doc.getElementsByTagName("td");
		var list5 = doc.getElementsByTagName("table");

		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var href = img.getAttribute("src");
			var pattern1 = new RegExp("reflect");

			if (pattern1.test(img.className)) {
				var testimg;
				href = href.replace(/\.jpg/,"_b.jpg");
				//CheckBig(href, img);
				continue;
			}

			// only images with thumbnail signature			
			if (href.match(/static\.flickr\.com.*_t\.jpg/)) {
				href = href.replace(/(_.\.jpg|\.jpg)/, ".jpg");
				img.src = href;
				img.width = img.width * 2;
				img.height = img.height * 2;
				img.className = "AltImage";

			} else {
				continue;
			}

		}
		
		
		for (var i = 0; i <list2.length; i++) {
			var ThisDiv = list2[i];
			var pattern1 = new RegExp("PoolList");
			var pattern2 = new RegExp("Main");
			var pattern3 = new RegExp("HoldPhotos");
			var pattern4 = new RegExp("TopBarhotos");
			var pattern5 = new RegExp("Primary");
			var pattern6 = new RegExp("SubNav");
			var pattern7 = new RegExp("GroupPoolList");
			var pattern8 = new RegExp("RecentPhotos");
			var pattern20 = new RegExp("StreamList");
			var pattern21 = new RegExp("UserTagList");

			if (pattern20.test(ThisDiv.className) ||
			    pattern21.test(ThisDiv.className)) {
				ThisDiv.className = "AltStreamList";
				ThisDiv.setAttribute("style", "display: inline; float: left; margin-right: 10px; margin-bottom: 10px; width: 200px; height: 200px; font-size: 16px");
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}

			if (pattern7.test(ThisDiv.className)) {
				ThisDiv.className = "AltGroupPoolList";
			}

			if (pattern1.test(ThisDiv.className) ||
			    pattern8.test(ThisDiv.className)) {
				ThisDiv.className = "AltPoolList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}
			if (pattern2.test(ThisDiv.className)) {
				ThisDiv.className = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";

			}
			if (pattern2.test(ThisDiv.id)) {
				ThisDiv.id = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";
			}
			if (pattern4.test(ThisDiv.className)) {
				ThisDiv.className = "AltTopBar";
			}
			if (pattern5.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltPrimary";
			}
			if (pattern6.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltSubNav";
			}
		}

		for (var i = 0; i <list3.length; i++) {
			var ThisDiv = list3[i];
			var pattern1 = new RegExp("PoolList");
			var pattern2 = new RegExp("Main");
			var pattern3 = new RegExp("HoldPhotos");
			var pattern4 = new RegExp("TopBarhotos");
			var pattern5 = new RegExp("Primary");
			var pattern6 = new RegExp("SubNav");
			var pattern7 = new RegExp("GroupPoolList");
			var pattern8 = new RegExp("RecentPhotos");
			var pattern9 = new RegExp("photoImgDiv");
			var pattern20 = new RegExp("StreamList");

			if (pattern20.test(ThisDiv.classname)) {
				ThisDiv.setAttribute("style", "display: inline; float: left; margin-right: 10px; margin-bottom: 10px; width: 200px; height: 200px; font-size: 16px");
				ThisDiv.className = "AltStreamList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}

			if (pattern9.test(ThisDiv.className)) {
				ThisDiv.setAttribute("style", "width: 1004px");
				ThisDiv.id = "Alt_" + ThisDiv.id;
				ThisDiv.classname = "AltPhotoImgDiv";

			}


			if (pattern7.test(ThisDiv.className)) {
				ThisDiv.className = "AltGroupPoolList";
			}

			if (pattern1.test(ThisDiv.className) ||
			    pattern8.test(ThisDiv.className)) {
				ThisDiv.className = "AltPoolList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}
			if (pattern2.test(ThisDiv.className)) {
				ThisDiv.className = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";
			}
			if (pattern2.test(ThisDiv.id)) {
				ThisDiv.id = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";
			}
			if (pattern6.test(ThisDiv.id)) {
				ThisDiv.width = "1420";
				ThisDiv.id = "AltSubNav";
			}
			if (pattern3.test(ThisDiv.className)) {
				ThisDiv.className = "AltHoldPhotos";
			}
			if (pattern4.test(ThisDiv.className)) {
				ThisDiv.className = "AltTopBar";
			}
			if (pattern5.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltPrimary";
			}

		}

		for (var i = 0; i <list4.length; i++) {
			var ThisDiv = list4[i];
			var pattern1 = new RegExp("PoolList");
			var pattern2 = new RegExp("Main");
			var pattern3 = new RegExp("HoldPhotos");
			var pattern4 = new RegExp("TopBarhotos");
			var pattern5 = new RegExp("Primary");
			var pattern6 = new RegExp("SubNav");
			var pattern7 = new RegExp("GroupPoolList");
			var pattern8 = new RegExp("RecentPhotos");

			var pattern9 = new RegExp("photoswftd");
			var pattern20 = new RegExp("StreamList");

			if (pattern20.test(ThisDiv.classname)) {
				ThisDiv.setAttribute("style", "display: inline; float: left; margin-right: 10px; margin-bottom: 10px; width: 200px; height: 200px; font-size: 16px");
				ThisDiv.className = "AltStreamList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}

			if (pattern9.test(ThisDiv.className)) {
				ThisDiv.className = "AltPhotoswftd";
				ThisDiv.width = ThisDiv.width * 2;
			}

			if (pattern7.test(ThisDiv.className)) {
				ThisDiv.className = "AltGroupPoolList";
			}

			if (pattern1.test(ThisDiv.className) ||
			    pattern8.test(ThisDiv.className)) {
				ThisDiv.className = "AltPoolList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}
			if (pattern2.test(ThisDiv.className)) {
				ThisDiv.className = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";
			}
			if (pattern2.test(ThisDiv.id)) {
				ThisDiv.id = "AltMain";
				ThisDiv.style.marginLeft = "100px";
				ThisDiv.style.marginRight = "100px";
			}
			if (pattern6.test(ThisDiv.id)) {
				ThisDiv.width = "1420";
				ThisDiv.id = "AltSubNav";
			}
			if (pattern3.test(ThisDiv.className)) {
				ThisDiv.className = "AltHoldPhotos";
			}
			if (pattern4.test(ThisDiv.className)) {
				ThisDiv.className = "AltTopBar";
			}
			if (pattern5.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltPrimary";
			}
			if (pattern6.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltSubNav";
			}
		}

		for (var i = 0; i <list5.length; i++) {
			var ThisDiv = list5[i];
			var pattern1 = new RegExp("PoolList");
			var pattern2 = new RegExp("Main");
			var pattern3 = new RegExp("HoldPhotos");
			var pattern4 = new RegExp("TopBarhotos");
			var pattern5 = new RegExp("Primary");
			var pattern6 = new RegExp("SubNav");
			var pattern7 = new RegExp("GroupPoolList");
			var pattern8 = new RegExp("RecentPhotos");
			var pattern9 = new RegExp("TopicListing");
			var pattern10 = new RegExp("button_bar");
			var pattern20 = new RegExp("StreamList");

			if (pattern20.test(ThisDiv.classname)) {
				ThisDiv.setAttribute("style", "display: inline; float: left; margin-right: 10px; margin-bottom: 10px; width: 200px; height: 200px; font-size: 16px");
				ThisDiv.className = "AltStreamList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}


			
			if (pattern10.test(ThisDiv.className)) {
				ThisDiv.className = "AltButton_bar";
				ThisDiv.width = ThisDiv.width *2;
			}

			if (pattern9.test(ThisDiv.className)) {
				ThisDiv.className = "AltTopicListing";
				ThisDiv.setAttribute("style", "font: 18px Arial, Helvetica, sans-serif; margin: 0px; width: 100%;");
				
			}


			if (pattern7.test(ThisDiv.className)) {
				ThisDiv.className = "AltGroupPoolList";
			}

			if (pattern1.test(ThisDiv.className) ||
			    pattern8.test(ThisDiv.className)) {
				ThisDiv.className = "AltPoolList";
				ThisDiv.style.display = "inline";
				ThisDiv.style.cssFloat = "left";
				ThisDiv.style.marginRight = "10px";
				ThisDiv.style.marginBottom = "10px";
				ThisDiv.style.width = "200px";
				ThisDiv.style.height = "220px";
				ThisDiv.style.fontSize = "16px";
			}

			if (pattern2.test(ThisDiv.className)) {
				ThisDiv.className = "AltMain";
				ThisDiv.style.marginLeft = "100px";
			}
			if (pattern2.test(ThisDiv.id)) {
				ThisDiv.id = "AltMain";
				ThisDiv.style.marginLeft = "100px";

			}
			if (pattern6.test(ThisDiv.id)) {
				ThisDiv.width = "1420";
				ThisDiv.id = "AltSubNav";
			}
			if (pattern3.test(ThisDiv.className)) {
				ThisDiv.className = "AltHoldPhotos";
			}
			if (pattern4.test(ThisDiv.className)) {
				ThisDiv.className = "AltTopBar";
			}
			if (pattern5.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltPrimary";
			}
			if (pattern6.test(ThisDiv.className)) {
				ThisDiv.width = "1420";
				ThisDiv.className = "AltSubNav";
			}
		}


	},
	addEvtListeners: function() {
		// Ajax: new image
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// myLog(evt);
				try {
					// will fail if new node is not ElementNode
					RewritePage.insertLinks(evt.target);
				} catch (e) {}
			}, true);
		// Ajax: remove an image
		document.addEventListener("DOMNodeRemoved",
			function(evt) {
				// myLog(evt);
				try {
					var list = evt.target.getElementsByTagName("img");
					for (var i = 0; i < list.length; i++) {
						RewritePage.remove(list[i]);
					}	
				} catch (e) {}
			}, true);
		// DOM manipulation, which can cause reflow
		document.addEventListener("DOMAttrModified",
			function(evt) {
				// myLog(evt);
				RewritePage.reshuffleSoon();
			}, true);
		// catch window resize events
		window.addEventListener("resize",
			function() { RewritePage.reshuffle(); }, true);
		// catch any unnoticed change, for Safari / Creammonkey
		setInterval(RewritePage.reshuffleSoon, 500);
	},
	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black;  background-color: silver; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; }', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black; background-color: yellow; }', 0);

		sty.insertRule('AltPoolList { font-size: 16px; padding: 0px; margin-right: 10px; margin-bottom: 10px;  text-align: left; float: left; width: 250px; height: 300px; display: inline; } ', 0);
		sty.insertRule('AltStreamList { font-size: 16px; padding: 0px; margin-right: 10px; margin-bottom: 10px;  text-align: left; float: left; width: 250px; height: 300px; display: inline; } ', 0);
		sty.insertRule('AltMain { width: 1420px; float: left; margin-left: 30px; }', 0);
		sty.insertRule('AltHoldPhotos { padding-left: 60px; width: 1300px; }', 0);
		sty.insertRule('.AltTopBar .Header { width: 1560px; margin-top: 0px; margin-right: auto; margin-left: auto; }', 0);


		sty.insertRule('.AltGroupPoolList { padding: 6px; color: #666666; display: inline; }', 0);
		sty.insertRule('.AltGroupPoolList h4 { font-weight: bold; font-size: 12px; margin-top: 0px; }', 0);
		sty.insertRule('.AltGroupPoolList p { margin: 0px; display: inline; }', 0);
		sty.insertRule('AltImage { float: left; padding: 10px; display: inline; }', 0);

	},
	ResizeEverything: function (obj){
		var availWidth = window.screen.availWidth;
		var availHeight = window.screen.availHeight;
		var newWidth = obj.width * 2;
		var newHeight = obj.height * 2;

		if (obj.width) {
			obj.width = newWidth;
			obj.height = newHeight;
		} else 	if (obj.style) {
			obj.style.height = newHeight;
			obj.style.width = newWidth;
			
		}
/*
		if (obj.hasChildNodes) {
			var children = obj.childNodes;
			for (var i = 0; i < children.length; i++) {
				this.ResizeEverything(children[i]);
			}
		}*/		
		
	},

	// function
	// input: aLabel - name of searched photo size like "Original", "Large", etc.
	// output: integer, index of name of searched photo size, when not found returns -1
	indexOfLabel: function(aLabel){
		var tIndex = -1;
		//alert(RewritePage.photoSizesArray.length);
		for(var i=0; i<RewritePage.photoSizesArray.length; i++){
			if(RewritePage.photoSizesArray[i]['label'] == aLabel){
				tIndex = i;				
			}
		}
		return tIndex;
	},
	
	init: function() {
		this.addStyleRule();
		this.insertLinks(document);
		this.addEvtListeners();
//		this.ResizeEverything (document);

		// adding paragraph for debug info
		//var p  = document.createElement('p');
		//p.setAttribute('id', 'debug');
		//document.body.insertBefore(p, document.body.firstChild);
		
		addToLog('getting photo sizes ...');

		// getting photo id
		// 	http://www.flickr.com/photos/grebo_guru/17623108/
		var reText = '\/photos\/.?\/(\d+)';
		var re = new RegExp(reText);
		//alert(document.location.href);
		//var m = document.location.href.match(/\/photos\/.?\/(\d+)/);
		//var m = document.location.href.match(/(\d+)/);
		var m = document.location.href.match(/\/photos\/.+?\/(\d+)/);
		//alert(m);

		if (m){
			this.photoId = m[1];
		}

		addToLog('for photo_id:' + this.photoId);

		//	http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=eb646e834975c7e7fefda8907402e42e&photo_id=17623108

		// getting photo sizes for given photo id

		GM_xmlhttpRequest({
			method: 'GET',
			url:    'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes'
				  + '&api_key=45d5d4b7dff9bc653c8eb3e73271c10c'
				  + '&photo_id=' + RewritePage.photoId
				  + '&format=json&nojsoncallback=1',
				   
			onload: function(responseDetails) {
				//alert(p);
				var data        = eval('(' + responseDetails.responseText + ')');
				var sizes     = data['sizes']['size'];
				
				//var p  = document.createElement('p');
				//alert(p);
				//alert(sizes);
				for (i in sizes) {
					//methods[i] = methods[i]['_content'];
					//p.innerHTML += sizes[i]['label'] + "<br />";
				}
				addToLog(sizes.toSource());
				RewritePage.photoSizesArray = sizes;
				//tImgDiv = document.getElementById('Alt_photoImgDiv' + '17623108');
				tImgDiv = document.getElementById('Alt_photoImgDiv' + RewritePage.photoId);
	
				if(!tImgDiv)
					tImgDiv = document.getElementById('photoImgDiv' + RewritePage.photoId);
				
				//alert(tImgDiv.innerHTML);
				//tImg = tImgDiv.firstChild;
				//tImg = tImgDiv.childNodes[0];
				
				tImg = tImgDiv.getElementsByTagName('img')[0];
				//alert(tImgDiv.getElementsByTagName('img')[0].innerHTML);
				//alert(tImgDiv.getElementsByTagName('img')[0].outerHTML);
				//alert(tImgDiv.getElementsByTagName('img').length);
				//alert(tImgDiv.getElementsByTagName('img')[0].getAttribute('width'));

				// if photo size Original available
				if(RewritePage.indexOfLabel('Original') != -1){					
					j = RewritePage.indexOfLabel('Original');
					//alert(RewritePage.photoSizesArray[j].toSource());
					//alert(RewritePage.photoSizesArray[j]['source']);
					//alert(tImg.innerHTML);
					
					addToLog('<hr />' + RewritePage.photoSizesArray[j].toSource());
					addToLog('<hr />changing to original image source:' + RewritePage.photoSizesArray[j]['source'] + ' height:' + RewritePage.photoSizesArray[j]['height'] + ' width:' + RewritePage.photoSizesArray[j]['width']);
					
					// replacing src, height, width of current photo with original one
					tImg.setAttribute('src', RewritePage.photoSizesArray[j]['source']);
					tImg.setAttribute('width', RewritePage.photoSizesArray[j]['width']);
					tImg.setAttribute('height', RewritePage.photoSizesArray[j]['height']);
					//tImg.width = RewritePage.photoSizesArray[j]['width'];
					//tImg.height = RewritePage.photoSizesArray[j]['height'];
					
				// if photo size Large available					
				} else if (RewritePage.indexOfLabel('Large') != -1){

///

					j = RewritePage.indexOfLabel('Large');
					
					addToLog('<hr />' + RewritePage.photoSizesArray[j].toSource());
					addToLog('<hr />changing to large image source:' + RewritePage.photoSizesArray[j]['source'] + ' height:' + RewritePage.photoSizesArray[j]['height'] + ' width:' + RewritePage.photoSizesArray[j]['width']);
					
					// replacing src, height, width of current photo with large one
					tImg.setAttribute('src', RewritePage.photoSizesArray[j]['source']);
					tImg.setAttribute('width', RewritePage.photoSizesArray[j]['width']);
					tImg.setAttribute('height', RewritePage.photoSizesArray[j]['height']);
				}

///				
				
				

			}
		});

	}
};

// ImgLink Object, the icon on top of images
function ImgLink(img, linkHref, label) {
	var origHref = null;
	// try to find surrounding link element around image
	var node = img;
	while (node = node.parentNode) {
		if ("a" == node.nodeName.toLowerCase() &&
				node.getAttribute("href")) {
			origHref = node.getAttribute("href");
			node.setAttribute("href", linkHref);
			node.setAttribute("title", "Link to original uploaded image");
			img.setAttribute("title", "Link to original uploaded image");
			break;
		}
	}
	var link = document.createElement("a");
	link.setAttribute("class", "origLinkIcon");
	if (origHref) {
		link.setAttribute("href", origHref);
		link.setAttribute("title", "Link to " + label + " photo page");
		link.appendChild(document.createTextNode("Thmb"));
	} else {
		link.setAttribute("href", linkHref);
		link.setAttribute("title", "Link to original uploaded image");
		link.appendChild(document.createTextNode("ORIG"));
	}
	this.img = img;
	this.link = link;
	this.reshuffle();
	document.getElementsByTagName("body")[0].appendChild(link);
	
	//alert('sdsd');
}
ImgLink.prototype.removeIcon = function() {
	this.link.parentNode.removeChild(this.link);
}
ImgLink.prototype.reshuffle = function() {
	// computedStyle gives "auto" for position, 
	// if not set through CSS.
	// To be sire, revert to calculating the positions of
	// all parent elements on the page
	var top = 4;
	var left = 4;
	var obj = this.img;
	while (obj.offsetParent) {
		top += obj.offsetTop;
		left += obj.offsetLeft;
		obj = obj.offsetParent;
	}
	this.link.style.top = top + "px";
	this.link.style.left = left + "px";
//	this.link.display = ("hidden" == this.img.style.visibility) ? "none" : "inline";
}





RewritePage.init();

// end user script
