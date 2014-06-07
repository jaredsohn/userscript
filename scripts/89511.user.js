// ==UserScript==
// @name           Arabic RavenSquadTools for Ikariam (neighbors shortcuts)
// @namespace      http://www.verlamer.ca/
// @author         Yazmat
// @license        GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    Shows your closest neighbors in your Embassy ( To use only in arabic servers )
// @include        http://*.ae.ikariam.com/*
// @exclude        http://board.ae.ikariam.com/*
// @version        1.0
// ==/UserScript==

/*
	This is an Arabic Traduction by YAZMAT of the RavenSquadTools (neighbors shortcuts)
	Thsi was addapted to be used in the arabic servers of ikariam
	The original script can be downloaded from : http://www.verlamer.ca/ikariam/scripts/rst_neighbors.user.js
*/

//================= GLOBAL VARIABLES (WARNING: MUST BE THE SAME IN ALL RST SCRIPTS) =======================//

var error_level = "0 (initial)";

var rst_title = "title=\"Raven Squad Tools\"";
var rst_logo = "<span "+rst_title+" style=\"cursor:help;padding:1px;font-weight:bold;color:#FFFFFF;background-color:#000000;font-size:60%\">RST</span> ";

error_level = "1 (town info)";

//find the current town info
var current_town_id = "";
var current_town_name = "";
var current_mine_name = "luxury mine"; //default name

var options_parent = document.getElementById("citySelect");
if(options_parent != null) {
error_level = "1.1 (options parent)";
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

error_level = "1.2 (player towns)";

//find the type of page we're watching (using the body id, but we could also use the page's URL)
var page_type = "";
var bodies = document.getElementsByTagName("body");
if(bodies.length > 0) {
  var body = bodies[0];
  page_type = body.id;
}

error_level = "1.3 (page level)";

//convert current mine name, if available
if(current_mine_name.indexOf("Marble") >= 0) current_mine_name = "Quarry";
if(current_mine_name.indexOf("Crystal") >= 0) current_mine_name = "Crystal Mine";
if(current_mine_name.indexOf("Sulfur") >= 0) current_mine_name = "Sulfur Pit";
if(current_mine_name.indexOf("Wine") >= 0) current_mine_name = "Vineyards";
if(current_mine_name.indexOf("tradegood2") >= 0) current_mine_name = "Quarry";
if(current_mine_name.indexOf("tradegood3") >= 0) current_mine_name = "Crystal Mine";
if(current_mine_name.indexOf("tradegood4") >= 0) current_mine_name = "Sulfur Pit";
if(current_mine_name.indexOf("tradegood1") >= 0) current_mine_name = "Vineyards";

error_level = "1.4 (mine names)";

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

error_level = "1.5 (page level)";

var server_prefix = getServerPrefix(document.URL)+".ae";

error_level = "1.6 (server prefix)";

//================= SCRIPT-SPECIFIC GLOBAL VARIABLES =======================//

var theurl = window.location.href;
var theview = getURLParam(theurl,"view"); //not always available

error_level = "1.7 (script globals)";

//permissions used in the embassy (display towns, display online status/last logon, send message)
var permission_towns = true;
var permission_online = true;
var permission_message = true;

//================= COMMON FUNCTIONS =======================//

error_level = "1.7 (common functions)";

function formatDuration(hours,minutes,seconds) {
    var result  = "";
    
    if(hours > 0) result += hours+"h ";
    
    if(minutes > 0) result += minutes+"m ";
    
    if(seconds > 0) result += seconds+"s";
    
    return result;
}

function getServerPrefix(url) {
    if(url == "") return "";
    //cuts at first "."
    var pos = url.indexOf(".");
    if(pos < 0) return "";
    url = url.substring(0,pos);
    //then cuts at last "/"
    pos = url.lastIndexOf("/");
    if(pos < 0) return "";
    return url.substring(pos+1);
}

/*
function getURLParam(url, key) {
    var slices = url.split(/[\\?&]/);
    for(var i=0;i<slices.length;i++) {
        var slice = slices[i];
        if(slice.indexOf(key + "=") == 0) {
            return slice.substring(key.length+1);
        }
    }
    return null;
}
*/

  function square(x) {
    return x*x;
  }
  
  function ceil(x) {
    return Math.round(x+0.5);
  }
  
function floor(x) {
    if(x < 0.5) return Math.round(x);
    return Math.round(x-0.5);
}
  
function trimZeroes(s) {
    for(var i=0;i<s.length;i++) {
        var c = s.charAt(i);
        if(c == " " || c == "0") continue;
        return s.substring(i);
    }
    return s;
}
  
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

function parseIkariamDate(s) {
    var date_expl = s.split(".");
    var date = new Date();
    date.setDate(parseInt(trimZeroes(date_expl[0])));
    date.setMonth(parseInt(trimZeroes(date_expl[1]))-1);
    date.setFullYear(parseInt(trimZeroes(date_expl[2])));
    return date;
}

function extractCoordLabel(coords) {
    var s = extractCoords(coords,"[","]",":");
    return s[0];
}

function extractCoordX(coords) {
    var s = extractCoords(coords,"[","]",":");
    return s[1];
}

function extractCoordY(coords) {
    var s = extractCoords(coords,"[","]",":");
    return s[2];
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

function getChildByTagName(node,tagname,idx) {
    if(node == null) return null;
    tagname = tagname.toLowerCase();
    var children = node.childNodes;
    var count = 0;
    for(var i=0;i<children.length;i++) {
        var child = children[i];
        if(child.nodeType != 1) continue;
        if(child.tagName.toLowerCase() == tagname) {
            if(count == idx) return child;
            count++;
        }
    }
    return null;
}

function getFirstChildByTagName(node,tagname) {
    return getChildByTagName(node,tagname,0);
}

function getChildrenByTagName(node,tagname) {
    var result = new Array();
    if(node == null) return result;
    tagname = tagname.toLowerCase();
    var children = node.childNodes;
    for(var i=0;i<children.length;i++) {
        var child = children[i];
        if(child.nodeType != 1) continue;
        if(child.tagName.toLowerCase() == tagname) result.push(child);
    }
    return result;
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
  newnode.style.marginTop = "12px";
  newnode.style.backgroundImage = "url('skin/layout/bg_sidebox.gif')";
  newnode.style.backgroundRepeat = "repeat-y";
  newnode.style.position = "fixed";
  newnode.style.left = "0";
  newnode.style.top = "bottom";
  newnode.innerHTML = boxcontent;
  return newnode;
}

function box_flow(title,content) {
  var boxhead_css = "text-align:center;background-image:url('skin/layout/bg_contentBox01h_header.gif');height:30px;vertical-align:middle;padding-left:12px";
  var boxhead2_css = "padding-top:10px;font-weight:bold";
  var boxhead = "<div style=\""+boxhead_css+"\"><div style=\""+boxhead2_css+"\">"+title+"</div></div>";
  var boxbody_1 = "<div class=\"content\">";
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

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function hasOfficialRank(rankstring, rank) {
    if(rankstring == "") return false;
    if(rankstring == rank) return true;
    //break down rank using separator "," then trim names and match
    var ranks = rankstring.split(/[\\s]?[,]/);
    for(var i=0;i<ranks.length;i++) {
        ranks[i] = trim(ranks[i]);
        if(ranks[i] == rank) return true;
    }
    return false;
}

function hasClassName(c,cname) {
    if(c == null || cname == null) return false;
    c = c.toLowerCase();
    cname = cname.toLowerCase();
    var c1 = c.split(" ");
    for(var i=0;i<c1.length;i++) {
        if(c1[i] == cname) return true;
    }
    return false;
}

error_level = "1.8 (extract embassy)";

function extractEmbassyPlayers() {
       
   var player_entries = new Array();
   var table_dom = document.getElementById("memberList");
   if(table_dom == null) return player_entries; //empty
   
   var tbody = getFirstChildByTagName(table_dom,"tbody");
   var rows = getChildrenByTagName(tbody,"tr");
   for(var i=0;i<rows.length;i++) {
    var row = rows[i];
    var pl_myself = hasClassName(row.className,"highlight") || hasClassName(row.className,"1");
    var cells = getChildrenByTagName(row,"td");
    var cell0 = cells[0];
    var pl_online = cell0.className;
    var pl_last_action_raw = cell0.getAttribute("title").split(":");
    var pl_last_action = pl_last_action_raw[1];
    var pl_last_sec = floor(parseIkariamDate(pl_last_action).getTime() / 1000);
    var now_sec = floor((new Date()).getTime() / 1000);
    var day_sec = 24*60*60;
    var pl_inactive_days = floor((now_sec - pl_last_sec)/day_sec); //days of inactivity
    var cell1 = cells[1];
    var pl_name = cell1.innerHTML;
    var cell2 = cells[2];
    var pl_towns_raw = getFirstChildByTagName(getFirstChildByTagName(getFirstChildByTagName(cell2,"ul"),"li"),"ul");
    var pl_towns_raw = getChildrenByTagName(pl_towns_raw,"li");
    //now we have an array of "<a>" tags with the town name and coordinates inside
    var town_entries = new Array();
    for(var j=0;j<pl_towns_raw.length;j++) {
        var pl_town = pl_towns_raw[j];
        var pl_town_a = getFirstChildByTagName(pl_town,"a");
        var pl_town_url = pl_town_a.href;
        var pl_town_id = getURLParam(pl_town_url,"selectCity");
        pl_town_packed = pl_town_a.innerHTML;
        //now unpack the town into town name and coords x,y
        var pl_town_name = extractCoordLabel(pl_town_packed);
        var pl_town_x = extractCoordX(pl_town_packed);
        var pl_town_y = extractCoordY(pl_town_packed);
        
        var town_obj = new Object();
        town_obj.name = pl_town_name;
        town_obj.x = pl_town_x;
        town_obj.y = pl_town_y;
        town_obj.url = pl_town_url;
        town_obj.id = pl_town_id;
        town_entries.push(town_obj);
    }
    var pl_rank = cells[3].innerHTML; //rank
    var pl_score = cells[4].innerHTML; //score
    var pl_actions = cells[5]; //action(s), packed
    pl_actions = getFirstChildByTagName(pl_actions,"div"); //move down to first div
    var action_divs = getChildrenByTagName(pl_actions,"div");
    //now zoom down to the "a" tag in each case, if any
    var pl_action_1 = getFirstChildByTagName(action_divs[0],"a"); //?
    var pl_action_2 = getFirstChildByTagName(action_divs[1],"a"); //?
    var pl_action_3 = getFirstChildByTagName(action_divs[2],"a"); //?
    var pl_action_4 = getFirstChildByTagName(action_divs[3],"a"); //contact action
    var pl_action_contact = "";
    if(pl_action_4 != null) pl_action_contact = pl_action_4.href;
    
    var player_obj = new Object();
    player_obj.name = pl_name;
    player_obj.myself = pl_myself;
    player_obj.status = pl_online;
    player_obj.score = pl_score;
    player_obj.rank = pl_rank;
    player_obj.contactURL = pl_action_contact;
    player_obj.lastActionDate = parseIkariamDate(pl_last_action);
    player_obj.inactivityDays = pl_inactive_days;
    player_obj.towns = town_entries;
    player_obj.actionsHTML = pl_actions.innerHTML;
    //convert the action div thingies into packed spans
    player_obj.actionsHTML = player_obj.actionsHTML.replace(/\<div/gi,"<span style=\"margin:1px;padding:0\"");
    player_obj.actionsHTML = player_obj.actionsHTML.replace(/\/div/gi,"/span");
    
    if(hasOfficialRank(pl_rank, "قائد")) {
        player_obj.officer = true;
        player_obj.leader = true;
     }
    else if(hasOfficialRank(pl_rank, "جنرال")) player_obj.officer = true;
    else if(hasOfficialRank(pl_rank, "وزير داخلية")) player_obj.officer = true;
    else if(hasOfficialRank(pl_rank, "دبلوماسي")) player_obj.officer = true;
    else  {
        player_obj.officer = false;
        player_obj.leader = false;
    }
    player_entries.push(player_obj);
   }
   return player_entries;
}

//================= EMBASSY EXTRACTION =======================//

error_level = "1.7 (unsafe window exports)";

unsafeWindow.hasClass = function(cstring,cname) {
    return cstring.toLowerCase().indexOf(cname.toLowerCase()) >= 0;
}

unsafeWindow.toggleDisplay = function(targetid) {
    var obj = document.getElementById(targetid);
    if(obj == null) {
        return;
    }
    if(obj.style.display == "none") {
            if(obj.tagName.toLowerCase() == "tr") obj.style.display = "table-row";
            else if(obj.tagName.toLowerCase() == "table") obj.style.display = "table";
            else obj.style.display = "block";
    }
    else obj.style.display = "none";
}

unsafeWindow.toggleAllTowns = function() {
    //resets all players display to ON
    document.getElementById("inactives").checked = true;
    document.getElementById("faraways").checked = true;
    document.getElementById("offlines").checked = true;
    unsafeWindow.togglePlayers(false);
    unsafeWindow.toggleClassDisplay('townlist',document.getElementById("expandtowns").checked);
}

unsafeWindow.togglePlayers = function(towns) {
    //first hide all towns
    if(towns !== false) {
        unsafeWindow.toggleClassDisplay("townlist",false);
        document.getElementById("expandtowns").checked = false;
    }
    var objs = document.getElementsByClassName("players");
    for(var i=0;i<objs.length;i++) {
        obj = objs[i];
        var shown = true;
        if(!document.getElementById("inactives").checked) shown = shown && !unsafeWindow.hasClass(obj.className,"inactives");
        if(!document.getElementById("faraways").checked) shown = shown && !unsafeWindow.hasClass(obj.className,"faraways");
        if(!document.getElementById("offlines").checked) shown = shown && !unsafeWindow.hasClass(obj.className,"offlines");
        if(shown) {
            obj.style.display = "table-row";
        }
        else {
            obj.style.display = "none";
        }
    }
}

unsafeWindow.toggleClassDisplay = function(targetclass, fixed) {
    //first hide the table
    document.getElementById("newlist").style.visibility = "hidden";
    var objs = document.getElementsByClassName(targetclass);
    for(var i=0;i<objs.length;i++) {
        obj = objs[i];
        if(fixed === true) {
            if(obj.tagName.toLowerCase() == "tr") obj.style.display = "table-row";
            else if(obj.tagName.toLowerCase() == "table") obj.style.display = "table";
            else obj.style.display = "block";
        }
        else if(fixed === false) {
            obj.style.display = "none";
        }
        else if(obj.style.display == "none") {
            if(obj.tagName.toLowerCase() == "tr") obj.style.display = "table-row";
            else if(obj.tagName.toLowerCase() == "table") obj.style.display = "table";
            else obj.style.display = "block";
        }
        else obj.style.display = "none";
    }
    //then show the table again
    document.getElementById("newlist").style.visibility = "visible";
}

unsafeWindow.toggleCheck = function(targetid) {
    var obj = document.getElementById(targetid);
    if(obj == null) {
        return;
    }
    obj.checked = !obj.checked;
}

unsafeWindow.selectTown = function(id) {
    var sel = document.getElementById("citySelect");
    var form1 = document.getElementById("changeCityForm");
   if(sel == null || form1 == null) return;
   for(var i=0;i<sel.options.length;i++) {
    var opt = sel.options[i];
    if(opt.value == id) {
        sel.selectedIndex = i;
        form1.submit();
    }
   }
}

//==========================================MAIN CODE=========================================//

error_level = "2 (main init)";

try {

//var theurl = window.location.href;
var theurl = document.URL;
var theview = getURLParam(theurl,"view");

error_level = "2.1 (get view)";

//embassy shortcut (for any town view and any advisor view)
if((theview == "embassy") || (theview == "diplomacyAdvisorAlly")) {
//if(theview == "embassy") {
error_level = "2.2 (view embassy)";

var insertpoint = null;
var infobox = document.getElementsByClassName("contentBox01h");
if(infobox != null && infobox.length >= 2) {
    infobox = infobox[1];
    insertpoint = infobox.parentNode;
}

error_level = "2.3 (parent node)";

if(insertpoint != null) {

error_level = "2.4 (insertpoint)";

   //we HIDE the classical embassy
  infobox.id = "contentBox01h";
  infobox.style.display = "none";

  //also HIDE the alliance page
  var apage = document.getElementById("internalPage");
  if(apage != null) {
    apage.style.display = "none";
  }

error_level = "2.5 (hide alliance page)";

  //extract all players and towns
  var player_entries = extractEmbassyPlayers();
  
  if(player_entries.length == 0) throw("No player entries were extracted!");
  
error_level = "2.6 (extract embassy call)";
  
  //add field to each player record
  for(var i=0;i<player_entries.length;i++) {
    var player_record = player_entries[i];
    if(player_record.towns.length == 0) permission_towns = false; //oops, we can't display towns
    if(isNaN(player_record.inactivityDays)) permission_online = false; //oops, we can't display online status, last logged, and inactivity
    if(player_record.myself) player_record.minDistance = 0;
    else player_record.minDistance = 150; //over max distance
  }
  
  error_level = "2.7 (add field default)";
  
  //find my own record
  var my_record = null;
  var my_towns = new Array();
  for(var i=0;i<player_entries.length;i++) {
    var player_record = player_entries[i];
    if(player_record.myself) {
        my_record = player_record;
        my_towns = my_record.towns;
        //player_entries.splice(i,1);
        break;
    }
  }

  if(my_record == null) throw("Self-record not found, player_entries="+player_entries.length);

  error_level = "2.8 (find own record)";

  //compare each of the player's town coords with each other player's town coords
  for(var i=0;i<player_entries.length;i++) {
    var player_record = player_entries[i];
    //if(player_record.myself) continue; //skip own player
    var player_towns = player_record.towns;
    //for each of the other player's town
    for(var j=0;j<player_towns.length;j++) {
        var player_town = player_towns[j];
        player_town.bestDistance = 150;
        player_town.bestDistanceName = "";
        //for each of my towns
        for(var k=0;k<my_towns.length;k++) {
            var my_town = my_towns[k];
            if(my_town.id == player_record.id) continue; //skip if player's current town is own current town
            //var dist = ceil(Math.sqrt(square(parseInt(my_town.x) - parseInt(player_town.x)) + square(parseInt(my_town.y) - parseInt(player_town.y))));
            var dist_raw = Math.sqrt(square(parseInt(my_town.x) - parseInt(player_town.x)) + square(parseInt(my_town.y) - parseInt(player_town.y)));
            var dist_time = dist_raw * 20*60; //seconds
            if(dist_raw == 0) dist_time = 10*60; //seconds
            var dist_hour = floor(dist_time / 3600);
            var dist_min = floor((dist_time - 3600*dist_hour) / 60);
            var dist_sec = Math.round(dist_time - 3600*dist_hour - 60*dist_min);
            var dist = Math.round(Math.sqrt(square(parseInt(my_town.x) - parseInt(player_town.x)) + square(parseInt(my_town.y) - parseInt(player_town.y))));
            if(dist < player_record.minDistance) {
                player_record.minDistance = dist;
                player_record.minTime = formatDuration(dist_hour,dist_min,dist_sec);
            }
            if(dist < player_town.bestDistance) {
                player_town.bestDistance = dist;
                player_town.bestTime = formatDuration(dist_hour,dist_min,dist_sec);
                player_town.bestDistanceName = my_town.name;
                player_town.bestDistanceURL = my_town.url;
                player_town.bestDistanceID = my_town.id;
            }
        }
    }
  }
  
  error_level = "2.9 (find closest)";
  
  var sorted_player_entries = new Array();

  //first we find and add the leader, then the officers, then self
    for(var i=0;i<player_entries.length;i++) {
        var player_record = player_entries[i];
        if(player_record.leader) {
            sorted_player_entries.push(player_entries[i]);
            player_entries.splice(i,1);
            i--;
        }
    }
    for(var i=0;i<player_entries.length;i++) {
        var player_record = player_entries[i];
        if(player_record.officer) {
            sorted_player_entries.push(player_entries[i]);
            player_entries.splice(i,1);
            i--;
        }
    }
    for(var i=0;i<player_entries.length;i++) {
        var player_record = player_entries[i];
        if(player_record.myself) {
            sorted_player_entries.push(player_entries[i]);
            player_entries.splice(i,1);
            break;
        }
    }
    
    error_level = "2.9 (sort leader officers self)";
  
  //then order/sort players according to min dist; we'll use selection(remove,append) sort
  while(player_entries.length > 0) {
    var best_index = 0;
    var best_dist = 150;
    for(var i=0;i<player_entries.length;i++) {
        var player_record = player_entries[i];
        if(player_record.minDistance < best_dist) {
            best_index = i;
            best_dist = player_record.minDistance;
        }
    }
    sorted_player_entries.push(player_entries[best_index]);
    player_entries.splice(best_index,1);
  }

error_level = "2.10 (sort players)";

  //then display top close neighbors in central (flow) panel
  //options:
        // max distance DD(default 10)
        // min highscore DD(default 0)
        // max number of records DD(default "whole alliance")
        // sort by: distance, score, rank, status, name DD(default distance)
        // button "refresh"?

error_level = "3 (display init)";

  var content = "";
  
  var option_style = "font-size:80%;margin-top:1px;margin-bottom:1px;margin-right:8px;text-align:right;";
  
  var disabled_towns = "";
  if(!permission_towns) disabled_towns = "disabled";
  var disabled_online = "";
  if(!permission_online) disabled_online = "disabled";
  var disabled_internal = "";
  if(theview == "diplomacyAdvisorAlly") disabled_internal = "disabled";
  content += "<ul><li style=\""+option_style+"\"><input id=\"faraways\" type=\"checkbox\" CHECKED "+disabled_towns+" onclick=\"togglePlayers()\"> إظهار اللاعبين البعيدين جدا</li>";
  content += "<li style=\""+option_style+"\"><input id=\"offlines\" type=\"checkbox\" CHECKED "+disabled_online+" onclick=\"togglePlayers()\"> إظهار اللاعبين الغير متصلين</li>";
  content += "<li style=\""+option_style+"\"><input id=\"inactives\" type=\"checkbox\" CHECKED "+disabled_online+" onclick=\"togglePlayers()\"> إظهار اللاعبين الخاملين</li>";
  content += "<li style=\""+option_style+"\"><input id=\"expandtowns\" type=\"checkbox\" "+disabled_towns+" onclick=\"toggleAllTowns()\"> إظهار المدن لكل اللاعبين ( يثقل المتصفح كثيرا )</li>";
  
  content += "<li style=\""+option_style+"\"><input id=\"displaynew\" type=\"checkbox\" CHECKED onclick=\"toggleDisplay('newlist')\"> إظهار أعضاء ال RST</li>";
  content += "<li style=\""+option_style+"\"><input id=\"displayold\" type=\"checkbox\" onclick=\"toggleDisplay('contentBox01h')\"> إظهار لائحة الأعضاء الكلاسيكية</li>";
  content += "<li style=\""+option_style+"\"><input id=\"displaypage\" type=\"checkbox\" "+disabled_internal+" onclick=\"toggleDisplay('internalPage')\"> إظهار الصفحة الداخلية للتحالف</li><br>";

  if(!permission_towns || !permission_online) content += "<li style=\""+option_style+"\"><i>Note: Some of your assigned permissions prevent you from fully using this script. Please contact your Secretary of State.</i></li></ul><br>";

  error_level = "3.1 (options)";

  var plist1 =  "<div style=\"margin-left:3px;margin-right:2px\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"table01\" style=\"width:100%\" id=\"newlist\">";
  
  var td_style = "padding:1px;padding-left:8px;text-align:right";

  var td_sep_style = ";border-top-style:solid;border-top-width:1px;border-top-color:#C6AD94";

  plist1 += "<thead><tr>"
  if(permission_towns) plist1 += "<th style=\""+td_style+"\" width=\"50\">مدن</th>"
  if(permission_online) plist1 += "<th style=\""+td_style+"\" width=\"50\">إتصال</th>"
  if(permission_towns) plist1 += "<th style=\""+td_style+"\" width=\"50\">بعد</th>"
  plist1 += "<th style=\""+td_style+"\">لاعب</th>"
  plist1 += "<th style=\""+td_style+"\">رتبة</th>"
  plist1 += "<th  style=\""+td_style+"\" width=\"50\">نقاط</th>"
  plist1 += "<th  style=\""+td_style+"\" width=\"100\">تحركات</th>"
  plist1 += "</tr></thead>";
  
  error_level = "3.2 (table header)";
  
  plist1 += "<tbody>";
  var counter  = 0;
  var officers = true;
  for(var i=0;i<sorted_player_entries.length;i++) {
    var player_record = sorted_player_entries[i];
    var special_class = "players";
    var townlist_class = "townlist";
    var special_style = "";
    counter ++;
    if(player_record.minDistance > 10) special_class += " faraways";
    if(player_record.status == "offline") special_class += " offlines";
    if(player_record.inactivityDays >7) special_class += " inactives";
    
    if((counter % 2) == 1) {
        special_class += " default";
        townlist_class += " default";
    }
    else {
        special_class += " alt";
        townlist_class += " alt";
    }
    
    if(!player_record.officer && officers) {
        special_style += td_sep_style;
        officers = false;
    }
    
    error_level = "3.3 (display loop player init)";
    
    plist1 += "<tr class=\""+special_class+"\">";
    
    var toggle_style = "cursor:pointer;background-color:#E0C0A0;color:#000000;padding:1px;border-style:solid;border-width:1px;border-color:#606040;border-left-color:#C0C0A0;border-top-color:#C0C0A0";
    if(permission_towns) {
        plist1 += "<td style=\""+td_style+special_style+"\"><span title=\"إضغط لرؤية مدن اللاعب\" style=\""+toggle_style+"\" onclick=\"toggleDisplay('towns"+i+"')\">"+player_record.towns.length+"</span></td>";
    }
    
    if(!permission_online); //skip
    else if(player_record.status == "offline") {
        plist1 += "<td title=\"غير متصل\" style=\""+td_style+special_style+"\"><img src=\"http://"+server_prefix+".ikariam.com/skin/layout/bulb-off.gif\"></td>";
    }
    else {
        plist1 += "<td title=\"متصل\" style=\""+td_style+special_style+"\"><img src=\"http://"+server_prefix+".ikariam.com/skin/layout/bulb-on.gif\"></td>";
    }
    
    if(permission_towns) {
        plist1 += "<td style=\""+td_style+special_style+"\"><span title=\""+player_record.minTime+"\" style=\"cursor:help;font-size:125%;font-weight:bold;margin:0\">";
        if(!player_record.myself) plist1 += player_record.minDistance;
        else plist1 += "--";
        plist1 += "</span></td>";
    }
    
    plist1 += "<td style=\""+td_style+special_style+"\"><a style=\"color:#542c0f\" href=\""+player_record.contactURL+"\"><b>" + player_record.name+"</b></a>";
    if(player_record.inactivityDays > 10) {
        plist1 += "<br><span style=\"color:#800000;font-weight:bold\"> (خمول: "+player_record.inactivityDays+" يوم)</span> ";
    }
    else if(player_record.inactivityDays > 2) {
        plist1 += "<br><span style=\"color:#800000\"> (خمول: "+player_record.inactivityDays+" أيام)</span> ";
    }
    else if(player_record.inactivityDays > 1) {
        plist1 += "<br><span style=\"\"> (دخل قبل يومين)</span> ";
    }
    plist1 += "</td>";

    var star = "<img src=\"http://www.verlamer.ca/ikariam/scripts/yellowstar.gif\"> ";
    var star1 = "<img src=\"http://www.verlamer.ca/ikariam/scripts/goldstar.gif\"> ";
    var star2 = "<img src=\"http://www.verlamer.ca/ikariam/scripts/bluestar.gif\"> ";
    if(player_record.leader) plist1 += "<td style=\""+td_style+special_style+"\"><b>" + star1 + player_record.rank + "</b></td>";
    else if(player_record.officer) plist1 += "<td style=\""+td_style+special_style+"\"><b>" + star + player_record.rank + "</b></td>";
    else if(player_record.myself) plist1 += "<td style=\""+td_style+special_style+"\"><b>" + star2 + player_record.rank + "</b></td>";
    else plist1 += "<td style=\""+td_style+special_style+"\">" + player_record.rank + "</td>";
    
    plist1 += "<td style=\""+td_style+special_style+"\">" + player_record.score + "</td>";

    //plist1 += "<td style=\""+td_style+special_style+"\">&nbsp;</td>"
    //console.log(player_record.actionsHTML);
    plist1 += "<td style=\""+td_style+special_style+"\">"+player_record.actionsHTML+"</td>"

    plist1 += "</tr>";
        
    error_level = "3.4 (display loop player row end)";
    
    if(permission_towns) {
    //here we add a non-displayed div with id="towns+i"
    var townlist_style = "display:none;background-color:#F3F3F3;border-style:dashed;border-bottom-style:solid;border-width:1px;border-color:#C0C0A0";    
    plist1 += "<tr style=\""+townlist_style+"\" id=\"towns"+i+"\" class=\""+townlist_class+"\"><td colspan=\"7\">";    
    var towns = player_record.towns;
    var town_style = "text-align:right;padding:1px";
    
    plist1 += "<div><table cellpadding=\"0\" cellspacing=\"0\">";    
    var th_style = "padding:1px;color:#C6AD94;font-weight:bold;text-align:right";
    plist1 += "<tr>";
    plist1 += "<td style=\""+th_style+";width:60px\">إحداثيات</td>";
    plist1 += "<td style=\""+th_style+";width:120px\">مدينة</td>";
    plist1 += "<td style=\""+th_style+";width:180px\">أقرب إلى</td>";
    plist1 += "<td style=\""+th_style+"\">نقل مختصر من "+current_town_name+"</td>";
    plist1 += "</tr>";

    error_level = "3.5 (display loop player towns header)";

    for(var j=0;j<towns.length;j++) {
        var town_record = towns[j];

        plist1 += "<tr>";

        plist1 += "<td style=\""+td_style+"\">";
        plist1 += "<div style=\""+town_style+"\">";
        plist1 += "["+town_record.x+","+town_record.y+"]";
        plist1 += "</div>";
        plist1 += "</td>";
    
        plist1 += "<td style=\""+td_style+"\">";
        plist1 += "<div style=\""+town_style+"\">";
        plist1 += "<a href=\""+town_record.url+"\">"+ town_record.name+ "</a>";
        plist1 += "</div>";
        plist1 += "</td>";
    
        plist1 += "<td style=\""+td_style+"\">";
        if(!player_record.myself) {
            var info_style = ";cursor:help";
            var town_title = town_record.bestTime;
            plist1 += "<div title=\""+town_title+"\" style=\""+town_style+info_style+"\">";
            plist1 += "<img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/larrow.gif\">";
            plist1 += town_record.bestDistance;
            plist1 += "<img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/rarrow.gif\">";
            //plist1 += "<a href=\"http://"+server_prefix+".ikariam.com/index.php?view=city&selectCity="+town_record.bestDistanceID+"\"><i>"+town_record.bestDistanceName+"</i></a>";
            var aselect_style = "cursor:pointer";
            plist1 += "<a style=\""+aselect_style+"\" onclick=\"selectTown('"+town_record.bestDistanceID+"')\"><i>"+town_record.bestDistanceName+"</i></a>";
            //plist1 += "<i><a href=\""+town_record.bestDistanceURL+"\">"+town_record.bestDistanceName+"</a></i>";
            plist1 += "</div>";
        }
        else plist1 += "&nbsp;"
        plist1 += "</td>";
    
        var city_id = getURLParam(town_record.url,"selectCity");
        var troops_url = "http://"+server_prefix+".ikariam.com/index.php?view=deployment&deploymentType=army&destinationCityId="+city_id;
        var fleet_url = "http://"+server_prefix+".ikariam.com/index.php?view=deployment&deploymentType=fleet&destinationCityId="+city_id;
        var goods_url = "http://"+server_prefix+".ikariam.com/index.php?view=transport&destinationCityId="+city_id;
    
        var shortcuts_style = "padding:1px";
        plist1 += "<td style=\""+td_style+"\">";
        if(town_record.id != current_town_id) {
            plist1 += "<div style=\""+town_style+"\">";
            plist1 += "<a title=\"إرسال القوات إلى...\" style=\""+shortcuts_style+"\" href=\""+troops_url+"\"><img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/troops.gif\"></a> ";
            plist1 += "<a  title=\"إرسال الأسطول إلى...\" style=\""+shortcuts_style+"\" href=\""+fleet_url+"\"><img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/boats.gif\"></a> ";
            plist1 += "<a  title=\"إرسال البضائع إلى...\" style=\""+shortcuts_style+"\" href=\""+goods_url+"\"><img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/goods.gif\"></a> ";
            plist1 += "<img valign=\"middle\" src=\"http://www.verlamer.ca/ikariam/scripts/rarrow.gif\">" + town_record.name;
            plist1 += "</div>";
        }
        else plist1 += "&nbsp;"
        plist1 += "</td>";

        plist1 += "</tr>";
    } //towns
    
    error_level = "3.6 (display loop player towns done)";
    
    plist1 += "</table></div>";
        
    plist1 += "</td></tr>";
    } //if permission_town
    
  } //players
  
  plist1 += "</tbody>";
  plist1 += "</table></div>";

  error_level = "3.7 (display panel init)";

  var title = "أقرب الجيران إلى "+my_record.name+"...";
  content += plist1;
  
  //var url_css = "margin-bottom:12px";
  //var a_style = "color:#542c0f";

  var mynode = box_flow(title,content);

  error_level = "3.8 (display panel push)";
  insertpoint.insertBefore(mynode,infobox);  
}

} //if(theview)

} //try
catch(error_msg) {
    alert("Ooops, the script RST Neighbors failed at control point \""+error_level+"\" with error \""+error_msg+"\". Please uninstall the script and send this error message to the developer.");
}

//================= SCRIPT SIGNATURE =======================//
/*
var cbs = rst_logo+" script (neighbors <a style=\"color:#542c0f\" href=\"http://verlamer.ca/ikariam/scripts/\">0.9.9 RC2</a>) is active.";

//add a note at the bottom of the page to indicate that the script is active
var pbodies = document.getElementsByTagName("body");
if(pbodies.length > 0) {
  var pbody = pbodies[0];
  var newnode = document.createElement("div");
  //pbody.appendChild(newnode);
  newnode.innerHTML = cbs;
}
*/
