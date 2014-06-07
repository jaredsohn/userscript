// video downloader for http://www.universcience.tv
// version 0
// 2012.05.03
// Copyright (c) 2012, FelixSmith
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         UNIVERSCIENCE.TV video downloader
// @namespace    http://www.universcience.tv
// @description  Ajoute un lien vers les différents type de videos pour les télécharger
// @include      http://www.universcience.tv/*
// @include      http://www.universcience-vod.fr/*
// ==/UserScript==

(function () {
	
	function getElementsByClassName(classname, node)  {
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}
	
	var media = getElementsByClassName('mediavidbox');
    var scripts = media[0].getElementsByTagName('script');
    var src = scripts[0].innerHTML.split('mediaSource = "');
    var urlmedia = src[1].split("?");
    //alert(urlmedia[0]);	
	
	var rubrique = document.getElementsByClassName('genre');
	var titre = document.getElementsByClassName('alaune_tit');
	var links = '<div style="margin-top:45px; padding:5px; background:silver; border:1px solid black;"><span style="font-weight:bold;"><a href="'+urlmedia[0]+'">T&eacute;l&eacute;charger: '+rubrique[0].innerHTML+' - '+titre[0].innerHTML+'</a></span></div>';
	var art_div = getElementsByClassName('mediavidart');
	art_div[0].innerHTML += links;

})();