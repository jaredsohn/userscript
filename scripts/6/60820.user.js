// ==UserScript==
// @name          Songkick Bootleg Injector
// @author        Robin Tweedie <robin.tweedie@gmail.com>
// @namespace     http://songkick.com
// @description   Finds archive.org bootleg links on Songkick concert pages and adds a music player.
// @include       http://www.songkick.com/concerts/*
// @version       0.1
// ==/UserScript==
// --------------------------------------------------------------------
//
// REQUIREMENTS:
//  * You need to be running Firefox 3+ - upgrade @ http://getfirefox.com
//  * You need to allow popups for Songkick.com in Firefox
//  * You need the Embed Code Poster script installed too: 
//
// This script will look in the Reviews section of Songkick concert
// pages. If it finds a link to an Archive.org live recording page, it 
// will open a popup briefly and grab the embed code from Archive.org. 
// You will then (hopefully) have a flowplayer on Songkick's concert page 
// to listen to the bootleg of the concert.
//
// Brought to you by the magic of:
//  * The Internet Archive (http://archive.org)
//  * jQuery (http://jquery.com)
//  * flowplayer (http://flowplayer.org/)
//  * HTML 5 cross-document message posting (https://developer.mozilla.org/en/DOM/window.postMessage)
//
//---------------------------------------------------------------------

function BootLegger() {
  /**
  * Search the reviews section for a bootleg link
  * returns false if no link found
  */
  this.getLink = function() {
    var url_pattern = /^http:\/\/www\.archive\.org\/details\//i, 
      i, reviewLinks = $("div.module ul.reviews.content li a[target=_blank]"),
      found_link = false;
    
    reviewLinks.each( function() {
      var href = $(this).attr("href");
      if (url_pattern.test(href)) {
        found_link = href;
        return false; //to break loop when link found
      }
    });
    return found_link;
  };
  
  /**
  * Spawn the popup window which is handled by another userscript
  */
  this.spawnWindow = function(url){
    newwindow = window.open(url,'hax','height=1,width=1');
  };
  
  /**
  * Event handler to receieve embed code message from popup
  */
  this.receiveEmbedCode = function(event) {
    if (event.origin !== "http://www.archive.org") {
      return false;
    }
    //inject embed code
    $("div.rating").before($(event.data));
  }
}

/**
* Do magic things after jQuery has loaded
*/
function init(){
  bootlegger = new BootLegger();
  link = bootlegger.getLink();
  if (link) {
    bootlegger.spawnWindow(link);
  }
  window.addEventListener("message", bootlegger.receiveEmbedCode, false);
}

/**
* Recusively checks for jQuery to be loaded.
*/
function GM_wait() {
  if (typeof unsafeWindow.jQuery === 'undefined') { 
    window.setTimeout(GM_wait, 100); 
  } else { 
    $ = unsafeWindow.jQuery;
    init(); 
  }
}
var GM_start = new GM_wait();
