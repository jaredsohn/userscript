// ==UserScript==
// @author         AMitrev
// @name           Damage & Influence 
// @namespace      damegeErep
// @description    Show Damage & Influence 
// @version        0.8
// @include        http://www.erepublik.com/*/citizen/profile/*
// @include        http://www.erepublik.com/*/military/battlefield/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Changelog:
// =============================================================================
// v0.8
// - Removed Auto Eat button
// - Removed damage calculation
// - Corrected fight count per kill calculation
// - Upadated health limit
// =============================================================================
// v0.7
// - Add Modify weapon influence value
// - Add custom value for Strength Next Day
// - Add Global Options box
// - Fixed BH prof for inaccessible battles
// =============================================================================
// v0.6
// - Add Auto Eat button 
// =============================================================================
// v0.5
// - Add Auto Fight button "Ninja Attack"
// - Add info on how many Fights are needed for kill opponent(not guaranteed for accuracy; Erep not give full information about enemy's weapon);
// =============================================================================
// v0.4
// - Add a link to BH players 
// =============================================================================

// Global vars
// =============================================================================
var rank = new Array();

rank['Recruit'] = 1;
rank['Private'] = 2;
rank['Private*'] = 3;
rank['Private**'] = 4;
rank['Private***'] = 5;
rank['Corporal'] = 6;
rank['Corporal*'] = 7;
rank['Corporal**'] = 8;
rank['Corporal***'] = 9;
rank['Sergeant'] = 10;
rank['Sergeant*'] = 11;
rank['Sergeant**'] = 12;
rank['Sergeant***'] = 13;
rank['Lieutenant'] = 14;
rank['Lieutenant*'] = 15;
rank['Lieutenant**'] = 16;
rank['Lieutenant***'] = 17;
rank['Captain'] = 18;
rank['Captain*'] = 19;
rank['Captain**'] = 20;
rank['Captain***'] = 21;
rank['Major'] = 22;
rank['Major*'] = 23;
rank['Major**'] = 24;
rank['Major***'] = 25;
rank['Commander'] = 26;
rank['Commander*'] = 27;
rank['Commander**'] = 28;
rank['Commander***'] = 29;
rank['Lt Colonel'] = 30;
rank['Lt Colonel*'] = 31;
rank['Lt Colonel**'] = 32;
rank['Lt Colonel***'] = 33;
rank['Colonel'] = 34;
rank['Colonel*'] = 35;
rank['Colonel**'] = 36;
rank['Colonel***'] = 37;
rank['General'] = 38;
rank['General*'] = 39;
rank['General**'] = 40;
rank['General***'] = 41;
rank['Field Marshal'] = 42;
rank['Field Marshal*'] = 43;
rank['Field Marshal**'] = 44;
rank['Field Marshal***'] = 45;
rank['Supreme Marshal'] = 46;
rank['Supreme Marshal*'] = 47;
rank['Supreme Marshal**'] = 48;
rank['Supreme Marshal***'] = 49;
rank['National Force'] = 50;
rank['National Force*'] = 51;
rank['National Force**'] = 52;
rank['National Force***'] = 53;
rank['World Class Force'] = 54;
rank['World Class Force*'] = 55;
rank['World Class Force**'] = 56;
rank['World Class Force***'] = 57;
rank['Legendary Force'] = 58;
rank['Legendary Force*'] = 59;
rank['Legendary Force**'] = 60;
rank['Legendary Force***'] = 61;
rank['God of War'] = 62;

var str     = new Array();
    str[0]  = 0;
    str[1]  = 0;
var wAtt    = new Array();
    wAtt[0] = 0;
    wAtt[1] = 0;

var eHealth = 100;

var MIN_FIGHTER_HEALTH = 0;
var CURRENT_HEALTH     = 100;
var HEALT_LIMIT        = 300;
var NINJA_PUNCH        = 0;
var NINJA_EAT          = 0;



// Functions
// =============================================================================
function str_replace(haystack, needle, replacement) {
	var temp = haystack.split(needle);
	return temp.join(replacement);
}

function getStatus() {
	CURRENT_HEALTH = unsafeWindow.SERVER_DATA.health;
	HEALT_LIMIT    = unsafeWindow.food_remaining;
}

function calcInf(r, s, a) {
  var rankKoef   = (r - 1)/20 + 0.3;
  var strKoef    = (s / 10) + 40;
  var weaponKoef = 1 + a/100;
  
  return Math.floor(rankKoef * strKoef * weaponKoef);
}

function calcDamage(mystr, estr, a) {
  var dmg        = 60 + (mystr - estr) / 10;
  var koefweapon = 1 + (a[0] - a[1]) / 400;

  return Math.floor(dmg * koefweapon);
}

function accView(box, info) {
  var str = $('.citizen_military:eq(0) h4').text().trim();
  
  if (str.length > 0)
    var nstr = parseInt( str_replace(str, ',', '') );
   
  var mRank = $('.citizen_military:eq(1) h4').text().trim();
    
  if ( mRank.length > 0 ) {
    var Influence = new Array();
    Influence[0] = calcInf(rank[mRank], nstr, 0);
    Influence[1] = calcInf(rank[mRank], nstr, 20);
    Influence[2] = calcInf(rank[mRank], nstr, 40);
    Influence[3] = calcInf(rank[mRank], nstr, 60);
    Influence[4] = calcInf(rank[mRank], nstr, 80);
    Influence[5] = calcInf(rank[mRank], nstr, 100);
      
    var tStr = nstr + info['DI_str_per_day'];
      
    Influence[6]  = calcInf(rank[mRank], tStr, 0);
    Influence[7]  = calcInf(rank[mRank], tStr, 20);
    Influence[8]  = calcInf(rank[mRank], tStr, 40);
    Influence[9]  = calcInf(rank[mRank], tStr, 60);
    Influence[10] = calcInf(rank[mRank], tStr, 80);
    Influence[11] = calcInf(rank[mRank], tStr, 100);
    
    var nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[6]+'</strong></small></div>';
  
    box.append('<h3