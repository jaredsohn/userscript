// JavaScript Document
// ==UserScript==
// @name           Ikariam Solarium 2.1
// @autor          Paolo19JD
// @e-mail         ikariam_paolo@yahoo.it
// @description    Effect of day and night on cities and islands.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// ---- Version 2.1 ---- 

var Horalocal = new Date();
var hora = Horalocal.getHours()

function Noche(css) {

if ( hora >= 21 && hora <= 24 || hora >= 0 && hora <= 5 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}
}

function Amanecer(css) {

if ( hora >= 6 && hora <=  9 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);};
}

function Atardecer(css) {

if ( hora >= 18 && hora < 21 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);};
}

// ---------- NOCHE -----------

//--------------------------------terrenos--------------------------------
Noche('#city #container .phase1 {    background-image:url(http://solarium.pezmc.com/Night/city_phase1.jpg);}');
Noche('#city #container .phase2, #city #container .phase3 {    background-image:url(http://solarium.pezmc.com/Night/city_phase2.jpg);}');
Noche('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url(http://solarium.pezmc.com/Night/city_phase3.jpg);});}');
Noche('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url(http://solarium.pezmc.com/Night/city_phase4.jpg);}');
Noche('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url(http://solarium.pezmc.com/Night/city_phase5.jpg);}');
Noche('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url(http://solarium.pezmc.com/Night/city_phase6.jpg);}');
Noche('#city #container .phase16, #city #container .phase17 {    background-image:url(http://solarium.pezmc.com/Night/city_phase7.jpg);}');
Noche('#city #container .phase18, #city #container .phase19 {    background-image:url(http://solarium.pezmc.com/Night/city_phase7.jpg);}');
Noche('#city #container .phase20 {    background-image:url(http://solarium.pezmc.com/Night/city_phase8.jpg);}');

//-----------------------------------edificios--------------------------------

Noche('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://solarium.pezmc.com/Night/building_shipyard.gif);	}'       );
Noche('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url(http://solarium.pezmc.com/Night/building_museum.gif);	}');
Noche('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://solarium.pezmc.com/Night/building_warehouse.gif);	}');
Noche('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://solarium.pezmc.com/Night/building_wall.gif);	}');
Noche('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url(http://solarium.pezmc.com/Night/building_tavern.gif);	}');
Noche('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://solarium.pezmc.com/Night/building_palace.gif);	}');
Noche('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://solarium.pezmc.com/Night/building_academy.gif);	}');
Noche('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url(http://solarium.pezmc.com/Night/building_workshop.gif);}');
Noche('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://solarium.pezmc.com/Night/building_safehouse.gif);	}');
Noche('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://solarium.pezmc.com/Night/building_branchOffice.gif);}');
Noche('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://solarium.pezmc.com/Night/building_embassy.gif);	}');
Noche('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://solarium.pezmc.com/Night/building_palaceColony.gif);	}');
Noche('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://solarium.pezmc.com/Night/building_townhall.gif);	}');
Noche('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://solarium.pezmc.com/Night/building_barracks.gif);	}');
Noche('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://solarium.pezmc.com/Night/building_port.gif);	}');
Noche('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://solarium.pezmc.com/Night/constructionSite.gif);	}');

//----- banderas ----

Noche('#city #container #mainview #locations .land .flag {	background-image:url(http://solarium.pezmc.com/Night/flag_red.gif);	}');
Noche('#city #container #mainview #locations .shore .flag {	background-image:url(http://solarium.pezmc.com/Night/flag_blue.gif);	}');
Noche('#city #container #mainview #locations .wall .flag {	background-image:url(http://solarium.pezmc.com/Night/flag_yellow.gif);	}');

Noche('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url(http://solarium.pezmc.com/Night/flag_yellow.gif); width:29px; height:40px; }');

//----------ISLAS NOCHE--------

Noche('#island #container #mainview {padding:0;height:440px;background-image:url(http://solarium.pezmc.com/Night/Isla_Night/bg_island.jpg);}');

//--ciudades en rojo----

Noche('#island #container #mainview #cities .level1 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_1_red.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.cityimg,#island #container #mainview #cities .level3 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_2_red.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.cityimg,#island #container #mainview #cities .level5 div.cityimg,#island #container #mainview #cities .level6 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_3_red.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.cityimg,#island #container #mainview #cities .level8 div.cityimg,#island #container #mainview #cities .level9 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_4_red.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_5_red.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_6_red.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.cityimg,#island #container #mainview #cities .level17 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_7_red.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_8_red.gif) no-repeat 2px 4px;}');

//--- ciudades en azul----

Noche('#island #container #mainview #cities .level1 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_1_blue.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.ownCityImg,#island #container #mainview #cities .level3 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_2_blue.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.ownCityImg,#island #container #mainview #cities .level5 div.ownCityImg,#island #container #mainview #cities .level6 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_3_blue.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.ownCityImg,#island #container #mainview #cities .level8 div.ownCityImg,#island #container #mainview #cities .level9 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_4_blue.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.ownCityImg,#island #container #mainview #cities .level11 div.ownCityImg,#island #container #mainview #cities .level12 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_5_blue.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_6_blue.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.ownCityImg,#island #container #mainview #cities .level17 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_7_blue.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.ownCityImg,#island #container #mainview #cities .level19 div.ownCityImg,#island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_8_blue.gif) no-repeat 2px 4px;}');

//--- ciudades en verde

Noche('#island #container #mainview #cities .level1 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_1_green.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.allyCityImg,#island #container #mainview #cities .level3 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_2_green.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.allyCityImg,#island #container #mainview #cities .level5 div.allyCityImg,#island #container #mainview #cities .level6 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_3_green.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.allyCityImg,#island #container #mainview #cities .level8 div.allyCityImg,#island #container #mainview #cities .level9 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_4_green.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_5_green.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_6_green.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.allyCityImg,#island #container #mainview #cities .level17 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_7_green.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg {background:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_8_green.gif) no-repeat 2px 4px;}');
Noche('#island #container #mainview #cities .city .buildCityImg { display:block; position:absolute; left:0px; bottom:0px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_constr.gif); width:64px; height:63px;}');

//---maravillas----

Noche('#island #container #mainview #islandfeatures .wonder1 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder1_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder2 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder2_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder3 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder3_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder4 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder4_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder5 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder5_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder6 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder6_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder7 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder7_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder8 { background-image:url(http://solarium.pezmc.com/Night/Isla_Night/maravillas_Night/wonder8_large.gif); }');

//---- recursos ----

Noche('#island #container #mainview #islandfeatures .marble a {	width:60px; height:63px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/recursos_Night/resource_marble.gif);	}');
Noche('#island #container #mainview #islandfeatures .wood a {	width:45px; height:41px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/recursos_Night/resource_wood.gif);	}');
Noche('#island #container #mainview #islandfeatures .wine a {	width:93px; height:48px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/recursos_Night/resource_wine.gif);	}');
Noche('#island #container #mainview #islandfeatures .crystal a {	width:56px; height:43px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/recursos_Night/resource_glass.gif);	}');
Noche('#island #container #mainview #islandfeatures .sulfur a {	width:78px; height:46px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/recursos_Night/resource_sulfur.gif);	}');

//--- seleccionar---

Noche('#island #container #mainview #cities .selectimg { position:absolute; top:18px; left:-7px; background-image:url(http://solarium.pezmc.com/Night/Isla_Night/select_city.gif); width:81px; height:55px; }');
Noche('#header {position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(http://solarium.pezmc.com/Night/bg_header.jpg) no-repeat;}');

//------ MUNDO --------

Noche('#worldmap_iso #worldmap .ocean1{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean01.gif);}');
Noche('#worldmap_iso #worldmap .ocean2{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean02.gif);}');
Noche('#worldmap_iso #worldmap .ocean3{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean03.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature1{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean_feature01.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature2{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean_feature02.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature3{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean_feature03.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature4{	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_ocean_feature04.gif);}');

Noche('#worldmap_iso #worldmap .island1 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island01.gif);}');
Noche('#worldmap_iso #worldmap .island2 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island02.gif);}');
Noche('#worldmap_iso #worldmap .island3 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island03.gif);}');
Noche('#worldmap_iso #worldmap .island4 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island04.gif);}');
Noche('#worldmap_iso #worldmap .island5 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island05.gif);}');
Noche('#worldmap_iso #worldmap .island6 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island06.gif);}');
Noche('#worldmap_iso #worldmap .island7 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island07.gif);}');
Noche('#worldmap_iso #worldmap .island8 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island08.gif);}');
Noche('#worldmap_iso #worldmap .island9 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island09.gif);}');
Noche('#worldmap_iso #worldmap .island10 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/tile_island10.gif);}');

Noche('#worldmap_iso #worldmap .wonder1 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder1.gif);	width:38px;	height:53px;}');
Noche('#worldmap_iso #worldmap .wonder2 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder2.gif);	width:37px;	height:66px;}');
Noche('#worldmap_iso #worldmap .wonder3 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder3.gif);	width:37px;	height:48px;}');
Noche('#worldmap_iso #worldmap .wonder4 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder4.gif);	width:33px;	height:77px;}');
Noche('#worldmap_iso #worldmap .wonder5 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder5.gif);	width:38px;	height:49px;}');
Noche('#worldmap_iso #worldmap .wonder6 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder6.gif);	width:28px;	height:51px;}');
Noche('#worldmap_iso #worldmap .wonder7 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder7.gif);	width:37px;	height:70px;}');
Noche('#worldmap_iso #worldmap .wonder8 {	background-image:url(http://solarium.pezmc.com/Night/mundo_Night/wonder8.gif);	width:27px;	height:70px;}');

//---- AMANECER -----

//--------------------------------terrenos--------------------------------

Amanecer('#city #container .phase1 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase1.jpg);}');
Amanecer('#city #container .phase2, #city #container .phase3 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase2.jpg);}');
Amanecer('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase3.jpg);});}');
Amanecer('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase4.jpg);}');
Amanecer('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase5.jpg);}');
Amanecer('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase6.jpg);}');
Amanecer('#city #container .phase16, #city #container .phase17 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase7.jpg);}');
Amanecer('#city #container .phase18, #city #container .phase19 {    background-image:url(http://solarium.pezmc.com/Sunrise/city_phase7.jpg);}');
Amanecer('#city #container .phase20 {    background-image:url(http://solarium.pezmc.com/Sunrise/city_phase8.jpg);}');

//-----------------------------------edificios--------------------------------

Amanecer('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://solarium.pezmc.com/Sunrise/building_shipyard.gif);	}'       );
Amanecer('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url(http://solarium.pezmc.com/Sunrise/building_museum.gif);	}');
Amanecer('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://solarium.pezmc.com/Sunrise/building_warehouse.gif);	}');
Amanecer('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://solarium.pezmc.com/Sunrise/building_wall.gif);	}');
Amanecer('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url(http://solarium.pezmc.com/Sunrise/building_tavern.gif);	}');
Amanecer('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://solarium.pezmc.com/Sunrise/building_palace.gif);	}');
Amanecer('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://solarium.pezmc.com/Sunrise/building_academy.gif);	}');
Amanecer('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url(http://solarium.pezmc.com/Sunrise/building_workshop.gif);}');
Amanecer('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://solarium.pezmc.com/Sunrise/building_safehouse.gif);	}');
Amanecer('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://solarium.pezmc.com/Sunrise/building_branchOffice.gif);}');
Amanecer('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://solarium.pezmc.com/Sunrise/building_embassy.gif);	}');
Amanecer('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://solarium.pezmc.com/Sunrise/building_palaceColony.gif);	}');
Amanecer('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://solarium.pezmc.com/Sunrise/building_townhall.gif);	}');
Amanecer('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://solarium.pezmc.com/Sunrise/building_barracks.gif);	}');
Amanecer('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://solarium.pezmc.com/Sunrise/building_port.gif);	}');
Amanecer('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://solarium.pezmc.com/Sunrise/constructionSite.gif);	}');

//----- banderas ----

Amanecer('#city #container #mainview #locations .land .flag {	background-image:url(http://solarium.pezmc.com/Sunrise/flag_red.gif);	}');
Amanecer('#city #container #mainview #locations .shore .flag {	background-image:url(http://solarium.pezmc.com/Sunrise/flag_blue.gif);	}');
Amanecer('#city #container #mainview #locations .wall .flag {	background-image:url(http://solarium.pezmc.com/Sunrise/flag_yellow.gif);	}');

Amanecer('#island #container #mainview {padding:0;height:440px;background-image:url(http://solarium.pezmc.com/Sunrise/bg_island.jpg);}');

//----- ATARDECER ---------

//--------------------------------terrenos--------------------------------
Atardecer('#city #container .phase1 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase1.jpg);}');
Atardecer('#city #container .phase2, #city #container .phase3 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase2.jpg);}');
Atardecer('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase3.jpg);});}');
Atardecer('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase4.jpg);}');
Atardecer('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase5.jpg);}');
Atardecer('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase6.jpg);}');
Atardecer('#city #container .phase16, #city #container .phase17 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase7.jpg);}');
Atardecer('#city #container .phase18, #city #container .phase19 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase7.jpg);}');
Atardecer('#city #container .phase20 {    background-image:url(http://solarium.pezmc.com/Sunset/city_phase8.jpg);}');

//-----------------------------------edificios--------------------------------

Atardecer('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://solarium.pezmc.com/Sunset/building_shipyard.gif);	}'       );
Atardecer('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url(http://solarium.pezmc.com/Sunset/building_museum.gif);	}');
Atardecer('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://solarium.pezmc.com/Sunset/building_warehouse.gif);	}');
Atardecer('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://solarium.pezmc.com/Sunset/building_wall.gif);	}');
Atardecer('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url(http://solarium.pezmc.com/Sunset/building_tavern.gif);	}');
Atardecer('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://solarium.pezmc.com/Sunset/building_palace.gif);	}');
Atardecer('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://solarium.pezmc.com/Sunset/building_academy.gif);	}');
Atardecer('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url(http://solarium.pezmc.com/Sunset/building_workshop.gif);}');
Atardecer('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://solarium.pezmc.com/Sunset/building_safehouse.gif);	}');
Atardecer('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://solarium.pezmc.com/Sunset/building_branchOffice.gif);}');
Atardecer('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://solarium.pezmc.com/Sunset/building_embassy.gif);	}');
Atardecer('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://solarium.pezmc.com/Sunset/building_palaceColony.gif);	}');
Atardecer('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://solarium.pezmc.com/Sunset/building_townhall.gif);	}');
Atardecer('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://solarium.pezmc.com/Sunset/building_barracks.gif);	}');
Atardecer('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://solarium.pezmc.com/Sunset/building_port.gif);	}');
Atardecer('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://solarium.pezmc.com/Sunset/constructionSite.gif);	}');

//----- banderas ----

Atardecer('#city #container #mainview #locations .land .flag {	background-image:url(http://solarium.pezmc.com/Sunset/flag_red.gif);	}');
Atardecer('#city #container #mainview #locations .shore .flag {	background-image:url(http://solarium.pezmc.com/Sunset/flag_blue.gif);	}');
Atardecer('#city #container #mainview #locations .wall .flag {	background-image:url(http://solarium.pezmc.com/Sunset/flag_yellow.gif);	}');
Atardecer('#island #container #mainview {padding:0;height:440px;background-image:url(http://solarium.pezmc.com/Sunset/bg_island.jpg);}');
