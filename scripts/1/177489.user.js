// ==UserScript==
// @name        Ultoo Script By Hitu
//@description works on www.ultoo.in with Faster & New random poll submition method added
// @namespace  ultoo
// @include     http://www.ultoo.in/*
// @include     http://adf.ly/*
// @include     http://userscripts.org/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     10.09.2013
// @updateURL		http://userscripts.org/scripts/source/162437.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162437.user.js
// @author         TeamJK
// @icon           http://bitthief.ethz.ch/images/bt167.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.in\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}
/*
var pattern=/^http:\/\/www.ultoo.in\/home.php/g;
if(url.search(pattern)==0)
{
//setInterval(function () {alert("Click on options and select---Allow Popups for www.ultoo.in---at Top Right corner of this page for superfast earning");}, 100);
	window.location.href=url.replace("home","AnswereIt");
//	window.location.href=url.replace("mywallet","AnswereIt");
}
*/
var pattern=/^http:\/\/adf.ly/g;
if(url.search(pattern)==0)
{
setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);
}
pattern=/^http:\/\/www.ultoo.in\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
var mobile=8528228412;
var message="Hi.., Good Day...! "+Math.floor((Math.random() * 1000000000) + 1)+"times";
$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:message , SendNow_:"Send Now"}, function(){});
setTimeout("window.location.href = \"http://www.ultoo.in/poll.php?zxcoiesesscd=\";",300);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

if (path == "/scripts/show/163038")
{
	location.href = 'http://userscripts.org/scripts/show/162437';
}

pattern=/^http:\/\/www.ultoo.in\/PollResult.php/g;

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

pattern=/^http:\/\/www.ultoo.in\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/www.ultoo.in\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/www.ultoo.in\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
//	window.location.href="http://adf.ly/L9dMh";
	window.location.href=url.replace("PollCompleted", "home");
        window.open('http://adf.ly/KzKNg');
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

pattern=/^http:\/\/www.ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://adf.ly/L9dMh";
	window.location.href ="http://www.ultoo.in/home.php?zxcoiesesscd=";
        window.open('http://adf.ly/KzKNg');
}

//Messages

pattern=/^http:\/\/www.ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=8528228412;
		document.getElementById('Message_').value="Hi.., Good Day...! "+Math.floor((Math.random() * 1000000000) + 1)+"times";
		document.frmSendwww.submit();
		setTimeout("window.location.href = \"http://www.ultoo.in/home.php?zxcoiesesscd=\";",400);		
	}
	else
	{
		window.location.href ="http://www.ultoo.in/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/www.ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
var options="Pakistan;Rain;Pune;Mathura;Raj;99;Green Park;BJP;Charkha;Mumbai;Bipasha;Anand;Fashion;Buddhists;China;Google;Twinkle;Vodafone;Bheeshma;Udita;Madonna;England;Punjab;Don;Soha;Pankaj;Tyres;Bear;Robert Shaw;4;Marathon;jai;Chess;3 Sec;Lima;Manipur;Kalpana Chawla;Mike Tyson;None;None;Mukesh ambani;Sunita Narain;Kanika;Rama;Bhopal;Tata;Ankara;Mumbai;Pogo;Choota Bheem;"
var cont=document.getElementsByTagName('p')[0].innerHTML;
var qno=parseInt(cont.substr(17));
document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
var mobile=8528228412;
var messg="Hi.., Good Day...! "+Math.floor((Math.random() * 1000000000) + 1)+"times";
setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:messg , SendNow_:"Send Now"}, function(){});},350);
document.getElementsByTagName('input')[2].click();
setTimeout("window.location.href = \"http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=\";",400);
}
pattern=/http:\/\/www.ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/Ner4O";
}
pattern=/^http:\/\/www.ultoo.in\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/KzKNg";
}

pattern=/^http:\/\/www.ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/L9dMh";
}

pattern=/^http:\/\/www.ultoo.in\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/L9dMh";
}

pattern=/^http:\/\/www.ultoo.in\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://way23gp.blogspot.com";
         window.open('http://www.ultoo.in/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 50000);