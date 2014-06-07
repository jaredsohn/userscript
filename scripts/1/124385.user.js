// ==UserScript==
// @name           YouTube Always Sort Favorites by Date Favorited
// @namespace      minousoft.com
// @include        /^https?://(?:www.)?youtube.\w+(?::\d{1,5})?/my_favorites(?:\?(?:\w+=.*)*)?(?:#.*)?$/
// ==/UserScript==

function insertParam(key, value) {
    key = escape(key); value = escape(value);
	var rewrite = true;
    var kvp = window.location.search.substr(1).split('&');
    var i=kvp.length; var x;while(i--) {
        x = kvp[i].split('=');
        if (x[0]==key) {
			if (x[1]==value) {
				rewrite = false;
			} else {
                x[1] = value;
                kvp[i] = x.join('=');
			}
			break;
        }
    }
    if(i<0) {kvp[kvp.length] = [key,value].join('=');}
	if (rewrite) {
		window.location.search = kvp.join('&'); 
	}
}

insertParam("sf","addedfav");