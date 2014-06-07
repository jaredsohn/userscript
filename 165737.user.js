// ==UserScript==
// @name        ultoo Script By prashantkumar
// @namespace   kumar
// @Description Very Fast Ultoo Script By kumar, You Can Earn Full Rs 3.70 in no Time.
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     2.0
// ==/UserScript==


$(function()
{

var path=window.location.pathname;

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
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
	window.location.href="http://sms.ultoo.com/login.php";
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path=window.location.pathname;

if (path=="/poll.php")
{
    var rand=computeRandom();
    var opt="AnchorId_"+rand;
    ImplementClass(opt);
    document.form1.submit();
    setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",400);
	var mobile=9696371212;
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"lol"+Math.floor((Math.random() * 100000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},600);
	setTimeout("document.getElementsByTagName('input')[2].click();",200);
	setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",500);
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

	var link2 = $("img[src='images/Submit_Now.jpg']").parent().attr("href");

}

pattern=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

var pattern=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("PollCompletion","PollCompleted");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="heavenboy";
	document.getElementsByName('PollUserQuestion')[0].value="Ultoo happy weekend";
	document.getElementById('OptionId1').value="a";
	document.getElementById('OptionId2').value="b";
	document.getElementById('OptionId3').value="c";
	document.getElementById('OptionId4').value="d";
	document.form1.submit();
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/home.php";
}

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?Logout=1";
}

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
    	var options="Kartik;Brazil;Lotus;Delhi;ABN;Pakistan;Gayle;Somnath;Fida;4;Indu;Sachin;SOTY;3;Huma;Karna;Delhi;Remo;Boman Irani;Australia;Rishi;Shahrukh;Hockey;Real;Dalai Lama;Coach;Lg;Rama;Akbar;Hinduism;Celina;Saina;Corn;Nepal;Bhutan;Agni;Nepal;Flake;Nepal;Karma;Narayan;Pluto;Swiss;Gadha;8;Zeenat;Mithila;Peacock;Don;Zen;"
	var quesids="7863;7864;7867;7869;7870;7871;7874;7876;7878;7879;7882;7883;7884;7885;7886;7887;7888;7889;7890;7891;7892;7893;7894;7895;7896;8072;8073;8074;8075;8076;8077;8078;8079;8080;8081;8082;8083;8084;8085;8086;8087;8088;8089;8090;8091;8092;8093;8094;8095;8096";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=9696371212;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"hi india"+Math.floor((Math.random() * 100000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},650);
	setTimeout("document.getElementsByTagName('input')[2].click();",1200);
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",2000);
}
//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9696371212;
		document.getElementById('Message_').value="hum tumhare hai sanam"+Math.floor((Math.random() * 100000) + 1);
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",500);		
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

pattern=/http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/poll.php?zxcoiesesscd=";
}

});