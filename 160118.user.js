// ==UserScript==
// @name        Mantosh 3in1
// @namespace  
// @include     http://www.ultoo.in/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.in\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

pattern=/^http:\/\/www.ultoo.in\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_3');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://www.ultoo.in/poll.php?zxcoiesesscd=\";",500);
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
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Ultoo User";
		document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.form1.submit();

	}
}

pattern=/^http:\/\/www.ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/home.php?zxcoiesesscd=";
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
		document.getElementById('Message_').value=Math.floor((Math.random() * 1000000000000) + 1);
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://www.ultoo.in/home.php?zxcoiesesscd=\";",500);		
	}
	else
	{
		window.location.href ="http://www.ultoo.in/AICompletion.php";
		//window.location.href ="http://www.ultoo.in/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/www.ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Feb 10;Love;Red;Rose;beauty;Love;Love U;Joy;Love;I Love U;Like;Shabnam;Diya;Clean;Shatak;Ice;Vivek;Anand;Ocean;Agra;Bhangra;Cake;Gas;Tata;Ahwa;Sushmita;India;Ramawan;Race;Text file;Noida;Green park;Amritsar;Iraq war;Owl;4;Yogurt;HP;Lion;Friday;Lara;Sukhbir singh;MP;Hum;SP;Menaka;Kadoma;India;Salman khan;Rink";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].click();
	setTimeout("window.location.href = \"http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=\";",500);
}

pattern=/http:\/\/www.ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.in\/AICompletion.php/g;

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
	window.location.href="http://www.ultoo.in/login.php";
}

});	