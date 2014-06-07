// ==UserScript==
// @name        Youtube thumbnail download overlay
// @namespace   http://userscripts.org/users/519557
// @description Adds a download menu to youtube thumbnails, shown on mouseover.
// @match       *://*.youtube.com/*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @version     1.0.4
// ==/UserScript==

// this script is based on "Download YouTube Videos" by panzi
// http://userscripts.org/scripts/show/98782

"use strict";

//menu style
//style mercilessly stolen from the original userscript (because it looks nice)
GM_addStyle('.monkey-thumb-download-menu {opacity:0; position:absolute; z-index:2; background-color:white; font-size:12px}' +
    '.monkey-thumb-download-menu div { margin-right:10px; display:inline-block; vertical-align:top; }' +
    '.monkey-thumb-download-menu ul { text-align:right; }' +
    '.monkey-thumb-download-menu:hover {opacity:1;}'); //show on mouseover

var mylog = function () {
    return;
};
//uncomment for debugging
//mylog = console.log;

//utility stolen from the original userscript
//parse a uri-like parameter string to extract key=value pairs and valueless keys
//for our purposes could be replaced by regexps
//but this approach is more general and easy enough to understand
function parseVars(vars) {
    mylog("parseVars: start");
    vars = vars.split("&");
    var map = {}, i, v, j, key, value, old;
    for (i = 0; i < vars.length; i += 1) {
        v = vars[i];
        j = v.search("=");
        if (j < 0) {
            j = v.length;
        }
        key = decodeURIComponent(v.slice(0, j)).replace(/\+/g, ' ');
        value = decodeURIComponent(v.slice(j + 1).replace(/\+/g, ' ') || "");

        if (map.hasOwnProperty(key)) {
            mylog('parseVars: multikey: ', key);
            old = map[key];
            if (typeof old === "string") {
                map[key] = [old, value];
            } else {
                old.push(value);
            }
        } else {
            map[key] = value;
        }
    }
//    mylog("parseVars: done: ", map);
    mylog("parseVars: done");
    return map;
}

//youtube video: has the name and other metadata, contains several streams
function Video(infoText) {
    mylog("Video: start");
    this.config = parseVars(infoText);
    this.initFileName();
    this.initItagMap();
    this.initStreams();
    mylog("Video: end");
}

//video stream: the real data, has physical size, url and encoding
function VideoStream(video, infoText) {
    mylog("VideoStream: start");
    this.fileName = video.fileName;
    this.config = parseVars(infoText);
    this.extension = this.config.type.split(';')[0].split('/')[1].replace(/^x-/, '');
    mylog("VideoStream: extension:", this.extension);
    this.size = video.itagToSizeMap[this.config.itag] || {height: 0, witdth: 0};
    mylog("VideoStream: size:", this.size);

    this.url = this.config.url + "&title=" + encodeURIComponent(this.fileName);
    if (this.config.sig) {
        this.url += "&signature=" + this.config.sig;
    }
    mylog("VideoStream: url:", this.url);
    mylog("VideoStream: done");
}

//for a given video ID make a http request to get the info (including streams)
function requestInfo(vid, handler) {
    mylog("requestInfo: ", vid);
    var url = "https://www.youtube.com/get_video_info/?video_id=" + vid;
    mylog("requestInfo:", url);
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: handler
    });
    mylog("requestInfo: done");
}

//parse fmt_list to get mapping from itag to pixel count
Video.prototype.initItagMap = function () {
    mylog("initItagMap: start");
    var fmt_list, i, v, size;
    fmt_list = this.config.fmt_list ? this.config.fmt_list.split(',') : [];
    this.itagToSizeMap = {};
    for (i = 0; i < fmt_list.length; i += 1) {
        v = fmt_list[i].split('/');
        size = v[1].split('x');
        this.itagToSizeMap[v[0]] = {
            width: parseInt(size[0], 10),
            height: parseInt(size[1], 10)
        };
    }
    mylog("initItagMap: ", this.itagToSizeMap);
};

//for sorting streams by size
function compareVideoHeights(a, b) {
    return a.size.height - b.size.height;
}

//Create all the video streams and populate structures:
//this.exts = [extension list sorted lexicographically]
//this.lists = {extension: [stream list sorted by size]} 
Video.prototype.initStreams = function () {
    mylog("initStreams: start");
    var fmt_stream_map, i, e, videos = [];
    fmt_stream_map = this.config.url_encoded_fmt_stream_map.split(',');
    this.lists = {};
    this.exts = [];
    for (i = 0; i < fmt_stream_map.length; i += 1) {
        videos.push(new VideoStream(this, fmt_stream_map[i]));
        e = videos[i].extension;
        if (this.exts.indexOf(e) < 0) {
            this.exts.push(e);
            this.lists[e] = [];
        }
    }
    for (i = 0; i < videos.length; i += 1) {
        this.lists[videos[i].extension].push(videos[i]);
    }
    this.exts.sort();
    for (i = 0; i < this.exts.length; i += 1) {
        this.lists[this.exts[i]].sort(compareVideoHeights);
    }
    mylog("initStreams: ", this.lists.toString());
};

//create neat informative file name from video parameters
Video.prototype.initFileName = function () {
    mylog("initFileName: start");
    var f = (this.config.title + (this.config.author ? " by " + this.config.author : ""));
    f = f.replace(/["\?]/g, ''); //remove " and ?
    f = f.replace(/[:;<>\*\|\/\\]/g, ' '); //remove :;<>*|/\ 
    f = f.replace(/\s\s+/g, ' '); //many spaces into one
    f = f.replace(/^\s+/, ''); //strip leading spaces
    f = f.replace(/\s+$/, ''); //strip trailing spaces
    mylog("initFileName: ", f);
    this.fileName = f;
};

//create download hyperlink
VideoStream.prototype.getLink = function () {
    var a;
    a = document.createElement('a');
    a.href = this.url;
    a.setAttribute("download", this.fileName + "." + this.extension);
    a.appendChild(document.createTextNode(this.size.height + 'p'));
    return a;
};

//create one menu item anchor
Video.prototype.createMenuColumn = function createMenuColumn(exp) {
    var column, title, list, i, video, item;
    title = document.createElement('strong');
    title.appendChild(document.createTextNode(exp));

    list = document.createElement('ul');
    for (i = 0; i < this.lists[exp].length; i += 1) {
        video = this.lists[exp][i];
        item = document.createElement('li');
        item.appendChild(video.getLink());
        list.appendChild(item);
    }

    column = document.createElement('div');
    column.appendChild(title);
    column.appendChild(list);
    return column;
};

//create the menu itself
//mostly unchanged from the original userscript
//because the menu is neat-looking
Video.prototype.createMenu = function () {
    mylog("createMenu: start");
    var menu, i;
    menu = document.createElement('div');
    for (i = 0; i < this.exts.length; i += 1) {
        menu.appendChild(this.createMenuColumn(this.exts[i]));
    }
    menu.className = "monkey-thumb-download-menu";
    mylog("createMenu: done");
    return menu;
};

//main function that processes each the thumbnail and adds the menu
function prepareOverlay(event) {
    var item, vid;
    item = event.currentTarget;
    mylog("prepareOverlay: ", item.className);
    item.removeEventListener('mouseover', prepareOverlay, false);
    vid = item.getAttribute("href").split("=")[1];
    function infoHandler(response) {
        var info, video;
        mylog("infoHandler: start");
        info = response.responseText;
        video = new Video(info);
        item.parentNode.insertBefore(video.createMenu(), item);
        mylog("infoHandler: done");
    }
    requestInfo(vid, infoHandler);
    mylog("prepareOverlay: done");
}

//Hack to listen for additional nodes inserted 
//(for example when scrolling down subscriptions list)
//http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/
document.addEventListener('animationstart', function (event) {
    if (event.animationName === 'ThumbnailNodeInserted') {
        mylog('ThumbnailNodeInserted: ', event.target.className);
        event.target.addEventListener('mouseover', prepareOverlay, false);
    }
}, false);
GM_addStyle('@keyframes ThumbnailNodeInserted {' +
    'from { clip: rect(1px, auto, auto, auto); }' +
    'to { clip: rect(0px, auto, auto, auto); }   }' +
    'a.ux-thumb-wrap { animation-duration: 0.001s; animation-name: ThumbnailNodeInserted; }');