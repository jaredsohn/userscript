// ==UserScript==
// @name        Ultoo Script by manish
// @namespace  
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.5
// ==/UserScript==
$(function(){

http://ultoo.indyarocks.com/KBCImages/1389698560_aa.jpg;Love
http://ultoo.indyarocks.com/KBCImages/1389698351_aa.jpg;Abdul Kalam
http://ultoo.indyarocks.com/KBCImages/1389699082_aa.jpg;Muralitharan
http://ultoo.indyarocks.com/KBCImages/1389698147_aa.jpg;2
http://ultoo.indyarocks.com/KBCImages/1389698958_aa.jpg;Brazil
http://ultoo.indyarocks.com/KBCImages/1389698279_aa.jpg;Sri Lanka
http://ultoo.indyarocks.com/KBCImages/1389698804_aa.jpg;H2O
http://ultoo.indyarocks.com/KBCImages/1389698687_aa.jpg;Dinosaurs
http://ultoo.indyarocks.com/KBCImages/1389698454_aa.jpg;No Ball
http://ultoo.indyarocks.com/KBCImages/1389698745_aa.jpg;London
http://ultoo.indyarocks.com/KBCImages/1389701576_aa.jpg;Haryana
http://ultoo.indyarocks.com/KBCImages/1389701786_aa.jpg;Miss World
http://ultoo.indyarocks.com/KBCImages/1389701955_aa.jpg;21 June
http://ultoo.indyarocks.com/KBCImages/1389701715_aa.jpg;Kamala Nehru
http://ultoo.indyarocks.com/KBCImages/1389701257_aa.jpg;Wallabies
http://ultoo.indyarocks.com/KBCImages/1389701183_aa.jpg;Faridabad
http://ultoo.indyarocks.com/KBCImages/1389699938_aa.jpg;Angkor Wat
http://ultoo.indyarocks.com/KBCImages/1389699829_aa.jpg;Egypt
http://ultoo.indyarocks.com/KBCImages/1389701123_aa.jpg;Bhuvneshwar Kumar
http://ultoo.indyarocks.com/KBCImages/1389700108_aa.jpg;Airbus A380
http://ultoo.indyarocks.com/KBCImages/1389700234_aa.jpg;1991
http://ultoo.indyarocks.com/KBCImages/1389701511_aa.jpg;Fatehpur Sikri
http://ultoo.indyarocks.com/KBCImages/1389700753_aa.jpg;Bhageeratha
http://ultoo.indyarocks.com/KBCImages/1389700031_aa.jpg;Dolly
http://ultoo.indyarocks.com/KBCImages/1389699616_aa.jpg;Ekta Kapoor
http://ultoo.indyarocks.com/KBCImages/1389678003_137.jpg;Lala Amarnath
http://ultoo.indyarocks.com/KBCImages/1389680469_137.jpg;Himachal Pradesh
http://ultoo.indyarocks.com/KBCImages/1389679795_ima.jpg;Devaprayag
http://ultoo.indyarocks.com/KBCImages/1389680580_137.jpg;Jharkhand
http://ultoo.indyarocks.com/KBCImages/1389678420_137.jpg;Indonesia
http://ultoo.indyarocks.com/KBCImages/1389680221_137.jpg;Habeas Corpus
http://ultoo.indyarocks.com/KBCImages/1389678565_137.jpg;Arjuna award
http://ultoo.indyarocks.com/KBCImages/1389677427_137.jpg;Italy
http://ultoo.indyarocks.com/KBCImages/1389678279_137.jpg;ACC
http://ultoo.indyarocks.com/KBCImages/1389680119_137.jpg;Amartya Sen
http://ultoo.indyarocks.com/KBCImages/1389677854_137.jpg;Nylon
http://ultoo.indyarocks.com/KBCImages/1389680009_137.jpg;Honda
http://ultoo.indyarocks.com/KBCImages/1389677329_137.jpg;NSSO
http://ultoo.indyarocks.com/KBCImages/1389678126_137.jpg;Metal Ball
http://ultoo.indyarocks.com/KBCImages/1389677652_ima.jpg;Fish production
http://ultoo.indyarocks.com/KBCImages/1389615281_137.jpg;Bobsleighing
http://ultoo.indyarocks.com/KBCImages/1389615735_137.jpg;Lincoln Memorial
http://ultoo.indyarocks.com/KBCImages/1389615369_137.jpg;11
http://ultoo.indyarocks.com/KBCImages/1389678117_137.jpg;Buonarrotti
http://ultoo.indyarocks.com/KBCImages/1389678202_137.jpg;110
http://ultoo.indyarocks.com/KBCImages/1389678057_137.jpg;1964
http://ultoo.indyarocks.com/KBCImages/1389677797_137.jpg;Yugoslavia
http://ultoo.indyarocks.com/KBCImages/1389615585_137.jpg;1953
http://ultoo.indyarocks.com/KBCImages/1389677680_137.jpg;Aldgate
http://ultoo.indyarocks.com/KBCImages/1389677937_137.jpg;Matthew
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
		window.location.href=url.replace("PollCompleted", "home");
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="Ultoo User";
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
	window.location.href="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

//Messages

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=7808386974;
                document.getElementById('Message_').value=Math.floor((Math.random() * 1000000000000) + 1);
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",500);		
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options=" teacher;Haryana;300;england;sridevi;India;India;neil patel;pakistan;UP;shivaji rao;anil kumble;nepal;dhanush;Indira setu;liverpool;javed jaffery;UNDP;Blake;SSH;China;amitabh;may 30;max muller;padma shri;florida;dassault;agra fort;ma