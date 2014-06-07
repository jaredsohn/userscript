// ==UserScript== 
// @name             Ultoo 27nd may
//@description     Ultoo
// @namespace  ultoo
// @include     http://sms.ultoo.com/home.php*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @include      http://sms.ultoo.com/poll.php*
// @include     http://sms.ultoo.com/mywallet.php*
// @include     http://sms.ultoo.com/AnswereItGraph.php*
// @include     http://sms.ultoo.com/PollCompletion.php*
// @include     http://sms.ultoo.com/AICompletion.php*
// @include     http://sms.ultoo.com/PollResult.php*
// @include     http://sms.ultoo.com/middleAdPoll.php*
// @include      http://sms.ultoo.com/PollCompleted.php*
// @include     http://sms.ultoo.com/QuestionSaved.php*
// @include     http://sms.ultoo.com/msgSent.php*
// @include     http://sms.ultoo.com/middleAdSendSms.php*
// @include     http://sms.ultoo.com/relogin.php*
// @include     http://sms.ultoo.com/index.php*
// @include     http://sms.ultoo.com/SessExpire.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     27.05.2013
// @updateURL		http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162368.user.js
// @author         Master Suyog
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
setInterval(function () {alert("Click on options and select--->Allow Popups for sms.ultoo.com<---at Top Right corner of this page for superfast earning");}, 5000);	
        window.location.href=url.replace("mywallet","poll");
//        window.open('http://adf.ly/O2MQD');
//        window.open('http://adf.ly/PagoL');
//        window.open('http://adf.ly/POjJh');
}

//POLLS
pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",310);
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
//	window.location.href="http://adf.ly/PLc0M";
	window.location.href ="http://adf.ly/O7Jw5";
//        window.open('http://adf.ly/O7Jw5');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="RAJ";
		document.getElementsByName('PollUserQuestion')[0].value="What's the longest amount of time you've spent at a restaurant..? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
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
//	window.location.href="http://adf.ly/PLc0M";
	window.location.href ="http://adf.ly/O7Jw5";
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
if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=9561424927;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=9561424927;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=9561424927;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=9561424927;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=9561424927;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=9561424927;
}

if(document.getElementsByClassName('txtfieldcontent')[0].style.display=='')
{
document.getElementsByTagName('textarea')[0].value="Good morning... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="Hi...,Good morning... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="Hello...,Good morning... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Hi..., Have a nice day...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Happy Birth Day...dude...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Good holiday. 5,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Hello...dude...All the Best... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Hi...dude.., Best of Luck..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="All the very Best...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Hi.., Good Day..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Nice to meet u..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",360);
	}
	else
	{
	window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	} 
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/Nx5vu";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/Nx64h";
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://adf.ly/Nx64h";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/PLbqz";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
window.location.href="http://adf.ly/PLbe2";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://adf.ly/PLbe2";
         window.open('http://adf.ly/Nx6Dv');
         window.open('http://adf.ly/PLbb6');
window.open('http://adf.ly/PLbb6');
window.open('http://adf.ly/PBoS0');
window.open('http://adf.ly/PBoS0');
window.open('http://adf.ly/PLMp4');
}
});