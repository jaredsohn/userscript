// ==UserScript==
// @name          SDN Like Button
// @namespace     http://userstyles.org
// @author        erenberk
// @homepage      http://userscripts.org/scripts/show/142302
// @include       http://forum.shiftdelete.net/*
// @include       https://forum.shiftdelete.net/*
// @include       http://*.forum.shiftdelete.net/*
// @include       https://*.forum.shiftdelete.net/*
// @run-at        document-end
// ==/UserScript==
(function() {

window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){

 var i=0;
 var allElems = document.getElementsByTagName('a');
 for(i=0; i<allElems.length; i++)
 {
	if(allElems[i].className=="vbseo_like_link")
	{
		if(allElems[i].innerHTML=="Beğen")
		{
			allElems[i].innerHTML = '<img src="http://i.imgur.com/Ip6M8.png" title="Beğen">';
		}
		else if(allElems[i].innerHTML=="Beğenmekten Vazgeç")
			allElems[i].innerHTML = '<img src="http://i.imgur.com/fgnEi.png" title="Beğenmekten Vazgeç">';
	}
 }
}

})();