// ==UserScript==
// @name        script by yogesh
// @namespace   http://ultootscript.blogspot.com
// @include     http://sms.ultoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==
$(function(){

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	//$("#OptionId_2").attr('checked');
	//unsafeWindow.ImplementClass('AnchorId_3');
	//document.form1.OptionChecked.value=1;
	//document.form1.submit();
	//setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",500);

	var qid=document.getElementsByTagName('input')[1].value;
	var oid=((qid*4)-9);
	$.post("poll.php",{QuestionId:qid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid}, function(){});
	setTimeout("window.location.href=\"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",100);
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
	var val=0;
	while(val<51)
	{
		var message=Math.floor((Math.random() * 1000000000000) + 1);
		$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:"9031090310" , Message_:message , SendNow_:"Send Now"}, function(){});
		val=val+1;
	}
	setTimeout("window.location.href=\"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",40000);
}

//AnswerIt 

pattern=/http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="salman;villiers;bjp;pune;mp;imtiaz ali;botham;sivaji;shivraj singh;v kurien;uganda;sholay;italy;london;4;tax;joy;dmk;bangladesh;ek do teen;malviya;ht;dev anand;patna;bradman;arshad;badauni;berg;bengal;rani;jinnah;apiculture;march;kandla;20000;lasagne;2007;4;crop;rbc;tansen;acidic;toes;hole;subsonic;zero;jodhpur;oxidation;frog;25";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	var ans=options.split(";")[qno-1];
	var qxc="MQ==;Mg==;Mw==;NA==;NQ==;Ng==;Nw==;OA==;OQ==;MTA=;MTE=;MTI=;MTM=;MTQ=;MTU=;MTY=;MTc=;MTg=;MTk=;MjA=;MjE=;MjI=;MjM=;MjQ=;MjU=;MjY=;Mjc=;Mjg=;Mjk=;MzA=;MzE=;MzI=;MzM=;MzQ=;MzU=;MzY=;Mzc=;Mzg=;Mzk=;NDA=;NDE=;NDI=;NDM=;NDQ=;NDU=;NDY=;NDc=;NDg=;NDk=;NTA=";
	var qxval=qxc.split(";")[qno-1];
	var quesid=document.getElementsByTagName('input')[4].value;
	var i=0;
	$.post("AnswereIt.php",{gbjuymhb:ans,zxcoiesesscd:"",qxci:qxval,QuestionId:quesid},function(){});
	setTimeout("window.location.href=\"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",10);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?Logout=1";
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