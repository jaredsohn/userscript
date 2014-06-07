// ==UserScript==
// @name        Danbooru Batch Downloader
// @version     1
// @namespace   http://arantius.com/misc/greasemonkey/
// @description Download multiple images from danbooru at the same time.
// @include     http://danbooru.donmai.us/post/show/*
// ==/UserScript==

// - This script is not mine source is here http://snipt.org/Hgmm
// - You need the DownThemAll plugin for firefox to actually download the files
//   (or whatever downloader you have that can download all links from a page)
// - Just copy/paste the following code on the page you want to download images from
// - Change the [sample_url] to [file_url] if you want the original image (full size)
 
// Try it on this one: http://danbooru.donmai.us/post/index?tags=kantoku&limit=100
 
javascript:
 
var images = document.body.innerHTML.match(/"sample_url":".*\.jpg",/g);

var links = window.open("");
var links_html = "";
var n = images.length;
 
for(var i = 0; i < n; i++) {
    var imgsrc = images[i].match(/http:\/\/.*\.jpg/);
    links_html += "<a href=" + imgsrc + ">" + imgsrc + "<a><br />";
}
 
links.document.write(links_html); // NULLTERM [\0]

