// ==UserScript==
// @name           8tracks x Muxtape
// @namespace      http://8tracks.com/
// @description    Play 8tracks like Muxtape
// @include        http://*8tracks.com/*
// @author         YungSang
// @version        0.4
// ==/UserScript==
// v0.1 : 2009.05.19 : First Release
// v0.2 : 2009.05.20 : Added an ability to open/close the window
// v0.3 : 2009.05.20 : Auto-play the next track and show a play time.
// v0.4 : 2012.07.20 : Work with new APIs

var TRAX = unsafeWindow.TRAX;
if (!TRAX || !TRAX.mix) return;
var mix = TRAX.mix;

var $ = unsafeWindow.jQuery;

var soundManager = unsafeWindow.soundManager;

$.cookie('play_token', '', {
	expires : 'Thu, 01 Jan 1970 00:00:00 GMT', path : '/'
});
var play_token = '';
var tracks     = [];

var $div = $('<div/>').appendTo(document.body).css({
	position           : 'fixed',
	bottom             : '0',
	right              : '0',
	margin             : '0 10px 10px 0',
	padding            : '0',
	border             : '1px solid #ccc',
	'z-index'          : '10000',
	'background-color' : '#fff',
});
var $ul = $('<ul/>').appendTo($div).css({
	margin       : '0',
	padding      : '0',
	'text-align' : 'right',
	'max-height' : '500px',
	'overflow-y' : 'auto'
});

xhr('http://8tracks.com/sets/new?mix_id' + mix.id + '&format=jsonh', function(json) {
	play_token = json.play_token;
	$.cookie('play_token', play_token, {
		expires : 7, path : '/'
	});
	getFirstSong();
});

function getFirstSong() {
	xhr('http://8tracks.com/sets/' + play_token + '/play?mix_id=' + mix.id + '&format=jsonh', function(json) {
		if (setTrack(json)) getNextSong();
		else showTracks();
	});
}

function getNextSong() {
	xhr('http://8tracks.com/sets/' + play_token + '/next?mix_id=' + mix.id + '&format=jsonh', function(json) {
		if (setTrack(json)) getNextSong();
		else showTracks();
	});
}

function setTrack(json) {
	var track = json.set.track;
	if (!track || !track.id) return false;
	tracks.push(track);
	showTrack(track);
	return true;
}

function clock(time) {
	var time = Math.floor(time / 1000);
	var sec = time % 60;
	var min = (time - sec) / 60;
	var min_formatted = min ? min + ':' : '0:';
	var sec_formatted = sec < 10 ? '0' + sec : sec;
	return min_formatted + sec_formatted;
}

function play(track) {
	var $li = $('#track-' + track.id, $ul);
	soundManager.createSound({
		id  : 't' + track.id,
		url : track.track_file_stream_url,
		whileplaying : function() {
			$('span.time', $li).empty().append(clock(this.position) + ' / ' + clock(this.duration));
		},
		onfinish : function() {
			$('span.time', $li).empty();
			$li.css('background-color', '#fff').removeClass('playing');
			playNext(track.id);
		}
	});
	soundManager.play('t' + track.id);
	$li.css('background-color', '#ddd').addClass('playing');
}

function playNext(id) {
	for (var i = 0, len = tracks.length ; i < len ; i++) {
		var track = tracks[i];
		if (track.id == id) break;
	}
	var next = i + 1;
	if (next < len) {
		play(tracks[next]);
	}
}

function stopAll() {
	$('span.time', $ul).empty();
	$('li.track', $ul).css('background-color', '#fff').removeClass('playing');
	soundManager.stopAll();
}

function showTrack(track) {
	var $li = $('<li class="track"/>').attr({
		id : 'track-' + track.id
	}).appendTo($ul).append(
		'<b>' + track.name + '</b> - ' + track.performer
		+ ' <span class="time" style="color:#009400; white-space:nowrap;"></span>'
	).css({
		margin     : 0,
		padding    : '5px'
	}).slideDown('slow').click(function(event) {
		if (!$(this).hasClass('playing')) {
			stopAll();
			play(track);
		}
		else {
			stopAll();
		}
		event.preventDefault();
		return false;
	}).hover(function() {
		var $this = $(this);
		if (!$this.hasClass('playing')) {
			$this.css({'background-color' : '#eee'});
		}
	}, function() {
		var $this = $(this);
		if (!$this.hasClass('playing')) {
			$this.css({'background-color' : '#fff'});
		}
	});
}

function showTracks() {
	$('<div/>').appendTo($div).append(
		'Total ' + tracks.length + ' tracks!'
	).css({
		margin       : 0,
		padding      : '5px',
		background   : '#122C4B',
		'text-align' : 'right',
		color        : '#fff'
	}).slideDown('slow').click(function(event) {
		var $this = $(this);
		if (!$this.hasClass('closed')) {
			$('li.track', $ul).hide();			
			$this.addClass('closed');
		}
		else {
			$('li.track', $ul).show();			
			$this.removeClass('closed');
		}
		event.preventDefault();
		return false;
	});
//	.addClass('closed');
//	$('li.track', $ul).hide();			
}

function xhr(url, callback) {
	GM_xmlhttpRequest({
		method: 'GET', 
		url: url,
		onload: function(response) {
			callback(JSON.parse(response.responseText));
		}
	});
}