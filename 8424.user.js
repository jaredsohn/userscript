// ==UserScript==
// @name           MySpace User Style Killer
// @description    Adds a button to remove styles from MySpace pages, based on the "Remove MySpace Styles Button" script by Rocky Neurock, but customizable(position, size, opacity)
// @include        *myspace.com*
// ==/UserScript==

// User Variables
var bordersize = '1px';
var buttonopacity = 0.4
var side='left';
var topbottom='top';
var sidedist='5px';
var vertdist='5px';
var fontsize='7pt';
var corners='7px';

// Script Variable, do not touch
var target = document.getElementById('tipDiv');

if (target) 

    {

	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Kill Style');
	button.setAttribute('style',
			'background: darkgray;\
			border-bottom: '+bordersize+' solid gray;\
			border-left: '+bordersize+' solid lightgray;\
			border-right: '+bordersize+' solid gray;\
			border-top: '+bordersize+' solid lightgray;\
			color: black;\
			cursor: pointer;\
			font: bold '+fontsize+' arial, sans-serif;\
			-moz-opacity: '+buttonopacity+';\
			position: fixed;\
			'+topbottom+': '+vertdist+';\
			'+side+': '+sidedist+';\
			z-index: 999;\
			-moz-border-radius: '+corners+';');

	button.setAttribute('onclick', "var s=document.getElementsByTagName('style');\
	s[0].innerHTML=''; s[1].innerHTML=''; s[2].innerHTML=''; s[3].innerHTML='';\
	s[4].innerHTML=''; s[5].innerHTML=''; s[6].innerHTML=''; s[7].innerHTML='';\
	s[8].innerHTML=''; s[9].innerHTML=''; s[10].innerHTML='';\
	var b=document.getElementsByTagName('button')[0];\
	b.parentNode.removeChild(b);");
	target.parentNode.insertBefore(button, target.nextSibling);
    }