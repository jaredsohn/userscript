// ==UserScript==
// @name            Ikariam Theme - Animated Ikariam
// @description     Animates many of the images in Ikariam
// @namespace       IkariamTheme2
// @include         http://s*.ikariam.*/*?*
// @include         http://*.ikariam.*/index.php
// @include         http://*ikariam.*/
// @author          Anilo
//
// @resource        skin/img/city/building_academy.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/academy.gif
// @resource        skin/img/city/building_barracks.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/barracks.gif
// @resource        skin/img/city/building_branchOffice.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/marketplace.gif
// @resource        skin/img/city/building_embassy.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/embassy.gif
// @resource        skin/img/city/building_museum.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/museum.gif
// @resource        skin/img/city/building_palace.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/pallace.gif
// @resource        skin/img/city/building_palaceColony.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/gouvernor.gif
// @resource        skin/img/city/building_port.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/building_port.gif
// @resource        skin/img/city/building_safehouse.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/building_safehouse.gif
// @resource        skin/img/city/building_tavern.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/building_tavern2.gif
// @resource        skin/img/city/building_townhall.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/building_townhall.gif
// @resource        skin/img/city/building_workshop.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/building_workshop.gif
// @resource        skin/img/city/city_level1.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/city_phase1.gif
// @resource        skin/img/city/city_level2.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/city_phase2.gif
// @resource        skin/img/city/city_level3.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/city_phase3.gif
// @resource        skin/img/city/city_level4.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/city_phase4.gif
// @resource        skin/img/city/city_level5.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/city_phase5.gif
// @resource        skin/img/city/flag_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/flag_blue.gif
// @resource        skin/img/city/flag_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/flag_red.gif
// @resource        skin/img/island/city_1_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_1_blue.gif
// @resource        skin/img/island/city_1_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_1_green.gif
// @resource        skin/img/island/city_1_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_1_red.gif
// @resource        skin/img/island/city_2_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_2_blue.gif
// @resource        skin/img/island/city_2_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_2_green.gif
// @resource        skin/img/island/city_2_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_2_red.gif
// @resource        skin/img/island/city_3_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_3_blue.gif
// @resource        skin/img/island/city_3_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_3_green.gif
// @resource        skin/img/island/city_3_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_3_red.gif
// @resource        skin/img/island/city_4_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_4_blue.gif
// @resource        skin/img/island/city_4_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_4_green.gif
// @resource        skin/img/island/city_4_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_4_red.gif
// @resource        skin/img/island/city_5_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_5_blue.gif
// @resource        skin/img/island/city_5_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_5_green.gif
// @resource        skin/img/island/city_5_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_5_red.gif
// @resource        skin/img/island/city_6_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_6_blue.gif
// @resource        skin/img/island/city_6_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_6_green.gif
// @resource        skin/img/island/city_6_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_6_red.gif
// @resource        skin/img/island/city_7_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_7_blue.gif
// @resource        skin/img/island/city_7_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_7_green.gif
// @resource        skin/img/island/city_7_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_7_red.gif
// @resource        skin/img/island/city_8_blue.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_8_blue.gif
// @resource        skin/img/island/city_8_green.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_8_green.gif
// @resource        skin/img/island/city_8_red.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/city_8_red.gif
// @resource        skin/img/island/flag_yellow.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/flag_yellow.gif
// @resource        skin/img/island/select_city.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/select_city.gif
// @resource        skin/img/worldmap/pfeil.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/select_island.gif
// @resource        skin/layout/advisors/diplomat.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/diplomat.gif
// @resource        skin/layout/advisors/mayor.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/mayor.gif
// @resource        skin/layout/bg_header.jpg http://lh4.ggpht.com/_1Nek0ZarHrk/StNhJK8s8hI/AAAAAAAAACc/Rt_GBTWIlX4/header_bg.jpg
// @resource        skin/layout/btn_gold.jpg http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated%20Ikariam/btn_treasure-1.gif
// @resource        skin/resources/icon_glass.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/icon_glass.gif
// @resource        skin/resources/icon_marble.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/icon_marble.gif
// @resource        skin/resources/icon_sulfur.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/icon_sulfur.gif
// @resource        skin/resources/icon_wine.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/icon_wine.gif
// @resource        skin/resources/icon_wood.gif http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/Animated Ikariam/icon_wood.gif
//
// ==/UserScript==

var css = [];

function replaceResourceIcons() {
	if(typeof(id) != 'undefined')
		var elems = document.getElementById(id).getElementsByTagName('img')
	else
		var elems = document.getElementsByTagName('img');	
	for(var i = 0; i < elems.length; i++) {
		if(elems[i].src.match(/wine/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wine.gif') + '';
		if(elems[i].src.match(/marble/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_marble.gif') + '';
		if(elems[i].src.match(/glass/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_glass.gif') + '';
		if(elems[i].src.match(/sulfur/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_sulfur.gif') + '';
		if(elems[i].src.match(/wood/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wood.gif') + '';
	}
	
}

//--------------------------- Login Page ---------------------------
if(document.getElementById('loginForm')) {
	
	
	
	
	
	
	
	
	var elems = document.getElementById('text').getElementsByTagName('img');
	for(var i = 0; i < elems.length; i++) {
		
		
	}
} else if(document.getElementById('GF_toolbar')) {
	//--------------------------- Layout -----------------------------
	css.push('#header { background:url(' + GM_getResourceURL('skin/layout/bg_header.jpg') + ') no-repeat; }');
	
	
	
	
	
	css.push('#globalResources .gold a { background-image:url(' + GM_getResourceURL('skin/layout/btn_gold.jpg') + '); }');
	css.push('#globalResources .gold a:hover { background-image:url(' + GM_getResourceURL('skin/layout/btn_gold.jpg') + '); }');
	css.push('#globalResources .gold a:down { background-image:url(' + GM_getResourceURL('skin/layout/btn_gold.jpg') + '); }');
	
	
	
	
	css.push('#container ul.resources .wood { background-image:url(' + GM_getResourceURL('skin/resources/icon_wood.gif') + '); }');
	css.push('#container ul.resources .marble { background-image:url(' + GM_getResourceURL('skin/resources/icon_marble.gif') + '); }');
	css.push('#container ul.resources .wine { background-image:url(' + GM_getResourceURL('skin/resources/icon_wine.gif') + '); }');
	css.push('#container ul.resources .glass { background-image:url(' + GM_getResourceURL('skin/resources/icon_glass.gif') + '); }');
	css.push('#container ul.resources .sulfur { background-image:url(' + GM_getResourceURL('skin/resources/icon_sulfur.gif') + '); }');
	
	//--------------------------- Advisers -----------------------------
	css.push('#advisors #advCities a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/mayor.gif') + '); }');
	
	
	
	
	
	
	css.push('#advisors #advDiplomacy a.normal { background-image:url(' + GM_getResourceURL('skin/layout/advisors/diplomat.gif') + '); }');
	
	
	switch(document.body.id) {
		case 'branchOffice':
			replaceResourceIcons('mainview');
			break;	
		case 'city':	//------------ City View ---------------
			css.push('#city #container .phase1 { background-image:url(' + GM_getResourceURL('skin/img/city/city_level1.jpg') + '); } ');
			css.push('#city #container .phase2 { background-image:url(' + GM_getResourceURL('skin/img/city/city_level2.jpg') + '); } ');
			css.push('#city #container .phase3 { background-image:url(' + GM_getResourceURL('skin/img/city/city_level3.jpg') + '); } ');
			css.push('#city #container .phase4 { background-image:url(' + GM_getResourceURL('skin/img/city/city_level4.jpg') + '); } ');
			css.push('#city #container .phase5 { background-image:url(' + GM_getResourceURL('skin/img/city/city_level5.jpg') + '); } ');
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			css.push('#city #container #mainview #locations .academy  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_academy.gif') + '); } ');
			
			
			css.push('#city #container #mainview #locations .barracks  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_barracks.gif') + '); } ');
			css.push('#city #container #mainview #locations .branchOffice  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_branchOffice.gif') + '); } ');
			
			css.push('#city #container #mainview #locations .embassy  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_embassy.gif') + '); } ');
			
			
			
			css.push('#city #container #mainview #locations .museum  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_museum.gif') + '); } ');
			
			css.push('#city #container #mainview #locations .palace  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_palace.gif') + '); } ');
			css.push('#city #container #mainview #locations .palaceColony  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_palaceColony.gif') + '); } ');
			css.push('#city #container #mainview #locations .port  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_port.gif') + '); } ');
			css.push('#city #container #mainview #locations .safehouse  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_safehouse.gif') + '); } ');
			
			
			
			css.push('#city #container #mainview #locations .tavern  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_tavern.gif') + '); } ');
			css.push('#city #container #mainview #locations .townHall  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_townhall.gif') + '); } ');
			
			
			
			
			css.push('#city #container #mainview #locations .workshop  .buildingimg { background-image:url(' + GM_getResourceURL('skin/img/city/building_workshop.gif') + '); } ');
			css.push('#city #container #mainview #locations .land .flag { background-image:url(' + GM_getResourceURL('skin/img/city/flag_red.gif') + '); } ');
			css.push('#city #container #mainview #locations .shore .flag { background-image:url(' + GM_getResourceURL('skin/img/city/flag_blue.gif') + '); } ');
			css.push('#city #container #mainview #locations .wall .flag { background-image:url(' + GM_getResourceURL('skin/img/island/flag_yellow.gif') + '); } ');
			break;
		case 'island':
			css.push('#island #container #mainview #cities .selectimg { background-image:url(' + GM_getResourceURL('skin/img/island/select_city.gif') + '); } ');
			css.push('#island #container #mainview #cities .buildplace .claim { background-image:url(' + GM_getResourceURL('skin/img/island/flag_yellow.gif') + '); } ');
			css.push('#island #container #mainview #cities .level1 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_1_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_2_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_3_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_4_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_5_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level13 div.ownCityImg, #island #container #mainview #cities .level14 div.ownCityImg, #island #container #mainview #cities .level15 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_6_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_7_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg, #island #container #mainview #cities .level21 div.ownCityImg, #island #container #mainview #cities .level22 div.ownCityImg, #island #container #mainview #cities .level23 div.ownCityImg, #island #container #mainview #cities .level24 div.ownCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_8_blue.gif') + '); } ');
			css.push('#island #container #mainview #cities .level1 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_1_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_2_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_3_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_4_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level10 div.cityimg, #island #container #mainview #cities .level11 div.cityimg, #island #container #mainview #cities .level12 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_5_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level13 div.cityimg, #island #container #mainview #cities .level14 div.cityimg, #island #container #mainview #cities .level15 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_6_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level16 div.cityimg, #island #container #mainview #cities .level17 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_7_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level18 div.cityimg, #island #container #mainview #cities .level19 div.cityimg, #island #container #mainview #cities .level20 div.cityimg, #island #container #mainview #cities .level21 div.cityimg, #island #container #mainview #cities .level22 div.cityimg, #island #container #mainview #cities .level23 div.cityimg, #island #container #mainview #cities .level24 div.cityimg { background-image:url(' + GM_getResourceURL('skin/img/island/city_8_red.gif') + '); } ');
			css.push('#island #container #mainview #cities .level1 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_1_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level2 div.allyCityImg, #island #container #mainview #cities .level3 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_2_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_3_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_4_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level10 div.allyCityImg, #island #container #mainview #cities .level11 div.allyCityImg, #island #container #mainview #cities .level12 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_5_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level13 div.allyCityImg, #island #container #mainview #cities .level14 div.allyCityImg, #island #container #mainview #cities .level15 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_6_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_7_green.gif') + '); } ');
			css.push('#island #container #mainview #cities .level18 div.allyCityImg, #island #container #mainview #cities .level19 div.allyCityImg, #island #container #mainview #cities .level20 div.allyCityImg, #island #container #mainview #cities .level21 div.allyCityImg, #island #container #mainview #cities .level22 div.allyCityImg, #island #container #mainview #cities .level23 div.allyCityImg, #island #container #mainview #cities .level24 div.allyCityImg { background-image:url(' + GM_getResourceURL('skin/img/island/city_8_green.gif') + '); } ');
			break;
		case 'resource':
			function updateImages() {
				var elems = document.getElementById('resiconcontainer').getElementsByTagName('img');	
				for(var i = 0; i < elems.length; i++) {
					if(elems[i].src.match(/wood/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wood.gif') + '';
				}
			}
			document.getElementById('inputWorkers').addEventListener('change', updateImages, false);
			document.getElementById('inputWorkers').addEventListener('keyup', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mousemove', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mouseup', updateImages, false);
			var elems = document.getElementById('sliderbg').parentNode.getElementsByTagName('a');
			for(var i = 0; i < elems.length; i++) {
				elems[i].addEventListener('mouseup', function() { setTimeout(updateImages, 50); }, true);
			}
			updateImages();
			var elems = document.getElementById('mainview').getElementsByTagName('img');
			for(var i = 0; i < elems.length; i++) {
				if(elems[i].src.match(/wood/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wood.gif') + '';
			}
			break;
		case 'tradegood':
			function updateImages() {
				var elems = document.getElementById('resiconcontainer').getElementsByTagName('img');	
				for(var i = 0; i < elems.length; i++) {
					if(elems[i].src.match(/wine/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wine.gif') + '';
					if(elems[i].src.match(/marble/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_marble.gif') + '';
					if(elems[i].src.match(/glass/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_glass.gif') + '';
					if(elems[i].src.match(/sulfur/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_sulfur.gif') + '';
				}
			}
			document.getElementById('inputWorkers').addEventListener('change', updateImages, false);
			document.getElementById('inputWorkers').addEventListener('keyup', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mousemove', updateImages, false);
			document.getElementById('sliderbg').addEventListener('mouseup', updateImages, false);
			var elems = document.getElementById('sliderbg').parentNode.getElementsByTagName('a');
			for(var i = 0; i < elems.length; i++) {
				elems[i].addEventListener('mouseup', function() { setTimeout(updateImages, 50); }, true);
			}
			updateImages();
			var elems = document.getElementById('mainview').getElementsByTagName('img');
			for(var i = 0; i < elems.length; i++) {
				if(elems[i].src.match(/wood/)) elems[i].src = '' + GM_getResourceURL('skin/resources/icon_wood.gif') + '';
			}
			break;
		case 'palace':
			replaceResourceIcons('mainview');
			break;	
		case 'palaceColony':
			replaceResourceIcons('mainview');
			break;
		case 'transport':
			css.push('.resourceAssign li.wood { background-image:url(' + GM_getResourceURL('skin/resources/icon_wood.gif') + ') !important; } ');
			css.push('.resourceAssign li.marble { background-image:url(' + GM_getResourceURL('skin/resources/icon_marble.gif') + ') !important; } ');
			css.push('.resourceAssign li.wine { background-image:url(' + GM_getResourceURL('skin/resources/icon_wine.gif') + ') !important; } ');
			css.push('.resourceAssign li.glass { background-image:url(' + GM_getResourceURL('skin/resources/icon_glass.gif') + ') !important; } ');
			css.push('.resourceAssign li.sulfur { background-image:url(' + GM_getResourceURL('skin/resources/icon_sulfur.gif') + ') !important; } ');
			break;
		case 'warehouse':
			replaceResourceIcons();
			break;
		case 'worldmap_iso':
			css.push('#worldmap_iso #worldmap .tradegood1 { background-image:url(' + GM_getResourceURL('skin/resources/icon_wine.gif') + '); } ');
			css.push('#worldmap_iso #worldmap .tradegood2 { background-image:url(' + GM_getResourceURL('skin/resources/icon_marble.gif') + '); } ');
			css.push('#worldmap_iso #worldmap .tradegood3 { background-image:url(' + GM_getResourceURL('skin/resources/icon_glass.gif') + '); } ');
			css.push('#worldmap_iso #worldmap .tradegood4 { background-image:url(' + GM_getResourceURL('skin/resources/icon_sulfur.gif') + '); } ');
			css.push('#worldmap_iso #worldmap .islandMarked { background-image:url(' + GM_getResourceURL('skin/img/worldmap/pfeil.gif') + '); } ');
			break;
		
	}
}	
css.push('#city #container #mainview #locations .tavern  .buildingimg { left:-10px; top:-37px; width:111px; height:84px; }    #city #container #mainview #locations .barracks .buildingimg {left:0px; top:-33px; width:100px; height:76px; }    #city #container #mainview #locations .palace .buildingimg {left:-10px; top:-42px; width:106px; height:97px; }    #city #container #mainview #locations .safehouse .buildingimg {left:5px; top:-15px; width:84px; height:58px; }    #city #container #mainview #locations .embassy .buildingimg {left:-5px; top:-31px; width:93px; height:85px; }    #city #container #mainview #locations .academy .buildingimg {left:-19px; top:-31px; width:123px; height:90px; }    #city #container #mainview #locations .port .buildingimg {left:-65px; top:-35px; width:163px; height:131px; }    #city #container #mainview #locations .townHall .buildingimg {left:-5px; top:-60px; width:104px; height:106px; }    #city #container #mainview #locations .workshop-army .buildingimg {left:-19px; top:-54px; width:106px; }    #city #container #mainview #locations .museum .buildingimg {left:-8px; top:-38px; width:133px; height:98px; }    #city #container #mainview #locations .branchOffice .buildingimg {left:-19px; top:-31px; width:120px; height:84px; }    #city #container #mainview #locations .palaceColony .buildingimg {left:-10px; top:-42px; width:109px; height:95px; }    #island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; width:29px; height:40px;}    #worldmap_iso #worldmap .islandMarked { position:absolute; bottom:65px; left:80px; width:73px; height:97px; }   #island #container #mainview #cities .selected div.selectimg {visibility:visible; z-index:-9999; }  #island #container #mainview #cities .selectimg {position:absolute; top:22px; left:-17px; width:99px; height:52px;}   #island .cityimg { z-index:10 !important; }');

GM_addStyle(css.join(''));

