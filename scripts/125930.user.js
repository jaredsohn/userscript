// ==UserScript==
// @name       Tweakers.net HTML5 video
// @namespace  Air2
// @version    0.4
// @description  Replaces all (flash) videos on Tweakers.net with HTML5 videos.
// include    http://tweakers.net/*
// @match    http://tweakers.net/*
// @match    http://*.tweakers.net/*
// @run-at  document-start
// @run_at  document-start
// @copyright  2012, Air2
// ==/UserScript==

var tags = document.getElementsByTagName('div');
for(var i=0;i<tags.length;i++) {
    var clas = tags[i].getAttribute('class');
    if (!clas) {continue; }
    if (clas.substr(0,10) !== 'flashmovie') { continue; }
    tags[i].setAttribute('class', 'abr');
    tags[i].setAttribute('id', 'abr_' + i);
}