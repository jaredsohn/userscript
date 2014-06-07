// ==UserScript==
// @name           Slim digimap roam
// @namespace      Anon1166
// @include        http://digimap.edina.ac.uk/osmapper/osmapper*
// ==/UserScript==

window.setTimeout(function () {
	//Maximise screen estate
	var north = document.getElementById('north');
	var south = document.getElementById('south');
	alert('Wait for the page to load, press enter and maximise the window.');
	north.parentNode.removeChild(north);
	south.parentNode.removeChild(south);
	window.resizeTo(screen.availWidth,screen.availHeight);
	window.moveTo(0,0);
	
	//add show	
	targetCell = document.getElementById('ext-gen933').previousSibling;
	targetCell.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;Hide:&nbsp;<a href="javascript:void(0)" onclick="document.getElementById(\'copyright\').style.display = \'none\';document.getElementById(\'OpenLayers.Control.ScaleLine_53\').style.display = \'none\';document.getElementById(\'OpenLayers.Control.PanZoomBar_29\').style.display = \'none\'">Overlays</a> - <a href="javascript:void(0)" onclick="document.getElementById(\'center_OpenLayers_Container\').style.display = \'none\'">Map Tiles</a> | Show: <a href="javascript:void(0)" onclick="document.getElementById(\'copyright\').style.display = \'\';document.getElementById(\'OpenLayers.Control.ScaleLine_53\').style.display = \'\';document.getElementById(\'OpenLayers.Control.PanZoomBar_29\').style.display = \'\'">Overlays</a> - <a href="javascript:void(0)" onclick="document.getElementById(\'center_OpenLayers_Container\').style.display = \'\'">Map Tiles</a>';
	
	center_OpenLayers_Container
	
							
}, 200);