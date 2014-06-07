// ==UserScript==
// @name           alltop redirect
// @namespace      http://www.meddlesome.in.th
// @description    Redirection from alltop.com
// @include        http://holykaw.alltop.com/*
// @exclude        http://holykaw.alltop.com/
// @exclude        http://holykaw.alltop.com/?*
// ==/UserScript==

var pelem = document.getElementsByClassName('post-body')[0].getElementsByTagName('p');
for(var a=0;a<=pelem.length;a++){
	if(pelem[a].getElementsByTagName('a').length!=0){
		if(!pelem[a].getElementsByTagName('a')[0].href.match("alltop")){
			window.location = pelem[a].getElementsByTagName('a')[0].href;
		}	
	}
}