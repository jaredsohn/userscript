// ==UserScript==
// @name           System Kopernik
// @version        0.3.0.3
// @downloadURL    http://userscripts.org/users/293821
// @updateURL      http://userscripts.org/users/293821
// @icon           http://cdn.alternativeto.net/i/8ec6ae02-e88b-e211-ab3b-0025902c7e73_28404.png
// @namespace      http://wiedzmin.vot.pl
// @description    Skrypt służący do wysyłania i odbierania danych z Systemu Kopernik
// @include        http://uni*.ogame.pl/game/*
// @require        http://wiedzmin.vot.pl/md5.js
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_listValues 
// @grant          GM_addStyle 
// @grant          GM_xmlhttpRequest
// ==/UserScript==
//GM_deleteValue( 'tablica_zmiennych' );
// Zmienne globalne 
var wersja = "0.3.0.3";
//"http://wiedzmin.vot.pl";
var adres_systemu = "http://wiedzmin.vot.pl/api_dev_2";
var uniwersum = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-universe").content;
var uniwersum_nazwa = unsafeWindow.document.title;	
var login = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-player-name").content;

var id_w_ogame = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-player-id").content;

var jezyk;
var odswiez_shoutbox=null;
var semafor_shoutbox=1;//1-otwarty 0-zamkniety

// Tłumaczenia język polski
var obslugiwane_jezyki = Array("pl","ang");

var tlumaczenie = new Object();
    tlumaczenie["pl"] = new Object();
	 tlumaczenie["pl"]["jezyk"] = "Polski";
    tlumaczenie["pl"]["a1"] = "Jest dostępna nowa wersja $1 skryptu.\nUaktualnij skrypt! Link do skryptu znajdziesz w ustawieniach Systemu Kopernik lub w dodatku Greasemonkey kliknij 'Zarzadzaj skryptami...' a następnie kliknij w skrypt System Kopernik, kliknij prawym klawiszem myszki i wybierz 'Znajdź aktualizacje'.";
    tlumaczenie["pl"]["a2"] = "Wystąpił błąd który już został zgłoszony!\nAdministracja pracuje nad rozwiązaniem tego błędu.";
	 
	 tlumaczenie["pl"]["b1"] = "(przeciągnij okno gdzie chcesz)";
	 tlumaczenie["pl"]["b2"] = "Ustawienia skryptu";
	 tlumaczenie["pl"]["b3"] = "Język";
	 tlumaczenie["pl"]["b4"] = "Autologowanie";
	 tlumaczenie["pl"]["b5"] = "Wiąż się z kontem Ogame";
	 tlumaczenie["pl"]["b6"] = "Automatyczna synchronizacja listy obiektów";
         tlumaczenie["pl"]["b7"] = "Automatyczna aktualizacja badań";
         tlumaczenie["pl"]["b8"] = "Automatyczna aktualizacja obrony";
         tlumaczenie["pl"]["b9"] = "Automatyczna aktualizacja floty";
         tlumaczenie["pl"]["b10"] = "Strona skryptu";
         
	 tlumaczenie["pl"]["c1"] = "Logowanie"; 
	 tlumaczenie["pl"]["c2"] = "Nowa społeczność"; 
	 tlumaczenie["pl"]["c3"] = "Nowe uniwersum";
	 tlumaczenie["pl"]["c4"] = "Twórz konto";
	 tlumaczenie["pl"]["c5"] = "Zalogowany";
	 
	 tlumaczenie["pl"]["c6"] = "Społeczność";
	 tlumaczenie["pl"]["c7"] = "Wybierz";
	 tlumaczenie["pl"]["c8"] = "Zgłoś nową społeczność";
	 tlumaczenie["pl"]["c9"] = "Uniwersum";
	 tlumaczenie["pl"]["c10"] = "-";
	 tlumaczenie["pl"]["c11"] = "Brak uniwersów dla danej społeczności";
	 tlumaczenie["pl"]["c12"] = "Zgłoś nowe Uniwersum";
	 tlumaczenie["pl"]["c13"] = "Login";
	 tlumaczenie["pl"]["c14"] = "Utwórz konto";
	 tlumaczenie["pl"]["c15"] = "Hasło";
	 tlumaczenie["pl"]["c16"] = "Zaloguj";
	 
	 tlumaczenie["pl"]["c17"] = "Wpisz adres nowej społeczności:";
	 tlumaczenie["pl"]["c18"] = "Zgloś społeczność";
	 tlumaczenie["pl"]["c19"] = "Wróć";
	 tlumaczenie["pl"]["c20"] = "Wysłano zgłoszenie o nowej społeczności do Administracji Systemu"; 
	 tlumaczenie["pl"]["c21"] = "Zgłoszenie o nowej społeczności nie zostało przyjęte!";
	 tlumaczenie["pl"]["c22"] = "Społeczność:";
	 tlumaczenie["pl"]["c23"] = "Nazwa nowego Uniwerum";
	 tlumaczenie["pl"]["c24"] = "Adres uniwersum";
	 tlumaczenie["pl"]["c25"] = "Zgłoś uniwersum";
	 tlumaczenie["pl"]["c26"] = "Wysłano zgłoszenie o nowe uniwersum do  Administracji Systemu";
	 tlumaczenie["pl"]["c27"] = "Zgłoszenie o nowe uniwersum nie zostało przyjęte!"; 
	 
	 tlumaczenie["pl"]["c28"] = tlumaczenie["pl"]["c6"];
	 tlumaczenie["pl"]["c29"] = tlumaczenie["pl"]["c8"]
	 tlumaczenie["pl"]["c30"] = tlumaczenie["pl"]["c9"];
	 tlumaczenie["pl"]["c31"] = tlumaczenie["pl"]["c10"];
	 tlumaczenie["pl"]["c32"] = tlumaczenie["pl"]["c12"];
	 tlumaczenie["pl"]["c33"] = tlumaczenie["pl"]["c13"];
	 tlumaczenie["pl"]["c34"] = tlumaczenie["pl"]["c15"];
	 
	 tlumaczenie["pl"]["c35"] = "Różne od Ogame i od loginu";
	 tlumaczenie["pl"]["c36"] = "Powtórz hasło";
	 tlumaczenie["pl"]["c37"] = "Email";
	 tlumaczenie["pl"]["c38"] = "Adres email będzie weryfikowany";
	 tlumaczenie["pl"]["c39"] = "Powtórz email";
	 tlumaczenie["pl"]["c40"] = "ID gracza w Ogame";
	 tlumaczenie["pl"]["c41"] = "Akceptuje $1regulamin$2 systemu";
	 tlumaczenie["pl"]["c42"] = "Utwórz konto";
	 tlumaczenie["pl"]["c43"] = "Puste pole login";
	 tlumaczenie["pl"]["c44"] = "Puste pole hasło lub identyczne z loginem";
	 tlumaczenie["pl"]["c45"] = "Powtórzone hasło nie jest identyczne z właściwym hasłem";
	 tlumaczenie["pl"]["c46"] = "Puste pole email";
	 tlumaczenie["pl"]["c47"] = "Adres email nie jest prawidłowy";
	 tlumaczenie["pl"]["c48"] = "Powtórzone email nie jest identyczne z właściwym emailem";
	 tlumaczenie["pl"]["c49"] = "Nie zaakceptowałeś regulaminu!";
	 tlumaczenie["pl"]["c50"] = "Konto zostało założone! Konto wymaga jeszcze aktywacji adresu email. Proszę wejdż na pocztę i kliknij w link aktywujący adres email.";
	 tlumaczenie["pl"]["c51"] = "Brak wymaganych danych!";
	 tlumaczenie["pl"]["c52"] = "Wybrana społeczność nie istnieje!";
	 tlumaczenie["pl"]["c53"] = "Wybrane uniwersum nie istnieje!";
	 tlumaczenie["pl"]["c54"] = "Wybrany login już został zarejestrowany na danym uniwersie! Informacja o konflikcie została już wysłana do Twórcy Systemu do rozpoznania!";
	 tlumaczenie["pl"]["c55"] = "Wybrane id w ogame już zostało zarejestrowane na danym uniwersie! Informacja o konflikcie została już wysłana do Twórcy Systemu do rozpoznania!";
	 tlumaczenie["pl"]["c56"] = "Hasło jest niebezpieczne! Hasło nie może być puste ani identyczne z loginem!";
	 tlumaczenie["pl"]["c57"] = "Adres email jest nieprawidłowy";
	 tlumaczenie["pl"]["c58"] = "Nieznany błąd przy dodawaniu gracza";
	 tlumaczenie["pl"]["c59"] = "Błędne hasło";
	 tlumaczenie["pl"]["c60"] = "Nie istnieje login w danym uniwersie";
	 tlumaczenie["pl"]["c61"] = "Wybrano nie istniejące uniwersum";
	 tlumaczenie["pl"]["c62"] = "Wybrano nie istniejącą społeczność";
	 tlumaczenie["pl"]["c63"] = "";
	 
	 
	 
	 
	 
	 //tlumaczenie["pl"]["j-pl"] = "Polski";
	 //tlumaczenie["pl"]["j-ang"] = "English";
	 
	 tlumaczenie["ang"] = new Object();
	 tlumaczenie["ang"]["jezyk"] = "English";
	 tlumaczenie["ang"]["a1"] = "Jest dostępna nowa wersja $1 skryptu.\nUaktualnij skrypt! Link do skryptu znajdziesz w ustawieniach Systemu Kopernik lub w dodatku Greasemonkey kliknij 'Zarzadzaj skryptami...' a następnie kliknij w skrypt System Kopernik, kliknij prawym klawiszem myszki i wybierz 'Znajdź aktualizacje'.";
    tlumaczenie["ang"]["a2"] = "Wystąpił błąd który już został zgłoszony!\nAdministracja pracuje nad rozwiązaniem tego błędu.";
	 
	 tlumaczenie["ang"]["b1"] = "(drag the window where you want)";
	 tlumaczenie["ang"]["b2"] = "Setup script";
	 tlumaczenie["ang"]["b3"] = "Language";
	 tlumaczenie["ang"]["b4"] = "Autologin";
	 tlumaczenie["ang"]["b5"] = "Linked to the account Ogame";
	 tlumaczenie["ang"]["b6"] = "Automatyczna synchronizacja listy obiektów";
         tlumaczenie["ang"]["b7"] = "Automatyczna aktualizacja badań";
         tlumaczenie["ang"]["b8"] = "Automatyczna aktualizacja obrony";
         tlumaczenie["ang"]["b9"] = "Automatyczna aktualizacja floty";
         tlumaczenie["ang"]["b10"] = "Web page script";
	 
	 tlumaczenie["ang"]["c1"] = "Log in"; 
	 tlumaczenie["ang"]["c2"] = "The new community"; 	 
	 tlumaczenie["ang"]["c3"] = "New universe";	 
	 tlumaczenie["ang"]["c4"] = "Create Account";
	 tlumaczenie["ang"]["c5"] = "Logged";
	 
	 tlumaczenie["ang"]["c6"] = "Community";
	 tlumaczenie["ang"]["c7"] = "Choose";
	 tlumaczenie["ang"]["c8"] = "Report a new community";
 	 tlumaczenie["ang"]["c9"] = "Universe";
	 tlumaczenie["ang"]["c10"] = "-";
	 tlumaczenie["ang"]["c11"] = "There are no universals to the community";
	 tlumaczenie["ang"]["c12"] = "Report a new universe";
	 tlumaczenie["ang"]["c13"] = "Login";
	 tlumaczenie["ang"]["c14"] = "Create an account";
	 tlumaczenie["ang"]["c15"] = "Password";
	 tlumaczenie["ang"]["c16"] = "Log in";
	 
	 tlumaczenie["ang"]["c17"] = "Enter the address of the new community ";
	 tlumaczenie["ang"]["c18"] = "Report community";
 	 tlumaczenie["ang"]["c19"] = "Back";
	 tlumaczenie["ang"]["c20"] = "Sent an application for a new community for System Administration"; 
	 tlumaczenie["ang"]["c21"] = "Notification of a new community was not accepted!";
	 tlumaczenie["ang"]["c22"] = "Community";
	 tlumaczenie["ang"]["c23"] = "Name of new universe";
	 tlumaczenie["ang"]["c24"] = "Address of the universe";
	 tlumaczenie["ang"]["c25"] = "Report of the universe";
	 tlumaczenie["ang"]["c26"] = "Sent a notification of a new universe for System Administration";
	 tlumaczenie["ang"]["c27"] = "Notification of a new universe was not accepted!";
	 
	 tlumaczenie["ang"]["c28"] = tlumaczenie["ang"]["c6"];
	 tlumaczenie["ang"]["c29"] = tlumaczenie["ang"]["c8"]
	 tlumaczenie["ang"]["c30"] = tlumaczenie["ang"]["c9"];
	 tlumaczenie["ang"]["c31"] = tlumaczenie["ang"]["c10"];
	 tlumaczenie["ang"]["c32"] = tlumaczenie["ang"]["c12"];
	 tlumaczenie["ang"]["c33"] = tlumaczenie["ang"]["c13"];
	 tlumaczenie["ang"]["c34"] = tlumaczenie["ang"]["c15"];
	 
	 tlumaczenie["ang"]["c35"] = "Different from OGame and the login";
	 tlumaczenie["ang"]["c36"] = "Repeat password";
	 tlumaczenie["ang"]["c37"] = "Email";
	 tlumaczenie["ang"]["c38"] = "E-mail address will be verified";
	 tlumaczenie["ang"]["c39"] = "Repeat email";
	 tlumaczenie["ang"]["c40"] = "Ogame player ID";
	 tlumaczenie["ang"]["c41"] = "Accepts the $1rules$2 of the system";
	 tlumaczenie["ang"]["c42"] = "Create an account";
	 tlumaczenie["ang"]["c43"] = "Login field empty";
	 tlumaczenie["ang"]["c44"] = "Password empty field or identical to the login";
	 tlumaczenie["ang"]["c45"] = "Repeated password is not identical with the proper password";
	 tlumaczenie["ang"]["c46"] = "E-mail field empty";
	 tlumaczenie["ang"]["c47"] = "E-mail address is not valid";
	 tlumaczenie["ang"]["c48"] = "Repeated email is not identical with the relevant email";
	 tlumaczenie["ang"]["c49"] = "You was not accepted the Rules!";
	 tlumaczenie["ang"]["c50"] = "Your account has been established! Account activation requires an email address yet. Please enter the e-mail and click on the link to activate your email address.";
	 tlumaczenie["ang"]["c51"] = "None of the required data!";
	 tlumaczenie["ang"]["c52"] = "The selected community does not exist!";
	 tlumaczenie["ang"]["c53"] = "Selected universe does not exist!";
	 tlumaczenie["ang"]["c54"] = "The selected username has already been registered at the uniwersie! Information about the conflict has already been sent to the system to recognize the Creator!";
	 tlumaczenie["ang"]["c55"] = "Selected id in ogame already been registered in a given uniwersie! Information about the conflict has already been sent to the system to recognize the Creator!";
	 tlumaczenie["ang"]["c56"] = "The password is dangerous! Password can not be blank or identical to login!";
	 tlumaczenie["ang"]["c57"] = "Email address is invalid";
	 tlumaczenie["ang"]["c58"] = "Unknown error when adding a player";
	 tlumaczenie["ang"]["c59"] = "Incorrect password";
	 tlumaczenie["ang"]["c60"] = "Login does NOT exist in the uniwersie";
	 tlumaczenie["ang"]["c61"] = "Selected non-existent universe";
	 tlumaczenie["ang"]["c62"] = "Selected non-existent community";
	 tlumaczenie["ang"]["c63"] = "";
	 
	 //tlumaczenie["ang"]["j-pl"] = "Polski";
	 //tlumaczenie["ang"]["j-ang"] = "English";


var blokada_petli_tlumaczenia =0;	 
function tlumacz(co,wyr1,wyr2,wyr3)
	{
	if(obslugiwane_jezyki.indexOf(jezyk)==-1)
		{
		//////////////////////////////////////////////////////////////////
		// numer indeksu wskazuje na domyslny jezyk tablicy obslugiwane_jezyki gdzy podany z ustawien jezyk nie jest obslugiwany
		//////////////////////////////////////////////////////////////////
		var jezyk_t = obslugiwane_jezyki[0];
		}
	else
		{
		var jezyk_t = jezyk;
		}
	try
		{
		var zdanie = tlumaczenie[jezyk_t][co];
		if (zdanie == undefined)
			{
			throw new Error("Błąd tłumaczenia: brak właściwości: "+co)
			}
		var i;
		ile_dolarow = new RegExp("(\\$\\d+)","g");
		for( i=0;ile_dolarow.test(zdanie);i++){}
		ile_dolarow = i;
		if(ile_dolarow != (arguments.length-1))
			{
			throw new Error("Niewłaściwa liczba argumentów dla ciągu! Dolarow jest "+ile_dolarow+" a argumentow "+(arguments.length-1));
			}
		}
	catch(wyjatek)
		{
		moj_wyjatek = new Error("Błąd tłumaczenia języka "+jezyk_t+" dla elementu "+co+". Treść wyjątku systemowego: "+wyjatek.toString());
/////////////////////////////////////////////////////
// Aby nie doszło do petli błąd tlumaczenia i zglaszania błędu zastosowano mechanizm zblokowania wywolania 2 tlumaczenia alertu o wyslaniu bledu dlatego musi być zmienna globalna blokada_petli_tlumaczenia któa blokuje alert gdy tlumaczy się info o wysłaniu dlatego co musi być rowne tej wiadomosci o wyslaniu bledu
/////////////////////////////////////////////////////
		if(co == "a2")
			{
			blokada_petli_tlumaczenia=1;
			}
		zglos_blad(moj_wyjatek);
		}
		
	for(i=1;i<arguments.length;i++)
		{
		zdanie = zdanie.replace("$"+i,arguments[i]);
		}
	return zdanie;
	}
var pod_stona_ogame = new RegExp("\\?page=([^&]*)&?","g").exec(unsafeWindow.location.search)[1];

// funkcje globalne
function sprawdz_czy_jest_aktualizacja()
	{
	function porownaj_wersje(wersja1, wersja2)
		{
		var tablica1 = wersja1.split(".");
		var tablica2 = wersja2.split(".");
		
		if (tablica1.length > tablica2.length)
			{
			for(var i=0; i<tablica1.length - tablica2.length;i++)
				{
				tablica2.push("0");
				}
			}
		else if (tablica1.length < tablica2.length)
			{
			for(var i=0; i<tablica2.length - tablica1.length;i++)
				{
				tablica1.push("0");
				}			
			}
		for(var i=0; i < tablica1.length; i++)
			{
			if(parseInt(tablica1[i]) < parseInt(tablica2[i]))
				{
				return 1;
				}
			if(parseInt(tablica1[i]) > parseInt(tablica2[i]))
				{
				return 0;
				}
			}
		return 0;
		}
	GM_xmlhttpRequest(
		{
  		method: "GET",
  		url: adres_systemu+"/wersja.php",
  		onload: function(response)
			{
			if(response.status == 200)
				{
				if(porownaj_wersje(wersja,response.responseText))
					{
					alert(tlumacz("a1",response.responseText));
					}				
				}
			else
				{
				zglos_blad(new Error("Błąd sprawdzania czy istnieje aktualizacja\nresponse.statusText="+response.statusText));
				}
  			},
		onerror: function(blad)
			{
			zglos_blad(new Error("Błąd sprawdzania czy istnieje aktualizacja"));
			}
		}
	);
	}
	
function zglos_blad(wyjatek)
	{
	function przygotuj_raport_bledu(wyjatek)
		{
		// pobranie waznych informacji dotyczących okolicznosci wystąppienia błędu. Dlatego ważne jest dowiedzenie się u kogo dany błąd wystąpił zatem odczyt wszystkich danych zmiennych i aktualnej wersji.
		var lista_zmiennych = GM_listValues();
		var raport_bledu = "wersja="+wersja;
		for(var i = 0; i < lista_zmiennych.length; i++)
			{
			var wartosc_pod_zmienna = GM_getValue(lista_zmiennych[i], "" );
			raport_bledu += "&"+lista_zmiennych[i]+"="+wartosc_pod_zmienna;
			}
		
		if(wyjatek != null )
			{
			if(wyjatek instanceof Error)
				{
				raport_bledu += "&blad_typ=wyjatek&linia="+wyjatek.lineNumber;
				}
			else
				{
				raport_bledu += "&blad_typ=nie_wyjatek";
				}
			raport_bledu += "&tresc_bledu="+wyjatek.toString();
			}
		return raport_bledu;
		}
	GM_xmlhttpRequest(
		{
		method: "POST",
		data: przygotuj_raport_bledu(wyjatek),
		url: adres_systemu+"/zglos_blad.php",
		headers:
			{
			"Content-Type": "application/x-www-form-urlencoded"
			},
		onload: function(response)
			{
			if(!blokada_petli_tlumaczenia)
				{
				alert(tlumacz("a2"));
				}
			}
		}
	);
	}

domyslne_wartosci_konta = new Object();
domyslne_wartosci_konta["jezyk"] = "ang";
domyslne_wartosci_konta["Okno_ustawien_pokaz"] = true;
domyslne_wartosci_konta["Okno_ustawien_szerokosc"] = "350px";
domyslne_wartosci_konta["Okno_ustawien_wysokosc"] = "250px";
domyslne_wartosci_konta["Okno_ustawien_x"] = 40;
domyslne_wartosci_konta["Okno_ustawien_y"] = 40;
domyslne_wartosci_konta["autologowanie"] = true;
domyslne_wartosci_konta["autologowanie_spolecznosc"] = "";
domyslne_wartosci_konta["autologowanie_uniwersum"] = "";
domyslne_wartosci_konta["autologowanie_login"] = "";
domyslne_wartosci_konta["autologowanie_haslo_md5"] = "";
domyslne_wartosci_konta["wiaz_z_kontem_ogame"] = true;
domyslne_wartosci_konta["automatyczna_synchronizacja_listy_obiektow"] = true;
domyslne_wartosci_konta["lista_planet_w_skrypcie"] = Array();
domyslne_wartosci_konta["wybrany_obiekt"] = new Object();
domyslne_wartosci_konta["wybrany_obiekt"].numer = null;
domyslne_wartosci_konta["wybrany_obiekt"].typ = null;
domyslne_wartosci_konta["automatyczna_aktualizacja_badan"] = true;
domyslne_wartosci_konta["automatyczna_aktualizacja_obrony"] = true;
domyslne_wartosci_konta["automatyczna_aktualizacja_floty"] = true;

	
function odczytaj_ustawienia_jezykowe()
	{
	tablica_zmiennych = JSON.parse(GM_getValue("tablica_zmiennych","[]"));
	// Sprawdzanie czy konfiguracja ustawien istnieje
	// if(Object.keys(tablica_zmiennych).length == 0) // Wymaga FF 4+
	if(Array.prototype.isPrototypeOf(tablica_zmiennych))
		{
		tablica_zmiennych = new Object;
		tablica_zmiennych[uniwersum] = new Object;
		tablica_zmiennych[uniwersum][login] = domyslne_wartosci_konta;//new Object;
		tablica_zmiennych[uniwersum][login]["jezyk"] = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-language").content;
		GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
		}
	// Sprawdza czy istnieje konfiguracja dla danego uni
	if(!tablica_zmiennych[uniwersum])
		{
		tablica_zmiennych[uniwersum] = new Object;
		tablica_zmiennych[uniwersum][login] = domyslne_wartosci_konta;//new Object;
		tablica_zmiennych[uniwersum][login]["jezyk"] = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-language").content;
		GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
		}
	// Sprawdza czy istnieje konto dla danego uni
	if(!tablica_zmiennych[uniwersum][login])
		{
		tablica_zmiennych[uniwersum][login] = domyslne_wartosci_konta;//new Object;
		tablica_zmiennych[uniwersum][login]["jezyk"] = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-language").content;
		GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
		}
	jezyk = tablica_zmiennych[uniwersum][login]["jezyk"];
	}


	
	
	
	
	
	
function rozrzesz_mozliwosci_podstrony()
	{
	function strona_normalna()
		{
		function okno_ustawien_pokaz_ukryj()
			{
			function tworz_okno_ustawien()
				{
				var roznicaX = 0;
				var roznicaY = 0;
				
				function start_przeciagania(zdarzenie)
					{
					var div_ustawienia = unsafeWindow.document.getElementById('ustawienia_kopernika');
					roznicaX = zdarzenie.clientX - div_ustawienia.offsetLeft;
					roznicaY = zdarzenie.clientY - div_ustawienia.offsetTop;
					unsafeWindow.document.body.addEventListener("mousemove",rusz_przeciaganie,false);
					unsafeWindow.document.body.addEventListener("mouseup",stop_przeciagania,false);
					zdarzenie.preventDefault();
					}
				function rusz_przeciaganie(zdarzenie)
					{
			  		var div_ustawienia = unsafeWindow.document.getElementById('ustawienia_kopernika');
			  		div_ustawienia.style.left = (zdarzenie.clientX - roznicaX)+"px";
					div_ustawienia.style.top = (zdarzenie.clientY - roznicaY)+"px";
					zdarzenie.preventDefault();
					}
				function stop_przeciagania(zdarzenie)
					{
					unsafeWindow.document.body.removeEventListener("mousemove",rusz_przeciaganie,false);
					unsafeWindow.document.body.removeEventListener("mouseup",stop_przeciagania,false);
					zdarzenie.preventDefault();
					tablica_zmiennych[uniwersum][login]["Okno_ustawien_x"] = zdarzenie.clientX - roznicaX;
					tablica_zmiennych[uniwersum][login]["Okno_ustawien_y"] = zdarzenie.clientY - roznicaY;
					GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
					}
					
				function zmien_rozmiar(zdarzenie)
					{
					if(zdarzenie.currentTarget == zdarzenie.target)
						{
						zdarzenie.stopPropagation();
						zdarzenie.preventDefault();
						tablica_zmiennych[uniwersum][login]["Okno_ustawien_szerokosc"] = zdarzenie.target.style.width;
						tablica_zmiennych[uniwersum][login]["Okno_ustawien_wysokosc"] = zdarzenie.target.style.height;
						GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
						}
					}
					
				function zawartosc_okna()
					{
			
					GM_addStyle("\
					.tytul {color: #FFD700; border-style:double; border-width: 5px; cursor: move; text-align: center}\
					.wnetrze {padding: 5px;						overflow: auto;\
						resize: both;\
						min-width: 200px;\
						}\
					.naglowek , .zawartosc {border-style:dashed; border-width: 1px; margin:5px; text-align: center}\
					.naglowek {background-color: #141E26; color: #6F9FC8; font-weight: bold}\
					.naglowek:hover {border-style:solid; cursor:pointer}\
					.zawartosc {background-color: #131014; color: #FFFFFF;}\n\
                                        ");
					var zawartosc_okna_ustawien = document.createDocumentFragment();
					var div_tytul = document.createElement("div");
					div_tytul.className="tytul";
					div_tytul.innerHTML="<div style=\"position:relative;\"><h2>System Kopernik</h2> "+tlumacz("b1")+"<div style=\"position: absolute; top:0px; right:0px; heigth: 25px; width: 25px; background-color: red; color: black; cursor:pointer; font-size: large \" >X</div></div>";
					div_tytul.getElementsByTagName("div")[0].getElementsByTagName("div")[0].addEventListener("click",okno_ustawien_pokaz_ukryj,false);
					div_tytul.addEventListener("mousedown",start_przeciagania,false);
					zawartosc_okna_ustawien.appendChild(div_tytul);
					var div_wnetrze = document.createElement("div");
					div_wnetrze.className="wnetrze";
					div_wnetrze.style.width = tablica_zmiennych[uniwersum][login]["Okno_ustawien_szerokosc"] ? tablica_zmiennych[uniwersum][login]["Okno_ustawien_szerokosc"] : "350px";
					div_wnetrze.style.height = tablica_zmiennych[uniwersum][login]["Okno_ustawien_wysokosc"] ? tablica_zmiennych[uniwersum][login]["Okno_ustawien_wysokosc"] : "300px";
					div_wnetrze.innerHTML="\
						<div id=\"nag_ustawienia_skryptu\" class=\"naglowek\">"+
							tlumacz("b2")+"\
						</div>\
						<div class=\"zawartosc\" id=\"zaw_ustawien_skryptu\" style=\"display: none\">\
							<form name=\"ustawienia_skryptu\">\
								<table style=\"margin: 0 auto;\">\
									<tr>\
										<td>"+tlumacz("b3")+" (Language)</td>\
										<td>\
											<select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"jezyk\"></select>\
										</td>\
									</tr>\
									<tr>\
										<td>"+tlumacz("b4")+"</td>\
										<td><input type=\"checkbox\" name=\"autologowanie\"></td>\
									</tr>\
									<tr>\
										<td>"+tlumacz("b5")+"</td>\
										<td><input type=\"checkbox\" name=\"wiazac_z_kontem_ogame\"></td>\
									</tr>\
                                                                        <tr>\
                                                                                <td>"+tlumacz("b6")+"</td>\
                                                                                <td><input type=\"checkbox\" name=\"automaczyna_synchronizacja_listy_obiektow\"></td>\
                                                                        </tr>\n\
                                                                        <tr>\n\
                                                                                <td>"+tlumacz("b7")+"</td>\
                                                                                <td><input type=\"checkbox\" name=\"automaczyna_aktualizacja_badan\"></td>\
                                                                        </tr>\
									<tr>\
										<td>"+tlumacz("b8")+"</td>\
										<td><input type=\"checkbox\" name=\"automaczyna_aktualizacja_obrony\"></td>\
									</tr>\
									<tr>\
										<td>"+tlumacz("b9")+"</td>\
										<td><input type=\"checkbox\" name=\"automaczyna_aktualizacja_flota\"></td>\
									</tr>\
                                                                        <tr>\
                                                                                <td>"+tlumacz("b10")+"</td>\
                                                                                <td><a href=\"http://userscripts.org/scripts/show/119423\" target=\"_blank\">http://userscripts.org/</a></td>\
                                                                        </tr>\
								</table>\
							</form>\
						</div>\
						<div id=\"nag_stan_uzytkownika\" class=\"naglowek\"></div>\
						<div id=\"zaw_stan_uzytkownika\" class=\"zawartosc\"></div>\
						<div id=\"nag_dane_sojuszu\" class=\"naglowek\" style=\"display: none\"></div>\
						<div id=\"zaw_dane_sojuszu\" class=\"zawartosc\" style=\"display: none\"></div>\
					";
                                    
					div_wnetrze.addEventListener("click",zmien_rozmiar,false);
					div_wnetrze.getElementsByTagName("div").namedItem("nag_ustawienia_skryptu").addEventListener("click",function(e) {pokaz_ukryj(this.nextElementSibling) },false);
					div_wnetrze.getElementsByTagName("div").namedItem("nag_stan_uzytkownika").addEventListener("click",function(e) {pokaz_ukryj(this.nextElementSibling) },false);
					div_wnetrze.getElementsByTagName("div").namedItem("nag_dane_sojuszu").addEventListener("click",function(e) {pokaz_ukryj(this.nextElementSibling) },false);
					div_wnetrze.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").addEventListener("click",function(e) {this.previousElementSibling.style.backgroundColor="#141E26"; },false);
					
					silnik_stan_uzytkownika(div_wnetrze.getElementsByTagName("div").namedItem("nag_stan_uzytkownika"),div_wnetrze.getElementsByTagName("div").namedItem("zaw_stan_uzytkownika"));
				
					
					for(var i=0; i<obslugiwane_jezyki.length;i++ )
						{
						if(jezyk==obslugiwane_jezyki[i])
							{
							var zaznaczony = true;
							}
						else
							{
							var zaznaczony = false;
							}
						div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("jezyk").add(new Option(tlumaczenie[obslugiwane_jezyki[i]]["jezyk"],obslugiwane_jezyki[i],zaznaczony),null);
						// muli: add(new Option(tlumacz("j-"+obslugiwane_jezyki[i]),obslugiwane_jezyki[i],zaznaczony),null);
						}
  					function zmien_jezyk()
						{
						tablica_zmiennych[uniwersum][login]["jezyk"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("jezyk").value;
						jezyk = tablica_zmiennych[uniwersum][login]["jezyk"];
						GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
						div_ustawienia.innerHTML = "";
						div_ustawienia.appendChild(zawartosc_okna());
						}
					div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("jezyk").addEventListener("change",zmien_jezyk,false);
					
					div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("autologowanie").checked = tablica_zmiennych[uniwersum][login]["autologowanie"];
					function zmien_autologowanie()
						{
						tablica_zmiennych[uniwersum][login]["autologowanie"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("autologowanie").checked;
						if(!tablica_zmiennych[uniwersum][login]["autologowanie"])
							{
							tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"] = "";
							tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"] = "";
							tablica_zmiennych[uniwersum][login]["autologowanie_login"] = "";
							tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"] = "";
							}
						GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
						}
					div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("autologowanie").addEventListener("change",zmien_autologowanie,false);
					
					div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("wiazac_z_kontem_ogame").checked = tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"];
					div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").disabled=!tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"];
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").disabled=!tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"];
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").disabled=!tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"];
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").disabled=!tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"];
                                        function zmien_wiazanie_z_kontem_ogame()
						{
                                                if(div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("wiazac_z_kontem_ogame").checked)
                                                    {
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").disabled=false;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").checked=true;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").disabled=false;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").checked=true;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").disabled=false;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").checked=true;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").disabled=false;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").checked=true;
                                                    }
                                                else
                                                    {
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").disabled=true;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").checked=false;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").disabled=true;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").checked=false;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").disabled=true;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").checked=false;
                                                    
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").disabled=true;
                                                    div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").checked=false;
                                                    }
                                                tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_floty"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").checked;
                                                tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_obrony"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").checked;
                                                tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_badan"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").checked;    
                                                tablica_zmiennych[uniwersum][login]["automatyczna_synchronizacja_listy_obiektow"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").checked;
						tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("wiazac_z_kontem_ogame").checked;
						silnik_stan_uzytkownika(div_wnetrze.getElementsByTagName("div").namedItem("nag_stan_uzytkownika"),div_wnetrze.getElementsByTagName("div").namedItem("zaw_stan_uzytkownika"));
						GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
						}
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("wiazac_z_kontem_ogame").addEventListener("change",zmien_wiazanie_z_kontem_ogame,false);
					
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").checked = tablica_zmiennych[uniwersum][login]["automatyczna_synchronizacja_listy_obiektow"];
                                        function zmien_automatyczna_synchronizacje_listy_obiektow()
                                            {
                                            tablica_zmiennych[uniwersum][login]["automatyczna_synchronizacja_listy_obiektow"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").checked;			
                                            GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));    
                                            }
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_synchronizacja_listy_obiektow").addEventListener("change",zmien_automatyczna_synchronizacje_listy_obiektow,false);
                                        
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").checked = tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_badan"];
                                        function zmien_automatyczna_aktualizacje_badan()
                                            {
                                            tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_badan"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").checked;			
                                            GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
                                            }
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_badan").addEventListener("change",zmien_automatyczna_aktualizacje_badan,false);
                                        
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").checked = tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_obrony"];
                                        function zmien_automatyczna_aktualizacje_obrony()
                                            {
                                            tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_obrony"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").checked;			
                                            GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
                                            }
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_obrony").addEventListener("change",zmien_automatyczna_aktualizacje_obrony,false);
                                        
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").checked = tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_floty"];
                                        function zmien_automatyczna_aktualizacje_floty()
                                            {
                                            tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_floty"] = div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").checked;			
                                            GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
                                            }
                                        div_wnetrze.getElementsByTagName("form").namedItem("ustawienia_skryptu").elements.namedItem("automaczyna_aktualizacja_flota").addEventListener("change",zmien_automatyczna_aktualizacje_floty,false);
                                        
                                        zawartosc_okna_ustawien.appendChild(div_wnetrze);
                                        return zawartosc_okna_ustawien;
					}
				
				GM_addStyle("\
					#ustawienia_kopernika\
						{\
						position: absolute;\
						background-color: #202025;\
						border: 1px solid #555555;\
						z-index: 1001;\
						//overflow: auto;\
						//resize: both;\
						}\
					");
				var div_ustawienia = document.createElement('div');
				div_ustawienia.id="ustawienia_kopernika";
				div_ustawienia.style.left = tablica_zmiennych[uniwersum][login]["Okno_ustawien_x"] ? tablica_zmiennych[uniwersum][login]["Okno_ustawien_x"]+"px" : "40px";
				div_ustawienia.style.top = tablica_zmiennych[uniwersum][login]["Okno_ustawien_y"] ? tablica_zmiennych[uniwersum][login]["Okno_ustawien_y"]+"px" : "40px";
				div_ustawienia.style.display = "none";
				div_ustawienia.appendChild(zawartosc_okna());
				unsafeWindow.document.body.appendChild(div_ustawienia);
				
				return div_ustawienia;
				}

			if(document.getElementById("ustawienia_kopernika"))
				{
				div = document.getElementById("ustawienia_kopernika");
				}
			else
				{
				var div = tworz_okno_ustawien();
				}
			if(div.style.display == "none")
				{
				div.style.display = "block";
				tablica_zmiennych[uniwersum][login]["Okno_ustawien_pokaz"] = true;
				}
			else
				{
				div.style.display = "none";
				tablica_zmiennych[uniwersum][login]["Okno_ustawien_pokaz"] = false;
				}
			GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
			}

		//alert("podstrona normalna");
		document.getElementById("menuTable").innerHTML +="<li><span class=\"menu_icon\"><img width=\"38\" height=\"29\" src=\"http://gf1.geo.gfsrv.net/cdn07/e77402177b37bee59124d784aa81d5.gif\"></span><a id=\"przycisk_systemu\" class=\"menubutton premiumHighligt\" target=\"_self\" accesskey=\"\" href=\"javascript:void(0)\"><span class=\"textlabel\">System Kopernik</span></a></li>";
		document.getElementById("przycisk_systemu").addEventListener("click",okno_ustawien_pokaz_ukryj,false);
		if(tablica_zmiennych[uniwersum][login]["Okno_ustawien_pokaz"] == true)
			{
			okno_ustawien_pokaz_ukryj();
			}
                // automatyczne synchronizacja danych listy planet gdy użytkownik jest zalogowany i autologowanie
                function synchronizuj_rozne_dane()
                    {
                    if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
                        {
                        if(tablica_zmiennych[uniwersum][login]["automatyczna_synchronizacja_listy_obiektow"])
                            {
                            sprawdz_liste_planet(); 
                            }
                        if(tablica_zmiennych[uniwersum][login]["automatyczna_synchronizacja_listy_obiektow"])
                            {
                            wybierz_automatycznie_aktywny_obiekt();
                            }
                        }
                    }
                if(czy_zalogowany())
                    {
                    synchronizuj_rozne_dane();
                    document.getElementById("przycisk_systemu").childNodes[0].style.color="GreenYellow";
                    }
                else
                    {
                    if(tablica_zmiennych[uniwersum][login]["autologowanie"] && zaloguj(tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"],tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"],tablica_zmiennych[uniwersum][login]["autologowanie_login"],tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"])==1)
                        {
                        synchronizuj_rozne_dane();
                        document.getElementById("przycisk_systemu").childNodes[0].style.color="GreenYellow";
                        }
                    else
                        {
                        document.getElementById("przycisk_systemu").childNodes[0].style.color="Red";
                        }
                    }
		}

	function strona_pierwszyplan()
		{
                // Ogame zrezygnowało z iframe w okienkach pierwszo planowych i nie da się łatwo określić typ okienka ponieważ zawartośc jest juz ładowana XHR
                // pomyślec o wywalenie wszystkich pierwszych planow z skryptów!
		//alert("podstrona pierwszyplan");
		}
	switch(pod_stona_ogame)
		{
		case "overview":
								//alert("Podgląd");
								strona_normalna();
								break;
		case "resources":
								//alert("Surowce");
								strona_normalna();
								break;
		case "resourceSettings":
								//alert("Surowce ustawienia");
								strona_normalna();
								break;
		case "station":
								//alert("Stacja");
								strona_normalna();
								break;
                // jest nowy handlarz i chyba dla pod nie beda juz wykorzystywane
		case "trader":
								//alert("Handlarz");
								strona_normalna();
								break;
		case "traderlayer":
								//alert("Handlarz ogamowy");
								break;
                case "traderOverview":
                                                                //alert("Nowy handlarz");
                                                                strona_normalna();
                                                                break;
		case "research":
								//alert("Badania");
                                                                odczytaj_badania_gracza();
								strona_normalna();
								break;
		case "shipyard":
								//alert("Stocznia");
								strona_normalna();
								break;
		case "defense":
								//alert("Obrona");
								odczytaj_obrone_planety();
                                                                strona_normalna();
								break;
		case "fleet1":
								//alert("Flota 1");
                                                                odczytaj_flote_planety();
								strona_normalna();
								break;
		case "fleet2":
								//alert("Flota 2");
								strona_normalna();
								break;
		case "fleet3":
								//alert("Flota 3");
								strona_normalna();
								break;
		case "galaxy":
								//alert("Galaktyka");
								strona_normalna();
								break;												
		case "alliance":
								//alert("Sojusz");
								strona_normalna();
								break;
		case "premium":
								//alert("Kantyna");
								strona_normalna();
								break;
                case "shop":
                                                                //alert("sklep");
                                                                strona_normalna();
                                                                break;
		case "movement":
								//alert("Ruch floty");
								strona_normalna();
								break;
		case "changelog":
								//alert("Changelog");
								strona_normalna();
								break;
		case "tutorial":
								//alert("Tutorial");
								strona_normalna();
								break;
		case "messages":
								//alert("Wiadomości");
								strona_normalna();
								break;
		case "showmessage":
								//alert("Podgląd wiadomości");
                                                                // Ogame zrezygnowało z iframe w okienkach pierwszo planowych i nie da się łatwo określić typ okienka ponieważ zawartośc jest juz ładowana XHR
                                                                //sprawdz_wiadomosc();
								strona_pierwszyplan();
								break;
		case "writemessage":
								//alert("Pisanie wiadomości");
								strona_pierwszyplan();
								break;
		case "buddies":
								//alert("Buddy-zapytania");
								strona_pierwszyplan();
								break;
		case "missileattacklayer":
								//alert("Atak rakietowy");
								strona_pierwszyplan();
								break;
		case "statistics":
								//alert("Statystyki");
								strona_normalna();
								break;
		case "highscore":
								//alert("Nowe statystyki wersji 3.0");
								strona_normalna();
								break;
		case "notices":
								//alert("Notatnik");
								strona_pierwszyplan();
								break;
		case "search":
								//alert("Wyszukiwarka");
								strona_pierwszyplan();
								break;
		case "preferences":
		  						//alert("Ustawienia Ogame");
								strona_normalna();
			 					break;
		// techinfo chyba juz w nowej wersji nie istnieje
                //case "techinfo":	
		//						//alert("Wiecej informacji");
		//						strona_pierwszyplan();
		//	 					break;
		case "techtree":	
								//alert("Drzewo technologi");
								strona_pierwszyplan();
			 					break;
		// globalTechtree chyba juz w nowej wersji nie istenieje
                //case "globalTechtree":
		//						//alert("Całe drzewo technologi w ogame");
		//						strona_pierwszyplan();
		//	 					break;
		case "combatreport":
								//alert("Raport Wojenny");
								strona_pierwszyplan();
			 					break;
		case "phalanx":
								//alert("Falanga czujników");
								strona_pierwszyplan();
			 					break;
		case "jumpgatelayer":
								//alert("Teleporter");
								strona_pierwszyplan();
			 					break;		
		case "logout":
								//alert("Wylogowywanie się");
								break;
                case "empire":
                                                                // Chyba wyglad dodatkowy z komandorem
                                                                strona_normalna();
                                                                break;
		default:
								throw new Error("Nierozpoznana podstrona: "+pod_stona_ogame);
								break;
		}
	}
	



	
try
	{
	//GM_deleteValue("tablica_zmiennych");
	odczytaj_ustawienia_jezykowe(); // powinno się podzielić odczyt jezykowy (który musi być wykonany przez sprawdzeniem aktualizacji)[z obslugą braku możliwości odczutu wartosc domyślna]{aby skrypt nie był wywierszalny} i odczyt pozostałych informacji które powinny być po sprawdzeniu aktualizacji
	sprawdz_czy_jest_aktualizacja(); // sprawdzenie aktualizacji powinno być pierwszym działaniem skryptu. Wystarczy że początkoło zaczniemy zle odczytywać dane i skrypt zostanie zapomniany
	rozrzesz_mozliwosci_podstrony();
	//alert(GM_getValue("tablica_zmiennych","[]"));
	}
catch(wyjatek)
	{
	zglos_blad(wyjatek);
	}

function pokaz_ukryj(id_elementu_lub_element)
	{	
	if(unsafeWindow.document.getElementById(id_elementu_lub_element)==null)
		{
		var element = id_elementu_lub_element
		}
	else
		{
		var element = unsafeWindow.document.getElementById(id_elementu_lub_element)
		}
	if(element.style.display=="none")
		{
		element.style.display="block";
		}
	else
		{
		element.style.display="none";
		}
	}
	
// obsluga aktywnej zawartosci okna ustawien //
function czy_zalogowany()
	{
	var wynik = GM_xmlhttpRequest(
		{
		synchronous: true,
		method: "GET",
		url: adres_systemu+"/czy_zalogowany.php",
		onload: function(response)
			{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd sprawdzania czy zalogowany\nresponse.statusText="+response.statusText));
				}
			},
		onerror: function(response)
			{
			zglos_blad(new Error("Błąd sprawdzania czy zalogowany"));
			}
		}
	)

	if(wynik.responseText=="1")
		{
		return true;
		}
	else
		{
		return false
		}
	}
	
function pobierz_liste_spolecznosci()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "GET",
		 url: adres_systemu+"/lista_spolecznosci.php",
		 onload: function(response)
		 	{
			if(response.status != 200)
		 		{
				zglos_blad(new Error("Błąd sprawdzania listy społeczności\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd sprawdzania listy społeczności"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_uniwersow_dla_danej_spolecznosci(spolecznosc)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/lista_uniwersow.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "spolecznosc="+spolecznosc,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd sprawdzania liste uniwersow\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd sprawdzania liste uniwersow"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function zglos_nowa_spolecznosc(nowa_spolecznosc)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/zglos_nowa_spolecznosc.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "nowa_spolecznosc="+nowa_spolecznosc,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zgłaszania nowej społeczności\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zgłaszania nowej społeczności"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function zglos_nowe_uniwersum(spolecznosc,nazwa_nowego_uniwersum,adres_nowego_uniwersum)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/zglos_nowe_uniwersum.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "spolecznosc="+spolecznosc+"&nazwa_nowego_uniwersum="+nazwa_nowego_uniwersum+"&adres_nowego_uniwersum="+adres_nowego_uniwersum,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zgłaszania nowego uniwersum\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zgłaszania nowego uniwersum"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function utworz_konto(spolecznosc,uniwersum,login,haslo,email,id_w_ogame)
	{
	var wynik = GM_xmlhttpRequest(
		{
		synchronous: true,
		method: "POST",
		url: adres_systemu+"/utworz_konto.php",
		headers:
			{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		data: "spolecznosc="+spolecznosc+"&uniwersum="+uniwersum+"&login="+login+"&haslo_md5="+md5(haslo)+"&email="+email+"&id_w_ogame="+id_w_ogame,
		onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd utworzenia konta\nresponse.statusText="+response.statusText));
				}
			},
		onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd utworzenia konta"));
			}
		}
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function zaloguj(spolecznosc,uniwersum,login,haslo_md5)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/zaloguj.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "spolecznosc="+spolecznosc+"&uniwersum="+uniwersum+"&login="+login+"&haslo_md5="+haslo_md5,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zalogowania\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zalogowania"));
			}
		 }
	)
        return JSON.parse(wynik.responseText.trimLeft());
	}
	
function wyloguj()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/wyloguj.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd wylogowania\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd wylogowania"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_dane_zalogowania()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/dane_zalogowania.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania danych zalogowania\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania danych zalogowania"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trim());
	}
	
function spolecznosc_dla_jezyka_i_uniwersum()
	{
	kod_jezyka = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-language").content;
	uniwersum = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-universe").content;
	switch(kod_jezyka)
		{
		case "pl":
						return "ogame.pl";
		default:
						zglos_blad(new Error("Błąd określania spoleczności dla kodu jezyka "+kod_jezyka+" i uniwersum "+uniwersum));
		}
	}
	
function wyslij_ponownie_kod_aktywacyjny()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/wyslij_kod_aktywacyjny.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd wysyłania kodu aktywacyjnego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd wysyłania kodu aktywacyjnego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_dane_edytuj_konto()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/dane_edytuj_konto.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania danych edytuj konto\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania danych edytuj konto"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function aktualizuj_dane_edytuj_konto(kod_jezyka,tech_naped_spalinowy,tech_naped_impulsywny,tech_naped_nadprzestrzeny,tech_bojowa,tech_ochrona,tech_opancerzenia)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/aktualizuj_dane_edytuj_konto.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "kod_jezyka="+kod_jezyka+"&tech_naped_spalinowy="+tech_naped_spalinowy+"&tech_naped_impulsywny="+tech_naped_impulsywny+"&tech_naped_nadprzestrzeny="+tech_naped_nadprzestrzeny+"&tech_bojowa="+tech_bojowa+"&tech_ochrona="+tech_ochrona+"&tech_opancerzenia="+tech_opancerzenia,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd aktualizowania danych edytuj konto\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd aktualizowania danych edytuj konto"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_znajomych()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/lista_znajomych.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy znajomych\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy znajomych"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function usun_znajomego(id_gracza)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/usun_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza="+id_gracza,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd usuwania znajomego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd usuwania znajomego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function wyszukaj_znajomego(login)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/wyszukaj_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "login="+login,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania loginow wyszukanów\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania loginow wyszukanów"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function dodaj_znajomego(id_gracza)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/dodaj_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza="+id_gracza,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd dodawania znajomego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd dodawania znajomego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}	

function pobierz_liste_zaproszen_twoich()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/lista_zaproszen_twoich.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy zaproszen twoich\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy zaproszen twoich"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function odwolaj_zaproszenie_dla_znajomego(id_gracza)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/odwolaj_zaproszenie_dla_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza="+id_gracza,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd odwoływania zaproszenia dla znajomego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd odwoływania zaproszenia dla znajomego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_zaproszen()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/lista_zaproszen.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy zaproszen\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy zaproszen"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function zaakceptuj_zaproszenie_znajomego(id_gracza)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/zaakceptuj_zaproszenie_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza="+id_gracza,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zaakceptowanie znajomego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zaakceptowanie znajomego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function odrzoc_zaproszenie_znajomego(id_gracza)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/lista_znajomych/odrzoc_zaproszenie_znajomego.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza="+id_gracza,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd odrzocania znajomego\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd odrzucania znajomego"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function zaloz_sojusz(nazwa_sojuszu)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/zaloz.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "nazwa_sojuszu="+nazwa_sojuszu,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zakładania sojuszu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zakładania sojuszu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_imperiow()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/lista_imperiow.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy imperiow\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy imperiow"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_sojuszy_imperia(id_imperium)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/lista_sojuszy.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_imperium="+id_imperium,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy sojuszy\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy sojuszy"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function dolacz_do_sojuszu(id_sojuszu)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/dolacz.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_sojuszu="+id_sojuszu,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd dołączania do sojuszu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd dołączania do sojuszu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function odejdz_z_sojuszu()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/odejdz.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd odejścia z sojuszu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd odejścia z sojuszu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_liste_administratorow_imperium()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/lista_administratorow.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania listy administratorów Imperium\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania listy administratorów Imperium"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_informacje_o_aktywacji(id_gracza_do_aktywowania)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/info_aktywacji.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza_do_aktywowania="+id_gracza_do_aktywowania,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania informacji o aaktywacji\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania informacji o aaktywacji"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function aktywuj_dostep_do_danych_sojuszu(id_gracza_do_aktywowania)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/aktywuj_dostep.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza_do_aktywowania="+id_gracza_do_aktywowania,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd aktywowania dostępu do danych\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd aktywowania dostępu do danych"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function odrzuc_propozycje_przyjecia(id_gracza_do_odrzucenia)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/odrzuc_propozycje.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_gracza_do_odrzucenia="+id_gracza_do_odrzucenia,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd odrzucania propozycji przyjecia\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd odrzucania propozycji przyjecia"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_informacje_o_imperium()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/sojusz/informacje.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania informacji o imperium\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobieraniainformacji o imperium"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function pobierz_wiadomosci_shoutbox(id_ostatniej_wiadomosci)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/shoutbox/odczytaj.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_ostatniej_wiadomosci="+id_ostatniej_wiadomosci,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobierania wiadomosci shoutbox\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobierania wiadomosci shoutbox"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function wyslij_wiadomosc_shoutbox(wiadomosc)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/shoutbox/wyslij.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "wiadomosc="+wiadomosc,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd wysylania wiadomosci shoutbox\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd wysylania wiadomosci shoutbox"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
	
function obiekt_dodaj(kord_galaktyka,kord_uklad,kord_pozycja,typ_obiektu,nazwa)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/dodaj.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "kord_galaktyka="+kord_galaktyka+"&kord_uklad="+kord_uklad+"&kord_pozycja="+kord_pozycja+"&typ_obiektu="+typ_obiektu+"&nazwa="+nazwa,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd dodawania obiektu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd dodawania obiektu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
        
function obiekt_usun(kord_galaktyka,kord_uklad,kord_pozycja,typ_obiektu)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/usun.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "kord_galaktyka="+kord_galaktyka+"&kord_uklad="+kord_uklad+"&kord_pozycja="+kord_pozycja+"&typ_obiektu="+typ_obiektu,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd usuwania obiektu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd usuwania obiektu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
        
function obiekt_zmien_nazwe(kord_galaktyka,kord_uklad,kord_pozycja,typ_obiektu,nazwa)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/zmien_nazwe.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "kord_galaktyka="+kord_galaktyka+"&kord_uklad="+kord_uklad+"&kord_pozycja="+kord_pozycja+"&typ_obiektu="+typ_obiektu+"&nazwa="+nazwa,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd zmieniania nazwy obiektu\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd zmieniania nazwy obiektu"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
function pobierz_liste_obiektow()
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/lista.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "",
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd wyświetlania listy obiektow\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd wyświetlania listy obiektow"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function gracz_aktualizuj_badania(tech_napedu_spalinowego, tech_napedu_impulsowego, tech_napedu_nadprzestrzennego, tech_bojowa, tech_ochronna, tech_opancerzenia)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/aktualizuj_badania.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "tech_napedu_spalinowego="+tech_napedu_spalinowego+"&tech_napedu_impulsowego="+tech_napedu_impulsowego+"&tech_napedu_nadprzestrzennego="+tech_napedu_nadprzestrzennego+"&tech_bojowa="+tech_bojowa+"&tech_ochronna="+tech_ochronna+"&tech_opancerzenia="+tech_opancerzenia,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd aktualizowania badan\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd aktualizowania badan"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function obiekt_aktualizuj_obrone(galaktyka, uklad, pozycja, typ, wr, ll, cl, dg, dj, wp, mp, dp, pr, rm)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/aktualizuj_obrone.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&wr="+wr+"&ll="+ll+"&cl="+cl+"&dg="+dg+"&dj="+dj+"&wp="+wp+"&mp="+mp+"&dp="+dp+"&pr="+pr+"&rm="+rm,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd aktualizowania obrony\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd aktualizowania obrony"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function obiekt_aktualizuj_flote(galaktyka, uklad, pozycja, typ, lm, cm, k, ow, pan, bom, nisz, gs, mt, dt, kol, rec, ss)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/obiekty/aktualizuj_flote.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&lm="+lm+"&cm="+cm+"&k="+k+"&ow="+ow+"&pan="+pan+"&bom="+bom+"&nisz="+nisz+"&gs="+gs+"&mt="+mt+"&dt="+dt+"&kol="+kol+"&rec="+rec+"&ss="+ss,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd aktualizowania floty\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd aktualizowania floty"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
        
function imperium_lista_obiektow(galaktyka, uklad, pozycja, typ, czy_tylko_z_f_wojenna, czy_tylko_z_recyklerami, strona)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/imperium/lista_obiektow.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "galaktyka="+galaktyka+"&uklad="+uklad+"&pozycja="+pozycja+"&typ="+typ+"&czy_tylko_z_f_wojenna="+czy_tylko_z_f_wojenna+"&czy_tylko_z_recyklerami="+czy_tylko_z_recyklerami+"&strona="+strona,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobieranie listy obiektow sojuszniczych\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobieranie listy obiektow sojuszniczych"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
function imperium_dane_obiektu(id_obiektu)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/imperium/dane_obiektu.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_obiektu="+id_obiektu,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobieranie danych o sojuszniczym obiekcie\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobieranie danych o sojuszniczym obiekcie"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}
function imperium_dane_floty_obiektu(id_floty_obiektu)
	{
	var wynik = GM_xmlhttpRequest(
		 {
		 synchronous: true,
		 method: "POST",
		 url: adres_systemu+"/spolecznosc/imperium/dane_floty_obiektu.php",
		 headers:
		 	{
    		"Content-Type": "application/x-www-form-urlencoded"
  			},
		 data: "id_floty_obiektu="+id_floty_obiektu,
		 onload: function(response)
		 	{
			if(response.status != 200)
				{
				zglos_blad(new Error("Błąd pobieranie danych o flocie sojuszniczych obiektow\nresponse.statusText="+response.statusText));
				}
			},
		 onerror: function(response)
		 	{
			zglos_blad(new Error("Błąd pobieranie danych o flocie sojuszniczych obiektow"));
			}
		 }
	)
	return JSON.parse(wynik.responseText.trimLeft());
	}

function silnik_stan_uzytkownika(div_naglowek,div_zawartosc,strona)
	{
	function uzupelnij_selecta(select,lista_options,zaznacz_z_value,czy_niedodawac_wybor)
		{
		if(!czy_niedodawac_wybor)
			{
			select.add(new Option(tlumacz("c7"),"0"),null);
			}
		for(i=0;i<lista_options.length;i++)
			{
			if(Array.prototype.isPrototypeOf(lista_options[i]))
				{
				select.add(new Option(lista_options[i][0],lista_options[i][1],lista_options[i][1]==zaznacz_z_value),null);
				}
			else
				{
				select.add(new Option(lista_options[i],lista_options[i],lista_options[i]==zaznacz_z_value),null);
				}
			}
		}
	function lista_spolecznosci_do_html(lista,zaznacz_z_wartoscia)
		{
		var wynik="<option value=\"0\">"+tlumacz("c7")+"</option>";
		for(i=0;i<lista.length;i++)
			{
			wynik+="<option value=\""+lista[i]+"\""+(lista[i]==zaznacz_z_wartoscia?" selected":"")+">"+lista[i]+"</option>\n";
			}
		return wynik;
		}
	// funkcja już zastapiana przez uzupelnij selekta można chyba usunac poprzednia uzunac czyli uaktualnij_liste_uniwersow
	function uaktualnij_liste_uniwersow(formularz,zaznacz_z_wartoscia)
		{
		//formularz = div.getElementsByTagName("form").namedItem("logowanie")
		lista = pobierz_liste_uniwersow_dla_danej_spolecznosci(formularz.elements.namedItem("spolecznosc").value);
		ile_opcji = formularz.elements.namedItem("uniwersum").length;
		for(i=ile_opcji;i>0;i--)
			{
			formularz.elements.namedItem("uniwersum").remove(i-1);
			}
		if(lista.length != 0)
			{
			for(i=0;i<lista.length;i++)
				{
				formularz.elements.namedItem("uniwersum").add(new Option(lista[i][0],lista[i][1],(lista[i][1]==zaznacz_z_wartoscia?true:false)),null);
				}
			}
		else
			{
			formularz.elements.namedItem("uniwersum").add(new Option(tlumacz("c11"),"0"),null);					
			}
		zdarzenie = document.createEvent('MouseEvents');
		zdarzenie.initEvent('change', true, true);
		formularz.elements.namedItem("uniwersum").dispatchEvent(zdarzenie);
		}
	
	var div_naglowek2 = div_naglowek;
	var div_zawartosc2 = div_zawartosc;
	strony = new Object();
	strony["logowanie"] = new Object();
	strony["logowanie"].naglowek = tlumacz("c1");
	strony["logowanie"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML =
			"<form name=\"logowanie\">\
				<table style=\"width: 100%\">\
					<tr>\
						<td><label for=\"spolecznosc\">"+tlumacz("c6")+"</label></td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"spolecznosc\" id=\"spolecznosc\"></select></td>\
						<td><a href=\"#\" name=\"zglos_spolecznosc\">"+tlumacz("c8")+"</a></td>\
					</tr>\
					<tr>\
						<td><label for=\"uniwersum\">"+tlumacz("c9")+"</label></td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"uniwersum\" id=\"uniwersum\"><option value=\"0\">"+tlumacz("c10")+"</option></select></td>\
						<td><a href=\"#\" name=\"zglos_uniwersum\">"+tlumacz("c12")+"</a></td>\
					</tr>\
					<tr>\
						<td><label for=\"login\">"+tlumacz("c13")+"</label></td>\
						<td><input type=\"text\" name=\"login\" id=\"login\"></td>\
						<td><a href=\"#\" name=\"nowe_konto\">"+tlumacz("c14")+"</a></td>\
					</tr>\
					<tr>\
						<td><label for=\"haslo\">"+tlumacz("c15")+"<label></td>\
						<td><input type=\"password\" name=\"haslo\" id=\"haslo\"></td>\
					</tr>\
				</table>\
				<input type=\"button\" name=\"zaloguj\" value=\""+tlumacz("c16")+"\">\
			</form>\
						";
		if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
			{
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").disabled = true;
			var spolecznosc = spolecznosc_dla_jezyka_i_uniwersum();
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").add(new Option(spolecznosc,spolecznosc,true),null);
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("uniwersum").disabled = true;
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("uniwersum").add(new Option(uniwersum_nazwa,uniwersum,true),null);
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("login").disabled = true;
			div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("login").value = login;
			}
		else
			{
			//dokonczyc to uwzglednic czy dac znacznik "Wybierz"
			uzupelnij_selecta(div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc"),pobierz_liste_spolecznosci());
			}
		div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").addEventListener("change",function(e){uaktualnij_liste_uniwersow(div.getElementsByTagName("form").namedItem("logowanie"),null)},false);
		div.getElementsByTagName("form").namedItem("logowanie").getElementsByTagName("a").namedItem("zglos_spolecznosc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"nowa_spolecznosc")},false);
		div.getElementsByTagName("form").namedItem("logowanie").getElementsByTagName("a").namedItem("zglos_uniwersum").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"nowe_uniwersum")},false);
		div.getElementsByTagName("form").namedItem("logowanie").getElementsByTagName("a").namedItem("nowe_konto").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"nowe_konto")},false);
		div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("haslo").addEventListener("keypress",function(e)
			{
			if(e.type != "keypress" || e.keyCode == e.DOM_VK_RETURN)
				{
				przycisk_zaloguj()
				}
			}
		,false);
		function przycisk_zaloguj()
			{
			if(tablica_zmiennych[uniwersum][login]["autologowanie"])
				{
				tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"] = div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").value;
				tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"] = div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("uniwersum").value;
				tablica_zmiennych[uniwersum][login]["autologowanie_login"] = div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("login").value;
				tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"] = md5(div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("haslo").value);
				GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
				}
			var odpowiedz_z_zalogowania = zaloguj(div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").value,div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("uniwersum").value,div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("login").value,md5(div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("haslo").value));
			switch(odpowiedz_z_zalogowania)
				{
				case 1:		
								silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2);
								break;
				case 0:		
								alert(tlumacz("c59"));
								break;
				case -1:		
								alert(tlumacz("c60"));
								break;
				case -2:		
								alert(tlumacz("c61"));
								break;
				case -3:		
								alert(tlumacz("c62"));
								break;
				default:		zglos_blad(new Error("Nie prawidłowa odpowiedź z zalogowania: "+odpowiedz_z_zalogowania));
				}
			}
		
		div.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("zaloguj").addEventListener("click",przycisk_zaloguj,false);
		return div;
		}
	strony["nowa_spolecznosc"] = new Object();	
	strony["nowa_spolecznosc"].naglowek = tlumacz("c2");		
	strony["nowa_spolecznosc"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML =
			"\
			<form name=\"zglos_spolecznosc\">\
				<label for=\"domena_spolecznosci\">"+tlumacz("c17")+" </label><input name=\"domena_spolecznosci\" id=\"domena_spolecznosci\" value=\"e.g. ogame.org\"> <input type=\"button\" name=\"zglos\" value=\""+tlumacz("c18")+"\">\
			<form><br>\
			<a href=\"#\" name=\"wroc\">"+tlumacz("c19")+"</a>\
			";
		div.getElementsByTagName("form").namedItem("zglos_spolecznosc").elements.namedItem("zglos").addEventListener("click",function(e){zglos_nowa_spolecznosc(div.getElementsByTagName("form").namedItem("zglos_spolecznosc").elements.namedItem("domena_spolecznosci").value)?alert(tlumacz("c20")):alert(tlumacz("c21"))},false);	
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		div.getElementsByTagName("form").namedItem("zglos_spolecznosc").elements.namedItem("domena_spolecznosci").addEventListener("keypress",function(e)
			{
			if(e.type != "keypress" || e.keyCode == e.DOM_VK_RETURN)
				{
				zglos_nowa_spolecznosc(div.getElementsByTagName("form").namedItem("zglos_spolecznosc").elements.namedItem("domena_spolecznosci").value)?alert(tlumacz("c20")):alert(tlumacz("c21"));
				e.preventDefault();
				}
			}
		,false);
		return div;
		}
	strony["nowe_uniwersum"] = new Object();	
	strony["nowe_uniwersum"].naglowek = tlumacz("c3");		
	strony["nowe_uniwersum"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		function zablokuj_odblokuj(div)
			{
			if(div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc").value==0)
				{
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").disabled=true;
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").disabled=true;
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("zglos").disabled=true;
				}
			else
				{
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").disabled=false;
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").disabled=false;
				div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("zglos").disabled=false;				
				}
			}
		var div = document.createElement('div');
		//+lista_spolecznosci_do_html(pobierz_liste_spolecznosci(),(div_zawartosc2.getElementsByTagName("form").namedItem("logowanie")?div_zawartosc2.getElementsByTagName("form").namedItem("logowanie"):div_zawartosc2.getElementsByTagName("form").namedItem("utworz_konto")).elements.namedItem("spolecznosc").value)+
		div.innerHTML =
			"\
			<form name=\"zglos_uniwersum\">\
			<table>\
					<tr>\
						<td>"+tlumacz("c22")+"</td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" id=\"wybor_spolecznosci\" name=\"spolecznosc\" id=\"spolecznosc\"></select></td>\
					</tr>\
		  			<tr>\
						<td><label for=\"nazwa\">"+tlumacz("c23")+"</label></td>\
						<td><input name=\"nazwa\" id=\"nazwa\" value=\"e.g. Andromeda\"></td>\
					</tr>\
					<tr>\
						<td><label for=\"adres\">"+tlumacz("c24")+"</label></td>\
						<td><input name=\"adres\" id=\"adres\" value=\"e.g. uni101.ogame.org\"></td>\
					</tr>\
			</table>\
			<input type=\"button\" name=\"zglos\" value=\""+tlumacz("c25")+"\">\
			</form><br>\
			<a href=\"#\" name=\"wroc\">"+tlumacz("c19")+"</a>\
			";
		uzupelnij_selecta(div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc"),
		pobierz_liste_spolecznosci(),(div_zawartosc2.getElementsByTagName("form").namedItem("logowanie")?div_zawartosc2.getElementsByTagName("form").namedItem("logowanie"):div_zawartosc2.getElementsByTagName("form").namedItem("utworz_konto")).elements.namedItem("spolecznosc").value);
		zablokuj_odblokuj(div);
		if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
			{
			div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc").disabled=true;
                        div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").disabled=true;
                        div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").value=uniwersum_nazwa;
                        div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").disabled=true;
                        div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").value=uniwersum;
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
			}	
		div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc").addEventListener("change",function(e){zablokuj_odblokuj(div)},false);
		div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("zglos").addEventListener("click",function(e){zglos_nowe_uniwersum(div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc").value,div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").value,div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").value)?alert(tlumacz("c26")):alert(tlumacz("c27"))},false);
		div.getElementsByTagName("form").namedItem("zglos_uniwersum").addEventListener("keypress",function(e)
			{
			if(e.type != "keypress" || e.keyCode == e.DOM_VK_RETURN)
				{
				zglos_nowe_uniwersum(div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("spolecznosc").value,div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("nazwa").value,div.getElementsByTagName("form").namedItem("zglos_uniwersum").elements.namedItem("adres").value)?alert(tlumacz("c26")):alert(tlumacz("c27"))
				e.preventDefault();
				}
			}
		,false);
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["nowe_konto"] = new Object();	
	strony["nowe_konto"].naglowek = tlumacz("c4");		
	strony["nowe_konto"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		function zablokuj_odblokuj(div)
			{
			if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum").value==0)
				{
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo_powtorzenie").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email_powtorzenie").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("regulamin").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("utworz_konto").disabled=true;
				div.getElementsByTagName("form").namedItem("utworz_konto").getElementsByTagName("a").namedItem("regulamin_link").removeAttribute("href");
				}
			else
				{
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo_powtorzenie").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email_powtorzenie").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("regulamin").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("utworz_konto").disabled=false;
				div.getElementsByTagName("form").namedItem("utworz_konto").getElementsByTagName("a").namedItem("regulamin_link").href=adres_systemu+"/regulamin.php?spolecznosc="+div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("spolecznosc").value;
				}
			}
		
		function sprawdz_adres_email(adres_email)
			{
			var re = new RegExp("[^@]{1,}[@]{1}[^@.]{1,}[.]{1}[^@]{1,}","gi");
			return re.test(adres_email);
			}
			
		function sprawdz_dane_przed_utworzeniem_konta(div)
			{
			var blad = false;
			if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").value == "")
				{
				blad = true;
				alert(tlumacz("c43"));
				}
			if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").value == "" || div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").value == div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").value)
				{
				blad = true;
				alert(tlumacz("c44"));
				}
			else
				{
  				if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").value != div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo_powtorzenie").value)	
					{
					blad = true;
					alert(tlumacz("c45"));
					}			
				}
			if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").value == "")
				{
				blad = true;
				alert(tlumacz("c46"))
				}
			else
				{
				if(!sprawdz_adres_email(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").value))
					{
					blad = true;
					alert(tlumacz("c47"));
					}
				else
					{
					if(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").value != div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email_powtorzenie").value)	
						{
						blad = true;
						alert(tlumacz("c48"));
						}
					}
				}
			if(!div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("regulamin").checked)
				{
				blad = true;
				alert(tlumacz("c49"));
				}
			if(!blad)
				{
				var odpowiedz_utworzenia_konta = utworz_konto(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("spolecznosc").value,div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum").value,div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").value,div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("haslo").value,div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("email").value,div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("id_w_ogame").value)
				switch(odpowiedz_utworzenia_konta)
					{
					case 1:
								alert(tlumacz("c50"));
								silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2);
								break;
					case 0:
								alert(tlumacz("c51"));
								break;
					case -1:
								alert(tlumacz("c52"));
								break;
					case -2:
								alert(tlumacz("c53"));
								break;
					case -3:
								alert(tlumacz("c54"));
								break;
					case -4:
								alert(tlumacz("c55"));
								break;
					case -5:
								alert(tlumacz("c56"));
								break;
					case -6:
								alert(tlumacz("c57"));
								break;
					case -7:
								alert(tlumacz("c58"));
					default:
								zglos_blad(new Error("Błąd dodawania gracza do Systemu Kopernik\nOdpowiedź serwera: "+odpowiedz_utworzenia_konta));
					}
				}
			}
		var div = document.createElement('div');
		div.innerHTML =
			"<form name=\"utworz_konto\">\
				<table style=\"width: 100%\">\
					<tr>\
						<td><label for=\"spolecznosc\">"+tlumacz("c28")+"</label></td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"spolecznosc\" id=\"spolecznosc\">"+
						lista_spolecznosci_do_html(pobierz_liste_spolecznosci(),div_zawartosc2.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("spolecznosc").value)+
						"</select></td>\
						<td><a href=\"#\" name=\"zglos_spolecznosc\">"+tlumacz("c29")+"</a></td>\
					</tr>\
					<tr>\
						<td><label for=\"uniwersum\">"+tlumacz("c30")+"</label></td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"uniwersum\" id=\"uniwersum\"><option value=\"0\">"+tlumacz("c31")+"</option></select></td>\
						<td><a href=\"#\" name=\"zglos_uniwersum\">"+tlumacz("c32")+"</a></td>\
					</tr>\
					<tr>\
						<td><label for=\"login\">"+tlumacz("c33")+"</label></td>\
						<td><input type=\"text\" name=\"login\" id=\"login\"></td>\
					</tr>\
					<tr>\
						<td><label for=\"haslo\">"+tlumacz("c34")+"<label></td>\
						<td><input type=\"password\" name=\"haslo\" id=\"haslo\"></td>\
						<td rowspan=\"2\">"+tlumacz("c35")+"</td>\
					</tr>\
					<tr>\
						<td><label for=\"haslo_powtorzenie\">"+tlumacz("c36")+"</label></td>\
						<td><input type=\"password\" name=\"haslo_powtorzenie\" id=\"haslo_powtorzenie\"></td>\
					</tr>\
					<tr>\
						<td><label for=\"email\">"+tlumacz("c37")+"</label></td>\
						<td><input type=\"text\" name=\"email\" id=\"email\"></td>\
						<td rowspan=\"2\">"+tlumacz("c38")+"</td>\
					</tr>\
					<tr>\
						<td><label for=\"email_powtorzenie\">"+tlumacz("c39")+"</label></td>\
						<td><input type=\"text\" name=\"email_powtorzenie\" id=\"email_powtorzenie\"></td>\
					</tr>\
					<tr>\
						<td><label for=\"id_w_ogame\">"+tlumacz("c40")+"</label></td>\
						<td><input type=\"text\" name=\"id_w_ogame\" id=\"id_w_ogame\" disabled=\"disabled\" value=\""+id_w_ogame+"\"></td>\
					</tr>\
					<tr>\
						<td><label for=\"regulamin\">"+tlumacz("c41","<a name=\"regulamin_link\"  target=\"_blank\">","</a>")+"</label></td>\
						<td><input type=\"checkbox\" name=\"regulamin\" id=\"regulamin\"></td>\
					</tr>\
				</table>\
				<input type=\"button\" name=\"utworz_konto\" value=\""+tlumacz("c42")+"\">\
			</form><br>\
			<a href=\"#\" name=\"wroc\">"+tlumacz("c19")+"</a>\
						";

		div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("spolecznosc").addEventListener("change",function(e){uaktualnij_liste_uniwersow(div.getElementsByTagName("form").namedItem("utworz_konto"))},false);
		div.getElementsByTagName("form").namedItem("utworz_konto").getElementsByTagName("a").namedItem("zglos_spolecznosc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"nowa_spolecznosc")},false);
		div.getElementsByTagName("form").namedItem("utworz_konto").getElementsByTagName("a").namedItem("zglos_uniwersum").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"nowe_uniwersum")},false);
		
		//uaktualnij_liste_uniwersow(div.getElementsByTagName("form").namedItem("utworz_konto"),div_zawartosc2.getElementsByTagName("form").namedItem("logowanie").elements.namedItem("uniwersum").value);
		uzupelnij_selecta(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum"),pobierz_liste_uniwersow_dla_danej_spolecznosci(div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("spolecznosc").value),(div_zawartosc2.getElementsByTagName("form").namedItem("logowanie")?div_zawartosc2.getElementsByTagName("form").namedItem("logowanie"):div_zawartosc2.getElementsByTagName("form").namedItem("utworz_konto")).elements.namedItem("uniwersum").value);
		
		zablokuj_odblokuj(div);
		if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
			{
			div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("spolecznosc").disabled=true;
			div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum").disabled=true;
			div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum").value=uniwersum;//
			div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").disabled=true;
			div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("login").value=login;
			}
		div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("uniwersum").addEventListener("change",function(e){zablokuj_odblokuj(div)},false);
		
		div.getElementsByTagName("form").namedItem("utworz_konto").elements.namedItem("utworz_konto").addEventListener("click",function(e){sprawdz_dane_przed_utworzeniem_konta(div)},false)
		
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);	
		div.getElementsByTagName("form").namedItem("utworz_konto").addEventListener("keypress",function(e)
			{
			if(e.type != "keypress" || e.keyCode == e.DOM_VK_RETURN)
				{
				sprawdz_dane_przed_utworzeniem_konta(div)
				e.preventDefault();
				}
			}
		,false);
		return div;
		}
	strony["zalogowany"] = new Object();	
	strony["zalogowany"].naglowek = tlumacz("c5");		
	strony["zalogowany"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML =
			"<div id=\"wiadomosc_od_tworcy\"></div>\
			<div id=\"wiadomosc_od_admina_imperium\"></div>\
			<table name=\"zalogowany\" style=\"margin: auto\">\
				<tr>\
					<td>Login:</td>\
					<td></td>\
					<td><a href=\"#\">Edytuj konto</a></td>\
				</tr>\
				<tr>\
					<td>Status:</td>\
					<td></td>\
					<td></td>\
				</tr>\
				<tr style=\"display: none\">\
					<td>Sojusz:</td>\
					<td></td>\
					<td></td>\
				</tr>\
				<tr style=\"display: none\">\
					<td>Dostęp:</td>\
					<td></td>\
					<td></td>\
				</tr>\
				<tr>\
					<td colspan=\"3\"><a href=\"#\">Lista znajomych</a> <a href=\"#\">Wyloguj się</a></td>\
				</tr>\
			</table>\
			";
		var div_wiadomosc_od_tworcy = div.getElementsByTagName("div")[0];
		var div_wiadomosc_od_admina_imperium = div.getElementsByTagName("div")[1];
		var pole_login = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1];
		div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[2].getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"edytuj_konto")},false);
		var pole_status = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1];
		var pole_status_dod = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[2];
		var tr_sojusz = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[2];
		var pole_sojusz = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1];
		var pole_sojusz_dod = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[2];
		var tr_dostep = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[3];
		var pole_dostep = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[1];
		var pole_dostep_dod = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[2];
		var lista_znajomych = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
		lista_znajomych.addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych")},false);
		div.getElementsByTagName("table")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[0].getElementsByTagName("a")[1].addEventListener("click",
		function(e)
			{
			div_naglowek2.parentNode.getElementsByTagName("div").namedItem("nag_dane_sojuszu").style.display="none";
			div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").style.display="none";
			clearInterval(odswiez_shoutbox);
			
			wyloguj();
			tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"] = "";
			tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"] = "";
			tablica_zmiennych[uniwersum][login]["autologowanie_login"] = "";
			tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"] = "";
			GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych));
			silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2);
			}
		,false);
		var dane_zalogowania = pobierz_dane_zalogowania();
		if(dane_zalogowania==null)
			{
			alert("Nie jesteś zalogowany!");
			}
		else
			{
			if(dane_zalogowania.wiadomosc_od_tworcy)
				{
				GM_addStyle("#wiadomosc_od_tworcy {color: #FF0000; border-style:double; border-width: 3px; text-align: center; margin: 3px}");
				div_wiadomosc_od_tworcy.innerHTML = "<b>Wiadomość od twórcy Systemu</b>:<br>"+dane_zalogowania.wiadomosc_od_tworcy;
				}
			if(dane_zalogowania.wiadomosc_od_admina_imperium)
				{
				GM_addStyle("#wiadomosc_od_admina_imperium {color: #FFD400; border-style:double; border-width: 3px; text-align: center; margin: 3px}");
				div_wiadomosc_od_admina_imperium.innerHTML = "<b>Wiadomość od Administratora Imperium</b>:<br>"+dane_zalogowania.wiadomosc_od_admina_imperium;
				}
			else
				{
				GM_addStyle("#wiadomosc_od_admina_imperium { border-style:none; border-width: 0px; text-align: center; margin: 0px}");
				}
			if(dane_zalogowania.ile_zaproszen > 0)
				{
				lista_znajomych.innerHTML = "<span style=\"color:red\">"+lista_znajomych.innerHTML+" ("+dane_zalogowania.ile_zaproszen+")</span>";
				}
			pole_login.innerHTML ="<b>"+ dane_zalogowania.login+"</b>";
			switch(dane_zalogowania.stan)
				{
				case 0:	
							pole_status.innerHTML = "<span style=\"color: orange\">Niepotwierdzony email</span>";
							pole_status_dod.innerHTML = "<a href=\"#\">Wyślij ponownie kod aktywacyjny</a>";
							pole_status_dod.getElementsByTagName("a")[0].addEventListener("click",function(e)
								{
								if(wyslij_ponownie_kod_aktywacyjny())
							  		{
									alert("Wysłano ponownie kod aktywacyjny");
									}
								else
									{
									alert("Błąd wysyłania ponownie kodu aktywacyjnego");
									}
								}
							,false);
							break;
				case 1:	
							pole_status.innerHTML = "<span style=\"color: green\">Aktywny</span>";
                                                        pole_status_dod.innerHTML = "<a href=\"#\">Lista obiektów</a>";
                                                        pole_status_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow")},false);
							tr_sojusz.style.display="table-row";
							if(dane_zalogowania.czy_ma_sojusz)
								{
								pole_sojusz.innerHTML = dane_zalogowania.nazwa_sojuszu;
								if(dane_zalogowania.sojusz_admin)
									{
									pole_sojusz_dod.innerHTML = "<a href=\"#\">Administruj</a>";
									pole_sojusz_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"admin_imperium")},false);					
									}
								else
									{
									pole_sojusz_dod.innerHTML = "<a href=\"#\">Odejdź z sojuszu</a>";
									pole_sojusz_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"odejdz_z_sojuszu")},false);
									}
								tr_dostep.style.display="table-row";
								if(dane_zalogowania.dostep_do_danych)
									{
									pole_dostep.innerHTML = "<span style=\"color:green\">Aktywny</span>";
									pole_dostep_dod.innerHTML = "<a href=\"#\">O Imperium</a> <a href=\"#\">Sojusznicze obiekty</a>";
									pole_dostep_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"o_imperium")},false);
                                                                        pole_dostep_dod.getElementsByTagName("a")[1].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"sojusznicze_obiekty")},false);
									//
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("nag_dane_sojuszu").style.display="block";
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("nag_dane_sojuszu").innerHTML="Shoutbox sojuszu";
									GM_addStyle("#shoutbox tr:nth-child(even){background-color:#262626}");
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").style.display="block";
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").innerHTML=
										"\
										<div style=\"max-height: 200px; overflow-y: auto; width:100% \" ><table id=\"shoutbox\"><tr><td>Data</td><td>Login</td><td style=\"width: 100%\">Wiadomość</td></tr></table></div>\
										<span><input style=\"width: 100%\" maxlength=\"255\"> <input type=\"button\" value=\"Wyślij\"> <input type=\"button\" value=\"Odśwież\"></span>\
										";
									var id_ostatniej_wiadomosci=0;
									function sprawdz_wiadomosci()
										{
										if(semafor_shoutbox)
											{
											semafor_shoutbox=0;
											var tabela = div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("table")[0];
											var wiadomosci = pobierz_wiadomosci_shoutbox(id_ostatniej_wiadomosci);
											switch(wiadomosci)
												{
												case null:
															clearInterval(odswiez_shoutbox);
															alert("Jesteś wylogowany");
															breakl
												case -1:
															clearInterval(odswiez_shoutbox);
															alert("Nie istnieje gracz z twoim id");
															break;
												case -2:
															clearInterval(odswiez_shoutbox);
															alert("Niemasz aktywnego adresu email");
															break
												case -3:
															clearInterval(odswiez_shoutbox);
															alert("Masz bana");
															break;
												case -4:
															clearInterval(odswiez_shoutbox);
															alert("Nie masz sojuszu");
															break;
												case -5:
															clearInterval(odswiez_shoutbox);
															alert("Nie masz dostępu to danych sojuszu")
															break;
												default:
															if(Array.prototype.isPrototypeOf(wiadomosci))
																{
																if(wiadomosci.length >0 && id_ostatniej_wiadomosci)
																	{
																	div_naglowek2.parentNode.getElementsByTagName("div").namedItem("nag_dane_sojuszu").style.backgroundColor="red";
																	}
																for(i=0;i<wiadomosci.length;i++)
																	{
																	var data = new Date(wiadomosci[i].data);
																	var tr = tabela.insertRow(-1);
																	tr.innerHTML="<td>"+data.toLocaleTimeString()+"</td><td><a href=\"#\">"+((wiadomosci[i].czy_admin)?"<b>":"")+wiadomosci[i].login+((wiadomosci[i].czy_admin)?"</b>":"")+"</a>:</td><td style=\"text-align: left\">"+wiadomosci[i].wiadomosc+"</td>";
																	tr.getElementsByTagName("td")[1].getElementsByTagName("a")[0].addEventListener("click",function(e)
																		{
																		tabela.parentNode.nextElementSibling.getElementsByTagName("input")[0].focus();
																		tabela.parentNode.nextElementSibling.getElementsByTagName("input")[0].value="@"+e.target.innerHTML+": ";
																		}
																	,false);
																	id_ostatniej_wiadomosci = wiadomosci[i].id;
																	}
																tabela.parentNode.scrollTop=tabela.parentNode.scrollHeight;
																}
															else
																{
																clearInterval(odswiez_shoutbox);
																zglos_blad(new Error("Błąd odpowiedzi wiadomosci shoutbox\nOdpowiedź serwera: "+JSON.stringify(wiadomosci)))
																}							
												}
											semafor_shoutbox=1;
											}
										}
										
									function wyslij_wiadomosc(e)
										{
										if(e.type != "keypress" || e.keyCode == e.DOM_VK_RETURN)
											{
											wyslij_wiadomosc_shoutbox(div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[0].value);
											div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[0].value="";
											div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[0].focus();
											sprawdz_wiadomosci();				
											}

										}
										
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[1].addEventListener("click",wyslij_wiadomosc,false);
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[0].addEventListener("keypress",wyslij_wiadomosc,false);
									div_naglowek2.parentNode.getElementsByTagName("div").namedItem("zaw_dane_sojuszu").getElementsByTagName("input")[2].addEventListener("click",sprawdz_wiadomosci,false);
									sprawdz_wiadomosci();
									
									odswiez_shoutbox = window.setInterval(sprawdz_wiadomosci, 10000);
									window.setTimeout(sprawdz_wiadomosci,500);
									}
								else
									{
									pole_dostep.innerHTML = "<span style=\"color:red\">Nieaktywny</span>";
									pole_dostep_dod.innerHTML = "<a href=\"#\">Aktywuj dostęp</a>";
									pole_dostep_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"aktywuj_dostep")},false);
									}
								}
							else
								{
								pole_sojusz.innerHTML = "Brak sojuszu";
								pole_sojusz_dod.innerHTML = "<a href=\"#\">Załóż sojusz</a> <a href=\"#\">Dołącz do sojuszu</a>";
								pole_sojusz_dod.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"zaloz_sojusz")},false);
								pole_sojusz_dod.getElementsByTagName("a")[1].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"dolacz_do_sojuszu")},false);
								}
							break;
				case -1:	
							pole_status.innerHTML = "<span style=\"color: red\">Ban</span>";
							pole_status_dod.innerHTML = "<a href=\"mailto:ogame@kopernik.idl.pl?subject=["+uniwersum+"] ["+login+"] Dlaczego Ban?&body=Dlaczego Ban?%0A["+uniwersum+"]%0A["+login+"]\">Dlaczego?</a>";
							break;
				default:
							zglos_blad(new Error("Błąd stanu zalogowania\nOdpowiedź serwera: "+dane_zalogowania.stan));
				}
			}

		return div;
		}
	strony["edytuj_konto"] = new Object();	
	strony["edytuj_konto"].naglowek = "Edytuj konto";
	strony["edytuj_konto"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML = 
			"<form name=\"edytuj_konto\">\
				<table style=\"margin: auto\">\
					<tr>\
						<td>Język komunikatów</td>\
						<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"lista_jezykow_komunikatow\"><select></td>\
					</tr>\
					<tr>\
						<td>Napęd spalinowy:</td>\
						<td><input name=\"tech_spal\" size=\"1\" maxlength=\"3\"></td>\
					</tr>\
					<tr>\
						<td>Napęd impulsywny:</td>\
						<td><input name=\"tech_impul\" size=\"1\" maxlength=\"3\"></td>\
					</tr>\
					<tr>\
						<td>Napęd nadprzestrzenny:</td>\
						<td><input name=\"tech_nadprz\" size=\"1\" maxlength=\"3\"><td>\
					</tr>\
					<tr>\
						<td>Technologia bojowa:</td>\
						<td><input name=\"tech_boj\" size=\"1\" maxlength=\"3\"></td>\
					</tr>\
					<tr>\
						<td>Technologia ochronna:</td>\
						<td><input name=\"tech_och\" size=\"1\" maxlength=\"3\"></td>\
					</tr>\
					<tr>\
						<td>Opanczerzenie:</td>\
						<td><input name=\"tech_opan\" size=\"1\" maxlength=\"3\"></td>\
					</tr>\
				</table>\
				<input type=\"button\" name=\"aktualizuj_dane\" value=\"Aktulizuj dane\">\
			</form>\
			<a href=\"#\">Wróć</a>\
			";
		var dane_edytuj_konto = pobierz_dane_edytuj_konto();
		tym = Array();	
		for(var i=0;i<dane_edytuj_konto.lista_jezykow.length;i++)
			{
			var kod_jezyka = dane_edytuj_konto.lista_jezykow[i];
			tym[i] = new Array(tlumaczenie[kod_jezyka]["jezyk"],kod_jezyka);
			}
		dane_edytuj_konto.lista_jezykow=tym;
		
		uzupelnij_selecta(div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("lista_jezykow_komunikatow"),dane_edytuj_konto.lista_jezykow,dane_edytuj_konto.zaznaczony_jezyk,true);
		div.getElementsByTagName("a")[0].addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_spal").value = dane_edytuj_konto.tech_spal;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_impul").value = dane_edytuj_konto.tech_impul;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_nadprz").value = dane_edytuj_konto.tech_nadprz;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_boj").value = dane_edytuj_konto.tech_boj;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_och").value = dane_edytuj_konto.tech_och;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_opan").value = dane_edytuj_konto.tech_opan;
		div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("aktualizuj_dane").addEventListener("click",function(e)
			{
			var odpowiedz = aktualizuj_dane_edytuj_konto(div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("lista_jezykow_komunikatow").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_spal").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_impul").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_nadprz").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_boj").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_och").value,div.getElementsByTagName("form").namedItem("edytuj_konto").elements.namedItem("tech_opan").value);
			if(odpowiedz)
				{
				alert("Dane zostały zatkualizowane");
				}
			else
				{
				alert("Błąd przy aktualizacji danych");
				}
			},
		false);
		//function aktualizuj_dane_edytuj_konto(kod_jezyka,tech_naped_spalinowy,tech_naped_impulsywny,tech_naped_nadprzestrzeny,tech_bojowa,tech_och,tech_opan)
		
		return div;
		}
	strony["lista_znajomych"] = new Object();	
	strony["lista_znajomych"].naglowek = "Lista znajomych";
	function uzupelnij_tabele(tabela,lista_znajomych)
		{
		if(lista_znajomych.length==0)
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td colspan=\"3\">Brak znajomych</td>";
			}
		else
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td>ID</td><td>Login</td><td>Sojusz</td>";
			for(i=0;i<lista_znajomych.length;i++)
				{
				var tr = tabela.insertRow(-1);
				tr.innerHTML = "<td>"+lista_znajomych[i].id+"</td><td>"+lista_znajomych[i].login+"</td><td>"+lista_znajomych[i].sojusz+"</td><td><a href=\"#\">Usuń</a></td>";
				tr.getElementsByTagName("a")[0].addEventListener("click",function(e)
					{
					var id = e.target.parentNode.parentNode.childNodes[0].innerHTML;
					usun_znajomego(id);silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych");
					}
				,false);
			}

			}
		}
	function uzupelnij_tabele_wyszukiwania(tabela,lista_wyszukiwania)
		{
		if(lista_wyszukiwania.length==0)
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td colspan=\"3\">Nie znaleziono</td>";
			}
		else
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td>ID</td><td>Login</td><td>Sojusz</td>";
			for(i=0;i<lista_wyszukiwania.length;i++)
				{
				var tr = tabela.insertRow(-1);
				tr.innerHTML = "<td>"+lista_wyszukiwania[i].id+"</td><td>"+lista_wyszukiwania[i].login+"</td><td>"+lista_wyszukiwania[i].sojusz+"</td><td><a href=\"#\">Dodaj</a></td>";
				tr.getElementsByTagName("a")[0].addEventListener("click",function(e)
					{
					var id = e.target.parentNode.parentNode.childNodes[0].innerHTML;
					dodaj_znajomego(id);
					silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych");
					}
				,false);
				}
			}
		}
	function uzupelnij_tabele_zaproszen_twoich(tabela,lista_wyszukiwania)
		{
		if(lista_wyszukiwania.length==0)
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td colspan=\"3\">Nie znaleziono</td>";
			}
		else
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td>ID</td><td>Login</td><td>Sojusz</td>";
			for(i=0;i<lista_wyszukiwania.length;i++)
				{
				var tr = tabela.insertRow(-1);
				tr.innerHTML = "<td>"+lista_wyszukiwania[i].id+"</td><td>"+lista_wyszukiwania[i].login+"</td><td>"+lista_wyszukiwania[i].sojusz+"</td><td><a href=\"#\">Odwołaj</a></td>";
				var id_gracza = lista_wyszukiwania[i].id;
				tr.getElementsByTagName("a")[0].addEventListener("click",function(e)
					{
					var id = e.target.parentNode.parentNode.childNodes[0].innerHTML;
					odwolaj_zaproszenie_dla_znajomego(id);
					silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych");
					}
				,false);
				}
			}
		}
	function uzupelnij_tabele_zaproszen(tabela,lista_wyszukiwania)
		{
		if(lista_wyszukiwania.length==0)
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td colspan=\"3\">Nie znaleziono</td>";
			}
		else
			{
			var tr = tabela.insertRow(-1);
			tr.innerHTML = "<td>ID</td><td>Login</td><td>Sojusz</td>";
			for(i=0;i<lista_wyszukiwania.length;i++)
				{
				var tr = tabela.insertRow(-1);
				tr.innerHTML = "<td>"+lista_wyszukiwania[i].id+"</td><td>"+lista_wyszukiwania[i].login+"</td><td>"+lista_wyszukiwania[i].sojusz+"</td><td><a href=\"#\">Akceptuj</a> <a href=\"#\">Odrzóć</a></td>";
				var id_gracza = lista_wyszukiwania[i].id;
				tr.getElementsByTagName("a")[0].addEventListener("click",function(e)
					{
					var id = e.target.parentNode.parentNode.childNodes[0].innerHTML;
					zaakceptuj_zaproszenie_znajomego(id);
					silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych");
					}
				,false);
				tr.getElementsByTagName("a")[1].addEventListener("click",function(e)
					{
					odrzoc_zaproszenie_znajomego(id_gracza);
					silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_znajomych");
					}
				,false);
				}
			}
		}
	strony["lista_znajomych"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML = 
			"<div class=\"naglowek\">Zaproszenia</div>\
			<div class=\"zawartosc\">\
				<table name=\"lista_zaproszen\" style=\"margin: auto\">\
				</table>\
			</div>\
			<div class=\"naglowek\">Lista znajomych</div>\
			<div class=\"zawartosc\">\
				<table name=\"lista_znajomych\" style=\"margin: auto\">\
				</table>\
			</div>\
			<div class=\"naglowek\">Zaproś znajomego</div>\
			<div class=\"zawartosc\">Login: <input name=\"login\">\
				<input type=\"button\" name=\"szukaj\" value=\"Szukaj\">\
				<table name=\"lista_wyszukiwania\" style=\"margin: auto\"></table>\
				</div>\
			<div class=\"naglowek\">Zaproszenia twoje</div>\
			<div class=\"zawartosc\">\
				<table name=\"lista_zaproszen_twoich\" style=\"margin: auto\"></table>\
			</div>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
			
		var lista_zaproszen = pobierz_liste_zaproszen();
		uzupelnij_tabele_zaproszen(div.getElementsByTagName("table").namedItem("lista_zaproszen"),lista_zaproszen);	
			
		var lista_znajomych = pobierz_liste_znajomych();
		uzupelnij_tabele(div.getElementsByTagName("table").namedItem("lista_znajomych"),lista_znajomych);
		
		

		div.getElementsByTagName("input").namedItem("szukaj").addEventListener("click",function(e)
			{
			lista_wyszukiwan = wyszukaj_znajomego(div.getElementsByTagName("input").namedItem("login").value);
			while(div.getElementsByTagName("table").namedItem("lista_wyszukiwania").rows.length!=0)
				{
				div.getElementsByTagName("table").namedItem("lista_wyszukiwania").deleteRow(-1);
				}
			
			uzupelnij_tabele_wyszukiwania(div.getElementsByTagName("table").namedItem("lista_wyszukiwania"),lista_wyszukiwan);
			}
		,false);
		var lista_zaproszen_twoich = pobierz_liste_zaproszen_twoich();
		uzupelnij_tabele_zaproszen_twoich(div.getElementsByTagName("table").namedItem("lista_zaproszen_twoich"),lista_zaproszen_twoich);
		
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["zaloz_sojusz"] = new Object();	
	strony["zaloz_sojusz"].naglowek = "Załóż sojusz";
	strony["zaloz_sojusz"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML=
			"Nazwa sojuszu: <input name=\"nazwa_sojuszu\"> <input type=\"button\" value=\"Załóż sojusz\"><br>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			"
		if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
			{
			div.getElementsByTagName("input")[0].value = unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-alliance-tag") ? unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-alliance-tag").content : "";
			}
		div.getElementsByTagName("input")[1].addEventListener("click",function(e)
			{
			var odpowiedz = zaloz_sojusz(div.getElementsByTagName("input")[0].value);
			switch (odpowiedz)
				{
				case 1:
								alert("Sojusz założony");
								silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2);
								break;
			   case 0:
								alert("Nieznany bład");
					         break;
				case -1:
								alert("Masz już sojusz! Wyjdź z niego aby założyć nowy!");
								break;
				case -2:
								alert("Już istnieje sojusz z taką nazwą!");
								break;
				default:
								zglos_blad(new Error("Błąd zakladania sojuszu\nOdpowiedź serwera: "+odpowiedz));
				}
			}
		,false);
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}	
	strony["dolacz_do_sojuszu"] = new Object();	
	strony["dolacz_do_sojuszu"].naglowek = "Dołącz do sojuszu";
	strony["dolacz_do_sojuszu"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		function blokuj_odblokuj_sojusz()
			{
			var co = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("select")[0].value;
			var ile = div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("select")[0].length;
			for(i=0;i<ile;i++)
				{
				div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].remove(0);
				}
			if(co=="0")
				{
				div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].add(new Option("-","0"),null)
				div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].selectedIndex=0;
                                // nie moze byc po wszystkim bo niedziala change na disable selekcie
                                zdarzenie = document.createEvent('MouseEvents');
                                zdarzenie.initEvent('change', true, true);
                                div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].dispatchEvent(zdarzenie);
				div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].disabled = true;
				}
			else
				{
				div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].disabled = false;
				uzupelnij_selecta(div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0],pobierz_liste_sojuszy_imperia(div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("select")[0].value));
				zdarzenie = document.createEvent('MouseEvents');
        			zdarzenie.initEvent('change', true, true);
                		div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].dispatchEvent(zdarzenie);
                                }
			}
		function blokuj_odblokuj_dolacz()
			{
			if(div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].value=="0")
				{
				div.getElementsByTagName("input")[0].disabled=true;
				}
			else
				{
				div.getElementsByTagName("input")[0].disabled=false;
				}
			}
		var div = document.createElement('div');
		div.innerHTML =
			"<table style=\"margin: auto\">\
				<tr>\
					<td>Imperium</td>\
					<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"imperium\"></select></td>\
				</tr>\
				<tr>\
					<td>Sojusz</td>\
					<td><select class=\"dropdownInitialized\" style=\"visibility: visible\" name=\"sojusz\"></select></td>\
				</tr>\
			</table>\
			<input type=\"button\" value=\"Dołącz\"><br>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
		uzupelnij_selecta(div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("select")[0],pobierz_liste_imperiow());
		div.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].getElementsByTagName("select")[0].addEventListener("change",blokuj_odblokuj_sojusz,false);
		blokuj_odblokuj_sojusz();
		div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].addEventListener("change",blokuj_odblokuj_dolacz,false);
		blokuj_odblokuj_dolacz();
		div.getElementsByTagName("input")[0].addEventListener("click",function(e)
			{
			var odpowiedz = dolacz_do_sojuszu(div.getElementsByTagName("table")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].getElementsByTagName("select")[0].value);
			switch(odpowiedz)
				{
				case 1:
							alert("Dołączyłeś do sojuszu");
							silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2);
							break;
				case 0:	
							alert("Nieznany błąd");
							break;
				case -1:	
							alert("Jesteś już w sojuszu! Najpierw odejdź z swojego sojuszu");
							break;
				case -2:
							alert("Wybrałes sojusz który nie jest w twoim uniwersie!");
				default:
							zglos_blad(new Error("Błąd dołączania do sojuszu\nOdpowiedź serwera: "+odpowiedz));
				}
			}
		,false);
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["odejdz_z_sojuszu"] = new Object();	
	strony["odejdz_z_sojuszu"].naglowek = "Odejdź z sojuszu";
	strony["odejdz_z_sojuszu"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML=
			"Czy na pewno chcesz odejść z sojuszu? <a href=\"#\">Odejdź</a><br>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
		div.getElementsByTagName("a")[0].addEventListener("click",function(e)
			{
			var odpowiedz = odejdz_z_sojuszu();
			switch(odpowiedz)
				{
				case 1:
							alert('Odeszłeś z sojuszu');
							break;
				case 0:
							alert('Nieznany błąd');
							break;
				case -1:
							alert('Nie możesz odeść jak nie masz sojuszu');
							break;
				default:
							zglos_blad(new Error("Błąd odejścia z sojuszu\nOdpowiedź serwera: "+odpowiedz));
				}
			silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)
			}
		,false);
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["admin_imperium"] = new Object();	
	strony["admin_imperium"].naglowek = "Panel Administracyjny";
	strony["admin_imperium"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		var div = document.createElement('div');
		div.innerHTML = 
			"\
			Planowana funkcjionalność:\
			<ul>\
				<li>Lista sojuszników</li>\
				<li>deaktywacja dostępu</li>\
				<li>Wywalanie z sojuszu</li>\
				<li>Ustawianie wiadomości od admina</li>\
				<li>Dodawanie Administratora</li>\
				<li>Zrzekanie się tytułu admina</li>\
				<li>Fuzje z innymi sojuszami z systemem akceptacji od każdego admina imperium</li>\
				<li>Opuszczenie fuzji</li>\
				<li>Rozwiązywanie sojuszu</li>\
			</ul>\
			Zostanie wprowadzona póżniej. Teraz funkcjionalność jest dostępna poprzez email do twórcy <a href=\"mailto:ogame@kopernik.idl.pl\">ogame@kopernik.idl.pl</a><br>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["aktywuj_dostep"] = new Object();	
	strony["aktywuj_dostep"].naglowek = "Aktywuj dostep do danych sojuszu";
	strony["aktywuj_dostep"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		function uzuperlnij_tabele(tabela,dane)
			{
			id_gracza = dane.id_gracza;
			for(i=0;i<dane.lista_administratorow.length;i++)
				{
				var tr = tabela.insertRow(-1);
				tr.innerHTML="<td>"+dane.lista_administratorow[i].login+"</td><td><a href=\"#\">Poproś o aktywację</a><input type=\"hidden\" value=\""+dane.lista_administratorow[i].id_w_ogame+"\"></td>";
				tr.getElementsByTagName("td")[1].getElementsByTagName("a")[0].addEventListener("click",function(e)
					{
					var id_w_ogame = e.target.parentNode.childNodes[1].value;
			  		var formularz = unsafeWindow.document.createElement("form");
					formularz.method="post";
					formularz.action="index.php?page=messages&to="+id_w_ogame
					formularz.innerHTML="<input type=\"hidden\" name=\"betreff\" value=\"Aktywacja konta w Koperniku\"><input type=\"hidden\" name=\"text\" value=\"{SK=akt}"+id_gracza+"{/SK}\nProszę o aktywację moje ID = "+id_gracza+" \">";
					unsafeWindow.document.documentElement.getElementsByTagName("body")[0].appendChild(formularz);
					formularz.submit();
			  		}
			  	,false);
				
				}
			
			}
		var div = document.createElement('div');
		div.innerHTML=
			"Aktywację twojego konta może wykonać Administrator Imperium.\
			<table style=\"margin: auto\">\
				<tr>\
					<td colspan=\"2\">Lista Administratorów</td>\
				</tr>\
				<tr>\
					<td>Login</td>\
					<td>Akcja</td>\
				</tr>\
			</table>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
		lista_adminow = pobierz_liste_administratorow_imperium();
		if(Array.prototype.isPrototypeOf(lista_adminow.lista_administratorow))
			{
			uzuperlnij_tabele(div.getElementsByTagName("table")[0],lista_adminow);
			}
		else
			{
			if(lista_adminow==-1)
				{
				alert("Nie masz sojuszu");
				}
			else
				{
				alert("Jesteś nie zalogowany");
				}
			
			}
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
	strony["o_imperium"] = new Object();	
	strony["o_imperium"].naglowek = "Informacje o Imperium";
	strony["o_imperium"].zawartosc = function(div_naglowek,div_zawartosc)
		{
		function uzuperlnij_tabele(tabela,dane)
			{
			var imperium = tabela.getElementsByTagName("tr")[0].getElementsByTagName("td")[1];
			switch(dane)
				{
				case null:
								alert("Jesteś wylogowany z Systemu Kopernik");
								break;
				case -1:
								alert("Nie masz sojuszu");
								break;
				case -2:
								alert("Nie masz dostępu do danych sojuszu");
								break;
				default:
								if(Object.prototype.isPrototypeOf(dane))
									{
									imperium.innerHTML = dane.nazwa_imperium;
									for(i=0;i<dane.lista_graczy.length;i++)
										{
										var tr = tabela.insertRow(-1);
										tr.innerHTML="<td>"+dane.lista_graczy[i].sojusz+"</td><td>"+dane.lista_graczy[i].login+" <a class=\"tooltip overlay js_hideTipOnMobile writemessage\" title=\"\" data-overlay-title=\"Napisz wiadomość\" href=\"http://"+location.hostname+"/game/index.php?page=writemessage&to="+dane.lista_graczy[i].id_w_ogame+"&ajax=1\" ><img src=\"http://gf1.geo.gfsrv.net/cdn93/ac6622806f1ff33319a6cf1256dd6d.gif\" alt=\"Napisz wiadomość\"></a></td><td>"+((dane.lista_graczy[i].czy_admin)?"Tak":"Nie")+"</td>"; //
										
                                                                                }
									}
								else
									{
									zglos_blad(new Error("Błąd pobierania informacji o imperium\nOdpowiedź serwera: "+dane));
									}
				}
			}
		
		var div = document.createElement('div');
		div.innerHTML=
			"\
			<table style=\"margin: auto\">\
				<tr>\
					<td>Imperium:</td>\
					<td colspan=\"2\"></td>\
				</tr>\
				<tr>\
					<td>Sojusz</td>\
					<td>Login</td>\
					<td>Czy Admin</td>\
				</tr>\
			</table>\
			<a name=\"wroc\" href=\"#\">Wróć</a>\
			";
		uzuperlnij_tabele(div.getElementsByTagName("table")[0],pobierz_informacje_o_imperium());
		div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
		return div;
		}
        strony["lista_obiektow"] = new Object();
        strony["lista_obiektow"].naglowek = "Lista obiektów";
	strony["lista_obiektow"].zawartosc = function(div_naglowek,div_zawartosc)
            {
            var div = document.createElement('div');
            div.innerHTML=
                    "\
                    <h2>Lista obiektów <a href=\"#\">[Odśwież]</a></h2>\
                    <table style=\"margin: auto\">\
                        <tr>\
                            <td>Nazwa planety</td>\
                            <td>Kordy</td>\
                            <td>Nazwa księżyca</td>\
                            <td colspan=\"2\">Akcja</td>\
                        </tr>\
                    </table>\
                    <table style=\"margin: auto\">\
                        <tr>\
                        <td colspan=\"3\">Dodaj planetę</td>\
                        </tr>\
                        <tr>\
                            <td>Nazwa</td>\
                            <td>Kordy</td>\
                        </tr>\
                        <tr>\
                            <td><input type=\"text\"></td>\
                            <td><input type=\"text\" value=\"[x:y:z]\" size=\"13\"></td>\
                            <td><a href=\"#\">Dodaj</a></td>\
                        </tr>\
                    </table>\n\
                    <div></div>\
                    <a name=\"wroc\" href=\"#\">Wróć</a>\
                    ";
            var input_nazwa_nowej_planety = div.getElementsByTagName("input")[0];
            var input_kordy_nowej_planety = div.getElementsByTagName("input")[1];
            var div_do_wybierania_obiektow = div.getElementsByTagName("div")[0];
            function odswiez_liste_planet()
                {
                var odpowiedz = pobierz_liste_obiektow();
                switch(odpowiedz)
                    {
                    case null:
                                alert('Jesteś niezalogowany');
                                break;
                    case -1:
                                alert('Nie ma gracza o podanym id');
                                break;
                    case -2:
                                alert("Nie masz aktywnego konta (aktywacja email)");
                                break;
                    case -3:
                                alert('Masz Bana');
                                break;
                    default:
                                if(Array.prototype.isPrototypeOf(odpowiedz))
                                    {
                                    tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"] = odpowiedz;
                                    GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                    silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");   
                                    }
                                else
                                    {
                                    zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_lista\nOdpowiedz: "+odpowiedz));
                                    break;   
                                    }
                    }
                
                }
            div.getElementsByTagName("a")[0].addEventListener("click",odswiez_liste_planet,false);
            
            function dodaj_planete()
                {
                var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                if(rx_kord.test(input_kordy_nowej_planety.value))
                    {
                    var kordy = rx_kord.exec(input_kordy_nowej_planety.value);
                    var odpowiedz = obiekt_dodaj(kordy[1],kordy[2],kordy[3],'Planeta',input_nazwa_nowej_planety.value);
                    switch(odpowiedz)
                        {
			case true:
                                    tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].push(new Object(
                                    {
                                    "kordy": input_kordy_nowej_planety.value,
                                    "nazwa": input_nazwa_nowej_planety.value,
                                    "czy_ma_ksiezyc": false,
                                    "nazwa_ksiezyca": ""
                                    }
                                    ));
                                    GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                    alert('Dodano obiekt!');
                                    silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                    break;
			case -1:
                                    break;
			case -2:
                                    alert("Masz nieaktywny adres email");
                                    break;
			case -3:
                                    alert("Masz BANA");
                                    break;
			case -4:
                                    tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].push(new Object(
                                    {
                                    "kordy": input_kordy_nowej_planety.value,
                                    "nazwa": input_nazwa_nowej_planety.value,
                                    "czy_ma_ksiezyc": false,
                                    "nazwa_ksiezyca": ""
                                    }
                                    ));
                                    GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                    alert('Dodano obiekt!');
                                    silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                    break;
			case -5:
                                    alert("W Systemie jest zarejestrowany obiekt na tych kordach i typie przez innego gracza!\nKonflikt został zgłoszony do Twórcy Systemu!");
                                    break;
                        default:
                                    zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_dodaj\nOdpowiedz: "+odpowiedz));
                                    break;
			}
                    }
                else
                    {
                    alert('Podałeś kordy nie pasujące do wzorca [x:y:z]');
                    }
                }
            div.getElementsByTagName("a")[1].addEventListener("click",dodaj_planete,false);
            
            var tabela = div.getElementsByTagName("table")[0];
            for(var i=0; i < tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].length; i++ )
                {
                var wiersz = tabela.insertRow(-1);
                wiersz.setAttribute("id-wiersza",i+1);
                wiersz.innerHTML = "<td>"+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].nazwa+"</td><td>"+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].kordy+"</td><td>"+(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].czy_ma_ksiezyc?tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].nazwa_ksiezyca:"brak księżyca")+"</td><td>&nbsp;<a href=\"#\">Zmien nazwe</a> <a href=\"#\">Usuń</a>&nbsp;</td><td>&nbsp;"+(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].czy_ma_ksiezyc?"<a href=\"#\">Zmień nazwę księżyca</a> <a href=\"#\">Usuń&nbsp;księżyc</a>":"<a href=\"#\">Dodaj księżyc</a>")+"</td>";

                function zmien_nazwe_planety(e)
                    {
                    var id_wiersza = e.target.parentNode.parentNode.getAttribute("id-wiersza");
                    var wiersz = tabela.rows[id_wiersza];
                    var nazwa = wiersz.cells[0].innerHTML;
                    var kordy = wiersz.cells[1].innerHTML;
                    var nowa_nazwa;
                    if(nowa_nazwa = prompt("Podaj nową nazwę planety '"+nazwa+"' "+kordy))
                        {
                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                        kordy = rx_kord.exec(kordy);
                        odpowiedz = obiekt_zmien_nazwe(kordy[1],kordy[2],kordy[3],'Planeta',nowa_nazwa);
                        switch(odpowiedz)
                            {
                            case true:
                                        var planeta = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_wiersza-1];
                                        planeta.nazwa=nowa_nazwa;
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Nazwę zmieniono!');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -1:
                                        break;
                            case -2:
                            		alert("Masz nieaktywny adres email");
                            		break;
                            case -3:
                                	alert("Masz BANA");
                            		break;
                            case -4:
                                        alert("Nie można zmienić nazwy planety która nie została zarejestrowana w Systemie Kopernik");
                                        break;
                            case -5:
                                        alert("Nie można zmienić nazwy nie twojej planety!");
                                        break;
                            default:
                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_zmien_nazwe\nOdpowiedz: "+odpowiedz));
                                        break;
                            }
                        }
                    }
                wiersz.getElementsByTagName("a")[0].addEventListener("click",zmien_nazwe_planety,false)
                function usun_planete(e)
                    {
                    var id_wiersza = e.target.parentNode.parentNode.getAttribute("id-wiersza");
                    var wiersz = tabela.rows[id_wiersza];
                    var nazwa = wiersz.cells[0].innerHTML;
                    var kordy = wiersz.cells[1].innerHTML;
                    if(confirm("Czy na pewno chcesz skasować planete '"+nazwa+"' "+kordy+" w Systemie Kopernik"))
                        {
                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                        kordy = rx_kord.exec(kordy);
                        odpowiedz = obiekt_usun(kordy[1],kordy[2],kordy[3],'Planeta');
                        switch(odpowiedz)
                            {
                            case true:
                                        tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].splice(id_wiersza-1,1);
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Obiekt usunięty');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -1:
                            		break;
                            case -2:
                            		alert("Masz nieaktywny adres email");
                            		break;
                            case -3:
                            		alert("Masz BANA");
                            		break;
                            case -4:
                                        alert("Nie można usunąć Planety która nie została zarejestrowana w Systemie Kopernik");
                                        break;
                            case -5:
                                        alert("Nie można usunąć nie twojej planety!");
                                        break;
                            default:
                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_usun\nOdpowiedz: "+odpowiedz));
                                        break;
                            }
                        }
                    }
                wiersz.getElementsByTagName("a")[1].addEventListener("click",usun_planete,false)
                function zmien_nazwe_ksiezyca(e)
                    {
                    var id_wiersza = e.target.parentNode.parentNode.getAttribute("id-wiersza");
                    var wiersz = tabela.rows[id_wiersza];
                    var nazwa = wiersz.cells[2].innerHTML;
                    var kordy = wiersz.cells[1].innerHTML;
                    var nowa_nazwa;
                    if(nowa_nazwa = prompt("Podaj nową nazwę księzyca '"+nazwa+"' "+kordy))
                        {
                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                        kordy = rx_kord.exec(kordy);
                        odpowiedz = obiekt_zmien_nazwe(kordy[1],kordy[2],kordy[3],'Ksiezyc',nowa_nazwa);
                        switch(odpowiedz)
                            {
                            case true:
                                        var planeta = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_wiersza-1];
                                        planeta.nazwa_ksiezyca=nowa_nazwa;
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Nazwę zmieniono!');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -1:
                                        break;
                            case -2:
                            		alert("Masz nieaktywny adres email");
                            		break;
                            case -3:
                                	alert("Masz BANA");
                            		break;
                            case -4:
                                        alert("Nie można zmienić nazwy ksiezyca który nie został zarejestrowany w Systemie Kopernik");
                                        break;
                            case -5:
                                        alert("Nie można zmienić nazwy nie twojego księzyca!");
                                        break;
                            default:
                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_zmien_nazwe\nOdpowiedz: "+odpowiedz));
                                        break;
                            }
                        }
                    }
                function usun_ksiezyc(e)
                    {
                    var id_wiersza = e.target.parentNode.parentNode.getAttribute("id-wiersza");
                    var wiersz = tabela.rows[id_wiersza];
                    var nazwa = wiersz.cells[2].innerHTML;
                    var kordy = wiersz.cells[1].innerHTML;
                    if(confirm("Czy na pewno chcesz skasować Księżyc '"+nazwa+"' "+kordy+" w Systemie Kopernik"))
                        {
                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                        kordy = rx_kord.exec(kordy);
                        odpowiedz = obiekt_usun(kordy[1],kordy[2],kordy[3],'Ksiezyc');
                        switch(odpowiedz)
                            {
                            case true:
                                        var planeta = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_wiersza-1];
                                        planeta.czy_ma_ksiezyc = false;
                                        planeta.nazwa_ksiezyca = "";
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Obiekt usunięty');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -1:
                            		break;
                            case -2:
                            		alert("Masz nieaktywny adres email");
                            		break;
                            case -3:
                            		alert("Masz BANA");
                            		break;
                            case -4:
                                        alert("Nie można usunąć Księzyca który nie został zarejestrowany w Systemie Kopernik");
                                        break;
                            case -5:
                                        alert("Nie można usunąć nie twojego księżyca!");
                                        break;
                            default:
                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_usun\nOdpowiedz: "+odpowiedz));
                                        break;
                            }
                        }
                    }
                function dodaj_ksiezyc(e)
                    {
                    var id_wiersza = e.target.parentNode.parentNode.getAttribute("id-wiersza");
                    var wiersz = tabela.rows[id_wiersza];
                    var nazwa = wiersz.cells[0].innerHTML;
                    var kordy = wiersz.cells[1].innerHTML;
                    var nowa_ksiezyca;
                    if(nowa_ksiezyca = prompt("Wpisz nazwę nowego księżyca przy planecie '"+nazwa+"' "+kordy+" dodawanego do Systemiu Kopernik"))
                        {
                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                        kordy = rx_kord.exec(kordy);
                        odpowiedz = obiekt_dodaj(kordy[1],kordy[2],kordy[3],'Ksiezyc',nowa_ksiezyca);
                        switch(odpowiedz)
                            {
                            case true:
                                        var planeta = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_wiersza-1];
                                        planeta.czy_ma_ksiezyc = true;
                                        planeta.nazwa_ksiezyca = nowa_ksiezyca;
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Obiekt dodany');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -1:
                            		break;
                            case -2:
                            		alert("Masz nieaktywny adres email");
                            		break;
                            case -3:
                            		alert("Masz BANA");
                            		break;
                            case -4:
                                        var planeta = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_wiersza-1];
                                        planeta.czy_ma_ksiezyc = true;
                                        planeta.nazwa_ksiezyca = nowa_ksiezyca;
                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                        alert('Obiekt dodany');
                                        silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2,"lista_obiektow");
                                        break;
                            case -5:
                            		alert("W Systemie jest zarejestrowany obiekt na tych kordach i typie przez innego gracza!\nKonflikt został zgłoszony do Twórcy Systemu!");
                            		break;
                            case -6:
                            		alert("Niemożesz dodać księżyca do niezarejestrowanej planety w Systemie Kopernik");
                            		break;
                            case -7:
                            		alert("Niemożesz dodać księżyca do nieswojej planety w Systemie Kopernik");
                            		break;
                            default:
                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_dodaj\nOdpowiedz: "+odpowiedz));
                                        break;
                            }
                        }
                    }
                if(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].czy_ma_ksiezyc)
                    {
                    wiersz.getElementsByTagName("a")[2].addEventListener("click",zmien_nazwe_ksiezyca,false)
                    wiersz.getElementsByTagName("a")[3].addEventListener("click",usun_ksiezyc,false)
                    }
                else
                    {
                    wiersz.getElementsByTagName("a")[2].addEventListener("click",dodaj_ksiezyc,false)
                    }
                }
            if(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].length)
                {
                if(tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer == null)
                    {
                    tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = 0;
                    tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Planeta';
                    }
                if(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer] === undefined)
                    {
                    tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = 0;
                    tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Planeta';   
                    }
                GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
                    {
                    div_do_wybierania_obiektow.innerHTML = "Wybrany obiekt to: "+(tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Ksiezyc'?'Księżyc':'Planeta')+" "+(tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Ksiezyc'?tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].nazwa_ksiezyca:tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].nazwa)+" "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].kordy;
                    }
                else
                    {
                    div_do_wybierania_obiektow.innerHTML = "Wybierz obiek: <select class=\"dropdownInitialized\" name=\"wybierz_obiekt\" style=\"visibility: visible\"></select>";  
                    var select = div_do_wybierania_obiektow.childNodes[1];
                    var i=0;
                    for(i;i<tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].length;i++)
                        {
                        var opcja = new Option('Planeta '+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].nazwa+" "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].kordy,i,((tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer == i) && (tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Planeta')?true:false));
                        opcja.setAttribute('typ','Planeta'); 
                        select.add(opcja,null);
                        if(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].czy_ma_ksiezyc)
                            {
                            var opcja = new Option('Księżyc '+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].nazwa_ksiezyca+" "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][i].kordy,i,((tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer == i) && (tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Ksiezyc')?true:false));
                            opcja.setAttribute('typ','Ksiezyc'); 
                            select.add(opcja,null);
                            }
                        }
                    function zmien_wybrany_obiekt()
                        {
                        if(select.value >= 0 && select.value < tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].length)
                            {
                            tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = select.value;
                            if(select.options[select.selectedIndex].getAttribute('typ') == 'Ksiezyc')
                                {
                                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Ksiezyc';
                                }
                            else
                                {
                                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Planeta';
                                }
                            }
                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                        //alert('a='+tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer+' b='+tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ);
                        }
                    select.addEventListener('change',zmien_wybrany_obiekt,false);   
                    }
                }
            else
                {
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = null;
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = null;
                GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                div_do_wybierania_obiektow.innerHTML = "Musisz dodać co najmniej jeden obiekt aby móc wybierać obiekty.";
                }
            
            div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
            return div; 
            }
        strony["sojusznicze_obiekty"] = new Object();
        strony["sojusznicze_obiekty"].naglowek = "Sojusznicze obiekty";
	strony["sojusznicze_obiekty"].zawartosc = function(div_naglowek,div_zawartosc)
            {
            var div = document.createElement('div');
            if(tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer == null || tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer] == undefined || (tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Ksiezyc' && tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].czy_ma_ksiezyc == false) )
                {
                div.innerHTML=
                "\
                <p>Aby móc przeglądać sojusznicze obiekty musisz posiadać co najmniej jeden obiekt!</p>\
                <a name=\"wroc\" href=\"#\">Wróć</a>\
                ";
                div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);
                }
            else
                {  
                div.innerHTML=
                "\
                <div style=\"margin: auto\">\
                </div>\
                <table style=\"margin: auto\">\
                    <tr>\
                        <td colspan=\"9\">Wyszukiwanie sojuszniczych obiektow najblizej <span></span></td>\
                    </tr>\
                    <tr>\
                        <td colspan=\"7\">Tylko z flota wojenną</td>\
                        <td><input type=\"checkbox\" name=\"flota_wojenna\"></td>\
                        <td rowspan=\"2\"><a name=\"filtruj\" href=\"#\">Filtruj</a></td>\
                    </tr>\
                    <tr>\
                        <td colspan=\"7\">Tylko z recyklerami</td>\
                        <td><input type=\"checkbox\" name=\"recyklery\"></td>\
                    </tr>\
                    <tr>\
                        <td>Typ</td>\
                        <td>Nazwa</td>\
                        <td>Kto</td>\
                        <td>Login</td>\
                        <td>Ile REC</td>\
                        <td>F. wojenna</td>\
                        <td>Czas lotu najszybszych</td>\
                        <td>Odleglość</td>\
                        <td>Akcja</td>\
                    </tr>\
                </table>\
                <a name=\"wroc\" href=\"#\">Wróć</a>\
                ";
                var div_dane_obiektu = div.getElementsByTagName("div")[0];
                var tabela = div.getElementsByTagName("table")[0];
                var sortowanie_do = div.getElementsByTagName("span")[0];
                var tylko_f_wojenna = div.getElementsByTagName("input").namedItem("flota_wojenna");
                var tylko_recyklery = div.getElementsByTagName("input").namedItem("recyklery");
                if(tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ == 'Ksiezyc')
                    {
                    sortowanie_do.innerHTML = "Księżyca "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].nazwa_ksiezyca+" "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].kordy
                    }
                else
                    {
                    sortowanie_do.innerHTML = "Planety "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].nazwa+" "+tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].kordy
                    }
                
                function filtruj()
                    {
                    uzupelnij_tabele_danymi(tylko_f_wojenna.checked,tylko_recyklery.checked,0);
                    }
                div.getElementsByTagName("a").namedItem("filtruj").addEventListener("click",filtruj,false);
                
                function szczegoly_obiektu(e)
                    {
                    function szczegoly_obiektu_po_id(id_obiektu)
                        {
                        function wstaw_dane_szczegolowe_obiektu(dane)
                            { 
                            function usun_jeden_wpis_szczegolow_obiektu(e)
                                {
                                e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
                                }
                            var tabela_z_danymi_obiektu = document.createElement("table");
                            tabela_z_danymi_obiektu.style.margin = "auto";
                            tabela_z_danymi_obiektu.style.marginBottom = "10px";
                            var tr1 = tabela_z_danymi_obiektu.insertRow(-1);
                            tr1.innerHTML = "<td colspan=\"9\">Stan obiektu z "+dane.czas_aktualizacji_obrony+"</td><td><a name=\"usun_szczegoly_obiektu\" href=\"#\">usuń</a></td>";
                            tr1.getElementsByTagName("a").namedItem("usun_szczegoly_obiektu").addEventListener("click",usun_jeden_wpis_szczegolow_obiektu,false);
                            var tr2 = tabela_z_danymi_obiektu.insertRow(-1);
                            tr2.innerHTML = "<td colspan=\"10\">"+(dane.typ == 'Ksiezyc'?'Ksiezyc':'Planeta')+" "+dane.nazwa+" ["+dane.galaktyka+":"+dane.uklad+":"+dane.pozycja+"]</td>";
                            if(dane.typ == 'Ksiezyc')
                                {
                                var tr3 = tabela_z_danymi_obiektu.insertRow(-1);
                                tr3.innerHTML = "<td colspan=\"3\">Falanga Czujników</td><td colspan=\"2\">"+(dane.falanga)+"</td><td colspan=\"3\">Teleporter</td><td colspan=\"2\">"+(dane.teleporter?'<span style=\"color: green\">TAK</span>':'<span style=\"color: red\">NIE</span>')+"</td>";
                                if(dane.teleporter)
                                    {
                                    function przygotuj_wyliczanke_ksiezycow(lista)
                                        {
                                        if(lista.length)
                                            {
                                            var wynik = "<a id_obiektu=\""+lista[0].id+"\" href=\"#\">"+lista[0].nazwa+" ["+lista[0].galaktyka+":"+lista[0].uklad+":"+lista[0].pozycja+"]</a>";
                                            var i;
                                            for(i=1;i<lista.length;i++)
                                                {
                                                wynik += ", <a id_obiektu=\""+lista[i].id+"\" href=\"#\">"+lista[i].nazwa+" ["+lista[i].galaktyka+":"+lista[i].uklad+":"+lista[i].pozycja+"]</a>";
                                                }
                                            return wynik;
                                            }
                                        else
                                            {
                                            return 'Brak';
                                            }
                                        }
                                    function dodaj_obiekt_z_szybkiego_dostepu(e)
                                        {
                                        var id_obiektu = e.target.getAttribute('id_obiektu') * 1;
                                        szczegoly_obiektu_po_id(id_obiektu);
                                        }
                                    var wyliczanka_ksiezycow = przygotuj_wyliczanke_ksiezycow(odpowiedz.teleporter_gdzie);
                                    var tr4 = tabela_z_danymi_obiektu.insertRow(-1); 
                                    tr4.innerHTML = "<td colspan=\"10\">Szybki dostęp: "+wyliczanka_ksiezycow+"</td>";
                                    var i;
                                    for(i=0;i<tr4.getElementsByTagName("a").length;i++)
                                        {
                                        tr4.getElementsByTagName("a")[i].addEventListener("click",dodaj_obiekt_z_szybkiego_dostepu,false);
                                        }
                                    }
                                }
                            var tr5 = tabela_z_danymi_obiektu.insertRow(-1);
                            tr5.innerHTML = "<td>WR</td><td>LL</td><td>CL</td><td>DG</td><td>DJ</td><td>WP</td><td>MP</td><td>DP</td><td>PR</td><td>RM</td>";
                            var tr6 = tabela_z_danymi_obiektu.insertRow(-1);
                            tr6.innerHTML = "<td>"+dane.wr+"</td><td>"+dane.ll+"</td><td>"+dane.cl+"</td><td>"+dane.dg+"</td><td>"+dane.dj+"</td><td>"+dane.wp+"</td><td>"+dane.mp+"</td><td>"+dane.dp+"</td><td>"+dane.pr+"</td><td>"+dane.rm+"</td>";
                            var tr7 = tabela_z_danymi_obiektu.insertRow(-1);
                            var td_dane_floty = tr7.insertCell(-1);
                            td_dane_floty.colSpan=10;
                            function szczegoly_floty_obiektu_po_id(id_floty_obiektu)
                                {
                                function wstaw_dane_szczegolowe_floty_obiektu(dane)
                                    {
                                    function zmien_flote_obiektu(e)
                                        {
                                        var id_floty_obiektu = e.target.getAttribute('id_floty_obiektu') * 1;
                                        szczegoly_floty_obiektu_po_id(id_floty_obiektu);
                                        }
                                    var tabela_z_danymi_floty_obiektu = document.createElement("table");
                                    tabela_z_danymi_floty_obiektu.style.margin = "auto";
                                    var tr1 = tabela_z_danymi_floty_obiektu.insertRow(-1);
                                    var td1 = tr1.insertCell(-1);
                                    td1.colSpan = 3;
                                    if(dane.nastepne_id_floty_obiektu != null)
                                        {
                                        td1.innerHTML = "<a name=\"nastepna_flota\" id_floty_obiektu=\""+dane.nastepne_id_floty_obiektu+"\" href=\"#\">Następny</a>";
                                        var a1 = td1.getElementsByTagName("a").namedItem("nastepna_flota");
                                        a1.addEventListener("click",zmien_flote_obiektu,false);
                                        }
                                    var td2 = tr1.insertCell(-1);
                                    td2.colSpan = 7;
                                    td2.innerHTML ="Stan floty z "+dane.czas_aktualizacji_floty;
                                    var td3 = tr1.insertCell(-1);
                                    td3.colSpan = 3;
                                    if(dane.poprzednie_id_floty_obiektu != null)
                                        {
                                        td3.innerHTML = "<a name=\"poprzednia_flota\" id_floty_obiektu=\""+dane.poprzednie_id_floty_obiektu+"\" href=\"#\">Poprzedni</a>";
                                        var a2 = td3.getElementsByTagName("a").namedItem("poprzednia_flota");
                                        a2.addEventListener("click",zmien_flote_obiektu,false);
                                        }                                   
                                    var tr2 = tabela_z_danymi_floty_obiektu.insertRow(-1);
                                    tr2.innerHTML = "<td>LM</td><td>CM</td><td>K</td><td>OW</td><td>PAN</td><td>BOM</td><td>NISZ</td><td>GS</td><td>MT</td><td>DT</td><td>KOL</td><td>REC</td><td>SS</td>";
                                    var tr3 = tabela_z_danymi_floty_obiektu.insertRow(-1);
                                    tr3.innerHTML = "<td>"+dane.lm+"</td><td>"+dane.cm+"</td><td>"+dane.k+"</td><td>"+dane.ow+"</td><td>"+dane.pan+"</td><td>"+dane.bom+"</td><td>"+dane.nisz+"</td><td>"+dane.gs+"</td><td>"+dane.mt+"</td><td>"+dane.dt+"</td><td>"+dane.kol+"</td><td>"+dane.rec+"</td><td>"+dane.ss+"</td>";
                                    if(td_dane_floty.childNodes.length)
                                        {
                                        td_dane_floty.replaceChild(tabela_z_danymi_floty_obiektu,td_dane_floty.childNodes[0]);   
                                        }
                                    else
                                        {
                                        td_dane_floty.appendChild(tabela_z_danymi_floty_obiektu);
                                        }
                                    }
                                
                                var odpowiedz = imperium_dane_floty_obiektu(id_floty_obiektu)
                                switch(odpowiedz)
                                    {
                                    case null:
                                                alert('Jesteś niezalogowany');
                                                break;
                                    case -1:
                                                break;
                                    case -2:
                                                alert("Masz nieaktywny adres email");
                                                break;
                                    case -3:
                                                alert("Masz BANA");
                                                break;
                                    case -4:
                                                alert("Obiekt nie nalezy do graczy twojego imperium czy znajomego");
                                                break;
                                    default:
                                                if(Object.prototype.isPrototypeOf(odpowiedz))
                                                    {
                                                    wstaw_dane_szczegolowe_floty_obiektu(odpowiedz);
                                                    }
                                                else
                                                    {
                                                    zglos_blad(new Error("Błąd odpowiedzi funkcji imperium_dane_floty_obiektu\nOdpowiedz: "+odpowiedz));
                                                    }
                                                break;
                                    }
                                }
                            szczegoly_floty_obiektu_po_id(dane.id_floty_obiektu);
                            div_dane_obiektu.appendChild(tabela_z_danymi_obiektu);
                            }
                        var odpowiedz = imperium_dane_obiektu(id_obiektu);
                        switch(odpowiedz)
                            {
                            case null:
                                        alert('Jesteś niezalogowany');
                                        break;
                            case -1:
					break;
                            case -2:
                                        alert("Masz nieaktywny adres email");
                                	break;
                            case -3:
					alert("Masz BANA");
					break;
                            case -4:
                                        alert("Obiekt już nieistnieje");
                                        break;
                            case -5:
                                        alert("Obiekt nie nalezy do graczy twojego imperium czy znajomego");
                                        break;
                            default:
                                        if(Object.prototype.isPrototypeOf(odpowiedz))
                                            {
                                            wstaw_dane_szczegolowe_obiektu(odpowiedz);
                                            }
                                        else
                                            {
                                            zglos_blad(new Error("Błąd odpowiedzi funkcji imperium_dane_obiektu\nOdpowiedz: "+odpowiedz));
                                            }
                                        break;
                            }
                        }
                    var id_obiektu = e.target.parentNode.parentNode.getAttribute("id_obiektu");
                    szczegoly_obiektu_po_id(id_obiektu);
                    }
                function uzupelnij_tabele_danymi(tylko_wojenna, tylko_rec, numer_strony)
                    {
                    //alert("a="+tylko_wojenna+"b="+tylko_rec);
                    function usun_stare_dane()
                        {
                        var i;
                        var ilosc_wierszy = tabela.rows.length;
                        for(i=4;i<ilosc_wierszy;i++)
                            {
                            tabela.deleteRow(-1);
                            }
                        }
                    function wstaw_dane(dane, tylko_wojenna, tylko_rec, numer_strony)
                        {
                        var i;
                        var ile_na_stronie = 10;
                        for(i=0;i<dane.length;i++)
                            {
                            if( (!tylko_wojenna || dane[i].f_wojenna == true) && (!tylko_rec || dane[i].ile_rec > 0) )
                                {
                                var nowt_tr = tabela.insertRow(-1);
                                nowt_tr.setAttribute('id_obiektu',dane[i].id) 
                                nowt_tr.innerHTML = "<td>"+(dane[i].typ == 'Ksiezyc'?'Księżyc':'Planeta')+"</td>";
                                nowt_tr.innerHTML += "<td>"+dane[i].nazwa+" ["+dane[i].galaktyka+":"+dane[i].uklad+":"+dane[i].pozycja+"]</td>";
                                nowt_tr.innerHTML += "<td>"+(dane[i].kto=="S"?'<span style=\"color: green\" title="Sojusz">S</span>':(dane[i].kto=="I"?'<span style=\"color: orange\" title="Imperium">I</span>':'<span style=\"color: red\" title="Znajomy">Z</span>'))+"</td>";
                                nowt_tr.innerHTML += "<td>"+dane[i].login+" <a class=\"tooltip overlay js_hideTipOnMobile writemessage\" title=\"\" data-overlay-title=\"Napisz wiadomość\" href=\"http://"+location.hostname+"/game/index.php?page=writemessage&to="+dane[i].id_w_ogame+"&ajax=1\" ><img src=\"http://gf1.geo.gfsrv.net/cdn93/ac6622806f1ff33319a6cf1256dd6d.gif\" alt=\"Napisz wiadomość\"></a></td>";
                                nowt_tr.innerHTML += "<td><span style=\"color: "+(dane[i].ile_rec > 0?'green':'red')+"\">"+dane[i].ile_rec+"</span></td>";
                                if(dane[i].f_wojenna == true)
                                    {
                                    nowt_tr.innerHTML += "<td><span style=\"color: green\">TAK</span></td>";
                                    //alert(dane[i].lot_naj);
                                    //var data = new Date("PT"+dane[i].lot_naj);
                                    //nowt_tr.innerHTML += "<td>"+data.toLocaleTimeString()+"</td>";
                                    nowt_tr.innerHTML += "<td>"+dane[i].lot_naj+"</td>";
                                    }
                                else
                                    {
                                    nowt_tr.innerHTML += "<td><span style=\"color: red\">NIE</span></td>";
                                    nowt_tr.innerHTML += "<td></td>";
                                    }
                                nowt_tr.innerHTML += "<td>"+dane[i].odleglosc+"</td>";
                                nowt_tr.innerHTML += "<td><a name=\"szczegoly_obiektu\" href=\"#\">Szczegóły</a></td>";
                                nowt_tr.getElementsByTagName("a").namedItem("szczegoly_obiektu").addEventListener("click",szczegoly_obiektu,false);
                                }
                            }
                        var stopka = tabela.createTFoot();
                        var wiersz_stopki = stopka.insertRow(0);
                        var poprzedni=wiersz_stopki.insertCell(-1);
                        poprzedni.colSpan=4;
                        poprzedni.align = "left";
                        var wypelniacz=wiersz_stopki.insertCell(-1);
                        var nastepny=wiersz_stopki.insertCell(-1);
                        nastepny.colSpan=4;
                        nastepny.align = "right";
                        if(numer_strony != 0)
                            {
                            poprzedni.innerHTML = "<a href=\"#\">Poprzednia strona</a>";
                            poprzedni.getElementsByTagName("a")[0].addEventListener("click",function(e){uzupelnij_tabele_danymi(tylko_wojenna, tylko_rec, numer_strony-1)},false);
                            }
                        if(i >= ile_na_stronie)
                            {
                            nastepny.innerHTML = "<a href=\"#\">Następna strona</a>";
                            nastepny.getElementsByTagName("a")[0].addEventListener("click",function(e){uzupelnij_tabele_danymi(tylko_wojenna, tylko_rec, numer_strony+1)},false);
                            }
                        }
                    var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
                    var kordy = rx_kord.exec(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer].kordy);
                    var galaktyka = kordy[1];
                    var uklad = kordy[2];
                    var pozycja = kordy[3];
                    var typ = tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ;
                    var odpowiedz = imperium_lista_obiektow(galaktyka, uklad, pozycja, typ, tylko_wojenna, tylko_rec, numer_strony);
                    
                    switch(odpowiedz)
                        {
                        case null:
                                        alert('Jesteś niezalogowany');
                                        break;
                        case -1:
					break;
                        case -2:
                                        alert("Masz nieaktywny adres email");
                                	break;
                        case -3:
					alert("Masz BANA");
					break;
                        case -4:
                                        alert("Nie można wykorzystać do sortowania obiektu który nie został zarejestrowany w Systemie Kopernik");
                                        break;
                        case -5:
                                        alert("Nie można wykorzystać do sortowania nie twojego obiektu!");
                                        break;
                        default:
                                        if(Array.prototype.isPrototypeOf(odpowiedz))
                                            {
                                            usun_stare_dane();
                                            wstaw_dane(odpowiedz, tylko_wojenna, tylko_rec, numer_strony);
                                            }
                                        else
                                            {
                                            zglos_blad(new Error("Błąd odpowiedzi funkcji imperium_lista_obiektow\nOdpowiedz: "+odpowiedz));
                                            }
                                        break;
                        }
                    }
                var numer_strony = 0;
                uzupelnij_tabele_danymi(false, false, numer_strony);
                div.getElementsByTagName("a").namedItem("wroc").addEventListener("click",function(e){silnik_stan_uzytkownika(div_naglowek2,div_zawartosc2)},false);    
                }
            return div;
            }
	switch(strona)
		{
		case "nowa_spolecznosc":
		case "nowe_uniwersum":
		case "nowe_konto":
										var strona = strony[strona];
										div_naglowek.innerHTML = strona.naglowek;
										if(div_zawartosc.firstChild != null)
											{
											div_zawartosc.replaceChild(strona.zawartosc(),div_zawartosc.firstChild);
											}
										else
											{
											div_zawartosc.appendChild(strona.zawartosc());
											}
										break;
		default:
										if(czy_zalogowany())
											{
                                                                                        document.getElementById("przycisk_systemu").childNodes[0].style.color="GreenYellow";
                                                                                        // sprawdzenie planet przeniesione do normalne okno()
											//sprawdz_liste_planet();
											switch(strona)
												{
												case "edytuj_konto":
																				var strona = strony["edytuj_konto"];
															  					break;
												case "lista_znajomych":
																				var strona = strony["lista_znajomych"];
															  					break;
												case "zaloz_sojusz":
																				var strona = strony["zaloz_sojusz"];
															  					break;
												case "dolacz_do_sojuszu":
																				var strona = strony["dolacz_do_sojuszu"];
															  					break;
												case "odejdz_z_sojuszu":
																				var strona = strony["odejdz_z_sojuszu"];
															  					break;
												case "admin_imperium":
																				var strona = strony["admin_imperium"];
															  					break;
												case "aktywuj_dostep":
																				var strona = strony["aktywuj_dostep"];
															  					break;
												case "o_imperium":
																				var strona = strony["o_imperium"];
															  					break;
                                                                                                case "lista_obiektow":
                                                                                                                                                                var strona = strony["lista_obiektow"];
                                                                                                                                                                break;
                                                                                                case "sojusznicze_obiekty":
                                                                                                                                                                var strona = strony["sojusznicze_obiekty"];
                                                                                                                                                                break;
												default:
																			var strona = strony["zalogowany"];
												}
											}
										else
											{
											if(tablica_zmiennych[uniwersum][login]["autologowanie"] && zaloguj(tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"],tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"],tablica_zmiennych[uniwersum][login]["autologowanie_login"],tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"])==1)
												{
                                                                                                document.getElementById("przycisk_systemu").childNodes[0].style.color="GreenYellow";
                                                                                                // sprawdzenie planet przeniesione do normalne okno()
												//sprawdz_liste_planet();
												var strona = strony["zalogowany"];
												}
											else
												{
                                                                                                document.getElementById("przycisk_systemu").childNodes[0].style.color="Red";
										  		var strona = strony["logowanie"];
												}
											}
										div_naglowek.innerHTML = strona.naglowek;
										if(div_zawartosc.firstChild != null)
											{
											div_zawartosc.replaceChild(strona.zawartosc(),div_zawartosc.firstChild);
											}
										else
											{
											div_zawartosc.appendChild(strona.zawartosc());
											}
										break;
									
		}
	}
        
function wykrywaj_okna_pierwszego_planu(zdarzenie)
    {
    if(zdarzenie.relatedNode.tagName == 'DIV' && (zdarzenie.relatedNode.className == "overlayDiv ui-dialog-content ui-widget-content")|| zdarzenie.relatedNode.className == "overlayDiv phalanx ui-dialog-content ui-widget-content" || zdarzenie.relatedNode.className == "overlayDiv buddies ui-dialog-content ui-widget-content")
        {
        switch(zdarzenie.relatedNode.getAttribute('data-page'))
            {
            case 'showmessage':
                                sprawdz_wiadomosc(zdarzenie.relatedNode);
                                break;
            case 'writemessage':
                                break;
            case 'buddies':
                                break;
            case 'missileattacklayer':
                                break;
            case 'notices': // narazie nie podpiete bo trzeba klase dodac jak do falang
                                break;
            case 'search':
                                break;
            case 'techtree':
                                break;
            case 'combatreport':
                                break;
            case 'phalanx':
                                break;
            case 'jumpgatelayer':
                                break;
            default:
                                zglos_blad(new Error("Wykryto nowy typ okna pierwszego planu\nTyp: "+zdarzenie.relatedNode.getAttribute('data-page')));
                                break;
            }
        }
    
    }
unsafeWindow.document.body.addEventListener('DOMNodeInserted',wykrywaj_okna_pierwszego_planu,false);
// funkcja sprawdzaj_czy_pyta miala sluzyc do przekazywania danych z zapytan GM_XHR przez zmienna 
//globalna jednak lepszy sposob zostal opisany ponizej jak cos to fun sprawdz wiadmosc jest 
// zakomentowany fragment do dzialania z ta metodą
/*
function sprawdzaj_czy_pyta()
    {
        if(pytanie != undefined)
            {
            odpowiedz = pobierz_informacje_o_aktywacji(pytanie);
            pytanie = undefined;
            }
    }
setInterval(sprawdzaj_czy_pyta,1000);
*/

/* WAŻNA SPRAWA
 * Nalzey pamietac o tym że jak tworzymy funkcję która podpinamu do zdarzenia ktore uruchamia docelowa strona 
 * to ta funkcja działa w srodowisku strony (DOM, widoczne bledy w konsoli) a nie greasemonkey
 *  i nie ma dostepu do funki GM_* czyli tez GM_xmlhttpRequest 
 *  niestety nie mozna wtedy wywolac funkcji bedacej w greasemonkey, uruchomi sie ale nadal jest w srodowisku DOM
 *  aby powrocic do GRaseMonkey to nalezy uzyc setTimeout(function(){fun(arg1,arg2,arg3)},0);
 * jednakze biezacy program niebedzie mogl otrzymac rezultatu funkcji taki trzeba ustawic z greasemonkey
 */
function uzupelnij_wiadomosc_danymi(kod,id,komunikat_zwrotny)
    {
    switch(kod)
        {
        case 'akt':
                    odpowiedz = pobierz_informacje_o_aktywacji(id);
                    if(odpowiedz == null)
                        {
                        komunikat_zwrotny.innerHTML = "Jesteś niezalogowany w Systemie Kopernik";
                        }
                    else
                        {
                        if(odpowiedz == -1)
                            {
                            komunikat_zwrotny.innerHTML = "Nie masz uprawnień Adminstratora Imperium aby móc dokonać aktywacji!!!";   
                            }
                        else
                            {
                            switch(odpowiedz.stan)
                                {
                                case -1:
                                        komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już zostało przyjęte do sojuszu.";
                                        break;
                                case 0:
                                        komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już nieubiega się o przyjęcie do sojuszu.";
                                        break;
                                case 1:
                                        komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" prosi o aktywację i dostęp do danych Imperium!<br><a href=\"#\">Aktywuj</a><br><br><a href=\"#\">Odrzóc propozycję przyjęcia</a>";
                                        komunikat_zwrotny.getElementsByTagName("a")[0].addEventListener("click",function(e)
                                            {
                                            var odpowiedz = aktywuj_dostep_do_danych_sojuszu(id);
                                            switch(odpowiedz)
                                                {
                                                case 1:
                                                        alert("Zaaktywowano konto! Gracz już ma dostęp do danych!");
                                                        break;
                                                case 0:
                                                        alert("Nieznany błąd");
                                                        break;
                                                case -1:
                                                        alert("Nie masz uprawnień Administratora Imperium")
                                                        break;
                                                case -2:
                                                        alert("Administrator Imperium niemoze wykonać aktywacji graczowi poza swoim Imperium");
                                                        break;
                                                case -3:
                                                        alert("Gracz juz otrzymal dostep do danych Imperium");
                                                        break;
                                                case null:
                                                        alert("Jesteś niezalogowany w Systemie Kopernik");
                                                        break;
                                                default: 
                                                        zglos_blad(new Error("Błąd odpowiedzi aktywuj dostep\nOdpowiedź serwera: "+wynik[1]));
                                                        break;
                                                }
                                            }
                                        ,false);
                                        komunikat_zwrotny.getElementsByTagName("a")[1].addEventListener("click",function(e)
                                            {
                                            var odpowiedz = odrzuc_propozycje_przyjecia(id);
                                            switch(odpowiedz)
                                                {
                                                case 1:
                                                        alert("Odrzuciłeś propozycję wstąpienia gracza do Imperium");
                                                        break;
                                                case 0:
                                                        alert("Nieznany błąd");
                                                        break;
                                                case -1:
                                                        alert("Nie masz uprawnień Administratora Imperium")
                                                        break;
                                                case -2:
                                                        alert("Administrator Imperium niemoze wykonać odrzucenia propozycji graczowi poza swoim Imperium");
                                                        break;
                                                case -3:
                                                        alert("Gracz juz otrzymal dostep do danych Imperium");
                                                        break;
                                                case null:
                                                        alert("Jesteś niezalogowany w Systemie Kopernik");
                                                        break;
                                                default: 
                                                        zglos_blad(new Error("Błąd odpowiedzi odrzucania propozycji przyjecia\nOdpowiedź serwera: "+wynik[1]));
                                                        break;
                                                }
                                            }
                                        ,false);
                                        break;
                                default:
                                        zglos_blad(new Error("Błąd atrybutu tagu SK\nAtrybut: "+wynik[1]));
                                        break;
                                }
                            }
                        }                            
        }
    }
	
function sprawdz_wiadomosc(div_z_wiadomoscia)
	{
	if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
		{
		var wiadomosc = div_z_wiadomoscia.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[4];
                if(wiadomosc.className == "textWrapperSmall") // sprawdzenie czy jest zdefiniowane jeżeli nie to niejest to wiadomosc miedzy graczami
			{
                        var lista_wiadomosci = wiadomosc.getElementsByTagName("div")[0].getElementsByTagName("div");
                        var rx1 = new RegExp('\\{SK=(.*)\\}(.*)\\{/SK\\}');
                        var i;
                        for(i=0;i<lista_wiadomosci.length;i++)
                            {
                            if(lista_wiadomosci[i].className == "other newMessage" || lista_wiadomosci[i].className == "other")
                                {
                                if(rx1.test(lista_wiadomosci[i].innerHTML))
                                    {
                                    var komunikat_zwrotny = document.createElement("div");
                                    lista_wiadomosci[i].parentNode.insertBefore(komunikat_zwrotny,lista_wiadomosci[i].nextSibling);
                                    wynik = rx1.exec(lista_wiadomosci[i].innerHTML);
                                    lista_wiadomosci[i].innerHTML=lista_wiadomosci[i].innerHTML.replace(wynik[0],"");
                                    setTimeout(function(){uzupelnij_wiadomosc_danymi(wynik[1],wynik[2],komunikat_zwrotny)},0);
                                    /*
                                    switch(wynik[1])
                                        {
                                        case 'akt':
                                                    pytanie = wynik[2];
                                                    var zegar;
                                                    function czekaj_na_otrzymanie_odpowiedzi()
                                                        {
                                                        if(odpowiedz != undefined)
                                                            {
                                                            if(odpowiedz == null)
                                                                {
                                                                komunikat_zwrotny.innerHTML = "Jesteś niezalogowany w Systemie Kopernik";
                                                                }
                                                            else
                                                                {
                                                                if(odpowiedz == -1)
                                                                    {
                                                                    komunikat_zwrotny.innerHTML = "Nie masz uprawnień Adminstratora Imperium aby móc dokonać aktywacji!!!";   
                                                                    }
                                                                else
                                                                    {
                                                                    switch(odpowiedz.stan)
                                                                        {
                                                                        case -1:
                                                                                komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już zostało przyjęte do sojuszu.";
                                                                                break;
                                                                        case 0:
                                                                                komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już nieubiega się o przyjęcie do sojuszu.";
                                                                                break;
                                                                        case 1:
                                                                                komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" prosi o aktywację i dostęp do danych Imperium!<br><a href=\"#\">Aktywuj</a><br><br><a href=\"#\">Odrzóc propozycję przyjęcia</a>";
                                                                                komunikat_zwrotny.getElementsByTagName("a")[0].addEventListener("click",function(e)
                                                                                    {
                                                                                    var odpowiedz = aktywuj_dostep_do_danych_sojuszu(wynik[2]);
                                                                                    switch(odpowiedz)
                                                                                        {
                                                                                        case 1:
                                                                                                alert("Zaaktywowano konto! Gracz już ma dostęp do danych!");
                                                                                                break;
                                                                                        case 0:
                                                                                                alert("Nieznany błąd");
                                                                                                break;
                                                                                        case -1:
                                                                                                alert("Nie masz uprawnień Administratora Imperium")
                                                                                                break;
                                                                                        case -2:
                                                                                                alert("Administrator Imperium niemoze wykonać aktywacji graczowi poza swoim Imperium");
                                                                                                break;
                                                                                        case -3:
                                                                                                alert("Gracz juz otrzymal dostep do danych Imperium");
                                                                                                break;
                                                                                        case null:
                                                                                                alert("Jesteś niezalogowany w Systemie Kopernik");
                                                                                                break;
                                                                                        default: 
                                                                                                zglos_blad(new Error("Błąd odpowiedzi aktywuj dostep\nOdpowiedź serwera: "+wynik[1]));
                                                                                                break;
                                                                                        }
                                                                                    }
                                                                                    ,false);
                                                                                komunikat_zwrotny.getElementsByTagName("a")[1].addEventListener("click",function(e)
                                                                                    {
                                                                                    var odpowiedz = odrzuc_propozycje_przyjecia(wynik[2]);
                                                                                    switch(odpowiedz)
                                                                                        {
                                                                                        case 1:
                                                                                                alert("Odrzuciłeś propozycję wstąpienia gracza do Imperium");
                                                                                                break;
                                                                                        case 0:
                                                                                                alert("Nieznany błąd");
                                                                                                break;
                                                                                        case -1:
                                                                                                alert("Nie masz uprawnień Administratora Imperium")
                                                                                                break;
                                                                                        case -2:
                                                                                                alert("Administrator Imperium niemoze wykonać odrzucenia propozycji graczowi poza swoim Imperium");
                                                                                                break;
                                                                                        case -3:
                                                                                                alert("Gracz juz otrzymal dostep do danych Imperium");
                                                                                                break;
                                                                                        case null:
                                                                                                alert("Jesteś niezalogowany w Systemie Kopernik");
                                                                                                break;
                                                                                        default: 
                                                                                                zglos_blad(new Error("Błąd odpowiedzi odrzucania propozycji przyjecia\nOdpowiedź serwera: "+wynik[1]));
                                                                                                break;
                                                                                        }
                                                                                    }
                                                                                    ,false);
                                                                                break;
                                                                        default:
                                                                                zglos_blad(new Error("Błąd atrybutu tagu SK\nAtrybut: "+wynik[1]));
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            clearInterval(zegar);   
                                                            }
                                                        }
                                                    //var a = lista_wiadomosci[i].innerHTML;
                                                    zegar = setInterval(czekaj_na_otrzymanie_odpowiedzi,1000);
                                                    /*
                                                    if(odpowiedz == null)
                                                        {
							komunikat_zwrotny.innerHTML = "Jesteś niezalogowany w Systemie Kopernik";
							}
                                                    else
                                                        {
							if(odpowiedz == -1)
                                                            {
                                                            komunikat_zwrotny.innerHTML = "Nie masz uprawnień Adminstratora Imperium aby móc dokonać aktywacji!!!";
                                                            }
							else
                                                            {
                                                            switch(odpowiedz.stan)
                                                                {
								case 0:
									komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już nieubiega się o przyjęcie do sojuszu.";
									break;
								case 1:
									komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" prosi o aktywację i dostęp do danych Imperium!<br><a href=\"#\">Aktywuj</a><br><br><a href=\"#\">Odrzóc propozycję przyjęcia</a>";
									komunikat_zwrotny.getElementsByTagName("a")[0].addEventListener("click",function(e)
										{
										var odpowiedz = aktywuj_dostep_do_danych_sojuszu(wynik[2]);
										switch(odpowiedz)
                                                                                    {
                                                                                    case 1:
                                                                                            alert("Zaaktywowano konto! Gracz już ma dostęp do danych!");
                                                                                            break;
                                                                                    case 0:
                                                                                            alert("Nieznany błąd");
                                                                                            break;
                                                                                    case -1:
                                                                                            alert("Nie masz uprawnień Administratora Imperium")
                                                                                            break;
                                                                                    case -2:
                                                                                            alert("Administrator Imperium niemoze wykonać aktywacji graczowi poza swoim Imperium");
                                                                                            break;
                                                                                    case -3:
                                                                                            alert("Gracz juz otrzymal dostep do danych Imperium");
                                                                                            break;
                                                                                    case null:
                                                                                            alert("Jesteś niezalogowany w Systemie Kopernik");
                                                                                            break;
                                                                                    default: 
                                                                                            zglos_blad(new Error("Błąd odpowiedzi aktywuj dostep\nOdpowiedź serwera: "+wynik[1]));
                                                                                            break;
                                                                                    }
										}
										,false);
									komunikat_zwrotny.getElementsByTagName("a")[1].addEventListener("click",function(e)
										{
										var odpowiedz = odrzuc_propozycje_przyjecia(wynik[2]);
										switch(odpowiedz)
                                                                                    {
                                                                                    case 1:
                                                                                            alert("Odrzuciłeś propozycję wstąpienia gracza do Imperium");
                                                                                            break;
                                                                                    case 0:
                                                                                            alert("Nieznany błąd");
                                                                                            break;
                                                                                    case -1:
                                                                                            alert("Nie masz uprawnień Administratora Imperium")
                                                                                            break;
                                                                                    case -2:
                                                                                            alert("Administrator Imperium niemoze wykonać odrzucenia propozycji graczowi poza swoim Imperium");
                                                                                            break;
                                                                                    case -3:
                                                                                            alert("Gracz juz otrzymal dostep do danych Imperium");
                                                                                            break;
                                                                                    case null:
                                                                                            alert("Jesteś niezalogowany w Systemie Kopernik");
                                                                                            break;
                                                                                    default: 
                                                                                            zglos_blad(new Error("Błąd odpowiedzi odrzucania propozycji przyjecia\nOdpowiedź serwera: "+wynik[1]));
                                                                                            break;
                                                                                    }
										}
										,false);
                                                                        break;
                                                                default:
                                                                        zglos_blad(new Error("Błąd atrybutu tagu SK\nAtrybut: "+wynik[1]));
                                                                        break;
                                                                
                                                                }
                                                            }
                                                        }
                                        }*/
                        /*                
			var komunikat_zwrotny = document.createElement("div");
			wiadomosc.parentNode.insertBefore(komunikat_zwrotny,wiadomosc.nextSibling);
			rx1 = new RegExp('\\[SK=(.*)\\](.*)\\[/SK\\]<br>\n');
			if(rx1.test(wiadomosc.innerHTML))
				{
				wynik = rx1.exec(wiadomosc.innerHTML);
				wiadomosc.innerHTML=wiadomosc.innerHTML.replace(wynik[0],"");
				switch(wynik[1])
					{
					case 'akt':
									var odpowiedz = pobierz_informacje_o_aktywacji(wynik[2])
					  				if(odpowiedz == null)
										{
										komunikat_zwrotny.innerHTML = "Jesteś niezalogowany w Systemie Kopernik";
										}
									else
										{
										if(odpowiedz == -1)
											{
											komunikat_zwrotny.innerHTML = "Nie masz uprawnień Adminstratora Imperium aby móc dokonać aktywacji!!!";
											}
										else
											{
											switch(odpowiedz.stan)
												{
												case 0:
													  		komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już nieubiega się o przyjęcie do sojuszu.";
															break;
												case 1:
															komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" prosi o aktywację i dostęp do danych Imperium!<br><a href=\"#\">Aktywuj</a><br><br><a href=\"#\">Odrzóc propozycję przyjęcia</a>";
															komunikat_zwrotny.getElementsByTagName("a")[0].addEventListener("click",function(e)
																{
																var odpowiedz = aktywuj_dostep_do_danych_sojuszu(wynik[2]);
																switch(odpowiedz)
																	{
																	case 1:
																				alert("Zaaktywowano konto! Gracz już ma dostęp do danych!");
																				break;
																	case 0:
																				alert("Nieznany błąd");
																				break;
																	case -1:
																				alert("Nie masz uprawnień Administratora Imperium")
																				break;
																	case -2:
																				alert("Administrator Imperium niemoze wykonać aktywacji graczowi poza swoim Imperium");
																				break;
																	case -3:
																				alert("Gracz juz otrzymal dostep do danych Imperium");
																				break;
																	case null:
																				alert("Jesteś niezalogowany w Systemie Kopernik");
																				break;
																	default: 
																				zglos_blad(new Error("Błąd odpowiedzi aktywuj dostep\nOdpowiedź serwera: "+wynik[1]));
																				break;
																	}
																}
															,false);
															komunikat_zwrotny.getElementsByTagName("a")[1].addEventListener("click",function(e)
																{
																var odpowiedz = odrzuc_propozycje_przyjecia(wynik[2]);
																switch(odpowiedz)
																	{
																	case 1:
																				alert("Odrzuciłeś propozycję wstąpienia gracza do Imperium");
																				break;
																	case 0:
																				alert("Nieznany błąd");
																				break;
																	case -1:
																				alert("Nie masz uprawnień Administratora Imperium")
																				break;
																	case -2:
																				alert("Administrator Imperium niemoze wykonać odrzucenia propozycji graczowi poza swoim Imperium");
																				break;
																	case -3:
																				alert("Gracz juz otrzymal dostep do danych Imperium");
																				break;
																	case null:
																				alert("Jesteś niezalogowany w Systemie Kopernik");
																				break;
																	default: 
																				zglos_blad(new Error("Błąd odpowiedzi odrzucania propozycji przyjecia\nOdpowiedź serwera: "+wynik[1]));
																				break;
																	}
																}
															,false);
															break;
												case -1:
															komunikat_zwrotny.innerHTML = "Konto w Systemie Kopernik o loginie \""+odpowiedz.login+"\" już zostało zaaktywowane i ma dostęp do danych!";
															break;
												default:
															zglos_blad(new Error("Błąd stanu informacji o aktywacji gracza \nOdpowiedź serwera: "+wynik[1]));
															break;
												}
											}
									
									
										}
								
									break;
					default:
									zglos_blad(new Error("Błąd atrybutu tagu SK\nAtrybut: "+wynik[1]));
									break;
					}
				*/}		
			}
		}
            }
	}
    }
    
	
function sprawdz_liste_planet()
	{
	function stworz_liste_planet_z_ogame()
		{
		var panel_planet = unsafeWindow.document.getElementById("planetList");
		var wynik = new Array();
		var ile = panel_planet.getElementsByTagName("div").length;
		var i;
		for(i=0;i<ile;i++)
			{
			var obiekt_planeta = new Object();
			obiekt_planeta.kordy = panel_planet.getElementsByTagName("div")[i].childNodes[1].childNodes[5].innerHTML;
			obiekt_planeta.nazwa = panel_planet.getElementsByTagName("div")[i].childNodes[1].childNodes[3].innerHTML;
			obiekt_planeta.czy_ma_ksiezyc = (panel_planet.getElementsByTagName("div")[i].childNodes[3]?true:false) && (panel_planet.getElementsByTagName("div")[i].childNodes[3].className == "moonlink   tooltipLeft js_hideTipOnMobile" || panel_planet.getElementsByTagName("div")[i].childNodes[3].className == "moonlink active  tooltipLeft js_hideTipOnMobile");
			wynik.push(obiekt_planeta);
			if(obiekt_planeta.czy_ma_ksiezyc)
				{
				rx_nazwa_ksiezyca = RegExp('<B>(.+)\\s\\[[0-9]:[0-9]{1,3}:[[0-9]{1,2}\\]</B>');
				var tym = rx_nazwa_ksiezyca.exec(panel_planet.getElementsByTagName("div")[i].childNodes[3].title);
				obiekt_planeta.nazwa_ksiezyca = tym[1];
				}
			}
		return wynik;
		}
	function znajdz_planete_z_danym_kordem(zbior_planet,kord)
		{
		var i;
		for(i=0;i<zbior_planet.length;i++)
			{
			if(zbior_planet[i].kordy == kord)
				{
				return zbior_planet[i];
				}
			}
		return null;
		}
	function porownaj_dane(dane_z_ustawien,dane_z_ogame)
		{
		var kopia_dane_z_ustawien = dane_z_ustawien.slice(0);
		var i;
		for(i=0;i<dane_z_ogame.length;i++)
			{
			var j;
			var znalezniono=false;
			for(j=0;j<kopia_dane_z_ustawien.length;j++)
				{
				if(kopia_dane_z_ustawien[j].kordy == dane_z_ogame[i].kordy)
					{
					znalezniono=true;
					if(kopia_dane_z_ustawien[j].nazwa != dane_z_ogame[i].nazwa)
						{
						if(confirm("Nazwa planety \""+dane_z_ogame[i].nazwa+"\" "+dane_z_ogame[i].kordy+" jest inna w Systemie Kopernik (\""+kopia_dane_z_ustawien[j].nazwa+"\")!\nCzy uaktualnić nazwę w Systemie Kopernik?"))
							{
							var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
							var kordy = rx_kord.exec(dane_z_ogame[i].kordy);
                                                        var odpowiedz = obiekt_zmien_nazwe(kordy[1],kordy[2],kordy[3],'Planeta',dane_z_ogame[i].nazwa);
                                                        switch(odpowiedz)
                                                            {
                                                            case true:
                                                                        var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,dane_z_ogame[i].kordy);
                                                                        planeta.nazwa=dane_z_ogame[i].nazwa;
                                                                        tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
                                                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                                                        break;
                                                            case -1:
									break;
                                                            case -2:
									alert("Masz nieaktywny adres email");
									break;
                                                            case -3:
									alert("Masz BANA");
									break;
                                                            case -4:
                                                                        alert("Nie można zmienić nazwy planety która nie została zarejestrowana w Systemie Kopernik");
                                                                        break;
                                                            case -5:
                                                                        alert("Nie można zmienić nazwy nie twojej planety!");
                                                                        break;
                                                            default:
                                                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_zmien_nazwe\nOdpowiedz: "+odpowiedz));
                                                                        break;
                                                            }
							}
						}
					if(dane_z_ogame[i].czy_ma_ksiezyc && !kopia_dane_z_ustawien[j].czy_ma_ksiezyc)
						{
						if(confirm("Planeta \""+dane_z_ogame[i].nazwa+"\" "+dane_z_ogame[i].kordy+" posiada księżyc który niezostał wprowadzony do Systemu Kopernik!\nCzy dodać księżyć do Systemu Kopernik?"))
							{
							var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
							var kordy = rx_kord.exec(dane_z_ogame[i].kordy);
							var odpowiedz = obiekt_dodaj(kordy[1],kordy[2],kordy[3],'Ksiezyc',dane_z_ogame[i].nazwa_ksiezyca);
							switch(odpowiedz)
								{
								case true:
										var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,dane_z_ogame[i].kordy);
										planeta.czy_ma_ksiezyc=true;
										planeta.nazwa_ksiezyca=dane_z_ogame[i].nazwa_ksiezyca;
										tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
										GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
										break;
								case -1:
										break;
								case -2:
										alert("Masz nieaktywny adres email");
										break;
								case -3:
										alert("Masz BANA");
										break;
								case -4:
										var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,dane_z_ogame[i].kordy);
										planeta.czy_ma_ksiezyc=true;
										planeta.nazwa_ksiezyca=dane_z_ogame[i].nazwa_ksiezyca;
										tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
										GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
										break;
								case -5:
							  			alert("W Systemie jest zarejestrowany obiekt na tych kordach i typie przez innego gracza!\nKonflikt został zgłoszony do Twórcy Systemu!");
										break;
								case -6:
										alert("Niemożesz dodać księżyca do niezarejestrowanej planety w Systemie Kopernik");
										break;
								case -7:
										alert("Niemożesz dodać księżyca do nieswojej planety w Systemie Kopernik");
										break;
                                                                default:
                                                                                zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_dodaj\nOdpowiedz: "+odpowiedz));
                                                                                break;
								}
							}
						}
					if(!dane_z_ogame[i].czy_ma_ksiezyc && kopia_dane_z_ustawien[j].czy_ma_ksiezyc)
						{
						if(confirm("Planeta \""+dane_z_ogame[i].nazwa+"\" "+dane_z_ogame[i].kordy+" nieposiada księżyca który istnieje w Systemie Kopernik!\nCzy usunąć księżyć z Systemu Kopernik?"))
							{
							var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
							var kordy = rx_kord.exec(dane_z_ogame[i].kordy);
                                                        var odpowiedz = obiekt_usun(kordy[1],kordy[2],kordy[3],'Ksiezyc');
                                                        switch(odpowiedz)
                                                            {
                                                            case true:
                                                                        var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,dane_z_ogame[i].kordy);
                                                                        planeta.czy_ma_ksiezyc = false;
                                                                        planeta.nazwa_ksiezyca="";
                                                                        tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
                                                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                                                        break;
                                                            case -1:
									break;
                                                            case -2:
									alert("Masz nieaktywny adres email");
									break;
                                                            case -3:
									alert("Masz BANA");
									break;
                                                            case -4:
                                                                        alert("Nie można usunąć księzyca który nie został zarejestrowany w Systemie Kopernik");
                                                                        break;
                                                            case -5:
                                                                        alert("Nie można usunąć nie twój ksiezyc!");
                                                                        break;
                                                            default:
                                                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_usun (dla ksiezyca)\nOdpowiedz: "+odpowiedz));
                                                                        break;
                                                            }
							}
						}
					if(kopia_dane_z_ustawien[j].czy_ma_ksiezyc && (dane_z_ogame[i].nazwa_ksiezyca != kopia_dane_z_ustawien[j].nazwa_ksiezyca))
						{
						if(confirm("Nazwa księżyca \""+dane_z_ogame[i].nazwa_ksiezyca+"\" "+dane_z_ogame[i].kordy+" jest inna w Systemie Kopernik (\""+kopia_dane_z_ustawien[j].nazwa_ksiezyca+"\")!\nCzy uaktualnić nazwę w Systemie Kopernik?"))
                                                        {
                                                        var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
							var kordy = rx_kord.exec(dane_z_ogame[i].kordy);
                                                        var odpowiedz = obiekt_zmien_nazwe(kordy[1],kordy[2],kordy[3],'Ksiezyc',dane_z_ogame[i].nazwa_ksiezyca);
                                                        switch(odpowiedz)
                                                            {
                                                            case true:
                                                                        var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,dane_z_ogame[i].kordy);
                                                                        planeta.nazwa_ksiezyca=dane_z_ogame[i].nazwa_ksiezyca;
                                                                        tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
                                                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                                                        break;
                                                            case -1:
									break;
                                                            case -2:
									alert("Masz nieaktywny adres email");
									break;
                                                            case -3:
									alert("Masz BANA");
									break;
                                                            case -4:
                                                                        alert("Nie można zmienić nazwy księzyca która nie została zarejestrowana w Systemie Kopernik");
                                                                        break;
                                                            case -5:
                                                                        alert("Nie można zmienić nazwy nie twojego ksiezyca!");
                                                                        break;
                                                            default:
                                                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_zmien_nazwe (dla ksiezyca)\nOdpowiedz: "+odpowiedz));
                                                                        break;
                                                            }                                                       
							}
						}
					break;
					}
				}
			if(!znalezniono)
				{
				if(confirm("Planeta "+dane_z_ogame[i].nazwa+" "+dane_z_ogame[i].kordy+" nie jest wprowadzona do Systemu Kopernik!\nCzy chcesz ją dodać do Systemu Kopernik?"))
					{
					var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
					var kordy = rx_kord.exec(dane_z_ogame[i].kordy);
					var odpowiedz = obiekt_dodaj(kordy[1],kordy[2],kordy[3],'Planeta',dane_z_ogame[i].nazwa);
					switch(odpowiedz)
						{
						case true:
										dane_z_ustawien.push(new Object(
											{
											"kordy": dane_z_ogame[i].kordy,
											"nazwa": dane_z_ogame[i].nazwa,
											"czy_ma_ksiezyc": false,
											"nazwa_ksiezyca": ""
											}
										));
										tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
										GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
										break;
						case -1:
										break;
						case -2:
										alert("Masz nieaktywny adres email");
										break;
						case -3:
										alert("Masz BANA");
										break;
						case -4:
										dane_z_ustawien.push(new Object(
											{
											"kordy": dane_z_ogame[i].kordy,
											"nazwa": dane_z_ogame[i].nazwa,
											"czy_ma_ksiezyc": false,
											"nazwa_ksiezyca": ""
											}
										));
										tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
										GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
										break;
						case -5:
							  			alert("W Systemie jest zarejestrowany obiekt na tych kordach i typie przez innego gracza!\nKonflikt został zgłoszony do Twórcy Systemu!");
										break;
						}
					}
				}
			else
				{
				tym_dane_z_ustawien = Array();
				var k;
				var k2=0;
				for(k=0;k<kopia_dane_z_ustawien.length;k++)
					{
					if(k != j)
						{
						tym_dane_z_ustawien[k2]=kopia_dane_z_ustawien[k];
						k2++;
						}
					}
				kopia_dane_z_ustawien=tym_dane_z_ustawien;
				}
			}
		if(kopia_dane_z_ustawien.length)
			{
			var i;
			for(i=0;i<kopia_dane_z_ustawien.length;i++)
				{
				if(confirm("Systemie Kopernik istnieje planeta \""+kopia_dane_z_ustawien[i].nazwa+"\" "+kopia_dane_z_ustawien[i].kordy+" która niezostała odnaleziona w ogame!\nSkasować tą planete z Systemu Kopernik?"))
					{
                        		var rx_kord = RegExp('\\[([0-9]+):([0-9]+):([0-9]+)\\]');
					var kordy = rx_kord.exec(kopia_dane_z_ustawien[i].kordy);
                                        var odpowiedz = obiekt_usun(kordy[1],kordy[2],kordy[3],'Planeta');
                                        switch(odpowiedz)
                                            {
                                            case true:
                                                        var planeta = znajdz_planete_z_danym_kordem(dane_z_ustawien,kopia_dane_z_ustawien[i].kordy);
                                                        dane_z_ustawien.splice(dane_z_ustawien.indexOf(planeta),1);
                                                        tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=dane_z_ustawien;
                                                        GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
                                                        break;
                                            case -1:
							break;
                                            case -2:
							alert("Masz nieaktywny adres email");
							break;
                                            case -3:
							alert("Masz BANA");
							break;
                                            case -4:
                                                        alert("Nie można usunąć Planety która nie została zarejestrowana w Systemie Kopernik");
                                                        break;
                                            case -5:
                                                        alert("Nie można usunąć nie twojej planety!");
                                                        break;
                                            default:
                                                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_usun\nOdpowiedz: "+odpowiedz));
                                                        break;
                                            }
					}
				}
			}
		}
	if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
		{
		/*
		tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=Array();
										GM_setValue("tablica_zmiennych", JSON.stringify(tablica_zmiennych) );
		*/
               //tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]=  Array();
              
               //tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][1].czy_ma_ksiezyc = true;
               //tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][1].nazwa_ksiezyca = "test";
               
               //falszywa_planeta = new Object();
               //falszywa_planeta.kordy = "[1:1:1]";
               //falszywa_planeta.nazwa = "aaaaaaaa";
               //tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].splice(0,0,falszywa_planeta);
		//alert(JSON.stringify(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"]));
		var lista_z_ogame = stworz_liste_planet_z_ogame();
		var lista_z_ustawien = tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"];
		porownaj_dane(lista_z_ustawien,lista_z_ogame);
		}
	}
function odczytaj_badania_gracza()
    {
    function wykonaj_aktualizacje(zdarzenie)
        {
        if(unsafeWindow.document.getElementById('details115').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_napedu_spalinowego = unsafeWindow.document.getElementById('details115').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_napedu_spalinowego = unsafeWindow.document.getElementById('details115').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        
        if(unsafeWindow.document.getElementById('details117').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_napedu_impulsowego = unsafeWindow.document.getElementById('details117').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_napedu_impulsowego = unsafeWindow.document.getElementById('details117').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        
        if(unsafeWindow.document.getElementById('details118').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_napedu_nadprzestrzennego = unsafeWindow.document.getElementById('details118').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_napedu_nadprzestrzennego = unsafeWindow.document.getElementById('details118').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        
        if(unsafeWindow.document.getElementById('details109').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_technologi_bojowej = unsafeWindow.document.getElementById('details109').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_technologi_bojowej = unsafeWindow.document.getElementById('details109').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        
        if(unsafeWindow.document.getElementById('details110').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_technologi_ochronnej = unsafeWindow.document.getElementById('details110').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_technologi_ochronnej = unsafeWindow.document.getElementById('details110').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        
        if(unsafeWindow.document.getElementById('details111').lastElementChild.childNodes[1].childNodes.length==5)
            {
            var poziom_badania_opancerzenie = unsafeWindow.document.getElementById('details111').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim();
            }
        else
            {
            var poziom_badania_opancerzenie = unsafeWindow.document.getElementById('details111').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim();
            }
        var odpowiedz = gracz_aktualizuj_badania(poziom_badania_napedu_spalinowego, poziom_badania_napedu_impulsowego, poziom_badania_napedu_nadprzestrzennego, poziom_badania_technologi_bojowej, poziom_badania_technologi_ochronnej, poziom_badania_opancerzenie);
        switch(odpowiedz)
            {
            case null:
                        alert('Jesteś niezalogowany');
                        break;
            case true:
                        if(zdarzenie)
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja wykonana"; 
                            }
                        else
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna wykonana";    
                            }
                        break;
            case false:
                        alert("Niezany bląd aktualizowania badań");
                        break;
            case -1:
                        alert('Twoje id gracza nie istenieje w Systemie Kopernik');
                        break;
            case -2:
                        alert('Twoje konto jest nie aktywne');
                        break;
            case -3:
                        alert('Gracz ma BANa');
                        break;
            default:
                        zglos_blad(new Error("Błąd odpowiedzi funkcji gracz_aktualizuj_badania\nOdpowiedz: "+odpowiedz));
                        break;
            }
        }
    if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
        {
        var powiadomienie = document.createElement("div");
        unsafeWindow.document.getElementById('buttonz').appendChild(powiadomienie);
        powiadomienie.style.textAlign="center";
        powiadomienie.style.margin="auto";   
        if(czy_zalogowany() || tablica_zmiennych[uniwersum][login]["autologowanie"] && zaloguj(tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"],tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"],tablica_zmiennych[uniwersum][login]["autologowanie_login"],tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"])==1)
            {
            if(tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_badan"])
                {
                powiadomienie.style.color="GreenYellow";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna";
                wykonaj_aktualizacje();
                }
            else
                {
                powiadomienie.style.color="orange";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja ręczna <a href=\"#\">Aktualizuj</a>";
                powiadomienie.getElementsByTagName("a")[0].addEventListener('click',wykonaj_aktualizacje,false);
                }
            }
        else
            {
            powiadomienie.style.color="red";
            powiadomienie.innerHTML= "System Kopernik: Jesteś niezalogowany!"; 
            }
        }
    }
function duze_liczby(liczba_z_kropkami)
    {
    var rx_M = RegExp('([0-9]+)\\.([0-9]+)\\.([0-9]+)');
    var rx_K = RegExp('([0-9]+)\\.([0-9]+)');
    if(rx_M.test(liczba_z_kropkami))
        {
        var wynik = rx_M.exec(liczba_z_kropkami);
        return  wynik[1]*1000000 + wynik[2]*1000 + wynik[3]*1;
        }
    else
        {
        if(rx_K.test(liczba_z_kropkami))
            {
            var wynik = rx_K.exec(liczba_z_kropkami);
            return wynik[1]*1000 + wynik[2]*1;
            }
        else
            {
            return liczba_z_kropkami*1;
            }
        }
    }
function odczytaj_obrone_planety()
    {
    function wykonaj_aktualizacje(zdarzenie)
        {
        if(unsafeWindow.document.getElementById('details401').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var wr = duze_liczby(unsafeWindow.document.getElementById('details401').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var wr = duze_liczby(unsafeWindow.document.getElementById('details401').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details402').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var ll = duze_liczby(unsafeWindow.document.getElementById('details402').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var ll = duze_liczby(unsafeWindow.document.getElementById('details402').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details403').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var cl = duze_liczby(unsafeWindow.document.getElementById('details403').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var cl = duze_liczby(unsafeWindow.document.getElementById('details403').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details404').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var dg = duze_liczby(unsafeWindow.document.getElementById('details404').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var dg = duze_liczby(unsafeWindow.document.getElementById('details404').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details405').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var dj = duze_liczby(unsafeWindow.document.getElementById('details405').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var dj = duze_liczby(unsafeWindow.document.getElementById('details405').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details406').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var wp = duze_liczby(unsafeWindow.document.getElementById('details406').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var wp = duze_liczby(unsafeWindow.document.getElementById('details406').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details407').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var mp = duze_liczby(unsafeWindow.document.getElementById('details407').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var mp = duze_liczby(unsafeWindow.document.getElementById('details407').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details408').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var dp = duze_liczby(unsafeWindow.document.getElementById('details408').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var dp = duze_liczby(unsafeWindow.document.getElementById('details408').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details502').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var pr = duze_liczby(unsafeWindow.document.getElementById('details502').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var pr = duze_liczby(unsafeWindow.document.getElementById('details502').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
            
        if(unsafeWindow.document.getElementById('details503').lastElementChild.childNodes[1].childNodes.length==3)
            {
            var rm = duze_liczby(unsafeWindow.document.getElementById('details503').lastElementChild.childNodes[1].childNodes[2].nodeValue.trim());
            }
        else
            {
            var rm = duze_liczby(unsafeWindow.document.getElementById('details503').lastElementChild.childNodes[1].childNodes[0].nodeValue.trim());
            }
        var rx_kord = RegExp('([0-9]+):([0-9]+):([0-9]+)');
	var kordy = rx_kord.exec(unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-coordinates").content);
        var galaktyka = kordy[1];
        var uklad = kordy[2];
        var pozycja = kordy[3];
        var typ = (unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-type").content=='moon'?'Ksiezyc':'Planeta');
        var odpowiedz = obiekt_aktualizuj_obrone(galaktyka, uklad, pozycja, typ, wr, ll, cl, dg, dj, wp, mp, dp, pr, rm);
        switch(odpowiedz)
            {
            case null:
                        alert('Jesteś niezalogowany');
                        break;
            case true:
                        if(zdarzenie)
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja wykonana"; 
                            }
                        else
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna wykonana";    
                            }
                        break;
            case false:
                        alert("Niezany bląd aktualizowania badań");
                        break;
            case -1:
                        alert('Twoje id gracza nie istenieje w Systemie Kopernik');
                        break;
            case -2:
                        alert('Twoje konto jest nie aktywne');
                        break;
            case -3:
                        alert('Gracz ma BANa');
                        break;
            case -4:
                        alert('Obiekt nieistnieje');
                        break;
            case -5:
                        alert('Obiekt nienależy do ciebie');
                        break;
            default:
                        zglos_blad(new Error("Błąd odpowiedzi funkcji gracz_aktualizuj_badania\nOdpowiedz: "+odpowiedz));
                        break;
            }
        }
    if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
        {
        var powiadomienie = document.createElement("div");
        unsafeWindow.document.getElementById('buttonz').getElementsByTagName('div')[1].insertBefore(powiadomienie,unsafeWindow.document.getElementById('buttonz').getElementsByTagName('div')[1].childNodes[3]);
        powiadomienie.style.textAlign="center";
        powiadomienie.style.margin="auto";   
        if(czy_zalogowany() || tablica_zmiennych[uniwersum][login]["autologowanie"] && zaloguj(tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"],tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"],tablica_zmiennych[uniwersum][login]["autologowanie_login"],tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"])==1)
            {
            if(tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_obrony"])
                {
                powiadomienie.style.color="GreenYellow";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna";
                wykonaj_aktualizacje();
                }
            else
                {
                powiadomienie.style.color="orange";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja ręczna <a href=\"#\">Aktualizuj</a>";
                powiadomienie.getElementsByTagName("a")[0].addEventListener('click',wykonaj_aktualizacje,false);
                }
            }
        else
            {
            powiadomienie.style.color="red";
            powiadomienie.innerHTML= "System Kopernik: Jesteś niezalogowany!"; 
            }
        }
    }
    
function odczytaj_flote_planety()
    {
    function wykonaj_aktualizacje(zdarzenie)
        {
        if(unsafeWindow.document.getElementById('buttonz'))
            {
            var lm = duze_liczby(unsafeWindow.document.getElementById('button204').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var cm = duze_liczby(unsafeWindow.document.getElementById('button205').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var k = duze_liczby(unsafeWindow.document.getElementById('button206').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var ow = duze_liczby(unsafeWindow.document.getElementById('button207').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var pan = duze_liczby(unsafeWindow.document.getElementById('button215').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var bom = duze_liczby(unsafeWindow.document.getElementById('button211').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var nisz = duze_liczby(unsafeWindow.document.getElementById('button213').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var gs = duze_liczby(unsafeWindow.document.getElementById('button214').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var mt = duze_liczby(unsafeWindow.document.getElementById('button202').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var dt = duze_liczby(unsafeWindow.document.getElementById('button203').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var kol = duze_liczby(unsafeWindow.document.getElementById('button208').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var rec = duze_liczby(unsafeWindow.document.getElementById('button209').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            var ss = duze_liczby(unsafeWindow.document.getElementById('button210').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].nodeValue);
            }
        else
            {
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
            var kol = 0;
            var rec = 0;
            var ss = 0;
            }
        var rx_kord = RegExp('([0-9]+):([0-9]+):([0-9]+)');
	var kordy = rx_kord.exec(unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-coordinates").content);
        var galaktyka = kordy[1];
        var uklad = kordy[2];
        var pozycja = kordy[3];
        var typ = (unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-type").content=='moon'?'Ksiezyc':'Planeta');
        var odpowiedz = obiekt_aktualizuj_flote(galaktyka, uklad, pozycja, typ, lm, cm, k, ow, pan, bom, nisz, gs, mt, dt, kol, rec, ss);
        switch(odpowiedz)
            {
            case null:
                        alert('Jesteś niezalogowany');
                        break;
            case 1:
                        if(zdarzenie)
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja wykonana (wykryto zmiane)"; 
                            }
                        else
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna wykonana (wykryto zmiane)";    
                            }
                        break;
            case 0:
                        if(zdarzenie)
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja wykonana (nie wykryto zmiany)"; 
                            }
                        else
                            {
                            powiadomienie.style.color="GreenYellow";
                            powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna wykonana (nie wykryto zmiany)";    
                            }
                        break;
            case false:
                        alert("Niezany bląd aktualizowania badań");
                        break;
            case -1:
                        alert('Twoje id gracza nie istenieje w Systemie Kopernik');
                        break;
            case -2:
                        alert('Twoje konto jest nie aktywne');
                        break;
            case -3:
                        alert('Gracz ma BANa');
                        break;
            case -4:
                        alert('Obiekt nieistnieje');
                        break;
            case -5:
                        alert('Obiekt nienależy do ciebie');
                        break;
            default:
                        zglos_blad(new Error("Błąd odpowiedzi funkcji obiekt_aktualizuj_flote\nOdpowiedz: "+odpowiedz));
                        break;
            }
        }
    if(tablica_zmiennych[uniwersum][login]["wiaz_z_kontem_ogame"])
        {
        var powiadomienie = document.createElement("div");
        powiadomienie.style.textAlign="center";
        powiadomienie.style.margin="auto";
        if(unsafeWindow.document.getElementById('buttonz'))
            {
            unsafeWindow.document.getElementById('allornone').getElementsByTagName('div')[0].insertBefore(powiadomienie,unsafeWindow.document.getElementById('allornone').getElementsByTagName('div')[0].getElementsByTagName('div')[0]);
            }
        else
            {
            unsafeWindow.document.getElementById('warning').insertBefore(powiadomienie,null);
            }
        if(czy_zalogowany() || tablica_zmiennych[uniwersum][login]["autologowanie"] && zaloguj(tablica_zmiennych[uniwersum][login]["autologowanie_spolecznosc"],tablica_zmiennych[uniwersum][login]["autologowanie_uniwersum"],tablica_zmiennych[uniwersum][login]["autologowanie_login"],tablica_zmiennych[uniwersum][login]["autologowanie_haslo_md5"])==1)
            {
            if(tablica_zmiennych[uniwersum][login]["automatyczna_aktualizacja_floty"])
                {
                powiadomienie.style.color="GreenYellow";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja automatyczna";
                wykonaj_aktualizacje();
                }
            else
                {
                powiadomienie.style.color="orange";
                powiadomienie.innerHTML= "System Kopernik: Aktualizacja ręczna <a href=\"#\">Aktualizuj</a>";
                powiadomienie.getElementsByTagName("a")[0].addEventListener('click',wykonaj_aktualizacje,false);
                }
            }
        else
            {
            powiadomienie.style.color="red";
            powiadomienie.innerHTML= "System Kopernik: Jesteś niezalogowany!"; 
            }
        }
    }
function wybierz_automatycznie_aktywny_obiekt()
    {
    function znajdz_planete_z_danym_kordem(zbior_planet,kord)
	{
	var i;
	for(i=0;i<zbior_planet.length;i++)
            {
            if(zbior_planet[i].kordy == kord)
		{
		return i;
		}
            }
	return null;
	}
    var kordy = "["+unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-coordinates").content+"]";
    var typ = (unsafeWindow.document.getElementsByTagName('meta').namedItem("ogame-planet-type").content=='moon'?'Ksiezyc':'Planeta');
    if(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"].length )
        {
        var id_obiektu = znajdz_planete_z_danym_kordem(tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"], kordy);
        if(id_obiektu != null)
            {
            if(typ == "Ksiezyc" && tablica_zmiennych[uniwersum][login]["lista_planet_w_skrypcie"][id_obiektu].czy_ma_ksiezyc == true)
                {
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = id_obiektu;
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = typ;
                }
            else
                {
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = id_obiektu;
                tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Planeta';
                }
            }
        else
            {
            tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = 0;
            tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = 'Planeta';
            }
        }
    else
        {
        tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].numer = null;
        tablica_zmiennych[uniwersum][login]["wybrany_obiekt"].typ = null;
        }
    }