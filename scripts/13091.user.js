// ==UserScript==
// @name           emusic+last.fm popular tracks
// @namespace      http://duefordisconnection.net/greasemonkey
// @description    combine reach data from last.fm with emusic album listing. written by jan.berkel@gmail.com and licensed under the GPL.
// @include        http://www.emusic.com/album/*
// ==/UserScript==

const DEBUG = true;

Array.prototype.max = function(){
	return Math.max.apply({},this)
}
Array.prototype.min = function(){
	return Math.min.apply({},this)
}

function debug() {
  if (DEBUG && console) {
    console.log.apply(this, arguments);
  }
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function content(p) {
	return $x(p)[0].textContent.trim();
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function normalise( numbers, normalize ) {
	normalised = []
	max = numbers.max();
	min = numbers.min();

	if (max == min) {
  		max = min + 1
	}
	
	for ( var i=0; i<numbers.length; i++) {
		normalised.push( Math.round( Math.abs(numbers[i] - min) / (max - min) * normalize ) );
	}
	return normalised;
}


String.prototype.enkode = function() {
	return escape(this.replace(/&/g, 'and'))
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

var artist = content("//li[@id='artist']/h3/a");
var album  = content("//div[@class='albumDetails']/h1");

debug(artist);
debug(album);

var url = 'http://ws.audioscrobbler.com/1.0/album/' + artist.enkode() + '/' + album.enkode() + '/info.xml';

debug('url: ' + url);

get(url, function(text) { 

	if ('No such album for this artist' == text) {
		debug('album not found');
		return;
	}

	//debug('received: ' + text);
		
	var info = new XML(text.replace('<?xml version="1.0" encoding="UTF-8"?>', "")); 
	
	var allReach = [];
	for (var j = 0; j<info.tracks.track.length(); j++) {	
		var reach = info.tracks.track[j].reach;
		allReach.push(parseInt(reach));
	}	
	
	var normalisedReach = normalise(allReach, 6);
	
	var trackList = $x("//td[@class='track']/p[@class='songName']");
	for (var i = 0; i<trackList.length; i++) {
		
			var name = trackList[i].textContent.trim();		
			//debug('looking for ' + name);
			for (var j = 0; j<info.tracks.track.length(); j++) {
			
				if (name.toLowerCase() == info.tracks.track[j].@title.toLowerCase()) {
					//debug('matching with ' + info.tracks.track[j].@title);	
					var reach = info.tracks.track[j].reach;
					
					dummyDiv = document.createElement('div');
					var foo = "<span class='reach'> ";
					
					for (var k=0; k<normalisedReach[j]; k++) {
						foo += '*';
					}
					foo += '</span>';
					
					dummyDiv.innerHTML = foo;
					insertAfter(dummyDiv.firstChild, trackList[i].firstChild);	
				}
			}
	}
});
