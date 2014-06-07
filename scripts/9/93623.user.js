// ==UserScript==
// @name           Last.fm + YouTube
// @namespace      http://userscripts.org/
// @description    Adds YouTube search icons to Last.fm tracks and artists
// @version        1.1
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
	var youtubeIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVR42o2SS0wTURiF/zsznc5QHhbaAYq1ggg6PEJqcGFUDIRG4gLjRmNYjFvDpovBEhZGXRrdEAzBBBcujDslERYYJS5IDGpQrC5aq4jahzItQx9MpzPjbd0oWulJ7uIm//ly/nMvgrwImqAb2VZLd+XRxEz4npHOJaFEoYK/toKzeawX9gqO0eCNT6PSbHQSwDBKBtCHuQ7nadtI69n6oZxswOrDyFxwPDisrWdDpQHcNbxzwC62DDoEXdaBZiiQP2fiK5MBn/QsNrUzoKuG3+OxiwdONQjahgZEDoGJpPPdQPDp17n3d/zDWlwJFQd0VvOuPk7kPU5Bw/URugkfGiiDBjNjASm6GV+6+9z3Y3Ft6t+Ajmq+8US92N6/T9BSBJDYnAcQBgbhETNLgsHosLLgn309/QqnyX78E9Bu45t6nGJX78ECwITMQJEkINIAnVDzkYAiCCirLIPvCUl+NDI7mPogL/wGsPPNxxrF7j63oCkayKoEMSUCCWUd0moKckgFgkFgaWChjnHCsnfl3MY76QG2KgUA08bxLT3NYtNxh+APv4FoOgKqni0kQCwCZAWgOApyL8m3qVtJrxHWHm/rgOOruhlRa5OFrfQWkDSOz+KvVGGAyYFXUlk1dVudSM7IV8HQ43+VSHbYebNbFyl3RgASgV6Od7YRsKuuArRFyh+7LnmVtfR80WekOu08c8QQUW9KQGYEta4qqFasuS83ExPf7keu4CrjUES/Ehzi2stPwqX689TQfmsDJJ/o/hdjAe/mqjwPO6gAQBzrcJ2xX+z3tY0tXQuNL08HLm/f9b+AQgqatJgs9O6teCaAr3op5rx+Ar6n8xHzZg52AAAAAElFTkSuQmCC';
	
	var cleanurl = function(str) {
		return decodeURIComponent(str.replace(/\+/g, '%20'));
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'YouTube'
    	a.className = 'youtubeLink';
	    a.setAttribute('youtubeLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVR42o2SS0wTURiF/zsznc5QHhbaAYq1ggg6PEJqcGFUDIRG4gLjRmNYjFvDpovBEhZGXRrdEAzBBBcujDslERYYJS5IDGpQrC5aq4jahzItQx9MpzPjbd0oWulJ7uIm//ly/nMvgrwImqAb2VZLd+XRxEz4npHOJaFEoYK/toKzeawX9gqO0eCNT6PSbHQSwDBKBtCHuQ7nadtI69n6oZxswOrDyFxwPDisrWdDpQHcNbxzwC62DDoEXdaBZiiQP2fiK5MBn/QsNrUzoKuG3+OxiwdONQjahgZEDoGJpPPdQPDp17n3d/zDWlwJFQd0VvOuPk7kPU5Bw/URugkfGiiDBjNjASm6GV+6+9z3Y3Ft6t+Ajmq+8US92N6/T9BSBJDYnAcQBgbhETNLgsHosLLgn309/QqnyX78E9Bu45t6nGJX78ECwITMQJEkINIAnVDzkYAiCCirLIPvCUl+NDI7mPogL/wGsPPNxxrF7j63oCkayKoEMSUCCWUd0moKckgFgkFgaWChjnHCsnfl3MY76QG2KgUA08bxLT3NYtNxh+APv4FoOgKqni0kQCwCZAWgOApyL8m3qVtJrxHWHm/rgOOruhlRa5OFrfQWkDSOz+KvVGGAyYFXUlk1dVudSM7IV8HQ43+VSHbYebNbFyl3RgASgV6Od7YRsKuuArRFyh+7LnmVtfR80WekOu08c8QQUW9KQGYEta4qqFasuS83ExPf7keu4CrjUES/Ehzi2stPwqX689TQfmsDJJ/o/hdjAe/mqjwPO6gAQBzrcJ2xX+z3tY0tXQuNL08HLm/f9b+AQgqatJgs9O6teCaAr3op5rx+Ar6n8xHzZg52AAAAAElFTkSuQmCC';
	    a.appendChild(img);
	
	    return a;
	};
	
	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('youtubeLinksAdded'))
	        return;
	    topElem.setAttribute('youtubeLinksAdded', true);
	
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
	
	            // Create the youtube url
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
	            var a = createLink('http://www.youtube.com/results?search_query='+ q.join('%20'));
	 
	            // Insert the link after the found link
	            // Check if it already have a youtube url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('youtubeLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	};

	var initStyle = function() {
		// youtubeLink style
		GM_addStyle('a.youtubeLink img { border:none !important; margin:0 0 0 3px !important; width:9px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
		// fix link position on Neighbours <http://www.last.fm/user/_/neighbours>
		GM_addStyle('ul.artistsSquare a.youtubeLink img { margin:0 !important; }');
		// fix link position on Charts <http://www.last.fm/charts>
		GM_addStyle('.mediumChartWithImages li a.youtubeLink { margin-top:-12px; height:auto; }');
		// hide duplicate link on Similar Artists <http://www.lastfm.fr/music/_/+similar>
		GM_addStyle('#page span.moduleOptions a.youtubeLink { display:none; }');
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
        
        var search = 'http://www.youtube.com/results?search_query=' + artist;
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
			
			// Find links and add youtube links to them
			addLinks(document.body);
		}
	}
}();
script.init();