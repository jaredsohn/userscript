// ==UserScript==
// @name		İka-World Search
// @namespace	
// @description	İka-World Search sitesinin program haline çevirdik ve süper bir eklenti kodladık seçtiginiz kişinin bütün şehirlerini bulun...(www.ikariam.forumm.biz)
// @version		0.7
// @include		http://s*.ikariam.*/*view=island*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require		http://userscripts.org/scripts/source/94703.user.js
// @history		0.7	updated for ikariam v.0.4.2.4, removed score-related info as in this ikariam version it's included by default
// @history		0.6	copied "Script Updater" to my account for problems with PhasmaExMachina's account
// @history		0.5	Added update checking with "Script Updater" by PhasmaExMachina
// @history		0.4	fixed: bug when setting a custom configuration (adding fields...)
// @history		0.3	fixed: icons in cities table weren't displayed
// @history		0.2	fixed: script was broken after ika-world structure change
// ==/UserScript==

///////////////////////////
//COMMON VARS AND FUNCTIONS
///////////////////////////

var version = 0.7;

function extractWorldLand(location) {
	server = {
		'land': '',
		'world': ''
	};
	extractor = /s(\d*)\.(.*?)\.?ikariam\.(.*)/gi;
	results = extractor.exec(location);
	if(results != null) {
		server.world = results[1];
		server.land = results[2] == ''? results[3] : results[2];
		map = {
			com: 'us',
			org: 'en'
		}
		if(map[server.land]) {
			//mapping for .com and .org domains
			server.land = map[server.land];
		}
		server.land = server.land.replace(/com\.(.*?)/gi, '');
		
		return server;
	} else {
		return null;
	}
}

var lang = {
	en: {
		//city table
		city: 'Şehir',
		city_size: 'Size',
		city_sawmill: 'Sawmill',
		city_goto: 'Şehire Git',
		city_luxury: 'Luxury',
		city_luxury: 'Kaynak',
		
		//errors
		error_parsing: 'error parsing ika-world page (maybe they are on maintenance time)',
	},
	es: {
		//city table
		city: 'Ciudad',
		city_size: 'Tamaño',
		city_sawmill: 'Aserradero',
		city_goto: 'Ir a la ciudad',
		city_luxury: 'Lujo',
		city_luxury: 'Mina',
		
		//errors
		error_parsing: 'error parseando la página de ika-world (quizás esten haciendo mantenimiento)',
	}
}

function getVar(varname, vardefault) {
  var res = GM_getValue('iw_' + varname);
  if (res == undefined) {
    return vardefault;
  }
  return JSON.parse(res);
}

function setVar(varname, varvalue) {
  GM_setValue('iw_' + varname, JSON.stringify(varvalue));
}

function _(key) {
	if(lang[IkaWorld.language] && lang[IkaWorld.language][key]) {
		return lang[IkaWorld.language][key];
	} else {
		var result = '';
		$.each(lang, function(lng, values) {
			if(values[key]) {
				result = values[key];
				return false;
			}
		});
		return result;
	}
}

////////////////
//COMMON CLASSES
////////////////

function iwPlayer() {
	this.id = null,
	this.name = null,
	this.status = null,
	this.alliance = null,
	
	this.cities = null
};


function iwCity() {
	this.id = null,
	this.name = null,
	this.size = null,
	this.city_url = null,
	this.island_url = null,
	this.x = null,
	this.y = null,
	this.wood_level = null,
	this.luxury_type = null,
	this.luxury_level = null
};

////////////////
//IKAWORLD CLASS
////////////////

IkaWorld = {

	search_url: 'http://www.ika-world.com/search.php',
	land: null,
	world: null,
	view: null,
	localizationStrings: unsafeWindow.LocalizationStrings,
	language: null,
	config: null,
	
	init: function(land, world) {
		this.land = land;
		this.world = world;
		this.view = $("body").attr('id');
		this.language = this.localizationStrings['language'];
		if(!lang[this.language]) {
			this.language = 'en';
		}
	},
	
	parsePlayer: function(player_name, callback) {
		params = {
			'view': 'player_details',
			'land': this.land,
			'welt': this.world,
			'spieler': player_name
		};
		
		url = this.search_url + '?' + $.param(params).replace('%C2%A0', ' ');
		GM_xmlhttpRequest({
			'url': url,
			'method': 'GET',
			onload: function(evt) {
				//strip "script" tags
				var html = evt.responseText.replace(/<script[^>]*?>[\s\S]*?<\/script>/gi, '');
				//extract cities luxury goods
				var goods_srcs = html.match(/images\/icon_(.*?)\.gif/gi);
				
				var goods = [];
				for(var i = 0; i < goods_srcs.length; i++) {
					good = goods_srcs[i].replace('images/icon_', '');
					good = good.replace('.gif', '');
					if($.inArray(good, ['crystal', 'marble', 'wine', 'sulfur']) >= 0) {
						goods.push(good);
					}
				}
				
				//strip images
				html = html.replace(/<img[^>]*?\/>/gi, '');
				//get $ object
				html = $(html);
				//build player and call callback with it
				tables = html.find('table');
				player = new iwPlayer();
				if(tables.length > 1) {
					//CITIES PARSE
					//maps rowcells to player's city field
					city_mapping = [{
							field: 'name',
							cellIndex: 0
						},{
							field: 'city_url',
							cellIndex: 0,
							fn: function(cell) {
								return $(cell).find('a').attr('href').replace('http://anonym.to/?', '');
							}
						},{
							field: 'size',
							cellIndex: 1
						},{
							field: 'x',
							cellIndex: 2
						},{
							field: 'y',
							cellIndex: 3
						},{
							field: 'island_url',
							cellIndex: 4,
							fn: function(cell) {
								return $(cell).find('a').attr('href').replace('http://anonym.to/?', '');
							}
						},{
							field: 'wood_level',
							cellIndex: 5
						},{
							field: 'luxury_type',
							cellIndex: 6,
							fn: function(cell, i) {
								return goods[i];
							}
						},{
							field: 'luxury_level',
							cellIndex: 6
						}
					];
					
					player.cities = []
					rows = $(tables[2]).find('tr');
					for(var i = 1; i < rows.length - 1; i++) {
						cells = $(rows[i]).find('td');
						city = new iwCity();
						$.each(city_mapping, function(key, map) {
							city[map.field] = map.fn? map.fn(cells[map.cellIndex], i - 1) : $.trim($(cells[map.cellIndex]).text());
						});
						player.cities.push(city);
					}
					
					callback(player);
				} else {
					alert(_('error_parsing'));
					return;
				}
			}
		});
				
	},
	
	// VIEW FUNCTIONS
	view_functions: {
		
		//ISLAND VIEW
		island: function() {
			container = $('#information');
			
			//returns city select menu for player
			getCitiesMenu = function(player) {
				table = $('<table><thead></thead><tbody></tbody></table>');
				tr = $('<tr></tr>');
				tr.append('<th class="iw_town_lvl"><img src="' + 'http://' + document.location.host + '/skin/icons/livingspace_24x24.gif' + '" alt="' + _('city_size') + '" title="' + _('city_size') + '" /></th>');
				tr.append('<th class="iw_town_name">' + _('city') + '</th>');
				tr.append('<th class="iw_wood_lvl"><img src="' + 'http://' + document.location.host + '/skin/resources/icon_wood.gif' + '" alt="' + _('city_sawmill') + '" title="' + _('city_sawmill') + '" /></th>');
				tr.append('<th class="iw_luxury">' + _('city_luxury') + '</th>');
				table.find('thead').append(tr);
				$.each(player.cities, function(key, city) {
					tr = $('<tr></tr>');
					tr.append('<td class="iw_town_lvl">' + city.size + '</td>');
					tr.append('<td class="iw_town_name"><a href="' + city.city_url + '" title="' + _('city_goto') + '">' + city.name + ' [' + city.x + ':' + city.y + ']' + '</a></td>');
					tr.append('<td class="iw_wood_lvl">' + city.wood_level + '</td>');
					luxurycell = '<td class="iw_luxury">';
					if(city.luxury_type) {
						luxurycell += '<img src="' + 'http://' + document.location.host + '/skin/resources/icon_' + city.luxury_type + '.gif" alt="' + _('city_mine') + '" title="' + _('city_mine') + '" /> ';
					}
					luxurycell += city.luxury_level + '</td>';
					tr.append(luxurycell);
					table.find('tbody').append(tr);
				});
				return table;
			};
			
			playerSelected = function() {
				selected_player = $.trim(container.find('tr.owner td.nameValue').next().text());
				//try to get player data from cache
				player = container.data('iw_player_' + selected_player);
				
				if(player) {
					//cached
					menu = container.data('iw_citiesMenu_' + selected_player);
				} else {
					//not cached
					IkaWorld.parsePlayer(selected_player, function(player) {
						//caching
						container.data('iw_player_' + selected_player, player);
						menu = getCitiesMenu(player);
						container.data('iw_citiesMenu_' + selected_player, menu);
					});
				}
				
				if(!$('#iw_menu').length) {
					//create container elem
					div = '<div id="iw_menu" style="position: absolute; display: none; z-index: 9999"></div>';
					$('body').append(div);
					placeholder = container.find('tr:first-child');
					pos = placeholder.offset();
					width = placeholder.outerWidth();
					height = placeholder.outerHeight();
					//show the menu directly over the placeholder
					$("#iw_menu").css( { "left": (pos.left + width) + "px", "top": pos.top + "px" } );

				}
				
				//attach cities list select
				$(container.find('tr.name')[0]).mouseenter(function(evt) {
					$('#iw_menu').empty();
					$('#iw_menu').append(menu);
					$('#iw_menu').css('display', 'block');
					$('#iw_menu').mouseleave(function(evt) {
						$('#iw_menu').css('display', 'none');
					});
				});
			};
			
			//adding click event to cities
			$('a[id^=city_]').click(playerSelected);
			
			//add menu styles
			GM_addStyle('#iw_menu {background-color: #F6EBBA; border: 1px solid #C69262;}');
			GM_addStyle('#iw_menu a {color: #542C0F;}');
			GM_addStyle('#iw_menu tr {border: 1px solid #C69262}');
			GM_addStyle('#iw_menu tbody tr:hover {background-color: #DEC28D}');
			GM_addStyle('#iw_menu td, #iw_menu th {padding: 1px 3px;}');
			GM_addStyle('#iw_menu th {text-align: center;}');
			GM_addStyle('#iw_menu th.iw_town_lvl img {width: 26px; heigth: 26px;}');
			GM_addStyle('#iw_menu td {text-align: left;}');
			GM_addStyle('#iw_menu td.iw_town_level, #iw_menu td.iw_wood_level {text-align: center;}');
		}
	}

};

ScriptUpdater.check(71441, version);

server = extractWorldLand(document.location.host);
if(server == null) {
	alert('Unknown URL format');
} else {
	IkaWorld.init(server.land, server.world);

	if(IkaWorld.view_functions[IkaWorld.view]) {
		IkaWorld.view_functions[IkaWorld.view]();
	}
}
