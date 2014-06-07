// ==UserScript==
// @name        Ultoo Script By Pankaj
// @namespace   Updated All in one
// @description [12 MAY 2013] This script automate the whole process of ultoo enjoy...
// @include     http://sms.ultoo.com/*
// @include     http://adf.ly/*
// @updateURL		http://userscripts.org/scripts/source/163386.meta.js
// @downloadURL		http://userscripts.org/scripts/source/163386.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     38.0.3
// ==/UserScript==





$(function(){


var path = window.location.pathname;
var url=window.location.href;

pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/Mr8bp";
	//window.location.href=url.replace("mywallet","AnswereIt");
}
var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0){

setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);}


pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;
var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
  setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",250);
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
	
		window.location.href = "http://adf.ly/MoHwx";
		//window.location.href = link;
	
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;
if(url.search(pattern)==0)
{
	
		document.getElementsByName('PollUserName')[0].value="Smarty";
		document.getElementsByName('PollUserQuestion')[0].value="What is Ultoo..........,,,, "+Math.floor((Math.random() * 100) + 1)+".";
		document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 10);
		document.getElementById('OptionId2').value=Math.floor((Math.random() * 50) + 2);
		document.getElementById('OptionId3').value=Math.floor((Math.random() * 8) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();
	
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MoIQH";
	
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{
	   if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=8528228412;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=8528228412;
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
        document.getElementById("sendNowbtnDiv").click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);		
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("msgSent","home");
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;
if(url.search(pattern)==0)
{

	var options="cp joshi;oliver reed;1996;fifi;ncp;vp singh;london;larry page;ghayal;king;philip;partner;rama;m thatcher;karan;soccer;vayu;farha;rama;crabs;ziddi;new york;nargis;8;bobby arora;cricket;naga;juhi;samata party;cuckoo;gold;gd birla;bali;salim khan;up;soup;rice;shaan;saawan;8;konkan;ganga;veer;owen;natraj;uk;guide;kalka;jeevan;vettel;";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	var ans=options.split(";")[qno-1];
	var p = document.getElementsByTagName('input');

//debugger;
    if (p[0].clientHeight == 30)
	   document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
    else if (p[1].clientHeight == 30)
	   document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
    else if (p[2].clientHeight == 30)
	   document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
    else if (p[3].clientHeight == 30)
	   document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
    else if (p[4].clientHeight == 30)
	   document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
    else if (p[5].clientHeight == 30)
	   document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
    else if (p[6].clientHeight == 30)
	   document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
    else if (p[7].clientHeight == 30)
	   document.getElementsByTagName('input')[7].value=options.split(";")[qno-1];
    else if (p[8].clientHeight == 30)
	   document.getElementsByTagName('input')[8].value=options.split(";")[qno-1];
	else
	   window.location.href=url.replace("mywallet","AnswereIt");

	var p = document.getElementsByTagName('input');

	//debugger;
	if (p[7].defaultValue == "Submit")
	   document.getElementsByTagName('input')[7].click();
	if (p[8].defaultValue == "Submit")
	   document.getElementsByTagName('input')[8].click();
	if (p[9].defaultValue == "Submit")
	   document.getElementsByTagName('input')[9].click();
	if (p[10].defaultValue == "Submit")
	   document.getElementsByTagName('input')[10].click();
	if (p[11].defaultValue == "Submit")
	   document.getElementsByTagName('input')[11].click();
	if (p[12].defaultValue == "Submit")
	   document.getElementsByTagName('input')[12].click();
	   
	   //setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",200);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;
if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

var pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;
if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/LshbD";
	//window.location.href=url.replace("AICompletion","poll");
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;
if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/login.php";
}

});

setTimeout(function(){
   window.location.reload(1);
}, 10000);


