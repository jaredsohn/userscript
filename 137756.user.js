// ==UserScript==
// @name Sentinel Cleaner
// @version 1.2
// @author Matt Slack
// @description Clears out a bunch of visual crap (including some ads) from the Holland Sentinel website.
// @include http://www.hollandsentinel.com/*
// ==/UserScript==

// Chrome does not support @require
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function cleanup(){
  $('#top_header, #masthead .float_r').hide();
  $('#dyn_street_content, #s_tool, #hot_links').remove();
  $('.story').css({clear: 'both','font-size': '20px', 'line-height': 1.6});

  $('iframe, #s_ndn').hide();
}

function init(){
  if (typeof(jQuery) != "undefined"){
    cleanup();
  } else {
    addJQuery(cleanup);
  }
}

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    init();
    clearInterval(readyStateCheckInterval);
  }
}, 10);

