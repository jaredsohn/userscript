// Google Video Search v0.1
// (c) 2005, Andrew
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Video
// @namespace     
// @description   Add google video search to the default google interface
// @include       http://*.google.*/*
// ==/UserScript==

(function() {	
	//change videosearch
	if(document.location.href.match(/\/videosearch/)){  
	  node = document.getElementsByTagName("img");
	  test = node[0].parentNode.parentNode.parentNode.parentNode.nextSibling;
	  if (test!= null){
	  	video = document.createElement('span');
	    video.innerHTML = '<td><font size=-1><a id=0a class=q href="/webhp?hl=en&tab=iw" onClick="return qs(this);">Web</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=1a class=q href="/imghp?hl=en&tab=wi" onClick="return qs(this);">Images</a>&nbsp;&nbsp;&nbsp;&nbsp;<b>Video</b>&nbsp;&nbsp;&nbsp;&nbsp;<a id=2a class=q href="http://groups.google.com/grphp?hl=en&tab=wg" onClick="return qs(this);">Groups</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=4a class=q href="http://news.google.com/nwshp?hl=en&tab=wn" onClick="return qs(this);">News</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=5a class=q href="http://froogle.google.com/frghp?hl=en&tab=wf" onClick="return qs(this);">Froogle</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=7a class=q href="/lochp?hl=en&tab=wl" onClick="return qs(this);">Local</a>&nbsp;&nbsp;&nbsp;&nbsp;<b><a href="/intl/en/options/" class=q>more&nbsp;&raquo;</a></b></font></td>';
	
	  	test = test.nextSibling.nextSibling.nextSibling;
	  	test.parentNode.insertBefore(video,test);
	  } else {
	  	video = document.createElement('span');
	    video.innerHTML = '<font size=-1><a id=t0a class=q href="/search?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Web</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t1a class=q href="/images?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Images</a>&nbsp;&nbsp;&nbsp;&nbsp;<font color=#000000><b>Video</b></font>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t2a class=q href="/groups?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Groups</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t4a class=q href="/news?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">News</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t5a class=q href="/froogle?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);"">Froogle</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id=t7a class=q href="/local?" onClick="this.href+=\'&q=\'+encodeURIComponent(document.f.q.value);">Local</a>&nbsp;&nbsp;&nbsp;&nbsp;</font><font size=-1><b><a href="/intl/en/options/" class=q>more&nbsp;&raquo;</a></b></font>';
	      
		test = node[0].parentNode.parentNode.nextSibling.nextSibling.firstChild.firstChild.firstChild.firstChild;
	  	test.parentNode.insertBefore(video,test);
	  }	
	} else {

	  video = document.createElement('span');
	  video.innerHTML = '<a id=11a class=q href="http://video.google.com/videosearch?" onClick="return qs(this);">Video</a>&nbsp;&nbsp;&nbsp;&nbsp;';
	
	  //append the new node for other search
	  node = document.getElementById("1a");
	  if (node == null) node = document.getElementById("t1a");
	  if (node != null){
		node.parentNode.insertBefore(video,node);
      } else {
		node = document.getElementById("0a");
		if (node == null) node = document.getElementById("t0a");
		node.parentNode.insertBefore(video,node.nextSibling.nextSibling);
	  }
	}
})();