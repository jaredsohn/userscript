// ==UserScript==
// @name           Blokowanie Niebezpiecznych Profili (Fotka.pl)
// @author         Lashus & .mods team
// @version        1.1.1
// @include        http://www.fotka.pl/profil/*
// @include        http://www.fotka.pl/albumy/*
// @description    Wykrywa czy podany profil zawiera tresci, ktore zostaly uznane za szkodliwe dla wzroku badz zdrowia psychicznego. Profile okresla lista zewnetrzna.
// ==/UserScript==

function czytaj_ciacho(nazwa) {
	// ciacho
	nazwa+="=";

	// szukamy ciacha
	startCookie=document.cookie.indexOf(nazwa);

	// jezeli nie istnieje
	if (startCookie==-1) {return ""}

	// poczatek ciacha
	startCookie+=nazwa.length;
	
	// koniec ciacha
	koniecCookie=document.cookie.indexOf(";",startCookie);
	
	// kopiujemy tresc ciacha
	textCiacha = document.cookie.substring(startCookie, koniecCookie);
	
	return textCiacha;
}

function tworz_ciacho(nazwa, wartosc) {
	// ciacho
	nazwa+="=";
	
	// tworzymy ciacho
	document.cookie=nazwa+"="+wartosc+";";
}
	
	// sprawdzamy czy jestesmy na dobrej stronie
	var nick_pocz = document.URL.indexOf("profil/");
	if(nick_pocz <= 0) {
		nick_pocz = document.URL.indexOf("albumy/");
	}
	nick_pocz += 7;
	var nick_kon = document.URL.indexOf("/", nick_pocz);
	// jesli nie ma ostatniego ukośnika, wpisz konca wartosc stringu
	if(nick_kon <= 0) {
		nick_kon = document.URL.indexOf("?z", nick_pocz);
		if(nick_kon <= 0) {
			nick_kon = document.URL.length;
		}
	}
	var nick = document.URL.substring(nick_pocz, nick_kon);
	nick = nick.toLowerCase();
	var strona = document.URL;	

	// funkcja czytajaca ciasteczko
	var ciacho = czytaj_ciacho("pokemon");
	
			// sprawdzamy czy jestesmy na stronie ze zdjeciami
		
			// laczymy sie
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://bnp.krtp.pl/list.xml",
				headers: {
					"User-Agent":"Mozilla/5.0",
				 "Accept":"text/xml"
				},
				onload:function(response) {

				// zmienna z xmlem
					var xml = response.responseText;
					
						try // jesli IE
						{
							var xmlOdczyt=new ActiveXObject("Microsoft.XMLDOM");
							xmlOdczyt.async="false";
							xmlOdczyt.loadXML(xml);
						}
					catch(e)
						{
						try // jesli Firefox, Mozilla, Opera, etc.
							{
								var parser = new DOMParser();
								var xmlOdczyt = parser.parseFromString(xml,"text/xml");
							}
						catch(e)
							{
							alert(e.message);
							}
						}

						// zmienne zawierajaca dane z xml-a oraz adres strony
						
						var profil = xmlOdczyt.getElementsByTagName("profil");
						var powod = xmlOdczyt.getElementsByTagName("powod");	
						
						// liczymy obroty petli czyli ilosc profili
						var obroty = profil.length;
						
						for(var i=0;i<obroty;i++) {	

							// odczyt wartosci i sprawdzanie czy profil jest zakazany
							if(nick == profil[i].childNodes[0].nodeValue.toLowerCase()) {
							
								// tworzym zmienna (ramke "divke")
								var div = document.createElement('div');
								div.setAttribute('style', 'position:fixed; bottom:0; width:100%; font-weight:bold; color: #ff0000;background:#e6e6e6; border: 4px ridge red; padding: 10px; text-align: center; z-index: 1000;');
								var br = document.createElement('br');
								var txt = document.createTextNode('Uwaga! Ten profil ('+profil[i].childNodes[0].nodeValue+') został dodany na listę profili będących profilami szkodliwymi!');
								var txt2 = document.createTextNode('Powód: '+powod[i].childNodes[0].nodeValue);
								
								// laczymy text z divka
								div.appendChild(txt);
								div.appendChild(br);
								div.appendChild(txt2);
								
								// zapisujemy ja do strony
								document.body.appendChild(div);
							}
						}
				}
			});
	
	// czyscimy ciacho
	tworz_ciacho("pokemon", "");