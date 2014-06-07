// ==UserScript==
// @name           Custom eRepublik icons
// @version        0.123
// @namespace      http://www.erepublik.com/en?RYO_E_IS_AWESOME
// @description    Change the eRepublik icons to WHATEVER YOU WANT!!!11
// @include        http://www.erepublik.com/*
// ==/UserScript==

///// CHANGE THESE URLS TO THE URLS OF THE NEW IMAGES! /////

gold = "http://www.erepublik.com/images/parts/icon-gold.gif";
ereplogo = "http://www.erepublik.com/images/parts/map-erepublik-logged.png";
background = "http://www.erepublik.com/images/bg.jpg";

items = [ /// ITEMS HERE ///
["food", "http://www.erepublik.com/images/parts/icon_industry_food.gif"],
["gift", "http://www.erepublik.com/images/parts/icon_industry_gift.gif"],
["weapon", "http://www.erepublik.com/images/parts/icon_industry_weapon.gif"],
["movingtickets", "http://www.erepublik.com/images/parts/icon_industry_movingtickets.gif"],
["grain", "http://www.erepublik.com/images/parts/icon_industry_grain.gif"],
["diamonds", "http://www.erepublik.com/images/parts/icon_industry_diamonds.gif"],
["iron", "http://www.erepublik.com/images/parts/icon_industry_iron.gif"],
["oil", "http://www.erepublik.com/images/parts/icon_industry_oil.gif"],
["wood", "http://www.erepublik.com/images/parts/icon_industry_wood.gif"],
["house", "http://www.erepublik.com/images/parts/icon_industry_house.gif"],
["hospital", "http://www.erepublik.com/images/parts/icon_industry_hospital.gif"],
["defensesystem", "http://www.erepublik.com/images/parts/icon_industry_defensesystem.gif"]
];
skills = [ /// SKILLS HERE ///
["manufacturing", "http://www.erepublik.com/images/parts/icon_skill_manufacturing.gif"],
["land", "http://www.erepublik.com/images/parts/icon_skill_land.gif"],
["constructions", "http://www.erepublik.com/images/parts/icon_skill_constructions.gif"],
["strenght", "http://www.erepublik.com/images/parts/icon_skill_strenght.gif"]
];
medals = [ /// MEDALS HERE ///
["hardworker_on", "http://www.erepublik.com/images/achievements/icon_achievement_hardworker_on.gif"],
["hardworker_off", "http://www.erepublik.com/images/achievements/icon_achievement_hardworker_off.gif"],
["congressman_on", "http://www.erepublik.com/images/achievements/icon_achievement_congressman_on.gif"],
["congressman_off", "http://www.erepublik.com/images/achievements/icon_achievement_congressman_off.gif"],
["president_on", "http://www.erepublik.com/images/achievements/icon_achievement_president_on.gif"],
["president_off", "http://www.erepublik.com/images/achievements/icon_achievement_president_off.gif"],
["mediamogul_on", "http://www.erepublik.com/images/achievements/icon_achievement_mediamogul_on.gif"],
["mediamogul_off", "http://www.erepublik.com/images/achievements/icon_achievement_mediamogul_off.gif"],
["battlehero_on", "http://www.erepublik.com/images/achievements/icon_achievement_battlehero_on.gif"],
["battlehero_off", "http://www.erepublik.com/images/achievements/icon_achievement_battlehero_off.gif"],
["resistance_on", "http://www.erepublik.com/images/achievements/icon_achievement_resistance_on.gif"],
["resistance_off", "http://www.erepublik.com/images/achievements/icon_achievement_resistance_off.gif"],
["supersoldier_on", "http://www.erepublik.com/images/achievements/icon_achievement_supersoldier_on.gif"],
["supersoldier_off", "http://www.erepublik.com/images/achievements/icon_achievement_supersoldier_off.gif"],
["society_builder_on", "http://www.erepublik.com/images/achievements/icon_achievement_society_builder_on.gif"],
["society_builder_off", "http://www.erepublik.com/images/achievements/icon_achievement_society_builder_off.gif"]
];
events = [ /// EVENTS HERE ///
["military_36", "http://www.erepublik.com/images/parts/icon_military_36.gif"], // War declared
["military_37", "http://www.erepublik.com/images/parts/icon_military_37.gif"], // MPP signed
["military_39", "http://www.erepublik.com/images/parts/icon_military_39.gif"], // Peace treaty signed
["military_40", "http://www.erepublik.com/images/parts/icon_military_40.gif"], // Region conquered
["military_41", "http://www.erepublik.com/images/parts/icon_military_41.gif"], // Region secured
["military_42", "http://www.erepublik.com/images/parts/icon_military_42.gif"], // Resistance war started
["military_93", "http://www.erepublik.com/images/parts/icon_military_93.gif"], // Region under attack
["military_94", "http://www.erepublik.com/images/parts/icon_military_94.gif"], // President impeached
["political_96", "http://www.erepublik.com/images/parts/icon_political_96.gif"], // New citizen message
["political_99_h", "http://www.erepublik.com/images/parts/icon_political_99_h.gif"], // Bought hospital
["political_99_ds", "http://www.erepublik.com/images/parts/icon_political_99_ds.gif"], // Bought defence system
["political_115", "http://www.erepublik.com/images/parts/icon_political_115.gif"], // Donation proposal accepted
["political_118", "http://www.erepublik.com/images/parts/icon_political_118.gif"], // Currency issued
["political_121", "http://www.erepublik.com/images/parts/icon_political_121.gif"], // New taxes
["political_propose_default", "http://www.erepublik.com/images/parts/icon_political_propose_default.gif"], // New proposal
["political_reject_default", "http://www.erepublik.com/images/parts/icon_political_reject_default.gif"] // Proposal rejected
];

///// End of URLS /////

// If this is set to true, the medal counter will appear at the bottom-left of the medals
const old_medal_counter = true;

items[0][1] += "#food.gif"; // Don't want to break eRepublik Plus now, do we?
items[9][1] += "#house.gif";
skills[3][1] += "#icon_skill_strenght.gif";

images = document.getElementsByTagName("img");

document.getElementById("logo").getElementsByTagName("a")[0].style.backgroundImage = "url("+ereplogo+")";

for (x in images)
{
 if (images[x].src == "http://www.erepublik.com/images/parts/icon-gold.gif")
 {
  images[x].src = gold;
  continue;
 }
 for (y in events)
 {
  if (images[x].src == "http://www.erepublik.com/images/parts/icon_"+events[y][0]+".gif")
  {
   images[x].src = events[y][1];
   images[x].width = "48";
   images[x].height = "38";
   break;
  }
 }
 for (y in items)
 {
  if (images[x].src == "http://www.erepublik.com/images/parts/icon_industry_"+items[y][0]+".gif")
  {
   images[x].src = items[y][1];
   images[x].width = "55";
   images[x].height = "55";
   break;
  }
 }
 for (y in skills)
 {
  if (images[x].src == "http://www.erepublik.com/images/parts/icon_skill_"+skills[y][0]+".gif")
  {
   images[x].src = skills[y][1];
   images[x].width = "55";
   images[x].height = "55";
   break;
  }
 }
 for (y in medals)
 {
  if (images[x].src == "http://www.erepublik.com/images/achievements/icon_achievement_"+medals[y][0]+".gif")
  {
   images[x].src = medals[y][1];
   break;
  }
 }
}

if (old_medal_counter) GM_addStyle("ul.achiev .counter{margin:0 !important;top:-17px;}");

if (location.pathname=="/en/exchange")
{
 GM_addStyle(".accountdisplay img.icon[title=GOLD]{width:0;height:0;padding:8px 11px;margin:0 5px;background:transparent url("+gold+") no-repeat scroll center;}");
 GM_addStyle(".accountdisplay img.flag[title=GOLD]{width:0;height:0;padding:8px 11px;margin:0 5px 0 0;background:transparent url("+gold+") no-repeat scroll center;}");
 GM_addStyle(".flagholder img.flag[title=GOLD]{width:0;height:0;padding:11px 15px;margin:0;background:transparent url("+gold+") no-repeat scroll center;}");
}

bgScript = document.createElement("script");
bgScript.type = "application/javascript";
bgScript.innerHTML = "function loadAmbient(){var cssDef={'background-image':'url("+background+")','background-repeat':'no-repeat','background-position':'center top'};$j('body').css(cssDef);}";
bgScript.innerHTML += "function decideAmbientGraphics(){if($j.cookie('ambientGraphic')=='0')$j('body').css({'background-image':'url("+background+")'});else $j('body').css({'background-image': 'none'});setAmbientCookie();}";
document.body.appendChild(bgScript);