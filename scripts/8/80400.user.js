// ==UserScript==
// @name           Rdio.fm
// @namespace      http://www.rdio.com/
// @description    Search Rdio from Last.fm
// @version        0.1
// @include        http://last.fm/*
// @include        http://*.last.fm/*
// @include        http://lastfm.*/*
// @include        http://*.lastfm.*/*
// ==/UserScript==

(function() {
	// RdioLink style
	GM_addStyle('a.RdioLink img { border:none !important; margin:0 0 0 3px !important; width:23px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
	// fix link position on Neighbours <http://www.lastfm.fr/user/lmalgras/neighbours>
	GM_addStyle('ul.artistsSquare a.RdioLink img { margin:0 !important; }');
	// fix link position on Charts <http://www.lastfm.fr/charts>
	GM_addStyle('.mediumChartWithImages li a.RdioLink { margin-top:-12px; height:auto; }');
	// hide duplicate link on Similar Artists <http://www.lastfm.fr/music/Moby/+similar>
	GM_addStyle('#page span.moduleOptions a.RdioLink { display:none; }');
	// TODO fix link position on Festival <http://www.last.fm/festival/1556719>
	
	var cleanurl = function(str) {
		return decodeURIComponent(str.replace(/\+/g, '%20'));
	};
	
	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Search on Rdio'
    	a.className = 'RdioLink';
	    a.setAttribute('RdioLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAJCAYAAADZ9rdLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWpJREFUeNqM0ksoRHEUx/E7MxivPLKXhWe2SmEhUooQyQZ7SykL2duYPLIhKUV2NlgIUVZeE7ZKCAvknecwvke/W9Mt5V+f7tw753/OPef+fc7gqvOPNY4WtGICqSjGbbSn+s9NcYhHFBFkIAFXSEIKbpCMLMVNIog3N4kvtJZmzyh07U2+h2Nsohd9+EC/ElprmYr/RKle4AXpJB7g2mAvw+8Oi6HIips8Vy02YtdaxbySPaNZ3dnyo0TJEzGtfY66tZcZo0iY66IFv2rTMGpigmdQiHx156533KNcsTaKehRhW4Ur7aX9urnTGGxTDr7RjQuc4Mjzrb4UZ2uKMSzBOvapo33uu2wsAZyrA1tn6qQNC6hAnSd5QEVtlTGGPO0J6dnB74fmKNoJONXsI2ppPWYEwZik9t+sus3GHJrUiVv0CVUIW7Uta0PHzNYG2nGIR4xiyILxgB2xwp0YwaWSLqNWp6rgR4ABAEA7ZmsEsqUXAAAAAElFTkSuQmCC';
	    a.appendChild(img);
	
	    return a;
	}
	
	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('RdioLinksAdded'))
	        return;
	    topElem.setAttribute('RdioLinksAdded', true);
	
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
	
	            // Create the Rdio url
	            q = [];
	            if(parts[0] && parts[0] != 'Various+Artists') {
	            	q.push(cleanurl(parts[0]));
	            }
	            if (parts[1] && parts[1] != '_') {
	                q.push(cleanurl(parts[1]));
	            }
	            if (parts[2]) {
	                q.push(cleanurl(parts[2]));
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('http://www.rdio.com/#/search/'+ q.join('%20'));
	
	            // Insert the link after the found link
	            // Check if it already have a Rdio url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('RdioLink')) {
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
	        h1.appendChild(createLink('http://www.rdio.com/#/search/' + encodeURIComponent(artist)));
	    } else if (body.className.match(/\br\-album\b/)) {
	        // album page
	        var h1 = div.getElementsByTagName('h1')[0];
	        var artist = h1.firstChild.textContent;
	        var album = h1.lastChild.textContent;
	        var a = createLink('http://www.rdio.com/#/search/' + encodeURIComponent(artist) + encodeURIComponent(album));
	        h1.appendChild(a);
	        div.previousSibling.previousSibling.getElementsByTagName('h1')[0].appendChild(a.cloneNode(true))
	    } else if (body.className.match(/\br\-track\b/)) {
	        // track page
	        var h1 = div.getElementsByTagName('h1')[0];
	        var artist = h1.getElementsByTagName('a')[0].textContent;
	        var track = div.previousSibling.previousSibling.getElementsByTagName('span')[0].textContent;
	        var a = createLink('http://www.rdio.com/#/search/' + encodeURIComponent(artist) + encodeURIComponent(track));
	        h1.appendChild(a);
	    }
	}
	
	// Find links and add Rdio links to them
	addLinks(body);
})();