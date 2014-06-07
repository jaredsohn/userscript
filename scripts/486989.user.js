// ==UserScript==
// @name        osu! Download from mirror
// @namespace   http://www.icycat.com
// @description Download beatbaps from mirror site
// @include     *osu.ppy.sh/b*
// @include     *osu.ppy.sh/s*
// @updateURL   https://greasyfork.org/scripts/796-osu-download-from-mirror/code/osu!%20Download%20from%20mirror.meta.js
// @downloadURL https://greasyfork.org/scripts/796-osu-download-from-mirror/code/osu!%20Download%20from%20mirror.user.js
// @version     1.3
// @grant       none
// ==/UserScript==

var mirrorDown = '<div id="mirroDown" style="float:right;width:100px;"><button id="mirrorLoli" style="background-color:#78AB23;border:1px solid;border-radius:5px;color:#FFFFFF;cursor:pointer;font-size:1.5em;font-weight:bold;height:64px;margin:2px 1px 0 5px;width:100px;">Download from loli.al</button><button id="mirrorBloodcat" style="background-color:#78AB23;border:1px solid;border-radius:5px;color:#FFFFFF;cursor:pointer;font-size:1.5em;font-weight:bold;height:64px;margin:4px 1px 0 5px;width:100px;">Download from bloodcat</button></div>';

$('.beatmapDownloadButton:first').before(mirrorDown);

$('#mirrorLoli').click(function(){
    location.href = 'http://loli.al'+location.pathname;
})

$('#mirrorBloodcat').click(function(){
    location.href = 'https://bloodcat.com/osu'+$('.beatmapDownloadButton:last a').attr('href').replace('d','m');
})