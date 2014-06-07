// ==UserScript==
// @name           auto-use *ouch items
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/use.php*
// ==/UserScript==

function z(){
	if(localStorage.getItem('ffr')){
		localStorage.removeItem('ffr');
		var t=document.getElementById('a736');
		if(t) location.href=t.href;}
	var a,b,x,y;
	a="1008;673;475;382;381;380;379;378;254".split(';');
	for(x=0;x<a.length;x++){
		b='a'+a[x];
		y=document.getElementById(b);
		if(y)break;}
	if(y)location.href=y.href;
	else localStorage.removeItem("ufo");}

function m(){
	localStorage.setItem('ufo','true');
	z();}

function g(){
	if(localStorage.getItem('ufo'))z();
	else{
		var t=document.getElementsByTagName('table')[0];
		var n=document.createElement('button');
		n.innerHTML="Batch use *ouch item(s)";
		localStorage.setItem('ffr',true);

		t.parentNode.insertBefore(n,t);
		n.addEventListener('click',m,true);}}

window.addEventListener('load',g,true);
