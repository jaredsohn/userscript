// ==UserScript==
// @name        Ultoo Script By virpara007
// @namespace  
// @include     http://ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.65.27.2
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/http:\/\/ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Barfi;Kolkata;Bow;Mumbai;Emma Watson;Kalam;york;Medley;Agra;Jawan;Kohli;Rose;Mumbai;Tintin;Doctor;Music;Lima;cook;Daag;mumbai;Indradhanush;Arsenal;Bal Thackeray;Crater;Saif;Aaj Tak;Ooty;Rama;1990;Jan 3;Aashiqui 2;Baji Rao;Cricket;Aladdin;LOL;Madhuri;Satyajit Ray;Rose;5;Pauna;Vijaya;Zoya;Walsh;Microsoft;Sprite;Rajiv Gandhi;Dostana;Eye;Amitabh;Baseball";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[4].click();
	setTimeout("window.location.href = \"http://ultoo.com/AnswereIt.php?zxcoiesesscd=\";",500);           
}

pattern=/http:\/\/ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.com/AnswereIt.php?zxcoiesesscd=";
}
});