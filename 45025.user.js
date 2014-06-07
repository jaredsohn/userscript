// ==UserScript==
// @name Pennergame FastLogin
// @namespace 1334769[Bande:Arschbackenhoernchen]
// @description Mit diesem Script kann man schnell zwischen 5 Acounts wechseln.
// @include http://www.pennergame.de/
// @include http://pennergame*/logout/*
// @include http://*pennergame*/pw_forgotten/*
// @include http://*pennergame*/login/*
// ==/UserScript==

// Penner 1
var PennerName1 = 'kurdenworld'; // Pennername 1
var PennerPass1 = 'kurdistan-welt'; // Passwort von Penner1

// Penner 2 (kann auch ausgelassen werden wenn nur ein Penner vorhanden)
var PennerName2 = 'new1kurde'; // Pennername2
var PennerPass2 = 'kurdistan-welt'; // Passwort von Penner2

// Penner 3 (kann auch ausgelassen werden wenn nur ein Penner vorhanden)
var PennerName3 = 'blutkurde'; // Pennername3
var PennerPass3 = 'kurdistan-welt'; // Passwort von Penner3

// Penner 4 (kann auch ausgelassen werden wenn nur ein Penner vorhanden)
var PennerName4 = 'xxstolzerkurdexx'; // Pennername4
var PennerPass4 = 'kurdistan-welt'; // Passwort von Penner4

// Penner 5 (kann auch ausgelassen werden wenn nur ein Penner vorhanden)
var PennerName5 = 'xxkurdistanxx'; // Pennername5
var PennerPass5 = 'kurdistan-welt'; // Passwort von Penner5

var table = document.getElementsByTagName('form')[0];
	table.innerHTML = 
'<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"4\">'
+
  '<tr>'
  +
    '<td>'
	+
	  '<form method=\"post\" action=\"http://www.pennergame.de/login/check/\">'
	  +
	  '<input id=\"player\" maxlength=\"30\" size=\"15\" type=\"text\" name=\"username\" value=\"'+PennerName1+'\" /><br />'
	  +
	  '<input id=\"password\" maxlength=\"32\" size=\"15\" type=\"password\" name=\"password\" id=\"password\" value=\"'+PennerPass1+'\" />'
	  +
	  '<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" />'	
	  +
	  '</form>'	
	  +
	'</td>'
	+
  '</tr>'
  +
  '<tr>'
  +
    '<td>'
	+
	  '<form method=\"post\" action=\"http://www.pennergame.de/login/check/\">'
	  +
	  '<input id=\"player\" maxlength=\"30\" size=\"15\" type=\"text\" name=\"username\" value=\"'+PennerName2+'\" /><br />'
	  +
'<input id=\"password\" maxlength=\"32\" size=\"15\" type=\"password\" name=\"password\" id=\"password\" value=\"'+PennerPass2+'\" />'
	  +
	  '<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" />'
	  +
	  '</form>'	
	  +
	'</td>'
	+
  '</tr>'
  +
  '<tr>'
  +
    '<td>'
	+
	  '<a class=\"forgotten\" href=\"http://www.pennergame.de/pw_forgotten/\">Passwort vergessen</a>'
	  +
	'</td>'
	+
  '</tr>'
  +
var table = document.getElementsByTagName('form')[0];
	table.innerHTML = 
'<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"4\">'
+
  '<tr>'
  +
    '<td>'
	+
	  '<form method=\"post\" action=\"http://www.pennergame.de/login/check/\">'
	  +
	  '<input id=\"player\" maxlength=\"30\" size=\"15\" type=\"text\" name=\"username\" value=\"'+PennerName3+'\" /><br />'
	  +
	  '<input id=\"password\" maxlength=\"32\" size=\"15\" type=\"password\" name=\"password\" id=\"password\" value=\"'+PennerPass1+'\" />'
	  +
	  '<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" />'	
	  +
	  '</form>'	
	  +
	'</td>'
	+
  '</tr>'
  +
  '<tr>'
  +
    '<td>'
	+
	  '<form method=\"post\" action=\"http://www.pennergame.de/login/check/\">'
	  +
	  '<input id=\"player\" maxlength=\"30\" size=\"15\" type=\"text\" name=\"username\" value=\"'+PennerName4+'\" /><br />'
	  +
'<input id=\"password\" maxlength=\"32\" size=\"15\" type=\"password\" name=\"password\" id=\"password\" value=\"'+PennerPass2+'\" />'
	  +
	  '<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" />'
	  +
	  '</form>'	
	  +
	'</td>'
	+
  '</tr>'
  +
  '<tr>'
  +
    '<td>'
	+
	  '<a class=\"forgotten\" href=\"http://www.pennergame.de/pw_forgotten/\">Passwort vergessen</a>'
	  +
	'</td>'
	+
  '</tr>'
  +
'<input id=\"password\" maxlength=\"32\" size=\"15\" type=\"password\" name=\"password\" id=\"password\" value=\"'+PennerPass5+'\" />'
	  +
	  '<input class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"Login\" />'
	  +
	  '</form>'	
	  +
	'</td>'
	+
  '</tr>'
  +
  '<tr>'
  +
    '<td>'
	+
	  '<a class=\"forgotten\" href=\"http://www.pennergame.de/pw_forgotten/\">Passwort vergessen</a>'
	  +
	'</td>'
	+
  '</tr>'
  +
'</table>';