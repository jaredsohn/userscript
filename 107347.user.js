// ==UserScript==
// @name         Facebook Auto Add Friends
// @description  Facebook Auto Add Friends now with jqeury
// @namespace    Facebook
// @version      3.3
// @include      http://www.facebook.com/*
// @homepage	http://www.augustmalson.com/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function()
{
	var re = /addfriend/;
	var s = ""; // initialize the variable
	//var DEBUG = true;
	s=window.location;
	s=re.exec(s);
	if (s=="addfriend")
	{
		var amb=document.getElementById("addMsgBox");
		if (amb){
			amb.style.display="";
			var message=document.getElementById("message");
			var addbut=document.getElementById("add");
			var msg = "可以加我吗？不知为何刚才系统不让我加你，可以请你加我看看吗？也希望多推荐好友给我认识喔 ";
			message.innerHTML= msg;
				
			message.value= msg;
		}
		else
		{
			window.close();
		}
	}
	else
	{
		var lin=document.getElementById("profile_connect");
		
		if (lin){
			re = /\d{5,25}/; // 
			s=re.exec(lin);
			

			window.location="http://www.facebook.com/addfriend.php?id="+s;
		}
		else
		{
			window.close();
		}
	}
});