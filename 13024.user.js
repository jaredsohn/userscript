// ==UserScript==
// @name           Google search field expander v0.2
// @author         1allen (1all3n@gmail.com)
// @namespace      http://1allen.cc
// @description    expands google's search field
// @include        http://www.google.*/*
// @include        http://google.*/*
// ==/UserScript==

// v0.1 — first basic version
// v0.2 — added configurable size value and focusing top field.

var sz = '100';       // size of field in characters

if (window.location.href.match(/http:\/\/(www\.){0,1}google\./i) )
	{
		var q = document.getElementsByName('q');
		q[0].size = sz;	                //top field
		q[0].focus();                   //focus it
		if(q[1] != null)		//search results or main page?
			q[1].size = sz;	        //expand bottom one
	}