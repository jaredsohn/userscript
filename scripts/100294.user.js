// ==UserScript==
// @name        Rllmuk Post Ratings
// @namespace   https://github.com/insin/greasemonkey/
// @description Customisable post rating icons and messages, including negative ratings.
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// ==/UserScript==

if (window.location.href.indexOf('/index.php?showtopic=') == -1) {
  return;
}

// TODO Config UI and storage for these settings

var posRatings = [
  {score: 30, icon: 'http://www.rllmukforum.com/uploads/profile/photo-thumb-319.jpg', text: 'LEGENDARY'},
  {score: 20, icon: 'http://www.rllmukforum.com/uploads/av-83.jpg', text: 'GRAHAMAZING'},
  {score: 10, icon: 'http://www.choddo.co.uk/images/reddwhite.gif', text: 'CHODULAR'}
];

var negRatings = [
  {score: -10, icon: 'http://www.rllmukforum.com/uploads/av-16830.jpg', text: "FUGU'D UP"},
  {score: -20, icon: 'https://si1.twimg.com/profile_images/640505996/brucepalm_normal.png', text: 'BRUCEULAR'},
  {score: -30, icon: 'http://www.rodentproofaz.com/wp-content/themes/default/images/pigeon-thumb.png', text: 'CRUNCHY'}
];

var getRating = (function() {
  var memo = {};
  return function(score) {
    if (typeof memo[score] != 'undefined') {
      return memo[score];
    }

    var result = null;
    if (score >= 0) {
      // Check the positive ratings, high to low
      for (var i = 0, l = posRatings.length; i < l; i++) {
        var rating = posRatings[i];
        if (score >= rating.score) {
          result = rating;
          break;
        }
      }
    } else {
      // Check the negative ratings, low to high
      for (var i = negRatings.length - 1; i >= 0; i--) {
        var rating = negRatings[i];
        if (score <= rating.score) {
          result = rating;
          break;
        }
      }
    }
    if (result !== null) {
      memo[score] = result;
    }
    return result;
  };
})();

// Scores for all posts on the page
var scoreNodes = document.evaluate(
    '//span[contains(@class, "rep_show")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < scoreNodes.snapshotLength; i++) {
  var scoreNode = scoreNodes.snapshotItem(i);
  var postWrap = scoreNode.parentNode.parentNode;
  var score = parseInt(scoreNode.innerHTML.split(/\s+/g).join(''), 10);
  var rating = getRating(score);

  // Look for an existing rep highlight
  var repHighlight = postWrap.querySelector('p.rep_highlight');

  // If we don't have a rating...
  if (rating === null ) {
    // ...and a highlight exists, remove it...
    if (repHighlight !== null) {
      repHighlight.parentNode.removeChild(repHighlight);
    }
    // ...then we're done.
    continue;
  }

  // If we have a rating and a highlight doesn't exist, create and insert it
  if (repHighlight === null) {
    repHighlight = document.createElement('p');
    repHighlight.className = 'rep_highlight';
    var insertionTarget = postWrap.querySelector('div.post');
    insertionTarget.parentNode.insertBefore(repHighlight, insertionTarget);
  }

  // Insert custom rating
  repHighlight.innerHTML = '<img src="' + rating.icon + '"><br>' + rating.text;
}
