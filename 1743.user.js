// Google Lucky Links
// Version 0.2.0
// 2005-10-08
// Copyright (c) 2005, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Google Lucky Links
// @namespace     http://
// @description   Remplace text with google lucky links
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
  for (var i=0; i<textnodes.snapshotLength;i++){
   node = textnodes.snapshotItem(i);
	 ggize(node,mURL);
  }
}

digger('http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=');
