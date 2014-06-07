// ==UserScript==
// @name           	Ikariam Developer Tools
// @namespace      	PhasmaExMachina
// @description    	Tools to be included in your Ikariam Greasemonkey scripts.
// @author			PhasmaExMachina (Edits by AubergineAnodyne.)
// @version			0.59
//
// @history			0.59 Deals with speed % increase column in military movements view (on test server and, I presume, coming soon to other servers).
// @history			0.58 Fixed some stupid coding errors that were causing island type detection bugs
// @history			0.57 Fixed glitch in IkaTools.getScoreForPlayer()
// @history			0.56 Fixed a glitch in resource detection on tradegood and wood mine views
// @history			0.55 Added IkaTools.buildingIsMaxed(building)
// @history			0.55 Fixed intermittant bug in reading island ID in island view 
// @history			0.54 Fixed bug in IkaTools.getTotalIncome()
// @history			0.53 Data reading fix for Chrome users
// @history			0.52 Fixed bug in academy and a few other pages
// @history			0.51 Added IkaTools.getTravelTime() (coppied from Ikariam Farm List at http://userscripts.org/scripts/show/63706)
// @history			0.50 Fixed wine consumption not being correctly read in tavern for wine producing cities 
// @history			0.50 Added IkaTools.getUnitTypeById(id) 
// @history			0.49 Small bugfix for IkaTools.goTo() 
// @history			0.48 Fix for reading of IKARIAM.currentCity info
// @history			0.47 Added IkaTools.getPlayerId() and IkaTools.getAllianceId()
// @history			0.46 Fixed getMovementsUpdate when trade ships are incoming 
// @history			0.45 Fixed calculation of total city income in finances view 
// @history			0.44 Yet another update to wine consumption tracking. Should fix things for everyone now.
// @history			0.43 Fixed a few poor coding choices related to reading military information
// @history			0.42 Added ship tracking
// @history			0.41 Fixed wine consumption not being stored 
// @history			0.40 Fixed wine consumption not being correctly read in tavern
// @history			0.40 Wine production is now updated when viewing winegrower
// @history			0.40 Wood production is now updated when viewing forester
// @history			0.40 Marble production is now updated when viewing stonemason
// @history			0.40 Sulfur production is now updated when viewing alchemist
// @history			0.40 actionRequest field is now updated when calling IkaTools.getRemoteDocument (thanks AubergineAnodyne)
// @history			0.40 Improved IkaTools.getMovementsUpdate (thanks AubergineAnodyne)
// @history			0.40 Improved IkaTools.getRemoteDocument (thanks AubergineAnodyne)
// @history			0.40 Improved "militaryAdvisorMilitaryMovements" view (thanks AubergineAnodyne)
// @history			0.39 Minor fix to parsing of movement data when run through google chrome
// @history			0.38 Reduced instance of infinite refresh from trade advisor page
// @history			0.37 Fixed bug in handling of occuppied or deployed cities
// @history			0.37 Fixed IkaTools.reloadAllMilitary() to include occuppied or deployed cities
// @history			0.36 Fixed redirection loop on island links in town advisor page
// @history			0.35 Added IkaTools.cityIsOwn(city) method
// @history			0.35 Additional error checking for data collection
// @history			0.34 City names are now read as text instead of HTML (strips out   etc.)
// @history			0.34 Links in Town Advisor now perform city change
// @history			0.32 Added IkaTools.reloadAllMilitary() method
// @history			0.32 IkaTools.views["cityMilitary-army"] now takes 2 parameters, root (document root) and cityId for remote unit updating
// @history			0.32 Added IkaTools.saveCity(city) method
// @history			0.31 Improved stability of moving from one city to another using IkaTools.goTo()
// @history			0.30 Fixed calculation of wine consumption when consumption is 0 
// @history			0.29 Improved integration with ScriptUpdater (http://userscripts.org/scripts/show/57756) 
// @history			0.28 Added IkaTools.addOptionsLink() method (requires http://userscripts.org/scripts/show/62718)
// @history			0.27 Fixed bad language reference to temple
// @history			0.26 Fixed income
// @history			0.25 Number of troops in town now updated on deploy units
// @history			0.22 Added type property to city objects (city.type) which is false for own cities or class name for occuppied or deployed cities
// @history			0.21 Fixed error in calculation of finances on finances page
// @history			0.20 IkaTools.getRemoteDocument() now mimics the browser's user agent
// @history			0.19 Put in a fix to help reduce data loss on page errors 
// @history			0.18 Simplified IkaTools.getView()
// @history			0.17 Fixed bug in saving current construction right after build
// @history			0.16 Added IkaTools.getText() method
// @history			0.16 Minor code improvements
// @history			0.16 Added public IkaTools.buildingTypes array that contains all building types
// @history			0.15 Fixed corruption of current city data when viewing someone else's city with a spy
// @history			0.14 Fixed addInfoBox() not working on some pages
// @history			0.13 Added some trackData config parameters (to be documented later)
// @history			0.12 Added IkaTools.formatMilliseconds() method
// @history			0.12 Added IkaTools.formatSeconds() method
// @history			0.12 Added IkaTools.getMovements() method
// @history			0.12 Added IkaTools.getMovementsUpdate() method
// @history			0.11 Fixed detection of cities of glass tradegood type
// @history			0.11 Added IkaTools.addCommas() method
// @history			0.10 Cleaned up the code a bit
// @history			0.10 Fixed bug where troop production in barracks would make the script think the barracks was being upgraded
// @history			0.09 Wine consumption is now taken into account
// @history			0.09 Resource gain no longer is calculated beyond max capacity
// @history			0.09 Added IkaTools.cityGetWineConsumption() method
//
//
// @include http://s666.en.ikariam.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var IkaTools = {
  startTime: new Date().getTime(),
  version: 3,
  
  // declare default config options
  config: {
    debugMode: true,
    trackData: {
      construction: true,
      resources: true,
    },
  },
  
  movementHandlers: [],
  maxBuildingLevel: 32,
  viewShownCallbacks: [],
  buildingTypes: ['academy', 'alchemist', 'architect', 'barracks', 'branchOffice', 'carpentering', 'dump', 'embassy', 'fireworker', 'forester', 'glassblowing', 'museum', 'optician', 'palace', 'palaceColony', 'port', 'safehouse', 'shipyard', 'stonemason', 'temple', 'tavern', 'townHall', 'vineyard', 'wall', 'warehouse', 'winegrower', 'workshop'],
  shipTypes: ['ram', 'flamethrower', 'steamboat', 'ballista', 'catapult', 'mortar', 'submarine'],
  unitTypes: ['phalanx', 'steamgiant', 'spearman', 'swordsman', 'slinger', 'archer', 'marksman', 'ram', 'catapult', 'mortar', 'gyrocopter', 'bombardier', 'cook', 'medic'],
  
  //---------------- "public" methods --------------------------------------
  init: function (params) {
    // load config options
    if (typeof (params) == 'object') {
      for (var k in params) {
        if (typeof (params[k]) == 'object') {
          for (var d in params[k]) {
            IkaTools.config[k][d] = params[k][d];
          }
        } else IkaTools.config[k] = params[k];
      }
    }
    
    try {
      // check for new version and clear data if necessary
      if (IkaTools.getVal('IkaTools.version') != IkaTools.version) {
        IkaTools.clearCities();
        IkaTools.setVal('IkaTools.version', IkaTools.version);
      }
      // track data
      if (IkaTools.config.trackData && !document.location.toString().match(/undefined/)) {
        IkaTools.updateData();
      }
    } catch (e) {
      IkaTools.debugException("init", e);
    }
    
    IkaTools.endTime = new Date().getTime();
    IkaTools.debug('IkaTools.init() ' + (IkaTools.endTime - IkaTools.startTime) + 'ms');
    
    // movement complete listener
    /*function checkMovements() {
      var movements = IkaTools.getMovements();
      var d = new Date();
      var currentTime = d.getTime();
      var handlers = IkaTools.movementHandlers;
      for (var i = 0; i < movements.length; i++) {
        var movement = movements[i];
        var remainingTime = movement.arrivalTime - currentTime;
        if (remainingTime > 0 && remainingTime <= 1000) {
          switch (movement.mission) {
          case 'plunder':
            var targetCityId = movement.originId;
            break;
          case 'deployarmy':
            var targetCityId = movement.direction == 'left' ? movement.originId : movement.targetId;
            break;
          case 'defend':
            var targetCityId = movement.direction == 'left' ? movement.originId : movement.targetId;
            break;
          case 'deployfleet':
            var targetCityId = movement.direction == 'left' ? movement.originId : movement.targetId;
            break;
          default:
            var targetCityId = false;
          }
          if (targetCityId) {
            var targetCity = IkaTools.getCityById(targetCityId);
            if (targetCity && IkaTools.cityIsOwn(targetCity)) {
              // handle target city
              for (var x = 0; x < movement.units.length; x++) {
                // check for resource
                var unit = movement.units[x];
                var resourceMatch = unit.iconSrc.match(/icon_(wood|wine|marble|glass|sulfur)/);
                if (resourceMatch) {
                  var type = resourceMatch[1] == 'glass' ? 'crystal' : resourceMatch[1];
                  targetCity.resourceMaximums[type] += parseInt(unit.qty);
                }
                for (var z = 0; z < handlers.length; z++)
                if (typeof (handlers[z]) == 'function') handlers[z](movement);
              }
            }
          }
        }
      }
      IkaTools.saveCities();
    }
    if (IkaTools.config.trackData) setInterval(checkMovements, 1000);*/
  },
  addCommas: function (nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },
  addInfoBox: function (titleHtml, contentDiv) {
    var box = document.createElement('div');
    box.className = 'dynamic';
    box.innerHTML = '<h3 class="header">' + titleHtml + '</h3>';
    contentDiv.className = "content";
    box.appendChild(contentDiv);
    var footer = document.createElement('div');
    footer.className = "footer";
    box.appendChild(footer);
    document.getElementById('mainview').parentNode.insertBefore(box, document.getElementById('mainview'));
  },
  addMovementHandler: function (handler) {
    if (typeof (handler) != 'function') {
      alert('IkaTools error: movement handlers must be functions');
      return;
    }
    IkaTools.movementHandlers.push(handler);
  },
  addOptionBlock: function (contentDiv) {
    var debugDiv = document.getElementById('options_debug');
    debugDiv.parentNode.insertBefore(contentDiv, debugDiv);
  },
  addOptionsLink: function (scriptName) {
    if (typeof (Config) == 'undefined') {
      var c = confirm("IkaTools.addOptionsLink() requires Script Options Dialogue by PhasmaExMachina.\n\nWould you like to go to this tool's page?");
      if (c) document.location = "http://userscripts.org/scripts/show/62718";
    } else {
      if ($('#IkaOptionsDropdown').size() == 0) {
        GM_addStyle('\
					#IkaOptionsDropdown { position:absolute; }\
					#IkaOptionsDropdown:hover { padding-bottom:20px; }\
					#IkaOptionsDropdown #IkaOptionsDropdownLinks { display:none !important; }\
					#IkaOptionsDropdown:hover #IkaOptionsDropdownLinks { display:block !important;  }\
					#IkaOptionsDropdownLinks { background-color:#FFF5E1; padding:.5em; padding-bottom:0; border:1px solid #666; position:absolute; right:-80px; margin-top:2px; width:170px; }\
					#IkaOptionsDropdownLinks a { color:#666; cursor:pointer; margin-left:0; padding-left:.2em; display:block; margin-bottom:.5em; }\
				');
        var li = document.createElement('li');
        li.innerHTML = '<a href="javascript:void(0);" id="IkaOptionsDropdownMenuItem" style="position:relative;">Scripts <img src="' + Config.icons.config + '" align="absmiddle"/></a> <div id="IkaOptionsDropdownLinks"></div>';
        li.id = 'IkaOptionsDropdown';
        $('#GF_toolbar ul').append(li);
      }
      // add link
      var a = document.createElement('a');
      a.innerHTML = scriptName;
      var id = 'IkaScriptSettings_' + scriptName.replace(/\s/g, '_');
      a.id = id;
      a.addEventListener('click', function () {
        Config.show();
      }, false);
      $('#IkaOptionsDropdownLinks').append(a);
      // make link red if script is outdated
      if (typeof (ScriptUpdater) != 'undefined' && typeof (ScriptUpdater.checkStored) == 'function' && ScriptUpdater.checkStored()) {
        $('#IkaOptionsDropdown a')[0].setAttribute('style', 'color:gold;');
        a.style.color = '#CC0000';
        var img = document.createElement('img');
        img.src = ScriptUpdater.icons.install;
        img.setAttribute('style', 'vertical-align:middle; height:14px; float:right; cursor:pointer; margin-left:1em;');
        img.title = "Install updates or view version history";
        img.addEventListener('click', function () {
          ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion);
        }, false);
        $(a).before(img);
      }
    }
  },
  buildingGetResourceMissing: function (type, building) {
    var city = IkaTools.getCityById(building.cityId);
    var missing = IkaTools.buildingGetResourceRequired(type, building) - IkaTools.cityGetResource(type, city);
    return missing > 0 ? missing : 0;
  },
  buildingGetResourceMissingTotal: function (building) {
    var total = 0;
    var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
    for (var i = 0; i < resourceNames.length; i++) {
      total += IkaTools.buildingGetResourceMissing(resourceNames[i], building);
    }
    return total;
  },
  buildingGetResourceRequired: function (type, building) {
    return (typeof (building) == 'undefined' || typeof (building.resources) == 'undefined' || typeof (building.resources[type]) == 'undefined') ? 0 : parseInt(building.resources[type]);
  },
  buildingGetResourceRequiredTotal: function (building) {
    var total = 0;
    var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
    for (i in resourceNames) {
      total += IkaTools.buildingGetResourceRequired(resourceNames[i], building);
    }
    return total;
  },
  buildingIsMaxed: function (building) {
    if (building.type.match(/^(academy|alchemist|architect|branchOffice|carpentering|embassy|fireworker|forester|glassblowing|optician|safehouse|shipyard|stonemason|temple|vineyard|winegrower)$/)) return parseInt(building.level) == 32;
    switch (building.type) {
    case 'museum':
      return parseInt(building.level) == 19;
    case 'palace':
    case 'palaceColony':
      return parseInt(building.level) == 11;
    case 'tavern':
      return parseInt(building.level) == 46;
    case 'townHall':
      return parseInt(building.level) == 38;
    case 'wall':
      return parseInt(building.level) == 48;
    case 'port':
      return parseInt(building.level) == 48;
    case 'warehouse':
      return parseInt(building.level) == 40;
    case 'workshop':
      return parseInt(building.level) == 24;
    }
    return false;
  },
  cityGetBuildingByPosition: function (position, city) {
    if (typeof (position) == 'object' && typeof (position.id) != 'undefined') {
      var pos = city;
      city = position;
      position = pos;
    } else {
      city = typeof (city) != 'undefined' ? city : IkaTools.getCurrentCity();
    }
    var buildings = city.buildings ? city.buildings : new Array();
    for (var i = 0; i < buildings.length; i++) {
      if (buildings[i].position.toString() == position.toString()) {
        return buildings[i];
      }
    }
    return false;
  },
  cityGetBuildingByType: function (type, city) {
    if (typeof (type) == 'object' && typeof (type.id) != 'undefined') {
      var tmp = city;
      city = type;
      type = tmp;
    } else {
      city = typeof (city) != 'undefined' ? city : IkaTools.getCurrentCity();
    }
    var buildings = city.buildings ? city.buildings : new Array();
    for (var i = 0; i < buildings.length; i++) {
      if (buildings[i].type == type) {
        return buildings[i];
      }
    }
    return false;
  },
  cityGetBuildingsByType: function (type, city) {
    if (typeof (type) == 'object' && typeof (type.id) != 'undefined') {
      var tmp = city;
      city = type;
      type = tmp;
    } else {
      city = typeof (city) != 'undefined' ? city : IkaTools.getCurrentCity();
    }
    var buildings = city.buildings ? city.buildings : new Array();
    var ret = new Array();
    for (var i = 0; i < buildings.length; i++) {
      if (buildings[i].type == type) {
        ret.push(buildings[i]);
      }
    }
    return ret;
  },
  cityGetBuildBuilding: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return (IkaTools.cityGetBuildSecondsRemaining(city) > 0 && typeof (city.buildBuilding) != 'undefined' && typeof (city.buildBuilding) == 'object') ? city.buildBuilding : false;
  },
  cityGetBuildSecondsRemaining: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    var buildEnd = typeof (city.buildEnd) != 'undefined' ? parseInt(city.buildEnd) : 0;
    var d = new Date();
    var timeLeft = buildEnd - d.getTime();
    return timeLeft > 0 ? Math.floor(timeLeft / 1000) : false;
  },
  cityGetIncome: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.income) == 'undefined' ? 0 : parseInt(city.income);
  },
  cityGetIslandId: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.islandId) == 'undefined' ? 0 : parseInt(city.islandId);
  },
  cityGetIslandX: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    var coords = city.name.match(/^\s*\[(\d+):(\d+)\]/)
    if (coords) return coords[1];
    else return typeof (city.islandX) == 'undefined' ? 0 : parseInt(city.islandX);
  },
  cityGetIslandY: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    var coords = city.name.match(/^\s*\[(\d+):(\d+)\]/)
    if (coords) return coords[2];
    else return typeof (city.islandY) == 'undefined' ? 0 : parseInt(city.islandY);
  },
  cityGetIslandId: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.islandId) == 'undefined' ? 0 : parseInt(city.islandId);
  },
  cityGetLevel: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.level) == 'undefined' ? 0 : parseInt(city.level);
  },
  cityGetResource: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    if (type == 'gold') {
      return typeof (city.income) != 'undefined' ? parseInt(city.income) : 0;
    } else if (type == 'population') {
      return (typeof (city.resources) == 'undefined' || typeof (city.resources[type]) == 'undefined') ? 0 : parseInt(city.resources[type]);
    } else {
      var start = (typeof (city.resources) == 'undefined' || typeof (city.resources[type]) == 'undefined') ? 0 : parseInt(city.resources[type]);
      var d = new Date();
      var timeSince = (typeof (city.resourceChangeUpdated) == 'undefined' || typeof (city.resourceChangeUpdated[type]) == 'undefined') ? 0 : (d.getTime() - parseInt(city.resourceChangeUpdated[type])) / 1000;
      timeSince = timeSince / 60;
      var hoursSince = timeSince / 60;
      var qty = Math.floor(start + (IkaTools.cityGetResourceChange(type, city) * hoursSince));
      return qty < IkaTools.cityGetResourceMax(type, city) ? qty : IkaTools.cityGetResourceMax(type, city);
    }
  },
  cityGetResourceChange: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    var change = (typeof (city.resourceChanges) == 'undefined' || typeof (city.resourceChanges[type]) == 'undefined') ? 0 : parseInt(city.resourceChanges[type]);
    return type == 'wine' ? change - IkaTools.cityGetWineConsumption(city) : change;
  },
  cityGetResourceMax: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return (typeof (city.resourceMaximums) == 'undefined' || typeof (city.resourceMaximums[type]) == 'undefined') ? 0 : parseInt(city.resourceMaximums[type]);
  },
  cityGetSimpleName: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return city.name.replace(/^\[\d+:\d+\]\s/, '')
  },
  cityGetSawmillLevel: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.sawmillLevel) == 'undefined' ? 0 : parseInt(city.sawmillLevel);
  },
  cityGetShips: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    city.ships = typeof (city.ships) == 'undefined' ? {} : city.ships;
    return city.ships;
  },
  cityGetShipQty: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    if (typeof (city.ships) == 'undefined') return 0;
    return typeof (city.ships[type]) == 'undefined' ? 0 : (parseInt(city.ships[type]).toString() != 'NaN' ? parseInt(city.ships[type]) : 0);
  },
  cityGetTradegoodLevel: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.tradegoodLevel) == 'undefined' ? 0 : parseInt(city.tradegoodLevel);
  },
  cityGetTradegoodType: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.tradegoodType) == 'undefined' ? false : city.tradegoodType;
  },
  cityGetUnitQty: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    if (typeof (city.units) == 'undefined') return 0;
    return typeof (city.units[type]) == 'undefined' ? 0 : (parseInt(city.units[type]).toString() != 'NaN' ? parseInt(city.units[type]) : 0);
  },
  cityGetUnitInTraining: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    var none = {
      qty: 0
    };
    if (typeof (city.unitsInTraining) == 'undefined') return none;
    //if(city.unitsInTraining && city.unitsInTraining[type]) alert(type + ' - ' + city.unitsInTraining[type].qty)
    return typeof (city.unitsInTraining[type]) == 'undefined' ? none : city.unitsInTraining[type];
  },
  cityGetUnits: function (type, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    city.units = typeof (city.units) == 'undefined' ? {} : city.units;
    return city.units;
  },
  cityGetWineConsumption: function (city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof (city.wineConsumption) == 'undefined' ? 0 : city.wineConsumption;
  },
  cityIsOwn: function (city) {
    city = city || IkaTools.getCurrentCity();
    return (city.type == '' || city.type.match(/tradegood/) || city.type == 'ownCity');
  },
  citySetResourceProduction: function (type, production, city) {
    city = typeof (city) == 'object' ? city : IkaTools.getCurrentCity();
    // update resource production
    city.resourceChanges = typeof (city.resourceChanges) != 'object' ? {} : city.resourceChanges;
    city.resourceChanges[type] = production;
    city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
    var d = new Date();
    city.resourceChangeUpdated[type] = d.getTime();
    IkaTools.saveCity(city);
  },
  formatMilliseconds: function (milliseconds) {
    return IkaTools.formatSeconds(Math.floor(milliseconds / 1000));
  },
  formatSeconds: function (seconds) {
    var hours = seconds > 3600 ? Math.floor(seconds / 3600) : 0;
    var minutes = Math.floor((seconds % 3600) / 60);
    minutes = (hours > 0 && minutes < 10) ? '0' + minutes.toString() : minutes;
    seconds = seconds % 60;
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds;
    var text = minutes + ':' + seconds;
    text = hours > 0 ? hours + ':' + text : text;
    return text;
  },
  getAllianceId: function () {
    var allianceId = IkaTools.getVal('allianceId');
    allianceId = (allianceId && allianceId.toString().match(/^\d+/)) ? allianceId : 'not_loaded';
    if (allianceId == 'not_loaded') IkaTools.views.diplomacyAdvisorAlly(IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=diplomacyAdvisorAlly'));
    return IkaTools.getVal('allianceId');
  },
  getCities: function () {
    return IkaTools.cities;
  },
  getCityById: function (id) {
    var cities = IkaTools.cities;
    for (var i = 0; i < cities.length; i++) {
      if (cities[i].id == id) {
        return cities[i];
      }
    }
    return false;
  },
  getCurrentCity: function () {
    return IkaTools.EphemeralGameData.getCurrentCity();
  },
  getCurrentCityId: function () {
    return IkaTools.EphemeralGameData.getCurrentCityId();
  },
  getCurrentIslandId: function () {
    return IkaTools.EphemeralGameData.getCurrentIslandId();
  },
  getDomain: function () {
    return document.domain;
  },
  getMovements: function () {
    var movements = IkaTools.getVal('movements');
    var newMovements = [];
    var d = new Date();
    for (var i = 0; i < movements.length; i++)
    if (d.getTime() < movements[i].arrivalTime) newMovements.push(movements[i]);
    return newMovements;
  },

  getMovementsUpdate: function (callbackFunction) {
    IkaTools.getRemoteDocument('http://' + IkaTools.getDomain() + '/index.php?view=militaryAdvisorMilitaryMovements', function (doc, documentText) {
      IkaTools.views['militaryAdvisorMilitaryMovements'](doc, documentText);
      if (typeof (callbackFunction) == 'function') {
        callbackFunction(IkaTools.getVal('movements'));
      }
    });
  },
  getScoreForPlayer: function (type, playerName, callback) {
    if (!type.match(/^(total|military|builder|buildings|scientists|research|gold|offense|defense|trade|resources|donations)$/)) alert('IkaTools error (see documentation): IkaTools.getScoreForPlayer invalid score type requested - ' + type);
    if (typeof (IkaTools.playerScoreCache) == 'undefined') IkaTools.playerScoreCache = {};
    if (typeof (IkaTools.playerScoreCache[playerName]) == 'undefined') IkaTools.playerScoreCache[playerName] = {};
    if (typeof (IkaTools.playerScoreCache[playerName][type]) == 'undefined') {
      IkaTools.playerScoreCache[playerName][type] = {};

      function parseResult(result) {
        var player_index = 0;
        $.each($('#mainview div.content table.table01:eq(1) td.name', result), function (k, v) {
          if ($(this).text().replace(/,|\./g, '') == playerName) player_index = k;
        });
        var points = parseInt($('#mainview div.content table.table01:eq(1) td.score:eq(' + player_index + ')', result).text().replace(/,|\./g, ''));
        IkaTools.playerScoreCache[playerName][type].points = points;
        var rank = parseInt($('#mainview div.content table.table01:eq(1) td.place:eq(' + player_index + ')', result).text().replace(/,|\./g, ''));
        IkaTools.playerScoreCache[playerName][type].rank = rank;
        return IkaTools.playerScoreCache[playerName][type];
      }
      var highscoreType = 'score';
      switch (type) {
      case 'military':
        highscoreType = 'army_score_main';
        break;
      case 'builder':
        highscoreType = 'building_score_main';
        break;
      case 'buildings':
        highscoreType = 'building_score_secondary';
        break;
      case 'scientists':
        highscoreType = 'research_score_main';
        break;
      case 'research':
        highscoreType = 'research_score_secondary';
        break;
      case 'gold':
        highscoreType = 'trader_score_secondary';
        break;
      case 'offense':
        highscoreType = 'offense';
        break;
      case 'defense':
        highscoreType = 'defense';
        break;
      case 'trade':
        highscoreType = 'trade';
        break;
      case 'resources':
        highscoreType = 'resources';
        break;
      case 'donations':
        highscoreType = 'donations';
        break;
      }
      var url = 'http://' + document.domain + '/index.php?view=highscore&highscoreType=' + highscoreType + '&searchUser=' + playerName.replace(/\s/g, '+');
      if (typeof (callback) == 'function') {
        IkaTools.getRemoteDocument(url, function (result) {
          callback(parseResult(result));
        });
      } else return parseResult(IkaTools.getRemoteDocument(url));

    } else if (typeof (callback) == 'function') callback(IkaTools.playerScoreCache[playerName][type])
    else return IkaTools.playerScoreCache[playerName][type];
  },
  getPlayerId: function () {
    var playerId = IkaTools.getVal('playerId');
    playerId = (playerId && playerId.toString().match(/^\d+/)) ? playerId : 'not_loaded';
    if (playerId == 'not_loaded') IkaTools.views.options(IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=options'));
    return IkaTools.getVal('playerId');
  },
  parseStringAsDocument: function (str) {
    var html = document.createElement("html");
    html.innerHTML = str;

    var domResponse = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
    for (var i = 0; i < html.childNodes.length; i++) {
      domResponse.documentElement.appendChild(domResponse.importNode(html.childNodes[i], true));
    }
    //console.log("Response: " + domResponse.documentElement.innerHTML);
    // Put the latests actionRequest value back into the page, so any future 
    // redirects (for example, clicking on an Empire Board building link) 
    // or form submits will use the latest value and succeed, rather than going to the 
    // "don't use tabs or click the back button" page.  (Obviously, this only 
    // affects the value in the current tab.  It doesn't make tabs work.)
    var actionRequest = $('#changeCityForm input[name=actionRequest]', html).val();
    $('input[name=actionRequest]').val(actionRequest);
    //var prevPage = $('#changeCityForm input[name=oldView]', html).val();
    //$('input[name=oldView]').val(prevPage);
    return domResponse;
  },
  getRemoteDocument: function (url, callback, method, data) {
    method = (typeof (method) == 'undefined' || !method) ? 'GET' : method;
    data = (typeof (data) == 'undefined' || !data) ? '' : data;
    var async = (typeof (callback) != 'function' || !callback) ? false : true;
    var headers = {
      "User-agent": navigator.userAgent,
      "Accept": method == 'POST' ? "application/atom+xml,application/xml,text/xml" : "text/html",
      "Cookie": document.cookie,
      "Referer": "http://" + document.domain + "/index.php",
    }
    if (method == 'POST') {
      headers['Content-type'] = 'application/x-www-form-urlencoded';
    }
    if (async) GM_xmlhttpRequest({
      method: method,
      url: encodeURI(url),
      data: data,
      headers: headers,
      onload: function (response) {
        callback(IkaTools.parseStringAsDocument(response.responseText), response.responseText);
      }
    });
    else {
      var request = new XMLHttpRequest();
      request.open("GET", url, false);
      request.send();
      return IkaTools.parseStringAsDocument(request.responseText);
    }
  },
  getTotalIncome: function () {
    var cities = IkaTools.getCities();
    var total = 0;
    for (var i = 0; i < cities.length; i++) {
      total += IkaTools.cityIsOwn(cities[i]) ? parseInt(IkaTools.cityGetResource('gold', cities[i])) : 0;
    }
    return total;
  },
  getTotalUpkeep: function () {
    var upkeep = IkaTools.getVal('totalUpkeep');
    return parseInt(upkeep).toString() == 'NaN' ? 0 : parseInt(upkeep);
  },
  getUnitTypeById: function (id) {
    switch (parseInt(id)) {
    case 301:
      return 'slinger';
    case 302:
      return 'swordsman';
    case 303:
      return 'phalanx';
    case 304:
      return 'marksman';
    case 305:
      return 'mortar';
    case 306:
      return 'catapult';
    case 307:
      return 'ram';
    case 308:
      return 'steamgiant';
    case 309:
      return 'bombardier';
    case 310:
      return 'cook';
    case 311:
      return 'medic';
    case 312:
      return 'gyrocopter';
    case 313:
      return 'archer';
    case 315:
      return 'spearman';
    case 316:
      return 'barbarian';
    default:
      return false;
    }
  },
  getVal: function (key, useDomain, stringifier) {
    if (typeof(useDomain) == 'function') {
      stringifier = useDomain;
      useDomain = true;
    } else if (typeof(useDomain) == 'undefined') {
      useDomain = true;
    }
    if (useDomain) {
      key = IkaTools.getDomain() + "/" + key;
    }
    return JSON.parse(GM_getValue(key, "{}"), stringifier);
  },
  getView: function () {
    return document.body.id;
  },
  reloadAllMilitary: function (callback) {
    IkaTools.getMovementsUpdate(function () { // update all movements
      // update units in all cities
      var cities = IkaTools.getCities();
      var numUpdated = 0;
      var numToUpdate = 0;
      for (var i = 0; i < cities.length; i++)
      if (IkaTools.cityIsOwn(cities[i])) numToUpdate += 2;
      else numToUpdate++;
      for (var i = 0; i < cities.length; i++) {
        if (IkaTools.cityIsOwn(cities[i])) {
          var barracks = IkaTools.cityGetBuildingByType('barracks', cities[i]);
          if (barracks) IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=barracks&id=' + cities[i].id + '&position=' + barracks.position, function (root) {
            numUpdated++;
            IkaTools.views.barracks(root);
            if (numUpdated == numToUpdate && typeof (callback) == 'function') callback();
          });
          else IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=cityMilitary-army&id=' + cities[i].id, function (root) {
            numUpdated++;
            var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1];
            IkaTools.views["cityMilitary-army"](root, cityId);
            if (numUpdated == numToUpdate && typeof (callback) == 'function') callback();
          });
          IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=cityMilitary-fleet&id=' + cities[i].id, function (root) {
            numUpdated++;
            var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1];
            IkaTools.views["cityMilitary-fleet"](root, cityId);
            if (numUpdated == numToUpdate && typeof (callback) == 'function') callback();
          });
        } else {
          cities[i].ships = {};
          IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=relatedCities&id=' + cities[i].id, function (root) {
            numUpdated++;
            try {
              var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1];
            } catch (e) {
              cityId = false;
            }
            if (cityId) {
              IkaTools.views.relatedCities(root, cityId);
            }
            if (numUpdated == numToUpdate && typeof (callback) == 'function') callback();
          });
        }
      }
    });
  },
  setVal: function (key, value, useDomain, replacer) {
    if (typeof(useDomain) == 'function') {
      replacer = useDomain;
      useDomain = true;
    } else if (typeof(useDomain) == 'undefined') {
      useDomain = true;
    }
    if (useDomain) {
      key = IkaTools.getDomain() + "/" + key;
    }
    value = JSON.stringify(value, replacer);
    GM_setValue(key, value);
  },
  goTo: function (url, cityId) {
    IkaTools.setVal('goToUrl', url)
    IkaTools.setVal('goToCityId', cityId);
    document.body.style.cursor = "wait";
    var loc = url.toString().match(/^\//) ? 'http://' + IkaTools.getDomain() + url : url;
    if (typeof (cityId) != 'undefined' && cityId != IkaTools.getCurrentCityId()) {



      var postdata = "";
      var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
      for (var i = 0; i < elems.length; i++) {
        postdata += "&" + elems[i].name + "=" + elems[i].value;
      }
      postdata += "&cityId=" + cityId + "&view=city";

      var xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      }
      xmlhttp.open('POST', 'http://' + location.host + '/index.php', true);
      xmlhttp.setRequestHeader('User-agent', window.navigator.userAgent);
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.setRequestHeader('Accept', 'application/atom+xml,application/xml,text/xml');
      xmlhttp.setRequestHeader('Referer', 'http://' + location.host + '/index.php');
      xmlhttp.overrideMimeType('text/javascript; charset=' + document.characterSet);

      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) document.location = loc;
      }
      xmlhttp.send(postdata);
      /*
			var node = getDocument(xmlhttp.responseText);
			node.getElementsByTagName("input")[2].value;
			*/



    } else {
      unsafeWindow.document.location = loc;
    }
  },
  viewIsBuilding: function () {
    for (var i = 0; i < IkaTools.buildingTypes.length; i++)
    if (IkaTools.buildingTypes[i] == IkaTools.getView()) return true;
    return false
  },
}




IkaTools.debug = function(text) {
  console.log.apply(console, arguments);
}
  
IkaTools.debugException = function(name, ex) {
  console.log("IkaTools error in " + name + ": " + ex + ex.stack);
}
  
IkaTools.Utils = {};

IkaTools.Utils.EphemeralData = function() {
};

IkaTools.Utils.EphemeralData.prototype.register = function(name, func) {
  this[name] = function() {
    var dataName = name + 'Data';
    if (this[dataName] === undefined) {
      this[dataName] = func();
    }
    return this[dataName];
  }
}


IkaTools.EphemeralGameData = new IkaTools.Utils.EphemeralData();

IkaTools.EphemeralGameData.register('getCurrentCityId', function() { return parseInt($('.viewCity a').attr("href").match(/cityId=(\d+)/)[1]); });
IkaTools.EphemeralGameData.register('getCurrentCity', function() { return IkaTools.getCityById(IkaTools.EphemeralGameData.getCurrentCityId()); });
IkaTools.EphemeralGameData.register('getCurrentIslandId', function() { return parseInt($(".viewIsland a").attr("href").match(/islandId=(\d+)/)[1]); });
//IkaTools.EphemeralGameData.register('getCities', function() { return IkaTools.getVal('cities') || {}; });

IkaTools.changeCity = function (city_id) {
  var postdata = "";
  var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
  for (var i = 0; i < elems.length; i++) {
    postdata += "&" + elems[i].name + "=" + elems[i].value;
  }
  postdata = postdata + "&cityId=" + city_id + "&view=city";
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  }
  xmlhttp.open('POST', 'http://' + location.host + '/index.php', false);
  xmlhttp.setRequestHeader('User-agent', window.navigator.userAgent);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.setRequestHeader('Accept', 'application/atom+xml,application/xml,text/xml');
  xmlhttp.setRequestHeader('Referer', 'http://' + location.host + '/index.php');
  xmlhttp.overrideMimeType('text/javascript; charset=' + document.characterSet);
  xmlhttp.send(postdata);
  var node = getDocument(xmlhttp.responseText);
  return node.getElementsByTagName("input")[2].value;
}

function getDocument(responseText) {
  var html = document.createElement("html");
  html.innerHTML = responseText;
  var response = document.implementation.createDocument("", "", null);
  response.appendChild(html);
  return response;
}


IkaTools.UI = {};

/*
 * Left menu object.  Adds items to the left when the display method is called.
 * Works on all views, not just city view where the left menu normally exists.
 * Somewhat loosely based on SideMenu in complete-0.5.0.js, but not looking 
 * stupid with regards to immediately falling back in z-index when collapsing.
 */
IkaTools.UI.LeftMenu = function(id, elements) {
  this.id = id;
  this.elements = elements;
}
  
IkaTools.UI.LeftMenu.ITEM_COLLAPSED_WIDTH = 53;
IkaTools.UI.LeftMenu.ITEM_EXPANDED_WIDTH = 199;
IkaTools.UI.LeftMenu.Z_INDEX_EXPANDED = 120000;
IkaTools.UI.LeftMenu.Z_INDEX_COLLAPSED = 65;
IkaTools.UI.LeftMenu.ANIMATION_DURATION = 0.3;
  
IkaTools.UI.LeftMenu.prototype.display = function(atTop) {
  // Add leftMenu div and "standard" contents if we are in a view where it is not already present
  var leftMenuDiv = $('#leftMenu');
  if (!leftMenuDiv.length) {
    leftMenuDiv = $('<div id="leftMenu" ><div id="leftmenu_' + this.id 
                    + '" class="slot_menu city_menu" style="z-index: 65; "><ul class="menu_slots"></ul></div></div>');
    $('#container').append(leftMenuDiv);
  }
  
  // Setup event handlers
  for (var i = 0; i < this.elements.length; i++) {
    var element = $(this.elements[i]);
    element.width(IkaTools.UI.LeftMenu.ITEM_COLLAPSED_WIDTH);
    element.mouseenter(function(e) {
      menu.expand(element);
    });
    element.mouseleave(function(e) {
      menu.contract(element);
    });
  }
  
  // Add elements to ui
  var menuSlots = $('ul.menu_slots', leftMenuDiv);
  if (atTop) {
    for (var i = this.elements.length - 1; i >= 0; i--) {
      menuSlots.prepend(this.elements[i]);
    }
  } else {
    for (var i = 0; i < this.elements.length; i++) {
      menuSlots.append(this.elements[i]);
    }
  }
},

IkaTools.UI.LeftMenu.prototype.contract = function(element) {
  var animation = new unsafeWindow.YAHOO.util.Anim(element, {
    width: {
       to: IkaTools.UI.LeftMenu.ITEM_COLLAPSED_WIDTH
    }
  }, IkaTools.UI.LeftMenu.ANIMATION_DURATION, unsafeWindow.YAHOO.util.Easing.easeOut);
  animation.onComplete.subscribe(function() { 
    $(element).parent().parent().css('z-index', IkaTools.UI.LeftMenu.Z_INDEX_COLLAPSED);
  });
  animation.animate();
  
}

IkaTools.UI.LeftMenu.prototype.expand = function (element) {
  var animation = new unsafeWindow.YAHOO.util.Anim(element, {
    width: {
      to: IkaTools.UI.LeftMenu.ITEM_EXPANDED_WIDTH
    }
  }, IkaTools.UI.LeftMenu.ANIMATION_DURATION, unsafeWindow.YAHOO.util.Easing.easeOut);
  animation.onStart.subscribe(function() { 
    $(element).parent().parent().css('z-index', IkaTools.UI.LeftMenu.Z_INDEX_EXPANDED);
  });
  animation.animate();
}

  
/**
 * City class.  Data type for IkaTools methods such as getCities, getCityById, getCurrentCity, etc.
 */
IkaTools.City = function(id){
  this.id = id;
  this.ikaToolsType = 'city';
  
  this.name;
  this.level = 0;
  this.type;
  
  if (IkaTools.config.trackData.resources) {
    this.resources = {
      wood: { current: 0, maximum: 0 },
      wine: { current: 0, maximum: 0 },
      marble: { current: 0, maximum: 0 },
      glass: { current: 0, maximum: 0 },
      sulfur: { current: 0, maximum: 0 },
      population: { current: 0 },
      citizens: { current: 0 }
    };
  }
  this.buildings = new Array(17);
}

// Internal methods
IkaTools.City.prototype._updateResources = function(currentInfo, maxInfo) {
  this._updateResource("wood", currentInfo["resource"], maxInfo["resource"]);
  this._updateResource("wine", currentInfo["1"], maxInfo["1"]);
  this._updateResource("marble", currentInfo["2"], maxInfo["2"]);
  this._updateResource("glass", currentInfo["3"], maxInfo["3"]);
  this._updateResource("sulfur", currentInfo["4"], maxInfo["4"]);
  this._updateResource("population", currentInfo["population"]);
  this._updateResource("citizens", currentInfo["citizens"]);
}
  
IkaTools.City.prototype._updateResource = function(name, current, max) {
  var resource = this.resources[name];
  resource.current = current;
  resource.maximum = max;
  resource.lastUpdate = new Date().getTime();
}

IkaTools.City.prototype.getBuildingByPosition = function(position) {
  return this.buildings[position];
}
  
IkaTools.City.prototype.getBuildingUpgrading = function() {
  return this.buildings[this.buildingUpgradingPosition];
}
  
IkaTools.City.prototype.isOwn = function() {
  return this.type == 'ownCity';
}


IkaTools.Building = function () {
  this.ikaToolsType = 'building';
  
  this.position;
  this.type;
  this.name;
  this.level;
  this.cityId;
  if (IkaTools.config.trackData.resources) {
    this.resources = {
      wood: 0, 
      wine: 0,
      marble: 0,
      glass: 0,
      sulfur: 0,
      time: ""
    };
    this.missingResources = {
      wood: 0,
      wine: 0,
      marble: 0,
      glass: 0,
      sulfur: 0,
      total: 0
    };
  }
}

IkaTools.getCurrentPosition = function () {
  var tmp = document.location.toString().match(/position=\d+/);
  return tmp ? tmp.toString().replace(/position=/, '') : false;
}

IkaTools.clearCities = function() {
  IkaTools.saveCities('cities', new Array());
}

IkaTools.loadCities = function() {
  if (!IkaTools.cities) {
    IkaTools.cities = IkaTools.getVal('cities', function(key, value) { 
      if (value) {
        if (value.ikaToolsType == 'city') {
          var city = new IkaTools.City(value.id);
          $.extend(city, value);
          return city;
        } else if (value.ikaToolsType == 'building') {
          var building = new IkaTools.Building();
          $.extend(building, value);
          return building;
        }
      }
      return value; 
    }) || new Array();
  }
}

IkaTools.saveCity = function (city) {
  var cities = IkaTools.getCities();
  for (var i = 0; i < cities.length; i++) {
    cities[i] = cities[i].id == city.id ? city : cities[i];
  }
  IkaTools.saveCities(cities);
}
  
IkaTools.saveCities = function (cities) {
  cities = cities || IkaTools.getCities();
  IkaTools.cities = cities;
  IkaTools.setVal('cities', cities);
}
  
IkaTools._TRADE_GOOD_LOOKUP = {
  "1": "wine",
  "2": "marble",
  "3": "glass",
  "4": "sulfur"
}

IkaTools.updateData = function () {
  try {
    IkaTools.loadCities();
    console.log("Loaded cities:");
    console.log(IkaTools.cities);
    
    // Process all known cities that show up in the dropdown.  Drop any cities that are no longer there.
    var cities = new Array();
    $.each(unsafeWindow.dataSetForView.relatedCityData, function(key, value) {
      if (key.substring(0, 5) == "city_") {
        var city = IkaTools.getCityById(value.id) || new IkaTools.City(value.id);
        city.name = value.name;
        city.type = value.relationship;
        var coords = value.coords.match(/\[(\d+):(\d+)\]/);
        city.islandX = parseInt(coords[1]);
        city.islandY = parseInt(coords[2]);
        if (value.tradegood) {
          city.tradegoodType = IkaTools._TRADE_GOOD_LOOKUP[value.tradegood];
        }
        cities.push(city);
      }
    });
    
    IkaTools.cities = cities;

    var currentCity = IkaTools.getCurrentCity();
    currentCity.islandId = IkaTools.getCurrentIslandId();
    // Update current city data
    if (unsafeWindow.dataSetForView.isOwnCity) {
      if (IkaTools.config.trackData.resources) {
        currentCity._updateResources(unsafeWindow.dataSetForView.currentResources, unsafeWindow.dataSetForView.maxResources);
      }
    }
    
    // handle building views
//    if (IkaTools.viewIsBuilding() && IkaTools.getCurrentPosition() && (!document.location.toString().match(/id=/) || document.location.toString().match(/id=(\d+)/)[1] == IkaTools.getCurrentCityId())) {
//      building = IkaTools.cityGetBuildingByPosition(IkaTools.getCurrentPosition());
//      if (!building) {
//        var building = new IkaTools.building();
//        building.cityId = IkaTools.getCurrentCityId();
//        building.position = IkaTools.getCurrentPosition();
//        IkaTools.getCurrentCity().buildings.push(building);
//      }
//      building.type = IkaTools.getView();
//      building.name = $('#mainview .buildingDescription h1').text();
//      building.level = $('#buildingUpgrade .buildingLevel').text().replace(/[^\d]*//*, '').replace(/[^\d]*/, '');
//      // update required resources
//      if (IkaTools.config.trackData.resources) {
//        building.resources = {
//          wood: 0,
//          wine: 0,
//          marble: 0,
//          glass: 0,
//          sulphur: 0,
//          time: ""
//        };
//        var resources = $('.resources li', $('#buildingUpgrade'));
//        for (var i = 0; i < resources.size(); i++) {
//          var type = resources[i].className.replace(/\s.*$/, '');
//          type = type == 'crystal' ? 'glass' : type;
//          var value = resources[i].innerHTML.replace(/<span.*?<\/span>\s*/, '');
//          value = type == 'time' ? value : value.replace(/[^\d]/, '');
//          building.resources[type] = value;
//        }
//      }
//      // update conscruction timers
//      IkaTools.updateConstructionTimer();
//    }
    // update construction time after upgrade request
    //		IkaTools.updateConstructionTimer();
    // parse current view
    if (IkaTools.views[IkaTools.getView()]) {
      IkaTools.views[IkaTools.getView()]();
    }
    // make sure cities were found
    if (cities.length > 0) IkaTools.saveCities(cities);
  } catch (e) {
    IkaTools.debugException("updateData", e);
  }
  console.log("IkaTools.updateData finished");
}

IkaTools.updateConstructionTimer = function(city) {
  if (IkaTools.config.trackData.construction) {
    var end = unsafeWindow.ikariam.getScreen().endUpgradeTime;
    var current = unsafeWindow.ikariam.getModel().requestTime;
    if (current < end) {
      var secondsLeft = end - current;
      var d = new Date();
      city.buildEnd = d.getTime() + (1000 * secondsLeft);
    }
  }
}

IkaTools.views = {};

IkaTools.views.academy = function (root) {
  root = typeof (root) == 'undefined' ? document : root;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text());
  // update research
  city.resourceChanges = typeof (city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['research'] = parseInt($('#valueResearch', root).text().replace(/[^\d]/g, ''));
  city.resources['research'] = city.resourceChanges['research'];
  var d = new Date();
  city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) == 'undefined' ? {} : city.resourceChangeUpdated;
  city.resourceChangeUpdated['research'] = d.getTime();
  if (maximum = $('#mainview .contentBox01h .content', root).html().replace(/setActualValue\(0\)/, '').match(/setActualValue\(\d+\)/)) {
    city.resourceMaximums = typeof (city.resourceMaximums) == 'undefined' ? {} : city.resourceMaximums;
    city.resourceMaximums['research'] = parseInt(maximum.toString().replace(/setActualValue\(/, '').replace(/\)/, ''));
  }
}
IkaTools.views.alchemist = function () {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));;
  IkaTools.citySetResourceProduction('sulfur', production);
}
IkaTools.views.barracks = function (root) {
  root = typeof (root) == 'undefined' ? document : root;
  var cityId = $('a[href*="armyGarrisonEdit"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  $('ul#units li.unit', root).each(function (i) {
    var type = this.className.replace(/unit\s*/, '');
    var qty = $('div.unitcount', this).text().replace(/[^\d]/g, '');
    city.units = typeof (city.units) == 'undefined' ? {} : city.units;
    city.units[type] = qty;
  });
  // read current training orders
  city.unitsInTraining = {};
  $('#unitConstructionList .army', root).each(function (i) {
    var type = IkaTools.getUnitTypeById(this.className.match(/\d+/)[0]);
    city.unitsInTraining[type] = typeof (city.unitsInTraining[type]) == 'undefined' ? {} : city.unitsInTraining[type];
    city.unitsInTraining[type].qty = city.unitsInTraining[type].qty ? city.unitsInTraining[type].qty : 0;
    city.unitsInTraining[type].qty += parseInt($('.unitcounttextlabel', this).text().replace(/[^\d]/g, ''));
  });
  IkaTools.saveCity(city);
}
  
IkaTools.views.city = function (root) {
  try {
    var data = unsafeWindow.ikariam.getScreen().data;
    console.log(data);
    var city = IkaTools.getCityById(parseInt(data.id));
    
    if (city && city.isOwn()) {
      var buildings = new Array(17);
      
      for (var i = 0; i < 17; i++) {
        var buildingData = data.position[i];
        if (buildingData.type != 'buildingGround') {
          var building = city.getBuildingByPosition(i) || new IkaTools.Building();
          
          building.name = buildingData.name;
          building.position = i;
          building.type = buildingData.building;
          building.cityId = city.id;
          
          // check for city hall 
          if (building.position == 0) {
            city.level = building.level;
          }
          
          if (buildingData.completed) {
            var end = parseInt(buildingData.completed);
            var current = unsafeWindow.ikariam.getModel().requestTime;
            building.completion = new Date().getTime() + (1000 * (end - current));
          } else {
            building.completion = 0;
          }
          
          buildings[i] = building;
        }
      }
      city.buildings = buildings;
    }

//      if (!underConstruction) {
//        city.buildEnd = 0;
//        city.buildingUpgradingPosition = -1;
//      } else {
//        console.log("Time remaining: " + unsafeWindow.dataSetForView.nextETA);
//      }
//      city.buildings = newBuildings;
//    }
//    // Construction timer
//    IkaTools.updateConstructionTimer(city);
  } catch (e) {
    IkaTools.debugException("view.city", e);
  }
}
  
IkaTools.views["cityMilitary-army"] = function (root, cityId) {
  root = typeof (root) == 'undefined' ? document : root;
  var city = typeof (cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.units = typeof (city.units) == 'undefined' ? {} : city.units;
  var u = $('#tab1 div.content table tr.count td', root);
  city.units.phalanx = parseInt(u[0].innerHTML);
  city.units.steamgiant = parseInt(u[1].innerHTML);
  city.units.spearman = parseInt(u[2].innerHTML);
  city.units.swordsman = parseInt(u[3].innerHTML);
  city.units.slinger = parseInt(u[4].innerHTML);
  city.units.archer = parseInt(u[5].innerHTML);
  city.units.marksman = parseInt(u[6].innerHTML);
  city.units.ram = parseInt(u[7].innerHTML);
  city.units.catapult = parseInt(u[8].innerHTML);
  city.units.mortar = parseInt(u[9].innerHTML);
  city.units.gyrocopter = parseInt(u[10].innerHTML);
  city.units.bombardier = parseInt(u[11].innerHTML);
  city.units.cook = parseInt(u[12].innerHTML);
  city.units.medic = parseInt(u[13].innerHTML);
  IkaTools.saveCity(city);
}
IkaTools.views["cityMilitary-fleet"] = function (root, cityId) {
  root = typeof (root) == 'undefined' ? document : root;
  var city = typeof (cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.ships = typeof (city.ships) == 'undefined' ? {} : city.ships;
  var u = $('#tab2 div.content table tr.count td', root);
  city.ships.ram = parseInt(u[0].innerHTML);
  city.ships.flamethrower = parseInt(u[1].innerHTML);
  city.ships.steamboat = parseInt(u[2].innerHTML);
  city.ships.ballista = parseInt(u[3].innerHTML);
  city.ships.catapult = parseInt(u[4].innerHTML);
  city.ships.mortar = parseInt(u[5].innerHTML);
  city.ships.submarine = parseInt(u[6].innerHTML);
  IkaTools.saveCity(city);
}
IkaTools.views.diplomacyAdvisorAlly = function (dom) {
  dom = typeof (dom) == 'undefined' ? document : dom;
  var allianceId = 0;
  var circularLink = $('a[href*="sendIKMessage&msgType=51"]', dom);
  if (circularLink.size() == 1) allianceId = circularLink.attr('href').match(/allyId=(\d+)/)[1];
  IkaTools.setVal('allianceId', allianceId);
}
IkaTools.views.embassy = function (dom) {
  dom = typeof (dom) == 'undefined' ? document : dom;
  var allianceId = 0;
  var circularLink = $('#embassyMenu a[href*="sendIKMessage"]', dom);
  if (circularLink.size() == 1) allianceId = circularLink.attr('href').match(/allyId=(\d+)/)[1];
  IkaTools.setVal('allianceId', allianceId);
}
IkaTools.views.deployment = function () {
  if (document.location.toString().match(/deploymentType=army/)) {
    // update number of units
    var city = IkaTools.getCurrentCity();
    city.units = typeof (city.units) == 'undefined' ? {} : city.units;
    $('ul.assignUnits li').each(function (i) {
      var type = this.className;
      var qty = parseInt($('div.amount', this)[0].innerHTML.replace(/[^\d]/g, ''));
      city.units[type] = qty;
    });
    // update units on deployment
    $('#selectArmy input.button')[0].addEventListener('click', function () {
      var city = IkaTools.getCurrentCity();
      city.units = typeof (city.units) == 'undefined' ? {} : city.units;
      $('ul.assignUnits li').each(function (i) {
        var type = this.className;
        var qty = parseInt($('input', this)[0].value);
        city.units[type] = parseInt(city.units[type]) - qty;

        //				alert(type + ' - ' + city.units[type]);
      });
      var cities = IkaTools.getCities();
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].id == IkaTools.getCurrentCityId()) cities[i] = city;
      }
      IkaTools.saveCities(cities);
    }, false);
  }
}
IkaTools.views.finances = function (root) {
  var root = typeof (root) != 'undefined' ? root : document;
  var cities = IkaTools.getCities();
  $('tr', $('#mainview table', root).eq(1)).each(function (i) {
    if (i > 0 && i < cities.length + 1) {
      var isNegative = $('td:eq(3)', this).text().match(/^\s*-/);
      cities[i - 1].income = parseInt($('td:eq(3)', this).text().replace(/[^\d]/g, ''));
      cities[i - 1].income = isNegative ? cities[i - 1].income * -1 : cities[i - 1].income;
    }
  });
  var upkeepText = $('#mainview table:eq(4) tr:eq(2) td:eq(3)', root).text();
  IkaTools.totalUpkeep = parseInt(upkeepText.replace(/[^\d]/g, ''));
  IkaTools.setVal('totalUpkeep', IkaTools.totalUpkeep);
  IkaTools.saveCities(cities);
}
IkaTools.views.forester = function () {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('wood', production);
}
IkaTools.views.island = function (root, cityId) {
  root = typeof (root) == 'undefined' ? document : root;
  var city = typeof (cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  if ($('a#city_' + city.id, root).size() > 0) {
    try {
      var islandId = $('a[href*="view=resource"]', root).attr('href').match(/id=(\d+)/)[1].toString();
    } catch (e) {
      var islandId = $('a[href*="view=island"]', root).attr('href').match(/id=(\d+)/)[1].toString();
    }
    // update tradegood
    var className = $('ul#islandfeatures #tradegood', root).attr('class');
    city.tradegoodType = className.match(/^[^\s]+/).toString();
    city.tradegoodType = city.tradegoodType == 'crystal' ? 'glass' : city.tradegoodType;
    city.tradegoodLevel = parseInt(className.match(/\d+$/).toString());
    // update sawmill
    var title = $('#islandfeatures li.wood a', root).attr('title');
    city.sawmillLevel = parseInt(title.match(/\d+$/).toString());
  }
  IkaTools.saveCity(city);
}
// Improved version of military movements handler that successfully parses return time 
// for all movements (including return from occupation movements) and also successfully 
// parses all missions (including incoming trade missions in alternate rows of the table -
// these do not have a class set on them).
IkaTools.views.options = function (dom) {
  dom = typeof (dom) == 'undefined' ? document : dom;
  var playerId = $('#options_debug td:eq(0)', dom).text();
  IkaTools.setVal('playerId', playerId);
}
IkaTools.views.militaryAdvisorMilitaryMovements = function (root, documentText) {
  root = typeof (root) == 'undefined' ? document : root;
  // We need to find the script that initializes military movement countdowns.  If 
  // this is the visible document, we can narrow it down to the script tag 
  // containing the countdown initializers.  If it is the result of an ajax request, 
  // we won't be able to narrow it down to the particular script tag, but that's ok 
  // because we can just search the entire document text.
  var movementsScript = documentText;
  $('script', root).each(function () {
    var source = $(this).html();
    if (source.match(/getCountdown.*el:.*fleetRow/)) {
      movementsScript = source;
    }
  });
  movementsScript = movementsScript || '';
  var movements = new Array();
  var d = new Date();
  $('#fleetMovements table.locationEvents tr:gt(0)', root).each(function () {
    if (true) { // Incoming trade fleets on non-alternate rows have no class
      var tds = $('td', this);
      var movement = {
        type: $(this).attr('class') ? ($(this).attr('class').match(/[^\s]+$/) || '').toString() : '',
        units: new Array(),
      };
      //for(var i = 0; i < tds.length; i++) {
      var offset = tds.length - 9; // offset is 1 when "Speed" column is shown, 0 otherwise 
      // get ID and arrival time
      if ($(tds[1]).attr('id').match(/fleetRow/)) {
        movement.id = parseInt($(tds[1]).attr('id').match(/\d+$/).toString());
        movement.timeString = $(tds[1]).text();
        //movement.hours = movement.timeString.match(/\d+h/) ? parseInt(movement.timeString.match(/\d+h/).toString().replace(/h/, '')) : 0;
        //movement.minutes = movement.timeString.match(/\d+m/) ? parseInt(movement.timeString.match(/\d+m/).toString().replace(/m/, '')) : 0;
        //movement.seconds = movement.timeString.match(/\d+s/) ? parseInt(movement.timeString.match(/\d+s/).toString().replace(/s/, '')) : 0;
        //movement.arrivalTime = d.getTime() + (movement.hours * (60*60*1000)) + (movement.minutes * (60*1000) + (movement.seconds * 1000));
        var initCountdownMatch = new RegExp("getCountdown.*enddate: (\\d+).*currentdate: (\\d+).*fleetRow" + movement.id).exec(movementsScript);
        if (initCountdownMatch) {
          var endTime = parseInt(initCountdownMatch[1]);
          var currentTime = parseInt(initCountdownMatch[2]);
          var remaining = (endTime - currentTime) * 1000;
          movement.arrivalTime = d.getTime() + remaining;
          movement.hours = remaining / 60 / 60;
          movement.minutes = (remaining / 60) % 60;
          movement.seconds = (remaining) % 60;
        }
      }
      // get mission & status
      if ($('img', tds[5 + offset]).size() == 1 && $('img', tds[5 + offset]).attr('src').match(/mission_/)) {
        movement.mission = $('img', tds[5 + offset]).attr('src').match(/mission_[^\.]+/).toString().replace(/^mission_/, '');
        if ($(tds[5 + offset]).attr('title').match(/\([^\)]+\)/)) {
          movement.status = $(tds[5 + offset]).attr('title').match(/\([^\)]+\)/).toString().replace(/(\(|\))/g, '');
        } else {
          movement.status = $(tds[5 + offset]).attr('title');
        }
        movement.description = $(tds[5 + offset]).attr('title');
      }
      // get abort href
      if ($('a', tds[8 + offset]).size() == 1 && $('a', tds[8 + offset]).attr('href').match(/abortFleetOperation/)) {
        movement.abortHref = $('a', tds[8 + offset]).attr('href');
      }
      // get units
      var cargoShipsFound = false;
      var unitsFound = false;
      if ($('.unitBox', tds[2 + offset]).size() > 0) {
        var unitDivs = $('.unitBox', tds[2 + offset]);
        for (var x = 0; x < unitDivs.size(); x++) {
          var u = {
            name: unitDivs[x].title,
            qty: parseInt($('.count', unitDivs[x]).text().toString().replace(/(,|\.)/g, '')),
            iconSrc: $('.icon img', unitDivs[x]).size() == 1 ? $('.icon img', unitDivs[x]).attr('src') : $('.iconSmall img', unitDivs[x]).attr('src'),
          };
          if (u.iconSrc && u.iconSrc.indexOf('ship') >= 0) {
            // Might not be cargo ships, could be navy ships.  But that's ok, because we don't want to parse 
            // Navies as having cargo ships anyway.
            cargoShipsFound = true;
          } else {
            unitsFound = true;
          }
          movement.units.push(u);
        }
      }
      // ships (works for both incoming trade and other missions), but only for English.  
      // Could be enhanced to handle other languages.
      if (!cargoShipsFound) {
        //IkaTools.debug('Ship numbers: ' + $(tds[2]).text());
        //IkaTools.debug('Match: ' + $(tds[2]).text().match(/(\d+) Ship/g));
        var match = /(\d+) Ship/.exec($(tds[2 + offset]).text());
        if (match) {
          var ships = parseInt(match[1]);
          if (movement.mission && (movement.mission == 'blockade' || movement.mission == 'deployfleet')) {
            movement.units.push({
              name: 'Unknown Ships',
              qty: ships,
              iconSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/200px-Question_mark_alternate.svg.png',
            });
          } else if (movement.mission && (movement.mission == 'pillage' || movement.mission == 'occupy')) {
            movement.units.push({
              name: 'Unknown Units',
              qty: ships,
              iconSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/200px-Question_mark_alternate.svg.png'
            });
          } else {
            movement.units.push({
              name: 'Cargo Ship',
              qty: ships,
              iconSrc: '/skin/characters/fleet/40x40/ship_transport_r_40x40.gif'
            });
          }
        }
      }
      // Try to parse out a number of units for situations where you don't know the 
      // exact disposition (incoming deployments/pillages/occupations by other players).
      // Again, only works for English.
      if (!unitsFound) {
        var match = /(\d+) Unit/.exec($(tds[2 + offset]).text());
        if (match) {
          var units = parseInt(match[1]);
          movement.units.push({
            name: 'Unknown Units',
            qty: units,
            iconSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/200px-Question_mark_alternate.svg.png'
          });
        }
      }
      movement.direction = ($('img', tds[6 + offset]).size() == 1 ? 'right' : ($('img', tds[4]).size() == 1 ? 'left' : false));
      movement.originId = $('a', $('td', this)[3 + offset]).attr('href').toString().match(/\d+$/).toString();
      movement.originCityName = $('a', $('td', this)[3 + offset]).text();
      movement.originPlayerName = $('td:eq(' + (3 + offset) + ')', this).text().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
      movement.targetId = $('a', $('td', this)[7 + offset]).attr('href').match(/\d+$/).toString();
      movement.targetCityName = $('a', $('td', this)[7 + offset]).text();
      try {
        movement.targetPlayerName = $('td:eq(' + (7 + offset) + ')', this).text().toString().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
      } catch (e) {
        movement.targetPlayerName = false;
      }
      //}
      movements.push(movement);
    }
  });
  IkaTools.setVal('movements', movements);
};
IkaTools.views.relatedCities = function (root, cityId) {
  var city = typeof (cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.units = {};
  $('div.content table.army div.armybutton', $('div#selectMilitary', root)[0]).each(function (i) {
    var type = this.className.match(/\s*([^\s]+)$/)[1];
    city.units[type] = parseInt(this.innerHTML.match(/\d+/)[0]);
  });
}, IkaTools.views.resource = function (root) {
  root = typeof (root) == 'undefined' ? document : root;
  var cityId = $('#setWorkers input[name="cityId"]', root).attr('value');
  var city = IkaTools.getCityById(cityId);
  city.sawmillLevel = parseInt($('#resUpgrade .buildingLevel', root).text().replace(/[^\d]*/, ''));
  // update wood change
  city.resourceChanges = typeof (city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['wood'] = parseInt($('#valueResource', root).text().replace(/[^\d]*/g, ''));
  city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  var d = new Date();
  city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  city.resourceChangeUpdated['wood'] = d.getTime();
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text().replace(/[^\d]*/g, ''));
}
IkaTools.views.shipyard = function (root, cityId) {
  root = typeof (root) == 'undefined' ? document : root;
  $('ul#units li.unit', root).each(function (i) {
    var type = this.className.match(/ship_([^\s]+)/)[1];
    var qty = parseInt($('div.unitcount', this).text().replace(/[^\d]/g, ''));
    var city = typeof (cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
    city.ships = typeof (city.ships) == 'undefined' ? {} : city.ships;
    city.ships[type] = qty;
  });
}
IkaTools.views.stonemason = function () {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('marble', production);
}
IkaTools.views.tavern = function (root, responseText) {
  root = typeof (root) == 'undefined' ? document : root;
  responseText = typeof (responseText) == 'undefined' ? document.body.innerHTML : responseText;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  try {
    var consumption = parseInt(responseText.match(/wineCounter(.|\n|\r)*?amount.*?(\d+)/)[2]);
  } catch (e) {
    try {
      var consumption = parseInt(responseText.match(/tradegoodCounter(.|\n|\r)*?amount.*?(\d+)/)[2]);
    } catch (e) {
      var consumption = 0;
    }
  }
  var vineyard = IkaTools.cityGetBuildingByType('vineyard', city);
  if (vineyard) {
    consumption = Math.round(consumption * (100 - vineyard.level) / 100.0);
  }
  city.wineConsumption = consumption;
  IkaTools.saveCity(city);
}
IkaTools.views.tradeAdvisor = function () {
  $('#mainview #inboxCity a').each(function () {
    if (!$(this).attr('href').match(/island/) && $(this).attr('href').match(/id=(\d+)/) && $(this).attr('href').match(/position=/)) {
      var href = this.href;
      this.addEventListener('click', function () {
        IkaTools.goTo(href.replace(/\&currentCity=\d+/, ''), href.match(/id=(\d+)/)[1]);
      }, false);
      this.href = "javascript:void(0)";
    }
  });
}
IkaTools.views.tradegood = function (root) {
  root = typeof (root) == 'undefined' ? document : root;
  var cityId = $('#setWorkers input[name="cityId"]', root).attr('value');
  var city = IkaTools.getCityById(cityId);
  // update tradegood level
  city.tradegoodLevel = parseInt($('#resUpgrade .buildingLevel', root).text().replace(/,|\./g, ''));
  // update tradegood type
  if (type = $('#resUpgrade .content img:first-child', root).attr('src').match(/img_.+\.jpg/)) {
    type = type.toString().replace(/img_/, '').replace(/\.jpg/, '');
    city.tradegoodType = type == 'crystal' ? 'glass' : type;
    // update tradegood change
    city.resourceChanges = typeof (city.resourceChanges) != 'object' ? {} : city.resourceChanges;
    city.resourceChanges[type] = parseInt($('#valueResource', root).text().replace(/[^\d]*/g, ''));
    city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  }
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text().replace(/,|\./g, ''));
}
IkaTools.views.townHall = function (root) {
  root = typeof (root) == 'undefined' ? document : root;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  city.level = parseInt($('#buildingUpgrade .buildingLevel', root).text().replace(/[^\d]*/g, ''));
  city.resourceMaximums = typeof (city.resourceMaximums) == 'undefined' ? {} : city.resourceMaximums;
  city.resourceMaximums.population = parseInt($('#CityOverview .stats .space .total', root).text());
  // update town hall name
  var building = IkaTools.cityGetBuildingByPosition(0, city);
  building.name = $('#mainview h1:first-child', root).text();
  // update city income
  city.income = $('#PopulationGraph .citizens .production', root).text().replace(/[^\d]*/g, '');
  // update wood change
  city.resourceChanges = typeof (city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['wood'] = parseInt($('#PopulationGraph .woodworkers .production', root).text().replace(/[^\d]*/g, ''));
  city.resourceChangeUpdated = typeof (city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
}
IkaTools.views.winegrower = function () {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('wine', production);
}
IkaTools.getCurrentCityResource = function (type) {
  var resourceLis = $('#cityResources ul.resources li');
  for (var i = 0; i < resourceLis.size(); i++) {
    if (resourceLis[i].className == type) {
      switch (type) {
      case 'glass':
        var parsedType = 'crystal';
        break;
      case 'population':
        var parsedType = 'inhabitants';
        break;
      }
      return parseInt($('.#value_' + (type == 'glass' ? 'crystal' : type), resourceLis[i]).text().replace(/[^\d]/, ''));
    }
  }
  return 0;
}

IkaTools.getText = function (param) {
  var tokens = param.split('.');
  var tokenContainers = {};
  var langObj = {};
  for (var i = 0; i < tokens.length; i++) {
    tokenContainers[i] = i == 0 ? IkaTools.text[tokens[0]] : tokenContainers[i - 1][tokens[i]];
    if (i == tokens.length - 1) langObj = tokenContainers[i];
  }
  return typeof (langObj[IkaTools.lang]) != 'undefined' ? langObj[IkaTools.lang] : (typeof (langObj['en']) != 'undefined' ? langObj[IkaTools.lang] : false);
}
// this is ripped directly from Ikariam Farm List at http://userscripts.org/scripts/show/63706
// all credit to the original author
IkaTools.getTravelTime = function (x1, y1, x2, y2) {
  if (x1 == -1 || y1 == -1 || x2 == -1 || y2 == -1) return '?';
  if (x1 == x2 && y1 == y2) time = 1200 / 60 * 0.5;
  else time = 1200 / 60 * (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
  return Math.floor(time * 60 * 1000);
}


IkaTools.getLanguage = function () {
  var loc;
  if (navigator) {
    if (navigator.language) loc = navigator.language;
    else if (navigator.browserLanguage) loc = navigator.browserLanguage;
    else if (navigator.systemLanguage) loc = navigator.systemLanguage;
    else if (navigator.userLanguage) loc = navigator.userLanguage;
  }
  if (loc.length == 2) return loc;
  try {
    return loc.match(/^(.+?)-/)[1];
  } catch (e) {
    return 'en';
  }
}
IkaTools.lang = IkaTools.getLanguage();

IkaTools.text = {
  buildings: {
    academy: {
      en: 'Academy',
    },
    alchemist: {
      en: 'Alchemist',
    },
    architect: {
      en: 'Architect',
    },
    barracks: {
      en: 'Barracks',
    },
    branchOffice: {
      en: 'Trading Post',
    },
    carpentering: {
      en: 'Carpenter'
    },
    dump: {
      en: 'Dump'
    },
    embassy: {
      en: 'Embassy',
    },
    fireworker: {
      en: 'Fireworks Test Area',
    },
    forester: {
      en: 'Forester',
    },
    glassblowing: {
      en: 'Glassblower',
    },
    museum: {
      en: 'Museum',
    },
    optician: {
      en: 'Optician',
    },
    palace: {
      en: 'Palace',
    },
    palaceColony: {
      en: 'Gouvernor`s Residence',
    },
    port: {
      en: 'Trading Port',
    },
    safehouse: {
      en: 'Hideout',
    },
    shipyard: {
      en: 'Shipyard',
    },
    stonemason: {
      en: 'Stonemason',
    },
    tavern: {
      en: 'Tavern',
    },
    temple: {
      en: 'Temple',
    },
    townHall: {
      en: 'Town Hall',
    },
    vineyard: {
      en: 'Wine Press',
    },
    wall: {
      en: 'Town Wall',
    },
    warehouse: {
      en: 'Warehouse',
    },
    winegrower: {
      en: 'Wine Grower',
    },
    workshop: {
      en: 'Workshop',
    }
  }
}
  
IkaTools.UI.PopupWindow = function(params) {
  this.headerElement = $(params.headerElement);
  this.contentElement = $(params.contentElement);
  this.sidebarElements = $.map(params.sidebarElements, function(value, index) { return value; });
  this.oversized = params.oversized;
}
  
IkaTools.UI.PopupWindow.prototype.display = function() {
  $('#container').after(this.contentElement);
  var fakeContentElement = $('<div><div id="ikaPopupTempHolder">Hello</div></div>');
  unsafeWindow.ikariam.createTemplateView( {
    boxId: "",
    headerElem: this.headerElement.html(),
    contentElem: fakeContentElement.html(),
    sidebarEls: this.sidebarElements,
    oversized: true,
    replaceBox: true,
    keepSidebars: false
  });
  $('#ikaPopupTempHolder').replaceWith(this.contentElement);
  unsafeWindow.ikariam.controller.adjustSizes();
}

IkaTools.Utils.curry = function(f, context) {
  context = context || this;
  var args = Array.prototype.slice.call(arguments, 2);
  return function () {
    return f.apply(context, args.concat(arguments));
  };
}
  
IkaTools.Utils.actionTimer = function(name, f) {
  return function() {
    var startTime = new Date().getTime();
    var value = f();
    IkaTools.debug("Ran " + name + ": " + (new Date().getTime() - startTime) + "ms");
    return value;
  }
}

IkaTools.UI.TabPane = function(tabs) {
  this.tabs = tabs;
  this.currentTab = null;
  
  this.container = $('<div/>');
  
  var tabsContainer = $('<ul class="tabmenu"/>');
  this.container.append(tabsContainer);
  
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    
    tabsContainer.append(tab.tabHolder)
    this.container.append(tab.contentHolder);
    tab.contentHolder.hide();
    tab.tabHolder.click(IkaTools.Utils.curry(this.activate, this, tab));
  }
  
  this.activate(tabs[0]);
}
  
IkaTools.UI.TabPane.prototype.getContainer = function() {
  return this.container;
}
  
IkaTools.UI.TabPane.prototype.activate = function(tab) {
  if (this.currentTab === tab) {
    return;
  }
  
  if (this.currentTab) {
    this.currentTab.contentHolder.hide();
    this.currentTab.tabHolder.removeClass('selected');
  }
  
  tab.contentHolder.show();
  tab.tabHolder.addClass('selected');
  this.currentTab = tab;
}
  
IkaTools.UI.TabPane.Tab = function(tab, content) {
  this.tab = $(tab);
  this.content = $(content);
  
  this.contentHolder = $('<div class="contentBox01h"/>');
  this.contentHolder.append(this.content);
  
  this.tabHolder = $('<li class="tab"/>');
  this.tabHolder.append(this.tab);
}
 