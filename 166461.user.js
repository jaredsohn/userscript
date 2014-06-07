// ==UserScript==
// @name        Ul2 Script By Naveenyahoo
//@description works on recharge.ultoo.com with Faster & New ultoo 3in1 script methodd
// @namespace  ultoo
// @include     http://recharge.ultoo.com/home.php*
// @include     http://recharge.ultoo.com/AnswereIt.php*
// @include     http://recharge.ultoo.com/poll.php*
// @include     http://recharge.ultoo.com/mywallet.php*
// @include     http://recharge.ultoo.com/AnswereItGraph.php*
// @include     http://recharge.ultoo.com/PollCompletion.php*
// @include     http://recharge.ultoo.com/AICompletion.php*
// @include     http://recharge.ultoo.com/PollResult.php*
// @include     http://recharge.ultoo.com/middleAdPoll.php*
// @include     http://recharge.ultoo.com/PollCompleted.php*
// @include     http://recharge.ultoo.com/QuestionSaved.php*
// @include     http://recharge.ultoo.com/msgSent.php*
// @include     http://recharge.ultoo.com/middleAdSendSms.php*
// @include     http://recharge.ultoo.com/relogin.php*
// @include     http://recharge.ultoo.com/index.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     9.05.2013
// @updateURL		http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162368.user.js
// @author         
// @icon           
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/recharge.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
setInterval(function () {alert("Click on options and select---Allow Popups for recharge.ultoo.com---at Top Right corner of this page for superfast earning");}, 5000);	
        window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://recharge.ultoo.com/poll.php');
}
//POLLS
pattern=/^http:\/\/recharge.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://recharge.ultoo.com/poll.php?zxcoiesesscd=\";",150);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/recharge.ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/recharge.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/recharge.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/recharge.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
//	window.location.href="http://recharge.ultoo.com/logout.php?LogOut=1";
	window.location.href=url.replace("PollCompleted", "home");
//        window.open('http://recharge.ultoo.com/home.php');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="SURAJ";
		document.getElementsByName('PollUserQuestion')[0].value="What's the longest amount of time you've spent at a restaurant..? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
document.getElementById('OptionId1').value=Math.floor((Math.random() * 100000) + 10);
document.getElementById('OptionId2').value=Math.floor((Math.random() * 50000) + 2);
document.getElementById('OptionId3').value=Math.floor((Math.random() * 8000) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}

pattern=/^http:\/\/recharge.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://recharge.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://recharge.ultoo.com/home.php?zxcoiesesscd=";
        window.open('http://recharge.ultoo.com/home.php');
}

//AnswereIt

pattern=/^http:\/\/recharge.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="cp joshi;oliver reed;1996;fifi;ncp;vp singh;london;larry page;ghayal;king;philip;partner;rama;m thatcher;karan;soccer;vayu;farha;rama;crabs;ziddi;new york;nargis;8;bobby arora;cricket;naga;juhi;samata party;cuckoo;gold;gd birla;bali;salim khan;up;soup;rice;shaan;saawan;8;konkan;ganga;veer;owen;natraj;uk;guide;kalka;jeevan;vettel;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));

var ele = document.getElementsByClassName('inputtxt'); 

for (var i = 0; i < ele.length; i++) 
{
if (ele[i].style.height === '')
{
ele[i].value=options.split(";")[qno-1];
for (var i = ele.length; i < ele.length+4; i++)
{
document.getElementsByTagName('input')[i].click();
}
}
}
setTimeout("window.location.href = \"http://recharge.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",260);
}

//Messages

var pattern=/^http:\/\/recharge.ultoo.com\/home.php/g;

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
document.getElementsByTagName('textarea')[0].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="Good morning.2 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Good afternoon. 3,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Good night.4 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Good holiday. 5,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://recharge.ultoo.com/home.php?zxcoiesesscd=\";",360);
	}
	else
	{
		window.location.href ="http://recharge.ultoo.com/logout.php?Logout=1";
	} 
}

pattern=/http:\/\/recharge.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://recharge.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/recharge.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://recharge.ultoo.com/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/recharge.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://recharge.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/recharge.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://recharge.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/recharge.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://recharge.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/recharge.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://recharge.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/recharge.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://way23gp.blogspot.com";
         window.open('http://recharge.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 7000);