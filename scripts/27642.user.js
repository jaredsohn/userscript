// JavaScript Document
// ==UserScript==
// @name           Ikariam Animator v0.0.4a
// @autor          Angelo Verona alias Anilo, Givelin
// @email          anilo4ever@gmail.com
// @namespace      Ikariam
// @description    Animated graphic pack for Ikariam v.0.2.0
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
//File://D:/Documents and Settings/Levente.OTTHON/Asztal/Izék/Ikariam/city_phase6.gif
}
//--------------------------------0.0.3---0.0.4a--------------------------------
/*
addAnimStyle('#city #container .phase1 {    background-image:url(Http://bgt-angels.sk/TW/city_phase1.gif);}');
addAnimStyle('#city #container .phase2, #city #container .phase3 {    background-image:url(Http://bgt-angels.sk/TW/city_phase2.gif);}');
addAnimStyle('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url(Http://bgt-angels.sk/TW/city_phase3.gif);});}');
addAnimStyle('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url(Http://bgt-angels.sk/TW/city_phase4.gif);}');
addAnimStyle('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url(Http://bgt-angels.sk/TW/city_phase5.gif);}');
addAnimStyle('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url(Http://bgt-angels.sk/TW/city_phase6.gif);}');
*/
//-diplomat
//addAnimStyle('#advisors #advDiplomacy a.normal {	background-image:url(Http://bgt-angels.sk/TW/diplomat.gif);	}');
addAnimStyle('#container ul.resources .wood {	background-image:url(Http://bgt-angels.sk/TW/icon_wood.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .marble {	background-image:url(Http://bgt-angels.sk/TW/icon_marble.gif);	background-position:2px 2px;	}');
addAnimStyle('#container ul.resources .wine { 	background-image:url(Http://bgt-angels.sk/TW/icon_wine.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .glass {	background-image:url(Http://bgt-angels.sk/TW/icon_glass.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .sulfur {	background-image:url(Http://bgt-angels.sk/TW/icon_sulfur.gif);	background-position:2px 2px;	}');

/*
//-----------------------------------0.0.2--------------------------------
addAnimStyle('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(Http://bgt-angels.sk/TW/building_barracks.gif);	}');
addAnimStyle('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(Http://bgt-angels.sk/TW/building_palace.gif);	}');
addAnimStyle('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(Http://bgt-angels.sk/TW/building_safehouse.gif);	}');
addAnimStyle('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(Http://bgt-angels.sk/TW/building_embassy.gif);	}');
addAnimStyle('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(Http://bgt-angels.sk/TW/building_academy.gif);	}');
//-mayor
addAnimStyle('#advisors #advCities a.normal { background-image:url(Http://bgt-angels.sk/TW/mayor.gif); }');
//-----------------------------------0.0.1--------------------------------
addAnimStyle('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(Http://bgt-angels.sk/TW/building_port.gif);	}');
addAnimStyle('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(Http://bgt-angels.sk/TW/building_townhall.gif);	}');
addAnimStyle('#city #container #mainview #locations .land .flag {	background-image:url(Http://bgt-angels.sk/TW/flag_red.gif);	}');
addAnimStyle('#city #container #mainview #locations .shore .flag {	background-image:url(Http://bgt-angels.sk/TW/flag_blue.gif);	}');
addAnimStyle('#city #container #mainview #locations .wall .flag {	background-image:url(Http://bgt-angels.sk/TW/flag_yellow.gif);	}');
*/