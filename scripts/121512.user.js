// ==UserScript==
// @name		Show Full Domain on Hacker News posts
// @description	Sets full domain on hacker news posts. 
// @namespace	http://userscripts.org/users/119115
// @include      http://news.ycombinator.com/*
// @include      https://news.ycombinator.com/*
// @match        https://news.ycombinator.com/*
// @match        http://news.ycombinator.com/*
// ==/UserScript==

(function(){
var stories  = document.getElementsByClassName("title");
for(var i=0; i<stories.length; i++){
	var url = stories[i].getElementsByTagName("a"),
		domain = stories[i].getElementsByClassName("comhead")[0];
	if(domain && domain.className === "comhead"){
		var fulldomain = " (" + url[0].hostname.replace(/^www\./,"") + ") ";
		if(fulldomain !== domain.innerHTML ){
			domain.innerHTML = fulldomain; 
		}
	}
}
}());