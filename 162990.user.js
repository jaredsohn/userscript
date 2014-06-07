// ==UserScript==
// @name        Ultoo New working 3in1 Script By Earntipsntricks
//@description works on sms.ultoo.com with Faster & New ultoo 3in1 script methodd
// @namespace  ultoo
// @include     http://sms.ultoo.com/home.php*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @include     http://sms.ultoo.com/poll.php*
// @include     http://sms.ultoo.com/mywallet.php*
// @include     http://sms.ultoo.com/AnswereItGraph.php*
// @include     http://sms.ultoo.com/PollCompletion.php*
// @include     http://sms.ultoo.com/AICompletion.php*
// @include     http://sms.ultoo.com/PollResult.php*
// @include     http://sms.ultoo.com/middleAdPoll.php*
// @include     http://sms.ultoo.com/PollCompleted.php*
// @include     http://sms.ultoo.com/QuestionSaved.php*
// @include     http://sms.ultoo.com/msgSent.php*
// @include     http://sms.ultoo.com/middleAdSendSms.php*
// @include     http://sms.ultoo.com/relogin.php*
// @include     http://adf.ly/O5iZv*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     30.04.2013
// @updateURL		http://userscripts.org/scripts/source/163194.meta.js
// @downloadURL		http://userscripts.org/scripts/source/163194.user.js
// @author         Earntipsntricks
// @icon           http://bitthief.ethz.ch/images/bt167.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");
//setInterval(function () {alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");}, 8000);
	window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://sms.ultoo.com/poll.php');
}
/*
var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
//setInterval(function () {alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");}, 100);
	window.location.href=url.replace("home","AnswereIt");
}
*/

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",200);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/sms.ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
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

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

//AnswereIt
pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Nadal;Almagro;Delhi;Akshaye;Pune;Kolkata;Spain;Sukhbir Badal;Shashi Kapoor;Mexico;Film;Bihar;Sandra Bullock;Pune;Piano;Japan;Sarod;Rajasthan;Zen;NBA;Mumbai;Sony;Rama;UK;Shahid Kapoor;Softin;2;J Star;Skin;Butwal;Kidney;AP;England;Bhutan;Virus;Kerala;London;Manmohan;Heline;D2;Jaipur;Asia;Dersiu;Transport;Mount Kailash;Round;Auricle;Mongolian;Rexton;Honey Singh;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
//	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
/*
	document.getElementsByTagName('input')[2].click();
	document.getElementsByTagName('input')[0].click();
	document.getElementsByTagName('input')[1].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
*/
//	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[7].click();
document.getElementsByTagName('input')[8].click();document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();
document.getElementsByTagName('input')[11].click();
document.getElementsByTagName('input')[12].click();
/*
document.getElementsByTagName('input')[13].click();document.getElementsByTagName('input')[14].click();document.getElementsByTagName('input')[15].click();
document.getElementsByTagName('input')[16].click();document.getElementsByTagName('input')[17].click();document.getElementsByTagName('input')[18].click();document.getElementsByTagName('input')[19].click();document.getElementsByTagName('input')[20].click();
*/
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
}

//Messages

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
	document.getElementById('sYJXmyYyQW').value=8528228412;
        document.getElementById('ASDFasdfou').value="Good Day.. ,"+Math.floor((Math.random() * 1000000000000) + 1);
document.getElementById("sendNowbtnDiv").click();
//	document.OcDFBSkxBk.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[3].value=9360299840;
document.getElementsByClassName('txtfieldcontent')[1].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="Good Day... !"+Math.floor((Math.random() * 20000000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="Good Day... !"+Math.floor((Math.random() * 30000000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="Good Day... !"+Math.floor((Math.random() * 40000000) + 1);
document.getElementsByClassName('txtfieldcontent')[5].value="Good Day... !"+Math.floor((Math.random() * 50000000) + 1);
document.getElementsByClassName('txtfieldcontent')[6].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementById("sendNowbtnDiv").click();
//setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	} 
	}
pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://way23gp.blogspot.com";
         window.open('http://sms.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 5000);