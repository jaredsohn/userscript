// ==UserScript==
// @name           Grepolis - Mostra farm-info no mapa
// @namespace      
// @description    Torna mais fácil ver as aldeias barbaras que interessam farmar em vez de andar á procura.
// @include        http://*.grepolis.*/game/map?*
// ==/UserScript==

debug = function(message) {
    if (unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(message);
    }
}

var domain = unsafeWindow.location.href.match(/http:\/\/([a-z0-9]*)\./)[1];
//debug("Domain is: " + domain);

function saveValue(key, value) {
    GM_setValue(domain + "--" + key, uneval(value));
}

function loadValue(key, default_value) {
    return eval(GM_getValue(domain + "--" + key, "false")) || default_value;
}

function makeRandomString() {
    var ret = 'x';
    for (var i = 0; i < 12; i++) {
        ret += Math.floor(Math.random() * 10);
    }
    return ret;
}

var farmInfoClass = makeRandomString();
var diplomacyOptionId =makeRandomString();
var bestMoodClass = makeRandomString();

GM_addStyle('.' + farmInfoClass + ' { background-color: grey; z-index: 1; position: absolute; opacity:0.7;}');
GM_addStyle('.' + bestMoodClass + ' .popup_table_inside { border: 1px solid black; background-color: #FFFFD8} ');
//GM_addStyle(".GrepolisShowFarmInfoOnMap_FarmInfo img { height: 12px; }");
GM_addStyle('#' + diplomacyOptionId + ' { position: absolute; background-color: white; z-index:5; opacity:0.8; top:446px; left:694px;}');

var $ = unsafeWindow.$;
var recalcFirstTime = true;
var firstTime = true;
var townId = unsafeWindow.Game.townId;
//debug("townId: " + townId);
var diplomacyEnabled = loadValue('Diplomacy-Town-' + townId, false);

var recalcShowFarmInfo = function() {
    var mapNode = $("#map");
    
    if (firstTime) {
        var checkboxId = makeRandomString();
        var enableDiplomacyDiv = $('<div id="' + diplomacyOptionId + '"><input type="checkbox" id="' + checkboxId + '"' + (diplomacyEnabled ? 'checked="checked"' : '') + '"/>Diplomacy</div>');
        mapNode.append(enableDiplomacyDiv);
        $('#' + checkboxId).click(
            function() {
                var usingDiplomacy = $(this).is(":checked");
                window.setTimeout(function() {
                    saveValue('Diplomacy-Town-' + townId, usingDiplomacy);
                    window.location = window.location;
                }, 0);
            });
        firstTime = false;
    }
    
    var town, towns = this.mapData.getTowns(this.mapTiles.tile.x, this.mapTiles.tile.y, this.mapTiles.tileCount.x, this.mapTiles.tileCount.y);
    var bestMood = 0;
    var bestTowns = [];
    for (var i in towns) {
        var town = towns[i],
            tile_pos = {},
            tile_visarea_pos = {};
        var pixel = this.mapTiles.map2Pixel(town.x, town.y);
        var coords = {
            x: Math.round(pixel.x - this.scroll.x - this.mapTiles.tileSize.x + town.offset_x + 42),
            y: pixel.y - this.scroll.y - this.mapTiles.tileSize.y + town.offset_y + 35,
            radius: 32
        };
        if (town.grepolis_farm_info !== undefined) {
            town.grepolis_farm_info.attr('style', 'display:none;');
        }
        if ((coords.x + coords.radius < 0) || (coords.y + coords.radius < 0) || (coords.x - coords.radius > this.xSize) || (coords.y - coords.radius > this.ySize)) {
            continue;
        }
        //debug("pixel.x: " + pixel.x + ", scroll.x: " + this.scroll.x + ", this.mapTiles.tileSize.x: " + this.mapTiles.tileSize.x + ", town.offset_x:" + town.offset_x);
        var town_type = this.getTownType(town);
        
        //debug("Coords: " + coords.x + ", " + coords.y + ", " + coords.radius + ", type: " + town_type);
        if (town.grepolis_farm_info === undefined) {
            var html = null;
            if (town_type == 'farm_town') {
                if (town.mood !== undefined && town.mood >= (diplomacyEnabled ? 58 : 80)) {
                    html = '<table class="popup_table_inside">' + '<tr><td>' + '<img src="http://static.grepolis.com/images/game/towninfo/mood.png" />' + ('%1%'.replace('%1', town.mood)) + '</td><td>' + '<img src="http://static.grepolis.com/images/game/towninfo/strength.png" />' + ('%1%'.replace('%1', town.strength)) + '</td></tr>' + '<tr><td colspan=2>' + '<span class="resource_' + town.demand + '_icon"></span><span class="popup_ratio">' + ' 1:' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr>' + '</table>';
                    //var html = '<table class="popup_table_inside">' + '<tr><td>' + ('%1%'.replace('%1', town.mood)) + '</td><td>' +('%1%'.replace('%1', town.strength)) + '</td></tr>' + '<tr><td colspan=2>' + '<span class="resource_' + town.demand + '_icon"></span><span class="popup_ratio">' + ' 1:' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr>' + '</table>';
                }
            }
            if (html) {
                town.grepolis_farm_info = $('<div class="' + farmInfoClass + '">' + html + '</div>');
                this.farmInfoNodes.push($(town.grepolis_farm_info));
                mapNode.append(town.grepolis_farm_info);
            }
        }
        if (town.mood > bestMood) {
            bestMood = town.mood;
            bestTowns = [ town ];
        } else if (town.mood == bestMood) {
            bestTowns.push(town);
        }
        if (town.grepolis_farm_info !== undefined) {
            var style = "left: " + (coords.x - 40) + "px; top: " + (coords.y - 20) + "px;";
            $(town.grepolis_farm_info).attr("style", style);
            $(town.grepolis_farm_info).removeClass(bestMoodClass);
        }
    }
    for (var i in bestTowns) {
        var bestTown = bestTowns[i];
        //unsafeWindow.console.log("Adding best town" + bestTown);
        $(bestTown.grepolis_farm_info).addClass(bestMoodClass);
    }
}

var oldRecalcFunction = unsafeWindow.WMap.recalcMarker;

unsafeWindow.WMap.farmInfoNodes = [];

unsafeWindow.WMap.recalcMarker = function () {
    var startTime = new Date();
    debug("In recalcMarker");
    recalcShowFarmInfo.call(unsafeWindow.WMap);
    debug("Finished farm node creation:" + (new Date() - startTime));
    oldRecalcFunction.call(unsafeWindow.WMap);
    debug("Time: " + (new Date() - startTime));
}

newHandlerDown = function(event) {
    for (var i = 0; i < this.farmInfoNodes.length; i++) {
        this.farmInfoNodes[i].attr('style', 'display:none;');
    }
}

var oldHandlerDown = unsafeWindow.WMap.handlerDown;

unsafeWindow.WMap.handlerDown = function(event) {
    newHandlerDown.call(unsafeWindow.WMap, event);
    oldHandlerDown.call(unsafeWindow.WMap, event);
}