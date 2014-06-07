// ==UserScript==
// @name        Ultoo Script By kumar
//@description works on ultoo.com with Faster & New random poll submition 
// @namespace  ultoo
// @include     http://ultoo.com/*
// @include     
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     10.04.2013
// @icon           
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}


if(url.search(pattern)==0)

pattern=/^http:\/\/ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
	setTimeout("window.location.href = \"http://ultoo.com/poll.php?zxcoiesesscd=\";",150);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="kumar";
		document.getElementsByName('PollUserQuestion')[0].value="How many Mobile U Use in a Year..? & Me only "+Math.floor((Math.random() * 100) + 1)+".";
		document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 10);
		document.getElementById('OptionId2').value=Math.floor((Math.random() * 50) + 2);
		document.getElementById('OptionId3').value=Math.floor((Math.random() * 8) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}

pattern=/^http:\/\/ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)


//Messages

pattern=/^http:\/\/ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9125934021;
		document.getElementById('Message_').value="Hi..., Want be my friend...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://ultoo.com/home.php?zxcoiesesscd=\";",300);		
	}
	else
	{
			//window.location.href ="http://ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
var options="dhoni;round;tornado;nancy;delhi;vidyut;usa;bidur;meera;raina;china;tintin;bichel;sahir;bikes;punjab;bjp;shad begum;bolt;karan;thane;h2o;pooja;aamir;poker;jan 26;usa;sp;remo;rice;delhi;pooja;dilip kumar;shiva;cycling;irfan khan;dal lake;rani;bhima;6;bukit;kurnool;ganga;somnath;gujarat;lactore;amazon;mumbai;booker;hll"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://ultoo.com/AnswereIt.php?zxcoiesesscd=\";",250);
}

pattern=/http:\/\/ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://ultoo.com/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)

pattern=/^http:\/\/ultoo.com\/index.php/g;

if(url.search(pattern)==0)


pattern=/^http:\/\/ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)

pattern=/^http:\/\/ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.com/login";
}
});

