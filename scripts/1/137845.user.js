// ==UserScript==
// @name           Spotify + douban.com
// @namespace      aidenixl
// @description    Inserts Spotify links on douban.com
// @include        http://music.douban.com/*
// @exclude        http://www.douban.com/music/mine/*
// ==/UserScript==

function cleanurl(b) {
	return b.replace(/%25([0-9]{2})/, "%$1")
}

function trim(b) {
	return b.replace(/^\s+/, "").replace(/\s+$/, "")
}

function createLink(link) {
	var a = document.createElement("a");
	a.href = link;
	a.title = "Listen in Spotify";
	a.setAttribute("spotifyLink", true);
	var img = document.createElement("img");
	img.style.border = "none";
	img.style.height = '12px';
	img.style.width = '14px';
	img.style.marginLeft = "3px";
	img.src = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D";
	a.appendChild(img);
	return a
}

function addLinks(topElem) {
	if (topElem.hasAttribute("spotifyLinksAdded")) {
		return
	}
	k.setAttribute("spotifyLinksAdded", true);
	var l = /^http:\/\/(.*\.|)(last\.fm|lastfm\.[^\/]+)\/music\/([^\?#]*)$/i;
	var b = topElem.getElementsByTagName("a");
	for (var g = 0; g < b.length; g++) {
		var d = b[g];
		if (!d.href || trim(d.textContent) == "" || d.className.match(/\blfmButton\b/)) {
			continue
		}
		if (m = l.exec(d.href)) {
			var n = false;
			parts = m[3].split("/");
			for (var f = 0; f < parts.length; f++) {
				if (parts[f][0] == "+") {
					n = true;
					break
				}
			}
			if (n) {
				continue
			}
			var c = d;
			while (c != null) {
				if (c.id && c.id.match(/^(secondaryNavigation|featuredArtists)$/) || c.className && c.className.match(/\b(pagehead|image|artistsMegaWithFeatured)\b/)) {
					n = true;
					break
				}
				c = c.parentNode
			}
			if (n) {
				continue
			}



			q = ['artist%3a%22' + cleanurl(parts[0]) + '%22'];
			if (parts[1] && parts[1] != "_") {
				q.push('album%3a%22' + cleanurl(parts[1]) + '%22')
			}
			if (parts[2]) {
				q.push('track%3a%22' + cleanurl(parts[2]) + '%22')
			}
			var h = createLink('spotify:search:' + q.join('%20'));
			if (!d.nextSibling || !d.nextSibling.hasAttribute || !d.nextSibling.hasAttribute("xiamiLink")) {
				d.parentNode.insertBefore(h, d.nextSibling)
			}
		}
	}
}

function insertafter(b, c) {
	c.parentNode.insertBefore(b, c.nextSibling)
}

/*
 var navs = document.getElementById("nav").childNodes;
 var nav_music;
 for (var r = 0; r < navs.length; r++) {
 if (navs[r].href == "http://www.douban.com/music/") {
 var nav_music = navs[r];
 break
 }
 }
 */


try {
	var as = document.getElementsByTagName("a");
	for (var i = 0; i < as.length; i++) {
		if (as[i].href.match(/\/artist\/[^\/]+(\/)?$/) && as[i].textContent.replace(/^\s+/, "").replace(/\s+$/, "") != "") {
			insertafter(createLink('spotify:search:artist%3a%22' + encodeURIComponent(as[i].textContent) + '%22'), as[i])
		}
	}
}
catch (e) {}


try {
	var artist = document.getElementById("info") ? (document.getElementById("info").getElementsByTagName("a")[0]) : null;
	var h1 = document.getElementsByTagName("h1")[0];
	if (artist && h1) {
		h1.appendChild(createLink('spotify:search:artist%3a%22' + encodeURIComponent(artist.textContent) + "%22%20album%3a%22" + encodeURIComponent(h1.textContent) + '%22'));
		insertafter(createLink('spotify:search:artist%3a%22' + encodeURIComponent(artist.textContent) + '%22'), artist)
	}
}
catch (e) {}


try {
	var href = window.location.href;
	if (href.match(/\/artist\/[^\/]+(\/)?$/)) {
		var h1 = document.getElementsByTagName("h1")[0];
		if (h1) {
			h1.appendChild(createLink('spotify:search:artist%3a%22' + encodeURIComponent(h1.textContent) + '%22'))
		}
	}
}
catch (e) {}