// ==UserScript==
// @name           percius
// @namespace      percius
// @include        http://*pokemonvortex.org/*
// @exclude        http://*pokemonvortex.org/adv.php*
// ==/UserScript==

var legends = [
	// Custom
	'Mystic Sableye',
	'Mystic Spiritomb',


	// Grass
	'Shaymin (Sky)',
	'Mystic Shaymin (Sky)',
	'Mystic Latios',
	'Mystic Latias',
	'Mystic Rayquaza',
	'Mystic Mew',
	'Mystic Cresselia',
	'Mystic Mesprit',
	'Shiny Shaymin (Sky)',
	'Shiny Latios',
	'Shiny Latias',
	'Shiny Rayquaza',
	'Shiny Mew',
	'Shiny Cresselia',
	'Shiny Mesprit',
	'Dark Shaymin (Sky)',
	'Dark Latios',
	'Dark Latias',
	'Dark Rayquaza',
	'Dark Shaymin',
	'Dark Mew',
	'Dark Cresselia',
	'Dark Mesprit',
        'Celebi (Eternal)',
        'Meloetta (Aria)',
        'Meloetta (Pirouette)',
        'Mystic Celebi (Eternal)',
        'Mystic Meloetta (Aria)',
        'Mystic Meloetta (Pirouette)',
        'Dark Celebi (Eternal)',
        'Dark Meloetta (Aria)',
        'Dark Meloetta (Pirouette)',
        'Shiny Celebi (Eternal)',
        'Shiny Meloetta (Aria)',
        'Shiny Meloetta (Pirouette)',





	// Grass (water)
	'Manaphy',
	'Phione',
	
	// Ice
	'Articuno',
	'Mystic Articuno',
	'Mystic Suicune',
	'Mystic Lugia',
	'Mystic Regice',
	'Mystic Kyurem',
	'Shiny Articuno',
	'Shiny Suicune',
	'Shiny Lugia',
	'Shiny Regice',
	'Shiny Kyurem',
	'Dark Articuno',
	'Dark Suicune',
	'Dark Lugia',
	'Dark Regice',
	'Dark Kyurem',
	
	

	
	// Cave (land)
	'Arceus',
        'Mystic Groudon',
	'Mystic Arceus',
	'Mystic Regigigas',
	'Mystic Palkia',
	'Mystic Dialga',
	'Mystic Deoxys',
	'Mystic Registeel',
	'Mystic Regirock',
	'Mystic Mewtwo',
	'Mystic Tornadus',
	'Mystic Landorus',
	'Shiny Groudon',
	'Shiny Arceus',
	'Shiny Regigigas',
	'Shiny Palkia',
	'Shiny Dialga',
	'Shiny Deoxys',
	'Shiny Registeel',
	'Shiny Regirock',
	'Shiny Mewtwo',
	'Shiny Virizion',
	'Shiny Reshiram',
	'Shiny Zekrom',
	'Shiny Genesect',
	'Shiny Tornadus',
	'Shiny Landorus',
	'Dark Arceus',
	'Dark Regigigas',
	'Dark Palkia',
	'Dark Deoxys',
	'Dark Jirachi',
	'Dark Registeel',
	'Dark Regirock',
	'Dark Virizion',
	'Dark Reshiram',
	'Dark Tornadus',
        'Mewtwo (Armor)',
        'Shiny Mewtwo (Armor)',
        'Mystic Mewtwo (Armor)',
        'Acient Mewtwo (Armor)',
        'Dark Mewtwo (Armor)',
        'Shiny Arceus (Bug)',
        'Shiny Arceus (Dark)',
        'Shiny Arceus (Dragon)',
        'Shiny Arceus (Electric)',
        'Shiny Arceus (Fighting)',
        'Shiny Arceus (Fire)',
        'Shiny Arceus (Flying)',
        'Shiny Arceus (Ghost)',
        'Shiny Arceus (Grass)',
        'Shiny Arceus (Ground)',
        'Shiny Arceus (Ice)',
        'Shiny Arceus (Poison)',
        'Shiny Arceus (Psychic)',
        'Shiny Arceus (Rock)',
        'Shiny Arceus (Steel)',
        'Shiny Arceus (Unknown)',
        'Shiny Arceus (Water)',
        'Shiny Deoxys (Attack)',
        'Shiny Deoxys (Defense)',
        'Shiny Deoxys (Speed)',
        'Dark Arceus (Bug)',
        'Dark Arceus (Dark)',
        'Dark Arceus (Dragon)',
        'Dark Arceus (Electric)',
        'Dark Arceus (Fighting)',
        'Dark Arceus (Fire)',
        'Dark Arceus (Flying)',
        'Dark Arceus (Ghost)',
        'Dark Arceus (Grass)',
        'Dark Arceus (Ground)',
        'Dark Arceus (Ice)',
        'Dark Arceus (Poison)',
        'Dark Arceus (Psychic)',
        'Dark Arceus (Rock)',
        'Dark Arceus (Steel)',
        'Dark Arceus (Unknown)',
        'Dark Arceus (Water)',
        'Dark Deoxys (Attack)',
        'Dark Deoxys (Defense)',
        'Dark Deoxys (Speed)',
        'Mystic Arceus (Bug)',
        'Mystic Arceus (Dark)',
        'Mystic Arceus (Dragon)',
        'Mystic Arceus (Electric)',
        'Mystic Arceus (Fighting)',
        'Mystic Arceus (Fire)',
        'Mystic Arceus (Flying)',
        'Mystic Arceus (Ghost)',
        'Mystic Arceus (Grass)',
        'Mystic Arceus (Ground)',
        'Mystic Arceus (Ice)',
        'Mystic Arceus (Poison)',
        'Mystic Arceus (Psychic)',
        'Mystic Arceus (Rock)',
        'Mystic Arceus (Steel)',
        'Mystic Arceus (Unknown)',
        'Mystic Arceus (Water)',
        'Mystic Deoxys (Attack)',
        'Mystic Deoxys (Defense)',
        'Mystic Deoxys (Speed)',
        'Arceus (Bug)',
        'Arceus (Dark)',
        'Arceus (Dragon)',
        'Arceus (Electric)',
        'Arceus (Fighting)',
        'Arceus (Fire)',
        'Arceus (Flying)',
        'Arceus (Ghost)',
        'Arceus (Grass)',
        'Arceus (Ground)',
        'Arceus (Ice)',
        'Arceus (Poison)',
        'Arceus (Psychic)',
        'Arceus (Rock)',
        'Arceus (Steel)',
        'Arceus (Unknown)',
        'Arceus (Water)',
        'Deoxys (Attack)',
        'Deoxys (Defense)',
        'Deoxys (Speed)',







	// Cave (water)
	'Kyogre',
	'Lugia',
	'Keldeo',
	
	// Ghost
	
	'Shiny Mew',
	'Shiny Giratina (Origin)',
        'Shiny Giratina (Sky)',
        'Shiny Giratina',
	'Shiny Rotom',
	'Shiny Mesprit',
	'Shiny Darkrown',
	'Shiny Darkrai',
	'Dark Mew',
	'Dark Giratina',
	'Dark Rotom',
	'Dark Mesprit',
	'Dark Darkrown',
	'Dark Darkrai',
	'Mystic Mew',
	'Mystic Giratina',
	'Mystic Rotom',
	'Mystic Mesprit',
	'Mystic Darkrown',
	'Mystic Darkrai',
        'Shiny Rotom (Cut)',
        'Shiny Rotom (Frost)',
        'Shiny Rotom (Heat)',
        'Shiny Rotom (Spin)',
        'Shiny Rotom (Wash)',
        'Dark Rotom (Cut)',
        'Dark Rotom (Frost)',
        'Dark Rotom (Heat)',
        'Dark Rotom (Spin)',
        'Dark Rotom (Wash)',
        'Mystic Rotom (Cut)',
        'Mystic Rotom (Frost)',
        'Mystic Rotom (Heat)',
        'Mystic Rotom (Spin)',
        'Mystic Rotom (Wash)',
        'Rotom (Cut)',
        'Rotom (Frost)',
        'Rotom (Heat)',
        'Rotom (Spin)',
        'Rotom (Wash)',
        'Mystic Giratina (Origin)',
        'Mystic Giratina (Sky)',
	'Dark Giratina (Origin)',
        'Dark Giratina (Sky)',
        'Giratina (Origin)',
        'Giratina (Sky)',
	
	
	
	// Electric
	'Zapdos',
	'Raikou',
	'Darkrai',
	'Darkrown',
	
	// Fire
	'Heatran',
	'Moltres',
	'Victini'
];
var settings = {
	'keys': ['autoBattle', 'findRare', 'findLegendary','catchPok','findNewpoke'],
	'data': {},
	'save': function() {
		for (var i = 0; i < this.keys.length; i++) {
			GM_setValue(this.keys[i], this.data[this.keys[i]]);
		}
	},
	'load': function() {
		for (var i = 0; i < this.keys.length; i++) {
			this.data[this.keys[i]] = GM_getValue(this.keys[i], false);
		}
	}
};
var movPos = 0;

function moveAround() {
	movPos += 10;
	if (movPos > 360) {
		movPos = 0;
	}
	
	var xpos = parseInt(Math.sin(movPos * (Math.PI / 180))*10);
	var ypos = parseInt(Math.cos(movPos * (Math.PI / 180))*10);
	unsafeWindow.PlayRequest(xpos + 14, ypos + 14, parseInt(Math.random()*8)+1);
/*	var btnArrow = unsafeWindow.document.querySelector('#arrows img[onclick]')
	if (btnArrow) {
		btnArrow.click();
	} else {
		unsafeWindow.console.info('No buttons?');
	}*/
}

function catchPok() {
	try {
		var btnPo = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue"]');
		if (btnPo) {
			btnPo.click();
		}

		var radMaster = unsafeWindow.document.querySelector('#itemForm input[type="radio"][value="Master Ball"]');
		if (radMaster) {
			radMaster.click();
		}
		
		var btnItem = unsafeWindow.document.querySelector('#itemForm input[type="submit"][value="Use Item"]');
		if (btnItem) {
			btnItem.click();
		}
		
		var btnCont2 = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue!"]');
		if (btnCont2) {
			btnCont2.click();
		}

		var linkReturnToMap = unsafeWindow.document.querySelector('.optionsList a');
		if (linkReturnToMap && linkReturnToMap.textContent.trim() == 'Return to the Map') {
			settings.data.nextBattle = new Date().getTime() + 10000;
			unsafeWindow.location.href = linkReturnToMap.href;
		}
	}catch (e) {
		unsafeWindow.console.warn('Exception: ', e);
	}
}

function findNewpoke() {
	var aPoke = unsafeWindow.document.querySelector('#appear p');
	var oldPoke = unsafeWindow.document.querySelector('#appear strong');
	var searchPoke = unsafeWindow.document.querySelector('#alert p')
	if (!aPoke) {
		moveAround();
		return;
	}
	else if (oldPoke) {
		moveAround();
		return;
	}
	else if (searchPoke) {
		moveAround();
		return;
	}
	else {
		var btnDo = unsafeWindow.document.querySelector('input[type="submit"][value="Battle!"]');
		if (btnDo) {
			btnDo.click();
			}
		catchPok();
		return;
	}
}

function findLegendary() {
	var wildText = unsafeWindow.document.querySelector('#appear p');
	if (!wildText) {
		moveAround();
		return;
	}
	
	wildText = wildText.textContent.trim();
	for (var i = 0; i < legends.length; i++) {
		if (wildText.match(legends[i])) {
			var btnDo = unsafeWindow.document.querySelector('input[type="submit"][value="Battle!"]');
			if (btnDo) {
				btnDo.click();
				}
			catchPok();
			return;
		}
	}

	moveAround();	
}

function findRare() {
	var wildText = unsafeWindow.document.querySelector('#appear p');
	if (!wildText) {
		moveAround();
		return;
	}
	
	wildText = wildText.textContent.trim();
	if (!wildText.match(/Wild (Dark|Shiny|Ancient|Mystic)/)) {
		moveAround();
		return;
	}
	
	unsafeWindow.console.info('Rare found ', wildText);
}

function autoBattle() {
	try {
		var btnContinue = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue"]');
		if (btnContinue) {
			btnContinue.click();
		}
		
		var btnContinue2 = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Continue!"]');
		if (btnContinue2) {
			btnContinue2.click();
		}
	
		var btnAttack = unsafeWindow.document.querySelector('#battleForm input[type="submit"][value="Attack!"]');
		if (btnAttack) {
			btnAttack.click();
		}
		
		var linkReturnToMap = unsafeWindow.document.querySelector('.optionsList a');
		if (linkReturnToMap && linkReturnToMap.textContent.trim() == 'Return to the Map') {
			settings.data.nextBattle = new Date().getTime() + 10000;
			unsafeWindow.location.href = linkReturnToMap.href;
		}
		
		// check for battle button
		var btnBattle = unsafeWindow.document.querySelector('#appear form input[type="submit"][value="Battle!"]');
		var linkRebattle = unsafeWindow.document.querySelector('.optionsList a');
		if (btnBattle) {
			// wait until 10 seconds since last battle
			//var delay = GM_getValue('lastBattle');
			window.setTimeout(function() {
				btnBattle.click();
			}, 10000);
		} else if (linkRebattle && linkRebattle.textContent.trim() == 'Rebattle Opponent') {
			window.setTimeout(function() {
				unsafeWindow.location.href = linkRebattle.href;
			}, 10000);
		} else {
			// if not found, click a direction
			var btnArrow = unsafeWindow.document.querySelector('#arrows img[onclick]')
			console.info('arrow', btnArrow);
			if (btnArrow) {
				btnArrow.click();
			}
		}
	} catch (e) {
		unsafeWindow.console.warn('Exception: ', e);
	}
}

function autoContinue() {
	if (settings.data.findRare) {
		findRare();
	}

	if (settings.data.autoBattle) {
		autoBattle();
	}
	
	if (settings.data.findLegendary) {
		findLegendary();
	}
	if (settings.data.catchPok) {
		catchPok();
	}
	if (settings.data.findNewpoke) {
		findNewpoke();
	}
}

unsafeWindow.AjaxRequest = function () {
	if (!this.xmlhttp) {
		try {
			// Try to create object for Firefox, Safari, IE7, etc.
			this.xmlhttp = new XMLHttpRequest();
		} catch (e) {
			try {
				// Try to create object for later versions of IE.
				this.xmlhttp = new ActiveXObject('MSXML2.XMLHTTP');
			} catch (e) {
				try {
					// Try to create object for early versions of IE.
					this.xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					// Could not create an XMLHttpRequest object.
					return false;
				}
			}
		}
	}
	this.method = 'post';
	this.async = true;
	this.url;
	this.query = '';
	this.data = '';
	this.reponseText;
	this.reponseXML;
	this.responseHandler;
	this.abortHandler;
	this.showLoading = false;
	this.send = function () {
		if (this.method && this.url) {
			var self = this;
			this.xmlhttp.onreadystatechange = function () {
				if (self.xmlhttp.readyState == 4) {
					if (self.xmlhttp.status && (self.xmlhttp.status == 200 || self.xmlhttp.status == 304)) {
						//unsafeWindow.console.info('success', self);
						
						self.responseText = self.xmlhttp.responseText;
						if (self.xmlhttp.responseXML) {
							self.responseXML = self.xmlhttp.responseXML;
						} else {
							self.responseXML = null;
						}
						if (self.responseHandler) {
							self.responseHandler();
							
							var evt = document.createEvent('Event');
							evt.initEvent('gm:ajaxhook', false, true);
							document.dispatchEvent(evt);
							
							//autoContinue();
						}
					} else {
						showAlert('<p>An error occured while requesting the data.</p><p>Status Msg: ' + self.xmlhttp.statusText + '</p><p><input type="button" name="ok" value="OK" onclick="removeAlert();" id="alertFocus"></p>');
					}
					if (self.showLoading && self.loading) {
						self.loading.style.visibility = 'hidden';
					}
				}
			}
			if (this.showLoading) {
				this.displayLoading();
			}
			this.xmlhttp.open(this.method, this.url + '?' + encodeURI(this.query), this.async);
			if (this.method == 'post') {
				this.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			this.xmlhttp.send(encodeURI(this.data));
		} else {
			showAlert("<p>An error occured while requesting the data.</p><p>No method, URL, and/or query string provided.</p><p><input type=\"button\" name=\"ok\" value=\"OK\" onclick=\"removeAlert();\" id=\"alertFocus\"></p>");
		}
	}
	this.abort = function () {
		this.xmlhttp.onreadystatechange = function () {};
		this.xmlhttp.abort();
		if (this.abortHandler) {
			this.abortHandler();
		}
	}
	this.getFormValues = function (form) {
		for (i = 0; i < form.elements.length; i++) {
			switch (form.elements[i].type) {
			case 'text':
			case 'hidden':
			case 'password':
			case 'textarea':
				this.data += form.elements[i].name + "=" + form.elements[i].value + "&";
				break;
			case 'checkbox':
			case 'radio':
				if (form.elements[i].checked) this.data += form.elements[i].name + "=" + form.elements[i].value + "&";
				break;
			case 'select-one':
				this.data += form.elements[i].name + "=" + form.elements[i].options[form.elements[i].selectedIndex].value + "&";
				break;
			}
		}
		this.data = this.data.substr(0, (this.data.length - 1));
	}
	this.appendHTML = function (object, flag) {
		if (this.xmlhttp.responseText) {
			if (flag) {
				object.innerHTML = this.responseText;
			} else {
				object.innerHTML += this.responseText;
			}
		} else {}
	}
	this.displayLoading = function () {
		if (this.showLoading == 'sidebar') {
			this.loading = document.getElementById('sidebarLoading');
			this.loading.style.height = document.getElementById('sidebar').offsetHeight - 2 + 'px';
			this.loading.style.width = document.getElementById('sidebarContent').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'message') // message
		{
			this.loading = document.getElementById('messageContent');
			this.loading.style.height = document.getElementById('message').offsetHeight + 'px';
			this.loading.style.width = document.getElementById('message').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 75px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'messageList') // message list
		{
			this.loading = document.getElementById('messageList');
			this.loading.style.height = document.getElementById('messageList').offsetHeight + 'px';
			this.loading.style.width = document.getElementById('messageList').offsetWidth + 'px';
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 50px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'map') // map
		{
			this.loading = document.getElementById('mapLoading')
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading_white.gif" width="100" height="100" alt="Loading..." /></p>';
		} else if (this.showLoading == 'live') {
			this.loading = document.getElementById('loading');
			this.loading.style.height = document.getElementById('scroll').offsetHeight + 'px';
			if (document.getElementById('scrollContent')) {
				this.loading.style.width = document.getElementById('scrollContent').offsetWidth + 'px';
			} else {
				this.loading.style.width = document.getElementById('scroll').offsetWidth + 'px';
			}
			this.loading.innerHTML = '<p class="large" style="margin-top: 75px; text-align: center;"><strong>Waiting for the other user to respond...</strong></p><p style="text-align: center;">You have been waiting <span id="waitTime">0 seconds</span>.</p>';
			waitTime(0);
		} else // main
		{
			this.loading = document.getElementById('loading');
			this.loading.style.height = document.getElementById('scroll').offsetHeight + 'px';
			if (document.getElementById('scrollContent')) {
				this.loading.style.width = document.getElementById('scrollContent').offsetWidth + 'px';
			} else {
				this.loading.style.width = document.getElementById('scroll').offsetWidth + 'px';
			}
			this.loading.innerHTML = '<p style="text-align: center; margin-top: 150px;"><img src="http://static.pokemonvortex.org/images/loading.gif" width="100" height="100" alt="Loading..." /></p>';
		}
		this.loading.style.visibility = 'visible';
	}
}

function createToggler(container, title, varname) {
	var toggleEnable = unsafeWindow.document.createElement('p');
	container.appendChild(toggleEnable);
	toggleEnable.innerHTML = title + ' <b>' + (settings.data[varname] ? 'Enabled' : 'Disabled') + '</b>';
	toggleEnable.addEventListener('click', function() {
		settings.data[varname] = !settings.data[varname];
		toggleEnable.innerHTML = title + ' <b>' + (settings.data[varname] ? 'Enabled' : 'Disabled') + '</b>';
		settings.save();
		autoContinue();
	}, false);
}

function init() {
	var iframes = unsafeWindow.document.getElementsByTagName('iframe');
	for (var i = 0; i < iframes.length; i++) {
		iframes[i].parentNode.removeChild(iframes[i]);
	}
	var sty = unsafeWindow.document.createElement('style');
	unsafeWindow.document.querySelector('head').appendChild(sty);
	sty.textContent = '#fscctrl { background: green; border: 1px solid yellow; cursor:pointer; margin: auto; padding: 10px; width: 1010px; } #fscctrl p { margin: 0; } #alert{position:absolute; z-index: 1; background:#ffc; padding: 0 10px; right: 0; width: 100px;} #alert p { margin: 0; } #loading {z-index: 0; top: 0; height: 200px;} #loading p {margin-top:0 !important;} #header{ height: 70px; }';
	unsafeWindow.disableSubmitButton = function(form) {
		for (i = 0; i < form.elements.length; i++) {
			if (form.elements[i].type == 'submit') {
				form.elements[i].value = 'Please Wait... or click again - by Percius';
			}
		}
		return true;
	} 
	
	settings.load();
	
	document.addEventListener('gm:ajaxhook', function() {
		autoContinue();
	}, false);
	
	var container = unsafeWindow.document.createElement('div');
	unsafeWindow.document.body.insertBefore(container, unsafeWindow.document.body.firstChild);
	container.setAttribute('id', 'fscctrl');

	createToggler(container, 'Auto-battle', 'autoBattle');
	createToggler(container, 'Find Rare', 'findRare');
	createToggler(container, 'Find Legendary', 'findLegendary');
	createToggler(container, 'Catch Pokemon', 'catchPok');
	createToggler(container, 'Find New Pokemon', 'findNewpoke');

	autoContinue();
}

init();

