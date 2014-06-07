// ==UserScript==
// @name           fake moot is fake
// @namespace      http://userscripts.org/users/257845
// @description    expose fake moot for those that don't notice the slight title color difference
// @include        *boards.4chan.org*
// ==/UserScript==
//moot !Ep8pui8Vw2 ## Admin - real moot
//mo‮8pE! to‬pui‮# 2wV8‬# A‮imd‬n - fake moot
// looks the same but far from it...

function fakeMOOT(){
	var titles=document.getElementsByClassName('replytitle');
	var files=document.getElementsByClassName('filetitle');
	for(i in titles){
		if(escape(titles[i].innerHTML).indexOf('mo%u202E8pE')!=-1)titles[i].innerHTML='[fake] '+titles[i].innerHTML;
	}
	for(i in files){
		if(escape(files[i].innerHTML).indexOf('mo%u202E8pE')!=-1)files[i].innerHTML='[fake] '+files[i].innerHTML;
	}
}
fakeMOOT();