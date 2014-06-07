// ==UserScript==
// @name          Refresh All Images
// @description   Forces all images in all frames to re-download. To setup, edit included domains, intervals, and times to run.
// @version       0.2
// @date          2013-07-26
// @author        elundmark
// @contact       mail@elundmark.se
// @license       CC0 1.0 Universal; http://creativecommons.org/publicdomain/zero/1.0/
// @namespace     http://elundmark.se/code/refresh-all-images/
// @homepage      https://userscripts.org/scripts/show/174256
// @updateURL     https://userscripts.org/scripts/source/174256.meta.js
// @downloadURL   https://userscripts.org/scripts/source/174256.user.js
// @include       http://example.tld/*
// @grant         unsafeWindow
// @grant         GM_log
// ==/UserScript==

/********************************************************************************
 *                                                                              *
 * The idea is that using a UserScript instead of a bookmarklet or the console, *
 *   you can, at the same time, apply a forced image refresh (and repaint)      *
 *   in all windows and (i)frames at once. This applies to all IMG elements     *
 *   with a valid SRC set, including inline data uri images.                    *
 *                                                                              *
 * Just edit the @include rule to your page, and edit the options               *
 *   below in `reloadInterval` and `runTimes` to suit your needs.               *
 *                                                                              *
 ********************************************************************************/

(function (w) {
  "use strict";
  var reloadInterval = 10000  // milliseconds
    ,runTimes        = 99999  // times to run
    ,d     = w.document
    ,debug = function (msg) {
      if ( w.console !== undefined ) {
        w.console.error(msg);
      } else if ( typeof GM_log === "function" ) {
        GM_log(msg);
      } else {
        throw new Error(msg);
      }
    }
    ,delay
  ;
  try {
    delay = setInterval(function () {
      var i, images = d.getElementsByTagName("img"), imgSrc;
      // Do not exit on no images found, they may be inserted at any time dynamically.
      runTimes-- || clearInterval(delay);
      for ( i = 0; i < images.length; i++ ) {
        imgSrc = images[i].src;
        if ( imgSrc ) {
          // Three possible src's to consider: data uri images,
          //   images with a get parameter set, and all other.
          if ( imgSrc.indexOf("data:") === 0 ) {
            // I know this is kinda useless since it doesn't really reloads any "new" image,
            //   but the reason I wrote this to begin with is that my OS has a graphics bug
            //   that scrambels images sometimes, so I have to force a repaint in the browser.
            images[i].src = imgSrc + "=!";  // Bust it first.
            images[i].src = imgSrc;         // Reset.
          } else if ( imgSrc.match(/(\&|\?)cachebust\=[0-9]{13}/) ) {
            images[i].src = imgSrc.replace(/(cachebust\=)[0-9]{13}/, "$1" + (new Date().getTime()));
          } else if ( imgSrc.match(/\?[^?]+$/i) ) {
            // Append a parameter  [+&...].
            images[i].src = imgSrc.replace(/\&$/,"") + "&cachebust=" + (new Date().getTime());
          } else if ( imgSrc.match(/\S+/i) ) {
            // Add a get parameter [?...].
            images[i].src = imgSrc + "?cachebust=" + (new Date().getTime());
          }
        }
      }
    }, reloadInterval);
    if ( !w || !w.document ) return;
  } catch (error) {
    if ( typeof debug === "function" ) {
      debug(error);
    } else {
      throw new Error(error);
    }
  }
}(unsafeWindow||window));