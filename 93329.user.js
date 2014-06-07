// ==UserScript==
// @name           GMTinySegmenter
// @namespace      yktmt.com
// @include        http://*
// @require        http://chasen.org/~taku/software/TinySegmenter/tiny_segmenter.js
// ==/UserScript==

var segmenter = new TinySegmenter();

function Segment(text){
  var ary = segmenter.segment(text);  
  var result = ary.join(" | ");
  return result;
}

document.addEventListener("dblclick", function(e){
	var tlist = e.target.childNodes;
	for(var i=0; i<tlist.length; i++){
		if( tlist[i].nodeType == 3 && tlist[i].nodeValue.match(/[あ-ん]/) ){
			var r = Segment(tlist[i].nodeValue);
			var o = document.createTextNode(r);
			tlist[i].parentNode.replaceChild(o,tlist[i]);
		}
	}
}, false);
