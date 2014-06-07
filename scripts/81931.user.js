// ==UserScript==
// @name           GLB Uncheck Reward Points
// @namespace      GLB
// @description    Unchecks the reward points checkbox by default
// @version        1.0.2
// @include        http://goallineblitz.com/game/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
window.setTimeout(function(){
	$('INPUT[name="use_rp"]').each(function(){
		$(this).prop('checked',false);
	});
},0);