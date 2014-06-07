// Google Blogsearch2
// (c) 2005, Clem, 
// --- modified to work for me -sunyin 20060811
// --- v0.2 add clickable link to <b>http://link</b> 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// Edited by Rhys Adams to use AU links
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Blogsearch AU
// @namespace     http://labs.beffa.org/greasemonkey/
// @description   Add google blogsearch to the default google interface
// @include       http://*.google.*/*
// ==/UserScript==

(function() {	
	//change blogsearch
	if(document.location.href.match(/\/blogsearch/)){  
	  node = document.getElementsByTagName("img");
	  test = node[0].parentNode.parentNode.parentNode.parentNode.nextSibling;
	  if (test!= null){
	    blog = document.createElement('span');
	    blog.innerHTML = '<td><font size=-1><a id=0a class=q href="/webhp?hl=en&tab=iw" onClick="return qs(this);">Web</a>&nbsp;&nbsp;&nbsp;&nbsp;<b>Blog</b>&nbsp;&nbsp;&nbsp;&nbsp;<a id=1a class=q href="/imghp?hl=en&tab=wi" onClick="return qs(this);">Images</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=2a class=q href="http://groups.google.com/grphp?hl=en&tab=wg" onClick="return qs(this);">Groups</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=4a class=q href="http://news.google.com/nwshp?hl=en&tab=wn" onClick="return qs(this);">News</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=5a class=q href="http://froogle.google.com/frghp?hl=en&tab=wf" onClick="return qs(this);">Froogle</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=7a class=q href="/lochp?hl=en&tab=wl" onClick="return qs(this);">Local</a>&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="/intl/en/options/" class=q>more&nbsp;&raquo;</a></b></font></td>';
	
	    test = test.nextSibling.nextSibling.nextSibling;
	    test.parentNode.insertBefore(blog,test);
	  } else {
	    blog = document.createElement('span');
	    blog.innerHTML = '<font size=-1><a id=t0a class=q href="/search?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Web</a>&nbsp;&nbsp;&nbsp;&nbsp;<font color=#000000><b>Blog</b></font>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t1a class=q href="/images?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Images</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t2a class=q href="/groups?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Groups</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t4a class=q href="/news?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">News</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t5a class=q href="/froogle?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);"">Froogle</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t7a class=q href="/local?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Local</a>&nbsp;&nbsp;&nbsp;&nbsp;</font><font size=-1><b><a href="/intl/en/options/" class=q>more&nbsp;&raquo;</a></b></font>';
	      
	    test = node[0].parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.firstChild.firstChild;
	    test.parentNode.insertBefore(blog,test);
	  }	
	} else {

	  blog = document.createElement('span');
	  blog.innerHTML = '<a id=11a class=q href="http://www.google.com.au/blogsearch?" onClick="return qs(this);">Blog</a>&nbsp;&nbsp;&nbsp;&nbsp;';
	
	  node = null; //append the new node for other search
	  var alla = document.getElementsByTagName('a');
          for(var i=0;i<alla.length;i++) {
		if(alla[i].className == 'q') {
			node = alla[i]; break;
		}
	  }
	  if (node == null) node = document.getElementById("1a");
	  if (node == null) node = document.getElementById("t1a");
	  if (node != null){
		node.parentNode.insertBefore(blog,node);
          } else {
           node = document.getElementById("0a");
	   if (node == null) node = document.getElementById("t0a");
		node.parentNode.insertBefore(blog,node.nextSibling.nextSibling);
	  }
        }
	// google seems stop providing links to url, I will add it back
	var allb = document.getElementsByTagName('b');
	for(var i=0;i<allb.length;i++) {
		var link= allb[i].innerHTML;
                if(link.indexOf("http://") ==0) {
		    allb[i].innerHTML = '<a href='+link+'>'+link+"</a>";
		}
	}
	
})();


