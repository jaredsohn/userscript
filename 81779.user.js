﻿﻿// ==UserScript==
// @name           Travian login
// @author         Koponya
// @namespace      koponya
// @description    A travianban egyszeru felhasznalovaltas.
// @include        http://*.travian.*/*
// @exclude        http://forum.travian.*/*
// @exclude        http://help.travian.*/*
// @exclude        http://ads.travian.*/*

var version = 0.1;
var menu;
var comString;
var userStop;
var Host = window.location.hostname;
//var serverLang = window.location.toString().split("/")[2].split(".")[2].trim(); 
//var serverType = window.location.toString().split("/")[2].split(".")[0].trim();
var server = Host;
if(!GM_getValue(server+"num", false))
	GM_setValue(server+"num","0");

function run()
{
	setTimeout(run,200);
	if(comString.innerHTML == "new user")
	{
		comString.innerHTML = "semmi";
		var userName = "";
		var userPass = "";
		if(userName = prompt('أدخل اسم المستخدم الخاص بك','عليك مراعات ان العضويه على نفس السيرفر'))
		{
			if( userPass = prompt('أدخل كلمة المرور',''))
			{
				GM_setValue(server+GM_getValue(server+"num")+"name",userName)
				GM_setValue(server+GM_getValue(server+"num")+"pass",userPass)
				GM_setValue(server+"num", (GM_getValue(server+"num","0")*1 + 1).toString());
				alert(userName + " تم أضافته بنجاح!");
				window.location = window.location.toString();
			}
		}
	}
	else if(comString.innerHTML == "clear user")
	{
		comString.innerHTML = "semmi";
		if(confirm("جميع العضويات التي تم اضافتها سيتم حذفها!\nأستمرار?"))
		{
			GM_setValue(server+"num","0");
			window.location = window.location.toString();
		}
	}
	else if(comString.innerHTML.substring(0,5) == "login")
	{
		var loginId = comString.innerHTML.substr(6);
		comString.innerHTML = "semmi";
		userStop.style.height = "100%";
		GM_setValue(server+"run","run "+loginId);
		window.location = "http://"+Host+"/login.php";
	}
}

function createMenu()
{
	if(!menu)
	{
		userMenu = document.createElement('p');
		document.getElementById('side_navi').appendChild(userMenu);
	}
	userMenu.innerHTML = "<hr>العضويات:<br>";
	for(var i=0; i<GM_getValue(server+"num","0"); i++)
	{
		var js = "";
		js += "var comString = document.getElementById('comString');\n";
		js += "if(comString.innerHTML == 'semmi')\n";
		js += "comString.innerHTML = 'login " + i + "';\n";
		js += "else\n";
		js += "alert('Másik folyamat zajlik');\n";
		userMenu.innerHTML += "<a href=\"javascript: void(0);\" onclick=\"" + js + "\">" + GM_getValue(server+i+"name","") + "</a>\n";
	}
	js = "";
	js += "var comString = document.getElementById('comString'); ";
	js += "if(comString.innerHTML == 'semmi') ";
	js += "comString.innerHTML = 'new user'; ";
	js += "else ";
	js += "alert('Másik folyamat zajlik');";
	userMenu.innerHTML += "<a href=\"javascript: void(0);\" onclick=\"" + js + "\">عضوية جديدة</a>\n";
	if(GM_getValue(server+"num","0") != "0")
	{
		js = "";
		js += "var comString = document.getElementById('comString'); ";
		js += "if(comString.innerHTML == 'semmi') ";
		js += "comString.innerHTML = 'clear user'; ";
		js += "else ";
		js += "alert('Másik folyamat zajlik');";
		userMenu.innerHTML += "<a href=\"javascript: void(0);\" onclick=\"" + js + "\">حذف الكل</a>\n";
	}
}

function createComString()
{
	comString = document.createElement("div");
	document.getElementsByTagName("body")[0].appendChild(comString);
	comString.setAttribute("id","comString");
	comString.style.color = "white";
	comString.innerHTML = "semmi";
}

function createUserStop()
{
	userStop = document.createElement('div');
	document.getElementsByTagName('body')[0].appendChild(userStop);
	userStop.setAttribute("id","userStop");
	userStop.style.background = "black";
	userStop.style.position = "fixed";
	userStop.style.top = "0px";
	userStop.style.left = "0px";
	userStop.style.width = "100%";
	if(GM_getValue(server+"run","semmi").split(" ")[0] == "run") userStop.style.height = "100%";
	else userStop.style.height = "0%";
	userStop.style.zIndex = "9999"
	userStop.style.opacity = "0.5";
}

function loginNow(Id)
{
	var lgform = document.getElementById("login_form");
	lgform.getElementsByTagName("input")[0].value = GM_getValue(server+Id+"name","");
	lgform.getElementsByTagName("input")[1].value = GM_getValue(server+Id+"pass","");
	GM_setValue(server+"run","semmi");
	var forms = document.getElementsByTagName("form");
	for(var i=0; i<forms.length; i++)
	{	
		if(forms[i].name == "snd")
		{
			forms[i].getElementsByTagName("input")[4].click();
		}
	}
}

function start()
{
	if(document.getElementById("login_form") && (GM_getValue(server+"run","semmi").substring(0,3) == "run"))
	{
		createUserStop();
		loginNow(GM_getValue(server+"run","semmi").substr(4));
	}
	else if(document.getElementById('side_navi'))
	{
		createMenu();
		createComString();
		createUserStop();
		run();
	}
	else
	{
		setTimeout(start,10);
	}
}
start();
// ==/UserScript==