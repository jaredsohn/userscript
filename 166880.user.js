// ==UserScript==
// @name        Ultoo New 3in1 Script By 3GZone.in
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
// @include     http://sms.ultoo.com/index.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     4.05.2013
// @updateURL		http://userscripts.org/scripts/source/163194.meta.js
// @downloadURL		http://userscripts.org/scripts/source/163194.user.js
// @author         Gambler_No.1
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
//setInterval(function () {alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");}, 5000);
	window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://sms.ultoo.com/poll.php');
}
/*
var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("home","AnswereIt");
}
*/
//POLLS
pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
/*
var mobile=8528228412;
var message="Hi.., Good Day... ,"+Math.floor((Math.random() * 1000000000) + 1)+"times";
$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , GsqbPdiMSo:mobile , rFBOayWrjq:message , SendNow_:"Send Now"}, function(){});
*/
setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",150);
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
        window.open('http://sms.ultoo.com/home.php');
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
        window.open('http://sms.ultoo.com/home.php');
}

//AnswereIt

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="vicky donor;mumbai;kapil sibal;200;saajan;insect;hp;prides;doctor;richie;black cats;akshay kumar;thailand;sohail khan;charan singh;delhi;player;australia;sania;france;punjab;god;tom cruise;computer;bamboo;mazie;geet trivedi;relophobia;sophia;zeenat;tiger;alpet;kerry;cows;sara;salman;species;euro;lion;animals;1970;salman;artic;lara;pakistan;cheetah;swift;rekha;dove;drama;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));

if(document.getElementsByClassName('inputtxt')[0].style.display=='')
{
document.getElementsByClassName('inputtxt')[0].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[1].style.display=='')
{
document.getElementsByClassName('inputtxt')[1].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[2].style.display=='')
{
document.getElementsByClassName('inputtxt')[2].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[3].style.display=='')
{
document.getElementsByClassName('inputtxt')[3].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[4].style.display=='')
{
document.getElementsByClassName('inputtxt')[4].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[5].style.display=='')
{
document.getElementsByClassName('inputtxt')[5].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[6].style.display=='')
{
document.getElementsByClassName('inputtxt')[6].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[7].style.display=='')
{
document.getElementsByClassName('inputtxt')[7].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[8].style.display=='')
{
document.getElementsByClassName('inputtxt')[8].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[9].style.display=='')
{
document.getElementsByClassName('inputtxt')[9].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[10].style.display=='')
{
document.getElementsByClassName('inputtxt')[10].value=options.split(";")[qno-1];
}

document.getElementsByTagName('input')[5].click();
document.getElementsByTagName('input')[6].click();
document.getElementsByTagName('input')[7].click();
document.getElementsByTagName('input')[8].click();
document.getElementsByTagName('input')[9].click();
document.getElementsByTagName('input')[10].click();
document.getElementsByTagName('input')[11].click();
//document.getElementsByTagName('input')[12].click();
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",350);
}

//Messages

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=9360299840;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=9360299840;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=8528228412;
}

if(document.getElementsByClassName('txtfieldcontent')[0].style.display=='')
{
document.getElementsByTagName('textarea')[0].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="Good morning.2 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Good afternoon. 3,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Good night.4 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Good holiday. 5,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}

//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);
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
	 window.location.href="http://3gzone.in";
         window.open('http://sms.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 5000);