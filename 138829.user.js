// ==UserScript==
// @name BackGround Coler Changer(Light Pink(#FFF2F6))
// @namespace ColerChanger
// @version 1.0
// @description Change the background color of every webpage to light pink (color code:#FFF2F6)
// @creator Hasib
// @include https://*.facebook.com/*
// @include http://*.facebook.com/*
// ==/UserScript==




setInterval(function(){
	var all_element=document.getElementsByTagName('*');
	for(var element in all_element)
	{
		all_element[element].style.backgroundColor='#FFF2F6';
	}
},5000);