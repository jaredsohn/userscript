// ==UserScript==
// @name           Ikariam Aide-Memoire (Generals Score)
// @namespace      http://userscripts.org/scripts/show/49151
// @author         Martynius (http://userscripts.org/users/68307)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/49151
// @description    Shows the generals score of a player in the island view afer you have looked it up in the highscores.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://userscripts.org/scripts/source/51116.user.js
// @version        1.0.8d
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php?*view=city*
// @include        http://s*.ikariam.*/index.php?*view=island*
// @include        http://s*.ikariam.*/index.php?*view=highscore*
// @include        http://s*.ikariam.*/index.php?*view=allyHighscore*
// @include        http://s*.ikariam.*/index.php?*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php?*view=embassy*
// @include        http://s*.ikariam.*/index.php?*view=options*&page=game*
// @exclude        http://support*.ikariam.*/*
//
// @history	1.0.8d	Feature: Updated Included Pages; Feature: Moved options from "Account Data" to "Game Options" page.
// @history	1.0.8c	Feature: Updated Dependency.
// @history	1.0.8b	Feature: Updated auto-updater to use PhasmaExMachina's UserScript.
// @history	1.0.8a	Bugfix: Fixed issue displaying own scores.
// @history	1.0.8	Feature: Can select whether to show columns in Embassy/Alliance Highscore pages from the Options page.<br />Feature: Moved main code to separate module.
// @history	1.0.7a	Bugfix: Fixed issue looking up player names when cached data is cleared.
// @history	1.0.7	Feature: Changed to store data based on player ID rather than name.<br />Feature: Added column to Alliance Highscore showing average generals score and number of players the average is based on.
// @history	1.0.6	Bugfix: Fixed column identifiers to work independently of any extra columns added.
// @history	1.0.5	Feature: Added auto-update checker.
// @history	1.0.4	Feature: Shows generals score in city views of controlling player (own and, when spying, other players).
// @history	1.0.3	Feature: Shows generals scores in embassy/alliance diplomacy views.
// @history	1.0.2	Bugfix: Fixed page parsing/detection.
// @history	1.0.1	Bugfix: Fixed @include pages.
//
// ==/UserScript==


if ( PAGE_ID !== undefined ) {
	new IkariamAideMemoire( {
		SCORE_TYPE: "army_score_main",
		SCRIPT_ID: 49151,
		SCRIPT_VERSION:	"1.0.8b",
		SCRIPT_NAME: "Ikariam Aide-Memoire (Generals Score)"
	});
}