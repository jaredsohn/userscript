// ==UserScript==
// @author aka.srbin
// @name do 20 well
// @namespace damegeErep
// @description ma jebe kevu 
// @version 1.1
// @include http://www.erepublik.com/*/citizen/profile/*
// @include http://www.erepublik.com/*/military/battlefield/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Changelog:
// =============================================================================
// v1.0
// - Work :D


// Chrome :D
// =============================================================================
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome) {
unsafeWindow = window;

function GM_addStyle(css) {
var style = document.createElement('style');
style.textContent = css;
document.getElementsByTagName('head')[0].appendChild(style);
}

function GM_deleteValue(name) {
localStorage.removeItem(name);
}

function GM_getValue(name, defaultValue) {
var value = localStorage.getItem(name);
if (value == 'false')
return false;
return value || defaultValue;
}

function GM_log(message) {
console.log(message);
}

function GM_registerMenuCommand(name, funk) {
//todo
}

function GM_setValue(name, value) {
localStorage.setItem(name, value);
}
}

// Css :D
// =============================================================================
GM_addStyle(
'#DI_options { float: left; margin-top: 10px; }' +
'#DI_opt_content { float: left; background-color: #eee; padding: 10px 5px; width: 85px; -moz-border-radius: 5px 5px 5px 5px }'+
'#DI_opt_content h2 { font-size: 12px; margin-bottom: 4px; text-shadow: #fff 0.2em 0.2em; text-align: center; } '+
'#DI_show_hide { display: block; width: 99%; margin-top: 4px; text-align: center; }' +
'#DI_opt_content small { display: block; width: 100%; margin-top: 10px; text-align: center; }'+
'.DI_option { display: none; font-size: 10px; -moz-border-radius: 5px 5px 5px 5px; border-top: 1px solid #E5E5E5; background: none repeat scroll 0 0 #FFFFFF; border bottom: 1px solid #F0F0F0; float: left; padding: 0 3px; width: 79px; }' +
'.DI_option input { width: 58px; font-size: 10px; margin: 2px; } '+
'.DI_option li { width: 73px; } '+
'.DI_option input[type=checkbox] { margin: 0; width: 35px; }'+
'.info_message { left: 600px; top: 540px; width: 200px; z-index: 2001; position: absolute; }'+
'.info_message td { text-align: center; padding: 10px 10px 10px 70px !important; }'+
'#BHTable { width: 100%; border: 0; } ' +
'#BHTable tr { height: 20px; line-height: 18px; }'
);

// Global vars
// =============================================================================
var version = '1.1 ES';

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

var str = new Array();
str[0] = 0;
str[1] = 0;
var wAtt = new Array();
wAtt[0] = 0;
wAtt[1] = 0;

var eHealth = 100;

var MIN_FIGHTER_HEALTH = 20;
var CURRENT_HEALTH = 100;
var HEALT_LIMIT = 300;
var NINJA_PUNCH = 0;
var NINJA_EAT = 0;

// Functions
// =============================================================================
function str_replace(haystack, needle, replacement) {
var temp = haystack.split(needle);
return temp.join(replacement);
}

function getStatus() {
CURRENT_HEALTH = unsafeWindow.SERVER_DATA.health;
HEALT_LIMIT = unsafeWindow.food_remaining;
}

function calcInf(r, s, a) {
var rankKoef = (r - 1)/20 + 0.3;
var strKoef = (s / 10) + 40;
var weaponKoef = 1 + a/100;

return Math.floor(rankKoef * strKoef * weaponKoef);
}

function calcDamage(mystr, estr, a) {
var dmg = 60 + (mystr - estr) / 10;
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

Influence[6] = calcInf(rank[mRank], tStr, 0);
Influence[7] = calcInf(rank[mRank], tStr, 20);
Influence[8] = calcInf(rank[mRank], tStr, 40);
Influence[9] = calcInf(rank[mRank], tStr, 60);
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

function setLink2BH(a, d, att, def) {
$('#attackerHero').html(a);
$('#defenderHero').html(d);

$('#myStatBox').val('Att Top5: '+att+' vs Def Top5: '+def);
}

function kill(str, att, wellness) {
var koefStr = 60 + ( str[0] - str[1] ) / 10;
var koefWeapon = 1 + (att[0] - (att[1]*20) ) / 400;
var dmg = koefStr * koefWeapon;

var hit = Math.ceil( wellness/dmg );

$('#myKillBox').html('<h4>KILL: '+hit+' fight!!! Possibly: D</h4>');
}

function fight() {
unsafeWindow.$j('#fight_btn').click();
}

function WPBuy() {
unsafeWindow.$j('.health_kit_btn').click();
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

info['DI_offerID'] = GM_getValue('DI_offerID');
if ( typeof info['DI_offerID'] == 'undefined' )
info['DI_offerID'] = 0;

info['DI_amount'] = GM_getValue('DI_amount');
if ( typeof info['DI_amount'] == 'undefined' )
info['DI_amount'] = 0;

return info;
}

function CreateMenu(info) {
$('#sidebar').append('<div id="DI_options"><div id="DI_opt_content"><h2>D&I Options</h2>'+
'<div class="DI_option"><strong>Str per day:</strong> <input type="text" id="DI_str_per_day" value="'+info['DI_str_per_day']+'" /></div>'+
'<div class="DI_option"><strong>Weapons:</strong><br /><ul>'+
'<li>Q1 <input type="checkbox" id="DI_weapon_Q1" value="1" '+(info['DI_weapon_Q1'] == true ? 'checked="checked"' : '')+' /></li>'+
'<li>Q2 <input type="checkbox" id="DI_weapon_Q2" value="2" '+(info['DI_weapon_Q2'] == true ? 'checked="checked"' : '')+' /></li>'+
'<li>Q3 <input type="checkbox" id="DI_weapon_Q3" value="3" '+(info['DI_weapon_Q3'] == true ? 'checked="checked"' : '')+' /></li>'+
'<li>Q4 <input type="checkbox" id="DI_weapon_Q4" value="4" '+(info['DI_weapon_Q4'] == true ? 'checked="checked"' : '')+' /></li>'+
'<li>Q5 <input type="checkbox" id="DI_weapon_Q5" value="5" '+(info['DI_weapon_Q5'] == true ? 'checked="checked"' : '')+' /></li></ul></div>'+
'<div class="DI_option"><strong>Weapon:</strong><br />'+
'<input type="text" id="DI_mod_weapon" value="'+info['DI_mod_weapon']+'" /></div>'+
'<div class="DI_option"><strong>Influence:</strong><br /><ul>'+
'<li>Q5 <input type="checkbox" id="DI_influence_Q5" value="1" '+(info['DI_influence_Q5'] == true ? 'checked="checked"' : '')+' /></li>'+
'<li>Q0 <input type="checkbox" id="DI_influence_Q0" value="5" '+(info['DI_influence_Q0'] == true ? 'checked="checked"' : '')+' /></li></ul></div>'+
'<a href="javascript: void(0);" id="DI_show_hide">Show/Hide</a>'+
'<small>V: '+version+'</small></div>'+
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

$('#DI_show_hide').live('click', function() {
var ch = $('.DI_option');

if ( ch.css('display') == 'none' )
ch.css('display', 'block');
else
ch.css('display', 'none');
});
}

function BHStats(att, def) {
$('#BHTable').remove();
$('#content').append('<table id="BHTable"><tr><td>Type</td><td>Citizen</td><td>Kills</td><td>War influence</td></tr>'+att+def+'</table>');
}

function battleMenu(info) {
var html = '<table class="info_message"><tbody>'+
'<tr><td><a id="ninjaFight" href="javascript: void(0);" title="Ninja Attack">Ninja Attack</a> | '+
'<a id="WPFight" href="javascript: void(0);" title="WP KILL">WP Kill</a><br /><br />'+
'<a id="ninjaEat" href="javascript: void(0);" title="Ninja Eat">Auto Eat</a></td></tr>'+
'</tbody></table>';

$('#content').prepend(html);
$('.info_message').css('background', 'url(data:image/gif;base64,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%3D%3D) no-repeat #F2FCFF');

var nf = $('#ninjaFight');
nf.bind('click', function() {
NINJA_PUNCH = 1;
fight();
});

var gf = $('#WPFight');
gf.bind('click', function() {
NINJA_PUNCH = 2;
WPBuy();
});

var ne = $('#ninjaEat');
ne.bind('click', function() {
NINJA_EAT = 1;
eat();
});
}

jQuery.fn.cssChange = function(callback) {
var element = jQuery(this);
element.each(
function(e) {
var elmnt = jQuery(this);
elmnt.data("lastStyle", elmnt.css('width'));
window.watchStyleChange = window.watchStyleChange ? window.watchStyleChange : [];
window.watchStyleChange.push({"element": elmnt, "callback": callback});
}
)

return element;
}

// MAIN function
// =============================================================================
function main() {
if (typeof unsafeWindow.$j == 'undefined')
window.setTimeout(main, 1000);
else {
var info = getOptions();
CreateMenu(info);

var box = $('.citizen_content');
if ( box.html() != null )
accView(box, info);
else {

//show exact percentages
$('.progress').each(function() {
$(this).css({'text-align': 'center', 'overflow': 'visible'});
});

$('#blue_domination').css('opacity', '1');
$('#red_domination').css('opacity', '1');

var exactDomination = parseFloat($('#domination_bar').css('width'));
$('#blue_domination').text(exactDomination.toFixed(4) + '%');
$('#red_domination').text( (100 - exactDomination).toFixed(4) + '%');

setInterval(function() {
if(window.watchStyleChange) {
for(e in window.watchStyleChange) {
if(window.watchStyleChange[e].element.data("lastStyle") != window.watchStyleChange[e].element.css('width')) {
window.watchStyleChange[e].callback.apply(window.watchStyleChange[e].element);
window.watchStyleChange[e].element.data("lastStyle", window.watchStyleChange[e].element.css('width'))
};
}
}
},500);

$('#domination_bar').cssChange(function(){
exactDomination = parseFloat($('#domination_bar').css('width'));
$('#blue_domination').animate({'opacity': '0'}, 'fast').text(exactDomination.toFixed(4) + '%');
$('#red_domination').animate({'opacity': '0'}, 'fast').text((100 - exactDomination).toFixed(4) + '%');
setTimeout(function() { $('#blue_domination, #red_domination').animate({'opacity': '1'}, 'fast'); }, 1000);
});

unsafeWindow.$j("body").ajaxSuccess(function(e, res, opt) {
getStatus();

if (opt.url.indexOf('/battle-stats/') > -1) {
var att = unsafeWindow.SERVER_DATA.invaderId;
var def = unsafeWindow.SERVER_DATA.defenderId;

if( unsafeWindow.SERVER_DATA.mustInvert) {
att = unsafeWindow.SERVER_DATA.defenderId;
def = unsafeWindow.SERVER_DATA.invaderId;
}

var zone = unsafeWindow.SERVER_DATA.zoneId;

var bh = eval("("+res.responseText+")");

var aBH = '';
var dBH = '';

//attacker
var attID = bh['current'][zone][att][0];
var defID = bh['current'][zone][def][0];

if ( attID.citizen_id > 0 )
aBH = '<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[attID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[attID.citizen_id].avatar+'"><small>'+bh.fightersData[attID.citizen_id].name+'</small><strong>'+attID.damage+'</strong></a>';

if ( defID.citizen_id > 0 )
dBH = '<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[defID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[defID.citizen_id].avatar+'"><small>'+bh.fightersData[defID.citizen_id].name+'</small><strong>'+defID.damage+'</strong></a>';

var top5ABH = '';
var top5Att = 0;
for ( var i = 0; i < bh['current'][zone][att].length; i++ ) {
top5ABH = top5ABH+'<tr><td>Attacker</td><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][att][i].citizen_id].id+'">'+bh.fightersData[bh['current'][zone][att][i].citizen_id].name+'</a></td><td>'+bh['current'][zone][att][i].kills+'</td><td><strong>'+bh['current'][zone][att][i].damage+'</strong></td></tr>';

'<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][att][i].citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[attID.citizen_id].avatar+'"><small>'+bh.fightersData[attID.citizen_id].name+'</small><strong>'+bh['current'][zone][att][i].damage+'</strong></a>';
top5Att = top5Att + parseInt(bh['current'][zone][att][i].damage);
}

var top5DBH = '';
var top5Def = 0;
for ( var i = 0; i < bh['current'][zone][def].length; i++ ) {
top5DBH = top5DBH+'<tr><td>Defender</td><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][def][i].citizen_id].id+'">'+bh.fightersData[bh['current'][zone][def][i].citizen_id].name+'</a></td><td>'+bh['current'][zone][def][i].kills+'</td><td><strong>'+bh['current'][zone][def][i].damage+'</strong></td></tr>';
top5Def = top5Def + parseInt(bh['current'][zone][def][i].damage);
}

//BH && Stats
setLink2BH(aBH, dBH, top5Att, top5Def);

//BH candidats :)
BHStats(top5ABH, top5DBH);
}//end BH
else if (opt.url.indexOf('change-weapon') != -1) {
var nw = eval("("+res.responseText+")");
wAtt[0] = nw.weaponDamage;
kill(str, wAtt, eHealth);
}//end Weapon Change
else if (opt.url.indexOf('/military/fight-shoot') != -1) {
var k = eval("("+res.responseText+")");
if (k.error && k.message == "SHOOT_LOCKOUT")
if (NINJA_PUNCH > 0)
setTimeout(function() { fight(0); }, 800);
else
return;

if ( k.user.health > MIN_FIGHTER_HEALTH && NINJA_PUNCH == 1 )
fight();
else if (k.user.health <= MIN_FIGHTER_HEALTH && NINJA_PUNCH == 1) {
NINJA_PUNCH = 0;
}//after fight :D
else if ( NINJA_PUNCH == 2 ) {
if ( k.message == 'ENEMY_KILLED' )
NINJA_PUNCH = 0;
else
WPBuy();
}//WP Fight

str[1] = k.enemy.skill;
str[1] = str_replace(str[1], ',', '');
wAtt[0] = k.user.weaponDamage;
wAtt[1] = k.enemy.weaponImage;
wAtt[1] = wAtt[1].match(/\d/g);
eHealth = k.enemy.health;
kill(str, wAtt, eHealth);
}//end Fight
else if (opt.url.indexOf('military/buy-health') != -1) {
var wpRes = eval("("+res.responseText+")");

if ( wpRes.msg == 'success' && NINJA_PUNCH == 2 ) {
if ( wpRes.wellness > MIN_FIGHTER_HEALTH )
fight();
else
WPBuy();
}
else if (NINJA_PUNCH == 2) {
NINJA_PUNCH = 0;
alert('Error: False problem!');
}

}//end WP fight
else if (opt.url.indexOf('/eat?') != -1) {
var eatRes = res.responseText;
eatRes = eval(eatRes.substring(eatRes.indexOf('(')));
if ( NINJA_EAT == 1 && eatRes.has_food_in_inventory > 0 && CURRENT_HEALTH <= 90 && HEALT_LIMIT > 0)
eat();
else if ( NINJA_EAT == 1 && ( CURRENT_HEALTH > 90 || HEALT_LIMIT == 0 || eatRes.has_food_in_inventory == 0 ) ) {
NINJA_EAT = 0;
alert('Auto EAT: STOP!');
}
}//end Eat
else if ( opt.url.indexOf('military/battle-status') != -1) {
var eMsg = eval("("+res.responseText+")");
if (eMsg.message == 'ZONE_IS_ACTIVE')
window.location.reload();
}
else if ( opt.url.indexOf('military/fight-heal') != -1) {
//var r = eval("("+res.responseText+")");
//if ( r.error != true )
// hospital();
}//end hospital
});

if ( unsafeWindow.SERVER_DATA.onlySpectator != 0 )
return false;

str[0] = $('#fighter_skill').html();
str[0] = parseInt( str_replace(str[0], ',', '') );

str[1] = $('#enemy_skill').html();
str[1] = parseInt( str_replace(str[1], ',', '') );

wAtt[0] = $('.weapon_attributes p strong').html();
wAtt[1] = $('.weapon img').attr('src');
wAtt[1] = wAtt[1].match(/\d/g);

eHealth = $('#enemy_life').attr('title');
eHealth = str_replace(eHealth, 'Opponent health: ', '');

var content = $('#player_rank');
content.append('<textarea id="myStatBox" style="position: absolute; top: -126px; left: 27px; width: 330px; height: 15px;"></textarea>');
content.append('<div id="myKillBox" style="position: absolute; top: -200px; left: 100px; width: 170px;"></div>');

kill(str, wAtt, eHealth);

//bonus Fight button :D
getStatus();

//Load battle Menu
battleMenu(info);
}
}//end $j init ;)
}

// Start action :D
// =============================================================================
$ = jQuery.noConflict();
jQuery(document).ready(function () {
main();
});