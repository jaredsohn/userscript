// ==UserScript==
// @name           nicovideo Add Thumbnail
// @id             nicovideo-add-thumbnail@mfp.xrea.jp
// @namespace      http://mfp.xrea.jp/
// @author         gifnksm <makoto.nksm@gmail.com>
// @version        1.0.0
// @description    Add Thumbnail at nicovideo's watch page.
// @website        http://d.hatena.ne.jp/gifnksm
// @include        http://www.nicovideo.jp/watch/*
// @updateURL      https://userscripts.org/scripts/source/25003.user.js
// @jsversion      1.8
// @noframes
// ==/UserScript==

"use strict";

const id = "GM_nicovideo_add_thumbnail";

let image = document.createElement('img');
image.src = unsafeWindow.Video.thumbnail;

let container = document.createElement('div');
container.id = id;
container.appendChild(image);

GM_addStyle("\
  div#GM_nicovideo_add_thumbnail { \
    width: 65px;\
    height: 50px;\
    margin-right: 3px;\
    float: left;\
    position: relative;\
    z-index: 20;\
  }\
  div#GM_nicovideo_add_thumbnail > img {\
    width: 65px;\
    height: 50px;\
    position: relative;\
  }\
  div#GM_nicovideo_add_thumbnail > img:hover {\
    width: 130px;\
    height: 100px;\
  }\
");

let parent = document.getElementById('video_title').parentNode;
parent.insertBefore(container, parent.firstChild);
