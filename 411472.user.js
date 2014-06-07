// ==UserScript==
// @name #saq
// @author aaaq
// @description abcdesw
// @include http://*/game.php*screen=am_farm*
// ==/UserScript==


win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window,
$ = jQuery = win.jQuery;

$(function (){
 $('.row_a, .row_b').each(function() {
 if ( $(this).find('td:eq(3)').html().match(/command\/attack\.png/) ){
 $(this).remove();
 } 
 });
});

$(function (){
 $("a.farm_icon_a, a.farm_icon_b, a.farm_icon_c").click(function() {
 $(this).parent().parent().remove();
 });
});

$(function (){
 $('.row_a, .row_b').each(function() {
 if ( $(this).find('td:eq(10)').html().match(/farm_icon_disabled/) && $(this).find('td:eq(11)').html().match(/farm_icon_disabled/) && $(this).find('td:eq(12)').html().match(/farm_icon_disabled/)){
 $(this).remove();
 } 
 });
});

$(function (){
 $('.row_a, .row_b').each(function() {
 if ( $(this).find('td:eq(1)').html().match(/green/) ){
 $(this).find('td:eq(8),td:eq(9),td:eq(10)').css('background-color', 'green');
 } 
 else if ( $(this).find('td:eq(1)').html().match(/yellow/) ){
 $(this).find('td:eq(8),td:eq(9),td:eq(10)').css('background-color', 'yellow');
 }
 else if ( $(this).find('td:eq(1)').html().match(/blue/) ){
 if ( $(this).find('td:eq(1)').html().match(/red_blue/) ){
 $(this).find('td:eq(8),td:eq(9),td:eq(10)').css('background-color', '#660066');
 }
 else{ 
 $(this).find('td:eq(8),td:eq(9),td:eq(10)').css('background-color', 'blue');
 }
 }
 }); 
});







$(function(){
$("<button id='C'>C</button>").prependTo("tbody tr td tr th:eq(33)");
$("div .body table tr td:nth-child(11)").find("a").append("<span id='keke'></span>");


$("#C").click(function(){
$("div .body table tr td:nth-child(11)").find("#keke").click();
});
});

$(function(){
$("#C").each(function() {
$("tbody tr td tr th:eq(33)").find("#keke").click();
});
});

$("#C").click();

$(function(){
var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var ViD = gamedata.village.id;
var newurl = '/game.php?village=n'+ ViD +'&order=distance&dir=asc&screen=am_farm';
the_t = setTimeout(function(){
window.document.location = newurl;
clearTimeout(the_t);
},5000);
});