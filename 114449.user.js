// ==UserScript==
// @id             qlstreamnotifier@phob.net
// @name           Quake Live Stream Notifier
// @version        0.67
// @namespace      phob.net
// @author         wn
// @contributor    cityy
// @description    Displays a list of live gaming streams on QuakeLive.com and ESReality.com
// @include        http://esreality.com/*
// @include        http://*.esreality.com/*
// @exclude        http://*.esreality.com/w*
// @include        http://esreality.net/*
// @include        http://*.esreality.net/*
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/114449.meta.js
// ==/UserScript==


/**
 * Only run if we're in the top frame
 */
if (window.self != window.top) {
  return;
}


/**
 * Global stuff
 */
var DOLITTLE = function() {}
  , GM_registerMenuCommand = GM_registerMenuCommand ? GM_registerMenuCommand : DOLITTLE
  , UPDATE_MS = 3E5 // 5 * 60 * 1000
  , RE_okayChars = /^[\w .,`~!@#&*:\/\\\-=+?{}\(\)\[\]\|]+$/
  , RE_url = /^[\w .:\/\\\-=+?#&]+$/
  , isESR = /^http:\/\/(?:\w+\.)?esreality\.(?:com|net)\/.*$/i.test(window.location.href)
  , src = "http://phob.net/qlsn_quake_streams.json"
  , jsonReq
  ;


/**
 * Helper to add CSS
 */
function addStyle(aContent) {
  if ("[object Array]" === Object.prototype.toString.call(aContent))
    aContent = aContent.join("\n");
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = aContent;
  document.body.appendChild(s);
}


/**
 * Add the live stream bar
 */
addStyle(
    "#qlsn_bar {margin: 0 auto; padding: 2px; background-color: "
  + (localStorage["qlsn_barColor"] || "#000") + "; clear: both;}"
  + "#qlsn_bar em {color: #ccc; font-style: italic;}"
  + "#qlsn_bar strong {font-weight: bold;}"
  + "#qlsn_bar a {text-decoration: none;}"
  + "#qlsn_bar a.qlsn_stream {color: #ccc;}"
  + "#qlsn_bar a.qlsn_stream:hover {color: #fff;}"
);

// Styling unique to ESR or QL
if (isESR)
  addStyle("#qlsn_bar {font-size: 11px;}");
else
  addStyle("#qlsn_bar strong, #qlsn_bar strong a {color: #fc0;}");

var qlsnBar = document.createElement("div");
qlsnBar.setAttribute("id", "qlsn_bar");
qlsnBar.innerHTML = "<em>loading live streams&hellip;</em>";
document.body.insertBefore(qlsnBar, document.body.firstChild);


/**
 * Potential sources in order of priority
 * NOTE: Intentionally duplicated the source so we try it again if the first
 *       request fails,  since it is quite likely something other than site
 *       downtime caused the failure.
 */
var listSources = [src, src];


/**
 * Updates the live stream bar
 * @param {Array} an array of live streams
 */
function updateBar(liveStreams) {
  var x = []
    , bar = document.getElementById("qlsn_bar")
    ;

  // Stop if we don't have any live streams
  if (!liveStreams.length) {
    bar.innerHTML = "<em>no live streams found</em>";
    return;
  }

  // Sort by stream name
  liveStreams.sort(function(a, b) {
    a = a.name.toLowerCase(), b = b.name.toLowerCase();
    return (a < b ? -1 : a > b ? 1 : 0);
  });

  // Generate and display the list
  for (var i = 0, e = liveStreams.length; i < e; ++i) {
    if (!(RE_okayChars.test(liveStreams[i].name)
        && RE_okayChars.test(liveStreams[i].game)
        && RE_url.test(liveStreams[i].url)
        && !isNaN(parseInt(liveStreams[i].viewers)))) {
      console.log("Unexpected value(s) in: " + JSON.stringify(liveStreams[i]));
      continue;
    }
    x.push("<a href='" + liveStreams[i].url + "' "
          + " title='Game: " + liveStreams[i].game
          + ", Viewers: " + liveStreams[i].viewers + "' "
          + " class='qlsn_stream' target='_blank'>"
          + liveStreams[i].name + "</a>");
  }

  if (0 == x.length) {
    x = ["(error parsing stream list)"];
  }

  bar.innerHTML = "<strong><a href='http://userscripts.org/scripts/show/114449'"
    + " target='_blank'>LIVE NOW</a>:</strong>&nbsp;&nbsp;"
    + x.join("&nbsp;&nbsp;|&nbsp;&nbsp;");
}


/**
 * Get a new list of live streams.
 * Tries the fallback source if the first results in an error.
 * @param {Integer} an optional index specifying the list source to try
 * @param {Boolean} an optional flag to force a refresh
 */
function refreshList(aIndex, aForce) {
  // If we're within UPDATE_MS of the last good refresh, try to load from cache.
  // Currently only doing this for ESR, since QL doesn't actually reload often.
  var liveStreams
    , now = (new Date()).getTime()
    , fetchCache = localStorage["qlsn_fetchCache"]
    , lastFetch = Number(localStorage["qlsn_lastFetch"])
    ;

  if (isESR && !aForce && fetchCache && lastFetch
      && (now - lastFetch < UPDATE_MS)) {
    try {
      fetchCache = JSON.parse(fetchCache);
      updateBar(fetchCache);
      return;
    }
    catch(e) {}
  }

  // Starting fresh
  liveStreams = [];
  localStorage["qlsn_fetchCache"] = "";

  // Default to the first source if not specified
  aIndex = aIndex || 0;

  // Make sure the index specified is valid, otherwise stop trying
  if ("undefined" == typeof listSources[aIndex]) {
    updateBar(liveStreams);
    return;
  }

  // Try updating with the current list source.
  // If it fails, retry using the next one.
  jsonReq = new XMLHttpRequest();
  jsonReq.onreadystatechange = function() {
    // Done?
    if (jsonReq.readyState === 4) {
      // Good HTTP response?
      if (200 == jsonReq.status) {
        try {
          liveStreams = JSON.parse(jsonReq.responseText);
        }
        catch(e) {
          console.log("Error parsing response from " + listSources[aIndex]
               + " (" + e + ")");
          refreshList(aIndex+1, aForce);
          return;
        }
        localStorage["qlsn_fetchCache"] = JSON.stringify(liveStreams);
        localStorage["qlsn_lastFetch"] = now;
        updateBar(liveStreams);
      }
      // Bad HTTP response...
      else {
        console.log("Error requesting JSON from " + listSources[aIndex]
             + " (" + jsonReq.statusText + ")");
        refreshList(aIndex+1, aForce);
      }
    }
  }
  jsonReq.open("GET", listSources[aIndex] + "?" + now, true)
  jsonReq.send();
}


/**
 * Add a menu command to change the bar's background color
 */
GM_registerMenuCommand("Quake Live Stream Notifier: Change the bar color", function() {
  var color = prompt("Enter a CSS-friendly color without quotation marks.\n\n"
                   + "For example (without quotation marks): 'red' OR '#621300'\n\n"
                   , (localStorage["qlsn_barColor"] || "#000"));
  if (!color) return;

  localStorage["qlsn_barColor"] = color;
  alert("Value set.  Please reload Quake Live.");
});


/**
 * Add a menu command to force a list refresh
 */
GM_registerMenuCommand("Quake Live Stream Notifier: Force list reload", function() {
  refreshList(null, true);
});


/**
 * Update the list every UPDATE_MS
 */
window.setInterval(function(){refreshList()}, UPDATE_MS);


/**
 * Load the list for the first time
 */
refreshList();
