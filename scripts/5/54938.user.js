// ==UserScript==
// @name           StackOverflow Interesting Tags First
// @namespace      SOINTTAGS
// @description    Moves all interesting tags to the top of the queue, and ignored tags to the bottom.
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://meta.serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.superuser.com/*
// @include        http://meta.superuser.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/*
// @include        http://stackexchange.com/*
// @include        http://*.stackexchange.com/*
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  var executeMove = function() {
    try { $('.question-summary.tagged-ignored').insertAfter('.question-summary:not(.tagged-ignored):last'); } catch(all) {}
    try { $('.question-summary.tagged-interesting').insertBefore('.question-summary:not(.tagged-interesting):first'); } catch(all) {}
  };
  
  // Let js execute SO code
  setTimeout(executeMove, 0);
});
