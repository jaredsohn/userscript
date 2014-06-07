// ==UserScript==
// @name           LessWrong Comment Score Tweaks
// @namespace      http://lesswrong.com/
// @description    Hide/show scores of comments at http://lesswrong.com/
// @include        http://lesswrong.com/*
// ==/UserScript==


function set_display(span, display) {
  if (display) {
    span.style.display = display;
  } else {
    span.style.display = (span.style.display === "none" ? "inline" : "none");
  }
}

/**
 * Change the visibility of all the span.votes elements by
 * setting their `display` style property to the passed
 * parameter value (if given) or if no parameter value 
 * is passed toggling 'none' to 'inline' or 'inline'
 * to 'none'.
 */
function change(display) {
  var i, len, spans = document.getElementsByTagName("span");
  for (i = 0, len = spans.length; i < len; ++i) {
    if (("" + spans[i].className).indexOf("votes") > -1) {
      set_display(spans[i], display);
    }
  }
}

// the accel keys don't work for me, but maybe they'll work for others.
GM_registerMenuCommand("Toggle Comment Scores", change, "t", "shift alt", "t");
GM_registerMenuCommand("Hide Comment Scores", function() { change("none"); }, "h", "shift alt", "h");
GM_registerMenuCommand("Show Comment Scores", function() { change("inline"); }, "s", "shift alt", "s");

