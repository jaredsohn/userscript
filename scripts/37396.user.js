// ==UserScript==
// @author		dOCnOK
// @namespace	http://userscripts.org/users/56730
// @name		Gamezer Ads Remover
// @description	Remove gamzer.com Ads
// @include		http://www.gamezer.com/billiards/*
// ==/UserScript==


var ops = document.getElementsByTagName('iframe');
for (var i=0;i<=ops.length;i++){
	j = ops[i];
	//alert(j.width);
	if (j.width = 742)
		document.getElementsByTagName('iframe')[i].style.display = 'none';
	}