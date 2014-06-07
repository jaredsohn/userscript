// ==UserScript==
// @name        Ultoo Script By sunil
//@description works on sms.ultoo.com with Faster & New random poll submition method added
// @namespace  ultoo
// @include     http://sms.ultoo.com/*

// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     4.2
// ==/UserScript==
$(function(){
var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0)
{
setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",150);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

if (path == "/scripts/show/163038")
{
	location.href = 'http://userscripts.org/scripts/show/162368';
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
window.location.href ="http://adf.ly/L9d28";
		//window.location.href=url.replace("PollCompleted", "AnswereIt");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="VK";
		document.getElementsByName('PollUserQuestion')[0].value="What's the longest amount of time you've spent at a restaurant..? & Me only "+Math.floor((Math.random() * 100) + 1)+"minutes";
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
	window.location.href ="http://adf.ly/L9d28";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=8121950148;
		document.getElementById('Message_').value="Hi.., Have a Lovely Day...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);		
	}
	else
	{
		window.location.href ="http://adf.ly/L9dMh";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
var options="robin singh;SOTY;Hockey;taken;1936;tom;maruti;tennis;sp;kolkata;yuva;times;40 mm;sanjay kapoor;common raven;kal El;spain;london;mons;chess;lily;uber cup;delhi;shanaya;green;kalki;up;sala;rehman;dhaka;salman;pune;penna;jerry;agra;vidyut jamwal;pool;sp;saturn;spider;lo lo;aamir;kohli;chinese;tea;coke;mumbai;pakshi;indian;pooja chopra"
		var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",300);
}


pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/KzKNg";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/KzKNg";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/L9dMh";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/L9dMh";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://way23gp.blogspot.com";
}
});
setTimeout(function(){
   window.location.reload(1);
}, 60000);