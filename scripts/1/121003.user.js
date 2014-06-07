// ==UserScript==
// @name           Flinks 12345
// @namespace      pardus.at
// @description   Makes combat easier, also checks missiles on default and reverses round order so 20 is default.
// @note            This script is for non premiums if you have premium you may find errors.
// @include        http://*.pardus.at/*
// @include        http://*.pardus.at/ship2*
// @include        http://*.pardus.at/ship2ship_combat.php*
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
// @author         Matthew Buckley, Round Reverser credit to Yog
// @version        1.1
var main_frame = top.window.frames[2];
var partial_refresh = false;
var jumptileId = 112785;

// To find "jumptileID", right click on your current tile, "This Frame", "View Frame Source", and look for "var userloc". This is the ID of the tile you are currently on.
// Copy and paste to above, and you'll retreat to that tile.

//var myframe = window.name;
//var myurl;

//myurl = main_frame.document.URL;

var TARGET = 'js:fightFirst()';
var KILL = 'js:clickButton("Attack")';
var NAV = 'main.php'
var JUMP = 'js:jumpToTile()';
var BOT = 'main.php?use=8';

// Bot allocation default is set to "8" this can only be used on the nav screen, simply adjust your bot usage for your armor. 8 is a safe default.

//Key Bindings
var KEY_1 = TARGET;
var KEY_2 = KILL;
var KEY_3 = NAV;
var KEY_5 = JUMP;
var KEY_4 = BOT;

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
 }
 
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


var option;
var select;
var rtext;
var rtext2;
select = document.getElementsByTagName('select');
if (select[0].hasAttribute('style')) { option = select[1].getElementsByTagName('option') }
else { option = select[0].getElementsByTagName('option'); }

    for(var i = 0; i < option.length; i++)
	{
	option[i].setAttribute("value", option.length-i);
	}
    for(var i = 0; i < (option.length/2); i++)
	{
	rtext = option[i].textContent;
	rtext2 = option[option.length-1-i].textContent;
	option[option.length-1-i].innerHTML = rtext;
	option[i].innerHTML = rtext2;
	}



var checkOnPvP = true;   //Set to true to check all missiles when doing Player-vs-Player Combat; false otherwise.
var checkOnPvNPC = false;  //Set to true to check all missiles when doing Player-vs-NPC Combat; false otherwise.
var checkSurrender = false;  //Set to true to check the "Only fight until the enemy surrenders (raid)" checkbox; false otherwise;


function gmCheckAllMissiles() {
 if(document.getElementById("allmissiles")) {
     document.getElementById('allmissiles').checked = true;
    }
    
    unsafeWindow.checkAllMissiles();
}



if(checkOnPvP && document.URL.indexOf('ship2ship_combat.php') >= 0) {

 gmCheckAllMissiles();

}

if(checkOnPvNPC && document.URL.indexOf('ship2opponent_combat.php') >= 0) {
 gmCheckAllMissiles();

}

if(checkSurrender && document.URL.indexOf('ship2ship_combat.php') >= 0) {

 document.getElementById('letsurrender').checked = true;

}

// ==/UserScript==
// Script created by Matthew Buckley
// For Troubleshooting email easy-life@hotmail.co.uk
// Contact Flink (Artemis) // Easy (Orion)