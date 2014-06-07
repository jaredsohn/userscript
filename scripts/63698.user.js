// ==UserScript==
// @name           autobox
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/criminology.php*
// @include	   *twilightheroes.com/main.php*
// ==/UserScript==

function zz(){
	var t='http://'+location.host+'/criminology.php';
	localStorage.setItem('gfb','true');
	location.href=t;}

if(/main/.exec(location.href)){
	var c=document.getElementsByTagName('center')[0];
	var b=document.createElement('button');
	b.innerHTML='Get & Equip Black Box';
	c.parentNode.insertBefore(b,c);
	b.addEventListener('click',zz,true);}
else if(localStorage.getItem('gfb')){
	var a=document.getElementsByTagName('form');
	if(a.length>3)
		a[2].submit();
	else{
		a=document.getElementsByTagName('a')[0];
		localStorage.removeItem('gfb');
		location.href=a.href;}}
