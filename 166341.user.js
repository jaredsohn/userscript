// ==UserScript==
// @name        kailash may 1
// @namespace  
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     29.04.2013
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

var pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("msgSent","home");
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",500);
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
		window.location.href=url.replace("PollCompleted", "AnswerIt");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value=Math.floor((Math.random() * 100000) + 10);
		document.getElementsByName('PollUserQuestion')[0].value="who is lucky for you..? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
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
	window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	
	{	
		
		document.getElementsByClassName('boxfieldcontent')[0].value=Math.floor(Math.random()*1000000)+9840000000;
		document.getElementsByClassName('boxfieldcontent')[1].value=Math.floor(Math.random()*1000000)+9840000000;
		document.getElementsByClassName('boxfieldcontent')[2].value=Math.floor(Math.random()*1000000)+9840000000;
		document.getElementsByClassName('boxfieldcontent')[3].value=Math.floor(Math.random()*1000000)+9840000000;
		document.getElementsByClassName('txtfieldcontent')[0].value=Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[1].value=Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[2].value=Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[3].value=Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[5].value=Math.floor((Math.random() * 1000000000000) + 1);		
		document.getElementsByClassName('txtfieldcontent')[6].value=Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByName('BtnSendNow_')[0].click();
		document.getElementsByName('BtnSendNow_')[1].click();
		document.getElementsByName('BtnSendNow_')[0].click();
		document.getElementsByName('BtnSendNow_')[1].click();
		document.getElementsByName('BtnSendNow_')[0].click();
		document.getElementsByName('BtnSendNow_')[1].click();
		document.getElementsByName('BtnSendNow_')[0].click();

		//document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",100);		
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
	
	var options="nadal;mutai;raja;pune;john cena;kajal;js verma;aamir;bhajji;pune;om puri;eec;ram jaane;13;google;tia;khufu;aamir;zambia;pune;1;apr 8;france;laila;hariharan;jazz;rat;ball;mars;sn pandey;iron man 3;van damme;cineplex;le lo;no;cricket;physics;amrit;ab jones;siam;bible;fold;oily way;paris;venus;tours;dolls;nepal;mars;pluto;;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].click();
	document.getElementsByTagName('input')[0].click();
	document.getElementsByTagName('input')[1].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[7].click();
/*
document.getElementsByTagName('input')[8].click();document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();
*/
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",500);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
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
	window.location.href="http://sms.ultoo.com";
}

});