// ==UserScript==
// @name           Custom Battlefield Images
// @version        0.3
// @namespace      http://www.erepublik.com/en?icantbearsedtothinkupanamespace
// @description    YEAH.
// @include        http://www.erepublik.com/en/battles/show/*
// ==/UserScript==

// Each zone should be 239x59 pixels, plus have a 1 pixel border below (apart
// from underground, which has no border below it. You may also want borders
// on each side of the images.

///// START OF SETTINGS - CHANGE THEM! /////

 // All zones red apart from underground, which is "coloured"
wall_red = "http://www.erepublik.com/images/parts/battle-wall-red.gif";

 // All zones coloured apart from underground, which is red
wall_colour = "http://www.erepublik.com/images/parts/battle-wall-color.gif";

 // All zones grey apart from underground, which is red
wall_grey = "http://www.erepublik.com/images/parts/battle-wall-gray.gif";

 // 7 levels, each have three labels - grey, then red, then green.
 // Each label is 145x13 pixels and centrally-aligned in the image.
 // Make sure both sides of the label are transparent if it's < 145px wide
level_names = "http://www.erepublik.com/images/parts/level-name.gif";

 // Can be colour name ("red"), hex ("#FFA084"), rgb ("rgb(255,0,100)") or "transparent"
nomansland_colour = "#FF5959";
underground_colour = "#FF5959";

 // Image URL, leave as "none" if you don't want an image
nomansland_image = "none";
underground_image = "none";

 // Can be "repeat", "repeat-x", "repeat-y" or "no-repeat"
nomansland_image_repeat = "repeat";
underground_image_repeat = "repeat";

///// END OF SETTINGS /////

if (nomansland_image!="none") nomansland_image = "url("+nomansland_image+")";
if (underground_image!="none") underground_image = "url("+underground_image+")";

function changewall()
{
 container = document.getElementsByClassName("battleinfo_container")[0];
 if (container.style.display=="none")
 {
  setTimeout(changewall,500);
  return;
 }
 document.getElementById("battlewall").style.backgroundImage="url("+wall_red+")";
 wall_images = document.getElementsByClassName("wall_img");
 reach_conquer = false;
 for (x=0; x<wall_images.length;x++)
 {
  if (reach_conquer) wall_images[x].style.backgroundImage = "url("+wall_colour+")";
  else wall_images[x].style.backgroundImage = "url("+wall_grey+")";
  if (wall_images[x].style.height!="59px") reach_conquer = true;
 }
}

changewall();

newstyle = document.createElement("style");
newstyle.type = "text/css";
newstyle.innerHTML = "div.wall#battlewall div center span {background-image: url("+level_names+") !important}";
newstyle.innerHTML+= "div.over-wall-up {background: "+nomansland_colour+" "+nomansland_image+" "+nomansland_image_repeat+" !important}";
newstyle.innerHTML+= "div.over-wall-down {background: "+underground_colour+" "+underground_image+" "+underground_image_repeat+" !important}";
document.getElementsByTagName("head")[0].appendChild(newstyle);
