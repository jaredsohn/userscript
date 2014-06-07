// ==UserScript==
// @name        Ban a penis avatars.
// @description Ban a penis avatars.
// @namespace   /home/murakami/fetlife/
// @include     https://fetlife.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @version     1
// @author      Murakami
// ==/UserScript==

var nick = GM_getValue('zbanowane', '');

var tablica = nick.split(" ");

function avkill() // Podmienia avatary.
{ 
	var avatary = document.getElementsByClassName("profile_avatar");

	for (var x=0; x<avatary.length; x++) 
	{
		for (var y=0; y<tablica.length; y++) 
		{
			if (avatary[x].getAttribute("alt") == tablica[y])
			{
				avatary[x].setAttribute("src", "http://i1.wp.com/doctorcatmd.com/wp-content/themes/comicpress-greymatter/images/avatars/dc/avatar2.jpg");
			}
		}
	}

	if (window.location.href.indexOf("fetlife.com/home/v4") > 0)
	{
		setTimeout(function(){avkill()}, 1 * 1000);
	}
}

//////////////////////////////////////////////////////////////////////////////////
// Tworzy formularz do dodawania nowych nicków.

if (window.location.href.indexOf("fetlife.com/settings/privacy") > 0)
{
	var container = document.getElementsByTagName("fieldset");
	var newElem = document.createElement("div");
	newElem.id = "banlist";
	newElem.style.background = "#111111";
	newElem.style.padding = "10px";
	container[0].parentNode.parentNode.appendChild(newElem);

	var spaner = document.createElement("div");
	spaner.innerHTML = "Replace avatars:";
	spaner.style.marginBottom = "10px";
	document.getElementById("banlist").appendChild(spaner);
	
	var pole = document.createElement("input");
	pole.setAttribute("value", nick);
	pole.setAttribute("name", "pole");
	pole.id = "pole";
	document.getElementById("banlist").appendChild(pole);
	
	var przycisk = document.createElement("button");
	przycisk.value = "Save";
	przycisk.innerHTML = "Save";
	przycisk.onclick = save;
	document.getElementById("banlist").appendChild(przycisk);
}

/////////////////////////////////////////////////////////////////////////////////////
// Zapisywanie.

function save()
{
	//var container2 = document.getElementsByTagName("fieldset");
	var newElem2 = document.createElement("div");
	newElem2.className = "notice";
	newElem2.style.marginTop = "10px";
	newElem2.innerHTML = "Avatar settings have been up-day-ted.";
	document.getElementById("banlist").appendChild(newElem2);

	var u = document.getElementById("pole");
	setTimeout(function() { GM_setValue("zbanowane", u.value); }, 0); 
	//alert("Avatar settings have been up-day-ted.");
}

avkill(); // Uruchamia skrypt.

