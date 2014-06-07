// ==UserScript==
// @name	Ikariam+	
// @description	Better look of the cities and buildings in Ikariam.
// @include	http://s*.ikariam.*/*
// @exclude	http://s*.ikariam.*/skin/*
// @exclude	http://s*.ikariam.*/js/*
// @exclude	http://s*.ikariam.*/index.php?action=newPlayer
//
// @resource	academy.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_academy.png
// @resource	alchemist.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_alchemist.png
// @resource	architect.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_architect.png
// @resource	barracks.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_barracks.png
// @resource	carpentering.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_carpentering.png
// @resource	embassy.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_embassy.png
// @resource	fireworker.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_fireworker.png
// @resource	forester.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_forester.png
// @resource	glassblowing.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_glassblowing.png
// @resource	museum.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_museum.png
// @resource	optician.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_optician.png
// @resource	palace.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_palace.png
// @resource	palacecolony.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_palacecolony.png
// @resource	safehouse.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_safehouse.png
// @resource	stonemason.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_stonemason.png
// @resource	tavern.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_tavern.png
// @resource	townhall.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_townhall.png
// @resource	vineyard.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_vineyard.png
// @resource	warehouse.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_warehouse.png
// @resource	winegrower.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_winegrower.png
// @resource	workshop.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_workshop.png
//
// ==/UserScript==
//
// ==Better Buildings==
GM_addStyle('#city #container #mainview #locations .academy	 .buildingimg	{background-image:url('+GM_getResourceURL('academy.png')+')}');
GM_addStyle('#city #container #mainview #locations .alchemist	 .buildingimg	{background-image:url('+GM_getResourceURL('alchemist.png')+')}');
GM_addStyle('#city #container #mainview #locations .architect	 .buildingimg	{background-image:url('+GM_getResourceURL('architect.png')+')}');
GM_addStyle('#city #container #mainview #locations .barracks	 .buildingimg	{background-image:url('+GM_getResourceURL('barracks.png')+')}');
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
// ==/Better Buildings==

