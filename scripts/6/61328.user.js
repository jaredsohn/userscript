// JavaScript Document
// ==UserScript==
// @name           ForomTools Admin
// @autor          TeKnopolis
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/61328
// @description    Admin tool for ForomTools
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        1.0.0
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version 1.0.0 - --

const cache_key		  = getServerDomain() + '.' + getServerWorld();
var LANG = getLang();
var LANGUAGE = getLanguage();
const VERSION = "1.0.0";

var report = '';

	GM_addStyle(
		"#ikcadPlayPen textarea { font-family: courier; width:97%; }" +
		"#ikcadPlayPen #ikcadVersion, #ikcadPlayPen #ikcadSettings { margin:auto 5px; }" +
		"#ikcadPlayPen textarea, #ikcadPlayPen span.ikcadFormats, #ikcadUploadStatus { margin:5px; }" +
		"#ikcadPlayPen span.ikcadFormats, #ikcadVersion { position:relative; float:left; }" +
		"#ikcadSettings, #ikcadUploadStatus { position:relative; float:right; }" +
		"#ikcadSettings { color:#FF0000; }" +
		"#ikcadSettings:hover, #ikcadUploadStatus:hover { text-decoration:underline; cursor:pointer; }"
	);

	
$("#alliance").append('<div id="ikcadPlayPen" class="contentBox01h"><h3 class="header">ForomTools Admin (Version ' + VERSION + ')</h3></div>');
//$("div#ikcadPlayPen").append('<textarea rows="5" style="width: 100%" readonly></textarea>');
		 

report = getServerDomain()+'|'+getServerWorld()+'|';

$("#alliance table#allyinfo tr").each(function() {
report += $(this).find("td:eq(1)").text()+'|';
});
report = report.replace(/\(/g, '').replace(/\)/g, '').replace(/,/g, '');
report += '\n';
//
var laligne = '';
var points = 0;
var pointsTot = 0;
var mbTot = 0;
	$("#alliance table.table01 tbody tr").each(function() {
	laligne = $(this).find("td:eq(1)").text()+'<->';//Nom
	laligne += $(this).find ("td.cityInfo ul:eq(1)").text();//Villes
  report += laligne.replace(/\n/g, '').replace(/\]/g, '=').replace(/ \[/g, '|');
  report += '<->'+$(this).find("td:eq(3)").text().replace(/\n/g, '')+'<->';// Categorie
  points = $(this).find("td:eq(4)").text().replace(/\n/g, '').replace(/,/g, '');// Pts
	pointsTot += parseInt(points);
	mbTot += 1;
	report += points;
	report += '\n';
	});
	
	report = report.replace(/=<->/g, '<->');

//
report += mbTot+'|'+pointsTot+'|'+parseInt(pointsTot/mbTot)+'|'+VERSION;

//$("div#ikcadPlayPen textarea").append(report);
$("div#ikcadPlayPen").append('<div style="margin-left:190px;margin-top:3px;"> '+
'<embed src="http://ikariam.teknopop.com/ik/sc/admin/btCopyAdmin.swf" wmode="transparent" flashvars="report=' + report + '" width="301" height="35" /></object></p>' +
'<div><a href="http://ikariam.teknopop.com" target="_blank">ForomTools</a></div></div><div class="footer"></div>');
