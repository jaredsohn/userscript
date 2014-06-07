// Google Lucky Links On Demand
// Version 0.2.0
// 2005-10-08
// Copyright (c) 2005, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Google Lucky Links OnDemand
// @namespace     http://
// @description   Remplace text with google lucky links on key press
// @include       http://*
// @exclude       https://mail.google.com/*
// @exclude       http://userscripts.org/scripts/*
// ==/UserScript==
var minl=4;
var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
var excludelist = "of|the|this|that|where|when|in|out|was|found|have|really|because|course|could|around|appears|apply|story|original|without|relation|states|allows|there|about|giving|stopped|gives|using|other|better|similar|earlier|begin|before|based|which|itself|today|year|whole|while|further|become|became|started|longer|enough|stating|first|right|should";
var regexcl=new RegExp(excludelist, "i");
var mlist=new Array();

function adad(elm,txt,mURL){
 var nadd = document.createElement('A');
 nadd.setAttribute('href',mURL+txt);
 nadd.style.color='inherit';
 nadd.style.textDecoration='none';
 nadd.style.borderBottom='dotted 1px gray';
 elm.parentNode.insertBefore(nadd,elm);
 var celm=elm.cloneNode(true);
 nadd.appendChild(celm);
 celm.nodeValue=txt;
}
function adtx(elm,txt){
 var celm=elm.cloneNode(true);
 elm.parentNode.insertBefore(celm,elm);
 celm.nodeValue=txt;
}
function ggize(elm,mURL){
	var txt=elm.nodeValue;
	var txts=txt.split(' ');
	var nt=txts.length;
	var ctxt;
	for (var j=0; j<nt; j++){
		ctxt=txts[j];
		if (ctxt.length>minl && ctxt!=ctxt.match(regexcl)){
	   adad(elm,ctxt,mURL); 
	 }else{
	  adtx(elm,ctxt);
	 }
	 adtx(elm,' ');
 }
 elm.parentNode.removeChild(elm);
}
function digger(mURL) {
  var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";
  var textnodes = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
	 ggize(node,mURL);
  }
}
function doclick(event) {
    //A -Z         65 -90
    //alert(event.keyCode)
    switch (event.keyCode){
      case 65: digger('http://search.about.com/fullsearch.htm?terms='); break;
      case 66: digger('http://buy.ebay.com/'); break;
      case 67: digger('http://www..com/'); break;
      case 68: digger('http://www.thefreedictionary.com/'); break;
      case 69: digger('http://everything2.com/?node='); break;
      case 70: digger('http://www.feedster.com/search.php?q='); break;
      case 71: digger('http://www.google.com/search?btnG&hl=en&q='); break;
      case 72: digger('http://www..com/'); break;
      case 73: digger('http://www.google.com/search?hl=en&btnI=Im+Feeling+Lucky&q='); break;
      case 74: digger('http://www..com/'); break;
      case 75: digger('http://www..com/'); break;
      case 76: digger('http://www.bloglines.com/search?t=1&FORM=QBRE&q='); break;
      case 77: digger('http://search.msn.com/results.aspx?q='); break;
      case 78: digger('http://www.technorati.com/tag/'); break;
      case 79: digger('http://www..com/'); break;
      case 80: digger('http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?CMD=search&DB=pubmed&term='); break;
      case 81: digger('http://www..com/'); break;
      case 82: digger('http://search.wired.com/wnews/default.asp?query='); break;
      case 83: digger('http://www.answers.com/'); break;
      case 84: digger('http://www.technorati.com/tag/'); break;
      case 85: digger('http://www..com/'); break;
      case 86: digger('http://www..com/'); break;
      case 87: digger('http://en.wikipedia.org/wiki/'); break;
      case 88: digger('http://www..com/'); break;
      case 89: digger('http://www..com/'); break;
      case 90: digger('http://a9.com/'); break;
      default:
  }
  event.preventDefault();
}
document.addEventListener('keydown',doclick,true);
