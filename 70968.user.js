// ==UserScript==
// @name           SoundCloud Infinity Download
// @namespace      http://userscripts.com/wilkerlucio/soundcloud_infinity_download
// @description    Download mp3 from SoundCloud, even it reached the download limit
// @match          http://*.soundcloud.com/*
// @include        http://soundcloud.com/*
// ==/UserScript==

var $;
$ = unsafeWindow.$;

// debug function

var debugMode = false;

var d = function(a, b, c) {
  if (debugMode) {
    console.log(a, b || "", c || "");
  }
};

var extractStreamUrl = function(string) {
  var match;
  if (match = string.match(/"streamUrl":"(.+?)"/)) {
    return match[1];
  } else {
    return null;
  }
};

var onNodeHTML = function(fn) {
  return function(node) {
    return fn(node.innerHTML);
  };
};

var aFirst = function(array, iterator) {
  var res, val, i;

  for (i = 0; i < array.length; i++) {
    val = array[i];

    if (res = iterator(val)) return res;
  }

  return null;
};

var lookForStreamUrl = function() {
  var streamUrl = aFirst($("script"), onNodeHTML(extractStreamUrl));

  if (streamUrl) {
    return streamUrl;
  } else {
    throw "Can't figure out the stream URL, sorry...";
  }
};

var createBarLink = function(href, className, text) {
  var a = document.createElement("a");
  a.className = "pl-button " + className;

  var span = document.createElement("span");
  span.innerHTML = text;

  a.appendChild(span);
  a.href = href;

  return a;
};

var primaryBar = $("div.actions div.primary");
original = primaryBar.find(".pl-button.download");

if (original.length === 0 || original[0].tagName !== "A") {
  d("removing previous inactive download button (if there is any)");
  original.remove();

  d("looking up for stream url...");
  var stream = lookForStreamUrl();
  d("found stream url: ", stream);

  d("generating download element");
  var downloadLink = $(createBarLink(stream, "download", "Download (right click and select Save As to actually download it)"));
  downloadLink.click(function(e) { e.stopPropagation(); }); // prevent original live events

  d("download link generated", downloadLink);

  downloadLink.appendTo(primaryBar);

  d("new download link added");
}
