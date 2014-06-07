// ==UserScript==
// @name           Island Town View test
// @namespace      http://s*.ikariam.*/*
// @description    Changes the townview to include a island, 24 different phases.
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer

// @resource dphase24 http://i256.photobucket.com/albums/hh165/Golden_Gun/Island_Mod/City_24.jpg

// ==/UserScript==

// City View Backgrounds

GM_addStyle("#city #container .phase24 {background: url(" + GM_getResourceURL("dphase24") + ");

