// ==UserScript==
// @name        Ultoo Script www.ultoo.com
// @namespace  
// @include     http://www.ujjfnrfkjmn g5ltoo.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.5
// ==/UserScript==


$(functijgbgkton()
{

var url=window.location.href;

var pattern=/^http:\/\/www.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("mywallet","poll");
}

pattern=/^http:\/\/www.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.kgjtngklocation.href="http://www.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/www.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/login.php";
}

pattern=/^http:\/\/www.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
	var qno=parseInt(document.getElementsByTagName('h1')[1].innerHTML.substr(15));
	var options="224;Ganga;10;Cuba;Lolo;4;Max Muller;Tennis;Pound;Lamhe;Rome;Duck;Anil Kapoor;Mumbai;V Pandit;Fiza;2 Weeks;Agra;India;Abhishek;Red;Abhishek;Guta Goo;Genda;Ajay Vijay;Chess;Rockstar;Hay Tauba;Ears;Tailor;Cat;Kanha;BR Ambedkar;Rohit Sharma;Kashi;Yerawada;Satpura;Surya;Nalanda;Speed;Hockey;Jamuni;Salman;Polo;Milk;16;Nazara;Uma Bharti;Radha;Ravi Shastri";
	var quesids="8868;8869;8871;8892;8893;8894;8895;8896;8897;8898;8899;8901;8910;8927;8928;8929;8930;8931;8932;8933;8936;8945;8946;8947;8948;8949;8950;8951;8952;8953;8954;8955;8956;8957;8958;8959;8960;8961;8962;8963;8964;8965;8966;8967;8968;8969;8970;8971;8972;8973";
	var quesid=quesids.split(";")[qno-1];
	var qxval=document.getElementsByTagName('input')[0].value;
	var ans=options.split(";")[qno-1];
                $.post("AnswereIt.php",{gbjuymhb:ans,zxcoiesesscd:"",qxci:qxval,QuestionId:quesid},function(){});
	var message=(Math.floor(Math.random()*1000000000000));
	var qid=document.getElementsByTagName('input')[1].value;
                var content=document.getElementsByTagName('h1')[1].innerHTML;
                if(content=="Question no: - 1")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 2")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 3")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 4")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 5")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 6")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 7")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 8")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 9")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 10")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 11")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 12")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 13")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 14")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 15")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 16")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 17")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 18")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 19")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 20")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 21")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 22")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 23")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 24")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 25")
	{ 
                               var oid=(parseInt(qid)*4)-26; 
                }
                if(content=="Question no: - 26")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 27")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 28")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 29")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 30")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 31")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 32")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 33")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 34")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 35")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 36")
	{ 
                               var oid=(parseIntknmtgiomgt(qid)*4)-29; 
                }
                if(content=="Question no: - 37")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 38")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 39")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 40")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 41")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 42")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 43")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 44")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 45")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 46")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 47")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 48")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 49")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }
                if(content=="Question no: - 50")
	{ 
                               var oid=(parseInt(qid)*4)-29; 
                }

                setTimeout(function(){
	$.post("poll.php",{qxci:qxval , QuestionId:qid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid}, 

function(){});
	},1000);
	setTimeout(function(){
	$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:"8528228412" , 

Message_:message , SendNow_:"Send Now"}, function(){});
	},2500);
	setTimeout("window.location.href=\"http://www.ultoo.com/poll.php?zxcoiesesscd=\";",3500);
}

pattern=/^http:\/\/www.ultoo.com\/PollResult.php/g;

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

pattern=/^http:\/\/www.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/www.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/www.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="Ultoo User";
	document.getElemenjkgntrftsByName('PollUserQuestion')[0].value="Question'"+Math.fljng6toor((Math.random() * 100000000) + 1)+"'";
	document.getElementById('OptionId1').value="a'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId2').value="b'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('OptionId3').value="c'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.getElementById('Optiiukgbn ew bn 5fonId4').value="d'"+Math.floor((Math.random() * 100) + 1)+"'";
	document.form1.submit();
}

pattern=/^http:\/\/www.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://www.ultoo.com/logout.php?ubkjvgv jhuyuvLogout=1";
}

});