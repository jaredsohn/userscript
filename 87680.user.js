// ==UserScript==
// @name             Ikariam Developer Tools
// @namespace        PhasmaExMachina
// @description      Tools to be included in your Ikariam Greasemonkey scripts.
// @author           PhasmaExMachina - Updates by Isgard
// @version          0.78
//
// @history      0.78 Fixed clear data for alliance highlighter
// @history      0.77 Bugfix at updateData
// @history      0.76 Fixed load of shipnames
// @history      0.76 Added clear all data to avoid old corrupt data problems
// @history      0.76 Added arabic language (translation by Lan Hekary)
// @history      0.75 Removed requests of related cities on military reload
// @history      0.75 Added unitNames and shipNames (theyre saved on barracks and shopyard views)
// @history      0.74 Added RTL support
// @history      0.74 Attempt to fix build resourses needed when over 1 million
// @history      0.73 Added skip parameter to IkaTools.cityGetBuildingByType()
// @history      0.73 Added js 1.6 backwards compatibility functions
// @history      0.73 Updated spanish language
// @history      0.73 Updated city view parse to not save deployed cities buildings
// @history      0.72 Updated getCurrentCity to fix the value when no city was selected
// @history      0.71 Modified IkaTools.getScoreForPlayer() to add extra params to callback function
// @history      0.70 Added greek language (translation by Panagiotis Papazoglou)
// @history      0.69 Updated polish language (translation by pitmm)
// @history      0.69 Updated turkish language (translation by Segwarg)
// @history      0.68 Added new text for PillageHelper (UpdateData, UpdateDataTxt)
// @history      0.68 Added turkish language (translation by Segwarg)
// @history      0.67 Updated russian language (translation by XIMIera)
// @history      0.66 Added polish language (translation by pitmm)
// @history      0.65 Updated IkaTools.text structure for easier translations
// @history      0.65 Updated IkaTools.getText method to match new IkaTools.text structure
// @history      0.65 Updated IkaTools.getLanguage method to use configured language or domain language (xxx.ikariam.com) before looking at browser language
// @history      0.65 Added russian language (translation by XIMIera)
// @history      0.64 Added multi-language support
// @history      0.64 Added spanish language
// @history      0.63 Fixed bug when IKARIAM object is declared at body instead of head.
// @history      0.62 Modified IkaTools.getText() method
// @history      0.62 Added buildings shortnames to languages
// @history      0.61 Fixed resources bug
// @history      0.60 Added dump
// @history      0.60 Fixed crystal tradegood detection
// @history      0.59 Added wine press saving for consumption calculation
// @history      0.58 Fixed some stupid coding errors that were causing island type detection bugs
// @history      0.57 Fixed glitch in IkaTools.getScoreForPlayer()
// @history      0.56 Fixed a glitch in resource detection on tradegood and wood mine views
// @history      0.55 Added IkaTools.buildingIsMaxed(building)
// @history      0.55 Fixed intermittant bug in reading island ID in island view 
// @history      0.54 Fixed bug in IkaTools.getTotalIncome()
// @history      0.53 Data reading fix for Chrome users
// @history      0.52 Fixed bug in academy and a few other pages
// @history      0.51 Added IkaTools.getTravelTime() (coppied from Ikariam Farm List at http://userscripts.org/scripts/show/63706)
// @history      0.50 Fixed wine consumption not being correctly read in tavern for wine producing cities 
// @history      0.50 Added IkaTools.getUnitTypeById(id) 
// @history      0.49 Small bugfix for IkaTools.goTo() 
// @history      0.48 Fix for reading of IKARIAM.currentCity info
// @history      0.47 Added IkaTools.getPlayerId() and IkaTools.getAllianceId()
// @history      0.46 Fixed getMovementsUpdate when trade ships are incoming 
// @history      0.45 Fixed calculation of total city income in finances view 
// @history      0.44 Yet another update to wine consumption tracking. Should fix things for everyone now.
// @history      0.43 Fixed a few poor coding choices related to reading military information
// @history      0.42 Added ship tracking
// @history      0.41 Fixed wine consumption not being stored 
// @history      0.40 Fixed wine consumption not being correctly read in tavern
// @history      0.40 Wine production is now updated when viewing winegrower
// @history      0.40 Wood production is now updated when viewing forester
// @history      0.40 Marble production is now updated when viewing stonemason
// @history      0.40 Sulfur production is now updated when viewing alchemist
// @history      0.40 actionRequest field is now updated when calling IkaTools.getRemoteDocument (thanks AubergineAnodyne)
// @history      0.40 Improved IkaTools.getMovementsUpdate (thanks AubergineAnodyne)
// @history      0.40 Improved IkaTools.getRemoteDocument (thanks AubergineAnodyne)
// @history      0.40 Improved "militaryAdvisorMilitaryMovements" view (thanks AubergineAnodyne)
// @history      0.39 Minor fix to parsing of movement data when run through google chrome
// @history      0.38 Reduced instance of infinite refresh from trade advisor page
// @history      0.37 Fixed bug in handling of occuppied or deployed cities
// @history      0.37 Fixed IkaTools.reloadAllMilitary() to include occuppied or deployed cities
// @history      0.36 Fixed redirection loop on island links in town advisor page
// @history      0.35 Added IkaTools.cityIsOwn(city) method
// @history      0.35 Additional error checking for data collection
// @history      0.34 City names are now read as text instead of HTML (strips out Â  etc.)
// @history      0.34 Links in Town Advisor now perform city change
// @history      0.32 Added IkaTools.reloadAllMilitary() method
// @history      0.32 IkaTools.views["cityMilitary-army"] now takes 2 parameters, root (document root) and cityId for remote unit updating
// @history      0.32 Added IkaTools.saveCity(city) method
// @history      0.31 Improved stability of moving from one city to another using IkaTools.goTo()
// @history      0.30 Fixed calculation of wine consumption when consumption is 0 
// @history      0.29 Improved integration with ScriptUpdater (http://userscripts.org/scripts/show/57756) 
// @history      0.28 Added IkaTools.addOptionsLink() method (requires http://userscripts.org/scripts/show/62718)
// @history      0.27 Fixed bad language reference to temple
// @history      0.26 Fixed income
// @history      0.25 Number of troops in town now updated on deploy units
// @history      0.22 Added type property to city objects (city.type) which is false for own cities or class name for occuppied or deployed cities
// @history      0.21 Fixed error in calculation of finances on finances page
// @history      0.20 IkaTools.getRemoteDocument() now mimics the browser's user agent
// @history      0.19 Put in a fix to help reduce data loss on page errors 
// @history      0.18 Simplified IkaTools.getView()
// @history      0.17 Fixed bug in saving current construction right after build
// @history      0.16 Added IkaTools.getText() method
// @history      0.16 Minor code improvements
// @history      0.16 Added public IkaTools.buildingTypes array that contains all building types
// @history      0.15 Fixed corruption of current city data when viewing someone else's city with a spy
// @history      0.14 Fixed addInfoBox() not working on some pages
// @history      0.13 Added some trackData config parameters (to be documented later)
// @history      0.12 Added IkaTools.formatMilliseconds() method
// @history      0.12 Added IkaTools.formatSeconds() method
// @history      0.12 Added IkaTools.getMovements() method
// @history      0.12 Added IkaTools.getMovementsUpdate() method
// @history      0.11 Fixed detection of cities of glass tradegood type
// @history      0.11 Added IkaTools.addCommas() method
// @history      0.10 Cleaned up the code a bit
// @history      0.10 Fixed bug where troop production in barracks would make the script think the barracks was being upgraded
// @history      0.09 Wine consumption is now taken into account
// @history      0.09 Resource gain no longer is calculated beyond max capacity
// @history      0.09 Added IkaTools.cityGetWineConsumption() method
//
// ==/UserScript==

//js 1.6 functions
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /*, thisp */)
  {
    "use strict";
 
    if (this === void 0 || this === null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();
 
    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, t))
          res.push(val);
      }
    }
 
    return res;
  };
}
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*,thisp*/)
  {
    "use strict";
 
    if (this === void 0 || this === null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();
 
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisp, t[i], i, t);
    }
  };
}
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*,thisp*/)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisp, t[i], i, t))
        return true;
    }

    return false;
  };
}
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(searchElement /*, fromIndex */)
  {
    "use strict";
 
    if (this === void 0 || this === null)
      throw new TypeError();
 
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;
 
    var n = 0;
    if (arguments.length > 0)
    {
      n = Number(arguments[1]);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
 
    if (n >= len)
      return -1;
 
    var k = n >= 0
          ? n
          : Math.max(len - Math.abs(n), 0);
 
    for (; k < len; k++)
    {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}
if (!document.querySelector)
{
  document.querySelector = function(selector)
  {
    var item = $(selector);
    if (item.size() > 0)
    {
      return item[0];
    }
    else
    {
      return null;
    }  
  }
}
if (!document.querySelectorAll)
{
  document.querySelectorAll = function(selector)
  {
    var list = $(selector);
    list.item = function(index)
    {
      if ((index < 0) || (index >= list.length))
        return null
      else
        return list[index];      
    }
    return list;
  }
}
var IkaRTL = {
  isRTL: getComputedStyle(document.body, null).getPropertyValue('direction') == 'rtl',
  getFloatText: function(toLeft)
  {
    return (!!toLeft) ? ((this.isRTL) ? 'right' : 'left') : ((this.isRTL) ? 'left' : 'right');
  }
}
IkaRTL.txtRight = IkaRTL.getFloatText(false);
IkaRTL.txtLeft = IkaRTL.getFloatText(true);

var IkaTools = {
  version:0.76,
  // declare default config options
  config:{
    language: '',
    debugMode:false,
    trackData:{
      construction:true,
      resources:true,  
    },
  },
  movementHanlders:[],
  maxBuildingLevel:32,
  buildingTypes:['academy', 'alchemist', 'architect', 'barracks', 'branchOffice', 'carpentering', 'embassy', 'fireworker', 'forester', 'glassblowing', 'museum', 'optician', 'palace', 'palaceColony', 'port', 'safehouse', 'shipyard', 'stonemason', 'temple', 'tavern', 'townHall', 'vineyard', 'wall', 'warehouse', 'dump', 'winegrower', 'workshop'],
  shipTypes:['ram', 'flamethrower', 'steamboat', 'ballista', 'catapult', 'mortar', 'submarine'],
  unitTypes:['phalanx', 'steamgiant', 'spearman', 'swordsman', 'slinger', 'archer', 'marksman', 'ram', 'catapult', 'mortar', 'gyrocopter', 'bombardier', 'cook', 'medic'],
  //---------------- "public" methods --------------------------------------
  init:function(params) 
  {
    // check for new version and clear data if necessary
    if (IkaTools.getVal('IkaTools.version') != IkaTools.version) 
    {
      IkaTools.clearAllData();  
      IkaTools.debug('ExMachina data cleared');
      IkaTools.setVal('IkaTools.version', IkaTools.version);
    }
      
    // double check goTo
    if(typeof(IkaTools.getVal('goToCityId')) != 'undefined' && IkaTools.getVal('goToCityId').toString().match(/^\d+$/) && IkaTools.getCurrentCityId().toString() != IkaTools.getVal('goToCityId').toString()) 
      IkaTools.goTo(IkaTools.getVal('goToUrl'), IkaTools.getVal('goToCityId'));
    else
      IkaTools.setVal('goToCityId', false);
    // load config options
    if(typeof(params) == 'object') 
    {
      for(var k in params) 
      { 
        if(typeof(params[k]) == 'object') 
        {
          for(var d in params[k]) 
          {
            IkaTools.config[k][d] = params[k][d];
          }
        } 
        else 
        {
          IkaTools.config[k] = params[k]; 
        }
      }
    }
    if(IkaTools.config.debugMode) 
    {
      var d = new Date();
      IkaTools.startTime = d.getTime();
    }
    try 
    {
      try
      {
        var str = document.getElementsByTagName('head')[0].innerHTML.match(/IKARIAM\s*=(.|\n)*?IKARIAM(.|\n)*?\};/)[0];
      }
      catch (e)
      {
        var str = document.body.innerHTML.match(/IKARIAM\s*=(.|\n)*?IKARIAM(.|\n)*?\};/)[0];
      }
      str = str.replace(/^IKARIAM\s+=\s+/, '').replace(/;\s*$/, '');
      var woodStr = str.match(/wood\s*:\s*(\d+)/g);
      var wineStr = str.match(/wine\s*:\s*(\d+)/g);
      var marbleStr = str.match(/marble\s*:\s*(\d+)/g);
      var crystalStr = str.match(/crystal\s*:\s*(\d+)/g);
      var sulfurStr = str.match(/sulfur\s*:\s*(\d+)/g);
      try 
      {
        var IKARIAM = {
          currentCity:
          {
            resources:
            {
              wood:parseInt(woodStr[0].match(/\d+/)[0]),
              wine:parseInt(wineStr[0].match(/\d+/)[0]),
              marble:parseInt(marbleStr[0].match(/\d+/)[0]),
              crystal:parseInt(crystalStr[0].match(/\d+/)[0]),
              sulfur:parseInt(sulfurStr[0].match(/\d+/)[0]),
            },
            maxCapacity:
            {
              wood:parseInt(woodStr[1].match(/\d+/)[0]),
              wine:parseInt(wineStr[1].match(/\d+/)[0]),
              marble:parseInt(marbleStr[1].match(/\d+/)[0]),
              crystal:parseInt(crystalStr[1].match(/\d+/)[0]),
              sulfur:parseInt(sulfurStr[1].match(/\d+/)[0]),
            }
          }        
        }
      }
      catch (e) 
      {
        var IKARIAM = unsafeWindow.IKARIAM;
      }
      IkaTools.ikariam = IKARIAM;
      // track data
      if(IkaTools.config.trackData && !document.location.toString().match(/undefined/)) 
      { 
        IkaTools.updateData(); 
      }
    }
    catch(e) 
    {
      if(IkaTools.config.debugMode) 
      {
        alert("Error in IkaTools.init():\n\n" + e); 
      }
    }
    if(IkaTools.config.debugMode) 
    {
      var d = new Date();
      IkaTools.endTime = d.getTime();
      IkaTools.debug('IkaTools.init() ' + (IkaTools.endTime - IkaTools.startTime) + 'ms');
    }
    // movement complete listener
    
    function checkMovements() 
    {
      var movements = IkaTools.getMovements();
      var d = new Date();
      var currentTime = d.getTime();
      var handlers = IkaTools.movementHanlders;
      for (var i = 0; i < movements.length; i++) 
      {
        var movement = movements[i];
        var remainingTime = movement.arrivalTime - currentTime;
        if(remainingTime > 0 && remainingTime <= 1000) 
        {
          switch(movement.mission) {
            case 'plunder': var targetCityId = movement.originId; break;
            case 'deployarmy': var targetCityId = movement.direction == 'left' ? movement.originId :movement.targetId; break;
            case 'defend': var targetCityId = movement.direction == 'left' ? movement.originId : movement.targetId; break;
            case 'deployfleet': var targetCityId = movement.direction == 'left' ? movement.originId : movement.targetId; break;
            default: var targetCityId = false;
          }
          if(targetCityId) {
            var targetCity = IkaTools.getCityById(targetCityId);
            if(targetCity && IkaTools.cityIsOwn(targetCity)) {
              // handle target city
              for(var x = 0; x < movement.units.length; x++) {
                // check for resource
                var unit = movement.units[x]; 
                var resourceMatch = unit.iconSrc.match(/icon_(wood|wine|marble|glass|sulfur)/);
                if(resourceMatch) {
                  var type = resourceMatch[1] == 'glass' ? 'crystal' : resourceMatch[1];
                  targetCity.resourceMaximums[type] += parseInt(unit.qty);
                }
                for(var z = 0; z < handlers.length; z++)
                  if(typeof(handlers[z]) == 'function')
                    handlers[z](movement);
              }
            }
          }
        }
      }
      IkaTools.saveCities();
    }
    if (IkaTools.config.trackData) setInterval(checkMovements, 1000);
  },
  addCommas:function(nStr)
  {
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
  addInfoBox:function(titleHtml, contentDiv)
  {
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
  addMovementHandler:function(handler) {
    if(typeof(handler) != 'function') {
      alert('IkaTools error: movement handlers must be functions');
      return;
    }
    IkaTools.movementHanlders.push(handler);
  },
  addOptionBlock:function(contentDiv) {
    var debugDiv = document.getElementById('options_debug');
    if (!!debugDiv)
    {
      debugDiv.parentNode.insertBefore(contentDiv, debugDiv);
      return true;
    }
    return false;
  },
  addOptionsLink:function(scriptName) {
    if(typeof(Config) == 'undefined') {
      var c = confirm("IkaTools.addOptionsLink() requires Script Options Dialogue by PhasmaExMachina.\n\nWould you like to go to this tool's page?");
      if(c)
        document.location = "http://userscripts.org/scripts/show/62718";
    } else {
      if($('#IkaOptionsDropdown').size() == 0) {
        GM_addStyle('\
          /* #IkaOptionsDropdown { position:absolute; } */\
          #GF_toolbar .version a {font: bold 11px Arial,Helvetica,sans-serif;}\
          #GF_toolbar .serverTime a {font: bold 11px Arial,Helvetica,sans-serif;}\
          #GF_toolbar a {margin: 0 8px !important;}\
          #IkaOptionsDropdown a {font: bold 11px Arial,Helvetica,sans-serif !important;}\
          #IkaOptionsDropdown:hover { padding-bottom:20px; }\
          #IkaOptionsDropdown #IkaOptionsDropdownLinks { display:none !important; }\
          #IkaOptionsDropdown:hover #IkaOptionsDropdownLinks { display:block !important;  }\
          #IkaOptionsDropdownLinks { background-color:#FFF5E1; padding:.5em; border:1px solid #666; position:absolute; margin-top:2px; right:-80px; width:170px; }\
          #IkaOptionsDropdownLinks a {color:#666; cursor:pointer; margin-'+IkaRTL.txtLeft+':0; padding-'+IkaRTL.txtLeft+':.2em; display:block; margin-bottom:.5em; }\
        ');
        var li = document.createElement('li');
        li.innerHTML = '<a href="javascript:void(0);" id="IkaOptionsDropdownMenuItem" style="position:relative;">Scripts <img src="' + Config.icons.config + '" align="absmiddle"/> <div id="IkaOptionsDropdownLinks"></div></a>';
        li.id = 'IkaOptionsDropdown';
        $('#GF_toolbar ul').append(li);
      }
      // add link
      var a = document.createElement('a');
      a.innerHTML = scriptName;
      var id = 'IkaScriptSettings_' + scriptName.replace(/\s/g, '_');
      a.id = id;
      a.addEventListener('click', function() {
        Config.show();
      }, false);
      $('#IkaOptionsDropdownLinks').append(a);      
      // make link red if script is outdated
      if(typeof(ScriptUpdater) != 'undefined' && typeof(ScriptUpdater.checkStored) == 'function' && ScriptUpdater.checkStored()) {
        $('#IkaOptionsDropdown a')[0].style.color = 'gold';
        a.style.color = '#CC0000';
        var img = document.createElement('img');
        img.src = ScriptUpdater.icons.install;
        img.setAttribute('style', 'vertical-align:middle; height:14px; float:'+IkaRTL.txtRight+'; cursor:pointer; margin-'+IkaRTL.txtLeft+':1em;');
        img.title = "Install updates or view version history";
        img.addEventListener('click', function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); }, false);
        $(a).before(img);
      }
    }    
  },
  buildingGetResourceMissing:function(type, building) {
    var city = IkaTools.getCityById(building.cityId);
    var missing = IkaTools.buildingGetResourceRequired(type, building) - IkaTools.cityGetResource(type, city);
    return missing > 0 ? missing : 0;
  },
  buildingGetResourceMissingTotal:function(building) {
    var total = 0;
    var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
    for(var i = 0; i < resourceNames.length; i++) {
      total += IkaTools.buildingGetResourceMissing(resourceNames[i], building);  
    }
    return total;
  },  
  buildingGetResourceRequired:function(type, building) 
  {
    return (typeof(building) == 'undefined'  || typeof(building.resources) == 'undefined' || typeof(building.resources[type]) == 'undefined') ? 0 : parseInt(building.resources[type]);
  },
  buildingGetResourceRequiredTotal:function(building) {
    var total = 0;
    var resourceNames = ["wood", "wine", "marble", "glass", "sulfur"];
    for(i in resourceNames) {
      total += IkaTools.buildingGetResourceRequired(resourceNames[i], building);  
    }
    return total;
  },  
  buildingIsMaxed:function(building) {
    if(building.type.match(/^(academy|alchemist|architect|branchOffice|carpentering|embassy|fireworker|forester|glassblowing|optician|safehouse|shipyard|stonemason|temple|vineyard|winegrower)$/))
      return parseInt(building.level) == 32;
    switch(building.type) {
      case 'museum': return parseInt(building.level) == 19;
      case 'palace': case 'palaceColony': return parseInt(building.level) == 11;
      case 'tavern': return parseInt(building.level) == 46;
      case 'townHall': return parseInt(building.level) == 38;
      case 'wall': return parseInt(building.level) == 48;
      case 'port': return parseInt(building.level) == 48;
      case 'warehouse': return parseInt(building.level) == 40;
      case 'dump': return parseInt(building.level) == 40;
      case 'workshop': return parseInt(building.level) == 24;
    }
    return false;
  },
  cityGetBuildingByPosition:function(position, city) {
    if(typeof(position) == 'object' && typeof(position.id) != 'undefined') {
      var pos = city;
      city = position;
      position = pos;
    } else {
      city = typeof(city) != 'undefined' ? city : IkaTools.getCurrentCity();  
    }
    var buildings = city.buildings ? city.buildings : new Array();
    for(var i = 0; i < buildings.length; i++) {
      if(buildings[i].position.toString() == position.toString()) {
        return buildings[i];
      }
    }
    return false;
  },
  cityGetBuildingByType:function(type, city, skip) {
    if(typeof(type) == 'object' && typeof(type.id) != 'undefined') {
      var tmp = city;
      city = type;
      type = tmp;
    } else {
      city = typeof(city) != 'undefined' ? city : IkaTools.getCurrentCity();  
    }
    var buildings = city.buildings ? city.buildings : new Array();
    var skipped = 0;
    skip = isNaN(skip) ? 0 : skip;
    for(var i = 0; i < buildings.length; i++) {
      if (buildings[i].type == type)
      {
        if (skipped < skip)
        {
          skipped++;
        }
        else
        {
          return buildings[i];
        }
      } 
    }
    return false;
  },
  cityGetBuildBuilding:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();  
    return (IkaTools.cityGetBuildSecondsRemaining(city) > 0 && typeof(city.buildBuilding) != 'undefined' && typeof(city.buildBuilding) == 'object') ? city.buildBuilding : false;
  },
  cityGetBuildSecondsRemaining:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();  
    var buildEnd = typeof(city.buildEnd) != 'undefined' ? parseInt(city.buildEnd) : 0;
    var d = new Date();
    var timeLeft = buildEnd - d.getTime();
    return timeLeft > 0 ? Math.floor(timeLeft / 1000) : false;
  },
  cityGetIncome:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.income) == 'undefined' ? 0 : parseInt(city.income);
  },
  cityGetIslandId:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.islandId) == 'undefined' ? 0 : parseInt(city.islandId);
  },
  cityGetIslandX:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    var coords = city.name.match(/^\s*\[(\d+):(\d+)\]/)
    if(coords)
      return coords[1];
    else 
      return typeof(city.islandX) == 'undefined' ? 0 : parseInt(city.islandX);
  },
  cityGetIslandY:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    var coords = city.name.match(/^\s*\[(\d+):(\d+)\]/)
    if(coords)
      return coords[2];
    else
      return typeof(city.islandY) == 'undefined' ? 0 : parseInt(city.islandY);
  },
  cityGetIslandId:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.islandId) == 'undefined' ? 0 : parseInt(city.islandId);
  },
  cityGetLevel:function(city) {
    city = typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.level) == 'undefined' ? 0 : parseInt(city.level);
  },
  cityGetResource:function(type, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    if(type == 'gold') {
      return typeof(city.income) != 'undefined' ? parseInt(city.income) : 0;
    } else if(type == 'population') {
      return (typeof(city.resources) == 'undefined' || typeof(city.resources[type]) == 'undefined') ? 0 : parseInt(city.resources[type]);
    } else {
      var start = (typeof(city.resources) == 'undefined' || typeof(city.resources[type]) == 'undefined') ? 0 : parseInt(city.resources[type]);
      var d = new Date();
      var timeSince = (typeof(city.resourceChangeUpdated) == 'undefined' || typeof(city.resourceChangeUpdated[type]) == 'undefined') ? 0 : (d.getTime() - parseInt(city.resourceChangeUpdated[type])) / 1000;
      timeSince = timeSince / 60;
      var hoursSince = timeSince / 60;
      var qty = Math.floor(start + (IkaTools.cityGetResourceChange(type, city) * hoursSince));
      return qty < IkaTools.cityGetResourceMax(type, city) ? qty : IkaTools.cityGetResourceMax(type, city);
    }
  },
  cityGetResourceChange:function(type, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    var change = (typeof(city.resourceChanges) == 'undefined' || typeof(city.resourceChanges[type]) == 'undefined') ? 0 : parseInt(city.resourceChanges[type]);
    return type == 'wine' ? change - IkaTools.cityGetWineConsumption(city) : change;
  },
  cityGetResourceMax:function(type, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return (typeof(city.resourceMaximums) == 'undefined' || typeof(city.resourceMaximums[type]) == 'undefined') ? 0 : parseInt(city.resourceMaximums[type]);
  },
  cityGetSimpleName:function(city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return city.name.replace(/^\[\d+:\d+\]\s/, '')
  },
  cityGetSawmillLevel:function(city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.sawmillLevel) == 'undefined' ? 0 : parseInt(city.sawmillLevel);
  },
  cityGetShips:function(type, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    city.ships = typeof(city.ships) == 'undefined' ? {} : city.ships;
    return city.ships;
  },
  cityGetShipQty:function(type, city) {
    if (typeof(city) != 'object')
      return 0;
    else if (typeof(city.ships) == 'undefined')
      return 0;
    return typeof(city.ships[type]) == 'undefined' ? 0 : (parseInt(city.ships[type]).toString() != 'NaN' ? parseInt(city.ships[type]) : 0);
  },
  cityGetTradegoodLevel:function(city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.tradegoodLevel) == 'undefined' ? 0 : parseInt(city.tradegoodLevel);
  },
  cityGetTradegoodType:function(city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.tradegoodType) == 'undefined' ? false : city.tradegoodType;
  },
  cityGetUnitQty:function(type, city) {
    if (typeof(city) != 'object')
      return 0;
    else if(typeof(city.units) == 'undefined')
      return 0;
    return typeof(city.units[type]) == 'undefined' ? 0 : (parseInt(city.units[type]).toString() != 'NaN' ? parseInt(city.units[type]) : 0);
  },
  cityGetUnitInTraining:function(type, city) {
    var none = {qty:0};
    if (typeof(city) != 'object')
      return none;
    else if(typeof(city.unitsInTraining) == 'undefined')
      return none;
    //if(city.unitsInTraining && city.unitsInTraining[type]) alert(type + ' - ' + city.unitsInTraining[type].qty)
    return typeof(city.unitsInTraining[type]) == 'undefined' ? none : city.unitsInTraining[type];
  },
  cityGetUnits:function(type, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    city.units = typeof(city.units) == 'undefined' ? {} : city.units;
    return city.units;
  },
  cityGetWineConsumption:function(city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    return typeof(city.wineConsumption) == 'undefined' ? 0 : city.wineConsumption;
  },
  cityIsOwn:function(city) {
    if (typeof(city) != 'object')
    {
      return false;
    }
    return (city.type == '' || city.type.match(/tradegood/));
  },
  citySetResourceProduction:function(type, production, city) {
    city =   typeof(city) == 'object' ? city : IkaTools.getCurrentCity();
    // update resource production
    city.resourceChanges = typeof(city.resourceChanges) != 'object' ? {} : city.resourceChanges;
    city.resourceChanges[type] = production; 
    city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
    var d = new Date();
    city.resourceChangeUpdated[type] = d.getTime();  
    IkaTools.saveCity(city);
  },
  formatMilliseconds:function(milliseconds) {
    return IkaTools.formatSeconds(Math.floor(milliseconds/1000));
  },
  formatSeconds:function(seconds) {
    var hours = seconds > 3600 ? Math.floor(seconds / 3600) : 0;
    var minutes = Math.floor((seconds % 3600)/ 60);
    minutes = (hours > 0 && minutes < 10) ? '0' + minutes.toString() : minutes;
    seconds = seconds % 60;
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds;
    var text = minutes + ':' + seconds;
    text = hours > 0 ? hours + ':' + text : text;
    return text;
  },
  getAllianceId:function() {
    var allianceId = IkaTools.getVal('allianceId');
    allianceId = (allianceId && allianceId.toString().match(/^\d+/)) ? allianceId : 'not_loaded';
    if(allianceId == 'not_loaded')
      IkaTools.views.diplomacyAdvisorAlly(IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=diplomacyAdvisorAlly'));
    return IkaTools.getVal('allianceId');
  },
  getCities:function() { 
    return IkaTools.cities; 
  },
  getOwnedCities:function() { 
    var cities = !!IkaTools.cities ? IkaTools.cities : [];
    return cities.filter(function(city)
    {
      return city.owned;
    }); 
  },
  getCityById:function(id) {
    if(IkaTools.cities) {
      var cities = IkaTools.cities;  
    } else {
      var cities = typeof(IkaTools.getVal('cities')) == 'object' ? IkaTools.getVal('cities') : new Array();
    }
    for(var i = 0; i < cities.length; i++) {
      if(cities[i].id == id) {
        return cities[i];  
      }
    }
    return false;
  },
  getCurrentCity:function() {
    return IkaTools.getCityById(IkaTools.getCurrentCityId());
  },
  getCurrentCityId:function() {
    try
    {
	    return $('#citySelect')[0].value;
    }
    catch (e)
    {
	    return $('#citySelect > option:selected').attr('value');
    }
  },
  getCurrentIslandId:function() {
    var link = $("li.viewIsland a").attr("href"); 
    return link.substr(link.indexOf("id=") + 3);
  },
  getDomain:function() {
    return document.domain;
  },  
  getMovements:function() {
    var movements = IkaTools.getVal('movements');
    var newMovements = [];
    var d = new Date();
    for(var i = 0; i < movements.length; i++)
      if(d.getTime() < movements[i].arrivalTime)
        newMovements.push(movements[i]);
    return newMovements;
  },
  
  getMovementsUpdate:function(callbackFunction) {
        IkaTools.getRemoteDocument('http://' + IkaTools.getDomain() + '/index.php?view=militaryAdvisorMilitaryMovements', 
            function(doc, documentText) {
                IkaTools.views['militaryAdvisorMilitaryMovements'](doc, documentText);
                if(typeof(callbackFunction) == 'function') {
                    callbackFunction(IkaTools.getVal('movements'));
                }
            });
    },
  getScoreForPlayer:function(type, playerName, callback, extraCallbackParams) {
    if(!type.match(/^(total|military|builder|buildings|scientists|research|gold|offense|defense|trade|resources|donations)$/))
      alert('IkaTools error (see documentation): IkaTools.getScoreForPlayer invalid score type requested - ' + type);
    if(typeof(IkaTools.playerScoreCache) == 'undefined') 
      IkaTools.playerScoreCache = {};
    if (typeof(IkaTools.playerScoreCache[playerName]) == 'undefined')
      IkaTools.playerScoreCache[playerName] = {};
    if (typeof(IkaTools.playerScoreCache[playerName][type]) == 'undefined') {
      IkaTools.playerScoreCache[playerName][type]= {};
      function parseResult(result) {
        var points = parseInt($('#mainview div.content table.table01:eq(1) td.score:eq(0)', result).text().replace(/,|\./g, ''));
        IkaTools.playerScoreCache[playerName][type].points = points;
        var rank = parseInt($('#mainview div.content table.table01:eq(1) td.place:eq(0)', result).text().replace(/,|\./g, ''));
        IkaTools.playerScoreCache[playerName][type].rank = rank;
        return IkaTools.playerScoreCache[playerName][type];
      }
      var highscoreType = 'score';
      switch(type) {
        case 'military': highscoreType = 'army_score_main'; break;
        case 'builder': highscoreType = 'building_score_main'; break;
        case 'buildings': highscoreType = 'building_score_secondary'; break;
        case 'scientists': highscoreType = 'research_score_main'; break;
        case 'research': highscoreType = 'research_score_secondary'; break;
        case 'gold': highscoreType = 'trader_score_secondary'; break;
        case 'offense': highscoreType = 'offense'; break;
        case 'defense': highscoreType = 'defense'; break;
        case 'trade': highscoreType = 'trade'; break;
        case 'resources': highscoreType = 'resources'; break;
        case 'donations': highscoreType = 'donations'; break;
      }
      var url = 'http://' + document.domain + '/index.php?view=highscore&highscoreType=' + highscoreType + '&searchUser=' + playerName.replace(/\s/g, '+');
      if (typeof(callback) == 'function') {
        IkaTools.getRemoteDocument(url, function(result) {
          callback(parseResult(result), extraCallbackParams);  
        });
      } else
        return parseResult(IkaTools.getRemoteDocument(url));
        
    } else
      if(typeof(callback) == 'function')
        callback(IkaTools.playerScoreCache[playerName][type], extraCallbackParams)
      else
        return IkaTools.playerScoreCache[playerName][type];
  },
  getPlayerId:function() {
    var playerId = IkaTools.getVal('playerId');
    playerId = (playerId && playerId.toString().match(/^\d+/)) ? playerId : 'not_loaded';
    if(playerId == 'not_loaded')
      IkaTools.views.options(IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=options'));
    return IkaTools.getVal('playerId');
  },
  parseStringAsDocument:function(str) {
    var html = document.createElement("html");
        html.innerHTML = str;
        var domResponse = document.implementation.createDocument("", "", null);
        domResponse.appendChild(html);
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
  getRemoteDocument:function(url, callback, method, data) {
        method = (typeof(method) == 'undefined' || !method) ? 'GET' : method;
        data = (typeof(data) == 'undefined' || !data) ? '' : data;
    var async = (typeof(callback) != 'function' || !callback) ? false : true;
        var headers = {
            "User-agent":navigator.userAgent, 
            "Accept":method == 'POST' ? "application/atom+xml,application/xml,text/xml" : "text/html", 
            "Cookie":document.cookie,
            "Referer":"http://" + document.domain + "/index.php",
        }
        if(method == 'POST') {
            headers['Content-type'] = 'application/x-www-form-urlencoded';    
        }
    if(async)
          GM_xmlhttpRequest ({
              method:method,
              url:url,
              data:data,
              headers:headers,
              onload: function (response){
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
  getTotalIncome:function() {
    var cities = IkaTools.getCities();
    var total = 0;
    for (var i = 0; i < cities.length; i++) {
      total += IkaTools.cityIsOwn(cities[i]) ? parseInt(IkaTools.cityGetResource('gold', cities[i])) : 0;
    }
    return total;
  },
  getTotalUpkeep:function() {
    var upkeep = IkaTools.getVal('totalUpkeep');
    return parseInt(upkeep).toString() == 'NaN' ? 0 : parseInt(upkeep);
  },
  getUnitTypeById:function(id) {
    switch(parseInt(id)) {
      case 301: return 'slinger';
      case 302: return 'swordsman';
      case 303: return 'phalanx';
      case 304: return 'marksman';
      case 305: return 'mortar';
      case 306: return 'catapult';
      case 307: return 'ram';
      case 308: return 'steamgiant';
      case 309: return 'bombardier';
      case 310: return 'cook';
      case 311: return 'medic';
      case 312: return 'gyrocopter';
      case 313: return 'archer';
      case 315: return 'spearman';
      case 316: return 'barbarian';
      default: return false;
    }
  },
  getUnitName:function(unitType) {
  	if ((typeof(IkaTools.unitNames) != 'undefined') && (typeof(IkaTools.unitNames[unitType]) != 'undefined'))
  	{
  		return IkaTools.unitNames[unitType];
  	}
  	else
		{
  		return '';
		}
  },
  getShipName:function(shipType) {
  	if ((typeof(IkaTools.shipNames) != 'undefined') && (typeof(IkaTools.shipNames[shipType]) != 'undefined'))
  	{
  		return IkaTools.shipNames[shipType];
  	}
  	else
		{
  		return '';
		}
  },
  getVal:function(key, useDomain) {
    if(typeof(useDomain) == 'undefined' || useDomain) {
      key = IkaTools.getDomain() + key;  
    }
    return eval(GM_getValue(key, ('({})')));
  },
  getView:function() { 
    return document.body.id; 
  },
  reloadAllMilitary:function(callback) {
    IkaTools.getMovementsUpdate(function() {    // update all movements
      // update units in all cities
      var cities = IkaTools.getCities();
      var numUpdated = 0;
      var numToUpdate = 0;
      
      cities.forEach(function(city)
      {
        if (city.owned)
          numToUpdate += 2;
/* for some reason this isnt working (probably because of ikariam scripts errors) - commented to avoid extra requests
        else
          numToUpdate++;
*/          
      });
      
      cities.forEach(function(city)
      {
        if (city.owned) 
        {
          var barracks = IkaTools.cityGetBuildingByType('barracks', city);
          if(barracks)
            IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=barracks&id=' + city.id + '&position=' + barracks.position, function(root) {
              numUpdated++;
              IkaTools.views.barracks(root);
              if(numUpdated == numToUpdate && typeof(callback) == 'function')
                callback();
            });
          else
            IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=cityMilitary-army&id=' + city.id, function(root) {
              numUpdated++;
              var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1];
              IkaTools.views["cityMilitary-army"](root, cityId);
              if(numUpdated == numToUpdate && typeof(callback) == 'function')
                callback();
            });
          IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=cityMilitary-fleet&id=' + city.id, function(root) {
            numUpdated++;
            var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1];
            IkaTools.views["cityMilitary-fleet"](root, cityId);
            if(numUpdated == numToUpdate && typeof(callback) == 'function')
              callback();
          });
        } 
        /* for some reason this isnt working (probably because of ikariam scripts errors) - commented to avoid extra requests
        else 
        {
          city.ships = {};
          IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=relatedCities&id=' + city.id, function(root) {            
					  root = typeof(root) == 'undefined' ? document : root;
            numUpdated++;
            try { var cityId = $('#backTo', root).html().match(/id=(\d+)/)[1]; } catch(e) { cityId = false; }
            if(cityId) {
              IkaTools.views.relatedCities(root, cityId);
            }
            if(numUpdated == numToUpdate && typeof(callback) == 'function')
              callback();
          });
        }
        */
      });
    });
  },
  setVal:function(key, value, useDomain) {
    if(typeof(useDomain) == 'undefined' || useDomain) {
      key = IkaTools.getDomain() + key;  
    }
    GM_setValue(key, '(' + JSON.stringify(value) + ')');
  },
  goTo:function(url, cityId) {
    IkaTools.setVal('goToUrl', url)
    IkaTools.setVal('goToCityId', cityId);
    document.body.style.cursor = "wait";
    var loc = url.toString().match(/^\//) ? 'http://' + IkaTools.getDomain() + url : url;
    if(typeof(cityId) != 'undefined' && cityId != IkaTools.getCurrentCityId()) {
            
      var postdata = "";
      var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
      for(var i = 0; i < elems.length; i++) {
        postdata += "&" + elems[i].name + "=" + elems[i].value;
      }
      postdata += "&cityId="+cityId+"&view=city";
      
      var xmlhttp;
      if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
      }
      xmlhttp.open('POST','http://' + location.host + '/index.php',true);
      xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
      xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
      xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
      xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
      
      xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4)
          document.location = loc;
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
  viewIsBuilding:function() {
    for(var i = 0; i < IkaTools.buildingTypes.length; i++)
      if(IkaTools.buildingTypes[i] == IkaTools.getView())
        return true;
    return false
  },
  querySelector: function(selector, el)
  {
    try
    {
      return el.querySelector(selector);
    }
    catch (e)
    {
      var item = $(selector, el);
      if (item.size() > 0)
      {
        return item[0];
      }
      else
      {
        return null;
      }  
    }
  },
  querySelectorAll: function(selector, el)
  {
    try
    {
      return el.querySelectorAll(selector);
    }
    catch (e)
    {
      var list = $(selector, el);
      list.item = function(index)
      {
        if ((index < 0) || (index >= list.length))
          return null
        else
          return list[index];      
      }
      return list;
    }
  },
  querySelectorAsArray: function(selector, el)
  {
    return Array.prototype.slice.call(el.querySelectorAll(selector));
  }
}

IkaTools.debug = function(text) {
  if(IkaTools.config.debugMode) {
    if($('#IkaToolsDebugPane').size() == 0) {
      IkaTools.debugPane = document.createElement('div');
      IkaTools.debugPane.id = 'IkaToolsDebugPane';
      IkaTools.debugPane.setAttribute('style', 'z-index:10; color:#fff; text-align:'+IkaRTL.txtRight+'; position:absolute; top:0; '+IkaRTL.txtRight+':0; width:200px;');
      document.body.appendChild(IkaTools.debugPane);
    }
    $('#IkaToolsDebugPane')[0].innerHTML += text + '<br>';
  }
}

IkaTools.changeCity = function(city_id) {
  var postdata = "";
  var elems = document.getElementById('changeCityForm').getElementsByTagName('fieldset')[0].getElementsByTagName('input');
  for(var i = 0; i < elems.length; i++) {
    postdata += "&" + elems[i].name + "=" + elems[i].value;
  }
    postdata = postdata + "&cityId="+city_id+"&view=city";
  var xmlhttp;
  if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
  }
  xmlhttp.open('POST','http://' + location.host + '/index.php',false);
  xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
  xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
  xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
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

IkaTools.city = function(id) {
  this.id = id;
  this.name;
  this.level = 0;
  this.type;
  if(IkaTools.config.trackData.resources) {
    this.resources = {wood:0, wine:0, marble:0, glass:0, sulfur:0, population:0};
    this.resourceMaximums = {wood:0, wine:0, marble:0, glass:0, sulfur:0, population:0};
  }
  this.buildings = new Array();
}

IkaTools.building = function() {
  this.position;
  this.type;
  this.name;
  this.level;
  this.cityId;
  if(IkaTools.config.trackData.resources) {
    this.resources = {wood:0, wine:0, marble:0, glass:0, sulfur:0, time:""};
    this.missingResources = {wood:0, wine:0, marble:0, glass:0, sulfur:0, total:0};
  }
}

IkaTools.getCurrentPosition = function() {
  var tmp = document.location.toString().match(/position=\d+/);
  return tmp ? tmp.toString().replace(/position=/, '') : false;  
}

IkaTools.clearAllData = function() {
  IkaTools.setVal('goToCityId', false);
  IkaTools.setVal('cities', new Array());
  IkaTools.setVal('militaryLastCheck', 9900000);
  IkaTools.setVal('financesLastUpdated', false);
  IkaTools.setVal('spies', {});
  IkaTools.setVal('targets', {});
  IkaTools.setVal('missions', {});
  IkaTools.setVal('researches', false);
  IkaTools.setVal('demolish', false);
  IkaTools.setVal('autoBuildQueue', false);
  IkaTools.setVal('autoUpgrades', false);
  IkaTools.setVal('buildStack', false);
  IkaTools.setVal('autoBuildLastBuilt', false);
  IkaTools.setVal('alliances', []);
  IkaTools.setVal('unitNames', {});
  IkaTools.setVal('shipNames', {});
  IkaTools.setVal('allianceId', false);
  IkaTools.setVal('playerId', false);
  IkaTools.setVal('movements', []);
  IkaTools.setVal('totalUpkeep', false);
  IkaTools.setVal('lastSeen', (new Date).getTime());
}
IkaTools.saveCity = function(city) {
  var cities = IkaTools.getCities();
  for(var i = 0; i < cities.length; i++) {
    cities[i] = cities[i].id == city.id ? city : cities[i];
  }
  IkaTools.saveCities(cities);
}
IkaTools.saveCities = function(cities) {
  cities = typeof(cities) == 'undefined' ? IkaTools.cities : cities;
  IkaTools.setVal('cities', cities);
  IkaTools.loadCityData();
}
IkaTools.loadCityData = function() { 
  IkaTools.cities = typeof(IkaTools.getVal('cities')) == 'undefined' ? {} : IkaTools.getVal('cities');
}

IkaTools.saveUnitNames = function(unitNames) {
  unitNames = typeof(unitNames) == 'undefined' ? IkaTools.unitNames : unitNames;
  IkaTools.setVal('unitNames', unitNames);
  IkaTools.loadUnitNames();
}
IkaTools.loadUnitNames = function() { 
  IkaTools.unitNames = typeof(IkaTools.getVal('unitNames')) == 'undefined' ? {} : IkaTools.getVal('unitNames');
}

IkaTools.saveShipNames = function(shipNames) {
  shipNames = typeof(shipNames) == 'undefined' ? IkaTools.shipNames : shipNames;
  IkaTools.setVal('shipNames', shipNames);
  IkaTools.loadShipNames();
}
IkaTools.loadShipNames = function() { 
  IkaTools.shipNames = typeof(IkaTools.getVal('shipNames')) == 'undefined' ? {} : IkaTools.getVal('shipNames');
}

IkaTools.updateData = function() {
  try {
    IkaTools.loadUnitNames();  // load saved unit names
    IkaTools.loadShipNames();  // load saved ship names
    IkaTools.loadCityData();  // load saved cities
    // check for new cities
    var cities = new Array();
    IkaTools.querySelectorAsArray('#citySelect option',document).forEach(function(item, i) {
      var city = IkaTools.getCityById(item.value) ? IkaTools.getCityById(item.value) : new IkaTools.city(item.value);
      city.name = $(item).text();  // update name
      city.type = item.className.replace(/coords/, '').replace(/\s/g, '');
      var coords = $('#breadcrumbs a[href*="view=island"]').text().match(/\[(\d+):(\d+)\]/);
      if (coords) {
        city.islandX = coords[1];
        city.islandY = coords[2];
      }
      // update current city
      city.owned = IkaTools.cityIsOwn(city);
      if(city.owned && city.id == IkaTools.getCurrentCityId()) {
        var bc = document.querySelector('#breadcrumbs a[href*="view=island"]');
        city.islandId = bc != null ? $(bc).attr('href').match(/id=(\d+)/)[1] : city.islandId;
        if(IkaTools.config.trackData.resources) {
          var resourceNames = ["wood", "wine", "marble", "glass", "sulfur", "population"];
          for(var x = 0; x < resourceNames.length; x++) {
            var type = resourceNames[x];
            city.resources = typeof(city.resources) == 'undefined' ? {} : city.resources;
            city.resources[type] = 0;
            city.resourceMaximums = typeof(city.resourceMaximums) == 'undefined' ? {} : city.resourceMaximums;
            if(type == 'population') {
              var population = $('#cityResources ul.resources li #value_inhabitants').text()
              city.freeWorkers = parseInt(population.match(/^\d+/));
              city.resources["population"] = parseInt(population.match(/\(([^\)]+)\)/)[1].replace(/[^\d]/, ''));
            } else {
              city.resourceMaximums[type] = 0;
              city.resources[type] = parseInt(IkaTools.ikariam.currentCity.resources[(type == 'glass' ? 'crystal' : type)]);
              city.resourceMaximums[type] = parseInt(IkaTools.ikariam.currentCity.maxCapacity[(type == 'glass' ? 'crystal' : type)]);
            }
            // update resoure timestamp
            var d = new Date();
            city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) == 'undefined' ? {} : city.resourceChangeUpdated;
            city.resourceChangeUpdated[type] = d.getTime();
          }
        }
      }
      if(IkaTools.config.trackData.resources) {
        // check for city tradegood type in city select
        if(item.className.match(/tradegood\d+/)) {
          var tradegoodNum = item.className.match(/tradegood\d+/).toString().replace(/[^\d]*/, '');
          switch(parseInt(tradegoodNum)) {
            case 1: city.tradegoodType = "wine"; break;
            case 2: city.tradegoodType = "marble"; break;
            case 3: city.tradegoodType = "glass"; break;
            case 4: city.tradegoodType = "sulfur"; break;
          }
        }
      }
      cities.push(city);
    });
    IkaTools.saveCities();
    IkaTools.cities = cities;
    // handle building views
    if(IkaTools.viewIsBuilding() && IkaTools.getCurrentPosition() && (!document.location.toString().match(/id=/) || document.location.toString().match(/id=(\d+)/)[1] == IkaTools.getCurrentCityId())) {
      building = IkaTools.cityGetBuildingByPosition(IkaTools.getCurrentPosition());
      if(!building) {
        var building = new IkaTools.building();
        building.cityId = IkaTools.getCurrentCityId();
        building.position = IkaTools.getCurrentPosition();
        IkaTools.getCurrentCity().buildings.push(building);
      }
      building.type = IkaTools.getView();
      building.name = $('#mainview .buildingDescription h1').text();
      building.level = $('#buildingUpgrade .buildingLevel').text().replace(/[^\d]*/, '').replace(/[^\d]*/, '');
      // update required resources
      if(IkaTools.config.trackData.resources) {
        building.resources = {wood:0, wine:0, marble:0, glass:0, sulphur:0, time:""};
        var resources = $('.resources li', $('#buildingUpgrade'));
        for(var i = 0; i < resources.size(); i++) {
          var type = resources[i].className.replace(/\s.*$/, '');
          type = type == 'crystal' ? 'glass' : type;
          var value = resources[i].innerHTML.replace(/<span.*?<\/span>\s*/, '');
          value = type == 'time' ? value : value.replace(/[^\d]/g, '');
          building.resources[type] = value;  
        }
      }
      // update conscruction timers
      IkaTools.updateConstructionTimer();
    }
    // update construction time after upgrade request
//    IkaTools.updateConstructionTimer();
    // parse current view
    
    if(typeof(IkaTools.views[IkaTools.getView()]) == 'function') {
      IkaTools.views[IkaTools.getView()]();                      
    }
    // make sure cities were found
    if(cities.length > 0)
      IkaTools.saveCities(cities);    
  } catch(e) {
    if(IkaTools.config.debugMode) { alert("Error in IkaTools.updateData():\n\n" + e); }  
  }
}

IkaTools.updateConstructionTimer = function() {
  // update conscruction timers
  if(IkaTools.config.trackData.construction && (IkaTools.getView() == 'city' || (IkaTools.viewIsBuilding() && $('#upgradeInProgress').size() == 1))) {
    var end = document.body.innerHTML.match(/enddate:\s*\d+/);
    var current = document.body.innerHTML.match(/currentdate:\s*\d+/);
    if(end && current) {
      end = parseInt(end.toString().replace(/enddate:\s*/, ''));
      current = parseInt(current.toString().replace(/currentdate:\s*/, ''));
      var secondsLeft = end - current;
      var d = new Date();
      IkaTools.getCurrentCity().buildEnd = d.getTime() + (1000 * secondsLeft)
      if(IkaTools.viewIsBuilding() && IkaTools.getCurrentPosition()) {
        IkaTools.getCurrentCity().buildBuilding = IkaTools.cityGetBuildingByPosition(IkaTools.getCurrentPosition());
      }  
      IkaTools.saveCities(IkaTools.getCities());
    }
  }
}

IkaTools.views = {};

IkaTools.views.academy = function(root) {
  root = typeof(root) == 'undefined' ? document : root;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text());
  // update research
  city.resourceChanges = typeof(city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['research'] = parseInt($('#valueResearch', root).text().replace(/[^\d]/g, ''));
  city.resources['research'] = city.resourceChanges['research'];
  var d = new Date();
  city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) == 'undefined' ? {} : city.resourceChangeUpdated;
  city.resourceChangeUpdated['research'] = d.getTime();
  if(maximum = $('#mainview .contentBox01h .content', root).html().replace(/setActualValue\(0\)/, '').match(/setActualValue\(\d+\)/)) {
    city.resourceMaximums = typeof(city.resourceMaximums) == 'undefined' ? {} : city.resourceMaximums;  
    city.resourceMaximums['research'] = parseInt(maximum.toString().replace(/setActualValue\(/, '').replace(/\)/, ''));
  }
}
IkaTools.views.alchemist = function() {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));;
  IkaTools.citySetResourceProduction('sulfur', production);
}
IkaTools.views.barracks = function(root) {
  root = typeof(root) == 'undefined' ? document : root;
  var cityId = $('a[href*="armyGarrisonEdit"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  IkaTools.querySelectorAsArray('ul#units li.unit', root).forEach(function(item,i) {
    var type = item.className.replace(/unit\s*/, '');
    var qty = $('div.unitcount', item).text().replace(/[^\d]/g, '');
    city.units = typeof(city.units) == 'undefined' ? {} : city.units;
    city.units[type] = qty;
  });
  // read current training orders
  city.unitsInTraining = {};  
  IkaTools.querySelectorAsArray('#unitConstructionList .army', root).forEach(function(item,i) {
    var type = IkaTools.getUnitTypeById(item.className.match(/\d+/)[0]);
    city.unitsInTraining[type] = typeof(city.unitsInTraining[type]) == 'undefined' ? {} : city.unitsInTraining[type];
    city.unitsInTraining[type].qty = city.unitsInTraining[type].qty ? city.unitsInTraining[type].qty : 0;
    city.unitsInTraining[type].qty += parseInt($('.unitcounttextlabel', item).text().replace(/[^\d]/g, ''));
  });
  IkaTools.saveCity(city);
  
  var unitNames = typeof(IkaTools.unitNames) == 'undefined' ? {} : IkaTools.unitNames;
	  
  IkaTools.unitTypes.forEach(function(unitType)
  {
  	var nameItem = document.querySelector('#units li.unit.'+unitType+' h4');
  	if (nameItem != null)
  	{
  		unitNames[unitType] = nameItem.innerHTML.trim();
  	}
  });
  
  IkaTools.saveUnitNames(unitNames);
}
IkaTools.views.city = function(root) {
  try {
    var city = IkaTools.getCurrentCity();
    var cityViewId = document.location.toString().match(/id=(\d+)/);
    if(IkaTools.getCurrentCityId() == city.id && IkaTools.getView() == 'city' && (!cityViewId || cityViewId[1] == city.id)) {
      if (city.type != 'deployedCities')
      {
        var newBuildings = new Array();
        var underConstruction = false;
        IkaTools.querySelectorAsArray('#mainview #locations > li', document).forEach(function(item, i) {
          if(item.id.match(/\d+$/)) {
            var position = item.id.match(/\d+$/);
            var type = IkaTools.querySelector('.buildingimg', item) != null ? item.className : (IkaTools.querySelector('.constructionSite', item) != null ? item.className : false);        
            if ((type) && (type != 'deployedCities'))
            {
              var title = $('a', item).attr('title');
              var building = IkaTools.cityGetBuildingByPosition(city, position) ? IkaTools.cityGetBuildingByPosition(city, position) : new IkaTools.building();
              building.level = parseInt(title.toString().match(/\d+$/));
              building.name = title.toString().replace(/\s[^\s]+\s\d+$/, '');
              building.position = position;
              building.type = type;
              building.cityId = city.id;
              // check for city hall 
              if(building.position == 0) {
                IkaTools.getCityById(building.cityId).level = parseInt(building.level);  
              }
              newBuildings.push(building);  
              // check to see if this building is being upgraded
              if (IkaTools.querySelector('.timetofinish #cityCountdown', item) != null) {
                IkaTools.getCurrentCity().buildBuilding = building;
                var underConstruction = true;
              }
            }
          }
        });
        if(!underConstruction) {
          IkaTools.getCurrentCity().buildEnd = 0;
        }
        city.buildings = newBuildings;
      }
      else
      {
        city.owned = false;
        city.buildings = undefined;
      }
    }
    IkaTools.updateConstructionTimer();
  } catch(e) {
    if(IkaTools.config.debugMode) { alert("Error in IkaTools.views.city():\n\n" + e); }  
  }  
}
IkaTools.views["cityMilitary-army"] = function(root, cityId) {
  root = typeof(root) == 'undefined' ? document : root;
  var city =   typeof(cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.units = typeof(city.units) == 'undefined' ? {} : city.units;
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
IkaTools.views["cityMilitary-fleet"] = function(root, cityId) {
  root = typeof(root) == 'undefined' ? document : root;
  var city =   typeof(cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.ships = typeof(city.ships) == 'undefined' ? {} : city.ships;
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
IkaTools.views.diplomacyAdvisorAlly = function(dom){
  dom = typeof(dom) == 'undefined' ? document : dom;
  var allianceId = 0;
  var circularLink = $('a[href*="sendIKMessage&msgType=51"]', dom);
  if (circularLink.size() == 1) 
    allianceId = circularLink.attr('href').match(/allyId=(\d+)/)[1];
  IkaTools.setVal('allianceId', allianceId);
}
IkaTools.views.embassy = function(dom){
  dom = typeof(dom) == 'undefined' ? document : dom;
  var allianceId = 0;
  var circularLink = $('#embassyMenu a[href*="sendIKMessage"]', dom);
  if (circularLink.size() == 1) 
    allianceId = circularLink.attr('href').match(/allyId=(\d+)/)[1];
  IkaTools.setVal('allianceId', allianceId);
}
IkaTools.views.deployment = function() {
  if(document.location.toString().match(/deploymentType=army/)) {
    // update number of units
    var city =   IkaTools.getCurrentCity();
    city.units = typeof(city.units) == 'undefined' ? {} : city.units;
    $('ul.assignUnits li').each(function(i) {
      var type = this.className;
      var qty = parseInt($('div.amount', this)[0].innerHTML.replace(/[^\d]/g, ''));
      city.units[type] = qty;
    });
    // update units on deployment
    $('#selectArmy input.button')[0].addEventListener('click', function() { 
      var city = IkaTools.getCurrentCity();
      city.units = typeof(city.units) == 'undefined' ? {} : city.units;                 
      $('ul.assignUnits li').each(function(i) {
        var type = this.className;
        var qty = parseInt($('input', this)[0].value);
        city.units[type] = parseInt(city.units[type]) - qty;
        
//        alert(type + ' - ' + city.units[type]);
      });
      var cities= IkaTools.getCities();
      for(var i = 0; i < cities.length; i++) {
        if(cities[i].id == IkaTools.getCurrentCityId())
          cities[i] = city;
      }
      IkaTools.saveCities(cities);
    }, false);
  }  
}
IkaTools.views.finances = function(root) {
  var root = typeof(root) != 'undefined' ? root : document;
  var cities = IkaTools.getOwnedCities();
  $('#mainview table:eq(1) tr td:last-child', root).each(function(i) {
    if (i < cities.length) {
      var income = $(this).text();
      var isNegative = (income.match(/^\s*-/)) ? -1 : 1;
      cities[i].income = parseInt(income.replace(/[^\d]/g, '')) * isNegative;
    }
  });
  var upkeepText = $('#mainview table:eq(4) tr:eq(2) td:eq(3)', root).text();
  IkaTools.totalUpkeep = parseInt(upkeepText.replace(/[^\d]/g, ''));
  IkaTools.setVal('totalUpkeep', IkaTools.totalUpkeep);
  IkaTools.saveCities(cities);
}
IkaTools.views.forester = function() {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('wood', production);
}
IkaTools.views.island = function(root, cityId) {
  root = typeof(root) == 'undefined' ? document : root;
  var city = typeof(cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  if ($('a#city_' + city.id, root).size() > 0) {
    try {
      var islandId = $('a[href*="view=resource"]', root).attr('href').match(/id=(\d+)/)[1].toString();
    } 
    catch (e) {
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
IkaTools.views.options = function(dom){
  dom = typeof(dom) == 'undefined' ? document : dom;
  var playerId = $('#options_debug td:eq(0)', dom).text();
  IkaTools.setVal('playerId', playerId);
}
IkaTools.views.militaryAdvisorMilitaryMovements = function(root, documentText) {
    root = typeof(root) == 'undefined' ? document : root;
    // We need to find the script that initializes military movement countdowns.  If 
    // this is the visible document, we can narrow it down to the script tag 
    // containing the countdown initializers.  If it is the result of an ajax request, 
    // we won't be able to narrow it down to the particular script tag, but that's ok 
    // because we can just search the entire document text.
    var movementsScript = documentText;
    $('script', root).each(function() {
        var source = $(this).html();
        if (source.match(/getCountdown.*el:.*fleetRow/)) {
            movementsScript = source;
        }
    });
    movementsScript = movementsScript || '';
    var movements = new Array();
    var d = new Date();
    $('#fleetMovements table.locationEvents tr:gt(0)', root).each(function() {
        if(true) { // Incoming trade fleets on non-alternate rows have no class
            var tds = $('td', this);
            var movement = {
                type:$(this).attr('class') ? ($(this).attr('class').match(/[^\s]+$/) || '').toString() : '',
                units:new Array(),
            };
            //for(var i = 0; i < tds.length; i++) {
                try {
                    // get ID and arrival time
                    if($(tds[1]).attr('id').match(/fleetRow/)) {
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
                    if($('img', tds[5]).size() == 1 && $('img', tds[5]).attr('src').match(/mission_/)) {
                        movement.mission = $('img', tds[5]).attr('src').match(/mission_[^\.]+/).toString().replace(/^mission_/, '');
                        if($(tds[5]).attr('title').match(/\([^\)]+\)/)) {
                            movement.status = $(tds[5]).attr('title').match(/\([^\)]+\)/).toString().replace(/(\(|\))/g, '');
                        } else {
                            movement.status = $(tds[5]).attr('title');
                        }
                        movement.description = $(tds[5]).attr('title');
                    }
                    // get abort href
                    if($('a', tds[8]).size() == 1 && $('a', tds[8]).attr('href').match(/abortFleetOperation/)) {
                        movement.abortHref = $('a', tds[8]).attr('href');
                    }
                    // get units
                    var cargoShipsFound = false;
                    var unitsFound = false;
                    if($('.unitBox', tds[2]).size() > 0) {
                        var unitDivs = $('.unitBox', tds[2]);
                        for(var x = 0; x < unitDivs.size(); x++) {
                            var u = {
                                name:unitDivs[x].title,
                                qty:parseInt($('.count', unitDivs[x]).text().toString().replace(/(,|\.)/g, '')),
                                iconSrc:$('.icon img', unitDivs[x]).size() == 1 ? $('.icon img', unitDivs[x]).attr('src') : $('.iconSmall img', unitDivs[x]).attr('src'),
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
                        var match = /(\d+) Ship/.exec($(tds[2]).text());
                        if (match) {
                            var ships = parseInt(match[1]);
                            if (movement.mission && (movement.mission == 'blockade' || movement.mission == 'deployfleet')) {
                                movement.units.push({
                                  name: 'Unknown Ships', 
                                  qty: ships,
                                  iconSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/200px-Question_mark_alternate.svg.png',
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
                        var match = /(\d+) Unit/.exec($(tds[2]).text());
                        if (match) {
                            var units = parseInt(match[1]);
                            movement.units.push({
                                name: 'Unknown Units', 
                                qty: units, 
                                iconSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Question_mark_alternate.svg/200px-Question_mark_alternate.svg.png'
                            });
                        }
                    }
          movement.direction = ($('img', tds[6]).size() == 1 ? 'right' : ($('img', tds[4]).size() == 1  ? 'left' : false));
          movement.originId = $('a', $('td', this)[3]).attr('href').toString().match(/\d+$/).toString();
          movement.originCityName = $('a', $('td', this)[3]).text();
          movement.originPlayerName = $('td:eq(3)', this).text().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
          movement.targetId = $('a', $('td', this)[7]).attr('href').match(/\d+$/).toString();
          movement.targetCityName = $('a', $('td', this)[7]).text();
                    try {
                        movement.targetPlayerName = $('td:eq(7)', this).text().toString().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
                    } catch(e) {
                        movement.targetPlayerName = false;
                    }
                } catch(e) { IkaTools.debug(e); }
            //}
            movements.push(movement);
        }
    });
    IkaTools.setVal('movements', movements);
};
IkaTools.views.relatedCities = function(root, cityId) {
  root = typeof(root) == 'undefined' ? document : root;
  var city = typeof(cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
  city.units = {};
  $('div.content table.army div.armybutton', $('div#selectMilitary', root)[0]).each(function(i) {
    var type = this.className.match(/\s*([^\s]+)$/)[1];
    city.units[type] = parseInt(this.innerHTML.match(/\d+/)[0]);
  });
  IkaTools.saveCity(city);
},
IkaTools.views.resource = function(root) {
  root = typeof(root) == 'undefined' ? document : root;
  var cityId = $('#setWorkers input[name="cityId"]', root).attr('value');
  var city = IkaTools.getCityById(cityId);
  city.sawmillLevel = parseInt($('#resUpgrade .buildingLevel', root).text().replace(/[^\d]*/, ''));
  // update wood change
  city.resourceChanges = typeof(city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['wood'] = parseInt($('#valueResource', root).text().replace(/[^\d]*/g, ''));
  city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  var d = new Date();
  city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  city.resourceChangeUpdated['wood'] = d.getTime();
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text().replace(/[^\d]*/g, ''));
}
IkaTools.views.shipyard = function(root, cityId) {
  root = typeof(root) == 'undefined' ? document : root;
  $('ul#units li.unit', root).each(function(i) {
    var type = this.className.match(/ship_([^\s]+)/)[1];
    var qty = parseInt($('div.unitcount', this).text().replace(/[^\d]/g, ''));
    var city = typeof(cityId) == 'undefined' ? IkaTools.getCurrentCity() : IkaTools.getCityById(cityId);
    city.ships = typeof(city.ships) == 'undefined' ? {} : city.ships;
    city.ships[type] = qty;
  });

  var shipNames = typeof(IkaTools.shipNames) == 'undefined' ? {} : IkaTools.shipNames;
	  
  IkaTools.shipTypes.forEach(function(shipType)
  {
  	var nameItem = document.querySelector('#units li.unit.ship_'+shipType+' h4');
  	if (nameItem != null)
  	{
  		shipNames[shipType] = nameItem.innerHTML.trim();
  	}
  });
  
  IkaTools.saveShipNames(shipNames);
}
IkaTools.views.stonemason = function() {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('marble', production);
}
IkaTools.views.tavern = function(root, responseText) {
  root = typeof(root) == 'undefined' ? document : root;
  responseText = typeof(responseText) == 'undefined' ? document.body.innerHTML : responseText;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  try {
    var consumption = parseInt(responseText.match(/wineCounter(.|\n|\r)*?amount.*?(\d+)/)[2]);
  } catch(e) { 
    try {
      var consumption = parseInt(responseText.match(/tradegoodCounter(.|\n|\r)*?amount.*?(\d+)/)[2]);
    } catch(e) {
      var consumption = 0; 
    }
  }
  try { 
    var ini = responseText.indexOf(':',responseText.indexOf('iniValue',responseText.indexOf('slider_wine',responseText.indexOf('create_slider')))) + 1; 
    var fin = responseText.indexOf(',',ini); 
    var winSavedArrayItem = 'savedWine['+responseText.substr(ini,fin-ini).trim()+']'; 
    var consumptionSaveTxt = responseText.substr(responseText.indexOf(winSavedArrayItem)+winSavedArrayItem.length); 
    var consumptionSaveValue = consumptionSaveTxt.substr(consumptionSaveTxt.indexOf('=')+1,consumptionSaveTxt.indexOf(';')-consumptionSaveTxt.indexOf('=')-1);

    if (!isNaN(consumptionSaveValue)) { 
      consumption = parseInt(Math.round(consumption-Number(consumptionSaveValue))); 
    } 
  } 
  catch(e) { 
  }
  city.wineConsumption = consumption;
  IkaTools.saveCity(city);
}
IkaTools.views.tradeAdvisor = function() {
  $('#mainview #inboxCity a').each(function() {
    if(!$(this ).attr('href').match(/island/) && $(this).attr('href').match(/id=(\d+)/) && $(this).attr('href').match(/position=/)) {
      var href = this.href;
      this.addEventListener('click', function() {                        
        IkaTools.goTo(href.replace(/\&currentCity=\d+/, ''), href.match(/id=(\d+)/)[1]);
      }, false);
      this.href = "javascript:void(0)";  
    }
  });
}
IkaTools.views.tradegood = function(root) {
  root = typeof(root) == 'undefined' ? document : root;
  var cityId = $('#setWorkers input[name="cityId"]', root).attr('value');
  var city = IkaTools.getCityById(cityId);
  // update tradegood level
  city.tradegoodLevel = parseInt($('#resUpgrade .buildingLevel', root).text().replace(/,|\./g, ''));
  // update tradegood type
  if(type = $('#resUpgrade .content img:first-child', root).attr('src').match(/img_.+\.jpg/)) {
    type =   type.toString().replace(/img_/, '').replace(/\.jpg/, '');
    city.tradegoodType = type == 'crystal' ? 'glass' : type;
    // update tradegood change
    city.resourceChanges = typeof(city.resourceChanges) != 'object' ? {} : city.resourceChanges;
// #ver 60 fix \
//    city.resourceChanges[type] = parseInt($('#valueResource', root).text().replace(/[^\d]*/g, ''));
    city.resourceChanges[city.tradegoodType] = parseInt($('#valueResource', root).text().replace(/[^\d]*/g, ''));
// #ver 60 fix /
    city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
  }
  // update city income
  city.income = parseInt($('#valueWorkCosts', root).text().replace(/,|\./g, ''));
}
IkaTools.views.townHall = function(root) {
  root = typeof(root) == 'undefined' ? document : root;
  var cityId = $('#breadcrumbs a.city[href*="id"]', root).attr('href').match(/id=(\d+)/)[1];
  var city = IkaTools.getCityById(cityId);
  city.level = parseInt($('#buildingUpgrade .buildingLevel', root).text().replace(/[^\d]*/g, ''));  
  city.resourceMaximums = typeof(city.resourceMaximums) == 'undefined' ? {} : city.resourceMaximums;
  city.resourceMaximums.population = parseInt($('#CityOverview .stats .space .total', root).text());
  // update town hall name
  var building = IkaTools.cityGetBuildingByPosition(0, city);
  building.name = $('#mainview h1:first-child', root).text();
  // update city income
  city.income = $('#PopulationGraph .citizens .production', root).text().replace(/[^\d]*/g, ''); 
  // update wood change
  city.resourceChanges = typeof(city.resourceChanges) != 'object' ? {} : city.resourceChanges;
  city.resourceChanges['wood'] = parseInt($('#PopulationGraph .woodworkers .production', root).text().replace(/[^\d]*/g, ''));
  city.resourceChangeUpdated = typeof(city.resourceChangeUpdated) != 'object' ? {} : city.resourceChangeUpdated;
}
IkaTools.views.winegrower = function() {
  var production = parseInt($('.contentBox01h .buildingResult td:eq(1)').text().replace(/(\.|,)\d\d\s*$/, '').replace(/[^\d]*/g, ''));
  IkaTools.citySetResourceProduction('wine', production);
}
IkaTools.getCurrentCityResource = function(type) {
  var resourceLis = $('#cityResources ul.resources li');
  for(var i = 0; i < resourceLis.size(); i++) {
    if(resourceLis[i].className == type) {
      switch(type) {
        case 'glass': var parsedType = 'crystal'; break;
        case 'population': var parsedType = 'inhabitants'; break;
      }
      return parseInt($('.#value_' + (type == 'glass' ? 'crystal' : type), resourceLis[i]).text().replace(/[^\d]/, ''));
    }
  }
  return 0;
}
IkaTools.getText = function(param, item, defVal) 
{
  var lang = IkaTools.lang;
  if ((IkaTools.text[lang] == undefined) || (IkaTools.text[lang][param] == undefined) || (IkaTools.text[lang][param][item] == undefined))
  {
    lang = 'en';
  }
  
  if (   (IkaTools.text[lang][param] != undefined)
      && (IkaTools.text[lang][param][item] != undefined))
  {
    return IkaTools.text[lang][param][item];
  }
  else
  {
    return (defVal != undefined) ? defVal : '';
  }
}

// this is ripped directly from Ikariam Farm List at http://userscripts.org/scripts/show/63706
// all credit to the original author
IkaTools.getTravelTime = function(x1, y1, x2, y2) {
  if(x1 == -1 || y1 == -1 || x2 == -1 || y2 == -1)
    return '?';
    if(x1 == x2 && y1 == y2)
        time = 1200 / 60 * 0.5;
    else
        time = 1200 / 60 * (Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2)));
    return Math.floor(time * 60 * 1000);
}


IkaTools.getLanguage = function() 
{
  try
  {
    var loc = IkaTools.config.language;
    if (loc != '')
    {
      return loc;
    }
    
    $("script").each( function() {
      var langMatch = /LocalizationStrings\['language'\]\s+=\s+'([a-zA-Z]+)';/g.exec( this.innerHTML );
      if ( langMatch ) {
        loc = {
          ar: "es", by: "ru", br: "pt", bg: "bg", cl: "es", cn: "zh", co: "es", cz: "cs", dk: "da", en: "en", 
          fi: "fi", fr: "fr", de: "de", gr: "el", it: "it", hk: "zh", hu: "hu", il: "he", kr: "ko", lv: "lv", 
          lt: "lt", mx: "es", nl: "nl", no: "no", pk: "ur", pe: "es", ph: "tl", pt: "pt", pl: "pl", ro: "ro", 
          ru: "ru", rs: "sr", sk: "sk", si: "sl", es: "es", se: "sv", tw: "zh", tr: "tr", ua: "uk", ae: "ar",
          us: "en", ve: "es", vn: "vi", ba: "bs"
        }[langMatch[1]] || '';
      }
      delete langMatch;
    });   
    if (loc != '')
    {
      return loc;
    }
    else
    {
      var loc;
      if(navigator) {
        if(navigator.language)
          loc = navigator.language;
        else if(navigator.browserLanguage)
          loc =navigator.browserLanguage;
        else if(navigator.systemLanguage)
          loc =navigator.systemLanguage;
        else if(navigator.userLanguage)
          loc =navigator.userLanguage;
      }
      if(loc.length == 2) 
        return loc;
      try { 
        return loc.match(/^(.+?)-/)[1];
      } catch(e) {
        return 'en';
      }
    }  
  } 
  catch(e) 
  {
    return 'en';
  }
}
IkaTools.lang = IkaTools.getLanguage();

IkaTools.text = 
{
  en:
  { //English
    name:'English',
    interface:
    { 
      Capacity:'Capacity',
      Safe:'Safe',
      Lootable:'Lootable',
      Income:'Income',
      Full:'Full in',
      Empty:'Empty in',
      Stable:'Stable in',
      day:'day',
      City:'City',
      level:'level',
      Level:'Level',
      loading:'loading',
      upkeep:'upkeep',
      training: 'training',
      total: 'total',
      Total:'Total',
      Military:'Military',
      Offense:'Offense',
      Defense:'Defense',
      Resources:'Resources', 
      Gold:'Gold',
      Builder:'Builder',
      Buildings:'Buildings',
      Scientists:'Scientists',
      Research:'Research',
      Trading:'Trading',
      Donations:'Donations',
      Points:'Points',
      Rank:'Rank',
      reloadMilitary:'Reload all military information',
      inTransitTo: 'in transit towards',
      trainingBarracks:'training in barracks',
      StationFleets: 'Station fleets',
      DeployTroops:'Deploy troops',
      ViewCityIsland:'View city on its island',
      GoToShiyard:'Go to shipyard',
      GoToBarracks:'Go to barracks',
      UnderConstrution:'Building under construction',
      TransportResources:'Transport resources to',
      AbortMission:'Abort Mission',
      Time:'Time',
      Units:'Units',
      Origin:'Origin',
      Mission:'Mission',
      Destination:'Destination',
      Action:'Action',
      Circular:'Circular',
      NewCircular:'New Circular',
      NewCircularText: 'Create a new circular message to your entire alliance',
      CircularMessage:'Circular alliance message',
      CulturalMessage:'Cultural treaty message',
      TreatyMessage:'Treaty message',
      PersonalMessage:'Personal message',
      ReplyCircular:'Reply to this message as a circular alliance message',
      HideOffline:'Hide offline',
      ShowOffline:'Show offline',
      SellOffers:'Sell Offers',
      BuyOffers:'Buy Offers',
      ShowCitiesMap:'Show cities on map',
      AddTarget:'Add Target',
      HaveASpy:'You have a spy in this town',
      TestServer:'Test Server',
      DisableAutoLogin:'Click to disable auto-login',
      SetAutoLogin:'Click to set auto-login using this information',
      HaveACulturalTreaty:'You cave a cultural treaty with this player',
      RequestedCulturalTreaty:'You have requested a cultural treaty with this player',
      openSlots:'open slots',
      of:'of',
      RequestCT:'Request cultural goods treaty',
      ReloadResearch:'Reload all Research',
      ReloadResearchTime:'This may take a minute',
      TroopMovements:'Troop Movements',
      CombatReports:'Combat Reports',
      Inbox:'Inbox',
      Alliance:'Alliance',
      Library:'Library'
    },
    pillageHelper:
    {
      PillageHelper: 'Pillage Helper',
      City:'City',
      Player:'Player',
      Wall:'Wall level',
      Mortars:'Mortars needed',
      Port:'Port level',
      Resources:'Resources available',
      lastReport:'since last report',
      none:'none',
      MilitaryScore:"Player's military score",
      CityLevel:'City Level',
      Garrison:'Garrison information',
      SpyCount:'Spies in target',
      SpyCountIn:'Number of spies in',
      Wood:'Wood available for pillaging',
      Wine:'Wine available for pillaging',
      Marble:'Marble available for pillaging',
      Crystal:'Crystal available for pillaging',
      Sulphur:'Sulphur available for pillaging',
      Ships:'Trade ships required to carry loot',
      Time:'Travel Time',
      Reload:'Reload all spies',
      Updated:'Updated',
      LastChecked:'Last checked',
      SendNoIslandInfo: 'Unable to send spy because because island ID is not yet known',
      ViewNoIslandInfo: 'Unable to view island because its ID is not yet known',
      Mission:'Mission',
      Pillage:'Pillage', 
      Blockade:'Blockade',
      UpdateData: 'Update Data In',
      UpdateDataTxt: 'Updates the selected city spy info with this report',
      SendSpy:'Send spy to',
      RemoveCity:'Remove city from target list',
      CantRemoveCity:'You still have spies in',
      Resources:'Resources',
      TargetOccupied:'The target city is under military occupation'
    },
    autoBuild:
    {
      AddBuildingToQueue:'Add this building to the automatic build queue.',
      AutoUpgrade:'Auto Upgrade',
      AutoUpgradeAll: 'Auto Upgrade All',
      AutoUpgradeAllTxt: 'Add all buildings in this city to the auto upgrade list',      
      totalForLevel:'total for level',
      moreForTrade:'more for 1:1 trade',
      RemoveAutoUpgrade:'Remove from auto upgrades',
      addToQueue:'Add To Queue',
      autoBuild:'Auto Build',  // name of script
      demolishConfirm:'Do you want to completely demolish this building?',
      options:
      {
        by:'by',  // used in "Auto Build by PhasmaExMachina"
        descriptions:{
          smartChecking:'use smart checking',
          autoDisable:'disable if script is off for a long time',
          highlightRows:'highlight alternate rows in Auto Build info box',
        },
        help:
        {
          smartChecking:'Smart checking will automatically check every 30 seconds to see if something in the queue or auto build list can be built. This happens without hitting the game servers.',
          autoDisable:'This feature will attempt to disable auto build in case the script has not been run in a long time which can be useful if you play on multiple computers. For example, if you play on one computer all day, then come back to another computer, the queue on the second computer may not be what you want anymore, so you don\\\'t want it to process before having a chance to update it.',
        },
        hour:'hour',
        hours:'hours',
        labels:
        {
          show:'Show',
          reCheckEvery:'Re-check auto build every',
          smartChecking:'Smart Checking',
          autoDisable:'Auto Disable',
          highlightRows:'Highlight Rows',
        },
        minute:'minute',
        minutes:'minutes',
        show:
        {
          allCities:'All buildings in all cities',
          currentCity:'Only buildings in current city',
        },
        updatesAndHistory:'Script Updates & History',
        v:'v',  // used to label version number (e.g. "v0.36")
      },
      queue:
      {      
        autoUpgrade:'Auto Upgrade',
        change:'change',
        clearAll:'clear all',
        clearAllDesc:'Remove all buildings from auto build queue',
        downInQueue:'up in queue', // used in "Move [building name] down in queue"
        emptyNotice:'The auto build queue is empty.',
        enableAutoBuild:'Enable auto build',
        enableDisableAutoUpgrades:'Enable / disable auto upgrades for all cities',
        expandOrCollapse:
        {
          autoBuild:'Expand or collapse auto build',
          autoUpgrades:'Expand or collapse auto upgrades',
        },
        fromAutoUpgrades:'from auto upgrades',  // used in "Remove [building name] from auto upgrades"
        fromQueue:'from queue',  // used in "Remove [building name] from queue"
        move:'Move', // used in "Move [building name] up/down in queue"
        queue:'Queue',
        showing:
        {
          allCities:'Showing all cities',
          currentCity:'Showing current city',
        },
        upInQueue:'up in queue', // used in "Move [building name] up in queue"
        remove:'Remove', // used in "Remove [building name] from ..."
        timeUntilNextDesc:'Time until next auto build check (click to now)',
      }      
    },
    scriptOptions:
    {
      settings:'Settings',
      footer:'Note: You may need to refresh the page to see changes.',
      cancel:'Cancel',
      save:'Save',
      CheckUpdates: 'Check for updates'
    },
    optionsTexts:
    {
      externalArmyHelper: 'show troop layout in deployment screens',
      keyboardShortcuts:'press 1 through # of cities to change city etc.',
      antiPlus:'remove all Ikariam Plus features',
      resourceLinks:'turn resource icons into links',
      expandCargo:'always show cargo in military movements',
      messagePreviews:'show first line of messages instead of subject',
      ajaxNextMessages:'append messages to list when clicking next...',
      stripAds:'remove banner ads',
      stripFacebook:'remove facebook buttons',
      sessionExpireRedirect:'go to login page on session expire',
      leftAlign:'game window on left to leave room for things on right',
      autoBuildFeaturesEnabled:'enable auto build features (in testing)',
      allianceColor:'lets you highlight alliences in different colors',
      hideFriendsBar:'hide the friends bar',
      empireOverview:'overview of empire',
      buildingsOverview:'overview of buildings',
      militaryOverview:'overview of your armies',
      militaryOverviewOnlyOwned:'overview only Owned Cities',
      targetsOverview:'espionage overview under research advisor',
      movementsOverview:'overview of movements under show island',
      buildingList:'add list of buildings to the show town button',
      tradeOverview:'shows overview of all trade offers in trading post',
      worldOverview:'adds a world map button to show world map overview',
      museumOverview:'show active and vacation status along with cities',
      resourceDetails:'show detailed resource information',
      showBuildingLevels:'show building levels in city view',
      showBuildingNames:'show building names in city view',
      biggerWorldMap:'increase the height of the world map',
      splitPersonalities:'split advisor links',
      events:'General Notification Settings',
      ikariamNotifyEnabled:'enable event notifications',
      ikaNotifyShowTimer:'show time until next check for events',
      emailNoticeUrl:'URL of the email server to use',
      pillaging:'Tools to help with pillaging',
      islandShowSpies:'show spy icons next to the cities in which you have spies',
      islandBlinkInactives:'make names of inactive cities blink ',
      islandMarkLoners:'names of cities not in an alliance in red ',
      playerCitiesInIslandView:'show list of player cities on island view',
      treaties:'Select the locations where you would like to have CT icons displayed:',
      ctAlliance:'show icons next players in alliance views',
      ctInbox:'show icons next to messages in inbox',
      ctIslandView:'show icons next to city names in island view',
      ctTradeTreaties:'show icons next players in treaty view',
      search:'Where do you want search icons shown?',
      searchIconsWhere:'Where do you want search icons shown?',
      searchIconIslandPlayer:'next to player name in island view',
      searchIconOccupier:'next to occupier name in city view',
      searchIconHighscore:'next to player names in high score',
      searchIconInbox:'next to player names in inbox',
      searchIconAlliancePlayers:'next to player names in alliance',
      searchIconMuseum:'next to players and alliances in museum',
      searchScoresHtml:'Show the following scores in island view:',
      searchScore: 'show scores in island view (uses the following list)',
      scoreTotal:'show total score in island view',
      scoreMilitary:'show military score in island view',
      scoreOffense:'show offense score in island view',
      scoreDefense:'show defense score in island view', 
      scoreResources:'show resources score in island view', 
      scoreGold:'show gold score in island view', 
      scoreBuilder:'show builder score in island view', 
      scoreBuildings:'show buildings score in island view', 
      scoreScientists:'show scientists score in island view', 
      scoreResearch:'show research score in island view', 
      scoreTrading:'show trading score in island view', 
      scoreDonations:'show donations score in island view', 
      debugMode:'show script execution time'
    },
    optionsLabels:
    {
      general:"General",
      keyboardShortcuts:'Keyboard Shortcuts',
      resourceLinks:'Resource Links',
      expandCargo:'Expand Cargo',
      messagePreviews:'Message Previews',
      ajaxNextMessages:'Message Append',
      stripAds:'Strip Ads',
      stripFacebook:'Strip Facebook',
      sessionExpireRedirect:'Session Redirect',
      leftAlign:'Left Align',
      autoBuildFeaturesEnabled:'Auto Build',
      allianceColor:'Alliance Highlighter',
      hideFriendsBar:'Hide Friends',
      overviews:"Overviews",
      empireOverview:'Empire',
      buildingsOverview:'Buildings',
      militaryOverview:'Military',
      militaryOverviewOnlyOwned:'Military',
      targetsOverview:'Espionage',
      movementsOverview:'Movements',
      buildingList:'Building List',
      tradeOverview:'Trade',
      worldOverview:'World Map',
      museumOverview:'Museum',
      resourceDetails:'Resource Details',
      showBuildingLevels:'Building Levels',
      showBuildingNames:'Building Names',
      biggerWorldMap:'Big Map',
      splitPersonalities:'Split Personalities',
      events:"Events",
      ikariamNotifyEnabled:'Enabled',
      ikaNotifyShowTimer:'Show Timer',
      emailNoticeUrl:'Server',
      pillaging:"Pillaging",
      islandShowSpies:'Spy Icons',
      islandBlinkInactives:'Blink Inactives',
      islandMarkLoners:'Mark Loners',
      playerCitiesInIslandView:'City List',
      treaties:"Treaties",
      ctAlliance:'Alliance',
      ctInbox:'Inbox',
      ctIslandView:'Island',
      ctTradeTreaties:'Treaty',
      search:"Search",
      searchIconIslandPlayer:'Island Players',
      searchIconOccupier:'Occupiers',
      searchIconHighscore:'High Score',
      searchIconInbox:'Inbox',
      searchIconAlliancePlayers:'Alliance',
      searchIconMuseum:'Museum',
      searchScore:'Show Scores',
      scoreTotal:'Total',
      scoreMilitary:'Military',
      scoreOffense:'Offense',
      scoreDefense:'Defense',
      scoreResources:'Resources', 
      scoreGold:'Gold',
      scoreBuilder:'Builder',
      scoreBuildings:'Buildings',
      scoreScientists:'Scientists',
      scoreResearch:'Research',
      scoreTrading:'Trading',
      scoreDonations:'Donations',
      about:"About",
      debugMode:'Debug Mode'
    },
    optionsListValues:
    {
      disabled: 'Disabled',
      dropdown: 'Dropdown',
      bottom: 'Bottom'
    },
    buildings:
    {
      academy:'Academy',
      alchemist:'Alchemist',
      architect:'Architect',
      barracks:'Barracks',
      branchOffice:'Trading Post',
      carpentering:'Carpenter',
      dump:'Dump',
      embassy:'Embassy',
      fireworker:'Fireworks Test Area',
      forester:'Forester',
      glassblowing:'Glassblower',
      museum:'Museum',
      optician:'Optician',
      palace:'Palace',
      palaceColony:'Gouvernor`s Residence',
      port:'Trading Port',
      safehouse:'Hideout',
      shipyard:'Shipyard',
      stonemason:'Stonemason',
      tavern:'Tavern',
      temple:'Temple',
      townHall:'Town Hall',
      vineyard:'Wine Press',
      wall:'Town Wall',
      warehouse:'Warehouse',
      winegrower:'Wine Grower',
      workshop:'Workshop'
    },
    buildingsShortNames: 
    {
      "townHall": "Town Hall",
      "academy": "Academy",
      "warehouse": "Warehouse",
      "tavern": "Tavern",
      temple:'Temple',
      dump:'Dump',
      "palace": "Palace",
      "palaceColony": "Governor",
      "museum": "Museum",
      "port": "Port",
      "shipyard": "Shipyard",
      "barracks": "Barracks",
      "wall": "Town Wall",
      "embassy": "Embassy",
      "branchOffice": "Trading Post",
      "workshop": "Workshop",
      "safehouse": "Hideout",
      "forester": "Forester",
      "glassblowing": "Glassblower",
      "alchemist": "Alchemist",
      "winegrower": "Winery",
      "stonemason": "Mason",
      "carpentering": "Carpenter",
      "optician": "Optician",
      "fireworker": "Fireworks",
      "vineyard": "Wine Cellar",
      "architect": "Architect",
      "buildingGround": "Building Ground"
    }
  },
  es:
  { //Spanish
    name:'Español',
    interface:
    { 
      Capacity:'Capacidad',
      Safe:'Seguro',
      Lootable:'Saqueable',
      Income:'Variación',
      Full:'Lleno en',
      Empty:'Vacío en',
      Stable:'Estable en',
      day:'día',
      City:'Ciudad',
      level:'nivel',
      Level:'Nivel',
      loading:'cargando',
      upkeep:'mantenimiento',
      training: 'entrenando',
      total: 'total',
      Total:'Total',
      Military:'Generales',
      Offense:'Ofensivos',
      Defense:'Defensivos',
      Resources:'Recursos', 
      Gold:'Oro',
      Builder:'Constructor',
      Buildings:'Edificios',
      Scientists:'Científicos',
      Research:'Investigación',
      Trading:'Comercio',
      Donations:'Donaciones',
      Points:'Puntos',
      Rank:'Posición',
      reloadMilitary:'Recargar toda la información militar',
      inTransitTo: 'en tránsito hacia',
      trainingBarracks:'entrenando en el cuartel',
      StationFleets: 'Estacionar flotas',
      DeployTroops:'Estacionar tropas',
      ViewCityIsland:'Ver la ciudad en su isla',
      GoToShiyard:'Ir al astillero',
      GoToBarracks:'Ir al cuartel',
      UnderConstrution:'Edificio en construcción',
      TransportResources:'Transportar recursos a',
      AbortMission:'Abortar Misión',
      Time:'Tiempo',
      Units:'Unidades',
      Origin:'Origen',
      Mission:'Misión',
      Destination:'Destino',
      Action:'Acción',
      Circular:'Global',
      NewCircular:'Nuevo Global',
      NewCircularText: 'Crear un nuevo mensaje global para la alianza',
      CircularMessage:'Mensaje Global a la alianza',
      CulturalMessage:'Acuerdo Cultural',
      TreatyMessage:'Acuerdo',
      PersonalMessage:'Mensaje Personal',
      ReplyCircular:'Responder a este mensaje como mensaje global a la alianza',
      HideOffline:'Ocultar desconectados',
      ShowOffline:'Mostrar desconectados',
      SellOffers:'Vender Ofertas',
      BuyOffers:'Comprar Ofertas',
      ShowCitiesMap:'Mostrar las ciudades en el mapa',
      AddTarget:'Agregar Objetivo',
      HaveASpy:'Tienes un espía en esta ciudad',
      TestServer:'Server de Prueba',
      DisableAutoLogin:'Presiona para desactivar el auto-login',
      SetAutoLogin:'Presiona para activar el auto-login usando esta información',
      HaveACulturalTreaty:'Tienes un acuerdo cultural con este jugador',
      RequestedCulturalTreaty:'Has solicitado un acuerdo cultural a este jugador',
      openSlots:'lugares disponibles',
      of:'de',
      RequestCT:'Solicitud de acuerdo cultural',
      ReloadResearch:'Recargar Todo',
      ReloadResearchTime:'Esto puede tomar un minuto',
      TroopMovements:'Movimientos de Tropas',
      CombatReports:'Informes de Guerra',
      Inbox:'Mensajes',
      Alliance:'Alianza',
      Library:'Biblioteca'
    },
    pillageHelper:
    {
      PillageHelper: 'Ayuda Saqueos',
      City:'Ciudad',
      Player:'Jugador',
      Wall:'Nivel de la Muralla',
      Mortars:'Morteros necesarios',
      Port:'Nivel del Puerto Comercial',
      Resources:'Recursos disponibles',
      lastReport:'desde el último reporte',
      none:'ninguno',
      MilitaryScore:"Puntos en Generales del jugador",
      CityLevel:'Nivel de la Ciudad',
      Garrison:'Información de la guarnición',
      SpyCount:'Cantidad de espías en el objetivo',
      SpyCountIn:'Cantidad de espías en',
      Wood:'Madera disponible para saquear',
      Wine:'Vino disponible para saquear',
      Marble:'Mármol disponible para saquear',
      Crystal:'Cristal disponible para saquear',
      Sulphur:'Azufre disponible para saquear',
      Ships:'Barcos mercantes necesarios para cargar el botín',
      Time:'Tiempo de viaje',
      Reload:'Recargar todos los espías',
      Updated:'Actualizado',
      LastChecked:'Última actualización',
      SendNoIslandInfo:'No es posible enviar un espía porque todavía no se conoce el ID de la isla',
      ViewNoIslandInfo:'No es posible ver la isla porque todavía no se conoce el ID',
      UpdateData: 'Actualizar Datos En',
      UpdateDataTxt: 'Actualiza la información de espía de la ciudad seleccionada con los datos de este reporte',
      Mission:'Misión',
      Pillage:'Saquear',
      Blockade:'Bloquear puerto',
      SendSpy:'Enviar espía a',
      RemoveCity:'Quitar la ciudad de la lista de objetivos',
      CantRemoveCity:'Todavía tienes espías en',
      Resources:'Recursos',
      TargetOccupied:'La ciudad objetivo está siendo ocupada'
    },
    autoBuild:
    {
      AddBuildingToQueue:'Agregar este edificio a la lista de construcción automática.',
      AutoUpgrade:'Auto Ampliación',
      AutoUpgradeAll: 'Auto Ampliar Todos',
      AutoUpgradeAllTxt: 'Agregar todos los edificios de esta ciudad a la lista de construcción automática',      
      totalForLevel:'total por nivel',
      moreForTrade:'más para comercio 1:1',
      RemoveAutoUpgrade:'Quitar de auto ampliación',
      addToQueue:'Agregar a Lista Const.',
      autoBuild:'Auto Const.',  // name of script
      demolishConfirm:'¿Deseas demoler completamente este edificio?',
      options:{
        by:'por',  // used in "Auto Build by PhasmaExMachina"
        descriptions:{
          smartChecking:'usar verificación inteligente',
          autoDisable:'desactivar si el script está inactivo por mucho tiempo',
          highlightRows:'resaltar filas alternativas en la lista de Auto Construcción',
        },
        help:{
          smartChecking:'La verificación inteligente va a verificar cada 30 segundos si algo de la lista de construcción o de la lista de auto ampliación puede ser construido. Esto lo hace sin consultar los servers del juego.',
          autoDisable:'Esta funcionalidad trata de desactivar la Auto Construcción cuando el script no se ejecutó en un período largo de tiempo, puede ser útil si juegas en varias computadoras. Por ejemplo, si juegas en una computadora todo el día, luego vuelves a otra computadora, la lista de la segunda computadora puede que no sea más lo que quieres, así que no quieres que se procese antes de que puedas actualizarla.',
        },
        hour:'hora',
        hours:'horas',
        labels:{
          show:'Mostrar',
          reCheckEvery:'Re-verificar auto ampliación cada',
          smartChecking:'Verificación Inteligente',
          autoDisable:'Auto Desactivar',
          highlightRows:'Resaltar Filas',
        },
        minute:'minuto',
        minutes:'minutos',
        show:{
          allCities:'Todos los edificios en todas las ciudades',
          currentCity:'Sólo los edificios de la ciudad actual',
        },
        updatesAndHistory:'Actualizaciones e Historia del Script',
        v:'v',  // used to label version number (e.g. "v0.36")
      },
      queue:{      
        autoUpgrade:'Auto Ampliación',
        change:'cambiar',
        clearAll:'limpiar todo',
        clearAllDesc:'Quitar todos los edificios de la lista de auto ampliación',
        downInQueue:'hacia arriba en la lista', // used in "Move [building name] down in queue"
        emptyNotice:'La lista de auto const. está vacía.',
        enableAutoBuild:'Activar auto construcciones',
        enableDisableAutoUpgrades:'Activar / desactivar auto ampliación para todas las ciudades',
        expandOrCollapse:{
          autoBuild:'Expandir / colapsar la lista de auto construcciones',
          autoUpgrades:'Expandir / colapsar la lista de auto ampliaciones',
        },
        fromAutoUpgrades:'de auto ampliaciones',  // used in "Remove [building name] from auto upgrades"
        fromQueue:'de auto construcciones',  // used in "Remove [building name] from queue"
        move:'Mover', // used in "Move [building name] up/down in queue"
        queue:'Auto Const.',
        showing:{
          allCities:'Mostrando todas las ciudades',
          currentCity:'Mostrando la ciudad actual',
        },
        upInQueue:'hacia abajo en la lista', // used in "Move [building name] up in queue"
        remove:'Quitar', // used in "Remove [building name] from ..."
        timeUntilNextDesc:'Tiempo hasta la proxima verificación de auto construcción (presiona para realizarlo ahora)',
      }      
    },
    scriptOptions:
    {
      settings:'Configuración',
      footer:'Nota: Es posible que tengas que actualizar la página para ver los cambios.',
      cancel:'Cancelar',
      save:'Guardar',
      CheckUpdates: 'Buscar actualizaciones'
    },
    optionsTexts:
    {
      externalArmyHelper: 'muestra la formación del ejército en pantallas de envío de tropas',
      keyboardShortcuts:'presiona desde 1 al # de ciudades para cambiar de ciudad, etc.',
      antiPlus:'quitar todas las opciones de Ikariam Plus',
      resourceLinks:'convertir iconos de recursos en links',
      expandCargo:'mostrar siempre la carga en los movimientos militares',
      messagePreviews:'mostrar la primera línea del mensaje en lugar del asunto',
      ajaxNextMessages:'agregar mensajes a la lista al avanzar la página',
      stripAds:'quitar los banners de publicidad',
      stripFacebook:'quitar los botones de facebook',
      sessionExpireRedirect:'ir a la página de inicio cuando expira la sesión',
      leftAlign:'alinear la ventana del juego a la izquierda para dejar lugar para cosas a la derecha',
      autoBuildFeaturesEnabled:'activar funcionalidad de auto-construcción (en test)',
      allianceColor:'permite resaltar las alianzas con diferentes colores',
      hideFriendsBar:'oculta la barra de amigos',
      empireOverview:'vista general del imperio',
      buildingsOverview:'vista general de edificios',
      militaryOverview:'vista general del ejército',
      militaryOverviewOnlyOwned:'ver sólo ciudades propias en la vista general del ejército',
      targetsOverview:'vista general de espionaje debajo del consejero científico',
      movementsOverview:'vista general de movimientos debajo de "Mostrar Isla"',
      buildingList:'agregar lista de edificios al botón "Mostrar Ciudad"',
      tradeOverview:'muestra una vista general de todas las transacciones en la tienda',
      worldOverview:'agrega un botón para ver el mapa del mundo completo',
      museumOverview:'muestra el estado de acitvo y vacaciones junto con las ciudades',
      resourceDetails:'muestra información detallada de los recursos',
      showBuildingLevels:'muestra los niveles de los edificios en la vista de ciudad',
      showBuildingNames:'muestra los nombes de los edificios en la vista de ciudad',
      biggerWorldMap:'incrementa la altura de la vista de mundo',
      splitPersonalities:'divide los links de los consejeros (derecha|izquierda)',
      events:'Configuración General de Notificaciones',
      ikariamNotifyEnabled:'activar notificacionse de eventos',
      ikaNotifyShowTimer:'muestra la cuenta regresiva a la próxima verificación de eventos',
      emailNoticeUrl:'URL del servidor de email ara usar',
      pillaging:'Herramientas para ayudar con los saqueos',
      islandShowSpies:'mustra iconos de espías en las ciudades que tienes espías',
      islandBlinkInactives:'hace titilar los nombres de las ciudades inactivas',
      islandMarkLoners:'pone en rojo los nombres de las ciudades que no tienen alianza',
      playerCitiesInIslandView:'muestra la lista de las ciudades del jugador en la vista de isla',
      treaties:'Selecciona las ubicaciones donde quieres que se muestren los iconos de Tratados Culturales:',
      ctAlliance:'muestra iconos en la lista de alianza',
      ctInbox:'muestra iconos en la bandeja de entrada',
      ctIslandView:'muestra iconos en los nombres de ciudades en la vista de isla',
      ctTradeTreaties:'muestra iconos en la vista de tratados',
      search:'¿Dónde quieres que se muestren los iconos de búsqueda?',
      searchIconsWhere:'¿Donde deseas que se muestren los iconos de búsqueda?',
      searchIconIslandPlayer:'junto al nombre de jugador en la vista de isla',
      searchIconOccupier:'junto al nombre del ocupante en la vista de ciudad',
      searchIconHighscore:'junto al nombre de jugador en las Clasificiaciones',
      searchIconInbox:'junto al nombre de jugador en la bandeja de entrada',
      searchIconAlliancePlayers:'junto al nombre de jugador en la lista de alianza',
      searchIconMuseum:'junto al nombre de jugador en la lista del museo',
      searchScore: 'muestra los puntajes en la vista de isla (usa la siguiente lista)',
      searchScoresHtml:'Mostrar los siguientes puntajes en la vista de isla:',
      scoreTotal:'Total',
      scoreMilitary:'Generales',
      scoreOffense:'Ofensivos',
      scoreDefense:'Defensivos', 
      scoreResources:'Recursos', 
      scoreGold:'Oro', 
      scoreBuilder:'Constructor', 
      scoreBuildings:'Edificios', 
      scoreScientists:'Científicos', 
      scoreResearch:'Investigación', 
      scoreTrading:'Comercio', 
      scoreDonations:'Donaciones', 
      debugMode:'muestra el tiempo de ejecución del script'
    },
    optionsLabels:
    {
      general:"General",
      keyboardShortcuts:'Teclas de Acceso Rápido',
      resourceLinks:'Links de Recursos',
      expandCargo:'Expandir Carga',
      messagePreviews:'Previsualizar Mensajes',
      ajaxNextMessages:'Agregar Mensajes',
      stripAds:'Quitar Publicidad',
      stripFacebook:'Quitar Facebook',
      sessionExpireRedirect:'Redireccionar Sesión',
      leftAlign:'Alineación Izquierda',
      autoBuildFeaturesEnabled:'Auto Construcción',
      allianceColor:'Resaltador de Alianzas',
      hideFriendsBar:'Ocultar Amigos',
      overviews:"Vistas Generales",
      empireOverview:'Imperio',
      buildingsOverview:'Edificios',
      militaryOverview:'Militar',
      militaryOverviewOnlyOwned:'Militar',
      targetsOverview:'Espionaje',
      movementsOverview:'Movimientos',
      buildingList:'Lista de Edificios',
      tradeOverview:'Comercio',
      worldOverview:'Mapa Mundial',
      museumOverview:'Museo',
      resourceDetails:'Detalle de Recursos',
      showBuildingLevels:'Niveles de Edificios',
      showBuildingNames:'Nombres de Edificios',
      biggerWorldMap:'Mapa Grande',
      splitPersonalities:'Dividir Personalidades',
      events:"Eventos",
      ikariamNotifyEnabled:'Activo',
      ikaNotifyShowTimer:'Mostrar Timer',
      emailNoticeUrl:'Server',
      pillaging:"Saqueos",
      islandShowSpies:'Iconos de Espías',
      islandBlinkInactives:'Titilar Inactivos',
      islandMarkLoners:'Marcar Solitarios',
      playerCitiesInIslandView:'Lista de Ciudades',
      treaties:"Tratados",
      ctAlliance:'Alianza',
      ctInbox:'Bandeja de Entrada',
      ctIslandView:'Isla',
      ctTradeTreaties:'Tratados',
      search:"Búsquedas",
      searchIconIslandPlayer:'Jugadores en Islas',
      searchIconOccupier:'Ocupantes',
      searchIconHighscore:'Clasificación',
      searchIconInbox:'Bandeja de Entrada',
      searchIconAlliancePlayers:'Alianza',
      searchIconMuseum:'Museo',
      searchScore:'Mostrar Puntajes',
      scoreTotal:'Total',
      scoreMilitary:'Generales',
      scoreOffense:'Ofensivos',
      scoreDefense:'Defensivos',
      scoreResources:'Recursos', 
      scoreGold:'Oro',
      scoreBuilder:'Constructor',
      scoreBuildings:'Edificios',
      scoreScientists:'Científicos',
      scoreResearch:'Investigación',
      scoreTrading:'Comercio',
      scoreDonations:'Donaciones',
      about:"Acerca De",
      debugMode:'Modo Debug'
    },
    optionsListValues:
    {
      disabled: 'Deshabilitado',
      dropdown: 'Desplegable',
      bottom: 'Debajo'
    },
    buildings: 
    {
      academy: "Academia",
      alchemist: "Torre del Alquimista",
      architect: "Oficina del Arquitecto",
      barracks: "Cuartel",
      branchOffice: "Tienda",
      carpentering: "Carpintería",
      dump: "Vertedero",
      embassy: "Embajada",
      fireworker: "Area de Pruebas Pirotécnicas",
      forester: "Cabaña del Guardabosques",
      glassblowing: "Soplador de Vidrio",
      museum: "Museo",
      optician: "Óptico",
      palace: "Palacio",
      palaceColony: "Residencia del Gobernador",
      port: "Puerto Comercial",
      tavern: "Taberna",
      temple:'Templo',
      townHall: "Intendencia",
      safehouse: "Escondite",
      shipyard: "Astillero de Guerra",
      stonemason: "Cantero",
      vineyard: "Prensa Vino",
      wall: "Muralla de la ciudad",
      warehouse: "Depósito",
      winegrower: "Vinicultor",
      workshop: "Taller de Invenciones"
    },
    buildingsShortNames: 
    {
      "townHall": "Intendencia",
      "academy": "Academia",
      "warehouse": "Depósito",
      temple:'Templo',
      "dump": "Vertedero",
      "tavern": "Taberna",
      "palace": "Palacio",
      "palaceColony": "Gobernador",
      "museum": "Museo",
      "port": "Puerto Com.",
      "shipyard": "Astillero",
      "barracks": "Cuartel",
      "wall": "Muralla",
      "embassy": "Embajada",
      "branchOffice": "Tienda",
      "workshop": "Invenciones",
      "safehouse": "Escondite",
      "forester": "Leñador",
      "glassblowing": "Vidriero",
      "alchemist": "Alquimista",
      "winegrower": "Vinicultor",
      "stonemason": "Cantero",
      "carpentering": "Carpintería",
      "optician": "Óptico",
      "fireworker": "Pirotécnica",
      "vineyard": "Prensa Vino",
      "architect": "Arquitecto",
      "buildingGround": "Terreno Libre"
    }
  },  
  ru: 
  { //Russian
    name:'Русский',  
    interface:  
    {   
      Capacity:'Вместимость',  
      Safe:'Застрахованные',  
      Lootable:'Награблено',  
      Income:'Доход',  
      Full:'Полный',  
      Empty:'Пустой',  
      Stable:'Стабильный',  
      day:'день',  
      City:'Город',  
      level:'уровень',  
      Level:'Уровень',  
      loading:'загрузка',  
      upkeep:'содержание',  
      training: 'обучение',  
      total: 'всего',  
      Total:'Всего',  
      Military:'Войска',  
      Offense:'Нападение',  
      Defense:'Оборона',  
      Resources:'Ресурсы',   
      Gold:'Золото',  
      Builder:'Строитель',  
      Buildings:'Здания',  
      Scientists:'Ученые',  
      Research:'Исследовал',  
      Trading:'Торговля',  
      Donations:'Донат',  
      Points:'Баллы',  
      Rank:'Ранг',  
      reloadMilitary:'Обновить военную информацию',  
      inTransitTo: 'В пути к',  
      trainingBarracks:'Обучается в казарме',  
      StationFleets: 'Переместить флот',  
      DeployTroops:'Переместить войска',  
      ViewCityIsland:'Показать город на острове',  
      GoToShiyard:'Перейти к верфи',  
      GoToBarracks:'Перейти к казарме',  
      UnderConstrution:'Строящееся здание',  
      TransportResources:'Транспортир. ресы в',  
      AbortMission:'Отмена',  
      Time:'Время',  
      Units:'Единицы',  
      Origin:'Начало',  
      Mission:'Миссия',  
      Destination:'Цель',  
      Action:'Действие',  
      Circular:'Рассылка',  
      NewCircular:'Новая рассылка',  
      NewCircularText: 'Создать рассылку для альянса',  
      CircularMessage:'Рассылка сообщения для альянса',  
      CulturalMessage:'Сообщение культурного договора',  
      TreatyMessage:'Сообщение о договоре',  
      PersonalMessage:'Личное сообщение',  
      ReplyCircular:'Рассылка для альянса с цитатой сообщения',  
      HideOffline:'Скрыть не активных',  
      ShowOffline:'Показать не активных',  
      SellOffers:'Предложение продажи',  
      BuyOffers:'Предложение покупки',  
      ShowCitiesMap:'Показать города на карте',  
      AddTarget:'Добавить цель',  
      HaveASpy:'Ваш шпион в этом городе',  
      TestServer:'Проверка сервера',  
      DisableAutoLogin:'Нажмите для отключения авто-входа',  
      SetAutoLogin:'Нажми для включения авто-входа с этой информацией',  
      HaveACulturalTreaty:'Вы заключили культурное соглашение с этим игроком',  
      RequestedCulturalTreaty:'Вы запросили культурный договор у этого игрока',  
      openSlots:'Свободный слот',  
      of:'из',  
      RequestCT:'Запрос культурного договора',  
      ReloadResearch:'Обновить все исслед.',  
      ReloadResearchTime:'Это может занять минуту',  
      TroopMovements:'Передвижение войска',  
      CombatReports:'Боевые доклады',  
      Inbox:'Входящие',  
      Alliance:'Альянс',  
      Library:'Библиотека'  
    },  
    pillageHelper:  
    {  
      PillageHelper: 'Помощник набегов',  
      City:'Город',  
      Player:'Игрок',  
      Wall:'Уровень стены',  
      Mortars:'Нужно мортир',  
      Port:'Уровень порта',  
      Resources:'Имеется ресурсов для грабежа',  
      lastReport:'С последнего доклада',  
      none:'ничего',  
      MilitaryScore:"Военная оценка игрока",  
      CityLevel:'Уровень города',  
      Garrison:'Информация гарнизона',  
      SpyCount:'Шпионы',  
      SpyCountIn:'Число шпионов в',  
      Wood:'Древесина доступна для грабежа',  
      Wine:'Виноград доступен для грабежа',  
      Marble:'Мрамор доступен для грабежа',  
      Crystal:'Хрусталь доступен для грабежа',  
      Sulphur:'Сера доступна для грабежа',  
      Ships:'Необходимо торговых судов для грабежа',  
      Time:'Время пути',  
      Reload:'Обновить всех шпионов',  
      Updated:'Обновлено',  
      LastChecked:'Последняя проверка',  
      SendNoIslandInfo: 'Не удается отправить шпиона, поскольку ID острова пока не известно',  
      ViewNoIslandInfo: 'Не удается осмотреть остров, поскольку его ID пока не известно',  
      Mission:'Миссия',  
      Pillage:'Набег',   
      Blockade:'Блокада',  
      SendSpy:'Отправить шпиона в',  
      RemoveCity:'Удалить город',  
      CantRemoveCity:'У вас еще есть шпион в',  
      Resources:'Ресурсы',  
      TargetOccupied:'Этот город оккупирован'  
    },  
    autoBuild:  
    {  
      AddBuildingToQueue:'Добавить в очередь автоматического создания.',  
      AutoUpgrade:'Авто модернизация',  
      totalForLevel:'всего на уровень',  
      moreForTrade:'обмен 1:1',  
      RemoveAutoUpgrade:'Удалить авто модернизацию.',  
      addToQueue:'Добавить в очередь',  
      autoBuild:'Авто созд.',  // name of script  
      demolishConfirm:'В хотите снести это здание полгостью?',  
      options:{  
        by:'от',  // используется "Авто создание от PhasmaExMachina"  
        descriptions:{  
          smartChecking:'Использовать умную проверку',  
          autoDisable:'Отключить во время длительного простоя',  
          highlightRows:'Выделить чередующиеся строки в списке авто создания',  
        },  
        help:{  
          smartChecking:'Умная проверка автоматически, каждые 30 секунд проверят, строит ли что-то на очереди в списке авто создания, и может ли быть построено\модернизированно. Это происходит не нагружая сервера игры.',  
          autoDisable:'Эта функция будет пытаться отключить автоматическое создание в случае, если сценарий не работал в течение длительного простоя. Это может быть полезно, если вы играете на нескольких компьютерах.',  
        },  
        hour:'часа',  
        hours:'часов',  
        labels:{  
          show:'Показать',  
          reCheckEvery:'Перепроверять авто создание каждые',  
          smartChecking:'Умная проверка',  
          autoDisable:'Авто выкл.',  
          highlightRows:'Выделять строки',  
        },  
        minute:'минуты',  
        minutes:'минут',  
        show:{  
          allCities:'Во всех городах',  
          currentCity:'В этом городе',  
        },  
        updatesAndHistory:'Обновление скрипта & История',  
        v:'v',  // used to label version number (e.g. "v0.36")  
      },  
      queue:  
      {  
        autoUpgrade:'авто мод.',  
        change:'изм.',  
        clearAll:'чист. все',  
        clearAllDesc:'удалить все из очереди',  
        downInQueue:'в низ', // used in "Move [building name] down in queue"  
        emptyNotice:'очередь пуста.',  
        enableAutoBuild:'Включить авто создание',  
        enableDisableAutoUpgrades:'вкл / выкл авто модернизацию для всех городов',  
        expandOrCollapse:  
        {  
          autoBuild:'показать / скрыть авто создание',  
          autoUpgrades:'показать / скрыть авто модернизацию',  
        },  
        fromAutoUpgrades:'из авто модернизации',  // used in "Remove [building name] from auto upgrades"  
        fromQueue:'из очереди',  // used in "Remove [building name] from queue"  
        move:'Подвинуть', // used in "Move [building name] up/down in queue"  
        queue:'Лист',  
        showing:  
        {  
          allCities:'Все города',  
          currentCity:'Этот город',  
        },  
        upInQueue:'в верх', // used in "Move [building name] up in queue"  
        remove:'Удалить', // used in "Remove [building name] from ..."  
        timeUntilNextDesc:'Время до следующей проверки листа',  
      }        
    },  
    scriptOptions:  
    {  
      settings:'Настройки',  
      footer:'Примечание: Возможно понадобится обновить страницу что бы увидеть изменения.',  
      cancel:'Отмена',  
      save:'Сохранить',  
      CheckUpdates: 'Проверить обновление'  
    },  
    optionsTexts:  
    {  
      externalArmyHelper: 'показать расположение отрядов набега',  
      keyboardShortcuts:'переход клавишами к: городам, опциям, сообщениям...',  
      antiPlus:'удалить все Ikariam Plus особенности',  
      resourceLinks:'иконка ресурса в ссылке города',  
      expandCargo:'всегда показывать сухогрузы в военных передвижениях',  
      messagePreviews:'показать первую строку сообщения вместо имени игрока',  
      ajaxNextMessages:'добавлять сообщения при нажатии след...',  
      stripAds:'удалить баннеры',  
      stripFacebook:'удалить кнопку facebook',  
      sessionExpireRedirect:'переход на страницу входа по истечение сессии',  
      leftAlign:'игровое окно слева',  
      autoBuildFeaturesEnabled:'включить авто создание построек (тестируется)',  
      allianceColor:'разрешить выделение альянсов разным цветом',  
      hideFriendsBar:'скрыть бар друзей',  
      empireOverview:'обзор империи',  
      buildingsOverview:'обзор строений',  
      militaryOverview:'обзор войска',  
      militaryOverviewOnlyOwned:'показать собственность города',  
      targetsOverview:'обзор шпионажа под научным обзором',  
      movementsOverview:'обзор передвижения под островом',  
      buildingList:'список зданий под кнопкой город',  
      tradeOverview:'обзор всех торговых предложений в торговом посту',  
      worldOverview:'добавить к карте мира обзор городов',  
      museumOverview:'показать активный и РО статус рядом с городом',  
      resourceDetails:'показать подробную информацию о ресурсах',  
      showBuildingLevels:'показать уровень зданий в городе',  
      showBuildingNames:'показать имена зданий в городе',  
      biggerWorldMap:'растянуть карту мира',  
      splitPersonalities:'разделить ссылки советника',  
      events:'Общии настройки уведомлений',  
      ikariamNotifyEnabled:'включить уведомления о событиях',  
      ikaNotifyShowTimer:'время до проверки событий',  
      emailNoticeUrl:'URL почты сервера для использования',  
      pillaging:'Помошник набегов',  
      islandShowSpies:'показать иконку шпиона в целевом городе',  
      islandBlinkInactives:'мигание имен не активных городов ',  
      islandMarkLoners:'имена городов без альянса красные ',  
      playerCitiesInIslandView:'показать список городов игрока на острове',  
      treaties:'Выбрать местоположение иконки КЦ:',  
      ctAlliance:'показать иконки в альянсе, рядом с именами игроков',  
      ctInbox:'показать иконки в сообщениях, во "входящих"',  
      ctIslandView:'показать иконки на острове, рядом с городами игроков',  
      ctTradeTreaties:'показать иконки в торговых соглашениях',  
      search:'Где вы хотите видеть иконку поиска поиска?',  
      searchIconsWhere:'Где вы хотите видеть иконку поиска?',  
      searchIconIslandPlayer:'с именем игрока на острове',  
      searchIconOccupier:'с оккупированным именем на острове',  
      searchIconHighscore:' именем игрока в баллах',  
      searchIconInbox:'с именем игрока во входящих',  
      searchIconAlliancePlayers:'с именем игрока в альянсе',  
      searchIconMuseum:'с игроком и альянсом в музее',  
      searchScoresHtml:'Показать оценки на острове:',  
      searchScore: 'показать оценки на острове (используется следующий список)',  
      scoreTotal:'показать общий счет на острове',  
      scoreMilitary:'показать военную оценку на острове',  
      scoreOffense:'показать атаку на острове',  
      scoreDefense:'показать оборону на острове',   
      scoreResources:'показать ресурсы на острове',   
      scoreGold:'показать золото на острове',   
      scoreBuilder:'показать строительную оценку на острове',   
      scoreBuildings:'показать оценку зданий на острове',   
      scoreScientists:'показать оценку ученых на острове',   
      scoreResearch:'показать оценку исследования на острове',   
      scoreTrading:'показать торговую оценку на острове',   
      scoreDonations:'показать оценку пожертвований на острове',   
      debugMode:'показать время запуска скрипта'  
    },  
    optionsLabels:  
    {  
      general:"Общая инфа",  
      keyboardShortcuts:'Сочетания клавиш',  
      resourceLinks:'Ссылки ресурсов',  
      expandCargo:'Передвижение сухогруза',  
      messagePreviews:'Анонс сообщения',  
      ajaxNextMessages:'Добавить сообщение',  
      stripAds:'Убрать рекламу',  
      stripFacebook:'Убрать Facebook',  
      sessionExpireRedirect:'Перенаправить сессию',  
      leftAlign:'По левому краю',  
      autoBuildFeaturesEnabled:'Авто создание',  
      allianceColor:'Цветные альянсы',  
      hideFriendsBar:'Скрыть друзей',  
      overviews:"Обзор",  
      empireOverview:'Империя',  
      buildingsOverview:'Здания',  
      militaryOverview:'Войска',  
      militaryOverviewOnlyOwned:'Краткий военный обзор',  
      targetsOverview:'Шпионаж',  
      movementsOverview:'Передвижение',  
      buildingList:'Список строений',  
      tradeOverview:'Торговля',  
      worldOverview:'Карта мира',  
      museumOverview:'Краткий обзор музея',  
      resourceDetails:'Инфа о ресурсах',  
      showBuildingLevels:'Уровень зданий',  
      showBuildingNames:'Названия зданий',  
      biggerWorldMap:'Большая карта',  
      splitPersonalities:'Разделить персональные',  
      events:"События",  
      ikariamNotifyEnabled:'Оповещения',  
      ikaNotifyShowTimer:'Показать таймер',  
      emailNoticeUrl:'Сервер',  
      pillaging:"Набег",  
      islandShowSpies:'Значек шпиона',  
      islandBlinkInactives:'Мигать на неактивных',  
      islandMarkLoners:'Маркировать одиночек',  
      playerCitiesInIslandView:'Список городов',  
      treaties:"Договоры",  
      ctAlliance:'Альянс',  
      ctInbox:'Входяшие',  
      ctIslandView:'Остров',  
      ctTradeTreaties:'Договор',  
      search:"Поиск",  
      searchIconIslandPlayer:'Острова игроков',  
      searchIconOccupier:'Оккупированные',  
      searchIconHighscore:'Оценки',  
      searchIconInbox:'Входящие',  
      searchIconAlliancePlayers:'Альянс',  
      searchIconMuseum:'Музей',  
      searchScore:'Показать оценки',  
      scoreTotal:'Всего',  
      scoreMilitary:'Войска',  
      scoreOffense:'Атака',  
      scoreDefense:'Оборона',  
      scoreResources:'Ресурсы',   
      scoreGold:'Золото',  
      scoreBuilder:'Строитель',  
      scoreBuildings:'Здания',  
      scoreScientists:'Ученые',  
      scoreResearch:'Исследования',  
      scoreTrading:'Торговля',  
      scoreDonations:'Донат',  
      about:"О скрипте",  
      debugMode:'Режим отладки'  
    },  
    optionsListValues:  
    {  
      disabled: 'Отключить',  
      dropdown: 'Выпадающие',  
      bottom: 'В низу'  
    },  
    buildings:  
    {  
      academy:'Академия',  
      alchemist:'Башня Алхимика',  
      architect:'Бюро Архитектора',  
      barracks:'Казарма',  
      branchOffice:'Торговый пост',  
      carpentering:'Плотницкая мастерская',  
      dump:'Склад',  
      embassy:'Посольство',  
      fireworker:'Полигон Пиротехника',  
      forester:'Хижина Лесничего',  
      glassblowing:'Стеклодувная Мастерская',  
      museum:'Музей',  
      optician:'Оптика',  
      palace:'Дворец',  
      palaceColony:'Резиденция губернатора',  
      port:'Торговый порт',  
      safehouse:'Укрытие',  
      shipyard:'Верфь',  
      stonemason:'Мастерская каменотеса',  
      tavern:'Таверна',  
      temple:'Храм',  
      townHall:'Ратуша',  
      vineyard:'Винодельня',  
      wall:'Городская стена',  
      warehouse:'Хранилище',  
      winegrower:'Винный погреб',  
      workshop:'Мастерская'  
    },  
    buildingsShortNames:   
    {  
      "townHall": "Ратуша",  
      "academy": "Академ.",  
      "warehouse": "Хран-ще",  
      "tavern": "Таверна",  
      temple:'Храм',  
      dump:'Склад',  
      "palace": "Дворец",  
      "palaceColony": "Резед.",  
      "museum": "Музей",  
      "port": "Порт",  
      "shipyard": "Верфь",  
      "barracks": "Казарма",  
      "wall": "Стена",  
      "embassy": "Посол.",  
      "branchOffice": "Торг. пост",  
      "workshop": "Маст.",  
      "safehouse": "Укрытие",  
      "forester": "Лесник",  
      "glassblowing": "Ст-дув.",  
      "alchemist": "Алхимик",  
      "winegrower": "Вин. п.",  
      "stonemason": "Кам-тес.",  
      "carpentering": "Плотник",  
      "optician": "Оптика",  
      "fireworker": "Полиг. п.",  
      "vineyard": "Винодел",  
      "architect": "Архитектор",  
      "buildingGround": "Пустырь"  
    }
  },
  pl: 
  { //Polish
    name:'Polish',    
    interface:    
     {   
      Capacity:'Pojemność',  
      Safe:'Bezpieczne',  
      Lootable:'Możliwe do zrabowania',  
      Income:'Przychód',  
      Full:'Pełno w',  
      Empty:'Pusto w',  
      Stable:'Stabilnie',   
      day:'dzień',  
      City:'Miasto',  
      level:'poziom',  
      Level:'Poziom',  
      loading:'ładowanie',  
      upkeep:'utrzymanie',  
      training: 'szkolenie',  
      total: 'razem',  
      Total:'Razem',  
      Military:'Wojsko',  
      Offense:'Ofensywa',  
      Defense:'Defensywa',  
      Resources:'Surowce',   
      Gold:'Złoto',  
      Builder:'Rozbudowa',  
      Buildings:'Budynki',  
      Scientists:'Naukowcy',  
      Research:'Badania',  
      Trading:'Handel',  
      Donations:'Datki',  
      Points:'Punkty',  
      Rank:'Ranga',  
      reloadMilitary:'Odśwież informacje wojskowe',  
      inTransitTo: 'transport do',  
      trainingBarracks:'szkolenie w koszarach',  
      StationFleets: 'Przemieść flotę',  
      DeployTroops:'Przemieść oddziały',  
      ViewCityIsland:'Pokaż miasto na wyspie',  
      GoToShiyard:'Idź do stoczni',  
      GoToBarracks:'Idź do koszar',  
      UnderConstrution:'Rozbudowa budynku',  
      TransportResources:'Transportuj surowce do',  
      AbortMission:'Przerwij Misję',  
      Time:'Czas',  
      Units:'Jednostki',  
      Origin:'Pochodzenie',  
      Mission:'Misja',  
      Destination:'Cel podróży',  
      Action:'Akcja',  
      Circular:'Przekaż wiad. do sojuszu',  
      NewCircular:'Wiad. do Sojuszu',  
      NewCircularText: 'Nowa wiadomość do sojuszu',                          
      CircularMessage:'Wiadomość do sojuszu',                              
      CulturalMessage:'Wiadomość o kulturze',                              
      TreatyMessage:'Wiadomość o traktat',                                     
      PersonalMessage:'Wiadomość prywatna',                                
      ReplyCircular:'Przekaż wiadomość do sojuszu',                        
      HideOffline:'Ukryj graczy nieaktywnych',  
      ShowOffline:'Pokaż graczy nieaktywnych',  
      SellOffers:'Oferty sprzedaży',  
      BuyOffers:'Oferty kupna',  
      ShowCitiesMap:'Pokaż miasta na mapie',  
      AddTarget:'Dodaj cel',  
      HaveASpy:'Masz szpiega w tym mieście',  
      TestServer:'Test Serwer',  
      DisableAutoLogin:'Naciśnij aby zablokować auto-logowanie',  
      SetAutoLogin:'Naciśnij aby ustawić auto-logowanie używając tych danych',  
      HaveACulturalTreaty:'Masz traktat kulturowy z tym graczem',         
      RequestedCulturalTreaty:'Gracz oferuje traktat kulturowy',  
      openSlots:'puste sloty',  
      of:'z',  
      RequestCT:'Oferuj traktat kulturowy',    
      ReloadResearch:'Odśwież wszystkie badania',  
      ReloadResearchTime:'To może potrwać kilka minut',  
      TroopMovements:'Ruch Wojsk',  
      CombatReports:'Raporty Wojenne',  
      Inbox:'Skrzynka Odbiorcza',  
      Alliance:'Sojusz',  
      Library:'Biblioteka'  
    },  
    pillageHelper:  
    {  
      PillageHelper: 'Pomocnik Grabieżcy',  
      City:'Miasto',  
      Player:'Gracz',  
      Wall:'Poziom Muru',  
      Mortars:'Potrzebnych moździerzy',  
      Port:'Pozom portu',  
      Resources:'Dostępne surowce',  
      lastReport:'od ostatniego raportu',  
      none:'nic',  
      MilitaryScore:"Punkty Militarne RG",  
      CityLevel:'Poziom Miasta',  
      Garrison:'Informacja garnizonowa',  
      SpyCount:'Liczba Szpiegów',  
      SpyCountIn:'Liczba szpiegów w',  
      Wood:'Drewno możliwe do zrabowania',  
      Wine:'Wino możliwe do zrabowania',  
      Marble:'Marmur możliwy do zrabowania',  
      Crystal:'Kryształ możliwy do zrabowania',  
      Sulphur:'Siarka możliwe do zrabowania',  
      Ships:'Statki handlowe wymagane do rabunku łupu',  
      Time:'Czas podróży',  
      Reload:'Odśwież dane o szpiegach',  
      Updated:'Zaktualizowano',  
      LastChecked:'Ostatnio sprawdzono',  
      SendNoIslandInfo: 'Niemożliwe wysłanie szpiega - nieznane ID wyspy',  
      ViewNoIslandInfo: 'Niemożliwy podgląd wyspy - ID nieznane',  
      Mission:'Misja',  
      Pillage:'Grabież',   
      Blockade:'Blokuj port',  
      SendSpy:'Wyślij szpiega do',  
      RemoveCity:'Usuń miasto z listy',  
      CantRemoveCity:'Nadal masz szpiega w',  
      Resources:'Surowce',  
      TargetOccupied:'Miasto docelowe jest okupowane'  
    },  
    autoBuild:  
    {  
      AddBuildingToQueue:'Dodaj budynek do kolejki Auto-Budowy.',  
      AutoUpgrade:'Samo-Rozbudowa',  
      totalForLevel:'brakuje do poziomu',  
      moreForTrade:'potrzeba do wymiany 1:1',  
      RemoveAutoUpgrade:'Usuń Samo-Rozbudowę',  
      addToQueue:'Dodaj do kolejki',  
      autoBuild:'Auto-Budowa',  // name of script  
      demolishConfirm:'!!! Czy na pewno chcesz bezwzględnie wyburzyć ten budynek? !!!',  
      options:  
      {  
        by:'autor',  // used in "Auto Build by PhasmaExMachina"  
        descriptions:{  
          smartChecking:'użyj inteligentnego sprawdzania',  
          autoDisable:'zablokuj jeśli skrypt nie odpowiada',  
          highlightRows:'wyróżnij alternatywny wiersz w polu informacyjnym Auto-Budowy',  
        },  
        help:  
        {  
          smartChecking:'Inteligentne sprawdzanie odbywa się co 30 sek. i sprawdza czy jest możliwość wybudowania budynku, dzieje się to bez dobijania do serwera gry.',  
          autoDisable:'Ta funkcja zablokuje (wyłaczy) Auto-Budowę jeśli skrypt nie będzie uruchomiony przez dłuższy czas, może to być przydatne jeśli gra się na kilku komputerach. Na przykład jeśli grasz na pierwszym komputerze cały dzień a później korzystasz z innego komputera, to kolejka na drugim komputerze nie może być zrealizowana ani uaktualniona.',  
        },  
        hour:'godzina',  
        hours:'godziny',  
        labels:  
        {  
          show:'Pokaż',  
          reCheckEvery:'Sprawdzaj Auto-Budowę co',  
          smartChecking:'Inteligentne sprawdzanie',  
          autoDisable:'Auto blokowanie',  
          highlightRows:'Wyróżnij Wiersze',  
        },  
        minute:'minuta',  
        minutes:'minuty',  
        show:  
        {  
          allCities:'Wszystkie Miasta',  
          currentCity:'Aktualne Miasto',  
        },  
        updatesAndHistory:'Historia aktualizacji',  
        v:'wer.',  // used to label version number (e.g. "v0.36")  
      },  
      queue:  
      {        
        autoUpgrade:'Samo-Rozbudowa',  
        change:'zmień',  
        clearAll:'wyczyść wszystko',  
        clearAllDesc:'Usuń wszystkie budynki z kolejki Auto-Budowy',  
        downInQueue:'na dół', // used in "Move [building name] down in queue"  
        emptyNotice:'Brak kolejki.',  
        enableAutoBuild:'Włacz Auto-Budowę',  
        enableDisableAutoUpgrades:'Odblokuj / Zablokuj Samo-Rozbudowę we wszystkich miastach',  
        expandOrCollapse:  
        {  
          autoBuild:'Zwiń / Rozwiń Auto-Budowę',  
          autoUpgrades:'Zwiń / Rozwiń Samo-Rozbudowę',  
        },  
        fromAutoUpgrades:'z Samo-Rozbudowy',  // used in "Remove [building name] from auto upgrades"  
        fromQueue:'z kolejki',  // used in "Remove [building name] from queue"  
        move:'Przesuń', // used in "Move [building name] up/down in queue"  
        queue:'Kolejka',  
        showing:  
        {  
          allCities:'Wszystkie Miasta',  
          currentCity:'Aktualne Miasto',  
        },  
        upInQueue:'do góry', // used in "Move [building name] up in queue"  
        remove:'Usuń', // used in "Remove [building name] from ..."  
        timeUntilNextDesc:'Czas do następnego sprawdzenia (naciśnij teraz)',  
      }        
    },  
    scriptOptions:  
    {  
      settings:'Ustawienia',  
      footer:'Uwaga: Odśwież stronę żeby zobaczyć zmiany.',  
      cancel:'Anuluj',  
      save:'Zapisz',  
      CheckUpdates: 'Sprawdź aktualizację'  
    },  
    optionsTexts:  
    {  
      externalArmyHelper: 'wyświetla rozmieszczenie wojsk',  
      keyboardShortcuts:'wciśnij 1 aby zmienić miasti, itd.',  
      antiPlus:'usuwa funkcje Ikariam Plus',  
      resourceLinks:'ikony surowców jako link',  
      expandCargo:'wyświetla ikony zamiast tekstu podczas transportu oddziałów / surowców',  
      messagePreviews:'jako temat pokaż pierwszą linijkę wiadomości',  
      ajaxNextMessages:'dodawanie wiadomości po naciśnięciu Następne...',  
      stripAds:'usunięcie reklam',  
      stripFacebook:'usunięcie przycisków dla Facebook`a',  
      sessionExpireRedirect:'przejdź do strony Logowania gdy sesja wygaśnie',  
      leftAlign:'przesunięcie okna gry na lewo (prawa strona pozostaje pusta)',  
      autoBuildFeaturesEnabled:'włącz Auto-Budowę (wersja testowa)',  
      allianceColor:'pozwala na oznaczanie sojuszy różnymi kolorami',  
      hideFriendsBar:'ukrywa pasek przyjaciół',  
      empireOverview:'podgląd imperium',  
      buildingsOverview:'podgląd budynków',  
      militaryOverview:'podgląd wojsk',  
      militaryOverviewOnlyOwned:'podgląd tylko własnych oddziałów (wojsk)',  
      targetsOverview:'podgląd szpiegów',  
      movementsOverview:'podgląd ruchu jednostek',  
      buildingList:'wyświetla listę budynków w danym mieście',  
      tradeOverview:'wyświetl wszystkie dostępne oferty na bazarze',  
      worldOverview:'dodaje przycisk mapy w podglądzie mapy świata',  
      museumOverview:'wyświetla informację obok miasta o graczach (urlop, traktat,...)',  
      resourceDetails:'wyświetl szczegółowe informacje o surowcach',  
      showBuildingLevels:'wyświetl poziom budynków',  
      showBuildingNames:'wyświetl nazwy budynków',  
      biggerWorldMap:'większa mapa świata',  
      splitPersonalities:'umożliwia podzielenie ikon doradców na kilka funkcji',  
      events:'Ustawienia Wydarzeń',  
      ikariamNotifyEnabled:'Odblokuj powiadomienia',  
      ikaNotifyShowTimer:'Pokaż czas do następnego sprawdzenia',  
      emailNoticeUrl:'ustaw URL jako serwer e-mail',  
      pillaging:'Narzędzie wspomagające grabież - Pomocnik Grabieżcy',  
      islandShowSpies:'wyświetl ikonę szpiega obok miasta w którym masz szpiega',  
      islandBlinkInactives:'nazwa miga gdy gracz jest nieaktywny',  
      islandMarkLoners:'nazwa wyświetlana na czerwono gdy gracz nie jest w Sojuszu',  
      playerCitiesInIslandView:'wyświetl listę miast gracza w podglądzie wyspy',  
      treaties:'Wybierz gdzie ma być wyświetlana ikona informująca o traktatach:',  
      ctAlliance:'obok nazwy gracza w podglądzie sojuszu',  
      ctInbox:'obok nazwy gracza w podglądzie wiadomości',  
      ctIslandView:'obok nazwy gracza w podglądzie wyspy',  
      ctTradeTreaties:'obok nazwy gracza w podglądzie traktatów',  
      search:'Wybierz gdzie ma być wyświetlana ikona SZUKAJ',  
      searchIcons:'Wybierz gdzie ma być wyświetlana ikona SZUKAJ',  
      searchIconIslandPlayer:'obok nazwy gracza w podglądzie wyspy',  
      searchIconOccupier:'obok nazwy okupanta w podglądzie miasta',  
      searchIconHighscore:'obok nazwy gracza w podglądzie Rankingu Punktowym',  
      searchIconInbox:'obok nazwy gracza w podglądzie wiadomości',  
      searchIconAlliancePlayers:'obok nazwy gracza w podglądzie sojuszu',  
      searchIconMuseum:'obok nazwy gracza w podglądzie muzeum',  
      searchScoresHtml:'Zaznacz jaka punktacja ma być wyświetlana',  
      searchScore: 'pokaż punktację w podglądzie wyspy',  
      scoreTotal:'wyświetl punktację ogólną w podglądzie wyspy',  
      scoreMilitary:'wyświetl punkty za wojsko w podglądzie wyspy',  
      scoreOffense:'wyświetl punkty za ofensywę w podglądzie wyspy',  
      scoreDefense:'wyświetl punkty za defensywę w podglądzie wyspy',   
      scoreResources:'wyświetl punkty za surowce w podglądzie wyspy',   
      scoreGold:'wyświetl punkty za złoto w podglądzie wyspy',   
      scoreBuilder:'wyświetl punkty za rozbudowę w podglądzie wyspy',   
      scoreBuildings:'wyświetl punkty za budynki w podglądzie wyspy',   
      scoreScientists:'wyświetl punkty za badania naukowe w podglądzie wyspy',   
      scoreResearch:'wyświetl punkty za naukowców w podglądzie wyspy',   
      scoreTrading:'wyświetl punkty za handel w podglądzie wyspy',   
      scoreDonations:'wyświetl punkty za darowizny w podglądzie wyspy',   
      debugMode:'pokaż czasy wykonywania skryptu'  
    },  
    optionsLabels:  
    {  
      general:"Ogólne",  
      keyboardShortcuts:'Skróty Klawiszowe',  
      resourceLinks:'Podlinkuj Surowce',  
      expandCargo:'Ikony Transportu',  
      messagePreviews:'Podgląd Wiadomości',  
      ajaxNextMessages:'Dalsze Wiadomości',  
      stripAds:'Usuń Reklamy',  
      stripFacebook:'Usuń Facebook`a',  
      sessionExpireRedirect:'Przywracanie Sesji',  
      leftAlign:'Przesunięcie do Lewej',  
      autoBuildFeaturesEnabled:'Auto-Budowa',  
      allianceColor:'Oznacz Sojusz',  
      hideFriendsBar:'Ukryj Przyjaciół',  
      overviews:"Podgląd",  
      empireOverview:'Imperium',  
      buildingsOverview:'Budynki',  
      militaryOverview:'Wojsko',  
      militaryOverviewOnlyOwned:'Jednostki Wojskowe',  
      targetsOverview:'Pomocnik Szpiega',  
      movementsOverview:'Ruch Jednostek',  
      buildingList:'Lista Budynków',  
      tradeOverview:'Pomocnik Handlarza',  
      worldOverview:'Mapa Świata',  
      museumOverview:'Informacja o Graczach',  
      resourceDetails:'Informacje o Surowcach',  
      showBuildingLevels:'Poziomy Budynków',  
      showBuildingNames:'Nazwy Budynków',  
      biggerWorldMap:'Duża Mapa',  
      splitPersonalities:'Podziel Doradców',  
      events:"Powiadomienia",  
      ikariamNotifyEnabled:'Aktywuj Powiadomienia',  
      ikaNotifyShowTimer:'Pokaż Czas',  
      emailNoticeUrl:'Serwer',  
      pillaging:"Grabież",  
      islandShowSpies:'Ikona Szpiegów',  
      islandBlinkInactives:'Migająca Nieaktywacja',  
      islandMarkLoners:'Samotny Gracz',  
      playerCitiesInIslandView:'Lista Miast',  
      treaties:"Traktaty",  
      ctAlliance:'Sojusz',  
      ctInbox:'Odbiorcza',  
      ctIslandView:'Wyspa',  
      ctTradeTreaties:'Traktaty',  
      search:"Szukaj",  
      searchIconIslandPlayer:'Gracz na wyspie',  
      searchIconOccupier:'Okupacja',  
      searchIconHighscore:'Ranking Punktowy',  
      searchIconInbox:'Skrzynka Odbiorcza',  
      searchIconAlliancePlayers:'Sojusz',  
      searchIconMuseum:'Muzeum',  
      searchScore:'Pokaż Punktację',  
      scoreTotal:'Punktacja Ogólna',  
      scoreMilitary:'Ranking Wojskowy',  
      scoreOffense:'Ranking Ofensywny',  
      scoreDefense:'Ranking Defensywny',  
      scoreResources:'Ranking Surowców',   
      scoreGold:'Ranking Złota',  
      scoreBuilder:'Ranking Rozbudowy',  
      scoreBuildings:'Ranking Budynków',  
      scoreScientists:'Ranking Naukowców',  
      scoreResearch:'Ranking Badań Naukowych',  
      scoreTrading:'Ranking Handlowy',  
      scoreDonations:'Ranking Wpłat',  
      about:"Informacje o",  
      debugMode:'Informacje o działaniu skryptu'  
    },  
    optionsListValues:  
    {  
      disabled: 'Zablokowany',  
      dropdown: 'Poniżej',  
      bottom: 'Powyżej'  
    },  
    buildings:  
    {  
      academy:'Akademia',  
      alchemist:'Wierza Alchemika',  
      architect:'Biuro Architekta',  
      barracks:'Koszary',  
      branchOffice:'Bazar',  
      carpentering:'Warsztat Cieśli',  
      dump:'Składowisko',  
      embassy:'Ambasada',  
      fireworker:'Zakład Pirotechnika',  
      forester:'Leśniczówka',  
      glassblowing:'Huta Szkła',  
      museum:'Muzeum',  
      optician:'Optyk',  
      palace:'Pałac',  
      palaceColony:'Rezydencja Gubernatora',  
      port:'Port',  
      safehouse:'Kryjówka',  
      shipyard:'Stocznia',  
      stonemason:'Kamieniarz',  
      tavern:'Tawerna',  
      temple:'Świątynia',  
      townHall:'Ratusz',  
      vineyard:'Winiarz',  
      wall:'Mur Miejski',  
      warehouse:'Magazyn',  
      winegrower:'Winnica',  
      workshop:'Warsztat'  
    },  
    buildingsShortNames:   
    {  
      "townHall": "Ratusz",  
      "academy": "Akademia",  
      "warehouse": "Magazyn",  
      "tavern": "Tawerna",  
      temple:'Świątynia',  
      dump:'Składowisko',  
      "palace": "Pałac",  
      "palaceColony": "Rezydencja Gubernatora",  
      "museum": "Muzeum",  
      "port": "Port",  
      "shipyard": "Stocznia",  
      "barracks": "Koszary",  
      "wall": "Mur Miejski",  
      "embassy": "Ambasada",  
      "branchOffice": "Bazar",  
      "workshop": "Warsztat",  
      "safehouse": "Kryjówka",  
      "forester": "Leśniczówka",  
      "glassblowing": "Huta Szkła",  
      "alchemist": "Wieża Alchemika",  
      "winegrower": "Winnica",  
      "stonemason": "Kamieniarz",  
      "carpentering": "Warsztat Cieśli",  
      "optician": "Optyk",  
      "fireworker": "Zakład Pirotechnika",  
      "vineyard": "Winiarz",  
      "architect": "Architekt",  
      "buildingGround": "Plac Budowy"  
    }
  },
  tr: 
  { //Turkish
    name:'Türkçe',    
    interface:    
    {     
      Capacity:'Kapasite',    
      Safe:'Güvenli',    
      Lootable:'Yağmalanabilir',    
      Income:'Gelir',    
      Full:'Şu kadar zamanda dolu',    
      Empty:'Şu kadar zamanda boş',    
      Stable:'Şu kadar zamanda sabit',    
      day:'gün',    
      City:'şehir',    
      level:'seviye',    
      Level:'Seviye',    
      loading:'yükleniyor',    
      upkeep:'bakım masrafı',    
      training: 'talim',    
      total: 'toplam',    
      Total:'Toplam',    
      Military:'Ordu',    
      Offense:'Hücum',    
      Defense:'Savunma',    
      Resources:'Kaynaklar',     
      Gold:'Altın',    
      Builder:'Yapı ustası',    
      Buildings:'Binalar',    
      Scientists:'BilimAdmlrı',    
      Research:'Araştırma',    
      Trading:'Ticaret',    
      Donations:'Bağış',    
      Points:'Puanlar',    
      Rank:'Sıralama',    
      reloadMilitary:'Tüm askeri bilgileri yeniden yükle',    
      inTransitTo: 'yoluyla transit',    
      trainingBarracks:'kışlada eğitiliyor',    
      StationFleets: 'Filoları görevlendir',    
      DeployTroops:'Birlikleri görevlendir',    
      ViewCityIsland:'Şehri kendi adasında gör',    
      GoToShiyard:'Donanma tersanesine git',    
      GoToBarracks:'Kışlaya git',    
      UnderConstrution:'Bina yapım aşamasında',    
      TransportResources:'Kaynakları naklet',    
      AbortMission:'Operasyonu iptal et',    
      Time:'Zaman',    
      Units:'Birimler',    
      Origin:'Başlangıç',    
      Mission:'Görev',    
      Destination:'Hedef',    
      Action:'Hareket',    
      Circular:'Sirküler',    
      NewCircular:'Yeni Sirküler',    
      NewCircularText: 'Tüm ittifaka göndermek için mesaj oluştur.',    
      CircularMessage:'İttifak Sirküler Mesajı',    
      CulturalMessage:'Kültürel Anlaşma Mesajı',    
      TreatyMessage:'Anlaşma Mesajı',    
      PersonalMessage:'Kişisel Mesaj',    
      ReplyCircular:'Bu mesaja tüm ittifaka yollayarak cevap ver',    
      HideOffline:'Çevrimdışı olanları gizle',    
      ShowOffline:'Çevrimdışı olanları göster',    
      SellOffers:'Satış Teklifleri',    
      BuyOffers:'Alış Teklifleri',    
      ShowCitiesMap:'Şehirleri haritada göster',    
      AddTarget:'Hedef Ekle',    
      HaveASpy:'Bu şehirde casusunuz var.',    
      TestServer:'Sunucuyu test et',    
      DisableAutoLogin:'Otomatik girişi engellemek için tıkla',    
      SetAutoLogin:'Bu bilgiyi kullanarak otomatik girişi engellemek için tıkla',    
      HaveACulturalTreaty:'Bu oyuncuyla kültürel anlaşmanız var.',    
      RequestedCulturalTreaty:'Bu oyuncuya kültürel anlaşma isteği gönderdiniz',    
      openSlots:'boşlukları aç',    
      of:'of',    
      RequestCT:'Kültürel eşya anlaşması isteği',    
      ReloadResearch:'Tüm Araştırmaları yeniden yükle',    
      ReloadResearchTime:'Bir dakika kadar sürebilir',    
      TroopMovements:'Birlik hareketleri',    
      CombatReports:'Savaş Raporları',    
      Inbox:'Gelen Kutusu',    
      Alliance:'İttifak',    
      Library:'Kütüphane'    
    },    
    pillageHelper:    
    {    
      PillageHelper: 'Yağma yardımcısı',    
      City:'Şehir',    
      Player:'Oyuncu',    
      Wall:'Sur Seviyesi',    
      Mortars:'İhtiyaç duyulan topçu',    
      Port:'Liman seviyesi',    
      Resources:'Mevcut Kaynaklar',    
      lastReport:'Son Rapordan Bu yana',    
      none:'hiç',    
      MilitaryScore:"Oyuncunun general puanı",    
      CityLevel:'Şehir sevşyesi',    
      Garrison:'Garnizon bilgisi',    
      SpyCount:'Hedefteki casuslar',    
      SpyCountIn:'Casus sayısı',    
      Wood:'Yağmalanabilecek mevcut odun',    
      Wine:'Yağmalanabilecek mevcut şarap',    
      Marble:'Yağmalanabilecek mevcut mermer',    
      Crystal:'Yağmalanabilecek mevcut kristal',    
      Sulphur:'Yağmalanabilecek mevcut sülfür',    
      Ships:'Yağmayı taşımak için gerekli ticaret gemisi sayısı',    
      Time:'Seyahat zamanı',    
      Reload:'Tüm casusları yeniden yükle',    
      Updated:'Güncellendi',    
      LastChecked:'Son kontrol zamanı',    
      SendNoIslandInfo: 'Ada kimliği(ID) henüz bilinmediğinden casus gönderilemiyor.',    
      ViewNoIslandInfo: 'Ada kimliği(ID) henüz bilinmediğinden ada görüntülenemiyor.',    
      Mission:'Görev',    
      Pillage:'Yağma',     
      Blockade:'Kuşatma',  
      UpdateData: 'Veriyi güncelle',  
      UpdateDataTxt: 'Seçilen şehrin casus bilgisini bu rapola günceller',       
      SendSpy:'Casus gönder',    
      RemoveCity:'Şehri hedef listesinden çıkar',    
      CantRemoveCity:'Şurda hala casusunuz var:',    
      Resources:'Kaynaklar',    
      TargetOccupied:'Hedef şehir işgal altında'    
    },    
    autoBuild:    
    {    
      AddBuildingToQueue:'Bu binayı otomatik inşa listesine ekle.',    
      AutoUpgrade:'Otomatik yükselt',    
      totalForLevel:'Seviye için toplam',    
      moreForTrade:'1:1 ticaret için daha fazla',    
      RemoveAutoUpgrade:'Otomatik yükseltme işleminden çıkar',    
      addToQueue:'Sıraya koy',    
      autoBuild:'Auto Build',  // name of script    
      demolishConfirm:'Bu binayı tamamen yıkmak istiyor musunuz??',    
      options:    
      {    
        by:'by',  // used in "Auto Build by PhasmaExMachina"    
        descriptions:{    
          smartChecking:'Akıllı kontrolü kullan',    
          autoDisable:'Betik uzun süredir kapalı ise devre dışı bırak',    
          highlightRows:'Otomatik inşa bilgi kutucuğunda alternatif sıraları vurgula',    
        },    
        help:    
        {    
          smartChecking:'Akıllı kontol her 30 saniyede bir, sırada yada otomatik inşa listesinde bulunan bir bina inşa edilip edilemeyeceğini kontrol eder. Bu kontrol oyun sunucularıyla etkileşim olmadan yapılır.',    
          autoDisable:'Bu özellik, betik uzun bir süredir çalıştırılmamışsa otomatik inşa\'yı devre dışı bırakmaya teşebbüs eder; Bu özellik eğer birden fazla bilgisayarda oynuyorsanız yararlı olabilir. Örneğin bütün gün tek bir bilgisayarda oynadınız ve sonra başka bir bilgisayara geçtiniz, ikinci bilgisayardaki sıra artık sizin istediğiniz bir sıra olmayabilir, güncelleme şansı yakalamadan işleme konmasını istemezsiniz.',    
        },    
        hour:'saat',    
        hours:'saat',    
        labels:    
        {    
          show:'Göster',    
          reCheckEvery:'Her şu kadar zamanda otomatik inşayı kontrol et',    
          smartChecking:'Akıllı Kontrol',    
          autoDisable:'Otomatik Devre dışı bırakma',    
          highlightRows:'Sıraları vurgula',    
        },    
        minute:'dakika',    
        minutes:'dakika',    
        show:    
        {    
          allCities:'Tüm şehirlerdeki tüm binalar',    
          currentCity:'Sadece geçerli(şu an görünen) şehirdeki binalar',    
        },    
        updatesAndHistory:'Betik güncellemeleri & Geçmiş',    
        v:'v',  // sürüm numarası işareti için kullanılan (örneğin "v0.36")    
      },    
      queue:    
      {          
        autoUpgrade:'Otomatik yükselt',    
        change:'değiştir',    
        clearAll:'hepsini temizle',    
        clearAllDesc:'Tüm binaları otomatik inşa listesinden çıkar',    
        downInQueue:'Sıralamada yukarı çıkar', // used in "Move [building name] down in queue"    
        emptyNotice:'Otomatik inşa listesi boş.',    
        enableAutoBuild:'Otomatik inşa\'yı etkinleştir.',    
        enableDisableAutoUpgrades:'Tüm şehirler için otomatik yükseltmeyi Etkinleştir / Devre dışı bırak',    
        expandOrCollapse:    
        {    
          autoBuild:'Otomatik inşayı genişlet veya daralt',    
          autoUpgrades:'Otomatik yükseltmeyi genişlet veya daralt',    
        },    
        fromAutoUpgrades:'Otomatik yükseltmeden',  // used in "Remove [building name] from auto upgrades"    
        fromQueue:'Sıradan',  // used in "Remove [building name] from queue"    
        move:'Taşı', // used in "Move [building name] up/down in queue"    
        queue:'Sıra',    
        showing:    
        {    
          allCities:'Tüm şehirler gösteriliyor',    
          currentCity:'Geçerli şehir gösteriliyor',    
        },    
        upInQueue:'yukarı', // used in "Move [building name] up in queue"    
        remove:'kaldır', // used in "Remove [building name] from ..."    
        timeUntilNextDesc:'Sonraki otomatik inşa kontrolüne kalan zaman (Şimdi kontrol etmek için tıkla)',    
      }          
    },    
    scriptOptions:    
    {    
      settings:'Ayarlar',    
      footer:'Not: Değişiklikleri görmek için sayfayı yenilemeniz gerekebilir..',    
      cancel:'İptal',    
      save:'Kaydet',    
      CheckUpdates: 'Güncellemeleri kontrol et'    
    },    
    optionsTexts:    
    {    
      externalArmyHelper: 'Birlik dizilimini konuşlanma ekranlarında göster',    
      keyboardShortcuts:'Şehri değiştirmek için 1 den şehir sayısı kadar rakamlara kısayol ata.',    
      antiPlus:'Tüm Ikariam Plus özelliklerini kaldır',    
      resourceLinks:'Kaynak ikonlarını link\'e dönüştür.',    
      expandCargo:'Birlik hareketlerinde her zaman kargoyu göster',    
      messagePreviews:'Mesajlarda konu yerine mesajların ilk satırını göster',    
      ajaxNextMessages:'Mesajlarda sonraki 10 a bastığında sonraki sayfayı aşağıya liste halinde getir...',    
      stripAds:'Banner reklamları kaldır',    
      stripFacebook:'Facebook butonlarını kaldır',    
      sessionExpireRedirect:'Oturum sona erdi mesajında otomatik olarak giriş sayfasına yönlendir',    
      leftAlign:'Sağda yer açmak için, oyun penceresini sola yasla',    
      autoBuildFeaturesEnabled:'Otomatik inşa özelliklerini etkinleştir. (Deneme aşamasında)',    
      allianceColor:'İttifakları değişik renklerle vurgulamanızı sağlar',    
      hideFriendsBar:'Arkadaş çubuğunu gizle',    
      empireOverview:'İmparatorluk genel bakış',    
      buildingsOverview:'Binalar genel bakış',    
      militaryOverview:'Ordular genel bakış',    
      militaryOverviewOnlyOwned:'Sadece kendi şehirlerini gözle',    
      targetsOverview:'Casusluk genel bakış (Araştırma danışmanı altında)',    
      movementsOverview:'Hareketler genel bakış(Ada Haritası altında) ',    
      buildingList:'Şehri Göster butonuna bina listesi ekle',    
      tradeOverview:'Ticaret merkezinde bütün teklifleri göster',    
      worldOverview:'Dünya haritası genel bakışını göstermek için Dünya haritası butonu ekler',    
      museumOverview:'Şehrirlerle birlikte Aktif ve Tatil durumlarını göster',    
      resourceDetails:'Detaylı kaynak bilgisi göster',    
      showBuildingLevels:'Şehir görünümünde bina seviyelerini göster',    
      showBuildingNames:'Şehir görünümünde bina adlarını göster',    
      biggerWorldMap:'Dünya haritasının yüksekliğini arttır',    
      splitPersonalities:'Danışman linklerini iki kısıma ayır',    
      events:'Genel Bildirim Ayarları',    
      ikariamNotifyEnabled:'Olay bildirimlerini etkinleştir',    
      ikaNotifyShowTimer:'Sonraki olay kontrolüne kalan zamanı göster',    
      emailNoticeUrl:'Kullanılacak e-posta sunucusunun URL\'si',    
      pillaging:'Yağmaya yardımcı araçlar',    
      islandShowSpies:'Casusunuz olan şehirlerin yanına casus ikonu göster',    
      islandBlinkInactives:'İnaktif şehir isimlerinin yanıp sönmesini sağla ',    
      islandMarkLoners:'Herhangi bir ittifakta olmayan şehir isimlerini kırmızı göster ',    
      playerCitiesInIslandView:'Ada görünümünde oyunuların şehir listesini göster',    
      treaties:'Kültürel Anlaşma ikonlarının gösterileceği yerleri seç:',    
      ctAlliance:'İtifak görünümünde oyuncu adları yanında ikon göster',    
      ctInbox:'Gelen kutusu mesajlarında ikon göster',    
      ctIslandView:'Ada görünümünde şehir adları yanında ikon göster',    
      ctTradeTreaties:'Anlaşma görünümünde oyuncuların yanında ikon göster',    
      search:'Arama ikonlarının nerde görünmesini istersiniz?',    
      searchIconsWhere:'Arama ikonlarının nerde görünmesini istersiniz?',    
      searchIconIslandPlayer:'Ada görünümünde oyuncu adları yanında',    
      searchIconOccupier:'Şehir görünümünde işgalci adı yanında',    
      searchIconHighscore:'Sıralamada oyuncu adları yanında',    
      searchIconInbox:'Gelen kutusunda oyuncu adları yanında',    
      searchIconAlliancePlayers:'İttifakta oyuncu adları yanında',    
      searchIconMuseum:'Müzede ittifaklar ve oyuncu adları yanında',    
      searchScoresHtml:'Ada görünümünde şu puanları göster:',    
      searchScore: 'Ada görünümünde puanları göster (Aşağıdaki listeyi kullanır)',    
      scoreTotal:'Ada görünümde toplam puanı göster',    
      scoreMilitary:'Ada görünümde general puanını göster',    
      scoreOffense:'Ada görünümde Saldırı puanını göster',    
      scoreDefense:'Ada görünümde savunma puanını göster',     
      scoreResources:'Ada görünümde kaynaklar puanını göster',     
      scoreGold:'Ada görünümde altın puanını göster',     
      scoreBuilder:'Ada görünümde usta inşaatçılar puanını göster',     
      scoreBuildings:'Ada görünümde bina seviyeleri puanını göster',     
      scoreScientists:'Ada görünümde bilim adamları puanını göster',     
      scoreResearch:'Ada görünümde araştırma seviyesi puanını göster',     
      scoreTrading:'Ada görünümde ticaret sıralaması puanını göster',     
      scoreDonations:'Ada görünümde bağışla puanını göster',     
      debugMode:'Betik çalışma süresini göster'    
    },    
    optionsLabels:    
    {    
      general:"Genel",    
      keyboardShortcuts:'Klavye kısayolları',    
      resourceLinks:'Kaynak bağlantıları',    
      expandCargo:'Kargoyu genişlet',    
      messagePreviews:'Mesaj önizlemesi',    
      ajaxNextMessages:'Mesajları uç uca ekleme',    
      stripAds:'Reklamları kaldır',    
      stripFacebook:'Facebook kaldır',    
      sessionExpireRedirect:'Oturum yönlendirme',    
      leftAlign:'Sola yasla',    
      autoBuildFeaturesEnabled:'Otomatik inşa',    
      allianceColor:'İttifak Vurgulama',    
      hideFriendsBar:'Arkadaşları Gizle',    
      overviews:"Genel Bakışlar",    
      empireOverview:'İmparatorluk',    
      buildingsOverview:'Binalar',    
      militaryOverview:'Ordu',    
      militaryOverviewOnlyOwned:'Ordu',    
      targetsOverview:'Casusluk',    
      movementsOverview:'Hareketler',    
      buildingList:'Bina Listesi',    
      tradeOverview:'Ticaret',    
      worldOverview:'Dünya haritası',    
      museumOverview:'Müze',    
      resourceDetails:'Kaynak detayları',    
      showBuildingLevels:'Bina seviyeleri',    
      showBuildingNames:'Bina isimleri',    
      biggerWorldMap:'Büyük harita',    
      splitPersonalities:'Danışmanlar Ayır',    
      events:"Olaylar",    
      ikariamNotifyEnabled:'Aktif',    
      ikaNotifyShowTimer:'Zamanlayıcıyı göster',    
      emailNoticeUrl:'Sunucu',    
      pillaging:"Yağma",    
      islandShowSpies:'Casus ikonları',    
      islandBlinkInactives:'İnaktif Yanıp sönme',    
      islandMarkLoners:'Yalnızları İşaretleme',    
      playerCitiesInIslandView:'Şehir Listesi',    
      treaties:"Anlaşmalar",    
      ctAlliance:'İttifak',    
      ctInbox:'Gelen Kutusu',    
      ctIslandView:'Ada',    
      ctTradeTreaties:'Anlaşma',    
      search:"Arama",    
      searchIconIslandPlayer:'Ada oyuncuları',    
      searchIconOccupier:'İşgalciler',    
      searchIconHighscore:'Puanlar',    
      searchIconInbox:'Gelen Kutusu',    
      searchIconAlliancePlayers:'İttifak',    
      searchIconMuseum:'Müze',    
      searchScore:'Puanları Göster',    
      scoreTotal:'Toplam',    
      scoreMilitary:'Askeri',    
      scoreOffense:'Saldırı',    
      scoreDefense:'Savunma',    
      scoreResources:'Kaynaklar',     
      scoreGold:'Altın',    
      scoreBuilder:'Ustaİnşaatçılar',    
      scoreBuildings:'BinaSeviyeleri',    
      scoreScientists:'BilimAdamları',    
      scoreResearch:'Araştırma',    
      scoreTrading:'Ticaret',    
      scoreDonations:'Bağış',    
      about:"Hakkında",    
      debugMode:'Hata ayıklama modu'    
    },    
    optionsListValues:    
    {    
      disabled: 'Devre Dışı',    
      dropdown: 'AçılırListe',    
      bottom: 'Aşağıda'    
    },    
    buildings:    
    {    
      academy:'Akademi',    
      alchemist:'Simya Kulesi',    
      architect:'Mimarlık Bürosu',    
      barracks:'Kışla',    
      branchOffice:'Ticaret Merkezi',    
      carpentering:'Marangoz Atölyesi',    
      dump:'Yığın Sahası',    
      embassy:'Büyükelçilik',    
      fireworker:'Fişekçi',    
      forester:'Ormancı Kulubesi',    
      glassblowing:'Cam Eşya Atölyesi',    
      museum:'Müze',    
      optician:'Optik',    
      palace:'Saray',    
      palaceColony:'Valilik',    
      port:'Ticaret Limanı',    
      safehouse:'İstihbarat Merkezi',    
      shipyard:'Donanma Tersanesi',    
      stonemason:'Mermer Atölyesi',    
      tavern:'Taverna',    
      temple:'Tapınak',    
      townHall:'Belediye Binası',    
      vineyard:'Şarap Mahzeni',    
      wall:'Sur',    
      warehouse:'Warehouse',    
      winegrower:'Bağ Evi',    
      workshop:'Mucit Atölyesi'    
    },    
    buildingsShortNames:     
    {    
      "townHall": "Belediye",    
      "academy": "Akademi",    
      "warehouse": "Depo",    
      "tavern": "Taverna",    
      temple:'Tapınak',    
      dump:'Yığın',    
      "palace": "Saray",    
      "palaceColony": "Valilik",    
      "museum": "Müze",    
      "port": "Liman",    
      "shipyard": "Donanma",    
      "barracks": "Kışla",    
      "wall": "Sur",    
      "embassy": "Büyükelçilik",    
      "branchOffice": "Ticaret",    
      "workshop": "Mucit",    
      "safehouse": "İstihbarat",    
      "forester": "Ormancı",    
      "glassblowing": "CamEşya",    
      "alchemist": "Simyacı",    
      "winegrower": "ŞarapMahzeni",    
      "stonemason": "MermerAtölyesi",    
      "carpentering": "Marangoz",    
      "optician": "Optik",    
      "fireworker": "Fişekçi",    
      "vineyard": "Şarap Mahzeni",    
      "architect": "Mimar",    
      "buildingGround": "Boş Bina yeri"    
    }    
  },
  el:
  {  // Hellenic / Greek  
    name:'Ελληνικά',  
    interface:  
    {   
        Capacity:'Χωρητικότητα',  
        Safe:'Ασφαλή',  
        Lootable:'Λεηλατίσιμα',  
        Income:'Εισόδημα',  
        Full:'Πλήρες σε',  
        Empty:'Άδειο σε',  
        Stable:'Σταθερό σε',  
        day:'ημέρα',  
        City:'Πόλη',  
        level:'επίπεδο',  
        Level:'Επίπεδο',  
        loading:'φόρτωση',  
        upkeep:'συντήρηση',  
        training:'εκπαίδευση',  
        total:'σύνολο',  
        Total:'Σύνολο',  
        Military:'Στρατός',  
        Offense:'Επίθεση',  
        Defense:'Άμυνα',  
        Resources:'Πόροι',   
        Gold:'Χρυσός',  
        Builder:'Κατασκευαστής',  
        Buildings:'Κτήρια',  
        Scientists:'Επιστήμονες',  
        Research:'Έρευνα',  
        Trading:'Εμπόριο',  
        Donations:'Δωρεές',  
        Points:'Σημεία',  
        Rank:'Βαθμός',  
        reloadMilitary:'Επαναφόρτωση όλων των στρατιωτικών πληροφοριών',  
        inTransitTo:'σε διαμετακόμιση προς',  
        trainingBarracks:'εκπαίδευση στο στρατώνα',  
        StationFleets:'Πλοία Ναυστάθμου',  
        DeployTroops:'Ανάπτυξη στρατευμάτων',  
        ViewCityIsland:'Προβολή πόλης στο νησί της',  
        GoToShiyard:'Μετάβαση στο ναυπηγείο',  
        GoToBarracks:'Μετάβαση στο στρατώνα',  
        UnderConstrution:'Κτήριο υπόκατασκευή',  
        TransportResources:'Μεταφορά πόρων προς',  
        AbortMission:'Ακύρωση Αποστολής',  
        Time:'Χρόνος',  
        Units:'Μοννάδες',  
        Origin:'Προέλευση',  
        Mission:'Αποστολή',  
        Destination:'Προορισμός',  
        Action:'Ενέργεια',  
        Circular:'Κυκλικό',  
        NewCircular:'Νέο Κυκλικό',  
        NewCircularText:'Δημιουργία ενός νέου κυκλικού μηνύματος σε όλη τη συμμαχία σας',  
        CircularMessage:'Κυκλικό μήνυμα συμμαχίας',  
        CulturalMessage:'Μήνυμα πολιτιστικής συνθήκης',  
        TreatyMessage:'Μήνυμα συνθήκης',  
        PersonalMessage:'Προσωπικό μήνυμα',  
        ReplyCircular:'Απαντήστε σε αυτό το μήνυμα ως κυκλικό μήνυμα συμμαχίας',  
        HideOffline:'Απόκριψη εκτός σύνδεσης',  
        ShowOffline:'Προβολή εκτός σύνδεσης',  
        SellOffers:'Προσφορές πώλησης',  
        BuyOffers:'Προσφορές αγοράς',  
        ShowCitiesMap:'Προβολή πόλεων στο χάρτη',  
        AddTarget:'Προσθήκη Στόχου',  
        HaveASpy:'Έχετε ένα κατάσκοπο σε αυτήν την πόλη',  
        TestServer:'Διακομιστής Δοκιμών',  
        DisableAutoLogin:'Πατήστε για να απενεργποιήσετε την αυτόματη σύνδεση',  
        SetAutoLogin:'Πατήστε για να ορίσετε την αυτόματη σύνδεση με χρήση αυτών των πληροφοριών',  
        HaveACulturalTreaty:'Έχετε συνάψει πολιτιστική συνθήκη με αυτόν τον παίχτη',  
        RequestedCulturalTreaty:'Έχετε αιτηθεί σύναψη πολιτιστικής συνθήκης με αυτό τον παίχτη',  
        openSlots:'άνοιγμα θέσεων',  
        of:'του',  
        RequestCT:'Αίτημα σύναψης πολιτιστικής συνθήκης',  
        ReloadResearch:'Επαναφόρτωση όλων των Ερευνών',  
        ReloadResearchTime:'Αυτό ίσως κρατήσει λίγο',  
        TroopMovements:'Μετακινήσεις Μονάδων',  
        CombatReports:'Αναφορές Μάχης',  
        Inbox:'Εισερχόμενα',  
        Alliance:'Συμμαχία',  
        Library:'Βιβλιοθήκη'  
    },  
    pillageHelper:  
    {  
        PillageHelper:'Βοηθός Λεηλασίας',  
        City:'Πόλη',  
        Player:'Παίκτης',  
        Wall:'Επίπεδο Τοίχου',  
        Mortars:'Απαιτούμενοι όλμοι',  
        Port:'Επίπεδο λιμένα',  
        Resources:'Διαθέσιμοι πόροι',  
        lastReport:'από την τελευταία αναφορά',  
        none:'κανένα',  
        MilitaryScore:'Βαθμολογία στρατού παίκτη',  
        CityLevel:'Επίπεδο πόλης',  
        Garrison:'Πληροφορίες φρουράς',  
        SpyCount:'Κατάσκοποι στο στόχο',  
        SpyCountIn:'Αριθμός κατασκόπων στο',  
        Wood:'Διαθέσιμο ξύλο για λεηλασία',  
        Wine:'Διαθέσιμο κρασί για λεηλασία',  
        Marble:'Διαθέσιμο μάρμαρο για λεηλασία',  
        Crystal:'Διαθέσιμος κρύσταλλος για λεηλασία',  
        Sulphur:'Διαθέσιμο θείο για λεηλασία',  
        Ships:'Απαιτούμενα εμπορικά πλοία για μεταφορά λαφήρων',  
        Time:'Χρόνος ταξιδιού',  
        Reload:'Επαναφόρτωση όλων των κατασκόπων',  
        Updated:'Ενημερώθηκε',  
        LastChecked:'Τελευταίος έλεγχος',  
        SendNoIslandInfo:'Αδύνατη η αποστολή κατασκόπου γιατί ο κωδικός του νησιού δεν είναι ακόμα γνωστός',  
        ViewNoIslandInfo:'Αδύνατη η προβολή του νησιού γιατί ο κωδικός δεν είναι γνωστός',  
        Mission:'Αποστολή',  
        Pillage:'Λεηλασία',   
        Blockade:'Αποκλεισμός',  
        SendSpy:'Αποστολή κατασκόπου στο',  
        RemoveCity:'Απομάκρυνση πόλης από τη λίστα στόχων',  
        CantRemoveCity:'Έχετε ακόμα κατασκόπους στο',  
        Resources:'Πόροι',  
        TargetOccupied:'Η πόλη προορισμού είναι υπό στρατιωτική κατοχή'  
    },  
    autoBuild:  
    {  
        AddBuildingToQueue:'Προσθήκη αυτού του κτηρίου στην ουρά αυτούματου χτησίματος.',  
        AutoUpgrade:'Αυτόματη Αναβάθμιση',  
        AutoUpgradeAll:'Αυτόματη Αναβάθμιση Όλων',  
        AutoUpgradeAllTxt:'Προσθήκη όλων των κτηρίων σε σε αυτή την πόλη στη λίστα αυτόματης αναβάθμισης',  
        totalForLevel:'συνολικά για το επίπεδο',  
        moreForTrade:'περισσότερα για εμπόριο 1:1',  
        RemoveAutoUpgrade:'Απομάκρυνση από αυτόματες αναβαθμίσεις',  
        addToQueue:'Προσθήκη στην ουρά',  
        autoBuild:'Αυτόματο χτίσιμο', // name of script  
        demolishConfirm:'Θέλετε να κατεδαφίσετε πλήρως αυτό το κτήριο;',  
        options:  
        {  
            by:'από',  
            descriptions:  
            {  
                smartChecking:'Χρησιμοποίστε τον έξυπνο έλεγχο',  
                autoDisable:'Απενεργοποίηση του κώδικα αν είναι ανενεργός για πολύ ώρα',  
                highlightRows:'Επισήμανση εναλλακτικών γραμμών στη θέση πληροφόρησης Αυτόματου Χτισίματος',  
            },  
            help:  
            {  
                smartChecking:'Ο έξυπνος έλεγχος θα ελέγχει αυτόματα κάθε 30 δευτερόλεπτα αν κάτι στην ουρά ή στην λίστα αυτόματου χτισίματος μπορεί να χτιστεί. Αυτό γίνεται χωρίς επικοινωνία με τους server του παιχνιδιού.',  
                autoDisable:'Αυτή η επιλογή θα απενεργοποιεί το αυτόματο χτίσιμο στην περίπτωση που ο κώδικας δεν έχει τρέξει για αρκετό χρόνο, πράγμα το οποίο μπορεί να είναι χρήσιμο αν παίζεις σε πολλούς διαφορετικούς υπολογιστές. Για παράδειγμα αν παίζεις σε έναν υπολογιστή μέρα και μετά πας σε έναν άλλο η σειρά που είχες αφήσει στον πρώτο μπορεί να μη σε εξυπηρετεί πια, και να μη θέλεις να συνεχίσει να ισχύει.',  
            },  
            hour:'Ώρα',  
            hours:'Ώρες',  
            labels:  
            {  
                show:'Εμφάνιση',  
                reCheckEvery:'Επανέλεγχος για αυτόματο χτίσιμο κάθε',  
                smartChecking:'Έξυπνος έλεγχος',  
                autoDisable:'Αυτόματη απενεργοποίηση',  
                highlightRows:'Επισήμανση γραμμών',  
                },  
            minute:'Λεπτό',  
            minutes:'Λεπτά',  
            show:  
            {  
                allCities:'Όλα τα κτίρια σε όλες τις πόλεις',  
                currentCity:'Μόνο τα κτίρια σε αυτή την πόλη',  
            },  
            updatesAndHistory:'Ενημερώσεις Κώδικα & Ιστορικό',  
            v:'εκδ.',  
        },  
        queue:  
        {  
            autoUpgrade:'Αυτόματη αναβάθμιση',  
            change:'αλλαγή',  
            clearAll:'αφαίρεση όλων',  
            clearAllDesc:'Αφαίρεση όλων των χτισιμάτων από την αυτόματη λίστα χτισίματος',  
            downInQueue:'κάτω στη λίστα',  
            emptyNotice:'Η λίστα αυτόματου χτισίματος είναι άδεια.',  
            enableAutoBuild:'Ενεργοποίηση του αυτόματου χτισίματος',  
            enableDisableAutoUpgrades:'Ενεργοποίηση / Απενεργοποίηση του αυτόματοτ χτισίματος για όλες τις πόλεις',  
            expandOrCollapse:  
            {  
                autoBuild:'Μεγιστοποίηση ή ελαχιστοποίση της λίστας αυτόματου χτισίματος',  
                autoUpgrades:'Μεγιστοποίηση ή ελαχιστοποίση των αυτόματων αναβαθμίσεων',  
            },  
            fromAutoUpgrades:'από τις αυτόματες αναβαθμίσεις',  
            fromQueue:'από τη λίστα',  
            move:'Μετακίνηση',  
            queue:'Στην ουρά',  
            showing:  
            {  
                allCities:'Όλες οι πόλεις',  
                currentCity:'Τρέχουσα πόλη',  
            },  
            upInQueue:'πάνω στη λίστα',  
            remove:'Αφαίρεση',  
            timeUntilNextDesc:'Υπολοιπόμενος χρόνος μέχρι τον επόμενο έλεγχο για αυτόματο χτίσιμο (Πάτησε για επανέλεγχο τώρα)',  
        }      
    },  
    scriptOptions:  
    {  
        settings:'Ρυθμίσεις',  
        footer:'Σημείωση: Ίσως χρειαστεί να ανανεώσετε τη σελίδα για να δείτε τις αλλαγές.',  
        cancel:'Άκυρο',  
        save:'Αποθήκευση',  
        CheckUpdates:'Έλεγχος ενημερώσεων'  
    },  
    optionsTexts:  
    {  
        externalArmyHelper:'προβολή εικόνων μονάδων στις οθόνες ανάπτυξης',  
        keyboardShortcuts:'πατήστε 1 έως # των πόλεων για αλλαγή πόλεων κλπ.',  
        antiPlus:'απομάκρυνση όλων των χαρακτηριστικών Ikariam Plus',  
        resourceLinks:'αλλαγή εικονιδίων πόρων σε σύνδέσμους',  
        expandCargo:'Πάντα προβολή φορτίου στις στρατιωτικές μετακινήσεις',  
        messagePreviews:'προβολή πρώτης γραμμής μηνυμάτων αντί για το θέμα',  
        ajaxNextMessages:'προσάρτηση μηνύματων σε λίστα πατώντας επόμενο...',  
        stripAds:'απομάκρυνση διαφημιστικών',  
        stripFacebook:'απομάκρυνση κουμπιών facebook',  
        sessionExpireRedirect:'μετάβαση στη σελίδα σύνδεσης με τη λήξη της συνεδρίας',  
        leftAlign:'Το παράθυρο του παιχνιδιού στα αριστερά για να αφήσετε χώρο στα δεξιά',  
        autoBuildFeaturesEnabled:'ενεργοποίηση χαρακτηρστικών αυτόματου χτισίματος (υπό δοκιμή)',  
        allianceColor:'σας επιτρέπει να επισημάνετε τις συμμαχίες σας με διαφορετικά χρώματα',  
        hideFriendsBar:'απόκρυψη της στήλης φίλων',  
        empireOverview:'Επισκόπιση της αυτοκρατορίας',  
        buildingsOverview:'Επισκόπιση των κτηρίων',  
        militaryOverview:'Επισκόπιση των στρατιωτικών σας μονάδων',  
        militaryOverviewOnlyOwned:'Επισκόπιση μόνο των δικών σας Πόλεων',  
        targetsOverview:'Επισκόπιση κατασκόπων από τον Σϋμβουλο Έρευνας',  
        movementsOverview:'Επισκόπιση μετακινήσεων από την Προβολή νησιού',  
        buildingList:'Προσθήκη λίστας κτηρίων στο κουμπί Προβολής πόλης',  
        tradeOverview:'Προβάλει επισκόπιση όλων των προσφορών εμπορίου στο εμπορικό συναλλακτήριο',  
        worldOverview:'Προσθέτει ένα κουμπί παγκόσμιου χάρτη στη επισκόπιση προβολής παγκόσμιου χάρτη',  
        museumOverview:'Προβάλει κατάστασης (ενεργό και διακοπών) μαζί με τις πόλεις',  
        resourceDetails:'Προβολή λεπτομερών πληροφοριών πόρων',  
        showBuildingLevels:'Προβολή επιπέδων κτηρίων στην προβολή πόλης',  
        showBuildingNames:'Προβολή ονομάτων κτηρίων στην προβολή πόλης',  
        biggerWorldMap:'Αύξηση του ύψους του παγκόσμιου χάρτη',  
        splitPersonalities:'Διαχωρισμός των συνδέσμων συμβούλων',  
        events:'Γενικές Ρυθμίσεις Ειδοποιήσεων',  
        ikariamNotifyEnabled:'Ενεργοποίηση ειδοποιήσεων συμβάντων',  
        ikaNotifyShowTimer:'προβολή χρόνου μέχρι τον επόμενο έλεγχο συμβάντων',  
        emailNoticeUrl:'URL του διακομιστή αλληλογραφίας για χρήση',  
        pillaging:'Εργαλεία για βοήθεια με τη λεηλασία',  
        islandShowSpies:'προβολή εικονιδίων κατασκόπων δίπλα στις πόλεις που έχετε κατασκόπους',  
        islandBlinkInactives:'αναβόσβηση ονομάτων ανενεργών πόλεων ',  
        islandMarkLoners:'ονόματα πόλεων εκτός συμμαχιών με κόκκινο ',  
        playerCitiesInIslandView:'προβολή λίστας πόλεων παίκτη στην προβολή νησιού',  
        treaties:'Επιλέξτε τις θέσεις που θα θέλατε να φαίνονται εικονίδια πολιτιστικής συνθήκης:',  
        ctAlliance:'προβολή εικονιδίων δίπλα στους παίκτες στην προβολή συμμαχίας',  
        ctInbox:'προβολή εικονιδίων δίπλα στα μηνύματα στα εισερχόμενα',  
        ctIslandView:'προβολή εικονιδίων δίπλα στα ονόματα πόλεων στην προβολή νησιού',  
        ctTradeTreaties:'προβολή εικονιδίων δίπλα στους παίκτες στην προβολή συνθηκών',  
        search:'Που θέλετε να εμφανίζονται τα εικονίδια αναζήτησης;',  
        searchIconsWhere:'Που θέλετε να εμφανίζονται τα εικονίδια αναζήτησης;',  
        searchIconIslandPlayer:'δίπλα στο όνομα παίκτη στην προβολή νησιού',  
        searchIconOccupier:'δίπλα στο όνομα κατακτητή στην προβολή πόλης',  
        searchIconHighscore:'δίπλα στα ονόματα παικτών στην βαθμολογία',  
        searchIconInbox:'δίπλα στα ονόματα παικτών στα εισερχόμενα',  
        searchIconAlliancePlayers:'δίπλα στα ονόματα παικτών στη συμμαχία',  
        searchIconMuseum:'δίπλα στους παίκτες και τις συμμαχίες στο μουσείο',  
        searchScoresHtml:'Προβολή των ακόλουθων βαθμολογιών στην προβολή νησιού:',  
        searchScore:'προβολή βαθμολογιών στην προβολή νησιού (χρήση της ακόλουθης λίστας)',  
        scoreTotal:'προβολή συνολικής βαθμολογίας στην προβολή νησιού',  
        scoreMilitary:'προβολή στρατιωτικής βαθμολογίας στην προβολή νησιού',  
        scoreOffense:'προβολή βαθμολογίας επίθεσης στην προβολή νησιού',  
        scoreDefense:'προβολή βαθμολογίας άμυνας στην προβολή νησιού',   
        scoreResources:'προβολή βαθμολογίας πόρων στην προβολή νησιού',   
        scoreGold:'προβολή βαθμολογίας χρυσού στην προβολή νησιού',   
        scoreBuilder:'προβολή βαθμολογίας κατσσκευαστή στην προβολή νησιού',   
        scoreBuildings:'προβολή βαθμολογίας κτηρίων στην προβολή νησιού',   
        scoreScientists:'προβολή βαθμολογίας επιστημόνων στην προβολή νησιού',   
        scoreResearch:'προβολή βαθμολογίας έρευνας στην προβολή νησιού',   
        scoreTrading:'προβολή βαθμολογίας εμπορίου στην προβολή νησιού',   
        scoreDonations:'προβολή βαθμολογίας δωρεών στην προβολή νησιού',   
        debugMode:'προβολή χρόνου εκτέλεσης κώδικα'  
    },  
    optionsLabels:  
    {  
        general:'Γενικά',  
        keyboardShortcuts:'Συντομεύσεις πληκτρολογίου',  
        resourceLinks:'Σύνδεσμοι πόρων',  
        expandCargo:'Επέκταση Φορτίου',  
        messagePreviews:'Προεπισκόπιση Μηνύματος',  
        ajaxNextMessages:'Ανάπτυξη Μηνύματος',  
        stripAds:'Απομάκρυνση διαφημίσεων',  
        stripFacebook:'Απομάκρυνση Facebook',  
        sessionExpireRedirect:'Ανακατεύθυνση συνεδρίας',  
        leftAlign:'Αριστερή Ευθυγράμμιση',  
        autoBuildFeaturesEnabled:'Αυτόματο Χτίσιμο',  
        allianceColor:'Επισημαντής Συμμαχίας',  
        hideFriendsBar:'Απόκρυψη Φίλων',  
        overviews:'Επισκοπήσεις',  
        empireOverview:'Αυτοκρατορία',  
        buildingsOverview:'Κτήρια',  
        militaryOverview:'Στρατός',  
        militaryOverviewOnlyOwned:'Στρατός',  
        targetsOverview:'Κατασκοπεία',  
        movementsOverview:'Μετακινήσεις',  
        buildingList:'Λίστα Κτησίματος',  
        tradeOverview:'Εμπόριο',  
        worldOverview:'Παγκόσμιος Χάρτης',  
        museumOverview:'Μουσείο',  
        resourceDetails:'Λεπτομέρειες Πόρων',  
        showBuildingLevels:'Επίπεδα Κτηρίων',  
        showBuildingNames:'Ονόματα Κτηρίων',  
        biggerWorldMap:'Μεγάλος Χάρτης',  
        splitPersonalities:'Διαχωρισμός Προσωπικοτήτων',  
        events:'Συμβάντα',  
        ikariamNotifyEnabled:'Ενεργόποιημένο',  
        ikaNotifyShowTimer:'Προβολή Χρονομέτρου',  
        emailNoticeUrl:'Διακομιστής',  
        pillaging:'Λεηλασία',  
        islandShowSpies:'Εικονίδια Κατασκόπων',  
        islandBlinkInactives:'Αναβόσβηση Ανενεργών',  
        islandMarkLoners:'Επισήμανση Μεμονομένων',  
        playerCitiesInIslandView:'Λίστα Πόλεων',  
        treaties:'Συνθήκες',  
        ctAlliance:'Συμμαχία',  
        ctInbox:'Εισερχόμενα',  
        ctIslandView:'Νησί',  
        ctTradeTreaties:'Συνθήκη',  
        search:'Αναζήτηση',  
        searchIconIslandPlayer:'Παίκτες Νησιού',  
        searchIconOccupier:'Κατακτητές',  
        searchIconHighscore:'Βαθμολογία',  
        searchIconInbox:'Εισερχόμενα',  
        searchIconAlliancePlayers:'Συμμαχία',  
        searchIconMuseum:'Μουσείο',  
        searchScore:'Προβολή βαθμολογιών',  
        scoreTotal:'Σύνολο',  
        scoreMilitary:'Στρατός',  
        scoreOffense:'Επίθεση',  
        scoreDefense:'Άμυνα',  
        scoreResources:'Πόροι',   
        scoreGold:'Χρυσός',  
        scoreBuilder:'Κατασκευαστής',  
        scoreBuildings:'Κτήρια',  
        scoreScientists:'Επιστήμονες',  
        scoreResearch:'Έρευνα',  
        scoreTrading:'Εμπόριο',  
        scoreDonations:'Δωρεές',  
        about:'Σχετικά',  
        debugMode:'Κατάσταση ελέγχου σφαλμάτων'  
    },  
    optionsListValues:  
    {  
        disabled:'Απενεργοποιημένο',  
        dropdown:'Αναδυόμενο',  
        bottom:'Κουμπί'  
    },  
    buildings:  
    {  
      academy:'Ακαδημία',  
      alchemist:'Πύργος Αλχημιστή',  
      architect:'Αρχιτεκτονικό Γραφείο',
      barracks:'Στρατώνας',  
      branchOffice:'Εμπορικό Συναλλακτήριο',  
      carpentering:'Ξυλουργείο',  
      dump:'Αλάνα',  
      embassy:'Πρεσβεία',  
      fireworker:'Περιοχή Δοκιμών Πυροτεχνημάτων',  
      forester:'Σπίτι του Ξυλοκόπου',  
      glassblowing:'Υαλουργείο',  
      museum:'Μουσείο',  
      optician:'Οπτικός',  
      palace:'Παλάτι',  
      palaceColony:'Κυβερνείο',  
      port:'Λιμένας',  
      safehouse:'Κρυσφήγετο',  
      shipyard:'Ναυπηγείο',  
      stonemason:'Λατομείο',  
      tavern:'Ταβέρνα',  
      temple:'Ναός',  
      townHall:'Δημαρχείο',  
      vineyard:'Κελάρι',  
      wall:'Τείχος',  
      warehouse:'Αποθήκη',  
      winegrower:'Αποστακτήριο',  
      workshop:'Εργαστήριο',  
    },  
    buildingsShortNames:   
    {  
      townHall:'Δημαρχείο',  
      academy:'Ακαδημία',  
      warehouse:'Αποθήκη',  
      tavern:'Ταβέρνα',  
      temple:'Ναός',  
      dump:'Αλάνα',  
      palace:'Παλάτι',  
      palaceColony:'Κυβερνείο',  
      museum:'Μουσείο',  
      port:'Λιμάνι',  
      shipyard:'Ναυπηγείο',  
      barracks:'Στρατώνας',  
      wall:'Τείχος',  
      embassy:'Πρεσβεία',  
      branchOffice:'Εμπορικό Συναλλακτήριο',  
      workshop:'Εργαστήριο',  
      safehouse:'Κρυσφήγετο',  
      forester:'Σπίτι του Ξυλοκόπου',  
      glassblowing:'Υαλουργείο',  
      alchemist:'Πύργος Αλχημιστή',  
      winegrower:'Αποστακτήριο',  
      stonemason:'Λατομείο',  
      carpentering:'Ξυλουργείο',  
      optician:'Οπτικός',  
      fireworker:'Περιοχή Δοκιμών Πυροτεχνημάτων',  
      vineyard:'Κελάρι',  
      architect:'Αρχιτεκτονικό Γραφείο',  
      buildingGround:'Οικοδομικός Χώρος'  
    }  
  },
  ar:
  { //Arabic
    name:'العربية',  
    interface:  
    {   
      Capacity:'السعة',  
      Safe:'آمن من النهب',  
      Lootable:'صالح للنهب',  
      Income:'المدخول في الساعة',  
      Full:'يمتلئ في',  
      Empty:'ينتهي في',  
      Stable:'مستقر في',  
      day:'يوم',  
      City:'المدينة',  
      level:'مستوي',  
      Level:'مستوي',  
      loading:'الرجاء الأنتظار',  
      upkeep:'صيانة',  
      training: 'تدريب',  
      total: 'إجمالي',  
      Total:'مجموع النقاط',  
      Military:'جنرالات',  
      Offense:'نقاط الهجوم',  
      Defense:'نقاط الدفاع',  
      Resources:'مواد أولية',   
      Gold:'كمية الذهب',  
      Builder:'مقاول بناء',  
      Buildings:'مستوي المباني',  
      Scientists:'العلماء',  
      Research:'الأبحاث',  
      Trading:'التجارة',  
      Donations:'التبرع',  
      Points:'النقاط',  
      Rank:'الترتيب',  
      reloadMilitary:'تحديث كل المعلومات العسكرية',  
      inTransitTo: 'في الطريق إلي',  
      trainingBarracks:'تدريب في الثكنة',  
      StationFleets: 'مركزة أساطيل',  
      DeployTroops:'مركزة قوات',  
      ViewCityIsland:'مشاهدة المدينة علي الجزيرة',  
      GoToShiyard:'الذهاب إلي حوض السفن',  
      GoToBarracks:'الذهاب إلي الثكنة',  
      UnderConstrution:'البناء تحت الإنشاء',  
      TransportResources:'نقل موارد إلي',  
      AbortMission:'إلغاء المهمة',  
      Time:'الوقت',  
      Units:'الوحدات',  
      Origin:'الأصل',  
      Mission:'المهمة',  
      Destination:'الهدف',  
      Action:'تحرك',  
      Circular:'الرد إلي التحالف',  
      NewCircular:'رسالة جديدة إلي التحالف',  
      NewCircularText: 'إنشاء رسالة جديدة إلي التحالف',  
      CircularMessage:'إرسال رسالة للتحالف',  
      CulturalMessage:'رسالة معاهدة ثقافية',  
      TreatyMessage:'معاهدة',  
      PersonalMessage:'رسالة',  
      ReplyCircular:'رد هذه الرسالة إلي التحالف',  
      HideOffline:'إخفاء الغير موجودين',  
      ShowOffline:'إظهار الغير موجودين',  
      SellOffers:'عروض البيع',  
      BuyOffers:'عروض الشراء',  
      ShowCitiesMap:'إظهار المدن علي الخريطة',  
      AddTarget:'إضافة هدف',  
      HaveASpy:'لديك جاسوس في هذه المدينة',  
      TestServer:'خادم التجارب',  
      DisableAutoLogin:'إضغط هنا لإلغاء الدخول التلقائي',  
      SetAutoLogin:'إضغط هنا لتفعيل الدخول التلقائي لهذا الحساب',  
      HaveACulturalTreaty:'لديك معاهدة ثقافية مع هذا اللاعب',  
      RequestedCulturalTreaty:'لقد طلبت معاهدة ثقافية مع هذا اللاعب',  
      openSlots:'فتح ثغرات',  
      of:'من',  
      RequestCT:'إرسال عرض معاهدة تجارية',  
      ReloadResearch:'تحديث كل الأبحاث',  
      ReloadResearchTime:'هذا سيأخذ دقيقة من الوقت',  
      TroopMovements:'تحركات القوات',  
      CombatReports:'التقارير',  
      Inbox:'البريد الوارد',  
      Alliance:'التحالف',  
      Library:'المكتبة'  
    },  
    pillageHelper:  
    {  
      PillageHelper: 'مساعد النهب',  
      City:'المدينة',  
      Player:'اللاعب',  
      Wall:'مستوي السور',  
      Mortars:'الإحتياجات من الهاون',  
      Port:'مستوي الميناء',  
      Resources:'الموارد المتاحة',  
      lastReport:'منذ أخر تقرير',  
      none:'لا يوجد',  
      MilitaryScore:"جنرالات اللاعب",  
      CityLevel:'مستوي المدينة',  
      Garrison:'معلومات الموقع العسكري',  
      SpyCount:'الجواسيس في المدينة الهدف',  
      SpyCountIn:'عدد الجواسيس في',  
      Wood:'مواد بناء صالحة للنهب',  
      Wine:'عنب صالح للنهب',  
      Marble:'رخام صالح  للنهب',  
      Crystal:'بلور صالح للنهب',  
      Sulphur:'كبريت صالح للنهب',  
      Ships:'السفن المطلوبة لنهب الموارد',  
      Time:'وقت السفر',  
      Reload:'تحديث تقارير الجواسيس',  
      Updated:'تم التحديث',  
      LastChecked:'أخر فحص',  
      SendNoIslandInfo: 'غير قادر علي إرسال الجواسيس لأن الجزيرة الهدف غير معرفة',  
      ViewNoIslandInfo: 'غير قادر علي عرض الجزيرة لأن الجزيرة الهدف غير معرفة',  
      Mission:'المهمة',  
      Pillage:'النهب',   
      Blockade:'حصار',  
      UpdateData: 'تحديث في',  
      UpdateDataTxt: 'تحديث جواسيس المدينة المطلوبة في هذا التقرير',  
      SendSpy:'إرسال جاسوس إلي',  
      RemoveCity:'حذف المدينة من قائمة الأهداف',  
      CantRemoveCity:'لازلت تمتلك جواسيس في',  
      Resources:'موارد',  
      TargetOccupied:'المدينة الهدف تحت الإحتلال'  
    },  
    autoBuild:  
    {  
      AddBuildingToQueue:'إضافة هذا البناء إلي قائمة البناء التلقائية',  
      AutoUpgrade:'تحديث تلقائي',  
      AutoUpgradeAll: 'تحديث تلقائي لكل المباني',  
      AutoUpgradeAllTxt: 'إضافة كل مباني هذه المدينة إلي قائمة التحديث التلقائي',        
      totalForLevel:'إجمالي المستويات',  
      moreForTrade:'المزيد للتجارة 1:1',  
      RemoveAutoUpgrade:'حذف من قائمة البناء التلقائي',  
      addToQueue:'إضافة إلي صف البناء',  
      autoBuild:'البناء التلقائي',  // name of script  
      demolishConfirm:'هل أنت متأكد من تدمير هذا المبني بالكامل ؟',  
      options:  
      {  
        by:'بواسطة',  // used in "Auto Build by PhasmaExMachina"  
        descriptions:{  
          smartChecking:'إستخدام نظام التحقق الذكي',  
          autoDisable:'تعطيل البناء التلقائي إذا لم يعمل لمدة طويلة',  
          highlightRows:'تظليل الصفوف المتشابهة في القائمة',  
        },  
        help:  
        {  
          smartChecking:'نظام التحقق الذكي سيقوم بعمل فحص كل 30 ثانية للتأكد إذا كان هناك أي مبني في القائمة لم يتم بدء بنائة بالفعل ,هذا يحدث بدون المساس بخادم اللعبة',  
          autoDisable:'هذه الخاصية سوف تقوم بتعطيل البناء التلقائي في حالة إذا لم يعمل لمدة طويلة , هذا يكون مفيد في حالة إذا كنت تلعب علي جهازين مختلفين بنفس الحساب , مثال : إذا قمت بلعب اللعبة من جهاز طوال اليوم ثم في نهاية اليوم قمت بفتح اللعبة من جهاز أخر فلن تحتاج إلي القائمة السابقة الموجودة علي الجهاز الأخر لذلك لن يقوم السكريبت بتنفيذها إلا بعد أن تقوم بتحديثها',  
        },  
        hour:'ساعة',  
        hours:'ساعات',  
        labels:  
        {  
          show:'اظهر',  
          reCheckEvery:'إعادة التحقق كل',  
          smartChecking:'التحقق الذكي',  
          autoDisable:'التعطيل التلقائي',  
          highlightRows:'تظليل الصفوف المتشابهة',  
        },  
        minute:'دقيقة',  
        minutes:'دقائق',  
        show:  
        {  
          allCities:'كل المباني في كل المدن',  
          currentCity:'المباني في هذه المدينة فقط',  
        },  
        updatesAndHistory:'تحديثات و تاريخ الأسكريبت',  
        v:'نسخة',  // used to label version number (e.g. "v0.36")  
      },  
      queue:  
      {        
        autoUpgrade:'التحديث التلقائي',  
        change:'تغيير',  
        clearAll:'حذف الكل',  
        clearAllDesc:'حذف كل المباني من القائمة',  
        downInQueue:'إلي أسفل', // used in "Move [building name] down in queue"  
        upInQueue:'إلي أعلي', // used in "Move [building name] up in queue"  
        emptyNotice:'القائمة فارغة',  
        enableAutoBuild:'تفعيل البناء التلقائي',  
        enableDisableAutoUpgrades:'تفعيل / تعطيل البناء التلقائي في كل المدن',  
        expandOrCollapse:  
        {  
          autoBuild:'تمديد أو طي البناء التلقائي',  
          autoUpgrades:'تمديد أو طي التحديث التلقائي',  
        },  
        fromAutoUpgrades:'من قائمة التحديث التلقائي',  // used in "Remove [building name] from auto upgrades"  
        fromQueue:'من الصف',  // used in "Remove [building name] from queue"  
        move:'تحريك', // used in "Move [building name] up/down in queue"  
        queue:'الصف',  
        showing:  
        {  
          allCities:'إظهار كل المدن',  
          currentCity:'إظهار المدينة الحالية',  
        },  
        upInQueue:'إلي أعلي', // used in "Move [building name] up in queue"  
        remove:'حذف', // used in "Remove [building name] from ..."  
        timeUntilNextDesc:'الوقت المتبفي للفحص ( أضغط لبدء الفحص بدون إنتظار )',  
      }        
    },  
    scriptOptions:  
    {  
      settings:'إعدادات',  
      footer:'ملاحظة : ربما تحتاج إلي تحديث الأعدادات بعد تعديل الإعدادات.',  
      cancel:'إلغاء',  
      save:'حفظ',  
      CheckUpdates: 'البحث عن تحديث'  
    },  
    optionsTexts:  
    {  
      externalArmyHelper: 'إظهار تقسيمات القوات في شاشة النهب',  
      keyboardShortcuts:'الضغط علي أزرار الأرقام يأخذك إلي عرض المدينة للرقم المطلوب',  
      antiPlus:'حذف كل ما يتعلق بحساب الأمتياز',  
      resourceLinks:'تحويل رموز الموارد إلي روابط للمورد',  
      expandCargo:'إظهار الحمولة في عرض تحركات القوات',  
      messagePreviews:'إظهار السطر الأول من الرسالة بدلاً من الموضوع',  
      ajaxNextMessages:'إلحاق الرسائل بالقائمة الحالية عند الضغط علي التالي',  
      stripAds:'حذف الأعلانات',  
      stripFacebook:'حذف أزرار الفيسبوك',  
      sessionExpireRedirect:'الذهاب إلي صفحة الدخول عند إنهاء الجلسة',  
      leftAlign:'نافذة اللعبة علي اليسار لترك مساحة للأشياء علي اليمين ( غير مفعلة بعد في النسخة العربية )',  
      autoBuildFeaturesEnabled:'تفعيل خاصية البناء التلقائي ( تحت التجريب )',  
      allianceColor:'تمكنك هذه الخاصية من تحدين لون خاص لكل تحالف تريده',  
      hideFriendsBar:'إخفائ شريط الأصدقاء',  
      empireOverview:'تقرير عن المدن و الأمبراطورية',  
      buildingsOverview:'تقرير عن المباني ',  
      militaryOverview:'تقرير عن جيوشك',  
      militaryOverviewOnlyOwned:'التقارير للمدينة الحالة فقط',  
      targetsOverview:'تقارير التجيسس تحت مستشار الأبحاث',  
      movementsOverview:'تقارير التجسس تحت زر الجزيرة',  
      buildingList:'إضافة قائمة المباني إلي رز عرض المدينة ',  
      tradeOverview:'عرض تقرير بجميع عروض التجارة من كل الموارد في المتجر',  
      worldOverview:'إضافة زر عرض خريطة العام المرفقة لنافذة عرض خريطة العالم في اللعبة',  
      museumOverview:'إظهار اللاعيبن الحاليين و الخاملين في المتحف',  
      resourceDetails:'إظهار معلومات الموارد المفصلة',  
      showBuildingLevels:'عرض مستويات المباني في عرض المدينة',  
      showBuildingNames:'عرض أسماء المياني في عرض المدينة',  
      biggerWorldMap:'زيادة حجم خريطة العالم',  
      splitPersonalities:'تقسيم صورة المستشارين إلي روابط للمحتوي',  
      events:'معلومات التنبية العامة',  
      ikariamNotifyEnabled:'تفعيل التنبيه للأحداث',  
      ikaNotifyShowTimer:'إظهار الوقت المتبقي للفحص التالي',  
      emailNoticeUrl:'رابط خادم الرسائل',  
      pillaging:'أدوات للمساعدة في النهب',  
      islandShowSpies:'إظهار رمز بجابن المدن التي تمتلك جواسيس فيها',  
      islandBlinkInactives:'يجعل أسماء المدن الخاملة تومض',  
      islandMarkLoners:'أسماء المدن التي ليست في التحالف باللون الأحمر ',  
      playerCitiesInIslandView:'عرض قائمة بمدن اللاعب في عرض الجزيرة',  
      treaties:'إختار الأماكن التي تريد أن تظهر بها رموز المعادهات الثقافية :',  
      ctAlliance:'بجانب أسماء اللاعبين في التحالف',  
      ctInbox:'بجاننب أسماء اللاعبين في البريد الوارد',  
      ctIslandView:'بجانب أسماء المدن في عرض الجزيرة',  
      ctTradeTreaties:'بجانب أسماء اللاعبين في عرض المعاهدات',  
      search:'أين تريد أن تظهر رموز البحث ؟',  
      searchIconsWhere:'أين تريد أن تظهر رموز البحث ؟',  
      searchIconIslandPlayer:'بجانب أسماء اللاعبين في عرض الجزيرة',  
      searchIconOccupier:'بجانب إسم المحتل في عرض المدينة',  
      searchIconHighscore:'بجانب أسماء اللاعبين في قائمة الترتيب',  
      searchIconInbox:'بجانب أسماء اللاعبين في صندوق البريد',  
      searchIconAlliancePlayers:'بجانب أسماء اللاعبين في التحالف',  
      searchIconMuseum:'بجانب أسماء اللاعبين في المتحف',  
      searchScoresHtml:'إظهار الترتيبات التالية في شاشة عرض الجزيرة',  
      searchScore: 'إظهار الترتيب في شاشة عرض الجزيرة (بإستخدام القائمة التالية )',  
      scoreTotal:'إظهار النقاط العامة في شاشة عرض الجزيرة',  
      scoreMilitary:'إظهار ترتيب الجنرالات في شاشة عرض الجزيرة',  
      scoreOffense:'إظهار ترتيب نقاط الهجوم في شاشة عرض الجزيرة',  
      scoreDefense:'إظهار ترتيب نقاط الدفاع في شاشة عرض الجزيرة',   
      scoreResources:'إظهار ترتيب المواد الأولية في شاشة عرض الجزيرة',   
      scoreGold:'إظهار ترتيب كمية الذهب في شاشة عرض الجزيرة',   
      scoreBuilder:'إظهار ترتيب مقابل البناء في شاشة عرض الجزيرة',   
      scoreBuildings:'إظهار ترتيب مستوي المباني في شاشة عرض الجزيرة',   
      scoreScientists:'إظهار ترتيب العلماء في شاشة عرض الجزيرة',   
      scoreResearch:'إظهار ترتيب الأبحاث في شاشة عرض الجزيرة',   
      scoreTrading:'إظهار ترتيب التجارة في شاشة عرض الجزيرة',   
      scoreDonations:'إظهار ترتيب التبرع في شاشة عرض الجزيرة',   
      debugMode:'إظهار وقت تنفيذ السكريبت'  
    },  
    optionsLabels:  
    {  
      general:"إعدادات عامة ",  
      keyboardShortcuts:'أختصارات لوحة المفاتيح',  
      resourceLinks:'روابط للموارد',  
      expandCargo:'رؤية الحمولة',  
      messagePreviews:'محتوي الرسالة',  
      ajaxNextMessages:'الرسائل التالية',  
      stripAds:'إلغاء الأعلانات',  
      stripFacebook:'إلغاء الفيسبوك',  
      sessionExpireRedirect:'الجلسات',  
      leftAlign:'المحاذاة لليسار',  
      autoBuildFeaturesEnabled:'البناء التلقائي',  
      allianceColor:'تظليل الحلفاء',  
      hideFriendsBar:'إخفاء الأصدقاء',  
      overviews:"التقارير ",  
      empireOverview:'المدن',  
      buildingsOverview:'المباني',  
      militaryOverview:'الجيش',  
      militaryOverviewOnlyOwned:'الجيش في هذه المدينة',  
      targetsOverview:'تقارير التجسس',  
      movementsOverview:'تقارير التحركات',  
      buildingList:'قائمة المباني',  
      tradeOverview:'التجارة',  
      worldOverview:'خريطة العالم',  
      museumOverview:'المتحف',  
      resourceDetails:'تفاصيل الموارد',  
      showBuildingLevels:'مستوي المباني',  
      showBuildingNames:'أسماء المباني',  
      biggerWorldMap:'خريطة كبيرة',  
      splitPersonalities:'تقسيم صور المستشارين',  
      events:"أحداث ",  
      ikariamNotifyEnabled:'مفعل',  
      ikaNotifyShowTimer:'إظهار الموقت',  
      emailNoticeUrl:'الخادم',  
      pillaging:"النهب ",  
      islandShowSpies:'أيقونة الجواسيس',  
      islandBlinkInactives:'وميض اللاعبين الخاملين',  
      islandMarkLoners:'تحديد الغير موجودين في التحالف',  
      playerCitiesInIslandView:'قائمة مدن اللاعب',  
      treaties:"معاهدات ",  
      ctAlliance:'التحالف',  
      ctInbox:'البريد الوارد',  
      ctIslandView:'عرض الجزيرة',  
      ctTradeTreaties:'عرض المعاهدات',  
      search:"البحث ",  
      searchIconIslandPlayer:'اللاعبين علي الجزيرة',  
      searchIconOccupier:'المحتلون',  
      searchIconHighscore:'قائمة الترتيب',  
      searchIconInbox:'البريد الوارد',  
      searchIconAlliancePlayers:'الحلفاء',  
      searchIconMuseum:'المتحف',  
      searchScore:'إظهار ترتيب النقاط',  
      scoreTotal:'مجموع النقاط',  
      scoreMilitary:'جنرالات',  
      scoreOffense:'نقاط هجوم',  
      scoreDefense:'نقاط دفاع',  
      scoreResources:'مواد أولية',   
      scoreGold:'كمية الذهب',  
      scoreBuilder:'مقاول بناء',  
      scoreBuildings:'مستوي المباني',  
      scoreScientists:'العلماء',  
      scoreResearch:'الأبحاث',  
      scoreTrading:'التجارة',  
      scoreDonations:'التبرع',  
      about:"عن المبرمجين",  
      debugMode:'وضع تصحيح الأخطاء'  
    },  
    optionsListValues:  
    {  
      disabled: 'معطل',  
      dropdown: 'قامة منسدلة',  
      bottom: 'في أسفل الصفحة'  
    },  
    buildings:  
    {  
      academy:'الأكاديمية',  
      alchemist:'برج الكيميائي',  
      architect:'مكتب المهندس',  
      barracks:'الثكنة',  
      branchOffice:'المتجر',  
      carpentering:'النجار',  
      dump:'المستودع',  
      embassy:'السفارة',  
      fireworker:'ساحة تجارب الألعاب النارية',  
      forester:'بيت الحطاب',  
      glassblowing:'نافخ الزجاج',  
      museum:'المتحف',  
      optician:'صانع البصريات',  
      palace:'القصر',  
      palaceColony:'مقر الحاكم',  
      port:'مرفأ تجاري',  
      safehouse:'المخبأ',  
      shipyard:'حوض بناء السفن الحربية',  
      stonemason:'النحات',  
      tavern:'الإستراحة',  
      temple:'المركز',  
      townHall:'دار البلدية',  
      vineyard:'عصارة العنب',  
      wall:'سور المدينة',  
      warehouse:'المخزن',  
      winegrower:'معصرة العنب',  
      workshop:'مكان عمل المخترعين'  
    },  
    buildingsShortNames:   
    {  
      "academy":"الأكاديمية",  
      "alchemist":"برج الكيميائي",  
      "architect":"مكتب المهندس",  
      "barracks":"الثكنة",  
      "branchOffice":"المتجر",  
      "carpentering":"النجار",  
      "dump":"المستودع",  
      "embassy":"السفارة",  
      "fireworker":"ساحة الألعاب النارية",  
      "forester":"بيت الحطاب",  
      "glassblowing":"نافخ الزجاج",  
      "museum":"المتحف",  
      "optician":"صانع البصريات",  
      "palace":"القصر",  
      "palaceColony":"مقر الحاكم",  
      "port":"مرفأ تجاري",  
      "safehouse":"المخبأ",  
      "shipyard":"حوض السفن الحربية",  
      "stonemason":"النحات",  
      "tavern":"الإستراحة",  
      "temple":"المركز",  
      "townHall":"دار البلدية",  
      "vineyard":"عصارة العنب",  
      "wall":"سور المدينة",  
      "warehouse":"المخزن",  
      "winegrower":"معصرة العنب",  
      "workshop":"مكان المخترعين"  
    }  
  },
  sv: 
  {
    name:'Svenska',
    buildings:
    {
      "townHall": "Rådhus",
      "academy": "Akademi",
      "warehouse": "Lagerlokal",
      "tavern": "Taverna",
      "palace": "Palats",
      "palaceColony": "Guv. Residens",
      "museum": "Museum",
      "port": "Handelshamn",
      "shipyard": "Skeppsvarv",
      "barracks": "Kasern",
      "wall": "Stadsmur",
      "embassy": "Ambassad",
      "branchOffice": "Handelsstation",
      "workshop": "Verkstad",
      "safehouse": "Gömställe",
      "forester": "Skogvaktare",
      "glassblowing": "Glasblåsare",
      "alchemist": "Alkemist",
      "winegrower": "Vinodlare",
      "stonemason": "Stenhuggare",
      "carpentering": "Snickare",
      "optician": "Optiker",
      "fireworker": "Fyrverkerifabrik",
      "vineyard": "Vinpress",
      "architect": "Arkitekt"
    },
    buildingsShortNames:
    {
      "townHall": "Rådhus",
      "academy": "Akademi",
      "warehouse": "Lagerlokal",
      "tavern": "Taverna",
      "palace": "Palats",
      "palaceColony": "Guv. Residens",
      "museum": "Museum",
      "port": "Handelshamn",
      "shipyard": "Skeppsvarv",
      "barracks": "Kasern",
      "wall": "Stadsmur",
      "embassy": "Ambassad",
      "branchOffice": "Handelsstation",
      "workshop": "Verkstad",
      "safehouse": "Gömställe",
      "forester": "Skogvaktare",
      "glassblowing": "Glasblåsare",
      "alchemist": "Alkemist",
      "winegrower": "Vinodlare",
      "stonemason": "Stenhuggare",
      "carpentering": "Snickare",
      "optician": "Optiker",
      "fireworker": "Fyrverkerifabrik",
      "vineyard": "Vinpress",
      "architect": "Arkitekt",
      "buildingGround": "Byggnadsplats"
    }
  },
  de: 
  {
    name:'Deutsch',
    buildings:
    {
      "townHall": "Rathaus",
      "academy": "Akademie",
      "warehouse": "Lagerhaus",
      "tavern": "Taverne",
      "palace": "Palast",
      "palaceColony": "Stadthaltersitz",
      "museum": "Museum",
      "port": "Handelshafen",
      "shipyard": "Kriegswerft",
      "barracks": "Kaserne",
      "wall": "Stadtmauer",
      "embassy": "Botschaft",
      "branchOffice": "Kontor",
      "workshop": "Erfinderwerkstatt",
      "safehouse": "Versteck",
      "forester": "Forsthaus",
      "glassblowing": "Glasbläserei",
      "alchemist": "Alchemistenturm",
      "winegrower": "Winzerei",
      "stonemason": "Steinmetz",
      "carpentering": "Zimmerei",
      "optician": "Optiker",
      "fireworker": "Feuerwerksplatz",
      "vineyard": "Kelterei",
      "architect": "Architekturbüro"
    },
    buildingsShortNames: 
    {
      "townHall": "Rathaus",
      "academy": "Akademie",
      "warehouse": "Lagerhaus",
      "tavern": "Taverne",
      "palace": "Palast",
      "palaceColony": "Stadthaltersitz",
      "museum": "Museum",
      "port": "Handelshafen",
      "shipyard": "Kriegswerft",
      "barracks": "Kaserne",
      "wall": "Stadtmauer",
      "embassy": "Botschaft",
      "branchOffice": "Kontor",
      "workshop": "Erfinderwerkstatt",
      "safehouse": "Versteck",
      "forester": "Forsthaus",
      "glassblowing": "Glasbläserei",
      "alchemist": "Alchemistenturm",
      "winegrower": "Winzerei",
      "stonemason": "Steinmetz",
      "carpentering": "Zimmerei",
      "optician": "Optiker",
      "fireworker": "Feuerwerksplatz",
      "vineyard": "Kelterei",
      "architect": "Architekturbüro",
      "buildingGround": "Bauplatz"
    }
  },
  he: 
  {
    name:'עברית',
    buildings:
    {
      "townHall": "בניין העירייה",
      "academy": "אקדמיה",
      "warehouse": "מחסן",
      "tavern": "טברנה",
      "palace": "ארמון",
      "palaceColony": "מגורי המושל",
      "museum": "מוזיאון",
      "port": "נמל סחר",
      "shipyard": "מספנה",
      "barracks": "מגורי חיילים",
      "wall": "חומת העיר",
      "embassy": "שגרירות",
      "branchOffice": "תחנת סחר",
      "workshop": "בית-מלאכה",
      "safehouse": "מקום מחבוא",
      "forester": "בית חוטב עצים",
      "glassblowing": "מפעל הזכוכית",
      "alchemist": "מגדל האלכימאי",
      "winegrower": "מפעל היין",
      "stonemason": "מחצבה",
      "carpentering": "בית החרושת לעץ",
      "optician": "משרד המדען",
      "fireworker": "מפעל הזיקוקים",
      "vineyard": "יקב",
      "architect": "משרד הארכיטקטור"
    },
    buildings: 
    {
      "townHall": "בניין העירייה",
      "academy": "אקדמיה",
      "warehouse": "מחסן",
      "tavern": "טברנה",
      "palace": "ארמון",
      "palaceColony": "מגורי המושל",
      "museum": "מוזיאון",
      "port": "נמל סחר",
      "shipyard": "מספנה",
      "barracks": "מגורי חיילים",
      "wall": "חומת העיר",
      "embassy": "שגרירות",
      "branchOffice": "תחנת סחר",
      "workshop": "בית-מלאכה",
      "safehouse": "מקום מחבוא",
      "forester": "בית חוטב עצים",
      "glassblowing": "מפעל הזכוכית",
      "alchemist": "מגדל האלכימאי",
      "winegrower": "מפעל היין",
      "stonemason": "מחצבה",
      "carpentering": "בית החרושת לעץ",
      "optician": "משרד המדען",
      "fireworker": "מפעל הזיקוקים",
      "vineyard": "יקב",
      "architect": "משרד הארכיטקטור",
      "buildingGround": "שטח בנייה"
    }
  },
  uk: 
  {
    name:'Ukrayna',
    buildings:
    {
      "townHall": "Ратуша",
      "academy": "Академія",
      "warehouse": "Склад",
      "tavern": "Таверна",
      "palace": "Палац",
      "palaceColony": "Резиденція губернатора",
      "museum": "Музей",
      "port": "Торговий порт",
      "shipyard": "Верф",
      "barracks": "Бараки",
      "wall": "Міська стіна",
      "embassy": "Посольство",
      "branchOffice": "Торговий пост",
      "workshop": "Майстерня",
      "safehouse": "Схованка",
      "forester": "Дім лісничого",
      "glassblowing": "Склодувна майстерня",
      "alchemist": "Вежа алхіміка",
      "winegrower": "Винний завод",
      "stonemason": "Каменяр",
      "carpentering": "Теслярська майстерня",
      "optician": "Оптик",
      "fireworker": "Полігон піротехніка",
      "vineyard": "Винний прес",
      "architect": "Офіс архітектора"
    },
    buildingsShortNames: 
    {
      "townHall": "Ратуша",
      "academy": "Академія",
      "warehouse": "Склад",
      "tavern": "Таверна",
      "palace": "Палац",
      "palaceColony": "Резиденція губернатора",
      "museum": "Музей",
      "port": "Торговий порт",
      "shipyard": "Верф",
      "barracks": "Бараки",
      "wall": "Міська стіна",
      "embassy": "Посольство",
      "branchOffice": "Торговий пост",
      "workshop": "Майстерня",
      "safehouse": "Схованка",
      "forester": "Дім лісничого",
      "glassblowing": "Склодувна майстерня",
      "alchemist": "Вежа алхіміка",
      "winegrower": "Винний завод",
      "stonemason": "Каменяр",
      "carpentering": "Теслярська майстерня",
      "optician": "Оптик",
      "fireworker": "Полігон піротехніка",
      "vineyard": "Винний прес",
      "architect": "Офіс архітектора",
      "buildingGround": "Будівельний простір"
    }
  },
  vn: 
  {
    name:'Tiếng Việt',
    buildings:
    {
      "townHall": "Tòa thị chính",
      "academy": "Học viện",
      "warehouse": "Kho hàng",
      "tavern": "Quán Rượu",
      "palace": "Cung điện",
      "palaceColony": "Phủ thủ hiến",
      "museum": "Viện bảo tàng",
      "port": "Cảng giao dịch",
      "shipyard": "Xưởng đóng tàu",
      "barracks": "Trại lính",
      "wall": "Tường thành",
      "embassy": "Đại sứ quán",
      "branchOffice": "Trạm giao dịch",
      "workshop": "Xưởng",
      "safehouse": "Nơi ẩn náu",
      "forester": "Trạm kiểm lâm",
      "glassblowing": "Thợ thủy tinh",
      "alchemist": "Tháp giả kim thuật",
      "winegrower": "Người trồng nho",
      "stonemason": "Thợ xây đá",
      "carpentering": "Thợ mộc",
      "optician": "Thợ làm kính",
      "fireworker": "Xưởng thử nghiệm thuốc súng",
      "vineyard": "Máy Ép Nho",
      "architect": "Văn phòng kiến trúc sư"
    },
    buildingsShortNames: 
    {
      "townHall": "Tòa thị chính",
      "academy": "Học viện",
      "warehouse": "Kho hàng",
      "tavern": "Quán Rượu",
      "palace": "Cung điện",
      "palaceColony": "Phủ thủ hiến",
      "museum": "Viện bảo tàng",
      "port": "Cảng giao dịch",
      "shipyard": "Xưởng đóng tàu",
      "barracks": "Trại lính",
      "wall": "Tường thành",
      "embassy": "Đại sứ quán",
      "branchOffice": "Trạm giao dịch",
      "workshop": "Xưởng",
      "safehouse": "Nơi ẩn náu",
      "forester": "Trạm kiểm lâm",
      "glassblowing": "Thợ thủy tinh",
      "alchemist": "Tháp giả kim thuật",
      "winegrower": "Người trồng nho",
      "stonemason": "Thợ xây đá",
      "carpentering": "Thợ mộc",
      "optician": "Thợ làm kính",
      "fireworker": "Xưởng thử nghiệm thuốc súng",
      "vineyard": "Máy Ép Nho",
      "architect": "Văn phòng kiến trúc sư",
      "buildingGround": "Mặt bằng xây dựng trống trải"
    }
  },
  da: 
  {
    name:'Dansk (Kilden af Liv)',
    buildings:
    {
      "townHall": "Rådhus",
      "academy": "Akademi",
      "warehouse": "Lagerbygning",
      "tavern": "Værtshus",
      "palace": "Palads",
      "palaceColony": "Guv. Residens",
      "museum": "Museum",
      "port": "Handelshavn",
      "shipyard": "Skibsværft",
      "barracks": "Kasserne",
      "wall": "Bymur",
      "embassy": "Ambassade",
      "branchOffice": "Handelsstation",
      "workshop": "Værksted",
      "safehouse": "Skjulested",
      "forester": "Skovfodede",
      "glassblowing": "Glasblæser",
      "alchemist": "Alkymist",
      "winegrower": "Vinbonde",
      "stonemason": "Stenhugger",
      "carpentering": "Tømrer",
      "optician": "Optiker",
      "fireworker": "Fyrværkerifabrik",
      "vineyard": "Vinpresse",
      "architect": "Arkitekt"
    },
    buildingsShortNames: 
    {
      "townHall": "Rådhus",
      "academy": "Akademi",
      "warehouse": "Lagerbygning",
      "tavern": "Værtshus",
      "palace": "Palads",
      "palaceColony": "Guv. Residens",
      "museum": "Museum",
      "port": "Handelshavn",
      "shipyard": "Skibsværft",
      "barracks": "Kasserne",
      "wall": "Bymur",
      "embassy": "Ambassade",
      "branchOffice": "Handelsstation",
      "workshop": "Værksted",
      "safehouse": "Skjulested",
      "forester": "Skovfodede",
      "glassblowing": "Glasblæser",
      "alchemist": "Alkymist",
      "winegrower": "Vinbonde",
      "stonemason": "Stenhugger",
      "carpentering": "Tømrer",
      "optician": "Optiker",
      "fireworker": "Fyrværkerifabrik",
      "vineyard": "Vinpresse",
      "architect": "Arkitekt",
      "buildingGround": "Byggegrund"
    }
  },
  fr: 
  {
    name:'Français',
    buildings:
    {
      "townHall": "Hôtel de Ville",
      "academy": "Académie",
      "warehouse": "Entrepôt",
      "tavern": "Taverne",
      "palace": "Palais",
      "palaceColony": "Résidence du Gouv.",
      "museum": "Musée",
      "port": "Port",
      "shipyard": "Chantier naval",
      "barracks": "Caserne",
      "wall": "Mur d'enceinte",
      "embassy": "Ambassade",
      "branchOffice": "Comptoir",
      "workshop": "Atelier",
      "safehouse": "Cachette",
      "forester": "Maison forestière",
      "glassblowing": "Verrier",
      "alchemist": "Tour des Alchimistes",
      "winegrower": "Pressoir à Vin",
      "stonemason": "Tailleur de Pierre",
      "carpentering": "Charpentier",
      "optician": "Opticien",
      "fireworker": "Zone des Artificiers",
      "vineyard": "Cave à Vin",
      "architect": "Architecte"
    },
    buildingsShortNames: 
    {
      "townHall": "Hôtel de Ville",
      "academy": "Académie",
      "warehouse": "Entrepôt",
      "tavern": "Taverne",
      "palace": "Palais",
      "palaceColony": "Résidence du Gouv.",
      "museum": "Musée",
      "port": "Port",
      "shipyard": "Chantier naval",
      "barracks": "Caserne",
      "wall": "Mur d'enceinte",
      "embassy": "Ambassade",
      "branchOffice": "Comptoir",
      "workshop": "Atelier",
      "safehouse": "Cachette",
      "forester": "Maison forestière",
      "glassblowing": "Verrier",
      "alchemist": "Tour des Alchimistes",
      "winegrower": "Pressoir à Vin",
      "stonemason": "Tailleur de Pierre",
      "carpentering": "Charpentier",
      "optician": "Opticien",
      "fireworker": "Zone des Artificiers",
      "vineyard": "Cave à Vin",
      "architect": "Architecte",
      "buildingGround": "Terrain Libre"
    }
  },
  nl: 
  {
    name:'Dutch (Nightlion)',
    buildings:
    {
      "townHall": "Stadhuis",
      "academy": "Academie",
      "warehouse": "Warenhuis",
      "tavern": "Taverne",
      "palace": "Paleis",
      "palaceColony": "Gouverneurs Woning",
      "museum": "Museum",
      "port": "Haven",
      "shipyard": "Scheepswerf",
      "barracks": "Barakken",
      "wall": "Stadsmuur",
      "embassy": "Ambassade",
      "branchOffice": "Handelspost",
      "workshop": "Werkplaats",
      "safehouse": "Schuilplaats",
      "forester": "Houthakkers Loge",
      "glassblowing": "Glasblazer",
      "alchemist": "Alchemist",
      "winegrower": "Wijnboer",
      "stonemason": "Steenhouwer",
      "carpentering": "Timmerman",
      "optician": "Opticien",
      "fireworker": "Vuurwerk Opslag",
      "vineyard": "Wijn Pers",
      "architect": "Architectenbureau"
    },
    buildingsShortNames: 
    {
      "townHall": "Stadhuis",
      "academy": "Academie",
      "warehouse": "Warenhuis",
      "tavern": "Taverne",
      "palace": "Paleis",
      "palaceColony": "Gouverneurs Woning",
      "museum": "Museum",
      "port": "Haven",
      "shipyard": "Scheepswerf",
      "barracks": "Barakken",
      "wall": "Stadsmuur",
      "embassy": "Ambassade",
      "branchOffice": "Handelspost",
      "workshop": "Werkplaats",
      "safehouse": "Schuilplaats",
      "forester": "Houthakkers Loge",
      "glassblowing": "Glasblazer",
      "alchemist": "Alchemist",
      "winegrower": "Wijnboer",
      "stonemason": "Steenhouwer",
      "carpentering": "Timmerman",
      "optician": "Opticien",
      "fireworker": "Vuurwerk Opslag",
      "vineyard": "Wijn Pers",
      "architect": "Architectenbureau",
      "buildingGround": "Vrije Bouwgrond"
    }
  },
  hu: 
  {
    name:'Magyar',
    buildings:
    {
      "townHall": "Városháza",
      "academy": "Akadémia",
      "warehouse": "Raktárépület",
      "tavern": "Fogadó",
      "palace": "Palota",
      "palaceColony": "Helytartó Székhelye",
      "museum": "Múzeum",
      "port": "Kereskedelmi kikötő",
      "shipyard": "Hajógyár",
      "barracks": "Barakk",
      "wall": "Városfal",
      "embassy": "Nagykövetség",
      "branchOffice": "Kereskedő poszt",
      "workshop": "Műhely",
      "safehouse": "Rejtekhely",
      "forester": "Erdészház",
      "glassblowing": "Üvegfúró",
      "alchemist": "Alkimista Torony",
      "winegrower": "Bortermelő",
      "stonemason": "Kőműves",
      "carpentering": "Ácsmester",
      "optician": "Optikus",
      "fireworker": "Tűzszerész Teszt Terület",
      "vineyard": "Szőlőprés",
      "architect": "Építész Irodája"
    },
    buildingsShortNames: 
    {
      "townHall": "Városháza",
      "academy": "Akadémia",
      "warehouse": "Raktárépület",
      "tavern": "Fogadó",
      "palace": "Palota",
      "palaceColony": "Helytartó Székhelye",
      "museum": "Múzeum",
      "port": "Kereskedelmi kikötő",
      "shipyard": "Hajógyár",
      "barracks": "Barakk",
      "wall": "Városfal",
      "embassy": "Nagykövetség",
      "branchOffice": "Kereskedő poszt",
      "workshop": "Műhely",
      "safehouse": "Rejtekhely",
      "forester": "Erdészház",
      "glassblowing": "Üvegfúró",
      "alchemist": "Alkimista Torony",
      "winegrower": "Bortermelő",
      "stonemason": "Kőműves",
      "carpentering": "Ácsmester",
      "optician": "Optikus",
      "fireworker": "Tűzszerész Teszt Terület",
      "vineyard": "Szőlőprés",
      "architect": "Építész Irodája",
      "buildingGround": "Épületek"
    }
  },
  sr: 
  {
    name:'Српска',
    buildings:
    {
      "townHall": "Gradska Skupština",
      "academy": "Akademija",
      "warehouse": "Skladište",
      "tavern": "Taverna",
      "palace": "Palata",
      "palaceColony": "Guvernerova Palata",
      "museum": "Muzej",
      "port": "Luka",
      "shipyard": "Brodogradilište",
      "barracks": "Barake",
      "wall": "Gradske Zidine",
      "embassy": "Ambasada",
      "branchOffice": "Market",
      "workshop": "Radionica",
      "safehouse": "Sklonište",
      "forester": "Šumar",
      "glassblowing": "Staklarija",
      "alchemist": "Alhemičar",
      "winegrower": "Vinarija",
      "stonemason": "Zidar",
      "carpentering": "Stolar",
      "optician": "Optičar",
      "fireworker": "Vatromet",
      "vineyard": "Vinski Podrum",
      "architect": "Arhitekta"
    },
    buildingsShortNames: 
    {
      "townHall": "Gradska Skupština",
      "academy": "Akademija",
      "warehouse": "Skladište",
      "tavern": "Taverna",
      "palace": "Palata",
      "palaceColony": "Guvernerova Palata",
      "museum": "Muzej",
      "port": "Luka",
      "shipyard": "Brodogradilište",
      "barracks": "Barake",
      "wall": "Gradske Zidine",
      "embassy": "Ambasada",
      "branchOffice": "Market",
      "workshop": "Radionica",
      "safehouse": "Sklonište",
      "forester": "Šumar",
      "glassblowing": "Staklarija",
      "alchemist": "Alhemičar",
      "winegrower": "Vinarija",
      "stonemason": "Zidar",
      "carpentering": "Stolar",
      "optician": "Optičar",
      "fireworker": "Vatromet",
      "vineyard": "Vinski Podrum",
      "architect": "Arhitekta",
      "buildingGround": "Zemljište"
    }
  },
  pt: 
  {
    name:'Português',
    buildings:
    {
      "townHall": "Câmara Municipal",
      "academy": "Academia",
      "warehouse": "Armazém",
      "tavern": "Taberna",
      "palace": "Palácio",
      "palaceColony": "Residência Gov.",
      "museum": "Museu",
      "port": "Porto",
      "shipyard": "Estaleiro",
      "barracks": "Quartel",
      "wall": "Muralha",
      "embassy": "Embaixada",
      "branchOffice": "Mercado",
      "workshop": "Oficina",
      "safehouse": "Esconderijo",
      "forester": "Lenhador",
      "glassblowing": "Vidraceiro",
      "alchemist": "Alquimista",
      "winegrower": "Vinicultor",
      "stonemason": "Pedreiro",
      "carpentering": "Carpinteiro",
      "optician": "Optometrista",
      "fireworker": "Pirotécnico",
      "vineyard": "Cave de Vinho",
      "architect": "Arquitecto"
    },
    buildingsShortNames: 
    {
      "townHall": "Câmara Municipal",
      "academy": "Academia",
      "warehouse": "Armazém",
      "tavern": "Taberna",
      "palace": "Palácio",
      "palaceColony": "Residência Gov.",
      "museum": "Museu",
      "port": "Porto",
      "shipyard": "Estaleiro",
      "barracks": "Quartel",
      "wall": "Muralha",
      "embassy": "Embaixada",
      "branchOffice": "Mercado",
      "workshop": "Oficina",
      "safehouse": "Esconderijo",
      "forester": "Lenhador",
      "glassblowing": "Vidraceiro",
      "alchemist": "Alquimista",
      "winegrower": "Vinicultor",
      "stonemason": "Pedreiro",
      "carpentering": "Carpinteiro",
      "optician": "Optometrista",
      "fireworker": "Pirotécnico",
      "vineyard": "Cave de Vinho",
      "architect": "Arquitecto",
      "buildingGround": "Zona de Construção"
    }
  },
  ro: 
  {
    name:'Română',
    buildings:
    {
      "townHall": "Primarie",
      "academy": "Academie",
      "warehouse": "Magazie",
      "tavern": "Taverna",
      "palace": "Palat",
      "palaceColony": "Resedinta Guv.",
      "museum": "Muzeu",
      "port": "Port",
      "shipyard": "Santier",
      "barracks": "Cazarma",
      "wall": "Zid",
      "embassy": "Ambasada",
      "branchOffice": "Punct de negot",
      "workshop": "Atelier",
      "safehouse": "Ascunzatoare",
      "forester": "Casa padurarului",
      "glassblowing": "Sticlarie",
      "alchemist": "Alchimist",
      "winegrower": "Vinificator",
      "stonemason": "Cariera",
      "carpentering": "Dulgher",
      "optician": "Optician",
      "fireworker": "Zona pirotehnica",
      "vineyard": "Presa de vin",
      "architect": "Arhitect"
    },
    buildingsShortNames: 
    {
      "townHall": "Primarie",
      "academy": "Academie",
      "warehouse": "Magazie",
      "tavern": "Taverna",
      "palace": "Palat",
      "palaceColony": "Resedinta Guv.",
      "museum": "Muzeu",
      "port": "Port",
      "shipyard": "Santier",
      "barracks": "Cazarma",
      "wall": "Zid",
      "embassy": "Ambasada",
      "branchOffice": "Punct de negot",
      "workshop": "Atelier",
      "safehouse": "Ascunzatoare",
      "forester": "Casa padurarului",
      "glassblowing": "Sticlarie",
      "alchemist": "Alchimist",
      "winegrower": "Vinificator",
      "stonemason": "Cariera",
      "carpentering": "Dulgher",
      "optician": "Optician",
      "fireworker": "Zona pirotehnica",
      "vineyard": "Presa de vin",
      "architect": "Arhitect",
      "buildingGround": "Teren liber"
    }
  },
  it: 
  {
    name:'Italiano',
    buildings:
    {
      "townHall": "Municipio",
      "academy": "Accademia",
      "warehouse": "Magazzino",
      "tavern": "Taverna",
      "palace": "Palazzo",
      "palaceColony": "Residenza Gov.",
      "museum": "Museo",
      "port": "Porto",
      "shipyard": "Cantiere Nav.",
      "barracks": "Caserma",
      "wall": "Mura della Città",
      "embassy": "Ambasciata",
      "branchOffice": "Mercato",
      "workshop": "Officina",
      "safehouse": "Nascondiglio",
      "forester": "Guardia Boschi",
      "glassblowing": "Vetraio",
      "alchemist": "Alchimista",
      "winegrower": "Viticoltore",
      "stonemason": "Tagliapietre",
      "carpentering": "Carpentiere",
      "optician": "Ottico",
      "fireworker": "Zona Pirotecnica",
      "vineyard": "Cantine",
      "architect": "Architetto"
    },
    buildingsShortNames: 
    {
      "townHall": "Municipio",
      "academy": "Accademia",
      "warehouse": "Magazzino",
      "tavern": "Taverna",
      "palace": "Palazzo",
      "palaceColony": "Residenza Gov.",
      "museum": "Museo",
      "port": "Porto",
      "shipyard": "Cantiere Nav.",
      "barracks": "Caserma",
      "wall": "Mura della Città",
      "embassy": "Ambasciata",
      "branchOffice": "Mercato",
      "workshop": "Officina",
      "safehouse": "Nascondiglio",
      "forester": "Guardia Boschi",
      "glassblowing": "Vetraio",
      "alchemist": "Alchimista",
      "winegrower": "Viticoltore",
      "stonemason": "Tagliapietre",
      "carpentering": "Carpentiere",
      "optician": "Ottico",
      "fireworker": "Zona Pirotecnica",
      "vineyard": "Cantine",
      "architect": "Architetto",
      "buildingGround": "Building Ground"
    }
  },
  hr: 
  {
    name:'Hrvatski',
    buildings:
    {
      "townHall": "Gr. vijećnica",
      "academy": "Akademija",
      "warehouse": "Skladište",
      "tavern": "Taverna",
      "palace": "Palača",
      "palaceColony": "Guv. palača",
      "museum": "Muzej",
      "port": "Luka",
      "shipyard": "Brodogradilište",
      "barracks": "Barake",
      "wall": "Gr. bedem",
      "embassy": "Veleposlanstvo",
      "branchOffice": "Market",
      "workshop": "Radionica",
      "safehouse": "Sklonište",
      "forester": "Lug. kuća",
      "glassblowing": "Staklarnica",
      "alchemist": "Alkem. toranj",
      "winegrower": "Vinarija",
      "stonemason": "Klesar",
      "carpentering": "Stolarija",
      "optician": "Optičar",
      "fireworker": "Rad. vatrometa",
      "vineyard": "Vinski podrum",
      "architect": "Arhit. kuća"
    },
    buildingsShortNames: 
    {
      "townHall": "Gr. vijećnica",
      "academy": "Akademija",
      "warehouse": "Skladište",
      "tavern": "Taverna",
      "palace": "Palača",
      "palaceColony": "Guv. palača",
      "museum": "Muzej",
      "port": "Luka",
      "shipyard": "Brodogradilište",
      "barracks": "Barake",
      "wall": "Gr. bedem",
      "embassy": "Veleposlanstvo",
      "branchOffice": "Market",
      "workshop": "Radionica",
      "safehouse": "Sklonište",
      "forester": "Lug. kuća",
      "glassblowing": "Staklarnica",
      "alchemist": "Alkem. toranj",
      "winegrower": "Vinarija",
      "stonemason": "Klesar",
      "carpentering": "Stolarija",
      "optician": "Optičar",
      "fireworker": "Rad. vatrometa",
      "vineyard": "Vinski podrum",
      "architect": "Arhit. kuća",
      "buildingGround": "Građ. zemljište"
    }
  },
  fi: 
  {
    name:'Suomi',
    buildings:
    {
      "townHall": "Kaupungintalo",
      "academy": "Akatemia",
      "warehouse": "Varasto",
      "tavern": "Taverna",
      "palace": "Palatsi",
      "palaceColony": "Kuvernöörin asunto",
      "museum": "Museo",
      "port": "Kauppasatama",
      "shipyard": "Telakka",
      "barracks": "Kasarmi",
      "wall": "Kaupungin muuri",
      "embassy": "Lähetystö",
      "branchOffice": "Kauppapaikka",
      "workshop": "Paja",
      "safehouse": "Piilopaikka",
      "forester": "Metsänhoitajan talo",
      "glassblowing": "Lasinpuhaltaja",
      "alchemist": "Alkemistin torni",
      "winegrower": "Viinitarhuri",
      "stonemason": "Kivenhakkaaja",
      "carpentering": "Puusepän paja",
      "optician": "Optikko",
      "fireworker": "Ilotulite testialue",
      "vineyard": "Viinipaino",
      "architect": "Arkkitehdin toimisto"
    },
    buildingsShortNames: 
    {
      "townHall": "Kaupungintalo",
      "academy": "Akatemia",
      "warehouse": "Varasto",
      "tavern": "Taverna",
      "palace": "Palatsi",
      "palaceColony": "Kuvernöörin asunto",
      "museum": "Museo",
      "port": "Kauppasatama",
      "shipyard": "Telakka",
      "barracks": "Kasarmi",
      "wall": "Kaupungin muuri",
      "embassy": "Lähetystö",
      "branchOffice": "Kauppapaikka",
      "workshop": "Paja",
      "safehouse": "Piilopaikka",
      "forester": "Metsänhoitajan talo",
      "glassblowing": "Lasinpuhaltaja",
      "alchemist": "Alkemistin torni",
      "winegrower": "Viinitarhuri",
      "stonemason": "Kivenhakkaaja",
      "carpentering": "Puusepän paja",
      "optician": "Optikko",
      "fireworker": "Ilotulite testialue",
      "vineyard": "Viinipaino",
      "architect": "Arkkitehdin toimisto",
      "buildingGround": "Tyhjä tontti"
    }
  },
  cz: 
  {
    name:'Česky',
    buildings:
    {
      "townHall": "Městská radnice",
      "academy": "Akademie",
      "warehouse": "Sklad",
      "tavern": "Hostinec",
      "palace": "Palác",
      "palaceColony": "Guvernérova rezidence",
      "museum": "Muzeum",
      "port": "Přístav",
      "shipyard": "Loděnice",
      "barracks": "Kasárna",
      "wall": "Městská zeď",
      "embassy": "Ambasáda",
      "branchOffice": "Tržiště",
      "workshop": "Dílna",
      "safehouse": "Úkryt",
      "forester": "Hájovna",
      "glassblowing": "Sklárna",
      "alchemist": "Alchymista",
      "winegrower": "Vinařství",
      "stonemason": "Kameník",
      "carpentering": "Truhlárna",
      "optician": "Optik",
      "fireworker": "Zkušebna ohňostroje",
      "vineyard": "Vinný sklep",
      "architect": "Pracovna architekta"
    },
    buildingsShortNames: 
    {
      "townHall": "Městská radnice",
      "academy": "Akademie",
      "warehouse": "Sklad",
      "tavern": "Hostinec",
      "palace": "Palác",
      "palaceColony": "Guvernérova rezidence",
      "museum": "Muzeum",
      "port": "Přístav",
      "shipyard": "Loděnice",
      "barracks": "Kasárna",
      "wall": "Městská zeď",
      "embassy": "Ambasáda",
      "branchOffice": "Tržiště",
      "workshop": "Dílna",
      "safehouse": "Úkryt",
      "forester": "Hájovna",
      "glassblowing": "Sklárna",
      "alchemist": "Alchymista",
      "winegrower": "Vinařství",
      "stonemason": "Kameník",
      "carpentering": "Truhlárna",
      "optician": "Optik",
      "fireworker": "Zkušebna ohňostroje",
      "vineyard": "Vinný sklep",
      "architect": "Pracovna architekta",
      "buildingGround": "Stavební plocha"
    }
  },
  lt: 
  {
    name:'Lietuviu',
    buildings:
    {
      "townHall": "Rotušė",
      "academy": "Akademija",
      "warehouse": "Sandėlis",
      "tavern": "Smuklė",
      "palace": "Rūmai",
      "palaceColony": "Gub. Rezidencija",
      "museum": "Muziejus",
      "port": "Prekybos uostas",
      "shipyard": "Laivų statykla",
      "barracks": "Kareivinės",
      "wall": "Miesto Siena",
      "embassy": "Ambasada",
      "branchOffice": "Prekybos Punktas",
      "workshop": "Dirbtuvės",
      "safehouse": "Slėptuvė",
      "forester": "Miškininkas",
      "glassblowing": "Stiklapūtys",
      "alchemist": "Alchemiko Bokštas",
      "winegrower": "Vindarys",
      "stonemason": "Mūrininkas",
      "carpentering": "Dailidė",
      "optician": "Optikas",
      "fireworker": "Pirotechnikas",
      "vineyard": "Vyninė",
      "architect": "Architekto Biuras"
    },
    buildingsShortNames: 
    {
      "townHall": "Rotušė",
      "academy": "Akademija",
      "warehouse": "Sandėlis",
      "tavern": "Smuklė",
      "palace": "Rūmai",
      "palaceColony": "Gub. Rezidencija",
      "museum": "Muziejus",
      "port": "Prekybos uostas",
      "shipyard": "Laivų statykla",
      "barracks": "Kareivinės",
      "wall": "Miesto Siena",
      "embassy": "Ambasada",
      "branchOffice": "Prekybos Punktas",
      "workshop": "Dirbtuvės",
      "safehouse": "Slėptuvė",
      "forester": "Miškininkas",
      "glassblowing": "Stiklapūtys",
      "alchemist": "Alchemiko Bokštas",
      "winegrower": "Vindarys",
      "stonemason": "Mūrininkas",
      "carpentering": "Dailidė",
      "optician": "Optikas",
      "fireworker": "Pirotechnikas",
      "vineyard": "Vyninė",
      "architect": "Architekto Biuras",
      "buildingGround": "Statymo Vieta"
    }
  },
  lv: 
  {
    name:'Latviešu',
    buildings:
    {
      "townHall": "Rātsnams",
      "academy": "Akadēmija",
      "warehouse": "Noliktava",
      "tavern": "Krodziņš",
      "palace": "Pils",
      "palaceColony": "Gub. Rezidence",
      "museum": "Muzejs",
      "port": "Osta",
      "shipyard": "Kuģu būvētava",
      "barracks": "Barakas",
      "wall": "Pilsētas mūris",
      "embassy": "Vēstniecība",
      "branchOffice": "Tirgus",
      "workshop": "Darbnīca",
      "safehouse": "Paslēptuve",
      "forester": "Mežsarga māja",
      "glassblowing": "Stikla pūtējs",
      "alchemist": "Alķīmiķa Tornis",
      "winegrower": "Vīna audzētājs",
      "stonemason": "Akmeņkalis",
      "carpentering": "Namdaris",
      "optician": "Optiķis",
      "fireworker": "Uguņošana",
      "vineyard": "Vīndaris",
      "architect": "Arhitekts"
    },
    buildingsShortNames: 
    {
      "townHall": "Rātsnams",
      "academy": "Akadēmija",
      "warehouse": "Noliktava",
      "tavern": "Krodziņš",
      "palace": "Pils",
      "palaceColony": "Gub. Rezidence",
      "museum": "Muzejs",
      "port": "Osta",
      "shipyard": "Kuģu būvētava",
      "barracks": "Barakas",
      "wall": "Pilsētas mūris",
      "embassy": "Vēstniecība",
      "branchOffice": "Tirgus",
      "workshop": "Darbnīca",
      "safehouse": "Paslēptuve",
      "forester": "Mežsarga māja",
      "glassblowing": "Stikla pūtējs",
      "alchemist": "Alķīmiķa Tornis",
      "winegrower": "Vīna audzētājs",
      "stonemason": "Akmeņkalis",
      "carpentering": "Namdaris",
      "optician": "Optiķis",
      "fireworker": "Uguņošana",
      "vineyard": "Vīndaris",
      "architect": "Arhitekts",
      "buildingGround": "Būves vieta"
    }
  },
  bg: 
  {
    name:'Български',
    buildings:
    {
      "townHall": "Кметство",
      "academy": "Академия",
      "warehouse": "Склад",
      "tavern": "Кръчма",
      "palace": "Дворец",
      "palaceColony": "Резиденция",
      "museum": "Музей",
      "port": "Пристанище",
      "shipyard": "Корабостроителница",
      "barracks": "Казарма",
      "wall": "Градска стена",
      "embassy": "Посолство",
      "branchOffice": "Търговска кантора",
      "workshop": "Работилница",
      "safehouse": "Скривалище",
      "forester": "Горска къща",
      "glassblowing": "Стъклодув",
      "alchemist": "Алхимик",
      "winegrower": "Винар",
      "stonemason": "Каменоделна",
      "carpentering": "Дърводелец",
      "optician": "Оптика",
      "fireworker": "Фойерверки",
      "vineyard": "Винена преса",
      "architect": "Архитект"
    },
    buildingsShortNames: 
    {
      "townHall": "Кметство",
      "academy": "Академия",
      "warehouse": "Склад",
      "tavern": "Кръчма",
      "palace": "Дворец",
      "palaceColony": "Резиденция",
      "museum": "Музей",
      "port": "Пристанище",
      "shipyard": "Корабостроителница",
      "barracks": "Казарма",
      "wall": "Градска стена",
      "embassy": "Посолство",
      "branchOffice": "Търговска кантора",
      "workshop": "Работилница",
      "safehouse": "Скривалище",
      "forester": "Горска къща",
      "glassblowing": "Стъклодув",
      "alchemist": "Алхимик",
      "winegrower": "Винар",
      "stonemason": "Каменоделна",
      "carpentering": "Дърводелец",
      "optician": "Оптика",
      "fireworker": "Фойерверки",
      "vineyard": "Винена преса",
      "architect": "Архитект",
      "buildingGround": "Строителна площадка"
    }
  }
}
