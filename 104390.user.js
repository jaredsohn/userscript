// ==UserScript==
// @name           Nu.nl optimizer
// @namespace      scripts.seabreeze.tk
// @version        0.0.02 alpha
// @license        All rights reserved, except the right to use for both personal and commercial purposes and the right to modify for personal purposes.
// @description    Removes whitespace at top. Note: ads can cause problems. Use AdBlock!
// @include        http://www.nu.nl/*
// @include        http://www.zie.nl/*
// @include        http://www.nujij.nl/*
// @include        http://www.nuwerk.nl/*
// @include        http://www.nulive.nl/*
// @include        http://www.nuzakelijk.nl/*
// @history  0.0.02 Added nuzakelijk.nl, reduced number of includes since * can also match 0 characters
// ==/UserScript==

function insert(style,w){
	var x=document.createElement('style');
	x.type='text/css';
	var s=document.createTextNode(style);
	s=x.appendChild(s);
	var w=(w&&typeof w!=='string')?w:document.head
	x=w.appendChild(x)
	return x;
}

insert('#pageheader{margin-top:-90px}',document.body);
document.getElementById('extensionnav').style.top='102px';
document.getElementById('extensionnav').style.zIndex='6000';
document.getElementById('extensionnav').style.position='absolute';
document.getElementById('extensionnav').style.left='0px';
document.getElementById('extensionnav').style.bottom='';
insert('.adblock_h{display:none}');

for(var i=0;i<document.getElementsByClassName('showmore').length;i++){
	var a=document.getElementsByClassName('showmore')[i];
	if(a.nodeName.toLowerCase()==='a'){
		if(a.getAttribute('href')==='#'){
			if(!a.getAttribute('onclick')){
				a.setAttribute('onclick','return false');
			}
		}
	}
}