// Google Blogsearch 0.5
// (c) 2005-2006, Clem
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Blogsearch
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Add google blogsearch to the default google interface
// @include       http://*.google.*/*
// ==/UserScript==

(function() {	
	  blog = document.createElement('span');
	  if(document.location.href.match(/\/blogsearch/))
		blog.innerHTML = '<b>Blog</b>&nbsp;&nbsp;&nbsp;&nbsp;'
	  else
		blog.innerHTML = '<a class=q href="http://www.google.com/blogsearch?" onClick="return qs(this);">Blog</a>&nbsp;&nbsp;&nbsp;&nbsp;'
			
	  //search web or image node (first search link)
	  node = null; 
	  alla = document.getElementsByTagName('a'); 
	  for(var i=0;i<alla.length;i++) { if(alla[i].className == 'q') { node = alla[i]; break; } }
	  if (node != null) {
			
			if (node.childNodes[0].data == "Web")
				node.parentNode.insertBefore(blog,node.nextSibling.nextSibling);
			else
				node.parentNode.insertBefore(blog,node);
	  } else {
			//for google video
			node = document.getElementById("t0a");
			if (node != null) 
				node.parentNode.insertBefore(blog,node.nextSibling.nextSibling);
	  }
})();
