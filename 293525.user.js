// ==UserScript==
// @name       	Spartacus debug
// @namespace   Mafiawars
// @description finding an issue
// @version     1.27
// ==/UserScript==

/*
	$Id: spartacus.js,v 1.143 2014-01-16 19:48:58 martin Exp $
	Arena Fighter Code
	Author: Eike and other members of Team Spockholm, Spockholm Mafia Tools
	License: http://www.tldrlegal.com/l/CC-NC, read the full text here: http://creativecommons.org/licenses/by-nc/3.0/legalcode
	Note that this code may not be used in commercial scripts or applications.
*/

javascript:(function (){
	"use strict";
	var version='Spartacus v1.27',
	rev =  /,v \d+\.(\d+)\s201/.exec("$Id: spartacus.js,v 1.143 2014-01-16 19:48:58 martin Exp $")[1],
	spocklet='spartacus',
	instance=parseInt(Math.random()*1000,10),
	debug = false,
	debuglogs=[],
	logs=[],
	loglines = 12,
	looted = {},
	run=false,
	closed=false,
	spinner = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/mw_loader_final_v2.gif" width="32" height="32" />',
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
	starimg = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_filled.png" width="12" height="12" align="top" />',
	nostarimg = '<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_grey.png" width="12" height="12" align="top" />',
	socke, // websocket
	socke_lobby,
	currdata, // copy of data
	cmdqueue=[],
	meid, //me
	meteam, // my team
	tscore = {"1":0,"2":0},
	poweratt = undefined,
	poweruplist = {},
	playerinfo={},
	playerids={},
	starting_in,
	starting_in_counter,
	attmatrix={},
	stam_on_start=-1,
	healed_in,
	healed_in_counter,
	restart_in,
	restart_in_counter,
	itemdatabase={},
	friendlist={},
	worstitems,
	stats = { arenas:0,crests:0, xp:0, stamina:0, respect_start:0, respect:0, ranks:[0,0,0,0,0,0], stars:0},
	powerup_status = {},
	last_update = 0,
	update_debug=[],
	conn_checker,
    healtimer=[0,0,0,0,0,0],
	replenish=0,
	da_game = [],
	protect = {},
	powerup_command = { count:{},active:-1,target:undefined },
	show_config = false,
	over_table = false, //mouse hover over table -> no resort
	debug_stats={ attacks_done:0,attacks_successful:0 },
	reconnect_retry = 0,
	arenalist=[],
	lobby_arenas=[],
	is_challenge=false,
	current_arena_was,
	storage,
	stop_at_loot = false,
	last_crests = false;
	
	var zserver = /\/\/(.*)\.mafiawars/.exec(document.location.href)[1];

	var powerups = {
		1:{name:"Stamina Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_staminarefill_01.png"},
		2:{name:"Arena Health Refill",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_arenahealthrefill_01.png"},
		3:{name:"Meta Flair",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_quartflair_01.png"},
		4:{name:"Pain Killer",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_painkiller_01.png"},
		5:{name:"Kamikaze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_suckerpunch_01.png"},
		6:{name:"Drained",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_drained_02.png"},
		7:{name:"Reflector",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_reflector_01.png"},
		//8:{name:"Freeze",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_freeze_01.png"}
		//9:{name:"Dual Strike",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_dualstrike_01.png"}
		10:{name:"Tri-Rage",pic:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/big_item_tri-rage_01.png"}
	};

	var difficulty = [
		'Easy',
		'Normal',
		'Hard'
	];

	var r_difficulty = {
		'Easy':0,
		'Normal':1,
		'Hard':2
	};

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
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px; margin:1px;}'+
		'#'+spocklet+'_loading { display:none; }'+
		'#'+spocklet+'_table td { padding:3px; }'+
		'#'+spocklet+'_table th { padding:3px; }'+
		'#'+spocklet+'_table { width:100%; border: 1px solid black; }'+
		'#'+spocklet+'_table tr:nth-child(odd) { background: #181818; }'+
		'#'+spocklet+'_attmatrix td { padding:3px; border: 1px solid grey; width:20px; text-align:center; }'+
		'#'+spocklet+'_attmatrix th { padding:4px; border: 1px solid white; width:20px; text-align:center; }'+
		'#'+spocklet+'_attmatrix { border: 1px solid white; }'+
		'.'+spocklet+'_teamblue { background: #0E374B !important;}'+
		'.'+spocklet+'_teamred { background: #331A1E !important;}'+
		'.'+spocklet+'_usepowerup { cursor:pointer; }'+
		'.'+spocklet+'_notusepowerup { cursor:default; }'+
		'.'+spocklet+'_puclick { cursor:pointer; }'+
		'.'+spocklet+'_punoclick { cursor:default; }'+
		'.'+spocklet+'_pufull { opacity:1; }'+
		'.'+spocklet+'_puhalf { opacity:0.6; }'+
		'.'+spocklet+'_puoff { opacity:0.2; }'+
		'.'+spocklet+'_puactive { border:1px solid white; }'+
		'.'+spocklet+'_punormal { border:1px solid #101010; }'+
		'.'+spocklet+'_conf { display:none; }'+
		'.'+spocklet+'_lobbyconf { display:none; }'+
		'#'+spocklet+'_delay { display:none; }'+
		'#'+spocklet+'_debugsend,#'+spocklet+'_debugsend_a { display:none; }'+
		'.'+spocklet+'_offsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-10px -5px;padding-left: 30px;}'+
		'.'+spocklet+'_defsh {background: url("https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/Effect_opponentOverlay.png") 0 50% no-repeat;background-position:-230px -110px;padding-left: 30px;}'+
		'.'+spocklet+'_lootlog { display:none; }'+
		'.'+spocklet+'_arenalog { display:none; }'+
		'.'+spocklet+'_privateconf { display:none; }'+
		'.'+spocklet+'_chalconf { display:none; }'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php#" target="_blank"><img src="http://cdn.spocklet.com/banner-spockholm-mafia-tools.png" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';
	
	var optable = 
		'<tr><th style="width: 55px; height:20px;">Rank<img height="16" width="16" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/item_treasure_chest_key.gif" '+$i('lockrank')+' style="display:none;" /></th>'+
		'<th>Opponent</th><th>Info</th><th>Respect</th><th style="width:65px;">Health</th><th>Score</th><th>Stamina</th><th style="width:80px;">Shields</th><th>Intervene</th></tr>'+
		'<tr '+$i('op0')+'><td style="height:38px;"><span '+$i('rank0')+'>#1</span></td><td><span '+$i('name0')+'>Opponent 0</span></td><td><span '+$i('diff0')+' class="difficulty"></span></td><td><span '+$i('respect0')+' class="respect">0</span></td><td><span class="health" '+$i('health0')+'>0</span></td><td><span '+$i('score0')+'>0</span></td><td><span '+$i('stam0')+' class="stamina">?</span></td><td><span '+$i('pu0')+'></span></td><td><span '+$i('usepu0')+'></span></td></tr>'+
		'<tr '+$i('op1')+'><td style="height:38px;"><span '+$i('rank1')+'>#2</span></td><td><span '+$i('name1')+'>Opponent 1</span></td><td><span '+$i('diff1')+' class="difficulty"></span></td><td><span '+$i('respect1')+' class="respect">0</span></td><td><span class="health" '+$i('health1')+'>0</span></td><td><span '+$i('score1')+'>0</span></td><td><span '+$i('stam1')+' class="stamina">?</span><td><span '+$i('pu1')+'></span></td><td><span '+$i('usepu1')+'></span></td></tr>'+
		'<tr '+$i('op2')+'><td style="height:38px;"><span '+$i('rank2')+'>#3</span></td><td><span '+$i('name2')+'>Opponent 2</span></td><td><span '+$i('diff2')+' class="difficulty"></span></td><td><span '+$i('respect2')+' class="respect">0</span></td><td><span class="health" '+$i('health2')+'>0</span></td><td><span '+$i('score2')+'>0</span></td><td><span '+$i('stam2')+' class="stamina">?</span><td><span '+$i('pu2')+'></span></td><td><span '+$i('usepu2')+'></span></td></tr>'+
		'<tr '+$i('op3')+'><td style="height:38px;"><span '+$i('rank3')+'>#4</span></td><td><span '+$i('name3')+'>Opponent 3</span></td><td><span '+$i('diff3')+' class="difficulty"></span></td><td><span '+$i('respect3')+' class="respect">0</span></td><td><span class="health" '+$i('health3')+'>0</span></td><td><span '+$i('score3')+'>0</span></td><td><span '+$i('stam3')+' class="stamina">?</span><td><span '+$i('pu3')+'></span></td><td><span '+$i('usepu3')+'></span></td></tr>'+
		'<tr '+$i('op4')+'><td style="height:38px;"><span '+$i('rank4')+'>#5</span></td><td><span '+$i('name4')+'>Opponent 4</span></td><td><span '+$i('diff4')+' class="difficulty"></span></td><td><span '+$i('respect4')+' class="respect">0</span></td><td><span class="health" '+$i('health4')+'>0</span></td><td><span '+$i('score4')+'>0</span></td><td><span '+$i('stam4')+' class="stamina">?</span><td><span '+$i('pu4')+'></span></td><td><span '+$i('usepu4')+'></span></td></tr>'+
		'<tr '+$i('op5')+'><td style="height:38px;"><span '+$i('rank5')+'>#6</span></td><td><span '+$i('name5')+'>Opponent 5</span></td><td><span '+$i('diff5')+' class="difficulty"></span></td><td><span '+$i('respect5')+' class="respect">0</span></td><td><span class="health" '+$i('health5')+'>0</span></td><td><span '+$i('score5')+'>0</span></td><td><span '+$i('stam5')+' class="stamina">?</span><td><span '+$i('pu5')+'></span></td><td><span '+$i('usepu5')+'></span></td></tr>';
	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
//			'&nbsp;<a href="http://www.spockholm.com/mafia/help.php#" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help"><span><span>Help</span></span></a>'+
//			'&nbsp;<a href="#" id="'+spocklet+'_stop" class="sexy_button_new short orange" title="Stop"><span><span>Stop</span></span></a>'+
//			'&nbsp;<a href="#" id="'+spocklet+'_rewards" class="sexy_button_new short green" title="Rewards"><span><span>Rewards</span></span></a>'+
			'<a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Config"><span><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Config</span></span></a> '+
			'<a href="http://www.spockholm.com/mafia/donate.php#'+spocklet+'" '+$i('donate')+' class="sexy_button_new short black" target="_blank" title="Like what we do? Donate to Team Spockholm"><span><span><span class="cash"></span>Donate</span></span></a>'+

			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good" title="Build: '+rev+'">'+version+'</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
			'&nbsp;<a href="#" id="'+spocklet+'_start" class="sexy_button_new short green" title="Start Spartacus, god of the arena"><span><span>Start</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_lobby" class="sexy_button_new short black" title="Join Lobby, to show 1 on 1 battles or private rooms and engage in them"><span><span>Lobby</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close Spartacus, no more killing"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr '+$c('lobbyconf')+'><td valign=top>Lobby-Options:<br />Your ID: '+User.id.substr(2)+'</td><td colspan="2">'+
		'<label title="Auto accept incoming challenges"><input type="checkbox" '+$i('lobbyaccept')+'>Auto accept challenges</label> &nbsp; '+' <label title="Reconnect if Lobby connection is lost"><input type="checkbox" '+$i('lobbyreconnect')+'>Reconnect</label><br /><br />'+
		$b('lobbychalopen','Send Challenge','black','Send 1-on-1 challenge')+' '+$b('lobbyprivateopen','Create Private Room','black','Create private room')+'<br /><br />'+
		'<div '+$c('chalconf')+'><u>Create challenge:</u><br />'+
		'	Enter Opponent ID (mwid without p|): <input type="text" '+$i('chalopponent')+' style="width:150px;" /><br />'+$b('lobbychal','Start Challenge','orange','Send 1-on-1 challenge')+
		'	<label><input type="checkbox" '+$i('chal_restart')+' /> Re-challenge after the ending</label>'+
		'</div>'+
		'<div '+$c('privateconf')+'><u>Create private room:</u><br />'+
		'	Enter Room name (no spaces): <input type="text" '+$i('privateroomname')+' style="width:250px;" value="GodoftheArena" /><br />'+
		'	Minimum number of players: <select '+$i('privateminplayer')+'><option>3</option><option>4</option><option>5</option><option>6</option></select><br />'+
		'	Enter Opponents to invite, mwids without p|, seperated by ",".<br />Or, provide the permalink to a facebook post that contains the IDs:<br /><input type="text" '+$i('privateplayerlist')+'  style="width:400px;"/><br />'+ 
		$b('lobbyprivate','Create Private Room','orange','Launch private room')+
		'<label><input type="checkbox" '+$i('private_restart')+' /> Re-challenge after the ending</label> <input type="checkbox" '+$i('private_autostart')+' /> autostart re-challenge</label>'+
		'</div>'+
		'</td></tr>'+
		'<tr '+$c('lobbyconf')+'><td colspan="3"><hr /></td></tr>'+
		'<tr><td colspan="3"><span id="'+spocklet+'_loading">'+spinner+' loading data...</span></td></tr>'+
		'<tr '+$c('conf')+'><td colspan="3"><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Configuration</span></td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Arena:</td><td colspan="2">'+
		'<select '+$i('arenatype')+' title="Select what Arena to join">'+(User.max_stamina<3000?'<option value="sw">20 Stamina</option>':'')+'<option value="lw">100 Stamina</option>'+(User.max_stamina>=3000?'<option value="hw">500 Stamina</option>':'')+'<option value="rw">1 Stamina (Special)</option></select>'+
		'&nbsp; <label><input type="checkbox" id="'+spocklet+'_mobfury" title="Do 100/500 Mob-Fury Arenas instead of regular." />Mob-Fury Arenas <span class="more_in">(only 100 or 500 stamina)</span></label>'+
		'	<br /><label><input type="checkbox" id="'+spocklet+'_check_stam" title="Disabled means NO check is done before trying to join" />Have</label> '+
		'	at least <span class="stamina"><input type="text" '+$i('min_stam_for_restart')+' value="20" title="Only join arenas when stamina is above this" style="width:40px;" /></span> '+
		'	and ratio below <span class="experience"><input type="text" '+$i('min_ratio_for_restart')+' value="20" title="Only join arenas when stamina to xp ratio needed for next level is below this (0 to ignore)" /></span>  before entering'+
		'</td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Restart:</td><td colspan="2">'+
		'<label title="Rejoin arenas when done">Rejoin arenas <input type="checkbox" id="'+spocklet+'_restart" /></label><br /> '+
		'<label>Retry when out of stamina <input type="checkbox" id="'+spocklet+'_restart_stam" title="Restart after x minutes" /><span '+$i('show_restart_stam')+'> after <input type="text" '+$i('restart_minutes')+' value="5" title="Minutes before retrying to join" /> minutes.</label></span>'+
		'</td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Type of attack:</td><td colspan="2">'+
		'<label title="Use Powerattack" >Powerattack: <input type="checkbox" id="'+spocklet+'_powerattack" checked /></label> &nbsp; '+
		'Number of attacks: <input type="text" '+$i('numatt')+' value="3" title="Number of attacks to batch, maximum=3"/>'+
		'</td></tr>'+
		'<tr '+$c('conf')+'><td>Target to attack:</td><td colspan="2"><select '+$i('seltarget')+' title="Decide target priority">'+
		'	<option value="lowhealth">Lowest health alive</option>'+
		'	<option value="highhealth">Highest health</option>'+
		'	<option value="mostpoints">Most points alive</option>'+
		'	<option value="leastpoints">Least points alive</option>'+
		'	<option value="mostrespect">Most respect alive</option>'+
		'	<option value="leastrespect">Least respect alive</option>'+
		'	<option value="allalive">Attack all alive</option>'+
		'	<option value="leastdiff" selected>Least difficulty</option>'+
		'</select></td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Power-Ups:</td><td colspan="2">'+
		'<label>Don\'t attack defense shielded players: <input type="checkbox" id="'+spocklet+'_skipshield" checked title="Skip def shielded players" /></label><br />'+
		'<label>Don\'t attack attack shielded players: <input type="checkbox" id="'+spocklet+'_skipshield_a" title="Skip att shielded players" /></label><br />'+
		'<label title="Try to use Kamikazi boost before arena ends">Use kamikazi at the last <input type="text" value="20" '+$i('boostkami_s')+'>s of the battle: <input type="checkbox" id="'+spocklet+'_boostkami" /></label></td></tr>'+
		'<tr '+$c('conf')+'><td>Stop attacking:</td><td colspan="2"><select '+$i('stopon')+' title="In-arena play style">'+
		'<option value="never" selected>never (attack until stamina is gone)</option>'+
		'<option value="stop">now (do not attack)</option>'+
		'<option value="teamleading">when your team is leading by x points (only MobFury)</option>'+
		'<option value="leading">when having the lead by a specific number of points</option>'+
		'<option value="leading3">when having the 3rd place by a specific number of points</option>'+
		'<option value="leading5">when having the 5th place by a specific number of points</option>'+
		'<option value="staminaused">when specific amount of stamina used</option>'+
		'<option value="staminaleft">when specific amount of stamina left</option>'+
		'<option value="score">when score reached. Not 100% accurate!</option>'+
		'<option value="stars">when specific stars archieved (only MobFury)</option>'+
		'</select><span '+$i('show_stopon_value')+'> value: <input type="text" '+$i('stoponvalue')+' value="0" style="width: 40px;" /></span></td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Popups:</td><td colspan="2">'+
		'<label title="Show Levelup popup">Show Levelup-Popup: <input type="checkbox" id="'+spocklet+'_leveluppopup" checked /></label>'+
		'<label title="Auto-collect the promotion bonus">Collect Promotion-Bonus: <input type="checkbox" id="'+spocklet+'_levelupbonus" checked /></label>'+
		'</td></tr>'+
		'<tr '+$c('conf')+'><td valign="top">Display:</td><td colspan="2">'+
		'<label title="Sort player list by rank">Do not sort player list: <input type="checkbox" id="'+spocklet+'_sortplayer" /></label>'+
		'</td></tr>'+
		'<tr '+$c('conf')+'><td colspan="1">Extra:</td><td colspan="2"><a href="#" '+$i('retrievestamina')+' >Retrieve lost stamina</a></td></tr>'+
		'<tr '+$c('conf')+'><td colspan="3"><hr /></td></tr>'+
		//'<tr><td>Stage:</td><td colspan="2"><span '+$i('stage')+'>Not started</span></td></tr>'+
		'<tr><td width="150">Stage:</td><td colspan=2><table width="100%"><tr><td><span '+$i('stage')+'>Not started</span></td><td>Connection: <span '+$i('connstatus')+'>-</span> <span '+$i('connstatus2')+'></span> <span '+$i('delay')+'></span></td><td>Crests: <span class=arena_mastery_crests ' +$i('crests')+'>Loading...</span></td></tr></table></td></tr>'+
		'<tr><td valign="top">Time left:</td><td colspan="2"><span '+$i('timeleftbar')+'></span></td></tr>'+
		//'<tr><td valign="top">Time left:</td><td colspan="2"><span '+$i('timeleft')+'>0</span>s <div style="width:500px;" '+$i('timeleftbar')+'></div></td></tr>'+
		//'<tr><td>Connection:</td><td colspan="2"><span '+$i('connstatus')+'>-</span> <span '+$i('connstatus2')+'></span> <span '+$i('delay')+'></span></td></tr>'+
		'<tr><td valign="top">Power-Ups<br /><span class="more_in">(Click to use)</span>:</td><td colspan="2" valign="top"><span '+$i('powerups')+'></span></td></tr>'+
		'<tr><td valign=top>Strength:</td><td colspan="2"><span id="'+spocklet+'_strength_stats"></span></td></tr>'+
		'<tr><td>Stamina:</td><td colspan="2"><span class="stamina" '+$i('me_st')+'>0</span>, next +<span '+$i('replenish')+'>?</span> in <span '+$i('me_sr')+'>0</span>s, used: <span class="stamina" '+$i('me_stused')+'>0</span></td></tr>'+
		'<tr><td>Health:</td><td colspan="2"><span class="health" '+$i('me_health')+'>100</span>% &nbsp; <span '+$i('healin')+'></span></td></tr>'+
		'<tr><td>Teamscores:</td><td colspan="2"><span '+$i('teamscore')+'></span></td></tr>'+
		'<tr><td valign="top"><a href="#" '+$i('toggleactions')+' title="Click to show/hide attack matrix">Actions:</a></td><td colspan="2"><span style="display:none;" '+$i('attmatrix_outer')+'></span></td></tr>'+
		'<tr><td colspan="3">'+
			'<table '+$i('table')+' cellspacing=0>'+
			optable+
			'</table>'+
		'</td></tr>'+
		'<tr><td valign="top"><a href="#" '+$i('toggleloot')+' title="Click to show/hide loot log">Loot/Stats:</a></td><td></td></tr>'+
		'<tr '+$c('lootlog')+'><td valign=top>Stats:</td><td colspan="2"><span id="'+spocklet+'_allstats"></span></td></tr>'+
		'<tr '+$c('lootlog')+'><td valign=top>Loot:</td><td colspan="2" '+$i('lootlog')+'></td></tr>'+
		'<tr><td valign="top"><a href="#" '+$i('togglearenas')+' title="Click to show/hide arena log">Arenas:</a></td><td></td></tr>'+
		'<tr '+$c('arenalog')+'><td valign=top></td><td colspan="2" '+$i('arenalog')+'></td></tr>'+
		'<tr '+$c('lootlog0')+'><td valign=top><a href="#" '+$i('loadarch')+'>Achievements:</a></td><td colspan="2" '+$i('achilog')+'></td></tr>'+
		'<tr '+$c('lootlog0')+'><td valign=top><a href="#" '+$i('buypowerups')+'>Craft powerups!</a></td><td></td></tr>'+
		'<tr><td colspan="3"><span id="'+spocklet+'_log"></span></td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr><td colspan="3"><span id="'+spocklet+'_debug" style="display:none;">Debug-Output</span><br />'+
		'<a href="#" '+$i('debugsend')+'>send debug info about your connection to Spockholm</a><br />'+
		'<a href="#" '+$i('debugsend_a')+'>send anonymous debug info about your connection to Spockholm</a><br />'+
		'<textarea '+$i('debug_game')+' style="display:none;"></textarea>'+
		'</td></tr>'+
		'</table>'+
	'</div>';

	function create_div() {
		//setup the spockdiv
		if ($('#'+spocklet+'_main').length == 0) {
			$('#inner_page').before(spocklet_html);
			var pos = $('#'+spocklet+'_main').position();
			$('#'+spocklet+'_main').prepend('<a href="#" id="'+spocklet+'_debug_toggle"><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/clan/perks/Grenade3.png" width="2" height="2" style="position: absolute; left:'+parseInt(pos.left+7)+'px; top: '+parseInt(pos.top+7)+'px;" alt="Show/Hide stats" title="Show/Hide stats" /></a>');
			set_progress_bar(0,0,'');
		}
		else {
			$('#'+spocklet+'_main').html(spocklet_html);
		}
	}

	function create_handler(){
		$e('close').click(function(){
			run = false;
			closed = true;
			$e('main').remove();
			clearInterval(restart_in_counter);
			try {
				socke.close();
			} catch(noopenedyet) {}
			try {
				socke_lobby.close();
			} catch(noopenedyet) {}
			
			return false;
		});
		$e('start').click(function(){
			clearInterval(restart_in_counter);
			current_arena_was='normal';
			if(!run) {
				run = true;
				check_stamina(join_arena);
			} else {
				log('Spartacus already running, be careful where you click!');
				run = false;
			}
			return false;
		});
		$e('rewards').click(function(){
			get_rewards(function(){});
			return false;
		});
		$e('debug_toggle').click(function(){
			debug=!debug;
			if(debug) {
				$e('debug').show();
				$e('delay').show();
			} else {
				$e('debug').hide();
				$e('delay').hide();
			}
			return false;
		});
		$('.'+spocklet+'_att').click(function(){
			attack($(this).attr('data-id'),1);
			return false;
		});
		$e('toggleactions').click(function(){
			$e('attmatrix_outer').toggle(10);
			return false;
		});
		$e('toggleloot').click(function(){
			$('.'+spocklet+'_lootlog').toggle();
			//write_loot();
			return false;
		});
		$e('togglearenas').click(function(){
			$('.'+spocklet+'_arenalog').toggle();
			//write_loot();
			return false;
		});
		/* toggles for config */
		load_config();

		$e('config_toggle').click(function(){
			if(!show_config) {
				$('.'+spocklet+'_conf').show();
				$(this).addClass('green').removeClass('black');
			}
			else {
				$('.'+spocklet+'_conf').hide();
				$(this).addClass('black').removeClass('green');
			}
			show_config=!show_config;
			return false;
		});
		$e('restart_stam').change(function(){
			if(this.checked) {
				$e('show_restart_stam').show();
			} else {
				$e('show_restart_stam').hide();
			}
		}).trigger('change');
		$e('stopon').change(function(){
			if(this.selectedIndex>1) {
				$e('show_stopon_value').show();
			} else {
				$e('show_stopon_value').hide();
			}
		}).trigger('change');
		$('.'+spocklet+'_conf input,select').change(function(){
			save_config();
		});


		$e('debugsend').click(function(){
			debugsend(false);
			$(this).html('Thanks!');
			return false;
		});


		$e('debugsend_a').click(function(){
			debugsend(true);
			$(this).html('Thanks!');
			return false;
		});
		$e('table').hover(function(){
			over_table = true;
			$e('table').css('border-color','#444');
			$e('lockrank').show();
		},function(){
			over_table = false;
			$e('table').css('border-color','black');
			$e('lockrank').hide();
			
		});
		$e('loadarch').click(function(){
			load_achievements();
			return false;
		});
		$e('buypowerups').click(function(){
			$.getScript('https://spocklet.com/bookmarklet/pumerchant.js');
			return false;
		});
		$e('lobby').click(function(){
			load_lobby();
			return false;
		});
		$e('lobbychal').click(function(){
			current_arena_was='mychallenge';
			lobby_send_challenge();
			$ec('chalconf').hide();
			$e('lobbychalopen').removeClass('green').addClass('black');			
			return false;
		});

		$e('lobbyprivate').click(function(){
			current_arena_was='myprivate';
			lobby_create_private_room();
			$ec('privateconf').hide();
			$e('lobbyprivateopen').removeClass('green').addClass('black');
			return false;
		});
		$e('lobbyprivateopen').click(function(){
			$ec('privateconf').show();
			$ec('chalconf').hide();
			$(this).removeClass('black').addClass('green');
			$e('lobbychalopen').removeClass('green').addClass('black');
			return false;
		});
		$e('lobbychalopen').click(function(){
			$ec('chalconf').show();
			$ec('privateconf').hide();
			$(this).removeClass('black').addClass('green');
			$e('lobbyprivateopen').removeClass('green').addClass('black');
			return false;
		});
		$e('retrievestamina').click(function(){
			request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(msg){
				log('Stamina retrieved, probably.');
				$('#nav_link_home a:last').trigger('click'); // reload stamina et all
			});
			return false;
		});	
	}
	create_div();
	create_handler();
	loadStats(); // mafia att, def and inventory
	update_crests();

	/****************** connection functions ****************/
	function load_lobby(){
		request('xw_controller=Lobby&xw_action=play&xw_client_id=8',function(msg){
			window.eikel=msg;
			var wslobby = msg.re('MW.lobbyViewObj.init\\(\\"([^\\"]*)\\"\\)');
			// var secret = msg.re('new MW.LobbyModel\\(\\d+, (\\d+)\\)');
            // var arenalist = msg.re('getArenaList\\(\\\'([^\\\']*)\\\'\\)').replace(/"/g,'\\"');

			connect_lobby(wslobby);
			
		},function(){
			log('Error on trying to load');
		});
	}
	
	function connect_lobby(sockenurl) {
		socke_lobby=new WebSocket(sockenurl);
		socke_lobby.onopen=function(){
			log('Connected to Lobby. Release the dogs of war!');
			$e('lobby').addClass('disabled green').removeClass('black');; // todo: disconnect button?
			$ec('lobbyconf').show();
			//socke.send('{"Id":'+id+',"Cmd":"Authenticate","Args":["token","'+secret+'"]}'); // no more authentification
			setInterval(function(){
				socke_lobby.send('{"Id":'+User.id.substr(2)+',"Cmd":"listArena","Args":["'+arenalist+'"],"Extra":[]}');
			},5000);
		};
		socke_lobby.onmessage=function(msg){
			//log('Received :'+msg.data);
			
			var json=JSON.parse(msg.data);
			if(json.Cmd=="listArena") {
				//parseLobbyArenas(json.Args)
			} else if (json.Cmd=="sendMsg") {
				if(json.Args[0]!=User.id.substr(2)) {
					challenge_accepted(json.Args,json.Extra);
				} // otherwise just the echo
			}
			//console.log(json);
		};
		socke_lobby.onclose=function(){
			log('Disconnected from Lobby. If this happens every other second, the Lobby may be down.');
			$e('lobby').removeClass('disabled green').addClass('black');
			$ec('lobbyconf').hide();
			if($e('lobbyreconnect').is(':checked')) {
				if(!closed) {
					load_lobby();
				}
			}
		};
	}


	function challenge_accepted(senders,args) {
		var arglist=args[0].split(',');
	//{"Id":95497006,"Cmd":"sendMsg","Args":["146845412","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
	// "Extra":["notif,4,lw,2519596194407512288,1366780089,arena-2.mafiawars.zynga.com,Spockwars,39102145d6114872eca7bfc3a12aaaf9,3","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]}
		
//http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/remote/html_server.php?xw_controller=Lobby&xw_action=acceptChallenge&xw_city=9&tmp=52b92cceff43d371abbf4fcc00b60bf2&cb=a465e5b0ab0e11e2a8a08bbed7f28309&xw_person=95497006&mwcom=1&challenger=146845412&arenaType=lw&action=3&arenaId=7450586115004129438&arenaExpiry=1366609051&arenaIp=arena-2.mafiawars.zynga.com&sendKey=2f4eb1e03a740ae6e71a4af7382fcc39
//http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=Arena&xw_action=getNotificationInfo&xw_city=&tmp=35a77c7be63306bdc61c6ebe47976561&cb=cbb93000a8f011e28c8b89e05554e317&xw_person=&xw_client_id=8	
//		request('xw_controller=Arena&xw_action=getNotificationInfo',function(msg){
//			var json=JSON.parse(msg);
//			console.log(json);
//			log('Challenge from '+json.data.challengerName);
		
//		request('xw_controller=Arena&xw_action=showAllChallenges&xw_city=1',function(result){
//			console.log(result);
//		});
		
		
		if($e('lobbyaccept').is(':checked')) {
			if(arglist[1]=="3") {
				log('Accepting 1on1 Arena challenge. To battle!');
				current_arena_was='acceptchallenge';
				request('xw_controller=Lobby&xw_action=acceptChallenge&xw_city=9&tmp=&cb=&xw_person=&mwcom=1&challenger='+senders[0]+'&arenaType='+arglist[2]+'&action='+arglist[1]+'&arenaId='+arglist[3]+'&arenaExpiry='+arglist[4]+'&arenaIp='+arglist[5]+'&sendKey='+arglist[7],function(msg){
					var json=JSON.parse(msg);
					log(json.data.message);
					if(json.data.success==1) {
						is_challenge=true;
						join_arena();
					}
				})
			} else {
				log('Entering private arena '+arglist[6]);
				current_arena_was='acceptprivate';
				request('xw_controller=Lobby&xw_action=acceptPrivateInvite&xw_city=9&tmp=&cb=&xw_person=&challenger='+senders[0]+'&arenaType='+arglist[2]+'&action='+arglist[1]+'&arenaId='+arglist[3]+'&arenaExpiry='+arglist[4]+'&arenaIp='+arglist[5]+'&name='+arglist[6]+'&sendKey='+arglist[7]+'&minPlayers='+arglist[8]+'&xw_client_id=8',function(msg){
					var json=JSON.parse(msg);
					log(json.data.message);
					if(json.data.success==1) {
						is_challenge=true;
						join_arena();
					}
				})
			}
		} else {
			log('Challenge rejected, ran away away.');
			/*
			request('xw_controller=Lobby&xw_action=declineChallenge&xw_city=9&tmp=&cb=&xw_person=&mwcom=1&challenger='+senders[0]+'&arenaType='+arglist[2]+'&action='+arglist[1]+'&arenaId='+arglist[3]+'&arenaExpiry='+arglist[4]+'&arenaIp='+arglist[5]+'&sendKey='+arglist[6],function(msg){
				var json=JSON.parse(msg);
				console.log(json);
			});
			does not work, error 500
			*/
		}
	}
	//[08:11] Received:{"Id":95497006,"Cmd":"sendMsg","Args":["146845412"],"Extra":["notif,3,lw,5769920165996092446,1366611108,arena-2.mafiawars.zynga.com,50ef16199b1054f4bb3865d426807164"]}
	//http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/remote/html_server.php?xw_controller=Lobby&xw_action=challenge&xw_city=7&tmp=e89ce57b96dac5c9f9bc9524107da305&cb=ec798f30ab1411e28179819706b158e0&xw_person=146845412&arenaType=lw&action=3&opponents=71067503
	function lobby_send_challenge(){
		var pid=$e('chalopponent').val();
		var type=$e('arenatype').val();
		if(pid) {
			if(pid.indexOf('p|')!=-1) { pid=pid.substr(2); }
			request('xw_controller=Lobby&xw_action=challenge&arenaType='+type+'&action=3&opponents='+pid,function(msg){
				var json=JSON.parse(msg);
				log(json.data.message);
				if(json.data.success==1) {
					join_arena();
				}
			});
		}
	}
	
	/*
		{"Id":146845412,"Cmd":"sendMsg","Args":["1838839,71067503,68031107,2881364,95497006"],"Extra":["notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,b271c1320880e27df2cf3c6d4d2c38b9,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,8b9bc9c787c7ec62e218b5b3e453d7ca,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,31f78cf8702abb36023e3e26b9243d29,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,0f2d0b02be5587fa6976a80ad34da960,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,cff747c1f245e4e4463b47ca0656b618,3"]}
        	MW.lobbyViewObj.getSendMsg(     '1838839,71067503,68031107,2881364,95497006',          'notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,b271c1320880e27df2cf3c6d4d2c38b9,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,8b9bc9c787c7ec62e218b5b3e453d7ca,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,31f78cf8702abb36023e3e26b9243d29,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,0f2d0b02be5587fa6976a80ad34da960,3;notif,4,lw,4966595890122357179,1366782772,arena-2.mafiawars.zynga.com,SpockwarsTest,cff747c1f245e4e4463b47ca0656b618,3');

	create form: http://facebook-ca2.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=arena&xw_action=privateRoom&xw_city=1&tmp=5e6d1de797797736a79f60af630eb082&cb=d6707d70aca211e2a1f6419eb46969db&xw_person=146845412&xw_client_id=8
	create action: 
	*/
	
	function lobby_create_private_room(){
		var roomname=$e('privateroomname').val();
		var minplayer=$e('privateminplayer').val();
		var pid=$e('privateplayerlist').val();
		var type=$e('arenatype').val();
		var buyin=(type=="sw"?10:(type=="lw"?100:500));

		if(pid) {
			if(pid.indexOf('permalink')==-1) {
				pid=pid.replace(/p|/g,'');
				request('xw_controller=Lobby&xw_action=create_private_room&xw_city=&tmp=&cb=&xw_person=&arenaBuyIn='+buyin+'&opp='+pid+'&minPlayers='+minplayer+'&name='+escape(roomname)+'&xw_client_id=8',function(msg){
					var json=JSON.parse(msg);
					log(json.data.message);
					if(json.data.success==1) {
						join_arena();
					}
				});
			} else {
				// get'em from facebook
				var postid=pid.re('permalink\\/(\\d+)');
				FB.api('/'+postid+'/comments?limit=100',function(data){
					console.log(data);
					if(data.data) {
						var list=[];
						for(var i=0;i<data.data.length;i++){
							var num=data.data[i].message.re('(\\d\\d\\d+)');
							if(num) {
								list.push(num);
							}
						}
						if(list.length<minplayer) {
							log('Not enough players, stopping');
						} else {
							console.log(list);
							pid=list.join(',');
							log('Found '+list.length+' comments: '+pid);
							request('xw_controller=Lobby&xw_action=create_private_room&xw_city=&tmp=&cb=&xw_person=&arenaBuyIn='+buyin+'&opp='+pid+'&minPlayers='+minplayer+'&name='+escape(roomname)+'&xw_client_id=8',function(msg){
								var json=JSON.parse(msg);
								log(json.data.message);
								if(json.data.success==1) {
									join_arena();
								}
							});
						}
							
					} else {
						log('Failed to read from FB link!');
					}
				
				
				});
			}
		
		
		}
	}
	
	
	function join_arena() {
		//check if Spartacus is still running
		if ($('#'+spocklet+'_main').length == 0) {
			run = false;
			return;
		}

		/* initialize vars */
		cmdqueue=[];
		meid=null;
		meteam=null;
		poweratt = undefined;
		poweruplist = {};
		playerinfo={};
		playerids={};
		attmatrix={};
		stam_on_start = -1;
		powerup_status = {};
		powerup_command = { count:{},active:-1,target:undefined };
		da_game = [];
		protect = {};
		$('span[id*="'+spocklet+'_rank"]').html('');
		$('span[id*="'+spocklet+'_pu"]').html('');
		$('span[id*="'+spocklet+'_name"]').html('');
		$('span[id*="'+spocklet+'_respect"]').html('');
		$('span[id*="'+spocklet+'_diff"]').html('');
		$('span[id*="'+spocklet+'_health"]').html('');
		$('span[id*="'+spocklet+'_score"]').html('');
		$('span[id*="'+spocklet+'_usepu"]').html('');
		$e('attmatrix').remove();
		/* join */
		log('Joining arena...');
		var type = $e('arenatype').val();
		replenish=(type=="sw"?2:(type=="lw"?10:50));
		$e('replenish').text(replenish);
		var gametype = '';
		if($e('mobfury').is(':checked')) { gametype = '&arenaGameType=2'; }
		request('xw_controller=Lobby&xw_action=join_arena&arenaType='+type+gametype+'&xw_client_id=8',function(msg){
			//console.log(msg);
			var json = JSON.parse(msg);
			if(json.data.success == 1) {
				run = true;
				if(json.data.message=="User is in another arena") {
					log('Successfully re-joined Arena.');
				} else {
					log('Successfully joined Arena.');
				}
				$('#user_stamina').text('0');
				load_arena();
			}
			else {
				if (json.data.message.indexOf('Refresh to claim your rewards from the previous Arena')!=-1) {
					log('Claiming your rewards from the previous Arena');
					get_rewards();
				}
				else if(json.data.message.indexOf('have enough stamina to join this arena')!=-1) {
					log('Not enough Stamina, stopping.');
					$e('table').html(optable);
					if($e('restart_stam').is(':checked')) {
						var min=parseInt($e('restart_minutes').val());
						restart_in=unix_timestamp()+(min*60);
						log('Restarting in '+min+' minutes');
						run = false;
						restart_in_counter = setInterval(function(){
							if(unix_timestamp()>restart_in) {
								clearInterval(restart_in_counter);
								check_stamina(join_arena);
							} else {
								run = false;
								set_progress_bar(restart_in-unix_timestamp(),parseInt($e('restart_minutes').val())*60,'Restart in '+(restart_in-unix_timestamp()));
							}
						},1000);
						//timer
					}
				}
				else if(json.data.message.indexOf('Unable to join')!=-1) {
					var wait = Math.floor(Math.round((Math.random() * 8))+2);
					log('Unable to join this Arena. Join another one. Trying again in '+wait+'s...');
					setTimeout(join_arena,wait*1000);
				}
				else {
					log('Could not join, msg='+json.data.message);
					run = false;
				}
			}

		},function(){
			log('Error on trying to join arena, retrying in 30 seconds...');
			setTimeout(join_arena,30000);
			// script ends here
		});
	}

	function load_arena(){
		request('xw_controller=Lobby&xw_action=loadArena&xw_client_id=8&exit=t',function(msg){
			var m;
			if(m = /viewObj.init\(\"([^\"]*)\",/.exec(msg)) {
				var wslink = m[1];
				connect_arena(wslink);
			}
			if (m = /MW.lobbyViewObj.getSendMsg\(\'([\d\,]+)\', \'([^\']*)\'/.exec(msg)) {
				// log('Send: '+m[1]+' and '+m[2]);
				if(socke_lobby && !is_challenge && m[1]) {
					//MW.lobbyViewObj.getSendMsg('1838839,71067503,68031107,2881364,146845412', 'notif,4,hw,8933173235997758366,1366783720,arena-2.mafiawars.zynga.com,Spockwars13,f1e87f3089891b265ea9433c642fa65a,3;notif,4,hw,8933173235997758366,1366783720,arena-2.mafiawars.zynga.com,Spockwars13,d8514f989842550a4cc9846f08a5c947,3;notif,4,hw,8933173235997758366,1366783720,arena-2.mafiawars.zynga.com,Spockwars13,77bb5bc96d8b545623e035d794d42c10,3;notif,4,hw,8933173235997758366,1366783720,arena-2.mafiawars.zynga.com,Spockwars13,b37830ab336eb8dd9d06ea08ed7138a2,3;notif,4,hw,8933173235997758366,1366783720,arena-2.mafiawars.zynga.com,Spockwars13,0b5526d7d432183bce8bb628cb7304da,3');
				
					//socke_lobby.send('7006,"Cmd":"sendMsg","Args":["146845412"],"Extra":["notif,3,lw,5083603607271892524,1366608939,arena-2.mafiawars.zynga.com,9efb1c2e5f6e0b569d5200f6337e0133"]}');
					socke_lobby.send('{"Id":'+User.id.substr(2)+',"Cmd":"sendMsg","Args":["'+m[1]+'"],"Extra":["'+m[2]+'"]}');
				}
			}
		},function(){
			log('Error on trying to load');
		});
	}

	function connect_arena(sockenurl) {
		socke=new WebSocket(sockenurl);
		socke.onopen=function(){
			log('Connected to Arena.');
			$e('table').html(optable);
			conn_checker = setInterval(check_connection,100);
		};
		socke.onmessage=function(msg){


//			log('Received:'+msg.data);
			var json=JSON.parse(msg.data);
			if (debug) { da_game.push(json); }
			if (debug) { $e('debug_game').val(JSON.stringify(da_game)).show(); }

			try {
				if((json.mi.ammo==-1) && (json.ac)) {
					if(json.ac.substr(0,1)=="2") {
						if(json.ac.substr(2,1)=="1") {
							log('Successfully escaped! Brave Sir Robin ran <a href=\"http://www.youtube.com/watch?v=BZwuTo7zKM8&feature=player_detailpage#t=59s\" target=\"_blank\">away away!</a>');
							// give me my stamina back!
							request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(){
								log('Stamina retrieved.');
								$e('stage').html('Waiting for Start.');
							});
						} else {
							log('Could not leave, too late. You are trapped in here, good luck.');
						}
					}
				}
			} catch(all) {console.log(all);}
			
			update_info(json);
			decide_actions();
			send_queue();


		};
		socke.onclose=function(){
			last_update=0;
			$e('debugsend').show();
			$e('debugsend_a').show();
			if (debug) { $e('debug_game').val(JSON.stringify(da_game)).show(); }
			//log('Disconnected');
			clearInterval(conn_checker);
			$e('connstatus').html('-');
			set_progress_bar(0,0,'');
			
			if(currdata && (currdata.s==2)) {
				console.log(currdata);
				try {
					if((currdata.s<1) && (currdata.mi.ammo==-1)){
						run = false;
						return;
					}
				} catch(all) {console.log(all);}
			
				reconnect_retry++;
				if(reconnect_retry>3) {
					log('Probably lost connection, not retrying again.');
				} else {
					log('Probably lost connection, reconnecting');
					join_arena();
				}
			} else if (currdata.s==4) {
				log('Closed connection, challenge decline or expired.');
				// give me my stamina back!
				request('xw_controller=lobby&xw_action=leaveArena&xw_city=&xw_person=&xw_client_id=8',function(){
					log('Stamina retrieved.');
					$e('stage').html('Waiting for Start.');
					run = false;
					if($e('restart').is(':checked')) {
						$e('start').trigger('click');
					}
				});	
			}
			else
			{
				reconnect_retry = 0;
				get_rewards();
			}
		};
	}


	function check_connection(){
		if(!run) {
			clearInterval(conn_checker);
		}
		if(last_update>0){
			var res,gap=(new Date()).getTime()-last_update;
			if(gap<600) {
				res='<span class="good">Good!</span>';
			} else if(gap<1200) {
				res='<span style="color:orange;font-weight:600;">Slow...</span>';
			} else {
				res='<span class="bad">Stalled!</span>';
			}
			$e('connstatus').html(res);
		}
	}

	/******************* behavior logic ********************/
	function am_i_leading_by(points) {
		var i,best_player_points=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(currdata.pi[i].sc>best_player_points) { best_player_points=currdata.pi[i].sc;}
			}
		}
		var my_score=currdata.pi[meid].sc;
		return my_score-points>best_player_points;
	}

	function are_we_leading_by(points) {
		var team1 = parseInt(tscore["1"]);
		var team2 = parseInt(tscore["2"]);
		if (meteam == 1) {
			return team1-points>team2;
		}
		else {
			return team2-points>team1;
		}
	}
	// sorry, too lazy to make a generic function. If you steal this code, feel free to improve it.
	function am_i_targeting(points,targetrank) {
		var scores=[];
	
		for(i in currdata.pi) {
			if(i!=meid) {
				scores.push(currdata.pi[i].sc);
			}
		}
		
		scores.sort(function(a,b){return b-a;});
		
		var my_score=currdata.pi[meid].sc;
		
		return my_score-points>scores[targetrank-1];
	}
			
	function decide_allowed_to_attack(){
		try {
			var stopon = $e('stopon').val();
			var stoponval = parseInt($e('stoponvalue').val());
			var stamused = stam_on_start-currdata.mi.st;
			var score = currdata.pi[meid].sc;

			if(currdata.pi[meid].ph==0) { return false; } // me dead
			if(currdata.mi.st<10) { return false; } // no stam
			if((currdata.mi.st<50) && (poweratt)) { return false; } // no stam
			switch(stopon) {
				case "never": return true;
				case "stop": return false;
				case "teamleading": return !are_we_leading_by(stoponval);
				case "leading": return !am_i_leading_by(stoponval);
				case "leading3": return !am_i_targeting(stoponval,3);
				case "leading5": return !am_i_targeting(stoponval,5);
				case "staminaused": return stamused<stoponval;
				case "staminaleft": return currdata.mi.st>stoponval;
				case "score": return score<stoponval;
				case "stars": return currdata.ti[meteam].stars<stoponval;
			}
		} catch(err) {}
		return true;
	}

	function decide_who_to_attack(count){
		var i,list=[];
		// override active?
		
		if(powerup_command.target!==undefined) {
			//console.log('override');
			
			if((currdata.pi) && (currdata.pi[powerup_command.target]) && (currdata.pi[powerup_command.target].ph>0)) {
				for(i=0;i<count;i++) {
					list.push(powerup_command.target);
				}
				//console.log('override, successful:'+JSON.stringify(list));
				return list;
			} else {
				// target is not alive anymore
				powerup_command.target = undefined;
				$ec('kill').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
				// continue with normal selection
				//console.log('override not successful');
			}					
		}
		
		var target=$e('seltarget').val();
		if(powerup_status.kami_active) { target="highhealth"; }
		var skipshield_d=$e('skipshield').is(':checked');
		var skipshield_a=$e('skipshield_a').is(':checked');
		var bestid=-1,best=0;
		for(i in currdata.pi) {
			if(i!=meid) {
				if(!protect[i]) {
					if((!meteam) || (currdata.pi[i].tm!=meteam)) { // De Morgan, attack only enemies
						if((currdata.pi[i].ph>0)) {
							if(!(
								(skipshield_d && (currdata.pi[i].pu>1)) ||
								(skipshield_a && (currdata.pi[i].pu%2==1))
							)){
								var val;
								switch(target) {
									case "lowhealth": val=100-currdata.pi[i].ph; break;
									case "highhealth": val=currdata.pi[i].ph; break;
									case "leastpoints": val=1000000-currdata.pi[i].sc; break;
									case "mostpoints": val=currdata.pi[i].sc;break;
									case "leastrespect": val=10000-playerinfo[i].respect; break;
									case "mostrespect": val=playerinfo[i].respect; break;
									case "allalive": val=1; break;
									case "leastdiff": val=3-r_difficulty[playerinfo[i].diff]; break;
								}
								if(val>best) {
									list=[];
									list.push(i);
									best=val;
								} else if(val==best) {
									list.push(i);
								}
							}
						}
					}
				}
			}
		}
		
		if(list.length==0) {
			//console.log('doh, no target.');
		} else if(list.length>count) {
			list=list.slice(0,count);
		} else if(list.length<count) {
			while(list.length<count) {
				list.push(list[0]);
			}
		}
		return list;
	}

	function decide_actions(){
		var numatt = parseInt($e('numatt').val()) || 3;
		if(numatt>3) { numatt=3; }
		
		if(currdata.s==2) { // fight active
			if($e('powerattack').is(':checked')) {
				poweratt_on();
			} else {
				poweratt_off();
			}
			// power ups
			var usekami=$e('boostkami').is(':checked');
			if(usekami && !powerup_status.kami_used) {
				var kamitime = parseInt($e('boostkami_s').val());
				if(currdata.t<kamitime) {
					use_powerup(5);
				}
			}
			
			// send queued powerup
			if(powerup_command.active!=-1) {
				cmdqueue.unshift('3:'+powerup_command.active);
				if ((powerup_command.active==1) || (powerup_command.active==2)) { // don't retry heal or stam refill
					powerup_command.active = -1;
					$ec('boost.'+spocklet+'_puactive').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
					$ec('boost2.'+spocklet+'_puactive').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
				}
			}

			if(decide_allowed_to_attack()) {
				var i,who=decide_who_to_attack(numatt-cmdqueue.length);
				for(i=0;i<who.length;i++) {
					attack(who[i],1);
				}
			}
			//console.log(cmdqueue);
		}
	}

	/********************* communication and stats ***********************/
	function get_rewards(handler) {
		// log('Retrieving rewards...');
		request('xw_controller=Arena&xw_action=rewards&xw_client_id=8',function(msg){
			parse_loot(msg);
			is_challenge=false;
			setTimeout(function(){ getStats(displayMafiaStats); },2000);
			if($e('restart').is(':checked')) {
				if(current_arena_was=='normal') {
					if(currdata.mi.st>=parseInt($e('min_stam_for_restart').val())) {
						join_arena();
					} else {
						check_stamina(join_arena);
					}
				} else if(current_arena_was=='mychallenge') {
					if($e('chal_restart').is(':checked')) {
						log('Restart challenge...');
						lobby_send_challenge();
					}
				} else if(current_arena_was=='myprivate') {
					console.log(1);
					if($e('private_restart').is(':checked')) {
						log('Restart private room');
						lobby_create_private_room();
					}
				}
			} else {
				run = false;
			}
		});
	}
	function update_crests(){
		request('xw_controller=lobby&xw_action=play',function(resp){
			var $page = $('<div>'+resp+'</div>');
			var crests = parseInt($page.find('.mastery_stat_cont').find('.respect_value').text());
			var output = '';
			if(!isNaN(crests)){
				if(last_crests){
					output += crests+'<span class="good">(+'+(crests-last_crests)+')</span>';
				}
				else{
					output += crests;
					last_crests = crests;
				}
			}
			$e('crests').html(output);
		},$.noop)
	}
	function check_stamina(handler) {
		if(!($e('check_stam').is(':checked'))) {
			handler();
		} else {
			log('Checking stamina...');
			request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&city=7&xw_client_id=8',function(msg){
				try {
					var data = JSON.parse(msg);
					update_game_ui_sp(data);
					var stamavail=data.user_fields.user_stamina;
					var xpneed=data.user_fields.exp_to_next_level;
				} catch(e) {
					log('Error parsing JSON, retry in 5s...');
					setTimeout(check_stamina,5000,handler);
					return;
				}
				var can_restart = true;
				var stamneed=parseInt($e('min_stam_for_restart').val());
				if(stamavail>stamneed){
					can_restart = true;
				} else {
					can_restart = false;
				}
				if(parseFloat($e('min_ratio_for_restart').val())) {
					//console.log([parseFloat($e('min_ratio_for_restart').val()),stamavail,xpneed,xpneed/stamavail]);
					if (parseFloat($e('min_ratio_for_restart').val())<(xpneed/stamavail)) {
						can_restart = false;
					}
				}

				if (can_restart) {
					handler();
				} else {
					log('Not enough stamina/ratio, check your config settings.');
					run = false;
					if($e('restart_stam').is(':checked')) {
						var min=parseInt($e('restart_minutes').val());
						restart_in=unix_timestamp()+(min*60);
						log('Restarting in '+min+' minutes');
						restart_in_counter = setInterval(function(){
							if(unix_timestamp()>restart_in) {
								clearInterval(restart_in_counter);
								check_stamina(join_arena);
							} else {
								set_progress_bar(restart_in-unix_timestamp(),parseInt($e('restart_minutes').val())*60,'Restart in '+(restart_in-unix_timestamp()));
							}
						},1000);
						//timer

					}
				}
			});
		}
	}


	function parse_loot(msg){
		window.eikea=msg;
		var $msg=$('<div>'+msg+'</div>');
		var rewards={},arena={};
		var mobfury = false;
		if ($msg.find('div.team-status').length > 0) {
			mobfury = true;
			rewards.xp = parseInt($msg.find('div.xp-earned span.value').text()) || 0;
			rewards.respect = parseInt($msg.find('div.respect-earned span.value').text()) || 0;
		}
		else {
			rewards.xp = parseInt($msg.find('.xp_earned > .value').text()) || 0;
			rewards.respect = parseInt($msg.find('.respect_earned > .value:first').text()) || 0;
		}
		//rewards.xp = (mobfury ? parseInt($msg.find('span.value:first','div.xp-earned').text()) : parseInt($msg.find('.xp_earned > .value').text()));
		//rewards.respect = (mobfury ? parseInt($msg.find('span.value:first','div.respect-earned').text()) : parseInt($msg.find('.respect_earned > .value:first').text()));
		if($msg.find('.respect_earned > .label:last').text().indexOf('Crests')!=-1) {
			rewards.crests=parseInt($msg.find('.respect_earned > .value:last').text()) || 0;
		}
		rewards.stam_cur=parseInt($msg.find('.stamina_stats > .current').text());
		rewards.stam_total=parseInt($msg.find('.stamina_stats > span:last').text());
		if (mobfury) {
			if($msg.find('div.team-board.winner').find('li.myself').length > 0) {
				rewards.rank = 1;
			}
			else {
				rewards.rank = 6;
			}
			// get my team, there is probably an easier way for that
			if($msg.find('.team-red .myself').length>0) {
				rewards.stars=$msg.find('.team-red .gold-star').length;
			} else {
				rewards.stars=$msg.find('.team-blue .gold-star').length;
			}
		}
		else {
			rewards.rank = $msg.find('.rank_holder > .position').text();
		}
		if(currdata) {
			rewards.stamused=(stam_on_start - currdata.mi.st);
		}
		rewards.ratio=(rewards.xp / rewards.stamused).toFixed(2);
		rewards.loot=[];
		rewards.points=parseInt($e('score'+meid).text());
		
		var loot_strings=[];
		$($msg.find('#your_reward_list > .arena_fight_rewards_item_container')).each(function(){
			var loot = {};
			loot.name = $(this).find('.arena_reward_items_bg > .name').text().trim() || $(this).find('.arena_reward_items_special_bg > .name').text().trim();
			loot.id = $(this).find('.arena_reward_items_bg img').attr('item_id') || false;
			loot.src = $(this).find('.arena_reward_items_bg img').attr('src') || $(this).find('.arena_reward_items_special_bg img').attr('src');
			loot.quantity = parseInt($(this).find('.qty').text().trim().substr(2)) || 1;
			loot.attack = parseInt($(this).find('.attack').text().trim()) || 0;
			loot.defense = parseInt($(this).find('.defense').text().trim()) || 0;
			rewards.loot.push(loot);
			loot_strings.push('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		});
		if(rewards.crests){
			var loot={ name:"Crests", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/crestlogo_16.png",quantity:rewards.crests };
			rewards.loot.push(loot);
			loot_strings.unshift('<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		}
		if(rewards.stars) {
			var loot={ name:"Stars", src:"https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/TeamVSTeam/result_star_filled.png",quantity:rewards.stars };
			rewards.loot.push(loot);
			loot_strings.unshift('<img src="'+loot.src+'" width="16" height="16">'+loot.name+' <span class="good">&times;'+loot.quantity+'</span> ');
			add_loot(loot);
		}
		// console.log(rewards);
		log('Result: #'+rewards.rank+' <span class="experience">'+rewards.xp+' ('+rewards.ratio+')</span> <span class="respect">'+(rewards.respect>0?'+':'')+rewards.respect+'</span> '+loot_strings.join(''));
		write_loot();
		update_crests();
		
		var logline='';
		var opponents=0, opponentname='',name='',score=0,resp=0,pos=1;
		if (mobfury) {
			//Team Red
			logline += '[<span '+$c('teamred')+'><strong>Team Red</strong></span>] ';
			$($msg.find('div.team-red .standings_list')).each(function(){
				name = $(this).find('.name').text();
				score = $(this).find('.score').text();
				resp = $(this).find('.respect_wrapper').html();
				logline += pos+'. '+name+' <span class="respect">'+resp+'</span> Score: '+score+' - ';
				pos++;
			});
			//Team Blue
			logline += ' [<span '+$c('teamblue')+'><strong>Team Blue</strong></span>] ';
			pos = 1;
			$($msg.find('div.team-blue .standings_list')).each(function(){
				name = $(this).find('.name').text();
				score = $(this).find('.score').text();
				resp = $(this).find('.respect_wrapper').html();
				logline += pos+'. '+name+' <span class="respect">'+resp+'</span> Score: '+score+' - ';
				pos++;
			});
			arena.teamred = parseInt($msg.find('#team-red-score').text()) || 0;
			arena.teamblue = parseInt($msg.find('#team-blue-score').text()) || 0;
			arena.type = 'mobfury';
			opponentname = 'Mob Fury';
			stats.respect = parseInt($msg.find('li.standings_list.myself div.respect_wrapper').html());
		}
		else {
			$($msg.find('.standings_list')).each(function(){
				var pos=$(this).find('.pos').text();
				var name=$(this).find('.name').text();
				var resp=$(this).find('.respect_wrapper').html();
				var powerups='';
				$(this).find('.powerups_used img').each(function(){
					powerups+='<img src="'+this.src+'" width="16" height="16" />';
				});
				logline+=pos+'. '+name+' <span class="respect">'+resp+'</span> '+powerups+' ';
				if(pos==parseInt(rewards.rank)) { stats.respect=parseInt(resp); }
				opponents++;
				if(!$(this).hasClass('its_me') || !$(this).hasClass('myself')) { opponentname=name; }
			});
		}
		log(logline);
		
		// arena list
		arena.rank = parseInt(rewards.rank);
		arena.stam = rewards.stamused>0?rewards.stamused:0;
		arena.points = rewards.points;
		arena.crests = rewards.crests;
		arena.opponents = (mobfury ? 1 : opponents);
		arena.opponentname = opponentname;
		arena.diff = '';
		$('span[id*="spartacus_diff"]').each(function(){arena.diff+=$(this).text().substr(0,1);})		
		arenalist.push(arena);
		write_arenas();

		if(msg.indexOf('You are now LEVEL')!=-1) {
			log('<span class="good">Levelup!</span>');
			if($e('leveluppopup').is(':checked')) {
				var code=msg.re('(setTimeout.*\\,\\s10\\)\\;)');
				eval(code);
			}
			if($e('levelupbonus').is(':checked')) {
				//collect the levelup bonus
				grab_bonus();
			}
		}
		stats.stamina+=rewards.stamused;
		stats.xp+=rewards.xp;
		stats.arenas++;
		if(rewards.stars) {
			stats.stars+=rewards.stars;
		}
		stats.ranks[parseInt(rewards.rank)-1]++;
		stats.crests+=rewards.crests;
	}


	function grab_bonus() {
		request('xw_controller=levelUpBonus&xw_action=addBonusItem&xw_city=&mwcom=1&no_load=1',function(page){
			if (page.indexOf('ERROR 500: response never closed') != -1) {
				log('<span class="bad">Bonus not available/already retrieved</span>');
			}
			else {
				var data = JSON.parse(page.replace(/^(\s\d\s+)/,''));
				log('Level '+data.user_fields.user_level+' bonus: <img src="'+data.bonusImage+'" height="16" width="16" /> '+data.bonusName);
				var loot = { name: '[Levelup] '+data.bonusName.replace(/A MYSTERY SHIPMENT CONTAINING/,''), src: data.bonusImage, quantity: 1 };
				add_loot(loot);
				update_game_ui_sp(data);
			}
		});
	}

	function add_loot(item) {
		var id = (Util.isset(item.id) ? item.id : item.name);
		if (typeof looted[id] == 'object') {
			looted[id].quantity += item.quantity;
		}
		else {
			looted[id] = {
				"id": id, "name": item.name, "src": item.src, "quantity": item.quantity, "attack":item.attack, "defense":item.defense
			}
		}
	}

	function sort_loot(){
		var x,list = [];
		for (x in looted) {
			list.push(x);
		}
		list.sort(function(a,b){
			if(looted[a].name=="Ices") { return -1; }
			if(looted[b].name=="Ices") { return 1; }
			if(looted[a].name=="Crests") { return -1; }
			if(looted[b].name=="Crests") { return 1; }
			if(looted[a].name=="Stars") { return -1; }
			if(looted[b].name=="Stars") { return 1; }
			return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense));
		});
		return list;
	}

	function write_loot() {
		var sorted=sort_loot();
		var loothtml = '<table>';
		for (i=0;i<sorted.length;i++) {
			var loot = looted[sorted[i]];
			var image = '<img src="'+loot.src+'" class="item_with_preview" item_id="'+loot.id+'" title="'+loot.name+'" width="16" height="16" />';
			if (itemdatabase[loot.id]) {
				var loot2 = itemdatabase[loot.id];
				var attack = '', defense = '', improves = false, improve = '', stopat = '';
				if (loot2.attack > 0) {
					attack = '['+loot2.attack+'A';
					if(worstitems[itemdatabase[loot.id].type].att<loot2.attack) {
						improves = true;
						improve += '<span class="attack good">+'+(loot2.attack - worstitems[itemdatabase[loot.id].type].att)+'</span> ';
					}
				}
				if (loot2.defense > 0) {
					defense = loot2.defense+'D]';
					if(worstitems[itemdatabase[loot.id].type].def<loot2.defense) {
						improves = true;
						improve += '<span class="defense good">+'+(loot2.defense - worstitems[itemdatabase[loot.id].type].def)+'</span>';
					}
				}
				if (stop_at_loot && (stop_at_loot.loot==loot.id)) {
					stopat='(stopping at '+stop_at_loot.count+')';
				} else {
					stopat='(stop at)';
				}					
				
				var have = loot.quantity;

				have = (loot2.quantity>0?' <span class="more_in">Have: '+(loot2.quantity+loot.quantity)+'</span>':'');
				loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td><td>'+image+'<span style="'+(improves?"color:yellow;":"")+'">'+loot2.name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td>'+improve+'</td><td>'+have+'</td><td><a href="#" class="'+spocklet+'_stopatloot" data-id="'+escape(loot.id)+'">'+stopat+'</a></td></tr>';
			}
			else
			{
				if(loot.name=="Ices") {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: #609AD1; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
				} else if (loot.name=="Stars") {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td><span style="color: yellow; font-weight:bold;">'+image+loot.name+'</span></td><td></tr>';
				} else {
					loothtml += '<tr><td><span class="good">&times;'+loot.quantity+'</span></td></td><td>'+image+loot.name+'</td><td></tr>';
				}
			}
		}
		loothtml += '</table>';
		$e('lootlog').html(loothtml);
		$('.'+spocklet+'_stopatloot').click(function(){
			var x=unescape($(this).attr('data-id'));
			var num=parseInt(prompt("You have looted "+looted[x].quantity+" of "+x+" now. Stop after a total of: (enter 0 to remove)"));
			if(num>0) {
				stop_at_loot={"loot":x, "count":num};
				$('.'+spocklet+'_stopatloot').text('(stop at)');
				$(this).text('(stopping at '+num+')');
			} else {
				stop_at_loot=false;
				$(this).text('(stop at)');
			}
			return false;
		});			
	}
	
	function write_arenas(){
		var i,score,html='';
		for(i=0;i<arenalist.length;i++){
			var type,arena=arenalist[i];
			if (arena.opponents > 2) {
				type = 'Rank: '+arena.rank+" of "+arena.opponents;
				score = 'Score: '+arena.points;
			}
			if (arena.opponents < 3) {
				type = (arena.rank==1?'Won':'Lost')+" against "+arena.opponentname;
				score = 'Score: '+arena.points;
			}
			if (arena.type == 'mobfury') {
				type = 'MobFury '+(arena.rank==1?'Victory':'Loss');
				score = 'Red: '+arena.teamred+' vs Blue: '+arena.teamblue;
			}
			html += 'Arena #'+(i+1)+' '+type+', '+score+', Stamina: '+arena.stam+(arena.crests?', Crests:'+arena.crests:'')+' [<a href="#" data-id="'+i+'" '+$c('brag')+' >Brag</a>]';
			if(debug) {
				html+=' - Diff: '+arena.diff;
			}
			html+='<br />';
		}
		$e('arenalog').html(html);
		$ec('brag').click(function(){
			var text,i=$(this).attr('data-id'),arena=arenalist[i];

			if(arena.opponents>2) {
				if(arena.rank==1) {
					text='Won an arena, scored '+arena.points+' points! Yay!';
				}
				else if (arena.rank==6) {
					text='Totally lost an arena, scored only '+arena.points+' points! Boo!';
				}
				else {
					text='Just finished an arena with '+arena.points+' points and ranked #'+arena.rank+'!';
				}
			}
			else {
				if(arena.rank==1) {
					text='Won a 1-on-1 challenge against '+arena.opponentname+', scored '+arena.points+' points! Yay!';
				}
				else {
					text='Lost a 1-on-1 challenge against '+arena.opponentname+', scored '+arena.points+' points! Doh!';
				}
			}

			var FeedObj = { 
				picture:'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/Arena/rewards/arena_feed_200x200.png', 
				source:'', 
				link:'http://apps.facebook.com/inthemafia/track.php?next_controller=lobby&next_action=land', 
				name:'I am Spartacus, God of the Arena!', 
				caption:' ', 
				description:text, 
				userMessage:'', 
				actionLinks:[{'name': 'Play MW Unframed', 'link': 'http://'+zserver+'.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1'}],
				attachment:null, 
				targetId:0,
				callback:function(){}
			};
			MW.Feed(FeedObj);
			return false;
		});
	}
	
	function get_stage(i) {
		if(i==0) { return "Waiting for more players.."; }
		if(i==1) { return "Waiting for Start."; }
		if(i==2) { return "Fighting!"; }
		if(i==3) { return "Finished."; }
		if(i==4) { return "Waiting for Opponent(s)..."; } // challenge mode
		return "Unknown:"+i;
	}

	function send_queue() {
		if(cmdqueue.length>0) {
			/* only debug */
			if(debug) {
				var i,debugstr='Send:';
				for(i=0;i<cmdqueue.length;i++) {
					var cmd=cmdqueue[i].split(':');
					if(cmd[0]=="1") { debugstr+=' Attack #'+cmd[1]; }
					if(cmd[0]=="2") { debugstr+=' Poweratt '+cmd[1]; }
					if(cmd[0]=="3") { debugstr+=' Powerup '+powerups[cmd[1]].name; }
				}
				debuglog(debugstr);
			}
			/* only debug end */
			var string='{"Nonce":'+currdata.mi.ammo+',"CMD":"'+cmdqueue.join(';')+'"}'
			cmdqueue=[];
			socke.send(string);
			if (debug) { da_game.push(JSON.parse(string)); }
		}
	} 

	function attack(i,num) {
		var j;
		for(j=0;j<num;j++) {
			cmdqueue.push("1:"+i);
		}
	}

	function poweratt_on() {
		if(poweratt!==true) {
			cmdqueue.push("2:1");
			poweratt=true;
		}
	}

	function poweratt_off() {
		if(poweratt!==false) {
			cmdqueue.push("2:0");
			poweratt=false;
		}
		return false
	}


	function use_powerup(id) {
		powerup_command.active=id;
		powerup_command.target=undefined;
	}

	function display_matrix(){
		var i,j,ts=unix_timestamp();
		if($e('attmatrix').length==0) {
			var html='<table '+$i('attmatrix')+' cellspacing="0" cellpadding="0"><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>';
			for(i=0;i<6;i++) {
				html+='<tr><th>'+(i+1)+'</th>';
				for(j=0;j<6;j++) {
					html+='<td '+$i('mat_'+i+'_'+j)+'>'+(i==j?'':0)+'</td>';
				}
				html+='</tr>';
			}
			html+='</table>';
			$e('attmatrix_outer').html(html);
		}
		for(i in attmatrix) {
			for(j in attmatrix[i]) {
				$e('mat_'+i+'_'+j).html(attmatrix[i][j].count).css('background-color',(ts-attmatrix[i][j].lastupdate<2?'red':'black'));
			}
		}
	}

	function update_info(data) {
		if(data.s==2) {
			// update last data received
			if(last_update>0) {
				var newtime=(new Date()).getTime();
				update_debug.push(newtime-last_update);
				$e('delay').text((newtime-last_update)+'ms');
				last_update=newtime;
				window.eike=update_debug;
			} else {
				last_update=(new Date()).getTime();
			}
		}

		// debuglog(JSON.stringify(data));
		// console.log(data);
		set_progress_bar(data.t,data.s==2?90:20,data.t+' seconds left');

		// counter
		if(data.s==1) {
			starting_in = unix_timestamp()+data.t;
			clearInterval(starting_in_counter) ;
			starting_in_counter = setInterval(function(){
				if(starting_in < unix_timestamp()) {
					clearInterval(starting_in_counter) ;
				} else {
					set_progress_bar(parseInt(starting_in - unix_timestamp()),20,starting_in - unix_timestamp()+' seconds left');
				}
			},1000);
			if(data.mi) {
				stam_on_start = data.mi.st; // save at start
			}
		}
		else {
			clearInterval(starting_in_counter);
		}


		if(data.mi && (stam_on_start==-1)) {
			stam_on_start = data.mi.st;
		}

		$e('stage').html(get_stage(data.s));
		if(data.s<1) {
			$e('stage').append(' <a href="#" '+$i('leave')+'>(leave)</a>');
			$e('leave').click(function(){
				socke.send('{"Nonce":-1,"CMD":"2"}');
				return false;
			});
		}

		// $e('ac').html(data.ac); boring old stuff
		// amazing new stuff: attack matrix
		if(data.ac) {
			var attacks=data.ac.split(';');
			var i,ts=unix_timestamp();

			for(i=0;i<attacks.length;i++) {
				var attacker_defender=attacks[i].split(':');
				var att=attacker_defender[0],def=attacker_defender[1];

				if(!attmatrix[att]) {
					attmatrix[att]={};
				}
				if(!attmatrix[att][def]) {
					attmatrix[att][def]={ count:1, lastupdate:ts};
				}
				else {
					attmatrix[att][def].count++;
					attmatrix[att][def].lastupdate=ts;
				}
			}
			//console.log(attmatrix);
			display_matrix();
		}

		tscore={"1":0,"2":0};
		
		// enemy powerups
		for(i in data.pi) {
			var pi=data.pi[i];
			// thanks Alex for this idea
			if(pi.ph == 0){
				if(healtimer[i]<10) {
					healtimer[i] = unix_timestamp() + 10;
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_boost').removeClass(spocklet+'_puclick').addClass(spocklet+'_punoclick').removeClass(spocklet+'_pufull').addClass(spocklet+'_puoff');
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_kill').removeClass(spocklet+'_puclick').addClass(spocklet+'_punoclick').removeClass(spocklet+'_pufull').addClass(spocklet+'_puoff');
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_boost2').removeClass(spocklet+'_punoclick').addClass(spocklet+'_puclick').removeClass(spocklet+'_puoff').addClass(spocklet+'_pufull');
				}
				var t=(healtimer[i] - unix_timestamp()); if(t<1) { t=1; }
				$e('health'+i).html('<span class="bad">in '+t+'s</span>');
			}
			else {
				$e('health'+i).html(pi.ph.toFixed(1)+'%');
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_boost').removeClass(spocklet+'_punoclick').addClass(spocklet+'_puclick').removeClass(spocklet+'_puoff').addClass(spocklet+'_pufull');
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_kill').removeClass(spocklet+'_punoclick').addClass(spocklet+'_puclick').removeClass(spocklet+'_puoff').addClass(spocklet+'_pufull');
					$('#'+spocklet+'_usepu'+i+' > .'+spocklet+'_boost2').removeClass(spocklet+'_puclick').addClass(spocklet+'_punoclick').removeClass(spocklet+'_pufull').addClass(spocklet+'_puoff');
			}
			if(unix_timestamp()>healtimer[i]) {
				healtimer[i] = 0;
			}

			$e('score'+i).html(pi.sc);
			//team colors
			if (pi.tm == 1) {
				$e('op'+i).addClass(spocklet+'_teamred');
			}
			else if (pi.tm == 2) {
				$e('op'+i).addClass(spocklet+'_teamblue');
			}
			else {
				$e('op'+i).removeClass(spocklet+'_teamblue').removeClass(spocklet+'_teamred');
			}
			// team score
			if(pi.tm) {
				tscore[pi.tm]+=pi.sc;
			}
			
			var puhtml='';
			if(pi.pu>1) { puhtml+='<span class="'+spocklet+'_defsh">&nbsp;</span> '; }
			if(pi.pu%2==1) { puhtml+='<span class="'+spocklet+'_offsh">&nbsp;</span> '; }
			$e('pu'+i).html(puhtml);
		}
		// update teamscore
		if(data.ti) {
			if(data.ti["1"] && data.ti["2"]) {
				tscore["1"]+=2000 * data.ti["1"].stars;
				tscore["2"]+=2000 * data.ti["2"].stars;
				var t1=tscore["1"], t2=tscore["2"];
				var s1='',s2='';
				if(data.ti["1"].stars==0) {
					s1=nostarimg;
				} else {
					for(var i=0;i<data.ti["1"].stars;i++) { s1+=starimg; }
				}
				if(data.ti["2"].stars==0) {
					s2=nostarimg;
				} else {
					for(var i=0;i<data.ti["2"].stars;i++) { s2+=starimg; }
				}

				if(meteam==1) {
					$e('teamscore').html('<span style="color:#ec2d2d;">Team Red (you)</span> score: <span class="'+(t1>=t2?'good':'bad')+'">'+t1+'</span> '+s1+' vs. <span style="color:#0099FF;">Team Blue</span> score: <span class="'+(t2>=t1?'good':'bad')+'">'+t2+'</span> '+s1);
				} else {
					$e('teamscore').html('<span style="color:#0099FF;">Team Blue (you)</span> score: <span class="'+(t2>=t1?'good':'bad')+'">'+t2+'</span> '+s2+' vs. <span style="color:#ec2d2d;">Team Red</span> score: <span class="'+(t1>=t2?'good':'bad')+'">'+t1+'</span> '+s1);
				}
			}
		}
		if(data.mi) {
			$e('me_st').html(data.mi.st);
			//$e('me_ammo').html(data.mi.ammo);
//			$e('me_pst').html(data.mi.pst);
			if(data.mi.pui) {
				update_powerups(data.mi.pui);
			}
			$e('me_sr').html(data.mi.sr);

			if(currdata && currdata.mi) {
				if(data.mi.st>currdata.mi.stam+100) { // used used a stam refill
					log('Used a stamina refill!');
					stam_on_start += (data.mi.st-currdata.mi.stam);
				}
			}
			$e('me_stused').html(stam_on_start - data.mi.st);
			if (Util.isset(data.mi.tpst)) {
				var stamarr = data.mi.tpst.split('|'), stai;
				for (stai=0;stai<stamarr.length;stai++) {
					var stampi = stamarr[stai].split(',');
					$e('stam'+stampi[0]).html(stampi[1]+'%');
				}
			}
		}

		// healing timer
		if(meid) {
			$e('me_health').removeClass('good').removeClass('bad').addClass(data.pi[meid].ph>0?'good':'bad').html(data.pi[meid].ph);
			if((data.pi[meid].ph==0) && (currdata.pi[meid].ph>0)) {
				healed_in=unix_timestamp()+10;
				clearInterval(healed_in_counter);
				healed_in_counter = setInterval(function(){
					if(unix_timestamp()>healed_in) {
						clearInterval(healed_in_counter);
						$e('healin').html('');
					} else {
						$e('healin').html('Healing in '+(healed_in - unix_timestamp())+'s');
					}
				},1000);
			} else {
				try {
					$e('healin').html('');
					clearInterval(healed_in_counter);
				} catch(e){ }
			}
		}

		for(i in data.pi) {
			if((data.pi[i].pid) && (!playerids[data.pi[i].pid])) {
				playerinfo[i]={ id:data.pi[i].pid };
				playerids[data.pi[i].pid]=i;
				if(data.pi[i].pid==User.id.substr(2)) {
					meid=i;
				}

				request('xw_controller=Arena&xw_action=getSingleUserData&pid='+data.pi[i].pid+'&xw_client_id=8',function(msg){
					var id,json=JSON.parse(msg);
					for(id in json.data.result) {
						var nr=playerids[id];
						playerinfo[nr].name=json.data.result[id].name;
						playerinfo[nr].respect=json.data.result[id].playerRespect.replace(',','').replace('K','000');
						playerinfo[nr].diff=difficulty[json.data.result[id].defenseFlag+json.data.result[id].mafiaDefenseFlag];
						if(id == User.id.substr(2)) {
							$e('name'+nr).html('<span '+$i('hover'+nr)+'><img src="'+json.data.result[id].pic+'" width="32" height="32" /><span class="good">Me!</span></span>');
							$e('diff'+nr).html('<div class="difficulty">-</div>');
							if(!stats.respect) { stats.respect_start=json.data.result[id].playerRespect.replace(',','').replace('K','000'); }
							$e('usepu'+nr).html(
								'<img src="'+powerups[2].pic+'" width="24" height="24" data-id="2" '+$c('boost2',['puoff','punoclick','punormal'])+' title="Use health boost">'+
								'<img src="'+powerups[3].pic+'" width="24" height="24" data-id="3" '+$c('boost',['pufull','puclick','punormal'])+' title="Use meta flair">'+
								'<img src="'+powerups[4].pic+'" width="24" height="24" data-id="4" '+$c('boost',['pufull','puclick','punormal'])+' title="Use pain killer">'+
								'<img src="'+powerups[7].pic+'" width="24" height="24" data-id="7" '+$c('boost',['pufull','puclick','punormal'])+' title="Use reflector">'
							);
						}
						else {
							var m;
							if(m=/\d+_(\d+)_\d+/.exec(json.data.result[id].pic)) {
								var fb=(friendlist[m[1]]?' <img width="12" height="12" title="Facebook Friend: '+friendlist[m[1]]+'" src="http://www.facebook.com/favicon.ico">':'');
								$e('name'+nr).html('<span '+$i('hover'+nr)+'><img src="'+json.data.result[id].pic+'" width="32" height="32" /><a href="https://www.facebook.com/'+m[1]+'" target="_blank">'+playerinfo[nr].name+fb+'</a></span>');
							} else {
								$e('name'+nr).html('<span '+$i('hover'+nr)+'><img src="'+json.data.result[id].pic+'" width="32" height="32" />'+playerinfo[nr].name+'</span>');
							}
							$e('name'+nr).append('<span data-id="'+id+'" '+$i('infobox'+nr)+' style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');
							$e('diff'+nr).html('<div class="difficulty">'+playerinfo[nr].diff+'</div>');
							var target='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/leaderboard/leaderboardTarget.png';
							var defense='https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-defense_04.gif';
							$e('usepu'+nr).html(
								'<img src="'+powerups[5].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="5" '+$c('boost',['pufull','puclick','punormal'])+' title="Nuke opponent (Kamikaze)">'+
								'<img src="'+powerups[6].pic+'" width="24" height="24" data-nr="'+nr+'" data-id="6" '+$c('boost',['pufull','puclick','punormal'])+' title="Use drain on opponent">'+
								'<img src="'+target+'" width="24" height="24" data-nr="'+nr+'" '+$c('kill',['pufull','puclick','punormal'])+' title="Hit this player until dead" >'+
								'<img src="'+defense+'" width="24" height="24" data-nr="'+nr+'" '+$c('protect',['puhalf','puclick','punormal'])+' title="Do not attack this player (click to enable, click again to disable)" >'


							);
						}
						$e('name'+nr).append('<span data-id="'+id+'" '+$i('infobox'+nr)+' style="display:none;position:absolute;border:2px white solid;background-color:#222;padding:5px;border-radius:5px;">loading...</span>');

						$e('respect'+nr).html(playerinfo[nr].respect);
						$e('hover'+nr).hover(function(event){
							var num=this.id.substr(6+spocklet.length);
							var id=$e('infobox'+num).attr('data-id');
							$e('infobox'+num).css("top",event.pageY+'px').css("left",(event.pageX-100)+'px');
							if(!$e('infobox'+num).attr('spdone')) {
								$e('infobox'+num).html('Profile loading...');
								load_player_profile(id,num);
							}
							$e('infobox'+num).show();
						},function(){
							var num=this.id.substr(6+spocklet.length);
							$e('infobox'+num).hide();
						});
						
						
						/* intervene, protect */
						$e('usepu'+nr,' > .'+spocklet+'_protect').click(function(){
							var pnr=$(this).attr('data-nr');
							if(protect[pnr]) {
								delete protect[pnr];
								$(this).removeClass(spocklet+'_pufull').addClass(spocklet+'_puhalf');
							} else {
								protect[pnr] = 1;
								$(this).removeClass(spocklet+'_puhalf').addClass(spocklet+'_pufull');
							}
						});
						
						/* intervene, kill */
						$e('usepu'+nr,' > .'+spocklet+'_kill').click(function(){
							if($(this).hasClass(spocklet+'_puclick')) { // only when active
								var pnr=$(this).attr('data-nr');
								if(powerup_command.target==pnr) { // turn off
									$(this).removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
									powerup_command.target=undefined;
								} else if (powerup_command.target===undefined) { // no target yet
									$(this).removeClass(spocklet+'_punormal').addClass(spocklet+'_puactive');
									powerup_command.target=pnr;
								} else { // switch target
									$e('usepu'+powerup_command.target,' > img.'+spocklet+'_kill').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
									$(this).removeClass(spocklet+'_punormal').addClass(spocklet+'_puactive');
									powerup_command.target=pnr;
								}
							}
						});
						
						/* intervene, boost */
						$('#'+spocklet+'_usepu'+nr+' > .'+spocklet+'_boost,#'+spocklet+'_usepu'+nr+' > .'+spocklet+'_boost2').click(function(){
							//console.log('click');
							if($(this).hasClass(spocklet+'_puclick')) { // only when active
								var puid=$(this).attr('data-id');
								var pnr=$(this).attr('data-nr');
								$ec('boost.'+spocklet+'_puactive').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
								$(this).removeClass(spocklet+'_punormal').addClass(spocklet+'_puactive');
								powerup_command.active = puid;
								powerup_command.target = pnr;
							}
						});
						
						
						/* old 
						$('#'+spocklet+'_usepu'+nr+' > img').click(function(){
							var puid=$(this).attr('data-id');
//										use_powerup(id);

							if($(this).hasClass(spocklet+'_hit') || $(this).hasClass(spocklet+'_hit2')) {
								console.log("Action "+puid+' on '+pnr);
							} else {
								console.log('inactive');
							}
						});
						*/


					}
				});
			}

			if(!meteam) {
				if(data.pi[i] && (data.pi[i].pid==User.id.substr(2))) {
					if(data.pi[i].tm!=0) {
						meteam=data.pi[i].tm;
						//log('found team:'+meteam);
					}
				}			
			}
		}
		// sort player and rank
		var rank=[];
		for(i in playerinfo) {
			rank.push(i);
		}
		try {
			rank.sort(function(a,b){return cmp(data.pi[a].sc, data.pi[b].sc);});
		} catch (notyetstartederror) {}
		for(i=0;i<rank.length;i++){
			if(!$e('sortplayer').is(':checked')) {
				if(!over_table) {
					$e('table').append($e('op'+rank[i]));
				}
			}
			$e('rank'+rank[i]).html('#'+(i+1));
		}
		// save old
		currdata=data;
	}
	function load_player_profile(id,nr) {
		$e('infobox'+nr).attr('spdone','true');
		request('xw_controller=stats&xw_action=view&user='+btoa('p|'+id),function(result){
			var $msg=$('<div>'+result.replace(/<img/g,'<noimg')+'</div>');
			window.eike1=result;
			window.eike2=$msg;
			try {
				var name=$msg.find('.stats_title_text').html().re('a> ([^>]*)"');
				var level=$msg.find('.stats_title_text').html().re('level (\\d*)');
				var tag=$msg.find('.stats_title_text > a').text().trim();
				var llink=$msg.find('.stats_title_text > a').attr('href');
				var arena_stats=$msg.find('#arena_collection .collection_list').text().trim().replace(/s*\n\s*/g,"<br />").replace(/:/g,': ');
				var mafia=$msg.find('a:contains("Ask Mafia to Attack")').length==0;
				var fid=atob(unescape(llink.re('id=([^&]*)&')));
			} catch(nofam) {
				var name=$msg.find('.stats_title_text').text().trim().re('"(.*)"');
				var tag="no family";
				var llink='';


			}
			var html='Full name: '+name+'<br />'+
			'Family: '+tag+' ('+fid+')<br/>'+
			'Level: '+level+'<br />'+
			(mafia?'<span class="good">In your mafia</span>':"Not a mafia member")+'<br /><br />'+
			arena_stats;
			$e('infobox'+nr).html(html);
			if(tag&&llink) {
				$('#'+spocklet+'_hover'+nr+' > img').after(
					'<a href="http://'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=clan&xw_action=view&xw_city=7&mwcom=1&id='+escape(btoa(fid))+'&from_red_link=1" class="mw_new_ajax" selector="#inner_page"><span style="color:red">'+tag+'</span></a> '
				);
			}
		});
	}


	function update_powerups(pui) {
		var html='<table><tr>';
		var i,pups=pui.split('|');
		for(i=0;i<pups.length;i++) {
			var pup=pups[i].split(',');
			var m=(pup[0].indexOf('-')===0);
			pup[0]=Math.abs(pup[0]);
			poweruplist[pup[0]]={ num:pup[2],cooldown:pup[1],type:m }
			if((powerup_command.count[pup[0]]!=pup[2]) && (powerup_command.active==pup[0])) {
				powerup_command.active=-1;
				$ec('boost.'+spocklet+'_puactive').removeClass(spocklet+'_puactive').addClass(spocklet+'_punormal');
			}
			powerup_command.count[pup[0]]=pup[2];
		}
		for(i in powerups) {
			if((poweruplist[i].cooldown>0) && (i!=5)) {
				html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span title="On cooldown or active">A/C</span> '+poweruplist[i].cooldown+'s</span>';
			} else if (powerup_command.active==i) {
				html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_notusepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num+
				'<br /><span title="Firing (sending command to server)">Fire</span>';
			} else {
				html+='<td valign=top style="text-align:center;"><img class="'+spocklet+'_usepowerup" data-id="'+i+'" src="'+powerups[i].pic+'" title="'+powerups[i].name+'" width="60" height="60" /><br />&times'+poweruplist[i].num;
				html+='<br /><span '+$i('pustatus'+i)+'></span>';
			}
			html+='</td>';
		}
		html+='</table>';
		if(poweruplist[5].cooldown>0) {
			powerup_status.kami_active = true;
			powerup_status.kami_used = true;
		}


		$e('powerups').html(html);
		$('.'+spocklet+'_usepowerup').click(function(){
			var id=$(this).attr('data-id');
			log('Using powerup: '+powerups[id].name);
			$e('pustatus'+id).html('<span title="Firing (sending command to server)">Fire</span>');
			use_powerup(id);
			return false;
		});
	}

	function list_achievement(num,bronze,silver,gold) {
		if(num<bronze) {
			return 'Nothing achieved yet, '+parseInt(num/bronze*100)+'% to <span style="color:#CD7F32;font-weight:800;">Bronze</span>.';
		} else if (num<silver) {
			return '<span style="color:#CD7F32;font-weight:800;">Bronze</span> achieved, '+parseInt(num/silver*100)+'% to <span style="color:#BFC1C2;font-weight:800;">Silver</span>.';
		} else if (num<gold) {
			return '<span style="color:#BFC1C2;font-weight:800;">Silver</span> achieved, '+parseInt(num/gold*100)+'% to <span style="color:#FFD700;font-weight:800;">Gold</span>.';
		} else {
			return "<span style='color:#FFD700;font-weight:800;'>Gold</span> achieved!";
		}
	}
	
	function load_achievements(){
		if($e('achilog').text()=='') {
			$e('achilog').html('Loading...');
			request('xw_controller=achievement&xw_action=view&xw_city=1&user=p|106368145',function(msg){
				var $msg=$(msg);
				var vft=parseInt($msg.find('div.ach_ach_name:contains("View from the Top Bronze")').parent().find('.ach_ach_date').text().re("In Progress \\((\\d+)\\/"));
				var god=parseInt($msg.find('div.ach_ach_name:contains("God of Death Bronze")').parent().find('.ach_ach_date').text().re("In Progress \\((\\d+)\\/"));
				var dd=parseInt($msg.find('div.ach_ach_name:contains("Damage Dealer Bronze")').parent().find('.ach_ach_date').text().re("In Progress \\((\\d+)\\/"));
				var ac=parseInt($msg.find('div.ach_ach_name:contains("Absolute Obliteration")').parent().find('.ach_ach_date').text().re("In Progress \\((\\d+)\\/"));
				var mvp=parseInt($msg.find('div.ach_ach_name:contains("MVP Supremo")').parent().find('.ach_ach_date').text().re("In Progress \\((\\d+)\\/"));

				var vft_i=$msg.find('div.ach_ach_name:contains("View from the Top Gold")').parent().find('img:first').attr('src');
				var god_i=$msg.find('div.ach_ach_name:contains("God of Death Gold")').parent().find('img:first').attr('src');
				var dd_i=$msg.find('div.ach_ach_name:contains("Damage Dealer Gold")').parent().find('img:first').attr('src');
				var ac_i=$msg.find('div.ach_ach_name:contains("Absolute Obliteration")').parent().find('img:first').attr('src');
				var mvp_i=$msg.find('div.ach_ach_name:contains("MVP Supremo")').parent().find('img:first').attr('src');
				
				var old={};
				try {
					var old=JSON.parse($g('achievementstatus'));
				} catch(e){}
				if(!old) { old={}; }
				
				var html='';
				html+='<img src="'+vft_i+'" /> View from the Top: '+vft+getdiff(vft,old.vft)+', '+list_achievement(vft,10,100,1000)+'<br />';
				html+='<img src="'+dd_i+'" /> Damage Dealer: '+dd+getdiff(dd,old.dd)+', '+list_achievement(dd,1E5,1E6,1E7)+'<br />';
				html+='<img src="'+god_i+'" /> God of Death: '+god+getdiff(god,old.god)+', '+list_achievement(god,10,100,1000)+'<br />';
				html+='<img src="'+ac_i+'" /> Absolute Carnage: '+ac+getdiff(ac,old.ac)+', '+list_achievement(ac,100,1000,10000)+'<br />';
				html+='<img src="'+mvp_i+'" /> MVP Supremo: <span class="'+(mvp>=100?'good':'bad')+'">'+mvp+'/100 Badges</span>'+getdiff(mvp,old.mvp)+'<br />';
				$e('achilog').html(html);
				$s('achievementstatus',JSON.stringify({vft:vft,god:god,dd:dd,ac:ac,mvp:mvp}));
			});
		} else {
			$e('achilog').html('');
		}
	}
	
	function getdiff(now,old){
		if(!old) { return ''; }
		if(parseInt(old)<parseInt(now)) {
			return ' (<span class="good">+'+(parseInt(now)-parseInt(old))+'</span>)';
		} else {
			return '';
		}
	}
	
	function set_progress_bar(value,of,text){
		var pc=100-parseInt(value/of*100);
		if(pc<0) { pc=0; }
		if(pc>100) { pc=100; }
		
		if($('#spartacusbar').length>0) {
			$('#spartacusbar > div').css('width',pc+'%');
			$('#spartacusbar p').text(text);

			if(pc>=88) {
				$('#spartacusbar').removeClass('gold').addClass('ruby');
			} else {
				$('#spartacusbar').removeClass('ruby').addClass('gold');
			}
		} else {
			$e('timeleftbar').html(''+
				'<div class="bossInfo">'+
				'<div style="position:relative; height:25px; ">'+
				'<div id="spartacusbar" class="progressBar gold dark_border" style="width:488px; float:left;">'+
				'<div style="width: '+pc+'%;"></div><p style="text-align:center;">'+text+'</p>'+
				'<div style="width: '+pc+'%;"><p style="text-align:center;color:#FFFFFF;">'+text+'</p></div></div>'+
				'</div>'+
				'<div class="progBackground" style="display: none;"></div>'+
				'<div class="clearfix" style="clear:both;"></div></div>');
			}
		}
	
	/******************** config ********************/
	function save_config(){
		var config={};
		$('.'+spocklet+'_conf input[type=text]').each(function(){
			config[this.id.replace(spocklet,'')]=$(this).val();
		});
		$('.'+spocklet+'_conf input[type=checkbox]').each(function(){
			config[this.id.replace(spocklet,'')]=this.checked;
		});
		$('.'+spocklet+'_conf select').each(function(){
			config[this.id.replace(spocklet,'')]=$(this).val();
		});
		// console.log(config);
		$s('config',JSON.stringify(config));
	}

	function load_config(){
		try {
			var config=JSON.parse($g('config'));
			$('.'+spocklet+'_conf input[type=text]').each(function(){
				$(this).val(config[this.id.replace(spocklet,'')]);
			});
			$('.'+spocklet+'_conf input[type=checkbox]').each(function(){
				this.checked=config[this.id.replace(spocklet,'')];
			});
			$('.'+spocklet+'_conf select').each(function(){
				$(this).val(config[this.id.replace(spocklet,'')]);
			});
		} catch(dannhaltnicht) { }
	}

	function displayMafiaStats(){
		$('#'+spocklet+'_strength_stats').html('');
        $('#'+spocklet+'_strength_stats').append(mafia_attack+' '+commas(stats.mafiaatt)+' (<span class="'+(stats.mafiaatt-stats.start_mafiaatt >= 0?'good">+':'bad">')+''+commas(stats.mafiaatt-stats.start_mafiaatt)+'</span>) ');
		$('#'+spocklet+'_strength_stats').append(mafia_defense+' '+commas(stats.mafiadef)+' (<span class="'+(stats.mafiadef-stats.start_mafiadef >= 0?'good">+':'bad">')+''+commas(stats.mafiadef-stats.start_mafiadef)+'</span>) ');
		display_all_stats();
	}


	function display_all_stats(){
		var html='';
		html+='Total arenas: '+stats.arenas+' ';
		html+='[';
		html+=stats.ranks[0]+'&times1st, ';
		html+=stats.ranks[1]+'&times2nd, ';
		html+=stats.ranks[2]+'&times3rd, ';
		html+=stats.ranks[3]+'&times4th, ';
		html+=stats.ranks[4]+'&times5th, ';
		html+=stats.ranks[5]+'&times6th';
		html+=']<br />';

		html+='Respect: <span class="respect">'+stats.respect+' ('+sdiff(stats.respect - stats.respect_start)+')</span> ';
		if(stats.crests) {
			html+='Crests: <span class="arena_mastery_crests">'+sdiff(stats.crests)+'</span> ';
		}
		html+='<span class="experience">'+stats.xp+'</span> ';
		html+='<span class="stamina">'+stats.stamina+'</span> ';
		html+='<span class="experience">'+(stats.stamina==0?0:(stats.xp/stats.stamina).toFixed(2))+'</span> ';
		if(stats.stars) {
			html+='<span class="good">'+starimg+stats.stars+'</span> '
		}

		$e('allstats').html(html);
	}

	/******************** helper *********************/
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


	var Ping = {
		inUse:false,
		start:0,
		ping:function(ip, callback) {
			if(!this.inUse) {

				this.inUse = true;
				this.callback = callback
				this.ip = ip;

				var _that = this;

				this.img = new Image();

				this.img.onload = function() {_that.good();};
				this.img.onerror = function() {_that.good();};

				this.start = (new Date()).getTime();
				this.img.src = "http://" + ip + '?id='+Math.random(4);
				this.timer = setTimeout(function() { _that.bad();}, 1500);
			}
		},
		good:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback((new Date()).getTime()-this.start);
				clearTimeout(this.timer);
			}
		},
		bad:function(){
			if(this.inUse) {
				this.inUse = false;
				this.callback(-1);
			}
		}
	}

	var arr;
	function debugsend(anon){
		var comment=prompt("Enter message to us, i.e. \"Connection problems at second 30-35\". Or leave empty.");
		arr=[];
		Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
			arr.push(ms);
			Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
				arr.push(ms);
				Ping.ping('arena-2.mafiawars.zynga.com',function(ms){
					arr.push(ms);
					$.ajax({
						url:'http://spockon.me/spartacus_stats.php',
						data: {
							fbid:anon?'':User.trackId,
							ping:arr.join(','),
							con:update_debug.join(','),
							comment:comment
						},
						dataType: "json",
						type:"post",
						success: function(data) {
							console.log(data);
						}



					});


				});
			});
		});




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

	function loadStats(){
		getStats(function(){
			// save first stats
			stats.start_mafiaatt=stats.mafiaatt;
			stats.start_mafiadef=stats.mafiadef;
			displayMafiaStats();
			loadInventoryAAN();
		});
	}
	function isArray(obj) {
		return obj.constructor == Array;
	}
	function loadInventoryAAN() {
		User.clicks++;
		var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+'xw_controller=inventory&xw_action=view&from_controller=inventory',
			data: params,
			cache: false,
			success: function(response){
				//itemdatabase = {};
				var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
				worstitems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
				//Locations = jQuery.parseJSON(/var Locations = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
				for (x in ZyngaItems) {
					ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
					itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
				}
				log('Inventory load complete.');
				load_friendlist();
				//console.log(worstitems);
				//console.log(itemdatabase);

			},
			error: function(){
				log('<span class="bad">Inventory Load failed!</span>');
				load_friendlist();
			}
		});
	}

	function load_friendlist(){
		FB.api('/me/friends',function(data){ 
			var i;
			for(i=0;i<data.data.length;i++) {
				friendlist[data.data[i].id]=data.data[i].name;
			} 
			log('Friendlist load complete.');
		});
	}
	
	function getStats(handler) {
		request('xw_controller=propertyV2&xw_action=createData&xw_city=7&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=&city=7&xw_client_id=8',function(msg){
			var data = JSON.parse(msg);
			update_game_ui_sp(data);
			stats.mafiaatt=parseInt(data.fightbar.group_atk);
			stats.mafiadef=parseInt(data.fightbar.group_def);
			stats.stam=parseInt(data.user_fields.user_max_stamina);
			stats.worstitems=data.worstitems;
			if(handler) { handler(); }
		});
	}

	function min(a,b){
		return a<b?a:b;
	}
	function max(a,b){
		return a>b?a:b;
	}
	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
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

	function log(message){
		message='<span class="more_in">'+timestamp()+'</span> '+message;
		logs.unshift(message);
		showlog();
	}
	function debuglog(message){
		message='<span class="more_in">'+timestamp(true)+'</span> '+message;
		debuglogs.unshift(message);
		if(debuglogs.length>10) { debuglogs.pop(); }
		$e('debug').html(debuglogs.join('<br />'));
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
	function showlog(){
		var displaylogs=logs.slice(0,loglines);
		var footer = logs.length>0?'<br /><a href="#" '+$i('logs_more')+' title="Show 10 more lines">more</a> <a href="#" '+$i('logs_less')+' title="Show 10 less lines">less</a> <a href="#" '+$i('logs_clear')+' title="Clear log">clear</a>':'';
		$('#'+spocklet+'_log').html(displaylogs.join('<br />')+footer);
		$e('logs_more').click(function(){ loglines+=10; showlog(); return false;});
		$e('logs_less').click(function(){ loglines-=10; showlog(); return false;});
		$e('logs_clear').click(function(){ logs=[]; showlog(); return false;});
	}
	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//'+zserver+'.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}

	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			var script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('https://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/"+spocklet);
	}
	catch(err) {}
	//end analytics
})()