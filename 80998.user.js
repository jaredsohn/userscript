// ==UserScript==
// @name            Flickr Cross-Recommendations
// @namespace       http://netcetera.org
// @include         http://www.flickr.com/photos/*
// @match	    http://www.flickr.com/photos/*
// @version	    1.5
// @author	    Simon Whitaker (http://www.flickr.com/people/chubbybat/)
// @contributor	    Alesa Dam (http://www.flickr.com/people/alesadam/)
// @contributor	    Darren Greaves (http://www.flickr.com/people/boncey/)
// @contributor	    Martin Heimburger (http://www.flickr.com/people/Vispillo/)
// @updateURL       https://userscripts.org/scripts/source/80998.meta.js
// @downloadURL     https://userscripts.org/scripts/source/80998.user.js
// @description     Adds a "People who faved this also faved..." panel to photos on Flickr
// ==/UserScript==


(function() {
if (!document.location.href.match(/http:\/\/www\.flickr\.com\/photos\/[^\/]+\/\d+/)) {
	return;
}

if (typeof(GM_log) == "undefined") { // Chrome
	GM_log = function(message) {
		console.info('FCR: ' + message);
	}
}

var getJSVariable = function (regex) {
        // Thanks to Vispillo for this compact code
        var retval;
        var scripts = document.getElementsByTagName('script');
	for(var i = 0, len = scripts.length; i < len; ++i) {
	    var script = scripts[i];
            var html = script.innerHTML;
            try {
                retval = regex.exec(html)[1];
		break;
            } catch (e) {
            }
        }
        return retval;
}

var photo_count = 0;
var MAX_IMGS = 6;

var run_count = 0;
var MAX_RUNS = MAX_IMGS * 15; // if we don't have those 6 random images by then, better quit

var photos_to_ignore = new Array();

function pickRandomFavoriteFrom(people) {
	if (!people || people.length == 0) {
		GM_log("no people found");
		return;
	}
	if (photo_count >= MAX_IMGS) { // sanity check
		return;
	}
	if (++run_count > MAX_RUNS) {
GM_log("out of data");
		return;
	}
	photos_to_ignore[current_photo_id] = 1;
	
	var personIdx = Math.floor(Math.random() * people.length);
	var nsid = people[personIdx].nsid;
	    
	var listRequest = new XMLHttpRequest();
	listRequest.onload = function(getPublicListResponse) {
		    var listJson = listRequest.response;
		    try {
			var data = JSON.parse(listJson);
		    } catch (e) {
			try {
				data   = eval('(' + listJson + ')');
			} catch (f) {
				//GM_log("exception parsing list response: " + e);
				pickRandomFavoriteFrom(people);
				return;
			}
		    }
		    var photos = data.photos.photo;
		    
		    var photoIdx = Math.floor(Math.random() * photos.length);
		    var photo  = photos[photoIdx];
		    if (photos_to_ignore[photo.id]) {
			    pickRandomFavoriteFrom(people);
			    return;
		    }
		    photos_to_ignore[photo.id] = 1;
		    
			var photo_url = 'http://farm' + photo.farm
				      + '.static.flickr.com/' 
				      + photo.server + '/' 
				      + photo.id + '_' + photo.secret + '_s.jpg';
		    
			var page_url  = 'http://www.flickr.com/photos/'
				      + photo.owner
				      + '/' + photo.id + '/';
						
			var img = document.createElement('img');
			img.setAttribute('src',photo_url);
			img.setAttribute('border', 0);
		    
			var a = document.createElement('a');
			a.setAttribute('href', page_url);
			a.setAttribute('title', photo.title);
			a.style.marginRight = '8px';
			a.appendChild(img);
		    
			document.getElementById('FCR_photos').appendChild(a);
		    
			// Show the main div, in case it's still hidden
			document.getElementById('FCR_main').style.display = "block";
		    
			++photo_count;
			pickRandomFavoriteFrom(people);
		};
	listRequest.open('get', 'http://api.flickr.com/services/rest/'
		       +'?method=flickr.favorites.getPublicList'
		       +'&api_key=' + api_key
		       +'&format=json&nojsoncallback=1'
		       +'&user_id=' + nsid,
		true);
	listRequest.send();
}

function FCR_add_panel() {
try {
    
    var comments_div = document.getElementById('comments');
    if (!comments_div) {
	GM_log("no comments found; aborting");
	return;
    }
    var xrec_div     = document.createElement('div');
    xrec_div.setAttribute('id', 'FCR_main');
    var xrec_photos  = document.createElement('div');
    xrec_photos.setAttribute('id', 'FCR_photos');
    var xrec_header  = document.createElement('h3');
    xrec_header.innerHTML = 'People who faved this also faved...';
    
    xrec_div.appendChild(xrec_header);
    xrec_div.appendChild(xrec_photos);
    comments_div.parentNode.insertBefore(xrec_div, comments_div);

    xrec_div.style.display = 'none';

    var url =  'http://api.flickr.com/services/rest/'
               +'?method=flickr.photos.getFavorites'
               +'&api_key=' + api_key
	       +'&auth_hash=' + auth_hash
               +'&format=json&nojsoncallback=1'
               +'&photo_id=' + current_photo_id;

    var favesRequest = new XMLHttpRequest();
    favesRequest.onload = function(response) {
	    var json = favesRequest.response;
	    try {
		var data = JSON.parse(json);
	    } catch (e) {
		try {
			data = eval('(' + json + ')');
		} catch (f) {
			GM_log("exception parsing response: " + e);
			return;
		}
	    }
            pickRandomFavoriteFrom(data.photo.person);
            
        };
    favesRequest.open('get', url, true);
    favesRequest.send();

} catch (e) {
    GM_log("Exception occurred: " + e);
}
}

    var re = /flickr\.com\/photos\/[^\/]+\/(\d+)/;
    var current_photo_id = re.exec(document.location.href)[1];
    var api_key = getJSVariable(/[\'\"]api_key[\'\"][\s:]+[\'\"]([^\'\"]+)[\'\"]/); // app key: '45d5d4b7dff9bc653c8eb3e73271c10c'
    var auth_hash = getJSVariable(/[\'\"]auth_hash[\'\"][\s:]+[\'\"]([^\'\"]+)[\'\"]/);

FCR_add_panel();
})();

