// ==UserScript==
// @name           4chan Post Blocker
// ==UserScript==
// @name          4chan Post Blocker
// @namespace     http://www.userscripts.org
// @description   Gets rid of posts containing given keywords (ls spam and f/viral posts) on 4chan.  Credit goes to 4chan spam buster, as this is modification of his code
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var blockfilter = ["ANON CAN SUCK MY DICK","tinyurl.com","icanhaz.com","bloat.me","twurl.cc","twurl.nl","fon.gs","tr.im","2big.at","piurl.com","linkbee.com"];
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