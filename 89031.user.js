// ==UserScript==
// @name DS Ausbauvarianten
// @description Version 2.3.0 Ermittelt die Ausbauvarianten für x Punkte, Hauptgebäudeerweiterung
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/help2.php?article=points*
// @include http://de*.die-staemme.de/game.php*screen=main*
// @include http://de*.die-staemme.de/game.php*screen=settings&mode=settings*
// @include http://de*.die-staemme.de/game.php*screen=overview_villages*
// @include http://ch*.staemme.ch/help2.php?article=points*
// @include http://ch*.staemme.ch/game.php*screen=main*
// @include http://ch*.staemme.ch/game.php*screen=settings&mode=settings*
// @include http://ch*.staemme.ch/game.php*screen=overview_villages*
// ==/UserScript==

(function() {
var version = "2.3.0";
var texts = {
  de: {
    gui: {
      title: "DS-Ausbauvarianten",
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadBuildingInfo: "Gebäude werden ermittelt...",
      buildingInfoKnown: "Gebäude wurden ermittelt",
      getPoints: "Punkte jetzt ermitteln",
      pointsKnown: "Punkte wurden ermittelt",
      error: "Fehler",
      ok: "Ok",
      pointRangeMin: ["Alle Gebäude auf gewünschtem Minimal-Level ergeben bereits", "Punkte!"], 
      pointRangeMax: ["Alle Gebäude auf gewünschtem Maximal-Level ergeben nur", "Punkte!"], 
      enterName: "Bitte einen Namen angeben!",
      variantSaved: "Variante gespeichert!",
      pointTable: "Punktetabelle",
      selectVariantOption: "(Auswählen)",
      close: "Schliessen",
      needs: "Bedarf",
      buildOption: "Bauoption",
      buildingCompleted: "Gebäude fertig ausgebaut",
      buildingMaxLevel: "Gebäude vollständig ausgebaut",
      destroyLevel: "Abriss um eine Stufe",
      buildingOverbuild: "Gebäude zu weit ausgebaut",
      resTitle: [ "Holz", "Lehm", "Eisen", "Arbeiter" ],
      buildingLevelUp: ["Ausbau auf Stufe ",""],
      minLevels: "Min.",
      maxLevels: "Max.",
      building: "Gebäude",
      level: "Stufe",
      points: "Punkte",
      population: "BH-Plätze",
      targetPoints: "Gewünschte Punktezahl",
      calculateVariants: "Mögliche Varianten ermitteln",
      save: "Speichern",
      iterationWarning: ["Mit den eingegeben Werten gibt es "," zu prüfende Möglichkeiten!\nDie Berechnung wird möglicherweise sehr lange dauern!\nFortfahren?"],
      noResults: ["Mit den eingegeben Grenzwerten konnte keine Kombination mit "," Punkten ermittelt werden!"],
      back: "Zurück",
      nameExists: "Es existiert bereits eine Variante mit diesem Namen!",
      overwrite: "Überschreiben?",
      unknownBaseConfig: "Unbekannte Konfiguration!",
      resAvailable: "Rohstoffe ausreichend verfügbar",
      resAvailableAt: "Rohstoffe verfügbar ",
      farmToSmall: "Der Bauernhof ist zu klein",
      storageToSmall: "Der Speicher ist zu klein",
      buildTime: "Bauzeit (hh:mm:ss)",
      required: "Benötigt:",
      showAllBuildings: "Alle Gebäude einblenden.",
      hideCompletedBuildings: "Komplett ausgebaute Gebäude verstecken",
      noDestroy: "Abriss nicht möglich",
      destroyQueueFull: "Die Abrissschleife ist voll",
      confirmQueue: "Aufträge in der Bauschleife kosten extra. Dennoch bauen?",
      variantName: "Name",
      edit: "Bearbeiten",
      delVariant: "Variante löschen",
      addVariant: "Variante hinzufügen",
      confirmDeleteVariant: "Variante wirklich löschen ?",
      missingRes: "Summe der markierten fehlenden Rohstoffe",
      buildQueueTitle: "Bauaufträge",
      destroy: "Abriß:",
      queueCost: "Zusatzkosten",
      minimize: "minimieren",
      maximize: "maximieren",
      findVariant: "Variante suchen",
      exportData: "Exportieren",
      importData: "Importieren",
      exportHint: "Daten kopieren und extern sichern",
      importDone: "Die Daten wurden importiert",
      unknowVersion: "Unbekannte Version",
      wrongFormat: "Falsches Format",
      wrongworld: "Die Daten sind für von einem anderem Server",
      format: "Formatieren",
    },
    regexp: {
      building: /Gebäude/,
      queueCost: /Zusatzkosten/,
      resAvailable: /Rohstoffe verfügbar/,
      buildDestroy: /([^\(]+)\(Stufe ([^\)]+|abreißen)\)/,
    },
  },
  ch: {
    regexp: {
      building: /Geböide/,
      queueCost: /Zuesätzlichi choschte/,
      resAvailable: /Rohstoff vrfüegbar/,
      buildDestroy: /([^\(]+)\(Stuefe ([^\)]+|abrisse)\)/,
    },
  },
};
texts.ch.gui = texts.de.gui;

var lib = new HypixDSLib("hpxdsav",true);
var sites = [ { key:"addBuildingInfo", href: 'http://'+location.host+'/help2.php?article=points', linkText: texts[lib.lang].gui.getPoints, visitedText: texts[lib.lang].gui.pointsKnown, siteHandler: getPointsAndNames } ];
var serverInfo = new lib.ServerInfo("speed",false,true,sites);
var settings = lib.storage.getValue("settings", {confirmQueue:true,points:0});
var variants = lib.storage.getValue("variants", []);
var vilVar = lib.storage.getValue("vilVar","");
if(vilVar[0] != ";")
  vilVar = ";"+vilVar;

// Opera Bugfix
if( typeof(serverInfo.addBuildingInfo.main.points) == "string" ) {
  for( var key in serverInfo.addBuildingInfo )
    serverInfo.addBuildingInfo[key].points = eval(serverInfo.addBuildingInfo[key].points);
  variants = eval(variants);
}

var requirements = { 
  barracks: { main: 3 }, 
  stable: { main: 10, barracks: 5, smith: 5 }, 
  garage: { main: 10, smith: 10 }, 
  snob: { main: 20, smith: 20, market: 10 },
  smith: { main: 5, barracks: 1 },
  market: { main: 3, storage: 2 },
  wall: {barracks: 1}
};
var ressis = [ "wood", "stone", "iron", "pop" ];
var resImgSrc = [ "holz.png", "lehm.png", "eisen.png" ];
var mining = { wood: 0, stone: 0, iron: 0 };
var curRessis = { wood: 0, stone: 0, iron : 0};
var storageSize = 0;
var queue = { builds: {}, destroys: {}, totalDestroys: 0, cost: false };
var pop;
var popup;

if( lib.params.article == "points" ) {
  var active = false;
  var tab = document.getElementsByClassName("vis")[0];
  var a = tab.getElementsByTagName("a")[1];
  a.innerHTML = texts[lib.lang].gui.title;
  a.href="javascript:;";
  a.addEventListener("click",init,false);

  tab = document.getElementsByClassName("vis")[2];
  a = tab.getElementsByTagName("a")[1];
  a.innerHTML = texts[lib.lang].gui.title;
  a.href="javascript:;";
  a.addEventListener("click",init,false);
  if( lib.storage.getValue("direct") )
  {
    lib.storage.setValue("direct",false);
    init();
  }
}

if( lib.params.screen == "main" ) {
  pop = { current: parseInt(document.getElementById("pop_current").innerHTML,10), max: parseInt(document.getElementById("pop_max").innerHTML,10) };
  storageSize = parseInt(document.getElementById("storage").innerHTML,10);
  for( var i = 0; i < 3; i++ )
  {
    var span = document.getElementById(ressis[i]);
    mining[ressis[i]] = parseInt(span.title,10);
    curRessis[ressis[i]] = parseInt(span.innerHTML);
  }

  var buildDestroy = document.getElementsByClassName("selected")[0];
  if( buildDestroy )
    buildDestroy.parentNode.id="dsav_builddestroy";
  
  var id = vilVar.match(";"+lib.game_data.village.id+",(\\d+)");
  var defVar = lib.storage.getValue("defVar",0);
  if( id )
    id = id[1];
  else
    id = defVar;
  var tab = getBuildingTab();
  tab.rows[0].cells[0].innerHTML = tab.rows[0].cells[0].innerHTML + " ";
  var input = tab.rows[0].cells[0].appendChild(document.createElement("select"));
  input.id = "dsav_variant";
  input.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,defVar==0);
  for( var i = 0; i < variants.length; i++ )
    input.options[i+1] = new Option(variants[i].name,variants[i].id,false,id==variants[i].id);
  input.addEventListener("change", onVariantChanged, false );
  
  var a = tab.rows[0].cells[0].appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
  a.addEventListener("click", showVariants, false);

  var qTab = document.getElementById("build_queue");
  if( qTab )
  {
    var a = qTab.rows[0].cells[0].appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.addEventListener("click", function() { document.getElementById("dsav_build_queue").style.display=""; document.getElementById("build_queue").style.display="none"; lib.storage.setValue("smallQueue",1); }, false );
    a.innerHTML = ' <img src="graphic/map/map_n.png" alt="'+texts[lib.lang].gui.minimize+'" title="'+texts[lib.lang].gui.minimize+'"/>';
    var sqTab = qTab.parentNode.insertBefore(document.createElement("table"),qTab);
    sqTab.id = "dsav_build_queue";
    row = sqTab.insertRow(0);
    cell = row.appendChild(document.createElement("th"));
    cell.colSpan = qTab.rows.length-1;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.buildQueueTitle + " "));
    a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.addEventListener("click", function() { document.getElementById("dsav_build_queue").style.display="none"; document.getElementById("build_queue").style.display=""; lib.storage.setValue("smallQueue",0); }, false );
    a.innerHTML = '<img src="graphic/map/map_s.png" alt="'+texts[lib.lang].gui.maximize+'" title="'+texts[lib.lang].gui.maximize+'"/>';
    if( lib.storage.getValue("smallQueue",1) )
      qTab.style.display = "none";
    else
      sqTab.style.display = "none";
    row = sqTab.insertRow(1);
    for( var i = 1; i < qTab.rows.length; i++ )
    {
      var res = qTab.rows[i].cells[0].innerHTML.match( texts[lib.lang].regexp.buildDestroy );
      if( res )
      {
        var level = parseInt(res[2],10);
        var name = res[1];
        name = name.substring(0,name.length-1);
        for( var key in serverInfo.buildingInfo )
        {
          if( serverInfo.addBuildingInfo[key].name == name )
            break;
        }
        var a = qTab.rows[i].cells[3].firstChild;
        cell = row.insertCell(i-1);
        var html = '<a href="'+a.href+'">';
        if( !isNaN(level) )
        {
          if( i == 1 )
            cell.title = name + " - " + qTab.rows[i].cells[2].innerHTML;
          else
            cell.title = name + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
          queue.builds[key] = level;
        }
        else
        {
          if( i == 1 )
            cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[2].innerHTML;
          else
            cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
          html += '<img src="graphic/overview/down.png" alt="'+texts[lib.lang].gui.destroy+'"/>';
          queue.totalDestroys++;
          if( queue.destroys[key] )
            queue.destroys[key]++
          else
            queue.destroys[key] = 1;
        }
        html += '<img src="graphic/buildings/'+key+'.png" alt="'+name+'"/></a>';
        if( i == 1 )
        {
          html += '<span style="font-size:xx-small;font-weight:bold;" id="dsav_curtime">'+qTab.rows[1].cells[1].innerHTML+'</span>';
          setInterval( function() { document.getElementById("dsav_curtime").innerHTML = document.getElementById("build_queue").rows[1].cells[1].innerHTML; }, 1000 );
        }
        cell.innerHTML = html;
        
      }
      else if( texts[lib.lang].regexp.queueCost.test(qTab.rows[i].cells[0].innerHTML ) )
      {
        var cost = qTab.rows[i].cells[0].innerHTML.match( /<b>([^<]+)</ )[1];
        cell = sqTab.rows[0].appendChild(document.createElement("th"));
        sqTab.rows[0].cells[0].colSpan--;
        cell.innerHTML = '<img src="graphic/gold.png" alt="'+texts[lib.lang].gui.queueCost+'"/>';
        cell.title = texts[lib.lang].gui.queueCost;
        queue.cost = true;
        cell = row.insertCell(i-1);
        cell.innerHTML = "<b>"+cost+"</b>";
      }
    }
  }
  updateMain(id);
}

if( lib.params.screen == "settings" && lib.params.mode == "settings" ) {
  var e = document.getElementsByName("confirm_queue")[0];
  if( e.checked != settings.confirmQueue )
  {
    settings.confirmQueue = e.checked;
    lib.storage.setValue("settings",settings);
  }
}

function getBuildingTab() {
  var tab = document.getElementById("buildinginfo");
  if( !tab )
  {
    tab = document.getElementById("content_value").getElementsByTagName("table");
    for( var i = 0; i < tab.length; i++ )
    {
      if( texts[lib.lang].regexp.building.test(tab[i].rows[0].cells[0].innerHTML) )
      {
        tab = tab[i]
        tab.id = "buildinginfo";
        break;
      }
    }
  }
  return tab;
}

function onVariantChanged() {
  var id = parseInt(document.getElementById("dsav_variant").value,10);
  vilVar = vilVar.replace(new RegExp(";"+lib.game_data.village.id+",\\d+"),"");
  vilVar += ";" + lib.game_data.village.id+","+id;
  lib.storage.setValue("vilVar",vilVar);
  if( id == 0 )
    document.location.reload();    
  else
    updateMain(id);
}

function updateMain(id) {
  var variant;
  for( var i = 0; i < variants.length; i++ )
  {
    if( variants[i].id == id )
    {
      variant = variants[i];
      break;
    }
  }
  var buildDestroy = document.getElementById("dsav_builddestroy");
  var tab = getBuildingTab();

  if( variant )
  {
    var tab = getBuildingTab();
    if( buildDestroy )
    {
      buildDestroy.style.display = "none";
      buildDestroy = true;
    }
    build = lib.params.get("mode","build") == "build";
    if( !build && tab.rows[0].cells.length == 3)
    {
      var cell = tab.rows[0].insertBefore(document.createElement("th"),tab.rows[0].cells[1]);
      cell.innerHTML = texts[lib.lang].gui.needs;
      cell.colSpan = 4;
    }
    tab.rows[0].cells[2].innerHTML = texts[lib.lang].gui.buildTime;
    tab.rows[0].cells[3].innerHTML = texts[lib.lang].gui.buildOption;
    var append = [];
    for( var i = 1; i < tab.rows.length; i++ )
    {
      var state = 0;
      var building = tab.rows[i].cells[0].innerHTML.match(/screen=([^"&]+)/);
      if( building )
      {
        building = building[1];
        var level = parseInt(lib.game_data.village.buildings[building],10);
        if( queue.builds[building] )
          level = queue.builds[building];
        if( !queue.destroys[building] )
          queue.destroys[building] = 0;
        if( level == serverInfo.buildingInfo[building].max_level )
          state = 2;
        if( level - queue.destroys[building] == variant[building] && level < serverInfo.buildingInfo[building].max_level)
        {
          state = 1;
          while( tab.rows[i].cells.length > 2 )
            tab.rows[i].deleteCell(2);
          tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingCompleted;
          tab.rows[i].cells[1].style.color = "";
          tab.rows[i].cells[1].className = "inactive";
          tab.rows[i].cells[1].style.textAlign = "center";
          tab.rows[i].cells[1].colSpan = 6;
        }
        else if( level - queue.destroys[building] > variant[building] )
        {
          state = 3;
          while( tab.rows[i].cells.length > 2 )
            tab.rows[i].deleteCell(2);
          tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingOverbuild;
          tab.rows[i].cells[1].style.color = "#FF0000";
          tab.rows[i].cells[1].style.textAlign = "center";
          tab.rows[i].cells[1].colSpan = 4;
          var cell = tab.rows[i].insertCell(2);
          var val = Math.round(serverInfo.buildingInfo[building].build_time * Math.pow(serverInfo.buildingInfo[building].build_time_factor, level-1-queue.destroys[building]) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
          cell.innerHTML = formatDuration(val);
          cell = tab.rows[i].insertCell(3);
          if( buildDestroy )
          {
            if( queue.totalDestroys < 5 )
            {
              var a = cell.appendChild(document.createElement("a"));
              a.href = lib.createLink("main","action","destroy","h",lib.game_data.csrf,"building_id",building,false);
              a.innerHTML = texts[lib.lang].gui.destroyLevel;
            }
            else
            {
              cell.innerHTML = texts[lib.lang].gui.destroyQueueFull;
              cell.className="inactive";
            }
          }
          else 
          {
            cell.innerHTML = texts[lib.lang].gui.noDestroy;
            cell.className="inactive";
          }
        }
        else if( tab.rows[i].cells.length < 7 )
        {
          var hasRequired = true;
          if( requirements[building] )
          {
            html = texts[lib.lang].gui.required + ' ';
            for( var key in requirements[building] )
            {
              if( parseInt(lib.game_data.village.buildings[key],10) < requirements[building][key] )
                hasRequired = false;
              html += '<img alt="" src="/graphic/buildings/'+key+'.png"> ';
              html += serverInfo.addBuildingInfo[key].name + ' (Stufe ' + requirements[building][key] + ') ';
            }
            if( !hasRequired )
            {
              while( tab.rows[i].cells.length > 2 )
                tab.rows[i].deleteCell(2);
              tab.rows[i].cells[1].innerHTML = html;
              tab.rows[i].className="_toggle";
              tab.rows[i].cells[1].style.textAlign = "center";
              tab.rows[i].cells[1].colSpan = 6;
              tab.rows[i].cells[1].className="";
              append.push(tab.rows[i].innerHTML);
              tab.deleteRow(i);
              i--;
            }
          }
          if( hasRequired )
          {
            if( level - queue.destroys[building] < variant[building] && parseInt(lib.game_data.village.buildings[building],10) < serverInfo.buildingInfo[building].max_level )
            {
              var resoktime = 0;
              var storageSizeOk = true;
              var popok = true;
              while( tab.rows[i].cells.length > 1 )
                tab.rows[i].deleteCell(1);
              for( var r = 0; r < 3; r++ )
              {
                var html = '<img title="'+texts[lib.lang].gui.resTitle[r]+'" src="graphic/'+resImgSrc[r]+'"/> ';
                var val = Math.round(serverInfo.buildingInfo[building][ressis[r]] * Math.pow(serverInfo.buildingInfo[building][ressis[r]+"_factor"], level));
                if( curRessis[ressis[r]] < val )
                {
                  var dif = val - curRessis[ressis[r]];
                  var time = dif / (mining[ressis[r]] / 3600);
                  GM_log( building + ": " + ressis[r] + ": " + dif + " => " + time);
                  if( time > resoktime )
                    resoktime = time;
                  if( val > storageSize )
                    storageSizeOk = false;
                }
                var cell = tab.rows[i].insertCell(r+1);
                cell.innerHTML = html + val;
              }
              GM_log( building + " " + resoktime);
              html = '<img title="'+texts[lib.lang].gui.resTitle[3]+'" src="graphic/face.png"/> ';
              var workers = Math.round(serverInfo.buildingInfo[building].pop * Math.pow(serverInfo.buildingInfo[building].pop_factor, level));
              if( r == 3 && level > 0)
                workers -= Math.round(serverInfo.buildingInfo[building].pop * Math.pow(serverInfo.buildingInfo[building].pop_factor, level-1));
              var cell = tab.rows[i].insertCell(r+1);
              cell.style.whiteSpace = "nowrap";
              cell.innerHTML = html + workers;

              val = Math.round(serverInfo.buildingInfo[building].build_time * Math.pow(serverInfo.buildingInfo[building].build_time_factor, level) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
              tab.rows[i].insertCell(5).innerHTML = formatDuration(val);
              cell = tab.rows[i].insertCell(6);
              if( pop.max - pop.current < workers )
              {
                cell.innerHTML = texts[lib.lang].gui.farmToSmall;
                cell.className = "inactive";
              }
              else if( !storageSizeOk )
              {
                cell.innerHTML = texts[lib.lang].gui.storageToSmall;
                cell.className = "inactive";
              }
              else if( resoktime > 0 )
              {
                cell.innerHTML = texts[lib.lang].gui.resAvailableAt + formatTime(resoktime);
                cell.className = "inactive";
              }
              else if( lib.hasPA || !qTab || qTab.rows.length < 3)
              {
                html = '<a href="'+lib.createLink("main","action","build","h",lib.game_data.csrf,"id",building,"force","",true)+'"';
                if( settings.confirmQueue && queue.cost )
                  html += ' onclick="return confirm(\'' + texts[lib.lang].gui.confirmQueue + '\')"';
                html += '>'+texts[lib.lang].gui.buildingLevelUp[0]+(level+1)+texts[lib.lang].gui.buildingLevelUp[1]+'</a>';
                cell.innerHTML = html;
              }
              else
              {
                cell.innerHTML = texts[lib.lang].gui.resAvailable;
                cell.className = "inactive";
              }
            }
            else if( level == variant[building] )
            {
              state = 2;
              while( tab.rows[i].cells.length > 2 )
                tab.rows[i].deleteCell(2);
              tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingMaxLevel;
              tab.rows[i].cells[1].style.color = "";
              tab.rows[i].cells[1].className = "inactive";
              tab.rows[i].cells[1].style.textAlign = "center";
              tab.rows[i].cells[1].colSpan = 6;
            }
            else if( level - queue.destroys[building] == variant[building] )
            {
              state = 1;
              while( tab.rows[i].cells.length > 2 )
                tab.rows[i].deleteCell(2);
              tab.rows[i].cells[1].innerHTML = texts[lib.lang].gui.buildingCompleted;
              tab.rows[i].cells[1].style.color = "";
              tab.rows[i].cells[1].className = "inactive";
              tab.rows[i].cells[1].style.textAlign = "center";
              tab.rows[i].cells[1].colSpan = 6;            
            }
          }
        }
        tab.rows[i].cells[0].setAttribute("state",state);
      }
    }
    for( var i = 0; i < append.length; i++ )
    {
      var row = tab.insertRow(tab.rows.length);
      row.className = "_toggle";
      row.innerHTML = append[i];
      row.style.display = "none";
    }
    var label;
    if( append.length > 0 )
    {
      var chk = document.getElementById("toggle_reqs");
      if( chk )
        label = chk.parentNode;
      else
      {
        label = tab.parentNode.insertBefore(document.createElement("label"),tab.nextSibling);
        label.innerHTML =  '<input type="checkbox" name="toggle_reqs" id="toggle_reqs" onclick="toggle_visibility_by_class(\'toggle\',\'table-row\')" />' + texts[lib.lang].gui.showAllBuidlings;
      }
    }
    var input = document.getElementById("hide_completed");
    if( input )
    {
      if( !input.checked )
      {
        input.setAttribute("onchange", "");
        input.addEventListener("click", hideCompleted, false);
        input.checked = lib.storage.getValue("hideCompleted", 0) == 1;
        if( input.checked )
          hideCompleted();
      }
    }
    else
    {
      var p = tab.parentNode.insertBefore(document.createElement("p"),append.length > 0 ? label.nextSibling : tab.nextSibling );
      var input = p.appendChild(document.createElement("input"));
      input.type = "checkbox";
      input.id = "hide_completed";
      input.checked = lib.storage.getValue("hideCompleted",0) == 1;
      if( input.checked )
        hideCompleted();
      input.addEventListener("click", hideCompleted, false);
      label = p.appendChild(document.createElement("label"));
      label["for"] = "hide_completed";
      label.innerHTML = texts[lib.lang].gui.hideCompletedBuildings;
    }
  }
  
  for( var i = 1; i < tab.rows.length - 1; i++ )
  {
    if( tab.rows[i].cells.length == 7 && texts[lib.lang].regexp.resAvailable.test(tab.rows[i].cells[6].innerHTML) )
    {
      for( var r = 0; r < 3; r++ )
      {
        var val = parseInt(tab.rows[i].cells[1+r].innerHTML.match(/<[^>]+>\s?(\d+)/)[1],10);
        var dif = val - curRessis[ressis[r]];
        tab.rows[i].cells[1+r].style.whiteSpace="nowrap";
        if( dif > 0 )
          tab.rows[i].cells[1+r].innerHTML = '<img src="graphic/'+resImgSrc[r]+'" alt="" title="'+texts[lib.lang].gui.resTitle[r]+'"/> '+ val + ' <span style="color:red;">('+ dif + ')</span>';
        else
          tab.rows[i].cells[1+r].innerHTML = '<img src="graphic/'+resImgSrc[r]+'" alt="" title="'+texts[lib.lang].gui.resTitle[r]+'"/> '+ val + ' <span class="inactive">(0)</span>';
      }
      tab.rows[i].cells[4].style.whiteSpace="nowrap";
    }
  }
}

function hideCompleted() {
  var checked = document.getElementById("hide_completed").checked;
  lib.storage.setValue("hideCompleted", checked ? 1 : 0 );
  var tab = getBuildingTab();
  for( var i = 1; i < tab.rows.length; i++ )
  {
    var state = parseInt(tab.rows[i].cells[0].getAttribute("state"),10);
    if( state == 1 || state == 2 )
      tab.rows[i].style.display = (checked ? "none":"");
  }
}

function formatTime(secs) {
  var serverTime = getTime();
  var serverTimems = serverTime.getTime();
  var showTime = new Date(serverTimems + secs*1000);
  var tomorrow = new Date(serverTimems + 86400000);
  var v;
  var date;
  if( showTime.getDate() == serverTime.getDate() && showTime.getMonth() == serverTime.getMonth() )
    date = "heute";
  else if( showTime.getDate() == tomorrow.getDate() && showTime.getMonth() == tomorrow.getMonth() )
    date = "morgen";
  else
  {
    v = showTime.getDate()+1;
    date = "am " + (v < 10 ? "0"+v : v);
    v = showTime.getMonth();
    date += "." + (v < 10 ? "0"+v : v);
    date += "."; // + showTime.getFullYear();
  }
  v = showTime.getHours();
  var time = " um " + (v < 10 ? "0"+v : v);
  v = showTime.getMinutes();
  time += ":" + (v < 10 ? "0"+v : v);
//  v = showTime.getSeconds();
//  time += ":" + (v < 10 ? "0"+v : v);
  return date + time + " Uhr";  
}

function formatDuration(secs) {
  var h = Math.floor(secs/3600);
  var m = Math.floor(secs%3600/60);
  var s = Math.floor(secs%60);
  return h + ":" + (m<10?"0":"") + m + ":" + (s<10?"0":"") + s;
}

function getTime() {
  var serverTime = document.getElementById('serverTime').innerHTML.split(':');
  var serverDate = document.getElementById('serverDate').innerHTML.split('/');
  if( serverTime && serverDate )
    return  new Date( parseInt(serverDate[2],10), parseInt(serverDate[1],10), parseInt(serverDate[0],10), parseInt(serverTime[0],10), parseInt(serverTime[1],10), parseInt(serverTime[2],10) );
  else
    return new Date();
}

function init() {
  if( active )
    document.location.reload();
  else
  {
    active = true;
    var tab = document.getElementsByClassName("vis")[0];
    var a = tab.getElementsByTagName("a")[1];
    a.innerHTML = texts[lib.lang].gui.pointTable;

    tab = document.getElementsByClassName("vis")[2];
    a = tab.getElementsByTagName("a")[1];
    a.innerHTML = texts[lib.lang].gui.pointTable;

    tab = document.getElementsByClassName("vis")[1];
    var titleRow = tab.rows[0].innerHTML.replace("Stufe","");
    var html = '<h1>'+texts[lib.lang].gui.title+'</h1>\n';
    html += '<table id="dsav_tab" class="vis">';
    html += '<tr>'+titleRow+'</tr>';
    html += '</table>';
    tab.parentNode.parentNode.innerHTML = html;
    
    var input = document.body.appendChild(document.createElement("input"));
    input.type = "text";
    input.id = "dsav_selrowidx";
    showForm();
  }
}

function showForm() { 
  tab = document.getElementById("dsav_tab");
  while( tab.rows.length > 1 )
    tab.deleteRow(1);
  tab.insertRow(1).insertCell(0).innerHTML = texts[lib.lang].gui.minLevels;
  tab.insertRow(2).insertCell(0).innerHTML = texts[lib.lang].gui.maxLevels;
  if( tab.rows[0].cells[tab.rows[0].cells.length-1].innerHTML == "BH-Plätze" )
    tab.rows[0].deleteCell(tab.rows[0].cells.length-1);
  for( var i = 1; i < tab.rows[0].cells.length; i++ )
  {
    tab.rows[0].cells[i].style.textAlign = "center";
    var building = tab.rows[0].cells[i].innerHTML.match(/\?building=([^']+)/)[1];
    if( typeof(settings[building]) == "undefined" )
      settings[building] = { min: serverInfo.buildingInfo[building].max_level, max: serverInfo.buildingInfo[building].max_level };
    var cell = tab.rows[1].insertCell(i);
    var input = cell.appendChild(document.createElement("input"));
    input.type = "text";
    input.id = "dsav_" + building + "_min";
    input.size = "2";
    input.value = settings[building].min;
    
    cell = tab.rows[2].insertCell(i);
    input = cell.appendChild(document.createElement("input"));
    input.type = "text";
    input.id = "dsav_" + building + "_max";
    input.size = "2";
    val = settings[building].min;
    input.value = settings[building].max;
  }
  cell = tab.insertRow(3).insertCell(0);
  cell.colSpan = 5;
  cell.innerHTML = texts[lib.lang].gui.targetPoints;
  cell = tab.rows[3].insertCell(1);
  cell.colSpan = 2;
  input = cell.appendChild(document.createElement("input"));
  input.type = "text";
  input.id = "dsav_points";
  input.size = 6;
  input.value = settings.points;
  
  cell = tab.rows[3].insertCell(2);
  cell.colSpan = 6; 
  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lib.lang].gui.calculateVariants;
  input.addEventListener("click", calcVariants, false );

  cell = tab.rows[3].insertCell(3);
  cell.colSpan = tab.rows[0].cells.length - 11; 
  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lib.lang].gui.save;
  input.addEventListener("click", saveSettings, false );
}

function calcVariants() {
  var pointRange = saveSettings();
  if( pointRange.min > settings.points )
  {
    alert( texts[lib.lang].gui.pointRangeMin[0] + " " + pointRange.min + " " + texts[lib.lang].gui.pointRangeMin[1] );
    return;
  }
  if( pointRange.max < settings.points )
  {
    alert( texts[lib.lang].gui.pointRangeMax[0] + " " + pointRange.max + " " + texts[lib.lang].gui.pointRangeMax[1] );
    return;
  }
  var tab = document.getElementById("dsav_tab");
  tab.deleteRow(1);
  tab.deleteRow(1);
  tab.deleteRow(1);
  tab.rows[0].appendChild(document.createElement("th")).innerHTML = texts[lib.lang].gui.population;
  var curpoints = 0;
  var maxlevel = 0;
  var curlevel = {};
  var keys = [];
  var iterations = 1;
  for (var key in serverInfo.buildingInfo)
  {
    keys.push(key);
    curlevel[key] = settings[key].min;
    if (curlevel[key] == settings[key].max)
      maxlevel++;
    curpoints += serverInfo.addBuildingInfo[key].points[curlevel[key]];
    var dif = settings[key].max-settings[key].min;
    if( dif > 0 )
      iterations *= dif+1;
  }
  
  if( iterations > 500000 )
  {
    if( !confirm( texts[lib.lang].gui.iterationWarning[0] + iterations + texts[lib.lang].gui.iterationWarning[1] ) )
    {
      showForm();
      return;
    }
  }
  
  var idx = 0;
  var found = 0;
  var done = 0;
  while( maxlevel < keys.length )
  {
    done++;
//    var p = done * 100 / iterations;
    if (curlevel[keys[idx]] > settings[keys[idx]].max)
    {
      idx++;
      while (idx < keys.length && curlevel[keys[idx]] == settings[keys[idx]].max)
        idx++;
      if (idx == keys.length)
        break;
      curlevel[keys[idx]]++;
      do
      {
        idx--;
        curlevel[keys[idx]] = settings[keys[idx]].min;
      } while (idx > 0);
    }
    if (curlevel[keys[idx]] <= settings[keys[idx]].max)
    {
      maxlevel = 0;
      curpoints = 0;
      for (var i = 0; i < keys.length; i++)
      {
        if (curlevel[keys[i]] == settings[keys[i]].max)
          maxlevel++;
       curpoints += serverInfo.addBuildingInfo[keys[i]].points[curlevel[keys[i]]];
      }
      if (curpoints == settings.points)
      {
        var bh = 0;
        found++;
        var row = tab.insertRow(found);
        var cell = row.insertCell(0);
        cell.style.textAlign = "right";
        var a = cell.appendChild(document.createElement("a"));
        a.innerHTML = found + ".";
        a.href = "javascript:;";
        a.addEventListener( "click", showResult, false );
        
        for (var i = 0; i < keys.length; i++)
        {
          if (curlevel[keys[i]] > 0)
            bh += Math.round(serverInfo.buildingInfo[keys[i]].pop * Math.pow(serverInfo.buildingInfo[keys[i]].pop_factor, curlevel[keys[i]]-1));
          var building = tab.rows[0].cells[i+1].innerHTML.match(/\?building=([^']+)/)[1];
          cell = tab.rows[found].insertCell(i+1);
          cell.innerHTML = curlevel[building];
          cell.style.textAlign = "right";
        }
        cell = tab.rows[found].insertCell(i+1);
        cell.innerHTML = bh;
        cell.style.textAlign = "right";
        for( var i = 0; i < variants.length; i++ )
        {
          if( variants[i].points == settings.points )
          {
            for( var k = 0; k < keys.length; k++ )
            {
              if( variants[i][keys[k]] != curlevel[keys[k]] )
                break;
            }
            if( k == keys.length )
              break;
          }
        }
        if( i < variants.length )
          row.cells[0].firstChild.innerHTML = variants[i].name;
      }
      else if( curpoints > settings.points )
        curlevel[keys[idx]] = serverInfo.buildingInfo[keys[idx]].max_level;
      curlevel[keys[idx]]++;
    }
  }
  if( found == 0 )
  {
    var row = tab.insertRow(1);
    var cell = row.insertCell(0);
    cell.colSpan = tab.rows[0].cells.length;
    cell.innerHTML = texts[lib.lang].gui.noResults[0] + settings.points + texts[lib.lang].gui.noResults[1];
  }
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.colSpan = tab.rows[0].cells.length;
  var a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.back;
  a.addEventListener("click", showForm, false);
}

function showResult() {
  var row = this.parentNode.parentNode;
  document.getElementById("dsav_selrowidx").value = row.rowIndex;
  var popup = new lib.Popup("dsav_popup",texts[lib.lang].gui.title + ' - '+this.innerHTML,true,400,500);
  var html = '<table id="dsav_result_tab" width="100%"><tr><th>'+texts[lib.lang].gui.building+'</th><th>'+texts[lib.lang].gui.level+'</th><th>'+texts[lib.lang].gui.points+'</th><th>'+texts[lib.lang].gui.population+'</th>';
  var tab = document.getElementById("dsav_tab");
  for( var i = 1; i < tab.rows[0].cells.length-1; i++ )
  {
    html += '<tr><td>'+tab.rows[0].cells[i].innerHTML+' '+tab.rows[0].cells[i].firstChild.firstChild.title+'</td>';
    var building = tab.rows[0].cells[i].innerHTML.match(/\?building=([^']+)/)[1];
    var level = parseInt(row.cells[i].innerHTML,10);
    html += '<td align="right">'+level+'</td>';
    html += '<td align="right">'+serverInfo.addBuildingInfo[building].points[level]+'</td>';
    html += '<td align="right">'+Math.round(serverInfo.buildingInfo[building].pop * Math.pow(serverInfo.buildingInfo[building].pop_factor, level-1))+'</td>';
    html += '</tr>';
  }
  html += '<tr><td colspan="4"><hr/></td></tr>';
  html += '<tr><td><input type="text" size="10" id="dsav_name" value="'+row.cells[0].firstChild.innerHTML+'"/><a href="javascript:;" id="dsav_save"> &raquo; '+texts[lib.lang].gui.save+'</a></td><td/><td align="right">'+settings.points+'</td><td align="right">'+row.cells[row.cells.length-1].innerHTML+'</td></tr>';
  html += '</table>';
  popup.content.innerHTML = html;
  document.getElementById("dsav_save").addEventListener("click", saveVariant, false);
  popup.setSize();
  popup.show();
}

function saveVariant() {
  var tab = document.getElementById("dsav_tab");
  var name = document.getElementById("dsav_name").value;
  if( name.length == 0 )
    alert( texts[lib.lang].gui.enterName );
  else
  {
    var id = 1;
    for( var i = 0; i < variants.length; i++ )
    {
      if( variants[i].id >= id )
        id = variants[i].id+1;
      if( variants[i].name == name )
      {
        if( confirm( texts[lib.lang].gui.nameExists+"\n"+texts[lib.lang].gui.overwrite ) )
        {
          for( var r = 1; r < tab.rows.length; r++ )
          {
            if( tab.rows[r].cells[0].firstChild.innerHTML == name )
            {
              tab.rows[r].cells[0].firstChild.innerHTML = r+".";
              break;
            }
          }
          break;
        }
        else
          return;
      }
    }
    tab.rows[parseInt(document.getElementById("dsav_selrowidx").value,10)].cells[0].firstChild.innerHTML = name;
    var idx = i;
    if( idx == variants.length )
      variants.push({id: id, name: name});
    tab = document.getElementById("dsav_result_tab");
    for( var i = 1; i < tab.rows.length - 2; i++ )
    {
      var building = tab.rows[i].cells[0].innerHTML.match(/\?building=([^']+)/)[1];
      var level = parseInt(tab.rows[i].cells[1].innerHTML,10);
      variants[idx][building] = level;
    }
    variants[idx].points = settings.points;
    variants.sort(compareVariants);
    lib.storage.setValue("variants",variants);
    alert( texts[lib.lang].gui.variantSaved );
  }
}

function showVariants() {
  popup = new lib.Popup("dsav_popup",texts[lib.lang].gui.title + ' '+version,true,100,100);
  popup.content.style.verticalAlign = "top";
  var div = popup.content.appendChild(document.createElement("div"));
  div.style.postion = "relative";
  div.style.display = "block";
  div.id = "dsav_editvariants";
  var vTab = div.appendChild(document.createElement("table"));
  vTab.style.width = "100%";
  vTab.className = "vis";
  vTab.id = "dsav_variants_tab";
  row = vTab.insertRow(0);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lib.lang].gui.variantName;
  for( var key in serverInfo.buildingInfo )
  {
    cell = row.appendChild(document.createElement("th"));
    cell.innerHTML = '<img title="'+serverInfo.addBuildingInfo[key].name+'" alt="'+serverInfo.addBuildingInfo[key].name+'" src="graphic/buildings/'+key.replace("_f","")+'.png"/>';
    cell.style.textAlign = "center";
  }
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lib.lang].gui.points;
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lib.lang].gui.population;
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "X";
  cell.style.color = "#FF0000";
  var defVar = lib.storage.getValue("defVar",0);
  for( var i = 0; i < variants.length; i++ )
  {
    row = vTab.insertRow(i+1);
    cell = row.insertCell(0);
    cell.style.whiteSpace="nowrap";
    var rb = cell.appendChild(document.createElement("input"));
    rb.type = "checkbox";
    rb.value = variants[i].id;
    rb.checked = defVar == variants[i].id;
    rb.addEventListener("click", setDefaultVariant, false);
    rb.id = "dsav_defvar" + variants[i].id;
    var a = cell.appendChild(document.createElement("a"));
    a.innerHTML = '<img alt="'+texts[lib.lang].gui.edit+'" title="'+texts[lib.lang].gui.edit+'" src="graphic/rename.png"/> ';
    a.href = "javascript:;";
    a.id="dsav_edit"+variants[i].id;
    cell.appendChild(document.createTextNode(variants[i].name));
    a.addEventListener("click", editVariant, false );
    var pts = 0;
    var bh = 0;
    for( var key in serverInfo.buildingInfo )
    {
      cell = row.insertCell(row.cells.length);
      cell.innerHTML = variants[i][key];
      cell.style.width = "25px";
      pts += serverInfo.addBuildingInfo[key].points[variants[i][key]];
      if( variants[i][key] > 0 )
        bh += Math.round(serverInfo.buildingInfo[key].pop*Math.pow(serverInfo.buildingInfo[key].pop_factor,variants[i][key]-1));
    }
    
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = pts;
    cell.style.textAlign = "right";

    cell = row.insertCell(row.cells.length);
    cell.innerHTML = bh;
    cell.style.textAlign = "right";
    
    cell = row.insertCell(row.cells.length);
    a = cell.appendChild(document.createElement("a"));
    a.innerHTML = "X";
    a.style.color = "#FF0000";
    a.href = "javascript:;";
    a.id="dsav_del"+variants[i].id;
    a.title = texts[lib.lang].gui.delVariant;
    a.addEventListener("click", deleteVariant, false);
    
  }
  var vTab = div.appendChild(document.createElement("table"));
  vTab.style.width = "100%";
  row = vTab.insertRow(vTab.rows.length);
  cell = row.insertCell(0);
  var a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.addVariant;
  a.href = "javascript:;";
  a.addEventListener("click", addVariant, false);

  cell = row.insertCell(1);
  cell.style.textAlign = "center";
  a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.importData;
  a.href = "javascript:;";
  a.addEventListener("click", function() { showImportExport(true); }, false);

  cell = row.insertCell(2);
  cell.style.textAlign = "center";
  a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.exportData;
  a.href = "javascript:;";
  a.addEventListener("click", exportData, false);

  cell = row.insertCell(3);
  cell.style.textAlign = "right";
  a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.format;
  a.href = "javascript:;";
  a.addEventListener("click", formatVariants, false);


  cell = row.insertCell(4);
  cell.style.textAlign = "right";
  a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.findVariant;
  a.href = "javascript:;";
  a.addEventListener("click", function() { lib.storage.setValue("direct",true); location.href = "http://"+location.host+"/help2.php?article=points"; }, false);

  popup.setSize();
  popup.show();

  var divImpExp = popup.content.appendChild(document.createElement("div"));
  divImpExp.style.postion = "relative";
  divImpExp.style.display = "none";
  divImpExp.id = "dsav_importexport";
  divImpExp.style.width = div.offsetWidth + "px";
  divImpExp.style.height = div.offsetHeight + "px";
  var tab = divImpExp.appendChild(document.createElement("table"));
  tab.style.width = "100%";
  tab.style.height = divImpExp.style.height;
  row = tab.insertRow(0);
  cell = row.insertCell(0);
  cell.colSpan = 2;
  var input = cell.appendChild(document.createElement("textarea"));
  input.style.width = "100%";
  input.style.height = (popup.content.offsetHeight - 35) + "px";
  input.id = "dsav_importexport_data";
  input.setAttribute("onclick","this.select();");
  
  row = tab.insertRow(1);
  cell = row.insertCell(0);
  
  var a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.importData;
  a.id = "dsav_import_link";
  a.addEventListener("click", importData, false);
  var span = cell.appendChild(document.createElement("span"));
  span.appendChild(document.createTextNode(texts[lib.lang].gui.exportHint));
  span.id="dsav_export_hint";

  cell = row.insertCell(1);
  cell.style.textAlign="right";
  a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.back;
  a.addEventListener("click", function() { document.getElementById("dsav_importexport").style.display="none"; document.getElementById("dsav_editvariants").style.display="block"; }, false);
}

function formatVariants() {
  var str = "[quote="+texts[lib.lang].title+"]";
  var tab = document.getElementById("dsav_variants_tab");
  var idx = tab.rows[0].cells.length-3;
  for( var i = 0; i < variants.length; i++ )
  {
    if( i > 0 )
      str += "---------------------------------------------------------\n";
    str += "[b]"+variants[i].name + " ("+ texts[lib.lang].gui.points + ": " + tab.rows[i+1].cells[idx].innerHTML + ", " + texts[lib.lang].gui.population + ": " + tab.rows[i+1].cells[idx+1].innerHTML + ")[/b]\n";
    for( var key in serverInfo.buildingInfo )
    {
      str += serverInfo.addBuildingInfo[key].name + ": " + variants[i][key] + "\n";
    }
  }
  str += "[/quote]";
  showImportExport(false);
  document.getElementById("dsav_importexport_data").value = str;
}

function showImportExport(imp) {
  var vars = document.getElementById("dsav_editvariants");
  var impexp = document.getElementById("dsav_importexport");
  impexp.style.width = vars.offsetWidth + "px";
  impexp.style.height = vars.offsetHeight + "px";
  impexp.firstChild.style.width = impexp.style.width;
  impexp.firstChild.style.height = impexp.style.height;
  var input = document.getElementById("dsav_importexport_data");
  input.style.height = (vars.offsetHeight - 35) + "px";
  input.value = "";
  vars.style.display="none";  
  impexp.style.display="block"; 
  document.getElementById("dsav_import_link").style.display=imp?"block":"none";
  document.getElementById("dsav_export_hint").style.display=imp?"none":"block";
}

function importData() {
  var lines = document.getElementById("dsav_importexport_data").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
  if( lines[0] == "hpxdsavexp" )
  {
    if( parseInt(lines[1].split(".")[0],10) == 2 )
    {
      if( lines[2] == lib.server ) 
      {
        if( lines[lines.length-1] != "hpxdsavexp" )
          alert(texts[lib.lang].gui.incompleteExp);
        lib.storage.clear();
        for( var i = 3; i < lines.length; i++ )
        {
          var parts = lines[i].split(":");
          if( parts.length > 1 )
          {
            var name = parts[0];
            parts = parts.splice( 1 );
            var value = parts.join(":");
            lib.storage.setString(name,value);
          }
        }
        variants = lib.storage.getValue("variants",[]);
        showVariants();
        document.getElementById("dsav_popup_close").setAttribute("onclick","javascript:document.location.reload();");
      }
      else
        alert(texts[lib.lang].gui.wrongworld);
    }
    else
      alert( texts[lib.lang].gui.unsupportedVersion );
  }
  else
    alert( texts[lib.lang].gui.wrongFormat );
}

function exportData() {
  var keys = lib.storage.listValues();
  var data = "hpxdsavexp\n"+version+"\n"+lib.server+"\n";
  for( var i = 0; i < keys.length; i++ )
  {
    data += keys[i] + ":" + lib.storage.getString(keys[i])+"\n";
  }
  data += "hpxdsavexp";
  showImportExport(false);
  document.getElementById("dsav_importexport_data").value = data;
 }

function setDefaultVariant() {
  var prev = document.getElementById("dsav_defvar"+lib.storage.getValue("defVar",0));
  if( prev )
    prev.checked = false;
  if( this.checked )
    lib.storage.setValue("defVar",parseInt(this.value,10));
  else
    lib.storage.setValue("defVar",0);
}

function addVariant() {
  var tab = document.getElementById("dsav_variants_tab");
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.style.whiteSpace = "nowrap";
  var input = cell.appendChild(document.createElement("input"));
  input.type = "text";
  input.name = "nameNew";
  input.value = "";
  input.style.width = "50px";
  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lib.lang].gui.ok;
  input.addEventListener("click", submitVariant, false);
  i = 1;
  for( var key in serverInfo.buildingInfo )
  {
    cell = row.insertCell(i);
    input = cell.appendChild(document.createElement("input"));
    input.type = "text";
    input.style.width = "20px";
    input.value = serverInfo.buildingInfo[key].max_level;
    input.name = key;
    input.addEventListener("change", variantLevelChanged, false);
    i++;
  }
  row.insertCell(row.cells.length);
  row.insertCell(row.cells.length);
  cell = row.insertCell(row.cells.length);
  a = cell.appendChild(document.createElement("a"));
  a.innerHTML = "X";
  a.style.color = "#FF0000";
  a.href = "javascript:;";
  a.title = texts[lib.lang].gui.delVariant;
  a.addEventListener("click", deleteVariant, false);
  updateVariantValues(row);
  popup.setSize()
}

function editVariant() {
  var row = this.parentNode.parentNode;
  var variant = getVariantIdxById(parseInt(this.id.substring(9),10));
  row.cells[0].innerHTML = "";
  row.cells[0].style.whiteSpace = "nowrap";
  var input = row.cells[0].appendChild(document.createElement("input"));
  input.type = "text";
  input.name = "name" + variants[variant].id;
  input.value = variants[variant].name;
  input.style.width = "50px";
  var input = row.cells[0].appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lib.lang].gui.ok;
  input.addEventListener("click", submitVariant, false);
  i = 1;
  for( var key in serverInfo.buildingInfo )
  {
    row.cells[i].innerHTML = "";
    input = row.cells[i].appendChild(document.createElement("input"));
    input.type = "text";
    input.style.width = "20px";
    input.value = variants[variant][key];
    input.name = key;
    input.addEventListener("change", variantLevelChanged, false);
    i++;
  }
}

function variantLevelChanged() {
  var row = this.parentNode.parentNode;;
  var key = this.name;
  var variant = getVariantIdxById(parseInt(row.cells[0].firstChild.name.substring(4),10));
  var val = parseInt(this.value);
  if( isNaN(val) || val > serverInfo.buildingInfo[key].max_level || val < serverInfo.buildingInfo[key].min_level )
    this.value = variants[variant][key];
  updateVariantValues(row);
}

function updateVariantValues(row) {
  var pts = 0;
  var bh = 0;
  for( var i = 1; i < row.cells.length-3; i++ )
  {
    var input = row.cells[i].firstChild;
    var level = parseInt(input.value,10);
    pts += serverInfo.addBuildingInfo[input.name].points[level];
    if( level > 0 )
      bh += Math.round(serverInfo.buildingInfo[input.name].pop*Math.pow(serverInfo.buildingInfo[input.name].pop_factor,level-1));
  }
  var cell = row.cells[row.cells.length-3];
  cell.innerHTML = pts;
  cell.style.textAlign = "right";
  cell = row.cells[row.cells.length-2];
  cell.innerHTML = bh;
  cell.style.textAlign = "right";
}

function submitVariant() {
  var row = this.parentNode.parentNode;
  var input = row.cells[0].firstChild;
  var variant = getVariantIdxById(parseInt(input.name.substring(4),10));
  var select = document.getElementById("dsav_variant");
  var curId = parseInt(select.value,10);
  if( input.value.length == 0 )
  {
    alert( texts[lib.lang].gui.enterName );
    return;
  }
  var id = 1;
  for( var i = 0; i < variants.length; i++ )
  {
    if( variants[i].id >= id )
      id = variants[i].id + 1;
    if( i != variant && variants[i].name == input.value )
    {
      alert( texts[lib.lang].gui.nameExists );
      return;
    }
  }
  if( variant == -1 )
  {
    variants.push({id:id,name:input.value});
    variant = variants.length-1;
  }
  variants[variant].name = input.value;
  row.cells[0].innerHTML = "";
  var rb = row.cells[0].appendChild(document.createElement("input"));
  rb.type = "checkbox";
  rb.value = variants[variant].id;
  rb.checked = defVar == variants[variant].id;
  rb.addEventListener("click", setDefaultVariant, false);
  rb.id = "dsav_defvar" + variants[variant].id;
  
  var a = row.cells[0].appendChild(document.createElement("a"));
  a.innerHTML = '<img alt="'+texts[lib.lang].gui.edit+'" title="'+texts[lib.lang].gui.edit+'" src="graphic/rename.png"/> ';
  a.href = "javascript:;";
  a.id="dsav_edit"+variants[variant].id;
  row.cells[row.cells.length-1].firstChild.id="dsav_del"+variants[variant].id;
  row.cells[0].appendChild(document.createTextNode(variants[variant].name));
  a.addEventListener("click", editVariant, false );
  for( var i = 1; i < row.cells.length - 3; i++ )
  {
    var key = row.cells[i].firstChild.name;
    var value = parseInt(row.cells[i].firstChild.value,10);
    variants[variant][key]=value;
    row.cells[i].innerHTML = value;
  }
  variants.sort(compareVariants);
  lib.storage.setValue("variants",variants);
  select.innerHTML = "";
  select.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,true,false);
  for( var i = 0; i < variants.length; i++ )
    select.options[i+1] = new Option(variants[i].name,variants[i].id,false,curId==variants[i].id);
  if( parseInt(select.value,10) == variants[variant].id )
    updateMain(variants[variant].id);
}

function compareVariants(a,b) {
  var d = 0; //a.points-b.points; 
  if (d == 0 ) 
  { 
    if( a.name > b.name ) 
      d = 1; 
    else if( a.name < b.name ) 
      d = -1; 
  } 
  return d;
}

function deleteVariant() {
  var row = this.parentNode.parentNode;
  if( row.cells[row.cells.length-1].firstChild.id=="" )
    row.parentNode.removeChild(row);
  else if( confirm(texts[lib.lang].gui.confirmDeleteVariant ) )
  {
    var variant = getVariantIdxById(parseInt(this.id.substring(8),10));
    var delId = variants[variant].id;
    if( lib.storage.getValue("defVar",0) == delId )
      lib.storage.getValue("defVar",0);
    variants.splice(variant,1);
    lib.storage.setValue("variants",variants);
    var select = document.getElementById("dsav_variant");
    row.parentNode.removeChild(row);
    if( parseInt(select.value,10) == delId )
    {
      select.value = 0;
      document.getElementById("dsav_popup_close").setAttribute("onclick","javascript:document.location.reload();");
    }
    select.remove(variant+1);
  }
  popup.setSize();
}

function getVariantIdxById(id) {
  for( var i = 0; i < variants.length; i++ )
    if( variants[i].id == id )
      return i;
  return -1;
}

function saveSettings() {
  var val = parseInt(document.getElementById("dsav_points").value,10);
  if( isNaN(val) )
    val = 0;
  settings.points = val;
  if( typeof(settings.confirmQueue) == "undefined" )
    settings.confirmQueue = true;
  var pointRange = { min: 0, max: 0 };
  for( var key in serverInfo.buildingInfo )
  {
    val = parseInt(document.getElementById("dsav_"+key+"_min").value,10);
    if( isNaN(val) )
      val = serverInfo.buildingInfo[key].min_level;
    if( val < serverInfo.buildingInfo[key].min_level )
      val = serverInfo.buildingInfo[key].min_level;
    if( val > serverInfo.buildingInfo[key].max_level )
      val = serverInfo.buildingInfo[key].max_level;
    settings[key].min = val;
    pointRange.min += serverInfo.addBuildingInfo[key].points[val];

    var val = parseInt(document.getElementById("dsav_"+key+"_max").value,10);
    if( isNaN(val) )
      val = serverInfo.buildingInfo[key].min_level;
    if( val < settings[key].min )
      val = settings[key].min;
    if( val < serverInfo.buildingInfo[key].min_level )
      val = serverInfo.buildingInfo[key].min_level;
    if( val > serverInfo.buildingInfo[key].max_level )
      val = serverInfo.buildingInfo[key].max_level;
    settings[key].max = val;
    pointRange.max += serverInfo.addBuildingInfo[key].points[val];
  }
  lib.storage.setValue("settings",settings);
  return pointRange;
}

function getPointsAndNames() {
  var total = /&total/.test(document.location);
  var tab = document.getElementsByClassName("vis")[1];
  var addBuildingInfo = {}
  for( var i = 1; i < tab.rows[0].cells.length; i++ )
  {
    var building = tab.rows[0].cells[i].innerHTML.match(/\?building=([^']+)/)[1];
    var title = tab.rows[0].cells[i].innerHTML.match(/title="([^"]+)/)[1];
    addBuildingInfo[building] = {};
    addBuildingInfo[building].name = title;
    addBuildingInfo[building].points = [0];
    for( var j = 1; j < tab.rows.length; j++ )
    {
      var val = parseInt(tab.rows[j].cells[i].innerHTML,10);
      if( isNaN(val) )
        break;
      if( !total )
        val += addBuildingInfo[building].points[j-1];
      addBuildingInfo[building].points.push(val);
    }
  }
  return addBuildingInfo;
}

function $(id) {
  return document.getElementById(id);
}
function ce(name) {
  return document.createElement(name);
}

function HypixDSLib(prefix,forceGM) {
  var lib = this;
  this.prefix = prefix;
  this.Debug = function() {
    this.log = function(msg) {
      if( typeof(GM_log) == "function" )
        GM_log(msg);
      else if( opera )
        opera.postError(msg);
      else if( console )
        console.log(msg);
      else
        alert(msg);
    }  
    
    this.dumpObj = function(obj) {
      var str = "\n {";
      for( var key in obj ) {
        if( typeof( obj[key] ) == "object" ) {
          str += "\n" + key + ":";
          str += this.dumpObj(obj[key],true)
        }
        else
          str += "\n" + key + ": " + obj[key];
      }
      str += "\n}";
      if( arguments.length == 1 || !arguments[1] )
        this.log(str);
      return str;
    }
  }
  this.ServerInfo = function(cfgVals,needUnitInfo,needBuildingInfo,sites) {
    var cfg = this;
    if( typeof(sites) == "undefined" )
      sites = [];
    var allData = true;
    var ajaxReq = 0;
    var ajaxLoaded = 0;
    this.config = lib.storage.getValue("svrcfg");
    if( cfgVals.length > 0 && typeof(this.config) == "undefined" )
      allData = false;
    this.buildingInfo = lib.storage.getValue("buildinginfo");
    if( needBuildingInfo && typeof(this.buildingInfo) == "undefined" )
      allData = false;
    this.unitInfo = lib.storage.getValue("unitInfo");
    if( needUnitInfo && typeof(this.unitInfo) == "undefined" )
      allData = false;
    for( var i = 0; i < sites.length; i++ ) {
      this[sites[i].key] = lib.storage.getValue(sites[i].key);
      if( typeof(this[sites[i].key]) == "undefined" )
        allData = false;
    }
    if( !allData ) {
      var popup = new lib.Popup("loadcfg",texts[lib.lang].gui.title+" "+version,true,0,0);
      var html = '<table style="width:100%;">';
      if( cfgVals.length > 0 ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.config ) == "undefined" ) {
          html += texts[lib.lang].gui.loadServerCfg+'<span id="'+lib.prefix+'_svrcfg"/>';
          loadServerCfg(cfgVals.split(","));
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.serverCfgKnown+'</span>';
          ajaxLoaded++;
        }
        html += '</td></tr>';
      }
      if( needUnitInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.unitInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadUnitInfo+'<span id="'+lib.prefix+'_unitinfo"/>';
          loadUnitInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.unitInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      if( needBuildingInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.buildingInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadBuildingInfo+'<span id="'+lib.prefix+'_buildinginfo"/>';
          loadBuildingInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.buildingInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      html += '</table><table id="'+lib.prefix+'_sites"';
      if( ajaxLoaded < ajaxReq )
        html += ' style="display:none"';
      else {
        for( var i = 0; i < sites.length; i++ ) {
          if( location.href == sites[i].href ) {
            try {
              this[sites[i].key] = sites[i].siteHandler();
              lib.storage.setValue(sites[i].key,this[sites[i].key]);
            }
            catch(e) {
              lib.debug.log(sites[i].key + ": " + e.message);
            }
            break;
          }
        }
      }
      html += ">";
      for( var i = 0; i < sites.length; i++ ) {
        html += '<tr><td>';
        if( typeof(this[sites[i].key]) == "undefined" )
          html += '<a href="'+sites[i].href+'">'+sites[i].linkText+'</a>';
        else
          html += '<span style="color:green;">'+sites[i].visitedText+'</span>';
        html += '</td></tr>';
      }
      html += "</table>";
      popup.content.innerHTML = html;
      popup.setSize(300);
      popup.show();
    }
    
    function loadServerCfg(cfgVals) {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");
      
      req.open("GET", "/interface.php?func=get_config", true);
      req.onreadystatechange = 
      function() {
            
        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_svrcfg");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {
    
            cfg.config = {};
            var xml = req.responseXML;
            for( var i = 0; i < cfgVals.length; i++ ) {
              var path = cfgVals[i].split("/");
              var name = "";
              var e = xml;
              for( var j = 0; j < path.length; j++ ) {
                e = e.getElementsByTagName(path[j]);
                var len = e.length;
                e = e[0];
                if( len > 0 ) {
                  if( j > 0 ) 
                    name += "_";
                  name += path[j];
                }
                else
                  break;
              }
              var val = null;
              if( e )
                cfg.config[name] = parseFloat(e.firstChild.nodeValue);
              else
                lib.debug.log( cfgVals[i] + " not found" );
            }
            lib.storage.setValue( "svrcfg", cfg.config );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
    
    function loadUnitInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");
      
      req.open("GET", "/interface.php?func=get_unit_info", true);
      req.onreadystatechange = 
      function() {
            
        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_unitinfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {
    
            var xml = req.responseXML;
            cfg.unitInfo = {};
            var e = xml.firstChild;
            var bit = 1;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var unitnode = e.childNodes[i];
              if( unitnode.nodeName != "#text" ) {
                cfg.unitInfo[unitnode.nodeName] = {}; 
                for( var c = 0; c < unitnode.childNodes.length; c++ ) {
                  var node = unitnode.childNodes[c];
                  if( node.nodeName != "#text" )
                    cfg.unitInfo[unitnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }        
            lib.storage.setValue( "unitInfo", cfg.unitInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display="";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
    function loadBuildingInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");
      
      req.open("GET", "/interface.php?func=get_building_info", true);
      req.onreadystatechange = 
      function() {
            
        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_buildinginfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {
    
            var xml = req.responseXML;
            cfg.buildingInfo = {};
            var e = xml.firstChild;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var buildingnode = e.childNodes[i];
              if( buildingnode.nodeName != "#text" ) {
                cfg.buildingInfo[buildingnode.nodeName] = {};
                for( var c = 0; c < buildingnode.childNodes.length; c++ ) {
                  var node = buildingnode.childNodes[c];
                  if( node.nodeName != "#text" )
                    cfg.buildingInfo[buildingnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }        
            lib.storage.setValue( "buildinginfo", cfg.buildingInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
  }
  this.StorageHandler = function(forceGM) {
    var gm = typeof(unsafeWindow) != "undefined";
    var win = gm ? unsafeWindow : window;
    var ls = false;
    var intGetValue;
    var intSetValue;
    var prefix = lib.prefix;
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.log(e.message);}
    if( forceGM && gm || !ls) {
      if( gm ) {
        prefix = prefix + "_" + document.location.host.split('.')[0];
        intSetValue = function(key,value) {
          GM_setValue(prefix+"_"+key,value);
        };
        intGetValue = function(key,defaultValue) {
          return GM_getValue(prefix+"_" + key, defaultValue);
        }
        this.deleteValue = function(key) {
          GM_deleteValue(prefix+"_"+key);
        }
        this.listValues = function(re) {
          var allkeys = GM_listValues();
          var serverKeys = [];
          var rePrefix = new RegExp("^"+prefix+"_(.*)$");
          if( typeof(re) != "undefined" )
            var reKey = new RegExp(re);
          for( var i = 0; i < allkeys.length; i++ ) {
            var res = allkeys[i].match(rePrefix);
            if( res ) {
              if( reKey ) {
                res = res[1].match(reKey);
                if( res )
                  serverKeys.push(res);
              }
              else
                serverKeys.push(res[1]);
            }
          }
          return serverKeys;
        }
      }
      else {
        alert( "Keine geeignete Speichermöglichkeit gefunden!");
        end;
      }
    }
    else if( ls ) {
      intSetValue = function(key,value) {
        localStorage.setItem(prefix+"_"+key, value );
      };    
      intGetValue = function(key,defaultValue) {
        var value = localStorage.getItem(prefix+"_"+key);
        if( value )
          return value;
        else
          return defaultValue;
      };
      this.deleteValue = function(key) {
        localStorage.removeItem(prefix+"_"+key);
      }
      this.listValues = function(re) {
        var keys = [];
        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
        if( typeof(re) != "undefined")
          var reKey = new RegExp(re);
        for( var i = 0; i < win.localStorage.length; i++ ) {
          var res = localStorage.key(i).match(rePrefix);
          if( res ) {
            if( reKey ) {
              res = res[1].match(reKey);
              if( res )
                keys.push(res);
            }
            else
              keys.push(res[1]);
          }
        }
        return keys;
      }
    }
    else {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
    this.clear = function(re) {
      var keys = this.listValues(re);
      for( var i = 0; i < keys.length; i++ )
        this.deleteValue(keys[i]);
    }
    this.setValue = function(key,value) {
      switch( typeof(value) ) {
        case "object":
        case "function":
          intSetValue(key,"j"+JSON.stringify(value));
          break;
        case "number":
          intSetValue(key,"n"+value);
          break;
        case "boolean":
          intSetValue(key,"b" + (value ? 1 : 0));
          break;
        case "string":
          intSetValue(key,"s" + value );
          break;
        case "undefined":
          intSetValue(key,"u");
          break;
      }
    }  
    this.getValue = function(key,defaultValue) {
      var str = intGetValue(key);
      if( typeof(str) != "undefined" ) {
        switch( str[0] ) {
          case "j":
            return JSON.parse(str.substring(1));
          case "n":
            return parseFloat(str.substring(1));
          case "b":
            return str[1] == "1";
          case "s":
            return str.substring(1);
          default:
            this.deleteValue(key);
        }
      }
      return defaultValue;
    }
    this.getString = function(key) {
      return intGetValue(key);
    }
    this.setString = function(key,value) {
      intSetValue(key,value);
    }
  }
  this.Popup = function(id,title,close,width,height) {
    var THIS = this;
    id = lib.prefix+"_"+id;
    this.div = $(id);
    this.shadowDiv = $("hpx_shadow_div");
    if( this.shadowDiv === null ) {
      this.shadowDiv = document.body.appendChild(ce("div"));
      this.shadowDiv.id = "hpx_shadow_div";
      this.shadowDiv.style.position = "fixed";
      this.shadowDiv.style.left = "0px";
      this.shadowDiv.style.top = "0px";
      this.shadowDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
      this.shadowDiv.style.zIndex = 999;
      this.shadowDiv.style.display = "none";
    }
    this.prevShadowDisplay = this.shadowDiv.style.display;
    if( this.div === null ) {
      this.div = document.body.appendChild(ce("div"));
      this.div.id = id;
      this.div.style.position = "absolute";
      this.div.style.zIndex = 1000;
      this.div.style.display = "none";
    }
    this.div.innerHTML = "";
    var tab = this.div.appendChild(ce("table"));
    tab.className = "main";
    tab.style.border = "2px solid #804000";
    var row = tab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    if( close ) {
      var titleTab = cell.appendChild(ce("table"));
      titleTab.style.width = "100%";
      row = titleTab.insertRow(0);
      this.titleCell = row.insertCell(0);
      this.titleCell.appendChild(document.createTextNode(title));
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      var a = cell.appendChild(ce("a"));
      a.id = id+"_close";
      a.href = "javascript:;";
      a.appendChild(document.createTextNode(texts[lib.lang].gui.close));
      a.addEventListener("click", function() { THIS.hide(); }, false);
    }
    else {
      this.titleCell = cell;
      cell.appendChild(document.createTextNode(title));
    }
    this.content = tab.insertRow(1).insertCell(0);
    this.resize = function() {
      THIS.shadowDiv.style.width = self.innerWidth + "px";
      THIS.shadowDiv.style.height =  self.innerHeight + "px";
  //    THIS.center();
    }
    this.center = function() {
      THIS.div.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-THIS.div.offsetWidth)/2)) +"px";
      THIS.div.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-THIS.div.offsetHeight)/2)) + "px";
    }
    this.show = function() {
      var show = arguments.length == 0 || arguments[0] == true;
      THIS.shadowDiv.style.display = show ? "block" : this.prevShadowDisplay; 
      THIS.div.style.display = show ? "block" : "none";  
      if( show ) {
        window.addEventListener("resize", THIS.resize, false);
        THIS.resize();
        THIS.center();
  //      window.addEventListener("scroll", this.center, false);
      }
      else {
        window.removeEventListener("resize", this.resize, false);
  //      window.removeEventListener("scroll", this.center, false);
      }
    }
    this.hide = function() {
      THIS.show(false);
    }
    this.setSize = function(width,height) {
      var display = THIS.div.style.display;
      THIS.div.style.display = "block";
      if( typeof(width) == "undefined" )
        width = tab.offsetWidth;
      if( typeof(height) == "undefined" )
        height = tab.offsetHeight;
      THIS.div.style.display = display;
      THIS.div.style.width = width + "px";
      THIS.div.style.height = height + "px";
      THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0,width - 8) +"px";
      THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0,height - 50) + "px";
      THIS.center();
    }
    this.setSize(width,height);
    this.setTitle = function(title) {
      THIS.titleCell.innerHTML = "";
      THIS.titleCell.appendChild(document.createTextNode(title));
    }
  }
  this.parseParams = function(url) {
    url = url.substring(url.indexOf("?")+1);
    url = url.replace( /&amp;/g, "&" );
    var hash = url.indexOf("#");
    if( hash > -1 )
      url = url.substring(0,hash-1);
    url = url.split("&");
    var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
    for( var i = 0; i < url.length; i++ ) {
      var param = url[i].split("=");
      params[param[0]] = param[1];
    }
    return params;
  }
  this.getGameData = function() {
    var game_data;
    if(typeof(unsafeWindow) != 'undefined') {
      game_data = unsafeWindow.game_data;
    }
    else {
      var script = ce("script");
      script.type = "application/javascript";
      script.textContent = 	"var input=document.createElement('input');" + 
                  "input.type='hidden';" + 
                  "input.value=JSON.stringify(game_data);"  + 
                  "input.id='game_data';" + 
                  "document.body.appendChild(input);";
      document.body.appendChild(script);
      document.body.removeChild(script);
      
      eval("game_data=" + $("game_data").value + ";");
    }
    if( game_data )
      game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
    return game_data;
  }
  this.createLink = function(screen) {
    var lnk = this.game_data.link_base.replace("screen=","screen="+screen);
    var len = arguments.length - 1;
    for( var i = 1; i < len; i++ ) {
      lnk += "&" + arguments[i] + "=";
      i++;
      if( i < len )
        lnk += arguments[i];
    }
    if( arguments[len] == true)
      lnk.replace( /&/g, "&amp;" );
    return lnk;
  }
  this.fireEvent = function(node,evt) {
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent( evt, true, true );
    node.dispatchEvent(evObj);
  }
  this.getElementPos = function(e) {
    var e1=e, e2=e;
    var x=0, y=0;
    if(e1.offsetParent) {
      do {
        x += e1.offsetLeft;
        y += e1.offsetTop;
      } while(e1 = e1.offsetParent);
    }
    while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
      x -= e2.scrollLeft;
      y -= e2.scrollTop;
    }
    return [x, y];
  }
  this.getServerTime = function() {
    try {
      var span = $("serverTime");
      var hms = span.firstChild.nodeValue.split(":");
      span = $("serverDate");
      var dmy = span.firstChild.nodeValue.split("/");
      return new Date( parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10), parseInt(hms[0], 10), parseInt(hms[1], 10), parseInt( hms[2], 10 ));
    }
    catch(e) {
      return new Date();
    }
  }
  this.getTimeDiff = function() {
    return this.serverTime.getTime() / 1000 - new Date().getTime() / 1000;
  }
  this.getTime = function() {
    return parseInt(new Date().getTime() / 1000 + this.timeDiff, 10);
  }
  this.padLeft = function(str,chr,len) {
    var ret = str.toString();
    var pad = len - ret.length;
    for( var i = 0; i < pad; i++ )
      ret = chr + ret;
    return ret;
  }
  this.formatNumber = function(nr,dotted,greyspan,shortMode) {
    var ret = "";
    if( nr == 0 )
      return "0";
    if( shortMode > 0 && nr > 999999 ) {
      var tmp = Math.round(nr / 10000);
      var tmp2 = tmp % 100;
      ret = lib.formatNumber( Math.floor(tmp / 100), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + (tmp2 < 10?'0':'') + tmp2 + ' Mio.';
    }
    else if( shortMode == 2 && nr > 999 ) {
      var tmp = Math.round( nr / 100);
      var tmp2 = tmp % 10;
      ret = lib.formatNumber( Math.floor(tmp/10), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + tmp2 + 'k';
    }
    else if( dotted ) {
      nr = nr.toString();
      var len = nr.length;
      for( var i = 0; i < len; i++ ) {
        ret += nr[i];
        var j = len-i;
        if( j == 10 || j == 7 || j == 4 ) { //i < len-1 && (len-i-1) % 3 == 0 )
          if( greyspan )
            ret += '<span class="grey">.</span>';
          else
            ret += '.';
        }
      }
    }
    else
      ret = nr;
    return ret;
  }
  this.serverTime = this.getServerTime();
  this.timeDiff = this.getTimeDiff();
  this.debug = new this.Debug();
  this.storage = new this.StorageHandler(forceGM);
  this.params = this.parseParams(location.href);
  this.server = document.location.host.split('.')[0];
  var res = this.server.match(/^([a-z]+)(\d+)/);
  this.lang = res[1];
  this.world = parseInt(res[2], 10);
  if( this.lang == "des" || (this.lang == "ch" && this.world < 4) || this.lang == "chs" )
    this.lang = "de";
  this.hasPA = false;
  var menu = $("menu_row");
  if( menu && /screen=memo/.test(menu.innerHTML) )
    this.hasPA = true;
  if( this.params.screen )
    this.game_data = this.getGameData();
}

})();
