// ==UserScript==
// @name       Interactive Website destructor
// @namespace  interactive-website-destructor
// @version    0.2
// @description  Just a funny website destruction script
// @include    http*://*/*
// @copyright  2012+, buzz
// @license    GPLv2
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
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

function main() {
  $("body *:not(script):not(style):not(:hidden)").live('mouseenter', function() {
    function css($el, name, value) {
      $.each(['-webkit-', '-moz-', '-o-'], function() {
        $el.css(this + name, value);
      });
    }

    css($(this), "transform-origin", origin + "%");
    var origin = Math.floor(Math.random()*100);
    switch(Math.floor(Math.random()*4)) {
      case 0:
        var degree = Math.floor(Math.random() * 20) - 10;
        css($(this), "transform", "rotate(" + degree + "deg)");
        break;
      case 1:
        var x = 1.15 - Math.random() * 0.3; var y = 1.15 - Math.random() * 0.3;
        css($(this), "transform", "scale(" + x + "," + y + ")");
        break;
      case 2:
        var degree = Math.floor(Math.random() * 40) - 20;
        css($(this), "transform", "skew(" + degree + "deg)");
        break;
      case 3:
        var x = Math.floor(Math.random() * 100); var y = Math.floor(Math.random() * 100);
        css($(this), "transform", "translate(" + x + "px," + y + "px)");
        break;
    }
  });
}

// load jQuery and execute the main function
addJQuery(main);
