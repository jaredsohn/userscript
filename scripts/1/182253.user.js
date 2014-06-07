// ==UserScript==
// @name        Facebook Video Downloader
// @description Add download links to Facebook video pages
// @author      Armin Wolfermann
// @version     1.0
// @include     http://facebook.com/photo.php*
// @include     http://*.facebook.com/photo.php*
// @include     https://facebook.com/photo.php*
// @include     https://*.facebook.com/photo.php*
// @include     http://facebook.com/video/*
// @include     http://*.facebook.com/video/*
// @include     https://facebook.com/video/*
// @include     https://*.facebook.com/video/*
// ==/UserScript==
//
// Copyright (c) 2013 Armin Wolfermann
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

function addVideoLink(linktext, url) {
    var actions = document.getElementById('fbPhotoPageActions');
    var item = document.createElement('a');
    item.setAttribute('class', 'fbPhotosPhotoActionsItem');
    item.setAttribute('href', unescape(url));
    item.setAttribute('target', '_blank');
    item.setAttribute('title', 'Right click and save as...');
    item.innerHTML = linktext;
    actions.appendChild(item);
}

function getVideoURL(content, key) {
    var start = content.indexOf('http', key);
    var end = content.indexOf('\\u002522', start);
    var rawurl = content.substring(start, end);
    return rawurl.replace(/\\u([\d\w]{4})/gi,
        function(match, group) {
            return String.fromCharCode(parseInt(group, 16));
        }
    );
}

function parseVideoPage() {
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++) {
        var key, html = scripts[i].innerHTML;
        if (html.indexOf("new SWFObject") != -1) {
            if ((key = html.indexOf('hd_src')) != -1)
                addVideoLink('Download HD Video', getVideoURL(html, key));
            if ((key = html.indexOf('sd_src')) != -1)
                addVideoLink('Download SD Video', getVideoURL(html, key));
            break;
        }
    }
}

window.setTimeout(parseVideoPage, 2000);

