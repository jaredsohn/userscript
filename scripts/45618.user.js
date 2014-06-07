// ==UserScript==
// @name           Lepsza Galeria Nasza-klasa.pl
// @namespace      www.horacy.art.pl/full-allegro-archive-koniec-z-aukcjami-przeniesionymi-do-archiwum/ lub horacy007@gmail.com
// @description    Skrypt sprawia, ze przeglądanie galerii użytkowników w serwisie www.nasza-klasa.pl jest o wiele bardziej wygodne. Standardowo nasza-klasa wyświetla 9 zdjęc użytkownika na każdej z podstron galerii. Dzięki temu skryptowi cała galeria, wraz ze wszystkimi zdjęciami ze wszystkich podstron galerii, wyświetlana jest na raz.
// @include        http*://*nasza-klasa.pl/*
// History
// v. 0.777 - 2009.05.19
// - Przywrócone działanie dla nowej odsłony portalu nasza-klasa (w nowych galeriach zmieniono wewnętrzną strukturę DIVów, usunięto tabelki, itd.)
// - Wspierana obsługa sortowania po komentarzach i dacie dodania
// v. 0.666 - 2009.03.03 :
// - Pierwsza wersja skryptu
// TODO:
// - 
// - Czekam na sugestie.
// - nie działa na operze (NULL NULL), a na firefoxie przecinki i podwojenie
// - Dodanie obsługi błędów, gdy serwer chwilowo nie odpowiada
// - obsługa Opery i IE

// ==/UserScript==
(function()
{
// Skrypt wykonujemy tylko dla podstron z galeriami
if(document.location.href.indexOf("/gallery")!=-1)
{
	var user = document.location.href.match(/[0-9]+/);
// sprawdzanie czy to jest album, czy nie ma albumu
	var album = document.location.href.match(/album\/[0-9]+/);
	if (album != null)
	{
	album = "/"+album;
	// Sczytywanie ilości podstron galerii (tutaj jest w innych divach)
	numerPodstronyGalerii = document.evaluate("//body/div[@id='album_view']/div[@id='page']/div[@id='page_content']/div[@id='content_main']/div[2]/div[2]/div/div[2]/div[3]/a/span",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		    	// Sprawdzamy, czy numer otwartej strony galerii, który nie jest linkiem nie jest najwyższym numerem. Potrzebne jest to po to, by obrazki z ostatniej podstrony galerii też się wyświetlały w razie otwartej ostatniej podstrony galerii.
		otwartaPodstronaGalerii = document.evaluate("//body/div[@id='album_view']/div[@id='page']/div[@id='page_content']/div[@id='content_main']/div[2]/div[2]/div/div[2]/div[3]/strong",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	else
	{
	album = '';
	// Sczytywanie ilości podstron galerii
	numerPodstronyGalerii = document.evaluate("//body/div[@id='album_view']/div[@id='page']/div[@id='page_content']/div[@id='content_main']/div[2]/div[2]/div/div[1]/div[4]/a/span",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		    	// Sprawdzamy, czy numer otwartej strony galerii, który nie jest linkiem nie jest najwyższym numerem. Potrzebne jest to po to, by obrazki z ostatniej podstrony galerii też się wyświetlały w razie otwartej ostatniej podstrony galerii.
		otwartaPodstronaGalerii = document.evaluate("//body/div[@id='album_view']/div[@id='page']/div[@id='page_content']/div[@id='content_main']/div[2]/div[2]/div/div[1]/div[4]/strong",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}
	//alert(album);
	// ustawianie wlasciwego sortowania
	var sortowanie = document.location.href.match(/order_by=id|order_by=id2|order_by=comment/);
	if (sortowanie != null) sortowanie = "&"+sortowanie;
	else sortowanie = '';
	//alert(sortowanie);
	
	
	var nrOstatniejGalerii = 1;	
	var doczepianaTresc='';


	
	for (var i = 0; i < numerPodstronyGalerii.snapshotLength; i++)
	{
		if (nrOstatniejGalerii < numerPodstronyGalerii.snapshotItem(i).innerHTML)
		{
			nrOstatniejGalerii = numerPodstronyGalerii.snapshotItem(i).innerHTML;
		}
		
	}
	

	
	for (var i = 0; i < otwartaPodstronaGalerii.snapshotLength; i++)
	{
		if (nrOstatniejGalerii < otwartaPodstronaGalerii.snapshotItem(i).innerHTML)
		{
			nrOstatniejGalerii = otwartaPodstronaGalerii.snapshotItem(i).innerHTML;
		}

	}
	
	//alert(nrOstatniejGalerii); // SPRAWDZENIE CZY PRAWIDŁOWO POKAZUJE OSTATNIĄ STRONĘ GALERII
	
	// Musimy pobrać wszystkie tabelki z każdej z podstron galerii
	for (var i = 1; i <= nrOstatniejGalerii; i++)
	{
		// Synchronicznie (bo skrypt musi zaczekac na wszystkie dane) pobieramy zawartośc strony galerii
		var strona = new XMLHttpRequest();
		
		// sortowanie po komentarzach
		//strona.open("GET", "http://nasza-klasa.pl/profile/"+user+"/gallery?order_by=comment&page="+i, false);
		// Zapytanie do wysyłania - link.
		strona.open("GET", "http://nasza-klasa.pl/profile/"+user+"/gallery"+album+"?page="+i+sortowanie, false);
		strona.send(null);
		var przetwarzana = strona.responseText;
		tabelka =  przetwarzana.match(/<div class="grid">[\s\S]*<\/div>/);
		// Dodawanie linka POWERED BY na każdą dodaną podstronę)
		if (i > 1 )
		{
			doczepianaTresc += '<p style=" border-bottom: 1px solid grey; padding-bottom:5px;border-left: 10px solid black; padding-left: 20px; "><a style="color:darkred;" href="http://www.horacy.art.pl/lepsza-galeria-nasza-klasa-pl-skrypt/" style="text-decoration:none;">Strona '+i+'  :: Wspierane przez Lepsza Galeria script</a></p>'
		}
		// Dodawanie tabelki ze zdjęciami z kolejnych podstron
		doczepianaTresc = doczepianaTresc + tabelka;
		
		
	}
	
	// DOCZEPIANIE OBRAZKOW NA KONIEC
	// zaczepDivaZObrazkami = document.evaluate(
	// "//div[@id='photos']",
	// document,
	// null,
	// XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	// null);
	
	// for (var i = 0; i < zaczepDivaZObrazkami.snapshotLength; i++)
	// {
    	// thisAukcja = zaczepDivaZObrazkami.snapshotItem(i);
		// var info = document.createElement('dupa');
		// info.innerHTML = doczepianaTresc;
		// thisAukcja.appendChild(info);
	// }
	
	// console.log(doczepianaTresc);
	
		zaczepDivaZObrazkami = document.evaluate(
	"//div[@class='grid']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	for (var i = 0; i < zaczepDivaZObrazkami.snapshotLength; i++)
	{
    	thisAukcja = zaczepDivaZObrazkami.snapshotItem(i);
		thisAukcja.innerHTML = doczepianaTresc;
	}
	
	//console.log(doczepianaTresc);
	
}



}) ();
