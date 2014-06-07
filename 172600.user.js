// ==UserScript==
// @name           Bossfighter II Max
// @description    BF II Max
// ==/UserScript==
// http://spocklet.com/bookmarklet/bossfighter.js

/*
	$Id: bossfighter.js,v 1.64 2014-05-12 05:35:34 martin Exp $
	Boss Fighter BG
	Author: Team Spockholm
*/

javascript:(function (){
	"use strict";
	var version = 'Boss Fighter v2.22',
	rev = /,v (\d+\.\d+)\s201/.exec("$Id: bossfighter.js,v 1.64 2014-05-12 05:35:34 martin Exp $")[1],
	spocklet = 'fbfbg',
	debug = false,
	logs = [],
	loglines = 20,
	histlines = 20,
	show_config = false,
	run = false,
	stats = { "stamina_used": 0,"stamina_used_for_ratio": 0, "exp_gained": 0 },
	prevstamina = 0,
	// data stuff
	bosses = {},
	secret_districts = {},
	bossdata = {},
	combo_todo = [],
	items = {},
	items_by_type = { 'assassin':{},'secret':{},'family':{}, 'event':{}},
	familylist_FB = {},
	familylist_MW = {},
	active,
	timer,
	intvaltimer,
	store = {recentsentme:{1:{},2:{},3:{}}, isent:{},retaliate:{},sentlist:{},receivedlist:{},history:[]},
	table_toggle = false,
	raven_queue = [],
	secret_queue = [],
	event_queue = [],
	secret_repeat_limit = false,
	event_repeat_limit = false,
	my_raven_combo = 2,
	family_combos = [],
	event_combos = [],
	combobreaker = false,
	parameters = get_params(),
	//console.log(parameters),
	user_experience = User.user_experience,
	storage;
	
	var preurl = MW_BASE_URL+'/remote/html_server.php?';
	var zimg = 'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/';
	
	// items['21928'] = { "name": name , "id": 21928, "div_id": 6, "count": 0, "pic":pic };
	var raven_combos = {
		"1": [21928,21928,21929,21931], // green
		"2": [21929,21929,21930,21930], // yellow
		"3": [21931,21931,21930,21929],
		"4": [21931,21929,21928,21928],
		"5": [21930,21931,21929,21929],
		"6": [21928,21931,21931,21928],
		"7": [21928,21929,21931,21928],
		"8": [21931,21931,21930,21928]
	}

	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}
	catch(storagefail) {}

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.'+spocklet+'_bruiser { color:#FF2F29; } '+
		'.'+spocklet+'_arsonist { color:#E89E3E; } '+
		'.'+spocklet+'_racketeer { color:#5E98FC; } '+
		'#'+spocklet+'_conf_ragelimit  { background-color:#E89E3E ;}'+
		'#'+spocklet+'_conf_fatlimit  { background-color:#5E98FC ;}'+
		'.'+spocklet+'_show_secret { display:none; } '+
		'.'+spocklet+'_show_assassin { display:none; } '+
		'.'+spocklet+'_show_family { display:none; } '+
		'.'+spocklet+'_show_event { display:none; } '+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php" target="_blank"><img src="http://cdn.spocklet.com/banner-spockholm-mafia-tools.png#" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';

	var config_html =
		'	<tr '+$c('conf')+' style="display:none;"><td colspan="3"><h3>Event Bosses</h3></td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;"><td>Actions:</td><td colspan="2"><input id="'+spocklet+'_levelup" style="width:20px;" type="checkbox" /> Stop before levelup when <input id="'+spocklet+'_exp_level" type="text" value="500" maxlength="6" style="width:40px;" /> exp is needed to level.</td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;"><td></td><td colspan="2"><input id="'+spocklet+'_restart" style="width:20px;" type="checkbox" /> Enable restarting. &nbsp; <span id="'+spocklet+'_restart_row"><input id="'+spocklet+'_restart_time" type="text" value="5" maxlength="4" style="width:30px;" /> Minute(s) before restarting. <span class="more_in">(Minimum: 1)</span></span></td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;"><td>Combos:</td><td colspan="2">&nbsp; <a style="color:yellow;" href="#" '+$i('event_combobreaker')+'>C-C-C-Combo Breaker</a>. Click to enter custom combos for selected boss.</td></tr>'+

		'	<tr '+$c('conf')+' style="display:none;"><td colspan="3"><h3>Family Boss</h3></td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Default role:</td><td colspan="2" valign="top">'+
		'	<label><input type="radio" name="sp_role" value="Random" /> Random</label> | '+
		'	<label '+$c('arsonist')+'><input type="radio" name="sp_role" checked value="Arsonist" /> Arsonist</label> | '+
		'	<label '+$c('racketeer')+'><input type="radio" name="sp_role"  value="Racketeer"/> Racketeer</label> | '+
		'	<label><input type="radio" name="sp_role" value="Balance" /> Balance 50/50</label> | '+
		'	<label><input type="radio" name="sp_role" value="Balance2" /> Balance <b><span '+$c('arsonist')+'>1</span>:<span '+$c('racketeer')+'>3</span></b></label></td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Score limit:</td><td colspan="2">At <input type="number" '+$i('scorelimit')+'value="50000" style="width:100px;" /> points <input type="radio" name="spstop" value="boosts" checked /> keep sending boosts | <input type="radio" name="spstop" value="stop" /> stop completely</td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Send boosts:</td><td colspan="2"><table><tr><td valign=top style="padding-right:10px;">'+
		'		<input type="radio" name="sp_boosts" value="lowscore" /> Bottom Players<br />'+
		'		<input type="radio" name="sp_boosts" value="highscore" /> Top Players<br />'+
		'		<input type="radio" name="sp_boosts" value="randomscore" /> Random Players<br />'+
		'		<input type="radio" name="sp_boosts" value="below" checked /> Random Players below score limit<br />'+
		'		<input type="radio" name="sp_boosts" value="none" /> None (Do not send any boosts)<br />'+
//		'	<input type="checkbox"> Return Favor (Priority send back)'+
//		'	</td><td valign=top><input type="radio" name="sp_boosts" value="none" /> My favies:<br /><textarea style="width:250px;height:100px;" '+$i('faveboost')+'></textarea>'+
		'	</td></tr></table></td></tr>'+
//		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Use Combo:</td><td colspan="2"><select '+$i('combo_family')+'><option>None</option><option>Best Combo Avalible</option><option>Red</option><option>Orange</option><option>Green</option><option>Only Consumable (Secret District)</option></select></td></tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Ask:</td><td colspan="2">'+
		'		<label><input type="checkbox" '+$i('noaskbruiser')+' checked /> Do not ask for bruiser boosts</label><br />'+
		'		<label><input type="checkbox" '+$i('noaskarson')+' checked /> Do not ask for arsonist boosts</label><br />'+
		'		<label><input type="checkbox" '+$i('noaskracket')+' /> Do not ask for racketeer boosts</label><br />'+
		'	</tr>'+
		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Limit:</td><td colspan="2">'+
		'		Limit rage to: <select '+$i('conf_ragelimit')+'><option value="200">200 (Safemode)</option><option value="240" selected>240 (Full damage)</option><option value="500">500 (3/4 damage)</option><option value="1000">1000 (1/2 damage)</option><option value="1001">No limit (1/4 damage)</option></select>'+
		'		Limit fatigue to:<select '+$i('conf_fatlimit')+'><option value="24" selected>25 (5 Stamina per hit)</option><option value="48">50 (15 Stamina per hit)</option><option value="75">75 (45 Stamina per hit)</option><option value="150">No limit (150 Stamina per hit)</option></select>'+
		'	</td></tr>'+
		
//		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Stamina:</td><td colspan="2">'+
//		'		Limit stamina/attack to: <input type="number" value="300" '+$i('conf_staminalimit')+' />'+
//		'	</td></tr>'+
//		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Use Combo:</td><td colspan="2"><select '+$i('combo_secret')+'> <option value="0">None</option> <option value="100" disabled>Best Combo Avalible</option> <option value="3" selected>Red</option> <option value="2">Orange</option> <option value="1">Green</option> <option value="4">Only Consumable (Secret District)</option> </select></td></tr>'+
//		'	<tr '+$c('conf')+' style="display:none;"><td colspan="3"><h3>Assassin</h3></td></tr>'+
//		'	<tr '+$c('conf')+' style="display:none; background-color:#222;" valign="top"><td>Use Combo:</td><td colspan="2"><select '+$i('combo_assassin')+'> <option value="100" disabled>Best Combo Avalible</option> <option value="4">Red</option> <option value="2" selected>Orange</option> <option value="1">Green</option> <option value="100" disabled>Everything</option> </select></td></tr>'+

		'	<tr '+$c('conf')+' style="display:none;"><td colspan="3"><hr /></td></tr>';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
		'	&nbsp;<a href="#" id="'+spocklet+'_start" class="sexy_button_new short black" title="Start"><span><span>Start</span></span></a>'+
		'<a href="#" id="'+spocklet+'_pause" class="sexy_button_new short orange" title="Pause"><span><span>Pause</span></span></a>'+
		'	&nbsp;<a href="http://www.spockholm.com/mafia/donate.php?bossfighter" id="'+spocklet+'_donate" class="sexy_button_new short black" target="_blank" title="Support Team Spockholm with a cup of Coffee"><span><span><span class="cash"></span></span></span></a>'+
		'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good" title="Build: '+rev+'">'+version+'</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
		'	&nbsp;<a href="#" id="'+spocklet+'_config" class="sexy_button_new short black" title="Config"><span><span><span class="hammer"></span></span></span></a>'+
		'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		config_html+
		'<tr><td valign="top" width="105">Load:</td><td colspan="2" valign="top"><a href="#" '+$i('lesotho')+'>Lesotho</a> | Mexico: <a href="#" '+$c('mexicotab')+' tab="1">D1</a> - <a href="#" '+$c('mexicotab')+' tab="2">D2</a> - <a href="#" '+$c('mexicotab')+' tab="3">D3</a></td></tr>'+
		'<tr><td valign="top" width="105">Bossfights:<br /><span class="more_in">(click to select)</span></td><td colspan="2" valign="top"><span '+$i('bosslist')+'>loading data...</span></td></tr>'+
		'<tr><td valign="top">Current Fight:</td><td colspan="2">'+
		'<span class="health" '+$i('stat_bossHealth')+'></span>/<span '+$i('stat_bossMaxHealth')+'></span> &nbsp; <span class="stamina" '+$i('stat_stamina')+'></span></td></tr>'+
		'<tr '+$c('show_event',['show_secret','show_mexico'])+'><td valign="top">Stats:</td><td colspan="2">'+
		'<span class="stamina" '+$i('stats_stamina')+'>0</span>/<span class="experience" '+$i('stats_xp')+'>0</span> &nbsp; <span class="experience" '+$i('stats_ratio')+'></span>'+
		'	<span class="more_in">(XP ratio can be wrong if running multiple scripts at once.)</span>'+
		'</td></tr>'+
		'<tr '+$c('show_family')+'><td valign="top"></td><td colspan="2">'+
		'<span '+$c('racketeer')+'>Fatigue: <span '+$i('stat_userFatigue')+'></span></span> | '+
		'<span '+$c('arsonist')+'>Rage: <span '+$i('stat_bossRage')+'></span></span><br />'+
		'Boosts to send: <span><img width=16 height=16 /><span '+$i('stat_currentCharges')+'></span>/5</span> &nbsp; more in <span class="more_in" '+$i('more_boosts')+'></span> &nbsp; '+
		'To use: <b><span '+$c('bruiser')+' '+$i('stat_haveboost1')+'></span> | '+
		'<span '+$c('arsonist')+' '+$i('stat_haveboost2')+'></span> | '+
		'<span '+$c('racketeer')+' '+$i('stat_haveboost3')+'></span></b><br />'+
		'Score: <span class="good" '+$i('stat_userScore')+'></span><br />'+
		'<tr '+$c('show_secret')+'><td valign="top">Consumables:</td><td colspan="3"><span '+$i('show_consumables_secret')+' ></span></td></tr>'+
		'<tr '+$c('show_assassin')+'><td valign="top">Consumables:</td><td colspan="3"><span '+$i('show_consumables_assassin')+' ></span></td></tr>'+
		'<tr '+$c('show_event')+'><td valign="top">Consumables:</td><td colspan="3"><span '+$i('show_consumables_event')+' ></span></td></tr>'+
		'<tr '+$c('show_family')+'><td valign="top">Consumables:</td><td colspan="3"><span '+$i('show_consumables_family')+' ></span> &nbsp; <span '+$i('family_combos')+'><a href="#">load combos</a></span></td></tr>'+
		'<tr '+$c('show_assassin')+'><td valign="top">Action-Plan:</td><td colspan="3" style="background:#222;">'+
		'Add: <a style="color:green;" href="#" '+$i('assassin_combo_1')+'>Green combo</a> | '+
		'<a style="color:yellow;" href="#" '+$i('assassin_combo_2')+'>Yellow combo</a> | '+
		'<a style="color:red;" href="#" '+$i('assassin_combo_3')+'>Red combo</a> | '+
		'<a href="#" '+$i('assassin_item_4')+'>Nunchuck</a><br />'+
		'Queue: <span '+$i('assassin_action_plan')+'></span> (<a href="#" '+$i('clean_action_plan')+'>clean</a>)<br />Predicted damage: <span '+$i('predict_damage')+'>0</span>'+
		'</td></tr>'+
		'<tr '+$c('show_secret')+'><td valign="top">Action-Plan:</td><td colspan="3" style="background:#222;">'+
		'Add: <a style="color:green;" href="#" '+$i('secret_combo_1')+'>Green combo</a> | '+
		'<a style="color:yellow;" href="#" '+$i('secret_combo_2')+'>Yellow combo</a> | '+
		'<a style="color:red;" href="#" '+$i('secret_combo_3')+'>Red combo</a> | '+
		'<a style="color:orange;" href="#" '+$i('secret_stamina')+'>Stamina</a> | '+
		'<a style="color:white;" href="#" '+$i('secret_item_3')+'>KP</a> | '+
		'<a style="color:white;" href="#" '+$i('secret_item_4')+'>Consumable</a> | '+
		'<a style="color:yellow;" href="#" '+$i('secret_repeat_limit')+'>Repeat last</a><br />'+
		'Queue: <span '+$i('secret_action_plan')+'></span> (<a href="#" '+$i('clean_secret_action_plan')+'>clean</a>)<br />Predicted damage: <span '+$i('secret_predict_damage')+'>0</span>'+
		'</td></tr>'+
		'<tr '+$c('show_event')+'><td valign="top">Action-Plan:</td><td colspan="3" style="background:#222;">'+
		'Add: <a style="color:green;" href="#" '+$i('event_combo_1')+'>Green combo</a> | '+
		'<a style="color:yellow;" href="#" '+$i('event_combo_2')+'>Yellow combo</a> | '+
		'<a style="color:red;" href="#" '+$i('event_combo_3')+'>Red combo</a> | '+
		'<a style="color:orange;" href="#" '+$i('event_stamina')+'>Stamina</a> | '+
		'<a style="color:white;" href="#" '+$i('event_random')+'>Random Consumable</a> | '+
		'<a style="color:yellow;" href="#" '+$i('event_repeat_limit')+'>Repeat last</a><br />'+
		'Queue: <span '+$i('event_action_plan')+'></span> (<a href="#" '+$i('clean_event_action_plan')+'>clean</a>)<br /><!--Predicted damage: <span '+$i('event_predict_damage')+'>0</span-->'+
		'</td></tr>'+
		
		'<tr><td valign="top">Action:</td><td colspan="3"><span '+$i('msg')+' style="color:yellow;"></span></td></tr>'+
		'<tr '+$c('show_family')+'><td valign="top"><a href="#" title="Click to show/hide" '+$i('toggle_fam')+'>Family:</a><br /><span class="more_in" style="font-size:10px;">(click to show all)</span></td><td colspan="2"><div '+$i('familytable')+' style="height:198px; overflow-y:scroll;"><table '+$i('table')+'width="100%">'+
			'<tr><th>FB</th><th>Name</th><th>Role</th><th>Score</th><th>Boost?</th></tr>'+
		'</table></div></td></tr>'+
		'</td></tr>'+
		'	<tr><td valign="top"><a href="#" title="Click to show/hide" '+$i('toggle_log')+'>Log</a> <span class="more_in" '+$i('loglines')+' title="Log lines shown">('+loglines+')</span>:</td>'+
		'	<td colspan="3"><span id="'+spocklet+'_log"></span></td></tr>'+
		'	<tr '+$c('show_family')+'><td valign="top"><a href="#" title="Click to show/hide" '+$i('toggle_hist')+'>History</a> <span class="more_in" '+$i('histlines')+' title="History lines shown">('+histlines+')</span>:</td>'+
		'	<td colspan="3"><span style="display:none;" id="'+spocklet+'_hist"></span></td></tr>'+
		'	<tr '+$c('show_family')+'><td valign="top"><a href="#" title="Click to show/hide" '+$i('toggle_rel')+'>Relations:</a></td>'+
		'	<td '+$i('show_relations')+' colspan="3"><span style="display:none;" id="'+spocklet+'_rel"></span></td></tr>'+
		'</table>'+
	'</div>';

	function create_div() {
		//setup the spockdiv
		if ($('#'+spocklet+'_main').length == 0) {
			$('#inner_page').before(spocklet_html);
		} else {
			$('#'+spocklet+'_main').html(spocklet_html);
		}
		$e('pause').hide();
	}

	function create_handler(){
		$e('close').click(function(){
			run = false;
			$e('main').remove();
			return false;
		});
		$e('pause').click(function(){
			run = false;
			$e('start').show();
			$(this).hide();
			msg('Paused.');
			return false;
		});
		
		$e('start').click(function(){
			run = true;
			$e('pause').show();
			$(this).hide();
			//open_family_bossfight();
			open_bossfight();
			clearTimeout(timer);
			return false;
		});
	
		$e('config').click(function(){
			if(!show_config) {
				$('.'+spocklet+'_conf').show();
				$(this).addClass('green').removeClass('black');
			}
			else {
				$('.'+spocklet+'_conf').hide();
				$(this).addClass('black').removeClass('green');
			}
			show_config =! show_config;
			return false;
		});
		$e('toggle_log').click(function(){
			if($e('log').css('display')=="none") {
				$e('log').show();
			} else {
				$e('log').hide();
			}
			return false;
		});
		$e('toggle_hist').click(function(){
			if($e('hist').css('display')=="none") {
				$e('hist').show();
			} else {
				$e('hist').hide();
			}
			return false;
		});
		$e('toggle_rel').click(function(){
			if($e('rel').css('display')=="none") {
				$e('rel').show();
			} else {
				$e('rel').hide();
			}
			return false;
		});
		$e('toggle_fam').click(function(){
			if(table_toggle) {
				$e('familytable').css('height','190px')
			} else {
				$e('familytable').css('height','auto')
			}
			table_toggle=!table_toggle;
			return false;
		});
		$('#'+spocklet+'_assassin_combo_1,#'+spocklet+'_assassin_combo_2,#'+spocklet+'_assassin_combo_3,#'+spocklet+'_assassin_item_4').click(function(){
			var combo,id=this.id.substr(this.id.length-1,1);
			if(id=="4") { id=101; } // item
			if(id=="3") { id=my_raven_combo; } // red combo
			raven_queue.push(id);
			show_raven_queue();
			return false;
		});
		$e('clean_action_plan').click(function(){
			raven_queue = [];
			show_raven_queue();
			return false;
		});
		$('#'+spocklet+'_secret_combo_1,#'+spocklet+'_secret_combo_2,#'+spocklet+'_secret_combo_3,#'+spocklet+'_secret_stamina,#'+spocklet+'_secret_item_3,#'+spocklet+'_secret_item_4').click(function(){
			var id=this.id.replace(spocklet+'_secret_','');
			secret_queue.push(id);
			show_secret_queue();
			return false;
		});
		$e('clean_secret_action_plan').click(function(){
			secret_queue = [];
			show_secret_queue();
			return false;
		});
		$('#'+spocklet+'_event_combo_1,#'+spocklet+'_event_combo_2,#'+spocklet+'_event_combo_3,#'+spocklet+'_event_stamina,#'+spocklet+'_event_random').click(function(){
			var id=this.id.replace(spocklet+'_event_','');
			event_queue.push(id);
			show_event_queue();
			return false;
		});
		$e('clean_event_action_plan').click(function(){
			event_queue = [];
			show_event_queue();
			return false;
		});
		
		$e('secret_repeat_limit').click(function(){
			if(secret_repeat_limit) { 
				secret_repeat_limit = false;
			} else {
				if(secret_queue.length==0) {
					alert('Select type of attack to repeat first');
				} else if(secret_queue[secret_queue.length-1]=="stamina") {
					secret_repeat_limit = parseInt(prompt('Enter Stamina limit, enter 0 or nothing for unlimited.',0));
					if(!secret_repeat_limit) { secret_repeat_limit=true; }
				} else {
					secret_repeat_limit = true;
				}
			}
			show_secret_queue();
			return false;
		});
		$e('family_combos > a').click(function(){
			load_family_combos();
			return false;
		});
				
		$e('event_repeat_limit').click(function(){
			if(event_repeat_limit) { 
				event_repeat_limit = false;
			} else {
				if(event_queue.length==0) {
					alert('Select type of attack to repeat first');
				} else if(event_queue[event_queue.length-1]=="stamina") {
					event_repeat_limit = parseInt(prompt('Enter Stamina limit, enter 0 or nothing for unlimited.',0));
					if(!event_repeat_limit) { event_repeat_limit=true; }
				} else {
					event_repeat_limit = true;
				}
			}
			show_event_queue();
			return false;
		});
		$e('family_combos > a').click(function(){
			load_family_combos();
			return false;
		});
		$('#'+spocklet+'_restart').change(function() {
			if ($('#'+spocklet+'_restart').is(':checked')) {
				$('#'+spocklet+'_restart_row').show();
			}
			else {
				$('#'+spocklet+'_restart_row').hide();
			}
		});
		
		$e('event_combobreaker').click(function() {
			var bossid = ($('input.spockboss:CHECKED').attr('bossid'));
			if (isNaN(bossid)) {
				alert('No boss selected!');
				return;
			}
			var combos = JSON.parse(prompt('Enter string with combo(s) to try')) || false;
			var first = 10;
			if (combos) {
				combobreaker = true;
				for (x in combos) {
					bosses[bossid].combos[first] = combos[x];
					event_queue.push(first);
					first++;
				}
				show_event_queue();
			}
		});
		
		$e('lesotho').bind('click',function() {
			msg('Trying to load Lesotho event...');
			load_bossevent();
			return false;
		});
		$ec('mexicotab').bind('click',function() {
			var tab = $(this).attr('tab');
			msg('Trying to load Mexico D'+tab+' boss...');
			load_mexico_tab(tab);
			return false;
		});
	}

	/****************** here comes the action ****************/
	function load_family_combos(){
		$e('family_combos').html('Loading...');
		request('xw_controller=Epicclanboss&xw_action=showCombo&bossId='+active,function(page) {
			var i,$page=$(noimg(page)),combo,html='';
			family_combos=[];
			$page.find('.startCombo:first').parent().children().each(function(){
				var $this=$(this);
				if($this.hasClass('startCombo')) {
					combo={combo:[]};
				}
				if($this.find('.comboPopItemImage > noimg').length>0) {
					combo.combo.push($this.find('.comboPopItemImage > noimg').attr('item_id'));
				}
				if($this.hasClass('green')) {
					combo.color="green";
				}
				if($this.hasClass('yellow')) {
					combo.color="yellow";
				}
				if($this.find('p:contains("damage")').length>0) {
					combo.text=$this.find('p').text().trim();
				}
				if($this.hasClass('endCombo')) {
					family_combos.push(combo);
				}
			});
			html='Use combo: ';
			for(i=0;i<family_combos.length;i++){
				html+='<a href="#" title="'+family_combos[i].text+'" '+$c('family_combo')+' data-id="'+i+'">'+family_combos[i].color+'</a> | ';
			}
			html+='<span '+$i('family_combo_active')+'></span>';
			$e('family_combos').html(html);
			
			$ec('family_combo').click(function(){
				var combo_id=$(this).attr('data-id');
				// check for active combo? or having only one combo active?
				$e('family_combo_active').html(family_combos[combo_id].color+' (<span '+$i('family_combo_active_count')+'>4</span>)');
				if(combo_todo.length==0) {
					combo_todo=family_combos[combo_id].combo.slice(); // clone, not ref
				} else {
					// hmm
				}
				return false;
			});
		
		});
	}
	
	
	function show_raven_queue(){
		var i,j,predict=0,html='',useitems={"21928":0,"21929":0,"21930":0, "21931":0}, cb;
		for(i=0;i<raven_queue.length;i++) {
			if(raven_queue[i]==1) { html+='<span style=color:green>Green</span> '; cb=raven_combos[1]; predict+=1900; }
			else if(raven_queue[i]==2) { html+='<span style=color:yellow>Yellow</span> '; cb=raven_combos[2]; predict+=2100; }
			else if(raven_queue[i]==101) { html+='Nunchuck '; cb=["21928"]; predict+=100; }
			else { html+='<span style=color:red>Red</span> '; cb=raven_combos[my_raven_combo]; predict+=3800; }
			
			for(j=0;j<cb.length;j++) {
				useitems[cb[j]]++;
			}
		}
		$e('assassin_action_plan').html(html);
		$e('predict_damage').html(predict);
		for(j in useitems) {
			if(items_by_type["assassin"][j].count<useitems[j]) {
				$e('cs_'+j).html('(<span class="bad">need: '+useitems[j]+'</span>)');
			} else {
				$e('cs_'+j).html('(need: '+useitems[j]+')');
			}
		}
	}
	function show_secret_queue(){
		var html='',i,predict=0;
		for(i=0;i<secret_queue.length;i++) {
			if(secret_queue[i]=="combo_1") { html+='<span style="color:green">Green</span> '; predict+=400; }
			else if(secret_queue[i]=="combo_2") { html+='<span style="color:yellow">Yellow</span> '; predict+=420; }
			else if(secret_queue[i]=="combo_3") { html+='<span style="color:red">Red</span> '; predict+=800; }
			else if(secret_queue[i]=="item_3") { html+='<span style="color:white">Punch</span> '; predict+=100; }
			else if(secret_queue[i]=="item_4") { html+='<span style="color:white">Consumable</span> '; predict+=100; }
			else if(secret_queue[i]=="stamina") { html+='<span style="color:orange">Stamina</span> '; predict+=60; }
		}
		if(secret_repeat_limit===true) {
			html+='repeat until boss dead';
			predict = 'all';
		} else if(secret_repeat_limit) {
			html+='repeat until <span class="stamina" title="Stamina required above">'+secret_repeat_limit+'</span>';
			predict = 'unknown';
		}
		
		$e('secret_action_plan').html(html);
		$e('secret_predict_damage').html(predict);
	}
	function show_event_queue(){
		var html='',i,predict=0;
		for(i=0;i<event_queue.length;i++) {
			if(event_queue[i]=="combo_1") { html+='<span style="color:green">Green</span> '; predict+=80; }
			else if(event_queue[i]=="combo_2") { html+='<span style="color:yellow">Yellow</span> '; predict+=100; }
			else if(event_queue[i]=="combo_3") { html+='<span style="color:red">Red</span> '; predict+=140; }
			else if(event_queue[i]=="random") { html+='<span style="color:white">Random</span> '; predict+=100; }
			else if(event_queue[i]=="stamina") { html+='<span style="color:orange">Stamina</span> '; predict+=80; }
			else { html+='<span style="color:orange">Custom'+event_queue[i]+'</span> '; }
		}
		if(event_repeat_limit===true) {
			html+='repeat until boss dead';
			predict = 'all';
		} else if(event_repeat_limit) {
			html+='repeat until <span class="stamina" title="Stamina required above">'+event_repeat_limit+'</span>';
			predict = 'unknown';
		}
		
		$e('event_action_plan').html(html);
		$e('event_predict_damage').html(predict);	
	}
	
	
	function read_secret_districts() {
		$('a[id^="travel_menu_secret_"]').each(function(){
			var name = $(this).text().trim();
			var link = $(this).prop('onclick');
			var tab = /tab=(\d+)/.exec(link)[1];
			var city = /destination=(\d+)/.exec(link)[1];
			secret_districts[city+'-'+tab] = {"name": name, "city": city, "tab": tab};
			//console.log(secret_districts);
			request('xw_controller=travel&xw_action=travel&from=job&destination='+city+'&tab='+tab,function(page){
				var boss;
				if (boss=/bossfight_view.*city=(\d+).*stageId=(\d+).*bossId=(\d+)/.exec(page)) {
					log('Found boss in district '+name+', city: '+boss[1]+' tab: '+boss[2]+' bossid: '+boss[3]);
					msg('Loading secret district...');
					load_secret_boss(boss[1],boss[2],boss[3]);
				}
				else {
					if (debug) {
//						console.log('Failed to load secret district.');
					}
				}
			});
		});
	}
	
	function load_bossevent() {
		request('xw_controller=travel&xw_action=travel&xw_city=&xw_person='+User.id.substr(2)+'&from=travel&destination=10&stageId=1102&fromBossTerr=1&src=fight_now&xw_client_id=8',function(page){
			//console.log('loaded');
		
			request('xw_controller=CityMap&xw_action=viewDistrict&xw_city=&tmp=&cb=&xw_person=&districtId=1102&xw_client_id=8',function(page) {
				try {
					var data=JSON.parse(page);
				} catch(e) {
					msg('Could not load Lesotho, try framed or try again.');
					log('Could not load Lesotho, try framed or try again.');
					return;
				}
				window.eikedata=data;
				//console.log(data);
				var $data=$(data.data.districtMarkup);
				var mastery=0;
				
				if($data.find('.star-tier-2').length>0) { mastery=1; }
				if($data.find('.star-tier-3').length>0) { mastery=2; }
				if($data.find('.star-tier-4').length>0) { mastery=3; }
				
				$data.find('.map-boss-data').each(function(){
					var id=$(this).find('input').attr('id').replace('map_boss_damage_','');
					var link=$(this).find('.map-boss-cont:first').attr('onclick').re("remote\\/html_server.php\\?([^\\']*)\\'");
					var active=$(this).find('.map-boss-location-bg').css('display')=="none";
					var name=nameize($(this).find('img').attr('src').re("boss\\/(.*)\\/boss"));
					var health=100-parseFloat(page.re(id+"\\)\\.val\\(([\\d\\.]*)\\)"));
					
					var bdata={link:link, active:active, health:health, maxHealth:100, name:name, type:"event", mastery:mastery, id:id, healthpct:function(){return parseFloat(this.health/this.maxHealth*100).toFixed(0);}};
					
					if(bdata.active){
						log("Active event boss #"+id+" found.");
						bosses[id]=bdata;
						load_event_boss(id);
					}
				});
			});
		});
	}
	
	function load_mexico_tab(tab) {
		request('xw_controller=travel&xw_action=travel&xw_city=11&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&from=job&zone=1&destination=11&tab='+tab,function(page){
			var $page = $(page);
			if ($('#boss-inline',$page).length > 0) {
				var stage = /&stage_id=(\d+)/.exec(page)[1];
			
				var id = stage;
				var link = 'xw_controller=BossDistrict&xw_action=fightView&xw_city=11&tmp=&cb=&xw_person=&mwcom=1&stage_id='+stage;
				var name = $('span.boss-name:first',$page).text();
				var health = /(\d+)\/(\d+)/.exec($('#bossDistrictHealth span.health:first',$page).text());
				
				var bdata = {
					link: link,
					health: health[1],
					maxHealth: health[2],
					name: name,
					type: 'mexico',
					id: id,
					healthpct: function(){return parseFloat(this.health/this.maxHealth*100).toFixed(0);}
				};
				
				log('Boss found: '+name+' (D'+stage+') '+health[1]+'/'+health[2]);
				
				bosses[id] = bdata;
				display_boss_list();
				//load_mexico_boss(id); not needed until we load combos
			}
			else {
				msg('Did not find active Mexico boss.');
				log('Did not find active Mexico boss.');
			}
		});
	}
	
	function load_mexico_boss(bid) {
		//console.log(bosses[bid]);
		request(bosses[bid].link,function(boss) {
			var $boss = $(boss);
			log($('#bossv2Health span.health:first',$boss).text());
			//find combos and load
			
			display_boss_list();
		});
	}
	
	function load_event_boss(bid) {
		msg('Loading event boss data...');
		request(bosses[bid].link,function(page) {
			window.eikedata=page;
			var bossdata, userdata, consumabledata,cons;
			if (userdata=/var userData = ({.*});/.exec(page)) {
				userdata = JSON.parse(userdata[1]);
			}
			
			if (consumabledata=/data: ({.*)};/.exec(page)) {
				//console.log(consumabledata[1]);
				cons = JSON.parse(consumabledata[1]);
				//console.log(cons);
			}

			if (bossdata=/var bossData = ({.*});/.exec(page)) {
				bossdata = JSON.parse(bossdata[1]);
				var boss = {};
				boss.id = parseInt(bossdata.bossId);
				boss.type = 'event';
				boss.combos = {};
				boss.name = bossdata.bossName;
				boss.health = bossdata.currHealth;
				boss.maxHealth = bossdata.maxHealth;
				boss.bossHealth = bossdata.currHealth;
				boss.bossMaxHealth = bossdata.maxHealth;
				boss.mastery = bossdata.bossMastery - 1;
				boss.healthpct = function() {
					return parseFloat(this.health/this.maxHealth*100).toFixed(0);
				};
				boss.staminaRequired = parseInt(userdata.stamina_required);
				bosses[boss.id] = boss;
				//console.log(1);
				read_combos(page,bid);
				read_consumables(cons,'event');
				//console.log(2);
			}
			else {
				log('Boss #'+bid+' is likely dead.');
				// console.log('Failed to load bossData');
				//if (debug) { console.log(page); }
			}
			
			//console.log(bosses);
			display_boss_list();
		});
	}
	
	
	function load_secret_boss(city,tab,bossid) {
		msg('Loading secret district boss data...');
		request('xw_controller=Bossfightv2&xw_action=bossfight_view&stageId='+tab+'&stageCity='+city+'&bossId='+bossid,function(page){
			var bossdata, userdata;
			if (userdata=/var userData = ({.*});/.exec(page)) {
				userdata = JSON.parse(userdata[1]);
			}
				//var userData = {"userName":"Mental Martin","imageUrl":"https:\/\/fbcdn-profile-a.akamaihd.net\/hprofile-ak-prn1\/41710_720768822_8853_q.jpg","maxHealth":20793,"stamina_required":30,"health_required":10,"currHealth":10};
			if (bossdata=/var bossData = ({.*});/.exec(page)) {
				//var bossData = {"bossId":"30","bossMastery":3,"imageUrl":"https:\/\/zynga1-a.akamaihd.net\/mwfb\/mwfb\/graphics\/bossfightv2\/bossPics\/banking_turns\/Banking-Turns-Fight-Mod-sd.png","imageName":"https:\/\/zynga1-a.akamaihd.net\/mwfb\/mwfb\/graphics\/bossfightv2\/bossPics\/banking_turns\/Banking-Turns-Fight-Mod-sd-Title.png","maxHealth":25000,"bossName":"Ivan Monet","bossReward":24304,"currHealth":25000,"isAssassin":false};
				bossdata = JSON.parse(bossdata[1]);
				var boss = {};
				boss.id = parseInt(bossdata.bossId);
				boss.city = city;
				boss.tab = tab;
				boss.type = 'secret';
				boss.combos = {};
				//active = boss.id; // todo: multiple bosses
				boss.name = bossdata.bossName;
				boss.health = bossdata.currHealth;
				boss.maxHealth = bossdata.maxHealth;
				boss.bossHealth = bossdata.currHealth;
				boss.bossMaxHealth = bossdata.maxHealth;
				boss.mastery = bossdata.bossMastery;
				boss.healthpct = function() {
					return parseFloat(this.health/this.maxHealth*100).toFixed(0);
				};
				boss.staminaRequired = parseInt(userdata.stamina_required);
				bosses[boss.id] = boss;
				
				read_combos(page,bossid);
				boss.consumableId=$(page).find('#consumable_4 >.corner_number').attr('id').replace('spbf_fight_page_consumable_corner_number_','');
				
				read_consumables(page,'secret');
			}
			else {
				log('Boss #'+bossid+' is likely dead.');
				// console.log('Failed to load bossData');
				//if (debug) { console.log(page); }
			}
			display_boss_list();
		});
	}
	
	function load_raven(bossid) {
		if (!bossid) { bossid = 3; }
		msg('Loading Raven data...');
		request('xw_controller=bossfightv2&xw_action=bossfight_view&bossId='+bossid,function(page){
			var bossdata, userdata;
			if (userdata=/var userData = ({.*});/.exec(page)) {
				userdata = JSON.parse(userdata[1]);
			}
				
			if (bossdata=/var bossData = ({.*});/.exec(page)) {
				//var bossData = {"timeLeft":27892,"bossId":"3","bossMastery":0,"imageUrl":"https:\/\/zynga1-a.akamaihd.net\/mwfb\/mwfb\/graphics\/bossfightv2\/bossPics\/raven\/assasin_BG_raven.jpg","imageName":"https:\/\/zynga1-a.akamaihd.net\/mwfb\/mwfb\/graphics\/bossfightv2\/bossPics\/raven\/fight-mod-title-new.png","maxHealth":60000,"bossName":"The Raven","bossReward":21932,"currHealth":60000,"isAssassin":true};
				//var userData = {"userName":"Mental Martin","imageUrl":"https:\/\/fbcdn-profile-a.akamaihd.net\/hprofile-ak-prn1\/41710_720768822_8853_q.jpg","maxHealth":20969,"stamina_required":0,"health_required":10,"currHealth":1};				
				bossdata = JSON.parse(bossdata[1]);
				var boss = {};
				boss.id = parseInt(bossdata.bossId);
				boss.city = 0;
				boss.tab = 0;
				boss.type = 'assassin';
				boss.combos = {};
				//active = boss.id; // todo: multiple bosses
				boss.timeleft = parseInt(bossdata.timeLeft);
				boss.name = bossdata.bossName;
				boss.health = bossdata.currHealth;
				boss.maxHealth = bossdata.maxHealth;
				boss.bossHealth = bossdata.currHealth;
				boss.bossMaxHealth = bossdata.maxHealth;
				
				boss.mastery = bossdata.bossMastery;
				boss.healthpct = function() {
					return parseFloat(this.health/this.maxHealth*100).toFixed(0);
				};
				bosses[boss.id] = boss;
				read_combos(page,bossid);
			}
			else {
				log('Boss #'+bossid+' is likely dead.');
				// console.log('Failed to load bossData');
				//if (debug) { console.log(page); }
			}
			display_boss_list();
		});
	}
	
	function read_consumables(page,type) {
		if(type=='assassin') {
			$(page).find('div[id^="consumable_"]','#userConsumables').each(function() {
				var item_id = parseInt($(this).find('div.corner_number:first').attr('id').replace(/spbf_fight_page_consumable_corner_number_/,''));
				if (!Util.isset(items[item_id])) {
					var name = $(this).find('img:first').prop('title').replace(/ \[0.0\]/g,'') || 'Item '+item_id;
					var count = parseInt($(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).text());
					var div_id = $(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).parent().prop('id').replace(/consumable_/,'');
					var pic = $(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).parent().find('img:last').attr('src');
					items[item_id] = { "name": name , "id": item_id, "div_id": div_id, "count": count, "pic":pic };
					items_by_type[type][item_id] = items[item_id];
				}
			});
		} else if (type=="family") {
			$(noimg(page)).find('div[id^="consumable_"]').each(function() {
			
				var item_id = this.id;
				var count = parseInt($(this).find('.corner_number').text());
				var div_id = ''; //$(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).parent().prop('id').replace(/consumable_/,'');
				var pic = $(this).find('noimg:last').attr('src') || '';
				var name = pic.re('item_(.*)_0');
				items[item_id] = { "name": name , "id": item_id, "div_id": div_id, "count": count, "pic":pic };
				items_by_type[type][item_id] = items[item_id];
			});
		
		
		} else if (type=="secret") {
			$(noimg(page)).find('div[id^="consumable_"]').each(function() {
				var item_id = $(this).find('div.corner_number').attr('id').replace('spbf_fight_page_consumable_corner_number_','');
				var count = parseInt($(this).find('.corner_number').text());
				var div_id = this.id.replace('consumable_','');
				var pic = $(this).find('noimg:last').attr('src') || '';
				var name = pic.re('item_(.*)_0');
				items_by_type[type][item_id] = { "name": name , "id": item_id, "div_id": div_id, "count": count, "pic":pic };
			});			
		} else if (type=="event") {
			for(var num in page) {
				var i=page[num];
				items_by_type[type][i.itemId] = {"name": i.name , "id": i.itemId, "div_id": '', "count": i.userAmount, "pic":i.image };
			}
		
		} else {
			// :poop:
		}
		update_display_items();
		
		//console.log(JSON.stringify(items));
	}
	
	function read_combos(page,bossid) {
		if (bosses[bossid].type == 'assassin') {
			//preload items for the Raven
			read_consumables(page, 'assassin');
		}
		$(page).find('div[id^="bfv2_combo_img_"]','#comboPop').each(function(){
			var id = $(this).prop('id'), combo;
			if (combo = /_(\d)_(\d)/.exec(id)) {
				var combo_id = combo[1];
				if (bosses[bossid].type == 'assassin') {
					if(combo_id>2) {
						my_raven_combo = combo_id;
					}
				}
				var item_id = parseInt($(this).find('img:first').attr('item_id'));
				
				if (isNaN(item_id)) {
					//raven or unloaded combo
					if (bosses[bossid].type == 'assassin') {
						bosses[bossid].combos[combo_id] = raven_combos[combo_id];
						my_raven_combo = combo_id;
					}
				}
				else {
					if (!Util.isset(items[item_id])) {
						var name = $(this).find('img:first').prop('title').replace(/ \[0.0\]/g,'');
						var count = parseInt($(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).text());
						var div_id = $(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).parent().prop('id').replace(/consumable_/,'');
						var pic = $(page).find('#spbf_fight_page_consumable_corner_number_'+item_id).parent().find('img:last').attr('src');
						items[item_id] = { "name": name , "id": item_id, "div_id": div_id, "count": count, "pic":pic };
					}

					if (Util.isset(bosses[bossid].combos[combo_id])) {
						bosses[bossid].combos[combo_id].push(item_id);
					}
					else {
						bosses[bossid].combos[combo_id] = [];
						bosses[bossid].combos[combo_id].push(item_id);
					}
				}
			}
		});

		if (bosses[bossid].type == 'secret') {
			var consumable = parseInt($(page).find('#consumable_4 > div:first').attr('id').replace(/spbf_fight_page_consumable_corner_number_/,''),10);
			bosses[bossid].combos[4] = [consumable,consumable,consumable,consumable];
		}
		if (debug) {
			console.log(JSON.stringify(bosses[bossid].combos));
			console.log(JSON.stringify(items));
		}
		update_display_items();
	}
	
	function write_combo(bossid,combo) {	
		var x,y;
		//for (x in bosses[bossid].combos) {
			//var output = x+': ',
			var list = bosses[bossid].combos[combo];
			if(!list) {
				return; // error msg later
			}
			var arr = [];
			for (y=0;y<list.length;y++) {
				var item = items[list[y]].name;
				arr.push(item);
				//output += item;
			}
			// console.log(combo+': '+arr.toString());
		//}
	}
	
	function load_bosslist(){
		//todo, queue loading of the different boss types.
		request('xw_controller=Epicclanboss&xw_action=list_view',function(page){
			bosses = {};
			var $msg = $(noimg(page));
			$msg.find('.boss_operation').each(function(){
				var boss = {};
				boss.id = parseInt(this.id.substr(5));
				boss.type = 'family';
				boss.combos = {};
				active = boss.id; // todo: multiple bosses
				boss.name = $(this).find('.boss_name').text().trim();
				boss.health = $(this).find('.health:first').text().trim();
				$(this).find('.total_members > span').remove();
				boss.members = parseInt($(this).find('.total_members').text().trim());
				boss.bruiser = parseInt($(this).find('.role_call > div:eq(0)').text().trim().substr(1));
				boss.arsonist = parseInt($(this).find('.role_call > div:eq(1)').text().trim().substr(1));
				boss.racketeer = parseInt($(this).find('.role_call > div:eq(2)').text().trim().substr(1));
				boss.active =! $(this).find('.rightArrow').hasClass('opacity_50');
				boss.collect = $(this).find('span:contains("Collect")').length>0;
				bosses[boss.id] = boss;
				log('Found '+(!boss.active?'<span class="bad">DEAD</span> ':'')+'family boss '+boss.name+' with id: '+boss.id);
			});
			
			if ($(page).find('#raven').length > 0) {
				log('Raven is active!');
				load_raven();
			}
			display_boss_list();
		});
	}

	function mastery_star(mastery) {
		var star=(mastery==0?"bronze":(mastery==1?'silver':(mastery==2?'gold':'ruby')));
		return '<span class="'+star+'_star"></span>';
	}
	
	function display_boss_list() {
		var id, html='';
		//console.log(bosses);
		for(id in bosses) {
			var boss = bosses[id];
			//console.log(boss);
			if (boss.type == 'family') {
				html+='<label style="cursor:pointer;"><input type="radio" name="bossradio" class="spockboss" bosstype="family" bossid="'+boss.id+'" '+(boss.active?'':'disabled')+' /> [Family] <span class="good">'+boss.name+'</span> Members: <b>'+boss.members+'</b> ('+
					'<span '+$c('bruiser')+'><b>'+boss.bruiser+'</b></span> | '+
					'<span '+$c('arsonist')+'><b>'+boss.arsonist+'</b></span> | '+
					'<span '+$c('racketeer')+'><b>'+boss.racketeer+'</b></span>'+
					') '+(boss.active?'':'<span class="bad">DEAD</span>')+(boss.collect?' <a href="#" '+$c('collectnow','',['good'])+' data-id="'+boss.id+'">COLLECT NOW</a>':'')+'</label><br />';
			}
			if (boss.type == 'secret') {
				html += '<label style="cursor:pointer;"><input type="radio" name="bossradio" class="spockboss" bosstype="secret" bossid="'+boss.id+'" /> [Secret] <span class="good">'+boss.name+'</span> <span class="health">'+boss.health+'/'+boss.maxHealth+' ('+boss.healthpct()+'%)</span>, Mastery: '+mastery_star(boss.mastery)+', Attack: <span class="stamina" title="Next attack stamina cost">'+boss.staminaRequired+'</span></label><br />';
			}
			if (boss.type == 'assassin') {
				var timeleft=morein(boss.timeleft);
				html += '<label style="cursor:pointer;"><input type="radio" name="bossradio" class="spockboss" bosstype="assassin" bossid="'+boss.id+'" /> [Assassin] <span class="good">'+boss.name+'</span> <span class="health">'+boss.health+'/'+boss.maxHealth+' ('+boss.healthpct()+'%)</span> Time left: <span class="more_in">'+timeleft+'</span></label><br />';
			}
			if (boss.type == 'event' && boss.health > 0) {
				var num=boss.mastery*5+boss.id-40;
				html += '<label style="cursor:pointer;"><input type="radio" name="bossradio" class="spockboss" bosstype="event" bossid="'+boss.id+'" /> [Event] '+mastery_star(boss.mastery)+' <span class="good">'+boss.name+'</span> ['+num+'/20] <span class="health">'+boss.healthpct()+'%</span>, Attack: <span class="stamina" title="Next attack stamina cost">'+boss.staminaRequired+', </span></label><br />';
			}
			if (boss.type == 'mexico' && boss.health > 0) {
				html += '<label style="cursor:pointer;"><input type="radio" name="bossradio" class="spockboss" bosstype="mexico" bossid="'+boss.id+'" /> [Mexico] <span class="good">'+boss.name+'</span> Stage: '+boss.id+'/15 <span class="health">'+boss.health+'/'+boss.maxHealth+' ('+boss.healthpct()+'%)</span> <input type="checkbox" '+$i('mexicopower')+' /> Power attack</label><br />';
			}
		}
		$e('bosslist').html(html);
		$('input.spockboss').click(function(){
			var type=$('input.spockboss:checked').attr('bosstype');
			$ec('show_secret').hide();
			$ec('show_assassin').hide();
			$ec('show_family').hide();
			$ec('show_event').hide();
			
			$ec('show_'+type).show();
			if(type=="family") {
				active = $(this).attr('bossid');
				open_family_bossfight(true);
			} else {
				var bossid = $(this).attr('bossid');
				update_display_raven_secret(bossid);
			}
			
		});
		//$('input.spockboss:checked').trigger('click');
		msg('Waiting for boss selection and start.');
		//open_family_bossfight(true);
		if(parameters.auto) {
			log('Autostarting...');
			var bossid = $('input.spockboss[bosstype=family]:first').attr('bossid');
			if (bosses[bossid].collect) {
				collect_family_boss_loot(bossid, load_bosslist);
			} else {
				setTimeout(function(){
					$('input.spockboss[bosstype=family]').trigger('click');
					$e('start').trigger('click');
				},500);
			}
		}
		$ec('collectnow').click(function(){
			var bid=$(this).attr('data-id');
			collect_family_boss_loot(bid);
			return false;
		});
	}
	
	function open_bossfight() {
		//decide what bossfight to load
		$('input.spockboss:checked').each(function() {
			if ($(this).attr('bosstype') == 'secret' || $(this).attr('bosstype') == 'assassin' || $(this).attr('bosstype') == 'event' || $(this).attr('bosstype') == 'mexico') {	
				var bossid = $(this).attr('bossid');
				decide_next_action_secret(bossid);
				return;
			}
			if ($(this).attr('bosstype') == 'family') {
				active = $(this).attr('bossid');
				open_family_bossfight(false);
				return;
			}
			
		});
	}

	function open_family_bossfight(display_only){
		msg('Loading family bossfight page...');
		request('xw_controller=Epicclanboss&xw_action=boss_view&boss_id='+active,function(result) {
			if(result.indexOf('CHOOSE YOUR ROLE')!=-1) {
				if(!display_only) {
					join_bossfight();
				} else {
					msg('Waiting for start.');
				}
			} else {
				parse_bossfight(result);
				update_display();
				if(!display_only) {
					decide_next_action();
				} else {
					msg('Waiting for start.');
				}
			}
		});
	}

	function join_bossfight(){
		var role,choice=$('input@[name="sp_role"]:checked').val()
		msg('Joining bossfight...');
		switch(choice) {
			case "Arsonist": role="arsonist"; break;
			case "Racketeer": role="racketeer"; break;
			case "Random": role=Math.random()>0.5?"arsonist":"racketeer"; break;
			case "Balance": role=bosses[active].arsonist>bosses[active].racketeer?"racketeer":"arsonist"; break;
			case "Balance2": role=bosses[active].arsonist*3>bosses[active].racketeer?"racketeer":"arsonist"; break;
			default: role="arsonist"; break;
		}
		request('xw_controller=Epicclanboss&xw_action=epic_join&role='+role+'&boss_id='+active,function(result){
			log("Joined fight as "+role);
			parse_bossfight(result);
			update_display();
			decide_next_action();
		});
	}

	function parse_bossfight(result){
		var $msg = $(noimg(result));
		var old_bossdata = bossdata;
		bossdata = {};
		bossdata.stamina = result.re("user_fields..user_stamina.....parseInt\\(\"(\\d+)\"\\)");
		bossdata.nextRegenTime = parseInt(result.re("BossFightView.incrementChargeCounter\\((\\d+)\\);"))+unix_timestamp();

		// get general stuff
		var health = $msg.find('.bossInfo .health:first').text().trim();
		bossdata.bossMaxHealth = parseInt(health.substr(health.indexOf('/')+1));
		bossdata.bossHealth = parseInt(health.substr(0,health.indexOf('/')));
		bossdata.currentCharges = parseInt($msg.find('#chargeCounter').text().trim());
		bossdata.userFatigue = parseInt($msg.find('#userFatigue').text().trim().substr(9));
		bossdata.bossRage = parseInt($msg.find('#bossRage').text().trim().substr(6));
		bossdata.userScore = parseInt($msg.find('#userScoreValue').text().trim());
		try {
			bossdata.staminaRequired = parseInt(JSON.parse($msg.find('#attackBtn > a').attr('requirements')).stamina);
		}
		catch(error) {}

		bossdata.myRoleIcon = $msg.find('.boostPic > noimg').attr('src');
		bossdata.myRole = getPlayerType($msg.find('.boostPic > noimg').attr('src'));
		bossdata.myRoleId = getPlayerId(bossdata.myRole);

		// boosts
		bossdata.haveboost1 = parseInt($msg.find('#effectCount_1').text().trim());
		bossdata.haveboost2 = parseInt($msg.find('#effectCount_2').text().trim());
		bossdata.haveboost3 = parseInt($msg.find('#effectCount_3').text().trim());

		bossdata.askDisplay = {};
		bossdata.askDisplay["1"] = ($msg.find('#boostAskHelp_1').css('display')!=="none") && ($msg.find('#needBoost_1').css('display')!=="none");
		bossdata.askDisplay["2"] = ($msg.find('#boostAskHelp_2').css('display')!=="none") && ($msg.find('#needBoost_2').css('display')!=="none");
		bossdata.askDisplay["3"] = ($msg.find('#boostAskHelp_3').css('display')!=="none") && ($msg.find('#needBoost_3').css('display')!=="none");

		bossdata.haveconsumable1 = parseInt($msg.find('#consumable_1 > .corner_number').text().trim());
		bossdata.haveconsumable2 = parseInt($msg.find('#consumable_2 > .corner_number').text().trim());
		bossdata.haveconsumable3 = parseInt($msg.find('#consumable_3 > .corner_number').text().trim());
		bossdata.haveconsumable4 = parseInt($msg.find('#consumable_4 > .corner_number').text().trim());

		bossdata.pendingRollEffects = { "1":{},"2":{},"3":{}};
		bossdata.leaderboard = { entries:[] };
		// player
		$msg.find('.leaderboard_player').each(function(){
			var player = {};
			player.name = $(this).find('.participant_name').text().trim();
			player.score = parseInt($(this).find('.damageScore').text().trim());
			player.needRoleHelp = $(this).find('.helpButton').css('display')!='none';
			player.profilePicURL = $(this).find('.profilePic').attr('src');
			player.roleName = $(this).find('.roleText').text().trim();
			player.helpURL = $(this).find('.helpButton > a').attr('href');
			if (player.helpURL) {
				player.ppid = unescape(player.helpURL.re('target_ppid=(p%7C\\d+)'));
			}
			bossdata.leaderboard.entries.push(player);
		});
		// console.log(bossdata);
		//log(JSON.stringify(bossdata));
		read_consumables(result,'family');
		
		update_history(old_bossdata);
	}

	function update_history(old_bossdata) {
		var output = '';
		if (old_bossdata && old_bossdata.leaderboard) {
			var ragediff = bossdata.bossRage-old_bossdata.bossRage;
			if ((old_bossdata.bossHealth>bossdata.bossHealth) || (ragediff!=0)) {
				var ragediff = bossdata.bossRage-old_bossdata.bossRage;
				var ragestr = '<span class="'+(ragediff>0?'bad':'good')+'">'+(ragediff>0?'+':'')+ragediff+'</span>';
				//add_history('Boss lost: <span class="health bad">'+(bossdata.bossHealth-old_bossdata.bossHealth)+'</span>, <span '+$c('arsonist')+'>Rage:</span> '+ragestr+'');
				output += 'Boss lost: <span class="health bad">'+(bossdata.bossHealth-old_bossdata.bossHealth)+'</span>, <span '+$c('arsonist')+'>Rage: '+bossdata.bossRage+'</span> ('+ragestr+')<br />';
			}
			for (i=0;i<bossdata.leaderboard.entries.length;i++) {
				var player = bossdata.leaderboard.entries[i];
				var familyinfo = find_element(familylist_MW,'name',player.name);
				var player_old = find_element(old_bossdata.leaderboard.entries,'name',player.name);
				if (!player_old) {
					//add_history('New player joined: "'+player.name+'"');
					output += '           New player joined: "'+player.name+'<br />';
				}
				else {
					if (player_old.score<player.score) {
						//add_history('Player "'+player.name+'" increased score: <span class="good">+'+(player.score-player_old.score)+'</span>'+(player.score-player_old.score==75?'<span class="more_in"> (probably sent a boost)</span>':''));
						output += '           Player "'+player.name+'" increased score: <span class="good">+'+(player.score-player_old.score)+'</span>'+(player.score-player_old.score==75?'<span class="more_in"> (probably sent a boost)</span>':'')+'<br />';
					}
				}
			}
			if (output.length > 0) {
				add_history(output);
			}
		}
	}
	function update_display_items(){
		var type,itemid,html='';
		for(type in items_by_type) {
			html='';
			for(itemid in items_by_type[type]) {
				html+='<img src="'+items_by_type[type][itemid].pic+'" width="24" height="24" title="'+items_by_type[type][itemid].name+'" /> &times; '+items_by_type[type][itemid].count+' <span class="more_in" '+$i('cs_'+itemid)+'></span> &nbsp; ';
			}
			$e('show_consumables_'+type).html(html);
		}
		
	}
	
	function update_display(){
		var i,limit = parseInt($e('scorelimit').val());
		var ragelimit = parseInt($e('conf_ragelimit').val());
		var fatlimit = parseInt($e('conf_fatlimit').val());
   
		$('#user_stamina').html(bossdata.stamina);
		
		// console.log(bossdata);
		
		// first try all fields
		for (i in bossdata) {
			$e('stat_'+i).html(bossdata[i]);
		}
		if ((bossdata.haveboosts1==0) && (bossdata.askDisplay["1"]===true)) {
			$e('stat_haveboost1').append('[Ask]');
		}
		if ((bossdata.haveboosts2==0) && (bossdata.askDisplay["2"]===true)) {
			$e('stat_haveboost2').append('[Ask]');
		}
		if ((bossdata.haveboosts3==0) && (bossdata.askDisplay["3"]===true)) {
			$e('stat_haveboost3').append('[Ask]');
		}
		$e('stat_currentCharges').parent().removeClass().addClass(spocklet+'_'+bossdata.myRole);
		$e('stat_currentCharges').parent().find('img').attr('src',bossdata.myRoleIcon);

		if ((limit) && (limit<bossdata.userScore)) {
			$e('stat_userScore').append(' (Limit reached)');
		}
		if (bossdata.bossRage > ragelimit) {
			$e('stat_bossRage').append(' (Limit)');
		}
		if (bossdata.userFatigue > fatlimit) {
			$e('stat_userFatigue').append(' (Limit)');
		}

		if (bossdata.nextRegenTime) {
			if (bossdata.nextRegenTime-unix_timestamp()>0) {
				$e('more_boosts').html(morein(bossdata.nextRegenTime-unix_timestamp()));
			}
		}

		if (bossdata.bossHealth==0) {
			$e('stat_bossHealth').append(' (Dead!)');
		}
		
		for (i=1;i<4;i++) {
			if (bossdata.pendingRollEffects[i].ppid) {
				var ppid = bossdata.pendingRollEffects[i].ppid;
				if (!store.recentsentme[i][ppid]) {
					store.recentsentme[i][ppid] = true;
					if (familylist_MW[ppid.substr(2)]) {
						var player = familylist_MW[ppid.substr(2)];
						log('<img src="'+player.pic+'" width=16 height=16 /> '+player.name+' sent a boost');
						store.retaliate[ppid] = store.retaliate[ppid]?store.retaliate[ppid]+1:1;
						store.receivedlist[ppid] = store.receivedlist[ppid]?store.receivedlist[ppid]+1:1;
					}
					else {
						log('Unknown sent a boost');
					}
				}
			}
		}

		// player
		$ec('tr').remove();
		var html = '';
		for (i=0;i<bossdata.leaderboard.entries.length;i++) {
			var player = bossdata.leaderboard.entries[i];
			var familyinfo = find_element(familylist_MW,'name',player.name);
			// console.log(familyinfo);

			html += '<tr '+$c('tr')+'><td><img src="'+player.profilePicURL+'" width="16" height="16" /></td>';
			if (familyinfo && familyinfo.fbid) {
				html += '<td><a href="https://www.facebook.com/'+familyinfo.fbid+'" target="_blank">'+player.name+'</a></td>';
			}
			else {
				html += '<td>'+player.name+'</td>';
			}

			html +='<td><span '+$c(player.roleName.toLowerCase())+'>'+player.roleName+'</span></td>'+
				'<td><span class="'+(player.score>limit?'good':'bad')+'">'+player.score+'</span></td>';

			if ((player.needRoleHelp) && (bossdata.currentCharges>0)) {
				html += '<td><a href="#" data-id="'+i+'" '+$c('sendboost',[],['sexy_button_new shorter','black'])+' ><span><span>Boost</span></span></a></td>';
			}
			html += '</tr>';
		}
		$e('table').append(html);
		$ec('sendboost').click(function(){
			var id = $(this).attr('data-id');
			log("Manual send to "+bossdata.leaderboard.entries[id].name);
			send_boost(id,true);
			return false;
		});

		update_relations();
	}
	
	function update_display_raven_secret(bossid){
		for (i in bosses[bossid]) {
			$e('stat_'+i).html(bosses[bossid][i]);
		}	
		if(stats.exp_gained>0) {
			var ratio=(stats.exp_gained/stats.stamina_used_for_ratio).toFixed(2);
			$e('stats_ratio').html(ratio);
			$e('stats_xp').html(stats.exp_gained);
			$e('stats_stamina').html(stats.stamina_used);
		}
		
	}
	
	function update_relations(){
		var ppid,html='<table width=100% cellpadding=3><tr><td>People that sent me boosts</td><td>People I sent boosts</td></tr>';
		html+='<tr><td valign=top>';
		for(ppid in store.receivedlist){
			var player=familylist_MW[ppid.substr(2)];
			html+='<img src="'+player.pic+'" width="16" height="16" /> '+player.name+' &times; <span class="good">'+store.receivedlist[ppid]+'</span><br />';
		}
		html+='</td><td valign=top>';
		for(ppid in store.sentlist){
			var player=familylist_MW[ppid.substr(2)];
			html+='<img src="'+player.pic+'" width="16" height="16" /> '+player.name+' &times; <span class="good">'+store.sentlist[ppid]+'</span><br />';
		}
		html+='</td></tr></table>';
		
		
		$e('rel').html(html);
	}
	
	

	function someone_needs_boost(){
		var i,score=0,maxscore=0,target=[],giveboost=$('input@[name="sp_boosts"]:checked').val()
		var limit=parseInt($e('scorelimit').val()) || 1E10;
		if(giveboost=="none") { return null; }

		for(i=0;i<bossdata.leaderboard.entries.length;i++) {
			var player=bossdata.leaderboard.entries[i];
			if(player.ppid && ((!store.isent[player.ppid]) || (store.isent[player.ppid]<unix_timestamp()-60))) {
				if(player.needRoleHelp){
					switch(giveboost) {
						case 'lowscore': score=1E10-player.score;
						break;
						case 'highscore': score=player.score;
						break;
						case 'randomscore': score=1;
						break;
						case 'below': if(player.score<limit) { score=1; } else { score=-1; }
						break;
					}
					if(score>maxscore) {
						target=[i];
						maxscore=score;
					} else if (score==maxscore) {
						target.push(i);
					}
				}
			}
		}
		if(target.length>0) { return target; } else { return null; }
	}

	function give_boost() {
		var list=someone_needs_boost();
		if(list) {
			var r=parseInt(Math.random()*list.length);
			send_boost(list[r]);
		}
		else {
			log("Error!");
		}
	}

	function decide_next_action(){
		if(!run) { return; }

		var ragelimit=parseInt($e('conf_ragelimit').val());
		var fatlimit=parseInt($e('conf_fatlimit').val());
		var limit=parseInt($e('scorelimit').val()) || 1E10;
		var stop=$('input@[name="spstop"]:checked').val();

		if((bossdata.userScore>limit) && (stop=="stop")) {
			msg('Limit reached, stopping.');
			log('Limit reached, stopping.');
			run = false;
			return;
		}

		if(bossdata.bossHealth==0) {
			msg('Boss is dead! Victory!');
			log('Boss is dead, stopping.');
			run=false;
			return;
		}

		/*
		ask section
		*/
		if(bossdata.userScore<limit) {
			if(!$e('noaskbruiser').is(':checked')) {
				if(bossdata.askDisplay["1"]===true) {
					if(bossdata.haveboost1==0) {
						ask_for_boost(1);
						return;
					}
				}
			}
			if(!$e('noaskarson').is(':checked')) {
				if(bossdata.askDisplay["2"]===true) {
					if(bossdata.haveboost2==0) {
						ask_for_boost(2);
						return;
					}
				}
			}
			if(!$e('noaskracket').is(':checked')) {
				if(bossdata.askDisplay["3"]===true) {
					if(bossdata.haveboost3==0) {
						ask_for_boost(3);
						return;
					}
				}
			}
		}

		/*
		helper section
		*/
		if((bossdata.currentCharges>0) && (someone_needs_boost())) {
			give_boost();
			return;
		}


		/*
		attack section
		*/
		if(bossdata.userScore<limit) {
			// see if we want to attack with a combo
			// no need to check stamina, no need to check fetigue
			if((combo_todo.length>0) && (bossdata.bossRage<ragelimit))
			{
				msg('Attacking with combo!');
				attack_combo(active);
				return;
			}

			// otherwise, try boring stam attack	
			if(bossdata.stamina>=bossdata.staminaRequired) {
				if((bossdata.userFatigue<fatlimit) && (bossdata.bossRage<ragelimit)) {
					msg('Attacking!');
					attack_stam(active);
					return;
				}

				if((bossdata.userFatigue<fatlimit) && (bossdata.haveboost2>0)) {
					msg('Attacking to lower rage...');
					attack_stam(active);
					return;
				}

				if((bossdata.bossRage<ragelimit) && (bossdata.haveboost3>0)) {
					msg('Attacking to lower fatigue...');
					attack_stam(active);
					return;
				}

				if ((bossdata.haveboost3>0) && (bossdata.haveboost2>0)) {
					msg('Attacking to lower rage and fatigue...');
					attack_stam(active);
					return;
				}
			}
			else {
				msg('Out of stamina, not attacking.');
				
				if($e('restart').is(':checked')) {
					var wait=parseFloat($e('restart_time').val());
					if(wait<1) { wait=1; }
					pause(parseInt(wait*60),'Out of stamina, retry in %s',open_family_bossfight,false,false);
				}
				return;
				
			}

			if(bossdata.bossRage<ragelimit) {
				//log("Why not try consumables?");
				//return;
			}
		}

		pause(10,'Reloading in %s',open_family_bossfight,false,false);
	}

	function decide_next_action_secret(bossid) {
		if(!run) { return; }
	
		var combo;
		if(combo_todo.length>0) {
			attack_combo(bossid);
			return;
		}
	
		if (bosses[bossid].type == 'assassin') {
			// check queue
			if(raven_queue.length>0) {
				combo=raven_queue.shift();
				show_raven_queue();
			}
			else {
				log("Queue empty! Please select combo(s) to attack!");
				$e('pause').trigger('click');
				return;
			}
		}
		else if(bosses[bossid].type == 'secret') {
			// check queue
			if(secret_queue.length>0) {
				combo=secret_queue.shift();
				if((secret_queue.length==0) && (secret_repeat_limit)) {
					secret_queue.push(combo);
				}
				show_secret_queue();
			}
			else {
				log("Queue empty! Please select method to attack! Select \"repeat\" to do Non-Stop combos.");
				$e('pause').trigger('click');
				return;
			}
		}		
		else if(bosses[bossid].type == 'event') {
			// check queue
			if(event_queue.length>0) {
				combo=event_queue.shift();
				if((event_queue.length==0) && (event_repeat_limit)) {
					event_queue.push(combo);
				}
				show_event_queue();
			}
			else {
				log("Queue empty! Please select method to attack! Select \"repeat\" to do Non-Stop combos.");
				$e('pause').trigger('click');
				return;
			}
		}
		else if (bosses[bossid].type == 'mexico') {
			attack_stam(bossid);
			return;			
		}
		
		if (combo > 0 && combo < 100) {
			//log('Combo '+combo+' selected, '+write_combo(bossid,combo));
			write_combo(bossid,combo);
			attack_combo(bossid,combo);
		}
		else if (combo == 100) {
			msg('Selecting best avalible combo...');
			log('Supposed to select best combo, not implemented.');
			$e('pause').trigger('click');
		}
		else if (combo == 101) {
			//msg('Nunchuck attack...');
			combo_todo.push(21928);
			attack_combo(bossid);
		}
		else if (combo == "combo_1") {
			write_combo(bossid,1);
			attack_combo(bossid,1);
		}
		else if (combo == "combo_2") {
			write_combo(bossid,2);
			attack_combo(bossid,2);
		}
		else if (combo == "combo_3") {
			write_combo(bossid,3);
			attack_combo(bossid,3);
		}
		else if (combo == "item_4") {
			//msg('Consumable...');
			combo_todo.push(bosses[bossid].consumableId);
			attack_combo(bossid);
		}
		else if (combo == "item_3") {
			//msg('Consumable...');
			combo_todo.push(2596);
			attack_combo(bossid);
		}	
		else if (combo == "random") {
			msg('Selecting random consumable...');
			log('Supposed to select random consumable, not implemented.');
			$e('pause').trigger('click');
		}
		else if (combo=="stamina") {
			if((secret_repeat_limit>5) && (bosses[bossid].staminaRequired > secret_repeat_limit)) {
				msg('Stamina limit reached, stopping.');
				log('Stamina limit reached, stopping.');
				secret_repeat_limit = false;
				secret_queue = [];
				show_secret_queue();

			} else if ($e('levelup').is(':checked') && (parseInt($e('exp_level').val())>User.exp_to_next_level)){
				log('Could level on next attack, stopping.');
				msg('Could level on next attack, stopping.');
				$e('pause').trigger('click');
			} else if (bosses[bossid].staminaRequired < User.stamina) {
				msg('Attacking secret boss...');
				attack_stam(bossid);
			}
			else {
				msg('Not enough stamina!');
				log('Not enough stamina!');
				
				if($e('restart').is(':checked')) {
					var wait=parseFloat($e('restart_time').val());
					if(wait<1) { wait=1; }
					pause(parseInt(wait*60),'Out of stamina, retry in %s',decide_next_action_secret,bossid,false);
					user_experience = 0;
				}
				
			}
		}
	}

	function get_family(){
		request('xw_controller=clan&xw_action=view',function(page){
			familylist_FB={};
			familylist_MW={};
			var jpage=$('<div>'+page+'</div>');
			jpage.find('#member_list').find('.member_info').each(function(){
				try {
					var m,member={};
					member.fbid=0,m;
					if (m=/\d+_(\d+)_\d+/.exec($(this).find('.clan_member_pic').attr('src'))) {
						member.fbid=m[1];
					}
					member.pic=$(this).find('.clan_member_pic').attr('src');
					member.mwid=$(this).find('.extended_info').prop('id').substr(14);
					member.name=$(this).find('.name_n_rank:first').text().trim();
					member.level=parseInt($(this).find('.member_level').text());
					familylist_MW[member.mwid]=member;
				} catch (invalidsomething) {}
			});
			log("Family loaded.");
			//console.log(familylist_MW);
		});
	}

	/******************** actions ****************	****/
	function attack_stam(bossid){
		if (bosses[bossid].type == 'family') {
			request('xw_controller=Epicclanboss&xw_action=epic_attack&consumable_id=0&boss_id='+bossid,function(page){
				try {
					var json=JSON.parse(page);
					var data=JSON.parse(json.data);
					if(json.user_fields && json.user_fields.user_stamina) {
						data.stamina = json.user_fields.user_stamina;
					}
					log('Attacked <span class="attack">'+data.damage.toBoss+'</span>, points: <span class="good">+'+(data.userScore-bossdata.userScore)+"</span>");
					var old_bossdata=bossdata;
					bossdata=data;
					bossdata.haveboost1=bossdata.pendingRollEffects["1"].count;
					bossdata.haveboost2=bossdata.pendingRollEffects["2"].count;
					bossdata.haveboost3=bossdata.pendingRollEffects["3"].count;
					if(bossdata.haveboost1==0) { store.recentsentme["1"]={}; }
					if(bossdata.haveboost2==0) { store.recentsentme["2"]={}; }
					if(bossdata.haveboost3==0) { store.recentsentme["3"]={}; }
				}
				catch(e) {
					log("Error while attacking"); // todo: find error
					console.log(e);
				}
				update_history(old_bossdata);
				update_display();
				decide_next_action();
			});
		}
		
		if (bosses[bossid].type == 'secret') {
			var boss = bosses[bossid];
			request('xw_controller=bossfightv2&xw_action=attack&consumableUsed=0&bossId='+boss.id+'&stageId='+boss.tab+'&stageCity='+boss.city+'&bossLevel='+boss.mastery,function(page){
				try {
					var json = JSON.parse(page);
					var data = JSON.parse(json.data);
					update_game_ui_sp(json);
					if(user_experience) {
						data.gained=json.user_fields.user_experience-user_experience;
						user_experience=json.user_fields.user_experience;
					}
					
					if (json.popup_id == 'pop_hospital_popup_view_div') {
						//log('<span class="bad">[Error]</span> Out of health, need to heal.');
						//$e('pause').trigger('click');
						heal(decide_next_action_secret,bossid);
						return;
					}
					else if (data.message.success) {
						bosses[bossid].staminaRequired = parseInt(data.stamina_required);
						stats.stamina_used += parseInt(data.stamina_required - 5);
						//stats.exp_gained += parseInt(json.user_fields.xp_earned);
						bosses[bossid].health = data.bossHealth;
						log('<span class="attack"> '+data.damage.toBoss+'</span>, <span class="health"> '+data.bossHealth+' ('+bosses[bossid].healthpct()+'%)</span>, <span class="stamina"> '+(data.stamina_required-5)+'</span>');
						if (debug) { console.log(stats); }
						
						if (Util.isset(data.comboUnlockList)) {
							var comboid = JSON.parse(data.comboUnlockList);
							log('Unlocked a combo with id: '+comboid.data.comboId+' (2: Orange, 3: Red)');
						}
						
						decide_next_action_secret(bossid);
					}
					else {
						log('<span class="bad">[Error]</span> '+data.message);
					}
				} catch(e) {
					log('Error while attacking: '+e); // todo: find and handle errors
					console.log(e);
				}
			});
		}		
		
		if (bosses[bossid].type == 'event') {
			var boss = bosses[bossid];
			request('xw_controller=TerritoryBossFightV2&xw_action=attack&consumableUsed=0&bossId='+boss.id+'&stageId=&stageCity=&bossLevel='+(boss.mastery+1),function(page){
				try {
					var json = JSON.parse(page);
					var data = JSON.parse(json.data);
					update_game_ui_sp(json);
					if(user_experience) {
						data.gained=json.user_fields.user_experience-user_experience;
					}					
					user_experience=json.user_fields.user_experience;
					if (json.popup_id == 'pop_hospital_popup_view_div') {
						//log('<span class="bad">[Error]</span> Out of health, need to heal.');
						//$e('pause').trigger('click');
						heal(decide_next_action_secret,bossid);
						return;
					}
					else if (data.message.success) {
						bosses[bossid].staminaRequired = parseInt(data.stamina_required);
						stats.stamina_used += parseInt(data.stamina_required);
						bosses[bossid].health = data.bossHealth;
						//$e('stat_bossHealth').html(data.bossHealth);
						if(data.gained) {
							log('<span class="attack" title="Damage dealt"> '+data.damage.toBoss+'</span> &nbsp; <span class="health"> '+data.bossHealth+' ('+bosses[bossid].healthpct()+'%)</span> &nbsp; <span class="stamina"> '+(data.stamina_required)+'</span> &nbsp; <span class="experience"> '+data.gained+' / '+(data.gained/data.stamina_required).toFixed(2)+'</span>');
							stats.exp_gained += data.gained;
							stats.stamina_used_for_ratio += parseInt(data.stamina_required);
						} else {
							log('<span class="attack" title="Damage dealt"> '+data.damage.toBoss+'</span> &nbsp; <span class="health"> '+data.bossHealth+' ('+bosses[bossid].healthpct()+'%)</span> &nbsp; <span class="stamina"> '+(data.stamina_required)+'</span>');
						}
						update_display_raven_secret(); //is this missing bossid?
						if (debug) { console.log(stats); }
						if ((data.message.bossDefeated) || (data.message.wasbossDefeated)) {
							log('<span class="good">Success!</span> Boss has been slain!');
							if (Util.isset(json.popup)) {
								$('#popup_fodder').prepend('<div id="'+json.popup_id+'"></div>');
								$('#'+json.popup_id).append(json.popup);
							}
							if(bosses[bossid].type=="event") {
								msg('Reloading bosses...');
								$e('pause').trigger('click');
								load_bossevent();
							}							
						}
						else {
							decide_next_action_secret(bossid);
						}
					}
					else {
						log('<span class="bad">[Error]</span> '+data.message);
					}
				} catch(e) {
					log('Error while attacking: '+e); // todo: find and handle errors
					console.log(e);
				}
			});
		}
		
		if (bosses[bossid].type == 'mexico') {
			//&pa=1 power attack enabled
			request('xw_controller=BossDistrict&xw_action=attackBoss&xw_city=11&tmp=&cb=&xw_person=&mwcom=1&pa='+($e('mexicopower').is(':checked')?'1':'0')+'&stage_id='+bossid,function(attack) {
				var json = JSON.parse(attack), data = json.data;
				if (data.success) {
					if (prevstamina != 0) {
						stats.stamina_used += parseInt(prevstamina - data.userData.stamina,10);
						stats.stamina_used_for_ratio += parseInt(prevstamina - data.userData.stamina,10);
						stats.exp_gained += parseInt(json.user_fields.xp_earned,10);
					}
					prevstamina = data.userData.stamina;
					bosses[bossid].health = data.bossHealth;
					log('Won! Damage: '+data.bossData.damage+' <span class="health">'+data.bossData.health+'/'+data.bossData.maxHealth+'</span>');
					//$e('stat_bossHealth').html(data.bossData.health);
					//$e('stat_bossMaxHealth').html(data.bossData.maxHealth);
					update_display_raven_secret(bossid);
				}
				else {
					if(data.msg) {
						log(data.msg);
					}
					else {
						if(json.user_fields.current_city_id != 11) {
							log('Travel detected. Travelling back to Mexico...');
							travel(11,function(){
								decide_next_action_secret(bossid);
							});
							return;
						}
						else {
							log('Something went wrong, but no error provided. Try reloading the tab and run again.');
							return;
						}
					}
				}
				
				if (data.msg == 'Health Low') {
					heal(decide_next_action_secret,bossid);
					return;
				}
				
				if (data.msg == 'Stamina Low') {
					$e('pause').trigger('click');
					return;
				}
				
				if (Util.isset(json.popup)) {
					$('#popup_fodder').prepend('<div id="'+json.popup_id+'"></div>');
					$('#'+json.popup_id).append(json.popup);
				}
				
				if ((data.bossData.health > 0) && run) {
					msg('Attacking boss again...');
					decide_next_action_secret(data.bossData.stage_id);
				}
				else {
					log('Boss killed!');
					$e('pause').trigger('click');
					run = false;
				}
				
			});
		}
	}
	
	function attack_combo(bossid,combo) {
		if (bosses[bossid].type == 'secret' || bosses[bossid].type == 'assassin' || bosses[bossid].type == 'event') {
			if (combo_todo.length == 0) {
				if(!bosses[bossid].combos[combo]) {
					log("Combo unknown yet, please unlock it first!");
					$e('pause').trigger('click');
					return;
				}
				combo_todo = bosses[bossid].combos[combo].slice(); // clone, not ref
			}
			msg('Attacking with combo id '+combo+', using item: '+items[combo_todo[0]].name+' step '+(5-combo_todo.length));
			var boss = bosses[bossid];
			var consumid = items[combo_todo[0]].div_id;
			var url;
			if (bosses[bossid].type == 'event') {
				url='xw_controller=TerritoryBossFightV2&xw_action=attack&consumableUsed='+consumid+'&bossId='+boss.id+'&stageId=&stageCity=&bossLevel='+(boss.mastery+1);
			} else {
				url='xw_controller=bossfightv2&xw_action=attack&consumableUsed='+consumid+'&bossId='+boss.id+'&stageId='+boss.tab+'&stageCity='+boss.city+'&bossLevel='+boss.mastery;
			}
			
			request(url,function(page){
				try {
					var data,json = JSON.parse(page);
					if(typeof json.data === 'object') {
						data = json.data;
					} else {
						data = JSON.parse(json.data);
					}
					update_game_ui_sp(json);
					if (json.popup_id == 'pop_hospital_popup_view_div') {
						//log('<span class="bad">[Error]</span> Out of health, need to heal.');
						//$e('pause').trigger('click');
						heal(decide_next_action_secret,bossid);
						return;
					}
					if(data.impulseBuy) {
						log('Out of consumable, stopping.');
						combo_todo = [];
						$e('pause').trigger('click');
						return;
					}					
					else if (data.message.success) {
						combo_todo.shift();
						bosses[bossid].staminaRequired = parseInt(data.stamina_required);

						bosses[bossid].health = data.bossHealth;
						bosses[bossid].bossHealth = data.bossHealth;
					
						log('<span class="attack" title="Damage dealt"> '+data.damage.toBoss+(data.damage.comboDamage?' ('+data.damage.comboDamage+' combo)':'')+'</span> &nbsp; <span class="health"> '+data.bossHealth+' ('+bosses[bossid].healthpct()+'%)</span>');
						update_display_raven_secret();

						items[data.consumableData[data.consumable].itemId].count=data.consumableData[data.consumable].userAmount;
						if(bosses[bossid].type=="secret") {
							items_by_type[bosses[bossid].type][data.consumableData[data.consumable].itemId].count=data.consumableData[data.consumable].userAmount;
						}
						if(bosses[bossid].type=="event") {
							items_by_type[bosses[bossid].type][data.consumableData[data.consumable].itemId].count=data.consumableData[data.consumable].userAmount;
						}
						
						update_display_items();						
						//console.log(['after',data,items]);
						
						update_display_raven_secret(bossid);

						if ((data.message.bossDefeated) || (data.message.wasbossDefeated)) {
							log('<span class="good">Success!</span> Boss has been slain!');
							if (Util.isset(json.popup)) {
								$('#popup_fodder').prepend('<div id="'+json.popup_id+'"></div>');
								$('#'+json.popup_id).append(json.popup);
							}
							if(bosses[bossid].type=="event") {
								msg('Reloading bosses...');
								$e('pause').trigger('click');
								load_bossevent();
							}
							
							return;
						}
						if (debug) { console.log(stats); }
						if (combobreaker && data.damage.comboDamage) {
							if (Util.isset(data.comboUnlockList)) {
								var comboid = JSON.parse(data.comboUnlockList);
								log('Unlocked a combo with id: '+comboid.data.comboId+' (2: Orange, 3: Red)');
							}
							log('<span class="good">Combo unlocked!</span> Found a combo, stopping.');
							msg('Combo found, stopping.');
							return;
						}
						
						if (combo_todo.length > 0) {
							open_bossfight();
						} else {
							decide_next_action_secret(bossid);
						}
					}
					else {
						log('<span class="bad">[Error]</span> '+data.message);
					}
				} catch(e) {
					log('Error while attacking: '+e); // todo: find and handle errors
					console.log(e);
				}
			});
		} else { // family
			var consumable_id=parseInt(combo_todo[0])-6041; // cheap trick, I know
			request('xw_controller=Epicclanboss&xw_action=epic_attack&consumable_id='+consumable_id+'&boss_id='+active+'&impulse_buy=1&xw_client_id=8',function(page){
				//try {
					var data,json = JSON.parse(page);
					if(typeof json.data === 'object') {
						data = json.data;
					} else {
						data = JSON.parse(json.data);
					}
					update_game_ui_sp(json);
					if(data.impulseBuy) {
						log('Out of consumable, continue normal attack');
						combo_todo = [];
						$e('family_combo_active').text('');
						decide_next_action();	
						return;
					}
					if (json.popup_id == 'pop_hospital_popup_view_div') {
						heal(decide_next_action_secret,active);
						return;
					}
					else if (data.message.success) {
						combo_todo.shift();
						if(combo_todo.length>0) {
							$e('family_combo_active_count').text(combo_todo.length);
						} else {
							$e('family_combo_active').text('');
						}

						log('Attacked <span class="attack">'+data.damage.toBoss+(data.damage.comboDamage?' ('+data.damage.comboDamage+' combo)':'')+'</span>, points: <span class="good">+'+(data.userScore-bossdata.userScore)+"</span>");
						var old_bossdata=bossdata;
						bossdata=data;
						bossdata.haveboost1=bossdata.pendingRollEffects["1"].count;
						bossdata.haveboost2=bossdata.pendingRollEffects["2"].count;
						bossdata.haveboost3=bossdata.pendingRollEffects["3"].count;
						if(bossdata.haveboost1==0) { store.recentsentme["1"]={}; }
						if(bossdata.haveboost2==0) { store.recentsentme["2"]={}; }
						if(bossdata.haveboost3==0) { store.recentsentme["3"]={}; }

						//items[data.consumableData[data.consumable].itemId].count=data.consumableData[data.consumable].userAmount;

						update_history(old_bossdata);
						update_display();
						decide_next_action();						
					} else {
						log('<span class="bad">[Error]</span> '+data.message);
					}
				//} catch(e) {
				//	log("Error while attacking"); // todo: find error
				//	console.log(e);
				//}
			});
		}
	}

	function ask_for_boost(roleid) {
		msg('Asking for boosts...');
		request('xw_controller=Epicclanboss&xw_action=epic_ask_role&role_id='+roleid+'&boss_id='+active,function(result){
			try {
				var json=JSON.parse(result);
				log($(json.data.impulseBuy.message).text());
				if(json.data.impulseBuy.message.indexOf('You asked for')!=-1) {
					bossdata.askDisplay[roleid]=false;
				}
			} catch(c) {
				console.log(c);
				log('Error asking for boost');
			}
			update_display();
			decide_next_action();
		});
	}

	function send_boost(target,no_action) {
		msg('Sending boost...');
		request('xw_controller=Epicclanboss&xw_action=epic_send_role&cell_id='+target+'&role_id='+bossdata.myRole+'&boss_id='+active+'&target_ppid='+escape(bossdata.leaderboard.entries[target].ppid),function(page){
			try {
				var json=JSON.parse(page);
				var data=JSON.parse(json.data);
				if(data.message.success) {
					log("Sent boost to "+bossdata.leaderboard.entries[target].name);
					var ppid=bossdata.leaderboard.entries[target].ppid;
					store.isent[ppid]=unix_timestamp();
					bossdata.leaderboard.entries[target].needRoleHelp=false;
					bossdata.currentCharges=json.charges;
					// retaliated
					if(store.retaliate[ppid]) {
						if(store.retaliate[ppid]>1) {
							store.retaliate[ppid]--;
						} else {
							delete store.retaliate[ppid];
						}
					}
					store.sentlist[ppid]=store.sentlist[ppid]?store.sentlist[ppid]+1:1;
				} else {
					log(data.message.message);
				}
			} catch(e) {
				log("Error while sending boost");
				console.log(e);
			}
			update_display();
			if(!no_action) {
				decide_next_action();
			}
		});
	//	"leaderboard":[],"charges":4,"cellId":"5","timeLeft":1799
	}
	
	function collect_family_boss_loot(bossid, handler){
		request('xw_controller=Epicclanboss&xw_action=epic_collect&boss_id='+bossid,function(msg) {
			window.eike=msg;
			var $msg=$(msg), html='<span class="good">Collected:</span> ';
			$msg.find('td').each(function(){
				var name=$(this).children().last().text().trim();
				var att=$(this).find('.attack').text().trim();
				var def=$(this).find('.defense').text().trim();
				var img=$(this).find('img').attr('src');
				var id=$(this).find('.item_with_preview').attr('item_id');
				var image = '<img width="16" height="16" title="'+name+'" src="'+img+'" class="item_with_preview" item_id="'+id+'" />';
				html+=image+' '+name+' '+'<span class="attack">'+att+'</span> <span class="defense">'+def+'</span> ';
			});
			log(html);
			if(handler) {
				setTimeout(handler,1000);
			}
		});
	}

	function heal(callback,bossid) {
		msg('Need to heal, healing...');
		var url = 'xw_controller=hospital&xw_action=heal&xw_city=&xcity=1';
		request(url,function(response) {
			var page = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
			log(page.hospital_message);
			
			if (/You cannot heal so fast/.test(page.hospital_message)) {
				if (Util.isset(page.waitHealTimer)) {
					//log('Heal possible in '+page.waitHealTimer+' seconds.');
					pause(parseInt(page.waitHealTimer+1),'Retrying heal in %',heal,decide_next_action_secret,bossid);
					return;
				}
				else {
					pause(10,'Retrying heal in %',heal,decide_next_action_secret,bossid);
					return;
				}
			}
			else {
				callback(bossid);
			}
		});
	}
	
	function travel(destination, handler, errorhandler) {
		var params = {
			'destination': destination,
			'from': 'hospital',
			'tmp': unix_timestamp(),
			'cb': User.id+unix_timestamp(),
			'xw_person': User.id.substr(2),
			'xw_client_id': 8,
			'ajax': 1,
			'liteload': 1,
			'sf_xw_sig': local_xw_sig,
			'sf_xw_user_id': User.id
		};
		var http = 'http://';
		if (/https/.test(document.location)) {
			http = 'https://';
		}
		$.ajax({
			type: 'POST',
			data: params,
			url: MW_BASE_URL+'/remote/html_server.php?xw_controller=travel&xw_action=travel',
			success: handler,
			error: errorhandler
		});
	}
	/******************** helper *********************/
	function pause(secs,message,handler,param,param2) {
		if(!run) { return; }
		if(secs>0) {
			msg(message.replace('%',secs));
			timer=setTimeout(pause,1000,secs-1,message,handler,param,param2);
		} else {
			handler(param,param2);
		}
		if(bossdata.nextRegenTime) {
			$e('more_boosts').html(morein(bossdata.nextRegenTime-unix_timestamp()));
		}
	}

	function morein(s) {
		if(s>3600) {
			var h=parseInt(s/3600);
			s=s%3600;
			var m=parseInt(s/60);
			s=s%60;
			return h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
		} else if(s>60) {
			var m=parseInt(s/60);
			s=s%60;
			return m+':'+(s<10?'0':'')+s;
		} else {
			return s+'s';
		}
	}
	
	/*
	 *  Function to check for parameters given to this script. i.e. run it with scriptname.js?action=kill, then do a if(get_param()['action']=='kill') { ... }
	 *
	 *  If you copy this function, change the script name. 
	 *  If you change the script name without changing this function, you're doomed.
	 *  If you copy the script without having the prototype.re, you're doomed too.
	 */	
	function get_params() {
		try {
			var foundscript;
			$('script').each(function(){
				var src=$(this).attr('src');
				if(src && (src.indexOf('bossfighter.js?')!=-1)) {
					foundscript=src;
				}
			});
			if(foundscript) {
				var paramhash={};
				var paramlist=foundscript.re('\\?(.*)$');
				var params=paramlist.split('&');
				for(var i=0;i<params.length;i++) {
					var param=params[i].split('=');
					if(param.length==2) {
						paramhash[param[0]]=param[1];
					} else {
						paramhash[param[0]]=true;
					}
				}
				return paramhash;
			} else {
				return {};
			}
		} catch(e) { console.log(e); return {}; }
	}

	function find_element(list,fieldname,value) {
		for(var i in list) {
			try {
				if(list[i][fieldname]==value) {
					return list[i];
				}
			} catch(egal) {}
		}
		return {};
	}

	function getPlayerType(pic) {
		if(!pic) { pic=""; }
		if(pic.indexOf('bossfightArsonIcon.png')!=-1) {
			return "arsonist";
		} else if (pic.indexOf('bossfightRacketeerIcon')!=-1) {
			return "racketeer";
		} else {
			return "bruiser";
		}
	}
	function getPlayerId(type) {
		if(!type) { type=""; }
		if(type.indexOf('arsonist.png')!=-1) {
			return "1";
		} else if (type.indexOf('racketeer')!=-1) {
			return "2";
		} else {
			return "0";
		}
	}



	function noimg(data) {
		return data.replace(/<img/g,'<noimg');
	}

	function NoNaN(list){
		var x;
		for(x=0;x<list.length;x++){
			if(isNaN(list[x])) {
				return false;
			}
		}
		return true;
	}

	function sdiff(num,color) {
		if(num==0) {
			return '&plusmn;0';
		} else if(num>0) {
			return '+'+num;
		} else {
			return num;
		}
	}
	function cmp(v1,v2){
		return (v1>v2?-1:(v1<v2?1:0));
	}

	function repair_pic(url) {
		//var fbid=url.re('\\d+
		return url;
	}
	
	function update_game_ui_sp(object) {
		if (Util.isset(object.user_fields)) {
			user_fields_update(object.user_fields);
			user_info_update(object.user_fields, object.user_info);
			if (Util.isset(object.user_fields.zmc_event_count)) {
				$('#zmc_event_count').text(object.user_fields.zmc_event_count);
			}
		}
		if (Util.isset(object.questData)) {
			MW.QuestBar.update(object.questData);
		}
	}

	function nameize(name) {
		if((typeof name)!="string") { return name; }
		name=name.replace('_',' ');
		return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
	function isArray(obj) {
		return obj.constructor == Array;
	}

	function min(a,b){
		return a<b?a:b;
	}
	function max(a,b){
		return a>b?a:b;
	}
	function imgurl(img,w,h,a) {
		return '<img src="'+zimg+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
	}
	function commas(s) {
		var d;
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	function compare(a,b) {
		if (a==b) { return 0; }
		if (a>b) { return -1; }
		return 1;
	}

	function timestamp(sec) {
		var now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		var CurS = now.getSeconds();
		CurS = (CurS<10?'0'+CurS:CurS);
		if(sec) {
			return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
		} else {
			return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
		}
	}

	function msg(message) {
		$e('msg').html(message);
	}

	function $e(element,more) {
		return $('#'+spocklet+'_'+element+(more?' '+more:''));
	}
	function $ec(element,more) {
		return $('.'+spocklet+'_'+element+(more?' '+more:''));
	}
	function $i(element) {
		return 'id="'+spocklet+'_'+element+'"';
	}
	function $c(element,spockclasses,otherclasses) {
		var i,str=' class="'+spocklet+'_'+element+'';
		if($.isArray(spockclasses)) {
			for(i=0;i<spockclasses.length;i++) {
				str+=' '+spocklet+'_'+spockclasses[i];
			}
		}
		if($.isArray(otherclasses)) {
			for(i=0;i<otherclasses.length;i++) {
				str+=' '+otherclasses;
			}
		}
		str+='"';
		return str;
	}
	function $s(name,value) {
		storage.setItem(spocklet+'_'+name+'_'+User.trackId, value);
	}
	function $g(name) {
		return storage.getItem(spocklet+'_'+name+'_'+User.trackId);
	}
	function $b(name,text,color,mouseover) {
		if(!color) { color="black"; }
		if(!mouseover) { mouseover = text; }
		return '<a href="#" id="'+spocklet+'_'+name+'" class="sexy_button_new short '+color+'" title="'+mouseover+'"><span><span>'+text+'</span></span></a>';
	}
	// by Eike
	String.prototype.re = function(regex){
		var r=new RegExp(regex);
		var m;
		if(m=r.exec(this)) {
			return m[1];
		} else {
			return '';
		}
	}

	function log(message) {
		message = '<span class="more_in">'+timestamp(true)+'</span> '+message;
		logs.unshift(message);
		showlog();
	}
	
	function add_history(message) {
		message = '<span class="more_in">'+timestamp(true)+'</span> '+message;
		store.history.unshift(message);
		showhistory();
	}

	function showlog() {
		var displaylogs = logs.slice(0, loglines);
		var header = '[<a href="#" '+$i('logs_more')+' title="Show 10 more lines">More</a>|<a href="#" '+$i('logs_less')+' title="Show 10 less lines">Less</a>|<a href="#" '+$i('logs_clear')+' title="Clear log">Clear</a>]<br />';
		//var header = logs.length > 0 ? '<a href="#" '+$i('logs_more')+' title="Show 10 more lines">more</a> <a href="#" '+$i('logs_less')+' title="Show 10 less lines">less</a> <a href="#" '+$i('logs_clear')+' title="Clear log">clear</a><br />' : '';
		$e('log').html(header+displaylogs.join('<br />'));
		$e('loglines').html('('+loglines+')');

		$e('logs_more').click(function () {
			loglines += 10;
			showlog();
			return false;
		});
		$e('logs_less').click(function () {
			loglines -= 10;
			showlog();
			return false;
		});
		$e('logs_clear').click(function () {
			logs = [];
			showlog();
			return false;
		});
	}

	function showhistory() {
		var displaylogs = store.history.slice(0, histlines);
		var header = '[<a href="#" '+$i('hist_more')+' title="Show 10 more lines">More</a>|<a href="#" '+$i('hist_less')+' title="Show 10 less lines">Less</a>|<a href="#" '+$i('hist_clear')+' title="Clear log">Clear</a>]<br />';
		//var header = logs.length > 0 ? '<a href="#" '+$i('logs_more')+' title="Show 10 more lines">more</a> <a href="#" '+$i('logs_less')+' title="Show 10 less lines">less</a> <a href="#" '+$i('logs_clear')+' title="Clear log">clear</a><br />' : '';
		$e('hist').html(header+displaylogs.join('<br />'));
		$e('histlines').html('('+histlines+')');

		$e('hist_more').click(function () {
			histlines += 10;
			showhistory();
			return false;
		});
		$e('hist_less').click(function () {
			histlines -= 10;
			showhistory();
			return false;
		});
		$e('hist_clear').click(function () {
			stats.history = [];
			showhistory();
			return false;
		});
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		if (!errorhandler) {
			errorhandler = function() { 
				log('Pageload failed, retrying...');
				pause(5,'Retrying load in %',open_bossfight,false,false);
			}
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		if (debug) { preurl = 'http://api.mafiawars.zynga.com/mwfb/remote/html_server.php?'; }
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
	
	// Engage! Make it So! Energize!
	create_div();
	create_handler();
	get_family();
	read_secret_districts();
	//todo: if secret district is found, load sd boss. else default to family boss
	load_bosslist();
	// event
	//setTimeout(load_bossevent, 3000); // otherwise travelling problems
	add_history('Let the drama begin!');

})()
