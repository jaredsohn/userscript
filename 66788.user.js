// ==UserScript==
// @name           muh's buying script
// @namespace      http://userscripts.org/users/110369
// @include        *twilightheroes.com/black-market.php*
// @include	   *twilightheroes.com/main.php*
// ==/UserScript==

function zz(){
	var t='http://'+location.host+'/black-market.php';
	localStorage.setItem('bmi','true');
	location.href=t;}

if(/main/.exec(location.href)){
	GM_log('hi');
	var c=document.getElementsByTagName('br')[1];
	var b=document.createElement('button');
	b.innerHTML='Buy one per day black market item';
	c.parentNode.insertBefore(b,c);
	b.addEventListener('click',zz,true);}
else if(localStorage.getItem('bmi')){
	localStorage.removeItem('bmi');
	var a=document.getElementsByTagName('form')[0];
	var i=document.getElementsByName('item');
	if(i.length>5)if(i[5].value!=763){
		i[5].checked=true;
		a.submit();}
	var t='http://'+location.host+'/main.php';
	location.href=t;}

