// ==UserScript==
// @name        Ultoo answer it by rahul
// @namespace   Answer it only 
// @description  script  fastest....
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     4.00.1.1
// @icon        http://img341.imageshack.us/img341/3755/14060001.png
// ==/UserScript==


$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("home","AnswereIt");
}
pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Robin Singh;Punjab;London;Lions;DMK;Riya;Guitar;Tara;Robin;Ben 10;Osama;Naina;Car;Maya;IPL;Army;Indrajit;Kaka;Vir Bhoomi;Mahima;Mamta;Rani;India;Pitt;2 yr;Appu Bhagnani;8X;Atta;Brown Rang;Tum Bin;Gippy;Namakharam;Carol Bartz;Aashiqui 2;Zamana;Action;Ranbir;Gaziabad;Nokia;Quo;Timex;Audi;MIxer;Tennis;4;addu;Saina;Dell;Akon;Akon;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",300);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/sms.ultoo.com\/AICompletion.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}
pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/login.php";

}

});