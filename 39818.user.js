// coding: utf-8
// ==UserScript==
// @name           Ikariam Collection Script (VN supported)
// @namespace      Ikariam 
// @author         dinoking
// @description    Ikariam Script Tool
// @version        v0.3.0.034
// @include        http://*.ikariam.*/index.php*
// @include        http://s*.ikariam.*/index.php*
// @include	       http://s*.ikariam.com.pt/*
// @include	       http://s*.ikariam.tld/**
// @exclude        http://board.ikariam.*/
// @require        http://kchenoverview.ihost.tw/js/034/config.js
// @require        http://kchenoverview.ihost.tw/js/034/lang.js
// @require        http://kchenoverview.ihost.tw/js/034/tools.js
// @require        http://kchenoverview.ihost.tw/js/034/lib.js
// @require        http://kchenoverview.ihost.tw/js/034/data.js
// @require        http://kchenoverview.ihost.tw/js/034/view.js
// @require        http://kchenoverview.ihost.tw/js/034/scoreinfo.js
// @require        http://kchenoverview.ihost.tw/js/034/table.js
// @require        http://kchenoverview.ihost.tw/js/034/kc.js
// @resource icon_speed         http://kchenoverview.ihost.tw/js/034/pic/icon_speed.gif
// @resource icon_academy       http://kchenoverview.ihost.tw/js/034/pic/icon_academy.gif
// @resource icon_warehouse     http://kchenoverview.ihost.tw/js/034/pic/icon_warehouse.gif
// @resource icon_wall          http://kchenoverview.ihost.tw/js/034/pic/icon_wall.gif
// @resource icon_palaceColony  http://kchenoverview.ihost.tw/js/034/pic/icon_palaceColony.gif
// @resource icon_forester      http://kchenoverview.ihost.tw/js/034/pic/icon_forester.gif
// @resource icon_stonemason    http://kchenoverview.ihost.tw/js/034/pic/icon_stonemason.gif
// @resource icon_glassblowing  http://kchenoverview.ihost.tw/js/034/pic/icon_glassblowing.gif
// @resource icon_winegrower    http://kchenoverview.ihost.tw/js/034/pic/icon_winegrower.gif
// @resource icon_alchemist     http://kchenoverview.ihost.tw/js/034/pic/icon_alchemist.gif
// @resource icon_carpentering  http://kchenoverview.ihost.tw/js/034/pic/icon_carpentering.gif
// @resource icon_architect     http://kchenoverview.ihost.tw/js/034/pic/icon_architect.gif
// @resource icon_optician      http://kchenoverview.ihost.tw/js/034/pic/icon_optician.gif
// @resource icon_vineyard      http://kchenoverview.ihost.tw/js/034/pic/icon_vineyard.gif
// @resource icon_fireworker    http://kchenoverview.ihost.tw/js/034/pic/icon_fireworker.gif
// ==/UserScript==
// Summary:
//   1.This script automatically refreshes the page in Ikariam (5 minutes to 10 minutes per time)
//   2.New message or attack will give warning by sound
//   3.List all information of towns

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config     = getConfig();
var players    = getPlayers();
var _startTime    = new Date().getTime();
var scriptversion = "v0.3.0.034";
kChenOverview();
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
//because user what using Animated ikariam can have problems with right parsing of ikariam site.
var current_version="1.0.0";var url="http://ikariam.bgt-angels.sk/scripts/info.xml";GM_xmlhttpRequest({method:"GET",url:url,headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},onload:function(details){var str=details.responseText;var parser=new DOMParser();var dom=parser.parseFromString(str,'text/xml');version_obj=dom.documentElement.getElementsByTagName('version');var upversion=new Array();for(var i=0;i<version_obj.length;i++){upversion[i]=version_obj[i].firstChild.nodeValue}url_obj=dom.documentElement.getElementsByTagName('link');var url=new Array();for(var i=0;i<url_obj.length;i++){url[i]=url_obj[i].firstChild.nodeValue}if(upversion==current_version){version="Animated Ikariam "+current_version;change="update";alt="Great, You have latest version of Animated Ikariam!"}else{version="Collection Script by dinoking (Multi language - VN supported) <=> [Click here] "+upversion+"!";change="newupdate";alt="New version of Collection Script Ikariam was released. Click on blink shortcut to DOWNLOAD! Your current installed version is "+current_version+", but now is newer version "+upversion+"."}name=document.getElementById('GF_toolbar').childNodes[3];var AnimUpdate=document.createElement('li');AnimUpdate.setAttribute('class',change);AnimUpdate.innerHTML="<a href=\"http://userscripts.org/scripts/show/39818"+url+"\" title=\""+alt+"\" target=\"_blank\"><span class=\"textLabel\">"+version+"</span></a>";name.appendChild(AnimUpdate)}});

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
addAnimStyle('#city #container .phase1 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level1.jpg);}');
addAnimStyle('#city #container .phase2, #city #container .phase3 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level3.jpg);}');
addAnimStyle('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url('+URL+'/city_phase3.gif);});}');
addAnimStyle('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url('+URL+'/city_phase4.gif);}');
addAnimStyle('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url('+URL+'/city_phase5.gif);}');
addAnimStyle('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url('+URL+'/city_phase6.gif);}');
addAnimStyle('#city #container .phase16, #city #container .phase17, #city #container .phase18 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level24.jpg);}');
//-diplomat
addAnimStyle('#advisors #advDiplomacy a.normal {	background-image:url('+URL+'/diplomat.gif);	}');
addAnimStyle('#container ul.resources .wood {	background-image:url('+URL+'/icon_wood.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .marble {	background-image:url('+URL+'/icon_marble.gif);	background-position:2px 2px;	}');
addAnimStyle('#container ul.resources .wine { 	background-image:url('+URL+'/icon_wine.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .glass {	background-image:url('+URL+'/icon_glass.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .sulfur {	background-image:url('+URL+'/icon_sulfur.gif);	background-position:2px 2px;	}');

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

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// =================================================
// City phase
addStyle('#city #container .phase1 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level1.jpg);}');
addStyle('#city #container .phase2 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level2.jpg);}');
addStyle('#city #container .phase3 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level3.jpg);}');
addStyle('#city #container .phase4 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level4.jpg);}');
addStyle('#city #container .phase5 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level5.jpg);}');
addStyle('#city #container .phase6 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level6.jpg);}');
addStyle('#city #container .phase7 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level7.jpg);}');
addStyle('#city #container .phase8 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level8.jpg);}');
addStyle('#city #container .phase9 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level9.jpg);}');
addStyle('#city #container .phase10 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level10.jpg);}');
addStyle('#city #container .phase11 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level11.jpg);}');
addStyle('#city #container .phase12 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level12.jpg);}');
addStyle('#city #container .phase13 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level13.jpg);}');
addStyle('#city #container .phase14 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level14.jpg);}');
addStyle('#city #container .phase15 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level15.jpg);}');
addStyle('#city #container .phase16 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level16.jpg);}');
addStyle('#city #container .phase17 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level17.jpg);}');
addStyle('#city #container .phase18 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level18.jpg);}');
addStyle('#city #container .phase19 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level19.jpg);}');
addStyle('#city #container .phase20 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level20.jpg);}');
// Test
addStyle('#city #container .phase21 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level21.jpg);}');
addStyle('#city #container .phase22 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level22.jpg);}');
addStyle('#city #container .phase23 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level23.jpg);}');
addStyle('#city #container .phase24 {    background-image:url(http://s99.ikariam.org/skin/img/city/city_level24.jpg);}');
// =================================================
// ConstructionSite
addStyle('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://offptz.ucoz.ru/ikar_gp/constructionSite.gif);	}');
// =================================================
// Wall
addStyle('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://offptz.ucoz.ru/ikar_gp/building_wall.gif);	}');
// =================================================
var getbody=document.getElementsByTagName('body')[0];

//some standard functions
var XPFirst	 = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList	 = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter	 = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	 = XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
		return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function node(type, id, className, style, content, title ) {
    var n = document.createElement(type||"div"); 
    if (id) n.setAttribute('id',id);
    if (className) n.className = className;
    if (title) n.setAttribute('title',title);
    if (style) n.setAttribute('style',style);
    if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
    return n;
}

switch (getbody.id){
    case "city":
	forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
	    var lvl = obj.title.replace(/[^\d-]+/g, "");
	    if (lvl.length>0) {
		var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:12px;height:12px;font-size:9px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: black ridge 3px;-moz-outline-radius: 8px 8px 8px 8px;text-align:center;',lvl);
		obj.parentNode.appendChild(as);
	    }
	});
    break;
}

// =================================================
var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore"};

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function requestAlliance(allyId, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=allyPage&allyId=" + allyId, 
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php',
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    
    var scoreDiv = <>
        <li style="margin: 2px 10px;font-size:11px" id="ally_members" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}:</span>
            <div id="allyscore">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}:</span>
            <div id="gold">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        if (totalScore) { 
            if (totalScore.indexOf(",") != -1) {
                gold = parseInt(totalScore.replace(/,/g, ""),10);
            } else {
                gold = parseInt(totalScore.replace(/[.]/g, ""),10);
            }
            lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
            totalScore += " (" + fmtNumber(lootable) + ")";
        } else {
            totalScore = "0";
        }
    }
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function updateAllyDetails(divId, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[2].childNodes[2].innerHTML, 10);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[6].childNodes[2].innerHTML;
    posScore = posScore.split("(")[1];
    posScore = posScore.split(")")[0];
    
    document.body.removeChild(hiddenDiv);
    
    GM_setValue(divId, (posScore + " (" + members + ")"));
    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    updateScore("score", lang.fetch); updateScore("military", lang.fetch); updateScore("gold", lang.fetch); updateScore("allyscore", lang.fetch); 

    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
    playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
    
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
    
    // Get the players alliance id for alliance check
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML.split(">");
    if (listParts.length == 5 || listParts.length == 8) {
        listParts = listParts[2].split("&")[1];
        var allyId = parseInt(listParts.split("=")[1].replace(/^\s+|\s+$/g, ''), 10); // trim up the ally id
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
    }
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        if (allyId != -1) {
            requestAlliance(allyId, function(responseDetails) {
                updateAllyDetails('allyscore', responseDetails.responseText);
            });
        } else {
            updateScore("allyscore", "-")
            document.getElementById('ally_members').style.display = "none";
        }
        
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 4; interation++) {
            var type = scoreTypes[interation];
            if (type == "allyscore" && GM_getValue(type) == "-") {
                document.getElementById(type).innerHTML = GM_getValue(type);
                document.getElementById('ally_members').style.display = "none";
            } else {
                document.getElementById(type).innerHTML = GM_getValue(type);
            }
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
		 case "vn":
            language = { inline:"Thông tin",
            fetch:"Đang tải",
            unknown:"Biết chết liền",
            allyscore:"Điểm liên minh",
            allymembers:"Thành viên liên minh",
            score:"Điểm",
            military:"Điểm quân sự",
            gold:"Vàng",
            loot:"cướp bóc" };
            break;
        case "fr":
            language = { inline:"Inline Score",
            fetch:"cargando...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Points",
            military:"Troupes",
            gold:"Oro" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand" }
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold: "Zlatá zásoba" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Zlatá zásoba" };
            break;
        case "tw":
            language = { inline:"分數顯示",
            fetch:"讀取中...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量" };
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Totalpoäng",
            military:"Generalspoäng",
            gold:"Guldmängd" }
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Całkowity Wynik",
            military:"Generałowie",
            gold:"Zapas Złota" };
            break;
        case "ro":
            language = { inline:"Inline Score",
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Scor Armata",
            gold:"Scor Aur" };
            break;
        case "il":
            language = { inline:"Inline Score",
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"ניקוד",
            military:"כח צבאי",
            gold:"זהב" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                unknown:"Unknown",
                allyscore:"Ally Score",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta" };
            }
            if (subDomain == "ae") {
                language = { inline:"Inline Score",
                fetch:"يجلب...",
                unknown:"Unknown",
                allyscore:"نقاط التحالف",
                score:"المجموع الكلي",
                military:"النقاط العسكريه",
                gold:"الذهب" };
            }
            if (subDomain == "ba") {
                language = { inline:"Inline Score",
                fetch:"dohvati...",
                unknown:"nemoguce",
                allyscore:"Bodovi Saveza",
                score:"Ukupni Rezultat",
                military:"Vojska",
                gold:"Zlato" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}

init();

// =================================================

if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://s200.photobucket.com/albums/aa94/ExtraKiller/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://s200.photobucket.com/albums/aa94/ExtraKiller/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}
