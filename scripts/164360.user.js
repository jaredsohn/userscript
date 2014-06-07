// ==UserScript==
// @name          stuface
// @version       0.1
// @description   Stupid Facebook Album Download Helper
// @namespace     http://userscripts.org/users/145387
// @include       htt*://*.facebook.com/media/*
// @match         http://*.facebook.com/media/*
// @match         https://*.facebook.com/media/*
// @author        arifhn
// ==/UserScript==

(function() {
	var imgs =  {
		popupbg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJCwEbAIsAo5oAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADUlEQVQI12NgYGCoBwAAhACAxkwJbwAAAABJRU5ErkJggg=='
	};
	
	function getElement(q, root, single) {
		if (root && typeof root == 'string') {
			root = $(root, null, true);
			if (!root) {
				return null;
			}
		}
		root = root || document;
		if (q[0] == '#') {
			return root.getElementById(q.substr(1));
		} else if (q[0] == '/' || (q[0] == '.' && q[1] == '/')) {
			if (single) {
				return document.evaluate(q, root, null,
						XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else {
				var i, r = [], x = document.evaluate(q, root, null,
						XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				while ((i = x.iterateNext()))
					r.push(i);
				return r;
			}
		} else if (q[0] == '.') {
			return root.getElementsByClassName(q.substr(1));
		}
		return root.getElementsByTagName(q);
	}

	function FBPhotos(el) {
		this.id = el.id;
		this.element = el;

		var tmp = getElement('.//i[contains(@class, "uiMediaThumbImg")]', el, true);
		if(tmp) {
			var url = tmp.getAttribute('style').match(/url\([^)]+\)/)[0];
			this.thumburl = url.substr(4, url.length - 5);
			this.fullurl = this.thumburl.replace('/p206x206/', '/');
		}
	}

	var FBPage = {
		showPopup: function(content) {
			this.popup.content.innerHTML = content;
			this.popup.style.display = 'block';
		},
		
		hidePopup: function() {
			this.popup.style.display = 'none';
		},

		getAlbumTitle: function() {
			var albumHeader = getElement('#album_header_pagelet');
			if(albumHeader) {
				var title = getElement('.//h1[@class="fbPhotoAlbumTitle"]', albumHeader, true);
				return title.innerHTML;
			}else {
				return 'UnknownAlbum';
			}
		},
		
		getPhotos: function() {
			var album = getElement('#album_photos_pagelet');
			var photos = getElement('.//div[contains(@class,"_53s")]', album);
			var result = [];
			for(var i = 0; i < photos.length; ++i) {
				var p = new FBPhotos(photos[i]);
				result.push(p);
			}
			return result;
		},
		
		showNormal: function() {
			var photos = this.getPhotos();
			var str = 'Copy and paste this URLs to your download manager<br/>';
			for(var i = 0; i < photos.length; ++i) {
				str += photos[i].fullurl + '<br/>';
			}
			this.showPopup(str);
		},
		
		showBash: function() {
			var photos = this.getPhotos();
			var str = '#!/bin/bash<br/>';
			var albumTitle = this.getAlbumTitle();
			// safe filename
			albumTitle = albumTitle.replace(/[^a-z0-9]/gi, '-');
			// create dir
			str += 'mkdir '+albumTitle+'<br/>';
			str += 'cd '+albumTitle+'<br/>';
			for(var i = 0; i < photos.length; ++i) {
				str += 'wget -O "'+albumTitle+'_'+i+'.jpg" "' + photos[i].fullurl + '"<br/>';
			}
			this.showPopup(str);
		},
		
		setup: function() {
			// setup first-time-only
			if(document.querySelector('#stuface')){
				return;
			}
			// add menu
			var fbmenu = document.querySelector('#userNavigation');
			if(fbmenu) {
				// normal-menu
				var btn1 = document.createElement('li');
				btn1.innerHTML='<a id="stuface-menu-normal" class="navSubmenu">Stuface - Get Photo URLs</a>';
				getElement('.//a[@id="stuface-menu-normal"]', btn1, true).addEventListener('click', function() {
					FBPage.showNormal();
				});
				fbmenu.appendChild(btn1);
				
				// bash-menu
				var btn2 = document.createElement('li');
				btn2.innerHTML='<a id="stuface-menu-bash" class="navSubmenu">Stuface - Get Bash Script</a>';
				getElement('.//a[@id="stuface-menu-bash"]', btn2, true).addEventListener('click', function() {
					FBPage.showBash();
				});	
				fbmenu.appendChild(btn2);
			}
			// set popup
			var pageHeight = window.innerHeight;
			var pageWidth = window.innerWidth;
			this.popup = document.createElement('div');
			this.popup.setAttribute('style', 'z-index:9000; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px; background-image:url('+imgs.popupbg+')');
			this.popup.style.display = 'none';
			this.popup.innerHTML = '<a id="stuface-popup-close" style="border: 2px solid white; text-decoration: none; color: white; position: absolute; top: 5px; right: 5px; padding: 5px; background-color: black">Close x</a><div style="z-index: 9001; overflow: auto; max-width: '+(pageWidth-100)+'px; max-height: '+(pageHeight-75)+'px; margin-left: auto; margin-right: auto; margin-top: 50px;"><div id="stuface-popup-content" style="background-color: white; color: black; padding: 20px;">content</div></div>';
			document.body.appendChild(this.popup);
			// close button
			getElement('.//a[@id="stuface-popup-close"]', this.popup, true).addEventListener('click', function() {
				FBPage.hidePopup();
			});
			// content element
			this.popup.content = getElement('.//div[@id="stuface-popup-content"]', this.popup, true);
		}
	};

	FBPage.setup();
})();
