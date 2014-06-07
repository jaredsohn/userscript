// ==UserScript==
// @name			Manager-Icons ausblenden
// @include			http://*.die-staemme.*/game.php?*
// @include			http://*.staemme.*/game.php?*
// ==/UserScript==


//***************************************************************************
//***                                          
//**  author/copyright               : TM4rkuS
//***
//***************************************************************************/


var classes = document.getElementsByClassName("manager_icon");
classes[0].style.display = "none";
classes[1].style.display = "none";