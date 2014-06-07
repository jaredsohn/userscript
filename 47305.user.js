// ==UserScript==
// @name           4chan Post Blocker
// ==UserScript==
// @name          4chan Post Blocker
// @namespace     http://www.userscripts.org
// @description   Gets rid of posts containing given keywords (ls spam and f/viral posts) on 4chan.  Credit goes to 4chan spam buster, as this is modification of his code
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var blockfilter = ["om nom nom nom nom nom","tinyurl.com","icanhaz.com","bloat.me","http://rapidshare.com/files/204528077","http://rapidshare.com/files/204490334","http://rapidshare.com/files/204489523","http://rapidshare.com/files/204585642","bitch takes all the load in park","I wish my girl would do this to me","linkbee.com","http://rapidshare.com/files/204583590","http://rapidshare.com/files/204502721","I'll stop when I get 300 subscribers "];
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