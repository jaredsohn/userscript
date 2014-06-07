// ==UserScript==
// @name           Ogame fleet awaiting
// @namespace      *ogame.*/game/index.php?page=overview*
// @description   This script refreshes overview page in ogame when a fleet reaches a planet.
// @version      1
// @date          2008-14-08
// @include        *ogame.*/game/index.php?page=overview*
// ==/UserScript==

var rel;
if(rel=document.getElementById("bxx1"))
{
	setTimeout("location.reload();",rel.title*1000);
}