// ==UserScript==
// @name           Dict.org jump to definition
// @namespace      jlarue@pobox.com 2007-05-02
// @description    Jump down past the (long!) search boxes to the start of definitions on dict.org
// @include        http://www.dict.org/bin/Dict*
// @include        http://dict.org/bin/Dict*
// ==/UserScript==

// I use this along with a quick search, like so:
// Name: Dict.org quicksearch
// Location: http://www.dict.org/bin/Dict?Form=Dict2&Database=*&Query=%s
// Keyword: dd
// Description: Type "dd <word>" in the addressbar to perform a dictionary look-up

function selectNodes(xpath, elem){
	var results = document.evaluate(
		xpath, elem || document, null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)

	var nodes = new Array();
	var result = null;
	while(result = results.iterateNext()) nodes.push(result);
	
	return nodes;
}

function doIt() {
  var dictForm = selectNodes('//form[starts-with(@name,\'DICT\')]')[0];
  if (!dictForm) {return;}
  link = document.createElement('a');
  link.name = "defs";
  link.innerHTML = "&nbsp;";
  dictForm.parentNode.insertBefore(link, dictForm.nextSibling);
  location.hash = "defs";
}

doIt();
