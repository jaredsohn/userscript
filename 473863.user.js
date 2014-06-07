// ==UserScript==
// @name       Flickr: search tags in same photostream
// @namespace  http://www.loupiote.com/
// @version    0.1
// @description  Clicking a tag on a photo-page will search in the photostream that contains the photo
// @include     /^https?://www\.flickr\.com/(photos/tags/.+|search/.*[&?]m=tags(&.*|))$/
// @exclude     /^https?://www\.flickr\.com/search/.*[&?]user_id=.+/
// @copyright  2014 Loupiote - http://www.loupiote.com
// @grant       none
// @run-at      document-start
// ==/UserScript==

var url = '';

var referrer = document.referrer;

var myRegexp = /https?:\/\/www.flickr.com\/photos\/([^\/]+)\/\d+/;

var match = myRegexp.exec(referrer);

if (match != null) {
    var user = match[1];
    
    if (user == "tags") {
        return;
    }
           
    // if url indicates global tag search, make it photostream tag search
    if (location.href.match(/^https?:\/\/www\.flickr\.com\/photos\/tags\/.*/)) {

    	url = location.href.replace('/photos/','/photos/' + user + '/');
    	if (url.substr(url.length - 1) != '/') {
        	url += '/';
    	}
    } else {
        // in this case, we are on a global search page caused by clicking a tag on the NPE photo-page
        // and this search does not have a user-id (those are excluded by an @exclude in the GM header)
		var myTagRegexp = /.*[&?]q=([^&]+)/;

		var tagMatch = myTagRegexp.exec(location.href);
        
        var tag = tagMatch[1];
        
        if (tag) {
        	url = 'https://www.flickr.com/photos/' + user + '/tags/' + tag + '/';
        }
    }
}

if (url) {
	window.location.replace(url);
}
