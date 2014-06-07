// ==UserScript==
// @name        Ultoo answer it prakash suren
// @namespace  
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==


$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}
                    /*AnswerIt*/

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="june 15;kolkata;12;dil tera aashiq;pukar;mohini;4;tezaab;west side story;jackie shroff;priyanka;inder kumar;surat;salman;alappuzha;bharat ratna;ganthari;yellow;rolex;sri lanka;swati;fencing;denmark;27;zombie;song;gaja gamini;sanjeev;rehman malik;indira setu;luna;lagos;devdas;gatlin;3;ram dass;gopalakrishan;hyderabad;300;booti;leap;porsche;zombie;fouriron;dog;puja;sri lanka;gloris;go goa;dehra dun;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17)); 
   if(document.getElementsByClassName('inputtxt')[0].style.height=='')
{
document.getElementsByClassName('inputtxt')[0].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[1].style.height=='')
{
document.getElementsByClassName('inputtxt')[1].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[2].style.height=='')
{
document.getElementsByClassName('inputtxt')[2].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[3].style.height=='')
{
document.getElementsByClassName('inputtxt')[3].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[4].style.height=='')
{
document.getElementsByClassName('inputtxt')[4].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[5].style.height=='')
{
document.getElementsByClassName('inputtxt')[5].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[6].style.height=='')
{
document.getElementsByClassName('inputtxt')[6].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[7].style.height=='')
{
document.getElementsByClassName('inputtxt')[7].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[8].style.height=='')
{
document.getElementsByClassName('inputtxt')[8].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[9].style.height=='')
{
document.getElementsByClassName('inputtxt')[9].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[10].style.height=='')
{
document.getElementsByClassName('inputtxt')[10].value=options.split(";")[qno-1];
}
//var mobile=9016403905;
document.getElementsByTagName('input')[5].click();document.getElementsByTagName('input')[6].click();document.getElementsByTagName('input')[7].click();document.getElementsByTagName('input')[8].click();
document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();document.getElementsByTagName('input')[11].click();document.getElementsByTagName('input')[12].click();
//setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"hi have a nice day"+Math.floor((Math.random() * 10000) + 1)+"'", SendNow_:"Send Now"}, function(){});},250);
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",150);
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