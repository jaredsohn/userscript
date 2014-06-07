// ==UserScript==
// @name           Last.fm Zicmama Search
// @namespace      http://mp3.zicmama.com/
// @description    Search Zicmama from Last.fm
// @version        1.2.3
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
	
	// Spotify 16x16 icon
	var spotifyIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAC6klEQVQ4T4WTW0iTcRjGHw9rm1uuMszTxNqwojTpZKUdFCtMV5MsXZZiIho1XSSbhzXPc+RhpXYwjcrSLC1NVxZ13UUXQTdB0H2X0V0Q9vRO0xKEPnj4f9/7f97f+/4PH7DEY7apQx0DGlPdoMpeO6isddzTnrG4NPqlvItikhhSP6R0u58Ff/c8D6RnPFikpHtCxeZxzc/aoeVjpe26uCVBJa2acPeo4kPHpIKdUyp2TWnZ5dPR6wuTMZydvghemYxg01jYN+v1VamLIHstimVNI8p3V30ato/r6BzU0XZTx8obK1l9J5zuUT27p43sfb2B3pfxAon4VtiiMyxAqvpCrN4XOmY71IzNBqMzMTvG+ZU19x6fG8T0ylBW3FrLjhfreenu6qlZQMKhgICGodDPva/0dAxE0doTydbHBnZO6Nk2tpJ1D4JZcg3MsIP6HFCxB9xaoqXraeRMlk1jREbxsrUdk2vY92ajaDMrbkbzqFPJtIvgftFBB3i8FbzQD14eBU93grltoG04gBaPohz5NeoD16ZjefttIhserWDKedDsAvPdYJ4YTfVgshWMOQluOgsWdYOXhsGKh+LxoBlmmyq1yxfLtgktm5+CLaI6MVQNivE+aBejv7J9CMwUcEYNeFHmL0g8twUNSM4Jiqp9qJ5xialxDCzwiq6Cxb1zssi32SPVuiTp3lyyVZLPCTzTjqLZjSzz4r3zCegS1QuoQUD1In9lf9wxApbKHlgEXCGdnH8AFl7HjyQzImcBJhty/S1XyUR6taw3Hww1gSuOgYYi8EgjWClV55PLpBOTE/0L98C4CwHp5zASchhE+h+lyTivfeBqARbeAMuldTmFL1tMCFt0G+O2Qa1MwihSQGOhbJYTPCDdRJ0QkMQg579c4FlOfNqRh7+38F9K/G4EGjNwKq8JH4t78KtM1l12B9xQAAYl4KsqHo0xCdD+96807ETg5kNYl5yPzF2ncCzxCBIN26FcKvE3MvNlJn4gMeAAAAAASUVORK5CYII=';
	
	var cleanurl = function(str) {
		return decodeURIComponent(str);
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Search on Spotify'
    	a.className = 'spotifyLink';
	    a.setAttribute('spotifyLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D';
	    a.appendChild(img);
	
	    return a;
	};
	
	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('spotifyLinksAdded'))
	        return;
	    topElem.setAttribute('spotifyLinksAdded', true);
	
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
/*	
	            // Create the spotify url
	            var q = [];
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
	            var a = createLink('spotify:search:'+ q.join('%20'));
*/
	            // Create the ZICMAMA url
	            var q = [];
	            if(parts[0] && parts[0] != 'Various+Artists') {
	            	q.push(''+ cleanurl(parts[0]) +'+');
	            }
	            if (parts[1] && parts[1] != '_') {
	                q.push(''+ cleanurl(parts[1]) +'+');
	            }
	            if (parts[2]) {
	                q.push(''+ cleanurl(parts[2]) +'+');
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('http://mp3.zicmama.com/index.php?CORE_OP=amazon_action&SearchIndex=Music&Action=Search&ItemPage=1&Keywords='+ q.join('%20'));

	 
	            // Insert the link after the found link
	            // Check if it already have a spotify url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('spotifyLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	};

	var initStyle = function() {
		// spotifyLink style
		GM_addStyle('a.spotifyLink img { border:none !important; margin:0 0 0 3px !important; width:9px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
		// fix link position on Neighbours <http://www.lastfm.fr/user/lmalgras/neighbours>
		GM_addStyle('ul.artistsSquare a.spotifyLink img { margin:0 !important; }');
		// fix link position on Charts <http://www.lastfm.fr/charts>
		GM_addStyle('.mediumChartWithImages li a.spotifyLink { margin-top:-12px; height:auto; }');
		// hide duplicate link on Similar Artists <http://www.lastfm.fr/music/Moby/+similar>
		GM_addStyle('#page span.moduleOptions a.spotifyLink { display:none; }');
		// TODO fix link position on Festival <http://www.last.fm/festival/1556719>
		
		// button
        GM_addStyle('#page a.spotifyButton strong { padding: 0; height: auto; }');
        GM_addStyle('#page a.spotifyButton strong span { background: url("' + spotifyIcon + '") no-repeat scroll 4px center transparent; }');
        GM_addStyle('#page a.spotifyButton:hover strong span { background-position: 4px center; }');
        // fix buttons margin
        GM_addStyle('#page div.buttons a.lfmButton { margin-right: 5px; margin-bottom: 5px; }');
        GM_addStyle('#page div.buttons div.lfmDownloadButton a.lfmButton { margin-right: 0; }');
	};
	
	var initEvent = function() {
		// Add listener so if the content changes we add links to the new content
		document.addEventListener('DOMNodeInserted', function(ev){
			var originalTarget = ev.srcElement || ev.originalTarget;
			addLinks(originalTarget); 
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
        
        var search = 'spotify:search:artist%3a%22' + artist + '%22';
        if(album) {
        	search += '%20album%3a%22'+ album +'%22';
        }
        if(track) {
            search += '%20track%3a%22'+ track +'%22';
        }
        
        // create a button similar to the "tag button"
        var button = document.createElement('a');
        button.href = search;
        button.id = 'buttonSpotify';
        button.className = 'lfmButton lfmBigButton spotifyButton';
        var buttonStrong = document.createElement('strong');
        var buttonStrongSpan = document.createElement('span');
        var buttonStrongSpanText = document.createTextNode('Spotify');
        // append to the buttons container
        var buttons = $$('.buttons')[0];
        if(buttons) {
            buttons.appendChild(button).appendChild(buttonStrong).appendChild(buttonStrongSpan).appendChild(buttonStrongSpanText);
        }
	};
	
	return {
		init: function() {
			initStyle();
			initEvent();
			
			initParentResource();
			
			// Find links and add spotify links to them
			addLinks(document.body);
		}
	}
}();
script.init();