// ==UserScript==
// @name           alltop search
// @namespace      martin ruiz
// @description    Search Alltop in the current topic
// @include        http://*.alltop.com/
// ==/UserScript==
var URL_LIMIT = 15;
var topDiv = document.body;

var searchDiv = document.createElement("div");
searchDiv.id = "search";
searchDiv.setAttribute('style',"position:relative;right:0;top:2px;width:980px;margin:0 auto;");
searchDiv.innerHTML = "<div style='position:absolute;right:0;'><input id='searchInput' type='text' value='Search Topic' onfocus=\"javascript:this.value=''\;\" size='25'/></div>";
topDiv.parentNode.insertBefore(searchDiv,topDiv);

document.getElementById('searchInput').addEventListener("keydown", 
		function(e) {
			if (e.keyCode == 13) submit();
		}, false);

function submit(o) {
	var query = document.getElementById("searchInput").value;
	var alltopNodes = getNodesByTagNameAndClass(
      document.body, "a", "snap_shots");

	if (alltopNodes.length==0) return;

	var hrefs = [];
	for (var i = 0, alltopNode; (alltopNode = alltopNodes[i]) && i<URL_LIMIT; i++) {
		var href = alltopNode.host + alltopNode.pathname;
		if (alltopNode.pathname.search(/\./)>-1) { href = alltopNode.host; }
		hrefs.push("site:"+href);
	}

	var q = "(" + hrefs.join(" OR ") + ")";
	GM_log(q)
	q = query + " " + q;
	q = "http://www.google.com/search?q=" + encodeURIComponent(q);

//	top.location = q;
	GM_openInTab(q);
}

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
