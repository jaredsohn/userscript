// ==UserScript==
// @name           Skan-api
// @version        1.0
// @namespace      "http://userscripts.org/users/293821"
// @description    Skrypt służący do wysyłania informacji o skanach do Systemu ogame.kopernik.idl.pl
// @include        http://*.ogame.pl/game/index.php?page=showmessage*
// ==/UserScript==

// Adres do API Systemu
var adres_systemu_api = "http://ogame.kopernik.idl.pl/api/";

var mywindow;
try { mywindow = unsafeWindow; }
catch (e) { mywindow = window; }

// Funkcja zwaracająca znacznik danej klasy (pierwszy pasujący)
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
	i = 0;
	}

// Funkcja zwaracająca znacznik danej klasy (cały zbiór)
function getElementByClass2(theClass)
	{
	var j=0;
	var wyniczek = Array();
	var allHTMLTags=document.getElementsByTagName('*');
	for (i=0; i<allHTMLTags.length; i++)
		{
		if (allHTMLTags[i].className==theClass)
			{
			wyniczek[j] = allHTMLTags[i];
			j++;
			}
		}
	i = 0;
	return wyniczek;
	}	

// Funkcja zwacajaca liczy powyzej 1.000 z ciągów znaków
function duze_liczby(ciag_znakow)
	{
	var rx3 = new RegExp("([0-9]+)\.([0-9]{3})\.([0-9]{3})");
	var rx2 = new RegExp('([0-9]+)\.([0-9]{3})');
	var rx = new RegExp('[0-9]+');
	
	if (rx3.test(ciag_znakow))
		{
		var wynik = rx3.exec(ciag_znakow);
		return wynik[1] * 1000000 + wynik[2] * 1000 + wynik[3] * 1;
		}
	else
		{
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
	}
	
// Funkcja dodawająca do formularza dodatkowe pole
function dodaj_pole(nazwa,wartosc)
	{
	var pole = mywindow.document.createElement('input');
	pole.setAttribute("type", "hidden");
	pole.setAttribute("name", nazwa);
	pole.setAttribute("value", wartosc);
	formularz.appendChild(pole);
	}

// Odkodywanie informacji o nazwie planety i jej kordach
var rx1 = new RegExp('Raport szpiegowski z ([^\t\r\n\v\f\[]+) .([0-9]):([0-9]+):([0-9]+)]');
var wynik = rx1.exec(getElementByClass('infohead').getElementsByTagName('table')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML);
var nazwa = wynik[1]; // moga byc polskie znaki i spacja
var galaktyka = wynik[2];
var uklad = wynik[3];
var pozycja = wynik[4];

// Odkodowywanie daty
var rx2 = new RegExp('([0-9]+)\.([0-9]+)\.([0-9]+) ([0-9]+:[0-9]+:[0-9]+)');
var wynik2 = rx2.exec(getElementByClass('infohead').getElementsByTagName('table')[0].getElementsByTagName('tr')[3].getElementsByTagName('td')[0].innerHTML);
var data_aktualizacji = wynik2[3]+'-'+wynik2[2]+'-'+wynik2[1]+' '+wynik2[4];

// Odkodowywanie loginu gracza
rx_gracz = new RegExp('\(Gracz \'([^\t\r\n\v\f\[]+)\'\)')
var wynik2 = rx_gracz.exec(getElementByClass('material spy').getElementsByTagName('tr')[0].innerHTML);
var gracz = wynik2[2];

// Ustalanie typu obiektu
var typ = 'Planeta'; // domysnie

// Pobieranie surowców
var metal = duze_liczby(getElementByClass('fragment spy2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML);
var krysztal = duze_liczby(getElementByClass('fragment spy2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[3].innerHTML);
var deuter = duze_liczby(getElementByClass('fragment spy2').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);

// Tworzenie formularza
var formularz = mywindow.document.createElement('form');
formularz.setAttribute("method", "POST");
formularz.setAttribute("accept-charset", "iso-8859-2");
formularz.setAttribute("action", adres_systemu_api+"/skan.php");
var div_center = mywindow.document.createElement('div');
div_center.style.textAlign="center";
mywindow.document.getElementById('messagebox').insertBefore(div_center, null);
div_center.insertBefore(formularz, null);

//alert("Lista\nNazwa obiektu = "+nazwa+"\nGalaktyka = "+galaktyka+"\nUklad = "+uklad+"\nPozycja = "+pozycja+"\nData = "+data_aktualizacji+"\nGracz = "+gracz+"\nMetal = "+metal+"\nKryształ = "+krysztal+"\nDeuter = "+deuter);

// Pobieranie możliwych danych z raportu szpiegowskiego
poziom = getElementByClass2('fleetdefbuildings spy').length;
switch (poziom)
	{
	case 4:
	var tech_bojowa = 0;
	var tech_ochronna = 0;
	var tech_opancerzenia = 0;
	var tablica = getElementByClass2('fleetdefbuildings spy')[3].getElementsByTagName('td');
	ile = (getElementByClass2('fleetdefbuildings spy')[3].getElementsByTagName('td').length);
	for(i = 0; i <= ile-1; i++,i++)
 		{
		//alert(i);
		if (tablica[i].innerHTML == "Technologia bojowa")
			{
			tech_bojowa = tablica[i+1].innerHTML;
			}
		if (tablica[i].innerHTML == "Technologia ochronna")
			{
			tech_ochronna = tablica[i+1].innerHTML;
			}
		if (tablica[i].innerHTML == "Opancerzenie")
			{
			tech_opancerzenia = tablica[i+1].innerHTML;
			}
		}
	dodaj_pole("tech_bojowa", tech_bojowa);
	dodaj_pole("tech_ochronna", tech_ochronna);
	dodaj_pole("tech_opancerzenia", tech_opancerzenia);
	//alert("Lista technologi\nTech Bojowa = "+tech_bojowa+"\nTech Ochronna = "+tech_ochronna+"\nTech Opancerzenia = "+tech_opancerzenia);
	
	case 3:
	tablica = getElementByClass2('fleetdefbuildings spy')[2].getElementsByTagName('td');
	ile = getElementByClass2('fleetdefbuildings spy')[2].getElementsByTagName('td').length;
	for(i=0;i<=ile-1;i++,i++)
 		{
		if (tablica[i].innerHTML == "Stacja księżycowa")
			{
			typ = "Księżyc";
			}
		}
	//alert("Typ obiektu = "+typ);
		
	case 2:
	var wr = 0;
	var ll = 0;
	var cl = 0;
	var dg = 0;
	var dj = 0;
	var wp = 0;
	var mp = 0;
	var dp = 0;
	var pr = 0;
	var rm = 0;
	tablica = getElementByClass2('fleetdefbuildings spy')[1].getElementsByTagName('td');
	ile = getElementByClass2('fleetdefbuildings spy')[1].getElementsByTagName('td').length;	
	for(i=0;i<=ile-1;i++,i++)
 		{
 		//alert(i);
		if (tablica[i].innerHTML == "Wyrzutnia rakiet")
			{
			wr = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Lekkie działo laserowe")
			{
			ll = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Ciężkie działo laserowe")
			{
			cl = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Działo Gaussa")
			{
			dg = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Działo jonowe")
			{
			dj = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Wyrzutnia plazmy")
			{
			wp = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Mała powłoka ochronna")
			{
			mp = tablica[i+1].innerHTML;
			}
		if (tablica[i].innerHTML == "Duża powłoka ochronna")
			{
			dp = tablica[i+1].innerHTML;
			}
		if (tablica[i].innerHTML == "Przeciwrakieta")
			{
			pr = tablica[i+1].innerHTML;
			}
		if (tablica[i].innerHTML == "Rakieta międzyplanetarna")
			{
			rm = tablica[i+1].innerHTML;
			}
		}
	dodaj_pole("wr", wr);
	dodaj_pole("ll", ll);
	dodaj_pole("cl", cl);
	dodaj_pole("dg", dg);
	dodaj_pole("dj", dj);
	dodaj_pole("wp", wp);
	dodaj_pole("mp", mp);
	dodaj_pole("dp", dp);
	dodaj_pole("pr", pr);
	dodaj_pole("rm", rm);
	//alert("Lista obrona\nWR = "+wr+"\nLL = "+ll+"\nCL = "+cl+"\nDG = "+dg+"\nDJ = "+dj+"\nWP = "+wp+"\nMP = "+mp+"\nDP = "+dp+"\nPR = "+pr+"\nRM = "+rm);

	case 1:
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
	tablica = getElementByClass2('fleetdefbuildings spy')[0].getElementsByTagName('td');
	ile = getElementByClass2('fleetdefbuildings spy')[0].getElementsByTagName('td').length;	
	for(i=0;i<=ile-1;i++,i++)
 		{
 		//alert(i);
		if (tablica[i].innerHTML == "Mały transporter")
			{
			mt = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Duży transporter")
			{
			dt = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Lekki myśliwiec")
			{
			lm = duze_liczby(tablica[i+1].innerHTML);
			}
 		if (tablica[i].innerHTML == "Ciężki myśliwiec")
 			{
			cm = duze_liczby(tablica[i+1].innerHTML);
 			}
 		if (tablica[i].innerHTML == "Krążownik")
 			{
			k = duze_liczby(tablica[i+1].innerHTML);
 			}
		if (tablica[i].innerHTML == "Okręt wojenny")
			{
			ow = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Recykler")
			{
			rec = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Bombowiec")
			{
			bom = duze_liczby(tablica[i+1].innerHTML);
			}
	 	if (tablica[i].innerHTML == "Pancernik")
	  		{
			pan = duze_liczby(tablica[i+1].innerHTML);
	  		}
		if (tablica[i].innerHTML == "Niszczyciel")
			{
			nisz = duze_liczby(tablica[i+1].innerHTML);
			}
		if (tablica[i].innerHTML == "Gwiazda Śmierci")
			{
			gs = duze_liczby(tablica[i+1].innerHTML);
			}
		}
	dodaj_pole("mt", mt);
	dodaj_pole("dt", dt);
	dodaj_pole("lm", lm);
	dodaj_pole("cm", cm);
	dodaj_pole("k", k);
	dodaj_pole("ow", ow);
	dodaj_pole("rec", rec);
	dodaj_pole("bom", bom);
	dodaj_pole("pan", pan);
	dodaj_pole("nisz", nisz);
	dodaj_pole("gs", gs);
	//alert("Lista floty\nMT = "+mt+"\nDT = "+dt+"\nREC = "+rec+"\nLM = "+lm+"\nCM = "+cm+"\nK = "+k+"\nOW = "+ow+"\nPAN = "+pan+"\nBOM = "+bom+"\nNISZ = "+nisz+"\nGS = "+gs);
	
	case 0:
	dodaj_pole("nazwa", nazwa);
	dodaj_pole("galaktyka", galaktyka);
	dodaj_pole("uklad", uklad);
	dodaj_pole("pozycja", pozycja);
	dodaj_pole("data_aktualizacji", data_aktualizacji);
	dodaj_pole("gracz", gracz);
	dodaj_pole("metal", metal);
	dodaj_pole("krysztal", krysztal);
	dodaj_pole("deuter", deuter);
	break;
	}

// Tworzenie listy wybierającej określającą typ i wybranie księżyca jeżeli jest stacja księżycowa
var opcja_planeta_ksiezyc = mywindow.document.createElement('select');
opcja_planeta_ksiezyc.setAttribute("name", "typ");
opcja_planeta_ksiezyc.setAttribute("size", "1");
opcja_planeta_ksiezyc.options[0] = new Option('Planeta', 'Planeta');
opcja_planeta_ksiezyc.options[1] = new Option('Księżyc', 'Księżyc');
if (typ == "Planeta")
	{
	opcja_planeta_ksiezyc.options[0].selected = true;
	}
else if (typ == "Księżyc")
	{
	opcja_planeta_ksiezyc.options[1].selected = true;
	}
else
	{
	alert("Nie rozpoznano typu obiektu");
	}
formularz.appendChild(opcja_planeta_ksiezyc);

// Tworzenie przycisku
var przycisk_wyslij = mywindow.document.createElement('input');
przycisk_wyslij.setAttribute("type", "submit");
przycisk_wyslij.setAttribute("value", "Aktualizuj skan tego celu");
formularz.appendChild(przycisk_wyslij);
