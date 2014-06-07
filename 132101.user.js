// ==UserScript==
// @name BeoWorld archives
// @description Fixes image and thread links in BeoWorld archived forum
// @include http://archivedforum.beoworld.org/forums/*
// @version 1.0.11
// @icon http://forum.beoworld.org/favicon.ico
// @namespace tournedos@beoworld
// @updateURL about:blank
// ==/UserScript==

var fixed_images = 0;
var fixed_links = 0;
var x;

// Find all inline image urls
var images = document.getElementsByTagName("img");
for(x = 0; x < images.length; x++) {
    // If it contains 'Components.UserFiles' and still points to the
    // forum... url, we need to fix it
    if (images[x].src.search(/http:\/\/forum.*Components\.UserFiles/) != -1) {
	newsrc = images[x].src.replace(/http:\/\/forum/i, 'http://archivedforum');
	// Spaces in filenames need to be fixed as well
	newsrc = newsrc.replace(/\+/g, "%20");
	// I have no idea what the deal with these is, but this seems
	// to work
	newsrc = newsrc.replace("cfs-file.ashx", "cfs-filesystemfile.ashx");
	// Replace original image source
	images[x].src = newsrc;
	fixed_images++;
    }
 }

// Do the same for links to other threads in the forum
var links = document.getElementsByTagName("a");
for(x = 0; x < links.length; x++) {
    if (links[x].href.search(/http:\/\/forum\.beoworld\.org\/forums/i) != -1) {
	links[x].href = links[x].href.replace(/forum/i, 'archivedforum');
	fixed_links++;
    }
 }

// Update the window title to show how many items were fixed
if (fixed_images || fixed_links) {
    var s = '';
    if (fixed_images) s = fixed_images + ' images';
    if (fixed_links) {
	if (fixed_images) s += ' and ';
	s += fixed_links + ' links';
    }
    document.title += ' (' + s + ' fixed)';
 }
