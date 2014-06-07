// ==UserScript==
// @name           Price.ru
// @namespace      test
// @include        http://www.price.ru/
// @description   This script looks at the list of links at Price.Ru and makes the links to the resalers sites to be direct
// ==/UserScript==
(function() {
  var links = document.links;
	var linkId;
	var linkInfo;
  for(i = 0; i < links.length; i++) {
    link = links[i];
    if(link.href.match(/_url_\=/)) {
			linkInfo = link.href.split(/_url_\=/);
			linkId = linkInfo[1];
			linkInfo = linkId.split(/&/);
			linkId = linkInfo[0];
			linkInfo = linkId.split(/http%3A%2F%2F/);
			linkId = linkInfo[1];
			link.href = 'http://'+linkId;
    }
  }
})();






