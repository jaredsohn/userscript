// ==UserScript==
// @name          FREDrealAPIkey
// @namespace     knbknb.greasemonkey.org
// @description   On documentation web pages for the FRED econ-data API, replaces the String api_key=... with your real API Key, so you can cut+paste example codesnippets right away.
// @include        http://api.stlouisfed.org/*
// ==/UserScript==

//v 0.1 20101110
/********************************************************
 *                                                      *
 *                YOU MUST EDIT THIS ONE LINE           *
 *                                                      *
 ********************************************************/ 
var MY_API_KEY = "2f8ef8b1704e002796..........";
//END EDIT

var FRED_DUMMY_API_KEY = "abcdefghijklmnopqrstuvwxyz123456";
// Add jQuery

function importJs(url) {
  var script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js');
//maybe use this in future release 
//importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.js');

// Check if jQuery is loaded

function jQueryWait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(jQueryWait, 100);
  } else {
    //some other userscript may manipulate slashdot page with jQuery, 
    //so assign to this global var instead of $ variable

    jQy = unsafeWindow.jQuery;
    main();
  }
}
jQueryWait();

// Here comes the main function, called by jQueryWait ;-)

function main() {
  // aggressively delete all spans that are not comment-scores


  var changeit = function() {
    var tmp = jQy(this).text();
    var mykey = tmp.replace(FRED_DUMMY_API_KEY, MY_API_KEY, "g");
    jQy(this).text(mykey);
  };
  jQy("pre").each(changeit);


}