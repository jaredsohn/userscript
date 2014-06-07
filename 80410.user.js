// ==UserScript==
// @name          lastfm-vk-audiosearch
// @description   Replace all music-search links in vk.com by links to perfomancer/song page on last.fm
// @namespace     http://userscripts.org/users/simplesmiler
// @include       http://vk.com/*
// @match			    http://vk.com/*
// @include       http://*.vk.com/*
// @match			    http://*.vk.com/*
// @include       http://vkontakte.ru/*
// @match			    http://vkontakte.ru/*
// @include			  http://*.vkontakte.ru/*
// @match			    http://*.vkontakte.ru/*
// @version			  0.1.2
// ==/UserScript==

(function(){
  "use strict";

  var getByTag = function (tagname, node) { return (node || document).getElementsByTagName(tagname); };
  var getByClass = function (classname, node) { return (node || document).getElementsByClassName(classname); };
  var getById = function (id, node) { return (node || document).getElementById(id); };

  var audioWall = Array.prototype.slice.call(getByClass("audio"));
  var audio = Array.prototype.slice.call(getByClass("audioTitle"));
  var allAudio = Array.prototype.concat.call(audio, audioWall);
    
  for (var i in allAudio) {
    var artistlink = getByTag("a", allAudio[i]) [0];
    var titlespan = getByTag("span", allAudio[i])[1] || getByTag("span", allAudio[i])[0];
    
    var titlelink;
    if (getByTag("a", titlespan).length === 0) {
      titlelink = document.createElement("a");
      titlelink.innerHTML = titlespan.innerHTML;
      titlespan.innerHTML = "";
      titlespan.appendChild(titlelink);
    } else {
      titlelink = getByTag("a", titlespan)[0];
    }
    
    var artist = artistlink.innerHTML;
    var title = titlelink.innerHTML;
    
    artistlink.href = "http://last.fm/search?q=" + encodeURIComponent(artist);
    titlelink.href = "http://last.fm/search?q=" + encodeURIComponent(artist + " - " + title);
  }
  
})();
