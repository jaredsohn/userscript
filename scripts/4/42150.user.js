// JavaScript Document
// ==UserScript==
// @name           Ikariam Sun & Night 2009
// @version 	   1.0
// @namespace 	   Sun & Night
// @autor          Create by Duy Hung, Based on "Ikariam Animator"
// @e-mail         nguyen.tran.duy.hung@gmail.com
// @description    Làm IKARIAM sống động hơn
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://ns7.freeheberg.com/~histdu14/developart/ikariam_developart1.user.js
// ==/UserScript==
// ===========================================================================

var URL= "http://ikariam.bgt-angels.sk/game/animated";
var Horalocal = new Date();
var hora = Horalocal.getHours()

function Noche(css) {

if ( hora >= 18 && hora <= 24 || hora >= 0 && hora <= 6 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}
}

function Sun(css) {

if ( hora >= 7 && hora <= 9 || hora >= 10 && hora <=  17 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);};
}


// ---------- Jour/Sun -----------

Sun('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg { background:url('+URL+'/city_3_green.gif) no-repeat 13px 13px;}');
Sun('#island #container #mainview #cities .level1 div.allyCityImg { background:url('+URL+'/city_1_green.gif) no-repeat 13px 10px;}');
Sun('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg { background:url('+URL+'/city_7_green.gif) no-repeat 4px 7px; }');
Sun('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg, #island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg, #island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg, #island #container #mainview #cities .level24 div.allyCityImg {	background:url('+URL+'/city_8_green.gif) no-repeat 2px 4px;}');
Sun('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg, #island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg, #island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg, #island #container #mainview #cities .level24 div.cityimg {	background:url('+URL+'/city_8_red.gif) no-repeat 2px 4px;}');
Sun('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg { background:url('+URL+'/city_7_blue.gif) no-repeat 4px 7px; }');
Sun('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg, #island #container #mainview #cities .level21 div.ownCityImg, #island #container #mainview #cities .level22 div.ownCityImg, #island #container #mainview #cities .level23 div.ownCityImg, #island #container #mainview #cities .level24 div.ownCityImg { background:url('+URL+'/city_8_blue.gif) no-repeat 2px 4px; }');
Sun('#island #container #mainview #cities .level1 div.ownCityImg { background:url('+URL+'/city_1_blue.gif) no-repeat 13px 10px; }');
Sun('#island #container #mainview #cities .level1 div.cityimg { background:url('+URL+'/city_1_red.gif) no-repeat 13px 10px; }');
Sun('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg { background:url('+URL+'/city_2_blue.gif) no-repeat 13px 13px; }');
Sun('#island #container #mainview #cities .level2 div.allyCityImg { background:url('+URL+'/city_2_green.gif) no-repeat 17px 7px; }');
Sun('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg { background:url('+URL+'/city_2_red.gif) no-repeat 13px 13px; }');
Sun('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg { background:url('+URL+'/city_3_blue.gif) no-repeat 13px 13px; }');
Sun('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg { background:url('+URL+'/city_3_red.gif) no-repeat 13px 13px; }');
Sun('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg { background:url('+URL+'/city_4_red.gif) no-repeat 11px 13px; }');
Sun('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg { background:url('+URL+'/city_4_green.gif) no-repeat 11px 13px; }');
Sun('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg { background:url('+URL+'/city_4_blue.gif) no-repeat 11px 13px; }');
Sun('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url('+URL+'/city_5_red.gif) no-repeat 8px 13px;}');
Sun('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {	background:url('+URL+'/city_5_green.gif) no-repeat 8px 13px;}');
Sun('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg { background:url('+URL+'/city_5_blue.gif) no-repeat 8px 13px; }');
Sun('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {	background:url('+URL+'/city_6_blue.gif) no-repeat 4px 7px;');
Sun('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {	background:url('+URL+'/city_6_red.gif) no-repeat 4px 7px;}');
Sun('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg { background:url('+URL+'/city_6_green.gif) no-repeat 4px 7px;');
Sun('#header {	position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url('+URL+'/bg_header.jpg) no-repeat;}');
Sun('#island #container #mainview #cities .selectimg { position:absolute; top:22px; left:-17px; visibility:hidden;  background-image:url('+URL+'/select_city.gif); width:99px; height:52px; }');
Sun('#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:-9999;}');
Sun('#worldmap_iso #worldmap .islandMarked {  position:absolute; bottom:65px; left:80px; width:73px; height:97px; background-image:url('+URL+'/select_island.gif); z-index:2000; }');
Sun('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'/flag_yellow.gif); width:29px; height:40px; }');
Sun('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url('+URL+'/building_barracks.gif);	}');
Sun('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url('+URL+'/building_palace.gif);	}');
Sun('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url('+URL+'/building_safehouse.gif);	}');
Sun('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url('+URL+'/building_embassy.gif);	}');
Sun('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url('+URL+'/building_academy.gif);	}');
//-mayor
Sun('#advisors #advCities a.normal { background-image:url('+URL+'/mayor.gif); }');
//-----------------------------------0.0.1--------------------------------
Sun('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url('+URL+'/building_port.gif);	}');
Sun('#city #container #mainview #locations .townHall .buildingimg {	left:-8px; top:-60px; width:104px; height:106px; background-image:url('+URL+'/building_townhall.gif);	}');
Sun('#city #container #mainview #locations .land .flag {	background-image:url('+URL+'/flag_red.gif);	}');
Sun('#city #container #mainview #locations .shore .flag {	background-image:url('+URL+'/flag_blue.gif);	}');
Sun('#city #container #mainview #locations .wall .flag {	background-image:url('+URL+'/flag_yellow.gif);	}');
Sun('#island #container #mainview #cities .selectimg { position:absolute; top:22px; left:-17px; visibility:hidden;  background-image:url('+URL+'/select_city.gif); width:99px; height:52px; }');
Sun('#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:-9999;}');
Sun('#worldmap_iso #worldmap .islandMarked {  position:absolute; bottom:65px; left:80px; width:73px; height:97px; background-image:url('+URL+'/select_island.gif); z-index:2000; }');
Sun('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'/flag_yellow.gif); width:29px; height:40px; }');
// ---------- D�but du Script Pour le Jour -----------

//-------------------------------- Arriere Plan --------------------------------
Sun('#city #container .phase1 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase1.jpg);}');
Sun('#city #container .phase2 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase2.jpg);}');
Sun('#city #container .phase3 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase3.jpg);}');
Sun('#city #container .phase4 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase4.jpg);}');
Sun('#city #container .phase5 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase5.jpg);}');
Sun('#city #container .phase6 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase6.jpg);}');
Sun('#city #container .phase7 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase7.jpg);}');
Sun('#city #container .phase8 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase8.jpg);}');
Sun('#city #container .phase9 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase9.jpg);}');
Sun('#city #container .phase10 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase10.jpg);}');
Sun('#city #container .phase11 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase11.jpg);}');
Sun('#city #container .phase12 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase12.jpg);}');
Sun('#city #container .phase13 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase13.jpg);}');
Sun('#city #container .phase14 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase14.jpg);}');
Sun('#city #container .phase15 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase15.jpg);}');
Sun('#city #container .phase16 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase16.jpg);}');
Sun('#city #container .phase17 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase17.jpg);}');
Sun('#city #container .phase18 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase18.jpg);}');
Sun('#city #container .phase19 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase19.jpg);}');
Sun('#city #container .phase20 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase20.jpg);}');
// Test
Sun('#city #container .phase21 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase21.jpg);}');
Sun('#city #container .phase22 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase22.jpg);}');
Sun('#city #container .phase23 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase23.jpg);}');
Sun('#city #container .phase24 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/city_phase24.jpg);}');



//-----------------------------------Batiments--------------------------------

Sun('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_shipyard.gif);	}'       );
Sun('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:133px; height:98px;  background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_museum64x.gif);	}');
Sun('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_warehouse.png);	}');
Sun('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_wall.png);	}');
Sun('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-37px; width:111px; height:84px;  background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_tavern2.gif);	}');
Sun('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_palace.gif);	}');
Sun('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_academy.gif);	}');
Sun('#city #container #mainview #locations .workshop .buildingimg {	left:-19px; top:-54px; width:106px; height:108px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_workshop.gif);}');
Sun('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_safehouse.gif);	}');
Sun('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_branchOffice.png);}');
Sun('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_embassy.gif);	}');
Sun('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_palaceColony.png);	}');
Sun('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_townhall.gif);	}');
Sun('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_barracks.gif);	}');
Sun('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/building_port.gif);	}');
Sun('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://offptz.ucoz.ru/ikar_gp/constructionSite.gif);	}');
Sun('#city #container #mainview #locations .alchemist .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_alchemist.png);	}'       );
Sun('#city #container #mainview #locations .architect .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_architect.png);	}'       );
Sun('#city #container #mainview #locations .optician .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_optician.png);	}'       );
Sun('#city #container #mainview #locations .stonemason .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_stonemason.png);	}'       );
Sun('#city #container #mainview #locations .vineyard .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_vineyard.png);	}'       );
Sun('#city #container #mainview #locations .winegrower .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_winegrower.png);	}'       );
Sun('#city #container #mainview #locations .carpentering .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_carpentering.png);	}'       );
Sun('#city #container #mainview #locations .fireworker .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_fireworker.png);	}'       );
Sun('#city #container #mainview #locations .forester .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_forester.png);	}'       );
Sun('#city #container #mainview #locations .glassblowing .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/building_glassblowing.png);	}'       );

//----- Petit Drapeau ----

Sun('#city #container #mainview #locations .land .flag {	background-image:url(http://ikariam.bgt-angels.sk/game/animated/flag_red.gif);	}');
Sun('#city #container #mainview #locations .shore .flag {	background-image:url(http://ikariam.bgt-angels.sk/game/animated/flag_blue.gif);	}');
Sun('#city #container #mainview #locations .wall .flag {	background-image:url(http://ikariam.bgt-angels.sk/game/animated/flag_yellow.gif);	}');
Sun('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url(http://ikariam.bgt-angels.sk/game/animated/flag_yellow.gif); width:29px; height:40px; }');

//----- Garnison, Transporteur & Nageurs ----

Sun('#city #container #mainview #locations .transporter {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/transporter.png); }');
Sun('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost{background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/garnison.png); }');

//--- Selectioneur ---

Sun('#island #container #mainview #cities .selectimg { position:absolute; top:18px; left:-7px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Sun/Isle_Night/select_city.gif); width:81px; height:55px; }');
Sun('#header {position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(http://ns7.freeheberg.com/~histdu14/developart/Sun/bg_header.jpg) no-repeat;}');


// ---------- Fin du Script Pour le jour -----------

// ---------- Nuit/Night -----------
// ---------- D�but du Script Pour la nuit -----------

//-------------------------------- Arriere Plan --------------------------------
Noche('#city #container .phase1 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase1.jpg);}');
Noche('#city #container .phase2 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase2.jpg);}');
Noche('#city #container .phase3 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase3.jpg);}');
Noche('#city #container .phase4 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase4.jpg);}');
Noche('#city #container .phase5 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase5.jpg);}');
Noche('#city #container .phase6 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase6.jpg);}');
Noche('#city #container .phase7 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase7.jpg);}');
Noche('#city #container .phase8 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase8.jpg);}');
Noche('#city #container .phase9 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase9.jpg);}');
Noche('#city #container .phase10 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase10.jpg);}');
Noche('#city #container .phase11 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase11.jpg);}');
Noche('#city #container .phase12 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase12.jpg);}');
Noche('#city #container .phase13 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase13.jpg);}');
Noche('#city #container .phase14 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase14.jpg);}');
Noche('#city #container .phase15 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase15.jpg);}');
Noche('#city #container .phase16 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase16.jpg);}');
Noche('#city #container .phase17 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase17.jpg);}');
Noche('#city #container .phase18 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase18.jpg);}');
Noche('#city #container .phase19 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase19.jpg);}');
Noche('#city #container .phase20 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase20.jpg);}');
Noche('#city #container .phase21 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase21.jpg);}');
Noche('#city #container .phase22 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase12.jpg);}');
Noche('#city #container .phase23 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase23.jpg);}');
Noche('#city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30 {    background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/city_phase24.jpg);}');

//----------------------------------- Batiments --------------------------------

Noche('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_shipyard.png);	}'       );
Noche('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_museum.png);	}');
Noche('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_warehouse.png);	}');
Noche('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_wall.png);	}');
Noche('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_tavern.png);	}');
Noche('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_palace.png);	}');
Noche('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_academy.png);	}');
Noche('#city #container #mainview #locations .workshop .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_workshop.png);}');
Noche('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_safehouse.png);	}');
Noche('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_branchOffice.png);}');
Noche('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_embassy.png);	}');
Noche('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_palaceColony.png);	}');
Noche('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_townhall.png);	}');
Noche('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_barracks.png);	}');
Noche('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_port.png);	}');
Noche('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/constructionSite.png);	}');
Noche('#city #container #mainview #locations .alchemist .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_alchemist.png);	}'       );
Noche('#city #container #mainview #locations .architect .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_architect.png);	}'       );
Noche('#city #container #mainview #locations .optician .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_optician.png);	}'       );
Noche('#city #container #mainview #locations .stonemason .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_stonemason.png);	}'       );
Noche('#city #container #mainview #locations .vineyard .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_vineyard.png);	}'       );
Noche('#city #container #mainview #locations .winegrower .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_winegrower.png);	}'       );
Noche('#city #container #mainview #locations .carpentering .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_carpentering.png);	}'       );
Noche('#city #container #mainview #locations .fireworker .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_fireworker.png);	}'       );
Noche('#city #container #mainview #locations .forester .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_forester.png);	}'       );
Noche('#city #container #mainview #locations .glassblowing .buildingimg {	left:-22px; top:-20px; width:126px; height:86px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/building_glassblowing.png);	}'       );

//----- Petit Drapeau ----

Noche('#city #container #mainview #locations .land .flag {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/flag_red.gif);	}');
Noche('#city #container #mainview #locations .shore .flag {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/flag_blue.gif);	}');
Noche('#city #container #mainview #locations .wall .flag {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/flag_yellow.gif);	}');

Noche('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/flag_yellow.gif); width:29px; height:40px; }');

//----- Garnison, Transporteur & Nageurs ----

Noche('#city #container #mainview #locations .transporter {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/transporter.png); }');
Noche('#city #container #mainview #locations .garnison, #city #container #mainview #locations .garnisonGate1, #city #container #mainview #locations .garnisonGate2, #city #container #mainview #locations .garnisonCenter, #city #container #mainview #locations .garnisonOutpost {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/garnison.png); }');
Noche('#city #container #mainview #locations .garnisonOutpost {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/garnison_outpost.png); }');
Noche('#city #container #mainview #locations .beachboys {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/beachboys.png); }');
Noche('#city #container #mainview.phase24 #locations .beachboys {background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/beachboys_level24.png); }');

//----------Iles de nuit--------

Noche('#island #container #mainview {padding:0;height:440px;background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/bg_island.jpg);}');

//-- Les Villes sur l'ile (Rouge) ----

Noche('#island #container #mainview #cities .level1 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_1_red.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.cityimg,#island #container #mainview #cities .level3 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_2_red.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.cityimg,#island #container #mainview #cities .level5 div.cityimg,#island #container #mainview #cities .level6 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_3_red.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.cityimg,#island #container #mainview #cities .level8 div.cityimg,#island #container #mainview #cities .level9 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_4_red.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_5_red.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_6_red.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.cityimg,#island #container #mainview #cities .level17 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_7_red.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_8_red.gif) no-repeat 2px 4px;}');

//--- Les Villes sur l'ile (Bleu) ----

Noche('#island #container #mainview #cities .level1 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_1_blue.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.ownCityImg,#island #container #mainview #cities .level3 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_2_blue.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.ownCityImg,#island #container #mainview #cities .level5 div.ownCityImg,#island #container #mainview #cities .level6 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_3_blue.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.ownCityImg,#island #container #mainview #cities .level8 div.ownCityImg,#island #container #mainview #cities .level9 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_4_blue.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.ownCityImg,#island #container #mainview #cities .level11 div.ownCityImg,#island #container #mainview #cities .level12 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_5_blue.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_6_blue.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.ownCityImg,#island #container #mainview #cities .level17 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_7_blue.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.ownCityImg,#island #container #mainview #cities .level19 div.ownCityImg,#island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_8_blue.gif) no-repeat 2px 4px;}');

//--- Les Villes sur l'ile (Vert) ----

Noche('#island #container #mainview #cities .level1 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_1_green.gif) no-repeat 13px 10px;}');
Noche('#island #container #mainview #cities .level2 div.allyCityImg,#island #container #mainview #cities .level3 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_2_green.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level4 div.allyCityImg,#island #container #mainview #cities .level5 div.allyCityImg,#island #container #mainview #cities .level6 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_3_green.gif) no-repeat 13px 13px;}');
Noche('#island #container #mainview #cities .level7 div.allyCityImg,#island #container #mainview #cities .level8 div.allyCityImg,#island #container #mainview #cities .level9 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_4_green.gif) no-repeat 11px 13px;}');
Noche('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_5_green.gif) no-repeat 8px 13px;}');
Noche('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_6_green.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level16 div.allyCityImg,#island #container #mainview #cities .level17 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_7_green.gif) no-repeat 4px 7px;}');
Noche('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg {background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_8_green.gif) no-repeat 2px 4px;}');
Noche('#island #container #mainview #cities .city .buildCityImg { display:block; position:absolute; left:0px; bottom:0px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/City_Night/city_constr.gif); width:64px; height:63px;}');

//--- Batiments des Dieux / Temple ----

Noche('#island #container #mainview #islandfeatures .wonder1 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder1_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder2 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder2_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder3 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder3_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder4 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder4_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder5 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder5_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder6 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder6_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder7 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder7_large.gif); }');
Noche('#island #container #mainview #islandfeatures .wonder8 { background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/God_Night/wonder8_large.gif); }');

//---- Ressources ----

Noche('#island #container #mainview #islandfeatures .marble a {	width:60px; height:63px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/Ress_Night/resource_marble.gif);	}');
Noche('#island #container #mainview #islandfeatures .wood a {	width:45px; height:41px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/Ress_Night/resource_wood.gif);	}');
Noche('#island #container #mainview #islandfeatures .wine a {	width:93px; height:48px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/Ress_Night/resource_wine.gif);	}');
Noche('#island #container #mainview #islandfeatures .crystal a {	width:56px; height:43px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/Ress_Night/resource_glass.gif);	}');
Noche('#island #container #mainview #islandfeatures .sulfur a {	width:78px; height:46px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/Ress_Night/resource_sulfur.gif);	}');

//--- Selectioneur ---

Noche('#island #container #mainview #cities .selectimg { position:absolute; top:18px; left:-7px; background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/Isle_Night/select_city.gif); width:81px; height:55px; }');
Noche('#header {position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(http://ns7.freeheberg.com/~histdu14/developart/Night/bg_header.jpg) no-repeat;}');
Noche('#header {position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url(http://ns7.freeheberg.com/~histdu14/developart/Night/bg_header.jpg) no-repeat;}');
Noche('#extraDiv1{background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/layout/bg_sky.jpg) repeat top center;z-index:1;}');
Noche('#extraDiv2{background:url(http://ns7.freeheberg.com/~histdu14/developart/Night/layout/bg_ocean.jpg) repeat top center;z-index:1;}');


//------ Vue du Monde --------

Noche('#worldmap_iso #worldmap .ocean1{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean01.gif);}');
Noche('#worldmap_iso #worldmap .ocean2{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean02.gif);}');
Noche('#worldmap_iso #worldmap .ocean3{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean03.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature1{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean_feature01.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature2{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean_feature02.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature3{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean_feature03.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature4{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean_feature04.gif);}');
Noche('#worldmap_iso #worldmap .ocean_feature5{	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_ocean_feature05.gif);}');
Noche('#worldmap_iso #worldmap .island1 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island01.gif);}');
Noche('#worldmap_iso #worldmap .island2 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island02.gif);}');
Noche('#worldmap_iso #worldmap .island3 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island03.gif);}');
Noche('#worldmap_iso #worldmap .island4 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island04.gif);}');
Noche('#worldmap_iso #worldmap .island5 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island05.gif);}');
Noche('#worldmap_iso #worldmap .island6 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island06.gif);}');
Noche('#worldmap_iso #worldmap .island7 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island07.gif);}');
Noche('#worldmap_iso #worldmap .island8 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island08.gif);}');
Noche('#worldmap_iso #worldmap .island9 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island09.gif);}');
Noche('#worldmap_iso #worldmap .island10 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/tile_island10.gif);}');
Noche('#worldmap_iso #worldmap .wonder1 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder1.gif);	width:38px;	height:53px;}');
Noche('#worldmap_iso #worldmap .wonder2 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder2.gif);	width:37px;	height:66px;}');
Noche('#worldmap_iso #worldmap .wonder3 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder3.gif);	width:37px;	height:48px;}');
Noche('#worldmap_iso #worldmap .wonder4 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder4.gif);	width:33px;	height:77px;}');
Noche('#worldmap_iso #worldmap .wonder5 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder5.gif);	width:38px;	height:49px;}');
Noche('#worldmap_iso #worldmap .wonder6 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder6.gif);	width:28px;	height:51px;}');
Noche('#worldmap_iso #worldmap .wonder7 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder7.gif);	width:37px;	height:70px;}');
Noche('#worldmap_iso #worldmap .wonder8 {	background-image:url(http://ns7.freeheberg.com/~histdu14/developart/Night/World_Night/wonder8.gif);	width:27px;	height:70px;}');

// ---------- Fin du Script Pour la nuit -----------

// Fin de la Version B�t� !!! A venir ;
//---- Lev�e du Jour -----

//-------------------------------- Arriere Plan --------------------------------

//----------------------------------- Batiments --------------------------------

//----- Tomb�e de la Nuit ---------

//-------------------------------- Arriere Plan --------------------------------

//----------------------------------- Batiments --------------------------------

//---- Et bien d'autre encore !!! ; Suivez Ika DevART,