// ==UserScript==
// @name           MediaSite MMS Link
// @namespace      http://www.simply-life.net
// @version        1.0.0
// @author         Wouter Haffmans
// @description    Shows MMS link for MediaSite viewer pages, so you can stream the video through your own player. You need to set your includes manually!
// @include        http://example.com/mediasite/Viewer/*
// ==/UserScript==

// -----------------------------------------------------------------------------
// Instructions:
// Install script, and apply it to the "http://example.com/mediasite/Viewer/*"
// (notice the capital V in Viewer). Replace "example.com/mediasite/" with the
// base location of the MediaSite installation.
// -----------------------------------------------------------------------------

// Viewer needs to load, so delay a bit
var info_block = document.getElementById('PresentationCardAreaInnerPadding');
var Manifest = unsafeWindow.Manifest;

// We need the block and Media URL, or we can't continue
if (typeof(info_block) == 'undefined' || typeof(Manifest) == 'undefined' || typeof(Manifest.VideoUrl) == 'undefined') {
	return;
}

// Create and add link
var video_link_block = document.createElement('div');
video_link_block.setAttribute('id', 'PresentationCardAreaVideoLink');
video_link_block.setAttribute('class', 'cardItem');

// Label/wrapper with descriptive text
var video_label = document.createElement('span');
video_label.setAttribute('class', 'cardData');
var video_label_text = document.createTextNode('Video link: ');
video_label.appendChild(video_label_text);

// The actual link
var video_link = document.createElement('a');
video_link.setAttribute('href', Manifest.VideoUrl);
video_link.textContent = Manifest.VideoUrl;
video_label.appendChild(video_link);

// Add label and block
video_link_block.appendChild(video_label);
info_block.appendChild(video_link_block);
