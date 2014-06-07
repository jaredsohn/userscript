// ==UserScript==
// @name           	banner delete for Plemiona\DieStaemme\TribalWars
// @author		r0nin
// @description		deleting advertisement on TribalWars\DieStaemme\Plemiona
// @include        	http://*.ds.innogames.*/*
// @include        	http://*.plemiona.pl/*
// @include        	http://*.tribalwars.*/*
// @include        	http://*.die-staemme.*/*
// ==/UserScript==

var loc=window.location.href;

if(loc.indexOf('no_top')!=-1){
	parent.document.body.cols = "*,0";
}else{
	parent.document.body.rows = "0,*";
}