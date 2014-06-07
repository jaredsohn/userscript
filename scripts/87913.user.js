// ==UserScript==
// @name DS Report-Reorder
// @description Version 1.0.6 VerÃ¤ndert die Reihenfolge der BerichtsblÃ¶cke
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*screen=report*view=*
// @include http://de*.die-staemme.de/public_report/*
// ==/UserScript==

(function(){
var server = location.host.split(".")[0];
var groups = { 
  attack_luck:          { title: "GlÃ¼ck",               hasTitle: true,  hasSpacer: false },
  attack_moral:         { title: "Moral",               hasTitle: false, hasSpacer: false },
  attack_info_att:      { title: "Angreifer-Truppen",   hasTitle: false, hasSpacer: true  },
  attack_info_def:      { title: "Verteidiger-Truppen", hasTitle: false, hasSpacer: true  },
  attack_spy:           { title: "Spionage",            hasTitle: true,  hasSpacer: true  },
  attack_away_units:    { title: "Einheiten auswÃ¤rts",  hasTitle: true, hasSpacer: false },
  attack_running_units: { title: "Einheiten unterwegs", hasTitle: true, hasSpacer: false },
  attack_results:       { title: "Ergebnisse",          hasTitle: false, hasSpacer: true  },
};

loadSettings();
reorderReport();

function reorderReport()
{
  var td = document.getElementById("dsrm_report_content");
  if( !td )
  {
    td = document.getElementById("attack_luck").parentNode;
    td.id = "dsrm_report_content";
  }
  var h3 = td.getElementsByTagName("h3");
  el = td.firstChild;
  if( el.nodeName == "TABLE" )
    el = el.rows[0].cells[0].firstChild;
  var html = '<table style="width:100%"><tr><td style="width:100%">'+outerHTML( el );
  while( el != h3[h3.length-1] )
  {
    html += outerHTML(el = el.nextSibling);
  }
  html += '</td><td style="text-align:right; vertical-align:top;"><a href="#" onclick="document.getElementById(\'dsrm_settings\').style.display=\'block\';return false;">Reihenfolge</a>';
  html += '<div id="dsrm_settings" style="position:absolute; width: 200px; height: 100px; display:none;">';
  html += '<table class="main" id="dsrm_tab" style="text-align:left; border: 2px solid #804000;">';
  for( var i = 0; i < order.length; i++ )
  {
    html += '<tr><td/><td><span name="'+order[i]+'">'+groups[order[i]].title+"</span></td></tr>";
  }
  html += '<tr><td colspan="2"><input type="button" value="Ok"/ id="dsrm_ok"></td></tr></table></div></td></tr></table>';

  for( var i = 0; i < order.length; i++ )
  {
    var el = document.getElementById(order[i]);
    if( el )
    {
      if( groups[order[i]].hasTitle )
      {
        title = el;
        while( (title = title.previousSibling).nodeName == "#text" );
        html += outerHTML(title);
      }
      html += outerHTML(el);
      if( groups[order[i]].hasSpacer )
        html += "<br/>";
    }
  }
  
  var el = document.getElementById("dsrm_links");
  if( el )
    html += outerHTML(el);
  else
  {
    html += '<div id="dsrm_links">';
    el = document.getElementById("attack_results");
    while( el = el.nextSibling )
    {
      if( el.nodeName != "#text" )
        html += outerHTML(el);
    }
    html += "</div>";
  }
  td.innerHTML = html;
  document.getElementById("dsrm_ok").addEventListener("click", submit, false);
  createReorderLinks();
}

function createReorderLinks()
{
  var tab = document.getElementById("dsrm_tab");
  for( var i = 0; i < tab.rows.length-1; i++ )
  {
    tab.rows[i].cells[0].style.whiteSpace="nowrap";
    if( i > 0 )
    {
      var a = tab.rows[i].cells[0].appendChild(document.createElement("a"));
      a.href = "javascript:;";
      a.addEventListener("click", moveUp, false);
      var img = a.appendChild(document.createElement("img"));
      img.src = "graphic/map/map_n.png";
    }
    if( i < tab.rows.length-2 )
    {
      var a = tab.rows[i].cells[0].appendChild(document.createElement("a"));
      a.href = "javascript:;";
      a.addEventListener("click", moveDown, false);
      var img = a.appendChild(document.createElement("img"));
      img.src = "graphic/map/map_s.png";
    }
  }
}

function moveUp()
{
  var toMove = this.parentNode.parentNode.cells[1];
  var other = this.parentNode.parentNode.previousSibling.cells[1];
  var tmp = toMove.innerHTML;
  toMove.innerHTML = other.innerHTML;
  other.innerHTML = tmp;
}

function moveDown()
{
  var toMove = this.parentNode.parentNode.cells[1];
  var other = this.parentNode.parentNode.nextSibling.cells[1];
  var tmp = toMove.innerHTML;
  toMove.innerHTML = other.innerHTML;
  other.innerHTML = tmp;
}

function submit()
{
  document.getElementById("dsrm_settings").style.display="none";
  var tab = document.getElementById("dsrm_tab");
  order = "";
  for( var i = 0; i < tab.rows.length-1; i++ )
  {
    if( i > 0 )
      order += ",";
    order += tab.rows[i].cells[1].firstChild.getAttribute("name");
  }
  order = order.split(",");
  saveSettings();
  reorderReport();
}

function outerHTML(el)
{
  if( el.nodeType == 3 )
    return el.nodeValue;
  var html = "<" + el.nodeName;
  for( var i = 0; i < el.attributes.length; i++ )
    html += " " + el.attributes[i].name + '="' + el.attributes[i].value + '"';
  html += ">" + el.innerHTML + "</" + el.nodeName +">";
  return html;
}

function saveSettings()
{
  var value = order.join(",");
  var gm = typeof(unsafeWindow) != "undefined";
  var win = gm ? unsafeWindow : window;
  var ls = false;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( gm )
    GM_setValue(server + "_settings", value);
  else if( ls )
    win.localStorage.setItem("hpxdsrm_settings",value);
  else
    document.cookie = 'hpxdsrm_settings=' + value + '; expires=' + (new Date(2036, 1, 1)).toGMTString() + ';';
}

function loadSettings()
{
  var defValue = [];
  for( var key in groups )
    defValue.push(key);
  var value;
  var gm = typeof(unsafeWindow) != "undefined";
  var win = gm ? unsafeWindow : window;
  var ls = false;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( gm )
    value = GM_getValue(server+"_settings", "");
  else if( ls ) {
    value = win.localStorage.getItem("hpxdsrm_settings");
    if( value === null )
      value = "";
  }
  else
  {
    var res = document.cookie.match(/hpxdsrm_settings=([^;]+);/);
    if( res )
      value = res[1];
    else
      value = defValue;
  }
  order = value.split(",");
  if( order.length < defValue.length )
    order = defValue;
}

})();
