// ==UserScript==
// @name           Aprocalypse's Plot Titles
// @namespace      http://kolmods.com/aprocalypse/
// @description    Version 0.0 - Adds titles to mushrooms in the knoll
// @include        http://*kingdomofloathing.com/knoll_mushrooms.php*
// @include        http://127.0.0.1:60*/knoll_mushrooms.php*
// ==/UserScript==

var imageArray = document.getElementsByTagName('img');
for (var i = 0; i < imageArray.length; i++)
{
  if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/iceshroom.gif" )  
  {
   imageArray[i].title = "Frozen Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/mushroom.gif" )  
  {
   imageArray[i].title = "Knob Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/bmushroom.gif" ) 
  {
   imageArray[i].title = "Knoll Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/spooshroom.gif" )  
  {
   imageArray[i].title = "Spooky Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/mushsprout.gif" )
  {
 
   imageArray[i].title = "Mushroom Sprout";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/tallshroom.gif" )
  {
   imageArray[i].title = "Pointy Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/flatshroom.gif" )
  {
   imageArray[i].title = "Warm Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/plaidroom.gif" )
  {
   imageArray[i].title = "Cool Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/stinkshroo.gif" )
  {
   imageArray[i].title = "Stinky Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/fireshroom.gif" )  
  {
   imageArray[i].title = "Flaming Mushroom";
  }

  else if (imageArray[i].src == "http://images.kingdomofloathing.com/itemimages/blackshroo.gif" )  
  {
   imageArray[i].title = "Gloomy Black Mushroom";
  }

}   	