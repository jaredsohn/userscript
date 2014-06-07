// ==UserScript==
// @name           Head-fi - forums roomifier
// @namespace      http://userscripts.org/users/lorriman
// @description    non-evil panel remover (keeps ads)
// @include        http://www.head-fi.org/forum/*
// ==/UserScript==

//utility functions

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

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

//actual modification code

	ifId('header',displayNone); 
	ifId('footer',displayNone);

//addGlobalStyle('#nav {height:18px;line-height:6px important!}');

