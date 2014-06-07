// ==UserScript==
// @name        Ultoo  3in1 Script By trickerchamp
//@description works on ultoo.in with Faster preferred for slow nte users
// @namespace  ultoo
// @include     http://ultoo.in/home.php*
// @include     http://ultoo.in/AnswereIt.php*
// @include     http://ultoo.in/poll.php*
// @include     http://ultoo.in/mywallet.php*
// @include     http://ultoo.in/AnswereItGraph.php*
// @include     http://ultoo.in/PollCompletion.php*
// @include     http://ultoo.in/AICompletion.php*
// @include     http://ultoo.in/PollResult.php*
// @include     http://ultoo.in/middleAdPoll.php*
// @include     http://ultoo.in/PollCompleted.php*
// @include     http://ultoo.in/QuestionSaved.php*
// @include     http://ultoo.in/msgSent.php*
// @include     http://ultoo.in/middleAdSendSms.php*
// @include     http://ultoo.in/relogin.php*
// @include     http://ultoo.in/index.php*
// @include     http://ultoo.in/SessExpire.php*
// @include     *adf.ly*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     20.05.2013
// @updateURL		http://userscripts.org/scripts/source/163194.meta.js
// @downloadURL		http://userscripts.org/scripts/source/163194.user.js
// @author         Harsha
// @icon           http://t2.gstatic.com/images?q=tbn:ANd9GcQ2BYrq5RRPcbW_X2jC4PVwNHFoYT64C0o6XjaBn7um9wPZLgljow
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/ultoo.in\/mywallet.php/g;
if(url.search(pattern)==0)
{
setInterval(function () {alert("Click on options and select---Allow Popups for ultoo.in---at Top Right corner of this page for superfast earning");}, 5000);
	window.location.href=url.replace("mywallet","AnswereIt");
//        window.open('http://ultoo.in/poll.php');
}

//POLLS
pattern=/^http:\/\/ultoo.in\/poll.php/g;
var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://ultoo.in/poll.php?zxcoiesesscd=\";",310);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
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
//	window.location.href="http://ultoo.in/logout.php?LogOut=1";
	window.location.href ="http://ultoo.in/home.php";
        window.open('http://ultoo.in/home.php');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="ravi";
		document.getElementsByName('PollUserQuestion')[0].value="2+32= ? "+Math.floor((Math.random() * 100000) + 1)+"c";
document.getElementById('OptionId1').value=Math.floor((Math.random() * 100000) + 10);
document.getElementById('OptionId2').value=Math.floor((Math.random() * 50000) + 2);
document.getElementById('OptionId3').value=Math.floor((Math.random() * 8000) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}
pattern=/^http:\/\/ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://ultoo.in/logout.php?LogOut=1";
	window.location.href ="http://ultoo.in/home.php";
        window.open('http://ultoo.in/home.php');
}

//AnswereIt

pattern=/^http:\/\/ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="ferrer;murray;sharapova;vinci;13;orange;riya;sheffield;tamannaah;kush;salman;shell;usa;woh lamhe;assange;rekha;vijay;malaysia;peanuts;deepu;chennai;nargis dutt;sunny deol;andy bichel;pooh;olympics;bhuvan;gambhir;popeye;hitch;french;dabangg;goofy;bhuvan;usa;megan;ivanovic;new zealand;ms word;katrina;7;mumbai;chacha chaudhry;dhaka;china;gibraltar;europe;hockey;paper;karishma;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));

var ele = document.getElementsByClassName('inputtxt'); 

for (var i = 0; i < ele.length; i++) 
{
if (ele[i].style.height == '')
{
ele[i].value=options.split(";")[qno-1];
for (var i = ele.length+1; i < ele.length+2; i++)
{
document.getElementsByTagName('input')[i].click();
}
}
}
setTimeout("window.location.href = \"http://ultoo.in/AnswereIt.php?zxcoiesesscd=\";",310);
}

//Messages

var pattern=/^http:\/\/ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=9024581342;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=9024581342;
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
document.getElementsByTagName('textarea')[3].value="Hi..., Have gnt a nice day...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Happy Birth Day...dude...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Good holiday. sad one 5,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Hello...dude...All the waste dude... ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Hi...dude.., Best half Luck..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="All the very Best dear...! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Hi.., nice Good Day..! ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Good mrng dear rkow .! ,"+Math.floor((Math.random() * 10000000) + 1);
}
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://ultoo.in/home.php?zxcoiesesscd=\";",360);
	}
	else
	{
		window.location.href ="http://ultoo.in/logout.php?Logout=1";
	} 
}
pattern=/http:\/\/ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.in/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://ultoo.in/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/ultoo.in\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://ultoo.in/home.php?zxcoiesesscd=";
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
	 window.location.href="http://ultoo.in/login.php";

}
});

setTimeout(function(){
   window.location.reload(1);
}, 12000);