// ==UserScript==
// @name           איקרים העיר החורף
// @namespace      איקרים העיר העברית - הגרסא חדשה - מחליפה את העיר בעיר יפה יותר
// @version        2.0.2
// @source         http://userscripts.org/scripts/show/51406
// @identifier     http://userscripts.org/scripts/source/51406.user.js
// @mail           Soon@Soon.Soon
// @description    איקרים העיר החורף - מחליפה את העיר בעיר יפה יותר וחורפית 
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.co.il/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ***************** Start *****************

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ***************** Background ************* !
addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://s1.il.ikariam.com/skin/rtl/specials/winter/img/city/city_level24.jpg);}');

// ***************** Space ******************* !
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url(http://s2.il.ikariam.com/skin/rtl/specials/winter/img/city/building_wall.gif);}');
// ***************** Transporter ************* !
addNewStyle('#city #container #mainview #locations .transporter {right: 100px;}');

// ***************** Granison Outpost ******** !
addNewStyle('#city #container #mainview #locations .garnisonOutpost {background-image:url(http://img352.imageshack.us/img352/8684/spacervf7.gif);}');

// ***************** Granison Center ********* !
addNewStyle('#city #container #mainview #locations .garnisonCenter {background-position: 5px 0;}');

// ***************** Museun ****************** !
GM_addStyle("#city #container #mainview #locations .museum .buildingimg        {background-image:url(http://www.siz.co.il/my.php?i=yzonijwmrfx2.jpg)}");

// ---------------------------------------------

// ***************** Town Hall ***************
GM_addStyle("#city #container #mainview #locations .townHall .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_townhall.gif)}");

// ***************** Port *********************
GM_addStyle("#city #container #mainview #locations .port .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_port.gif)}");

// ***************** Ship Yard ****************
GM_addStyle("#city #container #mainview #locations .shipyard .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_shipyard.gif)}");

// ***************** Barracks *****************
GM_addStyle("#city #container #mainview #locations .barracks .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_barracks.gif)}");

// ***************** Academy ******************
GM_addStyle("#city #container #mainview #locations .academy .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_academy.gif)}");

// ***************** Tavern *******************
GM_addStyle("#city #container #mainview #locations .tavern .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_tavern.gif)}");

// ***************** Branch Office ************
GM_addStyle("#city #container #mainview #locations .branchOffice .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_branchOffice.gif)}");

// ***************** Safe House ***************
GM_addStyle("#city #container #mainview #locations .safehouse .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_safehouse.gif)}");

// ***************** Palace *******************
GM_addStyle("#city #container #mainview #locations .palace .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_palace.gif)}");

// ***************** Palace Colony ************
GM_addStyle("#city #container #mainview #locations .palaceColony .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_palaceColony.gif)}");

// ***************** WareHouse ****************
GM_addStyle("#city #container #mainview #locations .warehouse .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_warehouse.gif)}");

// ***************** WorkShop ****************
GM_addStyle("#city #container #mainview #locations .workshop .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_workshop.gif)}");

// ***************** StoneMason **************
GM_addStyle("#city #container #mainview #locations .stonemason .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_stonemason.gif)}");

// ***************** FireWorker **************
GM_addStyle("#city #container #mainview #locations .fireworker .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_fireworker.gif)}");

// ***************** GlassBlowing ************
GM_addStyle("#city #container #mainview #locations .glassblowing .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_glassblowing.gif)}");

// ***************** Alchemist ***************
GM_addStyle("#city #container #mainview #locations .alchemist .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_alchemist.gif)}");

// ***************** Architect ***************
GM_addStyle("#city #container #mainview #locations .architect .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_architect.gif)}");

// ***************** Optician ****************
GM_addStyle("#city #container #mainview #locations .optician .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_optician.gif)}");

// ***************** Vineyard ****************
GM_addStyle("#city #container #mainview #locations .vineyard .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_vineyard.gif)}");

// ***************** Winegrower **************
GM_addStyle("#city #container #mainview #locations .winegrower .buildingimg        {background-image:url(http://s4.ikariam.co.il/skin/rtl/img/city/building_winegrower.gif)}");

// ***************** End *******************