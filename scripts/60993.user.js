// ==UserScript==
// @name tribalwars BB-Code-plapl-public-report
// @description سكربات ناشر التقرير في المنتديات الدخليه لي العبه على شكل نص
// @author Hypix
// @namespace http://hypix.de/
// @include http://ae*.tribalwars.ae/game.php*
// ==/UserScript==

// Versionhistory:
// 1.0.4 Bufix bei "Truppen in anderen Dörfern"
// 1.0.3 Kompatibilitätsanpassungen
// 1.0.2 Einige Anpassung, das es mit Opera wieder tut
// 1.0.1 Grafikpackettauglichkeit eingebaut
// 1.0.0 Veröffentlichung 

var urlType = 1;          // 0 = None Links, 1 = DS-BB-Codes, 2 = [URL=], 3 = [URL=""]
var useImg = true;        // true = IMG BB-Code verwenden, false = IMG-BB-Code nicht verwenden

var showAttCount = true;  // true = Truppen des Angreifers anzeigen, false = verbergen
var showAttLost = true;   // true = Verluste des Angreifers anzeigen, false = verbergen
var showReligious = true; // true = Glauben anzeigen, false = verbergen
var showDefCount = true;  // true = Truppen des Verteidigers anzeigen, false = verbergen
var showDefLost = true;   // true = Verluste des Verteidigers anzeigen, false = verbergen
var showBeute = true;     // true = Beute anzeigen, false = verbergen
var showSpyBeute = true;  // true = Erspähte Rohstoffe anzeigen, false = verbergen
var showSpyBuild = true;  // true = Erspähte Gebäude anzeigen, false = verbergen
var showSpyExtern = true; // true = Truppen ausserhalb anzeigen, false = verbergen

var res = location.href.match( /http:\/\/([^\/]+)\/game\.php\?(t=\d+&)?village=(\d+)&screen=info\_command/ );
if( res )
{
  function createBBCodeCommand()
  {
    var tab = getTableWithClassName("main",0);
    var bbcode = "[quote]"+node2BBCode(tab);
    bbcode = bbcode.replace( /\s*$/g, "" );
    bbcode += "[/quote]";
    ta.innerHTML = bbcode.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n{3,}/g, "\n\n");
  }
  var tab = getTableWithClassName("vis",0);
  var url = "http://"+res[1]+"/";
  tab.width = 700;
  var cell = tab.rows[0].insertCell(1);
  cell.rowSpan=tab.rows.length;
  createBBForm(cell, 200, createBBCodeCommand, false);
  createBBCodeCommand();
}
res = location.href.match( /http:\/\/([^\/]+)\/game\.php\?.*screen=report&mode=([^&]+)&view=(\d+)/ );
if( res )
{
  function createBBCodeReport()
  {
    // Betreff
    tab = getTableWithClassName("vis",2);
    
    bbcode = "[quote][b][color=#ff0000]الموضوع[/color]:[/b] ";
    for( node = tab.rows[0].cells[1].firstChild; node; node = node.nextSibling )
    {
      if( node.nodeName=="IMG" )
      {
        if( node.alt == "weitergeleitet" )
        {
          if( useImg )
            bbcode += "[img]"+url+"graphic/forwarded.png[/img] ";
          else
            bbcode += "[b][i]WG:[/i][/b] ";
        }
        else
        {
          res = node.src.match(/graphic\/dots\/(green|red|blue|yellow{1})\.png/);
          if( res )
          {
            if( useImg )
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
    bbcode = bbcode.replace( /\s*$/g, "" ) + "\n";
	bbcode += "==================>>[url]plapl.com[/url]<<==================";
    bbcode += "[/quote]";
    ta.innerHTML = bbcode.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n{3,}/g, "\n\n");
  }
  var url = "http://"+res[1]+"/";
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
  if( urlType == 3 )
    ret += '"';
  ret += url;
  if( urlType == 3 )
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
  switch( urlType )
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
        var res = node.href.match( /screen=info\_player&id=(\d+)/ );
        var lnk = removeWhiteSpaces(node.innerHTML);
        if( res )
        {
          switch( urlType )
          {
            case "0":
              ret += lnk;
              break;
            case "1":
              ret += "[player]" + lnk + "[/player]";
              break;
            default:
              ret += getBBUrl(url+"page.php?page=inbound&screen=info_player&id="+res[1],lnk);
          }
        }
        else
        {
          res = node.href.match( /screen=info_village&id=(\d+)/ );
          if( res )
            ret += getVillageBBCode(node.innerHTML,res[1]) + "\n";
        }
        skipChildren = true;
        break;
      case "IMG":
        if( useImg )
        {
          if( /graphic/.test(node.src) )
            src = url + node.src.substring(node.src.lastIndexOf("graphic"));
          else
            src = node.src;
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
      if( useImg )
        ret += "[img]"+url+"graphic/rabe.png[/img] ";
      ret += "[b]Pech:";
    }
    else
    {
      if( useImg )
        ret += "[img]"+url+"graphic/klee.png[/img] ";
      ret += "[b]luck:";
    }
    ret += Math.abs(luck) + "%[/b]\n\n";
  }
  return ret;
}
function parseUnits(node)
{
  var ret = "";
  var rows = new Array();
  var start = 0;
  var title = !/\/unit\/unit\_[^.]+\.png/.test(node.rows[0].cells[0].innerHTML);
  {
    if( title ) 
      start++;
    for( var r = 1; r < node.rows.length; r++ )
      rows[r] = "";
  }
  for( var c = start; c < node.rows[0].cells.length; c++ )
  {
    var unit;
    if( useImg )
    {
      unit = node.rows[0].cells[c].firstChild.src;
      var pos = unit.lastIndexOf("/");
      unit = "[img]"+url+"graphic/unit/"+unit.substr(pos)+"[/img] ";
    }
    else
      unit = " " + node.rows[0].cells[c].firstChild.title + "\n";
    for( var r = 1; r < node.rows.length; r++ )
    {
      var anz = parseInt(node.rows[r].cells[c].innerHTML);
      if( anz )
      {
        if( useImg )
          rows[r] += unit + anz + "[color=white]__[/color]";
        else
          rows[r] += anz + unit;
      }
    }
  }
  for( r = 1; r < rows.length; r++ )
  {
    if( title )
    {
      var title = node.rows[r].cells[0].innerHTML;
      var res = title.match( /screen=info_village&amp;id=(\d+)/ );
      if( res )
        ret += getVillageBBCode(title,res[1])+"\n";
      else
        ret += "[b]"+removeWhiteSpaces(title)+"[/b]\n";
    }      
    ret += rows[r].length ? rows[r]+"\n" : "none\n";
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
  tab = cell.appendChild(document.createElement("table"));
  tab.style.border="1px solid black";  
  tab.className="vis";
  tab.cellSpacing=2;
  tab.cellPadding=2;
  tab.style.width = size+"px";
  row = tab.insertRow(0);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML="plapl-public-report-نشر التقرير";

  cell = tab.insertRow(1).insertCell(0);
  ta = cell.appendChild(document.createElement("textarea"));
  ta.readOnly = true;
  ta.style.backgroundColor = "#F7EED3";
  ta.style.border = "1px solid rgb(222, 211, 185)";
  ta.addEventListener("click", selectall, false );
  ta.style.width=size+"px";
  ta.style.height="150px";
  
  cell = tab.insertRow(tab.rows.length).appendChild(document.createElement("th"));
  cell.style.textAlign="center";
  var lnk = cell.appendChild(document.createElement("a"));
  lnk.href = "javascript:void(0)";
  lnk.innerHTML = "خيارات";
  lnk.style.cursor = "pointer";
  lnk.addEventListener("click", toggleSettings, true );
  
  var div = document.body.appendChild(document.createElement("div"));
  div.style.width = "300px";
  div.style.height = "120px";
  div.style.position = "absolute";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.marginLeft = "-150px";
  div.style.marginTop = "-60px";
  div.zIndex = 1000;
  div.style.display = 'none';
  div.style.border="2px solid #804000";
  div.style.backgroundColor="#F7EED3";
  div.id = "dsbb_settings";
  tab = div.appendChild(document.createElement("table"));
  tab.insertRow(tab.rows.length).appendChild(document.createElement("th")).innerHTML = "نشر التقرير-plapl.com-خيارات";
  tab.style.width = "100%";
  tabAllg = tab.insertRow(tab.rows.length).insertCell(0).appendChild((document.createElement("table")));
  tabAllg.style.border = "1px solid rgb(222, 211, 185)";
  tabAllg.style.width = "100%";
  cell = tabAllg.insertRow(tabAllg.rows.length).appendChild(document.createElement("th"));
  cell.innerHTML = "عام";
  cell.colSpan=2;
  tabAllg.insertRow(tabAllg.rows.length).insertCell(0).innerHTML = "اللاعبون وروابط القرى:";
  cell = tabAllg.rows[tabAllg.rows.length-1].insertCell(1);
  var ctrl = cell.appendChild(document.createElement("select"));
  ctrl.id="dsbb_urltype";
  var option = document.createElement("option");
  option.value = 0;
  option.text = "None";
  option.selected = urlType == 0;
  ctrl.options.add(option);
  option = document.createElement("option");
  option.value = 1;
  option.text = "DS-BB-Codes";
  option.selected = urlType == 1;
  ctrl.options.add(option);
  option = document.createElement("option");
  option.value = 2;
  option.text = "[URL=]";
  option.selected = urlType == 2;
  ctrl.options.add(option);  
  option = document.createElement("option");
  option.value = 3;
  option.text = '[URL=""]';
  option.selected = urlType == 3;
  ctrl.options.add(option);  
  tabAllg.insertRow(tabAllg.rows.length).insertCell(0).innerHTML = "استخدم الصور:";
  cell = tabAllg.rows[tabAllg.rows.length-1].insertCell(1);
  ctrl = cell.appendChild(document.createElement("input"));
  ctrl.type = "checkbox";
  ctrl.checked = useImg;
  ctrl.id="dsbb_useimg";
  
  cell = tab.insertRow(tab.rows.length).insertCell(0);
  cell.colSpan=2;
  cell.style.textAlign="center";
  btn = cell.appendChild(document.createElement("input"));
  btn.type="button";
  btn.value="موفق";
  btn.addEventListener("click", function() { saveSettings(); createBBCode(); }, false );
  
  btn = cell.appendChild(document.createElement("input"));
  btn.type="button";
  btn.value="لغاء";
  btn.addEventListener("click", function() { loadSettings(); toggleSettings(); }, false );
  
  loadSettings();
}
function loadSettings()
{
  if( typeof(GM_getValue) == "function" )
  {
    urlType = GM_getValue("urlType", urlType);
    useImg = GM_getValue("useImg", useImg);
  }
  else
  {
    var cookieData = document.cookie.match( /dsbb_settings=(\d{2});/ );
    if( cookieData )
    {
      urlType = cookieData[1][0];
      useImg = cookieData[1][1] == 1;
    }
  }
  document.getElementById("dsbb_urltype").value = urlType;
  document.getElementById("dsbb_useimg").checked = useImg;
}
function saveSettings()
{
  urlType = document.getElementById("dsbb_urltype").value;
  useImg = document.getElementById("dsbb_useimg").checked;
  if( typeof(GM_setValue) == "function" )
  {
    GM_setValue("urlType", urlType);
    GM_setValue("useImg", useImg );
  }
  else
  { 
    var expires = new Date();
    expires = new Date( expires.getTime() + 365*24*60*60*1000);
    document.cookie = "dsbb_settings=" + urlType + "" + (useImg ? "1" : "0") + "; expires=" + expires.toGMTString();
  }
  toggleSettings();
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