// ==UserScript==
// @name           Failai.lt Be Laiko | gtamods.ipp.lt
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
if(document.getElementById('wait'))document.getElementById('wait').innerHTML=1;document.getElementById('header').style.color='red';document.getElementById('header').style.fontSize='26px';void(document.getElementById('header').innerHTML='D&#279;kojam gtamods.ipp.lt');document.getElementById('btn_download').value='gtamods.ipp.lt';if(document.getElementById('btn_download'))document.forms[0].submit();

