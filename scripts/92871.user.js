// ==UserScript==
// @name          The Researcher
// @version       1.1.0
// @namespace     http://userscripts.org
// @description   Perform automated research
// @include       http://www.conquerclub.com/*
// @resource       jQuery               http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @resource       jQueryUI             http://strd6.com/stuff/jqui/jquery-ui-personalized-1.6rc6.min.js
// @resource       jQueryUICSS          http://strd6.com/stuff/jqui/theme/ui.all.css
// @resource    ui-bg_diagonals-thick_18_b81900_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_18_b81900_40x40.png
// @resource    ui-bg_glass_100_f6f6f6_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_f6f6f6_1x400.png
// @resource    ui-bg_diagonals-thick_20_666666_40x40.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_diagonals-thick_20_666666_40x40.png
// @resource    ui-bg_glass_65_ffffff_1x400.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_65_ffffff_1x400.png
// @resource    ui-bg_gloss-wave_35_f6a828_500x100.png          http://strd6.com/stuff/jqui/theme/images/ui-bg_gloss-wave_35_f6a828_500x100.png
// @resource    ui-icons_222222_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_222222_256x240.png
// @resource    ui-bg_flat_10_000000_40x100.png                 http://strd6.com/stuff/jqui/theme/images/ui-bg_flat_10_000000_40x100.png
// @resource    ui-icons_ef8c08_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ef8c08_256x240.png
// @resource    ui-icons_ffd27a_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffd27a_256x240.png
// @resource    ui-bg_glass_100_fdf5ce_1x400.png                http://strd6.com/stuff/jqui/theme/images/ui-bg_glass_100_fdf5ce_1x400.png
// @resource    ui-icons_228ef1_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_228ef1_256x240.png
// @resource    ui-icons_ffffff_256x240.png                     http://strd6.com/stuff/jqui/theme/images/ui-icons_ffffff_256x240.png
// @resource    ui-bg_highlight-soft_75_ffe45c_1x100.png        http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_75_ffe45c_1x100.png
// @resource    ui-bg_highlight-soft_100_eeeeee_1x100.png       http://strd6.com/stuff/jqui/theme/images/ui-bg_highlight-soft_100_eeeeee_1x100.png
// ==/UserScript==
var version = "1.1.0";
var _baseKey = "theResearcher";
var _pluginTitle = "The Researcher";
var scriptUrl = "http://userscripts.org/scripts/source/92871";
var forumUrl = "http://userscripts.org/scripts/source/92871.meta.js";
var checkVersion = true;

var _initializing = true;

// Inject jQuery into page... gross hack... for now...
(function() {
  var head = document.getElementsByTagName('head')[0];

  var script = document.createElement('script');
  script.type = 'text/javascript';

  var jQuery = GM_getResourceText('jQuery');
  var jQueryUI = GM_getResourceText('jQueryUI');

  script.innerHTML = jQuery + jQueryUI;
  head.appendChild(script);

  $ = unsafeWindow.$;
})();

// Load UI Styles
(function() {
    var resources = {
      'ui-bg_diagonals-thick_18_b81900_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_18_b81900_40x40.png'),
      'ui-bg_glass_100_f6f6f6_1x400.png': GM_getResourceURL('ui-bg_glass_100_f6f6f6_1x400.png'),
      'ui-bg_diagonals-thick_20_666666_40x40.png': GM_getResourceURL('ui-bg_diagonals-thick_20_666666_40x40.png'),
      'ui-bg_glass_65_ffffff_1x400.png': GM_getResourceURL('ui-bg_glass_65_ffffff_1x400.png'),
      'ui-bg_gloss-wave_35_f6a828_500x100.png': GM_getResourceURL('ui-bg_gloss-wave_35_f6a828_500x100.png'),
      'ui-icons_222222_256x240.png': GM_getResourceURL('ui-icons_222222_256x240.png'),
      'ui-bg_flat_10_000000_40x100.png': GM_getResourceURL('ui-bg_flat_10_000000_40x100.png'),
      'ui-icons_ef8c08_256x240.png': GM_getResourceURL('ui-icons_ef8c08_256x240.png'),
      'ui-icons_ffd27a_256x240.png': GM_getResourceURL('ui-icons_ffd27a_256x240.png'),
      'ui-bg_glass_100_fdf5ce_1x400.png': GM_getResourceURL('ui-bg_glass_100_fdf5ce_1x400.png'),
      'ui-icons_228ef1_256x240.png': GM_getResourceURL('ui-icons_228ef1_256x240.png'),
      'ui-icons_ffffff_256x240.png': GM_getResourceURL('ui-icons_ffffff_256x240.png'),
      'ui-bg_highlight-soft_75_ffe45c_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_75_ffe45c_1x100.png'),
      'ui-bg_highlight-soft_100_eeeeee_1x100.png': GM_getResourceURL('ui-bg_highlight-soft_100_eeeeee_1x100.png')
    };

    var head = document.getElementsByTagName('head')[0];

    var style = document.createElement('style');
    style.type = 'text/css';

    var css = GM_getResourceText ('jQueryUICSS');
    $.each(resources, function(resourceName, resourceUrl) {
      console.log(resourceName + ': ' + resourceUrl);
      css = css.replace( 'images/' + resourceName, resourceUrl);
    });

    style.innerHTML = css;
    head.appendChild(style);
})();

/******************************************************************************
Chrome support
******************************************************************************/

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
    var namespace = "BOB.";
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(namespace + name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(namespace + name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.slice(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_listValues = function() {
        var i,result = [];
        for (i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            if (name.indexOf(namespace) == 0) {
                result.push(name.slice(namespace.length));
            }
        }
        return result;
    }
    GM_xmlhttpRequest=function(obj) {
    var request=new XMLHttpRequest();
    request.onreadystatechange=function() {
            if(obj.onreadystatechange) {
                obj.onreadystatechange(request);
            };
            if(request.readyState==4 && obj.onload) {
                obj.onload(request);
            }
        }
    request.onerror=function() {
            if(obj.onerror) {
                obj.onerror(request);
            }
        }
    try {
            request.open(obj.method,obj.url,true);
        } catch(e) {
            if(obj.onerror) {
                obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} );
            };
            return request;
        }
    if(obj.headers) {
            for(var name in obj.headers) {
                request.setRequestHeader(name,obj.headers[name]);
            }
        }
    request.send(obj.data);
        return request;
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(namespace + name, value);
    }
    unsafeWindow = window;
}

/******************************************************************************
Utility methods
******************************************************************************/

function getGameNumber(url) {
    return (/game=([0-9]*)/.exec(url))[1];
}

function getCurrentGameNumber() {
    return getGameNumber(window.location.href);
}

function getTimestamp() {
    da = new Date();
    year = da.getFullYear();
    month = da.getMonth() + 1;
    day = da.getDate();
    hour = da.getHours();
    minute = da.getMinutes();
    second = da.getSeconds();
    if ( year < 1970 ) year = year + 100;
    syear = new String(year);
    smonth = new String(month);
    sday = new String(day);
    shour = new String(hour);
    sminute = new String(minute);
    ssecond = new String(second);
    if ( smonth.length == 1 ) smonth = "0" + smonth;
    if ( sday.length == 1 ) sday = "0" + sday;
    if ( shour.length == 1 ) shour = "0" + shour;
    if ( sminute.length == 1 ) sminute = "0" + sminute;
    if ( ssecond.length == 1 ) ssecond = "0" + ssecond;     
    return syear + "-" + smonth + "-" + sday + " " + shour + ":" + sminute + ":" + ssecond;
}

/******************************************************************************
Styles
******************************************************************************/
GM_addStyle(".dialog {font-size:12px;white-space:nowrap;padding:10px;text-align:left;}");
GM_addStyle(".dialog tr {height:22px;}");
GM_addStyle(".dialog td {text-align:center;border:1px solid black;}");
GM_addStyle(".dialog .doubles {background-color:#DDFFDD;border-left-width:3px;}");
GM_addStyle(".dialog .triples {background-color:#DDDDFF;}");
GM_addStyle(".dialog .quads {background-color:#FFFFDD;}");
GM_addStyle(".dialog .other {background-color:#FFDDDD;border-right-width:3px;}");
GM_addStyle(".dialog .goodMap {color:#00BB00;}");
GM_addStyle(".dialog .badMap {color:#FF0000;}");

/****************************************************************************************
Custom stuff
****************************************************************************************/

var acronyms = {
    "Any Clan" : "ALL",
    "A Fistful of Sixes" : "AFOS",
    "Agents of Chaos" : "AOC",
    "Angels of Death" : "AOD",
    "Black Sheep Squadron" : "BSS",
    "De Veroveraars der Lage Landen" : "DVLL",
    "Death By Comity" : "DBC",
    "Divine Domination" : "DD",
    "DYNASTY" : "DYN",
    "EMPIRE" : "EMP",
    "Eternal Empire" : "EE",
    "F.B.R. (Faith Becomes Reality)" : "FBR",
    "Generation One: The Clan" : "G1",
    "Gorgonzola Pirates" : "GORG",
    "Grim Reapers" : "GRIM",
    "Hells Messengers" : "HELL",
    "Imperial Britain" : "IB",
    "KARMA clan" : "KAR",
    "Knights of the Round Table" : "KORT",
    "Left4Dead" : "L4D",
    "Legends of the Zone" : "LOTZ",
    "Legends of War" : "LOW",
    "++The Legion++" : "LEGION",
    "Memento Mori" : "MM",
    "Mythology" : "MYTH",
    "Nemesis" : "NEM",
    "Outlaws &amp; Highwaymen" : "O&H",
    "Project Firestorm" : "FIRE",
    "Soldiers of War" : "SOW",
    "The Brethren of the Fat Mermaid" : "BotFM",
    "The Bullet-Proof Bandits" : "BPB",
    "The Dark Knights of Chaos" : "DKOC",
    "The Devil's Brigade" : "DEVB",
    "The Fraternal Order of Exceptional Drinkers" : "FOED",
    "The Global Dominators" : "GLOB",
    "The Horsemen of the Apocalypse (THOTA)" : "THOTA",
    "The Immortal Assassins" : "IA",
    "The Imperial Dragoons" : "ID",
    "The Last Warriors" : "TLW",
    "The Odd Fellows Union" : "TOFU",
    "The Spanking Monkeys" : "TSM"
};

var clans = new Array();
var maps = new Array();
var badMaps = new Array();
var weakMaps = new Array();
var unplayedMaps = new Array();
var records = new Array();
var best = new Array();
var _mapsLoaded = false;
var _membersLoaded = false;
var _recordsLoaded = false;
var _totalMembers = 0;
var _completedMembers = 0;
var _recordsLoading = 0;
var _totalRecords = 0;
var _recordsCompleted = 0;
var _clanId;

function Clan(name) {
    this._name = name;
    this._members = new Array();
}

function Record() {
    this._d_wins = 0;
    this._d_losses = 0;
    this._d_percentage = 0;
    this._t_wins = 0;
    this._t_losses = 0;
    this._t_percentage = 0;
    this._q_wins = 0;
    this._q_losses = 0;
    this._q_percentage = 0;
    this._o_wins = 0;
    this._o_losses = 0;
    this._o_percentage = 0;
}

function ProblemMap(name) {
    this._mapName = name;
    this._worstPercentage = 101;
    this._badTypes = new Array();
    this._percentages = new Array();
}

function listClans() {
    GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.conquerclub.com/forum/ucp.php?i=167',
            onload: gotList
        });
}

function gotList(response) {
    try {
       $(response.responseText).find("a.forumtitle").each(function(){
            var val = (/g=([0-9]*)/.exec($(this).attr("href")))[1];
            var name = $(this).html();
            clans[val] = new Clan(name);
           
            var acr = acronyms[name];
            if ( acr )
            {
                name = acr;
            }
            else
            {
                name = name.substring(0,17);
            }
            var option = $("<option></option>");
            option.html(name);
            option.val(val);
            if ( acr )
            {
                $("#" + _baseKey + "ClanSelect").prepend(option);
            }
            else
            {
                $("#" + _baseKey + "ClanSelect").append(option);
            }
       });
       $("#" + _baseKey + "ClanSelect").get(0).selectedIndex = 0;
    }catch(e){}
}

var calcIntervalId = 0;
var recordIntervalId = 0;
var flagIntervalId = 0;

function startCalculations() {
    maps = new Array();
    badMaps = new Array();
    weakMaps = new Array();
    unplayedMaps = new Array();
    records = new Array();
    best = new Array();
    _mapsLoaded = false;
    _membersLoaded = false;
    _recordsLoaded = false;
    _recordsLoading = 0;
    _totalRecords = 0;
    _recordsCompleted = 0;
    
    var viewer = $( "#" + _baseKey + "Dialog" );
    _clanId = $("#" + _baseKey + "ClanSelect").val();
   
    viewer.html("Calculating results for " + clans[_clanId]._name + ", please wait...");
    viewer.append("<div id=\"percentComplete\">0%</div>");
   
    viewer.dialog( "open" );
   
    getClanMembers();
    getMaps();
    recordIntervalId = setInterval(getRecords, 500);   
    calcIntervalId = setInterval(Calculate, 500);
}

function Calculate() {
    if ( _recordsLoaded )
    {
        clearInterval(calcIntervalId);
        var viewer = $( "#" + _baseKey + "Dialog" );
        
        var tabsdiv = $("<div></div>");
        tabsdiv.attr("id",_baseKey + "tabs");
        tabsdiv.html("<ul><li><a href=\"#" + _baseKey + "raw-results\">Raw Data</a></li><li><a href=\"#" + _baseKey + "calcs\">Summarized Results</a></li></ul>");
    
        var resultsDiv = $("<div></div>");
        resultsDiv.attr("id",_baseKey + "raw-results");
        
        var calcsDiv = $("<div></div>");
        calcsDiv.attr("id",_baseKey + "calcs");
       
        var table = $("<table></table");
        table.attr("id",_baseKey + "Results");
        
        var tableRow = $("<tr></tr>");
        var nameCell = $("<td></td>");
        var dataCell = $("<td></td>");
        
        tableRow.append(nameCell);
        tableRow.append(dataCell);
        table.append(tableRow);
        
        var nameTable = $("<table></table>");
        nameTable.attr("id",_baseKey + "NameTable");
        nameTable.append("<tr><th>&nbsp;</th></tr>");
        nameTable.append("<tr><th>&nbsp;</th></tr>");
        nameTable.append("<tr><th>Best</th></tr>");
        nameCell.append(nameTable);
        
        var dataDiv = $("<div></div>");
        dataDiv.css("overflow","auto");
        dataDiv.css("width",800);
        var dataTable = $("<table></table>");
        dataTable.attr("id",_baseKey + "DataTable");
        dataDiv.append(dataTable);
        dataCell.append(dataDiv);
       
        var headerRow = $("<tr></tr>");
       
        var gameTypeRow = $("<tr></tr>");
       
        
        for (mapidx in maps) {
            var header = $("<th></th>");
            header.attr("colspan",4);
            header.css("text-align","center");
            header.html(maps[mapidx]);
            headerRow.append(header);
            
            gameTypeRow.append("<td class=\"doubles\">D</td>");
            gameTypeRow.append("<td class=\"triples\">T</td>");
            gameTypeRow.append("<td class=\"quads\">Q</td>");
            gameTypeRow.append("<td class=\"other\">O</td>");
        }
       
        for (memberidx in clans[_clanId]._members) {
            var member = clans[_clanId]._members[memberidx];
            var nameRow = $("<tr></tr>");
            var dataRow = $("<tr></tr>");
            var name = $("<th></th>");
            name.html(member);
            nameRow.append(name);
            nameTable.append(nameRow);
           
            for (mapidx in maps) {
                var map = maps[mapidx];
                
                var dataD = $("<td></td>");
                var dataT = $("<td></td>");
                var dataQ = $("<td></td>");
                var dataO = $("<td></td>");
                
                dataD.addClass("doubles");
                dataT.addClass("triples");
                dataQ.addClass("quads");
                dataO.addClass("other");
               
                if ( best[map] === undefined )
                {
                    best[map] = new Array();
                    best[map]["d"] = 0;
                    best[map]["t"] = 0;
                    best[map]["q"] = 0;
                    best[map]["o"] = 0;
                }
                    
                if (records[member] !== undefined && records[member][map] !== undefined )
                {
                    var dPlayed = records[member][map]._d_wins + records[member][map]._d_losses;
                    var tPlayed = records[member][map]._t_wins + records[member][map]._t_losses;
                    var qPlayed = records[member][map]._q_wins + records[member][map]._q_losses;
                    var oPlayed = records[member][map]._o_wins + records[member][map]._o_losses;
                    
                    records[member][map]._d_percentage = dPlayed > 5 ? records[member][map]._d_wins / dPlayed * 100 : 0;
                    records[member][map]._t_percentage = tPlayed > 5 ? records[member][map]._t_wins / tPlayed * 100 : 0;
                    records[member][map]._q_percentage = qPlayed > 5 ? records[member][map]._q_wins / qPlayed * 100 : 0;
                    records[member][map]._o_percentage = oPlayed > 5 ? records[member][map]._o_wins / oPlayed * 100 : 0;
                    
                    if ( records[member][map]._d_percentage > best[map]["d"] ) best[map]["d"] = records[member][map]._d_percentage;
                    if ( records[member][map]._t_percentage > best[map]["t"] ) best[map]["t"] = records[member][map]._t_percentage;
                    if ( records[member][map]._q_percentage > best[map]["q"] ) best[map]["q"] = records[member][map]._q_percentage;
                    if ( records[member][map]._o_percentage > best[map]["o"] ) best[map]["o"] = records[member][map]._o_percentage;
                    
                    dataD.html(records[member][map]._d_wins + "-" + records[member][map]._d_losses);
                    dataT.html(records[member][map]._t_wins + "-" + records[member][map]._t_losses);
                    dataQ.html(records[member][map]._q_wins + "-" + records[member][map]._q_losses);
                    dataO.html(records[member][map]._o_wins + "-" + records[member][map]._o_losses);
                }
               
                dataRow.append(dataD);
                dataRow.append(dataT);
                dataRow.append(dataQ);
                dataRow.append(dataO);
            }
           
            dataTable.append(dataRow);
        }
        
        var bestRow = $("<tr></tr>");
        var hasAlerted = false;
        
        for (mapidx in maps) {
            var map = maps[mapidx];
            
            var dataD = $("<td></td>");
            var dataT = $("<td></td>");
            var dataQ = $("<td></td>");
            var dataO = $("<td></td>");
                
            dataD.addClass("doubles");
            dataT.addClass("triples");
            dataQ.addClass("quads");
            dataO.addClass("other");
            
            dataD.append(parseFloat(best[map]["d"]).toFixed(2) + "%");
            dataT.append(parseFloat(best[map]["t"]).toFixed(2) + "%");
            dataQ.append(parseFloat(best[map]["q"]).toFixed(2) + "%");
            dataO.append(parseFloat(best[map]["o"]).toFixed(2) + "%");
            
            if ( parseInt(best[map]["d"]) > 60 ) dataD.addClass("goodMap");
            if ( parseInt(best[map]["d"]) < 40 && parseInt(best[map]["d"]) > 0 ) dataD.addClass("badMap");
            if ( parseInt(best[map]["t"]) > 60 ) dataT.addClass("goodMap");
            if ( parseInt(best[map]["t"]) < 40 && parseInt(best[map]["t"]) > 0 ) dataT.addClass("badMap");
            if ( parseInt(best[map]["q"]) > 60 ) dataQ.addClass("goodMap");
            if ( parseInt(best[map]["q"]) < 40 && parseInt(best[map]["q"]) > 0 ) dataQ.addClass("badMap");
            if ( parseInt(best[map]["o"]) > 60 ) dataO.addClass("goodMap");
            if ( parseInt(best[map]["o"]) < 40 && parseInt(best[map]["o"]) > 0 ) dataO.addClass("badMap");
            
            if ( parseInt(best[map]["d"]) < 40 || parseInt(best[map]["t"]) < 40 || parseInt(best[map]["q"]) < 40 )
            {
                var problemMap = new ProblemMap(map);
                
                if ( parseInt(best[map]["d"]) < 40 )
                {
                    problemMap._badTypes[problemMap._badTypes.length] = "D";
                    problemMap._percentages[problemMap._percentages.length] = parseFloat(best[map]["d"]).toFixed(2);
                    if (parseInt(best[map]["d"]) > 0 && parseFloat(best[map]["d"]).toFixed(2) < problemMap._worstPercentage )
                        problemMap._worstPercentage = parseFloat(best[map]["d"]).toFixed(2);
                }
                if ( parseInt(best[map]["t"]) < 40 )
                {
                    problemMap._badTypes[problemMap._badTypes.length] = "T";
                    problemMap._percentages[problemMap._percentages.length] = parseFloat(best[map]["t"]).toFixed(2);
                    if (parseInt(best[map]["t"]) > 0 && parseFloat(best[map]["t"]).toFixed(2) < problemMap._worstPercentage )
                        problemMap._worstPercentage = parseFloat(best[map]["t"]).toFixed(2);
                }
                if ( parseInt(best[map]["q"]) < 40 )
                {
                    problemMap._badTypes[problemMap._badTypes.length] = "Q";
                    problemMap._percentages[problemMap._percentages.length] = parseFloat(best[map]["q"]).toFixed(2);
                    if (parseInt(best[map]["q"]) > 0 && parseFloat(best[map]["q"]).toFixed(2) < problemMap._worstPercentage )
                        problemMap._worstPercentage = parseFloat(best[map]["q"]).toFixed(2);
                }
                
                if (problemMap._worstPercentage < 101)
                {
                    badMaps[badMaps.length] = problemMap;
                }
                else if ( problemMap._badTypes.length == 3 && parseInt(best[map]["o"]) == 0 )
                {
                    unplayedMaps[unplayedMaps.length] = problemMap
                }
                else
                {
                    weakMaps[weakMaps.length] = problemMap;
                }
            }
            
            bestRow.append(dataD);
            bestRow.append(dataT);
            bestRow.append(dataQ);
            bestRow.append(dataO);
        }
        
        var poorDiv = $("<div></div>");
        poorDiv.css("display","inline-block");
        poorDiv.css("width","300px");
        poorDiv.css("height","420px");
        poorDiv.css("overflow","scroll");
        poorDiv.append("Poor Performance Maps:<br>");
        for (mapidx in badMaps) {
            var problemMap = badMaps[mapidx];
            for (typeidx in problemMap._badTypes) {
                var type = problemMap._badTypes[typeidx];
                var percent = problemMap._percentages[typeidx] < 101 ? problemMap._percentages[typeidx] : 0;
                if ( percent > 0 )
                    poorDiv.append(problemMap._mapName + " (" + type + "): " + percent + "%<br>");
            }
        }
        calcsDiv.append(poorDiv);
        
        var unplayedDiv = $("<div></div>");
        unplayedDiv.css("display","inline-block");
        unplayedDiv.css("width","300px");
        unplayedDiv.css("height","420px");
        unplayedDiv.css("overflow","scroll");
        unplayedDiv.append("Unplayed Maps:<br>");
        for (mapidx in unplayedMaps) {
            var problemMap = unplayedMaps[mapidx];
            unplayedDiv.append(problemMap._mapName + "<br>");
        }
        calcsDiv.append(unplayedDiv);
        
        var weakDiv = $("<div></div>");
        weakDiv.css("display","inline-block");
        weakDiv.css("width","300px");
        weakDiv.css("height","420px");
        weakDiv.css("overflow","scroll");
        weakDiv.append("Weak Map Types:<br>");
        for (mapidx in weakMaps) {
            var problemMap = weakMaps[mapidx];
            for (typeidx in problemMap._badTypes) {
                var type = problemMap._badTypes[typeidx];
                var percent = problemMap._percentages[typeidx] < 101 ? problemMap._percentages[typeidx] : 0;
                weakDiv.append(problemMap._mapName + " (" + type + ")<br>");
            }
        }
        calcsDiv.append(weakDiv);
        
        dataTable.prepend(bestRow);
        dataTable.prepend(gameTypeRow);
        dataTable.prepend(headerRow);
        
        dataTable.append(bestRow.clone());
        dataTable.append(gameTypeRow.clone());
        dataTable.append(headerRow.clone());
        
        resultsDiv.append(table);
        
        tabsdiv.append(resultsDiv);
        tabsdiv.append(calcsDiv);
        
        viewer.html("");
        viewer.append(tabsdiv);
        
        tabsdiv.tabs();
    }
}

function getRecords() {
    if ( _mapsLoaded && _membersLoaded )
    {
        clearInterval(recordIntervalId);
        _totalRecords = clans[_clanId]._members.length;
        for (memberidx in clans[_clanId]._members) {
            getRecord(clans[_clanId]._members[memberidx],1);
        }
        flagIntervalId = setInterval(updateRecordsFlag, 5000);
    }
}

function updateRecordsFlag() {
    if ( _recordsLoading == 0 )
    {
        clearInterval(flagIntervalId);
        _recordsLoaded = true;
    }
}

function getRecord(member,page) {
    var url = "http://www.conquerclub.com/api.php?mode=gamelist&po=S&sg=N&it=E&gs=F&gt=D,T,Q&names=Y&p1un=" + encodeURIComponent(member);
   
    if ( page == 1 )
    {
        _recordsLoading++;
    }
    else
    {
        url += "&page=" + page;
    }
       
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response){
                var resp = $(response.responseText);
                var pageInfo = resp.find("page").text();
                pageParts = pageInfo.split(" of ");
                var localMember = decodeURIComponent((/p1un=([^&]*)/.exec(response.finalUrl))[1]);
                
                var percent = _recordsCompleted / _totalRecords * 100;
               
                if ( parseInt(pageParts[0]) > parseInt(pageParts[1]) )
                {
                    alert(response.finalUrl);
                }
               
                $(response.responseText).find("map").each(function(){
                    var gameType = $(this).siblings("game_type").text();
                    var playerCount = $(this).siblings("players").find("player").length;
                    var map = $(this).text();
                   
                    var record;
                    if ( records[localMember] === undefined || records[localMember][map] === undefined )
                    {
                        record = new Record();
                    }
                    else
                    {
                        record = records[localMember][map];
                    }
                   
                    $(this).siblings("players").find("player").each(function(){
                        if ( $(this).text() == localMember )
                        {
                            if ( $(this).attr("state") == "Won" )
                            {
                                switch(gameType)
                                {
                                    case "D":
                                        if ( playerCount == 4 )
                                            record._d_wins++;
                                        else
                                            record._o_wins++;
                                        break;
                                    case "T":
                                        record._t_wins++;
                                        break;
                                    case "Q":
                                        record._q_wins++;
                                        break;
                                    default:
                                        record._o_wins++;
                                        break;
                                }
                            }
                            else if ( $(this).attr("state") == "Lost" )
                            {
                                switch(gameType)
                                {
                                    case "D":
                                        if ( playerCount == 4 )
                                            record._d_losses++;
                                        else
                                            record._o_losses++;
                                        break;
                                    case "T":
                                        record._t_losses++;
                                        break;
                                    case "Q":
                                        record._q_losses++;
                                        break;
                                    default:
                                        record._o_losses++;
                                        break;
                                }
                            }
                        }
                    });
                   
                    if ( records[localMember] === undefined )
                    {
                        records[localMember] = new Array();
                    }
                    records[localMember][map] = record;
                });
               
                if ( pageParts[0] == pageParts[1] )
                {
                    _recordsLoading--;
                    _recordsCompleted++;
                   
                    var percent = _recordsCompleted / _totalRecords * 100;
                    $("#percentComplete").html(percent.toFixed(0) + "%");
                }
                else
                {
                    var newPage = parseInt(pageParts[0])+1;
                    getRecord(localMember,newPage);
                }
            }
        });
    }, 0);
}

function getMaps() {
    var listUrl = "http://www.conquerclub.com/api.php?mode=maplist";
   
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: listUrl,
            onload: function(response){
                $(response.responseText).find("title").each(function(){
                    maps[maps.length] = $(this).text();
                });
                _mapsLoaded = true;
            }
        });
    }, 0);
}

function getClanMembers() {
    var listUrl = "http://www.conquerclub.com/api.php?mode=group&g=" + _clanId;
   
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: listUrl,
            onload: function(response){
                _completedMembers = 0;
                _totalMembers = $(response.responseText).find("member").length;
                $(response.responseText).find("member").each(function(){
                    addClanMember($(this).text());
                });
            }
        });
    }, 0);
}

function addClanMember(memberId) {
    var playerUrl = "http://www.conquerclub.com/api.php?mode=player&u=" + memberId;
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: playerUrl,
            onload: function(response){
                var memberId = $(response.responseText).find("userid").text();
                var memberText = $(response.responseText).find("username").text();
                if ( $.inArray(memberText,clans[_clanId]._members) == -1 )
                {
                    clans[_clanId]._members[clans[_clanId]._members.length] = memberText;
                }
                _completedMembers++;
                if ( _completedMembers == _totalMembers )
                    _membersLoaded = true;
            }
        });
    }, 0);  
}

function customMenuItems() {
   var menu = $("#" + _baseKey + "Menu");
   var optionMenu = $("#" + _baseKey + "MenuItemOptions");
   
   var select = $("<select></select>");
   select.attr("id",_baseKey + "ClanSelect");
   select.insertBefore(optionMenu);
   
   listClans();
   
   var ul = $("<ul></ul>");
    ul.css("borderWidth","0px 1px 0px 1px");
    ul.css("width", "151px");
    var html = "<li><a href='javascript:void(0)' id='" + _baseKey + "Calculate'>Calculate</a></li>";
    ul.html(html);
    ul.click(startCalculations);
   
    ul.insertBefore(optionMenu);
}

/****************************************************************************************
Initialization Stuff
****************************************************************************************/

function initialize() {
    showMenu(customMenuItems);
    checkForUpdate(scriptUrl);
    initializeDialog();
}

function initializeDialog() {
    $.fx.speeds._default = 1000;
    var dialog = $("<div></div>");
    dialog.attr("id",_baseKey + "Dialog");
    dialog.attr("title","Clan Results");
    dialog.addClass("dialog");
    $("#" + _baseKey + "Menu").append(dialog);
    $( "#" + _baseKey + "Dialog" ).dialog({
            autoOpen: false,
            height: 550,
            width: 1000           
        });
}

/******************************************************************************
Version stuff
******************************************************************************/

function checkForUpdate(scriptUrlBase) {
    var lastversion = GM_getValue('lastupdate', 0);
    if (checkVersion && lastversion < new Date().getTime() - 60*60*1000) {
        GM_setValue('lastupdate', new Date().getTime() + "");
        GM_xmlhttpRequest({
            method: 'GET',
            url: forumUrl,
            onload: updateServerNumber
        });
    }
    else {
        updateOptionsMenu();
    }
}

function updateServerNumber(response) {
    try {
     var serverVersion = /version\s+(\d+.\d+.\d+)/.exec(response.responseText)[1];
     GM_setValue('updateavailable', serverVersion);
     updateOptionsMenu();
    }catch(e){}
}

function isNewVersion() {
    var serverVersion = GM_getValue('updateavailable', false);
    if (serverVersion) {
        var newVersion = serverVersion.split('.').map(function(string) {
                return parseInt(string,10);
         });
         var thisVersion = version.split('.').map(function(string) {
                return parseInt(string,10);
         });
         return (newVersion[0]>thisVersion[0] || (newVersion[0]==thisVersion[0] && (newVersion[1]>thisVersion[1] || (newVersion[1]==thisVersion[1] && newVersion[2]>thisVersion[2]))));
    }
    return false;
}

/******************************************************************************
Menu stuff
******************************************************************************/

function updateOptionsMenu() {
    var cgMenu = $("#" + _baseKey + "Menu");
   
    var ul = $("<ul></ul>");
    ul.css("borderWidth","0px 1px 0px 1px");
    ul.css("width", "151px");
   
    var source = scriptUrl + ".user.js";
    if(isNewVersion()) {
        ul.html("<li><a id=\"cgVersionInfo\" href=" + source + "><span class=\"attention\">New Update Available</span></a></li>");
    }
    else {
        ul.html("<li><a id=\"cgVersionInfo\" href=" + source + "><span>Latest Version Installed</span></a></li>");
    }
    cgMenu.append(ul);
}

function getLeftMenu() {
    return $("#leftColumn ul:first").parent();
}


function showMenu(customMenuMethod) {
    var notepadMenu = $("<div></div>");
    notepadMenu.attr("id", _baseKey + "Menu");
    notepadMenu.html("<h3><b>" + _pluginTitle + " <span style='font-size:7pt;' ><a href='" + forumUrl + "'>" + version + "</a></span></b></h3>");

    getLeftMenu().append(notepadMenu);
   
    var ul = $("<ul></ul>");
    ul.attr("id",_baseKey + "MenuItemOptions");
    ul.css("borderWidth","1px 1px 0px 1px");
    ul.css("width", "151px");
    var html = "<li><a href='javascript:void(0)' id='" + _baseKey + "OptionsLink'>Options</a></li>";
    ul.html(html);
   
    var optionsDiv = $("<div></div>");
    optionsDiv.attr("id",_baseKey + "Options");
    optionsDiv.hide();
    ul.append(optionsDiv);
   
    notepadMenu.append(ul);
   
    $("#" + _baseKey + "OptionsLink").click(function(){
        $("#" + _baseKey + "notepadOptions").toggle();
    });
   
    customMenuMethod();
}

/****************************************************************************************
Inline executions
****************************************************************************************/

initialize();