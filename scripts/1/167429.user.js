// ==UserScript==
// @name        no-three-liners
// @namespace   no-three-liners
// @include     http://www.guokr.com/group/48/
// @version     0.4

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

function main() {
  jQ(".titles").find('li').each( function (_, e) {
        var t = jQ(e).find('h3').text();
        if (t.match(/三行情诗#/) && ( jQ(e).find('a')[0].href != "http://www.guokr.com/post/456931/") ) {
                jQ(e).toggle();
        }
    }
)}
addJQuery(main);
// ==/UserScript==