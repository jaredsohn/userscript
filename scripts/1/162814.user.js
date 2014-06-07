// ==UserScript==
// @name           KOL FinalFantasy and Megaman script of Win and Sexyness
// @namespace      a
// @include		   http://127.0.0.1:*/choice.php
// @include        http://*.kingdomofloathing.com/choice.php
// @include        localhost:*.kingdomofloathing.com/choice.php

// @include		   http://127.0.0.1:*/store.php?whichstore*
// @include        http://*.kingdomofloathing.com/store.php?whichstore*
// @include        localhost:*.kingdomofloathing.com/store.php?whichstore*

// @include		   http://127.0.0.1:*/campground.php?action=grave
// @include        http://*.kingdomofloathing.com/campground.php?action=grave
// @include        localhost:*.kingdomofloathing.com/campground.php?action=grave

// @include		   http://127.0.0.1:*/adventure.php?snarfblat=301
// @include        http://*.kingdomofloathing.com/adventure.php?snarfblat=301
// @include        localhost:*.kingdomofloathing.com/adventure.php?snarfblat=301
// @include		   http://127.0.0.1:*/adventure.php?snarfblat=302
// @include        http://*.kingdomofloathing.com/adventure.php?snarfblat=302
// @include        localhost:*.kingdomofloathing.com/adventure.php?snarfblat=302
// @include		   http://127.0.0.1:*/adventure.php?snarfblat=303
// @include        http://*.kingdomofloathing.com/adventure.php?snarfblat=303
// @include        localhost:*.kingdomofloathing.com/adventure.php?snarfblat=303
// @include		   http://127.0.0.1:*/adventure.php?snarfblat=304
// @include        http://*.kingdomofloathing.com/adventure.php?snarfblat=304
// @include        localhost:*.kingdomofloathing.com/adventure.php?snarfblat=301
// @grant          none
// ==/UserScript==

//Original "bumcheekcity's Airship FFVII Win Script of Win and Sexyness" done by bumcheekcity
//Megaman Script added by Lightwolf

// Instructions:
// To change the music that plays, provide the youTube embed link of the style www.youtube.com/v/(YOUTUBE_LINK_HERE)&autoplay=1

// Update Information
// Update 0.5: - Added "re: your brains" to an open grave in zombie runs. Also set EArthbound to false by default, because it kept startling me >.<
// Update 0.4: - Added music toggles at top, so users can customize their experince
// Update 0.3: - Added earthbound Shop music to store.php
// Update 0.2: - Added Megaman stage select music to play when you aquire the "Consumbed by" effect at the start of each zone
//             - Changed Final Fantasy Victory music to play when you recieve the airship (untested) as apposed to the end of random combats in any zone
//			   - Updated the broken youtube url

// Music Toggles
var Airship_Vicotry   = true;  // Plays when you turn in imatteria
var Megaman_Crackpot  = true;  // Plays when reciving "Consumed by" when entering a crackpot megaman zone
var EarthBound_Market = false; // Plays when you first enter ANY shop
var Zombie_Reasonable = true;  // Plays when you use "an open grave" during a zombie run



var body = document.getElementsByTagName("body");
body = body[0];
var html = body.innerHTML;

if (html.indexOf("F-F-Fantastic!") > 0 && Airship_Vicotry)
{
	body.innerHTML = body.innerHTML + "<iframe width='1' height='1' src='http://www.youtube.com/v/huQoDlHmqrE&autoplay=1' frameborder='0' allowfullscreen></iframe>";
} else {
}	

if (html.indexOf("Consumed by") > 0 && Megaman_Crackpot)
{
	body.innerHTML = body.innerHTML + "<iframe width='1' height='1' src='http://www.youtube.com/v/tWMY4GLIeco&autoplay=1' frameborder='0' allowfullscreen></iframe>";

} else {
}

if (html.indexOf("Buy Item") > 0 && EarthBound_Market)
{
	body.innerHTML = body.innerHTML + "<iframe width='1' height='1' src='http://www.youtube.com/v/mjDooY1zye8&autoplay=1' frameborder='0' allowfullscreen></iframe>";
} else {
}	

if (html.indexOf("You climb down into your grave") > 0 && Zombie_Reasonable)
{
	body.innerHTML = body.innerHTML + "<iframe width='1' height='1' src='http://www.youtube.com/v/Fq6BFHfJeNE&autoplay=1' frameborder='0' allowfullscreen></iframe>";

}else{
}


