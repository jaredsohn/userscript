// ==UserScript==
// @name JeRepublik hrvatski prijevod
// @namespace Jinchy
// @description JeRepublik hrvatski prijevod
// @include http://www.erepublik.com/J
// ==/UserScript==

// ['Initial match', 'Pattern to grab from match', 'function to replace with']
var matches = { 
  f1 : ["\\d{10}", "(\\d{3})(\\d{3})(\\d{4})", function(a, n1, n2, n3){return "("+n1+") "+n2+"-"+n3;}],
  f2 : ["\\d{11}", "(\\d{3})(\\d{4})(\\d{4})", function(a, n1, n2, n3){return n1+' - '+n2+' - '+n3;}]
};

var numberCheck = function(node, mtches){

  var result = [],
  regMtch = new RegExp(mtches[0]), // Initial match
  regRep = new RegExp(mtches[1]), // To replace pattern
  matchFn = mtches[2]; // With
  
  var check = function(text){
    var mtch = text.match(regMtch);
	if (mtch) result.push(mtch[0].replace(regRep, matchFn));
  };
  
  (function walkDom(node){
	if (node.nodeType === 3 && !/\n/.test(node.nodeValue)) check(node.nodeValue);
	node = node.firstChild;
	while (node){
		walkDom(node);
		node = node.nextSibling;
	}
  }(node))
  
  return result;
};
alert(numberCheck(document, matches.f1));
document.write('<span style="font-weight:bold;font-size:20px;font-family:arial;">' + numberCheck(document, matches.f1) + '</span>');
// ["(954) 630-2299", "(954) 630-2299", "(020) 769-6969", "(020) 822-2444", "(020) 896-9669", "(459) 620-3922"]