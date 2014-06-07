// ==UserScript==
// @name          Kaos Tools
// @namespace     *
// @description   Tools for the Kaos Alliance
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://userscripts.org/scripts/source/51116.user.js
// @version        1.0.0
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=city*
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=highscore*
// @include        http://s*.ikariam.*/index.php*view=allyHighscore*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php*view=embassy*
// @include        http://s*.ikariam.*/index.php*view=options*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==
//

if ( PAGE_ID !== undefined ) {
	new IkariamGeneralsScore( {
		SCORE_TYPE: "army_score_main",
		SCRIPT_ID: 49151,
		SCRIPT_NAME: "Ikariam Aide-Memoire (Generals Score)"
	});
}