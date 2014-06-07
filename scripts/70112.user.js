// ==UserScript==
// @name           MovieFap
// @namespace      *
// @description    Adds a download link for MovieFap's videos
// @include        http://www.moviefap.com/videos/*
// ==/UserScript==

// get the embed containing the video
var Video = document.evaluate('//div[contains(@id, "movie")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

// extract the link to the video file
var VideoLink = Video.innerHTML.match(/file=(http:\/\/[^\&]+)/)[1];

// get the name of the video
var VideoName = document.evaluate('//div[contains(@id, "view_title")]/h1', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

// transform the videoname element to a link pointing to the direct video
var DownloadLink = document.createElement("A");
DownloadLink.appendChild(document.createElement("H1"));
DownloadLink.href = VideoLink;
DownloadLink.setAttribute("name", VideoName.innerHTML);
DownloadLink.childNodes[0].innerHTML = VideoName.innerHTML;
VideoName.parentNode.replaceChild(DownloadLink, VideoName);
