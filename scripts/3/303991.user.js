// ==UserScript==
// @name       Amazon Prime Video
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Removes the "Buy with 1-Click" option for movies that are accessible via Prime Instant Video
// @include          http://www.amazon.*/*
// @exclude        http://www.amazon.*/gp/cart/*
// @exclude		   http://www.amazon.*/aan/*
// @copyright  2012+, You
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
    if(jQ("#dv-playback-button-container").length){
        jQ(".buy-box-content").hide();
        newDiv = '<div class="divider-title"><p></br></p></div>';
        jQ("#dv-side-box-container").append(newDiv);
        //jQ(document.body).css("background-color", "gray");
    }
}

// load jQuery and execute the main function
addJQuery(main);