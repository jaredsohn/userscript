// ==UserScript==
// @name DS BB-Code-Formatierer
// @description Version 1.1.0 Formatiert Berichte Forumtauglich (Ingame)
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*
// ==/UserScript==

// Versionhistory:
// 1.1.0 Truppen werden bei Verwendung von Bildern als Gesamtgrafik eingebunden
//          Verbergen von Angaben möglich
// 1.0.5 Anpassung für DS Version 6.0
// 1.0.4 Bufix bei "Truppen in anderen Dörfern"
// 1.0.3 Kompatibilitätsanpassungen
// 1.0.2 Einige Anpassung, das es mit Opera wieder tut
// 1.0.1 Grafikpackettauglichkeit eingebaut
// 1.0.0 Veröffentlichung 

(function(){
var settings = { urlType: { title: "Links:", value: 1 },
                 useImg: {title: "Bilder verwenden", value: 1 },
                 showAttCount: { title: "Angreifer Einheiten", value: 1 },                   
                 showAttLost: { title: "Angreifer Verluste", value: 1 },                   
                 showReligious: { title: "Glauben", value: 1 },                   
                 showDefCount: { title: "Verteidiger Einheiten", value: 1 },                   
                 showDefLost: { title: "Verteidiger Verluste", value: 1 },                   
                 showSpyBeute: { title: "Erspähte Rohstoffe", value: 1 },                   
                 showSpyBuild: { title: "Gebäude", value: 1 },                   
                 showBeute: { title: "Beute", value: 1 },                   
                 showSpyExtern: { title: "Einheiten ausserhalb", value: 1 } };
var defVals = "11111111111";
params = parseParams( location.search );
var isReport = false;
var unitSection = 0;
if( params.screen == "info_command" )
{
  function createBBCodeCommand()
  {
    var tab = getTableWithClassName("main",0);
    tab.parentNode.style.verticalAlign = "top";
    unitSection = 0;
    var bbcode = "[quote]"+node2BBCode(tab);
    bbcode = bbcode.replace( /\s*$/g, "" );
    bbcode += "[/quote]";
    ta.innerHTML = bbcode.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n{3,}/g, "\n\n");
  }
  var tab = getTableWithClassName("vis",0);
  var url = "http://"+location.host+"/";
  tab.width = 700;
  var cell = tab.rows[0].insertCell(1);
  cell.rowSpan=tab.rows.length;
  createBBForm(cell, 200, createBBCodeCommand, false);
  createBBCodeCommand();
}
else if( params.screen == "report" && !isNaN(parseInt(params.view)))
{
//res = location.href.match( /http:\/\/([^\/]+)\/game\.php\?.*screen=report&mode=([^&]+)&view=(\d+)/ );
  function createBBCodeReport()
  {
    // Betreff
    tab = getTableWithClassName("vis",2);
    tab.parentNode.style.verticalAlign = "top";
    unitSection = 0;
    bbcode = "[quote][b]Betreff:[/b] ";
    for( node = tab.rows[0].cells[1].firstChild; node; node = node.nextSibling )
    {
      if( node.nodeName=="IMG" )
      {
        if( node.alt == "weitergeleitet" )
        {
          if( settings.useImg.value )
            bbcode += "[img]"+url+"graphic/forwarded.png[/img] ";
          else
            bbcode += "[b][i]WG:[/i][/b] ";
        }
        else
        {
          res = node.src.match(/graphic\/dots\/(green|red|blue|yellow{1})\.png/);
          if( res )
          {
            if( settings.useImg.value )
              bbcode += "[img]"+url+"graphic/dots/"+res[1]+".png[/img] ";
            else
              bbcode += "[b][color="+res[1]+"]*[/color][/b] ";
          }
        }
      }
      else if( node.nodeName=="SPAN" && node.id=="label" )
      {
        bbcode +="[b]"+node.firstChild.innerHTML+"[/b]\n";
        break;
      }
    }

    // Gesendet, ggf Weitergeleitet am und von
    var i = 1;
    while( tab.rows[i].cells.length == 2 )
    {
      bbcode += tab.rows[i].cells[0].firstChild.nodeValue + " ";
      bbcode += node2BBCode(tab.rows[i].cells[1]) + "\n";
      i++;
    }
    bbcode += "\n" + node2BBCode(tab.rows[i].cells[0]);
    bbcode = bbcode.replace( /\s*$/g, "" );
    bbcode += "\n[/quote]";

    if( !settings.showAttCount.value )
      bbcode = bbcode.replace(/Paladin:.+/, "" );
    if( !settings.showReligious.value )
      bbcode = bbcode.replace(/Glauben:.+/, "Glauben: Verborgen" );
    if( !settings.showSpyBeute.value )
      bbcode = bbcode.replace(/ Rohstoffe:\[\/b\].+/, " Rohstoffe: Verborgen" );
    if( !settings.showSpyBuild.value )
    {
      bbcode = bbcode.replace( /[^\[]+\[b\]\(Stufe .+/g, "" );
      bbcode = bbcode.replace( /ude:\[/, "ude:[\\b] Verborgen" );
    }
    if( !settings.showBeute.value )
      bbcode = bbcode.replace( /Beute:\[\/b\].+/, "Beute:[\\b] Verborgen" );
    
    if( !isReport )
    {
      for( var key in settings )
      {
        if( key != "urlType" && key != "useImg" )
        {
          var e = document.getElementById("dsbb_"+key);
          e.parentNode.style.display = "none";
        }
      }
    }
    
    ta.innerHTML = bbcode.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n{3,}/g, "\n\n");
  }
  var url = "http://"+location.host+"/";
  var tab = getTableWithClassName("vis",2);
  tab = tab.parentNode.parentNode.parentNode.parentNode;
  tab.width = 700;
  var cell = tab.rows[0].insertCell(tab.rows[0].cells.length);
  cell.rowSpan=tab.rows.length;
  createBBForm(cell,180,createBBCodeReport,true);
  createBBCodeReport();
}
function skipSiblings(node, count)
{
  var c = 0;
  while( c < count && node )
  {
    node = node.nextSibling;
    c++;
  }
  return node;
}
function removeWhiteSpaces(str)
{
  if( str )
    str = str.replace( /^\s*|\s{2,}/g, "" );
  return str;
}

function getBBUrl(url,name)
{
  ret = "[url=";
  if( settings.urlType.value == 3 )
    ret += '"';
  ret += url;
  if( settings.urlType.value == 3 )
    ret += '"';
  ret += "]"+removeWhiteSpaces(name)+"[/url] ";
  return ret;
}  

function getVillageBBCode(html,id)
{           
  var cp = html.lastIndexOf("(");
  var coords = html.substring(cp).match( /(\d+)\|(\d+)/ );
  var lnk = removeWhiteSpaces(html);
  var ret = "";
  switch( settings.urlType.value )
  {
    case "0":
      ret += lnk;
      break;
    case "1":
      ret += "[village]" + coords[1] + "|" + coords[2] + "[/village]";
      break;
    default:
      ret += getBBUrl(url+"page.php?page=inbound&screen=info_village&id="+id,lnk);
  }
  return ret;
}

function node2BBCode(node)
{
  var ret = "";
  if( node )
  {
    if( node.id=="dsbb_form" || node.className=="server_info")
      return ret;
    var skipChildren = false;
    switch( node.nodeName )
    {
      case "TABLE":
        if( /rabe(_grau)?\.png/.test(node.innerHTML) )
          return ret;
        else if( node.rows[0] && !/<table[^>]*>/i.test(node.rows[0].innerHTML) && /\/unit\/unit\_[^.]+\.png/.test(node.rows[0].innerHTML) )
        {
          return parseUnits(node);
        }
        break;
      case "TD":
        if( node.rowSpan == 1 )
          break;
      case "TH":
      case "B":
        ret += "[b]";
        break;
      case "BR":
      case "P":
        ret += "\n";
        break;
      case "A":
        var res = parseParams(node.href); //.match( /screen=info\_player&id=(\d+)/ );
        var lnk = removeWhiteSpaces(node.innerHTML);
        if( res.screen == "info_player" )
        {
          switch( settings.urlType.value )
          {
            case "0":
              ret += lnk;
              break;
            case "1":
              ret += "[player]" + lnk + "[/player]";
              break;
            default:
              ret += getBBUrl(url+"page.php?page=inbound&screen=info_player&id="+res.id,lnk);
          }
        }
        else
        {
          res = parseParams(node.href)
          if( res.screen == "info_village" )
            ret += getVillageBBCode(node.innerHTML,res.id) + "\n";
        }
        skipChildren = true;
        break;
      case "IMG":
        if( settings.useImg.value )
        {
          if( /graphic/.test(node.src) )
            src = url + node.src.substring(node.src.lastIndexOf("graphic"));
          else
            src = node.src;
          var idx = src.lastIndexOf("?");
          if( idx > -1 )
            src = src.substring(0,idx);
          ret += "[img]"+ src + "[/img]";
        }
        else
          ret += node.title + " ";
        break;
      default:
        if( /H([1234])/.test(node.nodeName) )
        {
          size = 20-parseInt(node.nodeName[1]);
          var val = removeWhiteSpaces(node.innerHTML.replace(/<[^>]+>/g, ""));
          //ret += "[size="+size+"][b][i]"+val+"[/i][/b][/size]\n";
          ret += "[b][i]"+val+"[/i][/b]\n";
          nextNode = skipSiblings(node,2);
          if( (node.parentNode && /T[DH]/.test(node.parentNode.nodeName)) && 
              nextNode && (!/T[DH]/.test(nextNode.nodeName) && nextNode.nodeName != "TABLE") )
          {
            ret += "\n"
          }
          if( /Gl.{1,2}ck \(aus Sicht des Angreifers\)/.test(val) )
          {
            node = skipSiblings(node,2);
            ret += parseLuck(node);
            isReport = true;
          }
          skipChildren = true;
        }
        else if( node.nodeValue )
        {
          if( node.nodeValue )
          {
            ret += removeWhiteSpaces(node.nodeValue);
          }
        }
        break;
    }
    if( !skipChildren )
    {
      var child = node.firstChild;
      while (child != null)
      {
          ret += node2BBCode(child);
          child = child.nextSibling;
      }
    }
    switch( node.nodeName )
    {
      case "TH":
      case "B":
        ret += "[/b] ";
        if( ret == "[b]Gebäude:[/b] " )
          ret += "\n";
      case "TD":
        if( node.rowSpan > 1 )
          ret += "[/b]\n";
        break;
      case "TR":
        if( ret.replace(/\s*/,"").length > 0 )
          ret += "\n";
        break;
    }
  }
  return ret;
}
function parseLuck(node)
{
  var ret = "";
  var res = node.innerHTML.match( /<b>([-]?(\d+)\.(\d+))%<\/b>/ );
  if( res )
  {
    var luck = parseFloat(res[1]);
    if( luck < 0 )
    {
      if( settings.useImg.value )
        ret += "[img]"+url+"graphic/rabe.png[/img] ";
      ret += "[b]Pech:";
    }
    else
    {
      if( settings.useImg.value )
        ret += "[img]"+url+"graphic/klee.png[/img] ";
      ret += "[b]Glück:";
    }
    ret += Math.abs(luck) + "%[/b]\n\n";
  }
  return ret;
}
function parseUnits(node)
{
  unitSection++;
  var ret = "";
  var rows = new Array();
  var start = 0;
  var title = !/\/unit\/unit\_[^.]+\.png/.test(node.rows[0].cells[0].innerHTML);
  if( title ) 
    start++;
  for( var r = 1; r < node.rows.length; r++ )
    rows[r] = "";
  var showCount = (unitSection == 1 && settings.showAttCount.value) || (unitSection == 2 && settings.showDefCount.value);
  var showLost = (unitSection == 1 && settings.showAttLost.value) || (unitSection == 2 && settings.showDefLost.value);

  if( isReport && settings.useImg.value && title && node.rows.length == 3 && node.rows[1].cells[0].innerHTML == "Anzahl:" && node.rows[2].cells[0].innerHTML == "Verluste:" )
  {
    if( showCount || showLost )
    {
      ret = "[img]http://hypix.de/staemme/unitspng.php?";
      for( var c = start; c < node.rows[0].cells.length; c++ )
      {
        unit = node.rows[0].cells[c].firstChild.src;
        var pos = unit.lastIndexOf("_");
        var idx = unit.lastIndexOf(".");
        unit = unit.substr(pos+1,idx-pos-1);
        ret += unit + "=" + (showCount ? node.rows[1].cells[c].innerHTML : "x") + "_" + (showLost ? node.rows[2].cells[c].innerHTML : "x") + "&";
      }
      ret += "[/img]";
    }
    else
      ret = "Truppen des " + (unitSection == 1 ? "Angreifers" : "Verteidigers") + " verborgen\n";
  }
  else if( settings.useImg.value && !title && node.rows.length == 2 )
  {
    if( !isReport || settings.showSpyExtern.value )
    {
      ret = "[img]http://hypix.de/staemme/unitspng.php?";
      for( var c = start; c < node.rows[0].cells.length; c++ )
      {
        unit = node.rows[0].cells[c].firstChild.src;
        var pos = unit.lastIndexOf("_");
        var idx = unit.lastIndexOf(".");
        unit = unit.substr(pos+1,idx-pos-1);
        ret += unit + "=" + node.rows[1].cells[c].innerHTML + "&";
      }
      ret += "[/img]";
    }
    else
      ret = "Verborgen\n";
  }
  else
  {
    for( var c = start; c < node.rows[0].cells.length; c++ )
    {
      var unit;
      if( settings.useImg.value )
      {
        unit = node.rows[0].cells[c].firstChild.src;
        var pos = unit.lastIndexOf("/");
        var idx = unit.lastIndexOf("?");
        if( idx == -1 )
          unit = "[img]"+url+"graphic/unit"+unit.substr(pos)+"[/img] ";
        else
          unit = "[img]"+url+"graphic/unit"+unit.substr(pos,idx-pos)+"[/img] ";
      }
      else
        unit = " " + node.rows[0].cells[c].firstChild.title + "\n";
      
      for( var r = 1; r < node.rows.length; r++ )
      {
        var anz = parseInt(node.rows[r].cells[c].innerHTML);
        if( anz )
        {
          if( settings.useImg.value )
            rows[r] += unit + anz + "[color=white]__[/color]";
          else
            rows[r] += anz + unit;
        }
      }
    }
    for( r = 1; r < rows.length; r++ )
    {
      if( !isReport || unitSection <= 2 || settings.showSpyExtern.value )
      {
        if( title )
        {
          var title = node.rows[r].cells[0].innerHTML;
          var res = parseParams(title); //.match( /screen=info_village&amp;id=(\d+)/ );
          if( res.screen == "info_village" )
            ret += getVillageBBCode(title,res.id)+"\n";
          else
            ret += "[b]"+removeWhiteSpaces(title)+"[/b]\n";
        }      
        if( unitSection > 2 || r == 1 && showCount || r == 2 && showLost )
          ret += rows[r].length ? rows[r]+"\n" : "Keine\n";
        else
          ret += "Verborgen\n";
      }
      else
        res += "Verborgen\n";
    }
  }
  return ret;
}
function toggleSettings()
{
  var frm = document.getElementById("dsbb_settings");
  if( frm.style.display == "none" )
    frm.style.display="block";
  else
    frm.style.display="none";
}
function createBBForm(cell,size,createBBCode,report)
{
  function selectall()
  {
    this.select();
  }

  cell.style.verticalAlign="top";
  cell.id="dsbb_form";
  cell.style.padding="0 0 0 0";
  var tab = cell.appendChild(document.createElement("table"));
  tab.style.border="1px solid black";  
  tab.className="vis";
  tab.cellSpacing=2;
  tab.cellPadding=2;
  tab.style.width = size+"px";
  var row = tab.insertRow(0);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML="DS-Berichteformatierer";
  
  cell = tab.insertRow(1).insertCell(0);
  cell.colSpan = 2;
  ta = cell.appendChild(document.createElement("textarea"));
  ta.readOnly = true;
  ta.style.backgroundColor = "#F7EED3";
  ta.style.border = "1px solid rgb(222, 211, 185)";
  ta.addEventListener("click", selectall, false );
  ta.style.width=size+"px";
  ta.style.height="50px";
  
  cell = tab.insertRow(tab.rows.length).appendChild(document.createElement("th"));
  cell.innerHTML = "Optionen:";
  cell = tab.insertRow(tab.rows.length).insertCell(0);
  cell.innerHTML = "Links:";
  var ctrl = cell.appendChild(document.createElement("select"));
  ctrl.id="dsbb_urlType";
  var option = document.createElement("option");
  option.value = 0;
  option.text = "Keine";
  option.selected = settings.urlType.value == 0;
  ctrl.options.add(option);
  option = document.createElement("option");
  option.value = 1;
  option.text = "DS-BB-Codes";
  option.selected = settings.urlType.value == 1;
  ctrl.options.add(option);
  option = document.createElement("option");
  option.value = 2;
  option.text = "[URL=]";
  option.selected = settings.urlType.value == 2;
  ctrl.options.add(option);  
  option = document.createElement("option");
  option.value = 3;
  option.text = '[URL=""]';
  option.selected = settings.urlType.value == 3;
  ctrl.options.add(option);  

  for( var key in settings )
  {
    if( key != "urlType" )
    {
      cell = tab.insertRow(tab.rows.length).insertCell(0);
      ctrl = cell.appendChild(document.createElement("input"));
      ctrl.type = "checkbox";
      ctrl.checked = settings[key].value;
      ctrl.id="dsbb_" + key;
      cell.appendChild(document.createTextNode(settings[key].title));
      if( !report && key != "useImg" )
        cell.style.display = "none";
    }
  }
 
  cell = tab.insertRow(tab.rows.length).insertCell(0);
  var btn = cell.appendChild(document.createElement("input"));
  btn.type="button";
  btn.value="Anwenden";
  btn.style.width = "100%";
  btn.addEventListener("click", function() { submitSettings(); createBBCode(); loadSettings(); }, false );
  
  cell = tab.insertRow(tab.rows.length).insertCell(0);
  var btn = cell.appendChild(document.createElement("input"));
  btn.type="button";
  btn.value="Anwenden und Speichern";
  btn.style.width = "100%";
  btn.addEventListener("click", function() { submitSettings(); createBBCode(); saveSettings(); }, false );
  loadSettings();
}

function submitSettings()
{
  for( var key in settings )
  {
    var ctrl = document.getElementById("dsbb_"+key);
    if( key == "urlType" )
      settings[key].value = ctrl.value;
    else
      settings[key].value = ctrl.checked ? 1 : 0;
  }
}

function loadSettings()
{
  var vals = "";
  if( typeof(GM_getValue) == "function" )
    vals = GM_getValue("settings", "");
  else
  {
    var cookieData = document.cookie.match( /dsbb_settings=(\d{2});/ );
    if( cookieData )
      vals = cookieData[1];
  }
  if( vals.length < defVals.length )
  {
    vals += defVals.substring(vals.length);
  }
  idx = 0;
  for( var key in settings )
  {
    eval( "settings[key].value = "+(idx < vals.length ? vals[idx++] : settings[key].value) + ";");
    var ctrl = document.getElementById("dsbb_"+key);
    if( key == "urlType" )
      ctrl.value = settings[key].value;
    else
      ctrl.checked = settings[key].value;
  }
}
function saveSettings()
{
  var vals = "";
  for( var key in settings )
  {
    var ctrl = document.getElementById("dsbb_"+key);
    if( key == "urlType" )
      vals += ctrl.value;
    else
      vals += ctrl.checked ? 1 : 0;
  }
  
  if( typeof(GM_setValue) == "function" )
    GM_setValue("settings", vals);
  else
  { 
    var expires = new Date();
    expires = new Date( expires.getTime() + 365*24*60*60*1000);
    document.cookie = "dsbb_settings=" + vals + "; expires=" + expires.toGMTString();
  }
}
function getTableWithClassName(className, idx)
{
  tabs = document.getElementsByTagName("table");
  count = 0;
   for( ti = 0; ti < tabs.length; ti++ )
  {
    if( tabs[ti].className==className )
    {
      if( count == idx )
        return tabs[ti];
      count++;
    }
  }
}
function parseParams(url)
{
  url = url.substring(url.indexOf("?")+1);
  url = url.replace( /&amp;/g, "&" );
  url = url.split("&");
  var params = {};
  for( var i = 0; i < url.length; i++ )
  {
    var param = url[i].split("=");
    params[param[0]] = param[1];
  }
  return params;
}

function dumpObj(obj,silent)
{
  var str = "\n{";
  for( var key in obj )
  {
    if( typeof( obj[key] ) == "object" )
    {
      str += "\n" + key + ":";
      str += dumpObj(obj[key],true)
    }
    else
      str += "\n" + key + ": " + obj[key];
  }
  str += "\n}";
  if( !silent )
    GM_log(str);
  return str;
}
})();