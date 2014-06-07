/**
 * hmupdater.user.js
 * Copyright (c) 2008-2009 Aurà©lien Maille
 * Released under the GPL license 
 *
 * Remerciements à  Pata, Ma'chi et les utilisateurs pour leurs rapports de bogue
 * et leurs nombreuses suggestions.
 * 
 * @version 	1.2
 * @author  	Aurà©lien Maille <bobe+hordes@webnaute.net>
 * @link    	http://dev.webnaute.net/Applications/HMUpdater/
 * @license 	http://www.gnu.org/copyleft/gpl.html  GNU General Public License
 * @charset 	UTF-8
 * @modif   	Modifià© pour fonctionner sans le PC
 * @authorModif Lorexe <webmaster@eilati.fr>
 */
// ==UserScript==
// @name           HMUpdater - Patamap
// @namespace      http://lorexe.eilati.fr/hmupdater
// @description    Mise à  jour d'une M@p d'objets à  partir de hordes.fr | Script corrigà© pour fonctionner sans le Poste de Controle
// @include        http://www.hordes.fr/*
// ==/UserScript==
// 
// @todo
// - revoir ixhr, finishUpdate (counter)
// - Ajouter une croix de fermeture en haut à  droite de la boà®te à  message ?
//

const HMU_VERSION  = '1.2';
const HMU_APPNAME  = 'HMUpdater';
const HMU_TIMEOUT  = 10;// en secondes
const HMU_APPHOME  = 'http://dev.webnaute.net/Applications/HMUpdater/';

var Patamap   = { host: 'patamap.com', url: 'http://patamap.com/hmupdater.php', label: 'la Patamap', id: 9, key: null };

const POSTDATA_URL = '';
// pour les navigateurs qui ne supportent pas la fonction GM_xmlhttpRequest() native
const PROXY_URL    = 'http://dev.webnaute.net/hordes/hmu-proxy.php';

//
// Compatibilità© Opera & cie
//
if( typeof(GM_getValue) == 'undefined' ) {
	function GM_getValue(name, defaultVal)
	{
		try {
			return (new RegExp('hmu_' + name + "=([^\\s;]+)", "g"))
				.test(document.cookie) ? unescape(RegExp.$1) : defaultVal;
		}
		catch(e) {
			return defaultVal;
		}
	}
	
	function GM_setValue(name, val)
	{
		var expire = new Date();
		expire.setTime(expire.getTime() + (365*24*60*60*1000));
		
		document.cookie =
			'hmu_' + name + '=' + escape(val) + ';' +
			'expires=' + expire.toGMTString() + ';' +
			'path=/';
	}
}

if( typeof(GM_xmlhttpRequest) == 'undefined' ) {
	function GM_xmlhttpRequest(xhr)
	{
		var data = (xhr.data != null) ?
			new XMLSerializer().serializeToString(xhr.data) : '';
		
		var img = document.createElement('img');
		img.addEventListener('load', function() {
			var code = this.width == 1 ? 'ok' : 'error';
			
			xhr.onload({
				status: 200,
				responseText: '<hordes><headers version="'+HMU_VERSION+'"/><error code="'+code+'"/></hordes>'
			});
		}, false);
		img.addEventListener('error', function() { xhr.onerror(); }, false);
		img.setAttribute('src', PROXY_URL+'?url='+escape(xhr.url)+'&data='+escape(data)+'&rand='+Math.random());
	}
}

if( typeof(window.wrappedJSObject) == 'undefined' ) {
	window.wrappedJSObject = window;
}

if( typeof("".trim) == 'undefined' ) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

function GM_getArrayValue(name, login, defaultValue)
{
	var array = {};
	
	try {
		array = eval(GM_getValue(name, {}));
	}
	catch(e) {}
	
	return (login in array) ? array[login] : defaultValue;
}

function GM_setArrayValue(name, login, value)
{
	var array = {};
	
	try {
		array = eval(GM_getValue(name, {}));
	}
	catch(e) {}
	
	array[login] = value;
	
	var str = '';
	
	if( typeof(array.toSource) == 'undefined' ) {
		for( var index in array ) {
			if( typeof(array[index]) != 'string' && typeof(array[index]) != 'boolean' ) continue;
			
			str += ', ' + index + ': ' +
				(typeof(array[index]) == 'string' ? '"' + array[index] + '"' : array[index]);
		}
		
		str = '({' + str.substr(1, str.length) + '})';
	}
	else {
		str = array.toSource();
	}
	
	GM_setValue(name, str);
}

//
// Fonctions raccourcis
//
function $(id) { return document.getElementById(id); }

function $xpath(expression, contextNode, type)
{
	return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
		.evaluate(expression, contextNode, null, type, null);
}

var HMUpdater = {
	mainNode: null,
	styleSheet: null,
	lock: false,
	error: false,
	counter: 0,
	vars: {
		dried: -1,
		mapInfos: null
	}
};

HMUpdater.initialize = function(step) {
	
	if( document.location.hash.indexOf('#outside') == -1 ) {
		this.form.hide();
		this.message.clear();
		this.coords.set(null);
		$('hmupdater').style.display = 'none';
		
		//
		// Page de connexion au jeu ?
		//
		if( $('hordes_login') != null ) {
			$('hordes_login').addEventListener('submit', function() {
				GM_setValue('login', this.elements['login'].value.trim());
			}, false);
		}
		
		return false;
	}
	else {
		$('hmupdater').style.display = 'block';
	}
	
	this.mainNode = $('generic_section');
	
	if( this.mainNode == null || $('hmu:link') != null ) {
		return false;
	}
	
	//
	// Infos sur la ville
	//
	if( $('mapInfos') != null && /Jour\s+([0-9]+),/.test($('mapInfos').textContent) ) {
		this.vars['mapInfos'] = {};
		this.vars['mapInfos']['days'] = RegExp.$1;
		this.vars['mapInfos']['name'] = $('mapInfos').firstChild.data.trim();
	}
	
	//
	// Ajout du bouton de mise à  jour et du formulaire pour les coordonnà©es
	//
	var actionPanel = $xpath('div[@class="left"]', this.mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	var viewPanel   = $xpath('div[@class="right"]', this.mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	
	if( actionPanel == null || viewPanel == null ) {
		if( step == 1 ) {
			// WorkAround : Parfois, le panneau d'actions n'existe pas encore à  ce moment.
			// On lance donc un timer pour faire le boulot X millià¨mes de seconde plus tard
			var timer = setInterval(function() {
				HMUpdater.initialize(2);
				if( $('hmu:link') != null ) {
					clearInterval(timer);
				}
			}, 50);
		}
		
		return false;
	}
	
	// Formulaire de coordonnà©es
	var coordsForm = document.createElement('form');
	coordsForm.setAttribute('action', '#');
	coordsForm.setAttribute('id', 'hmu:coords');
	coordsForm.innerHTML = '<p>Saisissez les coordonnà©es de la case (format\u00A0: x.y)</p>' +
		'<input type="text" name="coords" class="field"/>' +
		'<input type="submit" value="Valider" class="button"/>' +
		'<input type="reset" value="Annuler" class="button"/>';
	coordsForm.addEventListener('submit', function(evt) {
		evt.preventDefault();
		var coords = this.elements['coords'].value.trim();
		if( /^[0-9]{1,2}(\.|,)[0-9]{1,2}$/.test(coords) ) {
			this.style.display = 'none';
			HMUpdater.coords.set(coords.replace(',', '.'));
			HMUpdater.updateMap();
		}
		else {
			HMUpdater.message.clear();
			HMUpdater.message.show("Mauvais format de coordonnà©es\u00A0! (formats acceptà©s\u00A0: x.y ou x,y)", 6);
		}
	}, false);
	coordsForm.addEventListener('reset', function(evt) {
		this.style.display = 'none';
	}, false);
	
	actionPanel.appendChild(coordsForm);
	
	// Bouton de mise à  jour
	var updateButton = document.createElement('a');
	updateButton.setAttribute('id',    'hmu:link');
	updateButton.setAttribute('class', 'button');
	updateButton.setAttribute('href',  '#outside/hmupdater');
	updateButton.innerHTML = '<img alt="" src="http://data.hordes.fr/gfx/icons/r_explor.gif"/> <span>Mettre à  jour la Map</span>';
	updateButton.lastChild.appendChild(document.createTextNode(this.coords.get() != null ? ' ('+this.coords.get()+')' : ''));
	updateButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		
		if( HMUpdater.lock == false && this.className == 'button' ) {
			HMUpdater.updateMap();
		}
	}, false);
	
	actionPanel.appendChild(updateButton);
	
	//
	// Zone à©puisà©e ?
	// 
	// On và©rifie ici et on stocke l'info. L'utilisation classique à©tant 
	// d'actualiser la page une dernià¨re fois avant de mettre à  jour la carte,
	// on aurait rarement l'info si ce bloc se trouvait dans updateMap())
	// (Contrà´le de case perdu donc perte de l'info dans le code source HTML)
	// 
	if( this.vars['dried'] == -1 ) {
		var driedTest = $xpath('div[@class="left"]/div[@class="driedZone"]',
			this.mainNode, XPathResult.BOOLEAN_TYPE).booleanValue;
		if( driedTest == true ) {// bloc "La zone est à©puisà©e" prà©sent
			this.vars['dried'] = 1;
		}
		else {
			// Si les zombies contrà´lent la zone, on ne sait pas, sinon,
			// c'est que la zone n'est pas à©puisà©e
			driedTest = $xpath('div[@class="feist"]',
				this.mainNode, XPathResult.BOOLEAN_TYPE).booleanValue;
			if( driedTest == false ) {
				this.vars['dried'] = 0;
			}
		}
	}
	
//	GM_log("HMUpdater initialized" + (step == 3 ? " by AJAX request" : (step == 2 ? " by timer" : "")));
};

HMUpdater.updateMap = function() {
	if( this.lock == true ) {
		return false;
	}
	
	this.message.clear();
	
	if( Patamap.key == null ) {
		this.getSecretKey(Patamap);
		return false;
	}
	
	//
	// Rà©cupà©ration de la configuration
	//
	var login  = GM_getValue('login', '');
	var pubkey = GM_getArrayValue('pubkeys', login, '');
	var postdata_url = GM_getArrayValue('postdata_urls', login, POSTDATA_URL);
	
	var updatePatamap = Boolean(GM_getArrayValue('updatePatamap', login, false));
	var updateCustom  = Boolean(GM_getArrayValue('updateCustom', login, false));
	
	if( login == '' || (updatePatamap == false && updateCustom == false) ||
		(updateCustom == true && (pubkey == '' || postdata_url == '')) )
	{
		this.form.onvalidate = function() { HMUpdater.updateMap(); };
		this.form.show();
		return false;
	}
	
	//
	// Rà©cupà©ration des coordonnà©es de la case
	//
	var coords = this.coords.get();
	if( updateCustom == true && coords == null ) {
		this.coords.prompt();
		return false;
	}
	
	//
	// Rà©cupà©ration des donnà©es
	//
	
	// Un bà¢timent dans la zone ?
	var buildingName = '';
	var ruine = $xpath('count(div[@class="outSpot"]//img[@alt="x"])',
		this.mainNode, XPathResult.NUMBER_TYPE).numberValue;
	
	if( ruine == 0 ) {
		buildingName = $xpath('div[@class="outSpot"]/h2',
			this.mainNode, XPathResult.STRING_TYPE).stringValue;
	}
	
	// Rà©cupà©ration du statut de la case
	var caseTag = -1;
	var selectBox = $xpath('div[@class="right"]//select[@name="tid"]',
		this.mainNode, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	if( selectBox != null ) {
		caseTag = parseInt(selectBox.value);
	}
	
	// Rà©cupà©ration du nombre de zombies
	var zombiePts = -1;
	if( $('zombiePts') != null && /([0-9]+)\s+points?/.test($('zombiePts').textContent) ) {
		zombiePts = RegExp.$1;
	}
	
	// Listing des objets prà©sents par terre
	var items = $xpath('div[@class="right"]/ul[@class="tools shortTools outInv"]//img[@alt="item"]',
		this.mainNode, XPathResult.ANY_TYPE);
	var item = null, name = null;
	var itemsArray = [];
	
	while( (item = items.iterateNext()) != null ) {
		name = item.getAttribute('src');
		name = (/\/item_([^\/.]+)/.test(name) == true) ? RegExp.$1 : '';
		
		if( typeof(itemsArray[name]) == 'undefined' ) {
			itemsArray[name] = [];
			itemsArray[name]['broken'] = 0;
			itemsArray[name]['notbroken'] = 0;
		}
		
		if( item.parentNode.className.trim() == 'limited' ) {// Objet cassà©
			itemsArray[name]['broken']++;
		}
		else {
			itemsArray[name]['notbroken']++;
		}
	}
	
	//
	// Gà©nà©ration du document XML
	//
	var doc = document.implementation.createDocument("", "hordes", null);
	
	if( doc.inputEncoding != null ) {
		var pi  = doc.createProcessingInstruction('xml',
			'version="1.0" encoding="' + doc.inputEncoding + '"');
		doc.insertBefore(pi, doc.documentElement);
	}
	
	var headers = doc.createElement('headers');
	headers.setAttribute('version',   HMU_VERSION);
	headers.setAttribute('generator', HMU_APPNAME);
	doc.documentElement.appendChild(headers);
	
	var city = doc.createElement('city');
	city.setAttribute('name', this.vars['mapInfos']['name']);
	city.setAttribute('days', this.vars['mapInfos']['days']);
	doc.documentElement.appendChild(city);
	
	var citizen = doc.createElement('citizen');
	citizen.setAttribute('key', pubkey);
	citizen.setAttribute('login', login);
	doc.documentElement.appendChild(citizen);
	
	var zone = doc.createElement('zone');
	
	// tas de sable à©ventuels
	if( ruine > 0 ) {
		zone.setAttribute('name', 'unknown');
		zone.setAttribute('ruine', ruine);
	}
	// Bà¢timent à©ventuel
	else if( buildingName != '' ) {
		zone.setAttribute('name', buildingName);
	}
	
	if( coords != null ) {
		coords = coords.split('.');
		zone.setAttribute('x', coords[0]);
		zone.setAttribute('y', coords[1]);
	}
	
	zone.setAttribute('tag', caseTag);// Statut de la zone
	zone.setAttribute('dried', this.vars['dried']);// Zone à©puisà©e ou pas, ou inconnu
	zone.setAttribute('zombie', zombiePts);
	doc.documentElement.appendChild(zone);
	
	items = doc.createElement('items');
	doc.documentElement.appendChild(items);
	
	item = doc.createElement('item');
	
	for( name in itemsArray ) {
		if( typeof(itemsArray[name]) != 'object' ) continue;
		
		if( itemsArray[name]['broken'] > 0 ) {
			item = item.cloneNode(false);
			item.setAttribute('name',  name);
			item.setAttribute('count', itemsArray[name]['broken']);
			item.setAttribute('broken', '1');
			items.appendChild(item);
		}
		
		if( itemsArray[name]['notbroken'] > 0 ) {
			item = item.cloneNode(false);
			item.setAttribute('name',  name);
			item.setAttribute('count', itemsArray[name]['notbroken']);
			item.removeAttribute('broken');
			items.appendChild(item);
		}
	}
	
	function ixhr(url, doc)
	{
		this.timer   = null;
		this.method  = (doc != null) ? 'POST' : 'GET';
		this.data    = doc;
		this.url     = url;
		
		/:\/\/([^\/]+)\//.test(url);
		this.host    = RegExp.$1;
		
		this.headers = {
			'X-Handler'  : HMU_APPNAME,
			'User-Agent' : HMU_APPNAME + '/' + HMU_VERSION
		};
		
		this.onerror = function() {
			this.onload = function(){};
			HMUpdater.message.error("Le site <strong>" + this.host + "</strong> ne rà©pond pas\u00A0!");
			HMUpdater.finishUpdate();
		};
		
		this.onload  = function(responseDetails) {
			clearTimeout(this.timer);
			
			var target = '<strong>';
			if( this.host == Patamap.host ) {
				target += Patamap.label;
			}
			else {
				target += this.host;
			}
			target += '</strong>';
			
			if( responseDetails.status == 200 ) {
				var code = message = null;
				
				try {
					// hack PC
					if( responseDetails.responseText.trim().indexOf('<') == -1 ) {
						throw 'skip';
					}
					
					var doc = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml');
					var version = doc.getElementsByTagName('headers')[0].getAttribute('version');
					var error   = doc.getElementsByTagName('error')[0];
					
					code = error.getAttribute('code');
					message = error.textContent.replace(/</g, '&lt;');
					
					if( HMUpdater.checkVersion(version) == true ) {
						HMUpdater.message.clear();
						HMUpdater.message.show("Une nouvelle version du script est disponible " +
							"en <a href='" + HMU_APPHOME + "'>tà©là©chargement</a>.<br>" +
							"Votre version peut ne plus fonctionner correctement, " +
							"vous devriez faire cette mise à  jour " +
							"(Pensez ensuite à  recharger cette page).", -1);
					}
				}
				catch(e) {
					// Spà©cial Poste de Contrà´le
					message = responseDetails.responseText.trim();
					code = (message == 'PC_OK') ? 'ok' : 'error';
				}
				
				if( code == 'ok' ) {
					HMUpdater.message.show("La M@p a à©tà© mise à  jour " +
						(coords != null ? "en <strong>" + coords.join('.') + "</strong>" : '') +
						(multipleUpdate == true ? ' sur ' + target : '') + "\u00A0!");
				}
				else {
					HMUpdater.message.error("Erreur renvoyà©e par " + target +
						(code != null ? '\u00A0: ' + code : '') +
						(message != null ? "<br/><em>" + message + "</em>" : ""),
						(message != null ? message.length/10 : null)
					);
				}
			}
			else {
				HMUpdater.message.error("Erreur HTTP renvoyà©e par " + target +
					"\u00A0: " + responseDetails.status + ' ' + responseDetails.statusText);
			}
			
			HMUpdater.finishUpdate();
		};
		
		// On fait à§a ici pour àªtre dans le scope de la fonction et avoir
		// le bon objet xhr dans la fonction anonyme du setTimeout
		var xhr = this;
		this.timer = setTimeout(function() {xhr.onerror();}, (HMU_TIMEOUT * 1000));
	}
	
	this.lock  = true;
	this.error = false;
	
	// On affichage l'image de chargement
	$('loading_section').style.display = 'block';
	document.body.style.cursor = 'progress';
	
	if( updatePatamap == true ) {
		this.counter++;
		citizen.setAttribute('key', Patamap.key);
		GM_xmlhttpRequest(new ixhr(Patamap.url, doc));
	}
	
	if( updateCustom == true ) {
		citizen.setAttribute('key', pubkey);
		
		var urls = postdata_url.split('|');
		for( var i = 0, m = urls.length; i < m; i++ ) {
			this.counter++;
			GM_xmlhttpRequest(new ixhr(urls[i], doc));
		}
	}
	
	var multipleUpdate = (this.counter > 1);
};// fin de updateMap()

HMUpdater.finishUpdate = function() {
	this.counter--;
	if( this.counter == 0 ) {
		// On masque l'image de chargement
		$('loading_section').style.display = 'none';
		document.body.style.cursor = 'auto';
		
		this.lock = false;
		this.message.show(null);
		
		if( this.error == false ) {
			$('hmu:link').className = 'button off';
		}
	}
};

HMUpdater.coords = {
	value: null,
	
	get: function() {
		return this.value;
	},
	set: function(val) {
		this.value = val;
		
		if( $('hmu:link') != null ) {
			$('hmu:link').lastChild.lastChild.data = (val == null) ? '' : '\u00A0(' + val + ')';
		}
	},
	prompt: function() {
		$('hmu:coords').style.display = 'block';
		$('hmu:coords').elements.namedItem('coords').focus();
	}
};

HMUpdater.message = {
	timer: null,
	html: null,
	delay: 0,
	defaultDelay: 4.5,
	// function(message, delay = 4.5)
	show: function(message) {
		if( this.html == null ) {
			this.create();
		}
		
		if( this.timer != null ) {
			clearInterval(this.timer);
			this.timer = null;
		}
		
		if( message != null && this.delay >= 0 ) {
			var line = document.createElement('div');
			line.innerHTML = message;
			this.html.firstChild.appendChild(line);
			this.delay += (arguments.length > 1 && arguments[1] != null) ? arguments[1] : this.defaultDelay;
		}
		
		if( HMUpdater.lock == false ) {
			this.html.style.opacity = '1.0';
			this.html.style.display = 'block';
			
			if( this.delay > 0 ) {
				this.timer = setTimeout(function() {HMUpdater.message.hide();}, (this.delay * 1000));
			}
			
			this.delay = 0;
		}
	},
	error: function(message) {
		HMUpdater.error = true;
		this.show(message, ((arguments.length > 1 && arguments[1] != null) ? arguments[1] : this.defaultDelay));
		
		var image = document.createElement('img');
		image.setAttribute('alt', '');
		image.setAttribute('class', 'error');
		image.setAttribute('src', '/gfx/forum/smiley/h_warning.gif');
		this.html.firstChild.lastChild.insertBefore(image,
			this.html.firstChild.lastChild.firstChild);
	},
	hide: function() {
		this.timer = setInterval(function() {HMUpdater.message.reduceOpacity();}, 60);
	},
	clear: function() {
		if( this.html != null ) {
			this.delay = 0;
			this.html.style.display = 'none';
			this.html.firstChild.innerHTML = '';
		}
	},
	reduceOpacity: function() {
		var opacity = parseFloat(this.html.style.opacity);
		opacity = (Math.round((opacity - 0.1) * 10) / 10);
		
		this.html.style.opacity = opacity;
		
		if( opacity <= 0 ) {
			clearInterval(this.timer);
			this.clear();
		}
	},
	create: function() {
		HMUpdater.addStyle('#hmu\\:message { display:none; position:fixed; bottom:3.4em; right:2.4em;' +
			'z-index:1001; min-width:250px; max-width:500px; text-align:left;' +
			'border-radius:8px; -moz-border-radius:8px; font-family:"Bitstream Vera Sans",Verdana,sans-serif;}');
		HMUpdater.addStyle('#hmu\\:message img.error { vertical-align:bottom; margin-right:3px; margin-bottom:-1px; }');
		HMUpdater.addStyle('#hmu\\:message img.pointer { position:absolute; right:25px; bottom:-16px; }');
		HMUpdater.addStyle('#hmu\\:message strong { color:#EDCDA9 }');
		HMUpdater.addStyle('#hmu\\:message div div:not(:first-child) { border-top:1px solid #DDAB76; margin-top:4px; padding-top:2px; }');
		
		this.html = document.createElement('div');
		this.html.setAttribute('id', 'hmu:message');
		this.html.setAttribute('class', 'hmu:class:box');
		this.html.appendChild(document.createElement('div'));
		
		var image = document.createElement('img');
		image.setAttribute('alt', '');
		image.setAttribute('class', 'pointer');
		image.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAQAgMAAACXY5xCAAAAAXNSR0IArs4c6QAAAAlQTFRFHQgQXCsg3at2dnylcgAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAABLSURBVAjXLcqxDcAgDETRjxRlB7ZhiSClN8yThn3DnXHh+8VjPT4Y3t6ojhduR0Ax+ki0CUabJAqFkIiQiZCJUGSUlQRmO1HPcun9kAcXQ2R1ivMAAAAASUVORK5CYII=');
		this.html.appendChild(image);
		
		document.body.appendChild(this.html);
	}
};

HMUpdater.form = {
	html: null,
	onvalidate: null,
	
	show: function() {
		if( this.html == null ) {
			this.create();
		}
		
		$('hmu:erase').className = 'toolAction';
		document.body.className = 'hideSwf';
		this.html.style.display = 'block';
	},
	hide: function() {
		if( this.html != null ) {
			document.body.className = '';
			this.html.style.display = 'none';
		}
	},
	toggle: function() {
		if( this.html == null || this.html.style.display != 'block' ) {
			this.show();
		}
		else {
			this.hide();
		}
	},
	validate: function() {
		var login = $('hmu:login').value.trim();
		GM_setValue('login', login);
		
		if( login != '' ) {
			var pubkey = $('hmu:pubkey').value.trim();
			GM_setArrayValue('pubkeys', login, pubkey);
			
			var postdata_url = $('hmu:url').value.trim();
			// hack patam@p carte sans flux
			if( /^http:\/\/(www\.)?patastream\.(com|fr)\//.test(postdata_url) ) {
				postdata_url = postdata_url.replace('view_ville', 'xmlpost');
			}
			// end hack
			
			GM_setArrayValue('postdata_urls', login, postdata_url);
			
			GM_setArrayValue('updatePatamap', login, $('hmu:choice:patamap').checked);
			GM_setArrayValue('updateCustom', login, $('hmu:choice:custom').checked);
		}
	},
	create: function() {
		HMUpdater.addStyle('#hmu\\:form { display:none; position:fixed; width:100%; top:0; left:0; margin-top:22%; }');
		HMUpdater.addStyle('#hmu\\:form .hmu\\:class\\:box { position:absolute; z-index:1002;' +
			'left:0; right:0; margin:auto; width:550px; outline:2px solid black; padding:5px; border-color:#b37c4a; }');
		HMUpdater.addStyle('#hmu\\:form .form { width:auto; margin:0; padding:5px; }');
		HMUpdater.addStyle('#hmu\\:form .row label { width:200px; cursor:pointer; }');
		HMUpdater.addStyle('#hmu\\:form .row.checkbox label { width:48%; padding-left:2px; }');
		HMUpdater.addStyle('#hmu\\:form .row.checkbox label * { vertical-align: middle; }');
		HMUpdater.addStyle('#hmu\\:form .row.checkbox input { margin-top:2px; }');
		HMUpdater.addStyle('#hmu\\:form .special { min-height:0;margin:8px 2px 10px;' +
			'padding-left:20px;background:transparent url("http://data.hordes.fr/gfx/icons/small_move.gif") no-repeat center left; }');
		HMUpdater.addStyle('#hmu\\:form a.toolAction { text-decoration:underline; }');
		HMUpdater.addStyle('#hmu\\:form a.helpLink { position:relative;top:2px; }');
		
		this.html = document.createElement('div');
		this.html.setAttribute('id', 'hmu:form');
		this.html.innerHTML = '<div class="hmu:class:box"><form action="#" class="form">' +
'<div class="row checkbox">' +
'<label><input type="checkbox" id="hmu:choice:pc" disabled="disabled"> <span>Mettre à  jour le Poste de Controle</span></label>' +
'<label><input type="checkbox" id="hmu:choice:patamap"> <span>Mettre à  jour ' + Patamap.label + '</span></label>' +
'</div><div class="row checkbox">' +
'<label><input type="checkbox" id="hmu:choice:custom"> <span>Spà©cifier une autre URL</span></label>' +
'<a class="helpLink" onmouseout="js.HordeTip.hide()" onmouseover="js.HordeTip.showHelp(this,\'Vous pouvez à©galement spà©cifier plusieurs URLs en les sà©parant avec une barre verticale (|). Les donnà©es seront alors envoyà©es à  chaque URL.\');document.getElementById(\'tooltip\').style.zIndex = 1003;" onclick="return false;" href="#">' +
'<img alt="Aide" src="http://data.hordes.fr/gfx/design/helpLink.gif"/></a>' +
'</div><div class="row">' +
'<label for="hmu:login">Votre pseudo&nbsp;:</label>' +
'<input type="text" id="hmu:login" class="field" size="35"/>' +
'</div><div id="hmu:custom:infos">' +
'<div class="row">' +
'<label for="hmu:url">URL de lâ€™application externe&nbsp;:</label>' +
'<input type="text" id="hmu:url" class="field" size="35"/>' +
'</div><div class="row">' +
'<label for="hmu:pubkey">Votre clef API&nbsp;:</label>' +
'<input type="text" id="hmu:pubkey" class="field" size="35"/>' +
'</div><div class="row special">' +
'<a id="hmu:erase" class="toolAction" href="#outside/hmupdater?do=erase.coords">Rà©initialiser les coordonnà©es</a>' +
'</div></div>' +
'<input type="submit" value="Enregistrer les informations" class="button"/>' +
'</form></div>' +
'<div class="black"></div>';
		
		document.body.appendChild(this.html);
		
		// Initialisation des champs du formulaire
		var login  = GM_getValue('login', '');
		var pubkey = GM_getArrayValue('pubkeys', login, '');
		var url    = GM_getArrayValue('postdata_urls', login, '');
		
		var updatePatamap = Boolean(GM_getArrayValue('updatePatamap', login, false));
		var updateCustom  = Boolean(GM_getArrayValue('updateCustom', login, false));
		
		$('hmu:choice:patamap').checked = updatePatamap;
		$('hmu:choice:custom').checked  = updateCustom;
		
		if( updateCustom == false ) {
			$('hmu:custom:infos').style.display = 'none';
		}
		
		$('hmu:login').value  = login;
		$('hmu:pubkey').value = pubkey;
		$('hmu:url').value    = url;
		
		$('hmu:choice:custom').addEventListener('change', function(evt) {
			$('hmu:custom:infos').style.display =
				this.checked == true ? 'block' : 'none';
		}, false);
		
		$('hmu:erase').addEventListener('click', function(evt) {
			evt.preventDefault();
			HMUpdater.coords.set(null);
			this.className = 'lockedAction';
		}, false);
		
		this.html.firstChild.firstChild.addEventListener('submit', function(evt) {
			evt.preventDefault();
			HMUpdater.form.validate();
			HMUpdater.form.hide();
			
			if( HMUpdater.form.onvalidate != null ) {
				var callback = HMUpdater.form.onvalidate;
				HMUpdater.form.onvalidate = null;
				callback();
			}
			else {
				HMUpdater.message.clear();
				HMUpdater.message.show("La configuration a à©tà© sauvegardà©e");
			}
		}, false);
	}
};

HMUpdater.addStyle = function(rule) {
	if( this.styleSheet == null ) {
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		document.getElementsByTagName('head')[0].appendChild(style);
		this.styleSheet = style.sheet;
	}
	
	try {
		return this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
	}
	catch(e) { return -1; }
};

HMUpdater.checkVersion = function(version) {
	var v1 = String(HMU_VERSION).split('.');
	var v2 = String(version).split('.');
	
	v1[0] = Number(v1[0]);v1[1] = Number(v1[1]);
	v2[0] = Number(v2[0]);v2[1] = Number(v2[1]);
	
	return (v2[0] > v1[0] || (v2[0] == v1[0] && v2[1] > v1[1]));
};

HMUpdater.getSecretKey = function(webapp) {
	this.lock = true;
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/disclaimer?id=' + webapp.id + ';rand='  + Math.random(), true);
	xhr.setRequestHeader('Accept', 'text/xml,application/xml');
	xhr.setRequestHeader("X-Handler","js.XmlHttp");
	xhr.onload = function() {
		if( /name=\"key\"\s+value=\"([a-zA-Z0-9]+)\"/.test(this.responseText) ) {
			webapp.key = RegExp.$1;
		}
		
		if( Patamap.key != null ) {
			HMUpdater.lock = false;
			HMUpdater.updateMap();
		}
	};
	xhr.send(null);
};

//
// Bouton "HMUpdater"
//
HMUpdater.addStyle('#hmupdater { display:none; position:fixed; right:5px; bottom:5px; z-index:1000; border:2px solid black; }');
HMUpdater.addStyle('.hmu\\:class\\:box { border:1px solid #DDAB76; padding:5px 10px; color:inherit; background-color:#5c2b20; }');
HMUpdater.addStyle('#hmupdater strong { display:block; width:8.5em; text-align:center; cursor:pointer; color:#f0d79e; }');
HMUpdater.addStyle('#hmupdater strong:hover { color:#c88f60; }');

// Formulaire de coordonnà©es
HMUpdater.addStyle('#hmu\\:coords { display:none; position:absolute; z-index:2;' +
	'width:260px; margin-top:-40px; margin-left:5px; padding:4px; font-size:8pt;' +
	'background-color:#3B3249; border:1px solid #AFACC1; outline:2px solid black; }');
HMUpdater.addStyle('#hmu\\:coords p { background-color:#696486; margin-bottom:0; padding:0 3px; text-align:left; }');
HMUpdater.addStyle('#hmu\\:coords .field { display:block; margin:15px auto; }');
HMUpdater.addStyle('#hmu\\:coords .button { width:125px;float:left;text-align:center; }');
HMUpdater.addStyle('#hmu\\:coords .button + .button { float:right; }');

// Bouton de mise à  jour
HMUpdater.addStyle('#hmu\\:link * { vertical-align:middle; }');

var root = document.createElement('div');
root.setAttribute('id', 'hmupdater');
root.setAttribute('title', 'Cliquez pour configurer le script');
root.innerHTML = '<strong class="hmu:class:box">HMUpdater</strong>';
root.firstChild.addEventListener('click', function() {
	HMUpdater.form.toggle();
}, false);
document.body.appendChild(root);

//
// Initialisation du script
//
if( typeof(window.wrappedJSObject.js) != 'undefined' ) {
	//
	// On s'intercalle devant la mà©thode js.XmlHttp.onData() pour mettre à  jour
	// les coordonnà©es à  chaque changement de case
	//
	window.wrappedJSObject.js.XmlHttp._hmu_onData = window.wrappedJSObject.js.XmlHttp.onData;
	window.wrappedJSObject.js.XmlHttp.onData = function(data) {
		var url = this.urlForBack;
		
		if( /outside\/go\?x=([0-9-]+);y=([0-9-]+)/.test(url) ) {
			
			if( HMUpdater.coords.get() != null ) {
				
				var coords = HMUpdater.coords.get().split('.');
				coords[0] = parseInt(coords[0]) + parseInt(RegExp.$1);
				coords[1] = parseInt(coords[1]) + parseInt(RegExp.$2);
				HMUpdater.coords.set(coords.join('.'));
			}
			
			HMUpdater.vars['dried'] = -1;
		}
		
		this._hmu_onData(data);
		HMUpdater.initialize(3);
	};
	
	HMUpdater.initialize(1);
}



