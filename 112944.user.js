// ==UserScript==
// @name				Gamefaqs Search Focus
// @version				2011 Sep 13th
// @author				XFox Prower
// @namespace			http://www.TailsArchive.net/
// @description			Focuses the search form on Gamefaqs pages.
// @include				http://www.gamefaqs.com/*
// ==/UserScript==
X=document.getElementById('searchtextbox');
if(X){window.addEventListener('load',function(){X.focus();},false);}