// ==UserScript==
// @name        Ultoo Script 2in1
// @namespace  
// @include     http://quiz.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.65.27.2
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/quiz.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/http:\/\/quiz.ultoo.com\/AnswereIt.php/g;

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
	setTimeout("window.location.href = \"http://quiz.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",500);           
}

pattern=/http:\/\/quiz.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://quiz.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}
pattern=/http:\/\/quiz.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://quiz.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}
pattern=/^http:\/\/quiz.ultoo.com\/AICompletion.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/poll.php?zxcoiesesscd=";
}

//Poll
pattern=/^http:\/\/quiz.ultoo.com\/poll.php/g;
if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://quiz.ultoo.com/poll.php?zxcoiesesscd=\";",300);
}
pattern=/^http:\/\/quiz.ultoo.com\/PollResult.php/g;
if(url.search(pattern)==0)
{
	var link = $(".poll_result_gbg a:last").attr('href');
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
    var link2 = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link2) != "undefined")
	{
		window.location.href = link2;
	}
}
pattern=/^http:\/\/quiz.ultoo.com\/middleAdPoll.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}
pattern=/^http:\/\/quiz.ultoo.com\/PollCompletion.php/g;
if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}
pattern=/^http:\/\/quiz.ultoo.com\/PollCompleted.php/g;
if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Ultoo User";
		document.getElementsByName('PollUserQuestion')[0].value="why is ultoo creating so much mess'"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="geting upset with earing";
		document.form1.submit();
   }
}
pattern=/^http:\/\/quiz.ultoo.com\/QuestionSaved.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/logout.php?Logout=1";
}

//Messages

pattern=/^http:\/\/quiz.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";
    if(content.search(pat)<0)
	{	
		document.getElementsByClassName('boxfieldcontent')[0].value=9762225547;
		document.getElementsByClassName('boxfieldcontent')[1].value=9762225547;
		document.getElementsByClassName('boxfieldcontent')[2].value=9762225547;
		document.getElementsByClassName('boxfieldcontent')[3].value=9762225547;
		document.getElementsByClassName('boxfieldcontent')[4].value=9762225547;
                document.getElementById('Message_').value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementById('Field').value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[0].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[1].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[2].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[3].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[4].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[5].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[6].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[7].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
		document.getElementsByName('BtnSendNow_')[0].click();
		document.getElementsByName('BtnSendNow_')[1].click();
		//old code
		//document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://quiz.ultoo.com/home.php?zxcoiesesscd=\";",500);		
	}
	else
	{
		window.location.href ="http://quiz.ultoo.com/logout.php?Logout=1";
	}
}
pattern=/^http:\/\/quiz.ultoo.com\/msgSent.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/home.php";
}
pattern=/^http:\/\/quiz.ultoo.com\/index.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/logout.php?LogOut=1";
}
pattern=/^http:\/\/quiz.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/logout.php?LogOut=1";
}
pattern=/^http:\/\/quiz.ultoo.com\/relogin.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://quiz.ultoo.com/";
}
});