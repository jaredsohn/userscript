// Google Blogsearch2
// --- v0.3 add direct link support
// copy from, Clem v0.5
// --- modified to work for me -sunyin 20060811
// --- v0.2 add clickable link to <b>http://link</b> 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Blogsearch 2
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Add google blogsearch to the default google interface
// @include http://google.tld/*
// @include http://*.google.tld/*
// @exclude       http://mail.google.*
// ==/UserScript==

(function() {	
	//change blogsearch
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

	// google seems stop providing links to url, I will add it back
	var allb = document.getElementsByTagName('b');
	for(var i=0;i<allb.length;i++) {
		var link= allb[i].innerHTML;
                if(link.indexOf("http://") ==0) {
		    allb[i].innerHTML = '<a href='+link+'>'+link+"</a>";
		} else if (link.indexOf("www.") ==0) {
		    allb[i].innerHTML = '<a href=http://'+link+'>'+link+"</a>";
		}
	}

	// make direct link visible, 
	var allh2 = document.getElementsByTagName('h2');
	for(var i=0;i<allh2.length;i++) {
          node = allh2[i];
          if (node.className != 'r') continue;
	  // assume the first link is what we need, not rwt by google yet
          link = node.getElementsByTagName('a')[0];
	  // be nice to google, we create a seperate clickable
	  node.innerHTML = '<a href="'+ link.href+'">[+] </a>'+node.innerHTML;
	}	
})();

