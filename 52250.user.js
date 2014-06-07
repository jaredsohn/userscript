// ==UserScript==
// @name           Youtube Video Direct Download
// @namespace      Shaswat
// @description    Youtube Videos Can Be Downloaded Without Connecting To Any Other Site
// @include        http://*youtube.com/watch?*
// ==/UserScript==
var wind = unsafeWindow.swfArgs;
var t = wind['t'];
var vid_id = wind['video_id'];
var url = 'http://www.youtube.com/get_video?fmt=18&video_id='+vid_id+'&amp;t='+t
var par = document.getElementById('watch-embed-div');
var link = document.createElement('div');
link.innerHTML = '<br /> <a href='+url+'>Download High Quality Video</a>';
par.appendChild (link);
