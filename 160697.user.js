// ==UserScript==
// @name        Ul2 Script By sanskirti
// @namespace  
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==
pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="224;Ganga;10;Cuba;Lolo;4;Max Muller;Tennis;Pound;Lamhe;Rome;Duck;Anil Kapoor;Mumbai;V Pandit;Fiza;2 Weeks;Agra;India;Abhishek;Red;Abhishek;Guta Goo;Genda;Ajay Vijay;Chess;Rockstar;Hay Tauba;Ears;Tailor;Cat;Kanha;BR Ambedkar;Rohit Sharma;Kashi;Yerawada;Satpura;Surya;Nalanda;Speed;Hockey;Jamuni;Salman;Polo;Milk;16;Nazara;Uma Bharti;Radha;Ravi Shastri";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",500);
}
