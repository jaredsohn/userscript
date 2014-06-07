// ==UserScript==
// @name Czas podróży jednostek
// @description Version 1.4.2 Fügt in DS an etlichen Stellen Laufzeiten (teileweise als Tooltip) ein 
// @author Hypix
// @namespace http://hypix.de/
// @include http://pl*.plemiona.pl/game.php*
// @include http://pl*.plemiona.pl/forum.php*
// ==/UserScript==

// Versionhistory:
// 1.4.2 Rundungsfehler bei Laufzeiten gefixt
// 1.4.1 Opera-Bugfix
// 1.4.0 Einstellungen aus XMLs, Laufzeiten für Händler zu eigenen Dörfern im VP, Abbruch-Rückkehrzeit bei Angriffen
// 1.3.1 Anpassung an DS 6.1. Laufzeitentabelle wird in Dorfinfos wieder angezeigt
// 1.3.0 Entfernungberechnung auf den Übersichtsseitens
// 1.2.2 Kann jetzt auch die ch-Server
// 1.2.1 Bugfixes -.-
// 1.2.0 Anpassung auf DS Version 6.0
//          Serverconfig wird ausgelesen
// 1.1.0 Ankunftszeit im VP, Rückkehr in Angriffsdetails
// 1.0.9 Umwandlung von xxx|yyy Angaben im Notizblock in Link mit MouseOver
// 1.0.8 Monatsanzeige der Ankunftszeit korrigiert
// 1.0.7 Welten mit unterschiedlicher Geschwindigkeit und AG-Reichweite unterstützt
// 1.0.6 "Alle Truppen"-Bug gefixt, Nachtbonus wird nur noch bei nicht verlassenen Dörfer angezeigt
// 1.0.5 "Nachtbonus aktiv!" auf Bestätigungsseite wird nicht mehr verschluckt
// 1.0.4 Händlerzeiten hinzugefügt, Rückkehrzeit auf Bestätigungsseite eingefügt
// 1.0.3 Hinzufügen von ToolTip und ersetzen von "einfachen Koords" auch in IGMs
// 1.0.2 Ankunftszeiten eingebaut, Funktioniert jetzt auch im UV-Acc
// 1.0.1 Aktuelles Dorf beim Klick auf "Zentrieren"-Link bleibt erhalten
// 1.0.0 Veröffentlichung 

(function(){
// Einstellungen: ja/an = true, nein/aus = false;
var showArrivalTime = true;   // Ankunftszeit anzeigen true/false;
var arrivalTimeOffset = 120;  // Anzahl der Sekunden, die auf die LOKALE Rechnerzeit addiert werden soll um die Startzeit zuermitteln für die die Ankunftszeiten ermittelt werden

var server = document.location.host.split('.')[0];
var res = server.match(/^([a-z]+)(\d+)/);
var params = parseParams(location.search);
var uv = !isNaN(parseInt(params.t,10));
var debug = new Debug();
var storage = new StorageHandler("hpxdsrt",true);
var curVillage;
var gamedata = getGameData();
var curVillageStr;
if( gamedata )
{
  var coords = gamedata.village.coord.split("|");
  curVillageStr = "["+ gamedata.village.id+","+parseInt(coords[0],10)+","+parseInt(coords[1],10)+"];";
  storage.setValue("curvil", curVillageStr );
}
else
{
  curVillageStr = storage.getValue("curvil", "[ 0,0,0 ]");
}
eval( "curVillage = "+curVillageStr );

var serverCfg;
var unitinfo;
var ajaxloaded = 0;
eval( "serverCfg = " + storage.getValue("svrcfg") + ";" );
var unitinfoStr = storage.getValue("unitinfo");
eval( "unitinfo = " + unitinfoStr + ";" );

if( typeof(unitinfo) != "object" || typeof(serverCfg) != "object" )
{
  var div = createShadowDiv("block");
  div = div.appendChild(document.createElement("div"));
  div.style.position="absolute";
  div.style.width = "300px";
  div.style.height = "50px";
  div.style.top = ((window.innerHeight - 50) / 2) + "px";
  div.style.left = ((window.innerWidth - 300) / 2) + "px";
  div.style.zIndex = 1000;
  html = '<table class="main" style="border:2px solid #804000; width:300px; height:50px;">';
  html += '<tr><th><table cellpadding="0" cellspacing="0" width="100%"><tr><td>DS-Laufzeiten und Transportmenge</td><td style="text-align:right;"><a href="javascript:;" onclick="javascript:document.location.reload();">Schliessen</a></td></tr></table></th></tr>';
  html += '<tr><td>';
  if( serverCfg )
  {
    html += '<span style="font-weight:bold; color:green;">Serverkonfiguration wurde ermittelt</span>';
    ajaxloaded++;
  }
  else
  {
    html += 'Serverkonfiguration wird ermittelt... <span id="dsfm_svrcfg" style="font-weight:bold;"/>';
    loadConfig();
  }
  html += '</td></tr><tr><td>';
  if( unitinfo )
  {
    html += '<span style="font-weight:bold; color:green;">Einheiten wurden ermittelt</span>';
    ajaxloaded++;
  }
  else
  {
    html += 'Einheiten wurden ermittelt... <span id="dsfm_units"  style="font-weight:bold;"/>';
    loadUnits();
  }
  html += "</td></tr>";
  html += '</td></tr></table>';
  div.innerHTML = html;
  if( ajaxloaded != 2  )
    return;
}

var speed = serverCfg.speed * serverCfg.unit_speed;
unitinfo["trader"].speed /= serverCfg.speed

// Den ganzen Schmodder in die Seite setzen
var bgCol = Array( 'rgb(248, 244, 232)', 'rgb(222, 211, 185)' );
var script = "var dspi_unitinfo = " + unitinfoStr;
script += "var arrivalTimeOffset"+arrivalTimeOffset+";";
script += "function dspi_format_time(time){if( isNaN(time)) time=0; time=Math.round(time); var hours = Math.floor((time * 60) / 3600);var minutes = Math.floor(time) - (hours * 60);var seconds = Math.round((time * 60) % 60,0); var ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds); return ret;}";
script += "var dspi_speed = "+speed+";";
script += "var dspi_snobrange = "+serverCfg.snob_max_dist+";";
var arrivalTimeCell;
var returnTimeCell;
var duration;
var bbvillage = false;

// Versammlungsplatz
if( params.screen == "place" )
{
  if( params.get("try", "") != "" )
  {
  //  if( document.getElementsByTagName("h2")[0].innerHTML == "Atak" )
    {
      var tab = document.getElementsByTagName('table');
      for( var i = 0; i < tab.length; i++ )
      {
        if( tab[i].className=="vis" )
          break;
      }
      tab = tab[i];
      for( i = 0; i < tab.rows.length; i++ )
      {
        switch( tab.rows[i].cells[0].innerHTML.replace(/\s*/g,"" ) )
        {
          case "Cel:":
            bbvillage = parseParams(tab.rows[i].cells[1].getElementsByTagName("a")[0].href).get("id","") == "";
            break;
          case "Trwanie:":
            duration = tab.rows[i].cells[1];
            break;
          case "Przybycie:":
            arrivalTimeCell = tab.rows[i].cells[1];
            var row = tab.insertRow(i+1);
            row.insertCell(0).innerHTML = "Powrót:";
            returnTimeCell = tab.rows[i+1].insertCell(1);
            i = tab.rows.length;
            break;
        }
      }
      duration = duration.innerHTML.split(':');
      duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
      window.setInterval(updateTimes, 250);
    }
  }
  else
  {
    // Max. Beute + Laufzeit in die Seite einfügen
    var tab = document.forms[0].childNodes[1];
    var row = tab.insertRow(tab.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = "Łup:";
    cell = row.insertCell(1);
    cell.innerHTML = "0";
    cell.id="dspi_unitinfo_max";
    
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = "Czas podróży:";
    cell = row.insertCell(1);
    cell.innerHTML = "---";
    cell.id="dspi_duration";

    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = "Przybycie:";
    cell = row.insertCell(1);
    cell.innerHTML = "---";
    cell.id="dspi_eta";
    cell.colSpan=3;

    updateVP();
    window.setInterval( updateVP, 1000 );
  }
  return;
}

// Dorfinfos
if( params.screen == "info_village" )
{
  // Tabelle suchen, in der die Infos stehen
  var tab = document.getElementById("content_value").getElementsByTagName('table')[0];
  // Koordinaten des angezeigten Dorfs holen
  var dstCoords = tab.rows[1].cells[1].innerHTML.match(/(\d+)\|(\d+)/);
  // Entfernung errechnen
  var dist = Math.sqrt(Math.pow(curVillage[1] - dstCoords[1], 2) + Math.pow(curVillage[2] - dstCoords[2], 2));
  // Inhalte einfügen
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.colSpan = 2;
  var col = new Array();
  row = 0;
  // Anzahl der Zeilen ermitteln
  for( var key in unitinfo )
  {
    if( isNaN(col[unitinfo[key].col]) )
      col[unitinfo[key].col] = 1;
    else
      col[unitinfo[key].col]++;
    if( col[unitinfo[key].col] > row )
      row = col[unitinfo[key].col];
  }
  // Schauen ob DS History-Chart da ist, und ggf rowSpan erweitern
  var cellHC = document.getElementById('dshc_graph');
  if( cellHC )
    cellHC.rowSpan = tab.rows.length+row;
  
  tab = cell.appendChild(document.createElement('table'));
  tab.cellSpacing=0;
  tab.cellPadding=0;
  var bgcolidx = 0;
  for( i = 0; i < row; i++ )
    tab.insertRow(i);
  cell = tab.insertRow(0).appendChild(document.createElement('th'));
  cell.colSpan=col.length*2;
  cell.innerHTML = "Czas podróży";
  
  // Laufzeiten einfügen
  var startTime=new Date(new Date().getTime() + arrivalTimeOffset*1000);
  for( i = 0; i < col.length; i++ )
  {
    var bgcolidx=0;
    row = 1;
    for( key in unitinfo )
    {
      if( unitinfo[key].col == i )
      {
        cell = tab.rows[row].insertCell(i*2);
        cell.style.backgroundColor=bgCol[bgcolidx];
        var img = cell.appendChild(document.createElement('img'));
        if( key == "trader" )
          img.src = 'graphic/buildings/market.png';
        else
          img.src = 'graphic/unit/unit_'+key+'.png';
        img.border = "0";
        img.alt = "";
        cell = tab.rows[row].insertCell(i*2+1);
        var time = Math.round(unitinfo[key].speed*dist*speed);
        cell.style.fontSize = "9px";
        cell.style.padding="2px";
        cell.style.textAlign="center";
        cell.style.backgroundColor=bgCol[bgcolidx];
        var color = (key=='snob'&&dist>serverCfg.snob_max_dist)?'#999999':'#000000';
        var html = '<span style="color:'+color+';">' + formatDuration(time) + '</span>';
        if( showArrivalTime )
        {
          var arrivalTime = new Date(startTime.getTime() + time*60000);
          var h=arrivalTime.getHours();
          color=(key=='snob'&&dist>serverCfg.snob_max_dist)?'#999999':(h>=serverCfg.night_start_hour&&h<serverCfg.night_end_hour)?'#FF0000':'#000000';        
          html += '<br/><span style="color:'+color+'">'+formatDate(arrivalTime,true)+'</span>';
        }
        cell.innerHTML=html;
        row++;
        bgcolidx ^= 1;
      }
    }
  }
  if( showArrivalTime )
  {
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.colSpan=8;
    cell.style.fontSize="9px";
    cell.innerHTML = "<b>Start:</b> "+formatDate(startTime,false);
  }
}

if( params.screen == "info_command" && params.type == "own" )
{
  if( /Atak/.test(document.getElementsByTagName("h2")[0].innerHTML) )
  {
    var tab = document.getElementById("content_value").getElementsByTagName('table')[0];
    for( var i = 0; i < tab.rows.length; i++ )
    {
      switch( tab.rows[i].cells[0].innerHTML.replace(/\s*/g,"" ) )
      {
        case "Trwanie:":
          duration = tab.rows[i].cells[1];
          duration = duration.innerHTML.split(':');
          duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
          break;
        case "Przybycie:":
          var cell = tab.rows[i].cells[1];
          var time = cell.innerHTML.split(" ");
          var date = time[0].split(".");
          time = time[1].split(":");
          time = new Date(parseInt(date[2]+2000,10), parseInt(date[1],10)-1, parseInt(date[0],10), parseInt(time[0],10), parseInt(time[1],10), parseInt(time[2],10));
          //cell.innerHTML = formatArrivalTime(time,new Date(time.getTime()-duration));
          var row = tab.insertRow(i+1);
          var cell = row.insertCell(0);
          cell.colSpan=2;
          cell.innerHTML = "Powrót:";
          tab.rows[i+1].insertCell(1).innerHTML = formatArrivalTime(new Date(time.getTime()+duration),time);

          if( /action=cancel/.test(tab.innerHTML) )
          {
            row = tab.insertRow(i+2);
            cell = row.insertCell(0);
            cell.colSpan=2;
            cell.innerHTML = "Przerwanie-Powrót:";
            cell = tab.rows[i+2].insertCell(1);
            cell.innerHTML = formatArrivalTime(new Date(time.getTime()+duration),time);
            cell.id = "dsrt_cancelreturn";
            window.setInterval(function() { var parts = document.getElementsByClassName("timer")[0].innerHTML.split(":"); var ms = duration - (parseInt(parts[0],10)*3600+parseInt(parts[1],10)*60+parseInt(parts[2],10))*1000; document.getElementById("dsrt_cancelreturn").innerHTML = formatArrivalTime(new Date(time.getTime()-duration+ms*2),time); }, 250 );
          }
          i = tab.rows.length;
          break;
      }
    }
  }
}

if( params.screen == "market" )
{
  var select = document.getElementById("inputx").parentNode.getElementsByTagName("select")[0];
  for( var i = 1; i < select.options.length; i++ )
  {
    var coords = select.options[i].value.split("|");
    var dist = Math.sqrt(Math.pow(curVillage[1] - parseInt(coords[0],10), 2) + Math.pow(curVillage[2] - parseInt(coords[1],10), 2));
    var duration = dist * unitinfo.trader.speed;
    select.options[i].innerHTML = select.options[i].innerHTML + " => " + formatDuration(duration);
  }
}

// Spielerinfos
if( params.screen == "info_player" )
{
  document.body.appendChild(document.createElement('script')).innerHTML=script;
  addRuntimeDiv();
  
  // Tabelle suchen, in der die Dörfer stehen
  var tab = document.getElementsByClassName('vis')[1];
  
  // Alle Zeilen der Döferliste durchlaufen
  for( i = 1; i < tab.rows.length; i++ )
  {
    var cell = tab.rows[i].cells[1];
    // Koordinaten des Dorfes ermitteln
    var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
    // Entfernung errechnen
    var dist = Math.sqrt(Math.pow(curVillage[1] - dstCoords[1], 2) + Math.pow(curVillage[2] - dstCoords[2], 2));
    // Koordinaten in Link umbauen
    var a = document.createElement('a');
    a.innerHTML = cell.innerHTML;
    a.href = 'game.php?' +(uv?'t='+params.t+'&':'') + 'village='+params.village+'&screen=map&x='+dstCoords[1]+'&y='+dstCoords[2];

    // Mouse-Events hinzufügen um Laufzeiten-ToolTip einzublenden, auszublenden und zu bewegen
    a.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
    a.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
    a.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
    cell.innerHTML = "";
    cell.appendChild(a);
  }
}

if( params.screen == "overview_villages" )
{
  document.body.appendChild(document.createElement('script')).innerHTML=script;
  addRuntimeDiv();

  var tab = document.getElementsByClassName("vis");
  if( tab[tab.length-1].rows.length == 1 )
    tab = tab[tab.length-2];
  else
    tab = tab[tab.length-1];

  var dst = storage.getValue(server+"_dst", "_").split("_");
  
  var frm = tab.parentNode.insertBefore(document.createElement("form"),tab);
  var frmTab = frm.appendChild(document.createElement("table"));
  var row = frmTab.insertRow(0);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "Kordynaty:";
  cell = row.insertCell(-1);
  cell.appendChild(document.createTextNode("x:"));
  var input = cell.appendChild(document.createElement("input"));
  input.size = 4;
  input.id = "dspi_dst_x";
  input.value = dst[0];
  input.addEventListener("keyup", updateDest, false );
  
  cell = row.insertCell(-1);
  cell.appendChild(document.createTextNode("y:"));
  input = cell.appendChild(document.createElement("input"));
  input.size = 4;
  input.id = "dspi_dst_y";
  input.value = dst[1];
  input.addEventListener("keyup", updateDest, false );
  
  cell = tab.rows[0].insertBefore(document.createElement("th"),tab.rows[0].cells[1]);
  input = cell.appendChild(document.createElement("a"));
  input.href = "javascript:;";
  input.innerHTML = "Czas";
  input.addEventListener("click", sortVillages, false);
  
  var rowspan = tab.rows[1].cells[0].rowSpan;
  var unitsAway = params.units_type == "away_detail";  
  for( var i = 1; i < tab.rows.length; i+=rowspan )
  {
    if( /village=\d+/.test(tab.rows[i].cells[0].innerHTML) ) 
    {
      if( !unitsAway || tab.rows[i].className == "units_away" )
      {
        cell = tab.rows[i].insertCell(1);
        cell.rowSpan = rowspan;
        if( rowspan > 1 )
          cell.style.verticalAlign = "top";
        cell.style.textAlign = "right";
        var coords = tab.rows[i].cells[0].innerHTML.match( / \((\d+)\|(\d+)\) K\d+</ );
        if( coords )
          cell.setAttribute("coords", coords[1] + "_" + coords[2]);
      }
    }
  }
  if( tab.rows[tab.rows.length-1].cells[0].colSpan > 1 )
    tab.rows[tab.rows.length-1].cells[0].colSpan++;
  updateDest();
}

function sortVillages()
{
  var tab = this.parentNode.parentNode.parentNode;
  var rows = [ { html: "", dist: 9999 } ];
  var i = 1;
  while( i < tab.rows.length )
  {
    var dist = parseFloat(tab.rows[i].cells[1].getAttribute("dist"),10);
    if( !isNaN(dist) )
    {
      for( var j = 0; j < rows.length; j++ )
      {
        if( dist < rows[j].dist )
        {
          rows.splice(j, 0, { html: tab.rows[i].innerHTML, dist: dist } );
          i++;
          while( i < tab.rows.length && tab.rows[i].cells[1].getAttribute("dist") == null )
            rows.splice(++j, 0, { html: tab.rows[i++].innerHTML, dist: dist } );
          break;
        }
      }
    }
    else
      i++;
  }
  
  for( i = 1; i < tab.rows.length; i++ )
  {
    tab.rows[i].innerHTML = rows[i-1].html;
  }
}

function updateDest()
{
  var xInput = document.getElementById("dspi_dst_x");
  var yInput = document.getElementById("dspi_dst_y");
  
  if( xInput.value.indexOf("|") != -1 )
  {
    var coords = xInput.value.split("|");
    xInput.value = coords[0];
    yInput.value = coords[1];
  }
  
  var x = parseInt(xInput.value);
  var y = parseInt(yInput.value);
  
  var valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;

  storage.setValue(server + "_dst", valid ? (x + "_" + y) : "_" );
  
  var tab = document.getElementsByClassName("vis");
  if( tab[tab.length-1].rows.length == 1 )
    tab = tab[tab.length-2];
  else
    tab = tab[tab.length-1];
  
  var rowspan = tab.rows[1].cells[0].rowSpan;
  var unitsAway = params.units_type == "away_detail";  
  for( var i = 1; i < tab.rows.length; i+=rowspan )
  {
    if( !unitsAway || tab.rows[i].className == "units_away" )
    {
      var coords = tab.rows[i].cells[1].getAttribute("coords");
      if( coords )
      {
        coords = coords.split("_");
        cell = tab.rows[i].cells[1];
        var dist = Math.sqrt(Math.pow(coords[0] - x, 2) + Math.pow(coords[1] - y, 2));
        if( valid )
        {
          cell.innerHTML = Math.round(dist*100)/100;
          cell.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
          cell.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
          cell.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
          cell.setAttribute('dist', dist);
          cell.style.cursor = "default";
        }
        else
        {
          cell.innerHTML = '<span class="grey">---</span>';
          cell.setAttribute('onmouseover', '' );
          cell.setAttribute('onmouseout', '' );
          cell.setAttribute('onmousemove', '' );
          cell.setAttribute('dist', '');
          cell.style.cursor = "";
        }
      }
    }
  }
  if( this.id == "dspi_dst_x" && xInput.value.length == 3 )
  {
    yInput.focus();
    yInput.select();
  }
}

function updateVP()
{
  var slowestUnit = 0;
  var sum = 0;
  var sumall = 0;
  var inputs = document.getElementsByTagName("input");
  for( var i = 0; i < inputs.length; i++ )
  {
    if( inputs[i].className=="unitsInput" )
    {
      var val = parseInt(inputs[i].value, 10); 
      if(val>0)
      {
        if(unitinfo[inputs[i].name].speed > slowestUnit )
          slowestUnit=unitinfo[inputs[i].name].speed;
        sum += val * unitinfo[inputs[i].name].carry;      
      }
      sumall += parseInt(inputs[i].getAttribute("maxunits"), 10) * unitinfo[inputs[i].name].carry;
    }
  }
  document.getElementById("dspi_unitinfo_max").innerHTML = formatNumber(sum) + " / " + formatNumber(sumall);
  var xdst = parseInt(document.getElementById('inputx').value, 10);
  var ydst = parseInt(document.getElementById('inputy').value, 10);
  var dist = 0;
  if(!isNaN(xdst) && !isNaN(ydst))
    dist = Math.sqrt(Math.pow(curVillage[1] - xdst, 2) + Math.pow(curVillage[2] - ydst, 2)); 
  var duration = slowestUnit * dist * speed;
  document.getElementById('dspi_duration').innerHTML = formatDuration(duration);
  var time = getTime();
  if( slowestUnit > 0 && dist > 0 )
  {
    var arrivalTime = new Date(time.getTime() + duration*60000);
    var html = formatArrivalTime(arrivalTime,time);
    var h = arrivalTime.getHours();
    if( h >= serverCfg.night_start_hour && h < serverCfg.night_end_hour )
      html += ' <span class="warn">(Bonus nocny AKTYWNY!)</span>';
    document.getElementById("dspi_eta").innerHTML = html;
  }
  else
    document.getElementById("dspi_eta").innerHTML = "---";
  var tab=document.getElementById('inline_popup_content').getElementsByTagName('table'); 
  if( tab.length ) 
  {
    tab=tab[tab.length-1]; 
    for( var i = 0; i < tab.rows.length; i++ )
    {
      var coords = tab.rows[i].cells[1].childNodes[1];
      if( coords )
      {
        coords = coords.innerHTML.split('|'); 
        dist = Math.sqrt(Math.pow(curVillage[1] - coords[0], 2) + Math.pow(curVillage[2] - coords[1], 2)); 
        var cell; 
        if(tab.rows[i].cells.length < 3)
        { 
          cell = tab.rows[i].insertCell(2);
          cell.style.textAlign='right';
        }
        else 
          cell = tab.rows[i].cells[2]; 
        cell.innerHTML=formatDuration(dist*slowestUnit*speed);
      }
    }
  }
}

function formatDuration(time)
{
  if( isNaN(time)) 
    time = 0;
  time = Math.round(time);
  var hours = Math.floor((time * 60) / 3600);
  var minutes = Math.floor(time) - (hours * 60);
  var seconds = Math.round((time * 60) % 60,0); 
  var ret = "---";
  if( hours || minutes || seconds )
    ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds); 
  return ret;
}

function updateTimes()
{
  var serverTime = getTime();
  var serverTimems = serverTime.getTime();
  var arrivalTime = new Date(serverTimems + duration);
  var returnTime = new Date(arrivalTime.getTime() + duration);
  arrivalTimeCell.innerHTML=formatArrivalTime(arrivalTime,serverTime);
  v = arrivalTime.getHours();
  if( v >= serverCfg.night_start_hour && v < serverCfg.night_end_hour && !bbvillage )
    arrivalTimeCell.innerHTML += '<br/><span class="warn">Nachtbonus aktiv!</span>';
  returnTimeCell.innerHTML=formatArrivalTime(returnTime,serverTime);
  return;
}

function formatNumber(nr)
{
  if( nr == 0 )
    return "0";
  var ret = ""
  do
  {
    var tmp = "00" + nr%1000;
    ret = tmp.substr(tmp.length-3,3) + '<span class="grey">.</span>' + ret;
    nr = Math.floor(nr/1000);
  } while( nr > 0 );
  ret = ret.replace(/^0*/g,"").replace(/\<span class="grey">\.<\/span>$/g,"");
  return ret;
}

function getTime()
{
  var serverTime = document.getElementById('serverTime').innerHTML.split(':');
  var serverDate = document.getElementById('serverDate').innerHTML.split('/');
  if( serverTime && serverDate )
    return  new Date( parseInt(serverDate[2],10), parseInt(serverDate[1],10), parseInt(serverDate[0],10), parseInt(serverTime[0],10), parseInt(serverTime[1],10), parseInt(serverTime[2],10) );
  else
    return new Date();
}

function formatArrivalTime(showTime, serverTime)
{
  var serverTimems = serverTime.getTime();
  var tomorrow = new Date(serverTimems + 86400000);
  var v;
  var date;
  if( showTime.getDate() == serverTime.getDate() && showTime.getMonth() == serverTime.getMonth() )
    date = "dzisiaj";
  else if( showTime.getDate() == tomorrow.getDate() && showTime.getMonth() == tomorrow.getMonth() )
    date = "jutro";
  else
  {
    v = showTime.getDate();
    date = "Dnia " + (v < 10 ? "0"+v : v);
    v = showTime.getMonth();
    date += "." + (v < 10 ? "0"+v : v);
    date += "."; // + showTime.getFullYear();
  }
  v = showTime.getHours();
  var time = " o " + (v < 10 ? "0"+v : v);
  v = showTime.getMinutes();
  time += ":" + (v < 10 ? "0"+v : v);
  v = showTime.getSeconds();
  time += ":" + (v < 10 ? "0"+v : v);
  return date + time + " sek.";
}

// Forum & IGM
if( /forum\.php/.test(location.href) || (params.screen == "mail" && params.get("mode") == "view"))
{
  document.body.appendChild(document.createElement("script")).innerHTML = script;
  addRuntimeDiv();
  var tab = document.getElementsByTagName('table');
  for( var i = 0; i < tab.length; i++ )
  {
    if( tab[i].className=="main" )
      break;
  }
  tab = tab[i];
  addMouseEvents(tab);
}

if( /screen=memo/.test(location.href) )
{
  document.body.appendChild(document.createElement("script")).innerHTML = script;
  addRuntimeDiv();
  addMouseEvents(document.getElementById("show_row"));
}

function addMouseEvents(node)
{
    i++;
    if(node.parentNode.nodeName != "A" )
    {
      if( node.parentNode.nodeName != "TEXTAREA" )
      {
        if( node.nodeValue )
        {
          var res = node.nodeValue.match(/(\d+)\|(\d+)/);
          var pos = 0;
          if( res ) 
          {
            var cp = node.nodeValue.indexOf(res[0]);
            var oldValue = node.nodeValue;
            node.nodeValue = node.nodeValue.substr(pos, cp);
            var lnk = document.createElement('a');
            var dist = Math.sqrt(Math.pow(curVillage[1] - res[1], 2) + Math.pow(curVillage[2] - res[2], 2));
            lnk.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
            lnk.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
            lnk.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
            lnk.innerHTML = res[0];
            lnk.href = 'game.php?' +(uv?'t='+params.t+'&':'') + 'village='+curVillage[0]+'&screen=map&x='+res[1]+'&y='+res[2];
            lnk.target="_blank";
            if( node.nextSibling )
              node.parentNode.insertBefore( lnk, node.nextSibling );
            else
              node.parentNode.appendChild( lnk );
            var rest = document.createElement('span');
            rest.innerHTML = oldValue.substr(cp+res[0].length);
            if( lnk.nextSibling )
              node.parentNode.insertBefore( rest, lnk.nextSibling );
            else
              node.parentNode.appendChild(rest);
          }
        }
      }
    }
    else
    {
      if( node.nodeValue )
      {
        var res = node.nodeValue.match(/(\d+)\|(\d+)/);
        if( res ) 
        {
          var dist = Math.sqrt(Math.pow(curVillage[1] - res[1], 2) + Math.pow(curVillage[2] - res[2], 2));
          node.parentNode.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
          node.parentNode.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
          node.parentNode.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
        }
      }
    }
    var child = node.firstChild;
    while (child != null)
    {
        addMouseEvents(child);
        child = child.nextSibling;
    }
}

function addRuntimeDiv()
{
  // Funktionen für den "ToolTip"
  var script = "function dspi_formatDate(date,br){var v=date.getDate();var ret = (v < 10 ? '0'+v : v)+'.';v = date.getMonth()+1;ret += (v < 10 ? '0'+v : v)+'.';ret+=br?'\\n<br/>':' ';v = date.getHours();ret += (v < 10 ? '0'+v : v)+':';v = date.getMinutes();ret += (v < 10 ? '0'+v : v)+':';v = date.getSeconds();ret += (v < 10 ? '0'+v : v);return ret;}";
  script += "function dspi_showTimes(dist){var div=$('dspi_times'); if(typeof(dist)=='undefined')div.style.display='none'; else {div.style.display='block';var startTime=new Date(new Date().getTime() + arrivalTimeOffset*1000);var key;for(key in dspi_unitinfo){var cell=$('dspi_d_'+key); var time=dspi_unitinfo[key].speed*dist*dspi_speed; cell.innerHTML=dspi_format_time(time); cell.style.color=(key=='snob'&&dist>dspi_snobrange)?'#999999':'#000000';cell=$('dspi_at_'+key);if(cell){var arrivalTime = new Date(startTime.getTime() + time*60000);cell.innerHTML=dspi_formatDate(arrivalTime,true);var h=arrivalTime.getHours();cell.style.color=(key=='snob'&&dist>dspi_snobrange)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';}}cell=$('dspi_start');if(cell)cell.innerHTML=dspi_formatDate(startTime,false);}}";
  script += "function dspi_moveTimes(event){var div=$('dspi_times'); var size=div.getSize(); 	if(window.pageYOffset)scrollY = window.pageYOffset;	else scrollY = document.body.scrollTop; var x=event.clientX+10; if(x+size.x>document.body.clientWidth) x=document.body.clientWidth-size.x; div.style.left=x+'px'; div.style.top=scrollY+event.clientY-size.y-10+'px';}";
  script += "var arrivalTimeOffset="+arrivalTimeOffset+";";
  document.body.appendChild( document.createElement('script')).innerHTML = script;
  // div für den "ToolTip" einfügen
  var i;
  var div = document.body.appendChild( document.createElement('div'));
  div.id = 'dspi_times';
  div.style.position = "absolute";
  div.style.top = "0px";
  div.style.left = "0px";
  div.zIndex = 1000;
  div.style.display = 'none';
  div.style.border='1px solid #804000';
  div.style.backgroundColor = '#F6EAC4';
  div.style.padding = "5px";
  var tab = div.appendChild(document.createElement('table'));
  tab.style.border='1px solid rgb(222, 211, 185)';
  tab.cellSpacing=0;
  tab.cellPadding=0;
  row1 = tab.insertRow(0);
  row2 = tab.insertRow(1);
  i = 0;
  var col = 0;
  if( showArrivalTime )
  {
    i=1;
    var cell = row1.insertCell(0);
    cell.style.backgroundColor = bgCol[1];
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "Jednostka";
    cell = row2.insertCell(0);
    cell.style.backgroundColor = bgCol[1];
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "Czas podróży";
    row3 = tab.insertRow(2);
    cell = row3.insertCell(0);
    cell.style.backgroundColor = bgCol[1];
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "Godzina dotarcia";
    row4 = tab.insertRow(3);
    cell = row4.insertCell(0);
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "Start";
    cell = row4.insertCell(1);
    cell.style.padding = '2px';
    cell.style.fontSize = '9px';
    cell.colSpan=3;
    cell.id = "dspi_start";
  }
  var key;
  for( key in unitinfo )
  {
    cell = row1.insertCell(i);
    var img = cell.appendChild(document.createElement('img'));
    cell.style.backgroundColor = bgCol[col];
    cell.style.padding = '2px';
    cell.style.textAlign = 'center';
    if( key == "trader" )
      img.src = 'graphic/buildings/market.png';
    else
      img.src = 'graphic/unit/unit_'+key+'.png';
    img.alt = '';
    cell = row2.insertCell(i);
    cell.style.backgroundColor = bgCol[col];
    cell.style.padding = '2px';
    cell.style.textAlign = 'center';
    cell.style.fontSize = '9px';
    cell.id='dspi_d_'+key;
    if( showArrivalTime )
    {
      cell = row3.insertCell(i);
      cell.style.backgroundColor = bgCol[col];
      cell.style.padding = '2px';
      cell.style.textAlign = 'center';
      cell.style.fontSize = '9px';
      cell.id='dspi_at_'+key;
    }
    i++;
    col ^= 1;
  }
}

function formatDate(date,br)
{
  var v=date.getDate();
  var ret = (v < 10 ? '0'+v : v)+'.';
  v = date.getMonth()+1;
  ret += (v < 10 ? '0'+v : v)+'.';
  ret+=br?'<br/>':' ';
  v = date.getHours();
  ret += (v < 10 ? '0'+v : v)+':';
  v = date.getMinutes();
  ret += (v < 10 ? '0'+v : v)+':';
  v = date.getSeconds();
  ret += (v < 10 ? '0'+v : v);
  return ret;
}

function parseParams(url)
{
  url = url.substring(url.indexOf("?")+1);
  url = url.replace( /&amp;/g, "&" );
  url = url.split("&");
  var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
  for( var i = 0; i < url.length; i++ )
  {
    var param = url[i].split("=");
    params[param[0]] = param[1];
  }
  return params;
}

function getCurrentVillage()
{
  var container = document.getElementsByTagName("hr")[0];
  if( container )
  {
    var curID;
    var curX;
    var curY;
    container = container.nextSibling.nextSibling;
    var menu = container.getElementsByClassName("menu nowrap")[0];
    var tds = menu.getElementsByTagName("td");
    for( var i = 0; i < tds.length; i++ )
    {
      var res = tds[i].innerHTML.match( /screen=map/ );
      if( res )
      {
        var a = tds[i].getElementsByTagName("a")[0];
        if( !/javascript/.test(a.href) )
        {
          var res = parseParams(a.href);
          res = parseInt(res.village, 10);
          if( !isNaN(res) )
            curID = res;
        }
      }
      else
      {
        res = tds[i].innerHTML.match( /\((\d{1,3})\|(\d{1,3})\)/ );
        if( res )
        {
          curX = parseInt(res[1], 10);
          curY = parseInt(res[2], 10);
        }
      }
    }
    storage.setValue(server + "_curVillage_" + params.get("t",0), curID+"_"+curX+"_"+curY);
    return [ curID, curX, curY  ];
  }
  else
    return storage.getValue( server + "_curVillage_" + params.get("t",0), "0_0_0").split("_");
}

function Debug()
{
  this.log = function(msg)
  {
    if( typeof(GM_log) == "function" )
      GM_log(msg);
    else if( opera )
      opera.postError(msg);
    else if( console )
      console.log(msg);
    else
      alert(msg);
  }  
  
  this.dumpObj = function(obj)
  {
    var str = "\n{";
    for( var key in obj )
    {
      if( typeof( obj[key] ) == "object" )
      {
        str += "\n" + key + ":";
        str += this.dumpObj(obj[key],true)
      }
      else
        str += "\n" + key + ": " + obj[key];
    }
    str += "\n}";
    this.log(str);
    return str;
  }
}

function StorageHandler(prefix,forceGM)
{
  var gm = typeof(unsafeWindow) != "undefined";
  var win = gm ? unsafeWindow : window;
  var ls = false;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {new Debug().log(e.description);}
  if( forceGM && gm || !ls)
  {
    if( gm )
    {
      prefix = prefix + "_" + document.location.host.split('.')[0];
      this.setValue = function(key,value) 
      {
        GM_setValue(prefix+"_"+key,value);
      };
      this.getValue = function(key,defaultValue)
      {
        return GM_getValue(prefix+"_" + key, defaultValue);
      }
      this.deleteValue = function(key)
      {
        GM_deleteValue(prefix+"_"+key);
      }
      this.listValues = function()
      {
        var allkeys = GM_listValues();
        var serverKeys = [];
        var re = new RegExp("^"+prefix+"_(.*)");
        for( var i = 0; i < allkeys.length; i++ )
        {
          var res = allkeys[i].match(re);
          if( res )
            serverKeys.push(res[1]);
        }
        return serverKeys;
      }
    }
    else
    {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
  }
  else if( ls )
  {
    this.setValue = function(key,value) 
    {
      localStorage.setItem(prefix+"_"+key, value );
    };    
    this.getValue = function(key,defaultValue)
    {
      var value = localStorage.getItem(prefix+"_"+key);
      if( value )
        return value;
      else
        return defaultValue;
    };
    this.deleteValue = function(key)
    {
      localStorage.removeItem("hpxdsfm_"+key);
    }
    this.listValues = function()
    {
      var keys = [];
      for( var i = 0; i < win.localStorage.length; i++ )
      {
        var res = localStorage.key(i).match("^hpxdsfm_(.*)");
        if( res )
          keys.push(res[1]);
      }
      return keys;
    }
  }
  else
  {
    alert( "Keine geeignete Speichermöglichkeit gefunden!");
    end;
  }
  this.clear = function()
  {
    var keys = this.listValues();
    for( var i = 0; i < keys.length; i++ )
      this.deleteValue(keys[i]);
  }
}

function loadConfig()
{
  var req = new XMLHttpRequest();

  if (req == null)
    alert("Error creating request object!");
  
  req.open("GET", "/interface.php?func=get_config", true);

  req.onreadystatechange = 
  function()
  {            
    if( req.readyState == 4 )
    {
      var span = document.getElementById("dsfm_svrcfg");
      if(req.status!=200) {
        span.innerHTML = "Fehler: " + req.status;
        span.style.color = "red";
      }
      else
      {    
        var cfgVals = [ "speed", "unit_speed", "night/start_hour", "night/end_hour", "snob/max_dist" ];
        serverCfg = "{";
        var xml = req.responseXML;
        for( var i = 0; i < cfgVals.length; i++ )
        {
          var path = cfgVals[i].split("/");
          var name = "";
          var e = xml;
          for( var j = 0; j < path.length; j++ )
          {
            e = e.getElementsByTagName(path[j]);
            var len = e.length;
            e = e[0];
            if( len > 0 )
            {
              if( j > 0 ) 
                name += "_";
              name += path[j];
            }
            else
              break;
          }
          if( i > 0 )
            serverCfg += ",";
          var val = null;
          if( e )
            serverCfg += name + ":" + e.firstChild.nodeValue;
          else
          {
            serverCfg += cfgVals[i].replace( "/", "_" ) + ":null";
            debug.log( cfgVals[i] + " not found" );
          }
        }
        serverCfg += "};";
        storage.setValue( "svrcfg", serverCfg );
        span.style.color = "green";
        span.innerHTML = "ok";
        ajaxloaded++;
      }
    }
  }
  req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(null);
}
function loadUnits()
{
  var req = new XMLHttpRequest();

  if (req == null)
    alert("Error creating request object!");
  
  req.open("GET", "/interface.php?func=get_unit_info", true);

  req.onreadystatechange = 
  function()
  {            
    if( req.readyState == 4 )
    {
      var span = document.getElementById("dsfm_units");
      if(req.status!=200) {
        span.innerHTML = "Fehler: " + req.status;
        span.style.color = "red";
      }
      else
      {    
        var xml = req.responseXML;
        units = "{";
        var e = xml.firstChild;
        var cols = { spear: 0, sword: 0, axe: 0, archer: 0, spy: 1, light: 1, marcher: 1, heavy: 1, ram: 2, catapult: 2, knight: 3, snob: 3 };
        for( var i = 0; i < e.childNodes.length; i++ )
        {
          var unitnode = e.childNodes[i];
          if( unitnode.nodeName != "#text" )
          {
            units += unitnode.nodeName + ":{speed:" + unitnode.getElementsByTagName("speed")[0].firstChild.nodeValue;
            var carry = parseInt(unitnode.getElementsByTagName("carry")[0].firstChild.nodeValue,10);
            units += ",carry:" + carry,
            units += ",col: " + cols[unitnode.nodeName];
            units += "},";
          }
        }        
        units += "trader:{speed:6,carry:1000,col:2}};"
        storage.setValue( "unitinfo", units );
        span.style.color = "green";
        span.innerHTML = "ok";
        ajaxloaded++;
      }
    }
  }
  req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(null);
}

function createShadowDiv(display)
{
  var div = document.body.appendChild(document.createElement("div"));
  div.style.position = "absolute";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.width =  Math.max(document.body.clientWidth,window.innerWidth)+"px";
  div.style.height =  Math.max(document.body.clientHeight,window.innerHeight)+"px";
  div.style.backgroundColor = "rgba(0,0,0,0.7)";
  div.style.zIndex = 999;
  div.style.display=display;
  div.id = "dsrt_shadow_div";
  return div;
}
function getGameData()
{
  var game_data;
  if(typeof(unsafeWindow) != 'undefined') 
  {
    game_data = unsafeWindow.game_data;
  }
  else 
  {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = 	"var input=document.createElement('input');" + 
                "input.type='hidden';" + 
                "input.value=JSON.encode(game_data);"  + 
                "input.id='game_data';" + 
                "document.body.appendChild(input);";
    document.body.appendChild(script);
    document.body.removeChild(script);
    
    eval("game_data=" + document.getElementById("game_data").value + ";");
  }
  if( game_data )
    game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
  return game_data;
}
})();