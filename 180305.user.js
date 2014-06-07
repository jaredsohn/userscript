// ==UserScript==
// @name        Raven
// @namespace   http://cloud.feedly.com
// @include     /^https?://cloud\.feedly\.com/.*$/
// @description Scroll the left pane to the selected tag or feed.
// @version     1.0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://mutation-summary.googlecode.com/git/src/mutation-summary.js
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var observer = new MutationSummary({
  callback: rowYourBoat,
  queries: [
    { element: "div.header", elementAttributes: "class" },
    { element: "div.feedIndex", elementAttributes: "class" }
  ]
});

function rowYourBoat(summaries) {
  summaries.forEach(function(summary) {
    summary.attributeChanged.class.every(function(element) {
      if (element.classList.contains("target") && element.classList.contains("selected")) {
        element.scrollIntoView();
        return false;
      }
      return true;
    });
  });
}

