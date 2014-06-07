// ==UserScript==
// @name        Ultoo answer it By Akash Garg (modified ver of prakash suren)
// @namespace   Answer it only for multiple accounts use this with i macros in firefox...
// @description A part of script  taken from vikram singh bais script.. now its fastest....
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     21.04.2013
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
	var options="v prasad;england;toofan;mumbai;rishi;shakespeare;india;rama rao;dhaka;cinderella;china;nepal;kajol;kiwi;tabu;lee;cuba;1988;shivaji;spain;money plant;rani;narayan;jeetendra;hockey;28;asur;jazzy b;ravi;golden temple;priyanka;pepsi;bhangra;5;oriya;4;sudhir mishra;dance;shiv;mars;fanta;chambal;tucker;mother teresa;khiladi;sattar;usa;rane;5 days;goa;"
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