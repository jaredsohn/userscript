// ==UserScript==
// @name           HousingMapsPlus
// @namespace      crouse.cc
// @version        2010-01-01
// @description    Adds some stuff to housingmaps.com
// @exclude	http://*housingmaps.com
// @include http://*housingmaps.com/start*
// ==/UserScript==

console.log("HousingMapsPlus loading...");
var moveEventCount = 0;


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


// Wait for JQuery and the Google Map object to be loaded.
function GM_wait() {
	if(unsafeWindow._c09 == null || typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait, 100); 
	} else { 
		$ = unsafeWindow.jQuery;
		
		// This listener is fired every time the map is moved.
		// This includes the 2 moves called by housingmaps, which we have to ignore.
		// After the second move, we want to check if there is any latlng info in the URL 
		// and move the map to the appropriate place.
		// TO DO:  figure out a better way to ignore the moves.  keeping a counter is unreliable.
		unsafeWindow.GEvent.addListener(unsafeWindow._c09, "moveend", function() {
			moveEventCount++;
			if(moveEventCount == 2) {
				var url = parseURL(location.href);
				if(url.params['lat'] != null && url.params['lng'] != null) {
					console.log("found existing latlng ");
					var lat = parseFloat(url.params['lat']);
					var lng = parseFloat(url.params['lng']);
					var gpoint = eval('(' + unsafeWindow.GPoint.toSource() + ')');
					var center = new gpoint(lng, lat);
					console.log(center);
					unsafeWindow._c09.centerAtLatLng(center);
					unsafeWindow._c09.setZoom(parseInt(url.params['zoom']));
				}
			} else if(moveEventCount > 3) {
				updateLink();
			}
		});
		$("input, select").click(function(){updateLink(); return true;});
	}
}

GM_wait();


// This function updates the "Link" element on the page, appending the lat and lng
function updateLink() {
	if(document.getElementById("link_span").childElementCount > 0) {
		var url = parseURL(document.getElementById("link_span").firstChild.href);
		url.params["lat"] = unsafeWindow._c09.getCenter().lat();
		url.params["lng"] = unsafeWindow._c09.getCenter().lng();
		url.params["zoom"] = unsafeWindow._c09.getZoom();
		var newUrl = url.protocol+"://"+url.host+"/?";
		for(key in url.params) {
			newUrl += key+"="+url.params[key]+"&";
		}
		console.log(newUrl);
		document.getElementById("link_span").firstChild.href = newUrl;
	}
}

// This function creates a new anchor element and uses location
// properties (inherent) to get the desired URL data. Some String
// operations are used (to normalize results across browsers).
function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tp:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}