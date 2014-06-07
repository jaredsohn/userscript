// ==UserScript==
// @name        Puush Navigator
// @namespace   http://puu.sh/
// @description Navigation Puush
// @include 	http://puu.sh/*
// @version     2.0
// @author		Komalis
// ==/UserScript==

document.onkeydown = init;

function init(_event_)
{
	var intKeyCode = _event_.keyCode;
	switch (intKeyCode)
	{
		//Droite
		case 39:
			navigation("droite");
			break;
		//Gauche 
		case 37:
			navigation("gauche");
			break;
		case 49:
			navigation("gauche2");
			break;
		case 50:
			navigation("droite2");
			break;
	}
};

function navigation(navDir)
{
	var urlNav = window.location.href;
	if (navDir == "droite")
	{
		//http://puu.sh/***z
		if (urlNav.charCodeAt(17) == 122)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "A";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***Z
		else if (urlNav.charCodeAt(17) == 90)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "0";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***9
		else if (urlNav.charCodeAt(17) == 57)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) + 1) + "a";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/****
		else
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + String.fromCharCode(urlNav.charCodeAt(17) + 1);
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
	}
	else if (navDir == "gauche")
	{
		//http://puu.sh/***A
		if (urlNav.charCodeAt(17) == 65)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "z";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***0
		else if (urlNav.charCodeAt(17) == 48)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "Z";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***a
		else if (urlNav.charCodeAt(17) == 97)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) - 1) + "9";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/****
		else
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + String.fromCharCode(urlNav.charCodeAt(17) - 1);
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
	}
	else if (navDir == "droite2")
	{
		//http://puu.sh/***z
		if (urlNav.charCodeAt(17) == 122)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "B";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***y
		else if (urlNav.charCodeAt(17) == 121)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "A";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***Z
		else if (urlNav.charCodeAt(17) == 90)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "1";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***Y
		else if (urlNav.charCodeAt(17) == 89)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "0";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***9
		else if (urlNav.charCodeAt(17) == 57)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) + 1) + "b";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***8
		else if (urlNav.charCodeAt(17) == 56)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) + 1) + "a";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/****
		else
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + String.fromCharCode(urlNav.charCodeAt(17) + 2);
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
	}
	else if (navDir == "gauche2")
	{
		//http://puu.sh/***A
		if (urlNav.charCodeAt(17) == 65)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "y";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***B
		else if (urlNav.charCodeAt(17) == 66)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "z";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***0
		else if (urlNav.charCodeAt(17) == 48)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "Y";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***1
		else if (urlNav.charCodeAt(17) == 49)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + "Z";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***a
		else if (urlNav.charCodeAt(17) == 97)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) - 1) + "8";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/***b
		else if (urlNav.charCodeAt(17) == 98)
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + String.fromCharCode(urlNav.charCodeAt(16) - 1) + "9";
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
		//http://puu.sh/****
		else
		{
			var newUrlNav = "http://puu.sh/" + urlNav[14] + urlNav[15] + urlNav[16] + String.fromCharCode(urlNav.charCodeAt(17) - 2);
			localStorage['newUrlNav'] = newUrlNav;
			window.location = newUrlNav;
		}
	}
};