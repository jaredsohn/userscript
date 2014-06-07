// ==UserScript==
// @name        IkaStats PlugIn
// @namespace   http://ikastats.tk
// @version     0.5.6
// @copyright   2012 IkaStats.tk
// @description IkaStats PlugIn for Ikariam
// @include     http://s*.*.ikariam.*/*
// @exclude     http://support.*.ikariam.*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @downloadURL http://userscripts.org/scripts/source/130499.user.js
// @updateURL   http://userscripts.org/scripts/source/130499.meta.js
// ==/UserScript==
                  
var IkaStatsVersion = '0.5.6';
var IkaStatsURL = 'http://ikastats.tk/collector';
var lang = location.hostname.split('.')[1];
var server = location.hostname.split('.')[0];
var apikey = GM_getValue('ISAPI_' + server, '');

var language = {
    'de':{   optionsheader:'IkaStats Einstellungen', apitext:'API-Key', apibutton:'API-Key speichern', apisaved:'API-Key wurde gespeichert.', unknown:'Unbekannt', notsupported:'Diese Version des PlugIns funktioniert nicht mit der mobilen Version von Ikariam. Bitte installiere die mobile Version des IkaStats PlugIns.' },
    'en':{   optionsheader:'IkaStats Settings', apitext:'API-Key', apibutton:'Save API-Key!', apisaved:'API was saved.', unknown:'Unknown', notsupported:'This PlugIn version doesn\'t work with the mobile version of Ikariam. You need to get the mobile version of the IkaStats PlugIn.' }
}[lang];

function waitForKeyElements (selectorTxt, actionFunction, bWaitOnce, iframeSelector) {
    var targetNodes, btargetsFound;
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
            .find (selectorTxt);
    if (targetNodes  &&  targetNodes.length > 0) {
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
            if (!alreadyFound) {
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                1000
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

function submitData(inputData, inputView, ID) {
    var parameters = "Collector%5BISAPI%5D=" + apikey + "&Collector%5BID%5D=" + ID + "&Collector%5Bserver%5D=" + server + "&Collector%5Blang%5D=" + lang + "&Collector%5BinputData%5D=" + escape(inputData) + "&Collector%5BinputView%5D=" + inputView;
    GM_xmlhttpRequest({
            method:'POST',
            url:IkaStatsURL,
            headers:{
                'Content-type':'application/x-www-form-urlencoded',
                'User-agent':navigator.userAgent,
                'Accept':'application/atom+xml,application/xml,text/xml,text/html'
            },
            data:parameters,
            onload:function (r) {
            }
        }
    );
    delete(parameters);
}

function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function saveAPI() {
    var apikey = document.getElementById('ikastatsapi').value;
    if (apikey != null) {
        GM_setValue('ISAPI_' + server, apikey);
        document.getElementById('isapireturnbox').innerHTML = language.apisaved;
        document.getElementById('isapibutton').blur();
    }
}

function IkaStatsSettings() {
    var node = document.getElementById('tabAccountOptions');
    if(node != null) {
        addIkaStatsSettingsHTML(node);
        var button = document.getElementById('isapibutton');
        button.addEventListener('click', saveAPI, true);
    }
}

function addIkaStatsSettingsHTML(node) {
    $('#tabAccountOptions').append('<div id="ikaStatsSettings"><div class="contentBox01h"><h3 class="header">'+language.optionsheader+'</h3><div class="content"><table class="table01"><tbody><tr><td class="row_caption">'+language.apitext+' (<a href="http://ikastats.tk/help/plugin" target="_blank">?</a>)</td><td class="left"><input class="textfield" type="text" id="ikastatsapi" size="30" value="'+apikey+'"></td></tr></tbody></table><div class="centerButton"><input type="submit" class="button" id="isapibutton" value="'+language.apibutton+'"></div></div><div id="isapireturnbox" style="text-align: center;"></div><div class="footer"></div></div></div>');
}

function SaveCombatReport() {
    var inputData = document.getElementById("troopsReport").innerHTML;
    var inputView = "militaryAdvisorReportView";
    var ID = GM_getValue('combatId');
    if(ID) {
        submitData(inputData, inputView, ID);
    }
    delete(inputData);
    GM_deleteValue('combatId');
}

function CombatReportObserver() {
    $('div#combatReports a[href]').click(function() {
        GM_setValue('combatId', getUrlVars(this.href)["combatId"]);
    });
}

function SaveTroopsReport() {
    var inputData = document.getElementById("tabUnits").innerHTML;
    var inputView = "cityMilitary-army";
    var ID = unsafeWindow.dataSetForView.viewParams.cityId;
    if(ID) {
        submitData(inputData, inputView, ID);
    }
    delete(inputData);
}

function SaveFleetReport() {
    var inputData = document.getElementById("tabShips").innerHTML;
    var inputView = "cityMilitary-fleet";
    var ID = unsafeWindow.dataSetForView.viewParams.cityId;
    if(ID) {
        submitData(inputData, inputView, ID);
    }
    delete(inputData);
}

function SaveProductionData() {
    var inputData = document.getElementById("townHall").innerHTML;
    var inputView = "townHall";
    var ID = unsafeWindow.dataSetForView.viewParams.cityId;
    if(ID) {
        submitData(inputData, inputView, ID);
    }
    delete(inputData);
}

function SaveIslandOverview() {
    var inputData = document.getElementById("cities").innerHTML;
    var inputView = "islandOverview";
    var ID = unsafeWindow.dataSetForView.viewParams.islandId;
    var islandName = document.getElementById("js_islandBreadName").outerHTML;
    var islandCoords = document.getElementById("js_islandBreadCoords").outerHTML;
    inputData += islandName;
    inputData += islandCoords;
    if(ID) {
        submitData(inputData, inputView, ID);
    }
    delete(inputData);
}

function GetIslandData(id, islandData) {
    if(id != 17) {
        GM_xmlhttpRequest({
            url: unsafeWindow.Dom.get('js_cityLocation'+id+'Link').href+'&ajax=1',
            onload: function(xhr) {
                var json = JSON.parse(xhr.responseText);
                var expr = /<table class="cityinfo">([\s\S]*?)<\/table>/;
                expr.exec(json[1][1][1]);
                if(expr.exec(json[1][1][1]) != null) {
                    var cityID = unsafeWindow.Dom.get('js_cityLocation'+id+'Link').href;
                    islandData += '<div id="isCityLink">'+cityID+'</div>';
                    islandData += RegExp.$1;
                }
                id++;
                GetIslandData(id, islandData);
            }
        });
    } else {
        setTimeout(function() {
                var islandID = unsafeWindow.dataSetForView.viewParams.islandId;
                var islandName = document.getElementById("js_islandBreadName").outerHTML;
                var islandCoords = document.getElementById("js_islandBreadCoords").outerHTML;
                islandData += islandName;
                islandData += islandCoords;
                submitData(islandData, 'islandDetails', islandID);
            },
            750
        );
    }
}

function SaveCityData() {
    var cityData = document.getElementById('locations').innerHTML;
    var cityID = unsafeWindow.dataSetForView.viewParams.cityId;
    submitData(cityData, 'cityView', cityID);
}

if(unsafeWindow.dataSetForView.viewParams.view == "island") {
    var offset = 0;
    setTimeout(function() {
        SaveIslandOverview();
        GetIslandData(offset);
    }, 500);
}

if(unsafeWindow.dataSetForView.viewParams.view == "city" || unsafeWindow.dataSetForView.viewParams.oldView == "city") {
    SaveCityData();
}

waitForKeyElements("li#js_tabGameOptions", IkaStatsSettings, false);
waitForKeyElements("li#js_combatReports.selected", CombatReportObserver, false);
waitForKeyElements("div#militaryAdvisorReportView", SaveCombatReport, false);
waitForKeyElements("li#js_tabUnits.tab.selected", SaveTroopsReport, false);
waitForKeyElements("li#js_tabShips.tab.selected", SaveFleetReport, false);
waitForKeyElements("div#townHall", SaveProductionData, false);