// ==UserScript==
// @name        Fıkra Evleri
// @namespace   popmundo
// @include     http://*.popmundo.com/World/Popmundo.aspx/City*
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// ==/UserScript==
var HOSTELS = {
	  8:  3079658, // Amsterdam
	 35:  3078902, // Ankara
	 61:  3079691, // Antalya
	 58:  3079247, // Baku
	  9:  3079663, // Barcelona
	 36:  3078906, // Belgrade
	  7:  3079654, // Berlin
	 33:  3079660, // Brussels
	 46:  3079651, // Bucharest
	 42:  3079653, // Budapest
	 17:  3078912, // Buenos Aires
	 60:  3078972, // Chicago
	 22:  3079325, // Copenhagen
	 29:  3079467, // Dubrovnik
	 27:  3079661, // Glasgow
	 19:  3079321, // Helsinki
	 30:  2990401, // Istanbul
	 47:  3078901, // Izmir
	 55:  3079244, // Jakarta
	 51:  3078910, // Johannesburg
	 56:  3079248, // Kiev
	  5:  3078898, // London
	 14:  3078973, // Los Angeles
	 24:  3079667, // Madrid
	 54:  3079243, // Manila
	 10:  3079245, // Melbourne
	 32:  3079241, // Mexico City
	 52:  3079561, // Milan
	 38:  3078918, // Montreal
	 18:  3079318, // Moscow
	 11:  3078917, // Nashville
	  6:  3078905, // New York
	 20:  3079664, // Paris
	 31:  3079665, // Porto
	 25:  3078909, // Rio de Janeiro
	 23:  3079649, // Rome
	 21:  3078911, // São Paulo
	 49:  3079560, // Sarajevo
	 50:  3078975, // Seattle
	 45:  3079242, // Shanghai
	 39:  3079246, // Singapore
	 53:  3079650, // Sofia
	  1:  3079320, // Stockholm
	 34:  3079322, // Tallinn
	 16:  3078969, // Toronto
	 62:  3049686, // Tokyo
	 26:  3079324, // Tromsø
	 28:  3079319, // Vilnius
	 48:  3079326, // Warsaw
	  0:        0  // filler data. Ignore this
};
var localesLink = document.querySelector('#sidemenu a[href*="/World/Popmundo.aspx/City/Locales/"]'),
	cityId = localesLink.href.match(/(\d+)$/)[1];

if (!cityId || !HOSTELS[cityId]) {
	return;
}

var li = document.createElement('li'),
	a = document.createElement('a');
	
a.textContent = 'Fıkra Evi(Joke House)';
a.href = '/World/Popmundo.aspx/Locale/' + HOSTELS[cityId];
li.appendChild(a);
localesLink.parentNode.parentNode.insertBefore(li, localesLink.parentNode.nextSibling);


/*
	begin copy & paste from numeric grades
*/

var scriptData = {
	optionsNamespace: 'youth_hostels_options',
	updateNotificationText: 'Fıkra Evleri Güncellemesi Yayınlandı! Lütfen güncelleyin',
	url: "http://userscripts.org/scripts/source/175936.user.js",
	updateUrl: "http://userscripts.org/scripts/source/175936.meta.js",
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