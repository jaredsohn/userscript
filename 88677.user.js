// ==UserScript==
// @name           Помічник по сусідах
// @namespace      http://userscripts.org/users/237833
// @author         Ihor Bobalo
// @version        0.1
// @history        0.1 add island parsing. [use IkaTools (57377.user.js)]
// @history        0.0 initial stub
// @description    Допомагає збирати інфу про сусідів
// @include        http://s*.*.ikariam.com/index.php?view=island&*
// @include        http://s*.*.ikariam.com/index.php?view=worldmap_iso
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/88544.user.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// ==/UserScript==

// NOTICE: I have not gotten this script approved yet, by installing this you are
// using it at your own risk, if you get banned, I'm sorry, but that is not my fault

var usNum  = '88677';
var curVer = '0.1';
ScriptUpdater.check(usNum, curVer);
ScriptUpdater.insertUpdateCheck(usNum, curVer, $('div#container div#container2 div#infocontainer h3'), '<div style="float:right;margin-right:10px;">v.' + curVer + '</div>');

function defineLanguage(langID) {
	language = {
		STR_PLAYER:  'Player',
		STR_ISLAND:  'Island',
		STR_CITY:    'City',
		STR_SCORE:   'Score!',
		STR_DATE:    'Date',
		STR_TIME:    'Time'
	};
	switch (langID) {
	case 'ru':
		language.STR_PLAYER = 'Игрок';
		language.STR_ISLAND = 'Остров';
		language.STR_CITY   = 'Город';
		language.STR_SCORE  = 'Баллы';
		language.STR_DATE   = 'Дата';
		language.STR_TIME   = 'Время';
		break;
	case 'ua':
		language.STR_PLAYER = 'Гравець';
		language.STR_ISLAND = 'Острів';
		language.STR_CITY   = 'Місто';
		language.STR_SCORE  = 'Бали';
		language.STR_DATE   = 'Дата';
		language.STR_TIME   = 'Час';
		break;
	default:
		GM_log("Unknown language " + langID + " @ " + top.location.host);
	}
	return language;
}

var language = defineLanguage('');
var gameServerParts = top.location.host.split(".");
if (gameServerParts.length >= 3) {
	language = defineLanguage(gameServerParts[gameServerParts.length-3]);
}


////////////////////////////////////////////////////////////
///
///            Common tools
///
////////////////////////////////////////////////////////////

// strips(s) - remove from string all heading, trailing, and extra internal spaces
function strips(str) { return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/\s+/, ' ');}

// do_click(element) - simulate mouse click on some element
function do_click(element) {var evt = document.createEvent("HTMLEvents"); evt.initEvent("click", true, true); element.dispatchEvent(evt);}

// contentEval(source) - eval() function that runs code in the content page scope
function content_eval(source) { if ('function' == typeof source) { source = '(' + source + ')();' } var script = document.createElement('script'); script.setAttribute("type", "application/javascript"); script.textContent = source; document.body.appendChild(script); document.body.removeChild(script);}


// read_content_global(name, callback) - read globals from the content scope
var read_content_global;
(function() {
var callbacks = [];
var callback_counter = 0;

function dispatch_global(id, name, value) {
  var msg_data = {
      'type': 'read_content_global',
      'callback_id': id,
      'name': name,
      'data': value,
      };
  var msg = JSON.stringify(msg_data);
  window.postMessage(msg, '*');
}
location.href = 'javascript:'+dispatch_global.toString();

function receive_global(event) {
  try {
    var result = JSON.parse(event.data);
    if ('read_content_global' != result.type) return;
    if (!callbacks[result.callback_id]) return;
    callbacks[result.callback_id](result.name, result.data);
    del(callbacks[result.callback_id]);
  } catch (e) {
    // No-op.
  }
}
window.addEventListener('message', receive_global, false);

read_content_global = function(name, callback) {
  var id = (callback_counter++);
  callbacks[id] = callback;

  location.href = 'javascript:dispatch_global('
      + id + ', "'
      + name.replace(/\"/g, '\\"') + '", '
      + name 
      + ');void(0);';
}
})();
////////////////////////////////////////////////////////////
///
///            Persistence storage
///
////////////////////////////////////////////////////////////

function storeIslandInfo(island_id, name, x, y) {
	GM_log('Island ' + island_id + ' ' + name + '[' + x + ':' + y + ']');
}

function storeAllyInfo(ally_id, name) {
	GM_log('Ally ' + ally_id + ' ' + name);
}

function storePlayerInfo(player_id, name, ally_id, score) {
	GM_log('Player ' + player_id + ' ' + name + ' @ ' + ally_id + ' with ' + score);
}

function storeCityInfo(city_id, island_id, owner_id, city_name, city_size) {
	GM_log('City ' + city_id + ' ' + city_name + ' by ' + owner_id + ' @ ' + island_id + ')');
}

////////////////////////////////////////////////////////////
///
///            Parse island page, extract and store city info
///
////////////////////////////////////////////////////////////

function parseIsland() {
	var txt = $('div#container div#container2 div#breadcrumbs span.island').text();
	var name_coords = txt.split('[');
	var coords = name_coords[1].split(']')[0].split(':');
	var island = {
		id:   parseInt(top.location.href.replace(/^.+view=island&id=(\d+)$/, '$1')),
		name: name_coords[0],
		x:    parseInt(coords[0]),
		y:    parseInt(coords[1])
	};
	return island;
}

function parseCityID(a) {
	return a.attr('id').replace(/^city_(\d+)$/, '$1');
}

function parseCityLI(li) {
	return strips($(li).text().split(':')[1]);
}

function parseCityOwnerID(li) {
	var a = $(li).find('a.messageSend');
	if (a.length) {
		return a.attr('href').replace(/^.+receiverId=(\d+).*$/, '$1');
	}
	return 0;
}

function parseCityAllyID(li) {
	var a = $(li).find('a.messageSend');
	if (a.length) {
		return a.attr('href').replace(/^.+allyId=(\d+).*$/, '$1');
	}
	return 0;
}

function parseCityInfo(a_element, cityinfo_element) {
	var lis = cityinfo_element.find('li');

	var city_info = {
		id:       parseInt(parseCityID(a_element)),
		name:              parseCityLI(lis[0]),
		level:             parseCityLI(lis[1]),
		owner:             parseCityLI(lis[2]),
		owner_id: parseInt(parseCityOwnerID(lis[2])),
		score:    parseInt(parseCityLI(lis[3]).replace(',','')),
		ally:              parseCityLI(lis[4]),
		ally_id:  parseInt(parseCityAllyID(lis[4])),

		inactivity: (a_element.find('span.inactivity').length > 0),
		palm:       (a_element.find('span.palm').length > 0),
		vacation:   (a_element.find('span.vacation').length > 0),
		noob:       (a_element.find('div.noob').length > 0),
		protected:  (cityinfo_element.find('li.noobModeInfo').length > 0)
	};


	return city_info;
}

function parseCityLocation(location_element, island) {
	var infos = location_element.find('ul.cityinfo');
	var a = location_element.find('a#[id^=city_]');
	if (a && infos) {
		city_info = parseCityInfo(a, infos);
		if (city_info.owner_id) {
			if (city_info.ally_id) {
				storeAllyInfo(city_info.ally_id, city_info.ally);
			}
			storePlayerInfo(city_info.owner_id, city_info.owner, city_info.ally_id, city_info.score);
			storeCityInfo(city_info.id, island.id, city_info.owner_id, city_info.name, city_info.level);
		} else {
			GM_log("no city info details");
		}
	} else {
		GM_log("no city info");
	}
}

function parseIslandPage() {
	island = parseIsland();
	if (island.id) {
		storeIslandInfo(island.id, island.name, island.x, island.y);
		// Finds and parse cities
		$('div#mainview ul#cities li.cityLocation.city').each(function (i){
			parseCityLocation($(this), island);
		});
	}
}


////////////////////////////////////////////////////////////
///
///            Parse world map view
///
////////////////////////////////////////////////////////////

// process tile extra visualization
function processWorldPageTile(tile) {
	var div_tile = $('div#worldmap div#tile_' + tile.id);
	if (div_tile.length != 1) {
		GM_log('WARNING! div#worldmap div#tile_' + tile.id + ' not found' );
		return 0;
	}
	var tile_hint = div_tile.find('div.cities');

	tile_hint.css('background', '#FFFFFF');
	tile_hint.css('border', '1px solid #000000');
	tile_hint.css('left', '90px');
	tile_hint.css('width', '60px');

	tile_hint.text(tile_hint.text().split(' ')[0] + ' ' + tile.x + ' ' + tile.y);

//	function got(name, value) {
//		var data = value.islands[tile.x][tile.y];
//		tile_hint.attr('title', data.join(' '));
//	}
//	read_content_global('map', got);

	return 1;
}

function parseWorldPageTile(div_link_tile) {
	var a = div_link_tile.find('a.islandLink');
	if (a.length != 1) {
		// is ocean
//		GM_log('Ocean ' + div_link_tile.html());
		return 0;
	}
	var coords = a.attr('href').replace('#','').split(':');
	var tile = {
		id:       div_link_tile.attr('id').replace('link_tile_', ''), // '1_2'
		x:        parseInt(coords[0]),
		y:        parseInt(coords[1])
	};

	return tile;
}

function parseWorldPage() {
	var tiles = [];
	$('div#mainview div.linkMapContainer div#linkMap div#[id^=link_tile]').each(function (i){
		var tile = parseWorldPageTile($(this));
		if (tile) {
			tiles.push(tile);
			processWorldPageTile(tile);
		}
	});
	GM_log('Worldmap parsed: ' + tiles.length + ' tiles');
}


////////////////////////////////////////////////////////////

switch (IkaTools.getView()) {
case 'worldmap_iso':
	parseWorldPage();
	break;
case 'island':
	parseIslandPage();
	break;
}
//Script End