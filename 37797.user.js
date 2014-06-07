// ==UserScript==
// @name           Popmundo Bedava Evler
// @namespace      http://popodeus.com
// @description    Popmundo'daki bedava evlere sehir sayfasından erismenizi saglayan kodlar.
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @include        http://popodeus.com/*
// @author	   Deniz Barralet
// @version	   999
// ==/UserScript==
var version = 999;

// 60*60*24*2
var TIMEDIFF = 172800;

var VERSION_CHECKED = 'update.checked';
var UPDATE_CHECK_URL = 'http://userscripts.org/scripts/review/27106?format=txt';
var LAST_SCRIPT_URL = 'http://userscripts.org/scripts/show/27106?versioncheck=';
var URLPART = 'City.asp?action=view';

var HOSTELS = { 
	8: 221845, // Amsterdam, Melanie Wellmann
	35: 1108601, // Ankara, Sudan Çıkmış Balık
	9: 1575272, // Barcelona, Jüri Johnson
	36: 284018, // Belgrade, Janne Kauppi
	7: 511738, // Berlin, Sirpa Virjonen
	33: 1286689, // Brussels, Nicolaas Burggraaf
	46: 774751, // Bucharest, Ian Secker
	42: 916214, // Budapest, Alessandra Zamperini
	17: 229221, // Buenos Aires, Ricky Hadley
	22: 229197, // Copenhagen, Wes Toland
	29: 198413, // Dubrovnik, Dave Faust
	27: 1300615, // Glasgow, José Aalderen
	19: 163848, // Helsinki, Ramon Dalenberg
	30: 329100, // Istanbul, Bahriye Çağlayan
	47: 790028, // Izmir, Gregorio Gerpe
	5: 65576, // London, Anki Ankie Schiefer
	14: 337811, // Los Angeles, Hartmut Hake
	24: 197695, // Madrid, Lachlan Rafter
	10: 1429829, // Melbourne, Cristina Salvatierra 
	32: 225203, // Mexico City, Atte Näränen
	38: 368112, // Montreal, Arianna Roma
	18: 222936, // Moscow, Helena Gillstad
	11: 1083022, // Nashville, Marquita Thorn
	6: 170050, // New York, Isabel Jurgens
	20: 176219, // Paris, Valéry Faye
	31: 169289, // Porto, Reg Mccloud
	25: 229458, // Rio de Janeiro, Achmed Witte
	23: 209433, // Rome, Nílton Francisco Damerau
	21: 230771, // São Paulo, Achmed Witte
	49: 1175656, // Sarajevo, Magnus Jonas-Astor
        50: 1357639, // Seattle, Kenya King
	45: 675717, // Shanghai, Mason Bolger
	39: 475004, // Singapore, Pippo Capuano
	1: 184452, // Stockholm, Peter McGinnes
	34: 271290, // Tallinn, Annette Cuffe
	16: 229736, // Toronto, Pascaline Foulquier
	26: 988565, // Tromsø, Alva Larsson
	28: 234277, // Vilnius, Dave Simcock
	48: 848436 // Warsaw, Stephen Vohmann 
};

// Checks for updated script on Userscripts website
function getOnlineRevision() {
	GM_xmlhttpRequest({
		method:'GET',
		url:UPDATE_CHECK_URL,
		onload: function(resp) {
			var text = resp.responseText;
			if (resp.status == 200) {
				var tmp = text.match( /.*var version\s+?=\s+?(\d+)/i );
				if (tmp) {
					var online_ver = tmp[1];
					GM_log('Online version: ' + online_ver);
					if (online_ver > version) {
						var duh = confirm('There is a newer version of the script online, with updated hostel info.\n\nGo to download page?')
						if (duh) {
							GM_openInTab(LAST_SCRIPT_URL);
						}
					}
					var checktime = Math.round(new Date().getTime() / 1000);
					GM_log('checktime: ' + checktime)
					GM_setValue(VERSION_CHECKED, checktime);
				}
			}
		}
	});

}

if (location.href.indexOf(URLPART) > 0) {
	var doOnlineCheck = false;
	if (typeof(GM_getValue) != "undefined") {
		var lastcheck = GM_getValue(VERSION_CHECKED);
		if (!lastcheck) lastcheck = 0;
		var now = Math.round(new Date().getTime() / 1000) ;
		var diff = now - lastcheck;
		GM_log('now: ' + now + '\n' +
			'last check: ' + lastcheck + '\n' +
			'diff: ' + diff);
		doOnlineCheck = (diff >= TIMEDIFF);
	
		GM_log('doOnlineCheck: ' + doOnlineCheck);
		if (doOnlineCheck) getOnlineRevision();
	}

	var citylink = document.evaluate("//a[contains(@href, 'action=View&CityID=')]", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	if (citylink) {
		var city_id = citylink.snapshotItem(0).href.match( /CityID=(\d+)/ )[1];
		var div = document.getElementById('div');
		if (div && HOSTELS[city_id]) {
			var star = div.getElementsByTagName('img')[0];
			
			var newdiv = document.createElement('div');
			newdiv.innerHTML = '<img src="graphics/Default/miscellaneous/Rivet.gif" alt="" width="8" height="8" hspace="5" /> '+
			'<a href="javascript:void(0)" onclick="meny(\'MenuHostel\'); this.blur()">' +
			'<font color="#333333">Bedava Ev</font></a><br />' + 
			'<div id="MenuHostel" style="display: none; padding-left:6px; padding-bottom:5px;">' + 
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
			'<a href="Locale.asp?action=MoveHere&LocaleID='+HOSTELS[city_id]+'">Bedava Eve Git</a></div>' +
			'<img src="images/trans_pixel.gif" width="1" height="4"><br />';
	
			div.insertBefore( newdiv, star );
		}
	}
}