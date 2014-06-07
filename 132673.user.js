//Fletz' Fake Sab Helper
//Created by Fletz of Snake Fist Apocalypse and the RL-LoP-FF Alliance

//To report bugs or share comments, please contact Fletz in-game
//Sharing of this script is encouraged as long as it is not modified in any manner

/* Version Information

	04/08/2012 - v1.0
	Initial version is completed and tested.

*/

// ==UserScript==
// @name           Fletz' Fake Sab Helper
// @namespace      sfascripts
// @description    By Fletz and Snake Fist Apocalypse
// @include        http://*kingsofchaos.com/attack*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//Changes value to Broken Sticks
$("form[name=spy] select[name=enemy_weapon]").val(69);

//Changes value to 5 turns per attempt
$("form[name=spy] select[name=sabturns]").val(5);