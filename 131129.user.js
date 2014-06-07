// ==UserScript==
// @name           AmateurTV Mod
// @namespace      localhost
// @include        http://www.amateur.tv/*
// ==/UserScript==

function todo(){
	
	var theurl = window.content.location.href.toString();

	if (document.getElementById('viewerswf')) {
	  document.getElementById('viewerswf').style.width='800px';
	  document.getElementById('viewerswf').style.height='800px';
	  document.getElementById('messages').style.display='none';
	  document.getElementById('chatentry').style.display='none';
	  document.getElementById('userlist').style.display='none';
	  document.getElementById('vm').style.display='none';
	  document.getElementById('info').style.display='none';
	  document.getElementById('makeMeScrollable').style.display='none';
	}

}

todo();