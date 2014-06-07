// ==UserScript==
// @name        iwatchRealLinks
// @namespace   david.newgas.net
// @description De-javascript the links on the I Watch Network
// @include     http://www.iwatch*.eu/*/*/
// @include     http://www.iwatch*.com/*/*/
// @version     1
// ==/UserScript==


links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
  if (links[i].parentNode.getAttribute('class') == 'src_in') {
    url = links[i].getAttribute('onclick').match(/playlink\(\'([^\']+)\'/)[1];
    links[i].setAttribute('href', unescape(url));
    links[i].removeAttribute('onclick');
  }
}