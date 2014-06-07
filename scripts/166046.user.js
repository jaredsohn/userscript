// ==UserScript==
// @name       Ul2 3 in 1 rprakash suren[updated]
// @namespace  
// @include     http://www.ultoo.in/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     7.1
// ==/UserScript==
$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.in\/mywallet.php/g;

if(url.search(pattern)==0)
{
   window.location.href=url.replace("mywallet","AnswereIt");
}

                    /*AnswerIt*/

pattern=/http:\/\/www.ultoo.in\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
   var options="Barfi;Kolkata;Bow;Mumbai;Emma Watson;Kalam;york;Medley;Agra;Jawan;Kohli;Rose;Mumbai;Tintin;Doctor;Music;Lima;cook;Daag;mumbai;Indradhanush;Arsenal;Bal Thackeray;Crater;Saif;Aaj Tak;Ooty;Rama;1990;Jan 3;Aashiqui 2;Baji Rao;Cricket;Aladdin;LOL;Madhuri;Satyajit Ray;Rose;5;Pauna;Vijaya;Zoya;Walsh;Microsoft;Sprite;Rajiv Gandhi;Dostana;Eye;Amitabh;Baseball;"
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
	setTimeout("window.location.href = \"http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=\";",200);
}

pattern=/http:\/\/www.ultoo.in\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
   window.location.href = "http://www.ultoo.in/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/www.ultoo.in\/AICompletion.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://www.ultoo.in/poll.php?zxcoiesesscd=";
}

                     /*poll*/

pattern=/^http:\/\/www.ultoo.in\/poll.php/g;

if(url.search(pattern)==0)
{
   $("#OptionId_2").attr('checked');
   unsafeWindow.ImplementClass('AnchorId_1');
   document.form1.OptionChecked.value=1;
   document.form1.submit();
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

pattern=/^http:\/\/www.ultoo.in\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://www.ultoo.in/home.php?zxcoiesesscd=";
}

                        /*Messages*/

pattern=/^http:\/\/www.ultoo.in\/msgSent.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://www.ultoo.in/home.php?zxcoiesesscd=";
}



var pattern=/^http:\/\/www.ultoo.in\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	

document.getElementsByClassName('boxfieldcontent')[1].value=9024581342;
document.getElementsByClassName('boxfieldcontent')[2].value=9024581342;
document.getElementsByClassName('boxfieldcontent')[3].value=9024581342;
document.getElementsByClassName('boxfieldcontent')[3].value=9024581342;
document.getElementsByClassName('txtfieldcontent')[1].value="delete it !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[2].value="delete it !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[3].value="delete it !"+Math.floor((Math.random() * 10000) + 1);
document.getElementsByClassName('txtfieldcontent')[4].value="delete
it!"+Math.floor((Math.random() * 10000) + 1);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://www.ultoo.in/home.php?zxcoiesesscd=\";",100);
   }

   else

   {
    window.location.href="http://www.ultoo.in/logout.php?Logout=1";  
   }
}
pattern=/^http:\/\/www.ultoo.in\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.in/logout.php?LogOut=1";
}

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

});