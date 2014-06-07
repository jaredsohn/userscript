// ==UserScript==
// @name           Popmundo Youth Hostels
// @namespace      http://popodeus.com
// @description    Quick access to Youth Hostels in Popmundo.com city page. Absolutely SAFE to use!
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @include        http://popodeus.com/*
// @author         Seppo Vuolteenaho, aka Photodeus, aka Popodeus
// @version        20120207
// ==/UserScript==
var version = 20120207;

// Translatable strings
// TODO fetch them from a resource
var MSG_YOUTH_HOSTEL = 'Youth hostel';
var MSG_SHOW_HOSTEL = 'Show Youth Hostel';
var MSG_UPGRADE = 'Upgrade Youth Hostel Script';
var MSG_NEW_VERSION = 'There is a newer version of the Youth Hostel script online\n\nGo to download page?';

// =====
var TIMEDIFF = 86400; // 60*60*24*7 = 7 days
var VERSION_CHECKED_TIME = 'update.checked';
var UPDATE_AVAILABLE = 'update.available';
var UPDATE_CHECK_URL = 'http://popodeus.com/scripts/install/27106.meta.js';
var INSTALL_URL = 'http://popodeus.com/scripts/install/27106.user.js';
var URLPART = 'City.asp?action=view';

var HOSTELS = {
// Data automatically fetched at Tue Feb 07 14:12:00 CEST 2012
// source: http://www123.popmundo.com/Common/cn.asp?a=v&t=721962&n=2
	  8:   221845, // Amsterdam, Melanie Wellmann
	 35:  2824079, // Ankara, Luana Lindmeier
	 61:  2820768, // Antalya, Varg Berkes
	 58:  2508464, // Baku, Alev Serif
	  9:  2791141, // Barcelona, Alessandro Bruno
	 36:   284018, // Belgrade, Janne Kauppi
	  7:   511738, // Berlin, Sirpa Virjonen
	 33:  1286689, // Brussels, Nicolaas Burggraaf
	 46:   774751, // Bucharest, Ian Secker
	 42:   916214, // Budapest, Alessandra Zamperini
	 17:   115485, // Buenos Aires, José Luis Álvarez
	 60:  2985160, // Chicago, Amalthea l'Amoureux
	 22:   229197, // Copenhagen, Wes Toland
	 29:  2582045, // Dubrovnik, Hase vom Berg
	 27:  2912300, // Glasgow, Sophia Phillips
	 19:  1173622, // Helsinki, Einari Kyöttilä
	 30:  2823888, // Istanbul, Matthias Hake
	 47:  3009665, // Izmir, Samira Devil
	 55:  2366752, // Jakarta, Pekka Ruonela
	 51:  1846674, // Johannesburg, Patrik Paulsson
	 56:  2435050, // Kiev, Anatoliy Novikov
	  5:  1627451, // London, Simona Moro Visconti
	 14:   337811, // Los Angeles, Hartmut Hake
	 24:  2794668, // Madrid, Jerico Aldaya
	 54:  2265871, // Manila, Christian Munerati
	 10:  1963271, // Melbourne, Eva Lundhskär
	 32:   225203, // Mexico City, Atte Näränen
	 52:  1888162, // Milan, Enrica Marchetti
	 38:  2820595, // Montreal, Gaia O'Reilly
	 18:  1627383, // Moscow, Trevor Martin
	 11:  2828625, // Nashville, Gun Akins
	  6:  2579658, // New York, Mira Marshall
	 20:   176219, // Paris, Valéry Faye
	 31:  2063969, // Porto, Jozien van Maanen
	 25:   229458, // Rio de Janeiro, Achmed Witte
	 23:  2971287, // Rome, Britney Skye
	 21:   230771, // São Paulo, Achmed Witte
	 49:  2730339, // Sarajevo, Britney Skye
	 50:  2649052, // Seattle, Marloes Paalvast
	 45:   675717, // Shanghai, Mason Bolger
	 39:  2444409, // Singapore, Allan Brooks
	 53:  1962951, // Sofia, Pekka Ruonela
	  1:  2797038, // Stockholm, Greer Marshall
	 34:  2830242, // Tallinn, Lars-Erik Brennan
	 16:   229736, // Toronto, Pascaline Foulquier
	 26:   988565, // Tromsø, Alva Larsson
	 28:  1743451, // Vilnius, Patrik Paulsson
	 48:  2479092, // Warsaw, Blanka Trocha
	  0:        0  // filler data. Ignore this
};

// Checks for updated script on Userscripts website
function getOnlineRevision() {
	// Mark time for last check even before fiunction finishes or if it fails  
	var checktime = Math.round(new Date().getTime() / 1000);
	GM_log('checktime: ' + checktime)
	GM_setValue(VERSION_CHECKED_TIME, checktime);
	GM_xmlhttpRequest({
		method:'GET',
		url:UPDATE_CHECK_URL,
		onload: function(resp) {
			var text = resp.responseText;
			if (resp.readyState == 4 && resp.status == 200) {
				var tmp = text.match( /.*@version\s+(\d+)/i );
				if (tmp) {
					var online_ver = tmp[1];
					GM_log('Online version: ' + online_ver);
					if (online_ver > version) {
						GM_setValue(UPDATE_AVAILABLE, true);
						newVersionNotify();
					} else {
						GM_setValue(UPDATE_AVAILABLE, false);
					}
				}
			}
		},
		onerror: function(resp) {
			// should do something here perhaps
			GM_log("Update check response status: " + resp.status);
		}
	});
}
// Prints out a nice notification bar telling there's an upgrade to the script
function newVersionNotify() {
	var link = '<a id="script-upgrade" href="'+INSTALL_URL+'">'+MSG_UPGRADE+'</a>';
	var star = '<img src="graphics/Default/menu/separator2.gif" width="9" height="9" hspace="2" />';
	var noti = document.evaluate("//td[@class='Notifications']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

	if (noti && noti.snapshotItem(0)) {
		noti = noti.snapshotItem(0);
		noti.innerHTML = noti.innerHTML + link + ' ' + star;
	} else {
		var table = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
		var td = document.createElement('td');
		td.setAttribute('class', 'paper');
		td.height = 7;
		var tr = document.createElement('tr');
		tr.appendChild(td);
		table.appendChild(tr);

		noti = document.createElement('td');
		noti.setAttribute('class', 'Notifications');
		noti.setAttribute('colspan', '2');
		noti.align = 'center';
		noti.height = 20;
		noti.innerHTML = star + ' ' + link + ' ' + star;

		tr = document.createElement('tr');
		tr.appendChild(noti)
		table.appendChild(tr);

		document.getElementById('script-upgrade').addEventListener('click', function() {
			GM_setValue(UPDATE_AVAILABLE, false);
	 	}, false)
	}
}

if (location.href.indexOf(URLPART) > 0) {
	var doOnlineCheck = false;
	if (typeof(GM_getValue) != "undefined") { // opera fails this, so no update check...
		var lastcheck = GM_getValue(VERSION_CHECKED_TIME);
		if (!lastcheck) lastcheck = 0;
		var now = Math.round(new Date().getTime() / 1000) ;
		var diff = now - lastcheck;
		doOnlineCheck = (diff >= TIMEDIFF);
		GM_log('now: ' + now + ', last check: ' + lastcheck + '. diff: ' + diff + '. doOnlineCheck: ' + doOnlineCheck);
		if (doOnlineCheck) {
			getOnlineRevision();
		} else if (GM_getValue(UPDATE_AVAILABLE)) {
			newVersionNotify();
		}
	}

	// The main part of the script is here, this injects the link into the city menu
	var citylink = document.evaluate("//a[contains(@href, 'City.asp?action=online&CityID=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	if (citylink) {
		var city_id = citylink.snapshotItem(0).href.match( /CityID=(\d+)/ )[1];
		var tmp = document.evaluate("//div[contains(@id, 'Menu')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tmp) {
			var div  = tmp.snapshotItem(0).parentNode; // document.getElementById('div');
			if (div && HOSTELS[city_id]) {
				var star = div.getElementsByTagName('img')[0];

				var newdiv = document.createElement('div');
				newdiv.innerHTML = '<img src="graphics/Default/miscellaneous/Rivet.gif" alt="" width="8" height="8" hspace="5" /> '+
				'<a href="#" onclick="meny(\'MenuHostel\'); this.blur(); return false;">' +
				'<font color="#333333">'+MSG_YOUTH_HOSTEL+'</font></a><br />' +
				'<div class="DarkColumnHL" id="MenuHostel" style="display:none; padding-left:6px; padding-bottom:1px;">' +
				'<span style="float:right;"><a title="" href="Locale.asp?action=MoveHere&LocaleID='+HOSTELS[city_id]+'">Go to</a>&nbsp;</span>' +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				'<a href="Locale.asp?action=view&LocaleID='+HOSTELS[city_id]+'">'+MSG_SHOW_HOSTEL+'</a></div>';
				div.insertBefore( newdiv, star );
			}
		}
	}
}
