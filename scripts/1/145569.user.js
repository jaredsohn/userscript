// ==UserScript==
// @name           Kraland v6 Inverser
// @namespace      Kralandv6Inverse
// @description    Retire le caroussel de la page d'accueil, place les évènements avant les débats sur la page d'accueil
// @include        http://www.kraland.org/main.php
// @include        http://www.kraland.org/main.php?p=*    
// ==/UserScript==

function $(id){
	return document.getElementById(id);
}

function $Class(classname, node){
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function $Name(tagname, node){
	if(!node) node = document.getElementsByTagName('body')[0];
	return document.getElementsByTagName(tagname);
}

/*
 * Function hideSliders
 *   Cache le slider de la page principale
 */
function hideSliders(){
	if($Class('slides').length == 0)
		return;
	$Class('slides')[0].style.display = 'none';
	$('slide1c').parentNode.style.display = 'none';
	$Class('slides2')[0].style.marginTop = '-10px';
}

/*
 * Function reverseMain
 *   Inverse les évènements récents et les débats forum sur la page d'accueil
 */

function reverseMain(){
	if($Class('slides').length == 0)
		return;
	
	$Class('bx-left')[1].style.display = 'none';
	var recent = document.createElement('div');
	recent.className = 'bx-left';
	recent.innerHTML = $Class('bx-left')[1].innerHTML;
	$('central-text').appendChild(recent);
}

function blink(id, step){
	if(step){
		$(id).style.display = 'hidden';
		setTimeout('blink('+id+', 1)', 500);
	}
	else{
		$(id).style.display = 'visible';
		setTimeout('blink('+id+', 0)', 500);
	}
}

/*
 * Function startScript
 *   Lance le script
 */

function startScript(){
	hideSliders();
	reverseMain();
	
}


// Lance le script une fois le DOM chargé
	startScript();