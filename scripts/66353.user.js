// ==UserScript==
// @name				KO Champs
// @namespace		http://localhost.localdomain
// @include			http://www.ko-champs.com/*
// @require			http://code.jquery.com/jquery-latest.js
// @author			caesar2k
// ==/UserScript==

var config = {
	/*
	 * Options to be set before fighting the opponent
	 */
	before_fight: {
		/*
		 * Cutman values:
		 * 0 - None
		 * 1 - 1 KO  - KO$ 1000
		 * 2 - 2 KOs - KO$ 5000
		 * 3 - 3 KOs - KO$ 10000
		 */
		cutman: 3,
		/*
		 * Coach values:
		 * 0 - None
		 * 1 - 10 RLR - KO$ 1000
		 * 2 - 20 RLR - KO$ 5000
		 * 3 - 30 RLR - KO$ 10000
		 */
		coach: 3,
		/*
		 * Anthem values:
		 * 0 - None
		 * 1 - 30 TRL - KO$ 5000
		 * 2 - 60 TRL - KO$ 7500
		 * 3 - 90 TRL - KO$ 10000
		 */
		anthem: 3
	},
	/*
	 * Training, each value represent a slot, from 1 to 10.
	 * Leave blank for random, or put only one value to fill
	 * all the available slots
	 */
	training_queue: function(){
		return [TRAIN_HEAD_DOUBLE,TRAIN_BODY_DOUBLE,TRAIN_SERIES];
	},
	/*
	 *
	 */
	fight_on:{
		min_punches: function(){
			return new Array(
				{move: PUNCH_SERIES_HEAD_LLR, min: 10}
			);
		},
		min_defenses: function(){
			return new Array(
				{move: DEF_BODY_DOUBLE, min: 10},
				{move: DEF_HEAD_DOUBLE, min: 10}
			);
		}
	},
	/*
	 * Rounds strategy
	 * Repeat the {} for each round. If no other is specified, then it will be the same
	 * strategy for all rounds. The picked up punches and defenses are always random
	 */
	rounds: [
	// ROUND 1 (and repeat)
	{
		/*
			 * Can be any of the values below:
			 * STRAT_NEUTRAL
			 * STRAT_OFFENSIVE
			 * STRAT_DEFENSIVE
			 */
		strategy: function(){
			return STRAT_NEUTRAL
		},
		/*
			 * Use the constants below (PUNCHES CONSTANTS)
			 * Leave blank to use everything available
			 */
		use_punches: function(){
			return new Array(
				{
					available:1,
					moves:[PUNCH_JAB_RIGHT, PUNCH_JAB_LEFT]
				},
				{
					available:2,
					moves:[PUNCH_SERIES_HEAD_LLR, PUNCH_SERIES_HEAD_RRL, PUNCH_SERIES_BODY_LLR, PUNCH_SERIES_BODY_RRL]
				},
				{
					available:4,
					moves:[PUNCH_STRAIGH_HEAD_LEFT, PUNCH_STRAIGH_HEAD_RIGHT, PUNCH_HOOK_LEFT, PUNCH_HOOK_RIGHT]
				}
			);
		},
		/*
			 * Use the constants below (DEFENSES CONSTANTS)
			 * Leave blank to use everything available
			 */
		use_defenses: function(){
			return new Array(
				{
					available:2,
					moves:[DEF_BODY_DOUBLE,DEF_HEAD_DOUBLE]
				},
				{
					available:5,
					moves:[DEF_HEAD_LEFT,DEF_HEAD_RIGHT,DEF_BODY_LEFT,DEF_BODY_RIGHT]
				}
			);
		}
	}
	]
};

var active	= false;
var hTimer	= null;
var level		= 1;
var money		= 0;

const base_url = 'http://www.ko-champs.com';

/**
 * TRAINING CONSTANTS
 **/

const TRAIN_UPPERCUT		= 0;
const TRAIN_COMBO				= 1;
const TRAIN_SERIES			= 2;
const TRAIN_HAYMAKER		= 3;
const TRAIN_HAMMER			= 4;
const TRAIN_HEADBUTT		= 5;
const TRAIN_LOWBLOW			= 6;
const TRAIN_HEAD_DOUBLE	= 7;
const TRAIN_BODY_DOUBLE	= 8;
const TRAIN_SIDESTEP		= 9;
const TRAIN_POWERFIGHT	= 10;
const TRAIN_POWERPUNCH	= 11;

var training = [
'HIT-UPPERCUT',
'HIT-COMBINATION',
'HIT-SERIES',
'HIT-HAYMAKER',
'HIT-HAMMER',
'HIT-HEADNUT',
'HIT-LOWBLOW',
'DEFENSE-HEAD-DOUBLE',
'DEFENSE-BODY-DOUBLE',
'DEFENSE-SIDESTEP',
'POWER-FIGHT',
'POWERPUNCH'
];

/**
 * STRATEGY CONSTANTS
 **/

const STRAT_NEUTRAL		= 0;
const STRAT_OFFENSIVE	= 1;
const STRAT_DEFENSIVE	= 2;

var strategies = [
'roundSettingsStrategy_neutral',
'roundSettingsStrategy_offensive',
'roundSettingsStrategy_defensive'
];

/**
 * PUNCHES CONSTANTS
 **/

const PUNCH_JAB_RIGHT						= 0;
const PUNCH_JAB_LEFT						= 1;
const PUNCH_STRAIGH_HEAD_LEFT		= 2;
const PUNCH_STRAIGH_HEAD_RIGHT	= 3;
const PUNCH_HOOK_LEFT						= 4;
const PUNCH_HOOK_RIGHT					= 5;
const PUNCH_SERIES_HEAD_LLR			= 6;
const PUNCH_SERIES_HEAD_RRL			= 7;
const PUNCH_SERIES_BODY_LLR			= 8;
const PUNCH_SERIES_BODY_RRL			= 9;
const PUNCH_HAYMAKER						= 10;
const PUNCH_HAMMER							= 11;

var punches = [
{
	id: 'move_HIT_JAP_HEAD_L',
	cost: 10
},
{
	id: 'move_HIT_JAP_HEAD_R',
	cost: 10
},
{
	id: 'move_HIT_STRAIGHT_HEAD_L',
	cost: 20
},
{
	id: 'move_HIT_STRAIGHT_HEAD_R',
	cost: 20
},
{
	id: 'move_HIT_HOOK_BODY_L',
	cost: 20
},
{
	id: 'move_HIT_HOOK_BODY_R',
	cost: 20
},
{
	id: 'move_HIT_SERIES_HEAD_LLR',
	cost: 45
},
{
	id: 'move_HIT_SERIES_HEAD_RRL',
	cost: 45
},
{
	id: 'move_HIT_SERIES_BODY_LLR',
	cost: 45
},
{
	id: 'move_HIT_SERIES_BODY_RRL',
	cost: 45
},
{
	id: 'move_HIT_HAYMAKER_BODY_C',
	cost: 50
},
{
	id: 'move_HIT_HAMMER_HEAD_C',
	cost: 50
},
{
	id: 'move_HIT_HEADNUT_HEAD_C',
	cost: 60
},
{
	id: 'move_HIT_LOWBLOW_BODY_C',
	cost: 60
}
];

/**
 * DEFENSE CONSTANTS
 **/
const DEF_HEAD_LEFT = 0;
const DEF_HEAD_RIGHT = 1;
const DEF_BODY_LEFT = 2;
const DEF_BODY_RIGHT = 3;
const DEF_BODY_DOUBLE = 4;
const DEF_HEAD_DOUBLE = 5;
const DEF_SIDESTEP = 6;

var defenses = [
{
	id: 'move_DEFENSE_HEAD_L',
	cost: 10
},
{
	id: 'move_DEFENSE_HEAD_R',
	cost: 10
},
{
	id: 'move_DEFENSE_BODY_R',
	cost: 10
},
{
	id: 'move_DEFENSE_BODY_L',
	cost: 10
},
{
	id: 'move_DEFENSE_HEAD-DOUBLE_C',
	cost: 20
},
{
	id: 'move_DEFENSE_BODY-DOUBLE_C',
	cost: 20
},
{
	id: 'move_DEFENSE_SIDESTEP_C',
	cost: 30
}
];

/*********** END OF CONSTANTS *************/

/*********** HELPER FUNCTIONS *************/
function safeWrap(f) {
	return function() {
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
	};
}

function rand(minVal, maxVal, floatVal){
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

Array.prototype.clone = function () {
	var arr1 = new Array(); 
	for (var property in this) {
		arr1[property] = typeof (this[property]) == 'object' ? this[property].clone() : this[property]
	}
	return arr1;
}

function strncmp ( str1, str2, lgth ) {
	// Binary safe string comparison
	//
	// version: 905.3122
	// discuss at: http://phpjs.org/functions/strncmp
	// +      original by: Waldo Malqui Silva
	// +         input by: Steve Hilder
	// +      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +       revised by: gorthaur
	// + reimplemented by: Brett Zamir (http://brett-zamir.me)
	// *     example 1: strncmp('aaa', 'aab', 2);
	// *     returns 1: 0
	// *     example 2: strncmp('aaa', 'aab', 3 );
	// *     returns 2: -1
	var s1 = (str1+'').substr(0, lgth);
	var s2 = (str2+'').substr(0, lgth);

	return ( ( s1 == s2 ) ? 0 : ( ( s1 > s2 ) ? 1 : -1 ) );
}

function empty( mixed_var ) {
	if (mixed_var === ""
		|| mixed_var === 0
		|| mixed_var === "0"
		|| mixed_var === null
		|| mixed_var === false
		|| mixed_var === undefined
		|| typeof(mixed_var) == "undefined"
		){
		return true;
	}
	if (typeof(mixed_var) == 'object') {
		for (var i in mixed_var) {
			return false;
		}
		return true;
	}
	return false;
}

function array_dupe(array) {
	return [].concat(array);
}

function array_rand ( input, num_req ) {
	// Return key/keys for random entry/entries in the array
	//
	// version: 905.412
	// discuss at: http://phpjs.org/functions/array_rand
	// +   original by: Waldo Malqui Silva
	// *     example 1: array_rand( ['Kevin'], 1 );
	// *     returns 1: 0
	var indexes = [];
	var ticks = num_req || 1;
	var checkDuplicate = function ( input, value ) {
		var exist = false, index = 0;
		while ( index < input.length ) {
			if ( input [ index ] === value ) {
				exist = true;
				break;
			}
			index++;
		}
		return exist;
	};

	if ( input instanceof Array && ticks <= input.length ) {
		while ( true ) {
			var rand = Math.floor( ( Math.random( ) * input.length ) );
			if ( indexes.length === ticks ) {
				break;
			}
			if ( !checkDuplicate( indexes, rand ) ) {
				indexes.push( rand );
			}
		}
	} else {
		indexes = null;
	}

	return ( ( ticks == 1 ) ? indexes.join( ) : indexes );
}


function in_array(p_val, arr) {
	if (typeof(arr) != "object") return false;

	for(var i = 0, l = arr.length; i < l; i++) {
		if(arr[i] == p_val) {
			return true;
		}
	}
	return false;
}
/********** END HELPER FUNCTIONS **************/
fetch_value = function(value, mod) {
	switch (value) {
		case 1:
			if (mod == true) {
				price = 5000;
			} else price = 1000;
			break;
		case 2:
			if (mod == true) {
				price = 7500;
			} else price = 5000;
			break;
		case 3:
			price = 10000;
			break;
		default:
			price = 0;
			break;
	}
	return price;
};

set_option = function(type, value){
	var opt = null;
	price = 0;

	switch (type) {
		case 'cutman':
			opt = unsafeWindow.$('#fightPrepareCutman');
			price = fetch_value(value);
			break;
		case 'coach':
			opt = unsafeWindow.$('#fightPrepareTrainer');
			price = fetch_value(value);
			break;
		case 'anthem':
			opt = unsafeWindow.$('#fightPrepareHymn');
			price = fetch_value(value, true);
			break;
	}

	if (opt !== null) {
		
		while (money < price){
			value--;
			price = fetch_value(value, type == 'anthem');
		}
		
		opt.children('div[rel^="' + value + '-"]').click();
	}
}

parse_money = function(in_money){
	var regex = /KO\$\s([0-9\,]+)/i;
	return parseInt(in_money.match(regex)[1].replace(/\,/g,''));
}

get_money = function(){
	var in_money = $('div#statusBarAccount strong a').text();
	money = parse_money(in_money);
}

get_current_level = function(){
	var in_level = $('div#statusBarLevel strong').text();
	var regex = /\((\d{1})\)/i; // Fetch the level
	level = parseInt(in_level.match(regex)[1]);
}

delay_visit_link = function(url){
	window.setTimeout(function(){
		window.location.assign(url);
	}, 1000);
}

accept_modal = function(){
	var f, max = 1000;
	while (true) {
		f = unsafeWindow.$('#modalFormConfirm:visible');
		if (f.text()) break;
		f = null;
		max--;
		if (!max) return;
	}
	f.click();
}

close_flash = function(){
	var f, max = 10000;
	while (true) {
		f = unsafeWindow.$('#modalContainer a.modalClose');
		if (typeof(f) != 'undefined') break;
		f = null;
		max--;
		if (!max) return;
	}
	f.click();
}

press_ok = function(){
	var f, max = 10000;
	while (true) {
		f = unsafeWindow.$('.modalClose.modalFormClose');
		if (f.length > 0) break;
		f = null;
		max--;
		if (!max) return;
	}
	f.click();
}

start_training = function(){
	if ($('span#trainingDuration').text()) return true;
	
	var training_spots = $('div.trainingItem.available').size();

	for (i = 0; i < training_spots; i++) {
		tlen = config.training_queue().length;
		if (tlen > 0) {
			name = training[config.training_queue()[i % tlen]];
		} else {
			name = training[rand(0, training.length-1)];
		}
		var workout = unsafeWindow.$('div[rel="'+ name +'"]');
		workout.click();
	}
	unsafeWindow.$('div.formSubmit').click();
	accept_modal();
	return false;
}

set_ready_to_fight = function(val) {
	unsafeWindow.$('#changeBattleReadiness').trigger('click');
	
	switch (val) {
		case false:
		case '0':
		case 0:
			window.setTimeout(function(){
				while ($('#modalFormBattleReadiness').is(':visible')) unsafeWindow.$('#battleReady_no').trigger('click');
			}, 1000);
			break;
		case true:
		case '1':
		case 1:
			window.setTimeout(function(){
				while ($('#modalFormBattleReadiness').is(':visible')) unsafeWindow.$('#battleReady_yes').trigger('click');
			}, 1000);
			break;
	}
	return false;
}

upgrade_gym = function(){
	if ($('span#buildTimer').text()) return true;
	if ($('#formBuildTrainingArea').size() && parse_money($('#formBuildTrainingArea').text()) > money) return true;
	unsafeWindow.$('div.formSubmit').click();
	accept_modal();
	return false;
}

upgrade_arena = function(){
	if ($('span#buildTimer').text()) return true;
	if ($('#formBuildEventArea').size() && parse_money($('#formBuildEventArea').text()) > money) return true;
	unsafeWindow.$('div.formSubmit').click();
	accept_modal();
	return false;
}

upgrade_press = function(){
	if ($('span#buildTimer').text()) return true;
	if ($('#formProgressPress').size() && parse_money($('#formProgressPress').text()) > money) return true;
	unsafeWindow.$('div.formSubmit').click();
	accept_modal();
	return false;
}

find_opponent = function(){
	unsafeWindow.$('div#fightSearchButton').trigger('click');
}

setup_fight = function(){
	var url = unsafeWindow.$('div.linkPrepareFight a').attr('href');
	if (url) {
		delay_visit_link(base_url + url);
	} else {
		delay_visit_link(urls_to_visit[URL_GYM] + '?');
	}
}

moves_left = function(name){
	avail = $('#'+name+' span.moveCount').text();
	
	if (!avail) {
		avail = '0';
	}

	if (avail == '\u221e' || avail == 'Unlimited') {
    avail = '666';
	}

	ravail = avail.match(/([0-9]+)/g);
	
	return parseInt(ravail);
}

pick_random_move = function(move_array, round_moves, avail_id, slot){
	available_moves = parseInt($('#' + avail_id).text());
	while (true){
		while (true){
			var move = array_rand(round_moves, 1);
			if (round_moves[move].available > 0) break;
		}
		picked_move = round_moves[move].moves[array_rand(round_moves[move].moves, 1)];
		ml = moves_left(move_array[picked_move].id);
		if (ml > 0) {
			round_moves[move].available--;
			return move_array[picked_move].id;
		} else {
			return null;
		}
	}
}

pending_fights = function(){
	return parseInt($('div.openFightsList table tbody tr').size());
}

set_strategy = function(strat) {
	unsafeWindow.$('#' + strat).click();
}

prepare_fight = function(){
	set_option('cutman', config.before_fight.cutman);
	set_option('coach', config.before_fight.coach);
	set_option('anthem', config.before_fight.anthem);
	
	unsafeWindow.$('div#buttonPrepareRounds').trigger('click');
	rounds_size = config.rounds.length;
	for (i = 1; i < 11; i++) {
		w = unsafeWindow.$('#nextRoundButton:visible');
		// Set strategy
		set_strategy(config.rounds[i % rounds_size].strategy());

		var local_moves = config.rounds[i % rounds_size].use_punches();
		// Setup punches
		//punches_size = config.rounds[i % rounds_size].use_punches().length;
		for (k = 1; k < 8; k++) {
			move_id = pick_random_move(punches, local_moves, 'displayPowerHitCount', k);
			//move_id = punches[rand(2,5)].id;
			if (empty(move_id)) {
				local_moves = [{
					available:7,
					moves:[PUNCH_STRAIGH_HEAD_LEFT, PUNCH_STRAIGH_HEAD_RIGHT, PUNCH_HOOK_LEFT, PUNCH_HOOK_RIGHT]
				}];
				k--;
			}
			unsafeWindow.$('#' + move_id).trigger('mouseup');
		}

		local_moves = config.rounds[i % rounds_size].use_defenses();

		// Setup defenses
		//defenses_size = config.rounds[i % rounds_size].use_defenses().length;
		for (k = 1; k < 8; k++) {
			move_id = pick_random_move(defenses, local_moves, 'displayPowerDefenseCount', k);
			//move_id = defenses[rand(0,3)].id;
			if (empty(move_id)) {
				local_moves = [{
					available:7,
					moves:[DEF_HEAD_LEFT,DEF_HEAD_RIGHT,DEF_BODY_LEFT,DEF_BODY_RIGHT]
				}];
				k--;
			}
			unsafeWindow.$('#' + move_id).trigger('mouseup');
		}
		
		if (!w.is(':visible')) break;
		w.trigger('click');
	}
	
	setTimeout(function(){
		unsafeWindow.$('div#finishButton').trigger('click');
	}, 1000 * rand(1,8));
	
	setTimeout(press_ok, 10000 + rand(1000, 3000));
}

watch_fight = function(){
	pendingfight = unsafeWindow.$('a.showFightLink.updateOnClose');
	if (pendingfight.size()) {
		pendingfight.click();
		window.setTimeout(close_flash, 5000);
	}	else {
		delay_visit_link(urls_to_visit[URL_ARENA] + '?');
	}
}

check_min_moves = function(){
	var d = config.fight_on.min_punches();
	alert(d);
	for(k = 0; k < d.length; k++){
		if (moves_left(punches[d[k].move].id) < d[k].min) {
			GM_setValue('fight', 0);
			return delay_visit_link(urls_to_visit[URL_DUKES]);
		}
	}
	d = config.fight_on.min_defenses();
	for(k = 0; k < d.length; k++){
		if (moves_left(defenses[d[k].move].id) < d[k].min) {
			GM_setValue('fight', 0);
			return delay_visit_link(urls_to_visit[URL_DUKES]);
		}
	}
	GM_setValue('fight', '1');
	return false;
}

const URL_GYM				= 0;
const URL_TRAINING	= 1;
const URL_FIGHTS		= 2;
const URL_PENDING		= 3;
const URL_DUKES			= 4;
const URL_WATCH			= 5;
const URL_ARENA			= 6;
const URL_PRESS			= 7;
const URL_AVAIL			= 8;

var urls_to_visit = [
// Gym upgrade (only if money is available)
base_url + '/office/trainingarea/',
// Do Training
base_url + '/boxer/training/',
// Find people to fight with
base_url + '/fights/',
// Fights waiting for setup
base_url + '/fights/open-challenges/',
// Main Page for enabling/disabling fighting
base_url + '/main/',
// Pending fights to be watched
base_url + '/fights/old-fights/',
// Upgrade Arena
base_url + '/office/eventarea/',
// Upgrade press
base_url + '/office/press/',
// Moves
base_url + '/boxer/moves/'
];

var prepare_fight_url = base_url + '/fights/prepare-fight';
var max_url_len = urls_to_visit.length;

var config_fight = GM_getValue('fight', 0);
var config_fighting = GM_getValue('fighting', 0);

/*USP.theScriptName = 'KO Champs';
USP.init({
	theName:'OneOfMany',
	theText:'Which values should be displayed?',
	theValues:['All','None'],
	theDefault:'All'
},
{
	theName:'intValue',
	theText:'Integer:',
	theDefault:100
},
{
	theName:'stringValue',
	theText:'String:',
	theDefault:'Testvalue'
},
{
	theName:'boolValue',
	theText:'Boolean?',
	theDefault:true
}
);

GM_registerMenuCommand('Preferences for ~'+USP.theScriptName+'~', USP.invoke);*/

GM_registerMenuCommand('Stop bot',function(){
	active = GM_getValue('active', false);
	if (!active) return;
	GM_setValue('active', false);
	active = false;
	clearInterval(hTimer);
});

GM_registerMenuCommand('Start bot',function(){
	active = GM_getValue('active', false);
	if (active) {
		alert('Bot already active');
	}
	GM_setValue('current_url', 0);
	GM_setValue('active', true);
	GM_setValue('fight', 0);
	GM_setValue('fighting', 0);
	active = true;
	bot_thread();
});

function processing() {
	get_current_level();
	get_money();
	can_process = true;
	
	if (strncmp(window.location.href, urls_to_visit[URL_GYM], urls_to_visit[URL_GYM].length) == 0) {
		can_process = upgrade_gym();
	} else if (strncmp(window.location.href, urls_to_visit[URL_TRAINING], urls_to_visit[URL_TRAINING].length) == 0){
		can_process = start_training();
	} else if (strncmp(window.location.href, urls_to_visit[URL_WATCH], urls_to_visit[URL_WATCH].length) == 0) {
		watch_fight();
		can_process = false;
	} else if (strncmp(window.location.href, urls_to_visit[URL_PENDING], urls_to_visit[URL_PENDING].length) == 0) {
		setup_fight();
		can_process = false;
	} /*else if (strncmp(window.location.href, urls_to_visit[URL_DUKES], urls_to_visit[URL_DUKES].length) == 0){
		if (GM_getValue('fight', 1) != GM_getValue('fighting', 1)) {
			set_ready_to_fight(GM_getValue('fight', 1));
		}
		can_process = false;
	} */else if (strncmp(window.location.href, prepare_fight_url, prepare_fight_url.length) == 0) {
		prepare_fight();
		can_process = false;
	} else if (strncmp(window.location.href, urls_to_visit[URL_FIGHTS], urls_to_visit[URL_FIGHTS].length) == 0) {
		find_opponent();
	} else if (strncmp(window.location.href, urls_to_visit[URL_ARENA], urls_to_visit[URL_ARENA].length) == 0) {
		can_process = upgrade_arena();
	} else if (strncmp(window.location.href, urls_to_visit[URL_PRESS], urls_to_visit[URL_PRESS].length) == 0) {
		can_process = upgrade_press();
	}/* else if (strncmp(window.location.href, urls_to_visit[URL_AVAIL], urls_to_visit[URL_AVAIL].length)) {
    check_min_moves();
		can_process = false;
	}*/

	if (can_process) {
		pending_fight_url = $('img[src="/img/icnChallengeFinished.gif"]').parent().attr('href');
		open_challenge = $('img[src="/img/icnChallenge.gif"]').parent().attr('href');
		if (pending_fight_url) {
			delay_visit_link(base_url + pending_fight_url);
		} else if (open_challenge) {
			delay_visit_link(base_url + open_challenge);
		} 
	}
}

function bot_thread() {
	if (!active) {
		clearTimeout(hTimer);
		return;
	}
	
	var current_url = GM_getValue('current_url', 0);
	if (current_url >= max_url_len) {
		current_url = 0;
	}
	current_url++;

	GM_setValue('current_url', current_url);
	//processing();

	for (i = 0; i < 3; i++) {
		setTimeout(function(){
			delay_visit_link(urls_to_visit[current_url-1] + '?');
		}, 3000 * (i + 1));
	}
	window.location.assign(urls_to_visit[current_url-1] + '?');
}

active = GM_getValue('active', false);

if (active) {
	setTimeout(function(){
		$(document).ready(function(){
			window.alert = function(){ return true; };
			unsafeWindow.alert = function() { return true; };
			unsafeWindow.window.alert = function() { return true; };
			processing();
			hTimer = window.setTimeout(bot_thread, 60000 * rand(1, 5));
		});
	}, 1000);
	
	for (i = 6; i < 11; i++) {
		window.setTimeout(function(){ 
			window.location.reload();
			delay_visit_link(base_url);
		}, 60000 * i);
	}
}
