// ==UserScript==
// @name        Youth Hostels
// @namespace   popmundo
// @include     http://*.popmundo.com/World/Popmundo.aspx/City*
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var HOSTELS = {
	8 : 	2622910, // A to M, Marloes Paalvast
	35 : 	3117239, // Ankara, Marco Mezzetti
	61 : 	2820768, // Antalya, Varg Berkes
	58 : 	2508464, // Baku, Alev Serif
	9 : 	2791141, // Barcelona, Alessandro Bruno
	36 : 	2920964, // Belgrade, María Juana Dogana
	7 : 	1827216, // Berlin, Sirpa Virjonen
	33 : 	3040166, // Brussels, Caroline de Lang
	46 : 	774751, // Bucharest, Johan Solo
	42 : 	3117280, // Budapest, Federico Neri
	17 : 	115485, // Buenos Aires, José Luis Álvarez
	60 : 	2985160, // Chicago, Amalthea l'Amoureux
	22 : 	3041571, // Copenhagen, Darian Cioran
	29 : 	1173622, // Dubrovnik, Einari Kyöttilä
	30 : 	2823888, // Istanbul, Matthias Hake
	47 : 	2076307, // Izmir, Jay Kondo
	55 : 	2366752, // Jakarta, Pekka Ruonela
	51 : 	1846674, // Johannesburg, Patrik Paulsson
	56 : 	2435050, // Kiev, Anatoliy Novikov
	5 : 	3064888, // London, Sophia McCarthy
	14 : 	337811, // Los Angeles, Hartmut Hake
	24 : 	3156762, // Madrid, Astaron Devil
	54 : 	3108747, // Manila, Nico Craw
	10 : 	3157024, // Melbourne, Eva Lundhskär
	32 : 	2819526, // Mexico City, Arsenio Escobar
	52 : 	2860497, // Milan, Duke Evangelisti
	38 : 	2820595, // Montreal, Gaia Eschenbach
	18 : 	1627383, // Moscow, Trevor Martin
	11: 	2828625, // N-W, Gun Akins
	6: 		3069821, // New York, Johnnie Bravo
	20: 	176219, // Paris, Valéry Faye
	31: 	3092119, // Porto, Jean Sanger
	25: 	2758988, // Rio de Janeiro, Roque Alencar
	23: 	3052320, // Rome, Lolita Allegri
	21: 	2973473, // São Paulo, Indy O´Conner
	49: 	3117380, // Sarajevo, Federico Neri
	50: 	2649052, // Seattle, Marloes Paalvast
	45: 	675717, // Shanghai, Mason Bolger
	39: 	3151157, // Singapore, Simone Simons Halliwell
	53: 	1962951, // Sofia, Pekka Ruonela
	1: 		2797038, // Stockholm, Xander Páez
	34: 	3008422, // Tallinn, Perfiliy Palagin
	62: 	3047285, // Tokyo, Jefe Tempe
	16: 	229736, // Toronto, Pascaline Foulquier
	26: 	988565, // Tromsø, Alva Larsson
	28: 	1743451, // Vilnius, Patrik Paulsson
	48: 	3005106, // Warsaw, Blanka Trocha
};
var localesLink = document.querySelector('#sidemenu a[href*="/World/Popmundo.aspx/City/Locales/"]'),
	cityId = localesLink.href.match(/(\d+)$/)[1];

if (!cityId || !HOSTELS[cityId]) {
	return;
}

var li = document.createElement('li'),
	a = document.createElement('a');
	
a.textContent = 'Youth Hostel';
a.href = '/World/Popmundo.aspx/Locale/' + HOSTELS[cityId];
li.appendChild(a);
localesLink.parentNode.parentNode.insertBefore(li, localesLink.parentNode.nextSibling);


/*
	begin copy & paste from numeric grades
*/

var scriptData = {
	optionsNamespace: 'youth_hostels_options',
	updateNotificationText: 'Youth Hostels Update Available',
	url: "http://userscripts.org/scripts/source/167901.user.js",
	updateUrl: "http://userscripts.org/scripts/source/167901.meta.js",
	lastCheck: 0,
	updateAvailable: false,
	version: 1.0
}

var notify = function () {
	var aClose = document.createElement('div');
	aClose.textContent = scriptData.updateNotificationText;
	aClose.classList.add('notification-success');
	aClose.onclick = function (t) {
		options.set('updateAvailable',false);
		GM_openInTab(scriptData.url);
		t.target.parentNode.removeChild(t.target);
		if (document.querySelectorAll('#notifications > div').length < 1) {
			document.getElementById('notifications').classList.add('hidden');
			document.getElementById('notifications').style.display = 'none';
		}
	};
	var nots = document.getElementById('notifications');
	nots.appendChild(aClose);
	nots.classList.remove('hidden');
	nots.style.display = 'block';
}

var options = {
	set: function (option, value) {
		if (!option || value == null) return false;
		// because I don't want to save default values
		var data = this.load();
		scriptData[option] = value;
		data[option] = value;
		this.save(data);
		return true;
	},
	get: function (option) {
	},
	save: function (data) {
		if (!data) return undefined;
		GM_setValue(scriptData.optionsNamespace, JSON.stringify(data));
		return true;
	},
	load: function () {
		var data = GM_getValue(scriptData.optionsNamespace,'{}');
		if (data.length < 1) data = '{}';
		data = JSON.parse(data);
		for (i in data) {
			scriptData[i] = data[i];
		}
		return data;
	}
}


if (scriptData.updateAvailable) {
	notify();
}
else if (parseInt(+new Date().valueOf() - scriptData.lastCheck) > 604800000) { // 1 week
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptData.updateUrl,
		onload: function (res) {
			options.set('lastCheck', new Date().valueOf());
			var remoteVersion = res.responseText.match(/\/\/\s+@version\s+([\d\.]+)$/mi);
			if (!remoteVersion) {
				GM_log('Error parsing remote file!');
				return;
			}
			if (remoteVersion[1] > scriptData.version) {
				options.set('updateAvailable',true);
				notify();
			}
		}
	});
}
