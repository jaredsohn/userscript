// ==UserScript==
// @name             Skrótek
// @namespace    http://kamdz.pl
// @description     Skrypt pozwala wchodzić na wybrane podstrony przy pomocy skróconych adresów.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.0
// @include           http://*.wykop.pl/mb*
// @include           http://*.wykop.pl/mikro*
// @include           http://*.wykop.pl/ja*
// @include           http://*.wykop.pl/moje*
// @include           http://*.wykop.pl/p*
// @include           http://*.wykop.pl/profil*
// @include           http://*.wykop.pl/d*
// @include           http://*.wykop.pl/z*
// @include           http://*.wykop.pl/dodane*
// @include           http://*.wykop.pl/k*
// @include           http://*.wykop.pl/komenty*
// @include           http://*.wykop.pl/komentarze*
// @include           http://*.wykop.pl/w*
// @include           http://*.wykop.pl/wpisy*
// ==/UserScript==

var main = function () {
	var url = "http://www.wykop.pl/";
	var address = location.href;
	address = address.split('/');
	var abbr = address[3];
	var you = $('a[title="Przejdź do swojego profilu"]').text();
	var nick = address[4] ? address[4] : false;
	
	if (abbr == "mb" || abbr == "mikro")
		window.location.replace(url + "mikroblog");
		
	if (abbr == "ja")
		window.location.replace(url + "ludzie/" + you);	
		
	if (abbr == "moje")
		window.location.replace(url + "ludzie/dodane/" + you);	
	
	if (abbr == "p" || abbr == "profil")
		if (nick)
			window.location.replace(url + "ludzie/" + nick);	
		else
			window.location.replace(url + "ludzie/" + you);	
	
	if (abbr == "d" || abbr == "dodane" || abbr == "z")
		if (nick)
			window.location.replace(url + "ludzie/dodane/" + nick);	
		else
			window.location.replace(url + "ludzie/dodane/" + you);	
			
	if (abbr == "k" || abbr == "komenty" || abbr == "komentarze")
		if (nick)
			window.location.replace(url + "ludzie/komentowane/" + nick);	
		else
			window.location.replace(url + "ludzie/komentowane/" + you);					
			
	if (abbr == "w" || abbr == "wpisy")
		if (nick)
			window.location.replace(url + "ludzie/wpisy/" + nick);	
		else
			window.location.replace(url + "ludzie/wpisy/" + you);					
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)