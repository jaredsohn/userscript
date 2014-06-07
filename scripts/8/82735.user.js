// ==UserScript==
// @name           Ikariam Big City Edit 1
// @namespace      Ikariam Big City Edit 1 - Replace city view...
// @description    Ikariam Big City Edit 1 userscript replaces the city view...
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

function addNewStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addNewStyle('#city #container .phase1, #city #container .phase2, #city #container .phase3, #city #container .phase4, #city #container .phase5, #city #container .phase6, #city #container .phase7, #city #container .phase8, #city #container .phase9, #city #container .phase10, #city #container .phase11, #city #container .phase12, #city #container .phase13, #city #container .phase14, #city #container .phase15, #city #container .phase16, #city #container .phase17, #city #container .phase18, #city #container .phase19, #city #container .phase20, #city #container .phase21, #city #container .phase22, #city #container .phase23, #city #container .phase24, #city #container .phase25, #city #container .phase26, #city #container .phase27, #city #container .phase28, #city #container .phase29, #city #container .phase30, #city #container .phase31, #city #container .phase32, #city #container .phase33, #city #container .phase34, #city #container .phase35, #city #container .phase36, #city #container .phase37, #city #container .phase38, #city #container .phase39, #city #container .phase40, #city #container .phase1012 {background-image:url(http://img651.imageshack.us/img651/7080/40746379.jpg);}');
addNewStyle('#city #container #mainview #locations .wall .buildingimg {background-image:url();}');

// @resource	academy.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_academy.png
// @resource	alchemist.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_alchemist.png
// @resource	architect.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_architect.png
// @resource	barracks.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_barracks.png
// @resource	branchoffice.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_branchoffice.png
// @resource	carpentering.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_carpentering.png
// @resource	embassy.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_embassy.png
// @resource	fireworker.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_fireworker.png
// @resource	forester.png			http://i287.photobucket.com/albums/ll140/EmaXXenoN/ikariam/building_forester.png
// @resource	glassblowing.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_glassblowing.png
// @resource	museum.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_museum.png
// @resource	optician.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_optician.png
// @resource	palace.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_palace.png
// @resource	palacecolony.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_palacecolony.png
// @resource	safehouse.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_safehouse.png
// @resource	stonemason.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_stonemason.png
// @resource	tavern.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_tavern.png
// @resource	townhall.png			http://i287.photobucket.com/albums/ll140/EmaXXenoN/ikariam/building_townhall.png
// @resource	vineyard.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_vineyard.png
// @resource	warehouse.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_warehouse.png
// @resource	winegrower.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_winegrower.png
// @resource	workshop.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_workshop.png
// @resource	constructionsite.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_constructionsite.png
// @resource	city_level1_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level1_ni.jpg
// @resource	city_level2_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level2_ni.jpg
// @resource	city_level3_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level3_ni.jpg
// @resource	city_level4_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level4_ni.jpg
// @resource	city_level5_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level5_ni.jpg
// @resource	city_level6_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level6_ni.jpg
// @resource	city_level7_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level7_ni.jpg
// @resource	city_level8_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level8_ni.jpg
// @resource	city_level9_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level9_ni.jpg
// @resource	city_level10_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level10_ni.jpg
// @resource	city_level11_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level11_ni.jpg
// @resource	city_level12_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level12_ni.jpg
// @resource	city_level13_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level13_ni.jpg
// @resource	city_level14_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level14_ni.jpg
// @resource	city_level15_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level15_ni.jpg
// @resource	city_level16_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level16_ni.jpg
// @resource	city_level17_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level17_ni.jpg
// @resource	city_level18_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level18_ni.jpg
// @resource	city_level19_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level19_ni.jpg
// @resource	city_level20_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level20_ni.jpg
// @resource	city_level21_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level21_ni.jpg
// @resource	city_level22_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level22_ni.jpg
// @resource	city_level23_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level23_ni.jpg
// @resource	city_level24_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities-night/city_level24_ni.jpg
// @resource	academy_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_academy_ni.png
// @resource	alchemist_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_alchemist_ni.png
// @resource	architect_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_architect_ni.png
// @resource	barracks_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_barracks_ni.png
// @resource	branchoffice_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_branchoffice_ni.png
// @resource	carpentering_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_carpentering_ni.png
// @resource	embassy_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_embassy_ni.png
// @resource	fireworker_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_fireworker_ni.png
// @resource	forester_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_forester_ni.png
// @resource	glassblowing_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_glassblowing_ni.png
// @resource	museum_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_museum_ni.png
// @resource	optician_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_optician_ni.png
// @resource	palace_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_palace_ni.png
// @resource	palacecolony_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_palacecolony_ni.png
// @resource	port_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_port_ni.png
// @resource	safehouse_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_safehouse_ni.png
// @resource	shipyard_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_shipyard_ni.png
// @resource	stonemason_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_stonemason_ni.png
// @resource	tavern_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_tavern_ni.png
// @resource	temple_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_temple_ni.png
// @resource	townhall_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_townhall_ni.png
// @resource	vineyard_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_vineyard_ni.png
// @resource	warehouse_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_warehouse_ni.png
// @resource	wall_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_wall_ni.png
// @resource	winegrower_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_winegrower_ni.png
// @resource	workshop_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_workshop_ni.png
// @resource	constructionsite_ni.png 	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings-night/building_constructionsite_ni.png
// @resource	insel_gross_korrektur.jpg	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/insel_gross_korrektur.jpg



// ---- better buildings ----

GM_addStyle('#city #container #mainview #locations .academy	 .buildingimg	{background-image:url('+GM_getResourceURL('academy.png')+')}');
GM_addStyle('#city #container #mainview #locations .alchemist	 .buildingimg	{background-image:url('+GM_getResourceURL('alchemist.png')+')}');
GM_addStyle('#city #container #mainview #locations .architect	 .buildingimg	{background-image:url('+GM_getResourceURL('architect.png')+')}');
GM_addStyle('#city #container #mainview #locations .barracks	 .buildingimg	{background-image:url('+GM_getResourceURL('barracks.png')+')}');
GM_addStyle('#city #container #mainview #locations .branchOffice .buildingimg	{background-image:url('+GM_getResourceURL('branchoffice.png')+')}');
GM_addStyle('#city #container #mainview #locations .carpentering .buildingimg   {background-image:url('+GM_getResourceURL('carpentering.png')+')}');
GM_addStyle('#city #container #mainview #locations .embassy	 .buildingimg	{background-image:url('+GM_getResourceURL('embassy.png')+')}');
GM_addStyle('#city #container #mainview #locations .fireworker	 .buildingimg	{background-image:url('+GM_getResourceURL('fireworker.png')+')}');
GM_addStyle('#city #container #mainview #locations .forester	 .buildingimg	{background-image:url('+GM_getResourceURL('forester.png')+')}');
GM_addStyle('#city #container #mainview #locations .glassblowing .buildingimg	{background-image:url('+GM_getResourceURL('glassblowing.png')+')}');
GM_addStyle('#city #container #mainview #locations .museum	 .buildingimg	{background-image:url('+GM_getResourceURL('museum.png')+')}');
GM_addStyle('#city #container #mainview #locations .optician	 .buildingimg	{background-image:url('+GM_getResourceURL('optician.png')+')}');
GM_addStyle('#city #container #mainview #locations .palace	 .buildingimg	{background-image:url('+GM_getResourceURL('palace.png')+')}');
GM_addStyle('#city #container #mainview #locations .palaceColony .buildingimg	{background-image:url('+GM_getResourceURL('palacecolony.png')+')}');
GM_addStyle('#city #container #mainview #locations .safehouse	 .buildingimg	{background-image:url('+GM_getResourceURL('safehouse.png')+')}');
GM_addStyle('#city #container #mainview #locations .stonemason	 .buildingimg	{background-image:url('+GM_getResourceURL('stonemason.png')+')}');
GM_addStyle('#city #container #mainview #locations .tavern	 .buildingimg	{background-image:url('+GM_getResourceURL('tavern.png')+')}');
GM_addStyle('#city #container #mainview #locations .townHall	 .buildingimg	{background-image:url('+GM_getResourceURL('townhall.png')+')}');
GM_addStyle('#city #container #mainview #locations .vineyard	 .buildingimg	{background-image:url('+GM_getResourceURL('vineyard.png')+')}');
GM_addStyle('#city #container #mainview #locations .warehouse	 .buildingimg	{background-image:url('+GM_getResourceURL('warehouse.png')+')}');
GM_addStyle('#city #container #mainview #locations .winegrower	 .buildingimg	{background-image:url('+GM_getResourceURL('winegrower.png')+')}');
GM_addStyle('#city #container #mainview #locations .workshop	 .buildingimg	{background-image:url('+GM_getResourceURL('workshop.png')+')}');
GM_addStyle('#city #container #mainview #locations li .constructionSite		{background-image:url('+GM_getResourceURL('constructionsite.png')+')}');

