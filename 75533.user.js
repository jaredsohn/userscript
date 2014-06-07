// ==UserScript==
//
// @name        Grepolis Empire Board EC
// @namespace   empire-board.grepolis
// @author      Inselk0enig
// @description Display population, resources, trading, transports, incomes, buildings, and army or fleet units overviews for each cities.
// @include     http://*.grepolis.*/game/*
// @exclude     http://support.grepolis.*/*
//
// @version     0.0.1
//
// @history		0.0.1 Dev Version - Still growing
//
// ==/UserScript==

/*******************************************************************************
 * 
 * LAST CHANGES:
 * 
 * Version 0.0.1: - Still growing
 * 
 * PREVIOUS CHANGES: http://userscripts.org/topics/75533
 * 
 * Based on "Ikariam Empire Board" script
 * http://userscripts.org/scripts/show/41051
 * 
 ******************************************************************************/

// Old global vars
var config;
var TABLE_RESOURCES; // overview table for resources
var TABLE_BUILDINGS; // overview table for buildings
var TABLE_ARMYFLEET; // overview table for army and fleet
var PROGRESS_BAR_MODE; // have to be a global variable
var language;
var langtype;
var texts;

var LocalizationStrings = {};
LocalizationStrings['timeunits'] = {};
LocalizationStrings['timeunits']['short'] = {};
LocalizationStrings['timeunits']['short']['day'] = 'T';
LocalizationStrings['timeunits']['short']['hour'] = 'h';
LocalizationStrings['timeunits']['short']['minute'] = 'm';
LocalizationStrings['timeunits']['short']['second'] = 's';
LocalizationStrings['language']                     = 'de';
LocalizationStrings['decimalPoint']               = ',';
LocalizationStrings['thousandSeperator']     = '.';


// Access to window object cross-browser
var uW;
if (typeof unsafeWindow==='object')
{uW=unsafeWindow;}
else
{uW=window;}

// Access jQuery
var $=uW.jQuery;

// Script Data
var gt_version='0.0.1';

// Basic game data
var Game = uW.Game;
var town=uW.Game.townId;
var ally=uW.Game.alliance_id;
var servertime=uW.Game.server_time;

var player=uW.Layout.player_id;
var storage_volume=uW.Layout.storage_volume;
var max_favor=uW.Layout.max_favor;
var res=[];
res['wood']=uW.Layout.resources['wood'];
res['stone']=uW.Layout.resources['stone'];
res['iron']=uW.Layout.resources['iron'];
res['wood-i']=uW.Layout.production['wood'];
res['stone-i']=uW.Layout.production['stone'];
res['iron-i']=uW.Layout.production['iron'];
res['fav']=uW.Layout.favor;
res['fav-i']=uW.Layout.favor_production;

// New unique object
if (!EmpireBoard) var EmpireBoard = {};

EmpireBoard =
{
    /* Requires modules */
    Log:       {},
    DOM:       {},
    Str:       {},
    Grepolis:    {},
    DB:        {},
    Renders:     {},
    Tooltip:     {},
    Handlers:    {},
    Updater:     {},

    StartTime:     0,
    EndTime:     0,
    LogEnabled:    false,
    MainID:      'EmpireBoard',

    /* Script metas */
    ScriptName:    'Grepolis Empire Board',
    Version:     "0.0.1",
    HomePage:    '',
    ScriptURL:     '',
    UserScriptsID:   75533
};


EmpireBoard.Init = function()
{
  this.StartTime = new Date().getTime();
  this.HomePage    = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
  this.ScriptURL     = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';

  /* Init Log */
  this.Log.Init(this);
  this.Log._Enabled = this.LogEnabled;
  this.Log.Add('Start...');

  this.DOM.Init(this);
  this.Str.Init(this);
  this.Str._decimalPoint = LocalizationStrings['decimalPoint'];
  this.Str._thousandSeparator = LocalizationStrings['thousandSeperator'];

  this.Grepolis.Init(this);
  this.Grepolis.SetGame(uW.Game);
  this.Grepolis.SetGameData(uW.GameData);
  this.DB.Init(this);
  this.DB.Load_Options();
  this.Renders.Init(this);
  this.Tooltip.Init(this, this.MainID+'Tooltip', this.MainID);
  this.Handlers.Init(this);
  // this.Updater.Init(this);

  // catch the resource updates
  this.grepolisUpdateBar = uW.Layout.updateBar;
  uW.Layout.updateBar = function (bar) { EmpireBoard.grepolisUpdateBar(bar); EmpireBoard.realtimeSyncResources(); };

  // Always create main div for add-ons which need to check version
  this.Log.Add('Create main div...');
  var body = EmpireBoard.DOM.Get_First_Node("//body");
  var span = document.createElement('div');
  span.id = "EmpireBoard";
  span.setAttribute("version", this.Version);
  body.appendChild(span);

  this.Log.Add('DB.Load...');
  this.DB.Load();
  this.Grepolis.Fetch_CitiesSelect(this.DB.OwnCities);

  if ((config.buildings == undefined || config.buildings.main == undefined) && uW.GameData.buildings != undefined && uW.GameData.buildings.main != undefined)
  {
    config['buildings'] = uW.GameData.buildings;
  }
  if ((config.units == undefined || config.units.archer == undefined) && uW.GameData.units != undefined && uW.GameData.units.archer != undefined)
  {
    config['units'] = uW.GameData.units;
  }
  this.Log.Add('DB.Save...');
  this.DB.Save();

  setLanguage();
  getLocalizedTexts();
  
  $(window).load(function () {
    EmpireBoard.Log.Add('OnLoad...');
    // $('.unit_name').mousePopup(new MousePopup('Abschalten'));
  });


};

EmpireBoard.CheckScriptUpdate = function()
{
  if ((this.DB.Options['LastCheckUpdate'] == undefined) || (this.DB.Options['LastCheckUpdate'] < this.StartTime - (1000 * 60 * 60 * 24)))
  {
    var self = this;
    var ScriptURL = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.meta.js?since='+this.StartTime;
    this.Updater.Check(ScriptURL, function(availableVersion) { self._CompareScriptUpdate(availableVersion); });
  }
  else
  {
    this.Log.Add('Not need check update today');
  }
};

EmpireBoard._CompareScriptUpdate = function(availableVersion)
{
  this.Log.Add('Available version: '+availableVersion);
  if (availableVersion != 0)
  {
    availableVersion = parseInt(availableVersion);

    if ((availableVersion > this.Version) && ((this.DB.Options['AvailableVersion'] == undefined) || (availableVersion > this.DB.Options['AvailableVersion'])))
    {
      if (confirm("Do you want to install \""+this.ScriptName+"\" v. "+availableVersion+" ?"))
      {
        GM_openInTab(this.ScriptURL+'?version='+availableVersion+'.user.js');
      }
    }

    this.DB.Options['AvailableVersion'] = availableVersion;
    this.DB.Options['LastCheckUpdate'] = this.StartTime;
    this.DB.Save_Options();
  }
};


EmpireBoard.ViewIsBuildingTemple = function()
{
  function reportTemple()
  {
    setViewRqTime('finances');
    EmpireBoard.DB.Save();
  }

  var n = document.getElementById("inputWorkersSubmit");
  n.addEventListener("click", reportTemple, false);
};


EmpireBoard.ViewIsPremium = function()
{
  config["premium"] = {};

  var TRs = this.DOM.Get_Nodes("//div[@id='premiumOffers']//table[contains(@class, 'TableHoriMax')]//tr");
  this.Log.Add("premiumOffers rows: "+TRs.snapshotLength);

  var savecapacityBonus = TRs.snapshotItem(20).getElementsByTagName("td")[0];
  if (this.DOM.Has_ClassName(savecapacityBonus,'active') == true)
  {
    var remainingTime = 0;
    var remainingText = savecapacityBonus.textContent;
    var regExp = new RegExp("([0-9])\\s+([a-z])", "ig");
    var RegExpRes = regExp.exec(remainingText);
    if (RegExpRes != null)
    {
      var timeValue = parseInt(RegExpRes[1]);
      var timeUnit = RegExpRes[2].toLowerCase();

      if (timeUnit == LocalizationStrings['timeunits']['short']['day'])
      {
        remainingTime = timeValue*24*60*60*1000;
      }
      else if (timeUnit == LocalizationStrings['timeunits']['short']['hour'])
      {
        remainingTime = timeValue*60*60*1000;
      }
      else if (timeUnit == LocalizationStrings['timeunits']['short']['minute'])
      {
        remainingTime = timeValue*60*1000;
      }
      else if (timeUnit == LocalizationStrings['timeunits']['short']['second'])
      {
        remainingTime = timeValue*1000;
      }
      else
      {
        remainingTime = 24*60*60*1000;
      }
    }
    else
    {
      remainingTime = 24*60*60*1000;
    }

    this.Log.Add("savecapacityBonus: remainingTime="+remainingTime+", timeValue="+timeValue+", timeUnit="+timeUnit);
    config["premium"].savecapacityBonus = this.StartTime + remainingTime;
  }
};

EmpireBoard.ViewIsMilitaryMovements = function()
{
  config["movements"] = {};
  function addMovement(townID, movementID, FleetMovement)
  {
    if (config["movements"][townID] == undefined) config["movements"][townID] = {};
    if (config["movements"][townID][movementID] == undefined) config["movements"][townID][movementID] = {};

    config["movements"][townID][movementID] = FleetMovement;
    config["movements"][townID][movementID].endTime = FleetMovement.time;
  }

  config["attacks"] = {};
  function addAttacks(townID, movementID, FleetMovement)
  {
    if (config["attacks"][townID] == undefined) config["attacks"][townID] = {};
    if (config["attacks"][townID][movementID] == undefined) config["attacks"][townID][movementID] = {};

    config["attacks"][townID][movementID] = FleetMovement;
    config["attacks"][townID][movementID].endTime = FleetMovement.time;
  }

  this.Grepolis.Fetch_FleetMovements(this.DB.FleetMovements);

  var resMi = this.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
  if (resMi.snapshotLength > 0)
  {
    for (var i=0; i < resMi.snapshotLength; i++)
    {
      var tr = resMi.snapshotItem(i).parentNode.parentNode;
      var tds = tr.getElementsByTagName("td");

      var fleetId = tds[1].id;

      if ((fleetId != '') && (this.DB.FleetMovements[fleetId] != undefined))
      {
        var FleetMovement = this.DB.FleetMovements[fleetId];
        var toOwn = false;
        if ((this.DB.OwnCities[FleetMovement.tCityId] != undefined) && (FleetMovement.tCityId != FleetMovement.oCityId) && (this.DB.OwnCities[FleetMovement.tCityId].own == true))
        {
          toOwn = true;
        }

        // Values: deployarmy, deployfleet, plunder, blockade, defend,
        // defend_port, trade, transport, occupy
        if (FleetMovement.hostile == true)
        {
          addAttacks(FleetMovement.tCityId, fleetId, FleetMovement);
        }
        else if (FleetMovement.own == true)
        {
          if (FleetMovement.mission == 'trade')
          {
            // Not military movement
          }
          else if (FleetMovement.mission == 'transport')
          {
            // Not military movement
            if ((FleetMovement.hasAction == true) && (FleetMovement.hasGoods == true) && (FleetMovement.toLeft == false) && (FleetMovement.toRight == false) && (toOwn == true))
            {
              setViewRqTime('merchantNavy',0,FleetMovement.time);
            }
          }
          else if (FleetMovement.mission == 'deployarmy')
          {
            addMovement(FleetMovement.oCityId, fleetId, FleetMovement);

            if ((FleetMovement.toRight == true) && (toOwn == true))
            {
              this.Log.Add("Army "+fleetId+" will arrive to town["+FleetMovement.tCityId+"]");
              setViewRqTime('townMilitary-army', FleetMovement.tCityId, FleetMovement.time);
            }
            else if (FleetMovement.toLeft == true)
            {
              this.Log.Add("Army "+fleetId+" come back to town["+FleetMovement.oCityId+"]");
              setViewRqTime('townMilitary-army', FleetMovement.oCityId, FleetMovement.time);
            }
          }
          else if (FleetMovement.mission == 'deployfleet')
          {
            addMovement(FleetMovement.oCityId, fleetId, FleetMovement);

            if ((FleetMovement.toRight == true) && (toOwn == true))
            {
              this.Log.Add("Fleet "+fleetId+" will arrive to town["+FleetMovement.tCityId+"]");
              setViewRqTime('townMilitary-fleet', FleetMovement.tCityId, FleetMovement.time);
            }
            else if (FleetMovement.toLeft == true)
            {
              this.Log.Add("Fleet "+fleetId+" come back to town["+FleetMovement.oCityId+"]");
              setViewRqTime('townMilitary-fleet', FleetMovement.oCityId, FleetMovement.time);
            }
          }
          else if (FleetMovement.mission == 'plunder')
          {
            addMovement(FleetMovement.oCityId, fleetId, FleetMovement);

            if ((FleetMovement.hasGoods == true) && (FleetMovement.toLeft == false) && (FleetMovement.toRight == false))
            {
              setViewRqTime('merchantNavy',0,FleetMovement.time);
            }
          }
          else if (FleetMovement.mission == 'blockade')
          {
            addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
          }
          else
          {
            addMovement(FleetMovement.oCityId, fleetId, FleetMovement);
          }
        }
        else
        {
          if (FleetMovement.mission == 'trade')
          {
            if ((toOwn == true) && (FleetMovement.toRight == true))
            {
              this.Log.Add("Foreign transport "+fleetId+" arrive to town["+FleetMovement.tCityId+"]");
              setViewRqTime('branchOffice', FleetMovement.tCityId, FleetMovement.time);
            }
          }
          else if (FleetMovement.mission == 'transport')
          {
            if ((toOwn == true) && (FleetMovement.toRight == true))
            {
              this.Log.Add("Foreign transport "+fleetId+" arrive to town["+FleetMovement.tCityId+"]");
              setViewRqTime('', FleetMovement.tCityId, FleetMovement.time);
            }
          }
        }
      }
    }
  }

  config.mAMMtime = this.StartTime;
};

EmpireBoard.ViewIsIndexMovements = function()
{
  config["movements"] = {};
  function addMovement(townID, movementID, FleetMovement)
  {
    if (config["movements"][townID] == undefined) config["movements"][townID] = {};
    if (config["movements"][townID][movementID] == undefined) config["movements"][townID][movementID] = {};

    config["movements"][townID][movementID] = FleetMovement;
    config["movements"][townID][movementID].endTime = FleetMovement.time;
  }

  config["attacks"] = {};
  function addAttacks(townID, movementID, FleetMovement)
  {
    if (config["attacks"][townID] == undefined) config["attacks"][townID] = {};
    if (config["attacks"][townID][movementID] == undefined) config["attacks"][townID][movementID] = {};

    config["attacks"][townID][movementID] = FleetMovement;
    config["attacks"][townID][movementID].endTime = FleetMovement.time;
  }

  this.Grepolis.Fetch_FleetMovements(this.DB.FleetMovements);

  EmpireBoard.Log.Add("MOV");
  uW.UnitOverview.unit_movements.each(function(index)
      {
    if ($(this).type == "attack_sea" || $(this).type == "attack_land")
      addAttacks(Game.townId, $(this).id, $(this))
      }
  );
  config.mAMMtime = this.StartTime;
};


EmpireBoard.ViewIsBuildingWorkshop = function()
{
  // Search getCountdown()
  var scripts = document.getElementsByTagName("script");
  var found = false;
  var sCode = '';
  for (var j = 0; j < scripts.length; j++)
  {
    // search upgradeCountDown
    var nScript = scripts[j];
    sCode = nScript.innerHTML;
    if (sCode.indexOf('upgradeCountdown') >= 0)
    {
      found = true;
      break;
    }
  }
  if (found == true)
  {
    // buildings under upgrading
    var enddate = 0;
    var currentdate = 0;
    if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null)
    {
      enddate = parseFloat(RegExp.$1) * 1000;
    }
    if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null)
    {
      currentdate = parseFloat(RegExp.$1) * 1000;
    }
    if (enddate != 0 && currentdate != 0)
    {
      setViewRqTime('workshop', town_idmainView, this.StartTime + (enddate - currentdate), true);
      this.Log.Add('Workshop upgrade remaining time: '+enddate+' - '+currentdate+' = '+(enddate-currentdate)/1000+'s');
    }
  }
};

EmpireBoard.DB =
{
    _Parent:       null,
    Prefix:        '',
    OwnCities:       {},
    FleetMovements:    {},
    Options:       {}
};

EmpireBoard.DB.Init = function(parent, host)
{
  this._Parent = parent;
  if (host == undefined) host = this._Parent.Grepolis.Host();

  var prefix = host;
  prefix = prefix.replace('.grepolis.', '-');
  prefix = prefix.replace('.', '-');
  this.Prefix = prefix;
};

EmpireBoard.DB.Serialize = function(data)
{
  return uneval(data);
};

EmpireBoard.DB.UnSerialize = function(data)
{
  return eval(data);
};

function getVar(varname, vardefault) {
  var res = GM_getValue(EmpireBoard.Grepolis.Host()+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function setVar(varname, varvalue) {
  GM_setValue(EmpireBoard.Grepolis.Host()+varname, varvalue);
}

EmpireBoard.DB.Load = function()
{
  this.OwnCities = this.UnSerialize(getVar("owncities", ""));
  if (this.OwnCities == null || this.OwnCities == undefined || this.OwnCities == "")
  {
    this.OwnCities = new Object();
  }

  config = this.UnSerialize(getVar("config", ""));
  if (config == null || config == undefined || config == "" || ("".config == "NaN"))
  {
    config = new Object();
  }

  // Check if main arrays exists
  if (config.cfg == undefined) { config.cfg = new Object(); }
  if (config["upkeeps"] == undefined) { config["upkeeps"] = {}; }
  if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = {};
  if (config["movements"] == undefined) config["movements"] = {};
  if (config["attacks"] == undefined) config["attacks"] = {};
  if (config["transports"] == undefined) config["transports"] = {};
  if (config["research"] == undefined) config["research"] = {};
  if (config["buildings"] == undefined) config["buildings"] = {};
};

EmpireBoard.DB.Save = function()
{
  setVar("config", this.Serialize(config));
  setVar("owncities", this.Serialize(this.OwnCities));
};

EmpireBoard.DB.Load_Options = function()
{
  // Not used yet
  this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};

  if (this.Options.Prefs == undefined)           this.Options.Prefs = {};
  if (this.Options.Prefs.TABLE_RESOURCES == undefined)   this.Options.Prefs.TABLE_RESOURCES = true;
  if (this.Options.Prefs.TABLE_BUILDINGS == undefined)   this.Options.Prefs.TABLE_BUILDINGS = true;
  if (this.Options.Prefs.TABLE_ARMYFLEET == undefined)   this.Options.Prefs.TABLE_ARMYFLEET = true;
  if (this.Options.Prefs.PROGRESS_BAR_MODE == undefined)   this.Options.Prefs.PROGRESS_BAR_MODE = "time";
  if (this.Options.Prefs.LANGUAGE == undefined)      this.Options.Prefs.LANGUAGE = "";
};

EmpireBoard.DB.Save_Options = function()
{
  GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
};

function getCfgValue(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
};
function getCfgValueNonEmpty(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
};

EmpireBoard.Renders =
{
    _Parent:       null
};

EmpireBoard.Renders.Init = function(parent)
{
  this._Parent = parent;
};

EmpireBoard.Renders.Set_Common_Styles = function()
{
  var default_style = <><![CDATA[
#EmpireBoard {
  width: 990px;
margin: 50px auto 20px;
}

#EmpireBoard div.Table {
  margin-bottom: 2px;
}

#EmpireBoard table.Overview {
  width: 100% !important;
margin-bottom: 2px;
background-color: #FDF7DD;
text-align: center;
border-collapse: collapse;
border: 3px double #CB9B6A;

-moz-box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50); 
-webkit-box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50);
box-shadow: 3px 3px 7px rgba(93, 72, 41,0.50);
}

#EmpireBoard table.Overview thead {
  background: #F8E7B3 url(skin/input/button.gif) repeat-x scroll 0 bottom;
}

#EmpireBoard table.Overview tfoot { 
  background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;
border-top: 2px solid #CB9B6A;
}

#EmpireBoard table.Overview tbody tr {
  border-top: 1px solid #ECCF8E;
}

#EmpireBoard table.Overview tfoot tr { 
  border-top: 1px solid #CB9B6A;
}

#EmpireBoard table.Overview tr.odd {
  background-color: #FDF1D4;
}

#EmpireBoard table.Overview tr.current {
  background-color: #FAE3B8;
}

#EmpireBoard table.Overview th,
#EmpireBoard table.Overview td {
  border-left: 1px solid #ECCF8E;
}

#EmpireBoard.RtoL table.Overview th,
#EmpireBoard.RtoL table.Overview td {
  border-left: inherit;
border-right: 1px solid #ECCF8E;
}

#EmpireBoard table.Overview th {
  height: 22px;
width: auto;
padding: 1px;
padding-bottom: 2px;
padding-left: 3px;
text-align: center !important;
color: #542C0F; 
font-weight: bold;
text-shadow:0 1px #FFFFFF;
}

#EmpireBoard table.Overview td {
  height: auto;
line-height: 12px;
font-size: 11px;
min-width: 10px;
padding: 1px;
vertical-align: top;
text-align: right;
color: #542C0F;
}

#EmpireBoard table.Overview th.lf,
#EmpireBoard table.Overview td.lf {
  border-left: 2px solid #CB9B6A;
}
#EmpireBoard.RtoL table.Overview th.lf,
#EmpireBoard.RtoL table.Overview td.lf {
  border-left: inherit;
border-right: 2px solid #CB9B6A;
}

#EmpireBoard table.Overview th.nolf,
#EmpireBoard table.Overview td.nolf {
  border-left: none;
}
#EmpireBoard.RtoL table.Overview th.nolf,
#EmpireBoard.RtoL table.Overview td.nolf {
  border-left: inherit;
border-right: none;
}

#EmpireBoard table.Overview th.city_name,
#EmpireBoard table.Overview td.city_name {
  overflow: hidden;
}

#EmpireBoard table.Overview th.actions,
#EmpireBoard table.Overview td.actions,
#EmpireBoard table.Overview th.lfdash,
#EmpireBoard table.Overview td.lfdash {
  border-left: 1px dashed #ECCF8E;
}
#EmpireBoard.RtoL table.Overview th.actions,
#EmpireBoard.RtoL table.Overview td.actions,
#EmpireBoard.RtoL table.Overview th.lfdash,
#EmpireBoard.RtoL table.Overview td.lfdash {
  border-left: inherit;
border-right: 1px dashed #ECCF8E;
}

#EmpireBoard table.Overview th.city_name {
  width: 95px !important;
max-width: 95px;
}
#EmpireBoard.RtoL table.Overview th.city_name {}

#EmpireBoard table.Overview th.actions {
  width: 62px;
max-width: 62px;
padding-left: 2px;
padding-bottom: 3px;
text-align: right !important;
vertical-align: bottom;
}

#EmpireBoard table.Buildings th.build_name0,
#EmpireBoard table.Buildings th.build_name1,
#EmpireBoard table.Buildings th.build_name2,
#EmpireBoard table.Buildings th.build_name3,
#EmpireBoard table.Buildings th.build_name4,
#EmpireBoard table.Buildings th.build_name5,
#EmpireBoard table.Buildings th.build_name6,
#EmpireBoard table.Buildings th.build_name7,
#EmpireBoard table.Buildings th.build_name8,
#EmpireBoard table.Buildings th.build_name9,
#EmpireBoard table.Buildings th.build_name10,
#EmpireBoard table.Buildings th.build_name11,
#EmpireBoard table.Buildings th.build_name12 { max-width: 25px; overflow: hidden; cursor: default;}
#EmpireBoard table.Buildings th.build_name2 { max-width: 45px;}
#EmpireBoard table.Buildings th.build_name3 { max-width: 65px;}
#EmpireBoard table.Buildings th.build_name4 { max-width: 80px;}
#EmpireBoard table.Buildings th.build_name5 { max-width: 95px;}
#EmpireBoard table.Buildings th.build_name6 { max-width: 105px;}
#EmpireBoard table.Buildings th.build_name7 { max-width: 115px;}
#EmpireBoard table.Buildings th.build_name8 { max-width: 125px;}
#EmpireBoard table.Buildings th.build_name9 { max-width: 135px;}
#EmpireBoard table.Buildings th.build_name10 { max-width: 140px;}
#EmpireBoard table.Buildings th.build_name11 { max-width: 145px;}
#EmpireBoard table.Buildings th.build_name12 { max-width: 150px;}

#EmpireBoard table.Army th.unit_name { min-width: 25px; max-width: 35px; overflow: hidden; cursor: default;}

#EmpireBoard table.Army th.upkeep { min-width: 20px; overflow: hidden; cursor: default; }

#EmpireBoard table.Overview tfoot td { 
  font-weight: bold;
}

#EmpireBoard table.Buildings td {vertical-align: middle;}

#EmpireBoard table.Overview td.city_name {
  width: 110px;
max-width: 110px;
padding-left: 3px;
text-align: left;
}

#EmpireBoard.RtoL table.Overview td.city_name { text-align: right; }

#EmpireBoard table.Overview td.actions {  text-align: right; }
#EmpireBoard.RtoL table.Overview td.actions { }

#EmpireBoard table.Overview th.actions img,
#EmpireBoard table.Overview td.actions img { margin-left: 1px; border: none; max-height: 15px;}
#EmpireBoard table.Overview td.actions img.Action { height: 12px; margin-bottom: 1px; }

#EmpireBoard.RtoL table.Overview td.sigma {
  text-align: left;
}

#EmpireBoard table.Overview .More {
  font-size: 10px;
line-height: 10px !important;
height: 10px !important;
margin-top:-1px;
clear: both;
display: block;
cursor: default;
}
#EmpireBoard table.Resources .More { margin-top: 0px;}
#EmpireBoard table.Overview tbody .More { color: #CB9B6A;}

#EmpireBoard table.Buildings td.current {
}
#EmpireBoard table.Buildings td.current a {
  color: #542C0F;
}

/** **************** progress bar styles ****************** */
#EmpireBoard table.Overview table.myPercent {
  height: 4px !important;
width: 92%;
margin-top: 1px;
margin-left: 3px;
margin-right: 2px;
background-color: !transparent !important;
}
#EmpireBoard table.Overview table.myPercent td {
  height: 4px !important;
min-width: 0px !important;
padding: 0px !important;
background-color: #CB9B6A;
border: 1px solid #FDF7DD;
}
#EmpireBoard table.Overview table.myPercent td.Normal { background-color: #73443E;}
#EmpireBoard table.Overview table.myPercent td.Warning { background-color: #8F1D1A;}
#EmpireBoard table.Overview table.myPercent td.AlmostFull { background-color: #B42521;}
#EmpireBoard table.Overview table.myPercent td.Full { background-color: #ff0000;}
/** **************** alerts ****************** */
#EmpireBoard sup {
  vertical-align: top !important;
font-size: 10px;
line-height: 10px;
height: 10px;
}
#EmpireBoard .Bold,
#EmpireBoard .Brown,
#EmpireBoard .DarkRed,
#EmpireBoard .Red {font-weight: bold;}
#EmpireBoard .Green {  color: green !important;}
#EmpireBoard .Brown {  color: #8F1D1A !important;}
#EmpireBoard .DarkRed {  color: #CC3300 !important;}
#EmpireBoard .Red {  color: red !important;}
#EmpireBoard img.Safe { height: 11px; }
#EmpireBoard table.Overview td img.Safe {float: left; margin-left: 1px; margin-right: 1px;}

/** **************** footer ****************** */

#EmpireBoard p {text-align: left; display: block;  }
#EmpireBoard.RtoL p {text-align: right;}
#EmpireBoard p.Caption { font-size: 9px; margin: 0 2px; color: #FDF7DD;}

#EmpireBoardSettings {}
#EmpireBoardSettings td {border: none !important;}
#EmpireBoardSettings input.button {margin-right: 5px;}

#EmpireBoard #EmpireBoardAddons { float: left; text-align: left;}
#EmpireBoard.RtoL #EmpireBoardAddons { text-align: right;}
#EmpireBoardAddons u { font-weight: bold; }
#EmpireBoardAddons li { list-style-type: disc; list-style-position: inside; padding-left: 15px; }

#EmpireBoard p.Footer {text-align: right; clear: both;}
#EmpireBoard.RtoL p.Footer {text-align: left;}
#EmpireBoard p.Footer .button {}

/** **************** tooltip ****************** */
#EmpireBoardTooltip {
  position:absolute;
z-index: 2000;
}
#WzTtDiV,
#EmpireBoardTooltip {
  -moz-box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
-webkit-box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
box-shadow: 2px 3px 3px rgba(0,0,0,0.3); 
}

.TTContent {
  padding: 3px;
color: #542C0F;
background-color: #FDF7DD;
border: 1px solid #BE8D53;
border-top-width: 4px;
}
.TTTitle { font-weight: bold; background-color: #FAE0AE;padding: 3px; margin: -3px; margin-bottom:4px;}
.RtoL .TTTitle { text-align: right; }

.TTContent table tbody {background-color: #FAEAC6; border-bottom-width: 3px; border-bottom-color: #FDF7DD;border-bottom-style: solid;}
.TTContent table tfoot {background-color: #FAE0AE;}
.TTContent table td {padding: 2px; height: auto !important;}
.TTContent table .Small td {
  padding-top: 0px;
font-size: 10px !important;
line-height: 10px !important;
}
.TTContent table td.Mission img { max-height: 15px;}
]]></>.toXMLString();

GM_addStyle(default_style);
};


function createLinkToFinanceNavyViews() {
  var rHTML = '';

  rHTML += '<a href="?view=merchantNavy" title="View merchant navy"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/img/town/building_port.gif" /></a>';
  if (reportViewToSurvey('merchantNavy') == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  rHTML += '<a href="?view=finances" title="View finances"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/img/town/building_townhall.gif" /></a>';
  if (reportViewToSurvey('finances') == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToAgora(town_id)
{
  var rHTML = '';

  var res = getCity(town_id);

  rHTML += '<a href="'+ getBuildingLink(town_id, "place", 'culture')+ '" title="View town agora culture"><img hspace="3" height="12" src="http://static.grepolis.com/images/game/toolbar/place.png" align="absmiddle" /></a>';
  return rHTML;
}

function createLinkToCityView(town_id) {
  var rHTML = '';

  rHTML += '<a href="/game/index?town_id='+town_id+'" class="changeCity" townid="'+town_id+'" title="View town"><img align="absmiddle" src="http://static.grepolis.com/images/game/toolbar/main.png" /></a>';
  if (reportViewToSurvey('index', town_id) == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToBuilding(town_id, building) {
  var rHTML = '';
  rHTML += '<a href="/game/building_'+building+'?town_id='+town_id+'&action=index" class="changeCity" townid="'+town_id+'" title="View building"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/layout/icon-town2.gif" /></a>';
  if (reportViewToSurvey('building_'+building, town_id) == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToBuildingMain(town_id) {
  var rHTML = '';
  rHTML += '<a href="/game/building_main?town_id='+town_id+'&action=index" class="changeCity" townid="'+town_id+'" title="View building"><img align="absmiddle" src="http://static.grepolis.com/images/game/toolbar/main.png" /></a>';
  if (reportViewToSurvey('building_main', town_id) == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToFleetView(town_id) {
  var rHTML = '';

  rHTML += '<a href="/game/building_docks?town_id='+town_id+'&action=index" class="changeCity" townid="'+town_id+'" title="View fleet overview"><img align="absmiddle" src="http://static.grepolis.com/images/game/toolbar/docks.png" /></a>';
  if (reportViewToSurvey('building_docks', town_id) == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToArmyView(town_id) {
  var rHTML = '';

  rHTML += '<a href="/game/building_barracks?town_id='+town_id+'&action=index" class="changeCity" townid="'+town_id+'" title="View army overview"><img align="absmiddle" src="http://static.grepolis.com/images/game/toolbar/barracks.png" /></a>';
  if (reportViewToSurvey('building_barracks', town_id) == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToDeployArmy(town_id)
{
  var res = getCity(town_id);
  var rHTML = '';

  if (current_town_id == town_id)
  {
    rHTML += '<img class="Action" src="http://s2.de.ikariam.com/skin/actions/move_army_disabled.gif" align="absmiddle" />';
  }
  else
  {
    rHTML += '<a view=deployment deploymenttype=army href="#" title="Deploy troops" onclick="TownInfo.init(\''+town_id+'\',\'town_info\',false,\'#content\');"><img class="Action" src="http://s2.de.ikariam.com/skin/actions/move_army.gif" align="absmiddle" /></a>';
  }

  return rHTML;
}

function createLinkToDeployFleet(town_id)
{
  var res = getCity(town_id);
  var rHTML = '';

  if (current_town_id == town_id)
  {
    rHTML += '<img class="Action" src="http://s2.de.ikariam.com/skin/actions/move_fleet_disabled.gif" align="absmiddle" />';
  }
  else
  {
    rHTML += '<a view=deployment deploymenttype=fleet href="#" title="Station fleets" onclick="TownInfo.init(\''+town_id+'\',\'town_info\',false,\'#content\');"><img class="Action" src="http://s2.de.ikariam.com/skin/actions/move_fleet.gif" align="absmiddle" /></a>';
  }

  return rHTML;
}

function createLinkToMap(town_id)
{
  var rHTML = '';

  rHTML += '<a href="/game/map?action=index&town_id=' + town_id +'" title="View island"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/layout/icon-island.gif" /></a>';

  return rHTML;
}

function createLinkToTransportGoods(town_id)
{
  var res = getCity(town_id);
  var rHTML = '';
  var now = new Date();

  if (current_town_id == town_id)
  {
    rHTML += '<img class="Action" src="http://s2.de.ikariam.com/skin/actions/transport_disabled.gif" align="absmiddle" />';
  }
  else
  {
    rHTML += '<a view=transport href="#" title="Transports goods" onclick="TownInfo.init(\''+town_id+'\',\'town_info\',false,\'#content\');"><img class="Action" src="http://s2.de.ikariam.com/skin/actions/transport.gif" align="absmiddle" /></a>';
  }

  return rHTML;
}

function createLinkToResources(city_id)
{
  var res = getCity(city_id);
  var rHTML = '';

  if (res.csrfToken != undefined)
  {
    rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=resource&type=resource&id=" title="View island saw mill"><img height="12" align="absmiddle" src="http://s2.de.ikariam.com/skin/resources/icon_wood.gif" /></a>';
    rHTML += '&nbsp;';

    if (res.prodgood == 'iron')
    {
      rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=" title="View island vineyard"><img height="12" align="absmiddle" src="http://s2.de.ikariam.com/skin/resources/icon_fav.gif" /></a>';
    }
    else if (res.prodgood == 'stone')
    {
      rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=" title="View island quarry"><img height="12" align="absmiddle" src="http://s2.de.ikariam.com/skin/resources/icon_stone.gif" /></a>';
    }
    else if (res.prodgood == 'favor')
    {
      rHTML += '<a class="changeCity" cityid="'+city_id+'" href="?view=tradegood&type=tradegood&id=" title="View island crystal mine"><img height="12" align="absmiddle" src="http://s2.de.ikariam.com/skin/resources/icon_fav.gif" /></a>';
    }

    rHTML += '&nbsp;';
  }

  return rHTML;
}

function createLinkToResourceCond(condition, text, city_id, city_index) {
  if (condition == true) {
    // http://de2.grepolis.com/game/building_ironer?action=index&town_id=34194&h=CSA9RPZl
    return createLink(text, "?view=resource&type=resource&id=", "class=changeCity cityid="+city_id);
  }
  return text;
}

function createLinkToTradegoodCond(condition, text, city_id, city_index) {
  if (condition == true) {
    return createLink(text, "?view=tradegood&type=tradegood&id=", "class=changeCity cityid="+city_id);
  }
  return text;
}


EmpireBoard.Renders.Army_HeaderIcons = function(currentCityId)
{
  var rHTML = '';

  rHTML += this.IconTo_safehouseReports(currentCityId);
  if (reportViewToSurvey('safehouse-reports') == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  rHTML += '<a view="militaryAdvisorCombatReports" href="?view=militaryAdvisorCombatReports" title="View combat reports"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/layout/medallie32x32_gold.gif"/></a>';
  // skin/layout/icon-helmet.gif
  if (reportViewToSurvey('militaryAdvisorCombatReports') == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  rHTML += '<a view="militaryAdvisorMilitaryMovements" href="?view=militaryAdvisorMilitaryMovements" title="View military advisor"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/relatedCities/general.gif"/></a>';
  // skin/layout/icon-helmet.gif
  if (reportViewToSurvey('militaryAdvisorMilitaryMovements') == '!')
  {
    rHTML += '<sup class=Red title="Require attention">!</sup>';
  }
  else
  {
    rHTML += '&nbsp;';
  }

  return rHTML;
};

EmpireBoard.Renders.IconTo_safehouseReports = function(currentCityId,Title)
{
  if (currentCityId == undefined) currentCityId = 0;
  if (Title == undefined) Title = "View espionage reports";
  var rHTML = '';
  var sCityId = 0;

  if (currentCityId > 0)
  {
    sCityId = currentCityId;
  }

  if (sCityId == 0)
  {
    var Cities = this._Parent.DB.OwnCities;
    for (townId in Cities)
    {
      sCityId = townId;
      break;
    }
  }

  if (sCityId == 0)
  {
    return '';
  }
  else
  {
    rHTML += '<a view="safehouse" tab="reports" townid="'+sCityId+'" href="?view=safehouse&id='+sCityId+'&tab=reports" title="'+Title+'"><img align="absmiddle" src="http://s2.de.ikariam.com/skin/buildings/x40_y40/safehouse.gif"/></a>';
    // skin/img/town/building_safehouse.gif
    return rHTML;
  }
};

EmpireBoard.Renders.Buildings_HeaderIcons = function(currentCityId)
{
  var rHTML = '';
  /*
   * rHTML += this.IconTo_researchAdvisor(); if
   * (reportViewToSurvey('researchAdvisor') == '!') { rHTML += '<sup class=Red
   * title="Require attention">!</sup>'; } else { rHTML += '&nbsp;'; }
   */
  return rHTML;
};

EmpireBoard.Renders.Movements_Tooltip_Content = function(townID)
{
  var tooltip = "<table>";

  if (config["movements"] == undefined)
  {
    return '';
  }
  else if (config["movements"][townID] != undefined)
  {
    for (key in config["movements"][townID])
    {
      var arrivetime = config["movements"][townID][key].endTime;
      if (arrivetime >= this._Parent.StartTime)
      {
        var tCityId = config["movements"][townID][key].tCityId;
        var tCity ='';
        if ((this._Parent.DB.OwnCities[tCityId] != undefined) && (this._Parent.DB.OwnCities[tCityId].own != false))
        {
          tCity = config["movements"][townID][key].ttownName;
        }
        else
        {
          tCity = config["movements"][townID][key].ttownName+" ("+config["movements"][townID][key].tPlayerName+")";
        }

        var tLocation = "";
        if (config["movements"][townID][key].toLeft == true)
        {
          tLocation += "&laquo;";
        }
        else if (config["movements"][townID][key].toRight == true)
        {
          tLocation += "&raquo;";
        }
        else
        {
          tLocation += "&laquo;&raquo;";
        }
        tLocation += "&nbsp;";
        tLocation += "<i>"+tCity+"</i>";

        var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
        var smartDate = smartDateFormat(arrivetime);

        tooltip += "<tbody><tr>"+
        "<td valign=top align=left class='Mission'><img src='"+this._Parent.Grepolis.Get_FleetMission_ImgSrc(config["movements"][townID][key].mission)+"' /></td>"+
        "<td valign=top align=right><b>"+config["movements"][townID][key].summary+"</b>&nbsp;</td>"+
        "<td valign=top align=left>"+tLocation+"</td>"+
        "</tr><tr class=Small>"+
        "<td align=right colspan=3>&nbsp;&nbsp;"+smartDate+"&nbsp;"+counter+"</td>"+
        "</tr></tbody>";
      }
    }
  }
  else
  {
    return '';
  }

  tooltip += "</table>";
  return tooltip;
};

EmpireBoard.Renders.Attacks_Tooltip_Content = function(townID)
{
  var tooltip = "<table>";

  if (config["attacks"] == undefined)
  {
    return '';
  }
  else if (config["attacks"][townID] != undefined)
  {
    for (key in config["attacks"][townID])
    {
      var arrivetime = config["attacks"][townID][key].endTime;
      if (arrivetime >= this._Parent.StartTime)
      {
        var tCityId = config["attacks"][townID][key].oCityId;
        var tCity ='';
        /*
         * if ((this.DB.OwnCities[tCityId] != undefined) &&
         * (this.DB.OwnCities[tCityId].own != false)) { tCity =
         * config["attacks"][townID][key].ttownName; } else { tCity =
         * config["attacks"][townID][key].ttownName+"
         * ("+config["attacks"][townID][key].tPlayerName+")"; }
         */

        tCity = config["attacks"][townID][key].otownName+" ("+config["attacks"][townID][key].oPlayerName+")";

        var tLocation = "";
        tLocation += "<i>"+tCity+"</i>";
        tLocation += "&nbsp;";
        if (config["attacks"][townID][key].toLeft == true)
        {
          tLocation += "&laquo;";
        }
        else if (config["attacks"][townID][key].toRight == true)
        {
          tLocation += "&raquo;";
        }
        else
        {
          tLocation += "&laquo;&raquo;";
        }

        var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
        var smartDate = smartDateFormat(arrivetime);

        tooltip += "<tbody><tr>"+
        "<td valign=top align=left class=Red>"+tLocation+"</td>"+
        "<td valign=top align=left class='Mission'><img src='"+this._Parent.Grepolis.Get_FleetMission_ImgSrc(config["attacks"][townID][key].mission)+"' /></td>"+
        "<td valign=top align=right class=Red><b>"+config["attacks"][townID][key].summary+"</b>&nbsp;</td>"+
        "</tr><tr class=Small>"+
        "<td align=right colspan=3>&nbsp;&nbsp;"+smartDate+"&nbsp;"+counter+"</td>"+
        "</tr></tbody>";
      }
    }
  }
  else
  {
    return '';
  }

  tooltip += "</table>";
  return tooltip;
};

EmpireBoard.Renders.ArrivingGoods_Tooltip_Content = function(town_id, resName)
{
  var _nowTime = new Date().getTime();

  var tooltip = "<table>";

  var sum = 0;

  var town = getCity(town_id);
  var rows = getArrValue(config.arrivinggoods, town_id, []);
  var key;
  var higherTime = 0;
  for (key in rows)
  {
    var row = rows[key];
    var res = row["res"];
    var a = parseInt(getArrValue(res, resName, 0));
    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
    if ((a > 0) && (arrivetime > town.prodtime))
    {
      sum += a;
      var starttown = getArrValue(row, "starttown", "");
      var quest = getArrValue(row, "quest", "");
      if (_nowTime >= arrivetime)
      {
        var counter = "(delivered)";
        var smartDate = '';
      }
      else if (quest == 'loading')
      {
        var counter = "(loading)";
        var smartDate = '';
      }
      else
      {
        if (arrivetime > higherTime) higherTime = arrivetime;
        var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"' class='time_counter'>__:__:__</font>)";
        var smartDate = smartDateFormat(arrivetime);
      }
      var fromLocation = "&laquo;&nbsp;<i>" + starttown + "</i>";

      tooltip += "<tbody><tr>"+
      "<td valign=top>+</td>"+
      "<td valign=top align=right><b>"+this._Parent.Str.FormatBigNumber(a) + "</b>&nbsp;</td>"+
      "<td valign=top align=left>"+fromLocation+"</td>"+
      "</tr><tr class=Small>"+
      "<td align=right colspan=3>&nbsp;&nbsp;" + smartDate + "&nbsp;"+counter+"</td>"+
      "</tr></tbody>";
    }
  }

  var tradinggoods = 0;
  var hourlyprod = 0;
  var resAmount = parseInt(getArrValue(town, resName, 0));
  if (resName == 'wood')
  {
    tradinggoods = town.tradewood;
    hourlyprod = town.prodwood;
    resAmount = getCurrentResourceAmount(_nowTime, town.prodtime, town.wood, town.prodwood);
  }
  else if (resName == 'iron')
  {
    tradinggoods = town.tradeiron;
    hourlyprod = town.prodiron;
    resAmount = getCurrentResourceAmount(_nowTime, town.prodtime, town.iron, town.prodiron);
  }
  else if (resName == 'stone')
  {
    tradinggoods = town.tradestone;
    hourlyprod = town.prodstone;
    resAmount = getCurrentResourceAmount(_nowTime, town.prodtime, town.stone, town.prodstone);
  }
  else if (resName == 'favor')
  {
    tradinggoods = town.tradefav;
    hourlyprod = town.prodfav;
    resAmount = getCurrentResourceAmount(_nowTime, town.prodtime, town.favor, town.prodfav);
  }

  if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
  {
    sum += parseInt(tradinggoods);
    tooltip += "<tbody><tr>"+
    "<td>+</td>"+
    "<td align=right><b>"+this._Parent.Str.FormatBigNumber(parseInt(tradinggoods)) + "</b>&nbsp;</td>"+
    "<td align=left>&laquo;&nbsp;<i>" + config.buildings['branchOffice'].name + "</i></td>"+
    "</tr></tbody>";
  }

  if (resAmount > 0)
  {
    tooltip += "<tbody><tr>"+
    "<td>+</td>"+
    "<td align=right><b>"+this._Parent.Str.FormatBigNumber(resAmount) + "</b>&nbsp;</td>"+
    "<td align=left>&laquo;&nbsp;<i>" + config.buildings['warehouse'].name + "</i></td>"+
    "</tr></tbody>";
  }

  if (sum > 0)
  {
    tooltip += "<tfoot><tr>"+
    "<td>=</td>"+
    "<td align=right><b>"+this._Parent.Str.FormatBigNumber(sum+resAmount) + "</b>&nbsp;</td>"+
    "<td></td>"+
    "</tr>";
    if ((hourlyprod != 0) && (higherTime > _nowTime + (1000 * 60 * 20)))
    {
      var restHours = (higherTime - _nowTime) / (1000 * 60 * 60);
      var prodSign = '+';
      if (hourlyprod < 0) prodSign = '-';
      tooltip += "<tr class=Small>"+
      "<td>"+prodSign+"</td>"+
      "<td align=right>"+this._Parent.Str.FormatBigNumber(Math.abs(hourlyprod)) + "&nbsp;</td>"+
      "<td align=left>x&nbsp;" + this._Parent.Str.FormatFloatNumber(restHours, 1) + LocalizationStrings['timeunits']['short']['hour']+"</td>"+
      "</tr>";
      tooltip += "<tr class=Small>"+
      "<td>=</td>"+
      "<td align=right>"+this._Parent.Str.FormatBigNumber(sum+resAmount+Math.floor(restHours*hourlyprod)) + "&nbsp;</td>"+
      "<td align=left>&raquo;&nbsp;" + smartDateFormat(higherTime)+"</td>"+
      "</tr>";
    }
    tooltip += "</tfoot>";
  }

  tooltip += "</table>";
  return tooltip;
};

EmpireBoard.Grepolis =
{
    _Parent:         null,
    _View:           null,
    _Game:           null,
    _GameData:         null,
    _Tab:          null,
    _Host:           null,
    _Server:         null,
    _Language:         null,
    _Version:        null,
    _IsV031x:        null,
    _IsV032x:        null,
    _IsV033x:        null,
    _ActionRequest:      null,
    _currentCity:      null,
    _LocalizationStrings:  null
};

EmpireBoard.Grepolis.Init = function(parent)
{
  this._Parent = parent;
};

EmpireBoard.Grepolis.SetGame = function(game)
{
  this._Game = game;
};

EmpireBoard.Grepolis.GetGame = function()
{
  return this._Game;
};

EmpireBoard.Grepolis.SetGameData = function(gamedata)
{
  this._GameData = gamedata;
};

EmpireBoard.Grepolis.View = function()
{
  return this._Game.controller;
};

EmpireBoard.Grepolis.Host = function()
{
  if (this._Host == null)
  {
    this._Host = '';

    this._Host = document.location.host;
  }

  return this._Host;
};

EmpireBoard.Grepolis.Server = function(host)
{
  // TODO Check
  if (this._Server == null)
  {
    if (host == undefined) host = this.Host();
    this._Server = '';

    var parts = host.split(".");
    var idx = 0;
    if (parts[0] == 'www') idx++;
    this._Server = parts[idx];
  }

  return this._Server;
};

EmpireBoard.Grepolis.Language = function()
{
  if (this._Language == null)
  {
    this._Language = this.Host().substring(0,2);
    var l = getCfgValueNonEmpty("LANGUAGE", language);
    if (l != undefined)
      this._Language = l;
  }
  return this._Language;
};

EmpireBoard.Grepolis.Tab = function()
{
  // TODO Check
  if (this._Tab == null)
  {
    this._Tab = '';
    var url_view = /[\?&]tab=([a-zA-Z0-9\-_]+)/.exec(document.URL);
    if (url_view != null) this._Tab = RegExp.$1;
  }

  return this._Tab;
};

EmpireBoard.Grepolis.Trim_Coords = function(str)
{
  // Require: Str
  return this._Parent.Str.Trim(this._Parent.Str.Trim_Accodances(str));
};

EmpireBoard.Grepolis.Trim_PlayerName = function(str)
{
  // Require: Str
  return this._Parent.Str.Trim(this._Parent.Str.Trim_Brackets(str));
};

EmpireBoard.Grepolis.Trim_Unit = function(str)
{
  // Require: Str
  str = str.replace("unit", "");
  str = str.replace("currentUnit", "");

  return this._Parent.Str.Trim(str);
};

EmpireBoard.Grepolis.TwoDigit_Coords = function(str)
{
  return "45:45";
  // Require: Str
  var a = str.indexOf('[');
  var b = str.indexOf(']');
  str = str.substring(a+1,b);
  var coords = str.split(':');
  res = '[';
  res += this._Parent.Str.TwoDigit(coords[0].substr(-2,2));
  res += ':';
  res += this._Parent.Str.TwoDigit(coords[1].substr(-2,2));
  res += ']';
  return res;
};

EmpireBoard.Grepolis.City_Object = function()
{
  var City = new Object;

  City.id      = 0;
  City.townName    = '';
  City.playername  = '';
  City.storage_volume  = 0;
  City.favor_max   = 0;
  City.points    = 0;

  City.knownTime   = new Date().getTime();

  City.selected = false;

  City.wood = 0;
  City.iron = 0;
  City.stone = 0;
  City.favor = 0;
  City.underConstruction = "-";
  City.population = 0;
  City.buildings = {};
  City.units = {};

  return City;
};

EmpireBoard.Grepolis.Parse_Coords = function(str)
{
  var res = null;

  if ((str != undefined) && (str != null) && (str != ''))
  {
    var resReg = /(\[[0-9:]+\])/.exec(str);
    if (resReg != null)
    {
      res = resReg[1];
    }
  }

  return res;
};


EmpireBoard.Grepolis.Fetch_CitiesSelect = function(database)
{
  if (database == undefined)
    database = {};

  var townName = $("#town_name_href").html();
  var townId = Game.townId;
  if (database[townId] == undefined)
  {
    // the town is unknown, read all
    // cities
    database[townId] = new EmpireBoard.Grepolis.City_Object();
// $.ajax({
// timeout: 3000,
// async: false,
// dataType:"json",
// url:
// "/game/town_group_overviews?action=get_towns_of_active_town_group&town_id="+townId,
// error: function(){},
// success: function(data){
// $.each(data.towns,
// function(nr) {
// if (database[this.id] == undefined) database[this.id] =
// new EmpireBoard.Grepolis.City_Object();
// database[this.id].id = this.id;
// database[this.id].townName = this.name;
// database[this.id].points = this.points;
// EmpireBoard.Log.Add('Fetch select list: town ['+database[this.id].id+'],
// '+database[this.id].townName);
// });
// }
// });
  }

  database[townId].townName = townName;
  database[townId].id = townId;
  database[townId].selected = true;
  database[townId].storage_volume=uW.Layout.storage_volume;
  database[townId].max_favor=uW.Layout.max_favor;
  database[townId].research={};

  EmpireBoard.Log.Add('Fetch select list: this town ['+townId+'], '+database[townId].townName+', selected='+database[townId].selected);

  return database;
};

EmpireBoard.Grepolis.ActionRequest = function()
{
  if (this._ActionRequest == null)
  {
    this._ActionRequest = this._Parent.DOM.Get_First_Node_Value("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,'');
  }

  return this._ActionRequest;
};

EmpireBoard.Grepolis.Get_FleetMission_ImgSrc = function(mission)
{
  // Values: deployarmy,
  // deployfleet, plunder,
  // blockade, defend,
  // defend_port,
  // trade, transport, occupy
  var tag = '';

  tag = 'skin/interface/mission_' + mission + '.gif';

  return tag;
};

EmpireBoard.Grepolis.Get_Happiness_ImgSrc = function(growth)
{
  if (growth == undefined) growth = 0;
  var imagen = '';
  var tag = '';

  if (growth < -6 )
  {
    imagen = 'outraged';
  }
  else if (growth < 0)
  {
    imagen = 'sad';
  }
  else if (growth < 1)
  {
    imagen = 'neutral';
  }
  else if (growth < 6)
  {
    imagen = 'happy';
  }
  else
  {
    imagen = 'ecstatic';
  }
  // tag = 'skin/smilies/' +
  // imagen + '.gif';
  // tag =
  // 'skin/smilies/'+imagen+'_x32.gif';
  tag = 'skin/smilies/'+imagen+'_x25.gif';

  return tag;
};

EmpireBoard.Grepolis.Resource_capacity = function(ResType, WarehouseLevel)
{
  return uW.Layout.storage_volume;
};

EmpireBoard.Grepolis.Resource_Safecapacity = function(ResType, WarehouseLevel, Bonus)
{
  if (ResType == undefined) ResType = 'iron';
  if (WarehouseLevel == undefined) WarehouseLevel = 0;
  if (Bonus == undefined) Bonus = 0;

  var result = 0;

  result = WarehouseLevel * 100;

  return result + (result/100*Bonus);
};

EmpireBoard.Grepolis.FleetMovement_Object = function()
{
  var FleetMovement      = new Object;

  // FleetMovement.own = false;
  // FleetMovement.hostile =
  // false;

  FleetMovement.time       = 0;

  // FleetMovement.summary = '';
  // FleetMovement.hasFleet =
  // false;
  // FleetMovement.hasGoods =
  // false;
  // FleetMovement.hasArmy =
  // false;

  // FleetMovement.oCityId = 0;
  // FleetMovement.otownName = '';
  // FleetMovement.oPlayerName =
  // '';
  // FleetMovement.toLeft = false;
  // FleetMovement.mission = '';
  // Values: deployarmy,
  // deployfleet, plunder,
  // blockade, defend,
  // defend_port,
  // trade, transport, occupy
  // FleetMovement.toRight =
  // false;
  // FleetMovement.tCityId = 0;
  // FleetMovement.ttownName = '';
  // FleetMovement.tPlayerName =
  // '';

  // FleetMovement.hasAction =
  // false;

  return FleetMovement;
};

EmpireBoard.Grepolis.Fetch_FleetMovements = function(database)
{
  // Require: DOM, Str
  var StartTime = new Date().getTime();
  this._Parent.Log.Add('Start fetch movements...');
  if (database == undefined) database = {};

  function grabCityID(rootElt)
  {
    var resID = 0;
    var alinks = rootElt.getElementsByTagName("a");
    for (var k=0; k < alinks.length; k++)
    {
      var resReg = /[\?&]{1}town_id=([0-9]+)&?/i.exec(alinks[k].href);
      if (resReg != null)
      {
        resID = parseInt(resReg[1]);
        break;
      }
    }

    return resID;
  }

  var resMi = this._Parent.DOM.Get_Nodes("//div[@id='fleetMovements']//table[contains(@class, 'locationEvents')]/tbody/tr/td/img[contains(@src, 'mission_')]");
  if (resMi.snapshotLength > 0)
  {
    this._Parent.Log.Add('Found '+resMi.snapshotLength+' fleets');

    // heures
    var mTimers = {};
    var scripts = document.getElementsByTagName("script");
    for (var j = 0; j < scripts.length; j++)
    {
      // search getCountdown
      var nScript = scripts[j];
      var sCode = nScript.innerHTML;
      if (sCode.indexOf('getCountdown') >= 0)
      {
        var aCodeLines = sCode.split(';');
        for (var i=0; i < aCodeLines.length-1; i++)
        {
          if (aCodeLines[i].indexOf('getCountdown') >= 0)
          {
            var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
            var sParts = sValues.split(',');

            var sPart0 = sParts[0].split(':');
            var enddate = 1000*parseInt(this._Parent.Str.Trim(sPart0[1]));

            var sPart1 = sParts[1].split(':');
            var currentdate = 1000*parseInt(this._Parent.Str.Trim(sPart1[1]));

            var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));

            mTimers[sID] = StartTime + (enddate - currentdate);
          }
        }
      }
    }

    for (var i=0; i < resMi.snapshotLength; i++)
    {
      var tr = resMi.snapshotItem(i).parentNode.parentNode;
      var tds = tr.getElementsByTagName("td");

      var fleetId = tds[1].id;

      if (fleetId != '')
      {
        if (database[fleetId] == undefined)
        {
          database[fleetId] = new this.FleetMovement_Object();
        }

        database[fleetId].own      = this._Parent.DOM.Has_ClassName(tr,'own');
        database[fleetId].hostile    = this._Parent.DOM.Has_ClassName(tr,'hostile');

        if (mTimers[fleetId] != undefined)
        {
          database[fleetId].time       = mTimers[fleetId];
        }
        else
        {
          database[fleetId].time       = mTimers['nexEventETA1'];
        }

        database[fleetId].summary = this._Parent.Str.Trim(tds[2].childNodes[0].textContent);
        var payload = tds[2].innerHTML;

        // Has fleet ?
        var hasFleet = false;
        if (payload.indexOf('ship_ram') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_ballista') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_flamethrower') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_catapult') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_steamboat') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_mortar') > 0)
        {
          hasFleet = true;
        }
        else if (payload.indexOf('ship_submarine') > 0)
        {
          hasFleet = true;
        }
        if (hasFleet == true)
        {
          database[fleetId].hasFleet = true;
        }

        // Has Goods ?
        var hasGoods = false;
        if (hasFleet == true)
        {
          // Impossible
        }
        else if (payload.indexOf('wood') > 0)
        {
          hasGoods = true;
        }
        else if (payload.indexOf('iron') > 0)
        {
          hasGoods = true;
        }
        else if (payload.indexOf('stone') > 0)
        {
          hasGoods = true;
        }
        if (hasGoods == true)
        {
          database[fleetId].hasGoods = true;
        }

        // Has Army ?
            var hasArmy = false;
            if (hasFleet == true)
            {
              // Impossible
            }
            else if (payload.indexOf('slinger') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('swordsman') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('phalanx') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('spearman') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('archer') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('marksman') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('gyrocopter') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('steamgiant') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('bombardier') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('ram') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('catapult') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('mortar') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('medic') > 0)
            {
              hasArmy = true;
            }
            else if (payload.indexOf('cook') > 0)
            {
              hasArmy = true;
            }
            if (hasArmy == true)
            {
              database[fleetId].hasArmy = true;
            }

            database[fleetId].oCityId = grabCityID(tds[3]);
            database[fleetId].otownName = this._Parent.Str.Trim(tds[3].childNodes[0].textContent);
            var oPlayerName = this._Parent.Str.Trim(tds[3].childNodes[1].textContent);
            oPlayerName = oPlayerName.substring(1,oPlayerName.length-1);
            database[fleetId].oPlayerName = oPlayerName;

            database[fleetId].tPlayerName = tPlayerName;
            database[fleetId].toLeft = (tds[4].innerHTML != '') ? true : false;
            database[fleetId].mission = /mission_([_a-z]+)\.[a-z]+/i.exec(resMi.snapshotItem(i).src)[1];
            database[fleetId].toRight = (tds[6].innerHTML != '') ? true : false;

            database[fleetId].tCityId = grabCityID(tds[7]);
            database[fleetId].ttownName = this._Parent.Str.Trim(tds[7].childNodes[0].textContent);
            var tPlayerName = this._Parent.Str.Trim(tds[7].childNodes[1].textContent);
            tPlayerName = tPlayerName.substring(1,tPlayerName.length-1);
            database[fleetId].tPlayerName = tPlayerName;

            database[fleetId].hasAction = (tds[8].innerHTML != '') ? true : false;

            this._Parent.Log.Add('Detect fleet['+fleetId+']: oCityId='+database[fleetId].oCityId+', tCityId['+database[fleetId].tCityId+']: '+database[fleetId].ttownName+' ('+database[fleetId].tPlayerName+'), time='+database[fleetId].time+', mission='+database[fleetId].mission);
      }
    }
  }

  return database;
};

EmpireBoard.Grepolis.currentCity = function(valueName,sectionName)
{
  if (this._currentCity == null)
  {
    if (Game.townId != undefined)
    {
      if (Game.townId != undefined)
      {
        this._currentCity = Game.townId;
      }
    }
  }

  if (sectionName == undefined)
  {
    if (valueName == undefined)
    {
      return this._currentCity;
    }
    else
    {
      if (this._currentCity[valueName] == undefined)
      {
        return 0;
      }
      else
      {
        return this._currentCity[valueName];
      }
    }
  }
  else
  {

    if ((this._currentCity[sectionName] == undefined) || (this._currentCity[sectionName][valueName] == undefined))
    {
      return 0;
    }
    else
    {
      return this._currentCity[sectionName][valueName];
    }
  }
};

EmpireBoard.DOM =
{
    _Parent: null,
};

EmpireBoard.DOM.Init = function(parent)
{
  this._Parent = parent;
};

function getDocument(responseText) {
  var html = document.createElement("html");
  html.innerHTML = responseText;
  var response = document.implementation.createDocument("", "", null);
  response.appendChild(html);
  return response;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
  case got.STRING_TYPE:
    return got.stringValue;
  case got.NUMBER_TYPE:
    return got.numberValue;
  case got.BOOLEAN_TYPE:
    return got.booleanValue;
  default:
    while (next = got.iterateNext())
      result.push( next );
  return result;
  }
}

EmpireBoard.DOM.Get_Nodes = function(query)
{
  // return
  // document.evaluate(query,
  // document,
  // null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  // null);
  return document.evaluate(query, document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};

EmpireBoard.DOM.Get_First_Node = function(path)
{
  var value = this.Get_Nodes(path);
  if (value.snapshotLength >= 1)
  {
    return value.snapshotItem(0);
  }
  return null;
};

EmpireBoard.DOM.Get_Last_Node = function(path)
{
  var value = this.Get_Nodes(path);
  if (value.snapshotLength >= 1)
  {
    return value.snapshotItem(value.snapshotLength-1);
  }
  return null;
};

EmpireBoard.DOM.Get_First_Node_Value = function(path, defaultValue)
{
  var value = this.Get_First_Node(path);
  if (value != null)
  {
    return value.value;
  }
  else return defaultValue;
};

EmpireBoard.DOM.Get_Last_Node_Value = function(path, defaultValue)
{
  var value = this.Get_Last_Node(path);
  if (value != null)
  {
    return value.value;
  }
  else return defaultValue;
};

EmpireBoard.DOM.Get_First_Node_TextContent = function(path, defaultValue)
{
  var value = this.Get_First_Node(path);
  if (value != null)
  {
    return value.textContent;
  }
  else return defaultValue;
};

// get node's title attribute
function getNodeTitle(path, defaultValue) {
  var value = EmpireBoard.DOM.Get_First_Node(path);
  // Fix for v3
  if ((value != null) && (value.title != '')) {
    return value.title;
  } else return defaultValue;
}

EmpireBoard.DOM.Has_ClassName = function(oElm, strClassName)
{
  var arrayClassNames = oElm.className.split(' ');
  var Found = false;
  var arrayClassNamesLength = arrayClassNames.length;
  for (var k=0; k<arrayClassNamesLength; k++)
  {
    if (arrayClassNames[k] == strClassName)
    {
      Found = true;
      break;
    }
  }
  return Found;
};

/* Lib for strings processes */
EmpireBoard.Str =
{
    _Parent:       null,
    _decimalPoint:     '.',
    _thousandSeparator:  ','
};

EmpireBoard.Str.Init = function(parent)
{
  this._Parent = parent;
  // this._decimalPoint =
  // this.Get_LocaleDecimalPoint();
};

EmpireBoard.Str.Trim = function(str)
{
  if (str != undefined)
  {
    str = str.replace(/&nbsp;/gi, " ");
    str = str.replace(/\t/gi, " ");
    str = str.replace(/\v/gi, "");
    str = str.replace(/\f/gi, "");
    str = str.replace(/\n/gi, "");
    str = str.replace(/\r/gi, "");
    // str = str.replace(/\e/gi,
    // "");
    str = str.replace(/\s/gi, " ");

    while(str.charAt(0) == (" "))
    {
      str = str.substring(1);
    }
    while(str.charAt(str.length-1) == " " )
    {
      str = str.substring(0,str.length-1);
    }
  }
  return str;
};

EmpireBoard.Str.Trim_Brackets = function(str)
{
  str = str.replace(/\(.+\)/gi, "");

  return str;
};

EmpireBoard.Str.Trim_Accodances = function(str)
{
  str = str.replace(/\[.+\]/gi, "");

  return str;
};

EmpireBoard.Str.TwoDigit = function(val)
{
  val = parseInt(val);
  if (val == 0)
  {
    val = "00";
  }
  else if (val < 10)
  {
    return "0"+val;
  }
  return val;
};

EmpireBoard.Str.To_Integer = function(str, defaultValue)
{
  // Support signed integers
  var temp = ""+str;
  temp = temp.replace(/[^-0-9]+/g, "");
  temp = parseInt(temp);
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
  {
    return defaultValue;
  }
  return temp;
};

// decimalPoint = '.' or ','
EmpireBoard.Str.To_Float = function(str, defaultValue, decimalPoint)
{
  if (decimalPoint == undefined) decimalPoint = this._decimalPoint;
  // Support signed integers
  var temp = ""+str;
  if (decimalPoint == '.')
  {
    temp = temp.replace(/[^-0-9\.]+/g, "");
  }
  else if (decimalPoint == ',')
  {
    temp = temp.replace(/[^-0-9\,]+/g, "");
  }
  else
  {
    temp = temp.replace(/[^-0-9]+/g, "");
  }
  temp = Number(temp);
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
  {
    return defaultValue;
  }
  return temp;
};

EmpireBoard.Str.Get_LocaleDecimalPoint = function()
{
  var _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
  if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "")
  {
    _cachedDecimalPoint = ".";
  }
  return _cachedDecimalPoint;
};

EmpireBoard.Str.FormatFloatNumber = function(num, fracdigits, alwaysShowSign, decimalPoint)
{
  if (fracdigits == undefined) fracdigits = 2;
  if (alwaysShowSign == undefined) alwaysShowSign = false;
  if (decimalPoint == undefined) decimalPoint = this._decimalPoint;

  var s = ""+num;
  if (num == "?")
  {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-")
  {
    negative = "-";
    s = s.substring(1);
  }
  else if (alwaysShowSign == true)
  {
    negative = "+";
  }
  var p = s.indexOf(".");
  if (p >= 0)
  {
    var i = s.substring(0, p);
    var frac = s.substring(p + 1, p + 1 + fracdigits);
    while (frac.length < fracdigits)
    {
      frac += "0";
    }
    s = i + decimalPoint + frac;
  }
  return negative + s;
};

EmpireBoard.Str.FormatBigNumber = function(num, alwaysShowSign, thousandSeparator)
{
  if (alwaysShowSign == undefined) alwaysShowSign = false;
  if (thousandSeparator == undefined) thousandSeparator = this._thousandSeparator;

  var s = ""+num;
  if (num == undefined || s == "NaN" || s == "-")
  {
    return "-";
  }
  else if (num == "?")
  {
    return num;
  }

  var negative = "";
  if (s.substring(0, 1) == "-")
  {
    negative = "-";
    s = s.substring(1);
  }
  else if (alwaysShowSign == true)
  {
    negative = "+";
  }

  var i = s.length-3;
  while (i > 0)
  {
    s = s.substring(0, i) + thousandSeparator + s.substring(i);
    i -= 3;
  }
  return negative + s;
};

function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) {
  if (showElapsedTime != true) {
    showElapsedTime = false;
  }
  if (elapsedTimeSeparator == undefined) {
    elapsedTimeSeparator = ",";
  }
  var s = new Date();
  s.setTime(time);
  var now = new Date();
  var t = "";
  if ((1+now.getDate()) == s.getDate() && now.getYear() == s.getYear() && now.getMonth() == s.getMonth()) {
    t = 'tomorrow ' + EmpireBoard.Str.TwoDigit(s.getHours())+":"+EmpireBoard.Str.TwoDigit(s.getMinutes());
  } else if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.toLocaleString();
  } else {
    t = EmpireBoard.Str.TwoDigit(s.getHours())+":"+EmpireBoard.Str.TwoDigit(s.getMinutes());
  }
  if (showElapsedTime) {
    t += elapsedTimeSeparator;
    var d = (now.getTime() - s.getTime()) / 1000;
    if (d < 3600) {
      t += " " + Math.floor(d / 60) + "m";
    } else {
      if (d >= 86400) {
        t += " " + Math.floor(d / 86400) + "d";
      }
      t += " " + EmpireBoard.Str.FormatFloatNumber((d % 86400) / 3600, 1) + "h";
    }
  }
  return t;
}

function getTimestring(timestamp,maxDigits,delimiter,approx,showunits,zerofill)
{
  // TODO Reactivate
  return "00:00";
  if(typeof timestamp=="undefined"){timestamp=0;}
  if(typeof maxDigits=="undefined"){maxDigits=2;}
  if(typeof delimiter=="undefined"){delimiter=" ";}
  if(typeof approx=="undefined"){approx="";}
  if(typeof showunits=="undefined"){showunits=true;}
  if(typeof zerofill=="undefined"){zerofill=false;}
  var timeunits=[];
  timeunits['day']=60*60*24;
  timeunits['hour']=60*60;
  timeunits['minute']=60;
  timeunits['second']=1;
  var loca=[];
  loca['day']=(showunits)?LocalizationStrings['timeunits']['short']['day']:"";
  loca['hour']=(showunits)?LocalizationStrings['timeunits']['short']['hour']:"";
  loca['minute']=(showunits)?LocalizationStrings['timeunits']['short']['minute']:"";
  loca['second']=(showunits)?LocalizationStrings['timeunits']['short']['second']:"";
  timestamp=Math.floor(timestamp/1000);
  var timestring="";
  for(var k in timeunits)
  {
    var nv=Math.floor(timestamp/timeunits[k]);
    if(maxDigits>0&&(nv>0||(zerofill&&timestring!="")))
    {
      timestamp=timestamp-nv*timeunits[k];
      if(timestring!="")
      {
        timestring+=delimiter;
        if(nv<10&&nv>0&&zerofill){nv="0"+nv;}
        if(nv==0){nv="00";}
      }
      timestring+=nv+loca[k];
      maxDigits--;
    }
  }
  if(timestamp>0){timestring=approx+timestring;}
  return timestring;
}

EmpireBoard.Handlers =
{
    _Parent: null
};

EmpireBoard.Handlers.Init = function(parent)
{
  this._Parent = parent;
};

EmpireBoard.Handlers.Attach_Events = function()
{
  this.Attach_ChangeCity_Events();
  // Tooltips
  this.Attach_ArrivingGoods_Events();
  this.Attach_Movements_Events();
  this.Attach_Attacks_Events();
};

EmpireBoard.Handlers.Attach_ChangeCity_Events = function()
{
  var self = this;

  var nodes = $x("//table//a[contains(@class,'changeCity')]");
  for(var i=0; i<nodes.length; i++)
  {
    if (current_town_id != nodes[i].getAttribute("townid"))
      nodes[i].addEventListener('click', function(e) { self.ChangeCity_Click_Event(e); }, false);
  }
};

EmpireBoard.Handlers.ChangeCity_Click_Event = function(e)
{
  var obj = e.srcElement ? e.srcElement:e.target;
  obj.style.cursor="wait";
  document.getElementsByTagName("body")[0].style.cursor="wait";
  while (obj.tagName != 'A')
  {
    obj = obj.parentNode;
  }
  var town_id = obj.getAttribute("townid");
  this._Parent.Grepolis._ActionRequest = changeCity(town_id);
};

EmpireBoard.Handlers.Attach_ArrivingGoods_Events = function()
{
  var self = this;

  var nodes = $x("//div[@id='EmpireBoard']//*[contains(@class,'MoreGoods')]");
  for(var i=0; i<nodes.length; i++)
  {
    nodes[i].addEventListener('mouseover', function(e) { self.ArrivingGoods_MouseOver_Event(e); }, false);
    nodes[i].addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
    nodes[i].addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
  }
};

EmpireBoard.Handlers.ArrivingGoods_MouseOver_Event = function(e)
{
  if (!e) { e = window.event; }
  var obj = e.srcElement ? e.srcElement : e.target;
  // var targetObj = obj;
  while (obj.hasAttribute('resource') == false)
  {
    obj = obj.parentNode;
  }
  var resName = obj.getAttribute('resource');
  while (obj.hasAttribute('townid') == false)
  {
    obj = obj.parentNode;
  }
  var town_id = parseInt(obj.getAttribute('townid'));
  // window.status = 'Resource:
  // '+resName+' City ID:
  // '+town_id;
  var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.ArrivingGoods_Tooltip_Content(town_id, resName));

  this._Parent.Tooltip.show(tooltipHTML);
};

EmpireBoard.Handlers.Attach_Movements_Events = function()
{
  var self = this;

  var nodes = $x("//div[@id='EmpireBoard']//*[contains(@class,'Movements')]");
  for(var i=0; i<nodes.length; i++)
  {
    nodes[i].addEventListener('mouseover', function(e) { self.Movements_MouseOver_Event(e); }, false);
    nodes[i].addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
    nodes[i].addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
  }
};

EmpireBoard.Handlers.Movements_MouseOver_Event = function(e)
{
  if (!e) { e = window.event; }
  var obj = e.srcElement ? e.srcElement : e.target;
  while (obj.hasAttribute('townid') == false)
  {
    obj = obj.parentNode;
  }
  var town_id = parseInt(obj.getAttribute('townid'));
  // window.status = 'Movements of
  // town by ID : '+town_id;

  var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.Movements_Tooltip_Content(town_id));
  this._Parent.Tooltip.show(tooltipHTML);
};

EmpireBoard.Handlers.Attach_Attacks_Events = function()
{
  var self = this;

  var nodes = $x("//div[@id='EmpireBoard']//*[contains(@class,'Attacks')]");
  for(var i=0; i<nodes.length; i++)
  {
    nodes[i].addEventListener('mouseover', function(e) { self.Attacks_MouseOver_Event(e); }, false);
    nodes[i].addEventListener('mousemove', function(e) { self._Parent.Tooltip.mouseMove(e); }, false);
    nodes[i].addEventListener('mouseout', function(e) { self._Parent.Tooltip.hide(e); }, false);
  }
};

EmpireBoard.Handlers.Attacks_MouseOver_Event = function(e)
{
  if (!e) { e = window.event; }
  var obj = e.srcElement ? e.srcElement : e.target;
  while (obj.hasAttribute('townid') == false)
  {
    obj = obj.parentNode;
  }
  var town_id = parseInt(obj.getAttribute('townid'));
  // window.status = 'Movements of
  // town by ID : '+town_id;

  var tooltipHTML = this._Parent.Tooltip.innerHTML(this._Parent.Renders.Attacks_Tooltip_Content(town_id));
  this._Parent.Tooltip.show(tooltipHTML);
};

EmpireBoard.Handlers.Start_Timers = function()
{
  // Real-time counters
  window.setInterval(myTimeCounterF, 1000);
  window.setInterval(realtimeFactDisplayF, 5000);
};

function myTimeCounterF()
{
  var currenttime = new Date().getTime();
  var cs = EmpireBoard.DOM.Get_Nodes("//font[contains(@id, 'mytimecounter')]");
  for (var i = 0; i < cs.snapshotLength; i++)
  {
    var c = cs.snapshotItem(i);
    var abstime = Math.round(c.getAttribute('counter'));
    hdata = (abstime - currenttime) / 1000;
    if (hdata > 0)
    {
      var s = "";
      s = getTimestring(hdata*1000);
      c.innerHTML = s;
    }
    else
    {
      c.innerHTML = "-";
    }
  }
  // realtimeFactDisplayF();
}

function realtimeFactDisplayF()
{
  var currenttime = new Date().getTime();

  $("#EmpireBoardResources #myresourcecounter").each(function (index)
      {
    if ($(this).attr("color") != "#ff0000")
    {
      var resource = $(this).attr("resource");
      var arr = $(this).attr("counter").split(",");
      var startTime = arr[0];
      var startAmount = parseFloat(arr[1]);
      var factPerHour = parseFloat(arr[2]);
      var maxAmount = arr[3];

      var currAmount = getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour);

      if ((maxAmount != '-') && (currAmount >= maxAmount))
      {
        $(this).html(EmpireBoard.Str.FormatBigNumber(maxAmount));
        $(this).attr("color", "#ff0000");
      }
      else
      {
        $(this).html(EmpireBoard.Str.FormatBigNumber(currAmount));
      }
    }
      });
}

EmpireBoard.realtimeSyncResources = function ()
{
  res['wood']=uW.Layout.resources['wood'];
  res['stone']=uW.Layout.resources['stone'];
  res['iron']=uW.Layout.resources['iron'];
  res['wood-i']=uW.Layout.production['wood'];
  res['stone-i']=uW.Layout.production['stone'];
  res['iron-i']=uW.Layout.production['iron'];
  res['fav']=uW.Layout.favor;
  res['fav-i']=uW.Layout.favor_production;
  res.population = uW.Layout.population;
  var startTime = new Date().getTime();

  $("#EmpireBoardResources .current [resource]").each(function (index)
      {
    var resource = $(this).attr("resource");
    var arr = $(this).find("#myresourcecounter").attr("counter").split(",");
    var startAmount = parseFloat(arr[1]);
    var factPerHour = parseFloat(arr[2]);
    var maxAmount = arr[3];
    startAmount = res[resource]
    var counter = startTime+","+startAmount+","+factPerHour+","+maxAmount;
    $(this).find("#myresourcecounter").attr("counter", counter);
      });
  
  $("#EmpireBoardArmy .current .population").html(EmpireBoard.Str.FormatBigNumber(res.population));
  // setTimeout(this.DB.Save(),0);

  return realtimeFactDisplayF();
}

EmpireBoard.Log =
{
    _Parent: null,
    _Enabled: false
};

EmpireBoard.Log.Init = function(parent)
{
  this._Parent = parent;
};

EmpireBoard.Log.Add = function(msg)
{
  if (this._Enabled == true)
  {
    GM_log(msg);
  }
};

EmpireBoard.Updater =
{
    _Parent:       null,
    _ScriptURL:      '',
    _availableVersion:   0
};

EmpireBoard.Updater.Init = function(parent)
{
  this._Parent = parent;
};

// CallBackFct function receive available version number (or null value if
// failed) as argument
EmpireBoard.Updater.Check = function(ScriptURL, CallBackFct)
{
  this._availableVersion   = 0;
  this._ScriptURL      = ScriptURL;
  var self = this;

  GM_xmlhttpRequest({
    method:       "GET",
    url:        ScriptURL,
    headers:      { Accept:"text/javascript; charset=UTF-8" },
    overrideMimeType: "application/javascript; charset=UTF-8",
    onload:       function(response) { self._ParseScript(response, CallBackFct); }
  });
};

EmpireBoard.Updater._ParseScript = function(response, CallBackFct)
{
  var availableVersion = 0;

  if (response.status == 200)
  {
    var resReg = /@version\s+(\d+)/.exec(response.responseText);
    if (resReg != null)
    {
      availableVersion = resReg[1];
    }
  }

  this._availableVersion = availableVersion;

  if (typeof CallBackFct == 'function')
  {
    CallBackFct.call(this._Parent, availableVersion, response);
  }
};

// the tooltip object
EmpireBoard.Tooltip =
{
    // setup properties of
    // tooltip object
    _Parent:         null,
    id:            "TooltipContainer",
    idParent:        "",
    offsetx:         10,
    offsety:         10,
    _x:            0,
    _y:            0,
    _tooltipElement:     null,
    _saveonmouseover:    null
};

EmpireBoard.Tooltip.Init = function(parent, IdName, IdParent)
{
  if (parent != undefined) this._Parent = parent;

  if (IdName != undefined) this.id       = IdName;
  if (IdParent != undefined) this.idParent   = IdParent;
};

EmpireBoard.Tooltip.CreateContainer = function(IdName, IdParent)
{
  if (IdName != undefined) this.id       = IdName;
  if (IdParent != undefined) this.idParent   = IdParent;

  // create tooltip DIV
  var body = document.getElementById(this.idParent);
  var tooltipdiv = document.createElement('div');
  tooltipdiv.id = this.id;
  tooltipdiv.innerHTML = "";
  tooltipdiv.style.visibility = 'hidden';
  body.appendChild(tooltipdiv);
};

EmpireBoard.Tooltip.innerHTML = function (Content, Title)
{
  if (Content == undefined || Content == "")
  {
    return "";
  }
  else
  {
    var innerHTML = '';
    if (Title == undefined || Title == "")
    {
      Title = "";
    }
    else Title = "<div class=TTTitle>"+Title+"</div>";

    if (langtype == "rf")
    {
      innerHTML = "<div dir=rtl class='TTContent RtoL'>"+Title+Content+"</div>";
    }
    else
    {
      innerHTML = "<div class=TTContent>"+Title+Content+"</div>";
    }

    return innerHTML;
  }
};

EmpireBoard.Tooltip.show = function (htmlelement)
{
  if (document.getElementById)
  {
    this._tooltipElement = document.getElementById(this.id);
  }
  else if ( document.all )
  {
    this._tooltipElement = document.all[this.id].style;
  }

  this._tooltipElement.innerHTML = htmlelement;

  this.moveTo(this._x + this.offsetx , this._y + this.offsety);

  if (this._tooltipElement.style)
  {
    this._tooltipElement.style.visibility ="visible";
  }
  else
  {
    this._tooltipElement.visibility = "visible";
  }

  return false;
};

EmpireBoard.Tooltip.hide = function(e)
{
  if (this._tooltipElement.style)
  {
    this._tooltipElement.style.visibility ="hidden";
  }
  else
  {
    this._tooltipElement.visibility = "hidden";
  }
};

// Moves the tooltip element
EmpireBoard.Tooltip.mouseMove = function(e)
{
  // we don't use "this" because
  // this method is assign to an
  // event of
  // document
  // and so is dereferenced
  if (e == undefined) e = event;

  if (e.pageX != undefined)
  { // gecko, konqueror,
    this._x = e.pageX;
    this._y = e.pageY;
  }
  else if (event != undefined && event.x != undefined && event.clientX == undefined)
  { // ie4 ?
    this._x = event.x;
    this._y = event.y;
  }
  else if (e.clientX != undefined )
  { // IE6, IE7, IE5.5
    if (document.documentElement)
    {
      this._x = e.clientX + ( document.documentElement.scrollLeft || document.body.scrollLeft);
      this._y = e.clientY + ( document.documentElement.scrollTop || document.body.scrollTop);
    }
    else
    {
      this._x = e.clientX + document.body.scrollLeft;
      this._y = e.clientY + document.body.scrollTop;
    }
    /*
     * } else if(event != undefined && event.x != undefined) { // IE6, IE7,
     * IE5.5 tooltip.x = event.x + ( document.documentElement.scrollLeft ||
     * document.body.scrollLeft); tooltip.y = event.y + (
     * document.documentElement.scrollTop || document.body.scrollTop);
     */
  }
  else
  {
    this._x = 0;
    this._y = 0;
  }

  var MovX = this._x + this.offsetx;
  if ((MovX+this.GetDivW(this._tooltipElement)) > (this.GetClientW() + this.GetScrollX() - 2))
  {
    MovX = this.GetClientW() + this.GetScrollX() - 2 - this.GetDivW(this._tooltipElement);
  }
  var MovY = this._y - this.offsety - this.GetDivH(this._tooltipElement);
  if (MovY < (this.GetScrollY() + 2))
  {
    MovY = this._y + this.offsety;
  }

  // window.status =
  // "Scroll="+this.GetScrollX()+","+this.GetScrollY();
  // window.status =
  // "Client="+this.GetClientW()+","+this.GetClientH();

  this.moveTo(MovX , MovY);
};

EmpireBoard.Tooltip.GetDivH = function(el)
{
  return (el ? (el.offsetHeight || el.style.pixelHeight || 0) : 0);
};

EmpireBoard.Tooltip.GetDivW = function(el)
{
  return (el ? (el.offsetWidth || el.style.pixelWidth || 0) : 0);
};

EmpireBoard.Tooltip.GetClientW = function()
{
  var tt_db = document.documentElement || document.body ||
  (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
  : null);
  return (document.body && (typeof(document.body.clientWidth) != 'undefined') ? document.body.clientWidth
      : (typeof(window.innerWidth) != 'undefined') ? window.innerWidth
          : tt_db ? (tt_db.clientWidth || 0)
              : 0);
};

EmpireBoard.Tooltip.GetClientH = function()
{
  var tt_db = document.documentElement || document.body ||
  (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
  : null);
  // Exactly this order seems to
  // yield correct values in all
  // major
  // browsers
  return (document.body && (typeof(document.body.clientHeight) != 'undefined') ? document.body.clientHeight
      : (typeof(window.innerHeight) != 'undefined') ? window.innerHeight
          : tt_db ? (tt_db.clientHeight || 0)
              : 0);
};

EmpireBoard.Tooltip.GetScrollX = function()
{
  var tt_db = document.documentElement || document.body ||
  (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
  : null);
  return (window.pageXOffset || (tt_db ? (tt_db.scrollLeft || 0) : 0));
};

EmpireBoard.Tooltip.GetScrollY = function()
{
  var tt_db = document.documentElement || document.body ||
  (document.getElementsByTagName ? document.getElementsByTagName("body")[0]
  : null);
  return (window.pageYOffset || (tt_db ? (tt_db.scrollTop || 0) : 0));
};

// Move the tooltip element
EmpireBoard.Tooltip.moveTo = function(xL,yL)
{
  if (this._tooltipElement.style)
  {
    this._tooltipElement.style.left = xL +"px";
    this._tooltipElement.style.top = yL +"px";
  }
  else
  {
    this._tooltipElement.left = xL;
    this._tooltipElement.top = yL;
  }
};

EmpireBoard.Init();


function setLanguage() {
  language=uW.location.href.substring(7,9);
  var l = getCfgValueNonEmpty("LANGUAGE", language);
  if (l != undefined) {
    language = l;
  }
}

function getLocalizedTexts() {
  if (language == "de") {
    langtype = "";
    texts = {
        "Upkeep"      : "Upkeep",
        "townName"          : "Stadtname",
        "currentlyBuilding" : "Zur Zeit im Bau",
        "summary"           : "Gesamt:",
        "hide_settings"     : "Verstecke Optionen",
        "show_settings"     : "Zeige Optionen",
        "Population"        : "Bürger",
        "Research"      : "Research",
        "finishedBuilding"  : "Bau abgeschlossen",
        "Incomes"           : "Einkommen",
        "Trading"           : "Handel",
        "wood"              : "Holz",
        "fav"               : "Gunst",
        "Sulfur"            : "Schwefel",
        "wood"      : "Holz",
        "stone"       : "Stein",
        "iron"        : "Silber"
    };
  } else {
    langtype = ""; // Set "lf"
    // for
    // Rigth-to-Left
    // languages,
    // or leave
    // blank
    texts = {
        "Upkeep"      :"Upkeep",
        "townName": "Cities", "currentlyBuilding": "Currently building", "summary": "Summary:",
        "hide_settings": "Hide settings", "show_settings": "Show settings",
        "Population": "Population",
        "Research": "Research",
        "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
        "wood": "wood", "fav": "fav", "stone": "stone", "Sulfur": "Sulfur"
    };
  }
}

function getCity(town_id) {
  if (EmpireBoard.DB.OwnCities[town_id] == undefined) {
    EmpireBoard.DB.OwnCities[town_id] = new EmpireBoard.Grepolis.City_Object();
  }
  return EmpireBoard.DB.OwnCities[town_id];
}

// // lots of code to get the town id. The code trys to find the town id no
// matter
// // which "town dropdown view" the user has chosen.

var town_id = Game.townId;
var current_town_id = town_id;
var townName = Game.town_name;
var town_idmainView;

if (town_id != undefined)
{
  town_idmainView = town_id;
  townName = getCity(town_id).townName;
}
else
{
  town_idmainView = 0;
  townName = '';
}

EmpireBoard.Log.Add('town_id = '+town_id);
EmpireBoard.Log.Add('current_town_id = '+current_town_id);
EmpireBoard.Log.Add('townName = '+townName);

function getCityTime(town_id)
{
  var town = getCity(town_id);

  if (town.prodtime == undefined)
  {
    return 0;
  }
  else
  {
    return town.prodtime;
  }
}

function digProducedResources(res) {
  res.prodwood=uW.Layout.production['wood'];
  res.prodstone=uW.Layout.production['stone'];
  res.prodiron=uW.Layout.production['iron'];
  res.prodfav=uW.Layout.favor_production;
  res.prodtime = EmpireBoard.StartTime;
}

function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) {
  var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;
  return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));
}

function createTooltipAttribute(tooltip, title, isFct) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  if (isFct == true)
  {
    html = tooltip;
  }
  else
  {
    if (title == undefined || title == "") {
      title = "";
    }
    else title = "<div class=TTTitle>"+title+"</div>";
    if (langtype == "rf")
    {
      var html = "<div dir=rtl class='TTContent RtoL'>"+title+tooltip+"</div>";
    }
    else
    {
      var html = "<div class=TTContent>"+title+tooltip+"</div>";
    }
    html = "'"+html.replace(/'/g, "\\'")+"'";
  }
  return "onmouseover=\"Tip("+html+", ABOVE, true, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '');\"";
}

function createTooltip(content, tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
}

function createResCounter(startTime, startAmount, factPerHour, showTooltip, maxAmount, tradeAmount, secureAmount, arrAmount)
{
  if (tradeAmount == undefined) tradeAmount = 0;
  if (arrAmount == undefined) arrAmount = 0;
  if ((maxAmount == undefined) || (maxAmount == '-'))
  {
    maxAmount = '-';
  }
  else
  {
    maxAmount = maxAmount - tradeAmount;
  }
  var currAmount = startAmount;
  var tooltip = "";
  var res;

  if ((startAmount == undefined) || (startAmount+"" == "NaN"))
  {
    res = '?';
  }
  else if ((factPerHour != undefined) && (factPerHour+"" != "NaN") && (factPerHour != 0))
  {
    var counterClass = '';
    var intfactPerHour = Math.round(factPerHour);
    var dailyFact = Math.round(24 * factPerHour);
    if (startTime != undefined)
    {
      currAmount = getCurrentResourceAmount(EmpireBoard.StartTime, startTime, startAmount, intfactPerHour);

      if (intfactPerHour > 0)
      {
        counterClass = 'Bold';
      }
      else if (intfactPerHour < 0)
      {
        if (currAmount+(6*intfactPerHour) <= 0)
        {
          counterClass = 'Red';
        }
        else if (currAmount+(24*intfactPerHour) <= 0)
        {
          counterClass = 'DarkRed';
        }
      }
      res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+intfactPerHour+","+maxAmount+"' class='"+counterClass+"'>"+EmpireBoard.Str.FormatBigNumber(currAmount)+"</font>";
    }

    if (showTooltip == true)
    {
      tooltip = EmpireBoard.Str.FormatBigNumber(intfactPerHour, true)+" / "+LocalizationStrings['timeunits']['short']['hour']+"<br> "+EmpireBoard.Str.FormatBigNumber(dailyFact, true)+" / "+LocalizationStrings['timeunits']['short']['day'];
      // if (intfactPerHour <
      // 0) tooltip +=
      // "<br>&nbsp;" +
      // EmpireBoard.Str.FormatFloatNumber(-1
      // *
      // (currAmount+arrAmount)
      // /
      // intfactPerHour, 1) +
      // "h to empty";
      if (intfactPerHour < 0) tooltip += "<br>&nbsp;" + getTimestring(-1 * (currAmount+arrAmount) / intfactPerHour * 60 * 60 * 1000) + " to empty";
    }
  }
  else
  {
    res = EmpireBoard.Str.FormatBigNumber(currAmount);
  }

  // Safety goods ?
  if ((secureAmount > 0) && (secureAmount >= (currAmount+tradeAmount)))
  {
    res = '<img src="http://s2.de.ikariam.com/skin/layout/icon-wall.gif" class="Safe" title="Safety resources"/> '+res;
  }

  if (tooltip != '') res = createTooltip(res, tooltip);
  return res + "&nbsp;";
}

function createResProgressBar(startTime, startAmount, factPerHour, maxcapacity, securecapacity)
{
  var res = '';
  if ((PROGRESS_BAR_MODE != "off") && (maxcapacity > 0) && (startTime != undefined))
  {
    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
    var perc = Math.min(100, Math.round(curres / maxcapacity * 100.0));
    var remaining = "";
    var remhour = 100000000;
    if (curres >= maxcapacity)
    {
      // no more
      remhour = 0;
    }
    else if (factPerHour > 0) {
      remhour = (maxcapacity - curres) / factPerHour;
      // remaining =
      // "<br>"+EmpireBoard.Str.FormatFloatNumber(remhour,
      // 1)
      // + "h to full";
      remaining = "<br>"+getTimestring(remhour*60*60*1000)+" to full";
    } else if (factPerHour < 0) {
      // remaining =
      // "<br>"+EmpireBoard.Str.FormatFloatNumber(curres
      // /
      // -factPerHour, 1) + "h
      // to empty";
      remaining = "<br>"+getTimestring((curres / -factPerHour)*60*60*1000) + " to empty";
    }
    var cl = "Normal";
    var vperc = perc;
    if ((curres > 0) && (vperc < 4)) vperc = 4;
    if ((PROGRESS_BAR_MODE == "time") && (factPerHour != 0))
    {
      if (remhour <= 1)
      {
        cl = "Full";
      }
      else if (remhour < 24)
      {
        cl = "AlmostFull";
      }
      else if (remhour < 72)
      {
        cl = "Warning";
      }
    }
    else
    {
      if (perc >= 99) {
        cl = "Full";
      } else if (perc >= 90) {
        cl = "AlmostFull";
      } else if (perc >= 80) {
        cl = "Warning";
      }
    }
    res +=  "<table class='myPercent' "+createTooltipAttribute(EmpireBoard.Str.FormatBigNumber(maxcapacity) + " total capacity<br>"+EmpireBoard.Str.FormatBigNumber(securecapacity)+" safety capacity<br>" + perc+"% full" + remaining)+">"+
    "<tr>"+
    "<td width='"+vperc+"%' class='"+cl+"'></td>"+
    "<td width='"+(100-vperc)+"%'></td>"+
    "</tr>"+
    "</table>";
  }
  else if (PROGRESS_BAR_MODE != "off")
  {
    res +=  "<table class='myPercent'>"+
    "<tr>"+
    "<td></td>"+
    "</tr>"+
    "</table>";
  }
  return res;
}


function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='mytimecounter' counter='"+enddate+"'></font>", s);
  }
  return "";
}

function createProd(prodPerHour, extraTooltip) {
  if (prodPerHour == "-" || prodPerHour == "?") {
    return prodPerHour;
  }
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  var tooltip = EmpireBoard.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+LocalizationStrings['timeunits']['short']['day'];
  if (extraTooltip != undefined) {
    tooltip += ", "+extraTooltip;
  }
  return createTooltip(EmpireBoard.Str.FormatBigNumber(Math.round(prodPerHour), true), tooltip);
}

function createResearch(prodPerHour, extraTooltip) {
  if (prodPerHour == "-" || prodPerHour == "?") {
    return prodPerHour;
  }
  if (""+prodPerHour == "0") {
    return '+0';
  }
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  var tooltip = EmpireBoard.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+LocalizationStrings['timeunits']['short']['day'];
  if (extraTooltip != undefined) {
    tooltip += ", "+extraTooltip;
  }
  return createTooltip(EmpireBoard.Str.FormatBigNumber(Math.round(prodPerHour), true), tooltip);
}

function createSimpleProd(prodPerHour) {
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  return EmpireBoard.Str.FormatBigNumber(Math.round(prodPerHour), true);
}

function createIncome(prodPerHour, extraTooltip, classname)
{
  if (classname == undefined) classname = '';
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "?" || prodPerHour == undefined || ""+prodPerHour == "???")
  {
    return "?";
  }
  else if (""+prodPerHour == "0")
  {
    return "0";
  }
  else
  {
    var tooltip = EmpireBoard.Str.FormatBigNumber(Math.round(24 * prodPerHour), true)+" / "+LocalizationStrings['timeunits']['short']['day'];
    if ((extraTooltip != undefined) && (extraTooltip != ''))
    {
      tooltip += "<br>&nbsp;"+extraTooltip;
    }
    return createTooltip('<span class="'+classname+'">'+EmpireBoard.Str.FormatBigNumber(Math.round(prodPerHour), true)+'</span>', tooltip);
  }
}

function createMoreGoods(sum)
{
  var output = '';
  if (sum > 0)
  {
    output = '<font class="More">'+EmpireBoard.Str.FormatBigNumber(sum, true)+'&nbsp;</font>';
  }
  return output;
}

function getArrValue(arr, key, defaultValue) {
  if (arr == undefined || arr[key] == undefined) {
    return defaultValue;
  }
  return arr[key];
}

function createLink(text, href, attrs) {
  return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
}

// From kChen script with some fixes
function changeCity(town_id) {
  var postdata = getFormInput("//form[@id='changeCityForm']//input");
  postdata = postdata + "&town_id="+town_id+"&view=town";
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }
  xmlhttp.open('POST','http://' + location.host + '/index.php',false);
  xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
  xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
  xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
  xmlhttp.setRequestHeader('Cookie',document.cookie);
  xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
  xmlhttp.send(postdata);
  var node = getDocument(xmlhttp.responseText);
  return node.getElementsByTagName("input")[2].value;
}

function getFormInput(path, root, isaction) {
  isaction = (isaction == undefined) ? false : true;
  var nodes = $x(path, root);
  if (nodes.length<=0) return null;
  var postdata = nodes[0].name+"="+nodes[0].value;
  for(var i = 1; i < nodes.length; i++) {
    if (nodes[i].name == "actionRequest" && !isaction) nodes[i].value = EmpireBoard.Grepolis.ActionRequest();
    postdata = postdata +"&" + nodes[i].name+"="+nodes[i].value;
  }
  return postdata;
}

function createLinkToChangeCity(text, town_id, town_index, sup_text, sup_class, sup_title) {
  var res = getCity(town_id);
  var rHTML = '';

  if (res.townName != undefined)
  {
    cName = res.townName;
  }
  if (current_town_id == town_id)
  {
    rHTML += '<b>'+cName+'</b>';
  }
  else
  {
    rHTML += createLink(cName, "?town_id="+town_id, "title=\"Change current town\" ");
  }

  if ((sup_text != undefined) && (sup_text != '') && (sup_text != 0))
  {
    if (sup_class == undefined) sup_class = '';
    if (sup_title == undefined) sup_title = '';
    rHTML += '<sup class="'+sup_class+'" title="'+sup_title+'">'+sup_text+'</sup>';
  }

  return rHTML;
}

function setViewRqTime(view, town_id, newTime, force)
{
  if (view == undefined) view = '';
  if (newTime == undefined) newTime = EmpireBoard.StartTime;
  if (force == undefined) force = false;

  if ((town_id == undefined) || (town_id <= 0))
  {
    if (view == 'merchantNavy')
    {
      if (config.merchantNavyrqtime == undefined)
      {
        config.merchantNavyrqtime = newTime;
      }
      else if (EmpireBoard.StartTime > config.merchantNavyrqtime)
      {
        config.merchantNavyrqtime = newTime;
      }
      else if (newTime < config.merchantNavyrqtime)
      {
        config.merchantNavyrqtime = newTime;
      }
      else if (force == true)
      {
        config.merchantNavyrqtime = newTime;
      }
    }
    else if (view == 'finances')
    {
      if (config.financesrqtime == undefined)
      {
        config.financesrqtime = newTime;
      }
      else if (EmpireBoard.StartTime > config.financesrqtime)
      {
        config.financesrqtime = newTime;
      }
      else if (newTime < config.financesrqtime)
      {
        config.financesrqtime = newTime;
      }
    }
    else if (view == 'militaryAdvisorMilitaryMovements')
    {
      if (config.mAMMrqtime == undefined)
      {
        config.mAMMrqtime = newTime;
      }
      else if (EmpireBoard.StartTime > config.mAMMrqtime)
      {
        config.mAMMrqtime = newTime;
      }
      else if (newTime < config.mAMMrqtime)
      {
        config.mAMMrqtime = newTime;
      }
    }
  }
  else
  {
    var town = getCity(town_id);
    if (view == '')
    {
      if (town.rqtime == undefined)
      {
        town.rqtime = newTime;
      }
      else if (EmpireBoard.StartTime > town.rqtime)
      {
        town.rqtime = newTime;
      }
      else if (newTime < town.rqtime)
      {
        town.rqtime = newTime;
      }
    }
    else if (view == 'townMilitary-army')
    {
      if (town.townMilitaryarmyrqtime == undefined)
      {
        town.townMilitaryarmyrqtime = newTime;
      }
      else if (EmpireBoard.StartTime > town.townMilitaryarmyrqtime)
      {
        town.townMilitaryarmyrqtime = newTime;
      }
      else if (newTime < town.townMilitaryarmyrqtime)
      {
        town.townMilitaryarmyrqtime = newTime;
      }
    }
    else if (view == 'townMilitary-fleet')
    {
      if (town.townMilitaryfleetrqtime == undefined)
      {
        town.townMilitaryfleetrqtime = newTime;
      }
      else if (EmpireBoard.StartTime > town.townMilitaryfleetrqtime)
      {
        town.townMilitaryfleetrqtime = newTime;
      }
      else if (newTime < town.townMilitaryfleetrqtime)
      {
        town.townMilitaryfleetrqtime = newTime;
      }
    }
    else if (town.buildings[view] != undefined)
    {
      if (town.buildings[view].rqtime == undefined)
      {
        town.buildings[view].rqtime = newTime;
      }
      else if (EmpireBoard.StartTime > town.buildings[view].rqtime)
      {
        town.buildings[view].rqtime = newTime;
      }
      else if (newTime < town.buildings[view].rqtime)
      {
        town.buildings[view].rqtime = newTime;
      }
      else if (force == true)
      {
        town.buildings[view].rqtime = newTime;
      }
    }
  }
}

function reportViewToSurvey(view, town_id)
{
  if (view == undefined)     view = '';
  if (town_id == undefined)  town_id = 0;
  var report = false;

  if ((town_id == undefined) || (town_id <= 0))
  {
    if (view == 'finances')
    {
      if (config.financestime == undefined)
      {
        report = true;
      }
      else if (config.financestime == 0)
      {
        report = true;
      }
      else if ((config.financesrqtime != undefined) && (config.financesrqtime <= EmpireBoard.StartTime) && (config.financesrqtime > config.financestime))
      {
        report = true;
      }
      else if (config.financestime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }
    }
    else if (view == 'merchantNavy')
    {
      if (config.merchantNavytime == undefined)
      {
        report = true;
      }
      else if (config.merchantNavytime == 0)
      {
        report = true;
      }
      else if ((config.merchantNavyrqtime != undefined) && (config.merchantNavyrqtime <= EmpireBoard.StartTime) && (config.merchantNavyrqtime > config.merchantNavytime))
      {
        report = true;
      }
      else if (config.merchantNavytime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }
    }
    else if (view == 'militaryAdvisorMilitaryMovements')
    {
      if (config.mAMMtime == undefined)
      {
        report = true;
      }
      else if (config.mAMMtime == 0)
      {
        report = true;
      }
      else if ((config.mAMMrqtime != undefined) && (config.mAMMrqtime <= EmpireBoard.StartTime) && (config.mAMMrqtime > config.mAMMtime))
      {
        report = true;
      }
      else if (config.mAMMtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }
    }
  }
  else
  {
    var town = getCity(town_id);
    if (view == '')
    {
      if (town.prodtime == undefined)
      {
        report = true;
      }
      else if (town.prodtime == 0)
      {
        report = true;
      }
      else if ((town.rqtime != undefined) && (town.rqtime <= EmpireBoard.StartTime) && (town.rqtime > town.prodtime))
      {
        report = true;
      }
      else if (town.prodtime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }
    }
    else if (view == 'town')
    {
      if (town.towntime == undefined)
      {
        report = true;
      }
      else if (town.towntime == 0)
      {
        report = true;
      }
      /*
       * else if ((town.underConstructionName != '') &&
       * (town.underConstructionTime <= EmpireBoard.StartTime)) { report = true; }
       * else if (town.towntime <= (EmpireBoard.StartTime - 1000*60*60*24*7)) {
       * report = true; }
       */
    }
    else if ((view == 'townMilitary-army') || (view == 'building_barracks'))
    {
      var recentTime = 0;
      if (town.townMilitaryarmytime != undefined) recentTime = town.townMilitaryarmytime;
      if ((town.buildings['barracks'] != undefined) && (town.buildings['barracks'].uptime > recentTime)) recentTime = town.buildings['barracks'].uptime;

      if (recentTime == undefined)
      {
        report = true;
      }
      else if (recentTime == 0)
      {
        report = true;
      }
      else if ((town.buildings['barracks'] != undefined) && (town.buildings['barracks'].rqtime != undefined) && (town.buildings['barracks'].rqtime <= EmpireBoard.StartTime) && (town.buildings['barracks'].rqtime > town.buildings['barracks'].uptime))
      {
        // Besoin d'aller
        // dans la caserne
        report = false;
      }
      else if ((town.townMilitaryarmyrqtime != undefined) && (town.townMilitaryarmyrqtime <= EmpireBoard.StartTime) && (town.townMilitaryarmyrqtime > recentTime))
      {
        report = true;
      }
      else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }
    }
    else if ((view == 'townMilitary-fleet') || (view == 'building_docks'))
    {
      var recentTime = 0;
      if (town.townMilitaryfleettime != undefined) recentTime = town.townMilitaryfleettime;
      if ((town.buildings['shipyard'] != undefined) && (town.buildings['shipyard'].uptime > recentTime)) recentTime = town.buildings['shipyard'].uptime;

      if (recentTime == undefined)
      {
        report = true;
      }
      else if (recentTime == 0)
      {
        report = true;
      }
      else if ((town.buildings['shipyard'] != undefined) && (town.buildings['shipyard'].rqtime != undefined) && (town.buildings['shipyard'].rqtime <= EmpireBoard.StartTime) && (town.buildings['shipyard'].rqtime > town.buildings['shipyard'].uptime))
      {
        // Besoin d'aller
        // dans le chantier
        report = false;
      }
      else if ((town.townMilitaryfleetrqtime != undefined) && (town.townMilitaryfleetrqtime <= EmpireBoard.StartTime) && (town.townMilitaryfleetrqtime > recentTime))
      {
        report = true;
      }
      else if (recentTime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
      {
        report = true;
      }

      /*
       * if ((view == 'townMilitary-fleet') && (town.townMilitaryfleetrqtime !=
       * undefined) && (town.townMilitaryfleetrqtime > EmpireBoard.StartTime)) {
       * EmpireBoard.Log.Add("Will request attention at townMilitary-fleet of
       * town["+town_id+"] remaining
       * "+((town.townMilitaryfleetrqtime-EmpireBoard.StartTime)/1000)+"s"); }
       */
    }

    // Any buildings
    if (town.buildings[view] != undefined)
    {
      if (view == 'townHall')
      {
        if (town.buildings[view].uptime == undefined)
        {
          report = true;
        }
        else if (town.buildings[view].uptime == 0)
        {
          report = true;
        }
        else if ((town.buildings[view].rqtime != undefined) && (town.buildings[view].rqtime <= EmpireBoard.StartTime) && (town.buildings[view].rqtime > town.buildings[view].uptime))
        {
          report = true;
        }
        else if (town.buildings[view].uptime <= (EmpireBoard.StartTime - 1000*60*60*24*7))
        {
          report = true;
        }
      }
      else if (view == 'tavern')
      {
        if (town.buildings[view].uptime == undefined)
        {
          report = true;
        }
        else if (town.buildings[view].uptime == 0)
        {
          report = true;
        }
      }
      else if (view == 'branchOffice')
      {
        if (town.buildings[view].uptime == undefined)
        {
          report = true;
        }
        else if (town.buildings[view].uptime == 0)
        {
          report = true;
        }
        else if ((town.buildings[view].rqtime != undefined) && (town.buildings[view].rqtime <= EmpireBoard.StartTime) && (town.buildings[view].rqtime > town.buildings[view].uptime))
        {
          report = true;
        }
      }
      else
      {
        if (town.buildings[view].uptime == undefined)
        {

        }
        else if (town.buildings[view].uptime == 0)
        {

        }
        else if ((town.buildings[view].rqtime != undefined) && (town.buildings[view].rqtime <= EmpireBoard.StartTime) && (town.buildings[view].rqtime > town.buildings[view].uptime))
        {
          report = true;
        }
      }
    }
  }

  return (report == true ? '!' : '');
}

function dropUndeliveredLoadingGoods()
{
  var arrivinggoods = getArrValue(config, 'arrivinggoods', []);
  var town_id;
  var i = 0;
  for (town_id in arrivinggoods)
  {
    var rows = getArrValue(arrivinggoods, town_id, []);
    var town = getCity(town_id);
    var key;
    for (key in rows)
    {
      var row = rows[key];
      var quest = getArrValue(row, "quest", "");
      if (quest == 'loading')
      {
        if (delete config.arrivinggoods[town_id][key]) i++;
        continue;
      }
      var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
      if (EmpireBoard.StartTime < arrivetime)
      {
        if (delete config.arrivinggoods[town_id][key]) i++;
        continue;
      }
    }
  }
  // if (i > 0) window.status =
  // 'Removed '+i+'
  // undelivered/loading
  // transports';
}

function dropDeliveredGoods(town_id)
{
  var rows = getArrValue(config.arrivinggoods, town_id, []);
  var town = getCity(town_id);
  var key;
  var i = 0;
  for (key in rows)
  {
    var row = rows[key];
    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
    if (arrivetime <= town.prodtime)
    {
      if (delete config.arrivinggoods[town_id][key]) i++;
    }
  }
  // if (i > 0) window.status =
  // 'Removed '+i+' delivered
  // transports';
}

function getArrivingGoodsSum(town_id, resName)
{
  var sum = 0;
  var town = getCity(town_id);
  var rows = getArrValue(config.arrivinggoods, town_id, []);
  var key;
  for (key in rows)
  {
    var row = rows[key];
    var res = row["res"];
    var a = getArrValue(res, resName, 0);
    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
    if ((a > 0) && (arrivetime > town.prodtime)) sum += a;
  }
  return sum;
}

function getDeliveredGoodsTransports(town_id, resName)
{
  var sum = 0;
  var town = getCity(town_id);
  var rows = getArrValue(config.arrivinggoods, town_id, []);
  var key;
  for (key in rows)
  {
    var row = rows[key];
    var res = row["res"];
    var a = getArrValue(res, resName, 0);
    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
    if ((a > 0) && (arrivetime > town.prodtime) && (EmpireBoard.StartTime >= arrivetime)) sum++;
  }
  return sum;
}

function getArrivingGoods(town_id, resName, tradinggoods, resAmount, ArrivingGoodsSum) {
  var sum = 0;
  var found = false;
  if (ArrivingGoodsSum == undefined) ArrivingGoodsSum = getArrivingGoodsSum(town_id, resName);
  if (ArrivingGoodsSum > 0)
  {
    sum += ArrivingGoodsSum;
    found = true;
  }

  if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
  {
    sum += parseInt(tradinggoods);
  }

  var s = "<font class='More'>-&nbsp;</font>";
  if (found == true) {
    // s = "<font class='More
    // Green'
    // "+createTooltipAttribute(tooltip)+">"+EmpireBoard.Str.FormatBigNumber(sum,
    // true)+"</font>";
    s = "<font class='More MoreGoods Green'>"+EmpireBoard.Str.FormatBigNumber(sum, true);
    if (getDeliveredGoodsTransports(town_id, resName) > 0)
    {
      s += "<sup>*</sup>";
    }
    else s += "&nbsp;";
    s += "</font>";
  }
  else if (sum > 0) {
    // s = "<font class='More'
    // "+createTooltipAttribute(tooltip)+">"+EmpireBoard.Str.FormatBigNumber(sum,
    // true)+"</font>";
    s = "<font class='More MoreGoods'>"+EmpireBoard.Str.FormatBigNumber(sum, true)+"&nbsp;</font>";
  }
  return s;
}

function createTransports(townID)
{
  var res = "<font class='More'></font>";
  var numTransports = 0;
  if (config["transports"] == undefined)
  {

  }
  else if (config["transports"][townID] != undefined)
  {
    for (key in config["transports"][townID])
    {
      if (config["transports"][townID][key].endTime >= EmpireBoard.StartTime) numTransports++;
    }

    if (numTransports > 0) res = "<font class='More'>"+numTransports+" transport(s) on way</font>";
  }

  return res;
}

function createMovements(townID)
{
  var res = "<font class='More'></font>";
  var numMovements = 0;
  if (config["movements"] == undefined)
  {

  }
  else if (config["movements"][townID] != undefined)
  {
    for (key in config["movements"][townID])
    {
      if (config["movements"][townID][key].endTime >= EmpireBoard.StartTime) numMovements++;
    }

    if (numMovements > 0) res = "<font class='More Movements'>"+numMovements+" movement(s) on way</font>";
  }

  return res;
}

function createAttacks(townID)
{
  var res = "<font class='More Red'></font>";
  var numMovements = 0;
  if (config["attacks"] == undefined)
  {

  }
  else if (config["attacks"][townID] != undefined)
  {
    for (key in config["attacks"][townID])
    {
      if (config["attacks"][townID][key].endTime >= EmpireBoard.StartTime) numMovements++;
    }

    if (numMovements > 0) res = "<font class='More Attacks Red'>under "+numMovements+" attack(s)</font>";
  }

  return res;
}

function getBuildingLink(town_id, name, action)
{
  if (action == undefined || action == "")
    action = "index";
  var link = "building_"+name+"?town_id="+town_id+ "&action=" + action;
  return link;
}

function getCityBuildingsCount(town_id, defaultValue)
{
  if (defaultValue == undefined) defaultValue = 0;
  var count = 0;
  var town = getCity(town_id);

  if (town.towntime != undefined)
  {
    for (name in town.buildings)
    {
      if (town.buildings[name].level != undefined)
      {
        count++;
      }
    }
  }

  if (count == 0) count = defaultValue;
  return count;
}

function getBuildingCount(town_id, name, defaultValue)
{
  if (defaultValue == undefined) defaultValue = 0;
  var count = 0;
  var town = getCity(town_id);

  if ((town.buildings != undefined) && (town.buildings[name] != undefined))
  {
    count = 1;
  }

  if (count == 0) count = defaultValue;
  return count;
}

// Get level instead building
// upgrading is finished
function getBuildingLevel(town_id, name, defaultValue)
{
  if (defaultValue == undefined) defaultValue = 0;
  var level = 0;
  var town = getCity(town_id);

  if ((town.buildings == undefined) || (town.buildings[name] == undefined))
  {
    if (name == 'townHall') level = 1;
    if (town.underConstructionName == name)
    {
      if (town.underConstructionTime <= EmpireBoard.StartTime) level++;
    }
  }
  else
  {
    level = getArrValue(town.buildings[name], "level", 0);
    if (town.underConstructionName == name)
    {
      if (town.underConstructionTime <= EmpireBoard.StartTime) level++;
    }
  }

  if (level == 0) level = defaultValue;
  return level;
}

function getOnePeopleGrowthTime(happiness) {
  if (happiness != 0) {
    return Math.abs(3600/0.02/happiness*1000);
  }
  return "NaN";
}


function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) {
  if (maxPopulation - population > happiness) {
    return "&#8734;"+LocalizationStrings['timeunits']['short']['hour'];
  }
  var time = Number(startTime);
  while (population < maxPopulation) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN") {
      return "&#8734;"+LocalizationStrings['timeunits']['short']['hour'];
    }
    time += t;
    population++;
    happiness--;
  }
  // return
  // EmpireBoard.Str.FormatFloatNumber((time
  // - Number(startTime)) /
  // 1000 / 3600, 1) + "h";
  return getTimestring(time - Number(startTime));
}


// Current selected town
if (current_town_id > 0)
{
  var res = getCity(current_town_id);

  res.wood = uW.Layout.resources['wood'];
  res.iron = uW.Layout.resources['iron'];
  res.stone = uW.Layout.resources['stone'];
  res.favor = uW.Layout.favor;
  res.storage_volume = uW.Layout.storage_volume;
  res.max_favor = uW.Layout.max_favor;

  // Resources to sold
  var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='townResources']//li[@class='wood']/div[@class='tooltip']");
  if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
  {
    res.tradewood = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
  }
  else
  {
    res.tradewood = 0;
  }
  var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='townResources']//li[@class='iron']/div[@class='tooltip']");
  if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
  {
    res.tradefav = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
  }
  else
  {
    res.tradefav = 0;
  }
  var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='townResources']//li[@class='stone']/div[@class='tooltip']");
  if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
  {
    res.tradestone = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
  }
  else
  {
    res.tradestone = 0;
  }
  var wareNode = EmpireBoard.DOM.Get_First_Node_TextContent("//div[@id='townResources']//li[@class='favor']/div[@class='tooltip']");
  if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
  {
    res.tradefav = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
  }
  else
  {
    res.tradefav = 0;
  }

  digProducedResources(res);

  res.population = uW.Layout.population;
  res.citizens = 0;

  dropDeliveredGoods(current_town_id);


  if (EmpireBoard.Grepolis.View() == "plunder")
  {
    function reportPlunder()
    {
      // setViewRqTime('merchantNavy');
      setViewRqTime('finances');
      setViewRqTime('militaryAdvisorMilitaryMovements');
      EmpireBoard.DB.Save();
    }

    var n = document.getElementById("plunderbutton");
    n.addEventListener("click", reportPlunder, false);
  }

  if (EmpireBoard.Grepolis.View() == "transport")
  {
    function reportTransport()
    {
      setViewRqTime('merchantNavy');
      EmpireBoard.DB.Save();
    }

    var n = document.getElementById("submit");
    n.addEventListener("click", reportTransport, false);
  }

  if (EmpireBoard.Grepolis.View() == 'deployment')
  {
    function reportDeployment()
    {
      var dType = EmpireBoard.DOM.Get_First_Node_Value("//form[@id='deploymentForm']/input[@name='function']", '');
      if (dType == 'deployFleet')
      {
        dType = 'townMilitary-fleet';
      }
      else
      {
        dType = 'townMilitary-army';
      }
      var destinationCityId = EmpireBoard.DOM.Get_First_Node_Value("//form[@id='deploymentForm']/input[@name='destinationCityId']", '');
      setViewRqTime(dType, current_town_id);
      setViewRqTime('finances');
      setViewRqTime('militaryAdvisorMilitaryMovements');
      EmpireBoard.DB.Save();
    }

    var dSubmit = EmpireBoard.DOM.Get_First_Node("//form[@id='deploymentForm']//input[@type='submit']");
    dSubmit.addEventListener("click", reportDeployment, false);
  }

  if (EmpireBoard.Grepolis.View() == 'resource')
  {
    function reportResource()
    {
      setViewRqTime('finances');
      EmpireBoard.DB.Save();
    }

    var n = document.getElementById("inputWorkersSubmit");
    n.addEventListener("click", reportResource, false);
  }

  if (EmpireBoard.Grepolis.View() == 'tradegood')
  {
    function reportTradegood()
    {
      setViewRqTime('finances');
      EmpireBoard.DB.Save();
    }

    var n = document.getElementById("inputWorkersSubmit");
    n.addEventListener("click", reportTradegood, false);
  }
}

// If main view is a town
if (town_idmainView > 0)
{
  var res = getCity(town_idmainView);
  res.storage_volume = storage_volume;
  res.max_favor = max_favor;

  // Fetch levels
  if (EmpireBoard.Grepolis.View() == "building_main")
  {
    var gtb=uW.BuildingMain.buildings;
    for (name in res.buildings) {
      res.buildings[name].level = undefined;
    }
    for (name in gtb) {
      if (res.buildings[name] == undefined) {
        res.buildings[name] = {};
        res.buildings[name].level = undefined;
        res.buildings[name].link = '';
        res.buildings[name].name = '';
        res.buildings[name].data = {};
      }
      res.buildings[name].level = gtb[name].level;
      res.buildings[name].name = config.buildings[name].name;
      res.buildings[name].data = gtb[name];
      EmpireBoard.Log.Add('main: name='+res.buildings[name].name+", level="+res.buildings[name].level);
    }
    EmpireBoard.DB.Save();
  }

  // Vue ville
  if (EmpireBoard.Grepolis.View() == 'index')
  {
    // Add new buildings
    var gtb=uW.buildings;
    for (name in res.buildings) {
      res.buildings[name].level = undefined;
    }
    for (name in gtb) {
      if (gtb[name] != undefined)
      {
        if (res.buildings[name] == undefined)
        {
          res.buildings[name] = {};
          res.buildings[name].level = undefined;
          res.buildings[name].link = '';
          res.buildings[name].name = '';
          res.buildings[name].data = {};
        }
        res.buildings[name].level = gtb[name].level;
        res.buildings[name].name = config.buildings[name].name;
        res.buildings[name].data = gtb[name];
        EmpireBoard.Log.Add('index: name='+res.buildings[name].name+", level="+res.buildings[name].level);
      }
      else
      {
        if (res.buildings[name] != undefined) {
          // fix if not building
          try
          {
            delete config[town_idmainView].buildings[name];
          }
          catch (e)
          {
          }
        }
      }     
    }

    // Nouvelle construction
    var node = EmpireBoard.DOM.Get_Nodes("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]");
    if (node.snapshotLength >= 1) {
      res.underConstruction = node.snapshotItem(0).title;
      res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");

      // Search townCountdown
      var scripts = document.getElementsByTagName("script");
      var found = false;
      var sCode = '';
      for (var j = 0; j < scripts.length; j++)
      {
        var nScript = scripts[j];
        sCode = nScript.innerHTML;
        if (sCode.indexOf('townCountdown') >= 0)
        {
          found = true;
          break;
        }
      }
      if (found == true)
      {
        var enddate = 0;
        var currentdate = 0;
        if (/enddate[^0-9]*([0-9]+)/.exec(sCode) != null) {
          enddate = parseFloat(RegExp.$1) * 1000;
        }
        if (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) {
          currentdate = parseFloat(RegExp.$1) * 1000;
        }
        if (enddate != 0 && currentdate != 0) {
          res.underConstructionTime = enddate - currentdate + new Date().getTime();
        }
      }
    } else {
      res.underConstruction = "-";
      res.underConstructionName = "";
      res.underConstructionTime = 0;
    }

    res.towntime = EmpireBoard.StartTime;
  }

  // military-army and fleet unit counts
  if ((EmpireBoard.Grepolis.View() == "index"))
  {
    if (res.units == undefined) { res.units = {}; }

    for (name in res.units) {
      res.units[name].count = undefined;
    }

    $("#units_land .index_unit").add("#units_sea .index_unit").each(function(index) {
      var name=$(this).attr("id");
      var count=$(this).find(".black").text();
      if (res.units[name] == undefined)
      {
        res.units[name] = {};
        res.units[name].count = undefined;
        res.units[name].name = '';
        res.units[name].data = {};
      }
      if (count != undefined)
        res.units[name].count = count;
      res.units[name].name = name;

      EmpireBoard.Log.Add('name='+name+", count="+count);
    })

    uW.addEventListener("load", EmpireBoard.ViewIsIndexMovements, false);

    if (EmpireBoard.Grepolis.View() == "townMilitary-army")
    {
      res.townMilitaryarmytime = EmpireBoard.StartTime;
    }
    else if (EmpireBoard.Grepolis.View() == "townMilitary-fleet")
    {
      res.townMilitaryfleettime = EmpireBoard.StartTime;
    }
  }

  // military-army unit counts
  if ((EmpireBoard.Grepolis.View() == "building_barracks") || (EmpireBoard.Grepolis.View() == "building_docks"))
  {
    if (config["upkeeps"] == undefined) { config["upkeeps"] = {}; }
    if (res.units == undefined) { res.units = {}; }

    var gameUnits=uW.UnitOrder.units; 
    for (name in gameUnits) { 
      if (gameUnits[name] != undefined) 
      { 
        res.units[name].name = name;
        res.units[name].count = gameUnits[name].count;
        EmpireBoard.Log.Add('unit='+unitId+", construction="+gameUnits[index].construction); 
      } 
    }

    var gameUnitsOrders=uW.UnitOrder.orders; 
    for (index in gameUnitsOrders) 
    { 
      if  (gameUnitsOrders[index] != undefined) 
      { 
        unitId = gameUnitsOrders[index].unit_id; res.units[unitId].construction += gameUnitsOrders[index].units_left; 
        EmpireBoard.Log.Add('order='+unitId+", construction="+gameUnitsOrders[index].construction); 
      } 
    }

    $("#unit_order > #units .black").each(function(index) {
      var name=$(this).parent().parent().parent().attr("id");
      var count=$(this).text();
      if (res.units[name] == undefined)
      {
        res.units[name] = {};
        res.units[name].count = undefined;
        res.units[name].name = '';
        res.units[name].data = {};
      }
      res.units[name].count = count;
      res.units[name].name = name;

      EmpireBoard.Log.Add('$unit='+name+", count="+count);
    });

    $("#unit_order > #tasks #unit_order_0").each(function(index) {
      EmpireBoard.Log.Add('XX');

      var src=$(this).find(".unit_order_task_unit").attr("src");
      var name = undefined;
      var result = src.match(/.*units\.(.+)_50x50.png/);
      if (result)
      {
        name = RegExp.$1;
      }
      EmpireBoard.Log.Add('$order='+name);
      var count=$(this).find(".unit_order_task_value").html();

      if (res.units[name] == undefined)
      {
        res.units[name] = {};
        res.units[name].count = undefined;
        res.units[name].construction = undefined;
        res.units[name].name = '';
        res.units[name].data = {};
      }
      res.units[name].construction = count;
      res.units[name].name = name;

      EmpireBoard.Log.Add('$order='+name+", count="+count);
    });


    // Search units under
    // construction
    /*
     * var currentUnit =
     * EmpireBoard.DOM.Get_First_Node("//div[@id='unitConstructionList']//div[contains(@class,
     * 'currentUnit')]"); if (currentUnit != null) { var currentUnit_id = 'unit
     * '+EmpireBoard.Grepolis.Trim_Unit(currentUnit.className);
     * res.units[currentUnit_id].construction = 1; // Fetch queue var simUnits =
     * 0; var Amounts =
     * EmpireBoard.DOM.Get_Nodes("//div[@id='unitConstructionList']//li/div[@class='amount']");
     * if (Amounts.snapshotLength >= 1) { for (var i = 0; i <
     * Amounts.snapshotLength; i++) { var Amount = Amounts.snapshotItem(i); var
     * AmountInt = EmpireBoard.Str.To_Integer(Amount.textContent, 1); var
     * unit_id = 'unit
     * '+EmpireBoard.Grepolis.Trim_Unit(Amount.parentNode.className);
     * 
     * res.units[unit_id].construction = res.units[unit_id].construction +
     * AmountInt; if (unit_id == currentUnit_id) { simUnits = simUnits +
     * AmountInt; } } }
     * 
     * var found = false;
     * 
     * var scripts = document.getElementsByTagName("script"); for (var j =
     * scripts.length-1; j >= 0; j--) { // search getCountdown var nScript =
     * scripts[j]; var sCode = nScript.innerHTML; if
     * (sCode.indexOf('buildProgress') > 0) { found = true; break; } } if (found ==
     * true) { var enddate = 0; if (/enddate[^0-9]*([0-9]+)/.exec(sCode) !=
     * null) { enddate = parseFloat(RegExp.$1) * 1000; } var currentdate = 0; if
     * (/currentdate[^0-9]*([0-9]+)/.exec(sCode) != null) { currentdate =
     * parseFloat(RegExp.$1) * 1000; } var startdate = 0; if
     * (/startdate[^0-9]*([0-9]+)/.exec(sCode) != null) { startdate =
     * parseFloat(RegExp.$1) * 1000; }
     * 
     * setViewRqTime(EmpireBoard.Grepolis.View(), town_idmainView,
     * EmpireBoard.StartTime + (enddate - currentdate) + simUnits * (enddate -
     * startdate), true); } }
     */
  }

} else {
  if (EmpireBoard.Grepolis.View() == "militaryAdvisorMilitaryMovements")
  {
    EmpireBoard.ViewIsMilitaryMovements();
  }
  else if (EmpireBoard.Grepolis.View() == 'premium')
  {
    EmpireBoard.ViewIsPremium();
  }
  else if (EmpireBoard.Grepolis.View() == 'researchOverview')
  {
    EmpireBoard.ViewIsResearchOverview();
  }
  else if (EmpireBoard.Grepolis.View() == "finances")
  {
    EmpireBoard.ViewIsFinances();
  }

  if (EmpireBoard.Grepolis.View() == "merchantNavy")
  {
    if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = {};
    dropUndeliveredLoadingGoods();

    config["transports"] = {};
    function addTransport(townID, transportID, endTime, subject, ttownName)
    {
      if (config["transports"][townID] == undefined) config["transports"][townID] = {};
      if (config["transports"][townID][transportID] == undefined) config["transports"][townID][transportID] = {};
      config["transports"][townID][transportID].endTime = endTime;
    }

    var foundLoading = false;
    var takeSomething = false;
    var resMi = EmpireBoard.DOM.Get_Nodes("//div[@id='mainview']//td[contains(@class, 'mission')]");
    if (resMi.snapshotLength > 0)
    {
      // Villes du joueur
      var citiesIDs = {};
      var citiesNames = {};
      var res = EmpireBoard.DOM.Get_Nodes("//select[@id='townSelect']/option");
      for(var i = 0; i < res.snapshotLength; i++)
      {
        var n = res.snapshotItem(i);
        var cName = EmpireBoard.Grepolis.Trim_Coords(n.textContent);
        var cID = parseInt(n.value);
        citiesIDs[cName] = cID;
        citiesNames[cID] = cName;
      }

      // heures
      var mTimers = {};
      var scripts = document.getElementsByTagName("script");
      for (var j = 0; j < scripts.length; j++)
      {
        // search
        // getCountdown
        var nScript = scripts[j];
        var sCode = nScript.innerHTML;
        if (sCode.indexOf('getCountdown') > 0)
        {
          var aCodeLines = sCode.split(';');
          for (var i=0; i < aCodeLines.length-1; i++)
          {
            var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
            var sParts = sValues.split(',');

            var sPart0 = sParts[0].split(':');
            var enddate = 1000*parseInt(EmpireBoard.Str.Trim(sPart0[1]));

            var sPart1 = sParts[1].split(':');
            var currentdate = 1000*parseInt(EmpireBoard.Str.Trim(sPart1[1]));

            var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));

            mTimers[sID] = EmpireBoard.StartTime + Math.abs(enddate - currentdate);
            EmpireBoard.Log.Add("mTimers["+sID+"] = "+(enddate - currentdate));
          }
        }
      }

      // infos
      for (var i = 0; i < resMi.snapshotLength; i++)
      {
        var nMi = resMi.snapshotItem(i);
        var tr = nMi.parentNode;
        var tds = tr.getElementsByTagName("td");
        var nSource = tds[1];
        var nTarget = tds[3];
        var nETA = tds[4];
        var nRET = tds[5];
        var nAc = tds[6];

        if (nETA.id == '') continue;
        if (nRET.id == '') continue;
        EmpireBoard.Log.Add('nETA.id = '+nETA.id);

        var trPayload = tr.nextSibling;
        var payload = trPayload.getElementsByTagName("img");
        var foundGoods = false;
        var foundArmy = false;
        var PayloadGoods = {};
        if (payload.length > 0)
        {
          var rKey = '';
          for (var j = 0; j < payload.length; j++)
          {
            if (payload[j].src.indexOf('wood') > 0)
            {
              if (rKey == 'wood') continue;
              rKey = 'wood';
              foundGoods = true;
            }
            else if (payload[j].src.indexOf('iron') > 0)
            {
              if (rKey == 'iron') continue;
              rKey = 'iron';
              foundGoods = true;
            }
            else if (payload[j].src.indexOf('stone') > 0)
            {
              if (rKey == 'stone') continue;
              rKey = 'stone';
              foundGoods = true;
            }
            else if (payload[j].src.indexOf('slinger') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('swordsman') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('phalanx') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('spearman') > 0)
            {
              // v 3.2
              // unit
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('archer') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('marksman') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('gyrocopter') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('steamgiant') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('bombardier') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('ram') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('catapult') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('mortar') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('medic') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else if (payload[j].src.indexOf('cook') > 0)
            {
              rKey = '';
              foundArmy = true;
              continue;
            }
            else
            {
              rKey = '';
              continue;
            }

            if ((PayloadGoods[rKey] == undefined) && ((rKey == 'wood') || (rKey == 'iron') || (rKey == 'stone') || (rKey == 'favor')))
            {
              var rAmnt = EmpireBoard.Str.To_Integer(payload[j].title);
              PayloadGoods[rKey] = rAmnt;
            }
          }
        }

        var townSource;
        var townTarget;
        var quest;
        if (nMi.className.indexOf('gotoown') > 0)
        {
          if (foundArmy == true)
          {
            continue;
          }
          else
          {
            townSource = EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent);
            townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nTarget.textContent)];
            quest = 'gotoown';
            if (mTimers[nETA.id] == undefined)
            {
              mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
              quest = 'loading';
            }
            else if (nAc.innerHTML == '')
            {
              townSource = EmpireBoard.Grepolis.Trim_PlayerName(nTarget.textContent);
              townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)];
              quest = 'halfturn';
            }
            addTransport(citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
            if (foundGoods == false) continue;
          }
        }
        else if (nMi.className.indexOf('returning') > 0)
        {
          quest = 'returning';
          if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
          {
            if (foundGoods == true)
            {
              townSource = EmpireBoard.Str.Trim(nTarget.textContent);
              townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)];
              if (townTarget == undefined)
              {
                townSource = EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent);
                townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nTarget.textContent)];
              }
            }
            else continue;
          }
          else if ((foundArmy == true) && (foundGoods == false))
          {
            continue;
          }
          else
          {
            if (mTimers[nETA.id] == undefined)
            {
              mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
              quest = 'loading';
            }
            townSource = EmpireBoard.Str.Trim(nTarget.textContent);
            townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)];
            if (foundArmy == false) addTransport(citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
            if (foundGoods == false) continue;
          }
        }
        else if (nMi.className.indexOf('gotoforeign') > 0)
        {
          quest = 'gotoforeign';
          if (tr.parentNode.parentNode.parentNode.parentNode.id == 'plunderingTransports')
          {
            quest = 'plundering';
            if ((mTimers[nETA.id] != undefined) && (mTimers[nETA.id] > EmpireBoard.StartTime))
            {
              takeSomething = true;
              setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]) + (1000*60*15));
            }
            else if ((mTimers[nRET.id] != undefined) && (mTimers[nRET.id] > EmpireBoard.StartTime))
            {
              takeSomething = true;
              setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*15));
            }
            continue;
          }
          else if (foundArmy == true)
          {
            continue;
          }
          else
          {
            if (mTimers[nRET.id] != undefined)
            {
              addTransport(citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nRET.id]);
            }
            else if (mTimers[nETA.id] != undefined)
            {
              addTransport(citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)], nETA.id, mTimers[nETA.id]);
            }
            else
            {
              addTransport(citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)], nETA.id, EmpireBoard.StartTime + (1000*60*15));
            }

            if ((foundGoods == true) && (nAc.innerHTML != ''))
            {
              continue;
            }
            else if ((foundGoods == true) && (nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
            {
              townSource = EmpireBoard.Str.Trim(nTarget.textContent);
              townTarget = citiesIDs[EmpireBoard.Grepolis.Trim_PlayerName(nSource.textContent)];
              if (mTimers[nRET.id] != undefined)
              {
                mTimers[nETA.id] = mTimers[nRET.id];
              }
              else
              {
                mTimers[nETA.id] = EmpireBoard.StartTime + (1 * 20 * 60 * 1000);
              }
              quest = 'loading';
            }
            else if ((foundGoods == false) && (nAc.innerHTML != ''))
            {
              if (mTimers[nETA.id] != undefined)
              {
                takeSomething = true;
                setViewRqTime('merchantNavy', 0, parseInt(mTimers[nETA.id]));
              }
            }

            if (foundGoods == false) continue;
          }
        }
        else continue;

        if ((foundGoods == true) && (townTarget != undefined) && (mTimers[nETA.id] != undefined))
        {
          if (config["arrivinggoods"][townTarget] == undefined) config["arrivinggoods"][townTarget] = {};
          var idx = nETA.id;
          if (config["arrivinggoods"][townTarget][idx] == undefined) config["arrivinggoods"][townTarget][idx] = {};
          config["arrivinggoods"][townTarget][idx]["starttown"] = townSource;
          if (config["arrivinggoods"][townTarget][idx]["res"] == undefined) config["arrivinggoods"][townTarget][idx]["res"] = PayloadGoods;
          config["arrivinggoods"][townTarget][idx]["quest"] = quest;
          config["arrivinggoods"][townTarget][idx]["arrivetime"] = parseInt(mTimers[nETA.id]);

          if (quest != 'loading')
          {
            setViewRqTime('', townTarget, parseInt(mTimers[nETA.id]));
          }
          else
          {
            foundLoading = true;
            setViewRqTime('merchantNavy', 0, EmpireBoard.StartTime + (1000*60*10));
          }
        }
      }
    }

    // disable attention
    if ((foundLoading != true) && (takeSomething != true))
    {
      setViewRqTime('merchantNavy', 0);
    }

    config.merchantNavytime = EmpireBoard.StartTime;
    EmpireBoard.Log.Add("Registered merchant transports");
  }

}

/*******************************************************************************
 * Render tables
 ******************************************************************************/
function renderAcademyTable()
{
  var Cities = EmpireBoard.DB.OwnCities;

  if ( 1 /* TABLE_ACADEMY */)
  {
    var orderedEntries = {};

    orderedEntries['main']       = 'growth';
    orderedEntries['place']        = 'growth';
    orderedEntries['farm']         = 'growth';

    orderedEntries['academy']        = 'research';
    orderedEntries['temple']         = 'research';

    orderedEntries['storage']      = 'trading';
    orderedEntries['market']     = 'trading';

    orderedEntries['wall']         = 'military';
    orderedEntries['hide']       = 'military';
    orderedEntries['barracks']       = 'military';
    orderedEntries['docks']      = 'military';

    orderedEntries['lumber']       = 'resource';
    orderedEntries['stoner']     = 'resource';
    orderedEntries['ironer']       = 'resource';

    orderedEntries['theater']        = 'additional';
    orderedEntries['statue']         = 'additional';
    orderedEntries['thermal']      = 'additional';
    orderedEntries['oracle']       = 'additional';

  }
}

function renderBuildingsTable()
{
  var Cities = EmpireBoard.DB.OwnCities;
  var s = "";

  var orderedBuildings = {};

  orderedBuildings['main']       = 'growth';
  orderedBuildings['place']        = 'growth';
  orderedBuildings['farm']         = 'growth';

  orderedBuildings['academy']        = 'research';
  orderedBuildings['temple']         = 'research';

  orderedBuildings['storage']      = 'trading';
  orderedBuildings['market']     = 'trading';

  orderedBuildings['wall']         = 'military';
  orderedBuildings['hide']       = 'military';
  orderedBuildings['barracks']       = 'military';
  orderedBuildings['docks']      = 'military';

  orderedBuildings['lumber']       = 'resource';
  orderedBuildings['stoner']     = 'resource';
  orderedBuildings['ironer']       = 'resource';

  orderedBuildings['theater']        = 'additional1';
  orderedBuildings['thermal']      = 'additional1';
  orderedBuildings['library']      = 'additional1';
  orderedBuildings['lighthouse']         = 'additional1';

  orderedBuildings['tower']        = 'additional2';
  orderedBuildings['statue']         = 'additional2';
  orderedBuildings['oracle']       = 'additional2';
  orderedBuildings['trade_office']       = 'additional2';

  var townId;
  var i = 0;
  s += "<div id='EmpireBoardBuildings' class='Table'><table class='Overview Buildings'>";
  s += "<thead><tr><th class='townName' nowrap>"+texts["townName"]+"</th>";
  s += "<th class='actions' nowrap>"+EmpireBoard.Renders.Buildings_HeaderIcons(current_town_id)+"</th>";
  var firstStyle = "";
  var buildsNum = 0;
  var lastTopic = '';
  for (key in orderedBuildings)
  {
    if (lastTopic != orderedBuildings[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
    s += '<th id="building_main" class="overviews_building regular" style="background-image: url(&quot;http://static.grepolis.com/images/game/main/'+key+'.png&quot;);" '+createTooltipAttribute(config.buildings[key].name)+'></th>';
    lastTopic = orderedBuildings[key];
    buildsNum++;
  }
  if (buildsNum <= 1) s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th>";
  s += "</tr></thead>";

  s += "<tbody>";

  var townId;
  var i = 0;
  for (townId in Cities)
  {
    var res = getCity(townId);

    var trclass = (parseInt(current_town_id) == parseInt(townId)) ? "current" : "";
    s += "<tr class='"+trclass+"' townid='"+townId+"'>";
    var usedspaces = getCityBuildingsCount(townId, 0);
    s += "<td class='townName' nowrap>"+createLinkToChangeCity(Cities[townId].name, townId, i)+"</td>";
    s += "<td class='actions' nowrap>"+createLinkToBuildingMain(townId)+"</td>";
    var firstStyle = "";
    var lastTopic = '';
    for (key in orderedBuildings)
    {
      if (lastTopic != orderedBuildings[key]) { firstStyle = "lf"; } else { firstStyle = ""; }
      if (res.buildings[key] != undefined)
      {
        var level = getBuildingLevel(parseInt(townId), key, 0);
        var currentBuildingStyle = "";
        if ((key == EmpireBoard.Grepolis.View()) && (parseInt(townId) == town_idmainView) && (position == town_positionmainView))
        {
          currentBuildingStyle = " Bold";
        }

        if (level == undefined || level == "" || level == 0)
        {
          level = "-";
        }

        var link = getBuildingLink(townId, key, 'index');

        if (res.underConstructionName == key)
        {
          if (level == "-") { level = 0; }
          var underConstructionTime = res.underConstructionTime;
          // deprecated
          if (underConstructionTime == undefined)
            underConstructionTime = res.underConstruction.split(",")[1];
          var sdate = smartDateFormat(underConstructionTime);
          if (underConstructionTime <= EmpireBoard.StartTime)
          {
            var levellink = level;
            if (link != "-")
              levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" townid="+townId+">"+level+"</a>";
            levellink += '<sup class=Red title="Require attention">!</sup>';
            levelUpgrading = createTooltip(levellink, sdate, texts["finishedBuilding"]+':' );
          }
          else
          {
            var counter = "<font id='mytimecounter' counter='"+Math.round(underConstructionTime)+"' class='time_counter'>__:__:__</font>";
            var levellink =level+"&raquo;"+(level+1);
            if (link != "-")
              levellink = "<a href='" + link + "' class=\"changeCity Green Bold\" townid="+townId+">"+level+"&raquo;"+(level+1)+"</a>";
            if ((level > 0) && (reportViewToSurvey(key, townId) == '!'))
            {
              levellink += '<sup class=Red title="Require attention">!</sup>';
            }
            else
            {
              levellink += '&nbsp;';
            }
            levelUpgrading = createTooltip(levellink, sdate +' ('+ counter+')', texts["currentlyBuilding"]+':');
          }
          s += "<td level='"+level+"' view='"+key+"' position='"+position+"' class='"+firstStyle+" "+key+" "+currentBuildingStyle+"'>"+levelUpgrading+"</td>";
        }
        else
        {
          var levellink =level;
          if (level != "-")
          {
            levellink = "<a href='" + link + "' class=changeCity townid="+townId+">"+level+"</a>";

            if (reportViewToSurvey(key, townId) == '!')
            {
              levellink += '<sup class=Red title="Require attention">!</sup>';
            }
            else
            {
              levellink += '&nbsp;';
            }
          }
          else
          {
            levellink += '&nbsp;';
          }
          s += "<td level='"+level+"' view='"+key+"' class='"+firstStyle+" "+key+" "+currentBuildingStyle+"'>"+levellink+"</td>";
        }
        firstStyle = '';
      }
      else
      {
        s += "<td level='0' view='"+key+"' class='"+firstStyle+" "+key+"'>-&nbsp;</td>";
        firstStyle = '';
      }
      lastTopic = orderedBuildings[key];
    }
    if (buildsNum <= 1) s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td>";
    s += "</tr>";
    i++;
  }

  s += "</tbody>";

  s += "<tfoot></tfoot></table>";
  s += "<p class='Caption'>(<span class=Green>1-14</span>) available free spaces for new buildings. (<span class=Red>!</span>) require your attention to update overview's data.</p>";
  s += "</div>";

  return s;
}

function renderResourcesTable()
{
  var Cities = EmpireBoard.DB.OwnCities;
  var s = "";

  s += "<div id='EmpireBoardResources' class='Table'><table class='Overview Resources'>";
  s += "<thead><tr>";
  s += "<th class='townName' nowrap>"+texts["townName"]+"</th>"+
  "<th class='actions' nowrap>"+createLinkToFinanceNavyViews()+"</th>"+
  "<th colspan=2 class='lf wood' style='background-image:url(\"http://static.grepolis.com/images/game/layout/resources.png\");  background-repeat:no-repeat; background-position:center 0px;'></th>"+
  "<th colspan=2 class='lf stone' style='background-image:url(\"http://static.grepolis.com/images/game/layout/resources.png\");  background-repeat:no-repeat; background-position:center -30px;'></th>"+
  "<th colspan=2 class='lf iron' style='background-image:url(\"http://static.grepolis.com/images/game/layout/resources.png\");  background-repeat:no-repeat; background-position:center -60px;'></th>"+
  "<th colspan=2 class='lf fav' style='background-image:url(\"http://static.grepolis.com/images/game/layout/resources.png\");  background-repeat:no-repeat; background-position:center -150px;'></th>";
  s += "</tr></thead>";

  s += "<tbody>";

  var sumres = new EmpireBoard.Grepolis.City_Object();
  sumres.spacetotal = 0;
  sumres.growth = 0;
  sumres.Income = 0;
  sumres.Research = 0;
  var sumProd = new EmpireBoard.Grepolis.City_Object();
  var sumArTr = new EmpireBoard.Grepolis.City_Object();

  var townId;
  var i = 0;
  for (townId in Cities)
  {
    var res = getCity(townId);
    var curres = new EmpireBoard.Grepolis.City_Object();
    var arrres = new EmpireBoard.Grepolis.City_Object();

    curres.wood = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.wood, res.prodwood);
    curres.iron = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.iron, res.prodiron);
    curres.stone = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.stone, res.prodstone);
    curres.favor = getCurrentResourceAmount(EmpireBoard.StartTime, res.prodtime, res.favor, res.prodfav);

    if (res.tradewood == undefined) res.tradewood = 0;
    if (res.tradeiron == undefined) res.tradeiron = 0;
    if (res.tradestone == undefined) res.tradestone = 0;
    if (res.tradefav == undefined) res.tradefav = 0;

    arrres.wood = getArrivingGoodsSum(townId, 'wood');
    arrres.iron = getArrivingGoodsSum(townId, 'iron');
    arrres.stone = getArrivingGoodsSum(townId, 'stone');
    arrres.favor = getArrivingGoodsSum(townId, 'favor');

    sumres.wood += curres.wood;
    sumres.iron += curres.iron;
    sumres.stone += curres.stone;
    sumres.favor += curres.favor;

    sumProd.wood += res.prodwood;
    sumProd.iron += res.prodiron;
    sumProd.stone += res.prodstone;
    sumProd.favor += res.prodfav;

    sumArTr.wood += res.tradewood + arrres.wood;
    sumArTr.iron += res.tradeiron + arrres.iron;
    sumArTr.stone += res.tradestone + arrres.stone;
    sumArTr.favor += res.tradefav + arrres.favor;

    var trclass = "";
    if (parseInt(current_town_id) == parseInt(townId)) {
      trclass = "current";
    }

    var growthStyle = "";
    var warehouseLevel = getBuildingLevel(townId,"storage", 0, -1);
    var maxcount = res.storage_volume;
    var maxfavor = res.max_favor;
    var maxsafe = EmpireBoard.Grepolis.Resource_Safecapacity('wood',warehouseLevel,0);
    // EmpireBoard.Log.Add('Storage volume of ' + townId + ': ' +maxcount+"
    // ("+maxsafe+")");

    var townLink = '';
    if (reportViewToSurvey('',townId) == '!')
    {
      townLink = createLinkToChangeCity(Cities[townId].name, townId, i, reportViewToSurvey('',townId),'Red', 'Require attention');
    }
    else
    {
      townLink = createLinkToChangeCity(Cities[townId].name, townId, i , res.actions, 'Green', 'Available action points');
    }

    s += "<tr class='"+trclass+"' townid='"+townId+"' tradegood='"+res.prodgood+"'>";
    s += "<td class='townName' nowrap>"+
    townLink+
    createTransports(townId)+"</td>"+
    "<td class='actions' nowrap>"+
    createLinkToMap(townId)+
    createLinkToAgora(townId)+"<br />"+
    createLinkToTransportGoods(townId)+"</td>"+
    "<td class='lf' resource='wood'>"+
    createResCounter(res.prodtime, res.wood, res.prodwood, false, maxcount, res.tradewood, maxsafe)+
    getArrivingGoods(townId, "wood", res.tradewood, curres.wood, arrres.wood)+
    createResProgressBar(res.prodtime, res.wood + arrres.wood, res.prodwood, maxcount - res.tradewood, maxsafe)+
    "</td>"+
    "<td>"+createProd(res.prodwood)+"</td>"+
    "<td class='lf' resource='stone'>"+
    createResCounter(res.prodtime, res.stone, res.prodstone, false, maxcount, res.tradestone, maxsafe)+
    getArrivingGoods(townId, "stone", res.tradestone, curres.stone, arrres.stone)+
    createResProgressBar(res.prodtime, res.stone + arrres.stone, res.prodstone, maxcount - res.tradestone, maxsafe)+
    "</td>"+
    "<td>"+createProd(res.prodstone)+"</td>"+
    "<td class='lf' resource='iron'>"+
    createResCounter(res.prodtime, res.iron, res.prodiron, true, maxcount, res.tradefav, maxsafe, arrres.iron)+
    getArrivingGoods(townId, "iron", res.tradefav, curres.iron, arrres.iron)+
    createResProgressBar(res.prodtime, res.iron + arrres.iron, res.prodiron, maxcount - res.tradeiron, maxsafe)+
    "</td>"+
    "<td>"+createSimpleProd(res.prodiron)+"</td>"+
    "<td class='lf' resource='favor'>"+
    createResCounter(res.prodtime, res.favor, res.prodfav, false, maxfavor, res.tradefav, maxfavor)+
    getArrivingGoods(townId, "favor", res.tradefav, curres.favor, arrres.favor)+
    createResProgressBar(res.prodtime, res.favor + arrres.favor, res.prodfav, maxfavor - res.tradefav, maxfavor)+
    "</td>"+
    "<td>"+createProd(res.prodfav)+"</td>";
    s += "</tr>";
    i++;
  }

  s += "</tbody>";

  s += "<tfoot class='Summary'><tr>";
  s += "<td nowrap colspan=2><img vspace=2 hspace=5 src='http://s2.de.ikariam.com/skin/layout/sigma.gif'></td>"+
  "</td>"+
  "<td class='lf'>"+
  createResCounter(EmpireBoard.StartTime, sumres.wood, sumProd.wood)+
  createMoreGoods(sumArTr.wood)+
  "</td>"+
  "<td>"+createProd(sumProd.wood)+"</td>"+
  "<td class='lf'>"+
  createResCounter(EmpireBoard.StartTime, sumres.stone, sumProd.stone)+
  createMoreGoods(sumArTr.stone)+
  "</td>"+
  "<td>"+createProd(sumProd.stone)+"</td>"+
  "<td class='lf'>"+
  createResCounter(EmpireBoard.StartTime, sumres.iron, sumProd.iron, true)+
  createMoreGoods(sumArTr.iron)+
  "</td>"+
  "<td>"+createSimpleProd(sumProd.iron)+"</td>"+
  "<td class='lf'>"+
  createResCounter(EmpireBoard.StartTime, sumres.favor, sumProd.favor)+
  createMoreGoods(sumArTr.favor)+
  "</td>"+
  "<td>"+createProd(sumProd.favor)+"</td>";
  s += "</tr></tfoot>";
  s += "</table>";
  s += "<p class='Caption'>(<span class=Green>1-9</span>) available action points. (<span class=Red>!</span>) require your attention to update overview's data. (<img src='http://s2.de.ikariam.com/skin/layout/icon-wall.gif' class='Safe' />) resources safe against pillaging. (<span class=Green>*</span>) some resources delivered.</p>";
  s += "</div>";

  return s;
}

function renderArmyTable()
{
  var Cities = EmpireBoard.DB.OwnCities;
  var s = "";

  var FleetUpkeepBonus = 0;
  if (config["research"].FleetUpkeepBonus != undefined) FleetUpkeepBonus = config["research"].FleetUpkeepBonus;

  var ArmyUpkeepBonus = 0;
  if (config["research"].ArmyUpkeepBonus != undefined) ArmyUpkeepBonus = config["research"].ArmyUpkeepBonus;

  function applyUpkeepBonus(value, bonus)
  {
    if ((value == '-') || (value == '?') || (value == 0) || (bonus == 0))
    {
      return value;
    }
    else
    {
      return (value - (value/100*bonus));
    }
  }

  var orderedUnits = {}; 
  orderedUnits['militia']="army XXX";
  orderedUnits['sword']="army XXX";
  orderedUnits['slinger']="army XXX";
  orderedUnits['archer']="army XXX";
  orderedUnits['hoplite']="army XXX";
  orderedUnits['rider']="army XXX";
  orderedUnits['chariot']="army XXX";
  orderedUnits['catapult']="army XXX";
  orderedUnits['centaur']="army XXX";
  orderedUnits['harpy']="army XXX";
  orderedUnits['manticore']="army XXX";
  orderedUnits['medusa']="army XXX";
  orderedUnits['minotaur']="army XXX";
  orderedUnits['pegasus']="army XXX";
  orderedUnits['sea_monster']="ship XXX";
  orderedUnits['zyklop']="army XXX";
  orderedUnits['small_transporter']="ship XXX";
  orderedUnits['bireme']="ship XXX";
  orderedUnits['attack_ship']="ship XXX";
  orderedUnits['demolition_ship']="ship XXX";
  orderedUnits['big_transporter']="ship XXX";
  orderedUnits['trireme']="ship XXX";
  orderedUnits['colonize_ship']="ship XXX";

  function isArmy(key)
  {
    var arrayClassNames = orderedUnits[key].split(' ');
    if (arrayClassNames[0] == 'army')
      return true;
    else
      return false;
  }

  var usedIndexes = [];
  var usedIndexesCount = 0;
  {
    var townId;
    var i = 0;
    for (townId in Cities)
    {
      var res = getCity(townId);

      for(key in orderedUnits)
      {
        if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0)
        {
          usedIndexes[key] = 1;
          usedIndexesCount++;
        }
        else if (parseInt(getArrValue(getArrValue(res.units, key), "construction", 0)) > 0)
        {
          usedIndexes[key] = 1;
          usedIndexesCount++;
        }
      }
      i++;
    }
  }

  s += "<div id='EmpireBoardArmy' class='Table'><table class='Overview Army tablesorter'>";
  s += "<thead><tr><th class='townName' nowrap>"+texts["townName"]+"</th>";
  s += "<th class='actions' nowrap>"+EmpireBoard.Renders.Army_HeaderIcons(current_town_id)+"</th>";
  s += "<th colspan=1 class='lf population' style='background-image:url(\"http://static.grepolis.com/images/game/layout/resources.png\");  background-repeat:no-repeat; background-position:center -120px;'></th>";

  if (usedIndexesCount > 0)
  {
    var firstStyle = "";
    var lastTopic = '';
    for(key in orderedUnits)
    {
      if (usedIndexes[key] == 1)
      {
        if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }

        s += "<th unit='"+EmpireBoard.Grepolis.Trim_Unit(key)+"' class='"+firstStyle+" unit_name "+EmpireBoard.Grepolis.Trim_Unit(key)+"' nowrap "+createTooltipAttribute(config.units[key].name)+'style="background-image: url(&quot;http://static.grepolis.com/images/game/units/'+key+'_25x25.png&quot;); background-repeat:no-repeat; background-position:center;"></th>';
        firstStyle = "";
        lastTopic = orderedUnits[key];
      }
    }
  }
  else s += "<th class='lf'></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>";
  s += "</tr></thead>";

  s += "<tbody>";

  var sum = [];
  var sumConstruction = [];
  var townId;
  var i = 0;
  for (townId in Cities)
  {
    var res = getCity(townId);

    var townHallStyle = "";
    var growthStyle = "";
    if (parseInt(res.population) < 5)
    {
      townHallStyle = " DarkRed";
    }
    else if (parseInt(res.population) < 10)
    {
      townHallStyle = " Brown";
    }
    else
    {
      townHallStyle = " Bold";
    }

    var trclass = (parseInt(current_town_id) == parseInt(townId)) ? "current" : "";
    s += "<tr class='"+trclass+"' townid='"+townId+"'>";
    s += "<td class='townName' nowrap>"+
    createLinkToChangeCity(Cities[townId].name, townId, i)+
    createMovements(townId)+
    createAttacks(townId)+
    "</td>";
    s += "<td class='actions' nowrap>"+createLinkToArmyView(townId)+createLinkToDeployArmy(townId)+"<br />"+
    createLinkToFleetView(townId)+createLinkToDeployFleet(townId)+"</td>";
    s += "<td class='lf"+townHallStyle+" population'>"+EmpireBoard.Str.FormatBigNumber(res.population)+"</td>";

    if (usedIndexesCount > 0)
    {
      var firstStyle = "";
      var lastTopic = '';
      for(key in orderedUnits)
      {
        var uKey = EmpireBoard.Grepolis.Trim_Unit(key);
        if (usedIndexes[key] == 1)
        {
          if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }

          var unitCount = EmpireBoard.Str.To_Integer(getArrValue(getArrValue(res.units, key), "count", "0"), 0);

          if (unitCount == 0)
          {
            unitCount = "-";
          }
          else
          {
            sum[key] = (sum[key] == undefined) ? unitCount : sum[key] + unitCount;
          }

          var unitConstructionHTML = '<font class="More">-</font>';
          var unitConstruction = EmpireBoard.Str.To_Integer(getArrValue(getArrValue(res.units, key), "construction", "0"), 0);

          if (unitConstruction > 0)
          {
            unitConstructionHTML = '<font class="More" title="'+texts["currentlyBuilding"]+'">'+EmpireBoard.Str.FormatBigNumber(unitConstruction, true)+'</font>';
            sumConstruction[key] = (sumConstruction[key] == undefined) ? unitConstruction : sumConstruction[key] + unitConstruction;
          }

          s += "<td unit='"+uKey+"' class='"+firstStyle+" "+uKey+"'>"+
          EmpireBoard.Str.FormatBigNumber(unitCount)+
          unitConstructionHTML+
          "</td>";

          lastTopic = orderedUnits[key];
        }
      }
    }
    else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td>";

    s += "</tr>";
    i++;
  }

  s += "</tbody>";

  s += "<tfoot class='Summary'><tr class='Units'>";
  s += "<td colspan=2><img vspace=2 hspace=5 src='http://s2.de.ikariam.com/skin/layout/sigma.gif'></td>";
  s += "<td class='lf'></td>";
  if (usedIndexesCount > 0)
  {
    var firstStyle = "";
    var lastTopic = '';
    for(key in orderedUnits)
    {
      if (usedIndexes[key] == 1)
      {
        if (lastTopic != orderedUnits[key]) { firstStyle = "lf"; } else { firstStyle = ""; }

        var unitConstructionHTML = '<font class="More">-</font>';
        if (sumConstruction[key] > 0)
        {
          unitConstructionHTML = '<font class="More">'+EmpireBoard.Str.FormatBigNumber(sumConstruction[key], true)+'</font>';
        }
        s += "<td unit='"+EmpireBoard.Grepolis.Trim_Unit(key)+"' class='"+firstStyle+" "+EmpireBoard.Grepolis.Trim_Unit(key)+"'>"+
        EmpireBoard.Str.FormatBigNumber(sum[key])+
        unitConstructionHTML+
        "</td>";

        lastTopic = orderedUnits[key];
      }
    }
  }
  else s += "<td class='lf'></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";

  s += "</tr></tfoot>";
  s += "</table>";
  s += "<p class='Caption'>(<span class=Green>1-9</span>) available action points. (<span class=Red>!</span>) require your attention to update overview's data.</p>";
  s + "</div>";

  return s;
}

function renderTables()
{
  var Cities = EmpireBoard.DB.OwnCities;
  // TODO sort by townName

  var s = "";

  if (TABLE_ARMYFLEET)
    s += renderArmyTable();

  if (TABLE_RESOURCES) 
    s += renderResourcesTable();

  if (TABLE_BUILDINGS)
    s += renderBuildingsTable();

  var body = EmpireBoard.DOM.Get_First_Node("//body");
  var table_mode = "new_table";
  var span = document.getElementById("EmpireBoard");

  if (span == null) {
    span = document.createElement('div');
    span.id = "EmpireBoard";
    span.setAttribute("version", EmpireBoard.Version);
    // span.align = "center";
    if (langtype == "rf")
    {
      span.setAttribute("dir", "rtl");
      span.setAttribute("class", "RtoL");
    }
    span.innerHTML = s;
    body.appendChild(span);
  } else {
    // span.align = "center";
    if (langtype == "rf")
    {
      span.setAttribute("dir", "rtl");
      span.setAttribute("class", "RtoL");
    }
    span.innerHTML = s;
    table_mode = "new_table";
  }

  // settings table
  function reset_all_data() {
    var answer = confirm("Are you sure you want to delete ALL stored data ?");
    if (answer) {
      config = {};
      Cities = EmpireBoard.DB.OwnCities = {}
      EmpireBoard.DB.Save();
      EmpireBoard.DB.Options = {};
      EmpireBoard.DB.Save_Options();
      window.location.href = window.location.href;
    }
  }
  function myChkEventHandler() {
    this.value = (this.value == '1' ? '0' : '1');
    config.cfg[this.lang] = (this.value == '1');
    EmpireBoard.DB.Save();
    EmpireBoard.DB.Options.Prefs[this.lang] = (this.value == '1');
    EmpireBoard.DB.Save_Options();
  }
  function myChgEventHandler() {
    config.cfg[this.lang] = this.value;
    EmpireBoard.DB.Save();
    EmpireBoard.DB.Options.Prefs[this.lang] = this.value;
    EmpireBoard.DB.Save_Options();
  }
  function createChk(propertyName, propertyValue) {
    var btn = document.createElement('input');
    btn.type = "checkbox";
    btn.lang = propertyName;
    btn.value = (propertyValue == true ? '1' : '0');
    if (propertyValue == true) {
      btn.checked = "checked";
    }
    btn.addEventListener('click', myChkEventHandler, false);
    return btn;
  }
  function createInp(propertyName, propertyValue) {
    var btn = document.createElement('input');
    btn.type = "text";
    btn.lang = propertyName;
    btn.value = propertyValue;
    btn.addEventListener('change', myChgEventHandler, false);
    return btn;
  }
  function createTxtr(propertyName, propertyValue, rows, cols) {
    var btn = document.createElement('textarea');
    btn.cols = (cols != undefined) ? cols : 50;
    btn.rows = (rows != undefined) ? rows : 15;
    btn.lang = propertyName;
    btn.value = propertyValue;
    btn.addEventListener('change', myChgEventHandler, false);
    return btn;
  }
  function createSlct(propertyName, propertyValue, items) {
    var btn = document.createElement('select');
    btn.lang = propertyName;
    for(key in items) {
      var o = document.createElement("option");
      o.value = key;
      o.text = items[key];
      btn.add(o, null);
    }
    btn.value = propertyValue;
    btn.addEventListener('change', myChgEventHandler, false);
    return btn;
  }
  function createRow(title, input) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute("align", "right");
    td.setAttribute("style", "border-style: dotted; border-width: 1px; color: #FDF7DD");
    td.innerHTML = title;
    tr.appendChild(td);
    var td = document.createElement('td');
    td.setAttribute("align", "left");
    td.setAttribute("style", "border-style: dotted; border-width: 1px; color: #FDF7DD");
    td.appendChild(input);
    tr.appendChild(td);
    return tr;
  }
  function createRowChk(title, propertyName, propertyValue) {
    return createRow(title, createChk(propertyName, propertyValue));
  }
  function createRowInput(title, propertyName, propertyValue) {
    return createRow(title, createInp(propertyName, propertyValue));
  }
  function createRowTxtr(title, propertyName, propertyValue, rows, cols) {
    return createRow(title, createTxtr(propertyName, propertyValue, rows, cols));
  }
  function createRowSlct(title, propertyName, propertyValue, items) {
    return createRow(title, createSlct(propertyName, propertyValue, items));
  }

  var t = document.createElement('table');
  t.id = "EmpireBoardSettings";
  t.setAttribute("style", "display: none;");
  t.setAttribute("align", "right");
  t.appendChild(createRowChk("Show resources table:", "TABLE_RESOURCES", TABLE_RESOURCES));
  t.appendChild(createRowChk("Show buildings table:", "TABLE_BUILDINGS", TABLE_BUILDINGS));
  t.appendChild(createRowChk("Show army and fleet table:", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
  t.appendChild(createRowSlct("Resource progress bar mode:", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: "off", time: "based on remaining time", percent: "based on fullness percentage"}));
  // t.appendChild(createRowSlct("Language:", "LANGUAGE", language, {"":
  // "Automatic from server name",ae: "???????", en: "English", hu: "Magyar",
  // de: "Deutsch", cz: "Czech", tr: "Turkish", es: "Espanol", ba: "Bosnian",
  // it: "Italiano", pt: "Portuguese", fr: "Français", pl: "Polish", ro:
  // "Romanian", gr: "Greek", cn: "Chinese", nl: "Dutch", cz: "Czech", vn:
  // "Vietnamese", tw: "Chinese (traditional)", fi: "Finnish", se: "Swedish",
  // il: "Hebrew", sk: "Slovak", bg: "Bulgarian", sl: "Slovenian", lv:
  // "Latvian"}));

  var tr = document.createElement('tr');
  t.appendChild(tr);
  var td = document.createElement('td');
  tr.appendChild(td);
  td.setAttribute("colspan", "2");
  var buttonsPanel = document.createElement('div');
  td.appendChild(buttonsPanel);

  // reset button
  var n = document.createElement('input');
  n.type = "button";
  n.value = "Reset all data";
  n.setAttribute("class", "button");
  n.setAttribute("style", "display: inline !important;");
  n.addEventListener("click", reset_all_data, false);
  buttonsPanel.appendChild(n);

  if (table_mode == "new_table") {
    // show / hide button
    function show_hide_table()
    {
      var n = document.getElementById("EmpireBoardSettings");
      var m = document.getElementById("EmpireBoardAddons");
      if (n.style.display == 'none')
      {
        n.style.display = 'table';
        m.style.display = 'block';
        this.value = texts["hide_settings"];
      }
      else
      {
        n.style.display = 'none';
        m.style.display = 'none';
        this.value = texts["show_settings"];
      }
    }

    // now adds table
    span.appendChild(t);

    var ul = document.createElement('ul');
    ul.id = 'EmpireBoardAddons';
    ul.setAttribute("style", "display: none; color: #FDF7DD");
    ul.innerHTML = '<u>Registered add-ons :</u>';
    span.appendChild(ul);

    var p = document.createElement('p');
    p.setAttribute("class", "Footer");
    p.setAttribute("style", "color: #FDF7DD");

    var n = document.createElement('span');
    n.innerHTML = 'Powered by <a href="http://userscripts.org/scripts/show/41051" target="_blank"><b>'+EmpireBoard.ScriptName+'</b></a> (v. <i>' + EmpireBoard.Version + '</i>). ';
    if (EmpireBoard.DB.Options['AvailableVersion'] > EmpireBoard.Version)
      n.innerHTML += '<a href="'+EmpireBoard.ScriptURL+'?version='+EmpireBoard.DB.Options['AvailableVersion']+'.user.js'+'" style="color: red;"><b>NEW RELEASE V. <i>'+EmpireBoard.DB.Options['AvailableVersion']+'</i> AVAILABLE !</b></a> ';
    p.appendChild(n);

    var n = document.createElement('input');
    n.type = "button";
    n.value = texts["show_settings"];
    n.setAttribute("class", "button");
    n.addEventListener("click", show_hide_table, false);
    p.appendChild(n);

    // footer
    span.appendChild(p);
  }
  // myTimeCounterF(200, true);
}

if ((EmpireBoard.Grepolis.View() != '') && (EmpireBoard.Grepolis.View() != 'errorLoggedOut') && (EmpireBoard.Grepolis.View() != 'no-login-umod'))
{
  $('head').append("<script type='text/javascript' src='http://s6.de.ikariam.com/js/wz_tooltip.js'></script>"); 

  TABLE_RESOURCES = getCfgValue("TABLE_RESOURCES", true); // overview
  TABLE_BUILDINGS = getCfgValue("TABLE_BUILDINGS", true); // overview
  TABLE_ARMYFLEET = getCfgValue("TABLE_ARMYFLEET", true); // overview
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); // progress

  EmpireBoard.Renders.Set_Common_Styles();

  renderTables();

  EmpireBoard.DB.Save();

  EmpireBoard.Tooltip.CreateContainer(EmpireBoard.MainID+'Tooltip', EmpireBoard.MainID);
  EmpireBoard.Handlers.Attach_Events();

  EmpireBoard.Handlers.Start_Timers();

  // TODO
  // EmpireBoard.CheckScriptUpdate();
};

EmpireBoard.EndTime = new Date().getTime();
EmpireBoard.Log.Add('Ended after '+((EmpireBoard.EndTime - EmpireBoard.StartTime)/1000)+'s');
