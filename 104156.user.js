// ==UserScript==
// @name           reduire image planette
// @namespace      snaquekiller
// @description    reduit l'image de la planette
// @include        http://*.ogame.*/game/*
// ==/UserScript==


	var css = '#rechts .planet-name,.planet-name{font-size:10px;}'
			+'#rechts .planet-koords{font-size:9px;}'
			+'#myPlanets .planetPic{width:18%;top:4px;}'
			+'#rechts #myPlanets .smallplanet a.moonlink{top:23px;}'
			+'#rechts #myPlanets .smallplanet{height:40px;}'
			+'#countColonies{margin:-3px 0 7px;}';

		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
