// ==UserScript==
// @name سيكربت يقوم بإظهار وقت وصول القوات من تعريب أخوكم محمد احمد 20
// @description Version 1.1.1 tribalwars.ae
// @author Hypix
// @namespace http://hypix.de/
// @include http://*.tribalwars.ae/game.php*
// @include http://*.tribalwars.ae/forum.php*
// ==/UserScript==



(function(){
// Einstellungen: ja/an = true, nein/aus = false;
var showArrivalTime = true;   // Ankunftszeit anzeigen true/false;
var arrivalTimeOffset = 120;  // Anzahl der Sekunden, die auf die LOKALE Rechnerzeit addiert werden soll um die Startzeit zuermitteln f?¼r die die Ankunftszeiten ermittelt werden

var gamespeeds = [0,1,1,2,2]; 
var unitspeeds = [0,1,1,1,.5]; 
var snobranges = [0,100,1000,1000]; 

// Daten der Einheiten (ggf. f?¼r eure Welt anpassen)
// speed: Zeit pro Feld
// carry: Beute tragen
// col: Spalte in der die Laufzeit der Einheit in der Dorfansicht angezeigt wird.  Die Reihe ergibt sich aus der Position im Array
var dspi_unitinfo = { spear:    { speed:18, carry: 25, col:0}, 
                      sword:    { speed:22, carry: 15, col:0},
                      axe:      { speed:18, carry: 10, col:0},
                      archer:   { speed:18, carry: 10, col:0},
                      spy:      { speed: 9, carry:  0, col:1},
                      light:    { speed:10, carry: 80, col:1},
                      marcher:  { speed:10, carry: 50, col:1},
                      heavy:    { speed:11, carry: 50, col:1},
                      ram:      { speed:30, carry:  0, col:2},
                      catapult: { speed:30, carry:  0, col:2},
                      knight:   { speed:10, carry:100, col:3},
                      snob:     { speed:35, carry:  0, col:3},
                      trader:   { speed:6,  carry:1000,col:2}};

// AB HIER FINGER WEG :-)
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var welt = parseInt(location.host.match( /^[a-z]+(\d+)\./ )[1]);
var speed = gamespeeds[welt]*unitspeeds[welt];
dspi_unitinfo["trader"].speed /= gamespeeds[welt];
var snobrange = snobranges[welt];

// Den ganzen Schmodder in die Seite setzen
var bgCol = Array( 'rgb(248, 244, 232)', 'rgb(222, 211, 185)' );
var script = "var dspi_unitinfo = { spear: { speed:"+dspi_unitinfo['spear'].speed+", carry:"+dspi_unitinfo['spear'].carry+"},";
script += "sword: { speed:"+dspi_unitinfo['sword'].speed+", carry:"+dspi_unitinfo['sword'].carry+"},";
script += "axe: { speed:"+dspi_unitinfo['axe'].speed+", carry:"+dspi_unitinfo['axe'].carry+"},";
script += "archer: { speed:"+dspi_unitinfo['archer'].speed+", carry:"+dspi_unitinfo['archer'].carry+"},";
script += "spy: { speed:"+dspi_unitinfo['spy'].speed+", carry:"+dspi_unitinfo['spy'].carry+"},";
script += "light: { speed:"+dspi_unitinfo['light'].speed+", carry:"+dspi_unitinfo['light'].carry+"},";
script += "marcher: { speed:"+dspi_unitinfo['marcher'].speed+", carry:"+dspi_unitinfo['marcher'].carry+"},";
script += "heavy: { speed:"+dspi_unitinfo['heavy'].speed+", carry:"+dspi_unitinfo['heavy'].carry+"},";
script += "ram: { speed:"+dspi_unitinfo['ram'].speed+", carry:"+dspi_unitinfo['ram'].carry+"},";
script += "catapult: { speed:"+dspi_unitinfo['catapult'].speed+", carry:"+dspi_unitinfo['catapult'].carry+"},";
script += "knight: { speed:"+dspi_unitinfo['knight'].speed+", carry:"+dspi_unitinfo['knight'].carry+"},";
script += "snob: { speed:"+dspi_unitinfo['snob'].speed+", carry:"+dspi_unitinfo['snob'].carry+"}";
script += ",trader: { speed:"+dspi_unitinfo['trader'].speed+", carry:"+dspi_unitinfo['trader'].carry+"}";
script += "};";
script += "var arrivalTimeOffset"+arrivalTimeOffset+";";
script += "function dspi_format_time(time){if( isNaN(time)) time=0; var hours = Math.floor((time * 60) / 3600);var minutes = Math.floor(time) - (hours * 60);var seconds = Math.round((time * 60) % 60,0); var ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds); return ret;}";
script += "var dspi_speed = "+speed+";";
script += "var dspi_snobrange = "+snobrange+";";
var arrivalTimeCell;
var returnTimeCell;
var duration;
var bbvillage = false;
var xorg = 0;
var yorg = 0;
var ownCoords = document.getElementById('menu_row2');
if( ownCoords )
{
  var village = ownCoords.innerHTML.match(/(t=(\d+)&amp;)?village=(\d+)&amp;screen=overview">([^<]+)<\/[a|A]>/);
  if( !village )
    village = new Array( "0","0", "0" );
  ownCoords = ownCoords.getElementsByTagName('b')[0].innerHTML.match(/\((\d+)\|(\d+)\)/);
  if( ownCoords )
  {
    var cookieName = "dspi_curvillage";
    if( typeof(village[2]) != "undefined" )
      cookieName += "_t"+village[2];
    document.body.appendChild(document.createElement("script")).innerHTML = "Cookie.write('"+cookieName+"', '"+ownCoords[1]+"_"+ownCoords[2]+"_"+village[3]+"');";
    xorg = parseInt(ownCoords[1]);
    yorg = parseInt(ownCoords[2]);
  }
}

// Versammlungsplatz
if( /screen=place(&mode=command)?(&target=\d+)?(&village=[p|n]\d+)?$/.test(location.href) )
{
  // Max. Beute + Laufzeit in die Seite einf?¼gen
  var tab = document.forms[0].childNodes[1];
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.innerHTML = "حمولة القوات:";
  cell = row.insertCell(1);
  cell.innerHTML = "0";
  cell.id="dspi_unitinfo_max";
  
  row = tab.insertRow(tab.rows.length);
  cell = row.insertCell(0);
  cell.innerHTML = "المده الزمنيه:";
  cell = row.insertCell(1);
  cell.innerHTML = "محمد احمد 20";
  cell.id="dspi_duration";

  row = tab.insertRow(tab.rows.length);
  cell = row.insertCell(0);
  cell.innerHTML = "وقت وصول القوات:";
  cell = row.insertCell(1);
  cell.innerHTML = "محمد احمد 20";
  cell.id="dspi_eta";
  cell.colSpan=3;

  window.setInterval( updateVP, 1000 );
  return;
}

// Dorfinfos
if( /screen=info_village&id=(\d+)/.test(location.href) )
{
  // Tabelle suchen, in der die Infos stehen
  var tab = document.getElementsByTagName('table');
  for( var i = 0; i < tab.length; i++ )
  {
    if( tab[i].className=="vis left" )
    {
      tab = tab[i];
      break;
    }
  }
  // Koordinaten des angezeigten Dorfs holen
  var dstCoords = tab.rows[1].cells[1].innerHTML.match(/(\d+)\|(\d+)/);
  // Entfernung errechnen
  var dist = Math.sqrt(Math.pow(ownCoords[1] - dstCoords[1], 2) + Math.pow(ownCoords[2] - dstCoords[2], 2));
  // Inhalte einf?¼gen
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.colSpan = 2;
  var col = new Array();
  row = 0;
  // Anzahl der Zeilen ermitteln
  for( var key in dspi_unitinfo )
  {
    if( isNaN(col[dspi_unitinfo[key].col]) )
      col[dspi_unitinfo[key].col] = 1;
    else
      col[dspi_unitinfo[key].col]++;
    if( col[dspi_unitinfo[key].col] > row )
      row = col[dspi_unitinfo[key].col];
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
  cell.innerHTML = "معلومات وقت السفر--محمد احمد 20--";
  
  // Laufzeiten einf?¼gen
  var startTime=new Date(new Date().getTime() + arrivalTimeOffset*1000);
  for( i = 0; i < col.length; i++ )
  {
    var bgcolidx=0;
    row = 1;
    for( key in dspi_unitinfo )
    {
      if( dspi_unitinfo[key].col == i )
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
        var time = dspi_unitinfo[key].speed*dist*speed;
        var hours = Math.floor((time * 60) / 3600);
        var minutes = Math.floor(time) - (hours * 60);
        var seconds = Math.round((time * 60) % 60,0); 
        cell.style.fontSize = "9px";
        cell.style.padding="2px";
        cell.style.textAlign="center";
        cell.style.backgroundColor=bgCol[bgcolidx];
        var color = (key=='snob'&&dist>snobrange)?'#999999':'#000000';
        var html = '<span style="color:'+color+';">' + hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds) + '</span>';
        if( showArrivalTime )
        {
          var arrivalTime = new Date(startTime.getTime() + time*60000);
          var h=arrivalTime.getHours();
          color=(key=='snob'&&dist>snobrange)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';        
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
    cell.innerHTML = "<b>الساعة الان :</b> "+formatDate(startTime,false);
  }
}

// Best?¤tigen-Seite f?¼r Truppen schicken
if( /screen=place&try=confirm/.test(location.href) )
{
  if( document.getElementsByTagName("h2")[0].innerHTML == "هجوم" )
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
        case "لاعب:":
          bbvillage = !/screen=info_player&amp;id=(\d+)/.test(tab.rows[i].cells[1].innerHTML);
          break;
        case "وقت:":
          duration = tab.rows[i].cells[1];
          break;
        case "وقت الوصول:":
          arrivalTimeCell = tab.rows[i].cells[1];
          var row = tab.insertRow(i+1);
          row.insertCell(0).innerHTML = "وقت العوده:";
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

if( /village=\d+&screen=info_command&id=\d+&type=own/.test(location.href) )
{
  if( /Angriff/.test(document.getElementsByTagName("h2")[0].innerHTML) )
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
        case "المده:":
          duration = tab.rows[i].cells[1];
          duration = duration.innerHTML.split(':');
          duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
          break;
        case "وقت الوصول:":
          var cell = tab.rows[i].cells[1];
          var time = cell.innerHTML.split(" ");
          var date = time[0].split(".");
          time = time[1].split(":");
          time = new Date(parseInt(date[2]+2000,10), parseInt(date[1],10)-1, parseInt(date[0],10), parseInt(time[0],10), parseInt(time[1],10), parseInt(time[2],10));
          //cell.innerHTML = formatArrivalTime(time,new Date(time.getTime()-duration));
          var row = tab.insertRow(i+1);
          var cell = row.insertCell(0);
          cell.colSpan=2;
          cell.innerHTML = "وقت العوده:";
          tab.rows[i+1].insertCell(1).innerHTML = formatArrivalTime(new Date(time.getTime()+duration),time);
          i = tab.rows.length;
          break;
      }
    }
  }
}

// Spielerinfos
if( /screen=info_player&id=(\d+)/.test(location.href) )
{
  document.body.appendChild(document.createElement('script')).innerHTML=script;
  addRuntimeDiv();
  
  // Tabelle suchen, in der die D?¶rfer stehen
  var tab = document.getElementsByTagName('table');
  var vis = 0;
  for( var i = 0; i < tab.length; i++ )
  {
    if( tab[i].className=='vis' )
    {
      vis++;
      if( vis == 2 )
        break;
    }
  }
  var tab = tab[i];
  // Alle Zeilen der D?¶ferliste durchlaufen
  for( i = 1; i < tab.rows.length; i++ )
  {
    var cell = tab.rows[i].cells[1];
    // Koordinaten des Dorfes ermitteln
    var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
    // Entfernung errechnen
    var dist = Math.sqrt(Math.pow(ownCoords[1] - dstCoords[1], 2) + Math.pow(ownCoords[2] - dstCoords[2], 2));
    // Koordinaten in Link umbauen
    var a = document.createElement('a');
    a.innerHTML = cell.innerHTML;
    a.href = 'game.php?village='+village[1]+'&screen=map&x='+dstCoords[1]+'&y='+dstCoords[2];

    // Mouse-Events hinzuf?¼gen um Laufzeiten-ToolTip einzublenden, auszublenden und zu bewegen
    a.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
    a.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
    a.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
    cell.innerHTML = "";
    cell.appendChild(a);
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
      var val = parseInt(inputs[i].value); 
      if(val>0)
      {
        if(dspi_unitinfo[inputs[i].name].speed > slowestUnit )
          slowestUnit=dspi_unitinfo[inputs[i].name].speed;
        sum += val * dspi_unitinfo[inputs[i].name].carry;      
      }
      sumall += parseInt(inputs[i].getAttribute("maxunits")) * dspi_unitinfo[inputs[i].name].carry;
    }
  }
  document.getElementById("dspi_unitinfo_max").innerHTML = formatNumber(sum) + " / " + formatNumber(sumall);
  var xdst = parseInt(document.getElementById('inputx').value);
  var ydst = parseInt(document.getElementById('inputy').value);
  var dist = 0;
  if(!isNaN(xdst) && !isNaN(ydst))
    dist = Math.sqrt(Math.pow(xorg - xdst, 2) + Math.pow(yorg - ydst, 2)); 
  var duration = slowestUnit * dist * speed;
  document.getElementById('dspi_duration').innerHTML = formatDuration(duration);
  var time = getTime();
  if( slowestUnit > 0 && dist > 0 )
  {
    var arrivalTime = new Date(time.getTime() + duration*60000);
    var html = formatArrivalTime(arrivalTime,time);
    var h = arrivalTime.getHours();
    if( h >= 4 && h < 6 )
      html += ' <span class="warn">(مكافئة الليل)</span>';
    document.getElementById("dspi_eta").innerHTML = html;
  }
  else
    document.getElementById("dspi_eta").innerHTML = "plapl.com";
  var tab=document.getElementById('inline_popup_content').getElementsByTagName('table'); 
  if( tab.length ) 
  {
    tab=tab[tab.length-1]; 
    for( var i = 0; i < tab.rows.length; i++ )
    {
      var coords = tab.rows[i].cells[1].childNodes[1].innerHTML.split('|'); 
      dist = Math.sqrt(Math.pow(xorg - coords[0], 2) + Math.pow(yorg - coords[1], 2)); 
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

function formatDuration(time)
{
  if( isNaN(time)) 
    time = 0;
  var hours = Math.floor((time * 60) / 3600);
  var minutes = Math.floor(time) - (hours * 60);
  var seconds = Math.round((time * 60) % 60,0); 
  var ret = "plapl.com";
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
  if( v >= 4 && v < 6 && !bbvillage )
    arrivalTimeCell.innerHTML += '<br/><span class="warn">(مكافئة الليل فعالة)!</span>';
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
    date = "اليوم";
  else if( showTime.getDate() == tomorrow.getDate() && showTime.getMonth() == tomorrow.getMonth() )
    date = "الغذ";
  else
  {
    v = showTime.getDate();
    date = "am " + (v < 10 ? "0"+v : v);
    v = showTime.getMonth();
    date += "." + (v < 10 ? "0"+v : v);
    date += "."; // + showTime.getFullYear();
  }
  v = showTime.getHours();
  var time = "  " + (v < 10 ? "0"+v : v);
  v = showTime.getMinutes();
  time += ":" + (v < 10 ? "0"+v : v);
  v = showTime.getSeconds();
  time += ":" + (v < 10 ? "0"+v : v);
  return date + time + " ساعه";
}

var cookieData;

// Forum & IGM
if( /forum\.php/.test(location.href) || /screen=mail&mode=view/.test(location.href))
{
  document.body.appendChild(document.createElement("script")).innerHTML = script;
  addRuntimeDiv();
  getCookieData();
  if( cookieData )
  {
    var tab = document.getElementsByTagName('table');
    for( var i = 0; i < tab.length; i++ )
    {
      if( tab[i].className=="main" )
        break;
    }
    tab = tab[i];
    addMouseEvents(tab);
  }
}

if( /screen=memo/.test(location.href) )
{
  document.body.appendChild(document.createElement("script")).innerHTML = script;
  addRuntimeDiv();
  getCookieData();
  addMouseEvents(document.getElementById("show_row"));
}

function getCookieData()
{
  cookieName = "dspi_curvillage";
  t = location.href.match(/forum\.php\?t=(\d+)/);
  if( t )
    cookieName += "_t" + t[1];
  var regex = new RegExp(cookieName+"=(\\d+)\\_(\\d+)\\_(\\d+)");
  cookieData = document.cookie.match(regex);
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
            var dist = Math.sqrt(Math.pow(cookieData[1] - res[1], 2) + Math.pow(cookieData[2] - res[2], 2));
            lnk.setAttribute('onmouseover', 'javascript:dspi_showTimes('+dist+');' );
            lnk.setAttribute('onmouseout', 'javascript:dspi_showTimes();' );
            lnk.setAttribute('onmousemove', 'javascript:dspi_moveTimes(event);' );
            lnk.innerHTML = res[0];
            lnk.href = 'game.php?village='+cookieData[3]+'&screen=map&x='+res[1]+'&y='+res[2];
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
          var dist = Math.sqrt(Math.pow(cookieData[1] - res[1], 2) + Math.pow(cookieData[2] - res[2], 2));
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
  // Funktionen f?¼r den "ToolTip"
  var script = "function dspi_formatDate(date,br){var v=date.getDate();var ret = (v < 10 ? '0'+v : v)+'.';v = date.getMonth()+1;ret += (v < 10 ? '0'+v : v)+'.';ret+=br?'\\n<br/>':' ';v = date.getHours();ret += (v < 10 ? '0'+v : v)+':';v = date.getMinutes();ret += (v < 10 ? '0'+v : v)+':';v = date.getSeconds();ret += (v < 10 ? '0'+v : v);return ret;}";
  script += "function dspi_showTimes(dist){var div=$('dspi_times'); if(typeof(dist)=='undefined')div.style.display='none'; else {div.style.display='block';var startTime=new Date(new Date().getTime() + arrivalTimeOffset*1000);var key;for(key in dspi_unitinfo){var cell=$('dspi_d_'+key); var time=dspi_unitinfo[key].speed*dist*dspi_speed; cell.innerHTML=dspi_format_time(time); cell.style.color=(key=='snob'&&dist>dspi_snobrange)?'#999999':'#000000';cell=$('dspi_at_'+key);if(cell){var arrivalTime = new Date(startTime.getTime() + time*60000);cell.innerHTML=dspi_formatDate(arrivalTime,true);var h=arrivalTime.getHours();cell.style.color=(key=='snob'&&dist>dspi_snobrange)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';}}cell=$('dspi_start');if(cell)cell.innerHTML=dspi_formatDate(startTime,false);}}";
  script += "function dspi_moveTimes(event){var div=$('dspi_times'); var size=div.getSize(); 	if(window.pageYOffset)scrollY = window.pageYOffset;	else scrollY = document.body.scrollTop; var x=event.clientX+10; if(x+size.x>document.body.clientWidth) x=document.body.clientWidth-size.x; div.style.left=x+'px'; div.style.top=scrollY+event.clientY-size.y-10+'px';}";
  script += "var arrivalTimeOffset="+arrivalTimeOffset+";";
  document.body.appendChild( document.createElement('script')).innerHTML = script;
  // div f?¼r den "ToolTip" einf?¼gen
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
    cell.innerHTML = "وحده";
    cell = row2.insertCell(0);
    cell.style.backgroundColor = bgCol[1];
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "وقت";
    row3 = tab.insertRow(2);
    cell = row3.insertCell(0);
    cell.style.backgroundColor = bgCol[1];
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "وقت الوصول";
    row4 = tab.insertRow(3);
    cell = row4.insertCell(0);
    cell.style.padding = '2px';
    cell.style.textAlign = 'right';
    cell.style.fontSize = '9px';
    cell.style.fontWeight = "bold";
    cell.innerHTML = "وقت البدأ";
    cell = row4.insertCell(1);
    cell.style.padding = '2px';
    cell.style.fontSize = '9px';
    cell.colSpan=3;
    cell.id = "dspi_start";
  }
  var key;
  for( key in dspi_unitinfo )
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
})();