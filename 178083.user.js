// ==UserScript==
// @name        Mob Wars helper
// @namespace   http://lcn.kanoplay.com/kongregate/mob_wars/
// @description Helper for Mob Wars: La Cosa Nostra
// @include     http://lcn.kanoplay.com/kongregate/mob_wars/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
// @version     0.2.1.9e
// @grant		unsafeWindow
// ==/UserScript==

/* to do

SETTINGS FOR MWH
-> Social feed destruction settings,
-> offset for level

	0.2.2
	Widthdraw/Deposit All
	Full challenge manager logic 
		> update after playing
		> list check when there no played challenges

	Sometime :
	low - insert current city image somewhere
	item stockpile issue, linking to #
	boost cooldown 36 hours?
	remove gifting confirmation as an option
	quick pick tickets confirmation as an option
	use bank funds to buy properties as an option 
*/
//------------------------------------------- PROTOTYPE EXTENSIONS
Number.prototype.formatCash = function() {
	var a = this;
	var t = '';
	if (a >= 1000000000000000) 		{ a = a / 1000000000000000; t = ' quadrillion'; }
	else if (a >= 1000000000000) 	{ a = a / 1000000000000; t = ' trillion'; }
	else if (a >= 1000000000) 		{ a = a / 1000000000; t = ' billion'; }
	if ( t !== '' ) { return '$'+ a.toFixed(3) + t; }
	nStr = a; nStr += '';
	x = nStr.split('.');
	x1 = x[0]; x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ',' + '$2'); }
	return '$'+x1+ x2;
};

String.prototype.parseCash = function() {
    var t = this.trim().split(' ');
    var g = t[0].replace(/[^0-9.]/g,'');
    if ( typeof(t[1]) !== 'undefined' ) {
        if ( t[1].substring(0,2)  == "bi" ) { g = g * 1000000000; }
        if ( t[1].substring(0,2)  == "tr" ) { g = g * 1000000000000; }
        if ( t[1].substring(0,2)  == "qu" ) { g = g * 1000000000000000; }
    }
    return Math.ceil(g);
}

String.prototype.strToTime = function() {
    var timeM = [ 1 , 60 , 3600 , 86400];
    var total = 0;
    var bits = this.split(":");
    var n = 0;
    for ( var i = bits.length; i > 0 ; i-- ) {
        total += bits[i-1] * timeM[n];
        n++;
    }
    return total;
}

Number.prototype.timeToStr = function() {
    var d = Math.floor( this / 86400 ),
        h = Math.floor( (this - d * 86400) / 3600 ),
        m = Math.floor( (this - d * 86400 - h * 3600) / 60),
        s = this % 60;
    if (d > 0) { return d+':'+h.trailZero()+':'+m.trailZero()+':'+s.trailZero(); }
    if (h > 0) { return h+':'+m.trailZero()+':'+s.trailZero(); }
    return m+':'+s.trailZero();
}

Number.prototype.trailZero = function() {
    var a = this + "";
    return ( a.length == 1 ) ? '0'+ a : a;
}
//--------------------------------------------- GreaseMonkey MAIN SCRIPT
if ( navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1)  { 
	var qq = unsafeWindow.fb_params_GLOBAL;
	setTimeout( initScript, 1000 );
	var $$ = jQuery.noConflict();
} else { 
	alert( 'I\'m sorry, Mob Wars Helper is only supported for Firefox and Chrome'); 
}

function initScript() {
//------------------------------------------- VARIABLES
	window.globals = { 
		loc : [ 'New York', 'Chicago', 'London', 'Las Vegas', 'Moscow', 'Dubai', 'Shanghai', 'Tokyo', 'Tijuana', 'Medellin', 'Johannesburg', 'Bangkok', 'Rio de Janeiro', 'San Fracisco', 'Palermo', 'Miami', 'Sydney', 'Havana', 'Paris', 'Dublin', 'Prague', 'Berlin', 'Madrid', 'Venice', 'Tangler' ],
		stats : [ 'cash', 'health', 'energy', 'stamina'],
		ach_check : function(d) {
			if ( $$(d).find('.achievement-box').length > 0 ) {
				$$('body').append( '<div id="modal_achievement_content">'+ $$(d).find('.achievement-box').parent().parent().html() + '</div>' );
				$$('#modal_achievement_content').prepend('<div class="modal_close_inner" style="margin:7px 7px 0 0" onclick="closeModal(&quot;modal_achievement_modal&quot;);return false;"><div class="inlineblock"><a href="#" onclick="closeModal(&quot;modal_achievement_modal&quot;);return false;" class="bold">Close</a></div><div class="inlineblock modal_close_x">&nbsp;</div></div>');
				$$('#modal_achievement_content').attr('class', 'modal-window default-modal').attr('style','top: 218px; left: 73px; display: block;');
			}
		},
		fixCounter : function(i) {
			$$('#'+i+'-counter')
				.css({'position':'absolute','margin':'-8px 0 0 -8px','width':'32px','height':'12px', 'line-height':'12px', 'font-size':'8px', 'text-align':'left'})
				.insertAfter('#'+i+'_menu_value');
		}
	};

	window.player = {
		level : 0,
		cash : 0,
		bank : 0,
		boosts : [],
		setCash : function(m,c) { 
			m = typeof m !== 'undefined' ? m : '+';
			c = typeof c !== 'undefined' ? c : 0;
			c = parseInt(c);
			if ( m == '+' ) this.cash += c;
			if ( m == '-' ) this.cash -= c;
			if ( m == '=' ) this.cash = c;
			this.printCash();
		},
		printCash : function() {
			$$('#cash_menu_value').text( this.cash.formatCash() ); 
		},
		checkBoosts : function() {
			$$('.mwh_boost').remove();
			mwh_ajax({'url':'alliances/boosts', 'onComplete':'player.updateBoosts'});
		},
		updateBoosts : function(d,o) {
			var stats = ['energy','stamina'];
			$$('#energy_boosts_countdown').remove();
			$$('#stamina_boosts_countdown').remove();
			$$.each( $$(d).find('.boosts-container'), function(i,v) { 
				$$('#'+stats[i]+'_boosts_countdown').remove();
				if ( $$(v).find('#'+stats[i]+'_boosts_countdown').length > 0 ) {
					$$(v).find('#'+stats[i]+'_boosts_countdown')
					.css({'position':'absolute','margin':'11px 0 0 -8px','height':'12px', 'line-height':'12px', 'font-size':'8px', 'text-align':'left', 'font-weight':'normal'})
					.insertAfter('#'+stats[i]+'_menu_value');
				} else {
					var b = $$(v).find('.user-button.sub-button').last();
					if ( b.text() == 'Use' ) { player.createBoost(stats[i],b.attr('onclick')); }
					else { 
						$$('<span id="'+stats[i]+'_boosts_countdown" class="red bold x-small">0 boosts!</span>')
							.css({'position':'absolute','margin':'11px 0 0 -8px','height':'12px', 'line-height':'12px', 'font-size':'8px', 'text-align':'left', 'font-weight':'normal'})
							.insertAfter('#'+stats[i]+'_menu_value');
					}
				}
			});
		},
		createBoost : function(d,c) {
			$$('#'+d+'_boosts_countdown').remove();
			$$('<a href="#" class="mwh_boost" onclick="'+c+'"><span class="boost-icon"></span></a>').insertBefore('#modal_refill_'+d+'');
		}
	};

	window.mng_properties = {
		elemId : 'mwh_mng_p',
		list_size : 3,
		lvl_offset : 5,
		properties : [
			{ id: 100, name: "Villa", levelReq: 2, income: 300, bCost: 10000, roi: 33 },
			{ id: 101, name: "Restaurant", levelReq: 2, income: 700, bCost: 30000, roi: 43 },
			{ id: 102, name: "Apartment", levelReq: 5, income: 5000, bCost: 200000, roi: 40 },
			{ id: 103, name: "Hotel", levelReq: 10, income: 10000, bCost: 400000, roi: 40 },
			{ id: 104, name: "Highrise Apartment", levelReq: 15, income: 50000, bCost: 5000000, roi: 100 },
			{ id: 105, name: "Office", levelReq: 20, income: 150000, bCost: 16000000, roi: 107 },
			{ id: 200, name: "Indie Theatre", levelReq: 25, income: 60000, bCost: 30000000, roi: 500 },
			{ id: 201, name: "Small Hotel", levelReq: 25, income: 300000, bCost: 150000000, roi: 500 },
			{ id: 202, name: "Steel Mill", levelReq: 30, income: 400000, bCost: 200000000, roi: 500 },
			{ id: 203, name: "Banking Center", levelReq: 35, income: 600000, bCost: 300000000, roi: 500 },
			{ id: 204, name: "Downtown Casino", levelReq: 40, income: 800000, bCost: 400000000, roi: 500 },
			{ id: 205, name: "Residential Highrise", levelReq: 45, income: 1000000, bCost: 500000000, roi: 500 },
			{ id: 300, name: "Row House", levelReq: 50, income: 71000, bCost: 50000000, roi: 704 },
			{ id: 301, name: "Warehouse", levelReq: 50, income: 107000, bCost: 75000000, roi: 701 },
			{ id: 302, name: "Theatre Hall", levelReq: 55, income: 241000, bCost: 168750000, roi: 700 },
			{ id: 303, name: "Investment Bank", levelReq: 60, income: 482000, bCost: 337500000, roi: 700 },
			{ id: 304, name: "Shipping Facility", levelReq: 65, income: 964000, bCost: 675000000, roi: 700 },
			{ id: 305, name: "Football Stadium", levelReq: 70, income: 1928000, bCost: 1350000000, roi: 700 },
			{ id: 400, name: "Treatment Plant", levelReq: 75, income: 200000, bCost: 200000000, roi: 1000 },
			{ id: 401, name: "Resort Center", levelReq: 75, income: 360000, bCost: 360000000, roi: 1000 },
			{ id: 402, name: "Pool Complex", levelReq: 80, income: 648000, bCost: 648000000, roi: 1000 },
			{ id: 403, name: "Tropics Casino", levelReq: 85, income: 897000, bCost: 1166400000, roi: 1300 },
			{ id: 404, name: "Mega Hotel", levelReq: 90, income: 1615000, bCost: 2099520000, roi: 1300 },
			{ id: 405, name: "Super Mall", levelReq: 95, income: 2907000, bCost: 3779136000, roi: 10 },
			{ id: 500, name: "Boutique Hotel", levelReq: 100, income: 120000, bCost: 180000000, roi: 0 },
			{ id: 501, name: "Themed Casino", levelReq: 100, income: 192000, bCost: 288000000, roi: 0 },
			{ id: 502, name: "Historic Museum", levelReq: 110, income: 491000, bCost: 737280000, roi: 0 },
			{ id: 503, name: "Palace", levelReq: 120, income: 786000, bCost: 1179648000, roi: 0 },
			{ id: 504, name: "Designer Mall", levelReq: 130, income: 1258000, bCost: 1887436000, roi: 0 },
			{ id: 505, name: "Historic Office", levelReq: 140, income: 2013000, bCost: 3019898000, roi: 0 },
			{ id: 600, name: "Industrial Facility", levelReq: 150, income: 66000, bCost: 100000000, roi: 0 },
			{ id: 601, name: "Residence Hotel", levelReq: 150, income: 100000, bCost: 150000000, roi: 0 },
			{ id: 602, name: "Tennis Center", levelReq: 160, income: 266000, bCost: 400000000, roi: 0 },
			{ id: 603, name: "Resort Complex", levelReq: 170, income: 500000, bCost: 750000000, roi: 0 },
			{ id: 604, name: "Oil Well", levelReq: 180, income: 555000, bCost: 1000000000, roi: 0 },
			{ id: 605, name: "Office Complex", levelReq: 190, income: 1388000, bCost: 2500000000, roi: 0 },
			{ id: 700, name: "Historic Restaurant", levelReq: 200, income: 40000, bCost: 80000000, roi: 0 },
			{ id: 702, name: "Manufacturing Plant", levelReq: 200, income: 76000, bCost: 152000000, roi: 0 },
			{ id: 703, name: "Night Club", levelReq: 210, income: 144000, bCost: 288800000, roi: 0 },
			{ id: 704, name: "Shopping Duplex", levelReq: 220, income: 500000, bCost: 1000000000, roi: 0 },
			{ id: 705, name: "Megacasino", levelReq: 230, income: 1250000, bCost: 2500000000, roi: 0 },
			{ id: 706, name: "Office Megaplex", levelReq: 240, income: 6250000, bCost: 12500000000, roi: 0 },
			{ id: 800, name: "Small Restaurant", levelReq: 250, income: 107000, bCost: 300000000, roi: 0 },
			{ id: 801, name: "Exclusive Nightclub", levelReq: 250, income: 225000, bCost: 630000000, roi: 0 },
			{ id: 802, name: "Office Highrise", levelReq: 260, income: 3214000, bCost: 9000000000, roi: 0 },
			{ id: 803, name: "Industrial Megafacility", levelReq: 270, income: 6750000, bCost: 18900000000, roi: 0 },
			{ id: 804, name: "Condo Superplex", levelReq: 280, income: 14175000, bCost: 39690000000, roi: 0 },
			{ id: 805, name: "Office Megacenter", levelReq: 290, income: 29767000, bCost: 83349000000, roi: 0 },
			{ id: 900, name: "Border House", levelReq: 300, income: 32000000, bCost: 100000000000, roi: 0 },
			{ id: 901, name: "Brothel", levelReq: 325, income: 32000000, bCost: 125000000000, roi: 0 },
			{ id: 902, name: "Drug Lab", levelReq: 350, income: 32000000, bCost: 150000000000, roi: 0 },
			{ id: 903, name: "Cattle Ranch", levelReq: 375, income: 32000000, bCost: 157000000000, roi: 0 },
			{ id: 1000, name: "Private Airship", levelReq: 400, income: 35000000, bCost: 200000000000, roi: 0 },
			{ id: 1001, name: "Firing Range", levelReq: 425, income: 35000000, bCost: 205000000000, roi: 0 },
			{ id: 1002, name: "Gondola", levelReq: 450, income: 35000000, bCost: 210000000000, roi: 0 },
			{ id: 1003, name: "Gourmet Restaurant", levelReq: 475, income: 35000000, bCost: 220000000000, roi: 0 },
			{ id: 1100, name: "Auto Junkyard", levelReq: 500, income: 35500000, bCost: 230000000000, roi: 0 },
			{ id: 1101, name: "Nuclear Power Plant",	levelReq: 550, income: 35500000, bCost: 235000000000, roi: 0 },
			{ id: 1102, name: "Armory", levelReq: 600, income: 35500000, bCost: 245000000000, roi: 0 },
			{ id: 1103, name: "Incinerator", levelReq: 675, income: 35500000, bCost: 255000000000, roi: 0 },

			{ id: 1200, name: "Patpong Bar", levelReq: 750, income: 36500000, bCost: 260000000000, roi: 0 },
			{ id: 1201, name: "Spa", levelReq: 750, income: 36500000, bCost: 270000000000, roi: 0 },
			{ id: 1202, name: "Garment Factory", levelReq: 750, income: 36500000, bCost: 280000000000, roi: 0 },
			{ id: 1203, name: "Fighting Ring", levelReq: 750, income: 36500000, bCost: 290000000000, roi: 0 },
			
			{ id: 1300, name: "Poppy Plantation", levelReq: 1000, income: 37000000, bCost: 300000000000, roi: 0 },
			{ id: 1301, name: "Soccer Stadium", levelReq: 1000, income: 37000000, bCost: 325000000000, roi: 0 },
			{ id: 1302, name: "Luxury Car Shop", levelReq: 1000, income: 37000000, bCost: 350000000000, roi: 0 },
			{ id: 1303, name: "Bunker", levelReq: 1000, income: 37000000, bCost: 375000000000, roi: 0 },
			
			{ id: 1400, name: "Dive Peeler Bar", levelReq: 1100, income: 37500000, bCost: 400000000000, roi: 0 },
			{ id: 1401, name: "Hacker Facility", levelReq: 1100, income: 37500000, bCost: 425000000000, roi: 0 },
			{ id: 1402, name: "Dockyard", levelReq: 1100, income: 37500000, bCost: 450000000000, roi: 0 },
			{ id: 1403, name: "Pool Hall", levelReq: 1100, income: 37500000, bCost: 475000000000, roi: 0 },
			
			{ id: 1500, name: "Teatro Massimo Opera House", levelReq: 1300, income: 38000000, bCost: 500000000000, roi: 0 }, // levels OK
			{ id: 1501, name: "Radioactive Waste Facility", levelReq: 1350, income: 40000000, bCost: 525000000000, roi: 0 },
			{ id: 1502, name: "Cigar Club", levelReq: 1400, income: 42000000, bCost: 550000000000, roi: 0 },
			{ id: 1503, name: "Palermo Villa", levelReq: 1450, income: 44000000, bCost: 575000000000, roi: 0 },
			
			{ id: 1600, name: "Yacht Club", levelReq: 1500, income: 45000000, bCost: 600000000000, roi: 0 },
			{ id: 1601, name: "Beachfront Condo", levelReq: 1500, income: 50000000, bCost: 650000000000, roi: 0 },
			{ id: 1602, name: "Rooftop Bar", levelReq: 1500, income: 53000000, bCost: 700000000000, roi: 0 }, // IDs ok up to miami
			
			{ id: 1700, name: "Harbor Bridge", levelReq: 1720, income: 56000000, bCost: 750000000000, roi: 0 },
			{ id: 1701, name: "Rugby Pitch", levelReq: 1720, income: 59000000, bCost: 800000000000, roi: 0 },
			{ id: 1702, name: "Beachside Bar", levelReq: 1720, income: 62000000, bCost: 850000000000, roi: 0 },
			
			{ id: 1800, name: "Tobacco Field", levelReq: 2120, income: 65000000, bCost: 900000000000, roi: 0 },
			{ id: 1801, name: "Offshore Rig", levelReq: 2120, income: 68000000, bCost: 950000000000, roi: 0 },
			{ id: 1802, name: "Prison", levelReq: 2120, income: 72000000, bCost: 1000000000000, roi: 0 },
			{ id: 1804, name: "Barber Shop", levelReq: 2120, income: 75000000, bCost: 1050000000000, roi: 0 },
			
			{ id: 1900, name: "Discotheque", levelReq: 2520, income: 79000000, bCost: 1100000000000, roi: 0 },
			{ id: 1901, name: "Parisian Cafe", levelReq: 2520, income: 83000000, bCost: 1150000000000, roi: 0 },
			{ id: 1902, name: "Wine Cellar", levelReq: 2520, income: 87000000, bCost: 1200000000000, roi: 0 },
			
			{ id: 2000, name: "Cathedral", levelReq: 2970, income: 92000000, bCost: 1250000000000, roi: 0 },
			{ id: 2001, name: "Pub", levelReq: 2970, income: 96000000, bCost: 1300000000000, roi: 0 },
			{ id: 2002, name: "Horse Stable", levelReq: 2970, income: 100000000, bCost: 1350000000000, roi: 0 },
			
			{ id: 2100, name: "Challet", levelReq: 3470, income: 104000000, bCost: 1400000000000, roi: 0 },
			{ id: 2101, name: "High Tech Lab", levelReq: 3470, income: 108000000, bCost: 1450000000000, roi: 0 },
			{ id: 2102, name: "Scrap Yard", levelReq: 3470, income: 112000000, bCost: 1500000000000, roi: 0 },
			
			{ id: 2200, name: "Abandoned Bunker", levelReq: 3970, income: 120000000, bCost: 1600000000000, roi: 0 },
			{ id: 2201, name: "Missile Silo", levelReq: 3970, income: 128000000, bCost: 1700000000000, roi: 0 },
			{ id: 2202, name: "Raceway", levelReq: 3970, income: 136000000, bCost: 1800000000000, roi: 0 },
			{ id: 2203, name: "Radio Tower", levelReq: 3970, income: 144000000, bCost: 1900000000000, roi: 0 },
			
			{ id: 2300, name: "Bullring", levelReq: 4470, income: 155000000, bCost: 2000000000000, roi: 0 },
			{ id: 2301, name: "Megaclub", levelReq: 4470, income: 170000000, bCost: 2200000000000, roi: 0 },
			{ id: 2302, name: "Office Tower", levelReq: 4470, income: 185000000, bCost: 2400000000000, roi: 0 },
			{ id: 2303, name: "Skateboard Park", levelReq: 4470, income: 200000000, bCost: 2600000000000, roi: 0 },
			
			{ id: 2400, name: "Observatory", levelReq: 4970, income: 250000000, bCost: 3000000000000, roi: 0 },
			{ id: 2401, name: "University", levelReq: 4970, income: 320000000, bCost: 4000000000000, roi: 0 },
			{ id: 2402, name: "Venetian Plaza", levelReq: 4970, income: 390000000, bCost: 5000000000000, roi: 0 },
			
			{ id: 2500, name: "Oasis Pool", levelReq: 5470, income: 550000000, bCost: 6000000000000, roi: 0 },
			{ id: 2501, name: "Souk", levelReq: 5470, income: 700000000, bCost: 7000000000000, roi: 0 },
			{ id: 2502, name: "Desert Fortress", levelReq: 5470, income: 800000000, bCost: 8000000000000, roi: 0 }
		],
		getProp : function(f,v) {
			var i = this.properties.length; 
			while (i--) { if ( this.properties[i][f] == v ) { return this.properties[i]; } }
			return 0;
		},
		init : function(c) {
			$$('<div id="'+this.elemId+'" class="mwh_mng_container"></div>').appendTo(c);
			$$('<div class="mwh_mng_header">Property Management</div>').appendTo('#'+this.elemId);
			$$('<div><table class="mwh_mng_content" style="width:100%"></table></div>').appendTo('#'+this.elemId);
			$$('<select id="mwh_mng_p_size"><option value="1">1</option><option value="3" selected="selected">3</option><option value="5">5</option><option value="10">10</option><option value="15">15</option></select>')
				.css({'float':'right'}).appendTo('#'+this.elemId+' .mwh_mng_header');
			$$('<span>Your income: <span id="mhw_profit" class="green" style="font-size:11px;">?</span></span>')
				.css({'margin':'0 0 0 80px', 'font-size':'10px'}).appendTo('#'+this.elemId+' .mwh_mng_header');		
			$$('#'+this.elemId+' table').before('<span id="mwh_mng_p_progress" style="font-size:11px; font-weight:bold;">Reading properties...</span>');
			var i = this.properties.length; 
			while (i--) { var p = this.properties[i]; p.roi = Math.round( p.bCost / p.income ); p.cost = p.bCost; }
			mwh_ajax({'url':'profile/reload_content_block', 'data': { 'ajax':1, 'type': 'land' }, 'onComplete':'mng_properties.setProperties', });
			mng_properties.updateIncome( '$'+$$('#profit_menu_value').children().attr('title') );
		},
		progress : function(a){ $$('#mwh_mng_p_progress').html(a); },
		setProperties : function(d,o) {
			var l = $$(d).find('.profile-land');
			var i = l.length;
			while (i--) {
				var n = $$(l[i]).find('img').attr('title');
				var o = $$(l[i]).find('.rounded').text().substring(2);
				var prop = this.getProp('name',n);
				prop.owned = parseInt(o);
				prop.cost = Math.ceil( prop.bCost + ( prop.bCost / 10 * prop.owned ));
				prop.roi = Math.round( prop.cost / prop.income );
			}
			this.progress('');
			this.printTable( this.list_size );
		},
		help_plea : true,
		printTable : function(size) {
			if (this.help_plea) {
				if (player.level*1 > 750) {
					alert('The property data for higher than level 750 players is incomplete\nWe\'re missing the required levels for the city properties!\nIf you can, please help out with that :)'); 
					this.help_plea = false;
				}
			}
			var t = $$('#'+this.elemId+' .mwh_mng_content'); t.html('');
			if (size === 0) return 0;
			var list = this.properties;
			list.sort( function(a,b) {  
				var roi = a.roi - b.roi;
				if (roi) return roi;
				var cost = a.cost - b.cost;
				return cost; 
			});
			var i = 0,
				r = player.level + this.lvl_offset;
			while ( size ) {
				if ( typeof list[i] !== 'undefined' ) {
					if ( list[i].levelReq <= r ) {
						t.append( this.printLine( list[i] ) ); size--;
					}
				} else { size = 0; }
				i++;
			}
		},
		printLine : function(it) {
			var r = '', s ='', l = '';
			if ( it.levelReq > player.level ) {
				s = 'color:#999;';
				l = ', level '+it.levelReq;
			}
			if ( it.cost * 10 <= (player.cash + player.bank) && it.levelReq <= player.level ) { r += '<td><a href="#" class="mwh_mng_p_buy" id="'+it.id+'"><span class="cash-icon"></span></a></td>'; }
			else if ( it.levelReq > player.level ) { r += '<td></td>'; }
			else { r += '<td><span class="stamina-icon"></span></td>'; }
			r += '<td style="'+s+'">Index: ' + it.roi + '</td>';
			r += '<td style="text-align:left; '+s+'">Cost: ' + (it.cost*10).formatCash() + '</td>';
			r += '<td style="'+s+'">' + it.name + ' (' + globals.loc[ Math.floor( it.id/100 ) - 1 ] + l +')</td>';
			return '<tr>'+r+'</tr>';
		},
		buyProperty : function(d,id) {
			this.printTable(0);
			this.progress('Buying property... Please wait...');
			var p = this.getProp('id',id);
			if ( p.cost * 10 <= player.cash ) { 
				mwh_ajax( { 'url' : 'land/buy/'+ id, 'data': { 'ajax':1, 'id': id ,'quantity':'10' }, 'onComplete':'mng_properties.updateProperty' } );
				b = $$(d).find('.green.xx-large');
				if ( b.length > 0 ) {
					player.bank = $$(b).text().parseCash();
					$$('#hoard_menu_value span').attr('title', player.bank );
				}
			} else {
				var a = p.cost * 10 - player.cash;
				player.setCash("+",a);
				mwh_ajax({ 'url': 'hoard/withdraw/', 'data': { 'amount': a }, 'onComplete':'mng_properties.buyProperty', 'params': id } );
			}
		},
		updateProperty : function(d,o) {
			if ($$(d).find('.app-response-message.app-response-true').length > 0 ) {
				var id = $$(d).find('form').attr('id').split("_")[2];
				var p = this.getProp('id',id);
				player.setCash('-',p.cost*10);
				player.printCash();
				p.owned += 10;
				p.cost = Math.ceil( p.bCost + ( p.bCost / 10 * p.owned ));
				p.roi = Math.round( p.cost / p.income );
				globals.ach_check(d);
				this.updateIncome ( $$(d).find('#empire_cashflow_value').text().substring(2) );
				alert( p.name+' bought, current cost - '+p.cost+', current owned - '+p.owned+', roi -'+p.roi );
			}
			this.progress('');
			this.printTable( this.list_size );
		},
		updateIncome : function(v) {
			$$('#mhw_profit').html( v.parseCash().formatCash() );
		}
	}

	window.mng_challenges = {
		elemId : 'mwh_mng_c',
		init : function(c) {
			$$('<div id="'+this.elemId+'" class="mwh_mng_container"></div>').appendTo(c);
			$$('<div class="mwh_mng_header">Challenge Management</div>').appendTo('#'+this.elemId);
			$$('<div><table class="mwh_mng_content" style="width:100%"></table></div>').appendTo('#'+this.elemId);
			$$('#'+this.elemId+' table').before('<span id="mwh_mng_c_progress" style="font-size:11px; font-weight:bold;">Checking challenges...</span>')
			mwh_ajax({'url':'minigame/game_list', 'onComplete':'mng_challenges.getChallenges'});
		},
		progress : function(a) { $$('#mwh_mng_c_progress').html(a); },
		getChallenges : function(d,o) {
			var t = $$('#'+this.elemId+' .mwh_mng_content');
			t.html('');
			$$.each( $$(d).find('.mini-quest-title').parent().parent(), function( i, v ) {
				if ( typeof $$(v).find('.mini-quest-reqs').find('.lightgrey').children().attr('class') !== 'undefined' ) {
					t.append('<tr id="'+$$(v).find('a').attr('id')+'"><td colspan="5">'+ $$(v).find('.mini-quest-title').text().split(':')[0] +', loading info...</td></tr>');
					mwh_ajax({
						'url' : 'minigame/play/'+$$(v).find('a').attr('id').split("_")[1],
						'onComplete':'mng_challenges.updateChallenge',
						'params': {
							'minigameId' : $$(v).find('a').attr('id').split("_")[1],
							'type': $$(v).find('.mini-quest-reqs').find('.lightgrey').children().attr('class').split("-")[0],
							'progress' : $$(v).find('.kills-icon').text().split(" ")[0]
						}
					});
				}
			});
			this.progress('');
		},
		updateChallenge : function(d,o) {
			var mgName = $$('#minigame_'+o.minigameId).text().split(',')[0];
			var mgBonusBullet = $$(d).find('#bullet_countdown').text();
			var mgRemaining = $$(d).find('#minigame_countdown').text();
			o.type = o.type.trim();
			var id = o.minigameId;
			var Bullets = $$(d).find('.'+o.type+'-shot-clip').length;
			$$('#minigame_'+id).html(
				'<td style="text-align:center"><span class="red bold small">'+mgBonusBullet.strToTime().timeToStr()+'</span></td>'
				+'<td><span class="'+o.type+'-icon bold">x '+Bullets+'</span></td>'
				+'<td style="font-size:12px;"><a href="#" onclick="return ajax({page:\'minigame/play/'+id+'\',top:0});">'+mgName+'</a></td>'
				+'<td><span class="kills-icon" title="Progress left...">'+o.progress+'</span></td>'
				+'<td><span class="time-icon" title="Time remaining...">'+mgRemaining.strToTime().timeToStr()+'</span><td>'
			).css('height','16px').addClass(o.type);
		}
	}

	window.mng_timers = {
		init : function() {
			var period = setInterval( this.cycle, 1000 );
			var refreshWindow = setInterval( this.updateWindow, 500 );
		},
		cycle : function() {
			$$.each( $$('#mwh_mng_c table tr'), function(i,v) { mng_timers.updateChallenge(v); });
			$$.each(['energy','stamina'], function(i,v) { mng_timers.updateBoost(v); });
		},
		updateBoost : function(v) {
			var txt = $$('#'+v+'_boosts_countdown').text();
			if ( txt == '0 boosts!' || txt == 'Refreshing' ) return 0;
			var t = $$('#'+v+'_boosts_countdown').text().strToTime() - 1;
			if (t == 0)	{ $$('#'+v+'_boosts_countdown').text( 'Refreshing' ); player.checkBoosts(); }
			else		{ $$('#'+v+'_boosts_countdown').text( t.timeToStr() ); }
		},
		updateChallenge : function(v) {
			var time1 = $$(v).find('.red').text().strToTime() - 1;
			if (time1 == 0) {
				mwh_ajax({
					'url' : 'minigame/play/'+$$(v).attr('id').split("_")[1],
					'onComplete':'mng_challenges.updateChallenge',
					'params': {
						'minigameId' : $$(v).attr('id').split("_")[1],
						'type': $$(v).attr('class'),
						'progress' : $$(v).find('.kills-icon').text()
					}
				});
				$$(v).html('<td colspan="5">'+ $$(v).find('a').text()+', loading info...</td>');
			}	
			$$(v).find('.red').text( time1.timeToStr() );
			var time2 = $$(v).find('.time-icon').text().strToTime() - 1;    
			$$(v).find('.time-icon').text( time2.timeToStr() );
		},
		updateWindow : function() {
			player.setCash('=',$$('#cash_menu_value').text().parseCash());
			if ( typeof $$('#hoard_menu_value span').attr('title') !== 'undefined' ) {
				player.bank = $$('#hoard_menu_value span').attr('title').parseCash();
			}
			$$('#hoard_menu_value span').text( player.bank.formatCash() );
			player.level = parseInt($$('#hdr_level').text());
			$$.each(globals.stats, function(i,v) { 
				var t = $$('#'+v+'_menu_value').text().trim().split("/");
				if (parseInt(t[0]) >= t[1]) { $$('#'+v+'-counter').text('FULL'); }
			});
			if ( $$('#mwh_mng_p_progress').text() == '' ) { mng_properties.printTable( mng_properties.list_size ); }
		}
	}
//------------------------------------------- FUNCTIONS
	function mwh_ajax( opt ) {
		if (typeof(opt.data) === 'undefined') { opt.data = { }; }
		opt.data.ajax = 1;
		$$.ajax({ 
			url: 'http://lcn.kanoplay.com/kongregate/mob_wars/'+opt.url,
			type: 'POST',
			data: qq + '&' + jQuery.param( opt.data ),
			success: function(data) {
				if ( typeof opt.params === 'undefined' ) { opt.params = {}; }
				if ( typeof window[opt.onComplete.split('.')[0]][opt.onComplete.split('.')[1]] === 'function' ) { window[opt.onComplete.split('.')[0]][opt.onComplete.split('.')[1]]($$.parseHTML(data), opt.params); }
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (errorThrown != "abort") {
					alert("Things went south.\n"+jqXHR+"\n"+textStatus+"\n"+errorThrown);
				}
			}
		});
	}

//------------------------------------------- EVENT BINDERS
	$$(document).on('change','#mwh_mng_p_size', function() { mng_properties.list_size = $$(this).val(); });
	$$(document).on('click','.mwh_mng_p_buy', function() { mng_properties.buyProperty( '', $$(this).attr('id') ) });
	$$(document).on('mouseenter','.land-outer a', function() { $$(this).removeAttr('onclick'); });
	$$(document).on('click','.land-outer a', function(e) { e.preventDefault(); alert('The ability to Buy/Sell properties is removed. Use the Property Manager.'); });
	$$(document).on('click','#mwh_outer .control', function(){
		if ($$(this).hasClass('offer-item-carousel-control-l')) 	{ 
			$$('#mwh_outer').animate({ right : '-10px'}, 500); 
			$$(this).removeClass('offer-item-carousel-control-l').addClass('offer-item-carousel-control-r');
		} else {
			$$('#mwh_outer').animate({ right : '-125px' }, 500); 
			$$(this).removeClass('offer-item-carousel-control-r').addClass('offer-item-carousel-control-l');
		}
	});
	$$(document).on('DOMSubtreeModified','#profit_menu_value', function() { mng_properties.updateIncome( '$'+$$(this).children().attr('title') ); });
	$$(document).on('mouseenter','.quest-box',function() {
		var req = $$(this).find('.quest-required');
		if ( req.find('.mwh_info').length == 0 && $$(this).find('.quest-body.locked').length == 0) {
			var rew = $$(this).find('.quest-reward');
			var en = req.find('.energy-icon').text().trim().split(" ")[0];
			var xp = (rew.find('.exp-icon').text().trim().split(" ")[0] / en).toFixed(3);
			var c = Math.ceil(rew.find('.cash-icon').text().trim().parseCash() / en).formatCash();
			req.append('<div style="float:left; clear:left;" class="mwh_info"><p class="small quest-heading bold">Reward ratios:</p><p class="cash-icon small quest-value">'+c+'+</p><p class="exp-icon small quest-value">'+xp+'</p></div');
		}
	});
	$$(document).on('click','.mwh_boost',function() { player.checkBoosts() }); 
	$$(document).on('click','.sub-button',function() { 
		if ( $$(this).text() == 'Accept Stamina Boost' || $$(this).text() == 'Accept Energy Boost' || $$(this).text() == 'Use' || $$(this).text() == 'Accept All Boosts' ) { player.checkBoosts() }
	}); 
	$$(document).on('DOMSubtreeModified','#home_panel_content', function() { 
		var safe = [
			'Assist Job Now!',
			'Send Gift Now!',
			'Get Adrenaline Boost!',
			'Join Elite Mobsters!',
			'Attack Boss Now!',
			'Assist Challenge Now!',
			'Join this Syndicate!'
		];
		var f = $$(this).find('.feed-div'); var i = f.length;
		while (i--) {
			var a = $$(f[i]).find('.feed-action-links');
			if ( $$(a).find('a').length == 2 ) {
				if ( safe.indexOf($$(a).find('a').last().text()) == -1 ) { $$(f[i]).hide(); }
			} else { $$(f[i]).hide(); }
		}
	});
//------------------------------------------- HACKS AND FIXES ><
	$$(document).on('DOMAttrModified','#oneclick_heal_header', function() { $$(this).css({'font-style':'normal'}); });
	$$(document).on('DOMSubtreeModified','#cash_menu_value', function() { globals.fixCounter('cash'); $$('p.morein').remove(); });
//------------------------------------------- START THE MAGIC!
// Hide the initial header elements
	$$('body').css({'overflow':'hidden'});
    $$('body table:first tr:first').hide();
	$$('.outer-links').hide();	
	$$('.top-bar').hide();	
	$$('#headerDiv').hide();
// Create new header elements by moving initial ones, and fixing styles	
    $$('.bottom-bar').hide().after('<div id="mwh_header" style="background:url(http://wac.411C.edgecastcdn.net/00411C/mob_wars/background.jpg) no-repeat scroll left top;">'
                                + '<div style="position:relative">'
									+ '<div id="mwh_header_profile" style="float:left; position:relative; padding:16px 20px; width:151px; height:190px; background:url(' + $$('#header_profile_pic img').attr('src') + ');"></div>'
									+ '<div id="mwh_main" class="rounded default-box" style="box-shadow: 0 0 3px 2px #000; float:right; position:relative; margin:9px 20px 10px 0px; padding:5px 10px 40px 10px; width:525px; min-height:157px;"></div>'
									+ '<div id="mwh_outer" class="rounded default-box" style="box-shadow: 0 0 3px 2px #000; height:180px; width:130px; position:absolute; top:20px; right:-125px; z-index:2000">'
										+'<a class="offer-item-carousel-control-l buttons control" style="display:block; position:absolute; top:75px; left:-10px; margin:0px;" href="#"></a>'
									+'</div>'
								+ '</div>'
                                + '<div id="mwh_header_info" style="padding:0 14px; margin-bottom:5px; clear:both"></div>'
                            + '</div>');
	$$('#header_profile_pic').next().css({'float':'right'}).appendTo('#mwh_header_profile');
	$$('#mwh_header_profile a:first').css({'color':'white','font-weight':'bold'});
	$$('#exp_bar').appendTo('#mwh_header_profile').css({ 'position':'absolute', 'bottom':'15px', 'left':'14px', 'width':'162px'});
	$$('#hdr_level').parent().appendTo('#mwh_header_profile').css({ 'position':'absolute', 'bottom':'32px', 'left':'9px', 'padding':'2px 6px', 'width':'150px', 'background':'rgba(0,0,0,0.6)'});
	$$('#hdr_alliance_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('#hdr_message_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('#hdr_faction_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('#hdr_skills_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('#hdr_gamerpoints_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('#hdr_rivals_alert').appendTo('#mwh_header_profile').css('font-weight', 'bold');
	$$('.header-attribute-menu.haslayout').css({ 'height':'auto','background':'none' }).appendTo('#mwh_header_info');
	$$('.header-attribute-menu.haslayout td').css({'vertical-align':'middle','position':'relative'});
	
	$$('#cash-reload').after('<div id="mwh_bank"><a id="cash_header_bank_link" href="#"><span class="hoard-icon"><span class="bold">Bank:</span></span></a>&nbsp;</div>');
	$$('#hoard_menu_value').appendTo('#mwh_bank');
	$$('#hoard_menu_value span').text('$'+ $$('#hoard_menu_value span').attr('title'));
	$$('#mwh_bank a').attr('onclick', $$('#cash_header_bank_link').attr('onclick'));

	$$('.health-icon.bold.attribute-title').wrap('<a id="" href="#"></a>').parent().attr('onclick', $$('#oneclick_heal_header').attr('onclick') ).attr('id','oneclick_heal_header');
	$$('.energy-icon.bold.attribute-title').wrap('<a id="" href="#"></a>').parent().attr('onclick', $$('#modal_refill_energy').attr('onclick') ).attr('id','modal_refill_energy');
	$$('.stamina-icon.bold.attribute-title').wrap('<a id="" href="#"></a>').parent().attr('onclick', $$('#modal_refill_stamina').attr('onclick') ).attr('id','modal_refill_stamina');
	
	$$.each(globals.stats, function(i,v) { globals.fixCounter(v); });
	$$('p.morein').remove();
	
	$$('#bountyButton').parent().css({'position':'absolute', 'bottom':'5px', 'width':'525px', 'text-align':'left'}).appendTo('#mwh_main');
	$$('.outer-links ul').append('<li><a href="http://www.kongcodes.com" target="_blank">KongCodes</a></li>').css({'position':'absolute', 'top':'10px', 'right':'20px', 'width':'100px'}).appendTo('#mwh_outer').find('li:nth-child(4)').remove();
	$$('#mwh_outer ul li').css({ 'text-align':'center'}); 
	$$('#mwh_outer ul li a').css({ 'text-align':'center', 'line-height':'16px'}); 
	$$('<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="JMGRL5KKQDE8Q"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>')
		.css({'position':'absolute', 'bottom':'2px', 'left':'20px'}).appendTo('#mwh_outer');
	$$('#growlcontainer').css({'position':'fixed', 'top':'11px', 'left':'7px','z-index':'100', 'width':'480px', 'height':'auto'}).appendTo('body');
	
// Create managers/modules
	mng_properties.init( $$('#mwh_main') );
	//mng_challenges.init( $$('#mwh_main') );
	mng_timers.init();
	player.checkBoosts();

// Apply general css
	$$('.mwh_mng_container').css({'margin':'0 0 5px 0'});
	$$('.mwh_mng_header').css({'font-size':'11px', 'line-height':'16px', 'border-bottom':'1px dotted white', 'margin':'0 0 5px 0', 'padding':'0 10px'});
}