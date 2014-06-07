// ==UserScript==
// @name           Отключение inline видео + autowidth
// @namespace      http://unrar.me/gmns
// @description
// @include        http://vkontakte.ru/*
// @include        http://*.vkontakte.ru/*
// @include        http://*.vk.com/*
// @include        http://vk.com/*
// ==/UserScript==

(function() {

console.log(2);

scriptCode = "wall.scrollCheck = function(){}; function showInlineVideo(videoId, listId, options, ev, u) {  if (checkEvent(ev)) return true;  if (window.mvcur && mvcur.mvShown && mvcur.minimized && mvcur.videoRaw == videoId) {    videoview.unminimize();    return false;  }  var claim = nav.objLoc.claim;  var stat = ['videoview.js', 'videoview.css'];  var hub = new callHub(function() {    revertLastInlineVideo();    videoview.showVideo.apply(videoview, hub.data);  }, 2);  if (!options) {    options = {};  }  stManager.add(stat, function() {    videoview.show(ev, videoId, listId, options);    hub.done();  });  extend(options, {onDone: function() {    hub.data = arguments;    hub.done();  }, cache: (listId != 'status')});  if (!options.params) {    options.params = {act: 'show', video: videoId, list: listId, autoplay: (options.autoplay) ? 1 : 0,a: options.a};  }  if (claim) {    options.params.claim = claim;  }  ajax.post('al_video.php', options.params, options);  return false;}";


var script = document.createElement('script');
script.innerHTML = scriptCode;
document.getElementsByTagName('head')[0].appendChild(script);

console.log(3);

})();