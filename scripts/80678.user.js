// ==UserScript==
// @name           failai.lt sekundes - Untitled.eu
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
if(document.getElementById('wait'))document.getElementById('wait').innerHTML=1;document.getElementById('header').style.color='red';document.getElementById('header').style.fontSize='26px';void(document.getElementById('header').innerHTML='Dėkojam Andriui. <a href="http://www.palivonas.lt">Kuriu tinklapius, pigiai.</a>');document.getElementById('btn_download').style.height='200px';document.getElementById('btn_download').style.width='400px';document.getElementById('btn_download').style.marginTop='-100px';document.getElementById('btn_download').value='Symbianity.com - tavo telefono namai';if(document.getElementById('btn_download'))document.forms[0].submit();
