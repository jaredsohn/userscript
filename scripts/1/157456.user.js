// ==UserScript==
// @name        Easy FetLife 
// @grant          GM_getValue
// @grant          GM_setValue
// @namespace   http://userscripts.org/scripts/show/157456
// @description Skrypt dodaje przycisk szybkiego cytowania.
// @include     https://fetlife.com/groups/*
// @include	https://fetlife.com/conversations/*
// @exclude	https://fetlife.com/conversations/all
// @exclude	https://fetlife.com/conversations/with*
// @exclude	https://fetlife.com/conversations/
// @exclude 	https://fetlife.com/home/v4*
// @exclude 	https://fetlife.com/explore/*
// @exclude 	https://fetlife.com/places*
// @exclude	https://fetlife.com/users/*
// @exclude	https://fetlife.com/events/*
// @exclude	https://fetlife.com/requests*
// @exclude	https://fetlife.com/ats*
// @updateURL      https://userscripts.org/scripts/source/157456.meta.js
// @downloadURL    https://userscripts.org/scripts/source/157456.user.js
// @grant       unsafeWindow
// @version     1,4
// @author      Murakami
// ==/UserScript==

// Bałagan w kodzie wynikł z problemów z GM_getValue.
// Może w przyszłości gdy znajdę czas, to trochę tutaj posprzątam :)
// Ważne, że skrypt działa dobrze.


var dopisywanie1 = GM_getValue('names1', '');
var dopisywanie2 = GM_getValue('names2', '');
var dopisywanie3 = GM_getValue('names3', '');

// Na potrzeby prywatnych wiadomości.
function prywnick()
{

	var container = document.getElementsByTagName("a");
	
	for (var x=0; x<container.length; x++) 
	{

		if (window.location.href.indexOf("fetlife.com/conversations") > 0)
		{
	
	        	if (container[x].href.indexOf("users") >= 0)
	        	{
				if (container[x].parentNode.className.indexOf("span-2") >= 0)
				{
	        			var newElem = document.createElement("span");
	        			newElem.innerHTML = "<button onClick=\"copy(\'"+container[x].childNodes[0].alt+"\');\">@</button> <button onClick=\"copy2(\'"+container[x].childNodes[0].alt+"\');\">s</button>"; // Lepsze sposoby nie działały.
	        			container[x].parentNode.insertBefore(newElem, container[x].parentNode.childNodes[0]); 
				}
	        	}
		}
	}
}

if (dopisywanie1 != "") // Potrzebne do sprawdzania czy schowek jest pełny.
{
	var del1 = 1;
}
else
{
	var del1 = 0;
}

if (dopisywanie2 != "") 
{
	var del2 = 1;
}
else
{
	var del2 = 0;
}

if (dopisywanie3 != "") 
{
	var del3 = 1;
}
else
{
	var del3 = 0;
}

//--------------------------------------

function wklej(f) // Wkleja zawartosc schowka do textarea.
{

	var fff2 = window.document.getElementsByName("body");
	var u = "";

	if (f == 1)
	{
		fff2[0].value += dopisywanie1;
		fff2[0].style.height = (fff2[0].scrollHeight +15) + "px"; // Rozszerza textarea w dół.
		setTimeout(function() { GM_setValue("names1", u); }, 0); 
		del1 = 0;
		var el = document.getElementById('1');
		el.parentNode.removeChild(el);
	}

	else if (f == 2)
	{
		fff2[0].value += dopisywanie2;
		fff2[0].style.height = (fff2[0].scrollHeight +15) + "px"; // Rozszerza textarea w dół.
		setTimeout(function() { GM_setValue("names2", u); }, 0);
		del2 = 0;
		var el = document.getElementById('2');
		el.parentNode.removeChild(el);
	}

	else if (f == 3)
	{
		fff2[0].value += dopisywanie3;
		fff2[0].style.height = (fff2[0].scrollHeight +15) + "px"; // Rozszerza textarea w dół.
		setTimeout(function() { GM_setValue("names3", u); }, 0);
		del3 = 0;
		var el = document.getElementById('3');
		el.parentNode.removeChild(el);
	}
}

//--------------------------------------

function usun(d) // usuwa ze schowka.
{

	var u = "";

	if (d == 1)
	{
		setTimeout(function() { GM_setValue("names1", u); }, 0);
		del1 = 0;
		var el = document.getElementById('1');
		el.parentNode.removeChild(el);
	}

	if (d == 2)
	{
		setTimeout(function() { GM_setValue("names2", u); }, 0);
		del2 = 0;
		var el = document.getElementById('2');
		el.parentNode.removeChild(el);
	}

	if (d == 3)
	{
		setTimeout(function() { GM_setValue("names3", u); }, 0);
		del3 = 0;
		var el = document.getElementById('3');
		el.parentNode.removeChild(el);
	}

}

//--------------------------------------


function getSelectedText() // Pobiera zaznaczony tekst.
{
var txt = null;

	if (window.getSelection)
	{
		var txt = window.getSelection();
	} 
	else if (document.getSelection) 
	{
		var txt = document.getSelection();
	} 

	else if (document.selection)
	{
		var txt = document.selection.createRange().text;
	} 

	else return;
	return txt.toString();

}

//--------------------------------------

function copy(z) // Wkleja Zaznaczony tekst do formularza.
{
	var fff = window.document.getElementsByName("body");


	fff[0].value += "\n"+"@"+z+"\n"

	var tablica = getSelectedText().split("\n");

	for(i = 0; i < tablica.length; i++)
	{
		if (tablica[i].length === 0 || (tablica[i].length === 1 && tablica[i].charAt(0) == '\r'))
		{
			fff[0].value += "\n";
		}

		else
		{
			fff[0].value += "> " + tablica[i] + "\n";
		}

	}

	fff[0].style.height = (fff[0].scrollHeight +15) + "px"; // Rozszerza textarea w dół.
}



function copy2(z) // Wkleja zaznaczony tekst do schowka.
{

		var fff= "\n"+"@"+z+"\n"

		var tablica = getSelectedText().split("\n");

		for(i = 0; i < tablica.length; i++)
		{
			if (tablica[i].length === 0 || (tablica[i].length === 1 && tablica[i].charAt(0) == '\r'))
			{
				fff += "\n";
			}

			else
			{
				fff += "> " + tablica[i] + "\n";
			}
		}

		// Dodawanie cytatów do zmiennych GM.
		var doschowka = window.document.getElementById("schowek");
		var forma = window.document.getElementById("new_group_post_comment_message");
		var forma2 = window.document.getElementById("new_group_post_comment_container");
		var forma3 = window.document.getElementById("new_message_message");
		
		if (del1 == 0) // Dodaje do pierwszej zmiennej.
		{

			setTimeout(function() { GM_setValue("names1", fff); }, 0);
       	 		var newElem = document.createElement("div");
			newElem.innerHTML = "<button onClick=\"usun(\'1\');\">delete</button> " + fff.substr(0,60) + "...";
			newElem.setAttribute('id', "1");
			doschowka.appendChild(newElem);	
			newElem.style.border = "solid black";
			newElem.style.margin = "5px";
			newElem.style.padding = "3px";
			del1 = 1;
		}

		else
		{
			if (del2 == 0) // Dodaje do drugiej zmiennej.
			{

				setTimeout(function() { GM_setValue("names2", fff); }, 0);
       	 			var newElem = document.createElement("div");
				newElem.innerHTML = "<button onClick=\"usun(\'2\');\">delete</button> " + fff.substr(0,60) + "...";
				newElem.setAttribute('id', "2");
				doschowka.appendChild(newElem);	
				newElem.style.border = "solid black";
				newElem.style.margin = "5px";
				newElem.style.padding = "3px";
				del2 = 1;

			}

			else
			{
				if (del3 == 0) // Dodaje do trzeciej zmiennej.
				{

					setTimeout(function() { GM_setValue("names3", fff); }, 0);
       	 				var newElem = document.createElement("div");
					newElem.innerHTML = "<button onClick=\"usun(\'3\');\">delete</button> " + fff.substr(0,60) + "...";
					newElem.setAttribute('id', "3");
					doschowka.appendChild(newElem);	
					newElem.style.border = "solid black";
					newElem.style.margin = "5px";
					newElem.style.padding = "3px";
					del3 = 1;
				}

				else
				{
					alert("You have 3 items. Empty your clipboard.");
				}
			}
		}

}

//--------------------------------------

unsafeWindow.copy2 = copy2; // Bez tego nie działa onClick.

unsafeWindow.copy = copy; // Bez tego nie działa onClick.
unsafeWindow.usun = usun; // Bez tego nie działa onClick.
unsafeWindow.wklej = wklej; // Bez tego nie działa onClick.

//--------------------------------------

function getAllParaElems() // Dodaje przyciski obok nick'ów.
{

	// Potrzebne do tworzenia schowka. 
	var forma = window.document.getElementById("new_group_post_comment_message");
	var forma2 = window.document.getElementById("new_group_post_comment_container");
	var forma3 = window.document.getElementById("new_message_message");
	//var forma4 = window.document.getElementsByName("body");

	// Dodawanie przycisków we wszystkich postach poza nr 1.
	var container = document.getElementsByClassName('nickname'); 
	for (var x=0; x<container.length; x++) 
	{
		if (container[x].getAttribute('href'))
		{
                	var newElem = document.createElement("span");

			if (forma)
			{
				newElem.innerHTML = "<button onClick=\"copy(\'"+container[x].innerHTML+"\');\">@</button> <button onClick=\"copy2(\'"+container[x].innerHTML+"\');\">s</button> "; // Lepsze sposoby nie działały.
				container[x].parentNode.insertBefore(newElem, container[x].parentNode.childNodes[0]);
			}
			
			else 
			{
				newElem.innerHTML = "<button onClick=\"copy2(\'"+container[x].innerHTML+"\');\">s</button> "; // Lepsze sposoby nie działały.
				container[x].parentNode.insertBefore(newElem, container[x].parentNode.childNodes[0]);
			}
		}
	}
	

	// Dodawanie przycisku tylko w poście nr 1.
	var container2 = document.getElementsByClassName('quiet');
	for (var x=0; x<container2.length; x++) 
	{
		if (container2[x].getAttribute('href'))
		{
                	var newElem = document.createElement("span");

			if (forma)
			{
				newElem.innerHTML = "<button onClick=\"copy(\'"+container2[x].innerHTML+"\');\">@</button> <button onClick=\"copy2(\'"+container2[x].innerHTML+"\');\">s</button> "; // Lepsze sposoby nie działały.
				container2[x].parentNode.insertBefore(newElem, container2[x].parentNode.childNodes[0]);
			}
			
			else 
			{
				newElem.innerHTML = "<button onClick=\"copy2(\'"+container2[x].innerHTML+"\');\">s</button> "; // Lepsze sposoby nie działały.
				container2[x].parentNode.insertBefore(newElem, container2[x].parentNode.childNodes[0]);
			}
		}
	}


	// Tworzy div przechowujący cytaty w schowku.
        var newElem = document.createElement("div");
	newElem.innerHTML = "";

	if (forma)
	{
		forma.appendChild(newElem);
	}

	else if (forma2)
	{
		forma2.appendChild(newElem);
	}

	else if (forma3)
	{
		forma3.appendChild(newElem);
	}

	newElem.setAttribute('id', "schowek");
	newElem.style.padding = "8px";
	newElem.style.margin = "0px";
	newElem.style.background = "#111111";



// Wyświetla zawartość schowka po załadowaniu strony.
var doschowka = window.document.getElementById("schowek");


	if (del1 == 1) // Zmienna 1.
	{	
       	 	var newElem = document.createElement("div");

		if (forma2) // Jakakolwiek strona prócz ostatniej. 
		{
			newElem.innerHTML = "<button onClick=\"usun(\'1\');\">delete</button> " + dopisywanie1.substr(0,60) + "...";
		}

		if (forma || forma3) // Tylko ostatnia strona.
		{
			newElem.innerHTML = "<button onClick=\"usun(\'1\');\">delete</button> <button onClick=\"wklej(\'1\');\">paste</button> " + dopisywanie1.substr(0,60) + "...";
		}

		newElem.setAttribute('id', "1");
		doschowka.appendChild(newElem);	
		newElem.style.border = "solid black";
		newElem.style.margin = "5px";
		newElem.style.padding = "3px";
	}

	if (del2 == 1) // Zmienna 2.
	{	
       	 	var newElem = document.createElement("div");

		if (forma2) // Jakakolwiek strona prócz ostatniej. 
		{
			newElem.innerHTML = "<button onClick=\"usun(\'2\');\">delete</button> " + dopisywanie2.substr(0,60) + "...";
		}

		if (forma || forma3) // Tylko ostatnia strona.
		{
			newElem.innerHTML = "<button onClick=\"usun(\'2\');\">delete</button> <button onClick=\"wklej(\'2\');\">paste</button> " + dopisywanie2.substr(0,60) + "...";
		}

		newElem.setAttribute('id', "2");
		doschowka.appendChild(newElem);	
		newElem.style.border = "solid black";
		newElem.style.margin = "5px";
		newElem.style.padding = "3px";
	}

	if (del3 == 1) // Zmienna 3.
	{	
       	 	var newElem = document.createElement("div");

		if (forma2) // Jakakolwiek strona prócz ostatniej. 
		{
			newElem.innerHTML = "<button onClick=\"usun(\'3\');\">delete</button> " + dopisywanie3.substr(0,60) + "...";
		}

		if (forma || forma3) // Tylko ostatnia strona.
		{
			newElem.innerHTML = "<button onClick=\"usun(\'3\');\">delete</button> <button onClick=\"wklej(\'3\');\">paste</button> " + dopisywanie3.substr(0,60) + "...";
		}

		newElem.setAttribute('id', "3");
		doschowka.appendChild(newElem);	
		newElem.style.border = "solid black";
		newElem.style.margin = "5px";
		newElem.style.padding = "3px";
	}	
}

prywnick();

getAllParaElems(); // No to zaczynamy :)




