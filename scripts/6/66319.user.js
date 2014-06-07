// ==UserScript==
// @name QUT Blackboard Unwrapper 2
// @description Unwrap the links on the QUT Blackboard v9.0 site, allowing you save resources links directly.
// @version 1.3
// @include http://blackboard.qut.edu.au/*
// ==/UserScript==

// get all links from the document
var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; i++)
{
	var link = links.snapshotItem(i);
	
	var href = link.href;
  if (href.indexOf('contentWrapper.jsp') == -1 || href.indexOf('href') == -1)
    continue;
  
  // http://blackboard.qut.edu.au/webapps/blackboard/content/contentWrapper.jsp?[...]href={URL}
  var url = decodeURI(href.substring(href.indexOf('href') + 5));
	var isExternalLink = ((url.indexOf('http') != -1) || (url.indexOf('https') != -1));

  // rewrite url
  if (isExternalLink)
  {
    var externalUrl = decodeURI(url.substring(url.indexOf('href') + 7));

    // hack: manually decode url
    externalUrl = externalUrl.replace(/%3A/g, ':').replace(/%2F/g, '/');

    GM_log("External log: " + externalUrl);
    link.href = ('http://' + externalUrl.substring(7));
  }
  else
  {
    link.href = ('http://blackboard.qut.edu.au' + url);
  }
  
}

// end