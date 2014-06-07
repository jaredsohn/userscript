// ==UserScript==
// @name          Chronological Flickr Photostream
// @version       0.1
// @description	  Adding a photostream box(timestream) to photo page to display the context in chronological order of date taken
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// v0.1	02/11/05	initial release
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//
// ==/UserScript==

(function() {

var re = /http:\/\/(www\.)?flickr\.com\/photos\/[^\/]+\/\d+/;
if( ! re.test(document.location) ) return;

if(unsafeWindow) w = unsafeWindow;
else w = window;
var global_photos = w.global_photos;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

var insertPoint,str;
var photo_id,ownersUrl;

for(var i in global_photos) photo_id = global_photos[i].id;
ownersUrl = global_photos[photo_id].ownersUrl;

var divs = _gt('div');
for(var i=0;i<divs.length; i++) {
    if( divs[i].className == 'ContextTop' ) {
	insertPoint = divs[i];
	break;
    }
}

var imgs = insertPoint.getElementsByTagName('img');
for(var i=0;i<imgs.length;i++) if( imgs[i].className == 'nextprev_button' && /nextprev_button_stream/.test(imgs[i].id) ) np = imgs[i];

var newDiv = insertPoint.cloneNode(true);

var trs = newDiv.getElementsByTagName('tr');
for(var i=0;i<trs.length;i++) trs[i].id = '';
trs[1].style.display = 'table-row';
trs[1].id = 'timestream';

var imgs = newDiv.getElementsByTagName('img');
for(var i=0;i<imgs.length;i++) if( imgs[i].className == 'nextprev_button' ) var t_np = imgs[i];
var tbox_open = true;
t_np.src = 'http://www.flickr.com/images/context_open.gif';
t_np.onclickHandler = function() {
    if( tbox_open ) {
	document.getElementById('timestream').style.display = 'none';
	this.src = 'http://www.flickr.com/images/context_closed.gif';
    } else {
	document.getElementById('timestream').style.display = 'table-row';
	this.src = 'http://www.flickr.com/images/context_open.gif';
    }
    tbox_open = !tbox_open;
}
t_np.addEventListener('click', t_np.onclickHandler, true);

var elms = newDiv.getElementsByTagName('a');
var re = /photostream/;
for(var i=0; i<elms.length; i++) {
    str = '' + elms[i].innerHTML;
    if( elms[i].className == 'currentContextLink' || elms[i].className == 'Grey' )
	elms[i].innerHTML = str.replace(re, 'timestream');
}

var divs = newDiv.getElementsByTagName('div');
for(var i=0; i<divs.length; i++) if(divs[i].className == 'contextThumbsDiv') var target = divs[i];
//var imgs = target.getElementsByTagName('img');
//for(var i=0;i<imgs.length;i++) if( imgs[i].className == 'nextprev_thumb' ) imgs[i].src = 'http://www.flickr.com/images/context_loading.gif';
var spans = target.getElementsByTagName('span');
for(var i=0;i<spans.length;i++) spans[i].innerHTML = '<img src="http://www.flickr.com/images/context_loading.gif" />';

if( insertPoint.nextSibling )
     insertPoint.parentNode.insertBefore(newDiv,insertPoint.nextSibling);
else insertPoint.parentNode.appendChild(newDiv);

var headers = { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Chronological Flickr Photostream', 'Accept': 'application/atom+xml,application/xml,text/xml' };

url =  'http://www.flickr.com/services/rest/?method=flickr.photos.getInfo';
url += '&api_key=bc60075f4ce963fab3fac473d0741fe8';
url += '&photo_id=' + photo_id;
GM_xmlhttpRequest({
    method: 'GET', url: url, headers: headers,
    onload: function(responseDetails) {
	var parser = new w.DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
	if( stat == 'ok' ) {
	    var taken_date = dom.getElementsByTagName('dates')[0].getAttribute('taken');
	    var owner_nsid = dom.getElementsByTagName('owner')[0].getAttribute('nsid');
	    var username = dom.getElementsByTagName('owner')[0].getAttribute('username');
	    var url =  'http://www.flickr.com/services/rest/?method=flickr.photos.search';
	    url += '&api_key=bc60075f4ce963fab3fac473d0741fe8';
	    url += '&user_id=' + owner_nsid;
	    url += '&min_taken_date=' + taken_date;
	    url += '&sort=date-taken-asc';
	    url += '&per_page=2';
	    GM_xmlhttpRequest({ method: 'GET', url: url, headers: headers,
		onload: function(responseDetails) {
		    var parser = new w.DOMParser();
		    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		    var id = dom.getElementsByTagName('photo')[1].getAttribute('id');
		    var secret = dom.getElementsByTagName('photo')[1].getAttribute('secret');
		    var server = dom.getElementsByTagName('photo')[1].getAttribute('server');
		    var img_s = 'http://static.flickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';
		    var photo_url = ownersUrl + id + '/';
		    var span = target.getElementsByTagName('span')[1];
		    span.innerHTML = '';
		    var html  = '<a class="contextThumbLink" href="http://www.flickr.com' + photo_url + '">';
		    html += '<img style="overflow:true;cursor: pointer; visibility: visible;" id="nextprev_thumb_next_stream62869273@N00" class="nextprev_thumb" src="' + img_s + '" title="Move to the next photo in the stream" height="75" width="75" onload="_decorate(this, \'' +photo_url+ '\', \'next\', false, \'stream\', \'' +owner_nsid+ '\', true)">';
		    html += '</a>';
		    span.innerHTML = html;
		}
	    });
	    var url =  'http://www.flickr.com/services/rest/?method=flickr.photos.search';
	    url += '&api_key=bc60075f4ce963fab3fac473d0741fe8';
	    url += '&user_id=' + owner_nsid;
	    url += '&max_taken_date=' + taken_date;
	    url += '&sort=date-taken-desc';
	    url += '&per_page=2';
	    GM_xmlhttpRequest({ method: 'GET', url: url, headers: headers,
		onload: function(responseDetails) {
		    var parser = new w.DOMParser();
		    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		    var id = dom.getElementsByTagName('photo')[1].getAttribute('id');
		    var secret = dom.getElementsByTagName('photo')[1].getAttribute('secret');
		    var server = dom.getElementsByTagName('photo')[1].getAttribute('server');
		    var img_s = 'http://static.flickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';
		    var photo_url = ownersUrl + id + '/';
		    var span = target.getElementsByTagName('span')[0];
		    span.innerHTML = '';
		    var html  = '<a class="contextThumbLink" href="http://www.flickr.com' + photo_url + '">';
		    html += '<img style="overflow:true;cursor: pointer; visibility: visible;" id="nextprev_thumb_prev_stream62869273@N00" class="nextprev_thumb" src="' + img_s + '" title="Move to the previous photo in the stream" height="75" width="75" onload="_decorate(this, \'' +photo_url+ '\', \'prev\', false, \'stream\', \'' +owner_nsid+ '\', true)">';
		    html += '</a>';
		    span.innerHTML = html;
		}
	    });
	}
    }
});

})();
