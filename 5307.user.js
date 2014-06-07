// ==UserScript==
// @name          Flickr GeoRadar
// @version       1.1
// @description	  This script displays nearby geotagged photos on a fancy radar screen
// @namespace     http://webdev.yuan.cc/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// v1.0	08/23/06	initial release
// v1.1 08/28/06	Add Exif support
//
// Author: .CK ( http://www.flickr.com/photos/ckyuan/ )
// Web site: http://webdev.yuan.cc/
//           http://flickr.tw/
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

var photoid = w.page_photo_id;
/*
var lat=lon='';
var tmp = new Array();
var tags = tmp.concat(w.global_photos[photoid].tags_rawA);
while( tags && tags.length > 0 ) {
    tag = tags.pop();
    splits = tag.split('=');
    if( splits[0] == 'geo:lat' ) var lat = 1*splits[1];
    if( splits[0] == 'geo:lon' || splits[0] == 'geo:long' ) var lon = 1*splits[1];
}
if( lat=='' || lon=='' ) return;
*/

var container;
var coord = {lat: '', lon: ''};

var N = 'data:image/gif;base64,R0lGODlhEAAQAPMAALUJCcM/P////759fbceHrtZWcPIyLpNTb1ra8Cfn7+NjcTQ0LUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARM8MlJq5Uh3Jt3bQzTeE/THCFiXo2zACHhOOPnKGGY0LYT5IzDrCZpGWA5wII3aQ2AoQGz6CgwCAJBbEqdeYeW1tdLpJi+K48pTSJFAAA7';
var NE = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OPHABQcUiJCEJhENRhEkYsj0igyrE4uXVxx6eWKTAY5BCenamkKpSSEt6wAHjSlgHrdakdSZHQSyeswUQAADs=';
var NW = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq704VwCGPOBxEUYhCEiKgJbhvoQqUsD7FsFaoXaBp7MPomYYDHJAyiFVKKmSk+Xw9wwKEUiZRfqEVkBV6zakKUcAADs=';
var E = 'data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcjGsQRepUZNg0yEEArOgIMBwrlhgWdcCD5OYJCGPFhTAp6PhEMYUiwoqFFalUykjYdjfgRAQA7';
var W = 'data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcTHoQhehVADEjTrJUSyLIgjtKA/4Udy/eTBWkThaAorDAShtgsxKKYHKgF0nmlVksdjfgRAQA7';
var SE = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OP5kiIcNchnqNlnkHoUasYFIALo4VR2FMcDAODofaSrGY5oQEhqJhmSiXAKSJEhaoYU5AjlDqSAWCqsUQAADs=';
var SW = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70468PPPkiIcBconl5lBueohkDBopRZGEWbSiBgGIPBzDURIH6/giy0S/iQSVYzAf0RRE0CTmDETgGAAa+jKUcAADs=';
var S = 'data:image/gif;base64,R0lGODlhEAAQAPMAALUJCf///7ceHr59fcY/P7tZWbk/P7pNTb1ra8Cfn7+NjcTNzbUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARG8MlJq70458ab5k7ocFcjnqNloqFHmQLDBEFcpJM5yDwz4BLTAtADLICP1aFnaFVMiZ4CGQzFGEZqsIGQHUgbmUvzIBAuEQA7';
var Red = 'data:image/gif;base64,R0lGODlhBAAEAJEAAAAAAP////8AAAAAACH5BAEAAAEALAAAAAAEAAQAAAIElI8pBQA7';
var Green = 'data:image/gif;base64,R0lGODlhBAAEAJEAAAAAAP///wD/AAAAACH5BAEAAAEALAAAAAAEAAQAAAIElI8pBQA7';
var small_radar = 'data:image/gif;base64,R0lGODlhFAAUANUCAAQcBAQeAv///w0LDQUkEgQ0BAQfBQQhCgQjEQAZAAAVAAcdBwROCwIdAkuGRzU2NRKwEj93WhF5HAM/BgSdAxUkFQl8CQK9AQQaBAKRAwcgCAWjBkqNTANZAkqUSwAdDQ4mD0qeSwAbBgIdBAVSDA8pDxkmGQR3AwRkExCJEAePCBReFCxALAUjEQaMBgufCwgGCBo1JggxGAkpHBIrEw8nEBDBEEdHRwN6AgkfCQQrAxkrGgBnDgQfBAEBAQQeBCH5BAEAAAIALAAAAAAUABQAAAb3QJ9QCBMYj0bYcClE6iaMzurIbApyikaBgcJlKBbBTTk0KhKA3xZ1cm0uL2NZoADYDWucamMLgeRFGmh2alxeECEmCgsCAw8CaCN2AAUkXS8eFXUJLEY0DZM/GDokPCkcO2g/DX8CAQ0NAbJ2ExIONAk9sgEJRh8ICC0tBMAyETEfBMrKH0YiB9DRBwQzBtLQIkawsQABAA0HCAE95Lu9Ap8jPT89AD3TPQbk7KxHqiM/adPu8z+9D4Ea5Bs4jZ28VQYa+TAzsFs4dhAVyLGShSCBAAYMBJAogIkRQRjAIYCV4EeSKkdqJEjwIUEJKlWEDECCZACTIAA7';

function sign(params) {

    params.api_key = w.global_magisterLudi;
    params.auth_hash = w.global_auth_hash;
    params.auth_token = w.global_auth_token;

    var _11=[], _12='';
    for(var p in params) {
        params[p]=params[p];
        _11.push(p);
        _12+="&"+p+"="+w.escape_utf8(params[p]);
    }
    _11.sort();
    var cal=w.global_flickr_secret;
    if(cal!="") {
        for(var i=0;i<_11.length;i++) cal+=_11[i]+params[_11[i]];
        cal=w.md5_calcMD5(cal);
        _12="api_sig="+cal+_12;
    }
    return _12;
}

function getCoord() {
    var tmp = new Array();
    var photoid = w.page_photo_id;
    var tags = tmp.concat(w.global_photos[photoid].tags_rawA);
    while( tags && tags.length > 0 ) {
	tag = tags.pop();
	splits = tag.split('=');
	if( splits[0] == 'geo:lat' ) coord.lat = 1*splits[1];
	if( splits[0] == 'geo:lon' || splits[0] == 'geo:long' ) coord.lon = 1*splits[1];
    }
    if(coord.lat=='' || coord.lon=='' ) {
	var listener = function(result) {
	    var responseText = result.responseText;
	    var rExp = /[]/gi;
	    var text = '' + responseText;
	    text = text.replace(rExp, '');

	    var rsp = text.replace(/<\?xml.*\?>/,'');
	    rsp = new XML(rsp);
	    lat_dir = (rsp..exif.(@label == 'North or South Latitude').raw == 'S')?-1:1
	    lat = new String(rsp..exif.(@label == 'Latitude').raw);
	    lon_dir = (rsp..exif.(@label == 'East or West Longitude').raw == 'W')?-1:1
	    lon = new String(rsp..exif.(@label == 'Longitude').raw);
	    if((lat.length > 0) && (lon.length > 0)) {
		lat = lat.split(/[,\/]/);
		lat_deg = parseInt(lat[0])/parseInt(lat[1]);
		lat_min = parseInt(lat[2])/parseInt(lat[3]);
		lat_sec = parseInt(lat[4])/parseInt(lat[5]);
		coord.lat = lat_dir * (lat_deg + (lat_min+lat_sec/60)/60);
								
		lon = lon.split(/[,\/]/);
		lon_deg = parseInt(lon[0])/parseInt(lon[1]);
		lon_min = parseInt(lon[2])/parseInt(lon[3]);
		lon_sec = parseInt(lon[4])/parseInt(lon[5]);
		coord.lon = lon_dir * (lon_deg + (lon_min+lon_sec/60)/60);
		coordDone();
	    }
	};
	params = {
	    method: 'flickr.photos.getExif',
	    photo_id: photoid
	};
	url = 'http://flickr.com/services/rest/?' + sign(params);
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: url,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey GeoRadar',
		'Accept': 'application/atom+xml,application/xml,text/xml'
	    },
	    onload: listener});
    } else coordDone();
}

function loadPhotos() {

    container.innerHTML = '';
    var radar = _ce('div');
    radar.style.width = '250px';
    radar.style.height = '250px';
    radar.style.padding = '0px 0px 0px 0px';
    radar.style.margin = '0px 0px 0px 0px';
    radar.style.display = 'inline';
    radar.style.border = 'solid 0px #000000';
    radar.style.overflow = 'hidden';
    var blank = radar.cloneNode(true);
    blank.style.border = '0px';
//    radar.innerHTML = '<img src="http://static.flickr.com/86/222763825_ad43c6d175_o.jpg" style="margin:0px" width="250" height="250" border="0" align="left" />';
    radar.innerHTML = '<img src="http://static.flickr.com/74/223454955_695950c335_o.gif" style="margin:0px" width="250" height="250" border="0" align="left" />';
    blank.innerHTML = '<img src="http://static.flickr.com/94/222893082_2925713b3b_o.gif" style="margin:0px" width="250" height="250" border="0" align="left" />';
    container.appendChild(radar);
    container.appendChild(blank);

    var url = 'http://maps.yuan.cc/api.php?method=flickr.search.nearby&lat=' +coord.lat+ '&lon=' +coord.lon;
    var headers = { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Nearby Geotagged Photos', 'Accept': 'application/atom+xml,application/xml,text/xml' };
    GM_xmlhttpRequest({
	method: 'GET', url: url, headers: headers,
	onload: function(responseDetails) {
	    blank.innerHTML = '';
	    var lat=coord.lat, lon=coord.lon;
	    var PI = Math.PI;
	    var parser = new w.DOMParser();
	    var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	    var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
	    if( stat == 'ok' ) {
		var photos = dom.getElementsByTagName('photo');
		if(photos.length>1) {
		    var spot = _ce('div');
		    spot.style.position = 'absolute';
		    spot.style.zIndex = 1000;
		    spot.style.width = '0px';
		    spot.style.height = '0px';
		    spot.style.padding = '0px';
		    spot.style.margin = '0px';
		    spot.style.overflow = 'visible';
		    spot.style.display = 'inline';		    	    
		}

		var y = 1*photos[25].getElementsByTagName('longitude').item(0).firstChild.data;
		var x = 1*photos[25].getElementsByTagName('latitude').item(0).firstChild.data;
		var MaxR = Math.sqrt( (x-lat)*(x-lat)+(y-lon)*(y-lon));
		for(var i=1; i<26; i++) {
		    var id = photos[i].getAttribute('id');
		    var owner = photos[i].getAttribute('owner');
		    var secret = photos[i].getAttribute('secret');
		    var server = photos[i].getAttribute('server');
//		    var title = photos[i].getElementsByTagName('title').item(0).firstChild.data;
		    var img_s = 'http://static.flickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';
		    var y = 1*photos[i].getElementsByTagName('longitude').item(0).firstChild.data;
		    var x = 1*photos[i].getElementsByTagName('latitude').item(0).firstChild.data;
		    var arc = Math.atan2(x-lat,y-lon);
		    var r = Math.sqrt( (x-lat)*(x-lat)+(y-lon)*(y-lon));
		    x = r*Math.cos(arc); x = x*110/MaxR; x = x-125;
		    y = r*Math.sin(arc); y = y*110/MaxR; y = 125-y;
		    dir = '';
		    if( -1/8*PI<=arc && arc<=1/8*PI ) dir = E;
		    if( 1/8*PI<=arc && arc<=3/8*PI ) dir = NE;
		    if( 3/8*PI<=arc && arc<=5/8*PI ) dir = N;
		    if( 5/8*PI<=arc && arc<=7/8*PI ) dir = NW;
		    if( 7/8*PI<=arc || arc<=-7/8*PI ) dir = W;
		    if( -7/8*PI<=arc && arc<=-5/8*PI ) dir = SW;
		    if( -5/8*PI<=arc && arc<=-3/8*PI ) dir = S;
		    if( -3/8*PI<=arc && arc<=-1/8*PI ) dir = SE;

		    var box = _ce('div');
		    box.style.width = '50px';
		    box.style.height = '50px';
		    box.style.padding = '0px';
		    box.style.margin = '0px';
		    box.style.display = 'inline';
		    var thumb = _ce('a');
		    thumb.title = arc;
		    thumb.href = 'http://www.flickr.com/photos/' +owner+ '/' + id +'/';
		    thumb.innerHTML = '<img src="' +img_s+ '" width="50" height="50" border="0" style="margin:0px" />';
		    box.appendChild(thumb);
		    blank.appendChild(box);

		    var _dir = _ce('div');
		    _dir.id = 'box'+i+'_dir';
		    _dir.style.position = 'absolute';
		    _dir.style.zIndex = 1000;
		    _dir.style.width = '0px';
		    _dir.style.height = '0px';
		    _dir.style.padding = '0px';
		    _dir.style.margin = '0px';
		    _dir.style.overflow = 'visible';
		    _dir.style.display = 'none';
		    _dir.innerHTML = '<img src="'+dir+'" style="position:relative;left:-18px;top:-2px;" />';
		    box.appendChild(_dir);

		    var _spot = spot.cloneNode(true);
		    radar.appendChild(_spot);
		    var point = _ce('img');
		    point.id = 'box'+i+'_img';
		    point.src = Green;
		    point.style.position = 'relative';
		    point.style.zIndex = 1000;
		    point.style.left = x+'px';
		    point.style.top = y+'px';
		    _spot.appendChild(point);
		    
		    box.id = 'box'+i;
		    box.addEventListener('mouseover', function() {
			_gi(this.id+'_img').style.zIndex = 2000;
			_gi(this.id+'_img').src = Red;
			_gi(this.id+'_dir').style.display = 'inline';
		    }, true);
		    box.addEventListener('mouseout', function() {
			_gi(this.id+'_img').style.zIndex = 1000;
			_gi(this.id+'_img').src = Green;
			_gi(this.id+'_dir').style.display = 'none';
		    }, true);		    		    
		}
	    }
	}
    });
}


function coordDone() {

    var photodiv = _gi('photoImgDiv' + photoid);
    container = _ce('div');
    container.style.width = '500px';
    container.style.border = '0px';
    container.style.margin = '0px';
    container.style.padding = '0px';

    var fetchphotos = _ce('a');
    fetchphotos.style.fontSize = '12px';
    fetchphotos.style.fontColor = '#00ff00';
    fetchphotos.style.textDecoration = 'none';
    fetchphotos.href = "javascript:;";
    fetchphotos.addEventListener('click', loadPhotos, true);
    //fetchphotos.innerHTML = '<img src="http://static.flickr.com/86/222763825_ad43c6d175_s.jpg" border="0" width="20" height="20" /> Turn on the radar';
    fetchphotos.innerHTML = '<img src="'+small_radar+'" border="0" width="20" height="20" /> <font color="#008800">TURN ON RADAR</font>';
    container.appendChild(fetchphotos);

    photodiv.parentNode.insertBefore(container, photodiv.nextSibling);
}

getCoord();

})();

