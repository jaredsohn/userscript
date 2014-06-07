// ==UserScript==
// @name           ffbandcamp
// @description    Bandcamp hate Firefox users and their money, and don't offer HTML5 playback with ogg despite specialising in transcoding. This script adds a crude iframe based player that allows the browser to load a plugin to play mp3s, instead, allowing Firefox users to resume window-shopping for great music to buy.
// @namespace      https://userscripts.org/users/524962
// @downloadUrl    https://gitorious.org/cguserscripts/ffbandcamp/blobs/raw/master/ffbandcamp.user.js
// @updateUrl      https://gitorious.org/cguserscripts/ffbandcamp/blobs/raw/master/ffbandcamp.user.js
// @source         https://gitorious.org/cguserscripts/ffbandcamp/blobs/raw/master/ffbandcamp.user.coffee
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @licence        GPLv3 (or later)
// @include        http://*.bandcamp.com/*
// @include        https://*.bandcamp.com/*
// @version        1.10
// ==/UserScript==
//;
/*
by Cathal Garvey
Twitter: @onetruecathal
Email:   cathalgarvey@cathalgarvey.me
Gittip:  https://www.gittip.com/onetruecathal

Source Repository: https://gitorious.org/cguserscripts/ffbandcamp

Bandcamp is an excellent site in many ways. Genuinely so: they provide a non-MAFIAA way for artists to publish their work that is simple, versatile and user-friendly. And they offer music for download in most formats one might want, a variety of lossless and lossy codecs including Flac and Ogg Vorbis.

Yet, despite specialising in on-the-fly transcoding at point of download, they couldn't be bothered offering ogg previews when browsing the site, and have failed to offer this for years now. This leaves users of Free/Libre systems like Firefox at a disadvantage; it's as if Bandcamp genuinely doesn't want money from users of one of the most popular browsers in the world?

Even if Bandcamp insist on using mp3, a patented, outdated, inferior codec rightfully excluded from Firefox's codec list, they could at least use any number of alternate methods to present mp3s which would prompt users' browsers to load any available browser plugins to handle mp3s, such as Totem, VLC or (ugh) Quicktime. And yet, they don't.

This userscript is a dirty hack in that direction; it extracts the mp3 URLs from the bandcamp previewing code, resolves them to their final location with a HTTP GET (HEAD is forbidden on Bandcamp's servers..) request, and inserts an iFrame pointing to the files directly. If the browser has a plugin capable of playing mp3s, it ought to be loaded automagically, usually resulting in auto-play.

For convenience and comfort, this also attempts to mimic the behaviour of the Bandcamp player, so that clicking the "play" icons next to other tracks in the album view will reload the iFrame pointing to those other tracks. If this fails to work right away, click anywhere else on the page to refresh the current track as indicated in the "default" HTML5 player box.
*/

var Track, catch_tralbumdata, changetrack, check_current, contentEval, current_track, current_track_area, desktopplayer, do_setup, give_track_onclick, log, playframe, send_tralbumdata_as_message, trackInfoInner, tracks_by_name, tracks_list, x,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

log = console.log;

log("Beginning ffbandcamp script.");

contentEval = function(source) {
  var script;

  if ("function" === typeof source) {
    source = "(" + source + ")();";
  }
  script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  return document.body.removeChild(script);
};

if (typeof GM_log !== "undefined" && GM_log !== null) {
  log("Found GM_log.");
  GM_log("This is from GM_log.");
} else {
  console.log("GM_log not found!");
}

if (typeof GM_xmlhttpRequest !== "undefined" && GM_xmlhttpRequest !== null) {
  log("Found xmlhttpRequest.");
} else {
  log("xmlhttpRequest not found!");
}

log("Defining send_tralbumdata_as_message");

send_tralbumdata_as_message = function() {
  var str_tralbumdata;

  if (typeof TralbumData !== "undefined" && TralbumData !== null) {
    console.log("Found TralbumData, JSON.stringify-ing.");
    str_tralbumdata = JSON.stringify(TralbumData);
    console.log("Sending message containing JSON-formatted str_tralbumdata.");
    return window.postMessage(str_tralbumdata, '*');
  } else {
    return console.log("Could not find TralbumData.");
  }
};

Track = (function() {
  function Track(info_obj) {
    this.info_obj = info_obj;
    this.check_url = __bind(this.check_url, this);
    this.tell_url = __bind(this.tell_url, this);
    this.update_url = __bind(this.update_url, this);
    this.url = this.original_url = info_obj['file']['mp3-128'];
    this.title = info_obj['title'];
    log("Setting up track " + this.title);
    this.track_number = info_obj['track_num'];
    this.check_url(this.url);
  }

  Track.prototype.update_url = function(response) {
    log("Received XMLHttpRequest response object, with finalUrl " + response.finalUrl);
    this.url = response.finalUrl;
    return this.tell_url();
  };

  Track.prototype.tell_url = function() {
    return log("@url for track " + this.title + " is: " + this.url);
  };

  Track.prototype.check_url = function(check_url) {
    var req, this_trackobj;

    this_trackobj = this;
    req = GM_xmlhttpRequest({
      url: check_url,
      method: "GET",
      onload: this_trackobj.update_url,
      onabort: this_trackobj.update_url
    });
    return setTimeout(req.abort, 800);
  };

  return Track;

})();

log("Seeking trackInfoInner from greasemonkey scope..");

trackInfoInner = ((function() {
  var _i, _len, _ref, _results;

  _ref = document.getElementsByTagName("div");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    x = _ref[_i];
    if (x.getAttribute("id") === "trackInfoInner") {
      _results.push(x);
    }
  }
  return _results;
})())[0];

log("Constructing iframe for later attachment to trackInfoInner.");

playframe = document.createElement("iframe");

playframe.setAttribute("width", 300);

playframe.setAttribute("height", 200);

tracks_list = [];

tracks_by_name = {};

desktopplayer = ((function() {
  var _i, _len, _ref, _ref1, _results;

  _ref = document.getElementsByTagName("div");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    x = _ref[_i];
    if ((_ref1 = x.getAttribute("class")) === "inline_player desktop-view" || _ref1 === "inline_player desktop-view one-track") {
      _results.push(x);
    }
  }
  return _results;
})())[0];

current_track_area = ((function() {
  var _i, _len, _ref, _results;

  _ref = desktopplayer.getElementsByTagName("span");
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    x = _ref[_i];
    if (x.getAttribute("class") === "title") {
      _results.push(x);
    }
  }
  return _results;
})())[0];

current_track = function() {
  return current_track_area.innerHTML;
};

changetrack = function(tracktitle) {
  log("Changing to track " + tracktitle);
  playframe.setAttribute("current", tracktitle);
  playframe.setAttribute("src", tracks_by_name[tracktitle].url);
  return log("Changed src of iFrame player to url for track " + tracktitle + ": " + tracks_by_name[tracktitle].url);
};

check_current = function() {
  if (current_track() !== playframe.getAttribute("current")) {
    log("Detected track change since last mouseclick, from " + playframe.getAttribute("current") + " to " + current_track());
    return changetrack(current_track());
  }
};

window.addEventListener("click", check_current, true);

give_track_onclick = function(track_title) {
  var this_onclick;

  this_onclick = function() {
    return changetrack(track_title);
  };
  return this_onclick;
};

do_setup = function(TralbumData) {
  var button, error, kickstart_player, rowbits, this_track, title, tr, trackListArea, track_items, track_row, _i, _j, _len, _len1, _ref;

  log("Calling get_final_url on each track in TralbumData.");
  track_items = TralbumData["trackinfo"];
  for (_i = 0, _len = track_items.length; _i < _len; _i++) {
    tr = track_items[_i];
    this_track = new Track(tr);
    tracks_list.push(this_track);
    tracks_by_name[this_track.title] = this_track;
  }
  trackListArea = trackInfoInner.getElementsByTagName("table")[0];
  if (trackListArea != null) {
    try {
      log("Found trackListArea.");
      _ref = trackListArea.getElementsByTagName("tr");
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        track_row = _ref[_j];
        rowbits = track_row.getElementsByTagName("td");
        if (rowbits != null) {
          button = rowbits[0].getElementsByTagName("div")[0];
          title = rowbits[2].getElementsByTagName("span")[0].innerHTML;
          log("Adding event listener to playbutton for track " + title);
          button.addEventListener("click", give_track_onclick(title), false);
        }
      }
    } catch (_error) {
      error = _error;
      log("Error while trying to set up onclick event listeners: " + error);
    }
  } else {
    log("Failed to find trackListArea.");
  }
  kickstart_player = function() {
    playframe.setAttribute("src", tracks_list[0].url);
    return trackInfoInner.appendChild(playframe);
  };
  return setTimeout(kickstart_player, 2000);
};

log("Setting up callback to create player when TralbumData is found.");

catch_tralbumdata = function(event) {
  var tralbumdata;

  tralbumdata = JSON.parse(event.data);
  return do_setup(tralbumdata);
};

window.addEventListener('message', catch_tralbumdata, false);

log("Passing attach_TralbumData_to_trackInfoInner as bookmarklet to page scope.");

contentEval(send_tralbumdata_as_message);
