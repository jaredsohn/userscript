// ==UserScript==
// @name           Flota-api
// @version        2.1.2
// @namespace      "http://userscripts.org/users/293821"
// @description    Skrypt służący do wysyłania informacji o flocie do Systemu ogame.kopernik.idl.pl
// @include        http://*.ogame.pl/game/index.php?page=fleet1*
// ==/UserScript==

// Adres do API Systemu
var adres_systemu_api = "http://ogame.kopernik.idl.pl/api/";

var mywindow;
try { mywindow = unsafeWindow; }
catch (e) { mywindow = window; }
/*
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
*/
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
var nazwa = document.getElementsByTagName("meta").namedItem('ogame-planet-name').content;
var rx2 = new RegExp('([0-9]):([0-9]+):([0-9]+)');
var kordy = rx2.exec(document.getElementsByTagName("meta").namedItem('ogame-planet-coordinates').content)
var galaktyka = kordy[1];
var uklad = kordy[2];
var pozycja = kordy[3];
var typ = document.getElementsByTagName("meta").namedItem('ogame-planet-type').content;
if(typ=='moon')
	{
	var typ = "Księżyc";
  	}
else
	{
	var typ = "Planeta";
	}

// Formularz danych floty na planecie
var formularz = mywindow.document.createElement('form');
formularz.setAttribute("method", "POST");
formularz.setAttribute("action", adres_systemu_api+"flota.php");

// Przycisk wysyłający formularz
var przycisk_wyslij = mywindow.document.createElement('input');
przycisk_wyslij.setAttribute("type", "submit");
formularz.setAttribute("accept-charset", "iso-8859-2");
przycisk_wyslij.setAttribute("value", "Aktualizuj swoja flote");
formularz.appendChild(przycisk_wyslij);

// Funkcja dodawająca do formularza dodatkowe pole
function dodaj_pole(nazwa,wartosc)
	{
	var pole = mywindow.document.createElement('input');
	pole.setAttribute("type", "hidden");
	pole.setAttribute("name", nazwa);
	pole.setAttribute("value", wartosc);
	formularz.appendChild(pole);
	}

// Jeżeli istnieje element który świadczy że jest jakaś flota to
if (mywindow.document.getElementById('buttonz') != null)
	{
	// Ustaw formularz w podpowiednim miejscu
	mywindow.document.getElementById('buttonz').style.textAlign="center";
	mywindow.document.getElementById('buttonz').insertBefore(formularz, mywindow.document.getElementById('allornone'));
	
	// Lekki myśliwiec
	var lm = duze_liczby(mywindow.document.getElementById('button204').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Ciężki myśliwiec
	var cm = duze_liczby(mywindow.document.getElementById('button205').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Krążownik
	var k = duze_liczby(mywindow.document.getElementById('button206').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Okręt Wojenny
	var ow = duze_liczby(mywindow.document.getElementById('button207').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Pancernik
	var pan = duze_liczby(mywindow.document.getElementById('button215').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Bombowiec
	var bom = duze_liczby(mywindow.document.getElementById('button211').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Niszczyciel
	var nisz = duze_liczby(mywindow.document.getElementById('button213').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Gwiazda Śmierci
	var gs = duze_liczby(mywindow.document.getElementById('button214').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Mały transporter
	var mt = duze_liczby(mywindow.document.getElementById('button202').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Duży transporter
	var dt = duze_liczby(mywindow.document.getElementById('button203').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	
	// Recykler
	var rec = duze_liczby(mywindow.document.getElementById('button209').getElementsByTagName('div')[0].getElementsByTagName('a')[0].title);
	}
else
	{
	// Ustaw wyśrodkowanie dla pewnego elementu 
	mywindow.document.getElementById('warning').style.textAlign="center";
	
	// Ustaw formularz w podpowiednim miejscu
	mywindow.document.getElementById('warning').insertBefore(formularz, null);
	
	// Wyzeruj całą flotę
	var lm = 0;
	var cm = 0;
	var k = 0;
	var ow = 0;
	var pan = 0;
	var bom = 0;
	var nisz = 0;
	var gs = 0;
	var mt = 0;
	var dt = 0;
	var rec = 0;
	}
//alert("Lista\nLM = "+lm+"\nCM = "+cm+"\nK = "+k+"\nOW = "+ow+"\nPAN = "+pan+"\nBOM = "+bom+"\nNISZ = "+nisz+"\nGŚ = "+gs+"\nMT = "+mt+"\nDT = "+dt+"\nREC = "+rec);

dodaj_pole("nazwa",nazwa);
dodaj_pole("galaktyka",galaktyka);
dodaj_pole("uklad",uklad);
dodaj_pole("pozycja",pozycja);
dodaj_pole("typ",typ);

dodaj_pole("lm",lm);
dodaj_pole("cm",cm);
dodaj_pole("k",k);
dodaj_pole("ow",ow);
dodaj_pole("pan",pan);
dodaj_pole("bom",bom);
dodaj_pole("nisz",nisz);
dodaj_pole("gs",gs);
dodaj_pole("mt",mt);
dodaj_pole("dt",dt);
dodaj_pole("rec",rec);

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
		  		data: "nazwa="+nazwa+"&galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&lm="+lm+"&cm="+cm+"&k="+k+"&ow="+ow+"&pan="+pan+"&bom="+bom+"&nisz="+nisz+"&gs="+gs+"&mt="+mt+"&dt="+dt+"&rec="+rec+"&id_gracza="+id_gracza+"&sesja_stala="+sesja_stala,	
	  			url: adres_systemu_api+"flota.php",
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
			wyslij.setAttribute("src", adres_systemu_api+"flota.php?nazwa="+nazwa+"&galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&lm="+lm+"&cm="+cm+"&k="+k+"&ow="+ow+"&pan="+pan+"&bom="+bom+"&nisz="+nisz+"&gs="+gs+"&mt="+mt+"&dt="+dt+"&rec="+rec+"&id_gracza="+id_gracza+"&sesja_stala="+sesja_stala);
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
		div.style.display='block';
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
div.style.textAlign="center";

odczytaj_ustawienia();
div.innerHTML+="<table style=\"margin-left: auto; margin-right: auto;\"><tr><td colspan=\"2\">Włącz automatyczne wysylanie <input type=\"checkbox\" name=\"wlacz_auto\"><td></tr><tr><td>ID gracza</td><td><input type=\"text\" name=\"id_gracza\" value=\""+id_gracza+"\"></td></tr><tr><td>Sesja stała</td><td><input type=\"text\" name=\"sesja_stala\" value=\""+sesja_stala+"\"></td></tr></table><input type=\"button\" name=\"zapisz_ustawienia\" value=\"Zapisz ustawienia\">";
formularz.elements.namedItem("wlacz_auto").checked=wlacz_auto;
formularz.elements.namedItem("zapisz_ustawienia").addEventListener("click", zapisz_ustawienia, true);
wyslij_dane();