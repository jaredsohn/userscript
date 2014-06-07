// ==UserScript==
// @name           Obrona-api for Chrome
// @version	       2.1.2
// @namespace      "http://userscripts.org/users/293821"
// @description    Skrypt służący do wysyłania informacji o obronie do Systemu ogame.kopernik.idl.pl dla przeglądarki Chrome
// @include        http://*.ogame.pl/game/index.php?page=defense*
// ==/UserScript==

// Adres do API Systemu
var adres_systemu_api = "http://ogame.kopernik.idl.pl/api/";

var mywindow;
try { mywindow = unsafeWindow; }
catch (e) { mywindow = window; }

// Funkcja zwaracająca znacznik danej klasy
function getElementByClass(theClass)
	{
	var allHTMLTags=document.getElementsByTagName('*');
	for (i=0; i<allHTMLTags.length; i++)
		{
		if (allHTMLTags[i].className==theClass)
			{
			return allHTMLTags[i];
			}
		}
	return null;
	}

// Funckja zwacajaca liczy powyzej 1.000 z ciągów znaków
function duze_liczby(ciag_znakow)
	{
	var rx2 = new RegExp('([0-9]+)[\.]{1,1}([0-9]{3})');
	var rx = new RegExp('[0-9]+');
	if (rx2.test(ciag_znakow))
		{
		var wynik = rx2.exec(ciag_znakow);
 		return wynik[1]*1000 + wynik[2]*1;
 		}
	else
  		{
  		return rx.exec(ciag_znakow);
		}
	}
	
// Pobieranie nazwy, kordów i typu obiektu
var nazwa = document.getElementsByTagName("meta")[14].content;
var rx2 = new RegExp('([0-9]):([0-9]+):([0-9]+)');
var kordy = rx2.exec(document.getElementsByTagName("meta")[15].content)
var galaktyka = kordy[1];
var uklad = kordy[2];
var pozycja = kordy[3];
var typ = document.getElementsByTagName("meta")[16].content;
if(typ=='moon')
	{
	var typ = "Księżyc";
  	}
else
	{
	var typ = "Planeta";
	}

// Wrzutnia rakiet
if (mywindow.document.getElementById('details401').title != '')
	{
	var wr = duze_liczby(mywindow.document.getElementById('details401').title);
	}
else
	{
	var wr = duze_liczby(getElementByClass('defense401 tipsStandard').title);
	}


// Lekkie lasery
if (mywindow.document.getElementById('details402').title != '')
	{
	var ll = duze_liczby(mywindow.document.getElementById('details402').title);
	}
else
	{
	var ll = duze_liczby(getElementByClass('defense402 tipsStandard').title);
	}

// Ciężkie lasery
if (mywindow.document.getElementById('details403').title != '')
	{
	var cl = duze_liczby(mywindow.document.getElementById('details403').title);
	}
else
	{
	var cl = duze_liczby(getElementByClass('defense403 tipsStandard').title);
	}

// Działo Gaussa
if (mywindow.document.getElementById('details404').title != '')
	{
	var dg = duze_liczby(mywindow.document.getElementById('details404').title);
	}
else
	{
	var dg = duze_liczby(getElementByClass('defense404 tipsStandard').title);
	}

// Działo jonowe
if (mywindow.document.getElementById('details405').title != '')
	{
	var dj = duze_liczby(mywindow.document.getElementById('details405').title);
	}
else
	{
	var dj = duze_liczby(getElementByClass('defense405 tipsStandard').title);
	}

// Wyrzutnia plazmy
if (mywindow.document.getElementById('details406').title != '')
	{
	var wp = duze_liczby(mywindow.document.getElementById('details406').title);
	}
else
	{
	var wp = duze_liczby(getElementByClass('defense406 tipsStandard').title);
	}

// Mała powłoka
if (mywindow.document.getElementById('details407').title != '')
	{
	var mp = duze_liczby(mywindow.document.getElementById('details407').title);
	}
else
	{
	var mp = duze_liczby(getElementByClass('defense407 tipsStandard').title);
	}

// Duża powłoka
if (mywindow.document.getElementById('details408').title != '')
	{
	var dp = duze_liczby(mywindow.document.getElementById('details408').title);
	}
else
	{
	var dp = duze_liczby(getElementByClass('defense408 tipsStandard').title);
	}
	
// Przeciwrakiety
if (mywindow.document.getElementById('details502').title != '')
	{
	var pr = duze_liczby(mywindow.document.getElementById('details502').title);
	}
else
	{
	var pr = duze_liczby(getElementByClass('defense502 tipsStandard').title);
	}
	
// Rakiety międzyplanetarne
if (mywindow.document.getElementById('details503').title != '')
	{
	var rm = duze_liczby(mywindow.document.getElementById('details503').title);
	}
else
	{
	var rm = duze_liczby(getElementByClass('defense503 tipsStandard').title);
	}
//alert("Lista\nWR = "+wr+"\nLL = "+ll+"\nCL = "+cl+"\nDG = "+dg+"\nDJ = "+dj+"\nWP = "+wp+"\nMP = "+mp+"\nDP = "+dp+"\nPR = "+pr+"\nRM = "+rm);
	
var formularz = mywindow.document.createElement('form');
formularz.setAttribute("method", "POST");
formularz.setAttribute("accept-charset", "utf-8");
formularz.setAttribute("action", adres_systemu_api+"obrona.php");
mywindow.document.getElementById('defensebuilding').insertBefore(formularz, null);

var przycisk_wyslij = mywindow.document.createElement('input');
przycisk_wyslij.setAttribute("type", "submit");
przycisk_wyslij.setAttribute("value", "Aktualizuj swoja obrone");
formularz.appendChild(przycisk_wyslij);

function dodaj_pole(nazwa,wartosc)
	{
	var pole = mywindow.document.createElement('input');
	pole.setAttribute("type", "hidden");
	pole.setAttribute("name", nazwa);
	pole.setAttribute("value", wartosc);
	formularz.appendChild(pole);
	}

dodaj_pole("nazwa",nazwa);
dodaj_pole("galaktyka",galaktyka);
dodaj_pole("uklad",uklad);
dodaj_pole("pozycja",pozycja);
dodaj_pole("typ",typ);

dodaj_pole("wr",wr);
dodaj_pole("ll",ll);
dodaj_pole("cl",cl);
dodaj_pole("dg",dg);
dodaj_pole("dj",dj);
dodaj_pole("wp",wp);
dodaj_pole("mp",mp);
dodaj_pole("dp",dp);
dodaj_pole("pr",pr);
dodaj_pole("rm",rm);

// Automatyczna aktualizacja - nowe dla werscji 2.0
function odczytaj_ustawienia()
	{
	wlacz_auto=false;
	id_gracza=0;
	sesja_stala="Brak sesji stałej";
	if(typeof GM_getResourceURL == 'function')
		{
		wlacz_auto = GM_getValue("wlacz_auto", false);
		id_gracza = GM_getValue("id_gracza", 0);
		sesja_stala = GM_getValue("sesja_stala", "Brak sesji stałej");
		}
	else
		{
		var cookieJar = document.cookie.split( "; " );
		for(var i = 0;i < cookieJar.length;i++)
			{
			var oneCookie = cookieJar[i].split( "=" );
			if(oneCookie[0] == "wlacz_auto")
				{
				wlacz_auto = "true" == unescape( oneCookie[1] );
				}
			if(oneCookie[0] == "id_gracza")
				{
				id_gracza = unescape( oneCookie[1] );
				}
			if(oneCookie[0] == "sesja_stala")
				{
				sesja_stala = unescape( oneCookie[1] );
				}					
			}
		}
	}
		
function zapisz_ustawienia()		
	{
	alert("Zapisano ustawienia");
	wlacz_auto = formularz.elements.namedItem("wlacz_auto").checked;
	id_gracza = formularz.elements.namedItem("id_gracza").value;
	sesja_stala = formularz.elements.namedItem("sesja_stala").value;	
	if(typeof GM_getResourceURL == 'function')
		{
		GM_setValue("wlacz_auto", wlacz_auto);
		GM_setValue("id_gracza", id_gracza);
		GM_setValue("sesja_stala", sesja_stala);
		}
	else
		{
		var lifeTime = 31536000;
		document.cookie = "wlacz_auto=" + wlacz_auto + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
		
		document.cookie = "id_gracza=" + id_gracza + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
		
		document.cookie = "sesja_stala=" + sesja_stala + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
		}
	wyslij_dane();
	}

function wyslij_dane()
	{
	if(wlacz_auto)
		{
 		if(typeof GM_getResourceURL == 'function')	
			{
			GM_xmlhttpRequest(
				{
  				method: "POST",
				headers:
					{
    				"Content-Type": "application/x-www-form-urlencoded"
  					},	
		  		data: "nazwa="+nazwa+"&galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&wr="+wr+"&ll="+ll+"&cl="+cl+"&dg="+dg+"&dj="+dj+"&wp="+wp+"&mp="+mp+"&dp="+dp+"&pr="+pr+"&rm="+rm+"&id_gracza="+id_gracza+"&sesja_stala="+sesja_stala,	
	  			url: adres_systemu_api+"obrona.php",
		  		onload: function(response)
					{
					div_info.innerHTML=response.responseText;
    				//alert(response.responseText);
	  				},
				onreadystatechange: function()
					{
					div_info.innerHTML="Wysyłanie danych...";
					}
				}
			);
			}
		else
			{
			var wyslij = mywindow.document.createElement('img');
			wyslij.setAttribute("src", adres_systemu_api+"obrona.php?nazwa="+nazwa+"&galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&wr="+wr+"&ll="+ll+"&cl="+cl+"&dg="+dg+"&dj="+dj+"&wp="+wp+"&mp="+mp+"&dp="+dp+"&pr="+pr+"&rm="+rm+"&id_gracza="+id_gracza+"&sesja_stala="+sesja_stala);
			div_info.innerHTML="<font color=\"orange\">Dane wysłane. Bez dodatku Greasemonkey nie można sprawdzić statusu aktualizacji</font>";
			}
		}
	else
		{
		div_info.innerHTML="<font color=\"red\">Wyłączone automatyczne wysyłanie!</font>"
		}
	}	

var pokaz_ukryj = mywindow.document.createElement('a');
function pokaz_ukryj_f()
	{
	if(pokaz_ukryj.innerHTML=="Pokaż")
		{
		pokaz_ukryj.innerHTML="Ukryj";
		div.style.display='table';
		}
	else
		{
		pokaz_ukryj.innerHTML="Pokaż";
		div.style.display='none';
		}
	}
pokaz_ukryj.innerHTML="Pokaż";
pokaz_ukryj.href="#";
pokaz_ukryj.addEventListener("click", pokaz_ukryj_f, true);	
formularz.appendChild(pokaz_ukryj);

var div_info = mywindow.document.createElement('div');
formularz.appendChild(div_info);

var div = mywindow.document.createElement('div');
formularz.appendChild(div);
div.style.display='none';
div.style.backgroundColor="#0d1014";

odczytaj_ustawienia();

div.innerHTML+="<table><tr><td colspan=\"2\">Włącz automatyczne wysylanie <input type=\"checkbox\" name=\"wlacz_auto\"><td></tr><tr><td>ID gracza</td><td><input type=\"text\" name=\"id_gracza\" value=\""+id_gracza+"\"></td></tr><tr><td>Sesja stała</td><td><input type=\"text\" name=\"sesja_stala\" value=\""+sesja_stala+"\"></td></tr></table><input type=\"button\" name=\"zapisz_ustawienia\" value=\"Zapisz ustawienia\">";
formularz.elements.namedItem("wlacz_auto").checked=wlacz_auto;
formularz.elements.namedItem("zapisz_ustawienia").addEventListener("click", zapisz_ustawienia, true);
wyslij_dane();