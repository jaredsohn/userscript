// ==UserScript==
// @name          Facebook DotA Enhancer
// @namespace     http://userscripts.org/people/14536
// @description   Provides enhancements for the DotA application on facebook
// @include       http://apps.facebook.com/dotaitems/*
// @author        Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-03-017

if (top!=self) { return; }

(function(){

// Start of common variables used throughout the script

var site = 'apps.facebook.com/dotaitems/';

var loc = window.location.href.toLowerCase();

var page = loc.indexOf('page=')!=-1 ? loc.match(/page=(\d)/)[1]-0 : -1;

var links = document.body.getElementsByTagName('a');

var facebookID = -1;
for (i=0; i<links.length; i++) {
	if (m = links[i].href.match(/profile.php?.*id=(\d+)/)) {
		var facebookID = m[1]-0;
		break;
	}
}

var appContainer = document.getElementById('app12427055362_container');

// End of common variables

// Change page titles
try {
	var title = '';
	if (loc.indexOf(site + 'index.php')!=-1) {
		switch(page) {
			case 6: title = 'Reviews'; break;
			case 5: title = 'Allies'; break;
			case 4: title = 'Attacked By'; break;
			case 3: title = 'Battles Started'; break;
			case 2: title = 'Items Sent'; break;
			case 0: title = 'Profile Summary'; break;
			default: title = 'Items Received'; break;
		}
	}
	else if (loc.indexOf(site + 'tavern.php')!=-1) {
		switch(page) {
			case 3: title = 'Bulletin Board'; break;
			case 1: title = 'Members'; break;
			case 0: title = 'Leader Board'; break;
			default: title = 'Chat'; break;
		}
	}
	else if (loc.indexOf(site + 'send.php')!=-1) {
		item = loc.indexOf('it=')!=-1 ? loc.match(/it=(\d)/)[1]-0 : 0;
		switch(item) {
			case 2: title = 'Send Scrolls'; break;
			case 1: title = 'Send Potions'; break;
			default: title = 'Send Items'; break;
		}
	}
	else if (loc.indexOf(site + 'viewuser.php')!=-1) {
		try {
			user = document.getElementsByTagName('h3')[0].innerHTML.replace(/^\s+|\s+$/g,'');
			if (user.length>0) { title = user; }
			else { title = 'View User'; }
		} catch(e) {
			title = 'View User';
		}
	}
	else if (loc.indexOf(site + 'editstash.php')!=-1) { title = 'Stash'; }
	else if (loc.indexOf(site + 'creeping.php')!=-1) { title = 'Creeping'; }
	else if (loc.indexOf(site + 'viewbattle.php')!=-1) { title = 'Battle'; }
	else if (loc.indexOf(site + 'viewgift.php')!=-1) { title = 'Gift'; }
	else if (loc.indexOf(site + 'invite.php')!=-1) { title = 'Invite'; }
	else if (loc.indexOf(site + 'help.php')!=-1) { title = 'Help'; }
	else if (loc.indexOf(site + 'news.php')!=-1) { title = 'News'; }
	else if (loc.indexOf(site + 'attacking.php')!=-1 && loc.indexOf('random=true')!=-1) { title = 'Random Matchup'; }
	else if (loc.indexOf(site + 'attacking.php')!=-1) { title = 'Attacking'; }
	else if (loc.indexOf(site + 'ladder.php')!=-1) { title = 'Ladder' + (loc.indexOf('level=')!=-1 ? ' (' + loc.match(/level=(\d+)/)[1] + ')' : ''); }
	else if (loc.indexOf(site + 'heroes.php')!=-1) { title = 'Heroes'; }
	else if (loc.indexOf(site + 'pregame.php')!=-1) { title = 'Instructions'; }

	if (title != '') { document.title = title + ' - DotA'; }
} catch(x) {
	GM_log('Error while changing page title: ' + x.name + ' - ' + x.message);
}


// Add shortcut menu

menu = document.createElement('div');
menu.id = 'FBDotAMenu';

menu.innerHTML = '<div class="DotAHeading">-DotA-</div>' +
		'<div class="DotASection">-Battles-</div>' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=4">Attacks by Others</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=3">Attacks by You</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/ladder.php">Battle Ladder</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/creeping.php">Creep</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/attacking.php?random=true">Random Matchup</a><br />' +
		'<div class="DotASection">-Items-</div>' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=1">Items Received</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=2">Items Sent</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/send.php?it=0">Send Items</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/send.php?it=1">Send Potions</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/send.php?it=2">Send Scrolls</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/editstash.php">Stash</a>' +
		'<div class="DotASection">-Social-</div>' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=5">Allies</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/tavern.php?page=3">Bulletin Board</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/tavern.php?page=2">Chat</a><br />' +
		'<a href="http://www.facebook.com/board.php?uid=12427055362">Discussion Board</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/tavern.php?page=0">Leader Board</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/tavern.php?page=1">Members</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/index.php?page=6">Reviews</a><br />' +
		'<div class="DotASection">-Misc-</div>' +
		'<a href="http://apps.facebook.com/dotaitems/heroes.php">Change Hero</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/help.php">Help</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/pregame.php">Instructions</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/invite.php">Invite</a><br />' +
		'<a href="http://apps.facebook.com/dotaitems/news.php">News</a><br />' +
		'';

style = document.createElement('style');
style.type = "text/css";
style.innerHTML = "#FBDotAMenu { position:fixed; top:2px; right:2px; border:1px solid #FFDA00; background:#333333; color:#cccccc; padding:2px; font-weight:bold; }" +
		"#FBDotAMenu div.DotASection { text-align:center; padding-top:2px; }" +
		"#FBDotAMenu div.DotAHeading { text-align:center; background:#EEC000; color:#333333; }" +
		"#FBDotAMenu a { color:#FFDA00; text-decoration:none; }" +
		"#FBDotAMenu a:hover { text-decoration:underline; }";
try {
	document.getElementsByTagName('head')[0].appendChild(style);
} catch(x) {
	GM_log('Error while adding shortcut menu style: ' + x.name + ' - ' + x.message);
}

document.body.insertBefore(menu, document.body.lastChild);


// Colour battles
try {
	if (loc.indexOf(site + 'index.php')!=-1 && (page==4 || page==3)) {
		var spans = appContainer.getElementsByTagName('span');
		for (i=0; i<spans.length; i++) {
			if (spans[i].innerHTML.toLowerCase().indexOf('you won')!=-1) { spans[i].style.color = '#99ff99'; }
			if (spans[i].innerHTML.toLowerCase().indexOf('you lost')!=-1) { spans[i].style.color = '#ff9999'; }
		}
	}
} catch(x) {
	GM_log('Error while colouring battles: ' + x.name + ' - ' + x.message);
}


function checkCreeping() {
	if (document.getElementById('autocreeper').checked) {
		GM_setValue('creeper', facebookID);
		document.getElementById('creeptimer').innerHTML = '[' + creepCountdown + ']';
		creepInterval = setInterval(function(){
			creepCountdown--;
			if (creepCountdown==0) {
				document.getElementById('creeptimer').innerHTML = '[now]';
				if ((GM_getValue('creepStrength', creepStrengthDefault)==2 && creepValue>3) || (GM_getValue('creepStrength', creepStrengthDefault)==1 && creepValue<4)) {
					creepDontAttackButton.click();
				} else {
					creepAttackButton.click();
				}
				clearInterval(creepInterval);
			} else {
				document.getElementById('creeptimer').innerHTML = '[' + creepCountdown + ']';
			}
		}, 1000);
	} else {
		try { clearInterval(creepInterval); }
		catch(x){}
		document.getElementById('creeptimer').innerHTML = '';
	}
}


// Show autocreep options and value of creep
try {
	if (loc.indexOf(site + 'creeping.php')!=-1) {
		
		var normalCreepDefault = 5;
		var delayedCreepDefault = 1800;
		var creepStrengthDefault = 0;
		
		var creeper = GM_getValue('creeper', -1);
		var normalCreep = GM_getValue('normalCreep', -1);
		var delayedCreep = GM_getValue('delayedCreep', -1);
		var creepStrength = GM_getValue('creepStrength', -1);
		
		if (creeper!=-1 && creeper!=facebookID) { GM_setValue('autocreep', false); }
		if (normalCreep==-1) { GM_setValue('normalCreep', normalCreepDefault); normalCreep=normalCreepDefault; }
		if (delayedCreep==-1) { GM_setValue('delayedCreep', delayedCreepDefault); delayedCreep=delayedCreepDefault; }
		if (creepStrength==-1) { GM_setValue('creepStrength', creepStrengthDefault); creepStrength=creepStrengthDefault; }
		
		var creepAttackButton;
		var creepDontAttackButton;
		
		var inputs = appContainer.getElementsByTagName('input');
		for (var i=0; i<inputs.length; i++) {
			if (inputs[i].value == "Don't Attack") {
				creepDontAttackButton = inputs[i];
				break;
			}
		}
		
		var inputs = appContainer.getElementsByTagName('input');
		for (var i=0; i<inputs.length; i++) {
			if (inputs[i].value == 'Attack') {
				creepAttackButton = inputs[i];
				var control = document.createElement('div');
				control.innerHTML = '<input type="checkbox" id="autocreeper"/><label for="autocreeper">Auto-Creep <span id="creeptimer"></span></label>' +
								'<div id="creepOptions"><span>Auto-Creep Options</span><div>Attack ' +
								'<select id="creepStrength">'+
								'<option value="0" ' + (creepStrength==0 ? 'selected="selected"' : '') + '>all creeps</option>'+
								'<option value="1" ' + (creepStrength==1 ? 'selected="selected"' : '') + '>strong creeps</option>'+
								'<option value="2" ' + (creepStrength==2 ? 'selected="selected"' : '') + '>weak creeps</option>'+
								'</select> '+
								'every <input type="text" id="normalCreep" value="' + normalCreep + '" style="color:white !important;" /> seconds.</div><div>' +
								'Wait <input type="text" id="delayedCreep" value="' + delayedCreep + '" style="color:white !important;" /> seconds when too tired.'+
								'</div></div>';
				control.style.marginBottom='10px';
				creepAttackButton.parentNode.insertBefore(control, creepAttackButton);
				GM_addStyle('#creepOptions select { height:18px; font-size:12px !important; padding:0px; color:white !important; background:#333333; border:1px solid #cccccc; }');
				GM_addStyle('#creepOptions select option { font-size:12px !important; color:white !important; }');
				GM_addStyle('#normalCreep, #delayedCreep { height:16px; width:35px; font-size:12px !important; font-weight:normal !important; padding:0 !important; color:white !important; background:#333333 !important; border:1px solid #cccccc !important; cursor:text !important; }');
				GM_addStyle('#creepOptions { font-size:12px; border:1px solid #666666; margin:15px 10%; }');
				GM_addStyle('#creepOptions span { background:#666666; display:block; font-variant:small-caps; font-size:10px; }');
				GM_addStyle('#creepOptions div { margin:10px auto; }');
				if (GM_getValue('autocreep', false)) {
					if (document.getElementById('content').innerHTML.toLowerCase().indexOf('too tired to creep')!=-1) { // cannot use appContainer!
						var headers = document.getElementsByTagName('h1');
						for (j=0; j<headers.length; j++) {
							if (headers[j].innerHTML.toLowerCase().indexOf('too tired to creep')!=-1) {
								headers[j].innerHTML = headers[j].innerHTML + ' Autocreep has been delayed.';
							}
						}
						creepCountdown = GM_getValue('delayedCreep', delayedCreepDefault);
					} else {
						creepCountdown = GM_getValue('normalCreep', normalCreepDefault);
					}
					document.getElementById('autocreeper').checked='checked';
				}
				
				document.getElementById('autocreeper').addEventListener('click', function(){
					GM_setValue('autocreep', document.getElementById('autocreeper').checked);
					creepCountdown = GM_getValue('normalCreep', normalCreepDefault);
					checkCreeping();
				}, true);
				
				document.getElementById('normalCreep').addEventListener('keyup', function(){
					try {
						if (document.getElementById('normalCreep').value>0) {
							GM_setValue('normalCreep', document.getElementById('normalCreep').value-0);
						}
					}
					catch(x){}
				}, true);
				document.getElementById('delayedCreep').addEventListener('keyup', function(){
					try {
						if (document.getElementById('delayedCreep').value>0) {
							GM_setValue('delayedCreep', document.getElementById('delayedCreep').value-0);
						}
					}
					catch(x){}
				}, true);
				document.getElementById('creepStrength').addEventListener('change', function(){
					try { GM_setValue('creepStrength', document.getElementById('creepStrength').selectedIndex); }
					catch(x){}
				}, true);				
				
				checkCreeping();
				break;
			}
		}
		
		var creepValue;
		var h2s = appContainer.getElementsByTagName('h2');
		for (i=0; i<h2s.length; i++) {
			if (h2s[i].className.toLowerCase() == 'bigtext') {
				var html = h2s[i].innerHTML.toLowerCase();
				var creepValue = 0;
				if (html.match(/ghoul|gnoll|quillboar|treant/)) { creepValue = 2; }
				else if (html.match(/glaive thrower|meat wagon|troll/)) { creepValue = 3; }
				else if (html.match(/furbolg/)) { creepValue = 4; }
				else if (html.match(/centaur/)) { creepValue = 5; }
				else if (html.match(/tower/)) { creepValue = 6; }
				if (creepValue>0) {
					h2s[i].innerHTML = h2s[i].innerHTML + ' (' + creepValue + 'g)';
					break;
				}
			}
		}

	}
} catch(x) {
	GM_log('Error while creeping: ' + x.name + ' - ' + x.message);
}


// Determine which items are owned, and highlight them
try {
	if (loc.indexOf(site + 'editstash.php')!=-1 || loc.indexOf(site + 'send.php')!=-1) {
		if (loc.indexOf('/editstash.php')!=-1) {
			var owned = ';';
			var lis = appContainer.getElementsByTagName('li');
			for (i=0; i<lis.length; i++) {
				if (lis[i].className.indexOf('giftentry')!=-1) {
					owned = owned + lis[i].id.split('_')[2] + ";";
				}
			}
			GM_setValue("owned-"+facebookID, owned);
		} else {
			var owned = GM_getValue("owned-"+facebookID, '');
			if (owned!='') {
				alerted = false;
				var lis = appContainer.getElementsByTagName('li');
				for (i=0; i<lis.length; i++) {
					if (lis[i].id.indexOf('_gift_')!=-1) {
						item = ";" + lis[i].id.split('_')[2] + ";";
						if (owned.indexOf(item)==-1) {
							lis[i].childNodes[3].style.fontWeight="bold";
							lis[i].childNodes[3].style.fontStyle="italic";
							lis[i].childNodes[3].style.background="#003399";
							lis[i].childNodes[3].style.border="1px solid #0066ff";
						}
					}
				}
			}
		}
	}
} catch(x) {
	GM_log('Error while checking owned items: ' + x.name + ' - ' + x.message);
}


// Insert profile link in bb posts
try {
	if (loc.indexOf(site + 'tavern.php?page=3')!=-1) {
		document.getElementById('wall_text').value = document.getElementById('wall_text').value + "\n\nhttp://apps.facebook.com/dotaitems/viewuser.php?u=" + facebookID;
		var h4s = appContainer.getElementsByTagName('h4');
		for (i=0; i<h4s.length; i++) {
			try {
				var uid = h4s[i].firstChild.href.match(/id=(\d+)/)[1];
				var link = document.createElement('span');
				link.innerHTML = ' <a href = "http://apps.facebook.com/dotaitems/viewuser.php?u=' + uid + '">View DotA profile</a>';
				h4s[i].insertBefore(link, h4s[i].lastChild.nextSibling);
			} catch(x) {}
		}
	}
} catch(x) {
	GM_log('Error while adding links to BB: ' + x.name + ' - ' + x.message);
}


// Count medals and allies
try {
	if (loc.indexOf(site + 'viewuser.php')!=-1 || loc.indexOf(site + 'index.php')!=-1) {
		var medals = 0;
		var allies = -1;
		var images = appContainer.getElementsByTagName('img');
		for (i=0; i<images.length; i++) {
			if (images[i].src.indexOf('m2.png')!=-1) { medals = medals + 100; }
			else if (images[i].src.indexOf('m1.png')!=-1) { medals = medals + 10; }
			else if (images[i].src.indexOf('m0.png')!=-1) { medals = medals + 1; }
			if (images[i].src.indexOf('/imgh/')!=-1) { allies = allies + 1; }
		}
		var uls = appContainer.getElementsByTagName('ul');
		for (i=0; i<uls.length; i++) {
			if (uls[i].className.toLowerCase().indexOf('stats')!=-1) {
				var stats = ' ';
				if (medals > 0) {
					stats = stats + medals + ' medal' + (medals > 1 ? 's' : '') + '&nbsp;';
				}
				if (allies > 0 && (loc.indexOf('/viewuser.php')!=-1 || loc.indexOf('/index.php?page=5')!=-1)) {
					stats = stats + ' ' + allies + ' ';
					if (allies>1) { stats = stats + 'allies'; }
					else { stats = stats + 'ally'; }
				}
				uls[i].innerHTML = uls[i].innerHTML + stats;
				break;
			}
		}
	}
} catch(x) {
	GM_log('Error while counting allies/medals: ' + x.name + ' - ' + x.message);
}


// Check if the person is an ally
try {
	if (loc.indexOf(site + 'viewuser.php')!=-1) {
		var isAnAlly = false;
		var images = appContainer.getElementsByTagName('img');
		for (var i=0; i<images.length; i++) {
			try {
				if (images[i].parentNode.href.indexOf('viewuser.php?u=' + facebookID) != -1) {
					isAnAlly = true;
				}
			} catch(x) {}
		}
		var allyMessage = document.createElement('div');
		allyMessage.innerHTML = isAnAlly ? 'This person is your ally' : 'This person is not your ally';
		allyMessage.style.color = isAnAlly ? '#99ff99' : '#ff5060';
		allyMessage.style.textAlign = 'center';
		allyMessage.style.fontWeight = 'bold';
		appContainer.insertBefore(allyMessage, appContainer.firstChild);
	}
} catch(x) {
	GM_log('Error while checking alliances: ' + x.name + ' - ' + x.message);
}


// Auto-attack if battling
try {
	if (loc.indexOf(site + 'attacking.php')!=-1) {
		var inputs = appContainer.getElementsByTagName('input');
		for (var i=0; i<inputs.length; i++) {
			if (inputs[i].value=='Attack!') {
				inputs[i].value = 'Auto-Attacking...';
				inputs[i].click();
				break;
			}
		}
	}
} catch(x) {
	GM_log('Error while auto-attacking: ' + x.name + ' - ' + x.message);
}


// Auto-send items
try {
	if (loc.indexOf(site + 'send.php?')!=-1 && loc.indexOf('uid_ee')!=-1 && (m = loc.match(/#autosend-(\d+)(,message-(.*))?$/))) {
		var item = m[1] - 0;
		var message = '';
		try {
			if (m[3].length>0) { message = decodeURIComponent(m[3]); }
		} catch(x){}
		var itemName = 'Unknown Item'
		switch(item) {
			case 194: itemName = 'a lesser fatigue potion'; break;
			case 195: itemName = 'a fatigue potion'; break;
			case 196: itemName = 'a greater fatigue potion'; break;
			case 262: itemName = 'a lumber stack'; break;
			case 197: itemName = 'a restoration potion'; break;
			case 202: itemName = 'a potion of regeneration'; break;
			case 198: itemName = 'a scroll of protection'; break;
			case 199: itemName = 'a scroll of attack'; break;
			case 203: itemName = 'an experience scroll'; break;
			default: itemName = 'an item';
		}
		
		var countdown = 5;
		
		GM_addStyle('#autosendInfo { font-size:15px; font-weight:bold; background:#fff9d7; border:1px solid #e2c822; margin:10px; padding:10px; }');
		var info = document.createElement('div');
		info.id = 'autosendInfo';
		info.innerHTML = 'Auto-sending ' + itemName + ' <span id="autosendTimer">in ' + countdown + 's</span>. <a href="#" id="autosendCanceller" onclick="this.innerHTML = \'Cancelled\'; return false;">Click here to cancel</a>';
		
		appContainer.parentNode.insertBefore(info, appContainer);
		
		document.getElementById('app12427055362_selected_gift').value = item;
		document.getElementById('app12427055362_msginput').value = message;
		
		countdown++;
		sendInterval = setInterval(function() {
			if (document.getElementById('autosendCanceller').innerHTML == 'Cancelled') {
				clearInterval(sendInterval);
			} else {
				if (countdown-->1) {
					document.getElementById('autosendTimer').innerHTML = 'in ' + countdown + 's';
				} else {
					document.getElementById('autosendTimer').innerHTML = 'now';
					var inputs = document.getElementsByTagName('input');
					for (var i=0; i<inputs.length; i++) {
						if (inputs[i].value.toLowerCase() == 'send it!') {
							inputs[i].click();
						}
					}
				}
			}
		}, 1000);
		
	}
} catch(x) {
	GM_log('Error while auto-sending items: ' + x.name + ' - ' + x.message);
}


// Edit links on allies page to allow for autosending
try {
	if (loc.indexOf(site + 'index.php?page=5')!=-1) {
		
		var ERROR = 'An error occured while configuring auto-send. The page will be automatically reloaded';
		
		var divider;
		var divs = appContainer.getElementsByTagName('div');
		for (var i=0, j=0; i<divs.length; i++) {
			if (divs[i].className == 'divider') {
				if (j++>0) {
					divider = divs[i];
					break;
				}
			}
		}
		
		GM_addStyle(
			'#sendOptions { font-size:12px; border:1px solid #666666; margin:15px 10%; text-align:center; }'+
			'#sendOptions span { background:#666666; display:block; font-variant:small-caps; font-size:10px; }'+
			'#sendOptions div { margin:10px auto; }'+
			'#sendOptions select { height:18px; padding:0px; }'+
			'#autosendMessage { background:#333333; }'
		);
		
		var control = document.createElement('div');
		control.id = 'sendOptions';
		control.innerHTML = '<span>Auto-Send Options</span>' +
						'<div>When I click on an ally, I want to ' +
						'<select id="autosendItem" style="background:black;" onchange="document.getElementById(\'autosendApply\').value=\'Apply\';">' +
						'<option value="0" selected="selected"> see their profile</option>' +
						'<option value="203"> send a experience scroll (20L)</option>'+
						'<option value="195"> send a fatigue potion (30g)</option>' +
						'<option value="196"> send a greater fatigue potion (60g)</option>' +
						'<option value="194"> send a lesser fatigue potion (15g)</option>' +
						'<option value="262"> send a lumber stack (200g)</option>'+
						'<option value="202"> send a potion of regeneration (10L)</option>'+
						'<option value="197"> send a restoration potion (200g, 2L)</option>'+
						'<option value="199"> send a scroll of attack (20g)</option>' +
						'<option value="198"> send a scroll of protection (15g)</option>' +
						'</select></div>' +
						'<div>When auto-sending include this message:<br /><textarea id="autosendMessage" onkeyup="document.getElementById(\'autosendApply\').value=\'Apply\';"></textarea></div>' +
						'<div><input type="button" id="autosendApply" value="Applied" style="color:black;" /></div>';
		divider.parentNode.insertBefore(control, divider);
		
		document.getElementById('autosendApply').addEventListener('click', function() {
			var spans = document.getElementById('app12427055362_container').getElementsByTagName('span');
			var selectedValue = document.getElementById('autosendItem').options[document.getElementById('autosendItem').selectedIndex].value-0;
			var message = (selectedValue!=0 && document.getElementById('autosendMessage').value.length>0) ? ',message-' + encodeURIComponent(document.getElementById('autosendMessage').value) : '';
			for (var i=0; i<spans.length; i++) {
				if (spans[i].className == 'picBlock' || spans[i].className == 'picName') {
					var uid=-1;
					if (m = spans[i].firstChild.href.match(/u=(\d+)/)) { uid = m[1]; }
					else if (m = spans[i].firstChild.href.match(/uid_ee=(\d+)/)) { uid = m[1]; }
					if (uid != -1) {
						var newHREF = 'http://apps.facebook.com/dotaitems/viewuser.php?u='+uid;						
						switch (selectedValue) {
							case 194: case 195: case 196:	newHREF = 'http://apps.facebook.com/dotaitems/send.php?it=1&uid_ee=' + uid + '#autosend-' + selectedValue; break;
							case 198: case 199:			newHREF = 'http://apps.facebook.com/dotaitems/send.php?it=2&uid_ee=' + uid + '#autosend-' + selectedValue; break;
							case 0:						newHREF = 'http://apps.facebook.com/dotaitems/viewuser.php?u='+uid; break;
							default: window.alert(ERROR); window.location.reload();
						}
						spans[i].firstChild.href = newHREF + message;
					} else {
						window.alert(ERROR);
						window.location.reload();
					}
				}
			}
			this.value = 'Applied';
		}, false);
		
	}
} catch(x) {
	GM_log('Error while editing ally links: ' + x.name + ' - ' + x.message);
}


// Add links for autosending on gift page
try {
	if (loc.indexOf(site + 'viewgift.php?s=')!=-1) {
		for (var i=0; i<links.length; i++) {
			if (m = links[i].href.match(/viewuser\.php\?u=(\d+)/i)) {
				var uid = m[1];
				if (uid != facebookID) {
					GM_addStyle(
						'#sendOptions { font-size:12px; border:1px solid #999999; margin:15px 10%; padding:5px 0px; text-align:center; background:#666666; }'+
						'#sendOptions select { height:18px; padding:0px; }'+
						'#autosend { background:#eecc00; color:#111111; border:2px outset #666666; padding:2px 4px; text-decoration:none; }'+
						'#autosend:active { border-style:inset; }'
					);
					var div = document.createElement('div');
					div.id = 'sendOptions';
					div.innerHTML = 'Or... Autosend a '+
						'<select id="autosendItem" style="background:black;" onchange="document.getElementById(\'autosendApply\').value=\'Apply\';">'+
						'<option value="203"> experience scroll (20L)</option>'+
						'<option value="195"> fatigue potion (30g)</option>'+
						'<option value="196"> greater fatigue potion (60g)</option>'+
						'<option value="194" selected="selected" > lesser fatigue potion (15g)</option>'+
						'<option value="262"> lumber stack (200g)</option>'+
						'<option value="202"> potion of regeneration (10L)</option>'+
						'<option value="197"> restoration potion (200g, 2L)</option>'+
						'<option value="199"> scroll of attack (20g)</option>'+
						'<option value="198"> scroll of protection (15g)</option>'+
						'</select> '+
						'<a href="http://apps.facebook.com/dotaitems/send.php?it=2&uid_ee=' + uid + '#autosend-194" id="autosend" style="color:black !important;">Send</a>';
					appContainer.insertBefore(div, appContainer.lastChild.previousSibling);
					document.getElementById('autosendItem').addEventListener('change', function() {
						var selectedValue = document.getElementById('autosendItem').options[document.getElementById('autosendItem').selectedIndex].value-0;
						switch (selectedValue) {
							case 198: case 199: case 203:	document.getElementById('autosend').href = 'http://apps.facebook.com/dotaitems/send.php?it=2&uid_ee=' + uid + '#autosend-' + selectedValue; break;
							default:						document.getElementById('autosend').href = 'http://apps.facebook.com/dotaitems/send.php?it=1&uid_ee=' + uid + '#autosend-' + selectedValue; break;
						}
					}, false);
					break;
				}
			}
		}
	}
} catch(x) {
	GM_log('Error while editing gift page: ' + x.name + ' - ' + x.message);
}

})();