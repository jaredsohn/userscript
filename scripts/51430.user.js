// ==UserScript==
// @name          Personal 4chan spam blocker
// @namespace     http://www.userscripts.org
// @description   I copied the bulk of this code from other scripts and updated it to block the posts that I wanted to block. 
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var blockfilter = ["It's YouTube porn week!","she EPIN /b/!","NEWFAGS CANT","Newfags can't","I give this decadent CP to you","▓▓▓▓▒▓▓▒▒▓▒▓▓▓▒▓▓▒▒▓
▓▒▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓
▓▓▓▓▒▓▒▒▓▓▒▓▒▓▒▓▒▒▓▓
▓▒▒▓▒▓▒▒▒▓▒▓▓▓▒▓▒▒▒▓
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒▓▓▓▒▓▓▓▒▓▒▒▒▓▒▓▒▒▒▒
▒▒▓▒▒▓▒▓▒▓▒▒▒▓▓▒▒▒▒▒
▒▒▓▒▒▓▓▓▒▓▒▒▒▓▓▒▒▓▓▓
▒▒▓▒▒▓▒▓▒▓▓▓▒▓▒▓▒▓▓▓
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒"];
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		for(j=0;j<blockfilter.length;j++){
		if (posts[i].innerHTML.indexOf(blockfilter[j]) != -1){
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i-=1;
			j=blockfilter.length;
			
			
		}
		
		}
		
	}
})()