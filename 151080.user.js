// ==UserScript==
// @id             arstechnica_vote_color_changer@phob.net
// @name           Ars Technica Vote Color Changer
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Flip the "negative" and "positive" colors of an Ars Technica comment score
// @include        http://arstechnica.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/151080.meta.js
// ==/UserScript==


// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(aSource) {
  if ("function" == typeof(aSource)) aSource = "(" + aSource + ")();";

  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = aSource;

  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {
// Create temp elements to extract the colors from CSS
var $aside = $("<aside class='vote'>").hide().appendTo("body")
  , $span = $("<span class='neg'></span>").appendTo($aside)
  , negColor = $span.css("color")
  , posColor
  , sty;

$span = $("<span class='pos'></span>").appendTo($aside);
posColor = $span.css("color");

// Clean up
$aside.remove();

// Add a style node to flip the negative and positive colors
// NOTE:  This would be the place to put in your own custom colors...
sty = document.createElement("style");
sty.type = "text/css";
sty.textContent = "aside.vote span.neg, .megavote span.neg { color: " + posColor + " } "
                + "aside.vote span.pos, .megavote span.pos { color: " + negColor + " }";
document.body.appendChild(sty);
}); // end of call to contentEval
