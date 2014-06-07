// ==UserScript==
// @name	 DS SOS-Format und Inc-Renamer
// @description Version 1.1.5 - Formatiert die Unterstützungsanforderung um/Inc-Renamer
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*screen=reqdef*
// @include http://de*.die-staemme.de/game.php*screen=info_command*type=other*
// @include http://de*.die-staemme.de/game.php*screen=overview_villages*


// ==/UserScript==

(function() {
// Platzhalter:
// {DEFVILLAGE}                   BB-Code des zu verteidigenden Dorfes
// {DEFVILLAGEPOINTS}    Punkte des zu verteidigenden Dorfes
// {DEFENDERNAME}           BB-Code des Verteidigers (Spieler)
// {DEFENDERALLY}             BB-Code des Stammes des Verteidigers
// {DEFENDERPOINTS}       Punkte des Verteidigers
// {UNITNAME}                    Einheitensymbol + Anzahl der im Verteidigerdorf stehenden Einheiten UNITNAME ist durch einen  Einheitentyp zu ersetzen: SPEAR, SWORD,AXE,ARCHER,SPY,LIGHT,MARCHER,HEAVY,RAM,CATAPULT,KNIGHT,SNOB
// {UNITNAME?}                  Wie {UNITNAME} , nur das es weggelassen wird, wenn 0 Einheiten da sind 
// {FARMINFOS}                  Infos über den Bauernhof (nur wenn BH-Regel aktiv)
// {WALL}                               tufe des Walls im angegriffenen Dorf
// {ATTS}                               Die Liste der Angriffe

// Farminfos
// {FARMFREE}                      Anzahl der nach der BH-Regel noch freien BH-Plätze
// {FARMUSED}                     BH-Plätze der anwesenden Truppen
// {FARMMAX}                      BH-Plätze die nach BH-Regel ohne Malus belegt werden können
// {FARMLEVEL}                    Level des Bauernhofs

// Angriffe:
// {IMG}                                  Bild für die langsamste Einheit (wenn bekannt)
// {NAME}                               Name des Angriffs (wenn bekannt, oder "Angriff")
// {NR}                                     Laufende Nummer des Angriffs
// {TIME}                                Ankunftszeit
// {VILLAGE}                          BB-Code des angreifenden Dorfes
// {ATTACKERNAME}           BB-Code des angreifenden Spielers
// {ATTACKERALLY}             BB-Cpde des Stammes vom angreifenden Spieler
// {ATTACKERPOINTS}       Punkte des angreifenden Spielers

// Renamer:
// {UNIT}                               Name der Einheit
// {SRCX}                               X-Koordinate des Angreiferdorfes
// {SRCY}                               Y-Koordinate des Angreiferdorfes
// {SRCK}                               Kontinent des Angreiferdorfes
// {SRCNAME}                      Name des Angreiferdorfes
// {DSTX}                               X-Koordinate des Verteidigerdorfes
// {DSTY}                               Y-Koordinate des Verteidigerdorfes
// {DSTK}                               Kontinent des Verteidigerdorfes
// {DSTNAME}                      Name des Verteidigerdorfes
// {ATTACKER}                      Spielername des Angreifers
// {DURATION}                     Laufzeit der Truppen (mit angenommener langsamester Einheit)
// {DIST}                                Entfernung der beiden Dörfer in Feldern
// {START}                             Startzeit der Truppen (mit angenommener langsamester Einheit)
// {ARRIVAL}                         Ankunftszeit der Truppen
// {RETURN}                           Rückkehrzeit der Truppen (mit angenommener langsamester Einheit)
// {ID}                                     ID Des Angriffs
// {DATE}                                Zeitpunkt der Umbenennung

// Vorlage für die Defanforderung eines Dorfes
var template = "[u][b]Angriffe auf {DEFVILLAGE} ({ATTCOUNT}):[/b][/u] (Punkte: {DEFVILLAGEPOINTS})\n" +
               "Deff im Dorf: {SPEAR?}{SWORD?}{AXE?}{ARCHER?}{SPY?}{LIGHT?}{MARCHER?}{HEAVY?}{RAM?}{CATAPULT?}{KNIGHT?}{SNOB?}Wall: {WALL}\n" + 
               "{FARMINFOS}" + 
               "{ATTS}\n";
// Vorlage für die Farminfos
var farminfotemplate = "[b]Bauernhof:[/b] Level:{FARMLEVEL} Belegt: {FARMUSED} Frei: {FARMFREE} Gesamt: {FARMMAX}\n";
// Vorlage für einen einzelnen Angriff
var atttemplate = "{NR}. {IMG} [b]{TIME}[/b] von {ATTACKERNAME} ({ATTACKERALLY}) aus {VILLAGE} {NAME}\n";
// Vorlage für die Umbennenung eines Angriffes
var renametemplate = "{UNIT} {SRCX}|{SRCY} K{SRCK} - {DSTX}|{DSTY} K{DSTK}";
// Namen für die Einheiten, die der Renamer verwendet
var unitnames = { spear: "Speer", sword: "Schwert", axe: "Axt", archer: "Bogen", spy: "Späher", light: "LKav", marcher: "BB", heavy: "SKav", ram: "Ramm", catapult: "Kata", knight: "Pala", snob: "***AG***" };

// ===============================================================================================================================================================================================================================================================================
// AB HIER FINGER WEG ;-)

var texts = {
  de: {
    gui: {
      title: "DS-SOS-Formater",
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadUnitInfo: "Einheiten werden ermittelt...",
      unitInfoKnown: "Einheiten wurden ermittelt",
      error: "Fehler",
      ok: "Ok",
      close: "Schliessen",
    }
  }
}
var version = "1.1.5";
var lib = new HypixDSLib("hpxdssf",true);
var serverInfo = new lib.ServerInfo("game/farm_limit,misc/millis_arrival,snob/max_dist",true,false);
var now = lib.getTime();
if( lib.storage.getValue("lastcleanup",0) < now - 86400 ) {
  var vals = lib.storage.listValues("\\d+");
  for( var i = 0; i < vals.length; vals++ ) {
    var data = lib.storage.getValue(vals[i]);
    if( data[10].toString().length > now.toString().length )
      data[10] /= 1000;
    if( data[10] < now )
      lib.storage.deleteValue(vals[i]);
  }
  var bhlvls = lib.storage.getValue("bhlvls",";").split(";");
  var newbhvls = ";";
  var ts = now - 864000
  for( var i = 1; i < bhlvls.length-1; i++ ) {
    var data = bhlvls[i].split(",");
    if( data[2] > ts )
      newbhlvls += bhlvls[i] + ";";
  }
  lib.storage.setValue("bhlvls",newbhvls);
  lib.storage.setValue("lastcleanup",now);
}
if( lib.params.screen == "reqdef" ) {
  var form, msg;
  form = document.getElementById("reqdef_form");
  form.addEventListener("submit", formatMessage, false);
  msg = document.getElementById("message");
  var tab = getByTagName(form,"table","firstChild");
  tab.rows[0].insertBefore(document.createElement("th"),tab.rows[0].cells[1]).textContent = "Ziel";
  tab.rows[0].insertBefore(document.createElement("th"),tab.rows[0].cells[2]).textContent = "Herkunft";
  for( var i = 1; i < tab.rows.length - 1; i++ ) {
    var id = tab.rows[i].cells[0].innerHTML.match(/command_ids\[(\d+)\]/)[1];
    var data = lib.storage.getValue(id);
    var cell = tab.rows[i].insertCell(1);
    if( data ) {
      var a = cell.appendChild(document.createElement("a"));
      a.href = lib.createLink("overview",false).replace(/village=\d+/,"village="+data[0]);
      a.textContent = data[1] + " ("+data[2]+"|"+data[3]+") K"+data[4];
    }
    else {
      cell.className = "grey";
      cell.textContent = "???";
    }
    cell = tab.rows[i].insertCell(2);
    if( data ) {
      var a = cell.appendChild(document.createElement("a"));
      a.href = lib.createLink("info_village","id",data[5],false);
      a.textContent = data[6] + " ("+data[7]+"|"+data[8]+") K"+data[9];
      var str = tab.rows[i].cells[4].textContent;
      var str = str.substr(0,str.length - 4) + ':' + lib.padLeft(Math.floor(data[10]/1000)%60,"0",2);
      if( serverInfo.config.misc_millis_arrival )
        str += ':<span class="small">'+lib.padLeft(data[10]%1000,"0",3)+"</span>";
      tab.rows[i].cells[4].innerHTML = str + " Uhr";
    }
    else {
      cell.className = "grey";
      cell.textContent = "???";
    }
  }
  formatMessage();
}
else if( lib.params.screen == "info_command" ) {
  var data = [];
  var cmdtab = getByTagName(document.getElementById("content_value"),"table","firstChild");
  var rttab = getByTagName(document.getElementById("running_times"),"table","firstChild");
  if( cmdtab && rttab ) {
    var curCoords = {};
    var resttime = 0;
    var attacker = { name: null, village: null };
    var arrTime = 0;
    var retTime = 0;
    var duration = 0;
    var dist = 0;
    var ms = 0;
    var startAgo = 0;
    for( var i = 1; i < cmdtab.rows.length; i++ ) {
      if( cmdtab.rows[i].cells[0].textContent.indexOf("Herkunft") > -1 ) {
        attacker.name = cmdtab.rows[i].cells[2].textContent;
        var str = cmdtab.rows[i+1].cells[1].textContent;
        var idx = str.lastIndexOf("(");
        var coords = str.match(/\((\d+)\|(\d+)\) K(\d+)$/);
        attacker.village = { name: str.substr(0,idx-1), coords: { x: parseInt(coords[1],10), y: parseInt(coords[2],10), k: parseInt(coords[3],10) } };
        data[5] = parseInt(cmdtab.rows[i+1].cells[1].innerHTML.match(/id=(\d+)/)[1],10);
        data[6] = attacker.village.name;
        data[7] = attacker.village.coords.x;
        data[8] = attacker.village.coords.y;
        data[9] = attacker.village.coords.k;
      }
      else if( cmdtab.rows[i].cells[0].textContent.indexOf("Ziel") > -1 ) {
        var str = cmdtab.rows[i+1].cells[1].textContent;
        var idx = str.lastIndexOf("(");
        var coords = str.match(/\((\d+)\|(\d+)\) K(\d+)$/);
        var curCoords = { x: parseInt(coords[1],10), y: parseInt(coords[2],10), k: parseInt(coords[3],10) };
        data[0] = parseInt(cmdtab.rows[i+1].cells[1].innerHTML.match(/id=(\d+)/)[1],10);
        data[1] = str.substr(0,idx-1);
        data[2] = curCoords.x;
        data[3] = curCoords.y;
        data[4] = curCoords.k;
      }
      else if( cmdtab.rows[i].cells[0].textContent.indexOf("Ankunft:") > -1 ) {
        arrTime = parseTime(cmdtab.rows[i].cells[1].textContent);
        data.push(arrTime);
        lib.storage.setValue(lib.params.id,data);
      }
      else if( cmdtab.rows[i].cells[0].textContent.indexOf("Ankunft in") > -1 ) {
        resttime = parseDuration(cmdtab.rows[i].cells[1].textContent); 
        var row = cmdtab.insertRow(i+1);
        var cell = row.insertCell(-1);
        cell.colSpan = 2;
        cell.textContent = "Entfernung:";
        cell = row.insertCell(-1);
        dist = Math.round(Math.sqrt(Math.pow(curCoords.x - attacker.village.coords.x, 2) + Math.pow(curCoords.y - attacker.village.coords.y, 2))*100)/100;
        cell.textContent = dist + " Felder";
        break;
      }
    }
    rttab.rows[0].cells[0].colSpan++;
    var cell = rttab.rows[1].insertBefore(ce("th"),rttab.rows[1].cells[1]);
    cell.textContent = "Startzeit";
    for( var i = 2; i < rttab.rows.length; i++ ) {
      var unit = rttab.rows[i].cells[0].innerHTML.match(/unit_([^\.]+)\.png/)[1];
      var duration = parseDuration(rttab.rows[i].cells[1].textContent);
      var retTime = arrTime + duration*1000;
      retTime = retTime - ms;
      var startTime = arrTime - duration*1000;
      var cell = rttab.rows[i].insertCell(1);
      cell.textContent = "vor " + formatDuration(duration-resttime);
      if( duration >= resttime && (unit != "snob" || dist <= serverInfo.config.snob_max_dist) ) {
        var name = renametemplate;
        name = name.replace("{UNIT}",unitnames[unit]);
        name = name.replace("{SRCX}",attacker.village.coords.x);
        name = name.replace("{SRCY}",attacker.village.coords.y);
        name = name.replace("{SRCK}",attacker.village.coords.k);
        name = name.replace("{SRCNAME}", attacker.village.name);
        name = name.replace("{DSTX}",curCoords.x);
        name = name.replace("{DSTY}",curCoords.y);
        name = name.replace("{DSTK}",curCoords.k);
        name = name.replace("{DSTNAME}", lib.game_data.village.name);
        name = name.replace("{ATTACKER}", attacker.name);
        name = name.replace("{DURATION}", formatDuration(duration));
        name = name.replace("{START}", formatTime(startTime));
        name = name.replace("{ARRIVAL}", formatTime(arrTime));
        name = name.replace("{RETURN}", formatTime(retTime));
        name = name.replace("{ID}", lib.params.id );
        name = name.replace("{DIST}", dist );
        name = name.replace("{DATE}", $("serverTime").textContent + " " + $("serverDate").textContent.substr(0,5));
        $("label"+unit).style.display = "none";
        $("edit"+unit).style.display = "";
        $("editInput"+unit).value = name;
      }
      else
        rttab.rows[i].style.display = "none";
    }
  }
  $("running_times").style.display = "";
}
else if( lib.params.screen == "overview_villages" ) {
  var mode = $("overview").value;
  if( mode == "incomings" ) {
    var tab = $("incomings_table");
  //  tab.rows[0].insertBefore(document.createElement("th"),tab.rows[0].cells[2]).textContent = "Herkunft";
    tab.rows[0].cells[2].colSpan = 2;
    for( var i = 1; i < tab.rows.length - 1; i++ ) {
      var id = tab.rows[i].cells[0].innerHTML.match(/command_ids\[(\d+)\]/)[1];
      var data = lib.storage.getValue(id);
      var cell = tab.rows[i].insertCell(2);
      if( data ) {
        var a = cell.appendChild(document.createElement("a"));
        a.href = lib.createLink("info_village","id",data[5],false);
        a.textContent = data[6] + " ("+data[7]+"|"+data[8]+") K"+data[9];
        var str = tab.rows[i].cells[4].textContent;
        var str = str.substr(0,str.length - 4) + ':' + lib.padLeft(Math.floor(data[10]/1000)%60,"0",2);
        if( serverInfo.config.misc_millis_arrival )
          str += ':<span class="small">'+lib.padLeft(data[10]%1000,"0",3)+"</span>";
        tab.rows[i].cells[4].innerHTML = str + " Uhr";
      }
      else {
        cell.className = "grey";
        cell.textContent = "???";
      }
    }
  }
  else if( mode == "buildings" && serverInfo.config.game_farm_limit > 0) {
    var tab = $("buildings_table");
    var bhlvls = lib.storage.getValue("bhlvls",";");
    for( var col = 2; col < tab.rows[0].cells.length; col++ )
      if( tab.rows[0].cells[col].innerHTML.indexOf("buildings/farm.png") > -1 )
        break;
    for( var i = 1; i < tab.rows.length; i++ ) {
      var coords = tab.rows[i].cells[0].innerHTML.match(/\((\d{1,3})\|(\d{1,3})\) K(\d+)</);
      if( coords ) {
        var bhlvl = tab.rows[i].cells[col].textContent;
        coords = coords[1]+"_"+coords[2];
        bhlvls = bhlvls.replace(new RegExp(";"+coords+",\\d+,\\d+;","g"), ";");
        bhlvls += coords + "," + bhlvl + "," + now + ";";
      }
    }
    lib.storage.setValue("bhlvls",bhlvls);
  }
}
function parseTime(str) {
  var res = str.match(/(\d+)\.(\d+)\.(\d+)\s+(\d+):(\d+):(\d+):?(\d+)?/);
  var year = parseInt(res[3],10);
  if( year < 2000 )
    year += 2000;
  ms = parseInt(res[7],10);
  if( isNaN(ms) )
    ms = 0;
  var ms = new Date( year, parseInt(res[2],10)-1, parseInt(res[1],10), parseInt(res[4],10), parseInt(res[5],10), parseInt(res[6],10) ).getTime()+ms;
  return ms;
  
}
function formatTime(ms) {
  var dt = new Date(ms);
  return lib.padLeft(dt.getDate(),"0",2) + "." + lib.padLeft(dt.getMonth()+1,"0",2) + ". " + lib.padLeft(dt.getHours(),"0",2) + ":" + lib.padLeft(dt.getMinutes(),"0",2) + ":" + lib.padLeft(dt.getSeconds(),"0",2) + ":" + lib.padLeft(dt.getMilliseconds(),"0",3);
}
function parseDuration(val) {
  var parts = val.split(":");
  var secs = parseInt(parts[0],10)*3600;
  secs += parseInt(parts[1],10)*60;
  secs += parseInt(parts[2],10);
  return secs;
}
function formatDuration(secs) {
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor(secs/60) - (hours * 60);
  var seconds = Math.round(secs % 60,0);
  var ret = "---";
  if( hours || minutes || seconds )
    ret = hours + ':' + lib.padLeft(minutes,"0",2) + ':' + lib.padLeft(seconds,"0",2);
  return ret;
}
function parseParams(url) {
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
function $(id) {
  return document.getElementById(id);
}
function ce(name) {
  return document.createElement(name);
}
function formatMessage() {
  var tab = getByTagName(form,"table","firstChild");
  var newText = "";
  var lines = msg.textContent.split("\n");
  var block = "none";
  var newblock = "none";
  var defplayer = { name: "", ally: "", points: "" };
  var defvillage = { coords: "", wall: 0, points: "", farm: { used: 0, level: 0 } };
  var defunits = {};
  var atts = [];
  var first = true;
  for( var key in serverInfo.unitInfo )
    defunits[key] = 0;
  for( var i = 0; i <= lines.length; i++ ) {
    if( i == lines.length )
      newblock = "end";
    else {
      var line = lines[i].replace("\r","");
      if( /^\[b\]Verteidiger\[\/b\]/.test(line) )
        newblock = "defplayer";
      else if( /^\[b\]Angegriffenes Dorf\[\/b\]/.test(line) )
        newblock = "defvillage";
      else if( /^\[b\]Anwesende Truppen\[\/b\]/.test(line) )
        newblock = "units";
      else if( /^\[b\]\d+\. Angriff\[\/b\]/.test(line) ) {
        atts.push( {} );
        newblock = "att";
        block = "none";
      }
    }
    if( newblock != block ) {
      if( newblock == "end" || newblock == "defvillage" ) {
        if( !first ) {
          var text = template;
          text = text.replace( "{DEFVILLAGE}", defvillage.coords );
          text = text.replace( "{DEFVILLAGEPOINTS}", defvillage.points );
          text = text.replace( "{WALL}", defvillage.wall );
          text = text.replace( "{ATTCOUNT}", atts.length );
          text = text.replace( "{DEFENDERNAME}", defplayer.name );
          text = text.replace( "{DEFENDERALLY}", defplayer.ally );
          text = text.replace( "{DEFENDERPOINTS}", defplayer.points );
          defvillage.farm.used = 0;
          for( var unit in defunits ) {
            var UNIT = unit.toUpperCase();
            text = text.replace("{"+UNIT+"}", "[unit]"+unit+"[/unit] "+defunits[unit]+ " ");
            defvillage.farm.used += serverInfo.unitInfo[unit].pop * defunits[unit];
            if( defunits[unit] > 0 ) 
              text = text.replace("{"+UNIT+"?}", "[unit]"+unit+"[/unit] "+defunits[unit]+ " ");
            else
              text = text.replace("{"+UNIT+"?}", "");
            defunits[unit] = 0;
          }
          for( var key in unitnames ) {
            if( !serverInfo.unitInfo[key] ) {
              text = text.replace("{"+key+"}", "");
              text = text.replace("{"+key+"?}", "");
            }
          }
          var farminfos = "";
          if( serverInfo.config.game_farm_limit > 0 ) {
            farminfos = farminfotemplate;
            var coords = defvillage.coords.match(/\[coord\](\d+)\|(\d+)\[/);
            var res = lib.storage.getValue("bhlvls",";").match(new RegExp(";"+coords[1]+"_"+coords[2]+",(\\d+),\\d+;"));
            if( res )
              defvillage.farm.level = res[1];
            farminfos = farminfos.replace( "{FARMLEVEL}", defvillage.farm.level );
            farminfos = farminfos.replace( "{FARMUSED}", defvillage.farm.used );
            farminfos = farminfos.replace( "{FARMMAX}", defvillage.farm.level * serverInfo.config.game_farm_limit );
            farminfos = farminfos.replace( "{FARMFREE}", Math.max(0,defvillage.farm.level * serverInfo.config.game_farm_limit - defvillage.farm.used) );
          }
          text = text.replace( "{FARMINFOS}", farminfos );
          var atttexts = "";
          for( var a = 0; a < atts.length; a++ ) {
            var img = "???";
            var name = "Angriff";
            for( var r = 1; r < tab.rows.length-1; r++ ) {
              if( tab.rows[r].cells[0].getElementsByTagName("input")[1].checked ) {
                var id = tab.rows[r].cells[0].innerHTML.match(/command_ids\[(\d+)\]/)[1];
                var data = lib.storage.getValue(id);
                if( data ) {
                  var attTime = parseTime(atts[a].time);
                  if( attTime == data[10] && atts[a].village == "[coord]"+data[7]+"|"+data[8]+"[/coord]" ) {
                    name = $("labelText["+id+"]").textContent;
                    for( var key in unitnames ) {
                      if( name.indexOf(unitnames[key]) > -1 ) {
                        img = "[unit]"+key+"[/unit]";
                        break;
                      }
                    }
                  }
                }
              }
            }
            var atttext = atttemplate;
            atttext = atttext.replace( "{NR}", a+1);
            atttext = atttext.replace( "{TIME}", atts[a].time );
            atttext = atttext.replace( "{VILLAGE}", atts[a].village );
            atttext = atttext.replace( "{ATTACKERNAME}", atts[a].player );
            atttext = atttext.replace( "{ATTACKERALLY}", atts[a].ally );
            atttext = atttext.replace( "{ATTACKERPOINTS}", atts[a].points);
            atttext = atttext.replace( "{NAME}", name );
            atttext = atttext.replace( "{IMG}", img );
            atttexts += atttext;
          }
          text = text.replace("{ATTS}", atttexts);
          atts = [];
          defvillage.coords = "";
          defvillage.wall = 0;
          defvillage.points = "";
          defvillage.farm.used = 0;
          defvillage.level = 0;
          newText += text;
        }
        first = false;
      }
      block = newblock;
    }
    else {
      switch( block ) {
        case "defplayer":
          var res = line.match(/(Name|Stamm|Punkte): (.+)/);
          if( res ) {
            switch( res[1] ) {
              case "Name":
                defplayer.name = res[2];
                break;
              case "Stamm":
                defplayer.ally = res[2];
                break;
              case "Punkte":
                defplayer.points = res[2];
                break;
            }
          }
          break;
        case "defvillage":
          var res = line.match(/(\[coord\][^\[]+\[\/coord\]|Punkte|Stufe des Walls)[: ]?(.*)/);
          if( res ) {
            switch( res[1] ) {
              case "Punkte":
                defvillage.points = res[2];
                break;
              case "Stufe des Walls":
                defvillage.wall = res[2];
                break;
              default:
                defvillage.coords = res[1];
                break;
            }
          }
          break;
        case "units":
          var res = line.match(/\[unit\]([^\[]+)\[\/unit\] (\d+)/);
          if( res )
            defunits[res[1]] = res[2];
          break;
        case "att":
          var res = line.match(/(Angreifer|Stamm|Punkte|Herkunft|Ankunftszeit): (.+)/);
          if( res ) {
            var att = atts[atts.length-1];
            switch( res[1] ) {
              case "Angreifer":
                att.player = res[2];
                break;
              case "Stamm":
                att.ally = res[2];
                break;
              case "Punkte":
                att.points = res[2];
                break;
              case "Herkunft":
                att.village = res[2];
                break;
              case "Ankunftszeit":
                att.time = res[2];
                break;
            }
          }
          break;
      }
    }
  }
  msg.value = newText;
}
function getByTagName(node,nodeName,what) {
  nodeName = nodeName.toUpperCase();
  node = node[what];
  if( what == "firstChild" )
    what = "nextSibling";
  else if( what == "lastChild" )
    what = "previousSibling";
  while( node && node.nodeName.toUpperCase() != nodeName )
    node = node[what];
  return node;
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
              if( unitnode.nodeType != 3 ) {
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
              if( buildingnode.nodeType != 3 ) {
                cfg.buildingInfo[buildingnode.nodeName] = {};
                for( var c = 0; c < buildingnode.childNodes.length; c++ ) {
                  var node = buildingnode.childNodes[c];
                  if( node.nodeType != 3 )
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
    var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
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
            try {
              return JSON.parse(str.substring(1));
            }
            catch(e) {
              alert( key + ": " + texts[lib.lang].gui.valueError );
              return defaultValue;
            }
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
    if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1) {
      game_data = unsafeWindow.game_data;
    }
    if(!game_data) {
      var script = ce("script");
      script.type = "application/javascript";
      script.textContent = 	"var input=document.createElement('input');" +
                  "input.type='hidden';" +
                  "input.value=JSON.stringify(game_data);"  +
                  "input.id='game_data';" +
                  "document.body.appendChild(input);";
      document.body.appendChild(script);
      var input = $("game_data");
      if( input )
        eval("game_data=" + input.value + ";");
      document.body.removeChild(script);
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
    if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
      node.checked = !node.checked;
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