// ==UserScript==
// @name         ul2up Script ful By rahulg007
// @namespace    ulto ka pulto 3.70
// @description  Just login n let the script wrk for u
// @include      http://sms.ultoo.com/*
// @updateURL	 http://userscripts.org/scripts/source/165974.meta.js
// @downloadURL	 http://userscripts.org/scripts/source/165974.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant        none
// @version      29.4.13
// @author       rahulg007
// ==/UserScript==
//FULL 3.70 RS
$(function(){
var url=window.location.href;
var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
		window.location.href=url.replace("mywallet","AnswereIt");
	alert("This Script is of 29April Created by rahulg007 for ff");
}
pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;
if(url.search(pattern)==0)
{
		var options="5;pune;emmy;avtar gill;dil;roll;mumbai;gay;uk;salman;sanjeev;french;5;soha;mg setu;shalya;gopalakris;model;lagos;govinda;pune;esha;pigiron;300;saif;uganda;square;sex;usa;pink;pele;fox;york;aurang;country;piano;rakhi;usa;jains;fiji;shell;mein kampf;persia;mouni roy;son;tank;ajmer;besma agha;ayaz kapoor;allu arjun";
		var cont=document.getElementsByTagName('p')[0].innerHTML;
		var qno=parseInt(cont.substr(17));
		document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
		document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
		document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
		document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
		//document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];	
		document.getElementsByTagName('input')[2].click();
		document.getElementsByTagName('input')[0].click();
		document.getElementsByTagName('input')[1].click();
		document.getElementsByTagName('input')[3].click();
		document.getElementsByTagName('input')[4].click();
		document.getElementsByTagName('input')[5].click();
		document.getElementsByTagName('input')[6].click();
		document.getElementsByTagName('input')[7].click();
	
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
	window.location.href="http://sms.ultoo.com/poll.php?zxcoiesesscd=";
}

//Poll
pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;
if(url.search(pattern)==0)
{
		var rand = computeRandom();
		var opt = "AnchorId_"+rand;
			ImplementClass(opt);
			document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",100);
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
		document.getElementsByName('PollUserName')[0].value="Ultoo User";
		document.getElementsByName('PollUserQuestion')[0].value="Has Ultoo made it users cry '"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="Yes";
		document.form1.submit();
   }
}
pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/home.php";
	alert("If SMS are not sending then Disable the script and enter text manualy enable script then Click Send");
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";
    if(content.search(pat)<0)
	{	
		setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 200);
		document.getElementsByClassName('boxfieldcontent')[0].value=9762225547;
		document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
		document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
		document.getElementsByClassName('boxfieldcontent')[3].value=9360299840;
				//document.getElementById('Message_').value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				//document.getElementById('Field').value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[0].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[1].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[2].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[3].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[4].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[5].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[6].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
				document.getElementsByClassName('txtfieldcontent')[7].value="Hi..., Happy Earning...!'"+Math.floor((Math.random() *200000000000000000) + 2)+"'";
		document.getElementsByName('BtnSendNow_')[0].click();
		document.getElementsByName('sendNowbtnDiv')[0].click();
		document.getElementsByName('sendNowbtnDiv')[1].click();
		//old code
		//document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",500);		
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}
pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/home.php";
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
	window.location.href="http://sms.ultoo.com/";
}
});