// ==UserScript==
// @name           FastLadderTako3
// @namespace      http://white.s151.xrea.com/
// @include        http://fastladder.com/subscribe/*
// ==/UserScript==

var feed_candidates = $X('id("feed_candidates")');

if(!feed_candidates.length) return;

var fastladder = 'http://fastladder.com/subscribe/'
var url   = location.href.replace(fastladder,'');
var tako3 = 'http://tako3.com/json/';
var place = document.getElementById('content-inner');

GM_xmlhttpRequest({
  method: 'GET',
  url: tako3 + url,
  onload:  function(res){
	  var create = function(name){return document.createElement(name);}
	  var tako3 = function(lst) {
		  if(!lst.length) return;
		  var holder = create('div');
		  holder.id  = 'GM_Fastladder_tako3';
		  place.appendChild(holder);
		  GM_addStyle('#GM_Fastladder_tako3 {padding: 30px;}');
		  lst.forEach(function(e){
			  var li = create('li');
			  var a  = create('a');
			  a.innerHTML = e;
			  a.href      = e;
			  var subscribe = create('a');
			  subscribe.innerHTML = 'subscribe';
			  subscribe.href      = fastladder + e
			  li.appendChild(subscribe);
			  li.appendChild(document.createTextNode(' '))
			  li.appendChild(a);
			  holder.appendChild(li);
		  });
		  var p = create('a');
		  p.href = 'http://tako3.com/';
		  p.innerHTML = 'powered by tako3';
		  holder.appendChild(p);
	  }
	  eval(res.responseText);
  },
  onerror: function(res){console.log(res)},
});

function $X(exp, context) {
	if (!context) context = document;
	var resolver = function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
	}
	var exp = document.createExpression(exp, resolver);
	var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
	  case XPathResult.STRING_TYPE : return result.stringValue;
	  case XPathResult.NUMBER_TYPE : return result.numberValue;
	  case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
	  case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
		  try{
			  result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		  }catch(e){
			  log(["error: ",e]);
		  }
		  var ret = [];
		  for (var i = 0, len = result.snapshotLength; i < len ; i++) {
			  ret.push(result.snapshotItem(i));
		  }
		  return ret;
	  }
	}
	return null;
}
