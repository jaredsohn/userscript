// ==UserScript==
// @name           Ikariam Aide-Memoire (Gold Score)
// @namespace      http://me.org.com/
// @author         Yazmat
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/49151
// @description    Shows the Gold score of a player in the island view afer you have looked it up in the highscores.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://userscripts.org/scripts/source/51116.user.js
// @version        2.0
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?*view=city*
// @include        http://s*.ikariam.*/index.php?*view=island*
// @include        http://s*.ikariam.*/index.php?*view=highscore*
// @include        http://s*.ikariam.*/index.php?*view=allyHighscore*
// @include        http://s*.ikariam.*/index.php?*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php?*view=embassy*
// @include        http://s*.ikariam.*/index.php?*view=options*&page=game*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==


if ( PAGE_ID !== undefined ) {
	new IkariamAideMemoire( {
		SCORE_TYPE: "trader_score_secondary",
		SCRIPT_ID: 465492,
		SCRIPT_VERSION:	"2.0",
		SCRIPT_NAME: "Ikariam Aide-Memoire (Gold Score)"
	});
}
