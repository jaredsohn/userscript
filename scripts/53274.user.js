var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Ikariam Master View
// @namespace      overkill_gm
// @version        1.7.2
// @description    An Ikariam game script to gather information from player towns
// @include        http://s*.ikariam.*/index.php*
// @homepage       http://userscripts.org/scripts/show/53274
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @notrequire        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// ==/UserScript==
]]></>.toString());

function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}

// included jQuery plugin http://cherne.net/brian/resources/jquery.hoverIntent.html
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:400,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

// CONST VARIABLES
// Re-order this to change the order of your overview table
var BUILDINGLIST = [
'townHall','palace',
'wall','workshop',
'warehouse','dump',
'safehouse','embassy',
'tavern','museum',
'academy','temple',
'port','branchOffice',
'barracks','shipyard',
'forester','carpentering',
'winegrower','vineyard',
'stonemason','architect',
'glassblowing','optician',
'alchemist','fireworker',

];


/** MAIN VARIABLES STARTUP **/
var openIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABCUExURdysYm15hjdHWW98iGh1gmJvfXB8'+
    'iaifjaqfjHiEkN2rXt2sXt6rXkdWZ96rXWl1g1VjctmsZt2sX2Vyf11qed6rXDr/ejYAAAAWdFJO'+
    'U////////////////////////////wAB0sDkAAAAXElEQVR42kyNiQ7AIAhDUac7PKYw/v9X13kk'+
    'a0LCa1og/YnWEs9aqCTmS2nLNihVMXKoBpsJVg8l7wSduxdy0zaBaxvXPoCv+4KC8Qlg5h/HAOEB'+
    'EgHPVEX2FWAA6KMJ0Xri1nUAAAAASUVORK5CYII=';
var scriptName = scriptMetadata.name + " " + scriptMetadata.version;
var ICON = {
	wood    : "/skin/resources/icon_wood.gif",
	wine    : "/skin/resources/icon_wine.gif",
	marble  : "/skin/resources/icon_marble.gif",
	crystal : "/skin/resources/icon_glass.gif",
	sulfur  : "/skin/resources/icon_sulfur.gif",
};
var IMG = {
  wonder : "/skin/icons/livingspace_24x24.gif",
  forum  : "/skin/board/icon_forum.gif",
}

GM_addStyle(
"" + <><![CDATA[
  #overviewPopup { display: none; position: fixed; top:0px; left:0px; z-index : 999; width: 100%; color: #000; width: 900px; }
  #overviewPopup > div { padding-bottom: 5px; margin: 0 auto; border: thick double #D2AC77; background-color: rgba(246,235,188,0.5); width:100%; }
  #overviewPopup .l { float: left;  margin-left:  4px; margin-right: 1px; max-width: 100px; text-align: left; }
  #overviewPopup .r { float: right; margin-right: 4px; margin-left:  1px; max-width: 100px; text-align: right; }
  #overviewPopup h3 { text-align: center; font-weight: bold; }
  #overviewPopup table { background-color: rgb(246,235,188);  }
  #overviewPopup table th { border: 1px dotted Black; padding: 0 2px; font-size: 8pt; text-align: center; }
  #overviewPopup table td { border: 1px dotted Black; min-width:0px; padding:0; white-space:nowrap }
  #overviewPopup table { font-size: 12px; margin-left: 6px; margin-right: 6px; margin-top: 5px; padding: 0px; width: auto; }
  #overviewPopup table .o { background-color: LightGoldenRodYellow; }
  #overviewPopup table .e { background-color: PaleGoldenRod; }
  #overviewPopup table .ignore { background-color: black; }
  #overviewPopup table a { padding: 0 1px; }
  #overviewPopup table .hi { font-style:italic; font-weight: bold; background-image: url(skin/layout/bg_sky.jpg); color:#fee; }
  #overviewPopup table .hi,#overviewPopup table .hi > a { color: #fee; }
  #overviewPopup .okActive { border: 2px dashed red; background-color: Khaki; }
  #overviewPopup tr.okActive .o { background-color: Moccasin; }
  #overviewPopup tr.okActive .e { background-color: Tan; }
  #overviewPopup .okSelected { background-color: Linen; color: #003; }
  #overviewPopup .okSelected .o { background-color: Linen; }
  #overviewPopup .okSelected .e { background-color: Moccasin; }
  /* #overviewPopup img { width: 17px; height: 13px; } /* resource icons */
  #overviewPopup .toDuration { font-size: smaller; color: #444; }
  #overviewPopup .tradeNote { -moz-border-radius: 5px; background-Color:navy; color: Thistle; font-size: 10px; margin-left: 3px; padding : 2px; }
  #overviewPopup .tradeNote a { color: white; font-size: 11px; }
  #overviewPopup #ok_buildings { width: 890px; }
  #overviewPopup #ok_buildings th.o { text-align: left; vertical-align: bottom; }
  #overviewPopup #ok_buildings th.e { text-align: right; vertical-align: top; }
  #overviewPopup #ok_buildings td { min-width: 28px; }
  #overviewPopup #ok_resources .pos { background-color:#fdd; color: black; }
  #overviewPopup #ok_resources .neg { background-color:#dfd; color: black; }
  #overviewPopup .okHBar { float:left; height:13px; }
  #overviewPopup .textLabel { height:1px; left:-9999px; overflow:hidden; position:absolute; width:1px; }

  #overviewPopup .tanline { background-color: #DEAB5C; min-width:0; border-top:0; border-bottom:0; }
  
  #igoheader { line-height: 12px; margin:0; width:100%; border:0; border-bottom:thick double #F2E4B5; background-color: #DEAB5C; text-align:center; cursor:move; }
  #igoheader select { border:0; padding:0; margin:0; background-color:Khaki; font-size: 10px; text-align:center; }

  #overviewPopup #ok_army th,#overviewPopup #ok_fleet th { width:auto; padding:0 2px; }
  #overviewPopup thead tr,#overviewPopup tfoot tr { background-color: #DEAB5C; text-align: center; }
  
  #okInfoBox { padding-left: 0 !important; }
  /*  JQUERY UI */
  #overviewPopup.ui-draggable-dragging > div > table { visibility:hidden; }
  #tooltip { position:absolute; z-index:9999; font-size:10px; width:auto; padding:2px; color:black; }
  #tooltip table th { padding: 1px 2px; background-color: BurlyWood; font-weight: bold; }
  #tooltip table td { padding: 1px 2px; background-color: Beige; }

]]></>);
//Beige BurlyWood Chocolate DarkKhaki GoldenRod Khaki Peru Tan Wheat

//---------------  BEGIN SHARED FUNCTIONS
function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}
function ddebug() { }
log=function(){var a="history";log[a]=log[a]||[];log[a].push(arguments);window.console&&console.log[console.firebug?"apply":"call"](console,Array.prototype.slice.call(arguments))};window.logargs=function(a){log(a,arguments.callee.caller.arguments)};

limit = function(n,lower,upper) { return Math.max(Math.min(n,upper),lower); }
$$ = document.getElementById;
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; } 
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function onDblclick(node, fn, capture, e) { node.addEventListener((e||"") + "dblclick", fn, !!capture); }
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function copy(old){ var neu = {}; if (old) for (thing in old) neu[thing] = old[thing]; else neu = false; return neu; }
function copyDeep(dupeObj) { //http://www.overset.com/2007/07/11/javascript-recursive-object-copy-deep-object-copy-pass-by-value/
  var retObj=new Object();if(typeof(dupeObj)=='object'){if(typeof(dupeObj.length)!='undefined')var retObj=new Array();for(var objInd in dupeObj){if(typeof(dupeObj[objInd])=='object'){retObj[objInd]=copyDeep(dupeObj[objInd])}else if(typeof(dupeObj[objInd])=='string'){retObj[objInd]=dupeObj[objInd]}else if(typeof(dupeObj[objInd])=='number'){retObj[objInd]=dupeObj[objInd]}else if(typeof(dupeObj[objInd])=='boolean'){((dupeObj[objInd]==true)?retObj[objInd]=true:retObj[objInd]=false)}}}return retObj;
}
function number(n) { n = { string: 1, number: 1, undefined : 1 }[typeof n] ? n+"" : n.textContent; return parseInt(n.replace(/\D+/g, "") || "0", 10); }
function trim(str) { var str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length; while (ws.test(str.charAt(--i))); return str.slice(0, i + 1); } 
// @RETURNS    : -04:12
function duration(seconds){
  var sign = (seconds < 0) ? '-' : '';
  seconds = Math.abs(seconds);
	var minutes = (Math.ceil(seconds/60) % 60);
  minutes = (minutes < 10) ? '0' + minutes : minutes.toString();
	return sign + Math.floor((seconds+60)/3600).toString() + ':' + minutes;
}

// FUNCTIONS THAT USE IKARIAM VARIABLES FOR LOCALIZATIOBN
Number.prototype.fmtNumber = function(n){
  var separator = unsafeWindow.LocalizationStrings['thousandSeperator'] || ',';
  n = Math.floor(this);
  var isNeg = (n < 0); n += ""; for (var i = (n.length - 3); i > isNeg; i -= 3) { n = n.slice(0, i) +separator+ n.slice(i); }
  return n;
}
function fmtNumber(n) {
  var separator = unsafeWindow.LocalizationStrings['thousandSeperator'] || ',';
  if (!isNaN(n)) {
    n = Math.floor(n);
    var isNeg = (n < 0); n += ""; for (var i = (n.length - 3); i > isNeg; i -= 3) { n = n.slice(0, i) +separator+ n.slice(i); } return n;
  } else return n;
}
function fmtProductionRate(n){ return Math.round(n*3600); }
function durationHMS(seconds,depth){
  var temp = unsafeWindow.LocalizationStrings['timeunits']['short'], ret = [], prefix = '';
  if (seconds == 0) { return '0'; }
  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
	var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
	var y = [ temp.day                    , temp.hour                     , temp.minute,                  temp.second  ];
	for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
  else return prefix + ret.join(' ');
}
function hmsToSeconds(string){
  var units = unsafeWindow.LocalizationStrings['timeunits']['short'];  //{day:"D", hour:"h", minute:"m", second:"s"}
  var re = new RegExp("(\\d+"+units.day+")?\\s?(\\d+"+units.hour+")?\\s?(\\d+"+units.minute+")?\\s?(\\d+"+units.second+")?");
  var parsed = string.match(re);
  var seconds = (parseInt(parsed[1] || 0,10)*24*60*60) + (parseInt(parsed[2] || 0,10)*60*60) + (parseInt(parsed[3] || 0,10)*60) + parseInt(parsed[4] || 0,10);
  return seconds;
}

// IKARIAM HELPER FUNCTIONS
function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = (ikariamTime || document.getElementById('servertime').innerHTML).split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2] || 0,10);
	return new Date(year,month,day,hour,minute,second).getTime();
}
function addDynamicBox(title,content,position,id){
  if (document.body.id == 'renameCity') return;
  if (document.body.id == 'militaryAdvisorDetailedReportView') return;
  if (document.body.id == 'buildings_demolition') return;
  position = position || 0;
  var output;
  if (!title) {
    output = node('div','dynamic','',content);
    if (id) output.id = id;
  }
  else output = node('div','dynamic','','<h3 class="header">'+title+'</h3><div class="content"'+ (id ? ' id="'+id+'"' : '') +'>'+content+'</div><div class="footer"/>');
  var dynamicElement = document.getElementById('breadcrumbs'), dynamicElements = $x("//div[contains(@class,'dynamic')]");
  if (position < dynamicElements.length) {
    dynamicElement = dynamicElements[position];
  } else if (dynamicElements.length && position >= dynamicElements.length) {
    dynamicElement = dynamicElements[dynamicElements.length-1];
  }
  return dynamicElement.parentNode.insertBefore(output,dynamicElement.nextSibling);
}
function getTrailingId(s){ return parseInt(s.substring(s.lastIndexOf('=') + 1),10); }
//--------------- END SHARED FUNCTIONS
function serialize(name,val){
  if (gameServer) GM_setValue(name+'_'+gameServer,uneval(val));
}
function deserialize(name, def) {
  if (gameServer) return eval(GM_getValue(name+'_'+gameServer)) || def;
}

// PART 1: PASSIVE DATA COLLECTION *************************************************************
var IKARIAM = {
  current : $X('//*[@id="citySelect"]/option[@selected="selected"]').value ,
  citySelect : getCityOrder(),
  getResource:function(id,resource){
    var temp_resources;
    if (allCities[id]) {
      temp_resources = allCities[id].resources;
      if (!temp_resources.__count__) temp_resources = {resources:{wood:0,wine:0,marble:0,crystal:0,sulfur:0},maxCapacity:{wood:0,wine:0,marble:0,crystal:0,sulfur:0},production:{wood:0,trade:0,tradeName:''},wineConsumption:0,ts:0};
      var production = 0;
      switch (resource){
        case 'wood' :
          production = temp_resources.production.wood;
        break;
        case 'wine' :
          if (temp_resources.wineConsumption) {
            production = -temp_resources.wineConsumption/3600;
          }
        default:
          if (temp_resources.production.tradeName == resource) {
            production += temp_resources.production.trade;
          }
      }
      var guess = temp_resources.resources[resource];
      if (temp_resources.ts) guess += production * (now - temp_resources.ts) / 1000;

      return guess;
    }
    return '&ndash;';
  },
  getBuildingLevel : function(id,name,position){
    var temp, level = 0;
    //if (name == "palaceColony") name = "palace";
    if (allCities[id]) {
      if (temp = allCities[id].buildings[name]) {
        if (temp.length !== undefined) temp = temp.reduce(function(previousValue, currentValue){ return (previousValue.p == position) ? previousValue : currentValue; });
        level = temp.level;
      }
    }
    return level;
  },
  getBuildingLevelHTML : function(id,name,position){
    var level = this.getBuildingLevel(id,name,position);
    return level || '&ndash;';
  },
  getBuildingHref : function(id,name,position){
    return 'http://'+document.domain+'/index.php?view='+name+'&id='+id+'&position='+position;
  },
  getGarrisonLimit : function(id){
    return 250 + 50 * (this.getBuildingLevel(id,'townHall') + this.getBuildingLevel(id,'wall'));
  },
  getSafe : function(id){
    var levels = 0;
    if (allCities[id]) {
      if (temp = allCities[id].buildings.warehouse) {
        if (!!temp.push) {
          temp.forEach(function(warehouse){
            levels += warehouse.level;
          });
        } else {
          levels = temp.level;
        }
      }
    }
    return 100 + 480*levels;
  }
};

function changeCity(city_id,method) {
  if (method == "form") {
    var go = false;
    for each (var option in $x('//select[@name="cityId"]/option')) {
      if (option.value == city_id) { option.selected = go = true; }
      else {                         option.selected = false;     }
    }
    if (go) document.getElementById('changeCityForm').submit();
  } else {
    document.location.href = 'http://'+document.domain+"/index.php?action=header&function=changeCurrentCity&cityId="+city_id+"&view=city&actionRequest="+$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value;
  }
}
function getCities(){
  var islandId, id, ids = {}, output = eval(GM_getValue("cities_"+gameServer, '({})'));
	$("#citySelect > option:not(.deployedCities):not(.occupiedCities)").each(function() {
    id = parseInt(this.value,10);
    ids[id] = true; // build hash for cleaning up old data later
    if (!output[id]) output[id] = { id:id, resources:{}, buildings:{} };
    output[id].name = trim(this.innerHTML.replace(/\[[0-9:]+\](&nbsp;)?/,''));
		if (this.selected) current = output[id];
	});
  if (current && (islandId = $X('//li[@class="viewIsland"]/a'))) current.islandId = parseInt(islandId.href.replace(/.+=/,''),10);
  for (id in output){ if (!ids[id]) { if (confirm('Ok To Delete '+output[id].name)) delete output[id]; save(); } }  // delete bad cities
	return output;
}
function buildLocalize(){
  // inherited by scope: OBJECT localize
  var realName, localizedName;
  $("#locations li[id^='position']").filter(':not(.buildingGround)').each(function(){
    realName = this.className.split(' ')[0];
    localizedName = $X('./a',this).title;
    localizedName = localizedName.split(' ');
    localizedName = localizedName.slice(0,localizedName.length-2);
    localizedName = localizedName.join(' ');
    localize[realName] = localizedName;
  });
  GM_setValue('localize_dictionary',uneval(localize));
}
function getBuildings(viewportCity,responseText) {
  function getBuildingStat(buildingLi){
    var temp = $X('.//a',buildingLi);
    var building = { level:parseInt(temp.title.substring(temp.title.lastIndexOf(" ")+1),10) , p:getTrailingId(temp.href) };
    //var building = { level:parseInt(temp.title.substring(temp.title.lastIndexOf(" ")+1),10) , href:temp.href, p:getTrailingId(temp.href) };
    //building.up = ($X('./div[@class="constructionSite"]',buildingLi)) ? unsafeWindow.tmpCnt.enddate + now - unsafeWindow.tmpCnt.currenttime : false;
    var constructionSite = ($X('./div[@class="constructionSite"]',buildingLi)); 
    if (constructionSite){
      building.up = unsafeWindow.tmpCnt.enddate + now - unsafeWindow.tmpCnt.currenttime;
      if (building.up) building.level += 0.5;
    }
    return building;
  }

	var buildID, buildings = {}, oldBuildings = copy(viewportCity.buildings);
  var tempDiv = responseText ? node('div','','',responseText) : document;
  var li = $x('//ul[@id="locations"]/li[contains(@id,"position")]',tempDiv);

  for (var i = li.length - 1; i >= 0; --i){
    buildID = li[i].className.split(' ')[0];  // townHall, barracks, buildingGround shore, buildingGround land
    
    //if (buildID == 'palaceColony') { buildID = 'palace'; }  // reuse palace for governor's residence
    if (buildID != 'buildingGround') {
      if (!buildings[buildID]) {
        buildings[buildID] = getBuildingStat(li[i]);
        if (oldBuildings[buildID] && oldBuildings[buildID].up && (oldBuildings[buildID].up > now) && !buildings[buildID].up) {
          buildings[buildID].up = oldBuildings[buildID].up;
        }
      } else {
        // you can have multiple warehouses...
        if (buildings[buildID].length === undefined) {  // if Object
          var old = copy(buildings[buildID]);
          buildings[buildID] = [old];
        }
        buildings[buildID].push(getBuildingStat(li[i]));
        //debug(uneval(buildings[buildID]));
      }
    }
    //debug(buildings[buildID].length == undefined);
	}
  viewportCity.buildings = buildings;
}
function getForce(viewportCity){
  var unit, name, count, type, force = {};
  switch (document.body.id){
    case 'barracks' :           
    case 'cityMilitary-army' :  
    case 'plunder' :            type = 'army';  break;

    case 'blockade' :
    case 'shipyard' :           
    case 'cityMilitary-fleet' : type = 'fleet';  break;
  }
  switch (document.body.id){
    case 'barracks' :
    case 'shipyard' :
      for each (var unit in $x('//div[@class="unitinfo"]')) {
        name  = type+'_'+getTrailingId($X('./a',unit).href);
        count = parseInt(trim($X('./div[1]/text()',unit).nodeValue),10);
        force[name] = count;
        localize[name] = $X('./h4/text()',unit).nodeValue;
      }
      //debug(uneval(localize));
      GM_setValue('localize_dictionary',uneval(localize));
    break;
    case 'cityMilitary-army' :
    case 'cityMilitary-fleet' :
      var lookup = {
        ship_ram          : 210,
        ship_flamethrower : 211,
        ship_submarine    : 212,
        ship_ballista     : 213,
        ship_catapult     : 214,
        ship_mortar       : 215,
        ship_steamboat    : 216,
        y60_slinger    : 301,
        y60_swordsman  : 302,
        y60_phalanx    : 303,
        y60_marksman   : 304,
        y60_mortar     : 305,
        y60_catapult   : 306,
        y60_ram        : 307,
        y60_steamgiant : 308,
        y60_bombardier : 309,
        y60_cook       : 310,
        y60_medic      : 311,
        y60_gyrocopter : 312,
        y60_archer     : 313,
        y60_spearman   : 315,
      }
      var rows_names = $x('//div[starts-with(@id,"tab")]/div[1]//table/tbody/tr[1]');
      var rows_units = $x('//div[starts-with(@id,"tab")]/div[1]//table/tbody/tr[2]');
      for (var i = 0; i < rows_names.length; ++i){
        var cols_names = $x('./th/img/@src',rows_names[i]);
        var cols_units = $x('./td',rows_units[i]);
        for (var j = 0; j < cols_names.length; ++j) {
          var name = cols_names[j].nodeValue.match(/\/(\w+)_faceright/)[1];
          var number = parseInt(trim(cols_units[j].innerHTML),10);
          if (!isNaN(number) && number) force[type+'_'+lookup[name]] = number;
        }
      }
    break;
    case 'plunder' :
    case 'blockade' :
      for each (var row in $x('//ul[@class="assignUnits"]/li')){
        name  = $X('./input',row).id.replace(/cargo_/,'');
        count = parseInt($X('./div[1]/text()',row).nodeValue,10);
        //debug(name,count);
        force[name] = count;
      }
    break;
  }
  //debug(uneval(viewportCity.army),uneval(force));
  if (type) viewportCity[type] = force;
  else debug('MISSING TYPE getForce()');
  //save();
}
function rememberMill(current){
  var mill = {}, oldMill = copy(current['mill'+document.body.id]);
  // collect data { mill, [ req, don, ], own, ts }
  mill.lvl = parseInt($X('//div[@id="resUpgrade"]//div[@class="buildingLevel"]/text()').nodeValue,10);
  var temp = $x('//div[@id="resUpgrade"]//li[@class="wood"]/text()');
  if (temp.length) {
    mill.req = parseInt(temp[0].nodeValue.replace(/\D+/g,'') || 0,10);
    mill.don = parseInt(temp[1].nodeValue.replace(/\D+/g,'') || 0,10);
    mill.ts = now;
  } else {
    mill.ts = now+hmsToSeconds($$('upgradeCountDown').innerHTML)*1000;
  }
  // memorize donators
  mill.own = {};
  temp = $('#resourceUsers tr.avatar').not('.own').each(function(){
    var id = $('td:last a',this).attr('href').replace(/.+\D(\d+$)/,'$1'), donationElem = $('td.ownerDonation',this);
    mill.own[id] = parseInt(donationElem.text().replace(/\D+/g,'') || 0,10);
    if (oldMill && (mill.own[id] > oldMill.own[id])) donationElem.append('<span style="color:red;">('+(mill.own[id] - oldMill.own[id])+')</span>'); // todo change to > 0
  });
  
  //debug(uneval(mill),uneval(oldMill));
  current['mill'+document.body.id] = mill;
  save();
}
IKARIAM.rememberMill = function(current){
  //debug('rememberMiill');
  var mill = {}, oldMill = copy(current['mill'+document.body.id]);
  // collect data { mill, [ req, don, ], own, ts }
  mill.lvl = parseInt($X('//div[@id="resUpgrade"]//div[@class="buildingLevel"]/text()').nodeValue,10);
  var temp = $x('//div[@id="resUpgrade"]//ul[@class="resources"]/li/text()');
  if (temp.length) {
    mill.req = parseInt(temp[0].nodeValue.replace(/\D+/g,'') || 0,10);
    mill.don = parseInt(temp[1].nodeValue.replace(/\D+/g,'') || 0,10);
    mill.ts = now;
  } else if ($$('upgradeCountDown')) {
    mill.ts = now+hmsToSeconds($$('upgradeCountDown').innerHTML)*1000;
  }
  // memorize donators
  if (document.body.id != 'wonder'){
    mill.own = {};
    temp = $('#resourceUsers tr.avatar').not('.own').each(function(){
      var id = $('td:last a',this).attr('href').replace(/.+\D(\d+$)/,'$1'), donationElem = $('td.ownerDonation',this);
      mill.own[id] = parseInt(donationElem.text().replace(/\D+/g,'') || 0,10);
      if (oldMill && (mill.own[id] > oldMill.own[id])) donationElem.append('<span style="color:red;">('+(mill.own[id] - oldMill.own[id])+')</span>'); // todo change to > 0
    });
  }
  //debug(uneval(mill),uneval(oldMill));
  current['mill'+document.body.id] = mill;
  save();
}

function getCensus(viewportCity){
  var population = {};
  var ulstats = $$('CityOverview').childNodes[3].childNodes[3];
  population.happy          = parseInt($$('SatisfactionOverview').childNodes[5].childNodes[3].textContent,10);
  population.population   	= number(ulstats.childNodes[1].childNodes[1].textContent);
  population.satisfaction   = population.population + population.happy;
  population.maxSpace	      = number(ulstats.childNodes[1].childNodes[3].textContent);
  viewportCity.demographics = population;
}
function getResourcesProduction() {
 	var tradeGood  = {wood : 0, trade : 0, tradeName : ''};
  tradeGood.wood = unsafeWindow.woodCounter ? unsafeWindow.woodCounter.production : 0;
  if (unsafeWindow.tradegoodCounter) {
  	tradeGood.trade = unsafeWindow.tradegoodCounter ? unsafeWindow.tradegoodCounter.production : 0;
  	var script = unsafeWindow.tradegoodCounter.valueElem.id;
  	if (script.search(/value_wine/) != -1)         { tradeGood.tradeName = 'wine'; }
  	else if (script.search(/value_marble/) != -1)  { tradeGood.tradeName = 'marble'; }
  	else if (script.search(/value_crystal/) != -1) { tradeGood.tradeName = 'crystal'; }
  	else if (script.search(/value_sulfur/) != -1)  { tradeGood.tradeName = 'sulfur'; }
  }
	return tradeGood;
}
function getResources() {
  var temp_resources = {}, currentCityResources = unsafeWindow.IKARIAM.currentCity, resourcesProduction, wineObj;
  if ((resourcesProduction = getResourcesProduction()) && (currentCityResources)) {
    temp_resources = copyDeep(currentCityResources);  // { resources : {  }, maxCapacity : {  } }
    if (!resourcesProduction.tradeName && current.resources.production && current.resources.production.tradeName) 
    resourcesProduction.tradeName = current.resources.production.tradeName;
    temp_resources.production = resourcesProduction;
    wineObj = (resourcesProduction.tradeName == 'wine') ? unsafeWindow.tradegoodCounter : unsafeWindow.wineCounter;
    if (wineObj) {
      var reduction = 1;
      if (current.buildings && current.buildings.vineyard) reduction = (100-current.buildings.vineyard.level)/100;
      temp_resources.wineConsumption = Math.round(reduction * (wineObj.spendings[0].amount || 0));
    }
    temp_resources.ts = now;
    current.resources = temp_resources;
    if (current.demographics && current.demographics.population) current.demographics.population = parseInt($$('value_inhabitants').innerHTML.split('(')[1].replace(/\D/g,''),10);
    save();
  }
}


var now, gameServer, allCities, current, saveCacheTimer;
var localize   = eval(GM_getValue("localize_dictionary", "({})"));
if ($$('servertime')) {
  var viewportId;
  now       = itime2Date();
  gameServer = document.domain.replace(/ikariam\./,'');
  allCities = getCities();
  switch (document.body.id) {

    case 'city' :
      if (document.getElementById('position0')) { // will be false if city doesn't exist
        buildLocalize();
        viewportId = $('#position0 > a')[0].href.match(/id=(\d+)/)[1];
        if (allCities[viewportId]) getBuildings(allCities[viewportId]);
      }
    break;
    case 'cityMilitary-army' :
    case 'cityMilitary-fleet' :
    case 'barracks' :
    case 'shipyard' :
      viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
      viewportId= parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      if (allCities[viewportId]) getForce(allCities[viewportId]);
    break;
    case 'blockade' :
    case 'plunder' :
      if (current) getForce(current);
    break;
    case 'merchantNavy' :
    /*
    todo: keep track of incoming goods
      for each (var row in $x("//div[@id='mainview']//table[1]//td[@class='mission returning']/..")){
        var destinationCityId = $X("./td[@class='source']/a",row).href;
        debug(getTrailingId(destinationCityId));
      }
      */
    break;
    case 'resource' :
    case 'tradegood' :
      if ($$('setWorkersBox') && current){
        rememberMill(current);
        //current[document.body.id+'Lvl'] = parseInt($X('//div[@id="resUpgrade"]//div[@class="buildingLevel"]/text()').nodeValue,10);
      }
    break;
    case 'wonder' :
      if (current && (IKARIAM.current == current.id)) IKARIAM.rememberMill(current);
    break;
    case 'townHall' :
      viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
      viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      if (allCities[viewportId]) getCensus(allCities[viewportId]);
    break;
    case 'tavern' :
      viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
      viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      var pop;
      if (allCities[viewportId] && (pop = allCities[viewportId].demographics)) {
        $(function(){
          var wineAmount = $('#wineAmount').attr('selectedIndex');
          var $wineAmountOptions = $('#wineAmount > option');
          var index = wineAmount - Math.floor((pop.satisfaction-pop.maxSpace) / 60);
          var idealWine = '';
          if (index > 0 && index < $wineAmountOptions.length) {
            idealWine = $('#wineAmount > option').get(index).innerHTML;
          } else {
            idealWine = 'upgrade tavern';
          }
          $('<div class="generated">Excess Satisfaction: '+pop.satisfaction + ' - ' +pop.maxSpace+ ' = ' + (pop.satisfaction-pop.maxSpace) + '<br/>Ideal Amount Of Wine: ' + idealWine + '</div>').
          insertAfter('#wineAssignForm');
        });
      }
    break;
  }
  if (current) getResources();
}



function getCityOrder(){
  var output = [];
	$("#citySelect > option:not(.deployedCities):not(.occupiedCities)").each(function() {
    output.push(parseInt(this.value,10)); });
  return output;
}












// END OF PART 1 ***********************************************************************************


function buildAverages(){
  var averages   = {'wood':0,'wine':0,'marble':0,'crystal':0,'sulfur':0};
  var temp_resources, resource, id, n_cities = 0;
  for (id in allCities) {
    ++n_cities;
  	if (temp_resources = allCities[id].resources.resources){
      averages.wood    += number(temp_resources.wood);
			averages.wine    += number(temp_resources.wine);
			averages.marble  += number(temp_resources.marble);
			averages.crystal += number(temp_resources.crystal);
			averages.sulfur  += number(temp_resources.sulfur);
		} else {
			enableTransport = false;
		}
	}
 	for (resource in averages){ averages[resource] = Math.floor(averages[resource]/n_cities); }
  return averages;
}
// qty, destCity, sourceCity
function amountToSend(qty,averages,destCity,sourceCity){
	sourceCity = sourceCity || ({});
	var amt, output = {};
	for (var resource in averages){
		amt = Math.min(Math.min(qty[resource],destCity.maxCapacity[resource])-destCity.resources[resource],sourceCity.resources[resource] || 1e10 );
		output[resource] = Math.max(0,amt); // no undefined resources plz cuz i'm lazy
	}
	return output;
}

function addLoadTimesToPage(){
  // Make sure the adjust function is called when the amount of resources changes
  $('#transportGoods').find('.setMin,.sliderbg,.setMax,.textfield').click(adjustLoadingTime);
  $('#transportGoods input.textfield').change(adjustLoadingTime);
  
  // Add loading time to duration time
  var html = $('#journeyTime').text();
  $('#journeyTime').text(durationHMS(0) + ' + ' + html + " = " + html);
}

function adjustLoadingTime(){
  var loadingSpeeds = [10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305,3663,4056,4489,4965,5488,6064,6698,7394,8161];
  // Get total ammount of resources that will be sent
  var total_res = 0;
  $('#transportGoods input.textfield').each(function(){ total_res += parseInt(this.value,10);});
  var divTime = $('#journeyTime').text();
  var travelTimeText = divTime.split(" = ")[0].split(" + ")[1];
  var travelTime     = hmsToSeconds(travelTimeText);
  var loadingSpeed   = loadingSpeeds[Math.floor(current.buildings.port && current.buildings.port.level || 0)];
  var loadTime       = Math.round(60*total_res / loadingSpeed);
  //console.log(total_res, current.buildings.port.level, divTime, travelTimeText);
  $('#journeyTime').text(durationHMS(loadTime) + " + " + travelTimeText + " = " + durationHMS(loadTime + travelTime));
}

function transportMax(e){
	e = e || window.event;
	var stuff = this.value.split('&');
	var lookup      = { 'wood' : 'textfield_wood', 'wine' : 'textfield_wine', 'marble' : 'textfield_marble', 'crystal' : 'textfield_glass', 'sulfur' : 'textfield_sulfur' };
  var lookupEvent = { 'wood' : 'swood', 'wine' : 'swine', 'marble' : 'smarble', 'crystal' : 'sglass', 'sulfur' : 'ssulfur' };
	var t,resource,amt,input;
    // simulate a mouse click
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	for (var i = 0; i < stuff.length; ++i){
		t = stuff[i].split('=');
		resource = t[0];
		amt = t[1];
		//debug([resource,$$('send_'+resource).checked,amt]);
    input = $X("//form[@id='transport']//input[@id='"+lookup[resource]+"']");
    if (input) {
      var slider = unsafeWindow[lookupEvent[resource]];
      input.value=amt;
      input.dispatchEvent(evt);
      adjustLoadingTime();
    }
	}
  e.stopPropagation();
  e.preventDefault();
}

// SHORTCUT FUNCTIONS
function image(resource){	if (resource && ICON[resource]) { return '<img width="17" height="13" src="'+ICON[resource]+'" alt=""/>'; }	else { return ''; } }
function buildCityHref(id){ return "?view=city&id=" + id; }
function buildResourceHref(id){ return "?view=resource&type=resource&id="+allCities[id].islandId; }
function buildTradegoodHref(id){ return "?view=tradegood&type=tradegood&id="+allCities[id].islandId; }
function buildArmyHref(id){ return "?view=cityMilitary-army&id=" + id; }
function buildNavyHref(id){ return "?view=cityMilitary-fleet&id=" + id; }
// OTHER FUNCTIONS
function save(){
  if (gameServer) {
    //debug('saving . . . ' + uneval(allCities).length + ' bytes '+gameServer);
    if (saveCacheTimer) { 
    //debug("aborted save. timer: "+saveCacheTimer);
    clearTimeout(saveCacheTimer); }
    saveCacheTimer = setTimeout(function() { GM_setValue('cities_'+gameServer,uneval(allCities)); },1);
  }
}
function updatePopup(){
	var elem, end, now = itime2Date();
	for each (elem in $x("//span[@class='toDuration']")) if (end = elem.getAttribute('rel')) elem.innerHTML = '(' + duration((end-now)/1000) + ')';
  // FILL IN DYNAMIC ELEMENTS
  goals.init();
}
function updateDurationsHMS(){
	var end, now = itime2Date();
  $(".toDurationHMS").each(function(){ if (end = this.getAttribute('rel').split(',')) $(this).text(durationHMS((end[0]-now)/1000,end[1])); });
}
function showHideTbody(elem,section){
  for each (var tbody in $x('../tbody',elem.parentNode.parentNode)) {
    tbody.style.display = tbody.style.display ? '' : 'none';
    if (section) options[section] = tbody.style.display;
    GM_setValue('options_'+gameServer,uneval(options));
  }
}
function hilightCell(dummy,elem){
  elem = elem || this;  // dummy gets set to Event
  var id;
  if (elem && elem.id && (id = parseInt(elem.id.replace(/\D+/,''),10))) {
    if (!options.hl) options.hl = [];
    var idx = jQuery.inArray(id,options.hl);
    if ($(elem).hasClass('hi')){
      $(elem).removeClass('hi');
      if (idx != -1) options.hl.splice(idx,1);
    } else {
      $(elem).addClass('hi');
      if (idx == -1) options.hl.push(id);
    }
    GM_setValue('options_'+gameServer,uneval(options));
  }
}
function showHide(e) {
	var overviewPopup = $$("overviewPopup");
	if (overviewPopup.style.display != "block") {
		updatePopup();
		overviewPopup.style.display = "block";
	} else { overviewPopup.style.display = "none"; }
}
function _keydown(e){
	var overviewPopup = $$("overviewPopup");
  var popupKeyMode = !parseInt(GM_getValue('popupKeyMode'));
  //debug(e.which);
  if (overviewPopup && popupKeyMode) {
		e = e || window.event;
		if (e.which == parseInt(GM_getValue('popupKey',"32"),10)) {
      if (overviewPopup.style.display != "block") { // prevent repeat firings, could do this by setting a global check variable but enh...
        updatePopup();
        overviewPopup.style.display = "block";
      }
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}
}
function _keyup(e){
	var overviewPopup = $$("overviewPopup");
  var popupKeyMode = !parseInt(GM_getValue('popupKeyMode'));
  if (overviewPopup) {
		e = e || window.event;
		if (e.which == parseInt(GM_getValue('popupKey',"32"),10)) {
      if ((overviewPopup.style.display != "block") && !popupKeyMode) {
        updatePopup();
        overviewPopup.style.display = "block";
      } else { overviewPopup.style.display = "none"; }
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}
}
function doPopups(){
	//debug("textarea search : " + document.getElementsByTagName("textarea").length);
  var popupKeyMode = !!(GM_getValue('popupKeyMode'),10);
	//if (!document.getElementsByTagName("textarea").length) {
		document.addEventListener("keydown",_keydown,false);
		document.addEventListener("keyup",_keyup,false);
	//}
}
function generateTip(type,id,param){
  switch (type) {
    case 'mills' :
// collect data { mill, [ req, don, ], own, ts }
      var wood  = copy(allCities[id].millresource) || false;
      var trade = copy(allCities[id].milltradegood) || false;
      var output = '';
      if (wood || trade) {
        output = '<table>';
        output += '<tr><td style="background:transparent;"></td>' + (wood ? '<th>Wood</th>' : '') + (trade ? '<th>Trade</th>' : '') + '</tr>';
        output += '<tr><th>Level</th>'  + (wood ? '<td>'+wood.lvl+'</td>' : '')                 + (trade ? '<td>'+trade.lvl+'</td>' : '') + '</tr>';
        if (wood && !wood.req)   { wood.req  = 'UNDER'; wood.don  = 'CONSTR'; wood.dif  = 'UCTION'; wood.bar = ''; }
        else if (wood) {
          wood.dif = wood.req-wood.don;
          wood.bar = '<div style="width:'+Math.round(wood.don/wood.req*100)+'%; background-color:blue;">&nbsp;</div>';
        }
        if (trade && !trade.req) { trade.req = 'UNDER'; trade.don = 'CONSTR'; trade.dif = 'UCTION'; trade.bar = ''; }
        else if (trade) {
          trade.dif = trade.req-trade.don;
          trade.bar = '<div style="width:'+Math.round(trade.don/trade.req*100)+'%; background-color:orange;">&nbsp;</div>';
        }
        output += '<tr><th>To Next</th>'    + (wood ? '<td>'+fmtNumber(wood.req)+'</td>' : '')                 + (trade ? '<td>'+fmtNumber(trade.req)+'</td>' : '') + '</tr>';
        output += '<tr><th>Donated</th>'    + (wood ? '<td>'+fmtNumber(wood.don)+'</td>' : '')                 + (trade ? '<td>'+fmtNumber(trade.don)+'</td>' : '') + '</tr>';
        output += '<tr><th>Difference</th>' + (wood ? '<td>'+fmtNumber(wood.dif)+'</td>' : '')                 + (trade ? '<td>'+fmtNumber(trade.dif)+'</td>' : '') + '</tr>';
        output += '<tr><th>Progress</th>'   + (wood ? '<td>'+wood.bar+'</td>'                        : '')     + (trade ? '<td>'+trade.bar+'</td>' : '') + '</tr>';
        output += '<tr><th>Updated</th>'    + (wood ? '<td>'+durationHMS((now-wood.ts)/1000,3)+'</td>' : '')     + (trade ? '<td>'+durationHMS((now-trade.ts)/1000,3)+'</td>' : '') + '</tr>';
        output += '</table>';
      
      }
      return output;
      
    break;
    case 'demographics' :
      var pop = allCities[id].demographics, output = '';
      if (pop) {
        var img = {
          growthPositive : '<img style="float:left;" src="/skin/icons/growth_positive.gif" width=24 heigh=24/>',
          growthNegative : '<img style="float:left;" src="/skin/icons/growth_negative.gif" width=24 heigh=24/>',
          smile0 : '<img style="float:left;" src="/skin/smilies/outraged.gif" width=24 height=24 />',
          smile1 : '<img style="float:left;" src="/skin/smilies/sad.gif" width=24 height=24 />',
          smile2 : '<img style="float:left;" src="/skin/smilies/neutral_x32.gif" width=24 height=24 />',
          smile3 : '<img style="float:left;" src="/skin/smilies/happy.gif" width=24 height=24 />',
          smile4 : '<img style="float:left;" src="/skin/smilies/ecstatic_x32.gif" width=24 height=24 />'
        }
        var timeLeft = 0, happy = pop.satisfaction - pop.population;
        // ALWAYS SHOW POPULATION / SPACE
        output = '<table><tr><th>Population</th><td>' + (happy ? happy > 0 ? img.growthPositive : img.growthNegative : '' ) + fmtNumber(pop.population) + ' / ' + fmtNumber(pop.maxSpace) + ' ' + '</td></tr>';
        // SHOW MAX POPULATION IF IT IS LESS THAN THE AMOUNT OF SPACE
        if (pop.satisfaction < pop.maxSpace)
          output += '<tr><th>Max Population</th><td>'+fmtNumber(Math.min(pop.satisfaction,pop.maxSpace))+'</td></tr>';
        // SHOW HAPPINESS ALWAYS
        if (happy >= 300)     smile = img.smile4;
        else if (happy >= 50) smile = img.smile3;
        else if (happy >= 0)  smile = img.smile2;
        else if (happy > -50) smile = img.smile1;
        else                  smile = img.smile0;
        output += '<tr><th>Happiness</th><td>' + smile +fmtNumber(happy)+'</td></tr>';
        // SHOW OVERPOPLATION IF THERE IS ANY (SATISFACTION > SPACE) / LOWER HAPPINESS OR INCREASE SPACE
        if (pop.satisfaction > pop.maxSpace)
            output += '<tr><th>Excess Happiness</th><td>'+fmtNumber(Math.abs(pop.satisfaction - pop.maxSpace))+'</td></tr>';
        // SHOW EXCESS SPACE IF THERE IS ANY (SATISFACTION < SPACE) / INCREASE HAPPINESS
        if (pop.satisfaction < pop.maxSpace)
            output += '<tr><th>Excess Space</th><td>'+fmtNumber(Math.abs(pop.satisfaction - pop.maxSpace))+'</td></tr>';

        if ((pop.satisfaction <= pop.maxSpace)) {
          timeLeft = 1/0.02*Math.log(Math.abs(happy));
        } else {
          timeLeft = 1/0.02*(Math.log(happy)-Math.log(pop.satisfaction-pop.maxSpace));
        }
        // SHOW TIME TILL FULL IF POPULATION IS CHANGING
        if (timeLeft)
          output += '<tr><th>Time Till Stable</th><td>'+durationHMS(timeLeft*3600,3)+'</td></tr>';

        output += '</table>';
      }
      return output;
    break;

    case 'resource' :
      var safe = IKARIAM.getSafe(id);

      var wineConsumptionText = 0,free,production=0,timeTillFull,output,temp_resources = allCities[id].resources;
      var guess = IKARIAM.getResource(id,param);
      free = (temp_resources.maxCapacity[param] - guess);

      if (param == 'wood') production = temp_resources.production.wood;
      else if (param == temp_resources.production.tradeName) {
        production = temp_resources.production.trade;
        if (param == 'wine' && temp_resources.wineConsumption) production -= (temp_resources.wineConsumption/3600);
      }
     
      output = '<table><tr><th>Capacity</th><td>'+guess.fmtNumber() + ' / ' + fmtNumber(temp_resources.maxCapacity[param]) + '</td></tr>';
      output += '<tr><th>Free</th><td>' + free.fmtNumber() + '</td></tr>';
      output += '<tr><th>Safe</th><td>' + safe.fmtNumber() + '</td></tr>';
      if (guess > safe) output += '<tr><th>Lootable</th><td>' + (guess-safe).fmtNumber() + '</td></tr>';
      else output += '<tr><th>Till Lootable</th><td>' + (safe-guess).fmtNumber() + '</td></tr>';
      if (production) {
        if (production > 0 && guess < safe) {
          output += '<tr><th>Lootable In</th><td>' + durationHMS((safe-guess) / Math.abs(production),3) + '</td></tr>';
        }
        //if (wineConsumptionText && (temp_resources.production.tradeName == 'wine')) production -= temp_resources.wineConsumption;
        output += '<tr><th rowspan="3">Production</th><td>' + fmtNumber(production*3600) + ' / hour</td></tr>';
        output += '<tr><td>' + fmtNumber(production*3600*24) + ' / day</td></tr>';
        output += '<tr><td>' + fmtNumber(production*3600*24*7) + ' / week</td></tr>';
        if (production > 0) {
          output += '<tr><th>Full In</th><td>' + durationHMS(free / Math.abs(production),3) + '</td></tr>';
        }
        else output += '<tr><th>Depleted In</th><td>' + durationHMS(guess / Math.abs(production),3) + '</td></tr>';
      } else if (param == 'wine' && temp_resources.wineConsumption) {
        //timeTillFull = durationHMS(guess / temp_resources.wineConsumption * 3600,3);
        output += '<tr><th rowspan="2">Wine Consumption</th><td>-' + temp_resources.wineConsumption + ' / hour</td></tr>';
        output += '<tr><td>-' + fmtNumber(temp_resources.wineConsumption*24) + ' / day</td></tr>';
        output += '<tr><th>Depleted In</th><td>' + durationHMS(guess / temp_resources.wineConsumption * 3600,3) + '</td></tr>';
      }
      output += '</table>';
      return output;
    break;
    default:
      return '';
  }
}



function buildingUpgradeNote(){
  var viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
  viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
  var buildID = document.body.id, upgradeLink = $X('//div[@id="buildingUpgrade"]//li[@class="upgrade"]/a');

  if (allCities[viewportId] && upgradeLink) {
    if (upgradeLink.className == 'disabled'){
      var enddate = 0;
      if ((document.body.id == 'shipyard') || (document.body.id == 'barracks') || (document.body.id == 'safehouse')) {
        for each (var unit in $x('//*[@id="unitConstructionList"]//div[@class="time"]/text()'))
            enddate = Math.max(enddate,hmsToSeconds(trim(unit.nodeValue)));
      } else if (document.body.id == 'workshop'){
        var temp = $X('//*[@id="upgradeCountdown"]/text()');
        if (temp) enddate = hmsToSeconds(trim(temp.nodeValue));
      }

      var tempBuild = allCities[viewportId].buildings[buildID];
      if (tempBuild && enddate) {
        tempBuild.up = now + enddate*1e3;
        save();
      }
    } else {
      //var upgradeLinkHref = upgradeLink.href;
      var currPosition = parseInt(upgradeLink.href.match(/position=(\d+)/)[1],10);

      //update db w/ building info
      //if (buildID == 'palaceColony') { buildID = 'palace'; }  // reuse palace for governor's residence

      var tempBuild = allCities[viewportId].buildings[buildID];
      if ((buildID == "warehouse") && (tempBuild.length != undefined)) {
        tempBuild = tempBuild.reduce(function(previousValue, currentValue){ return (previousValue.p == currPosition) ? previousValue : currentValue; });
      }
      if (tempBuild) {
        var building = {
          level : parseInt($X('//div[@id="buildingUpgrade"]/div/div[@class="buildingLevel"]/text()').nodeValue,10),
          up : false
        };
        if (!!$$('upgradeInProgress')) {
          var script      = $X('//div[@id="upgradeInProgress"]/script[1]').innerHTML;
          var scriptLines = script.split('\n');
          var enddate     = parseInt(scriptLines[4].replace(/\D/g,''),10);
          var currenttime = parseInt(scriptLines[5].replace(/\D/g,''),10);
          building.up = enddate*1e3 + now - currenttime*1e3;  // does not account for day light savings
          building.level += 0.5;
        }
        if ((tempBuild.level != building.level) || (tempBuild.up != building.up)) {
          tempBuild.level = building.level;
          tempBuild.up = building.up;

          save();
        }
      }
    }

    goals.setup();
  }
}

function buildInfoBox(){
  //NEW INFOBOX
  var output = '';
  if (current) {  // own city selected
    var temp_resources = current && current.resources;
    output += '<table style="margin-left:auto;margin-right:auto;width:auto;">';
    output += '<tr><td style="background-image:url('+ICON.wood+'); background-repeat: no-repeat; padding-left: 30px; padding-right: 1em;"><a href=' + buildResourceHref(current.id || 0) + '>' + fmtProductionRate(temp_resources.production.wood) + '</a></td>';
    output += '<td style="height:19px; background-image:url('+ICON[temp_resources.production.tradeName]+'); background-repeat: no-repeat; padding-left: 30px;"><a href=' + buildTradegoodHref(current.id || 0) + '>' + fmtProductionRate(temp_resources.production.trade) + '</a></td>'
     + '<td style="height:19px; background-image:url('+IMG.wonder+'); background-repeat: no-repeat; padding-left: 30px;"><a href="?view=wonder&id='+current.islandId + '">' + (current.millwonder && current.millwonder.lvl || '?') + '</a></td>'
     + '<td><a href="?view=islandBoard&id='+current.islandId + '"><img src="' + IMG.forum + '" width="20" height="22"></a></td>'
     + '</tr></table>';
  }

  var newElement = addDynamicBox('<img style="float:right; margin-right: 8px; margin-top: 6px;" src="'+openIcon+'"/>'+scriptName,output,2,'okInfoBox');
  if (newElement) {
    onClick(newElement.firstChild,showHide);
    onDblclick(newElement,function(){ debug(uneval(current)); });
  }
  return newElement;
}
function buildPopUp(){
  function printBuildingLevels(){
    function in_array(needle, haystack) { for (var key in haystack) if (haystack[key] == needle) return true; return false; }

    function printBuilding(building,buildingName){
      buildingName = buildingName || BUILDINGLIST[j];
      if (building) {
        var output = '', link = '<a href="' + IKARIAM.getBuildingHref(id,buildingName,building.p) + '">'  + building.level + '</a>';
        if (!building.up) output = link;
        else {
          var left = '', end = building.up;
          if (end) left = '<span class="toDuration" rel="'+end+'">(' + duration((end-now)/1000) + ')</span>';
          output += '<span style="background-color: #FFFF99;">' + link + left + '</span>';
        }
      }
      else output += '-';
      return output;
    }
    var i,j,id,temp_build,temp_builds,buildingName,newBuildingList = [];
    
    // 1st pass to check for unused buildings, no need to fix palaceColony here since we can safely assume palaceColony cannot exist w/o palace
    for each (id in cityOrder) {
      temp_builds = allCities[id].buildings || {};
      for (j=0; j < BUILDINGLIST.length; ++j)
          if ((temp_builds[BUILDINGLIST[j]]) && (!in_array(BUILDINGLIST[j],newBuildingList))) { newBuildingList.push(BUILDINGLIST[j]); }
    }

    // top row labels
    var table_buildsLvl = '<table id="ok_buildings" style=""><tr><td style="min-width:75px"></td>';
    for (i=0; i < BUILDINGLIST.length; i+=2) {
      var enabled  = in_array(BUILDINGLIST[i],newBuildingList);
      var span     = in_array(BUILDINGLIST[i+1],newBuildingList) ? '2' : '1';
      buildingName = (localize[BUILDINGLIST[i]] || BUILDINGLIST[i]).replace(' ','<Wbr/> ');
      if (enabled)          table_buildsLvl += '<th colspan="'+span+'" class="o" id="okgo'+ (++tdid) +'">' + buildingName + '</th>';
      else if (span == '2') table_buildsLvl += '<th class="e">&nbsp;</th>';
    }
    table_buildsLvl += '</tr>';

    for each (id in cityOrder) {
      var activeStyle = (id == (current && current.id) || 0)? ' class="okcity'+id+' okActive"' : ' class="okcity'+id+'"';
      var cityHref = 'http://'+document.domain+"/index.php?action=header&function=changeCurrentCity&cityId="+id+"&view=city&actionRequest="+$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value;
      table_buildsLvl += '<tr'+activeStyle+' style="text-align: center;"><td id="okgo'+ (++tdid) +'"><a href="' + cityHref + '">' + allCities[id].name + '</td>';
      temp_builds = allCities[id].buildings || {};
      for (j=0; j < BUILDINGLIST.length; ++j) {
        if (in_array(BUILDINGLIST[j],newBuildingList)) {
          var openTag  = '<td class="'+(j % 2 ? "e" : "o")+'" id="okgo'+ (++tdid) +'">';
          if (temp_build = temp_builds[BUILDINGLIST[j]]) {
            table_buildsLvl += openTag;
            if (temp_build.length !== undefined) { for each (building in temp_build) { table_buildsLvl += printBuilding(building); } }
            else { table_buildsLvl += printBuilding(temp_build); }
            table_buildsLvl += '</td>';
          } else if (BUILDINGLIST[j] == 'palace' && (temp_build = temp_builds['palaceColony'])){
            table_buildsLvl += openTag+printBuilding(temp_build,'palaceColony')+'</td>';
          } else {
            table_buildsLvl += openTag+'-</td>';
          }
        }
      }
      table_buildsLvl += '</tr>';
    }
    table_buildsLvl += '<tr><td></td>';
    
    // bottom row labels
    for (i=1; i < BUILDINGLIST.length; i+=2) {
      var enabled  = in_array(BUILDINGLIST[i],newBuildingList);
      var span     = in_array(BUILDINGLIST[i-1],newBuildingList) ? '2' : '1';
      buildingName = localize[BUILDINGLIST[i]] || BUILDINGLIST[i];
      if (enabled) {
        table_buildsLvl += '<th colspan="'+span+'" class="e" id="okgo'+ (++tdid) +'">' + buildingName + '</th>';
      } else if (span == '2') {
        table_buildsLvl += '<th class="e">&nbsp;</th>';
      }
    }
    table_buildsLvl += '</tr></table>';
    return table_buildsLvl;
  }
 
  function printResources(){
    //return;
    function colorMix(input,matrix,alpha){
      if (alpha === undefined) alpha = 1;
      return 'rgba('+(input*matrix[0][0]+matrix[0][1])+'%,'+ (input*matrix[1][0]+matrix[1][1])+'%,'+ (input*matrix[2][0]+matrix[2][1])+'%,'+alpha+')';
    }
    var sum = { wood:0,wine:0,marble:0,crystal:0,sulfur:0,population:0,missing:0 };
    var table_resources = '<table id="ok_resources" style="float:left;">';
    // HEADER
    table_resources += '<thead><tr><td style="min-width:75px;"></td>';
    for (var resource in ICON)
        table_resources += '<td style="width:100px;" id="okgo'+ (++tdid) +'">' + image(resource) + unsafeWindow.LocalizationStrings['resources'][resource] + '</td>';
    table_resources += '<td class="tanline">&nbsp;</td><td style="font-size:22px;"><img src="/skin/characters/40h/citizen_r.gif" height="24"/> / <img src="/skin/icons/livingspace_24x24.gif"/></td>';
    table_resources += '</tr></thead>';

    // ROW 1
    cityOrder.forEach(function(id,i) {
      var temp_resources = allCities[id].resources;
      if (!temp_resources.__count__) temp_resources = {resources:{wood:0,wine:0,marble:0,crystal:0,sulfur:0},maxCapacity:{wood:0,wine:0,marble:0,crystal:0,sulfur:0},production:{wood:0,trade:0,tradeName:''},wineConsumption:0,ts:0};
      var activeStyle = (id == (current && current.id) || 0)? ' class="okcity'+id+' okActive"' : ' class="okcity'+id+'"';
      table_resources += '<tbody'+activeStyle+' style="display:'+options.ok_resources+'"><tr style="text-align:center;">'
      + '<td id="okgo'+ (++tdid) +'"><a>' + allCities[id].name + '</a>'
      + '<a href="/index.php?view=transport&destinationCityId='+id+'"><img src="/skin/resources/icon_actionpoints.gif" width="12" height="12" alt="Txfr"></a>'
      + '</td>';
      tdid_click[tdid] = function(e){ if (e.target.nodeName == 'A') changeCity(id,'form'); };
      for (resource in ICON){
        var tradeNote = '', extraMsg = '', production = 0, href = '';
        switch (resource){
          case 'wood' :
            production = temp_resources.production.wood;
            sum.wood  += production;
            href = buildResourceHref(id);
          break;
          case 'wine' :
            extraMsg = temp_resources.wineConsumption ? '-' + temp_resources.wineConsumption : '';
            sum.wine -= (temp_resources.wineConsumption || 0)/3600;
          default:
            if (temp_resources.production.tradeName == resource) {
              sum[resource] += temp_resources.production.trade;
              production = temp_resources.production.trade;
              href = buildTradegoodHref(id);
            }
        }
        var guess = IKARIAM.getResource(id,resource);
        if (production)
        {
          tradeNote = '<span class="tradeNote"><a href="' + href + '">+' + ((production !== undefined) ? fmtProductionRate(production) : '?') + '</a>' + extraMsg + '</span>'; 
          //if (temp_resources.ts) guess += production * (now - temp_resources.ts) / 1000;
        }
        else if (extraMsg) { tradeNote = '<span class="tradeNote">' + extraMsg + '</span>'; }
        table_resources += '<td id="okgo'+ (++tdid) +'">' + fmtNumber(guess) + tradeNote;
        table_resources += '</td>';
      }
      // TRANSPORT HELPER CODE
      var transportHelper = { wood:{avg:0,max:0},wine:{avg:0,max:0},marble:{avg:0,max:0},crystal:{avg:0,max:0},sulfur:{avg:0,max:0}};
      if (enableTransport && ($X("//input[@name='destinationCityId']").value == id) && current) {
        var averages = buildAverages();
        var amountAvg = amountToSend(averages,averages,allCities[id].resources,current.resources);
        var amountMax = amountToSend({'wood':1e10,'wine':1e10,'marble':1e10,'crystal':1e10,'sulfur':1e10},averages,allCities[id].resources,current.resources);
        var sliderBox = $X('//div[@id="transportGoods"]//ul[@class="resourceAssign"]');
            //sliderBox.style.width = 'auto';
        for (var resource in transportHelper){
          var content = '';
          transportHelper[resource].avg = amountAvg[resource];
          transportHelper[resource].max = amountMax[resource];
          for each (var amount in transportHelper[resource])
              content += '<button class="button quickTransport" value="'+resource+'=' +  amount+'">'+amount+'</button>';
          content += '<br/><span>average</span><span>max</span>';
          var slider = $$('textfield_'+(resource == 'crystal' ? 'glass' : resource));
          if (slider) slider.parentNode.insertBefore(node('div','transportHelper','',content),slider.parentNode.firstChild);
          //if (slider) slider.parentNode.appendChild(node('div','',{left:'508px',position:'absolute',top:'4px'},content));
          //if (slider) slider.setAttribute("rel","tooltip.mills."+id);
        }
        GM_addStyle(
          'ul.resourceAssign > li .transportHelper { display:none; left: 440px; top:32px; position:absolute; z-index:1; }'
          + 'ul.resourceAssign > li:hover .transportHelper { display:block; }'
          +'.quickTransport { width: 80px; font-size:10px; margin:0; }'
          +'.transportHelper > span { width:80px; background:tan; display:inline-block; text-align:center;}'
        );
        //$X('./li[last()]/div[2]',sliderBox).innerHTML += '<br/> <span style="width:60px; display:inline-block; padding-left:1em;">average</span> <span>max</span>';
        $('button.quickTransport').each(function(){ onClick(this, transportMax, true); });
      }
      temp = allCities[id].demographics;
      if (temp) {
              table_resources += '<td class="tanline">&nbsp;</td><td>'+temp.population +' / '+temp.maxSpace+'</td>';
              sum.population += temp.population;
              sum.missing += (Math.min(temp.satisfaction,temp.maxSpace) - temp.population);
      } else  table_resources += '<td class="tanline">&nbsp;</td><td>?</td>';
      table_resources += '</tr>';
      
      //ROW TWO
      var then = temp_resources.ts, old  = '';
      var bar = {}, percent = {}, colors = {
                      wood   :[[0,58],[1,0] ,[1,0]],
                      wine   :[[0,58],[1,0] ,[0,96]],
                      marble :[[1,0] ,[1,0] ,[1,0]],
                      crystal:[[1,0] ,[0,81],[0,96]],
                      sulfur :[[0,93],[0,89],[0.5,0]]
                    };
      if (then && now) old = '<span class="toDuration" rel="'+then+'" style="float:left;">('+duration((now-then)/1000)+')</span>';
      var woodIcon  = (allCities[id].millresource && allCities[id].millresource.req)   ? "&#x258" +limit(Math.round(allCities[id].millresource.don/allCities[id].millresource.req*8),1,8) +"; " : '&nbsp;';
      var tradeIcon = (allCities[id].milltradegood && allCities[id].milltradegood.req) ? " &#x258"+limit(Math.round(allCities[id].milltradegood.don/allCities[id].milltradegood.req*8),1,8) +";" : '&nbsp;';
      //debug(table_resources);
      table_resources += '<tr style="text-align: right; font-size: 10px;padding-right: 3px;"><td rel="tooltip.mills.'+id+'" id="okgo'+ (++tdid) +'">' + old + woodIcon + (allCities[id].millresource && allCities[id].millresource.lvl || '?') + '/'+(allCities[id].milltradegood && allCities[id].milltradegood.lvl || '?')+tradeIcon+'</td>';
      for (var resource in ICON) {
        var barText = outText = '&nbsp;';
        var guess = IKARIAM.getResource(id,resource);
        percent[resource] = Math.ceil(guess/number(temp_resources.maxCapacity[resource])*100);
        if (percent[resource] < 70)  outText = (fmtNumber(temp_resources.maxCapacity[resource]) || '-');
        else                          barText = (fmtNumber(guess - temp_resources.maxCapacity[resource]) || '-');
        bar[resource]    = '<div class="okHBar" style="background-color:' + colorMix(percent[resource],colors[resource],0.8) +'; width:'+percent[resource]+'%">'+barText+'</div>';
        table_resources += '<td rel="tooltip.resource.'+id+'.'+resource+'">' + bar[resource] + outText + '</td>';
      }
      if (temp) {
        var faces = { happy:'<img src="/skin/smilies/happy.gif" width=10 height=10 />',
                      sad:'<img src="/skin/smilies/sad.gif" width=10 height=10 />',
                      neutral:'<img src="/skin/smilies/neutral_x32.gif" width=10 height=10 />',
                      attn:'<img src="/skin/advisors/city/attention.gif" width=10 height=10 />',
                    };
        var happinessMsg = (temp.satisfaction == temp.population ? faces.neutral : temp.satisfaction < temp.population ? faces.sad : faces.happy) + (temp.satisfaction - temp.population);
        var missingMsg = '(' + (Math.min(temp.satisfaction,temp.maxSpace) - temp.population) + ')';
        var capacityMsg  = (temp.satisfaction > temp.maxSpace ? '<span class="overpopulation" title="Overpopulation">'+faces.attn : '<span>') + (temp.satisfaction - temp.maxSpace) + '</span>';
        table_resources += '<td class="tanline">&nbsp;</td><td rel="tooltip.demographics.'+id+'">' + happinessMsg + ' ' + missingMsg + ' ' + capacityMsg + '</td>';
        }
      else table_resources += '<td class="tanline">&nbsp;</td>';
      table_resources += '</tr></tbody>';
    });
    table_resources += '<tfoot><tr><td>&Sigma;</td>';
    for (var resource in ICON) table_resources += '<th style="width:100px">' + fmtProductionRate(sum[resource]) + ' / ' + fmtProductionRate(sum[resource] * 24) + '</th>';
    table_resources += '<td class="tanline">&nbsp;</td><th style="width:100px">' + sum.population + ' (' + sum.missing + ')</th>';
    table_resources += '</tr></tfoot>';

    table_resources += '</table>';
    table_resources += '<div style="clear:both;"></div>';
    return table_resources;
  }

  function printForce(type){
    var buildHref = type == 'army' ? buildArmyHref : buildNavyHref;
    var temp, output = '<table id="ok_'+type+'" style="float:left;">', stats = {};
    // PASS 1, build dictionary
    //for (var unit in force) stats[unit] = 0;
    for each (var id in cityOrder) {
      if (temp = allCities[id][type])
          for (var unit in temp) {
            if (!stats[unit]) stats[unit] = 0;
            stats[unit] += temp[unit] || 0;
          }
    }
    // THEAD
    output += '<thead><tr><td style="min-width:75px;"></td>';
    for (var unit in stats) if (stats[unit]) output += '<th id="okgo'+ (++tdid) +'">'+(localize[unit] || unit)+'</th>';
    output += '</tr></thead>';
    output += '<tbody style="display:'+options['ok_'+type]+'">';
    // PASS 2
    for each (var id in cityOrder) {
      var activeStyle = (id == (current && current.id) || 0)? ' class="okcity'+id+' okActive"' : ' class="okcity'+id+'"';
      var sum = 0;
      output += '<tr'+activeStyle+' style="text-align:center;"><td id="okgo'+ (++tdid) +'" style="white-space:nowrap;"><a href="'+buildHref(id)+'">' + allCities[id].name + '</a><a href="/index.php?view=deployment&deploymentType='+(type == 'army'? 'army' : 'fleet')+'&destinationCityId='+id+'"><img src="/skin/resources/icon_actionpoints.gif" width="12" height="12" alt="Txfr"></a></td>';
      temp = allCities[id][type] || {};
      for (var unit in stats) {
        if (stats[unit]) {
          output += '<td id="okgo'+ (++tdid) +'"><span class="textLabel">'+unit+': </span>'+(temp && temp[unit] || '')+'</td>';
          sum += temp[unit] || 0;
        }
      }
      if (type == 'army') output += '<td>'+sum+' / ' + IKARIAM.getGarrisonLimit(id) + '</td>';
      output += '</tr>';
    }
    output += '</tbody>';
    // TFOOT
    output += '<tfoot><tr><td>x&#772;</td>';
    for (var unit in stats) if (stats[unit]) output += '<th>'+(stats[unit]?Math.round(stats[unit]/cityOrder.length*10)/10:'')+'</th>';
    output += '</tr><tr><td>&Sigma;</td>';
    for (var unit in stats) if (stats[unit]) output += '<th>'+(stats[unit]?stats[unit]:'')+'</th>';
    output += '</tr></tfoot>';

    output += '</table>'
    return output;
  }

  // BEGIN ACTUAL WORK
  if (!$$('overviewPopup')) {
    var tdid = 0; // table element counter
    var tdid_click = {};  // store click handlers for later
    var popupKeyMode = GM_getValue('popupKeyMode',0);
    var popupKeyModeOptionsHTML = '', popupKeyModeOptions = {0:'hold',1:'toggle'};
    for (var key in popupKeyModeOptions) popupKeyModeOptionsHTML += '<option value="'+key+'"' + (popupKeyMode == key ? ' selected' : '') +'>'+popupKeyModeOptions[key]+'</option>';
    var popupKey = parseInt(GM_getValue('popupKey',"32"),10);
    var popupKeyOptionsHTML = '', popupKeyOptions = {9:'TAB',16:'SHIFT',20:'CAPS LOCK',32:'SPACE',192:'` (backtick)',74:'j',75:'k'};
    for (var key in popupKeyOptions) popupKeyOptionsHTML += '<option value="'+key+'"' + (popupKey == key ? ' selected' : '') +'>'+popupKeyOptions[key]+'</option>';
    var overviewPopup = node("div",'',{'display':'none'},
      '<div><h2 id="igoheader">' +
          '<div id="icon_close">[X]</div><a href="'+scriptMetadata.homepage+'">'+scriptName + '</a> <select>'+popupKeyModeOptionsHTML+'</select <select>' + popupKeyOptionsHTML + '</select>' + 
          '<img src="/skin/layout/notice_close_hover.gif" style="display:none;"/>' + 
        '</h2>'	+
         '<div id="overviewPopupTab1">' + 
            printBuildingLevels()	+ printResources()+printForce('army')+printForce('fleet')+'<div style="clear:both;"></div>' + 
          '</div>' +
         //'<div id="overviewPopupTab2">' + 
          //printForce('army')+printForce('fleet')+
          //'</div>' +
        '</div>'
    );
    overviewPopup.id = "overviewPopup";
    GM_addStyle('#icon_close { background-image:url(/skin/layout/notice_close.gif); text-indent: -10000px; text-align:left; width:18px; height:18px; margin:0 0 0 auto; cursor:pointer; float:right;}'
        + '#icon_close:hover { background-image:url(/skin/layout/notice_close_hover.gif); }'
    );
    if (options.position) {
      overviewPopup.style.left = options.position.left + 'px'; 
      overviewPopup.style.top  = options.position.top + 'px'; 
    }
    document.body.appendChild(overviewPopup);

    // CONNECT INTERACTIVE ELEMENTS
    onClick($$('icon_close'),showHide);
    $X('.//select[1]',overviewPopup).addEventListener("change", function(){GM_setValue('popupKeyMode',this.value);}, false);
    $X('.//select[2]',overviewPopup).addEventListener("change", function(){GM_setValue('popupKey',this.value);}, false);

    var elem;
    for each (var thead in $x('.//thead',$$('overviewPopup'))){
      if (elem = $X('.//td',thead)) {
        elem.style.cursor = 'pointer';
        elem.innerHTML    = '<img width="12" height="12" src="'+openIcon+'">';
        onClick(elem,function() { showHideTbody(this,this.parentNode.parentNode.parentNode.id); });
      }
    }

    if (options.hl) $($.map(options.hl, function(n, i){ return "#okgo"+n; }).join(',')).each(hilightCell);
    $("#overviewPopup *[id^='okgo']").dblclick(hilightCell);

    for (var id in tdid_click){
      $('#okgo'+id).click(tdid_click[id]);
    }

    //Select all anchor tag with rel set to tooltip
    $('*[rel^="tooltip"]').hoverIntent(function(e) {
        var tip = $(this).attr('rel').split('.');
        $(this).append('<div id="tooltip">' + generateTip(tip[1],tip[2],tip[3]) + '</div>');		
        //Set the X and Y axis of the tooltip
        var offset = $(this).offset();
        
        $('#tooltip').css('left', offset.left - (parseInt($$('overviewPopup').style.left,10)) + 20 );
        $('#tooltip').css('top', offset.top - (parseInt($$('overviewPopup').style.top,10)) + 12 - window.pageYOffset );

        //debug(e.pageX,e.pageY,'<=>', Math.round(e.pageX - $(this).offset().left), Math.round(e.pageY - $(this).offset().top),'<=>' ,offset.left - options.position.left,offset.top - options.position.top,'scroll',window.pageYOffset  );
      },function() {
        $(this).children('div#tooltip').remove();
    });

    setCitySelected = function(id){
      $('.okcity'+id).hover( function(){$('.okcity'+id).addClass('okSelected');} , function(){ $('.okcity'+id).removeClass('okSelected'); } );
    }
    for each (id in cityOrder) setCitySelected(id);

    $(document).ready(function(){
      new unsafeWindow.YAHOO.util.DD('overviewPopup');
      //dd2.on('endDrag',function(e){debug('done');});
    });
$('#overviewPopup').mouseup(function(){
  options.position = {top:parseInt($$('overviewPopup').style.top,10), left:parseInt($$('overviewPopup').style.left,10)};
  serialize('options',options);
});
    /*
    $('#overviewPopup').draggable({
        handle:'#igoheader',
        cancel:'select,#icon_close',
        start:function(event,ui){          debug('hi drag started');        },
        stop:function(event,ui){
          debug('huh?');
          options.position = ui.position;
          GM_setValue('options_'+gameServer,uneval(options));
        }
    });
    */

  }
}

var goals = {
  init: function(){
    $('#ok_resources tbody').each(function(){
      var goal, id = number(this.className.split(' ')[0]), lookup={wood:2,wine:3,marble:4,crystal:5,sulfur:6};
      if (id && allCities[id] && (goal=allCities[id].goal) && goal.__count__) {
        $("#overviewPopup .okcity"+id+" .goalNote").remove();
        for (var resource in goal){
          var diff  = allCities[id].goal[resource] - IKARIAM.getResource(id,resource);
          var title = (allCities[id].goal[resource] > allCities[id].resources.maxCapacity[resource]) ? Math.ceil((allCities[id].goal[resource] - allCities[id].resources.maxCapacity[resource])/8000) + ' warehouse levels needed' : '';
          var elem  = $X("./tr[1]/td["+lookup[resource]+"]",this);
          $(elem).append($('<span class="goalNote" rel="'+id+'" title="'+title+'">('+fmtNumber(diff)+')</span>').addClass(diff > 0 ? 'pos' : 'neg'));
        }
      }
    });
    $("#overviewPopup .goalNote").click(function(){
      var id = this.getAttribute('rel');
      if (id && allCities[id]) {
        allCities[id].goal = {};
        save();
        $("#overviewPopup .okcity"+id+" .goalNote").remove();
      }
    });
    GM_addStyle(
      "#overviewPopup .goalNote { margin-left:0.5em; font-size: 10px; cursor: pointer; } " + 
      "#overviewPopup .goalNote:hover { text-decoration: line-through; } "
    );
  },
  setup : function(){
    $('<img src="/skin/layout/icon-message.gif" title="Set Goal"/>').
    css({
      display:'inline',
      'margin-left':'3px',
      cursor:'pointer'
    }).
    appendTo($("#buildingUpgrade div.content h4")).
    click(function(){
      var resourceName,goal = {};
      $('#buildingUpgrade ul.resources li').filter(':not(.time)').each(function(){
        resourceName = this.className.split(" ")[0];
        if (resourceName == 'glass') resourceName = 'crystal';
        goal[resourceName] = number(this.childNodes[1].nodeValue);
      });
      var viewportId = $('#breadcrumbs a.city').attr("href");
      viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      allCities[viewportId].goal = goal; save();
    });
  },
}



/************************* CONSTRUCTION QUEUE / AUTO BUILD *******************************/
var clock = '<img src="/skin/layout/icon-clock_8x10px.gif" width="8" height="10" style="display:inline; margin:0 1px;"/>'
var CLOCK = '<img src="/skin/layout/clock.gif" width="13" height="13" style="display:inline; margin:0 1px;"/>'
var BUILD = '<img src="/skin/layout/icon-wall.gif" width="16" height="16" style="display:inline; margin:0 1px;"/>'
var CHECK = '<img src="/skin/layout/answeryes.gif" width="13" height="13" style="display:inline; margin:0 1px;"/>'
// CONSTRUCTION QUEUEING FUNCTIONS
function interruptable(){
  switch (document.body.id) {
    case 'blockade' :
    case 'deployment' :
    case 'plunder' :
    case 'transport' :
    case 'sendIKMessage' :
        return false;
    break;
    default : return true;
  }
}
var QUEUE = {
  eq : function(e1,e2){ return ((e1.city == e2.city) && (e1.building == e2.building) && (e1.position == e2.position)); },
  init: function(){
// generate cache of ready times
    this.readyTimesCache = {};
    for each (var id in IKARIAM.citySelect) this.readyTimesCache[id] = QUEUE.timeTillIdle(id);
    
    this.timer = '';
    this.load();
    this.draw();
    if ($$('buildingUpgrade')) this.processBuilding();
    else if (document.body.id == "buildingGround") this.processEmptyBuildingGround();
  },
  toString : function(entry){
    var current = IKARIAM.getBuildingLevel(entry.city,entry.building,entry.position);
    return allCities[entry.city].name + ' / ' + (localize[entry.building] || entry.building)
      + ' ' + current + '>>' +entry.level
      + ' ' + uneval(entry.needed);
  },
  toHTML : function(entry){
    var liStyle='';
    if (this.currentBuilding && this.eq(this.currentBuilding,entry)) {
      liStyle = ' style="background:#DECEA1;"';
      //debug('found active building in queue');
    }
    var needed = [],readyTime = this.readyTimesCache[entry.city];
    var current = IKARIAM.getBuildingLevel(entry.city,entry.building,entry.position);
    if (Math.round(current) < entry.level)
    {
      for (var resource in entry.needed)
          if (IKARIAM.getResource(entry.city,resource) < entry.needed[resource]) needed.push(image(resource) + ' '+fmtNumber(entry.needed[resource]-IKARIAM.getResource(entry.city,resource)));
      if (needed.length == 0 && readyTime) needed = clock+'<span class="toDurationHMS" rel="'+readyTime+',2">'+durationHMS((readyTime-now)/1000,2)+'</span>';
    }
    else needed = 'done';
    return '<div'+liStyle+'>'
    + '<div style="float:left;clear:both; font-weight:bold;">'+allCities[entry.city].name + '</div>'
    + '<div style="float:left;">' + (localize[entry.building] || entry.building)
    //+ ' (<span class="toDurationHMS" rel="'+entry.time+',2">' +durationHMS((entry.time-now)/1000,2)+ '</span>) [s'+(entry.time%10)+']
    + ' ' + current + '&rArr;' +entry.level
    + ' <span style="color:#666; font-size:smaller; white-space:nowrap;">(' + needed + ')</span>'
    
    + '</div>'
    + '<div style="clear:both;"></div></div>';
  },
  timeTillIdle : function(id){
    var temp_builds = allCities[id].buildings, temp_build, building, time = 1e15, doSave = false;
    if (temp_builds) {
      for each (temp_build in temp_builds) {
        if (temp_build.length !== undefined) temp_build = temp_build.reduce(function(previousValue, currentValue){ return (previousValue.up) ? previousValue : currentValue; });
        if (temp_build.up && !!(temp_build.level % 1)) {
          if (temp_build.up > now) { time = Math.min(time,temp_build.up); }
          else { temp_build.level = Math.round(temp_build.level); delete temp_build.up; doSave = temp_build; }
        }
      }
      if (doSave){
        //debug('building upgrade detected',uneval(doSave),'\n',uneval(temp_builds));
        save();
      }
    }
    if (time == 1e15) time = 0;
    return time;
  },
  add : function(entry){
    this.load(); // force load
    this.queue.push(entry);
    this.sanitize();
    this.save();
    this.updateList();
    this.execute();
  },
  hasResources : function(entry){
    for (var resource in entry.needed)
        if (IKARIAM.getResource(entry.city,resource) < entry.needed[resource]) return false;
    return true;
  },
  sanitize : function(){
    if (!this.queue) this.load();
    // check and merge duplicates
    var n = this.queue.length;
    for (var i = n-1; i>=0; --i){
      for (var j = i-1; j >= 0; --j){
        if (QUEUE.eq(this.queue[i],this.queue[j])) {
          this.queue[j].needed  = this.queue[i].needed;
          this.queue[j].level++;
          this.queue.splice(i,1);
          break;
        }
      }
    }
    // resort the queue and group based by cities
    var newQueue = [];
    for each (var id in IKARIAM.citySelect) {
      for each (var entry in this.queue) {
        if (entry.city == id) newQueue.push(entry); // not efficient, but short and sweet
      }
    }
    this.queue = newQueue;

    // remove finished entries
    var n = this.queue.length;
    for (var i = n-1; i>=0; --i){
      if (IKARIAM.getBuildingLevel(this.queue[i].city,this.queue[i].building,this.queue[i].position) == (this.queue[i].level - 0.5)) {
        this.queue.splice(i,1);
      }
    }

    if (n != this.queue.length) this.save();  // don't save everytime because queue sorting is done every time anyways so there's no point in saving just for queue order sorting
  },
  pause : function(){
  
  },
  draw : function(){
    var self = this;
    var queueOptions = deserialize('queueOptions',{show:'block'});
    $('#okInfoBox').append('<h3>Construction Queue'
      + '<span style="display:none;">[ ]</span><span>[&#9660;]</span>'
      +'</h3>'
      +'<div id="constructionQueue" style="display:' + queueOptions.show + ';"><i>loading</i></div>'
      +'<div id="constructionQueueAction" style="clear:both;"></div>');
    $('#okInfoBox h3 span:eq(0)').click(function(){
      $(this).text('off');
    });
    $('#okInfoBox h3 span:eq(1)').click(function(){
      $('#constructionQueue').toggle();
      var shown = $('#constructionQueue').css('display');
      serialize('queueOptions',{show:shown});
      if (shown == 'none') $(this).text('['+self.queue.length+']');
      else $(this).html('[&#9660;]');
    });
    GM_addStyle(
      '#okInfoBox h3 { background:#FFF5DC; margin:4px 0 0; font-weight:bold; position:relative; } ' +
      '#okInfoBox h3 span { position: absolute; right: 18px; font-weight: normal; cursor: pointer; } ' +
      '#okInfoBox h3 span + span { position: absolute; right: 0; } ' +
      '#constructionQueue ul { margin:0 1em 0 0; font-size: 11px; } '
      + '#constructionQueue li:hover { text-decoration:line-through; } '
      + 'li.queueEntry { white-space:nowrap; }'
      + 'li.queueEntry img { white-space:nowrap; display:inline !important; }'
      + 'li.queueEntry div { margin-left: 0;} '
      + 'li.queueEntry div+div { margin-left: 5px;} '
      //+ '#container .dynamic #constructionQueue img { display:inline; }'
      + '#constructionQueueAction { font-size: smaller; white-space:nowrap; line-height:16px; }'
    );
  },
  updateList : function(){
    function addToList(ul,entry){
      onClick(ul.appendChild(node('li','queueEntry','',QUEUE.toHTML(entry))),function(){
        for (var i = 0; i < QUEUE.queue.length; ++i) {
          if (QUEUE.eq(entry,QUEUE.queue[i])) { QUEUE.queue.splice(i,1); break; }
        }
        QUEUE.save();
        QUEUE.updateList();
        QUEUE.execute();
      });
    }
    var queueOptions = deserialize('queueOptions',{show:'block'});
    if (!$$('constructionQueue')) return;
    if (!this.queue) this.load();
    //$$('constructionQueue').innerHTML = '';
    var ul = node('ul'); for each (var entry in this.queue) addToList(ul,entry);
    if (this.queue.length) $('#constructionQueue').css('display',queueOptions.show).html(ul);
    else                    $('#constructionQueue').css('display',queueOptions.show).text('empty');
    if (queueOptions.show == 'none') $('#okInfoBox h3 span:eq(1)').text('['+this.queue.length+']');
    else $('#okInfoBox h3 span:eq(1)').html('[&#9660;]');
  },
  action : {
    parent:this,
    time:1e9,
    href:'',
    title:'Do Nothing',
    propose:function(timeLow,timeBuffer,href,title){
      //debug('action proposed:',timeLow,timeBuffer,href,title);
      if (!$$('constructionQueueAction')) return;
      var time = timeLow + (Math.random()*timeBuffer);
      if (!time) { return false; }
      if (time < 1000) { time *= 1000; debug('Bad Action Time, not in milliseconds',time,href,title); }
      if ((timeLow+timeBuffer) < this.time) {
        this.time=time;
// implement the next action
        if (href) {
          this.time = Math.max(time,25*1000);
          $('#constructionQueueAction').html(CLOCK+'<a href="'+href+'" class="toDurationHMS" rel="'+((this.time+now))+',2">'
            +durationHMS((this.time)/1000,2)+ '</a> ' + title);
          if (interruptable()) {
            if (this.timer) { clearTimeout(this.timer); }
            this.timer = setTimeout(function(){ document.location.href = href; },this.time);
          }
        }
      }
    }
  },
  execute : function(){
    //function proposeAction(timeLow,timeBuffer,href,title){    // action is inheritied by scope
    //  if ((timeLow + timeBuffer) < action.time) action = {time:timeLow + (Math.random()*timeBuffer),href:href,title:title};
    //}
    if (!this.queue) this.load();
    var queue = this.queue;
// determine next action
    //var action={time:1e9,href:'',title:'Do Nothing'};
    if (queue.length) {
      this.action.propose(
        1*60*60*1000,
        30*60*1000,
        'http://'+document.domain+'/index.php?view=merchantNavy',
        'Auto Refresh'
      );
      queue.forEach(function(entry){
        var currentBuildingLevel = IKARIAM.getBuildingLevel(entry.city,entry.building,entry.position);
        if (this.hasResources(entry) && (Math.round(currentBuildingLevel) < entry.level))
        {
          if (IKARIAM.current != entry.city) {
            this.action.propose(
              (this.readyTimesCache[entry.city] ? (this.readyTimesCache[entry.city]-now) : 0 ) + 30*1000,
              0,
              'http://'+document.domain+"/index.php?action=header&function=changeCurrentCity&cityId="+entry.city+"&view=city&actionRequest="+$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value,
              'Change to <b>'+allCities[entry.city].name + '</b> '
            );
          }
          else {
            // has resources, and need to upgrade
            //debug(QUEUE.eq(this.currentBuilding,entry),QUEUE.readyTimesCache[entry.city]);
            if (!currentBuildingLevel) {
              debug("upgrade",entry.href);
              var upgradeHref = entry.href.replace('actionRequest','actionRequest='+$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value);
              this.action.propose(
                (this.readyTimesCache[entry.city] ? (this.readyTimesCache[entry.city]-now) : 0 ) + 20*1000,
                2*1000,
                upgradeHref,
                'Start '+entry.building
              );
            } else {
              // UPGRADE
              if (this.currentBuilding && QUEUE.eq(this.currentBuilding,entry) && (QUEUE.readyTimesCache[entry.city] == 0))
              {
                var upgradeLink = $X('//div[@id="buildingUpgrade"]//li[@class="upgrade"]/a');
                this.action.propose(
                  10*1000,
                  0,
                  upgradeLink.href,
                  'UPGRADE!!' //todo find out why this isn't being shown
                );
              }
              // OPEN BUILDING PAGE TO UPDATE RES REQUIREMENTS AND BUILD
              else if (!this.currentBuilding || this.currentBuilding && !QUEUE.eq(this.currentBuilding,entry)) {
                this.action.propose(
                  (this.readyTimesCache[entry.city] ? (this.readyTimesCache[entry.city]-now) : 0 ) + 20*1000,
                  2*1000,
                  IKARIAM.getBuildingHref(entry.city,entry.building,entry.position),
                  BUILD + 'Build <b>'+allCities[entry.city].name + '</b> ' + entry.building
                );
              }
            }
          }
        }
        else if ((now - allCities[entry.city].resources.ts) > 3*60*60*1000)
        {
          this.action.propose(
            15*60*1000,
            10*1000,
            'http://'+document.domain+"/index.php?action=header&function=changeCurrentCity&cityId="+entry.city+"&view=city&actionRequest="+$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value,
            CHECK + 'Check Resources ' + allCities[entry.city].name
          );
        }

      },this);
    }
  },
  load : function(){
    this.queue = deserialize('queue') || [];
    return this.queue;
  },
  save : function(){ return serialize('queue',this.queue); },
  processBuilding : function(){
    function getEntryFromCurrentBuilding(){
      var viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
      viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      // find out how much the upgrade costs
      var goal = {};
      $('#buildingUpgrade ul.resources li').not('.time').each(function(){
        var resourceName = this.className.split(" ",1)[0];
        if (resourceName == 'glass') resourceName = 'crystal';
        goal[resourceName] = number(this.childNodes[1].nodeValue);
      });
      // build initial entry
      var entry = {
        city     : viewportId,
        building : document.body.id,
        current  : parseInt(upgradeLink.href.split('level=')[1],10) + !!$$('upgradeInProgress') / 2,
        level    : parseInt(upgradeLink.href.split('level=')[1],10) + !!$$('upgradeInProgress') + 1,
        position : parseInt(upgradeLink.href.split('position=')[1],10),
        needed   : goal,
        ts       : now,
      }
      return entry;
    }

    var self = this;
    var upgradeLink = $X('//div[@id="buildingUpgrade"]//li[@class="upgrade"]/a');
    if (upgradeLink && (upgradeLink.className != 'disabled')) {
      var entry = getEntryFromCurrentBuilding();
      self.currentBuilding = entry; // MEMORIZE for future reference
      var time = QUEUE.readyTimesCache[entry.city];
      var eta = (time == 0) ? "NOW" : durationHMS((time-now)/1000);
      var queueBtn = $X('//div[@id="buildingUpgrade"]/div').appendChild(node(
        'div','',{cursor:'pointer',background:'#FFFBDB url(/skin/upgrade/nextlevelarrow.gif) no-repeat scroll center 20%',paddingTop:'22px'} ,
        'Queue Upgrade (ETA: <span class="'+((time == 0) ? '' : 'toDurationHMS')+'" rel="'+time+'">'+eta+'</span>)'
        ));
      onClick( queueBtn , function(){ QUEUE.add(entry); } );

      function inQueue(entry) {
        for each (var queueEntry in QUEUE.queue){
          if (QUEUE.eq(queueEntry,entry)) {
            return queueEntry;
          }
        }
        return false;
      }
// CHECK FOR OUTDATED ENTRY INFORMATION
      var queueEntry = inQueue(entry);
      if (queueEntry) {
        queueBtn.innerHTML = 'Queue Action<br/>'+QUEUE.toHTML(entry);
        //debug(uneval(queueEntry.needed),uneval(entry.needed));
        queueEntry.needed = entry.needed;
        queueEntry.ts = now;
      }

      QUEUE.save();
      QUEUE.updateList();
      QUEUE.execute();

    }
  },
  processEmptyBuildingGround : function(){
    var viewportId = $X('./a[@class="city"]',$$('breadcrumbs')).href;
    viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);

    $('#buildings > li').each(function(){
      // find out how much the upgrade costs
      var goal = {};
      $('ul.resources li',this).not('.time').each(function(){
        var resourceName = this.className.split(" ",1)[0];
        if (resourceName == 'glass') resourceName = 'crystal';
        goal[resourceName] = number(this.childNodes[1].nodeValue);
      });
      var buildingId = getTrailingId($('a',this).attr('href'));
      // build initial entry
      var entry = {
        city     : viewportId,
        building : this.className.split(' ')[1],
        current  : 0,
        level    : 1,
        position : getTrailingId(document.location.href),
        needed   : goal,
        ts       : now,
      }
      entry.href = "?action=CityScreen&function=build&actionRequest&id="+entry.city+"&position="+entry.position+"&building="+buildingId;
      $(this).append($('<div class="centerButton"><span class="button">Queue</span></div>'));
      $("span.button",this).click(function(){
        QUEUE.add(entry);
        $('#buildings > li span.button').parent().slideUp();
      });
    });
  }
}







//************************************************* DO STUFF **************************************************//
var options, cityOrder;			// all info about the current city, set by getCities();
var enableTransport = (document.body.id == "transport");

if ($$('servertime')) {
  options   = eval(GM_getValue('options_'+gameServer, {}));

  if (enableTransport) addLoadTimesToPage();

  if ($$('buildingUpgrade')) buildingUpgradeNote();
  var infoBox = buildInfoBox();

  // process building if need be
  QUEUE.init();
  QUEUE.sanitize();

  $(function(){
    cityOrder = getCityOrder();
    buildPopUp();
    doPopups();
    QUEUE.updateList();
    if (document.body.id != 'errorInsufficientFunds') QUEUE.execute();
  });
  setInterval(function () { updateDurationsHMS(); },1000);
}







  // Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '53274', // Script id on Userscripts.org
 days: 4, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: scriptMetadata.name,
 version: scriptMetadata.version,
 time: new Date().getTime() | 0,
 call: function(response) { GM_xmlhttpRequest({ method: 'GET', url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js?update', headers: { 'User-agent': window.navigator.userAgent, 'Accept': 'application/atom+xml,application/xml,text/xml', }, onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);} }); }, 
 compare: function(xpr,response) { this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1]; this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1]; if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) { GM_setValue('updated', this.time); GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js'); } else if ( (this.xversion) && (this.xversion != this.version) ) { if(confirm('Do you want to turn off auto updating for this script?')) { GM_setValue('updated', 'off'); GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');}); alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.'); } else { GM_setValue('updated', this.time); } } else { if(response) alert('No updates available for '+this.name); GM_setValue('updated', this.time); } }, 
 check: function() { if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time); if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) { this.call(); } else if (GM_getValue('updated', 0) == 'off') { GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);}); } else { GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);}); } } 
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
