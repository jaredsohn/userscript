// ==UserScript==
// @name           Google Reader Counter Replace
// @namespace      *
// @include        http://www.google.co.jp/reader/*
// ==/UserScript==

function replace(){
	var aAll = document.getElementById("sub-tree-container").getElementsByTagName("a");
	for(i=0;i<aAll.length;i++){
		var parent = aAll[i].getElementsByClassName("name")[0];
		parent.insertBefore(parent.getElementsByClassName("unread-count")[0],parent.getElementsByClassName("name-text")[0]);
	};
};

replace();

