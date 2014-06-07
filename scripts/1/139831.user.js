// ==UserScript==
// @name           Pokemon Vortex Mobile Helper
// @namespace      http://flamescape.com/
// @include        http://*.pokemonvortex.org/mobile/*
// ==/UserScript==

Options = JSON.parse(GM_getValue('options', '{}'));
Options.save = function(){GM_setValue('options', JSON.stringify(this));};

var dratiniForms = [
	'Dratinice',
	'Shiny Dratinice',
	'Ancient Dratinice',
	'Mystic Dratinice',
	'Dark Dratinice',
	
	'Dratinilic',
	'Shiny Dratinilic',
	'Ancient Dratinilic',
	'Mystic Dratinilic',
	'Dark Dratinilic',
	
	'Dratinire',
	'Shiny Dratinire',
	'Ancient Dratinire',
	'Mystic Dratinire',
	'Dark Dratinire'

        'Latios',
	'Shiny Latios',
	'Ancient Latios',
	'Mystic Latios',
	'Dark Latios',
	
	'Latias',
	'Shiny Latias',
	'Ancient Latias',
	'Mystic Latias',
	'Dark Latias',
	
	'Rayquaza',
	'Shiny Rayquaza',
	'Ancient Rayquaza',
	'Mystic Rayquaza',
	'Dark Rayquaza'

        'Dialga',
	'Shiny Dialga',
	'Ancient Dialga',
	'Mystic Dialga',
	'Dark Dialga',
	
	'Palkia',
	'Shiny Palkia',
	'Ancient Palkia',
	'Mystic Palkia',
	'Dark Palkia',
	
	'Giratina',
	'Shiny Giratina',
	'Ancient Giratina',
	'Mystic Giratina',
	'Dark Giratina'

        'Arceus',
	'Shiny Arceus',
	'Ancient Arceus',
	'Mystic Arceus',
	'Dark Arceus',
	
	'Reshiram',
	'Shiny Reshiram',
	'Ancient Reshiram',
	'Mystic Reshiram',
	'Dark Reshiram',
	
	'Zekrom',
	'Shiny Zekrom',
	'Ancient Zekrom',
	'Mystic Zekrom',
	'Dark Zekrom'

        'Kyurem',
	'Shiny Kyurem',
	'Ancient Kyurem',
	'Mystic Kyurem',
	'Dark Kyurem'
];

(function(w){
	// Helper functions
	var l = w.console.log;
	var d = w.document;
	var $ = d.getElementById;
	var $A = function(al){var a=[];for (var i=0;i<al.length;i++){a.push(al[i]);}return a;};
	var $$ = function(q){return $A(d.querySelectorAll(q));};
	var $T = function(q,r){var a=$$(q);for(var i=0;i<a.length;i++){if(r.test(a[i].textContent)){return a[i];}}return false;};
	var $pad = function(s){return s<10?('0'+s):s;}

	// Find container	
	var pageContainer = $$('.container')[0];
	
	var adv = pageContainer.querySelector('div iframe');
	if (adv) {
		adv.parentNode.removeChild(adv);
	}
	
	// Create event log
	if (!Options.log) {Options.log=[];Options.save();}
	var cLog = pageContainer.insertBefore(d.createElement('div'), pageContainer.firstChild);
	cLog.setAttribute('style', 'border:1px dotted black;border-radius:16px;background-color:#ffc;padding:5px;margin:5px;');
	cLog.showEntry = function(le){
		var sp = cLog.appendChild(d.createElement('span'));
		sp.setAttribute('style', 'display:block;text-align:left;');
		le.time = new Date(le.time);
		sp.appendChild(d.createTextNode('[' + $pad(le.time.getHours()) + ':' + $pad(le.time.getMinutes()) + ':' + $pad(le.time.getSeconds()) + '] ' + le.event));
	};
	cLog.w = function(evt){
		Options.log.push({"time":new Date().getTime(),"event":evt});
		if (Options.log.length > 10) {
			Options.log.shift();
		}
		Options.save();
	};
	cLog.draw = function() {
		cLog.innerHTML = '';
		for (var i=0;i<Options.log.length;i++) {
			cLog.showEntry(Options.log[i]);
		}
	};
	
	cLog.draw();
	
	// Create page controls
	var cWrapper = pageContainer.insertBefore(d.createElement('div'), pageContainer.firstChild);
	cWrapper.setAttribute('style', 'border:1px dotted black;border-radius:16px;background-color:#8d8;padding:5px;margin:5px;');
	cWrapper.createToggler = function(labelText, optionName, defaultValue){
		var la = cWrapper.appendChild(d.createElement('label'));
		la.setAttribute('style', 'display:block;text-align:left;');
		var c = la.appendChild(d.createElement('input'));
		c.setAttribute('type', 'checkbox');
		c.checked = Options[optionName] !== null ? Options[optionName] : !!defaultValue;
		la.appendChild(d.createTextNode(' '+labelText));
		c.addEventListener('click', function(){
			Options[optionName] = this.checked;
			Options.save();
			l(Options);
		}, false);
	};
	
	cWrapper.createToggler('Auto-battle', 'autoBattle', 0);
	cWrapper.createToggler('Search for Dratini forms', 'searchDratini', 0);
	
	// Read the page, looking for things to do
	function readPage() {
		// Look for indications that we won/lost a battle - take note of the time
		var foundpoke = $T('foundpokemon', /Wild (.*) appeared/);
		if (foundpoke) {
			var pokename = foundpoke.textContent.match(/Wild (.*) appeared/)[1];
			cLog.w('Found: '+pokename);
			
			if (Options.searchDratini && dratiniForms.indexOf(pokename) >= 0) {
				if (Options.autoBattle) {
					cLog('Disabling Auto-battle');
					Options.autoBattle = 0;
					Options.save();
				}
			}
		}
		
		var winlossMessage = $T('h2', /You (won|lost) the battle/i);
		if (winlossMessage) {
			Options.nextBattleTime = new Date().getTime() + 10000;
			Options.save();
			
			var winLoss = winlossMessage.textContent.match(/(won|lost)/)[0];
			var xp = $T('.container p', /gained ([\d,]+) experience points/).textContent.match(/gained ([\d,]+) experience points/)[1];
			var dollah = $T('.container p', /([\d,]+) to buy items with/).textContent.match(/([\d,]+) to buy items with/)[1];
			cLog.w('Battle ' + winLoss + ': '+xp+' XP, $'+dollah);
			
			var mapReturn = $T('.optionsList a', /Return to the Map/);
			if (mapReturn) {
				w.location.href = mapReturn.href;
			}
		}
		
		// Look for "security" input - always solve
		var securityInput = $('security');
		if (securityInput) {
			securityInput.value = $$('input[name="securitycode"]')[0].value;
		}
		
		if (Options.autoBattle) {
			// Look for opportunity to initiate battle
			var battleButton = $$('form input[name="wildpoke"][type="submit"]');
			if (battleButton.length) {
				var timeUntilBattle = (Options.nextBattleTime || 0) - new Date().getTime();
				if (timeUntilBattle > 0) {
					setTimeout(battleButton[0].form.submit, timeUntilBattle);
				}  else {
					battleButton[0].form.submit();
				}
				return;
			}
			
			var rebattleOpponent = $T('.optionsList a', /Rebattle Opponent/);
			if (rebattleOpponent) {
				var timeUntilBattle = (Options.nextBattleTime || 0) - new Date().getTime();
				if (timeUntilBattle > 0) {
					setTimeout(function(){w.location.href = rebattleOpponent.href;}, timeUntilBattle);
				}  else {
					w.location.href = rebattleOpponent.href;
				}
				return;
			}
			
			// Look for battle continue button
			var continueButton = $$('form[id="battleForm"] input[type="submit"]');
			if (continueButton.length) {
				continueButton[0].form.submit();
				return;
			}
			
			var searchGrass = $$('form input[type="submit"][value="Search"]');
			if (searchGrass.length) {
				searchGrass[0].click();
			}
		}

		
		if (Options.autoSearch) {

		
			// Look for opportunity to initiate battle
			var battleButton = $$('form input[name="wildpoke"][type="submit"]');
			if (battleButton.length) {
				return;
			}
			
			// Look for battle continue button
			var continueButton = $$('form[id="battleForm"] input[type="submit"]');
			if (continueButton.length) {
				return;
			}
			
			var searchGrass = $$('form input[type="submit"][value="Search"]');
			if (searchGrass.length) {
				searchGrass[0].click();
			}
			
		}
	} ;
	
	readPage();
	
})(typeof unsafeWindow == 'undefined' ? window : unsafeWindow);