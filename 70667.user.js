// ==UserScript==
// @name           Balk tekst
// @namespace      ...
// @include        *
// ==/UserScript==

var i = 0

var a = 0

var drp = document.getElementById('menu_row2').cells[3].firstChild.innerHTML;

var coor = document.getElementById('menu_row2').cells[4].firstChild.innerHTML;

var srv = document.location.href.match(/nl(\d+)\D*\.tribalwars\./)[1];

var hout = document.getElementById('wood').innerHTML;

var leem = document.getElementById('stone').innerHTML;

var ijzer = document.getElementById('iron').innerHTML;

var vi = 0
var bo = ['main', 'barracks', 'stable', 'garage', 'snob', 'smith', 'place', 'market', 'wood', 'stone', 'iron', 'farm', 'storage', 'hide', 'settings', 'help2', 'premium', 'ranking', 'ally&mode=forum', 'info_ally', 'report', 'mail', 'buddies', 'info_player', 'ally', 'overview', 'map']
var bonl = ['Hoofdgebouw', 'Kazerne', 'Stal', 'Werkplaats', 'Adelshoeve', 'Smederij', 'Verzamelplaats', 'Markt', 'Houthakkers', 'Leemgroeve', 'Ijzermijn', 'Boerderij',  'Opslagplaats', 'Schuilplaats', 'Instellingen', 'Hulp', 'Premium', 'Ranglijst', 'Stammenforum', 'Stam', 'Berichten', 'Medelingen', 'Vrienden', 'Spelerprofiel', 'Stam', 'Overzicht', 'Kaart']
var str = document.location.href;
var bon = 0
var i = 'farm'
var a = 0
var al = 0
var b = 'main'
var bonn = 0
var stop = false
var anti_loop = 0
var hu = 0
var hum = 20


while(b!=bo[bon] || al==0 && stop==false && anti_loop<50){
	var b = str.match(bo[bonn])
		if(b==undefined || b==null){
			bon++
			al++
			bonn++
			anti_loop++
		}else{
			var stop = true
			anti_loop++

		}
	}


var plek = bonl[bonn]

window.status = "Het huidige dorp is |"+drp+"| met de coordianaten |"+coor+"| en je grondstoffen zijn; "+hout+" hout, "+leem+" leem en "+ijzer+" ijzer. @"+plek+", @Wereld "+srv+"";
