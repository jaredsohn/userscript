// ==UserScript==
// @name          CP Tweaks
// @namespace     http://localhost
// @description   Usprawnione i uaktualnione rozszerzenia interfejsu dla gry CosmoPulse: www.cosmopulse.net
// @include       http://* cosmopulse.net/*
// @require       http://www.cosmopulse.net/js/tooltips.js
// ==/UserScript==

// v0.7.6 mod 16
// You may freely use, distribute and/or modify this script as long as
// the following credentials are included:
// Created by Jacek Siuda
// Modified by wiochmen, byry & meeshoo

// SOWAMODSte
// v0.7.6 mod 12  - historia wersji
// v0.7.6 mod 12a - dokup naprawione ;)
// v0.7.6 mod 13  - strona kadry, kolorkowanie, menu kontekstowe planety i dokup dostosowane do ostatnich zmian
// v0.7.6 mod 14  - przywrócenie funkcjonalnosci
// v0.7.6 mod 15  - funkcjonalnosc szpiegow dostosowana do zmian
// v0.7.6 mod 15a - korekta eksportow
// v0.7.6 mod 15b - korekta dokup
// v0.7.6 mod 15c - korekta nazewnictwa flot
// v0.7.6 mod 15d - korekta dokup ( kolejna )
// v0.7.6 mod 15e - korekta dokup ( kolejna )
// v0.7.6 mod 16  - dostosowanie release'u do wersji 5.x FF


// ENDSOWAMODS

const C_VERSION_STRING = "v0.7.6 mod 16";
// ------------------------ GLOBAL DECLARATIONS ----------------------------
var g_menuitems = new Array();
var g_menuitems_counter = 0;
var g_menugroups = new Array();
var g_menugroups_counter = 0;
var g_sowafeatures = new Array();
var g_sowafeatures_counter = 0;
var g_sowasettings = new Array();
var g_sowasettings_counter = 0;
var g_planets_modified = new Array();
var g_position_input;
var g_input_change_allowed = true;
var g_position_hiddeninputs = new Array();
var g_starting_position = new Array();
var g_max_fleet_speed = 1000;
var g_username = "";
var g_skin;
var g_www = false;
var g_collapse_src = "/skins/ecclite/icons/collapse.gif";
var g_expand_src = "/skins/ecclite/icons/expand.gif";
var g_ship_type = 7;
var g_note_picture = new Array();

var ftpbox_home_spy_actions = document.createElement("div");
var ftpbox_away_spy_actions = document.createElement("div");
var ftpbox_traitor_actions = document.createElement("div");
var ftpbox_spy_resources = document.createElement("div");
var ftpbox_fleet_filter_by_owner = document.createElement("div");
var ftpbox_fleet_filter_by_class = document.createElement("div");

// ---------------------------- CONFIG -------------------------------------
// Set to 0 to disable menu tweak
const C_TWEAK_PLANET_MENUS = 1;
// Set to 0 to disable fleet group tweak
const C_TWEAK_FLEET_GROUPS = 1;
// Set to 0 to disable people list tweak
const C_TWEAK_PEOPLE_LIST = 1;
// Fleet description string: %R-size, %S-contents, %D-commander name
const C_FLEET_DESC_DEFAULT_STRING = "%R %S %D";
const C_OPACITY = 0.7;


const C_GOOD_STATS_THRESHOLD = 20;

const C_SPEED_CALC_MAGNITUDE = 1000;
const C_CURRENT_FIGHTER_SPEED_FACTOR = 45* C_SPEED_CALC_MAGNITUDE/45;


// polish letters in unicode
// l&#x0142; o&oacute; s&#x015B;  z.&#x017C;  e&#x0119;
// L&#x141;  c&#x107;  a&#x0105;  S&#346;



// ------------------------- INTERNAL - DO NOT MODIFY ----------------------

// Menuitems - removable by config panel
MenuItemAdd( "fleets", "Floty", "/fleet/fleet_overview.htm?planetId=", "");
MenuItemAdd( "repair", "Naprawa flot", "/fleet/repair_multiple_fleets.htm?planetId=", "");
MenuItemAdd( "visiting_persons", "Przebywaj&#x0105;cy", "/person/persons_list.htm?planetId=","");
MenuItemAdd( "unemployed", "Bez zaj&#x0119;cia", "/person/persons_list.htm?planetId=","&personTypeId=0");
MenuItemAdd( "home_persons", "Utrzymywani", "/person/persons_list.htm?homePlanetId=", "");
MenuItemAdd( "actions", "Akcje dla pozycji", "/fleet/fleet_action_chooser.jsp?planetId=", "");
MenuItemAdd( "scan", "Skanuj system", "/scanning/planet_scan_system.htm?planetId=", "");
MenuItemAdd( "send_spy", "Zainstaluj szpiega", "spy/new_spy.htm?destinationID=", "");
MenuItemAdd( "notes", "Notatki", "planet/show_planet_notes.htm?planetId=", "");
MenuItemAdd( "calculator", "Wydobycie", "/planet/show_planet_resources_calculation.htm?planetId=", "");
MenuItemAdd( "shipyard", "Stocznia", "/building/shipyard.htm?planetId=", "");
MenuItemAdd( "academy", "Akademia", "/building/university.htm?planetId=", "");
MenuItemAdd( "stock", "Gie&#x0142;da", "/building/market.htm?planetId=", "");
MenuItemAdd( "laboratory", "Laboratorium", "/building/laboratory.htm?planetId=", "");
MenuItemAdd( "defence", "Obrona", "/defense/defense_overview.htm?planetId=", "");
MenuItemAdd( "collector", "Kolektor energii", "/building/energy_collector.htm?planetId=", "");
MenuItemAdd( "admin", "Ustawienia", "/planet/show_planet_settings.htm?planetId=", "");

// MenuGroupAdd( "warnings", "Z ostrze&#x017C;eniami", "/planet/show_planets_overview.htm?filterTypeId=1");
// MenuGroupAdd( "empty_queue", "Z pust&#x0105; kolejk&#x0105;", "/planet/show_planets_overview.htm?filterTypeId=2");
MenuGroupAdd( "low_morale", "Z ujemnym morale", "/planet/show_planets_overview.htm?filterTypeId=3");
MenuGroupAdd( "loosing_resources", "Trac&#x0105;ce surowce", "/planet/show_planets_overview.htm?filterTypeId=4");
MenuGroupAdd( "idle_stock", "Z woln&#x0105; gie&#x0142;d&#x0105;", "/planet/show_planets_overview.htm?filterTypeId=7");
MenuGroupAdd( "empty_warehouse", "Z pustymi magazynami", "/planet/show_planets_overview.htm?filterTypeId=5");
MenuGroupAdd( "full_warehouse", "Z pe&#x0142;nymi magazynami", "/planet/show_planets_overview.htm?filterTypeId=6");
MenuGroupAdd( "academies_only", "Tylko akademie",
    "planet/show_planets_overview.htm?filter=1&nameFilter=akademia&orderType=population");
MenuGroupAdd( "labs_only", "Tylko laboratoria",
    "planet/show_planets_overview.htm?filter=1&nameFilter=laboratorium&orderType=population");

SowaFeatureAdd( "kit", "Niezb&#x0119;dnik");
SowaFeatureAdd( "stats", "Statystyki kadry (CPTweaks)");
SowaFeatureAdd( "adv_filters", "Asystent flotowy");
SowaFeatureAdd( "painted_planet_links", "Dodatkowe kolorowanie stron");
SowaFeatureAdd( "quick_build_links", "Szybkie budowanie");
SowaFeatureAdd( "quick_stock_links", "Szybkie zakupy");
SowaFeatureAdd( "turbo_spies", "Szpiedzy na sterydach");

SowaSettingAdd( "alerts", 2, "W wiadomo&#x015B;ciach", "U g&oacute;ry strony", "", "", "", "", "", "", "", "", "");
SowaSettingAdd( "home_spy_actions", 3, "Ewakuacja", "Przejd&#378; do kontrwywiadu", "Przeprowad&#378; weryfikacj&#281;", "", "", "", "", "", "", "" ,"");
SowaSettingAdd( "away_spy_actions", 11, "Ewakuacja", "Przegl&#x0105;dowy raport", "Przejd&#378; do kontrwywiadu", "Sabotuj gie&#322;d&#x0119;", "Sabotuj magazyny", "Werbowanie", "Sabotuj inst. obronne", "Zbieraj inf. industrialne", "Zbieraj inf. militarne", "Zbieraj inf, naukowe", "Zbieraj inf. personalne");
SowaSettingAdd( "traitor_actions", 3, "Raport szpiegowski", "Status", "Zako&#324;cz wsp&#243;&#322;prac&#281;", "", "", "", "", "", "", "", "");
SowaSettingAdd( "spy_resources", 5, "Minimalne", "Ma&#x0142;e", "Przeci&#x0119;tne", "Wysokie", "Bez ogranicze&#324;", "", "", "", "", "", "");
SowaSettingAdd( "messages", 3, "Usprawnienia wiadomo&#x015B;ci", "Jako dodatkowe przyciski",
"Jako zast&#x0105;pione &#x0142;&#x0105;cza", "", "", "", "", "", "", "", "");

g_note_picture[0] = 'http://static.cosmopulse.net/images/edit.gif';

g_note_picture[1] =
'data:image/gif,GIF89a%12%00%10%00%D5!%00%FF%F7%99%8D%86%3A%DE%C3%94%FD%F8%C0%'+
'D1%C9p%8Cs%08%9Ce%00_%3F%03%D6%A6%18%FF%CF%9C%9C4%08%F7%F7%F7%80T%26%F7'+
'%CF))(!Bq%A5%FF%9E%9C%FF%CF%00JIJ%DE%DB%D6%116W%CE%A6!9m%9C%F7%CF%AD%FF%CF%10'+
'%9Ci%08%CEys%F7%AE%AD%FF%A2%A5%18%1C%18%FF%DB1%F7%E3%E7%BD%BA%B5%FF%FF%FF%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00!%00%2C%00%00%00%00'+
'%12%00%10%00%00%06%83%C0%90pH%14*%14%C5%24%91%B2%81%20%95%C5%C2%E4%F1q%0A%03'+
'%D8l%B6%80)%2C%2C%1Ck%60%40.%0F%0A%9E%C6B%FA%D0(%04c%F39%A2%AE%14%0E%A0%87'+
'%00%0E%E8%F7%0B%11%11%0B%08%08%06w%7B!%01~%00%0C%0Dj%84%06%06%07%88%89%8B'+
'%0C%17%09%90%92%94%95~%12%09%A0%19%9B%02D%8A~%0E%9F%09%A3E%A6%7D%0E%0E%1D%0C'+
'%0C%01%A4%AC%8B%B7%B4I%01%04%BC%BD%BD%B9%ACZ%C2%C0E%7B%C6%C7%9CCA%00%3B';

g_note_picture[2] = 'http://static.cosmopulse.net/skins/ecclite/icons/quest.gif';

// ========================Common/util funcs================================
var coordIDs = new Array("systemXPos", "systemYPos", "systemZPos", "planetXPos", "planetYPos", "planetZPos");
var positionHandEdited = false;

// logger defs
const FA_MENU = 0; const FA_GROUP = 1; const FA_SHIP = 2; const FA_PERSON = 3;
const FA_POS = 4; const FA_PLANET = 5; FA_COMMON = 6;
const DEBUG = 0; const LOG = 1; const WARN = 2; const ERR = 3; const CRIT = 4;
var debugSeverities = new Array (ERR,ERR,ERR,ERR,ERR,ERR,ERR);

function grab_skin() {
    var tags = new Array();
    var c=0;
    var i=0;

    tags = document.getElementsByTagName("script");
    for (i=0; i<tags.length; i++) {
        if (tags[i].text.indexOf("collapse.src = ") > 0) {
            tab = tags[i].text.split("'");
            g_collapse_src = tab[1];
            c = 1;
        }
        if (tags[i].text.indexOf("expand.src = ") > 0) {
            tab = tags[i].text.split("'");
            g_expand_src = tab[3];
            e = 1;
        }
        if ((c > 0) && (e > 0)) return;
    }
}

function CP_Log(p_fa,p_severity,p_log)
{
    var fas = new Array("Menu","Group","Ship","Person","Position","Planet","Common");
    var severityNames = new Array("DEBUG","LOG", "WARN", "ERR", "CRIT");
    if(debugSeverities[p_fa] <= p_severity)
    {
        GM_log(fas[p_fa]+"["+severityNames[p_severity]+"]: "+p_log);
    }
}

function CP_getAttr(name, default_val)
{
  var ret = GM_getValue(g_username+"_"+name, default_val);
  CP_Log(FA_COMMON,DEBUG,"Get name="+name+", default="+default_val
         +", value="+ret);
  return (ret);
}

function CP_setAttr(name,value)
{
  CP_Log(FA_COMMON,DEBUG,"Set name="+name+", value="+value);
  if (value != NaN)
  GM_setValue(g_username+"_"+name, value);
}

function separate_thousands(value)
{
    var toReturn="";  var i = 0;
    while((value / 10) >= 1)
    {
        toReturn = (value%10) + toReturn;
        if ((++i %3) == 0) {toReturn = " " + toReturn;}
        value = Math.floor(value / 10);
    }
    toReturn = value + toReturn ;
    return toReturn;
}

// ===========================Subpage funcs==================================

function enhance_info_screen() {

    if((RegExp("home.htm").test(window.location.href))) {

        var messages = new Array();
        messages = document.getElementById("newsBox");

	var separator = document.createElement("div");
        tekst = '<div id="newsMessageSeparator"></div>'
 	separator.style.height = '15px';
        separator.innerHTML = tekst;

        messages.insertBefore(separator, messages.firstChild);

        var wersja = document.createElement("div");
        var data = new Date();
        tekst = '<div id="newsMessage"><div id="newsMessageHeader"><div id="newsMessageSubject">'
            + 'Kontrola aktualno&#x015B;ci Tweaks&oacute;w</div><div id="newsMessageDate">'
            + data.getFullYear() + '/';
        if(data.getMonth()<9) tekst += '0' + (data.getMonth() + 1) + '/';
        tekst += data.getDate() + ' ' + data.toTimeString().split(":")[0] + ':' + data.toTimeString().split(":")[1]
            + '</div></div><iframe src=\"http://sowa.servebeer.com/cgi-bin/version.cgi?v=' + C_VERSION_STRING + '\"></iframe>';

        wersja.style.height = '97px';
        wersja.innerHTML = tekst;

        messages.insertBefore(wersja, messages.firstChild);
    }
}

function add_building_bar() {
    if((RegExp("planet/show_planet.htm").test(window.location.href))) {
        var val = /planetId=(\d+)/i.exec(window.location.href); 
        var planet_id = +val[1];
 
        var ftpbox_bud = document.createElement("div");
        budowanie = '<div style="position: relative; right: 0px; top: 5px; bottom: 5px; width: 45px;'
            + 'background: #000000; font-size: 9px"><center><B>BUDUJ:</B><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=10&upgrade=true">E_</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=11&upgrade=true">_O</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=12&upgrade=true">M_</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=13&upgrade=true">_K</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=14&upgrade=true">CB</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=35&upgrade=true">CA</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=15&upgrade=true">ST</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=21&upgrade=true">SO</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=20&upgrade=true">LA</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=30&upgrade=true">AK</a><br>'
            + '<span style=\"font-size: 5px\"><br></span>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=16&upgrade=true">KE</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=17&upgrade=true">MO</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=18&upgrade=true">MM</a>|'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=19&upgrade=true">MK</a><br>'
            + '<a href="/planet/do_build_building.htm?planetId='+planet_id+'&buildingTypeId=40&upgrade=true">GI</a>'
            + '</center></div>';
        ftpbox_bud.style.position = 'fixed';
        ftpbox_bud.style.right = '5px';
        ftpbox_bud.style.top = '72px';
        ftpbox_bud.style.height = '124px';
        ftpbox_bud.style.background = '#000000';
        ftpbox_bud.style.opacity = C_OPACITY;
        ftpbox_bud.style.border = '1px solid grey';
        ftpbox_bud.innerHTML = budowanie;
        document.body.insertBefore(ftpbox_bud, document.body.firstChild);
    }
}

function add_procurment_bar() {
    if((RegExp("planet/show_planet.htm").test(window.location.href))
        ||(RegExp("building/market.htm").test(window.location.href))) {
        var val = /planetId=(\d+)/i.exec(window.location.href); 
        var planet_id = +val[1];

        var ftpbox_zak = document.createElement("div");
        zakupy = '<table style="position: relative; right: 0px; top: 0px; bottom: 0px; width: 160px;">'
            + '<tr><td style="font-size: 9px"><center><b>KUP:</b><br>'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=0&ks=1"> E </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=1&ks=1"> O </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=2&ks=1"> M </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=3&ks=1"> K </a>'
            + '</center></td><td width="10"></td><td style="font-size: 9px"><center><b>SPRZEDAJ:</b><br>'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=0&ks=0"> E </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=1&ks=0"> O </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=2&ks=0"> M </a>|'
            + '<a href="/building/market.htm?planetId='+planet_id+'&tow=3&ks=0"> K </a></center>';
        ftpbox_zak.style.position = 'fixed';
        ftpbox_zak.style.right = '5px';
        ftpbox_zak.style.top = '22px';
        ftpbox_zak.style.height = '30px';
        ftpbox_zak.style.background = '#000000';
        ftpbox_zak.style.opacity = C_OPACITY;
        ftpbox_zak.style.border = '1px solid grey';

        if((RegExp("building/market.htm").test(window.location.href)))
        {
            zakupy += '</td></tr><tr><td style="font-size: 9px" colspan="3"><span style=\"font-size: 3px"><br></span>'
                + '<center><a href="javascript:setMaxAmount(); javascript:checkOffer();"> MAX </a>|'
                + '<a href="javascript:placeOffer()"> OK </a>|'
                + '<a href="/planet/show_planet.htm?planetId='+planet_id+'"> <-- </a></center>';
            ftpbox_zak.style.height = '52px';
            ftpbox_zak.style.top = '176px';

            if((RegExp("tow=").test(window.location.href))) {
                var tow = '2';
                towar = +/tow=([\d]+)/i.exec(window.location.href)[1];
                kupsprzedaj = +/ks=([\d]+)/i.exec(window.location.href)[1];
                var resourceTypeCombo = document.getElementsByName("resourceTypeId")[0];
                var directionCombo = document.getElementsByName("direction")[0];
                var amountField = document.getElementsByName("amount")[0];
 
                resourceTypeCombo.selectedIndex = towar;
                directionCombo.selectedIndex = kupsprzedaj;

                var timefor100k = document.getElementsByTagName("span")[6];

                var speed = timeStrToSeconds(timefor100k.textContent);

                var production_per_hour = 360000000 / speed;
                var max_amount = Math.pow(production_per_hour, 1.05260135) * 249;

                amountField.value = Math.round(max_amount);
                location.href = "javascript:void(checkOffer());";  
            } 
        }

        zakupy += '</td></tr></table>';
        ftpbox_zak.innerHTML = zakupy;
        document.body.insertBefore(ftpbox_zak, document.body.firstChild);
    }
}

function ukryj_szp()
{
    szpiegowanie = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"135\"><center>'
        + '<B>OPERUJ&#260;CY U SIEBIE:</B></td><td style="opacity=0.75" width="30">'
        + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';

    ftpbox_home_spy_actions.style.position = 'fixed';
    ftpbox_home_spy_actions.style.right = '473px';
    ftpbox_home_spy_actions.style.top = '22px';
    ftpbox_home_spy_actions.style.height = '15px';
    ftpbox_home_spy_actions.style.width = '175px';
    ftpbox_home_spy_actions.style.background = '#000000';
    ftpbox_home_spy_actions.style.opacity = C_OPACITY;
    ftpbox_home_spy_actions.style.border = '1px solid grey';
    document.body.insertBefore(ftpbox_home_spy_actions, document.body.firstChild);

    ftpbox_home_spy_actions.innerHTML = szpiegowanie;

    szpiegowanie = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"133\"><center>'
        + '<B>OPERUJ&#260;CY U WROGA:</B></td><td style="opacity=0.75" width="30">'
        + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';

    ftpbox_away_spy_actions.style.position = 'fixed';
    ftpbox_away_spy_actions.style.right = '290px';
    ftpbox_away_spy_actions.style.top = '22px';
    ftpbox_away_spy_actions.style.height = '15px';
    ftpbox_away_spy_actions.style.width = '173px';
    ftpbox_away_spy_actions.style.background = '#000000';
    ftpbox_away_spy_actions.style.opacity = C_OPACITY;
    ftpbox_away_spy_actions.style.border = '1px solid grey';
    document.body.insertBefore(ftpbox_away_spy_actions, document.body.firstChild);

    ftpbox_away_spy_actions.innerHTML = szpiegowanie;

    szpiegowanie = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"107\"><center>'
        + '<B>PROWADZ&#260;CY:</B></td><td style="opacity=0.75" width="30">'
        + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';

    ftpbox_traitor_actions.style.position = 'fixed';
    ftpbox_traitor_actions.style.right = '133px';
    ftpbox_traitor_actions.style.top = '22px';
    ftpbox_traitor_actions.style.height = '15px';
    ftpbox_traitor_actions.style.width = '147px';
    ftpbox_traitor_actions.style.background = '#000000';
    ftpbox_traitor_actions.style.opacity = C_OPACITY;
    ftpbox_traitor_actions.style.border = '1px solid grey';
    document.body.insertBefore(ftpbox_traitor_actions, document.body.firstChild);

    ftpbox_traitor_actions.innerHTML = szpiegowanie;

    szpiegowanie = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"78\"><center>'
        + '<B>NAK&#x141;ADY:</B></td><td style="opacity=0.75" width="30">'
        + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';

    ftpbox_spy_resources.style.position = 'fixed';
    ftpbox_spy_resources.style.right = '5px';
    ftpbox_spy_resources.style.top = '22px';
    ftpbox_spy_resources.style.height = '15px';
    ftpbox_spy_resources.style.width = '118px';
    ftpbox_spy_resources.style.background = '#000000';
    ftpbox_spy_resources.style.opacity = C_OPACITY;
    ftpbox_spy_resources.style.border = '1px solid grey';
    document.body.insertBefore(ftpbox_spy_resources, document.body.firstChild);

    ftpbox_spy_resources.innerHTML = szpiegowanie;

    document.images[3].addEventListener('mouseover', function(event) {
        odkryj_szp_home();
    },true);

    document.images[2].addEventListener('mouseover', function(event) {
        odkryj_szp_away();
    },true);

    document.images[1].addEventListener('mouseover', function(event) {
        odkryj_szp_traitor();
    },true);

    document.images[0].addEventListener('mouseover', function(event) {
        odkryj_szp_resources();
    },true);
}

function odkryj_szp_home()
{
    szpiegowanie = '<table border=0>';

    for(i=0; i<g_sowasettings[1].noOfVariants; i++)
    {
        szpiegowanie += '<tr><td><input type=\"radio\" id=\"sowasetting_1-'+i+'\"';

        if(CP_getAttr("sowasetting_1",1)==i) szpiegowanie+=" checked ";

        szpiegowanie += '>'+g_sowasettings[1].Caption[i]+'</td></tr>';
    }
    szpiegowanie += '</td></tr></table>';

    ftpbox_home_spy_actions.style.height = '84px';
    ftpbox_home_spy_actions.innerHTML += szpiegowanie;

    for(i=0; i<g_sowasettings[1].noOfVariants; i++) {
        document.getElementById("sowasetting_1-"+i).addEventListener('click', function(event) {
            update_config_rbutton(event.target);
        },true);
    }
}

function odkryj_szp_away()
{
    szpiegowanie = '<table border=0>';

    for(i=0; i<g_sowasettings[2].noOfVariants; i++)
    {
        szpiegowanie += '<tr><td><input type=\"radio\" id=\"sowasetting_2-'+i+'\"';

        if(CP_getAttr("sowasetting_2",1)==i) szpiegowanie+=" checked ";

        szpiegowanie += '>'+g_sowasettings[2].Caption[i]+'</td></tr>';
    }
    szpiegowanie += '</td></tr></table>';

    ftpbox_away_spy_actions.style.height = '260px';
    ftpbox_away_spy_actions.innerHTML += szpiegowanie;

    for(i=0; i<g_sowasettings[2].noOfVariants; i++) {
        document.getElementById("sowasetting_2-"+i).addEventListener('click', function(event) {
            update_config_rbutton(event.target);
        },true);
    }
}

function odkryj_szp_traitor()
{
    szpiegowanie = '<table border=0>';

    for(i=0; i<g_sowasettings[3].noOfVariants; i++)
    {
        szpiegowanie += '<tr><td><input type=\"radio\" id=\"sowasetting_3-'+i+'\"';

        if(CP_getAttr("sowasetting_3",1)==i) szpiegowanie+=" checked ";

        szpiegowanie += '>'+g_sowasettings[3].Caption[i]+'</td></tr>';
    }
    szpiegowanie += '</td></tr></table>';

    ftpbox_traitor_actions.style.height = '84px';
    ftpbox_traitor_actions.innerHTML += szpiegowanie;

    for(i=0; i<g_sowasettings[3].noOfVariants; i++) {
        document.getElementById("sowasetting_3-"+i).addEventListener('click', function(event) {
            update_config_rbutton(event.target);
        },true);
    }
}

function odkryj_szp_resources()
{
    szpiegowanie = '<table border=0>';

    for(i=0; i<g_sowasettings[4].noOfVariants; i++)
    {
        szpiegowanie += '<tr><td><input type=\"radio\" id=\"sowasetting_4-'+i+'\"';

        if(CP_getAttr("sowasetting_4",1)==i) szpiegowanie+=" checked ";

        szpiegowanie += '>'+g_sowasettings[4].Caption[i]+'</td></tr>';
    }
    szpiegowanie += '</td></tr></table>';

    ftpbox_spy_resources.style.height = '128px';
    ftpbox_spy_resources.innerHTML += szpiegowanie;

    for(i=0; i<g_sowasettings[4].noOfVariants; i++) {
        document.getElementById("sowasetting_4-"+i).addEventListener('click', function(event) {
            update_config_rbutton(event.target);
        },true);
    }
}

function add_spy_settings_bar() 
{
    if((RegExp("spy/spy_list.htm").test(window.location.href)))
    {
        ukryj_szp();

        document.getElementsByClassName("pagesMainBox")[0].addEventListener('click', function(event)
        {
            ukryj_szp();
        }, true);
    }
}

function read_spy_settings()
{
    if((RegExp("spy/spy_action.htm").test(window.location.href))) {
        var akcja_nazwa = "";
        var naklady_nazwa = "";


        var wynik = document.evaluate
            ('/HTML[1]/BODY[1]/FORM[1]/DIV[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[3]/TD[2]/SELECT[1]/OPTION[2]',
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value;

        if (wynik=="COUNTER_ESPIONAGE"){
	    var akcja_nr = CP_getAttr("sowasetting_1",1);
            if(akcja_nr==0){akcja_nazwa = "DEINSTALL";} else
            if(akcja_nr==1){akcja_nazwa = "COUNTER_ESPIONAGE";} else
            if(akcja_nr==2){akcja_nazwa = "VERIFICATION_ESPIONAGE";}
        } else

        if (wynik=="CONTACT_STATUS"){
            var akcja_nr = CP_getAttr("sowasetting_3",0);
            if(akcja_nr==0){akcja_nazwa = "CONTACT_REPORT";} else
            if(akcja_nr==1){akcja_nazwa = "CONTACT_STATUS";} else
            if(akcja_nr==2){akcja_nazwa = "CONTACT_BREAK";}
        } else
		
        if (wynik=="OVERVIEW_REPORT"){
            var akcja_nr = CP_getAttr("sowasetting_2",1);
            if(akcja_nr==0){akcja_nazwa = "DEINSTALL";} else
            if(akcja_nr==1){akcja_nazwa = "OVERVIEW_REPORT";} else
            if(akcja_nr==2){akcja_nazwa = "RECOUNTER_ESPIONAGE";} else
            if(akcja_nr==3){akcja_nazwa = "MARKET_PLACE_SABOTAGE";} else
            if(akcja_nr==6){akcja_nazwa = "MILLITARY_DEFENCE_SABOTAGE";} else
            if(akcja_nr==4){akcja_nazwa = "STORAGES_SABOTAGE";} else
            if(akcja_nr==5){akcja_nazwa = "ENLIST_NEW_SPY";} else
            if(akcja_nr==7){akcja_nazwa = "FAST_INDUSTRIAL_REPORT";} else
            if(akcja_nr==8){akcja_nazwa = "FAST_MILITARY_REPORT";} else
            if(akcja_nr==9){akcja_nazwa = "FAST_SCIENCE_REPORT";} else
            if(akcja_nr==10){akcja_nazwa = "FAST_PRESONNEL_REPORT";} 
        }

        var akcja_wlacz = akcja_nazwa+"\" selected\=\"true";
        do_modify_html_it(window.document,
            document.evaluate('/HTML[1]/BODY[1]/FORM[1]/DIV[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[4]/TD[2]', document,
            null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/selected="true"/,'',null);
        do_modify_html_it(window.document,
            document.evaluate('/HTML[1]/BODY[1]/FORM[1]/DIV[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[3]/TD[2]/SELECT[1]',
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,akcja_nazwa,akcja_wlacz,null);
				
        var naklady_nr = CP_getAttr("sowasetting_4",2);
        if(naklady_nr==0){naklady_nazwa = "MINIMAL";} else
        if(naklady_nr==1){naklady_nazwa = "SMALL";} else
        if(naklady_nr==2){naklady_nazwa = "REGULAR";} else
        if(naklady_nr==3){naklady_nazwa = "HIGH";} else
        if(naklady_nr==4){naklady_nazwa = "UNLIMITED";}

        var naklady_wlacz = naklady_nazwa+"\" selected\=\"true";
        do_modify_html_it(window.document,
            document.evaluate('/HTML[1]/BODY[1]/FORM[1]/DIV[1]/DIV[2]/TABLE[2]/TBODY[1]/TR[4]/TD[2]/SELECT[1]', document,
            null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,naklady_nazwa,naklady_wlacz,null);
    }
}

function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
        node.href = node.href.replace(match_re, replace_string);
    }
}

function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
        var allurls = doc.getElementsByTagName('A');
        for(var i = 0, url; url = allurls[i]; i++)
            modify_single_url(doc, match_re, replace_string, url);
    } else {
            modify_single_url(doc, match_re, replace_string, node);
    }
}

function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
        element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    }
}

function enhance_battles()
{
    if((RegExp("battle/battle_overview.htm").test(window.location.href))) {

        var tables = Array();
        tables = document.getElementsByTagName("table");

        var tags = Array();

        tags = tables[1].getElementsByTagName("a");

        for(i=0; i<tags.length; i++) {
            if(RegExp("Szczeg..y").test(tags[i].innerHTML)) {
                id = tags[i].href.split("?")[1];
                tags[i].parentNode.innerHTML += '<br><a href="/servlet/battle?' + id + '" target="_tab">Eksport</a>';
            }
        }

        if(tables.length>2) {
            tags = tables[tables.length-2].getElementsByTagName("a");

            for(i=0; i<tags.length; i++) {
                id = tags[i].href.split("?")[1];
                tags[i].parentNode.parentNode.innerHTML += '<td><a href="/servlet/battle?' + id + '" target="_tab">'
                    + 'Eksport</a>&nbsp;&nbsp;</td>';
                i++;
            }
        }
    }    
}

function enhance_messages()
{
    if((RegExp("messages/read_message.htm").test(window.location.href))) {
        if (window.document.body.innerHTML.match(/Intensywno..:/)) {

            if(CP_getAttr("sowasetting_5",1)==1) {
                var planet_link = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/A[1]', document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
                var planet_id = planet_link.toString().split("=")[1];

                do_modify_html_it(window.document,
                    document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[2]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<span/,
                    '<span class="actionBarItem"><a href="/building/university.htm?planetId='
                    + planet_id + '" target="_new">Akademia</a></span><span', null);
             } else if(CP_getAttr("sowasetting_5",1)==2) {
                do_modify_url_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/A[1]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,
                    /cosmopulse\.net\/planet\/show_planet\.htm/,'cosmopulse.net/building/university.htm',false);
             }

        } else if(window.document.body.innerHTML.match(/Transakcja/)) {

            if(CP_getAttr("sowasetting_5",1)==1) {
                var planet_link = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/A[1]', document, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
                var planet_id = planet_link.toString().split("=")[1];

                do_modify_html_it(window.document,
                    document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[2]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<span/,
                    '<span class="actionBarItem"><a href="/building/market.htm?planetId='
                    + planet_id + '" target="_new">Gie&#x0142;da</a></span><span', null);
             } else if(CP_getAttr("sowasetting_5",1)==2) {
                do_modify_url_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/A[1]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,
                    /cosmopulse\.net\/planet\/show_planet\.htm/,'cosmopulse.net/building/market.htm',false);
             }

        } else if(window.document.body.innerHTML.match(/Szpieg/, /raport/)) {
            if(CP_getAttr("sowasetting_5",1)==2) {
                do_modify_html_it(window.document,
                    document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[2]',
                    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/<span/,
                    '<span class="actionBarItem"><a href="/spy/spy_list.htm"'
                    + 'target="cp_spy_list_window">Szpiedzy</a></span><span', null);
            }
        }
    }
}

// ===========================Menu funcs==================================

// function MenuItemAdd    Stores particular menus
// @idTarget    fleet, academy, etc
// @itemLabel   Label to display in anchor
// @pageLink    baselink to go to after clicking on anchor
// @options     any other options to add to the address
function MenuItemAdd(idTarget, itemLabel, pageLink, options)
{
  g_menuitems[g_menuitems_counter] = new Object();
  g_menuitems[g_menuitems_counter].idName = idTarget;
  g_menuitems[g_menuitems_counter].Caption = itemLabel;
  g_menuitems[g_menuitems_counter].Address = pageLink;
  g_menuitems[g_menuitems_counter].Options = options;
  g_menuitems_counter++;
}

function MenuGroupAdd(idTarget, itemLabel, pageLink)
{
  g_menugroups[g_menugroups_counter] = new Object();
  g_menugroups[g_menugroups_counter].idName = idTarget;
  g_menugroups[g_menugroups_counter].Caption = itemLabel;
  g_menugroups[g_menugroups_counter].Address = pageLink;
  g_menugroups_counter++;
}

function SowaFeatureAdd(idTarget, itemLabel)
{
  g_sowafeatures[g_sowafeatures_counter] = new Object();
  g_sowafeatures[g_sowafeatures_counter].idName = idTarget;
  g_sowafeatures[g_sowafeatures_counter].Caption = itemLabel;
  g_sowafeatures_counter++;
}

function SowaSettingAdd(idTarget, quantity, itemLabel01, itemLabel02, itemLabel03, itemLabel04, itemLabel05, itemLabel06, itemLabel07, itemLabel08, itemLabel09, itemLabel10, itemLabel11)
{
  g_sowasettings[g_sowasettings_counter] = new Object();
  g_sowasettings[g_sowasettings_counter].idName = idTarget;
  g_sowasettings[g_sowasettings_counter].noOfVariants = quantity;
  g_sowasettings[g_sowasettings_counter].Caption = new Object();
  g_sowasettings[g_sowasettings_counter].Caption[0] = itemLabel01;
  g_sowasettings[g_sowasettings_counter].Caption[1] = itemLabel02;
  g_sowasettings[g_sowasettings_counter].Caption[2] = itemLabel03;
  g_sowasettings[g_sowasettings_counter].Caption[3] = itemLabel04;
  g_sowasettings[g_sowasettings_counter].Caption[4] = itemLabel05;
  g_sowasettings[g_sowasettings_counter].Caption[5] = itemLabel06;
  g_sowasettings[g_sowasettings_counter].Caption[6] = itemLabel07;
  g_sowasettings[g_sowasettings_counter].Caption[7] = itemLabel08;
  g_sowasettings[g_sowasettings_counter].Caption[8] = itemLabel09;
  g_sowasettings[g_sowasettings_counter].Caption[9] = itemLabel10;
  g_sowasettings[g_sowasettings_counter].Caption[10] = itemLabel11;
  g_sowasettings_counter++;
}

// function addMenuItem    Produces string to put into menu
// @planetId    planet id as used in CP
// @menuId      index in menu table
function addMenuItem(planetId, menuId)
{
    var menuItemString =
        "<a class=\"menuItem level4\" target=\"main_panel\" href=\"" + g_menuitems[menuId].Address
        + planetId + g_menuitems[menuId].Options + "\">" + g_menuitems[menuId].Caption + "</a>";

    return menuItemString;
}

function addMenuGroup(menuId)
{
    var menuGroupString =
        "<a class=\"menuItem level2\" target=\"main_panel\" href=\"" + g_menugroups[menuId].Address
        + "\">" + g_menugroups[menuId].Caption + "</a>";

    return menuGroupString;
}

function addMenuItem_new(ifContainer, className, nameBase, targetName, itemLabel) {
    var MIstr = "";

    if(!ifContainer) {
        MIstr += "<a class=\"" + className + "\" href=\"" + nameBase + "\" target=\"" + targetName + "\">"
          + itemLabel + "</a>";
    } else {
        MIstr += "<a onmouseover=\"javascript:showExpandControl(this);\" onmouseout=\"javascript:hideExpandControl(this);\""
          + "class=\"" + className + "\" href=\"javascript:;\" onclick=\"javascript:toggleItem(this);\">"
          + itemLabel + "</a>";
    }
    return MIstr;
}

// function correct_menu    Does fixes on CP menu
function correct_menu_item(masterNode)
{
    if (CP_getAttr("C_TWEAK_PLANET_MENUS",1) == 0 ) return;

    var planet_href = masterNode.nextSibling.nextSibling;
    var planet_id = planet_href.getAttribute("id").split("_")[1];

    if (g_planets_modified[planet_id] != 1)
    {
        CP_Log(FA_MENU,LOG,"-------planet id:------------"+planet_id);
        g_planets_modified[planet_id] = 1;

        var child_div = planet_href.nextSibling.nextSibling;
        child_div.innerHTML = "";
        for (j=0;j<g_menuitems_counter;j++)
        if(CP_getAttr("menuitem_"+j,1)==1)
        {
          child_div.innerHTML += addMenuItem(planet_id,j);
        }
    }
}

function implement_context_menu() {
    var tags = Array();
    tags = document.getElementsByTagName ("a");

    for (i=0;i<tags.length;i++)
    {
        tag_id = tags[i].getAttribute("href");

        if (RegExp("planet/show_planet.htm").test(tag_id))
        {
            var anchor_obj = tags[i].previousSibling.previousSibling;
            anchor_obj.addEventListener('click', function(event) {correct_menu_item(event.target)},true);
        }
    }
}

function correct_menu()
{
    var tags = Array();
    var delimiter = false;

    tags = document.getElementsByTagName ("a");

    for (i=0;i<tags.length;i++)
    {
        tag_id = tags[i].getAttribute("href");

        // planets' colors
        if (RegExp("planetId=").test(tag_id))
        {
            var pid = tag_id.split("=");
            var planet_id = +pid[1];
            var planetNote = CP_getAttr("planetNote"+planet_id,"");
            var menuColor = /\[color=#([0123456789AaBbCcDdEeFf]+)\]/i.exec(planetNote);

            if (menuColor != null)
            {
                tags[i].innerHTML = "<font color=\"#" + menuColor[1] + "\">"
                + tags[i].innerHTML + "</font>";
            }
        }

        // additional filtering
        if ((RegExp("filterTypeId=2").test(tag_id)) && (delimiter == false))
        {
            for (j=0;j<g_menugroups_counter;j++)
                if(CP_getAttr("menugroup_"+j,1)==1)
                {
                    tags[i].parentNode.innerHTML += addMenuGroup(j);
                }
            delimiter == true;

        } else

        // died persons
        if (RegExp("personTypeId=7").test(tag_id))
        {
          tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2',
            '/person/persons_list.htm?personTypeId=8', 'main_panel', 'Polegli w bitwie'); 
        } else

        // shoutbox sojuszowy w osobnej karcie
        if (RegExp("alliance_shoutbox.htm").test(tag_id))
        {
          if(RegExp("Sojuszu").test(tags[i].innerHTML))
          {
            tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2',
              '/shoutbox/show_shoutbox.htm?allianceId=502', '_tab', 'Sojuszu (w karcie)');
          }
        } else

	// niezbednik SOWY
        if (( RegExp("forum").test(tag_id) && (CP_getAttr("sowafeature_0",1)==1)))
        {
		// tu linki do naszego forum
        } else

        // tweaks menu
        if (RegExp("rules.htm").test(tag_id))
        {
          tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2', 'rules.htm?action=cptweaks_config',
            'main_panel', 'Centrum skrypt&oacute;w'); break;
        } 
    }
}

// =========================NOTES HANDLING================================
function removeTags(sourceNote)
{
  var tags = new Array( /\[color=#([0123456789AaBbCcDdEeFf]+)\]/
                      , /\[-\]/
                      );
  for (tag_iter=0;tag_iter<tags.length;tag_iter++)
    sourceNote = sourceNote.replace(tags[tag_iter], "");
  return sourceNote;
}

function handleNoteClick(name, imgTxt)
{
        newNote = prompt("Notatka",CP_getAttr(name,""));
        CP_setAttr(name,newNote);
        document.getElementById("NoteDiv"+name).innerHTML =
              imgTxt + removeTags(newNote);
  document.getElementById("Img"+name).addEventListener('click',
     function(event){handleNoteClick(name, imgTxt)},true);
}

function addNote(inElement, name)
{
  var imgTxt = "<img style=\"margin-right:5px; margin-bottom:-3px\" id=\"Img" + name + "\" src=\"";
  imgTxt += g_note_picture[CP_getAttr("sowasetting_6",1)];
  imgTxt+= "\">";
  var spanTxt = "<span id=\"NoteDiv"+name+"\"";

  if(RegExp("person/persons_list").test(window.location.href))
  {
      spanTxt += "style=\"margin-left:20px\"";
  }

  spanTxt += ">" + imgTxt + "<font color=\"yellow\">" + removeTags(CP_getAttr(name,"")) + "</font></span>";

  inElement.innerHTML += spanTxt;
  document.getElementById("Img"+name).addEventListener('click',
      function(event){handleNoteClick(name, imgTxt)},true);
}

// ===========================Ship funcs==================================

// ship types
const SHIP_FIGHTER           = 0; const SHIP_CORVETTE          = 1;
const SHIP_DESTROYER         = 2; const SHIP_CRUISER           = 3;
const SHIP_LINE_CRUISER      = 4; const SHIP_POCKET_BATTLESHIP = 5;
const SHIP_BATTLESHIP        = 6; const SHIP_LPG               = 7;
const SHIP_TRANSPORT         = 8; const SHIP_COLONIZER         = 9;
const SHIP_PASSENGER        = 10; const SHIP_MAX              = 11;
var shipTypes = new Array ();

function add_ship_type(id,guns,firepower,armor,storage,speed,accel,max_speed,size,name)
{
    shipTypes[id] = new Object();
    shipTypes[id].Guns      = guns;
    shipTypes[id].Firepower = firepower;
    shipTypes[id].Armor     = armor;
    shipTypes[id].Storage   = storage;
    shipTypes[id].baseSpeed = speed;
    shipTypes[id].accel     = accel;
    shipTypes[id].maxSpeed  = max_speed;
    shipTypes[id].Size      = size;
    shipTypes[id].Name      = name;
}

function configure_ship_types()
{
    add_ship_type(SHIP_FIGHTER,1,400,1000,0,25,15,40,1,"Mysliwiec");
    add_ship_type(SHIP_CORVETTE,2,3200,2000,0,15,6,40,4,"Korweta")
    add_ship_type(SHIP_DESTROYER,6,4000,5000,0,10,2.5,40,8,"Niszczyciel");
    add_ship_type(SHIP_CRUISER,8,16000,40000,0,8,2,40,37,"Krazownik");
    add_ship_type(SHIP_LINE_CRUISER,12,26400,80000,0,6,1.5,40,60,"Krazownik Liniowy");
    add_ship_type(SHIP_POCKET_BATTLESHIP,16,40000,140000,0,6,1.5,40,60,"Pancernik Kieszonkowy");
    add_ship_type(SHIP_BATTLESHIP,18,45000,160000,0,4,1,40,100,"Pancernik");
    add_ship_type(SHIP_LPG,1,1000,1000,0,10,2,40,8,"Desantowiec");
    add_ship_type(SHIP_TRANSPORT,0,0,500,5000,10,2,20,4,"Transportowiec");
    add_ship_type(SHIP_COLONIZER,0,0,25000,0,5,1,20,20,"Kolonizator");
    add_ship_type(SHIP_PASSENGER,0,0,1000,0,8,2.5,30,10,"Pasazerski");
    add_ship_type(SHIP_MAX,0,0,0,0,0,0,"");  // stub element to useful in calculations
}

function tmout_mark_nonful_fleets (source)
{
  var tags = Array();
  tags = source.getElementsByTagName("tr");
  // CP_Log(FA_GROUP,LOG,"Rows:"+tags.length);
  if(tags.length >0)
  {
    for (var i=2; i<tags.length; i++)
    {
      var cellsInRow = tags[i].cells.length;
      for (var j=2; j<cellsInRow; j++)
         //GM_log("===i:"+i+"---j:"+j+"=== |"+ tags[i].cells[j].innerHTML+"|");

         if ((cellsInRow > 2))//&&(/N/(tags[i].cells[0].innerHTML)))
         {
            var sizeCell = tags[i].cells[2];
            // CP_Log(FA_GROUP,DEBUG,"SizeCell content:"+sizeCell.innerHTML);
            var sizes = /(\d+)\s\/\s(\d+)/i.exec(sizeCell.innerHTML);
            if ((+sizes[1]) < (+sizes[2]))
            {
              CP_Log(FA_GROUP,LOG,"Size cell:"+sizeCell.innerHTML);
              var outString = sizeCell.innerHTML.
                replace(/(\d+)\s\/\s(\d+)/, "<font color=\"yellow\">$&</font>");
                sizeCell.innerHTML = outString;
               CP_Log(FA_GROUP,LOG,"Replaced:"+outString);
            }
         }
    }
  } else {window.setTimeout(function(){tmout_mark_nonful_fleets(source)}, 100);}
}

function mark_fleets(source)
{
  window.setTimeout(function(){tmout_mark_nonful_fleets(source)}, 100);
  if(CP_getAttr("sowafeature_2",1)==1) window.setTimeout(function(){tmout_apply_fleet_filter(source)}, 100);
}

function tmout_apply_fleet_filter(source)
{
     var floty = new Array();
     var wlasciciele = new Array();
     var wlasciciele_pojedynczy = new Array();
     var liczebnosci = new Array();
     var linki = new Array();
     var id_gracza = 0;
     var razem = 0;
     var max_dlugosc = 0;

     floty = source.getElementsByTagName("tr");

     if((floty.length > 0) || (RegExp("show_ready_to_add_fleets").test(window.location.href)))
     {
         floty = document.body.getElementsByTagName("input");

         for(i=0; i<floty.length; i++)
         {
              // budowa listy
              if(floty[i].type == "checkbox")
              {
                   linki = floty[i].parentNode.parentNode.getElementsByTagName("a");
                   wlasciciele[i] =  linki[linki.length - 1].innerHTML;

                   // usuwanie spacji
                   wlasciciele[i] = wlasciciele[i].replace(/^\s+|\s+$/g, '');

                   if((i>0) && (wlasciciele[i-1] != wlasciciele[i])) {

                       id_gracza += 1;
                       wlasciciele_pojedynczy[id_gracza] = wlasciciele[i];
                       if(wlasciciele[i].length > max_dlugosc) max_dlugosc = wlasciciele[i].length;
                   }

                   if(liczebnosci[id_gracza] != parseInt(liczebnosci[id_gracza])) liczebnosci[id_gracza] = 0;

                   liczebnosci[id_gracza] += 1;
                   razem++;
              }
         }

         ukryj_afl(window.location.href, id_gracza, wlasciciele_pojedynczy, liczebnosci, razem, max_dlugosc);

         document.getElementsByClassName("pagesMainBox")[0].addEventListener('click', function(event)
         {
             ukryj_afl(window.location.href, id_gracza, wlasciciele_pojedynczy, liczebnosci, razem, max_dlugosc);
         }, true);

     } else {

         window.setTimeout(function(){tmout_apply_fleet_filter(source)}, 100);
     }
}

function update_selection(liczba_graczy, obj)
{
    if(obj.id == "wszyscy")
    {
        for (i=1; i<=liczba_graczy; i++) {
            document.getElementById("gracz_" + i).checked = document.getElementById("wszyscy").checked;
        }
    }
    else
    {
        g_ship_type = parseInt(obj.id.split("_")[1]);

        for (i=0; i<8; i++)
        {
            if(i != g_ship_type) document.getElementById("kadlub_" + i).checked = false;
        }
    }
}

function reverse_selection(liczba_graczy)
{
    for (i=1; i<=liczba_graczy; i++)
    {
        document.getElementById("gracz_" + i).checked = !document.getElementById("gracz_" + i).checked;
    }

    wszyscy = document.getElementById("wszyscy");

    if(wszyscy != null) 
    {
        wszyscy.checked = !wszyscy.checked;
    }
}

function select_fleets(liczba_graczy, obj)
{
    var warships = Array(/Pancernik/, /Kr..ownik liniowy/, /Kr..ownik/, /Niszczyciel/, /Korweta/, /My.liwiec/);
    var civilian_ships = Array(/Desantowiec/, /Statek/);
    var floty = new Array();
    var linki = new Array();
    var id_gracza = 0;
    var wlasciciel = "";
    var fraza = "";
    var nr_floty_ogolem = 0;
    var liczba_flot = 0;
    var id_start = liczba_graczy + 1;
    
    if(liczba_graczy > 1) id_start++;

    floty = document.getElementsByTagName("input");

    for(i=id_start; i<floty.length; i++)
    {
        if((floty[i].type == "checkbox") && (!RegExp("gracz").test(floty[i].id)) && (floty[i].id != "wszyscy"))
        {
            linki = floty[i].parentNode.parentNode.getElementsByTagName("a");
            fraza = linki[linki.length - 1].innerHTML;
            fraza = fraza.replace(/^\s+|\s+$/g, '');

            var zaznaczac = false;

            if(fraza != wlasciciel) {

                wlasciciel = fraza;
                id_gracza += 1;
                nr_floty = 0;
            
                if(obj.id != "wszyscy") {
                    liczba_flot = document.getElementsByTagName("select")[id_gracza-1].value;
                } else {
                    liczba_flot = document.getElementsByTagName("select")[liczba_graczy].value;
                } 
            }

            if(((RegExp(obj.nextSibling.nodeValue).test(wlasciciel)) && (nr_floty < liczba_flot))
                || ((obj.id == "wszyscy") && (nr_floty_ogolem < liczba_flot)))
            {
               var search_string = floty[i].parentNode.parentNode.nextSibling.nextSibling.textContent;

                if(g_ship_type == 6)
                {
                    for(j=0; j<civilian_ships.length; j++)
                    {
                        if(RegExp(civilian_ships[j]).test(search_string))
                        {
                            zaznaczac = true;
                        }
                    }
                }
                else if(g_ship_type < 6)
                {
                    for(j=0; j<=g_ship_type; j++)
                    {
                        if(RegExp(warships[j]).test(search_string))
                        {
                            zaznaczac = true;
                        }
                    }

                    for(j=0; j<civilian_ships.length; j++)
                    {
                        if(RegExp(civilian_ships[j]).test(search_string))
                        {
                            zaznaczac = false;
                        }
                    }
                }
                else zaznaczac = true;

                if(zaznaczac)
                {
                    floty[i].checked = obj.checked;
                    nr_floty++;
                    nr_floty_ogolem++;
                }
            }
        }
    }        
}

function ukryj_afl(location, liczba_graczy, wlasciciele_pojedynczy, liczebnosci, razem, max_dlugosc)
{
    var szerokosc = max_dlugosc * 6.5 + 100;
    if(szerokosc < 190) szerokosc = 190;

    var naglowek_owner = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"160\"><center>'
        + '<B>FILTRUJ WG W&#321;A&#346;CICIELA</B></td><td style="opacity=0.75" width="30">'
        + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';
    
    ftpbox_fleet_filter_by_owner.style.position = 'fixed';
    ftpbox_fleet_filter_by_owner.style.right = '195px';
    ftpbox_fleet_filter_by_owner.style.top = '22px';
    ftpbox_fleet_filter_by_owner.style.height = '15px';
    ftpbox_fleet_filter_by_owner.style.width = szerokosc + 'px';
    ftpbox_fleet_filter_by_owner.style.background = '#000000';
    ftpbox_fleet_filter_by_owner.style.opacity = C_OPACITY;
    ftpbox_fleet_filter_by_owner.style.border = '1px solid grey';
    document.body.insertBefore(ftpbox_fleet_filter_by_owner, document.body.firstChild);

    ftpbox_fleet_filter_by_owner.innerHTML = naglowek_owner;

    if(RegExp("show_ready_to_add_fleets").test(location))
    {
        ftpbox_fleet_filter_by_owner.style.right = '5px';
    } 
    else
    {
        var naglowek_class = '<table class="invisible"><tr><td style=\"font-size: 9px\" width=\"150\"><center>'
            + '<B>FILTRUJ WG KAD&#321;UBA</B></td><td style="opacity=0.75" width="30">'
            + '<img src="http://87.98.168.118/skins/ecclite/icons/dropdown.gif" border="0"></td></tr></table>';
    
        ftpbox_fleet_filter_by_class.style.position = 'fixed';
        ftpbox_fleet_filter_by_class.style.right = '5px';
        ftpbox_fleet_filter_by_class.style.top = '22px';
        ftpbox_fleet_filter_by_class.style.height = '15px';
        ftpbox_fleet_filter_by_class.style.width = '180px';
        ftpbox_fleet_filter_by_class.style.background = '#000000';
        ftpbox_fleet_filter_by_class.style.opacity = C_OPACITY;
        ftpbox_fleet_filter_by_class.style.border = '1px solid grey';
        document.body.insertBefore(ftpbox_fleet_filter_by_class, document.body.firstChild);

        ftpbox_fleet_filter_by_class.innerHTML = naglowek_class;
    }

    if(RegExp("show_ready_to_add_fleets").test(location))
    {
        document.images[0].addEventListener('mouseover', function(event) {
            odkryj_afl_owner(liczba_graczy, wlasciciele_pojedynczy, liczebnosci, razem, szerokosc);
        },true);
    }
    else
    {
        document.images[0].addEventListener('mouseover', function(event) {
            odkryj_afl_class(liczba_graczy);
        },true);

        document.images[1].addEventListener('mouseover', function(event) {
            odkryj_afl_owner(liczba_graczy, wlasciciele_pojedynczy, liczebnosci, razem, szerokosc);
        },true);
    }
}

function odkryj_afl_class(liczba_graczy)
{
    var lista = '<table border=0><tr><td><input type=\"radio\" id=\"kadlub_0\">Pancerniki</input></td>'
        + '<td><input type=\"radio\" id=\"kadlub_1\">Linijki+</input></td></tr>'
        + '<tr><td><input type=\"radio\" id=\"kadlub_2\">Kr&#x0105;&#x017C;ki+</input></td>'
        + '<td><input type=\"radio\" id=\"kadlub_3\">Niszczarki+</input></td></tr>'
        + '<tr><td><input type=\"radio\" id=\"kadlub_4\">Korwety+</input></td>'
        + '<td><input type=\"radio\" id=\"kadlub_5\">My&#x015B;liwce+</input></td></tr>'
        + '<tr><td colspan=2><input type=\"radio\" id=\"kadlub_6\">Ze statkami cywilnymi</input></td></tr>'
        + '<tr><td colspan=2><input type=\"radio\" id=\"kadlub_7\" checked>'
        + '<font color =\"yellow\">Wszystkie dost&#x0119;pne</font></td></tr></table>';
 
    ftpbox_fleet_filter_by_class.style.height = '128px';
    ftpbox_fleet_filter_by_class.innerHTML += lista;

    for(i=0; i<8; i++)
    {
        document.getElementById("kadlub_" + i).addEventListener('click', function(event)
        {
            update_selection(liczba_graczy, event.target);
        }, true);
    }
}

function odkryj_afl_owner(liczba_graczy, wlasciciele_pojedynczy, liczebnosci, razem, szerokosc)
{
    var lista = '<table border=0>';
    var wysokosc = liczba_graczy * 24 + 35;

    if(liczba_graczy > 1) wysokosc += 24;

    for(i=1; i<=liczba_graczy; i++) {

        lista += '<tr><td width="' + (szerokosc - 50) + '"><input type=\"checkbox\" id=\"gracz_' + i
            + '\" checked>' + wlasciciele_pojedynczy[i]
            + '<td><td align="right"><select name=\"floty_gracza_' + i + '\" size="1">';

        for(j=1; j<=liczebnosci[i]; j++) lista += '<option value="' + j + '\">' + j + '</option>'; 
        lista += '</select></td></tr>';
    }

    if(liczba_graczy > 1) {
        lista += '<tr><td><input type=\"checkbox\" id=\"wszyscy\" checked><font color=\"yellow\">Wszyscy</font>'
              + '<td><td align="right"><select name=\"floty_wszystkich\" size="1">';
        for(i=1; i<=razem; i++) lista += '<option value="' + i + '\">' + i + '</option>';
    }

    lista += '</select></td></tr></table><center>'
        + '<a href="javascript:invertSelection(document.fleet_group_details_form);" id="odwracanie">'
        + 'odwr&oacute;&#x107; zaznaczenie</a></center>';

    ftpbox_fleet_filter_by_owner.style.height = wysokosc + 'px';
    ftpbox_fleet_filter_by_owner.innerHTML += lista;
  
    document.getElementById("odwracanie").addEventListener('click', function(event)
    {
        reverse_selection(liczba_graczy);
    }, true);

    for(i=0; i<liczba_graczy; i++)
    {
        document.getElementsByTagName("select")[i].value = liczebnosci[i+1];
        document.getElementById("gracz_" + (i+1)).addEventListener('click', function(event)
        {
            select_fleets(liczba_graczy, event.target);
        }, true);
    }

    if(liczba_graczy > 1) 
    {
        document.getElementsByTagName("select")[liczba_graczy].value = razem;
        document.getElementById("wszyscy").addEventListener('click', function(event)
        {
            select_fleets(liczba_graczy, event.target);
            update_selection(liczba_graczy, event.target);
        }, true);
    }

}

// function correct_fleet_group    Does fixes on CP fleet group
function correct_fleet_group()
{
    var tables = Array();
    var ships = Array();
    var ship_names = Array(/My.liwiec\n(\d+)/,/Korweta\n(\d+)/,/Niszczyciel\n(\d+)/
                          ,/Kr..ownik liniowy\n(\d+)/,/Kr..ownik\n(\d+)/
                          ,/kieszonkowy\n(\d+)/,/Pancernik\n(\d+)/,/Desantowiec\n(\d+)/
                          ,/Statek transportowy\n(\d+)/,/Statek kolonizacyjny\n(\d+)/, /Statek pasa.erski\n(\d+)/);
    var tmp = Array();
    var max_size = 0;
    var ships_quantity = 0;

    for (i=0; i<SHIP_MAX; i++) {ships[i]=0;}
    configure_ship_types();

    tables = document.getElementsByTagName("table");

    // CP_Log(FA_GROUP,LOG,"Tables:"+tables.length);
    // CP_Log(FA_GROUP,LOG,"Table 4 content:"+tables[4].innerHTML);

    for (i=0; i<SHIP_MAX; i++)
    {
      tmp = tables[1].textContent.match(ship_names[i]);
      if (tmp != null)
      {
         // CP_Log(FA_GROUP,LOG,shipTypes[i].Name+" : "+ +tmp[1]);
         ships[i] = +tmp[1];
         max_size += ships[i] * shipTypes[i].Size;
         ships_quantity += parseInt(tmp[1]);
      }
    }

    var fleet_expander = document.getElementById("expand_fleets_list");

    if (fleet_expander != null)
    {
        if (!fleet_expander.style)
        {
            fleet_expander.addEventListener('click', function(event)
            {
                mark_fleets(document.getElementById("group_members_details"))
            },true);
        }
        else // the list is already expanded
        {
            mark_fleets(document.getElementById("group_members_details"));
        }
    }

    if (max_size > 0)
    {
        //now some stats
        for (i=0; i<SHIP_MAX; i++)
        {
            shipTypes[SHIP_MAX].Guns      += shipTypes[i].Guns     *ships[i];
            shipTypes[SHIP_MAX].Firepower += shipTypes[i].Firepower*ships[i];
            shipTypes[SHIP_MAX].Armor     += shipTypes[i].Armor    *ships[i];
        }
       
	tab = tables[1].getElementsByTagName("tr");
	tab[0].innerHTML += '<th class="headerCell">Statystyki</th>';
	tab[1].innerHTML += '<td class="contentCell">Liczba dzia&#x0142;: '
            + separate_thousands(shipTypes[SHIP_MAX].Guns) + '</td>';
        var sila_ognia_1 = '<td class="contentCell">Si&#x0142;a ognia: '
            + separate_thousands(shipTypes[SHIP_MAX].Firepower);
        var sila_ognia_2 = separate_thousands(Math.round(shipTypes[SHIP_MAX].Firepower/ships_quantity));
        var pancerz_1 = '<td class="contentCell">Pancerz: '
            + separate_thousands(shipTypes[SHIP_MAX].Armor);
        var pancerz_2 = separate_thousands(Math.round(shipTypes[SHIP_MAX].Armor/ships_quantity));

        if(tab.length > 9)
        {
            tab[3].innerHTML += sila_ognia_1 + '</td>';
            tab[5].innerHTML += '<td class="contentCell">Przeci&#x0119;tna si&#x0142;a ognia: ' + sila_ognia_2 + '</td>';
            tab[7].innerHTML += pancerz_1 + '</td>';
            tab[9].innerHTML += '<td class="contentCell">Przeci&#x0119;tny pancerz: ' + pancerz_2 + '</td>';
            for(i=11; i<tab.length-2; i++) tab[i].innerHTML += '<td class="contentCell"></td>';
        }
        else if(tab.length > 5)
        {
            tab[3].innerHTML += sila_ognia_1 + ' (przeci&#x0119;tnie: ' + sila_ognia_2 + ')</td>';
            tab[5].innerHTML += pancerz_1 + ' (przeci&#x0119;tnie: ' + pancerz_2 + ')</td>';
        }
        else
        {
            tab[3].innerHTML += sila_ognia_1 + ' (przeci&#x0119;tnie: ' + sila_ognia_2 + ')</td>';
            tab[4].innerHTML += '<td colspan=4></td>' + pancerz_1 + ' (przeci&#x0119;tnie: ' + pancerz_2 + ')</td>';
        }    
    }
}

function prepare_name_string(SelectedOfficerID, fleetComanderString, ships)
{
  var fleetContentsString = "";
  var fleetSizeString = "";
  var shipAcronyms = new Array("M","k","N","Kr","KL","PK","P","D","T","Kol", "SP");
  var fleetSize = 0;
  var nameParts = fleetComanderString.split(" ");
  var AcronymName="";

  for (i = 0; i < nameParts.length -2;i++) AcronymName += nameParts[i][0];
  AcronymName += nameParts[nameParts.length - 2];
  CP_Log(FA_SHIP,DEBUG,"Commander name parts:"+nameParts+"|Acronym:"+AcronymName);
  for (i = SHIP_MAX - 1; i>=0 ;i--)
  {
    if(ships[i]>0)
    {
      fleetContentsString += (ships[i]+shipAcronyms[i])+ " ";
      fleetSize += shipTypes[i].Size*ships[i];
    }
  }
  fleetSizeString = fleetSize;
  if (fleetSize < 100) fleetSizeString = "0" + fleetSizeString;
  if (fleetSize < 10 ) fleetSizeString = "0" + fleetSizeString;
  CP_Log(FA_SHIP,DEBUG,"Ships: "+ships+", string: "+fleetContentsString);

      var key = "Officer_" + SelectedOfficerID +"_ot";
      var value_ot = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_dt";
      var value_dt = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_me";
      var value_me = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_ls";
      var value_ls = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_fs";
      var value_fs = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_dm";
      var value_dm = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_sa";
      var value_sa = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_d";
      var value_d = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_br";
      var value_br = CP_getAttr(key,"?");


  var fleetDescriptionString = CP_getAttr( "C_FLEET_DESC_STRING"
                                         , C_FLEET_DESC_DEFAULT_STRING);
  CP_Log(FA_SHIP,DEBUG,"fleetDescriptionString:"+fleetDescriptionString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%R/, fleetSizeString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%S/, fleetContentsString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%D/, fleetComanderString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%a/, AcronymName);
    fleetDescriptionString  = fleetDescriptionString.replace(/%d/, AcronymName);

    fleetDescriptionString  = fleetDescriptionString.replace(/%G/, value_ot);
    fleetDescriptionString  = fleetDescriptionString.replace(/%H/, value_dt);
    fleetDescriptionString  = fleetDescriptionString.replace(/%I/, value_me);
    fleetDescriptionString  = fleetDescriptionString.replace(/%J/, value_ls);

    fleetDescriptionString  = fleetDescriptionString.replace(/%A/, value_fs);
    fleetDescriptionString  = fleetDescriptionString.replace(/%B/, value_dm);
    fleetDescriptionString  = fleetDescriptionString.replace(/%C/, value_sa);
    fleetDescriptionString  = fleetDescriptionString.replace(/%E/, value_d);
    fleetDescriptionString  = fleetDescriptionString.replace(/%F/, value_br);
  return fleetDescriptionString;
}


// update name upon flet creation
function update_name(event)
{
  event.stopPropagation();
  event.preventDefault();
  var ships = Array(); var i = 0;
  var fleetComanderString = "";
  var FleetNameBox = document.getElementsByName("targetFleetName")[0];
  var CPShips2TweakShips = new Array(
  SHIP_FIGHTER, SHIP_COLONIZER, SHIP_CORVETTE, SHIP_DESTROYER, SHIP_CRUISER,
  SHIP_LINE_CRUISER, SHIP_BATTLESHIP, SHIP_TRANSPORT, SHIP_LPG, SHIP_POCKET_BATTLESHIP, SHIP_PASSENGER);
  for (i = 1; i <= SHIP_MAX; i++)
  {
    var tagId = "targetFleetMembersElement_"+i;
    var transferred_ships = document.getElementById(tagId);
    //CP_Log(FA_SHIP,DEBUG,"td("+tagId+"): "+transferred_ships);
    ships[CPShips2TweakShips[i-1]] = +transferred_ships.innerHTML;
  }
  var OfficerCombo = document.getElementsByName("targetOfficerId")[1];
  CP_Log(FA_SHIP,DEBUG,"Officer Combo content:" + OfficerCombo.innerHTML);
  
  var SelectedOfficerID = OfficerCombo.value;
  //OfficerCombo.getAttribute("value");
  
  var Officers = OfficerCombo.getElementsByTagName("option");
  //if (SelectedOfficerID >0)
  //{
    for (i=0; i<Officers.length;i++)
      if (Officers[i].getAttribute("selected") != null) break;
    if (i<Officers.length)
      fleetComanderString = Officers[i].innerHTML;
//}


  CP_Log(FA_SHIP,DEBUG,"Officer ID: "+SelectedOfficerID+", name: "+fleetComanderString
          +", combo value: "+OfficerCombo.getAttribute("value")
          +", officer selected" +Officers[i].getAttribute("selected"));

  var fleetDescriptionString = prepare_name_string(SelectedOfficerID, fleetComanderString,  ships);
  
  CP_Log(FA_SHIP,DEBUG,"fleetDescriptionString:"+fleetDescriptionString);
  FleetNameBox = document.getElementsByName("targetFleetName")[1];
  FleetNameBox.setAttribute("value",fleetDescriptionString);
  FleetNameBox.value = fleetDescriptionString;
}

function enhance_fleet_transfer()
{

  CP_Log(FA_SHIP,DEBUG,"enhance_fleet_transfer():Hacking into the UI");
  var setNameAnchor = document.createElement('a');
  setNameAnchor.innerHTML = "Ustaw nazw&#x0119;";
  setNameAnchor.setAttribute("href","");
  var FleetNameBox = document.getElementsByName("targetFleetName")[1];
  //CP_Log(FA_SHIP,DEBUG,"input node's parent : "+ FleetNameBox.parentNode.innerHTML);
  FleetNameBox.parentNode.insertBefore(setNameAnchor, FleetNameBox.nextSibling);
  setNameAnchor.addEventListener('click',update_name,true);
  configure_ship_types();
}

// ===========================Position funcs==================================
function getTgtPositionValues()
{
  var ret = new Array();
  for (i= 0; i < g_position_hiddeninputs.length; i++)
  {
     ret[i] = g_position_hiddeninputs[i].getAttribute("value");
  }
  return ret;
}

function positionsToDistance(pos1,pos2)
{
  var ret = new Array();
  for (i=0;i<6;i++)pos1[i]-=pos2[i];
  ret[0] = Math.round(Math.sqrt(pos1[0]*pos1[0]+pos1[1]*pos1[1]+pos1[2]*pos1[2]));
  ret[1] = Math.round(Math.sqrt(pos1[3]*pos1[3]+pos1[4]*pos1[4]+pos1[5]*pos1[5]));
  return ret;
}

function textToPos(posToken)
{
    var startIndex = posToken.indexOf("[", 0);
    if (startIndex < 0) {
        return;
    }

    var endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[0].setAttribute("value",posToken.substring(startIndex + 1, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[1].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf("]", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[2].setAttribute("value",posToken.substring(startIndex, endIndex));

    if (posToken.indexOf(":[", endIndex) <= endIndex){
        return;
    }

    startIndex = endIndex + 3;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[3].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[4].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf("]", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[5].setAttribute("value",posToken.substring(startIndex, endIndex));
    GM_log("Position parsing successful!");
}

function secondsToTimeStr(inTime)
{
  var time = inTime;
  var sec = time%60; time = Math.floor(time/60);
  var mins = time%60; time = Math.floor(time/60);
  var hrs = time %24;
  var days = Math.floor(time/24);
  var retStr = "";
  if (days>0)retStr+= days+"d ";
  if (hrs>0)retStr+= hrs+"h ";
  if (mins>0)retStr+= mins+"m ";
  if (sec>0)retStr+= sec+"s ";
  return retStr;
}

function timeStrToSeconds(inStr)
{
  CP_Log(FA_POS,LOG,"Got to translate:"+inStr);
  var retVal = 0;
  var val = Array();
  if (inStr.match(/(\d+)d/))
    retVal += +(/(\d+)d/i.exec(inStr))[1] * 60 * 60 * 24;
  if (inStr.match(/(\d+)h/))
    retVal += +(/(\d+)h/i.exec(inStr))[1] * 60 * 60;
  if (inStr.match(/(\d+)m/))
    retVal += +(/(\d+)m/i.exec(inStr))[1] * 60;
  if (inStr.match(/(\d+)s/))
    retVal += +(/(\d+)s/i.exec(inStr))[1];
  CP_Log(FA_POS,LOG,"Calculated:"+retVal);
  return retVal;
}

function update_distance()
{
  var tgtPos = new Array();
  tgtPos = getTgtPositionValues();
  // CP_Log(FA_POS,LOG,"tgtPos:"+tgtPos+", g_starting_position:"+g_starting_position);
  var tgtDist = new Array();
  tgtDist = positionsToDistance(tgtPos,g_starting_position);
  // CP_Log(FA_POS,LOG,"tgtDist:"+tgtDist);
  var distStr = "&nbsp;&nbsp;Odleg&#x0142;o&#x015B;&#x107;: ";
  if ((tgtDist[0] > 0))
  {
    distStr += tgtDist[0] + " ly";
    // var tgtTime = Math.ceil((tgtDist[0]*3600) / g_max_fleet_speed + 2 * 3600 + 5 * 60);
    // if (tgtTime > 6*30*24*3600) tgtTime = 6*30*24*3600;
    // CP_Log(FA_POS,LOG,"tgtTime:"+tgtTime);
    // CP_setAttr("C_LAST_CALCULATED_TIME",tgtTime);
    // distStr += "<br>Czas ok.: " + secondsToTimeStr(tgtTime);
    
  }
  else
  {
    distStr += tgtDist[1] + " au";
    // CP_setAttr("C_LAST_CALCULATED_TIME",-1);
  }

  var distDiv = document.getElementById("target_distance");
  distDiv.innerHTML = distStr;
}

function setup_target_position()
{
   CP_Log(FA_POS,LOG,"setup_target_position!");
   positionHandEdited = true;
   var pos = new String();
   pos = document.getElementById("posDetails").getAttribute("value");
   pos = document.getElementById("posDetails").value;
   CP_Log(FA_POS,LOG,"Pos1:"+pos);
   textToPos(pos);
   update_distance();
}

function tgt_bookmark_changed()
{
    CP_Log(FA_POS,LOG,"target_bookmark_changed!");
    positions = new String("");
    prefixes = new Array("[",",",",","]:[",",",",","]");

    for (i =0; i<6;i++)
    {
        g_position_hiddeninputs[i] = document.getElementById(coordIDs[i]);
        positions += prefixes[i]+g_position_hiddeninputs[i].getAttribute("value");
    }
    positions += prefixes[6];

    CP_Log(FA_POS,LOG,"Target position:"+positions);
    if (positionHandEdited)
    {
        document.getElementById("posDetails").value = positions;
    }
    else
    {
        document.getElementById("posDetails").setAttribute("value",positions);
    }
    update_distance();
}

function fake_posid(event)
{
  if(positionHandEdited)
  {
    CP_Log(FA_POS,LOG,"FAKE POSID RUN!");
    event.stopPropagation();
    event.preventDefault();
    var form = document.getElementsByName("fleet_group_details_form")[0];
    if(form == undefined)
    {
      form = document.getElementsByName("fleet_details_form")[0];
      form.action= "/fleet/show_fleet_move_confirm.htm";
    }
    else form.action= "/fleetgroup/fleet_group_move_confirm.htm";

    form.submit();
  }
}

function half_distance(event)
{
    event.stopPropagation();
    event.preventDefault();
  var tgtPos = new Array();
  tgtPos = getTgtPositionValues();
  CP_Log(FA_POS,LOG,"tgtPos:"+tgtPos+", g_starting_position:"+g_starting_position);
  for (i=0;i<3;i++)
  g_position_hiddeninputs[i].setAttribute("value",Math.round((+g_starting_position[i]+ +tgtPos[i])/2));
   for (i=3;i<6;i++)
  g_position_hiddeninputs[i].setAttribute("value",0);
  tgt_bookmark_changed();
}

function get_fleet_ships()
{
    var fleetID = +(/fleetId=(\d+)/i.exec(window.location.href))[1];
    CP_Log(FA_POS,LOG,"fleetID:"+fleetID);
    var sizeTd = document.getElementById("fleet_sizes_"+fleetID);
    CP_Log(FA_POS,LOG,"sizeTd:"+sizeTd.innerHTML);
    CP_Log(FA_POS,LOG,"sizeTd.parent:"+sizeTd.parentNode.parentNode.innerHTML);
//    var htmlToSearch = sizeTd.parentNode.parentNode.innerHTML;
    var ships = new Array();
    for (i=0; i<SHIP_MAX; i++) {ships[i]=0;}
    configure_ship_types();
    var TDs = sizeTd.parentNode.parentNode.getElementsByTagName("td");
    for (i=0;i<TDs.length;i++)
    {
     var htmlToSearch = TDs[i].innerHTML;
     // fleet composition needed only for max speed
      if(htmlToSearch.match(/liwiec/))              {ships[SHIP_FIGHTER]  += 1;} else
      if(htmlToSearch.match(/Korweta/))             {ships[SHIP_CORVETTE] += 1;} else
      if(htmlToSearch.match(/Niszczyciel/))         {ships[SHIP_DESTROYER]+= 1;} else
      if(htmlToSearch.match(/liniowy/))             {ships[SHIP_LINE_CRUISER]     += 1;} else
      if(htmlToSearch.match(/ownik/))               {ships[SHIP_CRUISER]  += 1;} else
      if(htmlToSearch.match(/Kieszonkowy/))         {ships[SHIP_POCKET_BATTLESHIP]+= 1;} else
      if(htmlToSearch.match(/Pancernik/))           {ships[SHIP_BATTLESHIP]       += 1;} else
      if(htmlToSearch.match(/Desantowiec/))         {ships[SHIP_LPG]      += 1;} else
      if(htmlToSearch.match(/Statek transportowy/)) {ships[SHIP_TRANSPORT]+= 1;} else
      if(htmlToSearch.match(/Statek kolonizacyjny/)){ships[SHIP_COLONIZER]+= 1;} else
      if(htmlToSearch.match(/Statek pasa/)){ships[SHIP_PASSENGER]+= 1;}
    }
    for (i=0; i<SHIP_MAX; i++)
    {
        if(ships[i]>0) g_max_fleet_speed = Math.min(g_max_fleet_speed,shipTypes[i].baseSpeed);
    }
    CP_Log(FA_POS,LOG,"ships:"+ships+"g_max_fleet_speed:"+g_max_fleet_speed);
}

//autoname in fleet view
function update_fleet_name(event)
{
  event.stopPropagation();
  event.preventDefault();

  var officerName = "";

  // get officer name
  var OfficerCombo = document.getElementsByName("officerId")[0];
  CP_Log(FA_SHIP,DEBUG,"Officer Combo content:" + OfficerCombo.innerHTML);
  var SelectedOfficerID = OfficerCombo.value;
  var Officers = OfficerCombo.getElementsByTagName("option");
    for (i=0; i<Officers.length;i++)
      if (Officers[i].getAttribute("selected") != null) break;
    if (i<Officers.length)
      officerName = Officers[i].innerHTML;

    CP_Log(FA_SHIP,DEBUG,OfficerCombo);

    CP_Log(FA_SHIP,DEBUG,"Officer ID: "+SelectedOfficerID+", name: "+officerName
          +", combo value: "+OfficerCombo.getAttribute("value")+", officer selected" +Officers[i].getAttribute("selected"));

  var ships = Array();
  for (i=0; i<SHIP_MAX; i++) {ships[i]=0;}
  configure_ship_types();
  var ship_names = Array(/My.liwiec/,/Korweta/,/Niszczyciel/
                        ,/Kr..ownik liniowy/,/Kr..ownik/
                        ,/Kieszonkowy/,/Pancernik/,/Desantowiec/
                        ,/Statek transportowy/,/Statek kolonizacyjny/,/Statek pasa.erski/);

  var tables = new Array();
  var tab4 = new Array();
  tables = document.getElementsByTagName("Table");
  for (i=0; i<tables.length; i++)
  {
    CP_Log(FA_SHIP,DEBUG,"Table "+i+" content:" + tables[i].innerHTML);
  }

  tab4 = tables[2].getElementsByTagName("TR");

  for (i=1; i<tab4.length-2; i+=2)
    for (j=0; j<ship_names.length; j++)
    {
        //CP_Log(FA_SHIP,LOG,"i:"+i);

        if(tab4[i].cells[1].textContent.match(ship_names[j]))
        {
            ships[j]+= +tab4[i].cells[2].textContent;
            break;
        }
    }
   // name fix
   var tmp = ships[SHIP_CRUISER];
   ships[SHIP_CRUISER] = ships[SHIP_LINE_CRUISER];
   ships[SHIP_LINE_CRUISER] = tmp;

   // correct double-detected ships
   //   ships[SHIP_CRUISER] -= ships[SHIP_LINE_CRUISER];
   //   ships[SHIP_BATTLESHIP] -= ships[SHIP_POCKET_BATTLESHIP];
   
   var input = new Array();
   input = document.getElementsByName("name");
   input[0].value = prepare_name_string(SelectedOfficerID, officerName,  ships);
}

// Hacks into group or fleet page extending it with option to manually choose
// coordinates
// In: combo - combo object to attach additional objects
function enhance_fleet_movement_common(combo)
{
    if (combo == undefined) return;
    var inputElement = document.createElement('input');
    var half_dist = document.createElement('a');
    half_dist.innerHTML = "1/2";
    half_dist.setAttribute("href","");
    var anchors = combo.parentNode.parentNode.getElementsByTagName("a");
    for (i= 0; i <anchors.length; i++)
      CP_Log(FA_POS,LOG,i+":"+anchors[i].innerHTML);
    inputElement.setAttribute("type","text"); inputElement.setAttribute("size","36");
    inputElement.setAttribute("id","posDetails"); inputElement.setAttribute("name","posDetails");
    inputElement.setAttribute("style","text-align: center; margin-left: 20px");
    combo.parentNode.insertBefore(inputElement, combo.nextSibling);
    CP_Log(FA_POS,LOG,combo.parentNode.parentNode.innerHTML);
    combo.addEventListener('change',tgt_bookmark_changed,true);
//    combo.parentNode.setAttribute("align","center");
    CP_Log(FA_POS,LOG,"Bookmarks combo hooked");
    var distanceElement = document.createElement('div');
    distanceElement.setAttribute("id","target_distance");
    anchors[0].parentNode.insertBefore(distanceElement,anchors[0]);
    inputElement.addEventListener('keyup',setup_target_position,true);
    CP_Log(FA_POS,LOG,"position input hooked");
    anchors[0].addEventListener('click',fake_posid,true);
    distanceElement.parentNode.insertBefore(half_dist,distanceElement);
    half_dist.addEventListener('click',half_distance,true);
    // trigger filling in
    tgt_bookmark_changed();
    g_starting_position = getTgtPositionValues();
    update_distance();
}

// function enhance_fleet_movement    Does fixes on CP fleet group movement
function enhance_fleet_movement_group()
{
  enhance_fleet_movement_common(document.getElementById("chosenBookmark"));
}

// function enhance_fleet_movement    Does fixes on CP fleet movement
function enhance_fleet_movement_fleet()
{
  get_fleet_ships();
  enhance_fleet_movement_common(document.getElementsByName("chosenBookmark")[0]);
  var inputField = new Array();
  inputField = document.getElementsByName("name")[0];
  var setNameAnchor = document.createElement('a');
  setNameAnchor.innerHTML = "Ustaw nazw&#x0119;";
  setNameAnchor.setAttribute("href","");
  inputField.parentNode.insertBefore(setNameAnchor, inputField.nextSibling);
  setNameAnchor.addEventListener('click',update_fleet_name,true);

}

// This fucntion corrects speed factor basing on what has been predicted
// and the actual time grabbed from page
function correct_ship_speeds()
{
  var centerTag = document.getElementsByTagName("center")[0];
  CP_Log(FA_POS,LOG,"GOT:"+centerTag.innerHTML);
  var tekst = Array();
  tekst = /Czas: ([a-zA-Z0-9_ ]+)<br/(centerTag.innerHTML);
  var last_calculated_time = CP_getAttr("C_LAST_CALCULATED_TIME", 1+3600 * 2+60 * 5);
  if (last_calculated_time>0)
  {
    var seconds = timeStrToSeconds(tekst[1]) - 3600 * 2 - 60 * 5;
    var precalcSecs = last_calculated_time - 3600 * 2 - 60 * 5;
    var mod_factor = (precalcSecs /seconds);
    CP_Log(FA_POS,LOG, "Precalculated: " + precalcSecs
                     + ", actual: "      + seconds
                     + ", mod_factor: "  + mod_factor);
    var old_speed = CP_getAttr("C_CURRENT_FIGHTER_SPEED_FACTOR"
                              ,C_CURRENT_FIGHTER_SPEED_FACTOR)
                    / C_SPEED_CALC_MAGNITUDE;
    var new_speed = old_speed * mod_factor;
    CP_Log(FA_POS,LOG, "Old speed: " + old_speed + ", new speed: " + new_speed);
    new_speed = new_speed *C_SPEED_CALC_MAGNITUDE;
    // sometimes calculation yields wrong values - bug?
    if (new_speed == 0)
    {
      CP_Log(FA_POS,ERR, "Old speed: " + old_speed + ", mod_factor: " + mod_factor
              + ", last_calculated_time: " + last_calculated_time
              + ", mod_factor: " + mod_factor
              );
      new_speed = 1;
    }
    CP_setAttr("C_CURRENT_FIGHTER_SPEED_FACTOR",Math.floor(new_speed));
  }
  else
  {
     CP_Log(FA_POS,LOG, "Local flight");
  }
}

// ===========================Personnel funcs==================================
// function correct_persons    Does fixes on CP person list
function correct_persons()
{
   var tags = Array();
   var anchors = Array ();
   var pid_parsed = Array();
   var pids = Array();
   var stats = Array();
   var officers = Array();
   var max_pid = 0;
   var stat_obj;
   var val = Array();
   var max_officers = 0;
   var best_officer = 0;
   var cumul_stats = new Object();
       cumul_stats.ot = 0;
       cumul_stats.dt = 0;
       cumul_stats.fs = 0;
       cumul_stats.tfs = 0;
       cumul_stats.cost = 0;
   var good_stats = CP_getAttr("person_stats",20);

   tags = document.getElementsByTagName("script");
   CP_Log(FA_PERSON,LOG,"scripts:"+tags.length);

   for (i=0;i<tags.length;i++)
   {
      pid_parsed = /decision_making_(\d+)/i.exec(tags[i].innerHTML);
      if(pid_parsed)
      {
        //GM_log("script:"+ tags[i].innerHTML);
        pids[max_pid++] = pid_parsed[1];
        //GM_log("PID:"+ person_id);
      }
   }
   anchors = document.getElementsByTagName("a");

   for (i=0;i<anchors.length;i++)
   {
      href = anchors[i].getAttribute("href");
      pid_parsed = /person.htm\?personId=(\d+)/i.exec(href);

      if(pid_parsed)
      {
            var personNote = CP_getAttr("personNote"+pid_parsed[1],"");

            var person_color = /\[color=#([0123456789AaBbCcDdEeFf]+)\]/i.exec(personNote);
            CP_Log(FA_PERSON,LOG,"person_color: " + person_color);
            if (person_color != null)
            {
                anchors[i].innerHTML = "<font color=\"#" + person_color[1] + "\">"
                + anchors[i].innerHTML + "</font>";
            }
      }
   }

   if(RegExp("persons_list.htm").test(window.location.href)) {

     for (i=0;i<max_pid;i++)
      {
      stats[i] = new Object();
      stat_obj = document.getElementById("decision_making_"+pids[i]);
      //GM_log("obj"+stat_obj.parentNode.parentNode.innerHTML);
      stats[i].pid = pids[i];
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].dm = +val[1];
      stat_obj = document.getElementById("social_abilities_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].sa = +val[1];
      stat_obj = document.getElementById("determination_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].d  = +val[1];
      stat_obj = document.getElementById("bravery_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].br = +val[1];
      stat_obj = document.getElementById("offensive_tactics_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].ot = +val[1];
      stat_obj = document.getElementById("defensive_tactics_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].dt = +val[1];
      stat_obj = document.getElementById("military_expirience_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].me = +val[1];
      stat_obj = document.getElementById("leadership_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].ls = +val[1];
      stat_obj = document.getElementById("maxFleetSizeInfo_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].fs = +val[1];
      stat_obj = document.getElementById("payCoeff_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML); stats[i].cost = +val[1];
      addNote(stat_obj.parentNode,"personNote"+pids[i]);
    }
    tags = document.getElementsByTagName("td");

    var officer_data = 0;
    officer_data = +CP_getAttr("store_officer_data","0");

    for (i=0;i<max_pid;i++)
    {
      CP_Log(FA_PERSON,LOG,"Stats:"+stats[i].dm +"/"+ stats[i].sa +"/"+ stats[i].d +"/"+ stats[i].br +" "
            + stats[i].ot +"/"+ stats[i].dt +"/"+ stats[i].me +"/"+ stats[i].ls +","
            + stats[i].fs );
      if(stats[i].ot+stats[i].dt >= 2*good_stats)
      {
        max_officers++;
        cumul_stats.ot += stats[i].ot;
        cumul_stats.dt += stats[i].dt;
        cumul_stats.fs += stats[i].fs;
      }
      if(stats[i].ot < good_stats)
      {
        var skill_color = "yellow";
        if(2*stats[i].ot < good_stats)
          skill_color = "red";
        skill_tag = document.getElementById("offensive_tactics_"+stats[i].pid);
        skill_tag.innerHTML = "<font color=\""+skill_color+"\">"+skill_tag.innerHTML
            + "</font>";

      }
      if(stats[i].dt < good_stats)
      {
        var skill_color = "yellow";
        if(2*stats[i].dt < good_stats)
          skill_color = "red";
        skill_tag = document.getElementById("defensive_tactics_"+stats[i].pid);
        skill_tag.innerHTML = "<font color=\""+skill_color+"\">"+skill_tag.innerHTML
            + "</font>";
      }
      cumul_stats.tfs += stats[i].fs;
      cumul_stats.cost += stats[i].cost;

        var key = "Officer_" + pids[i] +"_ot";
        var value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].ot))
                CP_setAttr(key, stats[i].ot);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_dt";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].dt))
                CP_setAttr(key, stats[i].dt);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_me";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].me))
                CP_setAttr(key, stats[i].me);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_ls";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].ls))
                CP_setAttr(key, stats[i].ls);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_fs";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].fs))
                CP_setAttr(key, stats[i].fs);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_dm";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].dm))
                CP_setAttr(key, stats[i].dm);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_sa";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].sa))
                CP_setAttr(key, stats[i].sa);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_d";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].d))
                CP_setAttr(key, stats[i].d);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_br";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].br))
                CP_setAttr(key, stats[i].br);
        }
        else
            CP_setAttr(key, 0);
    }
       //    if (max_officers >0)
      //end = document.getElementById("__END__");

    if(CP_getAttr("sowafeature_1",1)==1) {
      var ftpbox_stat = document.createElement("div");
      ftpbox_stat.style.position = 'fixed';
      ftpbox_stat.style.right = '210px';
      ftpbox_stat.style.width = '245px';
      ftpbox_stat.style.height = '45px';
      ftpbox_stat.style.top = '22px';
      ftpbox_stat.style.background = '#000000';
      ftpbox_stat.style.opacity = C_OPACITY;
      ftpbox_stat.style.border = '1px solid grey';
      var person_summary = '<div style="position: relative; left: 05px; right: 05px; top: 05px; width: 235px;'
         + 'background: #000000; font-size: 9px">Dobrych oficer&oacute;w: '
         + max_officers + ' / ' + max_pid;
      if (max_officers>0)
      {
          person_summary += ";&nbsp; taktyki: " + Math.floor(cumul_stats.ot/max_officers)
          + " / " + Math.floor(cumul_stats.dt/max_officers);
      }
      person_summary += "<br/> Razem potencjalny rozmiar: " + cumul_stats.fs + " / "
          + cumul_stats.tfs
          + "<br>&#x141;&#x0105;czny koszt utrzymania: " + cumul_stats.cost + "</div>";
      ftpbox_stat.innerHTML = person_summary;
      document.body.insertBefore(ftpbox_stat, document.body.firstChild);
    }
  }
}
// ===========================Position funcs==================================
// function correct_position    Does fixes on CP position
function correct_position()
{
  /*
  var tag = document.getElementsByName("fleetId")[0];

  if(tag != null)
  {
    tag.setAttribute("multiple","multiple");
    tag.setAttribute("size","3");
  }

  tag = document.getElementsByName("fleetGroupId")[0];
  if(tag != null)
  {
    tag.setAttribute("multiple","multiple");
    tag.setAttribute("size","3");
  }
  */

}

// ===========================CONFIGURATION==================================
function get_username()
{

  var username = document.getElementsByTagName("table")[3]
        .getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
  CP_Log(FA_COMMON,LOG,"Username:"+username);
  var usernameEndIndex = username.length;
  username = username.substring(1,usernameEndIndex);
  if(g_www)
    GM_setValue("C_WWW_USERNAME", username);
  else
    GM_setValue("C_USERNAME", username);
  CP_Log(FA_COMMON,LOG,username);
}

function update_config_cbox(obj)
{
  CP_setAttr(obj.id,obj.checked?1:0); 
  ShowHideSwitch("OfficerStoreDataId", CP_getAttr("store_officer_data",0)?0:1);
  ShowHideSwitch("MessagesShowId", CP_getAttr("sowasetting_5",1)?0:1);
}

function update_config_rbutton(obj)
{
  var identifier = obj.id.split("-")[0];
  var selected_option = obj.id.split("-")[1];
  CP_setAttr(identifier, selected_option);

  for(i=0; i<11; i++) {
     if((i != selected_option) && (document.getElementById(identifier+"-"+i) != null))
     {
         document.getElementById(identifier+"-"+i).checked=false;
     }
  }
}

function update_config_txtbox(obj)
{
  var number = obj.value;
  CP_Log(FA_COMMON,LOG,"Setting "+obj.id+"->"+number);
  CP_setAttr(obj.id,+number);
}

function update_config_txtbox_str(obj)
{
  var str = obj.value;
  CP_Log(FA_COMMON,LOG,"Setting "+obj.id+"->"+str);
  CP_setAttr(obj.id,str);
}

function add_textbox(id, size, defaultVal)
{
  var str = "<input size=\""+size+"\" id=\""+id+"\" value=\""
      + CP_getAttr(id,defaultVal)
      + "\">";
  return str;
}

function ShowHideSwitch(objId, show)
{
    if (show) {
        document.getElementById(objId).style.display = 'none' ;
    }  else  {
        document.getElementById(objId).style.display = '' ;
    }
}

function cptweaks_config()
{
    var officer_data = 0;

    // first fast draw config sheet
    var str = "<div class=\"pagesMainBox\"><div class=\"pagesHeaderBox\"><div class=\"pagesHeaderLeftBlock\">"
        + "<div class=\"pagesHeaderTopic\">Centrum skrypt&oacute;w</div></div></div>";

    // SOWA features
    str += "<div class=\"pagesContentBox\"><table class=\"pagesTable\">"
        + "<tr class=\"contentRow1\"><td width=10></td><td width=195><b>SOWIE DODATKI:</b></td><td width=15></td>"
        + "<td width=344><b>OFICEROWIE:</b></td><td width=15></td><td><b>MENU PLANETY:</b></td></tr>"
        + "<tr class =\"separator\"></tr><tr><td rowspan=4></td>"
        + "<td valign=\"top\" class=\"actionBarContent\" rowspan=4>";

    for (i=1;i<g_sowafeatures_counter;i++)
    {
        str += "<span class=\"actionBarItem\"><input type=\"checkbox\" id=\"sowafeature_"+i+"\"";
        if(CP_getAttr("sowafeature_"+i,1)==1) str+=" checked ";
        str += ">"+g_sowafeatures[i].Caption + "</span>";
    }

    var messages_data = parseInt(CP_getAttr("sowasetting_5",1));
    str += "<span class=\"actionBarItem\"><input type=\"checkbox\" id=\"sowasetting_5\"";
    if(messages_data>0) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[0];

    str += "</span><table id=\"MessagesShowId\" class=\"pagesTable\" border=0 cellspacing=0 cellpadding=0>"
        + "<tr><td width=15 rowspan=2></td><td><span class=\"actionBarItem\"><input type=\"radio\" id=\"sowasetting_5-1\"";
    if(CP_getAttr("sowasetting_5",1)<2) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[1]+"</span></td></tr><tr><td><span class=\"actionBarItem\">"
        + "<input type=\"radio\" id=\"sowasetting_5-2\"";
    if(CP_getAttr("sowasetting_5",1)==2) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[2]+"</span></td></tr></table>";

    str += "<span class=\"actionBarItem\" style=\"margin-top:10px\">Ikonka notatki:</span>"
        + "<table border=0 class=\"pagesTable\"><tr>"
    for (i=0;i<3;i++)
    {
        str += "<td><input type=\"radio\" id=\"sowasetting_6-"+i+"\"";
        if(CP_getAttr("sowasetting_6",1)==i) str+=" checked ";
        str += "><img src=\""+g_note_picture[i]+"\"</td>";
    }

    str += "</tr></table>";

    str += "</td><td rowspan=4></td><td valign=\"top\"><table class=\"invisible\"><tr><td class=\"actionBarContent\">"
          + "<span class=\"actionBarItem\">&#346;rednie taktyki dobrego oficera "
          + add_textbox("person_stats",5,20) + "</span></td></tr><tr><td class=\"actionBarContent\"><hr/>"
          + "Wzorzec nazwy floty " + add_textbox("C_FLEET_DESC_STRING",32, C_FLEET_DESC_DEFAULT_STRING)
          + "<TABLE border=0><TR><TD>%R</TD><TD>- Rozmiar; </TD>"
          + "<TD>%S</TD><TD>- Sk&#x0142;ad; </TD>"
          + "<TD>%D, %d</TD><TD>- Dow&oacute;dca </TD></TR></TABLE>"
          + "<TABLE border=0><TR><TD><input type=\"checkbox\" id=\"store_officer_data\"";
    if(CP_getAttr("store_officer_data",0)==1) { officer_data = 1; str+=" checked "; };

    str+= ">Zapisz statystyki oficera w FireFox</TD></TR></TABLE>";
    str += "<TABLE id=\"OfficerStoreDataId\" border=0>"
        + "<TR><TD>%A</TD><TD>- Max. Rozmiar Floty</TD><TD>%B</TD><TD>-   Podejmowanie decyzji</TD></TR>"
        + "<TR><TD>%C</TD><TD>- Umiej&#x0119tno&#347;ci spo&#x0142;eczne</TD><TD>%E</TD><TD>- Determinacja</TD></TR>"
        + "<TR><TD>%F</TD><TD>- Odwaga</TD><TD>%G</TD><TD>- Taktyka ofensywna</TD></TR>"
        + "<TR><TD>%H</TD><TD>- Taktyka defensywna</TD><TD>%I</TD><TD>- Dowodzenie flot&#x0105;</TD></TR>"
        + "<TR><TD>%J</TD><TD>- Zdolno&#347;ci przyw&oacute;dcze</TD></TR>"
        + "</TABLE></td></tr></table><br>";

    str += "</td><td></td><td valign=\"top\" rowspan=4><table class=\"invisible\">";

    for (i=0;i<g_menuitems_counter;i++)
    {
        str += "<tr><td class=\"actionBarContent\"><span class=\"actionBarItem\">"
            + "<input type=\"checkbox\" id=\"menuitem_"+i+"\"";
        if(CP_getAttr("menuitem_"+i,1)==1) str+=" checked ";
        str += ">"+g_menuitems[i].Caption + "</span></td></tr>";
    }

    str += "</table></td></tr><tr class=\"contentRow1\"><td><b>DODATKOWE KRYTERIA FILTROWANIA PLANET:</b></td></tr>"
        + "<tr class =\"separator\"></tr><tr><td valign=\"top\"><table class=\"invisible\"";

    for (i=0;i<g_menugroups_counter;i++)
    {
        str += "<tr><td class=\"actionBarContent\"><span class=\"actionBarItem\">"
            + "<input type=\"checkbox\" id=\"menugroup_"+i+"\"";
        if(CP_getAttr("menugroup_"+i,1)==1) str+=" checked ";
        str += ">"+g_menugroups[i].Caption + "</span></td></tr>";
    }

    str += "</table></td></tr></table></div><div class=\"pagesHeaderBox\"><div class=\"pagesHeaderLeftBlock\">"
        + "<div class=\"pagesHeaderSubText\">CP Tweaks " + C_VERSION_STRING+"<br>"
        + "<a href = \"http://sowa.servebeer.com/sowieskrypty/cp_tweaks.user.js\""
        + "target = \"_new\">Aktualizacja skryptu</a></div></div></div>";


    document.getElementsByTagName("body")[0].innerHTML = str;

    // then attach handlers
    for (i=1;i<g_sowafeatures_counter;i++)
    {
        document.getElementById("sowafeature_"+i).addEventListener('click', function(event) {
            update_config_cbox(event.target)
        },true);
    } 

    document.getElementById("sowasetting_5").addEventListener('click', function(event) {
        update_config_cbox(event.target)
    },true);

    if(CP_getAttr("sowasetting_5",1)!=0)
    {
        document.getElementById("sowasetting_5-1").addEventListener('click', function(event) {
            update_config_rbutton(event.target)
        },true);
        document.getElementById("sowasetting_5-2").addEventListener('click', function(event) {
            update_config_rbutton(event.target)
        },true);
    }

    for (i=0;i<3;i++)
    {
        document.getElementById("sowasetting_6-"+i).addEventListener('click', function(event) {
            update_config_rbutton(event.target)
        },true);
    }

    for (i=0;i<g_menuitems_counter;i++)
    {
        document.getElementById("menuitem_"+i).addEventListener('click', function(event) {
            update_config_cbox(event.target)
        },true);
    }

    for (i=0;i<g_menugroups_counter;i++)
    {
        document.getElementById("menugroup_"+i).addEventListener('click', function(event) {
            update_config_cbox(event.target)
        },true);
    }

    document.getElementById("person_stats").addEventListener('change', function(event) {
       update_config_txtbox(event.target)
    },true);
    document.getElementById("C_FLEET_DESC_STRING").addEventListener('change', function(event) {
        update_config_txtbox_str(event.target)
    },true);
    document.getElementById("store_officer_data").addEventListener('click', function(event) {
        update_config_cbox(event.target)
    },true);
    ShowHideSwitch("OfficerStoreDataId", officer_data?0:1);
    ShowHideSwitch("MessagesShowId", messages_data?0:1);
}

// returns building id basing on building name
function get_building(source)
{
  var bldNames = new Array(/Elektrownia/,/Wytw.rnia substancji organicznych/
	  	,/Kopalnia metalu/,/Kopalnia kryszta.u/,/Centrum budowlane/
 		  ,/Centrum administracyjne/,/Stocznia/,/Struktury obronne/,/Laboratorium/
 		  ,/Akademia/,/Kolektor energii/,/Magazyn substancji organicznych/
	  	,/Magazyn metalu/,/Magazyn kryszta.u/,/Gie.da/);
	for (tab_iter=0;tab_iter<bldNames.length;tab_iter++)
    if(source.match(bldNames[tab_iter]))
      return tab_iter;
}

// converts k to 1000 and M to 1000000
function k_to_tsd(k)
{
  return (k=="k")?1000:((k=="M")?1000000:1);
}

// ===========================PLANET==================================
function correct_planet()
{
  var val = /planetId=(\d+)/i.exec(window.location.href); 
  var buildingNames = new Array("Elektrownia", "Wytw.rnia substancji organicznych", "Kopalnia metalu",
      "Kopalnia kryszta.u", "Centrum budowlane", "Centrum administracyjne", "Stocznia", "Struktury obronne", "Laboratorium",
      "Akademia", "Kolektor energii", "Magazyn substancji organicznych", "Magazyn metalu", "Magazyn kryszta.u",
      "Gie.da");
  var resourceNames = new Array ("Energia", "Substancje Organiczne", "Metal", "Krysztal");
  // -------------------- planet object definition
  var planet = new Object();
  planet.buildings = new Object();
  planet.buildings.details = new Array();
  for (i=0;i<buildingNames.length;i++)
    { planet.buildings.details[i] = new Object();
      planet.buildings.details[i].upgcost = new Object();
      planet.buildings.details[i].upgcost.resources = new Array();
    }
  planet.resources = new Array();
  for (i=0;i<4;i++) planet.resources[i] = new Object();
  // --------------------
  var planet_id = +val[1];
  CP_Log(FA_PLANET,LOG,"Planet ID:"+planet_id);
  var tags = new Array();
  tags = document.getElementsByTagName("tbody");
  var descriptionTable = tags[2];
  tags = descriptionTable.getElementsByTagName("tr");
  var lastTr = tags[tags.length - 1];
//  var note = CP_getAttr("planetNote"+planet_id,"");
  var newTR = document.createElement('tr');
  var newTD = document.createElement('td');
  newTD.setAttribute("colspan","3");
  newTR.appendChild(newTD);
  lastTr.parentNode.insertBefore(newTR, lastTr.nextSibling);
  addNote(newTD,"planetNote"+planet_id);
  var total_building_levels = document.getElementById("total_building_levels");
  CP_Log(FA_PLANET,LOG,"total_building_levels"+total_building_levels.innerHTML);
  //Budynki na planecie:290(+2) / 295&nbsp;&nbsp;Kolejka budowania: 2 / 8

  val = /zakolejkowane: (\d+) \/ (\d+)/i.exec(total_building_levels.innerHTML);
  planet.buildings.enqueued = +val[1];
  planet.buildings.max_queue =  +val[2];

  val = /Budynki na planecie: (\d+)/i.exec(total_building_levels.innerHTML);
  planet.buildings.current = +val[1];

  val = /z (\d+)/i.exec(total_building_levels.innerHTML);
  planet.buildings.max = +val[1];
  
  // =========== resources ============
  for (i=0;i<4;i++)
  {
    tagid = "resource_desc_"+(i+1)+"_"+planet_id;
    //CP_Log(FA_PLANET,LOG,"tagid:"+tagid);
    val = /([\d\.]+)([kM]?) \/ ([\d\.]+)([kM]?)/i.exec(document.getElementById("resource_desc_"+(i+1)+"_"+planet_id).innerHTML);
    //CP_Log(FA_PLANET,LOG,"val:"+val);
    planet.resources[i].stores_current      = +val[1]*k_to_tsd(val[2]);
    planet.resources[i].stores_max          = +val[3]*k_to_tsd(val[4]);
    planet.resources[i].stores_max_final    = planet.resources[i].stores_max; //for further adjustment
    val = /(\d+) \((\d+) \/ (\d+)\)/i.exec(document.getElementById("resource_details_"+(i+1)+"_"+planet_id).innerHTML);
    //CP_Log(FA_PLANET,LOG,"val:"+val);
    planet.resources[i].output_net   = +val[1];
    planet.resources[i].output_gross = +val[2];
    planet.resources[i].usage        = +val[3];
  }
  //CP_Log(FA_PLANET,LOG,"building html:"+document.getElementById("building_details_19").parentNode.innerHTML);
  
  // ================= buildings details ===============

  var infovalues = new Array();

  for(i=0;i<buildingNames.length;i++)
  {
     infovalues = document.getElementsByClassName("InfoValue");
     if (get_building(infovalues[i].innerHTML) != null) {
		 var building_data = infovalues[get_building(infovalues[i].innerHTML)].parentNode.innerHTML;
		 planet.buildings.details[i].lvl = +(/Poziom:.+(\d+)/i.exec(building_data)[1]);
		 val = /([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)/i.exec(building_data);
	
		 for (j=0;j<4;++j)
		 {
			  val[2*j+1]=val[2*j+1].replace(/,/g,".");
			  planet.buildings.details[i].upgcost.resources[j] = +val[2*j+1]*k_to_tsd(val[2*j+2]);
		 }
		 if(planet.buildings.details[i].lvl > 0)
			  planet.buildings.details[i].cond = +(/Kondycja:.+(\d+)/i.exec(building_data)[1]);
		 else
			  planet.buildings.details[i].cond = 100;
		 CP_Log(FA_PLANET,LOG,"building:"+buildingNames[i]
							+", level:"+planet.buildings.details[i].lvl
							+", resources:"+planet.buildings.details[i].upgcost.resources
							+", condition:"+planet.buildings.details[i].cond);
      }
  }
  //for (
  //CP_Log(FA_PLANET,LOG,"planet:"+planet);

  var tables = new Array();
  tables = document.getElementsByTagName("table");
  //CP_Log(FA_PLANET,LOG,"Caught cell:"+tables[15].getElementsByTagName("tr")[0].cells[0].innerHTML);

  var trs = new Array();
  var build_queue = new Array();
  
  // =============== building upgrade/repair queue ==================
  // for (var itables = 14; itables<tables.length;itables++)
  
  // for(i=2;i<tables.length;i++) { GM_log("TABLE"+ i + ":" +tables[i].innerHTML) } 
    trs = tables[10].getElementsByTagName("div");
    
  // for(i=2;i<trs.length;i++) { GM_log("TR"+ i + ":" +trs[i].innerHTML) } 
    if(/Wykonywane zadania:/i.exec(trs[24].innerHTML))
    {
      // there's something to do...

      for(i=2;i<trs.length;i++)
      {
        if(/Budowa/i.exec(trs[i].innerHTML))
        {
           var bld_bld = get_building(trs[i].innerHTML);
           build_queue[build_queue.length]=bld_bld;
           CP_Log(FA_PLANET,LOG,i+"budowa:"+trs[i].innerHTML
                      +"\n budynek:"+buildingNames[bld_bld]);
           if ((bld_bld>=10)&&(bld_bld<=13))
           {
            // stores
            planet.resources[bld_bld-10].stores_max_final *= Math.SQRT2;
           }
        }
        if(/Naprawa/i.exec(trs[i].innerHTML))
        {
           var rep_amnt = /Naprawa \((\d+)%\)/(trs[i].innerHTML)[1];
           var rep_bld = get_building(trs[i].innerHTML);
           CP_Log(FA_PLANET,LOG,i+"naprawa:"+trs[i].innerHTML
                    +"\n budynek:"+buildingNames[rep_bld]
                    +",%:"+rep_amnt);
        }
        if(/Niewystarcza/i.exec(trs[i].innerHTML))
        { 
           var resources_pattern = new Array(
              /Energia: ([\d\s \,&nbsp;]+)/,/Substancje organiczne: ([\d\s \,&nbsp;]+)/,
              /Metal: ([\d\s \,&nbsp;]+)/,/Kryszta.: ([\d\s \,&nbsp;]+)/);
           //var resources_lacking = new Array();
           var resorces_lacking_no = 0;
           for (j=0; j<resources_pattern.length;j++)
           {
               if (trs[i].textContent.match(resources_pattern[j]))
               {
                val = trs[i].textContent.match(resources_pattern[j])[1];
                planet.resources[j].lacks = +val.replace(/[\s\,&nbsp;]/g,"");

                planet.resources[j].time_needed = Math.floor(3600 *
                  (planet.resources[j].lacks / planet.resources[j].output_net));
                resorces_lacking_no++;
               }
               else
               {
                  planet.resources[j].lacks = 0;
                  planet.resources[j].time_needed = 0;
               }
               planet.resources[j].time_str = secondsToTimeStr(planet.resources[j].time_needed);
               if(planet.resources[j].lacks > 0)
               CP_Log(FA_PLANET,DEBUG,"Brakuje surowca: "+resourceNames[j]
                      +" ("+planet.resources[j].lacks
                      +"), czas oczekiwania przy wydobyciu "+planet.resources[j].output_net
                      +"/h: "+planet.resources[j].time_str);

           } //for j...
           
           if (resorces_lacking_no >0)
           {
             var seq = new Array(0,1,2,3);

             // a very unefficient sorting by swapping but for 4 elements it does not really matter
             for (j = 0; j<9; j++)
             {
                CP_Log(FA_PLANET,DEBUG,"seq:"+seq+"compared time:"+planet.resources[seq[j%3]].time_needed
                  +"<"+planet.resources[seq[(j%3)+1]].time_needed);
                if (planet.resources[seq[j%3]].time_needed < planet.resources[seq[(j%3)+1]].time_needed)
                {
                    var tmp = seq[j%3];
                    seq[j%3]= seq[(j%3)+1];
                    seq[(j%3)+1] = tmp;
                }
             }

             if (resorces_lacking_no >=2)
             {
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[0]], "<font color=\"red\">$&</font>");
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[resorces_lacking_no-1]], "<font color=\"green\">$&</font>");
                //var diff = planet.resources[seq[0]]-
             }
             if (resorces_lacking_no >2)
             {
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[1]], "<font color=\"yellow\">$&</font>");
             }
             //base string
             var market_string = "/building/market.htm?planetId="+planet_id
                +"&res="+seq[0] + "&production="+planet.resources[seq[0]].output_net
                             +"&needed="+planet.resources[seq[0]].lacks;
             //now take two approaches
             if (resorces_lacking_no == 1)
             {
               //one resource is relatively simple scenario,
               // you need to sum up production and transaction gain
               market_string += "&appr=1";
             }
             else if(resorces_lacking_no > 1)
             {
                  // here we're just trying to limit time to 2nd resource
                  market_string += "&appr=2&time_to_save="
                    +(planet.resources[seq[0]].time_needed-planet.resources[seq[1]].time_needed);
             }

             market_string = '<span class="actionBarItem"><a href=\"' + market_string + '\">Dokup surowce</a></span>';
             tables[tables.length-6].getElementsByTagName("span")[0].innerHTML += market_string;
             break;
           }
        }
     }
  }
  CP_Log(FA_PLANET,LOG,"Zakolejkowane"+ build_queue);
  // resource_desc_[res#]_[planet#] : 797k / 1,35M   // fancy regex: ([\d,]+)([kM]?) \/ ([\d,]+)([kM]?)
  // resource_details_[res#]_[planet#] 9399 (9540 / 75) // regex: (\d+) \((\d+) \/ (\d+)\)
  //tables[2].getElementsByTagName("tr")[0].cells[1].innerHTML
  /*for (i=0;i<tables.length;i++)
  {
     CP_Log(FA_PLANET,LOG,i+":"+tables[i].innerHTML);
  }   */
  /*var work_in_progress_offset = 0;
  if (/Wykonywane zadania/(tables[15].getElementsByTagName("tr")[0].cells[0].innerHTML)
     work_in_progress_offset = 1    */
}

function correct_market()
{
  var timefor100k = document.getElementsByTagName("span")[6];
  var speed = timeStrToSeconds(timefor100k.textContent);
  var production_per_hour = (360000000/speed);

  CP_Log(FA_PLANET,LOG,"predkosc gieldy:"+speed+"s/100k:"+production_per_hour+"/h");
  if (/&appr/i.exec(window.location.href))
  {
    //We're forwarded here to cover for resource lacks
    var req = new Object();
    req.res        = +/res=([\d]+)/i.exec(window.location.href)[1];
    req.production = +/production=([\d]+)/i.exec(window.location.href)[1];
    req.needed     = +/needed=([\d]+)/i.exec(window.location.href)[1];
    req.appr       = +/appr=([\d]+)/i.exec(window.location.href)[1];
    CP_Log(FA_PLANET,LOG,"Params received:"+req.res+"|"+req.production+"|"+req.needed+"|"+req.appr);

    var resourceTypeCombo = document.getElementsByName("resourceTypeId")[0];
    var amountEdit = document.getElementsByName("amount")[0];
    var directionCombo = document.getElementsByName("direction")[0];
    //CP_Log(FA_PLANET,LOG,"form items:"+resourceTypeCombo.innerHTML
    //      +"|"+directionCombo.innerHTML);
    //resourceTypeCombo.setAttribute("selectedIndex", (req.res+1)); //convert from 0-based to 1-based
    resourceTypeCombo.selectedIndex = req.res;
    //directionCombo.setAttribute("selectedIndex", -1); //buy
    directionCombo.selectedIndex = 1;
    //time to produce resource in mine only
    req.time_to_produce = (req.needed / req.production);
    //time to obtain resource from both mine and market
    req.time_short = (req.needed / (req.production + production_per_hour));
    req.amount_to_buy = req.time_short*production_per_hour;
    //CP_Log(FA_PLANET,LOG,"Needed:"+
    CP_Log(FA_PLANET,LOG,"original time:"+secondsToTimeStr(req.time_to_produce*3600)
            +"\ntime shorter:"+secondsToTimeStr(req.time_short*3600)+"amount:"+req.amount_to_buy);
    if (req.appr == 2)
    {
      req.time_to_save=+/time_to_save=([\d]+)/i.exec(window.location.href)[1];
      CP_Log(FA_PLANET,LOG,"time_to_save"+secondsToTimeStr(req.time_to_save));
      //if (req.time_short * 3600 > (req.time_to_produce-req.time_to_save/3600))
          //req.amount_to_buy = (req.time_to_save/3600)*req.production;
    }
    amountEdit.value = Math.floor(req.amount_to_buy);
    location.href = "javascript:void(checkOffer());";
  }
}

function paint_planets(lokalizacja)
{
    var anchors = Array ();
    var tags = Array ();
    var parzyste = false;

    anchors = document.getElementsByTagName ("a");
    for (i=0;i<anchors.length;i++)
    {
	href = anchors[i].getAttribute("href");
        pid_parsed = /planet.htm\?planetId=(\d+)/i.exec(href);  
   
        if(pid_parsed)
        {
            parzyste = !parzyste;
            var planet_id = +pid_parsed[1];
            var planetNote = CP_getAttr("planetNote"+planet_id,"");
            var planet_color = /\[color=#([0123456789AaBbCcDdEeFf]+)\]/i.exec(planetNote);

            if (planet_color != null)
            {
                if((RegExp("fleetgroup/fleet_group_overview.htm").test(lokalizacja))
                    || (RegExp("messages/read_message.htm").test(lokalizacja))
                    || (RegExp("spy/spy_list.htm").test(lokalizacja))
                    || ((RegExp("fleet/fleet_overview.htm").test(lokalizacja))
                        && (!RegExp("na planecie").test(anchors[7].parentNode.innerHTML))))
                {
                    anchors[i].innerHTML = "<font color=\"#" + planet_color[1] + "\">"
                        + anchors[i].innerHTML + "</font>";
                }
                else if((RegExp("fleet/fleet_overview.htm").test(lokalizacja))
                    && (RegExp("na planecie").test(anchors[7].parentNode.innerHTML)))
                {
                    if(i!=8)
                    {
                        anchors[i].innerHTML = "<font color=\"#" + planet_color[1] + "\">"
                            + anchors[i].innerHTML + "</font>"; 
                    }
                }
                else
                {
                    if(parzyste==true)
                    {
                        anchors[i].innerHTML = "<font color=\"#" + planet_color[1] + "\">"
                            + anchors[i].innerHTML + "</font>";
                    }
                }
            } 
        }
    }
}


/*  function designed to check level or research
function investigate_research()
{
   var table = Array();
   table = document.getElementById("research_item_state_36").parentNode.getElementsByTagName("td");
   var research_level = table[2].innerHTML.split(";")[1].split("&")[0];
   CP_setAttr("acceleration_factor", research_level);
} */

function correct_planet_overview(filter_no)
{
var tags = new Array();
  var resources = new Array(new Object(), new Object, new Object, new Object);
  var res_div; var temp_tag;
  // add filter hack
  hiddeninput = getElementsByName("startIdx")[0];
  newhiddeninput = document.createElement('input');
  newhiddeninput.setAttribute("name","filter");
  newhiddeninput.setAttribute("type","hidden");
  newhiddeninput.setAttribute("value","1");
  hiddeninput.parentNode.insertBefore(newhiddeninput, hiddeninput.nextSibling);
  
  tags = document.getElementsByTagName("tr");
  
  //for (var it=0; it < tags.length;it++)
    //CP_Log(FA_COMMON,DEBUG,"tr "+it+":\n"+ tags[it].innerHTML);
  //  tags = document.getElementsByTagName("table");

  for (i=7;i<tags.length;i+=13)
  {
    //var tagID = tags[i].getAttribute("id");
    if(RegExp("planetId=").test(tags[i].innerHTML))
    {
      var val = new Array();   val = /planetId=(\d+)/(tags[i].innerHTML);
      var warning_presence = false;
      CP_Log(FA_COMMON,LOG,"ID: "+val[1]+", name:"+tags[i].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td: "+tags[i].innerHTML);
      var planet_id = +val[1];
      var planetNote = CP_getAttr("planetNote"+planet_id,"");
      var force_hide = (/\[-\]/(planetNote)!= null)?true:false;
      if (force_hide)
      {
       var theParentNode;
       for (it=12;it>=0;it--)
       {
          theParentNode = tags [i+it];
          theParentNode.parentNode.removeChild(theParentNode);
       }
       /*
        theParentNode = tags[i+29].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+27].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+2].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+1].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i].parentNode; theParentNode.parentNode.removeChild(theParentNode); */
        i--; // as we deleted the current row, make sure we revisit the new one that pops into this place
      }
      else
      {
        addNote(tags[i].cells[0],"planetNote"+planet_id);
      }

      
      //  Offset - what
      //  0 - name, coords, warnings (div id="planet_header_[planet_id]_tooltip"
      //  1 - population, morale
      //  2 - master cell for further data
      //  5 - Energy amount in % (<div id ="resource_amount_1_[planet_id]_tooltip"
      //  7 - Energy amount in number
      // 11 - Organics amount in % (<div id ="resource_amount_2_[planet_id]_tooltip"
      // 13 - Organics amount in number
      // 17 - Metal amount in % (<div id ="resource_amount_3_[planet_id]_tooltip"
      // 19 - Metal
      // 23 - Cristal
      // 25 - Cristal
      // 27 - actions
      // 28 - queue
      //CP_Log(FA_COMMON,DEBUG,"td1: "+tags[i+ 1].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td5: "+tags[i+ 5].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td7: "+tags[i+ 7].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td11: "+tags[i+11].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td13: "+tags[i+13].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td17: "+tags[i+17].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td19: "+tags[i+19].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td23: "+tags[i+23].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td25: "+tags[i+25].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td26: "+tags[i+26].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td27: "+tags[i+27].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td28: "+tags[i+28].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td29: "+tags[i+29].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td30: "+tags[i+30].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"parent: "+tags[i].parentNode.innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"parentSibling: "+tags[i].nextSibling.innerHTML);
      /*  var planet_id = +val[1];
      var warning_div = document.getElementById("planet_header_"+planet_id+"_tooltip");
      if (warning_div != null) warning_presence = true;
      val = /Zapotrzebowanie: (\d+) \((\d+)/(tags[i+1].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"val "+val);
      var pop = /Populacja: (\d+)/(tags[i+1].innerHTML)[1];
      var pop_needed = val[1];
      var pop_needed_perc = val[2];
      var morale = +(/Morale: (-?\d+)/(tags[i+1].innerHTML)[1]);
    for (j = 1; j <=4;j++)
      {
        res_div = document.getElementById("resource_amount_"+j+"_"+planet_id+"_tooltip");
        resources[j-1].perc   = /(\d+)/(res_div.innerHTML)[1];
        temp_tag = tags[i+((j-1)*6)+7];
        val = /(\d+)\w? \/ (\d+)/(temp_tag.innerHTML);
        if (temp_tag.getAttribute("class") == "warning") resources[j-1].warn = true;
        else resources[j-1].warn = false;
        resources[j-1].amount = val[1];
        resources[j-1].max    = val[2];
      }
      queue = /W budowie: (\d+)/(tags[i+28].innerHTML)[1];
      var planetNote = CP_getAttr("planetNote"+planet_id,"");
      var force_hide = (/\[-\]/(planetNote)!= null)?true:false;

      //val = /(\d+) \/ (\d+)/(tags[i+28].innerHTML);
      var planet_show = false;
      if( (!force_hide)
          &&
          ( (warning_presence)
            ||(pop_needed_perc<100)
            ||(morale < 0)
            ||(resources[0].warn)
            ||(resources[1].warn)
            ||(resources[2].warn)
            ||(resources[3].warn)
            ||((resources[0].perc>95)&&(resources[2].perc>95)&&(resources[3].perc>95))
            ||(queue==0)
        ) ) planet_show = true;
      CP_Log(FA_COMMON,DEBUG,"Planet id: "+planet_id+
             ", Warning: "+warning_presence+
             ", Pop: "+pop+"/"+pop_needed+"("+pop_needed_perc+")"+
             ", Morale: "+morale+
             ", Energy: "+resources[0].amount+"/"+resources[0].max+"("+resources[0].perc+")"+(resources[0].warn?"!":"")+
             ", Organics: "+resources[1].amount+"/"+resources[1].max+"("+resources[1].perc+")"+(resources[1].warn?"!":"")+
             ", Metal: "+resources[2].amount+"/"+resources[2].max+"("+resources[2].perc+")"+(resources[2].warn?"!":"")+
             ", Cristal: "+resources[3].amount+"/"+resources[3].max+"("+resources[3].perc+")"+(resources[3].warn?"!":"")+
             ", Queue length: "+queue+
             ", Force hide: "+force_hide+
             ", Hide: "+!planet_show
             );

      if (!planet_show)
      {
       var theParentNode;
        theParentNode = tags[i+29].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+27].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+2].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+1].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        i--; // as we deleted the current row, make sure we revisit the new one that pops into this place
      }
      else
      {
        addNote(tags[i],"planetNote"+planet_id);
      }   */
    }
  }
}


// ===========================Capture funcs==================================

// function grab_menu    Checks whether script is run in menu panel and calls correcting function
function grab_menu()
{
    if(
        (RegExp("menu.jsp").test(window.location.href ))
      )
    {
        CP_Log(FA_MENU,LOG,"Menu correction");
        correct_menu();
        implement_context_menu();
    }
}

// function grab_group_details    Checks whether script is run in menu panel and calls correcting function
function grab_group_details()
{
    if( (CP_getAttr("C_TWEAK_FLEET_GROUPS",1) !=0 ) &&
        (RegExp("fleet_group_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet group correction");
        correct_fleet_group();
    }

    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_group_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Movement correction");
        enhance_fleet_movement_group();
    }
}

// function grab_fleet_details    Checks whether script is run in menu panel and calls correcting function
function grab_fleet_details()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet correction");
        enhance_fleet_movement_fleet();
    }
}

// function grab_fleet_transfer    Checks whether script is run in fleet transfer screen
// and calls correcting function
function grab_fleet_transfer()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet/transfer_fleet.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet transfer correction");
        enhance_fleet_transfer();
    }
}

// function grab_fleet_move_confirm    Checks whether script is run in
//               move confirmation page and calls correcting function
function grab_fleet_move_confirm()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleetgroup/fleet_group_move_confirm.htm").test(window.location.href)
        ||RegExp("fleet/show_fleet_move_confirm.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet move correction");
        correct_ship_speeds();
    }
}

// function grab_planet    Checks whether script is run in planet page
//          and calls correcting function
function grab_planet()
{
    if((RegExp("planet/show_planet.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"Planet correction");
        correct_planet();
    }
}

// function grab_market    Checks whether script is run in market page
//          and calls correcting function
function grab_market()
{
    if((RegExp("building/market.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"---Market correction---");
        correct_market();
    }
}

// function grab_planet    Checks whether script is run in planet list page
//          and calls correcting function
function grab_planet_overview()
{
    /* martwy feature
    if((RegExp("planet/show_planets_overview.htm").test(window.location.href))
        &&(RegExp("filter=").test(window.location.href)))
    {
            CP_Log(FA_COMMON,LOG,"Planets overview correction");
            correct_planet_overview(1);
    } */
    if(CP_getAttr("sowafeature_3",1)==1)
    {
        if((RegExp("planet/show_planets_overview.htm").test(window.location.href))
            ||(RegExp("messages/read_message.htm").test(window.location.href))
            ||(RegExp("fleet/fleet_action_chooser.jsp").test(window.location.href))
            ||(RegExp("scanning").test(window.location.href))
            ||(RegExp("fleetgroup/fleet_group_details.htm").test(window.location.href))
            ||(RegExp("fleet/fleet_details.htm").test(window.location.href))
            ||(RegExp("fleetgroup/fleet_group_overview.htm").test(window.location.href))
            ||(RegExp("fleet/fleet_overview.htm").test(window.location.href))
            ||(RegExp("spy/spy_list.htm").test(window.location.href))
            ||(RegExp("planet/show_all_notes.htm").test(window.location.href)))
        {
                paint_planets(window.location.href);
        }
    }
}

// function grab_persons    Checks whether script is run on Persons page and runs correcting function
function grab_persons()
{
    if( ((CP_getAttr("C_TWEAK_PEOPLE_LIST",1)!=0) && (RegExp("persons_list.htm").test(window.location.href)))
        || ((CP_getAttr("sowafeature_3",1)==1) && (RegExp("spy_action.htm").test(window.location.href))) )
    {
        CP_Log(FA_PERSON,LOG,"Persons correction");
        correct_persons();
    }
    else if((CP_getAttr("sowafeature_3",1)==1) && (RegExp("building/university.htm").test(window.location.href)))
    {
        window.setTimeout(function(){correct_persons();}, 200);
    }
}

// function grab_position    Checks whether script is run on position page and runs correcting function
function grab_position()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_action_chooser").test(window.location.href))
      )
    {
        CP_Log(FA_POS,LOG,"Position correction");
        correct_position();
    }
}

// function grab_config    Checks whether script is run on a fake page and substitutes it with config page
function grab_config()
{
    if( RegExp("action=cptweaks_config").test(window.location.href))
    {
        CP_Log(FA_COMMON,LOG,"Config");
        cptweaks_config();
    }
}

// function grab_main    Checks whether script is run on main page
function grab_main()
{
    if(
        (RegExp("main.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"Get username");
        get_username();
    }
}

// function grab_www    Checks whether script is run with www pefix
function grab_www()
{
    if(
        (RegExp("www.").test(window.location.href))
      )
    {
         g_www = true;
         g_username = GM_getValue("C_WWW_USERNAME","");
    }
    else
    {
        g_username = GM_getValue("C_USERNAME","");
    }
}

function grab_added_fleets()
{
    if((RegExp("show_ready_to_add_fleets").test(window.location.href)) && ((CP_getAttr("sowafeature_2",1)==1)))
    {
        tmout_apply_fleet_filter(document);
    }
}

function grab_subpages()
{
    enhance_messages();
    enhance_info_screen();
    enhance_battles();
    grab_added_fleets()

    if(CP_getAttr("sowafeature_4",1)==1) {
        add_building_bar();
    } if(CP_getAttr("sowafeature_5",1)==1) {
        add_procurment_bar();
    } if(CP_getAttr("sowafeature_6",1)==1) {
        add_spy_settings_bar();
        read_spy_settings();
    }
}

grab_www();
grab_config();
grab_main();
grab_planet_overview();

window.addEventListener("load", grab_skin, false);
window.addEventListener("load", grab_menu, false);
window.addEventListener("load", grab_group_details, false);
window.addEventListener("load", grab_fleet_details, false);
window.addEventListener("load", grab_fleet_transfer, false);
window.addEventListener("load", grab_fleet_move_confirm, false);
window.addEventListener("load", grab_persons, false);
window.addEventListener("load", grab_position, false);
window.addEventListener("load", grab_planet, false);
window.addEventListener("load", grab_market, false);
window.addEventListener("load", grab_subpages, false);
