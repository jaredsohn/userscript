// ==UserScript==
// @name           CraigsList Title Only
// @namespace      http://arantius.com/misc/greasemonkey/
// @description    Always search by title only, on CraigsList.  Everyone keyword stuffs the posts, anyway!
// @include        http://*.craigslist.org/*
// ==/UserScript==

if ('/' == document.location.pathname) {
  var srchType = document.createElement('input');
  srchType.setAttribute('name', 'srchType')
  srchType.setAttribute('value', 'T');
  srchType.setAttribute('type', 'hidden');
  document.getElementById('search').appendChild(srchType);
} else {
  if ('' == document.getElementById('query').value) {
    document.getElementsByName('srchType')[0].checked = true;
  }
}
