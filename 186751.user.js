// ==UserScript==
// @name        Astro Empires - Modular
// @namespace   privatesniper.me.uk
// @include     http://pegasus.astroempires.com/*
// @version     1
// @grant       none
// @require     http://cdn.astroempires.com/javascript/jquery-1.8.2.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
/* Initialize Variables */
var color_green = '#4ed851';
var color_red = '#cf4848';
var color_light_blue = '#4f84b0';
var color_light_yellow = '#dbdd5b';
var tfoot_tr_style = 'font-weight: bold; background: #0a141d; color: ' + color_light_blue + '; border-top: 2px solid ' + color_light_blue + ' !important; border-bottom: 2px solid ' + color_light_blue + ' !important;';

/* Modules */
function logo(){$('#main-header-logo').css('background-image','none');$('#main-header-logo').html('<span style="font-size: 1.8em; font-weight: bold; font-family: \'Ubuntu\', Arial, Times"><span style="color:white;">Astro</span><span style="color:#ebc86a;">Empires</span></span><br/><span style="font-size: 1.4em; font-weight: bold; font-family: \'Ubuntu\', Arial, Times; color: #72aad8;">Enhanced</span>');}
function theads(){$('thead, .listing-header th').css('color','#4F84B0').css('background','#0a141d').css('background-image','none').css('border-top','2px solid #4f84b0').css('border-bottom','2px solid #4f84b0');$('thead a').css('color','#4F84B0')}
function tfoots(){$('#empire_trade_bases tfoot, #empire_trade_trade-routes tfoot').css('color','#4F84B0').css('background','#0a141d').css('background-image','none').css('border-top','2px solid #4f84b0').css('border-bottom','2px solid #4f84b0');}
function colorize_empire_units_summary(){$('#empire_units_summary tr').each(function(){var inner = $(this).html();if (inner.match('Occupied Bases')){$(this).css('color',color_red);}else if (inner.match('Number of Bases') || inner.match('Number of Fleets') || inner.match('Computer Technology Level')){$(this).css('color',color_green);}});}
function buttons(){$('.btn_lft, .btn_ctr, .btn_rht').css('background-image','none');$('.btn-normal, .btn-normal-active').css('background','#0a141d');$('#background-content .btn-normal, #background-content .btn-normal-active').css('border','1px solid #4f84b0');$('.mn_item a.btn-normal-active .btn_ctr DIV, a.btn-special-active .btn_ctr DIV, a.btn-premium-active .btn_ctr DIV, a.btn-important-active .btn_ctr DIV').css('color',color_light_yellow).css('text-shadow','none');$('.btn-premium').css('border','1px solid #a27f22');$('.btn-disabled').css('border','1px solid #4e4e4e');$('.btn-disabled, .btn-premium, .btn-normal, .btn-normal-active').css('border-radius','4px');$('.input-button, .input-button-important').css('border-radius','4px');}
function base_total_economy(){var cell = '';var economy_total = 0;$('#bases_list tr').each(function(index, element) {cell = element.childNodes[3];var ihtm = cell.innerHTML;var short = ihtm.substring(0,3);var char_replaced = short.replace('a', '');var lt_replaced = char_replaced.replace('<', '');var space_replaced = lt_replaced.replace(' ', '');var replaced = space_replaced.replace('/', '');var num = parseInt(replaced);if (!isNaN(num)){economy_total += num;}});$('#bases_list table').append('<tfoot><tr class="footer" style="' + tfoot_tr_style + '"><td align="center">Totals:</td><td align="center">-</td><td align="center">-</td><td align="center">' + economy_total + '</td><td align="center">-</td></tr></tfoot>');}
function fleet_color_by_role(){$('#fleet_overview tr, #tables_units tr, #empire_units_units tr').each(function(){var h = $(this).html();if(h.match('Fighter') || h.match('Bomber') || h.match('Corvette') || h.match('Frigate') || h.match('Destroyer') || h.match('Cruiser') || h.match('Battleship') || h.match('Carrier') || h.match('Scout') || h.match('Dreadnought') || h.match('Titan') || h.match('Leviathan') || h.match('Death Star')) {$(this).css('color',color_green);}else if (h.match('Outpost')){$(this).css('color',color_light_yellow);}else if (h.match('Recycler')){$(this).css('color',color_light_blue);}});}
function fleet_total_fleet_list(){var fleet_total_size = 0;$('#fleets-list tbody tr').each(function(index, element) {var fleet_cell = element.childNodes[4];var ihtm = fleet_cell.innerHTML;var short = ihtm.substring(0,3);var char_replaced = short.replace('a', '');var lt_replaced = char_replaced.replace('<', '');var space_replaced = lt_replaced.replace(' ', '');var replaced = space_replaced.replace('/', '');var num = parseInt(replaced);if (!isNaN(num)){fleet_total_size += num;}});$('#fleets-list table').append('<tfoot><tr class="footer" style="' + tfoot_tr_style + '"><td align="center">Totals:</td><td align="center">-</td><td align="center">-</td><td align="center">-</td><td align="center">' + fleet_total_size + '</td><td align="center">-</td></tr></tfoot>');}
function colorise_credits_by_value(){var credits = $('#credits > div > div').html();var len = credits.length;var credits_html = '';if (len < 3) { credits_html = '<span style="color: #8a8a8a !important;">' + credits + '</span>'; }else if (len < 4) { credits_html = '<span style="color: white !important;">' + credits + '</span>'; }else if (len < 6) { credits_html = '<span style="color: #dbdd5b !important;">' + credits + '</span>'; }else if (len < 7) { credits_html = '<span style="color: #4f84b0 !important;">' + credits + '</span>'; }else { credits_html = '<span style="color: #3b953b !important;">' + credits + '</span>'; }$('#credits > div > div').html(credits_html);}
function colorise_credit_transactions(){$('#credits_table tr, #credits_table_sumary tr').each(function() {var ehtml = $(this).html();if (ehtml.match('Date') && ehtml.match('Description')){$(this).css('background','#0a141d');$(this).css('color',color_light_blue);}else if (ehtml.match('Empire Income') || ehtml.match('Sale of') || ehtml.match('Income') || ehtml.match('Debris collected') || ehtml.match('Debris Collect') || ehtml.match('Production of') && ehtml.match('Goods')){$(this).css('color', color_green);}else if (ehtml.match('Construction') || ehtml.match('Balance')){$(this).css('color', color_light_blue);}else if (ehtml.match('Production') || ehtml.match('Expense')){$(this).css('color', color_red);}else if (ehtml.match('Research')){$(this).css('color', color_light_yellow);}});$('#credits_table td.nbr, #credits_table_sumary td.nbr').each(function() {var ehtml = $(this).html();num = ehtml.replace(',','');num = num.replace('+','');num = num.replace('<b>','');num = num.replace('</b>','');if (num < 0) { $(this).css('color', color_red); }if (num > 0) { $(this).css('color', color_green); }});}
function colorise_commanders_by_skill(){$('#commanders_box tr, #commanders_recruit tr').each(function(){var inner = $(this).html();if (inner.match('Defense') || inner.match('Tactical')){$(this).css('color',color_green);}if (inner.match('Construction') || inner.match('Production')){$(this).css('color',color_light_blue);}if (inner.match('Research')){$(this).css('color',color_light_yellow);}if (inner.match('Logistics')){$(this).css('color',color_red);}});}
function empire_units_footerize(){$('#empire_units_units tr').each(function(){var inner = $(this).html();if (inner.match('Total')){$(this).css('color','#4F84B0').css('background','#0a141d').css('background-image','none').css('border-top','2px solid #4f84b0').css('border-bottom','2px solid #4f84b0');}});}
function empire_economy_occupied_hide_if_empty(){var occupied = $('#empire_economy_occupied center').html();if (occupied == "You don't have any occupied bases.") { $('#empire_economy_occupied').hide(); }}
function alert_fade(){$('.box-error, .box-message').fadeOut(4800);}
function colorise_empire_economy_summary(){$('#empire_economy_summary table tr').each(function(){var cell = $(this).html();if(cell.match('Total')) {$(this).css('color','#4F84B0').css('background','#0a141d').css('border-top','2px solid #4f84b0').css('border-bottom','2px solid #4f84b0');}else if(cell.match('Occupied Bases')) {$(this).css('color',color_light_yellow);}else if(cell.match('Bases')) {$(this).css('color',color_green);}else if(cell.match('Trade Routes')) {$(this).css('color',color_light_blue);}});}

/* Modules to load: If you wish to disable one simply comment out by preceding with // */
$( document ).ready(function() {
  /* General Aesthetic (4) */
  logo();
  theads();
  tfoots();
  buttons();
  /* General */
  alert_fade();
  /* Bases */
  base_total_economy();
  /* Empire */
  colorize_empire_units_summary();
  empire_units_footerize();
  colorise_empire_economy_summary();
  empire_economy_occupied_hide_if_empty();
  /* Fleets */
  fleet_color_by_role();
  fleet_total_fleet_list();
  /* Account Bar */
  colorise_credits_by_value();
  /* Credits */
  colorise_credit_transactions();  
  /* Commanders */
  colorise_commanders_by_skill();
});