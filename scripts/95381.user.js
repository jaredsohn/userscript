// ==UserScript==
// @name           Pardus Quick Fighter Keys
// @namespace      pardus.at
// @description    makes pardus combat more fun
// @include        http://*.pardus.at/*
// @exclude        http://*.pardus.at/game.php*
// @exclude        http://*.pardus.at/menu.php*
// @exclude        http://*.pardus.at/msgframe.php*
// @exclude        http://forum.pardus.at*
// @exclude        http://*.pardus.at/starbase_trade.php*
// @exclude        http://*.pardus.at/drop_cargo.php*
// @exclude        http://*.pardus.at/overview_sb.php*
// @exclude        http://*.pardus.at/starbase_trade_settings.php*
// @exclude        http://*.pardus.at/starbase_eq_construction.php*
// @exclude        http://*.pardus.at/starbase_drop_res.php*
// @exclude        http://*.pardus.at/building_trade.php*
// @author         Luschn
// @version        1.0
var main_frame = top.window.frames[2];
var partial_refresh = true;
var jumptileId = 144203;
// To find jumptileID, right click on your current tile, "This Frame", "View Frame Source", and look for "var userloc". This is the ID of the tile you're currently on.
// Copy and paste to above, and you'll retreat to that tile if it's visible.


//TODO: press TARGET another time to get next pilot in list
//TODO: target enemy pilot on blocked MO - fightFirst first part - first union/fed ship, because they are sorted by name
//TODO: switch between OC,balanced,DC with buttons (8,9,0 maybe)

//var myframe = window.name;
//var myurl;

//myurl = main_frame.document.URL;

var TARGET = 'js:fightFirst()';
var KILL = 'js:clickButton("button5")';
var NAV = 'main.php'
var JUMP = 'js:jumpToTile()';
var BOT =   ("href", "main.php?amount=1&resid=8&useres=Use");
// Change the "1" in the above script to the number you wish to automatically use..


//Key Bindings
var KEY_1 = TARGET;
var KEY_2 = KILL;
var KEY_3 = NAV;
var KEY_4 = JUMP;
var KEY_5 = BOT;

window.addEventListener("keypress",doKeyboardAction,true);

function doKeyboardAction(e) {
  if(window.name == '') return;

  var keynum = e.which;
  var targetLocation = '';

  var caller = e.target;
  
  char = String.fromCharCode(keynum).toLowerCase();
  var index = 0;

  if (char == '1')   { targetLocation = KEY_1; }
  else if (char == '2')   { targetLocation = KEY_2; }
  else if (char == '3')   { targetLocation = KEY_3; }
  else if (char == '4')   { targetLocation = KEY_4; }
  else if (char == '5')   { targetLocation = KEY_5; }

  if(targetLocation)
  {
    if(targetLocation.substr(0, 3) == 'js:')
 {
  eval(targetLocation);
    }
 else
 {
  main_frame.document.location = targetLocation;
    }
  }
}

function clickButton(label) {
  
  var btn = document.getElementById(label);

  if(btn) {  
   btn.click();
   return true;
  }

  btn = document.getElementsByName(label);
  
  if(btn[0]) {  
   btn[0].click();
   return true;
  }

  inputs = document.getElementsByTagName('input');
  
  var temp = '';
  
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].value == label && inputs[i].type == 'submit') {
      inputs[i].click();
      return true;
    }
  }
  
  //An input button was not found...  Try 'button' tags
  buttons = document.getElementsByTagName('button');
  
  var temp = '';
  
  for(var i = 0; i < buttons.length; i++) {
    if(buttons[i].innerHTML == label) {
      buttons[i].click();
      return true;
    }
  }
}

function fightFirst()
{
 /*if (myurl.indexOf('building.php') >= 0)
 {
  for(var i = 0; i < document.links.length; i++)
  {
   var a = document.links[i];
   if(a.getAttribute('href').search(/building.php[?]detail_type=player/i) != -1)
   {
    //http://orion.pardus.at/building.php?detail_type=player&detail_id=17055
    //var playerid = document.links[i].getAttribute("href").replace("main.php?scan_details=", "").replace("&scan_type=player", "");
    //main_frame.document.location = 'ship2ship_combat.php?playerid=' + playerid;
    break;
   }
  }
 }
 else
 {*/ 
  for(var i = 0; i < document.links.length; i++)
  {
   var a = document.links[i];
   if((a.getAttribute('href').search(/scanId/) != -1 || a.getAttribute('href').search(/scan_details/) != -1) && a.getAttribute('href').search(/player/) != -1)
   {
    var playerid = document.links[i].getAttribute("href").replace('javascript:scanId(', '').replace(', "player")', '');
    playerid = playerid.replace('main.php?scan_details=', '').replace('&scan_type=player', '');
    main_frame.document.location = 'ship2ship_combat.php?playerid=' + playerid;
    break;
   }
  }
 //}
 //http://static.pardus.at/images/factions/sign_uni_16x16.png
}

function jumpToTile()
{
 /*if (partial_refresh)
  navAjax(jumptileId);
 else
  nav(jumptileId);*/
 document.getElementById('navForm').elements[0].value = jumptileId;
 document.getElementById('navForm').submit();
}
// ==/UserScript==