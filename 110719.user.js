// ==UserScript==
// @name           Last.fm + 24hz
// @namespace      Last.fm_+_24hz
// @description    Adds 24hz search icons to Last.fm tracks and artists
// @version        1.1.2011.08.19.14.16
// @homepage       http://userscripts.org/scripts/show/110719
// @include        http://last.fm/*
// @include        http://*.last.fm/*
// @include        http://lastfm.*/*
// @include        http://*.lastfm.*/*
// ==/UserScript==

 var script = function() {
 // unsafeWindow fix for Google Chrome
 unsafeWindow = function() {
 if(window.navigator.vendor.match(/Google/)) {
 var div = document.createElement('div');
 div.setAttribute('onclick', 'return window;');
 return div.onclick();
 };
	}() || unsafeWindow;


	// Last.fm global object
	var LFM = unsafeWindow.LFM;
	// Last.fm use Prototype JavaScript framework
	var $$ = unsafeWindow.$$;
	
	// Green play button icon
	var hzhzeIcon = 'http://image.24hz.com/front/images/24hzFavicon.ico';
	
	var cleanurl = function(str) {
		return decodeURIComponent(str.replace(/\+/g, '%20'));
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = '24hz'
    	a.className = 'hzhzeLink';
	    a.setAttribute('hzhzeLink', true);
	    var img = document.createElement('img');
	    img.src = 'http://image.24hz.com/front/images/24hzFavicon.ico';
	    a.appendChild(img);
	
	    return a;
	};
	
	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('hzhzeLinksAdded'))
	        return;
	    topElem.setAttribute('hzhzeLinksAdded', true);
	
	    // This is a last.fm url that we want to rewrite
	    var re = /^http:\/\/(.*\.|)(last\.fm|lastfm\.[^\/]+)\/music\/([^\?#]*)$/i;
	    
	    var elems = topElem.getElementsByTagName('a');
	    for (var i = 0; i < elems.length; i++) {
	        var elem = elems[i];
	    
	        // Ignore image links
	        if (!elem.href || elem.textContent.trim() == '' || elem.className.match(/\blfmButton\b/))
	            continue;
	
	        // Check if the link matches
            var m = re.exec(elem.href);
	        if (m) {
	            var found = false;
	
	            // Go though parts and check if it is an url that we want to change
	            var parts = m[3].split('/');
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
	
	            // Create the hzhze url
	            var q = [];
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
	            var a = createLink('http://www.24hz.com/#/search?q='+ q.join('%20'));
	 
	            // Insert the link after the found link
	            // Check if it already have a hzhze url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('hzhzeLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	};

	var initStyle = function() {
		// hzhzeLink style
		GM_addStyle('a.hzhzeLink img { border:none !important; margin:0 0 0 3px !important; width:9px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
		// fix link position on Neighbours <http://www.last.fm/user/_/neighbours>
		GM_addStyle('ul.artistsSquare a.hzhzeLink img { margin:0 !important; }');
		// fix link position on Charts <http://www.last.fm/charts>
		GM_addStyle('.mediumChartWithImages li a.hzhzeLink { margin-top:-12px; height:auto; }');
		// hide duplicate link on Similar Artists <http://www.lastfm.fr/music/_/+similar>
		GM_addStyle('#page span.moduleOptions a.hzhzeLink { display:none; }');
	};
	
	var initEvent = function() {
		// Add listener so if the content changes we add links to the new content
		document.addEventListener('DOMNodeInserted', function(ev){
			addLinks(ev.originalTarget); 
		}, true);
	};
	
	var initParentResource = function() {
		var type = LFM.get('ParentResource', 'type');
        if(type == LFM.get('resTypes', 'ARTIST')) {
        	var artist = LFM.get('ParentResource', 'name');
        } else if(type == LFM.get('resTypes', 'ALBUM')) {
            var artist = LFM.get('ParentResource', 'artistname');
            var album = LFM.get('ParentResource', 'name');
        } else if(type == LFM.get('resTypes', 'TRACK')) {
            var artist = LFM.get('ParentResource', 'artistname');
            var track = LFM.get('ParentResource', 'name');
        } else {
        	return;
        }
        
        var search = 'http://www.24hz.com/#/search?q=' + artist;
        if(album) {
        	search += album;
        }
        if(track) {
            search += track;
        }
        

	};
	
	return {
		init: function() {
			initStyle();
			initEvent();
			
			initParentResource();
			
			// Find links and add hzhze links to them
			addLinks(document.body);
		}
	}
}();
script.init();