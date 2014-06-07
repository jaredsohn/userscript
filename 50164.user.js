// ==UserScript==
// @name          Down for everyone?
// @namespace     http://chrisroos.co.uk/
// @description   Inserts a link to downforeveryoneorjustme.com in the 'Page not found' error page, making it really easy to check whether the connection problems are local to you.
// @include       *
// ==/UserScript==

if (/^about:neterror/.test(document.documentURI)) { // 
  downforjustmeLink = document.createElement('a');
  downforjustmeLink.setAttribute('href', ['http://downforeveryoneorjustme.com', location.href].join('/'));
  downforjustmeLink.appendChild(document.createTextNode('(Down for everyone?)'));
  document.getElementById('errorTitleText').appendChild(document.createTextNode(' '));
  document.getElementById('errorTitleText').appendChild(downforjustmeLink);
}