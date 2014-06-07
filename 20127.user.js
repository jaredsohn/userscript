// ==UserScript==
// @name           CosmopulseMenuExtender v0.1
// @namespace      localhost
// @description    Cosmopulse Menu Extender
// @include        http://cosmopulse.net/*
// @include        http://www.cosmopulse.net/*
// ==/UserScript==
 
var collapse_src = "/skins/minimal/icons/collapse.gif";
var expand_src = "/skins/minimal/icons/expand.gif";
var Planets = new Array();
var PlanetNames = new Array();
var showMenuAcademy = new Array();
var showMenuShipyard = new Array();
var showMenuStocks = new Array();
var showMenuLab = new Array();
var showMenuDefense = new Array();
var showMenuCollector = new Array();
var showMenuSettings = new Array();
var numPlanets = 0;

function getExpandCollapseFiles() {
    var  i = 0;
    var c = 0;
    var  e = 0;
    var tags = new Array();
    tags = document.getElementsByTagName("script");
    for (i=0; i<tags.length; i++) {
        if (tags[i].text.indexOf("collapse.src = ") > 0) {
        tab = tags[i].text.split("'");
        collapse_src = tab[1];
        c = 1;
        // GM_log("collapse = " + collapse_src);
        }
        if (tags[i].text.indexOf("expand.src = ") > 0) {
        tab = tags[i].text.split("'");
        expand_src = tab[3];
        e =1;
        // GM_log("expand = " + expand_src);
        }
        if ((c > 0) && (e > 0))
        return;
    }
}
 
function getPlanetIdList(returnItemList) {
    var  i,  j;
    var tags = new Array();
    tags = document.getElementsByTagName("div");
    for (i=0, j=0; i<tags.length; i++) {
        tag_id = tags[i].getAttribute("id");
        if (RegExp("item_planets_").test(tag_id) && !RegExp("content").test(tag_id)) {
            var planet_id = tag_id.substring(tag_id.lastIndexOf("_")+1);
            // GM_log("----planet_id : "+planet_id+"----");
            returnItemList[j] = planet_id;
            j++;
        }
    }
    return j;
}
 
function getPlanetNameList(returnItemList) {
    var  i,  j;
    
    var tags = new Array();
    tags = document.getElementsByTagName("script");
    for (i=0, j=0; i<tags.length; i++) {
        if (RegExp("addMenuItem").test(tags[i].text) ) {
            if (RegExp(/planets_\d+/).test(tags[i].text) ) {
                var res = tags[i].text.split("'");
                // GM_log("["+ res[3] + "]");
                returnItemList[j] = res[3];
                j++;
            }
        }
    }
    return j;
}
 
function addMenuItem_(nameBase, itemLabel, pageLink, hasChildren, targetName) {
    var str = "";
    
    if (hasChildren) {
        str += "<a id=\"toggle_" + nameBase + "\" href=\"javascript:;\" onclick=\"toggle(\'toggle_img_" + nameBase + "\', \'item_" + nameBase + "_content\');\">";
        str += "<img id=\"toggle_img_" + nameBase + "\" src=\"" + expand_src + "\" border=\"0\" align=\"top\" width=\"16\" height=\"16\"/></a>";
    } else {
        str += "<img id=\"spacer_img_" + nameBase + "\" src=\"/images/spacer.gif\" border=\"0\" align=\"top\" width=\"16\" height=\"16\"/>";
    }
    
    if (pageLink != "") {
        if (targetName == "") {
            targetName = "main_panel";
        }
        str += "<A target=\"" + targetName + "\" href=\"" + pageLink + "\" name=\"Open\">" + itemLabel + "</A>";
    } else {
        str += itemLabel;
    }
    // str += "<a id=\"toggle_" + nameBase + "\" href=\"javascript:;\" onclick=\"toggle(\'toggle_img_" + nameBase + "\', \'item_" + nameBase + "_content\');\">";
    // str += "<img id=\"toggle_img_" + nameBase + "\" src=\"/skins/minimal/icons/expand.gif\" border=\"0\" align=\"top\" width=\"16\" height=\"16\"/></a>";
    // GM_log("Link added: " + str);
    return str;
}

function getMenuConfig(type, planetItemList, returnItemList, count) {
    for (i=0; i<count; i++) {
        var str;
        var keyValue;
        str = "Menu."+type+"."+planetItemList[i];
        // GM_log("Get: " + str);
        keyValue = GM_getValue(str);
        if ( !keyValue ) {
            // GM_log("No key : " + str);
            GM_setValue(str, 1);
            keyValue = 1;
        }
        returnItemList[i] = keyValue;
        // GM_log("value = " + returnItemList[i]);
    }
}

function grab_menu() {
    var element_ = document.getElementById("menu_panel");
    if ((window.location.href == "http://www.cosmopulse.net/menu.jsp") || (window.location.href == "http://cosmopulse.net/menu.jsp")) {
        getExpandCollapseFiles();
        getPlanetNameList(PlanetNames);
        numPlanets= getPlanetIdList(Planets);
        {
        // GM_log("Number of planets : " + numPlanets);
        // if (numPlanets>0) {
            // var str = "-> ";
            // for (i=0; i<numPlanets; i++)   str += Planets[i] + ",";
            // GM_log(str);
        // }
        }
        
    // pobierz konfiguracje
    getMenuConfig("Academy", Planets, showMenuAcademy, numPlanets);
    getMenuConfig("Shipyard", Planets,showMenuShipyard, numPlanets);
    getMenuConfig("Stocks", Planets,showMenuStocks, numPlanets);
    getMenuConfig("Laboratory", Planets,showMenuLab, numPlanets);
    getMenuConfig("Defense", Planets,showMenuDefense, numPlanets);
    getMenuConfig("EnergyCollector", Planets,showMenuCollector, numPlanets);
    getMenuConfig("PlanetSettings", Planets,showMenuSettings, numPlanets);
    
    // dodaj Menu Akademie
    var element_ = document.getElementById("item_planets");
    if (element_) {
        var string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_academies\" class=\"menu_item_level_1\">"  + addMenuItem_('academies', 'Akademie', '', true, "");
        string += "<div id=\"item_academies_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuAcademy[i]) {
                string += "<div id=\"item_academies_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'academies_" + Planets[i], PlanetNames[i], "/building/university.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);
        
        // dodaj Menu Stocznie
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_shipyard\" class=\"menu_item_level_1\">"  + addMenuItem_('shipyard', 'Stocznie', '', true, "");
        string += "<div id=\"item_shipyard_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuShipyard[i]) {
                string += "<div id=\"item_shipyard_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'shipyard_" + Planets[i], PlanetNames[i], "/building/shipyard.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);
        
        // dodaj Menu Gielda
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_stock\" class=\"menu_item_level_1\">"  + addMenuItem_('stock', 'Gieldy', '', true, "");
        string += "<div id=\"item_stock_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuStocks[i]) {
                string += "<div id=\"item_stock_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'stock_" + Planets[i], PlanetNames[i], "/building/market.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);   
        
        // dodaj Menu Laboratoria
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_lab\" class=\"menu_item_level_1\">"  + addMenuItem_('lab', 'Laboratoria', '', true, "");
        string += "<div id=\"item_lab_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuLab[i]) {
                string += "<div id=\"item_lab_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'lab_" + Planets[i], PlanetNames[i], "/building/laboratory.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);   
        
        // dodaj Menu struktury obronne
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_defense\" class=\"menu_item_level_1\">"  + addMenuItem_('defense', 'Struktury Obronne', '', true, "");
        string += "<div id=\"item_defense_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuDefense[i]) {
                string += "<div id=\"item_defense_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'defense_" + Planets[i], PlanetNames[i], "/defense/defense_overview.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);   
        
        // dodaj Menu Kolektory Energii
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_collector\" class=\"menu_item_level_1\">"  + addMenuItem_('collector', 'Kolektory Energii', '', true, "");
        string += "<div id=\"item_collector_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuCollector[i]) {
                string += "<div id=\"item_collector_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'collector_" + Planets[i], PlanetNames[i], "/building/energy_collector.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);   
        
        // dodaj Menu Ustawienia
        string = "";
        var newElement = document.createElement('div');
        string += "<div id=\"item_planet_settings\" class=\"menu_item_level_1\">"  + addMenuItem_('planet_settings', 'Ustawienia', '', true, "");
        string += "<div id=\"item_planet_settings_content\" class=\"menu_item_level_2\">";
        for (i=0; i<numPlanets; i++) {
            if (1 == showMenuSettings[i]) {
                string += "<div id=\"item_planet_settings_" + Planets[i] + "\" class=\"menu_item_level_2_element\">";
                string += addMenuItem_("'planet_settings_" + Planets[i], PlanetNames[i], "/planet/show_planet_settings.htm?planetId=" + Planets[i], false, "");
                string += "</div>";
            }
        }
        string += "</div></div>";
        newElement.innerHTML = string;
        element_.parentNode.insertBefore(newElement, element_);
        }
    }
}
 
window.addEventListener("load", grab_menu, false);