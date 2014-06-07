// ==UserScript==
// @name           youtube popout link
// @namespace      http://*.youtube.com/*
// @include        http://*.youtube.com/*
// @include        http://*.youtube.com
// @include        http://youtube.com
// @include        http://youtube.com/*
// ==/UserScript==


(function () {

   var player =  document.getElementById('watch-player-div');
   if (!player) return;
   
   var id = player.innerHTML.replace(/^.*?video_id=(.*?)&.*$/,'$1');
   if (!id) return;
   
   var button = document.createElement("a");
   button.innerHTML = '<img src="http://www.google.com/reader/ui/2317887107-module-new-window-icon.gif" /> popout';
   button.href = "javascript:window.open('http://youtube.com/swf/l.swf?video_id="+id+"', 'youtube', 'menubar=0,resizable=1,width=480,height=385,scrollbars=0'); void(null);"
   player.parentNode.insertBefore(button,player.nextSibling)

})();