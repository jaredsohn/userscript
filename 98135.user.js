// ==UserScript==
// @namespace		http://www.ryanland.com/greasemonkey
// @name			Get Rid of LifeInATent on YouTube
// @include			http://www.youtube.com/*
// @description		Gets rid of all "Suggestions" by "liat" or "LifeInATent"
// ==/UserScript==

var stats = document.getElementsByClassName("stat");
for (var i=stats.length-1;i>=0;i--) {
	theStat=stats[i];
	if(theStat.innerHTML.search("liat")!=-1 || theStat.innerHTML.search("LifeInATent")!=-1) {
		theVid=theStat.parentNode;
		theList=theVid.parentNode;
		console.log(theStat);
		void(theList.removeChild(theVid))
	}
}