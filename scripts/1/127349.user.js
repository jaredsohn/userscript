// ==UserScript==
// @name          Rdio + Eventful
// @namespace     http://jeffpalm.com/rdioeventful
// @description   Displays local concerts on rd.io pages from eventful
// @include       *rdio.com/#*
// @include       *rd.io/#*
// ==/UserScript==

(function() {

    const CHECK_ARTIST_PERIOD = 3000;
    const LOCAL_STORAGE_PREFIX = '*rdio.shows*';
    const CURRENT_LOCATION_KEY = 'current.city';
    const LAST_SEARCH_KEY = 'last.search';
    const SEARCH_KEY = 'search';

    const MILLIS_BETWEEN_SEARCHES = 1000 * 60 * 60 * 24;

    function massage(s) {
	if (s) {
	    s = s.replace(/\_\d+$/,'');
	    s = s.replace(/_/g,' ');
	}
	return s;
    }

    function getArtistAndAlbum() {
	var hash = document.location.hash.replace(/#/,'');
	var res;
	var artist = null;
	var album = null;
	if (res = hash.match(/\/artist\/([^\/]+)\/album\/([^\/]+)/)) {
	    artist = res[1];
	    album = res[2];
	} else if (res = hash.match(/\/artist\/([^\/]+)/)) {
	    artist = res[1];
	}
	artist = massage(artist);
	album = massage(album);
	return {artist:artist, album:album};
    }

    function ajax(url,f) {
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.onreadystatechange = function () { 
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) { 
		f.call(this,xmlHttp.responseText); 
	    } 
	}; 	
	xmlHttp.open('GET',url,true);
	xmlHttp.send(null);
    }

    function fail(msg) {
	log('ERROR: ' + msg);
    }

    function log(msg) {
	try {
	    console.log(msg);
	} catch (_) {}
    }

    function searchForShows(artist,loc) {
	log('Searching for ' + artist + ' in ' + loc);
	//
	// Don't search too often
	//
	var now = parseInt(+new Date());
	var keyForData = SEARCH_KEY + artist + location;
	var keyForDate = LAST_SEARCH_KEY + artist + location;
	var last = get(keyForDate);
	if (!!last) {
	    var lastMillis = parseInt(last);
	    if (now-lastMillis < MILLIS_BETWEEN_SEARCHES) {
		var text = get(keyForData);
		if (!!text) {
		    processArtistText(artist,text,null,null);
		} else {
		    log('Searching too soon');
		}
		return;
	    }
	}
	//
	// Users have to supply their own API key
	//
	var appKey = getApiKey();
	if (!appKey) {
            var msg = "Couldn't get app key.  To use this register an http://api.eventful.com and set localStorage['eventful.api.key'] to your api key";
	    fail(msg);
            alert(msg);
	    return;
	}
	//
	// Remote call to eventful
	//
	var url = 'http://api.eventful.com/rest/events/search'
	    + '?app_key=' + appKey
	    + '&keywords=' + escape(artist)
	    + '&location=' + escape(loc)
	    + '&date=Future';
	ajax(url,(function() {
	    var _artist = artist;
	    var _keyForDate = keyForDate;
	    var _keyForData = keyForData;
	    return function(text) {
		processArtistText(_artist,text,_keyForDate,_keyForData);
	    }
	})());
    }

    function processArtistText(artist,text,keyForDate,keyForData) {
	log('processArtistText for ' + artist + ' cached=' + !keyForData);
	if (!!keyForDate) {
	    set(keyForDate,parseInt(+new Date()));
	}
	if (!!keyForDate) {
	    log(text);
	    set(keyForData,text);
	}
	var xmlDoc = new DOMParser().parseFromString(text,"text/xml");	
	var events = xmlDoc.getElementsByTagName("event");
	if (!events) return;
	var target = document.getElementsByClassName('info_box metadata')[0];
	if (!target) {
	    log("Can't find a target node, please report to jeff@jeffpalm.com");
	    return;
	}
	var div = $n('div');
	//
	// Try to insert after the first child
	//
	div.className = 'info_group';
	if (target.firstChild.nextSibling) {
	    target.firstChild.nextSibling.className =
		target.firstChild.nextSibling.className.replace(/first/,'');
	    target.insertBefore(div,target.firstChild.nextSibling);
	    div.className += ' first';
	} else {
	    target.appendChild(div);
	}
	var h4 = $n('h4',div);
	h4.className = 'info_title';
	h4.innerHTML = 'shows';
	var p = $n('p',div);
	p.className = 'info_title';
	if (events.length == 0) {
	    $t('none',p);
	} else {
	    for (var i=0, N=events.length; i<N; i++) {
		var event = events[i];
		var venue_url = getValue(event,'venue_url');
		var venue_name = getValue(event,'venue_name');
		var venue_address = getValue(event,'venue_address');
		var city_name = getValue(event,'city_name');
		var url = getValue(event,'url');
		var start_time = getValue(event,'start_time');
		var region_abbr = getValue(event,'region_abbr');

		log('venue_url='+venue_url);
		log('venue_name='+venue_name);
		log('venue_address='+venue_address);
		log('city_name='+city_name);
		log('url='+url);
		log('start_time='+start_time);
		log('region_abbr='+region_abbr);

		var newEl = $n('div',p);
		var newTitle = $n('a',newEl);
		newTitle.innerHTML = venue_name;
		newTitle.href = url;
		br(newEl);
		var newLoc = city_name;
		if (!!region_abbr) newLoc += ', ' + region_abbr;
		$t(newLoc,newEl);
		br(newEl);
		$t(formatDate(start_time),newEl);
		if (i<N-1) br(p);
	    }
	}
    }

    function formatDate(date) {
	// 2012-03-06 20:00:00
        var res = date.match(/\d+-(\d+)-(\d+) (\d+:\d+)/);
	if (!!res) {
	    var mon = translateMonth(parseInt(res[1]));
	    var day = res[2].replace(/^0+/,'');
	    var time = res[3];
	    return mon + ' ' + day + ' @ ' + time;
	    
	}
	return date;
    }

    function translateMonth(mon) {
	switch (mon) {
	case 1:  return 'Jan'; 
	case 2:  return 'Feb'; 
	case 3:  return 'Mar'; 
	case 4:  return 'Apr'; 
	case 5:  return 'May'; 
	case 6:  return 'Jun'; 
	case 7:  return 'Jul'; 
	case 8:  return 'Aug'; 
	case 9:  return 'Sep'; 
	case 10: return 'Oct'; 
	case 11: return 'Nov'; 
	case 12: return 'Dec'; 
	}
	return mon;
    }

    function getValue(el,nodeName) {
	var els = el.getElementsByTagName(nodeName);
	if (!els || els.length == 0) return null;
	return els[0].childNodes[0].nodeValue;
    }

    function br(el) {
	$n('br',el);
    }

    function $n(tag,onto) {
	var el = document.createElement(tag);
	if (!!onto) onto.appendChild(el);
	return el;
    }

    function $t(text,onto) {
	var el = document.createTextNode(text);
	if (!!onto) onto.appendChild(el);
	return el;
    }

    function get(key,defaultValue) {
	try {
	    var res = localStorage[LOCAL_STORAGE_PREFIX + key];
	    if ((!!res && res != 'null') || !defaultValue) {
		return res;
	    }
	} catch (_) {}
	return defaultValue;
    }

    function set(key,value) {
	try {
	    localStorage[LOCAL_STORAGE_PREFIX + key] = value;
	} catch (_) {}
    }

    function getCurrentLocation() {
	var loc = findCurrentLocation();
	if (!!loc) {
	    set(CURRENT_LOCATION_KEY,loc);
	    return loc;
	}
	return get(CURRENT_LOCATION_KEY);
    }

    function findCurrentLocation() {
	var divs = document.getElementsByClassName("location");
	console.log("divs="+divs);
	if (!divs) return null;
	if (divs.length == 0) return null;
	return divs[0].innerHTML;
    }

    var lastCheckLocation = null;
    function checkArtist() {
	var curLocation = String(document.location);
	if (curLocation == lastCheckLocation) {
	    return;
	}
	lastCheckLocation = curLocation;
	var loc = getCurrentLocation();
	if (!loc) return;
	var artist = getArtistAndAlbum().artist;
	if (!artist) return;
	searchForShows(artist,loc);
    }

    function getApiKey() {
	return 'swpJJKRsqbWQg6SZ';
    }
    
    function main() {
	setInterval(checkArtist,CHECK_ARTIST_PERIOD);
    }

    main();
    
})();