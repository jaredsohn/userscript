// ==UserScript==
// @name          Youtube - Mute All Ads
// @description   Sets the volume of the video to 'mute' whenever an ad is playing
// @namespace     http://elundmark.se/code/mute-all-ads-youtube/
// @license       http://www.opensource.org/licenses/mit-license.php
// @version       1.4
// @date          2013-06-12
// @author        elundmark
// @contact       mail@elundmark.se
// @include       http*://www.youtube.com/*
// @homepage      http://userscripts.org/scripts/show/153701
// @updateURL     https://userscripts.org/scripts/source/153701.meta.js
// @downloadURL   https://userscripts.org/scripts/source/153701.user.js
// @grant         GM_log
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABuVBMVEUAAAACAgIEBAQFBQUGBgYKCgr///////8CAgL09PT////+/v4EBAT///////////8AAAD///////////////////////////////8FBQX////////////////////e3t709PQDAwNtbW3R0dFqamqmpqYCAgICAgIFBQUCAgIFBQWBgYE/Pz99fX09PT0HBwdcXFxiYmJaWlpkZGReXl4ICAhdXV1fX19gYGBWVlZZWVlbW1sICAhTU1MFBQUKCgoCAgIEBAQFBQUKCgoCAgIEBAQkJCQlJSUEBAQDAwMwMDAICAgrKysZGRkHBwcICAgPDw8QEBAREREHBwcJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUHBwcJCQkLCwsQEBAVFRUGBgYGBgYJCQkKCgoLCwsQEBASEhIGBgYMDAwKCgoODg4GBgYICAgKCgoMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQXFxcZGRkbGxscHBwBAQEEBAR7pr/NAAAAk3RSTlMAAAAAAAAAAgYGCRUaHR8hJissLS4vMDEyQEBKVVtcaWlyeHh8f4KFiImLjY6PkpmcnZ6en6CgoKCioqKkpKenqamqqqytsLO1tra4xsvMz9jY2NnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dra2tra29zc3Nzc3N3d3t/k5OTk5OTk5OTk5OTk5OTk6+5fKeJiAAABTklEQVR42t3RV08CURAF4CModizYFXvvvfeKHexe8S6yuxRdOygi2LCgKJZf7IawIfFhfdZv5mGSOS+TwX+UCjlKlHxBRjSaXD65fdwsoQGZQNKigbMGgahIh0hDrsvACcIHlKgah0KB4RooEFY5rdMtXC9xwtHBO1DtXR4FBo/PayG5XVld36Scff9wLwjUX5C1/o5T4m6E5MFITTu8bVcQbG9ARpeHEkI9fZmQPJs4nrfa7Lt2/hWAps1pMjm7I3u8mHmLxWIViw0AMZg0s6x5ShwkfoblQljGDwWGHIzTyWyNRa54ojth1A+MnJDL9pZLsjIByZxjm95QRmR8BEq97l5NWqfbWw5JfqFWW9x6tWQ0knsguW4gA9D0NKgRpoIoNqtCrycbPgDqHIiyU/BDYtH8+prcN1XxBTNnd5BLIK/5E/KJ9DL8IgF/0jdSp1EVkLgYAgAAAABJRU5ErkJggg==
// ==/UserScript==
(function(_window) {
  if ( !_window ) return;
  try {
    // Used to log errors to FB
    var scriptName = "userscript_mute_all_ads",
      _document = _window.document,
      init_loop_playPause,
      init_get_yt_obj_times = 0,
      int_init_get_yt_obj,
      int_loop_state,
      adMuted = false,
      youtubeApi,
      GM_log = function(s){
        _window.console && _window.console.log(s);
      }
    ;
    int_init_get_yt_obj = setInterval( function() {
      // get the current video element
      var videoElement = ( _document.getElementById("movie_player") || _document.getElementById("movie_player-flash") );
      // check if api is ready to use
      youtubeApi = videoElement && typeof videoElement.getPlayerState === "function"
        && typeof videoElement.getDuration === "function" ? videoElement : null;
      if ( youtubeApi && youtubeApi.getDuration() ) {
        // api is ready to use
        clearInterval( int_init_get_yt_obj );
        //GM_log( "0: --- " + scriptName + " API CHECK READY ---" + (typeof youtubeApi) );
        adMuted = true;
        youtubeApi.mute();
        init_loop_playPause( youtubeApi );
      } else if ( init_get_yt_obj_times > 200 ) {
        // api check took way to long, pply unsolvable
        clearInterval( int_init_get_yt_obj );
      } else {
        init_get_yt_obj_times++;
      }
    }, 250);
    
    init_loop_playPause = function( api ) {
      int_loop_state = setInterval( function() { 
        // loop forever
        var isPlaying = (api.getPlayerState() > 0);
        if ( isPlaying && adMuted ) {   
          // Not an ad and it's muted
           adMuted = false;
           api.unMute();
        } else if ( !isPlaying && !adMuted ) {
          // Ad and it's not muted yet
           adMuted = true;
           api.mute();
        } else {
          // GM_log("adMuted: " + adMuted.toString() + ", isPlaying: " + isPlaying.toString());
        }
      }, 500);
    };
  } catch ( error ) {
    typeof GM_log === "function" && GM_log( error );
  }
}(unsafeWindow||window));