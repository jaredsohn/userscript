// JavaScript Document
// ==UserScript==
// @name           Magyc Ikariam Animator v0.5.2 modifie v 5
// @autor          Angelo Verona alias Anilo, Givelin, Omegaboy,Magyc_victor
// @email          anilo4ever@gmail.com,webmaster@magyc.net
// @namespace      Ikariam
// @description    Animation Magyc pour Ikariam v.0.2.3
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*TEST VERSION, SLOW CODED ONLY FOR TESTING PURPOSE*/

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//*********
//addAnimStyle('');
//Http://www.bgt-angels.sk/TW/
//http://www.magyc.net/portal/



//********ajout de magyc_mrmcl
//scierie
addAnimStyle('#island #container #mainview #islandfeatures .wood a { top:-113px; right:-250px; width:71px; height:55px; background-image:url(Http://www.magyc.net/ikariam/images/forester1.gif)  }');


//wall
addAnimStyle('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-13px; width:720px; height:135px; background-image:url(Http://www.magyc.net/ikariam/images/building_wall4.gif);	}');


// 2 niveaux villes
addAnimStyle('#city #container .phase16, #city #container .phase17 {    background-image:url(Http://www.magyc.net/ikariam/images/city_phase7.gif);}');
addAnimStyle('#city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21 {    background-image:url(Http://www.magyc.net/ikariam/images/city_phase8.gif);}');


//--------------------------------0.5.2-----------------------------------
//(repaired bug of dispearing citis after page loadeded- THX to board.ikariam.it)
//---City 7 Start
addAnimStyle('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg { background:url(http://www.bgt-angels.sk/TW/city_7_blue.gif) no-repeat 4px 7px; }');
//---City 7 End
//---City 8 Start
addAnimStyle('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg, #island #container #mainview #cities .level21 div.ownCityImg, #island #container #mainview #cities .level22 div.ownCityImg, #island #container #mainview #cities .level23 div.ownCityImg, #island #container #mainview #cities .level24 div.ownCityImg { background:url(http://www.bgt-angels.sk/TW/city_8_blue.gif) no-repeat 2px 4px; }');
//---City 8 End

addAnimStyle('#worldmap_iso #worldmap .ownIslandMarked { /*	position:absolute; bottom:70px;	left:100px; width:39px;	height:60px; */	background:url(http://bgt-angels.sk/TW/border-island7.png) no-repeat top center; height:100%; width:100%; z-index:9; }');


addAnimStyle('#worldmap_iso #worldmap .tradegood1 { background-image:url(http://www.bgt-angels.sk/TW/icon_wine.gif); width:25px; height:25px; bottom:100px; left:50px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood2 { background-image:url(http://www.bgt-angels.sk/TW/icon_marble.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood3 { background-image:url(http://www.bgt-angels.sk/TW/icon_glass.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood4 { background-image:url(http://www.bgt-angels.sk/TW/icon_sulfur.gif); width:25px; height:25px; }');

//----------
//*********
//--------------------------------0.5---0.5c--------------------------------
//---City 1 Start
addAnimStyle('#island #container #mainview #cities .level1 div.ownCityImg { background:url(Http://www.bgt-angels.sk/TW/city_1_blue.gif) no-repeat 13px 10px; }');
addAnimStyle('#island #container #mainview #cities .level1 div.cityimg { background:url(Http://www.bgt-angels.sk/TW/city_1_red.gif) no-repeat 13px 10px; }');
//---City 1 End
//---City 2 Start
addAnimStyle('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg { background:url(Http://www.bgt-angels.sk/TW/city_2_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.allyCityImg { background:url(Http://www.bgt-angels.sk/TW/city_2_green.gif) no-repeat 17px 7px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg { background:url(Http://www.bgt-angels.sk/TW/city_2_red.gif) no-repeat 13px 13px; }');
//---City 2 End
//---City 3 Start
addAnimStyle('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg { background:url(Http://www.bgt-angels.sk/TW/city_3_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg { background:url(Http://www.bgt-angels.sk/TW/city_3_red.gif) no-repeat 13px 13px; }');
//---City 3 End
//---City 4 Start
addAnimStyle('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg { background:url(Http://www.bgt-angels.sk/TW/city_4_red.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg { background:url(Http://www.bgt-angels.sk/TW/city_4_green.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg { background:url(Http://www.bgt-angels.sk/TW/city_4_blue.gif) no-repeat 11px 13px; }');
//---City 4 End
//---City 5 Start
addAnimStyle('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url(Http://www.bgt-angels.sk/TW/city_5_red.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {	background:url(Http://www.bgt-angels.sk/TW/city_5_green.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg { background:url(Http://www.bgt-angels.sk/TW/city_5_blue.gif) no-repeat 8px 13px; }');
//---City 5 End
//---City 6 Start
addAnimStyle('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {	background:url(Http://www.bgt-angels.sk/TW/city_6_blue.gif) no-repeat 4px 7px;');

addAnimStyle('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {	background:url(Http://www.bgt-angels.sk/TW/city_6_red.gif) no-repeat 4px 7px;}');

addAnimStyle('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg { background:url(Http://www.bgt-angels.sk/TW/city_6_green.gif) no-repeat 4px 7px;');
//---City 6 End




addAnimStyle('#header {	position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(Http://www.bgt-angels.sk/TW/bg_header.jpg) no-repeat;}');


addAnimStyle('#island #container #mainview #cities .selectimg { position:absolute; top:22px; left:-17px; visibility:hidden;  background-image:url(Http://www.bgt-angels.sk/TW/select_city.gif); width:99px; height:52px; }');
addAnimStyle('#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:-9999;}');

addAnimStyle('#worldmap_iso #worldmap .islandMarked {  position:absolute; bottom:65px; left:80px; width:73px; height:97px; background-image:url(Http://www.bgt-angels.sk/TW/select_island.gif); z-index:2000; }');

addAnimStyle('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url(Http://www.bgt-angels.sk/TW/flag_green.gif); width:29px; height:40px; }');


//--------------------------------0.0.3---0.0.4a--------------------------------
addAnimStyle('#city #container .phase1 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase1.gif);}');
addAnimStyle('#city #container .phase2, #city #container .phase3 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase2.gif);}');
addAnimStyle('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase3.gif);});}');
addAnimStyle('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase4.gif);}');
addAnimStyle('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase5.gif);}');
addAnimStyle('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url(Http://www.bgt-angels.sk/TW/city_phase6.gif);}');


//-diplomat
addAnimStyle('#advisors #advDiplomacy a.normal {	background-image:url(Http://www.bgt-angels.sk/TW/diplomat.gif);	}');
addAnimStyle('#container ul.resources .wood {	background-image:url(Http://www.bgt-angels.sk/TW/icon_wood.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .marble {	background-image:url(Http://www.bgt-angels.sk/TW/icon_marble.gif);	background-position:2px 2px;	}');
addAnimStyle('#container ul.resources .wine { 	background-image:url(Http://www.bgt-angels.sk/TW/icon_wine.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .glass {	background-image:url(Http://www.bgt-angels.sk/TW/icon_glass.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .sulfur {	background-image:url(Http://www.bgt-angels.sk/TW/icon_sulfur.gif);	background-position:2px 2px;	}');

//-----------------------------------0.0.2--------------------------------
addAnimStyle('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(Http://www.bgt-angels.sk/TW/building_barracks.gif);	}');
addAnimStyle('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(Http://www.bgt-angels.sk/TW/building_palace.gif);	}');
addAnimStyle('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(Http://www.bgt-angels.sk/TW/building_safehouse.gif);	}');
addAnimStyle('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(Http://www.bgt-angels.sk/TW/building_embassy.gif);	}');
addAnimStyle('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(Http://www.bgt-angels.sk/TW/building_academy.gif);	}');
//-mayor
addAnimStyle('#advisors #advCities a.normal { background-image:url(Http://www.bgt-angels.sk/TW/mayor.gif); }');
//-----------------------------------0.0.1--------------------------------
addAnimStyle('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(Http://www.bgt-angels.sk/TW/building_port.gif);	}');
addAnimStyle('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(Http://www.bgt-angels.sk/TW/building_townhall.gif);	}');
addAnimStyle('#city #container #mainview #locations .land .flag {	background-image:url(Http://www.bgt-angels.sk/TW/flag_red.gif);	}');
addAnimStyle('#city #container #mainview #locations .shore .flag {	background-image:url(Http://www.bgt-angels.sk/TW/flag_blue.gif);	}');
addAnimStyle('#city #container #mainview #locations .wall .flag {	background-image:url(Http://www.bgt-angels.sk/TW/flag_yellow.gif);	}');