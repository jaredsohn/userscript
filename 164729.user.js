// ==UserScript==
// @name        ult2.in Script 2in1 By rahulg007
// @namespace   ulto.in ka pulto
// @description  Just login n let the script wrk for u
// @include     http://ultoo.in/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     11th April
// @author      rahulg007
// ==/UserScript==
$(function(){
var url=window.location.href;
var pattern=/^http:\/\/ultoo.in\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}
pattern=/^http:\/\/ultoo.in\/poll.php/g;
if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://ultoo.in/poll.php?zxcoiesesscd=\";",500);
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
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Ultoo User";
		document.getElementsByName('PollUserQuestion')[0].value="Ultoo Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.form1.submit();
   }
}
pattern=/^http:\/\/ultoo.in\/QuestionSaved.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/home.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/ultoo.in\/home.php/g;
if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";
    if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9762225547;
                document.getElementById('Message_').value="Hi..., Happy Earning...! '"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://ultoo.in/home.php?zxcoiesesscd=\";",500);		
	}
	else
	{
	window.location.href="http://ultoo.in/logout.php?Logout=1";
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
	window.location.href="http://frendz4m.com/";
}
});