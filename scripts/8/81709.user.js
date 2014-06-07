// ==UserScript==
// @name           Remove Tumblr's Editor Controls and Upload Photo option
// @description    Remove some unused features when posting to Tumblr
// @lastupdated    2010-07-17
// @namespace      ZUbu2JudC6
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6
// @include        http://www.tumblr.com/new/text
// @include        http://www.tumblr.com/new/photo
// @include        http://www.tumblr.com/new/quote
// @include        http://www.tumblr.com/new/link
// @include        http://www.tumblr.com/new/audio
// @include        http://www.tumblr.com/new/video
// ==/UserScript==

// You must disable the Rich Text Editor first. Go to Account, Preferences, and
// select either Plain Text/HTML or Markdown. This way you can still use HTML
// or Markdown when editing, you just won't have the bar.

// Disable Editor Controls
var rmeditor = document.getElementsByClassName('editor_controls')[0];
if (rmeditor) {rmeditor.parentNode.removeChild(rmeditor);}

// Disable Upload Photo option - this will only affect /new/text/
// Useful if you don't want to use Tumblr's image hosting feature.
var rmphotoup = document.getElementById('regular_form_inline_image_iframe');
if (rmphotoup) {rmphotoup.parentNode.removeChild(rmphotoup);}