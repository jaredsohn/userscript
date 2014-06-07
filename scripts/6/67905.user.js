// ==UserScript==
// @name          CP Tweaks
// @namespace     http://localhost
// @description   User Interface Tweaks for CosmoPulse: www.cosmopulse.net
// @include       http://* cosmopulse.net/*
// @require       http://www.cosmopulse.net/js/tooltips.js
// ==/UserScript==

// v. 0.7.6
// You may freely use, distribute and/or modify this script as long as
// the following credentials are included:
// Created by Jacek Siuda
const C_VERSION_STRING = "v 0.7.6";
// ------------------------ GLOBAL DECLARATIONS ----------------------------
var g_menuitems = new Array();
var g_menuitems_counter = 0;
var g_planets_modified = new Array();
var g_position_input;
var g_input_change_allowed = true;
var g_position_hiddeninputs = new Array();
var g_starting_position = new Array();
var g_max_fleet_speed = 1000;
var g_username = "";
var g_www = false;
var g_collapse_src = "/skins/minimal/icons/collapse.gif";
var g_expand_src = "/skins/minimal/icons/expand.gif";

// ---------------------------- CONFIG -------------------------------------
// Set to 0 to disable menu tweak
const C_TWEAK_PLANET_MENUS = 1;
// Set to 0 to disable fleet group tweak
const C_TWEAK_FLEET_GROUPS = 1;
// Set to 0 to disable people list tweak
const C_TWEAK_PEOPLE_LIST = 1;
// Fleet description string: %R-size, %S-contents, %D-commander name
const C_FLEET_DESC_DEFAULT_STRING = "%R %S %D";


const C_GOOD_STATS_THRESHOLD = 20;

const C_SPEED_CALC_MAGNITUDE = 1000;
const C_CURRENT_FIGHTER_SPEED_FACTOR = 45* C_SPEED_CALC_MAGNITUDE/45;


// polish letters in unicode
// l&#x0142; o&oacute; s&#x015B;  z.&#x017C;  e&#x0119;
// L&#x141;  c&#x107;  a&#x0105;  S&#346;



// ------------------------- INTERNAL - DO NOT MODIFY ----------------------

// Menuitems - removable by config panel
MenuItemAdd( "fleets", "Floty", "/fleet/fleet_overview.htm?planetId=", "");
MenuItemAdd( "home_persons", "Utrzymywani", "/person/persons_list.htm?homePlanetId=", "");
MenuItemAdd( "persons", "Bez zaj&#x0119;cia", "/person/persons_list.htm?planetId=","&personTypeId=0");
MenuItemAdd( "planet_persons", "Przebywaj&#x0105;cy", "/person/persons_list.htm?planetId=","");
MenuItemAdd( "scan", "Skanuj", "/scanning/planet_scan_system.htm?planetId=", "");
MenuItemAdd( "admin", "Ustawienia", "/planet/show_planet_settings.htm?planetId=", "");
MenuItemAdd( "shipyard", "Stocznia", "/building/shipyard.htm?planetId=", "");
MenuItemAdd( "repair", "Naprawa", "/fleet/repair_multiple_fleets.htm?planetId=", "");
MenuItemAdd( "defence", "Obrona", "/defense/defense_overview.htm?planetId=", "");
MenuItemAdd( "laboratory", "Laboratorium", "/building/laboratory.htm?planetId=", "");
MenuItemAdd( "academy", "Akademia", "/building/university.htm?planetId=", "");
MenuItemAdd( "collector", "Kolektor", "/building/energy_collector.htm?planetId=", "");
MenuItemAdd( "stock", "Gie&#x0142;da", "/building/market.htm?planetId=", "");

const C_NOTE_PICTURE =
'data:image/gif,GIF89a%1D%00%18%00%E6%00%00EEE%A8%A8%A8iii%F6%F6%F6%F0%F0%F0'+
'%5E%5E%5E%1D%1D%1D%0A%0A%0A%84%84%84%EF%EF%EF%C0%C0%C0%F7%F7%F7%E2%E2%E2%B3'+
'%B3%B3%D8%D8%D8%AC%AC%AC%F9%F9%F9%D2%D2%D2VVV%FA%FA%FA444%D4%D4%D4%8E%8E%8E'+
'%EE%EE%EE%C1%C1%C1%DA%DA%DA%B2%B2%B2%60%60%60%AF%AF%AF%88%88%88%CA%CA%CA%CE'+
'%CE%CE%DF%DF%DF%FD%FD%FDwww%C3%C3%C3%E6%E6%E6%EA%EA%EAfff%0F%0F%0F%FB%FB'+
'%FBMMM%BD%BD%BD%1B%1B%1B!!!bbb%1F%1F%1F%86%86%86...%3A%3A%3A%08%08%08%9B%9B'+
'%9B%0C%0C%0C%06%06%06%AB%AB%AB%B4%B4%B4000%C6%C6%C6xxxQQQ%94%94%94%F4%F4%F4'+
'%11%11%11%A7%A7%A7%F3%F3%F3%CB%CB%CB999%BA%BA%BA%B7%B7%B7%A4%A4%A4ooo%3B%3B'+
'%3BRRR%E1%E1%E1%8A%8A%8A%92%92%92%93%93%93ggg%CD%CD%CD%AE%AE%AEhhh%E5%E5'+
'%E5333%2C%2C%2C%2B%2B%2Bsss%18%18%18%D0%D0%D0%5D%5D%5D%D1%D1%D1666%A1%A1%A1'+
'%B9%B9%B9%FE%FE%FEGGG%BE%BE%BE%13%13%13XXXCCC%E7%E7%E7%82%82%82%BC%BC%BC%D9'+
'%D9%D9%15%15%15%96%96%96%97%97%97%ED%ED%ED%7C%7C%7C%02%02%02%99%99%99%04%04'+
'%04%90%90%90uuu%FC%FC%FC%7F%7F%7F%E4%E4%E4%C9%C9%C9%0D%0D%0D%C5%C5%C5%AA%AA'+
'%AA%00%00%00%9D%9D%9D%A3%A3%A3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00!'+
'%F9%04%00%00%00%00%00%2C%00%00%00%00%1D%00%18%00%00%07%FF%80%7B%82%83%84'+
'%83sCL%26B%2CJ%85%8E%85IDo%26R4%3ET%00-r%16%2C%8F%9E%02%600%5E-d3%16GMY%25'+
'%01%07%04%9E%85%04%07%01*A%19j(wx%06%19%7B%0D%06%11%AF%84%25u6%85%18a%01%10'+
'%7B%18Z%C5%C1%82c\'%0F%85%5Ck%03%82%15%12%3A%CF%82%B1%01%85%13%3D!%82%24%22'+
'%00%DC%7B%0BlE%C1qy5%D7%CF%0B4i%CA%AF_87%DC%03.%08%17%C1f6%08%E06%81%82%11'+
'%06%C1%16%A0%81%F7%ACK%0A%09%15%9E%D1%11%83%80%5B%15%0A%0A%9E%25X%22%03X0%3D'+
'%D2%B89%11%F8L%81%81%17%09%B8)%A0%F0%24%D8%87%87%11%1F%11p0%82%03%0F(n%EC'+
'%3Db%80%C0%85%3EA(HDP%11%A0C%81%18g%AC%60%C9%11l%80%9E%15%1D%40xh0C%04%12'+
'%18%07V%00%10%C0%01%5D%AF%02%5B%01%18%901e%07%9C6z%D2%EAA%C8%ED%C3%96%A3%05'+
'%26%5E%A8%9D%AB%E7%81%9Dq%CF.%D0%9D%AB%C1%03%08%20%5E%05iP%FB%A3%CC%95(%13'+
'%02%17%A2%E9%20%A5%E2%C7%DC%02%01%00%3B';
const C_NOTE_PICTURE2 =
'data:image/gif,GIF89a%12%00%10%00%D5!%00%FF%F7%99%8D%86%3A%DE%C3%94%FD%F8%C0%'+
'D1%C9p%8Cs%08%9Ce%00_%3F%03%D6%A6%18%FF%CF%9C%9C4%08%F7%F7%F7%80T%26%F7'+
'%CF))(!Bq%A5%FF%9E%9C%FF%CF%00JIJ%DE%DB%D6%116W%CE%A6!9m%9C%F7%CF%AD%FF%CF%10'+
'%9Ci%08%CEys%F7%AE%AD%FF%A2%A5%18%1C%18%FF%DB1%F7%E3%E7%BD%BA%B5%FF%FF%FF%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00'+
'%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00!%00%2C%00%00%00%00'+
'%12%00%10%00%00%06%83%C0%90pH%14*%14%C5%24%91%B2%81%20%95%C5%C2%E4%F1q%0A%03'+
'%D8l%B6%80)%2C%2C%1Ck%60%40.%0F%0A%9E%C6B%FA%D0(%04c%F39%A2%AE%14%0E%A0%87'+
'%00%0E%E8%F7%0B%11%11%0B%08%08%06w%7B!%01~%00%0C%0Dj%84%06%06%07%88%89%8B'+
'%0C%17%09%90%92%94%95~%12%09%A0%19%9B%02D%8A~%0E%9F%09%A3E%A6%7D%0E%0E%1D%0C'+
'%0C%01%A4%AC%8B%B7%B4I%01%04%BC%BD%BD%B9%ACZ%C2%C0E%7B%C6%C7%9CCA%00%3B';

// ========================Common/util funcs================================
var coordIDs = new Array("systemXPos", "systemYPos", "systemZPos", "planetXPos", "planetYPos", "planetZPos");
var positionHandEdited = false;

// logger defs
const FA_MENU = 0; const FA_GROUP = 1; const FA_SHIP = 2; const FA_PERSON = 3;
const FA_POS = 4; const FA_PLANET = 5; FA_COMMON = 6;
const DEBUG = 0; const LOG = 1; const WARN = 2; const ERR = 3; const CRIT = 4;
var debugSeverities = new Array (ERR,ERR,LOG,ERR,ERR,ERR,ERR);

function CP_Log(p_fa,p_severity,p_log)
{
    var fas = new Array("Menu","Group","Ship","Person","Position","Planet","Common");
    var severityNames = new Array("DEBUG","LOG", "WARN", "ERR", "CRIT");
    if(debugSeverities[p_fa] <= p_severity)
    {
        GM_log(fas[p_fa]+"["+severityNames[p_severity]+"]: "+p_log);
    }
}

function CP_getAttr(name, default_val)
{
  var ret = GM_getValue(g_username+"_"+name, default_val);
  CP_Log(FA_COMMON,DEBUG,"Get name="+name+", default="+default_val
         +", value="+ret);
  return (ret);
}

function CP_setAttr(name,value)
{
  CP_Log(FA_COMMON,DEBUG,"Set name="+name+", value="+value);
  if (value != NaN)
  GM_setValue(g_username+"_"+name, value);
}

function separate_thousands(value)
{
    var toReturn="";  var i = 0;
    while((value / 10) >= 1)
    {
        toReturn = (value%10) + toReturn;
        if ((++i %3) == 0) {toReturn = " " + toReturn;}
        value = Math.floor(value / 10);
    }
    toReturn = value + toReturn ;
    return toReturn;
}

// ===========================Menu funcs==================================

// function MenuItemAdd    Stores particular menus
// @idTarget    fleet, academy, etc
// @itemLabel   Label to display in anchor
// @pageLink    baselink to go to after clicking on anchor
// @options     any other options to add to the address
function MenuItemAdd(idTarget, itemLabel, pageLink, options)
{
  g_menuitems[g_menuitems_counter] = new Object();
  g_menuitems[g_menuitems_counter].idName = idTarget;
  g_menuitems[g_menuitems_counter].Caption = itemLabel;
  g_menuitems[g_menuitems_counter].Address = pageLink;
  g_menuitems[g_menuitems_counter].Options = options;
  g_menuitems_counter++;
}


// function addMenuItem_    Produces string to put into menu
// @planetId    planet id as used in CP
// @menuId      index in menu table
function addMenuItem_(planetId, menuId)
{
    var nameBase = "planet_"+g_menuitems[menuId].idName+"_"+planetId;
    var menuItemString =
        "<div id=\"item_planet_"+nameBase+"\" class=\"menu_item_level_3_element\">"+
        "<img id=\"spacer_img_" + nameBase + "\" src=\"/images/spacer.gif\" " +
        "border=\"0\" align=\"top\" width=\"16\" height=\"16\"/>";

    if (g_menuitems[menuId].Address != "")
    {
         menuItemString +=
        " <A target=\"main_panel\" href=\"" + g_menuitems[menuId].Address
        + planetId+g_menuitems[menuId].Options
        + "\" name=\"Open\">" + g_menuitems[menuId].Caption + "</A>";
    }
    else
    {
        menuItemString += g_menuitems[menuId].Caption;
    }
    menuItemString +="</div>";
    return menuItemString;
}

function addMenuItem_full(nameBase, itemLabel, pageLink, hasChildren, targetName) {
    var MIstr = "";

    if (hasChildren) {
        MIstr += "<a id=\"toggle_" + nameBase + "\" href=\"javascript:;\" "
            + "onclick=\"toggle(\'toggle_img_" + nameBase
            + "\', \'item_" + nameBase + "_content\');\">\n";
        MIstr += "<img id=\"toggle_img_" + nameBase + "\" src=\"" + g_expand_src
            + "\" border=\"0\" align=\"top\" width=\"16\" height=\"16\"/></a>\n";
    } else {
        MIstr += "<img id=\"spacer_img_" + nameBase
            + "\" src=\"/images/spacer.gif\" border=\"0\" align=\"top\" "
            + "width=\"16\" height=\"16\"/>\n";
    }

    if (pageLink != "") {
        if (targetName == "") {
            targetName = "main_panel";
        }
        MIstr += "<A id=\"link_"+nameBase+"\" target=\"" + targetName + "\" href=\"" + pageLink + "\" name=\"Open\">" + itemLabel + "</A>\n";
    } else {
        MIstr += itemLabel;
    }
     //str += "<a id=\"toggle_" + nameBase + "\" href=\"javascript:;\" onclick=\"toggle(\'toggle_img_" + nameBase + "\', \'item_" + nameBase + "_content\');\">";
     //str += "<img id=\"toggle_img_" + nameBase + "\" src=\"/skins/minimal/icons/expand.gif\" border=\"0\" align=\"top\" width=\"16\" height=\"16\"/></a>";
     CP_Log(FA_MENU,DEBUG,"Link added: " + MIstr);
    return MIstr;
}


// function correct_menu    Does fixes on CP menu
function correct_menu_item(masterNode)
{
    if (CP_getAttr("C_TWEAK_PLANET_MENUS",1) == 0 ) return;
    var properParent = masterNode.parentNode.parentNode;
    var divNodes = Array();
    divNodes = properParent.getElementsByTagName("div");
    CP_Log(FA_MENU,LOG,"Click intercepted, \n First Object: "+masterNode+
          "\n divs" + divNodes.length
          +"tags[i+0].innerHTML" + divNodes[0].innerHTML
          );
    var tag_id = divNodes[0].getAttribute("id");
    var pid = /item_planets_(\d+)_content/(tag_id);
    var planet_id = +pid[1];
    if (g_planets_modified[planet_id] != 1)
    {
        CP_Log(FA_MENU,LOG,"-------planet id:------------"+planet_id);
        g_planets_modified[planet_id] = 1;
        divNodes[0].innerHTML = "";
        for (j=0;j<g_menuitems_counter;j++)
        if(CP_getAttr("menuitem_"+j,1)==1)
        {
          divNodes[0].innerHTML += addMenuItem_(planet_id,j);
        }
    }
}

// function correct_menu    Does fixes on CP menu
function correct_menu()
{
    //GM_log("In menu.jsp: ");
    //var menu_planety = document.getElementById("items_planet_content");
    var tags = Array();
    tags = document.getElementsByTagName ("div");
    for (i=0;i<tags.length;i++)
    {
        tag_id = tags[i].getAttribute("id");
        // planets
        if (RegExp("item_planets_").test(tag_id)
            &&
            !RegExp("content").test(tag_id)
           )
        {
           // var planet_id = tag_id.substring(tag_id.lastIndexOf("_")+1);
//           CP_Log(FA_MENU,LOG,"----planet_id : "+planet_id+"----\n HTML: "+tags[i].innerHTML);
//           CP_Log(FA_MENU,DEBUG,"Second sibling of the first child"
//                   + tags[i].firstChild.nextSibling.nextSibling.innerHTML);
            var anchor_obj = tags[i].firstChild.nextSibling.nextSibling;
            anchor_obj.addEventListener('click', function(event) {correct_menu_item(event.target)},true);
        } else
        // died perosons
        if (RegExp("persons_transferring").test(tag_id))
        {
          tags[i].parentNode.innerHTML +=
           "<div id=\"item_persons_mia\" class=\"menu_item_level_2_element\">"
          +"<img id=\"spacer_img_mia\" src=\"/images/spacer.gif\" "
          +"border=\"0\" align=\"top\" width=\"16\" height=\"16\"/> "
          +"<a href=\"/person/persons_list.htm?personTypeId=8\" target=\"main_panel\">Polegli w bitwie</a>"
          +"</div>"
        } else
        // Alliance Shoutbox
        if (RegExp("item_alliance").test(tag_id))
        {
          var div = document.createElement('div');
          div.setAttribute("id","item_shoutbox_alliance");
          div.setAttribute("class","menu_item_level_1_element");
          div.innerHTML =
           "<img id=\"spacer_img_alliance_shoutbox\" src=\"/images/spacer.gif\" "
          +"border=\"0\" align=\"top\" width=\"16\" height=\"16\"/> "
          +"<a href=\"http://sowa.servebeer.com\" target=\"_new\">Forum SOWY</a>"
          tags[i].parentNode.insertBefore(div, tags[i].nextSibling);
        } else
        // Tweaks menu
        if (RegExp("task_votes").test(tag_id))
        {
          tags[i].parentNode.innerHTML +=
           "<div id=\"cptweaks_settings\" class=\"menu_item_level_2_element\">"
          +"<img id=\"spacer_img_cptweaks_settings\" src=\"/images/spacer.gif\" "
          +"border=\"0\" align=\"top\" width=\"16\" height=\"16\"/> "
          +"<a href=\"home.htm?action=cptweaks_config\" target=\"main_panel\">CP Tweaks</a>"
          +"</div>"
        } else
        // filtered planets
        if ( ( RegExp("item_planets").test(tag_id) )
           &&(!RegExp("item_planets_").test(tag_id))
           )
        {
          var div = document.createElement('div');
          div.setAttribute("id","item_ctxpl");
          div.setAttribute("class","menu_item_level_1");
          div.innerHTML = " "//"<div id=\"item_ctx_planet_list\" class=\"menu_item_level_1\"> \n"
            + addMenuItem_full('ctxpl','Planety filtrowane',
                 '/planet/show_planets_overview.htm?filter=1',true,"")
            + "\n<div id=\"item_ctxpl_content\" class=\"menu_item_level_2\">"
            // with epty queue
            + "<div id=\"item_ctxpl_1" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Bez zaj&#x0119;cia',
            'planet/show_planets_overview.htm?filter=1&filterTypeId=2&orderType=population',false, "")
            + "</div>"
            // losing resources
            + "<div id=\"item_ctxpl_3" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Zatkane magazyny',
            'planet/show_planets_overview.htm?filter=1&filterTypeId=6&orderType=name',false, "")
            + "</div>"
            // with problems
            + "<div id=\"item_ctxpl_2" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Z problemami',
            'planet/show_planets_overview.htm?filter=1&filterTypeId=1&orderType=name',false, "")
            + "</div>"
            // with low morale
            + "<div id=\"item_ctxpl_4" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Z niskim morale',
            'planet/show_planets_overview.htm?filter=1&filterTypeId=3&orderType=morale',false, "")
            + "</div>"


	    //  akademie
            + "<div id=\"item_ctxpl_5" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Akademie',
            'planet/show_planets_overview.htm?filter=1&nameFilter=akademia&orderType=population',false, "")
            + "</div>"
            //  laboratoria
            + "<div id=\"item_ctxpl_6" + "\" class=\"menu_item_level_2_element\">\n"
            + addMenuItem_full('ctx_ready','Laboratoria',
            'planet/show_planets_overview.htm?filter=1&nameFilter=laboratorium&orderType=population',false, "")
            + "</div>"

/*            // epty queue
            + "<div id=\"item_ctx_planet_list_1" + "\" class=\"menu_item_level_2_element\">";
            + addMenuItem_full("ctx_ready","Bez zaj&#x0119;cia",
            "/planet/show_planets_overview.htm?filter=1&filterTypeId=2&orderType=population", false, "");
            + "</div>"
            // epty queue
            + "<div id=\"item_ctx_planet_list_1" + "\" class=\"menu_item_level_2_element\">";
            + addMenuItem_full("ctx_ready","Bez zaj&#x0119;cia",
            "/planet/show_planets_overview.htm?filter=1&filterTypeId=2&orderType=population", false, "");
            + "</div>"  */

          + "</div>";// + "</div>";
          // "<img id=\"spacer_img_ctx_planet_list\" src=\"/images/spacer.gif\" "
         // +"border=\"0\" align=\"top\" width=\"16\" height=\"16\"/> "
         // +"<a href=\"/planet/show_planets_overview.htm?filter=1\" target=\"main_panel\">Planety filtrowane</a>"
          CP_Log(FA_MENU,LOG,"new div:\n"+ div.innerHTML);
          tags[i].parentNode.insertBefore(div, tags[i].nextSibling);
        }
    }
    tags = document.getElementsByName ("Open");
    CP_Log(FA_MENU,LOG,"planets: " + tags.length);
    for (i=0;i<tags.length;i++)
    {
      tag_id = tags[i].getAttribute("id");
      //CP_Log(FA_MENU,LOG,"tag_id: " + tag_id);
      // planets
      if (RegExp("link_planets_").test(tag_id))
      {
            var pid = /link_planets_(\d+)/(tag_id);
            CP_Log(FA_MENU,LOG,"planet id: " + pid);
            var planet_id = +pid[1];
            var planetNote = CP_getAttr("planetNote"+planet_id,"");
            var menuColor = /\[color=#([0123456789AaBbCcDdEeFf]+)\]/(planetNote);
            CP_Log(FA_MENU,LOG,"menu color " + menuColor);
            if (menuColor != null)
            {
                tags[i].innerHTML = "<font color=\"#" + menuColor[1] + "\">"
                + tags[i].innerHTML + "</font>";
            }
      }
    }
}

// =========================NOTES HANDLING================================
function removeTags(sourceNote)
{
  var tags = new Array( /\[color=#([0123456789AaBbCcDdEeFf]+)\]/
                      , /\[-\]/
                      );
  for (tag_iter=0;tag_iter<tags.length;tag_iter++)
    sourceNote = sourceNote.replace(tags[tag_iter], "");
  return sourceNote;
}

function handleNoteClick(name, imgTxt)
{
        newNote = prompt("Notatka",CP_getAttr(name,""));
        CP_setAttr(name,newNote);
        document.getElementById("NoteDiv"+name).innerHTML =
              imgTxt + removeTags(newNote);
  document.getElementById("Img"+name).addEventListener('click',
     function(event){handleNoteClick(name, imgTxt)},true);
}

function addNote(inElement, name)
{
  var imgTxt = "<img id=\"Img"+name+"\"src=\"" + C_NOTE_PICTURE2 + "\">";
  inElement.innerHTML +=
        "<div id=\"NoteDiv"+name+"\">"
      + imgTxt
      + removeTags(CP_getAttr(name,""))
      + "</div>";
  document.getElementById("Img"+name).addEventListener('click',
      function(event){handleNoteClick(name, imgTxt)},true);
}

// ===========================Ship funcs==================================

// ship types
const SHIP_FIGHTER           = 0; const SHIP_CORVETTE          = 1;
const SHIP_DESTROYER         = 2; const SHIP_CRUISER           = 3;
const SHIP_LINE_CRUISER      = 4; const SHIP_POCKET_BATTLESHIP = 5;
const SHIP_BATTLESHIP        = 6; const SHIP_LPG               = 7;
const SHIP_TRANSPORT         = 8; const SHIP_COLONIZER         = 9;
const SHIP_MAX              = 10;
var shipTypes = new Array ();

function add_ship_type(id,guns,firepower,armor,storage,speed,accel,max_speed,size,name)
{
    shipTypes[id] = new Object();
    shipTypes[id].Guns      = guns;
    shipTypes[id].Firepower = firepower;
    shipTypes[id].Armor     = armor;
    shipTypes[id].Storage   = storage;
    shipTypes[id].baseSpeed = speed;
    shipTypes[id].accel     = accel;
    shipTypes[id].maxSpeed  = max_speed;
    shipTypes[id].Size      = size;
    shipTypes[id].Name      = name;
}

function configure_ship_types()
{
    add_ship_type(SHIP_FIGHTER,1,400,1000,0,25,15,40,1,"Mysliwiec");
    add_ship_type(SHIP_CORVETTE,2,3200,2000,0,15,6,40,4,"Korweta")
    add_ship_type(SHIP_DESTROYER,6,4000,5000,0,10,2.5,40,8,"Niszczyciel");
    add_ship_type(SHIP_CRUISER,8,16000,40000,0,8,2,40,37,"Krazownik");
    add_ship_type(SHIP_LINE_CRUISER,12,26400,80000,0,6,1.5,40,60,"Krazownik Liniowy");
    add_ship_type(SHIP_POCKET_BATTLESHIP,16,40000,140000,0,6,1.5,40,60,"Pancernik Kieszonkowy");
    add_ship_type(SHIP_BATTLESHIP,18,45000,160000,0,4,1,40,100,"Pancernik");
    add_ship_type(SHIP_LPG,1,1000,1000,0,10,2,40,8,"Desantowiec");
    add_ship_type(SHIP_TRANSPORT,0,0,500,5000,10,2,20,4,"Transportowiec");
    add_ship_type(SHIP_COLONIZER,0,0,25000,0,5,1,20,20,"Kolonizator");
    add_ship_type(SHIP_MAX,0,0,0,0,0,0,"");  // stub element to useful in calculations
}

function tmout_mark_nonfull_fleets (source)
{
  var tags = Array();
  tags = source.getElementsByTagName("tr");
  CP_Log(FA_GROUP,LOG,"Rows:"+tags.length);
  if(tags.length >0)
  {
    for (var i=4; i<tags.length; i++)
    {
      var cellsInRow = tags[i].cells.length;
      for (var j=0; j<cellsInRow; j++)
            GM_log("===i:"+i+"---j:"+j+"=== |"+ tags[i].cells[j].innerHTML+"|");
      if ((cellsInRow >= 2))//&&(/N/(tags[i].cells[0].innerHTML)))
      {
            var sizeCell = tags[i].cells[2];
            CP_Log(FA_GROUP,DEBUG,"SizeCell content:"+sizeCell.innerHTML);
            var sizes = /(\d+)\s\/\s(\d+)/(sizeCell.innerHTML);
            if ((+sizes[1]) < (+sizes[2]))
            {
              CP_Log(FA_GROUP,LOG,"Size cell:"+sizeCell.innerHTML);
              var outString = sizeCell.innerHTML.
                replace(/(\d+)\s\/\s(\d+)/, "<font color=\"yellow\">$&</font>");
                sizeCell.innerHTML = outString;
              CP_Log(FA_GROUP,LOG,"Replaced:"+outString);
            }
      }
    }
  } else {window.setTimeout(function(){tmout_mark_nonfull_fleets(source)}, 100);}
}

function mark_nonfull_fleets(source)
{
  window.setTimeout(function(){tmout_mark_nonfull_fleets(source)}, 100);
}

// function correct_fleet_group    Does fixes on CP fleet group
function correct_fleet_group()
{
    var tags = Array();
    var tables = Array();
    var ships = Array();
    var ship_names = Array(/My.liwiec : (\d+)/,/Korweta : (\d+)/,/Niszczyciel : (\d+)/
                          ,/Kr..ownik : (\d+)/,/Kr..ownik liniowy: (\d+)/
                          ,/Kieszonkowy : (\d+)/,/Pancernik : (\d+)/,/Desantowiec : (\d+)/
                          ,/Statek transportowy : (\d+)/,/Statek kolonizacyjny : (\d+)/);
    var bestFleet = Array();
    var tmp = Array();
    var max_size = 0;
    var transport_offset = 0;

    for (i=0; i<SHIP_MAX; i++) {ships[i]=0;bestFleet[i]=0;}
    configure_ship_types();

    tables = document.getElementsByTagName("table");
    CP_Log(FA_GROUP,LOG,"Tables:"+tables.length);
    CP_Log(FA_GROUP,LOG,"Table 4 content:"+tables[4].innerHTML);
    for (i=0; i<SHIP_MAX; i++)
    {
      tmp = tables[4].textContent.match(ship_names[i]);

      if (tmp != null)
      {
         CP_Log(FA_GROUP,LOG,shipTypes[i].Name+" : "+ +tmp[1]);
         ships[i] = +tmp[1];
         max_size += ships[i] * shipTypes[i].Size;
      }
    }
    // now we know all line cruisers were counted as criusers also
    ships[SHIP_CRUISER] -= ships[SHIP_LINE_CRUISER];
    max_size -= ships[SHIP_LINE_CRUISER] * shipTypes[SHIP_CRUISER].Size;
    // and the same story with pocket battleships
    ships[SHIP_BATTLESHIP] -= ships[SHIP_POCKET_BATTLESHIP];
    max_size -= ships[SHIP_POCKET_BATTLESHIP] * shipTypes[SHIP_BATTLESHIP].Size;

    var fleet_expander = document.getElementById("expand_fleets_list");
    CP_Log(FA_GROUP,LOG,"Expander button:"+ fleet_expander.style);
    if (!fleet_expander.style)
    {
    fleet_expander.addEventListener('click',
      function(event)
      {
        mark_nonfull_fleets(document.getElementById("group_members_details"))
      },true);
    }
    else // the list is already expanded
    {
        mark_nonfull_fleets(document.getElementById("group_members_details"));
    }
    tags = document.getElementsByTagName("td");
    
    CP_Log(FA_GROUP,DEBUG,"Tag:-6 content:"+tags[tags.length-6].innerHTML);
    var loaded = /Przewozi/(tags[tags.length-6].innerHTML);
    if (loaded)
    {
        transport_offset = 6;
    }
    if (max_size > 0)
    {
        //tags[tags.length-2-transport_offset].innerHTML += "<b> / "+max_size+"</b>";
        //GM_log("loaded:"+isnt_loaded+"\nrozmiar:HTML: " + tags[tags.length-2].innerHTML);
        tags[tags.length-4-transport_offset].setAttribute("ID","group_summary");
        //now some stats
        for (i=0; i<SHIP_MAX; i++)
        {
            shipTypes[SHIP_MAX].Guns      += shipTypes[i].Guns     *ships[i];
            shipTypes[SHIP_MAX].Firepower += shipTypes[i].Firepower*ships[i];
            shipTypes[SHIP_MAX].Armor     += shipTypes[i].Armor    *ships[i];
            shipTypes[SHIP_MAX].Storage   += shipTypes[i].Storage  *ships[i];
            if(ships[i]>0)
            {
              CP_Log(FA_GROUP,LOG,"Ship:"+ shipTypes[i].Name);
              g_max_fleet_speed = Math.min(g_max_fleet_speed,shipTypes[i].baseSpeed);
            }
        }
        CP_Log(FA_GROUP,LOG,"base fleet speed: " + g_max_fleet_speed);
        g_max_fleet_speed = g_max_fleet_speed
                              * CP_getAttr("C_CURRENT_FIGHTER_SPEED_FACTOR"
                              ,C_CURRENT_FIGHTER_SPEED_FACTOR)/C_SPEED_CALC_MAGNITUDE;
        g_max_fleet_speed = Math.floor(g_max_fleet_speed);
        // cut out the speed to eliminate calc bugs
        if (g_max_fleet_speed > 1000) g_max_fleet_speed = 1000;
        if (g_max_fleet_speed <= 0)g_max_fleet_speed = 1;
        CP_Log(FA_GROUP,LOG,"g_max_fleet_speed:"+g_max_fleet_speed+"; sklad: "+ bestFleet);
        CP_Log(FA_GROUP,LOG,"Total guns:"      + shipTypes[SHIP_MAX].Guns
              +"Total firepower:" + shipTypes[SHIP_MAX].Firepower
              +"Total armor:"     + shipTypes[SHIP_MAX].Armor
              +"Total storage:"   + shipTypes[SHIP_MAX].Storage);

        tables[4].getElementsByTagName("tr")[4].cells[1].innerHTML +=
             "<br/>Liczba dzia&#x0142;: <b>"+separate_thousands(shipTypes[SHIP_MAX].Guns)+"</b>"
            +"<br/>Si&#x0142;a ognia: <b>"+separate_thousands(shipTypes[SHIP_MAX].Firepower)+"</b>"
            +"<br/>Pancerz: <b>"+separate_thousands(shipTypes[SHIP_MAX].Armor)+"</b>";
        //addTooltip('group_summary', 'Tooltip na podsumowaniu');
        //GM_log(tags[tags.length-2-transport_offset].parentNode.parentNode.innerHTML);
    }
}

function prepare_name_string(SelectedOfficerID, fleetComanderString, ships)
{
  var fleetContentsString = "";
  var fleetSizeString = "";
  var shipAcronyms = new Array("M","k","N","K","L","PK","P","D","T","Kol");
  var fleetSize = 0;
  var nameParts = fleetComanderString.split(" ");
  var AcronymName="";
  for (i = 0; i < nameParts.length -2;i++) AcronymName += nameParts[i][0];
  AcronymName += nameParts[nameParts.length - 2];
  CP_Log(FA_SHIP,DEBUG,"Commander name parts:"+nameParts+"|Acronym:"+AcronymName);
  for (i = SHIP_MAX - 1; i>=0 ;i--)
  {
    if(ships[i]>0)
    {
      fleetContentsString += (ships[i]+shipAcronyms[i])+ " ";
      fleetSize += shipTypes[i].Size*ships[i];
    }
  }
  fleetSizeString = fleetSize;
  if (fleetSize < 100) fleetSizeString = "0" + fleetSizeString;
  if (fleetSize < 10 ) fleetSizeString = "0" + fleetSizeString;
  CP_Log(FA_SHIP,DEBUG,"Ships: "+ships+", string: "+fleetContentsString);

      var key = "Officer_" + SelectedOfficerID +"_ot";
      var value_ot = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_dt";
      var value_dt = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_me";
      var value_me = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_ls";
      var value_ls = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_fs";
      var value_fs = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_dm";
      var value_dm = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_sa";
      var value_sa = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_d";
      var value_d = CP_getAttr(key,"?");

      key = "Officer_" + SelectedOfficerID +"_br";
      var value_br = CP_getAttr(key,"?");


  var fleetDescriptionString = CP_getAttr( "C_FLEET_DESC_STRING"
                                         , C_FLEET_DESC_DEFAULT_STRING);
  CP_Log(FA_SHIP,DEBUG,"fleetDescriptionString:"+fleetDescriptionString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%R/, fleetSizeString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%S/, fleetContentsString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%D/, fleetComanderString);
    fleetDescriptionString  = fleetDescriptionString.replace(/%a/, AcronymName);
    fleetDescriptionString  = fleetDescriptionString.replace(/%d/, AcronymName);

    fleetDescriptionString  = fleetDescriptionString.replace(/%G/, value_ot);
    fleetDescriptionString  = fleetDescriptionString.replace(/%H/, value_dt);
    fleetDescriptionString  = fleetDescriptionString.replace(/%I/, value_me);
    fleetDescriptionString  = fleetDescriptionString.replace(/%J/, value_ls);

    fleetDescriptionString  = fleetDescriptionString.replace(/%A/, value_fs);
    fleetDescriptionString  = fleetDescriptionString.replace(/%B/, value_dm);
    fleetDescriptionString  = fleetDescriptionString.replace(/%C/, value_sa);
    fleetDescriptionString  = fleetDescriptionString.replace(/%E/, value_d);
    fleetDescriptionString  = fleetDescriptionString.replace(/%F/, value_br);
  return fleetDescriptionString;
}


// update name upon flet creation
function update_name(event)
{
  event.stopPropagation();
  event.preventDefault();
  var ships = Array(); var i = 0;
  var fleetComanderString = "";
  var FleetNameBox = document.getElementsByName("targetFleetName")[0];
  var CPShips2TweakShips = new Array(
  SHIP_FIGHTER, SHIP_COLONIZER, SHIP_CORVETTE, SHIP_DESTROYER, SHIP_CRUISER,
  SHIP_LINE_CRUISER, SHIP_BATTLESHIP, SHIP_TRANSPORT, SHIP_LPG, SHIP_POCKET_BATTLESHIP);
  for (i = 1; i <= SHIP_MAX; i++)
  {
    var tagId = "targetFleetMembersElement_"+i;
    var transferred_ships = document.getElementById(tagId);
    //CP_Log(FA_SHIP,DEBUG,"td("+tagId+"): "+transferred_ships);
    ships[CPShips2TweakShips[i-1]] = +transferred_ships.innerHTML;
  }
  var OfficerCombo = document.getElementsByName("targetOfficerId")[1];
  CP_Log(FA_SHIP,DEBUG,"Officer Combo content:" + OfficerCombo.innerHTML);
  
  var SelectedOfficerID = OfficerCombo.value;
  //OfficerCombo.getAttribute("value");
  
  var Officers = OfficerCombo.getElementsByTagName("option");
  //if (SelectedOfficerID >0)
  //{
    for (i=0; i<Officers.length;i++)
      if (Officers[i].getAttribute("selected") != null) break;
    if (i<Officers.length)
      fleetComanderString = Officers[i].innerHTML;
//}


  CP_Log(FA_SHIP,DEBUG,"Officer ID: "+SelectedOfficerID+", name: "+fleetComanderString
          +", combo value: "+OfficerCombo.getAttribute("value")
          +", officer selected" +Officers[i].getAttribute("selected"));

  var fleetDescriptionString = prepare_name_string(SelectedOfficerID, fleetComanderString,  ships);
  
  CP_Log(FA_SHIP,DEBUG,"fleetDescriptionString:"+fleetDescriptionString);
  FleetNameBox = document.getElementsByName("targetFleetName")[1];
  FleetNameBox.setAttribute("value",fleetDescriptionString);
  FleetNameBox.value = fleetDescriptionString;
}

// function correct_fleet_group    Does fixes on transfer screen
function enhance_fleet_transfer()
{
  CP_Log(FA_SHIP,DEBUG,"enhance_fleet_transfer():Hacking into the UI");
  var setNameAnchor = document.createElement('a');
  setNameAnchor.innerHTML = "Ustaw nazwe";
  setNameAnchor.setAttribute("href","");
  var FleetNameBox = document.getElementsByName("targetFleetName")[1];
  //CP_Log(FA_SHIP,DEBUG,"input node's parent : "+ FleetNameBox.parentNode.innerHTML);
  FleetNameBox.parentNode.insertBefore(setNameAnchor, FleetNameBox.nextSibling);
  setNameAnchor.addEventListener('click',update_name,true);
  configure_ship_types();
}

// ===========================Position funcs==================================
function getTgtPositionValues()
{
  var ret = new Array();
  for (i= 0; i < g_position_hiddeninputs.length; i++)
  {
     ret[i] = g_position_hiddeninputs[i].getAttribute("value");
  }
  return ret;
}

function positionsToDistance(pos1,pos2)
{
  var ret = new Array();
  for (i=0;i<6;i++)pos1[i]-=pos2[i];
  ret[0] = Math.round(Math.sqrt(pos1[0]*pos1[0]+pos1[1]*pos1[1]+pos1[2]*pos1[2]));
  ret[1] = Math.round(Math.sqrt(pos1[3]*pos1[3]+pos1[4]*pos1[4]+pos1[5]*pos1[5]));
  return ret;
}

function textToPos(posToken)
{
    var startIndex = posToken.indexOf("[", 0);
    if (startIndex < 0) {
        return;
    }

    var endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[0].setAttribute("value",posToken.substring(startIndex + 1, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[1].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf("]", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[2].setAttribute("value",posToken.substring(startIndex, endIndex));

    if (posToken.indexOf(":[", endIndex) <= endIndex){
        return;
    }

    startIndex = endIndex + 3;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[3].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf(",", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[4].setAttribute("value",posToken.substring(startIndex, endIndex));

    startIndex = endIndex + 1;
    endIndex = posToken.indexOf("]", startIndex);
    if (endIndex < 0) {
        return;
    }
    g_position_hiddeninputs[5].setAttribute("value",posToken.substring(startIndex, endIndex));
    GM_log("Position parsing successful!");
}

function secondsToTimeStr(inTime)
{
  var time = inTime;
  var sec = time%60; time = Math.floor(time/60);
  var mins = time%60; time = Math.floor(time/60);
  var hrs = time %24;
  var days = Math.floor(time/24);
  var retStr = "";
  if (days>0)retStr+= days+"d ";
  if (hrs>0)retStr+= hrs+"h ";
  if (mins>0)retStr+= mins+"m ";
  if (sec>0)retStr+= sec+"s ";
  return retStr;
}

function timeStrToSeconds(inStr)
{
  CP_Log(FA_POS,LOG,"Got to translate:"+inStr);
  var retVal = 0;
  var val = Array();
  if (inStr.match(/(\d+)d/))
    retVal += +(/(\d+)d/(inStr))[1] * 60 * 60 * 24;
  if (inStr.match(/(\d+)h/))
    retVal += +(/(\d+)h/(inStr))[1] * 60 * 60;
  if (inStr.match(/(\d+)m/))
    retVal += +(/(\d+)m/(inStr))[1] * 60;
  if (inStr.match(/(\d+)s/))
    retVal += +(/(\d+)s/(inStr))[1];
  CP_Log(FA_POS,LOG,"Calculated:"+retVal);
  return retVal;
}

function update_distance()
{
  var tgtPos = new Array();
  tgtPos = getTgtPositionValues();
  CP_Log(FA_POS,LOG,"tgtPos:"+tgtPos+", g_starting_position:"+g_starting_position);
  var tgtDist = new Array();
  tgtDist = positionsToDistance(tgtPos,g_starting_position);
  CP_Log(FA_POS,LOG,"tgtDist:"+tgtDist);
  var distStr = " Dystans: ";
  if ((tgtDist[0] > 0))
  {
    distStr += tgtDist[0] + " ly";
    var tgtTime = Math.ceil((tgtDist[0]*3600) / g_max_fleet_speed + 2 * 3600 + 5 * 60);
    if (tgtTime > 6*30*24*3600) tgtTime = 6*30*24*3600;
    CP_Log(FA_POS,LOG,"tgtTime:"+tgtTime);
    CP_setAttr("C_LAST_CALCULATED_TIME",tgtTime);
    distStr += "<br>Czas ok.: " + secondsToTimeStr(tgtTime);
  }
  else
  {
    distStr += tgtDist[1] + " au";
    CP_setAttr("C_LAST_CALCULATED_TIME",-1);
  }

  var distDiv = document.getElementById("target_distance");
  distDiv.innerHTML = distStr;
}

function setup_target_position()
{
   CP_Log(FA_POS,LOG,"setup_target_position!");
   positionHandEdited = true;
   var pos = new String();
   pos = document.getElementById("posDetails").getAttribute("value");
   pos = document.getElementById("posDetails").value;
   CP_Log(FA_POS,LOG,"Pos1:"+pos);
   textToPos(pos);
   update_distance();
}

function tgt_bookmark_changed()
{
    CP_Log(FA_POS,LOG,"target_bookmark_changed!");
    positions = new String("");
    prefixes = new Array("[",",",",","]:[",",",",","]");

    for (i =0; i<6;i++)
    {
        g_position_hiddeninputs[i] = document.getElementById(coordIDs[i]);
        positions += prefixes[i]+g_position_hiddeninputs[i].getAttribute("value");
    }
    positions += prefixes[6];

    CP_Log(FA_POS,LOG,"Target position:"+positions);
    if (positionHandEdited)
    {
        document.getElementById("posDetails").value = positions;
    }
    else
    {
        document.getElementById("posDetails").setAttribute("value",positions);
    }
    update_distance();
}

function fake_posid(event)
{
  if(positionHandEdited)
  {
    CP_Log(FA_POS,LOG,"FAKE POSID RUN!");
    event.stopPropagation();
    event.preventDefault();
    var form = document.getElementsByName("fleet_group_details_form")[0];
    if(form == undefined)
    {
      form = document.getElementsByName("fleet_details_form")[0];
      form.action= "/fleet/show_fleet_move_confirm.htm";
    }
    else form.action= "/fleetgroup/fleet_group_move_confirm.htm";

    form.submit();
  }
}

function half_distance(event)
{
    event.stopPropagation();
    event.preventDefault();
  var tgtPos = new Array();
  tgtPos = getTgtPositionValues();
  CP_Log(FA_POS,LOG,"tgtPos:"+tgtPos+", g_starting_position:"+g_starting_position);
  for (i=0;i<3;i++)
  g_position_hiddeninputs[i].setAttribute("value",Math.round((+g_starting_position[i]+ +tgtPos[i])/2));
   for (i=3;i<6;i++)
  g_position_hiddeninputs[i].setAttribute("value",0);
  tgt_bookmark_changed();
}

function get_fleet_ships()
{
    var fleetID = +(/fleetId=(\d+)/(window.location.href))[1];
    CP_Log(FA_POS,LOG,"fleetID:"+fleetID);
    var sizeTd = document.getElementById("fleet_sizes_"+fleetID);
    CP_Log(FA_POS,LOG,"sizeTd:"+sizeTd.innerHTML);
    CP_Log(FA_POS,LOG,"sizeTd.parent:"+sizeTd.parentNode.parentNode.innerHTML);
//    var htmlToSearch = sizeTd.parentNode.parentNode.innerHTML;
    var ships = new Array();
    for (i=0; i<SHIP_MAX; i++) {ships[i]=0;}
    configure_ship_types();
    var TDs = sizeTd.parentNode.parentNode.getElementsByTagName("td");
    for (i=0;i<TDs.length;i++)
    {
     var htmlToSearch = TDs[i].innerHTML;
     // fleet composition needed only for max speed
      if(htmlToSearch.match(/liwiec/))              {ships[SHIP_FIGHTER]  += 1;} else
      if(htmlToSearch.match(/Korweta/))             {ships[SHIP_CORVETTE] += 1;} else
      if(htmlToSearch.match(/Niszczyciel/))         {ships[SHIP_DESTROYER]+= 1;} else
      if(htmlToSearch.match(/liniowy/))             {ships[SHIP_LINE_CRUISER]     += 1;} else
      if(htmlToSearch.match(/ownik/))               {ships[SHIP_CRUISER]  += 1;} else
      if(htmlToSearch.match(/Kieszonkowy/))         {ships[SHIP_POCKET_BATTLESHIP]+= 1;} else
      if(htmlToSearch.match(/Pancernik/))           {ships[SHIP_BATTLESHIP]       += 1;} else
      if(htmlToSearch.match(/Desantowiec/))         {ships[SHIP_LPG]      += 1;} else
      if(htmlToSearch.match(/Statek transportowy/)) {ships[SHIP_TRANSPORT]+= 1;} else
      if(htmlToSearch.match(/Statek kolonizacyjny/)){ships[SHIP_COLONIZER]+= 1;}
    }
    for (i=0; i<SHIP_MAX; i++)
    {
        if(ships[i]>0) g_max_fleet_speed = Math.min(g_max_fleet_speed,shipTypes[i].baseSpeed);
    }
    CP_Log(FA_POS,LOG,"ships:"+ships+"g_max_fleet_speed:"+g_max_fleet_speed);
}

//autoname in fleet view
function update_fleet_name(event)
{
  event.stopPropagation();
  event.preventDefault();

  var officerName = "";

  // get officer name
  var OfficerCombo = document.getElementsByName("officerId")[0];
  CP_Log(FA_SHIP,DEBUG,"Officer Combo content:" + OfficerCombo.innerHTML);
  var SelectedOfficerID = OfficerCombo.value;
  var Officers = OfficerCombo.getElementsByTagName("option");
    for (i=0; i<Officers.length;i++)
      if (Officers[i].getAttribute("selected") != null) break;
    if (i<Officers.length)
      officerName = Officers[i].innerHTML;

    CP_Log(FA_SHIP,DEBUG,OfficerCombo);

    CP_Log(FA_SHIP,DEBUG,"Officer ID: "+SelectedOfficerID+", name: "+officerName
          +", combo value: "+OfficerCombo.getAttribute("value")+", officer selected" +Officers[i].getAttribute("selected"));

  var ships = Array();
  for (i=0; i<SHIP_MAX; i++) {ships[i]=0;}
  configure_ship_types();
  var ship_names = Array(/My.liwiec/,/Korweta/,/Niszczyciel/
                        ,/Kr..ownik/,/Kr..ownik liniowy/
                        ,/Kieszonkowy/,/Pancernik/,/Desantowiec/
                        ,/Statek transportowy/,/Statek kolonizacyjny/);

  var tables = new Array();
  var tab4 = new Array();
  tables = document.getElementsByTagName("Table");
  for (i=0; i<tables.length; i++)
  {
    CP_Log(FA_SHIP,DEBUG,"Table "+i+" content:" + tables[i].innerHTML);
  }
  tab4 = tables[(tables.length) - 1].getElementsByTagName("TR");
  for (i=0; i<tab4.length; i++)
  {

      for (j=0; j<tab4[i].cells.length; j++);
          //GM_log("=-=4/"+i+"/"+j+"=-= |"+ tab4[i].cells[j].textContent+"|");
  }
    for (i=0; i<tab4.length; i++)
    for (j=0; j<ship_names.length; j++)
    {
        //CP_Log(FA_SHIP,LOG,"i:"+i);
        if(tab4[i].cells[0].textContent.match(ship_names[j]))
        {
            ships[j]+= +tab4[i].cells[1].textContent;
            break;
        }
    }
   // correct double-detected ships
   ships[SHIP_CRUISER] -= ships[SHIP_LINE_CRUISER];
   ships[SHIP_BATTLESHIP] -= ships[SHIP_POCKET_BATTLESHIP];
   
   var input = new Array();
   input = document.getElementsByName("name");
   input[0].value = prepare_name_string(SelectedOfficerID, officerName,  ships);
}

// Hacks into goroup or fleet page extending it with option to manually choose
// coordinates
// In: combo - combo object to attach additional objects
function enhance_fleet_movement_common(combo)
{
    if (combo == undefined) return;
    var br = document.createElement('br');
    var inputElement = document.createElement('input');
    var half_dist = document.createElement('a');
    half_dist.innerHTML = "1/2";
    half_dist.setAttribute("href","");
    var anchors = combo.parentNode.parentNode.getElementsByTagName("a");
    for (i= 0; i <anchors.length; i++)
      CP_Log(FA_POS,LOG,i+":"+anchors[i].innerHTML);
    inputElement.setAttribute("type","text"); inputElement.setAttribute("size","36");
    inputElement.setAttribute("id","posDetails"); inputElement.setAttribute("name","posDetails");
    inputElement.setAttribute("style","text-align: center;");
    combo.parentNode.insertBefore(br, combo.nextSibling);
    br.parentNode.insertBefore(inputElement, br.nextSibling);
    CP_Log(FA_POS,LOG,combo.parentNode.parentNode.innerHTML);
    combo.addEventListener('change',tgt_bookmark_changed,true);
//    combo.parentNode.setAttribute("align","center");
    CP_Log(FA_POS,LOG,"Bookmarks combo hooked");
    var distanceElement = document.createElement('div');
    distanceElement.setAttribute("id","target_distance");
    anchors[0].parentNode.insertBefore(distanceElement,anchors[0]);
    inputElement.addEventListener('keyup',setup_target_position,true);
    CP_Log(FA_POS,LOG,"position input hooked");
    anchors[0].addEventListener('click',fake_posid,true);
    distanceElement.parentNode.insertBefore(half_dist,distanceElement);
    half_dist.addEventListener('click',half_distance,true);
    // trigger filling in
    tgt_bookmark_changed();
    g_starting_position = getTgtPositionValues();
    update_distance();
}

// function enhance_fleet_movement    Does fixes on CP fleet group movement
function enhance_fleet_movement_group()
{
  enhance_fleet_movement_common(document.getElementById("chosenBookmark"));
}

// function enhance_fleet_movement    Does fixes on CP fleet movement
function enhance_fleet_movement_fleet()
{
  get_fleet_ships();
  enhance_fleet_movement_common(document.getElementsByName("chosenBookmark")[0]);
  var inputField = new Array();
  inputField = document.getElementsByName("name")[0];
  var setNameAnchor = document.createElement('a');
  setNameAnchor.innerHTML = "Ustaw nazwe";
  setNameAnchor.setAttribute("href","");
  inputField.parentNode.insertBefore(setNameAnchor, inputField.nextSibling);
  setNameAnchor.addEventListener('click',update_fleet_name,true);

}

// This fucntion corrects speed factor basing on what has been predicted
// and the actual time grabbed from page
function correct_ship_speeds()
{
  var centerTag = document.getElementsByTagName("center")[0];
  CP_Log(FA_POS,LOG,"GOT:"+centerTag.innerHTML);
  var tekst = Array();
  tekst = /Czas: ([a-zA-Z0-9_ ]+)<br/(centerTag.innerHTML);
  var last_calculated_time = CP_getAttr("C_LAST_CALCULATED_TIME", 1+3600 * 2+60 * 5);
  if (last_calculated_time>0)
  {
    var seconds = timeStrToSeconds(tekst[1]) - 3600 * 2 - 60 * 5;
    var precalcSecs = last_calculated_time - 3600 * 2 - 60 * 5;
    var mod_factor = (precalcSecs /seconds);
    CP_Log(FA_POS,LOG, "Precalculated: " + precalcSecs
                     + ", actual: "      + seconds
                     + ", mod_factor: "  + mod_factor);
    var old_speed = CP_getAttr("C_CURRENT_FIGHTER_SPEED_FACTOR"
                              ,C_CURRENT_FIGHTER_SPEED_FACTOR)
                    / C_SPEED_CALC_MAGNITUDE;
    var new_speed = old_speed * mod_factor;
    CP_Log(FA_POS,LOG, "Old speed: " + old_speed + ", new speed: " + new_speed);
    new_speed = new_speed *C_SPEED_CALC_MAGNITUDE;
    // sometimes calculation yields wrong values - bug?
    if (new_speed == 0)
    {
      CP_Log(FA_POS,ERR, "Old speed: " + old_speed + ", mod_factor: " + mod_factor
              + ", last_calculated_time: " + last_calculated_time
              + ", mod_factor: " + mod_factor
              );
      new_speed = 1;
    }
    CP_setAttr("C_CURRENT_FIGHTER_SPEED_FACTOR",Math.floor(new_speed));
  }
  else
  {
     CP_Log(FA_POS,LOG, "Local flight");
  }
}

// ===========================Personnel funcs==================================
// function correct_persons    Does fixes on CP person list
function correct_persons()
{
    var tags = Array();
    var anchors = Array ();
    var pid_parsed = Array();
    var pids = Array();
    var stats = Array();
    var officers = Array();
    var max_pid = 0;
    var stat_obj;
    var val = Array();
    var max_officers = 0;
    var best_officer = 0;
    var cumul_stats = new Object();
        cumul_stats.ot = 0;
        cumul_stats.dt = 0;
        cumul_stats.fs = 0;
        cumul_stats.tfs = 0;
        cumul_stats.cost = 0;
    var good_stats = CP_getAttr("person_stats",20);


    tags = document.getElementsByTagName("script");
    CP_Log(FA_PERSON,LOG,"scripts:"+tags.length);
    for (i=0;i<tags.length;i++)
    {
      pid_parsed = /decision_making_(\d+)/(tags[i].innerHTML);
      if(pid_parsed)
      {
        //GM_log("script:"+ tags[i].innerHTML);
        pids[max_pid++] = pid_parsed[1];
        //GM_log("PID:"+ person_id);
      }
    }
    anchors = document.getElementsByTagName("a");
    for (i=0;i<anchors.length;i++)
    {
      href = anchors[i].getAttribute("href");
      pid_parsed = /person.htm\?personId=(\d+)/(href);
      if(pid_parsed)
      {

            var personNote = CP_getAttr("personNote"+pid_parsed[1],"");
            var person_color = /\[color=#([0123456789AaBbCcDdEeFf]+)\]/(personNote);
            CP_Log(FA_PERSON,LOG,"person_color: " + person_color);
            if (person_color != null)
            {
                anchors[i].innerHTML = "<font color=\"#" + person_color[1] + "\">"
                + anchors[i].innerHTML + "</font>";
            }
      }
    }

/*
http://localhost/CP Tweaks: script:
addTooltip('decision_making_26999', 'Podejmowanie decyzji');
addTooltip('social_abilities_26999', 'UmiejĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬ÄąË‡Ă„â€šĂ‹ÂÄ‚ËĂ˘â‚¬ĹˇĂ‚Â¬Ă„Ä…Ă„ÄľÄ‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â‚¬ĹˇĂ‚Â¬Ă„Ä…Ă„ÄľĂ„â€šĂ˘â‚¬Ä…Ä‚â€šĂ‚ÂtnoÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â€šÂ¬ÄąË‡Ä‚â€šĂ‚Â¬Ä‚â€žĂ„â€¦Ă„Ä…ÄąĹşci spoÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â€šÂ¬ÄąË‡Ä‚â€šĂ‚Â¬Ä‚â€žĂ„â€¦Ä‚â€ąĂ˘â‚¬Ë‡eczne');
addTooltip('determination_26999', 'Determinacja');
addTooltip('bravery_26999', 'Odwaga');
addTooltip('offensive_tactics_26999', 'Taktyka ofensywna');
addTooltip('defensive_tactics_26999', 'Taktyka defensywna');
addTooltip('military_expirience_26999', 'DoÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â€šÂ¬ÄąË‡Ä‚â€šĂ‚Â¬Ä‚â€žĂ„â€¦Ă„Ä…ÄąĹşwiadczenie wojskowe');
addTooltip('leadership_26999', 'ZdolnoÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â€šÂ¬ÄąË‡Ä‚â€šĂ‚Â¬Ä‚â€žĂ„â€¦Ă„Ä…ÄąĹşci przywÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ‹ÂÄ‚ËĂ˘â‚¬ĹˇĂ‚Â¬Ă„Ä…Ă‹â€ˇĂ„â€šĂ˘â‚¬ĹľÄ‚â€žĂ˘â‚¬Â¦Ă„â€šĂ‹ÂÄ‚ËĂ˘â‚¬ĹˇĂ‚Â¬Ă„Ä…Ă‹â€ˇdcze');
addTooltip('maxFleetSizeInfo', 'Rozmiar floty zaleÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬Ä…Ă„Ä…Ă„â€žy od doÄ‚â€žĂ˘â‚¬ĹˇÄ‚ËĂ˘â€šÂ¬ÄąÄľĂ„â€šĂ˘â‚¬ĹľÄ‚ËĂ˘â€šÂ¬Ă‚Â¦Ä‚â€žĂ˘â‚¬ĹˇÄ‚â€ąĂ‚ÂĂ„â€šĂ‹ÂÄ‚ËĂ˘â€šÂ¬ÄąË‡Ä‚â€šĂ‚Â¬Ä‚â€žĂ„â€¦Ă„Ä…ÄąĹşwiadczenia wojskowego.');
*/

    for (i=0;i<max_pid;i++)
    {
      stats[i] = new Object();
      stat_obj = document.getElementById("decision_making_"+pids[i]);
      //GM_log("obj"+stat_obj.parentNode.parentNode.innerHTML);
      stats[i].pid = pids[i];
      val = /(\d+)/(stat_obj.innerHTML); stats[i].dm = +val[1];
      stat_obj = document.getElementById("social_abilities_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].sa = +val[1];
      stat_obj = document.getElementById("determination_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].d  = +val[1];
      stat_obj = document.getElementById("bravery_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].br = +val[1];
      stat_obj = document.getElementById("offensive_tactics_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].ot = +val[1];
      stat_obj = document.getElementById("defensive_tactics_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].dt = +val[1];
      stat_obj = document.getElementById("military_expirience_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].me = +val[1];
      stat_obj = document.getElementById("leadership_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].ls = +val[1];
      stat_obj = document.getElementById("maxFleetSizeInfo_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].fs = +val[1];
      stat_obj = document.getElementById("payCoeff_"+pids[i]);
      val = /(\d+)/(stat_obj.innerHTML); stats[i].cost = +val[1];
      addNote(stat_obj,"personNote"+pids[i]);
/*      GM_log("Size info:"+stat_obj.parentNode.parentNode.parentNode.parentNode
      .parentNode.parentNode.parentNode.parentNode.parentNode
      .parentNode.innerHTML);  */
      //stats[i].fs =  0;

    }
    tags = document.getElementsByTagName("td");
/*    max_pid = 0;
    for (i=0;i<tags.length;i++)
    {
      var tag_id = tags[i].getAttribute("id");
      if(RegExp("maxFleetSizeInfo").test(tag_id))
      {
        val =/Rozmiar floty: (\d+)/(tags[i].innerHTML);

        {
          //GM_log("script:"+ tags[i].innerHTML);
          stats[max_pid++].fs = +val[1];
          //GM_log("PID:"+ person_id);
        }
      }
    }*/
    CP_Log(FA_PERSON,LOG,"Got "+max_pid+" sizes!");
    var officer_data = 0;
    officer_data = +CP_getAttr("store_officer_data","0");

    for (i=0;i<max_pid;i++)
    {
      CP_Log(FA_PERSON,LOG,"Stats:"+stats[i].dm +"/"+ stats[i].sa +"/"+ stats[i].d +"/"+ stats[i].br +" "
            + stats[i].ot +"/"+ stats[i].dt +"/"+ stats[i].me +"/"+ stats[i].ls +","
            + stats[i].fs );
      if(stats[i].ot+stats[i].dt >= 2*good_stats)
      {
        max_officers++;
        cumul_stats.ot += stats[i].ot;
        cumul_stats.dt += stats[i].dt;
        cumul_stats.fs += stats[i].fs;
      }
      if(stats[i].ot < good_stats)
      {
        var skill_color = "yellow";
        if(2*stats[i].ot < good_stats)
          skill_color = "red";
        skill_tag = document.getElementById("offensive_tactics_"+stats[i].pid);
        skill_tag.innerHTML = "<font color=\""+skill_color+"\">"+skill_tag.innerHTML
            + "</font>";

      }
      if(stats[i].dt < good_stats)
      {
        var skill_color = "yellow";
        if(2*stats[i].dt < good_stats)
          skill_color = "red";
        skill_tag = document.getElementById("defensive_tactics_"+stats[i].pid);
        skill_tag.innerHTML = "<font color=\""+skill_color+"\">"+skill_tag.innerHTML
            + "</font>";
      }
      cumul_stats.tfs += stats[i].fs;
      cumul_stats.cost += stats[i].cost;
 /*     if(stats[i].ot+stats[i].dt > stats[best_officer].ot+stats[best_officer].dt)
      {
        best_officer = i;
      }     */

        var key = "Officer_" + pids[i] +"_ot";
        var value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].ot))
                CP_setAttr(key, stats[i].ot);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_dt";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].dt))
                CP_setAttr(key, stats[i].dt);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_me";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].me))
                CP_setAttr(key, stats[i].me);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_ls";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].ls))
                CP_setAttr(key, stats[i].ls);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_fs";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].fs))
                CP_setAttr(key, stats[i].fs);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_dm";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].dm))
                CP_setAttr(key, stats[i].dm);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_sa";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].sa))
                CP_setAttr(key, stats[i].sa);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_d";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].d))
                CP_setAttr(key, stats[i].d);
        }
        else
            CP_setAttr(key, 0);

        key = "Officer_" + pids[i] +"_br";
        value = CP_getAttr(key,undefined);
        if (officer_data==1)
        {
            if ((value == undefined) || (value !=stats[i].br))
                CP_setAttr(key, stats[i].br);
        }
        else
            CP_setAttr(key, 0);
    }
//    if (max_officers >0)

      //end = document.getElementById("__END__");
      formularz = document.getElementsByTagName("form");
      end = formularz[0];
      var person_summary = "<div align=\"left\" name=\"summary\"> "
      + "Dobrych oficer&oacute;w: " + max_officers + " / " + max_pid;
      if (max_officers>0)
      {
          person_summary +=
            "<br> &#346;rednio taktyki: " + Math.floor(cumul_stats.ot/max_officers)
          + " / " + Math.floor(cumul_stats.dt/max_officers);
      }
      person_summary +=
            "<br/> Razem potencjalny rozmiar: " + cumul_stats.fs + " / "
          + cumul_stats.tfs
          + "<br>Koszt utrzymania: " + cumul_stats.cost;

      person_summary += "<br/> <br/> </div>";
      end.innerHTML += person_summary;

}
// ===========================Position funcs==================================
// function correct_position    Does fixes on CP position
function correct_position()
{
  var tag = document.getElementsByName("fleetId")[0];
  CP_Log(FA_POS,LOG,tag.nextSibling.innerHTML);
  //tag.setAttribute("multiple","multiple");
  //tag.setAttribute("size","4");
  tag = document.getElementsByName("fleetGroupId")[0];
  CP_Log(FA_POS,LOG,tag.nextSibling.innerHTML);
  //tag.setAttribute("multiple","multiple");
  //tag.setAttribute("size","4");
}

// ===========================CONFIGURATION==================================
function get_username()
{

  var username = document.getElementsByTagName("table")[3]
        .getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
  CP_Log(FA_COMMON,LOG,"Username:"+username);
  var usernameEndIndex = username.length;
  username = username.substring(1,usernameEndIndex);
  if(g_www)
    GM_setValue("C_WWW_USERNAME", username);
  else
    GM_setValue("C_USERNAME", username);
  CP_Log(FA_COMMON,LOG,username);
}

function update_config_cbox(obj)
{
  CP_setAttr(obj.id,obj.checked?1:0);
  ShowHideSwitch("OfficerStoreDataId", CP_getAttr("store_officer_data",0)?0:1);
}

function update_config_txtbox(obj)
{
  var number = obj.value;
  CP_Log(FA_COMMON,LOG,"Setting "+obj.id+"->"+number);
  CP_setAttr(obj.id,+number);
}

function update_config_txtbox_str(obj)
{
  var str = obj.value;
  CP_Log(FA_COMMON,LOG,"Setting "+obj.id+"->"+str);
  CP_setAttr(obj.id,str);
}

function add_textbox(id, size, defaultVal)
{
  var str = "<input size=\""+size+"\" id=\""+id+"\" value=\""
      + CP_getAttr(id,defaultVal)
      + "\">";
  return str;
}

function ShowHideSwitch(objId, show)
{
    if (show) {
        document.getElementById(objId).style.display = 'none' ;
    }  else  {
        document.getElementById(objId).style.display = '' ;
    }
}

function config()
{
    var officer_data = 0;
    // first fast draw config sheet
    var str = "CP Tweaks " + C_VERSION_STRING
    +" <a href = \"http://userscripts.org/scripts/show/19615\" target = \"_new\">Strona skryptu</a><br/>";
    str += "USTAWIENIA<br><table border=0><tr><td>MENU:";
    for (i=0;i<g_menuitems_counter;i++)
    {
        str += "<br><input type=\"checkbox\" id=\"menuitem_"+i+"\"";
        if(CP_getAttr("menuitem_"+i,1)==1) str+=" checked ";
        str += ">"+g_menuitems[i].Caption;
    }
    str += "</td><td valign=\"top\"> INNE: <br>Srednie taktyki dobrego oficera "
          + add_textbox("person_stats",5,20) + "<br/><hr/>Wzorzec nazwy floty "
          + add_textbox("C_FLEET_DESC_STRING",40, C_FLEET_DESC_DEFAULT_STRING) + "<br/>"
          + "<TABLE border=0><TR><TD>%R</TD><TD>- Rozmiar; </TD>"
          + "<TD>%S</TD><TD>- Sklad; </TD>"
          + "<TD>%D, %d</TD><TD>- Dowodca; </TD></TR></TABLE>"
          + "<TABLE border=0><TR><TD><input type=\"checkbox\" id=\"store_officer_data\"";
    if(CP_getAttr("store_officer_data",0)==1) { officer_data = 1; str+=" checked "; };
    str+= "> Zapisz statystyki oficera w FireFox</TD></TR></TABLE>";
    str += "<TABLE id=\"OfficerStoreDataId\" border=0>"
        + "<TR><TD>%A</TD><TD>- Max. Rozmiar Floty</TD><TD>%B</TD><TD>-   Podejmowanie decyzji</TD></TR>"
        + "<TR><TD>%C</TD><TD>- Umiejetnosci spo&#x0142;eczne</TD><TD>%E</TD><TD>- Determinacja</TD></TR>"
        + "<TR><TD>%F</TD><TD>- Odwaga</TD><TD>%G</TD><TD>- Taktyka ofensywna</TD></TR>"
        + "<TR><TD>%H</TD><TD>- Taktyka defensywna</TD><TD>%I</TD><TD>- Dowodzenie flota</TD></TR>"
        + "<TR><TD>%J</TD><TD>- Zdolnosci przywĂłdcze</TD></TR>"
        + "</TABLE>";
    str += "<hr/></td></tr></table>";
    document.getElementsByTagName("body")[0].innerHTML = str;
    // then attach handlers
    for (i=0;i<g_menuitems_counter;i++)
    {
        document.getElementById("menuitem_"+i).addEventListener('click', function(event) {update_config_cbox(event.target)},true);
    }
    document.getElementById("person_stats").addEventListener('change', function(event) {update_config_txtbox(event.target)},true);
    document.getElementById("C_FLEET_DESC_STRING").addEventListener('change', function(event) {update_config_txtbox_str(event.target)},true);
    document.getElementById("store_officer_data").addEventListener('click', function(event) {update_config_cbox(event.target)},true);
    ShowHideSwitch("OfficerStoreDataId", officer_data?0:1);
}

// returns building id basing on building name
function get_building(source)
{
  var bldNames = new Array(/Elektrownia/,/Wytw.rnia substancji organicznych/
	  	,/Kopalnia metalu/,/Kopalnia kryszta.u/,/Centrum budowlane/
 		  ,/Centrum administracyjne/,/Stocznia/,/Struktury obronne/,/Laboratorium/
 		  ,/Akademia/,/Kolektor energii/,/Magazyn substancji organicznych/
	  	,/Magazyn metalu/,/Magazyn kryszta.u/,/Gie.da/);
	for (tab_iter=0;tab_iter<bldNames.length;tab_iter++)
    if(source.match(bldNames[tab_iter]))
      return tab_iter;
}

// converts k to 1000 and M to 1000000
function k_to_tsd(k)
{
  return (k=="k")?1000:((k=="M")?1000000:1);
}

// ===========================PLANET==================================
function correct_planet()
{
  var val = new Array();   val = /planetId=(\d+)/(window.location.href);
  var buildingIds = new Array(10,11,12,13,14,35,15,21,20,30,16,17,18,19,40);
  //                          EL WO KM KK CB CA ST SO LA AK KE MO MM MK GI
  var buildingNames = new Array("EL","WO","KM","KK","CB","CA","ST","SO","LA","AK","KE","MO","MM","MK","GI");
  var resourceNames = new Array ("Energia", "Substancje Organiczne", "Metal", "Krysztal");
  // -------------------- planet object definition
  var planet = new Object();
  planet.buildings = new Object();
  planet.buildings.details = new Array();
  for (i=0;i<buildingIds.length;i++)
    { planet.buildings.details[i] = new Object();
      planet.buildings.details[i].upgcost = new Object();
      planet.buildings.details[i].upgcost.resources = new Array();
    }
  planet.resources = new Array();
  for (i=0;i<4;i++) planet.resources[i] = new Object();
  // --------------------
  var planet_id = +val[1];
  CP_Log(FA_PLANET,LOG,"Planet ID:"+planet_id);
  var tags = new Array();
  tags = document.getElementsByTagName("tbody");
  var descriptionTable = tags[2];
  tags = descriptionTable.getElementsByTagName("tr");
  var lastTr = tags[tags.length - 1];
//  var note = CP_getAttr("planetNote"+planet_id,"");
  var newTR = document.createElement('tr');
  var newTD = document.createElement('td');
  newTD.setAttribute("colspan","3");
  newTR.appendChild(newTD);
  lastTr.parentNode.insertBefore(newTR, lastTr.nextSibling);
  addNote(newTD,"planetNote"+planet_id);
  var total_building_levels = document.getElementById("total_building_levels");
  CP_Log(FA_PLANET,LOG,"total_building_levels"+total_building_levels.innerHTML);
  //Budynki na planecie:290(+2) / 295&nbsp;&nbsp;Kolejka budowania: 2 / 8
  val = /Kolejka budowania: (\d+) \/ (\d+)/(total_building_levels.innerHTML);
  planet.buildings.enqueued = +val[1];
  planet.buildings.max_queue =  +val[2];
  // http://www.regextester.com/
  val = /Budynki na planecie:\n(\d+)\n?.{0,7}\n\/ (\d+)/(total_building_levels.innerHTML);
  //CP_Log(FA_PLANET,LOG,"Buildings:"+val);
  
  // ======== total buildings =========
  planet.buildings.current = +val[1];
  planet.buildings.max = +val[2];
  
  // =========== resources ============
  for (i=0;i<4;i++)
  {
    tagid = "resource_desc_"+(i+1)+"_"+planet_id;
    //CP_Log(FA_PLANET,LOG,"tagid:"+tagid);
    val = /([\d,]+)([kM]?) \/ ([\d,]+)([kM]?)/(document.getElementById("resource_desc_"+(i+1)+"_"+planet_id).innerHTML);
    //CP_Log(FA_PLANET,LOG,"val:"+val);
    planet.resources[i].stores_current      = +val[1]*k_to_tsd(val[2]);
    planet.resources[i].stores_max          = +val[3]*k_to_tsd(val[4]);
    planet.resources[i].stores_max_final    = planet.resources[i].stores_max; //for further adjustment
    val = /(\d+) \((\d+) \/ (\d+)\)/(document.getElementById("resource_details_"+(i+1)+"_"+planet_id).innerHTML);
    //CP_Log(FA_PLANET,LOG,"val:"+val);
    planet.resources[i].output_net   = +val[1];
    planet.resources[i].output_gross = +val[2];
    planet.resources[i].usage        = +val[3];
  }
  //CP_Log(FA_PLANET,LOG,"building html:"+document.getElementById("building_details_19").parentNode.innerHTML);
  
  // ================= buildings details ===============
  for(i=0;i<buildingIds.length;i++)
  {
    var building_data
      = document.getElementById("building_details_"+buildingIds[i]).parentNode.innerHTML;
    planet.buildings.details[i].lvl  = +(/Poziom:.{5}(\d+)/(building_data)[1]);
    val = /([\d,]+)([kM]?)\/([\d,]+)([kM]?)\/([\d,]+)([kM]?)\/([\d,]+)([kM]?)/(building_data);
    for (j=0;j<4;++j)
      {
        val[2*j+1]=val[2*j+1].replace(/,/g,".");
        planet.buildings.details[i].upgcost.resources[j] = +val[2*j+1]*k_to_tsd(val[2*j+2]);
      }
    if(planet.buildings.details[i].lvl > 0)
      planet.buildings.details[i].cond = +(/Kondycja:.{5}(\d+)/(building_data)[1]);
    else
      planet.buildings.details[i].cond = 100;
    CP_Log(FA_PLANET,LOG,"building:"+buildingNames[i]
                        +", level:"+planet.buildings.details[i].lvl
                        +", resources:"+planet.buildings.details[i].upgcost.resources
                        +", condition:"+planet.buildings.details[i].cond);
  }
  //for (
  //CP_Log(FA_PLANET,LOG,"planet:"+planet);

  var tables = document.getElementsByTagName("table");
  //CP_Log(FA_PLANET,LOG,"Caught cell:"+tables[15].getElementsByTagName("tr")[0].cells[0].innerHTML);

  var trs = new Array();
  var build_queue = new Array();
  
  // =============== buildings upgrade/repair queue ==================
  for (var itables = 15; itables<tables.length;itables++)
  {
    trs = tables[itables].getElementsByTagName("tr");

    if(/Wykonywane zadania:/(trs[0].cells[0].innerHTML))
    {
      // there's something to do...
      for(i=2;i<trs.length;i++)
      {
        if(/Budowa/(trs[i].innerHTML))
        {
           var bld_bld = get_building(trs[i].innerHTML);
           build_queue[build_queue.length]=bld_bld;
           CP_Log(FA_PLANET,LOG,i+"budowa:"+trs[i].innerHTML
                      +"\n budynek:"+buildingNames[bld_bld]) ;
           if ((bld_bld>=10)&&(bld_bld<=13))
           {
            // stores
            planet.resources[bld_bld-10].stores_max_final *= Math.SQRT2;
           }
        }
        if(/Naprawa/(trs[i].innerHTML))
        {
           var rep_amnt = /Naprawa \((\d+)%\)/(trs[i].innerHTML)[1];
           var rep_bld = get_building(trs[i].innerHTML);
           CP_Log(FA_PLANET,LOG,i+"naprawa:"+trs[i].innerHTML
                    +"\n budynek:"+buildingNames[rep_bld]
                    +",%:"+rep_amnt);
        }
        if(/Niewystarcza/(trs[i].innerHTML))
        {
           CP_Log(FA_PLANET,LOG,i+"brakuje:"+trs[i].textContent) ;
           var resources_pattern = new Array(
              /Energia: ([\d\s&nbsp;]+)/,/Substancje organiczne: ([\d\s&nbsp;]+)/,
              /Metal: ([\d\s&nbsp;]+)/,/Kryszta.: ([\d\s&nbsp;]+)/);
           //var resources_lacking = new Array();
           var resorces_lacking_no = 0;
           for (j=0; j<resources_pattern.length;j++)
           {
               if (trs[i].textContent.match(resources_pattern[j]))
               {
                val = trs[i].textContent.match(resources_pattern[j])[1];
                planet.resources[j].lacks = +val.replace(/\s/g,"");
                planet.resources[j].time_needed = Math.floor(3600 *
                  (planet.resources[j].lacks / planet.resources[j].output_net));
                resorces_lacking_no++;
               }
               else
               {
                  planet.resources[j].lacks = 0;
                  planet.resources[j].time_needed = 0;
               }
               planet.resources[j].time_str = secondsToTimeStr(planet.resources[j].time_needed);
               if(planet.resources[j].lacks > 0)
               CP_Log(FA_PLANET,DEBUG,"Brakuje surowca: "+resourceNames[j]
                      +" ("+planet.resources[j].lacks
                      +"), czas oczekiwania przy wydobyciu "+planet.resources[j].output_net
                      +"/h: "+planet.resources[j].time_str);
           } //for j...
           
           if (resorces_lacking_no >0)
           {
             var seq = new Array(0,1,2,3);

             // a very unefficient sorting by swapping but for 4 elements it does not really matter
             for (j = 0; j<9; j++)
             {
                CP_Log(FA_PLANET,DEBUG,"seq:"+seq+"compared time:"+planet.resources[seq[j%3]].time_needed
                  +"<"+planet.resources[seq[(j%3)+1]].time_needed);
                if (planet.resources[seq[j%3]].time_needed < planet.resources[seq[(j%3)+1]].time_needed)
                {
                    var tmp = seq[j%3];
                    seq[j%3]= seq[(j%3)+1];
                    seq[(j%3)+1] = tmp;
                }
             }

             if (resorces_lacking_no >=2)
             {
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[0]], "<font color=\"red\">$&</font>");
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[resorces_lacking_no-1]], "<font color=\"green\">$&</font>");
                //var diff = planet.resources[seq[0]]-
             }
             if (resorces_lacking_no >2)
             {
                trs[i].innerHTML = trs[i].innerHTML.
                  replace(resources_pattern[seq[1]], "<font color=\"yellow\">$&</font>");
             }
             //base string
             var market_string = "/building/market.htm?planetId="+planet_id
                +"&res="+seq[0] + "&production="+planet.resources[seq[0]].output_net
                             +"&needed="+planet.resources[seq[0]].lacks;
             //now take two approaches
             if (resorces_lacking_no == 1)
             {
               //one resource is relatively simple scenario,
               // you need to sum up production and transaction gain
               market_string += "&appr=1";
             }
             else if(resorces_lacking_no > 1)
             {
                  // here we're just trying to limit time to 2nd resource
                  market_string += "&appr=2&time_to_save="
                    +(planet.resources[seq[0]].time_needed-planet.resources[seq[1]].time_needed);
             }


              market_string = "<a href=\""+market_string+"\"class=\"counter\">[Dokup]<a>";
              trs[i].cells[0].innerHTML += market_string;
             //http://NiewystarczajÄ…ca liczba surowcĂłw. Energia: 209Â 008, Metal: 508Â 278. Czas: 1d 23h 42m 43s

           }
        }
      }
    }
  }
  CP_Log(FA_PLANET,LOG,"Zakolejkowane"+ build_queue);
  // resource_desc_[res#]_[planet#] : 797k / 1,35M   // fancy regex: ([\d,]+)([kM]?) \/ ([\d,]+)([kM]?)
  // resource_details_[res#]_[planet#] 9399 (9540 / 75) // regex: (\d+) \((\d+) \/ (\d+)\)
  //tables[2].getElementsByTagName("tr")[0].cells[1].innerHTML
  /*for (i=0;i<tables.length;i++)
  {
     CP_Log(FA_PLANET,LOG,i+":"+tables[i].innerHTML);
  }   */
  /*var work_in_progress_offset = 0;
  if (/Wykonywane zadania/(tables[15].getElementsByTagName("tr")[0].cells[0].innerHTML)
     work_in_progress_offset = 1    */
}

function correct_market()
{
  var yield_cell = document.getElementsByTagName("h2")[0].parentNode;
  var timefor100k = /w ci.gu ([\d\sdhms]+)/(yield_cell.textContent)[1];
  CP_Log(FA_PLANET,LOG,"timefor100k:"+timefor100k);
  var speed = timeStrToSeconds(timefor100k);
  var production_per_hour = (360000000/speed);

  CP_Log(FA_PLANET,LOG,"predkosc gieldy:"+speed+"s/100k:"+production_per_hour+"/h");
  if (/&appr/(window.location.href))
  {
    //We're forwarded here to cover for resource lacks
    var req = new Object();
    req.res        = +/res=([\d]+)/(window.location.href)[1];
    req.production = +/production=([\d]+)/(window.location.href)[1];
    req.needed     = +/needed=([\d]+)/(window.location.href)[1];
    req.appr       = +/appr=([\d]+)/(window.location.href)[1];
    CP_Log(FA_PLANET,LOG,"Params received:"+req.res+"|"+req.production+"|"+req.needed+"|"+req.appr);
    var resourceTypeCombo = document.getElementsByName("resourceTypeId")[0];
    var amountEdit = document.getElementsByName("amount")[0];
    var directionCombo = document.getElementsByName("direction")[0];
    //CP_Log(FA_PLANET,LOG,"form items:"+resourceTypeCombo.innerHTML
    //      +"|"+directionCombo.innerHTML);
    //resourceTypeCombo.setAttribute("selectedIndex", (req.res+1)); //convert from 0-based to 1-based
    resourceTypeCombo.selectedIndex = req.res;
    //directionCombo.setAttribute("selectedIndex", -1); //buy
    directionCombo.selectedIndex = 1;
    //time to produce resource in mine only
    req.time_to_produce = (req.needed / req.production);
    //time to obtain resource from both mine and market
    req.time_short = (req.needed / (req.production + production_per_hour));
    req.amount_to_buy = req.time_short*production_per_hour;
    //CP_Log(FA_PLANET,LOG,"Needed:"+
    CP_Log(FA_PLANET,LOG,"original time:"+secondsToTimeStr(req.time_to_produce*3600)
            +"\ntime shorter:"+secondsToTimeStr(req.time_short*3600)+"amount:"+req.amount_to_buy);
    if (req.appr == 2)
    {
      req.time_to_save=+/time_to_save=([\d]+)/(window.location.href)[1];
      CP_Log(FA_PLANET,LOG,"time_to_save"+secondsToTimeStr(req.time_to_save));
      //if (req.time_short * 3600 > (req.time_to_produce-req.time_to_save/3600))
          //req.amount_to_buy = (req.time_to_save/3600)*req.production;
    }
    amountEdit.value = Math.floor(req.amount_to_buy);

  }
}

function correct_planet_overview(filter_no)
{
  var tags = new Array();
  var resources = new Array(new Object(), new Object, new Object, new Object);
  var res_div; var temp_tag;
  // add filter hack
  hiddeninput = getElementsByName("startIdx")[0];
  newhiddeninput = document.createElement('input');
  newhiddeninput.setAttribute("name","filter");
  newhiddeninput.setAttribute("type","hidden");
  newhiddeninput.setAttribute("value","1");
  hiddeninput.parentNode.insertBefore(newhiddeninput, hiddeninput.nextSibling);
  
  tags = document.getElementsByTagName("tr");
  
  //for (var it=0; it < tags.length;it++)
    //CP_Log(FA_COMMON,DEBUG,"tr "+it+":\n"+ tags[it].innerHTML);
  //  tags = document.getElementsByTagName("table");

  for (i=7;i<tags.length;i+=13)
  {
    //var tagID = tags[i].getAttribute("id");
    if(RegExp("planetId=").test(tags[i].innerHTML))
    {
      var val = new Array();   val = /planetId=(\d+)/(tags[i].innerHTML);
      var warning_presence = false;
      CP_Log(FA_COMMON,LOG,"ID: "+val[1]+", name:"+tags[i].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td: "+tags[i].innerHTML);
      var planet_id = +val[1];
      var planetNote = CP_getAttr("planetNote"+planet_id,"");
      var force_hide = (/\[-\]/(planetNote)!= null)?true:false;
      if (force_hide)
      {
       var theParentNode;
       for (it=12;it>=0;it--)
       {
          theParentNode = tags [i+it];
          theParentNode.parentNode.removeChild(theParentNode);
       }
       /*
        theParentNode = tags[i+29].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+27].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+2].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+1].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i].parentNode; theParentNode.parentNode.removeChild(theParentNode); */
        i--; // as we deleted the current row, make sure we revisit the new one that pops into this place
      }
      else
      {
        addNote(tags[i].cells[0],"planetNote"+planet_id);
      }

      
      //  Offset - what
      //  0 - name, coords, warnings (div id="planet_header_[planet_id]_tooltip"
      //  1 - population, morale
      //  2 - master cell for further data
      //  5 - Energy amount in % (<div id ="resource_amount_1_[planet_id]_tooltip"
      //  7 - Energy amount in number
      // 11 - Organics amount in % (<div id ="resource_amount_2_[planet_id]_tooltip"
      // 13 - Organics amount in number
      // 17 - Metal amount in % (<div id ="resource_amount_3_[planet_id]_tooltip"
      // 19 - Metal
      // 23 - Cristal
      // 25 - Cristal
      // 27 - actions
      // 28 - queue
      //CP_Log(FA_COMMON,DEBUG,"td1: "+tags[i+ 1].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td5: "+tags[i+ 5].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td7: "+tags[i+ 7].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td11: "+tags[i+11].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td13: "+tags[i+13].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td17: "+tags[i+17].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td19: "+tags[i+19].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td23: "+tags[i+23].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td25: "+tags[i+25].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td26: "+tags[i+26].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td27: "+tags[i+27].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td28: "+tags[i+28].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td29: "+tags[i+29].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"td30: "+tags[i+30].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"parent: "+tags[i].parentNode.innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"parentSibling: "+tags[i].nextSibling.innerHTML);
      /*  var planet_id = +val[1];
      var warning_div = document.getElementById("planet_header_"+planet_id+"_tooltip");
      if (warning_div != null) warning_presence = true;
      val = /Zapotrzebowanie: (\d+) \((\d+)/(tags[i+1].innerHTML);
      //CP_Log(FA_COMMON,DEBUG,"val "+val);
      var pop = /Populacja: (\d+)/(tags[i+1].innerHTML)[1];
      var pop_needed = val[1];
      var pop_needed_perc = val[2];
      var morale = +(/Morale: (-?\d+)/(tags[i+1].innerHTML)[1]);
    for (j = 1; j <=4;j++)
      {
        res_div = document.getElementById("resource_amount_"+j+"_"+planet_id+"_tooltip");
        resources[j-1].perc   = /(\d+)/(res_div.innerHTML)[1];
        temp_tag = tags[i+((j-1)*6)+7];
        val = /(\d+)\w? \/ (\d+)/(temp_tag.innerHTML);
        if (temp_tag.getAttribute("class") == "warning") resources[j-1].warn = true;
        else resources[j-1].warn = false;
        resources[j-1].amount = val[1];
        resources[j-1].max    = val[2];
      }
      queue = /W budowie: (\d+)/(tags[i+28].innerHTML)[1];
      var planetNote = CP_getAttr("planetNote"+planet_id,"");
      var force_hide = (/\[-\]/(planetNote)!= null)?true:false;

      //val = /(\d+) \/ (\d+)/(tags[i+28].innerHTML);
      var planet_show = false;
      if( (!force_hide)
          &&
          ( (warning_presence)
            ||(pop_needed_perc<100)
            ||(morale < 0)
            ||(resources[0].warn)
            ||(resources[1].warn)
            ||(resources[2].warn)
            ||(resources[3].warn)
            ||((resources[0].perc>95)&&(resources[2].perc>95)&&(resources[3].perc>95))
            ||(queue==0)
        ) ) planet_show = true;
      CP_Log(FA_COMMON,DEBUG,"Planet id: "+planet_id+
             ", Warning: "+warning_presence+
             ", Pop: "+pop+"/"+pop_needed+"("+pop_needed_perc+")"+
             ", Morale: "+morale+
             ", Energy: "+resources[0].amount+"/"+resources[0].max+"("+resources[0].perc+")"+(resources[0].warn?"!":"")+
             ", Organics: "+resources[1].amount+"/"+resources[1].max+"("+resources[1].perc+")"+(resources[1].warn?"!":"")+
             ", Metal: "+resources[2].amount+"/"+resources[2].max+"("+resources[2].perc+")"+(resources[2].warn?"!":"")+
             ", Cristal: "+resources[3].amount+"/"+resources[3].max+"("+resources[3].perc+")"+(resources[3].warn?"!":"")+
             ", Queue length: "+queue+
             ", Force hide: "+force_hide+
             ", Hide: "+!planet_show
             );

      if (!planet_show)
      {
       var theParentNode;
        theParentNode = tags[i+29].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+27].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+2].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i+1].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        theParentNode = tags[i].parentNode; theParentNode.parentNode.removeChild(theParentNode);
        i--; // as we deleted the current row, make sure we revisit the new one that pops into this place
      }
      else
      {
        addNote(tags[i],"planetNote"+planet_id);
      }   */
    }
  }
}


// ===========================Capture funcs==================================

// function grab_menu    Checks whether script is run in menu panel and calls correcting function
function grab_menu()
{
    if(
        (RegExp("menu.jsp").test(window.location.href ))
      )
    {
        CP_Log(FA_MENU,LOG,"Menu correction");
        correct_menu();
    }
}

// function grab_group_details    Checks whether script is run in menu panel and calls correcting function
function grab_group_details()
{
    if( (CP_getAttr("C_TWEAK_FLEET_GROUPS",1) !=0 ) &&
        (RegExp("fleet_group_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet group correction");
        correct_fleet_group();
    }

    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_group_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Movement correction");
        enhance_fleet_movement_group();
    }
}

// function grab_fleet_details    Checks whether script is run in menu panel and calls correcting function
function grab_fleet_details()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_details.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet correction");
        enhance_fleet_movement_fleet();
    }
}

// function grab_fleet_transfer    Checks whether script is run in fleet transfer screen
// and calls correcting function
function grab_fleet_transfer()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet/transfer_fleet.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet transfer correction");
        enhance_fleet_transfer();
    }
}

// function grab_fleet_move_confirm    Checks whether script is run in
//               move confirmation page and calls correcting function
function grab_fleet_move_confirm()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleetgroup/fleet_group_move_confirm.htm").test(window.location.href)
        ||RegExp("fleet/show_fleet_move_confirm.htm").test(window.location.href))
      )
    {
        CP_Log(FA_GROUP,LOG,"Fleet move correction");
        correct_ship_speeds();
    }
}

// function grab_planet    Checks whether script is run in planet page
//          and calls correcting function
function grab_planet()
{
    if((RegExp("planet/show_planet.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"Planet correction");
        correct_planet();
    }
}

// function grab_market    Checks whether script is run in market page
//          and calls correcting function
function grab_market()
{
    if((RegExp("building/market.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"---Market correction---");
        correct_market();
    }
}

// function grab_planet    Checks whether script is run in planet list page
//          and calls correcting function
function grab_planet_overview()
{
    if((RegExp("planet/show_planets_overview.htm").test(window.location.href))
      &&(RegExp("filter=").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"Planets overview correction");
        correct_planet_overview(1);
    }
}

// function grab_persons    Checks whether script is run on Persons page and runs correcting function
function grab_persons()
{
    if( (CP_getAttr("C_TWEAK_PEOPLE_LIST",1) !=0 ) &&
        (RegExp("persons_list.htm").test(window.location.href))
      )
    {
        CP_Log(FA_PERSON,LOG,"Persons correction");
        correct_persons();
    }
}

// function grab_position    Checks whether script is run on position page and runs correcting function
function grab_position()
{
    if( (CP_getAttr("C_TWEAK_MOVE",1) !=0 ) &&
        (RegExp("fleet_action_chooser").test(window.location.href))
      )
    {
        CP_Log(FA_POS,LOG,"Position correction");
        correct_position();
    }
}

// function grab_config    Checks whether script is run on a fake page and substitutes it with config page
function grab_config()
{
    if( RegExp("action=cptweaks_config").test(window.location.href))
    {
        CP_Log(FA_COMMON,LOG,"Config");
        config();
    }
}

// function grab_main    Checks whether script is run on main page
function grab_main()
{
    if(
        (RegExp("main.htm").test(window.location.href))
      )
    {
        CP_Log(FA_COMMON,LOG,"Get username");
        get_username();
    }
}

// function grab_www    Checks whether script is run with www pefix
function grab_www()
{
    if(
        (RegExp("www.").test(window.location.href))
      )
    {
         g_www = true;
         g_username = GM_getValue("C_WWW_USERNAME","");
    }
    else
    {
        g_username = GM_getValue("C_USERNAME","");
    }
}

grab_www()
grab_config();
grab_main();
grab_planet_overview();

window.addEventListener("load", grab_menu, false);
window.addEventListener("load", grab_group_details, false);
window.addEventListener("load", grab_fleet_details, false);
window.addEventListener("load", grab_fleet_transfer, false);
window.addEventListener("load", grab_fleet_move_confirm, false);
window.addEventListener("load", grab_persons, false);
window.addEventListener("load", grab_position, false);
window.addEventListener("load", grab_planet, false);
window.addEventListener("load", grab_market, false);
//window.addEventListener("load", grab_planet_overview, false);