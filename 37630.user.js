// ==UserScript==
// @name           Listing images for Huuto.net
// @namespace      http://labs.monogra.fi
// @description    Displays images for ALL items in the Huuto.net categories listing
// @include        http://*huuto.net/fi/cats/*
// @include        http://*huuto.net/osasto/*
// @include        http://*huuto.net/fi/showlist.php3*
// ==/UserScript==

window.addEventListener("load",function() {
	var cache = window.sessionStorage||{getItem: function(){}, setItem: function(){}};
	var CACHE_PREFIX = "labs.monogra.fi-imgCache-";
	function addImage(link,imageUrl) {
		var img = link.getElementsByTagName("img")[0];
		img.src = imageUrl.replace("-medium.jpg","-small.jpg");
		img.addEventListener("click",toggleImage,false);
		link.parentNode.replaceChild(img,link);
	}
	function toggleImage() {
		if(this.src.match("-small.jpg$")) {
			this.src = this.src.replace(/-small.jpg$/,"-medium.jpg");
		} else {
			this.src = this.src.replace(/-medium.jpg$/,"-small.jpg");
		}
	}
	function findImageCall(link) {
		return function() {
			GM_log(link.getAttribute("href"));
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.huuto.net"+link.getAttribute("href"),
				onload: function(responseDetails) {
					GM_log("Returned "+link.getAttribute("href"));
					var text = responseDetails.responseText;
					var match = text.match("http://kuvat[0-9]*.huuto.net/[a-z/0-9]+-medium.jpg");
					if(match) { 
						cache.setItem(CACHE_PREFIX+link.getAttribute("href"),match[0]);
						addImage(link,match[0]);
					}
					slots++;
					processQueue();
				},
				onerror: function() {
					GM_log("Error loading "+link.getAttribute("href"));
					slots++;
					processQueue();
				}
			});
		}
	}

	var queue = [];
	var images = document.getElementsByTagName("img");
	GM_log("Found "+images.length+" potential images");
	for(var i=0;i<images.length;i++) {
		if(images[i].getAttribute("title")!="Kohteessa on kuva") continue;
		// Look in cache for previously fetched image
		var link = images[i].parentNode;
		var imageUrl = cache.getItem(CACHE_PREFIX+link.getAttribute("href"));
		if(imageUrl) {
			GM_log("Filling from cache");
			addImage(link,imageUrl);
		} else {
			queue.push(link);
			GM_log("Queued "+link.getAttribute("href"))
		}
	}

	var slots = 5;
	function processQueue() {
		GM_log("Processing queue ("+queue.length+" left)");
		while(slots>0 && queue.length>0) {
			slots--;
			findImageCall(queue.shift())();
		}
	};
	processQueue();
	
}, true);