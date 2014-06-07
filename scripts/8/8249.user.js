// ==UserScript==
// @name           Test Case shows a document cannot load itself into an IFRAME
// @namespace      ~rmm
// @description    It seems Firefox blocks a document from loading itself as an IFRAME even if the two docs have a different location.hash
// @include        *
// ==/UserScript==

if (document.location.hash.match('#noIframes')) return;
dum = document.createElement('div');
dum.innerHTML
 = '<div><iframe src=' + document.location + '#noIframes">an IFRAME shoul be here</iframe>'
 + '<iframe src="http://www.google.com">an IFRAME shoul be here</iframe></div>;
document.body.appendChild(dum.firstChild);



