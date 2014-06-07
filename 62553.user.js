// ==UserScript==
// @name           autochat
// @namespace      http://userscripts.org/users/110369
// @include        http://twilightheroes.com/chat/index.php
// @include        http://twilightheroes.com/chat/chat_chat.php
// @include        http://www.twilightheroes.com/chat/index.php
// @include        http://www.twilightheroes.com/chat/chat_chat.php
// ==/UserScript==

function kfs(){
	var x=document.getElementById('txt_message');
	x.value='/me [insert Satan-kicking text here]';
	document.getElementById('btn_send_chat').click();}

var x=document.getElementById('txt_message');
var y=window.location;
if(!x)
	y.href = 'http://' + y.host + '/chat/chat_chat.php';
else{
var b=document.getElementsByTagName('span')[0];
var c=document.createElement('a');
var defaultCSS='#txt_message{width:55%!important};';
GM_addStyle(defaultCSS);
c.id='nodefaultstyle';
b.parentNode.insertBefore(c,b);
	x=document.getElementById('txt_message');
	x.value='/day';
	document.getElementById('btn_send_chat').click();
	var z=document.getElementById('txt_message');
	z.value='/who';
	var a=document.createElement('button');
	a.appendChild(document.createTextNode('Kick Satan'));
	z.parentNode.insertBefore(a,z);
	a.addEventListener('click',kfs,false);
	GM_log('hi');
	var css='body{font-size:15px!important}*{'+
		'background-color:#00acdc!important;'+
		'color:#001337!important}';
	GM_addStyle(css);
	window.setTimeout(function(){
		document.getElementById('btn_send_chat').click();},1);}
	
