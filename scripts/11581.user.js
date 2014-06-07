// ==UserScript==
// @name R4v3nExtractor
// @author Hddkiller


// @include http://r4v3n.com/modules/LinkGenerator/*
// @version 1.0
// @description  Ajoute un lien direct pour voir les videos
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr 
 */
 
 
 /// Allow right click
 try{ document.oncontextmenu = ejs_nodroit = function(a){return false;} }catch(E){}

function letsgo(){ 
	parseDivx();
}
function parseDivx(){
 	/// get DivxPlayer
	var noeux=document.evaluate("//object [@codebase='http://go.divx.com/plugin/DivXBrowserPlugin.cab']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//// Si player trouvé
	if(noeux.snapshotLength){
		player=noeux.snapshotItem(0);
		//// Parcours tous les <PARAM> du player
		playerParams = player.getElementsByTagName("PARAM");
		for (i=0;i<playerParams.length;i++){
			/// Si le param est SRC on a le lien
			if(playerParams[i].name=="src"){
				leLien = playerParams[i].value;
				/// Le lien doit contenir 'divx'
				if(leLien.indexOf("divx")!=-1){
					///// C'est tout bon
					playMovie(playerParams[i].value);
				}
			}
		}
	}	
}
function playMovie(theLink){	
	thebody = document.getElementsByTagName("BODY");
	thebody[0].innerHTML = '<a href='+theLink+' style="color:#0000FF;font-weight:normal;">'+theLink+'</a>';
	top.location=theLink;
}
///// Lanch Script
window.addEventListener('load', letsgo, false);