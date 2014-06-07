/**
// ==UserScript==
// @name           The West - Battles Stats
// @namespace      Narulez (http://userscripts.org/users/268539)
// @author         Narulez http://userscripts.org/users/268539
// @thanks         Idea; Billy-AR & JR guys
// @thanks         Original Updater; Scripts O Maniacs; http://scripts-o-maniacs.leforum.eu
// @description    Gets, organizes and exports various stats in the popular browser game The West
// @icon           http://s3.amazonaws.com/uso_ss/icon/118401/large.png?1323633166
// @homepageURL    http://userscripts.org/scripts/show/118401
// @supportURL     http://userscripts.org/topics/95184
// @downloadURL    https://userscripts.org/scripts/source/118401.user.js
// @updateURL      https://userscripts.org/scripts/source/118401.meta.js
// @copyright      2011+, Narulez (http://userscripts.org/users/268539)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http:*.the-west.*game.php*
// @include        http://userscripts.org/scripts/review/118401*
// @include        http://userscripts.org/scripts/source/118401.meta.js*
// @version        2.0
// @history        2.0|25/07/2012 <b>Added Fortbattles support, finally!</b>
// @history        2.0 <b>Added IndexedDB Storage</b>
// @history        2.0 Improved code
// @history        2.0 Dropped "official" support for 1.35 (all servers should have 1.36 now)
// @history        2.0 Fixed HighDuels for 1.36
// @history        2.0 Fixed SingleDuels when dollars received are more than 999
// @history        2.0 Fixed some other bugs that I don't remember
// @history        2.0 Note for translators: added a lot of new strings, check the <a href="http://userscripts.org/scripts/show/124288" target="_blank">Translation Sample Pack</a>!
// @history        1.9.1|24/02/2012 Changed: now saves settings automatically
// @history        1.9.1 Fixed some small and critical bugs
// @history        1.9.1 <b>Dropped support for 1.33: do not update if your servers have it!</b>
// @history        1.9|07/02/2012 Added ability to use external Language Packs. A link to a list of them will be avaiable on the homepage of the script
// @history        1.9 Added About tab, moved update button there
// @history        1.9 Added Chrome compatibility as native extension
// @history        1.9 Improved Chrome compatibility with Tampermonkey installed
// @history        1.9 Improved: registering with the The West Api will work without altering the original code
// @history        1.9 Improved code
// @history        1.9 Changed version numbering
// @history        1.9 Fixed for 1.35 (still works from 1.33)
// @history        1.9 Fixed some bugs
// @history        1.9 Prepared for caching with IndexedDB
// @history        1.9 Removed Português and Español (They will be avaiable as external Language Packs, Italian will remain built-in)
// @history        1.8.3|06/01/2012 Added Português
// @history        1.8.3 Improved code
// @history        1.8.3 Fixed and speeded up sorting infos in Duels Highscores
// @history        1.8.3 Fixed some bugs
// @history        1.8.2|28/12/2011 Fixed updater (if you have v1.8 installed, you won't see any update)
// @history        1.8.1|28/12/2011 Updated Español (thanks pepe100)
// @history        1.8|27/12/2011 Added export (only Duels Highscores)
// @history        1.8 Improved code for TW 1.34
// @history        1.8 Changed updater: now internally uses the SOM Updater (slightly modified and adapted)
// @history        1.8 Fixed opening duel report in summary
// @history        1.8 Fixed some small bugs
// @history        1.7.1|24/12/2011 Added getting profession (only on TW 1.34)
// @history        1.7.1 Changed graphic of language selection
// @history        1.7.1 Updated Español (thanks pepe100)
// @history        1.7.1 Fixed for latest update of TW 1.34 (always works on 1.33)
// @history        1.7.1 Fixed a bug saving settings
// @history        1.7|21/12/2011 Added more highscores in Single Duels
// @history        1.7 Added sorting in Single Duels
// @history        1.7 Added more sorting types in Duels Highscores
// @history        1.7 Added Español (thanks pepe100)
// @history        1.7 Improved code
// @history        1.7 Changed: Single Duels are sorted by data (old first) in summary
// @history        1.7 Changed: saving settings is not automatic any more
// @history        1.7 Changed: data is saved in a different way. If you lose data, please don't update it but contact me!
// @history        1.7 Fixed images
// @history        1.7 Fixed bugs (one critical when changing language from forced to non-forced)
// @history        1.6.2|12/12/2011 Added getting bounty received in Single Duels
// @history        1.6.2 Fixed getting money gained in Single Duels
// @history        1.6.2 Fixed again the The West Api (now it always works)
// @history        1.6.1|11/12/2011 Fixed progress bar (again)
// @history        1.6.1 Fixed register with The West Api (the The West script is bugged, I fixed it, even if it doesn't work always)
// @history        1.6|11/12/2011 Added Single Duels support!
// @history        1.6 Added some highscores for Single Duels. They're not yet sortable
// @history        1.6 Improved code: unwrapped and simplified!
// @history        1.6 Improved: Battles Stats window is now minimizable
// @history        1.6 Improved: script registered with The West Api
// @history        1.6 Improved removing data: graphic and prompt
// @history        1.6 Changed icon
// @history        1.6 Changed: moved settings tab first
// @history        1.6 Fixed progress bar for TW 1.34
// @history        1.6 Fixed minor bugs
// @history        1.5|4/12/2011 Added Speed Mode
// @history        1.5 Added sorting other columns
// @history        1.5 Improved code: adding players and reloading data will not block the The West window any more, even with Speed Mode deactivated!
// @history        1.5 Improved code: even faster opening and reloading the TWBS window
// @history        1.5 Improved code/graphic: now TWBS uses the new The West windows style
// @history        1.5 Improved percent row, even with the original The West style
// @history        1.5 Fixed getting world on beta server
// @history        1.5 Fixed various minor bugs
// @history        1.4|28/11/2011 Added sorting some columns
// @history        1.4 Improved code: faster opening and reloading the TWBS window
// @history        1.4 Fixed bug sorting highscore by experience
// @history        1.4 Fixed bug if there are start/end spaces adding single player
// @history        1.3|26/11/2011 Added link to recover data (all inserted players name)
// @history        1.3 Improved changing language (you won't have to refresh the page)
// @history        1.3 Improved graphic
// @history        1.3 Improved code
// @history        1.3 Fixed displaying wrong data on highscore by experience table
// @history        1.3 Fixed wrong title for wrong name case
// @history        1.3 Fixed player name containing *
// @history        1.2|24/11/2011 Added ability to insert more players together writing "[player1, player2, ...]" without quotes
// @history        1.2 Added and edited some phrases for translation
// @history        1.2 Improved graphic (minor)
// @history        1.2 Fixed possible incompatibility issues with some old browsers
// @history        1.2 Fixed calculation in highscore by experience if lost duels are 0
// @history        1.1|21/11/2011 Added getting automatically the player id: only name required!
// @history        1.1 Added getting more information from profile and duels highscore.
// @history        1.1 Added highscore by experience gained between start and end time
// @history        1.1 Added highscore by most won duels between start and end time
// @history        1.1 Added more phrases for translation
// @history        1.1 Added link to reset data
// @history        1.1 Improved requests to server and response analyses
// @history        1.1 Improved data displaying
// @history        1.1 Improved code (minor)
// @history        1.1 Fixed graphic (minor)
// @history        1.1 Note: you NEED to reset or immedately update your data
// @history        1.0|18/11/2011 Initial Version
// ==/UserScript==
**/
// <div style="float: right; position: relative; margin-top: -322px; height: 307px; width: 17px; margin-right: -7px;"><a href="javascript:alert(&quot;ciao&quot;);"><img width="20px" title="" src="images/items/head/mini/sleep_cap.png" class=""></a></div>
/*global $, AjaxWindow, Character, Element, IDBTransaction, TheWestApi, TWBS_Data, UserMessage, escape, h, jQuery, s, showMessage, top, tw2gui, unescape, wman*/

/*
 * ---- TODO LIST ----
 * BETTER FORMULAS TAB
 * EXPORT FORT STATS
 * PNG DUELS EXCEPTION
 * PAGES IN FORTBATTLES SUMMARY
 * PER-TOWN FORTBATTLES STATS
 */

var TWBS = {
	'scriptid': 118401,
	'scriptver': '2.0',
	'uid': "TWBS",
	'minVersion': '1.36',
	'maxVersion': '1.36',
};
Array.prototype.getLast = function () { //by Mootools
	return this[this.length - 1] || null;
};
TWBS.stringify = function (obj, fun) {
	/**
	 * @param obj Object / Array... even String
	 * @param fun Boolean, if functions have to be stringified
	 **/
	// Credits: https://gist.github.com/754454
	// Improved by me: JSLinted, fixed a bug escaping " in string values, functions can be not stringified
	var t = typeof (obj), n, v, json, arr;
	fun = fun != null ? fun : true;
	if (t != "object" || obj == null) {
		if (t === "string") {obj = '"' + obj.replace(/"/g, "\\\"") + '"'; }
		return String(obj);
	} else {
		json = [];
		arr = (obj && obj.constructor === Array);
		for (n in obj) {
			if (obj.hasOwnProperty(n)) {
				v = obj[n];
				t = typeof (v);
				if (t !== 'function' || (t === 'function' && fun)) {
					v = (t === "string") ? '"' + v.replace(/"/g, "\\\"") + '"' : ((t === "object" && v != null) ? TWBS.stringify(v, fun) : v);
					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
			}
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};
TWBS.img = {
	ButtonLink: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sMCxIgNA1Oi0UAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAACehJREFUSA0B3Qki9gE+LCP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAgJBcAAAAAAAAAAAANCggAAwMDAAAAAAAAAAAA/f39AP7+/gAAAAAAAgICAAAAAAAAAAAAAAAAAAMDAwD9/f0AAAAAAAAAAAADAwMA/f39APn6+gD6/P4AAAAAAODc6QAEAAAAAAAAAAAIBgMADwwIAAsKCAACAgQA9/0BAAYGBgAB+/UAAAAAAAICBAAAAAAAAAAAAAAAAAAAAAAABAQDAPz8/QD3/QEA+v4BAA0D+gAAAAAA+/sIAOvw9gDy8/UAAAAAAAQAAAAAAAAAAA8NCwARDwwACQYCAP79/QDvBSQA9Pr5ABP73QAPDAkACgwNAPv7+wAAAAAA+/n4AAAAAAAFBQQABQcJANTwDQAEBgcA/O7UAAYGBgAHBwQADwv7APj5BQAAAAAAAgAAAAAIBwYACwkFAAkGAgALCQcADQwKANnKwQD39/cA7QgjAOTx/QAGA/8ACwgEAA4LBwATEg8AExIPAPD5AwDY9hQA9/f3ANPDugD5+/0ABQP+AAQEAwALCggACwgGAAAAAAACAAAAAAgGBQAGBgcABQcIAAgJCAAAAAAARTQeABH33gDW1NUABRkrAMXkBQDx8/gAAAAAAP39/QDR6QQA9AwhAODTzAAJ9eMANyoZAA0LCQAGBAQABwP/AAYGBwACAgIAAAAAAAQAAAAAAAAAAAICAwAFBQUABgYFAAAAAAD6/P0AHxsVABsYAADW1L8A6fwRABQXMADL2uUAHR4cAOLm1QAR5NcALx8NAAgICgAREAwABgP/APX2+AD5+PkA/Pz9AP7+/gAAAAAAAgAAAAD7+/sA//34AAAAAAD9/f4ABgYFAAYEAwAGBAMAEhALADQrIAAgDvwA9fLyAAkHBADW09cADgL4ABUQCgAICAoAGhYOABIOCgAJCQgABgQDAPr8/AD+/vwA/f79AAAAAAAEAAAAAPv8/AD5+/4A+/v7APoD/wAGBgYACAkIAO7w9QDJ2uYAARAcAAUTFQDa1NMAB/zzAPkEDQAbKy0A6fj1AN/f3gAMCwcAAwMDAAAAAAAFBgUABgQEAPX3+AAAAAAAAAAAAAQAAAAAAAAAAPv7/QAA/vwAAwMHAP39/QDR3+4AxdLmACInJgDz5+cA8u3qACUVBAARDxAA+P0CANLMxgAOExYADRAaAKS82gAyJxgAMB8MAAAAAAACAwMABAQCAAMCAwAAAAAABAAAAAAFBAQABQUDAAACBAAAAAAAyNjsAOTzBABAR0UAAAAAANXQ7wAfEQIAEQ8MAB8cFgALCAQABgkJANrp+wAeIB8AHiAfANbT1wDw0ugANSURAP79/QACAgQABQUFAAAAAAACAAAAAAICAgAGBgcAAP78ANHpBADk8wQAFhYSAOzp6QCxqq4A9vb3APP9CQAPExUAEQ4KAAwLCwDt9QEA9vb3ALGqrgDs6ekAFhYSAPQCEADV8xEA7/P4AP7+/AAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAgQAEQP0ABseHQD3+fwAx8XJACUpKQALDRAA+ff1AAL89wAAAAAAAAAAAAoE/QASEQ4AJSkpAMfFyQD3+fwAGx4dAALs2QDy9foA9ff7APv7+wAAAAAAAgAAAAD+/v4AAAAAAAYC/wDg9QoAEhUWABYWFAAwNDMA//35ABD75QAHCQsAAgIDAPr6+gAAAAAAAAAAADEZAQD//fkAMDQzABYWFAASFRYA/hQnAP39/QD5+v0A/f79AAAAAAAEAAAAAAICAgACAgMA3+r1APzz9wDa0ewA4+LmAAT99QAVFRUACA4NAPz4/gAHBP8AAAAAAP3+/QD+/PkA+f8OAB0Q/QDV29UA3dcBAB0eGgALBQEA9PDzABYTEAAAAAAAAAAAAAIAAAAAAwMDAP7+/QDt8PUALSgnAPXr5QAmFQEAHBEEABwPAQAQCQMANSURAAAAAAAAAAAAAAAAAEAyIAD08O4ADQP5ACsbCAAmFAEA9evlAC0oJwDs8/wAAAAAAAMCAwAAAAAABAAAAAAAAAAA/Pz9APT4/gCvsrMACAUDAAAMCQATERAAKiQYAAQGBQD9/P0AGB3lAPLo2gDd4CMAFhUOACgkGwABAgIA8fD0AN7k6gDm7vAAr7KzAAgFAwD9/f0A/f79AAAAAAACAAAAAAAAAAAEBAMADgsFAAgFAwAGBwcA5u33AP8DBwDY7AoA5ejwAAUC/gDCwvcACQ8FAAwNCAAGBAMACQcGAAD8+wADAwEADAkIAAYHBwAIBQMAAAAAAPv8+wD+/v8AAAAAAAIAAAAAAAAAAAAAAAAaEAcA+Pv9APr5+QAAAAAA/gQPANPV2gAEGDYA/fv/ADMsKgAAAAAA9PL2AP39/gD09PQAAf8AAAL//gD/AAEA+vn5APDz9wAGBwcABQQFAAICAQAAAAAABAAAAAAAAAAAAAAAAA4MCQAODAoA+vn5AAAAAAAE+OYAOjYxANDLwwA5JgsACxUAAPDl7QBLYVgA///+AP/W9gD8+/0AtrjDAPIB/wAAAAAAAAAAABQMAgAKCAMA9Pb+AAAAAAAEAAAAAP39/QD8/P0ABAUEAC8nGgC7xdYAEA0JAPf+BwAF/gsAIBoNAEI23wDr6v0A4//8AN3JtwCBh7wA9PkJAFE7NgAcGBQA1d7iAPDz9wAQDQkABgQCAAABAwD9/vgAAAAAAAQAAAAA8/b4AAr1BgAGBgYAFw8IACQaDQAGBgUA5/UHANLBvgAMCP8AaVQRAAgTBAAdKRgAzcTbABMMBwAgGA4A+wcBABcHBgD7+vwAEA0JABoTCQAAAAAA+fr9APj6/QAAAAAABAAAAAD6+vsA7/H0AAAAAAAGBAIAIx0VAPDz+AAjLEAADQ0LAODd2wD49MkAAgEHAAAGBAABAQAA1+P8AIhdOgALCwgA//v/AHN6YwCrn7EA+/v7AP3+/QD29/cA+vr7AAAAAAAEAAAAAAAAAAD09vkA+vz+AAgGAwADAgMA/f79APz7+QDz8/4AAQIFAPbw+gAMDgIAAPb7APHy9wCIW0sA2d/kAOTy9AAeJR0A0Km3APj5+AD+/v8A+vz+APr6+wAAAAAAAAAAAAE+LCP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpCOhrHrM8YAAAAASUVORK5CYII=",
	remove: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
	reload: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKnSURBVHjaYvj//z8DIRy+2K8icLYnMzY5gABiYiAC/Pj2M+rHtx8zsckBBBAjyBQQyD+YIvvn95/g3z//uP/6+dv4989foj9//Gb49eMXg7SQNMOvX78Zbty5OfFo4+kCZAMAAogFROTtT7b8/ftPuTSXtD8/vwADFxs3AxMjI8Pvf78Zfv/5A6Z//P7J8Onz53zdPI0vlyfdqIEZABBALLl7E2V///pTri6s6S/GLcbw5dcXhn///zH8/PMbagDQFUD611+gIT9+MgBdxYbsAoAAYgEKBEtyS/kLcwqDbfn68zvDjQc3GG7fvw10/m+ghl8MMlLSDEAXMty6cXvK7Tn3y5ANAAgglp/ff7pz83MDbf7K8PXHN4Zdx3c9Avp7zcGaE8UwRRrpKpeA4XP2zrwHueiBCBBALN+//TQ8du34T6Cmfz+///oOpBcdrj9Vi6wIGKgr//752xG/JjQR5KJf0MAFsQECiOXH1x+VEMFfcCeXHM9gBmqo6Led3Qoy4N6Ch2A6bJGfElBdFhBzAi1jAtIfAAIIHo3IABil84FONp7qskAPJhYy36cXqCHE0cBRjpGZieH5q+cMew/v3wEQQCzomoFROlmCUzLhD9MfBqCT/8OcLCUoxaCgqsDAyMwIjJFfDA+ePGQAht9OgABCMQAYpV3iHJI5SgLKDH///mWQE1Bg+A2MPjAGRuWnH58YmH+zMNx7cJ/hypVrG4HRvxYggFAMAEbpr5+Mvxh+/PrB8PffP3D8gzSD0sC3718ZXr9/zfD06TOGG9dubgRGaycwSh8DBBBGGEQs8Z8gziuRD0q6dx7egYY20KCfv14DY+MsMKnvBIbPWmCUPgapBwggrLnPc6LjHKcO60vE5FSAAMKaG79//ZEOzIHLiMmpAAEGAKa53Tp3Q2nKAAAAAElFTkSuQmCC",
	simple_data: "data:image/gif;base64,R0lGODlhKAASAMQAAP///7a2tgAAAP7//7e3t7W1tf/+//7+/v///QABAP7+/wEAALe3tQAAAre1tgACAAIBAPz//wEAAgABArW1t/7/+ra2uPz//ba2tAEBAQAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAoABIAAAWKoCBASyNIT5Isk5CJcCzPNIBcNgAYBqAgOsAhSCwaiaKB8gio9JjQY1IZqFqtGGuBcO16q8HpIEou68RfLWEbKKTTYYFybK5L5dS04823xudQdHZMYkc8Q4iDRWhpDAFrfWkKZ3iCinaMXxSPbpFef0uXg5leFmtcnl2glkQRBomilLGXNLW2tzQhADs=",
	high_data: "data:image/gif;base64,R0lGODlhKAASANUoAP7//////f7+/re3t7W1tba2tLa2uP//+wABAAEAAP7+//z///3//gEBAbm0uLa4t7S2tbW1t/7/+v/9/wABArW3tgACALe1tgAAAgIBAAEAArK2tfv//vz//f7//f79/7e2tLe3tf7/+7W2uP/+/7a2tgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAAoABIAAAbKQJMpk8CYNBYEIkExNYTQqHRKPQU61tOJRDopAtqTIEwum8nC0+H0IQUCnKyke67b09YpADQqlP4EA3+DhIWDYWlcJiiMKCYAdpF3JmIBi42PJQ4lgYGchqCHWngnl4yPkqlleAx6JRsXobKFiJQeAXQAAQKQJ72qkaSVuVxjxsBniaVSABUQISUDBLOyCqOUo42Ov8jBlCKl2o8PBhHR09SgtYji3N11aRPLUQAFBQbSgumG61p0B126LCBx7B0abAYNUlnIsCGVIAA7",
	calendar: "data:image/gif;base64,R0lGODlhFgAVANUyAPf29uLi4vLy8tjX2Gtra62trb28vKWlpXp6esfHx9DQ0Lm5uY2NjZiYmI6NjX5+fkxMTOrq6m9vb6CgoMbFxl1dXZqZme/v78XFxVNTU9nY2YuKiuHg4NHR0bW1tfz8/IWFhdXV1V5eXp6enpycnElJSVRUVM/Pz5KRkfPz85CPj9fX1z9azoaGhp2dnWNjY8PDw////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAWABUAAAatQJlwSCwaj8jkqMFoOZ/Q54NQGU5iMQRWm916U5khCUsgm2Nl9IcDGTZAkpd8Tp+LTKXhSpGA+f+AfwsHKnpYMIeJMYiLAgOFQiuKjJSHjpAyewksnCyBgIOYkjEsWKWLk5eGpKaTlo96fJ2en36hq5WoujCqka67r6J8tZ+3QiFYBgAAyszLzQYRHQ5DJzEXBQEB2dva3AUaFBtDGB4HLujp6ukWKAxJ8PHyREEAOw==",
	left: "data:image/gif;base64,R0lGODlhCAAJAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAAIAAkAAAITlBV5GBCXgDNRvmppy5r3tyRPAQA7",
	left2: "data:image/gif;base64,R0lGODlhDAAJAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAAMAAkAAAIdlBVpegmBXgvgUYnuq9LxD2WcFopWVYoQlWahUgAAOw%3D%3D",
	right: "data:image/gif;base64,R0lGODlhCAAJAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAAIAAkAAAIRVC6ZAajcwgPUwSqvxdMtLxQAOw%3D%3D",
	right2: "data:image/gif;base64,R0lGODlhDAAJAKEAAAAAAP///wAAAAAAACH5BAEKAAIALAAAAAAMAAkAAAIcVCJ2yQHoVgPP1UntNbT3pYUIV2UjB22JdJxCAQA7",
	locked: "data:image/gif;base64,R0lGODlhIAAgAPf/AP+ymMdzc6UfH8FjY9ynp+3R0fXl5e7U1Mx/f9mgoPrz8/Xn59WXl5wICK0yMrRDQ6suLsZxcdCJia84OKQbG8FlZejFxcArHf/WyOVVOPp8W8k1I8k2I9h5baQcHPqBYOxdPcJnZ/2gg54GBZkBAfyWePRmQ/+vlPuGZvyRcvuLbPl9XbwnGv+rkPlvTLolGKoWEMNHPc9aTddtXf6kifl3VflzUeBYP/////yPcN9ONPO5rKsZE//FscNKP/+ulNJqXv60nPbGu/+1nMNRSf6mi/Crm/zl389eUe5fP+dXOcJJQKASEv3MvfVnRP/e0/zEs50FA/PIwP68pr9COf/18qoTDb42KvhsSdZcSc47J6sgG/+tk/+8pf/KuLonG70sIP/HtemOfP6skv6pjtNBK54IB+KZkPhwTdJpXP7Qwe9kRPGUe/l0UPOchPGKcv+8pu5tUPOZgP2slP2egu1tT/ltSeNTN/yMbPyynv6ihe5ePudZO/iEZvuRcsU/MPiFZ/GmlvhqR/KKcP7NvPhxT/6kiNBmWsdNQfhrR9BjV9BhVf2bf/2bftFvZdFrYtRuYuNUOf+ymv2sk/mCY/+wlv24psQzJPqCYf3Ds9VhUPKWgPyfhPGMdP6vle5gP9FnXfSeh8ZJPdFqX8Q2J8ZMP/lsSfp/Xv7Kuu5kRPp3VvuIaPuIafl3VP6tksZEN/6qkP+1ncZHOvqIadFuY/uFZasvL//Rw/28qtRHMvuvnPlxT/6kh/htSfp9WvKLcfp5V/ybfsVBNPl0UdJBLPhtSv6skfh2VP6pjfyZfPp2VNNtYv+0nc5XSvh0Uf+rkcMyIvyVd/d9XdRGMe2ci/Gml8MwIPuUd9dqW/6xmOmJdPqNb/uBYf2Ye/7HtvqdhdJAKsQ4Kvl3VvySc/7NvrVHR/utmehZPPlwTc5BLvp8Wv2cf/2hhM5ALf6kiv61nvy2osU7LfqGZv3Arv67p/yVePSfiP+wlf+vlfh5WPyLbP/NvLZISPv29vhqRv///yH5BAEAAP8ALAAAAAAgACAAAAj/AP8JHEiwoMGDCA0aIBDhgYAGDQQ8iEDAQMKEBxBAIHJGypEqVY5IOUMEAoIDFwsycNBByBMMYboMGdIlDIYnQjo4YJDy34IAPnZg6AGgqNGjPTDs8BFgQcIFIYA08VI01AwqW8yY2UJlhr2iXpoACeH0YIA0hKbgO4HNw4AEBRQoKJBgAAU3XO7B2ZcmwEEGMaAEGbOJRAULB/tNoJZtjKsgUGLwJHjAgRFmyNgwkYCwHz9Ht2L9MEbmnREHKAcigDSFBi8SnBPzo6VG0o9KJ57RoLcMwUADEKqJEKGpQmd+j8h5asHlhDY5wwNBsPiPwJI5jQZ5QGzQ8yhUsIqQ/2mBaAKFX8EmLSEgMEKHEiWyDJANyps7PYaKlOLXb0AW+B1EINADYqSQwhUJdMfPIZlwsg4d7IjC3z8JXOFHCmI8IJAAb6iABw8FFOSZIvMkU083jMgy4T8F8KCCCp0IIFADgMiDwggKEOTZIrhck8M40byy4j8KjIACCn00MKM0H3yA40CeIWHJNqvok4MwQxI5QpMrKPmPAHFooAEMIf4TJTyzYFILK39kySIM6vhSh4z/lHNDDaqAkaBnMuRBiQancBOPmxSCIU4NN2j4TwDt2GBDLgPwqcsKrQCjQTiE/jPANG0Mk46A1X2BhgtrUDBBM+bkU4gzypCSqQUepMCCDhpfsPcPcHz0gsUnkXxzTDEu7HJJpv9UQIwpWJxjC3X/ILCBP9BCK0gidkBDrAQkRLuBbwNVlkG00VpzLRMgQJsBagThwMAFJoB7xwT9HGRBBSSU648JFzCAg0EBcABuEhS8FddcdXkADrgc+HUQVBy0C20SZbBgRRRRWMFCGXtEawIHZD0VwAXfgisyuBlc0FRPK22gxMjgKrHBTj11q9ELWugAghNOgKCDFi+YlFrMvzHkEEQSUcQs0EhfFBAAOw==",
};
TWBS.Text = {};
TWBS.Langs = {};
TWBS.Langs.it = {
	'not_reload'    : "Non devi ricaricare nulla per visualizzare queste modifiche.",
	'need_reload'   : 'Devi ricaricare la pagina per visualizzare queste modifiche.',
	'reload_win'    : 'Potresti dover ricaricare la finestra di TWBS per visualizzare parte di queste modifiche.',
	'select'        : 'Seleziona',
	'select_lang'   : 'Seleziona lingua (forza)',
	'select_sort'   : 'Ordina {1}per',
	'sort_down'     : 'Crescente',
	'sort_up'       : 'Decrescente',
	'wait'          : ["Attesa tra un aggiornamento e l'altro", "Se durante l'aggiornamento la finestra si blocca o si rallenta, prova ad aumentare questo valore."],
	'wait_0'        : 'Nulla',
	'wait_200'      : 'Bassa',
	'wait_500'      : 'Media',
	'wait_1000'     : 'Alta',
	'safe'          : ['Modalità Veloce', 'Aggiorna la tabella solo alla fine, risparmiando tempo e alleggerendo il calcolo.&lt;br&gt;Con la Modalità Veloce attivata il tempo di attesa si può ridurre senza il rischio del blocco della finestra.'],
	'will'          : 'Prossimamente Disponibile',
	'lang_name'     : 'Italiano',
	'aut'           : 'Autore',
	'trad'          : 'Traduttore',
	'trads'         : 'Traduttori',
	'trad_name'     : 'Narulez',
	'trad_link'     : {
		'it2'  : ['Builder', 178056],
		'w1'   : ['Narulez', 12766],
		'w2'   : ['Narulez', 12766],
		'http' : 'http://userscripts.org/users/268539/scripts',
	},
	'duels_highs'   : 'Classifiche Duelli',
	'settings'      : 'Impostazioni',
	'duels_single'  : 'Duelli Singoli',
	'forts_highs'   : 'Classifiche Forti',
	'Export'        : 'Esporta',
	'about'         : 'Informazioni',
	'add'           : 'Aggiungi',
	'add_players'   : "Aggiungi giocatori",
	'add_player_tp' : 'Inserisci il nome del giocatore.&lt;br&gt;Suggerimento: puoi scrivere "[player1, player2, ...]" senza virgolette&lt;br&gt;per inserire più giocatori contemporaneamente.',
	'add_report'    : 'Aggiungi report',
	'add_report_tp' : 'Inserisci il link al report.&lt;br&gt;Es.: [report=12345678abcdefghij]Nome_report[/report]&lt;br&gt;Suggerimento: puoi scrivere solo "[report=12345678abcdefghij]" senza virgolette.&lt;br&gt;Suggerimento: puoi scrivere più link di seguito per inserire più rapporti insieme.',
	'show_info'     : 'Info giocatori',
	'show_start'    : 'Dati iniziali',
	'show_end'      : 'Dati finali',
	'show_high'     : 'Classifiche',
	'show_exp'      : 'Esperienza',
	'title_exp'     : 'Classifica esperienza',
	'show_win'      : 'Duelli vinti',
	'title_win'     : 'Classifica duelli vinti',
	'show_summ'     : 'Riepilogo',
	'show_higt'     : 'Colpi e duelli',
	'show_recm'     : 'Migliori risultati',
	'show_reco'     : 'Migliori risultati dell\'avversario',
	'day'           : ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
	'dayl'          : ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
	'month'         : ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
	'monthl'        : ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
	'check_update'  : 'Controlla aggiornamenti',
	'reset'         : 'Azzera dati',
	'recov'         : 'Recupera dati',
	'percent'       : 'Percentuale indicativa di avanzamento',
	'tab_name'      : 'Nome',
	'tab_class'     : 'Classe',
	'tab_craft'     : 'Professione',
	'tab_title'     : 'Titolo',
	'tab_city'      : 'Città',
	'tab_ally'      : 'Alleanza',
	'tab_start'     : 'Inizio',
	'tab_end'       : 'Fine',
	'tab_update'    : 'Aggiorna',
	'tab_rel'       : "Valori relativi all'inizio",
	'tab_rank'      : 'Rango',
	'tab_succ'      : 'Punti Successo',
	'tab_liv'       : 'Livello',
	'tab_liv_duel'  : 'Livello duello',
	'tab_rank_duel' : 'Rango duello',
	'tab_exp'       : 'Exp',
	'tab_win'       : 'Vinti',
	'win'           : 'Duelli Vinti',
	'tab_lost'      : 'Persi',
	'lost'          : 'Duelli Persi',
	'tab_diff'      : 'Diff',
	'tab_actions'   : 'Azioni',
	'tab_updated'   : 'Aggiornato',
	'tab_delete'    : 'Rimuovi',
	'tab_pos'       : 'Pos.',
	'tab_pos_l'     : 'Posizione',
	'tab_points'    : 'Punti',
	'tab_player'    : 'Giocatore',
	'tab_players'   : 'Giocatori',
	'tab_weapons'   : 'Armi',
	'tab_duel'      : 'Duello',
	'tab_rounds'    : 'Round',
	'tab_res'       : 'Risultato',
	'tab_noone'     : 'Non è presente alcun giocatore',
	'tab_noduel'    : 'Non è presente alcun duello',
	'tab_nobatt'    : 'Non è presente alcuna battaglia per il forte',
	'tab_nobattime' : 'Non ci sono state battaglie in quel periodo di tempo',
	'no_city'       : 'Senza Città',
	'no_ally'       : 'Senza Alleanza',
	'rem_data_conf' : 'Vuoi davvero eliminare tutti i dati?',
	'rem_pl_conf'   : 'Vuoi davvero eliminare il giocatore?',
	'rem_rp_conf'   : 'Vuoi davvero eliminare il report?',
	'rem_fb_conf'   : 'Vuoi davvero eliminare la battaglia per il forte?',
	'deleted'       : '{1} eliminato dalla lista',
	'added'         : '{1} aggiunto alla lista',
	'add_duel'      : 'Duello aggiunto alla lista: {1} vs. {2}',
	'notaduel'      : 'Questo report non è un duello.',
	'unknown_e'     : 'Si è verificato un errore sconosciuto.',
	'not_found'     : 'Il giocatore {1} non è stato trovato.',
	'not_resp'      : 'Il server non risponde. Riprova più tardi.',
	'no_p_insrtd'   : 'Nessun giocatore inserito.',
	'no_r_insrtd'   : 'Nessun rapporto inserito.',
	'soldier'       : 'Soldato',
	'worker'        : 'Lavoratore',
	'duelist'       : 'Duellante',
	'adventurer'    : 'Avventuriero',
	'greenhorn'     : 'Novizio',
	'craft0'        : 'Nessuna professione',
	'craft1'        : 'Cuoco',
	'craft2'        : 'Medico Ciarlatano',
	'craft3'        : 'Fabbro',
	'craft4'        : 'Sellaio',
	'hit_sh_left'   : 'Spalla sinistra',
	'hit_ar_left'   : 'Braccio sinistro',
	'hit_sh_righ'   : 'Spalla destra',
	'hit_ar_righ'   : 'Braccio destro',
	'hit_head'      : 'Testa',
	'hit_none'      : 'Colpo a vuoto',
	'vs'            : 'vs.',
	'HP'            : 'PV',
	'exp'           : 'Esp',
	'pass'          : '{1} sviene.',
	'dwin'          : '{1} guadagna {2} esperienza',
	'ddwin'         : 'e {1}$',
	'dbwin'         : '{1} riceve una taglia di {2}$',
	'best_hit'      : 'Miglior colpo',
	'best_duel'     : 'Miglior duello',
	'worst_hit'     : 'Peggior colpo',
	'worst_duel'    : 'Peggior duello',
	'high_exp'      : 'Maggiore esperienza',
	'high_$$'       : 'Maggiore guadagno',
	'high_bou'      : 'Maggiore taglia ricevuta',
	'opponent'      : 'Avversario',
	'results'       : 'risultati',
	'hits'          : 'colpi',
	'yes'           : 'Sì',
	'no'            : 'No',
	'update'        : 'Aggiorna?',
	'latest_v'      : "L'ultima versione è la ",
	'current_v'     : "La tua versione è la ",
	'webpage'       : 'Pagina web',
	'credit_upd'    : '{subj} leggermente modificato da {name}',
	'exp_nsel'      : 'Seleziona una classifica',
	'exp_data'      : 'Esporta dati',
	'only_name'     : 'Solo nomi',
	'name_score'    : 'Nomi e punteggio',
	'ctrl_c'        : 'Ctrl + C per copiare',
	'thanks'        : 'Ringraziamenti',
	'team'          : 'Team {1}',
	'thanks2'		: "{1} e {2}",
	'thankguys'		: "i ragazzi di {1}",
	'tidea'         : "per l'idea.",
	'tupder'        : 'per lo script originale di aggiornamento.',
	'IndexedDB_tiw' : "Sarà necessario attivare l'IndexedDB per le classifiche forti",
	'IndexedDB_tip' : "È necessario attivare l'IndexedDB per le classifiche forti",
	'Ind_info'      : 'Informazioni compatibilità',
	'IDB_not_supp'  : "L'IndexedDB non è supportato dal tuo browser.",
	'IndexedDB_nsp' : 'non supportato',
	'addlang'       : 'Aggiungi una lingua',
	'lang_added'    : "Lingua aggiunta.",
	'transferred'   : "{1} trasferito.",
	'n_transferred' : "{1} non trasferito!",
	'hf_get_lab'    : 'Ultime battaglie da caricare',
	'hf_overwrite'  : 'Sovrascrivi',
	'add_fortbatt'  : 'Carica',
	'hf_insnum'     : 'Inserisci un numero',
	'hf_badded'     : 'Battaglia per il forte "{fort}" aggiunta alla lista',
	'hf_bremoved'   : 'Battaglia per il forte "{fort}" eliminata dalla lista',
	'err_head'      : 'Elenco degli errori riscontrati. Per favore, segnalameli.',
	'cacheloaded'   : 'Cache ({1}) caricata',
	'cachehloaded'  : 'Cache ({1}) caricata per metà',
	'cachenloaded'  : 'Cache ({1}) non caricata',
	'bfsaved'       : 'Battaglie caricate',
	'date'          : 'Data',
	'defender'      : 'Difensore',
	'result'        : 'Risultato',
	'attacker'      : 'Attaccante',
	'reload'        : 'Ricarica',
	'calcStats'     : 'Calcola',
	'statsType'     : 'Tipo di statistiche',
	'dmy'           : '%3/%4/%5',
	'thousSepar'    : '.',
	'decimSepar'    : ',',
	'formulas'      : 'Formule',
	'playerstats'   : 'Statistiche per giocatore',
	'townstats'     : 'Statistiche per città',
	'use'           : 'Utilizza',
	'tS_sel_form'   : 'Seleziona formula',
	'tS_nam_form'   : 'Nome formula',
	'tS_algorithm'  : 'Formula',
	'tS_locked'     : 'Bloccato',
	'tS_flocked'    : 'Formula bloccata!',
	'tS_clone'      : 'Clona',
	'tS_save'       : 'Salva',
	'tS_delete'     : 'Elimina',
	'tS_var'        : 'Variabile',
	'tS_consider'   : 'Considera',
	'tS_multiply'   : 'Moltiplicatore',
	'tS_vb'         : 'Battaglia vinta',
	'tS_dvb'        : 'Ha valore 1 se la battaglia è stata vinta, altrimenti 0.',
	'tS_pb'         : 'Battaglia persa',
	'tS_dpb'        : 'Ha valore 1 se la battaglia è stata persa, altrimenti 0.',
	'tS_def'        : 'DIFESA',
	'tS_ddef'       : 'Ha valore 1 se la battaglia è una difesa, altrimenti 0.',
	'tS_att'        : 'ATTACCO',
	'tS_datt'       : 'Ha valore 1 se la battaglia è un attacco, altrimenti 0.',
	'tS_vdef'       : 'Difesa vinta',
	'tS_dvdef'      : 'Ha valore 1 se la battaglia è una difesa ed è stata vinta, altrimenti 0.',
	'tS_vatt'       : 'Attacco vinto',
	'tS_dvatt'      : 'Ha valore 1 se la battaglia è un attacco ed è stato vinto, altrimenti 0.',
	'tS_pdef'       : 'Difesa persa',
	'tS_dpdef'      : 'Ha valore 1 se la battaglia è una difesa ed è stata persa, altrimenti 0.',
	'tS_patt'       : 'Attacco perso',
	'tS_dpatt'      : 'Ha valore 1 se la battaglia è un attacco ed è stato perso, altrimenti 0.',
	'tS_charclass'  : 'CLASSE',
	'tS_sold'       : 'Soldato',
	'tS_lavo'       : 'Lavoratore',
	'tS_duel'       : 'Duellante',
	'tS_avve'       : 'Avventuriero',
	'tS_novi'       : 'Novizio',
	'tS_levl'       : 'Livello',
	'tS_maxhp'      : 'Vita massima',
	'tS_starthp'    : 'Vita iniziale',
	'tS_finishedhp' : 'Vita finale',
	'tS_hitcount'   : 'Numero colpi',
	'tS_maxdamage'  : 'Danno massimo',
	'tS_totaldmg'   : 'Danno totale',
	'tS_crithits'   : 'Colpi critici',
	'tS_misscount'  : 'Colpi mancati',
	'tS_playdead'   : 'Avversari svenuti',
	'tS_takenhits'  : 'Colpi subiti',
	'tS_takendmg'   : 'Danno subito',
	'tS_dodgecount' : 'Colpi schivati',
	'tS_diedwhen'   : 'Turni in vita',
	'tS_flaghold'   : 'Turni in bandiera',
	'tS_weapmax'    : 'Massimo danno arma',
	'tS_weapdiff'   : 'Media danno arma',
	'tS_weapmin'    : 'Minimo danno arma',
	'tS_undefval'   : '{1} ha valore indefinito o è 0. È stato convertito ad 1.',
	'tS_saved'      : 'Formula salvata!',
	'tS_rusure'     : 'Sei sicuro?',
	'tS_deleted'    : 'Formula eliminata!',
	'tS_toclone'    : '{1} duplicato',
	'tS_cloned'     : 'Formula clonata!',
};
TWBS.Langs.en = {
	'not_reload'    : "You don't need to refresh anything to see these changes.",
	'need_reload'   : 'You need to refresh the page to see these changes.',
	'reload_win'    : 'You may need to refresh the TWBS window to see part of these changes.',
	'select'        : 'Select',
	'select_lang'   : 'Select language (force)',
	'select_sort'   : 'Order {1}by',
	'results'       : 'results',
	'hits'          : 'hits',
	'sort_down'     : 'Increasing',
	'sort_up'       : 'Decreasing',
	'wait'          : ["Wait between an update and the other", "If during the update window freezes or slows down, try raising this value."],
	'wait_0'        : 'None',
	'wait_200'      : 'Low',
	'wait_500'      : 'Medium',
	'wait_1000'     : 'High',
	'safe'          : ['Speed Mode', "It updates the table only at the end, saving time and lessening the calculation.&lt;br&gt;With the Speed Mode activated, the waiting time can be reduced without the risk of blocking the window."],
	'will'          : 'Coming Soon',
	'lang_name'     : 'English',
	'aut'           : 'Author',
	'trad'          : 'Translator',
	'trads'         : 'Translators',
	'trad_name'     : 'Narulez',
	'trad_link'     : {
		'it2'  : ['Builder', 178056],
		'w1'   : ['Narulez', 12766],
		'w2'   : ['Narulez', 12766],
		'http' : 'http://userscripts.org/users/268539/scripts',
	},
	'duels_highs'   : 'Duels Highscores',
	'settings'      : 'Settings',
	'duels_single'  : 'Single Duels',
	'forts_highs'   : 'Forts Highscores',
	'Export'        : 'Export',
	'about'         : 'About',
	'add'           : 'Add',
	'add_players'   : "Add players",
	'add_player_tp' : 'Write the player name.&lt;br&gt;Hint: you can write "[player1, player2, ...]" without quotes&lt;br&gt;to add more players together.',
	'add_report'    : 'Add reports',
	'add_report_tp' : 'Write the report link.&lt;br&gt;Ex.: [report=12345678abcdefghij]Report_name[/report]&lt;br&gt;Hint: you can write only "[report=12345678abcdefghij]" without quotes.&lt;br&gt;Hint: you can write more links below to add more reports together.',
	'show_info'     : 'Players info',
	'show_start'    : 'Initial data',
	'show_end'      : 'Final data',
	'show_high'     : 'Highscores',
	'show_exp'      : 'Experience',
	'title_exp'     : 'Experience highscore',
	'show_win'      : 'Won duels',
	'title_win'     : 'Won duels highscore',
	'show_summ'     : 'Summary',
	'show_higt'     : 'Hits and duels',
	'show_recm'     : 'Best results',
	'show_reco'     : 'Best opponent results',
	'day'           : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	'dayl'          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'month'         : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	'monthl'        : ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	'check_update'  : 'Check for updates',
	'reset'         : 'Reset data',
	'recov'         : 'Recover data',
	'percent'       : 'Indicative progress percentage',
	'tab_name'      : 'Name',
	'tab_class'     : 'Class',
	'tab_craft'     : 'Craft',
	'tab_title'     : 'Title',
	'tab_city'      : 'City',
	'tab_ally'      : 'Alliance',
	'tab_start'     : 'Start',
	'tab_end'       : 'End',
	'tab_update'    : 'Update',
	'tab_updated'   : 'Updated',
	'tab_rel'       : 'Values relative from beginning',
	'tab_rank'      : 'Rank',
	'tab_succ'      : 'Success Points',
	'tab_liv'       : 'Level',
	'tab_liv_duel'  : 'Duel level',
	'tab_rank_duel' : 'Duel rank',
	'tab_exp'       : 'Exp',
	'tab_win'       : 'Won',
	'win'           : 'Duels Won',
	'tab_lost'      : 'Lost',
	'lost'          : 'Duels Lost',
	'tab_diff'      : 'Diff',
	'tab_actions'   : 'Actions',
	'tab_delete'    : 'Delete',
	'tab_pos'       : 'Rank',
	'tab_pos_l'     : 'Rank',
	'tab_points'    : 'Points',
	'tab_players'   : 'Players',
	'tab_player'    : 'Player',
	'tab_weapons'   : 'Weapons',
	'tab_duel'      : 'Duel',
	'tab_rounds'    : 'Rounds',
	'tab_res'       : 'Result',
	'tab_noone'     : 'There are no players',
	'tab_noduel'    : 'There are no duels',
	'tab_nobatt'    : 'There are no fortbattles',
	'tab_nobattime' : 'There were no fortbattles in that period of time',
	'no_city'       : 'No city',
	'no_ally'       : 'No alliance',
	'rem_data_conf' : 'Do you really want to delete all the data?',
	'rem_pl_conf'   : 'Do you really want to delete the player?',
	'rem_rp_conf'   : 'Do you really want to delete the report?',
	'rem_fb_conf'   : 'Do you really want to delete the fortbattle?',
	'deleted'       : '{1} deleted from list',
	'added'         : '{1} added to list',
	'add_duel'      : 'Duel added to list: {1} vs. {2}',
	'notaduel'      : 'This report isn\'t a duel.',
	'unknown_e'     : 'An unknown error has occurred.',
	'not_found'     : 'The player {1} was not found.',
	'not_resp'      : 'The server is not responding. Please try again later.',
	'no_p_insrtd'   : 'No player inserted',
	'no_r_insrtd'   : 'No report inserted',
	'soldier'       : 'Soldier',
	'worker'        : 'Worker',
	'duelist'       : 'Duelist',
	'adventurer'    : 'Adventurer',
	'greenhorn'     : 'Greenhorn',
	'craft0'        : 'Untrained',
	'craft1'        : 'Field Cook',
	'craft2'        : 'Tonic Peddler',
	'craft3'        : 'Blacksmith',
	'craft4'        : 'Master Saddler',
	'hit_sh_left'   : 'Left shoulder',
	'hit_ar_left'   : 'Left arm',
	'hit_sh_righ'   : 'Right shoulder',
	'hit_ar_righ'   : 'Right arm',
	'hit_head'      : 'Head',
	'hit_none'      : 'No hit',
	'vs'            : 'vs.',
	'HP'            : 'HP',
	'exp'           : 'Exp',
	'pass'          : '{1} passes out.',
	'dwin'          : '{1} earns {2} experience',
	'ddwin'         : 'and ${1}',
	'dbwin'         : '{1} receives a bounty of ${2}',
	'best_hit'      : 'Best hit',
	'best_duel'     : 'Best duel',
	'worst_hit'     : 'Worst hit',
	'worst_duel'    : 'Worst duel',
	'high_exp'      : 'Higher experience',
	'high_$$'       : 'Higher gain',
	'high_bou'      : 'Higher bounty received',
	'opponent'      : 'Opponent',
	'yes'           : 'Yes',
	'no'            : 'No',
	'update'        : 'Update?',
	'latest_v'      : "The latest version is ",
	'current_v'     : "Your version is ",
	'webpage'       : 'Web page',
	'credit_upd'    : '{subj} slightly modified by {name}',
	'exp_nsel'      : 'Select a highscore',
	'exp_data'      : 'Export data',
	'only_name'     : 'Only names',
	'name_score'    : 'Names and scores',
	'ctrl_c'        : 'Ctrl + C to copy',
	'thanks'        : 'Thanks',
	'team'          : '{1} team',
	'thanks2'		: "{1} and {2}",
	'thankguys'		: "{1} guys",
	'tidea'         : 'for the idea.',
	'tupder'        : 'for the original in-game script Updater.',
	'IndexedDB_tiw' : 'You will need to activate IndexedDB to see forts highscores',
	'IndexedDB_tip' : 'You need to activate IndexedDB to see forts highscores',
	'Ind_info'      : 'Compatibility infos',
	'IDB_not_supp'  : 'IndexedDB is not supported by your browser.',
	'IndexedDB_nsp' : 'not supported',
	'addlang'       : 'Add a lang',
	'lang_added'    : "Language pack added.",
	'transferred'   : "{1} has been transferred.",
	'n_transferred' : "{1} hasn't been transferred!",
	'hf_get_lab'    : 'Latest fort battles to load',
	'hf_overwrite'  : 'Overwrite',
	'add_fortbatt'  : 'Load',
	'hf_insnum'     : 'Insert a number',
	'hf_badded'     : '"{fort}" fort battle added to the list',
	'hf_bremoved'   : '"{fort}" fort battle removed from the list',
	'err_head'      : 'List of errors encountered. Please, report them to me.',
	'cacheloaded'   : 'Cache ({1}) loaded',
	'cachehloaded'  : 'Cache ({1}) half loaded',
	'cachenloaded'  : 'Cache ({1}) not loaded',
	'bfsaved'       : 'Fortbattles loaded',
	'date'          : 'Date',
	'defender'      : 'Defender',
	'result'        : 'Result',
	'attacker'      : 'Attacker',
	'reload'        : 'Reload',
	'calcStats'     : 'Calculate',
	'statsType'     : 'Type of stats',
	'dmy'           : '%5/%4/%3',
	'thousSepar'    : ',',
	'decimSepar'    : '.',
	'formulas'      : 'Formulas',
	'playerstats'   : 'Player stats',
	'townstats'     : 'Town stats',
	'use'           : 'Use',
	'tS_sel_form'   : 'Select formula',
	'tS_nam_form'   : 'Formula name',
	'tS_algorithm'  : 'Formula',
	'tS_locked'     : 'Locked',
	'tS_flocked'    : 'This formula is locked!',
	'tS_clone'      : 'Clone',
	'tS_save'       : 'Save',
	'tS_delete'     : 'Delete',
	'tS_var'        : 'Variable',
	'tS_consider'   : 'Consider',
	'tS_multiply'   : 'Multiplier',
	'tS_vb'         : 'Battle won',
	'tS_dvb'        : 'Has value 1 if the battle has been won, otherwise 0.',
	'tS_pb'         : 'Battle lost',
	'tS_dpb'        : 'Has value 1 if the battle has been lost, otherwise 0.',
	'tS_def'        : 'DEFENSE',
	'tS_ddef'       : 'Has value 1 if the battle is a defense, otherwise 0.',
	'tS_att'        : 'ATTACK',
	'tS_datt'       : 'Has value 1 if the battle is an attack, otherwise 0.',
	'tS_vdef'       : 'Defense won',
	'tS_dvdef'      : 'Has value 1 if the battle is a defense and has been won, otherwise 0.',
	'tS_vatt'       : 'Attack won',
	'tS_dvatt'      : 'Has value 1 if the battle is an attack and has been won, otherwise 0.',
	'tS_pdef'       : 'Defense lost',
	'tS_dpdef'      : 'Has value 1 if the battle is a defense and has been lost, otherwise 0.',
	'tS_patt'       : 'Attack lost',
	'tS_dpatt'      : 'Has value 1 if the battle is an attack and has been lost, otherwise 0.',
	'tS_charclass'  : 'CLASS',
	'tS_sold'       : 'Soldier',
	'tS_lavo'       : 'Worker',
	'tS_duel'       : 'Dueler',
	'tS_avve'       : 'Adventurer',
	'tS_novi'       : 'Greenhorn',
	'tS_levl'       : 'Level',
	'tS_maxhp'      : 'Max HP',
	'tS_starthp'    : 'HP at start',
	'tS_finishedhp' : 'HP at end',
	'tS_hitcount'   : 'Hit count',
	'tS_maxdamage'  : 'Max damage',
	'tS_totaldmg'   : 'Total damage',
	'tS_crithits'   : 'Critical hits',
	'tS_misscount'  : 'Missed hits',
	'tS_playdead'   : 'Enemies passed out',
	'tS_takenhits'  : 'Taken hits',
	'tS_takendmg'   : 'Taken damage',
	'tS_dodgecount' : 'Dodged hits',
	'tS_diedwhen'   : 'Rounds in life',
	'tS_flaghold'   : 'Rounds on flag',
	'tS_weapmax'    : 'Max weapon damage',
	'tS_weapdiff'   : 'Average weapon damage',
	'tS_weapmin'    : 'Min weapon damage',
	'tS_undefval'   : '{1} has undefined value or is 0. It has been converted to 1.',
	'tS_saved'      : 'Formula saved!',
	'tS_rusure'     : 'Are you sure?',
	'tS_deleted'    : 'Formula deleted!',
	'tS_toclone'    : '{1} cloned',
	'tS_cloned'     : 'Formula cloned!',
};
TWBS.isEven = function (x) {return (x % 2) ? false : true; };
TWBS.isOdd = function (x) {return !TWBS.isEven(x); };
TWBS.run = function (txt, remo, src) {
	/**
	 * @param txt Javascript String/URL to .js
	 * @param remo Boolean, if the tag should be maintained
	 * @param src Boolean, if txt is to be interpreted as URL
	 **/
	var fs_new, fs_old = document.getElementById('TWBS_run');
	if (fs_old) {
		fs_old.parentNode.removeChild(fs_old);
	}
	fs_new = document.createElement('script');
	if (!remo) {
		fs_new.id = "TWBS_run";
	} else {
		fs_new.className = "TWBS_run";
	}
	fs_new.type = "application/javascript";
	if (src) {
		fs_new.src = txt;
	} else {
		fs_new.textContent = txt;
	}
	fs_new.async = false;
	document.body.appendChild(fs_new);
	if (!remo) {
		fs_new.parentNode.removeChild(fs_new);
	}
	return true;
};
TWBS.parse = function (x) {
	/**
	 * @param x Object/Array stringified
	 **/
	return JSON.parse(x.replace(/\/\/[^\n\r]*[\n\r]+/gi, '').replace(/\/+\*\*[^(*\/)]*\*+\//gi, '')); //remove comments
};
TWBS.del = function (key) {
	return window.localStorage.removeItem(TWBS.uid + '_' + key);
};
TWBS.set = function (key, value) {
	return window.localStorage.setItem(TWBS.uid + '_' + key, value);
};
TWBS.get = function (key) {
	return window.localStorage.getItem(TWBS.uid + '_' + key);
};
TWBS.getJSON = function (key) {
	return JSON.parse(TWBS.get(key));
};
TWBS.setJSON = function (key, value) {
	if (value != undefined) {return TWBS.set(key, TWBS.stringify(value)); }
	else {return TWBS.del(key); }
};
TWBS.outerHTML = function (node) {
	return node.outerHTML || (
		function (n) {
			var div = document.createElement('div'), o;
			div.appendChild(n.cloneNode(true));
			o = div.innerHTML;
			div = null;
			return o;
		}(node)
	);
};
TWBS.date_to_string = function (milli, string, lon) {
	/**
	 * @param milli String
	 * @param string Boolean/String.
	 *	*	Boolean for lon.
	 *	*	String to be converted in date. Formatted with "%1" "%2" etc. in the order of the last line of function.
	 * @param lon Boolean, if month and day should be in long form (Monday instead of Mon)
	 **/
	var d = new Date(milli), year, month, mont, day, date, hour, minute, second;
	if (d.toString() === 'Invalid Date') {
		TWBS.log('Invalid Date: milli = "' + milli + '"');
		return '';
	}
	year = d.getFullYear();
	month = d.getMonth();
	date = d.getDate();
	hour = d.getHours();
	hour = (hour < 10) ? '0' + hour : hour;
	minute = d.getMinutes();
	minute = (minute < 10) ? '0' + minute : minute;
	second = d.getSeconds();
	second = (second < 10) ? '0' + second : second;
	if (TWBS.Text.hasOwnProperty('month') && (string === true || lon)) {
		mont = TWBS.Text.monthl[month];
	} else if (TWBS.Text.hasOwnProperty('month')) {
		mont = TWBS.Text.month[month];
	}
	month = ((month + 1) < 10) ? '0' + (month + 1) : month + 1;
	date = (date < 10) ? '0' + date : date;
	if (TWBS.Text.hasOwnProperty('day') && (string === true || lon)) {
		day = TWBS.Text.dayl[d.getDay()];
	} else if (TWBS.Text.hasOwnProperty('day')) {
		day = TWBS.Text.day[d.getDay()];
	}
	if (string === true) {string = undefined; }
	if (!string) {
		if (TWBS.Text.month && TWBS.Text.day) {
			return day + ', ' + date + ' ' + mont + ' ' + year + ' ' + hour + ':' + minute + ':' + second;
		} else if (TWBS.Text.month) {
			return date + ' ' + mont + ' ' + year + ' ' + hour + ':' + minute + ':' + second;
		} else if (TWBS.Text.day) {
			return day + ', ' + date + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
		} else {
			return date + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
		}
	} else {
		return s(string, day || '', mont || '', date || '', month || '', year || '', hour || '', minute || '', second || '');
	}
};
TWBS.unknown_error = function () {
	TWBS.log('Unknown Error');
	(new UserMessage('TWBS: ' + TWBS.Text.unknown_e, UserMessage.TYPE_ERROR)).show();
};
TWBS.not_resp = function () {
	(new UserMessage('TWBS: ' + TWBS.Text.not_resp, UserMessage.TYPE_FATAL)).show();
};
TWBS.error = function (error, fatal) {
	/**
	 * @param error String: error text
	 * @param fatal Boolean, if error is fatal
	 **/
	TWBS.log(error);
	(new UserMessage('TWBS: ' + error, fatal? UserMessage.TYPE_FATAL : UserMessage.TYPE_ERROR)).show();
};
TWBS.log = function (error) {
	/**
	 * @param error String: error text
	 **/
	console.log(TWBS.date_to_string(new Date().getTime()) + ' - ', error);
	TWBS.About.errorlist.push(TWBS.date_to_string(new Date().getTime()) + ' - ' + error);
};
TWBS.showTab = function (main, id) {
	/**
	 * @param main Main window Object.
	 * @param id String, id of tab.
	 **/
	if (!main) {
		return TWBS.show(id);
	}
	wman.windowIds.TWBS.showLoader();
	TWBS.unloadTabs();
	if (id !== 'Export' && wman.windowIds[TWBS.uid].tabIds.hasOwnProperty('Export')) {
		TWBS.Export.remove(id);
		return;
	}
	wman.windowIds[TWBS.uid].activateTab(id);
	TWBS.lastTab = id;
	jQuery('.TWBS-tab', main.divMain).hide().html('');
	jQuery('.TWBS-tab#TWBS_' + id, main.divMain).show();
	try {
		if (TWBS.hasOwnProperty(id)) {
			wman.windowIds.TWBS.setSize(TWBS[id].x, TWBS[id].y);
			TWBS[id].init();
		}
	} catch (e) {
		TWBS.log(e);
		return TWBS.showTab(main, 'About');
	}
	TWBS.styleTab();
};
TWBS.percent = function (q, t) {
	/**
	 * @param q Number, completed. 0 to hide immediately, -1 to hide in 10 seconds.
	 * @param t Number, total. Should be 0/false/undefined to hide immediately.
	 **/
	if (q === 0 && !t) {
		jQuery('#TWBS_percent').hide();
		jQuery('#TWBS_percent + *').show();
		jQuery('#TWBS_percent span').text('0%');
	} else if (q === -1) {
		setTimeout(function () {jQuery('#TWBS_percent').hide(); jQuery('#TWBS_percent + *').show(); }, 10000);
	} else {
		var n = (Math.round(((t ? q : 0) / (t || 1)) * 100 * 100) / 100 || 0);
		jQuery('#TWBS_percent + *').hide();
		jQuery('#TWBS_percent').show();
		jQuery('#TWBS_percent span').text(t ? (Math.round(q * 100) / 100) + '/' + t + ' (' + n + '%)' : n + '%');
		jQuery('#TWBS_percent .tw2gui_progressbar_fill').css('width', n + '%');
	}
};
TWBS.styleTab = function () {
	if (jQuery('.TWBS-tab:visible', wman.windowIds.TWBS.divMain).height() > 384) {
		jQuery('.TWBS-tab > table > tbody > tr > td[colspan=20] > div', wman.windowIds.TWBS.divMain).css({'max-height': 294 - (jQuery('.TWBS-tab:visible', wman.windowIds.TWBS.divMain).height() - 384)});
	}
};
TWBS.unloadTabs = function () {
	delete TWBS.HighDuels.count;
	delete TWBS.HighDuels.i;
	delete TWBS.HighDuels.check;
	delete TWBS.HighDuels.check_end;
	delete TWBS.HighDuels.check_start;
	delete TWBS.Settings.langCombo;
	delete TWBS.Settings.waitCombo;
	delete TWBS.Settings.safeMode;
	delete TWBS.Settings.sortCombo;
	delete TWBS.Settings.sortMode;
	delete TWBS.Settings.sort_sCombo;
	delete TWBS.Settings.sort_sMode;
	delete TWBS.Settings.sort_s2Combo;
	delete TWBS.Settings.sort_s2Mode;
	delete TWBS.SingleDuels.count;
	delete TWBS.SingleDuels.i;
	delete TWBS.SingleDuels.add_list;
	delete TWBS.SingleDuels.check;
	delete TWBS.HighForts.battlesAdd;
	delete TWBS.HighForts.battlesCount;
	delete TWBS.HighForts.overWrite;
	delete TWBS.HighForts.count;
	delete TWBS.HighForts.battles;
	delete TWBS.Export.exportArea;
	delete TWBS.Export.exportSelect1;
	delete TWBS.Export.exportSelect2;
	delete TWBS.Export.exportSelect3;
	delete TWBS.About.errorArea;
	return true;
};
TWBS.openProfile = function (id) {
	/**
	 * @param id Number/String, player id.
	 **/
	return "PlayerProfileWindow.open(" + id + ");";
};
TWBS.runLang = function () {
	return TWBS.get("LanguagePack") ? TWBS.run(decodeURIComponent(TWBS.get("LanguagePack")), true, true) : false;
};
TWBS.lesstring = function (string, len) {
	/**
	 * @param string String.
	 * @param len Number, new string length
	 **/
	if (string.length <= len) {return [string, string]; }
	return [string.substr(0, 11) + '...', string];
};
TWBS.clone = function (obj) { // by better answer from http://stackoverflow.com/questions/728360/copying-an-object-in-javascript (I don't want to use jQuery.extend)
	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) {return obj; }

	var copy, i, len, attr;
	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (i = 0, len = obj.length; i < len; ++i) {
			copy[i] = TWBS.clone(obj[i]);
		}
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (attr in obj) {
			if (obj.hasOwnProperty(attr)) {copy[attr] = TWBS.clone(obj[attr]); }
		}
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
};
TWBS.Parser = function (scope) { // by https://raw.github.com/silentmatt/js-expression-eval/master/parser.js (21 July 2012)
	//WARNING: function div(a, b) IS MODDED TO NEVER RETURN "INFINITY"!!! (IF x/0 IT RETURNS x/1!!)
	if (!Array.indexOf) {
		var i;
		Array.prototype.indexOf = function (obj, start) {
			for (i = (start || 0); i < this.length; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}
	
	function object(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}

	var TNUMBER = 0;
	var TOP1 = 1;
	var TOP2 = 2;
	var TVAR = 3;
	var TFUNCALL = 4;

	function Token(type_, index_, prio_, number_) {
		this.type_ = type_;
		this.index_ = index_ || 0;
		this.prio_ = prio_ || 0;
		this.number_ = (number_ !== undefined && number_ !== null) ? number_ : 0;
		this.toString = function () {
			switch (this.type_) {
			case TNUMBER:
				return this.number_;
			case TOP1:
			case TOP2:
			case TVAR:
				return this.index_;
			case TFUNCALL:
				return "CALL";
			default:
				return "Invalid Token";
			}
		};
	}

	function Expression(tokens, ops1, ops2, functions) {
		this.tokens = tokens;
		this.ops1 = ops1;
		this.ops2 = ops2;
		this.functions = functions;
	}

	// Based on http://www.json.org/json2.js
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            "'" : "\\'",
            '\\': '\\\\'
        };

	function escapeValue(v) {
		if (typeof v === "string") {
			escapable.lastIndex = 0;
	        return escapable.test(v) ?
	            "'" + v.replace(escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string' ? c :
	                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + "'" :
	            "'" + v + "'";
		}
		return v;
	}

	Expression.prototype = {
		simplify: function (values) {
			values = values || {};
			var nstack = [];
			var newexpression = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item);
				}
				else if (type_ === TVAR && (item.index_ in values)) {
					item = new Token(TNUMBER, 0, 0, values[item.index_]);
					nstack.push(item);
				}
				else if (type_ === TOP2 && nstack.length > 1) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = this.ops2[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
					nstack.push(item);
				}
				else if (type_ === TOP1 && nstack.length > 0) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_));
					nstack.push(item);
				}
				else {
					while (nstack.length > 0) {
						newexpression.push(nstack.shift());
					}
					newexpression.push(item);
				}
			}
			while (nstack.length > 0) {
				newexpression.push(nstack.shift());
			}

			return new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
		},

		substitute: function (variable, expr) {
			if (!(expr instanceof Expression)) {
				expr = new TWBS.Parser().parse(String(expr));
			}
			var newexpression = [];
			var L = this.tokens.length;
			var item;
			var i = 0, j;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TVAR && item.index_ === variable) {
					for (j = 0; j < expr.tokens.length; j++) {
						var expritem = expr.tokens[j];
						var replitem = new Token(expritem.type_, expritem.index_, expritem.prio_, expritem.number_);
						newexpression.push(replitem);
					}
				}
				else {
					newexpression.push(item);
				}
			}

			var ret = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
			return ret;
		},

		evaluate: function (values) {
			values = values || {};
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item.number_);
				}
				else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = this.ops2[item.index_];
					nstack.push(f(n1, n2));
				}
				else if (type_ === TVAR) {
					if (item.index_ in values) {
						nstack.push(values[item.index_]);
					}
					else if (item.index_ in this.functions) {
						nstack.push(this.functions[item.index_]);
					}
					else {
						throw new Error("undefined variable: " + item.index_);
					}
				}
				else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					nstack.push(f(n1));
				}
				else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					if (f.apply && f.call) {
						if (Object.prototype.toString.call(n1) == "[object Array]") {
							nstack.push(f.apply(undefined, n1));
						}
						else {
							nstack.push(f.call(undefined, n1));
						}
					}
					else {
						throw new Error(f + " is not a function");
					}
				}
				else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return nstack[0];
		},

		toString: function (toJS) {
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(escapeValue(item.number_));
				}
				else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = item.index_;
					if (toJS && f == "^") {
						nstack.push("Math.pow(" + n1 + "," + n2 + ")");
					}
					else {
						nstack.push("(" + n1 + f + n2 + ")");
					}
				}
				else if (type_ === TVAR) {
					nstack.push(item.index_);
				}
				else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = item.index_;
					if (f === "-") {
						nstack.push("(" + f + n1 + ")");
					}
					else {
						nstack.push(f + "(" + n1 + ")");
					}
				}
				else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					nstack.push(f + "(" + n1 + ")");
				}
				else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return nstack[0];
		},

		variables: function () {
			var L = this.tokens.length;
			var vars = [], i;
			for (i = 0; i < L; i++) {
				var item = this.tokens[i];
				if (item.type_ === TVAR && (vars.indexOf(item.index_) == -1)) {
					vars.push(item.index_);
				}
			}

			return vars;
		},

		toJSFunction: function (param, variables) {
			var f = new Function(param, "with(TWBS.Parser.values) { return " + this.simplify(variables).toString(true) + "; }");
			return f;
		}
	};

	function add(a, b) {
		return Number(a) + Number(b);
	}
	function sub(a, b) {
		return a - b; 
	}
	function mul(a, b) {
		return a * b;
	}
	function div(a, b) {
		if (b == 0) b = 1; //WARNING: THIS IS ONLY TO NOT HAVE "INFINITY" RESULTS!!!!
		return a / b;
	}
	function mod(a, b) {
		return a % b;
	}
	function concat(a, b) {
		return "" + a + b;
	}

	function neg(a) {
		return -a;
	}

	function random(a) {
		return Math.random() * (a || 1);
	}
	function fac(a) { //a!
		a = Math.floor(a);
		var b = a;
		while (a > 1) {
			b = b * (--a);
		}
		return b;
	}

	// TODO: use hypot that doesn't overflow
	function pyt(a, b) {
		return Math.sqrt(a * a + b * b);
	}

	function append(a, b) {
		if (Object.prototype.toString.call(a) != "[object Array]") {
			return [a, b];
		}
		a = a.slice();
		a.push(b);
		return a;
	}

	function Parser() {
		this.success = false;
		this.errormsg = "";
		this.expression = "";

		this.pos = 0;

		this.tokennumber = 0;
		this.tokenprio = 0;
		this.tokenindex = 0;
		this.tmpprio = 0;

		this.ops1 = {
			"sin": Math.sin,
			"cos": Math.cos,
			"tan": Math.tan,
			"asin": Math.asin,
			"acos": Math.acos,
			"atan": Math.atan,
			"sqrt": Math.sqrt,
			"log": Math.log,
			"abs": Math.abs,
			"ceil": Math.ceil,
			"floor": Math.floor,
			"round": Math.round,
			"-": neg,
			"exp": Math.exp
		};

		this.ops2 = {
			"+": add,
			"-": sub,
			"*": mul,
			"/": div,
			"%": mod,
			"^": Math.pow,
			",": append,
			"||": concat
		};

		this.functions = {
			"random": random,
			"fac": fac,
			"min": Math.min,
			"max": Math.max,
			"pyt": pyt,
			"pow": Math.pow,
			"atan2": Math.atan2
		};

		this.consts = {
			"E": Math.E,
			"PI": Math.PI
		};
	}

	Parser.parse = function (expr) {
		return new Parser().parse(expr);
	};

	Parser.evaluate = function (expr, variables) {
		return Parser.parse(expr).evaluate(variables);
	};

	Parser.Expression = Expression;

	Parser.values = {
		sin: Math.sin,
		cos: Math.cos,
		tan: Math.tan,
		asin: Math.asin,
		acos: Math.acos,
		atan: Math.atan,
		sqrt: Math.sqrt,
		log: Math.log,
		abs: Math.abs,
		ceil: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		random: random,
		fac: fac,
		exp: Math.exp,
		min: Math.min,
		max: Math.max,
		pyt: pyt,
		pow: Math.pow,
		atan2: Math.atan2,
		E: Math.E,
		PI: Math.PI
	};

	var PRIMARY      = 1 << 0;
	var OPERATOR     = 1 << 1;
	var FUNCTION     = 1 << 2;
	var LPAREN       = 1 << 3;
	var RPAREN       = 1 << 4;
	var COMMA        = 1 << 5;
	var SIGN         = 1 << 6;
	var CALL         = 1 << 7;
	var NULLARY_CALL = 1 << 8;

	Parser.prototype = {
		parse: function (expr) {
			this.errormsg = "";
			this.success = true;
			var operstack = [];
			var tokenstack = [];
			this.tmpprio = 0;
			var expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
			var noperators = 0;
			this.expression = expr;
			this.pos = 0;

			while (this.pos < this.expression.length) {
				if (this.isOperator()) {
					if (this.isSign() && (expected & SIGN)) {
						if (this.isNegativeSign()) {
							this.tokenprio = 2;
							this.tokenindex = "-";
							noperators++;
							this.addfunc(tokenstack, operstack, TOP1);
						}
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
					else if (this.isComment()) {

					}
					else {
						if ((expected & OPERATOR) === 0) {
							this.error_parsing(this.pos, "unexpected operator");
						}
						noperators += 2;
						this.addfunc(tokenstack, operstack, TOP2);
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
				}
				else if (this.isNumber()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected number");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isString()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected string");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isLeftParenth()) {
					if ((expected & LPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \"(\"");
					}

					if (expected & CALL) {
						noperators += 2;
						this.tokenprio = -2;
						this.tokenindex = -1;
						this.addfunc(tokenstack, operstack, TFUNCALL);
					}

					expected = (PRIMARY | LPAREN | FUNCTION | SIGN | NULLARY_CALL);
				}
				else if (this.isRightParenth()) {
				    if (expected & NULLARY_CALL) {
						var token = new Token(TNUMBER, 0, 0, []);
						tokenstack.push(token);
					}
					else if ((expected & RPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \")\"");
					}

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				}
				else if (this.isComma()) {
					if ((expected & COMMA) === 0) {
						this.error_parsing(this.pos, "unexpected \",\"");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
				}
				else if (this.isConst()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected constant");
					}
					var consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(consttoken);
					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isOp2()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (LPAREN);
				}
				else if (this.isOp1()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP1);
					noperators++;
					expected = (LPAREN);
				}
				else if (this.isVar()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected variable");
					}
					var vartoken = new Token(TVAR, this.tokenindex, 0, 0);
					tokenstack.push(vartoken);

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				}
				else if (this.isWhite()) {
				}
				else {
					if (this.errormsg === "") {
						this.error_parsing(this.pos, "unknown character");
					}
					else {
						this.error_parsing(this.pos, this.errormsg);
					}
				}
			}
			if (this.tmpprio < 0 || this.tmpprio >= 10) {
				this.error_parsing(this.pos, "unmatched \"()\"");
			}
			while (operstack.length > 0) {
				var tmp = operstack.pop();
				tokenstack.push(tmp);
			}
			if (noperators + 1 !== tokenstack.length) {
				//print(noperators + 1);
				//print(tokenstack);
				this.error_parsing(this.pos, "parity");
			}

			return new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions));
		},

		evaluate: function (expr, variables) {
			return this.parse(expr).evaluate(variables);
		},

		error_parsing: function (column, msg) {
			this.success = false;
			this.errormsg = "parse error [column " + (column) + "]: " + msg;
			throw new Error(this.errormsg);
		},

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

		addfunc: function (tokenstack, operstack, type_) {
			var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
			while (operstack.length > 0) {
				if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
					tokenstack.push(operstack.pop());
				}
				else {
					break;
				}
			}
			operstack.push(operator);
		},

		isNumber: function () {
			var r = false;
			var str = "";
			while (this.pos < this.expression.length) {
				var code = this.expression.charCodeAt(this.pos);
				if ((code >= 48 && code <= 57) || code === 46) {
					str += this.expression.charAt(this.pos);
					this.pos++;
					this.tokennumber = parseFloat(str);
					r = true;
				}
				else {
					break;
				}
			}
			return r;
		},

		// Ported from the yajjl JSON parser at http://code.google.com/p/yajjl/
		unescape: function(v, pos) {
			var buffer = [];
			var escaping = false, i;

			for (i = 0; i < v.length; i++) {
				var c = v.charAt(i);
	
				if (escaping) {
					switch (c) {
					case "'":
						buffer.push("'");
						break;
					case '\\':
						buffer.push('\\');
						break;
					case '/':
						buffer.push('/');
						break;
					case 'b':
						buffer.push('\b');
						break;
					case 'f':
						buffer.push('\f');
						break;
					case 'n':
						buffer.push('\n');
						break;
					case 'r':
						buffer.push('\r');
						break;
					case 't':
						buffer.push('\t');
						break;
					case 'u':
						// interpret the following 4 characters as the hex of the unicode code point
						var codePoint = parseInt(v.substring(i + 1, i + 5), 16);
						buffer.push(String.fromCharCode(codePoint));
						i += 4;
						break;
					default:
						throw this.error_parsing(pos + i, "Illegal escape sequence: '\\" + c + "'");
					}
					escaping = false;
				} else {
					if (c == '\\') {
						escaping = true;
					} else {
						buffer.push(c);
					}
				}
			}
	
			return buffer.join('');
		},

		isString: function () {
			var r = false;
			var str = "";
			var startpos = this.pos;
			if (this.pos < this.expression.length && this.expression.charAt(this.pos) == "'") {
				this.pos++;
				while (this.pos < this.expression.length) {
					var code = this.expression.charAt(this.pos);
					if (code != "'" || str.slice(-1) == "\\") {
						str += this.expression.charAt(this.pos);
						this.pos++;
					}
					else {
						this.pos++;
						this.tokennumber = this.unescape(str, startpos);
						r = true;
						break;
					}
				}
			}
			return r;
		},

		isConst: function () {
			var str, i;
			for (i in this.consts) {
				// if (true) {
					var L = i.length;
					str = this.expression.substr(this.pos, L);
					if (i === str) {
						this.tokennumber = this.consts[i];
						this.pos += L;
						return true;
					}
				// }
			}
			return false;
		},

		isOperator: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 43) { // +
				this.tokenprio = 0;
				this.tokenindex = "+";
			}
			else if (code === 45) { // -
				this.tokenprio = 0;
				this.tokenindex = "-";
			}
			else if (code === 124) { // |
				if (this.expression.charCodeAt(this.pos + 1) === 124) {
					this.pos++;
					this.tokenprio = 0;
					this.tokenindex = "||";
				}
				else {
					return false;
				}
			}
			else if (code === 42) { // *
				this.tokenprio = 1;
				this.tokenindex = "*";
			}
			else if (code === 47) { // /
				this.tokenprio = 2;
				this.tokenindex = "/";
			}
			else if (code === 37) { // %
				this.tokenprio = 2;
				this.tokenindex = "%";
			}
			else if (code === 94) { // ^
				this.tokenprio = 3;
				this.tokenindex = "^";
			}
			else {
				return false;
			}
			this.pos++;
			return true;
		},

		isSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45 || code === 43) { // -
				return true;
			}
			return false;
		},

		isPositiveSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 43) { // -
				return true;
			}
			return false;
		},

		isNegativeSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45) { // -
				return true;
			}
			return false;
		},

		isLeftParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 40) { // (
				this.pos++;
				this.tmpprio += 10;
				return true;
			}
			return false;
		},

		isRightParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 41) { // )
				this.pos++;
				this.tmpprio -= 10;
				return true;
			}
			return false;
		},

		isComma: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 44) { // ,
				this.pos++;
				this.tokenprio = -1;
				this.tokenindex = ",";
				return true;
			}
			return false;
		},

		isWhite: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 32 || code === 9 || code === 10 || code === 13) {
				this.pos++;
				return true;
			}
			return false;
		},

		isOp1: function () {
			var str = "", i;
			for (i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops1)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isOp2: function () {
			var str = "", i;
			for (i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops2)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isVar: function () {
			var str = "", i;
			for (i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0) {
				this.tokenindex = str;
				this.tokenprio = 4;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isComment: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 47 && this.expression.charCodeAt(this.pos) === 42) {
				this.pos = this.expression.indexOf("*/", this.pos) + 2;
				if (this.pos === 1) {
					this.pos = this.expression.length;
				}
				return true;
			}
			return false;
		}
	};

	scope.Parser = Parser;
	return Parser;
};
TWBS.formatNumber = function (number, decimals) {
	/**
	 * @param number Number or String, required
	 * @param decimals Number, not required
	 **/
	if (typeof number == 'undefined') {return ''; }
	number = number.toString();
	var neg, newval = '', val = '', decs;
	if (number !== "0") {
		if (number.substr(0, 1) === "-") {
			neg = "neg";
		} else {
			neg = "pos";
		}
		val = number.replace(/[^\d\,\.]/g, '').replace(/^0+/g, '');
		decs = val.split('.').length > 1 ? val.split('.')[1] : (val.split(',').length > 1 ? val.split(',')[1] : '');
		val = number.split('.')[0].split(',')[0]; 
		while (val.length > 3) {
			newval = TWBS.Text.thousSepar + val.substr(val.length - 3) + newval;
			val = val.substr(0, val.length - 3);
		}
		number = (neg === "neg") ? "-" + val + newval : val + newval;
		if (typeof decimals != 'undefined' && parseInt(decimals, 10) > 0) number = number + TWBS.Text.decimSepar + decs.substr(0, parseInt(decimals, 10));
	}
	return number;
};
TWBS.addTxtInput = function (input, txt) {
	/**
	 * @param input String, Input id
	 * @param txt String, Text to insert
	 **/
	var x = jQuery('input#' + input)[0], start = x.selectionStart, end = x.selectionEnd;
	if (x.beenClicked || start != end) {
		x.value = x.value.substr(0, start) + txt + x.value.substr(end);
	} else {
		start = x.value.length;
		x.value = x.value + txt;
	}
	x.select();
	x.selectionStart = start;
	x.selectionEnd = start + txt.length;
	x.selectionDirection = "forward";
};
TWBS.HighDuels = {x: 748, y: 471};
TWBS.HighDuels.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	if (!TWBS.HighDuels.hasOwnProperty('loaded') || TWBS.HighDuels.loaded < 2) {
		(new UserMessage('TWBS: ' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.duels_highs) + '!', UserMessage.TYPE_ERROR)).show();
		return TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'Settings');
	}
	var html = '';
	html += "<table width='100%' id='TWBS_highduels_1' class='TWBS_tab_table'>";
	html += "<tr class='TWBS_list_tables'>";
	html += "<th><form id='TWBS_add_player_name' action='javascript:void(0);'><label for='TWBS_player_name'>" + TWBS.Text.add_players + ": </label><input type='text' value='' name='TWBS_player_name' id='TWBS_player_name'><small> [<a title='" + TWBS.Text.add_player_tp + "' href='#'>?</a>]</small></form></th>";
	html += "<td><a id='TWBS_player_add' href='#' class='button_wrap button'><span class='button_left'></span><span class='button_middle'>" + TWBS.Text.add + "</span><span class='button_right'></span><span style='clear: both;'></span></a></td>";
	html += "<td rowspan='2'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='2' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='2'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";
	html += "<th>" + TWBS.Text.show_high + " (<a href='#' id='TWBS_player_export'>" + TWBS.Text.exp_data + "</a>)</th>";
	html += "</tr><tr class='TWBS_list_tables'>";
	html += "<td width='60%' colspan='2'><a id='tab_TWBS_duels_inf' class='active' href='#'>" + TWBS.Text.show_info + "</a> | <a id='tab_TWBS_duels_sta' href='#'>" + TWBS.Text.show_start + "</a> (<a href='#' id='TWBSd_start_update' title=\"<b>" + TWBS.Text.tab_update + "</b>\"><img src=\"" + TWBS.img.reload + "\"></a>) | <a id='tab_TWBS_duels_end' href='#'>" + TWBS.Text.show_end + "</a> (<a href='#' id='TWBSd_end_update' title=\"<b>" + TWBS.Text.tab_update + "</b>\"><img src=\"" + TWBS.img.reload + "\"></a>)</td>";
	html += "<td width='40%'><a id='tab_TWBS_highduels_exp' href='#'>" + TWBS.Text.show_exp + "</a> | <a id='tab_TWBS_highduels_win' href='#'>" + TWBS.Text.show_win + "</a></td>";
	html += "</tr>";
	html += "<tr><td colspan='20'>" + TWBS.progress_bar + "<hr style=\"height: 4px;\"><style type='text/css' id='TWBS_tables'></style></td></tr>";
	html += "<tr><td colspan='20'><div style='overflow:auto; max-height:295px;'>";
	html += "<table id='TWBS_table_duels'></table>";
	html += "<table id='TWBS_table_highduels_win'></table>";
	html += "<table id='TWBS_table_highduels_exp'></table>";
	html += "</div></td></tr>";
	html += "</table>";
	jQuery('#TWBS_HighDuels').html(html);
	jQuery('#TWBS_add_player_name').submit(function () {TWBS.HighDuels.add_player(); return false; });
	jQuery("#TWBS_player_add").click(function () {TWBS.HighDuels.add_player(); });
	jQuery("#TWBS_player_export").click(function () {TWBS.HighDuels.recover(); });
	TWBS.HighDuels.retables();
	jQuery("#TWBSd_start_update").click(function () {TWBS.HighDuels.update_batch(''); });
	jQuery("#TWBSd_end_update").click(function () {TWBS.HighDuels.update_batch('_end'); });
	TWBS.percent(0);
	jQuery('.TWBS_list_tables a[id*="tab_TWBS_"]').click(TWBS.HighDuels.showTable);
	wman.windowIds.TWBS.hideLoader();
};
TWBS.HighDuels.res = function () {
	return ((TWBS.Data.getItem('HighDuels', 'res', null)) ? JSON.parse(TWBS.Data.getItem('HighDuels', 'res', null)) : null);
};
TWBS.HighDuels.res_set = function (res) {
	/**
	 * @param res Object
	 **/
	res = TWBS.stringify(res, false);
	if (res.length <= 2) {
		TWBS.Data.removeItem('HighDuels', 'res');
	} else {
		TWBS.Data.setItem('HighDuels', 'res', res);
	}
};
TWBS.HighDuels.end = function () {
	return ((TWBS.Data.getItem('HighDuels', 'end', null)) ? JSON.parse(TWBS.Data.getItem('HighDuels', 'end', null)) : null);
};
TWBS.HighDuels.end_set = function (end) {
	/**
	 * @param end Object
	 **/
	end = TWBS.stringify(end);
	if (end.length <= 2) {
		TWBS.Data.removeItem('HighDuels', 'end');
	} else {
		TWBS.Data.setItem('HighDuels', 'end', end);
	}
};
TWBS.HighDuels.search_id = function (who, end) {
	/**	@param who Player name
		@param end '' || '_end'	**/
	if (who) {
		TWBS.i = TWBS.HighDuels.hasOwnProperty('count') ? ((TWBS.HighDuels.count[1] === 4) ? (TWBS.hasOwnProperty('i') ? TWBS.i + TWBS.HighDuels.count[1] : 0) : (TWBS.hasOwnProperty('i') ? TWBS.i : 0)) : 0;
		end = (end !== '_end') ? '' : '_end';
		jQuery.ajax({
			url: "game.php?window=character&action=get_id_by_name&h=" + h,
			type: 'POST',
			async: true,
			cache: false,
			data: {
				name: who,
			},
			success: function (resp) {
				var id;
				if (resp && !JSON.parse(resp).error && !!JSON.parse(resp).msg) {
					id = resp.match(/msg"\s*:\s*(\d+)/gi)[0].replace(/.*:\s*/gi, "");
					TWBS.percent((TWBS.HighDuels.hasOwnProperty('count')) ? ((TWBS.i - 3) / TWBS.HighDuels.count[1]) : 0, (TWBS.HighDuels.hasOwnProperty('count')) ? TWBS.HighDuels.count[0] : 0);
					TWBS.HighDuels.search_player(who, id, end);
				} else {
					(new UserMessage('TWBS: ' + TWBS.Text.not_found.replace('{1}', who), UserMessage.TYPE_FATAL)).show();
					if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
						delete TWBS.HighDuels.check_start[who.toLowerCase()];
					} else {
						delete TWBS.HighDuels['check' + end][id];
					}
					if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
					setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
				}
			},
			error: function () {
				TWBS.not_resp();
				delete TWBS.HighDuels.check_start[who.toLowerCase()];
				if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
				setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
			}
		});
	}
};
TWBS.HighDuels.search_player = function (who, id, end) {
	/**	@param who Player name
		@param id  Player id
		@param end '' || '_end'	**/
	if (who && id) {
		TWBS.i = TWBS.HighDuels.hasOwnProperty('count') ? ((TWBS.HighDuels.count[1] === 3) ? ((TWBS.hasOwnProperty('i')) ? TWBS.i + TWBS.HighDuels.count[1] : 0) : ((TWBS.hasOwnProperty('i')) ? TWBS.i : 0)) : 0;
		end = (end !== '_end') ? '' : '_end';
		jQuery.ajax({
			url: "game.php?window=profile&action=init&h=" + h,
			type: 'POST',
			async: true,
			cache: false,
			data: {
				name: who,
				playerid: id,
			},
			success: function (resp) {
				var a = JSON.parse(resp), city, classe, prof, livello, duello, rank, succ, title, player;
				if (a && (!a.hasOwnProperty('error') || (a.hasOwnProperty('error') && !a.error))) {
					who = a.playername;
					title = a.playertitle.replace(new RegExp('\\s*' + who.replace(/\*/gi, "\\*") + '\\s*$', "gi"), "");
					city = a.hasTown ? a.town : null;
					classe = a.classKey;
					livello = a.level;
					duello = a.duelLevel;
					rank = a.rank;
					prof = a.hasOwnProperty('profession') && a.profession ? a.profession.id : 0;
					succ = a.achvpoints;
					player = [(city ? [city.town_id, city.town_x, city.town_y, city.name] : null), classe, livello, duello, rank, succ, (city && city.hasOwnProperty('alliance_id') ? [city.alliance_id, city.alliance_name] : null), title, prof];
					TWBS.percent((TWBS.HighDuels.hasOwnProperty('count')) ? ((TWBS.i - 2) / TWBS.HighDuels.count[1]) : 0, (TWBS.HighDuels.hasOwnProperty('count')) ? TWBS.HighDuels.count[0] : 0);
					TWBS.HighDuels.search(who, id, end, player);
				} else {
					(new UserMessage('TWBS: ' + TWBS.Text.not_found.replace('{1}', who), UserMessage.TYPE_FATAL)).show();
					if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
						delete TWBS.HighDuels.check_start[name.toLowerCase()];
					} else {
						delete TWBS.HighDuels['check' + end][id];
					}
					if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
					setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
				}
			},
			error: function () {
				TWBS.not_resp();
				if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
					delete TWBS.HighDuels.check_start[name.toLowerCase()];
				} else {
					delete TWBS.HighDuels['check' + end][id];
				}
				if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
				setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
			}
		});
	}
};
TWBS.HighDuels.search = function (who, playerid, end, player) {
	/**	@param who       Player name
		@param playerid  Player id
		@param end       '' || '_end'
		@param player    [[city_id, city_x, city_y, city_name], class, level, duel_level, rank, succ_points, [ally_id, ally_name], title]	**/
	if (player && playerid && who) {
		TWBS.i = TWBS.HighDuels.hasOwnProperty('count') ? ((TWBS.HighDuels.count[1] === 2) ? ((TWBS.hasOwnProperty('i')) ? TWBS.i + TWBS.HighDuels.count[1] : 0) : ((TWBS.hasOwnProperty('i')) ? TWBS.i : 0)) : 0;
		end = (end !== '_end') ? '' : '_end';
		jQuery.ajax({
			url: '/game.php?window=ranking&mode=ajax_duels',
			type: 'POST',
			async: true,
			cache: false,
			data: {
				type: 'duels',
				page: 0,
				skill: 0,
				search: who,
				rank: 0,
				action: 'search'
			},
			success: function (resp) {
				resp = JSON.parse(resp);
				var re, d;
				re = new RegExp("[^\"]*ranking[^\"]*\"[^s]+style=.+padding-right: 5px;.+><div class='anti_wrap'>(\\d+)<\\/div><\\/td>[^<]+<td style=.+padding-left: 5px;.+><div class='anti_wrap'><a href=.+javascript:void\\(PlayerProfileWindow.open\\(" + playerid + "\\)\\);\">[^<]+<\\/a><\\/div><\\/td>[^<]+<td class=\"center\"><div class='anti_wrap'>(\\d+)<\\/div><\\/td>\\n\\t\\t<td class=\"center\"><div class='anti_wrap'>(\\d+)<\\/div><\\/td>\\n\\t\\t<td class=\"center\"><div class='anti_wrap'>(\\d+)<\\/div><\\/td>\\n\\t\\t<td class=\"center\"><div class='anti_wrap'>(-?\\d+)<");
				d = resp.page.match(re);
				if (d) {
					TWBS.percent((TWBS.HighDuels.hasOwnProperty('count')) ? ((TWBS.i - 1) / TWBS.HighDuels.count[1]) : 0, (TWBS.HighDuels.hasOwnProperty('count')) ? TWBS.HighDuels.count[0] : 0);
					TWBS.HighDuels.update(who, playerid, d, end, player);
				} else {
					(new UserMessage('TWBS: ' + TWBS.Text.not_found.replace('{1}', who + " (" + playerid + ")"), UserMessage.TYPE_FATAL)).show();
					if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
						delete TWBS.HighDuels.check_start[name.toLowerCase()];
					} else {
						delete TWBS.HighDuels['check' + end][playerid];
					}
					if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
					setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
				}
			},
			error: function () {
				TWBS.not_resp();
				if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
					delete TWBS.HighDuels.check_start[name.toLowerCase()];
				} else {
					delete TWBS.HighDuels['check' + end][playerid];
				}
				if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
				setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
			}
		});
	}
};
TWBS.HighDuels.update = function (name, id, vals, end, player) {
	/**	@param name    Player name
		@param id      Player id
		@param vals    ['', duel_rank, duel_exp, won, lost]
		@param end     '' || '_end'
		@param player  [[city_id, city_x, city_y, city_name], class, level, duel_level, rank, succ_points, [ally_id, ally_name], title, professione]	**/
	if (!name || !id || !vals || !player) {return false; }
	end = (end !== '_end') ? '' : '_end';
	var res = (end !== '_end') ? (TWBS.HighDuels.res() || {}) : (TWBS.HighDuels.end() || {});
	res[id] = {};
	res[id].name = name;
	res[id].title = player[7];
	res[id].rank = vals[1];
	res[id].exp = vals[2];
	res[id].vin = vals[3];
	res[id].per = vals[4];
	res[id].city = player[0] || null;//[id, x, y]
	res[id].player = [player[1], player[2], player[3], player[4], player[5], player[8]]; //[classe, livello, livello duello, rango, successo, professione]
	res[id].ally = player[6] || null; //[id, name]
	res[id].updated = new Date().getTime();
	if (end !== '_end') {TWBS.HighDuels.res_set(res); } else {TWBS.HighDuels.end_set(res); }
	TWBS.percent((TWBS.HighDuels.hasOwnProperty('count')) ? (TWBS.i / TWBS.HighDuels.count[1]) : 0, (TWBS.HighDuels.hasOwnProperty('count')) ? TWBS.HighDuels.count[0] : 0);
	if (TWBS.HighDuels.hasOwnProperty('count') && TWBS.HighDuels.count[1] === 4) {
		(new UserMessage("TWBS: " + TWBS.Text.added.replace('{1}', name), UserMessage.TYPE_SUCCESS)).show();
		delete TWBS.HighDuels.check_start[name.toLowerCase()];
	} else {
		delete TWBS.HighDuels['check' + end][id];
	}
	if (!TWBS.get('safe')) {TWBS.HighDuels.retables(); }
	setTimeout(TWBS.HighDuels.start_check, TWBS.get('wait') || 500);
	return true;
};
TWBS.HighDuels.update_batch = function (end) {
	/**
	 * @param end '' || '_end'
	 **/
	TWBS.percent(0.1);
	var res = TWBS.HighDuels.res(), i;
	if (res) {
		TWBS.HighDuels['check' + end] = {};
		for (i in res) {
			if (res.hasOwnProperty(i)) {
				TWBS.HighDuels['check' + end][i] = res[i].name;
			}
		}
		TWBS.HighDuels.start_check();
	} else {
		(new UserMessage("TWBS: " + TWBS.Text.no_p_insrtd, UserMessage.TYPE_ERROR)).show();
		TWBS.percent(0);
	}
};
TWBS.HighDuels.start_check = function () {
	var i, k, n;
	if (TWBS.HighDuels.hasOwnProperty('check')) {
		for (n in TWBS.HighDuels.check) {
			if (TWBS.HighDuels.check.hasOwnProperty(n) && typeof (TWBS.HighDuels.check[n]) !== 'function') {
				break;
			}
		}
		if (!TWBS.HighDuels.hasOwnProperty('count')) {
			k = 0;
			for (i in TWBS.HighDuels.check) {
				if (TWBS.HighDuels.check.hasOwnProperty(i)) {
					k += 1;
				}
			}
			TWBS.HighDuels.count = [k, 3];
		}
		if (TWBS.HighDuels.check.hasOwnProperty(n)) {
			TWBS.HighDuels.search_player(TWBS.HighDuels.check[n], n, '');
		} else {
			delete TWBS.HighDuels.check;
			delete TWBS.HighDuels.count;
			TWBS.i = 0;
			if (TWBS.get('safe')) {TWBS.HighDuels.retables(); }
			TWBS.start_check();
		}
	} else if (TWBS.HighDuels.hasOwnProperty('check_end')) {
		for (n in TWBS.HighDuels.check_end) {
			if (TWBS.HighDuels.check_end.hasOwnProperty(n) && typeof (TWBS.HighDuels.check_end[n]) !== 'function') {
				break;
			}
		}
		if (!TWBS.HighDuels.hasOwnProperty('count')) {
			k = 0;
			for (i in TWBS.HighDuels.check_end) {
				if (TWBS.HighDuels.check_end.hasOwnProperty(i)) {
					k += 1;
				}
			}
			TWBS.HighDuels.count = [k, 3];
		}
		if (TWBS.HighDuels.check_end.hasOwnProperty(n)) {
			TWBS.HighDuels.search_player(TWBS.HighDuels.check_end[n], n, '_end');
		} else {
			delete TWBS.HighDuels.check_end;
			delete TWBS.HighDuels.count;
			TWBS.i = 0;
			if (TWBS.get('safe')) {TWBS.HighDuels.retables(); }
			TWBS.HighDuels.start_check();
		}
	} else if (TWBS.HighDuels.hasOwnProperty('check_start')) {
		for (n in TWBS.HighDuels.check_start) {
			if (TWBS.HighDuels.check_start.hasOwnProperty(n) && typeof (TWBS.HighDuels.check_start[n]) !== 'function') {
				break;
			}
		}
		// TWBS.HighDuels.count è già definito
		if (TWBS.HighDuels.check_start.hasOwnProperty(n)) {
			TWBS.HighDuels.search_id(n, '');
		} else {
			delete TWBS.HighDuels.check_start;
			delete TWBS.HighDuels.count;
			TWBS.i = 0;
			if (TWBS.get('safe')) {TWBS.HighDuels.retables(); }
			TWBS.HighDuels.start_check();
		}
	} else {
		TWBS.percent(-1);
		TWBS.Data.update();
	}
};
TWBS.HighDuels.showTable = function (evt) {
	/**
	 * @param evt Event object
	 **/
	var id = evt.target.id.substr(4), where = id.substr(0, id.length - 4);
	jQuery('#TWBS_highduels_1 table').hide();
	if (where.indexOf('high') > -1) {
		jQuery('#TWBS_tables').text('');
		jQuery('#' + id.replace('TWBS', 'TWBS_table')).show();
	} else {
		jQuery('#TWBS_tables').text('.' + id + ' {display: table-row !important;}');
		jQuery('#' + where.replace('TWBS', 'TWBS_table')).show();
	}
	jQuery('.TWBS_list_tables a[id*="tab_TWBS_"]').removeClass('active');
	jQuery('.TWBS_list_tables a#tab_' + id).addClass('active');
};
TWBS.HighDuels.add_player = function () {
	var name = jQuery('#TWBS_player_name')[0], nms, i = 0, e;
	if (name.value !== '') {
		if (name.value.substr(0, 1) !== '[' && name.value.substr(-1) !== ']') {
			name.value = name.value.replace(/^\s*/gi, "").replace(/\s*$/gi, "").toLowerCase();
			TWBS.HighDuels.count = [1, 4];
			TWBS.HighDuels.check_start = {};
			TWBS.HighDuels.check_start[name.value] = name.value;
		} else {
			nms = name.value.replace(/^\[\s*/gi, "").replace(/\s*\]$/gi, "").split(',');
			e = nms.length;
			TWBS.HighDuels.count = [e, 4];
			TWBS.HighDuels.check_start = {};
			while (i < nms.length) {
				nms[i] = nms[i].replace(/^\s*/gi, "").replace(/\s*$/gi, "").toLowerCase();
				TWBS.HighDuels.check_start[nms[i]] = nms[i];
				i += 1;
			}
		}
		TWBS.HighDuels.start_check();
		name.value = '';
	}
};
TWBS.HighDuels.remove_player = function (evt) {
	/**
	 * @param evt Event object
	 **/
	var id = evt.target.id, res, end, name;
	if (!!id && confirm(TWBS.Text.rem_pl_conf)) {
		res = TWBS.HighDuels.res();
		end = TWBS.HighDuels.end();
		if (res) {
			name = res[id].name;
			delete res[id];
			TWBS.HighDuels.res_set(res);
			(new UserMessage("TWBS: " + TWBS.Text.deleted.replace('{1}', name), UserMessage.TYPE_SUCCESS)).show();
		}
		if (end) {
			delete end[id];
			TWBS.HighDuels.end_set(end);
		}
		TWBS.HighDuels.retables();
	}
};
TWBS.HighDuels.retables = function () {
	var css = jQuery('.TWBS_list_tables a.active')[0];
	TWBS.HighDuels.make_table();
	TWBS.HighDuels.make_hightable_exp();
	TWBS.HighDuels.make_hightable_win();
	TWBS.HighDuels.showTable({'target': css});
};
TWBS.HighDuels.sort_by = function (a, b) {
	/**
	 * @param a Player id
	 * @param b Player id
	 **/
	var res = TWBS.rex[0], end = TWBS.rex[1], sort = TWBS.mode.sort.split(','), par = TWBS.mode.par, mode = TWBS.mode.mode, second = (TWBS.mode.second || 0), type = TWBS.mode.type, k, j;
	if (!res || !par) {
		if (sort[2] && sort[2] !== 'last') {return 0; }
	} else if (!(res[a].hasOwnProperty(par)) || !(res[b].hasOwnProperty(par))) {
		if (sort[2] && sort[2] !== 'last') {return (!(res[a].hasOwnProperty(par))) ? mode : ((!(res[b].hasOwnProperty(par))) ? !mode : 0); }
	}
	if (sort[2] && sort[2].length > 0) {
		if (!end) {return 0; }
		k = (!end.hasOwnProperty(a) || !(end[a].hasOwnProperty(par))) ?
				((sort[2] === 'end') ?
						0 :
						((sort[2] === 'last') ?
								((typeof (res[a][par]) !== 'object') ? res[a][par] : (res[a][par] !== null ? res[a][par][second] || false : false)) :
								false
						)
					) :
				((sort[2] === 'end') ?
						((typeof (end[a][par]) !== 'object') ? end[a][par] - res[a][par] : (end[a][par] !== null ? end[a][par][second] - res[a][par][second] || false : false)) :
						((sort[2] === 'last') ?
								((typeof (end[a][par]) !== 'object') ? end[a][par] : (end[a][par] !== null ? end[a][par][second] || false : false)) :
								false
						)
					);
		j = (!end.hasOwnProperty(b) || !(end[b].hasOwnProperty(par))) ?
				((sort[2] === 'end') ?
						0 :
						((sort[2] === 'last') ?
								((typeof (res[b][par]) !== 'object') ? res[b][par] : (res[b][par] !== null ? res[b][par][second] || false : false)) :
								false
						)
					) :
				((sort[2] === 'end') ?
						((typeof (end[b][par]) !== 'object') ? end[b][par] - res[b][par] : (end[b][par] !== null ? end[b][par][second] - res[b][par][second] || false : false)) :
						((sort[2] === 'last') ?
								((typeof (end[b][par]) !== 'object') ? end[b][par] : (end[b][par] !== null ? end[b][par][second] || false : false)) :
								false
						)
					);
	} else {
		k = (typeof (res[a][par]) !== 'object') ? res[a][par] : (res[a][par] !== null ? res[a][par][second] || false : false);
		j = (typeof (res[b][par]) !== 'object') ? res[b][par] : (res[b][par] !== null ? res[b][par][second] || false : false);
	}
	if (k === false || j === false) {
		return (j) ? mode : ((k) ? !mode : 0);
	} else {
		if (type === 'string') {
			if (k.toLowerCase() > j.toLowerCase()) {
				return !mode;
			} else if (k.toLowerCase() < j.toLowerCase()) {
				return mode;
			} else {
				return 0;
			}
		} else {
			if (Number(k) > Number(j)) {
				return !mode;
			} else if (Number(k) < Number(j)) {
				return mode;
			} else {
				return 0;
			}
		}
	}
};
TWBS.HighDuels.change_sort_direct = function (evt) {
	/**
	 * @param evt Event object
	 **/
	var sort = TWBS.get('sort'), sp = evt.target.getAttribute('to').split(',');
	if (sort && sort.split(',')[0] !== sp[0]) {
		sort = sort.split(',')[1];
	} else if (sort && sort.split(',')[0] === sp[0]) {
		sort = (sort.split(',')[1].length) ? '' : 'true';
	} else {
		sort = '';
	}
	if (sp[1] && sp[1].length !== 0) {
		sort += ',' + sp[1];
	} else {
		sort += ',';
	}
	TWBS.set('sort', sp[0] + ',' + sort);
	TWBS.HighDuels.make_table();
};
TWBS.HighDuels.to_sort = function (array, get) {
	/**
	 * @param array Array to be sorted
	 * @param get "sort"
	 **/
	if (get === "sort" && array) {
		TWBS.mode = {};
		TWBS.mode.sort = TWBS.get('sort');
		TWBS.mode.mode = (TWBS.mode.sort.split(',')[1].length !== 0);
		TWBS.mode.par = TWBS.mode.sort.split(',')[0];
		switch (TWBS.mode.par) {
		case "name":
			TWBS.mode.type = 'string';
			break;
		case "exp":
		case "vin":
		case "per":
		case "rank":
			TWBS.mode.type = 'number';
			break;
		case "class":
			TWBS.mode.par = "player";
			TWBS.mode.second = 0;
			TWBS.mode.type = 'string';
			break;
		case "liv":
			TWBS.mode.par = "player";
			TWBS.mode.second = 1;
			TWBS.mode.type = 'number';
			break;
		case "liv_duel":
			TWBS.mode.par = "player";
			TWBS.mode.second = 2;
			TWBS.mode.type = 'number';
			break;
		case "rank_p":
			TWBS.mode.par = "player";
			TWBS.mode.second = 3;
			TWBS.mode.type = 'number';
			break;
		case "sux":
			TWBS.mode.par = "player";
			TWBS.mode.second = 4;
			TWBS.mode.type = 'number';
			break;
		case "craft":
			TWBS.mode.par = "player";
			TWBS.mode.second = 5;
			TWBS.mode.type = 'number';
			break;
		case "ally":
			TWBS.mode.second = 1;
			TWBS.mode.type = 'string';
			break;
		case "city":
			TWBS.mode.second = 3;
			TWBS.mode.type = 'string';
			break;
		default:
			TWBS.mode.type = 'string';
			break;
		}
		array.sort(TWBS.HighDuels.sort_by);
		delete TWBS.mode;
	}
	return array;
};
TWBS.HighDuels.make_table = function () {
	var html0 = '', html1 = '', html2 = '', res = TWBS.HighDuels.res(), end = TWBS.HighDuels.end(), i, id, el = [], isend, br = '&lt;br&gt;', title, titen, pl = " class='TWBS_duels_inf' style='display:none;'", st = " class='TWBS_duels_sta' style='display:none;'", en = " class='TWBS_duels_end' style='display:none;'", enh = " title=\"" + TWBS.Text.tab_rel + "\"" + en, cs = "a href='#' class='TWBS_change_sort'", name, ptitle, city, ally;
	if (res) {
		html0 += "<tr" + pl + "><th><" + cs + " to='name'>" + TWBS.Text.tab_name + "</a></th>";
		html0 += "<th><" + cs + " to='class,last'>" + TWBS.Text.tab_class + "</a></th>" + "<th><" + cs + " to='craft,last'>" + TWBS.Text.tab_craft + "</a></th>" + "<th>" + TWBS.Text.tab_title + "</th><th><" + cs + " to='city,last'>" + TWBS.Text.tab_city + "</a></th><th><" + cs + " to='ally,last'>" + TWBS.Text.tab_ally + "</a></th>";
		html0 += "<th class='TWBS_player_action' style='display: none;'></th></tr>";
		html1 += "<tr" + st + "><th><" + cs + " to='name'>" + TWBS.Text.tab_name + "</a></th>";
		html1 += "<th><" + cs + " to='liv'>" + TWBS.Text.tab_liv + "</a></th><th><" + cs + " to='rank_p'>" + TWBS.Text.tab_rank + "</a></th><th><" + cs + " to='sux'>" + TWBS.Text.tab_succ + "</a></th><th><" + cs + " to='liv_duel'>" + TWBS.Text.tab_liv_duel + "</a></th><th><" + cs + " to='rank'>" + TWBS.Text.tab_rank_duel + "</a></th><th><" + cs + " to='exp'>" + TWBS.Text.tab_exp + "</a></th><th><" + cs + " to='vin'>" + TWBS.Text.tab_win + "</a></th><th><" + cs + " to='per'>" + TWBS.Text.tab_lost + "</a></th><th>" + TWBS.Text.tab_diff + "</th>";
		html1 += "<th class='TWBS_player_action' style='display: none;'></th></tr>";
		html2 += "<tr" + enh + "><th><" + cs + " to='name'>" + TWBS.Text.tab_name + "</a></th>";
		html2 += "<th><" + cs + " to='liv,end'>" + TWBS.Text.tab_liv + "</a></th><th><" + cs + " to='rank_p,end'>" + TWBS.Text.tab_rank + "</a></th><th><" + cs + " to='sux,end'>" + TWBS.Text.tab_succ + "</a></th><th><" + cs + " to='liv_duel,end'>" + TWBS.Text.tab_liv_duel + "</a></th><th><" + cs + " to='rank,end'>" + TWBS.Text.tab_rank_duel + "</a></th><th><" + cs + " to='exp,end'>" + TWBS.Text.tab_exp + "</a></th><th><" + cs + " to='vin,end'>" + TWBS.Text.tab_win + "</a></th><th><" + cs + " to='per,end'>" + TWBS.Text.tab_lost + "</a></th><th>" + TWBS.Text.tab_diff + "</th>";
		html2 += "<th class='TWBS_player_action' style='display: none;'></th></tr>";
		for (i in res) {
			if (res.hasOwnProperty(i)) {
				el.push(i);
			}
		}
		if (TWBS.get('sort')) {
			TWBS.rex = [res, end];
			el = TWBS.HighDuels.to_sort(el, 'sort');
			delete TWBS.rex;
		}
		i = 0;
		while (i < el.length) {
			id = el[i];
			if (res.hasOwnProperty(id)) {
				isend = end ? end.hasOwnProperty(id) : false;
				title = ((res[id].updated) ? " title='" + TWBS.Text.tab_updated + ": " + TWBS.date_to_string(res[id].updated) + "'" : "");
				titen = br + ((isend) ? ((end[id].updated) ? TWBS.Text.tab_updated + ": " + TWBS.date_to_string(end[id].updated) : "") : "");
				name = TWBS.lesstring(res[id].name, 12);
				ptitle = TWBS.lesstring((isend ? end[id].title : res[id].title), 12);
				html0 += "<tr" + pl + "><td><a href='javascript:" + TWBS.openProfile(id) + "' title=\"" + name[1] + "\">" + name[0] + "</a></td>";
				html1 += "<tr" + st + "><td><a href='javascript:" + TWBS.openProfile(id) + "' title=\"" + name[1] + "\">" + name[0] + "</a></td>";
				html2 += "<tr" + en + "><td><a href='javascript:" + TWBS.openProfile(id) + "' title=\"" + name[1] + "\">" + name[0] + "</a></td>";
				html0 += "<td><img title='" + (isend ? TWBS.Text[end[id].player[0]] : TWBS.Text[res[id].player[0]]) + "' src='" + TWBS.main_server + "/images/class_choose/symbol_" + (isend ? end[id].player[0] : res[id].player[0]) + ".png' width='20px' /></td>";
				html0 += "<td><img title='" + (isend ? TWBS.Text['craft' + end[id].player[5]] : TWBS.Text['craft' + res[id].player[5]]) + "' src='" + TWBS.main_server + "/images/crafting/profsymbol_" + (isend ? end[id].player[5] : res[id].player[5]) + "_small.png' width='20px' /></td>";
				html0 += "<td title=\"" + ptitle[1] + "\">" + ptitle[0] + "</td>";
				city = (isend ? (end[id].city && end[id].city[0] ? TWBS.lesstring(end[id].city[3], 12) : [TWBS.Text.no_city, TWBS.Text.no_city]) : (res[id].city && res[id].city[0] ? TWBS.lesstring(res[id].city[3], 12) : [TWBS.Text.no_city, TWBS.Text.no_city]));
				html0 += "<td>" + (isend ? (end[id].city && end[id].city[0] ? "<a href='javascript:AjaxWindow.show(\"town\",{town_id:" + end[id].city[0] + "},\"" + end[id].city[1] + "_" + end[id].city[2] + "\");' title=\"" + city[1] + "\">" + city[0] + "</a>" : TWBS.Text.no_city) : (res[id].city && res[id].city[0] ? "<a href='javascript:AjaxWindow.show(\"town\",{town_id:" + res[id].city[0] + "},\"" + res[id].city[1] + "_" + res[id].city[2] + "\");' title=\"" + city[1] + "\">" + city[0] + "</a>" : TWBS.Text.no_city)) + "</td>";
				ally = (isend ? (end[id].ally && end[id].ally[0] ? TWBS.lesstring(end[id].ally[1], 12) : [TWBS.Text.no_ally, TWBS.Text.no_ally]) : (res[id].ally && res[id].ally[0] ? TWBS.lesstring(res[id].ally[1], 12) : [TWBS.Text.no_ally, TWBS.Text.no_ally]));
				html0 += "<td>" + (isend ? (end[id].ally && end[id].ally[0] ? "<a href='javascript:Alliance.show(" + end[id].ally[0] + ");' title=\"" + ally[1] + "\">" + ally[0] + "</a>" : TWBS.Text.no_ally) : (res[id].ally && res[id].ally[0] ? "<a href='javascript:Alliance.show(" + res[id].ally[0] + ");' title=\"" + ally[1] + "\">" + ally[0] + "</a>" : TWBS.Text.no_ally)) + "</td>";
				html1 += "<td" + title + ">" + (res[id].player[1] || "?") + "</td>";
				html1 += "<td" + title + ">" + (res[id].player[3] || "?") + "</td>";
				html1 += "<td" + title + "><a href='javascript:AchievementWindow.open(" + id + ")'>" + (res[id].player[4] || "?") + "</a></td>";
				html1 += "<td" + title + ">" + (res[id].player[2] || "?") + "</td>";
				html1 += "<td" + title + ">" + (res[id].rank || "?") + "</td>";
				html1 += "<td" + title + ">" + (res[id].exp || "?") + "</td>";
				html1 += "<td" + title + ">" + (res[id].vin || "?") + "</td>";
				html1 += "<td" + title + ">" + (res[id].per || "?") + "</td>";
				html1 += "<td" + title + ">" + ((res[id].vin > -1 && res[id].per > -1) ? res[id].vin - res[id].per : "?") + "</td>";
				if (isend) {
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].player[1] + br + TWBS.Text.tab_end + ": " + end[id].player[1] + titen + "'>" + (end[id].player[1] - res[id].player[1]) + "</td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].player[3] + br + TWBS.Text.tab_end + ": " + end[id].player[3] + titen + "'>" + (res[id].player[3] - end[id].player[3]) + "</td>"; //rango, giusto al contrario
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].player[4] + br + TWBS.Text.tab_end + ": " + end[id].player[4] + titen + "'><a href='javascript:AchievementWindow.open(" + id + ")'>" + (end[id].player[4] - res[id].player[4]) + "</a></td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].player[2] + br + TWBS.Text.tab_end + ": " + end[id].player[2] + titen + "'>" + (end[id].player[2] - res[id].player[2]) + "</td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].rank + br + TWBS.Text.tab_end + ": " + end[id].rank + titen + "'>" + (res[id].rank - end[id].rank) + "</td>"; //rango, giusto al contrario
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].exp + br + TWBS.Text.tab_end + ": " + end[id].exp + titen + "'>" + (end[id].exp - res[id].exp) + "</td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].vin + br + TWBS.Text.tab_end + ": " + end[id].vin + titen + "'>" + (end[id].vin - res[id].vin) + "</td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + res[id].per + br + TWBS.Text.tab_end + ": " + end[id].per + titen + "'>" + (end[id].per - res[id].per) + "</td>";
					html2 += "<td title='" + TWBS.Text.tab_start + ": " + (res[id].vin - res[id].per) + br + TWBS.Text.tab_end + ": " + (end[id].vin - end[id].per) + titen + "'>" + ((end[id].vin - end[id].per) - (res[id].vin - res[id].per)) + "</td>";
				} else {
					html2 += "<td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td>";
				}
				html0 += "<td class='TWBS_player_action'><a href='#' class='TWBS_player_remove' id='" + id + "'><img id='" + id + "' src='" + TWBS.img.remove + "' title='" + TWBS.Text.tab_delete + "' /></a></td></tr>";
				html1 += "<td class='TWBS_player_action'><a href='#' class='TWBS_player_remove' id='" + id + "'><img id='" + id + "' src='" + TWBS.img.remove + "' title='" + TWBS.Text.tab_delete + "' /></a></td></tr>";
				html2 += "<td class='TWBS_player_action'><a href='#' class='TWBS_player_remove' id='" + id + "'><img id='" + id + "' src='" + TWBS.img.remove + "' title='" + TWBS.Text.tab_delete + "' /></a></td></tr>";
			}
			i += 1;
		}
	} else {
		html0 += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noone + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_duels').html(html0 + html1 + html2);
	jQuery(".TWBS_change_sort").click(TWBS.HighDuels.change_sort_direct);
	jQuery(".TWBS_player_remove").click(TWBS.HighDuels.remove_player);
	return true;
};
TWBS.HighDuels.high_sort_exp = function (a, b) {
	/**
	 * @param a Player id
	 * @param b Player id
	 **/
	var res = TWBS.rex[0], end = TWBS.rex[1], aa, bb, xd, vd, pd;
	if (!res && !end) {return; }
	aa = (end[a].exp - res[a].exp) * end[a].player[2] / (((end[a].per - res[a].per) === 1 ? 1.5 : (end[a].per - res[a].per)) || 1);
	bb = (end[b].exp - res[b].exp) * end[b].player[2] / (((end[b].per - res[b].per) === 1 ? 1.5 : (end[b].per - res[b].per)) || 1);
	if (aa > bb) {
		return 1;
	} else if (aa < bb) {
		return -1;
	} else {
		xd = [(end[a].exp - res[a].exp), (end[b].exp - res[b].exp)];
		if (xd[0] > xd[1]) {
			return 1;
		} else if (xd[0] < xd[1]) {
			return -1;
		} else {
			vd = [(end[a].vin - res[a].vin), (end[b].vin - res[b].vin)];
			if (vd[0] > vd[1]) {
				return 1;
			} else if (vd[0] < vd[1]) {
				return -1;
			} else {
				pd = [(end[a].per - res[a].per), (end[b].per - res[b].per)];
				if (pd[0] < pd[1]) { //meno ne perde meglio è
					return 1;
				} else if (pd[0] > pd[1]) {
					return -1;
				} else {
					return 0;
				}
			}
		}
	}
};
TWBS.HighDuels.make_hightable_exp = function () {
	var html = '', res = TWBS.HighDuels.res(), end = TWBS.HighDuels.end(), i, e, el = [];
	if (res && end) {
		for (i in res) {
			if (res.hasOwnProperty(i) && end.hasOwnProperty(i)) {
				el.push(i);
			}
		}
		html += "<tr><th>" + TWBS.Text.tab_pos + "</th><th>" + TWBS.Text.tab_name + "</th><th>" + TWBS.Text.tab_points + "</th><th>" + TWBS.Text.tab_liv_duel + "</th><th>" + TWBS.Text.tab_exp + " (" + TWBS.Text.tab_diff + ")</th><th>" + TWBS.Text.tab_lost + " (" + TWBS.Text.tab_diff + ")</th><th>" + TWBS.Text.tab_win + " (" + TWBS.Text.tab_diff + ")</th></tr>";
		TWBS.rex = [res, end];
		el.sort(TWBS.HighDuels.high_sort_exp);
		delete TWBS.rex;
		i = e = el.length;
		while (i--) {
			html += "<tr>";
			html += "<td>" + (e - i) + "</td>";
			html += "<td><a href='javascript:" + TWBS.openProfile(el[i]) + ";'>" + res[el[i]].name + "</a></td>";
			html += "<td title='" + (end[el[i]].exp - res[el[i]].exp) + " * " + end[el[i]].player[2] + " / " + (((end[el[i]].per - res[el[i]].per) === 1 ? 1.5 : (end[el[i]].per - res[el[i]].per)) || 1) + "'>" + (Math.round(((end[el[i]].exp - res[el[i]].exp) * end[el[i]].player[2] / (((end[el[i]].per - res[el[i]].per) === 1 ? 1.5 : (end[el[i]].per - res[el[i]].per)) || 1)) * 100) / 100) + "</td>";
			html += "<td>" + end[el[i]].player[2] + "</td>";
			html += "<td>" + (end[el[i]].exp - res[el[i]].exp) + "</td>";
			html += "<td>" + (end[el[i]].per - res[el[i]].per) + "</td>";
			html += "<td>" + (end[el[i]].vin - res[el[i]].vin) + "</td>";
			html += "</tr>";
		}
	} else {
		html += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noone + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_highduels_exp').html(html);
	return true;
};
TWBS.HighDuels.high_sort_win = function (a, b) {
	/**
	 * @param a Player id
	 * @param b Player id
	 **/
	var res = TWBS.rex[0], end = TWBS.rex[1], vd, pd;
	if (!res && !end) {return; }
	vd = [(end[a].vin - res[a].vin), (end[b].vin - res[b].vin)];
	pd = [(end[a].per - res[a].per), (end[b].per - res[b].per)];
	if (vd[0] - pd[0] > vd[1] - pd[1]) {
		return 1;
	} else if (vd[0] - pd[0] < vd[1] - pd[1]) {
		return -1;
	} else {
		if (vd[0] > vd[1]) {
			return 1;
		} else if (vd[0] < vd[1]) {
			return -1;
		} else {
			return 0;
		}
	}
};
TWBS.HighDuels.make_hightable_win = function () {
	var html = '', res = TWBS.HighDuels.res(), end = TWBS.HighDuels.end(), i, e, el = [];
	if (res && end) {
		for (i in res) {
			if (res.hasOwnProperty(i) && end.hasOwnProperty(i)) {
				el.push(i);
			}
		}
		html += "<tr><th>" + TWBS.Text.tab_pos + "</th><th>" + TWBS.Text.tab_name + "</th><th>" + TWBS.Text.tab_diff + "</th><th>" + TWBS.Text.tab_win + " (" + TWBS.Text.tab_diff + ")</th><th>" + TWBS.Text.tab_lost + " (" + TWBS.Text.tab_diff + ")</th></tr>";
		TWBS.rex = [res, end];
		el.sort(TWBS.HighDuels.high_sort_win);
		delete TWBS.rex;
		i = e = el.length;
		while (i--) {
			html += "<tr>";
			html += "<td>" + (e - i) + "</td>";
			html += "<td><a href='javascript:" + TWBS.openProfile(el[i]) + ";'>" + res[el[i]].name + "</a></td>";
			html += "<td>" + ((end[el[i]].vin - res[el[i]].vin) - (end[el[i]].per - res[el[i]].per)) + "</td>";
			html += "<td>" + (end[el[i]].vin - res[el[i]].vin) + "</td>";
			html += "<td>" + (end[el[i]].per - res[el[i]].per) + "</td>";
			html += "</tr>";
		}
	} else {
		html += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noone + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_highduels_win').html(html);
	return true;
};
TWBS.HighDuels.recover = function () {
	TWBS.Export.add();
};
TWBS.Settings = {x: 748, y: 471};
TWBS.Settings.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	var html = '', rows, order, wait, safe, name, force, langLabel, IndexedDB, IndexedDB_text;
	html += "<table width='100%' class='TWBS_tab_table'>";
	rows = [1, 4, 3];
	html += "<tr><td width='50%' rowspan='" + rows[0] + "'><b>" + TWBS.Text.reload_win + "</b></td>";
	html += "<td rowspan='" + (rows[0] + 1) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='" + (rows[0] + 1) + "' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='" + (rows[0] + 1) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";
	html += "<td width='50%' colspan='2' id='TWBS_lang_container'>";
	html += "</td></tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr><td colspan='6'><b>" + TWBS.Text.not_reload + "</b></td></tr>";
	html += "<tr>";

	html += "<td width='50%'><table class='TWBS_settings_table'>";
	html += "<tr><td colspan='2' id='TWBS_wait_container' title=\"" + TWBS.Text.wait[1] + "\"></td></tr>";
	html += "<tr><td id='TWBS_safe' colspan='2' title='" + TWBS.Text.safe[1] + "'></td></tr>";
	html += "<tr><td colspan='2' style='font-weight: bold;'><div class='TWBS_border_shadow_hor'></div>" + TWBS.Text.duels_highs + "</td>";
	html += "<tr><td id='TWBS_sort_container'></td><td id='TWBS_sort_order_container'></td></tr>";
	html += "<tr><td colspan='2'><a href='#' id='TWBS_reset_hd'>" + TWBS.Text.reset + "</a> | <a href='#' id='TWBS_recov_hd'>" + TWBS.Text.exp_data + "</a></td></tr>";
	html += "</table></td>";

	html += "<td rowspan='" + rows[1] + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='" + rows[1] + "' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='" + rows[1] + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";

	html += "<td width='50%'><table width='100%' class='TWBS_settings_table'>";
	html += "<tr><td colspan='2' style='font-weight: bold;'><div class='TWBS_border_shadow_hor'></div>" + TWBS.Text.duels_single + "</td>";
	html += "<tr><td width='60%'>" + TWBS.Text.select_sort.replace('{1}', TWBS.Text.hits + ' ') + "</td><td id='TWBS_sort_s_order_container' width='40%'></td></tr>";
	html += "<tr><td colspan='2' id='TWBS_sort_s_container'></td></tr>";
	html += "<tr><td width='60%'>" + TWBS.Text.select_sort.replace('{1}', TWBS.Text.results + ' ') + "</td><td id='TWBS_sort_s2_order_container' width='40%'></td></tr>";
	html += "<tr><td colspan='2' id='TWBS_sort_s2_container'></td></tr>";
	html += "<tr><td colspan='2'><a href='#' id='TWBS_reset_sd'>" + TWBS.Text.reset + "</a> | <a href='#' id='TWBS_recov_sd'>" + TWBS.Text.recov + "</a></td></tr>";
	html += "</table></td>";

	html += "</tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr>";
	html += "<td id='TWBS_IndexedDB'></td>";
	html += "<td id='TWBS_HF_statsType'></td>";
	html += "</tr>";
	html += "<tr id='TWBS_cache_status'></tr>";
	html += "</table>";
	jQuery('#TWBS_Settings').html(html);

	force = TWBS.get('lang');
	langLabel = jQuery("<label id='co_label4TWBS_lang' for='TWBS_lang'>" + TWBS.Text.select_lang + " </label>");
	this.langCombo = new tw2gui.combobox("TWBS_lang");
	this.langCombo.addItem('none', '<img src="http://gamebar.innogames.de/free/' + (TWBS.domain !== "net" ? TWBS.domain : "zz") + '.gif" title="' + TWBS.Text.select + '"> ' + TWBS.Text.select);
	for (name in TWBS.Langs) {
		if (TWBS.Langs.hasOwnProperty(name) && TWBS.Langs[name].hasOwnProperty('lang_name')) {
			this.langCombo.addItem(name, '<img src="http://gamebar.innogames.de/free/' + name + '.gif" title="' + TWBS.Langs[name].lang_name + '"> ' + TWBS.Langs[name].lang_name);
		}
	}
	this.langCombo.addItem('add', '++ ' + TWBS.Text.addlang);
	jQuery('#TWBS_lang_container').append(langLabel, ' ', this.langCombo.getMainDiv());
	this.langCombo.select(force || 'none');
	this.langCombo.addListener(function () {
		var newlang;
		if (TWBS.Settings.langCombo.getValue() === 'add') {
			newlang = prompt('ADD LANGUAGE PACK\n\n Visit your community forum or the script homepage to know if there is one for your language or learn how to make your own at this page: http://userscripts.org/scripts/show/94133\n\nPlease enter a valid language pack url:\n', (TWBS.get("LanguagePack") ? decodeURIComponent(TWBS.get("LanguagePack")) : "http://"));
			if (newlang != null) {
				if (newlang.length > 7 && decodeURIComponent(TWBS.get("LanguagePack")) != newlang) {
					TWBS.Settings.addLanguage(newlang);
				} else {
					TWBS.del("LanguagePack");
				}
			}
			TWBS.Settings.langCombo.select(TWBS.get('lang') || 'none');
		} else {
			TWBS.Settings.change_lang();
		}
	});
	this.langCombo.setWidth(92);

	safe = TWBS.get('safe') === 'true';
	this.safeMode = new tw2gui.checkbox(TWBS.Text.safe[0]);
	this.safeMode.divMain.appendTo('#TWBS_safe');
	this.safeMode.setSelected(safe);
	this.safeMode.setCallback(function () {
		TWBS.set('safe', TWBS.Settings.safeMode.isSelected());
	});

	wait = TWBS.get('wait') || 500;
	this.waitCombo = new tw2gui.combobox("TWBS_wait");
	this.waitCombo.addItem('0', TWBS.Text.wait_0);
	this.waitCombo.addItem('200', TWBS.Text.wait_200);
	this.waitCombo.addItem('500', TWBS.Text.wait_500);
	this.waitCombo.addItem('1000', TWBS.Text.wait_1000);
	jQuery('#TWBS_wait_container').append(jQuery("<label id='co_label4TWBS_wait' for='TWBS_wait'>" + TWBS.Text.wait[0] + "</label>"), ' ', this.waitCombo.getMainDiv());
	this.waitCombo.select(wait.toString() || '500');
	this.waitCombo.addListener(function () {
		TWBS.set('wait', TWBS.Settings.waitCombo.getValue());
	});
	this.waitCombo.setWidth(78);

	order = TWBS.get('sort');
	if (order) {order = order.split(',')[0] + (order.split(',')[2] ? ',' + order.split(',')[2] : ''); }
	this.sortCombo = new tw2gui.combobox("TWBS_sort");
	this.sortCombo.addItem('none', TWBS.Text.select);
	this.sortCombo.addItem('name', TWBS.Text.tab_name);
	this.sortCombo.addItem('class,last', TWBS.Text.tab_class);
	this.sortCombo.addItem('craft,last', TWBS.Text.tab_craft);
	this.sortCombo.addItem('rank_p', TWBS.Text.tab_rank);
	this.sortCombo.addItem('liv', TWBS.Text.tab_liv);
	this.sortCombo.addItem('liv_duel', TWBS.Text.tab_liv_duel);
	this.sortCombo.addItem('rank', TWBS.Text.tab_rank_duel);
	this.sortCombo.addItem('sux', TWBS.Text.tab_succ);
	this.sortCombo.addItem('ally,last', TWBS.Text.tab_ally);
	this.sortCombo.addItem('city,last', TWBS.Text.tab_city);
	this.sortCombo.addItem('exp', TWBS.Text.tab_exp);
	this.sortCombo.addItem('vin', TWBS.Text.win);
	this.sortCombo.addItem('per', TWBS.Text.lost);
	this.sortCombo.addItem('rank_p,end', TWBS.Text.tab_rank + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('liv,end', TWBS.Text.tab_liv + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('liv_duel,end', TWBS.Text.tab_liv_duel + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('rank,end', TWBS.Text.tab_rank_duel + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('sux,end', TWBS.Text.tab_succ + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('vin,end', TWBS.Text.win + " (" + TWBS.Text.tab_diff + ")");
	this.sortCombo.addItem('per,end', TWBS.Text.lost + " (" + TWBS.Text.tab_diff + ")");
	jQuery('#TWBS_sort_container').append(jQuery("<label id='co_label4TWBS_sort' for='TWBS_sort'>" + TWBS.Text.select_sort.replace('{1}', '') + "</label>"), ' ', this.sortCombo.getMainDiv());
	this.sortCombo.select(order || 'none');
	this.sortCombo.addListener(function () {
		TWBS.Settings.change_sort();
	});
	this.sortCombo.setWidth(140);

	order = TWBS.get('sort');
	if (order && order.split(',')[1] && order.split(',')[1].length) {order = true; } else {order = false; }
	this.sortMode = new tw2gui.checkbox(order ? TWBS.Text.sort_up : TWBS.Text.sort_down);
	this.sortMode.divMain.css({background: 'none', 'padding-left': '0', 'text-shadow': '1px 1px 2px black'});
	this.sortMode.divMain.appendTo('#TWBS_sort_order_container');
	this.sortMode.setSelected(order);
	this.sortMode.setCallback(function () {
		var newval = TWBS.Settings.sortMode.isSelected();
		if (newval) {
			TWBS.Settings.sortMode.divMain.text(TWBS.Text.sort_up);
		} else {
			TWBS.Settings.sortMode.divMain.text(TWBS.Text.sort_down);
		}
		TWBS.Settings.change_sort();
	});

	order = TWBS.get('sort_s');
	if (order) {order = order.split(',')[0]; }
	this.sort_sCombo = new tw2gui.combobox("TWBS_sort_s");
	this.sort_sCombo.addItem('none', TWBS.Text.select);
	this.sort_sCombo.addItem('1', TWBS.Text.best_hit);
	this.sort_sCombo.addItem('2', TWBS.Text.best_duel);
	this.sort_sCombo.addItem('3', TWBS.Text.worst_hit);
	this.sort_sCombo.addItem('4', TWBS.Text.worst_duel);
	jQuery('#TWBS_sort_s_container').append(this.sort_sCombo.getMainDiv());
	this.sort_sCombo.select(order || 'none');
	this.sort_sCombo.addListener(function () {
		TWBS.Settings.change_hit('_s');
	});
	this.sort_sCombo.setWidth(105);

	order = TWBS.get('sort_s');
	if (order && order.split(',')[1] && order.split(',')[1].length) {order = true; } else {order = false; }
	this.sort_sMode = new tw2gui.checkbox(order ? TWBS.Text.sort_up : TWBS.Text.sort_down);
	this.sort_sMode.divMain.css({background: 'none', 'padding-left': '0', 'text-shadow': '1px 1px 2px black'});
	this.sort_sMode.divMain.appendTo('#TWBS_sort_s_order_container');
	this.sort_sMode.setSelected(order);
	this.sort_sMode.setCallback(function () {
		var newval = TWBS.Settings.sort_sMode.isSelected();
		if (newval) {
			TWBS.Settings.sort_sMode.divMain.text(TWBS.Text.sort_up);
		} else {
			TWBS.Settings.sort_sMode.divMain.text(TWBS.Text.sort_down);
		}
		TWBS.Settings.change_hit('_s');
	});

	order = TWBS.get('sort_s2');
	if (order) {order = order.split(',')[0]; }
	this.sort_s2Combo = new tw2gui.combobox("TWBS_sort_s2");
	this.sort_s2Combo.addItem('none', TWBS.Text.select);
	this.sort_s2Combo.addItem('1', TWBS.Text.high_exp);
	this.sort_s2Combo.addItem('2', TWBS.Text.high_$$);
	this.sort_s2Combo.addItem('3', TWBS.Text.high_bou);
	this.sort_s2Combo.addItem('4', TWBS.Text.high_exp + " (" + TWBS.Text.opponent + ")");
	this.sort_s2Combo.addItem('5', TWBS.Text.high_$$ + " (" + TWBS.Text.opponent + ")");
	this.sort_s2Combo.addItem('6', TWBS.Text.high_bou + " (" + TWBS.Text.opponent + ")");
	jQuery('#TWBS_sort_s2_container').append(this.sort_s2Combo.getMainDiv());
	this.sort_s2Combo.select(order || 'none');
	this.sort_s2Combo.addListener(function () {
		TWBS.Settings.change_hit('_s2');
	});
	this.sort_s2Combo.setWidth(185);

	order = TWBS.get('sort_s2');
	if (order && order.split(',')[1] && order.split(',')[1].length) {order = true; } else {order = false; }
	this.sort_s2Mode = new tw2gui.checkbox(order ? TWBS.Text.sort_up : TWBS.Text.sort_down);
	this.sort_s2Mode.divMain.css({background: 'none', 'padding-left': '0', 'text-shadow': '1px 1px 2px black'});
	this.sort_s2Mode.divMain.appendTo('#TWBS_sort_s2_order_container');
	this.sort_s2Mode.setSelected(order);
	this.sort_s2Mode.setCallback(function () {
		var newval = TWBS.Settings.sort_s2Mode.isSelected();
		if (newval) {
			TWBS.Settings.sort_s2Mode.divMain.text(TWBS.Text.sort_up);
		} else {
			TWBS.Settings.sort_s2Mode.divMain.text(TWBS.Text.sort_down);
		}
		TWBS.Settings.change_hit('_s2');
	});

	IndexedDB = TWBS.get('IndexedDB');
	this.IndexedDB = new tw2gui.checkbox('IndexedDB' + (IndexedDB === 'nosupport' ? ' (' + TWBS.Text.IndexedDB_nsp + ')' : ''));
	this.IndexedDB.divMain.attr('title', TWBS.Text.IndexedDB_tip);
	this.IndexedDB.divMain.appendTo('#TWBS_IndexedDB');
	this.IndexedDB.setSelected(IndexedDB === 'true');
	if (IndexedDB === 'nosupport') {
		this.IndexedDB.setCallback(function () {alert(TWBS.Text.IDB_not_supp); return false; });
		this.IndexedDB.divMain.css({background: 'none', 'padding-left': '0'});
	} else {
		this.IndexedDB.setCallback(function () {
			try {
				TWBS.set('IndexedDB', TWBS.get('IndexedDB') == 'nosupport' ? 'nosupport' : (TWBS.Settings.hasOwnProperty('IndexedDB') ? TWBS.Settings.IndexedDB.isSelected() : false));
				TWBS.cache();
				TWBS.Settings.change_storage(0);
			} catch (e) {
				TWBS.log(e);
				return TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'About');
			}
		});
	}
	IndexedDB_text = new Element('span', {styles: {'font-size': 'smaller'}});
	IndexedDB_text.appendText(' [');
	IndexedDB_text.appendChild(new Element('a', {target: '_blank', href: 'http://caniuse.com/#search=indexeddb', styles: {'font-size': 'smaller'}}).appendText(TWBS.Text.Ind_info));
	IndexedDB_text.appendText(']');
	$('TWBS_IndexedDB').appendChild(IndexedDB_text);

	jQuery('#TWBS_reset_hd').click(function () {if (confirm(TWBS.Text.rem_data_conf)) {TWBS.Data.removeItem('HighDuels', 'res'); TWBS.Data.removeItem('HighDuels', 'end'); TWBS.Data.update(); } });
	jQuery('#TWBS_recov_hd').click(TWBS.HighDuels.recover);
	jQuery('#TWBS_reset_sd').click(function () {if (confirm(TWBS.Text.rem_data_conf)) {TWBS.Data.removeItem('SingleDuels', 'res'); TWBS.Data.update(); } });
	jQuery('#TWBS_recov_sd').click(TWBS.SingleDuels.recover);

	this.cache();

	this.statsType = new tw2gui.button(TWBS.Text.statsType, function () {TWBS.HighForts.typeStats.show(); });
	this.statsType.appendTo('#TWBS_HF_statsType');

	wman.windowIds.TWBS.hideLoader();
};
TWBS.Settings.cache = function () {
	if (!jQuery('#TWBS_cache_status').size()) {return; }
	jQuery('#TWBS_cache_status').html('');
	jQuery('#TWBS_cache_status').append(jQuery('<td></td>').html('<div>' + (TWBS.HighDuels.loaded > 0
	? (
			TWBS.HighDuels.loaded >= 2
			? ('<span style=\'color: green;\'>' + TWBS.Text.cacheloaded.replace('{1}', TWBS.Text.duels_highs) + '</span>')
			: ('<span style=\'color: red;\'>' + TWBS.Text.cachehloaded.replace('{1}', TWBS.Text.duels_highs) + '</span>')
		)
	: ('<span style=\'color: red;\'>' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.duels_highs) + '</span>')) + '</div><div>' + (TWBS.HighForts.loaded > 0
		? ('<span style=\'color: green;\'>' + TWBS.Text.cacheloaded.replace('{1}', TWBS.Text.forts_highs) + '</span>')
		: ('<span style=\'color: red;\'>' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.forts_highs) + '</span>')) + '</div><div>' + (TWBS.SingleDuels.loaded > 0
		? ('<span style=\'color: green;\'>' + TWBS.Text.cacheloaded.replace('{1}', TWBS.Text.duels_single) + '</span>')
		: ('<span style=\'color: red;\'>' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.duels_single) + '</span>')) + '</div>'));
};
TWBS.Settings.change_lang = function (x) {
	var type, i, y = true, lan = TWBS.Settings.hasOwnProperty('langCombo') ? TWBS.Settings.langCombo.getValue() || false : false;
	if (lan && !x) {
		if (TWBS.Langs[lan] && lan !== 'none') {
			if (TWBS.get('lang') === lan) {y = false; }
			TWBS.set('lang', lan);
			TWBS.ln = lan;
		} else {
			TWBS.del('lang');
			TWBS.ln = TWBS.domain;
		}
	}
	if (TWBS.Langs.hasOwnProperty(TWBS.ln) && y) {
		for (type in TWBS.Langs[TWBS.ln]) {
			if (TWBS.Langs[TWBS.ln].hasOwnProperty(type)) {
				if (typeof TWBS.Langs[TWBS.ln][type] == 'string') {
					TWBS.Text[type] = TWBS.Langs[TWBS.ln][type].replace(/<br\>/gi, '&lt;br&gt;');
				} else if (undefined !== TWBS.Langs[TWBS.ln][type][0]) {
					TWBS.Text[type] = [];
					for (i = 0; i < TWBS.Langs[TWBS.ln][type].length; i += 1) {
						if (TWBS.Langs[TWBS.ln][type][i]) {
							TWBS.Text[type][i] = TWBS.Langs[TWBS.ln][type][i].replace(/<br\>/gi, '&lt;br&gt;');
						} else {
							break;
						}
					}
				} else {
					TWBS.Text[type] = TWBS.Langs[TWBS.ln][type];
				}
			}
		}
		if (TWBS.ln !== 'en') {
			for (type in TWBS.Langs.en) {
				if (TWBS.Langs.en.hasOwnProperty(type) && !TWBS.Text.hasOwnProperty(type)) {
					TWBS.Text[type] = TWBS.Langs.en[type];
				}
			}
		}
	} else if (y) {
		TWBS.ln = 'en';
		TWBS.Settings.change_lang(true);
	}
};
TWBS.Settings.change_sort = function () {
	var type = TWBS.Settings.sortCombo.getValue().split(','), mode = TWBS.Settings.sortMode.isSelected() ? ',true' : ',';
	if (type[0] && type[0] !== 'none') {
		mode += (type[1] && type[1].length !== 0) ? ',' + type[1] : ',';
		TWBS.set('sort', type[0] + mode);
	} else {
		TWBS.del('sort');
	}
};
TWBS.Settings.change_hit = function (plus) {
	plus = plus || '';
	var type = TWBS.Settings['sort' + plus + 'Combo'].getValue(), mode = TWBS.Settings['sort' + plus + 'Mode'].isSelected() ? ',true' : ',';
	if (type !== 'none') {
		TWBS.set('sort' + plus, type + mode);
	} else {
		TWBS.del('sort' + plus);
	}
};
TWBS.Settings.addLanguage = function (url) {
	if (url.substr(url.length - 3, 3) == '.js') {
		wman.windowIds.TWBS.showLoader();
		TWBS.set("LanguagePack", encodeURIComponent(url));
		TWBS.runLang();
		(new UserMessage(TWBS.Text.lang_added, UserMessage.TYPE_SUCCESS)).show();
		TWBS.Settings.init();
	} else {
		(new UserMessage("TWBS: Please write an URL to a javascript file.", UserMessage.TYPE_FATAL)).show();
	}
};
TWBS.Settings.change_storage = function (n) {
	try {wman.windowIds.TWBS.showLoader(); } catch (e) {}
	if (TWBS.get('IndexedDB') === 'true') {
		switch (n) {
		case 0:
			TWBS.Data.localStorage.getItem(TWBS.world + '_HighDuels', function (data2) {
				if (data2) {
					TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_HighDuels', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'Highduels pt1'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.localStorage.removeItem(TWBS.world + '_HighDuels', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'Highduels pt1'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage(1);
					});
				} else {
					return TWBS.Settings.change_storage(1);
				}
			});
			break;
		case 1:
			TWBS.Data.localStorage.getItem(TWBS.world + '_HighDuels_end', function (data2) {
				if (data2) {
					TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_HighDuels_end', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'Highduels pt2'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.localStorage.removeItem(TWBS.world + '_HighDuels_end', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'Highduels pt2'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage(2);
					});
				} else {
					return TWBS.Settings.change_storage(2);
				}
			});
			break;
		case 2:
			TWBS.Data.localStorage.getItem(TWBS.world + '_SingleDuels', function (data2) {
				if (data2) {
					TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_SingleDuels', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'SingleDuels'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.localStorage.removeItem(TWBS.world + '_SingleDuels', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'SingleDuels'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage();
					});
				} else {
					return TWBS.Settings.change_storage();
				}
			});
			break;
		default:
			TWBS.cache();
			try {wman.windowIds.TWBS.hideLoader(); } catch (e1) {}
			break;
		}
	} else if (TWBS.get('IndexedDB') === 'false') {
		switch (n) {
		case 0:
			TWBS.Data.indexedDBStorage.getItem(TWBS.world + '_HighDuels', function (data2) {
				if (data2) {
					TWBS.Data.localStorage.setItem(TWBS.world + '_HighDuels', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'Highduels pt1'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.indexedDBStorage.removeItem(TWBS.world + '_HighDuels', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'Highduels pt1'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage(1);
					});
				} else {
					return TWBS.Settings.change_storage(1);
				}
			});
			break;
		case 1:
			TWBS.Data.indexedDBStorage.getItem(TWBS.world + '_HighDuels_end', function (data2) {
				if (data2) {
					TWBS.Data.localStorage.setItem(TWBS.world + '_HighDuels_end', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'Highduels pt2'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.indexedDBStorage.removeItem(TWBS.world + '_HighDuels_end', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'Highduels pt2'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage(2);
					});
				} else {
					return TWBS.Settings.change_storage(2);
				}
			});
			break;
		case 2:
			TWBS.Data.indexedDBStorage.getItem(TWBS.world + '_SingleDuels', function (data2) {
				if (data2) {
					TWBS.Data.localStorage.setItem(TWBS.world + '_SingleDuels', data2, function (fine) {
						if (fine) {
							(new UserMessage("TWBS: " + TWBS.Text.transferred.replace('{1}', 'SingleDuels'), UserMessage.TYPE_SUCCESS)).show();
							TWBS.Data.indexedDBStorage.removeItem(TWBS.world + '_SingleDuels', function (ok, t) {console.log(ok, t); });
						} else {
							(new UserMessage("TWBS: " + TWBS.Text.n_transferred.replace('{1}', 'SingleDuels'), UserMessage.TYPE_FATAL)).show();
						}
						return TWBS.Settings.change_storage();
					});
				} else {
					return TWBS.Settings.change_storage();
				}
			});
			break;
		default:
			TWBS.cache();
			try {wman.windowIds.TWBS.hideLoader(); } catch (e2) {}
			break;
		}
	}
};
TWBS.SingleDuels = {x: 748, y: 471};
TWBS.SingleDuels.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	if (!TWBS.SingleDuels.hasOwnProperty('loaded') || TWBS.SingleDuels.loaded == 0) {
		(new UserMessage('TWBS: ' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.duels_single) + '!', UserMessage.TYPE_ERROR)).show();
		return TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'Settings');
	}
	var html = '';
	html += "<table width='100%' id='TWBS_singleduels_1' class='TWBS_tab_table'>";
	html += "<tr class='TWBS_list_tables'>";
	html += "<th><label for='TWBS_single_report'>" + TWBS.Text.add_report + ": </label><input type='text' value='' name='TWBS_single_report' id='TWBS_single_report' style='width: 240px;'><small> [<a title='" + TWBS.Text.add_report_tp + "' href='#'>?</a>]</small></th>";
	html += "<td><a id='TWBS_single_add' href='#' class='button_wrap button'><span class='button_left'></span><span class='button_middle'>" + TWBS.Text.add + "</span><span class='button_right'></span><span style='clear: both;'></span></a>";
	html += " <a id='TWBS_single_recov' href='#' class='button_wrap button'><span class='button_left'></span><span class='button_middle'>" + TWBS.Text.recov + "</span><span class='button_right'></span><span style='clear: both;'></span></a></td>";
	html += "</tr><tr class='TWBS_list_tables'>";
	html += "<td width='60%' colspan='2'><a id='tab_TWBS_singleduels' class='active' href='#'>" + TWBS.Text.show_summ + "</a> | <a id='tab_TWBS_high_hit' class='active' href='#'>" + TWBS.Text.show_higt + "</a> | <a id='tab_TWBS_high_rec' class='active' href='#'>" + TWBS.Text.show_recm + "</a> | <a id='tab_TWBS_low_rec' class='active' href='#'>" + TWBS.Text.show_reco + "</a></td>";
	html += "</tr>";
	html += "<tr><td colspan='20'>" + TWBS.progress_bar + "<hr style=\"height: 4px;\"><style type='text/css' id='TWBS_tables'></style></td></tr>";
	html += "<tr><td colspan='20'><div style='overflow:auto; height:295px;'>";
	html += "<table id='TWBS_table_singleduels'></table>";
	html += "<table id='TWBS_table_high_hit'></table>";
	html += "<table id='TWBS_table_high_rec'></table>";
	html += "<table id='TWBS_table_low_rec'></table>";
	html += "</div></td></tr>";
	html += "</table>";
	jQuery('#TWBS_SingleDuels').html(html);
	jQuery("#TWBS_single_add").click(function () {TWBS.SingleDuels.add_report(); });
	// jQuery("#TWBS_single_report").submit(function () {TWBS.SingleDuels.add_report(); });
	jQuery("#TWBS_single_recov").click(function () {TWBS.SingleDuels.recover(); });
	TWBS.SingleDuels.retables();
	TWBS.percent(0);
	jQuery('.TWBS_list_tables a[id*="tab_TWBS_"]').click(TWBS.SingleDuels.showTable);
	wman.windowIds.TWBS.hideLoader();
};
TWBS.SingleDuels.showTable = function (evt) {
	var id = evt.target.id.substr(4);
	jQuery('#TWBS_singleduels_1 table').hide();
	jQuery('#TWBS_tables').text('');
	jQuery('#' + id.replace('TWBS', 'TWBS_table')).show();
	jQuery('.TWBS_list_tables a[id*="tab_TWBS_"]').removeClass('active');
	jQuery('.TWBS_list_tables a#tab_' + id).addClass('active');
};
TWBS.SingleDuels.retables = function () {
	var css = jQuery('.TWBS_list_tables a.active')[0];
	TWBS.SingleDuels.make_table();
	TWBS.SingleDuels.make_high_hit();
	TWBS.SingleDuels.make_high_rec();
	TWBS.SingleDuels.showTable({'target': css});
};
TWBS.SingleDuels.get = function () {
	return ((TWBS.Data.getItem('SingleDuels', 'res', null)) ? JSON.parse(TWBS.Data.getItem('SingleDuels', 'res', null)) : null);
};
TWBS.SingleDuels.set = function (res) {
	res = TWBS.stringify(res);
	if (res.length <= 2) {
		TWBS.Data.removeItem('SingleDuels', 'res');
	} else {
		TWBS.Data.setItem('SingleDuels', 'res', res);
	}
};
TWBS.SingleDuels.where_hit = function (pos) {
	switch (pos) {
	case "0px -234px":
		return TWBS.Text.hit_sh_left;
	case "0px -390px":
		return TWBS.Text.hit_ar_left;
	case "0px -78px":
		return TWBS.Text.hit_head;
	case "0px -156px":
		return TWBS.Text.hit_sh_righ;
	case "0px -312px":
		return TWBS.Text.hit_ar_righ;
	default:
		return TWBS.Text.hit_none;
	}
};
TWBS.SingleDuels.make_table = function () {
	var data = TWBS.SingleDuels.get(), single = [], i, k, id, html = '', duel, info, x, y, z, b = ' style="font-weight: bold"', own, oth;
	if (data) {
		html += '<tr><th rowspan="2">' + TWBS.Text.tab_duel + '</th><th rowspan="2">' + TWBS.Text.tab_players + '</th><th rowspan="2" title="' + TWBS.Text.tab_weapons + '"><img class="bag_item_mini" style="background-image: none;"src="' + TWBS.main_server + '/images/inventory/default/empty_right_arm.png"></th><th colspan="8">' + TWBS.Text.tab_rounds + '</th><th rowspan="2">' + TWBS.Text.tab_end + '</th><th rowspan="2">' + TWBS.Text.tab_res + '</th><th rowspan="2" style="display: none;"></th></tr>';
		html += '<tr><th>1°</th><th>2°</th><th>3°</th><th>4°</th><th>5°</th><th>6°</th><th>7°</th><th>8°</th></tr>';
		for (id in data) {
			if (data.hasOwnProperty(id)) {
				single.push(id);
			}
		}
		single.sort(function (a, b) {return a < b; });
		k = single.length;
		// if (k > 3) {wman.windowIds.TWBS.setSize(768, 471); }
		while (k--) {
			id = single[k];
			duel = data[single[k]];
			z = duel.col.getLast();
			info = [duel.own[0][4] ? 'own' : 'oth', duel.own[0][4] ? 'oth' : 'own', parseInt(z[0], 10) < parseInt(z[3], 10)]; //[sfidante, sfidato, true(vince own)/false(vince oth)]
			info.push(info[2] ? 'own' : 'oth'); //own -> vince own || oth -> vince oth
			info.push(info[2] ? 'oth' : 'own'); //own -> perde own || oth -> perde oth
			html += '<tr' + (info[2] ? b : '') + '>';
			html += '<td rowspan="2" style="font-weight: normal">';
			html += '<a href="javascript:ReportWindow.open(' + id + ', \'' + duel.hash + '\');">' + duel[info[0]][0][1] + ' ' + TWBS.Text.vs + ' ' + duel[info[1]][0][1] + '</a>';
			html += '<br />' + duel.date[0] + '/' + duel.date[1] + '/' + duel.date[2] + ' ' + duel.date[3] + ':' + duel.date[4] + (duel.date[5] ? ' ' + duel.date[5] : '');
			html += '</td>';


			x = 0;
			y = 1;
			own = TWBS.lesstring(duel.own[0][1], 12);
			html += '<td><a href="javascript:' + TWBS.openProfile(duel.own[0][0]) + ';" title="' + own[1] + '">' + own[0] + '</a></td>';
			html += '<td style="text-align: center;"><img class="bag_item_mini" src="' + TWBS.main_server + '/images/items/right_arm/mini/' + duel.own[1][0] + '" title="' + duel.own[1][1] + '"/></td>';
			for (i = 0; i < duel.col.length; i += 1) {
				if (i + 1 === duel.col.length) {
					if (i !== 8) {
						for (i = duel.col.length; i < 9; i += 1) {
							html += '<td></td>';
						}
					}
					break;
				} else {
					html += '<td>';
					html += '<span title="' + TWBS.SingleDuels.where_hit(duel.col[i][y]) + '">' + (duel.col[i][x] ? '-' + duel.col[i][x] : 0) + '</span>';
					html += '</td>';
				}
			}
			html += '<td><span>' + (z[x] ? '-' + z[x] : 0) + '</span></td>';


			html += '<td rowspan="2" style="font-weight: normal">';
			if (duel.res_duel[0]) { //se sviene
				html += TWBS.Text.pass.replace("{1}", '<a href="javascript:' + TWBS.openProfile(duel[info[4]][0][0]) + ';">' + duel[info[4]][0][1] + '</a>') + '<br/>';
			}
			html += TWBS.Text.dwin.replace("{1}", '<a href="javascript:' + TWBS.openProfile(duel[info[3]][0][0]) + ';">' + duel[info[3]][0][1] + '</a>').replace("{2}", duel.res_duel[1])
				+ ((duel.res_duel[2]) ? ' ' + TWBS.Text.ddwin.replace("{1}", duel.res_duel[2]) : '')
				+ ((duel.res_duel[3]) ? '. ' + TWBS.Text.dbwin.replace("{1}", '<a href="javascript:' + TWBS.openProfile(duel[info[3]][0][0]) + ';">' + duel[info[3]][0][1] + '</a>').replace("{2}", duel.res_duel[3]) : '')
				+ '.';
			html += '</td>';
			html += '<td rowspan="2" style="font-weight: normal"><a href="#" class="TWBS_remove_report" re="' + id + '"><img re="' + id + '" src="' + TWBS.img.remove + '" title="' + TWBS.Text.tab_delete + '"></td>';
			html += '</tr>';


			x = 3;
			y = 2;
			oth = TWBS.lesstring(duel.oth[0][1], 12);
			html += '<tr' + (info[2] ? '' : b) + '>';
			html += '<td><a href="javascript:' + TWBS.openProfile(duel.oth[0][0]) + ';" title="' + oth[1] + '">' + oth[0] + '</a></td>';
			html += '<td style="text-align: center;"><img class="bag_item_mini" src="' + TWBS.main_server + '/images/items/right_arm/mini/' + duel.oth[1][0] + '" title="' + duel.oth[1][1] + '"/></td>';
			for (i = 0; i < duel.col.length; i += 1) {
				if (i + 1 === duel.col.length) {
					if (i !== 8) {
						for (i = duel.col.length; i < 9; i += 1) {
							html += '<td></td>';
						}
					}
					break;
				} else {
					html += '<td>';
					html += '<span title="' + TWBS.SingleDuels.where_hit(duel.col[i][y]) + '">' + (duel.col[i][x] ? '-' + duel.col[i][x] : 0) + '</span>';
					html += '</td>';
				}
			}
			html += '<td><span>' + (z[x] ? '-' + z[x] : 0) + '</span></td>';
			html += '</tr>';
			duel = x = y = z = info = info = null;
			html += '<tr style="display:none;"></tr>';
		}
	} else {
		html += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noduel + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_singleduels').html(html);
	jQuery('.TWBS_remove_report').click(TWBS.SingleDuels.remove_report);
	return true;
};
TWBS.SingleDuels.sort_high_hit = function (a, b) {
	var plays = TWBS.rex, par = TWBS.mode.par, mode = TWBS.mode.mode, xx, yy;
	xx = plays[a][par] ? plays[a][par][0] : 0;
	yy = plays[b][par] ? plays[b][par][0] : 0;
	return (mode ? parseInt(xx, 10) < parseInt(yy, 10) : parseInt(xx, 10) > parseInt(yy, 10));
};
TWBS.SingleDuels.change_sort_high_hit = function (evt) {
	var sort = TWBS.get('sort_s'), sp = evt.target.getAttribute('to');
	if (sort && sort.split(',')[0] !== sp) {
		sort = sort.split(',')[1];
	} else if (sort && sort.split(',')[0] === sp) {
		sort = (sort.split(',')[1].length) ? '' : 'true';
	} else {
		sort = '';
	}
	TWBS.set('sort_s', sp + ',' + sort);
	TWBS.SingleDuels.make_high_hit();
};
TWBS.SingleDuels.make_high_hit = function () {
	var data = TWBS.SingleDuels.get(), i, id, html = '', duel, play = [], plays = {}, x, xx, y, yy, z, cs = "<a href='#' class='TWBS_change_sort_high_hit' ";
	if (data) {
		html += '<tr><th rowspan="2">' + TWBS.Text.tab_player + '</th><th colspan="2">' + cs + 'to="1">' + TWBS.Text.best_hit + '</a></th><th colspan="2">' + cs + 'to="2">' + TWBS.Text.best_duel + '</a></th><th colspan="2">' + cs + 'to="3">' + TWBS.Text.worst_hit + '</a></th><th colspan="2">' + cs + 'to="4">' + TWBS.Text.worst_duel + '</a></th></tr>';
		html += '<tr><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.HP + '</th><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.HP + '</th><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.HP + '</th><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.HP + '</th></tr>';
		for (id in data) {
			if (data.hasOwnProperty(id)) {
				duel = data[id];
				x = duel.own[0][0];
				xx = TWBS.lesstring(duel.own[0][1], 12);
				y = duel.oth[0][0];
				yy = TWBS.lesstring(duel.oth[0][1], 12);
				if (!plays.hasOwnProperty(x)) {
					plays[x] = [xx];
					play.push(x);
				}
				if (!plays.hasOwnProperty(y)) {
					plays[y] = [yy];
					play.push(y);
				}
				for (i = 0; i < duel.col.length; i += 1) {
					if (i + 1 === duel.col.length) {
						break;
					} else {
						duel.col[i][0] = parseInt(duel.col[i][0], 10);
						duel.col[i][3] = parseInt(duel.col[i][3], 10);
						//miglior colpo
						if ((!plays[x][1] && duel.col[i][3]) || (plays[x][1] && plays[x][1][0] < duel.col[i][3])) {plays[x][1] = [duel.col[i][3], id]; }
						if ((!plays[y][1] && duel.col[i][0]) || (plays[y][1] && plays[y][1][0] < duel.col[i][0])) {plays[y][1] = [duel.col[i][0], id]; }
						//peggior colpo
						if ((!plays[x][3] && duel.col[i][0]) || (plays[x][3] && plays[x][3][0] < duel.col[i][0])) {plays[x][3] = [duel.col[i][0], id]; }
						if ((!plays[y][3] && duel.col[i][3]) || (plays[y][3] && plays[y][3][0] < duel.col[i][3])) {plays[y][3] = [duel.col[i][3], id]; }
					}
				}
				z = duel.col.getLast();
				z[0] = parseInt(z[0], 10);
				z[3] = parseInt(z[3], 10);
				//miglior duello
				if ((!plays[x][2] && z[3]) || (plays[x][2] && plays[x][2][0] < z[3])) {plays[x][2] = [z[3], id]; }
				if ((!plays[y][2] && z[0]) || (plays[y][2] && plays[y][2][0] < z[0])) {plays[y][2] = [z[0], id]; }
				//peggior duello
				if ((!plays[x][4] && z[0]) || (plays[x][4] && plays[x][4][0] < z[0])) {plays[x][4] = [z[0], id]; }
				if ((!plays[y][4] && z[3]) || (plays[y][4] && plays[y][4][0] < z[3])) {plays[y][4] = [z[3], id]; }
			}
		}
		x = xx = y = yy = z = null;
		if (TWBS.get('sort_s')) {
			TWBS.rex = plays;
			TWBS.mode = {};
			TWBS.mode.sort = TWBS.get('sort_s');
			TWBS.mode.mode = (TWBS.mode.sort.split(',')[1].length !== 0);
			TWBS.mode.par = parseInt(TWBS.mode.sort.split(',')[0], 10);
			play.sort(TWBS.SingleDuels.sort_high_hit);
			delete TWBS.rex;
			delete TWBS.mode;
		}
		for (y = 0; y < play.length; y += 1) {
			i = play[y];
			if (plays.hasOwnProperty(i)) {
				html += '<tr>';
				html += '<td><a href="javascript:' + TWBS.openProfile(i) + ';" title="' + plays[i][0][1] + '">' + plays[i][0][0] + '</a></td>';
				for (z = 1; z < 5; z += 1) {
					if (plays[i][z]) {
						x = data[plays[i][z][1]];
						xx = TWBS.lesstring(x.own[0][0] === i ? x.oth[0][1] : x.own[0][1], 12);
						html += '<td><a href="javascript:ReportWindow.open(' + plays[i][z][1] + ', \'' + x.hash + '\');" title="' + xx[1] + '">' + xx[0] + '</a></td>';
						html += '<td>' + plays[i][z][0] + '</td>';
					} else {
						html += '<td></td><td></td>';
					}
				}
			}
		}
	} else {
		html += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noduel + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_high_hit').html(html);
	jQuery('.TWBS_change_sort_high_hit').click(TWBS.SingleDuels.change_sort_high_hit);
	return true;
};
TWBS.SingleDuels.sort_high_rec = function (a, b) {
	var plays = TWBS.rex, par = TWBS.mode.par, mode = TWBS.mode.mode, xx, yy;
	xx = plays[a][par] ? plays[a][par][0] : 0;
	yy = plays[b][par] ? plays[b][par][0] : 0;
	return (mode ? parseInt(xx, 10) < parseInt(yy, 10) : parseInt(xx, 10) > parseInt(yy, 10));
};
TWBS.SingleDuels.change_sort_high_rec = function (evt) {
	var sort = TWBS.get('sort_s2'), sp = evt.target.getAttribute('to');
	if (sort && sort.split(',')[0] !== sp) {
		sort = sort.split(',')[1];
	} else if (sort && sort.split(',')[0] === sp) {
		sort = (sort.split(',')[1].length) ? '' : 'true';
	} else {
		sort = '';
	}
	TWBS.set('sort_s2', sp + ',' + sort);
	TWBS.SingleDuels.make_high_rec();
};
TWBS.SingleDuels.make_high_rec = function () {
	var data = TWBS.SingleDuels.get(), i, id, html = '', html2 = '', duel, play = [], plays = {}, x, xx, y, yy, z, cs = "<a href='#' class='TWBS_change_sort_high_rec' ";
	if (data) {
		html += '<tr><th rowspan="2">' + TWBS.Text.tab_player + '</th><th colspan="2">' + cs + 'to="1">' + TWBS.Text.high_exp + '</a></th><th colspan="2">' + cs + 'to="2">' + TWBS.Text.high_$$ + '</a></th><th colspan="2">' + cs + 'to="3">' + TWBS.Text.high_bou + '</a></th></tr>';
		html += '<tr><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.exp + '</th><th>' + TWBS.Text.vs + '</th><th>$$</th><th>' + TWBS.Text.vs + '</th><th>$$</th></tr>';
		html2 += '<tr><th rowspan="2">' + TWBS.Text.tab_player + '</th><th colspan="2">' + cs + 'to="4">' + TWBS.Text.high_exp + '</a></th><th colspan="2">' + cs + 'to="5">' + TWBS.Text.high_$$ + '</a></th><th colspan="2">' + cs + 'to="6">' + TWBS.Text.high_bou + '</a></th></tr>';
		html2 += '<tr><th>' + TWBS.Text.vs + '</th><th>' + TWBS.Text.exp + '</th><th>' + TWBS.Text.vs + '</th><th>$$</th><th>' + TWBS.Text.vs + '</th><th>$$</th></tr>';
		for (id in data) {
			if (data.hasOwnProperty(id)) {
				duel = data[id];
				x = duel.own[0][0];
				xx = TWBS.lesstring(duel.own[0][1], 12);
				y = duel.oth[0][0];
				yy = TWBS.lesstring(duel.oth[0][1], 12);
				if (!plays.hasOwnProperty(x)) {
					plays[x] = [xx];
					play.push(x);
				}
				if (!plays.hasOwnProperty(y)) {
					plays[y] = [yy];
					play.push(y);
				}
				duel.res_duel[1] = parseInt(duel.res_duel[1], 10);
				duel.res_duel[2] = parseInt(duel.res_duel[2], 10);
				duel.res_duel[3] = parseInt(duel.res_duel[3], 10);
				z = duel.col.getLast();
				z = parseInt(z[0], 10) < parseInt(z[3], 10) ? x : y;
				plays[z][1] = ((!plays[z][1] && duel.res_duel[1]) || (plays[z][1] && plays[z][1][0] < duel.res_duel[1])) ? [duel.res_duel[1], id] : plays[z][1]; //exp
				plays[z][2] = ((!plays[z][2] && duel.res_duel[2]) || (plays[z][2] && plays[z][2][0] < duel.res_duel[2])) ? [duel.res_duel[2], id] : plays[z][2]; //$$
				plays[z][3] = ((!plays[z][3] && duel.res_duel[3]) || (plays[z][3] && plays[z][3][0] < duel.res_duel[3])) ? [duel.res_duel[3], id] : plays[z][3]; //Taglia
				z = duel.col.getLast();
				z = parseInt(z[0], 10) >= parseInt(z[3], 10) ? x : y;
				plays[z][4] = ((!plays[z][4] && duel.res_duel[1]) || (plays[z][4] && plays[z][4][0] < duel.res_duel[1])) ? [duel.res_duel[1], id] : plays[z][4]; //exp
				plays[z][5] = ((!plays[z][5] && duel.res_duel[2]) || (plays[z][5] && plays[z][5][0] < duel.res_duel[2])) ? [duel.res_duel[2], id] : plays[z][5]; //$$
				plays[z][6] = ((!plays[z][6] && duel.res_duel[3]) || (plays[z][6] && plays[z][6][0] < duel.res_duel[3])) ? [duel.res_duel[3], id] : plays[z][6]; //Taglia
			}
		}
		x = xx = y = yy = z = null;
		if (TWBS.get('sort_s2')) {
			TWBS.rex = plays;
			TWBS.mode = {};
			TWBS.mode.sort = TWBS.get('sort_s2');
			TWBS.mode.mode = (TWBS.mode.sort.split(',')[1].length !== 0);
			TWBS.mode.par = parseInt(TWBS.mode.sort.split(',')[0], 10);
			play.sort(TWBS.SingleDuels.sort_high_hit);
			delete TWBS.rex;
			delete TWBS.mode;
		}
		for (y = 0; y < play.length; y += 1) {
			i = play[y];
			if (plays.hasOwnProperty(i)) {
				html += '<tr>';
				html += '<td><a href="javascript:' + TWBS.openProfile(i) + ';" title="' + plays[i][0][1] + '">' + plays[i][0][0] + '</a></td>';
				html2 += '<tr>';
				html2 += '<td><a href="javascript:' + TWBS.openProfile(i) + ';" title="' + plays[i][0][1] + '">' + plays[i][0][0] + '</a></td>';
				for (z = 1; z < 4; z += 1) {
					if (plays[i][z]) {
						x = data[plays[i][z][1]];
						xx = TWBS.lesstring(x.own[0][0] === i ? x.oth[0][1] : x.own[0][1], 12);
						html += '<td><a href="javascript:ReportWindow.open(' + plays[i][z][1] + ', \'' + x.hash + '\');" title="' + xx[1] + '">' + xx[0] + '</a></td>';
						html += '<td>' + plays[i][z][0] + '</td>';
					} else {
						html += '<td></td><td></td>';
					}
				}
				for (z = 4; z < 7; z += 1) {
					if (plays[i][z]) {
						x = data[plays[i][z][1]];
						xx = TWBS.lesstring(x.own[0][0] === i ? x.oth[0][1] : x.own[0][1], 12);
						html2 += '<td><a href="javascript:ReportWindow.open(' + plays[i][z][1] + ', \'' + x.hash + '\');" title="' + xx[1] + '">' + xx[0] + '</a></td>';
						html2 += '<td>' + plays[i][z][0] + '</td>';
					} else {
						html2 += '<td></td><td></td>';
					}
				}
				html += '</tr>';
				html2 += '</tr>';
			}
		}
	} else {
		html += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noduel + "</th><td width='30%'></td></tr>";
		html2 += "<tr><td width='30%'></td><th width='40%'>" + TWBS.Text.tab_noduel + "</th><td width='30%'></td></tr>";
	}
	jQuery('#TWBS_table_high_rec').html(html);
	jQuery('#TWBS_table_low_rec').html(html2);
	jQuery('.TWBS_change_sort_high_rec').click(TWBS.SingleDuels.change_sort_high_rec);
	return true;
};
TWBS.SingleDuels.add_report = function () {
	var report = jQuery('#TWBS_single_report')[0], rx = "\\[report=(\\d+)(..........)\\]", vals, i = 0, e;
	if (report.value !== '') {
		vals = report.value.match(new RegExp(rx, "g"), "i");
		e = vals.length;
		TWBS.SingleDuels.count = [e, 2];
		TWBS.SingleDuels.add_list = {};
		while (i < e) {
			vals[i] = vals[i].match(new RegExp(rx), "i");
			vals[i].splice(0, 1);
			TWBS.SingleDuels.add_list[vals[i][0]] = vals[i];
			i += 1;
		}
		TWBS.percent(0, e);
		TWBS.SingleDuels.start_check();
	}
	report = rx = vals = i = e = undefined;
	return;
};
TWBS.SingleDuels.start_check = function () {
	var i, k, n;
	if (TWBS.SingleDuels.hasOwnProperty('check')) {
		for (n in TWBS.SingleDuels.check) {
			if (TWBS.SingleDuels.check.hasOwnProperty(n) && typeof (TWBS.SingleDuels.check[n]) !== 'function') {
				break;
			}
		}
		if (!TWBS.SingleDuels.hasOwnProperty('count')) {
			k = 0;
			for (i in TWBS.SingleDuels.check) {
				if (TWBS.SingleDuels.check.hasOwnProperty(i)) {
					k += 1;
				}
			}
			TWBS.SingleDuels.count = [k, 2];
		}
		if (TWBS.SingleDuels.check.hasOwnProperty(n)) {
			TWBS.SingleDuels.duel(TWBS.SingleDuels.check[n][0], TWBS.SingleDuels.check[n][1]);
		} else {
			delete TWBS.SingleDuels.check;
			delete TWBS.SingleDuels.count;
			TWBS.i = 0;
			if (TWBS.get('safe')) {TWBS.SingleDuels.retables(); }
			TWBS.start_check();
		}
	} else if (TWBS.SingleDuels.hasOwnProperty('add_list')) {
		for (n in TWBS.SingleDuels.add_list) {
			if (TWBS.SingleDuels.add_list.hasOwnProperty(n) && typeof (TWBS.SingleDuels.add_list[n]) !== 'function') {
				break;
			}
		}
		// TWBS.SingleDuels.count è già definito
		if (TWBS.SingleDuels.add_list.hasOwnProperty(n)) {
			TWBS.SingleDuels.duel(TWBS.SingleDuels.add_list[n][0], TWBS.SingleDuels.add_list[n][1]);
		} else {
			delete TWBS.SingleDuels.add_list;
			delete TWBS.SingleDuels.count;
			TWBS.i = 0;
			if (TWBS.get('safe')) {TWBS.SingleDuels.retables(); }
			TWBS.SingleDuels.start_check();
		}
	} else {
		TWBS.percent(-1);
		TWBS.Data.update();
	}
};
TWBS.SingleDuels.duel = function (id, hash) {
	/**	@param id   Id report
		@param hash Hash report	**/
	if (id && hash && id.toString().length <= 8 && hash.toString().length === 10) {
		TWBS.i = TWBS.SingleDuels.hasOwnProperty('count') ? ((TWBS.SingleDuels.count[1] === 2) ? (TWBS.hasOwnProperty('i') ? TWBS.i + TWBS.SingleDuels.count[1] : 0) : (TWBS.hasOwnProperty('i') ? TWBS.i : 0)) : 0;
		jQuery.ajax({
			url: "game.php?window=reports&mode=show_report",
			type: 'POST',
			async: true,
			cache: false,
			data: {
				report_id: id,
				hash: hash,
				flash: false,
			},
			success: function (resp) {
				var a = JSON.parse(resp), info = {}, own = {}, oth = {}, col = [], res_duel, i, k, temp, r = false;
				if (a.page.match(new RegExp("'duel_report'"), "i") && (!a.hasOwnProperty('error') || (a.hasOwnProperty('error') && !a.error))) {
					info.date = a.date_received.match(new RegExp("(\\d+)", "g"), "gi");
					info.date.push(a.date_received.match(new RegExp("(A|P)M$", "g"), "g"));
					if (info.date.length === 3) {
						if (info.date[2]) {
							info.date = [new Date().getMonth() + 1, new Date().getDate(), new Date().getFullYear().toString().substr(2), info.date[0], info.date[1], info.date[2]];
						} else {
							info.date = [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear().toString().substr(2), info.date[0], info.date[1], info.date[2]];
						}
					}
					own.name = a.page.match(new RegExp("text-align:right[^\"]+\">\\s*<[^\"]+\"[^\"]+void\\(PlayerProfileWindow.open\\((\\d+)\\)\\);\">([^<]+)</\\D+(\\d+)\\D+(\\d+)\\s+(<br /><strong>)?"), "i");
					own.name.splice(0, 1); // [id_player,name,liv,liv_duel,"<br /><strong>"_se_sfidante]
					oth.name = a.page.match(new RegExp("text-align:left[^\"]+\">\\s*<[^\"]+\"[^\"]+void\\(PlayerProfileWindow.open\\((\\d+)\\)\\);\">([^<]+)</\\D+(\\d+)\\D+(\\d+)\\s+(<br /><strong>)?"), "i");
					oth.name.splice(0, 1); // [id_player,name,liv,liv_duel,"<br /><strong>"_se_sfidante]
					own.weap = a.page.match(new RegExp("own_weapon_.*\\s*<!--<img src=\"([^\"]+).+ alt=\"([^\"]+)\""), "i");
					own.weap.splice(0, 1); // [link_img,long_name]
					oth.weap = a.page.match(new RegExp("other_weapon_.*\\s*<!--<img src=\"([^\"]+).+ alt=\"([^\"]+)\""), "i");
					oth.weap.splice(0, 1); // [link_img,long_name]
					col[0] = a.page.match(new RegExp("<tr>\\s*<td style=\"width:35%; text-align:right[^\"]*\">\\s*<span[^>]+>[^<]+</span>(<br />\\s*<span[^>]+>- (\\d+)[^<]+</span>)?\\s*</td>\\s*<td style=\"width:30%;\">\\s*<div style=\"[^\"]+images/report/bg.jpg[^\"]+\">\\s*<div style=\"[^\"]+attacker[^\"]+background-position: (-?\\d+px -?\\d+px)\"></div>\\s*<div style=\"[^\"]+defender[^\"]+background-position: (-?\\d+px -?\\d+px)\"></div>\\s+</div>\\s+</td>\\s+<td style=\"width:35%; text-align:left[^\"]*\">\\s*<span[^>]+>[^<]+</span>(<br />\\s*<span[^>]+>- (\\d+)[^<]+</span>)?\\s*</td>\\s*</tr>\\s*"), "i");
					i = 0;
					k = col[0].index + col[i][0].length;
					while (i < 8) {
						i += 1;
						if (col[i - 1][0]) {
							col[i] = a.page.substr(k).match(new RegExp("<tr>\\s*<td style=\"width:35%; text-align:right[^\"]*\">\\s*<span[^>]+>[^<]+</span>(<br />\\s*<span[^>]+>- (\\d+)[^<]+</span>)?\\s*</td>\\s*<td style=\"width:30%;\">\\s*<div style=\"[^\"]+images/report/bg.jpg[^\"]+\">\\s*<div style=\"[^\"]+attacker[^\"]+background-position: (-?\\d+px -?\\d+px)\"></div>\\s*<div style=\"[^\"]+defender[^\"]+background-position: (-?\\d+px -?\\d+px)\"></div>\\s+</div>\\s+</td>\\s+<td style=\"width:35%; text-align:left[^\"]*\">\\s*<span[^>]+>[^<]+</span>(<br />\\s*<span[^>]+>- (\\d+)[^<]+</span>)?\\s*</td>\\s*</tr>\\s*"), "i"); //['','',danno_own,pos_own,pos_oth,'',danno_oth]
							if (col[i]) {
								k += col[i][0].length;
							} else {
								break;
							}
						} else {
							break;
						}
					} //col [each(['','',danno_own,pos_own,pos_oth,'',danno_oth])]
					col = col.filter(function (a) {return a; }); //removes the last element if one of the player passed out before 8° turn
					temp = (parseInt(col.getLast()[2], 10) || 0) < (parseInt(col.getLast()[6], 10) || 0);
					res_duel = a.page.match(new RegExp("<h4 style=\"text-align:center\">(" + (temp ? oth.name[1] : own.name[1]) + "[^\\.]*.\\s*)?" + (temp ? own.name[1] : oth.name[1]) + "\\D+([\\d+\\.\\,]+)([^\\$\\d]+\\$?\\s*([\\d+\\.\\,]+)\\s*\\$?\\D+" + (temp ? oth.name[1] : own.name[1]) + ")?.(\\s*" + (temp ? own.name[1] : oth.name[1]) + "[^\\$]+\\$\\s*([\\d+\\.\\,]+))?"), "i"); // [text_res,'text'_se_uno_sviene,exp,'',$$,'',bounty]
					TWBS.percent((TWBS.SingleDuels.hasOwnProperty('count')) ? ((TWBS.i - 1) / TWBS.SingleDuels.count[1]) : 0, (TWBS.SingleDuels.hasOwnProperty('count')) ? TWBS.SingleDuels.count[0] : 0);
					TWBS.SingleDuels.update(id, hash, info, own, oth, col, res_duel);
				} else if (!a.page.match(new RegExp("'duel_report'"), "i")) {
					(new UserMessage('TWBS: ' + TWBS.Text.notaduel, UserMessage.TYPE_FATAL)).show();
					r = true;
				} else if (a.msg) {
					(new UserMessage('TWBS: ' + a.msg, UserMessage.TYPE_FATAL)).show();
					r = true;
				} else {
					TWBS.unknown_error();
					r = true;
				}
				if (r) {
					TWBS.percent((TWBS.SingleDuels.hasOwnProperty('count')) ? (TWBS.i / TWBS.SingleDuels.count[1]) : 0, (TWBS.SingleDuels.hasOwnProperty('count')) ? TWBS.SingleDuels.count[0] : 0);
					if (TWBS.SingleDuels.hasOwnProperty('add_list') && !TWBS.SingleDuels.hasOwnProperty('check')) {
						delete TWBS.SingleDuels.add_list[id];
					} else {
						delete TWBS.SingleDuels.check[id];
					}
					setTimeout(TWBS.SingleDuels.start_check, TWBS.get('wait') || 500);
				}
				a = info = own = oth = col = res_duel = i = k = temp = null;
			},
			error: function () {
				TWBS.not_resp();
				TWBS.percent((TWBS.SingleDuels.hasOwnProperty('count')) ? (TWBS.i / TWBS.SingleDuels.count[1]) : 0, (TWBS.SingleDuels.hasOwnProperty('count')) ? TWBS.SingleDuels.count[0] : 0);
				if (TWBS.SingleDuels.hasOwnProperty('add_list') && !TWBS.SingleDuels.hasOwnProperty('check')) {
					delete TWBS.SingleDuels.add_list[id];
				} else {
					delete TWBS.SingleDuels.check[id];
				}
				setTimeout(TWBS.SingleDuels.start_check, TWBS.get('wait') || 500);
			}
		});
	}
};
TWBS.SingleDuels.update = function (id, hash, info, own, oth, col, res_duel) {
	/**	@param id        Id report
		@param hash      Hash report
		@param info      {date}
		@param own       {name:[id_player,name,liv,liv_duel,"<br /><strong>"_se_sfidante], weap:[link_img,long_name]}
		@param oth       {name:[id_player,name,liv,liv_duel,"<br /><strong>"_se_sfidante], weap:[link_img,long_name]}
		@param col       [['','',danno_own,pos_own,pos_oth,'',danno_oth]_per_ogni_colpo_più_totale]
		@param res_duel  [text_res,'text'_se_uno_sviene,exp,'',$$,'',taglia]	**/
	if (!id || !hash || !info || !own || !oth || !col || !res_duel) {return false; }
	var data = TWBS.SingleDuels.get() || {}, i;
	data[id] = {};
	data[id].hash = hash;
	data[id].date = info.date;
	data[id].own = [];
	data[id].own[0] = [own.name[0], own.name[1], own.name[2], own.name[3], (own.name[4] ? true : false)];
	data[id].own[1] = [own.weap[0].replace('images/items/right_arm/', '').replace('/', ''), own.weap[1]];
	data[id].oth = [];
	data[id].oth[0] = [oth.name[0], oth.name[1], oth.name[2], oth.name[3], (oth.name[4] ? true : false)];
	data[id].oth[1] = [oth.weap[0].replace('images/items/right_arm/', '').replace('/', ''), oth.weap[1]];
	data[id].col = [];
	for (i = 0; i < col.length; i += 1) {
		data[id].col[i] = [col[i][2] || 0, (col[i][3] === '0px 0px' ? 0 : col[i][3]), (col[i][4] === '0px 0px' ? 0 : col[i][4]), col[i][6] || 0];
	}
	data[id].res_duel = [];
	data[id].res_duel[0] = res_duel[1] ? true : false; //true se sviene
	data[id].res_duel[1] = res_duel[2]; //exp
	data[id].res_duel[2] = res_duel[4] ? res_duel[4].replace(/[\.\,]*/g, '') : 0; // 0 se non ha soldi
	data[id].res_duel[3] = res_duel[6] ? res_duel[6].replace(/[\.\,]*/g, '') : 0; // 0 se non prende taglia
	console.log(res_duel, data[id].res_duel);
	TWBS.SingleDuels.set(data);
	TWBS.percent((TWBS.SingleDuels.hasOwnProperty('count')) ? (TWBS.i / TWBS.SingleDuels.count[1]) : 0, (TWBS.SingleDuels.hasOwnProperty('count')) ? TWBS.SingleDuels.count[0] : 0);
	if (TWBS.SingleDuels.hasOwnProperty('add_list') && !TWBS.SingleDuels.hasOwnProperty('check')) {
		(new UserMessage("TWBS: " + TWBS.Text.add_duel.replace("{1}", data[id].own[0][1]).replace("{2}", data[id].oth[0][1]), UserMessage.TYPE_SUCCESS)).show();
		delete TWBS.SingleDuels.add_list[id];
	} else {
		delete TWBS.SingleDuels.check[id];
	}
	if (!TWBS.get('safe')) {TWBS.SingleDuels.retables(); }
	setTimeout(TWBS.SingleDuels.start_check, TWBS.get('wait') || 500);
	return true;
};
TWBS.SingleDuels.remove_report = function (evt) {
	var id = evt.target.getAttribute('re'), data = TWBS.SingleDuels.get(), name;
	if (!!id && data && data.hasOwnProperty(id) && confirm(TWBS.Text.rem_rp_conf)) {
		name = data[id][data[id].own[0][4] ? 'own' : 'oth'][0][1] + ' ' + TWBS.Text.vs + ' ' + data[id][data[id].own[0][4] ? 'oth' : 'own'][0][1];
		delete data[id];
		TWBS.SingleDuels.set(data);
		(new UserMessage(TWBS.Text.deleted.replace('{1}', name), UserMessage.TYPE_SUCCESS)).show();
	}
	TWBS.SingleDuels.retables();
};
TWBS.SingleDuels.recover = function () {
	var data = TWBS.SingleDuels.get(), i, el = [];
	if (data) {
		for (i in data) {
			if (data.hasOwnProperty(i)) {
				el.push('[report=' + i + data[i].hash + ']');
			}
		}
		alert(el.join(' '));
	} else {
		(new UserMessage('TWBS: ' + TWBS.Text.no_r_insrtd, UserMessage.TYPE_ERROR)).show();
	}
	// TWBS.Export.add();
};
TWBS.Export = {x: 748, y: 471};
TWBS.Export.add = function () {
	wman.windowIds[TWBS.uid].addTab(TWBS.Text.Export, "Export", TWBS.showTab);
	TWBS.showTab(wman.windowIds[TWBS.uid], "Export");
	return true;
};
TWBS.Export.remove = function (id2) {
	wman.windowIds[TWBS.uid].removeTab("Export", id2 || 'Settings');
	return true;
};
TWBS.Export.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	var html = '';
	html += "<table width='100%' class='TWBS_tab_table'>";
	html += "<tr><td id='TWBS_exportSelect1_parent'></td><td id='TWBS_exportSelect2_parent'></td><td id='TWBS_exportSelect3_parent'></td></tr>";
	html += "<tr><td colspan='5' id='TWBS_exportArea_parent'></td></tr>";
	html += "<tr><td colspan='5' style='color: red;'><b>" + TWBS.Text.ctrl_c + ".</b></td></tr>";
	html += "</table>";
	jQuery('#TWBS_Export').html(html);
	this.exportArea = new tw2gui.textarea(TWBS.Text.exp_nsel, 'TWBS_exportArea');
	this.exportArea.setHeight(300);
	this.exportArea.setWidth(650);
	this.exportArea.setReadonly(true);
	this.exportArea.divMain.appendTo('#TWBS_exportArea_parent');
	jQuery(this.exportArea.textarea).click(TWBS.Export.copy).mousedown(TWBS.Export.copy).mouseup(TWBS.Export.copy);
	this.exportSelect1 = new tw2gui.combobox("TWBS_exportSelect1");
	this.exportSelect1.addItem(0, TWBS.Text.only_name);
	this.exportSelect1.addItem(1, TWBS.Text.name_score);
	this.exportSelect1.addListener(TWBS.Export.select);
	this.exportSelect1.setWidth(150);
	this.exportSelect1.divMain.appendTo('#TWBS_exportSelect1_parent');
	this.exportSelect2 = new tw2gui.combobox("TWBS_exportSelect2");
	this.exportSelect2.addItem(0, "Raw");
	this.exportSelect2.addItem(1, "BB Code");
	this.exportSelect2.addItem(2, "HTML");
	this.exportSelect2.addListener(TWBS.Export.select);
	this.exportSelect2.setWidth(100);
	this.exportSelect2.divMain.appendTo('#TWBS_exportSelect2_parent');
	this.exportSelect3 = new tw2gui.combobox("TWBS_exportSelect3");
	this.exportSelect3.addItem(0, TWBS.Text.exp_nsel);
	this.exportSelect3.addItem(1, TWBS.Text.title_exp);
	this.exportSelect3.addItem(2, TWBS.Text.title_win);
	this.exportSelect3.addListener(TWBS.Export.select);
	this.exportSelect3.setWidth(185);
	this.exportSelect3.divMain.appendTo('#TWBS_exportSelect3_parent');
	wman.windowIds.TWBS.hideLoader();
};
TWBS.Export.select = function () {
	var s1, s2, s22, s3, txt = '', res, end, arr = [], i, e, t, id;
	s1 = TWBS.Export.exportSelect1.getValue();
	s2 = TWBS.Export.exportSelect2.getValue();
	s3 = TWBS.Export.exportSelect3.getValue();
	//TWBS.Export.exportSelect1.items[s3].node[0].textContent
	if (s2 == 1) {
		s22 = ['[B]', '[/B]', '[LIST=1]\n', '[/LIST]', '[*]', '[SIZE="5"]', '[SIZE="4"]', '[SIZE="3"]', '\n\n[/SIZE]', '\n', ': '];
	} else if (s2 == 2) {
		s22 = ['<b>', '</b>', '<ol style="list-style-type: decimal">\n', '</ol>', '<li>', '<font size="5">', '<font size="4">', '<font size="3">', '<br></font>', '</li>\n', ': '];
	} else {
		s22 = ['', '', '', '', '° ', '', '', '', '', '\n', ': ', '', ''];
	}
	if (s3 == 1 || s3 == 2) {
		txt += s22[0];
		txt += ((s3 == 1) ? TWBS.Text.title_exp : TWBS.Text.title_win);
		txt += s22[1] + '\n';
		res = TWBS.HighDuels.res();
		end = TWBS.HighDuels.end();
		if (res && end) {
			for (id in res) {
				if (res.hasOwnProperty(id) && end.hasOwnProperty(id)) {
					arr.push(id);
				}
			}
			TWBS.rex = [res, end];
			arr.sort((s3 == 1) ? TWBS.HighDuels.high_sort_exp : TWBS.HighDuels.high_sort_win);
			delete TWBS.rex;
			i = e = arr.length;
			txt += s22[2];
			if (s1 == 0) {
				while (i--) {
					txt += ((s2 == 0) ? (e - i) : '') + s22[4] + ((e - i == 1) ? s22[5] : ((e - i == 2) ? s22[6] : ((e - i == 3) ? s22[7] : ''))) + res[arr[i]].name;
					txt += ((e - i == 1 || e - i == 2 || e - i == 3) ? s22[8] : '') + s22[9];
				}
			} else if (s1 == 1) {
				while (i--) {
					txt += ((s2 == 0) ? (e - i) : '') + s22[4] + ((e - i == 1) ? s22[5] : ((e - i == 2) ? s22[6] : ((e - i == 3) ? s22[7] : ''))) + res[arr[i]].name;
					t = (s3 == 1)
						? (Math.round(((end[arr[i]].exp - res[arr[i]].exp) * end[arr[i]].player[2] / (((end[arr[i]].per - res[arr[i]].per) === 1 ? 1.5 : (end[arr[i]].per - res[arr[i]].per)) || 1)) * 100) / 100)
						: ((end[arr[i]].vin - res[arr[i]].vin) - (end[arr[i]].per - res[arr[i]].per));
					txt += s22[10] + s22[0] + t + s22[1];
					txt += ((e - i == 1 || e - i == 2 || e - i == 3) ? s22[8] : '') + s22[9];
				}
			}
			txt += s22[3];
		} else {
			txt += TWBS.Text.no_p_insrtd;
		}
	} else {
		txt += TWBS.Text.exp_nsel;
	}
	TWBS.Export.exportArea.setContent(txt);
	TWBS.Export.exportArea.textarea.focus();
	TWBS.Export.exportArea.textarea.select();
};
TWBS.Export.copy = function () {
	this.focus();
	this.select();
	// window.clipboardData.setData("Text", TWBS.Export.exportArea.getContent());
};
TWBS.About = {x: 748, y: 471};
TWBS.About.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	var html = '', tru, l, e;
	html += "<table width='100%' class='TWBS_tab_table'>";
	html += "<tr><td colspan='10'><a target='_blank' href='http://userscripts.org/scripts/show/" + TWBS.scriptid + "'><h2>The West - Battles Stats</h2></a></td></tr>";
	html += "<tr><td width='25%'>" + TWBS.Text.aut + ":</td><td width='25%'><a target='_blank' href='http://userscripts.org/users/268539/scripts'><b>Narulez</b></a></td>";
	html += "<td rowspan='4'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='4' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='4'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";
	html += "<td width='50%' colspan='2'><a id='TWBS_update' href='#' class='button_wrap button'><span class='button_left'></span><span class='button_middle'>" + TWBS.Text.check_update + "</span><span class='button_right'></span><span style='clear: both;'></span></a></td></tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr><td>" + TWBS.Text.trads + ":</td><td>";
	for (l in TWBS.Langs) {
		if (TWBS.Langs.hasOwnProperty(l)) {
			tru = (TWBS.world && TWBS.Langs[l].hasOwnProperty('trad_link'));
			html += "<img src='http://gamebar.innogames.de/free/" + l + ".gif' title='" + TWBS.Langs[l].lang_name + "'> ";
			html += (tru ? ((TWBS.Langs[l].trad_link[TWBS.world]) ? "<a title='" + TWBS.Langs[l].trad_link[TWBS.world][0] + "' href='javascript:" + TWBS.openProfile(TWBS.Langs[l].trad_link[TWBS.world][1]) + ";'>" : (TWBS.Langs[l].trad_link.http ? "<a target='_blank' href='" + TWBS.Langs[l].trad_link.http + "'>" : (TWBS.Langs[l].trad_link.mail ? "<a href='mailto:" + TWBS.Langs[l].trad_link.mail + "'>" : ""))) : "") + TWBS.Langs[l].trad_name + (tru ? "</a>" : "");
			html += "<br/>";
		}
	}
	html += "</td><td>";
	html += "<a id='TWBS_Add_lp' href='#'>" + TWBS.Text.addlang + "!!</a>";
	html += "<br/><a target='_blank' href='http://userscripts.org/scripts/show/124288'>Translate the lang pack!!</a>";
	html += "<br/><a target='_blank' href='http://userscripts.org/topics/95184'>Make a suggestion!!</a>";
	html += "</td></tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr><td rowspan='2'>" + TWBS.Text.thanks + "</td>";
	html += "<td style='text-align:right;'>" + TWBS.Text.thanks2.replace('{1}', 'Billy-AR').replace('{2}', TWBS.Text.thankguys.replace('{1}', 'JR')) + "</td><td colspan='3'>:</td><td style='text-align:left;'>" + TWBS.Text.tidea + "</td></tr>";
	html += "<tr><td style='text-align:right;'>" + TWBS.Text.team.replace('{1}', "<a target='_blank' href='http://scripts-o-maniacs.leforum.eu'>Scripts O Maniacs</a>") + "</td><td colspan='3'>:</td><td style='text-align:left;'>" + TWBS.Text.tupder + "</td></tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr><td colspan='10' id='TWBS_show_error'></td></tr>";
	html += "</table>";
	jQuery('#TWBS_About').html(html);
	jQuery('#TWBS_update').click(function () {TWBS.update(true); });
	jQuery('#TWBS_Add_lp').click(function () {
		TWBS.showTab(wman.windowIds[TWBS.uid], 'Settings');
		TWBS.Settings.langCombo.select('add');
	});
	wman.windowIds.TWBS.hideLoader();
	this.errorArea = new tw2gui.textarea(TWBS.Text.err_head, 'TWBS_errorArea');
	this.errorArea.setHeight(140);
	this.errorArea.setWidth(650);
	this.errorArea.setReadonly(true);
	this.errorArea.divMain.appendTo('#TWBS_show_error');
	e = this.errorlist.length;
	while (e--) {
		this.errorArea.setContent(this.errorArea.getContent() + '\n' + this.errorlist[e]);
	}
};
TWBS.About.errorlist = [];
TWBS.HighForts = {x: 748, y: 471};
TWBS.HighForts.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid)) {return TWBS.error('TWBS Window doesn\'t exist.', true); }
	if (!TWBS.HighForts.hasOwnProperty('loaded') || TWBS.HighForts.loaded == 0) {
		(new UserMessage('TWBS: ' + TWBS.Text.cachenloaded.replace('{1}', TWBS.Text.forts_highs) + '!', UserMessage.TYPE_ERROR)).show();
		return TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'Settings');
	}
	var html = '', res, battleid, count;
	html += "<table width='100%' class='TWBS_tab_table'>";
	if (TWBS.get('IndexedDB') === 'nosupport') {
		html += "<tr><td><span style='color: red;'><b>" + TWBS.Text.IDB_not_supp + "</b></span></td></tr>";
		html += "</table>";
		jQuery('#TWBS_HighForts').html(html);
	} else if (TWBS.get('IndexedDB') !== 'true') {
		html += "<tr><td><span style='color: red;'><b>" + TWBS.Text.IndexedDB_tip + "</b></span></td></tr>";
		html += "</table>";
		jQuery('#TWBS_HighForts').html(html);
	} else {
		count = 0;
		res = TWBS.HighForts.get();
		for (battleid in res) {
			if (res.hasOwnProperty(battleid)) {count += 1; }
		}
		html += "<tr class='TWBS_HF_summary'><td><form id='TWBSHF_days' action='javascript:void(0);'></form></td><td id='TWBSHF_force'></td><td id='TWBSHF_add'></td><td id='TWBS_HF_countSaved'><b>" + TWBS.Text.bfsaved + ': ' + count + "</b></td><td width='46px' style='vertical-algin: top;'><img src='" + TWBS.img.simple_data + "' id='TWBS_HF_summary1' title=\"<b>" + TWBS.Text.show_summ + "</b>\" style=\"border: 1px solid DarkGreen;\"><br/><img src='" + TWBS.img.high_data + "' id='TWBS_HF_high1' title=\"<b>" + TWBS.Text.show_high + "</b>\" style=\"border: 1px solid transparent;\"></td></tr>";
		html += "<tr class='TWBS_HF_high'><td id='TWBS_HF_start' style='text-align: left;'><b>" + TWBS.Text.tab_start + ":</b> <a href='#' id='TWBS_HF_date_s_select'><b></b> <img src='" + TWBS.img.calendar + "'></a><div id='TWBS_HF_date_s'></div></td><td id='TWBS_HF_end' style='text-align: left;'><b>" + TWBS.Text.tab_end + ":</b> <a href='#' id='TWBS_HF_date_e_select'><b></b> <img src='" + TWBS.img.calendar + "'></a><div id='TWBS_HF_date_e'></div></td><td id='TWBS_HF_statsType'></td><td id='TWBS_HF_calcs'></td><td width='46px' style='vertical-algin: top;'><img src='" + TWBS.img.simple_data + "' id='TWBS_HF_summary2' title=\"<b>" + TWBS.Text.show_summ + "</b>\" style=\"border: 1px solid transparent;\"><br/><img src='" + TWBS.img.high_data + "' id='TWBS_HF_high2' title=\"<b>" + TWBS.Text.show_high + "</b>\" style=\"border: 1px solid DarkGreen;\"></td></tr>";
		html += "<tr><td colspan='19' class='TWBS_largeTab'>" + TWBS.progress_bar + "<hr style=\"height: 4px;\"><style type='text/css' id='TWBS_tables'></style></td></tr>";
		html += "<tr><td colspan='19' class='TWBS_largeTab'><div style='overflow:auto; max-height:314px;'>";
		html += "<table id='TWBS_table_battles' class='fort_style' cellspacing='0' cellpadding='0'></table>";
		html += "</div></td></tr>";
		html += "</table>";
		jQuery('#TWBS_HighForts').html(html);
		TWBS.percent(0);
		TWBS.HighForts.retables(1);

		this.battlesCount = new tw2gui.textfield('TWBSHF_bCount');
		this.battlesCount.setLabel('<b>' + TWBS.Text.hf_get_lab + ':</b>');
		this.battlesCount.setSize(5);
		this.battlesCount.divMain.appendTo('#TWBSHF_days');

		jQuery('#TWBSHF_days').submit(function () {TWBS.HighForts.load(parseInt(TWBS.HighForts.battlesCount.getValue().replace(/\D/gi, ''), 10)); });

		this.overWrite = new tw2gui.checkbox(TWBS.Text.hf_overwrite);
		this.overWrite.divMain.appendTo('#TWBSHF_force');
		this.overWrite.setSelected(false);

		this.battlesAdd = new tw2gui.button(TWBS.Text.add_fortbatt, function () {TWBS.HighForts.load(parseInt(TWBS.HighForts.battlesCount.getValue().replace(/\D/gi, ''), 10)); });
		this.battlesAdd.appendTo('#TWBSHF_add');

		jQuery('#TWBS_HF_summary1').click(function () {TWBS.HighForts.retables(1); });
		jQuery('#TWBS_HF_summary2').click(function () {TWBS.HighForts.retables(1); });
		jQuery('#TWBS_HF_high1').click(function () {TWBS.HighForts.retables(2); });
		jQuery('#TWBS_HF_high2').click(function () {TWBS.HighForts.retables(2); });

		TWBS.Calendar('HF_Date_s', 'TWBS_HF_date_s', function (years, months, days, id, id_par) {
			// console.log(years, months, days, id, id_par, 'selected (start)');
			jQuery('#' + id_par + '_select b').html(TWBS.date_to_string(years + ' ' + months + ' ' + days, TWBS.Text.dmy));
		}, {month: -1, yet: true});
		TWBS.Calendar('HF_Date_e', 'TWBS_HF_date_e', function (years, months, days, id, id_par) {
			// console.log(years, months, days, id, id_par, 'selected (end)');
			jQuery('#' + id_par + '_select b').html(TWBS.date_to_string(years + ' ' + months + ' ' + days, TWBS.Text.dmy));
		}, {day: 1, yet: true});
		jQuery('#TWBS_HF_date_s_select').click(function () {jQuery('.TWBSCalendar-HF_Date_s').toggle(); });
		jQuery('#TWBS_HF_date_e_select').click(function () {jQuery('.TWBSCalendar-HF_Date_e').toggle(); });

		this.statsType = new tw2gui.button(TWBS.Text.statsType, function () {TWBS.HighForts.typeStats.show(); });
		this.statsType.appendTo('#TWBS_HF_statsType');

		this.calcStats = new tw2gui.button(TWBS.Text.calcStats, function () {TWBS.HighForts.retables(2); });
		this.calcStats.appendTo('#TWBS_HF_calcs');
	}

	wman.windowIds.TWBS.hideLoader();
};
TWBS.HighForts.get = function () {
	return ((TWBS.Data.getItem('HighForts', 'res', null)) ? JSON.parse(TWBS.Data.getItem('HighForts', 'res', null)) : {});
};
TWBS.HighForts.set = function (res) {
	res = TWBS.stringify(res);
	if (res.length <= 10) {
		TWBS.Data.removeItem('HighForts', 'res');
	} else {
		TWBS.Data.setItem('HighForts', 'res', res);
	}
};
TWBS.HighForts.retables = function (n) {
	wman.windowIds.TWBS.showLoader();
	var html, battleid, battleids = [], i, k, battle, data, res = TWBS.HighForts.get(), fort, att, def, pls = {}, plsa = [], pts, opt, o, pid, won, v = {}, points, pl, pt, ps;
	n = (!isNaN(n) && n < 3 && n > 0) ? n : 1;
	if (res) {
		switch (n) {
		case 2:
			jQuery('.TWBS-tab > table > tbody > tr > td.TWBS_largeTab > div').css({'max-height': 314});
			jQuery('#TWBS_table_battles').attr('style', 'width: auto !important;').attr('align','center').html();
			jQuery('.TWBS_HF_summary').hide();
			jQuery('.TWBS_HF_high').show();
			html += "<tr><th style='width: 100px;'><div>" + TWBS.Text.tab_pos_l + "</div></th><th style='width: 250px'><div>" + AjaxWindow.possibleValues.players + "</div></th><th style='width: 100px'><div>" + TWBS.Text.tab_points + "</div></th></tr>";
			for (battleid in res) {
				if (res.hasOwnProperty(battleid) && res[battleid].date > TWBS.Calendar.HF_Date_s.time && res[battleid].date < TWBS.Calendar.HF_Date_e.time) {
					battleids.push(battleid);
				}
			}
			i = battleids.length;
			pts = i;
			TWBS.percent(0, pts + 2);
			opt = TWBS.getJSON('HF_tS_profiles');
			opt = opt.Player[opt.Use.Player];
			if (typeof opt == 'undefined') {opt = TWBS.getJSON('HF_tS_profiles').Player['0']; }
			// opt = opt[opt.Use.uses][opt.Use[opt.Use.uses]]; // Uncomment when Town stats will be avaiable
			if (i > 0) {
				while (i--) {
					battleid = battleids[i];
					if (res.hasOwnProperty(battleid)) {
						won = '';
						battle = res[battleid];
						data = battle.data;
						switch (data.outcome) {
							case "ATTACKER_WIPED":
							case "FINALROUND":
							won = 'def';
							break;
							case "DEFENDER_WIPED":
							case "FLAGLOST":
							won = 'att';
							break;
						}
						if (won == '') {
							TWBS.log('Battle ' + battleid + ' has unknown result, it will be skipped: ' + data.outcome + '.');
							TWBS.percent(pts - i, pts + 2);
							continue;
						}
						k = data.attackerlist.length;
						while (k--) {
							if (!data.attackerlist.hasOwnProperty(k)) {
								TWBS.percent(pts - i, pts + 2);
								continue;
							}
							v = {};
							v.att = 1;
							if (won == 'att') {
								v.vb = 1;
								v.pb = 0;
								v.vatt = 1;
								v.patt = 0;
							} else {
								v.vb = 0;
								v.pb = 1;
								v.vatt = 0;
								v.patt = 1;
							}
							v.def = 0;
							v.vdef = 0;
							v.pdef = 0;
							pid = data.attackerlist[k].westid;
							v.avve = Number(data.attackerlist[k].charclass == 0);
							v.duel = Number(data.attackerlist[k].charclass == 1);
							v.lavo = Number(data.attackerlist[k].charclass == 2);
							v.sold = Number(data.attackerlist[k].charclass == 3);
							v.novi = Number(data.attackerlist[k].charclass < 0 || data.attackerlist[k].charclass > 3); //I don't know which id greehorn has, so this is a workaround
							v.levl = data.attackerlist[k].charlevel;
							v.maxhp = data.attackerlist[k].maxhp;
							v.starthp = data.attackerlist[k].starthp;
							v.finishedhp = data.attackerlist[k].finishedhp;
							v.hitcount = data.attackerlist[k].hitcount;
							v.maxdamage = data.attackerlist[k].maxdamage;
							v.totaldmg = data.attackerlist[k].totalcauseddamage;
							v.crithits = data.attackerlist[k].crithits;
							v.misscount = data.attackerlist[k].misscount;
							v.playdead = data.attackerlist[k].playdeadcount;
							v.takenhits = data.attackerlist[k].takenhits;
							v.takendmg = data.attackerlist[k].takendamage;
							v.dodgecount = data.attackerlist[k].dodgecount;
							v.diedwhen = data.attackerlist[k].diedwhen;
							v.flaghold = data.attackerlist[k].flagholdcount;
							v.weapmax = data.attackerlist[k].weaponmaxdmg;
							v.weapdiff = (data.attackerlist[k].weaponmaxdmg + data.attackerlist[k].weaponmindmg) / 2;
							v.weapmin = data.attackerlist[k].weaponmindmg;
							for (o in v) {
								if (v.hasOwnProperty(o) && opt.hasOwnProperty(o)) {
									v[o] = v[o] * opt[o];
								} else {
									delete v[o];
								}
							}
							points = opt.algorithm;
							try {
								points = TWBS.Parser.evaluate(points, v);
								if (!isFinite(points)) {
									TWBS.log('Points for ' + data.attackerlist[k].name + ' in battleid ' + pid + ' throw an error: ' + points + '.');
									TWBS.percent(pts - i, pts + 2);
									continue;
								// } else {
									// TWBS.log('Points for ' + data.attackerlist[k].name + ' in battleid ' + pid + ' are ' + points + '.');
								}
							} catch (e) {
								TWBS.log('Points calculations for ' + data.attackerlist[k].name + ' in battleid ' + pid + ' throws an error: ' + e.message + ' - (' + points + ')');
								TWBS.percent(pts - i, pts + 2);
								continue;
							}
							if (pls.hasOwnProperty(pid)) {
								pls[pid].p += points;
							} else {
								pls[pid] = {n: data.attackerlist[k].name, p: points};
								plsa.push(pid);
							}
						}
						TWBS.percent(pts - i + 0.5, pts + 2);
						k = data.defenderlist.length;
						while (k--) {
							if (!data.defenderlist.hasOwnProperty(k)) {
								TWBS.percent(pts - i, pts + 2);
								continue;
							}
							v = {};
							v.def = 1;
							if (won == 'def') {
								v.vb = 1;
								v.pb = 0;
								v.vdef = 1;
								v.pdef = 0;
							} else {
								v.vb = 0;
								v.pb = 1;
								v.vdef = 0;
								v.pdef = 1;
							}
							v.att = 0;
							v.vatt = 0;
							v.patt = 0;
							pid = data.defenderlist[k].westid;
							v.avve = Number(data.defenderlist[k].charclass == 0);
							v.duel = Number(data.defenderlist[k].charclass == 1);
							v.lavo = Number(data.defenderlist[k].charclass == 2);
							v.sold = Number(data.defenderlist[k].charclass == 3);
							v.novi = Number(data.defenderlist[k].charclass < 0 || data.defenderlist[k].charclass > 3); //I don't know which id greehorn has, so this is a workaround
							v.levl = data.defenderlist[k].charlevel;
							v.maxhp = data.defenderlist[k].maxhp;
							v.starthp = data.defenderlist[k].starthp;
							v.finishedhp = data.defenderlist[k].finishedhp;
							v.hitcount = data.defenderlist[k].hitcount;
							v.maxdamage = data.defenderlist[k].maxdamage;
							v.totaldmg = data.defenderlist[k].totalcauseddamage;
							v.crithits = data.defenderlist[k].crithits;
							v.misscount = data.defenderlist[k].misscount;
							v.playdead = data.defenderlist[k].playdeadcount;
							v.takenhits = data.defenderlist[k].takenhits;
							v.takendmg = data.defenderlist[k].takendamage;
							v.dodgecount = data.defenderlist[k].dodgecount;
							v.diedwhen = data.defenderlist[k].diedwhen;
							v.flaghold = data.defenderlist[k].flagholdcount;
							v.weapmax = data.defenderlist[k].weaponmaxdmg;
							v.weapdiff = (data.defenderlist[k].weaponmaxdmg + data.defenderlist[k].weaponmindmg) / 2;
							v.weapmin = data.defenderlist[k].weaponmindmg;
							points = opt.algorithm;
							for (o in v) {
								if (v.hasOwnProperty(o) && opt.hasOwnProperty(o)) {
									v[o] = v[o] * opt[o];
								} else {
									delete v[o];
								}
							}
							// for (o in opt) {
								// if (o != 'algorithm' && o != 'prename' && o != 'locked' && opt.hasOwnProperty(o) && v.hasOwnProperty(o)) {
									// points = points.replace(new RegExp(o, 'i'), v[o] * opt[o]);
								// }
							// }
							// points = points.replace(/[a-zA-Z]/gi, '').replace(/([\/\(\)\+\-\*\[\]])\1/gi, '\1').replace(/\/0/i, '/1');
							try {
								// points = eval(points);
								points = TWBS.Parser.evaluate(points, v);
								if (!isFinite(points)) {
									TWBS.log('Points for ' + data.defenderlist[k].name + ' in battleid ' + pid + ' throw an error: ' + points + '.');
									TWBS.percent(pts - i, pts + 2);
									continue;
								// } else {
									// TWBS.log('Points for ' + data.defenderlist[k].name + ' in battleid ' + pid + ' are ' + points + '.');
								}
							} catch (e2) {
								TWBS.log('Points calculations for ' + data.defenderlist[k].name + ' in battleid ' + pid + ' throws an error: ' + e2.message + ' - (' + points + ')');
								TWBS.percent(pts - i, pts + 2);
								continue;
							}
							if (pls.hasOwnProperty(pid)) {
								pls[pid].p += points;
							} else {
								pls[pid] = {n: data.defenderlist[k].name, p: points};
								plsa.push(pid);
							}
						}
					}
					TWBS.percent(pts - i, pts + 2);
				}
				plsa.sort(function (a, b) {return (pls[a].p > pls[b].p ? 1 : (pls[a].p == pls[b].p ? 0 : -1)); });
				TWBS.percent(pts + 1, pts + 2);
				i = plsa.length;
				pt = i;
				while (i--) {
					pl = plsa[i];
					if (pls.hasOwnProperty(pl)) {
						html += "<tr class='" + (TWBS.isEven(pt - i) ? 'even' : 'odd') + "'>";
						html += "<td>" + (pt - i) + "</td>";
						html += "<td><a onclick=\"" + TWBS.openProfile(pl) + "\" href=\"#\">" + pls[pl].n + "</a></td>";
						ps = [pls[pl].p, parseFloat(pls[pl].p), parseInt(pls[pl].p, 10)];
						if (ps[1] != ps[2]){
							ps[0] = ps[2] + parseFloat((ps[1] - ps[2]).toString().substr(0,4)) + (parseInt((ps[1] - ps[2]).toString().substr(4,1), 10) > 4 ? 0.01 : 0);
						}
						html += "<td>" + TWBS.formatNumber(ps[2]) + ((ps[1] != ps[2]) ? TWBS.Text.decimSepar + (ps[0].toString().split('.')[1] || '').substr(0,2) : '') + "<td>";
						html += "</tr>";
						html += "<tr class='divider'><td colspan='20'></td></tr>";
					}
				}
				TWBS.percent(0);
			} else {
				TWBS.percent(0);
				html += "<tr class='even'><td colspan='3' style='text-align: left;'>" + TWBS.Text.tab_nobattime + ".</td><td></td><td></td><td></td><td></td></tr>";
			}
			jQuery('#TWBS_table_battles').html(html);
			wman.windowIds.TWBS.hideLoader();
			return true;
		case 1:
		default:
			jQuery('.TWBS-tab > table > tbody > tr > td.TWBS_largeTab > div').css({'max-height': 314});
			jQuery('#TWBS_table_battles').attr('style', '').attr('align','').html();
			jQuery('.TWBS_HF_summary').show();
			jQuery('.TWBS_HF_high').hide();
			html += "<tr><th><div>" + AjaxWindow.possibleValues.fort + "</div></th><th><div>" + TWBS.Text.date + "</div></th><th><div>" + TWBS.Text.defender + "</div></th><th colspan='3'><div>" + TWBS.Text.result + "</div></th><th><div>" + TWBS.Text.attacker + "</div></th></tr>";
			for (battleid in res) {
				if (res.hasOwnProperty(battleid)) {
					battleids.push(battleid);
				}
			}
			battleids.sort(function (a, b) {return a > b; }); //by date (by id, that is +1 for every battle, so by date)
			i = battleids.length;
			if (i > 0) {
				while (i--) {
					battleid = battleids[i];
					if (res.hasOwnProperty(battleid)) {
						battle = res[battleid];
						data = battle.data;
						fort = TWBS.lesstring(data.fortname, 13);
						att = TWBS.lesstring(data.attackertownname, 13);
						def = TWBS.lesstring(data.defendertownname, 13);
						html += "<tr class='" + (TWBS.isEven(i) ? 'even' : 'odd') + "'>";
						html += "<td><a onclick=\"WMap.scroll_map_to_pos('" + battle.fortcoords.substr(0, battle.fortcoords.indexOf('_')) + "', '" + battle.fortcoords.substr(battle.fortcoords.indexOf('_') + 1) + "')\" href=\"#\"><img class=\"fortOverviewIconScrollTown\" src=\"images/icons/center.png\"></a> <a href=\"javascript:AjaxWindow.show('fort',{fort_id:" + battle.fort + "},'" + battle.fort + "');\" title='" + fort[1] + "'>" + fort[0] + "</a></td>";
						html += "<td><a href=\"javascript:AjaxWindow.show('fort_battleresultpage',{battleresult_id:" + battleid + "}," + battle.fort + ");\">" + TWBS.date_to_string(Number(battle.date), TWBS.Text.dmy + ' %6:%7') + "</a></td>";
						html += "<td><a onclick=\"WMap.scroll_map_to_town(" + data.defendertownid + ")\" href=\"#\"><img class=\"fortOverviewIconScrollTown\" src=\"images/icons/center.png\"></a> <a href=\"javascript:AjaxWindow.show('town',{town_id:" + data.defendertownid + "},'" + data.defendertownid + "');\" title='" + def[1] + "'>" + def[0] + "</a></td>";
						html += "<td>" + data.defenderlist.length + "</td>";
						html += "<td><img src='" + TWBS.main_server + "/images/fort/battle/" + data.outcome.toLowerCase() + ".png'></td>";
						html += "<td>" + data.attackerlist.length + "</td>";
						html += "<td><a onclick=\"WMap.scroll_map_to_town(" + data.attackertownid + ")\" href=\"#\"><img class=\"fortOverviewIconScrollTown\" src=\"images/icons/center.png\"></a> <a href=\"javascript:AjaxWindow.show('town',{town_id:" + data.attackertownid + "},'" + data.attackertownid + "');\" title='" + att[1] + "'>" + att[0] + "</a></td>";
						html += "<td><a title=\"" + TWBS.Text.reload + "\" onclick=\"TWBS.HighForts.singles.push(['','" + battle.fortcoords + "', '" + battleid + "', '" + battle.fort + "']); TWBS.HighForts.single_check();\"><img src='" + TWBS.img.reload + "'/></a></td>";
						html += '<td style="font-weight: normal"><a href="#" class="TWBS_remove_battle" battleid="' + battleid + '"><img battleid="' + battleid + '" src="' + TWBS.img.remove + '" title="' + TWBS.Text.tab_delete + '"></td>';
						html += "</tr>";
						html += "<tr class='divider'><td colspan='20'></td></tr>";
						battle = data = fort = att = def = undefined;
					}
				}
			} else {
				html += "<tr class='even'><td colspan='3' style='text-align: left;'>" + TWBS.Text.tab_nobatt + "</td><td></td><td></td><td></td><td></td></tr>";
			}
			jQuery('#TWBS_table_battles').html(html);
			jQuery('.TWBS_remove_battle').click(TWBS.HighForts.remove_battle);
			wman.windowIds.TWBS.hideLoader();
			return true;
		}
	}
};
TWBS.HighForts.remove_battle = function (evt) {
	var id = evt.target.getAttribute('battleid'), data = TWBS.HighForts.get(), name;
	if (!!id && data && data.hasOwnProperty(id) && confirm(TWBS.Text.rem_fb_conf)) {
		name = data[id].data.fortname;
		delete data[id];
		TWBS.HighForts.set(data);
		(new UserMessage(TWBS.Text.hf_bremoved.replace('{fort}', name), UserMessage.TYPE_SUCCESS)).show();
		TWBS.Data.update(4);
	}
	TWBS.HighForts.retables();
};
TWBS.HighForts.load = function (n) {
	if (!isNaN(n) && n > 0) {
		TWBS.percent(0, n + 1);
		TWBS.HighForts.count = [n, 0];
		TWBS.HighForts.battlesCount.setValue(n);
		TWBS.HighForts.battles = [];
		TWBS.HighForts.start_get();
	} else {
		(new UserMessage('TWBS: ' + TWBS.Text.hf_insnum + '!', UserMessage.TYPE_ERROR)).show();
	}
};
TWBS.HighForts.start_get = function () {
	// alert('[' + TWBS.HighForts.count[0] + ', ' + TWBS.HighForts.count[1] + ']');
	if (TWBS.HighForts.count[0] > TWBS.HighForts.count[1]) {
		jQuery.ajax({
			url: '/game.php?window=fort_overview',
			type: 'POST',
			async: true,
			cache: false,
			data: {
				offset: TWBS.HighForts.count[1] || 0
			},
			success: function (json) {
				json = JSON.parse(json);
				var d, c, i, k;
				d = json.page.match(new RegExp("\\'(\\d+_\\d+)\\'\\)[^<]+</a></div></td[^<]+<td><a href=\\\"javascript:AjaxWindow.show\\(\\'fort_battleresultpage\\',\\{battleresult_id:\\d+\\},\\d+\\)", 'gi'));
				if (d) {
					k = TWBS.HighForts.count[0] - TWBS.HighForts.count[1] > 9 ? 9 : TWBS.HighForts.count[0] - TWBS.HighForts.count[1];
					for (i = 0; i < k; i++) {
						TWBS.HighForts.battles.include(d[i]);
						TWBS.HighForts.count[1] += 1;
					}
				} else {TWBS.unknown_error(); }
				c = json.page.match(new RegExp("FortOverviewWindow\\.createContent\\(\\'recentbattles\\',\\{offset:" + (TWBS.HighForts.count[1]) + "\\}\\)", 'gi'));
				if (!c) {
					TWBS.HighForts.count[1] = TWBS.HighForts.count[0];
				}
				TWBS.percent((1 / TWBS.HighForts.count[0]) * TWBS.HighForts.count[1], TWBS.HighForts.count[0] + 1);
				return setTimeout(TWBS.HighForts.start_get, TWBS.get('wait') || 500);
			},
			error: function () {
				TWBS.not_resp();
				setTimeout(TWBS.HighForts.start_get, TWBS.get('wait') || 500);
			}
		});
		return;
	} else {
		return TWBS.HighForts.start_check();
	}
};
TWBS.HighForts.start_check = function () {
	var num, res = TWBS.HighForts.get(), count, battleid;
	if (TWBS.HighForts.battles.length) {
		num = TWBS.HighForts.battles[0].match(new RegExp("\\'(\\d+_\\d+)\\'\\)[^<]+</a></div></td[^<]+<td><a href=\\\"javascript:AjaxWindow.show\\(\\'fort_battleresultpage\\',\\{battleresult_id:(\\d+)\\},(\\d+)\\)", 'i'));
		if (res && res.hasOwnProperty(num[2]) && !TWBS.HighForts.overWrite.isSelected()) {
			TWBS.HighForts.battles = TWBS.HighForts.battles.slice(1);
			TWBS.percent(1 + TWBS.HighForts.count[0] - TWBS.HighForts.battles.length, TWBS.HighForts.count[0] + 1);
			return TWBS.HighForts.start_check();
		}
		TWBS.HighForts.ask(num[1], num[2], num[3], function () {TWBS.HighForts.start_check(); }, function () {TWBS.HighForts.battles = TWBS.HighForts.battles.slice(1); TWBS.percent(1 + TWBS.HighForts.count[0] - TWBS.HighForts.battles.length, TWBS.HighForts.count[0] + 1); });
	} else {
		TWBS.percent(-1);
		delete TWBS.HighForts.count;
		delete TWBS.HighForts.battles;
		count = 0;
		for (battleid in res) {
			if (res.hasOwnProperty(battleid)) {count += 1; }
		}
		jQuery('#TWBS_HF_countSaved').html("<b>" + TWBS.Text.bfsaved + ': ' + count + "</b>");
		TWBS.HighForts.retables();
		TWBS.Data.update(4);
	}
	return true;
};
TWBS.HighForts.single_check = function () {
	if (TWBS.HighForts.single_current) {return false; }
	TWBS.HighForts.single_current = true;
	var num, res = TWBS.HighForts.get();
	if (TWBS.HighForts.singles.length) {
		if (!TWBS.HighForts.hasOwnProperty('counts')) {
			TWBS.HighForts.counts = [TWBS.HighForts.singles.length, 0];
			TWBS.percent(0, TWBS.HighForts.singles.length);
		} else {
			TWBS.HighForts.counts[0] = TWBS.HighForts.singles.length;
		}
		num = TWBS.HighForts.singles[0];
		// console.log(num);
		// console.log(TWBS.HighForts.singles[0]);
		if (!res) {
			res = {};
		}
		TWBS.HighForts.ask(num[1], num[2], num[3], function () {TWBS.HighForts.single_current = false; TWBS.HighForts.single_check(); }, function () {TWBS.HighForts.singles = TWBS.HighForts.singles.slice(1); TWBS.percent(TWBS.HighForts.counts[0] - TWBS.HighForts.singles.length, TWBS.HighForts.counts[0]); });
	} else {
		TWBS.percent(-1);
		TWBS.HighForts.retables();
		TWBS.Data.update();
		TWBS.HighForts.single_current = false;
	}
	return;
};
TWBS.HighForts.singles = [];
TWBS.HighForts.ask = function (num1, num2, num3, fun, fun2) {
	jQuery.ajax({
		url: '/game.php?window=fort_battleresultpage&battleresult_id=' + num2,
		type: 'POST',
		async: true,
		cache: false,
		success: function (json) {
			json = JSON.parse(json);
			if (json.hasOwnProperty('fatal') && json.fatal) {
				return TWBS.log(json.message);
			}
			var res = TWBS.HighForts.get(), d;
			d = json.js.match(new RegExp("var data = (\\{.+\\})[^v]*var date = ([\\d\\.]+)", 'i'));
			res[num2] = {
				data : JSON.parse(d[1]),
				date : (d[2].replace('.', '') + '00000').substr(0, 13),
				fort : num3,
				fortcoords : num1
			};
			TWBS.HighForts.set(res);
			(new UserMessage("TWBS: " + TWBS.Text.hf_badded.replace('{fort}', res[num2].data.fortname), UserMessage.TYPE_SUCCESS)).show();
			if (fun2) {fun2(); }
			if (!TWBS.get('safe')) {TWBS.HighForts.retables(); }
			setTimeout(fun, (TWBS.get('wait') || 500) * 10);
		},
		error: function () {
			TWBS.not_resp();
			if (!TWBS.get('safe')) {TWBS.HighForts.retables(); }
			setTimeout(fun, (TWBS.get('wait') || 500) * 10);
		}
	});
};
TWBS.HighForts.typeStats = {};
TWBS.HighForts.typeStats.show = function (lastTab) {
	wman.open(TWBS.uid + '_typeStats')
		.setMiniTitle("TWBS - " + TWBS.Text.statsType)
		.addTab(TWBS.Text.formulas, "Formulas", TWBS.HighForts.typeStats.showTab)
		.addTab(AjaxWindow.possibleValues.players, "Player", TWBS.HighForts.typeStats.showTab)
		.addTab(AjaxWindow.possibleValues.town, "Town", TWBS.HighForts.typeStats.showTab)
		.appendToContentPane(jQuery("<div id=\"TWBS_typeStats_Formulas\" class=\"TWBS-tab\">"), jQuery("<div id=\"TWBS_typeStats_Player\" class=\"TWBS-tab\">"), jQuery("<div id=\"TWBS_typeStats_Town\" class=\"TWBS-tab\">"));
	TWBS.credits('_typeStats');
	TWBS.HighForts.typeStats.showTab(wman.windowIds[TWBS.uid + '_typeStats'], typeof (lastTab) === 'string' ? lastTab : 'Formulas');
};
TWBS.HighForts.typeStats.reShow = function () {
	TWBS.HighForts.typeStats.show(TWBS.HighForts.typeStats.lastTab);
};
TWBS.HighForts.typeStats.showTab = function (main, id) {
	if (!main) {
		return TWBS.HighForts.typeStats.show(id);
	}
	wman.windowIds[TWBS.uid + '_typeStats'].showLoader();
	TWBS.HighForts.typeStats.unloadTabs();
	wman.windowIds[TWBS.uid + '_typeStats'].activateTab(id);
	TWBS.HighForts.typeStats.lastTab = id;
	jQuery('.TWBS-tab', main.divMain).hide().html('');
	jQuery('.TWBS-tab#TWBS_typeStats_' + id, main.divMain).show();
	try {
		if (TWBS.HighForts.typeStats.hasOwnProperty(id)) {
			wman.windowIds[TWBS.uid + '_typeStats'].setSize(TWBS.HighForts.typeStats[id].x, TWBS.HighForts.typeStats[id].y);
			TWBS.HighForts.typeStats[id].init();
		}
	} catch (e) {
		TWBS.error(e);
	}
};
TWBS.HighForts.typeStats.unloadTabs = function () {
	var prs, i;
	prs = ["algorithm", "prename", "preid", "clone", "save", "cancel", "vb", "vb_value", "pb", "pb_value", "def", "def_value", "att", "att_value", "vdef", "vdef_value", "vatt", "vatt_value", "pdef", "pdef_value", "patt", "patt_value", "charclass", "sold", "sold_value", "lavo", "lavo_value", "duel", "duel_value", "avve", "avve_value", "levl", "levl_value", "maxhp", "maxhp_value", "starthp", "starthp_value", "finishedhp", "finishedhp_value", "hitcount", "hitcount_value", "maxdamage", "maxdamage_value", "totaldmg", "totaldmg_value", "crithits", "crithits_value", "misscount", "misscount_value", "playdead", "playdead_value", "takenhits", "takenhits_value", "takendmg", "takendmg_value", "dodgecount", "dodgecount_value", "diedwhen", "diedwhen_value", "flaghold", "flaghold_value", "weapmax", "weapmax_value", "weapdiff", "weapdiff_value", "weapmin", "weapmin_value", "profiles"];
	i = prs.length;
	while (i--) {
		delete TWBS.HighForts.typeStats.Player[prs[i]];
	}
	prs = ["Pprofiles", "Pdefault", "Cprofiles", "Cdefault"];
	i = prs.length;
	while (i--) {
		delete TWBS.HighForts.typeStats.Formulas[prs[i]];
	}
	return;
};
TWBS.HighForts.typeStats.Formulas = {x: 748, y: 471};
TWBS.HighForts.typeStats.Formulas.init = function () {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid + '_typeStats')) {return TWBS.error('TWBS Stats Window doesn\'t exist.', true); }
	var html = '', rows, that = this, profiles = TWBS.getJSON('HF_tS_profiles'), id, save;

	save = function () {
		var a = TWBS.getJSON('HF_tS_profiles');
		a.Use = {};
		a.Use.Player = that.Pprofiles.getValue();
		a.Use.Town = that.Cprofiles.getValue();
		a.Use.uses = (!that.Pdefault.isSelected() && that.Cdefault.isSelected()) ? 'Town' : 'Player';
		TWBS.setJSON('HF_tS_profiles', a);
	};

	html += "<table width='100%' class='TWBS_tab_table'>";
	rows = [1, 5, 3];
	html += "<tr><th width='50%' colspan='2'>" + TWBS.Text.playerstats + "</th>";
	html += "<td rowspan='" + (rows[0] + rows[1]) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='" + (rows[0] + rows[1]) + "' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='" + (rows[0] + rows[1]) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";
	html += "<th width='50%' colspan='2'>" + TWBS.Text.townstats + "</th></tr>";
	html += "<tr>";
	html += "<td colspan='2' id='TWBS_profile_player_container'></td>";
	html += "<td colspan='2' id='TWBS_profile_city_container'></td>";
	html += "</tr>";
	html += "<tr>";
	html += "<td colspan='2' id='TWBS_profile_player_default'></td>";
	html += "<td colspan='2' id='TWBS_profile_city_default'></td>";
	html += "</tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "</table>";
	jQuery('#TWBS_typeStats_Formulas').html(html);

	this.Pprofiles = new tw2gui.combobox("TWBS_HF_tS_Player");
	for (id in profiles.Player) {
		if (profiles.Player.hasOwnProperty(id)) {
			this.Pprofiles.addItem(id, profiles.Player[id].prename);
		}
	}
	this.Pprofiles.select(profiles.Use.Player || '0');
	this.Pprofiles.addListener(function () {
		save();
	});
	jQuery('#TWBS_profile_player_container').append(this.Pprofiles.getMainDiv());

	this.Pdefault = new tw2gui.checkbox(TWBS.Text.use);
	this.Pdefault.divMain.appendTo('#TWBS_profile_player_default');
	this.Pdefault.setSelected(true);
	this.Pdefault.setCallback(function () {
		if (that.Pdefault.isSelected() == that.Cdefault.isSelected()) {that.Cdefault.setSelected(!that.Pdefault.isSelected()); }
		save();
	});

	this.Cprofiles = new tw2gui.combobox("TWBS_HF_tS_Town");
	for (id in profiles.Town) {
		if (profiles.Town.hasOwnProperty(id)) {
			this.Cprofiles.addItem(id, profiles.Town[id].prename);
		}
	}
	this.Cprofiles.select(profiles.Use.Town || '0');
	this.Cprofiles.addListener(function () {
		save();
	});
	jQuery('#TWBS_profile_city_container').append(this.Cprofiles.getMainDiv());

	this.Cdefault = new tw2gui.checkbox(TWBS.Text.use);
	this.Cdefault.divMain.appendTo('#TWBS_profile_city_default');
	this.Cdefault.setSelected(false);
	this.Cdefault.setCallback(function () {
		if (that.Cdefault.isSelected() == that.Pdefault.isSelected()) {that.Pdefault.setSelected(!that.Cdefault.isSelected()); }
		save();
	});

	wman.windowIds[TWBS.uid + '_typeStats'].hideLoader();
};
TWBS.HighForts.typeStats.Player = {x: 748, y: 471};
TWBS.HighForts.typeStats.Player.init = function (toload) {
	if (!wman.windowIds.hasOwnProperty(TWBS.uid + '_typeStats')) {return TWBS.error('TWBS Stats Window doesn\'t exist.', true); }
	var html = '', rows, triplet, triplets, that = this, profiles, id;

	html += "<table width='100%' class='TWBS_tab_table'>";
	rows = [1, 5, 3];
	html += "<tr><td><b>" + TWBS.Text.tS_sel_form + "</b></td><td id='TWBS_profiles_container'></td>";
	html += "<td rowspan='" + (rows[0] + rows[1]) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td><td class='border_shadow_left' rowspan='" + (rows[0] + rows[1]) + "' style='width: 1px;'><img width='1px' src='" + TWBS.main_server + "/images/transparent.png'></td><td rowspan='" + (rows[0] + rows[1]) + "'><img width='5px' src='" + TWBS.main_server + "/images/transparent.png'></td>";
	html += "<th width='50%' colspan='2' id='TWBS_save_container'><img alt='" + TWBS.Text.tS_locked + "' title='" + TWBS.Text.tS_locked + "' id='TWBS_tS_Locked' style='display: none;' src='" + TWBS.img.locked + "' width='24' /> </th></tr>";
	html += "<tr>";
	html += "<th>" + TWBS.Text.tS_nam_form + ":</th><td id='TWBS_profile_name_container'></td>";
	html += "<th colspan='2' id='TWBS_algorithm_container'></th>";
	html += "</tr>";
	html += "<tr><td colspan='10' class='border_shadow_top' style='height: 1px; font-size: 0px;'><img height='1px' src='" + TWBS.main_server + "/images/transparent.png'></td></tr>";
	html += "<tr>";

	triplet = function (id, name, second, alrt) {
		var nm, tl;
		if (typeof TWBS.Text['tS_' + id] != 'string') {
			nm = TWBS.Text['tS_' + id][0];
			tl = ' title="' + TWBS.Text['tS_' + id][1] + '"';
		} else {
			nm = TWBS.Text['tS_' + id];
			tl = '';
		}
		return "<tr" + (alrt ? ' title="' + alrt + '"' : "") + "><td id='TWBS_" + id + "' class='TWBS_settings_c1'" + tl + ">" + (name.length > 1 ? name[0] + nm + name[1] : nm) + "</td><td id='TWBS_" + id + "_1' class='TWBS_settings_c2'></td>" + (second ? "<td id='TWBS_" + id + "_2' class='TWBS_settings_c3'></td>" : "") + "</tr>";
	};

	triplets = function (main, anti, dependants, value) {
		that[main] = new tw2gui.checkbox('');
		that[main].divMain.appendTo('#TWBS_' + main + '_1');
		if (anti != '' && dependants.length > 0) {
			that[main].setCallback(function () {
				var newval = that[main].isSelected(), i;
				if (typeof anti == 'string' && !that[anti].isSelected() && !newval) {
					that[main].setSelected(true);
					that[anti].setSelected(true);
				} else {
					if (newval) {
						i = dependants.length;
						while (i--) {
							jQuery('#TWBS_' + dependants[i]).parent().show();
						}
						jQuery('#TWBS_' + main + '_2').show();
					} else {
						i = dependants.length;
						while (i--) {
							jQuery('#TWBS_' + dependants[i]).parent().hide();
						}
						jQuery('#TWBS_' + main + '_2').hide();
					}
				}
			});
		} else if (dependants.length > 0) {
			that[main].setCallback(function () {
				var newval = that[main].isSelected();
				if (newval) {
					i = dependants.length;
					while (i--) {
						jQuery('#TWBS_' + dependants[i]).parent().show();
					}
					jQuery('#TWBS_' + main + '_2').show();
				} else {
					i = dependants.length;
					while (i--) {
						jQuery('#TWBS_' + dependants[i]).parent().hide();
					}
					jQuery('#TWBS_' + main + '_2').hide();
				}
			});
		} else {
			that[main].setCallback(function () {
				var newval = that[main].isSelected();
				if (newval) {
					jQuery('#TWBS_' + main + '_2').show();
				} else {
					jQuery('#TWBS_' + main + '_2').hide();
				}
			});
		}
		if (value) {
			that[main + '_value'] = new tw2gui.textfield(main + '_value');
			that[main + '_value'].setLabel('');
			that[main + '_value'].setSize(3);
			that[main + '_value'].divMain.appendTo('#TWBS_' + main + '_2');
			jQuery('#TWBS_' + main).click(function () {
				TWBS.addTxtInput('TWBS_algorithm', main);
			}).css('cursor', 'pointer');
		}
	};

	html += "<td width='50%' colspan='2' style='text-align: top'><table class='TWBS_settings_table'><thead class='THeadOverflow'>";
	html += "<tr><th class='TWBS_settings_c1'>" + TWBS.Text.tS_var + "</th><th class='TWBS_settings_c2'>" + TWBS.Text.tS_consider + "</th><th class='TWBS_settings_c3'>" + TWBS.Text.tS_multiply + "</th></tr>";
	html += "<tr><td colspan='3' style='font-weight: bold;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += "</thead>";
	html += "<tbody class='TBodyOverflow'>";
	html += triplet('vb', '', true, TWBS.Text.tS_dvb);
	html += triplet('pb', '', true, TWBS.Text.tS_dpb);
	html += triplet('def', ['<b>', '</b>'], true, TWBS.Text.tS_ddef);
	html += triplet('vdef', '', true, TWBS.Text.tS_dvdef);
	html += triplet('pdef', '', true, TWBS.Text.tS_dpdef);
	html += triplet('att', ['<b>', '</b>'], true, TWBS.Text.tS_datt);
	html += triplet('vatt', '', true, TWBS.Text.tS_dvatt);
	html += triplet('patt', '', true, TWBS.Text.tS_dpatt);
	html += "<tr><td colspan='3' style='font-weight: bold; height: 0px;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += triplet('charclass', ['<b>', '</b>'], false);
	html += triplet('novi', '', true);
	html += triplet('sold', '', true);
	html += triplet('lavo', '', true);
	html += triplet('duel', '', true);
	html += triplet('avve', '', true);
	html += "<tr><td colspan='3' style='font-weight: bold; height: 0px;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += triplet('levl', '', true);
	html += triplet('maxhp', '', true);
	html += triplet('starthp', '', true);
	html += triplet('finishedhp', '', true);
	html += "</tbody></table></td>";

	html += "<td width='50%' colspan='2' style='text-align: top'><table class='TWBS_settings_table'><thead class='THeadOverflow'>";
	html += "<tr><th class='TWBS_settings_c1'>" + TWBS.Text.tS_var + "</th><th class='TWBS_settings_c2'>" + TWBS.Text.tS_consider + "</th><th class='TWBS_settings_c3'>" + TWBS.Text.tS_multiply + "</th></tr>";
	html += "<tr><td colspan='3' style='font-weight: bold;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += "</thead>";
	html += "<tbody class='TBodyOverflow'>";
	html += triplet('hitcount', '', true);
	html += triplet('maxdamage', '', true);
	html += triplet('totaldmg', '', true);
	html += triplet('crithits', '', true);
	html += triplet('misscount', '', true);
	html += triplet('playdead', '', true);
	html += "<tr><td colspan='3' style='font-weight: bold; height: 0px;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += triplet('takenhits', '', true);
	html += triplet('takendmg', '', true);
	html += triplet('dodgecount', '', true);
	html += "<tr><td colspan='3' style='font-weight: bold; height: 0px;'><div class='TWBS_border_shadow_hor'></div></td></tr>";
	html += triplet('diedwhen', '', true);
	html += triplet('flaghold', '', true);
	html += triplet('weapmax', '', true);
	html += triplet('weapdiff', '', true);
	html += triplet('weapmin', '', true);
	html += "</tbody></table></td>";

	html += "</tr>";
	html += "</table>";
	jQuery('#TWBS_typeStats_Player').html(html);

	this.algorithm = new tw2gui.textfield('TWBS_algorithm');
	this.algorithm.setLabel(TWBS.Text.tS_algorithm + ': ');
	this.algorithm.setSize(30);
	this.algorithm.divMain.appendTo('#TWBS_algorithm_container');
	jQuery('#TWBS_algorithm')[0].beenClicked = false;
	jQuery('#TWBS_algorithm').one("click", function () {
		jQuery(this)[0].beenClicked = true;
	})

	this.prename = new tw2gui.textfield('TWBS_profile_name');
	this.prename.setSize(15);
	this.prename.divMain.appendTo('#TWBS_profile_name_container');

	this.preid = new tw2gui.textfield('TWBS_profile_id');
	this.preid.setSize(10);
	this.preid.divMain.appendTo('#TWBS_profile_name_container').hide();

	this.clone = new tw2gui.button(TWBS.Text.tS_clone, function () {that.clones(); });
	this.clone.appendTo('#TWBS_save_container');
	this.save = new tw2gui.button(TWBS.Text.tS_save, function () {that.saves(); });
	this.save.appendTo('#TWBS_save_container');
	this.cancel = new tw2gui.button(TWBS.Text.tS_delete, function () {that.removes(); });
	this.cancel.appendTo('#TWBS_save_container');

	triplets('vb', '', [], true);
	triplets('pb', '', [], true);
	triplets('def', '', ['vdef', 'pdef'], true);
	triplets('att', '', ['vatt', 'patt'], true);
	triplets('vdef', '', [], true);
	triplets('vatt', '', [], true);
	triplets('pdef', '', [], true);
	triplets('patt', '', [], true);

	triplets('charclass', '', ['novi', 'sold', 'lavo', 'duel', 'avve'], false);
	triplets('novi', '', [], true);
	triplets('sold', '', [], true);
	triplets('lavo', '', [], true);
	triplets('duel', '', [], true);
	triplets('avve', '', [], true);

	triplets('levl', '', [], true);
	triplets('maxhp', '', [], true);
	triplets('starthp', '', [], true);
	triplets('finishedhp', '', [], true);
	triplets('hitcount', '', [], true);
	triplets('maxdamage', '', [], true);
	triplets('totaldmg', '', [], true);
	triplets('crithits', '', [], true);
	triplets('misscount', '', [], true);

	triplets('playdead', '', [], true);
	triplets('takenhits', '', [], true);
	triplets('takendmg', '', [], true);
	triplets('dodgecount', '', [], true);
	triplets('diedwhen', '', [], true);
	triplets('flaghold', '', [], true);
	triplets('weapmax', '', [], true);
	triplets('weapdiff', '', [], true);
	triplets('weapmin', '', [], true);

	profiles = TWBS.getJSON('HF_tS_profiles').Player;
	this.profiles = new tw2gui.combobox("TWBS_HF_tS_Player");
	for (id in profiles) {
		if (profiles.hasOwnProperty(id)) {
			this.profiles.addItem(id, profiles[id].prename);
		}
	}
	this.profiles.addItem('n', '++ Nuovo Profilo');
	this.profiles.select(toload || '0');
	this.profiles.addListener(function () {
		that.load(that.profiles.getValue());
	});
	jQuery('#TWBS_profiles_container').append(this.profiles.getMainDiv());
	this.load(toload || '0');
	// this.profiles.setWidth(92);

	wman.windowIds[TWBS.uid + '_typeStats'].hideLoader();
};
TWBS.HighForts.typeStats.Player.load = function (loadProfile) {
	var opts, single, newId, that = this, profiles = TWBS.getJSON('HF_tS_profiles').Player;

	single = function (opt) {
		if (opts.hasOwnProperty(opt)) {
			that[opt].setSelected(true);
			if (that.hasOwnProperty(opt + '_value')) {
				that[opt + '_value'].setValue(isNaN(Number(opts[opt])) ? 1 : Number(opts[opt]));
			}
		} else {
			that[opt].setSelected(false);
			if (that.hasOwnProperty(opt + '_value')) {
				that[opt + '_value'].setValue('');
			}
		}
	};

	newId = function () {
		var i = 1;
		while (profiles.hasOwnProperty(i)) {
			i++;
		}
		return i;
	};

	if (profiles.hasOwnProperty(loadProfile)) {
		opts = profiles[loadProfile];
	} else {
		opts = {
			vb: 1,
			pb: -1,
		};
	}

	single('vb');
	single('pb');
	single('def');
	single('att');
	single('vdef');
	single('vatt');
	single('pdef');
	single('patt');

	single('charclass');
	single('novi');
	single('sold');
	single('lavo');
	single('duel');
	single('avve');

	single('levl');
	single('maxhp');
	single('starthp');
	single('finishedhp');
	single('hitcount');
	single('maxdamage');
	single('totaldmg');
	single('crithits');
	single('misscount');

	single('playdead');
	single('takenhits');
	single('takendmg');
	single('dodgecount');
	single('diedwhen');
	single('flaghold');
	single('weapmax');
	single('weapdiff');
	single('weapmin');
	
	that.algorithm.setValue(loadProfile != 'n' ? opts.algorithm : '');
	that.prename.setValue(loadProfile != 'n' ? opts.prename : '');
	that.preid.setValue(loadProfile != 'n' ? loadProfile : newId());
	if (opts.hasOwnProperty('locked') && opts.locked) {jQuery('#TWBS_tS_Locked').show(); } else {jQuery('#TWBS_tS_Locked').hide(); }
};
TWBS.HighForts.typeStats.Player.saves = function () {
	if (this.preid.getValue() == '0' || jQuery('#TWBS_tS_Locked').css('display') != 'none') {
		(new UserMessage(TWBS.Text.tS_flocked, UserMessage.TYPE_FATAL)).show();
		return;
	}

	var that = this, opts = {}, triplets, profiles;

	opts.prename = that.prename.getValue();
	opts.algorithm = that.algorithm.getValue().replace(/[^a-zA-Z0-9\+\-\/\*\(\)\[\]\s]/g, '');

	triplets = function (main, seconds, first) {
		var i;
		if (that[main].isSelected()) {
			if (first) {
				opts[main] = Number(that[main + '_value'].getValue());
				if (isNaN(opts[main]) || opts[main] == 0) {
					opts[main] = 1;
					TWBS.error(TWBS.Text.tS_undefval.replace('{1}', main), false);
				}
			}
			if (seconds.length > 0) {
				i = seconds.length;
				while (i--) {
					triplets(seconds[i], [], true);
				}
			}
		} else {
			delete opts[main];
			if (seconds.length > 0) {
				i = seconds.length;
				while (i--) {
					delete opts[seconds[i]];
				}
			}
		}
	};
	
	triplets('vb', [], true);
	triplets('pb', [], true);
	triplets('def', ['vdef', 'pdef'], true);
	triplets('att', ['vatt', 'patt'], true);
	triplets('charclass', ['novi', 'sold', 'lavo', 'duel', 'avve'], false);
	triplets('levl', [], true);
	triplets('maxhp', [], true);
	triplets('starthp', [], true);
	triplets('finishedhp', [], true);
	triplets('hitcount', [], true);
	triplets('maxdamage', [], true);
	triplets('totaldmg', [], true);
	triplets('crithits', [], true);
	triplets('misscount', [], true);
	triplets('playdead', [], true);
	triplets('takenhits', [], true);
	triplets('takendmg', [], true);
	triplets('dodgecount', [], true);
	triplets('diedwhen', [], true);
	triplets('flaghold', [], true);
	triplets('weapmax', [], true);
	triplets('weapdiff', [], true);
	triplets('weapmin', [], true);
	
	profiles = TWBS.getJSON('HF_tS_profiles');
	profiles.Player[this.preid.getValue()] = opts;
	TWBS.setJSON('HF_tS_profiles', profiles);
	(new UserMessage(TWBS.Text.tS_saved, UserMessage.TYPE_SUCCESS)).show();
	this.init(this.preid.getValue());
};
TWBS.HighForts.typeStats.Player.removes = function () {
	if (this.preid.getValue() == '0' || jQuery('#TWBS_tS_Locked').css('display') != 'none') {
		(new UserMessage(TWBS.Text.tS_flocked, UserMessage.TYPE_FATAL)).show();
		return;
	}
	if (!confirm(TWBS.Text.tS_rusure)) {
		return;
	}
	var profiles = TWBS.getJSON('HF_tS_profiles');
	delete profiles.Player[this.preid.getValue()];
	TWBS.setJSON('HF_tS_profiles', profiles);
	(new UserMessage(TWBS.Text.tS_deleted, UserMessage.TYPE_SUCCESS)).show();
	this.init('0');
};
TWBS.HighForts.typeStats.Player.clones = function () {
	var profiles, newId, n;
	newId = function () {
		var i = 1;
		while (profiles.Player.hasOwnProperty(i)) {
			i++;
		}
		return i;
	};
	profiles = TWBS.getJSON('HF_tS_profiles');
	n = newId();
	profiles.Player[n] = TWBS.clone(profiles.Player[this.preid.getValue()]);
	delete profiles.Player[n].locked;
	profiles.Player[n].prename = TWBS.Text.tS_toclone.replace('{1}', profiles.Player[n].prename);
	TWBS.setJSON('HF_tS_profiles', profiles);
	(new UserMessage(TWBS.Text.tS_cloned, UserMessage.TYPE_SUCCESS)).show();
	this.init(n);
};
TWBS.HighForts.typeStats.Town = {x: 748, y: 471};
TWBS.HighForts.typeStats.Town.init = function () {
	wman.windowIds[TWBS.uid + '_typeStats'].hideLoader();
};
TWBS.show = function (lastTab) {
	wman.open(TWBS.uid)
		.setMiniTitle("Battles Stats")
		.addTab(TWBS.Text.settings, "Settings", TWBS.showTab)
		.addTab(TWBS.Text.duels_highs, "HighDuels", TWBS.showTab)
		.addTab(TWBS.Text.duels_single, "SingleDuels", TWBS.showTab)
		.addTab(TWBS.Text.forts_highs, "HighForts", TWBS.showTab)
		.addTab(TWBS.Text.about, "About", TWBS.showTab)
		.appendToContentPane(jQuery("<div id=\"TWBS_Settings\" class=\"TWBS-tab\">"), jQuery("<div id=\"TWBS_HighDuels\" class=\"TWBS-tab\">"), jQuery("<div id=\"TWBS_SingleDuels\" class=\"TWBS-tab\">"), jQuery("<div id=\"TWBS_HighForts\" class=\"TWBS-tab\"/>"), jQuery("<div id=\"TWBS_About\" class=\"TWBS-tab\"/>"), jQuery("<div id=\"TWBS_Export\" class=\"TWBS-tab\"/>"));
	TWBS.credits('');
	TWBS.showTab(wman.windowIds[TWBS.uid], typeof (lastTab) === 'string' ? lastTab : 'Settings');
};
TWBS.reShow = function () {
	TWBS.show(TWBS.lastTab);
};
TWBS.credits = function (ext) {
	var html = '', tru = (TWBS.world && TWBS.Text.trad_link[TWBS.world]);
	ext = String(ext) != 'undefined' ? String(ext) : '';
	html += "<a target='_blank' href='http://userscripts.org/scripts/show/" + TWBS.scriptid + "'>The West - Battles Stats v" + TWBS.scriptver + "</a>";
	html += " - " + TWBS.Text.aut + ": <a target='_blank' href='http://userscripts.org/users/268539/scripts'>Narulez</a>, ";
	html += TWBS.Text.trad + " (" + TWBS.Text.lang_name + "): " + (tru ? "<a title='" + TWBS.Text.trad_link[TWBS.world][0] + "' href='javascript:" + TWBS.openProfile(TWBS.Text.trad_link[TWBS.world][1]) + ";'>" : (TWBS.Text.trad_link.http ? "<a target='_blank' href='" + TWBS.Text.trad_link.http + "'>" : (TWBS.Text.trad_link.mail ? "<a href='mailto:" + TWBS.Text.trad_link.mail + "'>" : ""))) + TWBS.Text.trad_name + ((tru || TWBS.Text.trad_link.http || TWBS.Text.trad_link.mail) ? "</a>" : "");
	jQuery('.tw2gui_window_inset_bottom', wman.windowIds[TWBS.uid + ext].divMain).append(jQuery('<div id="TWBS_Credits' + ext + '" class="TWBS_Credits"></div>').html(html));
};
TWBS.TWA_register = function () {
	if (TheWestApi && TheWestApi.hasOwnProperty('version') && TheWestApi.version) {
		TWBS.progress_bar = "<div class='tw2gui_progressbar' id='TWBS_percent' title='" + TWBS.Text.percent + "'><div class='tw2gui_progressbar_progress'><div class='tw2gui_progressbar_begin'></div><div class='tw2gui_progressbar_fill' style='width: 1%;'></div><div class='tw2gui_progressbar_end'></div><div class='tw2gui_progressbar_contents'><span>0%</span></div></div></div>";
		if (parseFloat(TWBS.minVersion) <= parseFloat(TheWestApi.version) && parseFloat(TWBS.maxVersion) >= parseFloat(TheWestApi.version)) {
			TheWestApi.register('TWBS', 'The West - Battles Stats', TheWestApi.version, TheWestApi.version, 'Narulez', 'http://userscripts.org/scripts/show/' + TWBS.scriptid);
			TWBS.update();
		} else {
			TheWestApi.register('TWBS', 'The West - Battles Stats', TWBS.minVersion, TWBS.maxVersion, 'Narulez', 'http://userscripts.org/scripts/show/' + TWBS.scriptid);
			TWBS.update(true);
			TheWestApi.displayOutdated();
		}
	} else {
		TWBS.TWA_time = setTimeout(TWBS.TWA_register, 1500);
	}
};
TWBS.createElement = function (p, tag) {
	var el = document.createElement(tag);
	p.appendChild(el);
	return el;
};
TWBS.createTextNode = function (p, text) {
	var el = document.createTextNode(text);
	p.appendChild(el);
	return el;
};
TWBS.update = function (force) { //this and collateral functions are originally made by Scripts-O-Maniacs (http://scripts-o-maniacs.leforum.eu/)
	var ora_corr, ora_to_upd, script_url, iframe, cle;
	TWBS.updating = true;
	force = force == true;
	cle = 'TW_' + TWBS.scriptid + '_UPD';
	jQuery('#' + cle).remove();
	ora_corr = new Date().getTime();
	// TWBS.del(cle); //debug
	ora_to_upd = parseInt(TWBS.get(cle), 10) || (ora_corr - 1000);
	if (ora_to_upd <= ora_corr || force) {
		script_url = TWBS.USO_URL + '/scripts/' + ((TWBS.chrome && TWBS.safari) ? 'review/' + TWBS.scriptid : 'source/' + TWBS.scriptid + '.meta.js');
		iframe = TWBS.createElement(document.body, 'iframe');
		iframe.id = cle;
		iframe.style.display = 'none';
		iframe.setAttribute('force', force);
		iframe.src = script_url;
		TWBS.updating_to = setTimeout(function () {if (TWBS.hasOwnProperty('updating')) {TWBS.update(force); } }, 10 * 60 * 1000);
	} else {
		TWBS.updater = setTimeout(function () {TWBS.update(); }, ora_to_upd - ora_corr + 100);
		delete TWBS.updating;
	}
};
TWBS.analizza_iframe = function () {
	var apri_script, make_script_history;
	apri_script = function () {
		try {
			if (TWBS.chrome && TWBS.safari) {
				window.open(TWBS.USO_URL + '/scripts/show/' + TWBS.scriptid);
			} else {
				window.open(TWBS.USO_URL + '/scripts/source/' + TWBS.scriptid + '.user.js');
			}
		} catch (e) {
			TWBS.log(e);
			return TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'About');
		}
	};

	make_script_history = function (tbody, span_next, tab_history, start) {
		var f = arguments.callee;
		return function () {
			var i, history_precedent = '', nb_history = 0, ligne, ligne_info, info_history, tr, td, el, ul, li, l;
			l = tab_history.length;
			for (i = start; i < l; i += 1) {
				ligne = tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
				ligne_info = ligne.match(/^([a-zA-Z0-9\.\-\|\/]*)\s*(.*)/);
				info_history = ligne_info[1].split('|');
				if (info_history[0] == history_precedent) {
					li = TWBS.createElement(ul, 'li');
					li.innerHTML = ligne_info[2];
				} else if (nb_history < TWBS.NB_HISTORY) {
					tr = TWBS.createElement(tbody, 'tr');

					history_precedent = info_history[0];
					nb_history += 1;

					td = TWBS.createElement(tr, 'td');
					td.style.width = '500px';
					td.style.border = '1px solid #666666';
					td.style.backgroundImage = 'url(../images/profile/settings_profile_input_bg.png)';
					td.style.fontSize = '12px';
					td.style.verticalAlign = 'top';
					if (i == 0) {
						tr.style.backgroundColor = 'green';
						td.style.opacity = '0.9';
					}
					el = TWBS.createElement(td, 'b');
					el.style.marginLeft = '4px';
					el.innerHTML = info_history[0];

					if (2 <= info_history.length) {
						el = TWBS.createElement(td, 'span');
						el.style.cssFloat = 'right';
						el.style.fontSize = '10px';
						el.style.fontStyle = 'italic';
						el.style.marginRight = '4px';
						el.innerHTML = info_history[1];
					}

					TWBS.createElement(td, 'br');

					ul = TWBS.createElement(td, 'ul');
					ul.style.marginBottom = '4px';

					li = TWBS.createElement(ul, 'li');
					li.innerHTML = ligne_info[2];
				} else {
					break;
				}
			}

			if (i < tab_history.length) {
				// Il reste encore des trucs dans le history.
				span_next.onclick = f(tbody, span_next, tab_history, i);
				span_next.innerHTML = '[+' + Math.min(TWBS.NB_HISTORY, tab_history.length - i) + ']';
			} else {
				// Il ne reste plus rien.
				span_next.onclick = '';
				span_next.innerHTML = '';
				span_next.style.display = 'none';
			}
		};
	};

	return function (contenu_iframe) {
		if (contenu_iframe.origin != TWBS.USO_URL) {
			return;
		}
		var version_recuperee = unescape(contenu_iframe.data), ora_to_upd, script_version, script_nom, script_auteur, tab_history, div, span, table, tbody, el, contenant, iframe, cle, force;
		ora_to_upd = new Date().getTime() + (20 * 60 * 60 * 1000);
		cle = 'TW_' + TWBS.scriptid + '_UPD';
		force = $(cle) ? $(cle).getAttribute('force') == 'true' : false;
		try {
			if (version_recuperee.match(/^\d+/) == TWBS.scriptid) {
				// Le message commence par le bon numéro de script.
				// Récupérer le contenu après @version
				script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1];
				if (script_version != TWBS.scriptver || force) {
					// Récupérer contenu après @name
					script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1];

					// Récupérer contenu après @release (or @author)
					script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/) ? version_recuperee.match(/\/\/ @release+\s*(.*)/)[1] : version_recuperee.match(/\/\/ @author+\s*(.*)/)[1];

					// Récupérer tableau des lignes @history
					tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g);

					contenant = document.createElement('div');

					div = TWBS.createElement(contenant, 'div');
					div.style.textAlign = 'center';
					div.style.fontWeight = 'bold';

					span = TWBS.createElement(div, 'div');
					span.style.fontSize = '10px';
					TWBS.createTextNode(span, "Script Updater [");
					el = TWBS.createElement(span, 'a');
					el.target = '_blank';
					el.href = 'http://scripts-o-maniacs.leforum.eu';
					TWBS.createTextNode(el, "SOM");
					TWBS.createTextNode(span, TWBS.Text.credit_upd.replace('{subj}', ']').replace("{name}", "Narulez"));

					span = TWBS.createElement(div, 'a');
					span.target = '_blank';
					span.href = TWBS.USO_URL + '/scripts/show/' + TWBS.scriptid;
					TWBS.createTextNode(span, TWBS.Text.latest_v);
					el = TWBS.createElement(div, 'strong');
					el.style.color = 'rgb(34, 34, 136)';
					TWBS.createTextNode(el, script_version);
					TWBS.createElement(div, 'br');
					span = TWBS.createElement(div, 'a');
					span.target = '_blank';
					span.href = TWBS.USO_URL + '/scripts/show/' + TWBS.scriptid;
					TWBS.createTextNode(span, TWBS.Text.current_v);
					el = TWBS.createElement(div, 'strong');
					el.style.color = 'rgb(34, 34, 136)';
					TWBS.createTextNode(el, TWBS.scriptver);

					div = TWBS.createElement(contenant, 'div');
					div.id = 'script_' + TWBS.scriptid + '_history';
					div.style.border = '1px #dabf83 inset';
					div.style.overflow = 'auto';
					div.style.height = '250px';
					div.style.marginTop = '3px';

					table = TWBS.createElement(div, 'table');

					tbody = TWBS.createElement(table, 'tbody');

					div = TWBS.createElement(div, 'div');
					div.style.textAlign = 'center';
					div.style.fontStyle = '10px';
					div.style.marginTop = '-3px';

					el = TWBS.createElement(div, 'span');
					el.style.cursor = 'pointer';

					make_script_history(tbody, el, tab_history, 0)();

					div = TWBS.createElement(contenant, 'div');
					div.style.cssFloat = 'left';
					div.style.fontSize = '10px';
					div.style.marginTop = '2px';
					div.style.marginLeft = '4px';

					el = TWBS.createElement(div, 'a');
					el.target = '_blank';
					el.href = TWBS.USO_URL + '/scripts/show/' + TWBS.scriptid;
					TWBS.createTextNode(el, TWBS.Text.webpage);

					div = TWBS.createElement(contenant, 'div');
					div.style.cssFloat = 'right';
					div.style.fontSize = '10px';
					div.style.marginTop = '2px';
					div.style.marginRight = '4px';
					TWBS.createTextNode(div, TWBS.Text.aut + ": " + script_auteur);

					TWBS.createElement(contenant, 'br');

					div = TWBS.createElement(contenant, 'div');
					div.style.marginBottom = '-10px';
					div.style.textAlign = 'center';
					div.style.fontWeight = 'bold';
					TWBS.createTextNode(div, TWBS.Text.update);

					showMessage(
						contenant, //content
						script_nom, //header
						500, //width
						undefined, //height
						[ [TWBS.Text.yes, apri_script], [TWBS.Text.no] ], //options
						false, //hide on outside click
						undefined //icon
					);
				}
			}
			iframe = $(cle);
			if (iframe) {iframe.parentNode.removeChild(iframe); }
			delete TWBS.updating;
		} catch (e) {
			TWBS.log(e);
			TWBS.showTab(wman.windowIds.hasOwnProperty(TWBS.uid) ? wman.windowIds.TWBS : null, 'About');
			ora_to_upd = new Date().getTime() + (2 * 60 * 60 * 1000);
		}
		TWBS.set(cle, ora_to_upd);
	};
};
TWBS.Data = {};
TWBS.Data.localStorage = {};
TWBS.Data.localStorage.setItem = function (key, value, fun) {
	TWBS.set(key, value);
	if (fun) {fun(true); }
	return true;
};
TWBS.Data.localStorage.getItem = function (key, func) {
	var data = TWBS.get(key);
	func(data);
	return true;
};
TWBS.Data.localStorage.removeItem = function (key, func) {
	TWBS.del(key);
	if (func) {func(true, key); }
	return true;
};
TWBS.Data.getItem = function (zone, type, def) {
	if (!zone || !type) {return false; }
	if (!TWBS_Data.hasOwnProperty(zone) && !TWBS_Data[zone].hasOwnProperty(type)) {return false; }
	if (TWBS_Data[zone][type] == false) {
		return def || false;
	} else {
		return TWBS_Data[zone][type];
	}
};
TWBS.Data.setItem = function (zone, type, val) {
	if (!zone || !type) {return false; }
	if (!TWBS_Data.hasOwnProperty(zone) && !TWBS_Data[zone].hasOwnProperty(type)) {return false; }
	if (undefined == val) {
		return TWBS_Data.removeItem(zone, type);
	} else {
		TWBS_Data[zone][type] = val;
	}
};
TWBS.Data.removeItem = function (zone, type) {
	if (!zone) {return false; }
	if (!TWBS_Data.hasOwnProperty(zone)) {return false; }
	if (type && TWBS_Data[zone].hasOwnProperty(type)) {
		TWBS_Data[zone][type] = false;
	} else {
		var types;
		for (types in TWBS_Data[zone]) {
			if (TWBS_Data[zone].hasOwnProperty(types)) {TWBS_Data[zone][types] = false; }
		}
	}
	return true;
};
TWBS.Data.update = function (n) {
	var HD_res = TWBS.Data.getItem('HighDuels', 'res', false),
		HD_end = TWBS.Data.getItem('HighDuels', 'end', false),
		SD_res = TWBS.Data.getItem('SingleDuels', 'res', false),
		HF_res = TWBS.Data.getItem('HighForts', 'res', false);
	if (TWBS.get('IndexedDB') === 'true') {
		n = Number(n) || 1;
		switch (n) {
		case 1:
			TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_HighDuels', HD_res, function (res) {
				TWBS.Data.update(res ? 2 : 1);
			});
			return true;
		case 2:
			TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_HighDuels_end', HD_end, function (res) {
				TWBS.Data.update(res ? 3 : 2);
			});
			return true;
		case 3:
			TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_SingleDuels', SD_res, function (res) {
				TWBS.Data.update(res ? 4 : 3);
			});
			return true;
		case 4:
			TWBS.Data.indexedDBStorage.setItem(TWBS.world + '_HighForts', HF_res, function (res) {
				if (res) {
					TWBS.cache();
				} else {
					TWBS.Data.update(4);
				}
			});
			return true;
		default:
			return false;
		}
	} else {
		if (HF_res != false && !confirm('Continuando perderai dei dati. Aggiorno?') && TWBS.get('IndexedDB') != 'nosupport') {
			TWBS.set('IndexedDB', true);
			return TWBS.Data.update();
		}
		n = Number(n) || 1;
		switch (n) {
		case 1:
			TWBS.Data.localStorage.setItem(TWBS.world + '_HighDuels', HD_res, function (res) {
				TWBS.Data.update(res ? 2 : 1);
			});
			return true;
		case 2:
			TWBS.Data.localStorage.setItem(TWBS.world + '_HighDuels_end', HD_end, function (res) {
				TWBS.Data.update(res ? 3 : 2);
			});
			return true;
		case 3:
			TWBS.Data.localStorage.setItem(TWBS.world + '_SingleDuels', SD_res, function (res) {
				if (res) {
					TWBS.cache();
				} else {
					TWBS.Data.update(3);
				}
			});
			return true;
		default:
			return false;
		}
	}
};
TWBS.indexedDBStorage = function (namespace, func) {
try{
	var OSName = "TWBS_DB", object = this, v = 1, IDB = {}, indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	if (window.hasOwnProperty('webkitIndexedDB')) {
		window.IDBTransaction = window.webkitIDBTransaction;
		window.IDBKeyRange = window.webkitIDBKeyRange;
	}
	if (indexedDB) {
		IDB.db = null;
		IDB.onerror = function (e) {
			console.log(e);
			TWBS.error("IndexedDB error: " + e, true);
		};
		IDB.open = function () {
			var request = indexedDB.open(OSName, v);
			request.onupgradeneeded = function (e) {
				IDB.db = e.target.result;
				var db = IDB.db;
				if (db.objectStoreNames.contains(OSName)) {
					db.deleteObjectStore(OSName);
				}
				db.createObjectStore(OSName, {keyPath: "char_id"});
			};
			request.onsuccess = function (e) {
				if (IDB.db == null) {
					IDB.db = e.target.result;
				}
				var db = IDB.db, setVreq, emptyTransaction;
				if (typeof (db.setVersion) == 'function') { // when 'onupgradeneeded' method isn't supported
					setVreq = db.setVersion(v);
					setVreq.onsuccess = function (e) {
						if (!db.objectStoreNames.contains(OSName)) {
							db.createObjectStore(OSName, {keyPath: "char_id"});
						}
						var emptyTransaction = IDB.db.transaction([OSName], IDBTransaction.READ_WRITE);
						if (func) {return func(true); }
					}
					setVreq.onerror = IDB.onerror;
					setVreq.onfailure = IDB.onerror;
					setVreq.onblocked = IDB.onerror;
				} else {
					emptyTransaction = db.transaction([OSName], IDBTransaction.READ_WRITE);
					if (func) {return func(true); }
				}
			};
			request.onfailure = IDB.onerror;
			request.onerror = IDB.onerror;
		};
		IDB.open();

		object.initialize = function (uid, func) {
			if (!TWBS.Data.indexedDBStorage.namespace) {
				TWBS.Data.indexedDBStorage = new TWBS.indexedDBStorage("TWBS_IDB." + uid, func);
			}
		};
		object.namespace = [namespace, "."].join("");
		object.setItem = function (key, value, fun) {
			var datas = {
				"big_cache": value,
				"char_id": escape([object.namespace, key].join(""))
			}, putTransaction, putRequest;
			putTransaction = IDB.db.transaction([OSName], IDBTransaction.READ_WRITE);
			putRequest = putTransaction.objectStore(OSName).put(datas);
			putRequest.onsuccess = function (e) {
				if (fun) {fun(true); }
				//event.target.result contains the value of the keyPath of the data written (the "key")
			};
			putRequest.onerror = function (e) {
				if (fun) {fun(false); }
				TWBS.error("IndexedDB error: " + TWBS.stringify(e));
			};
			putRequest.onfailure = putRequest.onerror;
			return true;
		};
		object.getItem = function (key, func) {
			var getTransaction = IDB.db.transaction([OSName], IDBTransaction.READ_ONLY), getRequest;
			getRequest = getTransaction.objectStore(OSName).get(escape([object.namespace, key].join("")));
			getRequest.onsuccess = function (event) {
				// event.target.result contains the data object
				if (event.target.result) {
					var data = event.target.result.big_cache;
					return (func ? func(data) : true);
				} else {
					// alert("error loading data");
					return (func ? func(null) : false);
				}
			};
			return true;
		};
		object.removeItem = function (key, func) {
			var deleteTransaction = IDB.db.transaction([OSName], IDBTransaction.READ_WRITE), deleteRequest;
			deleteRequest = deleteTransaction.objectStore(OSName).delete(escape([object.namespace, key].join("")));
			deleteRequest.onsuccess = function (event) {
				if (func) {func(true, event); }
				return true;
			};
			// hack for Chrome that returns error instead of success when deleting a non-existing object (Chromium issue 90549)
			// deleteRequest.onerror = function (event) {
				// if (func) {func(true, event); }
				// return true;
			// };
			return true;
		};
	} else {
		if (func) {return func(false); }
	}
} catch (e) {TWBS.error(e, true); }
};
TWBS.cache = function () {
	TWBS.SingleDuels.loaded = 0;
	TWBS.HighDuels.loaded = 0;
	TWBS.HighForts.loaded = 0;
	TWBS.Settings.cache();
	var data;
	if (TWBS.get('IndexedDB') === 'true') {
		if (!TWBS.Data.hasOwnProperty('indexedDBStorage')) {
			if (!Character.playerId) {
				setTimeout(function () {TWBS.cache(); }, 1000);
				TWBS.log('Character.playerId is undefined');
				return false;
			}
			TWBS.Data.indexedDBStorage = new TWBS.indexedDBStorage("TWBS_IDB." + Character.playerId, function (data) {
				if (data != true) {
					TWBS.set('IndexedDB', 'nosupport');
					if (TWBS.Settings.hasOwnProperty('IndexedDB')) {
						TWBS.Settings.IndexedDB.setSelected(false);
						TWBS.Settings.IndexedDB.setCallback(function () {return false; });
					}
					TWBS.log(TWBS.Text.IDB_not_supp);
				}
				TWBS.cache();
			});
			return;
		}
		data = TWBS.Data.indexedDBStorage;
		TWBS_Data.HighDuels = {};
		TWBS_Data.SingleDuels = {};
		TWBS_Data.HighForts = {};
		data.getItem(TWBS.world + '_HighForts', function (dati) {
			TWBS_Data.HighForts.res = dati;
			TWBS.HighForts.loaded = 1;
			TWBS.Settings.cache();
		});
	} else {
		data = TWBS.Data.localStorage;
		TWBS_Data.HighDuels = {};
		TWBS_Data.SingleDuels = {};
		TWBS_Data.HighForts = {res: false};
	}
	data.getItem(TWBS.world + '_HighDuels', function (dati) {
		TWBS_Data.HighDuels.res = dati;
		TWBS.HighDuels.loaded += 1;
		TWBS.Settings.cache();
	});
	data.getItem(TWBS.world + '_HighDuels_end', function (dati) {
		TWBS_Data.HighDuels.end = dati;
		TWBS.HighDuels.loaded += 1;
		TWBS.Settings.cache();
	});
	data.getItem(TWBS.world + '_SingleDuels', function (dati) {
		TWBS_Data.SingleDuels.res = dati;
		TWBS.SingleDuels.loaded = 1;
		TWBS.Settings.cache();
	});
	return true;
};
TWBS.Calendar = function (id, id_par, call, opts) {
	// if (!id || !id_par) {
		// log('TWBS.Calendar > Undefined parameters!');
		// return false;
	// }
	var show = false, close = true, yet = false, date, year, month, day, years, months, days, fweekday;
	if (opts && typeof(opts) == 'object') {
		if (opts.hasOwnProperty('yet')) {yet = opts.yet; }
		if (opts.hasOwnProperty('show')) {show = opts.show; }
		if (opts.hasOwnProperty('close')) {close = opts.close; }
	} else {
		opts = {};
	}
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth() + 1;
	day = date.getDate();
	if (TWBS.Calendar.hasOwnProperty(id)) {
		years = TWBS.Calendar[id].year;
		months = TWBS.Calendar[id].month;
		days = TWBS.Calendar[id].day;
		yet = true;
		// date = new Date(years + ' ' + months + ' ' + days);
		// weekday = date.getDay();
	} else {
		years = year + (opts.hasOwnProperty('year') && !isNaN(opts.year) ? Number(opts.year) : 0);
		months = month + (opts.hasOwnProperty('month') && !isNaN(opts.month) ? Number(opts.month) : 0);
		days = day + (opts.hasOwnProperty('day') && !isNaN(opts.day) ? Number(opts.day) : 0);
		TWBS.Calendar[id] = {
			year: years,
			month: months,
			day: days,
			time: (new Date(years + ' ' + months + ' ' + days)).getTime(),
		};
	}
	function make_html(yeart, montht, years, months, days, s) {
		var html, bef_month, length_bef_month, fyear, fmonth, fday, last_dm, i, k, k2, l, tdate;
		yeart = Number(yeart);
		montht = Number(montht);
		years = Number(years);
		months = Number(months);
		days = Number(days);
		tdate = new Date(yeart + ' ' + montht + ' 01');
		fweekday = tdate.getDay();
		// console.log(yeart, montht, fweekday, year, month, day, years, months, days);
		html = '<table cellspacing="0" cellpadding="0" align="center" class="TWBSCalendar-Cont TWBSCalendar-' + id + '" style="z-index: 10000; position: absolute; width: auto ! important; ' + (s ? '' : 'display:none;') + '"><tbody><tr><td>';
		html += '<div class="TWBSCalendar">';
		html += '<div class="TWBSCalendar-topBar">';
		html += '<div class="TWBSCalendar-prevYear TWBSCalendar-navBtn"><div></div></div>'
			+ '<div class="TWBSCalendar-nextYear TWBSCalendar-navBtn"><div></div></div>'
			+ '<div class="TWBSCalendar-prevMonth TWBSCalendar-navBtn"><div></div></div>'
			+ '<div class="TWBSCalendar-nextMonth TWBSCalendar-navBtn"><div></div></div>';
		html += '<table cellspacing="0" cellpadding="0" align="center" class="TWBSCalendar-titleCont"><tbody><tr><td>'
			+ '<div class="TWBSCalendar-title">'
			+ TWBS.Text.month[montht - 1] + ' ' + yeart
			+ '</div></td></tr></tbody></table>';
		html += '<div class="TWBSCalendar-dayNames"><table cellspacing="0" cellpadding="0" align="center"><tbody><tr>'
			+ '<td><div>' + TWBS.Text.day[1] + '</div></td>'
			+ '<td><div>' + TWBS.Text.day[2] + '</div></td>'
			+ '<td><div>' + TWBS.Text.day[3] + '</div></td>'
			+ '<td><div>' + TWBS.Text.day[4] + '</div></td>'
			+ '<td><div>' + TWBS.Text.day[5] + '</div></td>'
			+ '<td><div class="TWBSCalendar-weekend">' + TWBS.Text.day[6] + '</div></td>'
			+ '<td><div class="TWBSCalendar-weekend">' + TWBS.Text.day[0] + '</div></td>'
			+ '</tr></tbody></table></div></div>';
		html += '<div class="TWBSCalendar-body"><table cellspacing="0" cellpadding="0" align="center" class="TWBSCalendar-bodyTable"><tbody>';
		bef_month = new Date(yeart + ' ' + montht + ' 1');
		bef_month.setHours(bef_month.getHours() - 24)
		length_bef_month = bef_month.getDate();
		if (fweekday != 1) {
			fyear = bef_month.getFullYear();
			fmonth = bef_month.getMonth() + 1;
			fday = length_bef_month - (fweekday != 0 ? (fweekday - 2) : 5);
			// console.log(fweekday, fday, length_bef_month, length_bef_month - fday);
		} else {
			fyear = yeart;
			fmonth = montht;
			fday = 1;
		}
		last_dm = new Date(yeart + ' ' + (montht + 1) + ' 1');
		last_dm.setHours(last_dm.getHours() - 24)
		last_dm = last_dm.getDate();
		k = last_dm + (fweekday != 0 ? (fweekday - 1) : 6);
		k += 7 - ((k % 7) != 0 ? (k % 7) : 7);
		l = k / 7;
		k2 = l;
		// console.log(last_dm, k, l);
		while (l--) {
			html += '<tr class="TWBSCalendar-week';
			if (l == k2 - 1) {html += ' TWBSCalendar-first-row'; }
			if (l == 0) {html += ' TWBSCalendar-last-row'; }
			html += '">';
			i = 7;
			while (i--) {
				html += '<td class="';
				if (i == 6) {html += ' TWBSCalendar-first-col'; }
				if (i == 0) {html += ' TWBSCalendar-last-col'; }
				html += '">';
				tdate = new Date(fyear, fmonth - 1, fday);
				// console.log(fyear, fmonth - 1, fday, tdate, tdate.getDay());
				html += '<div class="TWBSCalendar-day';
				if (tdate.getDay() == 6 || tdate.getDay() == 0) {html += ' TWBSCalendar-weekend'; }
				if (tdate.getMonth() + 1 != montht) {html += ' TWBSCalendar-day-othermonth'; }
				if (tdate.getMonth() + 1 == month && tdate.getDate() == day && tdate.getFullYear() == year) {html += ' TWBSCalendar-day-today'; }
				if (tdate.getMonth() + 1 == months && tdate.getDate() == days && tdate.getFullYear() == years) {html += ' TWBSCalendar-day-selected'; }
				html += '" date="' + String(tdate.getFullYear()) + String((tdate.getMonth() + 1) < 10 ? '0' + (tdate.getMonth() + 1) : tdate.getMonth() + 1) + String(tdate.getDate() < 10 ? '0' + tdate.getDate() : tdate.getDate()) + '"';
				html += '>';
				html += tdate.getDate();
				html += '</div>';
				html += '</td>';
				fday += 1;
			}
			html += '</tr>';
		}
		html += '</tbody></table></div>';
		html += '<div class="TWBSCalendar-bottomBar"><table cellspacing="0" cellpadding="0" align="center" style="width:100%"><tbody><tr><td>'
			+ '<div class="TWBSCalendar-bottomBar-today">Oggi</div>'
			+ '</td></tr></tbody></table></div>';
		html += '</div></td></tr></tbody></table>';
		jQuery('.TWBSCalendar-' + id, jQuery('#' + id_par)).remove();
		document.getElementById(id_par).innerHTML += html;
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-navBtn').mousedown(function () {
			jQuery(this).addClass('TWBSCalendar-pressed-navBtn');
		}).mouseup(function () {
			jQuery(this).removeClass('TWBSCalendar-pressed-navBtn');
		}).mouseout(function () {
			jQuery(this).removeClass('TWBSCalendar-pressed-navBtn');
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-nextMonth div').click(function () {
			if (montht + 1 > 12) {
				yeart += 1;
				montht -= 12;
			}
			make_html(yeart, montht + 1, years, months, days, true);
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-prevMonth div').click(function () {
			if (montht - 1 < 1) {
				yeart -= 1;
				montht += 12;
			}
			make_html(yeart, montht - 1, years, months, days, true);
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-nextYear div').click(function () {
			make_html(yeart + 1, montht, years, months, days, true);
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-prevYear div').click(function () {
			make_html(yeart - 1, montht, years, months, days, true);
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-bottomBar-today').click(function () {
			var date = new Date(), today;
			yeart = date.getFullYear();
			montht = date.getMonth() + 1;
			today = date.getDate();
			make_html(yeart, montht, years, months, days, true);
			jQuery(jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-bodyTable .TWBSCalendar-day').filter(function (index) {
				return jQuery(this).attr('date') == String(yeart) + String(montht < 10 ? '0' + montht : montht) + String(today < 10 ? '0' + today : today);
			})[0]).click();
		});
		jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-bodyTable').on('click', '.TWBSCalendar-day', function () {
			TWBS.Calendar[id].year = jQuery(this).attr('date').substr(0, 4);
			TWBS.Calendar[id].month = jQuery(this).attr('date').substr(4, 2);
			TWBS.Calendar[id].day = jQuery(this).attr('date').substr(6, 2);
			years = TWBS.Calendar[id].year;
			months = TWBS.Calendar[id].month;
			days = TWBS.Calendar[id].day;
			TWBS.Calendar[id].time = new Date(years + ' ' + months + ' ' + days).getTime();
			jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-day-selected').removeClass('TWBSCalendar-day-selected');
			jQuery(this).addClass('TWBSCalendar-day-selected');
			if (call && typeof(call) == 'function') {call(years, months, days, id, id_par); }
			if (new Date(years + ' ' + months + ' ' + days).getMonth() + 1 != months) {make_html(years, months, years, months, days, true); }
			if (close) {jQuery('.TWBSCalendar-' + id).hide(800); }
		});
		if (yet) {
			yet = false;
			// console.log(id, jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-bodyTable .TWBSCalendar-day.TWBSCalendar-day-selected'));
			jQuery('.TWBSCalendar-' + id + ' .TWBSCalendar-bodyTable .TWBSCalendar-day.TWBSCalendar-day-selected').click();
		}
		return true;
	}
	return make_html(years, months, years, months, days, show ? true : false);
};
TWBS.init = function () {
	var logo_TWBS, stili, domain_hostMatch, domain, force = TWBS.get('lang');
	TWBS.chrome = navigator.userAgent.toLowerCase().indexOf("chrome") == -1;
	TWBS.safari = navigator.userAgent.toLowerCase().indexOf("safari") != -1;
	TWBS.USO_URL = 'http://userscripts.org';
	TWBS.NB_HISTORY = 5;
	TWBS.i = 0;
	domain_hostMatch = /(([a-z]+)\d+)(\.public\.beta)?\.the\-west((\.[a-z]+)?\.([a-z]+))/i.exec(top.location.host);
	domain = domain_hostMatch ? (domain_hostMatch[2] && domain_hostMatch[2] !== 'w' ? domain_hostMatch[2] : domain_hostMatch[6]) : 'en';
	TWBS.loc = domain_hostMatch ? domain_hostMatch[0] : 'w1.public.beta.the-west.net';
	TWBS.world = domain_hostMatch ? domain_hostMatch[1] : 'w1';
	TWBS.main_server = top.location.protocol + '//' + TWBS.loc.replace(TWBS.world + '.', '');
	TWBS.domain = domain;
	TWBS.runLang();
	TWBS.ln = (force && TWBS.Langs[force]) ? force : domain;
	TWBS.Settings.change_lang(true);
	TWBS.HighForts.loaded = 0;
	TWBS.HighDuels.loaded = 0;
	TWBS.SingleDuels.loaded = 0;
	setTimeout(function () {TWBS.cache(); }, 5000);
	TWBS.set('version', TWBS.scriptver);
	if (!TWBS.get('HF_tS_profiles')) {
		TWBS.setJSON('HF_tS_profiles', {
			Player: {'0': {totaldmg: 1, pb: 2, algorithm: 'totaldmg/pb', prename: 'WestForts', locked: true}},
			Town: {'0': {totaldmg: 1, pb: 2, algorithm: 'totaldmg/pb', prename: 'WestForts', locked: true}},
			Use: {'Player': '0', 'Town': '0', uses: 'Player'}
		});
	}
	jQuery('#logo_TWBS').remove();
	logo_TWBS = jQuery("<div id='logo_TWBS'></div>").append(jQuery('<a id="ButtonLink" href="#"></a>').click(TWBS.show).append(jQuery('<img>').attr('src', TWBS.img.ButtonLink).attr('alt', 'Battles Stats')));
	jQuery('#left_menu').append(logo_TWBS);
	$('logo_TWBS').addMousePopup('Battles Stats');
	stili = "#left_menu #logo_TWBS #ButtonLink {background: none !important; cursor: pointer; margin-left: 103px; z-index: 10; width: 25px;}"
		+ ".TWBS .tw2gui_win2 div.tw2gui_window_inset {background-repeat: repeat !important;}"
		+ ".TWBS-tab {text-align: center;}"
		+ ".TWBS_Credits {position: relative; z-index: 10; top: 106px; color: black; text-align: right; font-size: 10.5px;}"
		+ ".TWBS_tab_table .TWBS_list_tables a.active {border-bottom: 1.5px solid #000000;}"
		+ ".TWBS_tab_table td, .TWBS-tab > table th {vertical-align: middle;}"
		+ ".TWBS_tab_table table:not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) {width: 100% !important;}"
		+ ".TWBS_tab_table table:not(.fort_style):not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) tr th {background: url(\"" + TWBS.main_server + "/images/ranking/ranking_top_row.png\") repeat-y scroll 0 0 transparent;}"
		+ ".TWBS_tab_table table:not(.fort_style):not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) tr:nth-child(2n) td {background: url(\"" + TWBS.main_server + "/images/ranking/ranking_first_row.png\") repeat-y scroll 0 0 transparent;}"
		+ ".TWBS_tab_table table:not(.fort_style):not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) tr:nth-child(2n+3) td {background: url(\"" + TWBS.main_server + "/images/ranking/ranking_second_row.png\") repeat-y scroll 0 0 transparent;}"
		+ ".TWBS_tab_table table:not(.fort_style):not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) tr:nth-child(n+1):hover td {background: url(\"" + TWBS.main_server + "/images/ranking/ranking_hover_row.png\") repeat-y scroll 0 0 transparent;}"
		+ ".TWBS_tab_table table:not(.fort_style):not(.TWBSCalendar-Cont):not(.TWBSCalendar-bodyTable):not(.TWBSCalendar-titleCont) td, .TWBS-tab > table table th {background-position: -20px 50% !important;}"
		+ ".TWBS .tw2gui_window_content_pane {top: 55px !important;}"
		+ ".TWBS .bag_item_mini {margin: -6px -5px; -moz-transform: scale(0.7); -webkit-transform: scale(0.7); -ms-transform: scale(0.7); -o-transform: scale(0.7); transform: scale(0.7);}"
		+ ".TWBS_border_shadow_hor {background-image: url(\"" + TWBS.main_server + "/images/border/table/border_shadow_left.png\"); background-repeat: repeat-x; height: 1px; width: 100%;}"
		+ ".TWBS_settings_table th, .TWBS_settings_table th:hover, .TWBS_settings_table td, .TWBS_settings_table td:hover {background: none !important;}"
		+ "#TWBS_lang img {padding-bottom: 2px;}"
		+ ".TWBS_tab_table table.fort_style td {color: #48382C;}"
		+ ".TWBS_tab_table table.fort_style tr:nth-child(1) div {height: 26px; background: url(\"" + TWBS.main_server + "/images/fort/overview/battleStatsBg.png\") no-repeat scroll -12px -8px transparent; margin-bottom: -5px; padding-top: 5px;}"
		+ ".TWBS_tab_table table.fort_style tr:nth-child(1) th {height: 26px;}"
		+ ".TWBS_tab_table table.fort_style tr.odd td {height: 26px; background: url(\"" + TWBS.main_server + "/images/fort/overview/battleStatsBg.png\") no-repeat scroll -12px -34px transparent;}"
		+ ".TWBS_tab_table table.fort_style tr.even td {height: 26px; background: url(\"" + TWBS.main_server + "/images/fort/overview/battleStatsBg.png\") no-repeat scroll -12px -86px transparent;}"
		+ ".TWBS_tab_table table.fort_style tr.divider {height: 2px; background: url(\"" + TWBS.main_server + "/images/fort/overview/battleStatsdiv.png\") repeat scroll 0 0 transparent;}"
		+ ".THeadOverflow {display: block; width: 100%;}"
		+ ".TBodyOverflow {overflow: auto; height: 265px; display: block; width: 100%;}"
		+ ".TWBS_settings_c1 {width: 137px;}"
		+ ".TWBS_settings_c2 {width: 95px;}"
		+ ".TWBS_settings_c3 {width: 65px;}"
		+ ".TBodyOverflow td {height: 30px;}"
		+ ".TBodyOverflow .TWBS_settings_c2 {padding: 6px 1px;}"
		+ String();
	jQuery('body').append(jQuery("<style></style>")
		.attr('type', 'text/css')
		.attr('id', 'TWBS_style')
		.text(stili.replace(/\}\s*/g, '}\n'))
		);
	jQuery('body').append(jQuery("<style></style>")
		.attr('type', 'text/css')
		.attr('id', 'TWBS_Calendar_style')
		.text('/* CSS */.TWBSCalendar{ border:1px solid #aaa; -moz-user-select:none; -webkit-user-select:none; user-select:none; background:#e8e8e8; font:11px "lucida grande",tahoma,verdana,sans-serif; line-height:14px; position:relative; cursor:default}.TWBSCalendar table{ border-collapse:collapse; font:11px "lucida grande",tahoma,verdana,sans-serif; line-height:14px}.TWBSCalendar-topBar{ border-bottom:1px solid #aaa; background:#ddd; padding:5px 0 0 0}table.TWBSCalendar-titleCont{ font-size:130%;font-weight:bold; color:#444; text-align:center; z-index:9; position:relative;}.TWBSCalendar-title div{ padding:5px 17px; text-shadow:1px 1px 1px #777}.TWBSCalendar-title:hover div{ background-color:#fff; border:1px solid #000; padding:4px 16px}.TWBSCalendar-bottomBar{ border-top:1px solid #aaa; background:#ddd; padding:2px; position:relative; text-align:center}.TWBSCalendar-bottomBar-today:hover{ padding:2px 15px}.TWBSCalendar-bottomBar-today{ border:1px solid #000; background-color:#fff; padding:1px 14px}.TWBSCalendar-pressed-bottomBar-today{ border:1px solid #000; background-color:#777; color:#fff; padding:1px 14px}.TWBSCalendar-body{ position:relative; overflow:hidden; padding-top:5px; padding-bottom:5px}.TWBSCalendar-first-col{padding-left:5px}.TWBSCalendar-last-col{padding-right:5px}.TWBSCalendar-animBody-backYear{ position:absolute; top:-100%; left:0}.TWBSCalendar-animBody-back{ position:absolute; top:5px; left:-100%}.TWBSCalendar-animBody-fwd{ position:absolute; top:5px; left:100%}.TWBSCalendar-animBody-now{ position:absolute; top:5px; left:0}.TWBSCalendar-animBody-fwdYear{ position:absolute; top:100%; left:0}.TWBSCalendar-dayNames{ padding-left:5px; padding-right:5px}.TWBSCalendar-dayNames div{font-weight:bold;color:#444;text-shadow:1px 1px 1px #777}.TWBSCalendar-dayNames table tr:hover td{background:none !important;}.TWBSCalendar-navBtn{ position:absolute; top:5px; z-index:10}.TWBSCalendar-navBtn:hover div{ background-repeat:no-repeat; background-position:50% 50%; height:13px; padding:1px; margin-top:-2px;}.TWBSCalendar-navBtn div{border:1px solid #000; padding:0; background-color:#E8E8E8}.TWBSCalendar-navDisabled{ opacity:0.3; filter:alpha(opacity=30)}.TWBSCalendar-pressed-navBtn div{ border:1px solid #000; padding:0; background-color:#777; color:#fff}.TWBSCalendar-prevMonth{ left:25px}.TWBSCalendar-nextMonth{ left:100%; margin-left:-43px}.TWBSCalendar-prevYear{ left:5px}.TWBSCalendar-nextYear{ left:100%; margin-left:-23px}.TWBSCalendar-prevMonth div{ background-image:url("' + TWBS.img.left + '")}.TWBSCalendar-nextMonth div{ background-image:url("' + TWBS.img.right + '")}.TWBSCalendar-nextMonth div, .TWBSCalendar-prevMonth div{height:9px; width:8px;}.TWBSCalendar-prevYear div{ background-image:url("' + TWBS.img.left2 + '")}.TWBSCalendar-nextYear div{ background-image:url("' + TWBS.img.right2 + '")}.TWBSCalendar-nextYear div, .TWBSCalendar-prevYear div{height:9px; width:12px;}div.TWBSCalendar-menu{position:absolute;left:0;top:0;width:100%;height:100%;background-color:#ddd;overflow:hidden;opacity:0.85;filter:alpha(opacity=85)}.TWBSCalendar-menu table td div{text-align:center;font-weight:bold;padding:3px 5px}.TWBSCalendar-menu table td div.TWBSCalendar-menu-month{width:4em;text-align:center}.TWBSCalendar-menu table td div.TWBSCalendar-navBtn:hover{border:1px solid #000;padding:2px 4px;background-color:#fff;color:#000}.TWBSCalendar-menu table td div.TWBSCalendar-pressed-navBtn{border:1px solid #000;padding:2px 4px;background-color:#777;color:#fff !important}.TWBSCalendar-menu-year{text-align:center;font:16px "lucida grande",tahoma,verdana,sans-serif;font-weight:bold}.TWBSCalendar-menu-sep{height:1px;font-size:1px;line-height:1px;overflow:hidden;border-top:1px solid #888;background:#fff;margin-top:4px;margin-bottom:3px}.TWBSCalendar-week:hover{background-color:#ddd}.TWBSCalendar-dayNames div,.TWBSCalendar-day,.TWBSCalendar-weekNumber{width:1.7em;padding:3px 4px;text-align:center}.TWBSCalendar-weekNumber{border-right:1px solid #aaa;margin-right:4px;width:2em !important;padding-right:8px !important}.TWBSCalendar-day{text-align:right;color:#222}.TWBSCalendar-day-othermonth{color:#888}.TWBSCalendar-weekend{color:#c22}.TWBSCalendar-day-today{color:#00f;font-weight:bold}.TWBSCalendar-day-disabled{opacity:0.5;text-shadow:2px 1px 1px #fff}.TWBSCalendar-day:hover{padding:2px 3px;background-color:#eef;border:1px solid #88c;margin:0 !important;color:#000}.TWBSCalendar-day-othermonth.TWBSCalendar-day:hover{border-color:#aaa;color:#888}.TWBSCalendar-dayNames .TWBSCalendar-weekend{color:#c22}.TWBSCalendar-day-othermonth.TWBSCalendar-weekend{color:#d88}.TWBSCalendar-day-selected{padding:2px 3px;margin:1px;background-color:#aaa;color:#000 !important}.TWBSCalendar-day-today.TWBSCalendar-day-selected{background-color:#999}.TWBSCalendar-focusLink{position:absolute;opacity:0;filter:alpha(opacity=0)}.TWBSCalendar-focused{border-color:#000}.TWBSCalendar-focused .TWBSCalendar-topBar,.TWBSCalendar-focused .TWBSCalendar-bottomBar{background-color:#ccc;border-color:#336}.TWBSCalendar-focused .TWBSCalendar-week:hover{background-color:#ccc}.TWBSCalendar-tooltip{position:absolute;top:100%;width:100%}.TWBSCalendar-tooltipCont{margin:0 5px 0 5px;border:1px solid #aaa;border-top:0;padding:3px 6px;background:#ddd}.TWBSCalendar-focused .TWBSCalendar-tooltipCont{background:#ccc;border-color:#000}@media print{.TWBSCalendar-day-selected{padding:2px 3px;border:1px solid #000;margin:0 !important}}.TWBSCalendar{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}.TWBSCalendar-title,.TWBSCalendar-title div{-moz-border-radius:0 0 4px 4px;-webkit-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.TWBSCalendar-topBar{-moz-border-radius:4px 4px 0 0;-webkit-border-radius:4px;border-radius:4px 4px 0 0}.TWBSCalendar-bottomBar{-moz-border-radius:0 0 4px 4px;-webkit-border-radius:0 0 4px 4px;border-radius:0 0 4px 4px}.TWBSCalendar-bottomBar-today{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}.TWBSCalendar-navBtn,.TWBSCalendar-navBtn div{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}.TWBSCalendar-menu{-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px}.TWBSCalendar-menu table td div{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}.TWBSCalendar-weekNumber{-moz-border-radius:4px 0 0 4px;-webkit-border-radius:4px 0 0 4px;border-radius:4px 0 0 4px}.TWBSCalendar-day{-moz-border-radius:4px;-webkit-border-radius:4px;border-radius:4px}.TWBSCalendar-day-disabled{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0}.TWBSCalendar-tooltipCont{-moz-border-radius:0 0 5px 5px;-webkit-border-radius:5px}')
		);
	wman.registerReopenHandler(/^TWBS$/, TWBS.reShow);
	wman.registerReloadHandler(/^TWBS$/, TWBS.reShow);
	wman.registerReopenHandler(/^TWBS_typeStats$/, TWBS.HighForts.typeStats.reShow);
	wman.registerReloadHandler(/^TWBS_typeStats$/, TWBS.HighForts.typeStats.reShow);
	TWBS.TWA_register();
	window.addEventListener('message', TWBS.analizza_iframe(), false);
	TWBS.Parser = TWBS.Parser({});
	// inject removeTab
	tw2gui.window.removeTab = function (id, id2, f) {
		if (!this.tabIds[id]) {
			throw "nonexistent tab " + id;
		}
		if (!id2) {
			id2 = this.currentActiveTabId;
		}
		if (!this.tabIds[id2]) {
			throw "nonexistent tab " + id2;
		}
		jQuery('._tab_id_' + id).remove();
		delete this.tabIds[id];
		this.fireActivateTab(id2);
		if (f) {
			f();
		}
		return this.doLayout();
	};
};
if ((window.location.host.indexOf('.the-west.') != -1) && (window.location.pathname.indexOf('game.php') != -1)) {
	if (undefined == window.TWBS) {
		TWBS.run('var TWBS = ' + TWBS.stringify(TWBS, true) + ';\nvar TWBS_Data = {};\nTWBS.init();', false);
		TWBS = undefined;
	} else {
		TWBS.init();
	}
} else if ((window.location.host.indexOf('userscripts.org') != -1) && ((window.location.pathname.indexOf(TWBS.scriptid + '.meta.js') != -1) || (window.location.pathname.indexOf('review/' + TWBS.scriptid) != -1))) {
	TWBS = undefined;
	// Script running in update iframe.
	(
		function (f) {
			var s = document.createElement('script');
			s.type = 'application/javascript';
			s.textContent = '(' + f.toString() + ')()';
			(document.body || document.head || document.documentElement).appendChild(s);
			s.parentNode.removeChild(s);
		}(
			function () {
				function invia_info() {
					var destination = window.parent,
						message = String(escape(document.body.textContent));
					if (destination.postMessage) {
						destination.postMessage('118401' + message, '*');
					}
				}
				invia_info();
			}
		)
	);
}