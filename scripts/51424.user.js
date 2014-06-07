/**
Copyright 2007 Richard Laffers 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author      Risi
// @email	rlaffers@gmail.com
// @namespace	http://userscripts.org/
// @name		Travian Task Queue
// @description	Schedule delayed constructions, upgrades and attacks.
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.2.5
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds. 
                          // Low value  = high accuracy in triggering tasks. To make your browser 
						  // unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = "";  // Set this to override the automatic language detection. Available translations: see below.
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched. 
                        // If the code is not available by the time the construction should start, the 
						// construction will be cancelled. This value must be greater than iCheckEvery 
						// in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true;  //Display village names instead of numbers. May hit the performance. 

/**********************
**** End of Settings **** 
***********************/


/** GLOBALS - do not tamper! */

var sCurrentVersion = "1.1.7";  //Version number with which we need to run the update fu
var bUseServerTime = getOption("USE_SERVER_TIME", false, "boolean"); //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
                                    // Your local computer time MUST  still be correct (both time and date!).
var bLocked = false;  // for locking the TTQ_TASKS cookie
var bLockedCode = false;  // for locking the TTQ_CODE_0 and TTQ_CODE_0  cookies
var bLockedHistory = false;
var oIntervalReference = null;
var iSessionRefreshRate = 60;  //Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
var iMaxPlaceNamesCookieLength = 15;  //maximum number of names stored  in the cookie before it is cleared
var iMyRace = getOption("RACE", 0, "integer");  // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
var iHistoryLength = getOption("HISTORY_LENGTH", 7, "integer");
var aLangBuildings = [];  //multilang support
var aLangTasks = [];  //multilang support
var aLangStrings = [];  //multilang support
var aLangTroops = [];

// Images
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var sDeleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";

//Styles
var cssStyle = "";
cssStyle += "#ttq_tasklist, #ttq_history {position:absolute; background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}"; 
cssStyle += "#ttq_history {background-color:#D4D4EC}";
cssStyle += ".ttq_history_row {padding:1px 5px;}";
cssStyle += ".ttq_village_name {font-weight:bold;}";
cssStyle += ".ttq_draghandle {font-size: 120%; font-weight:bold;}";
cssStyle += ".ttq_time_village_wrapper {font-style:italic; font-size:80%; display:block;}";
cssStyle += ".ttq_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle +=	"#timerForm {padding:10px 20px; }";
cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#timerform_wrapper p {}";
cssStyle +=	"#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
cssStyle += ".handle {cursor: move;}";
cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
cssStyle += ".ttq_research_later {display:block;}";

GM_addStyle(cssStyle);

detectLanguage();
/** ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */
 
switch(sLang) {
	case "sk":
		aLangBuildings = ["", "DrevorubaÄ", "HlinenÃ¡ baÅˆa", "Å½eleznÃ¡ baÅˆa", "ObilnÃ© pole", "PÃ­la", "TehelÅˆa", "ZlievareÅˆ", "Mlyn", "PekÃ¡reÅˆ", "Sklad surovÃ­n", "SÃ½pka", "KovÃ¡Äska dielÅˆa", "Zbrojnica", "ArÃ©na", "HlavnÃ¡ budova", "Bod stretnutia", "Trh", "AmbasÃ¡da", "KasÃ¡rne", "Stajne", "DielÅˆa", "AkadÃ©mia", "Ãškryt", "Radnica", "Rezidencia", "PalÃ¡c", "PokladÅˆa", "ObchodnÃ½ kancelÃ¡r", "VeÄ¾kÃ© kasÃ¡rne", "VeÄ¾kÃ© stajne", "MestskÃ© hradby", "ZemnÃ¡ hrÃ¡dza", "PalisÃ¡da", "KamenÃ¡r", "Pivovar", "Pasce", "HrdinskÃ½ dvor", "VeÄ¾kÃ½ sklad", "VeÄ¾kÃ¡ sÃ½pka", "Div sveta"];
		aLangTasks = ["PostaviÅ¥", "RozÅ¡Ã­riÅ¥", "ZaÃºtoÄiÅ¥ na", "VynÃ¡jsÅ¥", "TrÃ©novaÅ¥"];
		aLangStrings = ["PostaviÅ¥ neskÃ´r", "RozÅ¡Ã­riÅ¥ neskÃ´r", "ZaÃºtoÄiÅ¥ neskÃ´r", "VynÃ¡jsÅ¥ neskÃ´r", "NaplÃ¡nujte tÃºto akciu na neskÃ´r.", "ZaÄali sme stavaÅ¥ ", " - Ãºspech neznÃ¡my.", "stupeÅˆ", " sa nedÃ¡ postaviÅ¥.", " sa nedÃ¡ rozÅ¡Ã­riÅ¥.", "Ãšloha je naplÃ¡novanÃ¡.", "AktuÃ¡lna produkcia:", "TÃºto Ãºlohu momentÃ¡lne nie je moÅ¾nÃ© naplÃ¡novaÅ¥.", "MomentÃ¡lne nie je moÅ¾nÃ© plÃ¡novaÅ¥ Ãºlohy!", "NaplÃ¡novanÃ© Ãºlohy", "ZmazaÅ¥", "VyslaÅ¥ neskÃ´r", "Neboli vybratÃ© Å¾iadne jednotky.", "Jednotky maÅ¡Ã­rujÃº do", "Nepodarilo sa vyslaÅ¥ jednotky do", "PodporiÅ¥", "ZaÃºtoÄiÅ¥ na", "OlÃºpiÅ¥", "Katapulty zacieliÅ¥ na", "nÃ¡hodne", "o", "alebo za", "sekÃºnd", "minÃºt", "hodÃ­n", "dnÃ­", "PreskÃºmaÅ¥ jednotky a suroviny", "PreskÃºmaÅ¥ jednotky a obrannÃ© objekty", "preÄ", "Ãštok nemoÅ¾no naplÃ¡novaÅ¥, pretoÅ¾e nie je znÃ¡my cieÄ¾.", "na mieste Ä.", "ZoradiÅ¥ podÄ¾a:", "typu ", "Äasu ", "cieÄ¾a ", "inÃ© ", "dediny ", "HistÃ³ria akciÃ­", "zmazaÅ¥ histÃ³riu", "ZaÄali sme vyvÃ­jaÅ¥ ", " sa nedÃ¡ vynÃ¡jsÅ¥.", "VylepÅ¡iÅ¥ neskÃ´r", "VyÅ¡pehovaÅ¥", "TrÃ©novaÅ¥ neskÃ´r", "jednotky.", "VytrÃ©novaÅ¥", "ZaÄali sme trÃ©novaÅ¥ ", " sa nedÃ¡ vytrÃ©novaÅ¥." ];
		aLangTroops[0] = ["LegionÃ¡r", "PretoriÃ¡n", "ImperiÃ¡n", "Equites LegÃ¡ti", "Equites Imperatoris", "Equites Caesaris", "RÃ­mske baranidlo", "OhnivÃ½ katapult", "SenÃ¡tor", "OsadnÃ­k", "Hrdina"];  //Romans
		aLangTroops[1] = ["PÃ¡lkar", "OÅ¡tepÃ¡r", "BojovnÃ­k so sekerou", "Å peh", "Rytier", "Teuton jazdec", "GermÃ¡nske baranidlo", "Katapult", "KmeÅˆovÃ½ vodca", "OsadnÃ­k", "Hrdina"];  //Teutons
		aLangTroops[2] = ["Falanx", "Å ermiar", "SliediÄ", "Theutates Blesk", "Druid jazdec", "Haeduan", "DrevenÃ© baranidlo", "TrebuÅ¡Ã©", "NÃ¡ÄelnÃ­k", "OsadnÃ­k", "Hrdina"];  //Gauls
		break;

	case "ba":  //by bhcrow
		aLangBuildings = ["", "DrvosjeÄa", "Rudnik gline", "Rudnik Å¾eljeza", "Poljoprivredno imanje", "Pilana", "Ciglana", "Ljevaonica Å¾eljeza", "Mlin", "Pekara", "SkladiÅ¡te", "Silos", "KovaÄnica oruÅ¾ja", "KovaÄnica oklopa", "Mejdan", "Glavna zgrada", "Mjesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Å tala", "Radionica", "Akademija", "SkloniÅ¡te", "OpÅ¡tina", "Rezidencija", "Dvorac", "Treasury", "TrgovaÄki centar", "Velika kasarna", "Velika Å¡tala", "Gradski bedem", "Zid od zemlje", "Taraba", "Klesar", "Brewery", "PostavljaÄ zamki", "Herojska vila", "Veliko skladiÅ¡te", "Veliki silos", "Svjetsko Äudo"]; 
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "IstraÅ¾i", "ObuÄi"];
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", "Napadni poslije", "IstraÅ¾i poslije", "Isplaniraj ovaj zadatak za poslije.", "PoÄela je gradnja ", " pokuÅ¡ano je s nepoznatim rezultatom.", "stepen", " ne moÅ¾e biti izgraÄ‘eno.", " ne moÅ¾e se unaprijediti.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne moÅ¾e se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriÅ¡i", "PoÅ¡alji poslije", "Trupe nisu odabrane.", "VaÅ¡a vojska je poslana na", "VaÅ¡a vojska ne moÅ¾e biti poslana na", "PodrÅ¡ka", "Napad", "PljaÄka", "Katapulti Ä‡e ruÅ¡iti", "sluÄajno", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "Å pijuniraj resourse i trupe", "Å pijuniraj trupe i odbranu", "away", "Napad ne moÅ¾e biti isplaniran jer destinacija nije odreÄ‘ena.", "na stranici br.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionar", "Preatorijanac", "Imperijanac", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ratni ovan", "Vatreni katapult", "Senator", "Naseljenik", "Hero"];  //Romans
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "IzviÄ‘aÄ", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "MaÄevalac", "IzviÄ‘aÄ", "Theutateov Grom", "druidni jahaÄ", "Haeduan", "Ovan", "Katapult", "StarjeÅ¡ina", "Naseljenik", "Hero"];  //Gauls
		break;	
		
	case "bg": //by penko
		aLangBuildings = ["", "Ð¡ÐµÑ‡Ð¸Ñ‰Ðµ", "Ð“Ð»Ð¸Ð½ÐµÐ½Ð° ÐºÐ°Ñ€Ð¸ÐµÑ€Ð°", "Ð ÑƒÐ´Ð½Ð¸Ðº", "Ð–Ð¸Ñ‚Ð½Ð¾ Ð¿Ð¾Ð»Ðµ", "Ð”ÑŠÑÐºÐ¾Ñ€ÐµÐ·Ð½Ð¸Ñ†Ð°", "Ð¢ÑƒÑ…Ð»Ð°Ñ€Ð½Ð°", "Ð›ÐµÑÑ€Ð½Ð°", "ÐœÐµÐ»Ð½Ð¸Ñ†Ð°", "ÐŸÐµÐºÐ°Ñ€Ð½Ð°", "Ð¡ÐºÐ»Ð°Ð´", "Ð¥Ð°Ð¼Ð±Ð°Ñ€", "ÐšÐ¾Ð²Ð°Ñ‡Ð½Ð¸Ñ†Ð° Ð·Ð° Ð±Ñ€Ð¾Ð½Ð¸", "ÐšÐ¾Ð²Ð°Ñ‡Ð½Ð¸Ñ†Ð° Ð·Ð° Ð¾Ñ€ÑŠÐ¶Ð¸Ñ", "ÐÑ€ÐµÐ½Ð°", "Ð“Ð»Ð°Ð²Ð½Ð° ÑÐ³Ñ€Ð°Ð´Ð°", "Ð¡Ð±Ð¾Ñ€ÐµÐ½ Ð¿ÑƒÐ½ÐºÑ‚", "ÐœÐ°Ð³Ð°Ð·Ð¸Ð½", "ÐŸÐ¾ÑÐ¾Ð»ÑÑ‚Ð²Ð¾", "ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°", "ÐšÐ¾Ð½ÑŽÑˆÐ½Ð°", "Ð Ð°Ð±Ð¾Ñ‚Ð¸Ð»Ð½Ð¸Ñ†Ð°", "ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ", "Ð¡ÐºÑ€Ð¸Ð²Ð°Ð»Ð¸Ñ‰Ðµ", "Ð“Ñ€Ð°Ð´ÑÐºÐ° ÑÑ‚ÐµÐ½Ð°", "Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ", "Ð”Ð²Ð¾Ñ€ÐµÑ†", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Ð¢Ñ€Ð°Ð¿ÐµÑ€", "Ð¢Ð°Ð²ÐµÑ€Ð½Ð°", "Ð“Ð¾Ð»ÑÐ¼ ÑÐºÐ»Ð°Ð´", "Ð“Ð¾Ð»ÑÐ¼ Ñ…Ð°Ð¼Ð±Ð°Ñ€", "Ð§ÑƒÐ´Ð¾"];
		aLangTasks = ["ÐŸÐ¾ÑÑ‚Ñ€Ð¾ÑÐ²Ð°Ð½Ðµ Ð½Ð°", "ÐÐ°Ð´ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ° Ð½Ð°", "ÐÑ‚Ð°ÐºÐ° ÐºÑŠÐ¼", "ÐžÑ‚ÐºÑ€Ð¸Ð²Ð°Ð½Ðµ Ð½Ð°", "Ð¢Ñ€ÐµÐ½Ð¸Ñ€Ð°Ð½Ðµ Ð½Ð°"];
		aLangStrings = ["ÐŸÐ¾ÑÑ‚Ñ€Ð¾Ð¹Ñ‚Ðµ Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾", "ÐÐ°Ð´ÑÑ‚Ñ€Ð¾Ð¹Ñ‚Ðµ Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾", "ÐÑ‚Ð°ÐºÑƒÐ²Ð°Ð¹Ñ‚Ðµ Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾", "ÐžÑ‚ÐºÑ€Ð¸Ð¹Ñ‚Ðµ Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾", "Ð—Ð°Ð¿Ð¸ÑˆÐµÑ‚Ðµ Ñ‚Ð°Ð·Ð¸ Ð·Ð°Ð´Ð°Ñ‡Ð° Ð·Ð° Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾.", "Ð—Ð°Ð¿Ð¾Ñ‡Ð½Ð° ÑÑ‚Ñ€Ð¾ÐµÐ¶ ", " Ð—Ð°Ð¿Ð¾Ñ‡Ð½Ð° Ñ Ð½ÐµÑÑÐµÐ½ Ñ€ÐµÐ·ÑƒÐ»Ñ‚Ð°Ñ‚.", "Ð½Ð¸Ð²Ð¾", " Ð½Ðµ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð±ÑŠÐ´Ðµ Ð¿Ð¾ÑÑ‚Ñ€Ð¾ÐµÐ½Ð¾.", " Ð½Ðµ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð±ÑŠÐ´Ðµ Ð½Ð°Ð´ÑÑ‚Ñ€Ð¾ÐµÐ½Ð¾.", "Ð—Ð°Ð´Ð°Ñ‡Ð°Ñ‚Ð° Ðµ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð°.", "Ð¢ÐµÐºÑƒÑ‰Ð° Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ†Ð¸Ñ:", "ÐÐµ Ðµ Ð²ÑŠÐ·Ð¼Ð¾Ð¶Ð½Ð¾ Ñ‚Ð°Ð·Ð¸ Ð·Ð°Ð´Ð°Ñ‡Ð° Ð´Ð° Ð±ÑŠÐ´Ðµ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð° ÑÐµÐ³Ð°.", "ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð°Ñ‚Ð° Ð·Ð°Ð´Ð°Ñ‡Ð° Ð½Ðµ Ðµ Ð´Ð¾ÑÑ‚ÑŠÐ¿Ð½Ð°!", "ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð¸ Ð·Ð°Ð´Ð°Ñ‡Ð¸", "Ð˜Ð·Ñ‚Ñ€Ð¸Ð²Ð°Ð½Ðµ", "Ð˜Ð·Ð¿Ñ€Ð°Ñ‚Ð¸ Ð¿Ð¾-ÐºÑŠÑÐ½Ð¾", "ÐÑ‚Ð°ÐºÐ°Ñ‚Ð° Ð½Ðµ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð±ÑŠÐ´Ðµ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð°, Ð·Ð°Ñ‰Ð¾Ñ‚Ð¾ Ð½Ðµ ÑÐ° Ð¸Ð·Ð±Ñ€Ð°Ð½Ð¸ Ð²Ð¾Ð¹Ð½Ð¸Ñ†Ð¸.", "Ð’Ð°ÑˆÐ¸Ñ‚Ðµ Ð²Ð¾Ð¹Ð½Ð¸Ñ†Ð¸ ÑÐ° Ð¸Ð·Ð¿Ñ€Ð°Ñ‚ÐµÐ½Ð¸ ÐºÑŠÐ¼", "Ð’Ð°ÑˆÐ¸Ñ‚Ðµ Ð²Ð¾Ð¹Ð½Ð¸Ñ†Ð¸ Ð½Ðµ Ð¼Ð¾Ð³Ð°Ñ‚ Ð´Ð° Ð±ÑŠÐ´Ð°Ñ‚ Ð¸Ð·Ð¿Ñ€Ð°Ñ‚ÐµÐ½Ð¸ ÐºÑŠÐ¼", "ÐŸÐ¾Ð´ÐºÑ€ÐµÐ¿Ð»ÐµÐ½Ð¸Ðµ ÐºÑŠÐ¼", "ÐÑ‚Ð°ÐºÐ° ÐºÑŠÐ¼", "ÐÐ°Ð±ÐµÐ³ ÐºÑŠÐ¼", "ÐšÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚Ð¸Ñ‚Ðµ ÑÐµ Ñ†ÐµÐ»ÑÑ‚ Ð²", "ÑÐ»ÑƒÑ‡Ð°Ð¹Ð½Ð¾", "Ð²", "Ð¸Ð»Ð¸ ÑÐ»ÐµÐ´", "ÑÐµÐºÑƒÐ½Ð´Ð¸", "Ð¼Ð¸Ð½ÑƒÑ‚Ð¸", "Ñ‡Ð°ÑÐ°", "Ð´ÐµÐ½Ð°", "Ð¨Ð¿Ð¸Ð¾Ð½Ð¸Ñ€Ð°Ð½Ðµ Ð·Ð° Ñ€ÐµÑÑƒÑ€ÑÐ¸ Ð¸ Ð²Ð¾Ð¹ÑÐºÐ°", "Ð¨Ð¿Ð¸Ð¾Ð½Ð¸Ñ€Ð°Ð½Ðµ Ð·Ð° Ð²Ð¾Ð¹ÑÐºÐ° Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‚Ð°", "Ð»Ð¸Ð¿ÑÐ²Ð°", "ÐÑ‚Ð°ÐºÐ°Ñ‚Ð° Ð½Ðµ Ð¼Ð¾Ð¶Ðµ Ð´Ð° Ð±ÑŠÐ´Ðµ Ð¿Ð»Ð°Ð½Ð¸Ñ€Ð°Ð½Ð° Ñ‚ÑŠÐ¹ ÐºÐ°Ñ‚Ð¾ Ð½Ðµ Ðµ Ð¸Ð·Ð±Ñ€Ð°Ð½Ð° Ñ†ÐµÐ».", "at site no.", "Ð¡Ð¾Ñ€Ñ‚Ð¸Ñ€Ð°Ð½Ðµ Ð¿Ð¾:", "Ñ‚Ð¸Ð¿ ", "Ð²Ñ€ÐµÐ¼Ðµ ", "Ñ†ÐµÐ» ", "Ð¾Ð¿Ñ†Ð¸Ð¸ ", "Ð³Ñ€Ð°Ð´ ", "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð½Ð° Ð·Ð°Ð´Ð°Ñ‡Ð¸Ñ‚Ðµ", "Ð¸Ð·Ñ‡Ð¸ÑÑ‚Ð²Ð°Ð½Ðµ Ð½Ð° Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑÑ‚Ð°"];
		aLangTroops[0] = ["Ð›ÐµÐ³Ð¸Ð¾Ð½ÐµÑ€", "ÐŸÑ€ÐµÑ‚Ð¾Ñ€Ð¸Ð°Ð½ÐµÑ†", "Ð˜Ð¼Ð¿ÐµÑ€Ð¸Ð°Ð½", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "ÐšÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚", "ÐžÐ³Ð½ÐµÐ½ ÐºÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚", "Ð¡ÐµÐ½Ð°Ñ‚Ð¾Ñ€", "Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº", "Ð“ÐµÑ€Ð¾Ð¹"]; //Romans
		aLangTroops[1] = ["Ð‘Ð¾ÐµÑ† Ñ Ð±Ð¾Ð·Ð´ÑƒÐ³Ð°Ð½", "ÐšÐ¾Ð¿Ð¸ÐµÐ½Ð¾ÑÐµÑ†", "Ð‘Ð¾ÐµÑ† Ñ Ð±Ñ€Ð°Ð´Ð²Ð°n", "Ð¡ÑŠÐ³Ð»ÐµÐ´Ð²Ð°Ñ‡", "ÐŸÐ°Ð»Ð°Ð´Ð¸Ð½", "Ð¢ÐµÐ²Ñ‚Ð¾Ð½ÑÐºÐ¸ Ñ€Ð¸Ñ†Ð°Ñ€", "Ð¢Ð°Ñ€Ð°Ð½", "ÐšÐ°Ñ‚Ð°Ð¿ÑƒÐ»Ñ‚", "ÐŸÑ€ÐµÐ´Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»", "Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº", "Ð“ÐµÑ€Ð¾Ð¹"]; //Teutons
		aLangTroops[2] = ["Ð¤Ð°Ð»Ð°Ð½Ð³Ð°", "ÐœÐµÑ‡Ð¾Ð½Ð¾ÑÐµÑ†", "Ð¡Ð»ÐµÐ´Ð¾Ñ‚ÑŠÑ€ÑÐ°Ñ‡", "Theutates Thunder", "Ð”Ñ€ÑƒÐ¸Ð´ ÐºÐ¾Ð½Ð½Ð¸Ðº", "Ð¥ÐµÐ´ÑƒÐ°Ð½", "Ð¢Ð°Ñ€Ð°Ð½", "Ð¢Ñ€ÐµÐ±ÑƒÑ‡ÐµÑ‚", "Ð’Ð¾Ð¶Ð´", "Ð—Ð°ÑÐµÐ»Ð½Ð¸Ðº", "Ð“ÐµÑ€Ð¾Ð¹"]; //Gauls
		break;
	
	case "cn": //by Jacky-Q
		aLangBuildings = ["", "ä¼æœ¨åœº", "é»åœŸçŸ¿", "é“çŸ¿åœº", "å†œåœº", "æœ¨æåŽ‚", "ç –å—åŽ‚", "é“¸é€ åŽ‚", "ç£¨åŠ", "é¢åŒ…æˆ¿", "ä»“åº“", "ç²®ä»“", "é“åŒ é“º", "å†›æ¢°åº“", "ç«žæŠ€åœº", "ä¸­å¿ƒå¤§æ¥¼", "é›†ç»“ç‚¹", "å¸‚åœº", "å¤§ä½¿é¦†", "å…µè¥", "é©¬åŽ©", "å·¥åœº", "ç ”ç©¶æ‰€", "å±±æ´ž", "å¸‚æ”¿åŽ…", "è¡Œå®«", "çš‡å®®", "å®åº“", "äº¤æ˜“æ‰€", "å¤§å…µè¥", "å¤§é©¬åŽ©", "åŸŽå¢™", "åœŸå¢™", "æœ¨å¢™", "çŸ³åŒ é“º", "é…¿é…’åŽ‚", "é™·é˜±æœº", "è‹±é›„å›­", "å¤§ä»“åº“", "å¤§ç²®ä»“", "ä¸–ç•Œå¥‡è§‚"];
		aLangTasks = ["å»ºç­‘", "å‡çº§", "æ”»å‡»", "ç ”å‘", "è®­ç»ƒ"];
		aLangStrings = ["é¢„å®šå»ºç­‘", "é¢„å®šå‡çº§", "é¢„å®šæ”»å‡»", "é¢„å®šç ”å‘", "å°†æ­¤äº‹é¢„å®šç¨åŽè¿›è¡Œ.", "å»ºç­‘å¼€å§‹äº†", " å·²å°è¯•ä½†ç»“æžœä¸æ˜Ž", "ç­‰çº§", " ä¸èƒ½å»ºç­‘.", " ä¸èƒ½å‡çº§.", "æ­¤äº‹é¡¹å·²é¢„å®šç¨åŽæ‰§è¡Œ.", "ç›®å‰ç”Ÿäº§", "æˆ‘ä»¬æš‚æ—¶ä¸èƒ½é¢„å®šç¨åŽæ‰§è¡Œ.", "ä¸èƒ½é¢„å®šç¨åŽæ‰§è¡Œ!", "å·²é¢„è®¢ç¨åŽæ‰§è¡Œé¡¹ç›®", "åˆ é™¤", "ç¨åŽé€å‡º", "æ”»å‡»ä¸èƒ½é¢„å®šæ‰§è¡Œå› ä¸ºæ²¡æœ‰é€‰æ‹©å†›é˜Ÿ.","ä½ çš„å†›é˜Ÿå·²é€å‡º", "ä½ çš„å†›é˜Ÿä¸èƒ½é€å‡º", "æ”¯æ´", "æ”»å‡»", "æŠ¢å¤º", "æŠ•çŸ³è½¦ä¼šçž„å‡†", "éšæœº", "äºŽ", "æˆ–ä¹‹åŽ", "ç§’", "åˆ†", "æ—¶", "æ—¥", "ä¾¦å¯Ÿç‰©èµ„åŠå†›é˜Ÿ", "ä¾¦å¯Ÿç‰©èµ„åŠé˜²å¾¡","ä¸åœ¨", "æ”»å‡»æ— æ³•é¢„å®šæ‰§è¡Œ,å› ä¸ºæ²¡æœ‰æŒ‡å®šç›®çš„åœ°.", "at site no.", "åˆ†ç±»ä»¥:", "ç±»åž‹", "æ—¶é—´", "ç›®æ ‡ ", "é€‰é¡¹", "æ‘åº„"];
		aLangTroops[0] = ["å¤ç½—é©¬æ­¥å…µ", "ç¦å«å…µ", "å¸å›½å…µ", "ä½¿èŠ‚éª‘å£«", "å¸å›½éª‘å£«", "å°†å†›éª‘å£«", "å†²æ’žè½¦", "ç«ç„°æŠ•çŸ³å™¨", "å‚è®®å‘˜", "æ‹“è’è€…", "è‹±é›„"]; //Romans
		aLangTroops[1] = ["æ£æ£’å…µ", "çŸ›å…µ", "æ–§å¤´å…µ", "ä¾¦å¯Ÿå…µ", "åœ£éª‘å£«", "æ—¥è€³æ›¼éª‘å…µ", "å†²æ’žè½¦", "æŠ•çŸ³å™¨", "æ‰§æ”¿å®˜", "æ‹“è’è€…", "è‹±é›„"]; //Teutons
		aLangTroops[2] = ["æ–¹é˜µå…µ", "å‰‘å£«", "æŽ¢è·¯è€…", "é›·æ³•å¸ˆ", "å¾·é²ä¼Šéª‘å…µ", "æµ·é¡¿åœ£éª‘å£«", "å†²æ’žè½¦", "æŠ•çŸ³å™¨", "é¦–é¢†", "æ‹“è’è€…", "è‹±é›„"]; //Gauls
		break;
		
	case "cz":
		aLangBuildings = ["", "DÅ™evorubec", "HlinÄ›nÃ½ dÅ¯l", "Å½eleznÃ½ dÅ¯l", "ObilnÃ© pole", "Pila", "Cihelna", "SlÃ©vÃ¡rna", "MlÃ½n", "PekÃ¡rna", "Sklad surovin", "SÃ½pka", "KovÃ¡rna", "Zbrojnice", "TurnajovÃ© hÅ™iÅ¡tÄ›", "HlavnÃ­ budova", "ShromaÅ¾diÅ¡tÄ›", "TrÅ¾iÅ¡tÄ›", "AmbasÃ¡da", "KasÃ¡rny", "StÃ¡je", "DÃ­lna", "Akademie", "Ãškryt", "Radnice", "Rezidence", "PalÃ¡c", "Pokladnice", "ObchodnÃ­ kancelÃ¡Å™", "VelkÃ© kasÃ¡rny", "VelkÃ¡ stÃ¡j", "MÄ›stskÃ¡ zeÄ", "ZemnÃ­ hrÃ¡z", "PalisÃ¡da", "KamenÃ­k", "Pivovar", "Pasti", "HrdinskÃ½ dvÅ¯r", "VelkÃ½ sklad", "VelkÃ¡ sÃ½pka", "Div svÄ›ta"];
		aLangTasks = ["Postavit", "RozÅ¡Ã­Å™it", "ZaÃºtoÄit na", "Vyzkoumat", "TrÃ©novat"];
		aLangStrings = ["Postavit pozdÄ›ji", "RozÅ¡Ã­Å™it pozdÄ›ji", "ZaÃºtoÄit pozdÄ›ji", "Vyzkoumat pozdÄ›ji", "NaplÃ¡nujte tuto akci na pozdÄ›ji.", "ZaÄali jsme stavÄ›t ", " - vÃ½sledek je neznÃ¡mÃ½.", "ÃºroveÅˆ", " se nedÃ¡ postavit.", " se nedÃ¡ rozÅ¡Ã­Å™it.", "Ãšloha byla naplÃ¡novÃ¡na.", "AktuÃ¡lnÃ­ produkce:", "Tuto akci momentÃ¡lnÄ› nenÃ­ moÅ¾nÃ© naplÃ¡novat.", "MomentÃ¡lnÄ› nenÃ­ moÅ¾nÃ© plÃ¡novat Å¾Ã¡dnÃ© akce!", "NaplÃ¡novanÃ© akce", "Smazat", "Vyslat pozdÄ›ji", "Ãštok nenÃ­ moÅ¾nÃ© naplÃ¡novat, protoÅ¾e nebyly vybrÃ¡ny Å¾Ã¡dnÃ© jednotky.", "Jednotky jsou na cestÄ› do", "NepodaÅ™ilo se vyslat jednotky do", "PodpoÅ™it", "ZaÃºtoÄit na", "Oloupit", "Katapulty zamÃ­Å™it na", "nÃ¡hodnÄ›", "o", "anebo za", "sekund", "minut", "hodin", "dnÃ­", "Prozkoumat jednotky a suroviny", "Prozkoumat jednotky a obrannÃ© objekty", "pryÄ", "Ãštok nenÃ­ moÅ¾nÃ© naplÃ¡novat, protoÅ¾e chybÃ­ cÃ­l.", "na mÃ­stÄ› Ä.", "TÅ™Ã­dit podle:", "druhu ", "Äasu ", "cÃ­le ", "moÅ¾nosti ", "vesnice ", "Historie", "smazat historii" ];
		aLangTroops[0] = ["LegionÃ¡Å™", "PretoriÃ¡n", "ImperiÃ¡n", "Equites LegÃ¡ti", "Equites Imperatoris", "Equites Caesaris", "Å˜Ã­manskÃ© beranidlo", "OhnivÃ½ katapult", "SenÃ¡tor", "OsadnÃ­k"]; //Romans
		aLangTroops[1] = ["PÃ¡lkaÅ™", "OÅ¡tÄ›paÅ™", "SekernÃ­k", "ZvÄ›d", "RytÃ­Å™", "Teuton jezdec", "GermÃ¡nskÃ© beranidlo", "Katapult", "KmenovÃ½ vÅ¯dce", "OsadnÃ­k"]; //Teutons
		aLangTroops[2] = ["Falanx", "Å ermÃ­Å™", "SlÃ­diÄ", "Theutates Blesk", "Druid jezdec", "Haeduan", "DÅ™evÄ›nÃ© beranidlo", "VÃ¡leÄnÃ½ katapult", "NÃ¡ÄelnÃ­k", "OsadnÃ­k"]; //Gauls
		break; 	
		
	case "de":  //by Metador
		aLangBuildings = ["", "HolzfÃ¤ller", "Lehmgrube", "Eisenmine", "Getreidefarm", "SÃ¤gewerk", "Lehmbrennerei", "EisengieÃŸerei", "GetreidemÃ¼hle", "BÃ¤ckerei", "Rohstofflager", "Kornspeicher", "Waffenschmiede", "RÃ¼stungsschmiede", "Turnierplatz", "HauptgebÃ¤ude", "Versammlungsplatz", "Marktplatz", "Botschaft", "Kaserne", "Stall", "Werkstatt", "Akademie", "Versteck", "Rathaus", "Residenz", "Palast", "Schatzkammer", "Handelskontor", "GroÃŸe Kaserne", "GroÃŸer Stall", "Stadtmauer", "Erdwall", "Palisade", "Steinmetz", "Brauerei", "Fallensteller", "Heldenhof", "GroÃŸes Rohstofflager", "GroÃŸer Kornspeicher", "Weltwunder"];
		aLangTasks = ["GebÃ¤ude bauen", "Ausbau von", "Angriff", "UnterstÃ¼tzung", "verbessern"];
		aLangStrings = ["SpÃ¤ter bauen", "SpÃ¤ter ausbauen", "SpÃ¤ter angreifen", "SpÃ¤ter unterstÃ¼tzen", "FÃ¼hre den Auftrag spÃ¤ter aus.", "GebÃ¤udebau gestartet von ", " wurde versucht mit unbekannten Ergebnis.", "Stufe", " kann nicht gebaut werden.", " kann nicht ausgebaut werden.", "Der Auftrag wurde hinzugefÃ¼gt.", "Produktion:", "Dieser Auftrag kann jetzt nicht Aufgegeben werden.", "Auftrag nicht verfÃ¼gbar!", "AuftrÃ¤ge:", "LÃ¶schen", "SpÃ¤ter senden", "Keine Truppen ausgewÃ¤hlt wurden.", "Deine Truppen wurden geschickt zu", "Deine Truppen konnten nicht geschickt werden zu", "UnterstÃ¼tzung", "Angriff: Normal", "Angriff: Raubzug", "Die Katapulte zielen auf", "Zufall", "um", "oder nach", "Sekunden", "Minuten", "Stunden", "Tage", "Rohstoffe und Truppen ausspÃ¤hen", "Verteidigungsanlagen und Truppen ausspÃ¤hen", "weg", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "dk":  //by Ronster Madsen
		aLangBuildings = ["", "Skovhugger", "Lergrav", "Jernmine", "Kornavler", "Savvark", "Lerbranderi", "Jernstoberi", "Kornmolle", "Bageri", "Rastoflager", "Kornlager", "Rustningssmedje", "Vabensmedje", "Turneringsplads", "Hovedbygning", "Forsamlingsplads", "Markedsplads", "Ambassade", "Kaserne", "Stald", "Varksted", "Akademi", "Gemmested", "Radhus", "Residens", "Palads", "Skatkammer", "Handelskontor", "Stor Kaserne", "Stor Stald", "Bymur", "Jordvold", "Palisade", "Stenhugger", "Bryggeri", "Faldebygger", "Heltebygning", "Stort Rastoflager", "Stort Kornkammer", "Verdensunder"];
		aLangTasks = ["Byg", "Viderebyg", "Angrib", "Udforsk", "Uddan"];
		aLangStrings = ["Byg senere", "Viderebyg senere", "Angrib senere", "Udforsk senere", "Planlag denne opgave til  senere.", "Vi har startet byggeriet", " Blev forsogt med ukendt resultat.", "Trin", " kan ikke bygges.", " kan ikke viderebygges.", "Opgaven blev planlagt til senere.", "Nuvarende produktion:", "Vi kan ikke planlagge denne opgave lige nu.", "Opgaveplanlagning er ikke tilgangelig!", "Planlagte opgaver", "Slet", "Send senere", "Der ikke er tropper tilgangelig.",	"Dine tropper blev sendt til", "Dine tropper kunne ikke sendes til", "Opbakning", "Angrib", "Plyndringstogt", "Katapulterne skyder mod", "tilfaldigt", "mod", "eller mod", "sekunder", "minutter", "timer", "dage", "Efterforsk rastoffer og tropper", "Efterforsk forsvarsanlag og tropper", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "fr":  //by arn0
		aLangBuildings = ["", "BÃ»cheron", "CarriÃ¨re de terre", "Mine de fer", "Ferme", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "DÃ©pÃ´t de ressources", "Silo de cÃ©rÃ©ales", "Armurerie", "Usine d'armures", "Place du tournoi", "BÃ¢timent principal", "Place de rassemblement", "Place du MarchÃ©", "Ambassade", "Caserne", "Ecurie", "Atelier", "AcadÃ©mie", "Cachette", "HÃ´tel de ville", "RÃ©sidence", "Palais", "Chambre du trÃ©sor", "Comptoir de commerce", "Grande caserne", "Grande Ã©curie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de pierre", "Brasserie", "Fabricant de piÃ¨ges", "Manoir du hÃ©ros", "Grand dÃ©pÃ´t", "Grand silo", "Merveille du monde"]; 
		aLangTasks = ["Construire le bÃ¢timent", "Augmenter au", "Attack", "Research", "Train"];
		aLangStrings = ["Construire plus tard", "AmÃ©liorer plus tard", "Attaquer plus tard", "Rechercher plus tard", "Programmer cette tÃ¢che pour plus tard.", "Construction commencÃ©e ", " a Ã©tÃ© tentÃ© sans rÃ©sultats.", "niveau", " ne peut Ãªtre construit.", " ne peut Ãªtre amÃ©liorÃ©.", "La tÃ¢che a Ã©tÃ© programmÃ©e.", "Production courante:", "Cette tÃ¢che ne peut Ãªtre programmÃ©e actuellement.", "La programmation de tÃ¢ches n'est pas disponible!", "TÃ¢ches programmÃ©es", "Supprimer", "Envoyer plus tard", "L'attaque ne peut pas Ãªtre programmÃ©e car aucune troupe n'a Ã©tÃ© sÃ©lectionnÃ©e.", "Vos troupes ont Ã©tÃ© envoyÃ©es Ã ", "Vos troupes n'ont pas pu Ãªtre envoyÃ©es Ã ", "Assistance", "Attaque: Normal", "Attaque: pillage", "Les catapultes ont pour cible", "alÃ©atoire", "sur", "ou aprÃ¨s", "secondes", "minutes", "heures", "jours", "Espionner troupes et ressources", "Espionner troupes et dÃ©fenses", "ailleurs", "L'attaque ne peut Ãªtre programmÃ©e car aucune destination n'a Ã©tÃ© spÃ©cifiÃ©e.", "au site no.", "Trier par:", "type ", "durÃ©e ", "cible ", "options ", "village "];
		aLangTroops[0] = ["LÃ©gionnaire", "PrÃ©torien", "ImpÃ©rian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "BÃ©lier", "Catapule de feut", "SÃ©nateur", "Colon", "Heros"];  //Romans
		aLangTroops[1] = ["Combattant au gourdin", "Combattant Ã  la lance", "Combattant Ã  la hache", "Eclaireur", "Paladin", "Cavalier teuton", "BÃ©lier", "Catapulte", "Chef de tribu", "Colon", "Heros"];  //Teutons
		aLangTroops[2] = ["Phalange", "Combattant Ã  l'Ã©pÃ©e", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "HÃ©douin", "BÃ©lier", "Catapulte de guerre", "Chef", "Colon", "Heros"];  //Gauls
		break;
		
	case "net":  //Spanish - by Carlos R.
		aLangBuildings = ["", "CarpinterÃ­a", "Cantera de arcilla", "Mina de Hierro", "Granja", "Aserradero", "Ladrillar", "AcerÃ­a", "Molino", "PanaderÃ­a", "AlmacÃ©n", "Granero", "HerrerÃ­a", "ArmerÃ­a", "Plaza de torneos", "Edificio Principal", "Plaza de Reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "TerraplÃ©n", "Empalizada", "Cantero", "CervecerÃ­a", "Trampero", "MansiÃ³n del HÃ©roe", "AlmacÃ©n Grande", "Granero Grande", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir mÃ¡s tarde", "Mejorar mÃ¡s tarde", "Atacar mÃ¡s tarde",	"Investigar mÃ¡s tarde", "Programar esta tarea para mÃ¡s tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "ProducciÃ³n actual:", "No se puede programar esa tarea ahora.", "Ë‡La programaciÃ³n de tareas no estÃ¡ disponible!", "Tareas programadas", "Eliminar", "Enviar mÃ¡s tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarÃ¡n...", "aleatorio", "a", "o despuÃ©s", "segundos", "minutos", "horas", "dÃ­as", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante nÅŸ", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "HÃ©roe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "PaladÃ­n", "Caballero TeutÃ³n", "Ariete", "Catapulta", "Jefe", "Colono", "HÃ©roe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Rastreador", "Trueno Theutates", "Jinete Druida", "Haeduano", "Ariete", "FundÃ­bulo", "Cacique", "Colono", "HÃ©roe"];  //Galos
		break;
		
	case "fi":  //by Zypper
		aLangBuildings = ["", "Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "Sahaamo", "Kivenhakkaaja", "Rautavalimo", "Viljamylly", "Leipomo", "Varasto", "Viljasiilo", "AseseppÃ¤", "Haarniskapaja", "Turnausareena", "PÃ¤Ã¤rakennus", "Kokoontumispiste", "Marketti", "LÃ¤hetystÃ¶", "Kasarmi", "Hevostalli", "TyÃ¶paja", "Akatemia", "KÃ¤tkÃ¶", "Kaupungin talo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppamaja", "Suuri Kasarmi", "Suuri Hevostalli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Olut panimo", "Ansoittaja", "Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme"];
		aLangTasks = ["Rakenna", "PÃ¤ivitÃ¤", "HyÃ¶kkÃ¤Ã¤", "Tiedustele", "Kouluta"];
		aLangStrings = ["Rakenna myÃ¶hemmin", "PÃ¤ivitÃ¤ myÃ¶hemmin", "HyÃ¶kkÃ¤Ã¤ myÃ¶hemmin", "Tiedustele myÃ¶hemmin", "LisÃ¤Ã¤ rakennusjonoon", "Rakenna ", " ei tuloksia.", "taso", " ei voida rakentaa.", " ei voida pÃ¤ivittÃ¤Ã¤.", "TehtÃ¤vÃ¤ lisÃ¤tty rakennusjonoon.", "Nykyinen tuotanto:", "Ei voida lisÃ¤tÃ¤ rakennusjonoon juuri nyt.", "LisÃ¤ys ei ole saatavilla!", "TehtÃ¤vÃ¤t rakennusjonossa", "Poista", "LÃ¤hetÃ¤ myÃ¶hemmin", "HyÃ¶kkÃ¤ystÃ¤ ei voitu lisÃ¤tÃ¤ jonoon, koska yhtÃ¤Ã¤n joukkoja ei ole valittu.", "Joukkosi on lÃ¤hetetty ", "Joukkojasi ei voida lÃ¤hettÃ¤Ã¤ ", "YllÃ¤pito", "HyÃ¶kkÃ¤ys: Normaali", "HyÃ¶kkÃ¤ys: RyÃ¶stÃ¶", "Katapulttien kohde", "satunnainen", "nyt", "tai myÃ¶hemmin", "sekuntit", "minuutit", "tunnit", "pÃ¤ivÃ¤t", "Tiedustele resursseja ja joukkoja", "Tiedustele joukkoja ja puollustuksia","poissa", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hk":  //by Angus
		aLangBuildings = ["", "ä¼æœ¨å ´", "æ³¥å‘", "éµç¤¦å ´", "è¾²å ´", "é‹¸æœ¨å» ", "ç£šå» ", "é‹¼éµé‘„é€ å» ", "éºµç²‰å» ", "éºµåŒ…åº—", "å€‰åº«", "ç©€å€‰", "éµåŒ ", "ç›”ç”²å» ", "ç«¶æŠ€å ´", "æ‘èŽŠå¤§æ¨“", "é›†çµé»ž", "å¸‚å ´", "å¤§ä½¿é¤¨", "å…µç‡Ÿ", "é¦¬æ£š", "å·¥å ´", "ç ”ç©¶é™¢", "å±±æ´ž", "åŸŽéŽ®å»³", "è¡Œå®®", "çš‡å®®", "å¯¶ç‰©åº«", "äº¤æ˜“æ‰€", "å¤§å…µç‡Ÿ", "å¤§é¦¬æ£š", "åŸŽç‰†", "åœŸç‰†", "æœ¨ç‰†", "çŸ³åŒ é‹ª", "é‡€é…’å» ", "é™·é˜±æ©Ÿ", "è‹±é›„å®…", "å¤§å€‰åº«", "å¤§ç©€å€‰", "ä¸–ç•Œå¥‡è§€"];
		aLangTasks = ["å»ºç¯‰", "å‡ç´š", "æ”»æ“Š", "ç ”ç™¼", "è¨“ç·´"];
		aLangStrings = ["é å®šå»ºç¯‰", "é å®šå‡ç´š", "é å®šæ”»æ“Š", "é å®šç ”ç™¼", "å°‡æ­¤äº‹é …é å®šç¨å¾ŒåŸ·è¡Œ.", "å»ºç¯‰é–‹å§‹äº† ", " å·²å˜—è©¦ä½†çµæžœä¸æ˜Ž.", "ç­‰ç´š", " ä¸èƒ½å»ºç¯‰.", " ä¸èƒ½å‡ç´š.", "æ­¤äº‹é …å·²é å®šç¨å¾ŒåŸ·è¡Œ.", "ç›®å‰ç”Ÿç”¢:", "æˆ‘å€‘æš«æ™‚ä¸èƒ½é å®šç¨å¾ŒåŸ·è¡Œ.", "ä¸èƒ½é å®šç¨å¾ŒåŸ·è¡Œ!", "å·²é å®šç¨å¾ŒåŸ·è¡Œé …ç›®", "åˆ é™¤", "ç¨å¾Œé€å‡º", "æ”»æ“Šä¸èƒ½é å®šåŸ·è¡Œå› ç‚ºæ²’æœ‰é¸æ“‡è»éšŠ.","ä½ çš„è»éšŠå·²é€åŽ»", "ä½ çš„è»éšŠä¸èƒ½é€åŽ»", "æ”¯æ´", "æ”»æ“Š", "æ¶å¥ª", "æŠ•çŸ³è»Šæœƒçž„æº–",	"éš¨æ©Ÿ", "æ–¼", "æˆ–ä¹‹å¾Œ",	"ç§’", "åˆ†", "æ™‚", "æ—¥", "åµå¯Ÿç‰©è³‡åŠè»éšŠ", "åµå¯Ÿç‰©è³‡åŠé˜²ç¦¦","ä¸åœ¨", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hr":  //by Damir B.
		aLangBuildings = ["", "DrvosjeÄa", "Glinokop", "Rudnik Å¾eljeza", "Farma", "Pilana", "Ciglana", "Ljevaonica Å¾eljeza", "Å½itni mlin", "Pekara", "SkladiÅ¡te", "Å½itnica", "KovaÄnica", "OruÅ¾arnica", "Arena", "Glavna zgrada", "OkupljaliÅ¡te", "TrÅ¾nica", "Veleposlanstvo", "Vojarna", "KonjuÅ¡nica", "Radionica", "Akademija", "SkroviÅ¡te resursa", "Gradska vijeÄ‡nica", "Rezidencija", "Dvorac", "Treasury", "Ured za trgovinu", "Velika vojarna", "Velika konjuÅ¡nica", "Zidine grada", "Zemljani zid", "Drveni zid", "Klesar", "Brewery", "Zamka", "Dvorac Heroja", "Veliko skladiÅ¡te", "Velika Å¾itnica", "Svjetsko Äudo"];
		aLangTasks = ["Izgradi", "Nadogradi", "Napad", "IstraÅ¾i", "Treniraj"];
		aLangStrings = ["Gradi poslije", "Nadogradi poslije", "Napadni poslije", "IstraÅ¾i poslije", "Isplaniraj ovaj zadatak za poslije.", "PoÄela je gradnja ", " pokuÅ¡ano je s nepoznatim rezultatom.", "razina", " ne moÅ¾e biti izgraÄ‘eno.", " ne moÅ¾e se nadograditi.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne moÅ¾e se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriÅ¡i", "PoÅ¡alji poslije", "Trupe nisu odabrane.", "VaÅ¡a vojska je poslana na", "VaÅ¡a vojska ne moÅ¾e biti poslana na", "PodrÅ¡ka", "Napad", "PljaÄka", "Katapulti Ä‡e ruÅ¡iti", "sluÄajno", "u", "ili nakon", "sekundi", "minuta", "sati", "dana", "Å pijuniraj resourse i trupe", "Å pijuniraj trupe i odbranu", "odsutan", "Napad ne moÅ¾e biti isplaniran jer destinacija nije odreÄ‘ena.", "na stranici br.", "Sortiraj po:", "tip ", "vrijeme ", "meta ", "opcije ", "selo "];
		aLangTroops[0] = ["Legionar", "Preatorijan", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ovan za probijanje", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"]; //Romans
		aLangTroops[1] = ["GorÅ¡tak", "Kopljanik", "Borac sa sjekirom", "Izvidnik", "Paladin", "Teutonski vitez", "Ovan za probijanje", "Katapult", "Poglavica", "Naseljenik", "Heroj"]; //Teutons
		aLangTroops[2] = ["Falanga", "MaÄevalac", "TragaÄ", "Theutatesov grom", "Druid jahaÄ", "Haeduan", "Ovan za probijanje", "TrebuÅ¡e", "StarjeÅ¡ina", "Naseljenik", "Heroj"]; //Gauls 
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangBuildings = ["", "FavÃ¡gÃ³", "AgyagbÃ¡nya", "VasÃ©rcbÃ¡nya", "BÃºzafarm", "FafeldolgozÃ³", "AgyagÃ©getÅ‘", "VasÃ¶ntÃ¶de", "Malom", "PÃ©ksÃ©g", "RaktÃ¡r", "MagtÃ¡r", "FegyverkovÃ¡cs", "PÃ¡ncÃ©lkovÃ¡cs", "GyakorlÃ³tÃ©r", "FÅ‘Ã©pÃ¼let", "GyÃ¼lekezÅ‘tÃ©r", "Piac", "KÃ¶vetsÃ©g", "KaszÃ¡rnya", "IstÃ¡llÃ³", "MÅ±hely", "AkadÃ©mia", "Rejtekhely", "TanÃ¡cshÃ¡za", "Rezidencia", "Palota", "KincstÃ¡r", "Kereskedelmi kÃ¶zpont", "Nagy KaszÃ¡rnya", "Nagy IstÃ¡llÃ³", "KÅ‘fal", "FÃ¶ldfal", "CÃ¶lÃ¶pfal", "KÅ‘faragÃ³", " SÃ¶rfÅ‘zde", "CsapdakÃ©szÃ­tÅ‘", "HÅ‘sÃ¶k hÃ¡za", "Nagy RaktÃ¡r", "Nagy MagtÃ¡r", "VilÃ¡gcsoda"];
		aLangTasks = ["Ã‰pÃ­tÃ©s", "SzintemelÃ©s", "TÃ¡madÃ¡s", "FejlesztÃ©s", "KikÃ©pzÃ©s"];
		aLangStrings = ["Ã‰pÃ­tÃ©s kÃ©sÅ‘bb", "SzintemelÃ©s kÃ©sÅ‘bb", "TÃ¡madÃ¡s kÃ©sÅ‘bb", " FejlesztÃ©s kÃ©sÅ‘bb", "A mÅ±velet idÅ‘zÃ­tve kÃ©sÅ‘bbre.", "Az Ã©pÃ­tÃ©s elkezdÅ‘dÃ¶tt ", " MegprÃ³bÃ¡ltam ismeretlen eredmÃ©nnyel.", "szint", "nem Ã©pÃ¼lhet meg.", " nem lehet szintetemelni.", "IdÅ‘zÃ­tÃ©sre kerÃ¼lt feladat:", " Jelenlegi termelÃ©s:", "Jelenleg nem idÅ‘zÃ­thetÅ‘", "A feladat idÅ‘zÃ­tÃ©s nem elÃ©rhetÅ‘!", "IdÅ‘zÃ­tett feladatok:", "TÃ¶rlÃ©s", "KÃ¼ldÃ©s kÃ©sÅ‘bb", "A tÃ¡madÃ¡s nem idÅ‘zÃ­thetÅ‘! Nem lettek egysÃ©gek kivÃ¡lasztva.", "Az egysÃ©geid elkÃ¼ldve", "Az egysÃ©gek elkÃ¼ldÃ©se nem sikerÃ¼lt, ide:", "TÃ¡mogatÃ¡s", "NormÃ¡l tÃ¡madÃ¡s", "RablÃ³tÃ¡madÃ¡s", "A katapult(ok) cÃ©lpontja", "vÃ©letlenszerÅ±", "Ekkor:", "vagy kÃ©sleltetve", "mÃ¡sodperccel", "perccel", "Ã³rÃ¡val", "nappal", "Nyersanyagok Ã©s egysÃ©gek kikÃ©mlelÃ©se", "EgysÃ©gek Ã©s Ã©pÃ¼letek kikÃ©mlelÃ©se", "tÃ¡vol", "A tÃ¡madÃ¡s nem idÅ‘zÃ­thetÅ‘! Nem lett vÃ©gcÃ©l kivÃ¡lasztva.", "a kÃ¶vetkezÅ‘ azonisÃ­tÃ³val rendelkezÅ‘ helyen:", "RendezÃ©s:", "tÃ­pus ", "idÅ‘ ", "cÃ©lpont ", "beÃ¡llÃ­tÃ¡sok ", "falu ", "History", "elÅ‘zmÃ©nyek tÃ¶rlÃ©se"];
		aLangTroops[0] = ["LÃ©giÃ³s", "TestÅ‘r", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "FaltÃ¶rÅ‘ kos", "TÅ±zkatapult", "SzenÃ¡tor", "Telepes"];  //RÃ³mai
		aLangTroops[1] = ["BuzogÃ¡nyos", "LÃ¡ndzsÃ¡s", "CsatabÃ¡rdos", "FelderÃ­tÅ‘", "Paladin", "Teuton lovag", "FaltÃ¶rÅ‘ kos", "Katapult", "TÃ¶rzsi vezetÅ‘", "Telepes"];  //GermÃ¡n
		aLangTroops[2] = ["Phalanx", "Kardos", "FelderÃ­tÅ‘", "Theutat villÃ¡m", "Druida lovas", "Haeduan", "FalrombolÃ³", "Harci-katapult", "FÅ‘nÃ¶k", "Telepes"];  //Gall		
		break;
  
	case "it":  //by Tazzicus
		aLangBuildings = ["", "Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "Falegnameria", "Fabbrica di mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Stanza del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura cittadine", "Murata in terra", "Palizzata", "Genio civile", "Birreria", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia"];
		aLangTasks = ["Costruisci", "Amplia", "Attacca", "Ricerca", "Addestra"];
		aLangStrings = ["Costruisci piu' tardi", "Amplia piu' tardi", "Attacca piu' tardi", "Ricerca piu' tardi", "Programma questa attivita'.", "E' iniziata la costruzione di ", " e' stata tentata con risultato sconosciuto.", "livello", " non puo' essere costruito.", " non puo' essere ampliato.", "L'attivita' e' stata programmata.", "Produzione:", "Non e' possibile programmare questa attivita' adesso.", "Programmazione attivita' non disponibile!", "Attivita' Programmate", "Cancella", "Invia piu' tardi", "L'attacco non puo' essere programmato in quanto non sono state selezionate truppe.", "Truppe sono state inviate a", "Non e' stato possibile inviare le truppe a", "Rinforzo", "Attacco", "Raid", "Obiettivo catapulte:", "a caso", "all'orario", "oppure dopo", "secondi", "minuti", "ore", "giorni", "Spiare truppe e risorse", "Spiare difese e truppe", "assente", "L'attacco non puo' essere programmato in quanto non e' stato specificato l'obbiettivo.", "alla posizione n.", "Ordina per:", "tipo ", "orario ", "obbiettivo ", "opzioni ", "villaggio", "Archivio Attivita'", "svuota archivio"];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"];
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"];
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribu'", "Decurione", "Eroe"];		
		break;
	
	case "lt":  //by NotStyle & ( GodZero, negadink daugiau skripto) 
		aLangBuildings = ["", "MedÅ¾iÅ³ kirtavietÄ—", "Molio karjeras", "GeleÅ¾ies kasykla", "GrÅ«dÅ³ ferma", "LentpjÅ«vÄ—", "PlytinÄ—", "Liejykla", "MalÅ«nas", "Kepykla", "SandÄ—lis", "KlÄ—tis", "GinklÅ³ kalvÄ—", "Å arvÅ³ kalvÄ—", "Arena", "Gyvenamasis pastatas", "SusibÅ«rimo vieta", "TurgavietÄ—", "Ambasada", "KareivinÄ—s", "ArklidÄ—", "DirbtuvÄ—s", "Akademija", "SlÄ—ptuvÄ—", "RotuÅ¡Ä—", "Rezidencija", "Valdovo rÅ«mai", "IÅ¾dinÄ—", "Prekybos rÅ«mai", "DidÅ¾iosios kareivinÄ—s", "DidÅ¾ioji arklidÄ—", "MÅ«rinÄ— siena", "Gynybinis pylimas", "StatinÄ— tvora", "MÅ«rininÄ—", "Alaus darykla", "SpÄ…stinÄ—", "KarÅ¾ygio namai", "Didysis sandÄ—lys", "DidÅ¾ioji klÄ—tis", "Pasaulio stebuklas"];
		aLangTasks = ["Statyti", "Patobulinti", "SiÅ³sti karius", "TyrinÄ—ti", "Treniruoti"];
		aLangStrings = ["Statyti vÄ—liau", "Patobulinti vÄ—liau", "SiÅ³sti karius vÄ—liau", "TyrinÄ—ti vÄ—liau", "UÅ¾planuoti uÅ¾duotÄ¯.", "Mes pradÄ—jome statyti ", " Pabandyta, bet rezultatas neÅ¾ynomas.", "lygis", " neimanoma pastatyti.", " neimanoma patobulinti.", "UÅ¾duotis uÅ¾planuota.", "Einama gamyba:", "Mes negalime uÅ¾planuoti dabar sitÄ… uÅ¾duoti.", "UÅ¾duoties uÅ¾planavimas negalimas!", "UÅ¾planuotos uÅ¾duotys", "IÅ¡trinti", "SiÅ³sti vÄ—liau", "Ataka negali bÅ«ti uÅ¾planuota nes kariai nepasirinkti.", "JÅ«sÅ³ kariai nusiÅ³sti Ä¯", "JÅ«sÅ³ kariai negali bÅ«ti nusiÅ³sti Ä¯", "Parama", "Ataka", "Reidas", "Katapultos bus nutaikyti Ä¯", "atsitiktinis", "Ä¯", "arba vÄ—liau", "sekundÄ—s", "minutÄ—s", "valandos", "dienos", "ResursÅ³ bei pajÄ—gÅ³ Å¾valgyba", "GynybiniÅ³ fortifikacijÅ³ bei pajÄ—gÅ³ Å¾valgyba", "nÄ—ra", "Negalima uÅ¾planuoti atakos, nes taikinys nerastas.", "puslapyje Nr.", "RÅ«Å¡iuoti pagal:", "[tipÄ…] ", "[laikÄ…] ", "[taikinÄ¯] ", "pasirinktys ", "[gyvenvietÄ™] ",  "UÅ¾duoÄiÅ³ Praeitis"];
		aLangTroops[0] = ["Legionierius", "Pretorionas", "Imperionas", "Raitas legatas", "Imperatoriaus raitelis", "Cezario raitelis", "MÅ«radauÅ¾ys", "UgninÄ— katapulta", "Senatorius", "RomÄ—nÅ³ kolonistas", "Herojus"];  //RomÄ—nai
		aLangTroops[1] = ["PÄ—stininkas su kuoka", "Ietininkas", "PÄ—stininkas su kirviu", "Å½valgas", "Paladinas", "GermanÅ³ raitelis", "Taranas", "Katapulta", "GermanÅ³ vadas", "GermanÅ³ kolonistas", "Herojus"];  //Germanai
		aLangTroops[2] = ["Falanga", "PÄ—stininkas su kardu", "PÄ—dsekys", "Raitas perkÅ«nas", "Raitas druidas", "Raitas hedujas", "Taranas", "TrebuÅ¡etas", "GalÅ³ kunigaikÅ¡tis", "GalÅ³ kolonistas", "Herojus"];  //Galai
		break;	
	
	case  "mx":  //by Charlie Wolfgang [Mexican Spanish]
		aLangBuildings = ["", "Bosque", "Lodazal", "Mina de Hierro", "Cultivos", "Aserradero", "Ladrillar", "Fundidora", "Molino de Grano", "PanaderÃ­a", "Almacen", "Granero", "HerrerÃ­a", "ArmerÃ­a", "Plaza de torneos", "Centro Urbano", "Explanada", "Mercado", "Embajada", "Cuartel", "Establo", "Taller de Maquinaria", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Castillo", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplen", "Empalizada", "Cantero", "CervecerÃ­a", "Trampero", "Casa del HÃ©roe", "Almacen Grande", "Granero Grande", "Maravilla" ];
		aLangTasks = [ "Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir mÃ¡s tarde", "Mejorar mÃ¡s tarde", "Atacar mÃ¡s tarde",    "Investigar mÃ¡s tarde", "Programar esta tarea para mÃ¡s tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "ProducciÃ³n actual:", "No se puede programar esa tarea ahora.", "!La programaciÃ³n de tareas no estÃ¡ disponible!", "Tareas programadas", "Eliminar", "Enviar mÃ¡s tarde", "El ataque no ha sido programado porque no se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarÃ¡n...", "aleatorio", "a", "o despuÃ©s", "segundos", "minutos", "horas", "dÃ­as", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village " ];
		aLangTroops[ 0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Conquistador", "HÃ©roe" ];  //Romanos
		aLangTroops[1] = ["Lanzador de porras", "Luchador de lanza", "Luchador de hacha", "EmisarÃ­o", "Paladin", "Caballero Teuton", "Ariete", "Catapulta", "Cabecilla", "Conquistador", "HÃ©roe" ];  //Teutones
		aLangTroops[2] = ["Falange", "Luchador de espada", "Batidor", "Rayo de Theutates", "Caballista druida", "Haeduano", "Carnero de madera", "Trebunchet", "Cacique", "Conquistador", "HÃ©roe" ];  //Galos
		break;
		
	case "nl": //by Roshaoar & Kris Fripont
		aLangBuildings = ["", "Houthakker", "Klei-afgraving", "IJzermijn", "Graanveld", "Zaagmolen", "Steenbakkerij", "IJzersmederij", "Korenmolen", "Bakkerij", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Academie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Aardmuur", "Palissade", "Steenbakkerij", "Brouwerij", "Vallenzetter", "Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wonder"];
		aLangTasks = ["Gebouw Bouwen", "Verbeter", "Val Aan", "Ontwikkel", "Train"];
		aLangStrings = ["Bouw later", "Verbeter later", "Val later aan", "Ontwikkel later", "Plan deze taak voor later.", "Bouw is begonnen ", " geprobeerd maar resultaat onbekend.", "niveau", " kan niet worden gebouwd.", " kan niet worden verbeterd.", "deze taak was gepland.", "Actuele productie:", "We kunnen deze taak nu niet plannen.", "Deze taak plannen is niet beschikbaar!", "Geplande taken", "Verwijder", "Stuur later", "De aanval kan niet worden gepland omdat er geen troepen zijn geselecteerd.", "Jou troepen zijn gestuurd naar", "Jou troepen konden niet worden gestuurd naar", "Versterk", "Val aan", "Roof", "De katapulten zullen mikken op", "willekeurig", "op", "of na", "seconden", "minuten", "uren", "dagen", "spioneer naar voorraden en troepen", "spioneer naar troepen en verdediging", "weg", "Het aanval kan niet worden gepland omdat geen destinatie gezet was.", "op bouwplaats nummer ", "Sorteer via:", "soort ", "tijd ", "doel ", "keuzen ", "dorp "];
		aLangTroops[0] = ["Legionair", "Praetoriaan", "Imperiaan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Vuurkatapult", "Senator", "Kolonist", "Held"]; //Romeinen
		aLangTroops[1] = ["Knuppelvechter", "Speervechter", "Bijlvechter", "Verkenner", "Paladijn", "Germaanse Ridder", "Ram", "Katapult", "Leider", "Kolonist", "Held"]; //Germanen
		aLangTroops[2] = ["Phalanx", "Zwaardvechter", "Padvinder", "Toetatis Donder", "Druideruiter", "Haeduaan", "Ram", "Trebuchet", "Onderleider", "Kolonist", "Held"]; //GalliÃ«rs
		break;
		
	case "no":  //by Lordlarm @ S3 [*LORDS* 4 EVER]
        aLangBuildings = ["", "Tommer", "Leire", "Jern", "Korn", "Sagbruk", "Murer", "Jern-smelteverk", "Molle", "Bakeri", "Varehus", "Silo", "Rustningssmed", "Vabensmed", "Turneringsplass", "Hovedbygning", "Moteplass", "Markedsplass", "Ambassade", "Kaserne", "Stall", "Varksted", "Akademi", "Hemmelig jordkjeller", "Radhus", "Residens", "Palass", "Skattekammer", "Handelskontor", "Stor Kaserne", "Stor Stall", "Bymur", "Jordmur", "Palisade", "Stenhugger", "Bryggeri", "Fallemaker", "Heltenes villa", "Stort varehus", "Stor silo", "Verdensunderverk"];
        aLangTasks = ["Bygg", "Viderebygg", "Angrip", "Utforsk", "Tren"];
        aLangStrings = ["Bygg senere", "Viderebygg senere", "Angrip senere", "Utforsk senere", "Planlegg denne oppgaven til senere.", "Vi har startet byggingen", " Ble forsokt med ukjent resultat.", "Niva", " Kan ikke bygges.", " Kan ikke viderebygges.", "Opgaven ble planlagt til senere.", "Navarende produksjon:", "Vi kan ikke planlegge denne oppgave akkurat na.", "Oppgaveplanlegging er ikke tilgjengelig!", "Planlagte oppgaver", "Slett", "Send senere", "Det ikke er tropper tilgjengelig.", "Dine tropper ble sendt til", "Dine tropper kunne ikke sendes til", "Support", "Angrip", "Plyndringstokt", "Katapultene skyter mot", "tilfeldig", "mot", "eller mot", "sekunder", "minutter", "timer", "dager", "Spioner pa rastoffer og tropper", "Spioner pa forsvarsverk og tropper", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "v