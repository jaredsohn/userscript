// ==UserScript==
// @name       Tassie Bronies Video Cover
// @namespace  http://refractwebdesign.com/
// @version    0.1
// @description  enter something useful
// @include https://www.facebook.com/groups/228718770561397/*
// @copyright  2012+, John
// ==/UserScript==


var cover
var video = document.createElement("div");

video.innerHTML = '<iframe width="100%" height="315" src="http://www.youtube.com/embed/G39GSXsBTmU" frameborder="0" allowfullscreen></iframe>';
cover = document.getElementById('headerArea');


if (cover) {
    cover.parentNode.replaceChild(video, cover);
}