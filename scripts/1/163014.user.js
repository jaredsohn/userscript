// ==UserScript==
// @name        Ultoo Script By Raunak Sibal
// @namespace  
// @description Updated on 19.4.13, this script compleate all ultoo task in fast Way as you want Without Adf.ly link.
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     25.03.2013
// ==/UserScript==
$(function(){

var path = window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",200);
}

pattern=/^http:\/\/sms.ultoo.com\/PollResult.php/g;

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
		document.getElementsByName('PollUserName')[0].value="RaunakSibal";
		document.getElementsByName('PollUserQuestion')[0].value="What is Capital Of  Bangladesh..? & Me only "+Math.floor((Math.random() * 100) + 1)+".";
		document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 10);
		document.getElementById('OptionId2').value=Math.floor((Math.random() * 50) + 2);
		document.getElementById('OptionId3').value=Math.floor((Math.random() * 8) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;


if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9098669064; 
                document.getElementById('Message_').value="Hi..., Have a Good Day Mrs. RG...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",200);		
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Webber;Sehwag;Diya;Egypt;Murray;Punjab;Tom Cruise;Naveen Patnaik;Nakul;Goku;Icc;31 May;Mp;Amar;Vienna;Chess;Messi;Usa;Life;Aamir;Hansika;Maya;Delhi;The Iron Lady;Sitar;Tetanus;Shiva;Senate;Sikhism;Russia;Goa;Elbe;Saif;Nse;Amritsar;Delhi;Jonggy;Paro;Go;Lion;Dog;Luck;Boris;Pooja Salvi;Tata Motors;44;Italy;Rabies;Tn"

	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",200);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?Logout=1";
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
	window.location.href="http://sms.ultoo.com/login.php";
}

});

