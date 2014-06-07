// ==UserScript==
// @name               FateTools
// @namespace          FateTools
// @description        Various user interface enhancements for the Astro Empires MMOG (www.astroempires.com)
// @include            http:// epsilon.astroempires.com/*
// @exclude            http://forum.astroempires.com/*
// @exclude            http://wiki.astroempires.com/*
// @exclude        *.astroempires.com/home.aspx*
// @exclude        *.astroempires.com/login.aspx*
// @exclude         *.astroempires.com/account.aspx*
// ==/UserScript==

var scriptVersion='AUG15-2009';

var _server = window.location.href.split('.')[0].split('/')[2];
var numberReminders = 1;
var galaxyInfoArrays = new Array();
var tradeNames = new Array();

/*
============================
Base Structures Presets
============================
*/
var DEFAULT_BASE_PRESET_1 = "0,0,0,0,0,0,20,10,15,20,5,20,0,10,5,10,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3";
var DEFAULT_BASE_PRESET_2 = "0,0,0,0,0,0,26,0,20,26,6,20,0,10,5,5,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3";
var DEFAULT_BASE_PRESET_3 = "0,0,0,0,0,27,20,0,15,20,4,20,0,10,5,5,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,2,3";
var DEFAULT_BASE_PRESET_4 = "0,0,0,0,0,0,20,0,15,20,4,20,10,10,5,5,0,0,0,10,0,0,-1,0,0,0,0,0,0,0,0,2,5";
var DEFAULT_BASE_PRESET_5 = "0,0,0,0,0,0,22,0,17,22,5,20,10,10,5,5,0,0,0,0,0,6,-1,0,0,0,0,0,0,0,0,2,5";

/*
==============================
-----Production Preset--------
==============================
*/
var PRESET_KEYS = ["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Recycler","Destroyer","Frigate","Ion Frigate","Scout Ship", "Outpost Ship","Cruiser","Carrier","Heavy Cruiser","Battleship","Fleet Carrier","Dreadnought","Titan","Leviathan","Death Star","Goods"];
var DEFAULT_PRESET_1 = "500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_2 = "50,0,0,0,20,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_3 = "60,0,0,0,0,0,0,0,0,0,0,8,0,4,0,0,0,0,0,0,0";
var DEFAULT_PRESET_4 = "120,0,0,0,0,0,0,0,0,0,0,16,0,8,0,0,0,0,0,0,0";
var DEFAULT_PRESET_5 = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_6 = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_7 = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_8 = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";
var DEFAULT_PRESET_NAME = ["Fighters","Light Fleet","Heavy Fleet","Double Heavy Fleet",'','','','']

/*
================================
---------Fleet Screen-----------
================================
*/
var FT_INDEX = 0;
var BO_INDEX = 1;
var HB_INDEX = 2;
var IB_INDEX = 3;
var CV_INDEX = 4;
var RC_INDEX = 5;
var DE_INDEX = 6;
var FR_INDEX = 7;
var IF_INDEX = 8;
var SS_INDEX = 9;
var OS_INDEX = 10;
var CR_INDEX = 11;
var CA_INDEX = 12;
var HC_INDEX = 13;
var BC_INDEX = 14;
var FC_INDEX = 15;
var DN_INDEX = 16;
var TI_INDEX = 17;
var LE_INDEX = 18;
var DS_INDEX = 19;
var BARRACKS_INDEX = 20;
var LASER_TURRETS_INDEX = 21;
var MISSLE_TURRETS_INDEX = 22;
var PLASMA_TURRENTS_INDEX = 23;
var ION_TURRETS_INDEX = 24;
var PHOTON_TURRETS_INDEX = 25;
var DISRUPTOR_TURRETS_INDEX = 26;
var DEFLECTION_SHIELDS_INDEX = 27;
var PLANETARY_SHIELD_INDEX = 28;
var PLANETARY_RING_INDEX = 29;
var fightingShips = "11111011100101101111";
var shipValues = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];

/*
====================================
---------Common Functions-----------
====================================
*/
function getPlayerName(name){
    var regex = /(\[.*?\])(.*)/;
    result = regex.exec(name);
    if(result != null)
    return result[2].substring(1);
    else
    return name;
}
function getGuild(name){
    var regex = /\[.*?\]/;
    result = regex.exec(name);
    if(result)
    return result[0];
    else return name;
}

function getView(){
    var view = window.location.href.split("view=",2);
    if(view.length<=1) return "";
    view = view[1].split("&")[0];
    view = view.substring(0,1).toUpperCase() + view.substring(1);
    return view;
}

function insertConfigLink(){
    var logoutLink = document.evaluate("//a[contains(.,'Logout')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(!logoutLink) return;
    var configLink = document.createElement("a");
    configLink.setAttribute("href",window.location.href + ((window.location.href.indexOf("?")!=-1)?"&":"?") + "config=1");
    configLink.innerHTML = "Tools";
    logoutLink.parentNode.insertBefore(configLink,logoutLink);
    logoutLink.parentNode.innerHTML = logoutLink.parentNode.innerHTML.replace("Tools</a>","Tools </a> - <a href='http://www.epsilonfate.freeforums.org/' target='_blank'>Fate Forum</a> - ");
    var link = document.evaluate("//a[contains(.,'Links')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(!link) return;
    link.href="http://fate2.webability.biz";
    link.innerHTML="Intelligence Bunker";
    link.target="_blank";
}

function formatScanners(){
 var sizes;
 if(document.getElementById('coded_scanners')) sizes = document.getElementById('coded_scanners').firstChild.firstChild.childNodes;
 else if(document.evaluate(
    "//table[@class='layout listing']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue) sizes = document.evaluate(
    "//table[@class='layout listing']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue.firstChild.childNodes;
 else return;
 var total = 0;
 for(var i=1;i<sizes.length;i++){
   total += parseInt(sizes[i].childNodes[4].firstChild.innerHTML);
   sizes[i].childNodes[4].firstChild.innerHTML = commaFormat(sizes[i].childNodes[4].firstChild.innerHTML);
 }
 var tr = document.createElement('tr');
 var td = document.createElement('td');
 td.setAttribute("colspan","4");
 td.setAttribute("align","right");
 td.innerHTML = "<br>Total fleet moving in your base regions:";
 tr.appendChild(td);
 td = document.createElement('td');
 td.setAttribute("align","center");
 td.innerHTML = "<br>"+commaFormat(total);
 tr.appendChild(td);
 sizes[0].parentNode.appendChild(tr);
}

function getSetting(key,defaultValue){return GM_getValue(_server+"_"+key,defaultValue)}
function setSetting(key,value){return GM_setValue(_server+"_"+key,value)}

function zeroPad(n){
  if(n <= 9) return "0"+n;
  return n;
}

function formatVariousNumbers(){
    
	var debrisElement = document.evaluate(
    "//center[contains(text(),'Debris')]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if(debrisElement !=null)
    {
        var debrisMessage = debrisElement.textContent;
        var indexOfText = debrisMessage.indexOf(" credits");
        var valueText = debrisMessage.substring(0,indexOfText);
        var value = commaFormat(parseInt(valueText));
        debrisElement.textContent = debrisElement.textContent.replace(valueText,value.toString());
    }
	
	/*regex = />(\d*?)</ig;
	var source = document.body.innerHTML, result;
	
	do{
	 	result = regex.exec(source);
   if(result){
	 	 	if(result[1] != "") document.body.innerHTML = document.body.innerHTML.replace(result[1],commaFormat(result[1]));
	 	}
	}
	while(result)
	*/
}

function commaFormat(amount){
	var delimiter = unescape(getSetting('config_numberDelimeter',","));
 amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) return '';
	var minus = '';
	if(i < 0) minus = '-';
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

function getDateObject(dateString){ //31-05-2009 4:37:00
	var regex = /(\d+)-(\d+)-(\d+)+\W(\d+):(\d+):(\d+)/;
	var result = regex.exec(dateString);
	if(result)	return new Date(result[3],(result[2]-1),result[1],result[4],result[5],result[6]); //year,month,day,hr,min,sec
	else throw "Invalid arrival input. Ensure arrival time is in the following format. MM-DD-YYYY HH:MM:SS";
}

function getCurrentServerTime(){
	var regex = /<small>Server time: ((\d+)-(\d+)-(\d)+\W(\d+):(\d+):(\d+))<\/small>/;
 var source = document.body.innerHTML;
 var result = regex.exec(source);
 if(result) return result;
	else return "";
}

function getDateString(date){ //15-05-2008 4:37:00
	return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+zeroPad(date.getHours())+":"+zeroPad(date.getMinutes())+":"+zeroPad(date.getSeconds());
}

function poorTradesChanged(){
    var isChecked = document.getElementById('config_highlightPoorTrades').checked;
    document.getElementById('config_poorTradeUpperThreshold').disabled = !isChecked;
    document.getElementById('config_poorTradeLowerThreshold').disabled = !isChecked;
}

var tFunction = function t(){
 for(n=1;n<=unsafeWindow.q+numberReminders;n++){
	  elem=document.getElementById('time'+n);
	  s=elem.title;
	  m=0;h=0;
	  if(s<=0) elem.innerHTML="-";
	  else{
	    if(s>59){ m=Math.floor(s/60); s=s-m*60 }
	    if(m>59){ h=Math.floor(m/60); m=m-h*60 }
	    if(s<10) s="0"+s;
	    if(m<10) m="0"+m;
		   elem.innerHTML=h+":"+m+":"+s;
	  }
	  elem.title-=1;
 }
 window.setTimeout("t();",1000);
};

function localTFunction(){
	elem=document.getElementById('time1');
	s=elem.title;
	m=0;h=0;
	if(s<=0) elem.innerHTML="-";
	else{
		 if(s>59){ m=Math.floor(s/60); s=s-m*60 }
	 	if(m>59){ h=Math.floor(m/60); m=m-h*60 }
	 	if(s<10){ s="0"+s }
	 	if(m<10){ m="0"+m }
			elem.innerHTML=h+":"+m+":"+s;
	 	elem.title-=1;
	 	window.setTimeout(localTFunction,1000);
	}
}

/************************
 Shorten Page Titles
************************/
function adjustTitles(){
	var view = getView();
 if(view != "") document.title = _server + " - " + view;
 else document.title = document.title.replace("Astro Empires - ",_server+" - ");
}

/****************
 Remove Adds
****************/
function removeAdds(){
 document.getElementById('advertising').previousSibling.style.marginBottom='-14px';
 document.getElementById('advertising').parentNode.removeChild(document.getElementById('advertising'));
 if(window.location.href.indexOf('board.aspx')!=-1) document.getElementsByTagName('iframe')[0].parentNode.removeChild(document.getElementsByTagName('iframe')[0]);
}

/************************
 Add Local Times and time offset
************************/
function addLocalTime(){
 var L = new Date();
 var S = getDateObject(getCurrentServerTime()[1]);
 var s = document.evaluate(
		  ".//small[contains(.,'Server time:')]",
		  document,
		  null,
		  XPathResult.FIRST_ORDERED_NODE_TYPE,
		  null).singleNodeValue;
 var a=min=sec=0;
 sec = parseInt((L.getTime()-S.getTime())/1000) - (Math.round((L.getTime()-S.getTime())/3600000) * 3600) -1;
 if(sec>0) a='+';
 else if(sec<0) a='-';
 sec = Math.abs(sec);
 if(a!=0){
   while(sec>59){
     min++;
     sec-=60;
   }
   a='<small>Clock Offset:</small> <span style="font:900 14px arial;">'+a+'</span>';
   if(min!=0) min='<b> '+min+'</b> <small>min</small> :'; else min = '';
   if(sec!=0) sec='<b> '+sec+'</b> <small>sec</small>'; else sec='';
 }
 var c = document.createElement('table');
 c.setAttribute('style','background:#102840 none;border:0;text-align:center;width:850px;position:relative;top:5px;color:#BBD0FF;');
 c.appendChild(document.createElement('tr'));
 var e = document.createElement('td');
 e.innerHTML = s.innerHTML;
 e.innerHTML = e.innerHTML.replace('Server time:','<small>Server time:</small>');
 c.firstChild.appendChild(e);
 if(Math.round((L.getTime()-S.getTime())/3600000)!=0){
   e = document.createElement('td');
   e.innerHTML = "<small>TZ:</small><b> "+Math.round((L.getTime()-S.getTime())/3600000)+"</b> <small>hrs</small>";
   c.firstChild.appendChild(e);
 }
 if(a!=0){
   e = document.createElement('td');
   e.innerHTML = a+min+sec;
   c.firstChild.appendChild(e);
 }
 e = document.createElement('td');
 e.innerHTML = "<small>Local time:</small> "+getDateString(L);
 c.firstChild.appendChild(e);
 s.parentNode.appendChild(c);
 s.parentNode.removeChild(s);
}

/***********************
 Adjust Max Width
***********************/
function adjustMaxWidth(){
 var t = document.getElementsByTagName('table');
 for(var i=0;i<t.length;i++){
   if(t[i].width=='1000') t[i].width='96%';
 }
}

/**********************************
 Inserts Empire menu on all pages
**********************************/
function insertEmpireMenu(){
 var t = document.evaluate(
   "//table[@class='top']",
   document,
   null,
   XPathResult.FIRST_ORDERED_NODE_TYPE,
   null).singleNodeValue;
 if(!t) return;
 var empireMenu = document.createElement('table');
 empireMenu.setAttribute('id','empire_menu');
 empireMenu.setAttribute('style','margin:0 auto;width:'+t.getAttribute("width")+';height:25px;');
 empireMenu.setAttribute('class','header');
 empireMenu.innerHTML = '<tr><th id="bases_events"><a href="empire.aspx?view=bases_events">Events</a></th><th id="bases_capacities"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th id="economy"><a href="empire.aspx?view=economy">Economy</a></th><th id="trade"><a href="empire.aspx?view=trade">Trade</a></th><th id="structures"><a href="empire.aspx?view=structures">Structures</a></th><th id="fleets"><a href="empire.aspx?view=fleets">Fleets</a></th><th id="units"><a href="empire.aspx?view=units">Units</a></th><th id="technologies"><a href="empire.aspx?view=technologies">Technologies</a></th><th id="scanners"><a href="empire.aspx?ch=1&view=scanners">Scanners</a></th></tr>';
 t.parentNode.insertBefore(empireMenu,t.nextSibling);
 t.parentNode.insertBefore(document.createElement('br'),empireMenu);
}

/************************
 Enhanced count down timers
************************/
function addFinishTimes(singleLine){
  var id, time, date, day = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
  var now = new Date(), future = new Date();
  var separator = singleLine? " ":"<br>";
  var td_list = document.getElementsByTagName('td');
  for(var i = 0; i < td_list.length; i++){
    var style = "font-size:8pt";
    if(td_list[i].id.indexOf('time') != -1 && parseInt(td_list[i].title) >= 0){
      id = td_list[i].id;
      time = td_list[i].title;
      future.setTime(now.getTime() + (time * 1000));
      if(future.getDate() == now.getDate() && future.getMonth() == now.getMonth() && future.getYear() == now.getYear()){
        date = "";
        style = style+";color:"+unescape(getSetting('config_highlightTodayColor',"#9999FF"));
      }
      else if(future.getDate() - now.getDate() == 1 && !singleLine){
        date = "Tomorrow @ ";
      }
      else{
        date = day[future.getDay()] + " " + future.getDate() + " @ ";
      }
      if(getSetting('config_24hourDisplay',false)) {
        date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds());
      }
      else{
        if(future.getHours() >= 12){
          if(future.getHours() > 12) future.setHours(future.getHours()-12);
          date += (future.getHours()) + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " pm";
        }
        else{
          if(future.getHours() ==0) future.setHours(12);
          date += future.getHours() + ":" + zeroPad(future.getMinutes()) + ":" + zeroPad(future.getSeconds()) + " am";
        }
      }
      td_list[i].id = "checked";
      td_list[i].innerHTML = '<span id="' + id + '" title="' + time + '" style="font-size:8pt">-</span>'+separator+'<span style="'+style+'">' + date + '</span>';
    }
  }
  if (window.location.href.indexOf("fleet.aspx")!=-1 && (window.location.href.indexOf("?")==-1 || window.location.href.indexOf('gal=') != -1) && getSetting('config_addFleetMoveShortcut',"true")){
    var rows = document.getElementsByTagName('tr');
    for(i=9;i<rows.length;i++){
      if(rows[i].childNodes[3] && rows[i].childNodes[3].innerHTML=='') rows[i].childNodes[2].innerHTML='<a style="font-size:8pt;" href="'+rows[i].firstChild.firstChild.href+'&view=move">Move</a>';
      if(rows[i].childNodes[4]) rows[i].childNodes[4].innerHTML = commaFormat(rows[i].childNodes[4].innerHTML);
    }
  }
}

/*
==========================================
---------Fleet Screen Utilities-----------
==========================================
*/
function getShipIndex(shipName){
 switch(shipName){
   case "Fighters":{return FT_INDEX;}
   case "Bombers":{return BO_INDEX;}
   case "Heavy Bombers":{return HB_INDEX;}
   case "Ion Bombers":{return IB_INDEX;}
   case "Corvette":{return CV_INDEX;}
   case "Recycler":{return RC_INDEX;}
   case "Destroyer":{return DE_INDEX;}
   case "Frigate":{return FR_INDEX;}
   case "Ion Frigate":{return IF_INDEX;}
   case "Scout Ship":{return SS_INDEX;}
   case "Outpost Ship":{return OS_INDEX;}
   case "Cruiser":{return CR_INDEX;}
   case "Carrier":{return CA_INDEX;}
   case "Heavy Cruiser":{return HC_INDEX;}
   case "Battleship":{return BC_INDEX;}
   case "Fleet Carrier":{return FC_INDEX;}
   case "Dreadnought":{return DN_INDEX;}
   case "Titan":{return TI_INDEX;}
   case "Leviathan":{return LE_INDEX;}
   case "Death Star":{return DS_INDEX;}
   case "Barracks":{return BARRACKS_INDEX;}
   case "Laser Turrets":{return LASER_TURRETS_INDEX;}
   case "Missle Turrets":{return MISSLE_TURRETS_INDEX;}
   case "Plasma Turrets":{return PLASMA_TURRENTS_INDEX;}
   case "Ion Turrets":{return ION_TURRETS_INDEX;}
   case "Photon Turrets":{return PHOTON_TURRETS_INDEX;}
   case "Disruptor Turrets":{return DISRUPTOR_TURRETS_INDEX;}
   case "Deflection Shields":{return DEFLECTION_SHIELDS_INDEX;}
   case "Planetary Shield":{return PLANETARY_SHIELD_INDEX;}
   case "Planetary Ring":{return PLANETARY_RING_INDEX;}
 }
}

/*
==========================================
Sums values and modifies fleet table
==========================================
*/
function sumShips(rows){
 if (Math.round(new Date().getTime() / 1000) > (parseInt(getSetting('lastBaseCheck', 0)) + (864000*3))) insertNotification('Base data has not been updated in over three days.<br>View the empire <a href="/empire.aspx?view=structures">structures</a> page and the program will refresh the data.<br><br>');
	var tables = document.evaluate(
	  "//table",
	  document,
	  null,
	  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	  null);
   if(tables.snapshotLength<6) return;
   var rows = document.evaluate(
	  ".//tr",
	  tables.snapshotItem(5),
	  null,
	  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	  null);
	if(rows.snapshotLength == 1) return;
 var sums = new Array(20);
 var totalMobileSums = new Array(20);
 for(var i = 0; i < 20;i++){
   sums[i] = 0;
   totalMobileSums[i] = 0;
 }
 if(getSetting('config_showFleetAttackSize',true)) rows.snapshotItem(0).lastChild.innerHTML = "<a href='empire.aspx?view=fleets&order=size'>Attack Size / Size</a>";
 var mobileFleetCount = 0,cells,fleetUrl,currentFleetTotal,overallFleetTotal = 0,overallFightingFleetTotal = 0, overallMobileFleetTotal = 0,overallMobileFightingFleetTotal = 0;;
 for (var i = 1; i < rows.snapshotLength; i++){
  var row = rows.snapshotItem(i);
  currentFleetTotal = parseInt(rows.snapshotItem(i).lastChild.textContent);
  overallFleetTotal += currentFleetTotal;
  cells = document.evaluate(
		  ".//td[@style]",
		  row,
		  null,
		  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		  null);
  var location = row.childNodes[1].textContent;
		var galaxy = row.childNodes[1].firstChild.firstChild.href.split("=")[1].match(/(A|B|C|D|E|F|G)(\d\d)/)[2];
		var galaxyInfoArray = getGalaxyInfoArray(galaxy);
  var currentFightingFleetTotal = 0,shipTotal;
		for (var j = 0; j < cells.snapshotLength; j++){
   if(cells.snapshotItem(j).textContent.length > 0){
    shipTotal = parseInt(cells.snapshotItem(j).textContent);
    sums[j] = sums[j]+shipTotal;
    if(isFightingShip(j)) currentFightingFleetTotal += shipValues[j] * shipTotal;
    if(!isBase(location)){
					galaxyInfoArray[2][j] = galaxyInfoArray[2][j]+shipTotal;
					totalMobileSums[j] = totalMobileSums[j]+shipTotal;
				}
   }
  }
  overallFightingFleetTotal += currentFightingFleetTotal;
		if(!isBase(location)){
 			galaxyInfoArray[4] += currentFleetTotal;
	 		galaxyInfoArray[3] += currentFightingFleetTotal;
		 	galaxyInfoArray[1] += 1;
    overallMobileFleetTotal += currentFleetTotal;
    overallMobileFightingFleetTotal += currentFightingFleetTotal;
    mobileFleetCount+= 1;
  }
  if(getSetting('config_showFleetAttackSize',true)) rows.snapshotItem(i).lastChild.textContent =currentFightingFleetTotal  +" / "+ rows.snapshotItem(i).lastChild.textContent;
  fleetUrl = rows.snapshotItem(i).firstChild.firstChild.firstChild.href;
  if(getSetting('config_addFleetMoveLink',true)){
    if(rows.snapshotItem(i).firstChild.nextSibling.firstChild.textContent.charAt(0)!="*"){
      var moveLink = document.createElement("a");
      moveLink.setAttribute("href",fleetUrl+"&view=move");
      moveLink.textContent = rows.snapshotItem(i).lastChild.textContent;
      rows.snapshotItem(i).lastChild.textContent = "";
      rows.snapshotItem(i).lastChild.appendChild(moveLink);
    }
  }
 }
 if(getSetting('config_showTotalFleetRow',true)) insertTotalsRow(rows.snapshotItem(0).parentNode,sums,totalMobileSums,rows.snapshotLength - 1,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal);
}

function getGalaxyInfoArray(g){
	if(galaxyInfoArrays[g]==undefined){
		 var n = new Array(20);
	 	for(var i=0;i<20;i++){n[i]=0;}
	 	galaxyInfoArrays[g] = new Array(g,0,n,0,0);//[galaxy number],[mobile fleet count],[mobilefleetarray],[total fighting fleet],[total fleet], 
	}
	return galaxyInfoArrays[g];
}

/*********************************************
 Check base data saved from structures page
 so view=fleets can determine base locations
*********************************************/

function saveBases(){
 var links = document.evaluate(
   "//a[contains(@href,'base.aspx?base=')]",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 var b = new Array();
 for(var i=0;i<links.snapshotLength;i++){
   b[i] = links.snapshotItem(i).textContent+"="+links.snapshotItem(i).href.split("=")[1];
 }
 setSetting("bases",escape(b.join(",")));
 setSetting('lastBaseCheck', Math.round(new Date().getTime() / 1000));
}

function isBase(l){
 var b = getSetting("bases",null);
 if(b==null) return false;
 b = unescape(b);
 for(var i=0;i<b.split(',').length;i++){
   if(l == b.split(',')[i].split("=")[0]) return true;
 }
 return false;
}

/*
==========================================
Determines if supplied ship type is a fighting ship
==========================================
*/
function isFightingShip(shipIndex){
    return fightingShips.charAt(shipIndex)=="1";
}

/*
==========================================
Inserts totals row in fleet table
==========================================
*/
function insertTotalsRow(node,sums,mobileSums,fleetCount,mobileFleetCount,overallFleetTotal,overallFightingFleetTotal,overallMobileFleetTotal,overallMobileFightingFleetTotal){
    
	//GALAXY ROWS
	for(var i = 0;i<galaxyInfoArrays.length;i++)
	{
		if(i < 10) i = "0"+i;
		var galaxyInfoArray = galaxyInfoArrays[i];
		if(galaxyInfoArray==undefined || galaxyInfoArray[1] == 0)
			continue;
		
		var sumRow = document.createElement("tr");
	    sumRow.setAttribute('align','center');
	    
	    var element = sumRow.insertCell(0);
	    element.textContent = "Mobile Fleets ("+i+")";
	    element = sumRow.insertCell(1);
	    element.textContent = galaxyInfoArray[1];
	    
		var galaxyFleetSums = galaxyInfoArray[2];
		for(var k = 0; k < 20; k++)
	    {
	        var cell = document.createElement("td");
	        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	        if(galaxyFleetSums[k] > 0)
				cell.innerHTML = "<small>"+galaxyFleetSums[k]+"</small>";
	        sumRow.insertBefore(cell,null);
	    }
	    //Add totals cell
	    var cell = document.createElement("td");
	    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
	    cell.innerHTML =galaxyInfoArray[3] +" / "+ galaxyInfoArray[4];
	    sumRow.insertBefore(cell,null);
	    node.insertBefore(sumRow,null);
	}
	//MOBILE ROW
	var sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    var element = sumRow.insertCell(0);
    element.textContent = "Total Mobile Fleets";
    element = sumRow.insertCell(1);
    element.textContent = mobileFleetCount;
    for(var k = 0; k < 20; k++)
    {
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(mobileSums[k] > 0)
			cell.innerHTML = "<small>"+mobileSums[k]+"</small>";
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallMobileFightingFleetTotal +" / "+ overallMobileFleetTotal;
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
    //TOTAL ROW
    sumRow = document.createElement("tr");
    sumRow.setAttribute('align','center');
    element = sumRow.insertCell(0);
    element.textContent = "Total Fleets";
    element = sumRow.insertCell(1);
    element.textContent = fleetCount;
    for(var k = 0; k < 20; k++)
    {
        var cell = document.createElement("td");
        cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
        if(sums[k] > 0)
			cell.innerHTML = "<small>"+sums[k]+"</small>";
        sumRow.insertBefore(cell,null);
    }
    //Add totals cell
    var cell = document.createElement("td");
    //cell.setAttribute("style","border: #000066 solid 1px; border-width: 0 1 1 1;");
    cell.innerHTML =overallFightingFleetTotal +" / "+ overallFleetTotal;
    sumRow.insertBefore(cell,null);
    node.insertBefore(sumRow,null);
}

/*
==========================================
Check Tech Data Age
==========================================
*/
function checkTechDataAge(){
return; // **disabled **
	if(getSetting('techData') == null)
	{	
		insertNotification('Technology data has not been set.<br>'
        +'    Visit the technologies page to set the information.<br><br><br>');
		return;
	}	
    var lastTechCheck = parseInt(getSetting('lastTechCheck', 0));
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    if (currentTime > (lastTechCheck + (86400*7)))
    {
        insertNotification('Technology data has not been updated in over seven days.<br>'
        +'    Visit the empire trade page to refresh the information.<br><br><br>');
    }
}
//*************************************************************************************
// Fixing the special character bug
//*************************************************************************************

function getHighlightColorForGuild(guild){
    var myGuildColor = getSetting('config_myGuildColour',"#9999FF");
    var myGuild = getSetting('config_myGuild',null);
    var eguilds = getSetting('config_enemyGuilds',null);
    var eguildColor = getSetting('config_enemyGuildColour',null);
    var nguilds = getSetting('config_nappedGuilds',null);
    var nguildColor = getSetting('config_nappedGuildColour',null);
    var aguilds = getSetting('config_alliedGuilds',null);
    var aguildColor = getSetting('config_alliedGuildColour',null);    
 //   guild = unescape(guild)
    if(myGuild != null && myGuildColor != null)
    {
        myGuild = unescape(myGuild);
        myGuildColor = unescape(myGuildColor);
        if(myGuild == unescape(guild))
        {
        return myGuildColor;
        }
    }
    
    if(aguilds != null && aguildColor != null)
    {
        aguilds = unescape(aguilds);
        aguildColor = unescape(aguildColor);
        var guildArray = aguilds.split(",");
        for(var i = 0; i < guildArray.length;i++)
        {
            if(guildArray[i] == unescape(guild))
            return aguildColor;
        }
    }
    if(nguilds != null && nguildColor != null)
    {
        nguilds = unescape(nguilds);
        nguildColor = unescape(nguildColor);
        var guildArray = nguilds.split(",");
        for(var i = 0; i < guildArray.length;i++)
        {
//            if(guildArray[i].split("=")[0] == unescape(guild))
            if(guildArray[i] == unescape(guild))
            return nguildColor;
        }
    }
    if(eguilds != null && eguildColor != null)
    {
        eguilds = unescape(eguilds);
        eguildColor = unescape(eguildColor);
        var guildArray = eguilds.split(",");
        for(var i = 0; i < guildArray.length;i++)
        {
            if(guildArray[i] == unescape(guild))
            return eguildColor;
        }
    }
    return null;
}

//Input is player name without guild name
function getHighlightColorForPlayer(player){
    var playerColors = getSetting('config_playerColors',"Drekons=#FF82AB,United Colonies=#7FFF00");
    if(playerColors == null)
    return;
    playerColors = unescape(playerColors);
    var playerArray = playerColors.split(",");
    for(var i = 0; i < playerArray.length;i++)
    {
        if(playerArray[i].split("=")[0] == player)
		{
			return playerArray[i].split("=")[1];
		}
    }
    return null;
}

function insertNotification(message){
    GM_addStyle('#gm_update_alert {'
        +'    position: relative;'
        +'    z-index: 99;'
        +'    top: 0px;'
        +'    left: 0px;'
        +'    width: 100%;'
        +'    background-color: Black;'
        +'    text-align: center;'
        +'    font-size: 11px;'
        +'    font-family: Tahoma;'
        +'    border: solid 1px;'
        +'    margin-bottom: 10px;'
        +'}'
    +'#gm_update_alert_buttons {'
        +'    position: relative;'
        +'    top: -5px;'
        +'    margin: 7px;'
        +'}'
    +'#gm_update_alert_button_close {'
        +'    position: absolute;'
        +'    right: 0px;'
        +'    top: 0px;'
        +'    padding: 3px 5px 3px 5px;'
        +'    border-style: outset;'
        +'    border-width: thin;'
        +'    z-index: inherit;'
        +'    background-color: #FF0000;'
        +'    color: #FFFFFF;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
        +'    text-decoration:underline;'
        +'    color: #003399;'
        +'    font-weight: bold;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_alert_buttons span a:hover  {'
        +'    text-decoration:underline;'
        +'    color: #990033;'
        +'    font-weight: bold;'
        +'    cursor:pointer'
        +'}'
    +'#gm_update_title {'
        +'    weight:bold;'
        +'    color:orange;'
        +'}');
    var notification = document.createElement("div");
    notification.setAttribute('id', 'gm_update_alert');
    notification.innerHTML = ''
    +'    <div id="gm_update_title">Astro Empires Tools Notification</div>'
    + '<br>' + message
    +'';
    document.body.insertBefore(notification, document.body.firstChild);
}

/***********************
 Swap Location Names
***********************/
function replaceLocationNames(){
 var a = document.evaluate(
		 "//a[contains(@href,'loc=') and (count(img) = 0)]",
		 document,
		 null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		 null);
 if(a.snapshotLength==0) return;
	var i,x,names = unescape(getSetting('config_locationNames',"A12:12:12:12=my home base,A13:13:13:13=main jumpgate"));
	for(i=0;i<a.snapshotLength;i++){
   for(x=0;x<names.split(",").length;x++){
     if(names.split(",")[x].split("=")[0] == a.snapshotItem(i).textContent) a.snapshotItem(i).textContent = names.split(",")[x].split("=")[1]
   }
	}
}

/*********************
  Map Enhancements
*********************/
function copyBaseLinks(){
  var cV = document.getElementById('myCanvas');
  if(!cV) return;
  var bL = document.evaluate(
    "//a[@onmouseout][contains(@href,'base')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(bL.snapshotLength==0) return;
  var dE = document.createElement("div");
  dE.setAttribute("style","position:relative;left:5%;border:1px ridge #9999FF;font:700 12px verdana,arial,sans-serif;text-align:right;padding:5px;width:155px;background-color:#000000;z-index:500;");
  dE.setAttribute("id","linksClones");
  var tE = document.createElement("div");
  tE.textContent = "Bases";
  tE.setAttribute("style","font:900 16px arial,sans-serif;text-align:center;");
  dE.appendChild(tE);
  dE.firstChild.appendChild(document.createElement('br'));
  tE = document.createElement('span');
  tE.setAttribute('style','font:500 12px arial,sans-serif;position:relative;top:-2px;');
  tE.textContent='(in this galaxy)';
  dE.firstChild.appendChild(tE);
  for(var i=0;i<bL.snapshotLength;i++){
    var c = bL.snapshotItem(i).cloneNode(true);
    dE.appendChild(c);
    dE.appendChild(document.createElement("br"));
  }
  cV.parentNode.insertBefore(dE,cV);
  cV.setAttribute("style",cV.getAttribute("style")+"bottom: "+dE.offsetHeight);
  dE.setAttribute("style",dE.getAttribute("style")+"top: "+cV.offsetHeight/50);
}

function copyFleetLinks(){
  var cV = document.getElementById('myCanvas');
  if(!cV) return;
  var fL = document.evaluate(
    "//a[@onmouseout][contains(@href,'fleet')][not(contains(@href,'edit'))]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(fL.snapshotLength==0) return;
  var dE = document.createElement("div");
  dE.setAttribute("style","position:relative;left:5%;border:1px ridge #9999FF;font:700 12px verdana,arial,sans-serif;text-align:right;padding:5px;width:155px;background-color:#000000;z-index:500;");
  dE.setAttribute("id","linksClones");
  var tE = document.createElement("div");
  tE.textContent = "Fleets";
  tE.setAttribute("style","font:900 16px arial,sans-serif;text-align:center;");
  dE.appendChild(tE);
  dE.firstChild.appendChild(document.createElement('br'));
  tE = document.createElement('span');
  tE.setAttribute('style','font:500 12px arial,sans-serif;position:relative;top:-2px;');
  tE.textContent='(in this galaxy)';
  dE.firstChild.appendChild(tE);
  var sM;
  var regex = /.\d\d:\d\d:\d\d:\d\d/;
  for(var i=0;i<fL.snapshotLength;i++){
    var c = fL.snapshotItem(i).cloneNode(true);
    sM = document.createElement('a');
    sM.setAttribute("href","/map.aspx?loc="+regex.exec(fL.snapshotItem(i).parentNode.nextSibling.firstChild.innerHTML)[0]);
    sM.textContent = " - loc";
    sM.title=fL.snapshotItem(i).parentNode.nextSibling.firstChild.innerHTML;
    sM.style.fontSize="11px";
    sM.style.fontWeight="500";
    dE.appendChild(c);
    dE.appendChild(sM);
    dE.appendChild(document.createElement("br"));
  }
  cV.parentNode.insertBefore(dE,cV);
  cV.setAttribute("style",cV.getAttribute("style")+"bottom: "+dE.offsetHeight);
  dE.setAttribute("style",dE.getAttribute("style")+"top: "+cV.offsetHeight/50);
}

function moveGalaxyList(){
  var x = 0;
  if(window.location.href.indexOf("bookmarks.aspx")!=-1 || document.getElementsByTagName('center')[0].innerHTML.indexOf('Campaign fleets left:')!=-1 || (window.location.href.indexOf("?")!=-1 && window.location.href.indexOf('gal=') == -1 && window.location.href.indexOf("order=")==-1) || (window.location.href.indexOf("?order=")!=-1 && document.getElementsByTagName('center')[0].innerHTML.indexOf('Fleets')!=-1)) x=1;
  if(window.location.href.indexOf("bookmarks.aspx")!=-1 && window.location.href.indexOf("?")!=-1) x=2;
  var cE = document.getElementsByTagName('center')[x];
  cE.parentNode.appendChild(cE);
  cE.parentNode.insertBefore(document.createElement("br"),cE);
  if(document.getElementById("linksClones")) cE.setAttribute("style","position: relative; bottom: "+document.getElementById("linksClones").offsetHeight);
}

function baseLocationLinks(){
 var i,l = document.evaluate("//center",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
 if(l.innerHTML.indexOf('System')==-1) return;
 l = document.evaluate("//a[contains(@href,'base.aspx')]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
 var u,d,a;
 for(i=1;i<l.snapshotLength;i++){
   u = l.snapshotItem(i).firstChild.title;
   u = u.substring(u.indexOf('(')+1);
   u = u.substring(0,u.indexOf(')'));
   d = document.createElement('div');
   d.setAttribute('style',l.snapshotItem(i).firstChild.getAttribute('style'));
   a = document.createElement('a');
   a.href = l.snapshotItem(i).href;
   a.setAttribute('onClick','window.location.href=this.href;return false;');
   l.snapshotItem(i).href = "/map.aspx?loc="+u
   a.innerHTML = "Base";
   a.setAttribute('style','top:-14px;left:-18px;position:relative;font-size:.8em;text-decoration:underline;');
   d.appendChild(a);
   l.snapshotItem(i).appendChild(d);
 }
 l = document.evaluate("//span[@class='gray comment']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
 for(i=0;i<l.snapshotLength;i++){
   l.snapshotItem(i).setAttribute('class','');
   l.snapshotItem(i).setAttribute('style','position:relative;top:-'+l.snapshotItem(i).parentNode.offsetHeight*2.1+'px;left:'+((l.snapshotItem(i).parentNode.offsetWidth/2)+18)+'px;');
   l.snapshotItem(i).innerHTML='<br>'+l.snapshotItem(i).title;
 }
}

/*****************
   Trade
*****************/
function highlightPlayers(){
	var a = document.evaluate(
   "//a[contains(@href,'profile.aspx')]",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 for (var i=0;i<a.snapshotLength;i++){
   if(getSetting('config_highlightTradePartners',true) && isTradePartner(a.snapshotItem(i).innerHTML)) a.snapshotItem(i).style.color = unescape(getSetting('config_highlightPlayerColor',"green"));
   if(getSetting('config_playerColors',"Drekons=#FF82AB,United Colonies=#7FFF00")!=null && getSetting('config_highlightPlayers',true)){
     if(getHighlightColorForGuild(getGuild(a.snapshotItem(i).innerHTML))!=null) a.snapshotItem(i).style.color = getHighlightColorForGuild(getGuild(a.snapshotItem(i).innerHTML));
     if(getHighlightColorForPlayer(getPlayerName(a.snapshotItem(i).innerHTML))!=null) a.snapshotItem(i).style.color = getHighlightColorForPlayer(getPlayerName(a.snapshotItem(i).innerHTML));
   }
 }
}

function isTradePartner(n){
 var t;
 if(getSetting('tradePartners',null)!=null){
   t = unescape(getSetting('tradePartners',null)).split(";");
   for(var i=0;i<t.length;i++){
     if(getPlayerName(n)==getPlayerName(t[i])) return true;
   }
 }
 return false;
}

function insertToggleLink(){
 var a = document.createElement("a");
 a.href = "javascript:void(0)";
 a.setAttribute("id","hideTradesLink");
 a.textContent = "Hide full trades";
 a.addEventListener('click',function(event){toggleBasesWithFullTrades(true)},true);
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.style.padding='8px';
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.innerHTML='Total players involved in trading = '+document.getElementById('empire_trade_formula').firstChild.lastChild.innerHTML.split('=')[5].split('<')[0]+' &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; ';
 document.getElementById('empire_trade_bases').firstChild.firstChild.firstChild.appendChild(a);
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.firstChild.lastChild.previousSibling.lastChild.style.padding='8px';
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.firstChild.lastChild.previousSibling.lastChild.previousSibling.firstChild.innerHTML+=' Routes';
 document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.firstChild.lastChild.lastChild.innerHTML='';
 document.getElementById('empire_trade_formula').parentNode.removeChild(document.getElementById('empire_trade_formula'));
 document.getElementById('empire_trade_bases').firstChild.insertBefore(document.createElement('tr'),document.getElementById('empire_trade_bases').firstChild.lastChild);
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].id='tradesFullMsg';
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].style.display='none';
 document.getElementById('empire_trade_bases').firstChild.childNodes[1].innerHTML='<td style="color:'+unescape(getSetting('config_highlightPlayerColor',"green"))+';text-align:center;">* All Trade Routes Full *</td>';
 toggleBasesWithFullTrades();
}

function toggleBasesWithFullTrades(s){
 var h = getSetting('hide_Trade_Rows',false),x=0;
 var rows = document.getElementById('empire_trade_bases').firstChild.lastChild.firstChild.firstChild.firstChild.childNodes;
 if(s) h=!h;
 for(var i=1;i<rows.length-2;i++){
   if(parseInt(rows[i].childNodes[3].firstChild.textContent.split(" / ")[0]) == parseInt(rows[i].childNodes[3].firstChild.textContent.split(" / ")[1])){
     rows[i].style.display=h?"none":"table-row";
     x++;
   }
 }
 if(x==rows.length-3 && h){
   rows[0].style.display='none';
   document.getElementById('tradesFullMsg').style.display='table-row';
 }else{
   rows[0].style.display='table-row';
   document.getElementById('tradesFullMsg').style.display='none';
 }
 document.getElementById("hideTradesLink").textContent=h?"Show all":"Hide full trades";
 setSetting('hide_Trade_Rows',h);
}

function checkTradePage(){
 var i,x,t=[],n=[];
 var a = document.evaluate(
   "//small[contains(@class,'gray')]",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 for(i=0;i<a.snapshotLength;i++){
   if(t[a.snapshotItem(i).innerHTML]) t[a.snapshotItem(i).innerHTML]+=1;
   else t[a.snapshotItem(i).innerHTML]=1;
   n.push(a.snapshotItem(i));
   if(i>0) i++;
 }
 a = '';
 for(i in t){
   a+=";"+i
   for(x=1;x<n.length;x++){
     if(n[x].innerHTML == i && t[i]>1){
       n[x].style.color = 'red';
       if(n[x].parentNode.previousSibling.lastChild.innerHTML==i) n[x].innerHTML += ' (SelfTrade)';
       else n[x].innerHTML += ' (Duplicate)';
     }
   }
 }
 a=a.substring(1);
 setSetting('tradePartners',escape(a));
 setSetting('lastTradeCheck',Math.round(new Date().getTime()/1000));
}

function checkTradeDataAge(){
 if(getSetting('tradePartners',null) == null) insertNotification('Trade partner data has not been set.<br>Visit the trade page to set the information.<br><br><br>');
 else if(Math.round(new Date().getTime()/1000) > (parseInt(getSetting('lastTradeCheck',0))+(86400*7))) insertNotification('Trade partner data has not been updated in over seven days.<br>Visit the empire trade page to refresh the information.<br><br><br>');
}

function findPoorTrades(){
 var rows = document.getElementById('empire_trade_trade-routes').firstChild.lastChild.firstChild.firstChild.firstChild.childNodes;
 for(var i=1;i<rows.length-1;i++){
   if(parseInt(rows[i].childNodes[3].innerHTML) - parseInt(rows[i].childNodes[2].innerHTML) > getSetting('config_poorTradeUpperThreshold',10)) rows[i].childNodes[3].style.color = "orange";
   if(parseInt(rows[i].childNodes[3].innerHTML) - parseInt(rows[i].childNodes[2].innerHTML) < -1 * getSetting('config_poorTradeLowerThreshold',15)) rows[i].childNodes[3].style.color = "red";
 }
}

function showTradeSummary(){
 if(!document.getElementById('empire_trade_trade-routes')) return;
 var c,x,s,p;
 GM_addStyle('#tradeSummary{margin:0 auto;}#tradeSummary TD{text-align:center;}');
 var t = document.createElement('table');
 t.setAttribute('id','tradeSummary');
 t.setAttribute('cellpadding','6');
 t.innerHTML='<tr><th align="center" colspan=5>Trade Summary<br>&nbsp;</th></tr><tr><th>&nbsp;</th><th>#&nbsp;of<br>Routes</th><th>Avg.&nbsp;Econ<br>Difference</th><th>Avg.<br>Distance</th><th>Avg.<br>Income</th></tr>';
 if(getSetting('config_highlightDuplicateTradePartners',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('d')},true);
   c.firstChild.firstChild.innerHTML='Duplicate Routes';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDups');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeDupsInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('s')},true);
   c.firstChild.firstChild.innerHTML='Self Trades';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelf');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeSelfInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 if(getSetting('config_highlightPoorTrades',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('red')},true);
   c.firstChild.firstChild.innerHTML='Low Threshold';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLow');
   c.lastChild.setAttribute('style','color:red;');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeLowInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('orange')},true);
   c.firstChild.firstChild.innerHTML='High Threshold';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHigh');
   c.lastChild.setAttribute('style','color:orange;');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeHighInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 if(getSetting('config_highlightDuplicateTradePartners',true) || getSetting('config_highlightPoorTrades',true)){
   c=document.createElement('tr');
   c.appendChild(document.createElement('th'));
   c.firstChild.appendChild(document.createElement('a'));
   c.firstChild.firstChild.href='javascript:void(0);';
   c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('b')},true);
   c.firstChild.firstChild.innerHTML='Balanced Trade';
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBal');
   c.lastChild.setAttribute('style','color:'+unescape(getSetting('config_highlightPlayerColor',"green"))+';');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalDiff');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalDist');
   c.lastChild.innerHTML=0;
   c.appendChild(document.createElement('td'));
   c.lastChild.setAttribute('id','tradeBalInc');
   c.lastChild.innerHTML=0;
   t.firstChild.appendChild(c);
 }
 c=document.createElement('tr');
 c.appendChild(document.createElement('th'));
 c.firstChild.appendChild(document.createElement('a'));
 c.firstChild.firstChild.href='javascript:void(0);';
 c.firstChild.firstChild.addEventListener('click',function(){toggleTradeRows('a')},true);
 c.firstChild.firstChild.innerHTML='All Routes';
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAll');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllDiff');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllDist');
 c.lastChild.innerHTML=0;
 c.appendChild(document.createElement('td'));
 c.lastChild.setAttribute('id','tradeAllInc');
 c.lastChild.innerHTML=0;
 t.firstChild.appendChild(c);
 document.getElementById('empire_trade_trade-routes').parentNode.insertBefore(t,document.getElementById('empire_trade_trade-routes'));
 document.getElementById('empire_trade_trade-routes').parentNode.insertBefore(document.createElement("br"),document.getElementById('empire_trade_trade-routes'));
 var a = document.evaluate(
   "//small[@class='gray']",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 document.getElementById('tradeAll').innerHTML=a.snapshotLength;
 for(i=0;i<a.snapshotLength;i++){
   p=0;
   if(a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')!=-1 && document.getElementById('tradeDups')){document.getElementById('tradeDups').innerHTML=parseInt(document.getElementById('tradeDups').innerHTML)+1;p=1;}
   if(a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')!=-1 && document.getElementById('tradeSelf')){document.getElementById('tradeSelf').innerHTML=parseInt(document.getElementById('tradeSelf').innerHTML)+1;p=2;}
   s=a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color;
   if(s=='red') document.getElementById('tradeLow').innerHTML=parseInt(document.getElementById('tradeLow').innerHTML)+1;
   else if(s=='orange') document.getElementById('tradeHigh').innerHTML=parseInt(document.getElementById('tradeHigh').innerHTML)+1;
   else if(p==0 && document.getElementById('tradeBal')) document.getElementById('tradeBal').innerHTML=parseInt(document.getElementById('tradeBal').innerHTML)+1;
   for(x=3;x<7;x++){
     if(x==5) continue;
     c=parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x].innerHTML);
     if(c==NaN) return;
     if(x==3){
       document.getElementById('tradeAllDiff').innerHTML=parseInt(document.getElementById('tradeAllDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsDiff').innerHTML=parseInt(document.getElementById('tradeDupsDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfDiff').innerHTML=parseInt(document.getElementById('tradeSelfDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowDiff').innerHTML=parseInt(document.getElementById('tradeLowDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighDiff').innerHTML=parseInt(document.getElementById('tradeHighDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalDiff')) document.getElementById('tradeBalDiff').innerHTML=parseInt(document.getElementById('tradeBalDiff').innerHTML)-parseInt(a.snapshotItem(i).parentNode.parentNode.childNodes[x-1].innerHTML)+c;
     }
     else if(x==4){
       document.getElementById('tradeAllDist').innerHTML=parseInt(document.getElementById('tradeAllDist').innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsDist').innerHTML=parseInt(document.getElementById('tradeDupsDist').innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfDist').innerHTML=parseInt(document.getElementById('tradeSelfDist').innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowDist').innerHTML=parseInt(document.getElementById('tradeLowDist').innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighDist').innerHTML=parseInt(document.getElementById('tradeHighDist').innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalDist')) document.getElementById('tradeBalDist').innerHTML=parseInt(document.getElementById('tradeBalDist').innerHTML)+c;
     }
     else if(x==6){
       document.getElementById('tradeAllInc').innerHTML=parseInt(document.getElementById('tradeAllInc').innerHTML)+c;
       if(p==1) document.getElementById('tradeDupsInc').innerHTML=parseInt(document.getElementById('tradeDupsInc').innerHTML)+c;
       else if(p==2) document.getElementById('tradeSelfInc').innerHTML=parseInt(document.getElementById('tradeSelfInc').innerHTML)+c;
       if(s=='red') document.getElementById('tradeLowInc').innerHTML=parseInt(document.getElementById('tradeLowInc').innerHTML)+c;
       else if(s=='orange') document.getElementById('tradeHighInc').innerHTML=parseInt(document.getElementById('tradeHighInc').innerHTML)+c;
       else if(p==0 && document.getElementById('tradeBalInc')) document.getElementById('tradeBalInc').innerHTML=parseInt(document.getElementById('tradeBalInc').innerHTML)+c;
     }
   }
 }
 if(document.getElementById('tradeDupsDiff') && document.getElementById('tradeDupsDiff').innerHTML!=0) document.getElementById('tradeDupsDiff').innerHTML=(parseInt(document.getElementById('tradeDupsDiff').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeDupsDist') && document.getElementById('tradeDupsDist').innerHTML!=0) document.getElementById('tradeDupsDist').innerHTML=(parseInt(document.getElementById('tradeDupsDist').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeDupsInc') && document.getElementById('tradeDupsInc').innerHTML!=0) document.getElementById('tradeDupsInc').innerHTML=(parseInt(document.getElementById('tradeDupsInc').innerHTML)/parseInt(document.getElementById('tradeDups').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfDiff') && document.getElementById('tradeSelfDiff').innerHTML!=0) document.getElementById('tradeSelfDiff').innerHTML=(parseInt(document.getElementById('tradeSelfDiff').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfDist') && document.getElementById('tradeSelfDist').innerHTML!=0) document.getElementById('tradeSelfDist').innerHTML=(parseInt(document.getElementById('tradeSelfDist').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeSelfInc') && document.getElementById('tradeSelfInc').innerHTML!=0) document.getElementById('tradeSelfInc').innerHTML=(parseInt(document.getElementById('tradeSelfInc').innerHTML)/parseInt(document.getElementById('tradeSelf').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowDiff') && document.getElementById('tradeLowDiff').innerHTML!=0) document.getElementById('tradeLowDiff').innerHTML=(parseInt(document.getElementById('tradeLowDiff').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowDist') && document.getElementById('tradeLowDist').innerHTML!=0) document.getElementById('tradeLowDist').innerHTML=(parseInt(document.getElementById('tradeLowDist').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeLowInc') && document.getElementById('tradeLowInc').innerHTML!=0) document.getElementById('tradeLowInc').innerHTML=(parseInt(document.getElementById('tradeLowInc').innerHTML)/parseInt(document.getElementById('tradeLow').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighDiff') && document.getElementById('tradeHighDiff').innerHTML!=0) document.getElementById('tradeHighDiff').innerHTML=(parseInt(document.getElementById('tradeHighDiff').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighDist') && document.getElementById('tradeHighDist').innerHTML!=0) document.getElementById('tradeHighDist').innerHTML=(parseInt(document.getElementById('tradeHighDist').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeHighInc') && document.getElementById('tradeHighInc').innerHTML!=0) document.getElementById('tradeHighInc').innerHTML=(parseInt(document.getElementById('tradeHighInc').innerHTML)/parseInt(document.getElementById('tradeHigh').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalDiff') && document.getElementById('tradeBalDiff').innerHTML!=0) document.getElementById('tradeBalDiff').innerHTML=(parseInt(document.getElementById('tradeBalDiff').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalDist') && document.getElementById('tradeBalDist').innerHTML!=0) document.getElementById('tradeBalDist').innerHTML=(parseInt(document.getElementById('tradeBalDist').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 if(document.getElementById('tradeBalInc') && document.getElementById('tradeBalInc').innerHTML!=0) document.getElementById('tradeBalInc').innerHTML=(parseInt(document.getElementById('tradeBalInc').innerHTML)/parseInt(document.getElementById('tradeBal').innerHTML)).toFixed(2);
 document.getElementById('tradeAllDiff').innerHTML=(parseInt(document.getElementById('tradeAllDiff').innerHTML)/a.snapshotLength).toFixed(2);
 document.getElementById('tradeAllDist').innerHTML=(parseInt(document.getElementById('tradeAllDist').innerHTML)/a.snapshotLength).toFixed(2);
 document.getElementById('tradeAllInc').innerHTML=(parseInt(document.getElementById('tradeAllInc').innerHTML)/a.snapshotLength).toFixed(2);

}

function toggleTradeRows(r){
 var a = document.evaluate(
   "//small[@class='gray']",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 for(var i=0;i<a.snapshotLength;i++){
   if((a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color==r)||(a.snapshotItem(i).parentNode.parentNode.childNodes[3].style.color=='' && r=='b' && a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')==-1 && a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')==-1)||(a.snapshotItem(i).innerHTML.indexOf(' (SelfTrade)')!=-1 && r=='s')||(a.snapshotItem(i).innerHTML.indexOf(' (Duplicate)')!=-1 && r=='d')||r=='a') a.snapshotItem(i).parentNode.parentNode.style.display='table-row';
   else a.snapshotItem(i).parentNode.parentNode.style.display='none';
 }
}

/***********************
 Structures / Bases
***********************/
function insertBaseSettingLinks(){
 var l,r,d,b,j,t = unescape(getSetting("newBaseTypes",null)).split(",");
 GM_addStyle('.settingsLink {font-weight:bold;font-size:x-small;background-color:#333399;border:solid 1px transparent;padding-left:2px;padding-right:2px;margin-left:2px;margin-right:2px;}.settingsLinkSelected {font-weight:bold;font-size:x-small;background-color:#000000;border:solid 1px transparent;padding-left:2px;padding-right:2px;margin-left:2px;margin-right:2px;}');
	var a = document.evaluate(
		 "//a[contains(@href,'base.aspx?base=')]",
		 document,
		 null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		 null);
 if(!a.snapshotItem(0)) return;
 r = a.snapshotItem(0).parentNode.parentNode.previousSibling;
 d = document.createElement("td");
 d.setAttribute("width",25);
 d.setAttribute("align","left");
 d.setAttribute("style","font-size:8px;padding-bottom:12px");
 d.innerHTML = "<font style='color:red;font-size: large;'>&#x25CF;</font><br><br>N<br>O<br>T<br><br>S<br>T<br>A<br>R<br>T<br>E<br>D<br>";
 r.replaceChild(d,r.firstChild);
 d = document.createElement("td");
 d.setAttribute("width",25);
 d.setAttribute("style","font-size:8px;padding-bottom:12px");
 d.innerHTML = "<font style='color:blue;font-size: large;'>&#x25CF;</font><br><br>P<br>R<br>O<br>G<br>R<br>E<br>S<br>S<br>I<br>N<br>G";
 r.insertBefore(d,r.firstChild);
 r.insertBefore(document.createElement("th"),r.firstChild);
 d = document.createElement("th");
 d.innerHTML = "<a href='"+window.location.href+"&mode=edit' id='editLink'>Edit Goals</a>";
 r.insertBefore(d,r.firstChild);
	for(var i=0;i<a.snapshotLength;i++){
   l = a.snapshotItem(i);
   l.parentNode.parentNode.firstChild.setAttribute("colspan","3");
   b = l.href.substring(l.href.indexOf("=")+1);
   d = document.createElement("td");
   d.innerHTML = "<a class='settingsLink' href='#"+b+"' id='1-"+b+"'>E</a><a class='settingsLink' href='#"+b+"' id='2-"+b+"'>P</a><a class='settingsLink' href='#"+b+"' id='3-"+b+"'>R</a><a class='settingsLink' href='#"+b+"' id='4-"+b+"'>JG</a><a class='settingsLink' href='#"+b+"' id='5-"+b+"'>C</a>";
   l.parentNode.parentNode.insertBefore(d,l.parentNode.parentNode.firstChild);
   for(j=0;j<t.length;j++){
     if(t[j].split("=")[0]==b) onBaseTypeSet(b,t[j].split("=")[1]);
    }
		 l.href = l.href + "&view=structures";
  	document.getElementById("1-"+b).addEventListener('click', getSetBaseClosure(b,"1"),true);
   document.getElementById("2-"+b).addEventListener('click', getSetBaseClosure(b,"2"),true);
   document.getElementById("3-"+b).addEventListener('click', getSetBaseClosure(b,"3"),true);
   document.getElementById("4-"+b).addEventListener('click', getSetBaseClosure(b,"4"),true);
   document.getElementById("5-"+b).addEventListener('click', getSetBaseClosure(b,"5"),true);
 }
}

function getSetBaseClosure(b,t){
 function func(){setBase(b,t)};
 return func;
}

function setBase(baseId,type){
  onBaseTypeSet(baseId,type);
  saveBaseTypes();
}

function onBaseTypeSet(b,t){
 if(document.getElementById(t+"-"+b).className=="settingsLinkSelected"){
   document.getElementById(t+"-"+b).className="settingsLink";
   fillCells(b,"clear");
 }else{
   document.getElementById(t+"-"+b).setAttribute("class","settingsLinkSelected");
   switch(t){
     case "1":{document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "2":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "3":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "4":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("5-"+b).className="settingsLink";break;}
     case "5":{document.getElementById("1-"+b).className="settingsLink";document.getElementById("2-"+b).className="settingsLink";document.getElementById("3-"+b).className="settingsLink";document.getElementById("4-"+b).className="settingsLink";break;}
   }
   fillCells(b,t);
 }
}

function saveBaseTypes(){
 var a = document.evaluate(
		 "//a[contains(@href,'base.aspx?base=')]",
		 document,
		 null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		 null);
 if(!a.snapshotItem(0)) return;
 var x,b='';
 for(var i=0;i<a.snapshotLength;i++){
   for(x=0;x<a.snapshotItem(i).parentNode.previousSibling.childNodes.length;x++){
     if(a.snapshotItem(i).parentNode.previousSibling.childNodes[x].className=="settingsLinkSelected") b+=a.snapshotItem(i).href.split('=')[1].split('&')[0]+'='+(x+1)+',';
   }
 }
 if(b.length>0) b=b.substring(0,b.length-1);
 setSetting("newBaseTypes",escape(b));
}

function getBaseTypeValues(t){
 var array;
 switch(t){
   case "1":{array=getSetting("BASE_PRESET_1_VALUE",DEFAULT_BASE_PRESET_1);break;}
   case "2":{array=getSetting("BASE_PRESET_2_VALUE",DEFAULT_BASE_PRESET_2);break;}
   case "3":{array=getSetting("BASE_PRESET_3_VALUE",DEFAULT_BASE_PRESET_3);break;}
   case "4":{array=getSetting("BASE_PRESET_4_VALUE",DEFAULT_BASE_PRESET_4);break;}
   case "5":{array=getSetting("BASE_PRESET_5_VALUE",DEFAULT_BASE_PRESET_5);break;}
   default:{return null;}
 }
 return array.split(",");
}

function saveBaseTypeValues(a,t){
 switch(t){
   case "1":{setSetting("BASE_PRESET_1_VALUE",a.join(","));break;}
   case "2":{setSetting("BASE_PRESET_2_VALUE",a.join(","));break;}
   case "3":{setSetting("BASE_PRESET_3_VALUE",a.join(","));break;}
   case "4":{setSetting("BASE_PRESET_4_VALUE",a.join(","));break;}
   case "5":{setSetting("BASE_PRESET_5_VALUE",a.join(","));break;}
 }
}

function fillCells(b,t){
 var c,v = getBaseTypeValues(t);
 var a = document.evaluate(
 "//a[contains(@href,'base.aspx?base="+b+"')]",
 document,
 null,
 XPathResult.FIRST_ORDERED_NODE_TYPE,
 null).singleNodeValue;
 for(var i=2;i<a.parentNode.parentNode.childNodes.length;i++){
   if(a.parentNode.parentNode.childNodes[i].childNodes.length==1){
     if(a.parentNode.parentNode.childNodes[i].childNodes[0].style.color=="blue") a.parentNode.parentNode.childNodes[i].childNodes[0].style.color="white";
     if(a.parentNode.parentNode.childNodes[i].childNodes[0].style.color == "red") a.parentNode.parentNode.childNodes[i].removeChild(a.parentNode.parentNode.childNodes[i].childNodes[0]);
   }
   if(t=="clear") continue;
   if(v[i-2]=="-1") continue;
   if(a.parentNode.parentNode.childNodes[i].childNodes.length==1){
     if(parseInt(a.parentNode.parentNode.childNodes[i].childNodes[0].textContent)<v[i-2])
     a.parentNode.parentNode.childNodes[i].childNodes[0].style.color="blue";
   }else if(v[i-2]>0){
     c = document.createElement("small");
     c.style.color = "red";
     c.textContent = v[i-2];
     a.parentNode.parentNode.childNodes[i].appendChild(c);
   }
 }
}

function insertEditRows(){
 var t = ["1","2","3","4","5"];
 var n = ["Economy","Production","Research","JumpGate","Capitol"];
 var i,r,d,v;
 for(var j=0;j<t.length;j++){
   r = document.createElement("tr");
   r.setAttribute("align","center");
   r.setAttribute("id",t[j]);
   d = document.createElement("td");
   d.setAttribute("align","right");
   d.setAttribute("style","padding-right:5px");
   d.colspan = 2;
   d.innerHTML = "<b>"+n[j]+"</b>";
   r.appendChild(d);
   v = getBaseTypeValues(t[j]);
   for(i=0;i<=32;i++){
     d = document.createElement("td");
     if(i!=22) d.innerHTML ="<input type='text' size='1.5' value='"+v[i]+"'>";
     r.appendChild(d);
   }
   document.getElementsByTagName('table')[5].firstChild.appendChild(r);
 }
 r = document.createElement("center");
 r.setAttribute("style","padding-left:0px;margin-top:-4px;");
 d = document.createElement("input");
 d.setAttribute("type","button");
 d.setAttribute("value","Cancel");
 d.setAttribute("id","Cancel");
 d.setAttribute("style","margin-right:12px;");
 r.appendChild(d);
 d.addEventListener('click',function(event){window.location=window.location.href.replace("&mode=edit","");},true);
 d = document.createElement("input");
 d.setAttribute("type","button");
 d.setAttribute("value","Save");
 d.setAttribute("id","save");
 r.appendChild(d);
 d.addEventListener('click',function(event){saveNewBaseTypeValues();window.location=window.location.href.replace("&mode=edit","");},true);
 document.body.appendChild(r);
}

function saveNewBaseTypeValues(){
 var i,a;
 var r = document.evaluate(
   "//tr[@id='1' or @id='2' or @id='3' or @id='4' or @id='5']",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 for(var j=0;j<r.snapshotLength;j++){
   a = [];
   for(i=1;i<r.snapshotItem(j).childNodes.length;i++){
     if(i!=23) a[i-1]=r.snapshotItem(j).childNodes[i].firstChild.value;
     else a[i-1]="-1";
   }
   saveBaseTypeValues(a,r.snapshotItem(j).getAttribute("id"));
 }
}

/*******************
 Credits History
*******************/
function sumCreditsPage(){
 var regex = /<td>(.+?)<\/td><td>(.\d+?)<\/td>/ig;
 var source = document.body.innerHTML, result, debris = 0, income = 0, otherIncome = 0, pillage = 0, loss = 0, production = 0, construction = 0,research = 0; tradeRoutes = 0, plunderedRoutes = 0, goodsSale = 0, shipRepair = 0;
 do{
   result = regex.exec(source);
   if(result){
     if(result[1].indexOf('Pillage of') !== -1) pillage += parseInt(result[2]);
     else if(result[1].indexOf('Empire Income') !== -1) income += parseInt(result[2]);
		   else if(result[1].indexOf('Debris Collect') !== -1) debris += parseInt(result[2]);
     else if(result[1].indexOf('Production') !== -1 || result[1].indexOf('production') !== -1) production += parseInt(result[2]);
     else if(result[1].indexOf('Construction') !== -1 || result[1].indexOf('construction') !== -1) construction += parseInt(result[2]);
     else if(result[1].indexOf('Research of') !== -1 || result[1].indexOf('research of') !== -1) research += parseInt(result[2]);
     else if(result[1].indexOf('New trade route') !== -1) tradeRoutes += parseInt(result[2]);
   		else if(result[1].indexOf('Plunder of trade route') !== -1) plunderedRoutes += parseInt(result[2]);
    	else if(result[1].indexOf('Sale of') !== -1) goodsSale += parseInt(result[2]);
     else if(result[1].indexOf('Repair of') !== -1) shipRepair += parseInt(result[2]);
     else if(parseInt(result[2]) > 0) otherIncome += parseInt(result[2]);
     else loss += parseInt(result[2]);
   }
  }
  while(result)
    var html = "<table style='margin:0 auto;' cellpadding=3><tr><th align='center' colspan=5>Credit Summary<br>&nbsp;</th></tr>"+
	    "<tr><td>Income:</td><td align='right'>"+commaFormat(income)+"</td><td>&nbsp;</td><td>Production:</td><td align='right'>"+commaFormat(production)+"</td></tr>"+
	   	"<tr><td>Debris Collect:</td><td align='right'>"+commaFormat(debris)+"</td><td>&nbsp;</td><td>Construction:</td><td align='right'>"+commaFormat(construction)+"</td></tr>"+
	    "<tr><td>Pillage:</td><td align='right'>"+commaFormat(pillage)+"</td><td>&nbsp;</td><td>Research:</td><td align='right'>"+commaFormat(research)+"</td></tr>"+
	   	"<tr><td>Plundered Trade Routes:</td><td align='right'>"+commaFormat(plunderedRoutes)+"</td><td>&nbsp;</td><td>New Trade Routes:</td><td align='right'>"+commaFormat(tradeRoutes)+"</td></tr>"+
	   	"<tr><td>Sale of goods:</td><td align='right'>"+commaFormat(goodsSale)+"</td><td>&nbsp;</td><td>Ship Repair</td><td align='right'>"+commaFormat(shipRepair)+"</td></tr>"+
	    "<tr><td>Other Income:</td><td align='right'>"+commaFormat(otherIncome)+"</td><td>&nbsp;</td><td>Other Expenditures:</td><td align='right'>"+commaFormat(loss)+"</td></tr>"+
	    "<tr><td colspan=2 align='right'><br>Total In/Out:</td><td style='font-weight:700;'><br>"+commaFormat((income+debris+pillage+goodsSale+production+construction+research+tradeRoutes+plunderedRoutes+shipRepair+otherIncome+loss))+"</td><td colspan=2>&nbsp;</td></tr>"+
	    "</table>&nbsp;";
  document.getElementById('credits_table_inside').parentNode.innerHTML = html + document.getElementById('credits_table_inside').parentNode.innerHTML;
}

/****************
  Fleet
****************/
var supportShips = ["Recycler","Scout Ship","Outpost Ship","Carrier","Fleet Carrier"];
var attackShips = ["Fighters","Bombers","Heavy Bombers","Ion Bombers","Corvette","Destroyer","Frigates","Ion Frigate","Cruiser","Heavy Cruiser","Battleship","Dreadnought","Titan","Leviathan","Death Star"];
var availableShips = [];

function setAvailableShips(){
  var ships = document.evaluate(
	 "//td/b",
	 document,
	 null,
	 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	 null);
  for(var i=0;i<ships.snapshotLength;i++){
    availableShips[i] = ships.snapshotItem(i).textContent;
  }
}

function isAvailableShip(ship){
  for(var i=0;i<availableShips.length;i++){
    if(ship == availableShips[i]) return true;
  }
  return false;
}

function createSupportMovementHref(){
  var href = "javascript:";
  for(var i=0;i<supportShips.length;i++){
    if(isAvailableShip(supportShips[i])) href = href + "maxquant('"+supportShips[i]+"');";
  }
  for(var i=0;i<attackShips.length;i++){
    if(isAvailableShip(attackShips[i])) href = href + "zero('"+attackShips[i]+"');";
  }
  return href;
}

function createAttackMovementHref(includeFighters){
  var href = "javascript:",i;
  for(i=0;i<supportShips.length;i++){
    if(isAvailableShip(supportShips[i])) href = href + "zero('"+supportShips[i]+"');";
  }
  i=0;
  if(!includeFighters){
    href = href+"javascript:zero('Fighters');";
    i = 1;
  }
  for(i;i<attackShips.length;i++){
    if(isAvailableShip(attackShips[i])) href = href + "maxquant('"+attackShips[i]+"');";
  }
  return href;
}

function createAllMovementNoFTHref(){
  var href = "javascript:",i;
  href = href+"javascript:zero('Fighters');";
  for(i=0;i<supportShips.length;i++){
    if(isAvailableShip(supportShips[i])) href = href + "maxquant('"+supportShips[i]+"');";
  }
  for(i=1;i<attackShips.length;i++){
    if(isAvailableShip(attackShips[i])) href = href + "maxquant('"+attackShips[i]+"');";
  }
  return href;
}

function insertMoveFleetLinks(){
  setAvailableShips();
  var allNoFTHref = createAllMovementNoFTHref();
  var supportHref = createSupportMovementHref();
  var attackHref = createAttackMovementHref(true);
  var attackNoFTHref = createAttackMovementHref(false);
  var cell = document.evaluate(
  "//a[text()='All']",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null).singleNodeValue.parentNode;
  var noneLink = cell.childNodes[2];
  cell.removeChild(noneLink);
  cell.innerHTML = cell.innerHTML+' <a href="'+allNoFTHref+'">all(no FT)</a> - <a href="'+supportHref+'">support</a> - <a href="'+attackHref+'">attack</a> - <a href="'+attackNoFTHref+'">attack(no FT)</a> - ';
  cell.setAttribute("colspan","3");
  cell.parentNode.removeChild(cell.nextSibling);
  cell.parentNode.removeChild(cell.previousSibling);
  cell.appendChild(noneLink);
}

function insertMoveIncrements(){
 var a = document.evaluate(
   "//input[@type='text']",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null),b;
 for(var i=1;i<a.snapshotLength;i++){
   b = document.createElement('a');
   b.href='javascript:update("'+a.snapshotItem(i).name+'");';
   b.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;margin-right:3px;');
   b.setAttribute('id','decrement-'+a.snapshotItem(i).name);
   b.innerHTML='-';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id)},true);
   b = document.createElement('a');
   b.href='javascript:update("'+a.snapshotItem(i).name+'");';
   b.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;margin-right:3px;');
   b.setAttribute('id','zero-'+a.snapshotItem(i).name);
   b.innerHTML='0';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id)},true);
   b = document.createElement('a');
   b.href='javascript:update("'+a.snapshotItem(i).name+'");';
   b.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;margin-right:6px;');
   b.setAttribute('id','increment-'+a.snapshotItem(i).name);
   b.innerHTML='+';
   a.snapshotItem(i).parentNode.insertBefore(b,a.snapshotItem(i));
   b.addEventListener('click',function(){incrementMove(this.id)},true);
 }
}

function incrementMove(s){
 if(s.split('-')[0]=='increment') document.getElementById('quant'+s.split('-')[1]).value=Math.min(parseInt(document.getElementById('avail'+s.split('-')[1]).innerHTML),((isNaN(parseInt(document.getElementById('quant'+s.split('-')[1]).value))?0:parseInt(document.getElementById('quant'+s.split('-')[1]).value))+1));
 else if(s.split('-')[0]=='zero') document.getElementById('quant'+s.split('-')[1]).value='';
 else if(parseInt(document.getElementById('quant'+s.split('-')[1]).value)>0) document.getElementById('quant'+s.split('-')[1]).value=parseInt(document.getElementById('quant'+s.split('-')[1]).value)-1;
 document.getElementById('quant'+s.split('-')[1]).focus();
}

function insertMoveDefault(){
 var a = document.evaluate(
   "//input[@type='text']",
   document,
   null,
   XPathResult.FIRST_ORDERED_NODE_TYPE,
   null).singleNodeValue;
 var b=a.value,c;
 c = document.createElement('a');
 c.href='javascript:calc_distance();';
 c.setAttribute('style','margin-right:6px;font-size:11px;');
 c.innerHTML='Start';
 a.parentNode.insertBefore(c,a);
 c.addEventListener('click',function(){a.value=b;a.setAttribute('style','');},true);
 c = document.createElement('a');
 c.href='javascript:calc_distance();';
 c.setAttribute('style','margin-left:6px;font-size:11px;');
 if(getSetting('defaultMoveDestination','')=='') c.innerHTML='Set&nbsp;Default';
 else{
   c.innerHTML='Clear&nbsp;Default';
   a.value=getSetting('defaultMoveDestination','');
   a.setAttribute('style','border-color:red;');
 }
 a.parentNode.appendChild(c);
 c.addEventListener('click',function(){
   if(c.innerHTML=='Set&nbsp;Default'){
     setSetting('defaultMoveDestination',a.value);
     c.innerHTML='Clear&nbsp;Default';
     a.setAttribute('style','border-color:red;');
   }else{
     setSetting('defaultMoveDestination','');
     c.innerHTML='Set&nbsp;Default';
     a.setAttribute('style','');
   }
 },true);
 window.setTimeout('calc_distance()',0);
}

function insertSetAsDefaultDest(){
 var a = document.evaluate(
   "//a[contains(@href,'bookmarks.aspx?action=add')]",
   document,
   null,
   XPathResult.FIRST_ORDERED_NODE_TYPE,
   null).singleNodeValue;
 var b = document.createElement('a');
 b.href='javascript:void(1);';
 b.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;font-size:11px;position:relative;top:7px;');
 b.innerHTML='Set as Default Destination';
 a.parentNode.appendChild(document.createElement('br'));
 a.parentNode.appendChild(b);
 b.addEventListener('click',function(){setSetting('defaultMoveDestination',a.href.split('=')[2]);},false);
}

/********************
 Sum Single Fleet
********************/
function sumSingleFleet(){
	var r,f=t=0;
	do{
		r = /<td><b>(.*?)<\/b><\/td><td align=.*?>([^<]*?)<\/td>/ig.exec(document.body.innerHTML);
		if(r){
			t+=shipValues[getShipIndex(r[1])]*parseFloat(r[2]);
			if(isFightingShip(getShipIndex(r[1]))) f+=shipValues[getShipIndex(r[1])]*parseFloat(r[2]);
		}
	}
	while(r)
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.innerHTML += "<table style='border-width:2px 0 0 0;background-image:none;width:100%;'><tr><td style='padding:6px 12px 4px;'><b>Fighting Size</b></td><td style='padding:6px 12px 4px;' align='right'>"+commaFormat(f)+"</td></tr><tr><td style='padding:4px 12px;'><b>Total Size</b></td><td style='padding:4px 12px;' align='right'>"+commaFormat(t)+"</td></tr></table>";
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.firstChild.cellPadding='1';
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.firstChild.firstChild.firstChild.childNodes[1].innerHTML='&nbsp;';
 document.getElementById('fleet_overview').firstChild.lastChild.firstChild.style.padding='4px 12px';
}

/*
==========================================
Sum Fleets
==========================================
*/
var fleetData = new Array(); //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function sumFleets()
{
    var rows = window.location.href.indexOf('base.aspx?base=')!=-1 ? document.getElementById('base_fleets') : document.getElementById('map_fleets');
    if(!rows) return;
    rows = rows.firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
    var formatNumbers = getSetting('config_formatNumbers',false);
    var addFleets = getSetting('config_sumFleets',true);
    var now = new Date(), future = new Date();
    for(var i=1;i<rows.length;i++)
    {
        var row = rows[i];
        var size = parseInt(row.childNodes[3].firstChild.textContent);
        if(formatNumbers)
        row.childNodes[3].firstChild.textContent = commaFormat(size);
        if(addFleets)
        {
            var player = row.childNodes[1].firstChild.textContent;
            var arrivalTimeCell = row.childNodes[2];
            var guild = getGuild(player);
            var incoming = (arrivalTimeCell.childNodes.length > 0);
            var incomingToday = false;
            row.setAttribute("guild",guild);
            if((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) >= 0) )
            {
                var time = arrivalTimeCell.title;
                future.setTime(now.getTime() + (time * 1000));
                incomingToday = (future.getDate() - now.getDate() == 0);
            }
            var incomingSize = incoming? size:0;
            var incomingTodaySize = incomingToday? size:0;
            addFleetSize(guild,size,incomingSize,incomingTodaySize);
        }
    }
    if(addFleets)
    {
        if(guildSummed)
        insertFleetSummary();
    }
}
function addFleetSize(guild,size,incomingSize,incomingTodaySize)
{
    for(var i=0;i<fleetData.length;i++)
    {
        if(fleetData[i][0]==guild)
        {
            if(incomingSize==0)
            fleetData[i][1] = (fleetData[i][1] + size);
            fleetData[i][2] = (fleetData[i][2] + incomingSize);
            fleetData[i][3] = (fleetData[i][3] + incomingTodaySize);
            guildSummed = true;
            return;
        }
    }
    if(incomingSize==0)
    fleetData[fleetData.length] = new Array(guild,size,0,0);
    else
    fleetData[fleetData.length] = new Array(guild,0,incomingSize,incomingTodaySize);
}

function insertFleetSummary()
{
    var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
    var style="";
    var incoming,arrived,incomingToday,total;
    var formatNumbers = getSetting('config_formatNumbers',false);
    for(var i=0;i<fleetData.length;i++)
    {
        incoming = fleetData[i][2];
        arrived = fleetData[i][1];
        total = fleetData[i][1] + fleetData[i][2];
        incomingToday = fleetData[i][3];
        var color = getHighlightColorForPlayer(getPlayerName(fleetData[i][0]));
        if(color==null)
        color = getHighlightColorForGuild(fleetData[i][0]);
        if(getSetting('config_highlightPlayers',true))
        style = "style='color:"+color+"'";
        if(formatNumbers)
        {
            incoming = commaFormat(incoming);
            arrived = commaFormat(arrived);
            incomingToday = commaFormat(incomingToday);
            total = commaFormat(total);
        }
        html = html+"<tr align='center' "+style+"><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+"</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript: void(0)'>Hide</a></td></tr>";
    }
    var newTable = document.createElement("table");
    newTable.setAttribute("width","600");
    newTable.setAttribute("align","center");
    newTable.innerHTML = html;
    var table = window.location.href.indexOf('base.aspx?base=')!=-1 ? document.getElementById('base_fleets') : document.getElementById('map_fleets');
    document.body.insertBefore(newTable,table);
    var br = document.createElement("br");
    document.body.insertBefore(br,table);
    for(var i=0;i<fleetData.length;i++)
    {
        var link = document.getElementById("showHide"+fleetData[i][0]);
        link.addEventListener('click',getShowHideFleetClosure(fleetData[i][0]),true);
    }
}




function getShowHideFleetClosure(guild)
{
    function func(){
        toggleFleetVisibility(guild);
    }
    ;
    return func;
}
function toggleFleetVisibility(guild)
{
    var guildRows = document.evaluate(
    "//tr[@guild='"+guild+"']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
    for (var i = 0; i < guildRows.snapshotLength; i++)
    {
        var row = guildRows.snapshotItem(i);
        row.style.display = (row.style.display=="none")? "":"none";
        row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
    }
    var link = document.getElementById("showHide"+guild);
    link.textContent= (link.textContent=="Show")? "Hide":"Show";
    //document.body.scrollTop += 200;
}


/*
==========================================
Calculate Depart Time & Fleet reminders
==========================================
*/
function insertArriveTimeTextBox(){
	
	var moveButton = document.evaluate(
    "//input[@value='Move']",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
	
	var th = moveButton.parentNode.parentNode.nextSibling.firstChild;
	
	var textBox = document.createElement("input");
	textBox.setAttribute("class","quant");
	textBox.setAttribute("type","text");
	textBox.setAttribute("style","width:200px;margin-top:5px;margin-bottom:5px;");
	textBox.setAttribute("id","arrivalTime");
	textBox.value = getCurrentServerTime()[1];
	th.appendChild(textBox);
	
	var calculateButton = document.createElement("input");
	calculateButton.setAttribute("value","Calculate Depart Time");
	calculateButton.setAttribute("type","submit");
	calculateButton.setAttribute("id","calculateButton");
	calculateButton.setAttribute("style","margin-left:5px;margin-top:5px;margin-bottom:5px;");
	th.appendChild(calculateButton);
	
	document.getElementById("calculateButton").addEventListener("click",function(event){getLaunchTime();},true);
	document.getElementById("duration").addEventListener("click",function(event){getLaunchTime();},true);
	
	
	var departDateSpan = document.createElement("span");
	departDateSpan.setAttribute("id","departDateSpan");
		
		
	document.getElementById("calculateButton").parentNode.appendChild(departDateSpan);
		
}

function getLaunchTime(){

	try{
		
		var departDate = calculateLaunchTime();
		
	
		resultString = (zeroPad(departDate.getDate()) +"-"+ zeroPad(departDate.getMonth()) +"-"+ departDate.getFullYear() +" "+ zeroPad(departDate.getHours()) +":"+ zeroPad(departDate.getMinutes()) +":"+ zeroPad(departDate.getSeconds()));
		
		var departDateSpan = document.getElementById("departDateSpan");
			departDateSpan.innerHTML = "<br/>Depart Time: "+resultString;
			
		//var launchTime = arrivalTime - (travelSeconds * 1000)

		if(getSetting('config_fleetReminders',true))
		{
			var reminderButton = document.getElementById("setReminder");
			
			if(reminderButton == null)
			{
				reminderButton = document.createElement("input");
				reminderButton.setAttribute("id","setReminder");
				reminderButton.setAttribute("type","button");
				reminderButton.setAttribute("value","Set Reminder");	
				reminderButton.setAttribute("style","margin-left:5px;");
				
				departDateSpan.parentNode.appendChild(reminderButton);
				document.getElementById("setReminder").addEventListener("click",function(event){saveReminder();},true);
			}
		}
	}
	catch(e)
	{
		notify(e,MESSAGE_CLASS_ERROR);
		return;
	}
	
}

function calculateLaunchTime(){

	var currentTime = getCurrentServerTime()[1];
	var durationString = document.getElementById('duration').textContent;
	var arrivalString = document.getElementById('arrivalTime').value;

	
	if(durationString =="")
	{
		throw "No duration. Set fleet and destination.";
	}
	
	var durationSeconds = getSeconds(durationString);
	var arrivalDate = getDateObject(arrivalString);
	
	var departDate = new Date();
	departDate.setTime(arrivalDate.getTime() - (durationSeconds * 1000));
	
	return departDate;
	
}

function saveReminder(){
	try{
		
		var departDate = calculateLaunchTime();
		
		
		setSetting("FleetReminders",""+departDate.getTime());
		notify("Launch reminder set");
	}
	catch(e)
	{
		notify(e,MESSAGE_CLASS_ERROR);
	}



}

function insertFleetReminderCountdowns(){

	var departDateString = getSetting("FleetReminders","-");
	if(departDateString == "-") return;
		
	var departDate = new Date();
	departDate.setTime(parseInt(departDateString));
	
	
	var currentTime = getDateObject(getCurrentServerTime()[1]);
	var timeRemaining = (departDate.getTime() - currentTime.getTime())/1000;
	
	if(timeRemaining > 0){
		var id = unsafeWindow.q ==undefined? 1:unsafeWindow.q+1;
		var countDownDiv = document.createElement("div");
		countDownDiv.innerHTML = "<span style='font-size: 8pt;'>Launch Reminder: "+getDateString(departDate)+"</span> <span style='font-size: 8pt;' title='"+timeRemaining+"' id='time"+(id)+"'>-</span>";
		document.body.firstChild.appendChild(countDownDiv);
	}
	else{
		setSetting("FleetReminders","-");
	}
	
	if(unsafeWindow.t == undefined){
		localTFunction();
	}
}

/***************************
 Construction / Production
***************************/
function insertProductionPresetsButtons(){
 var i,t=document.getElementById('row1').parentNode.parentNode;
 if(!t) return;
 t.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML='';
 t.lastChild.firstChild.childNodes[5].innerHTML='<a id="presetButton0" href="javascript:void(0);" style="position:relative;top:2px;border:0;font:500 10px verdana,arial;">CLEAR&nbsp;ALL</a><br><a id="fillHangars" href="javascript:void(0)" style="position:relative;top:16px;border:0;font:500 10px verdana,arial;">Fill&nbsp;hangar&nbsp;space</a>';
 GM_addStyle('#gm_update_alert_buttons{text-align:center;margin:10px 10px 18px 10px;font:500 10px verdana,arial;position:relative;}#gm_update_alert_buttons A{border:1px solid #9999FF;background-color:#000066;padding:1px 4px;}')
 var b = document.createElement("div");
 b.id="gm_update_alert_buttons";
 for(i=1;i<9;i++){
  b.innerHTML+='<a id="presetButton'+i+'" href="javascript:void(0)" style="font-size:11px;">'+getSetting("PRESET_"+i+"_NAME",DEFAULT_PRESET_NAME[i-1])+'</a>&nbsp;&nbsp;';
 }
 b.innerHTML+='<a id="presetButtonS" href="javascript:void(0);" style="position:absolute;right:38px;padding:2px 6px;">SUBMIT</a>';
 t.parentNode.parentNode.parentNode.firstChild.firstChild.appendChild(b);
 for(i=1;i<9;i++){
   if(document.getElementById('presetButton'+i).innerHTML=='') document.getElementById('presetButton'+i).style.display='none';
 }
 document.getElementById('presetButton1').addEventListener('click',function(event){applyProductionPreset(1)},true);
 document.getElementById('presetButton2').addEventListener('click',function(event){applyProductionPreset(2)},true);
 document.getElementById('presetButton3').addEventListener('click',function(event){applyProductionPreset(3)},true);
 document.getElementById('presetButton4').addEventListener('click',function(event){applyProductionPreset(4)},true);
 document.getElementById('presetButton5').addEventListener('click',function(event){applyProductionPreset(5)},true);
 document.getElementById('presetButton6').addEventListener('click',function(event){applyProductionPreset(6)},true);
 document.getElementById('presetButton7').addEventListener('click',function(event){applyProductionPreset(7)},true);
 document.getElementById('presetButton8').addEventListener('click',function(event){applyProductionPreset(8)},true);
 document.getElementById('presetButtonS').addEventListener('click',function(event){document.forms[1].submit();},true);
 document.getElementById('presetButton0').addEventListener('click',function(event){document.forms[1].reset();onProductionTextBoxReset();},true);
	document.getElementById('fillHangars').addEventListener('click',function(event){queueFullHangarSpace()},true);
 b = document.createElement("td");
 b.innerHTML = '<div id="gm_update_alert_buttons"><a id="setButton1" href="javascript:void(0)">Set Preset 1</a>&nbsp;&nbsp;<a id="setButton2" href="javascript:void(0)">Set Preset 2</a>&nbsp;&nbsp;<a id="setButton3" href="javascript:void(0)">Set Preset 3</a>&nbsp;&nbsp;<a id="setButton4" href="javascript:void(0)">Set Preset 4</a>&nbsp;&nbsp;<a id="setButton5" href="javascript:void(0)">Set Preset 5</a>&nbsp;&nbsp;<a id="setButton6" href="javascript:void(0)">Set Preset 6</a>&nbsp;&nbsp;<a id="setButton7" href="javascript:void(0)">Set Preset 7</a>&nbsp;&nbsp;<a id="setButton8" href="javascript:void(0)">Set Preset 8</a><div class="help comment" style="margin-top:6px;">Enter ship preset quantities before you set the preset name.<br>Clear the name to remove a preset button.</div></div>';
 t.parentNode.parentNode.parentNode.appendChild(document.createElement('tr'));
 t.parentNode.parentNode.parentNode.lastChild.appendChild(b);
 document.getElementById('setButton1').addEventListener('click',function(event){saveProductionPreset(1)},true);
 document.getElementById('setButton2').addEventListener('click',function(event){saveProductionPreset(2)},true);
 document.getElementById('setButton3').addEventListener('click',function(event){saveProductionPreset(3)},true);
 document.getElementById('setButton4').addEventListener('click',function(event){saveProductionPreset(4)},true);
 document.getElementById('setButton5').addEventListener('click',function(event){saveProductionPreset(5)},true);
 document.getElementById('setButton6').addEventListener('click',function(event){saveProductionPreset(6)},true);
 document.getElementById('setButton7').addEventListener('click',function(event){saveProductionPreset(7)},true);
 document.getElementById('setButton8').addEventListener('click',function(event){saveProductionPreset(8)},true);
}

function applyProductionPreset(p){
 var a;
 switch(p){
   case 1:{a = getSetting("PRESET_1_VALUE",DEFAULT_PRESET_1).split(",");break;}
   case 2:{a = getSetting("PRESET_2_VALUE",DEFAULT_PRESET_2).split(",");break;}
   case 3:{a = getSetting("PRESET_3_VALUE",DEFAULT_PRESET_3).split(",");break;}
   case 4:{a = getSetting("PRESET_4_VALUE",DEFAULT_PRESET_4).split(",");break;}
   case 5:{a = getSetting("PRESET_5_VALUE",DEFAULT_PRESET_5).split(",");break;}
   case 6:{a = getSetting("PRESET_6_VALUE",DEFAULT_PRESET_6).split(",");break;}
   case 7:{a = getSetting("PRESET_7_VALUE",DEFAULT_PRESET_7).split(",");break;}
   case 8:{a = getSetting("PRESET_8_VALUE",DEFAULT_PRESET_8).split(",");break;}
 }
 for(var i=0;i<a.length;i++){
			if(document.getElementById('quant'+PRESET_KEYS[i])) document.getElementById('quant'+PRESET_KEYS[i]).value = (parseInt(a[i])>0)?parseInt(a[i]):null;
 }
 if(document.getElementById('quantFighters')) document.getElementById('quantFighters').focus();
 else document.getElementById('quantGoods').focus();
 onProductionTextBoxKeyUp();
}

function saveProductionPreset(p){
 var a = [],b = prompt("Enter preset "+p+" name.");
 if(b == null) return;
 for(var i=0;i<PRESET_KEYS.length;i++){
			if(document.getElementById('quant'+PRESET_KEYS[i]) && parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value)>0) a[i]=parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value);
		 else a[i]=0;
 }
 switch(p){
   case 1:{setSetting("PRESET_1_VALUE",a.join());setSetting("PRESET_1_NAME",b);document.getElementById('presetButton1').innerHTML = b;document.getElementById('presetButton1').style.display=(b!='')?'inline':'none';break;}
   case 2:{setSetting("PRESET_2_VALUE",a.join());setSetting("PRESET_2_NAME",b);document.getElementById('presetButton2').innerHTML = b;document.getElementById('presetButton2').style.display=(b!='')?'inline':'none';break;}
   case 3:{setSetting("PRESET_3_VALUE",a.join());setSetting("PRESET_3_NAME",b);document.getElementById('presetButton3').innerHTML = b;document.getElementById('presetButton3').style.display=(b!='')?'inline':'none';break;}
   case 4:{setSetting("PRESET_4_VALUE",a.join());setSetting("PRESET_4_NAME",b);document.getElementById('presetButton4').innerHTML = b;document.getElementById('presetButton4').style.display=(b!='')?'inline':'none';break;}
   case 5:{setSetting("PRESET_5_VALUE",a.join());setSetting("PRESET_5_NAME",b);document.getElementById('presetButton5').innerHTML = b;document.getElementById('presetButton5').style.display=(b!='')?'inline':'none';break;}
   case 6:{setSetting("PRESET_6_VALUE",a.join());setSetting("PRESET_6_NAME",b);document.getElementById('presetButton6').innerHTML = b;document.getElementById('presetButton6').style.display=(b!='')?'inline':'none';break;}
   case 7:{setSetting("PRESET_7_VALUE",a.join());setSetting("PRESET_7_NAME",b);document.getElementById('presetButton7').innerHTML = b;document.getElementById('presetButton7').style.display=(b!='')?'inline':'none';break;}
   case 8:{setSetting("PRESET_8_VALUE",a.join());setSetting("PRESET_8_NAME",b);document.getElementById('presetButton8').innerHTML = b;document.getElementById('presetButton8').style.display=(b!='')?'inline':'none';break;}
 }
	notify(b+" preset "+p+" saved.");
}

function queueFullHangarSpace(){
	if(!document.getElementById('quantFighters')) return;
 var a=0,b=[0,0,0,0,0,0,0,4,4,0,0,4,60,8,40,400,200,1000,4000,10000];
	for(var i=7;i<PRESET_KEYS.length;i++){
		if(document.getElementById('quant'+PRESET_KEYS[i]) && parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value)>0) a+=parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value)*b[i];
	}
 if(document.getElementById('quantBombers') && parseInt(document.getElementById('quantBombers').value)>0) a-=parseInt(document.getElementById('quantBombers').value);
 if(document.getElementById('quantHeavy Bombers') && parseInt(document.getElementById('quantHeavy Bombers').value)>0) a-=parseInt(document.getElementById('quantHeavy Bombers').value)*2;
 if(document.getElementById('quantIon Bombers') && parseInt(document.getElementById('quantIon Bombers').value)>0) a-=parseInt(document.getElementById('quantIon Bombers').value)*2;
 if(a<0){alert('Not enough hanger space with bombers included.');return;}
	document.getElementById('quantFighters').value = a;
	onProductionTextBoxKeyUp();
}

function enableProductionPage(){
 var a = document.createElement('a');
 a.setAttribute('id','enableProductionPage');
 a.setAttribute('title','Production page for ALL bases');
 a.href='javascript:void(1);';
 a.setAttribute('style','padding:0 3px 1px;margin-left:8px;border:1px solid #9999FF;background-color:#000066;');
 a.innerHTML='&amp;';
 document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild.childNodes[5].appendChild(a);
 a.addEventListener('click',function(){allProductionPage();},true);
}

function allProductionPage(){
 var a,b = [[1,'+1'],[10,'+10'],[100,'+100'],[1000,'+1k']];
 document.getElementById('empire_events').firstChild.firstChild.firstChild.innerHTML='<font size="+1">A</font>LL PRODUCTION PAGE';
 var r = document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
 r[0].childNodes[0].innerHTML = 'Base';
 r[0].removeChild(r[0].childNodes[1]);
 r[0].removeChild(r[0].childNodes[1]);
 r[0].childNodes[1].innerHTML = 'Current Queue';
 r[0].childNodes[2].innerHTML = 'Unit Type';
 r[0].childNodes[3].innerHTML = 'Quantity';
 r[0].childNodes[4].innerHTML = 'Fast Prod';
 for (i=1;i<r.length;i=i+2) {
   r[i].style.verticalAlign='top';
   r[i].childNodes[0].setAttribute('style','text-align:left;padding-left:5%;');
   r[i].childNodes[0].innerHTML+='<br>&nbsp;&nbsp;&nbsp;- <small>('+r[i].childNodes[1].innerHTML+')</small>';
   r[i].removeChild(r[i].childNodes[1]);
   r[i].removeChild(r[i].childNodes[1]);
	  r[i].childNodes[1].innerHTML = r[i].childNodes[3].innerHTML + "<br />" + r[i+1].childNodes[3].innerHTML.split('<br>')[0];
   r[i].childNodes[2].innerHTML = "<select name='unit' id='unit_"+r[i].childNodes[0].firstChild.href.split('=')[1]+"'><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option><option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option><option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option><option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option><option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option><option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option><option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option></select>";
   r[i].childNodes[3].innerHTML = "<input type='text' name='quant' class='quant' id='quant_"+r[i].childNodes[0].firstChild.href.split('=')[1]+"' size='5' maxlength='5' value='0'>";
   r[i].childNodes[4].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+r[i].childNodes[0].firstChild.href.split('=')[1]+"'>";
	  r[i+1].style.display='none';
   document.getElementById("unit_"+r[i].childNodes[0].firstChild.href.split('=')[1]).addEventListener('change',function(){allProductionTotal();},true);
   document.getElementById("quant_"+r[i].childNodes[0].firstChild.href.split('=')[1]).addEventListener('change',function(){allProductionTotal();},true);
   document.getElementById("fast_"+r[i].childNodes[0].firstChild.href.split('=')[1]).addEventListener('change',function(){allProductionTotal();},true);
   r[i].childNodes[3].firstChild.style.marginRight='3px';
   for(c=0; c<4; c++) {
     a = document.createElement("a");
   		a.href = "javascript:void(1)";
     a.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:1px 3px 2px;margin-left:3px;font-size:10px;position:relative;top:-1px;');
   		a.id=i+'-'+b[c][0];
   		a.innerHTML=b[c][1];
     r[i].childNodes[3].appendChild(a);
     a.addEventListener('click',function(){this.parentNode.firstChild.value=parseInt(this.parentNode.firstChild.value)+parseInt(this.id.split('-')[1]);allProductionTotal();},true);
   }
 }
	document.getElementById('empire_events').firstChild.lastChild.firstChild.innerHTML = "0 credits";
 document.getElementById('empire_events').firstChild.appendChild(document.createElement("tr"));
 document.getElementById('empire_events').firstChild.lastChild.appendChild(document.createElement("td"));
 document.getElementById('empire_events').firstChild.lastChild.firstChild.setAttribute('style','text-align:center;padding-bottom:8px;');
 a = document.createElement("input");
 a.type = "reset";
 document.getElementById('empire_events').firstChild.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){allProductionTotal('1');},true);
 a = document.createElement("input");
 a.type = "submit";
 a.style.marginLeft='6px';
 document.getElementById('empire_events').firstChild.lastChild.firstChild.appendChild(a);
 a.addEventListener('click',function(){postAllProductions();},true);
}

function allProductionTotal(r){
 var a = document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
 var p = [5,10,30,60,20,30,40,80,120,40,100,200,400,500,2000,2500,10000,50000,200000,500000];
	var c = 0;
 for (var i=1;i<a.length;i=i+2) {
   if(r && r=='1'){
     document.getElementById("unit_"+a[i].childNodes[0].firstChild.href.split('=')[1]).selectedIndex = 0;
     document.getElementById("fast_"+a[i].childNodes[0].firstChild.href.split('=')[1]).checked = false;
     document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value = 0;
     document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).style.backgroundColor = '#000064';
   }
   else c += parseInt(p[document.getElementById("unit_"+a[i].childNodes[0].firstChild.href.split('=')[1]).selectedIndex] * document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value * ((document.getElementById("fast_"+a[i].childNodes[0].firstChild.href.split('=')[1]).checked)?2:1));
	}
	document.getElementById('empire_events').firstChild.childNodes[2].firstChild.innerHTML = c+' credits';
	document.getElementById('empire_events').firstChild.childNodes[2].firstChild.style.color = ((parseInt(document.getElementById('credits').nextSibling.innerHTML.replace(/(,| |\.)/g,""))-c)<0)?'red':'';
}

function postAllProductions(){
 var a = document.getElementById('empire_events').firstChild.childNodes[1].firstChild.firstChild.firstChild.childNodes;
 for(var i=1;i<a.length;i=i+2){
   if(isNaN(document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value) || parseInt(document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value)<1){
     document.getElementById('quant_'+a[i].childNodes[0].firstChild.href.split('=')[1]).value='-';
     document.getElementById('quant_'+a[i].childNodes[0].firstChild.href.split('=')[1]).style.backgroundColor='black';
   }else{
     GM_xmlhttpRequest({
       method: "POST",
       url: a[i].childNodes[0].firstChild.href+'&view=production',
       data: escape(document.getElementById("unit_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value)+"="+document.getElementById("quant_"+a[i].childNodes[0].firstChild.href.split('=')[1]).value+"&post_back=true"+((document.getElementById("fast_"+a[i].childNodes[0].firstChild.href.split('=')[1]).checked)?'&fast=true':''),
       headers:{'Content-type':'application/x-www-form-urlencoded'},
    	 	onload: function(responseDetails){
         document.getElementById('quant_'+responseDetails.finalUrl.split('=')[1].split('&')[0]).value='OK';
         document.getElementById('quant_'+responseDetails.finalUrl.split('=')[1].split('&')[0]).style.backgroundColor='green';
       },
    	 	onerror: function(responseDetails){
         document.getElementById('quant_'+responseDetails.finalUrl.split('=')[1].split('&')[0]).value='ERROR';
         document.getElementById('quant_'+responseDetails.finalUrl.split('=')[1].split('&')[0]).style.backgroundColor='red';
       }
     });
   }
 }
}

function onProductionTextBoxKeyUp(){
 var c=t=0;
 for(var i=0;i<PRESET_KEYS.length;i++){
			if(document.getElementById('quant'+PRESET_KEYS[i]) && parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value)>0){
     t+=getSeconds(document.getElementById('quant'+PRESET_KEYS[i]).parentNode.parentNode.childNodes[4].textContent)*parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value);
     c+=(parseInt(document.getElementById('quant'+PRESET_KEYS[i]).parentNode.parentNode.childNodes[2].textContent)*parseInt(document.getElementById('quant'+PRESET_KEYS[i]).value));
   }
 }
 if(document.getElementById('fast').checked){c*=2;t/=2}
 if(c>0) document.evaluate("//input[@type='submit']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value = "Submit ("+c+") - "+getTimeDisplay(t);
 else document.evaluate("//input[@type='submit']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value = "Submit";
}

function getTimeDisplay(t){
 var h = Math.floor(t/3600);
 var m = Math.floor((t % 3600)/60);
 var s = Math.floor((t % 3600) % 60);
 var a = s+"s";
 if(m>0 || h>0)	a = m+"m "+a;
 if(h>0)	a = h+"h "+a;
 return a;
}

function onProductionTextBoxReset(){
 var t = document.evaluate("//input[@type='text']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
 if(!t) return;
 for(var i=0;i<t.snapshotLength;i++){
   t.snapshotItem(i).value='';
 }
 document.evaluate("//input[@type='submit']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value="Submit";
}

function registerTextBoxEventListeners(){
 var a;
 for(var i=0;i<PRESET_KEYS.length;i++){
   if(document.getElementById('quant'+PRESET_KEYS[i])){
     if(getSetting('config_addProductionIncrements',true)){
       a=document.createElement('a');
       a.href='javascript:void(1);';
       a.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;margin-right:3px;');
       a.setAttribute('id','decrement-'+PRESET_KEYS[i]);
       a.innerHTML='-';
       document.getElementById('quant'+PRESET_KEYS[i]).parentNode.insertBefore(a,document.getElementById('quant'+PRESET_KEYS[i]));
       a.addEventListener('click',function(){incrementFleet(this.id)},true);
       a=document.createElement('a');
       a.href='javascript:void(1);';
       a.setAttribute('style','border:1px solid #9999FF;background-color:#000066;padding:0 3px 1px;margin-right:6px;');
       a.setAttribute('id','increment-'+PRESET_KEYS[i]);
       a.innerHTML='+';
       document.getElementById('quant'+PRESET_KEYS[i]).parentNode.insertBefore(a,document.getElementById('quant'+PRESET_KEYS[i]));
       a.addEventListener('click',function(){incrementFleet(this.id)},true);
     }
     document.getElementById('quant'+PRESET_KEYS[i]).addEventListener('change',onProductionTextBoxKeyUp,false);
     document.getElementById('quant'+PRESET_KEYS[i]).addEventListener('keyup',onProductionTextBoxKeyUp,true);
   }
 }
 document.getElementById('row1').parentNode.insertBefore(document.createElement('tr'),document.getElementById('row1'));
 document.getElementById('row1').previousSibling.innerHTML='<td colspan=6>&nbsp;</td>';
 document.getElementById('fast').addEventListener('change',onProductionTextBoxKeyUp,false);
 document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentNode.parentNode.previousSibling.innerHTML="<td colspan=6>&nbsp;</td>";
 document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxReset,false);
 document.evaluate("//input[@type='submit']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.style.padding='2px 4px';
}

function incrementFleet(s){
 if(s.split('-')[0]=='increment') document.getElementById('quant'+s.split('-')[1]).value=(isNaN(parseInt(document.getElementById('quant'+s.split('-')[1]).value))?0:parseInt(document.getElementById('quant'+s.split('-')[1]).value))+1;
 else if(parseInt(document.getElementById('quant'+s.split('-')[1]).value)>0) document.getElementById('quant'+s.split('-')[1]).value=parseInt(document.getElementById('quant'+s.split('-')[1]).value)-1;
 document.getElementById('quant'+s.split('-')[1]).focus();
 onProductionTextBoxKeyUp();
}

function insertTimeTextBoxes(){
 var a = document.evaluate(
   "//input[@class='input-numeric quant']",
   document,
   null,
   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
   null);
 var b,i;
 for(i=0;i<a.snapshotLength;i++){
   b = document.createElement("td");
   b.setAttribute("align","center");
   b.innerHTML = '<input type="text" value="" maxlength="5" size="5" name="'+a.snapshotItem(i).name+' - Time" class="input-numeric quant">';
   a.snapshotItem(i).parentNode.parentNode.appendChild(b);
   b.addEventListener('keyup',getConvertTimeToQuantityClosure(a.snapshotItem(i).parentNode.parentNode),true);
   b.addEventListener('change',getConvertTimeToQuantityClosure(a.snapshotItem(i).parentNode.parentNode),true);
 }
 b = document.getElementById('base_production').firstChild.childNodes[1].firstChild.firstChild.childNodes[1];
 b.childNodes[1].firstChild.setAttribute("colspan",7);
 b.firstChild.appendChild(document.createElement("th"));
 b.firstChild.lastChild.setAttribute("width","10%");
 b.firstChild.lastChild.textContent = "Time (h)"
	b.firstChild.lastChild.previousSibling.setAttribute("width","10%");
 a = document.evaluate("//td[@class='help comment']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
 for(i=0;i<a.snapshotLength;i++){a.snapshotItem(i).setAttribute("colspan",6)}
 a = document.evaluate("//td[@class='red important']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
 for(i=0;i<a.snapshotLength;i++){a.snapshotItem(i).setAttribute("colspan",2)}
 b.childNodes[b.childNodes.length-3].firstChild.setAttribute("colspan",7);
 b.childNodes[b.childNodes.length-2].innerHTML="<td colspan=7>&nbsp;</td>";
 b.childNodes[b.childNodes.length-1].firstChild.setAttribute("colspan",7);
 b.childNodes[b.childNodes.length-1].firstChild.setAttribute("style","padding-bottom:10px;");
 document.evaluate("//input[@type='reset']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.addEventListener('click',onProductionTextBoxReset,false);
}

function getConvertTimeToQuantityClosure(r){function func(){convertTimeToQuantity(r)}return func}

function convertTimeToQuantity(r){
 var t = parseFloat(r.childNodes[6].firstChild.value);
 if(isNaN(t)) t=0;
	r.childNodes[5].lastChild.value = ((t*60*60)<getSeconds(r.childNodes[4].textContent))?"":Math.round((t*60*60)/getSeconds(r.childNodes[4].textContent));
 onProductionTextBoxKeyUp();
}

function getSeconds(t){
 var result = /(\d*h)?\W?(\d*m)?\W?(\d*s)?/.exec(t);
 if(result){
   var h=m=s=0;
   if(result[1]!=null) h=result[1].substring(0,result[1].indexOf("h"));
   if(result[2]!=null) m=result[2].substring(0,result[2].indexOf("m"));
   if(result[3]!=null) s=result[3].substring(0,result[3].indexOf("s"));
   return h*60*60 + m*60 + s*1;
 }
 return -1;
}

function clearProductionComments(){
 var x;
 if(getView()=='Structures') x='base_structures';
 else if(getView()=='Defenses') x='base_defenses';
 else if(getView()=='Production') x='base_production';
 else if(getView()=='Research') x='base_reseach';
 var t=document.getElementById(x).firstChild.childNodes[1].firstChild.firstChild.lastChild.childNodes;
 for(var i=0;i<t.length;i++){
   if(t[i].childNodes[1] && t[i].childNodes[1].className=='help comment') t[i].style.display='none';
 }
}

/*************************
 Enhanced Queue Display
*************************/
function fixQueues(){
  if(document.evaluate('//a[text()="Cancel Production"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength > getSetting('config_maxQueues',7))	return;
  var t = getView();
  if(t == "Structures" || t == "Defenses") t = "CONSTRUCTION QUEUE";
  if(t == "Research") t = "RESEARCH QUEUE";
  if(t == "Production") t = "PRODUCTION";
  GM_addStyle('#queueFooter{position:fixed;clear:both;width:96%;bottom:0px;left:2%;}');
  var q;
  if(t=="PRODUCTION") q=document.getElementById('base_events-production');
  else q=document.getElementById('base_queue');
  if(q){
    q.style.width="100%";
    var d = document.createElement("div");
    d.setAttribute("id","queueFooter");
    d.appendChild(q);
    document.body.appendChild(d);
    var s = document.createElement('div');
    s.style.position="absolute";
    s.style.height = d.offsetHeight;
    s.innerHTML = "&nbsp;";
    document.body.appendChild(s);
  }
}
/************************
 Hide Bases Economy
************************/
function hideBasesEconomy(){
 document.getElementById('empire_economy_bases').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('empire_economy_bases').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleBaseEconomy">'+((getSetting('HIDE_BASES_ECONOMY',false))?'Show':'Hide')+'</a>';
 document.getElementById('empire_economy_bases').firstChild.lastChild.style.display=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleBaseEconomy').addEventListener('click',function(){
   document.getElementById('toggleBaseEconomy').innerHTML=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('empire_economy_bases').firstChild.lastChild.style.display=(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_BASES_ECONOMY',(document.getElementById('toggleBaseEconomy').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Fleets List
************************/
function hideFleetsList(){
 document.getElementById('fleets-list').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('fleets-list').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleFleetsList">'+((getSetting('HIDE_FLEETS_LIST',false))?'Show':'Hide')+'</a>';
 document.getElementById('fleets-list').firstChild.lastChild.style.display=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleFleetsList').addEventListener('click',function(){
   document.getElementById('toggleFleetsList').innerHTML=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('fleets-list').firstChild.lastChild.style.display=(document.getElementById('toggleFleetsList').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_FLEETS_LIST',(document.getElementById('toggleFleetsList').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Bases List
************************/
function hideBasesList(){
 document.getElementById('bases_list').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('bases_list').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleBasesList">'+((getSetting('HIDE_BASES_LIST',false))?'Show':'Hide')+'</a>';
 document.getElementById('bases_list').firstChild.lastChild.style.display=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleBasesList').addEventListener('click',function(){
   document.getElementById('toggleBasesList').innerHTML=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('bases_list').firstChild.lastChild.style.display=(document.getElementById('toggleBasesList').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_BASES_LIST',(document.getElementById('toggleBasesList').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Empire Technologies
************************/
function hideEmpireTechnologies(){
 document.getElementById('empire_technologies').firstChild.firstChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('empire_technologies').firstChild.firstChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleEmpireTechnologies">'+((getSetting('HIDE_EMPIRE_TECHNOLOGIES',false))?'Show':'Hide')+'</a>';
 document.getElementById('empire_technologies').firstChild.lastChild.style.display=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'table-row':'none';
 document.getElementById('toggleEmpireTechnologies').addEventListener('click',function(){
   document.getElementById('toggleEmpireTechnologies').innerHTML=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'Show':'Hide';
   document.getElementById('empire_technologies').firstChild.lastChild.style.display=(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?'table-row':'none';
   setSetting('HIDE_EMPIRE_TECHNOLOGIES',(document.getElementById('toggleEmpireTechnologies').innerHTML=='Hide')?false:true);
 },true);
}

/************************
 Hide Guild Internal
************************/
function hideGuildInternal(){
 if(!document.getElementById('guild_internal')) return;
 document.getElementById('guild_internal').previousSibling.previousSibling.firstChild.lastChild.firstChild.appendChild(document.createElement('span'));
 document.getElementById('guild_internal').previousSibling.previousSibling.firstChild.lastChild.firstChild.lastChild.innerHTML='&nbsp;&nbsp;-&nbsp;&nbsp;<a href="javascript:void(1)" id="toggleGuildInternal">'+((getSetting('HIDE_GUILD_INTERNAL',false))?'Show':'Hide')+' Internal</a>';
 document.getElementById('guild_internal').firstChild.firstChild.style.display=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'table-row':'none';
 if(document.getElementById('toggleGuildInternal').innerHTML!='Hide Internal'){
   document.getElementById('guild_internal').firstChild.appendChild(document.createElement('tr'));
   document.getElementById('guild_internal').firstChild.lastChild.appendChild(document.createElement('td'));
   document.getElementById('guild_internal').firstChild.lastChild.firstChild.appendChild(document.getElementById('guild_internal-menu').cloneNode(true));
 }
 document.getElementById('toggleGuildInternal').addEventListener('click',function(){
   document.getElementById('toggleGuildInternal').innerHTML=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'Show Internal':'Hide Internal';
   document.getElementById('guild_internal').firstChild.firstChild.style.display=(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?'table-row':'none';
   if(document.getElementById('toggleGuildInternal').innerHTML!='Hide Internal'){
     document.getElementById('guild_internal').firstChild.appendChild(document.createElement('tr'));
     document.getElementById('guild_internal').firstChild.lastChild.appendChild(document.createElement('td'));
     document.getElementById('guild_internal').firstChild.lastChild.firstChild.appendChild(document.getElementById('guild_internal-menu').cloneNode(true));
   }else{
     document.getElementById('guild_internal').firstChild.removeChild(document.getElementById('guild_internal').firstChild.lastChild)
   }
   setSetting('HIDE_GUILD_INTERNAL',(document.getElementById('toggleGuildInternal').innerHTML=='Hide Internal')?false:true);
 },true);
}

/************************
 Free Capacities Page
************************/
function advCapacitiesPage(){
 checkEmpireDataAge();
 var a='',b=[],c=e1=e2=p=r=0,d = unescape(getSetting('empireBaseData',null)).split('|:|');
 if(d==null) return;
 for(var i=0;i<d.length;i++){
   if(getSetting('baseData'+d[i].split('||')[0],null)!=null) b = getSetting('baseData'+d[i].split('||')[0],null).split('|');
   else b=['unknown','',0,0,0,'unknown'];
   if(b[1]=='Asteroid') b[1]='';
   a+='<tr align="center"><td>'+d[i].split('||')[1]+'</td><td>'+d[i].split('||')[2]+'</td><td>'+b[0]+' <small>'+b[1]+'</small>'+'</td><td>'+d[i].split('||')[3]+'<td>'+b[2]+'</td><td>'+b[3]+'</td><td>'+b[4]+'</td></tr><td colspan="7" class="help comment">'+b[5]+'</td></tr>';
   e1+=parseInt(d[i].split('||')[3].split('/')[0]);
   e2+=parseInt(d[i].split('||')[3].split('/')[1]);
   c+=parseInt(b[2]);
   p+=parseInt(b[3]);
   r+=parseInt(b[4]);
 }
 document.getElementById('empire_upgraded-only').firstChild.innerHTML='<tr><th class="th_header2" style="border: 0px none ;"><font size="+1">B</font>ASES PROCESSING CAPACITIES</th></tr><tr><td class="content" style="padding: 0px;"><table class="layout listing"><tbody><tr class="listing-header"><th>Name</th><th>Location</th><th>Type</th><th>Economy</th><th>Construction</th><th>Production <small>(Shipyards)</small></th><th>Research <small>(Labs)</small></th></tr>'
 +a+'<tr align="center"><td></td><th>Sum</th><td></td><td><b>'+e1+' / '+e2+'</b></td><td><b>'+c+'</b></td><td><b>'+p+'</b></td><td><b>'+r+'</b></td></tr></tbody></table></td></tr><tr><td style="text-align:center;padding:6px 0;" class="help comment">To update the base name, location, and economy, visit the <a href="/empire.aspx?view=economy">economy</a> page.<br>To update all other data, you need to view each base.</td></tr>';
}

function checkEmpireDataAge(){
 if(getSetting('empireBaseData',null) == null) insertNotification('Empire base data has not been set.<br>Visit the economy page to set the information.<br><br><br>');
 else if(Math.round(new Date().getTime()/1000) > (parseInt(getSetting('lastEmpireCheck',0))+(86400*3))) insertNotification('Empire base data has not been updated in over three days.<br>Visit the economy page to refresh the information.<br><br><br>');
}

function saveEmpireBases(){
 var d='',t = document.getElementById('empire_economy_bases').firstChild.lastChild.firstChild.firstChild.firstChild.childNodes;
 for(var i=1;i<t.length;i++){
   d+='|:|'+t[i].childNodes[0].firstChild.href.split('=')[1]+'||'+t[i].childNodes[0].innerHTML+'||'+t[i].childNodes[1].innerHTML+'||'+t[i].childNodes[2].innerHTML;
 }
 setSetting('empireBaseData',escape(d.substring(3)));
 setSetting('lastEmpireCheck',Math.round(new Date().getTime()/1000));
}

function storeBaseData(b){
 if(!b) return;
 var a = /Terrain:<\/b> ([^<]+)/.exec(document.getElementById('base_processing-capacities').parentNode.parentNode.firstChild.innerHTML)[1];
 a += '|'+/Astro Type:<\/b> ([^<]+)/.exec(document.getElementById('base_processing-capacities').parentNode.parentNode.firstChild.innerHTML)[1];
 var t = document.getElementById('base_processing-capacities').firstChild.lastChild.firstChild.firstChild.firstChild.childNodes;
 for(var i=0;i<3;i++){
   a+='|'+t[i].childNodes[1].innerHTML
 }
 if(document.getElementById('base_processing-capacities').parentNode.parentNode.parentNode.lastChild.firstChild.innerHTML.indexOf('Astro Type:')==-1) a+='|'+document.getElementById('base_processing-capacities').parentNode.parentNode.parentNode.lastChild.firstChild.innerHTML;
 else a+='|no commander';
 a=a.replace('<small>','');
 a=a.replace('</small>','');
 setSetting('baseData'+b,a);
}

/*********************************
 Configuration and settings Page
*********************************/
function showConfig(){
  var url = window.location.href;
  url = url.replace("&config=1","");
  url = url.replace("?config=1","");
  GM_addStyle('#configTable TD{vertical-align:top;}.configHeading {color:gold;font-weight:bold;}.featureName{color:#EEDC82;}.subFeatureName{color:#8B814C;padding-left:20px;}.footnote{color:gold;font-weight:bold;}');
		
  var newBody = "<html><body><div align='center'><h1>Astro Empires FateTools settings</h1>"+
    "<p><a href='http://www.epsilonfate.freeforums.org/ ' target='_blank'>Questions, comments and requests.</a> </p>"+
//
// can replace the above link with a forum specific link, email addy ->recomend no AE msg (admin scans for special words)
//
   	"<small>Script Version: "+scriptVersion+"<br><br></small>"+
    "<table width='900' cellpadding=3 id='configTable'>"+
    "<tr><td></td><th width='230'>Feature</th><th>Description</th><th>Applied to page(s)</th></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>General</td></tr>"+
    "<tr><td><input type='checkbox' id='config_adjustTitles'/></td><td class='featureName'>Adjust Page Titles</td><td style='padding-left:20'>Shortens page titles for better viewing with multiple tabs. Prefixes page titles with server.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addLocalTime'/></td><td class='featureName'>Add Local Time</td><td style='padding-left:20'>Places your local time next to Server Time. Displays local to server time offset in hour(s).</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td><input type='checkbox' id='config_maxWidth'/></td><td class='featureName'>Increase Maximum Width</td><td style='padding-left:20'>Increases the width of page to 96% of screen if AE's 'Display Width' is set to 1000.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addEmpireSubmenu'/></td><td class='featureName'>Add empire sub-menu</td><td style='padding-left:20'>Inserts the empire sub menu on all pages.</td><td style='padding-left:20'>All except fleet movement</td></tr>"+
    "<tr><td colspan='2' style='padding-left:10' class='featureName'>Enhanced count down timers.</td><td style='padding-left:20'>Shows dates and times for completion of work in progress. Highlights work to be completed today.</td><td style='padding-left:20'></td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimesEmpire'/> Empire Page</td><td style='padding-left:20'>Enable this feature for empire events pages.</td><td style='padding-left:20'>Empire events</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_addFinishTimes'/> Other Pages</td><td style='padding-left:20'>Enable this feature for construction and production pages.</td><td style='padding-left:20'>All pages except empire</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_finishTimesSingleLine'/> Single line</td><td style='padding-left:20'>Display times on a single line.</td><td style='padding-left:20'>Empire</td></tr>"+
    "<tr><td colspan='2' class='subFeatureName'><input type='checkbox' id='config_24hourDisplay'/> 24 Hour Clock</td><td style='padding-left:20'>Display times in 24 hour format.</td><td></td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightTodayColor'style='width:100;'/></td><td></td></tr>"+
    "<tr><td><input type='checkbox' id='config_formatNumbers'/></td><td class='featureName'>Format numbers</td><td style='padding-left:20'>Formats fleet size numbers for better readability. AE display 'Numbers Format' must be set to '1000.01'.</td><td style='padding-left:20'>Base pages</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Delimeter: <input type='text' id='config_numberDelimeter' style='width:25;'/></td><td style='padding-left:20'></td><td></td></tr>"+
	   "<tr><td><input type='checkbox' id='config_timeHelper'/></td><td class='featureName'>Time Helper</td><td style='padding-left:20'>Enter time you want to arrive at a location to be informed of the right time to leave.</td><td style='padding-left:20'>fleet move</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'><input type='checkbox' id='config_fleetReminders'>Departure Countdown</td><td style='padding-left:20'>Shows countdown until departure time beneath server time.</td><td style='padding-left:20'>All pages</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Player Highlights</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightPlayers'/></td><td class='featureName'>Highlight players</td><td style='padding-left:20'>Highlights players according to guild.<br><b>Note:</b>This overrides colour from the player highlight feature.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>My Guild Tag<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_myGuild' style='width:100;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_myGuildColour' style='width:100;'/></td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Allied/Pact Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_alliedGuilds' style='width:90%;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_alliedGuildColour' style='width:100;'/></td></tr>"+

    "<tr><td colspan='3' class='subfeatureName'>NAP Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_nappedGuilds' style='width:90%;' /></td>"+
    "<td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_nappedGuildColour' style='width:100;' /></td></tr>"+    
    
    "<tr><td colspan='3' class='subfeatureName'>Enemy Guild Tags<a href='#foot2'><sup class='footnote'>2</sup></a>: <input type='text' id='config_enemyGuilds' style='width:90%;'/></td><td class='subFeatureName' width='200'>Highlight Colour<a href='#foot2'><sup class='footnote'>1</sup></a>: <input type='text' id='config_enemyGuildColour' style='width:100;'/></td></tr>"+
    "<tr><td colspan='4' class='subfeatureName'>Individual Player Colour Overrides<a href='#foot2'><sup class='footnote'>3</sup></a>: <input type='text' id='config_playerColors' style='width:90%;'/></td></tr>"+
   	"<tr><td><input type='checkbox' id='config_nameLocations'/></td><td class='featureName'>Name Locations</td><td style='padding-left:20'>Replaces location link text with location names.</td><td style='padding-left:20'>All Except bookmarks</td></tr>"+
    "<tr><td colspan='4' class='subfeatureName'>Base Names<a href='#foot2'><sup class='footnote'>4</sup></a>: <input type='text' id='config_locationNames' style='width:90%;'/></td></td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Map Enhancements</td></tr>"+
    "<tr><td><input type='checkbox' id='config_cloneBaseLinks'/></td><td class='featureName'>Insert base links by map</td><td style='padding-left:20'>Displays base links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Bases</td></tr>"+
    "<tr><td><input type='checkbox' id='config_cloneFleetLinks'/></td><td class='featureName'>Insert fleet links by map</td><td style='padding-left:20'>Displays fleet links next to galaxy map so both are visible simultaneously.</td><td style='padding-left:20'>Fleets</td></tr>"+
    "<tr><td><input type='checkbox' id='config_moveGalaxyLinks'/></td><td class='featureName'>Move galaxy links</td><td style='padding-left:20'>Moves the galaxy links above the galaxy maps to the bottom of the page.</td><td style='padding-left:20'>Fleets, Bases, Bookmarks</td></tr>"+
    "<tr><td><input type='checkbox' id='config_baseLocationLinks'/></td><td class='featureName'>Base Location Links</td><td style='padding-left:20'>Changes the base links to location links on astros. Places base link next to astro. Changes the debris '*' into readable text.</td><td style='padding-left:20'>Map</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Trade</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightTradePartners'/></td><td class='featureName'>Highlight trade partners</td><td style='padding-left:20'>Highights all links to trade partners in blue.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td colspan='3' class='subfeatureName'>Highlight Colour<a href='#foot1'><sup class='footnote'>1</sup></a>: <input type='text' id='config_highlightPlayerColor'style='width:100;'/></td><td></td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightDuplicateTradePartners'/></td><td class='featureName'>Highlight duplicate trade partners</td><td style='padding-left:20'>Highlights duplicate trade partners and self trades.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td><input type='checkbox' id='config_highlightPoorTrades'/></td><td class='featureName'>Highlight unbalanced trades</td><td style='padding-left:20'>Highlights eco values that are outside of the set thresholds.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Upper threshold: <input type='text' id='config_poorTradeUpperThreshold'style='width:25;'/></td><td style='padding-left:20'>Trades with eco bases greater than this amount above your own are highlighted in orange.</td><td></td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Lower threshold: <input type='text' id='config_poorTradeLowerThreshold' style='width:25;'/></td><td style='padding-left:20'>Trades with eco bases lower than this amount below your own are highlighted in red.</td><td></td></tr>"+
    "<tr><td><input type='checkbox' id='config_hideFullTrades'/></td><td class='featureName'>Hide Full Trades</td><td style='padding-left:20'>Inserts a link to toggle the display of bases with all routes filled.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td><input type='checkbox' id='config_showTradeSummary'/></td><td class='featureName'>Display Trade Summary</td><td style='padding-left:20'>Displays a summary of trade efficiency.</td><td style='padding-left:20'>Empire trade</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Structures / Bases</td></tr>"+
    "<tr><td><input type='checkbox' id='config_structuresGoals'/></td><td class='featureName'>Advanced structures page</td><td style='padding-left:20'>Colour codes structure values based on progress.</td><td style='padding-left:20'>Empire structures</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Credits History</td></tr>"+
    "<tr><td><input type='checkbox' id='config_sumCredits'/></td><td class='featureName'>Credits Summary</td><td style='padding-left:20'>Displays a summary of credits.</td><td style='padding-left:20'>Credits History</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_insertMovePresets'/></td><td class='featureName'>Extra movement presets</td><td style='padding-left:20'>Adds extra presets to existing 'all' and 'none'.</td><td style='padding-left:20'>Fleet move</td></tr>"+
    "<tr><td><input type='checkbox' id='config_insertMoveIncrements'/></td><td class='featureName'>Fleet Move Increments</td><td style='padding-left:20'>This will add increment/decrement buttons next to quantity boxes for fleet movements.</td><td style='padding-left:20'>Fleet move</td></tr>"+
    "<tr><td><input type='checkbox' id='config_insertMoveDefault'/></td><td class='featureName'>Default Destination</td><td style='padding-left:20'>Adds buttons to use a default destination.</td><td style='padding-left:20'>Fleet move</td></tr>"+
    "<tr><td><input type='checkbox' id='config_showTotalFleetRow'/></td><td class='featureName'>Show total fleet row</td><td style='padding-left:20'>Adds a row totalling quantities of each ship.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_showFleetAttackSize'/></td><td class='featureName'>Show fleet attack size</td><td style='padding-left:20'>Attack fleet size exludes carriers,fleet carriers,recyclers,outpost ships, and scout ships.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addFleetMoveLink'/></td><td class='featureName'>Move link on Empire fleet page</td><td style='padding-left:20'>Makes fleet size(s) a link directly to the fleet movement screen.</td><td style='padding-left:20'>Empire fleet</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addFleetMoveShortcut'/></td><td class='featureName'>Move link on Fleets page</td><td style='padding-left:20'>Inserts a move link in destination column if not moving.</td><td style='padding-left:20'>Fleets</td></tr>"+
    "<tr><td><input type='checkbox' id='config_sumFleets'/></td><td class='featureName'>Sum guild fleets</td><td style='padding-left:20'>Inserts a table with fleet totals by guild.</td><td style='padding-left:20'>Base pages</td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Construction / Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_enableProductionPresets'/></td><td class='featureName'>Production presets</td><td style='padding-left:20'>This feature allows production values to be filled with customizable preset values. Time values override quantity values.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_enableProductionPage'/></td><td class='featureName'>AllinOne production page</td><td style='padding-left:20'>This adds a small link on the empire page next to the production heading. The link opens a page to add production to all bases..</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_addProductionIncrements'/></td><td class='featureName'>Production increments</td><td style='padding-left:20'>This will add increment/decrement buttons next to quantity boxes for production.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_enterProductionTime'/></td><td class='featureName'>Enter production times</td><td style='padding-left:20'>Allows entry of production time in hours. Quantities are then calculated and filled in.</td><td style='padding-left:20'>Production</td></tr>"+
    "<tr><td><input type='checkbox' id='config_clearProductionComments'/></td><td class='featureName'>Clear Production Comments</td><td style='padding-left:20'>Removes the production/construction/research comments below each title to compact the pages.</td><td style='padding-left:20'>Structures, Defenses, Production, and Research</td></tr>"+
    "<tr><td><input type='checkbox' id='config_fixQueues'/></td><td class='featureName'>Enhanced queue display</td><td style='padding-left:20'>Fixes queues footer of screen so it is always visible.</td><td style='padding-left:20'>Structures, Defenses, Production, and Research</td></tr>"+
    "<tr><td colspan='2' class='subfeatureName'>Max queue size: <input type='text' id='config_maxQueues' style='width:25;'/></td><td style='padding-left:20'>Queue list will not be fixed when queues size is greater than this number.</td><td></td></tr>"+
    "<tr><td colspan='5'></td></tr>"+
    "<tr><td colspan='5' class='configHeading'>Free Account Tools</td></tr>"+
    "<tr><td><input type='checkbox' id='config_removeAdds'/></td><td class='featureName'>Remove Banner Adds</td><td style='padding-left:20'>Removes the banner add from the middle of the page on free accounts.</td><td style='padding-left:20'>All</td></tr>"+
    "<tr><td><input type='checkbox' id='config_advCapacitiesPage'/></td><td class='featureName'>Capacities</td><td style='padding-left:20'>Display a capacities page similar to upgraded accounts.</td><td style='padding-left:20'>Base Capacities</td></tr>"+
    "<tr height='15px'><td colspan='4'/></tr>"+
    "<tr><td colspan='4' align='center'><input id='saveButton' type=submit name='Save' value='Save'/></td></tr>"+
    "</table>"+
    "<br>"+ // "<small>This configuration screen is for the Astro Empires Tools Greasemonkey script.</small><br><br>"+
    "<table>"+
    "<tr><td><a name='foot1'>1.</a> Colour definitions must be in valid css colour formats. See CSS colour samples <a href='http://www.somacon.com/p142.php' target='_new'>here</a>.</td></tr>"+
    "<tr><td><a name='foot2'>2.</a> Guild definitions must be in the following format: <b>[Guildname],[Guildname2],...</b><br>Include the square brackets</td></tr>"+
    "<tr><td><a name='foot2'>3.</a> Colour definitions must be in the following format: <b>player1=csscolour,player2=csscolour2</b><br>Do NOT include player's guild tag and DO include the '#' with css hex values.</td></tr>"+
	   "<tr><td><a name='foot2'>4.</a> Location name definitions must be in the following format: <b>location=name,location2=name2</b></td></tr>"+
    "</table>"+
    "<br><br><a id='backLink' href='"+url+"'>Return to Astro Empires</a>"+ // - <a id='updateCheck' href='#'>Check For Update</a> "+
    "</div></body><html>";
  window.addEventListener('load',function(){
    document.body.innerHTML = newBody;
    loadConfig();
    document.getElementById('saveButton').addEventListener('click',function(event){saveConfig();},true);
    document.getElementById('config_highlightPoorTrades').addEventListener('change',function(event){poorTradesChanged();},true);
		  document.getElementById('config_fleetReminders').addEventListener('click',function(event){if(document.getElementById('config_fleetReminders').checked) document.getElementById('config_timeHelper').checked = true;},true);
	  	document.getElementById('config_timeHelper').addEventListener('click',function(event){if(!document.getElementById('config_timeHelper').checked) document.getElementById('config_fleetReminders').checked = false;},true);
  },true);
}

function saveConfig(){
  setSetting('config_adjustTitles',document.getElementById('config_adjustTitles').checked);
  setSetting('config_addLocalTime',document.getElementById('config_addLocalTime').checked);
  setSetting('config_maxWidth',document.getElementById('config_maxWidth').checked);
  setSetting('config_addEmpireSubmenu',document.getElementById('config_addEmpireSubmenu').checked);
  setSetting('config_addFinishTimesEmpire',document.getElementById('config_addFinishTimesEmpire').checked);
  setSetting('config_addFinishTimes',document.getElementById('config_addFinishTimes').checked);
  setSetting('config_finishTimesSingleLine',document.getElementById('config_finishTimesSingleLine').checked);
  setSetting('config_24hourDisplay',document.getElementById('config_24hourDisplay').checked);
  setSetting('config_highlightTodayColor',escape(document.getElementById('config_highlightTodayColor').value));
  setSetting('config_formatNumbers',document.getElementById('config_formatNumbers').checked);
  setSetting('config_numberDelimeter',escape(document.getElementById('config_numberDelimeter').value));
  setSetting('config_timeHelper',document.getElementById('config_timeHelper').checked);
  setSetting('config_fleetReminders',document.getElementById('config_fleetReminders').checked);

  setSetting('config_highlightPlayers',document.getElementById('config_highlightPlayers').checked);
  setSetting('config_myGuild',escape(document.getElementById('config_myGuild').value));
  setSetting('config_myGuildColour',escape(document.getElementById('config_myGuildColour').value));
  setSetting('config_alliedGuilds',escape(document.getElementById('config_alliedGuilds').value));
  setSetting('config_alliedGuildColour',escape(document.getElementById('config_alliedGuildColour').value));

//  setSetting(NAPPED_GUILDS_KEY,escape($(NAPPED_GUILDS_KEY).value));
  setSetting('config_nappedGuilds',escape(document.getElementById('config_nappedGuilds').value));
//  setSetting(NAPPED_GUILDS_COLOUR_KEY,escape($(NAPPED_GUILDS_COLOUR_KEY).value));    
  setSetting('config_nappedGuildColour',escape(document.getElementById('config_nappedGuildColour').value));
  
  setSetting('config_enemyGuilds',escape(document.getElementById('config_enemyGuilds').value));
  setSetting('config_enemyGuildColour',escape(document.getElementById('config_enemyGuildColour').value));
  setSetting('config_playerColors',escape(document.getElementById('config_playerColors').value));
		setSetting('config_nameLocations',document.getElementById('config_nameLocations').checked);
  setSetting('config_locationNames',escape(document.getElementById('config_locationNames').value));

  setSetting('config_cloneBaseLinks',document.getElementById('config_cloneBaseLinks').checked);
  setSetting('config_cloneFleetLinks',document.getElementById('config_cloneFleetLinks').checked);
  setSetting('config_moveGalaxyLinks',document.getElementById('config_moveGalaxyLinks').checked);
  setSetting('config_baseLocationLinks',document.getElementById('config_baseLocationLinks').checked);

  setSetting('config_highlightTradePartners',document.getElementById('config_highlightTradePartners').checked);
  setSetting('config_highlightPlayerColor',escape(document.getElementById('config_highlightPlayerColor').value));
  setSetting('config_highlightDuplicateTradePartners',document.getElementById('config_highlightDuplicateTradePartners').checked);
  setSetting('config_highlightPoorTrades',document.getElementById('config_highlightPoorTrades').checked);
  setSetting('config_poorTradeUpperThreshold',document.getElementById('config_poorTradeUpperThreshold').value);
  setSetting('config_poorTradeLowerThreshold',document.getElementById('config_poorTradeLowerThreshold').value);
  setSetting('config_hideFullTrades',document.getElementById('config_hideFullTrades').checked);
  setSetting('config_showTradeSummary',document.getElementById('config_showTradeSummary').checked);

  setSetting('config_structuresGoals',document.getElementById('config_structuresGoals').checked);

  setSetting('config_sumCredits',document.getElementById('config_sumCredits').checked);

  setSetting('config_insertMovePresets',document.getElementById('config_insertMovePresets').checked);
  setSetting('config_insertMoveIncrements',document.getElementById('config_insertMoveIncrements').checked);
  setSetting('config_insertMoveDefault',document.getElementById('config_insertMoveDefault').checked);
  setSetting('config_showTotalFleetRow',document.getElementById('config_showTotalFleetRow').checked);
  setSetting('config_showFleetAttackSize',document.getElementById('config_showFleetAttackSize').checked);
  setSetting('config_addFleetMoveLink',document.getElementById('config_addFleetMoveLink').checked);
  setSetting('config_addFleetMoveShortcut',document.getElementById('config_addFleetMoveShortcut').checked);
  setSetting('config_sumFleets',document.getElementById('config_sumFleets').checked);

  setSetting('config_enableProductionPresets',document.getElementById('config_enableProductionPresets').checked);
  setSetting('config_enableProductionPage',document.getElementById('config_enableProductionPage').checked);
  setSetting('config_addProductionIncrements',document.getElementById('config_addProductionIncrements').checked);
  setSetting('config_enterProductionTime',document.getElementById('config_enterProductionTime').checked);
  setSetting('config_clearProductionComments',document.getElementById('config_clearProductionComments').checked);
  setSetting('config_fixQueues',document.getElementById('config_fixQueues').checked);
  setSetting('config_maxQueues',document.getElementById('config_maxQueues').value);

  setSetting('config_removeAdds',document.getElementById('config_removeAdds').checked);
  setSetting('config_advCapacitiesPage',document.getElementById('config_advCapacitiesPage').checked);

		notify("Settings successfully saved.");
}

function loadConfig(){
  document.getElementById('config_adjustTitles').checked = getSetting('config_adjustTitles',true);
  document.getElementById('config_addLocalTime').checked = getSetting('config_addLocalTime',true);
  document.getElementById('config_maxWidth').checked = getSetting('config_maxWidth',false);
  document.getElementById('config_addEmpireSubmenu').checked = getSetting('config_addEmpireSubmenu',true);
  document.getElementById('config_addFinishTimesEmpire').checked = getSetting('config_addFinishTimesEmpire',true);
  document.getElementById('config_addFinishTimes').checked = getSetting('config_addFinishTimes',true);
  document.getElementById('config_finishTimesSingleLine').checked = getSetting('config_finishTimesSingleLine',false);
  document.getElementById('config_24hourDisplay').checked = getSetting('config_24hourDisplay',false);
  document.getElementById('config_highlightTodayColor').value = unescape(getSetting('config_highlightTodayColor',"#7896DE"));
  document.getElementById('config_formatNumbers').checked = getSetting('config_formatNumbers',false);
  document.getElementById('config_numberDelimeter').value = unescape(getSetting('config_numberDelimeter',","));
	 document.getElementById('config_timeHelper').checked = getSetting('config_timeHelper',false);
  document.getElementById('config_fleetReminders').checked = getSetting('config_fleetReminders',false);
// Player Highlights
  document.getElementById('config_highlightPlayers').checked = getSetting('config_highlightPlayers',true);
  document.getElementById('config_myGuild').value = unescape(getSetting('config_myGuild',"[FATE]"));
  document.getElementById('config_myGuildColour').value = unescape(getSetting('config_myGuildColour',"#32CD32"));
  document.getElementById('config_alliedGuilds').value = unescape(getSetting('config_alliedGuilds',"[GROOV],[SiN],[?IR?],[VvV],[VvVK],[VKPL],[Steel],[WPB],[3SUM] "));
  document.getElementById('config_alliedGuildColour').value = unescape(getSetting('config_alliedGuildColour',"#99FF99"));

  document.getElementById('config_nappedGuilds').value = unescape(getSetting('config_nappedGuilds',"[TGR],[-MHS-],[-MDA-],[BOW],[ANTI],[=(A)=],[\V/],[SICK],[Vex] "));
  document.getElementById('config_nappedGuildColour').value = unescape(getSetting('config_nappedGuildColour',"#99FF99"));

  document.getElementById('config_enemyGuilds').value = unescape(getSetting('config_enemyGuilds',"[DMTNT],[SWAG],[STOP],[GOON]"));
  document.getElementById('config_enemyGuildColour').value = unescape(getSetting('config_enemyGuildColour',"#FF0000"));
  document.getElementById('config_playerColors').value = unescape(getSetting('config_playerColors',"Drekons=#FF82AB,United Colonies=#7FFF00"));
		document.getElementById('config_nameLocations').checked = getSetting('config_nameLocations',false);
  document.getElementById('config_locationNames').value = unescape(getSetting('config_locationNames',"E12:12:12:12=my home base,E13:13:13:13=main jumpgate"));
// Map Enhancements
  document.getElementById('config_cloneBaseLinks').checked = getSetting('config_cloneBaseLinks',true);
  document.getElementById('config_cloneFleetLinks').checked = getSetting('config_cloneFleetLinks',true);
  document.getElementById('config_moveGalaxyLinks').checked = getSetting('config_moveGalaxyLinks',false);
  document.getElementById('config_baseLocationLinks').checked = getSetting('config_baseLocationLinks',true);
// Trade
  document.getElementById('config_highlightTradePartners').checked = getSetting('config_highlightTradePartners',true);
  document.getElementById('config_highlightPlayerColor').value = unescape(getSetting('config_highlightPlayerColor',"#D2B48C"));
  document.getElementById('config_highlightDuplicateTradePartners').checked = getSetting('config_highlightDuplicateTradePartners',true);
  document.getElementById('config_highlightPoorTrades').checked = getSetting('config_highlightPoorTrades',true);
  document.getElementById('config_poorTradeUpperThreshold').value = getSetting('config_poorTradeUpperThreshold',10);
  document.getElementById('config_poorTradeLowerThreshold').value = getSetting('config_poorTradeLowerThreshold',10);
  document.getElementById('config_hideFullTrades').checked = getSetting('config_hideFullTrades',true);
  document.getElementById('config_showTradeSummary').checked = getSetting('config_showTradeSummary',true);
// Structures
  document.getElementById('config_structuresGoals').checked = getSetting('config_structuresGoals',true);
// Credits
  document.getElementById('config_sumCredits').checked = getSetting('config_sumCredits',true);
// Fleet
  document.getElementById('config_insertMovePresets').checked = getSetting('config_insertMovePresets',true);
  document.getElementById('config_insertMoveIncrements').checked = getSetting('config_insertMoveIncrements',true);
  document.getElementById('config_insertMoveDefault').checked = getSetting('config_insertMoveDefault',true);
  document.getElementById('config_showTotalFleetRow').checked = getSetting('config_showTotalFleetRow',true);
  document.getElementById('config_showFleetAttackSize').checked = getSetting('config_showFleetAttackSize',true);
  document.getElementById('config_addFleetMoveLink').checked = getSetting('config_addFleetMoveLink',true);
  document.getElementById('config_addFleetMoveShortcut').checked = getSetting('config_addFleetMoveShortcut',true);
  document.getElementById('config_sumFleets').checked = getSetting('config_sumFleets',true);
// Construction / Production
  document.getElementById('config_enableProductionPresets').checked = getSetting('config_enableProductionPresets',true);
  document.getElementById('config_enableProductionPage').checked = getSetting('config_enableProductionPage',true);
  document.getElementById('config_addProductionIncrements').checked = getSetting('config_addProductionIncrements',true);
  document.getElementById('config_enterProductionTime').checked = getSetting('config_enterProductionTime',true);
  document.getElementById('config_clearProductionComments').checked = getSetting('config_clearProductionComments',true);
  document.getElementById('config_fixQueues').checked = getSetting('config_fixQueues',true);
  document.getElementById('config_maxQueues').value = getSetting('config_maxQueues',7);
// Free Upgrade Pages
  document.getElementById('config_removeAdds').checked = getSetting('config_removeAdds',true);
  document.getElementById('config_advCapacitiesPage').checked = getSetting('config_advCapacitiesPage',true);
}


/************************
     Main Script
************************/
/************************
 Insert config link
*************************/
insertConfigLink();

/************************
 Adjust Page Titles
*************************/
if(getSetting('config_adjustTitles',true)) adjustTitles();

/************************
 Remove Adds
*************************/
if(document.getElementById('advertising') && getSetting('config_removeAdds',true)) removeAdds();

/************************
 Add Local Time and Time Offset
*************************/
if(getSetting('config_addLocalTime',true)) addLocalTime();

/************************
 Adjust Max Width
************************/
if(getSetting('config_maxWidth',false)) adjustMaxWidth();

/************************
 Insert Empire Menu
*************************/
if(window.location.href.indexOf('empire.aspx')==-1 && window.location.href.indexOf('view=move')==-1){
 if(getSetting('config_addEmpireSubmenu',true)) insertEmpireMenu();
}

/************************
 Advanced Fleet Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=fleets')!=-1){
 if(getSetting('config_showTotalFleetRow',true) || getSetting('config_showFleetAttackSize',true) || getSetting('config_addFleetMoveLink',true)) sumShips();
}

/************************
 Advanced Trade Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=trade')!=-1){
 if(getSetting('config_highlightDuplicateTradePartners',true)) checkTradePage();
 if(getSetting('config_highlightPoorTrades',true)) findPoorTrades();
 if(getSetting('config_showTradeSummary',true)) showTradeSummary();
 if(getSetting('config_hideFullTrades',true)) insertToggleLink();
}

/************************
Show Config Page
*************************/
if(window.location.href.indexOf('config')!=-1) showConfig();

/************************
Finish Times
*************************/
if(window.location.href.indexOf("empire.aspx")==-1){
 if(getSetting('config_addFinishTimes',true)) addFinishTimes(false);
}
else if(getSetting('config_addFinishTimesEmpire',true)){
 var singleLine = getSetting('config_finishTimesSingleLine',false);
 addFinishTimes(singleLine);
}

/************************
Advanced Production Features
*************************/
if(window.location.href.indexOf("base.aspx")!=-1 && (getView()=="Production" || getView()=="Structures" || getView()=="Defenses" || getView()=="Research") && window.location.href.indexOf('&info=')==-1){
	if(getSetting('config_fixQueues',true)) fixQueues();
 if(getView()=="Production"){
   registerTextBoxEventListeners();
   if(getSetting('config_enableProductionPresets',true)) insertProductionPresetsButtons();
   if(getSetting('config_enterProductionTime',true)) insertTimeTextBoxes();
 }
 if(getSetting('config_clearProductionComments',true)) clearProductionComments();
}
if((window.location.href.indexOf('empire.aspx')!=-1 && window.location.href.indexOf('?')==-1) || window.location.href.indexOf('empire.aspx?view=bases_events')!=-1) enableProductionPage();

/************************
Fleet Summary
*************************/
if(window.location.href.indexOf("base.aspx?base=")!=-1 || window.location.href.indexOf("map.aspx?loc=")!=-1){
 if(getSetting('config_sumFleets',true)) sumFleets();
}

if(window.location.href.indexOf("fleet.aspx?fleet=")!=-1 && window.location.href.indexOf('view=') == -1 && getSetting('config_sumFleets',true)){
	 sumSingleFleet();
}


/************************
Fleet/Base Page Features
*************************/
if(window.location.href.indexOf("base.aspx")!=-1 && getView() == "" && getSetting('config_cloneBaseLinks',true)){
  copyBaseLinks();
}
if(window.location.href.indexOf("fleet.aspx")!=-1 && (getView() == "" || window.location.href.indexOf('gal=') != -1) && getSetting('config_cloneFleetLinks',true)){
  copyFleetLinks();
}
if((window.location.href.indexOf("bookmarks.aspx")!=-1 || window.location.href.indexOf("base.aspx")!=-1 || window.location.href.indexOf("fleet.aspx")!=-1) && (getView() == "" || window.location.href.indexOf('gal=') != -1) && window.location.href.indexOf("?base=")==-1 && window.location.href.indexOf("?fleet=")==-1 && getSetting('config_moveGalaxyLinks',false)){
  moveGalaxyList();
}
if(window.location.href.indexOf("map.aspx?cmp")!=-1 && getSetting('config_baseLocationLinks',true)){
  baseLocationLinks();
}

/************************
Advanced Structures Page
*************************/
if(window.location.href.indexOf('empire.aspx?view=structures')!=-1){
 saveBases();
 if(getSetting('config_structuresGoals',true)){
   if(window.location.href.indexOf("mode=edit")!=-1) insertEditRows();
   else insertBaseSettingLinks();
 }
}

/************************
Sum Credits
*************************/
if(window.location.href.indexOf('credits.aspx')!=-1 && getSetting('config_sumCredits',true)) sumCreditsPage();

/************************
Site-wide Features & Movement Tools
*************************/
if(window.location.href.indexOf('view=move')==-1){
 if(getSetting('config_highlightTradePartners',true) || getSetting('config_highlightPlayers',true)){
   if(getSetting('config_highlightTradePartners',true)) checkTradeDataAge();
		 highlightPlayers();
 }
//	checkTechDataAge();
	if(getSetting('config_nameLocations',false) && getSetting('config_locationNames',"A12:12:12:12=my home base,A13:13:13:13=main jumpgate")!='') replaceLocationNames();
 if(window.location.href.indexOf('map.aspx?loc=')!=-1 && window.location.href.split('?')[1].split(':')[1]!=undefined) insertSetAsDefaultDest();
}
else{
 if(getSetting('config_insertMovePresets',true)) insertMoveFleetLinks();
 if(getSetting('config_insertMoveIncrements',true)) insertMoveIncrements();
 if(getSetting('config_insertMoveDefault',true)) insertMoveDefault();
}

/************************
Fleet Movement Reminder
*************************/
if(getSetting('config_timeHelper',true)){
	 if(window.location.href.indexOf('view=move')!=-1) insertArriveTimeTextBox();
 	if(getSetting('config_fleetReminders',true) && (getSetting("FleetReminders","-") != "-")){
	  	insertFleetReminderCountdowns();
	 	if(unsafeWindow.t != undefined) unsafeWindow.t = tFunction;
 	}
}

/************************
Format Numbers
*************************/
if(getSetting('config_formatNumbers',false)){
 if(window.location.href.indexOf('view=move')==-1 && window.location.href.indexOf('view=fleets')==-1 && window.location.href.indexOf('view=production')==-1 && window.location.href.indexOf('view=structures')==-1 && window.location.href.indexOf('view=trade')==-1 && window.location.href.indexOf('view=research')==-1){
	  formatVariousNumbers();
	}
 if(getView()=="Scanners"){
   formatScanners();
 }
}

/************************
 Display Hide Links
************************/
if(window.location.href.indexOf('empire.aspx?view=economy')!=-1){saveEmpireBases(); hideBasesEconomy();}
if(window.location.href.indexOf('fleet.aspx')!=-1 && (window.location.href.indexOf('?')==-1 || window.location.href.indexOf('?gal=')!=-1)) hideFleetsList();
if(window.location.href.indexOf('base.aspx')!=-1 && (window.location.href.indexOf('?')==-1 || window.location.href.indexOf('?gal=')!=-1)) hideBasesList();
if(window.location.href.indexOf('empire.aspx?view=technologies')!=-1) hideEmpireTechnologies();
if(window.location.href.indexOf('guild.aspx')!=-1 && window.location.href.indexOf('?info=')==-1) hideGuildInternal();

/************************
 Free Capacities Page
************************/
if(window.location.href.indexOf('empire.aspx?view=bases_capacities')!=-1 && document.getElementById('empire_upgraded-only') && getSetting('config_advCapacitiesPage',true)) advCapacitiesPage();
if(window.location.href.indexOf("base.aspx?base=")!=-1 && window.location.href.indexOf('&')==-1) storeBaseData(window.location.href.split('=')[1]);

/************************
Notifier Utility Code
http://javascript.nwbox.com/asyncAlert/
*************************/
function notify(m,c){
				
				// create a block element
				var b=document.createElement('div');
				b.id='Message';
				b.className=c||'';
	//			b.style.cssText='top:-9999px;left:-9999px;position:absolute;white-space:nowrap;';
				b.style.cssText='position:absolute;white-space:nowrap;';
				// classname not passed, set default classname
				if(b.className.length==0){
					b.className = "notifier";
				}
				// insert block in to body
				b=document.body.insertBefore(b,document.body.firstChild);
				// write HTML fragment to it
				b.innerHTML=m;
				// save width/height before hiding
				var bw=b.offsetWidth;
				var bh=b.offsetHeight;
				// hide, move and then show
				b.style.display='none';
				
				b.style.top = document.body.clientHeight/2 + document.body.scrollTop - bh/2;
				b.style.left = document.body.clientWidth/2 + document.body.scrollLeft - bw/2;
				

				b.style.display='block';
				
				var duration = 2000;
				var endOpacity = 0;
				if(c==MESSAGE_CLASS_ERROR)
				{
					duration = 4000;
					endOpacity = 50;
				}
				// fadeout block if supported
				setFading(b,100,endOpacity,duration,function(){document.body.removeChild(b);});
}
	

// apply a fading effect to an object
// by applying changes to its style
// @o = object style
// @b = begin opacity
// @e = end opacity
// @d = duration (millisec)
// @f = function (optional)
function setFading(o,b,e,d,f){
	var t=setInterval(
		function(){
			b=stepFX(b,e,2);
			setOpacity(o,b/100);
			if(b==e){
				if(t){clearInterval(t);t=null;}
				if(typeof f=='function'){f();}
			}
		},d/50
	);
}

// set opacity for element
// @e element
// @o opacity
function setOpacity(e,o){
	// for IE
	e.style.filter='alpha(opacity='+o*100+')';
	// for others
	e.style.opacity=o;
}

// increment/decrement value in steps
// checking for begin and end limits
//@b begin
//@e end
//@s step
function stepFX(b,e,s){
	return b>e?b-s>e?b-s:e:b<e?b+s<e?b+s:e:b;
}

var MESSAGE_CLASS = "notifier";
var MESSAGE_CLASS_ERROR = "notifierError";
GM_addStyle('.notifier {'
        +'    background-color: Black;'
        +'    border: solid 1px;'
		+'    padding: 10px 10px 10px 10px;'
        +'}');
GM_addStyle('.notifierError {'
        +'    background-color: Black;'
        +'    border: solid 2px;'
		+'    color: red;'
		+'    padding: 10px 10px 10px 10px;'
        +'}');

//notify("test error","notifierError");
//notify("test","notifier");

/*
##################################################################################################################
Function: drakeProof

Use: This function will search each page for naked URLs. That is to say, when Drake posts URLS without making them
	clickable, this function will fix his laziness for everyone else.

Calls: Called once during script. The call will perform the search for naked URLS.

Credit: This script comes from Greasemonkey Hacks, By Mark Pilgrim Copyright 2006. Original code by Aaron Boodman

Last Update: 6/22/08
##################################################################################################################
*/
function drakeProof(){

	//var viewDrake = GM_getValue (DRAKE_PROOF_KEY,true)
	//if (viewDrake == true) {

	var urlRegex = /\b(https?:\/\/[^\s+\"\<\>]+)/ig;
	var snapTextElements = document.evaluate("//text()[not(ancestor::a) " + 
		"and not(ancestor::script) and not(ancestor::style) and not(ancestor::textarea) and " + 
		"contains(translate(., 'HTTP', 'http'), 'http')]", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = snapTextElements.snapshotLength - 1; i >= 0; i--) {
		var elmText = snapTextElements.snapshotItem(i);
		if (urlRegex.test(elmText.nodeValue)) {
			var elmSpan = document.createElement("span");
			var sURLText = elmText.nodeValue;
			elmText.parentNode.replaceChild(elmSpan, elmText);
			urlRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0;
				 (match = urlRegex.exec(sURLText)); ) { 
				elmSpan.appendChild(document.createTextNode(
				sURLText.substring(lastLastIndex, match.index))); 
				var elmLink = document.createElement("a");
				elmLink.title = 'DCR-proofed by FATE Tools script!';
				elmLink.style.textDecoration = 'none';
				elmLink.style.borderBottom = '1px dotted red';
				elmLink.setAttribute("href", match[0]); 
				elmLink.setAttribute("target", "_blank");
				elmLink.appendChild(document.createTextNode(match[0])); 
				elmSpan.appendChild(elmLink); 
				lastLastIndex = urlRegex.lastIndex;
			}
			elmSpan.appendChild(document.createTextNode(
				sURLText.substring(lastLastIndex)));
			elmSpan.normalize();
		}
	}

//}
}

drakeProof();

/*
#################################################################################################################
Defining what page is being viewed - for the quote feature below - intergrate in the future to the above script
#################################################################################################################
*/
/////////////////////////////// Define Page types 
function getPageType() {
	if (location.href.indexOf('fleet.aspx')!=-1) {
		if (location.search.indexOf('gal')!=-1)
			return 'mapGalaxy';
		else if ($('destination'))
			return 'fleetMove';
		else if (location.search=='')
			return 'fleets';
		else
			return 'fleetsData';
	}
    else if(location.href.indexOf('map.aspx')!=-1)
    {
        switch(location.search.length)
        {
            case 17:if(location.href.indexOf('cmp=')!=-1)return'mapRegion';
            else return'mapAstro';
            case 20:return'mapSystem'
        }
    }
	else if (location.href.indexOf('empire.aspx')!=-1) {
		if (location.search.indexOf('economy')!=-1)
			return 'economy';
		if (location.search.indexOf('units')!=-1)
			return 'units';
		if (location.search.indexOf('fleet')!=-1)
			return 'fleetdata';
		if (location.search.indexOf('scanners')!=-1)
			return 'scanners';
		if (location.search.indexOf('trade')!=-1)
			return 'trade';
		if (location.search=='' || location.search.indexOf('bases_events'))
			return 'empire';
	}
	else if (location.href.indexOf('base.aspx')!=-1) {
		if (location.search.indexOf('structures')!=-1 
		|| location.search.indexOf('production')!=-1
		|| location.search.indexOf('research')!=-1
		|| location.search.indexOf('defenses')!=-1)
			return 'baseBuildQueue';		
		else
			return 'base';		
	}
	else if (location.href.indexOf('board.aspx')!=-1)
		return 'board';
	else if (location.href.indexOf('annoucements')!=-1)
		return 'annoucements';		
	else if (location.href.indexOf('messages.aspx')!=-1)
		return 'messages';
	else if (location.href.indexOf('guild.aspx')!=-1)
		return 'guild';
	else if (location.href.indexOf('account.aspx')!=-1)
		return 'account';		
	else if (location.href.indexOf('profile.aspx')!=-1)
		return 'player';
	else if (location.href.indexOf('ranks.aspx')!=-1)
		return 'ranks';
	else if (location.href.indexOf('search.php')!=-1)
		return 'reportSearch';
}

var pagetype=getPageType();
/*
##################################################################################################################
Function: insertQuotes

Use: This function will add a quote function for each post on the boards.

Calls: Once per board page load.

Last Update: 6/30/08
##################################################################################################################
*/
function insertQuotes(){

	//var quoteer = GM_getValue (ADD_QUOTES_KEY,true)
	//if (quoteer == true) {
    // add a color selection in config area in future
    
	var quoteColor = "white"

	var posts = document.evaluate(
		'//td[contains(@style, "padding: 10px")]',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	var checkLocation = document.evaluate(
	    '//td/a[text()="Msg Player" and not(contains(../@style, "padding: 10px"))] | //td[@class="red" and text()="System"]',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);

	var tableHeader = document.evaluate(
	    '//th[contains(text(), "Date")]',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	
	var names = document.evaluate(
	    '//td/a[contains(@href, "?player=")][not(contains(ancestor::td/@style, "padding: 10px"))] | //td[@class="red" and text()="System"]',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);


	tableHeaderNode = tableHeader.snapshotItem(0);

	tableHeaderNode.setAttribute("width", "20%");
	
	var quoteHeader = document.createElement("th");
	quoteHeader.setAttribute("width", "10%");
	tableHeaderNode.parentNode.appendChild(quoteHeader);		 	   		

	for (var i = posts.snapshotLength - 1; i >= 0; i--) {

		var postNode = posts.snapshotItem(i);
		var postContents = postNode.textContent;
		var postRow = postNode.parentNode;
		var checkNode = checkLocation.snapshotItem(i);
		postNode.setAttribute("colspan", postNode.colSpan + 1);

		

		if (!postContents.match("Copy from " && " Messages") &&
			!pagetype.match("announcements") && !names.snapshotItem(i).textContent.match("System")) {
			postNode.setAttribute("id", "post" + i);

			var elmTd = document.createElement("td");
			checkNode.parentNode.parentNode.appendChild(elmTd);

			var quoteButton = document.createElement("input");
   			quoteButton.type="button";
    			quoteButton.value="Quote";
			quoteButton.setAttribute("id", "quote" + i);
			quoteButton.setAttribute("test", i);
			elmTd.appendChild(quoteButton); 



    			document.getElementById("quote" + i).addEventListener('click', function() {
				var postNumber = this.id.slice(5);				
				var postContents = document.getElementById("post" + postNumber).textContent;
				var textBox = document.getElementById("body");
				var currentName = names.snapshotItem(postNumber).textContent;


				if (textBox.value) {
					textBox.value += '\n\n[color=\'lime\']<<<[size=\'1\'][b]' + currentName + ' said:[/b] [i]"'
						+ postContents + '"[/i][/size]>>>[/color]\n\n';
					javascript:scroll(0,0);
					textBox.focus();

				}
				else {
					textBox.value += '[color=\' ' + quoteColor + '\']<<<[size=\'1\'][b]' + currentName + ' said:[/b] [i]"'
						+ postContents + '"[/i][/size]>>>[/color]\n\n';
					javascript:scroll(0,0);
					textBox.focus();
				}


    			}, false);

		}
		else {
			var elmTd = document.createElement("td");
			checkNode.parentNode.parentNode.appendChild(elmTd);
		}
	
	var cleanUp = document.evaluate(
	    '//th[@colspan="4"] | //td[@colspan="4"] | //td[a/text()="Next" and @align="right"] | //td[text()="System"]',
	    document,
	    null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	    null);


	}
	for (var j = cleanUp.snapshotLength - 1; j > -1; j--) {	

		if (cleanUp.snapshotItem(j).textContent.match("System")) {
		var elmTd = document.createElement("td");
		cleanUp.snapshotItem(j).parentNode.appendChild(elmTd);
		}
		else {
		cleanUp.snapshotItem(j).colSpan += 1;
		}
	}
	}
//} closes if

if (pagetype=='board') {
	insertQuotes();
}