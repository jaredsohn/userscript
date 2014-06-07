// ==UserScript==
// @name REP JOB VEGAS
// @description REP JOB
// @include http://facebook.mafiawars.com/*
// ==/UserScript==

/* 
	Credits:
	Vern for a lot of code and inspiration, http://vern.com/mwtools/
	Pete Lundrigan (Pistol Pete) for contributing code.
	
	(c) Spockholm Mafia Tools - http://www.spockholm.com/mafia/bookmarklets.php
	
	2010-07-25	v1.00	First release of the bookmarklet. A lot of things still need to be fixed.
	2010-09-10  v1.05	Added item strength and new collection items.
	2010-09-15	v1.06	Bookmarklet now able to fetch missing consumables.
	2010-09-29	v1.07	Popups always show and target mafia size/level config added.
	2010-09-30	v1.08	Bookmarklet can withdraw money for jobs that need.
	2010-10-04	v1.09	Experimental release, changes cannot deposit behaviour some.
	2010-10-20	v1.10	Fix for the new consumable link syntax.
	2010-11-16	v1.11	Fix for the new exp to level layout change.
*/
javascript:(function(){
try { //megatry
	if (document.getElementsByName('mafiawars')[0]) {
		window.location.href=document.getElementsByName('mafiawars')[0].src;
		return;
	}
	else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
		window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY="scroll";
		document.body.style.overflowX="auto";
		document.body.style.overflowY="auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
			if(typeof FB !== 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent; 
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer=-1;
			}
			document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
		}
		catch (fberr) {}
	}

	var version = 'RepeatJob Vegas v1.11 beta', jobstodo = 0, job = 0, onevent = 'Pause', wait1 = 1, wait2 = 3, bankwithdraw = 'No', combinedloot='';
	var bossenergy = parseFloat(document.getElementById('user_max_energy').innerHTML*0.2).toFixed(0);
	var exp_gained = 0, energy_spent = 0, stamina_spent = 0, lootcount = 0, run = 1, job_exp = 0;
	var money_gained = 0, money_banked = 0, bankamount = 0, jobcashneed = 0, sign = 'V$';
	var master = 0, wheel = 0, bag = 0;
	var content = document.getElementById('content_row');
	var log_size = 10, log_keep=/(mastered|completed|secret|Lost)/, timestamping = true;
	var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
	var personid = /([a-z]\|([0-9]+))/.exec(userid)[2];
	var object = {},objectdata = {};	
	var opponent = '', opponentnumber = 0, oid;
	var jobid, tabid, jobsig;
	var errors = 0;
	var userattack = 0, userdefense = 0, userattackstart = 0, userdefensestart = 0;
	var lost = 0, won = 0;
	var missing_items = false, missing_item = '', loot = '';
	var popups = [], stronglist = [];
	var mafiasize = (parseInt(document.getElementById('user_group_size').innerHTML) > 501)?500:parseInt(document.getElementById('user_group_size').innerHTML-1);
	var mafialvl = parseInt(document.getElementById('user_level').innerHTML-1);
	var debug = false;

	function get_selected_jobinfo() {
		var thejob = document.evaluate('//div[@class="job_info"][@style[contains(string(),"4px")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (thejob.snapshotItem(0) === undefined || thejob.snapshotItem(0) === null) {
			thejob = document.evaluate('//div[@class="job_info lacking_requirements"][@style[contains(string(),"4px")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (thejob.snapshotItem(0) === undefined || thejob.snapshotItem(0) === null) {
				alert('Error: You need to do a job once (or highlight it) before launching bookmarklet!\n\nThis bookmarklet is for Las Vegas only!\n\nFor other cities use RepeatJob Beta found at:\nhttp://www.spockholm.com/mafia/testing.php');
				return;
			}
		}
		jobid = thejob.snapshotItem(0).id.substr(3);
		//tabid = document.getElementsByClassName('tab_on')[0].id.substr(4);
		tabid = $('.tab_on')[0].id.substr(4);
		jobcashneed = thejob.snapshotItem(0).getElementsByClassName('vegas_cash_icon')[0];
		if (jobcashneed = thejob.snapshotItem(0).getElementsByClassName('vegas_cash_icon')[0]) {
			jobcashneed = p(thejob.snapshotItem(0).getElementsByClassName('vegas_cash_icon')[0].innerHTML);
		}
		// var button = document.evaluate('//div[@class="job_info"][@style[contains(string(),"4px")]]//div[@id="fight_opponents"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		// if (button.snapshotItem(0) !== null) {
			// opponent = /(p\|(\d+))/g.exec(button.snapshotItem(0).innerHTML)[1];
			// jobsig = /([a-f0-9]{32})/g.exec(button.snapshotItem(0).innerHTML)[1];
		// }
		
	}
	
	// createCookie from Vern's Toolkit http://vern.com/mwtools/
	function createCookie(name,value) {
		// expire 7 days from now
		var expires = new Date();
		expires.setDate(expires.getDate()+7);
		document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
	}

	// readCookie from Vern's Toolkit http://vern.com/mwtools/
	function readCookie(name) {
		var i,
			cookie,
			nameEQ = name+"=",
			cookieArray = document.cookie.split(";");
		for (i=0; i< cookieArray.length; i++) {
			cookie = cookieArray[i];
			while (cookie.charAt(0)==' ')
				cookie = cookie.substring(1,cookie.length);
			if (cookie.indexOf(nameEQ) == 0)
				return cookie.substring(nameEQ.length,cookie.length);
		}
		return null;
	}
	
	function p(s) {
		return parseInt(s.replace(/[^\d]/g,''));
	}

	function read_settings() {
		var settings = readCookie('rjv_settings');
		if (settings == null || settings == 'undefined') {
			settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount+'|'+mafiasize+'|'+mafialvl+'|'+bankwithdraw;
			createCookie('rjv_settings',settings);
		}
		var parameters = settings.split('|');
		if (parameters.length < 8) {
			settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount+'|'+mafiasize+'|'+mafialvl+'|'+bankwithdraw;
			createCookie('rjv_settings',settings);
			parameters = settings.split('|');
		}
		if (isNaN(parameters[0])) { wait1 = 1; } else { wait1 = p(parameters[0]); }
		if (isNaN(parameters[1])) { wait2 = 3; } else { wait2 = p(parameters[1]); }
		if (oneventtest=/(Continue|Pause)/.exec(parameters[2])) { onevent = oneventtest[1]; } else { onevent = 'Continue'; };
		if (isNaN(parameters[3])) { log_size = 15; } else { log_size = p(parameters[3]); }
		if (isNaN(parameters[4])) { bankamount = 0; } else { bankamount = p(parameters[4]); }
		if (isNaN(parameters[5])) { mafiasize = 500; } else { mafiasize = p(parameters[5]); }
		if (isNaN(parameters[6])) { mafialvl = 500; } else { mafialvl = p(parameters[6]); }
		if (banktest=/(Yes|No)/.exec(parameters[7])) { bankwithdraw = banktest[1]; } else { bankwithdraw = 'No'; };
	}
	function write_settings() {
		var settings = wait1+'|'+wait2+'|'+onevent+'|'+log_size+'|'+bankamount+'|'+mafiasize+'|'+mafialvl+'|'+bankwithdraw;
		createCookie('rjv_settings',settings);
	}

	read_settings();	
	
	function imgurl(img,w,h,a) {
		return '<img src="http://mwfb.static.zynga.com/mwfb/graphics/'+img+'" width="'+w+'" height="'+h+'" title="'+a+'" alt="'+a+'">';
	}

	var cashid = 'user_cash_vegas';
	var banking = true;
	// switch (xw_city) {
		// case '1':
		// cashid = 'user_cash_nyc';
		// break;
		// case '2':
		// cashid = 'user_cash_cuba';
		// break;
		// case '3':
		// cashid = 'user_cash_moscow';
		// break;
		// case '4':
		// cashid = 'user_cash_bangkok';
		// break;
		// case '5':
		// cashid = 'user_cash_vegas';
		// break;
	// }
	
	var levelup = imgurl('icon_promote_up_15x15_01.gif','13','13','Level up');
	var star = imgurl('icon_star_16x16_gold_01.gif','13','13','Mastered Job or Tier');
	var mastermind = imgurl('icon_experience_16x16_01.gif','13','13','Mastermind bonus, 50% more exp');
	var wheelman = imgurl('icon-energy.gif','13','13','Wheelman bonus, no energy spent');
	var bagman = imgurl('icon_cash_16x16_01.gif','13','13','Bagman bonus, double cash');
	//var jobhelp = imgurl('icon_jobhelp_16x16_01.gif','13','13','Job help button');
	var staminaimg = imgurl('icon_stamina_16x16.png','13','13','Stamina');
	
	var style = '<style type="text/css">'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888;margin 0;padding 0;background: #000; color: #FFF; width: 32px;}'+
		'#play{display:none}'+
		'#pause{display:inline}'+
		'#close{display:inline}'+			
	'</style>';

	var bankingrow = ' &nbsp; <img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png" width="12" height="12">Bank above $<input id="bankamount" type="text" value="'+bankamount+'" maxlength="9" style="width:65px" />';
	var bankwithdrawrow = ' Withdraw: <a href="#" id="bankwithdraw">'+bankwithdraw+'</a>';
//	var bankingrow = '';
	var config_html = style+
	'<table class="messages" >'+
	'<tr><td colspan="3" align="right" style="text-align:right;font-size:1.1em;">'+version+' by <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php" id="donate" alt="Donate a pint" target="_blank">Donate</a> - <a href="http://www.spockholm.com/mafia/help.php" alt="Help" target="_blank">Help</a> - '+
		'<a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" alt="Play" title="Play" width="16" height="16"></a>'+
		'<a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" alt="Pause" title="Pause" width="16" height="16"></a>'+
		'<a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" alt="Close" title="Close" width="16" height="16"></a>'+
	'</td></tr>'+
	'<tr><td colspan="3"><hr /></td></tr>'+
	'<tr>'+
		'<td>Jobs done:</td><td><span id="jobs">0</span> of <input id="jobstodo" name="jobstodo" type="text" value="'+jobstodo+'" maxlength="4" /> (0 = Unlimited)'+bankingrow+bankwithdrawrow+'</td>'+
		'<td align="right" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" />sec</td></tr>'+
	'<tr>'+
		'<td>Stats:</td>'+
		'<td>Exp: <span id="exp_gained" class="good"></span> <span id="exp_ratio" class="more_in"></span>&nbsp;<span id="lost"></span>&nbsp;Money: <span id="money_gained"></span>&nbsp;<span class="more_in" id="money_banked"></span></td>'+
		'<td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on event</td>'+
	'</tr>'+
	'<tr id="topmafia_row" style="display:none;"><td>Top Mafia:</td><td colspan="2"><span id="topmafia_stats"></span></td></tr>'+
	'<tr id="options_row"><td>Pause options:</td>'+
		'<td colspan="2"><input id="energytoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">&nbsp;&nbsp;'+
		'<input id="staminatoexpratio" type="text" value="0" maxlength="4" /> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Stamina needed per Energy">&nbsp;&nbsp;'+
		'<input id="exptolevel" type="text" value="0" maxlength="4" /> exp to level&nbsp;&nbsp;'+
		'<input id="energyremain" type="text" value="0" maxlength="6" style="width:50px;" /> energy remaining&nbsp;<span class="more_in">(min '+bossenergy+' for boss fight)</span>'+
	'</td></tr>'+
	//'<tr id="farm_row" style="display:none;"><td>Farming:</td><td colspan="2">Tokens:<input type="checkbox" id="tokens"> &nbsp; Cards:<input type="checkbox" id="cards"></td></tr>'+
	'<tr><td>Status:</td><td colspan="2" id="status"></td></tr>'+
	'<tr><td>Strength:</td><td colspan="2"><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_attack_22x16_01.gif" width="22" height="16" /><span id="userattack"></span> <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_defense_22x16_01.gif" width="22" height="16" /><span id="userdefense"></span> &nbsp; &nbsp; <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16.png" width="22" height="16" />Target Limits: &nbsp; Mafia: <input id="mafiasize" type="text" value="'+mafiasize+'" maxlength="4" /> &nbsp; Level: <input id="mafialvl" type="text" value="'+mafialvl+'" maxlength="4" /></td></tr>'+
 	// '<tr>'+
		// '<td valign="top"><a href="#" id="popupshow">Hide</a> popups:</td>'+
		// '<td colspan="2"><span id="popups"></span></td>'+
	// '</tr>'+
	'<tr><td colspan="3"><hr /></td></tr>'+
	'<tr>'+
		'<td valign="top"><a href="#" id="lootshow">Hide</a> loot:</td>'+
		'<td colspan="2"><span id="lootstats"></span><br /><span id="loot">No loot found yet.</span></td>'+
	'</tr>'+
	'<tr><td valign="top"><a href="#" id="logshow">Show</a> Log:<br />Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /></td><td colspan="2" id="log"></td></tr>'+
	'</table>';

	var WeaponsDepot = ['Forge','Arc Welder','Buzzsaw','Gunpowder','Gun Drill','Sonic Emitter','Weapon Part','Grapple','Boomerang','Railgun Barrel','Laser Rangefinder','Explosive Arrow','Portable Fusion Reactor'];
	var ChopShop = ['Cement Block','Power Tool','Car Lift','Acetylene Torch','Shipping Container','Car Part','High Tech Car Part','Cuban Car Part','Thai Car Part','Russian Car Part','Solar Panel','Bulletproof Glass'];
	var WeaponsDepotCount = 0;
	var ChopShopCount = 0;
	var loots=new Array();
	function add_loot(s, c) {
		var replacetext = /(was used to build and upgrade the)|(- Used to build and upgrade the )(Weapons Depot|Chop Shop)/;
		s = s.replace(replacetext,'');
		// if (s.search(WeaponsDepot) > -1) {
			// s = '<span class="more_in">(WD)</span> '+s;
			// (c > 1?WeaponsDepotCount+=c:WeaponsDepotCount++);
		// }
		// if (s.search(ChopShop) > -1) {
			// s = '<span class="more_in">(CS)</span> '+s;
			// (c > 1?ChopShopCount+=c:ChopShopCount++);
		// }
		// if (s.search(HighEnd) > -1) {
			// s = '<span class="more_in">[HeL]</span> '+s;
			// (c > 1?HighEndCount+=c:HighEndCount++);
		// }
		var f = -1;
		for (var i = 0; i < loots.length && f == -1; ++i) {
			if (loots[i][0] == s) {
				f = i;
			}
		}
		if (c == null || c == undefined) c = 1;
		if (f != -1) {
			loots[f][1] += c;
		}
		else {
			loots[loots.length] = new Array(s, c);
			loots.sort();
			//console.log(loots);
			loots.reverse();
		}
		var t = '';
		(c > 1?lootcount+=c:lootcount++);
		for (var i = 0; i < loots.length; ++i) {
			//t += '<span class="good">'+loots[i][1]+'x</span> '+loots[i][0]+'<br />';
			t += '<span class="good" '+(loots[i][1]<10?'style="margin-right:9px;"':'')+'>'+loots[i][1]+'x</span> '+loots[i][0]+' <span class="more_in">('+parseFloat((loots[i][1]/lootcount)*100).toFixed(1)+'%)</span><br />';
		}
		combinedloot = t;
		return false;
	}
	function add_loot2(s, img, from) {
		var WeaponsDepot = /Forge|Arc Welder|Buzzsaw|Gunpowder|Gun Drill|Sonic Emitter|Weapon Part|Grapple|Boomerang|Railgun Barrel|Laser Rangefinder|Explosive Arrow|Portable Fusion Reactor/;
		var ChopShop = /Cement Block|Power Tool|Car Lift|Acetylene Torch|Shipping Container|Car Part|High Tech Car Part|Cuban Car Part|Thai Car Part|Russian Car Part|Solar Panel|Bulletproof Glass|Suspension Coil|Flux Compressor/;
		var Vegas = /Deposit Box|Magnetic Lock|Motion Sensor|Reinforced Steel|Security Camera|Concrete|Construction Tool|Steel Girder|Cinder Block|Bellhop|Chef|Poker Table|Slot Machine|Casino Dealer/;
		var MHEL = /Zmeya Carbon Blade|Ubijca Assault Rifle|Konstantin Cargo Carrier|Executive Overcoat|Shturmovik|Zoloto Sports Car/;
		var FHEL = /12 Gauge|Devastator|Zeus|Bomb Suit|Segmented Body Plate|Skull Cap|Cobra G7|Ruby Red|Turbo Road Warrior|Condor|Cougar|Rhinoceros/;
		var FHEL2 = /Woodsman|Buzzard Combat Chopper|Tasmanian Devil|Domestic Defense/;
		var BHEL = /Nak Kha Shotgun|Titanium Katar|Ninja|Royal Thai Marine|Raed Armored Sedan|Lamang Motorcycle|Chain Viper|Forest Scorpion/;
		var Energy = /Boosted Smoothie|Blueprints|Cappuccino|Chess Master|Faberge Hen|Fixer|Free Ride|Hidden Matryoshka|Inside Tip|Truck Driver|Problem Solver/;
		var Top6 = /Reward Point|Skill Point|100 Free Experience|Lotto Ticket|Stamina Boost|Energy Boost/;
		var Animals =/Arabian Leopard|Badger|Buffalo|Cassowary|Dingo|Electric Eel|Piranha|Kangaroo/;
		var Boss =/Shiv|Grenade|Stun Gun|Health Kit|Getaway Driver/;
		var Consumable = /Liquor|Set of Tokens|Set of Cards|Wiretap Device|Bollywood Film Reel/;
		
		var f = -1;

		for (var i = 0; i < Loots.length && f == -1; ++i) {
			if (Loots[i][1] == s) { f = i; }
		}
		if (f != -1) {
			Loots[f][2]++;
			if (from.length > 0)
				Loots[f][4] = Loots[f][4] + ', ' + from;
			else
				Loots[f][4] = '';
		}
		else {
			var type = 'Misc';
			if (/\$|Thai Baht/.test(s)) { type = 'Money'; }
			else if (/Wishlist/.test(s)) { type = 'Wishlist'; }
			else if (s.search(WeaponsDepot) > -1) { type = 'Weapons Depot'; }
			else if (s.search(ChopShop) > -1) { type = 'Chop Shop'; }
			else if (s.search(Vegas) > -1) { type = 'Vegas'; }
			else if (s.search(Top6) > -1) { type = 'Top6'; }
			else if (s.search(Animals) > -1) { type = 'Animals'; }
			else if (/(?:http:..mwfb.static.zynga.com.mwfb.graphics\/)(.*)(?:\/.*.(?:gif|png))/.test(img)) { type = /(?:http:..mwfb.static.zynga.com.mwfb.graphics\/)(.*)(?:\/.*.(?:gif|png))/.exec(img)[1]; }
			if (type == 'v3') { type = 'Misc'; }
			if (from.length > 0) {
				Loots[Loots.length] = new Array(type, s, 1, img, 'From, ' + from);
			}
			else {
				Loots[Loots.length] = new Array(type, s, 1, img, '');
			}
		}
		var t = '<table cellpadding=0 cellspacing=0>';

		Loots.sort();
		var header = '';

		for (var i = 0; i < Loots.length; ++i) {
			if (header != Loots[i][0]) {
				header = Loots[i][0];
				t += '<tr><td colspan=2><span class="good"> ' + Loots[i][0] + ' :</span></td></tr>';
			}

			t += '<tr><td width="50"></td><td><span class="good"> '+Loots[i][2]+'x</span> <img src="'+Loots[i][3]+'" width="23px" height="23px" />'+Loots[i][1]+' - '+Loots[i][4]+'</td></tr>';
		}
		combinedloot = t + '</table>';
	}
	
	function timestamp() {
		now = new Date();
		var CurH = now.getHours();
		CurH = (CurH<10?'0'+CurH:CurH);
		var CurM = now.getMinutes();
		CurM = (CurM<10?'0'+CurM:CurM);
		if (timestamping) { return '<span class="more_in">['+CurH+':'+CurM+']</span> '; }
		else { return ''; }
	}
	
	function commas(s) {
		while (d=/(-)?(\d+)(\d{3}.*)/.exec(s)) {
			s = (d[1]?d[1]+d[2]+','+d[3]:d[2]+','+d[3]);
		}
		return s;
	}
	
	function msg(s) {
		document.getElementById('status').innerHTML=s;
	}
	
	// From Vern's toolkit.js, http://vern.com/mwtools/
	// log puts a message in the log array and outputs it
	// limit is how many log lines we keep (0 == infinite)
	// keep is a regex of lines that we never delete
	logs = [];
	extralog = [];
	function logtrunc(message,limit,keep) {
		logs.unshift(message);
		if (limit > 0) {
			if (logs.length>limit) {
				message=logs.pop();
				if ((keep.test) && (keep.test(message)))
						extralog.unshift(message);
			}
		}
		if ((document.getElementById('log')) && (document.getElementById('log').nodeName == 'TD')) {
			document.getElementById('log').innerHTML=logs.concat(extralog,'').join('<br/>');
		}
	}
	
	function log(s) {
		document.getElementById('donate').style.color = (job%3==1?'#E00000':'');
		var ratio = exp_gained/energy_spent;
		document.getElementById('delay1').value = wait1;
		document.getElementById('delay2').value = wait2;
		document.getElementById('jobs').innerHTML = job;
		if (lost > 0) { document.getElementById('lost').innerHTML='<span class="more_in">Lost: '+lost+' ('+(lost/job*100).toFixed(1)+'%)</span>'; }
		//document.getElementById('jobenergy').innerHTML = '('+energy_spent+' energy)';
		document.getElementById('exp_gained').innerHTML = exp_gained;
		document.getElementById('exp_ratio').innerHTML = ((ratio > 0 || ratio !='Infinity')?'('+ratio.toFixed(2)+'/en)':'')
		document.getElementById('money_gained').innerHTML = '<strong class="'+(money_gained>=0?'cur_cash':'bad')+'">'+sign+commas(money_gained)+'</strong>';
		document.getElementById('money_banked').innerHTML = '(Banked: '+sign+commas(money_banked)+')';
		if (master > 0 || wheel > 0 || bag > 0) {
			document.getElementById('topmafia_row').style.display = '';
			var masterratio = ' <span class="more_in">('+parseFloat(master/job*100).toFixed(0)+'%)</span>&nbsp;';
			var wheelratio = ' <span class="more_in">('+parseFloat(wheel/job*100).toFixed(0)+'%)</span>&nbsp;';
			var bagratio = ' <span class="more_in">('+parseFloat(bag/job*100).toFixed(0)+'%)</span>&nbsp;';
			document.getElementById('topmafia_stats').innerHTML = (master>0?mastermind+'x'+master+masterratio:'')+(wheel>0?wheelman+'x'+wheel+wheelratio:'')+(bag>0?bagman+'x'+bag+bagratio:'');
		}
		var l = document.getElementById('log');
		//l.innerHTML = timestamp()+s + '.<br />' + l.innerHTML;
		logtrunc(s,log_size,log_keep);
		//document.getElementById('loot').innerHTML='' + lootcount + '/' + job + ' &nbsp; (' + (lootcount/job*100).toFixed(1) + '%) <br/>' + combinedloot;
		document.getElementById('loot').innerHTML = combinedloot;
		document.getElementById('lootstats').innerHTML = lootcount+'/'+job+'&nbsp; ('+parseFloat(lootcount/job*100).toFixed(1)+'%)';
		
		document.getElementById('userattack').innerHTML = (userattack>userattackstart)?commas(userattack)+' (<span class="good">+'+commas(userattack-userattackstart)+'</span>)':commas(userattackstart);
		document.getElementById('userdefense').innerHTML = (userdefense>userdefensestart)?commas(userdefense)+' (<span class="good">+'+commas(userdefense-userdefensestart)+'</span>)':commas(userdefensestart);
	}
	
	function pausecheck(s) {
		if (onevent == 'Pause') {
			run = 1;
			pauseevent=s;
		}
	}
	
	function myRandom(min,max) {
		return min +  Math.floor(Math.round((Math.random() * (max - min))));
	}
	
	function pausing(seconds,message,resume_func) {
		var delay = (seconds > 0)? delay=0 : delay=0;
		// if the message was left out, shuffle things a bit
		if (typeof(message) == 'function') {
			resume_func = message;
			message = null;
		}
		if (message)
			message=message;
		else
		message='Pausing';
		msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
		//var me = this;
		var timer = setInterval(function(){//)
			seconds--;
			if (document.getElementById('seconds'))
				document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
			else
				clearInterval(timer);
			if (seconds<=0) {
				clearInterval(timer);
				if (typeof(resume_func) == 'function')
					resume_func();
			}
		},delay);
	}
	
	//function for clicking buttons
	function fireEvent(obj,evt){
		var fireOnThis = obj;
		if( document.createEvent ) {
			var evObj = document.createEvent('MouseEvents');
			evObj.initEvent( evt, true, false );
			fireOnThis.dispatchEvent(evObj);
		}
		else if( document.createEventObject ) {
			fireOnThis.fireEvent('on'+evt);
		}
	}
	function create_div() {
		if (document.getElementById('spockdiv')) {
			document.getElementById('spockdiv').innerHTML = config_html;
		}
		else {
			var spock_div = document.createElement("div");
			spock_div.id = 'spockdiv';
			spock_div.innerHTML = config_html;
			content.insertBefore(spock_div, content.firstChild);
		}
	}
	
	var user_health = 0, user_energy = 0, user_stamina = 0, user_experience = 0, expneed = 0, job_energy = 0;
	var ratiolvl = 0.0, ratiolvl2 = 0.0, ratiolvl3 = 0.0;
	function stats_update(obj) {
		document.getElementById('user_cash_nyc').innerHTML = obj['user_fields']['user_cash_nyc'];
		document.getElementById('user_cash_cuba').innerHTML = obj['user_fields']['user_cash_cuba'];
		document.getElementById('user_cash_moscow').innerHTML = obj['user_fields']['user_cash_moscow'];
		document.getElementById('user_cash_bangkok').innerHTML = obj['user_fields']['user_cash_bangkok'];
		document.getElementById('user_cash_vegas').innerHTML = obj['user_fields']['user_cash_vegas'];
		document.getElementById('user_cash_italy').innerHTML = obj['user_fields']['user_cash_italy'];
		
		user_health = document.getElementById('user_health').innerHTML = parseInt(obj['user_fields']['user_health']);
		user_energy = document.getElementById('user_energy').innerHTML = parseInt(obj['user_fields']['user_energy']);
		user_max_energy = document.getElementById('user_max_energy').innerHTML = parseInt(obj['user_fields']['user_max_energy']);
		user_stamina = document.getElementById('user_stamina').innerHTML = parseInt(obj['user_fields']['user_stamina']);
		user_max_stamina = document.getElementById('user_max_stamina').innerHTML = parseInt(obj['user_fields']['user_max_stamina']);

		try {
			//exp_for_next_level = document.getElementById('exp_for_next_level').innerHTML = parseInt(obj['user_fields']['exp_for_next_level']);
			user_experience = document.getElementById('user_experience').innerHTML = parseInt(obj['user_fields']['user_experience']);
			//expneed = exp_for_next_level-user_experience;
			expneed = document.getElementById('exp_to_next_level').innerHTML = parseInt(obj['user_fields']['exp_to_next_level']);
			ratiolvl = expneed/user_energy;
			ratiolvl2 = expneed/user_stamina;
			ratiolvl3 = expneed/(user_energy+user_stamina);
			(Math.abs(ratiolvl)<10)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br>(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
			document.getElementById('level_bar').style.width = obj['user_info']['percent_complete']+'%';
		}
		catch (newlayouterr) {
			exp_to_next_level = parseInt(obj.user_fields.exp_to_next_level);
			//exp_for_next_level = parseInt(obj['user_fields']['exp_for_next_level']);
			//user_experience = parseInt(obj['user_fields']['user_experience']);
			if (document.getElementById('exp_to_next_level')) {
				//expneed = document.getElementById('exp_to_next_level').innerHTML = exp_for_next_level-user_experience;
				expneed = document.getElementById('exp_to_next_level').innerHTML = exp_to_next_level;
			}
			else {
				//expneed = document.getElementById('user_xp_to_next_level').innerHTML = exp_for_next_level-user_experience;
				expneed = document.getElementById('user_xp_to_next_level').innerHTML = exp_to_next_level;
			}
			ratiolvl = expneed/user_energy;
			ratiolvl2 = expneed/user_stamina;
			ratiolvl3 = expneed/(user_energy+user_stamina);
			(Math.abs(ratiolvl)<10)?(d=2):(d=0);
			(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
			(Math.abs(ratiolvl3)<10)?(d3=2):(d3=0);
			if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
			if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
			if(ratiolvl3=='Infinity') { ratiolvl3=0; d3=0; }
			if (document.getElementById('exp_to_next_level')) {
				//document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementsByClassName('experience')[0].innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar').style.width = obj['user_info']['percent_complete']+'%';
			}
			else {
				//document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span>';
				document.getElementById('user_experience').innerHTML='(<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">)(<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">'+(ratiolvl3).toFixed(d3)+'</span><br />To next level: <span id="exp_to_next_level" class="energy_highlight">'+expneed+'</span>';
				document.getElementById('level_bar_new_header').style.width = obj['user_info']['percent_complete']+'%';
			}
		}
	}
	
	function banker(cash,city,deposit) {
		var cb = userid+unix_timestamp();
		var params = {
			'ajax': 1, 
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'liteload': 1,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'amount': cash,
			'city': city,
			'xw_city': city,
			'xw_person': personid
		};
		if (deposit) {
			var url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6';
		}
		else {
			var url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankWithdrawal&building_type=6';		
		}
		if (banking) {
			$.ajax({
				type: "POST",
				url: url,
				data: params,
				success: function (bankresponse){
					try {
						bankobject = eval("("+bankresponse+")");
						bankdata = eval("("+bankobject['data'].replace(/\\"/g,'')+")");
						if (debug) {
							console.log(bankdata['success_message']); 
							console.log(bankdata['cities'][4]['name']+' '+bankdata['cities'][4]['city']+' '+bankdata['cities'][4]['cash_amt']); 
						}
						//document.getElementById('user_cash_nyc').innerHTML = '$'+commas(bankdata[0]['cash_amt']);
						//document.getElementById('user_cash_cuba').innerHTML = 'C$'+commas(bankdata[1]['cash_amt']);
						//document.getElementById('user_cash_moscow').innerHTML = 'R$'+commas(bankdata[2]['cash_amt']);
						//document.getElementById('user_cash_bangkok').innerHTML = 'B$'+commas(bankdata[3]['cash_amt']);
						//var deposit = bankdata['success_message'];
						// if (/The (bank|vault) can only hold/.test(bankresponse)) {
							// banking = false;
						// }
						// switch (city) {
							// case '1':
								// document.getElementById(cashid).innerHTML = /user_cash_nyc":"(.*?)"/.exec(bankresponse)[1];
								// break;
							// case '2':
								// document.getElementById(cashid).innerHTML = /user_cash_cuba":"(.*?)"/.exec(bankresponse)[1];
								// break;
							// case '3':
								// document.getElementById(cashid).innerHTML = /user_cash_moscow":"(.*?)"/.exec(bankresponse)[1];
								// break;
							// case '4':
								// document.getElementById(cashid).innerHTML = /user_cash_bangkok":"(.*?)"/.exec(bankresponse)[1];
								// break;
							// case '5':
								// document.getElementById(cashid).innerHTML = /user_cash_vegas":"(.*?)"/.exec(bankresponse)[1];
								// break;
							// }
						//console.log(deposit[1]);
						//msg('Banked '+deposit[1]+' of '+commas(cash));
						//deposited += p(/>([A-Z]?\$([\d,]+))</.exec(bankresponse)[1]);
						//log(timestamp()+' Bank: '+deposit[1].replace(/<([^>]+)>/g,''));
						//document.getElementById('user_cash_vegas').innerHTML = 'V$'+commas(bankdata['cities'][4]['cash_amt']);
						document.getElementById('user_cash_vegas').innerHTML = bankobject['user_fields']['user_cash_vegas'];
						if (/You Deposited/.test(bankdata['success_message'])) {
							money_banked += p(/You Deposited [A-Z]?\$([\d,]+) into your Vault/.exec(bankdata['success_message'])[1]);
							log(timestamp()+' <img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png" width="12" height="12">Bank: '+bankdata['success_message']);
						}
						if (/You Withdrew/.test(bankdata['success_message'])) {
							money_banked -= p(/You Withdrew [A-Z]?\$([\d,]+) from your Vault/.exec(bankdata['success_message'])[1]);
							log(timestamp()+' <img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png" width="12" height="12">Bank: '+bankdata['success_message']);
						}
						// Vault full = 'You cannot deposit any more'
						if (/You cannot deposit any more/.test(bankdata['success_message'])) {
							bankamount = 0;
							document.getElementById('bankamount').value = 0;
							log(timestamp()+' <span class="bad">Banking failed because</span>: '+bankdata['success_message']);
						}
						// Not enough money on hand = 'You cannot deposit this much'
						if (/You cannot deposit this much/.test(bankdata['success_message'])) {
							log(timestamp()+' <span class="bad">Banking failed because</span>: '+bankdata['success_message']);
						}
					}
					catch (ignorebank) { 
						if(debug) { console.log('Bank error: '+ignorebank); } 
					}
					var wait = myRandom(parseInt(wait1),parseInt(wait2));
					setTimeout(function(){ repeat_job(jobid,tabid,oid,jobsig); },wait*1000);
				}
			});
		}
	}
	function repeat_job(jid,tid,oid,jsig) {
	//console.log(jid+' '+tid+' '+oid+' '+jsig);
		if(isNaN(jid) || isNaN(tid)) {
			log(timestamp()+'<span class="bad">Error! JobID and TabID was not defined!</span>');
			msg('<span class="bad">Error! JobID and TabID was not defined!</span>');
			return;
		}
		else if ((expneed < eval(job_exp*1.5)) && (onevent == 'Pause')) {
			msg('Could gain level on next repeat, pausing...');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if ((objectdata['job_results'] !== undefined) && (objectdata['job_results']['is_job_mastered']) && (onevent == 'Pause')) {
			msg('Job mastered, pausing...');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if ((job >= jobstodo) && (jobstodo != 0)) { 
			msg('Done working. Taking a break after '+job+' jobs.'); 
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
			document.getElementById("jobstodo").style.border = '3px solid #FF0000';
		}
		else if (expneed < parseInt(document.getElementById('exptolevel').value)) {
			msg('Stopping because '+expneed+' is lower than '+parseInt(document.getElementById('exptolevel').value)+', your stop limit.');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if ((user_energy < parseInt(document.getElementById('energyremain').value)+parseInt(job_energy)) && (parseInt(document.getElementById('energyremain').value) > 0)) {
			msg('You could cross Energy Remain on next repeat. Pausing...');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if ((ratiolvl.toFixed(2) <= parseFloat(document.getElementById('energytoexpratio').value)) && (user_energy > 0) && (parseFloat(document.getElementById('energytoexpratio').value) > 0)){
			msg('You have crossed your Energy to Experience Ratio. Pausing...');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if ((ratiolvl2.toFixed(2) <= parseFloat(document.getElementById('staminatoexpratio').value)) && (user_stamina > 0) && (parseFloat(document.getElementById('staminatoexpratio').value) > 0)){
			msg('You have crossed your Stamina to Experience Ratio. Pausing...');
			run = 1;
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
		else if (run == 1) {
			if (p(document.getElementById(cashid).innerHTML) > bankamount && bankamount > 0 && run != 1) {
				banker(p(document.getElementById(cashid).innerHTML),5,true);
			}
			else {
				do_job('http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=map&xw_action=dojob&xw_city=5&job='+jid+'&tab='+tid+'&opponent_id='+oid+'&job_sig='+jsig);
			}
		}
		else {
			msg('Pausing...');
			document.getElementById("pause").style.display = 'none';
			document.getElementById("play").style.display = 'inline';
		}
	}
	
	function pick_weakest(obj) {
		if (debug) { console.log('Unsorted '+obj[0].level+' '+obj[0].group_size+' '+obj[0].id+'  '+obj[1].level+' '+obj[1].group_size+' '+obj[1].id+'  '+obj[2].level+' '+obj[2].group_size+' '+obj[2].id); }
		
		obj.sort(function(a,b) { return parseInt(a.group_size) - parseInt(b.group_size) } );
		if (parseInt(obj[0].group_size) == 501) {
			if (debug) { console.log('All have 501 mafia, sorting by level instead.'); }
			obj.sort(function(a,b) { return parseInt(a.level) - parseInt(b.level) } );
		}
		
		if (debug) { console.log('Sorted '+obj[0].level+' '+obj[0]['group_size']+' '+obj[0].id+'   '+obj[1].level+' '+obj[1]['group_size']+' '+obj[1].id+'   '+obj[2].level+' '+obj[2]['group_size']+' '+obj[2].id); }
		if (debug) { console.log('Picked opponent: '+obj[0]['level']+' '+obj[0]['group_size']+' '+obj[0]['id']); }
		//log('Picked opponent: '+obj[0]['level']+' '+obj[0]['group_size']+' '+obj[0]['id']+' '+obj[0]['name']);
		return obj;
	}
	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
	}	
	function do_job(url) {
		cb = userid+unix_timestamp();
		var params = {
			'click_origin': 'sidepanel_button',
			'ajax': 1, 
			'liteload': 1, 
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'cb': cb,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'tmp': ''
		};
		$.ajax({
			type: "POST",
			url: url,
			data: params,
			timeout: 10000,
			success: function (response){
				try {
					object = eval("("+response+")");
					objectdata = eval("("+object['data'].replace(/\\"/g,'')+")");
				}
				catch (responsenotcomplete) {
					log(timestamp()+'<span class="bad">Page not loaded properly, retrying...</span>');
					get_selected_jobinfo();
					repeat_job(jobid,tabid,oid,jobsig);
					return;
				}
				if ((object['popup'] !== undefined)) {
					popups.push(object['popup'].replace(/\\"/g,''));
					var new_popup = document.createElement("div");
					new_popup.id = object['popup_id'];
					document.getElementById('popup_fodder').insertBefore(new_popup, document.getElementById('popup_fodder').firstChild);
					$("#"+object['popup_id']).append(popups[popups.length-1]);

					if (/level_up_popup_rewards/.test(popups[popups.length-1]) && (onevent == 'Pause')) {
						//items = '(Level up!)  ';
						log(timestamp()+'Gained a level!');
						run = 1;
					}
					else {
						//console.log(object['popup'].replace(/\\"/g,''));
						//popups.push(object['popup'].replace(/\\"/g,''));
						var items = '  ';
						//console.log(popups[popups.length-1]);
						var regex = /alt="(.*?)"/g;
						while((m = regex.exec(popups[popups.length-1])) != null) {
							//console.log(m[1]);
							items += m[1]+', ';
						}
						log(timestamp()+'Found a popup with: '+items.slice(0,items.length-2));
					}
						//var popupshtml = document.getElementById('popups').innerHTML;
						//document.getElementById('popups').innerHTML = ' Popup #'+popups.length+' <a href="#" id="rjvpop'+popups.length+'">'+items.slice(0,items.length-2)+'</a><br />'+popupshtml;
						
						//var new_popup = document.createElement("div");
						//new_popup.id = object['popup_id'];
						//document.getElementById('popup_fodder').insertBefore(new_popup, document.getElementById('popup_fodder').firstChild);
						//document.getElementById(object['popup_id']).innerHTML = popups[popups.length-1];
						//$("#"+object['popup_id']).append(/(.*?<\/div>)<script/.exec(popups[popups.length-1])[1]);
						//$("#"+object['popup_id']).append(popups[popups.length-1]);
						//$("#"+object['popup_id']).append(popups[popups.length-1].slice(0,popups[popups.length-1].length-340));
						//var pop_bg = '#pop_bg_'+object['popup_id'];
						//var pop_box = '#pop_box_'+object['popup_id'].substr(4);
						//log(pop_box);

						// document.getElementById('rjvpop'+popups.length).onclick = function() {
							// setTimeout(function() {
								// this.innerHTML = this.innerHTML+' (clicked)';
								// $(pop_box).fadeIn(200);
							// }, 10);
							//document.getElementById('rjvpop'+popups.length).onclick = '';
							// return false;
						// };
					//}
				}
				
				userattack = p(object['fightbar']['group_atk']);
				userdefense = p(object['fightbar']['group_def']);
				if (userattackstart == 0) { userattackstart = userattack; }
				if (userdefensestart == 0) { userdefensestart = userdefense; }
				errors = 0;
				
				if (debug) {
					if (objectdata['job_results'] !== undefined) {
						for(var key1 in objectdata['job_results']) {
							if(!/outcome|title|fight_result|fail_message|job_expendable_consumed/.test(key1)) {
								var obj = objectdata['job_results'][key1];
								if (objectdata['job_results'][key1]['name'] !== undefined) {
									console.log(key1+objectdata['job_results'][key1]['name']);
									log(key1+objectdata['job_results'][key1]['name']);
								}
								for(var key2 in obj) {
									var attrName = key2;
									var attrValue = obj[key2];
									console.log(key1+' '+attrName+': '+attrValue);
								}
							}
						}
					}
				}
				// for(var key1 in objectdata) {
					// var obj = objectdata[key1];
					// for(var key2 in obj) {
						// var obj2 = obj[key2];
						// for(var key3 in obj2) {
							// var attrName = key3;
							// var attrValue = obj2[key3];
							// console.log(key2+' '+attrName+': '+attrValue);
						// }
					// }
				// }
				if(objectdata['job_results']['success'] == '1') {
					var exp = parseInt(objectdata['job_results']['exp_gained']) || 0;
					job_exp = exp;
					var energy = parseInt(objectdata['job_results']['energy_consumed']) || parseInt(objectdata['job_results']['stamina_consumed']) || 0;
					job_energy = energy;
					var money = parseInt(objectdata['job_results']['cash_gained']) || 0;
					
					var mastery = '';
					if (objectdata['job_results']['is_job_mastered']) {
						mastery = ' '+star+'Job mastered!';
						try {
							document.getElementById('job'+jobid).getElementsByClassName('mastery_bar')[0].innerHTML = '100% Mastered <div style="width: 100%;"><p>100% Mastered</p></div>';
						}
						catch (notcorrecttaberr) {
							if (debug) { console.log('Problem with active tab: '+notcorrecttaberr); }
						}
					}
					else {
						var mastery_percentage = parseInt(objectdata['job_results']['job_mastery_percentage']);
						if (mastery_percentage < 100) {
							mastery = ' Mastery: '+objectdata['job_results']['job_mastery_percentage']+mastery+'%';
							try {
								document.getElementById('job'+jobid).getElementsByClassName('mastery_bar')[0].innerHTML = mastery_percentage+'% Mastered <div style="width: '+mastery_percentage+'%;"><p>'+mastery_percentage+'% Mastered</p></div>';
							}
							catch (notcorrecttaberr) {
								if (debug) { console.log('Problem with active tab: '+notcorrecttaberr); }
							}
						}
					}
					
					loot = '';
					if (objectdata['job_results']['loot'] !== undefined) {
						parse_loot(objectdata['job_results']['loot']);
						//loot = '. Loot: '+imgurl(objectdata['job_results']['loot']['image'],'15','15',objectdata['job_results']['loot']['name'])+objectdata['job_results']['loot']['name'].replace(/^[A|a]n?\s/,'')+', ';
						//add_loot(objectdata['job_results']['loot']['name'].replace(/^[A|a]n?\s/,''),objectdata['job_results']['loot']['quantity']);
					}
					if (objectdata['job_results']['boss_consumable'] !== undefined) {
						parse_loot(objectdata['job_results']['boss_consumable'],'Boss');
					}
					if (objectdata['job_results']['chop_shop_loot'] !== undefined) {
						parse_loot(objectdata['job_results']['chop_shop_loot'],'CS');
					}
					if (objectdata['job_results']['casino_loot'] !== undefined) {
						parse_loot(objectdata['job_results']['casino_loot'],'Casino');
					}
					if (objectdata['job_results']['collection'] !== undefined) {
						parse_loot(objectdata['job_results']['collection'],'Collection');
					}
					var pre = '';
					if (objectdata['job_results']['no_energy_cost']) { 
						wheel++; pre = wheelman; 
					}
					if (objectdata['job_results']['bonus_cash']) {
						bag++;
						money += parseInt(objectdata['job_results']['bonus_cash']);
						pre = bagman;
						//console.log('bagman '+objectdata['job_results']['bonus_cash']);
					}
					if (objectdata['job_results']['bonus_xp']) {
						master++;
						exp += parseInt(objectdata['job_results']['bonus_xp']);
						pre = mastermind;
						//console.log('mastermind '+objectdata['job_results']['bonus_xp']);
					}
					exp_gained += exp;
					energy_spent += energy;
					if(objectdata['job_results']['cash_consumed'] !== undefined) {
						money = parseInt(-objectdata['job_results']['cash_consumed']);
						//money_gained += money;
					}
					//else {
						money_gained += money;
					//}
					job++;
					stats_update(object);
					
					if (/You lost the fight/.test(objectdata['job_results']['title'])) {
						lost++;
						//console.log(objectdata['job_results']['fail_message']);
						var target = /user=([a-zA-Z0-9%]+).*?>(.*?)</.exec(objectdata['job_results']['fail_message']);
						log(timestamp()+pre+' <span class="bad">Lost fight</span> against <a href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+target[1]+'%3D%3D%22%7D">'+target[2]+'</a> '+mastery+'. Skipping to another target...');
						// if (opponentnumber < 2) { 
							// opponentnumber++;
							// var oid = objectdata['job_fight_list'][opponentnumber]['id'];
							// jobsig = objectdata['job_fight_list'][opponentnumber]['job_sig'];
						// }
						// else {
							// opponentnumber = 0;
							// var oid = objectdata['job_fight_list'][opponentnumber]['id'];
							// jobsig = objectdata['job_fight_list'][opponentnumber]['job_sig'];
						// }
						stronglist.push(oid);
						//console.log(stronglist);
						var sorted_targets = pick_weakest(objectdata['job_fight_list']);
						//console.log('Target1 level: '+sorted_targets[0]['level']+' Mafia: '+sorted_targets[0]['group_size']+' id: '+sorted_targets[0]['id']);
						//console.log('Target2 level: '+sorted_targets[1]['level']+' Mafia: '+sorted_targets[1]['group_size']+' id: '+sorted_targets[1]['id']);
						//console.log('Target3 level: '+sorted_targets[2]['level']+' Mafia: '+sorted_targets[2]['group_size']+' id: '+sorted_targets[2]['id']);
						if (oid == sorted_targets[0]['id']) {
							oid = sorted_targets[1]['id'];
							jobsig = sorted_targets[1]['job_sig'];
							//log('Picked target '+sorted_targets[1].id+' Level: '+sorted_targets[1].level+' Mafia: '+sorted_targets[1].group_size);
							if ((sorted_targets[1].group_size > parseInt(document.getElementById('mafiasize').value)) || (sorted_targets[1].level > parseInt(document.getElementById('mafialvl').value))) {
								//log(timestamp()+'[Case 1] Weakest target: '+sorted_targets[1].name+' Level: '+sorted_targets[1].level+' Mafia: '+sorted_targets[1].group_size+' - To strong, skipping...');
								jobsig = 'undefined';
							}
						}
						else {
							oid = sorted_targets[0]['id'];
							jobsig = sorted_targets[0]['job_sig'];
							//log('Picked target '+sorted_targets[0].id+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size);
							if ((sorted_targets[0].group_size > parseInt(document.getElementById('mafiasize').value)) || (sorted_targets[0].level > parseInt(document.getElementById('mafialvl').value))) {
								//log(timestamp()+'[Case 2] Weakest target: '+sorted_targets[0].name+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size+' - To strong, skipping...');
								jobsig = 'undefined';
							}
						}
						
					}
					else if (/You won the fight/.test(objectdata['job_results']['title'])) {
						won++;
						log(timestamp()+pre+' <span class="good">Won Fight!</span> Gained <span class="good">'+exp+' exp</span> and <span class="cur_cash"><strong>V$'+commas(money)+'</strong></span>'+mastery+loot.slice(0,loot.length-2));
						//var oid = objectdata['job_fight_list'][opponentnumber]['id'];
						//jobsig = objectdata['job_fight_list'][opponentnumber]['job_sig'];
						
						var sorted_targets = pick_weakest(objectdata['job_fight_list']);
						//console.log('Target1 level: '+sorted_targets[0]['level']+' Mafia: '+sorted_targets[0]['group_size']+' id: '+sorted_targets[0]['id']);
						//console.log('Target2 level: '+sorted_targets[1]['level']+' Mafia: '+sorted_targets[1]['group_size']+' id: '+sorted_targets[1]['id']);
						//console.log('Target3 level: '+sorted_targets[2]['level']+' Mafia: '+sorted_targets[2]['group_size']+' id: '+sorted_targets[2]['id']);
						oid = sorted_targets[0]['id'];
						jobsig = sorted_targets[0]['job_sig'];
						//log('Picked target '+sorted_targets[0].id+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size);
						if ((sorted_targets[0].group_size > parseInt(document.getElementById('mafiasize').value)) || (sorted_targets[0].level > parseInt(document.getElementById('mafialvl').value))) {
							//log(timestamp()+'[Case 3] Weakest target: '+sorted_targets[0].name+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size+' - To strong, skipping...');
							jobsig = 'undefined';
						}
					}
					else {
						log(timestamp()+pre+' Gained <span class="good">'+exp+' exp</span> and '+(money<0?'spent ':'')+'<span class="'+(money_gained>0?'cur_cash':'bad')+'"><strong>V$'+commas(money)+'</strong></span>'+mastery+loot.slice(0,loot.length-2));
					}
					
					function f () {
						repeat_job(jobid,tabid,oid,jobsig)
					}
					if (jobsig === 'undefined') {
						var wait = myRandom(parseInt(wait1+5),parseInt(wait2+5));
						pausing(wait,'Refreshing target list in ',f);					
					}
					else {
						var wait = myRandom(parseInt(wait1),parseInt(wait2));
						pausing(wait,'Doing job/attack again in ',f);
					}
				}
				else if(/Need More Cash/.test(objectdata['job_results']['title']) && (document.getElementById('bankwithdraw').innerHTML == 'Yes')) {
					//log(timestamp()+' <img src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png" width="12" height="12">Bank: Need money to do this job, going to the vault.');
					var bank = parseInt(jobcashneed*3);
					// if (bank > bankamount) {
						// document.getElementById('bankamount').value = bankamount = parseInt(bankamount+bank);
					// }
					banker(bank,5,false);
				}
				else if(/You were not able to fight this player/.test(objectdata['job_results']['title'])) {
					if(/The player was not found/.test(objectdata['job_results']['fail_message'])) {
						msg('<span class="bad">'+objectdata['job_results']['title']+'</span>: '+objectdata['job_results']['fail_message']);
					}
					else {
						log(timestamp()+'<span class="bad">'+objectdata['job_results']['title']+'</span>: '+objectdata['job_results']['fail_message']);
					}
					var sorted_targets = pick_weakest(objectdata['job_fight_list']);
					//console.log('Target1 level: '+sorted_targets[0]['level']+' Mafia: '+sorted_targets[0]['group_size']+' id: '+sorted_targets[0]['id']);
					//console.log('Target2 level: '+sorted_targets[1]['level']+' Mafia: '+sorted_targets[1]['group_size']+' id: '+sorted_targets[1]['id']);
					//console.log('Target3 level: '+sorted_targets[2]['level']+' Mafia: '+sorted_targets[2]['group_size']+' id: '+sorted_targets[2]['id']);
					if (oid == sorted_targets[0]['id']) {
						oid = sorted_targets[1]['id'];
						jobsig = sorted_targets[1]['job_sig'];
						//log('Picked target '+sorted_targets[1].id+' Level: '+sorted_targets[1].level+' Mafia: '+sorted_targets[1].group_size);
						if ((sorted_targets[1].group_size > parseInt(document.getElementById('mafiasize').value)) || (sorted_targets[1].level > parseInt(document.getElementById('mafialvl').value))) {
							//log(timestamp()+'[Case 4] Weakest target: '+sorted_targets[1].name+' Level: '+sorted_targets[1].level+' Mafia: '+sorted_targets[1].group_size+' - To strong, skipping...');
							jobsig = 'undefined';
						}
					}
					else {
						oid = sorted_targets[0]['id'];
						jobsig = sorted_targets[0]['job_sig'];
						//log('Picked target '+sorted_targets[0].id+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size);
						if ((sorted_targets[0].group_size > parseInt(document.getElementById('mafiasize').value)) || (sorted_targets[0].level > parseInt(document.getElementById('mafialvl').value))) {
							//log(timestamp()+'[Case 5] Weakest target: '+sorted_targets[0].name+' Level: '+sorted_targets[0].level+' Mafia: '+sorted_targets[0].group_size+' - To strong, skipping...');
							jobsig = 'undefined';
						}
					}
					function f () {
						repeat_job(jobid,tabid,oid,jobsig)
					}
					if (jobsig === 'undefined') {
						var wait = myRandom(parseInt(wait1+5),parseInt(wait2+5));
						pausing(wait,'Refreshing target list in ',f);					
					}
					else {
						var wait = myRandom(parseInt(wait1),parseInt(wait2));
						pausing(wait,'Attacking '+sorted_targets[0].name+' <span class="more_in">(Lvl: '+sorted_targets[0].level+' Size: '+sorted_targets[0].group_size+')</span> in ',f);	
					}
				}
				else if (/Missing Required Items/.test(objectdata['job_results']['title'])) {
					missing_items = true;
					var missing = '';
					if (objectdata['job_results']['missing_items'].length == 1) { //consumables
						missing_item = objectdata.job_results.missing_items[0].name;
						missing = objectdata.job_results.missing_items[0].name+' (x'+objectdata.job_results.missing_items[0].amount+')'+', ';
					}
					else if (objectdata['job_results']['missing_items'].length > 1) { //multible consumables
						missing_item = objectdata.job_results.missing_items[0].name;
						for (i=0;i<objectdata.job_results.missing_items.length;i++) {
							missing += objectdata.job_results.missing_items[i].name+' (x'+objectdata.job_results.missing_items[i].amount+')'+', ';
						}
					}
					else { //buy items
						log(timestamp()+'<span class="bad">Need to buy items for this job.</span>');
						msg('<span class="bad">'+objectdata['job_results']['title']+'</span>');
						return;
					}
					log(timestamp()+'<span class="bad">Missing Required Items</span>: '+missing.slice(0,missing.length-2));
					msg('<span class="bad">'+objectdata['job_results']['title']+'</span>');
					//document.getElementById("pause").style.display = 'none';
					//document.getElementById("play").style.display = 'inline';
					//run = 1
;
					if (debug) { console.log('Missing item: '+missing_item); }
					//jobid = objectdata.job_results.missing_items[0].job_found;
					//tabid = objectdata.job_results.missing_items[0].story_found;
					var consumablelink = /job_id=(\d+).*?story_tab=(\d+)/.exec(objectdata.job_results.missing_items[0].travel_link.link);
					jobid = consumablelink[1];
					tabid = consumablelink[2];
					function f () {
						repeat_job(jobid,tabid,oid,jobsig)
					}
					var wait = myRandom(parseInt(wait1),parseInt(wait2));
					pausing(wait,'Collecting missing item in ',f);
				}
				else {
					log(timestamp()+'<span class="bad">'+objectdata['job_results']['title']+'</span>: '+objectdata['job_results']['fail_message']);
					msg('<span class="bad">'+objectdata['job_results']['title']+'</span>');
					document.getElementById("pause").style.display = 'none';
					document.getElementById("play").style.display = 'inline';
					run = 1;
				}
			},
			error: function(response){
				if (errors < 10) {
					errors++;
					log(timestamp()+'Had trouble loading the page, retry #'+errors+' of 10...');
					pausing(5,'Retrying page load in ',do_job(url));
				}
				else {
					//log(timestamp()+request.status+' '+(error!=undefined?error:request.responseText)+' Error when loading page, retry #'+retries);
					//log(timestamp()+' Error when loading page, retry #'+retries);
					//retry('Some sort of problem when loading page, retrying...'); 
					alert('Error when loading page: '+response);
				}
			}
		});
	}
	function parse_loot(lootobject,loot_tag) {
		if (loot.length == 0) { 
			loot = '. Loot: '; 
		}
		var tag = '';
		if (loot_tag !== undefined) {
			tag = '<span class="more_in">('+loot_tag+')</span> ';
		}
		if (lootobject.length !== undefined) {
			log('Multiple items looted, count: '+lootobject.length);
			for (i=0;i<lootobject.length;i++) {
				loot += imgurl(lootobject[i]['image'],'15','15',lootobject[i]['name'])+lootobject[i]['name'].replace(/^[A|a]n?\s/,'')+', ';
				add_loot(tag+lootobject[i]['name'].replace(/^[A|a]n?\s/,''),lootobject[i]['quantity']);
				if (missing_items && (missing_item === lootobject[i]['name'])) {
					missing_items = false;
					if ((missing_item === lootobject[i]['name']) && debug) {
						console.log('Looted item we need: '+lootobject[i]['name']);
					}
					get_selected_jobinfo();
				}
			}
		}
		else {
			loot += imgurl(lootobject['image'],'15','15',lootobject['name'])+lootobject['name'].replace(/^[A|a]n?\s/,'')+', ';
			add_loot(tag+lootobject['name'].replace(/^[A|a]n?\s/,''),lootobject['quantity']);
			if (missing_items && (missing_item === lootobject['name'])) {
				missing_items = false;
				if ((missing_item === lootobject['name']) && debug) {
					console.log('Looted item we need: '+lootobject['name']);
				}
				get_selected_jobinfo();
			}
		}
	}
	function job_ratios() {
		var jobs = document.getElementsByClassName('job_container');
		var output = '';
		for (i=0; i < jobs.length; i++) {
			var exp = 0,cash = 0,cashcost = 0,energy = 0,stamina = 0, title = '';
			var expenergy = 0, expstamina = 0, cashstamina = 0, cashenergy = 0;
			
			if(jobs[i].getElementsByClassName('job_title')[0] !== undefined) {
				title = /<h3>\s*(.*?)\s*<\/h3>/.exec(jobs[i].getElementsByClassName('job_title')[0].innerHTML)[1];
			}
			if(jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('experience')[0] !== undefined) {
				var exp = parseInt(/^(\d+)/.exec(jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('experience')[0].innerHTML)[1]);
			}
			if(jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('vegas_cash_icon')[0] !== undefined) {
				var cash = parseInt(/^([\d,]+)/.exec(jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('vegas_cash_icon')[0].innerHTML)[1].replace(/[^\d]/g, ''));
				//alert(/^([\d,]+)/.exec(jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('vegas_cash_icon')[0].innerHTML)[1]);
			}
			if(jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('energy')[0] !== undefined) {
				var energy = jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('energy')[0].innerHTML;
			}
			if (jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('vegas_cash_icon')[0] !== undefined) {
				var cashcost = parseInt(jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('vegas_cash_icon')[0].innerHTML.replace(/[^\d]/g, ''));
			}
			if (jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('stamina')[0] !== undefined) {
				var stamina = parseInt(jobs[i].getElementsByClassName('job_uses')[0].getElementsByClassName('stamina')[0].innerHTML);
			}
			
			expenergy = (exp/energy).toFixed(2);
			cashenergy = (cash/energy).toFixed(0);
			expstamina = (exp/stamina).toFixed(2);
			cashstamina = (cash/stamina).toFixed(0);
			if (energy > 0) { jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('experience')[0].innerHTML = exp+' ('+expenergy+')'; }
			if (stamina > 0) { jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('experience')[0].innerHTML = exp+' ('+expstamina+')'; }
			if (cash > 0 && energy > 0) { jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('vegas_cash_icon')[0].innerHTML = cash+' ('+cashenergy+')'; }
			if (cash > 0 && stamina > 0) { jobs[i].getElementsByClassName('job_pays')[0].getElementsByClassName('vegas_cash_icon')[0].innerHTML = cash+' ('+cashstamina+')'; }
			
			//output += title+'\nExp: '+exp+' ('+(energy>0?expenergy:'0')+')\t Cash: '+cash+' ('+((cash > 0 && energy > 0)?cashenergy:'')+((cash > 0 && stamina > 0)?cashstamina:'')+')\tCost: '+cashcost+'\tEnergy: '+energy+'\t Stamina: '+stamina+' ('+(stamina>0?expstamina:'0')+')\n\n';
		}
	}
	
	
	//alert(output);
	create_div();
	
	//bind buttons
	// function switch_job(tabname,tabid,jobid) {
		// if (document.getElementById('tab_'+tabid).className == tabname) {
			// console.log('Doing job'+jobid);
			// ExpertMapController.selectNode(jobid);
			// return MapController.panelButtonDoJob(jobid);
		// }
		// else {
			// console.log('Traveling to tab'+tabid+' '+tabname);
			// return do_ajax('inner_page', 'remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&tmp=&xw_person=&story_tab='+tabid, 1, 1, 0, 0);
		// }
	// }
	// document.getElementById('hot_tip').onclick = function() { switch_job('tab_on',2,10); };
	// document.getElementById('hot_tip').onclick=function() {
		// if (document.getElementById('tab_2').className == 'tab_on') {
			// ExpertMapController.selectNode(10);
			// return MapController.panelButtonDoJob(10);
		// }
		// else {
			// return do_ajax('inner_page', 'remote/html_server.php?xw_controller=map&xw_action=view2&xw_city=5&tmp=&xw_person=&story_tab=2', 1, 1, 0, 0);
		// }
	// };
	
	document.getElementById('close').onclick=function() {
		run = 1;
		document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
		return false;
	};
	document.getElementById('pause').onclick=function() {
		run = 1;
		pauseevent='Manually paused...';
		document.getElementById("pause").style.display = 'none';
		document.getElementById("play").style.display = 'inline';
		return false;
	};
	document.getElementById('play').onclick=function() {
		run = 1;
		document.getElementById("play").style.display = 'none';
		document.getElementById("pause").style.display = 'inline';
		msg('Repeating job again...');
		get_selected_jobinfo();
		repeat_job(jobid,tabid,oid,jobsig);
		return false;
	};
	document.getElementById('delay1').onkeyup=function() {
		time = parseInt(document.getElementById('delay1').value);
		if((time < 0) || (!time)) { wait1 = 0; }
		else { wait1 = time; }
		document.getElementById('delay1').value = wait1;
		write_settings();
	};
	document.getElementById('delay2').onkeyup=function() {
		time = parseInt(document.getElementById('delay2').value);
		if((time < 0) || (!time)) { wait2 = 0; }
		else { wait2 = time; }
		document.getElementById('delay2').value = wait2;
		write_settings();
	};
	document.getElementById('jobstodo').onkeyup=function() {
		jobstodo = parseInt(document.getElementById('jobstodo').value);
		if((jobstodo < 0) || (!jobstodo)) { jobstodo = 0; }
		else { jobstodo = jobstodo; }
		document.getElementById('jobstodo').value = jobstodo;
		if ((job < jobstodo) && (run == 1)) {
			run = 1;
			msg('Resuming repeats of job.');
			document.getElementById("jobstodo").style.border = '1px solid #888';
			document.getElementById('play').style.display = 'none';
			document.getElementById('pause').style.display = 'inline';
			get_selected_jobinfo();
			repeat_job(jobid,tabid,oid,jobsig);
		}
	};
	document.getElementById('logsize').onkeyup=function() {
		log_size = parseInt(document.getElementById('logsize').value);
		if((log_size < 0) || (!log_size)) { log_size = 20; }
		else { log_size = log_size; }
		document.getElementById('logsize').value = log_size;
		write_settings();
	};
	document.getElementById('bankamount').onkeyup=function() {
		bankamount = p(document.getElementById('bankamount').value);
		if((bankamount < 0) || (!bankamount) || isNaN(bankamount)) { bankamount = 0; }
		else { bankamount = bankamount; }
		document.getElementById('bankamount').value = bankamount;
		write_settings();
	};
	document.getElementById('onevent').onclick=function() {
		if (onevent == 'Continue') {
			onevent = 'Pause';
			document.getElementById('onevent').innerHTML = onevent;
		}
		else {
			onevent = 'Continue';
			document.getElementById('onevent').innerHTML = onevent;
		}
		write_settings();
		return false;
	};
	document.getElementById('bankwithdraw').onclick=function() {
		if (bankwithdraw == 'No') {
			bankwithdraw = 'Yes';
			document.getElementById('bankwithdraw').innerHTML = bankwithdraw;
		}
		else {
			bankwithdraw = 'No';
			document.getElementById('bankwithdraw').innerHTML = bankwithdraw;
		}
		write_settings();
		return false;
	};
	document.getElementById('mafiasize').onkeyup=function() {
		mafiasize = p(document.getElementById('mafiasize').value);
		if((mafiasize < 0) || (!mafiasize) || isNaN(mafiasize)) { mafiasize = 500; }
		else { mafiasize = mafiasize; }
		document.getElementById('mafiasize').value = mafiasize;
		write_settings();
	};
	document.getElementById('mafialvl').onkeyup=function() {
		mafialvl = p(document.getElementById('mafialvl').value);
		if((mafialvl < 0) || (!mafialvl) || isNaN(mafialvl)) { mafialvl = 500; }
		else { mafialvl = mafialvl; }
		document.getElementById('mafialvl').value=mafialvl;
		write_settings();
	};
	// document.getElementById('popupshow').onclick=function(e) {
		// var row = document.getElementById('popups');
		// if (row.style.display == '') { 
			// row.style.display = 'none'; 
			// document.getElementById('popupshow').innerHTML = 'Hide';
		// }
		// else { 
			// row.style.display = '';
			// document.getElementById('popupshow').innerHTML = 'Show';
		// }
		// return false;
	// };
	document.getElementById('lootshow').onclick=function(e) {
		var row = document.getElementById('loot');
		if (row.style.display == '') { 
			row.style.display = 'none'; 
			document.getElementById('lootshow').innerHTML = 'Hide';
		}
		else { 
			row.style.display = '';
			document.getElementById('lootshow').innerHTML = 'Show';
		}
		return false;
	};
	document.getElementById('logshow').onclick=function(e) {
		var row = document.getElementById('log');
		if (row.style.display == '') { 
			row.style.display = 'none'; 
			document.getElementById('logshow').innerHTML = 'Hide';
		}
		else { 
			row.style.display = '';
			document.getElementById('logshow').innerHTML = 'Show';
		}
		return false;
	};
	document.getElementById('donate').onmouseover = function() {
		this.innerHTML = 'Donate a Pint';
		return false;
	};
	document.getElementById('donate').onmouseout = function() {
		this.innerHTML = 'Donate';
		return false;
	};
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	document.getElementById('close').style.display = 'inline';
	document.getElementById('loot').style.display = 'none';
	//document.getElementById('popups').style.display = 'none';
	
	job_ratios();
	get_selected_jobinfo();
	
	var jobs_that_cost = ['30','43','52','53','73'];
	if (jobs_that_cost.indexOf(jobid) != -1) {
		log(timestamp()+'Job spends money, not depositing any.');
		bankamount = 0;
		document.getElementById('bankamount').value = 0;
	}
	
	//repeat_job(jobid,tabid,opponent,jobsig);
	repeat_job(jobid,tabid,'undefined','undefined');
	log('This a experimental version, expect bugs and glitches...');

	// var pop_box = '#pop_box_'+document.getElementById('cash_stats_vegas').getElementsByClassName('cash_help_box')[0].id.substr(4);
	// document.getElementById('rjvpop-debug').onclick = function() {
		// setTimeout(function() {
			// $(pop_box).fadeIn(200);
		// }, 10);
		// return false;
	// };
	
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
		pageTracker._trackPageview("/script/RepeatJobVegasBeta");
	}
	catch(err) {}
	//end analytics

} //end megatry
catch (mainerror) {
	alert('Something broke down, look for your closest emergency code monkey!\n\n'+mainerror);
}

	
})()