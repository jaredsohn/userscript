// ==UserScript==
// @name        Ultoo Script By Ishaan Kumar
//@description 	Automate the process of SMS,Polls&Answers
// @namespace  	Ultoo
// @include     http://sms.ultoo.com/*
// @include     http://adf.ly/*
// @require 	https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require 	http://userscripts.org/scripts/source/159675.user.js
// @grant       none
// @version    	3.0
// @updateURL	http://userscripts.org/scripts/source/159675.meta.js
// @downloadURL	http://userscripts.org/scripts/source/159675.user.js
// @licence     New Version From Userscripts.org
// ==/UserScript==
$(function(){

var path = window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0)
{
setInterval(function () {document.getElementById("skip_ad_button").click();}, 1000);
}

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
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Yastika";
		document.getElementsByName('PollUserQuestion')[0].value="How many tourism places do you visit in a year..? & Me only "+Math.floor((Math.random() * 100) + 1)+".";
		document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 10);
		document.getElementById('OptionId2').value=Math.floor((Math.random() * 50) + 2);
		document.getElementById('OptionId3').value=Math.floor((Math.random() * 8) + 1);
		document.getElementById('OptionId4').value="Can't say";
		document.form1.submit();

	}
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/MWv2M";
}


//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=8654818096;
		document.getElementById('Message_').value="Hi...., All the Best...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",300);		
	}
	else
	{
		window.location.href ="http://adf.ly/MWwU9";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
var options="yuvraj;sharma;mumbai;venkatesh;chotu;italy;nairobi;england;black;amitabh;valmiki;pune;1990;mp;perth;raja;pepsi;975;euro;3;sonia;kolkata;mira;adam smith;russian;kannan iyer;konkan;heroin;australia;canberra;mohit suri;india;sheya kapoor;agra fort;chidiya ghar;chanderi;love;amitav ghosh;jai hind;amrita;rajesh khanna;rahul roy;kat;polo;dijon;golu;manoj mitra;hazare;aashiqui;rahul roy";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",300);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/MWvrJ";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/MWw4b";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MWv2M";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MWwU9";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MWwU9";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MWwld";
}

});