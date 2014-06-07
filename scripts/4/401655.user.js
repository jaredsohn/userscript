// ==UserScript==
// @name				GodVille bot
// @author			chuiii
// @namespace		http://godville.net/superhero
// @description	Trying to make hero less random and more smarter
// @include			http://godville.net/superhero*
// ==/UserScript==

var _checkLevel = function(selector){
	var lineWidth	= parseInt($(selector + ' .p_bar').attr('width'));
	var barWidth	= parseInt($(selector + ' .p_bar .p_val').attr('width'));
	return barWidth / lineWidth;
}

var checkPranaLevel = function(){ return _checkLevel('.pbar.line'); }
var checkHelthLevel = function(){ return _checkLevel('#hk_health'); }

var say = function(word){
	$('#god_phrase').val(word);
	$('#voice_submit').click();
}

var isInFight = function(){
	return $('.monster_pb').closest('div').css('display') != 'none';
}

var isInTown = function(){
	return 0;
}

var isInDungeon = function(){
	return 0;
}

var isInBossFight = function(){
	return 0;
}

var loadPrana = function(){
	$('#acc_links_wrap a').filter(function(){ return $(this).css('display') == 'inline'; }).click();
}

var tryToBeSmarter = function(){
	if( !isInFight() && !isInTown() && !isInDungeon() && !isInBossFight() ){
		if( checkPranaLevel >= 0.05 ){
			say('умней! набирайся опыта');
		} else {
			loadPrana();
		}
	}
}

window.setInterval(tryToBeSmarter, 30000);
