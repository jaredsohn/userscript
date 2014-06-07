// ==UserScript==
// @name           Muxtape Remembers Download
// @creator        Xavi Esteve
// @namespace      http://www.xaviesteve.com
// @description    Bring Muxtape to life again by making the remember list into clickable links that searches the song directly into SkreemR
// @include        http://muxtape.com/remembers/*
// @version        1.3
// ==/UserScript==

(function() {
	var list_items = document.getElementsByTagName('li');
	for (var i=0; i<list_items.length; i++){
	   var query = escape(list_items[i].innerHTML);
	   query = query.replace("%20%u2014",""); 
	   list_items[i].innerHTML = '<a href="http://skreemr.com/results.jsp?q='+query+'&search=SkreemR+Search" target="showhere" title="Search for '+list_items[i].innerHTML+'">'+list_items[i].innerHTML+'</a>';
  }
	var iframe = document.createElement("iframe");
	iframe.src="";
	iframe.name = "showhere";
	iframe.style.position="absolute";
	iframe.style.top=0;
	iframe.style.right=0;
	iframe.style.width="60%";
	iframe.style.maxWidth="780px";
	iframe.style.height="100%";
	iframe.border=0;
	document.getElementsByClassName('container')[0].parentNode.insertBefore(iframe, document.getElementsByClassName('container')[0].nextSibling);

  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = "body {width:40%}";
  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}
})();