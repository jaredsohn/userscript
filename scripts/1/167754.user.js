// ==UserScript==
// @name       Ul2 3 in 1 
// @namespace  
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/home.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     7.1.0
// ==/UserScript==
$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
   window.location.href=url.replace("mywallet","AnswereIt");
   window.open('http://sms.ultoo.com/poll.php');
}

                    /*AnswerIt*/

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="lampard;anushka;goalkeeper;housefull;melanie;edward david;prashant;1977;golf;dubai;man city;roberto ayala;serbia;aladin;russia;bobby;commonwealth;9;angelina jolie;17;sonia gandhi;geeta;myosia;burnley;phantom;denmark;apr 18;madhuri;kolkata;scorpion;shashi kapoor;katrina;jatayu;mannat;ishan;congress;melbourne;pooja bhatt;west indies;merana;jrd tata;gaja gamini;uk;manmohan;monthly;usa;15 hours;sams;kerala;die hard 2;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17)); 
   if(document.getElementsByClassName('inputtxt')[0].style.height=='')
{
document.getElementsByClassName('inputtxt')[0].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[1].style.height=='')
{
document.getElementsByClassName('inputtxt')[1].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[2].style.height=='')
{
document.getElementsByClassName('inputtxt')[2].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[3].style.height=='')
{
document.getElementsByClassName('inputtxt')[3].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[4].style.height=='')
{
document.getElementsByClassName('inputtxt')[4].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[5].style.height=='')
{
document.getElementsByClassName('inputtxt')[5].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[6].style.height=='')
{
document.getElementsByClassName('inputtxt')[6].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[7].style.height=='')
{
document.getElementsByClassName('inputtxt')[7].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[8].style.height=='')
{
document.getElementsByClassName('inputtxt')[8].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[9].style.height=='')
{
document.getElementsByClassName('inputtxt')[9].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[10].style.height=='')
{
document.getElementsByClassName('inputtxt')[10].value=options.split(";")[qno-1];
}
//var mobile=9016403905;
document.getElementsByTagName('input')[5].click();document.getElementsByTagName('input')[6].click();document.getElementsByTagName('input')[7].click();document.getElementsByTagName('input')[8].click();
document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();document.getElementsByTagName('input')[11].click();document.getElementsByTagName('input')[12].click();
//setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"hi have a nice day"+Math.floor((Math.random() * 10000) + 1)+"'", SendNow_:"Send Now"}, function(){});},250);
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",100);
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
   var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
   setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",100);
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
      document.getElementsByName('PollUserName')[0].value="user";
      document.getElementsByName('PollUserQuestion')[0].value="Find out primary number'"+Math.floor((Math.random() * 100000000) + 1)+"'";
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
	if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=9445601875;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=9360299840;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=9445601875;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value= 9360299840;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=9445601875;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=9360299840;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=9016403905;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=9445601875;
}

if(document.getElementsByClassName('txtfieldcontent')[0].style.display=='')
{
document.getElementsByTagName('textarea')[0].value="Delete ..It !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="Delete 0It !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="Delete ITT !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Delete It.. !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Delete It! !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Delete It... !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Delete It!! !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Delete It!!! !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="Delete It.... !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Delete It!!!!! !"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Delete IT !"+Math.floor((Math.random() * 10000000) + 1);
}
if(document.getElementById("sendNowbtnDiv").click());
{
setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
}
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",150);
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