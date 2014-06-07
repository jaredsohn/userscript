// ==UserScript==
// @name           Google Reader entry title & url in title bar
// @date           2008-12-31
// @namespace      	http://google.com/reader/userscript
// @description    Puts current entry title & url in window title bar.
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// ==/UserScript==

function main()
{
    document.addEventListener('click', change_title, false);
    document.addEventListener('keyup', change_title, false);
    document.getElementById('entries').addEventListener('scroll', change_title, false);
}

function change_title()
{
    unsafeWindow.document.title = get_title();
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|s)" + className + "(s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i ];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function get_title()
{
	var data=getElementsByClassName('entry-title-link','a',document.getElementById('current-entry'));
	var t=data[0].text+'|'+data[0].href;
    return t;
}

window.addEventListener('load', main, false);
