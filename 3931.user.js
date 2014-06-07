// ==UserScript==
// @name          Wykop.pl - Favourites.
// @namespace     http://www.KKKas.info/wykop-favourites.user.js
// @author        Kacper 'KKKas' Kwapisz http://www.KKKas.info
// @description   Choose your favourite links.
// @description   2006-04-25, 09:30:09
// @include       http://www.wykop.pl/*
// ==/UserScript==

function FavouriteClick(e) {
	var img = e.target;
	var val = false;
	var match = /(\d+);(.+)$/.exec(img.alt); // numer linka i jego tytul jest w alt="" rozdzielony ;
	var num = match[1];
	var title = match[2];

	val = GM_getValue("wykopFavourite" + num, false) == false;

	// zapisz numer ze stanem i tytul linka
	GM_setValue("wykopFavourite" + num, val);
	GM_setValue("wykopFavouriteTitle" + num, title);

	// ustaw odpowiedni obrazek linkowi
	img.src = 'http://groups.google.com/groups/img/watched_' + (val == true ? "y" : "n") + '.gif';

	// zapisz numer do tablicy nuerow lub nie (jesli istnieje juz)
	var nums = GM_getValue("wykopFavouriteNums", '').split(';'); // pobiera aktualne numery
	var found = false;
	
	// sprawdz czy juz istnieje
	for (i = 0; i < nums.length; i++) {
		if (nums[i] == num) { // znaleziono
			found = true;
			break;
		}
	}

	// jesli nie znaleziono, dodaj i zapisz zmiany
	if (!found) {
		nums.push(num);
		GM_setValue("wykopFavouriteNums", nums.join(';'));
	}
}

function FavouriteMenuClick(e) {
	var content = document.getElementById("content");
	var s = '<div id="infoBigBox"><p>Znajdujesz sie na stronie wygenerowanej przez rozszerzenie Greasemonkey, a dokladnie przez skrypt, ktory powoduje, ze mozesz oznaczac linki jako "ulubione". <i>Przepraszam za brak polskich liter, nie wiem jak to poprawic przy uzyciu JS</i>. Pozdrawiam, <a href="http://www.KKKas.info">Kacper Kwapisz</a></p></div>';

	// pobierz wszystkie ulubione i sformatuj odpowiednio
	var nums = GM_getValue("wykopFavouriteNums", '').split(';'); // pobiera aktualne numery

	for (i = 0; i < nums.length; i++) {
		var val = nums[i];
		if (GM_getValue("wykopFavourite" + val, false) == true) { // jesli jest wlaczone
			s = s + '<h2 class="link-title"><img src="http://groups.google.com/groups/img/watched_y.gif"> <a href="./link/' + val + '.html">' + GM_getValue("wykopFavouriteTitle" + val, '') + '</a></h2><br>';
		}
	}

	// wyswietl wszystkie ulubione
	content.innerHTML = s;
}

// ulubione
var content = document.getElementById("content");

// dodaj tag gwiazdki w odpowiednim miejscu
content.innerHTML = content.innerHTML.replace(/(<li class="vote-buttons" id="voteBtns(\d+)">(.|\n)*?<h2 class="link-title"><a href=".+">(.+))<\/a><\/h2>/g, "$1</a> <img border=0 id=\"favourite_id$2\" alt=\"$2;$4\"></h2>");

// wyszukaj numerow linkow jeszcze raz i ustaw kazdemu zdarzenie "click" i odpowiedni obrazek gwizadki (wlaczony/wylaczony)
var html = content.innerHTML;
while (match = /id="voteBtns(\d+)"/g.exec(html)) {
	var img = document.getElementById("favourite_id" + match[1]); // znajdz obrazek po jego id
	img.src = 'http://groups.google.com/groups/img/watched_' + (GM_getValue("wykopFavourite" + match[1], false) == true ? "y" : "n") + '.gif'; // ustaw odpowiedni obrazek
	img.addEventListener("click", FavouriteClick, false);
}

// dodaj menu u gory
var topmenu = document.getElementById("topmenu");
topmenu.innerHTML = topmenu.innerHTML + '<li><a><img id="favourite_menu" src="http://groups.google.com/groups/img/watched_y.gif"></a></li>';

// ustaw zdarzenie klikniecia na menu ulubionych
var favourite_menu = document.getElementById("favourite_menu");
favourite_menu.addEventListener("click", FavouriteMenuClick, false)
