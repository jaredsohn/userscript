// ==UserScript==
// @name           Last.fm + Grooveshark
// @namespace      http://userscripts.org/
// @description    Adds Grooveshark search icons to Last.fm tracks and artists
// @version        1.2
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

	
	// Grooveshark icon
	var groovesharkIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACdlBMVEXu8/rt8vns8fj+///f4+mIi489P0EbHBwcHB0/QUOKjpLh5ev+///s8fft8vnu8/rt8vnu8vn6/f+RlZkPEBAAAAAKCgooKSonKCkJCgoSEhOWmp77/v/t8vjt8vrs8fj5/f9pa24mJyizt7zu8/ry9/30+f/k6e+gpKgiIyRvcXT6/v/s8fj///+Nj5JPUVPv8/elp6vIzNL+///u8vjv9fv////s8PRKS06Tlpn////Y3OEMDAwmJynu8fT9//86Oz5ucXXz9/rx9frm7PP0+f7t8fMiIyQQERHd4eZ+gIOprK/7///1+v9MTU5DRUft8fXx9vzn7PT+//+jpqiGiIszNDUNDQ3m6+/t8vr1+f81NjYICAhISkz1+fzs8fjw9v3i5usICAg8PT4PDxAuLi7y9v34/f/S1dgFBgcBAQEFBQVucHL////n7fTx9fsmJicXFxgSEhMiIyT7///q7vNAQUMCAgIAAAAAAAADAwOdoKX7/f0fICEZGRo6Oz0/QUMiIyQBAQEAAAABAQEAAAAFBQV6fICFiIxBQ0R+gIMDAwMAAQECAgIAAAAAAAABAQECAgIDAwOFiIvY3OEWFhcDAwMAAAAAAAAAAAABAQEFBQYaGxzd4eb///+PkpUFBQUCAgICAgIEBQWWmZz+///s8fj6/v9sb3ICAgICAgIDAwMCAgICAgIDAwMCAgIBAQJzdXj7///r8Pft8vrt8vj7/v+Wmp4XFxgBAQEAAAAAAAABAQEZGhqbn6P8///t8fju8/ru8/rt8vnr8ff+///h5euMj5RKTE4tLi8uLzBMTU+Pkpfj6O3+///r8Pfu8/ru8/o82QNdAAAAAWJLR0RtuwYArQAAAAl2cEFnAAAAEAAAABAAXMatwwAAARhJREFUGNMFwYNCHQAYBtA/233Ltl1Ly7ZtLdxs23WrhZu9bC3bteqNOoeIjZ2Dk4ubh5ePX0BQSFiERMXEJSTxQ0paBrJy8gqKpKSsAlU1dQ1NLW0d6Orpk4EhjIxNTM3MLSytfsLahmzt7H85OMLJ2cXVzd3D04u84ePr5w8EBAYFh4QijMIjIqOiYxCLuPiExKTkFEpNS8/4nYmsbOQwcvPyC6iwqLikFGXlFZWoYlTX1FId6hvQiCY0t7S2taODOtHV3YNeMNHXjwH8ocEhDGOEBYxibBwTkzQ1jZlZMFksJubmsbBIf5eWsbK6tr6xubWNnd092j84PPqH45PTM5xfXF5d083t3f3D49Pzy+vb+/+Pz69vtIJb0p1u2R8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTEtMDItMDNUMDY6MTI6NTYtMDU6MDCfBHFdAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDExLTAyLTAzVDA2OjEyOjU2LTA1OjAw7lnJ4QAAAABJRU5ErkJggg%3D%3D';
	
	var cleanurl = function(str) {
		return decodeURIComponent(str.replace(/\+/g, '%20'));
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Grooveshark'
    	a.className = 'groovesharkLink';
	    a.setAttribute('groovesharkLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACdlBMVEXu8/rt8vns8fj+///f4+mIi489P0EbHBwcHB0/QUOKjpLh5ev+///s8fft8vnu8/rt8vnu8vn6/f+RlZkPEBAAAAAKCgooKSonKCkJCgoSEhOWmp77/v/t8vjt8vrs8fj5/f9pa24mJyizt7zu8/ry9/30+f/k6e+gpKgiIyRvcXT6/v/s8fj///+Nj5JPUVPv8/elp6vIzNL+///u8vjv9fv////s8PRKS06Tlpn////Y3OEMDAwmJynu8fT9//86Oz5ucXXz9/rx9frm7PP0+f7t8fMiIyQQERHd4eZ+gIOprK/7///1+v9MTU5DRUft8fXx9vzn7PT+//+jpqiGiIszNDUNDQ3m6+/t8vr1+f81NjYICAhISkz1+fzs8fjw9v3i5usICAg8PT4PDxAuLi7y9v34/f/S1dgFBgcBAQEFBQVucHL////n7fTx9fsmJicXFxgSEhMiIyT7///q7vNAQUMCAgIAAAAAAAADAwOdoKX7/f0fICEZGRo6Oz0/QUMiIyQBAQEAAAABAQEAAAAFBQV6fICFiIxBQ0R+gIMDAwMAAQECAgIAAAAAAAABAQECAgIDAwOFiIvY3OEWFhcDAwMAAAAAAAAAAAABAQEFBQYaGxzd4eb///+PkpUFBQUCAgICAgIEBQWWmZz+///s8fj6/v9sb3ICAgICAgIDAwMCAgICAgIDAwMCAgIBAQJzdXj7///r8Pft8vrt8vj7/v+Wmp4XFxgBAQEAAAAAAAABAQEZGhqbn6P8///t8fju8/ru8/rt8vnr8ff+///h5euMj5RKTE4tLi8uLzBMTU+Pkpfj6O3+///r8Pfu8/ru8/o82QNdAAAAAWJLR0RtuwYArQAAAAl2cEFnAAAAEAAAABAAXMatwwAAARhJREFUGNMFwYNCHQAYBtA/233Ltl1Ly7ZtLdxs23WrhZu9bC3bteqNOoeIjZ2Dk4ubh5ePX0BQSFiERMXEJSTxQ0paBrJy8gqKpKSsAlU1dQ1NLW0d6Orpk4EhjIxNTM3MLSytfsLahmzt7H85OMLJ2cXVzd3D04u84ePr5w8EBAYFh4QijMIjIqOiYxCLuPiExKTkFEpNS8/4nYmsbOQwcvPyC6iwqLikFGXlFZWoYlTX1FId6hvQiCY0t7S2taODOtHV3YNeMNHXjwH8ocEhDGOEBYxibBwTkzQ1jZlZMFksJubmsbBIf5eWsbK6tr6xubWNnd092j84PPqH45PTM5xfXF5d083t3f3D49Pzy+vb+/+Pz69vtIJb0p1u2R8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTEtMDItMDNUMDY6MTI6NTYtMDU6MDCfBHFdAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDExLTAyLTAzVDA2OjEyOjU2LTA1OjAw7lnJ4QAAAABJRU5ErkJggg%3D%3D';
	    a.appendChild(img);
	
	    return a;
	};
	
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
	
	            // Create the grooveshark url
	            var q = [];
     		    if(parts[0] && parts[0] != 'Various+Artists') {
	            	q.push('%22'+ cleanurl(parts[0]) +'%22');
	            }
	            if (parts[1] && parts[1] != '_') {
	                q.push('%22'+ cleanurl(parts[1]) +'%22');
	            }
	            if (parts[2]) {
	                q.push('%22'+ cleanurl(parts[2]) +'%22');
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('http://listen.grooveshark.com/#/search/song?q='+ q.join('%20'));
	 
	            // Insert the link after the found link
	            // Check if it already have a grooveshark url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('groovesharkLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	};

	var initStyle = function() {
		// groovesharkLink style
		GM_addStyle('a.groovesharkLink img { border:none !important; margin:0 0 0 3px !important; width:9px !important; height:9px !important; background:transparent !important; vertical-align:baseline !important; position:inherit !important; }');
		// fix link position on Neighbours <http://www.last.fm/user/_/neighbours>
		GM_addStyle('ul.artistsSquare a.groovesharkLink img { margin:0 !important; }');
		// fix link position on Charts <http://www.last.fm/charts>
		GM_addStyle('.mediumChartWithImages li a.groovesharkLink { margin-top:-12px; height:auto; }');
		// hide duplicate link on Similar Artists <http://www.last.fm/music/_/+similar>
		GM_addStyle('#page span.moduleOptions a.groovesharkLink { display:none; }');
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
        
        var search = 'http://listen.grooveshark.com/#/search/song?q=' + '%22' + artist + '%22';
        if(album) {
        	search += '%22'+ album +'%22';
        }
        if(track) {
            search += '%22'+ track +'%22';
        }
        

	};
	
	return {
		init: function() {
			initStyle();
			initEvent();
			
			initParentResource();
			
			// Find links and add grooveshark links to them
			addLinks(document.body);
		}
	}
}();
script.init();