// ==UserScript==
// @name           BvS - Zombja Ping Map Deluxe
// @namespace      Thosha
// @description    This script cleans up the zombja ping map and gives various filter options
// @include        http://www.animecubed.com/billy/bvs/zombjasonar.html
// @include        http://animecubed.com/billy/bvs/zombjasonar.html
// @include        http://www.animecubed.com/billy/bvs/village.html
// @include        http://animecubed.com/billy/bvs/village.html
// @version	   0.2
// @history        0.2 Added more colour options, a map legend and village name
// @history        0.1 Initial Release
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2010, Thosha
// ==/UserScript==

// Function to add additonal styles
function addStyle(css){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}

// Function to add additional scripts
function addScript(javascript){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = javascript;
    head.appendChild(script);
}

function ScanVillageName(){
  var node = document.evaluate('//tr/td/font/b[contains(text(),"Village")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  node_item = node.snapshotItem(0).innerHTML;
  if(node_item == "-Village Announcement -") node_item = node.snapshotItem(1).innerHTML;
  localStorage.setItem('zombja_map_current_village',node_item);
}

/////////////////////////////////////////////////////////
// This function runs on the zombja ping map
function ScanPage(){

/////////////////////////////////////////////////////////
// Insert styles-stylesheet
addStyle([
    ".controlsbox { color: white; width: 705px; background-color: #554455;}",
    ".controlsline1 { background-color: #005500; border: 3px solid #005500;}",
    ".controlsline2 { background-color: #006600; border: 3px solid #006600;}",
    "#ping1, #ping2, #ping3, #ping4 { background-color: #EEEEEE; color: black; width: 60px; border: 1px solid #DDDDDD;}",
    "#colour1, #colour2, #colour3, #colour4 { background-color: #EEEEEE; color: black; width: 120px; border: 1px solid #DDDDDD;}",
    "#village_name { font-size: 25; border: 1 solid black;}",
    ".map_legend_class { color: white;}"
    ].join("\n"));

/////////////////////////////////////////////////////////
// Insert script that are run AFTER pageload
addScript([
"var map_legend_oldmode = '<SPAN style=\"background-color:#F89933; color:black;\">&nbsp;Village&nbsp;</SPAN> <SPAN style=\"background-color:#76FB52; color: black;\">&nbsp;Collection Plains&nbsp;</SPAN> <SPAN style=\"background-color:#08552C; color:white;\">&nbsp;Forest&nbsp;</SPAN> <SPAN style=\"background-color:#822509; color:white;\">&nbsp;Mountains&nbsp;</SPAN> <SPAN style=\"background-color:#330000; color:red;\">&nbsp;Wasteland&nbsp;</SPAN> <SPAN style=\"background-color:#333300; color:red;\">&nbsp;Rifts&nbsp;</SPAN><BR><SPAN style=\"background-color:#CCFFCC; color:black;\">&nbsp;Gas Station/SCIENCE&nbsp;</SPAN> <SPAN style=\"background-color:#000033; color:white;\">&nbsp;Arms Depot/Gate&nbsp;</SPAN> <SPAN style=\"background-color:#006699; color:white;\">&nbsp;Ramen Shop&nbsp;</SPAN>';",
"var map_legend_zombjamode = '<SPAN style=\"background-color:#08552C; color:white;\">&nbsp;Clear&nbsp;</SPAN> <SPAN style=\"background-color:#822509; color:white;\">&nbsp;Only Zs&nbsp;</SPAN> <SPAN style=\"background-color:#330000; color:red;\">&nbsp;Zetta&nbsp;</SPAN>';",
"var map_legend_ninjamode = '<SPAN style=\"background-color:#08552C; color:white;\">&nbsp;Ninja&nbsp;</SPAN> <SPAN style=\"background-color:#822509; color:white;\">&nbsp;No-Ninja&nbsp;</SPAN>';",
"var map_legend_cleaningmode = '<SPAN style=\"background-color:#08552C; color:white;\">&nbsp;Clear&nbsp;</SPAN> <SPAN style=\"background-color:#822509; color:white;\">&nbsp;6 or less Zs&nbsp;</SPAN> <SPAN style=\"background-color:#330000; color:red;\">&nbsp;More&nbsp;</SPAN>';",
"function enable_button(id) { document.getElementById(id).style.backgroundColor='#0080FF'; document.getElementById(id).style.color='white'; document.getElementById(id).style.border='1px solid #0080FF';}",
"function disable_button(id) { document.getElementById(id).style.backgroundColor='#EEEEEE'; document.getElementById(id).style.color='black'; document.getElementById(id).style.border='1px solid #DDDDDD';}",
"function getFontColor(color){",
"    var testColor;",
"    if(color[0] == '#') testColor = color.slice(1);",
"    else testColor = color;",
"    switch(testColor.toUpperCase()){",
"      case '554455': return '#554455'; break;",
"      case '333300': case '330000': return 'red'; break;",
"      case '822509': case '08552C': case '006699': case '000033': return 'white'; break;",
"      case '76FB52': case 'F89933': case 'FFCCCC': case 'CCFFCC': return 'black'; break;",
"    }",
"}",
"function hidetime(displayvalue){",
"    var node = document.evaluate('//span[@class=\"time\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++) node.snapshotItem(i).style.display = displayvalue;",
"}",
"function hidezombja(displayvalue){",
"    var node = document.evaluate('//span[@class=\"zombja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++) node.snapshotItem(i).style.display = displayvalue;",
"}",
"function hideninja(displayvalue){",
"    var node = document.evaluate('//span[@class=\"ninja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++) node.snapshotItem(i).style.display = displayvalue;",
"}",
"function zombjamode(){",
"    var node = document.evaluate('//span[@class=\"zombja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content == '<br>' || node_content == '') { node.snapshotItem(i).parentNode.style.backgroundColor='#08552C'; node.snapshotItem(i).parentNode.style.color='white';}",
"      else if(node_content == 'Out of Range') { node.snapshotItem(i).parentNode.style.backgroundColor='#554455'; node.snapshotItem(i).parentNode.style.color='#554455';}",
"      else if(node_content.search(/Zetta/) != -1) { node.snapshotItem(i).parentNode.style.backgroundColor='#330000'; node.snapshotItem(i).parentNode.style.color='red';}",
"      else { node.snapshotItem(i).parentNode.style.backgroundColor='#822509'; node.snapshotItem(i).parentNode.style.color='white';}",
"    }",
"    document.getElementById('map_legend').innerHTML=map_legend_zombjamode;",
"    disable_button('colour1');enable_button('colour2');disable_button('colour3');disable_button('colour4');",
"}",
"function ninjamode(){",
"    var node = document.evaluate('//span[@class=\"ninja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content.search(/Ninja/) != -1) { node.snapshotItem(i).parentNode.style.backgroundColor='#08552C'; node.snapshotItem(i).parentNode.style.color='white';}",
"      else if(node.snapshotItem(i).previousSibling.innerHTML == 'Out of Range') { node.snapshotItem(i).parentNode.style.backgroundColor='#554455'; node.snapshotItem(i).parentNode.style.color='#554455';}",
"      else { node.snapshotItem(i).parentNode.style.backgroundColor='#822509'; node.snapshotItem(i).parentNode.style.color='white';}",
"    }",
"    document.getElementById('map_legend').innerHTML=map_legend_ninjamode;",
"    disable_button('colour1');disable_button('colour2');enable_button('colour3');disable_button('colour4');",
"}",
"function cleaningmode(){",
"    var node = document.evaluate('//span[@class=\"zombja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content == '<br>' || node_content == '') { node.snapshotItem(i).parentNode.style.backgroundColor='#08552C'; node.snapshotItem(i).parentNode.style.color='white';}",
"      else if(node_content == 'Out of Range') { node.snapshotItem(i).parentNode.style.backgroundColor='#554455'; node.snapshotItem(i).parentNode.style.color='#554455';}",
"      else if(node_content.search(/<br>\\nZs: 1\\n/) != -1 || node_content.search(/<br>\\nZs: 2\\n/) != -1 || node_content.search(/<br>\\nZs: 3\\n/) != -1 || node_content.search(/<br>\\nZs: 4\\n/) != -1 || node_content.search(/<br>\\nZs: 5\\n/) != -1 || node_content.search(/<br>\\nZs: 6\\n/) != -1) { node.snapshotItem(i).parentNode.style.backgroundColor='#822509'; node.snapshotItem(i).parentNode.style.color='white';}",
"      else { node.snapshotItem(i).parentNode.style.backgroundColor='#330000'; node.snapshotItem(i).parentNode.style.color='red';}",
"    }",
"    document.getElementById('map_legend').innerHTML=map_legend_cleaningmode;",
"    disable_button('colour1');disable_button('colour2');disable_button('colour3');enable_button('colour4');",
"}",
"function oldmode(){",
"    var node = document.evaluate('//span[@class=\"zombja\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node.snapshotItem(i).parentNode.style.backgroundColor=node.snapshotItem(i).parentNode.bgColor;",
"      node.snapshotItem(i).parentNode.style.color=getFontColor(node.snapshotItem(i).parentNode.bgColor);",
"    }",
"    document.getElementById('map_legend').innerHTML=map_legend_oldmode;",
"    enable_button('colour1');disable_button('colour2');disable_button('colour3');disable_button('colour4');",
"}",
"function showall(){",
"    var node = document.evaluate('//span[@class=\"time\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node.snapshotItem(i).parentNode.style.visibility='visible';",
"    }",
"    enable_button('ping1');disable_button('ping2');disable_button('ping3');disable_button('ping4');",
"}",
"function showzero(){",
"    var node = document.evaluate('//span[@class=\"time\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content != '0H') { node.snapshotItem(i).parentNode.style.visibility='hidden';}",
"      else { node.snapshotItem(i).parentNode.style.visibility='visible';}",
"    }",
"    disable_button('ping1');enable_button('ping2');disable_button('ping3');disable_button('ping4');",
"}",
"function showfour(){",
"    var node = document.evaluate('//span[@class=\"time\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content != '0H' && node_content != '1H' && node_content != '2H' && node_content != '3H' && node_content != '4H') { node.snapshotItem(i).parentNode.style.visibility='hidden';}",
"      else { node.snapshotItem(i).parentNode.style.visibility='visible';}",
"    }",
"    disable_button('ping1');disable_button('ping2');enable_button('ping3');disable_button('ping4');",
"}",
"function showeight(){",
"    var node = document.evaluate('//span[@class=\"time\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);",
"    for (var i = 0; i < node.snapshotLength; i++){",
"      node_content = node.snapshotItem(i).innerHTML;",
"      if (node_content != '0H' && node_content != '1H' && node_content != '2H' && node_content != '3H' && node_content != '4H' && node_content != '5H' && node_content != '6H' && node_content != '7H' && node_content != '8H') { node.snapshotItem(i).parentNode.style.visibility='hidden';}",
"      else { node.snapshotItem(i).parentNode.style.visibility='visible';}",
"    }",
"    disable_button('ping1');disable_button('ping2');disable_button('ping3');enable_button('ping4');",
"}"
].join("\n"));

  /////////////////////////////////////////////////////
  // Insert userbox at top page
  var info_box = document.evaluate("//center/font[contains(text(),'You may look at this no more than twenty times per day.')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var info_box = info_box.snapshotItem(0);
  controls_element = document.createElement('DIV');
  controls_element.className = 'controlsbox';
  controls_element.innerHTML = '<DIV id="village_name">'+localStorage.getItem('zombja_map_current_village')+'</DIV><DIV class="controlsline1">Show Pingdata: <BUTTON id="ping1" onclick="showall(\'\');">All </BUTTON><BUTTON id="ping2" onclick="showzero(\'\');"> 0H</BUTTON><BUTTON id="ping3" onclick="showfour(\'\');"> 0-4H</BUTTON><BUTTON id="ping4" onclick="showeight(\'\');"> 0-8H</BUTTON></DIV><DIV class="controlsline2">Colours: <BUTTON id="colour1" onclick="oldmode();"> Old Map </BUTTON><BUTTON id="colour2" onclick="zombjamode();"> Zombja Mode </BUTTON><BUTTON id="colour3" onclick="ninjamode();"> Ninja Mode </BUTTON><BUTTON id="colour4" onclick="cleaningmode();"> Cleaning Mode </BUTTON></DIV>Time: <INPUT type="radio" name="time" onclick="hidetime(\'none\');"/> Hide <INPUT type="radio" name="time" onclick="hidetime(\'\');" CHECKED/> Show | Zombjas: <INPUT type="radio" name="zombja" onclick="hidezombja(\'none\');"/> Hide <INPUT type="radio" name="zombja" onclick="hidezombja(\'\');" CHECKED/> Show | Ninjas: <INPUT type="radio" name="ninja" onclick="hideninja(\'none\');"/> Hide <INPUT type="radio" name="ninja" onclick="hideninja(\'\');" CHECKED/> Show';
  info_box.parentNode.insertBefore(controls_element,info_box);
  document.getElementById('ping1').style.backgroundColor='#0080FF'; document.getElementById('ping1').style.color='white'; document.getElementById('ping1').style.border='1px solid #0080FF';
  document.getElementById('colour1').style.backgroundColor='#0080FF'; document.getElementById('colour1').style.color='white'; document.getElementById('colour1').style.border='1px solid #0080FF';

  map_legend = document.createElement('DIV');
  map_legend.className = 'map_legend_class';
  map_legend.innerHTML = 'Legend: <DIV id="map_legend"><SPAN style=\"background-color:#F89933; color:black;\">&nbsp;Village&nbsp;</SPAN> <SPAN style=\"background-color:#76FB52; color: black;\">&nbsp;Collection Plains&nbsp;</SPAN> <SPAN style=\"background-color:#08552C; color:white;\">&nbsp;Forest&nbsp;</SPAN> <SPAN style=\"background-color:#822509; color:white;\">&nbsp;Mountains&nbsp;</SPAN> <SPAN style=\"background-color:#330000; color:red;\">&nbsp;Wasteland&nbsp;</SPAN> <SPAN style=\"background-color:#333300; color:red;\">&nbsp;Rifts&nbsp;</SPAN><BR><SPAN style=\"background-color:#CCFFCC; color:black;\">&nbsp;Gas Station/SCIENCE&nbsp;</SPAN> <SPAN style=\"background-color:#000033; color:white;\">&nbsp;Arms Depot/Gate&nbsp;</SPAN> <SPAN style=\"background-color:#006699; color:white;\">&nbsp;Ramen Shop&nbsp;</SPAN></DIV>';
  info_box.parentNode.insertBefore(map_legend,info_box.nextSibling);

  var table_items = document.evaluate("//td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < table_items.snapshotLength; i++)
  {
    node = table_items.snapshotItem(i);
    node_content = node.innerHTML;

    ////////////////////////////////////////////////////
    // Remove the Zs: 0
    if(/Zs: 0/.test(node_content)) {
      no_z_begin = node_content.search(/Zs: 0/);
      if(node_content.search(/Zetta/) || node_content.search(/Ninjas/)) { no_z_end = no_z_begin+10;}
      else { no_z_end = no_z_begin+5;}
      node.innerHTML = node_content.slice(0,no_z_begin)+node_content.slice(no_z_end);
    }
    node_content = node.innerHTML;

    /////////////////////////////////////////////////////
    // Slice up the innerhtml into blocks
    coord_begin = node_content.search(/\[/);
    coord_end = node_content.search(/\]/)+1;
    coord_stamp = node_content.slice(coord_begin,coord_end);
    time_end = node_content.search(/H/)+1;
    time_stamp = node_content.slice(coord_end+1,time_end);
    if(node_content.search(/span/) != -1) { ninja_begin = node_content.search(/span/)-7;}
    else { ninja_begin = node_content.length-1;}
    zombja_stamp = node_content.slice(time_end+1,ninja_begin);
    if(zombja_stamp == 'Out of Range') node.style.color='#554455';

    coord_element = document.createElement('SPAN');
    coord_element.className = 'coord';
    coord_element.innerHTML = coord_stamp;

    time_element = document.createElement('SPAN');
    time_element.className = 'time';
    time_element.innerHTML = time_stamp;

    zombja_element = document.createElement('SPAN');
    zombja_element.className = 'zombja';
    zombja_element.innerHTML = zombja_stamp;

    ninja_element = document.createElement('SPAN');
    ninja_element.className = 'ninja';
    ninja_element.innerHTML = node_content.slice(ninja_begin);

    //////////////////////////////////////////////////////
    // Turn the clumsy HTML into XML compatible code
    node.innerHTML = '';
    node.appendChild(coord_element);
    node.appendChild(time_element);
    node.appendChild(zombja_element);
    node.appendChild(ninja_element);
  }
}

if (location.pathname == '/billy/bvs/village.html') { ScanVillageName();}
else { ScanPage();}