// ==UserScript==
// @name          Disable Netflix Instant Watch Links
// @namespace     https://gist.github.com/6349351
// @description   Click the cover image, go the video detail page, simple...
// @version       1.1
// @author        Jeremy Helms <digitaljhelms@gmail.com>
// @include       http://www.netflix.com/*
// @exclude       http://www.netflix.com/WiPlayer/*
// ==/UserScript==

// Example:
//    Desired URL: http://www.netflix.com/WiMovie/Dredd/70242801?trkid=13462488
//       - http://{hostname}/{base}/{t}/{movieid}?=trkid={trkid}
//          - hostname: www.netflix.com
//          - base: WiMovie
//          - 1: Dredd
//          - 2: 70242801
//          - querystring: trkid=13462488
//    Actual URL: http://www.netflix.com/WiPlayer?movieid=70242801&trkid=13462488&t=Dredd&tctx=5%2C3%2C4fb5c134-69c8-4787-9143-463a1d28bc96-54891911
//       - class
//          - bobbable
//          - popLink
//          - hideBobBoxshot
//          - playLink
//          - full
//          - uitracking-state-visible
//       - href
//          - hostname: www.netflix.com
//          - base: WiPlayer
//          - movieid: 70242801
//          - trkid: 13462488
//          - t: Dredd
//          - tctx: 5%2C3%2C4fb5c134-69c8-4787-9143-463a1d28bc96-54891911
//
// Goal: Convert actual URL into desired URL
//    - http://{hostname}/{base}/{t}/{movieid}?trkid={trkid}
//       - hostname: www.netflix.com
//       - base: WiMovie
//       - t: Dredd
//       - movieid: 70242801
//       - trkid: 13462488

var HOSTNAME = 'www.netflix.com',
    BASE = 'WiMovie',
    DEBUG = false;

function removeHover(el) {
  try {
    el.className = el.className.replace(/(?:^|\s)playLink(?!\S)/ , '');
    el.parentNode.className = el.parentNode.className.replace(/(?:^|\s)hoverPlay(?!\S)/ , '');
  } catch (e) {
    if (DEBUG) {
      throw(e);
    } else {
      // silence is golden
    }
  }
}

function convertLink(el) {
  try {
    var href = el.href,
        qs = {};

    var keyvals = href.split('?')[1].split('&'); // turn querystring into array

    for (var i = 0; i < keyvals.length; i++) {
      var keyval = keyvals[i].split("=");
      if (keyval[1].length > 0) {
        qs[keyval[0]] = unescape(keyval[1]); // create key/value pairs
      }
    }

    href = [];
    // http://{hostname}/{base}/{t}/{movieid}?trkid={trkid}
    href.push('http://', HOSTNAME, '/', BASE, '/', qs.t, '/', qs.movieid, '?trkid=', qs.trkid);
    href = href.join('');

    el.href = href; // replace href
  } catch (e) {
    if (DEBUG) {
      throw(e);
    } else {
      // silence is golden
    }
  }
}

try {
  document.querySelector('body').addEventListener('mouseover', function(event) {
    // if has class "playLink"
    if (/\bplayLink\b/.test(event.target.className)) {
      // remove hover "play" button
      removeHover(event.target);

      // convert link
      convertLink(event.target);
    }
  }, false);
} catch (e) {
  if (DEBUG) {
    throw(e);
  } else {
    // silence is golden
  }
}
