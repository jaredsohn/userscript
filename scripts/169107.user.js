// ==UserScript==
// @name      NEW PROE
// @namespace  seldar_proeconomica
// @version    1.3.0
// @description  Basic tool to help you during ProEconomica activities
// @copyright  2013+, Seldar
// @match        http://proeconomica.com/*
// @history	0.0.1 Initial Setup,adding hide for tips and top // 
// @history	1.0.0 Adding a floating div, used for overlay and content related items
// @history	1.1.0 Adding Floating switch positioning
// @history     1.2.0 Updated Company Edit page, to show days of production covered by actual stock
// @history     1.3.0 Remake to use javascripts that flows better in. Added a virtual upgrade to max. Must add check for firm money, before running the upgrade.
// @updateURL https://userscripts.org/scripts/source/169107.meta.js
// @downloadURL https://userscripts.org/scripts/source/169107.user.js
// @grant			unsafeWindow
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_xmlhttpRequest
// @grant			GM_openInTab
// @grant			GM_log
// @grant			GM_listValues
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @require http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require			http://proeco.lejer.ro/js/livequery.js
// @require 		http://creativecouple.github.com/jquery-timing/jquery-timing.min.js
// @require http://proeco.lejer.ro/js/common.js

// ==/UserScript==

var StyleSheet = ["base", "black-tie", "blitzer", "cupertino", "dark-hive", "dot-luv", "eggplant", "excite-bike", "flick", "hot-sneaks", "humanity", "le-frog", "mint-choc", "overcast", "pepper-grinder", "redmond", "smoothness", "south-street", "start", "sunny", "swanky-purse", "trontastic", "ui-darkness", "ui-lightness", "vader"];
GM_addStyle('@import "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/' + StyleSheet[19] + '/jquery-ui.css";');
GM_addStyle(".ui-widget { font-size: 12px; }");
GM_addStyle(".ui-dialog .ui-dialog-buttonpane button, .ui-dialog .ui-dialog-content button { background-color: auto !important; background-image: auto !important; border: 0 solid transparent; cursor: pointer; font-family: Arial,Helvetica,Verdana,sans-serif; font-size: 11px; line-height: 15px; margin-right: 2px; padding: 0; white-space: nowrap; }");
GM_addStyle(".floatdiv button.ui-button,.floatdiv button.ui-button:hover,.floatdiv button.ui-state-disabled:hover,button,.floatdiv button:hover { border: 0 solid transparent; cursor: pointer; font-family: Arial,Helvetica,Verdana,sans-serif; font-size: 11px; line-height: 15px; margin-right: 2px; padding: 0; white-space: nowrap; }");
GM_addStyle(".LoadingAnimation .ui-dialog-titlebar { display: none; }");
GM_addStyle(".ui-widget-content .troop { width: 40px !important; margin: 2px; } .ui-widget-content .troopGroup { float: left; margin-left: 2px; }");
GM_addStyle("legend { font-weight: bold; }");
GM_addStyle(".border thead { font-weight: bold; text-align:center; } .border { border: 1px solid #848484; padding: 1px; } .border td { border: 1px solid #feeebd; padding: 2px; }");
GM_addStyle("table#search_result td { text-align:center; } table#search_result td a { font-weight: normal; } ");
GM_addStyle("#spe-positioning { z-index:10000;position: relative;left: 0px;top: -75px;}");
GM_addStyle("#floatdiv {position: absolute !important;  background-color: rgb(255, 255, 255); border: 2px solid rgb(34, 102, 170); top: 10px; z-index: 100000; left: 1657px; background-position: initial initial; background-repeat: initial initial;");
GM_addStyle("#demo, {position: absolute;");
GM_addStyle("#floatdiv2 {position:relative;  z-index:1000;right: 100;         float:right;           width:100px;           min-height:1300px}");
GM_addStyle(  ".blue-bg {background-color: blue;}");
GM_addStyle(  ".transparent-bg {background-color: transparent;}");
GM_addStyle("#floatdiv a {cursor:pointer}");
GM_addStyle( ".plus-sign {width: 23px;height: 24px;background: url(/design/img/new_style/open_cart.png) no-repeat;}");
GM_addStyle(".panelInfoRow {width: 280px;border 1px solid #848484}");

///////////////////////////////////////////////// MAIN //////////////////////////////////////////

(function(g,b,d){var c=b.head||b.getElementsByTagName("head"),D="readyState",E="onreadystatechange",F="DOMContentLoaded",G="addEventListener",H=setTimeout;
                 function f(){
                     
                     //$LAB stuff here
                     $LAB
                     .setOptions({AlwaysPreserveOrder:false, CacheBust:true, Debug:true})
                     .script("http://proeco.lejer.ro/js/common.js")
                     .script("http://proeco.lejer.ro/js/ups.js")
                     .script("http://proeco.lejer.ro/js/ScriptSettings.js")
                     .script("http://proeco.lejer.ro/js/ScriptVisualElements.js")
                     .script("http://proeco.lejer.ro/js/ExtraTools.js")
                     .script("http://proeco.lejer.ro/js/features.js")
                     .script("http://proeco.lejer.ro/js/floating.js")
                     .script("http://proeco.lejer.ro/js/ups.js")
                     .script("http://proeco.lejer.ro/js/growl.js")

                     .script("http://proeco.lejer.ro/js/jquery.tinysort.min.js")
					 .script("http://proeco.lejer.ro/js/jquery.tinysort.charorder.min.js")

                     .script("http://proeco.lejer.ro/js/livequery.js").wait()
                     .script("http://proeco.lejer.ro/js/Main.js").wait(function () {Main.Run()});
                     
                 }
                 H(function(){if("item"in c){if(!c[0]){H(arguments.callee,25);return}c=c[0]}var a=b.createElement("script"),e=false;a.onload=a[E]=function(){if((a[D]&&a[D]!=="complete"&&a[D]!=="loaded")||e){return false}a.onload=a[E]=null;e=true;f()};
                              
                              a.src="http://proeco.lejer.ro/js/LAB-debug.min.js";
                              
                              c.insertBefore(a,c.firstChild)},0);if(b[D]==null&&b[G]){b[D]="loading";b[G](F,d=function(){b.removeEventListener(F,d,false);b[D]="complete"},false)}})(this,document);



$(document).ready(function () {
    var floatingMenu =
        {
            hasInner: typeof(window.innerWidth) == 'number',
            hasElement: typeof(document.documentElement) == 'object'
            && typeof(document.documentElement.clientWidth) == 'number'};
    
    var floatingArray =
        [
        ];
   
    
});