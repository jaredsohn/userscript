/* vim: ts=4 noet ai :
$Id: $

*/
// ==UserScript==
// @name           Flickr Original Link To Feed - Download Queue
// @namespace      http://dev.xoxocafenoir.com
// @description    Add link to original image on top of Flickr thumbnails
// @include        http:*flickr.com/photos/*
// @include        http:*flickrlicio.us/*
// @include        http:/*flickr.com/groups/*/pool/*
// @exclude
// @version        1.22
// ==/UserScript==

// use Firebug if available
function myLog(msg) {
	return; // do not use in production...
	try {
		unsafeWindow.console.log(msg);
	} catch (e) {
		GM_log(msg);
	}
}

// global namespace
var ImgLinks = {
	hlist: {},
	tmr: null,
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
		for (var i in ImgLinks.hlist) {
			ImgLinks.hlist[i].reshuffle();
		}
	},
	// wait some millisecs to avoid very rapidly repeated invocation
	reshuffleSoon: function() {
		if (ImgLinks.tmr) clearTimeout(ImgLinks.tmr);
		ImgLinks.tmr = setTimeout(ImgLinks.reshuffle, 12);
	},
	insertLinks: function(doc) {
		// Example: http://static.flickr.com/33/55621048_77aea67ae5_m.jpg
		//          http://static.flickr.com/71/196046852_491ba6a98d_s.jpg
		//          http://static.flickr.com/184/404999942_d009ebdbb3.jpg
		//          http://static.flickr.com/2131/2158996681_eeb43c0750_s.jpg
		// http://developer.mozilla.org/en/docs/DOM:document.evaluate
		// myLog(doc);
		var list = doc.getElementsByTagName("img");
		for (var i = 0; i < list.length; i++) {
			var img = list[i];
			var href = img.getAttribute("src");
			// only images with thumbnail signature
			// 
			try {
				var m = href.match(/(^.+static\.flickr\.com.+\/)([0-9]+)_[0-9a-f]{10}_?.?\.jpg/);
				if (m && m[2]) {
					// lookup "zoom page" for current photo (id)
					href = 'http://www.flickr.com/photo_zoom.gne?id=' + m[2] + '&size=o';
					var imgId = m[2];
					ImgLinks.lookup(href, ImgLinks.getLookupFunc(imgId, img));
				}
			} catch (e) {
				myLog(e);
			}
		}
	},
  // result parser func as closure
  getLookupFunc: function(startUrl, img) {
    return function resultParser(res) {
      try {
        txt = res.responseText;
        var re = new RegExp('<img src="([^"]+static[^"]+' + startUrl + '[^"]+)"');
        var m = txt.match(re);
        if (m) {
          myLog('matched: ' + m[0] + ', ' + m[1]);
          
          var orig = new RegExp('_o');
          var n = m[1].match(orig);
          if(n) {
            ImgLinks.add(img, m[1], "Flickr");
          }  else {
            //myLog(m[1].replace('.jpg','_b.jpg'));
            ImgLinks.add(img, m[1].replace('.jpg','_b.jpg'), "Flickr");
          }
        } else {
          if (txt.indexOf("Flickr: Private page") > -1) {
            myLog('No permission (zoom page): ' + startUrl);
            // FIXME: parse image source from overview page?
          } else if (txt.indexOf("The photo you were looking for has been deleted.") > -1) {
            myLog('Image Deleted');
            // FIXME: apply icon which indicates deleted image
          } else {
            myLog('No image found (unknown)');
			//myLog(txt);
          }
          return;
        }
      } catch(e) {
        myLog('getLookupFunc: ' + e);
      }   
    }
  },
  	// secrurity wrapper as of GM v0.7.20080121
  	// @see http://wiki.greasespot.net/0.7.20080121.0_compatibility
	lookup: function(url, onload) {
		if (url.match(/^http:\/\/(\w+\.)*?flickr\.com\/.+/)) {
			// call wrapped lookup function
			window.setTimeout(ImgLinks._wrappedLookup, 0, url, onload);
		} else {
  	      myLog('lookup: security breach with url ' + url);
		}
	},

	_wrappedLookup: function(url, onload) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: { Referer: 'http://www.flickr.com/photos/' },
				onload: onload
			});
		} catch (e) {
			myLog('_wrappedLookup: ' + e);
		}
	},

	addEvtListeners: function() {
		// Ajax: new image
		document.addEventListener("DOMNodeInserted",
			function(evt) {
				// myLog(evt);
				try {
					// will fail if new node is not ElementNode
					ImgLinks.insertLinks(evt.target);
				} catch (e) {}
			}, true);
		// Ajax: remove an image
		document.addEventListener("DOMNodeRemoved",
			function(evt) {
				// myLog(evt);
				try {
					var list = evt.target.getElementsByTagName("img");
					for (var i = 0; i < list.length; i++) {
						ImgLinks.remove(list[i]);
					}	
				} catch (e) {}
			}, true);
		// DOM manipulation, which can cause reflow
		document.addEventListener("DOMAttrModified",
			function(evt) {
				// myLog(evt);
				ImgLinks.reshuffleSoon();
			}, true);
		// catch window resize events
		window.addEventListener("resize",
			function() { ImgLinks.reshuffle(); }, true);
		// catch any unnoticed change, for Safari / Creammonkey
		setInterval(ImgLinks.reshuffleSoon, 500);
	},
	addStyleRule: function() {
		// style for link icons
		var styleElement = document.createElement('style');
		styleElement.setAttribute("type", "text/css");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule('a.origLinkIcon { position: absolute; top: 4px; left: 4px; color: black;  background-color: silver; text-decoration: none; padding: 1px; opacity: 0.9; font-size: 8px; font-family: sans-serif; border: 1px solid; border-color: white #555 #555 white; }', 0);
		sty.insertRule('a.origLinkIcon:hover { color: black; background-color: yellow; }', 0);
	},
	init: function() {
		this.addStyleRule();
		this.insertLinks(document);
		this.addEvtListeners();
	}

};

// show results window
//if (top.consoleRef.closed) {
 top.consoleRef=window.open('','results',
  'width=500,height=850'
   +',menubar=0'
   +',toolbar=0'
   +',status=0'
   +',scrollbars=1'
   +',resizable=1');
 top.consoleRef.document.writeln(
  '<html><head><title>results</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
 );
// }

// ImgLink Object, the icon on top of images
function ImgLink(img, linkHref, label) {
	// try to find surrounding link element around image
	var link = document.createElement("a");
	link.setAttribute("class", "origLinkIcon");
	link.setAttribute("href", linkHref);
	link.setAttribute("title", "Link to original uploaded image");
	link.appendChild(document.createTextNode(link));
	this.img = img;
	this.link = link;
	//this.reshuffle();
	//document.getElementsByTagName("body")[0].appendChild(link);
 top.consoleRef.document.writeln(link + '<br>');
}

// close results window
 //top.consoleRef.document.close();
 
ImgLink.prototype.removeIcon = function() {
	this.link.parentNode.removeChild(this.link);
}
ImgLink.prototype.reshuffle = function() {
	// computedStyle gives "auto" for position, 
	// if not set through CSS.
	// To be sure, calculate the positions of
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





ImgLinks.init();
/*
ImgLinks.addStyleRule();
ImgLinks.insertLinks(document);
ImgLinks.addEvtListeners();
*/

// end user script
