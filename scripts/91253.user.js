// ==UserScript==
// @name           Die Stämme: AutoBuild
// @namespace      -=LiRo=-
// @include        http://de*.die-staemme.de*screen=main*
// ==/UserScript==

var maxQueueCount = 5;

var types = 
{
  "Off":
  {
    accessKey: "1",
  
    wood: 30, // max. Holzfaeller-Stufe
    stone: 30, // max. Lehmgrube-Stufe
    iron: 30, // max. Eisenmine-Stufe
    main: 20, // max. Hauptgebaeude-Stufe
    barracks: 25, // max. Kasernen-Stufe
    stable: 20, // max. Stall-Stufe
    garage: 10, // max. Werkstatt-Stufe
    snob: 3, // max. Adelshof-Stufe
    smith: 20, // max. Schmiede-Stufe
    place: 1, // max. Versammlungsplatz-Stufe
    market: 18, // max. Marktplatz-Stufe
    farm: 30, // max. Bauernhof-Stufe
    storage: 30, // max. Speicher-Stufe
    hide: 0, // max. Versteck-Stufe
    wall: 20, // max. Wall-Stufe
    
    //Je kleiner, desto höher die Priorität
    //Gibt in Prozent an, wie weit die höher priorisierten
    //Gebäude gebaut sein müssen, damit das nächste Gebäude gebaut wird.
    woodPrior: 0,
    stonePrior: 0,
    ironPrior: 30,
    mainPrior: 40,
    barracksPrior: 100,
    stablePrior: 100,
    garagePrior: 100,
    snobPrior: 50,
    smithPrior: 50,
    placePrior: 50,
    marketPrior: 50,
    farmPrior: 60,
    storagePrior: 50,
    hidePrior: 100,
    wallPrior: 20
  },
  "Deff":
  {
    accessKey: "2",
  
    wood: 30, // max. Holzfaeller-Stufe
    stone: 30, // max. Lehmgrube-Stufe
    iron: 30, // max. Eisenmine-Stufe
    main: 20, // max. Hauptgebaeude-Stufe
    barracks: 25, // max. Kasernen-Stufe
    stable: 20, // max. Stall-Stufe
    garage: 0, // max. Werkstatt-Stufe
    snob: 3, // max. Adelshof-Stufe
    smith: 20, // max. Schmiede-Stufe
    place: 1, // max. Versammlungsplatz-Stufe
    market: 18, // max. Marktplatz-Stufe
    farm: 30, // max. Bauernhof-Stufe
    storage: 30, // max. Speicher-Stufe
    hide: 0, // max. Versteck-Stufe
    wall: 20, // max. Wall-Stufe
    
    //Je kleiner, desto höher die Priorität
    //Gibt in Prozent an, wie weit die höher priorisierten
    //Gebäude gebaut sein müssen, damit das nächste Gebäude gebaut wird.
    woodPrior: 0,
    stonePrior: 0,
    ironPrior: 30,
    mainPrior: 40,
    barracksPrior: 100,
    stablePrior: 100,
    garagePrior: 100,
    snobPrior: 50,
    smithPrior: 50,
    placePrior: 50,
    marketPrior: 50,
    farmPrior: 60,
    storagePrior: 50,
    hidePrior: 100,
    wallPrior: 20
  }
};


/*
 *
 * AB HIER NICHTS AENDERN...
 *
 */

var std2lang = 
{
  main: "Hauptgebäude",
  barracks: "Kaserne",
  stable: "Stall",
  garage: "Werkstatt",
  snob: "Adelshof",
  smith: "Schmiede",
  place: "Versammlungsplatz",
  market: "Marktplatz",
  wood: "Holzfäller",
  stone: "Lehmgrube",
  iron: "Eisenmine",
  farm: "Bauernhof",
  storage: "Speicher",
  hide: "Versteck",
  wall: "Wall"
};

var undefined;

/*
var lang2std = Array();
for(var i in std2lang)
  lang2std[std2lang[i]] = i;
*/

var buildings = Array();

var h;
var village;

for(var i in std2lang)
{
  var link = document.getElementById("main_buildlink_"+i);
  if( link == null )
    continue;

  if( h == undefined )
  {
     h = link.getAttribute("href").match(/h=([0-9a-zA-Z]+)/)[1];
     village = link.getAttribute("href").match(/village=([0-9]+)/)[1];
  }
  
  buildings[i] = Array();
  
  var level = link.childNodes[0].wholeText;
  var pos = level.lastIndexOf(" ");
  if( pos < 0 )
    level = 0;
  else
    level = parseInt(level.substring(pos+1)) - 1;

  buildings[i]["level"] = level;
}

function buildingsPriorSort(a, b)
{
  return a.prior - b.prior;
}

var queueCount = document.getElementById("buildqueue");
if( queueCount != null )
  queueCount = queueCount.children.length - 1;
else
  queueCount = 0;

var tables = document.getElementsByTagName("table");
for(var i in tables)
{
  if(tables[i].className == "main")
  {
    var tr = document.createElement("tr");  
    var td = document.createElement("td");
    td.setAttribute("colspan", "3");
    td.setAttribute("id", "__dsAutoBuildButtons");
    

    for(var j in types)
    {
      var type = types[j];
  
      var buildingsPrior = Array();
      
      for(var k in type)
      {
        if( k.indexOf("Prior") > 0 )
          continue;
      
        if( buildings[k] != undefined && buildings[k]["level"] < type[k] )
        {
          var prior = 0;
          
          if( type[k+"Prior"] != undefined )
            prior = type[k+"Prior"];
          
          prior += buildings[k]["level"] / type[k] * 100;
          
          buildingsPrior.push({prior: prior, building: k});
        }
      }
      
      buildingsPrior = buildingsPrior.sort(buildingsPriorSort);
      
      var building;
      
      if( buildingsPrior[0] != undefined )
        building = buildingsPrior[0].building;
      
    
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      
      
      button.appendChild(document.createTextNode(j+(type["accessKey"] != undefined ? "["+type["accessKey"]+"]":"")));
      if( building != undefined && queueCount < maxQueueCount )
      {
        button.appendChild(document.createTextNode(": "+std2lang[building]+" "));
      
        var img = document.createElement("img");
        img.setAttribute("src", "/graphic/buildings/"+building+".png");
        button.appendChild(img);
        
        button.setAttribute("onclick", "onBuild(\""+building+"\", "+village+", \""+h+"\")");
        
        if( type["accessKey"] != undefined )
          button.setAttribute('accesskey', type["accessKey"]);
      }
      else
        button.setAttribute("disabled", "disabled");
        
      td.appendChild(button);
    }
  
    tr.appendChild(td);
    tables[i].getElementsByTagName("table")[0].appendChild(tr);
    
  }
}

function onBuild(type, village, h)
{
  window.location.replace("game.php?village="+village+"&screen=main&action=build&id="+type+"&h="+h);
}

unsafeWindow.onBuild = onBuild;


function onKeyUp(evt)
{
  if( document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA" )
    return;
    
  var key = String.fromCharCode(evt.keyCode);
  var buttons = document.getElementById("__dsAutoBuildButtons").getElementsByTagName("button");
  
  for(var i in buttons)
  {
    var button = buttons[i];
    if( key == button.getAttribute("accesskey") )
    {
      button.click();
      return;
    }
  }
}

document.addEventListener('keyup', onKeyUp, false);
