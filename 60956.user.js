// ==UserScript==
// @name           Yet Another Jamendo OGG Download
// @namespace      http://www.jamendo.com/
// @description    Adds the ability to directly download an album in OGG Vorbis format.
// @include        http://www.jamendo.com/*/list/*
// ==/UserScript==

// Made by unmacaque@gmail.com on Oct 31, 2009

// the element to append the new link to
var albumId = document.getElementById('hiddenjoinid').value.slice(1);
var dlElem = document.getElementById('item-header-actions');

var anchor = dlElem.appendChild(document.createElement('a'));
anchor.appendChild(document.createTextNode("Download as OGG"));
anchor.href = 'http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/' + albumId + '/?are=ogg3';