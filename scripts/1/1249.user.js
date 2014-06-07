//
// Slashdot NoBS - GreaseMonkey Script
// Author: Brad Cable
//
// This script finds and removes BS comments, currently supported comments are
// (with variance):
//	I for one welcome our ____ overlords!
//	1. ____ 2. ??? 3. Profit!
//	In Soviet Russia, ____ ____s you!
//	In Korea, only old people ____
//	Only old Koreans ____
//	<Any post with the word "dupe" in it>
//
// If you find any bugs, have any suggestions, comments, or other phrases that
// need to be added, please email me at bcable@gmail.com.
//


// ==UserScript==
// @name		Slashdot NoBS
// @description		Gets rid of BS comments
// @include		http://*slashdot.org/article.pl?*
// ==/UserScript==


(function(){

const bsRE=/welcome.*overlords|[0-9](\.|\))[ ]{0,1}profit|in soviet russia.*s you[.,!]|in korea[,]{0,1} only old|only old korean|dupe|duplicate article/ig;
const trRE=/\<tr\>/ig;

cands=document.getElementsByTagName("tr");

function delElement(elem){
	elem.innerHTML="";
	elem.style.display="none";
}

for(i=1;i<cands.length;i++){
	if(cands[i].innerHTML.match(bsRE)!=null && cands[i].innerHTML.match(trRE)==null){
		if(cands[i].innerHTML.toLowerCase().substring(0,22)=="<td bgcolor=\"#cccccc\">") i++; // TR is actually the title...
		delElement(cands[i-1]);
		delElement(cands[i]);
		delElement(cands[i+1]);
		if(cands[i+2].innerHTML.toLowerCase().substring(0,15)=="<td><ul><table>") delElement(cands[i+2]); // delete children posts
	}
}

})();
