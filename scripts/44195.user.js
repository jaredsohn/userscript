// JavaScript Document
// ==UserScript==
// @name           Ikariam Animator v1.0.0 [WEB BASED]
// @autor          Angelo Verona alias Anilo, Givelin, Omegaboy, TatkaSmoula, Voyager
// @email          anilo4ever@gmail.com
// @namespace      Ikariam
// @description    Animated graphic pack for Ikariam. Updated: city_phase7.gif
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
//'+URL+'/
//*********
var URL= "http://ikariam.bgt-angels.sk/game/animated";
//0.6.7


addAnimStyle('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:133px; height:98px;  background-image:url('+URL+'/building_museum64x.gif);	}');
addAnimStyle('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:120px; height:84px; background-image:url('+URL+'/building_marketplace2.gif);	}');

//--------------------------------0.6.0-----------------------------------
addAnimStyle('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-37px; width:111px; height:84px; background-image:url('+URL+'/building_tavern2.gif);	}');
addAnimStyle('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-54px; width:106px; height:108px; background-image:url('+URL+'/building_workshop.gif);	}');



//--------------------------------0.5.4-----------------------------------
//********************************
//*   Animated Ikariam UPDATER   *
//*    Free to use if u dont     *
//*    using that on Ikariam     *
//*                              *
//********************************
//Anilo's Ikariam Updater (Copyright) - Don't using this piece of script(modified/or not modified) on ikariam, 
//because user what using Animated ikariam can have problems with right parsing of ikariam site.
var current_version="0.6.7";var url="http://ikariam.bgt-angels.sk/scripts/info.xml";GM_xmlhttpRequest({method:"GET",url:url,headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},onload:function(details){var str=details.responseText;var parser=new DOMParser();var dom=parser.parseFromString(str,'text/xml');version_obj=dom.documentElement.getElementsByTagName('version');var upversion=new Array();for(var i=0;i<version_obj.length;i++){upversion[i]=version_obj[i].firstChild.nodeValue}url_obj=dom.documentElement.getElementsByTagName('link');var url=new Array();for(var i=0;i<url_obj.length;i++){url[i]=url_obj[i].firstChild.nodeValue}if(upversion==current_version){version="Animated Ikariam "+current_version;change="update";alt="Great, You have latest version of Animated Ikariam!"}else{version=" "+upversion+" ";change="newupdate";alt="New version of Animated Ikariam was released. Click on blink shortcut to DOWNLOAD! Your current installed version is "+current_version+", but now is newer version "+upversion+"."}name=document.getElementById('GF_toolbar').childNodes[3];var AnimUpdate=document.createElement('li');AnimUpdate.setAttribute('class',change);AnimUpdate.innerHTML="<a href=\""+url+"\" title=\""+alt+"\" target=\"_blank\"><span class=\"textLabel\">"+version+"</span></a>";name.appendChild(AnimUpdate)}});



//new styles for updater

addAnimStyle('#GF_toolbar .newupdate a .textLabel {color: #FF0000; text-decoration: blink; font-weight: bold;}');
addAnimStyle('#GF_toolbar .update a .textLabel {color: #FFFFFF;}');

addAnimStyle('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg { background:url('+URL+'/city_3_green.gif) no-repeat 13px 13px;}');


//--------------------------------0.5.3-----------------------------------
addAnimStyle('#island #container #mainview #cities .level1 div.allyCityImg { background:url('+URL+'/city_1_green.gif) no-repeat 13px 10px;}');
addAnimStyle('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg { background:url('+URL+'/city_7_green.gif) no-repeat 4px 7px; }');
addAnimStyle('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg, #island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg, #island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg, #island #container #mainview #cities .level24 div.allyCityImg {	background:url('+URL+'/city_8_green.gif) no-repeat 2px 4px;}');
addAnimStyle('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg, #island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg, #island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg, #island #container #mainview #cities .level24 div.cityimg {	background:url('+URL+'/city_8_red.gif) no-repeat 2px 4px;}');
addAnimStyle('');
//--------------------------------0.5.2-----------------------------------
//(repaired bug of dispearing citis after page loadeded- THX to board.ikariam.it)
//---City 7 Start
addAnimStyle('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg { background:url('+URL+'/city_7_blue.gif) no-repeat 4px 7px; }');
//---City 7 End
//---City 8 Start
addAnimStyle('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg, #island #container #mainview #cities .level21 div.ownCityImg, #island #container #mainview #cities .level22 div.ownCityImg, #island #container #mainview #cities .level23 div.ownCityImg, #island #container #mainview #cities .level24 div.ownCityImg { background:url('+URL+'/city_8_blue.gif) no-repeat 2px 4px; }');
//---City 8 End

addAnimStyle('#worldmap_iso #worldmap .ownIslandMarked { /*	position:absolute; bottom:70px;	left:100px; width:39px;	height:60px; */	background:url(http://bgt-angels.sk/TW/border-island7.png) no-repeat top center; height:100%; width:100%; z-index:9; }');


addAnimStyle('#worldmap_iso #worldmap .tradegood1 { background-image:url('+URL+'/icon_wine.gif); width:25px; height:25px; bottom:100px; left:50px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood2 { background-image:url('+URL+'/icon_marble.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood3 { background-image:url('+URL+'/icon_glass.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood4 { background-image:url('+URL+'/icon_sulfur.gif); width:25px; height:25px; }');

//--------------------------------0.5---0.5.1--------------------------------
//---City 1 Start
addAnimStyle('#island #container #mainview #cities .level1 div.ownCityImg { background:url('+URL+'/city_1_blue.gif) no-repeat 13px 10px; }');
addAnimStyle('#island #container #mainview #cities .level1 div.cityimg { background:url('+URL+'/city_1_red.gif) no-repeat 13px 10px; }');
//---City 1 End
//---City 2 Start
addAnimStyle('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg { background:url('+URL+'/city_2_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.allyCityImg { background:url('+URL+'/city_2_green.gif) no-repeat 17px 7px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg { background:url('+URL+'/city_2_red.gif) no-repeat 13px 13px; }');
//---City 2 End
//---City 3 Start
addAnimStyle('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg { background:url('+URL+'/city_3_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg { background:url('+URL+'/city_3_red.gif) no-repeat 13px 13px; }');
//---City 3 End
//---City 4 Start
addAnimStyle('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg { background:url('+URL+'/city_4_red.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg { background:url('+URL+'/city_4_green.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg { background:url('+URL+'/city_4_blue.gif) no-repeat 11px 13px; }');
//---City 4 End
//---City 5 Start
addAnimStyle('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url('+URL+'/city_5_red.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {	background:url('+URL+'/city_5_green.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg { background:url('+URL+'/city_5_blue.gif) no-repeat 8px 13px; }');
//---City 5 End
//---City 6 Start
addAnimStyle('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {	background:url('+URL+'/city_6_blue.gif) no-repeat 4px 7px;');

addAnimStyle('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {	background:url('+URL+'/city_6_red.gif) no-repeat 4px 7px;}');

addAnimStyle('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg { background:url('+URL+'/city_6_green.gif) no-repeat 4px 7px;');
//---City 6 End
addAnimStyle('#header {	position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url('+URL+'/bg_header.jpg) no-repeat;}');


addAnimStyle('#island #container #mainview #cities .selectimg { position:absolute; top:22px; left:-17px; visibility:hidden;  background-image:url('+URL+'/select_city.gif); width:99px; height:52px; }');
addAnimStyle('#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:-9999;}');

addAnimStyle('#worldmap_iso #worldmap .islandMarked {  position:absolute; bottom:65px; left:80px; width:73px; height:97px; background-image:url('+URL+'/select_island.gif); z-index:2000; }');

addAnimStyle('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'/flag_yellow.gif); width:29px; height:40px; }');


//--------------------------------0.0.3---0.0.4a--------------------------------
addAnimStyle('#city #container .phase1 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase2 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase3 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase4 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase5 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase6 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase7 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase8 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase9 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase10 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase11 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase12 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase13 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase14 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase15 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase16 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase17 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase18 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase19 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase20 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase21 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase22 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase23 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase24 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase25 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase26 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase27 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase28 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase29 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase30 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
addAnimStyle('#city #container .phase31 {    background-image:url(http://s5.ikariam.fr/skin/img/city/city_level24.jpg);}');
//-diplomat
addAnimStyle('#advisors #advDiplomacy a.normal {	background-image:url('+URL+'/diplomat.gif);	}');
addAnimStyle('#container ul.resources .wood {	background-image:url(http://s5.ikariam.fr/skin/resources/icon_wood.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .marble {	background-image:url(http://s5.ikariam.fr/skin/resources/icon_marble.gif);	background-position:2px 2px;	}');
addAnimStyle('#container ul.resources .wine { 	background-image:url(http://s5.ikariam.fr/skin/resources/icon_wine.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .glass {	background-image:url(http://s5.ikariam.fr/skin/resources/icon_glass.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .sulfur {	background-image:url(http://s5.ikariam.fr/skin/resources/icon_sulfur.gif);	background-position:2px 2px;	}');

//-----------------------------------0.0.2--------------------------------
addAnimStyle('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url('+URL+'/building_barracks.gif);	}');
addAnimStyle('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url('+URL+'/building_palace.gif);	}');
addAnimStyle('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url('+URL+'/building_safehouse.gif);	}');
addAnimStyle('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url('+URL+'/building_embassy.gif);	}');
addAnimStyle('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url('+URL+'/building_academy.gif);	}');
//-mayor
addAnimStyle('#advisors #advCities a.normal { background-image:url('+URL+'/mayor.gif); }');
//-----------------------------------0.0.1--------------------------------
addAnimStyle('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url('+URL+'/building_port.gif);	}');
addAnimStyle('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url('+URL+'/building_townhall.gif);	}');
addAnimStyle('#city #container #mainview #locations .land .flag {	background-image:url('+URL+'/flag_red.gif);	}');
addAnimStyle('#city #container #mainview #locations .shore .flag {	background-image:url('+URL+'/flag_blue.gif);	}');
addAnimStyle('#city #container #mainview #locations .wall .flag {	background-image:url('+URL+'/flag_yellow.gif);	}');
