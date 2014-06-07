// ==UserScript==
// @name          Gone Phishing
// @namespace     http://menno.b10m.net/greasemonkey/
// @description   Show real links, not phishing attempts
// @include       http://*
// @include       https://*
// ==/UserScript==


var links, link;
links = document.evaluate(
   '//a[@href]',
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

for (var i = 0; i < links.snapshotLength; i++) {
   a = links.snapshotItem(i);
   if(a.textContent.match(/http:\/\//)) {
      var text_serv = a.textContent.match(/http:\/\/([^\/]+).*$/);
      var link_serv = a.href.match(/http:\/\/([^\/]+).*$/);

      if(text_serv[1] && link_serv[1] && 
         text_serv[1].toLowerCase() != link_serv[1].toLowerCase()) {
	 span = document.createElement('span');
	 a.parentNode.insertBefore(span, a.nextSibling);
	 span.textContent = " ***"
	 span.title = "Original linked text was: "+a.textContent;
	 span.style.backgroundColor = 'yellow';
	 a.style.backgroundColor = 'yellow';
         a.textContent = a.href;
      }
   }
}
