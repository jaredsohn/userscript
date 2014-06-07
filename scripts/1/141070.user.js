// ==UserScript==
// @name           GitHub Fit Screen
// @namespace      http://jreptak.com
// @description    Makes GitHub code viewer as wide as your screen!
// @version        1.5
// @match          http://github.com/*
// @match          https://github.com/*
// ==/UserScript==


var main = function () {
  var ghresize = function (options) {
      var ghwid = $("div#wrapper").width()
        , extra = $("span.repo-label").width() * 2;

      if(options && options.debug) {
        console.log("Resizing");
      }

      $("div.container.hentry").width(ghwid - extra);
      
      $("div.frame.frame-center").width(ghwid - extra);

      var old_frame = $("div.frame:not(div.frame.frame-center):not(div.frame.frame-loading)");

      if(old_frame.css("margin-left") == "0px") {
        old_frame.css("margin-left", 0);
      } else {
        old_frame.css("margin-left", -ghwid);
      }
  };
  
  $("#slider").bind("slid", function() {
       setTimeout(function() { ghresize(); }, 0);
setTimeout(function() { ghresize(); }, 500);
  });

  $(window).ready(function () {
    ghresize();
  });

  $(window).resize(function() {
    ghresize();
  });
};


// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);