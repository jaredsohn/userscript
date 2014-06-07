// ==UserScript==
// @name           Blogger antispam navbar
// @namespace      http://stiell.org/
// @description    Add "report spam blog" link and don't require javascript.
// @author         Stian Ellingsen
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @version        0.3
// @include        http://www.blogger.com/navbar.g?*
// ==/UserScript==

// Makes a link with given text.
var m = function(t) {
  var e = document.createElement('a'); e.setAttribute('class', 'b-link');
  e.textContent = t; return e;
};
// Find the flag and next links.
var b = document.getElementById('b-flag-this'),
  n = document.getElementById('b-next'), p = n.parentNode;
// If no flag link, insert a new one before next-blog link.
if (b == null) {
  b = m('Report Abuse');
  p.insertBefore(b, n);
  // JavaScript disabled, remove broken share link.
  var s = document.getElementById('b-share-this');
  if (s != null) p.removeChild(s);
}
// Prepare report URLs.
var u = ['http://www.google.com/support/blogger/bin/request.py?',
  '&blog_ID=' + /[?&]targetBlogID=([^&]+)/.exec(location.search)[1] +
  '&blog_URL=' + /[?&]homepageUrl=([^&]+)/.exec(location.search)[1]];
// Replace flag link's onclick with href.
b.removeAttribute('onclick');
b.setAttribute('href', u[0] + 'page=main_tos' + u[1]);
// Add a link to report spam blogs.
var a = m('Report Spam Blog');
a.setAttribute('href', u[0] + 'contact_type=spam' + u[1]);
// Insert right after the flag link.
p.insertBefore(a, n);
