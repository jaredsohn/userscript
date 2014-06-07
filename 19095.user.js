// ==UserScript==
// @name          About.com Cleanup
// @description   Remove ads, make outgoing links direct, remove extraneous elements.
// @include       *about.com*
// ==/UserScript==

// This is a straight-up copy of Paul 1's script:
// http://userscripts.org/scripts/show/2415
// The changes are all in the userstyle variable.  I've added comments so that
// I know where each element is, and have added a couple of items to be
// removed - such as the author bit.  It'll be updated whenever I find new
// cruft in About.com.


// addGlobalStyle from diveintogreasemonkey.
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

// Set most (hopefully all) inline ads to not display with css.
var userstyle;

userstyle =
      '.ad {display: none;}\n'       // A secret frame.  They're so sneaky.
    + '#adB {display: none;}\n'      // That big advert box at the top right.
//  + '#adL {display: none;}\n'
//  + '#adF {display: none;}\n'
    + '#gB1 {display: none;}\n'      // In-article sponsors.
    + '#gB2 {display: none;}\n'      // Sponsored links at the bottom.
    + '#gB3 {display: none;}\n'      // In-article sponsors.
//  + '#gB4 {display: none;}\n'
    + '#gB5 {display: none;}\n'      // Sponsored search-result links.
//  + '#gB6 {display: none;}\n'
//  + '#adT {display: none;}\n'
//  + '#ip0 {display: none;}\n'
//  + '#lbp {display: none;}\n'
    + '#btmLBs {display: none;}\n'   // Related articles at the bottom.
    + '#col4 {display: none;}\n'     // "More" column in an article.
    + '#col34 {display: none;}\n'    // "More" column in an article.
    + '#oC {display: none;}\n'       // Farmost column in an article.
    + '#gh {display: none;}\n'       // Author section, 'twixt title and content.
//  + '#bb {display: none;}\n'
//  + '#hpBmT {display: none;}\n'
//  + '#m9 {display: none;}\n'
//  + '#c4 * {border: 1px solid black; display: none;}\n'
//  + '#nl {display: none;}\n'
;
addGlobalStyle(userstyle);

// Remove ads from frames when links are clicked.
// This is a bit more tricky since they use frames.
// Instead of messing with the css, we just remove the element by id.

var framedads = document.getElementById('osT1');
if (framedads) {
  framedads.parentNode.removeChild(ads);
}

// Rewrites outgoing links in directory to not use frames with ads, replaces
// with a direct link.

var linkx;
for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  if (linkx.href.indexOf("zu=") != -1) {
    linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("zu=") + 3));
  }
}

// Same as above but for outgoing links in blogs.
for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  if (linkx.href.indexOf("offsite.htm?site=") != -1) {
    linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("offsite.htm?site=") + 17));
  }
}
