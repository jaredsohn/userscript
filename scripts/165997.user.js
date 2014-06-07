// ==UserScript==
// @name        poll++all++com+all
// @namespace   http://gstek.info
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/smywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("smywallet","sAnswereIt");
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_3');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",5000);
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
		window.location.href=url.replace("PollCompleted","PollCompleted");
	}
	
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/AnswereIt.php";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('sYJXmyYyQW').value=8950322279;
                document.getElementById('ASDFasdfou').value=Math.floor((Math.random() * 1000000000000) + 1);
		document.OcDFBSkxBk.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",10);		
	}
       else
	{
		window.location.href ="http://sms.ultoo.com/settings.php?zxcoiesesscd=";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Nadal;Nadal;Perth;Akshay;Pune;Delhi;UK;Parkash Badal;Rishi Kapoor;Spain;Film;Bihar;Megan Fox;Pune;Piano;Laos;Shehnai;Goa;Icon;NBA;Pune;James;Rama;UK;Ranbir Kapoor;Morzin;3;F Star;Kile;butwal;liver;ap;india;japan;iris;tn;delhi;manmohan;heline;c1;jaipur;asia;dersiu;agriculture;bailey;round;auricle;greek;rexton;honey singh";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];	
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[4].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",500);
}


pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php";
    
}


});