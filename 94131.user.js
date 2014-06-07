// ==UserScript==
// @name             NCTUCosHack
// @namespace        NCTUCosHack
// @description      NCTUCosHack
// @auther           Ensky
// @include          http://cos.adm.nctu.edu.tw/TeachPoll/*
// @include          http://140.113.40.2/TeachPoll/*
// @include          http://140.113.40.3/TeachPoll/*
// @include          http://140.113.40.4/TeachPoll/*
// @include          http://140.113.40.5/TeachPoll/*
// @version	         1.00
// ==/UserScript==
function goHack(){	
	var inputs=document.getElementsByTagName('input');
	var k=1;
	var i=9;
	for(;k<=16;i+=5,k++){
		inputs[i].checked=true;
	}
	inputs[--i].checked=true;
	i+=3;
	inputs[i].checked=true;
	i+=4;
	inputs[i].checked=true;
	i+=3;
	inputs[i].checked=true;
	i+=3;
	inputs[i].checked=true;
	i+=4;
	inputs[i].checked=true;
	
}
goHack();