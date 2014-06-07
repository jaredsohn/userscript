// ==UserScript==
// @name           Raid Artefacts BlogShares
// @namespace      http://public.caranta.com/GM/raid_artefacts_blogshare.user.js
// @include        http://blogshares.com/user.php*use_artefact=yes
// ==/UserScript==

(function()
{
	document.getElementsByTagName('select')[1].options[7].selected = true ;
	var blog = Math.ceil((Math.random() * 1)+1) ;
	document.getElementsByTagName('select')[2].options[blog].selected = true ;
}) ();