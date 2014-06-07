// ==UserScript==
// @name        Ultoo 3 in 1 by trickerchamp2
// @namespace  
// @include     http://www.ultoo.in/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==

//FULL 3.70 RS
$(function()
{

var url=window.location.href;
//first go to answer it
var pattern=/^http:\/\/www.ultoo.in\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","AnswereIt");
}

pattern=/^http:\/\/www.ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?LogOut=1";
}
//No use of it though useful when session expires
pattern=/^http:\/\/www.ultoo.in\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.in\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/login.php";
}
//Poll + SMS
pattern=/^http:\/\/www.ultoo.in\/poll.php/g;

if(url.search(pattern)==0)
{
	$("#OptionId_2").attr('checked');
	unsafeWindow.ImplementClass('AnchorId_1');
	document.form1.OptionChecked.value=1;
	document.form1.submit();
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Register your mobile no here:http://www.ultoo.in/login.php?refererCode=3166837E&flag=hide" , SendNow_:"Send Now"}, function(){});
		setTimeout("window.location.href = \"http://www.ultoo.in/poll.php?zxcoiesesscd=\";",500);
}

pattern=/^http:\/\/www.ultoo.in\/PollResult.php/g;

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

pattern=/^http:\/\/www.ultoo.in\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/www.ultoo.in\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/www.ultoo.in\/PollCompleted.php/g;

if(url.search(pattern)==0)
{

	document.getElementsByName('PollUserName')[0].value="Ultoo User";
	document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
	document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.form1.submit();
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Register your mobile no here:http://www.ultoo.in/login.php?refererCode=3166837E&flag=hide" , SendNow_:"Send Now"}, function(){});
	setTimeout("document.form1.submit();",750);
	
}

pattern=/^http:\/\/www.ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?Logout=1";
}

pattern=/^http:\/\/www.ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?Logout=1";
}
//Answer it + SMS
pattern=/^http:\/\/www.ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Sikhs;First;Ravi;Seva;Bhavai;Sikh;Salman;Rome;Chennai;Accra;Aladdin;Sana;Tihar;Hexagon;Devdas;Dinar;Pune;Manchester;Nepal;Priya;Azharuddin;Akbar Khan;UK;Moose;Asamanjan;Tahaan;Hockey;Brizza;Pepsi;Lagaan;Benaam;Tasmania;New Delhi;Dil Se;UP;Eng-Aus;Naved;Tennis;Yahudi;Yahoo;Pukar;Vienna;Cricket;1951;Kerala;Europe;Brass;Ramanuja;Melbourne;Titanium;";
	var quesids="7863;7864;7867;7869;7870;7871;7874;7876;7878;7879;7882;7883;7884;7885;7886;7887;7888;7889;7890;7891;7892;7893;7894;7895;7896;8072;8073;8074;8075;8076;8077;8078;8079;8080;8081;8082;8083;8084;8085;8086;8087;8088;8089;8090;8091;8092;8093;8094;8095;8096";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=Math.floor(Math.random()*1000000)+9840000000;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"HOME BASED JOBS FOR COLLEGE STUDENTS: Income-7000. Qualification:12th & Above. Computer Knowledge must. If intrsted, contact 8220021819." , SendNow_:"Send Now"}, function(){});},750);
	setTimeout("document.getElementsByTagName('input')[2].click();",2000);
	setTimeout("window.location.href = \"http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=\";",2500);
}

pattern=/http:\/\/www.ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/www.ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://www.ultoo.in/poll.php?zxcoiesesscd=";
}

});
