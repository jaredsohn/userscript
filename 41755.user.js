// ==UserScript==
// @name           Reddit Add ids
// @description    Adds ids to comment scores
// @author         hobophobe
// @include        http://www.reddit.com/comments/*
// @include        http://reddit.com/comments/*
// @include        http://www.reddit.com/user/*
// @include        http://reddit.com/user/*
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

// Add jQuery
//var GM_JQ = document.createElement('script');
//GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var IDed = $('.thing');
  for (var i = 0; i < IDed.length; i++)
  {
    if (IDed[i].className.indexOf('id-') == -1)
      continue;
    var classes = IDed[i].className.split(' ');
    var j = 0;
    for (; classes[j].indexOf('id-') == -1 && j < classes.length;j++);
    var score = $(".tagline .score", IDed[i])[0];
    if (score != null)
      score.id = 'score_' + classes[j].substring(3);
  }
}