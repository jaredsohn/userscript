// ==UserScript==
// @author      Fantomas
// @name        Dealabs Refresh
// @namespace   dealabs-refresh
// @grant       none
// @description Dealabs - Rechargement automatique et plus
// @include     http://www.dealabs.com/new.html*
// @include     http://www.dealabs.com/hot.html*
// @include     http://www.dealabs.com/discussed.html*
// @exclude     http://www.dealabs.com/forum*
// @version     1.2.2

// ==/UserScript==
var ttime = 60*5*1000;
var myInterval;
var title = document.title;
//
var currentId = $('.contenar-heading > a + a:first').attr('id');
var currentPostId = parseInt(currentId.replace('title_expirer_',''));
var lastDeal = currentPostId;
if (readCookie('dealNumber') != null) {lastDeal = parseInt(readCookie('dealNumber'));} else { createCookie('dealNumber',currentPostId,1); }
var boolRefresh = true;
if (readCookie('refresh') != null) boolRefresh = stringToBoolean(readCookie('refresh'));
var boolSon = true;
if (readCookie('son') != null) boolSon = stringToBoolean(readCookie('son'));
//

function refresh(){
	location.reload();
	//showSound();
}
function inter(){
    myInterval =  setInterval(function() {
          refresh()
    }, ttime);
}
//
var $newdiv1 = $('<div id="ft-refresh"/>');
$('body').append($newdiv1);
$('#ft-refresh').css({"position":"absolute","width":"100px","height":"28px","top":"0","left":"0"});
$('#ft-refresh').html('<button id="maj" original-title="Activer/Désactiver le rechargement auto de la page"><span>Refresh</span></button><button id="cutson" style="margin-left:10px;" original-title="Activer/Désactiver la notification sonore"><span>SON</span></button>');
$('#ft-refresh > #maj').css({"border":"none","background":"url(http://img15.hostingpics.net/thumbs/mini_565899switch.png) left top no-repeat","width":"74px","height":"28px"});
$('#ft-refresh > #cutson').css({"border":"none","background":"url(http://img11.hostingpics.net/thumbs/mini_409415mute.png) left -16px no-repeat","width":"16px","height":"16px"});
$('#ft-refresh > button').css({"display":"inline-block","cursor":"pointer"});
$('#ft-refresh > button > span').css('display','none');
$('#ft-refresh > #maj').click(function(){
    boolRefresh = !boolRefresh;
    if (boolRefresh) { 
        inter();
        $('#ft-refresh > #maj').css('background-position','left top');
        $('#ft-refresh > #cutson').css('display','inline-block');
        createCookie('refresh','true',60);
    } else { 
        clearInterval(myInterval);
        $('#ft-refresh > #maj').css('background-position','left -28px');
        $('#ft-refresh > #cutson').css('display','none');
        createCookie('refresh','false',60);
    }
});
$('#ft-refresh > button').tipsy({gravity: 'nw'});
//
if (!boolRefresh){
    $('#ft-refresh > #maj').css('background-position','left -28px');
    $('#ft-refresh > #cutson').css('display','none');
} else {
    $('#ft-refresh > #cutson').css('display','inline-block');
    showSound();
    inter();
}
// Last deal
var diff = currentPostId - lastDeal;
if (diff > 0) document.title = "+"+diff+" "+title;
//
function showSound(){
    if (lastDeal < currentPostId) {
        createCookie('dealNumber',currentPostId,1);
        playSound();  
    }
}
// Gestion Son
if (!boolSon){
    $('#ft-refresh > #cutson').css('background-position','left top');
}
function playSound(){
    if (boolSon){
        var audio = new Audio();
        audio.src = "http://elulu.free.fr/R2D2/divers/R2D2_Beep.wav";
        audio.play();
    }
}
$('#ft-refresh > #cutson').click(function(){
    boolSon = !boolSon;
    if (boolSon) {
        $('#ft-refresh > #cutson').css('background-position','left -16px');
        createCookie('son','true',60);
    } else {
        $('#ft-refresh > #cutson').css('background-position','left top');
        createCookie('son','false',60);
    }
});
function stringToBoolean (str){
    switch(str.toLowerCase()){
		case "true": case "yes": case "1": return true;
		case "false": case "no": case "0": case null: return false;
		default: return Boolean(string);
	}
}
// Gestion Cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

