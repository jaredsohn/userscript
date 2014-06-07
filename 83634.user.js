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
// @include     http://s1.travian.ph
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.2.10
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quite, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds. 
                          // Low value  = high accuracy in triggering tasks. To make your browser 
						  // unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = "en";    
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched. 
                        // If the code is not available by the time the construction should start, the 
						// construction will be cancelled. This value must be greater than iCheckEvery 
						// in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true;  //Display village names instead of numbers. May hit the performance.
var sCurrentServer = "";    // Set this to the server's url to override automatic server detection
                            // (i.e. s1.travian.net)
                            // Dont set it if you're playing on multiple servers simultaneously!

/**********************
**** End of Settings **** 
***********************/


/** GLOBALS - do not tamper! */

var init = detectLanguage() && initialize();

if (init) {   
    var sCurrentVersion = "1.3.7";  //Version number with which we need to run the update fu
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
		aLangBuildings = ["", "Drevorubac", "Hlinená bana", "Železná bana", "Obilné pole", "Píla", "Tehelna", "Zlievaren", "Mlyn", "Pekáren", "Sklad surovín", "Sýpka", "Kovácska dielna", "Zbrojnica", "Aréna", "Hlavná budova", "Bod stretnutia", "Trh", "Ambasáda", "Kasárne", "Stajne", "Dielna", "Akadémia", "Úkryt", "Radnica", "Rezidencia", "Palác", "Pokladna", "Obchodný kancelár", "Velké kasárne", "Velké stajne", "Mestské hradby", "Zemná hrádza", "Palisáda", "Kamenár", "Pivovar", "Pasce", "Hrdinský dvor", "Velký sklad", "Velká sýpka", "Div sveta"];
		aLangTasks = ["Postavit", "Rozšírit", "Zaútocit na", "Vynájst", "Trénovat"];
		aLangStrings = ["Postavit neskôr", "Rozšírit neskôr", "Zaútocit neskôr", "Vynájst neskôr", "Naplánujte túto akciu na neskôr.", "Zacali sme stavat ", " - úspech neznámy.", "úroven", " sa nedá postavit.", " sa nedá rozšírit.", "Úloha je naplánovaná.", "Aktuálna produkcia:", "Túto úlohu momentálne nie je možné naplánovat.", "Momentálne nie je možné plánovat úlohy!", "Naplánované úlohy", "Zmazat", "Vyslat neskôr", "Neboli vybraté žiadne jednotky.", "Jednotky mašírujú do", "Nepodarilo sa vyslat jednotky do", "Podporit", "Zaútocit na", "Olúpit", "Katapulty zacielit na", "náhodne", "o", "alebo za", "sekúnd", "minút", "hodín", "dní", "Preskúmat jednotky a suroviny", "Preskúmat jednotky a obranné objekty", "prec", "Útok nemožno naplánovat, pretože nie je známy ciel.", "na mieste c.", "Zoradit podla:", "typu ", "casu ", "ciela ", "iné ", "dediny ", "História akcií", "zmazat históriu", "Zacali sme vyvíjat ", " sa nedá vynájst.", "Vylepšit neskôr", "Vyšpehovat", "Trénovat neskôr", "jednotky.", "Vytrénovat", "Zacali sme trénovat ", " sa nedá vytrénovat." ];
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímske baranidlo", "Ohnivý katapult", "Senátor", "Osadník", "Hrdina"];  //Romans
		aLangTroops[1] = ["Pálkar", "Oštepár", "Bojovník so sekerou", "Špeh", "Rytier", "Teuton jazdec", "Germánske baranidlo", "Katapult", "Kmenový vodca", "Osadník", "Hrdina"];  //Teutons
		aLangTroops[2] = ["Falanx", "Šermiar", "Sliedic", "Theutates Blesk", "Druid jazdec", "Haeduan", "Drevené baranidlo", "Trebušé", "Nácelník", "Osadník", "Hrdina"];  //Gauls
		break;
	
	case "ae": //by Fahad
		aLangBuildings = ["", "??????", "???? ?????", "???? ????", "??? ?????", "???? ???????", "???? ?????", "???? ??????", "???????", "???????","????", "???? ??????", "????", "?????? ???????", "???? ???????", "?????? ???????", "???? ??????", "?????", "???????" ,"????", "???????", "??????? ???????","?????????? ???????", "??????", "???????", "?????", "???", "?????","?????? ???????", "?????? ???????", "??????? ??????", "??????","????? ?????", "???? ???????", "??????","???? ??????", "??????", "??? ???????", "?????????? ???????", "????? ?????? ???????", "????? ??????"];
		aLangTasks = ["????", "?????", "????", "??? ???", "?????"];
		aLangStrings = ["?????? ?????", "????? ?????", "?????? ?????", "??? ????? ?????", "????? ??? ????? ?????", "??? ?????????? ", " ??? ??????? ??? ?????? ???????.", "???????", " ?? ???? ?? ?????.", " ?? ???? ?? ?????", "??? ????? ?????","????? ??????", "?? ???? ????? ??? ??????? ???.", "????? ???????? ??? ?????","?????? ????????", "???", "????? ?????", "?? ??? ?????? ??????.", "?????? ??????? ???","????? ?? ???? ??????? ???", "??????", "????", "???", "????? ??????? ???", "??????","???", "?? ???", "?????", "?????", "????", "???", "?????? ??? ?????? ????????","?????? ??? ?????? ??????????", "????","?? ???? ????? ??? ?????? ??? ????? ??? ???? ", "?????? ??? ?????", "??? ??????:","????? ", "????? ", "????? ", "???????? ", "?????? ", "???? ??????", "??????? ?????","????? ????? ????? ", " ?? ?????? ????? ?????" , "????? ?????" , "????" , "????? ?????" , "????" , "?????" , "?? ??? ???????" , "?? ?????? ???????" ];	
		aLangTroops[0] = ["???? ???", "???? ??????????", "???? ?????", "???? ????", "???? ???????", "????? ????", "???", "??????? ??????", "????", "??????", "???"];  //Romans
		aLangTroops[1] = ["????? ??????", "????? ????", "????? ????", "??????", "????? ??????", "????? ???????", "????? ???????", "???????", "??????", "??????", "???"];  //Teutons
		aLangTroops[2] = ["???????", "?????", "????????", "??? ???????", "????? ?????", "????? ?????????", "????? ??????? ???????", "??????? ??????", "????", "??????", "???"];  //Gauls
		break;
	
	case "ar":
		aLangBuildings = ["", "Carpintería", "Cantera de arcilla", "Mina de Hierro", "Granja", "Aserradero", "Ladrillar", "Acería", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de torneos", "Edificio Principal", "Plaza de Reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero", "Mansión del Héroe", "Almacén Grande", "Granero Grande", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde",	"Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "?La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Jefe", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Rastreador", "Trueno Theutates", "Jinete Druida", "Haeduano", "Ariete", "Fundíbulo", "Cacique", "Colono", "Héroe"];  //Galos
		break;
		
	case "ba":  //by bhcrow
		aLangBuildings = ["", "Drvosjeca", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje", "Pilana", "Ciglana", "Ljevaonica željeza", "Mlin", "Pekara", "Skladište", "Silos", "Kovacnica oružja", "Kovacnica oklopa", "Mejdan", "Glavna zgrada", "Mjesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Štala", "Radionica", "Akademija", "Sklonište", "Opština", "Rezidencija", "Dvorac", "Treasury", "Trgovacki centar", "Velika kasarna", "Velika štala", "Gradski bedem", "Zid od zemlje", "Taraba", "Klesar", "Brewery", "Postavljac zamki", "Herojska vila", "Veliko skladište", "Veliki silos", "Svjetsko cudo"]; 
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "Istraži", "Obuci"];
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", "Napadni poslije", "Istraži poslije", "Isplaniraj ovaj zadatak za poslije.", "Pocela je gradnja ", " pokušano je s nepoznatim rezultatom.", "stepen", " ne može biti izgradeno.", " ne može se unaprijediti.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne može se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriši", "Pošalji poslije", "Trupe nisu odabrane.", "Vaša vojska je poslana na", "Vaša vojska ne može biti poslana na", "Podrška", "Napad", "Pljacka", "Katapulti ce rušiti", "slucajno", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "Špijuniraj resourse i trupe", "Špijuniraj trupe i odbranu", "away", "Napad ne može biti isplaniran jer destinacija nije odredena.", "na stranici br.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionar", "Preatorijanac", "Imperijanac", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ratni ovan", "Vatreni katapult", "Senator", "Naseljenik", "Hero"];  //Romans
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "Izvidac", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "Macevalac", "Izvidac", "Theutateov Grom", "druidni jahac", "Haeduan", "Ovan", "Katapult", "Starješina", "Naseljenik", "Hero"];  //Gauls
		break;	
		
	case "bg": //by penko
		aLangBuildings = ["", "??????", "??????? ???????", "??????", "????? ????", "????????????", "????????", "??????", "???????", "???????", "?????", "??????", "????????? ?? ?????", "????????? ?? ??????", "?????", "?????? ??????", "?????? ?????", "???????", "?????????", "???????", "???????", "???????????", "????????", "??????????", "??????? ?????", "??????????", "??????", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "??????", "???????", "????? ?????", "????? ??????", "????"];
		aLangTasks = ["??????????? ??", "?????????? ??", "????? ???", "????????? ??", "????????? ??"];
		aLangStrings = ["????????? ??-?????", "?????????? ??-?????", "?????????? ??-?????", "???????? ??-?????", "???????? ???? ?????? ?? ??-?????.", "??????? ?????? ", " ??????? ? ?????? ????????.", "????", " ?? ???? ?? ???? ?????????.", " ?? ???? ?? ???? ??????????.", "???????? ? ?????????.", "?????? ?????????:", "?? ? ???????? ???? ?????? ?? ???? ????????? ????.", "??????????? ?????? ?? ? ????????!", "????????? ??????", "?????????", "??????? ??-?????", "??????? ?? ???? ?? ???? ?????????, ?????? ?? ?? ??????? ???????.", "?????? ??????? ?? ????????? ???", "?????? ??????? ?? ????? ?? ????? ????????? ???", "???????????? ???", "????? ???", "????? ???", "??????????? ?? ????? ?", "????????", "?", "??? ????", "???????", "??????", "????", "????", "?????????? ?? ??????? ? ??????", "?????????? ?? ?????? ? ??????", "??????", "??????? ?? ???? ?? ???? ????????? ??? ???? ?? ? ??????? ???.", "at site no.", "????????? ??:", "??? ", "????? ", "??? ", "????? ", "???? ", "??????? ?? ????????", "?????????? ?? ?????????"];
		aLangTroops[0] = ["????????", "???????????", "????????", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "????????", "????? ????????", "???????", "????????", "?????"]; //Romans
		aLangTroops[1] = ["???? ? ????????", "??????????", "???? ? ??????n", "?????????", "???????", "????????? ?????", "?????", "????????", "???????????", "????????", "?????"]; //Teutons
		aLangTroops[2] = ["???????", "?????????", "???????????", "Theutates Thunder", "????? ??????", "??????", "?????", "????????", "????", "????????", "?????"]; //Gauls
		break;
		
	case "cl":  //Chilean - by Benjamin F.
		aLangBuildings = ["", "Lenador", "Barrera", "Mina de hierro", "Granja", "Serrería", "Ladrillar", "Fundición de hierro", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de torneos", "Edificio Principal", "Plaza de reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Centro Cívico", "Residencia", "Palacio", "Tesoro", "Oficina comercio", "Gran Cuartel", "Gran Establo", "Muralla", "Terraplén", "Empalizada", "Mansión del Arquitecto", "Cervecería", "Trampero", "Hogar del héroe", "Gran Almacén", "Gran Granero", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir más tarde", "Ampliar más tarde", "Atacar más tarde",	"Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "grado", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción:", "No se puede programar esa tarea ahora.", "?La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzos", "Ataque: normal", "Ataque: asalto", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Cabecilla", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Trueno de Theutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de guerra", "Cacique", "Colono", "Héroe"];  //Galos
		break;
	
	case "cn": //by Jacky-Q
		aLangBuildings = ["", "???", "???", "???", "??", "???", "???", "???", "??", "???", "??", "??", "???", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "??", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????"];
		aLangTasks = ["??", "??", "??", "??", "??"];
		aLangStrings = ["????", "????", "????", "????", "?????????.", "?????", " ????????", "??", " ????.", " ????.", "??????????.", "????", "????????????.", "????????!", "?????????", "??", "????", "????????????????.","???????", "????????", "??", "??", "??", "??????", "??", "?", "???", "?", "?", "?", "?", "???????", "???????","??", "????????,?????????.", "at site no.", "???:", "??", "??", "?? ", "??", "??"];
		aLangTroops[0] = ["?????", "???", "???", "????", "????", "????", "???", "?????", "???", "???", "??"]; //Romans
		aLangTroops[1] = ["???", "??", "???", "???", "???", "?????", "???", "???", "???", "???", "??"]; //Teutons
		aLangTroops[2] = ["???", "??", "???", "???", "?????", "?????", "???", "???", "??", "???", "??"]; //Gauls
		break;
		
	case "cz":
		aLangBuildings = ["", "Drevorubec", "Hlinený dul", "Železný dul", "Obilné pole", "Pila", "Cihelna", "Slévárna", "Mlýn", "Pekárna", "Sklad surovin", "Sýpka", "Kovárna", "Zbrojnice", "Turnajové hrište", "Hlavní budova", "Shromaždište", "Tržište", "Ambasáda", "Kasárny", "Stáje", "Dílna", "Akademie", "Úkryt", "Radnice", "Rezidence", "Palác", "Pokladnice", "Obchodní kancelár", "Velké kasárny", "Velká stáj", "Mestská zed", "Zemní hráz", "Palisáda", "Kameník", "Pivovar", "Pasti", "Hrdinský dvur", "Velký sklad", "Velká sýpka", "Div sveta"];
		aLangTasks = ["Postavit", "Rozšírit", "Zaútocit na", "Vyzkoumat", "Trénovat"];
		aLangStrings = ["Postavit pozdeji", "Rozšírit pozdeji", "Zaútocit pozdeji", "Vyzkoumat pozdeji", "Naplánujte tuto akci na pozdeji.", "Zacali jsme stavet ", " - výsledek je neznámý.", "úroven", " se nedá postavit.", " se nedá rozšírit.", "Úloha byla naplánována.", "Aktuální produkce:", "Tuto akci momentálne není možné naplánovat.", "Momentálne není možné plánovat žádné akce!", "Naplánované akce", "Smazat", "Vyslat pozdeji", "Útok není možné naplánovat, protože nebyly vybrány žádné jednotky.", "Jednotky jsou na ceste do", "Nepodarilo se vyslat jednotky do", "Podporit", "Zaútocit na", "Oloupit", "Katapulty zamírit na", "náhodne", "o", "anebo za", "sekund", "minut", "hodin", "dní", "Prozkoumat jednotky a suroviny", "Prozkoumat jednotky a obranné objekty", "pryc", "Útok není možné naplánovat, protože chybí cíl.", "na míste c.", "Trídit podle:", "druhu ", "casu ", "cíle ", "možnosti ", "vesnice ", "Historie", "smazat historii", "Zacli jsme vyvíjet ", " se nedá vynajít.", "Vylepšit pozdeji", "Vyšpehovat", "Vycvicit pozdeji", "jednotky.", "Vycvicit", "Zacli jsme cvicit ", " se nedá vycvicit." ];
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímanské beranidlo", "Ohnivý katapult", "Senátor", "Osadník"]; //Romans
		aLangTroops[1] = ["Pálkar", "Oštepar", "Sekerník", "Zved", "Rytír", "Teuton jezdec", "Germánské beranidlo", "Katapult", "Kmenový vudce", "Osadník"]; //Teutons
		aLangTroops[2] = ["Falanx", "Šermír", "Slídic", "Theutates Blesk", "Druid jezdec", "Haeduan", "Drevené beranidlo", "Válecný katapult", "Nácelník", "Osadník"]; //Gauls
		break; 	
		
	case "de":  //by Metador
		aLangBuildings = ["", "Holzfäller", "Lehmgrube", "Eisenmine", "Getreidefarm", "Sägewerk", "Lehmbrennerei", "Eisengießerei", "Getreidemühle", "Bäckerei", "Rohstofflager", "Kornspeicher", "Waffenschmiede", "Rüstungsschmiede", "Turnierplatz", "Hauptgebäude", "Versammlungsplatz", "Marktplatz", "Botschaft", "Kaserne", "Stall", "Werkstatt", "Akademie", "Versteck", "Rathaus", "Residenz", "Palast", "Schatzkammer", "Handelskontor", "Große Kaserne", "Großer Stall", "Stadtmauer", "Erdwall", "Palisade", "Steinmetz", "Brauerei", "Fallensteller", "Heldenhof", "Großes Rohstofflager", "Großer Kornspeicher", "Weltwunder"];
		aLangTasks = ["Gebäude bauen", "Ausbau von", "Angriff", "Unterstützung", "verbessern"];
		aLangStrings = ["Später bauen", "Später ausbauen", "Später angreifen", "Später unterstützen", "Führe den Auftrag später aus.", "Gebäudebau gestartet von ", " wurde versucht mit unbekannten Ergebnis.", "Stufe", " kann nicht gebaut werden.", " kann nicht ausgebaut werden.", "Der Auftrag wurde hinzugefügt.", "Produktion:", "Dieser Auftrag kann jetzt nicht Aufgegeben werden.", "Auftrag nicht verfügbar!", "Aufträge:", "Löschen", "Später senden", "Keine Truppen ausgewählt wurden.", "Deine Truppen wurden geschickt zu", "Deine Truppen konnten nicht geschickt werden zu", "Unterstützung", "Angriff: Normal", "Angriff: Raubzug", "Die Katapulte zielen auf", "Zufall", "um", "oder nach", "Sekunden", "Minuten", "Stunden", "Tage", "Rohstoffe und Truppen ausspähen", "Verteidigungsanlagen und Truppen ausspähen", "weg", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "dk":  //by Ronster Madsen
		aLangBuildings = ["", "Skovhugger", "Lergrav", "Jernmine", "Kornavler", "Savværk", "Lerbrænderi", "Jernstøberi", "Kornmølle", "Bageri", "Råstoflager", "Kornlager", "Rustningssmedje", "Våbensmedje", "Turneringsplads", "Hovedbygning", "Forsamlingsplads", "Markedsplads", "Ambassade", "Kaserne", "Stald", "Værksted", "Akademi", "Gemmested", "Rådhus", "Residens", "Palads", "Skatkammer", "Handelskontor", "Stor Kaserne", "Stor Stald", "Bymur", "Jordvold", "Palisade", "Stenhugger", "Bryggeri", "Fældebygger", "Heltebygning", "Stort Råstoflager", "Stort Kornkammer", "Verdensunder"];
		aLangTasks = ["Byg", "Viderebyg", "Angrib", "Udforsk", "Uddan"];
		aLangStrings = ["Byg senere", "Viderebyg senere", "Angrib senere", "Udforsk senere", "Planlæg denne opgave til  senere.", "Vi har startet byggeriet", " Blev forsøgt med ukendt resultat.", "Trin", " kan ikke bygges.", " kan ikke viderebygges.", "Opgaven blev planlagt til senere.", "Nuværende produktion:", "Vi kan ikke planlægge denne opgave lige nu.", "Opgaveplanlægning er ikke tilgængelig!", "Planlagte opgaver", "Slet", "Send senere", "Der ikke er tropper tilgængelig.",  "Dine tropper blev sendt til", "Dine tropper kunne ikke sendes til", "Opbakning", "Angrib", "Plyndringstogt", "Katapulterne skyder mod", "tilfældigt", "mod", "eller mod", "sekunder", "minutter", "timer", "dage", "Efterforsk råstoffer og tropper", "Efterforsk forsvarsanlæg og tropper", "væk", "Angrebet kan ikke planlægges pga. mangel på mål.", "på sted nr.", "Sorter efter:", "type ", "tid ", "mål", "valg ", "landsby ", "Opgave-historik", "slet historik", "vi startede udforskning ", " kan ikke udforskes.", "Forbedr senere", "Spion", "Uddan senere", "tropper.", "Uddan", "vi startede uddannelse", " kan ikke uddannes."];
		aLangTroops[0] = ["Legionær", "Prætorianer", "Imperianer", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Rambuk", "Brandkatapult", "Senator", "Bosætter", "Helt"];  //Romans
		aLangTroops[1] = ["Køllesvinger", "Spydkæmper", "Øksekæmper", "Spejder", "Paladin", "Teutonrytter", "Rambuk", "Katapult", "Stammefører", "Bosætter", "Helt"];  //Teutons
		aLangTroops[2] = ["Falanks", "Sværdkæmper", "Spion", "Theutaterlyn", "Druiderytter", "Haeduaner", "Rambuktræ", "Krigskatapult", "Høvding", "Bosæter", "Helt"];  //Gauls
		break;	
	
		
	case "es":  // by Gerard Tolosa
		aLangBuildings = ["", "Leñador ", "Barrera ", "Mina ", "Granja ", "Serrería", "Ladrillar", "Fundición de hierro", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de orneos", "Edificio principal", "Plaza de reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina comercio", "Cuartel grande", "Establo grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero", "Hogar del héroe", "Almacén grande", "Granero grande", "Maravilla"];
		aLangTasks = ["Construir", "Ampliación", "Enviar tropas", "Investigar", "Entrenar"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde", "Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "?La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Atracar", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Ordenar por:", "tipo ", "tiempo ", "objetivo ", "opciones ", "aldea "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "Paladín", "Jinete Teutón", "Ariete", "Catapulta", "Cabecilla", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Rayo de Teutates", "Jinete Druida", "Jinete Eduo", "Carnero de madera", "Catapulta de guerra", "Cacique", "Colono", "Héroe"];  //Galos
		break;
		
	case "fr":  //by arn0
		aLangBuildings = ["", "Bûcherons", "Carrière de terre", "Mine de fer", "Ferme", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place du tournoi", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Ecurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre du trésor", "Comptoir de commerce", "Grande caserne", "Grande écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de pierre", "Brasserie", "Fabricant de pièges", "Manoir du héros", "Grand dépôt", "Grand silo", "Merveille du monde"]; 
		aLangTasks = ["Construire le bâtiment", "Augmenter au", "Attack", "Research", "Train"];
		aLangStrings = ["Construire plus tard", "Améliorer plus tard", "Attaquer plus tard", "Rechercher plus tard", "Programmer cette tâche pour plus tard.", "Construction commencée ", " a été tenté sans résultats.", "niveau", " ne peut être construit.", " ne peut être amélioré.", "La tâche a été programmée.", "Production courante:", "Cette tâche ne peut être programmée actuellement.", "La programmation de tâches n'est pas disponible!", "Tâches programmées", "Supprimer", "Envoyer plus tard", "L'attaque ne peut pas être programmée car aucune troupe n'a été sélectionnée.", "Vos troupes ont été envoyées à", "Vos troupes n'ont pas pu être envoyées à", "Assistance", "Attaque: Normal", "Attaque: pillage", "Les catapultes ont pour cible", "aléatoire", "sur", "ou après", "secondes", "minutes", "heures", "jours", "Espionner troupes et ressources", "Espionner troupes et défenses", "ailleurs", "L'attaque ne peut être programmée car aucune destination n'a été spécifiée.", "au site no.", "Trier par:", "type ", "durée ", "cible ", "options ", "village "];
		aLangTroops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapule de feut", "Sénateur", "Colon", "Heros"];  //Romans
		aLangTroops[1] = ["Combattant au gourdin", "Combattant à la lance", "Combattant à la hache", "Eclaireur", "Paladin", "Cavalier teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Heros"];  //Teutons
		aLangTroops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de guerre", "Chef", "Colon", "Heros"];  //Gauls
		break;
	
	case "gr": //original by askgdb (fixed by tsekouri_gr)
		aLangBuildings = ["", "??????p??", "????e?? p????", "????e?? s?d????", "?????t?µa s?ta????", "??????st????", "F?????? p????", "??t???? s?d????", "????? s?ta????", "F??????", "?p????? p??t?? ????", "S?tap?????", "?p??p??e??", "?a??p??p??e??", "????? a???µ?t??", "?e?t???? ?t????", "??ate?a s???e?t??se??", "?????", "??esße?a", "St?at?ped?", "St?ß???", "???ast????", "??ad?µ?a", "??????a", "??µa??e??", "???a??", "?a??t?", "T?sa???f??????", "?µp????? ??afe??", "?e???? st?at?ped?", "?e????? st?ß???", "?e????", "?????? te????", "?e???? µe p?sa????", "????d?µ??", "????p????", "?t?µ? p?? st??e? pa??de?", "?e????? ?????", "?e???? ap?????", "?e???? s?tap?????", "?a???sµ?? ?a?µa"];
		aLangTasks = ["?atas?e??", "??aß??µ?s?", "?p??es?", "??e??a", "??pa?de?s?","?p?st??? ???t?? ????"];
		aLangStrings = ["?atas?e?? ????te?a", "??aß??µ?s? ????te?a", "?p??es? ????te?a", "??e??a ????te?a", "??a??aµµat?sµ?? ???as?a? G?a ????te?a.", "?e????se ?atas?e??", " ?p??e????e?? ?e ????st? ?p?t??esµa.", "?p?ped?", " ?e? ?p??e? ?a ?atas?e?aste?.", " ?e? ?p??e? ?a ??aßa?µ?ste?.", "? ???as?a ??a??aµµat?st??e .", "?a?a????:", "?e? ?p??e? ?a ??a??aµµat?s?e? ??t? ? ???as?a ???a.", "? ??a??aµµat?sµ?? ???as?a? ?e? ???a? ??a??s?µ??!", "??a??aµµat?sµ??e? ???as?e?", "??a??af?", "?p?st??? ????te?a", "? ?p??es? ?e? ?p??e? ?a ?????aµµat?s?e? ?pe?d? ?e? ?p???????a? St?at??te?.", "?? St?at??te? St?????a?", "?? St?at??te? ?e? ?p??esa? ?a Sta????", "???s??se??", "?p??es?", "??sß??? ??pa???", "?? ?atap??te? Ta St????s??? Se", "???a?a", "Se", "? ?et?", "?e?te???epta", "?ept?", "??e?", "???e?", "?????e?s? ???t?? ???? ?a? St?ate?µ?t??", "?????e?s? ?????s?? ?a? St?ate?µ?t??", "?a????", "? ?p??es? ?e? ?p??e? ?a ?????aµµat?s?e? ?pe?d? ?e? ???st??a? S??teta?µ??e? ? ???µa ??????.", "Se T?s?.", "?a????µ?s? ?at?:", "??p? ", "????? ", "St??? ", "?p?????? ", "????? ","?st????? ???as???", "?a?a??sµ?? ?st??????", "?e????se ? ??e??a ", " de? µp??e? ?a e?e????e?.", "?e?t??se a???te?a", "?????e?se", "??pa?de?se a???te?a", "µ???de?.", "??pa?de?se", "?e????se ? e?pa?de?s? ", " de? µp????? ?a e?pa?de?t???.", "? epa???aße", "f???? ", "d?af????ta? ?at? ", "?a?a??sµ?? ??sta? e??as??? ", "????? ap?sta?e?", "???s?ese a?t?? t?? e??as?a st? ??sta"];
		aLangTroops[0] = ["?e?e???????", "??a?t???a???", "?µpe??a???", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "????????t???? ?????", "?atap??t?? F?t???", "Ge???s?ast??", "?p?????", "???a?"]; //??µa???
		aLangTroops[1] = ["?a??t?? ?e ??pa??", "?a??t?? ?e ????t??", "?a??t?? ?e ?se?????", "?????e?t??", "?a?at????", "?e?t??a? ?pp?t??", "????????t???? ?????", "?atap??t??", "F??a????", "?p?????", "???a?"]; //?e?t??e?
		aLangTroops[2] = ["F??a??", "?a??t?? ?e ??f??", "?????e?t??", "?st?ap? ??? ???tat?", "?????d??", "?d??a???", "????????t???? ?????", "???eµ???? ?atap??t??", "???????", "?p?????", "???a?"]; //Ga??te?
		break;

	case "net":  //Spanish - by Carlos R.
		aLangBuildings = ["", "Carpintería", "Cantera de arcilla", "Mina de Hierro", "Granja", "Aserradero", "Ladrillar", "Acería", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de torneos", "Edificio principal", "Plaza de Reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero", "Mansión del Héroe", "Almacén Grande", "Granero Grande", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde",	"Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "?La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Jefe", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Rastreador", "Trueno Theutates", "Jinete Druida", "Haeduano", "Ariete", "Fundíbulo", "Cacique", "Colono", "Héroe"];  //Galos
		break;
		
	case "fi":  //by Zypper
		aLangBuildings = ["", "Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "Sahaamo", "Kivenhakkaaja", "Rautavalimo", "Viljamylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Marketti", "Lähetystö", "Kasarmi", "Hevostalli", "Työpaja", "Akatemia", "Kätkö", "Kaupungin talo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppamaja", "Suuri Kasarmi", "Suuri Hevostalli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Olut panimo", "Ansoittaja", "Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme"];
		aLangTasks = ["Rakenna", "Päivitä", "Hyökkää", "Tiedustele", "Kouluta"];
		aLangStrings = ["Rakenna myöhemmin", "Päivitä myöhemmin", "Hyökkää myöhemmin", "Tiedustele myöhemmin", "Lisää rakennusjonoon", "Rakenna ", " ei tuloksia.", "taso", " ei voida rakentaa.", " ei voida päivittää.", "Tehtävä lisätty rakennusjonoon.", "Nykyinen tuotanto:", "Ei voida lisätä rakennusjonoon juuri nyt.", "Lisäys ei ole saatavilla!", "Tehtävät rakennusjonossa", "Poista", "Lähetä myöhemmin", "Hyökkäystä ei voitu lisätä jonoon, koska yhtään joukkoja ei ole valittu.", "Joukkosi on lähetetty ", "Joukkojasi ei voida lähettää ", "Ylläpito", "Hyökkäys: Normaali", "Hyökkäys: Ryöstö", "Katapulttien kohde", "satunnainen", "nyt", "tai myöhemmin", "sekuntit", "minuutit", "tunnit", "päivät", "Tiedustele resursseja ja joukkoja", "Tiedustele joukkoja ja puollustuksia","poissa", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "gr": //original by askgdb (fixed by tsekouri_gr)
		aLangBuildings = ["", "??????p??", "????e?? p????", "????e?? s?d????", "?????t?µa s?ta????", "??????st????", "F?????? p????", "??t???? s?d????", "????? s?ta????", "F??????", "?p????? p??t?? ????", "S?tap?????", "?p??p??e??", "?a??p??p??e??", "????? a???µ?t??", "?e?t???? ?t????", "??ate?a s???e?t??se??", "?????", "??esße?a", "St?at?ped?", "St?ß???", "???ast????", "??ad?µ?a", "??????a", "??µa??e??", "???a??", "?a??t?", "T?sa???f??????", "?µp????? ??afe??", "?e???? st?at?ped?", "?e????? st?ß???", "?e????", "?????? te????", "?e???? µe p?sa????", "????d?µ??", "????p????", "?t?µ? p?? st??e? pa??de?", "?e????? ?????", "?e???? ap?????", "?e???? s?tap?????", "?a???sµ?? ?a?µa"];
		aLangTasks = ["?atas?e??", "??aß??µ?s?", "?p??es?", "??e??a", "??pa?de?s?","?p?st??? ???t?? ????"];
		aLangStrings = ["?atas?e?? ????te?a", "??aß??µ?s? ????te?a", "?p??es? ????te?a", "??e??a ????te?a", "??a??aµµat?sµ?? ???as?a? G?a ????te?a.", "?e????se ?atas?e??", " ?p??e????e?? ?e ????st? ?p?t??esµa.", "?p?ped?", " ?e? ?p??e? ?a ?atas?e?aste?.", " ?e? ?p??e? ?a ??aßa?µ?ste?.", "? ???as?a ??a??aµµat?st??e .", "?a?a????:", "?e? ?p??e? ?a ??a??aµµat?s?e? ??t? ? ???as?a ???a.", "? ??a??aµµat?sµ?? ???as?a? ?e? ???a? ??a??s?µ??!", "??a??aµµat?sµ??e? ???as?e?", "??a??af?", "?p?st??? ????te?a", "? ?p??es? ?e? ?p??e? ?a ?????aµµat?s?e? ?pe?d? ?e? ?p???????a? St?at??te?.", "?? St?at??te? St?????a?", "?? St?at??te? ?e? ?p??esa? ?a Sta????", "???s??se??", "?p??es?", "??sß??? ??pa???", "?? ?atap??te? Ta St????s??? Se", "???a?a", "Se", "? ?et?", "?e?te???epta", "?ept?", "??e?", "???e?", "?????e?s? ???t?? ???? ?a? St?ate?µ?t??", "?????e?s? ?????s?? ?a? St?ate?µ?t??", "?a????", "? ?p??es? ?e? ?p??e? ?a ?????aµµat?s?e? ?pe?d? ?e? ???st??a? S??teta?µ??e? ? ???µa ??????.", "Se T?s?.", "?a????µ?s? ?at?:", "??p? ", "????? ", "St??? ", "?p?????? ", "????? ","?st????? ???as???", "?a?a??sµ?? ?st??????", "?e????se ? ??e??a ", " de? µp??e? ?a e?e????e?.", "?e?t??se a???te?a", "?????e?se", "??pa?de?se a???te?a", "µ???de?.", "??pa?de?se", "?e????se ? e?pa?de?s? ", " de? µp????? ?a e?pa?de?t???.", "? epa???aße", "f???? ", "d?af????ta? ?at? ", "?a?a??sµ?? ??sta? e??as??? ", "????? ap?sta?e?", "???s?ese a?t?? t?? e??as?a st? ??sta"];
		aLangTroops[0] = ["?e?e???????", "??a?t???a???", "?µpe??a???", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "????????t???? ?????", "?atap??t?? F?t???", "Ge???s?ast??", "?p?????", "???a?"]; //??µa???
		aLangTroops[1] = ["?a??t?? ?e ??pa??", "?a??t?? ?e ????t??", "?a??t?? ?e ?se?????", "?????e?t??", "?a?at????", "?e?t??a? ?pp?t??", "????????t???? ?????", "?atap??t??", "F??a????", "?p?????", "???a?"]; //?e?t??e?
		aLangTroops[2] = ["F??a??", "?a??t?? ?e ??f??", "?????e?t??", "?st?ap? ??? ???tat?", "?????d??", "?d??a???", "????????t???? ?????", "???eµ???? ?atap??t??", "???????", "?p?????", "???a?"]; //Ga??te?
		break;
		
	case "hk":  //by Angus
	case "tw":
		aLangBuildings = ["", "???", "??", "???", "??", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????"];
		aLangTasks = ["??", "??", "??", "??", "??"];
		aLangStrings = ["????", "????", "????", "????", "??????????.", "????? ", " ????????.", "??", " ????.", " ????.", "??????????.", "????:", "????????????.", "????????!", "?????????", "??", "????", "????????????????.","???????", "????????", "??", "??", "??", "??????",	"??", "?", "???",	"?", "?", "?", "?", "???????", "???????","??", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hr":  //by Damir B.
		aLangBuildings = ["", "Drvosjeca", "Glinokop", "Rudnik željeza", "Farma", "Pilana", "Ciglana", "Ljevaonica željeza", "Žitni mlin", "Pekara", "Skladište", "Žitnica", "Kovacnica", "Oružarnica", "Arena", "Glavna zgrada", "Okupljalište", "Tržnica", "Veleposlanstvo", "Vojarna", "Konjušnica", "Radionica", "Akademija", "Skrovište resursa", "Gradska vijecnica", "Rezidencija", "Dvorac", "Treasury", "Ured za trgovinu", "Velika vojarna", "Velika konjušnica", "Zidine grada", "Zemljani zid", "Drveni zid", "Klesar", "Brewery", "Zamka", "Dvorac Heroja", "Veliko skladište", "Velika žitnica", "Svjetsko cudo"];
		aLangTasks = ["Izgradi", "Nadogradi", "Napad", "Istraži", "Treniraj"];
		aLangStrings = ["Gradi poslije", "Nadogradi poslije", "Napadni poslije", "Istraži poslije", "Isplaniraj ovaj zadatak za poslije.", "Pocela je gradnja ", " pokušano je s nepoznatim rezultatom.", "razina", " ne može biti izgradeno.", " ne može se nadograditi.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne može se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriši", "Pošalji poslije", "Trupe nisu odabrane.", "Vaša vojska je poslana na", "Vaša vojska ne može biti poslana na", "Podrška", "Napad", "Pljacka", "Katapulti ce rušiti", "slucajno", "u", "ili nakon", "sekundi", "minuta", "sati", "dana", "Špijuniraj resourse i trupe", "Špijuniraj trupe i odbranu", "odsutan", "Napad ne može biti isplaniran jer destinacija nije odredena.", "na stranici br.", "Sortiraj po:", "tip ", "vrijeme ", "meta ", "opcije ", "selo "];
		aLangTroops[0] = ["Legionar", "Preatorijan", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ovan za probijanje", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"]; //Romans
		aLangTroops[1] = ["Gorštak", "Kopljanik", "Borac sa sjekirom", "Izvidnik", "Paladin", "Teutonski vitez", "Ovan za probijanje", "Katapult", "Poglavica", "Naseljenik", "Heroj"]; //Teutons
		aLangTroops[2] = ["Falanga", "Macevalac", "Tragac", "Theutatesov grom", "Druid jahac", "Haeduan", "Ovan za probijanje", "Trebuše", "Starješina", "Naseljenik", "Heroj"]; //Gauls 
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangBuildings = ["", "Favágó", "Agyagbánya", "Vasércbánya", "Búzafarm", "Fürész üzem", "Agyagégeto", "Vasöntöde", "Malom", "Pékség", "Raktár", "Magtár", "Fegyverkovács", "Páncélkovács", "Gyakorlótér", "Foépület", "Gyülekezotér", "Piac", "Követség", "Kaszárnya", "Istálló", "Muhely", "Akadémia", "Rejtekhely", "Tanácsháza", "Rezidencia", "Palota", "Kincstár", "Kereskedelmi központ", "Nagy Kaszárnya", "Nagy Istálló", "Kofal", "Földfal", "Cölöpfal", "Kofaragó", " Sörfozde", "Csapdakészíto", "Hosök háza", "Nagy Raktár", "Nagy Magtár", "Világcsoda"];
		aLangTasks = ["Építés", "Szintemelés", "Támadás", "Fejlesztés", "Kiképzés"];
		aLangStrings = ["Építés késobb", "Szintemelés késobb", "Támadás késobb", " Fejlesztés késobb", "A muvelet idozítve késobbre.", "Az építés elkezdodött ", " Megpróbáltam ismeretlen eredménnyel.", "szint", "nem épülhet meg.", " nem lehet szintetemelni.", "Idozítésre került feladat:", " Jelenlegi termelés:", "Jelenleg nem idozítheto", "A feladat idozítés nem elérheto!", "Idozített feladatok:", "Törlés", "Küldés késobb", "A támadás nem idozítheto! Nem lettek egységek kiválasztva.", "Az egységeid elküldve", "Az egységek elküldése nem sikerült, ide:", "Támogatás", "Normál támadás", "Rablótámadás", "A katapult(ok) célpontja", "véletlenszeru", "Ekkor:", "vagy késleltetve", "másodperccel", "perccel", "órával", "nappal", "Nyersanyagok és egységek kikémlelése", "Egységek és épületek kikémlelése", "távol", "A támadás nem idozítheto! Nem lett végcél kiválasztva.", "a következo azonisítóval rendelkezo helyen:", "Rendezés:", "típus ", "ido ", "célpont ", "beállítások ", "falu ", "History", "elozmények törlése"];
		aLangTroops[0] = ["Légiós", "Testor", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Faltöro kos", "Tuzkatapult", "Szenátor", "Telepes"];  //Római
		aLangTroops[1] = ["Buzogányos", "Lándzsás", "Csatabárdos", "Felderíto", "Paladin", "Teuton lovag", "Faltöro kos", "Katapult", "Törzsi vezeto", "Telepes"];  //Germán
		aLangTroops[2] = ["Phalanx", "Kardos", "Felderíto", "Theutat villám", "Druida lovas", "Haeduan", "Falromboló", "Harci-katapult", "Fonök", "Telepes"];  //Gall		
		break;	
	
	case "id":  //by Wiewie Liu
               aLangBuildings = ["", "Penebangan Kayu", "Penggalian Tanah Liat", "Tambang Besi", "Ladang", "Pemotong Kayu", "Pabrik Bata", "Pelebur Besi", "Penggilingan Gandum", "Toko Roti", "Gudang", "Lumbung", "Tukang Besi", "Gudang Senjata", "Pusat Kebugaran", "Bangunan Utama", "Titik Temu", "Pasar", "Kedutaan", "Barak", "Istal", "Bengkel", "Akademi", "Cranny", "Balai Desa", "Kastil", "Istana", "Gudang Ilmu", "Kantor Dagang", "Barak Besar", "Istal Besar", "Pagar Kota", "Pagar Tanah", "Pagar Kayu", "Tukang Batu", "Pabrik Minuman", "Ahli Perangkap", "Padepokan", "Gudang Besar", "Lumbung Besar", "Kejaiban Dunia"];
		aLangTasks = ["Bangun", "Upgrade", "Serang", "Research", "Train"];
		aLangStrings = ["Bangun nanti", "Upgrade nanti", "Serang nanti", "Research nanti", "Atur tugas ini untuk nanti.", "Kita mulai bangun ", " telah dicoba dengan hasil tak diketahui.", "tingkat", " tidak bisa dibangun.", " tidak bisa diupgrade.", "Tugas sudah dischedule.", "Kapasitas Produksi:", "Kita tidak bisa schedule tugas saat ini.", "Jadwal tugas tidak tersedia!", "Jadwal Tugas", "Hapus", "Kirim nanti", "Tidak ada prajurit yang dipilih.", "Prajurit terkirim ke", "Prajurit anda tidak bisa dikirim ke", "Bantuan", "Serangan", "Raid", "Catapults akan menyerang", "random", "pada", "atau setelah", "detik", "menit", "jam", "hari", "Mata-mata untuk sumber daya dan pasukan", "Mata-mata untuk pasukan dan pertahanan", "pergi", "Serangan tidak bisa dischedule karena tidak ada tujuan", "di site no.", "Sort by:", "tipe ", "waktu ", "tujuan ", "pilihan ", "desa "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;

	case "it":  //by Tazzicus & gino gino

		aLangBuildings = ["", "Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "Falegnameria", "Fabbrica di mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Stanza del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura Cittadine", "Murata in terra", "Palizzata", "Genio civile", "Birreria", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia"];		
		aLangTasks = ["Costruisci", "Amplia", "Attacca", "Ricerca", "Addestra", "Invia Risorse"];
		aLangStrings = ["Costruisci piu' tardi", "Amplia piu' tardi", "Attacca piu' tardi", "Ricerca piu' tardi", "Programma questa attivita'.", "E' iniziata la costruzione di ", " e' stata tentata con risultato sconosciuto.", "livello", " non puo' essere costruito.", " non puo' essere ampliato.", "L'attivita' e' stata programmata.", "Produzione:", "Non e' possibile programmare questa attivita' adesso.", "Programmazione attivita' non disponibile!", "Attivita' Programmate", "Cancella", "Invia piu' tardi", "L'attacco non puo' essere programmato in quanto non sono state selezionate truppe.", "Truppe sono state inviate a", "Non e' stato possibile inviare le truppe a", "Rinforzo", "Attacco", "Raid", "Obbiettivo catapulte:", "a caso", "all'orario", "oppure dopo", "secondi", "minuti", "ore", "giorni", "Spiare truppe e risorse", "Spiare difese e truppe", "assente", "L'attacco non puo' essere programmato in quanto non e' stato specificato l'obbiettivo.", "alla posizione n.", "Ordina per:", "tipo ", "orario ", "obbiettivo ", "opzioni ", "villaggio", "Archivio Attivita'", "svuota archivio", "La ricerca è iniziata", " non può essere ricercato", "Migliora più tardi", "Spia", "Addestra più tardi", "truppe.", "Addestra", "L'Addestramamento è iniziato ", " non può essere addestrato."];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"];
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"];
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribu'", "Decurione", "Eroe"];		
		break;

	case "jp":  //by so-men
		aLangBuildings = ["", "???", "?????", "???", "???", "???", "??????", "???", "???", "????", "??", "??", "???", "????", "???", "??", "???", "??", "???", "??", "??", "???", "??", "????", "???", "??", "??", "??", "?????", "???", "??", "??", "??", "??", "??", "???", "???", "????", "???", "???", "????·??·?·????"];
		aLangTasks = ["??", "?????", "??", "??", "??","?????"];
		aLangStrings = ["???????", "??????????", "???????", "???????", "??????????????", "????????: ", " ??????????????????", "???", " ?????????", " ?????????????", "????????????", "??????", "????????????????????", "????????????????!", "?????", "??", "?????", "?????????????", "?????????: ", "????????????: ", "??", "??", "??", "????????: ", "????", "????:", "????????:", "?", "?", "?", "?", "????????", "?????????", "away", "?????????????????????????????????", "???No.", "???:", "??? ", "?? ", "????? ", "options ", "? ", "?????", "??????", "?????????: ", " ?????????","?????", "??", "?????", "??", "??", "?????????: ", " ?????????","???? ","????? - ","????: ","?????????? ","??????","????????????"];
		aLangTroops[0] = ["?????", "??????", "??????", "?????·????", "?????·???????", "?????·?????", "??????·??", "????·?????", "??", "???", "??"];  //Romans
		aLangTroops[1] = ["????????", "?????", "??????", "????", "?????", "???????·???", "??", "?????", "??", "???", "??"];  //Teutons
		aLangTroops[2] = ["??????", "?????", "????????", "???????·????", "????????", "?????", "??", "?????", "??", "???", "??"];  //Gauls

	case "kr": //by Xenosia
		aLangBuildings = ["", "???", "?? ??", "???", "??", "???", "????", " ???", "???", "???", "??", "????", "???", "???", "???", "???", "???", "? ?", "???", "??", "???", "??", "???", "????", "????", "??", "??", "????",  "?????", "???", "????", "??", "??", "??", "???", "????", "??", "?? ??",  "???", "?????", "??? ????"];
		aLangTasks = ["?? ??", "?????", "??", "??", "??","?? ???"];
		aLangStrings = ["?? ??", "????? ??", "?? ??", "?? ??", "??? ?? ?? ??.", "??? ??: ", " ?(?) ???? ??? ???? ?????.", "??", "?(?) ????  ??.", "?(?) ????? ?? ??.", "??? ???????.", "?? ???:", "? ??? ?? ?? ? ? ????.", "??? ??? ??????!", "??? ??", "??", "??? ??", "??? ???  ????.", "??? ??: ", "??? ??? ??: ", "??", "??", "??", "???? ???: ", "? ?", "??", "?? ???", "?", "?", "?", "?", "??? ??? ??", "??? ??? ??", "? ?", "? ??? ???? ???? ?? ??? ???.", "?? ??.", "??:", "?? ", "?? ", "??  ", "?? ", "?? ", "?? ???", "?? ???", "??? ??: ", "?(?) ???? ?????.","? ?? ??", "??", "??? ??", "??.", "??", "??? ??: ", "?(?)???? ?????.","? ? ?? ","? ","????: ","?? ?? ?? ","?? ?????.","??? ???? ???"];
		aLangTroops[0] = ["???", "???", "???", "?? ??", "?? ??", "?? ??",  "???", "? ???", "??? ??", "???", "??"];  //Romans
		aLangTroops[1] = ["??", "??", "???", "???", "???", "?? ??", "???",  "???", "????", "???", "??"];  //Teutons
		aLangTroops[2] = ["????", "??", "???", "???? ??", "???? ???", " ???", "???", "???", "??", "???", "??"];  //Gauls
		break;
	
	case "lt":  //by NotStyle & ( GodZero, negadink daugiau skripto) 
		aLangBuildings = ["", "Medžiu kirtaviete", "Molio karjeras", "Geležies kasykla", "Grudu ferma", "Lentpjuve", "Plytine", "Liejykla", "Malunas", "Kepykla", "Sandelis", "Kletis", "Ginklu kalve", "Šarvu kalve", "Arena", "Gyvenamasis pastatas", "Susiburimo vieta", "Turgaviete", "Ambasada", "Kareivines", "Arklide", "Dirbtuves", "Akademija", "Sleptuve", "Rotuše", "Rezidencija", "Valdovo rumai", "Iždine", "Prekybos rumai", "Didžiosios kareivines", "Didžioji arklide", "Murine siena", "Gynybinis pylimas", "Statine tvora", "Murinine", "Alaus darykla", "Spastine", "Karžygio namai", "Didysis sandelys", "Didžioji kletis", "Pasaulio stebuklas"];
		aLangTasks = ["Statyti", "Patobulinti", "Siusti karius", "Tyrineti", "Treniruoti"];
		aLangStrings = ["Statyti veliau", "Patobulinti veliau", "Siusti karius veliau", "Tyrineti veliau", "Užplanuoti užduoti.", "Mes pradejome statyti ", " Pabandyta, bet rezultatas nežynomas.", "lygis", " neimanoma pastatyti.", " neimanoma patobulinti.", "Užduotis užplanuota.", "Einama gamyba:", "Mes negalime užplanuoti dabar sita užduoti.", "Užduoties užplanavimas negalimas!", "Užplanuotos užduotys", "Ištrinti", "Siusti veliau", "Ataka negali buti užplanuota nes kariai nepasirinkti.", "Jusu kariai nusiusti i", "Jusu kariai negali buti nusiusti i", "Parama", "Ataka", "Reidas", "Katapultos bus nutaikyti i", "atsitiktinis", "i", "arba veliau", "sekundes", "minutes", "valandos", "dienos", "Resursu bei pajegu žvalgyba", "Gynybiniu fortifikaciju bei pajegu žvalgyba", "nera", "Negalima užplanuoti atakos, nes taikinys nerastas.", "puslapyje Nr.", "Rušiuoti pagal:", "[tipa] ", "[laika] ", "[taikini] ", "pasirinktys ", "[gyvenviete] ",  "Užduociu Praeitis", "[išvalyti praeiti]", "Mes pradejome tyrinejima ", " negali buti tyrinejamas."];
		aLangTroops[0] = ["Legionierius", "Pretorionas", "Imperionas", "Raitas legatas", "Imperatoriaus raitelis", "Cezario raitelis", "Muradaužys", "Ugnine katapulta", "Senatorius", "Romenu kolonistas", "Herojus"];  //Romenai
		aLangTroops[1] = ["Pestininkas su kuoka", "Ietininkas", "Pestininkas su kirviu", "Žvalgas", "Paladinas", "Germanu raitelis", "Taranas", "Katapulta", "Germanu vadas", "Germanu kolonistas", "Herojus"];  //Germanai
		aLangTroops[2] = ["Falanga", "Pestininkas su kardu", "Pedsekys", "Raitas perkunas", "Raitas druidas", "Raitas hedujas", "Taranas", "Trebušetas", "Galu kunigaikštis", "Galu kolonistas", "Herojus"];  //Galai
		break;	

	case "lv":  // by kaads & Pravietis
		aLangBuildings = ["", "Mežcirtejs", "Mala Karjers", "Dzelzs Raktuves", "Labibas Lauks", "Kokzagetava", "Kiegelu Fabrika", "Cugunlietuve", "Dzirnavas", "Maiznica", "Noliktava", "Klets", "Ierocu Kaltuve", "Brunu Kaltuve", "Turniru Laukums", "Galvena eka", "Mitina Vieta", "Tirgus Laukums", "Vestnieciba", "Kazarmas", "Stallis", "Darbnica", "Akademija", "Pasleptuve", "Ratsnams", "Rezidence", "Pils", "Dargumu glabatuve", "Tirdzniecibas Postenis", "Lielas Kazarmas", "Lielais Stallis", "Pilsetas Muris", "Zemes Muris", "Palisade", "Akmenlauztuve", "Bars", "Mednieku maja", "Varonu Savrupmaja", "Liela Noliktava", "Liela Klets", "Pasaules Brinums"];
		aLangTasks = ["Buvet", "Paplašinat", "Uzbrukt", "Izpetit", "Apmacit","Sutit resursus"];
		aLangStrings = ["Celt velak", "Paplašinat velak", "Uzbrukt velak", "Apmacit velak", "Ieklaut šo darba saraksta", "Mes sakam celt ", " tika iesakts ar nezinamu rezultatu", "limeni", " nevar uzcelt.", " nevar paplašinat", "Uzdevums tika ieklauts darba saraksta", " Produkcija:", "mes patreiz nevaram ieklaut šo uzdevumu darba saraksta", "Darba saraksta izveide patreiz nav pieejama", "Darba saraksts", "Dzest", "Sutit velak", "Kareivji netika izveleti.", "Tavi kareivji tika aizsutiti uz", "Tavi kareivji nevar tikt aizsutiti uz", "Papildspeki", "Uzbrukums", "Iebrukums", "Katapultas temes uz", "nejaušs", "uz", "vai pec", "sekundes", "minutes", "stundas", "dienas", "Izspiegot resursus un kareivjus", "Izspiegot kareivjus un aizsardzibu", "prom", "Uzbrukums nevar tikt ieklauts darba saraksta jo netika izvelets merkis.", "vieta nummur", "Sakartot pec:", "tipa ", "laika ", "merka ", "iespejas ", "ciems ","Ieklaut šo uzdevumu darba saraksta"];
		aLangTroops[0] = ["Legionars", "Pretorietis", "Iekarotajs", "Zinnesis", "Romas Jatnieks", "Romas Bruninieks", "Mura Brucinatajs", "Uguns Katapulta", "Senators", "Kolonists", "Varonis"]; //Romans
		aLangTroops[1] = ["Rungas Vezetajs", "Škepnesis", "Karacirvja Vezetajs", "Izluks", "Bruninieks", "Germanu Bruninieks", "Postitajs", "Katapulta", "Virsaitis", "Kolonists", "Varonis"]; //Teutons
		aLangTroops[2] = ["Falanga", "Zobenbralis", "Peddzinis", "Zibens Jatnieks", "Priesteris - Jatnieks", "Edujs", "Tarans", "Trebušets", "Barvedis", "Kolonists", "Varonis"]; //Gauls
		break;
			
	case  "mx":  //by Charlie Wolfgang [Mexican Spanish]
		aLangBuildings = ["", "Bosque", "Lodazal", "Mina de Hierro", "Cultivos", "Aserradero", "Ladrillar", "Fundidora", "Molino de Grano", "Panadería", "Almacen", "Granero", "Herrería", "Armería", "Plaza de torneos", "Centro Urbano", "Explanada", "Mercado", "Embajada", "Cuartel", "Establo", "Taller de Maquinaria", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Castillo", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplen", "Empalizada", "Cantero", "Cervecería", "Trampero", "Casa del Héroe", "Almacen Grande", "Granero Grande", "Maravilla" ];
		aLangTasks = [ "Construir", "Mejorar", "Atacar", "Investigar", "Entrenar"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde",    "Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "!La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "El ataque no ha sido programado porque no se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village " ];
		aLangTroops[ 0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Conquistador", "Héroe" ];  //Romanos
		aLangTroops[1] = ["Lanzador de porras", "Luchador de lanza", "Luchador de hacha", "Emisarío", "Paladin", "Caballero Teuton", "Ariete", "Catapulta", "Cabecilla", "Conquistador", "Héroe" ];  //Teutones
		aLangTroops[2] = ["Falange", "Luchador de espada", "Batidor", "Rayo de Theutates", "Caballista druida", "Haeduano", "Carnero de madera", "Trebunchet", "Cacique", "Conquistador", "Héroe" ];  //Galos
		break;
		
	case "nl": //by Roshaoar & Kris Fripont
		aLangBuildings = ["", "Houthakker", "Klei-afgraving", "IJzermijn", "Graanveld", "Zaagmolen", "Steenbakkerij", "IJzersmederij", "Korenmolen", "Bakkerij", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Academie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Aardmuur", "Palissade", "Steenbakkerij", "Brouwerij", "Vallenzetter", "Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wonder"];
		aLangTasks = ["Gebouw Bouwen", "Verbeter", "Val Aan", "Ontwikkel", "Train"];
		aLangStrings = ["Bouw later", "Verbeter later", "Val later aan", "Ontwikkel later", "Plan deze taak voor later.", "Bouw is begonnen ", " geprobeerd maar resultaat onbekend.", "niveau", " kan niet worden gebouwd.", " kan niet worden verbeterd.", "deze taak was gepland.", "Actuele productie:", "We kunnen deze taak nu niet plannen.", "Deze taak plannen is niet beschikbaar!", "Geplande taken", "Verwijder", "Stuur later", "De aanval kan niet worden gepland omdat er geen troepen zijn geselecteerd.", "Jou troepen zijn gestuurd naar", "Jou troepen konden niet worden gestuurd naar", "Versterk", "Val aan", "Roof", "De katapulten zullen mikken op", "willekeurig", "op", "of na", "seconden", "minuten", "uren", "dagen", "spioneer naar voorraden en troepen", "spioneer naar troepen en verdediging", "weg", "Het aanval kan niet worden gepland omdat geen destinatie gezet was.", "op bouwplaats nummer ", "Sorteer via:", "soort ", "tijd ", "doel ", "keuzen ", "dorp "];
		aLangTroops[0] = ["Legionair", "Praetoriaan", "Imperiaan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Vuurkatapult", "Senator", "Kolonist", "Held"]; //Romeinen
		aLangTroops[1] = ["Knuppelvechter", "Speervechter", "Bijlvechter", "Verkenner", "Paladijn", "Germaanse Ridder", "Ram", "Katapult", "Leider", "Kolonist", "Held"]; //Germanen
		aLangTroops[2] = ["Phalanx", "Zwaardvechter", "Padvinder", "Toetatis Donder", "Druideruiter", "Haeduaan", "Ram", "Trebuchet", "Onderleider", "Kolonist", "Held"]; //Galliërs
		break;
		
	case "no":  //by Lordlarm @ S3 [*LORDS* 4 EVER]
        aLangBuildings = ["", "Tommer", "Leire", "Jern", "Korn", "Sagbruk", "Murer", "Jern-smelteverk", "Molle", "Bakeri", "Varehus", "Silo", "Rustningssmed", "Vabensmed", "Turneringsplass", "Hovedbygning", "Moteplass", "Markedsplass", "Ambassade", "Kaserne", "Stall", "Varksted", "Akademi", "Hemmelig jordkjeller", "Radhus", "Residens", "Palass", "Skattekammer", "Handelskontor", "Stor Kaserne", "Stor Stall", "Bymur", "Jordmur", "Palisade", "Stenhugger", "Bryggeri", "Fallemaker", "Heltenes villa", "Stort varehus", "Stor silo", "Verdensunderverk"];
        aLangTasks = ["Bygg", "Oppgrader", "Angrip", "Utforsk", "Tren"];
        aLangStrings = ["Bygg senere", "Oppgrader senere", "Angrip senere", "Utforsk senere", "Planlegg denne oppgaven til senere.", "Vi har startet byggingen", " Ble forsokt med ukjent resultat.", "Niva", " Kan ikke bygges.", " Kan ikke viderebygges.", "Opgaven ble planlagt til senere.", "Navarende produksjon:", "Vi kan ikke planlegge denne oppgave akkurat na.", "Oppgaveplanlegging er ikke tilgjengelig!", "Planlagte oppgaver", "Slett", "Send senere", "Det ikke er tropper tilgjengelig.", "Dine tropper ble sendt til", "Dine tropper kunne ikke sendes til", "Support", "Angrip", "Plyndringstokt", "Katapultene skyter mot", "tilfeldig", "mot", "eller mot", "sekunder", "minutter", "timer", "dager", "Spioner pa rastoffer og tropper", "Spioner pa forsvarsverk og tropper", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "br":
	case "pt":  //by Guinness
		aLangBuildings = ["", "Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de Torneios", "Edifício Principal", "Ponto de Reunião Militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Câmara do Tesouro", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Muro de Terra", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas", "Mansão do Herói", "Grande Armazém", "Grande Celeiro", "Maravilha do Mundo"];
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", "Atacar Mais Tarde", "Desenvolver Mais Tarde", "Programar esta tarefa para mais tarde.", "Começamos a construir ", " foi tentada a tarefa mas com resultado desconhecido.", "nível", " não pode ser construído.", " não pode ser melhorado.", "A tarefa foi programada.", "Em construção:", "Não conseguimos programar esta tarefa agora.", "Programação de tarefas não está disponível!", "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "Não foram seleccionadas tropas.", "As tuas tropas foram enviadas para", "Não foi possível enviar as tuas tropas para", "Reforços", "Ataque:normal", "Ataque:assalto", "O alvo das Catapultas será", "Aleatório", "rs", "ou depois","segundos", "minutos", "horas", "dias","Espiar recursos e tropas", "Espiar defesas e tropas", "Ausente", "O ataque não pode ser programado pois nenhum destino foi escolhido.", "na localização ns.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador"]; //Romans
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador"]; //Teutons
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador"]; //Gauls
		break; 
		
	case "pl":  //by Oskar
        aLangBuildings = ["", "Las", "Kopalnia gliny", "Kopalnia zelaza", "Pole zboza", "Tartak", "Cegielnia", "Huta stali", "Mlyn", "Piekarnia", "Magazyn surowców", "Spichlerz","Zbrojownia", "Kuznia", "Plac turniejowy", "Glówny budynek", "Miejsce zbiórki", "Rynek", "Ambasada", "Koszary", "Stajnia", "Warsztat", "Akademia", "Kryjówka", "Ratusz", "Rezydencja", "Palac","Skarbiec", "Targ", "Duze koszary", "Duza stajnia", "Mury obronne", "Waly", "Palisada", "Kamieniarz", "Browar", "Traper", "Dwór bohaterów", "Duzy magazyn", "Duzy spichlerz", "Cud"];
        aLangTasks = ["Buduj", "Rozbuduj", "Atak", "Zbadac", "Szkolic"];
        aLangStrings = ["Buduj pózniej", "Rozbuduj pózniej", "Atakuj pózniej", "Zbadaj pózniej", "Zaplanuj zadanie na pózniej.", "Rozpoczeto budowe ", " zostala podjeta z nieznanym skutkiem.", "poziom", " nie moze byc zbudowany.", " nie moze byc rozbudowany.", "Zadanie zostalo zaplanowane.", "Aktualna produkcja:", "Nie mozna teraz zaplanowac tego zadania.", "Planowanie nie dostepne!", "Zaplanowane zadania", "Usun", "Wyslij pózniej", "Nie wybrano zadnych jednostek.", "Twoje jednoski zostaly wyslane", "Twoje jednostki nie moga zostac wyslane", "Pomoc", "Atak", "Grabiez", "Katapulty celuja w", "losowy", "o", "lub za", "sekundy", "minuty", "godziny", "dni", "Obserwuj surowce i jednostki", "Obserwuj fortyfikacje i jednostki", "nieobecny", "Atak nie moze zostac zaplanowany, poniewaz nie wybrano celu.", "Na pozycji nr.", "Sortowanie:", "typ ", "czas ", "cel ", "opcje ", "osada ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Szkolic pózniej", "troops.", "Train", "We started training ", " cannot be trained."];
		aLangTroops[0] = ["Legionista", "Pretorianin", "Centurion", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Taran", "Ognista katapulta", "Konsul", "Osadnik", "Bohater"];  //Romans
		aLangTroops[1] = ["Palkarz", "Oszczepnik", "Topornik", "Zwiadowca", "Paladyn", "Germanski Rycerz", "Taran", "Katapulta", "Wódz", "Osadnik", "Bohater"];  //Teutons
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jezdziec Druidzki", "Haeduan", "Taran", "trebeusz", "Herszt", "Osadnik", "Bohater"];  //Gauls		
		break;
	
	case "ro":  //Dark EingeL
	    aLangBuildings = ["", "Cherestea", "Put de lut", "Mina de fier", "Lan de grau", "Fabrica de cherestea", "Fabrica de caramida", "Topitorie", "Moara", "Brutarie", "Hambar", "Granar", "Fierarie", "Armurier", "Arena", "Primarie", "Adunare", "Targ", "Ambasada", "Cazarma", "Grajd", "Atelier", "Academie", "Beci", "Casa de cultura", "Vila", "Palat", "Trezorerie", "Oficiu comert", "Cazarma extinsa", "Grajd extins", "Zid", "Metereze", "Palisada", "Arhitect", "Berarie", "Temnita", "Resedinta eroului", "Hambar extins", "Granar extins", "Minunea Lumii"];
	    aLangTasks = ["Cladire", "Imbunatateste", "Ataca", "Cerceteaza", "Instruieste"];
	    aLangStrings = ["Construieste mai tarziu", "Imbunatateste mai tarziu", "Ataca mai tarziu","Cerceteaza ulterior", "Programeaza acesta actiune pentru mai tarziu", "Am inceput sa construim", "A fost incercata cu rezultate necunoscute", "Nivel", "Nu poate fi construita","Nu poate fi upgradata", "Actiunea a fost programata", "Productia curenta:","Nu putem programa acesta actiune acum", "Programarea actiuni nu este disponibila!", "Actiuni Programate", "Sterge", "Trimite mai tarziu", "No troops were selected.","Trupele tale au fost trimise la", "Trupele tale nu au putut fi trimise la", "Suport","Atac", "Raid", "Catapulteaza pe la","Aleator", "la", "sau dupa","secunde", "minute", "ore","zile", "Spioneaza resurse si unitati", "Spioneaza fortificatii si trupe", "plecate", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
	    break;
	
	case "ru": //by ??????? ????????
		aLangBuildings = ["", "??????????? ?????", "???????? ??????", "???????? ??????", "?????", "???????????????????? ?????", "????????? ?????", "?????????????? ?????", "??????????? ????????", "???????", "?????", "?????", "??????? ??????", "??????? ????????", "?????", "??????? ??????", "????? ?????", "?????", "??????????", "???????", "???????", "??????????", "????????", "??????", "??????", "??????????", "??????", "????????????", "???????? ??????",   "??????? ???????", "??????? ???????", "????????? ?????", "???????? ???", "????????", "?????????", "?????????", "????????? ", "???????", "??????? ?????", "??????? ?????", "????"];
		aLangTasks = ["?????????", "???????", "?????????", "???????", "???????"];
		aLangStrings = ["????????? ?????", "??????? ?????", "????????? ?????", "??????? ?????", "????????????? ??????.", "?? ?????? ????????????? ", " ?? ???????????, ?? ????????? ?? ????????.", "???????", " ?? ????? ???? ?????????.", " ?? ????? ???? ???????.", "?????? ?????????????.", "??????? ????????????:", "?? ?? ????? ??????????? ????? ??????.", "??????????????? ?????? ?? ??????????!", "??????????????? ??????", "???????", "????????? ?????", "????? ?? ????? ???? ?????????????, ????????? ?????? ?? ???????.", "???? ?????? ???? ???????????", "???? ?????? ?? ????? ???? ??????????", "?????????", "?????", "?????", "?????????? ???????? ??", "????????", "?", "??? ?? ?????????", "??????", "?????", "?????", "????", "???????? ???????? ? ?????", "???????? ????? ? ?????????????? ??????????", "???????????", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;

	case "ser":  //by isidora
		aLangBuildings = ["", "????????", "?????? ?????", "?????? ??????", "????", "??????", "???????", "??????? ??????", "????", "??????", "?????????", "?????", "????????? ??????", "????????? ??????", "??????? ?????", "?????? ??????", "????? ????????", "??????", "????????", "???????", "?????", "?????????", "?????????", "?????????", "???????", "???????????", "??????", "???????", "????????? ??????", "?????? ???????", "?????? ?????", "??????? ?????", "??????? ???", "????????", "???????????", "Brewery", "????????? ?????", "?????? ??????", "?????? ?????????", "?????? ?????", "??????? ????"];
		aLangTasks = ["???????? ??????", "??????????? ??", "?????", "?????????", "??????? ?????"];
		aLangStrings = ["????? ?????", "???????? ?????", "??????? ?????", "??????? ?????", "?????????? ???? ??????? ?? ?????.", "?????? ?? ?????? ", " ???????? ?? ?????????? ??????????.", "??????", " ?? ???? ???? ?????????.", " ?? ???? ?? ??????????.", "?????????? ?? ???????.", "???????? ??????????:", "?? ???? ?? ??????????? ???? ??????? ????.", "????????? ??????? ???? ????????!", "????????? ??????", "???????", "?????? ?????", "????? ???? ????????.", "???? ?????? ?? ??????? ??", "???? ?????? ?? ???? ???? ??????? ??", "????????", "?????", "??????", "????????? ?? ??????", "????????", "?", "??? ?????", "???????", "??????", "????", "????", "???????? ???????? ? ??????", "???????? ??????? ? ??????", "away", "????? ?? ???? ???? ?????????? ??? ??????????? ???? ????????.", "?? ???????? ??.", "???????? ??:", "type ", "time ", "target ", "?????? ", "???? "];
		aLangTroops[0] = ["????????", "????????????", "???????????", "???????", "???????????? ??????", "???????? ??????", "????", "??????? ????????", "???????", "?????????", "?????"];  //Romans
		aLangTroops[1] = ["???????", "????????", "???????", "???????", "???????", "????????? ?????", "????", "????????", "?????????", "?????????", "?????"];  //Teutons
		aLangTroops[2] = ["???????", "?????????", "???????", "?????? ?????", "?????", "???????", "????", "????????", "?????????", "?????????", "?????"];  //Gauls
		break;
	
	case "tr": //by drascom
		aLangBuildings = ["", "Orman", "Tugla Ocagi", "Demir Madeni", "Tarla", "Kereste Fabrikasi", "Tugla Firini", "Demir Dökümhanesi", "Degirmen", "Ekmek Firini", "Hammadde deposu", "Tahil Ambari", "Silah Dökümhanesi", "Zirh Dökümhanesi", "Turnuva Alani", "Merkez Binasi", "Askeri Üs", "Pazar Yeri", "Elçilik", "Kisla", "Ahir", "Tamirhane", "Akademi", "Siginak", "Belediye", "Kösk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kisla", "Büyük Ahir", "Sur", "Toprak Siper", "Çit", "Tasci", "Bira Fabrikasi", "Tuzakçi", "Kahraman Kislasi", "Büyük Hammadde Deposu", "Büyük Tahil Ambari", "Dünya Harikasi"];
		aLangTasks = ["Kurulacak bina", "Gelistirilecek Bina", "Asker gönder", "gelistir", "Yetistir"];
		aLangStrings = ["Daha sonra KUR", "Daha Sonra GELISTIR", "Sonra Saldir", "Sonra arastir", "Bu islemi sonra planla.", "Yapim basladi. ", "Islem tanimlamadi.", "Seviye", " Insa edilemedi.", " Yükseltilemedi.", "Islem siraya alindi.", "Saatlik üretim", "Islemi su an planlayamiyoruz.", "Islem siralama mümkün degildir!", "Siradaki Islemler", "Sil", "Daha sonra yolla", "Önce asker seçmelisiniz..", "Askerlerin gönderildigi yer ", "Askerler yollanamadi", "Destek olarak", "Normal Saldiri olarak", "Yagmala olarak", "Mancinik hedefi", "Rastgele", "Su an", "Yada bu zaman sonra", "saniye sonra", "dakika sonra", "saat sonra", "gün sonra", "Hammadde ve askerleri izle", "Asker ve defansi izle", "uzakta","Saldiri plani için adres girmediniz.","adres", "Siralama Kriteri:", ".Tip.", " .Süre.", ".Hedef. ", "Ayarlar", ".Köy. ","Tamamlanan islemler", "Geçmisi sil", "Arastiriliyor.", " Arastitilamadi.", "Sonra Gelistir.", "Casus", "Sonra yetistir", "Askerler.", "Yetistir", "Yetistirme Basladi ", " Yetistirme Baslamadi."];
		aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbasi", "Ates Mancinigi", "Senator", "Göçmen", "Hero"]; //Romalilar
		aLangTroops[1] = ["Tokmak Sallayan", "Mizrakçi", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbasi", "Mancinik", "Reis", "Göçmen", "Kahraman"]; //Cermenler
		aLangTroops[2] = ["Phalanx", "Kiliçli", "Casus", "Toytagin Simsegi", "Druyid", "Haeduan", "Koçbasi", "Mancinik", "Kabile Reisi", "Göçmen", "Kahraman"]; //Galyalilar
		break;
		
	case "se":
		aLangBuildings = ["", "Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "Sagverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stot stall", "Stadsmur", "Jordvall", "Palissad", "Stenhuggare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder"];
		aLangTasks = ["Konstruera", "Uppgradera", "Attack", "Förbättra", "Träna"];
		aLangStrings = ["Konstruera senare", "Uppgradera senare", "Attackera senare", "Förbättra senare", "Schemalägg uppgiften tills senare.", "Byggnationen pabörjad ", " utfördes med okänt resultat.", "niva", " kan inte byggas.", " kan inte uppgraderas.", "Uppgiften är schemalagd.", "Nuvarande produktion:", "Det gar inte att schemalägga denna uppgift just nu.", "Schemaläggningen är inte tillgänglig!", "Schemalägg uppgift", "Ta bort", "Skicka senare", "Attacken kunde inte bli schemalagd da inga trupper valdes.", "Dina trupper skickades till", "Dina trupper kunde inte skickas till", "Support", "Attack", "Plundring", "Katapulterna ska sikta pa", "random", "vid", "eller efter", "sekunder", "minuter", "timmar", "dagar", "Spionera pa trupper och resurser", "Spionera pa trupper och försvar", "borta", "Attacken misslyckades, var vänlig och välj en destination.", "ingen destination.", "Sortera efter:", "typ ", "tid ", "mal ", "alternativ ", "by ", "tidigare"];
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Sparare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];  //Romans
		aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];  //Teutons
		aLangTroops[2] = ["Falanx", "Svärdskämpe", "Sparare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];  //Gauls
		break;
	
	case "ser":  //by isidora
        aLangBuildings = ["", "????????", "?????? ?????", "?????? ??????", "????", "??????", "???????", "??????? ??????", "????", "??????", "?????????", "?????", "????????? ??????", "????????? ??????", "??????? ?????", "?????? ??????", "????? ????????", "??????", "????????", "???????", "?????", "?????????", "?????????", "?????????", "???????", "???????????", "??????", "???????", "????????? ??????", "?????? ???????", "?????? ?????", "??????? ?????", "??????? ???", "????????", "???????????", "Brewery", "????????? ?????", "?????? ??????", "?????? ?????????", "?????? ?????", "??????? ????"];
        aLangTasks = ["???????? ??????", "??????????? ??", "?????", "?????????", "??????? ?????"];
        aLangStrings = ["????? ?????", "???????? ?????", "??????? ?????", "??????? ?????", "?????????? ???? ??????? ?? ?????.", "?????? ?? ?????? ", " ???????? ?? ?????????? ??????????.", "??????", " ?? ???? ???? ?????????.", " ?? ???? ?? ??????????.", "?????????? ?? ???????.", "???????? ??????????:", "?? ???? ?? ??????????? ???? ??????? ????.", "????????? ??????? ???? ????????!", "????????? ??????", "???????", "?????? ?????", "????? ???? ????????.", "???? ?????? ?? ??????? ??", "???? ?????? ?? ???? ???? ??????? ??", "????????", "?????", "??????", "????????? ?? ??????", "????????", "?", "??? ?????", "???????", "??????", "????", "????", "???????? ???????? ? ??????", "???????? ??????? ? ??????", "away", "????? ?? ???? ???? ?????????? ??? ??????????? ???? ????????.", "?? ???????? ??.", "???????? ??:", "type ", "time ", "target ", "?????? ", "???? "];
        aLangTroops[0] = ["????????", "????????????", "???????????", "???????", "???????????? ??????", "???????? ??????", "????", "??????? ????????", "???????", "?????????", "?????"];  //Romans
        aLangTroops[1] = ["???????", "????????", "???????", "???????", "???????", "????????? ?????", "????", "????????", "?????????", "?????????", "?????"];  //Teutons
        aLangTroops[2] = ["???????", "?????????", "???????", "?????? ?????", "?????", "???????", "????", "????????", "?????????", "?????????", "?????"];  //Gauls
        break;    
	
	case "si":  //by SpEkTr
		aLangBuildings = ["", "Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišce", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišce", "Gradbeni ceh", "Zbirališce", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palaca", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Brewery", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišce", "Velika žitnica", "Wonder"];
		aLangTasks = ["Postavi nov objekt", "Nadgradi", "Napad na ", "Razišci", "Izuri"];
		aLangStrings = ["Postavi nov objekt kasneje", "Nadgradi kasneje", "Napadi kasneje", "Izuri kasneje", "Nastavi to nalogo za kasneje", "Z gradnjo zacnem ", " rezultat ni znan.", "stopnja", " ne morem zgraditi.", " ne morem nadgraditi.", "Naloga je nastavljena.", "Trenutna proizvodnja:", "Te naloge trenutno ni možno nastaviti.", "Nastavljanje nalog ni možno!", "Nastavljene naloge:", "Zbriši", "Pošlji kasneje", "Nisi oznacil nobenih enot.", "Tvoje enote so bile poslane,", "Tvoje enote ne morejo biti poslane,", "Okrepitev", "Napad", "Roparski pohod", "Cilj katapultov je", "nakljucno", "ob", "ali kasneje", "sekund", "minut", "ur", "dni", "Poizvej o trenutnih surovinah in enotah", "Poizvej o obrambnih zmogljivostih in enotah", "proc", "Napad ne more biti nastavljen, ker ni bila izbrana nobena destinacija.", "na strani št.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist"];  //Romans
		aLangTroops[1] = ["Gorjacar", "Sulicar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist"];  //Teutons
		aLangTroops[2] = ["Falanga", "Mecevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist"];  //Gauls
		break;
	
	case "tw": //by an
		aLangBuildings = ["", "???", "??", "???", "??", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "???", "???", "???", "???", "????"];
		aLangTasks = ["??", "??", "??", "??", "??"];
		aLangStrings = ["????", "????", "????", "????", "??????????.", "????? ", " ????????.", "??", " ????.", " ????.", "??????????.", "????:", "????????????.", "????????!", "?????????", "??", "????", "????????????????.","???????", "????????", "??", "??", "??", "??????", "??", "?", "???", "?", "?", "?", "?", "???????", "???????","??", "????????,?????????.", "at site no.", "???:", "??", "??", "?? ", "??", "??"];
		aLangTroops[0] = ["?????", "???", "???", "????", "????", "????", "???", "?????", "???", "???", "??"];  //Romans
		aLangTroops[1] = ["???", "??", "???", "???", "???", "?????", "???", "???", "???", "???", "??"];  //Teutons
		aLangTroops[2] = ["???", "??", "???", "???", "?????", "?????", "???", "???", "??", "???", "??"];  //Gauls
		break;
		
	case "ua": //by Rustle rs11[@]ukr.net
		aLangBuildings = ["", "?????????", "???????? ???'??", "??????? ????????", "?????", "?????????????? ?????", "???????? ?????", "?????????????? ?????", "????", "???????", "?????", "??????? ??????", "????? ?????", "????? ??????????", "?????", "??????? ???????", "????? ?????", "?????", "??????????", "???????", "??????", "?????????", "????????", "????????", "??????", "??????????", "?????", "?????????", "??????????? ??????",   "?????? ???????", "?????? ??????", "???", "???????? ???", "???????", "?????????", "?????????", "?????????", "???????", "??????? ?????", "?????? ??????? ??????", "???? ?????"];
		aLangTasks = ["??????????", "????????", "?????????", "?????????", "?????????"];
		aLangStrings = ["?????????? ???????", "??????? ???????", "????????? ???????", "????????? ???????", "??????????? ??????.", "?? ?????? ??????????? ", " ?? ??????????, ??? ????????? ?????????.", "??????", " ????????? ??????????.", " ????????? ?????????.", "?????? ???????????.", "??????? ???????????:", "?? ?? ?????? ????????? ?? ?????.", "???????????? ?????? ?? ?????!", "??????????? ??????", "????????", "?????????? ???????", "????? ?? ???? ???? ???????????, ???????? ??????? ?? ???????.", "???? ??????? ???? ???????????", "???? ??????? ?? ?????? ???? ???????????", "????????????", "?????????", "????????????? ?????", "?????????? ???????? ??", "?????????", "?", "?? ?????", "??????", "??????", "?????", "????", "????????? ??????? ?? ??????? ????????????", "????????? ???????? ??????? ?? ??????? ????????????", "????????", "????? ?????? ???? ??????????? ?? ????? ????.", "???? ?.", "?????????:", "??? ", "??? ", "???? ", "????????? ", "?????? "];
		aLangTroops[0] = ["????????", "????????????", "???????????", "?????? ?????????", "??????? ??????????", "??????? ??????", "?????", "??????? ??????????", "???????", "??????????", "?????"];  //???????
		aLangTroops[1] = ["????????", "???????", "????????", "?????", "???????", "??????????? ???????", "?????????? ????????", "??????????", "???????", "??????????", "?????"];  //????????
		aLangTroops[2] = ["???????", "??????", "????????", "?????????? ????", "?????-???????", "???????? ???????", "?????", "??????????", "?????", "??????????", "?????"];  //?????
		break;
	
	case "uk":
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickyard", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "City Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "The attack cannot be scheduled because no troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"]; //Romans
		aLangTroops[1] = ["Maceman", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"]; //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"]; //Gauls
		break;
		
	case "us":  //by m4rtini
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickworks", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "City Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"]; 
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village "];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;

	case "ph":
	case "en":
	case "com":
	default: // default is english
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickworks", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Townhall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched."];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
}
 

    // Do not change the array below!
    var aLangStringsMaster = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained."];
}


/**
* Custom log function .
* @param {int} level
* @param:{int} msg Message to log.
*/
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1)
		GM_log(msg);
}


/**
 * Performs some initial checkings on conditions that have to be met to run the script
 *
 * @return true if initialization was successfull, false otherwise
 */
function initialize() {

    if (typeof GM_getValue == "undefined") {
        alert('This script requires Greasemonkey v0.3 or newer, please upgrade to latest version!');
        _log(0, "The current version of Greasemonkey is too old");
        return false;
    }

    if (sCurrentServer != "") {
        return true;
    }

    // check what Travian server we're using
    var re = new RegExp("^http://(.+\.travian3?\.[a-zA-Z.]+)(\/.*)?$", "i");
	var server = re.exec(window.location.href);
    if ((server) && (server[1])) {
        sCurrentServer = server[1] + "_";
        _log(1, "using settings for server '" + server[1] + "'");
        return true;
    }
    else {
         _log(0, "ERROR, unknown Travian server!");
        return false;
    }    
}

/**
 * Detects the language used based on the server's url
 *
 * @return true if the language is successfully detected, false otherwise
 */
function detectLanguage() {
	//if(sLang != "") {return true;}
	var re = null; re = new RegExp("([a-zA-Z]{2,3})(\/.*)?$", "i");
	var lang = re.exec(window.location.href);

    if(!lang) {
            _log(0, "failed to detect language automatically!");
		if(sLang == "") sLang = "en";
        return true;
	} else {
        sLang = lang[1];
            _log(2, "detected language '" + sLang + "'");
        return true;
    }
}

function checkSetTasks() {
		_log(2, "Checking set tasks...");
		_log(3, "oIntervalReference " + oIntervalReference);
	
	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;	
	var data = getVariable("TTQ_TASKS");
	if(data == '') {  // no tasks are set
			_log(2, "No tasks are set. ");
		// stop checking, it would be pointless. Checking will be restarted when new tasks are set.
		if(oIntervalReference) {
			_log(3, "clearInterval()");
			window.clearInterval(oIntervalReference);
			oIntervalReference = null;
		}
		bLocked = false;
		return false;
	}	
	
	// Times: Server or Local?
	if(bUseServerTime) {
		var iServerTimestamp = getServerTime(true);
		if(iServerTimestamp == false) {  //error
				_log(2, "Unable to determine server's time. We can't trigger any tasks without this. Consider switching to using local time.");
			return false;
		}
		var oDate = new Date(iServerTimestamp);
	} else {  //local
		var oDate = new Date();
	}
	
	var aTasks = data.split("|");
	var bTaskDeleted = false;
	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		
		// The stored time (Unix GMT time) should be compared against the GMT time, not local!
		if(aThisTask[1] <= oDate.getTime()/1000) {
				_log(2, "Triggering task: " + aTasks[i]);
			triggerTask(aThisTask);
			aTasks.splice(i, 1);  //delete this task
			bTaskDeleted = true;
		} else if( (aThisTask[0] < 2) && (aThisTask[1] <= ((oDate.getTime()/1000) + iPreloadTime)) ) {  //prefetch the code if the task is to be triggered in less than iPreloadTime
				_log(2, "Some building/upgrading task is set, but it is not the time yet. It is time to preload the code though.");
						
				getCode(aThisTask[2], aThisTask[4]);	

			
		} else {
				_log(2, "Some task is set, but it is not the time yet.");
			//refresh the session if needed
			var sLastRefreshed = getOption('LAST_REFRESH', 0, "integer");	
			var iRandomMultiplier = (Math.random() < 0.5) ? 1 : -1;
			var iRandomMilliSeconds = iRandomMultiplier * 60000 * Math.round(10 * Math.random());  //for randomizing the refresh times (the scatter will be +/- 10 minutes)
			if(sLastRefreshed != '' && (iSessionRefreshRate > 0) && (sLastRefreshed + (iSessionRefreshRate * 60000) + iRandomMilliSeconds )  < oDate.getTime() ) {
					_log(2, "Refreshing the session...");
				get("dorf1.php", null, null)
				setOption('LAST_REFRESH', oDate.getTime() );
			}
		}
	}
	
	// rewrite stored tasks if any task was deleted
	if(bTaskDeleted) {
		refreshTaskList(aTasks);
			_log(3, "Rewriting task list");
		data = aTasks.join("|"); 
			_log(3, "New task list: " + data);
		setVariable("TTQ_TASKS", data);
	}
	bLocked = false;
		
}

function refreshTaskList(aTasks) {
		_log(3, "-> refreshTaskList()");
		
	// Remove old task list
	var oOldTaskList = $("ttq_tasklist");
	if(oOldTaskList) {document.body.removeChild(oOldTaskList)};
	
	//if there are no tasks set, return
	if(!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";	
	
	//Create new tasklist
	var oTaskList = document.createElement('div');
	oTaskList.id = "ttq_tasklist";
	oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle ttq_draghandle' >"+t("Scheduled Tasks")+"</div>";
	
	//Sort links
	var currentSort = getOption("TASKLIST_SORT", 1, "integer");
	var sortLinkWrapper = document.createElement("div");
	sortLinkWrapper.innerHTML += "<span class='ttq_sort_header'>&raquo; " +t("Sort by:")+ "</span> ";
	var sortKeys = [1,4,0,2];  //order is important
	var sortLabels = ["type ", "time ", "target ", "option ", "village "]
	sortKeys.forEach(function(el) {
		var sortLink = document.createElement("a");
		sortLink.innerHTML = t(sortLabels[el]);
		sortLink.className = (currentSort == el) ? "ttq_sortlink_active" : "ttq_sortlink";
		sortLink.href = "#";
		sortLink.addEventListener("click", function(ev) {
			orderList(el, "ttq_task_row"); 
			setOption("TASKLIST_SORT", el);			
			var siblings = ev.target.parentNode.childNodes;
			for(var j = 0; j < siblings.length; j++) {
				if(siblings[j].nodeName == "A") {siblings[j].className = "ttq_sortlink";}
			}
			ev.target.className = "ttq_sortlink_active";
		}, false);
		sortLinkWrapper.appendChild(sortLink);
		oTaskList.appendChild(sortLinkWrapper);
		sortLink = null;	
	}
	);	
	
	//position the list	
	var listCoords = getOption("LIST_POSITION", "0px_687px");
	listCoords = listCoords.split("_");
	oTaskList.style.top = listCoords[0];
	oTaskList.style.left = listCoords[1];
	
	document.body.appendChild(oTaskList);

	makeDraggable($('ttq_draghandle'));		
	
	
	//get the server time offset once
	if(bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	}

	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");
		
		//format the task time properly
		if(bUseServerTime) {			
			//create timestamp for the tasktime offset to server time
			var iTaskServerTimestamp = ( parseInt(aThisTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
			//create Date obj with this timestamp
			var oDate = new Date(iTaskServerTimestamp);
			//display the date without any further offsets
			//TODO: custom localized date format: Wednesday, November 14, 2007 20:49:09
			var sTime = oDate.toGMTString();
			sTime = sTime.substring(0, sTime.length - 4);
			sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is the server time.' ttq_taskid='" +i+ "' >" + sTime + "</span>";
		} else {  //local time
			var oDate = new Date( parseInt(aThisTask[1]) * 1000 );	
			var sTime = "<span style='color:black; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is your local time.' ttq_taskid='" +i+ "' >" + oDate.toLocaleString() + "</span>";
		}			
		
		var oDeleteLink = document.createElement('a');
		oDeleteLink.innerHTML = "<img src='" +sDeleteBtn+ "' alt='X'/>";
		oDeleteLink.href = "#";
		oDeleteLink.title = t("Delete");
		oDeleteLink.setAttribute("itaskindex", i);
		oDeleteLink.addEventListener('click',	deleteTask, false);
		
		var oTaskRow = document.createElement("div");
		oTaskRow.id = "ttq_task_row_" +i;
		oTaskRow.setAttribute("tasktype", aThisTask[0]);
		oTaskRow.setAttribute("timestamp", aThisTask[1]);
		oTaskRow.setAttribute("tasktarget", aThisTask[2]);
		oTaskRow.setAttribute("taskoptions", aThisTask[3]);
		oTaskRow.setAttribute("villagedid", aThisTask[4]);
		
		var sTaskSubject = "";
		var sTask = "";
		var sTaskMoreInfo = "";
		switch(aThisTask[0]) {
			case "0":  //build
			case "1":  //upgrade
				sTaskSubject = aLangBuildings[aThisTask[3]];
				sTask = aLangTasks[aThisTask[0]];
				sTaskMoreInfo = t("at site no.") + " " +aThisTask[2];
				break;
			case "2":  //attack
				//sTaskSubject = aThisTask[2];
				sTaskSubject = '<span id="ttq_placename_' +aThisTask[2]+ '">' + getPlaceName(aThisTask[2]) + '</span>';
				if(sTaskSubject == '') {sTaskSubject = aThisTask[2]};
				var aTroops = aThisTask[3].split("_");
				if(onlySpies(aTroops)) { 
					sTask = t("Spy"); 
				} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = t('Support');
					if(iIndex == 21) sTask = t('Attack');
					if(iIndex == 22) sTask = t('Raid');
				}				
				sTaskMoreInfo = getTroopsInfo(aTroops);
				break;
			case "3":  //research
				sTaskSubject = aLangTroops[iMyRace][aThisTask[3]-1];
				sTask = aLangTasks[3];
				break;
			case "4":  //train
				var aTroops = aThisTask[3].split("_");
				sTaskSubject = getTroopsInfo(aTroops);
				sTask = aLangTasks[4];
				break;
			default:
				break;
		}	
		
		var sVillageName = '';
		if(aThisTask[4] != 'null') {
			sVillageName = " &mdash; " +getVillageName(aThisTask[4]);
		}
		
		oTaskRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'>" + sVillageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";
		
		oTaskRow.appendChild(oDeleteLink);
		oTaskList.appendChild(oTaskRow);
		//add listener for editing times in the task list
		var oTaskTimeSpan = $("ttq_tasktime_"+i);
		oTaskTimeSpan.addEventListener("click", editTime, false);
		
		oDeleteLink = null;
		oTaskRow = null;
		oDate = null;
	}
	
	orderList(currentSort, "ttq_task_row"); 	
	

	
		_log(3, "<- refreshTaskList()");
}

function refreshHistory(aTasks) {
		_log(3, "Refreshing history...");
	// Remove old history
	var oOldHistory = $("ttq_history");
	if(oOldHistory) {document.body.removeChild(oOldHistory)};
	
	//if there are no tasks in the history, return
	if(!aTasks || aTasks.length < 1) {
		return;
	}
	var sTime = "";	
	
	//Create new tasklist
	var oHistory = document.createElement('div');
	oHistory.id = "ttq_history";
	oHistory.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >"+t("Task History")+"</div>";
	
	//position the list	
	var listCoords = getOption("HISTORY_POSITION", "200px_687px");
	listCoords = listCoords.split("_");
	oHistory.style.top = listCoords[0];
	oHistory.style.left = listCoords[1];
	
	document.body.appendChild(oHistory);

	makeDraggable($('ttq_history_draghandle'));		
	
	//get the server time offset once
	if(bUseServerTime) {
		var iServerTimeOffset = getServerTimeOffset();
	} else {
		var iServerTimeOffset = false;
	}

	for(var i = 0; i < aTasks.length; i++) {
		var aThisTask = aTasks[i].split(",");		
		oHistory.appendChild( makeHistoryRow(aThisTask, i, iServerTimeOffset) );	
		var oTaskTimeSpan = $("ttq_history_tasktime_" +i);
		if(oTaskTimeSpan) { oTaskTimeSpan.addEventListener("click", editTime, false); }
	}
	
	orderList(1, "ttq_history_row"); 	
	
	//flush link
	var oFlushLink = document.createElement('a');
	oFlushLink.id = 'ttq_flush_history';
	oFlushLink.innerHTML = t('flush history');
	oFlushLink.href = '#';
	oHistory.appendChild(oFlushLink);
	oFlushLink.addEventListener('click', flushHistory, false);
}

function makeHistoryRow(aTask, index, iServerTimeOffset) {
			_log(3, "-> makeHistoryRow()");
		if(bUseServerTime && iServerTimeOffset != false) {			
			//create timestamp for the tasktime offset to server time
			var iTaskServerTimestamp = ( parseInt(aTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
			var oDate = new Date(iTaskServerTimestamp);
			var sTime = oDate.toGMTString();
			sTime = sTime.substring(0, sTime.length - 4);
			sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is the server time.' ttq_taskid='" +index+ "' >" + sTime + "</span>";
		} else {  //local time
			var oDate = new Date( parseInt(aTask[1]) * 1000 );	
			var sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is your local time.' ttq_taskid='" +index+ "' >" + oDate.toLocaleString() + "</span>";
		}		
	
		var oHistoryRow = document.createElement("div");
		oHistoryRow.id = "ttq_history_row_" +index;
		oHistoryRow.className = "ttq_history_row";
		oHistoryRow.setAttribute("tasktype", aTask[0]);
		oHistoryRow.setAttribute("timestamp", aTask[1]);
		oHistoryRow.setAttribute("tasktarget", aTask[2]);
		oHistoryRow.setAttribute("taskoptions", aTask[3]);
		oHistoryRow.setAttribute("villagedid", aTask[4]);
		
		var sTaskSubject = "";
		var sTask = "";
		var sTaskMoreInfo = "";
		switch(aTask[0]) {
			case "0":  //build
			case "1":  //upgrade
				sTaskSubject = aLangBuildings[aTask[3]];
				sTask = aLangTasks[aTask[0]];
				sTaskMoreInfo = t("at site no.") + " " +aTask[2];
				break;
			case "2":  //attack
				sTaskSubject = '<span id="ttq_placename_history_' +aTask[2]+ '">' + getPlaceName(aTask[2]) + '</span>';
				if(sTaskSubject == '') {sTaskSubject = aTask[2]};
				var aTroops = aTask[3].split("_");
				if(onlySpies(aTroops)) { 
					sTask = t("Spy"); 
				} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = t('Support');
					if(iIndex == 21) sTask = t('Attack');
					if(iIndex == 22) sTask = t('Raid');
				}
				sTaskMoreInfo = getTroopsInfo(aTroops);
				break;
			case "3":  //research
				sTaskSubject = aLangTroops[iMyRace][aTask[3]-1];
				sTask = aLangTasks[aTask[0]];
				break;
			case "4":
				sTaskSubject = getTroopsInfo(aTask[3].split("_"));
				sTask = aLangTasks[4];
			default:
				break;
		}	
		
		var sBgColor = (aTask[5] == "true") ? "#90FF8F" : "#FFB89F"; 
		oHistoryRow.style.backgroundColor = sBgColor;
		
		var sVillageName = '';
		if(aTask[4] != 'null') {
			sVillageName = " &mdash; " +getVillageName(aTask[4]);
		}
		
		oHistoryRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'>" +sVillageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";	
		
		oDate = null;
		
		return oHistoryRow;	
}

/**
* @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
*/
function orderList (iOrderBy, sRowId) {
	var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
	if(rows.snapshotLength > 0) {
		switch(iOrderBy) {
			case 0:			
				var sortKey = "tasktype";
				break;
			case 2:
				var sortKey = "target";
				break;
			case 3:
				var sortKey = "options";
				break;
			case 4:
				var sortKey = "villagedid";
				break;
			case 1:
			default:
				var sortKey = "timestamp";
				break;
		}
		var keyValue = "";
		var aRows = [];
		for(var i = 0; i < rows.snapshotLength; i++) {
			keyValue = rows.snapshotItem(i).getAttribute(sortKey);
			aRows.push([keyValue, rows.snapshotItem(i)]);
		}
		aRows.sort(sortArray);
		switch(sRowId) {
			case "ttq_history_row":
				aRows.forEach(processSortedHistory);
				break;
			case "ttq_task_row":
			default:
				aRows.forEach(processSortedTaskList);
				break;
		}
		
		return false;
	} else {
		return;
	}

}

function sortArray(arr1,arr2) { 
	return arr1[0] - arr2[0];
}

function processSortedTaskList(element) {
	$("ttq_tasklist").appendChild(element[1]);
}
function processSortedHistory(element) {
	$("ttq_history").appendChild(element[1]);
}

function editTime(ev) {
	var oTaskRow = ev.target.parentNode.parentNode;
	var type = parseInt(oTaskRow.getAttribute("tasktype"));
	var timestamp = oTaskRow.getAttribute("timestamp");
	var target = oTaskRow.getAttribute("tasktarget");
	var options = oTaskRow.getAttribute("taskoptions").split("_");;
	var villagedid = oTaskRow.getAttribute("villagedid");  //not supported yet. The new task will have did of currently active village.
	
	displayTimerForm(type, target, options, timestamp);
}

function deleteTask(e) {
		_log(3, "-> deleteTask()");
	var iTaskIndex = e.target.parentNode.getAttribute("itaskindex");
		_log(2, "Deleting task "+iTaskIndex);	

	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
		
	bLocked = true;
	var data = getVariable("TTQ_TASKS");
	if(data == '') {	
			_log(2, "No tasks are set. ");
		bLocked = false;
		return false;  // no tasks are set
	}
	var aTasks = data.split("|");
	aTasks.splice(iTaskIndex, 1);  //delete this task
	data = aTasks.join("|"); 
	setVariable("TTQ_TASKS", data);
	bLocked = false;
	refreshTaskList(aTasks);
	return false;  // we return false to override default action on the link
		_log(3, "<- deleteTask()");
}

/**
  * Schedules the specified task. The task is stored in a cookie. 
  * @param iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research)
  * @param iWhen: date when the task is to be triggered
  * @param target: iBuildingId, or iVillageId 
  * @param options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid).
  */
function setTask(iTask, iWhen, target, options) {
		_log(3, "-> setTask()");
		
	var iVillageId = getActiveVillage();

	if(bLocked) {
			_log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
		return false;
	}
	
	bLocked = true;
	var data = getVariable("TTQ_TASKS");
	var oldValue = (data == null || data.length <= 1 || data == '') ? '' : data + '|';
	var newValue = oldValue + iTask + ',' + iWhen + ',' + target + ',' + options;
	if(iVillageId) {
		newValue += ',' + iVillageId;
	} else {
		newValue += ',' + 'null';
	}
		_log(2, "Writing task list: "+newValue);
	if(!setVariable("TTQ_TASKS", newValue)) {
		printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(iVillageId)+ "</span>" +t("We can't schedule this task right now."), true);
		bLocked = false;
		return false;
	}
	bLocked = false;
	
	var aTasks = newValue.split("|");
	refreshTaskList(aTasks);	

	// Generate message
	var sTaskSubject = "";
	var sTask = "";
	switch(iTask) {
		case "0":  //build
		case "1":  //upgrade
			sTaskSubject = aLangBuildings[options];
			sTask = aLangTasks[iTask];
			break;
		case "2":  //attack
			sTaskSubject = '<span id="ttq_placename_' +target+ '">' +getPlaceName(target)+ '</span>';
			var aTroops = options.split("_");
			if(onlySpies(aTroops)) {
					sTask = t("Spy"); 
			} else {
					var iIndex = parseInt(aTroops[0]) + 18; 
					if(iIndex == 20) sTask = t('Support');
					if(iIndex == 21) sTask = t('Attack');
					if(iIndex == 22) sTask = t('Raid');
			}
			break;
		case "3":  //research
			sTaskSubject = aLangTroops[iMyRace][options-1];
			sTask = aLangTasks[3];
			break;
		case "4":  //training
			var aTroops = options.split("_");
			sTaskSubject = getTroopsInfo(aTroops);
			sTask = t('Train');
			break;
		default:
			break;
	}
	
	printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(iVillageId)+ '</span>' + t("The task was scheduled.") + '<br/><span style="font: italic 80%;">' +sTask+ ' ' +sTaskSubject+ '</span>');
	if(!oIntervalReference) {
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);  //start checking if there is any task to trigger
		_log(2, "Started checking for the set tasks...");
	}
		_log(3, "<- setTask()");
}

/**
 * Performs the supplied task. Prints the report.
 * @param aTask: [task, when, target, options]
 */
function triggerTask(aTask) {
		_log(3, "-> triggerTask()");
	switch(aTask[0]) {
		case "0":
			//build new building
			build(aTask);
			break;
		case "1":
			// upgrade building
			upgrade(aTask);
			break;
		case "2":
			// upgrade building
			attack(aTask);
			break;
		case "3":
			//research
			research(aTask);
			break;
		case "4":
			//train troops
			train(aTask);
			break;
		default:
			//do nothing
				_log(3, "Can't trigger an unknown task.");
				break;
	}
		_log(3, "<- triggerTask()");
}

function build(aTask) {
		_log(3, "-> build()");
	// we will assume that there is a correct up-to-date code in the cookie
	var sCode = '';
	
	var sCookie = getVariable("TTQ_CODE_0");
	if(sCookie != '') {
			_log(3, "building code found (TTQ_CODE_0)");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
			_log(3, "No building code available (TTQ_CODE_0)");
	}
	
	//TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)
	
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Building this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	var currentActiveVillage = getActiveVillage();
	
	var sUrl = "dorf2.php?";
	sUrl += "a=" +aTask[3]+ "&id=" +aTask[2]+ "&c=" +sCode + sNewDid; 
	var myOptions = [aTask, currentActiveVillage];	
	get(sUrl, handleRequestBuild, myOptions)
		_log(3, "<- build()");
}

function upgrade(aTask) {
		_log(3, "-> upgrade()");
		
	// try to load the code
	var sCode = '';
	
	var sCookie = getVariable("TTQ_CODE_1");
	if(sCookie != '') {
			_log(3, "upgrading code found (TTQ_CODE_1)");
		var aCookie = sCookie.split(",");
		var iIndexOfVillageId = aCookie.indexOf(aTask[4]);
		if(iIndexOfVillageId > -1) {  //the village id found
			sCode = aCookie[iIndexOfVillageId + 1];
		}
	} else {
			_log(3, "No upgrading code found (TTQ_CODE_1)");
	}	
	
	if(sCode == '') {  // no code - no building possible
		_log(1, "No code found. Upgrading this building is not possible.");
		printMsg("<span class='ttq_village_name' style='display:block'>" +getVillageName(aTask[4])+ "</span>" + aLangBuildings[aTask[3]] + t(" cannot be upgraded."), true); // Your building can't be built.
		return false;
	}
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}
	
	if(aTask[3] < 19) {  //it's resource site
		var sUrl = "dorf1.php?";
	} else {
		var sUrl = "dorf2.php?";
	}
	
	var currentActiveVillage = getActiveVillage();
	sUrl += "a=" +aTask[2]+ "&c=" +sCode + sNewDid; 
		_log(3, sUrl);
	var myOptions = [aTask, currentActiveVillage];	
	get(sUrl, handleRequestBuild, myOptions)
		_log(3, "<- upgrade()");
}

function attack(aTask) {
		_log(3, "-> attack()");
		
	var aTroops = new Array();  //extract troops numbers and attack type
	aTroops = aTask[3].split("_");
	var iAttackType = aTroops[0];
	
	var sParams = "id=39&c=" +iAttackType+ "&kid=" +aTask[2]+ "&a=12345";  //TODO: "a" parameter may need to be specified
	for(var i = 1; i <= 11; i++) {
		sParams += "&t" +i+ "=" +aTroops[i];
	}	
	
	//Target for catapults
	if(aTroops[8] > 0) {			
		if(aTroops[12]) {
			sParams += "&kata=" +aTroops[12];
		} 
		if(aTroops[13]) {
			sParams += "&kata2=" +aTroops[13];
		}		
	}
	
	//Spying missions
	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to proceed with sending this attack.");
			return false;
	}
	if(aTroops[iScoutUnit] > 0 && onlySpies(aTroops) && iAttackType > 2) {  
			_log(3, "We are sendings scouts.");		
		if(aTroops[12]) {
			var iScoutMode = aTroops[12];
		} else {
			var iScoutMode = 1;  //"Spy troops  and resources" by default	
		}
		sParams += "&spy=" +iScoutMode;
	}
	
		_log(3, "sParams\n"+sParams);	
		
	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village
			_log(2, "Switching to village:" +aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var myOptions = [aTask, currentActiveVillage];
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "a2b.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
						_log(2, "Village switched to " +aTask[4]);
					post("a2b.php", sParams, handleRequestAttack, myOptions);
						_log(2, "The attack was requested.");
				}
			}
		};
		httpRequest.send(null);		
	} else {  //only 1 village. Perform attack immediately
		var myOptions = [aTask, false];
		post("a2b.php", sParams, handleRequestAttack, myOptions);
			_log(2, "The attack was requested.");
	}	
	
		_log(3, "<- attack()");
}

function research(aTask) {
		_log(3, "-> research()");
		
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}	
	var currentActiveVillage = getActiveVillage();
	var sUrl = "build.php?id=" + aTask[2] + "&a=" + aTask[3] +  sNewDid; 
	var myOptions = [aTask, currentActiveVillage];
	get(sUrl, handleRequestResearch, myOptions);
		
		_log(3, "<- research()");
}

function train(aTask) {
		_log(3, "-> train()");
	
	if(aTask[4] != 'null') {
		var sNewDid = "&newdid=" +aTask[4];
	} else {
		var sNewDid = "";
	}	
	var currentActiveVillage = getActiveVillage();
	
	var sParams = "id=" +aTask[2]+ "&a=2";
	
	var aTroops = aTask[3].split("_");
	if(aTroops.length > 1) {
		sParams += "&z=" + aTroops[0];
		for(var i = 1; i < 11; i++) {
			if(aTroops[i] > 0) { sParams += "&t" + i + "=" + aTroops[i]; }
		}
	} else {
			_log(3, "No troops specified. Exiting function.");
		return;
	}
		_log(3, sParams);
	
	var myOptions = [aTask, currentActiveVillage];


	if(aTask[4] != 'null') {  //multiple villages
		//we need to switch village
			_log(2, "Switching to village:" +aTask[4]);
		var currentActiveVillage = getActiveVillage();
		var httpRequest = new XMLHttpRequest();
		httpRequest.open("GET", "dorf1.php?newdid=" + aTask[4], true);
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) { // ok
						_log(2, "Village switched to " +aTask[4]);
					post("build.php", sParams, handleRequestTrain, myOptions);
						_log(2, "The training was requested.");
				}
			}
		};
		httpRequest.send(null);		
	} else {  //only 1 village
		post("build.php", sParams, handleRequestTrain, myOptions);
			_log(2, "Training was requested.\n" + sParams);
	}	
	
		_log(3, "<- train()");
}

/**
* @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
*/
function get(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
	if(callback) {
		httpRequest.onreadystatechange = function() { 
				callback(httpRequest, options); 
		};
	}
	httpRequest.open("GET", url, true);
	httpRequest.send(null);
}

function post(url, data, callback, options) {
	var httpRequest = new XMLHttpRequest();	
	httpRequest.onreadystatechange = function() {
		callback(httpRequest, options)
	};	
	data = encodeURI(data);
	httpRequest.open("POST", url, true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", data.length);
	httpRequest.setRequestHeader("Connection", "close");
	//httpRequest.overrideMimeType('text/html');
	httpRequest.overrideMimeType("application/xhtml+xml");
	httpRequest.send(data);
}

function handleRequestBuild(httpRequest, options) {
		_log(3, "-> handleRequestBuild()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {  // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + " " + aLangBuildings[aTask[3]] + t(" was attempted with unknown result."), true );
				return;
			}			
			var re = new RegExp('<div id="lbau.">.*' + aLangBuildings[aTask[3]] + '.*</div>', 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started builing ") + aLangBuildings[aTask[3]]);  //Your building is being built.
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangBuildings[aTask[3]] + t(" cannot be built."), true); // Your building can't be built.
				addToHistory(aTask, false);
			}
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(3, "<- handleRequestBuild()");
}

function handleRequestAttack(httpRequest, options) {
		_log(3, "-> handleRequestAttack()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {  // error retrieving the response				
					_log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
				return;
			}			
			var sPlaceName = '<span id="ttq_placename_' + aTask[2] + '">' + getPlaceName(aTask[2]) + '</span>';			
			var re = new RegExp('karte\\.php\\?d=' + aTask[2], 'i');
			if(re.test(sResponse)) {
					_log(1, "It seems your attack was successfully sent.");
				printMsg(t("Your troops were sent to") + " " + sPlaceName);
				addToHistory(aTask, true);
			} else {
					_log(1, "Your attack could not be sent.");
				printMsg(t("Your troops could not be sent to") + " " +sPlaceName, true);
				addToHistory(aTask, false);				
			}			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
		return;
	}
		_log(3, "<- handleRequestAttack()");
}

function handleRequestResearch(httpRequest, options) {
		_log(3, "-> handleRequestResearch()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;			
			if(!sResponse) { // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true );
				return;
			}
			xpath("//form/table[2]//td[1]/img[@class='unit']");
			//var re = new RegExp('<div id="lbau.">.*' + aTask[3] + '.*</div>', 'i');
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];
			var re = new RegExp('<td width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0"></td>', 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started researching ") + aLangTroops[iMyRace][aTask[3]-1]);  
				addToHistory(aTask, true);
			} else {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + aLangTroops[iMyRace][aTask[3]-1] + t(" cannot be researched."), true); 
				addToHistory(aTask, false);
			}		
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
		_log(3, "<- handleRequestResearch()");
}

function handleRequestTrain(httpRequest, options) {
		_log(3, "-> handleRequestTrain()");
	var aTask = options[0];
	var activateVillageDid = options[1];
	
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) { // error retrieving the response				
				printMsg( aLangTasks[aTask[0]] + " " + aTask[3] + t(" was attempted with unknown result."), true );
				return;
			}
			var iUnit = (iMyRace == 0) ? aTask[3] : iMyRace + aTask[3];	
			var troopsInfo = getTroopsInfo(aTask[3].split("_"));
			var re = new RegExp('width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0">', 'i');
			if(sResponse.match(re)) {
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + t("We started training ") + troopsInfo);  
				addToHistory(aTask, true);
			} else { 
				printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[4])+ '</span>' + troopsInfo + t(" cannot be trained."), true); 
				addToHistory(aTask, false);
			}		
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
		if(isInt(activateVillageDid)) switchActiveVillage(activateVillageDid);
	}
	
	
	
		_log(3, "<- handleRequestTrain()");
}

function handleRequestFindCode(httpRequest, sNewdid) {
		_log(3, "-> handleRequestFindCode()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok				
			var sResponse = httpRequest.responseText;
				_log(3, sResponse);
			if(!sResponse) {
					_log(2, "We didn't get any response. Impossible to determine the code.");
				return false;
			}
			
			findCode(sResponse, sNewdid);  
			return false;			
			
		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
		_log(3, "<- handleRequestFindCode()");
}

function switchActiveVillage(did) {
		_log(2, "Switching your village back to " +did);
	if(!isInt(did)) {return;	}
	get("dorf1.php?newdid="+did, null, null);
}

/**
* Adds task to the log DIV.
* @param bSuccess: true if the task was successfully performed.
*/
function addToHistory(aTask, bSuccess) {
		_log(3, "Adding to history...");
	if(iHistoryLength < 1) { return; }
	
	bLockedHistory = true;
	var data = getVariable("TTQ_HISTORY");
	
	if(data != '' && data.length > 0) {
		var oldValue = trimHistory(data, iHistoryLength-1) + "|";
	} else {
		var oldValue = '';
	}
	
	var newValue = oldValue + aTask[0] + ',' + aTask[1] + ',' + aTask[2] + ',' + aTask[3];
	if(aTask[4]) {
		newValue += ',' + aTask[4];
	} else {
		newValue += ',' + 'null';
	}
	newValue += ',' + bSuccess;
		_log(2, "Writing var TTQ_HISTORY: "+newValue);
	if(!setVariable("TTQ_HISTORY", newValue)) {
			_log(2, "Failed logging to history.")
	}
	bLockedHistory = false;	
	aTasks = newValue.split("|");
	refreshHistory(aTasks);
	return;
}

/**
* This only trims the value read from cookie. Cookie itself is trimmed when new event is entered into history.
* It trimms the value down to maxlength.
*/
function trimHistory(data, maxlength) {
	if(data != '' && data.length > 0) {
		//trim history as needed
		data = data.split("|");
		var excessTasks = data.length - maxlength;
		if(excessTasks >  0) {
			data.splice(0, excessTasks);
		}
		return data.join("|");
	}
	return data;
}

function flushHistory() {
	setVariable("TTQ_HISTORY", "");
	refreshHistory();
}

function createBuildLinks() {
		_log(3, "-> createBuildLinks()");
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
		
	var iTask = 0;  //the default action is build
	
	
	// Get the building name(s)
	var sXpathExpr = "//h1/b";
	var xpathRes = xpath(sXpathExpr);
	
	if(xpathRes.snapshotLength > 0) {  //standing building
			_log(3, "This is an existing building.");
		iTask = 1;
		var xpathBuildingNames = xpathRes;
		var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");  // Will be used later for matching buildings and resource sites
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"	
			_log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
	} else {  //empty building site or error
			_log(3, "This is an empty building site.");
		var xpathBuildingNames = xpath("//h2");
		var re = new RegExp("^([^0-9].*)", "i");  // Will be used later. For matching all except "X. Cranny"
		var re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"	
			_log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
	}
	
	

	for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
		//search for building id
			_log(3, "Searching for building ID...");
		
		var sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML;  // this can contain level X string		
		var aMatches = sBuildingName.match(re);
		if(aMatches) {  //Regular building
			sBuildingName = aMatches[1];
			sBuildingName = rtrim(sBuildingName);  //trim trailing spaces
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Building or resource site name found: \"" + sBuildingName +"\" \n"+ sBuildingId);
		} else if(aMatches = sBuildingName.match(re2)) {  // Cranny has different format (e.g. "3. Cranny")
			sBuildingName = aMatches[1];
			var sBuildingId = aLangBuildings.indexOf(sBuildingName);
				_log(3, "Cranny name found: " + sBuildingName +" \n"+ sBuildingId);
		}
		if(sBuildingId > 0) {
			// building found in the list			
			var oLink = document.createElement("a");
			oLink.id = "buildLater" + i;
			oLink.innerHTML = " " + aLangStrings[iTask];
			oLink.title = t("Schedule this task for later.");
			oLink.href = "#";
			oLink.setAttribute("itask", iTask);
			oLink.setAttribute("starget", iSiteId);
			oLink.setAttribute("soptions", sBuildingId);
			oLink.addEventListener('click',	displayTimerForm, false);
									
			if(iTask == 0) {xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);}
			else if(iTask == 1) {xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);}
		} else {
			_log(2, "Building name found, but it was not identified in the building list.\n"+sBuildingName+"\n"+re);
		}
	}

		_log(3, "<- createBuildLinks()");
}

function createAttackLinks() {
		_log(3, "-> createAttackLinks()");
		
	var xpathResult = xpath("id('lmid2')//input[@type='text']");
	if(xpathResult.snapshotLength < 1) {
			_log(3, "We are not creating the 'Send later' button here.");
		return false;
	}
		
	// create the submit button
	var oBtn = document.createElement("input");
	oBtn.type = "button";
	oBtn.value = t("Send later");
	oBtn.style.margin = "3px 6px";
	oBtn.addEventListener("click", scheduleAttack, false);
	
	var oOkBtn = document.getElementsByName('s1');
	oOkBtn[0].parentNode.appendChild(oBtn);
	
	//create textbox for hero if it's not present
	xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]/td[8]");
	if(xpathResult.snapshotLength < 1) {  //no hero textbox - make one
		xpathResult = xpath("id('lmid2')/table[1]/tbody/tr/td/table/tbody/tr[3]");
		if(xpathResult.snapshotLength > 0) {
			xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");
			//xpathResult.snapshotItem(0).innerHTML += '<td width="20"><img class="unit" src="img/un/u/hero.gif" title="" border="0" onclick="document.snd.t11.value=\'\'; return false;" ></td><td width="35"><input class="fm" type="Text" name="t11" value="" size="2" maxlength="6"></td><td class="f8 c b"><b>(' +aLangStrings[33]+ ')</b></td>';
			
			var oTd1 = document.createElement('td');
			var oTd2 = document.createElement('td');
			var oTd3 = document.createElement('td');
			oTd1.innerHTML = '<img class="unit" src="img/un/u/hero.gif" title="" border="0" >';
			oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
			oTd3.innerHTML = '<b>(' +t("away")+ ')</b>';
			oTd3.className = 'f8 c b';
			xpathResult.snapshotItem(0).appendChild(oTd1);		
			xpathResult.snapshotItem(0).appendChild(oTd2);			
			xpathResult.snapshotItem(0).appendChild(oTd3);
			
		}
	}
		
		_log(3, "<- createAttackLinks()");
}

function createResearchLinks() {
		_log(3, "-> createResearchLinks()");
	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var sLocation = window.location.href;
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
	
	//is this Academy, Smithy or armory?
	var buildingName = xpath("//h1/b");	
	if(buildingName.snapshotLength < 1) {
			_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
	switch(buildingName[1]) {
		case aLangBuildings[22]: //academy
			var linkTxt = t("Research later");
			break;
		case aLangBuildings[12]:  //smithy
		case aLangBuildings[13]:  //armory
			var linkTxt = t("Enhance later");
			break;
		default:
			_log(2, "No research links needed.");
			return;			
	}
	
	//build links
		_log(2, "Adding research later links...");
	var Imgs = xpath("id('lmid2')/form/table[1]/tbody/tr/td[1]/table/tbody/tr[1]/td[1]/img");
	var Cells = xpath("//form/table[1]/tbody/tr/td[2]/div | //form/table[1]/tbody/tr/td[2]/a");
	for(var i = 0; (i < Imgs.snapshotLength) && (i < Cells.snapshotLength); i++) {
		var thisImg = Imgs.snapshotItem(i);
		var thisCell = Cells.snapshotItem(i);
		var iTroopId = thisImg.src.match(/([0-9]{1,2})\.gif/i);
		if(!iTroopId) { break; }
		iTroopId = iTroopId[1];
		if(iTroopId > 20) {
			iTroopId = iTroopId - 20;
		} else if(iTroopId > 10) {
			iTroopId = iTroopId - 10;
		}
		
		var oLink = document.createElement("a");
		oLink.id = "ttq_research_later" + i;
		oLink.className = "ttq_research_later";
		oLink.innerHTML = " " + linkTxt;
		oLink.title = linkTxt;
		oLink.href = "#";
		oLink.setAttribute("itask", 3);
		oLink.setAttribute("starget", iSiteId);
		oLink.setAttribute("soptions", iTroopId);
		oLink.addEventListener('click',	displayTimerForm, false);	
		thisCell.parentNode.appendChild(oLink);
	}
	
		_log(3, "<- createResearchLinks()");
}

function createTrainLinks() {
		_log(3, "-> createTrainLinks()");
		
	var re = /.*build\.php\?id=([0-9]{1,2})/i;
	var iSiteId = getBuildingId();
	if(iSiteId == false) {return false;}
	
	//is this Barracks, Stables, Workshop, Residence or Palace?
	var buildingName = xpath("//h1/b");
	if(buildingName.snapshotLength < 1) {
			_log(2, "Building name not found.")
		return;
	}
	var re = new RegExp("(.*)\\s" + t("level") + "\\s[0-9]{1,3}$", "i");
	buildingName = buildingName.snapshotItem(0).innerHTML.match(re);	
	var bIsResidence = false;
	switch(buildingName[1]) {
		case aLangBuildings[19]: //barracks
		case aLangBuildings[20]: //stables
		case aLangBuildings[21]: //workshop
			var linkTxt = t("Train later");
			break;
		case aLangBuildings[25]: //residence
		case aLangBuildings[26]: //palace
			re = /s=[0-9]+/i;
			if(re.test(location.href) ) {  //not on the first page of palace/residence
				return;
			}
			bIsResidence = true;
			var linkTxt = t("Train later");
			break;
		default:
			_log(2, "No train links needed.");
			return;			
	}
	
	if(bIsResidence) {
			_log(2, "Adding train later links for residence/palace...");
		var trainBtn = xpath("//p[2]/input[@type='image']");
		if(trainBtn.snapshotLength > 0) {  //we need to build only the button
				_log(2, "Adding train later links for residence/palace...");
			var oBtn = document.createElement("input");
			oBtn.type = "button";
			oBtn.value = linkTxt;
			oBtn.style.margin = "3px 6px";
			oBtn.addEventListener("click", scheduleTraining, false);		
			trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);	
		} else {  //we need to build the textbox
			//get the code. No code - no training
			var iCode = xpath("id('lmid2')/form//input[@name='z']");
			if(iCode.snapshotLength < 1) {
					_log(3, "No code available. No train later link available.");
				return false;
			}
			
			var oDiv = document.createElement("table");
			oDiv.innerHTML = '<tr><td><img class="unit" src="img/un/u/20.gif"></td><td>' +aLangTroops[iMyRace][9]+ '</td><td><input type="text" value="0" size="2" maxlength="4" name="t10"/></td></td><input type="button" value="' +linkTxt+ '" id="ttq_settler_submit_btn" style="margin:3px 6px;" /></td></tr>';
			var oParent = xpath("id('lmid2')/p[2]");
			if(oParent.snapshotLength < 1) {
					_log(3, "Don't know where to attach the button. Exiting function...");
				return;				
			}
				_log(2, "Appending textbox and button...");
			oParent.snapshotItem(0).appendChild(oDiv);
			$("ttq_settler_submit_btn").addEventListener("click", scheduleTraining, false);
		}
		
	} else {	
			_log(2, "Adding train later links for barracks/stables/workshop...");
		var trainBtn = xpath("id('lmid2')/form/p/input[@type='image']");
		if(trainBtn.snapshotLength < 1) {  //button not found
				_log(2, "The Train button not found. Exiting function...");
			return false;
		}
		var oBtn = document.createElement("input");
		oBtn.type = "button";
		oBtn.value = linkTxt;
		oBtn.style.margin = "3px 6px";
		oBtn.addEventListener("click", scheduleTraining, false);		
		trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);		
	}
		
		_log(3, "<- createTrainLinks()");
}


function scheduleAttack(e) {
		_log(3, "-> scheduleAttack()");
		
	var iVillageId = window.location.href.match(/.*a2b\.php\?(newdid=[0-9]*&)?z=([0-9]*)/);  // target village
	if(iVillageId != null) {
		iVillageId = iVillageId[2];
	} else { //try to get the coordinates
		var sX = document.getElementsByName('x');
		var sY = document.getElementsByName('y');
		iX = sX[0].value;
		iY = sY[0].value;
		if(iX != '' && iY != '') {
			iVillageId = coordsXYToZ(iX, iY);
		}					
	}
	
	if(iVillageId == null) {
			_log(2, "Target village ID not found.");
		printMsg(t("The attack cannot be scheduled because no destination was specified."), true);
		return false;
	}
	
	var aTroops = new Array();
	var iAttackType = null;
	var sXpathExpr = "//div[@class='f10']/input[@type='radio']";
	var xpathRes = xpath(sXpathExpr);
	if(xpathRes.snapshotLength > 0) {
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			if(xpathRes.snapshotItem(i).checked) iAttackType = i+2;
		}
	} else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	if(iAttackType != null) {aTroops[0] = iAttackType;}
	else {
			_log(2, "The type of attack was not determined. Unable to schedule the attack.");
		return false;
	}
	
	sXpathExpr = "//table[@class='p1']//table//td/input[@type='text']";
	xpathRes = xpath(sXpathExpr);
	
	var bNoTroops = true;
	if(xpathRes.snapshotLength > 0) {		
		for (var i = 0; i < xpathRes.snapshotLength; i++) {
			var aThisInput = xpathRes.snapshotItem(i);
			var iTroopId = aThisInput.name.substring(1);			
			aTroops[iTroopId] = (aThisInput.value != '') ? aThisInput.value : 0;
			if(aThisInput.value) {bNoTroops = false;}  //at least 1 troop has to be sent
		}
	} else {
			_log(2, "No info about troops found. Unable to schedule the attack.");
		return false;
	}
	
		_log(3, "Troops:\n" + aTroops);
	
	if(bNoTroops) {
			_log(2, "No troops were selected. Unable to schedule the attack.");
		printMsg(t("The attack cannot be scheduled because no troops were selected.") , true);
			return false;
	} 		
	
	// Good, we have at least 1 troop. Display the form
	displayTimerForm(2, iVillageId, aTroops);		
		_log(3, "<- scheduleAttack()");
}

function scheduleTraining(e) {
	var Inputs = xpath("id('lmid2')//table//input[@type='text']");
	if(Inputs.snapshotLength < 1 ) {
			_log(3, "No textboxes with troop numbers found.");
		return false;
	}
	var buildingId = getBuildingId();
	var aTroops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  //the first member  is the code
	var bNoTroops = true;
	for(var i = 0; i < Inputs.snapshotLength; i++) {
		var thisTroopType = parseInt(Inputs.snapshotItem(i).name.substring(1));
		aTroops[thisTroopType] = (Inputs.snapshotItem(i).value != '') ? Inputs.snapshotItem(i).value : 0;
		if(Inputs.snapshotItem(i).value && Inputs.snapshotItem(i).value != 0) {bNoTroops = false;} 
	}
	
	if(bNoTroops) {
			_log(2, "No troops were selected. Unable to schedule training.");
		printMsg(t("No troops were selected.") , true);
			return false;
	}
	
	//get the code
	var iCode = xpath("id('lmid2')/form//input[@name='z']");
	if(iCode.snapshotLength > 0) { 
		aTroops[0] = iCode.snapshotItem(0).value;
	} else {
			_log(3, "No code available. Exiting.");
		return false;
	}
	
	//currently, only 1 kind of troop can be trained at once - null all elements except for the oth one (code) and the first non-zero value
	var somethingFound = false;
	aTroops.forEach(function(element, index) {		
		if(index > 0 && element > 0) {			
			if(somethingFound) aTroops[index] = 0;
			somethingFound = true;			
		}
	})
	
	
	// Good, we have at least 1 troop. Display the form
	displayTimerForm(4, buildingId, aTroops);
}

/**
 * @param iTask: 0 - build, 1 - upgrade, 2 - attack,raid,support
 * @param target: sitedId for iTask = 0 or 1; iVillageId for siteId = 2
 * @param options: buildingId for iTask = 0; troops for attacks.
 * @param timestamp: if it is passed, suggest the time calculated from this (Caution! It is in seconds).
 * This function functions both as a Listener for Build later and Upgrade later links,
 * and as regular function when arguments are supplied (in case of scheduling attacks and editing existing tasks).
 */
function displayTimerForm(iTask, target, options, timestamp) {
		_log(3, "-> displayTimerForm()");

	// For build and upgrade, we need to extract arguments from the event object	 
	 if(iTask != 2 && iTask != 4  && target == null) {  //if params are supplied, we do not extract them from the event object target (link)
		var el = iTask.target;  // iTask really is the Event object!
		var iTask = parseInt(el.getAttribute("itask"));
		var target = el.getAttribute("starget");
		var options = el.getAttribute("soptions");
		if(iTask == undefined || target == undefined || options == undefined) {
				_log(2, "Missing arguments:\niTask="+iTask+"\ntarget="+target+"\noptions="+options);
			return false;
		}
	}
	var sTask = ''; 
	var sWhat = '';	
	var sMoreInfo = ''
	if(iMyRace != 0 && iMyRace != 1 && iMyRace != 2) iMyRace = getOption("RACE", 0, "integer");
	
	switch(iTask) {
		case 0:  //build
		case 1:  //upgrade
			sWhat = aLangBuildings[options];
			sTask = aLangTasks[iTask]; 
			sMoreInfo = t("at site no.") + " " +target;
			break;
		case 2:  //Attack, Raid, Support
			sWhat = '<span id="ttq_placename_' +target+ '">' +getPlaceName(target)+ '</span>';			
			var iAttackType = parseInt(options[0]) + 18; 
			sTask = aLangStrings[iAttackType];
			var bCatapultPresent = (options[8] > 0) ? true : false;
			var bOnlySpies = onlySpies(options);
			if(options[11] == undefined) options[11] = 0;  //if no heros are specified, set them to zero
			sMoreInfo = getTroopsInfo(options); 
			options = options.join("_");
			break;
		case 3:  //Research
			sWhat = aLangTroops[iMyRace][options-1]; 
			sTask = aLangTasks[3];
			break;
		case 4:  //Training
			sWhat = t("troops."); 
			sTask = aLangTasks[4];
			sMoreInfo = getTroopsInfo(options); 
			options = options.join("_");
			break;
	}
	
	var oTimerForm = document.createElement("form");
	
	//Suggest the current time. Can be local or server time.
	if(bUseServerTime && !timestamp) {  //suggest the server time
		var sTimeType = "This is the server time.";
		var sTime = getServerTime();
		sTime = (!sTime) ? "" : sTime;  //clear sTime if it is false
	} else if(bUseServerTime && timestamp) {  //suggest the timestamp displayed as server time
		var iServerTimeOffset = getServerTimeOffset();
		timestamp = (parseInt(timestamp) + (iServerTimeOffset * 3600)) * 1000;		
		var oServerDate = new Date(timestamp);
		var sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());	
	} else {  //suggest the local time
		var sTimeType = "This is your local time.";
		
		if(timestamp) {
			var date = new Date(timestamp * 1000); 
		} else {
			var date = new Date(); 
		}
		var dd = date.getDate();
		var mm = date.getMonth() + 1; 
		var yyyy = date.getFullYear();
		var hh = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		
		//Convert small numbers to conventional format
		var sTime = formatDate(yyyy, mm, dd, hh, min, sec);
		
	}
	
	// Allow target selection for catapults if this is not support and at least 1 cata is sent
	var sCataTargets = '';
	if(iTask == 2 && iAttackType > 20 && bCatapultPresent) {
		var sCataOptions = "";
		for(var j=1; j < aLangBuildings.length; j++) {
			sCataOptions += '<option value="' +j+ '">' +aLangBuildings[j]+ '</option>';
		}	
		sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' +t("random")+ '</option>' + sCataOptions + '</select>';
		sCataTargets += '<select name="kata2" size="" class="f8"><option value="99">' +t("random")+ '</option>' + sCataOptions + '</select>';
	}
	
	//Allow specifying the spying mode (only if there is nothing but spies being sent and if this is not a support)
	var sSpyMode = '';
	if(iTask == 2 && iAttackType > 20 && bOnlySpies) {
		sSpyMode = '<input type="radio" name="spy" value="1" checked>' +t("Spy for resources and troops")+ ' <input type="radio" name="spy" value="2">' +t("Spy for troops and defenses");
	}
	
	oTimerForm.id = "timerForm";
	oTimerForm.setAttribute("class", "handle");
	var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerform_wrapper\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

	oTimerForm.innerHTML = sLinkClose + '<input type="hidden" name="timerTask" value="' +iTask+ '" /><input type="hidden" name="timerTarget" value="' +target+ '" /><input type="hidden" name="timerOptions" value="' +options+ '" /><p>' +sTask+ ' ' +sWhat+ '<br/>' + t("at") + ' <input name="at" onmousedown="function(e){alert(\'oleeee\');/*e.stopPropagation();*/}" type="text" id="at" value="' +sTime+ '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' +sTime+ '\'" title="' +sTimeType+ '" /> ' + t("or after") + ' <input name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';" /><select name="timeUnit"><option value="1">' + t("seconds") + '</option><option value="60" selected="selected">' + t("minutes") + '</option><option value="3600">' + t("hours") + '</option><option value="86400">' + t("days") + '</option></select><br/><span style="font-size:75%; cursor:default;">' +sMoreInfo+ '</span></p>';
	
	if(sCataTargets != '') {
		oTimerForm.innerHTML += '<p>' + t("Catapults will aim at") + ': ' +sCataTargets+ ' </p>';
	}
	
	if(sSpyMode != '') {
		oTimerForm.innerHTML += '<p>' +sSpyMode+ '</p>';
	}
	
	var oSubmitBtn = document.createElement("input");
	oSubmitBtn.name = "submitBtn";
	oSubmitBtn.value = "OK";
	oSubmitBtn.type = "button";
	oSubmitBtn.addEventListener('click', function() {handleTimerForm(this.form)}, true);
	oTimerForm.appendChild(oSubmitBtn);
	
	var oWrapper = document.createElement("div");
	oWrapper.id = "timerform_wrapper";
	oWrapper.appendChild(oTimerForm);
	
	//position
	var formCoords = getOption("FORM_POSITION", "215px_215px");
	formCoords = formCoords.split("_");
	oWrapper.style.top = formCoords[0];
	oWrapper.style.left = formCoords[1];
	
	document.body.appendChild(oWrapper);
	makeDraggable($("timerForm"));
		_log(3, "<- displayTimerForm()");	
	return false;
}

function handleTimerForm(oForm) {
		_log(3, "-> handleTimerForm()");
	var at = oForm.at.value; 
	if(at == '') {
		var after = oForm.after.value;
		var timeUnit = oForm.timeUnit.value;
		after = after*timeUnit;  // convert to seconds
		var oDate = new Date();  // current GMT date. TODO: server time
		var iTaskTime = parseInt(oDate.getTime()/1000 + after); 
	} else {
		// convert formatted date to milliseconds
		var re = new RegExp("^(2[0-9]{3})/([0-9]{1,2})/([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$", "i");
		var aMatch = at.match(re);  
		if(!aMatch) {
			_log(1, "You entered invalid format of date!");
			return;
		}
		for(var i = 2; i < aMatch.length; i++) {
			// convert strings to integers
			if(aMatch[i].match(/0[0-9]{1}/i)) {aMatch[i] = aMatch[i].substring(1);}
			aMatch[i] = parseInt(aMatch[i]); 
		}
		
		// Time zone conversions
		if(bUseServerTime) {  //server time
			var iServerTimeOffset = getServerTimeOffset();
			if(iServerTimeOffset == false) {  //problem. do nothing.
					_log(2, "We could not schedule this task, because we were unable to determine server's timezone.");
				printMsg("We could not schedule this task, because we were unable to determine server's timezone.", true);
				return false;
			}			
			
			var oTaskDate = new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);  //server time in local offset
			var newtimestamp = oTaskDate.getTime() - (oTaskDate.getTimezoneOffset() * 60000);  //server time in server's timezone
			newtimestamp = newtimestamp - (iServerTimeOffset * 3600000);  //get the UTC server time for this task			
			iTaskTime = parseInt( newtimestamp/1000 );  //convert to seconds
		} else {  //local time
			var oDate = new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);
			var iTaskTime = parseInt(oDate.getTime()/1000);
		}		
	}
	
	document.body.removeChild($('timerform_wrapper'));
		_log(2, "Task will be scheduled for " +iTaskTime);  // The stored time is the absolute Unix GMT time.	
	
	if(oForm.kata) { //store catapults targets
		oForm.timerOptions.value += "_" +oForm.kata.value;
	} 
	
	if(oForm.kata2) { //store catapults targets
		oForm.timerOptions.value += "_" +oForm.kata2.value;
	}
	
	if(oForm.spy) {  //spying mission
		for(var i = 0; i < oForm.spy.length; i++) {
			if(oForm.spy[i].checked) {oForm.timerOptions.value += "_" + oForm.spy[i].value;}
		}
	}
	
	setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value);
		_log(3, "<- handleTimerForm()");
}


/** @return true if there are only spies, false if there is anything else or no spies. */
function onlySpies(aTroops) {
		_log(3, "-> onlySpies()");
		
	var iScoutUnit = getOption("SCOUT_UNIT", false, "integer");
	if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
			_log(2, "Unknown iScoutUnit. Unable to determine if this is a spying mission.");
			return false;
	}
	
	if(aTroops[iScoutUnit] < 1) { //no spies
			_log(3, "No spies.");
		return false;  
	}
	for(var i=1; i <= 11; i++) { 
		if(i != iScoutUnit && parseInt(aTroops[i]) > 0) { //at least one other troop		
				_log(3, "Troops other than spies are present.");
			return false;
		}
	}	
		_log(3, "This is a spying mission.");
	return true;  
		_log(3, "<- onlySpies()");
}

function printMsg(sMsg,bError) {
		_log(3, "-> printMsg()");
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	_log(1, sWhen + sMsg);
	//alert(sMsg);
	
	// delete old message
	var oOldMessage = $("ttq_message");
	if(oOldMessage) {
			_log(3, "Removing the old message." +oOldMessage);
		oOldMessage.parentNode.removeChild(oOldMessage);
	}	
	
	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";
	
	var sBgColor = (bError) ? "#FFB89F" : "#90FF8F"; 
	var oMsgBox = document.createElement("div");
	//oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
	oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
	oMsgBox.style.backgroundColor = sBgColor;
	var msgCoords = getOption("MSG_POSITION", "215px_215px");
	msgCoords = msgCoords.split("_");
	oMsgBox.style.top = msgCoords[0];
	oMsgBox.style.left = msgCoords[1];
	oMsgBox.id = "ttq_message";
	document.body.appendChild(oMsgBox);
	makeDraggable($('ttq_draghandle_msg'));
		_log(3, "<- printMsg()");
}

/** Experimental: Send messages in the game 
 * TODO: The sC parameter needs to be loaded and saved once.
 */
function sendMsg(sTo, sSubject, sMsg, sC) {
		_log(3, "-> sendMsg()");
	if(sTo == '' || sMsg == '' || sC == '') {return false;}
	var sParams = 'c=' +sC+ '&an=' +sTo+ '&be=' +sSubject+ '&message=' +sMsg+ '&t=2&s1=';
	sParams = encodeURI(sParams);
	var httpRequest = new XMLHttpRequest();		
	httpRequest.open("POST", 'nachrichten.php', true);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.setRequestHeader("Content-length", sParams.length);
	httpRequest.setRequestHeader("Connection", "close");
	httpRequest.send(sParams);	
		_log(3, "<- sendMsg()");
}

function hideMsg() {
		_log(3, "-> hideMsg()");
	var oMsgBox = $("ttq_message");
	document.body.removeChild(oMsgBox);
		_log(3, "<- hideMsg()");
}

/**
 * Retrieves the value corresponding do the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name          The name of the variable
 * @param defaultValue  default value if name is not found
 */
function getVariable(name, defaultValue) {
		_log(3, "-> getVariable()");

    //if(!name) { var name = "TTQ_TASKS"; }
    if(!defaultValue) { var defaultValue = ''; }

    name = sCurrentServer + name;
    var data = GM_getValue(name, defaultValue);

        _log(3, "<- getVariable()");
    return data;
}

/**
 * Sets the value for the given variable name and the current Travian server
 * Use greasemonkey's built-in system instead of cookies to permantenly store and read settings
 *
 * @param name  The name of the variable
 * @param value The value to be assigned
 */
function setVariable(name, value) {
		_log(3, "-> setVariable()");

    name = sCurrentServer + name;
    GM_setValue(name, value);
	
        _log(3, "<- setVariable()");
    return true;
}

/**
 * Removes a cookie by setting its expire date to yesterday
 * 
 * @param name  The name of the cookie
 */
function eraseCookie(name) {
        var date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + expires + "; path=/";
}

function getCode(iSiteId, iNewdid) {
		_log(3, "-> getCode()");
	
	if(iNewdid != 'null' && iNewdid != '') {
		var sNewdid = "&newdid=" +iNewdid;
	} else {
		var sNewdid = "";
	}
	
	get("build.php?id=" + iSiteId + sNewdid, handleRequestFindCode, iNewdid);	
		_log(3, "<- getCode()");

}

function findCode(sPage, iNewdid) {
		_log(3, "-> findCode()");
	var iMode = 0;  // mode is 0 for building new stuff, 1 for upgrading
	var sCode = '';
	if(!iNewdid) {
		var iNewdid = 'null';
	}

	var re0 = /dorf2\.php\?a=[0-9]{1,2}&id=[0-9]{1,2}&c=(.{3})/i;  // new building
	var re1 = /dorf[1-2]\.php\?a=.*&c=(.{3})/i;  //upgrade
	var aMatch0 = sPage.match(re0);
	var aMatch1 = sPage.match(re1);
	if(aMatch0) {
		_log(3, "Code for building new stuff found.");
		sCode = aMatch0[1];
		iMode = 0;
	} else if(aMatch1) {
		_log(3, "Code for upgrading found.");
		sCode = aMatch1[1];	
		iMode = 1;
	} else {
		_log(3, "Code not found");
		return;
	}
	
	
	//save the found code in the proper cookie
    // deprecated!
    if(bLockedCode) {
			_log(3, "The TTQ_CODE_" + iMode + " cookie is locked. We were not able to write it.");
		return false;
	}
	if(sCode != '') {
		bLockedCode = true;  // TODO check if the cookie is locked. Lock it separately from tasks
		var sCookie = getVariable("TTQ_CODE_" +iMode);
		var aCookie = new Array();
		if(sCookie != '') {  //there is a cookie
			aCookie = sCookie.split(",");
			var iIndexOfVillageId = aCookie.indexOf(iNewdid);
			if(iIndexOfVillageId > -1) {  // existing old code - remove
				aCookie.splice(iIndexOfVillageId, 2);
			}
		}		
		aCookie.push(iNewdid);
		aCookie.push(sCode);
		sCookie = aCookie.join(",");
			_log(3, "Writing TTQ_CODE_"+iMode+": " + sCookie);
		setVariable('TTQ_CODE_'+iMode, sCookie);
		bLockedCode = false;
	} else {
			_log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
		return false;
	}		
	
		_log(3, "<- findCode()");
}


/** @return coordZ if the name is not found in the cache. */
function getPlaceName(iPlaceId) {
		_log(3, "-> getPlaceName()");
	
	if(!bDisplayVillageNames) {
		return iPlaceId;
	}
	
	//first try to load the name from the cache
	var sCookie = getVariable("TTQ_PLACE_NAMES");  // format: "123456,VillageName,233564,VillageName,"
	if(sCookie != '') {
		var aPlaces = sCookie.split(",");	
		var iPlacesLength = aPlaces.length;
		if(iPlacesLength > 0) {	
			for(var i = 0; i < iPlacesLength; i++) {				
				if(aPlaces[i].indexOf(iPlaceId) > -1) {
					return decodeURI(aPlaces[i+1]);
				}
				i++;
			}
		}
	}	
		
	var httpRequest = new XMLHttpRequest();
	httpRequest.overrideMimeType("application/xml");
	httpRequest.onreadystatechange = function() { 
			handleGetPlaceName(httpRequest, iPlaceId); 
	};
	httpRequest.open("GET", "karte.php?z=" +iPlaceId, true);
	httpRequest.send(null);
	
		
	return iPlaceId;		
		_log(3, "<- getPlaceName()");
}

function handleGetPlaceName(httpRequest, iPlaceId) {
		_log(3, "-> handleGetPlaceName()");
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) { // ok		
				_log(3, "HTTP response retrieved.");
			var sResponse = httpRequest.responseText;  // it would be much easier to find what we want in responseXML, but it doesn't work, since it is not well-formed
			
			if(sResponse) {
					
				var iCoordX = coordZToX(iPlaceId);
				var iCoordY = coordZToY(iPlaceId);
					_log(3, "Coordinates for " +iPlaceId+ ": " +iCoordX+ "|" +iCoordY);
				var re = new RegExp("onmouseover=\"map\\('([^']*)','([^']*)','[^']*','[^']*','" +iCoordX+ "','" +iCoordY+ "'\\)\"", "i");
				var aMatch = sResponse.match(re);
				if(aMatch && aMatch[1]) { 
						_log(2, "The village name found:"+aMatch[1]);
					cachePlaceName(iPlaceId, aMatch[1]);
					injectPlaceName(aMatch[1], iPlaceId);
				} else {
						_log(2, "The village name not found.");
					cachePlaceName(iPlaceId, iCoordX + "|" + iCoordY);
					injectPlaceName(iCoordX + "|" + iCoordY, iPlaceId);
				}				
			}

		} else { // failed
				_log(2, "HTTP request status: " + httpRequest.status);
		}
	}
	
		_log(3, "<- handleGetPlaceName()");
}

/** Store found names in a cookie. */
function cachePlaceName(iPlaceId, sPlaceName) {
		_log(3, "-> cachePlaceId()");
	
	var aPlaces = new Array();
	var sCookie = getVariable("TTQ_PLACE_NAMES");
	if(sCookie) {
		aPlaces = sCookie.split(",");
	}
	
	if(aPlaces.length > (2 * iMaxPlaceNamesCookieLength) ) {  //cookie is too long, clear it first
		aPlaces = [];
	}
	
	if(aPlaces.length > 1) {
		var iIndexId = aPlaces.indexOf(iPlaceId);
		if(iIndexId > -1) {  //this place is stored - remove
			aPlaces.splice(iIndexId, 2);
		}
	}
	aPlaces.push(iPlaceId);
	aPlaces.push(encodeURI(sPlaceName));
	var sNewCookie = aPlaces.join(",");
	setVariable("TTQ_PLACE_NAMES", sNewCookie);
	
	
		_log(3, "<- cachePlaceId()");
}

function injectPlaceName(sPlaceName, iPlaceId) {
	var oSpan1 = $('ttq_placename_'+iPlaceId);
	var oSpan2 = $('ttq_placename_history_' +iPlaceId);
	if(oSpan1) {
		oSpan.innerHTML = sPlaceName;
		return;
	} 
	if(oSpan2) {
		oSpan.innerHTML = sPlaceName;
		return;
	} 
	return;
}

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		switch(dragObject.id) {
			case "ttq_message":
				var key = "MSG_POSITION";
				break;
			case "timerform_wrapper":
				var key = "FORM_POSITION";
				break;
			case "ttq_history":
				var key = "HISTORY_POSITION";
				break;
			case "ttq_tasklist":
			default:
				var key = "LIST_POSITION";
				break;
		}
		setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

/************************************************************************************/

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getRace() {
		_log(3, "-> getRace()");
	var xpathResult = xpath("//img[@class='unit']");
	if (xpathResult.snapshotLength > 0) {
		var src = xpathResult.snapshotItem(0).src;
		var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
		if(!iTroopType || !iTroopType[1]) {
			_log(2, "Image not found. Could not determine the race.");
			return false;
		}
		iTroopType = parseInt(iTroopType[1]);
		if(iTroopType > 20) {
			return 2; //gaul
		} else if(iTroopType > 10) {
			return 1; //teutons
		} else {
			return 0; //Romans
		}
	} else {
			_log(2, "Image not found. Could not determine the race.");
			return false;
	}
		_log(3, "<- getRace()");
} 

function getBuildingId() { 
	var re = /.*build\.php\?([a-z=0-9&]*&)?id=([0-9]{1,2})/i;
	var iSiteId = window.location.href.match(re);
	if(iSiteId != null) {
		return parseInt(iSiteId[2]);
	} else {
			_log(2, "Building site ID not found");
		return false;
	}
}

/** @return newdid of the currently selected village */
function getActiveVillage() {
		_log(3, "-> getActiveVillage()");
	var oActiveLink = xpath("//a[@class='active_vl']");
	if(oActiveLink.snapshotLength > 0) {
			_log(2, "Active village link found.");
		var sHref = oActiveLink.snapshotItem(0).href;
		var aMatch = sHref.match(/newdid=([0-9]*)/i);
		if(!aMatch) {
				_log(2, "Active village id could not be found.");
			return false;
		} else {
				_log(3, "Active village id was found: " +aMatch[1]);				
			return aMatch[1];
		}
	} else {
			_log(2, "Active village could not be found.");
		return false;
	}
		_log(3, "<- getActiveVillage()");
}

/** @return name of one of your one villages. */
function getVillageName(iVillageDid) {
		_log(3, "-> getVillageName()");
	if(iVillageDid == '' || iVillageDid == 'null') {  //no village id
		return '';
	}	
	var sVillageName = '';	
	var xpathResult = xpath("id('lright1')/table/tbody/tr/td/a[contains(@href, '" +iVillageDid+ "')]");
	if(xpathResult.snapshotLength > 0) {
		return xpathResult.snapshotItem(0).innerHTML;
	} else {
		return 'unknown';
	}
		_log(3, "<- getVillageName()");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

/** Kudos to QP for writing this function. */
function coordsXYToZ(x, y) {	
	x = parseInt(x);
	y = parseInt(y);
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}

/** Kudos to QP for writing this function. */
function coordZToX(z) {
	z = parseInt(z);
	var x = ((z - 1) % 801) - 400;
	return x;
}

/** Kudos to QP for writing this function. */
function coordZToY(z) {
	z = parseInt(z);
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}

/**
 * This function is called once, after user installed a new version of this script
 */	
function performUpgrade() {
		_log(3, "-> performUpgrade()");

    // Remove old cookies created with previous version of the script to avoid being dectected ;)
    eraseCookie("TTQ_CODE_0");
	eraseCookie("TTQ_CODE_1");
	eraseCookie("TTQ_PLACE_NAMES");
	eraseCookie("TTQ_LIST_POSITION");
	eraseCookie("TTQ_LAST_REFRESH");
    eraseCookie("TTQ_TASKS");
    eraseCookie("TTQ_HISTORY");
    eraseCookie("TTQ_OPTIONS");

    // Reset vars
    setVariable("TTQ_CODE_0", "");
	setVariable("TTQ_CODE_1", "");
	setVariable("TTQ_PLACE_NAMES", "");
    
    setVariable("TTQ_VERSION", sCurrentVersion);
	alert("Your Travian Task Queue script has been updated.");	
		_log(3, "<- performUpgrade()");
}

/**
* @return The server timezone offset from GMT or false if it is not available. 
*/
function getServerTimeOffset() {
		_log(3, "-> getServerTimeOffset()");
	var iServerTimeOffset = getOption("SERVER_TIME_OFFSET", false);
	if(iServerTimeOffset != false) {  //no automatic detection
			_log(3, "Returning the predefined iServerTimeZoneOffset.");
		return parseInt(iServerTimeOffset);
	} else {  //automatic detection	
		var iOffset = xpath("id('ltime')/span[2]");
		if(iOffset.snapshotLength < 1) {  //not found. Unknown offset.
			return false;
		} else {
			iOffset = iOffset.snapshotItem(0).innerHTML;
			var aMatch = iOffset.match( /([A-Z]{3})([-+]{1}[0-9]{1,2})/i );
			if(!aMatch) {
					_log(3, "No server time zone recognized, although it seems to be displayed.");
				return false;
			}
			
			iOffset = parseInt(aMatch[2]);
			switch(aMatch[1]) {	
				case "AST":
					return (iOffset - 4);
					break;
				case "EST":
					return (iOffset - 5);
					break;
				case "CST":
					return (iOffset - 6);
					break;
				case "MEZ":				
					return (iOffset + 1);
					break;
				case "UTC":
				case "GMT":
				default:
					return iOffset;
					break;
			}
			
		}
	}
	
	return false;
		_log(3, "<- getServerTimeOffset()");
}

/**
* @return Current server time as formatted string or timestamp or false if the server time cannot be determined.
*/
function getServerTime(bReturnTimestamp) {
		_log(3, "-> getServerTime()");
	
	// get server time zone offset
	var iTimeOffset = getServerTimeOffset();			

	var sTime = xpath("id('tp1')");
	if(sTime.snapshotLength < 1) {
			_log(3, "No server time found.");
		return false;
	}
	sTime = sTime.snapshotItem(0).innerHTML;

	// now we need to determine server date - tricky.
	var aMatch = sTime.match( /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i );
	if(!aMatch) {
			_log(3, "No server time found. Server date could not be determined.");
		return false;
	}
	
	// get UTC time of the server
	var UTCHoursServer =  parseInt(aMatch[1]) - iTimeOffset;
	if(UTCHoursServer > 23) {
		UTCHoursServer = UTCHoursServer - 24;
	}
	if(UTCHoursServer < 0) { 
		UTCHoursServer = UTCHoursServer + 24;
	}
	 
	// for now, we assume that the local UTC time = server UTC time. 
	//TODO: solve the situation when it's not
	var oLocalTime = new Date();
	var yy = oLocalTime.getUTCFullYear();
	var mm = oLocalTime.getUTCMonth();
	var dd = oLocalTime.getUTCDate();	
	var hh = oLocalTime.getUTCHours();
	
	//Now the logic:
	if(hh == UTCHoursServer) {  //the local UTC time is similar to server's UTC time. Good!
		// we can therefore use local date as server's date
	} else if(hh == 23 && UTCHoursServer == 0) {  //the server is ahead of us
		dd = dd + 1;
	} else if(hh == 0 && UTCHoursServer == 23) {  //the server is falling behind
		dd = dd - 1;
	} else {  //we do not tolerate bigger differences!
			_log(2, "Warning! The local time (as UTC) differs from the server time (as UTC) by more than 1 hour. Your local time is incorrect or you specified wrong timezone for your server. We can't calculate server's date.");
		return false;
	}
	
	//now we can construct the Date object for the server time and return formatted string
	//var sTime = yy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
	var oServerDate = new Date(yy, mm, dd, UTCHoursServer, aMatch[2], aMatch[3]);
	//the created object has wrong timestamp - it was offset by local timezone offset. Bring it back
	var newtimestamp = oServerDate.getTime() - (oLocalTime.getTimezoneOffset() * 60000);  //this is server time as UTC
	
	if(bReturnTimestamp) {  //we don't need formatted string
		return newtimestamp;
	}
	
	newtimestamp = newtimestamp + (iTimeOffset * 3600000);  //server time in the server's timezone
	var oServerDate = new Date(newtimestamp);  //this is the server's time (not UTC!)
	
	sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
	return sTime;

	
	
		_log(3, "<- getServerTime()");
}

/**
* @param {int}
* @return {str} Formatted date.
*/
function formatDate(yyyy, mm, dd, hh, min, sec) {
	if(dd < 10) {dd = "0" + dd;}
	if(mm < 10) {mm = "0" + mm;}
	if(min < 10) {min = "0" + min;}
	if(sec < 10) {sec = "0" + sec;}	
	return yyyy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
}

function isInt(x) {
   var y = parseInt(x);
   if (isNaN(y)) {return false;}
   return x==y && x.toString()==y.toString();
} 

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  window[key] = getOption(key, defaultValue, "boolean");
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    setOption(key, !window[key]);
	
	if(key == 'USE_SERVER_TIME' && !window[key]) {
		var iServerTimeOffset = getServerTimeOffset();
		var promptMsg = (iServerTimeOffset == false) ? "Travian Task Queue:\nPlease enter your server's timezone offset from GMT in hours.\n(examples: for GMT enter 0, for MEZ enter 1, for EST enter -5)" : "Travian Task Queue:\nYour server's timezone offset was detected as " +iServerTimeOffset+ " hours from GMT.\n If this is not right, please enter the correct value. Otherwise leave the box empty.";	
		
		var userResponse = prompt(promptMsg);
		while( (userResponse != '' && !isInt(userResponse)) || (userResponse == '' && iServerTimeOffset == false) ) {
			userResponse = prompt(promptMsg);		
		} 
		var value = (userResponse != '') ? userResponse:iServerTimeOffset;
		setOption("SERVER_TIME_OFFSET", value);
	}
	
	location.reload();
  });
}

function useLocalTime() {
	setVariable("TTQ_USE_SERVER_TIME", false);
	bUseServerTime = false;
	setVariable("TTQ_SERVER_TIME_OFFSET", false);
	alert("Now you are using your local time for planning tasks.");
	location.reload();	
}

function useServerTime() { 
	var iServerTimeOffset = getServerTimeOffset();
	if(iServerTimeOffset == false) { 
		iServerTimeOffset = prompt("To use the server time, please enter the timezone offset (in hours) of your server from the GMT.\nExamples:\nFor EST enter \"-5\", for MEZ enter \"1\", etc.");
		if(isInt(iServerTimeOffset)) {
			setVariable("TTQ_SERVER_TIME_OFFSET", iServerTimeOffset);
			setVariable("TTQ_USE_SERVER_TIME", true);
			bUseServerTime = true;
		} else {
			alert("Invalid value. You need to specify an integer.");
		}
	} else {
		setVariable("TTQ_USE_SERVER_TIME", true);
		bUseServerTime = true;
	}
	alert("Now you are using your local time for planning tasks.");
	location.reload();
}

function getTroopsInfo(aTroops) {
	var sTroopsInfo = "";	
	for(var i = 1; i < 12; i++) {
		if(aTroops[i] > 0) {
			sTroopsInfo += aLangTroops[iMyRace][i-1] + ": " +aTroops[i]+ ", ";
		}
	}
	//trim last two characters
	sTroopsInfo = sTroopsInfo.substring(0, sTroopsInfo.length - 2);
	return sTroopsInfo;
}

function setOption(key, value) {
        _log(3, "-> setOption()");
    
    var options = getVariable('TTQ_OPTIONS', '');
	if(options != '') options = options.split(",");
	else options = [];
    var myOption = options.indexOf(key);
	if(myOption < 0) {
		options.push(key);
		options.push(value);
	} else {
		options[myOption + 1] = value;
	}

    setVariable('TTQ_OPTIONS', options.join(","));
        _log(3, "<- setOption()");
}
/**
* @param key: name of the parameter in the TTQ_OPTIONS variable
* @param defaultValue: this is returned if the parameter is not found
* @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
*/
function getOption(key, defaultValue, type) {
        _log(3, "-> getOption()");

    var options = getVariable('TTQ_OPTIONS', '');
	options = options.split(",");
	var myOption = options.indexOf(key);
	if(myOption < 0) {return defaultValue;}
	switch(type) {
		case "boolean":
			var myOption = ( options[myOption + 1] == "true") ? true:false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = options[myOption + 1];
			break;				
	}
        _log(3, "<- getOption()");
    return myOption;
}

function t(str) {
	var index = aLangStringsMaster.indexOf(str);
	var sTranslatedStr =  aLangStrings[index];
	if(sTranslatedStr) {
		return sTranslatedStr;
	} else {
		return str;
	}
}

function $(id) {
  return document.getElementById(id);
}

function promptRace() {
	var iMyRace = getOption("RACE", false, "integer");
	var newRace = false;
	while(!isInt(newRace)) {
		var newRace = prompt("Travian Task Queue: \nWhat is your race on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: " +iMyRace);
		if(isInt(newRace)) {
			newRace = parseInt(newRace);
			if(newRace > -1 && newRace < 3) {
				setOption("RACE", newRace);
				location.reload();
				break;
			} else {
				newRace = false;
			}
		}
	}
}

function promptHistory() {
	var newHistoryLength = false;
	while(!isInt(newHistoryLength)) {
		var newHistoryLength = prompt("Travian Task Queue: \nHow many past tasks do we keep in history?\n(Type 0 to disable task history.) \nCurrently: " +iHistoryLength);
		if(isInt(newHistoryLength)) {
			newHistoryLength = parseInt(newHistoryLength);
			if(newHistoryLength > -1) {
				setOption("HISTORY_LENGTH", newHistoryLength);
				location.reload();
				break;
			} else {
				newHistoryLength = false;
			}
		}
	}
}

function onLoad() {
		_log(3, "-> onLoad()");
		_log(3, "oIntervalReference " + oIntervalReference);	

    if(getVariable("TTQ_VERSION", 0) != sCurrentVersion) {
		performUpgrade();		
	}
	
	makeMenuToggle("USE_SERVER_TIME", false, "Use server time", "Use local time", "Travian Task Queue: ");
	GM_registerMenuCommand("Travian Task Queue: Set your race", promptRace);
	GM_registerMenuCommand("Travian Task Queue: Task History", promptHistory);

	var oDate = new Date();
	setOption("LAST_REFRESH", oDate.getTime());

	if(!oIntervalReference) {
			_log(3, "setInterval()");
		oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery); 
	}

    var re = /.*build\.php.*/i;
	if (re.test(window.location.href)) {
		createBuildLinks();
		createResearchLinks();
		createTrainLinks();
	}

	//var re = /.*a2b\.php\?(newdid=[0-9]*&)?z=.*/i;	
	var re = /.*a2b\.php/i
	if (re.test(window.location.href)) {
		createAttackLinks();
	}

	var iRace = getRace();
	if( iRace != false && ( iRace != getOption("RACE", false, "integer") ||  getOption("SCOUT_UNIT", false, "integer") == false ) ) {		
		switch(iRace) {
			case 0: //Romans
				setOption("SCOUT_UNIT", 4);
				setOption("RACE", 0);
				location.reload();  //we need to reload because the aLangTroops needs to be redefined
				break;
			case 1: //Teutons
				setOption("SCOUT_UNIT", 4);
				setOption("RACE", 1);
				location.reload();
				break;
			case 2: //Gauls
				setOption("SCOUT_UNIT", 3);
				setOption("RACE", 2);
				location.reload();
				break;
		}
	}
	
	var data = getVariable("TTQ_TASKS");
	if(data != '') {
		var aTasks = data.split("|");
		refreshTaskList(aTasks);
	}
	
	data = getVariable("TTQ_HISTORY");
	if(iHistoryLength > 0 && data != '') {
		var aTasks = trimHistory(data, iHistoryLength).split("|");
		refreshHistory(aTasks);
	}

		_log(3, "<- onLoad()");
}

if (init) {
    // --- Main Code Block ---
        _log(0, "TTQ started");

    window.addEventListener('load', onLoad, false);
}
else {
        _log(0, "Initializacion failed");
    alert("Initialization failed, Travian Task Queue is not running");
}