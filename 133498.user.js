// ==UserScript==
// @name         mercurial-stay-on-tip
// @version      0.1
// @description  Provide changes links to tip version in Mercurial web interface if you are navigating from the tip version.
// @author       Keegan Witt
// @include      http://hg.openjdk.java.net/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement('script');
  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var pathname = window.location.pathname;
    if (pathname.indexOf("/tip/") >= 0 && pathname.indexOf("/log/") < 0) { // don't run if not navigating from tip or if viewing log
        var links = $('table:first > tbody > tr > td > a');
        for (var i = 0; i < links.length; i++) {
            links[i].href = links[i].href.replace(/\/file\/[^\/]+\//, '/file/tip/');
            links[i].href = links[i].href.replace(/\/log\/[^\/]+\//, '/log/tip/');
            links[i].href = links[i].href.replace(/\/annotate\/[^\/]+\//, '/annotate/tip/');
        }
    }
}

// load jQuery and execute the main function
addJQuery(main);
