// ==UserScript==
// @name       Droid Diplicious
// @namespace  http://thedreaming.com
// @version    0.4
// @description  Layout updates for Droid Dippy's web interface
// @match      http://droidippy.oort.se/*
// @copyright  2012+, Ray Lopez
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
// @resource 	JQUIMIN http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/themes/base/minified/jquery-ui.min.css
// @resource 	JQUICSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/eggplant/jquery-ui.css
// ==/UserScript==

var JQUIMIN = GM_getResourceText("JQUIMIN");
-GM_addStyle(JQUIMIN);
var JQUICSS = GM_getResourceText("JQUICSS");
-GM_addStyle(JQUICSS);
GM_addStyle("body { background-image: url(http://wallpaperswa.com/thumbnails/detail/20120711/blueprints%20textures%202560x1600%20wallpaper_wallpaperswa.com_43.jpg)}");             
GM_addStyle("h1 { font-size: 15px; color: white; background-color: black;}");             
GM_addStyle(".no-close .ui-dialog-titlebar-close { display: none; }");      
GM_addStyle("z-index:9999;");
// Buttons
GM_addStyle(".button { -moz-box-shadow:inset 0px 1px 0px 0px #fff6af; -webkit-box-shadow:inset 0px 1px 0px 0px #fff6af; box-shadow:inset 0px 1px 0px 0px #fff6af; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffec64), color-stop(1, #ffab23) ); background:-moz-linear-gradient( center top, #ffec64 5%, #ffab23 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffec64', endColorstr='#ffab23'); background-color:#ffec64; -moz-border-radius:6px; -webkit-border-radius:6px; border-radius:6px; border:1px solid #ffaa22; display:inline-block; color:#333333; font-family:arial; font-size:15px; font-weight:bold; text-decoration:none; text-shadow:1px 1px 0px #ffee66;margin:0px; }");
GM_addStyle(".button:hover { background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffab23), color-stop(1, #ffec64) ); background:-moz-linear-gradient( center top, #ffab23 5%, #ffec64 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffab23', endColorstr='#ffec64'); background-color:#ffab23; }");             
GM_addStyle(".button:active { position:relative; top:1px; }");      
GM_addStyle(".ui-widget-content a {color : #000000 }");
GM_addStyle(".ui-widget input {font-family: 'Droid Serif'; font-size: 10; }");
GM_addStyle("#chatMessage { width: 700px; height: 80px; }");


jQuery(document).ready(function(){
 
    setupPopupContainers();
    setupMenu();
    setupMap();
    setupChatBox();
    setupLayout();
});

function setupPopupContainers()
{
    $('.popupContainer').css('z-index', 99999);
}

function setupMenu()
{
    $("#menu").css('background-color','#3d3644');
}

function setupLayout()
{
	$('h1').wrap('<div id="bdy" class="ui-widget ui-widget-content">');      
 
}

function setupMap()
{
    $("#displayContainer").css('background-color', 'white');
    $("#mapSide").dialog({dialogClass: "no-close",resizable: false, width:'auto', position: { my: "left top", at: "left top", of: window }});
    $("#mapSide").dialog('option', 'title', 'Operations');

}

function setupChatBox(){
    $('#chatSide').wrap('<div id="chatDialog" title="Communication" />');
    $("#chatSide").css('background-color', 'white');
    $("#chatDialog").dialog({dialogClass: "no-close",resizable: false, width:'auto', position: { my: "right top", at: "right top", of: window }});
}