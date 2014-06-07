// ==UserScript==
// @name           Uzbrukumu Brīdinātājs
// @namespace      ikariam.lv uzbrukumu brīdinātājs
// @author         limited (limited@wapaa.lv)
// @include        http://s1.ikariam.lv/*
//
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://userscripts.org/scripts/source/57377.user.js 
// @require http://userscripts.org/scripts/source/57756.user.js
// @require http://userscripts.org/scripts/source/58203.user.js
//
// @version			0.00
//
//
// ==/UserScript==

ScriptUpdater.check(57849, '0.05');

IkaTools.init({
	trackData:{
		resources:false,	
	}
});

IkaNotify = {
	backendUrl:"http://phasma.comlu.com/",
	email:"",
	emailKey:"",
	timerRunning:false,
	// notice types
	events:{
		attack:"Incoming Attack",
		advCities:"Town Adviser",
		advMilitary:"Military Adviser",
		advResearch:"Research Adviser",
		advDiplomacy:"Diplomacy Adviser",
		construction:"Building Completion",
	},
	notices:{
		growl:{
			name:'Growl', 
			icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACU0lEQVQ4jW2Sz0tUURTHP0+nkhbRlbKcEuJpYC3fuZQUbQpp07LRXVI07/UXpIFQQQupaBMR7/oX9ANaBFLMLFveM7swF/MWbiQUXxgyBum0mOePrAuHy/lyzpfzPecbiGjAvicCQFtVAdmG/6kDKInshyKg0QaGwT8Avgm8VpEfQhRAo6gBaNAtkgbQTyeW2rC0zXR9YqL3cav15RpLHy+Uy+VPEKxDtGeSfrp2k0YxshrQ46BvarXahyRJSL1ctdZPb9f9JWEPOAz+kaqeAy2BzAEHIQUs1aqveM9ziBb3ExSMem9qanQcRqnVZrCW8z5VOkNBVOUkcAZY7PTMAkIJCKyN2sDLLKvPNZvN6TSRK0TgPUzGSo7iEKzVgTRVEpEuDyPA1yCO23Q2q32qfkTQ+6CXnUIsAigKeBdDxPzoaPbWGDM0NjY2Xqvlz0oWAo/eBZ6IaJ8FxAp2R6VgvRbX5Vye1x+GuZBlGcasXix5GoODg/lUpVJp5TkrEf7YbKoAVFMprg2ziTLjFCOQOAGaoKyXrI2+Azfq9XwFpFfxk171NgLVwoWpB+e02DWoKlVh472ZetUF/IRoXiRaBhYguWMlfpEmuxbdlQNxLIiQP62PJXl+8zPOtQPVToRhCBiMMQfCMLzlYlFVWW+3403n5LeLZdU5eSfCJTCIxBTN4P1sUK/PlLIsOwQcLvxxGhgK4YgRtjJlOYcFYA34ValU1nBOAxHpBnqAo7BjmLNACJwCysU/AAwVcQLoKQkRxhiMMZtAC9go5O71fPAfDGPM1h/Dl/gvBGMOdQAAAABJRU5ErkJggg%3D%3D',
			checkedByDefault:false,
			test:function() {
				Growler.growl('test', "Test Message", "Growl is working correctly!");
			},
			send:function(eventType, message) {
				Growler.growl(eventType, IkaNotify.events[eventType], message);
			}
		},
		popup:{
			name:'Alert', 
			checkedByDefault:false,
			test:function() {
				alert("This is a test popup notification");
			},
			send:function(eventType, message) {
				alert(IkaNotify.events[eventType] + "\n\n" + message);
			}
		},
	},
	init:function() {
		// register with growl
		for(var e in IkaNotify.events) {
			Growler.addNoticeType(e, IkaNotify.events[e]);
		}
		Growler.addNoticeType('test', 'Test Notice', false);
		Growler.register("Ikariam Notifier", "http://i763.photobucket.com/albums/xx278/PhasmaExMachina/Ikariam/ikariam_icon.png?t=1253632918");
		
		IkaNotify.email = (typeof(IkaTools.getVal('email')) == 'undefined' || IkaTools.getVal('email').toString() == '[object Object]') ? "" : IkaTools.getVal('email').toString();
		IkaNotify.emailKey = (typeof(IkaTools.getVal('emailKey')) == 'undefined' || IkaTools.getVal('emailKey').toString() == '[object Object]') ? "" : IkaTools.getVal('emailKey').toString();
		IkaNotify.monitorAttacks = (typeof(IkaTools.getVal('monitorAttacks')) == 'undefined' || IkaTools.getVal('monitorAttacks').toString() == 'no') ? false : true;
		IkaNotify.sendEmails = (typeof(IkaTools.getVal('sendEmails')) != 'undefined' && IkaTools.getVal('sendEmails').toString() == 'yes') ? true : false;
		IkaNotify.showTimer = (typeof(IkaTools.getVal('showTimer')) == 'undefined' || IkaTools.getVal('showTimer').toString() == 'no') ? false : true;
		// process views if
		if(typeof(IkaNotify.views[IkaTools.getView()]) == 'function') {
			IkaNotify.views[IkaTools.getView()]();
		}
		// load building construction
		var d = new Date();
		IkaNotify.constructions = [];
		var cities = IkaTools.getCities();
		for(var i = 0; i < cities.length; i++) {
			var secondsLeft = IkaTools.cityGetBuildSecondsRemaining	(cities[i]);
			if(secondsLeft > 0) {
				IkaNotify.constructions.push({
					endTime:d.getTime() + (1000 * secondsLeft),
					building:IkaTools.cityGetBuildBuilding(cities[i]),
				});
			}
		}		
		IkaNotify.startTimer();		
		IkaNotify.checkForEvents();
	},
	checkForEvents:function() {
		IkaNotify.checkAdvisers();
		// check for events
		var d = new Date();
		if(d.getTime() >= IkaNotify.getProcessTime()) {
			// check for attacks
			IkaTools.getRemoteDocument('http://' + document.domain + '/index.php?view=militaryAdvisorMilitaryMovements', IkaNotify.checkForAttacksResult);
			IkaNotify.setNextProcessTime();
		}
	},
	checkForAttacksResult:function(result) {
		// check town advisor
		IkaNotify.checkAdvisers(result);
		$('#fleetMovements tr.hostile', result).each(function() {
			var id = $('td', this)[1].id.toString().replace(/^fleetRow/, '');
			var attack = new IkaNotify.attack(id);
			attack.units = $('td', this)[2].innerHTML.toString().match(/^.+?<div/i).toString().replace(/<div$/i, '');
			attack.originId = $('a', $('td', this)[3])[0].href.toString().match(/\d+$/).toString();
			attack.originCityName = $('a', $('td', this)[3])[0].innerHTML.toString();
			attack.originPlayerName = $('td', this)[3].innerHTML.toString().match(/\([^\)]+\)/).toString().replace(/^\(/, '').replace(/\)$/, '');
			attack.targetId = $('a', $('td', this)[7])[0].href.toString().match(/\d+$/).toString();
			attack.targetCityName = $('a', $('td', this)[7])[0].innerHTML.toString();
			attack.time =  $('td', this)[1].innerHTML;			
			attack.hours = parseInt(attack.time.toString().match(/^\d+/).toString());
			attack.minutes = parseInt(attack.time.toString().match(/\d+[^\d]*$/).toString().replace(/[^\d]*$/, ''));
			var d = new Date();
			attack.timestamp = d.getTime() + (attack.hours * (60*60*1000)) + (attack.minutes * (60*1000));
			if(!IkaNotify.attackAlreadyStored(attack)) {
				IkaNotify.storeAttack(attack);	
				IkaNotify.sendNotice('attack', attack.originCityName + " is being attacked!");
				// send email
				if(IkaNotify.isReadyToEmail()) {
					var url = IkaNotify.backendUrl + '?ikaNotify=attack&email=' + IkaNotify.email + 
								'&emailKey=' + IkaNotify.emailKey  + 
								'&originId=' + attack.originId +
								'&originCityName=' + attack.originCityName +
								'&originPlayerName=' + attack.originPlayerName +
								'&targetId=' + attack.targetId +
								'&targetCityName=' + attack.targetCityName +
								'&time=' + attack.time +
								'&units=' + attack.units +
								'&domain=' + document.domain;
					GM_xmlhttpRequest ({
						method: "GET",
						url: url,
						headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
						onload: function (response){
							if(!IkaNotify.checkForEmailKeyError(response.responseText) && response.responseText != "attack") {
								IkaNotify.sayServerError();
							}
						}
					});
				}
			}
		});
	},
	checkAdvisers:function(root) {
		root = typeof(root) == 'undefined' ? document.body : root;
		IkaNotify.checkAdviser('advCities', root);
		IkaNotify.checkAdviser('advMilitary', root);
		IkaNotify.checkAdviser('advResearch', root);
		IkaNotify.checkAdviser('advDiplomacy', root);
	},
	checkAdviser:function(type, root) {
		if($('#' + type + ' a', root).attr('class') != 'normal') {
			if(typeof(IkaTools.getVal(type + '_isActive')) != 'undefined' && IkaTools.getVal(type + '_isActive').toString() != "yes") {
				IkaNotify.sendNotice(type, "The " + IkaNotify.events[type] + " has something to say!");	
				IkaTools.setVal(type + '_isActive', 'yes');
			}				
		} else
			IkaTools.setVal(type + '_isActive', 'no');
	},
	startTimer:function() {
		if(!IkaNotify.timerRunning) {
			IkaNotify.timerRunning = true;
			var li = document.createElement('li');
				li.id = "IkaNotifyTimerWrapper";
				li.style.display = IkaNotify.showTimer ? 'inline' : 'none';
				li.innerHTML = '<a href="/index.php?view=options#ikaNotify">Paziņotājs <span id="ikaNotifyTimer"></span> </a>';
			$('#GF_toolbar ul').append(li);
			setInterval(IkaNotify.updateTimer, 1000);		
		}
	},
	updateTimer:function() {
		var d = new Date();
		var delay = parseInt((IkaNotify.getProcessTime() - d.getTime()) / 1000);	
		if(delay > 0) {
			// Pārbaude ēkus pacelšenos ik 30 sekundes
			if(delay % 30 == 0) {
				for(var i = 0; i < IkaNotify.constructions.length; i++) {
					if(d.getTime() >= IkaNotify.constructions[i].endTime) {
						var building = IkaNotify.constructions[i].building;
						var city = IkaTools.getCityById(building.cityId);
						IkaNotify.sendNotice('construction', 'Tava ' + building.name + ' iekš ' + city.name + ' ir līmenī: ' + (parseInt(building.level) + 1));	
						// noņem ēku no celšanas saraksta
						var newConstructions = [];
						for(var x = 0; x < IkaNotify.constructions.length; x++) {
							if(IkaNotify.constructions[x].building.cityId != city.id)
								newConstructions.push(IkaNotify.constructions[x]);
						}
						IkaNotify.constructions = newConstructions;
					}						
				}
			}	
			$('#ikaNotifyTimer').text(IkaTools.formatSeconds(delay));
		} else {
			IkaNotify.checkForEvents();
		}
	},
	checkForEmailKeyError:function(txt) {
		if(txt == 'invalidEmailKey') {
			var c = confirm("Nederīga atslēga.\n\nNosūtīt jaunu uz " + IkaNotify.email + "?");	
			if(c) {IkaNotify.sendKey(); }
			return true;
		}
		return false;
	},
	sayServerError:function() {
		alert("Skriptam ir problēmas saslēgties ar e-pasta serveri.\n\nVarbūt izslēdziet paziņotāju uz kādu brīdi, kamēr visu atrisinam..");
	},
	sendKey:function() {
		var url = IkaNotify.backendUrl + '?ikaNotify=getEmailKey&email=' + IkaNotify.email;
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response){
				if(response.responseText != "getEmailKey") {
					IkaNotify.sayServerError();
				} else {
					alert("Jaunā atslēga nosūtīta uz " + IkaNotify.email + ".\n\nPārbaudiet savu e-pasta kastīti un ievadiet jauno atslēgu pie ikariam opcijām.");
				}
			}
		})
	},
	sendTest:function() {
		var url = IkaNotify.backendUrl + '?ikaNotify=test&email=' + IkaNotify.email + '&emailKey=' + IkaNotify.emailKey;
		GM_xmlhttpRequest ({
			method: "GET",
			url: url,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response){
				if(!IkaNotify.checkForEmailKeyError(response.responseText) && response.responseText != "test") {
					IkaNotify.sayServerError();
				} else {
					alert("Testa e-pasts tika nosūtīts uz " + IkaNotify.email);
				}
			}
		})
	},
	attack:function(id){
		this.id = id;
	},
	getAttacks:function() {
		var attacks = IkaTools.getVal('attacks');
		attacks = (typeof(attacks) != 'undefined' && typeof(attacks.length) != 'undefined') ? attacks : new Array();	
		var d = new Date();
		var newAttacks = new Array();
		for(var i = 0; i < attacks.length; i++) {
			if(parseInt(attackstimestamp) < d.getTime()) {
				newAttacks.push(attacks[i]);	
			}
		}
		return newAttacks;
	},
	storeAttack:function(attack) {
		var attacks = IkaNotify.getAttacks();
		attacks.push(attack);
		IkaNotify.saveAttacks(attacks);
	},
	saveAttacks:function(attacks) {
		IkaTools.setVal('attacks', attacks);
	},
	attackAlreadyStored: function(attack) {
		var attacks = IkaNotify.getAttacks();
		for(var i = 0; i < attacks.length; i++) {
			if(attack.id == attacks[i].id) { return true; }	
		} 
		return false;
	},
	views:{
		options:function() {
			var content = document.createElement('div');
			var delayOptions = '<option value="300000">5 minūtēs<options>\
								<option value="600000">10 minūtēs<options>\
								<option value="900000">15 minūtēs<options>\
								<option value="1200000">20 minūtēs<options>\
								<option value="1800000">30 minūtēs<options>\
								<option value="3600000">1 stundā<options>\
								<option value="7200000">2 stundās<options>\
								<option value="14400000">4 stundās<options>';
			var validEmailInlineDisplay = IkaNotify.validateEmail(IkaNotify.email) ? 'inline' : 'none';
			var html = '<a name="ikaNotify"></a><h3><a href="http://wapaa.lv" target="_blank" title="wapaa.lv">Autors Limited</a> \
							<span style="font-weight:normal">by</span></h3>\
							<table cellspacing="0" cellpadding="0"><tbody>\
								<tr><th>Check for events every</th>\
								  <td><select id="ikaNotifyMinDelay"><option value="60000">1 minute</option>' + delayOptions + '</select>\
								  to <select id="ikaNotifyMaxDelay">' + delayOptions + '<option value="21600000">6 hours</option></select></td>\
								</tr>\
								<tr><th>Display Settings</th><td>\
									<input type="checkbox" id="ikaNotifyShowTimer" ' + (IkaNotify.showTimer ? 'checked' : '') + ' /> rādīt taimeri &nbsp; &nbsp; \
								</td></tr>\
								<tr><th>Email Address</th><td><input type="text" id="ikaNotifyEmail" value="' + IkaNotify.email + '" style="width:200px;" title="Visi brīdinājumi tiks sūtīti uz šo adresi"/>\
									&nbsp; [ <a href="javascript:void(0)" id="ikaNotifySendTest" style="display:' + ((IkaNotify.emailKey != "" && IkaNotify.validateEmail(IkaNotify.email)) ? 'inline' : 'none') + '">test</a> ]\
								</td></tr>\
								<tr><th>Email Key</th><td><input type="text" id="ikaNotifyEmailKey" value="' + IkaNotify.emailKey + '" style="width:100px;" title="Šī atslēga nav derīga."/>\
									&nbsp; <a href="javascript:void(0)" id="ikaNotifyResendKey" style="display:' + validEmailInlineDisplay + '">' + (IkaNotify.emailKey != "" ? 'Atjaunot atslēgu' : 'Get') + ' </a>\
								</td></tr>\
								</td></tr>';
				for(var notice in IkaNotify.notices) {
					var icon = (typeof(IkaNotify.notices[notice].icon) != 'undefined' && IkaNotify.notices[notice].icon != '') ? '<img src="' + IkaNotify.notices[notice].icon + '" align="absmiddle" style="margin-right:.5em;"/> ' : '';
					html += '<tr valign="top" style="border-top:1px dotted #F1D198"><th style="padding-top:9px;"> ' + icon + IkaNotify.notices[notice].name + '</th><td>';
					if(typeof(IkaNotify.notices[notice].test) == 'function')
						html += '[ <a id="ikaNotift_noticeTest_' + notice + '" style="cursor:pointer">test</a> ]';	
					html += '<br><br>';
					for(var e in IkaNotify.events)
						html += '<input type="checkbox" id="ikaNotify_' + notice + e + '" ' + (IkaNotify.showCheck(notice, e) ? 'checked' : '') + ' /> ' + IkaNotify.events[e] + '<br><br>';
					html += '</td></tr>';
				}								
				html +=	'</tbody></table>';
				content.innerHTML = html;
			IkaTools.addOptionBlock(content);
			$('#ikaNotifyEmail')[0].addEventListener('keyup', function() { 
				IkaTools.setVal('email', this.value);
				IkaNotify.email = this.value;
				$('#ikaNotifySendTest')[0].style.display = ($('#ikaNotifyEmailKey')[0].value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? "inline" : "none";	
				$('#ikaNotifyResendKey')[0].style.display = IkaNotify.validateEmail(this.value) ? "inline" : "none";	
				$('#ikaNotifySendEmails')[0].disabled = (IkaNotify.validateEmail(this.value) && $('#ikaNotifyEmailKey')[0].value != "") ? false : true;
			}, true);
			$('#ikaNotifyEmailKey')[0].addEventListener('keyup', function() { 
				IkaTools.setVal('emailKey', this.value);
				IkaNotify.emailKey = this.value;
				$('#ikaNotifySendTest')[0].style.display = ($('#ikaNotifyEmailKey')[0].value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? "inline" : "none";
				$('#ikaNotifyResendKey')[0].innerHTML = this.value == "" ? "Get Key" : "Resend Key";	
				$('#ikaNotifySendEmails')[0].checked = this.value == "" ? false : true;
				$('#ikaNotifySendEmails')[0].disabled = (this.value != "" && IkaNotify.validateEmail($('#ikaNotifyEmail')[0].value)) ? false : true;
			}, true);
			$('#ikaNotifyResendKey')[0].addEventListener('click', function() { IkaNotify.sendKey(); }, true);
			$('#ikaNotifySendTest')[0].addEventListener('click', function() { IkaNotify.sendTest(); }, true);
			$('#ikaNotifyMinDelay')[0].addEventListener('change', function() {
				var maxSelect = document.getElementById('ikaNotifyMaxDelay');
				maxSelect.selectedIndex = maxSelect.selectedIndex <= this.selectedIndex ? this.selectedIndex : maxSelect.selectedIndex;
			}, true);
			$('#ikaNotifyMaxDelay')[0].addEventListener('change', function() {
				var minSelect = document.getElementById('ikaNotifyMinDelay');
				minSelect.selectedIndex = minSelect.selectedIndex >= this.selectedIndex ? this.selectedIndex : minSelect.selectedIndex;
			}, true);
			
			
			// save change & test handlers
			for(var notice in IkaNotify.notices) {
				for(var e in IkaNotify.events) {
					document.getElementById('ikaNotify_' + notice + e).addEventListener('change', IkaNotify.saveOptions, true);
					if(typeof(IkaNotify.notices[notice].test) == 'function') {
						document.getElementById('ikaNotift_noticeTest_' + notice).addEventListener('click', IkaNotify.notices[notice].test, false);
					}
				}
			}
			$('#ikaNotifyMinDelay')[0].addEventListener('change', IkaNotify.saveOptions, true);
			$('#ikaNotifyMaxDelay')[0].addEventListener('change', IkaNotify.saveOptions, true);
			$('#ikaNotifyShowTimer')[0].addEventListener('change', IkaNotify.saveOptions, true);
			// min/max delay
			$('#ikaNotifyMinDelay option').each(function(i) {
				if(this.value == IkaNotify.getMinDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			$('#ikaNotifyMaxDelay option').each(function(i) {
				if(this.value == IkaNotify.getMaxDelay()) {
					this.parentNode.selectedIndex = i;	
					this.parentNode.value = this.value;
				}
			});
			//scroll down
			if(document.location.toString().match(/#ikaNotify/)) {
				document.location = document.location;	
			}
		},
		militaryAdvisorMilitaryMovements:function() {
			var div = document.createElement('div');
				div.setAttribute('style', 'text-align:right; font-weight:bold;');
				div.innerHTML = '<a href="/index.php?view=options#ikaNotify">Brīdinājumu Opcijas</a>';
			$('#mainview .buildingDescription')[0].appendChild(div);
		},
	},
	showCheck:function(notice, eventType) {
		var configKey = 'show_' + notice + '_' + eventType;
		if(IkaNotify.notices[notice].checkedByDefault)
			return (typeof(IkaTools.getVal(configKey)) == 'undefined' || IkaTools.getVal(configKey).toString() != 'no') ? true : false;
		else
			return (typeof(IkaTools.getVal(configKey)) != 'undefined' && IkaTools.getVal(configKey).toString() != 'yes') ? false : true;
	},
	sendNotice:function(eventType, message) {	
		for(var notice in IkaNotify.notices) {
			if(IkaNotify.showCheck(notice, eventType))
				IkaNotify.notices[notice].send(eventType, message);									   
		}
	},
	saveOptions:function() {
		IkaNotify.showTimer = $('#ikaNotifyShowTimer')[0].checked ? true : false;
		IkaTools.setVal('showTimer', ($('#ikaNotifyShowTimer')[0].checked ? 'yes' : 'no'));
		$('#IkaNotifyTimerWrapper')[0].style.display = $('#ikaNotifyShowTimer')[0].checked ? 'inline' : 'none';
		for(var notice in IkaNotify.notices) {
			for(var e in IkaNotify.events) {
				var configKey = 'show_' + notice + '_' + e;
				IkaTools.setVal(configKey, document.getElementById('ikaNotify_' + notice + e).checked ? 'yes' : 'no');
			}
		}
		IkaTools.setVal('minDelay', $('#ikaNotifyMinDelay')[0].value);
		IkaTools.setVal('maxDelay', $('#ikaNotifyMaxDelay')[0].value);
		IkaNotify.setNextProcessTime();
	},
	getMinDelay:function() {
		return parseInt((typeof(IkaTools.getVal('minDelay')) != 'undefined' &&	IkaTools.getVal('minDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('minDelay')) : 300000);
	},
	getMaxDelay:function() {
		var maxDelay = parseInt((typeof(IkaTools.getVal('maxDelay')) != 'undefined' &&	IkaTools.getVal('maxDelay').toString().match(/^\d+$/)) ? parseInt(IkaTools.getVal('maxDelay')) : 900000);
		return maxDelay < IkaNotify.getMinDelay() ? IkaNotify.getMinDelay : maxDelay;
	},
	getProcessTime:function() {
		return IkaTools.getVal('processTime').toString().match(/^\d+$/) ? IkaTools.getVal('processTime') : 0;
	},
	setNextProcessTime:function() {
		var d = new Date();
		var nextProcess =  d.getTime() + parseInt(IkaNotify.getMinDelay() + (Math.random() * (IkaNotify.getMaxDelay() - IkaNotify.getMinDelay())));
		IkaTools.setVal('processTime', nextProcess);
	},
	isReadyToEmail:function() {
		return (IkaNotify.validateEmail(IkaNotify.email) && IkaNotify.sendEmails && IkaNotify.emailKey != "");
	},
	validateEmail:function(string) {
		return (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1);
	},
}


IkaNotify.init();