// ==UserScript==
// @name		Last.fm - Polish the profile
// @namespace	http://no.name.space/
// @description	Display percentage of plays and statistics on user profile
// @include	http://www.last.fm/user/*
// @include	http://www.lastfm.fr/user/*
// @include	http://www.lastfm.de/user/*
// @include	http://www.lastfm.it/user/*
// @include	http://www.lastfm.se/user/*
// @include	http://www.lastfm.es/user/*
// @include	http://www.lastfm.com.br/user/*
// @exclude	http://www.last.fm/user/*/group*
// ==/UserScript==

//Changelog:
//2005-08-14 arvid.jakobsson@gmail.com 1.0 - Initial version of percentage script
//2005-12-16 _m.lenzen@gmail.com - modified version to display more detail and lower threshold
//2006-12-29 m.lenzen@gmail.com - Modified to work with the latest last.fm changes
// 2007-03-27 snyde1 - fix for Opera
// 2007-04-28 snyde1 - merge stats and text colour fix, optimise the math
// 2007-04-04 snyde1 - set up comma separation for numbers > 1000
// 2007-08-08 snyde1 - add "landmark" track plays and then album stats and position limits
// 2007-08-11 snyde1 - add album section and limits, reorganise
// 2007-08-12 snyde1 - add internationalisation (FR, DE, SE, ES, PT, IT)
// 2008-01-09 snyde1 - add support for time period used on profile
// 2008-09-17 snyde1 - fix for recent format change
// 2008-09-20 - remove landmarks, add tracker link, move tracks played around
// 2008-09-25 - fix non-English sites
// 2009-03-25 - fix header for top tracks

// Initiation values

// Set the following to zero (0) to disable

var noFlip = 1; // Get rid of background images
var darkText = 1; // Make text over bar the colour set below (darkTextClr)
var doPCTage = 1; // Include percentage of plays for the bars
var doStats = 1;  // Include monthly/weekly/etc. breakdown of plays
var limitCount = 25; // limit line count in artist/track charts ... set to 0 (or over 50) to ignore
var squishRecent = 0; // merge lines in recent tracks
var squishLibrary = 1; // collapse pictures in Library
var addAlbum = 0; // add block for album stats - can be time consuming
var useBasis = 0; // Add notation when using weekly stats rather than overall

// Colour for dark text

var darkTextClr = "#338";

// Change this to the number of decimal places you wish displayed

var num_dec = 1;
/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
 */
var monthStr = new Array();
monthStr[0] = "Jan"; monthStr[1] = "Feb"; monthStr[2] = "Mar"; monthStr[3] = "Apr";
monthStr[4] = "May"; monthStr[5] = "Jun"; monthStr[6] = "Jul"; monthStr[7] = "Aug";
monthStr[8] = "Sep"; monthStr[9] = "Oct"; monthStr[10] = "Nov"; monthStr[11] = "Dec";

// Regexps for languages
// English (default)
var regDateRE = /<small>since ([^<]*)</i;
var rstDateRE = /\(reset on ([^<]*)\)/;
var rstDataRE = /\(reset on /;
var trkRE = /Tracks/; var albST = "Albums";
var traxPlydRE = /Tracks played:/;
var prefA = "... per ";
var prefB = new Array; prefB[0] = "hour"; prefB[1] = "day"; prefB[2] = "week"; prefB[3] = "month"; prefB[4] = "year";
var monthN = new Object;
var comma = ","; // number separator
var decimal = ".";
var albumHDRa = "<H2 Class='heading'><SPAN class='h2Wrapper'><A HREF='";
var albumHDRb = "'>Top Albums Overall</a></span></h2>";
var RTtext = "Reply Tracker";

// Français
if (location.href.match(/lastfm\.fr\//)) {
	regDateRE = /<small>depuis le ([^<]*)</i;
	rstDataRE = /\(r.initialisation le /;
	rstDateRE = /\(r.initialisation le ([^<]*)\)/;
	traxPlydRE = /Titres jou.s :/;
	trkRE = /titres/; albST = "albums";
	prefA = " ... par ";
	prefB = new Array; prefB[0] = "heur"; prefB[1] = "jour"; prefB[2] = "semaine"; prefB[3] = "mois"; prefB[4] = "an";
	albumHDR = 'Top des albums global <span>(voir plus)</span>';
	comma = " "; decimal = ",";
	monthN["jan."] = "Jan"; monthN["fév."] = "Feb"; monthN["mars"] = "Mar";
	monthN["avr."] = "Apr"; monthN["mai"] = "May";  monthN["juin"] = "Jun";
	monthN["jui."] = "Jul"; monthN["août"] = "Aug"; monthN["sept"] = "Sep";
	monthN["oct."] = "Oct"; monthN["nov."] = "Nov"; monthN["déc."] = "Dec";
monthStr[0] = "jan."; monthStr[1] = "f&eactue;v"; monthStr[2] = "mars"; monthStr[3] = "avr.";
monthStr[4] = "mai"; monthStr[5] = "juin"; monthStr[6] = "jui."; monthStr[7] = "ao&ucirc;t";
monthStr[8] = "sept"; monthStr[9] = "oct."; monthStr[10] = "nov."; monthStr[11] = "d&eacute;c.";
RTtext = "Suivi des r&eacute;ponses";
}
// Deutsch
if (location.href.match(/lastfm\.de\//)) {
	regDateRE = /<small>seit ([^<]*)</i;
	rstDataRE = /\(zur.ckgesetzt am /;
	rstDateRE = /\(zur.ckgesetzt am ([^<]*)\)/;
	traxPlydRE = /Geh.rte Titel:/;
	trkRE = /Titel/; albST = "Alben";
	prefA = "Titel pro ";
	prefB = new Array; prefB[0] = "Stunde"; prefB[1] = "Tag"; prefB[2] = "Woche"; prefB[3] = "Monat"; prefB[4] = "Jahr";
	albumHDR = 'Allgemeine Top-Alben <span>(weitere anzeigen)</span>';
	comma = "."; decimal = ",";
	monthN["Jan."] = "Jan"; monthN["Feb."] = "Feb"; monthN["Mär."] = "Mar";
	monthN["Apr."] = "Apr"; monthN["Mai."] = "May"; monthN["Jun."] = "Jun";
	monthN["Jul."] = "Jul"; monthN["Aug."] = "Aug"; monthN["Sep."] = "Sep";
	monthN["Okt."] = "Oct"; monthN["Nov."] = "Nov"; monthN["Dez."] = "Dec";
monthStr[0] = "Jan."; monthStr[1] = "Feb."; monthStr[2] = "M&auml;r."; monthStr[3] = "Apr.";
monthStr[4] = "Mai."; monthStr[5] = "Jun."; monthStr[6] = "Jul."; monthStr[7] = "Aug.";
monthStr[8] = "Sep."; monthStr[9] = "Okt."; monthStr[10] = "Nov."; monthStr[11] = "Dez.";
RTtext = "Antworten verfolgen";
}
// Svenska
if (location.href.match(/lastfm\.se\//)) {
	regDateRE = /<small>sedan ([^<]*)</i;
	rstDataRE = /\(.terst.llt den /;
	rstDateRE = /\(.terst.llt den ([^<]*)\)/;
	traxPlydRE = /L.tar spelade:/;
	trkRE = /Toppl.tar/; albST = "Toppalbum";
	prefA = "L&Aring;tar per ";
	prefB = new Array; prefB[0] = "timme"; prefB[1] = "dag"; prefB[2] = "vecka"; prefB[3] = "m&aring;nad"; prefB[4] = "&aring;r";
	albumHDR = 'Toppartister totalt <span>(se fler)</span>';
	comma = ",";
	monthN["jan"] = "Jan"; monthN["feb"] = "Feb"; monthN["mar"] = "Mar";
	monthN["apr"] = "Apr"; monthN["maj"] = "May"; monthN["jun"] = "Jun";
	monthN["jul"] = "Jul"; monthN["aug"] = "Aug"; monthN["sep"] = "Sep";
	monthN["okt"] = "Oct"; monthN["nov"] = "Nov"; monthN["dec"] = "Dec";
monthStr[0] = "jan"; monthStr[1] = "feb"; monthStr[2] = "mar"; monthStr[3] = "apr";
monthStr[4] = "maj"; monthStr[5] = "jun"; monthStr[6] = "jul"; monthStr[7] = "aug";
monthStr[8] = "sep"; monthStr[9] = "okt"; monthStr[10] = "nov"; monthStr[11] = "dec";
RTtext = "Svarshistorik";
}
// Español
if (location.href.match(/lastfm\.es\//)) {
	regDateRE = /<small>desde ([^<]*)</i;
	rstDataRE = /\(reiniciar /;
	rstDateRE = /\(reiniciar ([^<]*)\)/;
	traxPlydRE = /Temas escuchados:/;
	trkRE = /Temas/; albST = "&Aacute;lbumes";
	prefA = "Temas por ";
	prefB = new Array; prefB[0] = "hora"; prefB[1] = "dia"; prefB[2] = "semana"; prefB[3] = "mes"; prefB[4] = "a&ntilde;o";
	albumHDR = '&Aacute;lbumes m&aacute;s escuchados <span>(ver m&aacute;s)</span>';
	comma = ",";
	monthN["Ene"] = "Jan"; monthN["Feb"] = "Feb"; monthN["Mar"] = "Mar";
	monthN["Abr"] = "Apr"; monthN["May"] = "May"; monthN["Jun"] = "Jun";
	monthN["Jul"] = "Jul"; monthN["Ago"] = "Aug"; monthN["Sep"] = "Sep";
	monthN["Oct"] = "Oct"; monthN["Nov"] = "Nov"; monthN["Dic"] = "Dec";
monthStr[0] = "Ene"; monthStr[1] = "Feb"; monthStr[2] = "Mar"; monthStr[3] = "Abr";
monthStr[4] = "May"; monthStr[5] = "Jun"; monthStr[6] = "Jul"; monthStr[7] = "Ago";
monthStr[8] = "Sep"; monthStr[9] = "Oct"; monthStr[10] = "Nov"; monthStr[11] = "Dic";
RTtext = "Mis respuestas";
}
// Português
if (location.href.match(/lastfm\.com\.br\//)) {
	regDateRE = /<small>desde ([^<]*)</i;
	rstDataRE = /\(Reiniciar em /;
	rstDateRE = /\(Reiniciar em ([^<]*)\)/;
	traxPlydRE = /Faixas executadas:/;
	trkRE = /Faixas/; albST = "&Aacute;lbuns";
	prefA = "Faixas por ";
	prefB = new Array; prefB[0] = "hora"; prefB[1] = "dia"; prefB[2] = "semana"; prefB[3] = "m&ecirc;s"; prefB[4] = "ano";
	albumHDR = '&Aacute;lbuns mais tocadas em geral <span>(ver mais)</span>';
	comma = "."; decimal = ",";
	monthN["Jan"] = "Jan"; monthN["Fev"] = "Feb"; monthN["Mar"] = "Mar";
	monthN["Abr"] = "Apr"; monthN["Mai"] = "May"; monthN["Jun"] = "Jun";
	monthN["Jul"] = "Jul"; monthN["Ago"] = "Aug"; monthN["Set"] = "Sep";
	monthN["Out"] = "Oct"; monthN["Nov"] = "Nov"; monthN["Dez"] = "Dec";
monthStr[0] = "Jan"; monthStr[1] = "Fev"; monthStr[2] = "Mar"; monthStr[3] = "Abr";
monthStr[4] = "Mai"; monthStr[5] = "Jun"; monthStr[6] = "Jul"; monthStr[7] = "Ago";
monthStr[8] = "Sep"; monthStr[9] = "Out"; monthStr[10] = "Nov"; monthStr[11] = "Dez";
RTtext = "Suas respostas";
}
// Italiano
if (location.href.match(/lastfm\.it\//)) {
	regDateRE = /<small>dal ([^<]*)</i;
	rstDataRE = /\(reimpostato il /;
	rstDateRE = /\(reimpostato il ([^<]*)\)/;
	traxPlydRE = /Brani ascoltati:/;
	trkRE = /Brani/; albST = "Album";
	prefA = "brani ";
	prefB = new Array; prefB[0] = "all'ora"; prefB[1] = "al giorno"; prefB[2] = "alla settimana"; prefB[3] = "al mese"; prefB[4] = "all'anno";
	albumHDR = 'Album pi&ugrave;  ascoltati <span>(visualizza tutti)</span>';
	comma = ",";
	monthN["Gen"] = "Jan"; monthN["Feb"] = "Feb"; monthN["Mar"] = "Mar";
	monthN["Apr"] = "Apr"; monthN["Mag"] = "May"; monthN["Giu"] = "Jun";
	monthN["Lug"] = "Jul"; monthN["Ago"] = "Aug"; monthN["Set"] = "Sep";
	monthN["Ott"] = "Oct"; monthN["Nov"] = "Nov"; monthN["Dic"] = "Dec";
monthStr[0] = "Gen"; monthStr[1] = "Feb"; monthStr[2] = "Mar"; monthStr[3] = "Apr";
monthStr[4] = "Mag"; monthStr[5] = "Giu"; monthStr[6] = "Lug"; monthStr[7] = "Ago";
monthStr[8] = "Set"; monthStr[9] = "Ott"; monthStr[10] = "Nov"; monthStr[11] = "Dic";
RTtext = "Tracker delle risposte";
}

function xpath(query, context) {
	if (!context) { context = document; }
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

(function () {
	var tenpow = Math.pow(10, num_dec); var teninv = 1.0/tenpow;
	if (! location.href.match(/last[^\/]*\/user\/([^\/]*)$/)) {return;}
	var username = location.href.match(/last[^\/]*\/user\/([^\/]*)$/)[1];
	var userData = xpath("//DIV[@Class='userData']");
	if (userData.snapshotLength <= 0) { return; }
	var panel = userData.snapshotItem(0);
	var panelPart = xpath("//DIV[@Class='userData']/SPAN[@Class='userPlays']/Strong/SPAN[@Class='count']");
	var tracksplayed = 0; var panelText = "";
	if (panelPart.snapshotLength > 0) {
		panelText = panelPart.snapshotItem(0).innerHTML;
		tracksplayed = panelText.replace(/<span class="flip">/ig,"");
		tracksplayed = tracksplayed.replace(/<.span>/ig,"");
		if (noFlip == 1) {
			panelPart.snapshotItem(0).innerHTML = tracksplayed;
		}
		tracksplayed = tracksplayed.replace(/[^0-9]/g,"");
	} else {
		var panel = document.getElementById("hcard-"+username);
		panelText = panel.innerHTML+"";
		panelText = panelText.match(/<span title="[^\"]*">(.*)<\/span>/i)[1];
		var tracksplayed = panelText.match(/([^ ]*) [^0-9]/i)[1]+"";
		tracksplayed = tracksplayed.replace(/[^0-9]/g,'');
	}
	if (!tracksplayed){ return; }
	var reg_date = panel.innerHTML.match(regDateRE)[1];
		if (!reg_date) { return; }
	if (panel.innerHTML.match(rstDataRE)) {
		var up_Date = panel.innerHTML.match(rstDateRE)[1];
		if (up_Date) { reg_date = up_Date; 	}
	}
	// Language specific date
	if (! location.href.match(/www\.last\.fm\//)){
		reg_date = reg_date.replace(/^ */,"");
		var fr_date = new Array; fr_date = reg_date.split(/ /);
		reg_date = fr_date[0]+" "+monthN[fr_date[1]]+" "+fr_date[2];
		reg_date = reg_date.replace(/\./g,""); // Just for German
	}
	var reg_date_ms = Date.parse(reg_date);
	var now = new Date();
	var now_ms = Date.parse(now);
	var diff = Math.round((now_ms - reg_date_ms)/1000);
// Add tracker link
	var userText = userData.snapshotItem(0).innerHTML+"";
	if (userText.match(/\/grapevine[^<]*<\/a>/i)) {
		var repTrackBack = userText.match(/grapevine[^<]*<.a>/i);
		repTrackBack += " | <a href=\"/user/"+username+"/replytracker\">"+RTtext+"</a> ";
		userData.snapshotItem(0).innerHTML =
		userText.replace(/grapevine[^<]*<\/a>/i,repTrackBack);
	}
// Side panel stuff
	if ( (doStats != 0) ) {
		var tps = tracksplayed / diff; // Tracks per second
		var tph = tps * 3600; var newtph = commatize(tph.toFixed(num_dec),comma,decimal);
		var tpd = tps * 86400; var newtpd = commatize(tpd.toFixed(num_dec),comma,decimal);
		var tpw = tps * 604800; var newtpw = commatize(tpw.toFixed(num_dec),comma,decimal);
		var tpm = tps * 2628000; // Average month length, not 31 days
		var newtpm = commatize(tpm.toFixed(num_dec),comma,decimal);
		var tpy = tps * 31536000; commatize(tpy.toFixed(3),comma,decimal); var newtpy = commatize(tpy.toFixed(num_dec),comma,decimal);
		var paragraph = panel.parentNode; // xpath(".//DIV[@class='c']/P", panel);
		if (doStats != 0) {
			var trxText = document.createElement("span");
			var parJour = "<table class=\"userData\"><tr><td>"+prefA+prefB[0]+"</td><td align=right>"+newtph+"</td></tr>";
			parJour += "<tr><td>"+prefA+prefB[1]+"</td><td align=right>"+newtpd+"</td></tr>";
			parJour += "<tr><td>"+prefA+prefB[2]+"</td><td align=right>"+newtpw+"</td></tr>";
			parJour += "<tr><td>"+prefA+prefB[3]+"</td><td align=right>"+newtpm+"</td></tr>";
			parJour += "<tr><td>"+prefA+prefB[4]+"</td><td align=right>"+newtpy+"</td></tr></table>";
			trxText.innerHTML = parJour+"<br>";
			panel.insertBefore(trxText, panel.lastChild.previousSibling);
		}
	}
// Squish Recents
	if (squishRecent != 0) {
		var bars = xpath("//TABLE[@id='recentTracks']/TBODY/TR/TD[@class='subjectCell']");
		for (var i=0; i<bars.snapshotLength; i++) {
			bars.snapshotItem(i).innerHTML = bars.snapshotItem(i).innerHTML.replace(/<br[^>]*>/i," &ndash; ");
		}
		var bars = xpath("//TABLE[@id='recentTracks']/TBODY/TR/TD[@class='subjectCell featured featuredTrack']");
		for (var i=0; i<bars.snapshotLength; i++) {
			bars.snapshotItem(i).innerHTML = bars.snapshotItem(i).innerHTML.replace(/<br[^>]*>/i," &ndash; ");
		}
		bars = xpath("//TABLE[@id='recentTracks']/TBODY/TR");
		for (var i=0; i<bars.snapshotLength; i++) { var tmpItem = bars.snapshotItem(i).firstChild;
			tmpItem.setAttribute("style","height: 18px;");// display:none;");
			tmpItem.nextSibling.setAttribute("style","height: 18px;"); // display:none;");
			tmpItem.parentNode.setAttribute("style","height: 18px;");
			tmpItem.innerHTML = "";
		}
		bars = xpath("//TABLE[@id='recentTracks']/TBODY/TR/TD[@class='featured featuredImage']");
		for (var i=0; i<bars.snapshotLength; i++) {
			bars.snapshotItem(i).setAttribute("style","height: 18px;"); // display:none;");
		}
	}
// Zap Library pics
	if (squishLibrary != 0) {
		var libpics = xpath("//SPAN[@Class='pictureFrame']");
		for (var i=0; i<libpics.snapshotLength; i++) {
			libpics.snapshotItem(i).setAttribute("style","display:none;");
			libpics.snapshotItem(i).parentNode.parentNode.setAttribute("style","height: 40px; width: 155px;");
			libpics.snapshotItem(i).parentNode.parentNode.parentNode.setAttribute("style","height: 120px;");
		}
		var libpics = xpath("//A[@Class='playbutton']");
//		var libpics = xpath("//SPAN[@Class='overlay']");
		for (var i=0; i<libpics.snapshotLength; i++) {
			libpics.snapshotItem(i).setAttribute("style","display:none;");
		}
	}
// Album panel
	if ((addAlbum != 0) && (location.href.match(/\/user\/[^\/]*$/)) ) {
		var theURL = location.href+"/charts?rangetype=overall&subtype=albums";
		var centerField = xpath("//DIV[@Class='module modulechartstracks']");
		if (centerField.snapshotLength>0) {
			var newSection = document.createElement("div");
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET", theURL, false);
			xmlhttp.send(null);
			var xmlText = xmlhttp.responseText;
			if (xmlText) {
				centerField.snapshotItem(0).parentNode.insertBefore(newSection,centerField.snapshotItem(0).nextSibling);
				xmlText = xmlText+"";
				var xmlTable = "<table"+xmlText.split(/<table/)[1];
				xmlTable = xmlTable.split(/<\/table>/)[0]+"</table>";
				if (xmlTable) {
					xmlTable = xmlTable.replace(/div style="width:20%;"/g,"div style='width:40%;'");
					var addText = albumHDRa+theURL+albumHDRb;
					addText += '<div class="chartWithQuiltChart" id="MyTopAlbums">'+xmlTable+'</div></div>';
					newSection.innerHTML = addText;
				}
			}
			if (limitCount == 0) {limitCount = 50; }
		}
	}
// Loop for everything else
	if ( (doPCTage != 0) || (darkText != 0) || (limitCount != 0) ) {
		var basis = "";

		if ( (doPCTage != 0) && (location.href.match(/charttype=weekly/)) ) {
			panel = document.getElementById("selectedWeekStats");
			tracksplayed = panel.innerHTML.match(/<td>Total Plays:<\/td><td><strong>([0-9,]+)<\/strong><\/td>/i)[1].replace(/,/, "");
			if (useBasis != 0) { basis = " wkly"; }
		}

		var bars = xpath("//TD[@class='chartbarCell']/DIV/SPAN");
		var poses = xpath("//TD[@class='positionCell']");
		var labelz = xpath("//TD[@class='subjectCell']/DIV");
		var oldPos = 1000000; var posIndex = 0;
		for (var i = 0; i < bars.snapshotLength; i++) {
			var newCell = document.createElement("td");
			newCell.setAttribute("Class","myPcnt");
			newCell.innerHTML = " ";
			poses.snapshotItem(i).parentNode.insertBefore(newCell,poses.snapshotItem(i).parentNode.childNodes(poses.snapshotItem(i).parentNode.childNodes.length - 1));
			var posCount = poses.snapshotItem(i).innerHTML.replace(/ */g,"")-0;
			if (posCount < oldPos) {
				posIndex = 0;
			}
			oldPos = posCount+0; posIndex++;
			if ((limitCount != 0) && (! location.href.match(/charts/)) && (posIndex > limitCount) ) {
				poses.snapshotItem(i).parentNode.setAttribute("style","display:none;");
			} else {
				var bar = bars.snapshotItem(i);
				if (doPCTage != 0) {
					var played = bar.innerHTML;
					var playedInt = played.replace(/[, \.]/g, "");
					var percentage = (playedInt / tracksplayed) * 100;
					if (percentage >= teninv) {
						newCell.innerHTML =commatize(percentage.toFixed(num_dec),comma,decimal) + "%" + basis;
//						labelz.snapshotItem(i).innerHTML += " &nbsp; - &nbsp; (" + commatize(percentage.toFixed(num_dec),comma,decimal) + "%" + basis + ")";
					}
				}
				if (darkText != 0) {
//					bar.parentNode.parentNode.style.color = darkTextClr;
					bar.style.color = darkTextClr;
				}
			}
		}
	}
})();

//
// Insert "commas" to split number into blocks of 3 digits
//
function commatize(number,comma,deci) {
	number = number+""; // Make text
	if (!comma) { var comma = ","; }
	if (!deci) { var deci = "."; }
	var numNeg = 0;
	if (number.match(/^-/)) {
		numNeg = 1; number = number.replace(/^-/,"");
	}
	var numdp = number.split("."); // Not input decimal symbol - this is from the js stuff
	if (numdp.length == 2) {
		var decimal = numdp[1];
	}
	var integer = numdp[0];
	if (integer.length < 4) {
		if (numdp.length == 2)  { number = integer + deci + decimal; }
		if (numNeg == 1) { number = "-" + number; }
		return(number);
	}
	var stubFrnt = integer.length % 3;
	if (stubFrnt == 0) {stubFrnt = 3;}
	var newnumber = integer.substr(0,stubFrnt);
	var oldPos = stubFrnt;
	while(oldPos < integer.length ) {
		newnumber = newnumber + comma + integer.substr(oldPos, 3);
		oldPos = oldPos + 3;
	}
	if (numdp.length == 2) {
		newnumber = newnumber + deci + decimal;
	}
	if (numNeg == 1) { newnumber = "-" + newnumber; }
	return(newnumber);
}
//                                                                                line eater fodder