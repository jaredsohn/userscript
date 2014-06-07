// ==UserScript==
// @name           @movies IMDB Rating Fetcher
// @namespace      http://userscripts.org/users/allen0960
// @include        http://*.atmovies.com.tw/movie/*
// ==/UserScript==

(function(){
	// get the 1st link with the matched URL
	function get1stLinkWithURL(target, url, callback) {
		var expr = url.replace(/\//g,"\\/").replace(/\./g,"\\.").replace(/\?/g,"\\?").replace(/\*/g,".*");
		re = new RegExp("^"+expr+"$");
		var a = target.getElementsByTagName("a");
		for (var i=0; i<a.length; i++) {
			var node = a[i];
			if (node.hasAttribute("href")) {
				var m = node.getAttribute("href").match(re);
				if (m) {
					return (typeof(callback) == "function" ? callback(node, m) : node);
				}
			}
		}
	}
	// adjust the movietoolbar's width and add the IMDB rating/votes info
	var movietoolbar = document.getElementById("movietoolbar");
	if (movietoolbar) {
		movietoolbar.style.width = "180px";
		get1stLinkWithURL(movietoolbar, "http://us.imdb.com/Title?(*)", function(elmt, id) {
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.imdb.com/title/tt"+id[1]+"/ratings",
				onload: function(res) {
					var doc = document.createElement("div"); doc.innerHTML = res.responseText;
					var t = get1stLinkWithURL(doc, "/search/title?user_rating=*");
					if (t) {
						var rating = "："+t.innerHTML+"分";
						var votes = t.parentNode.firstChild.nodeValue.match(/^(\S+)\s+/);
						if (votes) rating += " ("+votes[1]+"票)";
						elmt.parentNode.insertBefore(document.createTextNode(rating), elmt.nextSibling);
					}
				}
			});
		});
	}
})();

(function(){
	// remove all ads
	var ads = [];
	var iframes = document.getElementsByTagName("iframe");
	for (var i=0; i<iframes.length; i++) {
		var ad = iframes[i];
		if (ad.src.indexOf("http://app.atmovies.com.tw/tool/") == 0) continue;
		while(ad && ad.localName != "div") ad = ad.parentNode;
		if (ad) ads.push(ad);
	}
	var divs = document.getElementsByTagName("div");
	for (var i=0; i<divs.length; i++) {
		if (divs[i].childNodes.length == 0) ads.push(divs[i]);
	}
	for (var i=0; i<ads.length; i++) {
		ads[i].parentNode.removeChild(ads[i]);
	}
	// adjust the position of theater_discuss
	var midbox = document.getElementsByClassName("midbox")[0];
	if (midbox) midbox.style.marginRight = "-50px";
})();
