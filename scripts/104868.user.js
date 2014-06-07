// ==UserScript==
// @name			Spam :3
// @namespace			
// @include        		http://www.furaffinity.net/*
// @author			Sora Hjort
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (var i=0;i<links.length;i++){
if(links[i].href.indexOf('/view')>0){
links[i].href=links[i].href.replace('/view','/full');
links[i].href += "#submissionImg";

}
}