// ==UserScript==
// @name           Grepolis - Diplomatietool
// @namespace      Grepolis - Diplomatietool
// @description    Markiert bliebige Allianzen und Spieler mit einer frei wählbaren farbe auf der Karte auf der Karte
// @include        http://*.grepolis.*/game*
// ==/UserScript==


$.cookie = function(c_name, c_value, c_options) {
	var r = false;
	
	if (typeof c_name != 'undefined') {
		if (typeof c_value == 'undefined') { // read
			cookies = document.cookie.split(';');
			
			for (i=0; i<cookies.length; i++) {
				cookies[i] = $.trim(cookies[i]);
				if (cookies[i].indexOf(c_name+'=') == 0) {
					r = decodeURIComponent(cookies[i].substr(c_name.length+1));
				}
			}
		} else {
			if (c_value != 'remove') { // write
				c_string = c_name + '=' + encodeURIComponent(c_value) + ';';
				
				if (typeof c_options != 'undefined') {
					if (typeof c_options.expires != 'undefined'){
						if (typeof c_options.expires == 'number') {
							c_date = new Date();
							c_date.setTime(c_date.getTime() + (c_options.expires * 24 * 60 * 60 * 1000));
							c_string += 'expires=' + c_date.toUTCString() + ';'
						} else if (typeof c_options.expires == 'object' && typeof c_options.expires.toUTCString == 'function') {
							c_string += 'expires=' + c_options.expires.toUTCString() + ';'
						}
					}
					
					if (typeof c_options.path != 'undefined')   c_string += 'path=' + c_options.path + ';';
					if (typeof c_options.domain != 'undefined') c_string += 'domain=' + c_options.domain + ';';
					if (typeof c_options.secure != 'undefined') c_string += 'secure=' + c_options.secure + ';';
				}
				
				document.cookie = c_string;
				r = true;
			} else { // remove
				$.cookie(c_name, '', {
					expires: 0
				});
				if (!$.cookie(c_name)) r = true;
			}
		}
	} else {
		r = document.cookie;
	}
	
	return r;
}

if ($.cookie('diplomacy')) {
	temp_diplomacy = $.parseJSON($.cookie('diplomacy'));

	alliances_cookie = '[';
	$(temp_diplomacy.alliances).each(function() {
		if ($.trim(this.name) != '') {
			if (alliances_cookie != '[') alliances_cookie += ",";
			alliances_cookie += '{"name":"'+this.name+'","color":"'+this.color+'"}';
		}
	});
	alliances_cookie += ']';
	if (alliances_cookie != '[]') {
		$.cookie('diplomacy_alliances', alliances_cookie, {
			expires: 365
		});
	}

	players_cookie = '[';
	$(temp_diplomacy.players).each(function() {
		if ($.trim(this.name) != '') {
			if (players_cookie != '[') players_cookie += ",";
			players_cookie += '{"name":"'+this.name+'","color":"'+this.color+'"}';
		}
	});
	players_cookie += ']';
	if (players_cookie != '[]') {
		$.cookie('diplomacy_players', players_cookie, {
			expires: 365
		});
	}
	
	$.cookie('diplomacy', 'remove');
}

world = (typeof Game.world == 'undefined') ? document.URL.match(/http:\/\/(de\d+).grepolis.com/)[1] : Game.world;

if (document.URL.indexOf("map?") >= 0) {
	old_ctd=MapTiles.createTownDiv;
	MapTiles.createTownDiv = function(town){
		r = old_ctd.apply( this, arguments );
		
		try{
			check_flag("flag_"+town.id);
		}finally{
			return r;
		}
	}
	