// ==UserScript==
// @name          stubru
// @namespace     http://users.pandora.be/divvy/userscript
// @description	  Provide MP3 download next to streaming link. (Updated by Bert D (http://www.feitslashmening.be) to comply with new download server and Tim Mussche (tmussche@gmail.com) to comply with new link structure)
// @include       http://*stu*bru*.be/*
// @include       http://*radio1.be/*
// @include       http://*radio2.be/*
// @include       http://*klara.be/*
// @include       http://*donna.be/*
// @include       http://*rvi.be/*
// ==/UserScript==

// file: 	stubru.user.js
// date: 	za jul 16 21:41:00 CEST 2005
// author:	divvy - dyveshinftra@gmail.com (updated by bert.dobbelaere@gmail.com and tmussche@gmail.com)
// license:	This file is in the public domain and comes with no warranty.
// history:	0.1	July, 2005	use MP3
//		0.2	July, 2005	Use link iso inline replace and
//					support other radio stations.
//		0.2.1	January, 2006	Compliance with new download server.
//		0.2.2  December, 2006	Compliance with new link structure.
// version:	$Id: stubru.user.js,v 1.4 2006/12/08 19:57:16 divvy Exp $

// As suggested by Tim Mussche.

for (var i = 0; i < document.links.length; ++i) {
	var link = document.links[i];

	// Skip this link if it is not a streaming link.  Otherwise set the
	// name of the radio program.
	var result;
	var program;
	result = link.href.match('qsbrand=([^&]+).*ondemand/([^/]+)');
	if (result)
		program = result[2];
	else {
		result = link.href.match('qsbrand=([^&]+).*qsODI=([^\']+)');
		if (result)
			program = result[1] + '_' + result[1] + result[2];
		else {
			result = link.href.match('qsbrand=([^&]+).*programma_od/([^\.]+)');
			if (result)
				program = result[2];
			else
				continue;
		}
	}
	program += '-hi.mp3';

	// Recognise the radio station.
	var radiostation;
	if (result[1] < 20)
		radiostation = 'radio1';
	else if (result[1] < 30)
		radiostation = 'radio2';
	else if (result[1] < 40)
		radiostation = 'klara';
	else if (result[1] < 50)
		radiostation = 'stubru';
	else if (result[1] < 60)
		radiostation = 'donna';
	else if (result[1] < 70)
		radiostation = 'rvi';
	else {
		GM_log(result[1] + ': unknown radiostation');
		crashscripttoavoidfurtherdamage();
	}

	// Create MP3 link.
	var mp3 = document.createElement('A');
	mp3.setAttribute('href', 'http://download.streampower.be/vrt/'
		+ radiostation + '/' + program);
	mp3.appendChild(document.createTextNode('(MP3)'));

	// The MP3 link as no class yet.  The class dictates the look
	// of the text.  Search all siblings, below, and copy first
	// class found.
	var mp3classless = 1;

	// Put MP3 link after streaming link.
	link.parentNode.appendChild(document.createTextNode(' '));
	link.parentNode.appendChild(mp3);

	// Skip all siblings of these links and copy class to new link.
	var nlinks = -1;
	for (; link; link = link.nextSibling) {
		if (link.nodeName != 'A')
			// skip non-link siblings
			continue;

		++nlinks;
		if (mp3classless && link.getAttribute('class')) {
			// Copy first class to the new MP3 link.
			mp3classless = 0;
			mp3.setAttribute('class', link.getAttribute('class'));
		}
	}
	i += nlinks;
}

