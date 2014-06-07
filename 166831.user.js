// ==UserScript==
// @name        Ultoo Script By tc
//@description works on http://sms.ultoo.com with Faster & New random poll submition method added
// @namespace  ultoo
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==
$(function(){
//debugger;
//document.getElementsByTagName('img')[0].visible = false;
//document.getElementsByName('logo_inner')[0].hide;

var path = window.location.pathname;
var url=window.location.href;

pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

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
		document.getElementsByName('PollUserName')[0].value="Sandeep";
		document.getElementsByName('PollUserQuestion')[0].value="How many chocolates do you eat in a month..? & Me only "+Math.floor((Math.random() * 100) + 1)+".";
		document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 10);
		document.getElementById('OptionId2').value=Math.floor((Math.random() * 50) + 2);
		document.getElementById('OptionId3').value=Math.floor((Math.random() * 8) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();
	}
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{
	   var p = document.getElementsByTagName('input');
	   if (p.length > 0)
            document.getElementsByTagName('input')[1].value=8528228412;
       // if (p.length > 1)
            document.getElementsByTagName('input')[2].value=9016403905;
        //if (p.length > 2)
            document.getElementsByTagName('input')[3].value=9360299840;
        //if (p.length > 3)
            document.getElementsByTagName('input')[4].value=9360299840;
        //if (p.length > 4)
            document.getElementsByTagName('input')[5].value=9360299840;
        //if (p.length > 5)
            document.getElementsByTagName('textarea')[6].value=9360299840;
        document.getElementsByClassName('boxfieldcontent')[7].value=9360299840;
        document.getElementsByClassName('boxfieldcontent')[8].value=9360299840;
        var p = document.getElementsByTagName('textarea');
        if (p.length > 0)
            document.getElementsByTagName('textarea')[1].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
       // if (p.length > 1)
            document.getElementsByTagName('textarea')[2].value="Good Day... !"+Math.floor((Math.random() * 10000000) + 1);
       // if (p.length > 2)
            document.getElementsByTagName('textarea')[3].value="Good Day... !"+Math.floor((Math.random() * 20000000) + 1);
        //if (p.length > 3)
            document.getElementsByTagName('textarea')[4].value="Good Day... !"+Math.floor((Math.random() * 30000000) + 1);
        //if (p.length > 4)
            document.getElementsByClassName('txtfieldcontent')[5].value="Good Day... !"+Math.floor((Math.random() * 40000000) + 1);
        //if (p.length > 5)
            document.getElementsByClassName('txtfieldcontent')[6].value="Good Day... !"+Math.floor((Math.random() * 50000000) + 1);
        
        document.getElementById("sendNowbtnDiv").click();
		//setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",400);		
	}
	else
	{
		//window.location.href ="http://sms.ultoo.com/home.php??zxcoiesesscd=";
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

	var options="Gooch;Mumbai;Prasad;Salman Khan;Thumper;Vettel;Delhi;Neha;Rundu;Salman Khan;22;Laila;Ohio;Gautama;Taal;Easter;Amitabh;Delhi;Juhi;Nagpur;Bam Bam;Kenya;Indu;Helen Hunt;Pepsi;Blue Ocean;Vilon;Sahara;Steel;RD Burman;Badal;Core;Mess Dona;Jim;Lava;Neck;Pune;Japan;Ooty;Fish;Geologist;Japan;Waterfall;Germany;Rowing;K2;Agra;Green;Clean Layer;Punjabi;";
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
	window.location.href=url.replace("AICompletion","poll");
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