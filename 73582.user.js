// ==UserScript==
// @name tribalwars-Resources-Coloring-plapl.com
// @description Version 1.0.2 Gestaltet die Resourcen in der Produktionsübersicht übersichtlicher und fügt Summen ein
// @author Hypix
// @namespace http://hypix.de/
// @include http://*tribalwars*/game.php*
// ==/UserScript==

// Versionhistory:
//خاص في تليون الموارد والمساحة التخزنيه و استهلاك المزارع
// 1.0.2 Anpassungen für DS 6.1
// 1.0.1 Sortiermöglichkeit in der Übersicht eingebaut
// 1.0.0 Veröffentlichung
(function(){
var version = "1.0.2";
var params = parseParams(location.href);
var server = document.location.host.split('.')[0];

var settingsPrefix = "dssp_";
var settingSections = { title: "الموارد في  بار القريه", overview: "الموارد في الشكل العام" };
var settings = { redThreshold:    { section: "",         type: "text", size: 3, value: 60, title: "النسبه المئوية مسبوغه في الاخضر و الاحمر" },
                 titleKDots:      { section: "title",    type: "checkbox", value: true, title: "استخدم الفاصله الفيه في الارقام" },
                 titleResColored: { section: "title",    type: "checkbox", value: true, title: "تغير لون الموارد على حسب المتوجد و المساحه التخزنيه" },
                 titleBHColored:  { section: "title",    type: "checkbox", value: true, title: "مزرعة القيم اعتمادا على لون ودائع الإشغال" },
                 titleBHTotal:    { section: "title",    type: "checkbox", value: true, title: "مزرعة حجم الصورة" },
                 ovKDots:         { section: "overview", type: "checkbox", value: true, title: "استخدام الفاصله في الارقام لي كل الف" },
                 ovResColored:    { section: "overview", type: "checkbox", value: true, title: "تلوين الموارد على حسب المساحه التخزنيه" },
                 ovBHColored:     { section: "overview", type: "checkbox", value: true, title: "تلوين المزارع على حسب المساحه المستهلكه" },
                 ovBHTotal:       { section: "overview", type: "checkbox", value: true, title: "فقط اضهار المساحه المستهلكه في المزارع" }
               };
var resis = ["holz", "lehm", "eisen" ];
var ids = [ "wood", "stone", "iron", "farm" ];
var storageid = "storage";
var storage = 0;

loadSettings();
doHeadLine();

switch( params.screen )
{
  case "overview_villages":
    doProdOverview();
    break;
  case "settings":
    if( params.mode=="settings" )
      showSettings();
  default:
    break;
}

function doHeadLine()
{
  if( settings.titleKDots.value || settings.titleResColored.value )
  {
    document.getElementById("wood").id = "hpx_wood";
    document.getElementById("stone").id = "hpx_stone";
    document.getElementById("iron").id = "hpx_iron";

    storage = document.getElementById("storage");
    storage.id="hpx_storage";

    var tmp = document.createElement("span");
    tmp.appendChild(document.createTextNode(""));
    tmp.id = "wood";
    tmp.style.display = "none";
    document.body.appendChild(tmp);

    tmp = document.createElement("span");
    tmp.appendChild(document.createTextNode(""));
    tmp.id = "stone";
    tmp.style.display = "none";
    document.body.appendChild(tmp);

    tmp = document.createElement("span");
    tmp.appendChild(document.createTextNode(""));
    tmp.id = "iron";
    tmp.style.display = "none";
    document.body.appendChild(tmp);

    tmp = document.createElement("span");
    tmp.appendChild(document.createTextNode(storage.innerHTML));
    tmp.id = "storage";
    tmp.style.display = "none";
    document.body.appendChild(tmp);

    storage.innerHTML = formatNumber(parseInt(storage.innerHTML), settings.titleKDots.value, true);
    storage = document.getElementById("storage").innerHTML;
    window.setInterval( tick, 1000 );
    storageid = "hpx_storage";
  }

  if( settings.titleBHColored.value || settings.titleKDots.value || !settings.titleBHTotal.value )
  {
    var bh = document.getElementById(storageid);
    for( var i = 0; i < 8; i++ )
      bh = bh.parentNode;
    bh = bh.nextSibling.nextSibling.firstChild.nextSibling; 
    bh = bh.rows[0].cells[0].firstChild.nextSibling.rows[0].cells[1];

    var vals = [ document.getElementById("pop_current").innerHTML, document.getElementById("pop_max").innerHTML ];
    
    var html = formatNumber(vals[0], settings.titleKDots.value, true);
    if( settings.titleBHTotal.value )
      html += "/" + formatNumber(vals[1], settings.titleKDots.value, true);
    bh.innerHTML = html;
    bh.style.cursor = "default";
    bh.title = formatNumber(vals[1]-vals[0], settings.titleKDots.vale, false ) + " frei";
    
    if( settings.titleBHColored.value )
      bh.style.backgroundColor = getColor( vals[0] * 100 / vals[1] );
  }
}

function doProdOverview()
{
  var t = document.getElementsByClassName("selected")[0];
  if( !t )
    t = document.getElementsByClassName("menu_selected")[0];

  if( !t || /mode=prod/.test(t.innerHTML) ) 
  {
    var tab = document.getElementsByClassName("vis");
    if( tab[tab.length-1].rows.length == 1 )
      tab = tab[tab.length-2];
    else
      tab = tab[tab.length-1];
    var sum = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
    var html = "<tbody><tr>";
    for( var i = 0; i < tab.rows[0].cells.length; i++ )
    {
      switch( i )
      {
        case 2: // Ressis
          html += '<th style="text-align: center;"><table><tr><th style="width:100%; text-align:center;"><img alt="" title="Holz" src="graphic/holz.png"/></th><th title="تصنيف حسب الأسهم" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_wood_v">#</a></th><th title="تصنيف حسب المستوى" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_wood_p">%</a></th></tr></table></th>';
          html += '<th style="text-align: center;"><table><tr><th style="width:100%; text-align:center;"><img alt="" title="Lehm" src="graphic/lehm.png"/></th><th title="تصنيف حسب الأسهم" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_stone_v">#</a></th><th title="تصنيف حسب المستوى" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_stone_p">%</a></th></tr></table></th>';
          html += '<th style="text-align: center;"><table><tr><th style="width:100%; text-align:center;"><img alt="" title="Eisen" src="graphic/eisen.png"/></th><th title="تصنيف حسب الأسهم" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_iron_v">#</a></th><th title="تصنيف حسب المستوى" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_iron_p">%</a></th></tr></table></th>';
          break;
        case 5: // BH
          html += '<th style="text-align: center;"><table><tr><th style="width:100%; text-align:center;"><img alt="" title="مزرعة" src="graphic/face.png"/></th><th title="Nach Bestand sortieren" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_farm_v">#</a></th><th title="تصنيف حسب المستوى" style="font-size:xx-small;"><a href="javascript:;" id="dsrt_farm_p">%</a></th></tr></table></th>';
          break; 
        default:
          html += '<th>' + tab.rows[0].cells[i].innerHTML + '</th>';
      }
    }
    html += "</tr>";
    for( var i = 1; i < tab.rows.length; i++ )
    {
      html += '<tr style="white-space: nowrap;" class="'+tab.rows[i].className+'">';
      html += '<td>' + tab.rows[i].cells[0].innerHTML + '</td>';
      html += '<td>' + tab.rows[i].cells[1].innerHTML + '</td>';
      var res = tab.rows[i].cells[2].innerHTML.replace(/<[^>]+>|\./g, "" ).split(" ");
      var ist = 0;
      var idx = 0;
      var max = parseInt(tab.rows[i].cells[3].innerHTML, 10);
      
      for( var r = 0; r < 3; r++ )
      {
        if( new RegExp(resis[r]).test(tab.rows[i].cells[2].innerHTML) )
          ist = parseInt(res[idx++],10);
        else
          ist = 0;
        sum[r] += ist;
        var percent = Math.round( ist * 100 / max );
        html += '<td style="cursor: default; text-align: right; padding-left: 5px; padding-right: 5px;';
        if( settings.ovResColored.value )
          html += ' background-color:' + getColor( percent ) + ";";
        html += '" title="' + formatNumber( max - ist, settings.ovKDots.value, false ) + ' frei" dsrt_val="'+ist+'" dsrt_pro="'+percent+'">' + formatNumber(ist, settings.ovKDots.value, true) + '</td>';
      }
      ist = parseInt(tab.rows[i].cells[3].innerHTML,10);
      sum[3] += ist;
      html += '<td style="text-align: right; padding-left: 5px; padding-right: 5px;">' + formatNumber(ist, settings.ovKDots.value, true) + '</td>';
      html += '<td>' + tab.rows[i].cells[4].innerHTML + '</td>';

      ist = tab.rows[i].cells[4].innerHTML.replace(/<[^>]+>/g, "").split("/");
      max = parseInt(ist[1], 10);
      ist = parseInt(ist[0], 10);
      sum[4] += ist;
      sum[5] += max;

      ist = tab.rows[i].cells[5].innerHTML.split("/");
      max = parseInt(ist[1], 10);
      ist = parseInt(ist[0], 10);
      percent = Math.round(ist * 100 / max);
      sum[6] += ist;
      sum[7] += max;
      html += '<td style="cursor: default; text-align: right; padding-left: 5px; padding-right: 5px;';
      if( settings.ovBHColored.value )
        html += ' background-color:' + getColor( percent );
      html += '" title="' + formatNumber( max - ist, settings.ovKDots.value, false ) + ' frei" dsrt_val="'+ist+'" dsrt_pro="'+percent+'">' + formatNumber(ist, settings.ovKDots.value, true);
      if( settings.ovBHTotal.value )
        html += '/' + formatNumber(max, settings.ovKDots.value, true) + '</td>';
      for( var j = 6; j < tab.rows[i].cells.length; j++ )
        html += '<td>' + tab.rows[i].cells[j].innerHTML + '</td>';
      html += "</tr>";
    }
    html += '<tr style="white-space: nowrap;"><th style="text-align:right;" colspan="2">مجموع:</th>';
    for( var r = 0; r < 4; r++ )
      html += '<th style="text-align:right; padding-left: 5px; padding-right: 5px;">' + formatNumber(sum[r], settings.ovKDots.value, true) + '</th>';
    html += '<th style="text-align:right; padding-left: 5px; padding-right: 5px;">' + formatNumber(sum[4], settings.ovKDots.value, true) + '<br/>من ' + formatNumber(sum[5], settings.ovKDots.value, true) + '</th>';
    html += '<th style="text-align:right; padding-left: 5px; padding-right: 5px;">' + formatNumber(sum[6], settings.ovKDots.value, true);
    if( settings.ovBHTotal.value )
      html += '<br/>من  ' + formatNumber(sum[7], settings.ovKDots.value, true) + '</th>';
    if( tab.rows[0].cells.length > 5 )
      html += '<th colspan="' + (tab.rows[0].cells.length - 5) + '">&nbsp;</th>';
    tab.innerHTML = html;
    document.getElementById("dsrt_wood_v").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_stone_v").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_iron_v").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_wood_p").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_stone_p").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_iron_p").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_farm_v").addEventListener("click", sortProd, false);
    document.getElementById("dsrt_farm_p").addEventListener("click", sortProd, false);
  }
  else if( /mode=combined/.test(t.innerHTML) )
  {
    var tab = document.getElementsByClassName("vis");
    if( tab[tab.length-1].rows.length == 1 )
      tab = tab[tab.length-2];
    else
      tab = tab[tab.length-1];
    var lnks = tab.getElementsByTagName("a");
    for( var i = 0; i < lnks.length; i++ )
    {
      var p = parseParams(lnks[i].href);
      if( p.get("screen","") == "market" )
      {
        var res = lnks[i].innerHTML.match(/(\d+\/\d+)/);
        if( res )
        {
          if( p.get("village",0) > 0 )
            GM_setValue(server+"_traders_"+p.village, res[1]);            
        }
      }
    }
  }
}

function sortProd()
{
  var col = 0;
  var type = this.id[this.id.length-1];
  var e = this.parentNode.parentNode.parentNode.parentNode.parentNode;
  for( var i = 0; i < ids.length; i++ )
  {
    document.getElementById("dsrt_"+ids[i]+"_v").parentNode.style.backgroundColor="#DFCCA6";
    document.getElementById("dsrt_"+ids[i]+"_p").parentNode.style.backgroundColor="#DFCCA6";
  }
  this.parentNode.style.backgroundColor = "#F5E5C3";
  while( e.previousSibling )
  {
    e = e.previousSibling;
    col++;
  }
  var tab = e.parentNode.parentNode;
  var rows = [ { html: "", val: 1000000 } ];
  for( var i = 1; i < tab.rows.length - 1; i++ )
  {
    var val = parseInt(tab.rows[i].cells[col].getAttribute(type == "v" ? "dsrt_val" : "dsrt_pro"),10);
    for( var j = 0; j < rows.length; j++ )
    {
      if( val < rows[j].val )
      {
        rows.splice(j, 0, { html: tab.rows[i].innerHTML, val: val } );
        break;
      }
    }
  }
  for( i = 1; i < tab.rows.length - 1; i++ )
  {
    tab.rows[i].innerHTML = rows[i-1].html;
  }
}

function getCurrentVillage()
{
  var container = document.getElementsByTagName("hr")[0];
  if( container )
  {
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
          {
            return res;
          }
        }
      }
    }
  }
}

function showSettings()
{
  var e = document.getElementsByTagName("h3");
  for( var i = 0; i < e.length; e++ )
  {
    if( /الخيارات/.test(e[i].innerHTML) )
    {
      e = e[i].parentNode;
      break;
    }
  }
  var p = e.appendChild(document.createElement("p"));
  e = p.appendChild(document.createElement("form"));
  e.name = settingsPrefix + "settingsFrm";
  e.action = "javascript:;";
  e = e.appendChild(document.createElement("table"));
  e.style.border = "1px solid rgb(222, 211, 185)";
  e.style.width = "100%";
  var row = e.insertRow(e.rows.length);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "<a href='http://www.plapl.com/forum.php'>خيارت السكربات ملون الموارد و المزارع</a>" + version;
  cell.innerHTML = "<p style='margin-top:10px; margin-bottom:0; padding-bottom:0; text-align:center; line-height:0'><a target='_blank' href='http://www.plapl.com/forum.php'><img src='http://feeds.feedburner.com/plapl.2.gif' alt='بلابل' style='border:0' width='468' height='60'></a></p>" ;
  var section = "";
  for( var key in settings )
  {
    row = e.insertRow(e.rows.length);
    if( section != settings[key].section )
    {
      row.appendChild(document.createElement("th")).innerHTML = settingSections[settings[key].section];
      section = settings[key].section
      row = e.insertRow(e.rows.length);
    }
    cell = row.insertCell(0);
    if( settings[key].type == "checkbox" )
      cell.innerHTML = '<input type="checkbox" id="' + settingsPrefix + key + '"' + (settings[key].value?' checked="checked"':'')+'/> ' + settings[key].title;
    else if( settings[key].type == "text" )
      cell.innerHTML = '<input type="text" id="' + settingsPrefix + key + '" value="'+settings[key].value+'" size="'+settings[key].size+'"/> ' + settings[key].title;
  }
  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  var input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = "تطبيق الاعدات";
  input.name = "dssp_save";
  input.addEventListener("click", saveSettings, false);

  e = document.getElementById(settingsPrefix+"redThreshold");
  e.addEventListener("keyup", updateColorBar, false );
  e = e.parentNode;
  e.style.whiteSpace="nowrap";
  var table = e.appendChild(document.createElement("table"));
  //table.setAttribute( "cellpadding", 0 );
  table.setAttribute( "cellspacing", 0 );
  table.style.width="100px";
  table.id = settingsPrefix+"colorBar";
  row = table.insertRow(0);
  row.style.height="20px";
  for( var i = 0; i <= 100; i++ )
  {
    cell = row.insertCell(i);
    cell.style.width = "1%";
    cell.style.backgroundColor = getColor(i);
  }
}

function getColor(percent)
{
  var r = 0;
  var g = 0;
  if( percent <= settings.redThreshold.value )
  {
    r = 255 * percent / settings.redThreshold.value;
    g = 255;
  }
  else
  {
    r = 255;
    g = 255 - 255 * (percent-settings.redThreshold.value) / (100-settings.redThreshold.value);
  }
  return "rgb( " + Math.round(r) + ", " + Math.round(g) + ", 0 )";
}

function formatNumber(nr, dotted, greyspan)
{
  var ret = nr;
  if( nr == 0 )
    ret = "0";
  else if( nr > 999999 )
  {
    var tmp = Math.round(nr / 10000);
    var tmp2 = tmp % 100;
    ret = formatNumber( parseInt(tmp / 100) ) + (greyspan ? '<span class="grey">,</span>' : ',') + (tmp2 < 10?'0':'') + tmp2 + ' مليون.';
  }
  else if( dotted )
  {
    ret = "";
    do
    {
      var tmp = "00" + nr%1000;
      ret = tmp.substr(tmp.length-3,3) + (greyspan ? '<span class="grey">.</span>' : ".") + ret;
      nr = Math.floor(nr/1000);
    } while( nr > 0 );
    ret = ret.replace(/^0*/g,"");
    if( greyspan )
      ret = ret.replace(/\<span class="grey">\.<\/span>$/g,"");
    else
      ret = ret.replace(/\.$/g,"");
  }
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

function tick() 
{
  updateRes("wood");
  updateRes("stone");
  updateRes("iron");
}

function updateRes(name)
{
  var dst = document.getElementById("hpx_" + name);
  var src = document.getElementById(name);
  dst.innerHTML = formatNumber( src.innerHTML, settings.titleKDots, true );
  if( settings.titleResColored.value )
    dst.parentNode.style.backgroundColor = getColor( parseInt(src.innerHTML) * 100 / storage );
}

function loadSettings()
{
  var vals = GM_getValue(server+"_settings");
  if( vals )
  {
    vals = vals.split(",");
    idx = 0;
    for( var key in settings )
      eval( "settings[key].value = "+(idx < vals.length ? vals[idx++] : settings[key].value) + ";");
  }
}

function saveSettings()
{
  var str = "";
  for( var key in settings )
  {
    if( settings[key].type == "checkbox" )
      settings[key].value = document.getElementById(settingsPrefix+key).checked;
    else if( settings[key].type == "text" )
      settings[key].value = document.getElementById(settingsPrefix+key).value;
    if( str.length > 0 )
      str += ",";
    str += settings[key].value;
  }
  GM_setValue(server+"_settings",str);
}

function updateColorBar()
{
  var tab = document.getElementById(settingsPrefix+"colorBar");
  var tmp = settings.redThreshold.value;
  settings.redThreshold.value = parseInt(document.getElementById(settingsPrefix+"redThreshold").value,10);
  for( var i = 0; i <= 100; i++ )
    tab.rows[0].cells[i].style.backgroundColor = getColor(i);
  settings.redThreshold.value = tmp;
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
