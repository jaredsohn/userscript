// ==UserScript==
// @name        ChaosScript
// @description Hesap Kitap işlerini Burada yapacaz.
// @include 	http://*.ogame.*
// @author      Hakan KÖSE - LastDeath
// @copyright   2010 Chaos Team
// @version     0.0.2
// @require http://sizzlemctwizzle.com/updater.php?id=84146&days=0
// ==/UserScript==
var prefix='cHaOsScript';
window.addEventListener('load', 
	function() { 
		menu();
	}
, true);
function menu(){
		AddMenuButton('cHaOs',AboutClickHandler);
		AddMenuButton('Maden',MadenHandler);
	}
function AddMenuButton(caption,clickFunction){
			var barDiv 	= document.getElementById('bar').getElementsByTagName('ul')[0];
			var buton  	= document.createElement('li');
			var link   	= document.createElement('a');
			var text	= document.createTextNode(caption);
				link.setAttribute("href", "#");
				link.setAttribute("class","ajax_thickbox");
				link.addEventListener("click", clickFunction, false);
				link.appendChild(text);
				buton.appendChild(link);
				barDiv.insertBefore(buton,barDiv.firstChild);
	}	
function AboutClickHandler(){
		alert('(c) 2010 cHaOs Team 0.0.1 \nLastDeath - cHaOs Team Technical Member');
	}	
function MadenHandler(){
	var	mainDiv 	= document.getElementById('inhalt');
	var mSpan		= document.createElement('span');
	var dvMain		= document.createElement('div');
	var	dvBaslik	= document.createElement('div');
	var	dvBaslikC	= document.createElement('div');
	var	dvIcerik	= document.createElement('div');
	var	dvAlt		= document.createElement('div');
	var	lnClose		= document.createElement('a');
		lnClose.setAttribute("href", "#");
		lnClose.setAttribute("class", "closeTB");
		//lnClose.setAttribute("onClick", "alert('silecem');");
		lnClose.innerHTML="<img width=\"16\" height=\"16\" src=\"img/layout/pixel.gif\">";
		dvMain.setAttribute("class","content-box-s");
		dvBaslik.setAttribute("class","header");
		dvBaslikC.setAttribute("class","textCenter");
		dvIcerik.setAttribute("class","content");
		dvAlt.setAttribute("class","footer");
		dvIcerik.innerHTML="Yakında Burada";
		dvBaslikC.innerHTML="<dv3>Filo Kalkış Hesap</dv3>";
		dvBaslikC.appendChild(lnClose);
		dvBaslik.appendChild(dvBaslikC);
		dvMain.appendChild(dvBaslik);
		dvMain.appendChild(dvIcerik);
		dvMain.appendChild(dvAlt);
		mSpan.appendChild(dvMain);
		mainDiv.appendChild(mSpan);
		//mainDiv.insertBefore(mSpan,mainDiv.firstChild);
}
	
	