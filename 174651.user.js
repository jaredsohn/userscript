// ==UserScript==
// @name        Pairs, Timepass@AppB
// @namespace   http://userscripts.org/users/wneo
// @description Automatically play the game
// @include     http://timepass.appb.in/pairs.html
// @version     1
// ==/UserScript==
$(function(){
    $(".start").click();
    for(i=0;i<12;i++){
	$(".symbol-"+i).delay((i+1)*2000).queue(function(next){
		this.click();
		next();
	   });
    }
});