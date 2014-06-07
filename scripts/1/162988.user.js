// ==UserScript==
// @name        Ultoo Script By Yastika
//@description Automate the process of SMS,Polls&Answers
// @namespace  ultoo
/
/ @include     http://adf.ly/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require http://userscripts.org/scripts/source/162929.user.js
// @grant       none
// @version     2.5
// @updateURL		http://userscripts.org/scripts/source/161997.meta.js
// @downloadURL		http://userscripts.org/scripts/source/161997.user.js
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

var pattern=/home/g;

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
		document.getElementsByName('PollUserName')[0].value="Gyanendra";
		document.getElementsByName('PollUserQuestion')[0].value="How many tourism places do you visit in a year..? & Me only "+Math.floor((Math.random() * 100) + 1)+".";
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
	window.location.href ="home";
}


//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9200114007;
		document.getElementById('Message_').value="Hi..., All the Best...! '"+Math.floor((Math.random() * 1000000000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",300);		
	}
	else
	{
		window.location.href ="home";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
var options="sattar;khiladi;jaggu bhagnani;nandalol;9x;fanta;lippy;kathak;brown rang;tum bin;3;5 yr;electronics;sports;4;abu dhabi;barabati;arjun;horse racing;6;sc jamir;patna;ind-sl;mumbai;assembly;antony;preity;up;japan;jdu;oslo;riboflavin;200;usa;rane;tyres;konark;bear;up;7;usa;governor;ap;history;4 days;prem;dmk;athletes;nuclear weapons;oct 12";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",300);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/L9d28";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/KzFot";
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
	window.location.href="http://www.way23gp.blogspot.in/p/blog-page.html";
}

});