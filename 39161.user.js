// ==UserScript==
// @name           Twitter Links - monetization prototype
// @namespace      martin ruiz
// @description    Add links for advertisers - Prototype for monetizing Twitter
// @include        *.twitter.com
// ==/UserScript==

/* just add keyword for advertiser and site address
 
 advertisers can buy keywords like their name and something that describes the products
 
 test the keywords below by typing the following search string in search.twitter.com
 kmart OR sneakers OR nike
 
 now note how the keywords in the results are links
 
 */
const advertisers = {
	'kmart':'http://www.kmart.com',
	'nike':'http://www.nike.com',
	'sneakers':'http://www.nike.com'
}

// regex [^@#]theadvertiser

var o = document.getElementById('results'); // for search.twitter.com
if (!o) {
	o = twitterTab(); // for twitter.com
}

if (!o) { return; } // sorry

var html = o.innerHTML;

var i = Iterator(advertisers);
for (var pair in i) {
GM_log(pair[0]);
    regex = new RegExp('[^@#]'+pair[0],'ig'); // don't match hashtags or twitter id's
	link = '<a href="'+pair[1]+'" target="_blank">'+pair[0]+'</a>';
	html = html.replace(regex, link);
}

o.innerHTML = html;

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    GM_log("Error when evaluating XPath expression '" + expression + "'" +
           ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  for (var xpathNode = xpathIterator.iterateNext(); 
       xpathNode; 
       xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }
    
  return results;
}

function getNodesByTagNameAndClass(rootNode, tagName, className) {
  var expression = 
      ".//" + tagName + 
      "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
  
  return evalXPath(expression, rootNode);
}

function twitterTab() {
	var exp = ".//div[contains(concat(' ', @class, ' '), ' tab ')]";
	try {
		var xpathIterator = document.evaluate(
		exp,
		document.body,
		null, // no namespace resolver
		XPathResult.ORDERED_NODE_ITERATOR_TYPE,
		null); // no existing results
	} catch (e) {
		GM_log("oops... "+exp+" ... no worky - "+e);
		return null;
	}
	// just take the first --- there should only be one
	return xpathIterator.iterateNext();
}