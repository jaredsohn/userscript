// ==UserScript==
// @name          Youtube - Resume Playback from last position
// @description   Remembers where you last left off viewing, applies to all /watch pages and Featured tabs.
// @namespace     http://elundmark.se/code/resumed-playback-for-youtube/
// @license       http://www.opensource.org/licenses/mit-license.php
// @version       1.13
// @date          2013-06-12
// @author        elundmark
// @contact       mail@elundmark.se
// @homepage      https://userscripts.org/scripts/show/140356
// @updateURL     https://userscripts.org/scripts/source/140356.meta.js
// @downloadURL   https://userscripts.org/scripts/source/140356.user.js
// @include       http*://www.youtube.com/*
// @grant         GM_log
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAM1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjBUbJAAAAEHRSTlMADx8vP09fb3+Pn6+/z9/v+t8hjgAAAR9JREFUeNrt2sFuhDAMhOE6a8CkJub9n3YrVepU6l67c/B8Zw7/ARES50NERERERER+2+OF8caAvF/wP4/FNHLAXUEOuO+1cQO+5CAGfDuNHHDXwQr4cTkpAD4HKQDCOAFQOykA0kkBMAcnACqMEwBrIwVAPkgBMI0TABWkAFhOCoAcpAA4jRMAtZMC4HJaABZqUgCEcQJg7aQASCcFwBycAKggBcDaSAGQD1IAnMYJgDpIAbCcFAA5SAEQxgmA2kkBcHnvgNpbv4Q5On+I6mi9GOWj8w9JReuf0vTWG5OwzpvTy1sfUJzW5ZAKYHnrg8ppnQ+r18YeWHQe2aS3HtuFdR7dXt56fH9a5ysca2t9jWfae69yiYiIiIiIyL96Av4g+Cvj4IYCAAAAAElFTkSuQmCC
// ==/UserScript==
(function(_window) {
  if ( !_window || _window.self != _window.top || /^\/embed\//.test(location.pathname) ) {
    // no window or in a n iframe, abort
    return;
  }
  try {
    // Used to log errors to FB
    var scriptName = "userscript_resume_playback_positions",
      _document = _window.document,
      int_init_get_yt_obj,
      int_get_video_length,
      getVideoLength,
      init_get_yt_obj_times = 0,
      videoLength,
      init,
      storage,
      ltestFail,
      ltestUid,
      times = {
        storeInterval : 2E3,
        apiCheckInterval : 0.5E3,
        minPosition : 10,
        rewind : 3
      },
      featuredElFlashvars,
      playerNum,
      videoElement,
      youtubeApi,
      thisVideoId,
      GM_log = function (s) {
        _window.console && _window.console.log(s);
      }
    ;
    // http://mathiasbynens.be/notes/localstorage-pattern
    ltestUid = new Date;
    (storage = _window.localStorage).setItem(ltestUid, ltestUid);
    ltestFail = storage.getItem(ltestUid) != ltestUid;
    storage.removeItem(ltestUid);
    ltestFail && (storage = false);
    init = function ( yt_api ) {
      var firstCheck         = true,
        currentPosition,
        checkPositionLoop,
        int_wait_for_status_playing,
        goto_s_on_start,
        memArrayToString,
        storePosition,
        seekToPosition,
        findIndex,
        currentSavedArray,
        deleteFromStorage
      ;
      // if the users localstorage is bigger than 4MB we need to do our part to do some GC
      if ( storage ) {
        findIndex = function ( thisID ) {
          var cSavesLen,
            existingStorage,
            existingArrLen,
            insideMatch,
            i = 0,
            y = 0
          ;
          // we need to do this for both empty storage and previous visits
          existingStorage = storage.getItem( scriptName );
          existingStorage = existingStorage && existingStorage.match(/[a-zA-Z0-9-_]+\$\$\d+\|\|/)
            ? existingStorage.split("||")
            : existingStorage && existingStorage.match(/^[a-zA-Z0-9-_]+\$\$\d+$/)
            ? [ existingStorage ] : [];
          existingArrLen = existingStorage.length;
          // GM_log( "1: stored on disk: " + (typeof storage.getItem( scriptName )) );
          // GM_log( "2: so I got " + (typeof existingStorage));
          // build currentSavedArray if existingStorage has entries
          currentSavedArray = [];
          if ( existingArrLen ) {
            for ( y; y < existingArrLen; y++ ) {
              // catch empty entries from .split("||")
              insideMatch = existingStorage[y].length
                ? existingStorage[y].match(/^(.+)\$\$(.+)$/) : null;
              insideMatch && currentSavedArray.push({
                id: insideMatch[1],
                pos : +insideMatch[2]
              });
            }
          }
          cSavesLen = currentSavedArray.length;
          // now we have a local copy that regardless of visits IS an array
          if ( cSavesLen ) {
            // now find a matching video in the array
            // i.e. has user seen this and is it stored?
            for ( i; i < cSavesLen; i++ ) {
              if ( currentSavedArray[i].id === thisID ) {
                // found match and position is big enough to care
                goto_s_on_start = +currentSavedArray[i].pos;
                deleteFromStorage = i;
                break;
              }
            }
            // delete current video from storage in case user has several windows open
            // GM_log( "3: local var length before I delete the current video: " + currentSavedArray.length );
            if ( typeof deleteFromStorage === "number" && deleteFromStorage >= 0 ) {
              currentSavedArray.splice( deleteFromStorage, 1 );
              // GM_log( "4C: local var length after deletion: " + currentSavedArray.length );
              // make new array and save it to storage
              storage.setItem( scriptName, memArrayToString( currentSavedArray ) );
            }
            // GM_log( "5: now in memory: " + storage.getItem( scriptName ).length + " bytes" );
            return true;
          }
        };
        memArrayToString = function ( arr ) {
          var str = "",
            i = 0,
            arrLen = arr.length
          ;
          for ( i; i < arrLen; i++ ) {
            str = str + arr[i].id + "$$" + arr[i].pos;
            // no trailing sep
            if ( (arrLen-1) !== i ) {
              str += "||";
            }
          }
          return str;
        };
        currentPosition = function () {
          var thisPos = yt_api.getCurrentTime(),
            thisPos   = thisPos && typeof thisPos === "number"
              ? thisPos.toFixed(0) : 0
          ;
          return thisPos;
        };
        saveStatus = function ( storePos ) {
          var savePositionObj = [],
            mergedStorage,
            atTheEnd
          ;
          storePos = +storePos;
          atTheEnd = (videoLength - storePos) <= (times.minPosition - times.rewind) ? true : false
          // GM_log( "(" + ( videoLength - storePos ) + ") <= " + (times.minPosition - times.rewind) + " --> " + (atTheEnd).toString() );
          // Making it 0 if playback reaches the end makes seekTo skip that video
          atTheEnd && (storePos = 0);
          savePositionObj.push( { id: thisVideoId, pos: storePos } );
          mergedStorage = currentSavedArray.concat( savePositionObj );
          // GM_log( "6: Storing #" + thisVideoId + "$$" + storePos );
          storage.setItem( scriptName, memArrayToString( mergedStorage ) );
          if ( firstCheck ) {
            firstCheck = false;
            // nice: show the total storage to the window the first time we store anything
            _window[scriptName + "_stored"] = storage.getItem( scriptName ).length;
          }
        };
        seekToPosition = function ( goToSec ) {
          // seek to position regardless of paused or playing
          var int_wait;
          // be kind rewind, or skip entirely if it's 0 (atTheEnd)
          goToSec = goToSec > times.rewind ? goToSec - times.rewind : goToSec;
          // is the player ready to be seeked?
          if ( goToSec && yt_api.getPlayerState() > 0 ) { // 0 (ended) or -1 (unstarted)
            yt_api.seekTo( goToSec, true ); // true = allow re-buffer
          } else if ( goToSec ){
            int_wait = setInterval(function () {
              if ( yt_api.getPlayerState() > 0 ) {
                clearInterval( int_wait );
                yt_api.seekTo( goToSec, true );
              }
            }, 1E3);
          }
        };
        checkPositionLoop = function () {
          int_wait_for_status_playing = setInterval( function () {
            if ( yt_api.getPlayerState() === 1 ) { // 1 is playing
              var newPos = currentPosition();
              if ( newPos && newPos > times.minPosition ) saveStatus( newPos );
            }
          }, times.storeInterval);
        };
        // this finds the current id and pos stored and if ueser has it it seeks to it
        findIndex( thisVideoId ) && goto_s_on_start && seekToPosition( goto_s_on_start );
        // now we do a loop and check for the current position, and store it
        checkPositionLoop();
      } else if ( !storage ) {
        alert(scriptName + "\n This browser doesn't support localStorage");
      }
    }; // end init
    getVideoLength = function( api ) {
      int_get_video_length = setInterval( function() {
        videoLength = api.getDuration(); // 0 if not ready
        if ( typeof videoLength === "number" && videoLength >= 0 ) {
          clearInterval( int_get_video_length );
          videoLength = videoLength.toFixed(0);
          // GM_log("0.00 getVideoLength ready = " + videoLength);
          init( api );
        }
      }, 0.25E3);
    };
    int_init_get_yt_obj = setInterval( function() {
      // get id and a valid player embed
      watchVideoIdMatch = location.href.match(/(\&|\?)v=([a-zA-Z0-9-_]+)/);
      thisVideoId = watchVideoIdMatch && watchVideoIdMatch.length === 3 ? watchVideoIdMatch[2] : null;
      videoElement = ( _document.getElementById("movie_player") || _document.getElementById("movie_player-flash") );
      featuredElFlashvars = videoElement && typeof videoElement.getAttribute !== "undefined" ?
        videoElement.getAttribute("flashvars") : "";
      if ( !thisVideoId || !watchVideoIdMatch ) {
        // User page
        watchVideoIdMatch = featuredElFlashvars.match(/(^|\?|\&)video_id=([a-zA-Z0-9-_]+)($|\?|\&)/);
        thisVideoId = watchVideoIdMatch && watchVideoIdMatch.length === 4 ? watchVideoIdMatch[2] : null;
      }
      if ( featuredElFlashvars.match(/(live_playback=1|livestream)/) ) {
        // abort if live
        clearInterval( int_init_get_yt_obj );
        typeof GM_log === "function" && GM_log( "Live stream, aborting " + scriptName );
      }
      // check if api is ready to use
      youtubeApi = videoElement && thisVideoId
        && typeof videoElement.getCurrentTime === "function"
        && typeof videoElement.getPlayerState === "function"
        && typeof videoElement.getDuration === "function"
        ? videoElement : null;
      if ( youtubeApi ) {
        // api is ready to use
        clearInterval( int_init_get_yt_obj );
        // GM_log( "0: --- " + scriptName + " API CHECK READY ---" + (typeof youtubeApi) );
        getVideoLength( youtubeApi );
      } else if ( init_get_yt_obj_times > 100 ) {
        // api check took way to long, pply unsolvable
        clearInterval( int_init_get_yt_obj );
      } else {
        init_get_yt_obj_times++;
      }
    }, times.apiCheckInterval);
  } catch (error) {
    typeof GM_log === "function" && GM_log( error );
    if ( error.message.toUpperCase() === "QUOTA_EXCEEDED_ERR" ) {
      try {
        _window.localStorage.removeItem( scriptName );
      } catch (e) {}
    }
  }
}( ( unsafeWindow || window ) ));