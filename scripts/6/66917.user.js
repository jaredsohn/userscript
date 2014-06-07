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
// @resource	icon-palm.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/icon-palm.png
// @resource	scroll_bg.png			http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_bg.png
// @resource	scroll_leftend.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_leftend.png
// @resource	scroll_rightend.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/scroll_rightend.png
// @resource	besatzer_schatten1.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzer_schatten1.png
// @resource	besatzer_schatten2.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/besatzer_schatten2.png
// @resource	demonstranten.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/demonstranten.png
// @resource	garnison_outpost.png		http://i556.photobucket.com/albums/ss8/Ikariam-better-city/Others/garnison_outpost.png
//
// ==/UserScript==

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

// ---- OTHERS ----

night('#city #container #mainview #locations .protester				{background-image:url('+GM_getResourceURL('demonstranten.png')+')}');
night('#city #container #mainview #locations .garnisonOutpost			{background-image:url('+GM_getResourceURL('garnison_outpost.png')+')}');
night('#city #container #mainview #locations .transporter			{background-image:url('+GM_getResourceURL('transporter.png')+')}');
night('#city #container #mainview #locations .beachboys				{background-image:url('+GM_getResourceURL('invisible.png')+')}');
night('#city #container #mainview .phase24   #locations .beachboys		{background-image:url('+GM_getResourceURL('invisible.png')+')}');

night('#city #container #mainview #locations .garnison				{background:url('+GM_getResourceURL('garnison.png')+') no-repeat;}');
night('#island #container #mainview #cities .selectimg				{background-image:url('+GM_getResourceURL('select_city.png')+')}');

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

night('#worldmap_iso #worldmap .cities						{color:#FFFFCC;}');