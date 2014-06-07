// ==UserScript==
// @name          Style tag links in comments as normal tags for any SE site.
// @namespace     http://2718.us/
// @description	  Style tag links in comments as normal tags for any SE site.
// @include       http://*.stackexchange.com/*
// @include       http://*stackoverflow.com/*
// @include       http://*serverfault.com/*
// @include       http://*superuser.com/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


// ----- based on http://stackoverflow.com/questions/2246901/include-jquery-inside-greasemonkey-script-under-google-chrome/3550261#3550261
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	jQuery.noConflict();
	jQuery('div.comments a[href*="/questions/tagged/"]').addClass('post-tag');
}

// load jQuery and execute the main function
addJQuery(main);
