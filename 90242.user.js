// JavaScript Document
// ==UserScript==
// @name           IK RSS
// @autor          Ashaya
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://legioviiclaudia.xooit.fr
// @description    Flux RSS
// @include        http://s*.ikariam.*/index.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        1.0.1
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version 1.0.1 - --

/**************************MODIFIER LES 2 VALEURS CI-DESSOUS*********************/
var allyRss = "http://legioviiclaudia.xooit.fr/rss.php?t=1";//adresse web du flux rss
var allyName = "LA LéGION CLAUDIA";//nom de votre alliance
/********************************************************************************/

const cache_key		  = getServerDomain() + '.' + getServerWorld();
var LANG = getLang();
var LANGUAGE = getLanguage();
const VERSION = "1.0.0";


$("body").append('<div style="clear:left;margin:0 auto;width:1020px;margin-top:-20px;">'+
'<div style="float:left;margin-left:10px;"><embed src="http://ikariam.teknopop.com/ik/sc/rss/xmlv2.swf" wmode="transparent" flashvars="myvar=' + allyRss + '|' + allyName + '" width="673" height="240" /></object></p></div>' +
'<div style="clear:left;text-align:left;padding-left:15px;"><a href="http://legioviiclaudia.xooit.fr" target="_blank">FORUM</a></div></div><div class="footer"></div></div>');