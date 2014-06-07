// ==UserScript==
// @name Sonsayfa
// @namespace http://diveintogreasemonkey.org/download/
// @description Son sayfaya gider
// @include http://www.tahribat.com/*
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var sonsayfa;
function linkolustur(){
	sonsayfa=document.createElement("a");
	sonsayfa.href="#";
	sonsayfa.id="ss_link";
	sonsayfa.innerHTML="Son sayfaya git >>";
	sonsayfa.style.color="red";
	//document.getElementById("forumtoplist").appendChild(sonsayfa);
	var tmp=document.getElementsByClassName("forumtoplist");
	tmp[0].appendChild(sonsayfa);
}

function sonsayfa_tespitet(){
	var linkler=document.getElementsByTagName("a");
	for(a=0;a<=linkler.length-1;a++){
		if(linkler[a].innerHTML=="[»»]"){
			sonsayfa.href=linkler[a].href;
			return false;
		}
	}
        sonsayfa.style.display="none";
	
}

linkolustur(); sonsayfa_tespitet();