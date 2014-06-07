// ==UserScript==
// @name           Grooveshark.fm
// @namespace      http://www.bruis.net
// @description    Search Grooveshark from Last.fm
// @version        0.1
// @include        http://last.fm/*
// @include        http://*.last.fm/*
// @include        http://lastfm.*/*
// @include        http://*.lastfm.*/*
// @require        http://usocheckup.dune.net/75127.js?method=update&maxage=7
// ==/UserScript==

(function() {
	// groovesharkLink style
	GM_addStyle('a.groovesharkLink img { border:none !important; margin:0 0 0 3px !important; width:9px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
	// fix link position on Neighbours <http://www.lastfm.fr/user/lmalgras/neighbours>
	GM_addStyle('ul.artistsSquare a.groovesharkLink img { margin:0 !important; }');
	// fix link position on Charts <http://www.lastfm.fr/charts>
	GM_addStyle('.mediumChartWithImages li a.groovesharkLink { margin-top:-12px; height:auto; }');
	// hide duplicate link on Similar Artists <http://www.lastfm.fr/music/Moby/+similar>
	GM_addStyle('#page span.moduleOptions a.groovesharkLink { display:none; }');
	// TODO fix link position on Festival <http://www.last.fm/festival/1556719>
	
	var cleanurl = function(str) {
		return decodeURIComponent(str.replace(/\+/g, '%20'));
	};
	
	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Search on Grooveshark'
    	a.className = 'groovesharkLink';
	    a.setAttribute('groovesharkLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D';
	    a.appendChild(img);
	
	    return a;
	}
	
	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('groovesharkLinksAdded'))
	        return;
	    topElem.setAttribute('groovesharkLinksAdded', true);
	
	    // This is a last.fm url that we want to rewrite
	    var re = /^http:\/\/(.*\.|)(last\.fm|lastfm\.[^\/]+)\/music\/([^\?#]*)$/i;
	    
	    var elems = topElem.getElementsByTagName('a');
	    for (var i = 0; i < elems.length; i++) {
	        var elem = elems[i];
	    
	        // Ignore image links
	        if (!elem.href || elem.textContent.trim() == '' || elem.className.match(/\blfmButton\b/))
	            continue;
	
	        // Check if the link matches
	        if (m = re.exec(elem.href)) {
	            var found = false;
	
	            // Go though parts and check if it is an url that we want to change
	            parts = m[3].split('/');
	            for (var j = 0; j < parts.length; j++) {
	                if (parts[j][0] == '+') {
	                    found = true;
	                    break;
	                }
	            }
	
	            if (found)
	                continue;
	
	            // Ignore links in the left menu and some other places
	            var p = elem;
	            while (p != null) {
	                if (p.id && p.id.match(/^(headerWrapper|secondaryNavigation|featuredArtists)$/) || p.className && p.className.match(/\b(pagehead|image|artistsMegaWithFeatured)\b/)) {
	                    found = true;
	                    break;
	                }
	                p = p.parentNode;
	            }
	    
	            if (found)
	                continue;
	
	            // Create the grooveshark url
	            q = [];
	            if(parts[0] && parts[0] != 'Various+Artists') {
	            	q.push('artist%3a%22'+ cleanurl(parts[0]) +'%22');
	            }
	            if (parts[1] && parts[1] != '_') {
	                q.push('album%3a%22'+ cleanurl(parts[1]) +'%22');
	            }
	            if (parts[2]) {
	                q.push('track%3a%22'+ cleanurl(parts[2]) +'%22');
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('http://preview.grooveshark.com/#/search/songs/?query='+ q.join('%20'));
	
	            // Insert the link after the found link
	            // Check if it already have a grooveshark url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('groovesharkLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	}
	
	// Add listener so if the content changes we add links to the new content
	document.addEventListener('DOMNodeInserted', function(ev){ addLinks(ev.originalTarget); }, true);
	
	// Add links to titles like the artist name on the artist page.
	var body = document.body;
	var div = document.getElementById('catalogueHead');
	if (body.className && div) {
	    if (body.className.match(/\br\-artist\b/)) {
	        // artist page
	        var h1 = div.getElementsByTagName('h1')[0];
	        var artist = h1.textContent;
	        h1.appendChild(createLink('http://preview.grooveshark.com/#/search/songs/?query=artist%3a%22'+ encodeURIComponent(artist) +'%22'));
	    } else if (body.className.match(/\br\-album\b/)) {
	        // album page
	        var h1 = div.getElementsByTagName('h1')[0];
	        var artist = h1.firstChild.textContent;
	        var album = h1.lastChild.textContent;
	        var a = createLink('http://preview.grooveshark.com/#/search/songs/?query=artist%3a%22'+ encodeURIComponent(artist) +'%22%20album%3a%22'+ encodeURIComponent(album) +'%22');
	        h1.appendChild(a);
	        div.previousSibling.previousSibling.getElementsByTagName('h1')[0].appendChild(a.cloneNode(true))
	    } else if (body.className.match(/\br\-track\b/)) {
	        // track page
	        var h1 = div.getElementsByTagName('h1')[0];
	        var artist = h1.getElementsByTagName('a')[0].textContent;
	        var track = div.previousSibling.previousSibling.getElementsByTagName('span')[0].textContent;
	        var a = createLink('http://preview.grooveshark.com/#/search/songs/?query=artist%3a%22'+ encodeURIComponent(artist) +'%22%20track%3a%22'+ encodeURIComponent(track) +'%22');
	        h1.appendChild(a);
	    }
	}
	
	// Find links and add grooveshark links to them
	addLinks(body);
})();