// ==UserScript==
// @name           Torrent
// @namespace      torrent.script.by.eugene
// @include        *
// ==/UserScript==


  var elements=document.getElementsByTagName('A'); 

  for(var i =0; i <  elements.length; i++){
	var element =  elements[i];
	var link = elements[i].href;
	if (link != null &&  link.indexOf(".torrent") == (link.length - ".torrent".length)) 
		element.href = 'javascript:/*alert("' + link + '"); */var win = window.open("http://192.168.1.112:8080/api/torrent-add?start=yes&url=' 
			+ encodeURI(link) + '");document.title = "All done.";win.close();'
			
  }