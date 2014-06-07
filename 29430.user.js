var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Ikariam General Overkill
// @namespace      overkill_gm
// @version        2.15
// @description    An Ikariam game script to gather information from player towns
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*
// @homepage       http://userscripts.org/scripts/show/29430
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}

/**
This is Overkill's hack of Ikariam General Overview v1.5
**/
// CONST VARIABLES
// Re-order this to change the order of your overview table
var buildingList = [
'townHall','wall',
'palace','warehouse',
'safehouse','embassy',
'tavern','museum',
'academy','workshop',
'port','branchOffice',
'barracks','shipyard',
'winegrower','vineyard',
'stonemason','architect',
'glassblowing','optician',
'alchemist','fireworker',
'forester','carpentering'
];


/** MAIN VARIABLES STARTUP **/
var openIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABCUExURdysYm15hjdHWW98iGh1gmJvfXB8'+
    'iaifjaqfjHiEkN2rXt2sXt6rXkdWZ96rXWl1g1VjctmsZt2sX2Vyf11qed6rXDr/ejYAAAAWdFJO'+
    'U////////////////////////////wAB0sDkAAAAXElEQVR42kyNiQ7AIAhDUac7PKYw/v9X13kk'+
    'a0LCa1og/YnWEs9aqCTmS2nLNihVMXKoBpsJVg8l7wSduxdy0zaBaxvXPoCv+4KC8Qlg5h/HAOEB'+
    'EgHPVEX2FWAA6KMJ0Xri1nUAAAAASUVORK5CYII=';
var scriptName = scriptMetadata['name'] + " " + scriptMetadata['version'];
var icon = {
	wood    : "/skin/resources/icon_wood.gif",
	wine    : "/skin/resources/icon_wine.gif",
	marble  : "/skin/resources/icon_marble.gif",
	crystal : "/skin/resources/icon_glass.gif",
	sulfur  : "/skin/resources/icon_sulfur.gif"
};

GM_addStyle(
"" + <><![CDATA[
  #overviewPopup { display: none; position: fixed; top: 148px; z-index : 999; width: 100%; }
  #overviewPopup > div { padding-bottom: 5px; margin: 0 auto; border: thick double #D2AC77; background-color: rgba(246,235,188,0.5); width: 900px; }
  #overviewPopup .l { float: left;  margin-left:  4px; margin-right: 1px; max-width: 100px; text-align: left; }
  #overviewPopup .r { float: right; margin-right: 4px; margin-left:  1px; max-width: 100px; text-align: right; }
  #overviewPopup h3 { text-align: center; font-weight: bold; }
  #overviewPopup table { background-color: rgb(246,235,188);  }
  #overviewPopup table th { border: 1px dotted Black; padding: 0; font-size: 8pt; width: 66px; text-align: center; }
  #overviewPopup table th.o { text-align: left; vertical-align: bottom; }
  #overviewPopup table th.e { text-align: right; vertical-align: top; }
  #overviewPopup table td { border: 1px dotted Black; min-width:22px; padding:0; white-space:nowrap }
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
  /* #overviewPopup img { width: 17px; height: 13px; } /* resource icons */
  #overviewPopup .toDuration { margin-left: 3px; font-size: smaller; color: #444; }
  #overviewPopup .tradeNote { -moz-border-radius: 5px; background-Color:navy; color: Thistle; font-size: 10px; margin-left: 3px; padding : 2px; }
  #overviewPopup .tradeNote a { color: white; font-size: 11px; }
  #overviewPopup .xtraNote { font-size: 10px; cursor: pointer; }
  #overviewPopup .xtraNote:hover { text-decoration: line-through; }
  #overviewPopup .okHBar { position:absolute; height:13px; }
  .quickTransport { cursor:pointer; background: #FFF7E1 url(/skin/input/textfield.gif) repeat-x scroll 0 0; border-color:#5D4C2F #C9A584 #C9A584 #5D4C2F; border-style:solid; border-width:1px; width: 60px; color: Teal; font-size:14px; padding:1px 1px 1px 1px; margin:0 2px; }

  #overviewPopup .tanline { background-color: #DEAB5C; min-width:0; }
  
  #igoheader { line-height: 12px; }
  #igoheader select { border:0; padding:0; margin:0; background-color:Khaki; }
  .igo_pos { font-size: 20px; }

  #overviewPopup #ok_army th { width:auto; padding:0 2px; }
  #overviewPopup thead tr,#overviewPopup tfoot tr { background-color: #DEAB5C; text-align: center; }
]]></>);

/****	FUNCTIONS	****/
function debug() { var msg = ''; for (var i = 0, n = arguments.length; i<n; ++i) msg += arguments[i] + ' '; setTimeout(function() { throw new Error("[debug] " + msg); }, 0);}
function ddebug() { }

$ = document.getElementById;
function number(n) {
  n = { string: 1, number: 1, undefined : 1 }[typeof n] ? n+"" : n.textContent;
  //n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
  return parseInt(n.replace(/\D+/g, "") || "0", 10);
}
function fmtNumber(n) {
  var separator = unsafeWindow.LocalizationStrings['thousandSeperator'] || ',';
  var isNeg = (n < 0); n += ""; for (var i = (n.length - 3); i > isNeg; i -= 3) { n = n.slice(0, i) +separator+ n.slice(i); } return n;
}

function trim(str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
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
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function onDblclick(node, fn, capture, e) { node.addEventListener((e||"") + "dblclick", fn, !!capture); }
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function copy(old){ // copies an object
  var neu = {};
  for (thing in old) neu[thing] = old[thing];
  return neu;
}

// returns pessimistic duration
function duration(seconds){
  var sign = (seconds < 0) ? '-' : '';
  seconds = Math.abs(seconds);
	var minutes = (Math.ceil(seconds/60) % 60);
  minutes = (minutes < 10) ? '0' + minutes : minutes.toString();
	return sign + Math.floor((seconds+60)/3600).toString() + ':' + minutes;
}
function durationHMS(seconds,depth){
  var temp = unsafeWindow.LocalizationStrings['timeunits']['short'], ret = [];
	var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
	var y = [ temp.day                    , temp.hour                     , temp.minute,                  temp.second  ];
	for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
  if (depth && depth<ret.length) return ret.slice(0,depth).join(' ');
  else return ret.join(' ');
}
function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = ikariamTime.split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2] || 0,10);
	return new Date(year,month,day,hour,minute,second);
}
function image(resource){
  //resource = resource.toLowerCase();
	if (resource && icon[resource]) { return '<img width="17" height="13" src="'+icon[resource]+'" alt=""/>'; }
	else { return ''; }
}
function getResourcesProduction() {
 	var tradeGood = {woodDelta : 0, tradeDelta : 0, trade : "unknown"};
  tradeGood.woodDelta  = unsafeWindow.woodCounter ? Math.round(3600*parseFloat(unsafeWindow.woodCounter.production)) : 0;
  if (unsafeWindow.tradegoodCounter) {
  	tradeGood.tradeDelta = unsafeWindow.tradegoodCounter ? Math.round(3600*parseFloat(unsafeWindow.tradegoodCounter.production)) : 0;
  	var script = unsafeWindow.tradegoodCounter.valueElem.id;
  	if (script.search(/value_wine/) != -1)         { tradeGood.trade = 'wine'; }
  	else if (script.search(/value_marble/) != -1)  { tradeGood.trade = 'marble'; }
  	else if (script.search(/value_crystal/) != -1) { tradeGood.trade = 'crystal'; }
  	else if (script.search(/value_sulfur/) != -1)  { tradeGood.trade = 'sulfur'; }
  }
  tradeGood.woodHref  = "?view=resource&type=resource&id="   + current.islandId;
  tradeGood.tradeHref = "?view=tradegood&type=tradegood&id=" + current.islandId;
	return tradeGood;
}
function getCityOrder(){
  var output = [];
  for each(var city in $x('//*[@id="citySelect"]/option[not(contains(@class,"deployed"))]')){ output.push(city.value); }
  return output;
}
function getCities(){
	var cities = $x('//*[@id="citySelect"]/option[not(contains(@class,"deployed"))]');
  var server = document.location.href.split('.')[0].split('//')[1]; // this seems like a stupid way, but whatever
  var output = eval(GM_getValue("cities_"+server, '({})'));
  var id;
  var ids = {};
	for (var i = 0; i < cities.length; ++i) {
		id = parseInt(cities[i].value,10);
    ids[id] = true; // build hash for cleaning up old data later

    if (!output[id]) {
      output[id] = {};
      output[id].resources = {};
      output[id].buildings = {};
    }
		output[id].i    = i;
    output[id].id   = id;
    output[id].name = trim(cities[i].innerHTML.replace(/\[[0-9:]+\]/,''));
		if (cities[i].selected) {
			current = output[id];
			current.ts = Date.now();
		}
	}
  if (current) {
    var islandId = $X('//li[@class="viewIsland"]/a');
    if (islandId) current.islandId = parseInt(islandId.href.replace(/.+=/,''),10);
  }
  for (id in output){ if (!ids[id]) { delete output[id]; } }  // delete bad cities
	return output;
}
// todo: merge this functionality with getBuildings()
function buildLocalize(){
  var buildings = $x('//ul[@id="locations"]/li[contains(@id,"position")]');
  var n = buildings.length;
  var realName, localizedName;
  for (var i = 0; i < n; ++i){
    realName = buildings[i].className.split(' ')[0];
    if (realName != "buildingGround") {
      localizedName = $X('./a',buildings[i]).title;
      localizedName = localizedName.split(' ');
      localizedName = localizedName.slice(0,localizedName.length-2);
      localizedName = localizedName.join(' ');
      localize[realName] = localizedName;
    }
  }
  //debug(uneval(localize));
  GM_setValue('localize_dictionary',uneval(localize));
}

function getBuildings(viewportCity,responseText) {
  function getBuildingStat(buildingLi){
    tmp = $X('.//a',buildingLi);
    var building = {};
    building.level        = parseInt(tmp.title.substring(tmp.title.lastIndexOf(" ")+1),10);
    building.href         = tmp.href;
    building.constructing = !!$X('./div[@class="constructionSite"]',buildingLi);
    if (building.constructing) {
      var temp = unsafeWindow.tmpCnt;
      building.finished = temp.enddate + now - temp.currenttime;  // does not account for day light savings
    }
    return building;
  }
  //1242613201  1242606904

	var buildID, buildings = {};
  var tempDiv = responseText ? node('div','','',responseText) : document;
  var li = $x('//ul[@id="locations"]/li[contains(@id,"position")]',tempDiv);

  for (var i = li.length - 1; i >= 0; --i){
    buildID = li[i].className.split(' ')[0];  // townHall, barracks, buildingGround shore, buildingGround land
    
    if (buildID == 'palaceColony') { buildID = 'palace'; }  // reuse palace for governor's residence
    if (buildID != 'buildingGround') {
      if (!buildings[buildID]) {
        buildings[buildID] = getBuildingStat(li[i]);
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
function getArmy(viewportCity){
  var unit, name, count, force = {};
  switch (document.body.id){
    case 'barracks' :
      for each (unit in $x('//div[@class="unitinfo"]')) {
        name = $X('./h4',unit).innerHTML;
        count = parseInt(trim($X('./div[1]/text()',unit).nodeValue),10);
        force[name] = count;
      }
    break;
    case 'cityMilitary-army' :
      var rows_names = $x('//div[@id="tab1"]//table/tbody/tr[1]');
      var rows_units = $x('//div[@id="tab1"]//table/tbody/tr[2]');
      for (var i = 0; i < rows_names.length; ++i){
        var cols_names = $x('./th/@title',rows_names[i]);
        var cols_units = $x('./td',rows_units[i]);
        for (var j = 0; j < cols_names.length; ++j){
          force[cols_names[j].nodeValue] = parseInt(trim(cols_units[j].innerHTML),10);
        }
      }
      if (force) viewportCity.army = force;
    break;
    case 'plunder' :
      for each (var row in $x('//ul[@class="assignUnits"]/li')){
        name  = $X('./label/text()',row).nodeValue.replace(/(\s\w+){2}:$/,'');
        count = parseInt($X('./div[1]/text()',row).nodeValue,10);
        force[name] = count;
      }
    break;
  }
  //debug(uneval(viewportCity.army),uneval(force));
  if (force) viewportCity.army = force;
}
function getNavy(viewportCity){
  var unit, name, count, force = {};
  switch (document.body.id){
    case 'shipyard' :
      for each (unit in $x('//div[@class="unitinfo"]')) {
        name = $X('./h4',unit).innerHTML;
        count = parseInt(trim($X('./div[1]/text()',unit).nodeValue),10);
        force[name] = count;
      }
    break;
    case 'cityMilitary-fleet' :
      var rows_names = $x('//div[@id="tab2"]//table/tbody/tr[1]');
      var rows_units = $x('//div[@id="tab2"]//table/tbody/tr[2]');
      for (var i = 0; i < rows_names.length; ++i){
        var cols_names = $x('./th/@title',rows_names[i]);
        var cols_units = $x('./td',rows_units[i]);
        for (var j = 0; j < cols_names.length; ++j){
          force[cols_names[j].nodeValue] = parseInt(trim(cols_units[j].innerHTML),10);
        }
      }
    break;
  }
  viewportCity.navy = force;
}


function getResources() {
  var temp_resources = current.resources || {};
	var temp, currentCityResources,wineObj;
  if ((temp = getResourcesProduction()) && (currentCityResources = unsafeWindow.IKARIAM.currentCity)) {
    temp_resources.wood       = currentCityResources.resources.wood;
    temp_resources.wine       = currentCityResources.resources.wine;
    temp_resources.marble     = currentCityResources.resources.marble;
    temp_resources.crystal    = currentCityResources.resources.crystal;
    temp_resources.sulfur     = currentCityResources.resources.sulfur;
  	temp_resources.woodProduction  = temp.woodDelta;
  	temp_resources.tradeProduction = temp.tradeDelta;
  	temp_resources.tradeName       = temp.trade;
    temp_resources.woodMax    = currentCityResources.maxCapacity.wood;
    temp_resources.wineMax    = currentCityResources.maxCapacity.wine;
    temp_resources.marbleMax  = currentCityResources.maxCapacity.marble;
    temp_resources.crystalMax = currentCityResources.maxCapacity.crystal;
    temp_resources.sulfurMax  = currentCityResources.maxCapacity.sulfur;

    wineObj = (temp.trade == 'wine') ? unsafeWindow.tradegoodCounter : unsafeWindow.wineCounter;
    if (wineObj) {
      var reduction = 1;
      if (current.buildings && current.buildings.vineyard) {
        reduction = (100-current.buildings.vineyard.level)/100;
      }
      temp_resources.wineConsumption = Math.round(reduction * (wineObj.spendings[0].amount || 0));
    }

    temp_resources.timestamp  = now;

    current.resources = temp_resources;

    if (current.demographics && current.demographics.population) {
      current.demographics.population = parseInt($('value_inhabitants').innerHTML.split('(')[1].replace(/\D/g,''),10);
    }
    var server = document.domain.split('.')[0];
    GM_setValue("cities_"+server, uneval(allCities));
  }
}
function buildCities(){
  var temp_resources, id, n_cities = 0;
  for (id in allCities) {
    ++n_cities;
  	if (temp_resources = allCities[id].resources){
      averages.wood    += number(temp_resources.wood);
			averages.wine    += number(temp_resources.wine);
			averages.marble  += number(temp_resources.marble);
			averages.crystal += number(temp_resources.crystal);
			averages.sulfur  += number(temp_resources.sulfur);
		} else {
			enableTransport = false;
		}
	}
 	for (var resource in averages){ averages[resource] = Math.floor(averages[resource]/n_cities); }
}
// qty, destCity, sourceCity
function amountToSend(qty,destCity,sourceCity){
	sourceCity = sourceCity || ({});
	var amt, output = {};
  //debug(uneval(qty));
	for (var resource in averages){
		amt = Math.min(Math.min(qty[resource],destCity[resource+"Max"])-destCity[resource],sourceCity[resource] || 1e10 );
		output[resource] = Math.max(0,amt); // no undefined resources plz cuz i'm lazy
	}
	return output;
}
function addLoadTimesToPage(){
  // Make sure the adjust function is called when the amount of resources changes
  if ($('textfield_wood')){
    $('textfield_wood').addEventListener('change', adjustLoadingTime, true);
    unsafeWindow.Event.addListener('slider_wood_min', 'click', adjustLoadingTime);
		unsafeWindow.Event.addListener('slider_wood_max', 'click', adjustLoadingTime);
  }
  if ($('textfield_wine')){
    $('textfield_wine').addEventListener('change', adjustLoadingTime,true);
    unsafeWindow.Event.addListener('slider_wine_min', 'click', adjustLoadingTime);
		unsafeWindow.Event.addListener('slider_wine_max', 'click', adjustLoadingTime);
  }
  if ($('textfield_marble')){
    $('textfield_marble').addEventListener('change', adjustLoadingTime,true);
    unsafeWindow.Event.addListener('slider_marble_min', 'click', adjustLoadingTime);
		unsafeWindow.Event.addListener('slider_marble_max', 'click', adjustLoadingTime);
  }
  if ($('textfield_glass')){
    $('textfield_glass').addEventListener('change', adjustLoadingTime, true);
    unsafeWindow.Event.addListener('slider_glass_min', 'click', adjustLoadingTime);
		unsafeWindow.Event.addListener('slider_glass_max', 'click', adjustLoadingTime);
  }
  if ($('textfield_sulfur')){
    $('textfield_sulfur').addEventListener('change', adjustLoadingTime, true);
    unsafeWindow.Event.addListener('slider_sulfur_min', 'click', adjustLoadingTime);
		unsafeWindow.Event.addListener('slider_sulfur_max', 'click', adjustLoadingTime);
  }
  
  // Add loading time to duration time
  var html = $('missionSummary').childNodes[1].childNodes[3].innerHTML.split("</span>");
  $('missionSummary').childNodes[1].childNodes[3].innerHTML = html[0] + "</span> 0h 0m 0s + " + html[1] + " = " + html[1];
}
// most of this was from another script i really don't feel like cleaning up
function adjustLoadingTime(){
  var port_lvl = current.buildings.port.level || 1;
  var total_res = 0;
  
  // Get total ammount of resources that will be sent
  if ($('textfield_wood')){   total_res += parseInt($('textfield_wood').value,10); }
  if ($('textfield_wine')){   total_res += parseInt($('textfield_wine').value,10); }
  if ($('textfield_marble')){ total_res += parseInt($('textfield_marble').value,10); }
  if ($('textfield_glass')){  total_res += parseInt($('textfield_glass').value,10); }
  if ($('textfield_sulfur')){ total_res += parseInt($('textfield_sulfur').value,10); }
  //debug("Total Resources to Transport: "+total_res);

  // Get the transport time
  var divTime, time, restTime, travelHour, travelMin, travelSec, loadHour, loadMin, loadSec, loadSpeed, hour, min, sec;
  divTime = $('missionSummary').childNodes[1].childNodes[3].innerHTML;
  restTime = divTime.split(" = ")[0].split(" + ");

  // Parse time, depending on how big it is
  timeAr = restTime[1].split(' ');
  travelHour = 0;
  travelMin = 0;
  travelSec = 0;
  if (timeAr.length == 3) {
    travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    travelMin = parseInt(timeAr[1].substring(0,timeAr[1].length-1),10);
    travelSec = parseInt(timeAr[2].substring(0,timeAr[2].length-1),10);
  }
  else if (timeAr.length == 2) {
    if (timeAr[0].search('h') != -1)     travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[1].search('h') != -1)     travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[0].search('m') != -1)     travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[1].search('m') != -1)     travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[0].search('s') != -1)     travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[1].search('s') != -1)     travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
  }
  else if (timeAr.length == 1) {
    if (timeAr[0].search('h') != -1)     travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[0].search('m') != -1)     travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
    if (timeAr[0].search('s') != -1)     travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1),10);
  }

  // Calculate loading times
  //loadingSpeeds = [3,10,30,58,92,131,176,225,279,336,398,464,533,606,682,762,844];  // v0.2.8
  loadingSpeeds = [10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980];
  loadingSpeed  = loadingSpeeds[port_lvl];
  //debug("loading speed: "+loadingSpeed);
  loadSec  = Math.round(60*total_res / loadingSpeed);
  loadHour = Math.floor(loadSec / 60 / 60);
  loadSec -= loadHour * 60 * 60;
  loadMin  = Math.floor(loadSec / 60);
  loadSec -= loadMin * 60;
  
  // Calculate total
  sec  = Math.round(60*total_res / loadingSpeed) + travelSec + travelMin*60 + travelHour*60*60;
  hour = Math.floor(sec / 60 / 60);
  sec -= hour * 60 * 60;
  min  = Math.floor(sec / 60);
  sec -= min * 60;

  $('missionSummary').childNodes[1].childNodes[3].innerHTML = 
    "<span class='textLabel'>Duration of journey: </span>"+	loadHour+"h "+loadMin+"m "+loadSec + "s + " + 
                                travelHour+"h "+travelMin+"m "+travelSec + "s = " + 
                                hour+"h "+min+"m "+sec + "s";
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
		//debug([resource,$('send_'+resource).checked,amt]);
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
function buildCityHref(id){ return "?view=city&id=" + id; }
function buildResourceHref(id){ return "?view=resource&type=resource&id="+allCities[id].islandId; }
function buildTradegoodHref(id){ return "?view=tradegood&type=tradegood&id="+allCities[id].islandId; }
function buildArmyHref(id){ return "?view=cityMilitary-army&id=" + id; }
function buildNavyHref(id){ return "?view=cityMilitary-fleet&id=" + id; }

function updateDurations(){
	var elem, end, now = itime2Date($('servertime').innerHTML).getTime();
	for each (elem in $x("//span[@class='toDuration']")) if (end = elem.getAttribute('rel')) elem.innerHTML = '(' + duration((end-now)/1000) + ')';
}
function updateDurationsHMS(){
	var elem, end, now = itime2Date($('servertime').innerHTML).getTime();
	for each (elem in $x("//span[@class='toDurationHMS']")) if (end = elem.getAttribute('rel').split(',')) { elem.innerHTML = durationHMS((end[0]-now)/1000,end[1]); }
}
function showHideTbody(elem,section){
  for each (var tbody in $x('../tbody',elem.parentNode.parentNode)) {
    tbody.style.display = tbody.style.display ? '' : 'none';
    if (section) options[section] = tbody.style.display;
    GM_setValue('options_'+gameServer,uneval(options));
  }
}

function showHide(e) {
  buildPopUp();
	var overviewPopup = $("overviewPopup");
	if (overviewPopup.style.display != "block") {
		updateDurations();
		overviewPopup.style.display = "block";
	} else { overviewPopup.style.display = "none"; }
}
function showPopup(e){
  buildPopUp();
	var overviewPopup = $("overviewPopup");
	if (overviewPopup) {
    //debug(e.which);
		e = e || window.event;
		if (e.which == parseInt(GM_getValue('popupKey',"32"),10)) {
			//updateDurations();	// can't call here, fires too often is this a firefox bug?
      if (overviewPopup.style.display != "block") { // prevent repeat firings, could do this by setting a global check variable but enh...
     		updateDurations();
        overviewPopup.style.display = "block";
      }
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}
}
function hidePopup(e){
	var overviewPopup = $("overviewPopup");
	if (overviewPopup) {
		e = e || window.event;
		if (e.which == parseInt(GM_getValue('popupKey',"32"),10)) {
			overviewPopup.style.display = "none";
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	}
}
function doPopups(){
	//debug("textarea search : " + document.getElementsByTagName("textarea").length);
	if (!document.getElementsByTagName("textarea").length) {
		document.addEventListener("keydown",showPopup,false);
		document.addEventListener("keyup",hidePopup,false);
	}
}
function addDynamicBox(innerHTML,position){
  position = position || 0;
  var output = node('div','dynamic','',innerHTML);
  var dynamicElement = $('breadcrumbs'), dynamicElements = $x("//div[contains(@class,'dynamic')]");
  if (position < dynamicElements.length) {
    dynamicElement = dynamicElements[position];
  } else if (dynamicElements.length && position >= dynamicElements.length) {
    dynamicElement = dynamicElements[dynamicElements.length-1];
  }
  return dynamicElement.parentNode.insertBefore(output,dynamicElement.nextSibling);
}
function buildInfoBox(){
  //NEW INFOBOX
	var temp_resources = current && current.resources;
  var output = '<h3 class="header" id="IkariamOverviewCtrl"><img style="float:right; margin-right: 8px; margin-top: 6px;" src="'+openIcon+'"/>'+scriptName+'</h3>'
  	+ '<div>';
  if (current) {
    output += '<table style="margin-left:auto;margin-right:auto;width:auto;">';
    output += '<tr><td style="background-image:url('+icon.wood+'); background-repeat: no-repeat; padding-left: 30px; padding-right: 1em;"><a href=' + buildResourceHref(current.id || 0) + '>' + temp_resources.woodProduction + '</a></td>';
    output += '<td style="height:19px; background-image:url('+icon[temp_resources.tradeName]+'); background-repeat: no-repeat; padding-left: 30px;"><a href=' + buildTradegoodHref(current.id || 0) + '>' + temp_resources.tradeProduction + '</a></td></tr></table>';
  }
  output += '</div>' +
  '<h3 style="margin:4px 1em 0; font-weight:bold; display:inline;">Construction Queue</h3><div class="content" id="constructionQueue" style="display:inline;"><i>empty</i></div><div class="footer"></div>';

  var newElement = addDynamicBox(output,2);
  onClick($('IkariamOverviewCtrl'),showHide);
  constructionQueueUpdate();
  GM_addStyle(
    '#constructionQueue { } ' +
    '#constructionQueue ul { margin:0 1em; font-size: 11px; } '
    + '#constructionQueue li { white-space:nowrap; } '
    + '#constructionQueue li:hover { text-decoration:line-through; } '
  );
}
function buildPopUp(){
  function positionOverviewPopup(key){
    switch (key) {
      case "igo_postop" :
        $('overviewPopup').style.top = '0px';
      break;
      default :
        $('overviewPopup').style.top = '148px';
      break;
    }
  }
  function printBuildingLevels(){
    function in_array(needle, haystack) { for (var key in haystack) if (haystack[key] == needle) return true; return false; }

    function printBuilding(building){
      var output = '';
      if (building) {
        if (!building.constructing) {
          output += '<a href="' + building.href + '">'  + building.level + '</a>';
        } else {
          //var elevated = parseInt(building.level,10)+1;
          var end = building.finished;
          var left = '';
          if (end) {
            //var now = itime2Date($('servertime').innerHTML);
            left = '<span class="toDuration" rel="'+end+'">(' + duration((end-now)/1000) + ')</span>';
          }
          output += '<span style="background-color: #FFFF99;"><a href="' + building.href + '">' + building.level + left + '</a></span>';
        }
      }
      else {
        output += '-';
      }
      return output;
    }
    var i,j,id,temp_build,temp_builds,buildingName,newBuildingList = [];
    
    for each (id in cityOrder) {
      temp_builds = allCities[id].buildings || {};
      for (j=0; j < buildingList.length; ++j)
        if ((temp_builds[buildingList[j]]) && (!in_array(buildingList[j],newBuildingList))) { newBuildingList.push(buildingList[j]); }
    }

    var table_buildsLvl = '<table style=""><tr><td style="min-width:75px"></td>';
    for (i=0; i < buildingList.length; i+=2) {
      var enabled  = in_array(buildingList[i],newBuildingList);
      var span     = in_array(buildingList[i+1],newBuildingList) ? '2' : '1';
      buildingName = localize[buildingList[i]] || buildingList[i];
      if (enabled) {
        table_buildsLvl += '<th colspan="'+span+'" class="o" id="okgo'+ (++tdid) +'">' + buildingName + '</th>';
      } else if (span == '2') {
        table_buildsLvl += '<th class="e">&nbsp;</th>';
      }
    }
    table_buildsLvl += '</tr>';

    for each (id in cityOrder) {
      var activeStyle = (id == current.id || 0)? ' class="okActive"' : '';
      table_buildsLvl += '<tr'+activeStyle+' style="text-align: center;"><td id="okgo'+ (++tdid) +'"><a href="' + buildCityHref(id) + '">' + allCities[id].name + '</td>';
      temp_builds = allCities[id].buildings || {};
      for (j=0; j < buildingList.length; ++j) {
        if (in_array(buildingList[j],newBuildingList)) {
          var openTag  = '<td class="'+(j % 2 ? "e" : "o")+'" id="okgo'+ (++tdid) +'">';
          var closeTag = '</td>';
          if (temp_build = temp_builds[buildingList[j]]) {
            table_buildsLvl += openTag;
            if (temp_build.length !== undefined) { for each (building in temp_build) { table_buildsLvl += printBuilding(building); } }
            else { table_buildsLvl += printBuilding(temp_build); }
            table_buildsLvl += closeTag;
          } else {
            table_buildsLvl += openTag+'-'+closeTag;
          }
        }
      }
      table_buildsLvl += '</tr>';
    }
    table_buildsLvl += '<tr><td></td>';
    for (i=1; i < buildingList.length; i+=2) {
      var enabled  = in_array(buildingList[i],newBuildingList);
      var span     = in_array(buildingList[i-1],newBuildingList) ? '2' : '1';
      buildingName = localize[buildingList[i]] || buildingList[i];
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
    var sum = { 'wood':0,'wine':0,'marble':0,'crystal':0,'sulfur':0,population:0};
    var table_resources = '<table id="ok_resources" style="float:left;">';
    table_resources += '<thead><tr><td style="min-width:75px;"></td>';
    for (var resource in icon)
        table_resources += '<td style="width:100px;" id="okgo'+ (++tdid) +'">' + image(resource) + unsafeWindow.LocalizationStrings['resources'][resource] + '</td>';
    table_resources += '<td class="tanline">&nbsp;</td><td style="font-size:22px;"><img src="/skin/characters/40h/citizen_r.gif" height="24"/> / <img src="/skin/icons/livingspace_24x24.gif"/></td>';
    table_resources += '</tr></thead>';

    for each (id in cityOrder) {
      var temp_resources = allCities[id].resources;
      var then = temp_resources.timestamp || '';
      var old  = '';
      if (then && now) {
        old = (now-then) ? '<span class="toDuration" rel="'+then+'" style="float:left;">('+duration((now-then)/1000)+')</span>' : '<span class="toDuration" rel="'+then+'" style="float:left;">&#10003;</span>';
      }
      var activeStyle = (id == current.id || 0)? ' class="okActive"' : '';
      table_resources += '<tbody'+activeStyle+' style="display:'+options.ok_resources+'"><tr style="text-align:center;"><td id="okgo'+ (++tdid) +'"><a href="' + buildCityHref(id) + '">' + allCities[id].name + '</a>'
                       + '<a href="/index.php?view=transport&destinationCityId='+id+'"><img src="/skin/resources/icon_actionpoints.gif" width="12" height="12" alt="Txfr"></a></td>';
      for (resource in icon){
        var tradeNote = '', extraMsg = '', production = 0, href = '';
        switch (resource){
          case 'wood' :
            sum.wood  += temp_resources.woodProduction || 0;
            production = temp_resources.woodProduction;
            href = buildResourceHref(id);
          break;
          case 'wine' :
            extraMsg = temp_resources.wineConsumption ? '-' + temp_resources.wineConsumption : '';
            sum.wine -= temp_resources.wineConsumption || 0;
          default:
            if (temp_resources.tradeName == resource) {
              sum[resource] += temp_resources.tradeProduction || 0;
              production = temp_resources.tradeProduction;
              href = buildTradegoodHref(id);
            }
        }
        if (production) {    tradeNote = '<span class="tradeNote"><a href="' + href + '">+' + ((production !== undefined) ? production : '?') + '</a>' + extraMsg + '</span>'; }
        else if (extraMsg) { tradeNote = '<span class="tradeNote">' + extraMsg + '</span>'; }
        table_resources += '<td id="okgo'+ (++tdid) +'">' + fmtNumber(temp_resources[resource] || 0) + tradeNote;
        if (allCities[id].goal && allCities[id].goal[resource]) {
          var diff = allCities[id].goal[resource] - (temp_resources[resource] || 0);
          var title = (allCities[id].goal[resource] > allCities[id].resources[resource+"Max"]) ? Math.ceil((allCities[id].goal[resource] - allCities[id].resources[resource+"Max"])/8000) + ' warehouse levels needed' : '';
          table_resources += ' <span class="xtraNote" rel="'+id+'" title="'+title+'">('+fmtNumber(diff)+')</span>';
        }
        table_resources += '</td>';
      }
      var transportHelper = { wood:{avg:0,max:0},wine:{avg:0,max:0},marble:{avg:0,max:0},crystal:{avg:0,max:0},sulfur:{avg:0,max:0}};
      if (enableTransport && destinationCityId == id && current) {
        var amountAvg = amountToSend(averages,allCities[id].resources,current.resources);
        var amountMax = amountToSend({'wood':1e10,'wine':1e10,'marble':1e10,'crystal':1e10,'sulfur':1e10},allCities[id].resources,current.resources);
        var sliderBox = $X('//div[@id="transportGoods"]//ul[@class="resourceAssign"]');
            sliderBox.style.width = 'auto';
        for (var resource in transportHelper){
          var content = '';
          transportHelper[resource].avg = amountAvg[resource];
          transportHelper[resource].max = amountMax[resource];
          for each (var amount in transportHelper[resource])
              content += '<button class="quickTransport" value="'+resource+'=' +  amount+'">'+amount+'</button>';
          var slider = $('textfield_'+(resource == 'crystal' ? 'glass' : resource));
          if (slider) slider.parentNode.appendChild(node('div','',{left:'508px',position:'absolute',top:'4px'},content));
        }
        $X('./li[last()]/div[2]',sliderBox).innerHTML += '<br/> <span style="width:60px; display:inline-block; padding-left:1em;">average</span> <span>max</span>';
      }
      temp = allCities[id].demographics;
      if (temp) {
        table_resources += '<td class="tanline">&nbsp;</td><td>'+temp.population +' / '+temp.maxSpace+'</td>';
        sum.population += temp.population;
      } else
        table_resources += '<td class="tanline">&nbsp;</td><td>?</td>';
      table_resources += '</tr>';

      var percent = {};
      var percent1i = Math.ceil(number(temp_resources.wood)/number(temp_resources.woodMax)*100);
      percent.wood = '<div class="okHBar" style="background-color:rgba(' + 58 + '%,' + percent1i + '%,' + percent1i+'%, 0.8 ); width:'+percent1i+'px">&nbsp;</div>';
      var percent2i = Math.ceil(number(temp_resources.wine)/number(temp_resources.wineMax)*100);
      percent.wine = '<div class="okHBar" style="background-color:rgba(' + 58 + '%,' + percent2i + '%,' + 96 +'%, 0.8 ); width:'+percent2i+'px">&nbsp;</div>';
      var percent3i = Math.ceil(number(temp_resources.marble)/number(temp_resources.marbleMax)*100);
      percent.marble = '<div class="okHBar" style="background-color:rgba(' + percent3i + '%,' + percent3i + '%,' + percent3i +'%, 0.8 ); width:'+percent3i+'px">&nbsp;</div>';
      var percent4i = Math.ceil(number(temp_resources.crystal)/number(temp_resources.crystalMax)*100);
      percent.crystal = '<div class="okHBar" style="background-color:rgba(' + percent4i + '%,' + 81 + '%,' + 96 +'%, 0.8 ); width:'+percent4i+'px">&nbsp;</div>';
      var percent5i = Math.ceil(number(temp_resources.sulfur)/number(temp_resources.sulfurMax)*100);
      percent.sulfur = '<div class="okHBar" style="background-color:rgba(' + 93 + '%,' + 89 + '%,' + (percent5i>>1) +'%, 0.8 ); width:'+percent5i+'px">&nbsp;</div>';

      table_resources += '<tr style="text-align: right; font-size: 10px;padding-right: 3px;"><td>' + old + (allCities[id].resourceLvl || '?') + '/'+(allCities[id].tradegoodLvl || '?')+'</td>';
      for (var resource in icon)
          table_resources += '<td>' + percent[resource] + (fmtNumber(temp_resources[resource+'Max']) || '-') + '</td>';
      if (temp) {
        table_resources += '<td class="tanline">&nbsp;</td><td>'+(temp.satisfaction-temp.population)+'</td>';
        }
      else
        table_resources += '<td class="tanline">&nbsp;</td>';
      table_resources += '</tr></tbody>';
    }
    table_resources += '<tfoot><tr><td>&Sigma;</td>';
    for (var resource in icon) table_resources += '<th style="width:100px">' + sum[resource] + ' / ' + (sum[resource] * 24) + '</th>';
    table_resources += '<td class="tanline">&nbsp;</td><th style="width:100px">' + sum.population + '</th>';
    table_resources += '</tr></tfoot>';

    table_resources += '</table>';
    table_resources += '<div style="clear:both;"></div>';
    return table_resources;
  }

  function printForce(type){
    var force = current && current[type];
    if (!force) { return ''; }
    var buildHref = type == 'army' ? buildArmyHref : buildNavyHref;
    var temp, output = '<table id="ok_'+type+'" style="float:left;">', stats = {};
    output += '<thead><tr><td style="min-width:75px;"></td>';
    // PASS 1
    for (var unit in force) stats[unit] = 0;
    for each (var id in cityOrder) {
      if (temp = allCities[id][type])
          for (var unit in force)
              stats[unit] += temp[unit] || 0;
    }

    for (var unit in force) if (stats[unit]) output += '<th id="okgo'+ (++tdid) +'">'+unit+'</th>';
    output += '</tr></thead>';
    output += '<tbody style="display:'+options['ok_'+type]+'">';
    // PASS 2
    for each (var id in cityOrder) {
      var activeStyle = (id == current.id || 0)? ' class="okActive"' : '';
      output += '<tr'+activeStyle+' style="text-align:center;"><td id="okgo'+ (++tdid) +'" style="white-space:nowrap;"><a href="'+buildHref(id)+'">' + allCities[id].name + '</a><a href="/index.php?view=deployment&deploymentType='+(type == 'army'? 'army' : 'fleet')+'&destinationCityId='+id+'"><img src="/skin/resources/icon_actionpoints.gif" width="12" height="12" alt="Txfr"></a></td>';
      temp = allCities[id][type];
      for (var unit in force)
          if (stats[unit]) output += '<td id="okgo'+ (++tdid) +'">'+(temp && temp[unit] || '')+'</td>';
      output += '</tr>';
    }
    output += '</tbody>';
    output += '<tfoot><tr><td>x&#772;</td>';
    for (var unit in force)
        if (stats[unit])
        output += '<th>'+(stats[unit]?Math.round(stats[unit]/cityOrder.length*10)/10:'')+'</th>';
    output += '</tr><tr><td>&Sigma;</td>';
    for (var unit in force)
        if (stats[unit])
        output += '<th>'+(stats[unit]?stats[unit]:'')+'</th>';
    output += '</tr></tfoot>';
    output += '</table>'
    return output;
  }
  if (!$('overviewPopup')) {
    var tdid = 0; // table element counter
    var popupKey = parseInt(GM_getValue('popupKey',"32"),10);
    var popupKeyOptions = {9:'TAB',16:'SHIFT',32:'SPACE',192:'` (backtick)',74:'j',75:'k'};
    var popupKeyOptionsHTML = '';
    for (var key in popupKeyOptions) {
      popupKeyOptionsHTML += '<option value="'+key+'"' + (popupKey == key ? ' selected' : '') +'>'+popupKeyOptions[key]+'</option>';
    }
    var overviewPopup = node("div",'',{'display':'none'},
      '<div><table id="igoheader" style="margin:0; width:100%; border:0; border-bottom:thick double #F2E4B5; background-color: #DEAB5C; "><tr><td style="text-align:left; border:0;">'
        + '<span id="igo_postop" class="igo_pos">&#9683;</span>'
        + '<span id="igo_posdef" class="igo_pos">&#9682;</span>'
        + '</td><td style="text-align:center; font-weight:bold; border:0;">'
        + '<a href="'+scriptMetadata.homepage+'">'+scriptName + '</a> (hold <select>' + popupKeyOptionsHTML + '</select> to toggle)</td>'
        + '<td style="text-align:right; border:0;"><div id="icon_close">[X]</div></td></tr></table>'	+ printBuildingLevels()	+ printResources()+printForce('army')+printForce('navy')+'<div style="clear:both;"></div></div>'
    );
    overviewPopup.id = "overviewPopup";
    GM_addStyle('#icon_close { background-image:url(/skin/layout/notice_close.gif); text-indent: -10000px; text-align:left; width:18px; height:18px; margin:0 0 0 auto;}'
        + '#icon_close:hover { background-image:url(/skin/layout/notice_close_hover.gif); }'
    );
    document.body.appendChild(overviewPopup);

    // CONNECT INTERACTIVE ELEMENTS
    onClick($('icon_close'),showHide);
    $X('.//select',overviewPopup).addEventListener("change", function(){GM_setValue('popupKey',this.value);}, false);

    for each (var button in $x('.//button[@class="quickTransport"]')) { onClick(button, transportMax, true); }

    var elem;
    for each (var thead in $x('.//thead',$('overviewPopup'))){
      if (elem = $X('.//td',thead)) {
        elem.style.cursor = 'pointer';
        elem.innerHTML    = '<img width="12" height="12" src="'+openIcon+'">';
        onClick(elem,function() { showHideTbody(this,this.parentNode.parentNode.parentNode.id); });
      }
    }
    for each (var td in $x('.//th|.//td[contains(@id,"okgo")]',$('overviewPopup'))) {
      if (options[td.id]) { hilightCell('',td); } 
      onDblclick(td,hilightCell);
    }
    for each (var elem in $x('.//*[@class="xtraNote"]',$('overviewPopup'))){
      onClick(elem,function(){
        var id = this.getAttribute('rel');
        if (id > 0 && allCities[id]) {
          allCities[id].goal = {};
          GM_setValue("cities_"+server, uneval(allCities));
          for each (var elem in $x('.//*[@id="overviewPopup"]//span[@rel="'+id+'" and @class="xtraNote"]')) elem.style.display = "none";
        }
      });
    }
    for each (var elem in $x('.//span[@class="igo_pos"]',$('igoheader'))) {
      onClick(elem,function(){ options.popPos = this.id; positionOverviewPopup(this.id); GM_setValue('options_'+gameServer,uneval(options)); } );
    }
    positionOverviewPopup(options.popPos);
  }
}
function hilightCell(dummy,elem){
  elem = elem || this;  // dummy gets set to Event
  //debug(elem + ' ' +elem.className + ' ' + elem.id);
  if (elem.className){
    if (elem.className == 'hi' || (elem.className.indexOf(' hi') != -1)){
      elem.className = trim(elem.className.replace('hi',''));
      delete options[elem.id];
    } else {
      elem.className += ' hi';
      options[elem.id] = true;
    }
  } else {
    elem.className = 'hi';
    options[elem.id] = true;
  }
  GM_setValue('options_'+gameServer,uneval(options));
}

function timeTillIdle(id){
  var temp_builds = allCities[id].buildings, temp_build, building, time = 1e15, doSave = false;
  if (temp_builds) {
    for each (temp_build in temp_builds) {
      if (temp_build.length !== undefined) {
        for each (building in temp_build) {
          if (building.constructing) {
            if (building.finished > now) { time = Math.min(time,building.finished); }
            else { ++building.level; building.constructing = false; doSave = true; }
          }
        }
      } else {
        if (temp_build.constructing) {
          if (temp_build.finished > now) { time = Math.min(time,temp_build.finished); }
          else { ++temp_build.level; temp_build.constructing = false; doSave = true; }
        }
      }
    }
    if (doSave) GM_setValue("cities_"+server, uneval(allCities));
  }
  if (time == 1e15) time = 0;
  return time;
}
function constructionQueueUpdate(){
  function printEntry(entry,n){ return '<li rel="'+n+'">' + allCities[entry.id].name + ' / ' + (localize[entry.building] || entry.building) + ' (<span class="toDurationHMS" rel="'+entry.time+',2">' +durationHMS((entry.time-now)/1000,2)+ '</span>) [s'+(entry.time%10)+']</li>'; }
  var i, output = '';
  var queue = eval(GM_getValue('queue'+server,'([])'));
  for (i = 0; i < queue.length; ++i) output += printEntry(queue[i],i);
  if (i) {
    $('constructionQueue').style.display = $('constructionQueue').previousSibling.style.display = 'block';
    output = '<ul>'+output+'</ul>';
  } else {
    $('constructionQueue').style.display = $('constructionQueue').previousSibling.style.display = 'inline';
    output = '<i>empty</i>';
  }
  $('constructionQueue').innerHTML = output;
  var entries = $x('./ul/li',$('constructionQueue'));
  for (i = 0; i < entries.length; ++i){
    onClick(entries[i],function(){ queue.splice(this.getAttribute('rel'),1); GM_setValue('queue'+server,uneval(queue)); constructionQueueUpdate(); });
  }
  constructionQueueExecute();
}
function constructionQueueAdd(newEntry){
  var entry, queue = eval(GM_getValue('queue'+server,'([])')), ready = true;
  // check for expired entries
  for (var i = queue.length-1; i >= 0; --i) if (queue[i].time < now) { queue.splice(i,1); }
  // check for duplicates
  for (var i = 0; i < queue.length; ++i){
    //if ((queue[i].id == newEntry.id) && (queue[i].building == newEntry.building))
    if (queue[i].id == newEntry.id) { ready = false; break; }
  }
  if (ready){ queue.push(newEntry); }
  GM_setValue('queue'+server,uneval(queue));
  constructionQueueUpdate();
}
function constructionQueueExecute(){
  function actionReqFix(href){ return href.replace(/[a-f0-9]+$/,$X('//form[@id="changeCityForm"]//input[@name="actionRequest"]').value); }
  function getState(time){ return time % 10; }
  function setState(time,newState){ return Math.floor(time / 10) * 10 + newState; }

  var queue = eval(GM_getValue('queue'+server,'([])')), entry;
  // check for expired entries
  var olength = queue.length;
  for (var i = olength-1; i >= 0; --i) if ((queue[i].time < now) && !getState(queue[i].time)) { queue.splice(i,1); }
  if (olength != queue.length) GM_setValue('queue'+server,uneval(queue));
  // look for next entry to execute
  var time = 1e15;
  var href =  message = '',entryIndex;
  for (var i = 0; i < queue.length; ++i){
    if (queue[i].time < time) {
      time = queue[i].time;
      href = queue[i].href;
      message = allCities[queue[i].id].name + ' / ' + (localize[queue[i].building] || queue[i].building);
      entryIndex = i;
    }
  }
  // execute
  if (href){
    if (getState(time) == 1) {
      // need to go to /index.php?view=tradeAdvisor first somehow
      constructionQueueTimer = setTimeout(
          function() {
            queue[entryIndex].time = setState(time,0) + 10000;
            GM_setValue('queue'+server,uneval(queue));
            ddebug('execute queue '+message + ' (prereq) '); document.location.href='http://' + document.location.toString().split('/')[2] + '/index.php?view=tradeAdvisor';
          }
          ,
          Math.max(time-now,0)
        );
    } else {
      constructionQueueTimer = setTimeout(function() { ddebug('execute queue '+message + ' ' +actionReqFix(href)); document.location.href=actionReqFix(href); },Math.max(time-now,0));
      //debug(actionReqFix(href),time-now,message,constructionQueueTimer);
    }
  }
}
function buildingUpgradeNote(){
  var viewportId = $X('./a[@class="city"]',$('breadcrumbs')).href;
  viewportId = parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
  var buildID = document.body.id, upgradeLink = $X('//div[@id="buildingUpgrade"]//li[@class="upgrade"]/a');

  if (allCities[viewportId] && upgradeLink) {
    upgradeLink = upgradeLink.href;

    //update db w/ building info
    if (buildID == 'palaceColony') { buildID = 'palace'; }  // reuse palace for governor's residence

    var i = 0, tempBuild = allCities[viewportId].buildings[buildID];
    if ((buildID == "warehouse") && (tempBuild.length != undefined)) {
      var warehouses   = copy(tempBuild);
      var currPosition = upgradeLink.match(/position=(\d+)/)[1];
      for (; i < tempBuild.length; ++i) {
        if (tempBuild[i].href.match(/position=(\d+)/)[1] == currPosition) { break; }
      }
      tempBuild = tempBuild[i];  // no sanity checking ?
    }
    if (tempBuild) {
      var building          = {};
      building.level        = parseInt($X('//div[@id="buildingUpgrade"]/div/div[@class="buildingLevel"]/text()').nodeValue,10);
      building.href         = tempBuild.href;
      building.constructing = !!$('upgradeInProgress');
      if (building.constructing) {
        // rewrite upgradeLink
        var temp = upgradeLink.match(/(.+level=)(\d+)(.+)/);
        upgradeLink = temp[1]+(parseInt(temp[2],10)+1)+temp[3];

        var script      = $X('//div[@id="upgradeInProgress"]/script[1]').innerHTML;
        var scriptLines = script.split('\n');
        var enddate     = parseInt(scriptLines[4].replace(/\D/g,''),10);
        var currenttime = parseInt(scriptLines[5].replace(/\D/g,''),10);
        building.finished = enddate*1e3 + now - currenttime*1e3;  // does not account for day light savings
      }
      if ((tempBuild.level != building.level) || (tempBuild.constructing != building.constructing)) {
      
        if ((buildID == "warehouse") && (allCities[viewportId].buildings[buildID].length != undefined)) {
          allCities[viewportId].buildings[buildID][i] = building;
          GM_setValue("cities_"+server, uneval(allCities));
        } else {
          allCities[viewportId].buildings[buildID] = building;
          GM_setValue("cities_"+server, uneval(allCities));
        }
      }
    }

    // construction queue
    var time = timeTillIdle(viewportId) || now, entry = {};
    entry.id = viewportId;
    entry.building = document.body.id;
    entry.href = upgradeLink;
    entry.time = Math.floor(time/10)*10+30001;
    var eta = (time == now) ? "NOW" : durationHMS((time-now)/1000);
    onClick(
      $X('//div[@id="buildingUpgrade"]/div').appendChild(node('div','',{cursor:'pointer',background:'#FFFBDB url(/skin/upgrade/nextlevelarrow.gif) no-repeat scroll center 20%',paddingTop:'22px'} , 'Queue Upgrade (ETA: <span class="'+((time == now) ? '' : 'toDurationHMS')+'" rel="'+time+'">'+eta+'</span>)'))
      ,
      function(){ constructionQueueAdd(entry); }
    );

    // goal setting
    var resourceName,goal = {};
    for each (var resource in $x('//div[@id="buildingUpgrade"]/div[@class="content"]/ul[@class="resources"]/li')){
      resourceName = resource.className.split(" ")[0];
      if (resourceName == 'glass') { resourceName = 'crystal'; }
      if (resourceName != 'time')
          goal[resourceName] = number(resource.childNodes[1].nodeValue);
    }
    var noteCtrl = $X('//div[@id="buildingUpgrade"]/div/h4').appendChild(node('img','',{display:'inline',marginLeft:'3px',cursor:'pointer'}));
    noteCtrl.src = '/skin/layout/icon-message.gif';
    noteCtrl.title = "Set Goal";
    onClick(noteCtrl,function(){allCities[viewportId].goal = goal; GM_setValue("cities_"+server, uneval(allCities)); });
  }
}
function getCensus(viewportCity){
  var population = {};
  var ulstats = $('CityOverview').childNodes[3].childNodes[3];
  population.happy          = parseInt($('SatisfactionOverview').childNodes[5].childNodes[3].textContent,10);
  population.population   	= number(ulstats.childNodes[1].childNodes[1].textContent);
  population.satisfaction   = population.population + population.happy;
  population.maxSpace	      = number(ulstats.childNodes[1].childNodes[3].textContent);
  viewportCity.demographics = population;
}



//************************************************* DO STUFF **************************************************//
var localize   = eval(GM_getValue("localize_dictionary", "({})"));
var current;			// all info about the current city, set by getCities();
var allCities  = getCities();
var cityOrder  = getCityOrder();
//var keywords   = getLang();
var averages   = {'wood':0,'wine':0,'marble':0,'crystal':0,'sulfur':0};
var enableTransport = (document.body.id == "transport");
var destinationCityId;
var now,server = '',gameServer = document.domain.replace(/ikariam\./,'');
var constructionQueueTimer;
var options    = eval(GM_getValue('options_'+gameServer, {}));
if ($('servertime') && unsafeWindow.IKARIAM){
  server = document.location.href.split('.')[0].split('//')[1]; // this seems like a stupid way, but whatever
  var viewportId;
  now = itime2Date($('servertime').innerHTML).getTime();
  switch (document.body.id) {
    case 'city' :
      if ($('position0')) {
        buildLocalize();
        viewportId = $X('.//a',$('position0')).href.match(/id=(\d+)/)[1];
        if (allCities[viewportId]) {
          getBuildings(allCities[viewportId]);
        } else if ($X('.//a',$('position0')).href.indexOf(current.id) != -1)
          getBuildings(current);
      }
    break;
    case 'cityMilitary-army' :
    case 'barracks' :
      viewportId = $X('./a[@class="city"]',$('breadcrumbs')).href;
      viewportId= parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      if (allCities[viewportId]) {
        getArmy(allCities[viewportId]);
      }
    break;
    case 'plunder' :
      getArmy(current);
    break;
    case 'cityMilitary-fleet' :
    case 'shipyard' :
      viewportId = $X('./a[@class="city"]',$('breadcrumbs')).href;
      viewportId= parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      if (allCities[viewportId]) {
        getNavy(allCities[viewportId]);
      }
    break;
    case 'resource' :
    case 'tradegood' :
      if ($('setWorkersBox')){
        current[document.body.id+'Lvl'] = $X('//div[@id="resUpgrade"]//div[@class="buildingLevel"]/text()').nodeValue;
      }
    break;
    case 'townHall' :
      viewportId = $X('./a[@class="city"]',$('breadcrumbs')).href;
      viewportId= parseInt(viewportId.substring(viewportId.lastIndexOf('=')+1),10);
      if (allCities[viewportId]) {
        getCensus(allCities[viewportId]);
      }
    break;
  }
 if (current) getResources();
  buildCities();
  if (enableTransport){
    destinationCityId = $X("//input[@name='destinationCityId']").value;
    addLoadTimesToPage();
  }
  if ($('buildingUpgrade')) buildingUpgradeNote();
  buildInfoBox();
  doPopups();
  setInterval(function () { updateDurationsHMS(); },1000);
}
