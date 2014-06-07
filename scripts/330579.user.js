// ==UserScript==
// @name YouTube Stretch
// @description This extension allows you to stretch YouTube videos to in-browser full screen conveniently.
// @namespace http://googlesystem.blogspot.com
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @run-at document-end
// @author Krzysztof Kowalski
// @version 0.3
// @date 2014-02-10
// @license MIT License
// ==/UserScript==

(function () {    
      
  start();
    
function start() {
  var pagecontainer=document.getElementById('page-container');
  if (!pagecontainer) return;
  if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();     
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI
      var mo=window.MutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].id=='watch7-container') { // old value: movie_player
                      run();
                      break;
                    }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
      } else { // MutationObserver fallback for old browsers
        pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
      }
  } 
}

function onNodeInserted(e) { 
    if (e && e.target && e.target.id=='watch7-container') { // old value: movie_player
      run();
  }
}

function quality(desc, link) {
	var bid = "Btn_" + Math.floor(Math.random()*1234567890);
	return '<a href='+link+'><button id="'+bid+'" class="yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text" style="margin-top:4px; margin-left:5px;" data-tooltip-text="'+desc+'" type="button" role="button" title="'+desc+'"><span><span class="yt-uix-button-content">'+desc+'</span></span></button></a>'
}
 
function run() {
  var ax = document.getElementById("watch7-action-buttons")  
  var dx = document.createElement("span")
  var hx = ax.appendChild(dx)  
  var wind = window.location.href
  var base = wind.replace(/.*\?/, "http://youtube.googleapis.com/v/?") + "&autoplay=1&autohide=1"  
  var popup = wind.replace(/.*\?/, "http://youtube.com/watch_popup?") + "&hd=1&autoplay=1"
  var videoid = wind.replace(/.*\?v=/, "").replace(/&.*/i, "")
  var image = "http://img.youtube.com/vi/" + videoid + "/0.jpg"  
  
  dx.innerHTML =  quality("1080p", base + "&vq=hd1080&hd=1") +  quality("720p", base + "&vq=hd720&hd=1") +
  quality("480p", base + "&vq=480p&hd=1") +  quality("Popup", popup) + quality("Image", image)
  }
 
})();