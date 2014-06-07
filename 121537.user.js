// ==UserScript==
// @name           IMDB Ratings for Telkku.com
// @namespace      http://skream.org/greasemonkey/
// @description    Fetches IMDB ratings to Telkku.com
// @include        http://telkku.com/*
// @include        http://www.telkku.com/*
// @version        1.1
// ==/UserScript==

PATH_TO_IMDB_LINK = "//*[@id='programActionBar']/ul/li[2]/a";

var previous_imdb_link = "";

/* Copied from http://wiki.greasespot.net/XPath_Helper */
function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

function process_IMDB_title_page(response)
{
	var matches = response.responseText.match(/itemprop="ratingValue">(\d\.\d)/);
	GM_log("IMDB rating: "+ matches[1]);

	var imdb_link = $x(PATH_TO_IMDB_LINK, XPathResult.FIRST_ORDERED_NODE_TYPE);
	imdb_link.innerHTML = imdb_link.innerHTML.replace(/IMDB \(.*\)/, "IMDB ("+matches[1]+"/10)");
}

function process_IMDB_search_page(response)
{
	var matches = response.responseText.match(/\/title\/(\w+)/);
	if (!matches) {
	  GM_log('Search IMDB failed: title not found');
	  var imdb_link = $x(PATH_TO_IMDB_LINK, XPathResult.FIRST_ORDERED_NODE_TYPE);
	  imdb_link.innerHTML = imdb_link.innerHTML.replace(/IMDB \(.*\)/, "IMDB (?)");
	  return;
	}
	var url = "http://www.imdb.com" + matches[0];
	GM_log("IMDB title url: "+url);

	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: process_IMDB_title_page
	});
}

function process_telkku()
{
	var imdb_link=$x(PATH_TO_IMDB_LINK, XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (!imdb_link)
		return;

	var url = "" + imdb_link;
	if (!url.match(/imdb.com/))
		return;

	if (imdb_link.innerHTML.match(/IMDB \(/))
		return;
		
	imdb_link.innerHTML = imdb_link.innerHTML.replace(/IMDB/, "IMDB (..)");

	setTimeout(function() {
		GM_log("Search IMDB url: "+url);
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: process_IMDB_search_page
		});
	}, 0);
}

process_telkku();
document.addEventListener("DOMNodeInserted", process_telkku, false);