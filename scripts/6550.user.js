// ==UserScript==
// @name           cuteoverload copy scrub
// @namespace      http://mywebsite.com/myscripts
// @description    Delete all the annoying copy on cuteoverload.com
// @include        http://mfrost.typepad.com/cute_overload/
// ==/UserScript==

var paragraphs = document.getElementsByTagName('p');
for (var i = 0; i < paragraphs.length; i++) {
  var children = paragraphs[i].childNodes;
  for (var j = 0; j < children.length; j++) {
    if (children[j].tagName != 'A' && children[j].tagName != 'OBJECT') {
      paragraphs[i].innerHTML = '';
    }
  }
}

var headers = document.getElementsByTagName('h3');
for (i = 0; i < headers.length; i++) {
  if (headers[i].className == 'entry-header') {
    headers[i].innerHTML = '&nbsp;';
  }
}