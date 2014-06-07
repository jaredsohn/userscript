// ==UserScript==
// @name           Video BC
// @namespace      http://animenetworx.info
// @description    Blocks the comments from these shitty users on my fav video sites!
// @include        http://www.veoh.com/*
// @include        http://*.bolt.com/*
// @include        http://youtube.com/*
// ==/UserScript==

	var href = window.location.host;
	
	if(href == "bolt.com"){
			document.getElementById('comment').innerHTML="";
			document.getElementById('comment').display="none";
		// added protection!
		var comments = document.getElementById('comment');
		if (comments) {
		    comments.parentNode.removeChild(comments);
		}
	} else if(href == "www.veoh.com"){
			document.getElementById('commentsContainer').innerHTML="";
			document.getElementById('commentsContainer').display="none";
			document.getElementById('videoCommentsPanel').innerHTML="";
			document.getElementById('videoCommentsPanel').display="none";
		// added protection!
		var comments = document.getElementById('commentsContainer');
		if (comments) {
		    comments.parentNode.removeChild(comments);
		}
	} else if(href == "youtube.com"){
	// Take out comments and leave comment box
	 document.getElementById('commentsDiv').innerHTML=document.getElementById('commentPostDiv').innerHTML;
	}