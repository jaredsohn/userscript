// ==UserScript==
// @name        poller
// @namespace  
// @include     http://www.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.75
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

pattern=/^http:\/\/www.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}
pattern=/^http:\/\/www.ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/www.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/www.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/www.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Ultoo Guest";
		document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.form1.submit();

	}
}

pattern=/^http:\/\/www.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/home.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/www.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=8221054169;
                document.getElementById('Message_').value=Math.floor((Math.random() * 1000000000000) + 1);
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://www.ultoo.com/home.php?zxcoiesesscd=\";",500);		
	}if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?Logout=1";
}

pattern=/^http:\/\/www.ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.in\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.in\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in";
}

});

