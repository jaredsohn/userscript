// ==UserScript==
// @name           Shacknews Name Color Friend Foe
// @namespace      http://troz.shackspace.com
// @description    Colors user account names for shacknews.com comments system.
// @version	1.72
// @include        http://*.shacknews.com/chatty*
// @include        http://shacknews.com/chatty*
// @include        http://shacknews.com/settings
// @include        http://*.shacknews.com/settings
// @match        http://*.shacknews.com/chatty*
// @match        http://shacknews.com/chatty*
// @match        http://shacknews.com/settings
// @match        http://*.shacknews.com/settings

// ==/UserScript==
/*

Thanks to Tissen for the idea and inspiration to implement a beter method for coloring the usernames
Thanks to ThomW for the borrowed code and much assistance and for comments and suggestions to improve the script. 

Version history:
1.0  2008-2-27:
Name coloring
Employee/Mod highlighting
Friend/Foe list
Self Highlighting
Menu for friend/foe changes, and usefull links.

1.1 2008-2-29:
Bugfix for bad SM/comment history links
Added Shackspace link for mercury users with lightning bolt enabled
Added Thread Starter Highlighting (thanks for suggestion DrWaffles!)

1.2 2008-5-30
Fix for new profile links.

1.3 2009-1-20
Updated to work beter with anthonybean's inline profile info script.

1.4 2010-1-22
Modified Name coloring so that it can be done only on mouse over of a name and updated names list

1.5 2010-2-2
GoogleChrome Day  Added support of The Shack Google Chrome Extension, improved performance of Hover Highliting (added .5 sec lag before doing highlight)

1.6 2010-4-16 
Really supporting Chrome now as a user script!

1.7 2011-2-23 NEVAR FORGET!
New shack update

1.72 2011-3-3
minor updates including correct Chrome limiting to shacknews.com

1.8 2012-1-21
Changes to support chattyprofil.es, since profiles don't seem to be coming back.

//add icon next to name
style="padding: 0px 20px 0px 0px; background-repeat: no-repeat; background-position: top right; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABgFBMVEUCBQEABQkABwoIBQoEBwICCAwFCAQLBw0GDA8KDAgMDwsOEAwPEQ0SFBETFBIVFhQWGBUZGxgaGyIdHxwfIB4gIR8iJCEjJCIlJi0lJyQmKCUnKCYoKScpKygrLSovMS4zNDI0NjM3OTY9Pzw+QD1AQT9BQkBBQ0FDRUJJSkhKTEpPUE7zKQBRU1BWWFVcWl1cXltfYGhlZFxmZ2VqbGl0dnN5e3h8fYaBf4N7goqAgn98g4uCg4F9hIx+hY2CiZGEjJOOkI2Lk5qNlZyUlpOVl5SbnZmdn5yfoZ6ho6CipKGnpKmpp6ulqq2rqa2sqq6nrK+rraqtr6yysLSytLGxtri0uby7vbq8vru8wcPBw8DFwsfExsPIxcrGyMXIysfGzM7LzsrNz8vP0c7Q0s/T1dLU1tPV19TY2tbZ29fa3Nnc3trd39ze4N3f4d7i5OHl5+Pm6OXn6ebo6ufp6+jr7enu8e3w8u/09/P2+PT4+vf5+/j6/Pn7/fr8//v+//xbJjLjAAAA/klEQVQoz22RPy9EURQH55537FqLYiMkaCgRjcT3/wJC1AqJRCdr/Xne3nfP+alomGbaScYv+IuzUkFFhR/HwhGCbvYO3XwlhOGg0nx+edP76eSzNQcchaPPenZ3fHQ/FloHTt2cmvzh+urgvt9C0ScOi8udIHcPhpPzVFndLnE43OtIlYF9ZLH9vMSRMfstjK9xbDjZgDSDTEUbEpxwSEiLrMErSpyhgpGKqPQwquJsqKaowfAx720c5Thf02x1Pe3tw96js5I9Di+LNxiARlhONcHhUdsKWAOorJ8qTlndgSUFUHY0w1E1p5KbdVIthQwnPLMVDMYCMoTzz49vi7GXzRBWbV0AAAAASUVORK5CYII=);"
*/

//console.log("new stuff here");

if( !(typeof script_enabled == 'function') || script_enabled('friendfoe') == true){

	// @copyright      2009, James Campos
	// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}
		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}
		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}
		GM_log = function(message) {
			console.log(message);
		}
		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}


	var employees = new Array(
		"4"		, // Steve Gibson
		"43653" 	, // Maarten Goldstein
		"175043"	, //Chris Faylor
		"175046"	, //Nick Breckon
		"188134"	, //Aaron Linde
		"204735"	, //Alice O'Connor
		"213066"	, //Jeff Mattas
		"212323"	, //Garnett Lee
		//"170820"	, //empathe "Brian Leahy"
		"217677"	, //the real Brian Leahy
		"44124"	  	,//sHugamom
		"223050"	, // XAVdeMATOS
		"14475"		,//"SHACKNEWS" front page story poster
		"206899"	,//ECO
		"227220"	,//Ackbar2020
		"203311",	//greg-m
		"226769",	//SporkyReeve   (Steve Watts?)
		"10005228"  //AndrewYoon
	);

	var mods = new Array(
		"168479", // ajax
		"6585"  , // carnivac
		"3259"  , // degenerate
		"168256", // edgewise
		"169197", // filtersweep
		"9980"  , // haiku
		"44583" , // jokemon
		"3243"  , // p[multisync]p
		"6674"  , // pupismyname
		"8349"  , // sexninja!!!!
			"194196", //ninjase - same person as sexninja according to http://shackwiki.com/wiki/Name_Changes
		"32016" , // thekidd
		"1194"  , // zakk
		
		"171402", // brickmatt
		"8048"  , // cygnus x-1
		"6380"  , // dognose
		"167953", // edlin
		"12398" , // geedeck
		"171127", // helvetica
			"7861", //zerologik - previous name (seems to be pre mod) according to http://shackwiki.com/wiki/Name_Changes
		"7570"  , // kaiser
		"8316"  , // paranoid android
		"169049", // rauol duke
		"7660"  , // sexpansion pack
		"6933"  , // tomservo
		
		"9085"  , // busdriver3030
		"5334"  , // dante
		"10028" , // drucifer
		"7438"  , // enigmatic
		"169489", // s[genjuro]s
		"8105"  , // hirez
		"5278"  , // lacker
		"9031"  , // portax
		"9211"  , // redfive
		"169927", // sgtsanity
		"15130" , // utilitymaximizer
		
		"169942",  //mikecyb - not listed on mod page
		"185650" //Dave-A - also not listed
	);

	var fabulous = '168102,28220,3243'//polansk,korban,multisync
	var celeb = '';
	var greasemonkeydev = '5317,173455,172676,6317,171082,4245,2536,161569,182981,177008';//From Dodob's profile: ThomW,MisterPhoton,naabster,dodob,Pieman,Tissen,Troz,ieGod,OverloadUT,arhughes
	var kickassnogum = '6380';//dognose
	//game developer is from sharkii's profile
	//http://shackwiki.com/wiki/Game_Industry_Shackers
	var gamedeveloper = '4957,171370,'+//2k Games   jason bergman,  dahanese
		'182981,'+//2K Sports OverloadUT
		'175229,'+  //343 Industries  gigaduck 
		'168928,13098,7048,171248,169937,173984,'+//3D Realms  eskimo spy, georgeb3dr - George Broussard, Joe3DR - Joe Siegler, Mr. 9000 - John Schuch, Scatti, ScottMi11er - Scott Miller
		'169686,'+//Airtight Games  Dravalen
		'119968,'+//Affectworks  fredrik s
		'32598,'+//Artificial Mind & Movement  derean
		'4929,'+//Atari (Dallas)  YoYo
		'174434,170554,'+//Bethesda Softworks  lplasmatron, speon - (actually, seems that Jason bergman is here now - currently listed in the 2K Games)
		'172526,'+//Big Bang Entertainment threeup(was at hb-studios)
		'8085,'+//Bioware  Derek French ( a BioSector is also listed, but seems to have no posts)
		'168742,'+//Bungie  dmiller - Dan Miller
		'14633,'+//Buzz Monkey Software  Karnov
		'170764,12418,'+//Digital Illusions CE (dice) (Sweden)   aavenr, -efx-
		'270,'+//EA Canada (PSP)   timmie
		'4312,170275,'+//Epic   CliffyB - Cliff Bleszinski, fufux
		'175192,'+//Free Radical Design  jbury
		'186653,'+//Flagship Studios  Ivan Sulic
		'7466,'+//No longer exists - detached seems to not be at another company though, so leaving him here '173003,172749,'+//GarageGames  d3tached - (Torque X), sullisnack - Sean Sullivan, timaste - Tim Aste
		'4605,'+//Gas Powered Games  hellchick - Caryn Law
		'3829,169955,171337,6020,168552,172976,166528,4178,4,'+//Gearbox Software  rickmus, byorn, DaMojo - Pat Krefting, duvalmagic - Randy Pitchford, kungfusquirrel, MADMikeDavis, mikeyzilla - Mike Neumann, wieder - Charlie Wiederhold, the Gibson
		'168561,'+// High Voltage Software  Bantis 
		'171752,19054,'+//Human Head  lvlmaster, zeroprey
		'170311,3982,4916,'+//Id Software  patd - Patrick Duffy, toddh - Todd Hollenshead, xian - Christian Antkow
		'102,21915,119746,'+//Infinity Ward  Avatar, DKo5, Inherent
		'173164,'+//Insomniac Games - lowpoly 
		'169079,'+//Massive Entertainment  SilverSnake
		'12865,'+//Monolith  cannelbrae
		'183170,172349,'+//Naughty Dog  Cowbs (previously known as cpnkegel)
		'1347,'+//NCSoft  Zoid - Dave Kirsch
		'12631,'+//Nerve Software  Normality - Joel Martin
		//','+//Nintendo America - Argona (but seemingly no posts)
		'3750,'+//Obsidian Entertainment Jabby 
		'12656,'+//Online Alchemy  KnyteHawkk 
		'12963,6507,27483,169925,11816,4257,'+//Pandemic Studios  darweidu, Freshview, gndagger, Rampancy, sammyl, tostador
		'170163,'+//Piranha Games  Buckyfg1
		'4262,'+//Planet Moon  cheshirecat
		'173003,172749,'+//PushButton Labs sullisnack - Sean Sullivan, timaste - Tim Aste
		'171863,'+//Red 5 Studios rgoer 
		'14033,'+//Remedy Entertainment  PetriRMD - Petri Jarvilehto(?)
		'8202,2025,'+//Retro Studios  Andy Hanson - Andy Hanson, Jack Mathews - Jack Mathews
		'169919,'+//Rockstar Games  bozer
		'169712,'+//S2 Games  s2jason - Jason
		'171285,'+//Slant Six  bakanoodle
		'171466,'+//Stardock  mittense
		'173743,'+//Stray Bullet Games  AshenTemper - Sean Dahlberg
		'172702,13334,169942,'+//TellTale Games  dtabacco, jake2000 - Jake Rodkin, mikecyb
		'173748,'+//ThreeWave Software  brome - Adam Bromell
		'172581,8048,'+//Treyarch  Krypt_ - Brian Glines  Cygnus X-1
		'6358,'+//Trauma Studios  Ease_One
		'171762,168242,'+//UbiSoft  mnok, MrLobo
		'173884,12149,125906,173374,190115,'+//Valve  Doug_Support - Doug Valente (Support), Erik Johnson - Erik Johnson, garymct - Gary McTaggart, locash - Patrick M (Support), RobinWalker
		'170008,'+//Vicarious Visions  smalakar 
		'170414,9172,'+//Vivendi Universal  ColoradoCNC, Pezman
		'12656,'+//Zemnott  KnyteHawkk - Jared Larsen
		'49660,169993,174785,'+//Former Game Indusrty People     Omning, robingchyo, Romsteady
		'169168'// Contract work - mikage Worked on Saints Row 
	;
		
	var buttonStyle = ' width: 20px; height: 20px; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAEVQTFRFBQQDBgYKCAkNCwwNDQ8MFBQUFhYWGhoaHh4eISEhIyMjJCQkJiYmKCgoKioq/wAAxAD/AFb/8C4BDaf/AP8A//QO/Pz85EwMQAAAAHJJREFUGNN10NEOgyAQRNHtShFLEZDF///Ujkk1JKP3bU8mIUG2m2RbqSdM+1gyS8AvBYzXKpZSIgJ+KOBCAcPwTGithQCcKaA/Z7737o+AbwronDu3LueMEzhRQFX9D7XWikuBLwoo1IHjJ4mZydPyph9VMBLCDaQcYAAAAABJRU5ErkJggg==");';	
	
	var colorFrontPage	= 	GM_getValue("colorFrontPage",true);
	var colorNames = 		GM_getValue("colorNames",false);
	var highlightSelf = 	GM_getValue("highlightSelf",true);
	var showEmployees = 	GM_getValue("showEmployees",true);
	var showMods = 			GM_getValue("showMods",true);
	var showFriendFoe = 	GM_getValue("showFriendFoe",true);
	var showImages = 		GM_getValue("showImages",true);
	var menuMouseOver = 	GM_getValue("menuMouseOver",false);
	var hlThreadStarter = 	GM_getValue("hlThreadStarter",true);
	var colorNamesHighlight = GM_getValue("colorNamesHighlight",false);
	var adjustDateTime	= 	GM_getValue("adjustDateTime",false);
	var timeAmPm	= 		GM_getValue("timeAmPm",false);
	//var newsRss	= 			GM_getValue("newsRss",true);
	//var newsInPosts	= 		GM_getValue("newsInPosts",true);
	if(colorNamesHighlight==true){
		colorNames = false;
	}
	GM_log("colorNames = "+colorNames);

	var frontpagecss = 		GM_getValue("frontpagecss",		"background-color: #068 !important; border:1px solid white !important;");
	var friendcss = 		GM_getValue("friendcss",		"background-color: #004000 !important; border: 1px solid #40ff40 !important;");
	var foecss = 			GM_getValue("foecss",			"background-color: #600000 !important; border: 1px solid #ff4040 !important;");
	var other1css = 		GM_getValue("other1css",		"background-color: #000080 !important; border: 1px solid #6060ff !important;");
	var other2css = 		GM_getValue("other2css",		"background-color: #600060 !important; border: 1px solid #ff40ff !important;");
	var employeecss = 		GM_getValue("employeecss",		"text-decoration: overline underline !important;");
	var modcss = 			GM_getValue("modcss",			"border-top: 1px dotted !important; border-bottom: 1px dotted !important;");
	var highlightcss = 		GM_getValue("highlightcss",		"border: 2px solid white !important;");
	var threadstartercss = 	GM_getValue("threadstartercss",	"background-color: #303030 !important; font-size: 125% !important;");
	var colorhighlightcss = GM_getValue("colorhighlightcss","font-weight: bold !important;");

	var image = new Array(16);
	//hey!
	image[0] = 'padding: 0px 5px 0px 5px; background-image: url(data:image/gif;base64,R0lGODlhEgABAKUkADMz/1Uz/3cz/5kz/zNV//8zM7sz//8zVf8zd/8zmd0z//8zu/8z3f8z/zN3//9VMzOZ//93MzO7//+ZMzPd//+7MzP/MzP/VTP/d1X/MzP/mTP/uzP/3Xf/MzP////dM5n/M7v/M93/M///MwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQACgD/ACwAAAAAEgABAAAGEsBCpDIKdSyYjUfiAAgMjQUiCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDH5CMCZS4aDgVCCAwUjMQhCAAh+QQBCgA/ACwAAAAAEgABAAAGEsBIZRTqWDAbj8QBEBgaC0QhCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDJRwTKXDQcCoQQGCgYicMjCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDKKNSxYDYeiQMgMDQWiEIkCAAh+QQBCgA/ACwAAAAAEgABAAAGEsCPCJS5aDgUCCEwUDASh8ckCAAh+QQBCgA/ACwAAAAAEgABAAAGEsBRqGPBbDwSB0BgaCwQhUglCAAh+QQBCgA/ACwAAAAAEgABAAAGEkARKHPRcCgQQmCgYCQOj8knCAAh+QQBCgA/ACwAAAAAEgABAAAGEsBQx4LZeCQOgMDQWCAKkcooCAAh+QQBCgA/ACwAAAAAEgABAAAGEkBQ5qLhUCCEwEDBSBwek48oCAAh+QQBCgA/ACwAAAAAEgABAAAGEsCOBbPxSBwAgaGxQBQilVEoCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDMRcOhQAiBgYKRODwmHxEoCAAh+QQBCgA/ACwAAAAAEgABAAAGEkALZuOROAACQ2OBKEQqo1AnCAAh+QQBCgA/ACwAAAAAEgABAAAGEsCLhkOBEAIDBSNxeEw+IlAmCAAh+QQBCgA/ACwAAAAAEgABAAAGEkDMxiNxAASGxgJRiFRGoY4lCAAh+QQBCgA/ACwAAAAAEgABAAAGEkANhwIhBAYKRuLwmHxEoMwlCAAh+QQBCgA/ACwAAAAAEgABAAAGEsCNR+IACAyNBaIQqYxCHQsmCAAh+QQBCgA/ACwAAAAAEgABAAAGEkAOBUIIDBSMxOEx+YhAmYsmCAAh+QQBCgA/ACwAAAAAEgABAAAGEkCPxAEQGBoLRCFSGYU6FswmCAAh+QQBCgA/ACwAAAAAEgABAAAGEkAKhBAYKBiJw2PyEYEyFw0nCAAh+QQBCgA/ACwAAAAAEgABAAAGEkCJAyAwNBaIQqQyCnUsmI0nCAAh+QQBCgA/ACwAAAAAEgABAAAGEkAIITBQMBKHx+QjAmUuGg4lCAAh+QQBCgA/ACwAAAAAEgABAAAGEkAHQGBoLBCFSGUU6lgwG48kCAAh+QQBCgA/ACwAAAAAEgABAAAGEkBCYKBgJA6PyUcEylw0HAokCAAh+QQBCgA/ACwAAAAAEgABAAAGEkCAwNBYIAqRyijUsWA2HokjCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDAQMFIHB6TjwiUuWg4FAghCAAh+QQBCgA/ACwAAAAAEgABAAAGEkCBobFAFCKVUahjwWw8EgcgCAAh+QQBCgA/ACwAAAAAEgABAAAGEsCBgpE4PCYfEShz0XAoEEIgCAAh+QQBCgA/ACwAAAAAEgABAAAGEkBDY4EoRCqjUMeC2XgkDoAgCAAh+QQBCgA/ACwAAAAAEgABAAAGEkAFI3F4TD4iUOai4VAghMAgCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDGAlGIVEahjgWz8UgcAIEhCAAh+QQBCgA/ACwAAAAAEgABAAAGEkBG4vCYfESgzEXDoUAIgYEiCAAh+QQBCgA/ACwAAAAAEgABAAAGEsAFohCpjEIdC2bjkTgAAkMjCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDE4TH5iECZi4ZDgRACAwUjCAAh+QQBCgA/ACwAAAAAEgABAAAGEkBEIVIZhToWzMYjcQAEhsYiCAAh+QQBCgA/ACwAAAAAEgABAAAGEsDDY/IRgTIXDYcCIQQGCkYiCAA7) !important; color: black !important; background-repeat: repeat !important;';
	//alien
	image[1] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAGBQTFRFAgUBAAEABwkFCQsHDhAMAGYAaWtobnBtc3VyeHp3f4F+hIaDh4mGjY+MkpSRlpiVmpyZnJ6boKKfp6mmrK6rsbOvtbe0uLq3u725vsC9wcO/xMbDxsjFyszJztDM1NbTR/zA1gAAAAF0Uk5TAEDm2GYAAACHSURBVAjXTU/JFoQwCGsOzKLjUgsVa8f+/19OW5cxByB5EMCYDKowJ6hrVb0/BXpaF0Jktwv0Hl0KMifZO8iurD6ypIVq92C3RTUEz0LFDPD+yxKBrfAGhHnVNaexDryKoDmk3e/TA4sCc38sHDreIqfhOqidAG1vBzeTjH+ahYe70/LhUfwATcsH8o6EsR0AAAAASUVORK5CYII=) !important;';
	//beer
	image[2] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAMBQTFRFa1cnHAIBLgcAHyAeXDccTDpHaT8VcEUEZUoAXEwnVExEak1Tg1IBeVYBblU4dFszaWBVlWMEkmUAjWYZnXI7qnoIsINFrIhamZF5wJQCxpZRw5s30JoyxqFQtp+kyqYvxKCOla6apKmlm6yl4K1n0LNz4bFV0LZgybao4L1J0LbNy76/wMmxx8q609a879Gl/dJ5/9Zf8NmU/9ee/duM2Nz52OPo/+de3uv75O3e6fj5//Pt9/T9/vrh8P7v+/z3y7bgTwAAAAF0Uk5TAEDm2GYAAACoSURBVAjXPU9rF0JAFFxNUUIPOSIKPaWil6Ld/P9/lcdqzrkfZu6dM3MJIeAgDXBgRf4t2IcLmLM8zTOmtfx8yd8pHcSNA/7pnL6fVDNRO+BnckBpL54BrBSwLuRxdBxKJgi+5QSRIGieoNicLz1R1TuikVS7ytDdSFd7ouxQU4K7M7UsxXKwbAJtZ2K81NeCN4adSGGorty239bVH/v+/vZ/CF1gxK9/mdYQbAIWqUoAAAAASUVORK5CYII=) !important;';
	//ghost
	image[3] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAMNQTFRFAwAZPjMANzcwSjcoQjshTjsITD8ATEQSSkcDV0QAbDskTUUhNk8MUkgAbkABSFAXbUgAZEkWO1UmUk5Aak4AXlEIW1QfTl0dbF0Ag18DsZww3aotx7Uh3LkP6LJf1L5K778A5cA12cc56MkF5sci4c5Z69MM/ssq5tgQ/tcU4OIP+9tE9d1D7d6A/OUP9+cP/eI79+co/uUo8Odj/+0A8+pR/PIi9PYq/fBP+voW/P5V+PqW//+K/v+Q/vrD/v6k/v2vZy5HqwAAAAF0Uk5TAEDm2GYAAADMSURBVAjXNc7bcoIwFIXh3SoCFSwemxYoBikSomEnxkjBIu//VIXpdN19s25+gHHe3HJn8L9nr+/6NnGcP066e1MjrYtoOXLaPa6lUXgw2efL4Pmdc5JLHggWLgDWXY2nza3Ad6aO4RRWvRSmvBlTaLbPXsH7kVp/l02phWbx4DY3ZHa5XN0Ax/+txSBv/C058QWLbdidkZlKSqkUO1Ib/AcXoqoqkTPE0ALylWGaFlIdKI3pFp7OKfGdJIoC4iYfOwDbGiKt5dg+WcMvUd4azZg8A04AAAAASUVORK5CYII=) !important;';
	//heart
	image[4] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAMNQTFRFAwAZEAABHQAAJQEALAEAMwEEOAACPAEAQgAALAsATQQCPgoHZAIFLBQAhggJjxYZbiAZ0wgZeicwgiYpgSgiqB0hjigkkSgryB0f7RInvyAkyiIt3R4q1yAzvisurC9FojU9tjtCyjc32jQv+yoxzDhA6jA8vT1B7DEx4zQ8nkhT3ThDoklK4zZN6Do3x0VF+z0730NU+z1B/T82zUpo/z9K/kJS+Ug570lN51JP71I7/E5U/k1e/lFH3V1r+WdM/WVa2Cq5+AAAAAF0Uk5TAEDm2GYAAACzSURBVAjXZY/JEoIwEEQHEkJU3FERNCjuGyagoEDA//8qRcrSKvvy+jTzGuAvitJ8E6lKCdwxh3rJUdvEAKTXYvaZQr2/sgcGBtw/WNuFZ7C7tbPaDUCmM+ZcSun73QlDgI7OVvKQyzheOBsVoLGJ/PARy1DePfq6S2erdJkURRLc5lr5UM+jTCbFYyf0ymcvspQHN+FqlaB2OUVBNM3px5i42XUtyHcCmbMz/d2k1pSqPAFzqBLglZ3qvgAAAABJRU5ErkJggg==) !important;';
	//mushroom
	image[5] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAMNQTFRFAwAZHQAAGBEOJA8ADRUfGxUBOA4GGBcaMRgAKRsGIR0KPBcAHiMbMiIDJSIrggsAQRshQSIAbhgDQCoGswsAnRMAPjMAeikBWzUHaDUAth8AoCYAZDwBuiQAckUAjE8AlIEtsYoVq5VBz5Mkw5hKzJwpxqM3qKaw/aUw3q9a2LY6/K8g+bE0/7QM/cEF9L814MYw/7tS/8YnxsbPzMvD/8pR/tAc/89/+c2p/ddC/tpe+tqA3tvP4OLt6evo8vPc9/n+VGuJYQAAAAF0Uk5TAEDm2GYAAADDSURBVBjTRY/rFoFAFIVnIhoaXSQqKaFcujBdKE28/1NhRPvX+fZZ56y9AWCCyrQHOsnQXVYVnP5YuTpOHBeJD788vlckIkUUJUvM9kaehwfbnF3CnfK+EharMgptTTPVfXJ0dTAwjDI+mbZmSW/D44F8qwgh1syS1HDtewiAwb0s4tNcVTe7tce+LoTz+egftr6LcBtE53WEEYf/SflHnaVBJv5YbJ6U0pQGXGv0P0xpkE5A5zR1lg27upPhCPMjNr4AFJcWn+HmCroAAAAASUVORK5CYII=) !important;';
	//smiley
	image[6] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAMBQTFRF/LcYa0INgkYZdFQdhlcCeWAAeVlIgV0Kk1gNeVw6iWEtgGUnr1sAhWM4k2QKpGAAkGBEiGsJj2kOkm0nnnYhtnQYtY4ay4giw40h24oIx5Q43JgI4ZYk1ZohyqAm9Jsm66UQ9qgk27Q24LVL+7oo/Lk4/LhM7L1R3MQ87btx+sU65slX/8Fp3tFw6c6Y4tlq5Nxc/tCH/9Jy59yO+diD9tmW/das+92Q/9ud/+KE+uSl/uev++6a/+y8//Wv//e9azeNlgAAAAF0Uk5TAEDm2GYAAAC+SURBVAjXPY/bGkJAGEVHRiNy7CRDJSPxhZQalfzv/1aFr/bVXld7bYS6TERxpqBfNLUpiuMe4wEVzrPifExTn3Q4vtc3uGZ7RlNH7RlAfHI7ZYGvd3h/vzXgONox6szRJH8BCK/SiBijPkZm/mw4lOUpYpR6MtJuFa/qOjkdgoCuMFKT6nJRFUU2tmvP/Q5IYai3AO1juu4F7DgOraZtDM/bSJ0QccPMsvXFyp0PwiJZbhwnGZn/R5ZEiNC3D/5iFko7XAd6AAAAAElFTkSuQmCC) !important;';

	//frowny
	image[7] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAe9JREFUOMt9kyFoHEEUhr89RoxYMeLEihMjKlZEHOVECBUrIioqSqmIOHEihMqKiBBKRUX1yRMRJVSUElFREXHiRCilhLKUEycqhnBixIkRESMGtmLm9pIVffB4D/b9/3vv3zcZHQu/nzUUGnIAD0i4t2Ad4ult1q0XLfDPccOgBPkNhAIKwEUXCpQl3OUN6+eIg6uWKNuBP0E+BTGMXfGJ2aTSRcy9wS0U/Vdxmh4A+RfIZyDeAENAAyWgQOgY0XEqWaCGK5aXpw2ACL9GDYUE8bKzne/kiSx4KBRlMSNOUJDAst1ZigIpdMorpDxKJFtSDU888/fjphfV1p2O/zMZQw4KiyDUO7UBcPjwMxIGi/ez9M0+qHMgCqQEEUUyyR/sGzoAHIRt7qMWQiJwBuQiriE01AYmU1ia3dR7Ci72Ya+rsafHRgN19E0N1RlMhuCn4N+CPYKxhsNrcHY3gQHvZTqku7yhX8BnDTcGLiZx52BTKwfHK6iAsYKNxcyHGKMTwY8XDeU1yBJEBWGVTtnvOm6jt7gbhbktGX2YZwJAHHzPNl9Hjdqvoa8SwLZ/pY0bcLXC/i1hUAFzHr2u5eVpUw6m8SyUSqoruPewBrMqcWsFg4rRybusfUxdm5+/bhQOqYCQRPfgguLw49UjzD9ZnMdQ9BHX2wAAAABJRU5ErkJggg==) !important;';
	//poop
	image[8] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAA0hJREFUOMt1jl1om2UAhc/7/eT9kn5Nmsx+yZK0Y0ucXQeT4V9aHEVl/oEXE8QLQa+VitrdBG90eO2FF2MMZc7pjTJ64ZCpUNjqZoMXtatzadOE2aaxadL8N8n3837v680o8+/AuTrPORwIIfBftsw+Ot0eFUI8m/ll4aoQ1lHuCvJPTsL/yEM1qvs8qadPPJH2Dw7EOGQ/kSALIf7G7Q3cHwiAMsZSb7z8/Advv35qYlAVoUafHRPg+h5xz3sDhBAwxuC6LpjjxL+8eCE9Gg5OVNZz2vvvvuns89Ku4Ha4b7apaXX//QAAOOdUCJFQVXX80mfnktVqk5oOcHQssf+1lyY/vPD5+U98Xm1CkggV904o9/WpJEmpS19cTGdvLyf77foIl2NkvdJAwEvoq8+kDt24cyv2wosn6ZUr358hRCwAxJIAAcdl6DEWX1y8kb59c3bqqSN6QlN1ml1Zw1ouj91WHWavTkYVpnmtfqpQ2EibrhgRACHcFRAEVCKYmjw+fvaVk6nEkIeRWsdFvVaHrmt48vGHsZnPYsvWsJQvYqdP8t/9MDcN7l6XIAGEID77zeUZp9eLb9xdJ6ViBeOJGKIP+JCMGdgulWGED6BQ3MJ2pQbb7I/MXv76Pc5ZnNjMoaosTx0bO3z28Gg0EdAU4iEcXtmFKgOUUjhcQrPbQ4PJ2ChtYZ8RwXa9kZ//6eZpRZURL+RXZgIBX7zPGKmWmiBC4GA0Cm714B3gaNs2ars2mq0mDGMYg7oXqkZHln9b/lgBFBVECdVqLTWo+zCWiGG308byahYDPg2KTNDe7SCyP4wjByKIROMo7zRRbXWoR/UlFNd124FAMBOJRpNEVoKNdge6V8OJ1KMgEoHqkSERgWAoiHK5inJlBx3TwaDfbw0bxqYkyXI1FAp9de78p7/+nl01e7YLf8iAYBYUuOi2miDcxd21VdRaXdic4M5Kznpn5nQmGAxOSwAcLsitBx8a+2hu/ufrA0PDubn5TDP3x598p2Oi70po9izUOibWilug+pD17dUfM8cfeewM9fquEeZySBIB50JzbCsuy/Jou916a2lx6blMZkHfLBVBqYpk8hAmJqdgGOFCOByeVlTPNUJg/gUnb6KfJs2jgAAAAABJRU5ErkJggg==) !important;';
	//star
	image[9] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAcZJREFUKM+Nk89OGmEUxX8fMyAjM2EkQ0kEM4ALjQsSTVy0CYsuXbkice2DaOQ1fARWrlzZLYnVNFE3piVIxjEQLH9iYewA83VhWmM62t7tufeem3POFQAHBzV5d9dHSsm/SgjB4uIC+/sVIarVmry97YU22naaVqsbiuVyKSKu2w8Fi8UMOzsfKBYzobjr9omEnappMcrlVWw7Tbm8iqbF/uqRUhJ57dxSyUZRIpRKNradDmVX5+aiFApplpYsUikd00ywvJxB1+MA6Hqc3d2PNBodBoMRvd4PHOeeZrOLqqoR8vl3bG2tE49HQxmSyXk2NgoAPD5OOD7+guN8Rx2NfnJycsnDg8f29ibJ5PyrNg2HY46OPnN6+o3JZIYKMJnMqNe/4vtTKpX3oQuGwzG1Wp3z8yZBEAA8CxYEAe32AM/zQ1k9z6fdHvwZfDEMYFkGhvEklO9P6XSG+P4UAMOIY1nGS7WfYwemmUDTYlxdOVxctLi56ZLPP9m2tpbFNBMIAb+joQohkFKiKArjsc/h4Seur108zycIJI5zz9lZg5WVLNGogqIoTKczhBC8me23KpdLIQCq1Zp03f//qmx2gb29ivgFLESzO4GwMGkAAAAASUVORK5CYII=) !important;';
	//joystick
	image[10] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///5SEhRgAA39macl1goYAFxECBYZzd8W2ucMNNbEAKvGcs/yov//m7d++yZeMkLmptNzX2xEKEQIICO3//neBgKrJwYaSjqPFt3Geim+Ke3aMgAAYCgAKAwAPBAANA87b0ZOYlDxIPgATAAAKAAAFAAAEAAADAN/y356vnXeGb/z/+Lm7tnp5dISBenp3cs7HwQcCAA8HBAwDANrFxBIAAA8AAAgAAAcAAAQAAAEAAPz8/Pv7++np6efn5+Xl5dvb29ra2s7OzszMzMbGxsTExMPDw8LCwry8vLe3t7Ozs7GxsbCwsK2trZKSko6OjoiIiIeHh4aGhoWFhYGBgXx8fHt7e19fXxgYGBUVFQcHBwYGBgICAgEBAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF8ALAAAAAAQABAAAAeSgF+Cgzg2AIOIiSUFCliHiYkmKStUW5CJMiwqUV6XiB8ODFWPnl8nFRlQXKWCAxIXVl2sghMRnawAAE9NOTM6l1kARVNUTB0jMTQoiAA/PkdLV1IaDQsGNSSDWkJBPTxGSAktIS8EB4MASURKTj1ADwguMAI3zABKQz9GECIcGyA7IOVyosQCBg8mWHEBQOFXokAAOw==) !important;';
	//duke
	image[11] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAA1pJREFUOMuNk0tsVGUAhb//3tvpdObO9DGvlulYKkihY2kCAmqIQEnYENl1gSgJPtCFaAwJjVaD1loNcWNqQjQxuFGD1UACQhpthWhNG0rpFAWxTR8z7ZR5QB/zvNOZ+V2gXbnwrE++zXcO/JOuNw8J/mc+Odqy2tUAvvqsXRx6+QN5/JX97c6Sks4Gr5NMYoEVJY/ZphAKBtFNHmZCy5hMJSdf/7y/A6DjhVaxSjrTfWJs3zZfk54JF8RChOD4bRwOO2mZIb60hJotA1kh40mhTS9K4ob51ttfnveLrhMHxVunvpFXz3XKev1+4bfec2roTpi78wZGFirtFrxuL4VUBr2sFIe7ipxuLUykpOppfPy0AHj12ZaP3u94qW3s8hmm/ppkcGiWMosXr9dPNDRH6l4Uk5BIY5GlZJKcGWlueEx8cWlYaACDgdFELh4jGppBpA3UzApNm5o42Po814Z/xijEMLIGqoT54Dw5zS5uRzLHpZQoAG63V1GkgqtMp6luLdU2KzJ5l8TcTWyFBKn4AvFojNDsHDaLlWQsyq7dO58RQjwAaCuKaiymmA9GSK+oyHIXRpUbR7MfrcoJ0oJeWUdOLWcwMM5CIs3Y6MjWVY0NDY0XF7Oc3LHngBz/c1aMBKIsjETo6RvCWVmFzenjl5FefJVO7CtFlhNxaUTzAkA9++l7vNHZHfZVW97d+cSO4g89vcpW/zYOP3cEq93EzakIF4Z+JymLRMNRjh15kZQUYnByui2VTQ2o3126AsD2zWsPOMwmb2YpiYbK3r17gDQPO1w8pJfjtoKHPE8/9SR2p43a9bU3BoYDP6n/DslVXnqdfPGoRdGKHodH+Gqc6KWSe5MzbHlkA+STbFlXR4WqUlPv49fRkR9v3Jm+qgHsbq7hXP+t69X2yj+aW3b5vbpeDIZnFFVmKBgp+vouU+bRKTHb+b7nLE7/Zgr5BwIUgCuBeY61tojT5wce3fdal8hZKxTdtSafzqtkhYbV4yAwPk5sOUH9hk3Y7S4mJmZYBQB09/TLtsP7hZRSae88tTFWKNGkbQ0JQ8Fis7N+YyPLaYNkxmAuGkW1WFSA/7ywlAlFCFvxQvfH74hIpCO3GC7cl4a6rqaWyFRYRjWz+PDrb7eHlzPX/gbGpHAczlFCrQAAAABJRU5ErkJggg==) !important;';
	//greasemonkey
	image[12] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAfVJREFUKM+Fkj9oU0Ecxz8XnnCBDhdo4R50yBscrrTDy5ZCB7M1m4QOScbq1LpoO+moU6OL3apj4yDBLWMcCu1QyBsSeoNDHAJ9YOG9QeiBgedQTP+k6mf63e/uw4/78hPcw4fHQebSEfwCHoBUAU++jMTdd7ca+xthVkgjpHd1dhNu1YkK2f4ciRm59ayRhZ4jMKu4n47zQYc0jlA6xF+pIeckI3tMNJHsvG+LqXy428i4iKnWX6IWCgDE1nJ29JGltU20MQCkPxK6n97AvKa51xa51rrOGLbR2kxFAG0MhaA6FQHUQgGtDQzbtNZ15vmTGCUhn58NzpRXZ3r5PCgPcDE5imVSB/IyuU4xLCHCEnJOTus/yMuE1AHFMrnmwYkAcOMu9rTPv7Cnfdy4C0Dz4ESI1kaYVeQIFmv4K5Vbf7xLbC3ngx6MO/RcgOcriVx5hVmr8D+0MWhjsEcGf9Ahl8QxftEQWYsIS0TW3ivevPeLhiSO8VCG0bBH+KjGVr1BqdH86+SteoMwCIi+dkAZxOunm5mOe5SWQ9TDKsGNZO8yivqk37r0hxGxrlxtWGv3RSaHh6zOO2SxivRLFBavg0vGFnfex33vcnwhcctNdvbeiulu779rZURdCukZcpKiPIcDJJBOJM5TJGoJwirbz3cEwG/eJLw3FFqDogAAAABJRU5ErkJggg==) !important;';
	//360
	image[13] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAmpJREFUOMutk01IVGEUhp/vzr1zr06jcp38V4xQSyKiVUUSKKgUaX+6EmIIWpS0aeEiAkORCIJc2MLIoVTMiERtEYTkIlIJKxcWFthomRsdNWd0nDtzv1YqQllQ7+rA4X3Ogfcc+EeJ7Zo+n08G5gKYHhOv1yv+GtDx7IGcH1vCUiOEVkOoqFjBKCmHk7l0tlZsC7hw87wcNB9iryZSKk5TalTSHWzjnfaaZblIybcqOm91iV8C6m/Uy4yUTNLSTEbz6xia9vPZ72B3boTi/ELc/V6mpr8T54qnoaFRAKjr5t6eXjn+YRynoZGZk0uW3UnxoS56snxU5V7mZWsSK9EoqqqxuLC4MVRZL0ZGhtF1HVVVSXVlcXG0lCRtL7f3vSXBsYduTyNIQcyOIYSgufmO3AD4fD65HAxi2zYGBtV9lVQf2UWBUcarwVnc8we4duooj1ceocYcSCSRNWtzg8BcAGnbWBGLF5MDZJcMUxHfSH/PKFPTk3S0DZDhr6HgzBgTyiS65kRKuQkwPSahlRDKqspQdjsn167S1/6J2dkZZmZmQInSc+8jZT+u8GX/c1zCjTvBvQnwer0i3nDxJjZCgWky8TSRSDTEwnyAUDDI0uIStmON4fs2O13x+JP85GRmb42x70mfrHtfS9HSCQyhoggHth3DtiWWZaEoCk6nRrK5k05HKxPXv4otKVScqxCFgYM4owpr4QjhcJhIxMKyLFRVJS7OwJPsIScnm+qkmt9fYlNjkwwE5onGYghA0zR0XcedkIAn2UNeXh5Fx4rEH5+p5W6LDIfC6IaOa4eL9NR0yo+XC/63fgLmnOzJ+xuV2QAAAABJRU5ErkJggg==) !important;';
	//ps3
	image[14] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAENJREFUOMvtjzkOACAMwxLE/79sVsQhFXFMeGxT1ZE+VzBAN7QtSe3O9jDfUYciBwDpRJ0c0puYKqL8ts7q99X6nw0KzTwz4uZwPPYAAAAASUVORK5CYII=) !important;';
	//wii
	image[15] = 'padding: 0px 20px 0px 0px; background-repeat: no-repeat !important; background-position: top right !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAXhJREFUOMvt07FL1HEYBvDP++vOlE4CWyTModXlhDrxvAanIKfACKe2lkantv6B+h+EpKEx8lJxy6OMwiCDcBFOQkiD0k5B7/dtOSMKg3af6eWF53mf54GXU/yJ+F/ClVfp7oVuy/PlWBvaSONdX/UVbr5Lcwe5cjs3slCJ5tBGGh/cNlvaN/P0WtyHG2/TSkoGstxknnmgrYHJwW2zkBV+eA9fCiowuOMe7PW4A9dX01BKBrozq5ev+lAM9a3wpGPsYWnfTNY66xn0JzWQVINdmFhJ1Z0DY3CQW/r0xvnD5ONxtK3Mxl6P7ex5JRqdcsYmVlIVUpiDPDN6sWgE8oIXRS5huj+Z6hyewnQGxVBPyUB+xi1otz2KsCmMHiW1YHe+HGsnlZ3B50OvO1FuR9hcqEQzsSypJnqPnf1TpC9TP16ca1mCrfDyV/bf5hNFFirRLO2bERrfez2G2rDFYqgXQ702bBGOunwTGqWWdSi1rAuN03f7Gz8BIDyGRA9PyBAAAAAASUVORK5CYII=) !important;';

	var curElm = null;

	/* UTILITY FUNCTIONS */
	var benchmarkTimer = null;
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	var scriptStartTime = getTime();
	function saveSettingCheck() {
	GM_log('SaveSettingCheck '+this.id.split('_')[1]+' - '+this.checked);
		GM_setValue(this.id.split('_')[1], this.checked);
	}
	function saveSettingValue() {
		GM_setValue(this.id.split('_')[1], this.value);
	}
	function addBackground(list,id,name){
	//GM_log("addBackground("+list+","+id+","+name+")");
		removeBackground(id,null);
		var names = GM_getValue(list,'');
		if(names.length>0){
			names += ','+id;
		}else{
			names = ''+id;
		}
		GM_setValue(list,names);
		if(name!=null){
			alert('Added '+name+' to '+list+' list.\nRefresh page to see changes.');
		}	
	}
	function removeBackground(id,name){
		GM_setValue('foes',remove(GM_getValue('foes',''),id));
		GM_setValue('friends',remove(GM_getValue('friends',''),id));
		GM_setValue('other1',remove(GM_getValue('other1',''),id));
		GM_setValue('other2',remove(GM_getValue('other2',''),id));
		if(name!=null){
			alert('Removed '+name+' from friend, foe and other lists.\nRefresh page to see changes.');
		}
	}
	function addImage(list,id,name){
	//GM_log("addimage  list="+list);
		removeImage(id,null);
		if(list!=null){
			list=list.split('_');
			if(list.length==2){
				list=list[1];
			}else{
				return;
			}
		}else{
			return;
		}
		var names = GM_getValue(list,'');
		if(names.length>0){
			names += ','+id;
		}else{
			names = ''+id;
		}
		GM_setValue(list,names);
		if(name!=null){
			alert('Added '+name+' to '+list+' list.');
		}	
	}
	function removeImage(id,name){
		for(var i=0;i<image.length;i++){
			GM_setValue('image'+i,remove(GM_getValue('image'+i,''),id));
		}
		if(name!=null){
			alert('Removed image from '+name+'.');
		}
	}
	function remove(list,id){
		var arr=list.split(',');//turn string list into array of numbers
		var pos = arr.indexOf(id);//find the position of id in the array
		if(pos > -1){//if it exists
			arr.splice(pos,1);//remove the item at position pos
			list = arr.toString();//turn the array back into a string
		}
		return list;
	}
	function hide(e){
		if(e.target.parentNode == document.body){
			document.body.removeChild(e.target);
		}
	}
	function clickListener(e){
		//GM_log('click listener  event='+e);
		var elm = e.target;
		//GM_log('click listener  tag = '+elm);
		//GM_log('click listener  tag name = '+elm.tagName);
	//	var isString = elm instanceof String;
		//GM_log('click listener  isString = '+isString);
		if( elm.tagName=='span' || elm.tagName=='SPAN'){
			var url = "/profile/"+encodeURIComponent(elm.innerHTML.replace(/^\s+|\s+$/g, ''));
			if(url==null){
				return;
			}
			//GM_log('click listener  url = '+url);
			if(url.indexOf('profile.x?person=')>0 || url.indexOf('profile/')>0){
				//GM_log('click listener  foReals = '+elm.getAttribute('foReals'));
				if(elm.getAttribute('foReals')<1){
					//GM_log('click listener   in popup');
					//ok, user clicked on a profile page link, that wasn't one the we made, so intercept it and show a popup
					
					//if an old menu exists, remove it
					var old = document.getElementById('shackfriendfoe_menu');
					if(old != null){
						document.body.removeChild(old);
					}
					
					var name = elm.innerHTML.replace(/^\s+|\s+$/g, ''); // Trim spaces at both ends.;
					
					var id = '';
					var parent = elm.parentNode;
					//GM_log('click listener   parent = '+parent);
					if(parent==null){
						return;
					}
					var parentclass = parent.getAttribute('class');
					//GM_log('click listener   parent.class = '+parentclass);
					if(parentclass=='author'){
						//this is a full post, need to go up 2 more levels
						parent=parent.parentNode;
						if(parent!=null){
							parent=parent.parentNode;
							if(parent==null){
								return;
							}else{
								parentclass = parent.getAttribute('class');
							}
						}else{
							return;
						}
					}
					//GM_log('click listener   parent.class = '+parentclass);
					var regex = /.*author_(\d+).*/
					matches = (parentclass).match(regex);
					//GM_log('click listener   num matches = '+matches.length );
					if(matches.length != 2){
						//GM_log('click listener   no class matches');
						return; 
					}
					//GM_log('click listener   match = '+matches[1]);
					id = matches[1];
					
					//var isMercury = false;
					//var sibling = elm.nextSibling;				
					//while(sibling!=null && sibling.nodeType!=1){//1 is an element - apparently the next node is usually a text node with a newline or spaces because the elements are not immediatly next to each other in the source, but have a newline and tabbing between them.
					//	sibling = sibling.nextSibling;
					//}
					//if(sibling!=null && sibling.getAttribute('class')=="lightningbolt"){
					//	isMercury=true;
					//}
					
					var encodedName;
					if(url.indexOf('profile/')>0){
						encodedName	= url.substr(url.indexOf('profile/')+8);
					}else{
						encodedName	= url.substr(url.indexOf('=')+1);
					}
					
					//chattyprofil.es
					profile="http://chattyprofil.es/p/"+encodedName;
					
					var str='<div class="olauthor_'+id+'"><a class="oneline_user" href="'+url+'" foReals="1">'+name+'</a></div>';//name line
					str+='<div><a href="'+profile+'" foReals="2" name="profiled">Profile</a></div>';//profile
					str+='<div><a href="messages?method=compose&to='+encodedName+'">Message User</a></div>';//Message User
					str+='<div><a href="/user/'+encodedName+'/posts">Comment History</a></div>'//comment search
					//str+='<div><a href="'+(url).replace('profile','library')+'">Game Library</a></div>'//Game Library
					//if(isMercury == true){
					//	str+='<div><a href="http://'+(name.replace(/ /g,'_'))+'.shackspace.com">Shackspace</a></div>'//Shackspace
					//}
					if(showFriendFoe == true){
						str+='<div><a id="shackfriendfoe_friends" style="'+friendcss+'; cursor: pointer;">Friend</a>';//friend
						str+='|<a id="shackfriendfoe_foes" style="'+foecss+'; cursor: pointer;">Foe</a>';//foe
						str+='|<a id="shackfriendfoe_other1" style="'+other1css+'; cursor: pointer;">Other1</a>';//other1
						str+='|<a id="shackfriendfoe_other2" style="'+other2css+'; cursor: pointer;">Other2</a>';//other2
						str+='|<a id="shackfriendfoe_meh" style="cursor: pointer;">None</a></div>';//meh
					}
					if(showImages == true){
						str+='<div>'
						for(var i=0;i<image.length;i++){
							str+='<a id="shackfriendfoe_image'+i+'" style="cursor: pointer;'+image[i]+'">&nbsp;</a>';
							if(i==8)
								str+='</div><div>'
						}
						str+='&nbsp; &nbsp; <a id="shackfriendfoe_imageremove" >No Img</a></div>';
					}
					
					//GM_log('click listener   html = '+str);
					var x = -5;
					var y = -5;
					var theElement = elm;
					while(theElement != null){
					    x += theElement.offsetLeft;
					    y += theElement.offsetTop;
					    theElement = theElement.offsetParent;
					  }
					
					var nnode = document.createElement("div");
					var style = 'position: absolute; top: '+y+'px; left: '+x+'px; border: 2px solid #09f; background: #222; padding: 5px; z-index: 10000';
					//GM_log('click listener   style = '+style);
					nnode.setAttribute('style',style);
					nnode.setAttribute('id','shackfriendfoe_menu');
					nnode.setAttribute('class','oneline oneline0');//one of these gets the coloring/hightlighting I want.
					nnode.addEventListener('mouseout',hide,true);
					nnode.innerHTML = str;
					document.body.appendChild(nnode);
					
					//add friend / foe events
					var ffnode = document.getElementById('shackfriendfoe_friends');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ addBackground('friends',id,name); },true);
					ffnode = document.getElementById('shackfriendfoe_foes');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ addBackground('foes',id,name); },true);
					ffnode = document.getElementById('shackfriendfoe_other1');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ addBackground('other1',id,name); },true);
					ffnode = document.getElementById('shackfriendfoe_other2');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ addBackground('other2',id,name); },true);
					ffnode = document.getElementById('shackfriendfoe_meh');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ removeBackground(id,name); },true);
					ffnode = document.getElementById('shackfriendfoe_imageremove');
					if(ffnode!=null) ffnode.addEventListener( 'click', function(){ removeImage(id,name); },true);
					for(var i=0;i<image.length;i++){
						ffnode = document.getElementById('shackfriendfoe_image'+i);
						if(ffnode!=null) ffnode.addEventListener( 'click', function(e){ addImage(e.target.getAttribute('id'),id,name); },true);
					}
					
					//GM_log('click listener   done');
					
					if(menuMouseOver == false){
						e.preventDefault();
						e.stopPropagation();
						
					}
				}
			}
		}
	}

	function highliteListener(e){
		var elm = e.target;
		curElm = elm;
		setTimeout(doHighlite, 500, elm);
		//GM_log(" highlight 1 = "+elm);
	}
	
	function doHighlite(elm){
		//GM_log('highlightListener  event='+elm);
		//GM_log('highlightListener  cur='+curElm);
		if(elm == curElm && elm.getAttribute('highlite') == null){
			//GM_log('highlightListener  tag = '+elm);
			//GM_log('highlightListener  tag name = '+elm.tagName);
		//	var isString = elm instanceof String;
			//GM_log('highlightListener  isString = '+isString);
//			if( elm.tagName=='a' || elm.tagName=='A'){
//				var url = elm.getAttribute('href');
//				if(url==null){
//					return;
//				}

			if( elm.tagName=='span' || elm.tagName=='SPAN'){
				var url = "/profile/"+encodeURIComponent(elm.innerHTML.replace(/^\s+|\s+$/g, ''));
				if(url==null){
					return;
				}

				//GM_log('highlightListener  url = '+url);
				if(url.indexOf('profile.x?person=')>0 || url.indexOf('profile/')>0){
					//GM_log('highlightListener  foReals = '+elm.getAttribute('foReals'));
					if(elm.getAttribute('foReals')<1){
						var id = '';
						var parent = elm.parentNode;
						//GM_log('highlightListener   parent = '+parent);
						if(parent==null){
							return;
						}
						var parentclass = parent.getAttribute('class');
						//GM_log('highlightListener   parent.class = '+parentclass);
						if(parentclass=='author'){
							//this is a full post, need to go up 2 more levels
							parent=parent.parentNode;
							if(parent!=null){
								parent=parent.parentNode;
								if(parent==null){
									return;
								}else{
									parentclass = parent.getAttribute('class');
								}
							}else{
								return;
							}
						}
						//GM_log('highlightListener   parent.class = '+parentclass);
						var regex = /.*author_(\d+).*/
						matches = (parentclass).match(regex);
						//GM_log('highlightListener   num matches = '+matches.length );
						if(matches.length != 2){
							//GM_log('highlightListener   no class matches');
							return; 
						}
						//GM_log('highlightListener   match = '+matches[1]);
						id = matches[1];
						
						//above code was copied from clickListener, the below code of copied from the coloring
						color = "000000" + id;
						color = color.substr(color.length-6);
						r = 255-((color.charAt(5)*20) + (color.charAt(2)*2));
						g = 255-((color.charAt(4)*20) + (color.charAt(1)*2));
						b = 255-((color.charAt(3)*20) + (color.charAt(0)*2));
						
						css = 'div.olauthor_' + id + ' span.oneline_user, .fpauthor_' + id + ' span.author span.user a { ';
						css += 'color: rgb('+r+','+g+','+b+') !important;' + colorhighlightcss + ' }';
						
						var head = document.getElementsByTagName('head')[0];
						var newCss = document.createElement('style');
						newCss.type = "text/css";
						newCss.setAttribute('for','highlight');
						newCss.innerHTML = css;
						head.appendChild(newCss);
						elm.setAttribute('highlite','1');
					}
				}
			}
		}
	}
	function unhighliteListener(e){
		curElm = null;
		if(e.target!= null && e.target.getAttribute('highlite') != null){
	
			var elms = document.evaluate("//style[@for='highlight']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
				if(elm.parentNode!=null){
					elm.parentNode.removeChild(elm);
				}
			}
			
			e.target.removeAttribute('highlite');
		}
	}
	
	function addSettingsDiv(){
		//now setup the settings page
		node = document.createElement("div");
		node.setAttribute('id','ShacknewsNameColorFriendFoeSettings');
		node.setAttribute('style','z-index: 100000; position: absolute; top: 42px; left: 30px; border: 1px solid #09f; background: black; color: white; margin: 2px; padding: 2px; display: none; ');
		var str;
		str='<table class="ShacknewsNameColorFriendFoeSettingsTable" style="padding: 2px; margin: 2px;">';
		
		str+='<tr><td>Adjust Time of root posts:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_adjustDateTime" type="checkbox" ';
		if(adjustDateTime == true) str+='checked';
		str+='></td><td>AM / PM (unchecked for 24-hour):';
		str+='<input id="ShacknewsNameColorFriendFoe_timeAmPm" type="checkbox" ';
		if(timeAmPm == true) str+='checked';
		str+='</td></tr>';
		
		str+='<tr><td><span style="'+frontpagecss+'">Color Front Page Posts</span>:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_colorFrontPage" type="checkbox" ';
		if(colorFrontPage == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_frontpagecss" value="'+frontpagecss+'">';
		str+='</td></tr>';
/*		
		str+='<tr><td>Show Latest News at Chatty top:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_newsRss" type="checkbox" ';
		if(newsRss == true) str+='checked';
		str+='></td></tr>';
		
		str+='<tr><td>Show News summary in News Posts:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_newsInPosts" type="checkbox" ';
		if(newsInPosts == true) str+='checked';
		str+='></td></tr>';
*/
		str+='<tr><td>Color User Names:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_colorNames" type="checkbox" ';
		if(colorNames == true) str+='checked';
		str+='></td></tr>';
		
		str+='<tr><td>Highlight User Names :</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_colorNamesHighlight" type="checkbox" ';
		if(colorNamesHighlight == true) str+='checked';
		str+='></td><td>Colors usernames on mouseover, disables Color User Names. Additional CSS can be applied<br>';
		str+='CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_colorhighlightcss" value="'+colorhighlightcss+'">';
		str+='</td></tr>';
		
		str+='<tr><td><span style="'+highlightcss+'">Highlight My Name</span>:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_highlightSelf" type="checkbox" ';
		if(highlightSelf == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_highlightcss" value="'+highlightcss+'">';
		str+='</td></tr>';
		
		str+='<tr><td><span style="'+threadstartercss+'">Highlight Thread Starter</span>:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_hlThreadStarter" type="checkbox" ';
		if(hlThreadStarter == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_threadstartercss" value="'+threadstartercss+'">';
		str+='</td></tr>';

		str+='<tr><td><span style="'+employeecss+'">Show Employees</span>:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_showEmployees" type="checkbox" ';
		if(showEmployees == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_employeecss" value="'+employeecss+'">';
		str+='</td></tr>';


		str+='<tr><td><span style="'+modcss+'">Show Mods</span>:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_showMods" type="checkbox" ';
		if(showMods == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="100" id="ShacknewsNameColorFriendFoe_modcss" value="'+modcss+'">';
		str+='</td></tr>';


		str+='<tr><td>Show <span style="'+friendcss+'">Friends</span> / <span style="'+foecss+'">Foes</span> / <br><span style="'+other1css+'">Other 1</span> / <span style="'+other2css+'">Other 2</span>: </td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_showFriendFoe" type="checkbox" ';
		if(showFriendFoe == true) str+='checked';
		str+='></td><td>CSS:<input type="text" size="45" id="ShacknewsNameColorFriendFoe_friendcss" value="'+friendcss+'">';
		str+=' / <input type="text" size="45" id="ShacknewsNameColorFriendFoe_foecss" value="'+foecss+'"> /<br>';
		str+='&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="text" size="45" id="ShacknewsNameColorFriendFoe_other1css" value="'+other1css+'">';
		str+=' / <input type="text" size="45" id="ShacknewsNameColorFriendFoe_other2css" value="'+other2css+'">';
		str+='</td></tr>';

		
		str+='<tr><td>Show User Images:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_showImages" type="checkbox" ';
		if(showImages == true) str+='checked';
		str+='></td></tr>';
		
		str+='<tr><td>Show Menu on Mouse Over:</td>';
		str+='<td><input id="ShacknewsNameColorFriendFoe_menuMouseOver" type="checkbox" ';
		if(menuMouseOver == true) str+='checked';
		str+='></td><td>(non-checked requires a click on a username to open the menu)</td></tr>';
		

		str+='</table><button onClick="';
		str+='document.getElementById(\'ShacknewsNameColorFriendFoeSettings\').style.display=\'none\';';
		str+='">Close</button>';
		node.innerHTML=str;

		//GM_log(" 1");
		
		document.body.appendChild(node);
		

		GM_addStyle('table.ShacknewsNameColorFriendFoeSettingsTable,table.ShacknewsNameColorFriendFoeSettingsTable td{ border: none; padding: 2px;} table.ShacknewsNameColorFriendFoeSettingsTable input {background: #333333 !important;} ');

	//GM_log(" 2");	
		
		//add listeners to save states
		node = document.getElementById('ShacknewsNameColorFriendFoe_colorFrontPage');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_colorFrontPage");
/*
		node = document.getElementById('ShacknewsNameColorFriendFoe_newsRss');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_newsRss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_newsInPosts');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_newsInPosts");
*/
		node = document.getElementById('ShacknewsNameColorFriendFoe_colorNames');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_colorNames");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_adjustDateTime');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_adjustDateTime");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_timeAmPm');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_timeAmPm");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_colorNamesHighlight');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_colorNamesHighlight");

		node = document.getElementById('ShacknewsNameColorFriendFoe_highlightSelf');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_highlightSelf");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_hlThreadStarter');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_hlThreadStarter");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_showEmployees');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_showEmployees");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_showMods');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_showMods");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_showFriendFoe');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_showFriendFoe");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_showImages');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_showImages");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_menuMouseOver');
		if(node != null) node.addEventListener('change', saveSettingCheck, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_menuMouseOver");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_frontpagecss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_frontpagecss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_highlightcss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_highlightcss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_threadstartercss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_threadstartercss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_employeecss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_employeecss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_modcss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_modcss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_friendcss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_friendcss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_foecss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_foecss");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_other1css');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_other1css");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_other2css');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_other2css");
		
		node = document.getElementById('ShacknewsNameColorFriendFoe_colorhighlightcss');
		if(node != null) node.addEventListener('blur', saveSettingValue, false)
		else GM_log(" unable to attach event to ShacknewsNameColorFriendFoe_colorhighlightcss");

		//GM_log(" 3");
	}

	
	
	function SendAjax(url, callbackFunction) {
		if (window.XMLHttpRequest) {
			var request = new XMLHttpRequest();
		} else {
			var request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	 
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	 
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				if (request.responseText) {
					ReceiveAjax(request.responseText.replace(/& /g,"&amp; "), callbackFunction);
				}
			}
		}
	 
		request.send(null);
	}
	 
	function ReceiveAjax(response, callbackFunction) {
		if (window.ActiveXObject) {
			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(response);
		} else {
			var parser = new DOMParser();
			var doc = parser.parseFromString(response,"text/xml");
		}
	 
		callbackFunction(doc.documentElement);
	}
	 
	function ValueFromTagName(item, tagname) {
		var val = item.getElementsByTagName(tagname);
		if(val.length>0 && val[0]!=null && val[0].firstChild!=null)
			return val[0].firstChild.nodeValue;
		return "";
	}
	 
	function ParseRSS(data) {
		var items = data.getElementsByTagName('item');
		
//console.log("items = "+ items);
		if(newsRss){
			var output = '<H3>NEWS</H3><ul style="list-style-type:disc; font-size: 110%; font-weight: bold;">';
			for (var i = 0; i < ((items.length<10)?items.length:10); ++i) {
	//console.log("item["+i+"] = "+ items[i]);		
				var title = ValueFromTagName(items[i], 'title');
				var link = ValueFromTagName(items[i], 'link');
				var desc = ValueFromTagName(items[i], 'description');
	 
				output += '<li><strong><a href ="' + link + '" title="'+desc.escapeHTML()+'">' + title + '</strong> ' + '</li>';
			}
			output += '</ul>';
	 
			var RSSOutput = document.getElementById('side');
			RSSOutput.innerHTML = output;
		}
		
		if(newsInPosts){
			var elms = document.evaluate("//div[contains(@class,'fpauthor_14475')]/div[contains(@class,'postbody')]/a[contains(@href,'article/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			//GM_log("Friend Foe Xpath - "+elms.snapshotLength);
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
				
				var postlink = elm.href;
				//elm shoul be the link to the article, compare href to links in RSS
				for(var i=0;i<items.length;i++){
					var link = ValueFromTagName(items[i], 'link');
					if(postlink.indexOf(link) > -1){
						//found match, replace
						var parent = elm.parentNode;
						var html = parent.innerHTML;
						html+="<br>"+ValueFromTagName(items[i], 'description');
						parent.innerHTML = html;
						
						break;
					}
				}
				
			}
		
		}
	}
	 
	function GetFeed( url ) {
		SendAjax(url, ParseRSS);
	}
	
	String.prototype.escapeHTML = function () {                                        
        return(                                                                 
            this.replace(/&/g,'&amp;').                                         
                replace(/>/g,'&gt;').                                           
                replace(/</g,'&lt;').                                           
                replace(/"/g,'&quot;')                                         
        );                                                                      
    };
	
	
	function adjustTime(elm){
	
		post_ttl = 1000 * 60 * 60 * 24;
		bar_colors = new Array('#00a000' ,'#089000' ,'#108000' ,'#187800' ,'#207000' ,'#186800' ,'#306000' ,'#385800' ,'#405000' ,'#484800' ,'#504000' ,'#583800' ,'#603000' ,'#682800' ,'#702000' ,'#781800' ,'#801000' ,'#880800' ,'#900000' ,'#a00000' ,'#c00000' ,'#e00000' ,'#FF0000' ,'#FF0080');

	
		var date = new Date();
		var dstr = elm.innerHTML.toUpperCase();
		var pos = dstr.indexOf("AM")+dstr.indexOf("PM")+1;
		dstr = dstr.substring(0,pos)+" "+dstr.substr(pos);
//console.log("dstr is "+dstr);			
		date.setTime(Date.parse(dstr));
		var tz = date.toLocaleString();
		var pos = tz.indexOf("(")
		if(pos>0){
			tz = tz.substring(pos+1, tz.length-1);
		}else{
			tz = "";
		}
//console.log("date is "+date+"    tz is "+tz);
		var dd = date.toDateString();
		var dt = date.toLocaleTimeString();
		if(timeAmPm){
			var hours = date.getHours()
			var minutes = date.getMinutes()
			var suffix = "AM";
			if (hours >= 12) {
				suffix = "PM";
				hours = hours - 12;
			}
			if (hours == 0) {
				hours = 12;
			}
			if (minutes < 10)
				minutes = "0" + minutes
			dt=hours+":"+minutes+" "+suffix;
		}
		
		//expire bar
		var now = (new Date()).getTime();
		var expiration_time = date.getTime() + post_ttl;

		var time_left = expiration_time - now;
		var percent = 100;
		var color = 'black';
		if (time_left > 0)
		{
			var total_seconds = Math.round(time_left / 1000);
			var total_minutes = Math.floor(total_seconds / 60);
			var total_hours = Math.floor(total_minutes / 60);

			var minutes = total_minutes % 60;
			var seconds = total_seconds % 60;

			var desc = "Expires in " + total_hours + " hours, " + minutes + " minutes, and " + seconds + " seconds.";
			var percent = 100 - Math.floor(100 * time_left / post_ttl);
			color = bar_colors[23 - total_hours];
		}
		else
		{
			var desc = "Expired.";
			color = "black";
		}

		
		elm.title = desc;
		elm.style.color = "white";
		elm.innerHTML = "<div style='position: relative; height: 100%; width: 100%'>" + 
			"<div style='position: absolute; right: 0px; width: "+percent+"%; height: 100%; background: "+color+";'></div>"+
			"<span style='position: absolute;'>"+dd+" "+dt+" "+tz+"</span></div>";
	}
	
	
	//GM_log("Friend Foe start");

	var count=0;
	if((document.location).toString().indexOf('chatty')>-1){
		//comments page - color the names

		var css='';
		var color;
		var r;
		var g;
		var b;
		
		

		if(colorNames == true || hlThreadStarter == true){
			
			var friends = GM_getValue('friends','').split(',');
			var foes = GM_getValue('foes','').split(',');
			var other1 = GM_getValue('other1','').split(',');
			var other2 = GM_getValue('other2','').split(',');
			var imageusers = new Array(image.length);
			if(showImages == true){
				for(var i=0;i<image.length;i++){
					var defaultlist ='';
					if(i==0){//hey!
						defaultlist = fabulous;
					}
					if(i==8){//poop
						defaultlist='4'; //Steve Gibson
					}
					if(i==9){//star - Tv/Media Celebrity
					}
					if(i==10){//joystick 
						defaultlist = gamedeveloper;
					}
					if(i==11){//duke
						defaultlist = kickassnogum;
					}
					if(i==12){//greasemonkey
						defaultlist = greasemonkeydev;
					}
					var tempstr = GM_getValue('image'+i,defaultlist);
					if(tempstr==defaultlist)//without this, setting the first user to an icon that has a defaults would remove all the other users that had that icon as default.
						GM_setValue('image'+i,defaultlist);
					imageusers[i] = tempstr.split(',');
					//GM_log('Imageusers['+i+']='+imageusers[i]);
				}
			}
			
			var regex = /author_\d+/g
			//var regex = new RegExp('author_(\\d+)[ "]','g');
			//var regex = new RegExp('author_(\\d+)','g');


			var matches = (document.body.innerHTML).match(regex);

			//alert(matches.length);
			//alert(matches);
			var done = new Array();
			var tempcss = "";
			
			for(i=1;i<matches.length;i++){

				if(done[matches[i]]!=1){
				
					var id =  matches[i].split('_')[1];
					
					if(hlThreadStarter == true){
						css += 'div.fpauthor_'+id+' + * + div.capcontainer div.olauthor_' + id + ' span.oneline_user {'
						css += threadstartercss;
						css += '}\n';
					}

					tempcss="";
					if(colorNames == true){
						color = "000000" + id;
						color = color.substr(color.length-6);
						r = 255-((color.charAt(5)*20) + (color.charAt(2)*2));
						g = 255-((color.charAt(4)*20) + (color.charAt(1)*2));
						b = 255-((color.charAt(3)*20) + (color.charAt(0)*2));
						//alert("#"+matches[i]+"  "+color+"   "+r+","+g+","+b);
						tempcss += 'color: rgb('+r+','+g+','+b+') !important; ';
					}
					if(showFriendFoe == true){
						if(friends.indexOf(id)>-1){
							tempcss+= friendcss;
						}else if(foes.indexOf(id)>-1){
							tempcss+= foecss;
						}else if(other1.indexOf(id)>-1){
							tempcss+= other1css;
						}else if(other2.indexOf(id)>-1){
							tempcss+= other2css;
						}
					}
					if(employees.indexOf(id)>-1 && showEmployees == true){
						tempcss+= employeecss;
					}else if(mods.indexOf(id)>-1 && showMods == true){
						tempcss+= modcss;
					}
					
					if(showImages == true){
						for(var j=0;j<image.length;j++){
							if(imageusers[j].indexOf(id)>-1){
								tempcss+=' '+image[j];
							}
						}
					}
					
					if(tempcss.length>0){
						css += 'div.olauthor_' + id + ' span.oneline_user, div.fpauthor_' + id + ' span.author span.user a { ';
						css += tempcss;
						css += '}\n';
					}

					done[matches[i]]=1;
					count++;
					
				}
			}
		}else{
			css += 'div.olauthor_' + id + ' span.oneline_user, div.fpauthor_' + id + ' span.author span.user a { ';
			if(showEmployees == true){
				for(var i=0;i<employees.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + employees[i] + ' span.oneline_user, .fpauthor_' + employees[i] + ' span.author span.user a\n';
				}
				css+= '{ '+employeecss+' }\n';
			}
			if(showMods == true){
				for(var i=0;i<mods.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + mods[i] + ' span.oneline_user, .fpauthor_' + mods[i] + ' span.author span.user a\n';
				}
				css+= '{ '+modcss+' }\n';
			}
			if(showFriendFoe == true){
				var friends = GM_getValue('friends','').split(',');
				var foes = GM_getValue('foes','').split(',');
				var other1 = GM_getValue('other1','').split(',');
				var other2 = GM_getValue('other2','').split(',');
				
				for(var i=0;i<friends.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + friends[i] + ' span.oneline_user, .fpauthor_' + friends[i] + ' span.author span.user a\n';
				}
				css+= '{ '+friendcss+' }\n';
			
				for(var i=0;i<foes.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + foes[i] + ' span.oneline_user, .fpauthor_' + foes[i] + ' span.author span.user a\n';
				}
				css+= '{ '+foecss+' }\n';
				
				for(var i=0;i<other1.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + other1[i] + ' span.oneline_user, .fpauthor_' + other1[i] + ' span.author span.user a\n';
				}
				css+= '{ '+other1css+' }\n';
				
				for(var i=0;i<other2.length;i++){
					if(i>0) css+=', ';
					css += 'div.olauthor_' + other2[i] + ' span.oneline_user, .fpauthor_' + other2[i] + ' span.author span.user a\n';
				}
				css+= '{ '+other2css+' }\n';
			
			}
			if(showImages == true){
				for(var i=0;i<image.length;i++){
					var defaultlist ='';
					if(i==0){//hey!
						defaultlist = fabulous;
					}
					if(i==8){//poop
						defaultlist='4'; //Steve Gibson
					}
					if(i==9){//star - Tv/Media Celebrity
					}
					if(i==10){//joystick 
						defaultlist = gamedeveloper;
					}
					if(i==11){//duke
						defaultlist = kickassnogum;
					}
					if(i==12){//greasemonkey
						defaultlist = greasemonkeydev;
					}
					var tempstr = GM_getValue('image'+i,defaultlist);
					if(tempstr==defaultlist)//without this, setting the first user to an icon that has a defaults would remove all the other users that had that icon as default.
						GM_setValue('image'+i,defaultlist);
					imageusers = tempstr.split(',');
					
					for(var j=0;j<imageusers.length;j++){
						if(j>0) css+=', ';
						css += 'div.olauthor_' + imageusers[j] + ' span.oneline_user, .fpauthor_' + imageusers[j] + ' span.author span.user a\n';
					}
					css+= '{ '+image[i]+' }\n';
				}
			}
		}

		//color your name
		if(highlightSelf == true){
			css+='div.oneline span.this_user, div.oneline a.this_user:link, div.oneline a.this_user:visited, div.oneline a.this_user:active { '+highlightcss+' }\n';
		}
		
//console.log("about to color front page");
		if(colorFrontPage == true){
			css+='div.fpauthor_14475 {'+frontpagecss+'}\n';
//console.log("color front page = "+frontpagecss);
		}
		
		if(adjustDateTime){
			css+='div.postdate { width: 300px !important;}\n';
		}

		GM_addStyle(css);
		
		
		//settings on comments page
		var settings = document.getElementById('commentssettings');
		if(settings!=null){
			var setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left; width: 95%');
			var sstr = '<h5>Shacknews Name Color Friend/Foe</h5>';
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
			
			setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left;');
			sstr = 'Click this button for settings: <span id="shacknamecolorfirendfoesettingsbutton" ></span>';
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
			var node = document.getElementById('shacknamecolorfirendfoesettingsbutton');
			if(node != null){ 
				node.setAttribute('style','display: inline-block; '+buttonStyle);
				function settingsclick(evt){
					var elm = document.getElementById("ShacknewsNameColorFriendFoeSettings");
					elm.style.position="absolute";
					var dist = this.offsetTop; 
					var e = this.offsetParent; 
					while(e!=null){ 
						dist += e.offsetTop; 
						e=e.offsetParent;
					}
					elm.style.top=dist+"px"; 
					elm.style.left="30px";
					elm.style.display="block";
				}
				//node.setAttribute('onclick','var elm = document.getElementById("ShacknewsNameColorFriendFoeSettings"); var e = evt ? evt: window.event; elm.style.position="absolute"; elm.style.top=e.clinetY+"px"; elm.style.left="30px"; elm.style.display="block";');
				//node.addEventListener('onclick',settingsclick, false);
				//node.setAttribute('onclick',settingsclick);
				node.setAttribute('onclick','var elm = document.getElementById("ShacknewsNameColorFriendFoeSettings"); elm.style.position="absolute"; var dist = this.offsetTop; var e = this.offsetParent; while(e!=null){ dist += e.offsetTop; e=e.offsetParent;}  elm.style.top=dist+"px"; elm.style.left="30px"; elm.style.display="block";');
			}
		}
		
		addSettingsDiv();
		
		//adjust date time
		
		if(adjustDateTime){
//console.log("adjusting time...");
			var elms = document.evaluate("//div[contains(@class,'postdate')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			//GM_log("Friend Foe Xpath - "+elms.snapshotLength);
			for(var k=0;k<elms.snapshotLength;k++){
				var elm = elms.snapshotItem(k);
				
				adjustTime(elm);
			}
		}
/*		
		if(newsRss || newsInPosts){
			var elm = document.getElementById('side');
			if(elm!=null){
				GetFeed("http://www.shacknews.com/rss?recent_articles=1");
			}
		}
*/
	}else if(document.location.toString().indexOf("shacknews.com/settings")>-1 || typeof script_enabled == 'function'){

		//ok, now setup the config button
		if( !(typeof script_enabled == 'function') ){
			var node = document.createElement("div");
			node.setAttribute('style','position: absolute; top: 22px; left: 30px; '+buttonStyle);
			node.setAttribute('onclick','document.getElementById("ShacknewsNameColorFriendFoeSettings").style.display="block";');

			document.body.appendChild(node);
		}else{
			var elm = document.getElementById('toggle_friendfoe');
			if(elm!=null && elm.parentNode != null){
				elm = elm.parentNode; //lable tag
				
				node = document.createElement("span");
				node.innerHTML = '[settings]';
				node.setAttribute('style', 'background: #606060');
							
				if (elm.nextSibling) 
					elm.parentNode.insertBefore(node,elm.nextSibling);
				else elm.parentNode.appendChild(node);
				
				elm.addEventListener( 'click', showsettings,true); 
				function showSettings(){
					var x = e.clientX>270?e.clientX-250:20;
					var y = e.clientY;
					var elm = document.getElementById('hacknewsNameColorFriendFoeSettings');
					elm.style.top=''+y+'px';
					elm.style.left=''+x+'px';
					elm.style.display='block';
				}
			}
		
		}

		addSettingsDiv();
		
	}



	var elms = document.evaluate("//span[contains(@class,'oneline_user')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log("Friend Foe Xpath - "+elms.snapshotLength);
	for(var k=0;k<elms.snapshotLength;k++){
		var elm = elms.snapshotItem(k);
		
		if(menuMouseOver==true){
			elm.addEventListener( 'mouseover', clickListener,true); //intercept clicks to the profile page
		}else{
			elm.addEventListener( 'click', clickListener,true); //intercept clicks to the profile page
		}

		if(colorNamesHighlight==true){
			elm.addEventListener( 'mouseover', highliteListener,true); //intercept mouse over username to highlight
			elm.addEventListener( 'mouseout', unhighliteListener,true); //intercept mouse out from username to unhighlight
		}
	}


	// log execution time
	if(GM_log){
		GM_log((getTime() - scriptStartTime) + 'ms  '+count+' unique posters');
	}

}