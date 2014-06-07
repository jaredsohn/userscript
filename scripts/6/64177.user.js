// ==UserScript==
// @name           Auto-store all
// @namespace      C:\Documents and Settings\Compaq User\Application Data\Mozilla\Firefox\Profiles\mtbi3aco.default\gm_scripts\twilight_heros_sb1
// @include        *twilightheroes.com/storage.php*
// ==/UserScript==

function f(){
	var a,b,c,d;
	a=document.getElementsByTagName('form')[0];
	b=document.getElementsByTagName('option')[0];
	c=document.getElementsByTagName('input');
	d=c[c.length-2];
	d.value=/\((\d+)\)/.exec(b.innerHTML)[1];
	if(!b.length) localStorage.removeItem('mir');
	else a.submit();}

function g(){
	localStorage.setItem('mir','true');
	f();}

function h(){
	var a,b,c;
	a=document.createElement('button');
	a.innerHTML='Store Everything';
	b=document.getElementsByTagName('input');
	c=b[b.length-1];
	c.parentNode.insertBefore(a,c);
	a.addEventListener('click',g,true);
	if(localStorage.getItem('mir'))f();}

window.addEventListener('load',h,true);
