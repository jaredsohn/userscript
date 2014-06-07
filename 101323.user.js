/*
    4chan YouTube URL Replacer
    Copyright (C) 2010-2013 ScottSteiner (nothingfinerthanscottsteiner@gmail.com)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name				4chan YouTube URL Replacer
// @namespace			http://about.me/ScottSteiner
// @id					YouTube@ScottSteiner
// @author				Scott Steiner <nothingfinerthanscottsteiner@gmail.com> http://about.me/ScottSteiner
// @description			Turns plaintext/linked YouTube URLs into embedded objects on 4chan, 7chan, 420chan, operatorchan, krautchan, 2chan and imageboard archives
// @version				2.0.11
// @copyright			2010-2013, Scott Steiner <nothingfinerthanscottsteiner@gmail.com>
// @license				GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @icon				https://raw.github.com/ScottSteiner/4chan-YouTube-URL-Replacer/master/icon.jpg
// @homepage			https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer
// @supportURL			https://github.com/ScottSteiner/4chan-YouTube-URL-Replacer/issues
// @updateURL			https://userscripts.org/scripts/source/77506.meta.js
// @downloadURL			https://userscripts.org/scripts/source/77506.user.js
// @screenshot			https://raw.github.com/ScottSteiner/4chan-YouTube-URL-Replacer/master/screenshot.jpg
// @contributionURL		https://steamcommunity.com/id/richardmstallman/wishlist
// @contributionAmount	Steam games
// @priority			1
// @run-at				document-end
//
// @include				http://*.2chan.net/*
// @include				http*://boards.4chan.org/*
// @include				http*://dis.4chan.org/*
// @include				http://*.4chon.net/*
// @include				http*://7chan.org/*
// @include				http://boards.420chan.org/*
// @include				http://*.krautchan.net/*
// @include				http://*.operatorchan.org/*
// @include				http://chanarchive.org/*
// @include				http*://archive.foolz.us/*
// @include				http*://nsfw.foolz.us/*
// @include				http*://fuuka.warosu.org/*
// @include				http://archive.heinessen.com/*
// @include				http://archive.installgentoo.net/*
// @include				http*://archive.nyafuu.org/*
// @include				http*://rbt.asia/*
// @include				http://archive.thedarkcave.org/*
// @include				http://suptg.thisisnotatrueending.com/archive/*
// @include				http://www.ptchan.net/*
//
// @match				http://*.2chan.net/*
// @match				http://7chan.org/*
// @match				https://7chan.org/*
// @match				http://boards.4chan.org/*
// @match				https://boards.4chan.org/*
// @match				http://dis.4chan.org/*
// @match				https://dis.4chan.org/*
// @match				http://*.4chon.net/*
// @match				http://boards.420chan.org/*
// @match				http://*.krautchan.net/*
// @match				http://*.operatorchan.org/*
// @match				http://chanarchive.org/*
// @match				http://archive.foolz.us/*
// @match				http://fuuka.warosu.org/*
// @match				https://fuuka.warosu.org/*
// @match				http://archive.heinessen.com/*
// @match				http://archive.installgentoo.net/*
// @match				http://archive.nyafuu.org/*
// @match				https://archive.nyafuu.org/*
// @match				http://rbt.asia/*
// @match				https://rbt.asia/*
// @match				http://archive.thedarkcave.org/*
// @match				http://suptg.thisisnotatrueending.com/archive/*
// @match				http://www.ptchan.net/*
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
			url:			'https://www.youtube-nocookie.com/v/$1&ap=%2526fmt%3D22&start=$2',
			width:			'640px',
			height:			'390px',
			brBefore:		true,
			brAfter:		true
		}
	};
	settings.embed.code = (settings.embed.brBefore ? '<br />' : '') + '<object type="application/x-shockwave-flash" style="width: ' + settings.embed.width + '; height: ' + settings.embed.height + '" data="VIDEOURL?fs=1" /><param name="allowFullScreen" value="true" /><param name="movie" value="VIDEOURL" /><param name="wmode" value="transparent" /></object>' + (settings.embed.brAfter ? '<br />' : '');
	
	re.plaintext		= /(?:<br>|)(?:https?:\/\/|www.)*(?:youtube.com\/watch\?[^>]*v=|youtu.be\/)([\w_-]{11})(?:(?:#|\?|&amp;)a?t=([ms\d]+)|[^<> ])*(?:<br>|)/gi
	re.linked			= /<a[^>]+(?:youtube.com\/watch\?[^>]*v=|youtu.be\/)([\w_-]{11})(?:(?:#|\?|&amp;)a?t=([ms\d]+)|[^"])*.*?<\/a>/gi
	
	sites.plaintextBQ	= [/(?:2chan\.net|boards\.4chan\.org|chanarchive\.org|krautchan\.net|suptg\.thisisnotatrueending\.com)/, 'tag', 'blockquote', re.plaintext];
	sites.linkedBQ		= [/(?:4chan\.org|ptchan\.net|archive\.installgentoo\.net|boards\.420chan\.org|fuuka\.warosu\.org|operatorchan\.org|rbt\.asia|archive\.nyafuu\.org|archive\.heinessen\.com)/, 'tag', 'blockquote', re.linked];
	sites.linkedBody	= [/(?:4chon\.net)/, 'class', 'body', re.linked];
	sites.linkedMessage	= [/(?:7chan\.org)/, 'class', 'message', re.linked];
	sites.linkedText	= [/(?:(?:archive|nsfw)\.foolz\.us|archive\.thedarkcave\.org)/, 'class', 'text', re.linked];

	for (i in sites) { if (sites.hasOwnProperty(i)) { if (sites[i][0].exec(document.domain)) { siteArray = sites[i]; break; } } }
	function unixtime() { return parseInt(new Date().getTime() / 1000, 10); }

	function startTime(url) {
		var j, k, output, startString, s = url.split('&start=');
		for (j = 1; j < s.length; j  += 1) { if (s[j]) { startString = s[j]; } }
		if (startString) {
			if (startString > 0) {
				output = startString;
			} else {
				output = 0;
				k = startString.match(/(\d+)h/);
				if (k) { output += k[1] * 3600; }
				k = startString.match(/(\d+)m/);
				if (k) { output += k[1] * 60; }
				k = startString.match(/(\d+)s/);
				if (k) { output += parseInt(k[1], 10); }
			}
			return s[0] + '&start=' + output.toString();
		}
		return s[0];
	}

	function embedPost(match) {
		var embedURL;
		embedTotal += 1;
		embedCur += 1;
		embedURL = match.replace(siteArray[3], settings.embed.url);
		if ((embedArray.indexOf(embedURL) > -1) && (settings.filter.ignoreDupes)) { return ''; }
		if (((settings.filter.limitPer < 0) || (embedCur <= settings.filter.limitPer)) && ((settings.filter.limitTotal < 0) || (embedTotal <= settings.filter.limitTotal))) {
			embedArray.push(embedURL);
			return settings.embed.code.replace(/VIDEOURL/g, startTime(embedURL));
		}
		return match;
	}

	function embed() {
		var l, posts, temp;
		if (siteArray[1] == 'tag') {
			posts = document.getElementsByTagName(siteArray[2]);
		} else {
			posts = document.getElementsByClassName(siteArray[2]);
		}
		for (l = 0; l < posts.length; l += 1) {
			embedCur = 0;
			embedArray.length = 0;
		
			temp = posts[l].innerHTML.replace(/<wbr>/g,'').replace(siteArray[3], embedPost);
			if (temp !== posts[l].innerHTML.replace(/<wbr>/g,'')) { posts[l].innerHTML = temp; }
		}
		timeLastRun = unixtime();
	}
	function nodeInsertedHandler(event) {
		timeCheck = unixtime() - 10;
		if ((event.target.nodeName === "DIV") && (timeCheck >= timeLastRun)) { embed(); }
	}
	embed();
	document.addEventListener('DOMNodeInserted', nodeInsertedHandler, true);
}());