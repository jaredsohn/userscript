// ==UserScript==
// @name           Full GMail pages
// @namespace      laura-and-erik.com
// @description    Make links to a single gmail message go to a page in the "all mail" tag for the full conversation
// @include        https://mail.google.com/mail/?*
// ==/UserScript==

if ((/[&amp;?]th=/.test(window.location.href)) && (/[&amp;?]source=ig/.test(window.location.href))) {
  var newlocation = 'https://mail.google.com/mail/#all/' + 
           window.location.href.match(/[?&amp;]th=[0-9a-f]*/)[0].substr(4);
  window.location.href = newlocation;
}
