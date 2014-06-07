// ==UserScript==
// @name        Ultoo New working 3in1 Script By t1
//@description works on ultoo.in with Faster & New ultoo 3in1 script methodd
// @namespace  ultoo
// @include     http://ultoo.in/home.php*
// @include     http://ultoo.in/AnswereIt.php*
// @include     http://ultoo.in/poll.php*
// @include     http://ultoo.in/mywallet.php*
// @include     http://ultoo.in/AnswereItGraph.php*
// @include     http://ultoo.in/PollCompletion.php*
// @include     http://ultoo.in/AICompletion.php*
// @include     http://ultoo.in/PollResult.php*
// @include     http://ultoo.in/middleAdPoll.php*
// @include     http://ultoo.in/PollCompleted.php*
// @include     http://ultoo.in/QuestionSaved.php*
// @include     http://ultoo.in/msgSent.php*
// @include     http://ultoo.in/middleAdSendSms.php*
// @include     http://ultoo.in/relogin.php*
// @include     http://ultoo.in/index.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     28.04.2013
// @updateURL		http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162368.user.js
// @author         Gambler_No.1
// @icon           http://bitthief.ethz.ch/images/bt167.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/ultoo.in\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://ultoo.in/poll.php');
alert("Click on options and select---Allow Popups for ultoo.in---at Top Right corner of this page for superfast earning");
}
/*
var pattern=/^http:\/\/ultoo.in\/home.php/g;
if(url.search(pattern)==0)
{
//setInterval(function () {alert("Click on options and select---Allow Popups for ultoo.in---at Top Right corner of this page for superfast earning");}, 100);
	window.location.href=url.replace("home","AnswereIt");
}
*/

pattern=/^http:\/\/ultoo.in\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://ultoo.in/poll.php?zxcoiesesscd=\";",100);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/ultoo.in\/PollResult.php/g;

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

pattern=/^http:\/\/ultoo.in\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/ultoo.in\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/ultoo.in\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
//	window.location.href="http://ultoo.in/logout.php?LogOut=1";
	window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="RAJ";
		document.getElementsByName('PollUserQuestion')[0].value="What's the longest amount of time you've spent at a restaurant..? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
document.getElementById('OptionId1').value=Math.floor((Math.random() * 100000) + 10);
document.getElementById('OptionId2').value=Math.floor((Math.random() * 50000) + 2);
document.getElementById('OptionId3').value=Math.floor((Math.random() * 8000) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}

pattern=/^http:\/\/ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://ultoo.in/logout.php?LogOut=1";
	window.location.href ="http://ultoo.in/home.php?zxcoiesesscd=";
}

//AnswereIt
pattern=/^http:\/\/ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Barfi;Kolkata;Bow;Mumbai;Emma Watson;Kalam;york;Medley;Agra;Jawan;Kohli;Rose;Mumbai;Tintin;Doctor;Music;Lima;cook;Daag;mumbai;Indradhanush;Arsenal;Bal Thackeray;Crater;Saif;Aaj Tak;Ooty;Rama;1990;Jan 3;Aashiqui 2;Baji Rao;Cricket;Aladdin;LOL;Madhuri;Satyajit Ray;Rose;5;Pauna;Vijaya;Zoya;Walsh;Microsoft;Sprite;Rajiv Gandhi;Dostana;Eye;Amitabh;Baseball;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].click();
	document.getElementsByTagName('input')[0].click();
	document.getElementsByTagName('input')[1].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[7].click();
/*
document.getElementsByTagName('input')[8].click();document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();
*/
setTimeout("window.location.href = \"http://ultoo.in/AnswereIt.php?zxcoiesesscd=\";",400);
}

//Messages

var pattern=/^http:\/\/ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
	document.getElementById('sYJXmyYyQW').value=8528228412;
        document.getElementById('ASDFasdfou').value=Math.floor((Math.random() * 100000000) + 1);
	document.OcDFBSkxBk.submit();
	setTimeout("window.location.href = \"http://ultoo.in/home.php?zxcoiesesscd=\";",300);
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[3].value=9360299840;
document.getElementsByClassName('txtfieldcontent')[1].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="Good Day... !"+Math.floor((Math.random() * 20000000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="Good Day... !"+Math.floor((Math.random() * 30000000) + 1);
document.getElementsByClassName('txtfieldcontent')[5].value="Good Day... !"+Math.floor((Math.random() * 40000000) + 1);
document.getElementsByClassName('txtfieldcontent')[6].value="Good Day... !"+Math.floor((Math.random() * 50000000) + 1);
document.getElementById("sendNowbtnDiv").click();
//setTimeout("window.location.href = \"http://ultoo.in/home.php?zxcoiesesscd=\";",400);

//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 200);
	}
	else
	{
		window.location.href ="http://ultoo.in/logout.php?Logout=1";
	} 
	}
pattern=/http:\/\/ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://ultoo.in/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://ultoo.in/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.in\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.in\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://way23gp.blogspot.com";
         window.open('http://ultoo.in/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 5000);