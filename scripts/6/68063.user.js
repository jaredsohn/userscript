// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// Then restart Firefox and visit this script again.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          upshot
// @version       0.01
// @namespace     http://www.flyertalk.com
// @description   upshot
// @include       http://upshot.gogoinflight.com/ground*
//
// @history 0.01  Initial Release
// ==/UserScript==

window.addEventListener('load',
  function() {
    var mResult = (new RegExp("/results/[0-9]+$")).exec(window.location);
    var mPlay = (new RegExp("/play$")).exec(window.location);

    if(mResult) {
        // Clear upshot cookie after game is over.  Don't seem to need it, but doesn't hurt.
        document.cookie = "ci_session=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    }
    if(mPlay) {
        // Skip the flash animation and go straight to the results screen.
        window.location = "http://upshot.gogoinflight.com/ground/results/" + Math.floor(Math.random()*100000);
    }
  },
  true);