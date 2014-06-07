// ==UserScript==
// @name           Guardian top panel remover
// @namespace      http://userscripts.org/users/lorriman
// @description    Removes useless fluff at the top of the Guardian page.
// @include        http://www.guardian.co.uk/*
// @match http://www.guardian.co.uk/*
// @version .1a
// ==/UserScript==

function getById(id){
	return document.getElementById(id);
}

function ifId(id,func){
	if(element=getById(id)){
		return func(element);
	}else{
		return null;
	}	
}

function displayNone(item){
	item.style.display='none';
}


ifId('sub-header',displayNone);
ifId('Top',displayNone);
ifId('fake-bar',displayNone);
