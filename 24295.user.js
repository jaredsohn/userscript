// ==UserScript==
// @name           Sleepy
// @version        0.3
// @author         cafaro
// @namespace      http://userscripts.org/scripts/show/24295
// @description    Enhances Omerta's gameplay.
// @include        http://*barafranca.*/*
// @include        http://*omerta.*/*
// @include        http://cafaro.vennezia.com/sleepy/interface.xul?extension=*
// @resource       logo http://cafaro.vennezia.com/sleepy/images/logo.png
// @resource       favorite http://cafaro.vennezia.com/sleepy/images/favorite.png
// @resource       lock http://cafaro.vennezia.com/sleepy/images/lock.gif
// @resource       favicon http://cafaro.vennezia.com/sleepy/images/favicon.png
// @resource       interface http://cafaro.vennezia.com/sleepy/images/interface.png
// @resource       customize_menu http://cafaro.vennezia.com/sleepy/images/customize_menu.png
// ==/UserScript==

/* 
 * Copyright (C) 2008 cafaro
 *
 * Sleepy is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Sleepy is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Sleepy.  If not, see <http://www.gnu.org/licenses/>.
 */

String.prototype.deserialize = function() {
	return this.split(', ')[0] != '' ? this.split(', ') : [];
}

var Sleepy = {
	version: 			'0.3',	
	ranks: 				['Empty-suit', ['Delivery Boy', 'Delivery Girl'], 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', ['Capodecina', 'Godfather', 'First Lady']],
	crushCars:			['T-Ford Model T Tourer', 'Crossley 20/25 Landaulette', 'BMW 3/15 Wartburg Roadster', 'Crossley Super Silver', 'Morris Minor Tourer', 'Crossley 10hp Sports Roadster', 'Crossley 10hp Sports Tourer', 'Alvis TJ', 'BMW 1933 303', 'Bugatti Type 13 Torpedo', 'Bugatti Type 38 Torpedo', 'Pierce-Arrow 7W Sedan', 'Ford Model T Screenside Truck', 'Ford Model TT United Parcel Truck', 'Ford Model T Grocers Truck', 'Morgan Super Sport'],
	raceCars:			['Mercedes-Benz W25', 'Mercedes-Benz W125', 'Mercedes-Benz W25 Avus Streamliner'],
	heistCars:			['Nash Big Six Town Sedan', 'Buick Model 57', 'Nash Standard 8', 'Hudson-Essex Super Six', 'Packard 1100 Sedan', 'Packard 740 Roadster', 'Bentley 3.5 Litre Coupe', 'Lincoln KA', 'Reo Royale 8 Convertible', 'Mercedes-Benz 320 Cabriolet', 'Bugatti Type 35', 'Duesenberg SJ', 'Bugatti Type 32 Tank', 'Alfa Romeo 8C 2900B Spyder', 'Bugatti Type 57C Atalante', 'Ford Model A Roadster', 'Chevrolet  Half-Ton Pickup'],
	OCCars:				['Horch 930V Phaeton', 'Bentley 4.5 Litre Barker 3 Position Drophead', 'Rolls Royce Phantom III', 'Crossley Streamline', 'Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 1933', 'Alfa Romeo 6C 2500 Sport Touring Berlinetta', 'Bentley 3 Litre Vanden Plas Tourer', 'Bugatti Type 50 Coupe Profile\u00C3\u00A9', 'Duesenberg J Rollston Berline', 'Auburn 851 SC Supercharged Speedster', 'Ford Deluxe', 'Auburn 852 Supercharged', 'Oldsmobile Model F-30', 'Duesenberg Model X Locke', 'Dodge Thunderbolt Concept'],
	MOCCars:			['Crossley Kegresse Half-Track Truck', 'Cadillac V16 Series 452 C Fleetwood Towncar Cabriolet 1933', 'Alfa Romeo 6C 2500 Sport Touring Berlinetta', 'Bentley 3 Litre Vanden Plas Tourer', 'Bugatti Type 50 Coupe Profile\u00C3\u00A9', 'Duesenberg J Rollston Berline', 'Auburn 851 SC Supercharged Speedster', 'Ford Deluxe', 'Auburn 852 Supercharged', 'Duesenberg X Locke', 'Pacard Custom Limousine', 'Dodge Thunderbolt Concept', 'Oshkosh Model A'],
	
	accessKeys: 		     	getValue('accessKeys', './information.php, S, ./prices.php, P, ./travel.php, T, ./bullets2.php, B, ./jail.php, J, ./messages.php, I, ./smuggling.php, M, ./BeO/webroot/index.php?module=Crimes, C, ./BeO/webroot/index.php?module=Cars, N, ./BeO/webroot/index.php?module=GroupCrimes, G, ./shootingrange.php, R, ./obay.php, O').deserialize(),	
	anonymous: 			getValue('anonymous', true),
	autoBooze:	 		getValue('autoBooze'),
	autoNarcs: 			getValue('autoNarcs'),
	clipboard:			getValue('clipboard', ''),
	collapsedItems:			getValue('collapsedItems', '0, 1').deserialize(),
	collapsedTables: 		getValue('collapsedTables', '0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13').deserialize(),
	crimeOption: 			getValue('crimeOption', 'chancebottle'),
	fams:				getValue('fams', '').deserialize(),	
	famsColor: 			getValue('famsColor', '#dbdbdb'),
	favicon:			getValue('favicon', true),
	friends: 			getValue('friends', '').deserialize(),
	friendsColor: 			getValue('friendsColor', '#f5f5dc'),
	health:				getValue('health', 100),
	hiddenLinks: 			getValue('hiddenLinks', './arcade.php, ./disleague.php, ./thetimes/, ./chat/, ./forums/index.php, ./tellfriend.php, ./main.php, ./gallery.php, ./main.php?logout=true').deserialize(),
	hiddenItems:			getValue('hiddenItems', '').deserialize(),
	highlightFamsAtStats:		getValue('highlightFamsAtStats', true),
	highlightFamsInJail:		getValue('highlightFamsInJail', true),
	highlightFriendsAtStats:	getValue('highlightFriendsAtStats', true),
	highlightFriendsInJail:		getValue('highlightFriendsInJail', true),
	imageCodeProtection:		getValue('imageCodeProtection', true),
	keyStrokes:			getValue('keyStrokes', 0),
	lastVote:			getValue('lastVote', 0),
	lockedCars: 			getValue('lockedCars', '').deserialize(),
	lockedMessages:			getValue('lockedMessages', '').deserialize(),
	logo:				getValue('logo', true),
	mouseClicks:			getValue('mouseClicks', 0),
	name: 				getValue('name'),
	news: 				getValue('news', true),
	notifyIncompatibility:		getValue('notifyIncompatibility', true),
	notifyUpdates:			getValue('notifyUpdates', true),
	onlineTime:			getValue('onlineTime', 0),
	pages:				getValue('pages', '?module=Crimes, ?module=Cars, /shootingrange.php, /smuggling.php, /travel.php, /jail.php, /detective.php, /bank.php, /family.php, /user.php, /messages.php, ?r=statistics, /garage.php, /bullets2.php, /obay.php, /menu.php').deserialize(),
	personalStats:			getValue('personalStats', false),
	rank: 				getValue('rank'),
	requests: 			getValue('requests', 0),
	rp: 				getValue('rp'),
	stripMenu:	 		getValue('stripMenu', false),
	stripNews:	 		getValue('stripNews', false),
	stripTop:	 		getValue('stripTop', false),
	takeOverFam: 			getValue('takeOverFam', true),
	takeOverFriends: 		getValue('takeOverFriends', true),
};

function extension(hostname) {
	switch (hostname || window.location.hostname) {
		case 'deathmatch.barafranca.com':
			case 'dm.barafranca.com':
				return 'dm';
				break;
		case 'www.barafranca.com.br':
			case 'barafranca.br':
				return 'br';
				break;	
		case 'www.barafranca.com':
			case 'barafranca.com':
				return 'com';
				break;
		case 'www.barafranca.com.pt':
			case 'barafranca.com.pt':
				return 'pt';
				break;
		case 'www.barafranca.de':
			case 'barafranca.de':
				return 'de';
				break;
		case 'www.barafranca.fr':
			case 'barafranca.fr':
				return 'fr';
				break;
		case 'www.barafranca.gen.tr':
			case 'barafranca.gen.tr':
				return 'tr';
				break;
		case 'www.barafranca.net.cn':
			case 'barafranca.net.cn':
				case 'www.omerta.com.cn':
					case 'omerta.com.cn':
						return 'cn';
						break;
		case 'www.barafranca.nl':
			case 'barafranca.nl':
				return 'nl';
				break;
		case 'www.barafranca.no':
			case 'barafranca.no':
				return 'no';
				break;
		case 'www.barafranca.com.pl':
			case 'barafranca.com.pl':
				return 'pl';
				break;
		case 'cafaro.vennezia.com':
			return window.location.search.split('=')[1];																																																
		default:
			return undefined;							
	}
}

var enabled = Sleepy.pages.indexOf(window.location.pathname) != -1 || Sleepy.pages.indexOf(window.location.search) != -1 ? true : false;

String.prototype.remove = function(subString) {
	return this.replace(subString, '');
}

function setValue(name, value) {
	var name = extension() + '.' + name;
	GM_setValue(name, value);
}

function randInt(min, max) {
 	return Math.round(Math.random() * (max - min) + min);
}

function int(string) {
	var matches = string.match(/\d+/g);
	var int = '';
	matches.forEach(function(element) {	
		int += element;
	});
	return parseInt(int);
}
	
function getValue(name, defaultValue) {
	var name = extension() + '.' + name;
	if (defaultValue != undefined) {
		return GM_getValue(name, defaultValue);
	} else {
		return GM_getValue(name);
	}
}

function duration(seconds) {
	var days = seconds / (3600 * 24);
	var hours = (days - Math.floor(days)) * 24;
	var minutes = (hours - Math.floor(hours)) * 60;
	var seconds = (minutes - Math.floor(minutes)) * 60;
			
	var duration = [];
	
	duration.push(Math.floor(days) + 'D');
	duration.push((Math.floor(hours) < 10 ? '0' : '') + Math.floor(hours) + 'H');
	duration.push((Math.floor(minutes) < 10 ? '0' : '') + Math.floor(minutes) + 'M');
	duration.push((Math.floor(seconds) < 10 ? '0' : '') + Math.floor(seconds) + 'S');
	
	if (days < 1) {
		duration.splice(Math.floor(days) + 'D', 1);
		if (hours < 1) {
			duration.splice((Math.floor(hours) < 10 ? '0' : '') + Math.floor(hours) + 'H', 1);
			if (minutes < 1) {
				duration.splice((Math.floor(seconds) < 10 ? '0' : '') + Math.floor(seconds) + 'S', 1);
			}
		}
	}
	
	return duration.join(' ');	
}


function nextPriceChange(mins) {
	var mins = new Date().getMinutes();
	if (mins < 30) {
		return 30 - mins;
	}
	if (mins >= 30) {
		return 60 - mins;
	}
}

function format(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,')
}

function desc(a, b) {
	return b - a;
}

function asc(a, b) {
	return a - b;
}

function imageCodeProtection(formIndex, elementIndex) {
	if (Sleepy.imageCodeProtection) {
		document.forms[formIndex].addEventListener('submit', function(event) {
			var code = document.forms[formIndex].elements[elementIndex];
			if (code.value.length != 3 || code.value.match(/[^a-zA-Z0-9]/)) {
				event.preventDefault();
				code.value = null;
				code.focus();
			}
		}, true);
	}
}

if (GM_getValue('version') != Sleepy.version) {
	GM_setValue('version', Sleepy.version);
	alert('This is the first time you are running Sleepy ' + Sleepy.version + '.\nYour browser will now be refreshed.');
	window.top.location.reload();
}

if (window.location.pathname == '/information.php') {
	var main = document.getElementsByTagName('tbody')[1];
	var waitingTimes = document.getElementsByTagName('tbody')[2];
	var bars = document.getElementsByTagName('tbody')[3];
	
	var user = main.rows[2].cells[1];
	var a = document.createElement('a');
	a.textContent = user.textContent, a.href = 'user.php?nick=' + user.textContent;
	user.textContent = null;
	user.appendChild(a);
	setValue('name', user.textContent);
	
	var testament = main.rows[11].cells[1];
	var a = document.createElement('a');
	a.textContent = testament.textContent, a.href = 'user.php?nick=' + testament.textContent;
	testament.textContent = null;
	testament.appendChild(a);
	
	var fam = main.rows[3].cells[1].getElementsByTagName('a')[0];
	if (fam && Sleepy.fams.indexOf(fam.textContent) == -1 && Sleepy.takeOverFam) {
		Sleepy.fams.push(fam.textContent);
		setValue('fams', Sleepy.fams.join(', '));
	}
	
	setValue('rank', main.rows[7].cells[1].textContent);
	setValue('rp', bars.getElementsByTagName('table')[0].textContent.match(/(\d|\.)+/)[0]);
	setValue('health', parseInt(bars.getElementsByTagName('table')[1].textContent));
	
	var tr = [document.createElement('tr'), document.createElement('tr'), document.createElement('tr'), document.createElement('tr')];
	var td = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')];
	
	bars.getElementsByTagName('tbody')[0].rows[0].cells[0].width = parseInt(bars.getElementsByTagName('tbody')[0].textContent) == 0 ? '1%' : bars.getElementsByTagName('tbody')[0].textContent;
	bars.getElementsByTagName('tbody')[1].rows[0].cells[0].width = parseInt(bars.getElementsByTagName('tbody')[1].textContent) == 0 ? '1%' : bars.getElementsByTagName('tbody')[1].textContent;
	bars.getElementsByTagName('tbody')[2].rows[0].cells[0].width = parseInt(bars.getElementsByTagName('tbody')[2].textContent) == 0 ? '1%' : bars.getElementsByTagName('tbody')[2].textContent;
	bars.getElementsByTagName('tbody')[3].rows[0].cells[0].width = parseInt(bars.getElementsByTagName('tbody')[3].textContent) == 0 ? '1%' : bars.getElementsByTagName('tbody')[3].textContent;
	bars.getElementsByTagName('tbody')[4].rows[0].cells[0].width = parseInt(bars.getElementsByTagName('tbody')[4].textContent) == 0 ? '1%' : bars.getElementsByTagName('tbody')[4].textContent;
	
}

if (window.location.pathname == '/information.php' && Sleepy.personalStats) {
	var experience = document.getElementsByTagName('tbody')[11];
	td[0].innerHTML = 'Online time'.bold(), td[1].textContent = duration(Sleepy.onlineTime);
	td[2].innerHTML = 'Requests'.bold(), td[3].textContent = format(Sleepy.requests);
	td[4].innerHTML = 'Mouse clicks'.bold(), td[5].textContent = format(Sleepy.mouseClicks);
	td[6].innerHTML = 'Key strokes'.bold(), td[7].textContent = format(Sleepy.keyStrokes);
	
	tr[0].appendChild(td[0]), tr[0].appendChild(td[1]);
	tr[1].appendChild(td[2]), tr[1].appendChild(td[3]);
	tr[2].appendChild(td[4]), tr[2].appendChild(td[5]);
	tr[3].appendChild(td[6]), tr[3].appendChild(td[7]);
	
	experience.appendChild(tr[0]), experience.appendChild(tr[1]), experience.appendChild(tr[2]), experience.appendChild(tr[3]);
}

if (window.location.pathname == '/servers.php') {
	var link = document.createElement('link');
	var head = document.getElementsByTagName('head')[0];
	link.rel = 'stylesheet', link.href = 'static/css/frontpage/allstyle.css', link.type = 'text/css';
	head.appendChild(link);
	document.getElementsByTagName('ul')[0].style.width = '100%';
	Array.forEach(document.links, function(element) {
		element.style.color = 'beige';
		if (GM_getValue(extension(element.textContent) + '.name')) {
			element.parentNode.style.listStyleImage = 'url(\'' + GM_getResourceURL('favorite') + '\')';
			element.parentNode.style.marginLeft = '3px';
			element.style.marginLeft = '-3px';
			
			var name = GM_getValue(extension(element.textContent) + '.name');
			var rank = GM_getValue(extension(element.textContent) + '.rank');
			var rp = GM_getValue(extension(element.textContent) + '.rp');
			element.textContent += ' (' + name + ' - ' + rank + ' ' + rp + '%)';
		}
	});	
}

if (window.location.pathname == '/family.php' && enabled) {
	var users = document.getElementsByTagName('tbody')[8].getElementsByTagName('a');
	var capoRegimes = document.getElementsByTagName('tbody')[9];
	var info = document.getElementsByTagName('tbody')[2];
	var objects = document.getElementsByTagName('tbody')[4].rows;
	
	if (users) {
		var online = [];
		var members = [];
		Array.forEach(users, function(element) {
			if (element.style.color == 'blue') {
				online.push(element.textContent);
				
			}
			members.push(element.textContent);
		});
		
		var onlinePercentage = parseInt((online.length / members.length) * 100);
		var tr = document.createElement('tr');
		var td = [
			document.createElement('td'),
			document.createElement('td')
		];
		tr.appendChild(td[0]), tr.appendChild(td[1]);
		td[0].className = 'left', td[0].textContent = 'Online percentage:';
		td[1].className = 'right', td[1].textContent = onlinePercentage + '%' + ' (' + online.length + ' / ' + members.length + ')';
		info.insertBefore(tr, info.rows[info.rows.length - 2]);
		
		var capoLinks = [];
		var capos = [];
		Array.forEach(capoRegimes.getElementsByClassName('cleft'), function(element) {
			capoLinks.push(element.innerHTML);
			capos.push(element.textContent);
			
		});
		
		var tr = document.createElement('tr');
		var td = [
			document.createElement('td'),
			document.createElement('td')
		];
		tr.appendChild(td[0]), tr.appendChild(td[1]);
		td[0].className = 'left', td[0].textContent = 'Capos:';
		td[1].className = 'right', td[1].innerHTML = capoLinks.join(', ');
		info.insertBefore(tr, info.rows[info.rows.length - 5]);
		
		var objectOwners = [];
		for (i = 4; i < objects.length; i++) {
			var a = document.createElement('a');
			a.textContent = objects[i].cells[2].textContent, a.href = 'user.php?nick=' + objects[i].cells[2].textContent;
			var title = objects[i].cells[0].textContent + ' ' + objects[i].cells[1].textContent;
			objectOwners.push(objects[i].cells[2].textContent, title);
			objects[i].cells[2].textContent = null;
			objects[i].cells[2].appendChild(a);
		}
		
		var hq = info.rows[info.rows.length - 2].cells[1];
		var hqPercentage = parseInt((members.length / hq.textContent) * 100);
		hq.textContent = hqPercentage + '%' + ' (' + members.length + ' / ' + hq.textContent + ')';		
		
		var don = info.getElementsByTagName('a')[0].textContent;
		if (info.getElementsByTagName('a')[1].parentNode.previousSibling.textContent == 'Consiglieri:') {
			var consig = info.getElementsByTagName('a')[1].textContent;
			if (info.getElementsByTagName('a')[2].parentNode.previousSibling.textContent == 'Sottocapo:') {
				var sotto = info.getElementsByTagName('a')[2].textContent;
			}
		} else if (info.getElementsByTagName('a')[1].parentNode.previousSibling.textContent == 'Sottocapo:') {
			
			var sotto = info.getElementsByTagName('a')[1].textContent;
			
		}
		
		Array.forEach(document.links, function(element) {
			if (members.indexOf(element.textContent)!= -1) {
				if (online.indexOf(element.textContent) != -1) {
					element.style.color = 'blue';
					
				}				
			}
		});
		
		function appendPositions(element) {
			switch (element.textContent) {
			case don:
				element.title = 'Don';
				element.innerHTML += '[don]'.sup();
				break;
			case consig:
				element.title = 'Consiglieri';
				element.innerHTML += '[consig]'.sup();
				break;
			case sotto:
				element.title = 'Sotto Capo';
				element.innerHTML += '[sotto]'.sup();
				break;
			default:
				if (capos.indexOf(element.textContent) != -1) {
					element.title = 'Capo';
					element.innerHTML += '[capo]'.sup();
				} else if (objectOwners.indexOf(element.textContent) != -1) {
					element.title = objectOwners[objectOwners.indexOf(element.textContent) + 1];
					element.innerHTML += '[object]'.sup();
				} else {
					element.title = 'Member';
				}
			}
			if (element.childNodes[1]) {
				element.childNodes[1].style.fontVariant = 'small-caps';
				element.childNodes[1].style.color = 'red';
			}
		}
		
		Array.forEach(users, function(element) {
			appendPositions(element);	
		});
		
		Array.forEach(capoRegimes.getElementsByTagName('a'), function(element) {
			appendPositions(element);
			
			
			if (element.parentNode.className == 'cleft') {
				element.removeChild(element.childNodes[1]);
			}
		});
	}	
}

if (window.location.pathname == '/user.php' && enabled) {	
	var user = document.getElementById('user');
	if (user) {
		var username = user.rows[2].getElementsByTagName('a')[0].textContent;
		var a = [document.createElement('a'), document.createElement('a')];
		
		if (user.rows[2].cells[1].childNodes[3]) {
			user.rows[2].cells[1].childNodes[3].textContent = ' | ';
		}
		
		var pipe = [
			document.createTextNode(' | '),
			document.createTextNode(' | ')
		];
		
		user.rows[2].cells[1].appendChild(pipe[0]);
		a[0].style.color = 'red', a[0].href = 'javascript:void(0)'
		Sleepy.friends.indexOf(username) != -1 ? a[0].textContent = 'Remove from Sleepy' : a[0].textContent = 'Add to Sleepy';
		user.rows[2].cells[1].appendChild(a[0]);
		
		a[0].addEventListener('click', function() {
			Sleepy.friends = getValue('friends', '').deserialize();
			if (Sleepy.friends.indexOf(username) != -1) {
				Sleepy.friends.splice(Sleepy.friends.indexOf(username), 1);
				a[0].textContent = 'Add to Sleepy';
			} else {
				Sleepy.friends.push(username);
				a[0].textContent = 'Remove from Sleepy';
			}
			setValue('friends', Sleepy.friends.join(', '));
		}, true);
		
		if (['nl', 'com', 'dm'].indexOf(extension()) != -1) {
			user.rows[2].cells[1].appendChild(pipe[1]);
			a[1].textContent = 'History';
			a[1].href = 'http://sleepy.trabot.net/history.php?name=' + username + '&ver=' + window.location.hostname;
			user.rows[2].cells[1].appendChild(a[1]);
		}
		
		
		if (document.images[0]) {
			if (document.images[0].getAttribute('src') == '/static/images/userbadges/rip.gif' && document.images[0].parentNode.nodeName != 'A') {
				user.rows[5].cells[1].textContent += ' (Admin killed)';
			}
		}
			
		if (document.images[0]) {
			var rip = document.images[0].getAttribute('src') == '/static/images/userbadges/rip.gif' ? true : false;
		} else {
			var rip = false;
		}
					
		if (!rip && user.rows[5].cells[1].textContent.indexOf(5) == -1 && ['nl', 'com', 'dm'].indexOf(extension()) != -1) {
			GM_xmlhttpRequest({
				method: 'GET',
    				url: 'http://sleepy.trabot.net/ontime.php?ver=' + window.location.hostname + '&name=' + username,
		    		headers: {
        				'User-Agent': navigator.userAgent,
        				'Accept': 'text/xml'
				},
    				onload: function(response) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(response.responseText, 'text/xml');
				
					if (!dom.getElementsByTagName('error')[0]) {
						var start = parseInt(dom.getElementsByTagName('time')[0].textContent);
						var end = Math.round(new Date().getTime() / 1000);
						//alert('current date => ' + new Date() + '\nlast seen => ' + new Date(parseInt(dom.getElementsByTagName('time')[0].textContent) * 1000));
						user.rows[5].cells[1].textContent = 'Offline for approximately ' + duration(end - start);
					} else {
						user.rows[5].cells[1].textContent += ' (No entries found)';			
					}
				}
			});
		}
		
		for (i = 0; i < user.rows.length; i++) {
			if (user.rows[i].cells[1] && user.rows[i].cells[1].textContent.match(/\d\d-\d\d-\d\d\d\d \d\d:\d\d:\d\d/)) {
				var startdate = user.rows[i].cells[1].textContent;
				var year = startdate.substring(6, 10), month = startdate.substring(3, 5) - 1, day = startdate.substring(0, 2), hour = startdate.substring(11, 13), minute = startdate.substring(14, 16), second = startdate.substring(17, 19);
				
				startdate = Date.parse(new Date(year, month, day, hour, minute, second)) / 1000;
				
				var offset = new Date().getTimezoneOffset() * 60;
				var now = Math.round(new Date().getTime() / 1000) + offset;
				
				if (now - startdate <= 48 * 3600) {
					user.rows[i].cells[1].textContent += ' (Protection: ' +  duration(48 * 3600 - (now - startdate)) + ' left)';
				}
				
				
				
				break;
			}
		}	
		
	}
	
}

if (window.location.pathname == '/travel.php' && enabled) {
	var script = document.getElementsByTagName('script')[1];
	if (script) {
		window.focus();

		var array = script.innerHTML.match(/Array\('.+'\)/g)[0];
		var data = array.match(/\d+/g);
		var span = document.getElementsByTagName('span');
		var click = [];
		var mouseover = [];
		for (i = 0; i < span.length; i++) {
			click.push(span[i].getAttribute('onclick'));
			mouseover.push(span[i].getAttribute('onmouseover'));
		}
		
		var body = '<table class="thinline" cellpadding="2" cellspacing="0" rules="none" width="600" id="travel">';
		body += '<tr><td colspan="5" class="tableheader">Travel</td></tr>';
		body += '<tr><td colspan="5" bgcolor="black" height="1"></td></tr>';
		body += '<tr bgcolor="white"><td>City</td><td>Users online</td><td>Users offline</td><td>Families</td><td>Coke price</td></tr>';
		body += '<tr><td colspan="5" bgcolor="black" height="1"></td></tr>';
		body += '<tr class="city" id="6"><td><u>B</u>altimore</td><td>' + format(data[33]) + '</td><td>' + format(data[34]) + '</td><td>' + data[31] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="1"><td><u>C</u>hicago</td><td>' + format(data[8]) + '</td><td>' + format(data[9]) + '</td><td>' + data[6] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="7"><td>C<u>o</u>rleone</td><td>' + format(data[38]) + '</td><td>' + format(data[39]) + '</td><td>' + data[36] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="0"><td><u>D</u>etroit</td><td>' + format(data[3]) + '</td><td>' + format(data[4]) + '</td><td>' + data[1] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="4"><td><u>L</u>as Vegas</td><td>' + format(data[23]) + '</td><td>' + format(data[24]) + '</td><td>' + data[21] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="3"><td><u>N</u>ew York</td><td>' + format(data[18]) + '</td><td>' + format(data[19]) + '</td><td>' + data[16] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="2"><td>P<u>a</u>lermo</td><td>' + format(data[13]) + '</td><td>' + format(data[14]) + '</td><td>' + data[11] + '</td><td>Pending...</td></tr>';
		body += '<tr class="city" id="5"><td><u>P</u>hiladelphia</td><td>' + format(data[28]) + '</td><td>' + format(data[29]) + '</td><td>' + data[26] + '</td><td>Pending...</td></tr>';
		body += '<tr><td bgcolor="black" height="1" colspan="5"></td></tr>';
		body += '<tr bgcolor="white"><td colspan="5" align="center">Next price change in approximately ' + nextPriceChange() + ' minutes.</td></tr>';
    		body += '</table><br />';
    		body += '<table class="thinline" cellpadding="2" cellspacing="0" rules="none" width="600" id="prices" style="display: none;">';
		body += '<tr><td colspan="4" class="tableheader"></td></tr>';
		body += '<tr><td colspan="4" bgcolor="black" height="1"></td></tr>';
		body += '<tr bgcolor="white"><td>Narcotics</td><td>Price</td><td>Booze</td><td>Price</td></tr>';
		body += '<tr><td colspan="4" bgcolor="black" height="1"></td></tr>';
		body += '<tr><td>Coke</td><td></td><td>Amaretto</td><td></td></tr>';
		body += '<tr><td>Glue</td><td></td><td>Beer</td><td></td></tr>';
		body += '<tr><td>Heroin</td><td></td><td>Cognac</td><td></td></tr>';
		body += '<tr><td>Marihuana</td><td></td><td>Port</td><td></td></tr>';
		body += '<tr><td>Morphine</td><td></td><td>Rum</td><td></td></tr>';
		body += '<tr><td>Opium</td><td></td><td>Whiskey</td><td></td></tr>';
		body += '<tr><td>Tobacco</td><td></td><td>Wine</td><td></td></tr>';
		body += '<tr><td bgcolor="black" height="1" colspan="4"></td></tr>';
		body += '<tr bgcolor="white"><td colspan="4" align="center"></td></tr>';
    		body += '</table>';
    		body += '<iframe src="prices.php" style="display: none;" id="iframe"></iframe>';
		document.body.innerHTML = body;
		
		document.addEventListener('keypress', function(event) {
			var char = String.fromCharCode(event.charCode);
			switch (char) {
   				case 'b':
   					click[6] ? location.href = 'javascript:void(' + click[6].remove('javascript:') + ');' : void(0);
   					break;
   				case 'c':
   					click[1] ? location.href = 'javascript:void(' + click[1].remove('javascript:') + ');' : void(0);
   					break;
 
   				case 'o':
   					click[7] ? location.href = 'javascript:void(' + click[7].remove('javascript:') + ');' : void(0);
   					break;					
   				case 'd':
   					click[0] ? location.href = 'javascript:void(' + click[0].remove('javascript:') + ');' : void(0);
   					break;					  					
   				case 'l':
   					click[4] ? location.href = 'javascript:void(' + click[4].remove('javascript:') + ');' : void(0);
   					break;
   				case 'n':
   					click[3] ? location.href = 'javascript:void(' + click[3].remove('javascript:') + ');' : void(0);
   					break;		
   				case 'a':
   					click[2] ? location.href = 'javascript:void(' + click[2].remove('javascript:') + ');' : void(0);
   					break; 					
   				case 'p':
   					click[5] ? location.href = 'javascript:void(' + click[5].remove('javascript:') + ');' : void(0);	
   					break;    						
   			}		
		}, true);
	
		var prices = document.getElementById('prices');
		var cities = document.getElementById('travel').getElementsByTagName('tr');
		Array.forEach(cities, function(element) {
			if (element.className == 'city') {
				element.addEventListener('mouseover', function() {
					this.bgColor = '#e6e6e6';
				}, true);
				element.addEventListener('mouseout', function() {
					if (element.getAttribute('name') == 'high') {
						this.bgColor = '#bf7777';
					} else if (element.getAttribute('name') == 'low') {
						this.bgColor = '#85cf81';
					} else {
						this.bgColor = '#a8a8a8';
					}
				}, true);

				if (click[element.id]) {
					element.setAttribute('onclick', click[element.id]);
					element.style.cursor = 'pointer';
				} else {
					element.style.fontWeight = 'bold';
				}		
			}
		});
		
		var iframe = document.getElementById('iframe');
		iframe.addEventListener('load', function() {
			this.height = this.contentWindow.scrollHeight;
			this.width = this.contentWindow.scrollWidth;
			
			var narcs = this.contentDocument.getElementsByTagName('tbody')[0].rows;
			var booze = this.contentDocument.getElementsByTagName('tbody')[1].rows;
			var highCoke = this.contentDocument.getElementById('highCoke').textContent;
			var lowCoke = this.contentDocument.getElementById('lowCoke').textContent;
			var morphine = [], marihuana = [], glue = [], heroin = [], opium = [], coke = [], tobacco = [];
			var wine = [], beer = [], rum = [], cognac = [], whiskey = [], amaretto = [], port = [];
			
			for (i = 4; i < 12; i++) {
				var city = booze[i].cells[0].textContent;
				morphine[city] = narcs[i].cells[1].textContent;
				marihuana[city] = narcs[i].cells[2].textContent;
				glue[city] = narcs[i].cells[3].textContent;
				heroin[city] = narcs[i].cells[4].textContent;
				opium[city] = narcs[i].cells[5].textContent;
				coke[city] = narcs[i].cells[6].textContent;
				tobacco[city] = narcs[i].cells[7].textContent;
				
				wine[city] = booze[i].cells[1].textContent;
				beer[city] =  booze[i].cells[2].textContent;
				rum[city] =  booze[i].cells[3].textContent;
				cognac[city] =  booze[i].cells[4].textContent;
				whiskey[city] =  booze[i].cells[5].textContent;
				amaretto[city] =  booze[i].cells[6].textContent;
				port[city] =  booze[i].cells[7].textContent;
			}
			
			Array.forEach(cities, function(element) {
				if (element.className == 'city') {
					element.cells[4].textContent = coke[element.cells[0].textContent];
					var curPrice = element.cells[4].textContent;
					
					if (highCoke == curPrice) {
						element.bgColor = '#bf7777';
						element.setAttribute('name', 'high');
					}
					
					if (lowCoke == curPrice) {
						element.bgColor = '#85cf81';
						element.setAttribute('name', 'low');
					}
					element.addEventListener('mouseover', function() {
						var city = this.firstChild.textContent;
						prices.style.display = 'table';
						prices.rows[0].cells[0].textContent = 'Prices in ' + city;
						
						prices.rows[4].cells[1].textContent = coke[city];
						prices.rows[5].cells[1].textContent = glue[city];
						prices.rows[6].cells[1].textContent = heroin[city];
						prices.rows[7].cells[1].textContent = marihuana[city];
						prices.rows[8].cells[1].textContent = morphine[city];
						prices.rows[9].cells[1].textContent = opium[city];
						prices.rows[10].cells[1].textContent = tobacco[city];
					
						prices.rows[4].cells[3].textContent = amaretto[city];
						prices.rows[5].cells[3].textContent = beer[city];
						prices.rows[6].cells[3].textContent = cognac[city];
						prices.rows[7].cells[3].textContent = port[city];
						prices.rows[8].cells[3].textContent = rum[city];
						prices.rows[9].cells[3].textContent = whiskey[city];
						prices.rows[10].cells[3].textContent = wine[city];
					
						prices.rows[12].cells[0].innerHTML = mouseover[this.id].split('"')[3];
					}, true);
					element.addEventListener('mouseout', function() {
						document.getElementById('prices').style.display = 'none';
					}, true);
				}
			});
		}, true);
	}

}

if (window.location.pathname == '/prices.php') {
	var narcs = document.getElementsByTagName('tbody')[0];
	narcs.rows[2].bgColor = 'white';
	var tr = narcs.rows[1].cloneNode(true);
	narcs.insertBefore(tr, narcs.rows[3]);
	var cokePrices = [];
	for (i = 4; i < 12; i++) {
		cokePrices.push(int(narcs.rows[i].cells[6].textContent));
	}
	cokePrices.sort(desc);
	
	for (i = 4; i < 12; i++) {
		if (int(narcs.rows[i].cells[6].textContent) == cokePrices[0]) {
			narcs.rows[i].bgColor = '#bf7777';
			narcs.rows[i].cells[6].id = 'highCoke';
		}
		if (int(narcs.rows[i].cells[6].textContent) == cokePrices[7]) {
			narcs.rows[i].bgColor = '#85cf81';
			narcs.rows[i].cells[6].id = 'lowCoke';
		}
	}
	
	var booze = document.getElementsByTagName('tbody')[1];
	booze.rows[2].bgColor = 'white';
	var tr = booze.rows[1].cloneNode(true);
	booze.insertBefore(tr, booze.rows[3]);
}

if (extension()) {
	if (Sleepy.rank && Sleepy.rp) {
		document.title = 'Omerta.' + extension() + ' (' + Sleepy.rank + ' ' + Sleepy.rp + '%)';	
	}

	document.addEventListener('click', function() {
		setValue('mouseClicks', getValue('mouseClicks', 0) + 1);
	}, true);

	document.addEventListener('keyup', function() {
		setValue('keyStrokes', getValue('keyStrokes', 0) + 1);
	}, true);

	setValue('requests', getValue('requests', 0) + 1);

	document.addEventListener('copy', function() {
		setValue('clipboard', window.getSelection().toString());
	}, true);

	document.addEventListener('cut', function() {
		setValue('clipboard', window.getSelection().toString());
	}, true);
	
	if (Sleepy.favicon) {
		var link = document.createElement('link');
		link.rel = 'icon';
		link.type = 'images/png';
		link.href = GM_getResourceURL('favicon');
		if (document.getElementsByTagName('head')[0]) {
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	}
}

if (window.location.pathname == '/game.php') {
	var start = Math.round(new Date().getTime() / 1000);
	window.addEventListener('unload', function() {
		var end = Math.round(new Date().getTime() / 1000);
		Sleepy.onlineTime += (end - start);
		setValue('onlineTime', Sleepy.onlineTime);
	}, true);
}

if (window.location.pathname == '/game-login.php' || window.location.pathname == '/index.php' || window.location.pathname == '/') {
	document.forms[0].elements[0].focus();
}

if (window.location.search == '?r=statistics' && enabled) {
	var deaths = document.getElementsByTagName('tbody')[2];
	var deadFams = document.getElementsByTagName('tbody')[3];
	var mostHonoured = document.getElementsByTagName('tbody')[4];
	var cdtc = document.getElementsByTagName('tbody')[5];
	var families = document.getElementsByTagName('tbody')[6];
	var bfs = document.getElementsByTagName('tbody')[7];
	var bookies = document.getElementsByTagName('tbody')[8];
	var roulies = document.getElementsByTagName('tbody')[9];
	var ngs = document.getElementsByTagName('tbody')[10];
	var slots = document.getElementsByTagName('tbody')[11];
	var bjs = document.getElementsByTagName('tbody')[12];
	var pbs = document.getElementsByTagName('tbody')[13];		
	
	Array.forEach(deaths.rows, function(element) {
		if (element.cells.length == 4) {
			var fam = element.cells[3].textContent
			var user = element.cells[0].textContent.remove(' (A) ');
			if (Sleepy.fams.indexOf(fam) != -1 && Sleepy.highlightFamsAtStats) {
				element.bgColor = Sleepy.famsColor;
			}
			if (Sleepy.friends.indexOf(user) != -1 && Sleepy.highlightFriendsAtStats) {
				element.bgColor = Sleepy.friendsColor;
			}
		}
	});
	Array.forEach(deadFams.rows, function(element) {
		if (element.cells.length == 3 && Sleepy.fams.indexOf(element.cells[1].textContent) != -1 && Sleepy.highlightFamsAtStats) {
			element.bgColor = Sleepy.famsColor;
		}
	});	
	Array.forEach(mostHonoured.rows, function(element) {
		if (element.cells.length == 4) {
			if (Sleepy.friends.indexOf(element.cells[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
				element.cells[0].bgColor = Sleepy.friendsColor;
				element.cells[1].bgColor = Sleepy.friendsColor;
			}
			if (Sleepy.friends.indexOf(element.cells[2].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
				element.cells[2].bgColor = Sleepy.friendsColor;
				element.cells[3].bgColor = Sleepy.friendsColor;
			}
		}
	});
	Array.forEach(cdtc.rows, function(element) {
		if (element.cells.length == 4) {
			if (Sleepy.fams.indexOf(element.cells[0].textContent) != -1 && Sleepy.highlightFamsAtStats) {
				element.bgColor = Sleepy.famsColor;
			}
		}
	});
	Array.forEach(families.rows, function(element) {
		if (element.cells.length == 9 && Sleepy.fams.indexOf(element.cells[1].textContent) != -1 && Sleepy.highlightFamsAtStats) {			
			element.bgColor = Sleepy.famsColor;
		}
	});
	Array.forEach(bfs.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(bookies.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(roulies.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(ngs.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(slots.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(bjs.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});
	Array.forEach(pbs.rows, function(element) {
		if (element.getElementsByTagName('a')[0] && Sleepy.friends.indexOf(element.getElementsByTagName('a')[0].textContent) != -1 && Sleepy.highlightFriendsAtStats) {
			element.bgColor = Sleepy.friendsColor;
		}
	});

	for (i = 3; i < deaths.rows.length - 1; i++) {
		var date = [deaths.rows[i].cells[1].textContent, deaths.rows[i + 1].cells[1].textContent];
		var user = [deaths.rows[i].cells[0], deaths.rows[i + 1].cells[0]];
		var rank = [deaths.rows[i].cells[2].textContent, deaths.rows[i + 1].cells[2].textContent];
		var time = [];
		var year = date[0].substring(6, 10), month = date[0].substring(3, 5) - 1, day = date[0].substring(0, 2), hour = date[0].substring(11, 13), minute = date[0].substring(14, 16), second = date[0].substring(17, 19);
		time.push(Date.parse(new Date(year, month, day, hour, minute, second)) / 1000);
		
		var year = date[1].substring(6, 10), month = date[1].substring(3, 5) - 1, day = date[1].substring(0, 2), hour = date[1].substring(11, 13), minute = date[1].substring(14, 16), second = date[1].substring(17, 19);
		time.push(Date.parse(new Date(year, month, day, hour, minute, second)) / 1000);
		
		if (time[0] - time[1] <= 1) {
			if (user[0].textContent.indexOf('(A)') == -1 && user[0].textContent.indexOf('(BF)') == -1) {
				var prefix = '(' + 'BF'.bold() + ') ';
				user[0].innerHTML = prefix + user[0].innerHTML;
				user[1].innerHTML = prefix + user[1].innerHTML;
			}	
		}
	}
	
	for (i = 3; i < deaths.rows.length; i++) {
		var fam = deaths.rows[i].cells[3];
		if ((!fam.getElementsByTagName('a')[0]) && fam.textContent) {
			fam.textContent += ' ';
			var img = document.createElement('img');
			img.src = 'static/images/game/generic/cross.gif';
			img.title = 'Dead family';
			fam.appendChild(img);
		}
	}
	
	if (['nl', 'com', 'dm'].indexOf(extension()) != -1) {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var a = document.createElement('a');
		tr.appendChild(td);
		td.appendChild(a);
		deaths.appendChild(tr);
		td.colSpan = 4;
		td.align = 'center';
		tr.style.borderTop = '4px solid black';
		td.bgColor = 'white';
		a.textContent = 'Extended deaths list';
		a.href = 'http://sleepy.trabot.net/deaths.php?ver=' + window.location.hostname + '&start=0';
	}
	
	Array.forEach(document.getElementsByTagName('tbody'), function(element, index) {
		var header = element.rows[0];
		header.style.cursor = 'pointer';
		if (Sleepy.collapsedTables.indexOf(index.toString()) != -1) {
			for (i = 1; i < element.rows.length; i++) {
				element.rows[i].style.display = 'none';
			}
		}

		element.rows[0].addEventListener('click', function() {
			if (Sleepy.collapsedTables.indexOf(index.toString()) == -1) {
				for (i = 1; i < element.rows.length; i++) {
					element.rows[i].style.display = 'none';
				}
				Sleepy.collapsedTables.push(index.toString());
			} else {
				for (i = 1; i < element.rows.length; i++) {
					element.rows[i].style.display = 'table-row';
				}
				
				Sleepy.collapsedTables.splice(Sleepy.collapsedTables.indexOf(index.toString()), 1);
			}
			setValue('collapsedTables', Sleepy.collapsedTables.join(', '));
		}, true);
		
	});
}

if (window.location.pathname == '/messages.php' && enabled) {
	if (!window.location.search || window.location.search.indexOf('delete') != -1) {
		var inbox = document.getElementById('tblMsgs');
		var checkboxes = document.getElementsByName('check_msg[]');
		var maxMessages = document.getElementsByTagName('tbody')[1].rows[0].cells[0].textContent.match(/\d+/)[0];
		var messages = document.getElementsByTagName('b')[document.getElementsByTagName('b').length - 1].textContent;
		var span = document.createElement('span');
		var panel = document.getElementsByTagName('tbody')[1].rows[1].cells[0];
		var bustMessage = document.getElementsByTagName('script')[0].innerHTML.match(/<B>([^']+)/g)[0].toLowerCase();
		var bailMessage = document.getElementsByTagName('script')[0].innerHTML.match(/<B>([^']+)/g)[1].toLowerCase();
		
		span.textContent += ' (' + messages + '/' + maxMessages + ')';
		document.getElementsByTagName('center')[0].appendChild(span);
		
		
		Array.forEach(inbox.getElementsByTagName('td'), function(element) {
			if (element.colSpan == 4) {
				element.colSpan = 6;
			}
		});

		Array.forEach(checkboxes, function(element) {
			var tr = element.parentNode.parentNode;
			var id = element.value;
			element.title = 'Select';
			
			if (Sleepy.lockedMessages.indexOf(id) != -1) {
				var img = document.createElement('img');
				img.src = GM_getResourceURL('lock'), img.title = 'Unlock', img.style.cursor = 'pointer', img.style.margin = '4px', img.name = 'check_msg[]';
				element.parentNode.replaceChild(img, element);
				img.addEventListener('click', function() {
					Sleepy.lockedMessages.splice(Sleepy.lockedMessages.indexOf(id), 1);
					setValue('lockedMessages', Sleepy.lockedMessages.join(', '));
					this.parentNode.replaceChild(element, this);
				}, true);
			}
			
			var a = document.createElement('a'), img = document.createElement('img'), td = document.createElement('td');
			a.href = '?action=delete&delid=' + id, a.appendChild(img);
			img.src = 'static/images/game/messages/del.gif', img.width = 20, img.height = 20, img.border = 0, img.title = 'Delete';
			td.appendChild(a);
			tr.appendChild(td);
			
			var td = document.createElement('td'), img = document.createElement('img');
			img.border = 0, img.width = 20, img.height = 20, img.title = 'Reply', img.src = 'static/images/game/messages/reply.gif', img.style.cursor = 'pointer';
			td.appendChild(img);
			tr.appendChild(td);
			img.addEventListener('click', function() {
				var sender = tr.cells[1].textContent;
				var subject = tr.cells[0].textContent;
				subject = (subject.substring(0, 4) == 'Re: ' ? subject : 'Re: ' + subject);
				if (document.getElementsByName('nick')[0].value) {
					document.getElementsByName('nick')[0].value += ';' + sender;
				} else {
					document.getElementsByName('nick')[0].value = sender;
				}
				document.getElementsByName('subject')[0].value = subject;
				document.getElementsByName('msg')[0].focus();
			}, true);
			
			tr.style.cursor = 'alias';
			tr.title = 'Double-click to view this message';
			tr.addEventListener('dblclick', function() {
				window.getSelection().removeAllRanges();
				
				iframe.src = 'messages.php?action=showmsg&msg=' + id;
				this.bgColor = '#d6d6d6';
				
			}, true);
		});
		
		var td = document.createElement('td'), img = document.createElement('img');
		img.src = 'static/images/game/messages/del.gif', img.width = 20, img.height = 20, img.border = 0, img.title = 'Delete all messages', img.style.cursor = 'pointer';
		td.appendChild(img);
		img.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				element.checked = true;
			});
			document.forms[1].submit();
		}, true);
		inbox.rows[2].appendChild(td);
		
		var input = document.createElement('input');
		input.type = 'checkbox', input.id = 'selectAll', input.title = 'Select all messages';
		inbox.rows[2].cells[3].appendChild(input);
		input.addEventListener('click', function() {
			if (this.checked) {
				Array.forEach(checkboxes, function(element) {
					element.checked = true;
				});
			} else {
				Array.forEach(checkboxes, function(element) {
					element.checked = false;
				});
			}
		}, true);
		
		var td = document.createElement('td'), img = document.createElement('img');
		img.border = 0, img.width = 20, img.height = 20, img.src = 'static/images/game/messages/reply.gif', img.title = 'Reply to all messages', img.style.cursor = 'pointer';
		td.appendChild(img);
		inbox.rows[2].appendChild(td);
		img.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				var tr = element.parentNode.parentNode;
				var sender = tr.cells[1].textContent;
				if (document.getElementsByName('nick')[0].value) {
					document.getElementsByName('nick')[0].value += ';' + sender;
				} else {
					document.getElementsByName('nick')[0].value = sender;
				}
				document.getElementsByName('subject')[0].focus();
			});
		}, true);
		
		var input = document.createElement('input');
		var br = document.createElement('br');
		input.type = 'button', input.value = 'Lock Selected', input.style.margin = '2px';
		panel.appendChild(br);
		panel.appendChild(input);
		input.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				if (element.checked) {
					Sleepy.lockedMessages.push(element.value);
				}
			});
			setValue('lockedMessages', Sleepy.lockedMessages.join(', '));
			window.location.reload();
		}, true);
		
		var input = document.createElement('input');
		input.type = 'button', input.value = 'Select Notifications', input.style.margin = '2px';
		panel.appendChild(input);
		input.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				if (element.parentNode.parentNode.cells[1].firstChild.nodeName == 'I') {
					element.checked = true;
				}
			});	
		}, true);
		
		var input = document.createElement('input');
		input.type = 'button', input.value = 'Select Read', input.style.margin = '2px';
		panel.appendChild(input);
		input.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				var tr = element.parentNode.parentNode;
				if (tr.bgColor == '#d6d6d6') {
					element.checked = true;
				}
			});	
		}, true);
		
		var input = document.createElement('input');
		input.type = 'button', input.value = 'Select Inverse', input.style.margin = '2px';
		panel.appendChild(input);
		input.addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				element.checked ? element.checked = false : element.checked = true;
			});	
		}, true);
		
		panel.getElementsByTagName('input')[2].addEventListener('click', function() {
			Array.forEach(checkboxes, function(element) {
				var subject = element.parentNode.parentNode.cells[0].firstChild.innerHTML.toLowerCase();
				if (subject == bustMessage || subject == bailMessage) {
					element.checked = true;
				}
			});
		}, true);
		
		

		var iframe = document.createElement('iframe');
		var br = document.getElementsByTagName('br');
		br = br[br.length - 1];
		iframe.style.display = 'inline', iframe.frameBorder = 0, iframe.height = 2;
		document.getElementsByTagName('center')[0].insertBefore(iframe, br);
		iframe.addEventListener('load', function() {
			if (this.src) {
				iframe.height = 2;
				this.height = this.contentWindow.document.body.scrollHeight;
				this.width = this.contentWindow.document.body.scrollWidth;
				var links = this.contentWindow.document.links;
				links[links.length - 1].parentNode.removeChild(links[links.length - 1]);
				Array.forEach(links, function(element) {
					element.target = '_parent';
				});
			}
		}, true);
    	}	
}

if (window.location.search == '?module=Crimes' && enabled) {
	if (document.body.innerHTML.indexOf('chance1') != -1) {
		Array.forEach(document.getElementsByTagName('input'), function(element, index) {
			if (element.value.indexOf('chance') != -1) {
				element.addEventListener('click', function() {
					setValue('crimeOption', this.value);
					alert('This option will be selected by default from now on.');
				}, true);
			}
		});
		
		var crimeOption = getValue('crimeOption', 'chancebottle');
		Array.forEach(document.getElementsByTagName('input'), function(element) {
			if (element.value == crimeOption) {
				element.checked = true;
			}
		});
		imageCodeProtection(0, 8)
	} else {
		var minutes = parseInt(document.body.textContent.match(/\d+/g)[0]);
		var seconds = parseInt(document.body.textContent.match(/\d+/g)[1]);
		var milliseconds = (seconds + (minutes * 60)) * 1000;
		
		window.setTimeout(function() {
			window.location.reload();
		}, milliseconds);
	}
}

if (window.location.search == '?module=Cars&action=docar' && document.images[0]) {
	document.forms[0].elements[2].focus();
}

if (window.location.search == '?module=Cars' && enabled) {
	if (document.body.innerHTML.indexOf('chance1') != -1) {
		var percentages = [];
		Array.forEach(document.getElementsByTagName('input'), function(element) {
			if (element.type == 'radio') {
				percentages.push(parseInt(element.parentNode.parentNode.cells[2].textContent));
			}
		});
		
		percentages.sort(desc);
		var input = document.getElementsByTagName('input');
		
		for (i = 0; i < input.length; i++) {
			if (input[i].type == 'radio' && parseInt(input[i].parentNode.parentNode.cells[2].textContent) == percentages[0]) {
				input[i].checked = true;
				break;
			}
		}
		
		imageCodeProtection(0, 6);
	} else {
		var minutes = parseInt(document.body.textContent.match(/\d+/g)[0]);
		var seconds = parseInt(document.body.textContent.match(/\d+/g)[1]);
		var milliseconds = (seconds + (minutes * 60)) * 1000;
		
		window.setTimeout(function() {
			window.location.reload();
		}, milliseconds);
	}
}

if (window.location.pathname == '/bank.php' && enabled) {
	var amounts = document.getElementsByTagName('tbody')[2];
	var manage = document.getElementsByTagName('tbody')[4];
	var radio = document.getElementsByName('type');
	if (amounts) {
		amounts = amounts.textContent.remove(/,/g);
		amounts = amounts.match(/\d+/g);
		
		var a = [
			document.createElement('a'),
			document.createElement('a')
		];
		
		a[0].textContent = ' (Deposit all)', a[0].style.cursor = 'pointer';
		a[1].textContent = ' (Redraw all)', a[1].style.cursor = 'pointer';
		
		
		manage.rows[1].cells[1].appendChild(a[0]);
		manage.rows[2].cells[1].appendChild(a[1]);
		
		a[0].addEventListener('click', function() {
			this.parentNode.firstChild.checked = true;
			document.getElementsByName('amounttpob')[0].value = amounts[amounts.length - 1];
			document.forms[1].submit();
		}, true);
	
		a[1].addEventListener('click', function() {
			this.parentNode.firstChild.checked = true;
			if (amounts.length > 1) {
				document.getElementsByName('amounttpob')[0].value = amounts[0];
			} else {
				document.getElementsByName('amounttpob')[0].value = 0;
			}
			document.forms[1].submit();
		}, true);
		
		radio[0].checked = true;
		document.getElementsByName('amounttpob')[0].focus();
		Array.forEach(radio, function(element) {
			element.addEventListener('click', function() {
				document.getElementsByName('amounttpob')[0].focus();
			}, true);
		});	
	}
	
	var hr = document.createElement('hr');
	var text = document.createTextNode('The receiver will receive $0');
	document.getElementsByTagName('tbody')[3].rows[7].cells[0].appendChild(hr);
	document.getElementsByTagName('tbody')[3].rows[7].cells[0].appendChild(text);
	
	
	document.getElementsByName('amount')[0].addEventListener('keyup', function() {
		text.textContent = 'The receiver will receive $' + format(Math.round(this.value * 0.9));
	}, true);	
}

if (window.location.pathname == '/cpbank.php') {
	document.getElementsByName('name')[0].focus();
	document.getElementsByName('nick')[0].focus();
}

if (window.location.pathname == '/jail.php' && enabled) {
	var users = document.getElementsByName('bust');
	document.getElementsByName('ver')[0].focus();
	var bustOut = document.forms[0].elements[2].value + ' ';
	imageCodeProtection(0, 1);
	
	document.getElementsByTagName('center')[0].innerHTML += '<div style="font-size: 10px;">Jump to previous/next person: Arrow Up/Arrow Down<br />Jump to previous/next friend or family: Ctrl+Arrow Up/Ctrl+Arrow Down</div>';
	
	if (users.length > 0) {
		var max = Math.round(users.length / 4);
		var friends = [], fams = [];
		
		Array.forEach(users, function(element, index) {
			var tr = element.parentNode.parentNode;
			var user = tr.cells[0].textContent;
			var fam = tr.cells[1].textContent;
			if (Sleepy.fams.indexOf(fam) != -1 && Sleepy.highlightFamsInJail) {
				fams.push(index);
				tr.bgColor = Sleepy.famsColor;		
			}
			if (Sleepy.friends.indexOf(user) != -1 && Sleepy.highlightFriendsInJail) {
				tr.bgColor = Sleepy.friendsColor;
				friends.push(index);
			}
			element.addEventListener('click', function() {
				userIndex = index;
			}, true);
		});
		
		if (friends[0] != undefined) {
			var userIndex = friends[0];
			users[userIndex].checked = true;
		
		} else if (fams[0] != undefined) {
			var userIndex = fams[0];
			users[userIndex].checked = true;
		} else {
			var randInt = randInt(0, max);
			var userIndex = randInt;
			users[userIndex].checked = true;
		}
		
		document.addEventListener('keydown', function(event) {
			if (event.keyCode == 40) {
				if (event.ctrlKey) {
					for (i = userIndex; i < users.length; i++) {
						if (friends.indexOf(i) != -1 && i != userIndex || fams.indexOf(i) != -1 && i != userIndex) {
							userIndex = i;
							break;
						} else if (i == users.length - 1) {
							for (j = 0; j < users.length; j++) {
								if (friends.indexOf(j) != -1 || fams.indexOf(j) != -1) {
									userIndex = j;
									break;
								}	
							}
						}
					}
				} else {
					if (userIndex == users.length - 1) {
						userIndex = 0;
					} else {
						userIndex++;
					}
				}
			} else if (event.keyCode == 38) {
				if (event.ctrlKey) {
					for (i = userIndex; i >= 0; i--) {
						if (friends.indexOf(i) != -1 && i != userIndex || fams.indexOf(i) != -1 && i != userIndex) {
							userIndex = i;
							break;
						} else if (i == 0) {
							for (j = users.length - 1; j >= 0; j--) {
								if (friends.indexOf(j) != -1 || fams.indexOf(j) != -1) {
									userIndex = j;
									break;
								}
							}
						}
					}					
				} else {
					if (userIndex == 0) {
						userIndex = users.length - 1;
					} else {
						userIndex--;
					}
				}
			}
			users[userIndex].checked = true;
			document.getElementsByName('ver')[0].focus();
		}, true);
	}
}

if (window.location.pathname == '/menu.php') {
	var table = document.getElementsByTagName('tbody')[5].getElementsByTagName('tbody')[0];
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var a = document.createElement('a');
	
	a.textContent = 'Prices', a.setAttribute('onmousedown', 'return false;'), a.href = './prices.php', a.className = 'menuLink', a.target = 'main';
	
	tr.appendChild(td), td.appendChild(a);
	
	table.insertBefore(tr, table.rows[4]);
}



if (window.location.pathname == '/menu.php' && window.parent != window.self && enabled) {
	var headers = document.getElementsByTagName('th');
	GM_addStyle('a[accesskey]:after { content: " [" attr(accesskey) "]"; }');
	Array.forEach(document.links, function(element) {
		if (element.getAttribute('href') == './allusers.php') {
			element.href = 'allusers.php?start=0&order=lastrank&sort=DESC';
		}
		
		if (element.getAttribute('onclick')) {
			element.href = './main.php?logout=true';
		}
		
		if (Sleepy.hiddenLinks.indexOf(element.getAttribute('href')) != -1) {
			element.style.display = 'none';
		}
		
		if (Sleepy.accessKeys.indexOf(element.getAttribute('href')) != -1) {
			var index = Sleepy.accessKeys.indexOf(element.getAttribute('href'));
			var key = Sleepy.accessKeys[index + 1];
			element.accessKey = key;
			element.title = 'Alt+Shift+' + key;
		}
	});
	
	Array.forEach(headers, function(element, index) {
		if (Sleepy.collapsedItems.indexOf(index.toString()) != -1) {
			element.parentNode.parentNode.getElementsByTagName('div')[0].style.display = 'none';
		}
		
		element.addEventListener('click', function() {
			if (Sleepy.collapsedItems.indexOf(index.toString()) != -1) {
				Sleepy.collapsedItems.splice(Sleepy.collapsedItems.indexOf(index.toString()), 1);
			} else {
				Sleepy.collapsedItems.push(index.toString());
			}
			setValue('collapsedItems', Sleepy.collapsedItems.join(', '));
		}, true);
		
		if (Sleepy.hiddenItems.indexOf(index.toString()) != -1) {
			element.parentNode.parentNode.style.display = 'none';
		}
	});
	
	document.forms[0].addEventListener('submit', function(event) {
		if (this.elements[0].value == '') {
			event.preventDefault();
			window.parent.frames[2].location = 'http://' + window.location.hostname + '/user.php';
		}
	}, true);
}

if (window.location.pathname == '/menu.php' && window.parent == window.self) {
	document.title = 'Customize Menu';
	
	Array.forEach(document.getElementsByTagName('th'), function(element, index) {
		element.removeAttribute('onclick');
		
		if (Sleepy.hiddenItems.indexOf(index.toString()) != -1) {
			element.style.textDecoration = 'line-through';
			element.style.opacity = 0.5;
			element.parentNode.parentNode.rows[1].style.display = 'none';
		}

		element.addEventListener('click', function() {
			if (element.style.textDecoration == 'line-through') {
				element.style.textDecoration = 'none';
				element.style.opacity = 1;
				element.parentNode.parentNode.rows[1].style.display = 'table-row';
				Sleepy.hiddenItems.splice(Sleepy.hiddenItems.indexOf(index.toString()), 1);
			} else {
				element.style.textDecoration = 'line-through';
				element.style.opacity = 0.5;
				element.parentNode.parentNode.rows[1].style.display = 'none';
				Sleepy.hiddenItems.push(index.toString());
			}
		}, true);	
	});
	
	
	Array.forEach(document.links, function(element) {
		
		if (element.getAttribute('href') == './allusers.php') {
			element.href = 'allusers.php?start=0&order=lastrank&sort=DESC';
		}
		
		if (element.getAttribute('onclick')) {
			element.href = './main.php?logout=true';
			element.removeAttribute('onclick');
		}
		
		if (Sleepy.accessKeys.indexOf(element.getAttribute('href')) != -1) {
			var index = Sleepy.accessKeys.indexOf(element.getAttribute('href'));
			var key = Sleepy.accessKeys[index + 1];
			element.accessKey = key;
		}
		
		if (Sleepy.hiddenLinks.indexOf(element.getAttribute('href')) != -1) {
			element.style.textDecoration = 'line-through';
			element.style.opacity = 0.5;
		}
		

			
		element.addEventListener('click', function(event) {
			
			if (event.ctrlKey) {

				
				var key = prompt('Here you can assign an access key to ' + this.textContent + '.\nIf you want to remove this access key, empty the prompt field.\nYou can access a link with an access key by pressing Alt+Shift+[Key].', this.accessKey);
				
				
				if (key != null) {
					key = key.toUpperCase();
					
					if (key.length > 1) {
						alert('You can\'t use more than one character as access key!');	
					} else if (key && Sleepy.accessKeys.indexOf(this.getAttribute('href')) == -1) {
						Sleepy.accessKeys.push(this.getAttribute('href'), key);
						this.accessKey = key;
					
					} else if (key && Sleepy.accessKeys.indexOf(this.getAttribute('href')) != -1) {
						var index = Sleepy.accessKeys.indexOf(this.getAttribute('href'));
						Sleepy.accessKeys[index + 1] = key;
						this.accessKey = key;
				
					} else if (key == '' && Sleepy.accessKeys.indexOf(this.getAttribute('href')) != -1) {
						var index = Sleepy.accessKeys.indexOf(this.getAttribute('href'));
						Sleepy.accessKeys.splice(index, 2);
						this.removeAttribute('accesskey');
					}		
				}
				
			} else {
				
				if (element.style.textDecoration == 'line-through') {
					element.style.textDecoration = 'none';
					element.style.opacity = 1;
					Sleepy.hiddenLinks.splice(Sleepy.hiddenLinks.indexOf(element.getAttribute('href')), 1);
				} else {
					element.style.textDecoration = 'line-through';
					element.style.opacity = 0.5;
					Sleepy.hiddenLinks.push(element.getAttribute('href'));
				}
			}

			event.preventDefault();
			
		}, true);
		
		GM_addStyle('a[accesskey]:after { content: " [" attr(accesskey) "]"; }');
	});
	
	var div = document.createElement('div');
	div.style.color = 'white';
	div.style.padding = '5px';
	div.style.width = 'auto';
	div.style.margin = 'auto';
	div.style.fontSize = '10px';
		
	div.innerHTML = 'Hide or show a link/item: Left-click<br />Add, remove or change an access key: Ctrl+Left-click';	
	
	document.body.insertBefore(div, document.body.firstChild);
	
	var footer = document.getElementsByClassName('container')[0];
	footer.parentNode.removeChild(footer);
	footer = document.createElement('div');
	
	var input = [
		document.createElement('input'),
		document.createElement('input')
	];
	input[0].type = 'button', input[0].value = 'Apply', input[0].style.margin = '10px 5px 10px 10px';
	input[1].type = 'button', input[1].value = 'Cancel', input[1].style.margin = '10px 10px 10px 5px';
	
	document.body.appendChild(footer);
	footer.appendChild(input[0]);
	footer.appendChild(input[1]);
	
	footer.style.textAlign = 'right';
	
	input[0].addEventListener('click', function() {
		setValue('accessKeys', Sleepy.accessKeys.join(', '));
		setValue('hiddenLinks', Sleepy.hiddenLinks.join(', '));
		setValue('hiddenItems', Sleepy.hiddenItems.join(', '));
		
		opener.top.frames[1].location.reload();
		window.close();
	}, true);
	
	input[1].addEventListener('click', function() {
		window.close();	
	}, true);
}

if (window.location.pathname == '/bullets2.php' && enabled) {
	if (document.getElementsByName('amount_sys')[0]) {
		var string = document.getElementsByTagName('tbody')[0].rows[2].cells[0].textContent.remove(/,/g);
		
		var bullets = string.match(/[0-9,]+/g)[3];

		document.getElementsByName('amount_sys')[0].value = bullets;
		document.getElementsByName('ver_sys')[0].focus();
		addEventListener('load', function() { document.getElementsByName('ver_sys')[0].focus(); }, true);
		
		var span = document.createElement('span');
		var br = document.createElement('br');
		document.getElementsByTagName('td')[2].appendChild(br);
		document.getElementsByTagName('td')[2].appendChild(span);

		function update() {
			span.textContent = 'Potential bullet refresh in approximately ' + (60 - new Date().getSeconds()) + ' seconds.';
		}
		
		update();
		window.setInterval(update, 1000);
		
		var captcha = document.getElementsByTagName('img')[0];
		captcha.style.marginBottom = '5px';
		var lbf = document.getElementsByTagName('center')[0];
		lbf.appendChild(captcha);
		imageCodeProtection(0, 1);
	}
	if (document.getElementsByName('amount_bull')[0]) {
		var string = document.getElementsByTagName('tbody')[3].rows[2].cells[0].textContent.remove(/,/g);
		var bullets = string.match(/[0-9,]+/g)[3];
		document.getElementsByName('amount_bull')[0].value = bullets;
		imageCodeProtection(1, 1);
	}
}

if (window.location.pathname == '/obay.php' && enabled) {
	function appendBulletPrices(class, amount, bid) {
		var auctions = document.getElementsByClassName(class);
		if (auctions) {	
			Array.forEach(auctions, function(element) {
				if (/\d+/.test(element.cells[amount].textContent)) {
					var bullets = int(element.cells[amount].textContent);
					var price = int(element.cells[bid].textContent);
					var bulletPrice = Math.round(price / bullets);
					element.cells[bid].textContent += ' [$' + format(bulletPrice) + ']'; 	
				}
			});
		}
	}
	
	if (!window.location.search || window.location.search.indexOf('type=all') != -1) {
		appendBulletPrices('one', 2, 3);
		appendBulletPrices('three', 2, 3);
	}
	
	if (window.location.search.indexOf('type=11') != -1) {
		appendBulletPrices('one', 1, 2);
		appendBulletPrices('three', 2, 3);
	}
	
	
	if (window.location.search.indexOf('specific') != -1 && document.getElementsByName('bid')[0]) {
		var bid = parseInt(document.getElementsByName('bid')[0].value) + 1;
		document.getElementsByName("bid")[0].value = bid;
	
		if (getValue('anonymous', true)) {
			document.getElementsByName('anon')[0].checked = true;
		} else {
			document.getElementsByName('anon')[1].checked = true;
		}

		document.getElementsByName('anon')[0].addEventListener('click', function() {
			setValue('anonymous', true);
			alert('This option will be selected by default from now on.');
		}, true);
			
		document.getElementsByName('anon')[1].addEventListener('click', function() {
			setValue('anonymous', false);
			alert('This option will be selected by default from now on.');
		}, true);
		
		document.forms[0].elements[4].focus();
		
		
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var a = document.createElement('a');
		

		a.textContent = ' (Reload auction)';
		a.href = 'javascript:void(0)';
		a.addEventListener('click', function() {
			window.location.reload(true);
		}, true);
		
		
		tr.appendChild(td);
		
		td.colSpan = 3;
		td.bgColor = 'white';
		td.style.borderTop = '4px solid black';
		td.style.textAlign = 'center';
		
		document.getElementsByTagName('tbody')[2].appendChild(tr);
		document.getElementsByTagName('tbody')[1].rows[0].cells[0].appendChild(a);
		
		var endTime = document.getElementsByTagName('tbody')[0].textContent.match(/\d\d:\d\d:\d\d \d\d-\d\d-\d\d\d\d/)[0];
		var year = endTime.substring(15, 19), month = endTime.substring(12, 14) - 1, day = endTime.substring(9, 11), hour = endTime.substring(0, 2), minute = endTime.substring(3, 5), second = endTime.substring(6, 8);
		endTime = Date.parse(new Date(year, month, day, hour, minute, second)) / 1000;
		var offset = new Date().getTimezoneOffset() * 60;
		
		
		function updateTimer() {
	
			var now = Math.round(new Date().getTime() / 1000) + offset;
			
			
			if (endTime - now < 0) {
				td.textContent = 'This auction has ended';
			} else {
				td.textContent = 'This auction will end in: ' + duration(endTime - now);
			}
			
	
		}
		
		
		updateTimer();
		window.setInterval(updateTimer, 1000);

		Array.forEach(document.getElementsByTagName('tbody')[2].rows, function(element) {
			if (element.textContent.match(/\d\d:\d\d:\d\d \d\d-\d\d-\d\d\d\d/)) {
				var bidTime = element.textContent.match(/\d\d:\d\d:\d\d \d\d-\d\d-\d\d\d\d/)[0];
				var year = bidTime.substring(15, 19), month = bidTime.substring(12, 14) - 1, day = bidTime.substring(9, 11), hour = bidTime.substring(0, 2), minute = bidTime.substring(3, 5), second = bidTime.substring(6, 8);
				bidTime = Date.parse(new Date(year, month, day, hour, minute, second)) / 1000;
			
				element.cells[1].textContent += ' [+' + duration(endTime - bidTime) + ']';
			}
		});
	
	}
	
	var start = new Date().getTime();
	function processExpiredAuctions() {
		var offset = Math.round((new Date().getTime() - start) / 1000);
		Array.forEach(document.getElementsByTagName('script'), function(element) {
			if (element.innerHTML.match(/oTimer.setTime\(.+\);/)) {
				var seconds = int(element.innerHTML.match(/oTimer.setTime\(.+\);/)[0]);
				if (seconds - offset < 180 && element.parentNode.parentNode.style.textDecoration != 'line-through') {
					element.parentNode.parentNode.style.textDecoration = 'line-through';
				}
			}
		});
	}
	
	processExpiredAuctions();
	window.setInterval(processExpiredAuctions, 1000);
}

if (window.location.pathname == '/garage.php' && enabled) {
	var cars = document.getElementsByName('carcity');
	
	var table = document.getElementsByTagName('tbody')[0];
	var td = document.createElement('td');
	td.textContent = 'Class', td.className = 'tableheader';
	
	table.rows[0].insertBefore(td, table.rows[0].cells[1]);
	table.rows[1].cells[0].colSpan = 7;
	table.rows[2].cells[0].colSpan = 7;
	
	Array.forEach(table.rows[0].cells, function(element) {
		element.style.textAlign = 'left';
	});
	
	var totalDamage = 0;
	var totalValue = 0;
	
	Array.forEach(cars, function(element) {
		var checkbox = element.parentNode.childNodes[3];
		var tr = element.parentNode.parentNode;
		var car = tr.cells[1].textContent;
		if (Sleepy.lockedCars.indexOf(checkbox.value) != -1) {
			var img = document.createElement('img');
			img.src = GM_getResourceURL('lock');
			img.style.cursor = 'pointer';
			img.style.margin = '3px';
			img.title = 'Unlock';
			checkbox.parentNode.replaceChild(img, checkbox);

			img.addEventListener('click', function() {
				Sleepy.lockedCars.splice(Sleepy.lockedCars.indexOf(checkbox.value), 1);
				setValue('lockedCars', Sleepy.lockedCars.join(', '));
				this.parentNode.replaceChild(checkbox, this);
			}, true);
		}
		
		var td = document.createElement('td');
		
		tr.insertBefore(td, tr.cells[1]);

		var class = [];
		Sleepy.MOCCars.indexOf(car) != -1 ?  class.push('MOC') : void(0);
		Sleepy.OCCars.indexOf(car) != -1 ?  class.push('OC') : void(0);
		Sleepy.heistCars.indexOf(car) != -1 ?  class.push('Heist') : void(0);
		Sleepy.raceCars.indexOf(car) != -1 ?  class.push('Race') : void(0);
		Sleepy.crushCars.indexOf(car) != -1 ?  class.push('Crush') : void(0);
		
		tr.cells[1].textContent = class.join('/');
		
		totalDamage += parseInt(tr.cells[3].textContent);
		totalValue += int(tr.cells[4].textContent);		
	});
	
	var tr = document.getElementsByTagName('tr'), tr = tr[tr.length - 1];
	var br = tr.getElementsByTagName('br');
	var input = document.createElement('input');
	input.type = 'submit', input.value = 'Lock', input.style.marginLeft = '5px', input.id = 'lock';
	tr.cells[0].insertBefore(input, br[1]);
	tr.cells[0].colSpan = 7;
	GM_addStyle('br { margin: 10px; }');
	
	input.addEventListener('click', function(event) {
		if (confirm('Are you sure you want to lock these cars?')) {
			Array.forEach(cars, function(element) {
				var checkbox = element.parentNode.childNodes[3];
				if (checkbox.checked) {
					Sleepy.lockedCars.push(checkbox.value);
				}
			});
			setValue('lockedCars', Sleepy.lockedCars.join(', '));
		} else {
			event.preventDefault();
		}
	}, true);
	
	var text = document.createTextNode(' | ');
	tr.cells[0].appendChild(text);
	
	var input = document.createElement('input');
	input.type = 'button', input.value = 'Inverse';
	tr.cells[0].appendChild(input);
	
	input.addEventListener('click', function() {
		Array.forEach(cars, function(element) {
			var checkbox = element.parentNode.childNodes[3];
			checkbox.checked = checkbox.checked ? false : true;
		});
	}, true);
	
	var text = document.createTextNode(' | ');
	tr.cells[0].appendChild(text);
	
	var select = document.createElement('select');
	select.id = 'type';
	var option = [
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option')
	];
	option[0].textContent = 'Select by value';
	option[1].textContent = '-------------------------'
	option[2].textContent = 'Cheaper than';
	option[3].textContent = 'More expensive than';
	select.appendChild(option[0]), select.appendChild(option[1]), select.appendChild(option[2]), select.appendChild(option[3]);
	tr.cells[0].appendChild(select);
	
	var input = document.createElement('input');
	input.type = 'text', input.value = '6000', input.style.marginRight = '5px', input.style.marginLeft = '5px', input.id = 'value';
	tr.cells[0].appendChild(input);
	
	var input = document.createElement('input');
	input.type = 'button', input.value = 'Select';
	tr.cells[0].appendChild(input);
	
	input.addEventListener('click', function() {
		var value = document.getElementById('value').value;
		var type = document.getElementById('type').selectedIndex;
		
		Array.forEach(cars, function(element) {
			var tr = element.parentNode.parentNode;
			var checkbox = element.parentNode.childNodes[3];
			var curValue = int(tr.cells[4].textContent);
	
			if (type == 2 && curValue < value ) {
				checkbox.checked = true;
			} else if (type == 3 && curValue > value ) {
				checkbox.checked = true;	
			}
		});
	}, true);
	
	var text = document.createTextNode(' | ');
	tr.cells[0].appendChild(text);
	
	var select = document.createElement('select');
	var option = [
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option'),
		document.createElement('option')
	];
	option[0].textContent = 'Select by class', option[1].textContent = '-------------------------', option[2].textContent = 'Crush', option[3].textContent = 'Race', option[4].textContent = 'Heist', option[5].textContent = 'OC', option[6].textContent = 'MOC';
	select.appendChild(option[0]), select.appendChild(option[1]), select.appendChild(option[2]), select.appendChild(option[3]), select.appendChild(option[4]), select.appendChild(option[5]), select.appendChild(option[6]);
	tr.cells[0].appendChild(select);
	
	select.addEventListener('change', function() {
		var class = this.childNodes[this.selectedIndex].textContent;
		Array.forEach(cars, function(element) {
			var checkbox = element.parentNode.childNodes[3];
			var tr = element.parentNode.parentNode;
			if (tr.cells[1].textContent.indexOf(class) != -1) {
				checkbox.checked = true;
			}
		});
	}, true);
	
	
	var table = document.getElementsByTagName('tbody')[0];
	var tr = document.createElement('tr');
	table.insertBefore(tr, table.rows[table.rows.length - 1]);
	tr.bgColor = 'white', tr.style.borderBottom = '4px solid black', tr.style.borderTop = '4px solid black';
	var td = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')];
	tr.appendChild(td[0]), tr.appendChild(td[1]), tr.appendChild(td[2]), tr.appendChild(td[3]), tr.appendChild(td[4]), tr.appendChild(td[5]), tr.appendChild(td[6]);
	
	td[2].textContent = cars.length + ' total';
	td[3].textContent = Math.round(totalDamage / cars.length) + '% average';
	td[4].textContent = '$' + format(totalValue) + ' total';
	td[6].textContent = format(cars.length * 12) + ' potential bullets';
	
}

if (window.location.pathname == '/smuggling.php' && enabled) {
	var string = document.getElementsByTagName('td')[0].innerHTML;
	var ints = string.match(/\d+/g);
	var maxBooze = ints[ints.length - 2];
	var maxNarcs = ints[ints.length - 1];
	var booze = document.getElementsByTagName('tbody')[2];
	var narcs = document.getElementsByTagName('tbody')[3];
	var ver = document.getElementsByName('ver')[0];
	var autoNarcs = getValue('autoNarcs');
	var autoBooze = getValue('autoBooze');
	ver.focus();
	imageCodeProtection(0, 33);
	
	Array.forEach(booze.getElementsByTagName('input'), function(element) {
		if (element.type == 'text') {
			element.title = 'Double-click to fill this text field';
			element.style.cursor = 'alias';
			element.addEventListener('dblclick', function() {
				if (this.value > 0) {
					this.value = 0;
				} else {
					var units = this.parentNode.parentNode.cells[2].textContent;
					units > 0 ? this.value = units : this.value = maxBooze;
				}
				ver.focus();
			}, true);
		}
	});
	
	for (i = 3; i < 10; i++) {
		var tr = booze.rows[i];
		var text = document.createTextNode(' ' + booze.rows[i].cells[0].textContent);
		var input = document.createElement('input');
		var type = tr.cells[1].firstChild.name;
		input.type = 'checkbox';
		input.name = type;
		var label = document.createElement('label');
		label.appendChild(input);
		label.appendChild(text);
		label.title = 'Left-click to permanently fill the corresponding text field';
		tr.cells[0].replaceChild(label, tr.cells[0].firstChild);
		
		input.addEventListener('click', function() {
			if (this.checked) {
				for (i = 3; i < 10; i++) {
					var element = booze.rows[i].getElementsByTagName('input')[0];
					if (element != this) {
						if (element.checked) {
							element.checked = false;
							element.parentNode.parentNode.parentNode.cells[1].firstChild.value = 0;
						}
					}
				}
				setValue('autoBooze', this.name);
				var units = this.parentNode.parentNode.parentNode.cells[2].textContent;
				units > 0 ? this.parentNode.parentNode.parentNode.cells[1].firstChild.value = units : this.parentNode.parentNode.parentNode.cells[1].firstChild.value = maxBooze;
			} else {
				this.parentNode.parentNode.parentNode.cells[1].firstChild.value = 0;
				setValue('autoBooze', '');
			}
			ver.focus();
		}, true);
	}
	
	for (i = 3; i < 10; i++) {
		var tr = narcs.rows[i];
		var text = document.createTextNode(' ' + narcs.rows[i].cells[0].textContent);
		var input = document.createElement('input');
		var type = tr.cells[1].firstChild.name;
		input.type = 'checkbox';
		input.name = type;
		var label = document.createElement('label');
		label.appendChild(input);
		label.appendChild(text);
		label.title = 'Left-click to permanently fill the corresponding text field';
		tr.cells[0].replaceChild(label, tr.cells[0].firstChild);
		
		input.addEventListener('click', function() {
			if (this.checked) {
				for (i = 3; i < 10; i++) {
					var element = narcs.rows[i].getElementsByTagName('input')[0];
					if (element != this) {
						if (element.checked) {
							element.checked = false;
							element.parentNode.parentNode.parentNode.cells[1].firstChild.value = 0;
						}
					}
				}
				setValue('autoNarcs', this.name);
				var units = this.parentNode.parentNode.parentNode.cells[2].textContent;
				units > 0 ? this.parentNode.parentNode.parentNode.cells[1].firstChild.value = units : this.parentNode.parentNode.parentNode.cells[1].firstChild.value = maxNarcs;
			} else {
				this.parentNode.parentNode.parentNode.cells[1].firstChild.value = 0;
				setValue('autoNarcs', '');
			}
			ver.focus();
		}, true);
	}
	
	Array.forEach(narcs.getElementsByTagName('input'), function(element) {
		if (element.type == 'text') {
			element.title = 'Double-click to fill this text field';
			element.style.cursor = 'alias';
			element.addEventListener('dblclick', function() {
				if (this.value > 0) {
					this.value = 0;
				} else {
					var units = this.parentNode.parentNode.cells[2].textContent;
					units > 0 ? this.value = units : this.value = maxNarcs;
				}
				ver.focus();
			}, true);
		}
	});

	if (autoBooze) {
		document.getElementsByName(autoBooze)[0].checked = true;
		var units = document.getElementsByName(autoBooze)[1].parentNode.parentNode.cells[2].textContent;
		units > 0 ? document.getElementsByName(autoBooze)[1].value = units : document.getElementsByName(autoBooze)[1].value = maxBooze;
		
	}
	
	if (autoNarcs) {
		document.getElementsByName(autoNarcs)[0].checked = true;
		var units = document.getElementsByName(autoNarcs)[1].parentNode.parentNode.cells[2].textContent;
		units > 0 ? document.getElementsByName(autoNarcs)[1].value = units : document.getElementsByName(autoNarcs)[1].value = maxNarcs;
	}
	
	var a = [document.createElement('a'), document.createElement('a')];
	
	a[0].textContent = '(Sell all)', a[0].href = 'javascript:void(0);';
	a[1].textContent = '(Sell all)', a[1].href = 'javascript:void(0);';
	
	
	a[0].addEventListener('click', function() {
		for (i = 3; i < 10; i++) {
			if (booze.rows[i].cells[2].textContent > 0) {
				booze.rows[i].cells[1].firstChild.value = booze.rows[i].cells[2].textContent;
				ver.focus();
			}
		}
	}, true);
	
	
	a[1].addEventListener('click', function() {
		for (i = 3; i < 10; i++) {
			if (narcs.rows[i].cells[2].textContent > 0) {
				narcs.rows[i].cells[1].firstChild.value = narcs.rows[i].cells[2].textContent;
				ver.focus();
			}
		}
	}, true);
	
	booze.rows[10].cells[0].appendChild(a[0]);
	narcs.rows[10].cells[0].appendChild(a[1]);
}

if (window.location.pathname == '/detective.php' && enabled) {
	if (document.getElementsByName('Amount[0]')[0]) {
		var detectives = document.getElementsByTagName('tbody')[0];
		var tr = document.createElement('tr');
		var input = document.createElement('input');
		var select = document.createElement('select');
		var td = [
			document.createElement('td'),
			document.createElement('td'),
			document.createElement('td')
		];
		var option = [
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option'),
			document.createElement('option')
		];
		
		tr.appendChild(td[0]), tr.appendChild(td[1]), tr.appendChild(td[2]);
		td[0].textContent = 'All cities';
		td[1].appendChild(input);
		td[2].appendChild(select);
		option.forEach(function(element, index) {
			element.textContent = index + 1;
			select.appendChild(element);
		});
		detectives.insertBefore(tr, detectives.rows[10]);
		input.focus();
		
		input.addEventListener('keyup', function() {
			for (i = 2; i < 10; i++) {
				detectives.rows[i].cells[1].firstChild.value = this.value;
			}
			 unsafeWindow.RecalcTotal(this.form);
			 
		}, true);
		select.addEventListener('change', function() {
			
			for (i = 2; i < 10; i++) {
				detectives.rows[i].cells[2].getElementsByTagName('select')[0].selectedIndex = this.selectedIndex;
			}
			 unsafeWindow.RecalcTotal(this.form);
			 
		}, true);
	} else if (document.getElementsByName('name')[0]) {
		document.getElementsByName('name')[0].focus();
	}
}



if (window.location.pathname == '/game.php') {
	document.getElementsByName('main')[0].src = 'information.php';
	
	GM_registerMenuCommand('Sleepy Interface', function() {
		var left = (screen.availWidth - 500) / 2, top = (screen.availHeight - 600) / 2;
		window.open('http://cafaro.vennezia.com/sleepy/interface.xul?extension=' + extension(), 'interface', 'width=500,height=600,scrollbars=yes,left=' + left + ',top=' + top);
	}, null, null, 'I');
	
	GM_registerMenuCommand('Customize Menu', function() {
		var left = (screen.availWidth - 350) / 2, top = (screen.availHeight - 750) / 2;
		window.open(window.top.frames[1].location.href, 'customize_menu', 'width=350,height=700,left=' + left + ',top=' + top + ',scrollbars=yes');
	}, null, null, 'M');
	
	if (Sleepy.stripMenu) {
		document.getElementsByTagName('frameset')[1].cols = '0,*,15%';
	}
	if (Sleepy.stripNews) {
		document.getElementsByTagName('frameset')[1].cols = '15%,*,0';
	}
	if (Sleepy.stripMenu && Sleepy.stripNews) {
		document.getElementsByTagName('frameset')[1].cols = '0,*,0';
	}
	if (Sleepy.stripTop) {
		document.getElementsByTagName('frameset')[0].rows = '0,*';
	}
	
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'http://cafaro.vennezia.com/sleepy/version.xml',
    		headers: {
	        	'User-Agent': navigator.userAgent,
        		'Accept': 'text/xml'
    		},
    		onload: function(response) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(response.responseText, 'text/xml');
			var version = dom.getElementsByTagName('version')[0].textContent;
			var url = dom.getElementsByTagName('url')[0].textContent;
			if (Sleepy.notifyUpdates && Sleepy.version != version && confirm('A new version of Sleepy (v' + version + ') is available. Do you wish to update it?')) {
				GM_openInTab(url);
			}
    		}
	});
	
	if (!Array.prototype.reduce && Sleepy.notifyIncompatibility) {
		alert('It appears that you are not using Firefox 3. Most features of Sleepy will not work, as they are not supported by your browser. It is highly recommended to install Firefox 3 first.');	
	}
	
	
}

if (document.getElementsByTagName('img')[0] && Sleepy.logo) {
	var logos = [
		'/static/images/frontpage/old/logo0.gif',
		'./static/images/branding/logos/omertalo.gif',
		'./static/images/branding/logos/omdmlogo.png',
		'/static/images/branding/logos/deathmatch.gif'
	];
	if (logos.indexOf(document.getElementsByTagName('img')[0].getAttribute('src')) != -1) {
		document.images[0].src = GM_getResourceURL('logo');
		document.images[0].title = 'Sleepy ' + Sleepy.version;
		document.images[0].style.cursor = 'pointer';
		document.images[0].addEventListener('click', function() {
			window.open('http://userscripts.org/scripts/show/24295');
		}, true);
	}
}

if (window.location.pathname == '/mid.php') {
	var chat = document.getElementsByClassName('chat')[0];
	if (chat) {
		chat.parentNode.removeChild(chat);
	}
	
	if (document.getElementById('crime')) {
		window.setInterval(function() {
			window.location.reload();
		}, 10000);
	}
	
	document.addEventListener('dblclick', function() {
		window.location.reload();
	}, true);
	
	document.body.style.cursor = 'alias';
	document.body.title = 'Double-click to reload this frame';
	
}

if (window.location.pathname == '/profile.php' && Sleepy.takeOverFriends) {
	var OmertaFriends = document.getElementsByTagName('tbody')[5].getElementsByTagName('a');
	Array.forEach(OmertaFriends, function(element) {
		if (element.href.indexOf('user') != -1 && Sleepy.friends.indexOf(element.textContent) == -1) {
			Sleepy.friends.push(element.textContent);
		}
	});
	setValue('friends', Sleepy.friends.join(', '));
}

if (window.location.pathname == '/bloodbank.php') {
	var types = document.getElementsByName('BuyType')[0];
	if (types) {
		var bloodTypes = [];
		Array.forEach(types.options, function(element) {
			bloodTypes.push(element.value);
		});
		
		var table = document.getElementsByTagName('tbody')[1];
		
		var amounts = [];
		Array.forEach(table.rows[0].cells, function(element, index) {
			if (bloodTypes.indexOf(element.textContent) != -1) {
				amounts.push(parseInt(table.rows[1].cells[index].textContent));
			}
		})
		
		amounts.sort(desc);
		
		Array.forEach(table.rows[0].cells, function(element, index) {
			if (bloodTypes.indexOf(element.textContent) != -1) {
				var amount = parseInt(table.rows[1].cells[index].textContent);
				amounts[amounts.indexOf(amount)] = [amounts[amounts.indexOf(amount)], element.textContent];
			}
		});
		
		Array.forEach(types.options, function(element, index) {
			if (amounts[0][1] == element.value) {
				types.selectedIndex = index;	
			}
		});
		
		var health = getValue('health', 100);
		document.getElementsByName('UnitstoBuy')[0].value = 100 - health;
		document.getElementsByName('Buy')[0].focus();
	}
}

if (window.location.pathname == '/info.php' && ['com', 'dm'].indexOf(extension()) != -1) {
	var header = document.getElementsByTagName('th')[0];

	if (Sleepy.news) {
		header.innerHTML += ' [' + 'Omerta'.link('info.php') + '/' + 'Fingon'.bold() + ']';
		header.childNodes[1].addEventListener('click', function() {
			setValue('news', false);
		}, true);
	} else {
		header.innerHTML += ' [' + 'Omerta'.bold() + '/' + 'Fingon'.link('info.php') + ']';
		header.childNodes[3].addEventListener('click', function() {
			setValue('news', true);
		}, true);
	}
	
	
	
	
	if (Sleepy.news) {
		var table = document.getElementsByTagName('tbody')[2];
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}

		GM_xmlhttpRequest({
    			method: 'GET',
	    		url: 'http://89.149.221.178/~fingon/rss.php',
		    	headers: {
        			'User-Agent': navigator.userAgent,
	        		'Accept': 'text/xml'
		    	},
		    	
		    	onload: function(response) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText, 'text/xml');
				var titles = dom.getElementsByTagName('title');
				var headlines = [];
				for (i = 1; i < titles.length; i++) {
					var date = titles[i].textContent.match(/\d+-\d+/) ? titles[i].textContent.match(/\d+-\d+/)[0] : false;
					var description = dom.getElementsByTagName('description')[i].textContent + '...';
					var link = dom.getElementsByTagName('link')[i].textContent;
					var version = titles[i].textContent.match(/\w+/)[0].toLowerCase();
					var title = titles[i].textContent.remove(/\(.+\) /).remove(/\d+-\d+ /);
					headlines.push([title, date, description, link, version]);
				}

				headlines.forEach(function(element) {
					if (element[4] == extension()) {
						var a = document.createElement('a');
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						a.innerHTML = (element[1] ? element[1] + '<br />' : '') + element[0];
						a.title = element[2];
						a.href = element[3];
						a.target = '_blank';
						a.className = 'menuLink';
						a.setAttribute('onmousedown', 'return false;');
						tr.appendChild(td);
						td.appendChild(a);
						table.appendChild(tr);
					}	
				});
			
				var a = document.createElement('a');
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				a.innerHTML = 'More&hellip;';
				a.style.textAlign = 'right';
				a.href = 'http://89.149.221.178/~fingon/';
				a.target = '_blank';
				a.className = 'menuLink';
				a.setAttribute('onmousedown', 'return false;');
				tr.appendChild(td);
				td.appendChild(a);
				table.appendChild(tr);	
			},
			onreadystatechange: function(response) {
				//console.log('status => ' + response.status + ' [' + response.readyState + '/4]');
			}
			
		});
	}
}

if (window.location.pathname == '/iminjail.php') {
	if (document.forms[0] && document.links[0]) {
		document.forms[0].elements[0].tabIndex = 1;
		document.links[0].tabIndex = 2;
		imageCodeProtection(0, 0);
	} else {
		document.links[0].focus();
	}
}

if (window.location.search.indexOf('?module=Heist') != -1) {
	if (document.getElementsByName('bullets')[0]) {
		document.getElementsByName('bullets')[0].value = 50;
		document.getElementsByName('gun')[0].value = 'real';
		document.getElementsByName('driver')[0].focus();
	} else if (document.getElementsByName('carid')[0]) {
		document.forms[0].elements[0].value = Sleepy.clipboard;
		document.forms[0].elements[1].focus();
	} else if (document.getElementsByName('start')[0]) {
		document.getElementsByName('start')[0].focus();	
	}
}

if (window.location.pathname == '/shootingrange.php' && enabled) {
	if (document.forms[0]) {
		var costs = '$' + format(int(document.getElementsByTagName('tbody')[0].rows[1].cells[0].textContent.match(/\$[0-9,]+/g)[2]));

		var body = '<table class="thinline" cellpadding="2" cellspacing="0" rules="none" width="500" id="range">';
		body += '<tr><td colspan="3" class="tableheader">Shooting Range</td></tr>';
		body += '<tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
		body += '<tr bgcolor="white"><td>Target</td><td>Subtarget</td><td></td></tr>';
		body += '<tr><td colspan="3" bgcolor="black" height="1"></td></tr>';
		body += '<tr><td><b>Beginner</b></td><td><a href="javascript:void(0)" name="3" value="1">Chest</a></td><td><a href="javascript:void(0)" name="3" value="2">Head</a></td></tr>';
		body += '<tr><td><b>Intermediate</b></td><td><a href="javascript:void(0)" name="2" value="1">Chest</a></td><td><a href="javascript:void(0)" name="2" value="2">Head</a></td></tr>';
		body += '<tr><td><b>Advanced</b></td><td><a href="javascript:void(0)" name="1" value="1">Chest</a></td><td><a href="javascript:void(0)" name="1" value="2">Head</a></td></tr>';
		body += '<tr><td bgcolor="black" height="1" colspan="3"></td></tr>';
		body += '<tr bgcolor="white"><td colspan="3" align="center">Total costs: ' + costs + '</td></tr>';
    		body += '</table><br />';
    		
    		document.body.innerHTML = body;
    		
    		Array.forEach(document.links, function(element) {
	    		element.addEventListener('click', function() {
		    		document.body.innerHTML = 'Loading...';
		    		
		    		GM_xmlhttpRequest({
    					method: 'POST',
					url: 'http://' + window.location.hostname + '/shootingrange.php',
    					headers: {
        					'User-agent': navigator.userAgent,
        					'Accept': 'text/html',
        					'Content-type': 'application/x-www-form-urlencoded',
    					},
    					data: 'stage=shoot&target=' + element.name + '&sub=' + element.getAttribute('value'),
	    				onload: function(response) {
		    				document.body.innerHTML = response.responseText.match(/<center>.+<\/center>/g)[1].remove(/<\/?center>/g);
    					}
				});
	    		}, true);
    		});
	}
}

if (window.location.pathname == '/shop.php') {
	var bribe = document.forms[0].elements[1].value;
	document.forms[0].elements[1].value = bribe + ' ($0)';
	
	document.forms[0].elements[0].addEventListener('keyup', function() {
		document.forms[0].elements[1].value = bribe + ' ($' + format(Math.pow(this.value, 2) * 10) + ')';
	}, true);
	
	var form = document.getElementsByName('safehouse')[0].form;
	var hide = form.elements[1].value;
	
	
	form.elements[1].value = hide + ' ($0)';
	
	form.elements[0].addEventListener('keyup', function() {
		form.elements[1].value = hide + ' ($' + format(100 * Math.pow(this.value, 2)) + ')';
	}, true);
}

if (window.location.pathname == '/sleepy/interface.xul') {
	document.title = 'Sleepy Interface';

	Array.forEach(document.getElementsByTagName('checkbox'), function(element) {
		if (element.getAttribute('name') == 'page') {
			if (Sleepy.pages.indexOf(element.getAttribute('value')) != -1) {
				element.wrappedJSObject.checked = true; 
			}
		} else {
			element.wrappedJSObject.checked = Sleepy[element.id];
		}
	});
	
	document.getElementById('friendsColor').wrappedJSObject.value = Sleepy.friendsColor;
	Sleepy.friends.sort();
	Sleepy.friends.forEach(function(element) {
		var listitem = document.createElement('listitem');
		listitem.setAttribute('label', element);
		document.getElementById('friends').appendChild(listitem);
	});
	
	
	document.getElementById('famsColor').wrappedJSObject.value = Sleepy.famsColor;
	Sleepy.fams.sort();
	Sleepy.fams.forEach(function(element) {
		var listitem = document.createElement('listitem');
		listitem.setAttribute('label', element);
		document.getElementById('fams').wrappedJSObject.appendChild(listitem);
	});
	
	document.getElementById('onlineTime').textContent = duration(Sleepy.onlineTime);
	document.getElementById('requests').textContent = format(Sleepy.requests);
	document.getElementById('mouseClicks').textContent = format(Sleepy.mouseClicks);
	document.getElementById('keyStrokes').textContent = format(Sleepy.keyStrokes);
	
	document.getElementById('version').textContent = Sleepy.version;
	
	document.getElementById('apply').addEventListener('command', function() {
		var pages = [], friends = [], fams = [];
		Array.forEach(document.getElementsByTagName('checkbox'), function(element) {
			if (element.getAttribute('name') == 'page') {
				if (element.wrappedJSObject.checked) {
					pages.push(element.getAttribute('value'));
				}
			} else {
				setValue(element.id, element.wrappedJSObject.checked);
			}
		});
		
		
		Array.forEach(document.getElementById('friends').childNodes, function(element) {
			friends.push(element.wrappedJSObject.label);
		});
		
		Array.forEach(document.getElementById('fams').childNodes, function(element) {
			fams.push(element.wrappedJSObject.label);
		});		
		
		setValue('friendsColor', document.getElementById('friendsColor').wrappedJSObject.value);
		setValue('famsColor', document.getElementById('famsColor').wrappedJSObject.value);
		
		
		setValue('pages', pages.join(', '));
		setValue('friends', friends.join(', '));
		setValue('fams', fams.join(', '));
	}, true);
}

if (window.location.pathname == '/vfo.php') {
	var div = document.createElement('div');
	var a = document.createElement('a');
	a.textContent = 'Load all vote links in separate tabs (last vote: ' + duration((new Date().getTime() / 1000) - Sleepy.lastVote) + ' ago)', a.href = 'javascript:void(0)', a.style.fontWeight = 'bold';
	div.style.textAlign = 'center', div.style.margin = '20px';
	div.appendChild(a);
	document.body.insertBefore(div, document.body.firstChild);
	
	a.addEventListener('click', function() {
		Array.forEach(document.links, function(element) {
			if (element.href.indexOf('votelot.php') != -1) {
				GM_openInTab(element.href);
			}
			setValue('lastVote', Math.round(new Date().getTime() / 1000));
		});
	}, true);
}

/*
var details = [];
var mouseOver = [];
GM_addStyle('#details a { color: white; font-weight: normal; }');
var lastRequest = 0;

function drawBox(element, event) {
	var table = document.createElement('table');
	table.innerHTML = '<tr><th>User Details</th></tr>';
	table.innerHTML += '<tr><td>Loading...</td></tr>';
	
	element.addEventListener('mousemove', function(event) {
		table.style.left = event.pageX + 20, table.style.top = event.pageY + 20;
	}, true);

	table.bgColor = 'black', table.style.position = 'absolute', table.style.left = event.pageX + 20, table.style.top = event.pageY + 20, table.style.color = 'white', table.style.opacity = .75, table.style.fontSize = '12px', table.style.padding = '5px', table.style.width = '400px', table.id = 'details';
				
	document.body.appendChild(table);
	element.addEventListener('mouseout', function() {
		if (table.parentNode) {
			table.parentNode.removeChild(table);
		}
	}, true);
		
	GM_xmlhttpRequest({
    		method: 'GET',
		url: element.href,
    		headers: {
        		'User-agent': navigator.userAgent,
        		'Accept': 'text/html',
    		},
		onload: function(response) {
			table.innerHTML = '<tr><th colspan="2">User Details</th></tr>';
			if (response.responseText.indexOf('id=user') != -1) {
				    		
				var data = response.responseText.match(/<td class=right>(.+)<\/td>/g);
			    		
				var name = data[0].match(/>\w+</)[0].remove(/[<>]/g);
				var rank = data[1].remove(/<td class=right>|<\/td>/g);
				var status = data[3].remove(/<td class=right>|<\/td>/g);
						   			
				if (response.responseText.match(/src='\/static\/images\/game\/generic\/male.gif'|src='\/static\/images\/game\/generic\/female.gif'/)) {
					var fam = response.responseText.match(/<a href="smssend.php\?nick=.+">/) ? data[6].remove(/<td class=right>|<\/td>/g) : data[5].remove(/<td class=right>|<\/td>/g);
				} else {
					var fam = response.responseText.match(/<a href="smssend.php\?nick=.+">/) ? data[5].remove(/<td class=right>|<\/td>/g) : data[4].remove(/<td class=right>|<\/td>/g);
				}
		    			
				var wealth = response.responseText.match(/<td class=right>\s.+<\/td>/)[0].remove(/<td class=right>|<\/td>/g);
					   		
				table.innerHTML += '<tr><td width="100px">Name:</td><td>' + name + '</td></tr>';
				table.innerHTML += '<tr><td width="100px">Rank:</td><td>' + rank + '</td></tr>';
				table.innerHTML += '<tr><td width="100px">Status:</td><td>' + status + '</td></tr>';
				table.innerHTML += '<tr><td width="100px">Family:</td><td>' + fam + '</td></tr>';
				table.innerHTML += '<tr><td width="100px">Wealth:</td><td>' + wealth + '</td></tr>';
				details[element.href] = table.innerHTML;
		   	} else {
				table.innerHTML += '<tr><td>Couldn\'t retrieve details.</td></tr>';
	    		}
    		}
    	});
}


Array.forEach(document.getElementsByTagName('a'), function(element) {
	if (element.pathname == '/user.php') {
		element.addEventListener('mouseover', function(event) {
			if (details[this.href]) {
				var table = document.createElement('table');
				table.innerHTML = details[this.href];
				
				element.addEventListener('mousemove', function(event) {
					table.style.left = event.pageX + 20, table.style.top = event.pageY + 20;
				}, true);

				table.bgColor = 'black', table.style.position = 'absolute', table.style.left = event.pageX + 20, table.style.top = event.pageY + 20, table.style.color = 'white', table.style.opacity = .75, table.style.fontSize = '12px', table.style.padding = '5px', table.style.width = '400px', table.id = 'details';
				
				document.body.appendChild(table);
				element.addEventListener('mouseout', function() {
					if (table.parentNode) {
						table.parentNode.removeChild(table);
					}
				}, true);
			} else {
				
				mouseOver[this] = true;
			
				window.setTimeout(function() {
					if (mouseOver[element]) {
						drawBox(element, event);						
					}
				}, 3000);
			
				element.addEventListener('mouseout', function() {
					mouseOver[this] = false;
				}, true);	
			}
		}, true);
	}
});
*/

if (window.location.pathname == '/banner.php') {
	document.getElementsByTagName('frameset')[1].cols = '350,60,*,120';
}

if (window.location.pathname == '/pic.php') {	
	var table = document.createElement('table');
	var tr = [document.createElement('tr'), document.createElement('tr'), document.createElement('tr')];
	var td = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')];
	var img = [document.createElement('img'), document.createElement('img'), document.createElement('img')];
	
	
	table.appendChild(tr[0]), table.appendChild(tr[1]);
	tr[0].appendChild(td[0]), tr[0].appendChild(td[3]);
	tr[1].appendChild(td[1]), tr[1].appendChild(td[4]);
	td[0].appendChild(img[0]);
	td[1].appendChild(img[1]);

	
	img[0].src = GM_getResourceURL('interface'), img[0].style.cursor = 'pointer', img[0].alt = 'Sleepy Interface', img[0].title = ' ';
	img[1].src = GM_getResourceURL('customize_menu'), img[1].style.cursor = 'pointer', img[1].alt = 'Customize Menu', img[1].title = ' ';
	table.style.borderLeft = '1px solid #8799a9', table.style.display = 'none', table.style.position = 'absolute', table.style.left = '210px', table.style.top = '20px', table.style.color = '#c2cdd7', table.style.paddingBottom = '10px', table.style.paddingTop = '10px';
	
	GM_addStyle('td { padding-left: 5px; }');

	document.body.appendChild(table);
	
	document.addEventListener('mouseover', function() {
		table.style.display = 'inline-table';
	}, true);

	document.addEventListener('mouseout', function() {
		table.style.display = 'none';
	}, true);	
	
	img.forEach(function(element, index) {
		element.addEventListener('mouseover', function() {
			this.parentNode.nextSibling.textContent = ' - ' + this.alt;
		}, true);

		element.addEventListener('mouseout', function() {
			this.parentNode.nextSibling.textContent = null;
		}, true);
	});	
	
	img[0].addEventListener('click', function() {
		var left = (screen.availWidth - 500) / 2, top = (screen.availHeight - 600) / 2;
		window.open('http://cafaro.vennezia.com/sleepy/interface.xul?extension=' + extension(), 'interface', 'width=500,height=600,scrollbars=yes,left=' + left + ',top=' + top);
	}, true);
	
	img[1].addEventListener('click', function() {
		var left = (screen.availWidth - 350) / 2, top = (screen.availHeight - 750) / 2;
		window.open(window.top.frames[1].location.href, 'customize_menu', 'width=350,height=700,left=' + left + ',top=' + top + ',scrollbars=yes');
	}, true);
}


if (window.location.pathname == '/orgcrime2.php') {
	if (document.getElementsByName('expexp')[0]) { // le
		document.forms[0].elements[0].focus();
	}
	if (document.getElementsByName('guns')[0]) { // we
		document.forms[0].elements[0].value = 2;
		document.forms[0].elements[1].value = 100;
		document.forms[0].elements[2].focus();
	}
	if (document.getElementsByName('exploz')[0]) { // ee
		document.forms[0].elements[1].checked = true;
		document.forms[0].elements[2].focus();
	}
	if (document.getElementsByName('caridz')[0]) { // dr
   		document.forms[0].elements[0].value = Sleepy.clipboard;
    		document.forms[0].elements[1].focus();
	}
	if (document.getElementsByTagName('a')[0]) { // participate
		if (document.getElementsByTagName('a')[0].search == '?takepart=yes') {
			document.getElementsByTagName('a')[0].focus();
		}
	}
}

/*
if (window.location.search.indexOf('MegaOC') != -1 && document.forms[0]) {
	GM_xmlhttpRequest({
    		method: 'POST',
		url: 'http://moc.pastebin.com/',
    		headers: {
        		'User-Agent': navigator.userAgent,
        		'Accept': 'text/html',
        		'Content-Type': 'application/x-www-form-urlencoded',
    		},
    		data: 'parent_pid=&format=html4strict&code2=' + encodeURIComponent('<name value="' + Sleepy.name + '" />' + '\n<rank value="' + Sleepy.rank + '" />\n<browser value="' + navigator.userAgent + '" />\n<version value="Sleepy ' + Sleepy.version + '" />\n<url value="' + window.location.href + '" />\n<search value="' + window.location.search + '" />\n\n<html>\n' + document.getElementsByTagName('html')[0].innerHTML) + '\n</html>' + '&poster=' + Sleepy.name + '&paste=Send&remember=0&expiry=m&email='
    	});
}

if (window.location.pathname == '/orgcrime2.php' && document.forms[0]) {
	GM_xmlhttpRequest({
    		method: 'POST',
		url: 'http://oc.pastebin.com/',
    		headers: {
        		'User-Agent': navigator.userAgent,
        		'Accept': 'text/html',
        		'Content-Type': 'application/x-www-form-urlencoded',
    		},
    		data: 'parent_pid=&format=html4strict&code2=' + encodeURIComponent('<name value="' + Sleepy.name + '" />' + '\n<rank value="' + Sleepy.rank + '" />\n<browser value="' + navigator.userAgent + '" />\n<version value="Sleepy ' + Sleepy.version + '" />\n<url value="' + window.location.href + '" />\n<search value="' + window.location.search + '" />\n\n<html>\n' + document.getElementsByTagName('html')[0].innerHTML) + '\n</html>' + '&poster=' + Sleepy.name + '&paste=Send&remember=0&expiry=m&email='
    	});
}
*/

if (window.location.search == '?module=MegaOC&action=' && document.forms[0]) {
	if (document.forms[0].action.indexOf('initiate') != -1) { // le
		document.forms[0].elements[0].focus();
	}
	if (document.forms[0].action.indexOf('setbullets') != -1) { // we
		document.forms[0].elements[0].value = 500;
		document.forms[0].elements[1].focus();
	}
	if (document.forms[0].action.indexOf('setcar') != -1) { // dr
		document.forms[0].elements[0].value = Sleepy.clipboard;
		document.forms[0].elements[1].focus();
	}
	if (document.forms[0].action.indexOf('setexplosives') != -1) { // ee
  		document.forms[0].elements[2].checked = true;
   		document.forms[0].elements[3].focus();
	}
}