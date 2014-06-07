// ==UserScript==
// @name		[PG] x-tra staedtewahl
// @namespace	[http://thx.spacequadrat.de] [http://userscripts.org/]
// @namespace	autor: das_bazie
// @description	erzeugt ein staedteswitch auf der neuen PG  auslogseite
// @version		1.1
// @include		*auskunft.de/*
// ==/UserScript==

var select = "<option selected value=\"#\">Stadt w&auml;hlen</option>"
var select_0 = "<option value=\"#\">## ## ##</option>"
var select_1 = "<option value=\"http://www.pennergame.de\">Hamburg</option>"
var select_2 = "<option value=\"http://berlin.pennergame.de\">Berlin</option>"
var select_3 = "<option value=\"http://muenchen.pennergame.de\">M&uuml;nchen</option>"
var select_4 = "<option value=\"http://www.menelgame.pl\">Polen</option>"
var select_5 = "<option value=\"http://www.clodogame.fr\">Paris</option>"
var select_6 = "<option value=\"http://www.mendigogame.es\">Madrid</option>"
var select_7 = "<option value=\"http://www.dossergame.co.uk\">London</option>"
var select_8 = "<option value=\"http://www.serserionline.com\">Istanbul</option>"
var select_9 = "<option value=\"http://www.bumrise.com\">New York</option>"

var switchLink = "<br/><br/>CitySwitch => <select onChange=\"document.location.href=this.value\">"+select+select_0+select_1+select_2+select_3+select_4+select_5+select_6+select_7+select_8+select_9+"</select>";

document.getElementById("login_form").innerHTML = switchLink;