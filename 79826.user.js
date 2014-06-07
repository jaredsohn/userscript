// ==UserScript==
// @name		ika-world_search
// @namespace		http://gm.maid450.com/ikariam/ika-world_search.user.js
// @description		Parse and display players data from ika-world in island view
// @include		http://s*.ikariam.*/*view=island*
// @include		http://s*.ikariam.*/*view=options*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


///////////////////////////
//COMMON VARS AND FUNCTIONS
///////////////////////////

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
		//general
		bold: 'bold',
		
		//score
		score_generals: 'גנרלים',
		score_total: 'Total',
		score_master_builders: 'Master builders',
		score_building_levels: 'Building levels',
		score_scientists: 'Scientists',
		score_research_levels: 'Levels of research',
		score_gold_stock: 'Gold stock',
		score_offensive_points: 'Offensive',
		score_defensive_points: 'Defensive',
		score_trade_score: 'Trading',

		//city table
		city: 'City',
		city_size: 'Size',
		city_sawmill: 'Sawmill',
		city_goto: 'Go to city',
		city_luxury: 'Luxury',
		city_luxury: 'Mine',
		
		//options
		options_island_show_cities_list: 'Show player\'s cities list',
		options_island_view_field_list: 'Fields to show on island view',
		options_add_field: 'Add field',
		options_del_field: 'Delete field',
		options_save: 'Save',
		
		//errors
		error_parsing: 'error parsing ika-world page (maybe they are on maintenance time)',
	},
	es: {
		//general
		bold: 'negrita',
		
		//score
		score_generals: 'Generales',
		score_total: 'Total',
		score_master_builders: 'Maestro constructor',
		score_building_levels: 'Nivel de construcción',
		score_scientists: 'Investigadores',
		score_research_levels: 'Nivel de investigación',
		score_gold_stock: 'Oro',
		score_offensive_points: 'Ofensivos',
		score_defensive_points: 'Defensivos',
		score_trade_score: 'Comercio',

		//city table
		city: 'Ciudad',
		city_size: 'Tamaño',
		city_sawmill: 'Aserradero',
		city_goto: 'Ir a la ciudad',
		city_luxury: 'Lujo',
		city_luxury: 'Mina',
		
		//options
		options_island_show_cities_list: 'Mostrar lista de ciudades del jugador',
		options_island_view_field_list: 'Campos visibles en vista de isla',
		options_add_field: 'Añadir campo',
		options_del_field: 'Borrar campo',
		options_save: 'Guardar',

		//errors
		error_parsing: 'error parseando la página de ika-world (quizás esten haciendo mantenimiento)',
	}
}

function getVar(varname, vardefault) {
  var res = GM_getValue('iw_' + varname);
  if (res == undefined) {
    return vardefault;
  }
  return eval(res);
}

function setVar(varname, varvalue) {
  GM_setValue('iw_' + varname, uneval(varvalue));
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

var images = {
	icon_add: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==',
	icon_del: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==',
}

////////////////
//COMMON CLASSES
////////////////

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

function iwAliance() {
	//TODO
};

function iwPlayer() {
	this.id = null,
	this.name = null,
	this.status = null,
	this.alliance = null,
	
	this.score = {
		total: null,
		master_builders: null,
		building_levels: null,
		scientists: null,
		research_levels: null,
		generals: null,
		gold_stock: null,
		offensive_points: null,
		defensive_points: null,
		trade_score: null,
	},
	
	this.cities = null
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
		this.config = getVar('config', {
			islandShowCitiesList: true,
			islandShowData: [
				{field: 'generals', bold: true},
				{field: 'gold_stock'}
			],
		});
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
					//SCORE PARSE
					//maps a rowindex to a player's score field
					score_mapping = [{
							field: 'total',
							rowIndex: 1
						}, {
							field: 'master_builders',
							rowIndex: 2
						}, {
							field: 'building_levels',
							rowIndex: 3
						}, {
							field: 'scientists',
							rowIndex: 4
						}, {
							field: 'research_levels',
							rowIndex: 5
						}, {
							field: 'generals',
							rowIndex: 6
						}, {
							field: 'gold_stock',
							rowIndex: 7
						}, {
							field: 'offensive_points',
							rowIndex: 8
						}, {
							field: 'defensive_points',
							rowIndex: 9
						}, {
							field: 'trade_score',
							rowIndex: 10
					}];
					
					rows = $(tables[1]).find('tr');
					
					//fill the player score data with mapping
					for(var i = 0; i < score_mapping.length; i++) {
						map = score_mapping[i];
						cells = $(rows[map.rowIndex]).find('td');
						player.score[map.field] = $.trim($(cells[1]).text());
						if(IkaWorld.localizationStrings['thousandSeperator'] != ',') {
							player.score[map.field] = player.score[map.field].replace(/,/g, IkaWorld.localizationStrings['thousandSeperator']);
						}
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
			container = $('#infocontainer');
			
			//appends data li's to the container
			fill_player_data = function(player) {
				container.find('ul').append('<li style="margin: 8px 0"></li>');
				
				addLi = function(item, value) {
					cls = item.bold? 'owner' : 'ally';
					li = '<li class="' + cls + '"><span class="textLabel">' + _('score_' + item.field) + ': </span>' + value + '</li>';
					container.find('ul').append(li);
				}
				
				$.each(IkaWorld.config.islandShowData, function(key, value) {
					addLi(value, player.score[value.field]);
				});
			}
			
			//returns city select menu for player
			getCitiesMenu = function(player) {
				table = $('<table><thead></thead><tbody></tbody></table>');
				tr = $('<tr></tr>');
				tr.append('<th class="iw_town_lvl"><img src="' + 'skin/img/city/building_townhall.gif' + '" alt="' + _('city_size') + '" title="' + _('city_size') + '" /></th>');
				tr.append('<th class="iw_town_name">' + _('city') + '</th>');
				tr.append('<th class="iw_wood_lvl"><img src="' + 'skin/resources/icon_wood.gif' + '" alt="' + _('city_sawmill') + '" title="' + _('city_sawmill') + '" /></th>');
				tr.append('<th class="iw_luxury">' + _('city_luxury') + '</th>');
				table.find('thead').append(tr);
				$.each(player.cities, function(key, city) {
					tr = $('<tr></tr>');
					tr.append('<td class="iw_town_lvl">' + city.size + '</td>');
					tr.append('<td class="iw_town_name"><a href="' + city.city_url + '" title="' + _('city_goto') + '">' + city.name + ' [' + city.x + ':' + city.y + ']' + '</a></td>');
					tr.append('<td class="iw_wood_lvl">' + city.wood_level + '</td>');
					luxurycell = '<td class="iw_luxury">';
					if(city.luxury_type) {
						luxurycell += '<img src="skin/resources/icon_' + city.luxury_type + '.gif" alt="' + _('city_mine') + '" title="' + _('city_mine') + '" /> ';
					}
					luxurycell += city.luxury_level + '</td>';
					tr.append(luxurycell);
					table.find('tbody').append(tr);
				});
				return table;
			}
			
			playerSelected = function() {
				selected_player = container.find('li.owner').text().split(':');
				selected_player = $.trim(selected_player[1]);
				
				//try to get player data from cache
				player = container.data('iw_player_' + selected_player);
				
				if(player) {
					//cached
					fill_player_data(player);
					if(IkaWorld.config.islandShowCitiesList) {
						menu = container.data('iw_citiesMenu_' + selected_player);
					}
				} else {
					//not cached
					IkaWorld.parsePlayer(selected_player, function(player) {
						//caching
						container.data('iw_player_' + selected_player, player);
						fill_player_data(player);
						if(IkaWorld.config.islandShowCitiesList) {
							menu = getCitiesMenu(player);
							container.data('iw_citiesMenu_' + selected_player, menu);
						}
					});
				}
				
				if(IkaWorld.config.islandShowCitiesList) {
					if(!$('#iw_menu').length) {
						//create container elem
						div = '<div id="iw_menu" style="position: absolute; display: none; z-index: 9999"></div>';
						$('body').append(div);
						placeholder = container.find('ul li:first-child');
						pos = placeholder.offset();
						width = placeholder.outerWidth();
						height = placeholder.outerHeight();
						//show the menu directly over the placeholder
						$("#iw_menu").css( { "left": (pos.left + width) + "px", "top": pos.top + "px" } );

					}
				
					//attach cities list select
					$(container.find('li.name')[0]).mouseenter(function(evt) {
						$('#iw_menu').empty();
						$('#iw_menu').append(menu);
						$('#iw_menu').css('display', 'block');
						$('#iw_menu').mouseleave(function(evt) {
							$('#iw_menu').css('display', 'none');
						});
					});
				}
			};
			
			//adding click event to cities
			$('a[id^=city_]').click(playerSelected);
			
			if(IkaWorld.config.islandShowCitiesList) {
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
		},
		
		options: function() {
			player = new iwPlayer();
			player_fields = [];
			$.each(player.score, function(field, value) {
				field = {
					'field': field,
					'label': _('score_' + field),
				};
				player_fields.push(field);
			});
			
			addField = function(item) {
				fieldstr = '<li class="iw_field">';
				//select
				fieldstr += '<select class="iw_field_select" style="margin-right: 5px;">';
				$.each(player_fields, function(key, value) {
					fieldstr += '<option value="' + value.field + '"';
					if(item && item.field == value.field) {
						fieldstr += ' selected="selected"';
					}
					fieldstr += '>' + value.label + '</option>';
				});
				fieldstr += '</select>';
				//bold checkbox
				var rand = Math.floor(Math.random() * 9999);
				fieldstr += '<label for="iw_cls_check_' + rand + '">' + _('bold') + '</label>';
				fieldstr += '<input id="iw_cls_check_' + rand + '" class="iw_field_bold_chk" type="checkbox" ';
				if(item && item.bold) {
					fieldstr += 'checked="checked" ';
				}
				fieldstr += '/>';
				fieldstr += '<span class="iw_field_controls" style="margin-left: 8px;">';
				//add icon
				fieldstr += '<img class="iw_btn_add" src="' + images.icon_add + '" alt="' + _('options_add_field') + '" title="' + _('options_add_field') + '" style="margin-right: 3px;" />';
				//del icon
				fieldstr += '<img class="iw_btn_del" src="' + images.icon_del + '" alt="' + _('options_del_field') + '" title="' + _('options_del_field') + '" />';
				fieldstr += '</span>';
				fieldstr += '</li>';
				fieldstr = $(fieldstr);
				//add events
				//add button click
				fieldstr.find('img.iw_btn_add').click(function(evt) {
					$(evt.currentTarget).parents('li').after(addField());
				});
				//del button click
				fieldstr.find('img.iw_btn_del').click(function(evt) {
					$(evt.currentTarget).parents('li').remove();
				});
				return fieldstr;
			}
		
			buildOptionsPanel = function() {
				result = '<div id="iw_search_options" class="contentBox01h">';
				result += '<h3 class="header"><span class="textLabel">Ika-World_search (by MaiD450)</span></h3>';
				result += '<div class="content">';
				result += '<table></tbody>';
				result += '<tr><th>' + _('options_island_show_cities_list') + '</th><td><input id="iw_islandShowCitiesList_chk" type="checkbox"';
				if(IkaWorld.config.islandShowCitiesList) {
					result += ' checked="checked"';
				}
				result += ' /></td></tr>';
				result += '<tr><th>' + _('options_island_view_field_list') + '</th><td><ul id="iw_field_list"></ul></td></tr>';
				result += '</tbody></table>';
				result += '<div class="centerButton"><input id="iw_save_btn" type="button" value="' + _('options_save') + '" class="button"></div>';
				result += '</div><div class="footer"></div>';
				result += '</div>';
				
				//populate field list
				result = $(result);
				$.each(IkaWorld.config.islandShowData, function(key, value) {
					result.find('#iw_field_list').append(addField(value));
				});
				
				return result;
			};
			
			//add options box
			preceding = $($('#mainview div.contentBox01h')[1]);
			preceding.after(buildOptionsPanel());
			$('#iw_save_btn').click(function(evt) {
				configObj = {};
				configObj.islandShowCitiesList = $('#iw_islandShowCitiesList_chk').attr('checked');
				configObj.islandShowData = [];
				$('#iw_field_list li').each(function(index, elem) {
					elem = $(elem);
					configObj.islandShowData.push({
						field: $(elem).find('select.iw_field_select option:selected').attr('value'),
						bold: $(elem).find('input.iw_field_bold_chk').attr('checked'),
					});
					IkaWorld.config = configObj;
					setVar('config', configObj);
				});
				
			});
		}
	},

};


server = extractWorldLand(document.location.host);
if(server == null) {
	alert('Unknown URL format');
} else {
	IkaWorld.init(server.land, server.world);

	if(IkaWorld.view_functions[IkaWorld.view]) {
		IkaWorld.view_functions[IkaWorld.view]();
	}
}
