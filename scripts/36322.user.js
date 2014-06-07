// ==UserScript==
// @name           Digsby Full Gmail
// @namespace      http://www.imsethstevenson.com
// @description    Redirects single messages from digsby (and others) to their full view in gmail.
// @include        http://mail.google.com/mail/?*
// @include        https://mail.google.com/mail/?*
// ==/UserScript==

if (/[&amp;?]view=cv/.test(window.location.href)) {
  var newlocation = 'https://mail.google.com/mail/#inbox/' + 
           window.location.href.match(/[?&amp;]th=[0-9a-f]*/)[0].substr(4);
  window.location.href = newlocation;
}