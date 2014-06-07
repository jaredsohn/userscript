// ==UserScript==// ==UserScript==
// @name           Assassin-a-Nator v0.45 beta
// @namespace      Delete_tester
// @description    Bookmarklet loader for the Spockholm Mafia Tools
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==
// http://spocklet.com/bookmarklet/assassin-a-nator.js

refresh_timer = false;
javascript:(function(){
	//hack to kill the resizer calls
	iframeResizePipe = function() {};
	window.resizeIframe = function() {}

	//initial variables
	var version = 'Assassin-a-Nator v0.53 beta',
	userid = User.id,
	personid = User.id.substr(2),
	spocklet = 'aan',
	datastore = createStore(spocklet),
	bossenergy = parseInt($('#user_max_energy').html()*0.2).toFixed(0),
	tagname = spocklet+'_savecookie',
	start_time = 0,
	restarts = 0,
	restartlimit = 50000,
	energy_ratio = 0, stamina_ratio = 0, combined_ratio = 0,
	fail = 0;
	run = false,
	use_hospital = true,
	hospital_city = 1,
	fightlist = 'fightlist',
	prev_won = 0,
	prev_lost = 0,
	prev_cash = 0,
	list_target = 0,
	raven_found = false,
	last_fp_collect_time = 0;

	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var storage;
	try {
		if (localStorage.getItem) {
			storage = localStorage;
		}
		else if (window.localStorage.getItem) {
			storage = window.localStorage;
		}
	}
	catch(storagefail) {}

	var xw_city = $('#mw_city_wrapper').attr('class').substr(7),
	start_city = active_city = xw_city;

	//objects for misc stuff
	var looted = {},
	attackResult = {},
	itemdatabase = {},
	cash = {},
	stats = {
		"money_gained": 0,
		"money_banked": 0,
		"stamina_used": 0,
		"exp_gained": 0,
		"attacks_done": 0,
		"success": 0,
		"failed": 0,
		"attack": 0,
		"attack_start": 0,
		"attack_diff": function() { return parseInt(this.attack-this.attack_start); },
		"defense": 0,
		"defense_start": 0,
		"defense_diff": function() { return parseInt(this.defense-this.defense_start); },
		"lootcount": 0,
		"vc_start": 0,
		"vc_count": 0,
		"iced": 0,
		"already_iced": 0,
		"iced_start": 0,
		"killed": 0,
		"killed_start": 0,
		"blacklist": 0,
		"stolen": 0,
		"target_hp_average": 0,
		"target_hp_skipped": 0,
		"highest_damage_done": 0,
		"damage_done": 0,
		"damage": []
	},
	target = {
		"start_health_pct": 0,
		"prev_health_pct": 0,
		"damage_done": 0,
		"maxhealth": 0,
		"attacks": 0,
		"health": 0
	},
	sortloot = ['none','attack','defense','best','active','from','quantity'],
	sortlootindex = 3,
	targets = [],
	whitelist = [],
	blacklist = [],
	popups = [],
	backgrounds = {
		1: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/mafia_wars_928x56_03.jpg')",
		2: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/cuba_header_facebook_760x56_03.jpg')",
		3: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/moscow_header_bg_760x56_02.jpg')",
		4: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/mw_bangkok_header_760x56_03.gif')",
		5: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/vegas_header_760x56_01.gif')",
		6: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/italy_header_01.jpg')",
		7: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/brazil_header_01.png')",
		8: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/chicago_header_01.png')",
		9: "url('http://mwfb.static.zgncdn.com/mwfb/graphics/london_header_01.png')"
	},
	currencies = {
		"new_york": "$",
		"bangkok": "B$",
		"las_vegas": "V$",
		"italy": "L$",
		"brazil": "BRL$",
		"chicago": "Clams \u00a2",
		"london": "\u00a3"
	},
	badges = {
		"Ignore": {"id" : 1000},
		"User is vulnerable": {"id" : 100},
		"User not vulnerable": {"id" : 101},
		"Bronze 1": {"id" : 1},
		"Bronze 2": {"id" : 2},
		"Bronze 3": {"id" : 3},
		"Bronze 4": {"id" : 4},
		"Bronze 5": {"id" : 5},
		"Silver 1": {"id" : 6},
		"Silver 2": {"id" : 7},
		"Silver 3": {"id" : 8},
		"Silver 4": {"id" : 9},
		"Silver 5": {"id" : 10},
		"Gold 1": {"id" : 11},
		"Gold 2": {"id" : 12},
		"Gold 3": {"id" : 13},
		"Gold 4": {"id" : 14},
		"Gold 5": {"id" : 15},
		"Ruby 1": {"id" : 16},
		"Ruby 2": {"id" : 17},
		"Ruby 3": {"id" : 18},
		"Ruby 4": {"id" : 19},
		"Ruby 5": {"id" : 20},
		"Diamond 1": {"id" : 21},
		"Diamond 2": {"id" : 22},
		"Diamond 3": {"id" : 23},
		"Diamond 4": {"id" : 24},
		"Diamond 5": {"id" : 25}
	};
	var fblike = '<iframe src="http://www.facebook.com/plugins/like.php?app_id=200681556646472&amp;href=http%3A%2F%2Fwww.facebook.com%2Fmafiatools&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe>';

	if (typeof Item.Locations == 'object') {
		Locations = Item.Locations;
	}
	else {
		alert('Could not read Item.Locations from '+User.page+'. Using internal database instead.');
		Locations = {
			"1":{"name":"New York","loc_name":"New York","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=1&from=Job"},
			"2":{"name":"Cuba","loc_name":"Cuba","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=2&from=Job"},
			"3":{"name":"Moscow","loc_name":"Moscow","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=3&from=Job"},
			"4":{"name":"Bangkok","loc_name":"Bangkok","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=4&from=Job"},
			"5":{"name":"Las Vegas","loc_name":"Las Vegas","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=5&from=Job"},
			"6":{"name":"Italy","loc_name":"Italy","description":"","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=6&from=Job"},
			"7":{"name":"Challenge Mission","loc_name":"Challenge Mission","description":"","link":""},
			"8":{"name":"Gifting","loc_name":"Gifting","description":"","link":""},
			"9":{"name":"Marketplace","loc_name":"Marketplace","description":"","link":"remote\/html_server.php?xw_controller=marketplace&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"10":{"name":"Special Event","loc_name":"Special Event","description":"","link":""},
			"11":{"name":"Fighting","loc_name":"Fighting","description":"","link":"remote\/html_server.php?xw_controller=fight&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"12":{"name":"Robbing","loc_name":"Robbing","description":"","link":"remote\/html_server.php?xw_controller=robbing&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"13":{"name":"Operations","loc_name":"Operations","description":"","link":""},
			"14":{"name":"Property","loc_name":"Property","description":"","link":""},
			"15":{"name":"Declare War","loc_name":"Declare War","description":"","link":"remote\/html_server.php?xw_controller=war&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"16":{"name":"Mission","loc_name":"Mission","description":"","link":"remote\/html_server.php?xw_controller=index&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"17":{"name":"Zpoints\/RewardVille","loc_name":"Zpoints\/RewardVille","description":"","link":"remote\/html_server.php?xw_controller=index&xw_action=view&xw_city=7&tmp=&cb=&xw_person=&mwcom=1"},
			"18":{"name":"Brazil","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"},
			"19":{"name":"Secret Stash","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"},
			"20":{"name":"War","loc_name":"Brazil","description":"Some shitty description","link":"remote\/html_server.php?xw_controller=travel&xw_action=travel&xw_city=7&tmp=&cb=&xw_person=&mwcom=1&destination=7&from=Job"}
		};
	}

	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'" align="absmiddle">';
	}

	//setup images
	var staminaimg = imgurl('icon_stamina_16x16.png','13','13','Stamina'),
	mafia_attack = imgurl('icon_mafia_attack_22x16_01.gif','22','16','Mafia Attack Strength'),
	mafia_defense = imgurl('icon_mafia_defense_22x16_01.gif','22','16','Mafia Defense Strength'),
	iced_image = imgurl('iced.png','18','18','Iced!'),
	loot_image = imgurl('inventory/ItemCard/icons/Inventory-gift-icon.png','16','16','Loot'),
	boost_image = imgurl('icon_boost_14x14_01.gif','14','14','Boost used');
	sign = '';
	var clockimg = 'data:image/gif;base64,R0lGODlhDwAPAPcAAAQCBJyaBERCFNTSBLSyBCQiBGxuBMTCBOzuBDQyBBQSBKSmBFRSFJSWFLSyFCQiJBQSFOTiBCwqBHR2BMTCFPz6BFxaBDw6BBwaBJyeFLy6FNzeFFxaFAwODJyeBExOFLy6BCQmBGxqFMTGBPT2BBQWBKyuBJyaFLS2FBQWFCwuBHx+BMzKFPz+BDw+BOTiFFxeFACHPwA2kgB+fOSchebnPxMTkgAAfCA0COmHApE2AHx+AGByLAAg7JINE3wAAP8PAP8AAP8AAP8AAF0AuAAA6JIAE3wAAIUAkucAAIEAAHwAAAAmAADlABY6FgB3AKDNGAOrAAC6AADcAEAAaBUA5xcAlgAAALjYD2rnABYTAAAAAAAmogDl6QA6EwB3AH4uAgBnAABpAMBmAAAAQwCIOgA2XAB+RP8Ab//wa//9df9/bf8EZf/obv8TdP8AZQBaIACIdQA2bgB+ZADEIADnRQATaQAAbgAqcwCIdBY2ZQB+bHMAAOMAAAAAAAAAAPRyAOYgABMNFgAAAJ8A3Ovw6IEAE3wAAEsUw+MAMYEAknwAfOAB3wIAMVEAkgAAfLgACGoABgEAFgAAAHQAOAAAAAAArAAAADBzAObjABMAAAAAADQMAADoAAATAMAAAKi1GPsr6RODEwB8ACAAnekA/5EAgHwAfGAApQAA/5IAgHwAfP8AAP8AAP8AAP8AAF0AAAABAJIAAHwAAOoZAPQsAICDAHx8AAAwOADoABYTrAAAAAD0NQArBACDkgB8fLgAAGoAABYAAAAAAADR6AHp6AATEwAAAAAMdACh6ABPEwAAAPdaqPQA+4AAE3wAABw02OjpmhMTgwAAfLidqGpk/xaDgAB8fABw/wC9/wBP/wAA/wCcpQDI/wBPgAAAfLAAiCcBgRcAQgAAAAAwPADoAAATrAAAAAAAAAABAAAAAAAAAHi40QFk6RaDEwB8ABIBZAAAZAAAgwAAfLgAcycA4xcAAAB8AEM+ZDoEZACSgwB8fLguajlncRdpSABmACH5BAAAAAAALAAAAAAPAA8ABwiVAB90SNGBQQAKLA5k4DCwg0AACha0mEixhQkMADpAUDCioscBGDp0kOjRI4gUAiqULMmgwcqSDih4HJHAhYUJBCa+OODRAgYVJQCs0CmT4gEAA1pUQKCyRYQMFSUYWIniA0UPChCshNHBRAsECgKsHJECAoYIBC6sjBACQgcABbyWPCAh4wMIeEU42PBigwYRZSE8CAgAOw==';
	var ravenimg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAACqElEQVR4nEXBz2sUZxgH8O/zvO/MvLuzu9kfjcaQhGAUjcRG/FHqD1oChTb1UFooHhSkUKG9lN5aCgX/Ag8eeiiIB0E8eyy1p4IBUbFQU5vuRgomsttmdzOzk5mded+nx34+tNBoJk5ycmdK5trV1dJkjdnAuiweiva1CdLNdtru3XzW+TezVgqdRsl2kQLoD4YfX1wCe5AAeRq9TGzQqE/vS5uxQXT75+HjYq+uPU7hAAA46SvMvovDK+Amejs83jWe5KZljp3HqTc/Wz7k4GnNekRWKSxaXFo+tvnt9Y5KScaY9KvzB8+cOLLd+2f99/Wo/fxBvxtqBSeoaA2oo0Z/FZZm8L8J4PqnZwEA1FIBAOOZN/yAFeAp+cMjDitXJlrwS0GjAehyo3Ll4mkAF6rNL2en6z7KEIhwAcyTRpSjqsMivjFTfr8xbpbU+SYtHJiaA7pR8mjYjXNYZo9ZGeIPlf/U5g+/+2YjiH7sbOdUdAfZk1tf4+1Vs7Xx9Le2mqg2aq1+PPIJzHCOCMCTu/fu/LRmKK4l2fefnMWhZbSOfrT6TivEif2lmtbi8lyctoJRngN0Y71dBDg+U/lgZWVx4ZRauvxeE90En19Yuv/or7XI1ZlTB01ATHIQspbaxRRfnHvr4cu/sbNXZ/wyRFWw/urVlvMs7Y3hLLEKWY1cUVfch/iQ8mD0w6+dUTSeK2g2KMJQ9UbFn4krBM7ZQPvKU3CiEnFdolSEfG/ayYFA75+a7OzszFXciwGJqe1mcYWV0T5PlsOeFDGziMDnB91BLSF/LLefvfBz9fy12swKP0sg8CzIWSWemZ+a2hr0CTR2UlG0YYqtQZpBdsm9tk6xzsWNIQSpEZTxTJLEuXULxtsT5xEC4gziiDJBSiSsU2cJYMWBk/8AIOI+VV13zTwAAAAASUVORK5CYII=" />';

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php?Assassin-a-Nator" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png?Assassin-a-Nator" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 10px;" /></a>';
	var bankingrow = sign+' Bank above $<input id="'+spocklet+'_bankamount" name="'+tagname+'" type="text" value="10000" maxlength="9" style="width:65px" /> Bank during attacks: <input id="'+spocklet+'_bankatt" style="width:20px;" type="checkbox" name="'+tagname+'" checked />';

	var config_html =
	'<div id="'+spocklet+'_config" style="z-index:100; display:none; position: relative; top: -150px; left: -130px;">'+
	'	<div style="display: block; left: 177px;" class="pop_box" id=""><a class="pop_close" onclick="$(\'#'+spocklet+'_config\').hide(); $(\'#'+spocklet+'_config_toggle\').addClass(\'black\').removeClass(\'green\'); return false;" href="#"></a>'+
	'		<div style="padding: 15px 15px 0px 15px;">'+
	'			<p><form action="https://www.paypal.com/cgi-bin/webscr" method="post">'+
	'				<input type="hidden" name="cmd" value="_s-xclick">'+
	'				<input type="hidden" name="hosted_button_id" value="ZUFXFCZPYY6EE">'+
	'				<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" align="middle" border="0" name="submit" alt="Donate to Spockholm">'+
	'				<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" align="middle">  - Support our cause to save click monkeys.'+
	'			</form></p>'+
	'			<p><a href="#" class="sexy_button_new short white" id="'+spocklet+'_save"><span><span>Save</span></span></a></p>'+
	'			<p><span class="health">Heal city</span> <a href="#" id="'+spocklet+'_heal" class="sexy_button_new short green"><span><span>New York</span></span></a> when health is below <input id="'+spocklet+'_health" type="text" value="50" maxlength="5" style="width:40px;" name="'+tagname+'" /> and stamina above <input id="'+spocklet+'_stamina_heal" type="text" value="10" maxlength="5" style="width:40px;" name="'+tagname+'" /></p>'+
	'			<p>Stop before levelup <input id="'+spocklet+'_levelup" style="width:20px;" type="checkbox" name="'+tagname+'" checked /> when <input id="'+spocklet+'_exp_level" type="text" value="100" maxlength="6" style="width:40px;" name="'+tagname+'" /> exp is needed to level.</p>'+
	'			<p>Enable restarting: <input id="'+spocklet+'_restart" type="checkbox" name="'+tagname+'" /> &nbsp; <span id="'+spocklet+'_restart_row"><input id="'+spocklet+'_restart_time" name="'+tagname+'" type="text" value="5" maxlength="4" style="width:30px;" /> Minute(s) before restarting. <span class="more_in">(Minimum: 1)</span></span></p>'+
	'			<p>Disable New York bank failsafe: <input id="'+spocklet+'_disableny" type="checkbox" name="'+tagname+'" /> &nbsp; <br /></p>'+
	'			<p>Lock fight city: <input id="'+spocklet+'_citylock" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /></p>'+
	'			<p>Use boosts: <input id="'+spocklet+'_boosts" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /></p>'+
	'			<p>Use blacklist: <input id="'+spocklet+'_blacklist" style="width:20px;" type="checkbox" name="'+tagname+'" checked /><br /></p>'+
	'			<p>Red ice: <input id="'+spocklet+'_redice" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /></p>'+
	'			<p>Keep on ice: <input id="'+spocklet+'_keepice" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /></p>'+
	'			<p>Stop on battle: <input id="'+spocklet+'_stopbattle" style="width:20px;" type="checkbox" name="'+tagname+'" /><br /></p>'+
	'			<h2>Currently hard-coded settings:</h2>'+
	'			<div style="text-align: left">'+
	'			<p><a href="#" class="sexy_button_new short green"><span><span>Skip Iced</span></span></a> targets on fightlist. Dimmed targets on fightlist are ignored, always.</p>'+
	'			<p><strong>Show popups</strong>: When enabled, all popups exept the iced, killed and ice stolen will show. Bookmarklet will then pause.</p>'+
	'			</div>'+
	'			<div id="'+spocklet+'_desc">&nbsp;</div>'+
	'			<h2>Plugins:</h2>'+
	'			<div style="text-align: left">'+
	'			<p><strong>Click the plugin to start it.</p>'+
	'			<p><a href="#" class="sexy_button_new short green" id="'+spocklet+'_plugin_history"><span></span></a></p>'+
	'			<p><a href="#" class="sexy_button_new short green" id="'+spocklet+'_plugin_stats"><span></span></a></p>'+
	'			<p><a href="#" class="sexy_button_new short green" id="'+spocklet+'_plugin_update"><span></span></a></p>'+
	'			</div>'+
	'			<div id="'+spocklet+'_desc">&nbsp;</div>'+
	'		</div>'+
	'	</div>'+
	'</div>';

	var log_html =
	'<div id="'+spocklet+'_log_config" style="z-index:100; display:none; position: relative; top: 100px; left: -80px;">'+
	'	<div style="display: block; left: 177px;" class="pop_box" id=""><a class="pop_close" onclick="$(\'#'+spocklet+'_log_config\').hide();" href="#"></a>'+
	'		<div style="padding: 15px 15px 0px 15px;">'+
	/*'			<p><form action="https://www.paypal.com/cgi-bin/webscr" method="post">'+
	'				<input type="hidden" name="cmd" value="_s-xclick">'+
	'				<input type="hidden" name="hosted_button_id" value="ZUFXFCZPYY6EE">'+
	'				<input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif" align="middle" border="0" name="submit" alt="Donate to Spockholm">'+
	'				<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" align="middle">  - Support our cause to save click monkeys.'+
	'			</form></p>'+
	'			<h1>Configure Assassin-a-Nator log</h1>'+
	'			<table>'+*/
	'				<tr><td><input id="'+spocklet+'_log_exp" style="width:20px;" class="'+spocklet+'_save" type="checkbox" name="'+tagname+'" checked /> Show Experience</td></tr>'+
	'				<tr><td><input id="'+spocklet+'_log_cash" style="width:20px;" class="'+spocklet+'_save" type="checkbox" name="'+tagname+'" checked /> Show Cash</td></tr>'+
	'				<tr><td><input id="'+spocklet+'_log_dmg" style="width:20px;" class="'+spocklet+'_save" type="checkbox" name="'+tagname+'" checked /> Show Damage </td></tr>'+
	'				<tr><td><input id="'+spocklet+'_log_loot" style="width:20px;" class="'+spocklet+'_save" type="checkbox" name="'+tagname+'" checked /> Show loot</td></tr>'+
	'				<tr><td><input id="'+spocklet+'_log_hp" style="width:20px;" class="'+spocklet+'_save" type="checkbox" name="'+tagname+'" checked /> Show health </td></tr>'+
	'			</table>'+
	'		</div>'+
	'	</div>'+
	'</div>';
	
	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
//		help_html+
		config_html+
		log_html+
		'<table class="messages">'+
		'<tr id="'+spocklet+'_background"><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<table width="100%"><tr>'+
				'<td style="text-align:left; width: 200px;">'+
					'<a href="http://www.spockholm.com/mafia/donate.php?Assassin-a-Nator" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
					'&nbsp;<a href="#" id="'+spocklet+'_help" class="sexy_button_new short" title="Read FAQ"><span><span><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-help.gif"> FAQ</span></span></a>'+
				'</td>'+
				'<td style="margin-left:auto; margin-right:auto; text-align:center;"><span class="good">'+version+'</span></td>'+
				'<td style="text-align:right; width: 250px;">'+
					'Target <input id="my_target" name="'+tagname+'" type="text" value="10" maxlength="4" />'+
					'Timer <input id="'+spocklet+'_timer" name="'+tagname+'" type="text" value="0" maxlength="4" />'+
					'<a href="#" id="'+spocklet+'_play" class="sexy_button_new short green" title="Start Assassin-a-Nator"><span><span>Start</span></span></a>'+
					'<a href="#" id="'+spocklet+'_pause" class="sexy_button_new short orange" title="Pause Assassin-a-Nator"><span><span>Pause</span></span></a>'+
					'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close Assassin-a-Nator"><span><span>Close</span></span></a>'+
				'</td>'+
			'</tr></table>'+
		'</td></tr>'+
		'<tr><td colspan="3">'+
			'<div style="float:left;"><a href="#" id="'+spocklet+'_config_toggle" class="sexy_button_new short black" title="Config"><span><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;">Config</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_healthpack" class="sexy_button_new short black sexy_power_pack_new" title="Click to use a Powerpack" onclick="PowerPackModule.use();return false;"><span><span>Powerpack</span></span></a></div>'+
			'<div style="float:right;"><a href="#" class="sexy_button_new short black sexy_power_pack_new" onclick="use_pack(); return false;" title="Click to use a Healthpack"><span><span>Healthpack</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_mode" class="sexy_button_new short black" title="Click to change attack mode"><span><span>Fightlist Mode</span></span></a></div>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td>Stamina used:</td><td><span id="'+spocklet+'_attacks_done">0</span> of <input id="'+spocklet+'_attacks_todo" type="text" value="0" maxlength="4" />'+bankingrow+'</td>'+
			'<td align="right" style="text-align:right;">Delay <input id="'+spocklet+'_delay1" name="'+tagname+'" type="text" value="1" maxlength="4" /> - <input id="'+spocklet+'_delay2" name="'+tagname+'" type="text" value="3" maxlength="4" />sec</td></tr>'+
		'<tr>'+
			'<td valign="top" style="width:135px;">Stats:</td>'+
			'<td valign="top" style="vertical-align:middle;">'+
				'Experience: <span id="'+spocklet+'_exp_gained" class="good">0</span> <span id="'+spocklet+'_exp_ratio" class="more_in">0</span>&nbsp;'+
				'<img src="http://mwfb.static.zgncdn.com/mwfb/graphics/victory_icon.gif" style="vertical-align: middle;" height="18" width="18"><span id="'+spocklet+'_vcoins">?</span><br />'+
				'Money: <span id="'+spocklet+'_money_gained">0</span>&nbsp;'+
				'<span class="more_in">(Banked: <span id="'+spocklet+'_money_banked">0</span>)</span><br />'+
				'Won: <span id="'+spocklet+'_success" class="good">0</span>&nbsp;'+
				'Lost: <span id="'+spocklet+'_failed" class="bad">0</span>&nbsp;'+
				'Highest Damage: <span id="'+spocklet+'_highest_damage_done" title="Highest Damage Dealt to Opponent" class="good">0</span>&nbsp;<br />'+
				'Iced: <span id="'+spocklet+'_iced_start">0</span> (+<span id="'+spocklet+'_iced" style="color: #609AD1; font-weight:bold;">0</span>) &nbsp;'+
				'Killed: <span id="'+spocklet+'_killed" style="color: #990000; font-weight:bold;">0</span> &nbsp;'+
				'Stop at: <input id="'+spocklet+'_stopices" name="'+tagname+'" type="text" value="" maxlength="4" /> &nbsp;'+
				'<span id="'+spocklet+'_ice_season" style="color:#99CCFF;" title="Ice Season progress"></span> &nbsp;'+
				'<span id="'+spocklet+'_ice_progress" style="color: #7db651;" title="Family Progression Ice"></span> '+
				'<span title="Auto collect ices family progression">AC: <input id="'+spocklet+'_collectices" name="'+tagname+'" type="checkbox" /></span>&nbsp;'+
				'<span id="'+spocklet+'_battlescore" style="color: white;" title="Family Battle Score"></span> &nbsp;'+
			'</td>'+
			'<td align="right" style="text-align:right;">'+
				'Show Popups:<input id="'+spocklet+'_popups" title="Show game popups" style="width:20px;" type="checkbox" name="'+tagname+'" /><br />'+
				'Power Attack:<input id="'+spocklet+'_power" title="Use power attack" style="width:20px;" type="checkbox" name="'+tagname+'" /><br />'+
				'Revenge:<input id="'+spocklet+'_revenge" title="Attack ice stealers" style="width:20px;" type="checkbox" name="'+tagname+'" /><br />'+
				'Burst: <input id="'+spocklet+'_burst" title="Zynga multi-click, 1-7 valid. In case of revolvers, lower the value" type="text" value="7" maxlength="1" name="'+tagname+'" />'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_strength_row" style="display:none;"><td>Strength:</td><td colspan="2"><span id="'+spocklet+'_strength_stats"></span></td></tr>'+
		'<tr id="'+spocklet+'_pause_row" style="display:none;">'+
			'<td>Pause options:</td>'+
			'<td colspan="2">'+
				'<input id="'+spocklet+'_energy_ratio" type="text" value="0" maxlength="4" name="'+tagname+'" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp Ratio">&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_stamina_ratio" type="text" value="0" maxlength="4" name="'+tagname+'" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina Ratio">&nbsp;&nbsp;'+
				'<input id="'+spocklet+'_energy_remain" type="text" value="0" maxlength="6" style="width:50px;" name="'+tagname+'" /> energy remaining&nbsp;<span class="more_in">(<a href="#" class="more_in" onclick="$(\'#'+spocklet+'_energy_remain\').val(\''+bossenergy+'\');return false;">'+bossenergy+' for boss fight</a>)</span>'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_runtime_row" style="display:none;"><td>Runtime:</td><td colspan="2"><span id="'+spocklet+'_runtime"></span></td></tr>'+
		'<tr><td>Status:</td><td colspan="2" id="'+spocklet+'_status"></td></tr>'+
		'<tr>'+
			'<td><a href="#" id="'+spocklet+'_filters_toggle" class="sexy_button_new short black" title="Click to show/hide filters"><span><span>Filters</span></span></a></td>'+
			'<td colspan="2">Level range: <input id="'+spocklet+'_level_low" type="text" value="1" maxlength="5" style="width:40px;" name="'+tagname+'" />-<input id="'+spocklet+'_level_high" type="text" value="25000" maxlength="6" style="width:45px;" name="'+tagname+'" /> &nbsp; Mafia Size: <input id="'+spocklet+'_mafia_low" type="text" value="1" maxlength="5" name="'+tagname+'" />-<input id="'+spocklet+'_mafia_high" type="text" value="501" maxlength="5" name="'+tagname+'" /> &nbsp;<span id="'+spocklet+'_filter_error" class="bad"></span></td></tr>'+
			'<tr id="'+spocklet+'_filters" style="display:none;"><td></td><td colspan="2">'+
				'<table width="100%">'+
				'<tr>'+
					'<td width="160" style="border-top:1px dotted #999;">Cash from same city:</td>'+
					'<td style="border-top:1px dotted #999;"><input id="'+spocklet+'_samecash" name="'+tagname+'" type="checkbox" /> &nbsp; Minimum cash: <input id="'+spocklet+'_mincash" name="'+tagname+'" type="text" value="0" maxlength="6" style="width:45px;"  /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Max attacks per target:</td>'+
					'<td><input id="'+spocklet+'_maxattacks" name="'+tagname+'" type="text" value="20" maxlength="5" style="width:40px;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Target health % limit:</td>'+
					'<td><input id="'+spocklet+'_maxhealth_pct" name="'+tagname+'" type="text" value="0" maxlength="5" style="width:40px;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Target health limit:</td>'+
					'<td><input id="'+spocklet+'_maxhealth" name="'+tagname+'" type="text" value="0" maxlength="5" style="width:40px;" /></td>'+
				'</tr>'+
				'<tr>'+
					'<td style="border-top:1px dotted #999;">Skip rank:</td>'+
					'<td><select id="'+spocklet+'_badge" name="'+tagname+'"></select><span class="more_in">(Anyone with this rank will be skipped)</span></td>'+
				'</tr>'+
				'<tr>'+
					'<td valign="top" style="border-top:1px dotted #999;">Character name filter:<br /><a href="#" onclick="if(confirm(\'Do you really want to reset name filter?\')) { $(\'#'+spocklet+'_namefilter\').val(\'\');} return false;">Clear</a></td>'+
					'<td><textarea id="'+spocklet+'_namefilter" name="'+tagname+'" rows="3" cols="40"></textarea><br />Separate characters with space or new line.</td>'+
				'</tr>'+
				'<tr>'+
					'<td valign="top" style="border-top:1px dotted #999;">Family ID filter:<br /><a href="#" onclick="if(confirm(\'Do you really want to reset family filter?\')) { $(\'#'+spocklet+'_familyfilter\').val(\'\'); } return false;">Clear</a><br /><a href="#" id="'+spocklet+'_addfamily">Add link</a></td>'+
					'<td><textarea id="'+spocklet+'_familyfilter" name="'+tagname+'" rows="4" cols="50"></textarea><br />Numbers only, separate with space or new line.</td>'+
				'</tr>'+
				'</table>'+
			'</td>'+
		'</tr>'+
		'<tr id="'+spocklet+'_targetlist" style="display:none;"><td valign="top">Target List:<br /><a href="#" id="'+spocklet+'_addtarget">Add link</a></td><td colspan="2" valign="top"><textarea id="'+spocklet+'_targets" name="'+tagname+'" rows="5" cols="50"></textarea><br />Facebook ID (number) or MWid (p|number). Separate with space or new line.</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_popup_toggle" class="sexy_button_new short green" title="Hide/Show popups"><span><span>Popups</span></span></a></td>'+
			'<td colspan="2" valign="top"><span id="'+spocklet+'_popup"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_loot_toggle" class="sexy_button_new short green" title="Click to toggle loot log and update stats"><span><span>Loot</span></span></a></td>'+
			'<td colspan="2" valign="top"><span id="'+spocklet+'_loot_stats"><span class="more_in">No loot found yet.</span></span> &nbsp; Sort by <a href="#" id="'+spocklet+'_sortloot">'+sortloot[sortlootindex]+'</a><br /><span id="'+spocklet+'_loot"></span></td>'+
		'</tr>'+
		'<tr>'+
			'<td valign="top"><a href="#" id="'+spocklet+'_log_toggle" class="sexy_button_new short green" title="Hide/Show log"><span><span>Log</span></span></a>'+
				'<a href="#" class="'+spocklet+'_toggle" id="'+spocklet+'_log_config" title="Configure log"><span style="background: url(\'http://mwfb.static.zgncdn.com/mwfb/graphics/v3/icon_hammer_wrench.png\') no-repeat scroll 4px 50% transparent; padding-left: 30px;"></span></a><br />'+
				'&nbsp;Lines: <input id="'+spocklet+'_logsize" name="'+tagname+'" type="text" value="10" maxlength="4" /></td>'+
			'<td valign="top" colspan="2" id="'+spocklet+'_log"></td>'+
		'</tr>'+
		'</table>'+
	'</div>';

	function timestamp(seconds) {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		if (seconds) {
			var CurS = now.getSeconds();
			CurS = (CurS<10?'0'+CurS:CurS);
			return '<span class="more_in">['+CurH+':'+CurM+':'+CurS+']</span> ';
		}
		else {
			return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
		}
	}

	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}

	function commas(s) {
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}

	function camelize(str) {
		return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
		function cnvrt() {
			return arguments[0].toUpperCase();
		}
	}
	function profile_link() {
		if (!isNaN(targets[0].family_id) && targets[0].family_id > 1) {
			return '<a href="http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22'+btoa(targets[0].family_id)+'%22%7D" target="_blank" title="Family id '+targets[0].family_id+'"><span style="color:red;">'+targets[0].family+'</span></a> <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].name+'</a>';
		}
		else {
			return '<a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].name+'</a>';
		}
	}

	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}

	function createStore(name) {
		if (!window.Spocklet) {
			window.Spocklet={ }
		}
		if (!window.Spocklet[name]) {
			window.Spocklet[name]={};
		}
		window.Spocklet[name].handler={};
		return window.Spocklet[name];
	}
	function msg(s) {
		$('#'+spocklet+'_status').html(s);
	}

	//make timer global so we can remove it quickly
	var timer;
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0)? delay = 1000 : delay = 100;
		if (typeof message == 'function') {
			resume_func = message;
			message = null;
		}
		if (message) {
			message = message;
		}
		else {
			message='Pausing';
		}
		var minutes = (parseInt(seconds/60) == 1) ? 0 : parseInt(seconds/60);
		if (minutes > 0) {
			msg(message+' <span id="minutes">'+minutes+' minutes</span> <span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		else {
			msg(message+' <span id="minutes"></span><span id="seconds">'+(seconds%60)+' second'+(seconds==1?'':'s')+'</span>...');
		}
		timer = setInterval(function(){
			if (seconds%60 == 0) {
				minutes--;
			}
			seconds--;
			if (document.getElementById('minutes')) {
				document.getElementById('minutes').innerHTML = (minutes > 0) ? minutes+' minute'+(minutes==1?'':'s') : '';
			}
			if (document.getElementById('seconds')) {
				document.getElementById('seconds').innerHTML = (seconds % 60)+' second'+(seconds==1 ? '' : 's');
			}
			else {
				clearInterval(timer);
			}
			if (seconds <= 0) {
				clearInterval(timer);
				if (typeof resume_func == 'function') {
					resume_func();
				}
			}
		},delay);
	}

	function create_div() {
		//setup the spockdiv
		$('#'+spocklet+'_main').remove();
		$('#inner_page').before(spocklet_html);
		for (x in badges) {
			$('#'+spocklet+'_badge').append(new Option(x, badges[x].id, false, false));
		}
	}

	function create_user_data(text) {
		var user_fields = [];
		var user_info = [];
		user_f_exp = /user_fields\['(\w+)'\].*?"(.*?)"/g;
		user_i_exp = /user_info\['(\w+)'\].*?"(.*?)"/g;
		while ((user_f = user_f_exp.exec(text)) != null) {
			user_fields[user_f[1]] = (Util.is_integer(user_f[2]) ? parseInt(user_f[2]) : user_f[2]);
		}
		while ((user_i = user_i_exp.exec(text)) != null) {
			user_info[user_i[1]] = (Util.is_integer(user_i[2]) ? parseInt(user_i[2]) : user_i[2]);
		}
		return [user_fields,user_info];
	}

	function update_game_ui(object) {
		if (Util.isset(object.user_fields)) {
			stats_update(object.user_fields);
			user_fields_update(object.user_fields);
			user_info_update(object.user_fields, object.user_info);
			if (Util.isset(object.user_fields.current_city_id)) {
				active_city = object.user_fields.current_city_id;
				if (object.user_fields.current_city_id == 1 && !$('#'+spocklet+'_disableny').is(':checked')) {
					//disable new york banking
					if ($('#'+spocklet+'_bankamount').val() > 0) {
						$('#'+spocklet+'_bankamount').val('0');
						log('<span class="bad">New York bank failsafe enabled!</span>');
					}
				}
				if (object.user_fields.current_city_id != xw_city) {
					set_background(object.user_fields.current_city_id);
					xw_city = object.user_fields.current_city_id;
				}
			}
		}
		if (Util.isset(object.questData)) {
			MW.QuestBar.update(object.questData);
		}
		if (Util.isset(object.fightbar)) {
			if (stats.attack_start == 0) {
				stats.attack_start = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
			}
			if (stats.defense_start == 0) {
				stats.defense_start = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
			}
			stats.attack = parseInt(object.fightbar.group_atk.replace(/[^0-9]/g, ''));
			stats.defense = parseInt(object.fightbar.group_def.replace(/[^0-9]/g, ''));
		}
		if (Util.isset(object.questData) && Util.isset(object.questData.clanXp) && Util.isset(object.questData.clanXp.exp_fight)) {
			var family_ice_progress=object.questData.clanXp.exp_fight.xp + '/' + object.questData.clanXp.exp_fight.xp_max;
			$('#'+spocklet+'_ice_progress').html('['+family_ice_progress+']');
			if ((parseInt(object.questData.clanXp.exp_fight.xp)>=parseInt(object.questData.clanXp.exp_fight.xp_max)) && (parseInt(object.questData.clanXp.exp_fight.xp)>0)) {
				if($('#'+spocklet+'_collectices').is(':checked')) {
					collect_family_progression_ices();
				}
			}
		}
	}

	function stats_update(o) {
		var d, d2, d3;
		energy_ratio = o.exp_to_next_level/o.user_energy;
		stamina_ratio = o.exp_to_next_level/o.user_stamina;
		combined_ratio = o.exp_to_next_level/(o.user_energy+o.user_stamina);
		Math.abs(energy_ratio) < 10 ? (d=2) : (d=0);
		Math.abs(stamina_ratio) < 10 ? (d2=2) :(d2=0);
		Math.abs(combined_ratio) < 10 ? (d3=2) :(d3=0);
		if (energy_ratio=='Infinity') { energy_ratio=0; d=0; }
		if (stamina_ratio=='Infinity') { stamina_ratio=0; d2=0; }
		if (combined_ratio=='Infinity') { combined_ratio=0; d3=0; }
		document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Exp Need: <span id="exp_to_next_level" class="energy_highlight">'+o.exp_to_next_level+'</span><br>(<span class="energy_highlight">'+(energy_ratio).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(stamina_ratio).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(combined_ratio).toFixed(d3)+'</span>';
	}

	function banker(cash,city) {
		if (cash < 10) {
			log(timestamp()+'<span class="bad">You need to deposit at least $10!</span>');
			$('#'+spocklet+'_bankamount').val('100');
			$('#'+spocklet+'_bankamount').trigger('keyup');
			repeat_attack();
			return;
		}
		var cb = userid+unix_timestamp();
		User.clicks++;
		var params = {
			'ajax': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'liteload': 1,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'amount': cash,
			'xw_city': xw_city,
			'xw_person': personid,
			'clicks': User.clicks
		};
		if (city == 5) {
			var url = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6&city=5';
		}
		else {
			var url = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=bank&xw_action=deposit'+($('#'+spocklet+'_disableny').is(':checked')?'_all':'');
		}
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			success: function (bankresponse) {
				var bankobject = jQuery.parseJSON(bankresponse.replace(/^(\s\d\s+)/,''));
				var message = '';
				try {
					update_game_ui(bankobject);
				}
				catch (banker_user_fields) {
				}
				if (params.xw_city == 5) {
					bankobject = jQuery.parseJSON(bankobject.data);
				}
				if (Util.isset(bankobject.deposit_message)) {
					if (/bank can only hold/.test(bankobject.deposit_message)) {
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					if (/[A-Z]+?\$([\d,]+)/.test(bankobject.deposit_message)) {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.deposit_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.deposit_message;
					log(message);
				}
				if (Util.isset(bankobject.success_message)) {
					if (/You cannot deposit any more/.test(bankobject.success_message)) {
						$('#'+spocklet+'_bankamount').val('0');
						$('#'+spocklet+'_bankamount').trigger('keyup');
					}
					if (/[A-Z]+?\$([\d,]+)/.test(bankobject.success_message)) {
						var banked = /[A-Z]+?\$([\d,]+)/.exec(bankobject.success_message)[1];
						stats.money_banked += parseInt(banked.replace(/[^0-9]/g, ''));
					}
					var message = bankobject.success_message;
					log(message);
				}
				repeat_attack();
			},
			error: function() { repeat_attack(); }
		});
	}

	function age(diff) {
		if (diff == 0) {
			return 0;
		}
		diff*=1000;
		var hours = Math.floor(diff / (60 * 60 * 1000));
		diff -= hours * (60 * 60 * 1000);
		var minutes = Math.floor(diff / (60*1000));
		diff -= minutes * 60 * 1000;
		var seconds = Math.floor(diff / 1000);
		return '<span class="more_in">'+hours+' h '+minutes+' min '+seconds+' sec</span>';
	}
	
	function check_badge(badge) {
		if (badge.id == 1000) {
			return true;
		}
		else if (badge.id < 100) {
			return (badges[targets[0].badge].id >= $('#'+spocklet+'_badge').val());
		}
		else {
			return (badges[targets[0].badge].id == $('#'+spocklet+'_badge').val());
		}
	}

	// From Vern's toolkit.js, http://vern.com/mwtools/
	var logs = [];
	var extralog = [];
	function logtrunc(message) {
		var limit = parseInt($('#'+spocklet+'_logsize').val());
		var keep = /bank can only hold|You cannot deposit any more|Turkey stolen/;
		logs.unshift(message);
		if (limit > 0) {
			if (logs.length>limit) {
				message=logs.pop();
				if ((keep.test) && (keep.test(message))) {
					extralog.unshift(message);
				}
			}
		}
		if ($('#'+spocklet+'_log_toggle').hasClass('green')) {
			$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));
		}
	}
	function log(s) {
		logtrunc(timestamp()+s);
		for (x in stats) {
			if ($('#'+spocklet+'_'+x)) {
				if (x == 'success' || x == 'failed') {
					$('#'+spocklet+'_'+x).html(stats[x]+' <span class="more_in">('+parseFloat(stats[x]/stats.attacks_done*100).toFixed(1)+'%)</span>');
				}
				else if (/money_gained/.test(x)) {
					var money = '';
					for (y in cash) {
						money += '<span style="color:'+(cash[y] > 0 ? '#00C800' : 'red')+';">'+(typeof currencies[y] != 'undefined'?currencies[y]:'$')+commas(cash[y])+'</span> ';
					}
					$('#'+spocklet+'_'+x).html(money);
				}
				else if (/money_banked/.test(x)) {
					$('#'+spocklet+'_'+x).html('$'+commas(stats[x]));
				}
				else if (/iced_start/.test(x)) {
					$('#'+spocklet+'_'+x).html(commas(stats[x]));
				}
				else {
					$('#'+spocklet+'_'+x).html(stats[x]);
				}
			}
		}
		$('#'+spocklet+'_exp_ratio').html('('+(stats.exp_gained/stats.stamina_used).toFixed(2)+' exp/stamina)');

		$('#'+spocklet+'_strength_stats').html('');
		$('#'+spocklet+'_strength_row').show();
		$('#'+spocklet+'_strength_stats').append(mafia_attack+' '+commas(stats.attack)+' (<span class="'+(stats.attack_diff() >= 0?'good':'bad')+'">'+commas(stats.attack-stats.attack_start)+'</span>) ');
		$('#'+spocklet+'_strength_stats').append(mafia_defense+' '+commas(stats.defense)+' (<span class="'+(stats.defense_diff() >= 0?'good':'bad')+'">'+commas(stats.defense-stats.defense_start)+'</span>) ');
		$('#'+spocklet+'_loot_stats').html('Loot stats: '+stats.lootcount+'/'+stats.attacks_done+' <span class="more_in">('+parseFloat(stats.lootcount/stats.attacks_done*100).toFixed(1)+'%)</span>');

		var now = unix_timestamp();
		if (start_time == 0) {
			start_time = parseInt(new Date().getTime().toString().substring(0, 10));
		}
		var timediff = parseInt(now-start_time);
		$('#'+spocklet+'_runtime').html(age(timediff)+' &nbsp; '+parseFloat(stats.attacks_done/timediff*60).toFixed(2)+'/minute');

		try {
			for(var i in datastore.handler) {
				if ($.isFunction(datastore.handler[i])){

					var f=datastore.handler[i];
					f(stats, looted);
				}
			}
		}
		catch(whatever) {}
	}
	function add_whitelist() {
		if (!find_element(targets[0].pid,'pid',whitelist)) {
			whitelist.push(targets[0]);
		}
	}
	function add_blacklist() {
		if (!find_element(targets[0].pid,'pid',blacklist)) {
			blacklist.push(targets[0]);
		}
	}
	function compare(a,b) {
		if (a==b) { return 0; }
		if (a>b) { return -1; }
		return 1;
	}
	function max(a,b) {
		return (a>b?a:b);
	}

	function sort_loot(){
		var list = [];
		for (var x in looted) {
				list.push(x);
		}
		list.sort(function(a,b){
			switch(sortloot[sortlootindex]) {
				case 'attack':
				case 'active':
				case 'quantity':
				case 'defense': return compare(looted[a][sortloot[sortlootindex]],looted[b][sortloot[sortlootindex]]); break;
				case 'from': return compare(looted[a].location,looted[b].location); break;
				case 'best': return compare(max(looted[a].attack,looted[a].defense),max(looted[b].attack,looted[b].defense)); break;
				default: return 0;
			}
		});
		return list;
	}
	function update_loot_log() {
		var lootoutput = '';
		var old = {};
		var sorted = sort_loot();
		for (var i = 0; i < sorted.length; i++) {
			var x = sorted[i];
			// edit
			var attack = '', defense = '';
			if (looted[x].attack > 0) {
				attack = '['+looted[x].attack+'A';
			/*}
			if (looted[x].defense > 0) {*/
				defense = looted[x].defense+'D]';
			}
			if (sortloot[sortlootindex]=="from") {
				if(old.location!=looted[x].location) {
					lootoutput+='<tr><td colspan="6"><u><b>'+Locations[looted[x].location].name+'</b></u></td></tr>';
				}
			}
			var image = looted[x].img?'<img width="16" height="16" title="'+x+'" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+looted[x].img+'" />':'';
			var have = looted[x].quantity;
			if (typeof itemdatabase[x] == 'object') {
				have = (itemdatabase[x].quantity>0?' <span class="more_in">Have: '+(itemdatabase[x].quantity+looted[x].quantity)+'</span>':'');
			}
			lootoutput += '<tr><td><span class="good">&times;'+looted[x].quantity+'</span> '+image+'</td><td><span style="'+(looted[x].active?"color:yellow;":"")+'">'+looted[x].name+'</td><td>'+attack+'</td><td>'+defense+'</span></td><td><span class="more_in">('+parseFloat(looted[x].quantity/stats.lootcount*100).toFixed(1)+'%)</span></td><td>'+have+'</td></tr>';
			old = looted[x];
		}
		$('#'+spocklet+'_loot_stats').html('Loot stats: '+stats.lootcount+'/'+stats.attacks_done+' <span class="more_in">('+parseFloat(stats.lootcount/stats.attacks_done*100).toFixed(1)+'%)</span>');
		$('#'+spocklet+'_loot').html('<table>'+lootoutput+'</table>');
	}

	function customSort(property) {
		return function (b, a) {
			return parseInt(a[property]) - parseInt(b[property]);
		};
	}

	function add_loot(itemid, name, count) {
		stats.lootcount += count;
		var attack = 0;
		var defense = 0;
		if (itemid) {
			if(typeof looted[itemid] == 'object') {
				looted[itemid].quantity += count;
			}
			else {
				if (typeof itemdatabase[itemid] == 'object') {
					it = itemdatabase[itemid];
					var active = (it.equipped_offense+it.equipped_defense>0) && ((it.equipped_offense==it.quantity) || (it.equipped_defense==it.quantity));
					looted[itemid] = {"id": itemid, "name": it.name, "quantity": count, "attack": it.attack, "defense": it.defense, "active":active, "img":it.imagesrc,"location":it.location };
				}
				else {
					looted[itemid] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
				}
			}
		}
		else {
			if (typeof looted[name] == 'object') {
				looted[name].quantity += count;
			}
			else {
				looted[name] = {"id": itemid, "name": name, "quantity": count, "attack": attack, "defense": defense};
			}
		}
		if ($('#'+spocklet+'_loot_toggle').hasClass('green')) {
			update_loot_log();
		}
	}


	function open_popup(id) {
		if (/MW.Feed\(feed\)/.test(popups[id])) {
			eval(popups[id]);
		}
		else {
			$('#popup_fodder').prepend('<div id="'+id+'"></div>');
			$('#'+id).append(popups[id]);
		}
	}
	function list_popups() {
		for (x in popups) {
			console.log(x+' '+popups[x]);
		}
	}
	function add_popup(id,type) {
		if (/Ice|Kill/i.test(type)) {}
		else {
			$('#'+spocklet+'_popup').prepend('<span>'+timestamp()+type+': <a href="#" name="popup" popupid="'+id+'">'+id+'</a></span><br />');
		}
		$('#'+spocklet+'_popup').find('a[name="popup"]').each(function() {
			if ($(this).attr('popupid') == id) {
				$(this).bind('click',function() {
					open_popup($(this).attr('popupid'));
					$(this).html('Opened');
					return false;
				})
			}
		});
	}

	function repeat_attack(instant) {
		var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
		var bankamount = parseInt($('#'+spocklet+'_bankamount').val());
		var attacks_done = parseInt($('#'+spocklet+'_attacks_done').html());
		var attacks_todo = parseInt($('#'+spocklet+'_attacks_todo').val());
		var energy_ratio_val = parseFloat($('#'+spocklet+'_energy_ratio').val());
		var stamina_ratio_val = parseFloat($('#'+spocklet+'_stamina_ratio').val());
		var exp_level = parseInt($('#exp_to_next_level').html());
		var exp_val = parseInt($('#'+spocklet+'_exp_level').val());
		var energy_val = parseInt($('#'+spocklet+'_energy_remain').val());
		var user_energy = parseInt($('#user_energy').html());
		var user_stamina = parseInt($('#user_stamina').html());
		var user_health = parseInt($('#user_health').html());
		var user_health_limit = parseInt($('#'+spocklet+'_health').val());
		var stamina_heal = parseInt($('#'+spocklet+'_stamina_heal').val());
		var stop_ices = parseInt($('#'+spocklet+'_stopices').val());

		if (run) {
			if ((active_city != start_city) && $('#'+spocklet+'_citylock').is(':checked') && (user_health > user_health_limit)) {
				set_background(active_city);
				log('City change detected! Travelling back to start city.');
				travel(start_city,active_city);
				return;
			}
			// edit
			else if ((User.cash > bankamount) && (bankamount > 0)) {
				if (target.attacks == 0){pausing(wait,'Banking money in ',function(){ banker(User.cash,xw_city); });}
				else if ($('#'+spocklet+'_bankatt').is(':checked')){pausing(wait,'Banking money in ',function(){ banker(User.cash,xw_city); });}
			}
			else if (user_health < user_health_limit){
				if(use_hospital){
					if(user_stamina > 5){visit_hospital(); return;}
					else{
						msg('<span class="bad">not enough stamina, stopping...</span>');
						log('<span class="bad">not enough stamina, stopping...</span>');
						do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=', 1, 1, 0, 0);
						controls_display(true,false,true);
						run = false;
						return;
					}				
				}
			}
			else if ((attacks_done < attacks_todo) || (attacks_todo == 0)) {
				controls_display(false,true,true);
				if (instant) {
					do_attack();
				}
				else {
					pausing(wait,'Attacking again in ',function(){ do_attack(); });
				}
				return;
			}
			else {
				msg('Taking a break after '+attacks_todo+' attacks.');
				controls_display(true,false,true);
				run = false;
			}
		}
		else {
			msg('<span class="good">Pausing...</span>');
			controls_display(true,false,true);
		}
	}

	function do_attack() {
		if (targets.length == 0 && fightlist == 'fightlist') {
			log('Ran out of targets, reloading fight list...');
			targets = [];
			pausing(5,'Ran out of targets, reloading fight list in',function(){ load_fightlist(); });
			return;
		}
		if (targets.length == 0 && fightlist == 'targetlist') {
			targets = [];
			load_targets();
			return;
		}
		if (targets.length == 0 && fightlist == 'rivals') {
			targets = [];
			pausing(5,'Ran out of targets, reloading rivals in',function(){ load_rivals(); });
			return;
		}
		if (targets.length == 0 && fightlist == 'battle') {
			targets = [];
			pausing(5,'Ran out of targets, reloading Family Battle targets in',function(){ load_battle(); });
			return;
		}
		if (run) {
			//filter actions go here
			var maxhealth = parseInt($('#'+spocklet+'_maxhealth').val());
			var maxhealth_pct = parseInt($('#'+spocklet+'_maxhealth_pct').val());
			var maxattacks = parseInt($('#'+spocklet+'_maxattacks').val());

			if (find_element(targets[0].pid,'pid',blacklist) && $('#'+spocklet+'_blacklist').is(':checked')) {
				log('Skipping <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa('p|'+targets[0].pid)+'%22%7D">'+targets[0].family+' '+targets[0].name+'</a> because of blacklist. <span class="more_in">(Stronger opponent)</span>');
				stats.blacklist++;
				skip_target();
				repeat_attack(true);
			}
			/*else if (Util.isset(targets[0].badge) && Util.isset(badges[targets[0].badge]) && check_badge(badges[targets[0].badge])) {
				log('Skipping '+profile_link()+' because of badge rank. '+targets[0].badge+' > '+$('#'+spocklet+'_badge option:selected').text());
				skip_target();
				repeat_attack();
			}*/
			else {
				msg('<a href="#" id="skip_the_target">(Skip)</a> Attacking '+profile_link()+' <span class="more_in">(Attack #'+target.attacks+')</span>...');
				$('#skip_the_target').bind('click',function() {
					log('Manually skipped '+profile_link());
					skip_target();
					return false;
				});
				request(targets[0].button,function(s){ parse_attack(s); },function(s){ pausing(10,'Page not loaded properly, trying again in ',function(){ repeat_attack(); }); });
			}
		}
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		if (url.indexOf('click_amt=1') != -1 && (target.attacks > 0)) {
			url = url.replace(/click_amt=1/,'click_amt='+$('#'+spocklet+'_burst').val());
		}
		if (/use_boost/.test(url) && $('#'+spocklet+'_boosts').is(':checked')) {
			url = url.replace(/use_boost=0/,'use_boost=1');
		}
		if (/use_boost/.test(url) && !$('#'+spocklet+'_boosts').is(':checked')) {
			url = url.replace(/use_boost=1/,'use_boost=0');
		}
		if (typeof errorhandler != 'function') {
			errorhandler = function() { repeat_attack(); };
		}
		User.clicks++;
		var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'xw_client_id': 8,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_city': xw_city,
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

	function parse_attack(response) {
		var fightResult = false;
		var raven = '';
		var object = {};
		//try {
		if (/\"inBattle\":true/.test(response)) {
			if ($('#'+spocklet+'_stopbattle').is(':checked')) {
				if (fightlist != 'battle') {
					msg('Family battle detected, stopping.');
					log('Family battle detected, stopping.');
					controls_display(true,false,true);
					run = false;
					return;
				}
			}
		}
		
		if (/index_controller/.test(response)) {
			targets = [];
			load_fightlist();
		}
		else if (/fight_wrapper/.test(response)) {
			if (/This player is currently part of your mafia/i.test(response)) {
				skip_target();
				repeat_attack();
				return;
			}
			if (fight_result = /msg.fight_result = (\{.*\});FightV2/.exec(response)) {
				//fightResult = jQuery.parseJSON(fight_result[1]);
				var user_data = [];
				user_data = create_user_data(response);
				object['user_fields'] = user_data[0];
				object['user_info'] = user_data[1];
				if (quest = /MW.QuestBar.update\((\{.*\})\);/.exec(response)) {
					object['questData'] = quest[1];
				}
				update_game_ui(object);
				object['popup'] = response;

				if (/table class="main_table fight_table" cellspacing="0"/.test(response) && fightlist == 'fightlist') {
					parse_fightlist(response,false);
				}

			}
			else {
				user_data = create_user_data(response);
				object['user_fields'] = user_data[0];
				object['user_info'] = user_data[1];
				update_game_ui(object);
				repeat_attack();
				return;
			}
		}
		else {
			object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
			update_game_ui(object);
		}
		if (Util.isset(object.fight_result)) {
			fightResult = object.fight_result;
		}
		if (Util.isset(object.popup) && !fightResult) {
			if (/msg.fight_result = false/.test(object.popup)) {
				log('Could not parse result for some reason... Stamina: '+User.stamina+' Health: '+User.health);
				msg('Could not parse result for some reason... Stamina: '+User.stamina+' Health: '+User.health);
				controls_display(true,false,true);
				run = false;
				return;
			}
			else {
				if (res = /msg.fight_result = (\{.*\});FightV2/.exec(object.popup)) {
					fightResult = jQuery.parseJSON(res[1]);
				}
				else {
					repeat_attack();
					return;
				}
				if ($('#'+spocklet+'_power').is(':checked')) {
					var url = $(object.popup).find('.fightV2AttackBtn').eq(3).attr('href');
					targets[0].button = url.substr(url.indexOf('?')+1);
				}
				else {
					var url = $(object.popup).find('.fightV2AttackBtn:first').attr('href');
					targets[0].button = url.substr(url.indexOf('?')+1);
				}
			}
		}

		if (fightResult) {
			var multiplier = 1;
			if (fightResult.cash_class == 'brazil' || fightResult.cash_class == 'chicago' || fightResult.cash_class == 'london' ) {
				multiplier = 5;
			}

			var got_loot = raven;
			if (Util.isset(fightResult.loot)) {
				for (x in fightResult.loot) {
					var count = 1;
					var name = false;
					name = $(fightResult.loot[x]).find('#fake_item_card_title').html();
					if (name) {
						if ($(fightResult.loot[x]).find('#fake_item_card_qty').size > 0) {
							count = parseInt($(fightResult.loot[x]).find('#fake_item_card_qty').html().replace(/[^\d]/g,''));
						}
						if (!/Victory Coin/.test(name)) {
							add_loot(false,name,count);
							got_loot += name+' ';
						}
						else {
							stats.vc_count += count;
						}
					}
					var lootregexp = /item_id="(\d+)"/g;
					while((itemid = lootregexp.exec(fightResult.loot[x])) != null) {
						add_loot(parseInt(itemid[1]),'Unknown #'+itemid[1],1);
						if (itemdatabase[itemid[1]]) {
							var image = itemdatabase[itemid[1]].imagesrc?'<img width="16" height="16" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+itemdatabase[itemid[1]].imagesrc+'" /> ':'';
							got_loot += image+' ';
						}
						else {
							got_loot += itemid[1]+' ';
						}
					}
				}
			}
			if (Util.isset(fightResult.socialMessageCards)) {
				for (x in fightResult.socialMessageCards) {
					var name = false;
					var count = 1;
					name = $(fightResult.socialMessageCards[x]).find('#fake_item_card_title').html();
					if (name) {
						if (/Double XP/.test(name)) {
						}
						else if (/You took/.test(name)) {
						}
						else if (/less cash/.test(name)) {
						}
						else {
							count = parseInt($(fightResult.socialMessageCards[x]).find('#fake_item_card_qty').html().replace(/[^\d]/g,'')) * multiplier;
							add_loot(false,name,count);
							got_loot += name+' ';
						}
					}
					var lootregexp = /item_id="(\d+)"/g;
					while((itemid = lootregexp.exec(fightResult.socialMessageCards[x])) != null) {
						count = 1 * multiplier;
						add_loot(parseInt(itemid[1]),'Unknown #'+itemid[1],count);
						if (itemdatabase[itemid[1]]) {
							var image = itemdatabase[itemid[1]].imagesrc?'<img width="16" height="16" src="http://mwfb.static.zgncdn.com/mwfb/graphics/'+itemdatabase[itemid[1]].imagesrc+'" /> ':'';
							var multi = multiplier==1?'':'<span class="good">&times;'+multiplier+'</span> ';
							got_loot += image+multi+' ';
							// edit
							//got_loot += image+multi+itemdatabase[itemid[1]].name+' ';
						}
						else {
							got_loot += itemid[1]+' ';
						}
					}
				}
			}

			if (typeof cash[fightResult.cash_class] == 'number') {
				(fightResult.cash < 0) ? cash[fightResult.cash_class] -= Math.abs(fightResult.cash-prev_cash) : cash[fightResult.cash_class] += parseInt(fightResult.cash-prev_cash);
			}
			else {
				cash[fightResult.cash_class] = fightResult.cash;
			}
			(fightResult.cash < 0) ? stats.money_gained -= Math.abs(fightResult.cash) : stats.money_gained += fightResult.cash;
			var attacks_won = parseInt(fightResult.power_attack.won-prev_won);
			var attacks_lost = parseInt(fightResult.power_attack.lost-prev_lost);
			var attacks_made = parseInt((attacks_won+attacks_lost) * multiplier);

			stats.stamina_used += attacks_made;
			stats.attacks_done += attacks_made;
			target.attacks++;
			stats.success += attacks_won * multiplier;
			stats.failed += attacks_lost * multiplier;
			prev_won = parseInt(fightResult.power_attack.won);
			prev_lost = parseInt(fightResult.power_attack.lost);

			var ice_output = '';
			var ice_css = 'color:#609AD1;';
			// edit need switch here
			if (fightResult.defender.is_iced || fightResult.defender.is_killed) {
				ice_output = 'already iced!';
				stats.already_iced++;
				targets[0].iced = true;
			}
			if (fightResult.defender.iced_self) {
				ice_output = 'iced self!';
				targets[0].iced = true;
			}
			if (fightResult.defender.you_iced) {
				stats.iced++;
				ice_output = 'iced!'+iced_image;
				ice_css = 'color:#609AD1;font-weight:bold;';
				targets[0].iced = true;
			}
			if (fightResult.defender.is_killed && fightResult.defender.you_iced) {
				stats.killed++;
				stats.iced++;
				ice_output = 'killed!';
				ice_css = 'color:#990000;font-weight:bold;';
				targets[0].iced = true;
			}
			if (Util.isset(fightResult.ices_so_far) && Util.isset(fightResult.ices_target)) {
				$('#'+spocklet+'_ice_season').html('['+fightResult.ices_so_far+'/'+fightResult.ices_target+']');
			}

			var output = '';
			if (fightResult.isWin) {
				output += 'Won! ';
			}
			else {
				output += '<span class="bad">Lost!</span> ';
				add_blacklist();
			}
			if (fightResult.use_boost) {
				output += boost_image+' ';
			}
			if (Util.isset(object.user_fields)) {
				stats.exp_gained += parseInt(object.user_fields.xp_earned);
				if ($('#'+spocklet+'_log_exp').is(':checked')) {
					output += '<span class="experience" title="Experience gained">'+object.user_fields.xp_earned+'</span> ';
				}
			}
			if (Util.isset(fightResult.defender.damage_dealt)) {
				var damage = parseInt(fightResult.defender.damage_dealt);
				stats.damage_done = damage;
				if(Util.isset(stats.damage[damage])) {
					stats.damage[damage]++;
				}
				else {
					stats.damage[damage] = 1;
				}
			}

			if (fightResult.defender.is_iced) {
				if (Util.isset(fightResult.total_ice_count)) {
					var icecount = parseInt(fightResult.total_ice_count);
					if (icecount > 0) {
						stats.iced_start = icecount;
					}
				}
			}

			fightResult.defender.is_iced ? output += 'Target <span style="'+ice_css+'">'+ice_output+'</span> ' : '';
			if (targets[0].badgeimg) { output+='<img width=16 height=16 title="'+targets[0].badge+'" src="'+targets[0].badgeimg+'" />'; }
			output += profile_link()+' ';
			if ($('#'+spocklet+'_log_hp').is(':checked')) {
				output += calculate_health(fightResult.defender.damage_dealt,fightResult.defender.other_damage,fightResult.defender.current_health_pct);
			}
			var cashgained = 0;
			if (parseInt(fightResult.cash-prev_cash) != 0) {
				if ($('#'+spocklet+'_log_cash').is(':checked')) {
					output += '<span style="color:#00C800;">'+(typeof currencies[fightResult.cash_class] != 'undefined'?currencies[fightResult.cash_class]:'$')+commas(parseInt(fightResult.cash-prev_cash))+'</span> ';
				}
				cashgained = parseInt(fightResult.cash-prev_cash);
			}
			if ($('#'+spocklet+'_log_loot').is(':checked')) {
				got_loot.length > 0 ? output += got_loot : '';
			}
			log(output);
			prev_cash = parseInt(fightResult.cash);

			//show popups
			if (Util.isset(fightResult.feed_js)) {
				var type = '', ice_count = '';
				var show = false;
				if (Util.isset(fightResult.total_ice_count)) {
					ice_count = ' #'+commas(fightResult.total_ice_count);
				}
				if (fightResult.you_just_iced) {
					//show = false;
					type = '<span style="color:#609AD1;">Ice '+ice_count+'</span>';
				}
				if (fightResult.you_just_killed) {
					type = '<span style="color:#990000;">Kill '+ice_count+'</span>';
				}
				var poptime = unix_timestamp();
				popups[poptime] = fightResult.feed_js;
				add_popup(poptime,type);
				if (show && $('#'+spocklet+'_popups').is(':checked')) {
					open_popup(poptime);
					$('#'+spocklet+'_pause').trigger('click');
				}
			}

			if (Util.isset(object.popup) && Util.isset(object.popup_id)) {
				//filter the popups to show
				var show = false;
				var type = '';
				if (/iced_popv2_wrapper/.test(object.popup)) {
					show = false;
					type = '<span style="color:#609AD1;">Iced</span>';
				}
				else if (/iced_event_iced_popup/.test(object.popup)) {
					show = false;
					type = 'Ice Event';
				}
				else if (/ice_stolen_wrapper/.test(object.popup)) {
					show = false;
					type = 'Ice stolen';
				}
				else if (promotion=/You are now LEVEL (\d+)/i.exec(object.popup)) {
					show = true;
					type = '<span style="color:yellow;">Promotion</span> level '+promotion[1];
				}
				else if (mastery=/You have reached level (\d+)/i.exec(object.popup)) {
					show = false;
					type = '<span style="color:green;">Fight Mastery</span> level '+mastery[1];
				}
				else {
					show = false;
					type = 'Unknown';
				}

				popups[object.popup_id] = object.popup;
					add_popup(object.popup_id,type);

				if (show && $('#'+spocklet+'_popups').is(':checked')) {
					$('#popup_fodder').prepend('<div id="'+object.popup_id+'"></div>');
					$('#'+object.popup_id).append(object.popup);
				}
			}

			//next action
			if (fightResult.cash_class.substr(1) != object.user_fields.currentCityLocalizedName.replace(/\s/,'_').toLowerCase().substr(1) && $('#'+spocklet+'_samecash').is(':checked')) {
				log('Cash not from active city '+object.user_fields.currentCityLocalizedName+', skipping '+profile_link()+'...');
				skip_target();
				repeat_attack();
				return;
			}
			if (fightResult.defender.is_iced) {
				if (!$('#'+spocklet+'_keepice').is(':checked') || targets[0].type == 'Stealer') {
					skip_target();
				}
				repeat_attack();
				return;
			}
			if (!fightResult.isWin) {
				if (!$('#'+spocklet+'_redice').is(':checked') || targets[0].type == 'Stealer') {
					skip_target();
				}
				repeat_attack();
				return;
			}
			if (fightResult.isWin && !fightResult.defender.is_iced) {
				msg('Attacking again!')
				repeat_attack();
				return;
			}
		}
		else {
			msg('No fight result to parse... Stamina: '+User.stamina+' Health: '+User.health);
			if (User.health < parseInt($('#'+spocklet+'_health').val())) {
				msg('<span class="good">Going to hospital...</span>');
				var url = 'xw_controller=hospital&xw_action=heal&xw_city=&xcity=1';
				request(url,function(response){ parse_hospital(response); });
			}
			else {
				target.attacks++;
				repeat_attack();
			}
		}
	}

	function travel(to,from) {
		//travel function
		var url = 'xw_controller=travel&xw_action=travel&destination='+to+'&from=fight';
		msg('Travelling from '+from+' to '+to+'...');
		request(url,function(s) { parse_travel(s); });
	}

	function parse_travel(response) {
		msg('Reading travel response...');
		active_city = /xw_city=(\d+)/.exec(response)[1];
		repeat_attack();
	}

	function load_profile(id) {
		var list = $('#'+spocklet+'_targets').val().trim().split(/[ \n]/);
		msg('Loading profile page...'+list_target+'/'+list.length);
		if (/p/.test(id)) {
			id = btoa(id);
		}
		var url = 'xw_controller=stats&xw_action=view&user='+id;
		request(url,function (response) { parse_profile_page(response); });
	}

	function parse_profile_page(response) {
		//console.time('parse_profile_page()');
		response = response.replace(/<img/ig, '<noimg');
		if (response.length == 0) {
			log('Borked response, 0 size, retrying...');
			repeat_attack();
			return;
		}
		msg('Reading profile page...');
		try {
			//search out the attack button, inject relevant info into targets
			var button = $(response).find('.impulse_buy:first').attr('href');
			if (button) {
				button = button.replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'');
				var text = $(response).find('div[class*="stats_title"]').html();
				var family = $(response).find('div[class*="stats_title"] span:first').html();
				var level = 1;
				if (lev = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)) {
					level = parseInt(lev[1]);
				}
				var type = 'Unknown';
				if (ty = /Level (\d+) (Fearless|Maniac|Mogul)/i.exec(text)) {
					type = ty[2];
				}
				var name = 'NoName';
				if (na = /"(.*?)" level/.exec(text.replace(family,''))) {
					name = na[1];
				}
				var badge = $(response).find('.fight_badge').find("img").attr("title");
				var badgeimg = $(response).find('.fight_badge').find("img").attr("src");

				if (/attack_pop/.test(button)) {
					var pid = /opponent_id=p%7C(\d+)/.exec(button)[1];
					targets.push({"pid":pid,"button":button,"iced":false,"mafia":501,"name":name,"family":family,"family_id":0,"level":level,"type":type, "badge":badge, "badgeimg":badgeimg});
					repeat_attack();
					return;
				}
				else {
					msg('No attack button found on profile page. Could be a mafia member? (case a)');
					log('No attack button found on profile page. Could be a mafia member? (case a)');
					repeat_attack();
					return;
				}
			}
			else {
				msg('No attack button found on profile page. Could be a mafia member?');
				log('No attack button found on profile page. Could be a mafia member?');
				repeat_attack();
				return;
			}
		}
		catch (profile_error) {
			alert('Profile Parse Error:\n'+profile_error.lineNumber+'\n'+profile_error);
		}
	}

	function load_targets() {
		var list = $('#'+spocklet+'_targets').val().trim().split(/[ \n]/);
		if (list[0] == '') {
			log('<span class="bad">Manual list was empty!</span> Make sure to use FBid (numbers only) or MWid (p|numbers).')
			msg('<span class="bad">Manual list was empty!</span> Make sure to use FBid (numbers only) or MWid (p|numbers).')
			run = false;
			return;
		}
		if (list_target >= list.length) {
			list_target = 0;
			log('Ran out of targets, restarting target list...');
			var wait = myRandom(parseInt($('#'+spocklet+'_delay1').val()),parseInt($('#'+spocklet+'_delay2').val()));
			pausing(wait,'Ran out of targets, reloading target list in',function(){ load_targets(); });
		}
		else {
			load_profile(list[list_target]);
			list_target++;
		}
	}

	function calculate_health(damage,other_damage,health_pct) {
		target.damage_done += parseInt(damage);
		//target.damage_done += parseInt(other_damage);
		if (target.start_health_pct == 0) {
			target.start_health_pct = health_pct;
			target.prev_health_pct = health_pct;
		}
		else if ((health_pct > target.prev_health_pct) && (target.attacks > 1)) {
			//target did heal
			target.prev_health_pct = health_pct;
			target.start_health_pct = health_pct;
			target.damage_done = 0;
			return '<span class="health">Target healed!</span> ';
		}
		else {
			var pct_taken = parseInt(target.start_health_pct - health_pct);
			var total_health = parseInt((100/pct_taken)*target.damage_done);
			var current_health = parseInt((total_health*health_pct)/100);
			target.health = current_health;
			target.maxhealth = total_health;
			target.prev_health_pct = health_pct;
			return '<span class="health">'+current_health+'/~'+total_health+' ('+health_pct+'%)</span> ';
		}
		return '';
	}

	function check_name(name) {
		var characters = $('#'+spocklet+'_namefilter').val().trim().split(/[ \n]/);
		for (var i = 0; i < characters.length; i++) {
			characters[i] = characters[i].replace(/[\s\r\n]/g, '');
			if (characters[i].length > 0) {
				if (name.indexOf(characters[i]) > -1) {
					return true;
				}
			}
		}
		return false;
	}

	function check_family(id) {
		var families = $('#'+spocklet+'_familyfilter').val().trim().split(/[ \n]/);
		for (var i = 0; i < families.length; i++) {
			families[i] = families[i].replace(/[\s\r\n]/g, '');
		}
		if (families.indexOf(id+"") != -1) {
			return true;
		}
		return false;
	}

	function skip_target() {
		msg('Skipping target...');
		targets.shift();
		prev_won = 0;
		prev_lost = 0;
		prev_cash = 0;
		target_attacks = 0;
		target.start_health_pct = 0;
		target.prev_health_pct = 0;
		target.damage_done = 0;
		target.attacks = 0;
		target.health = 0;
	}

	function load_fightlist() {
		msg('Loading fight list...')
		var url = 'xw_controller=fight&xw_action=view';
		request(url,function(response){ parse_fightlist(response,true); });
	}

	function load_rivals() {
		msg('Loading rivals...')
		var url = 'xw_controller=fight&xw_action=view&tab=1';
		request(url,function(response){ parse_fightlist(response,true); });
	}
	function load_battle() {
		msg('Loading Family Battle targets...')
		var url = 'xw_controller=EpicBattle&xw_action=view';
		request(url,function(response){ parse_battle(response,true); });
	}

	function parse_battle(response,attack) {
		if (!attack) {
			var tmptarget = targets[0];
			targets = [];
			if (!tmptarget.iced) {
				targets.push(tmptarget);
			}
		}
		if ($(response).find('#clan_xp_meter').length == 0) {
			msg('<span class="bad">No active Family Battle found, stopping...</span>');
			log('<span class="bad">No active Family Battle found, stopping...</span>');
			controls_display(true,false,true);
			run = false;
			return;
		}
		if ($(response).find('#my_score').length>0) {
			var m,timeleft,my=parseInt($(response).find('#my_score').text()),
			their=parseInt($(response).find('#their_score').text());
			if(m=/time_left: (\d+)/.exec(response)){
				var s=parseInt(m[1]);
				timeleft=parseInt(s/60)+'min';
			};
			$('#'+spocklet+'_battlescore').html('Battle score: <span class="'+(my>their?'good':'bad')+'">'+my+' vs. '+their+'</span>, '+timeleft+' left');
		}
		
		var family = '<span style="color:red;">'+$(response).find('#away_family_name').text()+'</span>';
		$(response).find('#battle_target_list .fight_entry').each(function(index) {
			var family_id = 0;
			var name = $(this).find('div.fl a:last').text();
			if (name && $(this).find('span:contains("Attack")').length > 0) {
				var type = 'FamilyBattle';
				var level = /Level.*?(\d+)/.exec($(this).text())[1] || 1500;
				var mafia = parseInt($(this).find('span.fl').text().replace((/[^\d]/g,''))) || 501;
				var button = $(this).find('a.sexy_attack_new:first').attr('href').replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'').replace(/&xw_city=\d/,'').replace(/attack_true_pop/,'attack_pop');
				var pid = /p%7C(\d+)/.exec(button)[1];
				if (!find_element(pid,'pid',targets)) {
					targets.push({"pid":pid,"button":button,"iced":false,"mafia":mafia,"name":name,"family":family,"family_id":family_id,"level":level,"type":type,"badge":'Gold 1',"badgeimg":false});
				}
			}
		});
		if (attack && run) {
			repeat_attack();
		}
	}

	function parse_fightlist(response,attack) {
		if (fightlist != 'fightlist' && fightlist != 'rivals') {
			log('Attempted to load fightlist when we should not. Ignoring the load.')
			return;
		}
		if (!attack) {
			var tmptarget = targets[0];
			targets = [];
			if (!tmptarget.iced) {
				targets.push(tmptarget);
			}
		}
		if (/assassin-title.png/i.test(response)) {
			if (!raven_found) {
				log(ravenimg+' Boss fight Raven active!');
			}
			raven_found = true;
		}

		parse_vc_count(response);
		
		var target_count = 0;
		$('#user_health').html(parseInt(/user_health.*?(\d+)/.exec(response)[1]));
		$(response).find('tr').filter(function() {
			return $(this).parent().parent().attr('cellspacing') == '0';
		}).each(function(index) {
			target_count++;
			var mytarget = parseInt($('#my_target').val());
			if (target_count < mytarget) {
				var family = '';
				var family_id = 0;
				if ($(this).find('td:first a').size() == 2) {
					family = $(this).find('td:first a').eq(0).text();
					try {
						family_id = atob(unescape(/id=([a-zA-Z0-9%]+)/.exec($(this).find('td:first a').eq(0).attr('href'))[1]));
					} catch(e) { family_id=null; }
				}
				var name = $(this).find('td:first a:last').text();
				if (name) {
					var level = $(this).find('.fight_list_level_alive,.fight_list_level_dead').text();
					try {
						var type = /(Fearless|Maniac|Mogul)/.exec($(this).find('td:first').html())[1];
					} catch(e) { type="unknown"; }
					var mafia = $(this).find('td').eq(1).html().trim();
					var iced = $(this).find('td:first').hasClass('fight_list_player_dead');
					var button = $(this).find('td.action a:first').attr('href').replace(/&amp;/g,'&').replace(/remote\/html_server.php\?/,'');
					var badge = $(this).find('.fight_badge').find("img").attr("title");
					var badgeimg = $(this).find('.fight_badge').find("img").attr("src");
					var pid = /btn_attack_p(\d+)/.exec(button)[1];
					//old fight layout check
					if (/xw_action=attack&/.test(button)) {
						log('<span class="bad">Sorry, it appears that you have the old fighting layout. Assassin-a-Nator is only for the new layout.</span>')
						alert('Sorry, it appears that you have the old fighting layout.\nAssassin-a-Nator is only for the new layout.')
						return false;
					}
					if (!iced) {
						if (!find_element(pid,'pid',targets)) {
							targets.push({"pid":pid,"button":button,"iced":iced,"mafia":mafia,"name":name,"family":family,"family_id":family_id,"level":level,"type":type, "badge":badge, "badgeimg":badgeimg});
						}
					}
				}
			}
		});
		if (attack && run) {
			repeat_attack();
		}
	}
	
	function collect_family_progression_ices() {
		if(unix_timestamp()>last_fp_collect_time+60) {
			last_fp_collect_time=unix_timestamp();
			log("Collecting family progression now");
			var url = 'xw_controller=clan&xw_action=collectProgress&exp_type=exp_fight';
			request(url,function(response) {
				response=JSON.parse(response.replace(/^(\s\d\s+)/,''));
				if (response.success) {
					log('<span class="'+response.star_class+'"></span>'+response.msg);
				}
			});
		
		}
	}
	
	function visit_hospital() {
		kill_grant();
		if ((active_city == hospital_city) || (hospital_city == 1)) {
			msg('<span class="good">Going to hospital...</span>');
			var url = 'xw_controller=hospital&xw_action=heal&xw_city=';
			if (hospital_city == 1) {
				url = url+'&xcity=1';
			}
			request(url,function(response){ parse_hospital(response); },function(s){ pausing(10,'Page not loaded properly, trying again in ',function(){ repeat_attack(); }); });
		}
		else {
			msg('<span class="good">Travelling to hospital city...</span>');
			travel(hospital_city,active_city);
		}
	}
	function parse_hospital(hospital) {
		var object = jQuery.parseJSON(hospital.replace(/^(\s\d\s+)/,''));
		update_game_ui(object);
		if (object.heal_success == 1) {
			var cost = parseInt(/for .*?\$.*?([\d,]+)/.exec(object.hospital_message)[1].replace(/[^\d]/g,''));
			stats.money_gained -= cost;
			if (Util.isset(cash['new_york'])) {
				cash['new_york'] -= cost;
			}
			else {
				cash['new_york'] = (-cost);
			}
		}
		log(object.hospital_message);
		if (/You cannot heal so fast/.test(object.hospital_message)) {
			if (Util.isset(object.waitHealTimer)) {
				//Thanks to David Van G. for this find
				log('Heal possible in '+object.waitHealTimer+' seconds.');
				pausing(parseInt(object.waitHealTimer),'Retrying heal in ...',function(){ repeat_attack(); });
			}
			else {
				pausing(10,'Retrying heal in ...',function(){ repeat_attack(); });
			}
			return;
		}
		else {
			//if (start_city != active_city) {
			if (start_city != active_city && active_city == hospital_city) {
				msg('<span class="sexy_travel_new">Travelling back to start city...</span>');
				travel(start_city,active_city);
			}
			else {
				repeat_attack();
			}
		}
	}

	function loadInventoryAAN(handler) {
		request('xw_controller=inventory&xw_action=view&from_controller=inventory',function(response){
			//itemdatabase = {};
			var ZyngaItems = jQuery.parseJSON(/var Items = \{\s+data: (\{.*?\})\};/.exec(response)[1]);
			var WorstItems = jQuery.parseJSON(/MW.WorstItemsModule.update\((\{.*\})\);/.exec(response)[1]);
			for (x in ZyngaItems) {
				ZyngaItems[x].combined = parseInt(ZyngaItems[x].attack+ZyngaItems[x].defense);
				itemdatabase[ZyngaItems[x].id] = ZyngaItems[x]; //{quantity: ZyngaItems[x].quantity}
			}
			if (!run) {
				msg('<span class="good">Inventory Loaded. Press green Start button to Assassin-a-Nate!</span>');
			}
			log('Inventory load complete, this will avoid Unknown #xxx in the loot log.');
		});
		controls_display(true,false,true);
	}

	function load_vc_count() {
		var url = 'xw_controller=fight&xw_action=view';
		request(url,function(s){ parse_vc_count(s); });
	}

	function parse_vc_count(msg) {
		var coins = parseInt($(msg).find('.fightmastery_tokens:first').html().replace(/,/,''));
		if (stats.vc_start == 0) {
			stats.vc_count = coins;
			stats.vc_start = coins;
			$('#'+spocklet+'_vcoins').html(coins);
		}
		else {
			stats.vc_count = coins;
			$('#'+spocklet+'_vcoins').html(stats.vc_count+' (<span class="'+(stats.vc_count < stats.vc_start?'bad">':'good">+')+parseInt(stats.vc_count-stats.vc_start)+'</span>)');
		}
	}

	function update_sig() {
		//function to get the local_xw_sig value
		cb = userid+unix_timestamp();
		var params = {
			"cb": cb,
			"xw_client_id": 8,
			"ajax": 1,
			"liteload": 1,
			"sf_xw_sig": local_xw_sig,
			"sf_xw_user_id": userid
		};
		$.ajax({
			type: "POST",
			url: http+'facebook.mafiawars.zynga.com/mwfb/sf_updater.php',
			data: params,
			success: function (response) {
				local_xw_sig = /([a-f0-9]{32})/.exec(response)[1];
			}
		});
		do_ajax('', 'remote/html_server.php?xw_controller=hospital&xw_action=view&mwcom=1', 1, 0, 0, 0);
	}

	function find_element(search,property,array) {
		for (var x in array) {
			if (search == array[x][property]) {
				return array[x];
			}
		}
		return false;
	}

	function controls_display(play,pause,stop) {
		//helper function to toggle the icons
		play ? $('#'+spocklet+'_play').css({'display':'inline-block'}) : $('#'+spocklet+'_play').css({'display':'none'});
		pause ? $('#'+spocklet+'_pause').css({'display':'inline-block'}) : $('#'+spocklet+'_pause').css({'display':'none'});
		stop ? $('#'+spocklet+'_close').css({'display':'inline-block'}) : $('#'+spocklet+'_close').css({'display':'none'});
	}

	function set_background(city) {
		$('#'+spocklet+'_background').css('background-image',backgrounds[city]);
		$('#'+spocklet+'_background').css('background-repeat','no-repeat');
	}

	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name, value) {
		var expires = new Date();
		expires.setDate(expires.getDate() + 14);
		document.cookie = name + "=" + value + ";expires=" + expires.toGMTString() + "; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i, cookie, nameEQ = name + "=",	cookieArray = document.cookie.split(";");
		for (i = 0; i < cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0) == ' ')
				cookie = cookie.substring(1, cookie.length);
			if (cookie.indexOf(nameEQ) == 0)
				return cookie.substring(nameEQ.length, cookie.length);
		}
		return null;
	}

	function saveForm(cookiename) {
		var output = new Object();
        var inputs = $(':input[name="'+tagname+'"]');
        for (var i=0;i<inputs.length;i++) {
        	switch(inputs[i].type) {
				case 'select-one':
					output[inputs[i].id] = inputs[i].selectedIndex;
					break;
				case 'text':
					output[inputs[i].id] = inputs[i].value;
					break;
				case 'checkbox':
					output[inputs[i].id] = inputs[i].checked;
					break;
				case 'textarea':
					output[inputs[i].id] = escape(inputs[i].value);
					break;
				default:
					alert(inputs[i].type);
			}
        }
		//createCookie(cookiename,JSON.stringify(output));
		try {
			if (storage) {
				storage.setItem(cookiename,JSON.stringify(output));
			}
		} catch(e) {
			alert('Assassin-a-Nator Settings could not be saved. Either your storage is full or not accessable. Please run cookie-a-nator and use the "Remove Junk" button.');
		}
		kill_grant();
		//console.log(JSON.stringify(output));
	}

	function loadForm(cookiename) {
		var cookie;
		if (storage) {
			cookie = storage.getItem(cookiename);
		}
		if (!cookie) {
			var cookie = readCookie(cookiename);
			if (storage) {
				storage.setItem(cookiename,cookie);
			}
			createCookie(cookiename,'');
		}
		if (cookie) {
			var input = JSON.parse(cookie);
			for (name in input) {
				try {
					var el = $(':input[id="'+name+'"]')[0];
					if(el) {
						switch (el.type) {
							case 'select-one':
								el.selectedIndex = input[name];
								break;
							case 'text':
								el.value = input[name];
								break;
							case 'checkbox':
								el.checked = input[name];
								break;
							case 'textarea':
								el.value = unescape(input[name]);
								break;
						}
					}
				}
				catch(e) { }
			}
		}
	}

	function kill_grant() {
		//no, not the whiskey grant's
		if (document.cookie.indexOf('GRANT_BATCH_43') < 0) {
			var date = new Date();
			date.setTime(date.getTime()+(2*24*60*60*1000));
			document.cookie = 'GRANT_BATCH_43="";expires='+date.toGMTString()+';path=/mwfb/remote/;';
		}
		else {
			document.cookie = 'GRANT_BATCH_43=""';
		}
	}

	function verify_input(value,maxvalue,safe) {
		var value = parseInt(value);
		var maxvalue = parseInt(maxvalue);
		var safe = parseInt(safe);

		if (isNaN(value)) {
			$('#'+spocklet+'_filter_error').html('Not a number!');
			setTimeout(function(){$('#'+spocklet+'_filter_error').html('').hide();},2000);
			return safe;
		}
		else if (value > maxvalue) {
			$('#'+spocklet+'_filter_error').html('Above maximum value: '+maxvalue+'!');
			setTimeout(function(){$('#'+spocklet+'_filter_error').html('').hide();},2000);
			return safe;
		}
		else {
			$('#'+spocklet+'_filter_error').html('').show();
			return value;
		}
	}

	create_div();
	set_background(xw_city);
	loadForm(spocklet+'_cookie');

	if (xw_city == 1) {
		$('#'+spocklet+'_bankamount').val('0');
		$('#'+spocklet+'_bankamount').trigger('keyup');
	}
	controls_display(false,false,true);

	if ($('#'+spocklet+'_restart').is(':checked')) {
		$('#'+spocklet+'_restart_row').show();
	}
	else {
		$('#'+spocklet+'_restart_row').hide();
	}

	//bind buttons
	$('#'+spocklet+'_play').click(function() {
		if (!run) {
			run = true;
			clearInterval(timer);
			controls_display(false,true,true);
			if (fightlist == 'fightlist') {
				load_fightlist();
			}
			if (fightlist == 'targetlist') {
				targets = [];
				load_targets();
			}
			if (fightlist == 'rivals') {
				targets = [];
				load_rivals();
			}
			if (fightlist == 'battle') {
				targets = [];
				load_battle();
			}
		}
		return false;
	});

	$('#'+spocklet+'_pause').click(function() {
		run = false;
		controls_display(true,false,true);
		clearInterval(timer);
		msg('Paused...');
		return false;
	});

	$('#'+spocklet+'_close').click(function() {
		run = false;
		clearInterval(timer);
		clearInterval(refresh_timer);
		saveForm(spocklet+'_cookie');
		$('#'+spocklet+'_main').remove();
	});

	$('#'+spocklet+'_save').click(function() {
		saveForm(spocklet+'_cookie');
		alert(version+'\nSettings saved!');
	});

	$('#'+spocklet+'_restart').change(function() {
		if ($('#'+spocklet+'_restart').is(':checked')) {
			$('#'+spocklet+'_restart_row').show();
		}
		else {
			$('#'+spocklet+'_restart_row').hide();
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_sortloot').click(function () {
		sortlootindex = sortlootindex+1;
		if (sortlootindex>=sortloot.length) {
			sortlootindex = 0;
		}
		this.innerHTML = sortloot[sortlootindex];
		update_loot_log();
		return false;
	});

	//runtime toggle icon, somewhat hidden, no need to encourage 0-0 timers
	var pos = $('#'+spocklet+'_main').position();
	$('#'+spocklet+'_main').prepend('<a href="#" id="'+spocklet+'_runtime_row_toggle" class="'+spocklet+'_toggle"><img src="'+clockimg+'" width="2" height="2" style="position: absolute; left:'+parseInt(pos.left+7)+'px; top: '+parseInt(pos.top+7)+'px;" alt="Show/Hide runtime" title="Show/Hide runtime" /></a>');
	$('#'+spocklet+'_main').prepend('<span style="position: absolute; left:'+parseInt(pos.left+670)+'px; top: '+parseInt(pos.top+15)+'px;">'+fblike+'</span>');

	$('a[class='+spocklet+'_toggle]').bind('click',function() {
		$('#'+this.id.replace(/_toggle/,'')).toggle();
		return false;
	});

	$('#'+spocklet+'_config_toggle, #'+spocklet+'_filters_toggle').bind('click',function(){
		if ($('#'+this.id.replace(/_toggle/,'')).css('display') == 'none') {
			$('#'+this.id.replace(/_toggle/,'')).show();
			$(this).addClass('green').removeClass('black');
			return false;
		}
		else {
			$('#'+this.id.replace(/_toggle/,'')).hide();
			$(this).addClass('black').removeClass('green');
			return false;
		}
	});
	$('#'+spocklet+'_config').draggable();
	$('#'+spocklet+'_log_config').draggable();

	$('#'+spocklet+'_log_toggle, #'+spocklet+'_loot_toggle, #'+spocklet+'_popup_toggle').toggle(
		function() {
			$('#'+this.id.replace(/_toggle/,'')).hide();
			$(this).addClass('black').removeClass('green');
			return false;
		},
		function() {
			$('#'+this.id.replace(/_toggle/,'')).show();
			$(this).addClass('green').removeClass('black');
			if (this.id == spocklet+'_loot_toggle') {
				update_loot_log();
			}
			if (this.id == spocklet+'_log_toggle') {
				$('#'+spocklet+'_log').html(logs.concat(extralog,'').join('<br />'));
			}
			return false;
		}
	);
	$('#'+spocklet+'_heal').toggle(
		function() {
			$(this).addClass('black').removeClass('orange').html('<span><span>Disabled</span></span>');
			use_hospital = false;
		},
		function() {
			$(this).addClass('orange').removeClass('green').html('<span><span>Active City</span></span>');
			use_hospital = true;
			hospital_city = start_city;
		},
		function() {
			$(this).addClass('green').removeClass('black').html('<span><span>New York</span></span>');
			use_hospital = true;
			hospital_city = 1;
		}
	);
	$('#'+spocklet+'_mode').toggle(
		function() {
			$(this).addClass('white').removeClass('red').html('<span><span>Target List</span></span>');
			fightlist = 'targetlist';
			$('#'+spocklet+'_targetlist').show();
		},
		function() {
			$(this).addClass('orange').removeClass('white').html('<span><span>Rivals List</span></span>');
			fightlist = 'rivals';
			$('#'+spocklet+'_targetlist').hide();
		},
		function () {
			$(this).addClass('red').removeClass('orange').html('<span><span>Family Battle!</span></span>');
			fightlist = 'battle';
			$('#'+spocklet+'_targetlist').hide();
		},
		function() {
			$(this).addClass('black').removeClass('red').html('<span><span>Fightlist Mode</span></span>');
			fightlist = 'fightlist';
			$('#'+spocklet+'_targetlist').hide();
		}
	);


	//bind events for error checking user input boxes
/*	$('#'+spocklet+'_maxattacks').bind('keyup',function() {
		this.value = verify_input(this.value,99999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_maxhealth').bind('keyup',function() {
		this.value = verify_input(this.value,99999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_mafia_low').bind('keyup',function() {
		this.value = verify_input(this.value,501,1);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_mafia_high').bind('keyup',function() {
		this.value = verify_input(this.value,501,501);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_level_low').bind('keyup',function() {
		this.value = verify_input(this.value,25000,1);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_level_high').bind('keyup',function() {
		this.value = verify_input(this.value,999999,25000);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_attacks_todo').bind('keyup',function() {
		this.value = verify_input(this.value,9999,0);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_restart_time').bind('keyup',function() {
		if (isNaN(parseInt(this.value)) || parseInt(this.value) < 1) {
			this.value = 1;
		}
		saveForm(spocklet+'_cookie');
	});*/
	$('#'+spocklet+'_logsize').bind('keyup',function() {
		if (isNaN(this.value)) {
			this.value = 10;
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_bankamount').bind('keyup',function() {
		this.value = verify_input(this.value,999999999,100000);
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay1, #'+spocklet+'_max_burners').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('1');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_health').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('50');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_delay2').bind('keyup',function() {
		if (isNaN(this.value)) {
			$(this).val('3');
		}
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_popups, #'+spocklet+'_levelup, #'+spocklet+'_power, #'+spocklet+'_revenge, #'+spocklet+'_samecash, #'+spocklet+'_blacklist').change(function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_stopbattle, #'+spocklet+'_stopices').change(function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_namefilter').bind('keyup paste',function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_familyfilter').bind('keyup paste',function() {
		this.value = this.value.replace(/[^\d\s]/g,'');
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_targets').bind('keyup paste',function() {
		this.value = this.value.replace(/[^\d\sp|]/g,'');
		saveForm(spocklet+'_cookie');
	});
	$('.'+spocklet+'_save').bind('click',function() {
		saveForm(spocklet+'_cookie');
	});
	$('#'+spocklet+'_addfamily').click(function() {
		var m,famlink=prompt("Paste family profile link here.\nExample: http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22Mjc%3D%22%7D");
		if (m = /id=%7B%22id%22%3A%22([\w\d\%]+)%22%7D/.exec(famlink)) {
			var famid = atob(unescape(m[1]));
			$('#'+spocklet+'_familyfilter').val($('#'+spocklet+'_familyfilter').val()+"\n"+famid);
			saveForm(spocklet+'_cookie');
		}
	});
	$('#'+spocklet+'_addtarget').click(function() {
		var m,famlink=prompt("Paste MW profile link here.\nExample: http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22cHwxMjM0NQ%3D%3D%22%7D");
		if (m = /id=%7B%22user%22%3A%22([\w\d\%]+)%22%7D/.exec(famlink)) {
			var famid = atob(unescape(m[1]));
			$('#'+spocklet+'_targets').val($('#'+spocklet+'_targets').val()+"\n"+famid);
			saveForm(spocklet+'_cookie');
		}
	});

	//get started with the bookmarklet
	msg('<span class="good">Green start button to begin Assassin-a-Nating! Or wait for inventory load...</span>');
	loadInventoryAAN();
	//controls_display(true,false,true);
	$('#'+spocklet+'_donate').effect("pulsate", { times:2 }, 750);

	//update_sig();
	refresh_timer = setInterval(update_sig, 300000);
	$('#'+spocklet+'_loot_toggle, #'+spocklet+'_popup_toggle').trigger('click');

	log('This is <span class="good">'+version+'</span>, a bookmarklet from <strong>Spockholm Mafia Tools</strong><br /> Visit our <a href="http://www.facebook.com/mafiatools/">[Fan Page]</a> or website <a href="http://www.spockholm.com/mafia/testing.php">[spockholm.com]</a> for more bookmarklets.');

	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/Assassin-a-Nator");
	}
	catch(err) {}
	//end analytics
})()