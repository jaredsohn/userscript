// ==UserScript==
// @name           Ikariam Aide-Memoire (Generals Score Inplace)
// @namespace      http://userscripts.org/scripts/show/67717
// @author         Martynius (http://userscripts.org/users/127662)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/67717
// @description    This is my version of Ikariam Aide-Memoire/Ikariam Inline Score that makes it much more pleasant to use.  Shows the generals score of a player in island/city view after you have expressed interest in it.  This version loads the score and shows it immediately on the page like the Ikariam Inline Score script, so you don't have to deal with the crappy interface of Ikariam Aide-Memoire that requires you to go to the highscore page and then back to the island view.  It also automatically updates any score you have expressed interest in that is more than 24 hours old.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Time.js
// @require        http://userscripts.org/scripts/source/94662.user.js
// @require        http://userscripts.org/scripts/source/67716.user.js
// @version        1.03
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=city*
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php*view=options*
// @exclude        http://support*.ikariam.*/*
//
// @history 1.03 Updated to no longer use PhasmaExMachina scripts (because of delete-city hack done to his/her scripts).
// @history 1.02 Changed refresh logic to only trigger when you look at the information rather than always updating on page load.  Reduced refresh interval to 8 hours given the better behavior.  Removed display from your own town views, as there is no way to get the player info necessary to load scores.
// @history 1.01 Fixed display of refresh icon and made updates work in city view for scores you have never loaded before.
// @history	1.00 Initial version adapted from Ikariam Aide Memoire (Generals Score)
//
// ==/UserScript==

if ( PAGE_ID !== undefined ) {
	new IkariamAideMemoire( {
		SCORE_TYPE: "army_score_main",
		SCRIPT_ID: 67717,
		SCRIPT_VERSION:	"1.03",
		SCRIPT_NAME: "Ikariam Aide-Memoire (Generals Score Inplace)"
	});
}