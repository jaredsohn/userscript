// ==UserScript==
// @name           Ikariam++ v0.2.6.004
// @namespace      icenuclear@yahoo.com.tw
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==



var	currentCity;
var currentTradegood;

var cities = [];


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
  var re = new RegExp(thousandSeperator,'g')
  numberString = numberString.replace(re,'');
  numberString = numberString.replace(decimalPoint, '.');
  return parseFloat(numberString);

}

function population_to_full(totalSatisfaction, max_population, total_space){
  if(max_population <= total_space)
    return Infinity;
  else
    return Math.log(totalSatisfaction / (max_population - total_space))*50*3600000;

}

function city(){
  this.name = null;
  this.id = null;
  this.islandId = null;
  this.updatedTime = null;
  this.tradegood = null;
  this.startResources = [];
  this.resourcesDelta = [];
  this.resourcesStorage = [];
  this.resourcesFullTime = [];
  
  this.wineSub = null;
  this.wineSubTime = null;
  this.wineAmount = null;
  
  this.totalSatisfaction = null;
  this.max_population = null;
  this.total_space = null;
  this.populationUpdatedTime = null;
  this.populationFullTime = [];

  // this.totalSpace = null;
  // this.occupiedSpace = null;



  this.pos_label = [];
  this.pos_href = [];

}

function saveCityData(){
  var startResources = [0, 0, 0, 0, 0];
  var resourcesDelta = [0, 0, 0, 0, 0];
  var resourcesStorage = [null, null, null, null, null];
  var resourcesFullTime = [Infinity, Infinity, Infinity, Infinity, Infinity];

  var obj_citySelect = document.getElementById("citySelect");
  currentCity = obj_citySelect.selectedIndex;
  currentTradegood = getTradegoodKind();
  
//saving updated time
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "updatedTime=unsafeWindow.startTime");
//saving the name, tradegood and id of cities
  for(var i=0; i<obj_citySelect.options.length; i++){
    eval("unsafeWindow.globalStorage[document.location.host].city" + i +
         "name=obj_citySelect.options[i].text + ' ('+ obj_citySelect.options[i].title + ')'");
    eval("unsafeWindow.globalStorage[document.location.host].city" + i +
         "id=obj_citySelect.options[i].value");
  }

       
       
       
//saving the trade good
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "tradegood=currentTradegood");
//saving start resources
  startResources[0] = unsafeWindow.startResources;
  startResources[1] = anti_number_format(document.getElementById("value_wine").textContent);
  startResources[2] = anti_number_format(document.getElementById("value_marble").textContent);
  startResources[3] = anti_number_format(document.getElementById("value_crystal").textContent);
  startResources[4] = anti_number_format(document.getElementById("value_sulfur").textContent);
  startResources[currentTradegood] = unsafeWindow.startTradegood;
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "startResources=startResources");
//saving resources delta
  resourcesDelta[0] = unsafeWindow.startResourcesDelta;
  resourcesDelta[currentTradegood] = unsafeWindow.startTradegoodDelta;
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "resourcesDelta=resourcesDelta");


//saving storage capacity of resources
  resourcesStorage[0] = unsafeWindow.resourcesStorage;
  resourcesStorage[currentTradegood] = unsafeWindow.tradegoodStorage;

  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "resourcesStorage=resourcesStorage");
//saving the time of resources to full
  resourcesFullTime[0] = unsafeWindow.startTime +
                         1000 * (resourcesStorage[0] - startResources[0]) / resourcesDelta[0];
  resourcesFullTime[currentTradegood] = unsafeWindow.startTime +
                         1000 * (resourcesStorage[currentTradegood] -
                              startResources[currentTradegood]
                             ) / resourcesDelta[currentTradegood];
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "resourcesFullTime=resourcesFullTime");


//saving wineSubTime 
  eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "wineSubTime=unsafeWindow.tradegoodSubTime ");
//saving wineSub
  if(currentTradegood == 1){
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "wineSub=unsafeWindow.tradegoodSub ");
  }
  
  
//updating when visiting Tavern
  if(document.getElementById("wineAmount")){

    var obj_wineAmount = document.getElementById('wineAmount');
    var wineAmount = parseInt(obj_wineAmount.
                                options[obj_wineAmount.selectedIndex].text);

    var totalSatisfaction = parseFloat(document.getElementById('serve').
                                         nextSibling.nextSibling.
                                           textContent.substr(69)
                                      );
    var max_population = parseInt(eval("unsafeWindow.globalStorage[document.location.host].city" +
                                       currentCity + "max_population"));
    var total_space = parseInt(eval("unsafeWindow.globalStorage[document.location.host].city" +
                                    currentCity + "total_space"));
    var populationFullTime = unsafeWindow.startTime +
          population_to_full(totalSatisfaction, max_population, total_space);

    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "totalSatisfaction=totalSatisfaction");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "populationUpdatedTime=unsafeWindow.startTime");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "populationFullTime=populationFullTime");


    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "wineSub=obj_wineAmount.selectedIndex");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "wineAmount=wineAmount");


  }
  

//updating when visiting Town Hall
  if(document.getElementById("CityOverview")){
  	var obj_CityOverview=document.getElementById("CityOverview");
  	var obj_SatisfactionOverview=document.getElementById("SatisfactionOverview");

  	var obj_positives = obj_SatisfactionOverview.getElementsByClassName("positives")[0].
                          getElementsByClassName("value");
  	var obj_negatives = obj_SatisfactionOverview.getElementsByClassName("negatives")[0].
                          getElementsByClassName("value");

    var value_inhabitants = document.getElementById('value_inhabitants').textContent;
    var _value_inhabitants = value_inhabitants.substring(
                               value_inhabitants.indexOf('(')+1);
  	var total_space =
          parseInt(obj_CityOverview.getElementsByClassName("value total")[0].textContent);
  	var occupied_space = parseInt(obj_CityOverview.
                                    getElementsByClassName("value occupied")[0].textContent);
  	var inhabitants = anti_number_format(_value_inhabitants);


    var P = 0;//sum of all positives
  	var N = 0;//sum of all negatives

  	for(var i = 0; i < obj_positives.length; i++)
  		P += parseInt(obj_positives[i].textContent);
  	for(var i = 0; i < obj_negatives.length; i++)
  		N += parseInt(obj_negatives[i].textContent);

  	var totalSatisfaction = P + N ; 
    totalSatisfaction = inhabitants > occupied_space ?
                        totalSatisfaction - .5 : totalSatisfaction//Total satisfaction

    var max_population = P + N + occupied_space;
    var populationFullTime = unsafeWindow.startTime +
          population_to_full(totalSatisfaction, max_population, total_space);

    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "totalSatisfaction=totalSatisfaction");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "max_population=max_population");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "total_space=total_space");
       
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
         "populationUpdatedTime=unsafeWindow.startTime");
       
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "populationFullTime=populationFullTime");
  }
//updating when viewing City
  if(document.getElementById('locations')){
    var obj_locations = document.getElementById('locations');
    var pos_href = []
    var pos_label = [];

    for(var i = 0; i < obj_locations.getElementsByTagName('li').length; i++){
      pos_href.push(encodeURIComponent(document.getElementById('position' + i).
                      getElementsByTagName('a')[0].href));
      pos_label.push(encodeURIComponent(document.getElementById('position' + i).
                       getElementsByTagName('a')[0].text.substr(0,30)));
    }

    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "pos_href=pos_href");
    eval("unsafeWindow.globalStorage[document.location.host].city" + currentCity +
       "pos_label=pos_label");
  }

}

function loadCityData(){

  for(var i=0 ; i < document.getElementById("citySelect").options.length; i++){
    cities[i] = new city();
    for(var p  in cities[i]){
      try{
        cities[i][p] = eval("unsafeWindow.globalStorage[document.location.host].city" + i + p);
        cities[i][p] = cities[i][p].toString().split(',');
//if(cities[i][p].length == 1) alert(cities[i][p])

        if(cities[i][p].length > 1){
          for(var j =0; j < cities[i][p].length; j++){
            cities[i][p][j] = isNaN(parseFloat(cities[i][p][j])) ?
                           cities[i][p][j] : parseFloat(cities[i][p][j]);
          }
        } else{
          cities[i][p] = isNaN(parseFloat(cities[i][p][0])) ?
                         cities[i][p][0] : parseFloat(cities[i][p][0]);
        }
        

      } catch(e){}
    }

  }
}

function showAllCityData(){
  var extraDiv4=document.getElementById('extraDiv4')
  
  var s='';
  for(var i=0 ; i < cities.length; i++){
    for(var p  in cities[i]){
      try{
        s += 'cities['+i+'].' + p + ' = ' +cities[i][p] +'<br />';
      } catch(e){}
    }
s+="<p>---------------------------------------------------------</p>"
  }
  extraDiv4.innerHTML += s;

}

function newTable(id, cell_txt){
  var tb = document.createElement("table");
  tb.id = id;
  tb.width = '100%';
  var tBody = document.createElement("tbody");
  
  for(var i = 0; i < cell_txt.length; i++){
    var row = document.createElement("tr");
    for(var j = 0; j < cell_txt[i].length; j++){
      var cell = document.createElement("td");
      cell.style.border = '1px solid';
      var cellText = document.createTextNode(cell_txt[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tBody.appendChild(row);
  }
  tb.appendChild(tBody)
  return tb;

}


function fix(num){
  return isNaN(num) ? NaN : num.toFixed(1);
}


function createOverviewTable(){
  var tmp = [];
	var obj_cityResources = document.getElementById("cityResources");
  tmp.push('');
  tmp.push(obj_cityResources.getElementsByClassName("population")[0].title);
	tmp.push(obj_cityResources.getElementsByClassName("wood")[0].title);
	tmp.push(obj_cityResources.getElementsByClassName("wine")[0].title);
	tmp.push(obj_cityResources.getElementsByClassName("marble")[0].title);
	tmp.push(obj_cityResources.getElementsByClassName("glass")[0].title);
	tmp.push(obj_cityResources.getElementsByClassName("sulfur")[0].title);
  
  var obj_overviewTable = newTable('overviewTable',[tmp,['','','','','','','']]);

 
  
//
  for(var i = 0; i < obj_overviewTable.rows[0].cells.length; i++){
    switch(i){
      case 0://city name
        tmp = [];
        for(var j=0;j<cities.length;j++){
          tmp.push([cities[j].name]);
        }
        tmp.push(['']);
        obj_overviewTable.rows[1].cells[i].appendChild(newTable('tb'+i,tmp));
        break;
      case 1://population
        tmp = [];
        for(var j=0;j<cities.length;j++){
          var population = -cities[j].totalSatisfaction *
                Math.exp(-.02 * (Date.now() - cities[j].populationUpdatedTime)/3600000) +
                cities[j].max_population;
          var remainTime = (cities[j].populationFullTime - Date.now()) / 3600000;
          population = population >= cities[j].total_space ?
                       cities[j].total_space : population;

          if(remainTime <= 0)
            remainTime = '0 h';
          else if(remainTime < Infinity)
            remainTime = fix(remainTime) + 'h'
          
          tmp.push([fix(population), remainTime]);
        }
        obj_overviewTable.rows[1].cells[i].appendChild(newTable('tb'+i,tmp));
      
        break;
      case 2:
      case 4:
      case 5:
      case 6:
        tmp = [];
        for(var j=0;j<cities.length;j++){
          var deltaTime = (Date.now() - cities[j].updatedTime) /1000;
        
          var remainTime = (cities[j].resourcesFullTime[i-2] - Date.now()) / 3600000;
          
          if(remainTime <= 0)
            remainTime = '0 h';
          else if(remainTime < Infinity)
            remainTime = fix(remainTime) + 'h'
          
          tmp.push([fix(cities[j].startResources[i-2] +
                    cities[j].resourcesDelta[i-2]*deltaTime),
                    fix(cities[j].resourcesDelta[i-2] * 3600),
                    remainTime]);
        }
        tmp.push(['']);
        obj_overviewTable.rows[1].cells[i].appendChild(newTable('tb'+i,tmp));

        break;
      case 3:
        tmp = [];
        for(var j=0;j<cities.length;j++){
          tmp.push([fix(cities[j].startResources[i-2]),
                   fix(cities[j].resourcesDelta[i-2] * 3600),
                   -fix(cities[j].wineAmount)]);
        }
        tmp.push(['']);
        obj_overviewTable.rows[1].cells[i].appendChild(newTable('tb'+i,tmp));
      
        break;

      default:

      
    
    }
  }





  return obj_overviewTable;

}

function refresh(){
  document.getElementById('extraDiv3').innerHTML = '';
  document.getElementById('extraDiv3').appendChild(createOverviewTable())
}

saveCityData();
loadCityData();
setInterval(refresh,1000);
//showAllCityData();


//*********************Schedule***********

var todo = [];




todo.sort(c);

function c(a, b){
	return a[0].valueOf() - b[0].valueOf();
}

function schedule(){
	var deltaT = Date.now() - todo[0][0];
	if(deltaT >= 0 && deltaT < 1000){
		unsafeWindow.Dom.get('upgradeForm').submit();
		todo.shift();
	}
	else if(-deltaT >= 2*60000 && -deltaT < 2*60000+1000){
		document.location.href = todo[0][1];
	}
	else if(deltaT > 1000){
		todo.shift();
	}
}
setInterval(schedule,1000)
//**********************************************

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

createGotoList()