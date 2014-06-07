// ==UserScript==
// @name       Die Index Overlay
// @namespace  http://userscripts.org/scripts/show/430212
// @version    0.2
// @description  Makes index.hu usable.
// @match      http://index.hu/*
// @copyright  2012+, You
// ==/UserScript==


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

  // Turn the links into direct links.
    jQ('a').attr('href', function(i, href) {
        return decodeURIComponent(href.replace('http://index.hu/x.php?id=inxinx2&url=', ''));
    });

    // Remove the overlay class from the blog.hu links to prevent overlay from triggering.
  jQ('a.overlay_link').removeClass('overlay_link');

}

var Index2 = function() {};
// load jQuery and execute the main function
addJQuery(main);
