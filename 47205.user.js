// ==UserScript==
// @name           GT prevent autoplay
// @namespace      http://bakterion.com/
// @description    prevents autoplay for GameTrailers.com flash player
// @include        http://gametrailers.com/*
// @include        http://*.gametrailers.com/*
// @version        3.1
// ==/UserScript==

// Author: bgr


/* Changelog
3.1 - prevent autoplay on 'review' video pages
3.0 - made working after june 2012 site update
2.1 - allow script functionality only on certain types of pages (fixes a problem with GT.TV episode pages)
2.0 - rewritten to work with new GameTrailers video player
1.0 - initial version
*/

function doIt() {
  var injectionCode = function() {
    var pl = MTVNPlayer.getPlayers()[0];
    if(!pl) {
      console.error("GT Prevent Autoplay Extension: PLAYER NOT FOUND");
      return;
    }
    
    var pauseOnce = function(e) {
      if(e.data == "buffering") {
        pl.unbind('onStateChange', pauseOnce);
        pl.pause();
        console.log("Player paused by GT Prevent Autoplay extension");
      }
    }
    
    /*pl.bind('onMediaStart', function(e) { console.log('PLAYER: Media start', e) });
    pl.bind('onMediaEnd', function(e) { console.log('PLAYER: Media end', e) });
    pl.bind('onOverlayRectChange', function(e) { console.log('PLAYER: OverlayRectChange', e) });
    pl.bind('onReady', function(e) { console.log('PLAYER: Ready', e) });
    pl.bind('onPlayheadUpdate', function(e) { console.log('PLAYER: cue', e) });
    pl.bind('onStateChange', function(e) { console.log('PLAYER: state change', e) });
    pl.bind('onUIStateChange', function(e) { console.log('PLAYER: UI state change', e) });
    pl.bind('onMetadata', function(e) { console.log('PLAYER: metadata', e) });
    pl.bind('onPlaylistComplete', function(e) { console.log('PLAYER: PlaylistComplete', e) });*/
    
    pl.bind('onStateChange', pauseOnce);
    
    console.log('GT Prevent Autoplay code injected successfully');
  }
  
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + injectionCode.toString() + ')();'; // inject function code as string and execute it
  document.body.appendChild(script); // run
  document.body.removeChild(script); // clean up
  
}

var allowedPages = ["videos","reviews"];

for(var page in allowedPages) {
  if(document.URL.indexOf("gametrailers.com/" + allowedPages[page] + "/") != -1) {
    setTimeout(doIt, 500);
    break;
  }
}