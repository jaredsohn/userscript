// ==UserScript==
// @name        Ultoo Script By sam4u
// @namespace   Updated All in one
// @description [30 April 2013] This script completes all process fastly...
// @include     http://sms.ultoo.com/*
// @updateURL		http://userscripts.org/scripts/source/164946.meta.js
// @downloadURL		http://userscripts.org/scripts/source/164946.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     16.0.4
// ==/UserScript==

$(function()
{

var path=window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)


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
    var mobile=9360299840;
    setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Its 17th April..."+Math.floor((Math.random() * 10000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},550);
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

	//window.location.href=url.replace("PollCompletion","home");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="Smarty";
	document.getElementsByName('PollUserQuestion')[0].value="Its 30th April.??";
	document.getElementById('OptionId1').value="a";
	document.getElementById('OptionId2').value="b";
	document.getElementById('OptionId3').value="c";
	document.getElementById('OptionId4').value="d";
	var mobile=9360299840;
	$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Hello Babe......" , SendNow_:"Send Now"}, function(){});
	document.form1.submit();

}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{

	
}

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementsByClassName('boxfieldcontent')[0].value=9800000000;
		document.getElementsByClassName('boxfieldcontent')[1].value=9800000000;
		document.getElementsByClassName('boxfieldcontent')[2].value=9800000000;
		document.getElementsByClassName('boxfieldcontent')[3].value=9800000000;
		document.getElementsByClassName('txtfieldcontent')[0].value="have a nice day"+Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[1].value="have a nice day"+Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[2].value="have a nice day"+Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsByClassName('txtfieldcontent')[3].value="have a nice day"+Math.floor((Math.random() * 1000000000000) + 1);
		document.getElementsById('sendNowbtnDiv')[0].click();
		document.getElementsByid('sendNowbtnDiv')[1].click();
		document.getElementsByid('sendNowbtnDiv')[2].click();
		document.getElementsByid('sendNowbtnDiv')[3].click();

	
                 setTimeout("window.location.href = \"http://sms.ultoo.com/home.php\";",700);	
	}
	else
	{
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("msgSent","home");
}

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="Pakistan;UK;Pune;KFC;Babos;Space;Circular;Jennifer Lopez;Shahrukh;1996;France;Tennis;Neha;Mumbai;Jaya;Euro;Feroz Khan;Pune;2;New York;Pooja;8;Russia;Aamir;Jk;IPL;366;Mumbai;Pappu;Bunty;Panda;Omnivore;Flies;Berlin;Batman;Calvin;360;Jade Black;Kurma;Nepal;3;India;Ravi;Lepper;Love;6;Noni Stark;Cooper;Bendarain;Pluto;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
//	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[1].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[2].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[3].value=options.split(";")[qno-1];
//	document.getElementsByTagName('input')[4].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[5].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[6].value=options.split(";")[qno-1];
	document.getElementsByTagName('input')[7].value=options.split(";")[qno-1];
/*
	document.getElementsByTagName('input')[2].click();
	document.getElementsByTagName('input')[0].click();
	document.getElementsByTagName('input')[1].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
	document.getElementsByTagName('input')[3].click();
	document.getElementsByTagName('input')[4].click();
*/
	document.getElementsByTagName('input')[5].click();
	document.getElementsByTagName('input')[6].click();
	document.getElementsByTagName('input')[7].click();
document.getElementsByTagName('input')[8].click();document.getElementsByTagName('input')[9].click();document.getElementsByTagName('input')[10].click();
document.getElementsByTagName('input')[11].click();
document.getElementsByTagName('input')[12].click();
/*
document.getElementsByTagName('input')[13].click();document.getElementsByTagName('input')[14].click();document.getElementsByTagName('input')[15].click();
document.getElementsByTagName('input')[16].click();document.getElementsByTagName('input')[17].click();document.getElementsByTagName('input')[18].click();document.getElementsByTagName('input')[19].click();document.getElementsByTagName('input')[20].click();
*/
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
//setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
//setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
//setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",400);
}


pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	//window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
         window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{

}




});