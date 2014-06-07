// ==UserScript==
// @name           Passover Matzot
// @version        0.1
// @namespace      http://www.erepublik.com/en?
// @description    Happy Passover
// @include        http://www.erepublik.com/*
// ==/UserScript==


items = [ /// ITEMS HERE ///
["food", "http://www.onlinedisk.ru/image/383867/mazah.gif"],


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