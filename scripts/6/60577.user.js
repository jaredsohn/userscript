// ==UserScript==
// @name		   Makes coords of your villages as target for trade/rally (v1.1)
// @version 	   1.1
// @date          2009-06-16
// @author        Anton Fedorov <datacompboy@a-koss.ru>
// @include       http://*.travian.*/*
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2009
// Clan S4 <KazakiYuV2>.

(function(){
  getElementsByClass = function (searchClass,node,tag) {
	  var classElements = new Array();
	  if ( node == null )
		  node = document;
	  if ( tag == null )
		  tag = '*';
	  var els = node.getElementsByTagName(tag);
	  var elsLen = els.length;
	  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	  for (var i = 0, j = 0; i < elsLen; i++) {
		  if ( pattern.test(els[i].className) ) {
			  classElements[j] = els[i];
			  j++;
		  }
	  }
	  return classElements;
  }

  var f = document.forms[0]; if (f.wrappedJSObject) f=f.wrappedJSObject;
  if (f && f.x && f.y) {
	var lr = document.getElementById("lright1");
	if (!lr) lr = document.getElementById("vlist");
	var as = lr.getElementsByTagName("a");
	for (var i=as.length-1; i>=0; i--) {
	  var url = as[i].getAttribute('href');
	  if (url) {
		var m=url.match(/[?]newdid=([0-9]+)/);
		if (m && m[1]) {
		  var tbl = as[i].parentNode ? as[i].parentNode.parentNode : as[i].parentElement.parentElement;
		  var xcoord = getElementsByClass("dlist1", tbl, "td")[0]; if (!xcoord) xcoord = getElementsByClass("cox", tbl)[0];
		  var ycoord = getElementsByClass("dlist3", tbl, "td")[0]; if (!ycoord) ycoord = getElementsByClass("coy", tbl)[0];
		  var x = parseInt(xcoord.innerHTML.substr(1));
		  var y = parseInt(ycoord.innerHTML);
		  var c = document.createElement("a");
		  c.setAttribute("href", "#");
		  var cc = c.wrappedJSObject ? c.wrappedJSObject : c;
		  cc.onclick = (function(f,x,y){ return function() { f.x.value = x; f.y.value = y; return false; } })(f,x,y);
		  c.innerHTML = xcoord.innerHTML;
		  xcoord.innerHTML = ""; xcoord.appendChild(c);
		  c = document.createElement("a");
		  c.setAttribute("href", "#");
		  var cc = c.wrappedJSObject ? c.wrappedJSObject : c;
		  cc.onclick = (function(f,x,y){ return function() { f.x.value = x; f.y.value = y; return false; } })(f,x,y);
		  c.innerHTML = ycoord.innerHTML;
		  ycoord.innerHTML = ""; ycoord.appendChild(c);
		}
	  }
	}
  }

})();
