// ==UserScript==
// @author         AMitrev przerobil Basowy
// @name           Influence 
// @namespace      damegeErep
// @description    Show Damage & Influence 
// @version        0.7
// @include        http://www.erepublik.com/*/citizen/profile/*
// @include        http://www.erepublik.com/*/military/battlefield/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Changelog:
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

// Css :D
// =============================================================================
GM_addStyle(
  '#DI_options { float: left; margin-top: 10px; }' +
  '#DI_opt_content { float: left; background-color: #eee; padding: 10px 5px; width: 73px; -moz-border-radius: 5px 5px 5px 5px }'+
  '#DI_opt_content h2 { font-size: 12px; margin-bottom: 4px; text-shadow: #fff 0.2em 0.2em; } '+
  '.DI_option { font-size: 10px; -moz-border-radius: 5px 5px 5px 5px; border-top: 1px solid #E5E5E5; background: none repeat scroll 0 0 #FFFFFF; border-bottom: 1px solid #F0F0F0; display: block; float: left; padding: 0 3px; width: 65px; }' +
  '.DI_option input { width: 58px; font-size: 10px; margin: 2px; } '+
  '.DI_option input[type=checkbox] { margin: 0; width: 35px; }'
);

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

var MIN_FIGHTER_HEALTH = 20;
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
  
    box.append('<h3>Influence per fight</h3>');
    box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q0</strong> <h4>'+Influence[0]+'</h4>'+nextDay+'</div>');
     
    if ( info['DI_weapon_Q1'] != false ) {
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[7]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q1</strong> <h4>'+Influence[1]+'</h4>'+nextDay+'</div>');
    }
    
    if ( info['DI_weapon_Q2'] != false ) {
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[8]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q2</strong> <h4>'+Influence[2]+'</h4>'+nextDay+'</div>');
    }
    
    if ( info['DI_weapon_Q3'] != false ) {
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[9]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q3</strong> <h4>'+Influence[3]+'</h4>'+nextDay+'</div>');
    }
    
    if ( info['DI_weapon_Q4'] != false ) {
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[10]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q4</strong> <h4>'+Influence[4]+'</h4>'+nextDay+'</div>');
    }
    
    if ( info['DI_weapon_Q5'] != false ) {
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+Influence[11]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Q5</strong> <h4>'+Influence[5]+'</h4>'+nextDay+'</div>');
    }

    if ( info['DI_mod_weapon'] > 0 ) { 
      var modInf = new Array();
      modInf[0] = calcInf(rank[mRank], nstr, info['DI_mod_weapon']);
      modInf[1] = calcInf(rank[mRank], tStr, info['DI_mod_weapon']);
      nextDay = '<div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>'+modInf[1]+'</strong></small></div>';
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Mod. weapon</strong> <h4>'+modInf[0]+'</h4>'+nextDay+'</div>');
    }

    if ( info['DI_influence_Q5'] != false ) {
      box.append('<br clear="all"/><h3 style="margin-top: 15px;">Influence - Q5 weapon (100/50)</h3>');
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Influence 30 fights</strong> <h4>Q5: '+(30 * Influence[5])+'</h4> <div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>300 health with Q5: '+(30 * Influence[11])+'</strong></small></div></div>');
      box.append('<div class="clear"></div>');
      box.append('<div class="citizen_military"><strong>Max Influence</strong> <h4>Q5: '+(38 * Influence[5])+'</h4> <div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>380 health with Q5: '+(38 * Influence[11])+'</strong></small></div></div>');
    }
         
    if ( info['DI_influence_Q0'] != false ) { 
      box.append('<h3>Influence - Q0 weapon</h3>');
      box.append('<div class="citizen_military" style="margin-bottom: 2px;"><strong>Influence 30 fights</strong> <h4>Q0: '+(30 * Influence[0])+'</h4> <div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>Q0: '+(30 * Influence[6])+'</strong></small></div></div>');
      box.append('<div class="clear"></div>');
      box.append('<div class="citizen_military"><strong>Max Influence</strong> <h4>Q0: '+(38 * Influence[0])+'</h4> <div class="stat"><small>Tomorrow (+'+info['DI_str_per_day']+'str):</small><small><strong>Q0: '+(38 * Influence[6])+'</strong></small></div></div>');
    }
  }
}

function setLink2BH(att, def) {
  $('#attackerHero').html(att);
  $('#defenderHero').html(def);
}

function kill(str, att, wellness) {
  var koefStr    = 60 + ( str[0] - str[1] ) / 10;
  var koefWeapon = 1 + (att[0] - (att[1]*20) ) / 400;
  var dmg        =  koefStr * koefWeapon;

  var hit = Math.ceil( wellness/dmg );
  
  $('#myKillBox').html('<h4>KILL: '+hit+' fight!!! Possibly: D</h4>');
} 

function fight() {
  unsafeWindow.$j('#fight_btn').click();
}

function eat(){
	unsafeWindow.$j('#DailyConsumtionTrigger').click();
}

function getOptions() {
  var info = new Array();
  
  info['DI_str_per_day'] = GM_getValue('DI_str_per_day');
  if ( typeof info['DI_str_per_day'] == 'undefined' )
    info['DI_str_per_day'] = 0;
    
  info['DI_weapon_Q1'] = GM_getValue('DI_weapon_Q1');
  if ( typeof info['DI_weapon_Q1'] == 'undefined' )
    info['DI_weapon_Q1'] = false;
    
  info['DI_weapon_Q2'] = GM_getValue('DI_weapon_Q2');
  if ( typeof info['DI_weapon_Q2'] == 'undefined' )
    info['DI_weapon_Q2'] = false;
    
  info['DI_weapon_Q3'] = GM_getValue('DI_weapon_Q3');
  if ( typeof info['DI_weapon_Q3'] == 'undefined' )
    info['DI_weapon_Q3'] = false;
    
  info['DI_weapon_Q4'] = GM_getValue('DI_weapon_Q4');
  if ( typeof info['DI_weapon_Q4'] == 'undefined' )
    info['DI_weapon_Q4'] = false;
    
  info['DI_weapon_Q5'] = GM_getValue('DI_weapon_Q5');
  if ( typeof info['DI_weapon_Q5'] == 'undefined' )
    info['DI_weapon_Q5'] = false;
    
  info['DI_influence_Q5'] = GM_getValue('DI_influence_Q5');
  if ( typeof info['DI_influence_Q5'] == 'undefined' )
    info['DI_influence_Q5'] = false;
    
  info['DI_influence_Q0'] = GM_getValue('DI_influence_Q0');
  if ( typeof info['DI_influence_Q0'] == 'undefined' )
    info['DI_influence_Q0'] = false;

  info['DI_mod_weapon'] = GM_getValue('DI_mod_weapon');
  if ( typeof info['DI_mod_weapon'] == 'undefined' )
    info['DI_mod_weapon'] = 0;
        
  return info;
}


// MAIN function
// =============================================================================
function main() {
  if (typeof unsafeWindow.$j == 'undefined')
		window.setTimeout(main, 1000);
  else {
    var info = getOptions();                                                                
    $('#sidebar').append('<div id="DI_options"><div id="DI_opt_content"><h2>D&I Options</h2>'+
                          '<div class="DI_option"><strong>Str per day:</strong> <input type="text" id="DI_str_per_day" value="'+info['DI_str_per_day']+'" /></div>'+
                          '<div class="DI_option"><strong>Weapons:</strong><br />'+
                          'Q1 <input type="checkbox" id="DI_weapon_Q1" value="1" '+(info['DI_weapon_Q1'] == true ? 'checked="checked"' : '')+' />'+
                          'Q2 <input type="checkbox" id="DI_weapon_Q2" value="2" '+(info['DI_weapon_Q2'] == true ? 'checked="checked"' : '')+' />'+
                          'Q3 <input type="checkbox" id="DI_weapon_Q3" value="3" '+(info['DI_weapon_Q3'] == true ? 'checked="checked"' : '')+' />'+
                          'Q4 <input type="checkbox" id="DI_weapon_Q4" value="4" '+(info['DI_weapon_Q4'] == true ? 'checked="checked"' : '')+' />'+
                          'Q5 <input type="checkbox" id="DI_weapon_Q5" value="5" '+(info['DI_weapon_Q5'] == true ? 'checked="checked"' : '')+' /></div>'+
                          '<div class="DI_option"><strong>Weapon:</strong><br />'+
                          '<input type="text" id="DI_mod_weapon" value="'+info['DI_mod_weapon']+'" /></div>'+
                          '<div class="DI_option"><strong>Influence:</strong><br />'+
                          'Q5 <input type="checkbox" id="DI_influence_Q5" value="1" '+(info['DI_influence_Q5'] == true ? 'checked="checked"' : '')+' />'+
                          'Q0 <input type="checkbox" id="DI_influence_Q0" value="5" '+(info['DI_influence_Q0'] == true ? 'checked="checked"' : '')+' /></div>'+
                          '</div>'+
                          '</div>');
    
    $('#DI_str_per_day').live('keyup', function() {
      var val = parseInt( $('#DI_str_per_day').val() );
		  GM_setValue('DI_str_per_day', val );
    });
    
    $('#DI_weapon_Q1').live('change', function() {
      var val = $('#DI_weapon_Q1').attr('checked');
      GM_setValue('DI_weapon_Q1', val );
    });
    
    $('#DI_weapon_Q2').live('change', function() {
      var val = $('#DI_weapon_Q2').attr('checked');
      GM_setValue('DI_weapon_Q2', val );
    });
    
    $('#DI_weapon_Q3').live('change', function() {
      var val = $('#DI_weapon_Q3').attr('checked');
      GM_setValue('DI_weapon_Q3', val );
    });
    
    $('#DI_weapon_Q4').live('change', function() {
      var val = $('#DI_weapon_Q4').attr('checked');
      GM_setValue('DI_weapon_Q4', val );
    });
    
    $('#DI_weapon_Q5').live('change', function() {
      var val = $('#DI_weapon_Q5').attr('checked');
      GM_setValue('DI_weapon_Q5', val );
    });
    
    $('#DI_influence_Q5').live('change', function() {
      var val = $('#DI_influence_Q5').attr('checked');
      GM_setValue('DI_influence_Q5', val );
    });
    
    $('#DI_influence_Q0').live('change', function() {
      var val = $('#DI_influence_Q0').attr('checked');
      GM_setValue('DI_influence_Q0', val );
    });
    
    $('#DI_mod_weapon').live('keyup', function() {
      var val = parseInt( $('#DI_mod_weapon').val() );
		  GM_setValue('DI_mod_weapon', val );
    });  

    var box = $('.citizen_content');
    if ( box.html() != null )
      accView(box, info);
    else {
      unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) { 
        getStatus();
        
        if (opt.url.indexOf('/battle-heroes/') > -1) {
          var bh = eval("("+res.responseText+")");
          
          var aBH = '<a target="_blank" href="http://www.erepublik.com/en/search/?q='+str_replace(bh.attacker.name, '...', '')+'&amp;commit="><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.attacker.avatar+'"><small>'+bh.attacker.name+'</small><strong>'+bh.attacker.damage+'</strong></a>';
          var dBH = '<a target="_blank" href="http://www.erepublik.com/en/search/?q='+str_replace(bh.defender.name, '...', '')+'&amp;commit="><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.defender.avatar+'"><small>'+bh.defender.name+'</small><strong>'+bh.defender.damage+'</strong></a>'
          
          setLink2BH(aBH, dBH);
        }
        
       
      });        
    }
  }//end $j init ;)
}

// Start action :D
// =============================================================================
jQuery(document).ready(function () {  
  main();
});
