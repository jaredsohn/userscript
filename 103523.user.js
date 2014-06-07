// ==UserScript==
// @name           Times Colonist Paywall
// @namespace      http://userscripts.org/users/337735
// @description    Removes the TC pay wall.
// @include        http*://timescolonist.com/*
// @include        http*://*.timescolonist.com/*
// @match          http://timescolonist.com/*
// @match          http://*.timescolonist.com/*
// @match          https://timescolonist.com/*
// @match          https://*.timescolonist.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $("div").live("click", function(){
    if (($(this).attr("id") == "gregbox-outer") || ($(this).html() == "" && $(this).css("z-index") > 99997)) {
      $('#gregbox-outer').remove();
      $('a').each(function() {
        if ($(this).html() == "SIGN IN") {
          $(this).remove();
        }
      });
      $('img').each(function() {
        if ($(this).css("z-index") > 99998) {
          $(this).remove();
        }
      });
      $('div').each(function() {
        if ($(this).html() == "" && $(this).css("z-index") > 99997) {
          $(this).remove();
        }
      });
    }
  });
}

// load jQuery and execute the main function
addJQuery(main);
