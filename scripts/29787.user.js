// ==UserScript==
// @name           Ikariam++
// @namespace    http://userscripts.org./scripts/show/29787
//@description   Ikariam++ v 0.2.7.003
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

var	currentCity;
var currentTradegood;
var cities = [];
var varPrefix = 'ikapp_' + document.location.hostname + '_';
var buildingName = GM_getValue(varPrefix + 'buildingName', "-,-,-,-,-,-,-,-,-,-,-,-,-,-,-").split(",");
var unitName = GM_getValue(varPrefix + 'unitName', "-,-,-,-,-,-,-,-,-,-,-,-,-").split(",");
var shipName = GM_getValue(varPrefix + 'shipName', "-,-,-,-,-,-,-").split(",");
var storageLabel = "";
var XPathResult;

function getCityIndex(){
  var obj_span =     XPathResult = document.evaluate("//div[@id='breadcrumbs']/*[@class='city']",
                     document,
                     null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
  var cityname = obj_span.singleNodeValue.textContent;

  for(var i = 0; i < document.getElementById("citySelect").options.length; i++){
    if(cityname == document.getElementById("citySelect").options[i].text)
      return i;
  }
}

function fix(num, x){
  if(typeof num == 'undefined')
    return '';
  else if(typeof num == 'string')
    return num;
  else{
    if(!x)
      return isNaN(num) || num == null ? NaN : Math.floor(num);
    else
      return isNaN(num) || num == null ? NaN : num.toFixed(x);
  }
}

function timeString(t){
  t /= 1000;
  if(t < 0){
    return "-";
  }
  else if(t < 60){
    return fix(t) + " s";
  }
  else if(t < 60 * 60){
    return fix(t / 60, 1) + " m";
  }
  else if(t < 60 * 60 * 24){
    return fix(t / 60 / 60, 1) + " h";
  }
  else{
    return fix(t / 60 / 60 / 24, 1) + " D";
  }
}

function getTradegoodKind(){
  var str = unsafeWindow.updateResources.toString();

  if(str.indexOf("value_wine") != -1) return 1;
  else if(str.indexOf("value_marble") != -1) return 2;
  else if(str.indexOf("value_crystal") != -1) return 3;
  else if(str.indexOf("value_sulfur") != -1) return 4;
  else return null;
}

function anti_number_format(numberString){//convert a formated number to a real number
  var decimalPoint = unsafeWindow.LocalizationStrings['decimalPoint'];
  var thousandSeperator = unsafeWindow.LocalizationStrings['thousandSeperator'];
  var re = new RegExp(thousandSeperator,'g');
  numberString = numberString.replace(re,'');
  numberString = numberString.replace(decimalPoint, '.');
  return parseFloat(numberString);
}

function population_to_full(totalSatisfaction, max_population, total_space){
  if(max_population <= total_space)
    return Infinity;
  else
    return Math.log(totalSatisfaction / (max_population - total_space)) * 50 * 3600000;
}

function buildingNameMap(key){
  switch(key){
    case "townHall":
      return 0;
    case "academy":
      return 1;
    case "barracks":
      return 2;
    case "port":
      return 3;
    case "shipyard":
      return 4;
    case "warehouse":
      return 5;
    case "wall":
      return 6;
    case "tavern":
      return 7;
    case "museum":
      return 8;
    case "palace":
      return 9;
    case "palaceColony":
      return 10;
    case "embassy":
      return 11;
    case "branchOffice":
      return 12;
    case "workshop-army":
      return 13;
    case "safehouse":
      return 14;
    default:
      GM_log("No mapping for " + key);
      return null;
  }
}

function setClass(obj, className){
  switch(className){
    case "danger":
      obj.style.color = '#CC3300';
      obj.style.fontWeight = "";
      break;
    case "full":
      obj.style.color = '#CC0000';
      obj.style.fontWeight = 'bold';
      break;
    case "fine":
      obj.style.color = "";;
      obj.style.fontWeight = "";
      break;
    case "sigma":
      obj.style.fontWeight = "bold";
      obj.style.fontSize = "larger";
      break;
    case "currentlyBuild" :
      obj.style.backgroundColor = "lightseagreen";

      break;
    default://set class by tag name
      switch(obj.tagName){
        case "TABLE":
          obj.style.border = '3px double black';
          obj.style.width = '100%';
          break
        case "CAPTION":
          obj.style.fontWeight = 'bold';
          obj.style.textAlign = "center";
          break;
        case "THEAD":
          obj.style.fontWeight = 'bold';
          obj.style.color = 'green';
          break;
        case "TBODY":
          obj.style.borderBottom = '2px solid brown';
          obj.style.borderTop = '2px solid brown';
          break;
        case "TFOOT":
          obj.style.fontWeight = 'bold';
          break;
        default:
        console.log("No Class defined for " + obj.tagName);
      }
  }
}

function city(){//city object contains all data of the city
  this.name = null;
  this.addition = null;
  this.id = null;
  this.islandId = null;
  this.buildingLevel = [];
  this.units = [];
  this.ships = [];
  this.updatedTime = NaN;
  this.tradegood = null;
  this.startResources = [];
  this.resourcesDelta = [];
  this.resourcesStorage = [];
  this.resourcesFullTime = [];
  this.wineSub = null;
  this.wineSubTime = NaN;
  this.wineAmount = NaN;
  this.totalSatisfaction = NaN;
  this.max_population = NaN;
  this.total_space = NaN;
  this.populationUpdatedTime = NaN;
  this.populationFullTime = NaN;
  this.pos_label = [];
  this.pos_href = [];
  this.building_href = [];
  this.currentlyBuild = null;
  this.cityCoundown = null;
}

function createLink(href, textContent){//create anchor object
  var obj_a = document.createElement("a");
  obj_a.href = href;
  obj_a.textContent = textContent;
  return obj_a;
}

function fillCell(cell_ref, cell_title, cell_content){
  cell_ref.title = cell_title;
  cell_ref.appendChild(cell_content);
}

function setUpdatedTime(indexOfCity){
  GM_setValue(varPrefix + 'city' + indexOfCity + 'updatedTime',
              unsafeWindow.startTime.toString());
}

function setIslandId(indexOfCity){
  var obj_a = document.evaluate("//div[@id='cityNav']//li[@class='viewIsland']/a", document,
                                null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if(obj_a.singleNodeValue){
    GM_setValue(varPrefix + 'city' + indexOfCity + 'islandId',
                parseInt(obj_a.singleNodeValue.search.match(/\d+/)));
  }
}

function setTradegood(indexOfCity){
  GM_setValue(varPrefix + 'city' + indexOfCity + 'tradegood',
              getTradegoodKind());
}

function setStartResources(indexOfCity, indexOfTradegood, startResources){
  startResources[0] = unsafeWindow.startResources;
  startResources[1] = anti_number_format(document.getElementById("value_wine").textContent);
  startResources[2] = anti_number_format(document.getElementById("value_marble").textContent);
  startResources[3] = anti_number_format(document.getElementById("value_crystal").textContent);
  startResources[4] = anti_number_format(document.getElementById("value_sulfur").textContent);
  startResources[indexOfTradegood] = unsafeWindow.startTradegood;
  GM_setValue(varPrefix + 'city' + indexOfCity + 'startResources',
              startResources.toString());
}

function setResourcesDelta(indexOfCity, indexOfTradegood, resourcesDelta){
  resourcesDelta[0] = unsafeWindow.startResourcesDelta;
  resourcesDelta[indexOfTradegood] = unsafeWindow.startTradegoodDelta;
  GM_setValue(varPrefix + 'city' + indexOfCity + 'resourcesDelta',
              resourcesDelta.toString());
}

function setResourcesStorage(indexOfCity, indexOfTradegood, resourcesStorage){
  var obj_span = document.evaluate("//div[@id='cityResources']/ul/li/div[@class='tooltip']/span",
                 document,
                 null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                 null);
  storageLabel = obj_span.snapshotItem(0).textContent;

  for(var i = 0; i < obj_span.snapshotLength; i++){
    resourcesStorage[i] = anti_number_format(obj_span.snapshotItem(i).nextSibling.textContent);
  }
  resourcesStorage[0] = unsafeWindow.resourcesStorage;
  resourcesStorage[indexOfTradegood] = unsafeWindow.tradegoodStorage;
  GM_setValue(varPrefix + 'city' + indexOfCity + 'resourcesStorage',
              resourcesStorage.toString());
}

function setWineSubTime(indexOfCity){
  GM_setValue(varPrefix + 'city' + indexOfCity + 'wineSubTime',
              unsafeWindow.tradegoodSubTime.toString());
}

function setResourcesFullTime(indexOfCity, indexOfTradegood, wineAmount, startResources, resourcesDelta, resourcesStorage, resourcesFullTime){
  resourcesFullTime[0] = unsafeWindow.startTime +
                         1000 * (resourcesStorage[0] - startResources[0]) /
                                resourcesDelta[0];
  if(indexOfTradegood != 1){
    resourcesFullTime[indexOfTradegood] = unsafeWindow.startTime +
                                          1000 * (resourcesStorage[indexOfTradegood] - startResources[indexOfTradegood]) / resourcesDelta[indexOfTradegood];
    resourcesFullTime[1] = unsafeWindow.startTime + 3600000 * startResources[1] / wineAmount;
  }
  else{
    if(1200 * unsafeWindow.startTradegoodDelta - unsafeWindow.tradegoodSub > 0){
      resourcesFullTime[1] = unsafeWindow.startTime +
                             (unsafeWindow.tradegoodStorage - unsafeWindow.startTradegood) /
                             Math.abs(unsafeWindow.startTradegoodDelta * 3600 - wineAmount) * 3600000;
    }
    else if(1200 * unsafeWindow.startTradegoodDelta - unsafeWindow.tradegoodSub < 0){
      resourcesFullTime[1] = unsafeWindow.startTime +
                             unsafeWindow.startTradegood /
                             Math.abs(unsafeWindow.startTradegoodDelta * 3600 - wineAmount) * 3600000;
    }
    else{
      resourcesFullTime[1] = Infinity;
    }
  }
  GM_setValue(varPrefix + 'city' + indexOfCity + 'resourcesFullTime',
              resourcesFullTime.toString());

}

function saveCityData(){
  var obj_citySelect = document.getElementById("citySelect");

  if(!obj_citySelect) return;
  currentCity = obj_citySelect.selectedIndex;
  currentTradegood = getTradegoodKind();
  var tmp;
  var wineSub = GM_getValue(varPrefix + 'city' + currentCity + 'wineSub', NaN);
  var wineAmount = GM_getValue(varPrefix + 'city' + currentCity + 'wineAmount', NaN);
  var startResources = [0, 0, 0, 0, 0];
  var resourcesDelta = [0, 0, 0, 0, 0];
  var resourcesStorage = [null, null, null, null, null];
  var resourcesFullTime = [Infinity, NaN, Infinity, Infinity, Infinity];
//saving updated time
    setUpdatedTime(currentCity);
//save island Id
    setIslandId(currentCity);
//saving the trade good
    setTradegood(currentCity);
//saving start resources
    setStartResources(currentCity, currentTradegood, startResources);
//saving resources delta
    setResourcesDelta(currentCity, currentTradegood, resourcesDelta);
//saving storage capacity of resources
    setResourcesStorage(currentCity, currentTradegood, resourcesStorage);
//saving wineSubTime
    setWineSubTime(currentCity);
//saving wineSub
  if(currentTradegood == 1){
    GM_setValue(varPrefix + 'city' + currentCity + 'wineSub',
                unsafeWindow.tradegoodSub.toString());
  }
//saving the time of resources to full
    setResourcesFullTime(currentCity, currentTradegood, wineAmount, startResources, resourcesDelta, resourcesStorage, resourcesFullTime);
//updating when visiting Tavern
  if(document.getElementById("wineAmount") && currentCity == getCityIndex()){
      var obj_wineAmount = document.getElementById('wineAmount');
      var wineAmount = obj_wineAmount.selectedIndex ?
                       parseFloat(obj_wineAmount.options[obj_wineAmount.selectedIndex].text) : 0;
      GM_setValue(varPrefix + 'city' + currentCity + 'wineAmount',
                  wineAmount.toString());
      GM_setValue(varPrefix + 'city' + currentCity + 'wineSub',
                  obj_wineAmount.selectedIndex.toString());

      var str = document.getElementById('serve').nextSibling.nextSibling.textContent;
      var str2 = "<span>Current satisfaction:</span>";
      var totalSatisfaction = parseFloat(str.substr(str.indexOf(str2) + str2.length));
      GM_setValue(varPrefix + 'city' + currentCity + 'totalSatisfaction',
                  totalSatisfaction.toString());

      var value_inhabitants = document.getElementById('value_inhabitants').
                                textContent.match(/\((\S+)\)/);
    	var inhabitants = anti_number_format(value_inhabitants[1]);
      var max_population = Math.round(totalSatisfaction) + inhabitants;
      GM_setValue(varPrefix + 'city' + currentCity + 'max_population',
                  max_population.toString());

      var total_space = parseFloat(GM_getValue(varPrefix + 'city' + currentCity + 'total_space'));
      var populationFullTime = unsafeWindow.startTime +
            population_to_full(totalSatisfaction, max_population, total_space);
      GM_setValue(varPrefix + 'city' + currentCity + 'populationFullTime',
                  populationFullTime.toString());
      GM_setValue(varPrefix + 'city' + currentCity + 'populationUpdatedTime',
                  unsafeWindow.startTime.toString());

      if(currentTradegood != 1){
        resourcesFullTime[1] = unsafeWindow.startTime + 3600000 * startResources[1] / wineAmount;
        GM_setValue(varPrefix + 'city' + currentCity + 'resourcesFullTime',
                    resourcesFullTime.toString());
      }
  }
//updating when visiting Town Hall
  if(document.getElementById("CityOverview")){
    cityIndex = getCityIndex();
    XPathResult = document.evaluate("//div[@id='CityOverview']//span[@class='value total']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null)
    var total_space = parseFloat(XPathResult.singleNodeValue.textContent);
    GM_setValue(varPrefix + 'city' + cityIndex + 'total_space',
                total_space.toString());

    XPathResult = document.evaluate("//div[@id='CityOverview']//span[@class='value occupied']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null)
    var occupied_space = parseFloat(XPathResult.singleNodeValue.textContent);
    console.log('occupied_space:'+occupied_space)

    XPathResult = document.evaluate("//div[@id='SatisfactionOverview']/div/div/div/span[@class='value']",
                         document,
                         null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                         null)
    var totalSatisfaction = 0;

    for(var i = 0; i < XPathResult.snapshotLength; i++){
      totalSatisfaction += parseFloat(XPathResult.snapshotItem(i).textContent);
    }

    var max_population = totalSatisfaction + occupied_space;
    GM_setValue(varPrefix + 'city' + cityIndex + 'max_population',
                max_population.toString());

    if(document.getElementById('value_inhabitants')){//refine Total satisfaction
      var value_inhabitants = document.getElementById('value_inhabitants').
                                textContent.match(/\((\S+)\)/);
      var inhabitants = anti_number_format(value_inhabitants[1]);
      totalSatisfaction -= inhabitants > occupied_space ? .5 : 0//Total satisfaction
    }
    GM_setValue(varPrefix + 'city' + cityIndex + 'totalSatisfaction',
                totalSatisfaction.toString());

    var populationFullTime = unsafeWindow.startTime +
          population_to_full(totalSatisfaction, max_population, total_space);
    GM_setValue(varPrefix + 'city' + cityIndex + 'populationFullTime',
                populationFullTime.toString());
    GM_setValue(varPrefix + 'city' + cityIndex + 'populationUpdatedTime',
                unsafeWindow.startTime.toString());
  }
//updating when viewing City
  if(document.getElementById("locations")){
    cityIndex = getCityIndex();
    var obj_locations = document.getElementById('locations');
    var pos_href = []
    var pos_label = [];
    var building_href = [];
    var buildingLevel = ["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-"];
    XPathResult = document.evaluate("//ul[@id='locations']/li/a",
                     document,
                     null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                     null);
    for(var i = 0; i < XPathResult.snapshotLength; i++){
      var label = XPathResult.snapshotItem(i).title;
      var href = XPathResult.snapshotItem(i).search;
      var re = /(\D+)\s\S+\s(\d+)/;
        if(re.test(label)){
          var found = label.match(re);
          var re2 = /view=([\w-]+)&/;
          if(re2.test(href)){
            var key = href.match(re2)[1];
          }
          buildingName[buildingNameMap(key)] = found[1];
          buildingLevel[buildingNameMap(key)] = found[2];
          building_href[buildingNameMap(key)] = href;
          var obj_cityCountdown = document.getElementById("cityCountdown");
          if(obj_cityCountdown){
            var obj_div = XPathResult.snapshotItem(i).nextSibling.nextSibling;
            if(obj_div && obj_div.className == "timetofinish"){
              GM_setValue(varPrefix + 'city' + cityIndex + 'currentlyBuild',
                          buildingNameMap(key).toString());
              if(unsafeWindow.tmpCnt){
                GM_setValue(varPrefix + 'city' + cityIndex + 'cityCoundown',
                            unsafeWindow.tmpCnt.enddate.toString());
              }
              else{
                console.log("No cityCoundown!!");
              }
            }
          }
          else{
            GM_setValue(varPrefix + 'city' + cityIndex + 'currentlyBuild',
                        "NaN");
            GM_setValue(varPrefix + 'city' + cityIndex + 'cityCoundown',
                        Date.now().toString());
          }

        }
      pos_href.push(href);
      pos_label.push(encodeURIComponent(label.substr(0,30)));
    }
    GM_setValue(varPrefix + 'buildingName', buildingName.toString());
    GM_setValue(varPrefix + 'city' + cityIndex + 'buildingLevel', buildingLevel.toString());
    GM_setValue(varPrefix + 'city' + cityIndex + 'building_href',
                building_href.toString());
    GM_setValue(varPrefix + 'city' + cityIndex + 'pos_href',
                pos_href.toString());
    GM_setValue(varPrefix + 'city' + cityIndex + 'pos_label',
                pos_label.toString());
  }
//when inspecting unit (units)
  if(document.getElementById("demo") && document.getElementById("tab1")){
    cityIndex = getCityIndex();
    var units = ["-","-","-","-","-","-","-","-","-","-","-","-","-"];
    XPathResult = document.evaluate("//div[@id='tab1']/div[1]/div[1]/table/tbody/tr[1]/th",
                           document,
                           null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                           null);
    XPathResult2 = document.evaluate("//div[@id='tab1']/div[1]/div[1]/table/tbody/tr[@class='count']/td",
                     document,
                     null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                     null);
    for(var i = 0; i < XPathResult.snapshotLength; i++){
          unitName[i] = XPathResult.snapshotItem(i).title;
          units[i] = XPathResult2.snapshotItem(i).textContent;
    }
    if(XPathResult.snapshotLength){
      GM_setValue(varPrefix + 'unitName', unitName.toString());
      GM_setValue(varPrefix + 'city' + cityIndex + 'units', units.toString());
    }
  }
//when inspecting unit (ships)
  if(document.getElementById("demo") && document.getElementById("tab2")){
    cityIndex = getCityIndex();
    var ships = ["-","-","-","-","-","-","-"];
    XPathResult = document.evaluate("//div[@id='tab2']/div[1]/div[1]/table/tbody/tr[1]/th",
                           document,
                           null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                           null);
    XPathResult2 = document.evaluate("//div[@id='tab2']/div[1]/div[1]/table/tbody/tr[@class='count']/td",
                     document,
                     null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                     null);
    for(var i = 0; i < XPathResult.snapshotLength; i++){
          shipName[i] = XPathResult.snapshotItem(i).title;
          ships[i] = XPathResult2.snapshotItem(i).textContent;
    }
    if(XPathResult.snapshotLength){
      GM_setValue(varPrefix + 'shipName', shipName.toString());
      GM_setValue(varPrefix + 'city' + cityIndex + 'ships', ships.toString());
    }
  }

  if(document.getElementById("upgradeForm")){
    cityIndex = getCityIndex();
    var obj_upgradeForm = document.getElementById("upgradeForm");

    // var buildingLevel = GM_getValue(varPrefix + 'city' + cityIndex + 'buildingLevel', "'-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'");
    // buildingLevel[buildingNameMap(buildingNameMap(obj_upgradeForm.getElementsByName("oldView")[0].value))] = obj_upgradeForm.getElementsByNamw("level")[0].value;
    // GM_setValue(varPrefix + 'city' + cityIndex + 'buildingLevel', buildingLevel.toString());

  }

}

function loadCityData(){
  for(var i=0 ; i < document.getElementById("citySelect").options.length; i++){
    cities[i] = new city();
    for(var p  in cities[i]){
      try{
        switch(p){
          case 'name':
            cities[i].name = document.getElementById("citySelect").options[i].text;
            break;
          case 'addition':
            cities[i].addition = document.getElementById("citySelect").options[i].title;
            break;
          case 'id':
            cities[i].id = document.getElementById("citySelect").options[i].value;
            break;
          default:
            var tmp = GM_getValue(varPrefix + 'city'  + i + p);
            if(typeof tmp == 'undefined')
              continue;
            cities[i][p] = GM_getValue(varPrefix + 'city'  + i + p);
            cities[i][p] = cities[i][p].toString().split(',');
            if(cities[i][p].length > 1){
              for(var j =0; j < cities[i][p].length; j++){
                cities[i][p][j] = isNaN(parseFloat(cities[i][p][j])) && cities[i][p][j] != "NaN" ?
                                  cities[i][p][j] : parseFloat(cities[i][p][j]);
              }
            } else{
              cities[i][p] = isNaN(parseFloat(cities[i][p][0])) ?
                             cities[i][p][0] : parseFloat(cities[i][p][0]);
            }
        }
      }catch(e){
        console.log(e)
      }
    }
  }
}

function showAllCityData(){
  var obj_extraDiv4=document.getElementById('extraDiv4')
  var s = "";
  for(var i = 0 ; i < cities.length; i++){
    for(var p  in cities[i]){
      try{
        s += 'cities['+i+'].' + p + ' = ' +cities[i][p] +'<br />';
      } catch(e){}
    }
    s += "<p>---------------------------------------------------------</p>"
  }
  obj_extraDiv4.innerHTML += s;
}

function createOverviewTable(){
  var overviewTable = document.createElement("table");
  var row_ref, cell_ref;
  var sum = ['Summary :'];
  overviewTable.id = 'overviewTable';
  overviewTable.frame = 'border';
  setClass(overviewTable)
  var caption = overviewTable.createCaption();
  caption.textContent = 'Resources';
  setClass(caption);
  for(var i = 0; i < cities.length ; i++){
    row_ref = overviewTable.insertRow(-1);
    for(var j = 0; j < 19; j++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = "";
      switch(j){
        case 0://city names
          fillCell(cell_ref,
                   cities[i].addition,
                   createLink("?view=city&id=" + cities[i].id, cities[i].name)
                  );
          break;
        case 1://amount of population
          break;
        case 2://time to steady
          if(cities[i].populationFullTime < Infinity){
            var fulltime = new Date(cities[i].populationFullTime);
            cell_ref.title = fulltime.toString();
          }
          break;
        case 3://amount of building meterial
          cell_ref.title = storageLabel + cities[i].resourcesStorage[0];
          break;
        case 4:
          if(!i)
            sum[j] = cities[i].resourcesDelta[0] * 3600;
          else
            sum[j] += cities[i].resourcesDelta[0] * 3600;
            fillCell(cell_ref,
                     fix(cities[i].resourcesDelta[0] * 3600 * 24) + " / Day",
                     createLink("?action=header&function=changeCurrentCity&oldView=island&view=resource&type=resource&id=" +
                                  cities[i].islandId + "&cityId=" + cities[i].id,
                                fix(cities[i].resourcesDelta[0] * 3600,1))
                    );
          break;
        case 5:
          if(cities[i].resourcesFullTime[0] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[0]);
            cell_ref.title = fulltime.toString();
          }
          break;
        case 6:
          cell_ref.title = storageLabel + cities[i].resourcesStorage[1];
          break;
        case 7:
          if(!i)
            sum[j] = cities[i].resourcesDelta[1] * 3600;
          else
            sum[j] += cities[i].resourcesDelta[1] * 3600;
          if(cities[i].tradegood == 1){
            fillCell(cell_ref,
                     fix(cities[i].resourcesDelta[1] * 3600 * 24) + " / Day",
                     createLink("?action=header&function=changeCurrentCity&oldView=island&view=tradegood&type=tradegood&id=" +
                                  cities[i].islandId + "&cityId=" + cities[i].id,
                                fix(cities[i].resourcesDelta[1] * 3600,1))
                    );
          }
          break;
        case 8:
          if(!i)
            sum[j] = cities[i].wineAmount;
          else
            sum[j] += cities[i].wineAmount;

          if(i == currentCity && !isNaN(cities[i].wineAmount)){
            for(var k = 0; k < cities[i].pos_href.length; k++){
              if(cities[i].pos_href[k].indexOf('tavern') != -1){
                fillCell(cell_ref,
                         -fix(cities[i].wineAmount * 24) + " / Day",
                         createLink(cities[i].pos_href[k],
                                    -fix(cities[i].wineAmount))
                        );

                break;
              }
            }
          }else{
            cell_ref.textContent = -fix(cities[i].wineAmount);
            cell_ref.title = -fix(cities[i].wineAmount * 24) + " / Day"
          }
          break;
        case 9:
          if(cities[i].resourcesFullTime[1] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[1]);
            cell_ref.title = fulltime.toString();
          }
          break;
        case 10:
          cell_ref.title = storageLabel + cities[i].resourcesStorage[2];
          break;
        case 11:
          if(!i)
            sum[j] = cities[i].resourcesDelta[2] * 3600;
          else
            sum[j] += cities[i].resourcesDelta[2] * 3600;
          if(cities[i].tradegood == 2){
            fillCell(cell_ref,
                     fix(cities[i].resourcesDelta[2] * 3600 * 24) + " / Day",
                     createLink("?action=header&function=changeCurrentCity&oldView=island&view=tradegood&type=tradegood&id=" +
                                  cities[i].islandId + "&cityId=" + cities[i].id,
                                fix(cities[i].resourcesDelta[2] * 3600, 1))
                    );
          }
          break;
        case 12:
          if(cities[i].resourcesFullTime[2] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[2]);
            cell_ref.title = fulltime.toString();
          }
          break;
        case 13:
          cell_ref.title = storageLabel + cities[i].resourcesStorage[3];
          break;
        case 14:
          if(!i)
            sum[j] = cities[i].resourcesDelta[3] * 3600;
          else
            sum[j] += cities[i].resourcesDelta[3] * 3600;
          if(cities[i].tradegood == 3){
            fillCell(cell_ref,
                     fix(cities[i].resourcesDelta[3] * 3600 * 24) + " / Day",
                     createLink("?action=header&function=changeCurrentCity&oldView=island&view=tradegood&type=tradegood&id=" +
                                  cities[i].islandId + "&cityId=" + cities[i].id,
                                fix(cities[i].resourcesDelta[3] * 3600, 1))
                    );
          }
          break;
        case 15:
          if(cities[i].resourcesFullTime[3] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[3]);
            cell_ref.title = fulltime.toString();
          }
          break;
          break;
        case 16:
          cell_ref.title = storageLabel + cities[i].resourcesStorage[4];
          break;
        case 17:
          if(!i)
            sum[j] = cities[i].resourcesDelta[4] * 3600;
          else
            sum[j] += cities[i].resourcesDelta[4] * 3600;
          if(cities[i].tradegood == 4){
            fillCell(cell_ref,
                     fix(cities[i].resourcesDelta[4] * 3600 * 24) + " / Day",
                     createLink("?action=header&function=changeCurrentCity&oldView=island&view=tradegood&type=tradegood&id=" +
                                  cities[i].islandId + "&cityId=" + cities[i].id,
                                fix(cities[i].resourcesDelta[4] * 3600, 1))
                    );
          }
          break;
        case 18:
          if(cities[i].resourcesFullTime[4] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[4]);
            cell_ref.title = fulltime.toString();
          }
          break;
        default:
      }
    }
  }
  setClass(overviewTable.tBodies[0]);
  var obj_cityResources = document.getElementById("cityResources");
  var thead = overviewTable.createTHead();
  setClass(thead)
  row_ref = thead.insertRow(-1);
  for(var j = 0; j < 7; j ++){
    cell_ref = row_ref.insertCell(-1);
    cell_ref.textContent = "";
    switch(j){
      case 0:
        obj_img = document.createElement("img");
        obj_img.src = "skin/layout/icon-city2.gif";
        cell_ref.appendChild(obj_img);
        break;
      case 1:
        cell_ref.colSpan = 2;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='population']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      case 2:
        cell_ref.colSpan = 3;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='wood']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      case 3:
        cell_ref.colSpan = 4;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='wine' or @class='wine disabled']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      case 4:
        cell_ref.colSpan = 3;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='marble' or @class='marble disabled']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      case 5:
        cell_ref.colSpan = 3;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='glass' or @class='glass disabled']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      case 6:
        cell_ref.colSpan = 3;
        XPathResult = document.evaluate("//div[@id='cityResources']/ul[@class='resources']/li[@class='sulfur' or @class='sulfur disabled']",
                         document,
                         null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                         null);
        cell_ref.textContent = XPathResult.singleNodeValue.title;
        break;
      default:
        cell_ref.textContent = "";
    }
  }
  var tfoot = overviewTable.createTFoot();
  setClass(tfoot);
  row_ref = tfoot.insertRow(-1);
    for(var j = 0; j < 19; j++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = "";
      switch(j){
        case 0:
          cell_ref.innerHTML = '&Sigma;';
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          cell_ref.textContent = fix(sum[j],1);
          cell_ref.title = fix(sum[j] * 24) + " / Day";
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          cell_ref.textContent = fix(sum[j],1);
          cell_ref.title = fix(sum[j] * 24) +
                           " (net " + fix((sum[j] - sum[j + 1]) * 24) + ")" + " / Day";
          break;
        case 8:
          cell_ref.textContent = -fix(sum[j]);
          cell_ref.title = -fix(sum[j] * 24) + " / Day";
          break;
        case 10:
          break;
        case 11:
          cell_ref.textContent = fix(sum[j],1);
          cell_ref.title = fix(sum[j] * 24) + " / Day";
          break;
        case 12:
          break;
        case 13:
          break;
        case 14:
          cell_ref.textContent = fix(sum[j],1);
          cell_ref.title = fix(sum[j] * 24) + " / Day";
          break;
        case 15:
          break;
        case 16:
          break;
        case 17:
          cell_ref.textContent = fix(sum[j],1);
          cell_ref.title = fix(sum[j] * 24) + " / Day";
          break;
        case 18:
          break;
        default:
      }
    }
  obj_ikapp_overvoew.appendChild(overviewTable);
}

function refreshOverviewTable(){
  var obj_overviewTable = document.getElementById('overviewTable');
  var obj_buildingOverViewTable = document.getElementById('buildingOverViewTable');
  var now = Date.now();
  var sum = ['Summary :'];
  for (var i = 0; i < obj_overviewTable.tBodies[0].rows.length; i++){
    var row_ref = obj_overviewTable.tBodies[0].rows[i];
    for(var j = 0; j < row_ref.cells.length; j++){
      var cell_ref = row_ref.cells[j];
      switch(j){
        case 0:
          break;
        case 1://population
          var deltaTime =
                (now - cities[i].populationUpdatedTime) / 3600000;
          var lim_population = cities[i].max_population > cities[i].total_space ?
                               cities[i].total_space : cities[i].max_population;
          var population = -cities[i].totalSatisfaction *
                Math.exp(-.02 * deltaTime) + cities[i].max_population;
          population = population >= cities[i].total_space ?
                        cities[i].total_space : population;
          if(!i)
            sum[j] = [population, lim_population];
          else{
            sum[j][0] += population;
            sum[j][1] += lim_population;
          }
          if(population < lim_population)
            setClass(cell_ref, 'fine');
          else if(population > lim_population)
            setClass(cell_ref, 'danger');
          else
            setClass(cell_ref, 'full');
          cell_ref.textContent = fix(population) + '/' + fix(lim_population);
          break;
        case 2://time to full population
          if(cities[i].populationFullTime < Infinity){
            var fulltime = new Date(cities[i].populationFullTime);
            var remainingTime = fulltime.valueOf() - now ;

            if(remainingTime / 3600000 <= 0){
              setClass(cell_ref,'full')
            }
            else if(remainingTime / 3600000 <= 5)
              setClass(cell_ref,'danger');
            else{
              setClass(cell_ref,'fine')
            }

            if(remainingTime <= 0)
              remainingTime = 'Full';
            else if(remainingTime < Infinity){
              remainingTime = timeString(remainingTime);
              // cell_ref.title = fulltime.toString();
            }
          }
          else{
            remainingTime = Infinity;
          }

          cell_ref.textContent = remainingTime;
          break;
        case 3://wood
          var deltaTime = (now - cities[i].updatedTime) / 1000;
          var resources_value = cities[i].startResources[0] +
                                cities[i].resourcesDelta[0] * deltaTime;
          if(!i)
            sum[j] = resources_value;
          else
            sum[j] += resources_value;
          cell_ref.textContent = fix(resources_value);
          break;
        case 4:
          break;
        case 5://time to full wood
          if(cities[i].resourcesFullTime[0] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[0]);
            var remainingTime = fulltime.valueOf() - now ;

            if(remainingTime / 3600000 <= 0){
              setClass(cell_ref,'full')
            }
            else if(remainingTime / 3600000 <= 5)
              setClass(cell_ref,'danger');
            else{
              setClass(cell_ref,'fine')
            }

            if(remainingTime <= 0)
              remainingTime = 'Full';
            else {
              remainingTime = timeString(remainingTime);
              // cell_ref.title = fulltime.toString();
            }
          }
          else{
            remainingTime = Infinity;
          }
          cell_ref.textContent = remainingTime;
          break;
        case 6://wine
          var deltaTime = (now - cities[i].updatedTime) / 1000;
          var resources_value = cities[i].startResources[1] +
                                cities[i].resourcesDelta[1] * deltaTime
          if(!isNaN(cities[i].wineSub)){
            resources_value -=
                        Math.floor(cities[i].wineSub *
                          Math.floor((cities[i].wineSubTime + deltaTime) / 1200));
            if(resources_value <= 5 * cities[i].wineAmount){
              cell_ref.style.color = '#CC3300';
            }
          }
          if(!i)
            sum[j] = resources_value;
          else
            sum[j] += resources_value;
          cell_ref.textContent = fix(resources_value);
          break;
        case 7:
          break;
        case 8:
          break;
        case 9://time to full wine or empty
          var fulltime = new Date(cities[i].resourcesFullTime[1]);
          var remainingTime = fulltime.valueOf() - now ;
          if(remainingTime / 3600000 <= 0){
            setClass(cell_ref,'full')
          }
          else if(remainingTime / 3600000 <= 5)
            setClass(cell_ref,'danger');
          else{
            setClass(cell_ref,'fine')
          }
          if(remainingTime <= 0)
            remainingTime = '0';
          else if(remainingTime < Infinity){
            remainingTime = timeString(remainingTime);
          }

          if(1200 * cities[i].resourcesDelta[1] - cities[i].wineSub < 0){
            cell_ref.textContent = "-" + remainingTime;
            // cell_ref.title = "Empty : " + fulltime.toString();
          }
          else{
            cell_ref.textContent = remainingTime;
            // cell_ref.title = "Full : " + fulltime.toString();

          }
          break;
        case 10://marble
          var deltaTime = (now - cities[i].updatedTime) / 1000;
          var resources_value = cities[i].startResources[2] +
                                cities[i].resourcesDelta[2] * deltaTime;
          if(!i)
            sum[j] = resources_value;
          else
            sum[j] += resources_value;
          cell_ref.textContent = fix(resources_value);
          break;
        case 11:
          break;
        case 12://time to full marble
          if(cities[i].resourcesFullTime[2] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[2]);
            var remainingTime = fulltime.valueOf() - now ;

            if(remainingTime / 3600000 <= 0){
              setClass(cell_ref,'full')
            }
            else if(remainingTime / 3600000 <= 5)
              setClass(cell_ref,'danger');
            else{
              setClass(cell_ref,'fine')
            }

            if(remainingTime <= 0)
              remainingTime = 'Full';
            else {
              remainingTime = timeString(remainingTime);
            }
          }
          else{
            remainingTime = Infinity;
          }
          cell_ref.textContent = remainingTime;
          break;
        case 13://crystal
          var deltaTime = (now - cities[i].updatedTime) / 1000;
          var resources_value = cities[i].startResources[3] +
                                cities[i].resourcesDelta[3] * deltaTime;
          if(!i)
            sum[j] = resources_value;
          else
            sum[j] += resources_value;
          cell_ref.textContent = fix(resources_value);
          break;
        case 14:
          break;
        case 15://time to full crystal
          if(cities[i].resourcesFullTime[3] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[3]);
            var remainingTime = fulltime.valueOf() - now ;

            if(remainingTime / 3600000 <= 0){
              setClass(cell_ref,'full')
            }
            else if(remainingTime / 3600000 <= 5)
              setClass(cell_ref,'danger');
            else{
              setClass(cell_ref,'fine')
            }

            if(remainingTime <= 0)
              remainingTime = 'Full';
            else {
              remainingTime = timeString(remainingTime);
            }
          }
          else{
            remainingTime = Infinity;
          }
          cell_ref.textContent = remainingTime;
          break;
        case 16://sulphur
          var deltaTime = (now - cities[i].updatedTime) / 1000;
          var resources_value = cities[i].startResources[4] +
                                cities[i].resourcesDelta[4] * deltaTime;
          if(!i)
            sum[j] = resources_value;
          else
            sum[j] += resources_value;
          cell_ref.textContent = fix(resources_value);
          break;
        case 17:
          break;
        case 18://time to full sulphur
          if(cities[i].resourcesFullTime[4] < Infinity){
            var fulltime = new Date(cities[i].resourcesFullTime[4]);
            var remainingTime = fulltime.valueOf() - now ;

            if(remainingTime / 3600000 <= 0){
              setClass(cell_ref,'full')
            }
            else if(remainingTime / 3600000 <= 5)
              setClass(cell_ref,'danger');
            else{
              setClass(cell_ref,'fine')
            }

            if(remainingTime <= 0)
              remainingTime = 'Full';
            else {
              remainingTime = timeString(remainingTime);
            }
          }
          else{
            remainingTime = Infinity;
          }
          cell_ref.textContent = remainingTime;
          break;
        default:
      }
    }
  }
  var tfoot = obj_overviewTable.tFoot;
  var row_ref = tfoot.rows[0];
  for(var j = 0; j < row_ref.cells.length; j++){
    var cell_ref = row_ref.cells[j];
    switch(j){
      case 0:
        break;
      case 1:
        cell_ref.textContent = fix(sum[j][0]) + '/' + fix(sum[j][1]);
        break;
      case 2:
        break;
      case 3:
        cell_ref.textContent = fix(sum[j]);
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        cell_ref.textContent = fix(sum[j]);
        break;
      case 7:
        break;
      case 8:
        break;
      case 10:
        cell_ref.textContent = fix(sum[j]);
        break;
      case 11:
        break;
      case 12:
        break;
      case 13:
        cell_ref.textContent = fix(sum[j]);
        break;
      case 14:
        break;
      case 15:
        break;
      case 16:
        cell_ref.textContent = fix(sum[j]);
        break;
      case 17:
        break;
      case 18:
        break;
      default:
    }
  }


//refresh building overview table
    for(var i = 0; i < obj_buildingOverViewTable.tBodies[0].rows.length; i++){
      if(cities[i].currentlyBuild != NaN){
        var remainingTime = new Date(cities[i].cityCoundown) - now;

        if(remainingTime > 0){
          obj_buildingOverViewTable.tBodies[0].rows[i].cells[cities[i].currentlyBuild + 1].getElementsByTagName("a")[0].textContent =
            timeString(remainingTime);

        }
      }
    }

}

function createBuildingOverViewTable(){
  var buildingOverViewTable = document.createElement("table");
  var row_ref, cell_ref;
  buildingOverViewTable.id = 'buildingOverViewTable';
  buildingOverViewTable.frame = 'border';
  setClass(buildingOverViewTable);
  var caption = buildingOverViewTable.createCaption();
  caption.textContent = 'Buildings';
  setClass(caption);
  for(var i = 0; i < cities.length ; i++){
    row_ref = buildingOverViewTable.insertRow(-1);
    cell_ref = row_ref.insertCell(-1);

    fillCell(cell_ref,
             "",
             createLink("?view=city&id=" + cities[i].id, cities[i].name)
            );

    for(var j = 0; j < buildingName.length; j++){
      cell_ref = row_ref.insertCell(-1);
      if(cities[i].building_href[j]){
        fillCell(cell_ref,
                 "",
                 createLink(cities[i].building_href[j], cities[i].buildingLevel[j])
                );


        if(j == cities[i].currentlyBuild && cities[i].cityCoundown > Date.now()){
          var endDate = new Date(cities[i].cityCoundown);
          cell_ref.title = "Construction Complete : " + endDate.toString();
          setClass(cell_ref, "currentlyBuild")
        }
      }else{
        cell_ref.textContent = cities[i].buildingLevel[j];
      }
    }
  }
  var thead = buildingOverViewTable.createTHead();
  setClass(thead);
  row_ref = thead.insertRow(-1);
  cell_ref = row_ref.insertCell(-1);
  cell_ref.textContent = "";

  obj_img = document.createElement("img");
  obj_img.src = "skin/layout/icon-city2.gif";
  cell_ref.appendChild(obj_img);




  for(var j = 0; j < buildingName.length; j++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = buildingName[j];
      cell_ref.title = j;
  }
  obj_ikapp_overvoew.appendChild(buildingOverViewTable);
}

function createUnitOverViewTable(){
  var unitOverViewTable = document.createElement("table");
  var row_ref, cell_ref;
  var sum = [];
  unitOverViewTable.id = 'unitOverViewTable';
  unitOverViewTable.frame = 'border';
  setClass(unitOverViewTable);
  var caption = unitOverViewTable.createCaption();
  caption.textContent = 'Units';
  setClass(caption);
  for(var i = 0; i < cities.length ; i++){
    row_ref = unitOverViewTable.insertRow(-1);
    cell_ref = row_ref.insertCell(-1);
    // if(i == currentCity ){
      fillCell(cell_ref,
               "",
               createLink("?view=cityMilitary-army&id=" + cities[i].id, cities[i].name)
              );
    // }else{
      // cell_ref.textContent = cities[i].name;
    // }
    for(var j = 0; j < cities[i].units.length; j++){
      if(cities[i].units[j] == "-")
        sum[j] = cities[i].units[j];
      else{
        if(!i)
          sum[j] = cities[i].units[j];
        else
          sum[j] += cities[i].units[j];
      }
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = cities[i].units[j];
    }
  }
  setClass(unitOverViewTable.tBodies[0]);
  var thead = unitOverViewTable.createTHead();
  setClass(thead);
  row_ref = thead.insertRow(-1);
  cell_ref = row_ref.insertCell(-1);
  cell_ref.textContent = "";
  obj_img = document.createElement("img");
  obj_img.src = "skin/layout/icon-city2.gif";
  cell_ref.appendChild(obj_img);
  for(var j = 0; j < unitName.length; j ++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = unitName[j];
  }
  var tfoot = unitOverViewTable.createTFoot();
  setClass(tfoot);
  row_ref = tfoot.insertRow(-1);
  cell_ref = row_ref.insertCell(-1);
  cell_ref.innerHTML = '&Sigma;';
  for(var j = 0; j < unitName.length; j ++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = sum[j];
  }
  obj_ikapp_overvoew.appendChild(unitOverViewTable);
}

function createShipOverViewTable(){
  var shipOverViewTable = document.createElement("table");
  var row_ref, cell_ref;
  var sum = [];
  shipOverViewTable.id = 'shipOverViewTable';
  shipOverViewTable.frame = 'border';
  setClass(shipOverViewTable);
  var caption = shipOverViewTable.createCaption();
  caption.textContent = 'Ships';
  setClass(caption);
  for(var i = 0; i < cities.length ; i++){
    row_ref = shipOverViewTable.insertRow(-1);
    cell_ref = row_ref.insertCell(-1);
    // if(i == currentCity ){
      fillCell(cell_ref,
               "",
               createLink("?view=cityMilitary-fleet&id=" + cities[i].id, cities[i].name)
              );
    // }else{
      // cell_ref.textContent = cities[i].name;
    // }
    for(var j = 0; j < cities[i].ships.length; j++){
      if(cities[i].ships[j] == "-")
        sum[j] = cities[i].ships[j];
      else{
        if(!i)
          sum[j] = cities[i].ships[j];
        else
          sum[j] += cities[i].ships[j];
      }
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = cities[i].ships[j];
    }
  }
  setClass(shipOverViewTable.tBodies[0]);
  var thead = shipOverViewTable.createTHead();
  setClass(thead);
  row_ref = thead.insertRow(-1);
  cell_ref = row_ref.insertCell(-1);
  cell_ref.textContent = "";
  obj_img = document.createElement("img");
  obj_img.src = "skin/layout/icon-city2.gif";
  cell_ref.appendChild(obj_img);
  for(var j = 0; j < shipName.length; j ++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = shipName[j];
  }
  var tfoot = shipOverViewTable.createTFoot();
  setClass(tfoot);
  row_ref = tfoot.insertRow(-1);
  cell_ref = row_ref.insertCell(-1);
  cell_ref.innerHTML = '&Sigma;';
  for(var j = 0; j < shipName.length; j ++){
      cell_ref = row_ref.insertCell(-1);
      cell_ref.textContent = sum[j];
  }
  obj_ikapp_overvoew.appendChild(shipOverViewTable);
}//********************GotoList**************************

function createGotoList(){
  if(document.getElementById("GF_toolbar")){
  	var obj_GF_toolbar = document.getElementById("GF_toolbar");
  	var ul = obj_GF_toolbar.getElementsByTagName("ul")[0];
  	var li=ul.getElementsByClassName("version")[0];
  	var s =
  '<select onchange="document.location.href=this.options[this.selectedIndex].value">';
  	s += '<option>Go to ...</option>';
  	for(var i=0; i<cities[currentCity].pos_label.length; i++){
  		s += '<option value="' + decodeURIComponent(cities[currentCity].pos_href[i]) + '">' +
            decodeURIComponent(cities[currentCity].pos_label[i]) + '</option>';
  	}
  	li.innerHTML += s + '</select>';
  }
}

var obj_ikapp_overvoew = document.createElement("div");
//obj_ikapp_overvoew.style.width = "1000px";
document.getElementById('container').appendChild(obj_ikapp_overvoew);
saveCityData();
loadCityData();
// createGotoList()
createOverviewTable();
createBuildingOverViewTable()
createUnitOverViewTable()
createShipOverViewTable()
setInterval(refreshOverviewTable,1000);

//*******************************Show Island Features***************************
function showIslandFeatures(){
  var obj_islandfeatures = document.getElementById("islandfeatures");
  if(obj_islandfeatures){
    var islandfeatures = document.evaluate("//ul[@id='islandfeatures']/li",
                                        document,
                                        null,
                                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                        null);
    var island_label = document.evaluate("//div[@id='breadcrumbs']/span[@class='island']",
                                         document,
                                         null,
                                         XPathResult.FIRST_ORDERED_NODE_TYPE,
                                         null);
    var re = /\slevel(\d+)/;
    var str = "";
    for(var i = 0; i < 2; i++){
      var label = islandfeatures.snapshotItem(i).
                    getElementsByTagName("a")[0].title;
      var level = islandfeatures.snapshotItem(i).className.match(re)[1];
      str += " | " + label + "(" + level + ")";
    }
    island_label.singleNodeValue.textContent += str;
  }
}
showIslandFeatures();
//*********************Schedule***********
function command(todo, parameter){
  var str = "";
  switch(todo){
    case "upgradeBuilding":
      var index_of_city = parameter[0];
      var index_of_building = parameter[1];

      str =  "?action=CityScreen&function=upgradeBuilding" +
                               cities[index_of_city].building_href[index_of_building].replace("?view", "&oldView") +
                               "&level=" + cities[index_of_city].buildingLevel[index_of_building];
      return str;
    case "assignWinePerTick":
      var index_of_city = parameter[0];
      str = "?action=CityScreen&function=assignWinePerTick" +
            cities[index_of_city].building_href[8].substr(cities[index_of_city].building_href[8].indexOf("&")) +
            "&amount=" + parameter[1];
      return str;
    case "build":
      var index_of_city = parameter[0];
      str = "?action=CityScreen&function=build" +
            "&id=" + cities[index_of_city].id +
            "&building=" + parameter[1] +
            "&position=" + parameter[2];
      return str;
    case "changeCurrentCity":
      var oldview = ["city", "island", "merchantNavy"];
      var index_of_city = parameter[0];
      var index_of_oldview = parameter[1];
      str = "?action=CityScreen&function=build" +
            "&cityId=" + cities[index_of_city].id +
            "&oldView=" + oldview[index_of_oldview];
      return str;
    default:
  }
}

var todo = [];

todo.sort(c);



function c(a, b){
	return a[0].valueOf() - b[0].valueOf();
}

function schedule(){
  if(todo.length){
  	var deltaT = Date.now() - todo[0][0];

  	if(deltaT >= 0 && deltaT < 1000)
      document.location.href = todo[0][1];
  	else if(deltaT > 1000)
  		todo.shift();
  }
}
setInterval(schedule,1000)
//**************************time of arrival countdown****************
function anti_FormatedDate(str){
  var re=/(\d+)\.(\d+).(\d+)\s(\d+):(\d+):(\d+)/;
  s = str.match(re);
  var time = new Date(s[3], parseInt(s[2], 10) - 1, s[1], s[4], s[5], s[6]);
  return time.valueOf();
}

function countdown_merchantNavy(){
  var X = document.evaluate("//body[@id='merchantNavy']//table[@class='table01']/tbody/tr[position() > 1]/td[position() = 5 or position() = 6]",
                            document,
                            null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                            null);
  var now = anti_FormatedDate(document.getElementById("servertime").textContent);

  for(var i = 0; i < X.snapshotLength; i++){
    if(!X.snapshotItem(i).title){
      X.snapshotItem(i).title = X.snapshotItem(i).textContent;
      X.snapshotItem(i).textContent = timeString(anti_FormatedDate(X.snapshotItem(i).textContent) - now);
    }
    else{
      X.snapshotItem(i).textContent = timeString(anti_FormatedDate(X.snapshotItem(i).title) - now);
    }
  }
}

if(document.getElementById("merchantNavy")){
  setInterval(countdown_merchantNavy, 1000)
}


//**************anti-Ikariam+**********
function anti_ikap(){
  var obj_link_plusteaser = document.evaluate("//div[@id='advisors']//a[@class='plusteaser']",
                                              document,
                                              null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                              null);
  for(var i = 0; i < obj_link_plusteaser.snapshotLength; i++){
      obj_link_plusteaser.snapshotItem(i).parentNode.removeChild(obj_link_plusteaser.snapshotItem(i));
  }

  if(document.getElementById("viewResearchImperium")){
    document.getElementById("viewResearchImperium").parentNode.removeChild(document.getElementById("viewResearchImperium"));
  }

  if(document.getElementById("viewMilitaryImperium")){
    document.getElementById("viewMilitaryImperium").parentNode.removeChild(document.getElementById("viewMilitaryImperium"));
  }

  if(document.getElementById("viewDiplomacyImperium")){
    document.getElementById("viewDiplomacyImperium").parentNode.removeChild(document.getElementById("viewDiplomacyImperium"));
  }

  if(document.getElementById("viewCityImperium")){
    document.getElementById("viewCityImperium").parentNode.removeChild(document.getElementById("viewCityImperium"));
  }
}

anti_ikap()
//************reload**********
//************inspect***********
function inspectEnemy(){
  var target = "";
}
//**********************fix*********************
