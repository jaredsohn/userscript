// ==UserScript==
// @name           Andre Facebook App Bar
// @namespace      Andre-Zutto
// @include        http://*.facebook.com/*
// @version        0.0.1

// ==/UserScript==

// COOKIE FUNCTIONS from http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	//if (days) {
		var date = new Date();
		days = (days)? days : 365;
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	//}
	//else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/; domain=facebook.com;";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function $(id)
{ return document.getElementById(id); }


function Populate_BM() {
	BM = readCookie("PF_BM");
	IsMatch = -1;
	
	if (BM)
		{
		BM = BM.split("!!");
		var str = "";
		for (var i=0, BM_element; i<BM.length; i++)
			{
			BM_element = BM[i].split("||");
			str += "<li><a href=\"" + BM_element[0] + "\" title=\"" + BM_element[1] +"\">"+
				"<img src=\"" + BM_element[2] + "\" /></a></li>";
			if (BM_element[0] == window.location)
				IsMatch = i;
			}
		$("BM_AREA").innerHTML = str;
		}
	else
		BM = new Array();
	

	if (IsMatch!=-1)
		{
		$("PF_MENU_BM_DEL").style.display = "inline-block";
		$("PF_MENU_BM_ADD").style.display = "none";
		

			
		}
	else
		{
		$("PF_MENU_BM_DEL").style.display = "none";
		$("PF_MENU_BM_ADD").style.display = "inline-block";


		}
}

var BM, Icon="", IsMatch;

function main()
{
	var newElement=document.createElement('style'); 
	newElement.setAttribute('type','text/css');
	
	var str = "#PF_MENU {padding:0; left:310px; list-style:none outside none; margin:0; position:absolute; top:0px;}";
	str += "\n#PF_MENU li{float:left;}";
	str += "\n#PF_MENU a{display:inline-block; color:#FFFFFF; font-weight:bold; height:22px; padding:8px 10px 0; text-decoration:none;}";
	str += "\n#PF_MENU a:hover,#PF_MENU a:focus,#PF_MENU a:active{background-color:#6D86B7; outline:medium none;}";
	var TextNode = document.createTextNode(str);
	
	newElement.appendChild(TextNode);
	document.getElementsByTagName("head")[0].appendChild(newElement);
	
	
	LinkElements = document.getElementsByTagName("link");
	for (var i=0; i<LinkElements.length; i++)
		if (LinkElements[i].getAttribute("rel")=="shortcut icon")
			{
			Icon = LinkElements[i].getAttribute("href");
			break;
			}

	var newElement=document.createElement('ul'); 
	newElement.id = "PF_MENU";
	

	newElement.innerHTML = "<span id=BM_AREA></span>";
	newElement.innerHTML += "<li><a href=javascript:; title='Bookmark' id=PF_MENU_BM_ADD style=display:none;>BM</a></li>";
	newElement.innerHTML += "<li><a href=javascript:; title='Delete' id=PF_MENU_BM_DEL style=display:none;color:orange>DEL</a></li>";
	
	$("headNavIn").insertBefore(newElement, $("auxNav"));
	$("PF_MENU_BM_DEL").addEventListener("click", function () {
			BM.splice(IsMatch, 1);
			createCookie("PF_BM", BM.join("!!"));
			Populate_BM(true);
			$("PF_MENU_BM_DEL").style.display = "none";
			$("PF_MENU_BM_ADD").style.display = "inline-block";
		}, false);
			
	$("PF_MENU_BM_ADD").addEventListener("click", function () {
			BM.push(window.location+"||"+document.title+"||"+Icon);
			createCookie("PF_BM", BM.join("!!"));
			Populate_BM(true);
		}, false);
			
	Populate_BM();
	
	
}

if ($("headNavIn"))
	main();