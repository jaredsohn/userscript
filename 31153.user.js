// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars-ResInfo", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars-ResInfo
// @version        0.1c
// @namespace      mblaky
// @description    TribalWars-ResInfo
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include        http://*.ds.ignames.net/*
// @copyright      Copyright (c) 2007 - 2008, BlAkY
// @maintainer     BlAkY
// ==/UserScript==

var TWR_resources = {0:"wood",1:"stone",2:"iron"};

var TWR_lng = "en";

var TWR_dicts = {
  "ro" : {"storage" : "Magazie", "today" : "Astazi la", "tomorrow" : "Maine la"},
  "en" : {"storage" : "Storage", "today" : "Today at", "tomorrow" : "Tomorrow at"},
  }
var TWR_dict;	

var TWR_wbar = 400;
var TWR_res = {
	"wood":0,
	"stone":0,
	"iron":0
};
var TWR_resIncome = {
	"wood":1,
	"stone":1,
	"iron":1
};
var TWR_storage = 1000;

var TWR_imgs = { 
	"holz.png" : "wood",
	"lehm.png" : "stone",
	"eisen.png"      : "iron",
};

var TWR_imgsrc = { 
	"wood" : "graphic/holz.png",
	"stone" : "graphic/lehm.png",
	"iron" : "graphic/eisen.png"
};

var TWR_timers = new Array();
var TWR_timers_start = (new Date()).getTime()/1000;

TWR_dict = TWR_dicts[TWR_lng];

loadResources();
modifyPrices();
resourceTable();
startTimers();


function formatDate(time)
{
  var now = new Date();
  var tommorow = new Date(now.getTime() + (24*3600000));
  var dt = new Date(now.getTime() + (time*3600000));
  var dts = "";
  
  if (now.getDate()==dt.getDate()) dts = TWR_dict["today"];
  else if (tommorow.getDate()==dt.getDate()) dts = TWR_dict["tomorrow"];
  else dts = dt.getDate() + "."+dt.getMonth()+".";
  
  var min =dt.getMinutes();
  if (min<10) min = "0"+min;
  return dts+" "+dt.getHours() + ":"+min;
}

function formatTimeString(time)
{
/*
    var sec = Math.floor(time%60);
    if (sec<10) sec = "0"+sec;
    */
    time =Math.floor(time/60); 
    
    var min = Math.floor(time%60);
    if (min<10) min = "0"+min;
    var hour = Math.floor(time/60);
    return hour+":"+min ;//+":"+sec;
}

function formatTime(time){
   time *= 3600;
   return "<span class='TWR_timer' start='"+time+"'>"+formatTimeString(time)+"</span>";
}

function loadRes(name)
{
  var ores = document.getElementById(name);
  if (ores) {
    TWR_res[name] = ores.innerHTML;
    TWR_resIncome[name] = ores.getAttribute("title");
  }
}

function loadResources(){
  loadRes("wood");
  loadRes("stone");
  loadRes("iron");
  var ores = document.getElementById("storage");
  if (ores) TWR_storage = ores.innerHTML;}

function modifyPricesSnob(){
  var prices = document.getElementsByTagName("img");
  for (var i=0; i<prices.length; i++ ) {
    var price = prices[i];
    var src = price.src;
    src = src.substring(src.lastIndexOf('/')+1);
    var restype = TWR_imgs[src];
    if (!restype) continue;
    
    var par = price.parentNode;
    if (par.tagName!="TD") continue;
    
    var res = price.nextSibling.data ;
    res = res * 1000;
    var dif = res - TWR_res[restype];
	
    if (dif<=0) {
      par.innerHTML += "<br><span style='color:green; font-size: 80%;'><img src='"+price.src+"'>&nbsp;+"+(-dif)+"</span>";
    } else {
      var ft = formatTime(dif / TWR_resIncome[restype]);
      par.innerHTML += "<br><span style='color:red; font-size: 80%;'><img src='"+price.src+"'>&nbsp;-"+dif+"&nbsp;&nbsp;&nbsp;&nbsp;("+ft+")</span>";
    }
     
  }
}

function modifyPrices(){
  if (location.href.match( /screen=snob/ )) modifyPricesSnob();
  if((!location.href.match( /screen=main/ )) && (!location.href.match( /screen=smith/ ))) return;
  var prices = document.getElementsByTagName("img");
  for (var i=0; i<prices.length; i++ ) {
    var price = prices[i];
    var src = price.src;
    src = src.substring(src.lastIndexOf('/')+1);
    var restype = TWR_imgs[src];
    if (!restype) continue;
    var par = price.parentNode;
    if (par.tagName!="TD") continue;
    var res = par.innerHTML;
    res = res.substring(res.lastIndexOf('>')+1);
    var dif = res - TWR_res[restype];
	
    if (dif<=0) {
      par.innerHTML += "<span style='color:green; font-size: 80%;'>&nbsp;[OK]</span>";
    } else if (dif < 1000) {
      var ft = formatTime(dif / TWR_resIncome[restype]);
      par.innerHTML += "<span style='color:red; font-size: 80%;'><center>"+dif+"<br>("+ft+")</center></span>";
    } else {
      var ft = formatTime(dif / TWR_resIncome[restype]);
      par.innerHTML += "<span style='color:red; font-size: 80%;'><center>"+dif+"<br>("+ft+")</center></span>";
    } 
  }
}

function logger(text){ document.getElementById("serverTime").innerHTML += text+"<br>"; }

function resourceTable(){
  if (!TWR_res["wood"]) return;
	var resDiv = document.createElement( 'div' );
	resDiv.className = 'box';
	resDiv.setAttribute('align', 'center');
	resDiv.innerHTML = "&nbsp;";
	var resTable = document.createElement( 'table' );
 //resTable.id='ResTable';
	resTable.className = 'main';
	resTable.setAttribute('style', 'width:840px;');
		resTable.setAttribute('align', 'center');
	var row =document.createElement('tr');
	var cell = document.createElement('th');
	cell.setAttribute('colspan',5);
	cell.innerHTML=TWR_dict["storage"];
	
	row.appendChild( cell );
  resTable.appendChild(row);

  for each (var cr in TWR_resources) {
	   var row =document.createElement('tr');
	   row.className = 'vis';
	   var cell = document.createElement('td');
	   var img = document.createElement('img');
	   img.src = TWR_imgsrc[cr];
	   cell.appendChild(img);
	   cell.setAttribute('style', 'border:1px solid #CCCCCC; width: 18px; heigth:18px;');	    
	   row.appendChild( cell );

	   cell = document.createElement('td');
	   cell.innerHTML = "<center>"+TWR_res[cr] + " / +" + TWR_resIncome[cr]+"</center>";
	   cell.setAttribute('style', 'border:1px solid #CCCCCC; heigth:18px;');	    
		row.appendChild( cell );

	   
	   cell = document.createElement('td');
	   cell.setAttribute('style', 'border:1px solid #CCCCCC; heigth:18px;');	
	   var perc = (TWR_res[cr] / TWR_storage)*100;
   
	   
	   var sperc = Math.floor(perc) + "%";
	   var color = "green";
	   var wbar = TWR_wbar * (perc/100);
	   if (perc>90) color="red";
	   else if (perc>80) color="yellow";
     cell.innerHTML = "<div style='font-size: 80%; width: "+TWR_wbar+"px;'><div style='text-align: right; background-color: "+color+"; width: "+wbar*1.26+"px; '>&nbsp;"+sperc+"&nbsp;</div></div>";
	   row.appendChild( cell );

     var time = (TWR_storage-TWR_res[cr])/TWR_resIncome[cr];

	   cell = document.createElement('td');
	   cell.innerHTML = "<center>"+formatTime(time)+"</center>";
   	   cell.setAttribute('style', 'border:1px solid #CCCCCC; heigth:18px;');	
	   row.appendChild( cell );

	   cell = document.createElement('td');
	   cell.innerHTML = "<center>"+formatDate(time)+"</center>";
   	   cell.setAttribute('style', 'border:1px solid #CCCCCC; heigth:18px;');	
	   row.appendChild( cell );

	   resTable.appendChild(row);
		}
		resDiv.appendChild(resTable);	
		document.body.appendChild(resDiv);	
}


function ticker()
{
  var now = (new Date()).getTime()/1000;
   for each (var tmr in TWR_timers) {
        var time = tmr.getAttribute("start");
        time = time - (now-TWR_timers_start);
        tmr.innerHTML = formatTimeString(time);
   }
   setTimeout(ticker,10000);
}

function startTimers()
{
  var spans = document.getElementsByTagName("span");
  var items = 0;
  for (var i=0; i<spans.length; i++ )
    if (spans[i].className == 'TWR_timer') {
      
        TWR_timers[items] = spans[i];
        items++
   }
  setTimeout(ticker,10000);
}