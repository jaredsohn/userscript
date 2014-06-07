// ==UserScript==
// @name           Pardus Keyboard Actions
// @namespace      tylerinternet.com
// @description    Enables keypresses for Pardus screens
// @include        http://*.pardus.at/*
// @exclude        http://*.pardus.at/game.php*
// @exclude        http://*.pardus.at/menu.php*
// @exclude        http://*.pardus.at/msgframe.php*
// @exclude        http://forum.pardus.at*
// @author         Rhindon
// @version        1.9

// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Variables
// ////////////////////////////////////////////////////////////////////////

var premium_user = true;
var default_collect_rounds = 1;  			//Available values are 1, 2 or 5

var enableRobotButtons = true;
var enableDrugButtons = true;

var ROBOTS_AMT1 = 1;	//Combat Screen 'Q' Button
var ROBOTS_AMT2 = 2;	//Combat Screen 'W' Button
var ROBOTS_AMT3 = 5;	//Combat Screen 'E' Button
var ROBOTS_AMT4 = 10;	//Combat Screen 'R' Button
var ROBOTS_AMT5 = 25;	//Combat Screen 'T' Button

var DRUGS_AMT1 = 1;		//Combat Screen 'Z' Button
var DRUGS_AMT2 = 2;		//Combat Screen 'X' Button
var DRUGS_AMT3 = 3;		//Combat Screen 'C' Button
var DRUGS_AMT4 = 4;		//Combat Screen 'V' Button
var DRUGS_AMT5 = 5;		//Combat Screen 'B' Button

// ////////////////////////////////////////////////////////////////////////
// Constants & Initializations -- Don't change unless you know 
//                                what you're doing!
// ////////////////////////////////////////////////////////////////////////

var main_frame = top.window.frames[2];
var msg_frame  = top.window.frames[1];
var nav_frame  = top.window.frames[0];

var myframe = window.name;
var myurl;

myurl = main_frame.document.URL;

var enabled = true;

var SHIP_EQUIPMENT 	  = 'ship_equipment.php';
var STARBASE_TRADE 	  = 'starbase_trade.php';
var PLANET_TRADE   	  = 'planet_trade.php';
var BUILDING_TRADE 	  = 'building_trade.php';
var BULLETIN_BOARD 	  = 'bulletin_board.php';
var BOUNTY_BOARD   	  = 'bounties.php';
var SHIPYARD       	  = 'shipyard.php';
var BLACK_MARKET   	  = 'blackmarket.php';
var HACK           	  = 'hack.php';
var FILL_UP_TANK   	  = 'main.php?fillup=1';
var DROP_CARGO     	  = 'drop_cargo.php';
var ACTIVATE_MAG   	  = 'overview_ship.php?msactivate=1&backtomain=1';
var DEACTIVATE_MAG   	  = 'overview_ship.php?msdeactivate=1&backtomain=1';
var NAV            	  = 'main.php'
var CALCULATED_TRADE      = calculate_trade_link();
var CALCULATED_TRADE_FORM = calculate_trade_form();
var CLICK_FIRST_BUTTON    = 'js:document.forms[0].elements[0].click();';
var ENABLE_DISABLE        = 'js:enableDisable();'
var PLANET_MENU		  = 'planet.php';
var STARBASE_MENU	  = 'starbase.php';
var BUILDING_MENU	  = 'building.php';
var JOBS		  = 'overview_jobs.php';
var COLLECT		  = getCollectType(default_collect_rounds);
var ATTACK_FIRST_SHIP = 'js:attackFirstShip()';

var DEFAULT_ACTION	  = getDefaultAction();

var NO_ACTION             = 'NOACTION';

var OVERVIEW              = 'overview.php';
var MESSAGES              = 'messages.php';
var NEWS                  = 'news.php';
var DIPLOMACY             = 'diplomacy.php';
var STATISTICS            = 'statistics.php';
var OPTIONS               = 'options.php';
var CHAT		  = 'chat.php';
var MYALLIANCE		  = 'myalliance.php';
var COMBAT		  = 'combat.php';
var LOGOUT			= 'logout.php';

var ROBOTS_RESID = 8;
var DRUGS_RESID = 51;

var KEY_A = new Array(); var KEY_M = new Array(); var KEY_Y = new Array();
var KEY_B = new Array(); var KEY_N = new Array(); var KEY_Z = new Array();
var KEY_C = new Array(); var KEY_O = new Array(); var KEY_0 = new Array();
var KEY_D = new Array(); var KEY_P = new Array(); var KEY_1 = new Array();
var KEY_E = new Array(); var KEY_Q = new Array(); var KEY_2 = new Array();
var KEY_F = new Array(); var KEY_R = new Array(); var KEY_3 = new Array();
var KEY_G = new Array(); var KEY_S = new Array(); var KEY_4 = new Array();
var KEY_H = new Array(); var KEY_T = new Array(); var KEY_5 = new Array();
var KEY_I = new Array(); var KEY_U = new Array(); var KEY_6 = new Array();
var KEY_J = new Array(); var KEY_V = new Array(); var KEY_7 = new Array();
var KEY_K = new Array(); var KEY_W = new Array(); var KEY_8 = new Array();
var KEY_L = new Array(); var KEY_X = new Array(); var KEY_9 = new Array();

var KEY_BACKTICK = new Array();

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

//default Key Bindings
KEY_A[0] = '';
KEY_B[0] = '';
KEY_C[0] = COLLECT;
KEY_D[0] = DIPLOMACY;
KEY_E[0] = '';
KEY_F[0] = FILL_UP_TANK;
KEY_G[0] = '';
KEY_H[0] = HACK;
KEY_I[0] = '';
KEY_J[0] = JOBS;
KEY_K[0] = '';
KEY_L[0] = DEFAULT_ACTION;
KEY_M[0] = MESSAGES;
KEY_N[0] = NAV;
KEY_O[0] = OVERVIEW;
KEY_P[0] = OPTIONS;
KEY_Q[0] = '';
KEY_R[0] = '';
KEY_S[0] = STATISTICS;
KEY_T[0] = CALCULATED_TRADE;
KEY_U[0] = '';
KEY_V[0] = '';
KEY_W[0] = NEWS;
KEY_X[0] = '';
KEY_Y[0] = '';
KEY_Z[0] = '';
KEY_0[0] = '';
KEY_1[0] = '';
KEY_2[0] = '';
KEY_3[0] = '';
KEY_4[0] = '';
KEY_5[0] = '';
KEY_6[0] = '';
KEY_7[0] = '';
KEY_8[0] = '';
KEY_9[0] = '';
KEY_BACKTICK[0] = ENABLE_DISABLE;


//menu.php Key Bindings
KEY_B[1] = ((getLocationType() == 'PLANET' || getLocationType() == 'STARBASE') ? BULLETIN_BOARD : '');
KEY_D[1] = DIPLOMACY;
KEY_E[1] = ((getLocationType() == 'PLANET' || getLocationType() == 'STARBASE') ? SHIP_EQUIPMENT : '');
KEY_F[1] = FILL_UP_TANK;
KEY_M[1] = MESSAGES;
KEY_O[1] = OVERVIEW;
KEY_P[1] = OPTIONS;
KEY_S[1] = STATISTICS;
KEY_T[1] = CALCULATED_TRADE;
KEY_W[1] = calculate_warp_link(NEWS);
KEY_K[1] = 'js:clickButton2("Cloak (AP: 100)", "Uncloak")';
      
//*trade.php Key Bindings
KEY_D[2] = DEACTIVATE_MAG;
KEY_M[2] = ACTIVATE_MAG;
KEY_N[2] = NAV;
KEY_T[2] = 'js:submitForm("' + CALCULATED_TRADE_FORM + '")';

//combat.php Key Bindings
KEY_R[3] = CLICK_FIRST_BUTTON;

if(enableRobotButtons) {
	KEY_Q[3] = 'js:useResourceInCombat(' + ROBOTS_RESID + ', ' + ROBOTS_AMT1 + ')';
	KEY_W[3] = 'js:useResourceInCombat(' + ROBOTS_RESID + ', ' + ROBOTS_AMT2 + ')';
	KEY_E[3] = 'js:useResourceInCombat(' + ROBOTS_RESID + ', ' + ROBOTS_AMT3 + ')';
	KEY_R[3] = 'js:useResourceInCombat(' + ROBOTS_RESID + ', ' + ROBOTS_AMT4 + ')';
	KEY_T[3] = 'js:useResourceInCombat(' + ROBOTS_RESID + ', ' + ROBOTS_AMT5 + ')';
}

if(enableDrugButtons) {
	KEY_Z[3] = 'js:useResourceInCombat(' + DRUGS_RESID + ', ' + DRUGS_AMT1 + ')';
	KEY_X[3] = 'js:useResourceInCombat(' + DRUGS_RESID + ', ' + DRUGS_AMT2 + ')';
	KEY_C[3] = 'js:useResourceInCombat(' + DRUGS_RESID + ', ' + DRUGS_AMT3 + ')';
	KEY_V[3] = 'js:useResourceInCombat(' + DRUGS_RESID + ', ' + DRUGS_AMT4 + ')';
	KEY_B[3] = 'js:useResourceInCombat(' + DRUGS_RESID + ', ' + DRUGS_AMT5 + ')';
}

if(premium_user) {
	KEY_1[3] = 'js:clickButton("button1")';
	KEY_2[3] = 'js:clickButton("button2")';
	KEY_3[3] = 'js:clickButton("button3")';
	KEY_4[3] = 'js:clickButton("button4")';
	KEY_5[3] = 'js:clickButton("button5")';
}

//ship_equipment.php Key Bindings
KEY_P[4] = PLANET_MENU;
KEY_R[4] = 'js:clickButton("Repair all")';

//logout.php Key Bindings (Ship in Dock)
KEY_L[5] = 'js:clickButton("Launch Ship")';

main_frame.focus();




function disabledForm() {

  var retval = false;

  //To disable keypresses on additional pages, duplicate a line 
  //  and add the new page to the list.
  if(myurl.indexOf(CHAT        ) >= 0) retval = true;
  if(myurl.indexOf(NEWS        ) >= 0) retval = true;
  if(myurl.indexOf(DIPLOMACY   ) >= 0) retval = true;
  if(myurl.indexOf(HACK        ) >= 0) retval = true;
  if(myurl.indexOf(BOUNTY_BOARD) >= 0) retval = true;
  if(myurl.indexOf(MYALLIANCE  ) >= 0) retval = true;
  if(myurl.indexOf('forum.pardus.at') >= 0) retval = true;
  
  return retval;  
  
}





// ////////////////////////////////////////////////////////////////////////
// Beginning of Imported Code
// ////////////////////////////////////////////////////////////////////////

function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
   }

// ////////////////////////////////////////////////////////////////////////
// End of Imported Code
// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

if(!disabledForm() && enabled) {
  window.addEventListener("keypress",doKeyboardAction,true);
	
  //If not on a trade screen, disable keypresses when focusing on textboxes
  if(myurl.indexOf(STARBASE_TRADE) < 0
    && myurl.indexOf(BUILDING_TRADE) < 0
    && myurl.indexOf(PLANET_TRADE) < 0) {
    var fields = document.getElementsByTagName('input');
  
    for(var f = 0; f < fields.length; f++) {
      if(fields[f].type == 'text') {
        fields[f].addEventListener("focus", disable, true);
        fields[f].addEventListener("blur", enable, true);
      }
    }
    
    var fields = document.getElementsByTagName('textarea');
  
    for(var f = 0; f < fields.length; f++) {
        fields[f].addEventListener("focus", disable, true);
        fields[f].addEventListener("blur", enable, true);
    }  
  }

}

function enable() {
  enabled = true;
}

function disable() {
  enabled = false;
}

function enableDisable() {

  if(enabled) {
    disable();
    alert('Keyboard Actions Disabled');
  } else {
    enable();
    alert('Keyboard Actions Enabled');
  }
}

function doKeyboardAction(e) {

  if(window.name == '') return;

  var keynum = e.which;
  var targetLocation = '';

  var caller = e.target;
  
  char = String.fromCharCode(keynum).toLowerCase();
  
  var index = 0;
  
  if(myurl.indexOf('main.php') 			>= 0) index = 1;
  if(myurl.indexOf('trade.php') 		>= 0) index = 2;
  if(myurl.indexOf('combat.php') 		>= 0) index = 3;
  if(myurl.indexOf('ship_equipment.php') 	>= 0) index = 4;
  if(myurl.indexOf('logout.php')		>= 0) index = 5;
  
  if      (char == 'a')   { targetLocation = (KEY_A[index] ? KEY_A[index] : KEY_A[0]); }
  else if (char == 'b')   { targetLocation = (KEY_B[index] ? KEY_B[index] : KEY_B[0]); }
  else if (char == 'c')   { targetLocation = (KEY_C[index] ? KEY_C[index] : KEY_C[0]); }
  else if (char == 'd')   { targetLocation = (KEY_D[index] ? KEY_D[index] : KEY_D[0]); }
  else if (char == 'e')   { targetLocation = (KEY_E[index] ? KEY_E[index] : KEY_E[0]); }
  else if (char == 'f')   { targetLocation = (KEY_F[index] ? KEY_F[index] : KEY_F[0]); }
  else if (char == 'g')   { targetLocation = (KEY_G[index] ? KEY_G[index] : KEY_G[0]); }
  else if (char == 'h')   { targetLocation = (KEY_H[index] ? KEY_H[index] : KEY_H[0]); }
  else if (char == 'i')   { targetLocation = (KEY_I[index] ? KEY_I[index] : KEY_I[0]); }
  else if (char == 'j')   { targetLocation = (KEY_J[index] ? KEY_J[index] : KEY_J[0]); }
  else if (char == 'k')   { targetLocation = (KEY_K[index] ? KEY_K[index] : KEY_K[0]); }
  else if (char == 'l')   { targetLocation = (KEY_L[index] ? KEY_L[index] : KEY_L[0]); }
  else if (char == 'm')   { targetLocation = (KEY_M[index] ? KEY_M[index] : KEY_M[0]); }
  else if (char == 'n')   { targetLocation = (KEY_N[index] ? KEY_N[index] : KEY_N[0]); }
  else if (char == 'o')   { targetLocation = (KEY_O[index] ? KEY_O[index] : KEY_O[0]); }
  else if (char == 'p')   { targetLocation = (KEY_P[index] ? KEY_P[index] : KEY_P[0]); }
  else if (char == 'q')   { targetLocation = (KEY_Q[index] ? KEY_Q[index] : KEY_Q[0]); }
  else if (char == 'r')   { targetLocation = (KEY_R[index] ? KEY_R[index] : KEY_R[0]); }
  else if (char == 's')   { targetLocation = (KEY_S[index] ? KEY_S[index] : KEY_S[0]); }
  else if (char == 't')   { targetLocation = (KEY_T[index] ? KEY_T[index] : KEY_T[0]); }
  else if (char == 'u')   { targetLocation = (KEY_U[index] ? KEY_U[index] : KEY_U[0]); }
  else if (char == 'v')   { targetLocation = (KEY_V[index] ? KEY_V[index] : KEY_V[0]); }
  else if (char == 'w')   { targetLocation = (KEY_W[index] ? KEY_W[index] : KEY_W[0]); }
  else if (char == 'x')   { targetLocation = (KEY_X[index] ? KEY_X[index] : KEY_X[0]); }
  else if (char == 'y')   { targetLocation = (KEY_Y[index] ? KEY_Y[index] : KEY_Y[0]); }
  else if (char == 'z')   { targetLocation = (KEY_Z[index] ? KEY_Z[index] : KEY_Z[0]); }
  else if (char == '0')   { targetLocation = (KEY_0[index] ? KEY_0[index] : KEY_0[0]); }
  else if (char == '1')   { targetLocation = (KEY_1[index] ? KEY_1[index] : KEY_1[0]); }
  else if (char == '2')   { targetLocation = (KEY_2[index] ? KEY_2[index] : KEY_2[0]); }
  else if (char == '3')   { targetLocation = (KEY_3[index] ? KEY_3[index] : KEY_3[0]); }
  else if (char == '4')   { targetLocation = (KEY_4[index] ? KEY_4[index] : KEY_4[0]); }
  else if (char == '5')   { targetLocation = (KEY_5[index] ? KEY_5[index] : KEY_5[0]); }
  else if (char == '6')   { targetLocation = (KEY_6[index] ? KEY_6[index] : KEY_6[0]); }
  else if (char == '7')   { targetLocation = (KEY_7[index] ? KEY_7[index] : KEY_7[0]); }
  else if (char == '8')   { targetLocation = (KEY_8[index] ? KEY_8[index] : KEY_8[0]); }
  else if (char == '9')   { targetLocation = (KEY_9[index] ? KEY_9[index] : KEY_9[0]); }

  else if (char == '`')   { targetLocation = (KEY_BACKTICK[index] ? KEY_BACKTICK[index] : KEY_BACKTICK[0]); }
  

  if(targetLocation && targetLocation != NO_ACTION && (enabled || targetLocation == ENABLE_DISABLE)) {

    if(targetLocation.substr(0, 3) == 'js:') {
      eval(targetLocation);
    } else {
      main_frame.document.location = targetLocation;
    }

  }

}

function submitForm(formName) {

  forms = main_frame.document.getElementsByTagName('form');

  if(IsNumeric(formName)) {
    forms[formName].submit();
    return;
  }
  
  for(var i = 0; i < forms.length; i++) {
    if(forms[i].name == formName) {
      forms[i].submit();
      return;
    }
  }

}

function clickButton2(label1, label2) {

  if(!clickButton(label1)) {
  	clickButton(label2);
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


function calculate_trade_link() {
  if(getLocationType() == 'STARBASE') return 'starbase_trade.php';
  if(getLocationType() == 'PLANET')   return 'planet_trade.php';
  if(getLocationType() == 'BUILDING') return 'building_trade.php';
}

function calculate_trade_form() {
  if(myurl.indexOf('starbase_trade.php') >= 0) return "starbase_trade";
  if(myurl.indexOf('planet_trade.php')   >= 0) return "planet_trade";
  if(myurl.indexOf('building_trade.php') >= 0) return "building_trade";
  
}

function getCollectType(turns) {

  var anchors = document.getElementsByTagName('a');
  
  for(var i = 0; i < anchors.length; i++) {
  	var index = anchors[i].href.indexOf('main.php?collect_type=');
  	var found = anchors[i].href.substr(index).indexOf('x=' + turns.toString()) >= 0;
  	
  	if(!found && turns == 1) found = true;
  	
  	if(index >= 0 && found) {
  	  return anchors[i].href.substr(index);
  	}
  }

  return '';
}

function calculate_warp_link(altLink) {
  anchors = document.getElementsByTagName('a');
  
  for(var i = 0; i < anchors.length; i++) {
    if(anchors[i].href.indexOf('warp(') >= 0) {
      return anchors[i].href;
    }
  }
  
  return altLink;
  
}

function useResourceInCombat(resourceId, amount) {
	
	inputs = document.getElementsByTagName('input');
	
	for(var i = 0; i < inputs.length; i++) {
	
	    thisInput = inputs[i];
	
		if(thisInput.name == 'resid' && thisInput.value == resourceId) {
		  
			if(i + 2 < inputs.length) {

				if(inputs[i + 1].name == 'amount' && inputs[i + 2].name == 'useres') {
					amountInput = inputs[i + 1];
					submitInput = inputs[i + 2];

					amountInput.value = amount;

					submitInput.click();
				}
			}
		}
	}
}

function getDefaultAction() {
	var lt = getLocationType();
	
	if(lt == 'BUILDING') 	return BUILDING_MENU;	
	if(lt == 'PLANET') 	return PLANET_MENU;
	if(lt == 'STARBASE') 	return STARBASE_MENU;

	return NO_ACTION;
}

function attackFirstShip() {
	alert("Attacking first ship...");
}

function getLocationType() {

  if(main_frame.document.URL.indexOf('main.php') < 0) return '';

  var img = document.getElementsByTagName('img');

  var image_src;

  var count=0;
  for(i = 0; i < img.length; i++) {

    if(img[i].getAttribute('class') == 'nf') {
        count++;
    }
    
  }

  var gridSize = Math.sqrt(count);

  var navTile = (gridSize * gridSize / 2) + 0.5;

  var count=0;
  for(i = 0; i < img.length; i++) {

    if(img[i].getAttribute('class') == 'nf') {

        count++;
        
        if(count == navTile) {
          image_src = img[i].src;
        }
      
    }

  }
 
  image_src = image_src.substr(image_src.lastIndexOf('/') + 1);
 
  if(image_src == 'alliance_command_station.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'alliance_command_station_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'asteroid_mine.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'asteroid_mine_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'battleweapons_factory.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'battleweapons_factory_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'brewery.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'brewery_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'chemical_laboratory.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'chemical_laboratory_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'clod_generator.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'clod_generator_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'cybernetic_station.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'dark_dome.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'dark_dome_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'droid_assembly_complex.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'droid_assembly_complex_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'drug_station.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'drug_station_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'electronics_facility.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'electronics_facility_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'energy_well.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'energy_well_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'exotic_crystal_source1.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'exotic_crystal_source2.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'exotic_crystal_source3.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'fuel_collector.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'fuel_collector_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'gas_collector.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'gas_collector_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'handweapons_factory.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'handweapons_factory_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'hidden_laboratory.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'leech_nursery.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'leech_nursery_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'lucidi_mo.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'lucidi_mo_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'lucidi_station1.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'lucidi_station2.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'medical_laboratory.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'medical_laboratory_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'military_outpost.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'military_outpost_federation.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'military_outpost_federation_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'military_outpost_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'nebula_plant.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'nebula_plant_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'optics_research_center.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'optics_research_center_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'pardus_station1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'planet_a.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'planet_d.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'planet_g.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'planet_i.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'planet_m.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'planet_r.png') 				{ location_type = 'PLANET';   return location_type; }
  if(image_src == 'plastics_facility.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'plastics_facility_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'radiation_collector.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'radiation_collector_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'recyclotron.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'recyclotron_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'research_station.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'robot_factory.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'robot_factory_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'sb_armor_factory_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_armor_factory_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_center.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_e.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_n.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_ne.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_nw.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_s.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_se.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_sw.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_center_w.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_commcenter.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'sb_defense_artillery_1.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_defense_artillery_2.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_defense_artillery_3.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_defense_artillery_4.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_engines_factory_hor.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_engines_factory_ver.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_heavy_defense_artillery_1.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_heavy_defense_artillery_2.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_heavy_defense_artillery_3.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_heavy_defense_artillery_4.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_light_defense_artillery_1.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_light_defense_artillery_2.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_light_defense_artillery_3.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_light_defense_artillery_4.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_repair_facility_hor.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_repair_facility_ver.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_scanner_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_scanner_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shield_factory_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shield_factory_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_huge_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_huge_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_medium_hor.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_medium_ver.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_small_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_shipyard_small_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_special_equipment_factory_hor.png') 	{ location_type = '';         return location_type; }
  if(image_src == 'sb_special_equipment_factory_ver.png') 	{ location_type = '';         return location_type; }
  if(image_src == 'sb_warehouse_hor.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_warehouse_ver.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'sb_weapons_factory_hor.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'sb_weapons_factory_ver.png') 		{ location_type = '';         return location_type; }
  if(image_src == 'serpent_den.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'slave_camp.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'slave_camp_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'smelting_facility.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'smelting_facility_federation.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'smelting_facility_federation_tradeoff.png') 	{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'smelting_facility_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'space_farm.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'space_farm_tradeoff.png') 			{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'starbase_f0_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f0_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f0_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f0_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f1_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f1_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f1_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f1_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f2_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f2_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f2_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f2_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f3_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f3_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f3_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_f3_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p0_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p0_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p0_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p0_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p1_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p1_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p1_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p1_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p2_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p2_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p2_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p2_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p3_s1.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p3_s2.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p3_s3.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'starbase_p3_s4.png') 			{ location_type = 'STARBASE'; return location_type; }
  if(image_src == 'trade_outpost.png') 				{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'trade_outpost_tradeoff.png') 		{ location_type = 'BUILDING'; return location_type; }
  if(image_src == 'wormhole.gif') 				{ location_type = '';         return location_type; }
  if(image_src == 'wormholeseal_closed.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'wormholeseal_open.png') 			{ location_type = '';         return location_type; }
  if(image_src == 'wreck_001.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_002.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_003.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_004.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_050.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_051.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_052.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_053.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_054.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_055.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_056.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_057.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_058.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_059.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_150.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_151.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_152.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_153.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_154.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_155.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_156.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'wreck_225.png') 				{ location_type = '';         return location_type; }
  if(image_src == 'xhole.gif') 					{ location_type = '';         return location_type; }
  if(image_src == 'yhole.gif') 					{ location_type = '';         return location_type; }
}