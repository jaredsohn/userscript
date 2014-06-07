// ==UserScript==
// @name        Tagi BDSM Poland
// @namespace   /home/murakami/fetlife
// @include     https://fetlife.com/groups/73820
// @include	https://fetlife.com/groups/73820?page=*
// @grant       unsafeWindow
// @version     1,0
// @author      Murakami
// ==/UserScript==


var tlo_kolor = "black"; // Kolor tła dla taga.

var tab_tag = new Array()
tab_tag[0] = "inf"; // Treść taga.
tab_tag[1] = "tech";
tab_tag[2] = "off";

var tab_kol = new Array()
tab_kol[0] = "orange"; // Kolor taga.
tab_kol[1] = "green";
tab_kol[2] = "white";

// Ciasteczko
function createCookie(name,value,days) 
{
    	var date = new Date(),
        expires = "";

    	if (days) 
	{
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    	}
    	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) 
{
	var nameEQ = name + "=",
        ca = document.cookie.split(';');
    	for(var i=0;i < ca.length;i++) 
	{
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    	}
    	return null;
}

var grupowanie = readCookie('cookie_grupowanie');

//--------------

unsafeWindow.onoff = onoff; // Bez tego nie działa onclick.

function onoff() // Zapisywanie do cookie.
{

	if (grupowanie == 1)
	{
		createCookie('cookie_grupowanie','0',90);
	}

	else if (grupowanie == 0)
	{
		createCookie('cookie_grupowanie','1',90);
	}
	
	else
	{
		createCookie('cookie_grupowanie','1',90);
	}

	location.reload();

}

// Tworzy checkbox.
var forma = document.getElementsByClassName("group_personal_settings");
var przycisk_grup = document.createElement("span");
przycisk_grup.className = "quiet smaller";

if (grupowanie == 1)
{
przycisk_grup.innerHTML = "<input id=\"\" type=\"checkbox\" value=\"1\" name=\"\" checked=\"checked\" onClick=\"onoff();\"></input> grupowanie wątków";
}

else
{
przycisk_grup.innerHTML = "<input id=\"\" type=\"checkbox\" value=\"1\" name=\"\" onClick=\"onoff();\"></input> grupowanie wątków";
}

forma[0].appendChild(przycisk_grup);

//---------------------------------

var container = document.getElementsByTagName("a"); // Wszystkie linki na stronie.

var d = document.getElementById("discussions"); // Wymagane do grupowania. 

function tag (nazwa, kolor) // Podmienia tagi.
{
	var newElem = document.createElement("span");
	container[x].innerHTML = " " + container[x].innerHTML.slice(nazwa.length + 2, 250);
	container[x].parentNode.insertBefore(newElem, container[x].parentNode.firstChild);
	newElem.innerHTML = nazwa;
	newElem.style.background = tlo_kolor;
	newElem.style.padding = "4px"
	newElem.style.color = kolor;
}

function grup (nazwa, kolor) // Grupowanie.
{
	var p = document.getElementById(nazwa); 

	if (p)
	{
		p.appendChild(container[x].parentNode.parentNode.parentNode);
	}

	else
	{
		var p = document.createElement("div");
		d.insertBefore(p, d.firstChild);
		p.style.border = "thin solid " + kolor;
		p.style.margin = "4px";
		p.id = nazwa;

		p.appendChild(container[x].parentNode.parentNode.parentNode);
	}
}


// Podmiana tagów. 

for (var x=0; x<container.length; x++) 
{
	for (var y=0; y<tab_tag.length; y++)
	{
			if (container[x].innerHTML.indexOf("[" + tab_tag[y] + "]") >= 0) 
			{
					tag (tab_tag[y], tab_kol[y]); 

					if (grupowanie == 1)
					{
						grup ('id_' + tab_tag[y], tab_kol[y]); 
					}
			}
	}
}

// --------------------------------------------------------------------------------






