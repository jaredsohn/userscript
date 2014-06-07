// ==UserScript==
// @name DS Laufzeiten und Transportmenge
// @description Version 1.6.3 FÃ¼gt in DS an etlichen Stellen Laufzeiten (teileweise als Tooltip) ein 
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*
// @include http://de*.die-staemme.de/forum.php*
// @include http://ch*.staemme.ch/game.php*
// @include http://ch*.staemme.ch/forum.php*
// ==/UserScript==

(function(){
// Einstellungen: ja/an = true, nein/aus = false;
var showArrivalTime = true;   // Ankunftszeit anzeigen true/false;
var arrivalTimeOffset = 120;  // Anzahl der Sekunden, die auf die LOKALE Rechnerzeit addiert werden soll um die Startzeit zu ermitteln fÃ¼r die die Ankunftszeiten ermittelt werden

var version = "1.6.3";
var texts = {
  de: 
  {
    gui:
    {
      title: "DS-Laufzeiten",
      loadServerCfg: "Serverkonfiguration wird ermittelt...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadUnitInfo: "Einheiten werden ermittelt...",
      unitInfoKnown: "Einheiten wurden ermittelt",
      error: "Fehler",
      ok: "Ok",
      close: "Schliessen",
      runtimes: "Laufzeiten",
      startTime: "Startzeit",
      arrivalTime: "Ankunftszeit",
      capture: "Beute",
      runtime: "Laufzeit",
      arrival: "Ankunft",
      returnTime: "RÃ¼ckkehr",
      cancelReturnTime: "RÃ¼ckkehr bei Abbruch",
      dist: "Entf.",
      destVillage: "Zieldorf:",
      unit: "Einheit",
      nightbonus: "Nachtbonus aktiv",
    },
    regexp:
    {
      duration: /Dauer/,
      arrival: /Ankunft/,
      attack: /Angriff/,
    },
  },
  ch:
  {
    regexp:
    {
      duration: /Dur/,
      arrival: /Akunft/,
      attack: /An?griff/,
    },
  },
};
texts.ch.gui = texts.de.gui;

var colBgColor = ['rgb(248, 244, 232)', 'rgb(222, 211, 185)' ];
var lib = new HypixDSLib("hpxdsrt",true);
var serverInfo = new lib.ServerInfo("speed,unit_speed,night/start_hour,night/end_hour,snob/max_dist",true,false);
var unitCols = { spear: 0, sword: 0, axe: 0, archer: 0, spy: 1, light: 1, marcher: 1, heavy: 1, ram: 2, catapult: 2, knight: 3, snob: 3, trader: 2 };
serverInfo.unitInfo["trader"] = { speed: 6 * serverInfo.config.speed, carry: 1000 };

var RunTimes = {
  curVillage : { id: 0, x: 0, y: 0 },
  unitCols : { spear: 0, sword: 0, axe: 0, archer: 0, spy: 1, light: 1, marcher: 1, heavy: 1, ram: 2, catapult: 2, knight: 3, snob: 3, trader: 2 },
  bbvillage : false,
  duration : 0,
  ToolTip : function(target) {
    var THIS = this;
    this.show = function(e) {
      var dist;
      if( !isNaN(THIS.dist) )
        dist = THIS.dist;
      else {
        dist = parseFloat(target.getAttribute("dist"));
        if( isNaN(dist) ) {
          var coords = target.getAttribute("coords");
          if( coords ) {
            coords = coords.split("_");
            dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[0], 2) + Math.pow(RunTimes.curVillage.y - coords[1], 2));
          }
        }
      }
      if( !isNaN(dist) ) {
        THIS.div.style.display='block';
        THIS.move(e);
        var startTime=new Date(lib.getTime() * 1000);
        var key;
        var idx = 0;
        for(key in serverInfo.unitInfo) {
          idx++;
          var cell = THIS.div.firstChild.rows[1].cells[idx];
          var time = serverInfo.unitInfo[key].speed*dist*serverInfo.config.speed*serverInfo.config.unit_speed;
          cell.innerHTML = RunTimes.formatTime(time);
          cell.style.color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
          if( THIS.div.firstChild.rows.length > 2 ) {
            cell=THIS.div.firstChild.rows[2].cells[idx];
            var arrivalTime = new Date(startTime.getTime() + time*60000);
            cell.innerHTML=RunTimes.formatDate(arrivalTime,true);
            var h=arrivalTime.getHours();
            cell.style.color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';
          }
        }
        if( THIS.div.firstChild.rows.length > 3 )
          THIS.div.firstChild.rows[3].cells[1].innerHTML=RunTimes.formatDate(startTime,false);
      }
    }
    this.hide = function(e) {
      THIS.div.style.display = "none";
    }
    this.move = function(event) {
      var size= { x: THIS.div.offsetWidth, y: THIS.div.offsetHeight };
      if(window.pageYOffset)
        scrollY = window.pageYOffset;
      else 
        scrollY = document.body.scrollTop;
      var x = event.clientX+10;
      if(x+size.x>document.body.clientWidth) 
        x = document.body.clientWidth-size.x;
      THIS.div.style.left=x+'px';
      THIS.div.style.top=scrollY+event.clientY-size.y-10+'px';
    }
    this.getTTDiv = function() {
      var div = $("dsfm_runtimes");
      if( !div )
        div = THIS.create();
      return div;
    }
    this.create = function() {
      var showArrivalTime = true;
      var i;
      var div = document.body.appendChild( ce('div'));
      div.id = 'dsfm_runtimes';
      div.style.position = "absolute";
      div.style.top = "0px";
      div.style.left = "0px";
      div.zIndex = 1000;
      div.style.display = 'none';
      div.style.border='1px solid #804000';
      div.style.backgroundColor = '#F6EAC4';
      div.style.padding = "5px";
      var tab = div.appendChild(ce('table'));
      tab.style.border='1px solid rgb(222, 211, 185)';
      tab.cellSpacing=0;
      tab.cellPadding=0;
      tab.insertRow(0);
      tab.insertRow(1);
      i = 0;
      var col = 0;
      if( showArrivalTime ) {
        i=1;
        var cell = tab.rows[0].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.unit;
        cell = tab.rows[1].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.runtime;
        tab.insertRow(2);
        cell = tab.rows[2].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.arrival;
        tab.insertRow(3);
        cell = tab.rows[3].insertCell(0);
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.startTime;
        cell = tab.rows[3].insertCell(1);
        cell.style.padding = '2px';
        cell.style.fontSize = '9px';
        cell.colSpan=3;
        cell.id = "dsrt_start";
      }
      for( var key in serverInfo.unitInfo ) {
        cell = tab.rows[0].insertCell(i);
        var img = cell.appendChild(ce('img'));
        cell.style.backgroundColor = colBgColor[col];
        cell.style.padding = '2px';
        cell.style.textAlign = 'center';
        if( key == "trader" )
          img.src = 'graphic/buildings/market.png';
        else
          img.src = 'graphic/unit/unit_'+key+'.png';
        img.alt = '';
        cell = tab.rows[1].insertCell(i);
        cell.style.backgroundColor = colBgColor[col];
        cell.style.padding = '2px';
        cell.style.textAlign = 'center';
        cell.style.fontSize = '9px';
        if( showArrivalTime ) {
          cell = tab.rows[2].insertCell(i);
          cell.style.backgroundColor = colBgColor[col];
          cell.style.padding = '2px';
          cell.style.textAlign = 'center';
          cell.style.fontSize = '9px';
        }
        i++;
        col ^= 1;
      }
      return div;
    }
    this.div = this.getTTDiv();
    if( arguments.length == 2 )
      this.dist = arguments[1];
    else  
      this.dist = Number.NaN;
    target.addEventListener("mouseover", THIS.show, false );
    target.addEventListener("mouseout", THIS.hide, false );
    target.addEventListener("mousemove", THIS.move, false );
  },
  
  doIt : function() {
    if( lib.game_data ) {
      RunTimes.curVillage.id = parseInt(lib.game_data.player.id,10);
      var coords = lib.game_data.village.coord.split("|");
      RunTimes.curVillage.x = parseInt(coords[0]);
      RunTimes.curVillage.y = parseInt(coords[1]);
      lib.storage.setValue("curvil",RunTimes.curVillage);
    }
    else
      RunTimes.curVillage = lib.storage.getValue("curvil",RunTimes.curVillage);
    if( lib.params.screen=="market" )
      RunTimes.modMarket();
    else if( /forum\.php/.test(location.href) || (lib.params.screen == "mail" && lib.params.get("mode") == "view"))
      RunTimes.modForumMail();
    else if( /screen=memo/.test(location.href) )
      RunTimes.addMouseEvents($("show_row"));
    else if( lib.params.screen == "info_command" && lib.params.type == "own" )
      RunTimes.modCommand();
    else if( lib.params.screen == "place" )
      RunTimes.modPlace();
    else if( lib.params.screen == "info_village" )
      RunTimes.modInfoVillage();
    else if( lib.params.screen == "info_player" )
      RunTimes.modInfoPlayer();
    else if( lib.params.screen == "overview_villages" )
      RunTimes.modOverview();
  },
  addMouseEvents : function(node) {
    if(node.parentNode.nodeName != "A" ) {
      if( node.parentNode.nodeName != "TEXTAREA" ) {
        if( node.nodeValue ) {
          var res = node.nodeValue.match(/(\d+)\|(\d+)/);
          var pos = 0;
          if( res ) {
            var cp = node.nodeValue.indexOf(res[0]);
            var oldValue = node.nodeValue;
            node.nodeValue = node.nodeValue.substr(pos, cp);
            var lnk = ce('a');
            var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
            lnk.tooltip = new RunTimes.ToolTip(lnk,dist);
            lnk.innerHTML = res[0];
            lnk.href = 'game.php?' +(isUV?'t='+lib.params.t+'&':'') + 'village='+RunTimes.curVillage.id+'&screen=map&x='+res[1]+'&y='+res[2];
            if( node.nextSibling )
              node.parentNode.insertBefore( lnk, node.nextSibling );
            else
              node.parentNode.appendChild( lnk );
            var rest = ce('span');
            rest.innerHTML = oldValue.substr(cp+res[0].length);
            if( lnk.nextSibling )
              node.parentNode.insertBefore( rest, lnk.nextSibling );
            else
              node.parentNode.appendChild(rest);
          }
        }
      }
    }
    else {
      if( node.nodeValue ) {
        var res = node.nodeValue.match(/(\d+)\|(\d+)/);
        if( res ) {
          var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
          node.tooltip = new RunTimes.ToolTip(node.parentNode,dist);
        }
      }
    }
    var child = node.firstChild;
    while (child != null) {
        RunTimes.addMouseEvents(child);
        child = child.nextSibling;
    }
  },
  formatTime : function(time) {
    if( isNaN(time)) time=0;
      time=Math.round(time*60);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time/60) - (hours * 60);
    var seconds = Math.round(time % 60,0);
    var ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
    return ret;
  },
  formatDate : function(date,br) {
    var v=date.getDate();
    var ret = (v < 10 ? '0'+v : v)+'.';
    v = date.getMonth()+1;
    ret += (v < 10 ? '0'+v : v)+'.';
    ret+=br?'\n<br/>':' ';
    v = date.getHours();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getMinutes();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getSeconds();
    ret += (v < 10 ? '0'+v : v);
    return ret;
  },
  formatDuration : function(time) {
    if( isNaN(time)) 
      time = 0;
    time = Math.round(time*60);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time/60) - (hours * 60);
    var seconds = Math.round(time  % 60,0); 
    var ret = "---";
    if( hours || minutes || seconds )
      ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds); 
    return ret;
  },
  formatArrivalTime : function(showTime, serverTime) {
    var serverTimems = serverTime.getTime();
    var tomorrow = new Date(serverTimems + 86400000);
    var v;
    var date;
    if( showTime.getDate() == serverTime.getDate() && showTime.getMonth() == serverTime.getMonth() )
      date = "heute";
    else if( showTime.getDate() == tomorrow.getDate() && showTime.getMonth() == tomorrow.getMonth() )
      date = "morgen";
    else
    {
      v = showTime.getDate();
      date = "am " + (v < 10 ? "0"+v : v);
      v = showTime.getMonth();
      date += "." + (v < 10 ? "0"+v : v);
      date += "."; // + showTime.getFullYear();
    }
    v = showTime.getHours();
    var time = " um " + (v < 10 ? "0"+v : v);
    v = showTime.getMinutes();
    time += ":" + (v < 10 ? "0"+v : v);
    v = showTime.getSeconds();
    time += ":" + (v < 10 ? "0"+v : v);
    return date + time + " Uhr";
  },
  convertCoordCol : function(tab,col) {
    var rows = tab.tBodies[0].rows;
    for( var i = 0; i < rows.length; i++ ) {
      var cell = rows[i].cells[col];
      var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
      if( dstCoords ) {
        var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - dstCoords[1], 2) + Math.pow(RunTimes.curVillage.y - dstCoords[2], 2));
        cell.innerHTML = '<a href="'+lib.createLink("map","x",dstCoords[1],"y",dstCoords[2],false)+'">'+cell.innerHTML+'</a>';
        cell.setAttribute("dist",dist);
        var tt = new RunTimes.ToolTip(cell,dist);
      }
    }
  },
  compareDistCell : function(a,b) {
    return parseFloat(a.getAttribute("dist"))-parseFloat(b.getAttribute("dist"));
  },
  insertTable : function(parent,dist) {
    var showArrivalTime = true;
    var col = [];
    var row = 0;
    // Anzahl der Zeilen ermitteln
    for( var key in serverInfo.unitInfo ) {
      if( isNaN(col[RunTimes.unitCols[key]]) )
        col[RunTimes.unitCols[key]] = 1;
      else
        col[RunTimes.unitCols[key]]++;
      if( col[RunTimes.unitCols[key]] > row )
        row = col[RunTimes.unitCols[key]];
    }
    var tab = parent.appendChild(ce('table'));
    tab.cellSpacing=0;
    tab.cellPadding=0;
    var bgcolidx = 0;
    for( i = 0; i < row; i++ )
      tab.insertRow(i);
    var cell = tab.insertRow(0).appendChild(ce('th'));
    cell.colSpan=col.length*2;
    cell.innerHTML = texts[lib.lang].gui.runtimes;
    
    // Laufzeiten einfÃ¼gen
    var startTime=new Date(lib.getTime()*1000 + 120000);
    for( i = 0; i < col.length; i++ ) {
      var bgcolidx=0;
      row = 1;
      for( key in serverInfo.unitInfo ) {
        if( RunTimes.unitCols[key] == i ) {
          cell = tab.rows[row].insertCell(i*2);
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var img = cell.appendChild(ce('img'));
          if( key == "trader" )
            img.src = 'graphic/buildings/market.png';
          else
            img.src = 'graphic/unit/unit_'+key+'.png';
          img.border = "0";
          img.alt = "";
          cell = tab.rows[row].insertCell(i*2+1);
          var time = serverInfo.unitInfo[key].speed*dist*serverInfo.config.speed*serverInfo.config.unit_speed;
          cell.style.fontSize = "9px";
          cell.style.padding="2px";
          cell.style.textAlign="center";
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
          var html = '<span style="color:'+color+';">' + RunTimes.formatDuration(time) + '</span>';
          if( showArrivalTime ) {
            var arrivalTime = new Date(startTime.getTime() + time*60000);
            var h=arrivalTime.getHours();
            color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=serverInfo.config.night_start_hour&&h<serverInfo.config.night_end_hour)?'#FF0000':'#000000';        
            html += '<br/><span style="color:'+color+'">'+RunTimes.formatDate(arrivalTime,true)+'</span>';
          }
          cell.innerHTML=html;
          row++;
          bgcolidx ^= 1;
        }
      }
    }
    if( showArrivalTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.colSpan=8;
      cell.style.fontSize="9px";
      cell.innerHTML = "<b>"+texts[lib.lang].gui.startTime+":</b> "+RunTimes.formatDate(startTime,false);
    }
  },
  modMarket : function() {
    var select = $("inputx");
    if( select )  {
      var select = select.parentNode.getElementsByTagName("select")[0];
      var html = "<option>"+select.options[0].innerHTML+"</option>";
      for( var i = 1; i < select.options.length; i++ ) {
        var coords = select.options[i].value.split("|");
        var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - parseInt(coords[0],10), 2) + Math.pow(RunTimes.curVillage.y - parseInt(coords[1],10), 2));
        var duration = dist * 6 * serverInfo.config.speed;
        html += '<option value="'+select.options[i].value+'">'+select.options[i].innerHTML + " => " + RunTimes.formatDuration(duration)+"</option>";
      }
      select.innerHTML = html;
    }
  },
  modForumMail : function() {
    var tab = document.getElementsByTagName('table');
    for( var i = 0; i < tab.length; i++ ) {
      if( tab[i].className=="main" )
        break;
    }
    tab = tab[i];
    RunTimes.addMouseEvents(tab);
  },
  modCommand : function() {
    if( texts[lib.lang].regexp.attack.test(document.getElementsByTagName("h2")[0].innerHTML) ) {
      var tab = $("content_value").getElementsByTagName('table')[0];
      for( var i = 0; i < tab.rows.length; i++ ) {
        if( texts[lib.lang].regexp.duration.test(tab.rows[i].cells[0].innerHTML) ) {
          var duration = tab.rows[i].cells[1];
          var duration = duration.innerHTML.split(':');
          RunTimes.duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
        }
        else if( texts[lib.lang].regexp.arrival.test(tab.rows[i].cells[0].innerHTML) ) {
          var cell = tab.rows[i].cells[1];
          var time = cell.innerHTML.split(" ");
          var date = time[0].split(".");
          time = time[1].split(":");
          time = new Date(parseInt(date[2]+2000,10), parseInt(date[1],10)-1, parseInt(date[0],10), parseInt(time[0],10), parseInt(time[1],10), parseInt(time[2],10));
          var row = tab.insertRow(i+1);
          var cell = row.insertCell(0);
          cell.colSpan=2;
          cell.innerHTML = texts[lib.lang].gui.returnTime+":";
          tab.rows[i+1].insertCell(1).innerHTML = RunTimes.formatArrivalTime(new Date(time.getTime()+RunTimes.duration),time);
          if( /action=cancel/.test(tab.innerHTML) ) {
            row = tab.insertRow(i+2);
            cell = row.insertCell(0);
            cell.colSpan=2;
            cell.innerHTML = texts[lib.lang].gui.cancelReturnTime+ ":";
            cell = tab.rows[i+2].insertCell(1);
            cell.innerHTML = RunTimes.formatArrivalTime(new Date(time.getTime()+RunTimes.duration),time);
            cell.id = "dsfm_cancelreturn";
            window.setInterval(function() { var parts = document.getElementsByClassName("timer")[0].innerHTML.split(":"); var ms = RunTimes.duration - (parseInt(parts[0],10)*3600+parseInt(parts[1],10)*60+parseInt(parts[2],10))*1000; $("dsfm_cancelreturn").innerHTML = RunTimes.formatArrivalTime(new Date(time.getTime()-RunTimes.duration+ms*2),time); }, 250 );
          }
          i = tab.rows.length;
        }
      }
    }
  },
  insertDist : function(row, colCoords, colDist) {
    var coords = row.cells[colCoords].innerHTML.match(/ \((\d+)\|(\d+)\) K\d+</);
    var cell = row.cells[colDist];
    cell.style.textAlign = "right";
    if( coords ) {
      var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[1], 2) + Math.pow(RunTimes.curVillage.y - coords[2], 2));
      cell.dsfmtt = new RunTimes.ToolTip(cell,dist);
      cell.innerHTML = Math.round(dist*100)/100;
    }
    else
      cell.innerHTML = "---";
  },
  modPlace : function() {
    var mode = lib.params.get("mode","command");
    if( mode == "command")
    {
      if( $("inputx" ) )
      {
        // Max. Beute + Laufzeit in die Seite einfÃ¼gen
        var tab = document.forms[0].childNodes[1];
        var row = tab.insertRow(tab.rows.length);
        var cell = row.insertCell(0);
        cell.innerHTML = "Beute:";
        cell = row.insertCell(1);
        cell.innerHTML = "0";
        cell.id="dsrt_unitinfo_max";
        
        row = tab.insertRow(tab.rows.length);
        cell = row.insertCell(0);
        cell.innerHTML = "Laufzeit:";
        cell = row.insertCell(1);
        cell.innerHTML = "---";
        cell.id="dsrt_duration";

        row = tab.insertRow(tab.rows.length);
        cell = row.insertCell(0);
        cell.innerHTML = "Ankunft:";
        cell = row.insertCell(1);
        cell.innerHTML = "---";
        cell.id="dsrt_eta";
        cell.colSpan=3;

        RunTimes.updateVP();
        window.setInterval( RunTimes.updateVP, 1000 );
      }
      else
      {
      //  if( document.getElementsByTagName("h2")[0].innerHTML == "Angriff" )
        {
          var tab = document.getElementsByTagName('table');
          for( var i = 0; i < tab.length; i++ )
          {
            if( tab[i].className=="vis" )
              break;
          }
          tab = tab[i];
          var duration = 0;
          for( i = 0; i < tab.rows.length; i++ )
          {
            if( tab.rows[i].cells.length > 1 && /info_player/.test(tab.rows[i].cells[1].innerHTML) )
              RunTimes.bbvillage = lib.parseParams(tab.rows[i].cells[1].getElementsByTagName("a")[0].href).get("id","") == "";
            else if( texts[lib.lang].regexp.duration.test(tab.rows[i].cells[0].innerHTML) )
              duration = tab.rows[i].cells[1];
            else if( texts[lib.lang].regexp.arrival.test(tab.rows[i].cells[0].innerHTML) ) {
              arrivalTimeCell = tab.rows[i].cells[1];
              var row = tab.insertRow(i+1);
              row.insertCell(0).innerHTML = texts[lib.lang].gui.returnTime+":";
              returnTimeCell = tab.rows[i+1].insertCell(1);
              i = tab.rows.length;
            }
          }
          duration = duration.innerHTML.split(':');
          RunTimes.duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
          window.setInterval(RunTimes.updateTimes, 250);
        }
      }
    }
    else if( mode == "units" )
    {
      var tabs = $("content_value").getElementsByTagName("table");
      var tab = tabs[3];
      var idxExternal = 4;
      if( tab.rows.length > 3 )
      {
        idxExternal++;
        var footLines = tab.rows.length == 4 ? 1 : 2;
        var cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
        input = cell.appendChild(ce("a"));
        input.href = "javascript:;";
        input.innerHTML = texts[lib.lang].gui.dist;
        input.addEventListener("click", function(evt) {sortVillages(evt,1,2,footLines);}, false);
        cell = tab.rows[1].insertCell(1);
        cell.innerHTML = '<span class="grey">---</span>';
        cell.setAttribute("dist",0);
        cell.style.textAlign = "right";
        for( var i = 2; i < tab.rows.length - footLines; i++ )
        {
          cell = tab.rows[i].insertCell(1);
          RunTimes.insertDist(tab.rows[i],0,1);
        }
        if( footLines == 2 )
          tab.rows[tab.rows.length-2].cells[0].colSpan=2;
        tab.rows[tab.rows.length-1].cells[0].colSpan=2;
      }
      if( tabs.length > idxExternal )
      {
        tab = tabs[idxExternal];
        cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
        input = cell.appendChild(ce("a"));
        input.href = "javascript:;";
        input.innerHTML = texts[lib.lang].gui.dist;
        input.addEventListener("click", function(evt) {sortVillages(evt,1,1,0);}, false);
        for( var i = 1; i < tab.rows.length; i++ )
        {
          var cell = tab.rows[i].insertCell(1);
          RunTimes.insertDist(tab.rows[i],0,1);
        }
      }
    }
    else if( mode == "neighbor" )
    {
      var tab = $("content_value").getElementsByTagName("table")[3];
      for( var i = 1; i < tab.rows.length; i++ )
        RunTimes.insertDist(tab.rows[i],0,1);
    }
  },
  modInfoVillage : function() {
    var tab = $("content_value").getElementsByTagName("table")[0];
    var coords = tab.rows[1].cells[1].innerHTML.split("|");
    var key = coords[0]+"_"+coords[1];
    row = tab.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    var dist = Math.sqrt(Math.pow(parseInt(coords[0],10) - RunTimes.curVillage.x, 2) + Math.pow(parseInt(coords[1],10) - RunTimes.curVillage.y, 2));
    if( dist > 0 )
      RunTimes.insertTable(cell,dist);
  },
  modInfoPlayer : function() {
    var tab = document.getElementsByClassName('vis')[1];
    for( i = 1; i < tab.rows.length; i++ )
    {
      var cell = tab.rows[i].cells[1];
      var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
      var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - dstCoords[1], 2) + Math.pow(RunTimes.curVillage.y - dstCoords[2], 2));
      var a = ce('a');
      a.innerHTML = cell.innerHTML;
      a.href = lib.createLink("map","x",dstCoords[1],"y",dstCoords[2],false);
      a.tt = new RunTimes.ToolTip(a,dist);
      cell.innerHTML = "";
      cell.appendChild(a);
    }
  },
  modOverview : function() {
    var tab = document.getElementsByClassName("vis");
    if( tab[tab.length-1].rows.length == 1 )
      tab = tab[tab.length-2];
    else
      tab = tab[tab.length-1];

    var dst = lib.storage.getValue("dst", "_").split("_");
    
    var frm = tab.parentNode.insertBefore(ce("form"),tab);
    var frmTab = frm.appendChild(ce("table"));
    var row = frmTab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.destVillage;
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode("x:"));
    var input = cell.appendChild(ce("input"));
    input.size = 4;
    input.id = "dsrt_dst_x";
    input.value = dst[0];
    input.addEventListener("keyup", RunTimes.updateDest, false );
    
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode("y:"));
    input = cell.appendChild(ce("input"));
    input.size = 4;
    input.id = "dsrt_dst_y";
    input.value = dst[1];
    input.addEventListener("keyup", RunTimes.updateDest, false );
    
    cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
    input = cell.appendChild(ce("a"));
    input.href = "javascript:;";
    input.innerHTML = texts[lib.lang].gui.dist;
    input.addEventListener("click", function(evt) {sortVillages(evt,1,1,0);}, false);
    
    var rowspan = tab.rows[1].cells[0].rowSpan;
    var unitsAway = lib.params.units_type == "away_detail";  
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
          if( coords ) {
            tab.rows[i].cells[0].setAttribute("coords", coords[1] + "_" + coords[2]);
            cell.tt = new RunTimes.ToolTip(cell);
          }
        }
        else if( unitsAway )
          tab.rows[i].cells[0].colSpan = 3;
      }
    }
    RunTimes.updateDest();
  },
  updateDest : function() {
    var xInput = $("dsrt_dst_x");
    var yInput = $("dsrt_dst_y");
    
    if( xInput.value.indexOf("|") != -1 )
    {
      var coords = xInput.value.split("|");
      xInput.value = coords[0];
      yInput.value = coords[1];
    }
    
    var x = parseInt(xInput.value);
    var y = parseInt(yInput.value);
    
    var valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;

    lib.storage.setValue("dst", valid ? (x + "_" + y) : "_" );
    
    var tab = document.getElementsByClassName("vis");
    if( tab[tab.length-1].rows.length == 1 )
      tab = tab[tab.length-2];
    else
      tab = tab[tab.length-1];
    
    var rowspan = tab.rows[1].cells[0].rowSpan;
    var unitsAway = lib.params.units_type == "away_detail";  
    for( var i = 1; i < tab.rows.length; i+=rowspan )
    {
      if( !unitsAway || tab.rows[i].className == "units_away" )
      {
        var coords = tab.rows[i].cells[0].getAttribute("coords");
        if( coords )
        {
          coords = coords.split("_");
          cell = tab.rows[i].cells[1];
          var dist = Math.sqrt(Math.pow(coords[0] - x, 2) + Math.pow(coords[1] - y, 2));
          if( valid )
          {
            cell.innerHTML = Math.round(dist*100)/100;
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
    if( this.id == "dsrt_dst_x" && xInput.value.length == 3 )
    {
      yInput.focus();
      yInput.select();
    }
  },
  updateVP : function() {
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
          if(serverInfo.unitInfo[inputs[i].name].speed > slowestUnit )
            slowestUnit=serverInfo.unitInfo[inputs[i].name].speed;
          sum += val * serverInfo.unitInfo[inputs[i].name].carry;      
        }
        sumall += parseInt(inputs[i].getAttribute("maxunits"), 10) * serverInfo.unitInfo[inputs[i].name].carry;
      }
    }
    $("dsrt_unitinfo_max").innerHTML = lib.formatNumber(sum,true,true) + " / " + lib.formatNumber(sumall,true,true);
    var xdst = parseInt($('inputx').value, 10);
    var ydst = parseInt($('inputy').value, 10);
    var dist = 0;
    if(!isNaN(xdst) && !isNaN(ydst))
      dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - xdst, 2) + Math.pow(RunTimes.curVillage.y - ydst, 2)); 
    var duration = slowestUnit * dist * serverInfo.config.unit_speed*serverInfo.config.speed;
    $('dsrt_duration').innerHTML = RunTimes.formatDuration(duration);
    var time = new Date(lib.getTime()*1000);
    if( slowestUnit > 0 && dist > 0 )
    {
      var arrivalTime = new Date(time.getTime() + duration*60000);
      var html = RunTimes.formatArrivalTime(arrivalTime,time);
      var h = arrivalTime.getHours();
      if( h >= serverInfo.config.night_start_hour && h < serverInfo.config.night_end_hour )
        html += ' <span class="warn">('+texts[lib.lang].gui.nightbonus+')</span>';
      $("dsrt_eta").innerHTML = html;
    }
    else
      $("dsrt_eta").innerHTML = "---";
    var tab=$('inline_popup_content').getElementsByTagName('table'); 
    if( tab.length ) 
    {
      tab=tab[tab.length-1]; 
      for( var i = 0; i < tab.rows.length; i++ )
      {
        var coords = tab.rows[i].cells[1].childNodes[1];
        if( coords && coords.innerHTML )
        {
          coords = coords.innerHTML.split('|'); 
          dist = Math.sqrt(Math.pow(RunTime.curVillage.x - coords[0], 2) + Math.pow(RunTime.curVillage.y - coords[1], 2)); 
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
  },
  updateTimes : function() {
    var serverTime = new Date(lib.getTime()*1000);
    var serverTimems = serverTime.getTime();
    var arrivalTime = new Date(serverTimems + RunTimes.duration);
    var returnTime = new Date(arrivalTime.getTime() + RunTimes.duration);
    arrivalTimeCell.innerHTML=RunTimes.formatArrivalTime(arrivalTime,serverTime);
    v = arrivalTime.getHours();
    if( v >= serverInfo.config.night_start_hour && v < serverInfo.config.night_end_hour && !RunTimes.bbvillage )
      arrivalTimeCell.innerHTML += '<br/><span class="warn">'+texts[lib.lang].gui.nightbonus+'</span>';
    returnTimeCell.innerHTML=RunTimes.formatArrivalTime(returnTime,serverTime);
  },
}

RunTimes.doIt();

function sortVillages(evt,distCol,headLines,footLines) {
  var tab = evt.target.parentNode.parentNode.parentNode;
  var rows = [ { row: null, dist: 9999 } ];
  var i = headLines;
  while( i < tab.rows.length - footLines)
  {
    var dist = parseFloat(tab.rows[i].cells[distCol].getAttribute("dist"));
    if( !isNaN(dist) )
    {
      for( var j = 0; j < rows.length; j++ )
      {
        if( dist < rows[j].dist )
        {
          rows.splice(j, 0, { row: tab.rows[i], dist: dist } );
          i++;
          while( i < tab.rows.length - footLines && tab.rows[i].cells[distCol].getAttribute("dist") === null )
            rows.splice(++j, 0, { row: tab.rows[i++], dist: dist } );
          break;
        }
      }
    }
    else
      i++;
  }
  
  for( i = headLines; i < tab.rows.length - footLines; i++ )
  {
    tab.appendChild(rows[i-headLines].row);
//    tab.rows[i].innerHTML = rows[i-headLines].html;
  }
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
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.debug.log(e.message);}
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
        alert( "Keine geeignete SpeichermÃ¶glichkeit gefunden!");
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
      alert( "Keine geeignete SpeichermÃ¶glichkeit gefunden!");
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