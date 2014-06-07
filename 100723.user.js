// ==UserScript==
// @name           Failai.lt Be Laiko 
// @namespace      
// @include        http://failai.lt/*
// @include        http://www.failai.lt/*
// ==/UserScript==
if(!document.getElementById('wait')){
for(var i in document.getElementsByTagName('input')){
	name = document.getElementsByTagName('input')[i].name;
	if(document.getElementsByTagName('input')[i].name=='method_free'){
		document.getElementsByTagName('input')[i].click();
	}
}}
if(document.getElementById('wait'))document.getElementById('wait').innerHTML=1;document.getElementById('header').style.color='red';document.getElementById('header').style.fontSize='26px';void(document.getElementById('header').innerHTML='Failai.lt be laiko limito');document.getElementById('btn_download').value='www.code-lt.com';if(document.getElementById('btn_download'))document.forms[0].submit();

