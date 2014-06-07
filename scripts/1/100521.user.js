// ==UserScript==
// @name		Metal Saga - New Frontier
// @namespace		fenghou
// @description		Open this game in a clean page
// @include		http*://www.mogupai.com/home
// ==/UserScript==

Main();


function Main()
	{
	var PlayButton = document.createElement('input');
	PlayButton.setAttribute('class', 'button');
	PlayButton.setAttribute('type', 'button');
	PlayButton.setAttribute('value', '开始游戏');
	PlayButton.setAttribute('style', 'font-weight: bold; font-size:120%;');
	PlayButton.addEventListener('click', GetPage, false);

	document.getElementById('my_defaultapp').appendChild(PlayButton);
	}


function GetPage()
	{
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
		{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
				{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				OnGetPage(Page);
				}
			}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
		};

	var URL = "http://www.mogupai.com/games/metal";

	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
	}


function OnGetPage(Document)
	{
	var Divs = Document.getElementsByTagName("div");
	for (var i = 0; i < Divs.length; ++i)
		{
		if (Divs[i].className == "game_box")
			{
			document.body.innerHTML = Divs[i].innerHTML;
			GM_addStyle("body {background-color: #000;} iframe {display: block; margin: auto;}");
			return;
			}
		}
	}
