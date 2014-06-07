// ==UserScript==
// @name        Ultoo  (AnswerIT graph Skipper)
//@description works on www.ultoo.com with Faster preferred for slow net users
// @namespace  ultoo
// @include     http://www.ultoo.com/home.php*
// @include     http://www.ultoo.com/poll.php*
// @include     http://www.ultoo.com/mywallet.php*
// @include     http://www.ultoo.com/AnswerFr.php*
// @include     http://www.ultoo.com/PollCompletion.php*
// @include     http://www.ultoo.com/AICompletion.php*
// @include     http://www.ultoo.com/PollResult.php*
// @include     http://www.ultoo.com/middleAdPoll.php*
// @include     http://www.ultoo.com/PollCompleted.php*
// @include     http://www.ultoo.com/QuestionSaved.php*
// @include     http://www.ultoo.com/msgSent.php*
// @include     http://www.ultoo.com/middleAdSendsms.php*
// @include     http://www.ultoo.com/relogin.php*
// @include     http://www.ultoo.com/index.php*
// @include     http://www.ultoo.com/SessExpire.php*
// @include     *adf.ly*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     2013
// @author         Harsha
// @icon           http://t2.gstatic.com/images?q=tbn:ANd9GcQ2BYrq5RRPcbW_X2jC4PVwNHFoYT64C0o6XjaBn7um9wPZLgljow
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
//	window.location.href=url.replace("mywallet","AnswerFr");
//       window.open('http://www.ultoo.com/poll.php');
}
var pattern=/^http:\/\/adf.ly/g;
if(url.search(pattern)==0){
setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);}
//POLLS
pattern=/^http:\/\/www.ultoo.com\/poll.php/g;
var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://www.ultoo.com/poll.php?zxcoiesesscd=\";",310);
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
//	window.location.href="http://www.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://www.ultoo.com/home.php";
        window.open('http://www.ultoo.com/home.php');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Me";
		document.getElementsByName('PollUserQuestion')[0].value="2+32+ ? "+Math.floor((Math.random() * 100000) + 1)+"????";
document.getElementById('OptionId1').value=Math.floor((Math.random() * 100000) + 10);
document.getElementById('OptionId2').value=Math.floor((Math.random() * 50000) + 2);
document.getElementById('OptionId3').value=Math.floor((Math.random() * 8000) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}
pattern=/^http:\/\/www.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://www.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://www.ultoo.com/home.php";
        window.open('http://www.ultoo.com/home.php');
}



//Messages

var pattern=/^http:\/\/www.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=9803412481;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=9803412481;
}

if(document.getElementsByClassName('txtfieldcontent')[0].style.display=='')
{
document.getElementsByTagName('textarea')[0].value="Hello... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="tata... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="facebook... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Have gnt a nice day...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="well played! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="very well,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="yes ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="i know it! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="hmm..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="will not..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="no no no .! ,"+Math.floor((Math.random() * 10000000) + 1);
}
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://www.ultoo.com/home.php?zxcoiesesscd=\";",360);
	}
	else
	{
		window.location.href ="http://www.ultoo.com/logout.php?Logout=1";
	} 
}
pattern=/http:\/\/www.ultoo.com\/AnswerFr.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.com/AnswerFr.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://www.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.com\/middleAdSendsms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://www.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://adf.ly/P6P1S/";
 window.open('http://www.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 12000);
