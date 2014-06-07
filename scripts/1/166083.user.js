// ==UserScript==
// @name        Ultoo 29-04-2013 by shyamaprasad Patra
// @namespace   ultoo
// @include     http://sms.ultoo.com/home.php*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @include     http://sms.ultoo.com/poll.php*
// @include     http://sms.ultoo.com/mywallet.php*
// @include     http://sms.ultoo.com/AnswereItGraph.php*
// @include     http://sms.ultoo.com/PollCompletion.php*
// @include     http://sms.ultoo.com/AICompletion.php*
// @include     http://sms.ultoo.com/PollResult.php*
// @include     http://sms.ultoo.com/middleAdPoll.php*
// @include     http://sms.ultoo.com/PollCompleted.php*
// @include     http://sms.ultoo.com/QuestionSaved.php*
// @include     http://sms.ultoo.com/msgSent.php*
// @include     http://sms.ultoo.com/middleAdSendSms.php*
// @include     http://sms.ultoo.com/relogin.php*
// @include     http://sms.ultoo.com/index.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     29-04-2013
// @updateURL	http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL	http://userscripts.org/scripts/source/162368.user.js
// @author      Shyamaprasad Patra
// @licence     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://sms.ultoo.com/poll.php');
alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");
}
/*
var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
//setInterval(function () {alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");}, 100);
	window.location.href=url.replace("home","AnswereIt");
}
*/

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
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
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
	window.location.href=url.replace("PollCompleted", "home");
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
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

//AnswereIt
pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="4,Mumbai,Golden Globe,Dara Singh,Khalnayak,Roll,Punjab,Blake,HP,Akshay,Shivaji Rao,Spanish,4,Suzanne,Rabindra Setu,Drupada,Narayana Murthy,PA,Gaborone,Govinda,Punjab,Priyanka,Gridiron,187,Saif,Uganda,Circle,Crime,Canada,Orange,Pele,Fox,Manchester,Aurangzeb,Fundamental Right,Guitar,Tamannah,Sri Lanka,Parsees,Vatican City,Texaco,Mein Kampf,Malaya,Prachi Desai,Brother,Aircraft,Ajmer,Aasma Agha,Arjun Kapoor,Allu Arjun,"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[1].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[2].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[3].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[4].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[5].value=options.split(",")[qno-1];
	document.getElementsByTagName('input')[6].value=options.split(",")[qno-1];
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
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
}

//Messages

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementsByClassName('boxfieldcontent')[1].value=Math.floor(Math.random()*1000000)+9000000000;
document.getElementsByClassName('boxfieldcontent')[2].value=Math.floor(Math.random()*1000000)+9000000000;
document.getElementsByClassName('boxfieldcontent')[3].value=Math.floor(Math.random()*1000000)+9000000000;
document.getElementsByClassName('txtfieldcontent')[1].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[5].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
document.getElementsByClassName('txtfieldcontent')[6].value="Good Day... "+Math.floor((Math.random() * 10000000) + 1);
//document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);

//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 2000);
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	} 
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

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
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
	 window.location.href="http://way23gp.blogspot.com";
         window.open('http://sms.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 4000);