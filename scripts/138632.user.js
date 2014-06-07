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
// @version        1.01
var main_frame = top.window.frames[2];
var partial_refresh = true;
var jumptileId = 162966;







// This part was reversed engineered by Aegnor (3/8/2011), drawing heavily on Yog's Fast Bot Use script, with minor changes by Wes R to fix armor pathfinding (7/3/2012).
// It automatically calculates the correct number of bots to use (to get as close to full armor as possible without overshooting).
// In the Nav and Combat screens, pressing KEY_5 instantly uses this number of bots.

var TARGET = 'js:fightFirst()';
var KILL = 'js:clickButton("button5")';
var NAV = 'main.php'
var JUMP = 'js:jumpToTile()';
var BOT = 'js:useBots()';

// Command Bindings
var KEY_1 = TARGET;
var KEY_2 = KILL;
var KEY_3 = NAV;
var KEY_4 = JUMP;
var KEY_5 = BOT;

// Key bindings
// Edit these to change which keys you actually press
var keybinding_1 = '1';
var keybinding_2 = '2';
var keybinding_3 = '3';
var keybinding_4 = '4';
var keybinding_5 = '5';

var maxArmor = 540; // Input your ship's maximum armor here
var armorLevel = 5; // Input your armor multiplier here (i.e. 1, 2, 3, 4, 5, 6)

var armorPerBot = 180/armorLevel; // Don't mess with this

function useBotsFromNav() {
var button = document.getElementsByTagName('div_bots')[0].childNodes[0];
var evt = button.ownerDocument.createEvent('MouseEvents');
evt.initMouseEvent('click',true,true, button.ownerDocument.defaultView,1,0,0,0,0,false,false,false,false,0,null);
if(button.tagName=="A" && button.dispatchEvent(evt)) window.location.href = button.href;
}

function useBots() {
if (document.location.href.match('main.php')) {
 var button = document.getElementsByTagName('div_bots')[0].childNodes[0];
 var evt = button.ownerDocument.createEvent('MouseEvents');
 evt.initMouseEvent('click',true,true, button.ownerDocument.defaultView,1,0,0,0,0,false,false,false,false,0,null);
 if(button.tagName=="A" && button.dispatchEvent(evt)) window.location.href = button.href;
}
else if (document.location.href.match('combat.php')) {
 clickButton('useres');
}
}

if (document.location.href.match('main.php') || document.location.href.match('combat.php')) {
var imgtag = document.getElementsByTagName('img');
for(var i = 0; i < imgtag.length; i++) {
 if(imgtag[i].getAttribute('alt') == 'Robots') {
    var divtag = document.createElement('div_bots');
    imgtag[i].parentNode.appendChild(divtag);
    if (document.location.href.match('main.php')) {
      var armor = document.getElementsByName('cloak')[0].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('table')[0];
      armorDamage = armor.rows[1].getElementsByTagName('font')[1].textContent;
      armor = armor.rows[1].getElementsByTagName('font')[2].textContent.replace('/', '');
      var botsNeeded = Math.floor((maxArmor - armorDamage) / armorPerBot); //
      if (botsNeeded != 0) {
        var botsAvailable = imgtag[i].parentNode.textContent.split(" ")[0].replace(':', '');
    var atag = document.createElement('a');
        divtag.setAttribute("style", "position:absolute;width:25px;");
        divtag.appendChild(atag);
        atag.setAttribute("style", "font-size:10px;white-space:nowrap");
    if (botsAvailable < botsNeeded) {
      botsNeeded = botsAvailable;
      atag.setAttribute("style", "font-size:10px; color:yellow !important");
    }
        atag.setAttribute("href", "main.php?amount=" + botsNeeded + "&resid=8&useres=Use");
        atag.innerHTML = "Use " + botsNeeded;
    }
    }
  if (document.location.href.match('combat.php')) {
   divtag.setAttribute("style", "position:absolute; margin:5px auto 0px auto; left:0px; width:100%;");
   divtag.setAttribute("id", "bots-container");
   var armorDamage = imgtag[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('table')[1].getElementsByTagName('font')[1].textContent.split(" ")[2];
   var botsNeeded = Math.floor((maxArmor - armorDamage) / armorPerBot); //
      if (botsNeeded != 0) {
       var botsAvailable = imgtag[i].parentNode.nextSibling.textContent;
    var inputtag = imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[1];
    imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[2].setAttribute("id", "dupa");
    imgtag[i].parentNode.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "dupa2");
    imgtag[i].parentNode.setAttribute("style", "border-bottom:16px solid transparent");
    imgtag[i].parentNode.nextSibling.setAttribute("style", "border-bottom:16px solid transparent");
    imgtag[i].parentNode.nextSibling.nextSibling.setAttribute("style", "border-bottom:16px solid transparent");
    if (botsAvailable < botsNeeded) {
      botsNeeded = botsAvailable;
      inputtag.setAttribute("style", "color:yellow !important");
    }
        inputtag.setAttribute("value", botsNeeded);
      }
     }

 }
}
}

// End of Aegnor's addition








window.addEventListener("keypress",doKeyboardAction,true);

function doKeyboardAction(e) {
if(window.name == '') return;

  var keynum = e.which;
  var targetLocation = '';

  var caller = e.target;
 
  char = String.fromCharCode(keynum).toLowerCase();
  var index = 0;

  if (char == keybinding_1)   { targetLocation = KEY_1; }
  else if (char == keybinding_2)   { targetLocation = KEY_2; }
  else if (char == keybinding_3)   { targetLocation = KEY_3; }
  else if (char == keybinding_4)   { targetLocation = KEY_4; }
  else if (char == keybinding_5)   { targetLocation = KEY_5; }

  if(targetLocation) {
     if(targetLocation.substr(0, 3) == 'js:') {
    eval(targetLocation);
     }
  else {
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

function fightFirst() {
 /*if (myurl.indexOf('building.php') >= 0) {
   for(var i = 0; i < document.links.length; i++) {
     var a = document.links[i];
     if(a.getAttribute('href').search(/building.php[?]detail_type=player/i) != -1) {
       //http://orion.pardus.at/building.php?detail_type=player&detail_id=17055
       //var playerid = document.links[i].getAttribute("href").replace("main.php?scan_details=", "").replace("&scan_type=player", "");
       //main_frame.document.location = 'ship2ship_combat.php?playerid=' + playerid;
       break;
     }
   }
 }
 else {
}*/
  for(var i = 0; i < document.links.length; i++) {
    var a = document.links[i];
    if((a.getAttribute('href').search(/scanId/) != -1 || a.getAttribute('href').search(/scan_details/) != -1) && a.getAttribute('href').search(/player/) != -1) {
      var playerid = document.links[i].getAttribute("href").replace('javascript:scanId(', '').replace(', "player")', '');
      playerid = playerid.replace('main.php?scan_details=', '').replace('&scan_type=player', '');
      main_frame.document.location = 'ship2ship_combat.php?playerid=' + playerid;
      break;
    }
  }
 //}
 //http://static.pardus.at/images/factions/sign_uni_16x16.png
}

function jumpToTile() {
 /*if (partial_refresh)
   navAjax(jumptileId);
 else
   nav(jumptileId);*/
 document.getElementById('navForm').elements[0].value = jumptileId;
 document.getElementById('navForm').submit();
}

// ==/UserScript==