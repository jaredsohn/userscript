// version 1.01
// 17 Apr 2006
// Copyright (c) 2006, Netdevil
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name OgameAlianzas
// @author Modificado: por LordMokuba
// @description  muestra aliados (azul) y enemigos (rojos) en el panel de galaxia, variable size of debris field icon and adds arrival time to flights overview.
// #namespace http://www.acordero.org/ Por Actualizar
// @include     http://ogame*.de/game/galaxy.php*
// @include     http://ogame*.de/game/overview.php*
// ==/UserScript==

(function(){

//----- Edit these values, each alliance should be between pipes ("|")

var enemy_alliances = '|MAFI0S0S|,|.MCN.|,|Atreides|';
var allied_alliances = '|L.S.M|,|Beta|,|D.I|';

var minDebris = 20000;
var maxDebris = 300000;
var megaDebris = 1000000;

//------------------------------------------------------------------------

function LZ(x) {return(x<0||x>9?"":"0")+x}

	if (document.location.href.indexOf("/game/galaxy.php")>=0) {

		// Color alliances in galaxy panel

		var alianza;
		var alianzas = document.evaluate (
				"//center/table/tbody/tr/th[@width='80']/a",
				document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for ( i = 0 ; i < alianzas.snapshotLength; i++){
			alianza = alianzas.snapshotItem(i).textContent.replace(/^\s*|\s*$/g,"");
			if (enemy_alliances.indexOf("|"+alianza+"|") != -1) {
				alianzas.snapshotItem(i).style.color = "rgb(255,128,128)";
				}
			else if (allied_alliances.indexOf("|"+alianza+"|") != -1) {
				alianzas.snapshotItem(i).style.color = "rgb(128,128,255)";
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
	}
})();


