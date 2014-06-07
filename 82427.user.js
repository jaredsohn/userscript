// ==UserScript==
// @name           Kigard - retrait des ID
// @namespace      none
// @include        http://www.kigard.fr/*
// ==/UserScript==
function b(){
	return document.getElementById('historique').getElementsByTagName('a');
}
function c(i){
	return d()[i].getElementsByTagName('a')[0];
}
function d(){
	return document.getElementsByTagName('blockquote');
}
if(document.getElementById('historique')){
	for(i=0;i< b().length;i++){
		b()[i].innerHTML = b('a')[i].innerHTML.replace('(','<span style="display:none">');
		b()[i].innerHTML = b('a')[i].innerHTML.replace(')','</span>');
	}
}
for (j=0;j<d().length;j++){
	if(d()[j].className.indexOf('forum_post') != -1){
		for(i=0;i<d()[j].getElementsByTagName('a').length;i++){
			d()[j].getElementsByTagName('a')[i].innerHTML = d()[j].getElementsByTagName('a')[i].innerHTML.replace('(','<span style="display:none">');
			d()[j].getElementsByTagName('a')[i].innerHTML = d()[j].getElementsByTagName('a')[i].innerHTML.replace(')','</span>');
		}
	}
}