// Google Video Description Grabber
// Created on: 2007-Aug-02 @ 5:17:10 PM
//     Copyright (C) 2007, Kevin T. Ryan
// 
//     This program is free software; you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation; either version 2 of the License, or
//     (at your option) any later version.
// 
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Video Description Grabber", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Video Description Grabber
// @namespace     http://www.portss.com
// @description   Grabs the description for the video and displays it on the search results page.
// @include       http://video.google.com/videosearch?q=*
// ==/UserScript==

String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

get_position = function (e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX + 
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + 
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

filter = function (lst, fn) {
    var l = [];
    for (var i=0; i < lst.length; i++) {
        if (fn(lst[i]))
            l.push(lst[i]);
    } return l;
}

videos = function () {
    var search_results = document.getElementById("resultsdiv"); 
    var links = filter(search_results.getElementsByTagName("div"), function (e) { return e.className == "Title"; })
    var video_urls = [];
    for (var i=0; i < links.length; i++) {
        var re  = /.*docid=([^&]*)/;
        var google_url = links[i].getElementsByTagName("a")[0];
        var mat = google_url.href.match(re);
        if (mat) {
            var video_url = "http://video.google.com/videohosted?docid=" + mat[1];
            video_urls.push(video_url);
            try { add_description_listener(google_url, video_url); } catch (e) { /* pass */ }
        }
    }
    return video_urls;
}

add_description_listener = function (google_url, video_url) {
    // This doesn't work!
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.status == 200 && req.readyState == 4) {
            var descr = req.responseText;
            var re = /<div\s+id="description">((.|\n|\r)+?)<\/div>/;
            var match = descr.match(re);
            if (match) {
                match = match[1]; //.replace(/<\/?(.|\r|\n)+?>/g, '').trim();
                google_url.description = match;
                google_url.addEventListener("mouseover", function (e) {
                    show_description_div(match, get_position(e));
                }, true);
                google_url.addEventListener("mousemove", function (e) {
                    show_description_div(match, get_position(e));
                }, true);
                google_url.addEventListener("mouseout", remove_description_div, true);
            }
        }
    };
    req.open("GET", video_url, true);
    req.send("");
}

init = function () {
    var b = document.getElementsByTagName("body")[0];
    div = document.createElement("div");
    div.id = "video_description_for_url";
    div.style.position = "absolute";
    div.style.backgroundColor = "#FFF";
    div.style.fontSize = "0.9em";
    div.style.width = "600px";
    div.style.borderWidth = "1px";
    div.style.borderStyle = "solid";
    div.style.borderColor = "#000";
    div.style.padding = "1em";
    b.appendChild(div);
    return div;
}

move_position = function (div, pos) {
    if (div.style.display == "none")
        return true;
    if (Math.abs(parseInt(div.style.top) - pos.y) >= 10)
        return true;
    if (Math.abs(parseInt(div.style.left) - pos.x) >= 10)
        return true;
    return false;
}

show_description_div = function (text, pos) {
    var div = document.getElementById("video_description_for_url");
    if (!div) { div = init(); }
    if (!move_position(div, pos)) { return; } // too small of a mvmt
    div.innerHTML = text;
    div.style.top = pos.y + 10;
    div.style.left = pos.x + 10;
    div.style.display = "inline";
}

remove_description_div = function () {
    document.getElementById("video_description_for_url").style.display = "none";
}

window.addEventListener("load", videos, true);
