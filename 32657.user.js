// ==UserScript==
// @name          MediaWiki Image Redirecter
// @namespace     aeosynth
// @description   Redirects image description page to full resolution image on sites using MediaWiki (i.e. Wikipedia)
// @include       */Image:*
// @include       *=Image:*
// @include       */File:*
// @include       *=File:*
// @version       1.0.0
// @copyright     2010, James Campos
// @license       WTFPL; http://sam.zoy.org/wtfpl/COPYING
// ==/UserScript==

/*jslint white: true, browser: true, undef: true, indent: 2 */
var picture = document.getElementById('file');
if (picture.className == 'fullImageLink') {
  var source = picture.getElementsByTagName('a')[0];
  if (source) {
    location.replace(source.href);
  } else {
    source = picture.getElementsByTagName('IMG')[0].src;
    location.replace(source);
  }
}
