// ==UserScript==
// @name        Ultoo 3in1 superfast script by new member rinkesh khandela
//@description this script will be do your work very fastly in less time period
//@warning     dont share it any where other wise we cant updatw it again 
// @namespace   
// @include     http://ultoo.com/*
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.5
// ==/UserScript==


$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

pattern=/^http:\/\/ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.com/login.php";
}

pattern=/^http:\/\/sms.ultoo.com\/login.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://ultoo.com/login.php";
}

pattern=/^http:\/\/ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	var qno=parseInt(document.getElementsByTagName('h1')[1].innerHTML.substr(15));
	var options="Sri Lanka;Rahim;Amitabh;Cricket;Sipra;Sood;U Thant;Sri Lanka;Ajay Singh;China;Roshan Seth;Iceland;Haiti;Beer;Vivek Oberoi;Shaw;India;1949;Raina;1st;Jazzy B;Nauru;Saptam;Flintoff;Perk;Anjali Bansal;Excise Duty;Agni;Garba Gujarat;TVS;Yama;Films;All;Internal marketing;Onam;Pushan;Odissi;Pagoda mela;Rig Veda;Rig Veda;Daniel Vettori;10;England;Camel;Colombo;Jatayu;Indra;Kapil Dev;Kurma;Bail";
	var quesids="10041;10042;10043;10044;10045;10047;10048;10052;10054;10056;10057;10058;10059;10060;10061;10075;10076;10077;10078;10079;10080;10081;10082;10083;10084;10085;10086;10087;10088;10089;10090;10091;10092;10093;10094;10095;10096;10097;10098;10099;10100;10101;10102;10103;10104;10105;10106;10107;10108;10109";
	var quesid=quesids.split(";")[qno-1];
	var qxval=document.getElementsByTagName('input')[0].value;
	var ans=options.split(";")[qno-1];
                $.post("AnswereIt.php",{gbjuymhb:ans,zxcoiesesscd:"",qxci:qxval,QuestionId:quesid},function(){});
	var message=(Math.floor(Math.random()*1000000000000));
	var qid=document.getElementsByTagName('input')[1].value;
                var content=document.getElementsByTagName('h1')[1].innerHTML;
                if(content=="Question no: - 1")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 2")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 3")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 4")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 5")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 6")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 7")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 8")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 9")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 10")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 11")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 12")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 13")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 14")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 15")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 16")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 17")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 18")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 19")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 20")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 21")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 22")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 23")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 24")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 25")
	{ 
                               var oid=(parseInt(qid)*4)-35; 
                }
                if(content=="Question no: - 26")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 27")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 28")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 29")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 30")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 31")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 32")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 33")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 34")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 35")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 36")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 37")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 38")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 39")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 40")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 41")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 42")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 43")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 44")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 45")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 46")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 47")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 48")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 49")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }
                if(content=="Question no: - 50")
	{ 
                               var oid=(parseInt(qid)*4)-38; 
                }

                setTimeout(function(){
	$.post("poll.php",{qxci:qxval , QuestionId:qid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid}, 

function(){});
	},1000);
	setTimeout(function(){
	$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:"8528228412" , 

Message_:message , SendNow_:"Send Now"}, function(){});
	},2500);
	setTimeout("window.location.href=\"http://ultoo.com/poll.php?zxcoiesesscd=\";",3500);
}

pattern=/^http:\/\/ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="vishal";
	document.getElementsByName('PollUserQuestion')[0].value="Question'"+Math.floor((Math.random() * 100000000) + 1)+"'";
	document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.form1.submit();
}



});