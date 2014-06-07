// ==UserScript==
// @name       Ul2 3 in 1 [updated]
// @namespace  
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/home.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     7.1
// ==/UserScript==
$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
   window.location.href=url.replace("mywallet","AnswereIt");
}

                    /*AnswerIt*/

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
   var options="4;Mumbai;Golden Globe;Dara Singh;Khalnayak;Roll;Punjab;Blake;HP;Akshay;Shivaji Rao;Spanish;4;Suzanne;Rabindra Setu;Drupada;Narayana Murthy;PA;Gaborone;Govinda;Punjab;Priyanka;Gridiron;187;Saif;Uganda;Circle;Crime;Canada;Orange;Pele;Fox;Manchester;Aurangzeb;Fundamental Right;Guitar;Tamannah;Sri Lanka;Parsees;Vatican City;Texaco;Mein Kampf;Malaya;Prachi Desai;Brother;Aircraft;Ajmer;Aasma Agha;Arjun Kapoor;Allu Arjun;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[0].click();
	document.getElementsByTagName('input')[1].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[6].click();document.getElementsByTagName('input')[7].click();document.getElementsByTagName('input')[8].click();document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",200);
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

                     /*poll*/

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
   $("#OptionId_2").attr('checked');
   unsafeWindow.ImplementClass('AnchorId_1');
   document.form1.OptionChecked.value=1;
   document.form1.submit();
   setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",500);
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
      document.getElementsByName('PollUserName')[0].value="Ultoo User";
      document.getElementsByName('PollUserQuestion')[0].value="Find any primary number'"+Math.floor((Math.random() * 100000000) + 1)+"'";
      document.getElementById('OptionId1').value=Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId2').value=Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId3').value=Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId4').value="None of the above'";
      document.form1.submit();

   }
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

                        /*Messages*/

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}



var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{
	document.getElementById('sYJXmyYyQW').value=9016403905;
	document.getElementById('ASDFasdfou').value="Delete It ,"+Math.floor((Math.random() * 10000) + 1);
	document.OcDFBSkxBk.submit();
	setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",200);	
document.getElementsByClassName('boxfieldcontent')[1].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[2].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[3].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[3].value=9016403905;
document.getElementsByClassName('boxfieldcontent')[4].value=9016403905
document.getElementsByClassName('txtfieldcontent')[1].value="Delete It !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="Delete It !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="Delete It !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="Delete It !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[5].value="Delete It !"+Math.floor((Math.random() * 10000) + 1);
document.getElementById("sendNowbtnDiv").click();

   }

   else

   {
    window.location.href="http://sms.ultoo.com/logout.php?Logout=1";  
   }
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

});


          