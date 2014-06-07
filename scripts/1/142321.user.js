// ==UserScript==
// @name			4chan YouTube URL replacer
// @description		Turns plaintext YouTube URLs into embedded objects
// @version			2.0.6
// @icon			https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer/raw/master/icon.jpg
// @homepage		https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer
// @supportURL		https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer/issues
// @updateURL		https://raw.github.com/ScottSteiner/4chan-YouTube-URL-Replacer/master/4chan%20YouTube.user.js
// @screenshot		https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer/raw/master/screenshot.jpg
// @priority		1
//
// @include			http://*.2chan.net/*
// @include			http://archive.foolz.us/*
// @include			http://archive.installgentoo.net/*
// @include			http://fuuka.warosu.org/*
// @include			http://archive.heinessen.com/*
// @include			http://boards.4chan.org/*
// @include			https://boards.4chan.org/*
// @include			http://dis.4chan.org/*
// @include			https://dis.4chan.org/*
// @include			http://suptg.thisisnotatrueending.com/archive/*
// @include			http://archive.rebeccablacktech.com/*
//
// @match			http://*.2chan.net/*
// @match			http://archive.foolz.us/*
// @match			http://archive.installgentoo.net/*
// @match			http://fuuka.warosu.org/*
// @match			http://archive.heinessen.com/*
// @match			http://boards.4chan.org/*
// @match			https://boards.4chan.org/*
// @match			http://dis.4chan.org/*
// @match			https://dis.4chan.org/*
// @match			http://suptg.thisisnotatrueending.com/archive/*
// @match			http://archive.rebeccablacktech.com/*
// ==/UserScript==
(function () {
	"use strict";
	var embedArray = new Array(0), embedCur = 0, embedTotal = 0, i, timeCheck, timeLastRun, re = {}, settings, sites = {}, siteArray;
	settings = {
		filter: {
			limitPer:		5,
			limitTotal:		-1,
			ignoreDupes:	true
		},
		embed: {
			url:			'http://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22&start=$2&start=$3&start=$4&start=$5',
			width:			'300px',
			height:			'175px',
			brBefore:		true,
			brAfter:		true
		}
	};
	settings.embed.code = (settings.embed.brBefore ? '<br />' : '') + '<object type="application/x-shockwave-flash" style="width: ' + settings.embed.width + '; height: ' + settings.embed.height + '" data="VIDEOURL?fs=1" /><param name="allowFullScreen" value="true" /><param name="movie" value="VIDEOURL" /><param name="wmode" value="transparent" /></object>' + (settings.embed.brAfter ? '<br />' : '');

	re.cruft		= '(?:#t=([\\w]+)|\\?(?:t=([\\w]+)|hd=[\\d])|&amp;(?:annotation_id=annotation_[\\d]{1,10}|at=([\\d]+)|feature=(?:agve|aso|channel(?:_video_title|_hash_redirect|)|feedlik|feedrec_grec_index|feedrec|feedu|fvhl|fvsr|fvst|iv|player_(?:detailpage|embedded)|playlist|popt[\\w]{6}|popular|related|sub|topvideos(?:_entertainment|_news|_sports|_science|_mp|_music|_film|_howto|_vehicles|_mf|)|youtu.be|)|fmt=[\\d]{2}|index=[\\d]|NR=[\\d]*|p=[\\w_-]{16}|ob=[\\w]{4}|playnext=[\\d]|playnext_from=TL|t=([\\w]+)|videos=[\\w_-]{11})|){1,10}';
	re.plaintext	= new RegExp('(?:<br>|)(?:http(?:s|).{3}|)(?:www.|)(?:youtube.com/watch\\?v=|youtu.be/)([\\w_-]{11})' + re.cruft + '(?:<br>|)', 'gi');
	re.linked		= new RegExp('(?:<br>|)<a [^<>]*href="http(?:s|)://www.youtube.com/watch\\?v=.*?\\?v=([\\w_-]{11})' + re.cruft + '.*?</a>(?:<br>|)', 'gi');

	sites.plaintext	= [/(?:\w*\.2chan\.net|4chanarchive\.org|boards\.4chan\.org|chanarchive\.org|krautchan\.net|suptg\.thisisnotatrueending\.com)/, 'blockquote', re.plaintext];
	sites.linkedBQ	= [/(?:4chan\.org|archive\.installgentoo\.net|archive\.no-ip\.org|boards\.420chan\.org|fuuka\.warosu\.org|operatorchan\.org)/, 'blockquote', re.linked];
	sites.linkedDiv	= [/(?:7chan\.org|archive\.foolz\.us)/, 'div', re.linked];
	sites.linkedP	= [/(?:4chon\.net)/, 'p', re.linked];

	for (i in sites) { if (sites.hasOwnProperty(i)) { if (sites[i][0].exec(document.domain)) { siteArray = sites[i]; break; } } }

	function unixtime() { return parseInt(new Date().getTime() / 1000, 10); }

	function startTime(url) {
		var j, k, output, startString, s = url.split('&start=');
		for (j = 1; j < s.length; j++) { if (s[j]) { startString = s[j]; } }
		if (startString) {
			if (startString > 0) {
				output = startString;
			} else {
				output = 0;
				k = startString.match(/(\d+)h/); if (k) { output += k[1] * 3600; }
				k = startString.match(/(\d+)m/); if (k) { output += k[1] * 60; }
				k = startString.match(/(\d+)s/); if (k) { output += parseInt(k[1], 10); }
			}
			return s[0] + '&start=' + output.toString();
		} else { return s[0]; }
	}

	function embedPost(match) {
		var embedURL;
		embedTotal++;
		embedCur++;
		embedURL = match.replace(siteArray[2], settings.embed.url);
		if ((embedArray.indexOf(embedURL) > -1) && (settings.filter.ignoreDupes)) { return ''; }
		if (((settings.filter.limitPer < 0) || (embedCur <= settings.filter.limitPer)) && ((settings.filter.limitTotal < 0) || (embedTotal <= settings.filter.limitTotal))) {
			embedArray.push(embedURL);
			return settings.embed.code.replace('VIDEOURL', startTime(embedURL));
		} else { return match; }
	}

	function embed() {
		var l, posts, temp;
		posts = document.getElementsByTagName(siteArray[1]);
		for (l = 0; l < posts.length; l++) {
			embedCur = 0;
			embedArray.length = 0;
			temp = posts[l].innerHTML.replace(siteArray[2], embedPost);
			if (temp !== posts[l].innerHTML) { posts[l].innerHTML = temp; }
		}
		timeLastRun = unixtime();
	}
	function nodeInsertedHandler(event) {
		timeCheck = unixtime() - 10;
		if ((event.target.nodeName === "TABLE") && (timeCheck >= timeLastRun)) { embed(); }
	}
	embed();
	document.addEventListener('DOMNodeInserted', nodeInsertedHandler, true);
}());