// # Unscripted

// by Arthur Edelstein, 2014. [BSD 3-Clause License.](http://opensource.org/licenses/BSD-3-Clause)

// This user-script for Firefox's [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) extension
// lets you view videos on YouTube pages and photos on Flickr pages, even if Flash and the page's JavaScript is disabled.
// I hope this script is useful for the Tor Browser Bundle, where it is safest to turn off JavaScript.

// This script can be [installed from UserScripts.org](http://userscripts.org/scripts/show/308677)
// or [downloaded from github](https://github.com/arthuredelstein/unscripted).

// First, the UserScript preamble.

// <pre>
// ==UserScript==
// @name        youtubeHTML5
// @namespace   arthuredelstein.com
// @description run html5 video on youtube
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/*
// @include     http://*.flickr.com/*
// @include     https://*.flickr.com/*
// @version     1
// @grant       none
// ==/UserScript==
// </pre>

/*jshint multistr: true */

// Enclose all in a function to avoid polluting the
// global namespace.
(function () {
"use strict";

// ### Utility functions (all referentially transparent)

// Takes a string representing a key->value map, and parses
// it, given the expected string separating key-value pairs,
// and the separator between each key and value.
// For example, JSON maps (stripped of their curly braces)
// would require pairSep = "," and kvSep = ":".
var stringToMap = function (string, pairSep, kvSep) {
  var pairs = string.split(pairSep).map(function (kv) {
    return kv.split(kvSep);
  });
  var result = {};
  for (var i = 0; i < pairs.length; ++i) {
    var pair = pairs[i];
    result[pair[0]] = pair[1];
  }
  return result;
};

// Returns the query string from a URL, including the
// initial '?'.
var getQueryString = function (url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser.search;
};

// Reads the query ("search") part of a URL and converts
// it to a map.
var parseQueryString = function (queryString) {
  var trimmed = queryString.replace(/^\?/,"");
  return stringToMap(trimmed, "&", "=");
};

// Takes the query part of a URL and returns a JSON
// object containing the same information.
var getQueryMap = function(url) {
  return parseQueryString(getQueryString(url));
};

// Takes a URL and modifies (or creates) the query part
// with data taken from queryMap.
var setQueryMap = function(url, queryMap) {
  var parser = document.createElement('a'),
      queryString = "?";
  parser.href = url;
  for (var key in queryMap) {
    queryString += key + "=" + queryMap[key] + "&";
  }
  parser.search = queryString;
  return parser.href;
};

// Takes an array of JSON objects, and returns only those
// objects whose with the desired value and a given key.
var pickMapsWithTag = function(arrayOfObjects, key, value) {
  return arrayOfObjects.filter(function (datum) { return datum[key] == value; });
};

// Copies a URL string, and, if its protocol is http,
// converts it to HTTPS.
var changeToHttps = function (url) {
  var parser = document.createElement('a');
  parser.href = url;
  if (parser.protocol === "http:") {
    parser.protocol = "https:";
  }
  return parser.href;
};

// Returns true iff the URL string uses the HTTPS protocol.
var isHttps = function (url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser.protocol === "https:";
};

// ### Mutating web pages.

// Restore deferred thumbnail images that inexplicably need JavaScript to be visible.                                                                                                                      

var restoreThumbnailImages = function (thumbnailSelector, deferredSrcAttribute) {
  var images = document.querySelectorAll(thumbnailSelector);
  for (var i = 0; i < images.length; ++i) {
    var image = images[i];
    if (image.hasAttribute(deferredSrcAttribute)) {
      image.src = image.getAttribute(deferredSrcAttribute);
    }
  }
};

// ### Flickr fix

var fixFlickr = function () {
  restoreThumbnailImages('img.defer', 'data-defer-src');
};

// ### YouTube-scraping functions
// For extracting a URL of an HTML5 video.

// Scrapes useful video location data and signatures from a YouTube page.
var scrapeVideoLocationData = function (bodyHTML) {
  // Location data can be found in JSON object literals inside an inline SCRIPT tag.
  var pattern = /\"url\_encoded\_fmt\_stream\_map\"\:\ \"(.*?)\"/,
      // A series of literal maps each corresponds to a way to request a different
      // format of the same video.
      sources = bodyHTML.match(pattern)[1].split(",");
  // Read the data from these literal maps.
  return sources.map(function (source) { return stringToMap(source, "\\u0026", "="); });
};

// Scrape necessary data from the YouTube page to construct a URL
// that points to an HTML5 version of the video.
var extractHTML5VideoURL = function (bodyHTML) {
  var chosenVideoItem = pickMapsWithTag(scrapeVideoLocationData(bodyHTML), "itag", "43")[0],
      // The 'url' tag from chosenVideoItem contains most of the URL we need
      // for obtaining the HTML5 video. URL-decode the tag to get a pure
      // URL, and ensure it uses HTTPS.
      url = changeToHttps(decodeURIComponent(chosenVideoItem.url)),
      // Read the tags from this URL, in turn.
      tags = getQueryMap(url);
  // The signature / sig tag is necessary to obtain the video.
  tags.signature = tags.signature || chosenVideoItem.signature || chosenVideoItem.sig;
  // Return a URL that has the full complement of tags.
  return setQueryMap(url, tags);
};

// ### Mutating the YouTube page.

// Embed the video element in the YouTube page and return a reference to it.
var embedVideo = function (html5VideoURL) {
  // Place it in the old playerAPI box.
  var playerAPI = document.querySelector("div#player-api");
  playerAPI.style.position = "relative";
  playerAPI.innerHTML = '<div style="background-color: black; position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 99;"> \
                        <video id="unscripted" src="' + html5VideoURL + '" style="width: 100%; height: 100%" controls></video> \
                        </div>';
  return document.querySelector('video#unscripted');
};

// ### The main function

// Alter the YouTube page to show its video without needing the page's JavaScript.
var noScriptYouTube = function() {
   // Let's always use HTTPS in this script, to be safer.
   // Redundant if user uses the HTTPSEverywhere plugin.
   if (!isHttps(location.href)) {
     location.href = changeToHttps(location.href);
   }
   try {
     var html5VideoURL = extractHTML5VideoURL(document.body.innerHTML);
     // Swap old video for new HTML5 video.
     var video = embedVideo(html5VideoURL);
     // Play the video immediately, just as YouTube does.
     video.play();
   } catch (e) {
     console.log(e);
     // Never mind.
   }
   restoreThumbnailImages('span.yt-thumb-clip img', 'data-thumb');
};

// Run the main function to immediately make YouTube page work even if the
// page's JavaScript is disabled.

if (location.href.contains('youtube.com')) {
  noScriptYouTube();
}
if (location.href.contains('flickr.com')) {
  fixFlickr();
}
// Terminate enclosing function.
})();
