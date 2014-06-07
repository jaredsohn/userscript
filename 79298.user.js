// ==UserScript==
// @name         StackOverflow Vote-splitter
// @namespace    stackoverflowVotesplitter
// @include      http://stackoverflow.com/*
// @include      http://superuser.com/*
// @include      http://serverfault.com/*
// @datecreated  2010-06-16
// @lastupdated  2010-06-17
// @version      0.1
// @author       Janne Vaittinen
// @license      GPL version 3; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will load the split-votes for a question and each answer on the 'trilogy' sites.
// ==/UserScript==

(function(d){
  //boilerplate greasemonkey to wait until jQuery is defined on target page...
  function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
      unsafewindow.setTimeout(GM_wait, 100);
    } else {
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
    }
  }
  GM_wait();

  function letsJQuery($) {
    function doNextSplitAndRepeat() {
      $($('span.vote-count-post:not(:has(div))')[0]).click();
      if ($('span.vote-count-post:not(:has(div))').size() > 0) {
        window.setTimeout(doNextSplitAndRepeat, 1050);
      }
    };

    doNextSplitAndRepeat();
  }
})(document);