// ==UserScript==
// @name          Torrific ThePirateBay by BartekJot.
// @description	  Let's you download torrents with Torrific
// @author        BartekJot
// @include       http://thepiratebay.org/*
// @include       http://thepiratebay.se/*
// ==/UserScript==

// ==JQueryInjection==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// ==/JQueryInjection==

// ==MainFunction==
function JQuery() {

  var names    = $('div[class="detName"]');
  var torrents = $('a[href$=".torrent"], a[href*=".torrent?"');

  for (i=0; i<names.length; i++) {
    $('<a href="http://torrific.com/'+torrents[i].href+
      '" target="_blank" class="detDesc" title="Download using Torrific.com">'+
      '<b>T</b></a>').insertAfter(names[i]);
  }

}
// ==/MainFunction==

// ==JQueryExecution==
addJQuery(JQuery);
// ==/JQueryExecution==