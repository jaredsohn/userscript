// ==UserScript==
// @name           BBC - slim titles
// @namespace      http://userscripts.org/users/lorriman
// @description    Make more browser space by slimming titles
// @include        http://www.bbc.co.uk/news/*
// @include        http://bbc.co.uk/news/*
// @version        .1
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

if(document.location!='http://www.bbc.co.uk/news/'){
	ifId('header',displayNone); 
}

addGlobalStyle('#nav {height:18px;line-height:6px important!}');
addGlobalStyle('#sub-nav {height:18px;line-height:6px important!}');
addGlobalStyle('.story-header {font-size:1.8em !important;line-height:25px !important; padding:10px}');
addGlobalStyle('.story-date {padding:10px}');
addGlobalStyle('.story {padding:10px}');
addGlobalStyle('.date {padding:10px}');
addGlobalStyle('.story-body h1.story-header { clear: both;  margin: 3px -160px 3px 0 !important;}');
addGlobalStyle('.caption {padding:10px}');
