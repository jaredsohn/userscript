// ==UserScript==
// @name           Ikariam - Better city
// @namespace      http://s*.ikariam.*/*
// @description    Changes the images at the town view, gives them a better look and adds the effect of day and night.
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// @exclude        http://board.ikariam.*/*
//
// @resource	city_level1.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level1.jpg
// @resource	city_level2.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level2.jpg
// @resource	city_level3.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level3.jpg
// @resource	city_level4.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level4.jpg
// @resource	city_level5.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level5.jpg
// @resource	city_level6.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level6.jpg
// @resource	city_level7.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level7.jpg
// @resource	city_level8.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level8.jpg
// @resource	city_level9.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level9.jpg
// @resource	city_level10.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level10.jpg
// @resource	city_level11.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level11.jpg
// @resource	city_level12.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level12.jpg
// @resource	city_level13.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level13.jpg
// @resource	city_level14.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level14.jpg
// @resource	city_level15.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level15.jpg
// @resource	city_level16.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level16.jpg
// @resource	city_level17.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level17.jpg
// @resource	city_level18.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level18.jpg
// @resource	city_level19.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level19.jpg
// @resource	city_level20.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level20.jpg
// @resource	city_level21.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level21.jpg
// @resource	city_level22.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level22.jpg
// @resource	city_level23.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level23.jpg
// @resource	city_level24.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Cities/city_level24.jpg
// @resource	academy.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_academy.png
// @resource	alchemist.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_alchemist.png
// @resource	architect.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_architect.png
// @resource	barracks.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_barracks.png
// @resource	branchoffice.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_branchoffice.png
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
// @resource	constructionsite.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Buildings/building_constructionsite.png
// @resource	city_1_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_1_red.png
// @resource	city_2_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_2_red.png
// @resource	city_3_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_3_red.png
// @resource	city_4_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_4_red.png
// @resource	city_5_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_5_red.png
// @resource	city_6_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_6_red.png
// @resource	city_7_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_7_red.png
// @resource	city_8_red.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_8_red.png
// @resource	city_1_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_1_green.png
// @resource	city_2_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_2_green.png
// @resource	city_3_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_3_green.png
// @resource	city_4_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_4_green.png
// @resource	city_5_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_5_green.png
// @resource	city_6_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_6_green.png
// @resource	city_7_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_7_green.png
// @resource	city_8_green.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_8_green.png
// @resource	city_1_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_1_blue.png
// @resource	city_2_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_2_blue.png
// @resource	city_3_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_3_blue.png
// @resource	city_4_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_4_blue.png
// @resource	city_5_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_5_blue.png
// @resource	city_6_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_6_blue.png
// @resource	city_7_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_7_blue.png
// @resource	city_8_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/city_8_blue.png
// @resource	wonder2-1.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-1.png
// @resource	wonder2-2.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-2.png
// @resource	wonder2-3.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-3.png
// @resource	wonder2-4.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-4.png
// @resource	wonder2-5.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-5.png
// @resource	wonder2-6.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-6.png
// @resource	wonder2-7.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-7.png
// @resource	wonder2-8.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wonder2-8.png
// @resource	marmor.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/marmor2.png
// @resource	wood.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wood.png
// @resource	wein.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/wein.png
// @resource	kristall.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/kristall.png
// @resource	schwefel.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/schwefel.png
// @resource	icon_forum.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/icon_forum.png
// @resource	barbarians.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Islands-night/barbarians.png
// @resource	flag_red_ni.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/flag_red_ni.png
// @resource	flag_yellow_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/flag_yellow_ni.png
// @resource	flag_blue_ni.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/flag_blue_ni.png
// @resource	besatzung_rot_cursor.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzung_rot_cursor.png
// @resource	besatzung_gruen_cursor.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzung_gruen_cursor.png
// @resource	besatzung_gelb_cursor.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzung_gelb_cursor.png
// @resource	besatzung_blau_cursor.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzung_blau_cursor.png
// @resource	hafenblockade_rot.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/hafenblockade_rot.png
// @resource	hafenblockade_gelb.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/hafenblockade_gelb.png
// @resource	hafenblockade_blau.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/hafenblockade_blau.png
// @resource	hafenblockade_gruen.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/hafenblockade_gruen.png
// @resource	seekampf_feuer.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/seekampf_feuer.png
// @resource	feuer.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/feuer.png
// @resource	transporter.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/transporter.png
// @resource	invisible.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/invisible.png
// @resource	garnison.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/garnison.png
// @resource	select_city.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/select_city.png
// @resource	bg_header_ni.jpg		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/bg_header_ni.jpg
// @resource	bg_sky_ni.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/bg_sky_ni.jpg
// @resource	bg_ocean_ni.jpg			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/bg_ocean_ni.jpg
// @resource	icon-palm.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/icon-palm.png
// @resource	scroll_bg.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_bg.png
// @resource	scroll_leftend.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_leftend.png
// @resource	scroll_rightend.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_rightend.png
// @resource	_1.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_1.png
// @resource	_1_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_1_blue.png
// @resource	_1_green.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_1_green.png
// @resource	_1_yellow.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_1_yellow.png
// @resource	_2.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_2.png
// @resource	_2_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_2_blue.png
// @resource	_2_green.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_2_green.png
// @resource	_2_yellow.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_2_yellow.png
// @resource	_3.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_3.png
// @resource	_3_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_3_blue.png
// @resource	_3_green.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_3_green.png
// @resource	_3_yellow.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_3_yellow.png
// @resource	_4.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_4.png
// @resource	_4_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_4_blue.png
// @resource	_4_green.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_4_green.png
// @resource	_4_yellow.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_4_yellow.png
// @resource	_5.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_5.png
// @resource	_5_blue.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_5_blue.png
// @resource	_5_green.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_5_green.png
// @resource	_5_yellow.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/_5_yellow.png	
// @resource	tile_ocean01.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/tile_ocean01.png
// @resource	tile_ocean02.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/tile_ocean02.png
// @resource	tile_ocean03.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/tile_ocean03.png
// @resource	w1.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w1.png
// @resource	w2.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w2.png
// @resource	w3.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w3.png
// @resource	w4.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w4.png
// @resource	w5.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w5.png
// @resource	w6.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w6.png
// @resource	w7.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w7.png
// @resource	w8.png				http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/w8.png
// @resource	icon_worldmap_glass.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/icon_worldmap_glass.png
// @resource	icon_worldmap_marble.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/icon_worldmap_marble.png
// @resource	icon_worldmap_sulfur.png	http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/icon_worldmap_sulfur.png
// @resource	icon_worldmap_wine.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/icon_worldmap_wine.png
// @resource	worldmap_cities.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/worldmap_cities.png
// @resource	pfeil.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Worldmap-night/pfeil.png
// @resource	besatzer_schatten1.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzer_schatten1.png
// @resource	besatzer_schatten2.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzer_schatten2.png
// @resource	demonstranten.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/demonstranten.png
// @resource	garnison_outpost.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/garnison_outpost.png
//
// ==/UserScript==

// ---- better cities ----

GM_addStyle('#city #container .phase1                                           {background-image:url('+GM_getResourceURL('city_level1.jpg')+')}');
GM_addStyle('#city #container .phase2                                           {background-image:url('+GM_getResourceURL('city_level2.jpg')+')}');
GM_addStyle('#city #container .phase3                                           {background-image:url('+GM_getResourceURL('city_level3.jpg')+')}');
GM_addStyle('#city #container .phase4                                           {background-image:url('+GM_getResourceURL('city_level4.jpg')+')}');
GM_addStyle('#city #container .phase5                                           {background-image:url('+GM_getResourceURL('city_level5.jpg')+')}');
GM_addStyle('#city #container .phase6                                           {background-image:url('+GM_getResourceURL('city_level6.jpg')+')}');
GM_addStyle('#city #container .phase7                                           {background-image:url('+GM_getResourceURL('city_level7.jpg')+')}');
GM_addStyle('#city #container .phase8                                           {background-image:url('+GM_getResourceURL('city_level8.jpg')+')}');
GM_addStyle('#city #container .phase9                                           {background-image:url('+GM_getResourceURL('city_level9.jpg')+')}');
GM_addStyle('#city #container .phase10                                          {background-image:url('+GM_getResourceURL('city_level10.jpg')+')}');
GM_addStyle('#city #container .phase11                                          {background-image:url('+GM_getResourceURL('city_level11.jpg')+')}');
GM_addStyle('#city #container .phase12                                          {background-image:url('+GM_getResourceURL('city_level12.jpg')+')}');
GM_addStyle('#city #container .phase13                                          {background-image:url('+GM_getResourceURL('city_level13.jpg')+')}');
GM_addStyle('#city #container .phase14                                          {background-image:url('+GM_getResourceURL('city_level14.jpg')+')}');
GM_addStyle('#city #container .phase15                                          {background-image:url('+GM_getResourceURL('city_level15.jpg')+')}');
GM_addStyle('#city #container .phase16                                          {background-image:url('+GM_getResourceURL('city_level16.jpg')+')}');
GM_addStyle('#city #container .phase17                                          {background-image:url('+GM_getResourceURL('city_level17.jpg')+')}');
GM_addStyle('#city #container .phase18                                          {background-image:url('+GM_getResourceURL('city_level18.jpg')+')}');
GM_addStyle('#city #container .phase19                                          {background-image:url('+GM_getResourceURL('city_level19.jpg')+')}');
GM_addStyle('#city #container .phase20                                          {background-image:url('+GM_getResourceURL('city_level20.jpg')+')}');
GM_addStyle('#city #container .phase21                                          {background-image:url('+GM_getResourceURL('city_level21.jpg')+')}');
GM_addStyle('#city #container .phase22                                          {background-image:url('+GM_getResourceURL('city_level22.jpg')+')}');
GM_addStyle('#city #container .phase23                                          {background-image:url('+GM_getResourceURL('city_level23.jpg')+')}');
GM_addStyle('#city #container .phase24                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase25                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase26                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase27                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase28                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase29                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');
GM_addStyle('#city #container .phase30                                          {background-image:url('+GM_getResourceURL('city_level24.jpg')+')}');

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

// ---- Day and night changer ----

var hourlocal = new Date();
var hour = hourlocal.getHours()
var oneyear = new Date(hourlocal.getTime()+365*24*60*60*1000);

function setCookie(name, value, expire) {
	document.cookie = name + '=' + escape(value) + ((expire == null) ? '' : ('; expires=' + expire.toGMTString()));
}

function createoncookie() {
	setCookie('Night on/off',0,oneyear);
	window.location.reload();
}

function createoffcookie() {
	setCookie('Night on/off',1,oneyear);
	window.location.reload();
}

function getCookie(Name){
  var search = Name + "=";
  if (document.cookie.length > 0){                      
    offset = document.cookie.indexOf(search);           
    if (offset != -1){                                 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      return unescape(document.cookie.substring(offset, end));
    }
  }
}

function night(css) {

	if ( hour >= 21 && hour <= 24 && getCookie('Night on/off') == 0 || hour >= 0 && hour <= 5 && getCookie('Night on/off') == 0 ) {

		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);

	}
}

if (getCookie('Night on/off') == 0) {
	GM_registerMenuCommand('Better city: Night mode off', createoffcookie);
} else {
	GM_registerMenuCommand('Better city: Night mode on', createoncookie);
}

// ---- NIGHT ----

// ----- city areas ----

night('#city #container .phase1							{background-image:url('+GM_getResourceURL('city_level1_ni.jpg')+')}');
night('#city #container .phase2							{background-image:url('+GM_getResourceURL('city_level2_ni.jpg')+')}');
night('#city #container .phase3							{background-image:url('+GM_getResourceURL('city_level3_ni.jpg')+')}');
night('#city #container .phase4							{background-image:url('+GM_getResourceURL('city_level4_ni.jpg')+')}');
night('#city #container .phase5							{background-image:url('+GM_getResourceURL('city_level5_ni.jpg')+')}');
night('#city #container .phase6							{background-image:url('+GM_getResourceURL('city_level6_ni.jpg')+')}');
night('#city #container .phase7							{background-image:url('+GM_getResourceURL('city_level7_ni.jpg')+')}');
night('#city #container .phase8							{background-image:url('+GM_getResourceURL('city_level8_ni.jpg')+')}');
night('#city #container .phase9							{background-image:url('+GM_getResourceURL('city_level9_ni.jpg')+')}');
night('#city #container .phase10						{background-image:url('+GM_getResourceURL('city_level10_ni.jpg')+')}');
night('#city #container .phase11						{background-image:url('+GM_getResourceURL('city_level11_ni.jpg')+')}');
night('#city #container .phase12						{background-image:url('+GM_getResourceURL('city_level12_ni.jpg')+')}');
night('#city #container .phase13						{background-image:url('+GM_getResourceURL('city_level13_ni.jpg')+')}');
night('#city #container .phase14						{background-image:url('+GM_getResourceURL('city_level14_ni.jpg')+')}');
night('#city #container .phase15						{background-image:url('+GM_getResourceURL('city_level15_ni.jpg')+')}');
night('#city #container .phase16						{background-image:url('+GM_getResourceURL('city_level16_ni.jpg')+')}');
night('#city #container .phase17						{background-image:url('+GM_getResourceURL('city_level17_ni.jpg')+')}');
night('#city #container .phase18						{background-image:url('+GM_getResourceURL('city_level18_ni.jpg')+')}');
night('#city #container .phase19						{background-image:url('+GM_getResourceURL('city_level19_ni.jpg')+')}');
night('#city #container .phase20						{background-image:url('+GM_getResourceURL('city_level20_ni.jpg')+')}');
night('#city #container .phase21						{background-image:url('+GM_getResourceURL('city_level21_ni.jpg')+')}');
night('#city #container .phase22						{background-image:url('+GM_getResourceURL('city_level22_ni.jpg')+')}');
night('#city #container .phase23						{background-image:url('+GM_getResourceURL('city_level23_ni.jpg')+')}');
night('#city #container .phase24						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase25						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase26						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase27						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase28						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase29						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');
night('#city #container .phase30						{background-image:url('+GM_getResourceURL('city_level24_ni.jpg')+')}');

// ---- buildings ----

night('#city #container #mainview #locations .academy      .buildingimg		{background-image:url('+GM_getResourceURL('academy_ni.png')+')}');
night('#city #container #mainview #locations .alchemist	   .buildingimg		{background-image:url('+GM_getResourceURL('alchemist_ni.png')+')}');
night('#city #container #mainview #locations .architect	   .buildingimg		{background-image:url('+GM_getResourceURL('architect_ni.png')+')}');
night('#city #container #mainview #locations .barracks	   .buildingimg		{background-image:url('+GM_getResourceURL('barracks_ni.png')+')}');
night('#city #container #mainview #locations .branchOffice .buildingimg		{background-image:url('+GM_getResourceURL('branchoffice_ni.png')+')}');
night('#city #container #mainview #locations .carpentering .buildingimg		{background-image:url('+GM_getResourceURL('carpentering_ni.png')+')}');
night('#city #container #mainview #locations .embassy	   .buildingimg		{background-image:url('+GM_getResourceURL('embassy_ni.png')+')}');
night('#city #container #mainview #locations .fireworker   .buildingimg		{background-image:url('+GM_getResourceURL('fireworker_ni.png')+')}');
night('#city #container #mainview #locations .forester     .buildingimg		{background-image:url('+GM_getResourceURL('forester_ni.png')+')}');
night('#city #container #mainview #locations .glassblowing .buildingimg		{background-image:url('+GM_getResourceURL('glassblowing_ni.png')+')}');
night('#city #container #mainview #locations .museum	   .buildingimg		{background-image:url('+GM_getResourceURL('museum_ni.png')+')}');
night('#city #container #mainview #locations .optician	   .buildingimg		{background-image:url('+GM_getResourceURL('optician_ni.png')+')}');
night('#city #container #mainview #locations .palace	   .buildingimg		{background-image:url('+GM_getResourceURL('palace_ni.png')+')}');
night('#city #container #mainview #locations .palaceColony .buildingimg		{background-image:url('+GM_getResourceURL('palacecolony_ni.png')+')}');
night('#city #container #mainview #locations .port	   .buildingimg		{background-image:url('+GM_getResourceURL('port_ni.png')+')}');
night('#city #container #mainview #locations .safehouse	   .buildingimg		{background-image:url('+GM_getResourceURL('safehouse_ni.png')+')}');
night('#city #container #mainview #locations .shipyard	   .buildingimg		{background-image:url('+GM_getResourceURL('shipyard_ni.png')+')}');
night('#city #container #mainview #locations .stonemason   .buildingimg		{background-image:url('+GM_getResourceURL('stonemason_ni.png')+')}');
night('#city #container #mainview #locations .tavern	   .buildingimg		{background-image:url('+GM_getResourceURL('tavern_ni.png')+')}');
night('#city #container #mainview #locations .temple	   .buildingimg		{background-image:url('+GM_getResourceURL('temple_ni.png')+')}');
night('#city #container #mainview #locations .townHall	   .buildingimg		{background-image:url('+GM_getResourceURL('townhall_ni.png')+')}');
night('#city #container #mainview #locations .vineyard	   .buildingimg		{background-image:url('+GM_getResourceURL('vineyard_ni.png')+')}');
night('#city #container #mainview #locations .wall	   .buildingimg		{background-image:url('+GM_getResourceURL('wall_ni.png')+')}');
night('#city #container #mainview #locations .warehouse	   .buildingimg		{background-image:url('+GM_getResourceURL('warehouse_ni.png')+')}');
night('#city #container #mainview #locations .winegrower   .buildingimg		{background-image:url('+GM_getResourceURL('winegrower_ni.png')+')}');
night('#city #container #mainview #locations .workshop	   .buildingimg		{background-image:url('+GM_getResourceURL('workshop_ni.png')+')}');
night('#city #container #mainview #locations li .constructionSite		{background-image:url('+GM_getResourceURL('constructionsite_ni.png')+')}');

// ---- flags ----

night('#city #container #mainview #locations .land  .flag			{background-image:url('+GM_getResourceURL('flag_red_ni.png')+')}');
night('#city #container #mainview #locations .shore .flag			{background-image:url('+GM_getResourceURL('flag_blue_ni.png')+')}');
night('#city #container #mainview #locations .wall  .flag			{background-image:url('+GM_getResourceURL('flag_yellow_ni.png')+')}');

night('#island #container #mainview #cities .buildplace .claim			{display:block; position:absolute; left:26px; bottom:20px; background-image:url('+GM_getResourceURL('flag_yellow_ni.png')+'); width:29px; height:40px; }');

// ---- ISLANDS ----

night('#island .island1								{background-image:url('+GM_getResourceURL('insel_gross_korrektur.jpg')+')}');
night('#island .island2								{background-image:url('+GM_getResourceURL('insel2_gross.jpg')+')}');
night('#island .island3								{background-image:url('+GM_getResourceURL('tile3.jpg')+')}');
night('#island .island4								{background-image:url('+GM_getResourceURL('tile4.jpg')+')}');
night('#island .island5								{background-image:url('+GM_getResourceURL('insel5_gross.jpg')+')}');

// ---- cities red ----

night('#island #container #mainview #cities .level1 div.cityimg																		{background:url('+GM_getResourceURL('city_1_red.png')+') no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.cityimg,#island #container #mainview #cities .level3 div.cityimg										{background:url('+GM_getResourceURL('city_2_red.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.cityimg,#island #container #mainview #cities .level5 div.cityimg,#island #container #mainview #cities .level6 div.cityimg			{background:url('+GM_getResourceURL('city_3_red.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.cityimg,#island #container #mainview #cities .level8 div.cityimg,#island #container #mainview #cities .level9 div.cityimg			{background:url('+GM_getResourceURL('city_4_red.png')+') no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg			{background:url('+GM_getResourceURL('city_5_red.png')+') no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg			{background:url('+GM_getResourceURL('city_6_red.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.cityimg,#island #container #mainview #cities .level17 div.cityimg										{background:url('+GM_getResourceURL('city_7_red.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg {background:url('+GM_getResourceURL('city_8_red.png')+') no-repeat 2px 4px;}');

// ---- cities green ----

night('#island #container #mainview #cities .level1 div.allyCityImg																	{background:url('+GM_getResourceURL('city_1_green.png')+') no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.allyCityImg,#island #container #mainview #cities .level3 div.allyCityImg									{background:url('+GM_getResourceURL('city_2_green.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.allyCityImg,#island #container #mainview #cities .level5 div.allyCityImg,#island #container #mainview #cities .level6 div.allyCityImg		{background:url('+GM_getResourceURL('city_3_green.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.allyCityImg,#island #container #mainview #cities .level8 div.allyCityImg,#island #container #mainview #cities .level9 div.allyCityImg		{background:url('+GM_getResourceURL('city_4_green.png')+') no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg	{background:url('+GM_getResourceURL('city_5_green.png')+') no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg	{background:url('+GM_getResourceURL('city_6_green.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.allyCityImg,#island #container #mainview #cities .level17 div.allyCityImg									{background:url('+GM_getResourceURL('city_7_green.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg {background:url('+GM_getResourceURL('city_8_green.png')+') no-repeat 2px 4px;}');

// ---- cities blue ----

night('#island #container #mainview #cities .level1 div.ownCityImg																	{background:url('+GM_getResourceURL('city_1_blue.png')+') no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.ownCityImg,#island #container #mainview #cities .level3 div.ownCityImg										{background:url('+GM_getResourceURL('city_2_blue.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.ownCityImg,#island #container #mainview #cities .level5 div.ownCityImg,#island #container #mainview #cities .level6 div.ownCityImg		{background:url('+GM_getResourceURL('city_3_blue.png')+') no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.ownCityImg,#island #container #mainview #cities .level8 div.ownCityImg,#island #container #mainview #cities .level9 div.ownCityImg		{background:url('+GM_getResourceURL('city_4_blue.png')+') no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.ownCityImg,#island #container #mainview #cities .level11 div.ownCityImg,#island #container #mainview #cities .level12 div.ownCityImg		{background:url('+GM_getResourceURL('city_5_blue.png')+') no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg		{background:url('+GM_getResourceURL('city_6_blue.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.ownCityImg,#island #container #mainview #cities .level17 div.ownCityImg									{background:url('+GM_getResourceURL('city_7_blue.png')+') no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.ownCityImg,#island #container #mainview #cities .level19 div.ownCityImg,#island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg {background:url('+GM_getResourceURL('city_8_blue.png')+') no-repeat 2px 4px;}');
night('#island #container #mainview #cities .city .buildCityImg																		{background-image:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_constr.gif};');

// ---- wonders ----

night('#island #container #mainview #islandfeatures .wonder1			{background-image:url('+GM_getResourceURL('wonder2-1.png')+')}');
night('#island #container #mainview #islandfeatures .wonder2			{background-image:url('+GM_getResourceURL('wonder2-2.png')+')}');
night('#island #container #mainview #islandfeatures .wonder3			{background-image:url('+GM_getResourceURL('wonder2-3.png')+')}');
night('#island #container #mainview #islandfeatures .wonder4			{background-image:url('+GM_getResourceURL('wonder2-4.png')+')}');
night('#island #container #mainview #islandfeatures .wonder5			{background-image:url('+GM_getResourceURL('wonder2-5.png')+')}');
night('#island #container #mainview #islandfeatures .wonder6			{background-image:url('+GM_getResourceURL('wonder2-6.png')+')}');
night('#island #container #mainview #islandfeatures .wonder7			{background-image:url('+GM_getResourceURL('wonder2-7.png')+')}');
night('#island #container #mainview #islandfeatures .wonder8			{background-image:url('+GM_getResourceURL('wonder2-8.png')+')}');

// ---- resources ----

night('#island #container #mainview #islandfeatures .marble a			{background-image:url('+GM_getResourceURL('marmor.png')+')}');
night('#island #container #mainview #islandfeatures .wood a			{background-image:url('+GM_getResourceURL('wood.png')+')}');
night('#island #container #mainview #islandfeatures .wine a			{background-image:url('+GM_getResourceURL('wein.png')+')}');
night('#island #container #mainview #islandfeatures .crystal a			{background-image:url('+GM_getResourceURL('kristall.png')+')}');
night('#island #container #mainview #islandfeatures .sulfur a			{background-image:url('+GM_getResourceURL('schwefel.png')+')}');

// ---- barbarians and forum ----

night('#island #barbarianVilliage						{background-image:url('+GM_getResourceURL('barbarians.png')+')}');
night('#island #islandfeatures .forum						{background-image:url('+GM_getResourceURL('icon_forum.png')+')}');

// --- military actions ----

night('#island #cities .foreignOccupier						{background:url('+GM_getResourceURL('besatzung_rot_cursor.png')+') no-repeat;}');
night('#island #cities .ownOccupier						{background:url('+GM_getResourceURL('besatzung_gruen_cursor.png')+') no-repeat;}');
night('#island #cities .allyOccupier						{background:url('+GM_getResourceURL('besatzung_gelb_cursor.png')+') no-repeat;}');
night('#island #cities .treatyOccupier						{background:url('+GM_getResourceURL('besatzung_blau_cursor.png')+') no-repeat;}');

night('#island #cities .foreignBlocker						{background:url('+GM_getResourceURL('hafenblockade_rot.png')+') no-repeat;}');
night('#island #cities .treatyBlocker						{background:url('+GM_getResourceURL('hafenblockade_gelb.png')+') no-repeat;}');
night('#island #cities .ownBlocker						{background:url('+GM_getResourceURL('hafenblockade_blau.png')+') no-repeat;}');
night('#island #cities .allyBlocker						{background:url('+GM_getResourceURL('hafenblockade_gruen.png')+') no-repeat;}');

night('#island #cities .seafight						{display:block;position:absolute;background:url('+GM_getResourceURL('seekampf_feuer.png')+') no-repeat;width:60px;height:40px;}');
night('#island #cities .fight							{display:block;position:absolute;background:url('+GM_getResourceURL('feuer.png')+') no-repeat;width:49px;height:41px;left:20px;bottom:10px;}');

// ---- WORLDMAP ----

// ---- islands ----

night('#worldmap_iso #worldmap .island1, #worldmap_iso #worldmap .island6		{background-image:url('+GM_getResourceURL('_1.png')+')}');
night('#worldmap_iso #worldmap .island1own, #worldmap_iso #worldmap .island6own		{background-image:url('+GM_getResourceURL('_1_blue.png')+')}');
night('#worldmap_iso #worldmap .island1ally, #worldmap_iso #worldmap .island6ally	{background-image:url('+GM_getResourceURL('_1_green.png')+')}');
night('#worldmap_iso #worldmap .island1treaty, #worldmap_iso #worldmap .island6treaty	{background-image:url('+GM_getResourceURL('_1_yellow.png')+')}');
night('#worldmap_iso #worldmap .island2, #worldmap_iso #worldmap .island7		{background-image:url('+GM_getResourceURL('_2.png')+')}');
night('#worldmap_iso #worldmap .island2own, #worldmap_iso #worldmap .island7own		{background-image:url('+GM_getResourceURL('_2_blue.png')+')}');
night('#worldmap_iso #worldmap .island2ally, #worldmap_iso #worldmap .island7ally	{background-image:url('+GM_getResourceURL('_2_green.png')+')}');
night('#worldmap_iso #worldmap .island2treaty, #worldmap_iso #worldmap .island7treaty	{background-image:url('+GM_getResourceURL('_2_yellow.png')+')}');
night('#worldmap_iso #worldmap .island3, #worldmap_iso #worldmap .island8		{background-image:url('+GM_getResourceURL('_3.png')+')}');
night('#worldmap_iso #worldmap .island3own, #worldmap_iso #worldmap .island8own		{background-image:url('+GM_getResourceURL('_3_blue.png')+')}');
night('#worldmap_iso #worldmap .island3ally, #worldmap_iso #worldmap .island8ally	{background-image:url('+GM_getResourceURL('_3_green.png')+')}');
night('#worldmap_iso #worldmap .island3treaty, #worldmap_iso #worldmap .island8treaty	{background-image:url('+GM_getResourceURL('_3_yellow.png')+')}');
night('#worldmap_iso #worldmap .island4, #worldmap_iso #worldmap .island9		{background-image:url('+GM_getResourceURL('_4.png')+')}');
night('#worldmap_iso #worldmap .island4own, #worldmap_iso #worldmap .island9own		{background-image:url('+GM_getResourceURL('_4_blue.png')+')}');
night('#worldmap_iso #worldmap .island4ally, #worldmap_iso #worldmap .island9ally	{background-image:url('+GM_getResourceURL('_4_green.png')+')}');
night('#worldmap_iso #worldmap .island4treaty, #worldmap_iso #worldmap .island9treaty	{background-image:url('+GM_getResourceURL('_4_yellow.png')+')}');
night('#worldmap_iso #worldmap .island5, #worldmap_iso #worldmap .island10		{background-image:url('+GM_getResourceURL('_5.png')+')}');
night('#worldmap_iso #worldmap .island5own, #worldmap_iso #worldmap .island10own	{background-image:url('+GM_getResourceURL('_5_blue.png')+')}');
night('#worldmap_iso #worldmap .island5ally, #worldmap_iso #worldmap .island10ally	{background-image:url('+GM_getResourceURL('_5_green.png')+')}');
night('#worldmap_iso #worldmap .island5treaty, #worldmap_iso #worldmap .island10treaty	{background-image:url('+GM_getResourceURL('_5_yellow.png')+')}');

// ---- ocean ----

night('#worldmap_iso #worldmap .ocean1						{background-image:url('+GM_getResourceURL('tile_ocean01.png')+')}');
night('#worldmap_iso #worldmap .ocean2						{background-image:url('+GM_getResourceURL('tile_ocean02.png')+')}');
night('#worldmap_iso #worldmap .ocean3						{background-image:url('+GM_getResourceURL('tile_ocean03.png')+')}');
night('#worldmap_iso #worldmap .ocean_feature1					{background-image:url('+GM_getResourceURL('tile_ocean01.png')+')}');
night('#worldmap_iso #worldmap .ocean_feature2					{background-image:url('+GM_getResourceURL('tile_ocean02.png')+')}');
night('#worldmap_iso #worldmap .ocean_feature3					{background-image:url('+GM_getResourceURL('tile_ocean03.png')+')}');
night('#worldmap_iso #worldmap .ocean_feature4					{background-image:url('+GM_getResourceURL('tile_ocean01.png')+')}');

// ---- wonders ----

night('#worldmap_iso #worldmap .wonder1						{background-image:url('+GM_getResourceURL('w1.png')+');width:19px;height:30px;}');
night('#worldmap_iso #worldmap .wonder2						{background-image:url('+GM_getResourceURL('w2.png')+');width:21px;height:27px;}');
night('#worldmap_iso #worldmap .wonder3						{background-image:url('+GM_getResourceURL('w3.png')+');width:23px;height:27px;}');
night('#worldmap_iso #worldmap .wonder4						{background-image:url('+GM_getResourceURL('w4.png')+');width:18px;height:44px;}');
night('#worldmap_iso #worldmap .wonder5						{background-image:url('+GM_getResourceURL('w5.png')+');width:17px;height:43px;}');
night('#worldmap_iso #worldmap .wonder6						{background-image:url('+GM_getResourceURL('w6.png')+');width:19px;height:39px;}');
night('#worldmap_iso #worldmap .wonder7						{background-image:url('+GM_getResourceURL('w7.png')+');width:23px;height:28px;}');
night('#worldmap_iso #worldmap .wonder8						{background-image:url('+GM_getResourceURL('w8.png')+');width:19px;height:45px;}');

// ---- resources ----

night('#worldmap_iso #worldmap .tradegood1					{background-image:url('+GM_getResourceURL('icon_worldmap_wine.png')+')}');
night('#worldmap_iso #worldmap .tradegood2					{background-image:url('+GM_getResourceURL('icon_worldmap_marble.png')+')}');
night('#worldmap_iso #worldmap .tradegood3					{background-image:url('+GM_getResourceURL('icon_worldmap_glass.png')+')}');
night('#worldmap_iso #worldmap .tradegood4					{background-image:url('+GM_getResourceURL('icon_worldmap_sulfur.png')+')}');

// ---- OTHERS ----

night('#city #container #mainview #locations .occupier1				{background-image:url('+GM_getResourceURL('besatzer_schatten1.png')+')}');
night('#city #container #mainview #locations .occupier2 			{background-image:url('+GM_getResourceURL('besatzer_schatten1.png')+')}');
night('#city #container #mainview #locations .occupierGate1			{background-image:url('+GM_getResourceURL('besatzer_schatten1.png')+')}');
night('#city #container #mainview #locations .occupierGate2			{background-image:url('+GM_getResourceURL('besatzer_schatten2.png')+')}');
night('#city #container #mainview #locations .occupierBeach			{background-image:url('+GM_getResourceURL('besatzer_schatten2.png')+')}');
night('#city #container #mainview #locations .protester				{background-image:url('+GM_getResourceURL('demonstranten.png')+')}');
night('#city #container #mainview #locations .garnisonOutpost			{background-image:url('+GM_getResourceURL('garnison_outpost.png')+')}');
night('#city #container #mainview #locations .transporter			{background-image:url('+GM_getResourceURL('transporter.png')+')}');
night('#city #container #mainview #locations .beachboys				{background-image:url('+GM_getResourceURL('invisible.png')+')}');
night('#city #container #mainview .phase24   #locations .beachboys		{background-image:url('+GM_getResourceURL('invisible.png')+')}');

night('#city #container #mainview #locations .garnison				{background:url('+GM_getResourceURL('garnison.png')+') no-repeat;}');
night('#island #container #mainview #cities .selectimg				{background-image:url('+GM_getResourceURL('select_city.png')+')}');
night('#header									{background:url('+GM_getResourceURL('bg_header_ni.jpg')+') no-repeat;}');
night('#extraDiv1								{background:url('+GM_getResourceURL('bg_sky_ni.jpg')+')}');
night('#extraDiv2								{background:url('+GM_getResourceURL('bg_ocean_ni.jpg')+')}');

night('#island #mainview #cities .city .textLabel .vacation			{color:#999;}');
night('#island #mainview #cities .city .textLabel .palm				{background-image:url('+GM_getResourceURL('icon-palm.png')+');display:block;position:absolute;top:0;left:0;height:16px;width:16px;}');
night('#island #mainview #cities .city .textLabel				{background-image:url('+GM_getResourceURL('scroll_bg.png')+')}');
night('#island #mainview #cities .city .textLabel				{color:#FFFFCC;}');
night('#island #mainview #cities .city .textLabel .before			{background-image:url('+GM_getResourceURL('scroll_leftend.png')+')}');
night('#island #mainview #cities .city .textLabel .after			{background-image:url('+GM_getResourceURL('scroll_rightend.png')+')}');

night('#city #container #mainview #locations li .timetofinish 			{background-image:url('+GM_getResourceURL('scroll_bg.png')+')}');
night('#city #container #mainview #locations li .timetofinish			{color:#FFFFCC;}');
night('#city #container #mainview #locations li .timetofinish .before		{background-image:url('+GM_getResourceURL('scroll_leftend.png')+')}');
night('#city #container #mainview #locations li .timetofinish .after		{background-image:url('+GM_getResourceURL('scroll_rightend.png')+')}');

night('#worldmap_iso #worldmap .cities						{background-image:url('+GM_getResourceURL('worldmap_cities.png')+')}');
night('#worldmap_iso #worldmap .cities						{color:#FFFFCC;}');
night('#worldmap_iso #worldmap .islandMarked					{background-image:url('+GM_getResourceURL('pfeil.png')+')}');