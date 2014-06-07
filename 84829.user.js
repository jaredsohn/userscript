// ==UserScript==
// @name             איקרים נושא יום וליל
// @version 		0.1
// @author		הראל tiger
// @namespace      http://s*.il.ikariam.*/*
// @description    מוסיף אפקט יום ולילה
// @include        http://s*.il.ikariam.*/*
// @exclude        http://s*.il.ikariam.*/skin/*
// @exclude        http://s*.il.ikariam.*/js/*
// @exclude        http://s*.il.ikariam.*/index.php?action=newPlayer
// @exclude        http://board.ikariam.*/*
//
// ==/UserScript==




// This is an adaptation of the Ikariam - Better city Script for the HEBREW servers

 var URL= "http://i765.photobucket.com/albums/xx297/firstyazmat/betterCity/";
 urlbg = "http://img144.imageshack.us/img144/3232/bgheaderni.jpg";

// ---- better cities ----

GM_addStyle('#city #container .phase1                                           {background-image:url('+URL+'city_level1.jpg)}');
GM_addStyle('#city #container .phase2                                           {background-image:url('+URL+'city_level2.jpg)}');
GM_addStyle('#city #container .phase3                                           {background-image:url('+URL+'city_level3.jpg)}');
GM_addStyle('#city #container .phase4                                           {background-image:url('+URL+'city_level4.jpg)}');
GM_addStyle('#city #container .phase5                                           {background-image:url('+URL+'city_level5.jpg)}');
GM_addStyle('#city #container .phase6                                           {background-image:url('+URL+'city_level6.jpg)}');
GM_addStyle('#city #container .phase7                                           {background-image:url('+URL+'city_level7.jpg)}');
GM_addStyle('#city #container .phase8                                           {background-image:url('+URL+'city_level8.jpg)}');
GM_addStyle('#city #container .phase9                                           {background-image:url('+URL+'city_level9.jpg)}');
GM_addStyle('#city #container .phase10                                          {background-image:url('+URL+'city_level10.jpg)}');
GM_addStyle('#city #container .phase11                                          {background-image:url('+URL+'city_level11.jpg)}');
GM_addStyle('#city #container .phase12                                          {background-image:url('+URL+'city_level12.jpg)}');
GM_addStyle('#city #container .phase13                                          {background-image:url('+URL+'city_level13.jpg)}');
GM_addStyle('#city #container .phase14                                          {background-image:url('+URL+'city_level14.jpg)}');
GM_addStyle('#city #container .phase15                                          {background-image:url('+URL+'city_level15.jpg)}');
GM_addStyle('#city #container .phase16                                          {background-image:url('+URL+'city_level16.jpg)}');
GM_addStyle('#city #container .phase17                                          {background-image:url('+URL+'city_level17.jpg)}');
GM_addStyle('#city #container .phase18                                          {background-image:url('+URL+'city_level18.jpg)}');
GM_addStyle('#city #container .phase19                                          {background-image:url('+URL+'city_level19.jpg)}');
GM_addStyle('#city #container .phase20                                          {background-image:url('+URL+'city_level20.jpg)}');
GM_addStyle('#city #container .phase21                                          {background-image:url('+URL+'city_level21.jpg)}');
GM_addStyle('#city #container .phase22                                          {background-image:url('+URL+'city_level22.jpg)}');
GM_addStyle('#city #container .phase23                                          {background-image:url('+URL+'city_level23.jpg)}');
GM_addStyle('#city #container .phase24                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase25                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase26                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase27                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase28                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase29                                          {background-image:url('+URL+'city_level24.jpg)}');
GM_addStyle('#city #container .phase30                                          {background-image:url('+URL+'city_level24.jpg)}');

// ---- better buildings ----

GM_addStyle('#city #container #mainview #locations .academy	 .buildingimg	{background-image:url('+URL+'building_academy.png)}');
GM_addStyle('#city #container #mainview #locations .alchemist	 .buildingimg	{background-image:url('+URL+'building_alchemist.png)}');
GM_addStyle('#city #container #mainview #locations .architect	 .buildingimg	{background-image:url('+URL+'building_architect.png)}');
GM_addStyle('#city #container #mainview #locations .barracks	 .buildingimg	{background-image:url('+URL+'building_barracks.png)}');
GM_addStyle('#city #container #mainview #locations .branchOffice .buildingimg	{background-image:url('+URL+'building_branchoffice.png)}');
GM_addStyle('#city #container #mainview #locations .carpentering .buildingimg   {background-image:url('+URL+'building_carpentering.png)}');
GM_addStyle('#city #container #mainview #locations .embassy	 .buildingimg	{background-image:url('+URL+'building_embassy.png)}');
GM_addStyle('#city #container #mainview #locations .fireworker	 .buildingimg	{background-image:url('+URL+'building_fireworker.png)}');
GM_addStyle('#city #container #mainview #locations .forester	 .buildingimg	{background-image:url('+URL+'building_forester.png)}');
GM_addStyle('#city #container #mainview #locations .glassblowing .buildingimg	{background-image:url('+URL+'building_glassblowing.png)}');
GM_addStyle('#city #container #mainview #locations .museum	 .buildingimg	{background-image:url('+URL+'building_museum.png)}');
GM_addStyle('#city #container #mainview #locations .optician	 .buildingimg	{background-image:url('+URL+'building_optician.png)}');
GM_addStyle('#city #container #mainview #locations .palace	 .buildingimg	{background-image:url('+URL+'building_palace.png)}');
GM_addStyle('#city #container #mainview #locations .palaceColony .buildingimg	{background-image:url('+URL+'building_palacecolony.png)}');
GM_addStyle('#city #container #mainview #locations .safehouse	 .buildingimg	{background-image:url('+URL+'building_safehouse.png)}');
GM_addStyle('#city #container #mainview #locations .stonemason	 .buildingimg	{background-image:url('+URL+'building_stonemason.png)}');
GM_addStyle('#city #container #mainview #locations .tavern	 .buildingimg	{background-image:url('+URL+'building_tavern.png)}');
GM_addStyle('#city #container #mainview #locations .townHall	 .buildingimg	{background-image:url('+URL+'building_townhall.png)}');
GM_addStyle('#city #container #mainview #locations .vineyard	 .buildingimg	{background-image:url('+URL+'building_vineyard.png)}');
GM_addStyle('#city #container #mainview #locations .warehouse	 .buildingimg	{background-image:url('+URL+'building_warehouse.png)}');
GM_addStyle('#city #container #mainview #locations .winegrower	 .buildingimg	{background-image:url('+URL+'building_winegrower.png)}');
GM_addStyle('#city #container #mainview #locations .workshop	 .buildingimg	{background-image:url('+URL+'building_workshop.png)}');
GM_addStyle('#city #container #mainview #locations li .constructionSite		{background-image:url('+URL+'building_constructionsit.png)}');

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

//-----------------------------------------------------------
//-------------just for the beachboys lvl24 bug--------------
//-----------------------------------------------------------


function getElementsByClass(tag, class){
	var elements = document.getElementsByTagName(tag);
	var results = new Array();
	for(var i=0; i<elements.length; i++){
		if(elements[i].className == class){
			results[results.length] = elements[i];
		}
	}
	return results;
}

if (( hour >= 20 && hour <= 24 || hour >= 0 && hour <= 6 ) && getElementsByClass("li","beachboys")[0] ) {
getElementsByClass("li","beachboys")[0].style.backgroundImage = "url(http://i752.photobucket.com/albums/xx165/firstcauchemar/betterCity/invisible.png)";
}


//----------------------------------------------------------
//------------------------END BUG---------------------------
//----------------------------------------------------------


function night(css) {

	//if ( hour >= 21 && hour <= 24 && getCookie('Night on/off') == 0 || hour >= 0 && hour <= 5 && getCookie('Night on/off') == 0 ) {
	if ( hour >= 20 && hour <= 24 || hour >= 0 && hour <= 6 ) {

		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);

	}
}
/*
if (getCookie('Night on/off') == 0) {
	GM_registerMenuCommand('Better city: Night mode off', createoffcookie);
} else {
	GM_registerMenuCommand('Better city: Night mode on', createoncookie);
}
*/

// ---- NIGHT ----

// ----- city areas ----

night('#city #container .phase1							{background-image:url('+URL+'city_level1_ni.jpg)}');
night('#city #container .phase2							{background-image:url('+URL+'city_level2_ni.jpg)}');
night('#city #container .phase3							{background-image:url('+URL+'city_level3_ni.jpg)}');
night('#city #container .phase4							{background-image:url('+URL+'city_level4_ni.jpg)}');
night('#city #container .phase5							{background-image:url('+URL+'city_level5_ni.jpg)}');
night('#city #container .phase6							{background-image:url('+URL+'city_level6_ni.jpg)}');
night('#city #container .phase7							{background-image:url('+URL+'city_level7_ni.jpg)}');
night('#city #container .phase8							{background-image:url('+URL+'city_level8_ni.jpg)}');
night('#city #container .phase9							{background-image:url('+URL+'city_level9_ni.jpg)}');
night('#city #container .phase10						{background-image:url('+URL+'city_level10_ni.jpg)}');
night('#city #container .phase11						{background-image:url('+URL+'city_level11_ni.jpg)}');
night('#city #container .phase12						{background-image:url('+URL+'city_level12_ni.jpg)}');
night('#city #container .phase13						{background-image:url('+URL+'city_level13_ni.jpg)}');
night('#city #container .phase14						{background-image:url('+URL+'city_level14_ni.jpg)}');
night('#city #container .phase15						{background-image:url('+URL+'city_level15_ni.jpg)}');
night('#city #container .phase16						{background-image:url('+URL+'city_level16_ni.jpg)}');
night('#city #container .phase17						{background-image:url('+URL+'city_level17_ni.jpg)}');
night('#city #container .phase18						{background-image:url('+URL+'city_level18_ni.jpg)}');
night('#city #container .phase19						{background-image:url('+URL+'city_level19_ni.jpg)}');
night('#city #container .phase20						{background-image:url('+URL+'city_level20_ni.jpg)}');
night('#city #container .phase21						{background-image:url('+URL+'city_level21_ni.jpg)}');
night('#city #container .phase22						{background-image:url('+URL+'city_level22_ni.jpg)}');
night('#city #container .phase23						{background-image:url('+URL+'city_level23_ni.jpg)}');
night('#city #container .phase24						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase25						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase26						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase27						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase28						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase29						{background-image:url('+URL+'city_level24_ni.jpg)}');
night('#city #container .phase30						{background-image:url('+URL+'city_level24_ni.jpg)}');

// ---- buildings ----

night('#city #container #mainview #locations .academy      .buildingimg		{background-image:url('+URL+'building_academy_ni.png)}');
night('#city #container #mainview #locations .alchemist	   .buildingimg		{background-image:url('+URL+'building_alchemist_ni.png)}');
night('#city #container #mainview #locations .architect	   .buildingimg		{background-image:url('+URL+'building_architect_ni.png)}');
night('#city #container #mainview #locations .barracks	   .buildingimg		{background-image:url('+URL+'building_barracks_ni.png)}');
night('#city #container #mainview #locations .branchOffice .buildingimg		{background-image:url('+URL+'building_branchoffice_ni.png)}');
night('#city #container #mainview #locations .carpentering .buildingimg		{background-image:url('+URL+'building_carpentering_ni.png)}');
night('#city #container #mainview #locations .embassy	   .buildingimg		{background-image:url('+URL+'building_embassy_ni.png)}');
night('#city #container #mainview #locations .fireworker   .buildingimg		{background-image:url('+URL+'building_fireworker_ni.png)}');
night('#city #container #mainview #locations .forester     .buildingimg		{background-image:url('+URL+'building_forester_ni.png)}');
night('#city #container #mainview #locations .glassblowing .buildingimg		{background-image:url('+URL+'building_glassblowing_ni.png)}');
night('#city #container #mainview #locations .museum	   .buildingimg		{background-image:url('+URL+'building_museum_ni.png)}');
night('#city #container #mainview #locations .optician	   .buildingimg		{background-image:url('+URL+'building_optician_ni.png)}');
night('#city #container #mainview #locations .palace	   .buildingimg		{background-image:url('+URL+'building_palace_ni.png)}');
night('#city #container #mainview #locations .palaceColony .buildingimg		{background-image:url('+URL+'building_palacecolony_ni.png)}');
night('#city #container #mainview #locations .port	   .buildingimg		{background-image:url('+URL+'building_port_ni.png)}');
night('#city #container #mainview #locations .safehouse	   .buildingimg		{background-image:url('+URL+'building_safehouse_ni.png)}');
night('#city #container #mainview #locations .shipyard	   .buildingimg		{background-image:url('+URL+'building_shipyard_ni.png)}');
night('#city #container #mainview #locations .stonemason   .buildingimg		{background-image:url('+URL+'building_stonemason_ni.png)}');
night('#city #container #mainview #locations .tavern	   .buildingimg		{background-image:url('+URL+'building_tavern_ni.png)}');
night('#city #container #mainview #locations .temple	   .buildingimg		{background-image:url('+URL+'building_temple_ni.png)}');
night('#city #container #mainview #locations .townHall	   .buildingimg		{background-image:url('+URL+'building_townhall_ni.png)}');
night('#city #container #mainview #locations .vineyard	   .buildingimg		{background-image:url('+URL+'building_vineyard_ni.png)}');
night('#city #container #mainview #locations .wall	   .buildingimg		{background-image:url('+URL+'building_wall_ni.png)}');
night('#city #container #mainview #locations .warehouse	   .buildingimg		{background-image:url('+URL+'building_warehouse_ni.png)}');
night('#city #container #mainview #locations .winegrower   .buildingimg		{background-image:url('+URL+'building_winegrower_ni.png)}');
night('#city #container #mainview #locations .workshop	   .buildingimg		{background-image:url('+URL+'building_workshop_ni.png)}');
night('#city #container #mainview #locations li .constructionSite		{background-image:url('+URL+'building_constructionsit-1.png)}');

// ---- flags ----

night('#city #container #mainview #locations .land  .flag			{background-image:url('+URL+'flag_red_ni.png)}');
night('#city #container #mainview #locations .shore .flag			{background-image:url('+URL+'flag_blue_ni.png)}');
night('#city #container #mainview #locations .wall  .flag			{background-image:url('+URL+'flag_yellow_ni.png)}');

night('#island #container #mainview #cities .buildplace .claim			{display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'flag_yellow_ni.png); width:29px; height:40px; }');

// ---- ISLANDS ----

night('#island .island1								{background-image:url('+URL+'insel_gross_korrektur.jpg)}');
night('#island .island2								{background-image:url('+URL+'insel2_gross.jpg)}');
night('#island .island3								{background-image:url('+URL+'tile3.jpg)}');
night('#island .island4								{background-image:url('+URL+'tile4.jpg)}');
night('#island .island5								{background-image:url('+URL+'insel5_gross.jpg)}');

// ---- cities red ----

night('#island #container #mainview #cities .level1 div.cityimg																		{background:url('+URL+'city_1_red.png) no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.cityimg,#island #container #mainview #cities .level3 div.cityimg										{background:url('+URL+'city_2_red.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.cityimg,#island #container #mainview #cities .level5 div.cityimg,#island #container #mainview #cities .level6 div.cityimg			{background:url('+URL+'city_3_red.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.cityimg,#island #container #mainview #cities .level8 div.cityimg,#island #container #mainview #cities .level9 div.cityimg			{background:url('+URL+'city_4_red.png) no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg			{background:url('+URL+'city_5_red.png) no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg			{background:url('+URL+'city_6_red.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.cityimg,#island #container #mainview #cities .level17 div.cityimg										{background:url('+URL+'city_7_red.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg,#island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg,#island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg,#island #container #mainview #cities .level24 div.cityimg {background:url('+URL+'city_8_red.png) no-repeat 2px 4px;}');

// ---- cities green ----

night('#island #container #mainview #cities .level1 div.allyCityImg																	{background:url('+URL+'city_1_green.png) no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.allyCityImg,#island #container #mainview #cities .level3 div.allyCityImg									{background:url('+URL+'city_2_green.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.allyCityImg,#island #container #mainview #cities .level5 div.allyCityImg,#island #container #mainview #cities .level6 div.allyCityImg		{background:url('+URL+'city_3_green.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.allyCityImg,#island #container #mainview #cities .level8 div.allyCityImg,#island #container #mainview #cities .level9 div.allyCityImg		{background:url('+URL+'city_4_green.png) no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg	{background:url('+URL+'city_5_green.png) no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg	{background:url('+URL+'city_6_green.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.allyCityImg,#island #container #mainview #cities .level17 div.allyCityImg									{background:url('+URL+'city_7_green.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg,#island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg,#island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg,#island #container #mainview #cities .level24 div.allyCityImg {background:url('+URL+'city_8_green.png) no-repeat 2px 4px;}');

// ---- cities blue ----

night('#island #container #mainview #cities .level1 div.ownCityImg																	{background:url('+URL+'city_1_blue.png) no-repeat 13px 10px;}');
night('#island #container #mainview #cities .level2 div.ownCityImg,#island #container #mainview #cities .level3 div.ownCityImg										{background:url('+URL+'city_2_blue.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level4 div.ownCityImg,#island #container #mainview #cities .level5 div.ownCityImg,#island #container #mainview #cities .level6 div.ownCityImg		{background:url('+URL+'city_3_blue.png) no-repeat 13px 13px;}');
night('#island #container #mainview #cities .level7 div.ownCityImg,#island #container #mainview #cities .level8 div.ownCityImg,#island #container #mainview #cities .level9 div.ownCityImg		{background:url('+URL+'city_4_blue.png) no-repeat 11px 13px;}');
night('#island #container #mainview #cities .level10 div.ownCityImg,#island #container #mainview #cities .level11 div.ownCityImg,#island #container #mainview #cities .level12 div.ownCityImg		{background:url('+URL+'city_5_blue.png) no-repeat 8px 13px;}');
night('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg		{background:url('+URL+'city_6_blue.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level16 div.ownCityImg,#island #container #mainview #cities .level17 div.ownCityImg									{background:url('+URL+'city_7_blue.png) no-repeat 4px 7px;}');
night('#island #container #mainview #cities .level18 div.ownCityImg,#island #container #mainview #cities .level19 div.ownCityImg,#island #container #mainview #cities .level20 div.ownCityImg,#island #container #mainview #cities .level21 div.ownCityImg,#island #container #mainview #cities .level22 div.ownCityImg,#island #container #mainview #cities .level23 div.ownCityImg,#island #container #mainview #cities .level24 div.ownCityImg {background:url('+URL+'city_8_blue.png) no-repeat 2px 4px;}');
night('#island #container #mainview #cities .city .buildCityImg																		{background-image:url(http://solarium.pezmc.com/Night/Isla_Night/ciudades_Night/city_constr.gif};');

// ---- wonders ----

night('#island #container #mainview #islandfeatures .wonder1			{background-image:url('+URL+'wonder2-1.png)}');
night('#island #container #mainview #islandfeatures .wonder2			{background-image:url('+URL+'wonder2-2.png)}');
night('#island #container #mainview #islandfeatures .wonder3			{background-image:url('+URL+'wonder2-3.png)}');
night('#island #container #mainview #islandfeatures .wonder4			{background-image:url('+URL+'wonder2-4.png)}');
night('#island #container #mainview #islandfeatures .wonder5			{background-image:url('+URL+'wonder2-5.png)}');
night('#island #container #mainview #islandfeatures .wonder6			{background-image:url('+URL+'wonder2-6.png)}');
night('#island #container #mainview #islandfeatures .wonder7			{background-image:url('+URL+'wonder2-7.png)}');
night('#island #container #mainview #islandfeatures .wonder8			{background-image:url('+URL+'wonder2-8.png)}');

// ---- resources ----

night('#island #container #mainview #islandfeatures .marble a			{background-image:url('+URL+'marmor2.png)}');
night('#island #container #mainview #islandfeatures .wood a			{background-image:url('+URL+'wood.png)}');
night('#island #container #mainview #islandfeatures .wine a			{background-image:url('+URL+'wein.png)}');
night('#island #container #mainview #islandfeatures .crystal a			{background-image:url('+URL+'kristall.png)}');
night('#island #container #mainview #islandfeatures .sulfur a			{background-image:url('+URL+'schwefel.png)}');

// ---- barbarians and forum ----

night('#island #barbarianVilliage						{background-image:url('+URL+'barbarians.png)}');
night('#island #islandfeatures .forum						{background-image:url('+URL+'icon_forum.png)}');

// --- military actions ----

night('#island #cities .foreignOccupier						{background:url('+URL+'besatzung_rot_cursor.png) no-repeat;}');
night('#island #cities .ownOccupier						{background:url('+URL+'besatzung_gruen_cursor.png) no-repeat;}');
night('#island #cities .allyOccupier						{background:url('+URL+'besatzung_gelb_cursor.png) no-repeat;}');
night('#island #cities .treatyOccupier						{background:url('+URL+'besatzung_blau_cursor.png) no-repeat;}');

night('#island #cities .foreignBlocker						{background:url('+URL+'hafenblockade_rot.png) no-repeat;}');
night('#island #cities .treatyBlocker						{background:url('+URL+'hafenblockade_gelb.png) no-repeat;}');
night('#island #cities .ownBlocker						{background:url('+URL+'hafenblockade_blau.png) no-repeat;}');
night('#island #cities .allyBlocker						{background:url('+URL+'hafenblockade_gruen.png) no-repeat;}');

night('#island #cities .seafight						{display:block;position:absolute;background:url('+URL+'seekampf_feuer.png) no-repeat;width:60px;height:40px;}');
night('#island #cities .fight							{display:block;position:absolute;background:url('+URL+'feuer.png) no-repeat;width:49px;height:41px;left:20px;bottom:10px;}');

// ---- WORLDMAP ----

// ---- islands ----

night('#worldmap_iso #worldmap .island1, #worldmap_iso #worldmap .island6		{background-image:url('+URL+'_1.png)}');
night('#worldmap_iso #worldmap .island1own, #worldmap_iso #worldmap .island6own		{background-image:url('+URL+'_1_blue.png)}');
night('#worldmap_iso #worldmap .island1ally, #worldmap_iso #worldmap .island6ally	{background-image:url('+URL+'_1_green.png)}');
night('#worldmap_iso #worldmap .island1treaty, #worldmap_iso #worldmap .island6treaty	{background-image:url('+URL+'_1_yellow.png)}');
night('#worldmap_iso #worldmap .island2, #worldmap_iso #worldmap .island7		{background-image:url('+URL+'_2.png)}');
night('#worldmap_iso #worldmap .island2own, #worldmap_iso #worldmap .island7own		{background-image:url('+URL+'_2_blue.png)}');
night('#worldmap_iso #worldmap .island2ally, #worldmap_iso #worldmap .island7ally	{background-image:url('+URL+'_2_green.png)}');
night('#worldmap_iso #worldmap .island2treaty, #worldmap_iso #worldmap .island7treaty	{background-image:url('+URL+'_2_yellow.png)}');
night('#worldmap_iso #worldmap .island3, #worldmap_iso #worldmap .island8		{background-image:url('+URL+'_3.png)}');
night('#worldmap_iso #worldmap .island3own, #worldmap_iso #worldmap .island8own		{background-image:url('+URL+'_3_blue.png)}');
night('#worldmap_iso #worldmap .island3ally, #worldmap_iso #worldmap .island8ally	{background-image:url('+URL+'_3_green.png)}');
night('#worldmap_iso #worldmap .island3treaty, #worldmap_iso #worldmap .island8treaty	{background-image:url('+URL+'_3_yellow.png)}');
night('#worldmap_iso #worldmap .island4, #worldmap_iso #worldmap .island9		{background-image:url('+URL+'_4.png)}');
night('#worldmap_iso #worldmap .island4own, #worldmap_iso #worldmap .island9own		{background-image:url('+URL+'_4_blue.png)}');
night('#worldmap_iso #worldmap .island4ally, #worldmap_iso #worldmap .island9ally	{background-image:url('+URL+'_4_green.png)}');
night('#worldmap_iso #worldmap .island4treaty, #worldmap_iso #worldmap .island9treaty	{background-image:url('+URL+'_4_yellow.png)}');
night('#worldmap_iso #worldmap .island5, #worldmap_iso #worldmap .island10		{background-image:url('+URL+'_5.png)}');
night('#worldmap_iso #worldmap .island5own, #worldmap_iso #worldmap .island10own	{background-image:url('+URL+'_5_blue.png)}');
night('#worldmap_iso #worldmap .island5ally, #worldmap_iso #worldmap .island10ally	{background-image:url('+URL+'_5_green.png)}');
night('#worldmap_iso #worldmap .island5treaty, #worldmap_iso #worldmap .island10treaty	{background-image:url('+URL+'_5_yellow.png)}');

// ---- ocean ----

night('#worldmap_iso #worldmap .ocean1						{background-image:url('+URL+'tile_ocean01.png)}');
night('#worldmap_iso #worldmap .ocean2						{background-image:url('+URL+'tile_ocean02.png)}');
night('#worldmap_iso #worldmap .ocean3						{background-image:url('+URL+'tile_ocean03.png)}');
night('#worldmap_iso #worldmap .ocean_feature1					{background-image:url('+URL+'tile_ocean01.png)}');
night('#worldmap_iso #worldmap .ocean_feature2					{background-image:url('+URL+'tile_ocean02.png)}');
night('#worldmap_iso #worldmap .ocean_feature3					{background-image:url('+URL+'tile_ocean03.png)}');
night('#worldmap_iso #worldmap .ocean_feature4					{background-image:url('+URL+'tile_ocean01.png)}');

// ---- wonders ----

night('#worldmap_iso #worldmap .wonder1						{background-image:url('+URL+'w1.png);width:19px;height:30px;}');
night('#worldmap_iso #worldmap .wonder2						{background-image:url('+URL+'w2.png);width:21px;height:27px;}');
night('#worldmap_iso #worldmap .wonder3						{background-image:url('+URL+'w3.png);width:23px;height:27px;}');
night('#worldmap_iso #worldmap .wonder4						{background-image:url('+URL+'w4.png);width:18px;height:44px;}');
night('#worldmap_iso #worldmap .wonder5						{background-image:url('+URL+'w5.png);width:17px;height:43px;}');
night('#worldmap_iso #worldmap .wonder6						{background-image:url('+URL+'w6.png);width:19px;height:39px;}');
night('#worldmap_iso #worldmap .wonder7						{background-image:url('+URL+'w7.png);width:23px;height:28px;}');
night('#worldmap_iso #worldmap .wonder8						{background-image:url('+URL+'w8.png);width:19px;height:45px;}');

// ---- resources ----

night('#worldmap_iso #worldmap .tradegood1					{background-image:url('+URL+'icon_worldmap_wine.png)}');
night('#worldmap_iso #worldmap .tradegood2					{background-image:url('+URL+'icon_worldmap_marble.png)}');
night('#worldmap_iso #worldmap .tradegood3					{background-image:url('+URL+'icon_worldmap_glass.png)}');
night('#worldmap_iso #worldmap .tradegood4					{background-image:url('+URL+'icon_worldmap_sulfur.png)}');

// ---- OTHERS ----


night('#city #container #mainview #locations .occupier1				{background-image:url('+URL+'besatzer_schatten1.png)}');
night('#city #container #mainview #locations .occupier2 			{background-image:url('+URL+'besatzer_schatten1.png)}');
night('#city #container #mainview #locations .occupierGate1			{background-image:url('+URL+'besatzer_schatten1.png)}');
night('#city #container #mainview #locations .occupierGate2			{background-image:url('+URL+'besatzer_schatten2.png)}');
night('#city #container #mainview #locations .occupierBeach			{background-image:url('+URL+'besatzer_schatten2.png)}');
night('#city #container #mainview #locations .protester				{background-image:url('+URL+'demonstranten.png)}');
night('#city #container #mainview #locations .garnisonOutpost			{background-image:url('+URL+'garnison_outpost.png)}');
night('#city #container #mainview #locations .transporter			{background-image:url('+URL+'transporter.png)}');
//night('#city #container #mainview #locations .beachboys				{background-image:url('+URL+'invisible.png)}');
//night('#city #container #mainview .phase24 #locations .beachboys				{background-image:url('+URL+'invisible.png)}');


night('#city #container #mainview #locations .garnison				{background:url('+URL+'garnison.png) no-repeat;}');
night('#island #container #mainview #cities .selectimg				{background-image:url('+URL+'select_city.png)}');
night('#header									{background:url('+urlbg+') no-repeat;}');
night('#extraDiv1								{background:url('+URL+'bg_sky_ni.jpg)}');
night('#extraDiv2								{background:url('+URL+'bg_ocean_ni.jpg)}');

night('#island #mainview #cities .city .textLabel .vacation			{color:#999;}');
night('#island #mainview #cities .city .textLabel .palm				{background-image:url('+URL+'icon-palm.png);display:block;position:absolute;top:0;left:0;height:16px;width:16px;}');
night('#island #mainview #cities .city .textLabel				{background-image:url('+URL+'scroll_bg.png)}');
night('#island #mainview #cities .city .textLabel				{color:#FFFFCC;}');
night('#island #mainview #cities .city .textLabel .before			{background-image:url('+URL+'scroll_leftend.png)}');
night('#island #mainview #cities .city .textLabel .after			{background-image:url('+URL+'scroll_rightend.png)}');

night('#city #container #mainview #locations li .timetofinish 			{background-image:url('+URL+'scroll_bg.png)}');
night('#city #container #mainview #locations li .timetofinish			{color:#FFFFCC;}');
night('#city #container #mainview #locations li .timetofinish .before		{background-image:url('+URL+'scroll_leftend.png)}');
night('#city #container #mainview #locations li .timetofinish .after		{background-image:url('+URL+'scroll_rightend.png)}');

night('#worldmap_iso #worldmap .cities						{background-image:url('+URL+'worldmap_cities.png)}');
night('#worldmap_iso #worldmap .cities						{color:#FFFFCC;}');
night('#worldmap_iso #worldmap .islandMarked					{background-image:url('+URL+'pfeil.png)}');