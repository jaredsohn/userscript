// Facebook - Advanced Timestamps
//
// ==UserScript==
// @name          Facebook - Advanced Timestamps
// @namespace     http://userscripts.org/users/109606
// @description     Replaces all timestamps of facebook status updates and wall posts with more useful information
// @include           *.facebook.com*
// ==/UserScript==

function ReplaceTimeStamps(){

var links = document.getElementsByTagName("abbr");


for (i=0; i < links.length; i++)
{
	if(links[i].innerHTML.indexOf(":") == -1){
	links[i].innerHTML = links[i].innerHTML + ", " + links[i].title.replace(" -0700","");
	}
}


}


function checkForUpdate() {
  document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
  setTimeout(ReplaceTimeStamps, 0);
  document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();