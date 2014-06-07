// ==UserScript==
// @name		my.mail.ru smstop and games ad remover
// @namespace		mail.ru/
// @include		http://my.mail.ru/*
// @include		http://foto.mail.ru/*
// ==/UserScript==

div = document.getElementsByTagName("div");

for(var i=0;i<div.length;i++)
{
	if(div[i].className=='mf_smsTop mf_ohd') div[i].style.display = 'none';  //SMS Top
	if(div[i].className=='mf_mb10') div[i].style.display = 'none';           //Games ad
}
