// version 1.03
// 05 May 2006
// Copyright (c) 2006, Netdevil
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name OgameExtras
// @author Netdevil
// @description  Show colored alliances in galaxy panel, variable size of debris field icon, adds arrival time to flights overview and some other things.
// #namespace http://www.acordero.org/
// @include     http://ogame*.de/game/galaxy.php*
// @include     http://ogame*.de/game/overview.php*
// ==/UserScript==

// History:
//   1.03 - alliances with only one member are drawn in dark gray
//          alliances have border showing their position level
//          added constants for colors
//          removed galaxy table fixed width
//   1.02 - alliance checks now case insensitive
//          added several levels of alliance relations.
//   1.01 - Initial public version.

(function(){

//----- Edit this values, each alliance should be between pipes ("|")

// Regular expression value for alliance tooltips (default in Spanish)
var AllianceExpr = /Alianza (.+) en la posición ([0-9]+) con ([0-9]+) Miembro/;

// Debris icon size levels
var minDebris = 4000; 
var maxDebris = 100000; 
var megaDebris = 1000000; 

// Alliances alegiance coloring
var alliances_youralliance      = '';
var YourAllianceColor           = 'rgb(0,255,0)';

var alliances_mutualdefensepact = '';
var AlliancesMDPColor           = 'rgb(128,255,128)';

var alliances_nonagressionpact  = '';
var AlliancesNAPColor           = 'rgb(128,128,255)';

var alliances_freecommercepact  = '';
var AlliancesFCPColor           = 'rgb(255,255,0)';

var alliances_enemy             = '';
var AlliancesEnemyColor         = 'rgb(255,192,128)';

var alliances_war               = '';
var AlliancesWarColor           = 'rgb(255,0,0)';

var AlliancesNAPFCPColor        = 'rgb(152,255,152)';

var AlliancesSingleMemberColor  = 'rgb(96,96,96)';

// Alliances position levels (less is higher position)
var AlliancesPositionLowColor   = 'rgb(0,192,0)';
var AlliancesPositionLow        = 500;
var AlliancesPositionMediumColor= 'rgb(0,0,192)';
var AlliancesPositionHigh       = 100;
var AlliancesPositionHighColor  = 'rgb(192,0,0)';

//------------------------------------------------------------------------

function LZ(x) {return(x<0||x>9?"":"0")+x}

	if (document.location.href.indexOf("/game/galaxy.php")>=0) {

		// remove table fixed width
		
		var table = document.evaluate ("//table[@width='569']/@width",
				document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		if (table != null) {
			table.snapshotItem(0).value = "";
			}

		// Color alliances in galaxy panel

		var alianza;
		var PNA;
		var PLC;
		var color;
		var position;
		var members;
		var alianzas = document.evaluate (
				"//center/table/tbody/tr/th[@width='80']/a",
				document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for ( i = 0 ; i < alianzas.snapshotLength; i++){
			alianza = alianzas.snapshotItem(i).textContent.replace(/^\s*|\s*$/g,"");
			color = "";
			colorBorder = "";
			position = -1;
			members = -1;
			var omo = document.evaluate("./@onmouseover",alianzas.snapshotItem(i),null,
										XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			if (omo != null) {
				var omotext = omo.snapshotItem(0).textContent;
				var re = new RegExp(AllianceExpr);
				var mymatch = re.exec(omotext);
				if (mymatch != null) {						
					position = parseInt(mymatch[2]);
					members = parseInt(mymatch[3]);
					if (position >= AlliancesPositionLow) {
						colorBorder = AlliancesPositionLowColor;
						}
					else if (position <= AlliancesPositionHigh) {
						colorBorder = AlliancesPositionHighColor;
						}
					else {
						colorBorder = AlliancesPositionMediumColor;
						}
					}
				}

			if (members == 1) {
				color = AlliancesSingleMemberColor;
				}
			
			if (alliances_youralliance.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1) {
				color = YourAllianceColor;
				}
			else if (alliances_war.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1) {
				color = AlliancesWarColor;
				}
			else if (alliances_enemy.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1) {
				color = AlliancesEnemyColor;
				}
			else if (alliances_mutualdefensepact.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1) {
				color = AlliancesMDPColor;
				}
			else {
				PNA = (alliances_nonagressionpact.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1);
				PLC = (alliances_freecommercepact.toUpperCase().indexOf("|"+alianza.toUpperCase()+"|") != -1);
				if (PNA && PLC) {
					color = AlliancesNAPFCPColor;
					} 
				else if (PNA) {
					color = AlliancesNAPColor;
					} 
				else if (PLC) {
					color = AlliancesFCPColor;
					}
				}
			if (color!="") {
				alianzas.snapshotItem(i).style.color = color;
				}
			if (colorBorder != "") {
				alianzas.snapshotItem(i).style.border = "1px solid";
				alianzas.snapshotItem(i).style.borderColor = colorBorder;
				alianzas.snapshotItem(i).style.padding = "2px";
				}
			
			}

		// Adjust size of debris fields icon

		var debrisfield_title;
		var debrisfield_th;
		var debrisfield_split;
		var debrisfield_metal;
		var debrisfield_cristal;
		var debrisfield_mixed;
		var debrisImageWidth;
		var debrisfields = document.evaluate (
				"//center/table/tbody/tr/th[1]/a[2]/@title",
				document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for ( i = 0 ; i < debrisfields.snapshotLength; i++){
			debrisfield_title = debrisfields.snapshotItem(i).textContent.replace(/[\s.]/g,"");
			debrisfield_split = debrisfield_title.split(/[:,]/);
			debrisfield_metal = parseInt(debrisfield_split[2]);
			debrisfield_cristal = parseInt(debrisfield_split[4]);
			debrisfield_mixed = debrisfield_metal + debrisfield_cristal;			
			if (debrisfield_mixed<=minDebris) {
				imageDebrisHeight = 6;
			} else if (debrisfield_mixed>=maxDebris) {
				imageDebrisHeight = 30;
			} else {
				imageDebrisHeight = 6 + Math.round((debrisfield_mixed-minDebris)*(30-6)/(maxDebris-minDebris));
			}			
			if (debrisfield_mixed>=megaDebris) {
				imageDebrisWidth = 64;
			} else if (debrisfield_mixed>maxDebris) {
				imageDebrisWidth = 30 + Math.round((debrisfield_mixed-maxDebris)*(64-30)/(megaDebris-maxDebris));
			} else {
				imageDebrisWidth = imageDebrisHeight;
			}
			
			debrisfield_th = document.evaluate (
					"../../../th[5]/a/img",
					debrisfields.snapshotItem(i),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			debrisfield_th.snapshotItem(0).width=imageDebrisWidth;
			debrisfield_th.snapshotItem(0).height=imageDebrisHeight;
			}

		}
	else if	(document.location.href.indexOf("/game/overview.php")>=0) {

		// Add arrival time to flights overview (copied from HaMF)
		
		var v=new Date();
		for (var cn=1 ; cn<=unsafeWindow.anz ; cn++) {
			var bxx = document.getElementById ('bxx' + cn);
			timeleft = bxx.title * 1000;
			time = v.getTime();
			ar_time = new Date (time + timeleft);
			arrival = LZ(ar_time.getHours()) + ":" + LZ(ar_time.getMinutes()) + ":" + LZ(ar_time.getSeconds());
			var node = document.createElement ("th");
			var arrival = document.createTextNode (arrival);
			node.appendChild (arrival);
			bxx.parentNode.parentNode.appendChild(node);
			}
			
		}
})();
