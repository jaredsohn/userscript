// ==UserScript==
// @name         Show Full Domain on Hacker News (hckrnews.com) posts
// @description	 Sets full domain on Nacker News posts viewed on hckrnews.com. 
// @namespace	 http://userscripts.org/users/430090
// @include      http://hckrnews.com/*
// @match        http://hckrnews.com/*
// ==/UserScript==

(function(){
var entries  = document.getElementsByClassName("entries")[0].children;
for(var i=0; i<entries.length; i++){
	var link   = entries[i].getElementsByClassName("link")[0],
	    domain = link.getElementsByTagName("span")[0];
        console.log("link: ", link, ", domain: ", domain);
	if(domain){
		var fulldomain = " (" + link.hostname.replace(/^www\./,"") + ") ";
		if(fulldomain !== domain.innerHTML ){
			domain.innerHTML = fulldomain; 
		}
	}
}
}());