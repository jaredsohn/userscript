// ==UserScript==
// @name           Terremoto!
// @autor          Palkavian, Blondie
// @email          pako.online@gmail.com
// @namespace      Ikariam
// @description    Effect of an earthquake on cities and islands
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//version 3.0

function earthQ(css)
{
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
//'+URL+'/
//*********
var URL= "http://pako.online.googlepages.com";

//-----------------------------------edificios--------------------------------
earthQ('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url('+URL+'/EQ_building_shipyard.gif);	}'       );
earthQ('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url('+URL+'/EQ_building_museum.gif);	}');
earthQ('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url('+URL+'/EQ_building_warehouse.gif);	}');
earthQ('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url('+URL+'/EQ_building_tavern.gif);	}');
earthQ('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url('+URL+'/EQ_building_palace.gif);	}');
earthQ('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url('+URL+'/EQ_building_academy.gif);	}');
earthQ('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url('+URL+'/EQ_building_workshop.gif);}');
earthQ('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url('+URL+'/EQ_building_safehouse.gif);	}');
earthQ('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url('+URL+'/EQ_building_branchOffice.gif);}');
earthQ('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url('+URL+'/EQ_building_embassy.gif);	}');
earthQ('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url('+URL+'/EQ_building_palaceColony.gif);	}');
earthQ('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url('+URL+'/EQ_building_townhall.gif);	}');
earthQ('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url('+URL+'/EQ_building_barracks.gif);	}');
earthQ('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url('+URL+'/EQ_building_port.gif);	}');


//----- banderas ----

earthQ('#city #container #mainview #locations .land .flag {	background-image:url('+URL+'/EQ_flag_red.gif);	}');
earthQ('#city #container #mainview #locations .shore .flag {	background-image:url('+URL+'/EQ_flag_blue.gif);	}');
earthQ('#city #container #mainview #locations .wall .flag {	background-image:url('+URL+'/EQ_flag_yellow.gif);	}');

earthQ('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'/EQ_flag_yellow.gif); width:29px; height:40px; }');

//--ciudades en rojo----

earthQ('#island #container #mainview #cities .level1 div.cityimg {background:url('+URL+'/EQ_city_1_red.gif) no-repeat 13px 10px;}');
earthQ('#island #container #mainview #cities .level2 div.cityimg,#island #container #mainview #cities .level3 div.cityimg {background:url('+URL+'/EQ_city_2_red.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level4 div.cityimg,#island #container #mainview #cities .level5 div.cityimg,#island #container #mainview #cities .level6 div.cityimg {background:url('+URL+'/EQ_city_3_red.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level7 div.cityimg,#island #container #mainview #cities .level8 div.cityimg,#island #container #mainview #cities .level9 div.cityimg {background:url('+URL+'/EQ_city_4_red.gif) no-repeat 11px 13px;}');
earthQ('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url('+URL+'/EQ_city_5_red.gif) no-repeat 8px 13px;}');
earthQ('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {background:url('+URL+'/EQ_city_6_red.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level16 div.cityimg,#island #container #mainview #cities .level17 div.cityimg {background:url('+URL+'/EQ_city_7_red.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg {background:url('+URL+'/EQ_city_8_red.gif) no-repeat 2px 4px;}');

//--- ciudades en azul----

earthQ('#island #container #mainview #cities .level1 div.ownCityImg {background:url('+URL+'/EQ_city_1_blue.gif) no-repeat 13px 10px;}');
earthQ('#island #container #mainview #cities .level2 div.ownCityImg,#island #container #mainview #cities .level3 div.ownCityImg {background:url('+URL+'/EQ_city_2_blue.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level4 div.ownCityImg,#island #container #mainview #cities .level5 div.ownCityImg,#island #container #mainview #cities .level6 div.ownCityImg {background:url('+URL+'/EQ_city_3_blue.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level7 div.ownCityImg,#island #container #mainview #cities .level8 div.ownCityImg,#island #container #mainview #cities .level9 div.ownCityImg {background:url('+URL+'/EQ_city_4_blue.gif) no-repeat 11px 13px;}');
earthQ('#island #container #mainview #cities .level10 div.ownCityImg,#island #container #mainview #cities .level11 div.ownCityImg,#island #container #mainview #cities .level12 div.ownCityImg {background:url('+URL+'/EQ_city_5_blue.gif) no-repeat 8px 13px;}');
earthQ('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {background:url('+URL+'/EQ_city_6_blue.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level16 div.ownCityImg,#island #container #mainview #cities .level17 div.ownCityImg {background:url('+URL+'/EQ_city_7_blue.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level18 div.ownCityImg,#island #container #mainview #cities .level19 div.ownCityImg,#island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg {background:url('+URL+'/EQ_city_8_blue.gif) no-repeat 2px 4px;}');

//--- ciudades en verde


earthQ('#island #container #mainview #cities .level1 div.allyCityImg {background:url('+URL+'/EQ_city_1_green.gif) no-repeat 13px 10px;}');
earthQ('#island #container #mainview #cities .level2 div.allyCityImg,#island #container #mainview #cities .level3 div.allyCityImg {background:url('+URL+'/EQ_city_2_green.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level4 div.allyCityImg,#island #container #mainview #cities .level5 div.allyCityImg,#island #container #mainview #cities .level6 div.allyCityImg {background:url('+URL+'/EQ_city_3_green.gif) no-repeat 13px 13px;}');
earthQ('#island #container #mainview #cities .level7 div.allyCityImg,#island #container #mainview #cities .level8 div.allyCityImg,#island #container #mainview #cities .level9 div.allyCityImg {background:url('+URL+'/EQ_city_4_green.gif) no-repeat 11px 13px;}');
earthQ('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {background:url('+URL+'/EQ_city_5_green.gif) no-repeat 8px 13px;}');
earthQ('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg {background:url('+URL+'/EQ_city_6_green.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level16 div.allyCityImg,#island #container #mainview #cities .level17 div.allyCityImg {background:url('+URL+'/EQ_city_7_green.gif) no-repeat 4px 7px;}');
earthQ('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg {background:url('+URL+'/EQ_city_8_green.gif) no-repeat 2px 4px;}');

//---maravillas----

earthQ('#island #container #mainview #islandfeatures .wonder1 { background-image:url('+URL+'/EQ_wonder1_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder2 { background-image:url('+URL+'/EQ_wonder2_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder3 { background-image:url('+URL+'/EQ_wonder3_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder4 { background-image:url('+URL+'/EQ_wonder4_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder5 { background-image:url('+URL+'/EQ_wonder5_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder6 { background-image:url('+URL+'/EQ_wonder6_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder7 { background-image:url('+URL+'/EQ_wonder7_large.gif); }');
earthQ('#island #container #mainview #islandfeatures .wonder8 { background-image:url('+URL+'/EQ_wonder8_large.gif); }');

