// ==UserScript==
// @name           Ikariam Shortcuts Arabic
// @namespace      http://yazmat.0fees.net/
// @include        http://*.ikariam.com/*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==


/*
	This is an adaptation of the RavenSquadTools for arabic servers.
*/


//================= GLOBAL VARIABLES =======================//


//find the current town coords
var current_town_id = "";
var current_town_name = "";
var current_mine_name = "منجم موارد"; //default name

var options_parent = document.getElementById("citySelect");
if(options_parent != null) {
var options = options_parent.getElementsByTagName("option");
var player_towns = new Array();
 for(var i=0; i<options.length; i++) {
    var opt = options[i];
    var town = new Object();
    var townname = opt.innerHTML;
    if(opt.className.indexOf("deployedCities") >= 0) town.status = "deployed";
    else if(opt.className.indexOf("occupiedCities") >= 0) town.status = "occupied";
    else town.status = "normal";
    town.id = opt.value;
    var title = opt.title;
    town.current = opt.selected;
    town.tradegood = "";
    town.coords = "";
    if(opt.className.indexOf("coords") >= 0) {
      var extracted = extractCoords(townname,"[","]",":");
      town.name = extracted[0];
      town.x = extracted[1];
      town.y = extracted[2];
      town.tradegood = opt.title;
      if(town.current) current_mine_name = town.tradegood;
      if(town.x != -1) town.coords = "["+town.x+":"+town.y+"]";
    }
    else if (opt.className.indexOf("tradegood") >= 0) { //tradegoods -- coords in title
      townname += title;
      var extracted = extractCoords(townname,"[","]",":");
      town.name = extracted[0];
      town.x = extracted[1];
      town.y = extracted[2];
      town.tradegood = opt.className;
      if(town.current) current_mine_name = town.tradegood;
      if(town.x != -1) town.coords = "["+town.x+":"+town.y+"]";
    }
   else { //no coords, no tradegood
      town.name = townname;
      town.x = -1;
      town.y = -1;
   }
   if(town.current) {
    current_town_name = town.name;
    current_town_id = town.id;
   }
   player_towns.push(town);
 }
}

//find the type of page we're watching (using the body id, but we could also use the page's URL)
var page_type = "";
var bodies = document.getElementsByTagName("body");
if(bodies.length > 0) {
  var body = bodies[0];
  page_type = body.id;
}

//convert current mine name, if available
if(current_mine_name.indexOf("Marble") >= 0) current_mine_name = "منجم الرخام";
if(current_mine_name.indexOf("Crystal") >= 0) current_mine_name = "منجم البلور";
if(current_mine_name.indexOf("Sulfur") >= 0) current_mine_name = "رواسب الكبريت";
if(current_mine_name.indexOf("Wine") >= 0) current_mine_name = "حقول العنب";
if(current_mine_name.indexOf("tradegood2") >= 0) current_mine_name = "منجم الرخام";
if(current_mine_name.indexOf("tradegood3") >= 0) current_mine_name = "منجم البلور";
if(current_mine_name.indexOf("tradegood4") >= 0) current_mine_name = "رواسب الكبريت";
if(current_mine_name.indexOf("tradegood1") >= 0) current_mine_name = "حقول العنب";

var current_island_id = "";
var current_island_name = "";
var current_island_coords = "";
options = document.getElementsByTagName("a");
for(var i=0; i<options.length; i++) {
  var coords = options[i];
  if(coords.className == "island") {
    island_name = options[i].innerHTML;
    var extracted = extractCoords(island_name,"[","]",":");
    island_name = extracted[0];
    if(extracted[1] != -1) island_coords = "["+extracted[1]+":"+extracted[2]+"]";
    island_id = getURLParam(options[i].href,"id");
    break;
  }
}//for i

//================= COMMON FUNCTIONS =======================//

function extractCoords(coords,lchar,rchar,sep) {
    var empty = new Array("",-1,-1);
    if(coords == null) return empty;
    var pos = coords.lastIndexOf(lchar);
    if(pos < 0) return new Array(coords,-1,-1);
    var name = coords.substring(0,pos);
    coords = coords.substring(pos+1);
    pos = coords.indexOf(rchar);
    if(pos < 0) return new Array(name,-1,-1);
    name += coords.substring (pos+1);
    coords = coords.substring(0,pos);
    //now let's split at the comma
    pos = coords.indexOf(sep);
    if(pos < 0) return new Array(name,-1,-1);
    var x = coords.substring(0,pos);
    var y = coords.substring(pos+1);
    return new Array(name,x,y);
}

function getURLParam(theurl,param) {
    //find param and chop
    var pos = theurl.indexOf("&"+param+"=");
    if(pos < 0) pos = theurl.indexOf("?"+param+"=");
    if(pos < 0) return "";
    theurl = theurl.substring(pos+param.length+2);
    //find end of value and chop
    pos = theurl.indexOf("&");
    if(pos < 0) return theurl;
    return theurl.substring(0,pos);
}

function box_left(title,content) {
  var boxhead = "<h3 class=\"header\">"+title+"</h3>";
  var boxbody_1 = "<div class=\"content\">";
  var boxbody_2 = "</div>";
  var boxfoot = "<div class=\"footer\"></div>";
  var boxcontent = boxhead + boxbody_1 + content + boxbody_2 + boxfoot;
  //node
  var newnode = document.createElement("div");
  newnode.setAttribute("class","dynamic");
  newnode.innerHTML = boxcontent;
  return newnode;
}

function box_bottom(title,content) {
  var boxhead_css = "background-image:url('skin/layout/bg_sidebox_header.jpg');height:26px;vertical-align:middle";
  var boxhead2_css = "padding-top:8px";
  var boxhead = "<div style=\""+boxhead_css+"\"><div style=\""+boxhead2_css+"\">"+title+"</div></div>";
  var boxbody_1 = "<div>";
  var boxbody_2 = "</div>";
  var boxfoot_css = "background-image:url('skin/layout/bg_sidebox_footer.gif');background-position:top;height:5px;padding:0;margin:0";
  var boxfoot = "<div style=\""+boxfoot_css+"\"></div>";
  var boxcontent = boxhead + boxbody_1 + content + boxbody_2 + boxfoot;
  //node
  var newnode = document.createElement("div");
  newnode.style.width = "228px";
  newnode.style.color = "#542c0f";
  newnode.style.textAlign = "center";
  newnode.style.marginTop = "5px";
  newnode.style.backgroundImage = "url('skin/layout/bg_sidebox.gif')";
  newnode.style.backgroundRepeat = "repeat-y";
  newnode.style.position = "relative";
  newnode.style.right = "-90px";
  newnode.style.top = "bottom";
  newnode.innerHTML = boxcontent;
  return newnode;
}

function box_flow(title,content) {
  var boxhead_css = "text-align:center;background-image:url('skin/layout/bg_contentBox01h_header.gif');height:30px;vertical-align:middle;padding-left:12px";
  var boxhead2_css = "padding-top:10px;font-weight:bold";
  var boxhead = "<div style=\""+boxhead_css+"\"><div style=\""+boxhead2_css+"\">"+title+"</div></div>";
  var boxbody_1 = "<div>";
  var boxbody_2 = "</div>";
  var boxfoot_css = "background-image:url('skin/layout/bg_contentBox01_footer.gif');height:3px;margin-bottom:8px";
  var boxfoot = "<div style=\""+boxfoot_css+"\"></div>";
  var boxcontent = boxhead + boxbody_1 + content + boxbody_2 + boxfoot;
  //node
  var newnode = document.createElement("div");
  newnode.style.backgroundImage = "url('skin/layout/bg_contentBox01.gif')";
  newnode.style.backgroundRepeat = "repeat-y";
  newnode.style.width = "680px";
  newnode.style.color = "#542c0f";
  newnode.style.textAlign = "left";
  newnode.innerHTML = boxcontent;
  return newnode;
}

//================= TRANSFER TROOPS SHORTCUTS =======================//

var occupied_style = "color:#542c0f;background-color:#F4BDA3;padding:2px;padding-right:4px";
var deployed_style = "color:#542c0f;background-color:#BDF4A3;padding:2px;padding-right:4px";
var normal_style = "color:#542c0f;padding:2px;padding-right:4px";
var special_style = "";

var insertpoint = null;
//var infobox = document.getElementById("viewMilitaryImperium");
var infobox = document.getElementById("fleetMovements");
if(infobox == null) {
  infobox = document.getElementById("buildingUpgrade");
  if((page_type != "shipyard") && (page_type != "barracks")) infobox = null; //cancel
}
if(infobox != null) insertpoint = infobox.parentNode;

if((insertpoint != null) && (page_type != "shipyard")) {

  var content = "<ul>";
  for(var i=0; i<player_towns.length; i++) {
    var town = player_towns[i];
    if(town.current) continue;
    if(town.status == "normal") special_style = normal_style;
    else if(town.status == "occupied") special_style = occupied_style;
    else if(town.status == "deployed") special_style = deployed_style;
    content += "<li style=\"margin:6px;text-align:right;\">";
    content += "<img style=\"display:inline-block\" valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/rarrow.gif\">";
    content += " <a style=\""+special_style+"\" href=\"index.php?view=deployment&deploymentType=army&destinationCityId="+town.id+"\">"+town.coords+" "+town.name+"</a>";
    content += "</li>";
  }
  content += "</ul>";
  
  if(page_type == "militaryAdvisorMilitaryMovements") {
    var mynode = box_flow("إرسال القوات إلى ... ",content);
    insertpoint.appendChild(mynode);
  }
  else {
    var mynode = box_left("إرسال القوات إلى ... ",content);
    insertpoint.insertBefore(mynode,infobox);
  }
}


//================= TRANSFER SHIPS SHORTCUTS =======================//

if((insertpoint != null) && (page_type != "barracks")) {

  var content = "<ul>";
  for(var i=0; i<player_towns.length; i++) {
    var town = player_towns[i];
    if(town.current) continue;
    if(town.status == "normal") special_style = normal_style;
    else if(town.status == "occupied") special_style = occupied_style;
    else if(town.status == "deployed") special_style = deployed_style;    
    content += "<li style=\"margin:6px;text-align:right;\">";
    content += "<img  style=\"display:inline-block\" valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/rarrow.gif\">";
    content += " <a style=\""+special_style+"\" href=\"index.php?view=deployment&deploymentType=fleet&destinationCityId="+town.id+"\">"+town.coords+" "+town.name+"</a>";
    content += "</li>";
  }
  content += "</ul>";
  
  if(page_type == "militaryAdvisorMilitaryMovements") {
    var mynode = box_flow("إرسال السفن إلى ... ",content);
    insertpoint.appendChild(mynode);
  }
  else {  
    var mynode = box_left("إرسال السفن إلى ... ",content);
    insertpoint.insertBefore(mynode,infobox);
  }
}


//================= RESEARCH SHORTCUT =======================//
/*
insertpoint = null;
infobox = document.getElementById("viewResearchImperium");
if(infobox != null) insertpoint = infobox.parentNode;

if(insertpoint != null) {
  var url = "<div class=\"centerButton\"><a class=\"button\" href=\"index.php?view=changeResearch&id="+current_town_id+"&position=0\">Change!</a></div>";
  var mybox = box_left("Research",url);
  insertpoint.insertBefore(mybox,infobox);
}*/

//================= EMBASSY/TOWN HALL/MINE/MILL SHORTCUTS =======================//

//embassy shortcut (for any town view and any advisor view)
insertpoint = null;
infobox = document.getElementById("information");
if(infobox == null) infobox = document.getElementById("viewCityImperium");
if(infobox == null) infobox = document.getElementById("viewResearchImperium");
if(infobox == null) infobox = document.getElementById("viewMilitaryImperium");
if(infobox == null) infobox = document.getElementById("viewDiplomacyImperium");
if(infobox == null) infobox = document.getElementById("buildingUpgrade");
if(infobox == null) infobox = document.getElementById("information");
if(infobox == null) infobox = document.getElementById("resUpgrade");
if(infobox != null) insertpoint = infobox.parentNode;

if(page_type == "island") {
  insertpoint = document.getElementById("footer");
  var title = "إلى "+current_town_name+"...";
  var content = "";
  var url_css = "margin-bottom:12px";
  var a_style = "color:#542c0f";

  var url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=embassy&id="+current_town_id+"&position=0\">إلى السفارة</a></div>";
  content += url;

  url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=townHall&id="+current_town_id+"&position=0\">إلى دار البلدية</a></div>";
  content += url;
  
  var mynode = box_bottom(title,content);
  insertpoint.appendChild(mynode);
}
else if(insertpoint != null) {
  var title = "المدينة "+current_town_name+" ... ";
  if((page_type == "worldmap_iso") || (page_type == "resource") || (page_type == "tradegood")) title = "إلى "+current_town_name+"...";
  var content = "";
  var url_css = "margin-bottom:12px";
  var a_style = "color:#542c0f";

  var url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=embassy&id="+current_town_id+"&position=0\">إلى السفارة</a></div>";
  content += url;

  url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=townHall&id="+current_town_id+"&position=0\">إلى دار البلدية</a></div>";
  content += url;
  
  var mynode = box_left(title,content);
  insertpoint.insertBefore(mynode,infobox);
  
  //display island shortcuts only when we have access to the data
  if(page_type == "city") {
  
    insertpoint = document.getElementById("footer");
    title = "إلى الجزيرة "+island_name+"...";
    content = "";
    
    url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=resource&type=resource&id="+island_id+"\">إلى المنشرة</a></div>";
    content += url;
    
    url = "<div class=\"centerButton\" style=\""+url_css+"\"><a class=\"button\" style=\""+a_style+"\" href=\"index.php?view=tradegood&type=tradegood&id="+island_id+"\">إلى "+current_mine_name+"</a></div>";
    content += url;


    mynode = box_bottom(title,content);
    insertpoint.appendChild(mynode);
  }
}

