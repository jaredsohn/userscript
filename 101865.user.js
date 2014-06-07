// ==UserScript==
// @name           WHO SpeedHack
// @include        http://s5.world-hack.org/*
// ==/UserScript==

unsafeWindow.battle_attack = function() {
	location.href = "javascript:void(xajax_content('1','battle','execute',xajax.getFormValues('attack'),'0',''))";
};