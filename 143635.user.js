// ==UserScript==
// @name           Popmundo Fıkra Evleri(Popmundo Joke Houses)
// @namespace      undefined
// @description    Provided by Eyüp Alemder - Coded by Lucifer de Jesús
// @include        http://www*.popmundo.com/Common/City.asp?action=view*
// @author         Lucifer de Jesús
// @version        1
// ==/UserScript==


var MSG_YOUTH_HOSTEL = 'Fıkra Evleri(Joke Houses)';
var MSG_SHOW_HOSTEL = 'Fıkra Evi(Joke House)';

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
				'<div class="Menu1" id="MenuHostel" style="display:none; padding-left:6px; padding-bottom:1px;">' +
				'<span style="float:right;"><a title="" href="Locale.asp?action=MoveHere&LocaleID='+HOSTELS[city_id]+'">Git</a>&nbsp;</span>' +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				'<a href="Locale.asp?action=view&LocaleID='+HOSTELS[city_id]+'">'+MSG_SHOW_HOSTEL+'</a></div>';
				div.insertBefore( newdiv, star );
			}
		}
	}
