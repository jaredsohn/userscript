// ==UserScript==
// @name          CP Tweaks
// @namespace     http://localhost
// @description   Usprawnione i uaktualnione rozszerzenia interfejsu dla gry CosmoPulse: www.cosmopulse.net
// @include       http://*cosmopulse.net/*
// ==/UserScript==
// console.log("CPTweaks Running!");
// v0.9.1 mod 16
// You may freely use, distribute and/or modify this script as long as
// the following credentials are included:
// Created by Jacek Siuda
// Modified by wiochmen, byry & meeshoo

// SOWAMODSte
// v0.7.6 mod 12  - historia wersji
// v0.7.6 mod 12a - dokup naprawione ;)
// v0.7.6 mod 13  - strona kadry, kolorkowanie, menu kontekstowe planety i dokup dostosowane do ostatnich zmian
// v0.7.6 mod 14  - przywrďż˝cenie funkcjonalnosci
// v0.7.6 mod 15  - funkcjonalnosc szpiegow dostosowana do zmian
// v0.7.6 mod 15a - korekta eksportow
// v0.7.6 mod 15b - korekta dokup
// v0.7.6 mod 15c - korekta nazewnictwa flot
// v0.7.6 mod 15d - korekta dokup ( kolejna )
// v0.7.6 mod 15e - korekta dokup ( kolejna )
// v0.7.6 mod 16  - dostosowanie release'u do wersji 5.x FF


// ENDSOWAMODS
const C_CPTWEAKS_VERSION_STRING = "v 0.9.1";
const C_SOWAMOD_VERSION_STRING = " mod 16"
const C_VERSION_STRING = C_CPTWEAKS_VERSION_STRING + C_SOWAMOD_VERSION_STRING;
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
var fas = new Array("Menu","Group","Ship","Person","Position","Planet",
                    "University","Common");
var severity_names = new Array("DEBUG","LOG", "WARN", "ERR", "CRIT");

var ftpbox_home_spy_actions = document.createElement("div");
var ftpbox_away_spy_actions = document.createElement("div");
var ftpbox_traitor_actions = document.createElement("div");
var ftpbox_spy_resources = document.createElement("div");
var ftpbox_fleet_filter_by_owner = document.createElement("div");
var ftpbox_fleet_filter_by_class = document.createElement("div");

var g_autobuild_planner = document.createElement("a");

// some globals for handling university tweaks
var g_editor_div;
var g_tweaked_person_id;
var _pd, _us, _dt, _od, _to, _td, _df, _zp, _mo, _ro, _rf, _ut;

// object containing editor
var g_dp_editor;

var planet = new Object();

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

const C_USE_LOCAL_STORAGE = false;
const C_GOOD_STATS_THRESHOLD = 20;

const C_SPEED_CALC_MAGNITUDE = 1000;
const C_CURRENT_FIGHTER_SPEED_FACTOR = 45* C_SPEED_CALC_MAGNITUDE/45;


// polish letters in unicode
// l&#x0142; o&oacute; s&#x015B;  z.&#x017C;  e&#x0119;
// L&#x141;  c&#x107;  a&#x0105;  S&#346; n&#x0144;
// more: www.eurofresh.se/unicode.htm

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

SowaSettingAdd( "alerts", 2, "W wiadomo&#x015B;ciach", "U g&oacute;ry strony",
    "", "", "", "", "", "", "", "", "");
SowaSettingAdd( "home_spy_actions", 3, "Ewakuacja", "Przejd&#378; do kontrwywiadu",
    "Przeprowad&#378; weryfikacj&#281;", "", "", "", "", "", "", "" ,"");
SowaSettingAdd( "away_spy_actions", 11, "Ewakuacja", "Przegl&#x0105;dowy raport",
    "Przejd&#378; do kontrwywiadu", "Sabotuj gie&#322;d&#x0119;", "Sabotuj magazyny",
    "Werbowanie", "Sabotuj inst. obronne", "Zbieraj inf. industrialne",
    "Zbieraj inf. militarne", "Zbieraj inf, naukowe", "Zbieraj inf. personalne");
SowaSettingAdd( "traitor_actions", 3, "Raport szpiegowski", "Status",
    "Zako&#324;cz wsp&#243;&#322;prac&#281;", "", "", "", "", "", "", "", "");
SowaSettingAdd( "spy_resources", 5, "Minimalne", "Ma&#x0142;e", "Przeci&#x0119;tne",
    "Wysokie", "Bez ogranicze&#324;", "", "", "", "", "", "");
SowaSettingAdd( "messages", 3, "Usprawnienia wiadomo&#x015B;ci",
    "Jako dodatkowe przyciski",
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

g_setup_picture = 'data:image/gif;base64,R0lGODlhIQAQAPcAAAAAAAEBAgICAgUFBgYHC'+
'AsLDQ0NDw8QEhMTFhYXGhobHhwcICEiJiQkKSUmKzAxNzg6QTo8RD4/R0BBSkJETUNFTkVGUE1PWU'+
'5QWk5QW1JTX1JUX1dZZVhaZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAIQ'+
'AQAAAIggABCBxIsKDBgwclXFjIsKHDhw8lDFR4YYPFixgzasS4UCKAhRs6iBxJsqRJkhsWCqx4kqRE'+
'CS9biky5MqTMDgJhCrxJ86NNmR5z8rxQ86ZIjxKM9mRpFKlSoj6NdnA6tGhToVWjSt35dCVTqU+hUt'+
'xItmzKC0EpQlzLFi3Ct3ARBgQAOw==';

// ========================Common/util funcs================================
var coordIDs = new Array("systemXPos", "systemYPos", "systemZPos", "planetXPos", "planetYPos", "planetZPos");
var positionHandEdited = false;

// logger defs
const FA_MENU = 0;
const FA_GROUP = 1;
const FA_SHIP = 2;
const FA_PERSON = 3;
const FA_POS = 4;
const FA_PLANET = 5;
const FA_UNI = 6;
const FA_SCAN = 7;
const FA_COMMON = 8;

const VERB = -1; // Verbose - all HTML dumps
const DEBUG = 0; // Debug messages
const LOG = 1; // Normal logs
const WARN = 2; // Warnings - somtething wrong but still able to handle
const ERR = 3; // Error - need code fixes
const CRIT = 4; // Error, cannot proceed
var debugSeverities =
//           MENU GROUP SHIP PERSON POS PLANET FA_UNI FA_SCAN FA_COMMON
  new Array (LOG, LOG,  LOG, LOG,   LOG,LOG,   LOG,   LOG,    LOG);


// Greasemonkey detection -> quick and dirty but should work
var g_GM_present = true;
if (typeof GM_deleteValue == 'undefined')
{
  g_GM_present = false;
  console.log("---CPTweaks running outside Greasemonkey---");
}
else
{
  GM_log("---CPTweaks running on Greasemonkey---");
}


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

function CP_do_log(p_fa,p_severity,p_log)
{
    if (g_GM_present)
    {
        GM_log(fas[p_fa]+"["+severity_names[p_severity]+"]: "+p_log);
    }
    else
    {
        console.log(fas[p_fa]+"["+severity_names[p_severity]+"]: "+p_log);
    }
}


function CP_Log(p_fa,p_severity,p_log)
{
    if(debugSeverities[p_fa] <= p_severity)
    {
        CP_do_log(p_fa,p_severity,p_log);
    }
}

function CP_do_get_attr(name, default_val)
{
    if (g_GM_present||C_USE_LOCAL_STORAGE)
    {
      var attr_ret = GM_getValue(name, default_val);
      // set that value to local storage immediately
      // to facilitate obsoleting GM_* functions
      localStorage.setItem(name, attr_ret);
      return (attr_ret);
    }
    else
    {
      var attr_ret = localStorage.getItem(name);
      if (!attr_ret)
      {
            return (default_val);
      }
      return (attr_ret);
    }
}

function CP_getAttr(name, default_val)
{
  var ret = CP_do_get_attr(g_username+"_"+name, default_val);
  CP_Log(FA_COMMON,DEBUG,"Get name="+name+", default="+default_val
         +", value="+ret);
  return (ret);
}

function CP_do_set_attr(name,value)
{
    if (g_GM_present||C_USE_LOCAL_STORAGE)
    {
       GM_setValue(name, value);
    }
    else
    {
       localStorage.setItem(name, value);
    }
}


function CP_setAttr(name,value)
{
  CP_Log(FA_COMMON,DEBUG,"Set name="+name+", value="+value);
  if (value != NaN)
     CP_do_set_attr(g_username+"_"+name,value);
}

function separate_thousands(value)
{
    var toReturn="";var i = 0;
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
        tekst += data.getDate() + ' ' + data.toTimeString().split(":")[0]
            + ':' + data.toTimeString().split(":")[1]
            + '</div></div><iframe src=\"http://sowa.servebeer.com/cgi-bin/version.cgi?v='
            + C_VERSION_STRING + '\"></iframe>';

        wersja.style.height = '97px';
        wersja.innerHTML = tekst;

        messages.insertBefore(wersja, messages.firstChild);
    }
}

function add_building_element(planet_id, id, caption)
{
    return '<a id="quickbuild_' + id
        + '" href="/planet/do_build_building.htm?planetId=' + planet_id
        + '&buildingTypeId=' + id
        + '&upgrade=true">' + caption + '</a>';
}

function add_building_bar() {
    if((RegExp("planet/show_planet.htm").test(window.location.href))) {
        var val = /planetId=(\d+)/i.exec(window.location.href);
        var planet_id = +val[1];

        var ftpbox_bud = document.createElement("div");
        budowanie = '<div style="position: relative; right: 0px; top: 5px; bottom: 5px; width: 45px;'
            + 'background: #000000; font-size: 9px"><center><B>BUDUJ:</B><br>'
            + add_building_element(planet_id,10,"E_")+'|'+ add_building_element(planet_id,11,"_O")+'<br>'
            + add_building_element(planet_id,12,"M_")+'|'+ add_building_element(planet_id,13,"_K")+'<br>'
            + add_building_element(planet_id,14,"CB")+'|'+ add_building_element(planet_id,35,"CA")+'<br>'
            + add_building_element(planet_id,15,"ST")+'|'+ add_building_element(planet_id,21,"SO")+'<br>'
            + add_building_element(planet_id,20,"LA")+'|'+ add_building_element(planet_id,30,"AK")+'<br>'
            + '<span style=\"font-size: 3px\"><br></span>'
            + add_building_element(planet_id,16,"KE")+'|'+ add_building_element(planet_id,17,"MO")+'<br>'
            + add_building_element(planet_id,18,"MM")+'|'+ add_building_element(planet_id,19,"MK")+'<br>'
            + add_building_element(planet_id,40,"GI")
            + '</center>'
            + '</div>';

        ftpbox_bud.style.position = 'fixed';
        ftpbox_bud.style.right = '5px';
        ftpbox_bud.style.top = '72px';
        ftpbox_bud.style.height = '125px';
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

function SowaSettingAdd(idTarget, quantity, itemLabel01, itemLabel02,
    itemLabel03, itemLabel04, itemLabel05, itemLabel06, itemLabel07,
    itemLabel08, itemLabel09, itemLabel10, itemLabel11)
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
        "<a class=\"menuItem level4\" target=\"main_panel\" href=\""
        + g_menuitems[menuId].Address
        + planetId + g_menuitems[menuId].Options + "\">" + g_menuitems[menuId].Caption
        + "</a>";

    return menuItemString;
}

function addMenuGroup(menuId)
{
    var menuGroupString =
        "<a class=\"menuItem level2\" target=\"main_panel\" href=\""
        + g_menugroups[menuId].Address
        + "\">" + g_menugroups[menuId].Caption + "</a>";

    return menuGroupString;
}

function addMenuItem_new(ifContainer, className, nameBase, targetName, itemLabel) {
    var MIstr = "";

    if(!ifContainer) {
        MIstr += "<a class=\"" + className + "\" href=\"" + nameBase
          + "\" target=\"" + targetName + "\">"
          + itemLabel + "</a>";
    } else {
        MIstr += "<a onmouseover=\"javascript:showExpandControl(this);\""
          + " onmouseout=\"javascript:hideExpandControl(this);\""
          + "class=\"" + className + "\" href=\"javascript:;\" "
          + "onclick=\"javascript:toggleItem(this);\">"
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
            anchor_obj.addEventListener('click', function(event)
                {correct_menu_item(event.target)},true);
        }
    }
}

function add_scriptcenter()
{
    var tags = Array();
    var delimiter = false;

    tags = document.getElementsByTagName ("a");
    for (i=0;i<tags.length;i++)
    {
        tag_id = tags[i].getAttribute("href");
        // tweaks menu
        if (RegExp("rules.htm").test(tag_id))
        {
          tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2',
            'settings.htm?action=cptweaks_config',
            'main_panel', 'Centrum skrypt&oacute;w');break;
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
          if(RegExp("Sojuszu").test(tags[i].innerHTML)
            &&(!RegExp("karcie").test(tags[i].innerHTML)))
          {
            tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2',
              '/alliance/alliance_shoutbox.htm', '_tab', 'Sojuszu (w karcie)');
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
          tags[i].parentNode.innerHTML += addMenuItem_new(false, 'menuItem level2',
            'settings.htm?action=cptweaks_config',
            'main_panel', 'Centrum skrypt&oacute;w');break;
        }
    }
}

// =========================NOTES HANDLING================================
function removeTags(sourceNote)
{
  var tags = new Array( /\[color=#([0123456789AaBbCcDdEeFf]+)\]/
                      , /\[szkolenie=(\w+)\]/
                      , /\[rozbudowa=(\w+)\]/
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
const SHIP_FIGHTER           = 0;const SHIP_CORVETTE          = 1;
const SHIP_DESTROYER         = 2;const SHIP_CRUISER           = 3;
const SHIP_LINE_CRUISER      = 4;const SHIP_POCKET_BATTLESHIP = 5;
const SHIP_BATTLESHIP        = 6;const SHIP_LPG               = 7;
const SHIP_TRANSPORT         = 8;const SHIP_COLONIZER         = 9;
const SHIP_PASSENGER        = 10;const SHIP_MAX              = 11;
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
  var ships = Array();var i = 0;
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
  var FleetNameBox = document.getElementsByName("targetFleetName")[1];
  if (FleetNameBox)
  {
      var setNameAnchor = document.createElement('a');
      setNameAnchor.innerHTML = "Ustaw nazw&#x0119;";
      setNameAnchor.setAttribute("href","");

      //CP_Log(FA_SHIP,DEBUG,"input node's parent : "+ FleetNameBox.parentNode.innerHTML);
      FleetNameBox.parentNode.insertBefore(setNameAnchor, FleetNameBox.nextSibling);
      setNameAnchor.addEventListener('click',update_name,true);
      configure_ship_types();
  }   // if not, we're not creating fleet
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
}

function secondsToTimeStr(inTime)
{
  var time = inTime;
  var sec = time%60;time = Math.floor(time/60);
  var mins = time%60;time = Math.floor(time/60);
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
  CP_Log(FA_POS,DEBUG,"Got to translate:"+inStr);
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
  CP_Log(FA_POS,DEBUG,"Calculated:"+retVal);
  return retVal;
}

function colonTimeStrToSeconds(inStr)
{
  CP_Log(FA_POS,DEBUG,"Got to translate:"+inStr);
  var retVal = 0;
  var val = Array();
  if (inStr.match(/(\d+)d/))
    retVal += +(/(\d+)d/i.exec(inStr))[1] * 60 * 60 * 24;
  val = /((\d+):)?(\d+):(\d+)/.exec(inStr);
  if (val[2]) retVal += +val[2] * 60 * 60;
  retVal += +val[3] * 60;
  retVal += +val[4];
  CP_Log(FA_POS,DEBUG,"Calculated:"+retVal);
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
          +", combo value: "+OfficerCombo.getAttribute("value")+", officer selected"
          +Officers[i].getAttribute("selected"));

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
    inputElement.setAttribute("type","text");inputElement.setAttribute("size","36");
    inputElement.setAttribute("id","posDetails");inputElement.setAttribute("name","posDetails");
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
        pids[max_pid++] = pid_parsed[1];
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
      stats[i].pid = pids[i];
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].dm = +val[1];
      stat_obj = document.getElementById("social_abilities_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].sa = +val[1];
      stat_obj = document.getElementById("determination_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].d  = +val[1];
      stat_obj = document.getElementById("bravery_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].br = +val[1];
      stat_obj = document.getElementById("offensive_tactics_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].ot = +val[1];
      stat_obj = document.getElementById("defensive_tactics_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].dt = +val[1];
      stat_obj = document.getElementById("military_expirience_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].me = +val[1];
      stat_obj = document.getElementById("leadership_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].ls = +val[1];
      stat_obj = document.getElementById("maxFleetSizeInfo_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].fs = +val[1];
      stat_obj = document.getElementById("payCoeff_"+pids[i]);
      val = /(\d+)/i.exec(stat_obj.innerHTML);stats[i].cost = +val[1];
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
    CP_do_set_attr("C_WWW_USERNAME", username);
  else
    CP_do_set_attr("C_USERNAME", username);
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

function add_checkbox(id, caption, defaultVal)
{
  var str = '<input type="checkbox" id="' + id + '"';
  if(CP_getAttr(id, defaultVal)==1) str+=" checked ";
  str += ">"+caption;
  return str;
}


function ShowHideSwitch(objId, show)
{
    if (show) {
        document.getElementById(objId).style.display = 'none' ;
    } else  {
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
        + "<tr class=\"contentRow0\"><td width=10></td><td><span class=\"actionBarItem\">"
        + add_checkbox("cptweaks_enabled", "Tweaksy w&#x0142;&#x0105;czone", 1)
        + "</span></td><td colspan=\"4\"></td></tr>"
        + "<tr class=\"contentRow1\"><td width=10></td><td width=195><b>SOWIE DODATKI:</b></td><td width=15></td>"
        + "<td width=344><b>OFICEROWIE:</b></td><td width=15></td><td><b>MENU PLANETY:</b></td></tr>"
        + "<tr class =\"separator\"></tr><tr><td rowspan=4></td>"
        + "<td valign=\"top\" class=\"actionBarContent\" rowspan=4>";

    //sowafeatures
    for (i=1;i<g_sowafeatures_counter;i++)
    {
        str += "<span class=\"actionBarItem\"><input type=\"checkbox\" id=\"sowafeature_"+i+"\"";
        if(CP_getAttr("sowafeature_"+i,1)==1) str+=" checked ";
        str += ">"+g_sowafeatures[i].Caption + "</span>";
    }

    // more sowasettings
    var messages_data = parseInt(CP_getAttr("sowasetting_5",1));
    str += "<span class=\"actionBarItem\"><input type=\"checkbox\" id=\"sowasetting_5\"";
    if(messages_data>0) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[0];

    // even more sowasettings
    str += "</span><table id=\"MessagesShowId\" class=\"pagesTable\" border=0 "
        + "cellspacing=0 cellpadding=0>"
        + "<tr><td width=15 rowspan=2></td><td><span class=\"actionBarItem\">"
        + "<input type=\"radio\" id=\"sowasetting_5-1\"";
    if(CP_getAttr("sowasetting_5",1)<2) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[1]+"</span></td></tr><tr><td>"
        + "<span class=\"actionBarItem\">"
        + "<input type=\"radio\" id=\"sowasetting_5-2\"";
    if(CP_getAttr("sowasetting_5",1)==2) str+=" checked ";
    str += ">"+g_sowasettings[5].Caption[2]+"</span></td></tr></table>";

    // note icon
    str += "<span class=\"actionBarItem\" style=\"margin-top:10px\">Ikonka notatki:</span>"
        + "<table border=0 class=\"pagesTable\"><tr>"
    for (i=0;i<3;i++)
    {
        str += "<td><input type=\"radio\" id=\"sowasetting_6-"+i+"\"";
        if(CP_getAttr("sowasetting_6",1)==i) str+=" checked ";
        str += "><img src=\""+g_note_picture[i]+"\"</td>";
    }

    str += "</tr></table>";
    //fleet description mask
    str += "</td><td rowspan=4></td><td valign=\"top\"><table class=\"invisible\">"
          + "<tr><td class=\"actionBarContent\">"
          + "<span class=\"actionBarItem\">&#346;rednie taktyki dobrego oficera "
          + add_textbox("person_stats",5,20) + "</span></td></tr><tr><td class=\"actionBarContent\"><hr/>"
          + "Wzorzec nazwy floty " + add_textbox("C_FLEET_DESC_STRING",32, C_FLEET_DESC_DEFAULT_STRING)
          + "<TABLE border=0><TR><TD>%R</TD><TD>- Rozmiar; </TD>"
          + "<TD>%S</TD><TD>- Sk&#x0142;ad; </TD>"
          + "<TD>%D, %d</TD><TD>- Dow&oacute;dca </TD></TR></TABLE>"
          + "<TABLE border=0><TR><TD><input type=\"checkbox\" id=\"store_officer_data\"";
    if(CP_getAttr("store_officer_data",0)==1) {officer_data = 1;str+=" checked ";};

    // save officer statistics + help
    str+= ">Zapisz statystyki oficera w FireFox</TD></TR></TABLE>";
    str += "<TABLE id=\"OfficerStoreDataId\" border=0>"
        + "<TR><TD>%A</TD><TD>- Max. Rozmiar Floty</TD><TD>%B</TD><TD>-   Podejmowanie decyzji</TD></TR>"
        + "<TR><TD>%C</TD><TD>- Umiej&#x0119tno&#347;ci spo&#x0142;eczne</TD><TD>%E</TD><TD>- Determinacja</TD></TR>"
        + "<TR><TD>%F</TD><TD>- Odwaga</TD><TD>%G</TD><TD>- Taktyka ofensywna</TD></TR>"
        + "<TR><TD>%H</TD><TD>- Taktyka defensywna</TD><TD>%I</TD><TD>- Dowodzenie flot&#x0105;</TD></TR>"
        + "<TR><TD>%J</TD><TD>- Zdolno&#347;ci przyw&oacute;dcze</TD></TR>"
        + "</TABLE></td></tr></table><br>";

    str += "</td><td></td><td valign=\"top\" rowspan=4><table class=\"invisible\">";

    // enable additional menuitems
    for (i=0;i<g_menuitems_counter;i++)
    {
        str += "<tr><td class=\"actionBarContent\"><span class=\"actionBarItem\">"
            + "<input type=\"checkbox\" id=\"menuitem_"+i+"\"";
        if(CP_getAttr("menuitem_"+i,1)==1) str+=" checked ";
        str += ">"+g_menuitems[i].Caption + "</span></td></tr>";
    }

    //additional filtering criteria
    str += "</table></td></tr><tr class=\"contentRow1\"><td><b>DODATKOWE KRYTERIA FILTROWANIA PLANET:</b></td></tr>"
        + "<tr class =\"separator\"></tr><tr><td valign=\"top\"><table class=\"invisible\"";

    //menu groups
    for (i=0;i<g_menugroups_counter;i++)
    {
        str += "<tr><td class=\"actionBarContent\"><span class=\"actionBarItem\">"
            + "<input type=\"checkbox\" id=\"menugroup_"+i+"\"";
        if(CP_getAttr("menugroup_"+i,1)==1) str+=" checked ";
        str += ">"+g_menugroups[i].Caption + "</span></td></tr>";
    }

    //footer/links
    str += "</table></td></tr></table></div><div class=\"pagesHeaderBox\"><div class=\"pagesHeaderLeftBlock\">"
        + "<div class=\"pagesHeaderSubText\">"
        + "<a href = \"http://userscripts.org/scripts/show/19615\""
        + "target = \"_new\"> CP Tweaks " + C_VERSION_STRING+"</a><br>Aktualizacja skryptu: "
        + "<a href = \"http://userscripts.org/scripts/source/19615.user.js\""
        + "target = \"_new\">[wersja stabilna]</a> "
        + "<a href = \"http://cptweaks.googlecode.com/git/cptweaks.user.js\""
        + "target = \"_new\">[wersja niestabilna]</a></div></div></div>";


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
    document.getElementById("cptweaks_enabled").addEventListener('click', function(event) {
        update_config_cbox(event.target)
    },true);
    //cptweaks_enabled
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
  return (k=="k")?1000:((k=="M")?1000000:(k=="G")?1000000000:1);
}

// ===========================PLANET==================================
function correct_planet()
{
  var val = /planetId=(\d+)/i.exec(window.location.href);
  var buildingNames = new Array(
      "Elektrownia", "Wytw.rnia substancji organicznych", "Kopalnia metalu",
      "Kopalnia kryszta.u", "Centrum budowlane", "Centrum administracyjne",
      "Stocznia", "Struktury obronne", "Laboratorium",
      "Akademia", "Kolektor energii", "Magazyn substancji organicznych",
      "Magazyn metalu", "Magazyn kryszta.u",
      "Gie.da");
  var resourceNames = new Array ("Energia", "Substancje Organiczne", "Metal", "Krysztal");
  // -------------------- planet object definition
  planet.buildings = new Object();
  planet.buildings.details = new Array();
  for (i=0;i<buildingNames.length;i++)
    {planet.buildings.details[i] = new Object();
      planet.buildings.details[i].upg = new Object();
      planet.buildings.details[i].upg.resources = new Array();
      planet.buildings.details[i].upg.small_stores = false;
      planet.buildings.details[i].upg.lacks = false;
    }
  planet.resources = new Array();
  for (i=0;i<4;i++) {
      planet.resources[i] = new Object();
      planet.resources[i].small_stores = false;
  }
  // --------------------
  var planet_id = +val[1];
  CP_Log(FA_PLANET,DEBUG,"Planet ID:"+planet_id);
  var tags = new Array();
  tags = document.getElementsByTagName("tbody");
  var descriptionTable = tags[3];
  tags = descriptionTable.getElementsByTagName("tr");
  var lastTr = tags[tags.length - 1];
  var newTR = document.createElement('tr');
  var newTD = document.createElement('td');
  newTD.setAttribute("colspan","3");
  newTR.appendChild(newTD);
  lastTr.parentNode.insertBefore(newTR, lastTr.nextSibling);
  addNote(newTD,"planetNote"+planet_id);
  var total_building_levels = document.getElementById("total_building_levels");
  CP_Log(FA_PLANET,VERB,"total_building_levels"+total_building_levels.innerHTML);
  //Budynki na planecie:290(+2) / 295&nbsp;&nbsp;Kolejka budowania: 2 / 8
  val = /zakolejkowane: (\d+) \/ (\d+)/i.exec(total_building_levels.innerHTML);
  planet.buildings.enqueued = +val[1];
  planet.buildings.max_queue =  +val[2];

  val = /Budynki na planecie: (\d+)\s+(\(\+(\d+)\))?\s*z (\d+)/i.exec(total_building_levels.innerHTML);
  planet.buildings.current = +val[1];
  planet.buildings.max = +val[4];
  planet.buildings.planned = planet.buildings.current + planet.buildings.enqueued;
  planet.buildings.free_queue = planet.buildings.max_queue - planet.buildings.enqueued;
  planet.buildings.available = planet.buildings.max - planet.buildings.planned;
  CP_Log(FA_PLANET,DEBUG,
     "enqueued:"+ planet.buildings.enqueued
    +";max_queue:"+ planet.buildings.max_queue
    +";current:"+ planet.buildings.current
    +";max:"+ planet.buildings.max
    +";planned:"+ planet.buildings.planned
    +";free_queue:"+ planet.buildings.free_queue
    +";available:"+ planet.buildings.available);


//  planet.buildings.enqueued = +val[3];

  // =========== resources ============
  for (i=0;i<4;i++)
  {
    tagid = "resource_desc_"+(i+1)+"_"+planet_id;
    //CP_Log(FA_PLANET,LOG,"tagid:"+document.getElementById(tagid).innerHTML);

    val = /([\d,]+)?([kM]?) \/ ([\d,]+)?([kM]?)/i.exec(
        document.getElementById("resource_desc_"+(i+1)+"_"+planet_id).innerHTML);

    val[1]=val[1].replace(/,/g,".");
    planet.resources[i].stores_current      = +val[1]*k_to_tsd(val[2]);
    val[3]=val[3].replace(/,/g,".");
    planet.resources[i].stores_max          = +val[3]*k_to_tsd(val[4]);

    planet.resources[i].stores_free = planet.resources[i].stores_max
                                    - planet.resources[i].stores_current;
    planet.resources[i].stores_max_final    = planet.resources[i].stores_max; //for further adjustment
    val = /(\d+) \((\d+) \/ (\d+)\)/i.exec(
        document.getElementById("resource_details_"+(i+1)+"_"+planet_id).innerHTML);
    //CP_Log(FA_PLANET,LOG,"val:"+val);
    planet.resources[i].prod_gross  = +val[2];
    planet.resources[i].consumption = +val[3];
    planet.resources[i].prod_net =
          planet.resources[i].prod_gross - planet.resources[i].consumption;
  }
  //CP_Log(FA_PLANET,LOG,"building html:"+document.getElementById("building_details_19").parentNode.innerHTML);
  CP_Log(FA_PLANET,DEBUG,"Planet data:"+planet.resources);
  // ================= buildings details ===============
  var tables = new Array();
  tables = document.getElementsByTagName("table");
  var building_names_found = new Array();

  var buildings = new Array();

  var tab_planets = document.evaluate('/HTML[1]/BODY[1]/DIV[5]/TABLE[2]', document,
            null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
  CP_Log(FA_PLANET,VERB,"buildings:"+tables[11].innerHTML);
  building_names_found = tables[11].getElementsByTagName("b");

  for(i=0;i<building_names_found.length;i++)
  {
     // This should point to <td> with info about whole building
     var building = building_names_found[i].parentNode;
     CP_Log(FA_PLANET,VERB,"building:" + buildingNames[i]+":"+building.innerHTML);
     var bld_no = get_building(building.innerHTML);
     if (bld_no != null)
     {
         var building_data = building.textContent;
         //CP_Log(FA_PLANET,DEBUG,"building:" + buildingNames[i]+":"+building_data);
         val = /Poziom: (\d+)(\s+Kondycja: (\d+)%)?/i.exec(building_data);
         if (val == null) continue;
         planet.buildings.details[i].lvl = +val[1];
         planet.buildings.details[i].cond = (+val[1] > 0)?+val[3]:100;
         val = /([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)\/([\d\,]+)([kM]?)/i.exec(building_data);
         if (val == null) continue;

         for (j=0;j<4;++j)
         {
                  val[2*j+1]=val[2*j+1].replace(/,/g,".");
                  planet.buildings.details[i].upg.resources[j] = +val[2*j+1]*k_to_tsd(val[2*j+2]);
                  if (planet.buildings.details[i].upg.resources[j] > planet.resources[j].stores_max) {
                      planet.buildings.details[i].upg.small_stores = true;
                      planet.resources[j].small_strores = true;
                      document.getElementById("quickbuild_"+staticBuildingIds[i]).style.color='red';
                  } else
                  if (planet.buildings.details[i].upg.resources[j] > planet.resources[j].stores_current){
                      planet.buildings.details[i].upg.lacks = true;
                      if (!planet.buildings.details[i].upg.small_stores) {
                          document.getElementById("quickbuild_"+staticBuildingIds[i]).style.color='yellow';
                      }
                  }
         }
         CP_Log(FA_PLANET,DEBUG,"building "+i+":"+buildingNames[i]
                                                +", level:"+planet.buildings.details[i].lvl
                                                +", resources:"+planet.buildings.details[i].upg.resources
                                                +", condition:"+planet.buildings.details[i].cond);
      }
  }


  var trs = new Array();
  var build_queue = new Array();

    //CP_Log(FA_PLANET,DEBUG,
    //  document.getElementsByClassName("contentRow0")[0].innerHTML);
//
   /* CP_Log(FA_PLANET,DEBUG,
      document.getElementsByName("buildings_progressActionForm")[0].parentNode.
      innerHTML);
    CP_Log(FA_PLANET,DEBUG,
      document.getElementsByName("buildings_progressActionForm")[0].parentNode.
      getElementsByClassName("contentRow0")[0]
      innerHTML);  */

  // =============== building upgrade/repair queue ==================
    //trs = tables[10].getElementsByTagName("div");
    var queueNode = document.getElementsByName("buildings_progressActionForm")[0];
    //if (queueNode) CP_Log(FA_PLANET,DEBUG,queueNode.parentNode.innerHTML);
    if(queueNode)
    {
      // there's something to do...
      CP_Log(FA_PLANET,DEBUG,"Kolejka zadan");
      trs = queueNode.parentNode.getElementsByTagName("tr");
      for(i=0;i<trs.length;i++)
      {
        if(/Budowa/i.exec(trs[i].innerHTML))
        {
           var bld_bld = get_building(trs[i].innerHTML);
           build_queue[build_queue.length]=bld_bld;
           CP_Log(FA_PLANET,DEBUG,i+"budowa:"+trs[i].cells[1].innerHTML
                      +"\n budynek:"+buildingNames[bld_bld]);
           if ((i ==1)&&(/W trakcie/i.exec(trs[i].cells[1].textContent)))
           {
             // time detection
             CP_Log(FA_PLANET,DEBUG,"Time:"+trs[i].cells[4].textContent+"=="+
                colonTimeStrToSeconds(trs[i].cells[4].textContent));
           }
                      
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
           CP_Log(FA_PLANET,DEBUG,i+"naprawa:"+trs[i].innerHTML
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
                  (planet.resources[j].lacks / planet.resources[j].prod_net));
                resorces_lacking_no++;
               }
               else
               {
                  planet.resources[j].lacks = 0;
                  planet.resources[j].time_needed = 0;
               }
               planet.resources[j].time_str = secondsToTimeStr(planet.resources[j].time_needed);
               if(planet.resources[j].lacks > 0)
               CP_Log(FA_PLANET,LOG,"Brakuje surowca: "+resourceNames[j]
                      +" ("+planet.resources[j].lacks
                      +"), czas oczekiwania przy wydobyciu "+planet.resources[j].prod_net
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
                +"&res="+seq[0] + "&production="+planet.resources[seq[0]].prod_net
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

             var new_button = document.createElement('span');
             new_button.setAttribute("class","actionBarItem");
             new_button.innerHTML = "<a ";
             market_string = '<span class="actionBarItem"><a href=\"'
                + market_string + '\">';
             market_string += '<img height=\"20\" align=\"top\" '
                + 'src=\"http://static.cosmopulse.net/skins/ecclite/opt/misc/money.gif\" '
                + 'style=\"border: none;\"> Dokup surowce</a></span>';
             tables[tables.length-6].getElementsByTagName("span")[0].innerHTML += market_string;
             //break;
           }
        }
     }
  }
  //save build queue for further reference
  planet.buildings.build_queue = build_queue;
  CP_Log(FA_PLANET,LOG,"Zakolejkowane: "+ build_queue);
// =============== attach editor, run assistannt ==================
// quiet assumption that navbar is always present
  var navbar = document.getElementsByClassName("navbar")[0].getElementsByTagName("div")[1];
  CP_Log(FA_PLANET,VERB,"NAVBAR:"+navbar.innerHTML);
  g_autobuild_planner.innerHTML = '<img src="'+g_setup_picture+'" border="0" align="top"/>';
  g_autobuild_planner.title = "Plany";
  g_autobuild_planner.addEventListener('click',
      function(event) {planet_dp_list_show();},true);
  navbar.insertBefore(g_autobuild_planner, navbar.firstChild);
  auto_building();
}

function launch_reloader()
{
    var tr;
    if (document.getElementsByName("buildings_progressActionForm")&& document.getElementsByName("buildings_progressActionForm")[0]
                  .parentNode.getElementsByTagName("tr"))
    tr = document.getElementsByName("buildings_progressActionForm")[0]
                  .parentNode.getElementsByTagName("tr")[1];
    if(/Budowa/i.exec(tr.innerHTML))
    if (/W trakcie/i.exec(tr.cells[1].textContent))
    {
      var secs = colonTimeStrToSeconds(tr.cells[4].textContent);
      // time detection
      CP_Log(FA_PLANET,DEBUG,"Time:"+tr.cells[4].textContent+"=="+
        secs);
    } else if (/Finalizowanie/i.exec(tr.cells[1].textContent))
    {
      secs = 10;
    }
}

function autobuild_done(id)
{
  CP_Log(FA_UNI,LOG,"Enqueue:"+id);
  planet.buildings.build_queue[planet.buildings.build_queue.length]=id;
  if (id == 4) { // CB will increase available space
    planet.buildings.available += (planet.buildings.details[4].lvl + 1)/5;
  }
  planet.buildings.planned++;
  planet.buildings.available--;
  planet.buildings.enqueued++;
  planet.buildings.free_queue--;
  find_next_building();
  //we need to wait a bit so that HTTP request is sent
  //window.setTimeout(function(){}, 100);

}

function buildings_enqueued(id)
{
  CP_Log(FA_UNI,DEBUG,"Enqueued?:"+id
      +"; queue_size:"+planet.buildings.build_queue.length
      +"queue:"+planet.buildings.build_queue);
  var ret = 0;
  for (bld_iter=0; bld_iter < planet.buildings.build_queue.length; bld_iter++)
  {
    //CP_Log(FA_UNI,DEBUG,"Comparing with:"+planet.buildings.build_queue[bld_iter]);
    if (+planet.buildings.build_queue[bld_iter] == +id) ret++;
  }
  return ret;
}



// semi automate for building construction
function find_next_building()
{
  var planet_id = +/planetId=(\d+)/i.exec(window.location.href)[1];
  //convinience variables
  bld = planet.buildings;
  res = planet.resources;

  //index for resources
  var E=0;O=1;M=2;K=3;
  var E_=0;O_=1;M_=2;K_=3;CB=4;CA=5;ST=6;SO=7;LA=8;AK=9;KE=10;MO=11;MM=12;MK=13;GI=14;

  if ((planet.buildings.free_queue ==0)||(planet.buildings.available <0))
  {
    //no more space in the queue
    return;
  }
  /*CP_Log(FA_UNI,LOG, "c:"+ res[M].stores_current
              +", m:"+res[M].stores_max
              +", f:"+res[M].stores_free
              +", p:"+res[M].prod_net);     */
  for (var iter_dp_j=0; iter_dp_j < g_dp_editor.conditionsNum;++iter_dp_j)
  {
    CP_Log(FA_UNI,DEBUG,"Matching condition:"+g_dp_editor.conditions[iter_dp_j].condition);
    // primary logic: there can be only limited number of enqueued buildings of
    // the same type, otherwise we'd stick in first rule that matches
    if(eval(g_dp_editor.conditions[iter_dp_j].condition)
      && (buildings_enqueued(g_dp_editor.conditions[iter_dp_j].building)
           <= g_dp_editor.conditions[iter_dp_j].limit))
    {
      if(g_dp_editor.conditions[iter_dp_j].building==15) {
        CP_Log(FA_UNI,LOG,"Matched rule:"
        + g_dp_editor.conditions[iter_dp_j].condition + "->STOP");
        return;
      }
      CP_Log(FA_UNI,LOG,"Matched rule:"+g_dp_editor.conditions[iter_dp_j].condition
        +"->"+g_dp_editor.buildingSh[g_dp_editor.conditions[iter_dp_j].building]);
      g_dp_editor.addAutoBuilding(planet_id, iter_dp_j);
      autobuild_done(g_dp_editor.conditions[iter_dp_j].building);
      return;
    }
  }
  //Nothing matched
  return;
}

// semi automate for building construction
function auto_building()
{
    var planet_id = +/planetId=(\d+)/i.exec(window.location.href)[1];
    note = CP_getAttr("planetNote"+planet_id,"");
    if (!g_dp_editor)
    {
      g_dp_editor = new PlanetPlanEditor();
      var q_len = (planet.buildings.free_queue < planet.buildings.available)
          ?(planet.buildings.free_queue):(planet.buildings.available + 1);
      g_dp_editor.loadNames();
    }

    for (iter_dp = 0; g_dp_editor.planNames[iter_dp]; ++iter_dp)
    {
        var match_string = "\\[rozbudowa="+g_dp_editor.planNames[iter_dp]+"\\]";
        CP_Log(FA_UNI,DEBUG,"Matching plan:"+match_string);
        if(RegExp(match_string).test(note))
        {
            CP_Log(FA_UNI,LOG,"Matched plan:"+iter_dp+":"+g_dp_editor.planNames[iter_dp]);
            g_dp_editor.addAutobuildBox(q_len);
            g_dp_editor.planLoad(iter_dp);
            find_next_building();
        }
    }
}

function correct_market()
{
  var timefor100k = document.getElementsByTagName("span")[7];
  CP_Log(FA_PLANET,LOG,"span="+timefor100k.outerHTML);
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
        if(RegExp("spy/spy_list.htm").test(window.location.href))
        {
           sid_parsed = /spy_action.htm\?spyId=(\d+)/i.exec(href);

           if((sid_parsed)
              && (RegExp("U.piony").test(anchors[i].innerHTML)
                  || RegExp("Prowadz").test(anchors[i].innerHTML)))
           {
              anchors[i].setAttribute('target', '"_blank"');
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
  var res_div;var temp_tag;
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
      var val = new Array();val = /planetId=(\d+)/(tags[i].innerHTML);
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
             ", Energy: "+resources[0].amount+"/"+resources[0].max
                +"("+resources[0].perc+")"+(resources[0].warn?"!":"")+
             ", Organics: "+resources[1].amount+"/"+resources[1].max
                +"("+resources[1].perc+")"+(resources[1].warn?"!":"")+
             ", Metal: "+resources[2].amount+"/"+resources[2].max
                +"("+resources[2].perc+")"+(resources[2].warn?"!":"")+
             ", Cristal: "+resources[3].amount+"/"+resources[3].max
                +"("+resources[3].perc+")"+(resources[3].warn?"!":"")+
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

// timeout for cheking university (heoroes) page, applies matching dev plan
function tmout_univ_hero(source)
{
  source = document.getElementById("person_short_info");
  if (source.getElementsByTagName("a").length > 0)
  {
     // New person found
     var anc = source.getElementsByTagName("a")[0];
     //CP_Log(FA_UNI,DEBUG,"Tmout:" +source.innerHTML);
     var person_id = anc.getAttribute("id").split("_")[2];

     //CP_Log(FA_UNI,DEBUG,"Tmout, pid:"+person_id+", tweaked:"+g_tweaked_person_id);
     if (person_id != g_tweaked_person_id)
     {
      //CP_Log(FA_UNI,DEBUG,"source:" +source.innerHTML);
      CP_Log(FA_UNI,LOG,"Person ID: "+person_id);
      // load new person
      var select_profile = document.getElementsByName("trainingProfileId")[0];
      var select_workload = document.getElementsByName("workloadLevel")[0];
      var select_cycles = document.getElementsByName("cycles")[0];
      //CP_Log(FA_UNI,LOG,"Profile ID: "+select_profile.selectedIndex);

      _pd = +document.getElementById("decision_making_"+person_id).textContent;
      _us = +document.getElementById("social_abilities_"+person_id).textContent;
      _dt = +document.getElementById("determination_"+person_id).textContent;
      _od = +document.getElementById("bravery_"+person_id).textContent;
      _to = +document.getElementById("offensive_tactics_"+person_id).textContent;
      _td = +document.getElementById("defensive_tactics_"+person_id).textContent;
      _df = +document.getElementById("military_expirience_"+person_id).textContent;
      _zp = +document.getElementById("leadership_"+person_id).textContent;
      _ro = +document.getElementById("maxDefenseSizeInfo_"+person_id).
            getElementsByTagName("b")[0].textContent;
      _rf = +document.getElementById("maxFleetSizeInfo_"+person_id).
            getElementsByTagName("b")[0].textContent;
      _mo = /(\d+)/i.exec(document.getElementById("morale_"+person_id).textContent)[1]
      _ut = /(\d+)/i.exec(document.getElementById("payCoeff_"+person_id).textContent)[1]
      var person_note = CP_getAttr("personNote"+person_id,"");
      CP_Log(FA_UNI,LOG,person_note+": "+_pd+"/"+_us+"/"+_dt+"/"+_od+" "
              +_to+"/"+_td+"/"+_df+"/"+_zp+" "
              +_ro+"/"+_rf+"/"+_mo+"/"+_ut);
      g_tweaked_person_id = person_id;
      for (iter_dp = 0; g_dp_editor.planNames[iter_dp] != undefined; ++iter_dp)
      {
          var match_string = "\\[szkolenie="+g_dp_editor.planNames[iter_dp]+"\\]";
          CP_Log(FA_UNI,LOG,"Matching plan:"+match_string);
          if(RegExp(match_string).test(person_note))
          {
              CP_Log(FA_UNI,LOG,"Matched plan:"+iter_dp+":"+g_dp_editor.planNames[iter_dp]);
              g_dp_editor.planLoad(iter_dp);
              for (var iter_dp_j=0; iter_dp_j < g_dp_editor.conditionsNum;++iter_dp_j)
              {
                  if(eval(g_dp_editor.conditions[iter_dp_j].condition))
                  {
                      CP_Log(FA_UNI,LOG,"Got condition:"+iter_dp_j+":"
                          +g_dp_editor.conditions[iter_dp_j].condition);
                      select_profile.selectedIndex =
                          g_dp_editor.conditions[iter_dp_j].training;
                      if (g_dp_editor.conditions[iter_dp_j].cost == "max")
                      {
                        select_workload.selectedIndex = (select_workload.length - 1);
                      } else if (g_dp_editor.conditions[iter_dp_j].cost == "mid")
                      {
                        select_workload.selectedIndex = (select_workload.length - 1)/2;
                      } else
                      {
                        select_workload.selectedIndex =
                            g_dp_editor.conditions[iter_dp_j].cost-1;
                      }
                      if (g_dp_editor.conditions[iter_dp_j].length == "max")
                      {
                        select_cycles.selectedIndex = (select_cycles.length - 1);
                      } else if (g_dp_editor.conditions[iter_dp_j].length == "mid")
                      {
                        select_cycles.selectedIndex = (select_cycles.length - 1)/2;
                      } else
                      {
                        select_cycles.selectedIndex = g_dp_editor.conditions[iter_dp_j].length-1;
                      }
                      switchExisting(false);
                      break;
                  }
              }
              break;
          }
      }
     }
  }
  window.setTimeout(function(){tmout_univ_hero(source)}, 300);

}

// class
function PlanEditor()
{
  this.idPrefix = "";
  this.planCurr = 0;
  this.name = "";
  this.conditions = new Array();
  this.conditionsNum = 0;
  //this.currId = 0;
  this.planNames = new Array();
  this.uiCreated = false;

  this.editorShow = function(clicked)
  {
    if (clicked.getAttribute("id") == "dp_plan_new")
    {
        //new
        this.listAdd();
    }
    else
    {
        this.planCurr = clicked.getAttribute("id").split("_")[3];
        this.planLoad(this.planCurr);
    }
    document.getElementById("dp_list").style.visibility = 'hidden';
    CP_Log(FA_COMMON,DEBUG,"Dev plan "+ this.planCurr +"open!");
    this.editorRedraw();
    document.getElementById("dp_editor").style.visibility = 'visible';
  }

  this.editorRedraw = function()
  {
    // override me!
    CP_Log(FA_COMMON,ERR,"ABSTRACT FUNCTION editorRedraw() CALLED!");
  }

  this.listAdd = function()
  {
    var iter_dp = 0;
    while (this.conditions[iter_dp])
    {
      delete this.conditions[iter_dp];
      iter_dp++;
    }
    this.name = "Nowy";
    this.conditionsNum = 0;
    this.conditionNew();
    this.planCurr = -1;
    document.getElementById("dp_list").style.visibility = 'hidden';
  }

  this.parseParams = function(params)
  {
    // override me!
    CP_Log(FA_COMMON,ERR,"ABSTRACT FUNCTION parseParams() CALLED!");
  }

  this.planLoad = function(planId)
  {
    var plans = CP_getAttr("person_dev_plans", 0);
    var params = new Array();
    if (planId >= plans)
      {
          //no such plan
          CP_Log(FA_COMMON,ERR,"NO SUCH PLAN!");
      }
    this.conditionsNum = CP_getAttr(this.idPrefix+"_dev_plan_"+planId+"_rules", 0);
    this.name = CP_getAttr(this.idPrefix+"_dev_plan_"+planId+"_name","Nowy");
    for (iter_dp = 0; iter_dp < this.conditionsNum; iter_dp++)
    {
      //dps_add_condition(iter_dp);
      params = CP_getAttr(this.idPrefix+"_dev_plan_"+planId+"_rule_"+iter_dp, null)
          .split('|');
      CP_Log(FA_COMMON,DEBUG,"rule "+iter_dp+": "+params);
      this.conditions[iter_dp] = this.parseParams(params);
    }
    this.conditions[iter_dp] = undefined;
    CP_Log(FA_COMMON,DEBUG,"Plan "+planId+" lodaed, name: "+this.name);
  }

  this.listRedraw = function()
  {
    if (!this.uiCreated)
    {
      this.addList();
      this.addEditor();
    }

    CP_Log(FA_COMMON,ERR,"PREFIX:"+this.idPrefix+"!");
    var plans = +CP_getAttr(this.idPrefix+"_dev_plans", 0);
    var dp_list_table = document.getElementById("dp_list_table");
    //header first
    dp_list_table.innerHTML = "";
    for (iter_dp = 0; iter_dp < plans;iter_dp++)
    {
      dp_list_table.innerHTML +=
          "<tr><td>"+(iter_dp+1)+".</td>"
          +"<td width=\"70%\">"+CP_getAttr(this.idPrefix+"_dev_plan_"+iter_dp+"_name", "(nul)")+"<td>"
          +"<td width=\"20%\">"
          +'<a href="#">'
          +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/quest.gif"'
          +' title = "Edytuj" id="dev_plan_edit_'+iter_dp+'"/></a>&nbsp;&nbsp;'
          +'<a href="#">'
          +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/cancel.gif"'
          +' title = "Usu&#x0144;" id="dev_plan_del_'+iter_dp+'"/></a>'
          //+"<a href=\"#\" id=\"dev_plan_edit_"+iter_dp+"\"></a>&nbsp;"
          //+"<a href=\"#\" id=\"dev_plan_del_"+iter_dp+"\">Usu&#x0144;</a>"
          +"</td></tr>";
    }
    CP_Log(FA_COMMON,DEBUG,"plans:"+plans+"\n");
    for (iter_dp = 0; iter_dp < plans;iter_dp++)
    {
      CP_Log(FA_COMMON,DEBUG,"plan "+iter_dp+":"
          + document.getElementById("dev_plan_edit_"+iter_dp).outerHTML);

      document.getElementById("dev_plan_edit_"+iter_dp).addEventListener('click',
        function(event) {g_dp_editor.editorShow(event.target);},true);
      document.getElementById("dev_plan_del_"+iter_dp).addEventListener('click',
        function(event) {g_dp_editor.planDel(event.target);},true);
    }
  }

  // adds (hidden) development plans list box to document body
  this.addList = function()
  {
    this.uiCreated = true;
    var list_div = create_window_div('dp_list', '73px', '22px', '600px', '450px');
    list_div.innerHTML =
    "<table align=\"center\" cellpadding=\"2\"><tr><td align=\"center\">"
    +"<table id = \"dp_list_table\" width = \"100%\">"
    +"</table>"
    +"<br/><a href=\"#\" id=\"dp_plan_new\">[Nowy plan]</a>"
    +" <a href=\"#\" id=\"dp_plan_close\">[Zamknij]</a>"
    +"</td></tr></table>";
    document.body.insertBefore(list_div, document.body.lastChild);
    this.listRedraw();
    document.getElementById("dp_plan_new").addEventListener('click',
      function(event) {g_dp_editor.editorShow(event.target);},true);
    document.getElementById("dp_plan_close").addEventListener('click',
      function(event)
      {document.getElementById("dp_list").style.visibility = 'hidden';},true);

    CP_Log(FA_COMMON,DEBUG,"Finished adding list for "+this.idPrefix+"!");
  }

  this.getLegendString = function()
  {
    //ovverride me!
  }

  this.editorRedraw = function()
  {
    //ovverride me!
  }

  this.addEditor = function()
  {
    editor_div = create_window_div('dp_editor', '25px', '22px', '700px', '650px');
    editor_div.innerHTML =
    "<table align=\"center\" cellpadding=\"2\"><tr><td align=\"center\">"
    +"Nazwa: <input type = \"text\" size = \"20\" id=\"dp_name\"/><br/>"
    +"<table id = \"dp_table\" width = \"100%\">"
    +"</table>"
    +"<br/><a href=\"#\" id=\"dp_table_add\">[Dodaj warunek]</a>"
    +" <a href=\"#\" id=\"dp_table_save\">[Zapisz]</a>"
    +" <a href=\"#\" id=\"dp_close\">[Zamknij]</a>"
    +"</td></tr></table>"
    // legend
    +this.getLegendString()
    +"</table>";
    document.body.insertBefore(editor_div, document.body.lastChild);
    document.getElementById("dp_table_add").addEventListener('click',
      function(event) {g_dp_editor.conditionAdd();},true);
    document.getElementById("dp_table_save").addEventListener('click',
      function(event) {g_dp_editor.planSave(g_dp_editor.planCurr);},true);
    document.getElementById("dp_close").addEventListener('click',
      function(event)
      {document.getElementById("dp_editor").style.visibility = 'hidden';},true);
    this.editorRedraw();
    CP_Log(FA_COMMON,DEBUG,"Finished adding editor!");
  }

  this.planStore = function()
  {
    //override me!
  }

  this.conditionNew = function()
  {
    //override me!
  }

  this.planSave = function (plan)
  {
    CP_Log(FA_COMMON,DEBUG,"Saving plan:"+plan+"; conditions:"+this.conditionsNum);

    this.planStore();

    // -1 => new plan to be saved
    if (plan == -1)
    {
      this.planCurr = plan = +CP_getAttr(this.idPrefix+"_dev_plans", 0);
      CP_setAttr(this.idPrefix+"_dev_plans", plan+1);
    }

    for (iter_dp = 0; iter_dp < this.conditionsNum; iter_dp++)
    {
        CP_setAttr(this.idPrefix+"_dev_plan_"+plan+"_rule_"+iter_dp,
          this.condition2Str(iter_dp));
    }
    CP_setAttr(this.idPrefix+"_dev_plan_"+plan+"_rules", iter_dp);
    CP_setAttr(this.idPrefix+"_dev_plan_"+plan+"_name", this.name);

    //verify
    CP_getAttr(this.idPrefix+"_dev_plans", 0);
    CP_Log(FA_COMMON,DEBUG,"plan:"+plan+"; rules:"
            +CP_getAttr(this.idPrefix+"_dev_plan_"+plan+"_rules",null));
    for (iter_dp = 0; iter_dp <
         +CP_getAttr(this.idPrefix+"_dev_plan_"+plan+"_rules",0); iter_dp++)
    {
      CP_Log(FA_COMMON,DEBUG,"Condtion:"
         +CP_getAttr(this.idPrefix+"_dev_plan_"+plan+"_rule_"+iter_dp,":("));
    }
    //now just reload names if they changed
    this.reloadNames();
  }

  this.reloadNames = function()
  {
    // re-load all plan names
    this.loadNames();
    this.listRedraw();
  }

  this.loadNames = function()
  {
    // pre-load all plan names
    var plans = +CP_getAttr(this.idPrefix+"_dev_plans", 0);
    for (iter_dp = 0; iter_dp < plans;iter_dp++)
    {
        this.planNames[iter_dp]=CP_getAttr(this.idPrefix+"_dev_plan_"+iter_dp+"_name", "(nul)");
    }
    this.planNames[iter_dp] = undefined;
    CP_Log(FA_COMMON,DEBUG,"Loaded plans("+plans+"):"+this.planNames);
  }

  this.condition2Str = function (i)
  {
    // abstract
  }

  this.conditionAdd = function()
  {
    this.planStore();
    this.conditionNew();
    this.editorRedraw();
  }

  this.conditionDel = function(clicked)
  {
    var row = +clicked.getAttribute("id").split("_")[1];
    this.planStore();
    CP_Log(FA_COMMON,DEBUG,"removing row: "+row+" from "+this.conditionsNum+" rows");
    this.conditionsNum--;

    for (iter_dp = row; iter_dp < this.conditionsNum; ++iter_dp)
    {
        CP_Log(FA_COMMON,DEBUG,"moving row: "+iter_dp
            + ": " + this.conditions[iter_dp+1] + "->"+this.conditions[iter_dp]);
        this.conditions[iter_dp] = this.conditions[iter_dp + 1];
    }

    this.conditions[this.conditionsNum] = undefined;
    this.editorRedraw();
  }

  this.conditionUp = function(clicked)
  {
    var row = +clicked.getAttribute("id").split("_")[1];
    this.planStore();
    if (row > 0)
    {
      var tmp = this.conditions[row-1];
      this.conditions[row-1] = this.conditions[row];
      this.conditions[row]   = tmp;
    }
    this.editorRedraw();
  }


// deletes dev plan
  this.planDel = function(clicked)
  {
      var to_delete = clicked.getAttribute("id").split("_")[3];
      CP_Log(FA_COMMON,DEBUG,"Removing dev plan "+ to_delete);

      //until the rest of plans
      for (dp_iter = to_delete; dp_iter < +CP_getAttr(this.idPrefix+"_dev_plans", 1)-1; dp_iter++)
      {
          CP_setAttr(this.idPrefix+"_dev_plan_"+dp_iter+"_name",
                     CP_getAttr(this.idPrefix+"_dev_plan_"+(dp_iter+1)+"_name", null));
          var rules = CP_getAttr(this.idPrefix+"_dev_plan_"+(dp_iter+1)+"_rules", null);
          CP_setAttr(this.idPrefix+"_dev_plan_"+dp_iter+"_rules",rules);
          for (j=0; j<rules; j++)
          {
              CP_setAttr(this.idPrefix+"_dev_plan_"+dp_iter+"_rule_"+j,
                  CP_getAttr(this.idPrefix+"_dev_plan_"+(dp_iter+1)+"_rule_"+j,null));
          }
      }

      CP_setAttr(this.idPrefix+"_dev_plans",
          +CP_getAttr(this.idPrefix+"_dev_plans", 1)-1);
      this.listRedraw();
  }

} //---class PlanEditor ---

PersonPlanEditor.prototype = new PlanEditor();
PersonPlanEditor.constructor = PersonPlanEditor;
PersonPlanEditor.prototype.baseClass = PlanEditor.prototype;

//class
function PersonPlanEditor()
//extends PlanEditor
{
  //@override
  this.idPrefix = "person";

  //@override
  this.editorRedraw = function()
  {
    var dp_table = document.getElementById("dp_table");
    //header first
    dp_table.innerHTML = "<tr><th></th><th>Warunek</th><th>Trening</th></tr>";
    document.getElementById("dp_name").setAttribute("value", this.name);
    document.getElementById("dp_name").value = this.name;
    var iter_dp = 0;
    while (this.conditions[iter_dp])
    {
      CP_Log(FA_UNI,DEBUG,"row:"+iter_dp+", condition:"+this.conditions[iter_dp].condition);
      dp_table.innerHTML +=
            "<tr><td>"+(iter_dp+1)+".</td>"
           +"<td><input type = \"text\" size = \"20\" id=\"condition_"
           +iter_dp+"\""
           +"value=\""+this.conditions[iter_dp].condition+"\"/></td><td>"
           +this.addTrainingCombo(iter_dp,this.conditions[iter_dp].training)
           +":<input type = \"text\" size = \"5\" id=\"cost_"+iter_dp+"\""
           +"value=\""+this.conditions[iter_dp].cost+"\"/>"
           +"/<input type = \"text\" size = \"5\" id=\"length_"+iter_dp+"\""
           +"value=\""+this.conditions[iter_dp].length+"\"/>"
           +'<a href="#">'
           +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/cancel.gif"'
           +' title = "Usu&#x0144;" id="cancel_'+iter_dp+'"/></a>'
           +((iter_dp>0)?' <a href="#">'
           +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/up.gif"'
           +' title = "W g&#x00f3;re" id="up_'+iter_dp+'"/></a>':'')
           +"</td></tr>"
      ;
      CP_Log(FA_UNI,DEBUG,"row:"+iter_dp+" added");
      iter_dp++;
    }

    for(iter_dp=0; this.conditions[iter_dp]; iter_dp++)
    {
        CP_Log(FA_UNI,DEBUG,"obj:"+document.getElementById("training_"+iter_dp) );
        document.getElementById("cancel_"+iter_dp).addEventListener('click',
            function(event) {g_dp_editor.conditionDel(event.target);},true);
        if (iter_dp>0)
            document.getElementById("up_"+iter_dp).addEventListener('click',
                function(event) {g_dp_editor.conditionUp(event.target);},true);
    }
  }

  //@override
  this.getLegendString = function()
  {
    return "<h3 align=\"center\"> Zmienne: </h3><table align=\"center\">"
    +"<tr><td>_pd</td><td>Podejmowanie Decyzji</td><td>_us</td><td>Umiej&#x0119;tno&#x015B;ci Spo&#x0142;eczne</td></tr>"
    +"<tr><td>_dt</td><td>Determinacja</td><td>_od</td><td>Odwaga</td></tr>"
    +"<tr><td>_to</td><td>Taktyka Ofensywna</td><td>_td</td><td>Taktyka Defensywna</td></tr>"
    +"<tr><td>_df</td><td>Dowodzenie Flot&#x0105;</td><td>_zp</td><td>Zdolno&#x015B;ci Przyw&#x00F3;dcze</td></tr>"
    +"<tr><td>_ro</td><td>Rozmiar Obrony</td><td>_rf</td><td>Rozmiar Floty</td></tr>"
    +"<tr><td>_mo</td><td>Morale</td><td>_ut</td><td>Utrzymanie</td></tr>";
  }

  //@override
  this.parseParams = function(params)
  {
      obj = new Object();
      obj.condition = params[0];
      obj.training = params[1];
      obj.cost = params[2];
      obj.length = params[3];
      return obj;
  }

  this.addTrainingCombo = function(id,val)
  {
    return "<select id=\"training_"+id+"\""
      +" selectedIndex=\""+val+"\">"
      +"<option value=\"5\""+((val==0)?" selected":"")+">Trening psychologiczny</option>"
      +"<option value=\"7\""+((val==1)?" selected":"")+">Trening mened&#x017C;erski</option>"
      +"<option value=\"10\""+((val==2)?" selected":"")+">Trening taktyczny og&oacute;lny</option>"
      +"<option value=\"11\""+((val==3)?" selected":"")+">Taktyka ofensywna</option>"
      +"<option value=\"12\""+((val==4)?" selected":"")+">Taktyka defensywna</option>"
      +"<option value=\"20\""+((val==5)?" selected":"")+">Dowodzenie flot&#x0105;</option>"
      +"</select>";
  }

  //@override
  this.planStore = function()
  {
    this.name = document.getElementById("dp_name").value;
    for (iter_dp = 0; this.conditions[iter_dp]; iter_dp++)
    {
      CP_Log(FA_UNI,DEBUG,"condition:"+iter_dp);
      this.conditions[iter_dp].condition =
          document.getElementById("condition_"+iter_dp).value;
      this.conditions[iter_dp].training =
          document.getElementById("training_"+iter_dp).selectedIndex;
      this.conditions[iter_dp].cost =
          document.getElementById("cost_"+iter_dp).value;
      this.conditions[iter_dp].length =
          document.getElementById("length_"+iter_dp).value;
    }
    this.conditionsNum = iter_dp;
  }

  //@override
  this.conditionNew = function()
  {
    obj = new Object();
    obj.condition = "_td < 20";
    obj.training = 2;
    obj.cost = "3";
    obj.length = "max";
    this.conditions[this.conditionsNum++] = obj;
    if (this.conditions[this.conditionsNum])
    {
      // cut old param

      this.conditions[this.conditionsNum]=null;
    }
  }

  //@override
  this.condition2Str = function (i)
  {
    return this.conditions[iter_dp].condition + "|" +
        this.conditions[iter_dp].training + "|" +
        this.conditions[iter_dp].cost + "|" +
        this.conditions[iter_dp].length;
  }

}
var staticBuildingIds = new Array (10,11,12,13,14,35,15,21,20,30,16,17,18,19,40);

PlanetPlanEditor.prototype = new PlanEditor();
PlanetPlanEditor.constructor = PlanetPlanEditor;
PlanetPlanEditor.prototype.baseClass = PlanEditor.prototype;

//class
function PlanetPlanEditor()
//extends PlanEditor
{
  //@override
  this.idPrefix = "planet";
  this.buildingIds = new Array (10,11,12,13,14,35,15,21,20,30,16,17,18,19,40);
  this.buildingSh = new Array("E_","O_","M_","K_","CB","CA","ST","SO","LA","AK","KE","MO","MM","MK","GI");
  this.autobuildDiv ;

  this.PlanetPlanEditor = function()
  {

  }

  //@override
  this.editorRedraw = function()
  {
    var dp_table = document.getElementById("dp_table");
    //header first
    dp_table.innerHTML = "<tr><th></th><th>Warunek</th><th>Budynek</th></tr>";
    document.getElementById("dp_name").setAttribute("value", this.name);
    document.getElementById("dp_name").value = this.name;
    var iter_dp = 0;
    var cond;
    while (this.conditions[iter_dp])
    {
      CP_Log(FA_PLANET,DEBUG,"row:"+iter_dp+", condition:"+this.conditions[iter_dp].condition);
      cond = "<tr><td>"+(iter_dp+1)+".</td>"
           +'<td><textarea rows = "2" cols="38" id="condition_'
           +iter_dp
           +'">'+this.conditions[iter_dp].condition+'</textarea></td>'
           +'<td>'+this.addBuildingCombo(iter_dp,this.conditions[iter_dp].building)
           +'<input type = "text" size = "2" id="limit_'
           +iter_dp+'" title="Limit" '
           +'value="'+this.conditions[iter_dp].limit+'"/>'
           +'<a href="#">' //http://static.cosmopulse.net/skins/ecclite/icons/quest.gif
           +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/cancel.gif"'
           +' title = "Usu&#x0144;" id="cancel_'+iter_dp+'"/></a>'
           +((iter_dp>0)?' <a href="#">'
           +'<img src="http://static.cosmopulse.net/skins/ecclite/icons/up.gif"'
           +' title = "W g&#x00f3;re" id="up_'+iter_dp+'"/></a>':'')
           +'</td>'
           +'</tr>'
      ;
      dp_table.innerHTML += cond;
      CP_Log(FA_PLANET,DEBUG,"row:"+iter_dp+" added:"+cond);
      iter_dp++;
    }

    for(iter_dp=0; this.conditions[iter_dp]; iter_dp++)
    {
        //CP_Log(FA_PLANET,DEBUG,"obj:"+document.getElementById("training_"+iter_dp) );
        document.getElementById("cancel_"+iter_dp).addEventListener('click',
            function(event) {g_dp_editor.conditionDel(event.target);},true);
        if (iter_dp>0)
            document.getElementById("up_"+iter_dp).addEventListener('click',
                function(event) {g_dp_editor.conditionUp(event.target);},true);
    }
  }

  //@override
  this.getLegendString = function()
  {
    return "<h3 align=\"center\"> Dane: </h3>"
    + "bld (-> budynki)</br>"
    + " + .enqueued (-> zakolejowane)</br>"
    + " + .max_queue (-> max dlugosc kolejki)</br>"
    + " + .free_queue (-> wolne miejsca w kolejce)</br>"
    + " + .current (-> obecna liczba budynkow)</br>"
    + " + .planned (-> planowana liczba budynkow)</br>"
    + " + .max (-> maksymalna liczba budynkow)</br>"
    + " + .available (-> liczba dostepnych do rozbudowy)</br>"
    + " + .details[] (-> szczegoly budynku, indeksy:E_,O_,M_,K_,CB,CA,ST,SO,LA,AK,KE,MO,MM,MK,GI)</br>"
    + " &nbsp; + .lvl (-> poziom)</br>"
    + " &nbsp; + .cond (-> kondycja)</br>"
    + " &nbsp; + .upg</br>"
    + " &nbsp; &nbsp; + .resources[](-> zasoby potrzebne do rozbudowy, indeksy : E,O,M,K)</br>"
    + " &nbsp; &nbsp; + .small_stores (-> za male magazyny!)</br>"
    + " &nbsp; &nbsp; + .lacks (-> brakuje jakiegos surowca do rozbudowy)</br>"
    + "res[] (-> zasoby, indeksy : E,O,M,K)</br>"
    + " + .stores_current (-> surowca w magazynach)</br>"
    + " + .stores_max (-> pojemnosc magazynu)</br>"
    + " + .stores_free (-> wolne miejsce magazynu: max - current)</br>"
    + " + .stores_max_final (-> pojemnosc po rozbudowie)</br>"
    + " + .small_strores (-> za mala pojemnosc na wybudowanie ktoregos z budynkow)</br>"
    + " + .prod_net (-> produkcja netto)</br>"
    + " + .prod_gross (-> produkcja brutto)</br>"
    + " + .consumption  (-> konsumpcja)</br>";
  }

  //@override
  this.parseParams = function(params)
  {
      obj = new Object();
      obj.condition = params[0];
      obj.building = +params[1];
      if (params[2])
      {
        obj.limit = +params[2];
      }
      else
      {
        obj.limit = 0;
      }

      return obj;
  }

  this.addBuildingCombo = function(id,val)
  {
    return "<select id=\"building_"+id+"\""
      +" selectedIndex=\""+val+"\">"
      +"<option value=\"10\""+((val==0)?" selected":"")+">Elektrownia</option>"
      +"<option value=\"11\""+((val==1)?" selected":"")+">Wytw&oacute;rnia substancji organicznych</option>"
      +"<option value=\"12\""+((val==2)?" selected":"")+">Kopalnia metalu</option>"
      +"<option value=\"13\""+((val==3)?" selected":"")+">Kopalnia kryszta&#x0142;u</option>"
      +"<option value=\"14\""+((val==4)?" selected":"")+">Centrum Budowlane</option>"
      +"<option value=\"35\""+((val==5)?" selected":"")+">Centrum Administracyjne</option>"
      +"<option value=\"15\""+((val==6)?" selected":"")+">Stocznia</option>"
      +"<option value=\"21\""+((val==7)?" selected":"")+">Struktury obronne</option>"
      +"<option value=\"20\""+((val==8)?" selected":"")+">Laboratorium</option>"
      +"<option value=\"30\""+((val==9)?" selected":"")+">Akademia</option>"
      +"<option value=\"16\""+((val==10)?" selected":"")+">Kolektor Energii</option>"
      +"<option value=\"17\""+((val==11)?" selected":"")+">Magazyn substancji organicznych</option>"
      +"<option value=\"18\""+((val==12)?" selected":"")+">Magazyn metalu</option>"
      +"<option value=\"19\""+((val==13)?" selected":"")+">Magazyn kryszta&#x0142;u</option>"
      +"<option value=\"40\""+((val==14)?" selected":"")+">Gielda</option>"
      +"<option value=\"41\""+((val==15)?" selected":"")+">STOP</option>"
      +"</select>";
  }

  //@override
  this.planStore = function()
  {
    this.name = document.getElementById("dp_name").value;
    for (iter_dp = 0; this.conditions[iter_dp]; iter_dp++)
    {
      CP_Log(FA_PLANET,DEBUG,"condition:"+iter_dp);
      this.conditions[iter_dp].condition =
          document.getElementById("condition_"+iter_dp).value;
      this.conditions[iter_dp].building =
          document.getElementById("building_"+iter_dp).selectedIndex;
      this.conditions[iter_dp].limit =
          document.getElementById("limit_"+iter_dp).value;
    }
    this.conditionsNum = iter_dp;
  }

  //@override
  this.conditionNew = function()
  {
    obj = new Object();
    if (this.conditionsNum==0)
      obj.condition = "(bld.free_queue==1)&&(bld.available <= bld.max_queue)";
    else
      obj.condition = "";
    obj.building = 5;
    obj.limit = 0;
    this.conditions[this.conditionsNum++] = obj;
    if (this.conditions[this.conditionsNum])
    {
      // cut old param

      this.conditions[this.conditionsNum]=null;
    }
  }

  //@override
  this.condition2Str = function (i)
  {
    return this.conditions[iter_dp].condition + "|" +
        this.conditions[iter_dp].building + "|" +
        this.conditions[iter_dp].limit;
  }

  this.addAutobuildBox = function (qsize)
  {
    this.editorDiv = create_window_div('autobuild_div', '5px', '54px'
        , (45+(28*qsize))+'px', '16px');
    this.editorDiv.innerHTML = 'AUTO: ';
    this.editorDiv.style.visibility = 'visible';
    document.body.insertBefore(this.editorDiv, document.body.lastChild);
  }

  this.addAutoBuilding = function (planetId, id)
  {

     this.editorDiv.innerHTML +=
        '[<a href="/planet/do_build_building.htm?planetId='+planetId
      + '&buildingTypeId='+this.buildingIds[this.conditions[id].building]
      + '&upgrade=true">'+this.buildingSh[this.conditions[id].building]
      + '</a>]';
  }
}

// shows current list of person dev plans
function dp_list_show()
{
  // upon first click, create object

  if (!g_dp_editor)
  {
      g_dp_editor = new PersonPlanEditor();
      g_dp_editor.addList();
      g_dp_editor.addEditor();
  }
  else
  {
      g_dp_editor.listRedraw();
  }
  document.getElementById("dp_list").style.visibility = 'visible';
}

// shows current list of dev plans
function planet_dp_list_show()
{
  // upon first click, create object
  if (!g_dp_editor)
  {
      g_dp_editor = new PlanetPlanEditor();
      g_dp_editor.addList();
      g_dp_editor.addEditor();
  }
  else
  {
      g_dp_editor.listRedraw();
  }
  document.getElementById("dp_list").style.visibility = 'visible';
}


// creates new window (align from: top, right)
function create_window_div(p_id, p_right, p_top, p_width, p_height)
{
    var retDiv = document.createElement('div');
    retDiv.style.position = 'fixed';
    retDiv.style.right = p_right;
    retDiv.style.top = p_top;
    retDiv.style.height = p_height;
    retDiv.style.width = p_width;
    retDiv.style.background = '#000000';
    retDiv.style.opacity = 0.95;
    retDiv.style.border = '1px solid grey';
    retDiv.style.overflow = 'auto';
    retDiv.style.visibility = 'hidden';
    retDiv.setAttribute("id", p_id);
    return retDiv;
}


// does corrections to university (academy) page
function correct_university()
{
    CP_Log(FA_UNI,DEBUG,"Correcting university page");
    var td_tag = document.getElementById("person_short_info");
    if (!g_dp_editor)
    {
      g_dp_editor = new PersonPlanEditor();
      // there's some bug, the below two need to be removed once found
      g_dp_editor.addList();
      g_dp_editor.addEditor();

    }

    if (td_tag)
    {
        //CP_Log(FA_UNI,DEBUG,"innerhtml: "+td_tag.innerHTML);
        g_dp_editor.loadNames();
        tmout_univ_hero(td_tag);
    }
    var navbar = document.getElementsByClassName("navbar")[0].getElementsByTagName("div")[1];
    CP_Log(FA_PLANET,VERB,"NAVBAR:"+navbar.innerHTML);
    g_autobuild_planner.innerHTML = '<img src="'+g_setup_picture+'" border="0" align="top"/>';
    g_autobuild_planner.title = "Plany";
    g_autobuild_planner.addEventListener('click',
        function(event) {dp_list_show();},true);
    navbar.insertBefore(g_autobuild_planner, navbar.firstChild);

    var action_menu = document.getElementsByClassName("actionBarContent")[0];
    var new_span = document.createElement('span');
    new_span.innerHTML = "<a href=\"#\">Plany rozwoju</a>";
    new_span.setAttribute("class","actionBarItem");
    new_span.addEventListener('click', function(event) {
            dp_list_show();
        },true);
    action_menu.insertBefore(new_span, action_menu.lastChild);
    //development_plans_add_list();
    //development_plans_add_editor();
}
var g_planets = new Array();

function add_planet(name, resources ,coords)
{
    var newid =g_planets.length;
    CP_Log(FA_SCAN,DEBUG,"Add Planet:"+name+"["+resources+"]:"+coords );
    g_planets[newid] = new Object();
    g_planets[newid].name = name;
    g_planets[newid].resources = resources;
    g_planets[newid].coords = coords;
}
// does corrections to university (academy) page
function systemscan_loaddata()
{
    CP_Log(FA_SCAN,DEBUG,"Correcting system scan page");
    var res_re = new Array( /Energia \((.+)\)/,/Substancje organiczne \((.+)\)/
              ,/Metal \((.+)\)/,/Kryszta. \((.+)\)/);
    var res = new Array();
    var tbody_tag = document.getElementsByClassName("pagesContentBox")[0]
            .getElementsByTagName("tbody")[0];
    for(i = 0; i < (tbody_tag.rows.length - 1)/3; i++)
    {
        var idx = 3*i + 1;
        var name =
            tbody_tag.rows[idx].cells[0].getElementsByTagName("a")[0].textContent;
        //CP_Log(FA_SCAN,DEBUG,tbody_tag.rows[idx+1].cells[0].textContent);
        var resources = new Array();
        for (j=0; j<res_re.length;j++)
        {
          res = res_re[j].exec(tbody_tag.rows[idx+1].cells[0].textContent);
          if (res&&res[0])
          {
              resources[j] = res[1];
          }
        }
        //CP_Log(FA_SCAN,DEBUG,"resources:"+resources);
        //var resources_txt = /Surowce:([.\n]+)/i.exec(tbody_tag.rows[idx+1].cells[0].textContent)[1];
        var coords = //new Array(); coords =
            tbody_tag.rows[idx].cells[2].getElementsByTagName("a")[0].innerHTML
            .split(":")[1];
        var coords_res = new Array; var coords_arr = new Array;
        coords_res = /([-\d]+),([-\d]+),([-\d]+)/.exec(coords);
        coords_arr[0] = coords_res[1];
        coords_arr[1] = coords_res[2];
        coords_arr[2] = coords_res[3];
        add_planet(name, resources, coords_arr);
    }
}

// does corrections to university (academy) page
function correct_systemscan()
{
    CP_Log(FA_SCAN,DEBUG,"Correcting system scan page");
    systemscan_loaddata();
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
        //correct_ship_speeds();
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


// function grab_university    Checks whether script is run on university page and runs correcting funcs
function grab_university()
{
    if(RegExp("university.htm").test(window.location.href))
    {
        CP_Log(FA_UNI,LOG,"University correction");
        correct_university();
    }
}

// function grab_systemscan    Checks whether script is run on system scan page and runs correcting funcs
function grab_systemscan()
{
    if(RegExp("planet_scan_system.htm").test(window.location.href))
    {
        CP_Log(FA_UNI,LOG,"System Scan correction");
        window.addEventListener("load", correct_systemscan, false);
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
         g_username = CP_do_get_attr("C_WWW_USERNAME","");
    }
    else
    {
        g_username = CP_do_get_attr("C_USERNAME","");
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
    }if(CP_getAttr("sowafeature_5",1)==1) {
        add_procurment_bar();
    }if(CP_getAttr("sowafeature_6",1)==1) {
        add_spy_settings_bar();
        read_spy_settings();
    }
}

function tweaks_init()
{
  grab_www();
  grab_config();
  grab_main();
  if (CP_getAttr("cptweaks_enabled", 1) == 0)
  {
     // do not modify anything if tweaks are disabled
     CP_Log(FA_COMMON,ERR,"CP Tweaks Disabled!");
     // but still we need to be able to enable tweaks back
     add_scriptcenter();
    return;
  }
  grab_planet_overview();
  grab_systemscan();

  window.addEventListener("load", grab_skin, false);
  window.addEventListener("load", grab_menu, false);
  window.addEventListener("load", grab_group_details, false);
  window.addEventListener("load", grab_fleet_details, false);
  window.addEventListener("load", grab_fleet_transfer, false);
  window.addEventListener("load", grab_fleet_move_confirm, false);
  window.addEventListener("load", grab_persons, false);
  window.addEventListener("load", grab_position, false);
  window.addEventListener("load", grab_subpages, false);//must be before planet
  window.addEventListener("load", grab_planet, false);
  window.addEventListener("load", grab_market, false);
  window.addEventListener("load", grab_university, false);
}

//run cp tweaks!
tweaks_init();