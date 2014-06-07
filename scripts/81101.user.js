// ==UserScript==
// @name           godville-ui
// @namespace      http://godville.net/userscripts
// @description    Some improvements for godville ui
// @include        http://godville.net/hero*
// @require        http://mesak-project.googlecode.com/files/jquery.142.gm.js
// @resource       Words http://github.com/bazuuka/godville-ui/raw/v8.8/phrases.json
// @resource       Style http://github.com/bazuuka/godville-ui/raw/v8.8/godville-ui.css
// @resource       Version http://github.com/bazuuka/godville-ui/raw/v8.8/version
// @license        GNU General Public License v3
// ==/UserScript==

var version = 1;
var script_link = 'http://userscripts.org/scripts/show/81101';
var latest_version_link = 'http://github.com/bazuuka/godville-ui/raw/master/version';
var source_link_template = 'http://github.com/bazuuka/godville-ui/raw/%tag%/godville-ui.user.js';

var god_name = $('#menu_top').text().replace(/Приветствуем, о (.+)\!/, '$1' );
var developers = ['Neniu'];

// Style
GM_addStyle( GM_getResourceText('Style') );

//  --- All words from phrases.json ---

// JSON.parse не поддерживает комментарии в JSON. Whyyyyy ???
// пришлось использовать небезопасный eval.
// TODO: JSON.minify? yaml? -- и для того и другого нужна еще одна библиотечка
var words = eval('(' + GM_getResourceText('Words') + ')');

// Проверка версии
if (words['version'] > version) {
	alert("Внимание! Вы используете новый phrases.json со старым скриптом!\n\n"
		  + ' - попробуйте обновить скрипт: ' + script_link + "\n"
		  + '(предварительно сохраните новый phrases.json, не зря же вы его вручную ставили)');
} else if (words['version'] < version) {
	alert("Внимание! Вы используете старый phrases.json с новым скриптом\n\n"
		  + " - попробуйте переустановить скрипт: " + script_link + "\n"
		  + " - или, если Вы изменяли phrases.json, и сейчас используете его, вручную найти что изменилось и поправить");
}

// ------------------------
// Timeout bar
// -----------------------
// timeout_bar.create -- создать объект
// timeout_bar.start([seconds]) -- пустить полоску
var timeout_bar = {
	create: function() {
		this.elem = $('<div id="timeout_bar"/>');
		$('#menu_bar').after(this.elem);
	},

	start: function(timeout) {
		timeout = timeout || 30;
		this.elem.stop();
		this.elem.css('width', '100%');
		this.elem.animate({width: 0}, timeout * 1000, 'linear');
	}
};
// ------------------------
// UI Menu
// ------------------------
var menu_bar = {
	reformalLink: $('<a id="reformal" href="http://godville-ui.reformal.ru/" target="about:blank">есть идеи?</a>'),

	create: function() {
		$('#menu_bar').after(this.constructMenuBar());
		$('#menu_bar ul').append( $('<li> | </li>').append(this.getToggleButton()));
	},
	append: function($obj) {
		this.items.append( $('<li></li>').append($obj));
	},
	toggle: function() {
		this.bar.toggle();
		storage.set('ui_menu_visible', this.bar.is(':visible'));
	},
	show: function() {
		this.bar.show();
	},
	constructMenuBar: function() {
		this.items = $('<ul></ul>');
		this.bar = $('<div id="ui_menu_bar"></div>').append(this.items);
		this.bar.toggle(storage.get('ui_menu_visible') == 'true' || false);
		//append basic elems
		this.append($('<strong>Godville UI:</strong>'));
		this.append(this.reformalLink);
		if (is_developer()) {
			this.append(this.getDumpButton());
		}
		return this.bar;
	},

	getToggleButton: function() {
		return $('<a href="#"><strong>ui</strong></a>')
			.click(function() {
					   menu_bar.toggle();
					   return false;
				   });
	},
	getDumpButton: function() {
		return $('<a href="#" class="devel_link">dump</a>')
			.click(function() {
					   storage.dump();
				   });
	},
};

// -----------------------
// Storage wrapper
// -----------------------
// storage.set -- store value
// storage.get -- read value
// storage.set_with_diff -- store value and get diff with old
var storage = {
	_get_key: function(key) {
		return god_name + ':' + key;
	},
	set: function(id, value) {
		GM_setValue(this._get_key(id), "" + value);
	},
	get: function(id) {
		return GM_getValue(this._get_key(id), null);
	},
	diff: function(id, value) {
		var diff = null;
		var old = this.get(id);
		if (old != null) {
			diff = value - old;
		}
		return diff;
	},
	set_with_diff: function(id, value) {
		var diff = this.diff(id, value);
		this.set(id, value);
		return diff;
	},
	dump: function() {
		var lines = new Array;
		for each (val in GM_listValues().sort()) {
			lines.push(val + ' = ' + GM_getValue(val, 'UNDEF'));
		}
		GM_log("Storage:\n" + lines.join("\n"));
	}
};

// ------------------------
//      HELPERS
// ------------------------
// Dump
function is_developer() {
	return developers.indexOf(god_name) >= 0;
}

// Чтение массива
function get_random_item(arr) {
	return arr[Math.floor ( Math.random() * arr.length )];
}
// Случайная фраза в разделе 'sect'
function get_random_phrase(sect) {
	return get_random_item( words['phrases'][sect] );
}

// Базовый алгоритм произнесения фразы
function sayToHero(phrase) {
	$('#aog_hint_label').hide();
	$('#god_phrase').val(phrase);
}

// Checks if $elem already improved
function isAlreadyImproved($elem) {
	if ($elem.hasClass('improved')) return true;
	$elem.addClass('improved');
	return false
}

function findLabel($base_elem, label_name) {
	return $('.l_capt', $base_elem).filter(function(index){
			return $(this).text() == label_name;
		});
}

// Search for label with given name and appends after it
// given elem
function addAfterLabel($base_elem, label_name, $elem) {
	findLabel($base_elem, label_name).after($elem.addClass('label-appended'));
}

// Generic say button
function getGenSayButton(title, array) {
	return $('<a href="#">' + title + '</a>')
		.click(function() {
			sayToHero(get_random_item(array));
			return false;
		});
}

// Хелпер объединяет addAfterLabel и getGenSayButton
// + берет фразы из words['phrases']
function addSayPhraseAfterLabel($base_elem, label_name, btn_name, section) {
	var arr = words['phrases'][section];
	addAfterLabel($base_elem, label_name, getGenSayButton(btn_name, arr));
}

// ------------------------
// Stats storage
// ------------------------
var stats = {
	get: function(key) {
		return storage.get('stats_' + key);
	},
	set: function(key, value) {
		return storage.set('stats_' + key, value);
	},
	setFromProgressBar: function(id, $elem) {
		value = 100 - $elem.css('width').replace(/%/, '');
		// Workaround for bug with decreasing 'exp'
		old_value = this.get(id);
		if (old_value) {
			var diff = value - old_value;
			if (diff < 0 && diff > -1)
				return old_value;
		}
		return this.set(id, value);
	},
	setFromLabelCounter: function(id, $container, label, parser) {
		parser = parser || parseInt;
		var $label = findLabel($container, label);
		var $field = $label.nextAll('.field_content').first();
		var value = parser($field.text());
		this.set(id, value);
	},
	setFromEquipCounter: function(id, $container, label) {
		var $label = findLabel($container, label);
		var $field = $label.nextAll('.equip_content').first();
		var value = $field.text().replace(/.*([+-][0-9]+)/, "$1");
		this.set(id, parseInt(value));
	}
}

// ------------------------
// Oneline logger
// ------------------------
// logger.create -- создать объект
// logger.appendStr -- добавить строчку в конец лога
// logger.needSepratorHere -- перед первой же следующей записью вставится разделитель
// logger.watchProgressBar -- следить за полоской
// logger.watchLabelCounter -- следить за значением лабела
var logger = {
	create: function() {
		this.elem = $('<ul id="stats_log"/>');
		$('#menu_bar').after(this.elem);
	},

	appendStr: function(id, klass, str, descr) {
		// append separator if needed
		if (this.need_separator) {
			this.need_separator = false;
			if (this.elem.children().length > 0) {
				this.elem.append('<li class="separator">|</li>');
			}
		}
		// apend string
		this.elem.append('<li class="' + klass + '" title="' + descr + '">' + str + '</li>');
		this.elem.scrollLeft(10000000); //Dirty fix
	},

	watchStatsValue: function(id, name, descr, klass) {
		klass = klass || id;
		var diff = storage.set_with_diff('logger_param_' + id, stats.get(id));
		if(diff) {
			// Округление и добавление плюсика
			diff = Math.round(diff * 1000) / 1000;
			s = (diff < 0)? diff : '+' + diff;

			this.appendStr(id, klass, name  + s, descr);
		}
	},

	update: function() {
		this.need_separator = true;
		this.watchStatsValue('prana', 'pr', 'Прана (проценты)');
		this.watchStatsValue('exp', 'exp', 'Опыт (проценты)');
		this.watchStatsValue('task', 'tsk', 'Задание (проценты)');
		this.watchStatsValue('level', 'lvl', 'Уровень');
		this.watchStatsValue('inv', 'inv', 'Инвентарь');
		this.watchStatsValue('heal', 'hp', 'Здоровье');
		this.watchStatsValue('gold', 'gld', 'Золото');
		this.watchStatsValue('monster', 'mns', 'Монстры');
 		this.watchStatsValue('death', 'death', 'Смерти');
 		this.watchStatsValue('brick', 'br', 'Кирпичи');
		this.watchStatsValue('equip1', 'eq1', 'Оружие', 'equip');
		this.watchStatsValue('equip2', 'eq2', 'Щит', 'equip');
		this.watchStatsValue('equip3', 'eq3', 'Голова', 'equip');
		this.watchStatsValue('equip4', 'eq4', 'Тело', 'equip');
		this.watchStatsValue('equip5', 'eq5', 'Руки', 'equip');
		this.watchStatsValue('equip6', 'eq6', 'Ноги', 'equip');
		this.watchStatsValue('equip7', 'eq7', 'Талисман', 'equip');
	}
};

// ------------------------------------
// Updater
// ------------------------------------
var updater = {
	interval: 60 * 60 * 1000,  // every hour
	//interval: 5 // every reload

	queryVersion: function() {
		// jQuery.ajax не работает, потому что ссылка version_link
		// указывает на другой домен. Защита ...
		GM_xmlhttpRequest(
			{
				method:"GET",
				url:latest_version_link,
				onload:function(details) {
					var data = details.responseText;
					storage.set('updater_available', data);
					updater.insertLink();
				}
			});
	},
	getUpdateLink: function(label, version) {
		var link = source_link_template.replace(/%tag%/, 'v' + version);
		return $('<a id="update" href="' + link + '">' + label + '</a>');
	},
	insertLink: function() {
		var installed = GM_getResourceText('Version');
		var available = storage.get('updater_available');

		if (installed != available) {
			menu_bar.append(this.getUpdateLink('<strong>обновить</strong>', available));
			menu_bar.show();
		} else {
			menu_bar.append(this.getUpdateLink('переустановить', installed));
		}
	},
	check: function() {
		var timer_key = 'update_timer';
		var date = new Date;
		var secs = date.getTime();
		var diff = storage.diff(timer_key, secs);
		if ( !diff || diff > this.interval) {
			storage.set(timer_key, secs);
			this.queryVersion();
		} else {
			this.insertLink();
		}
	}
};

// ------------------------------------
//  Improvements !!
// ------------------------------------

// -------- Hero Loot -----------------
function getInspectQueryText(item_name) {
	return get_random_phrase('inspect_prefix') + ' "' + item_name + '"';
}

function isHealItem(item_name) {
	return words['items']['heal'].indexOf(item_name) >= 0;
}

function canBeActivated($obj) {
	return $obj.text().match(/\(\@\)/);
}

// Main button creater
function improveLoot() {
	if (isAlreadyImproved($('#inv_box'))) return;

	function createInspectButton(item_name) {
		return $('<a href="#">?</a>')
			.click(function(){
				sayToHero(getInspectQueryText(item_name));
				return false;
			});
	}

	// Parse items
	$('#hero_loot ul li').each(function(ind, obj) {
		var $obj = $(obj);
		var item_name = $('span', $obj).text().replace(/^\s+|\s+$/g, '');
		// color items, and add buttons
		if (isHealItem(item_name)) {
			$obj.css('color', 'green');
		} else if (canBeActivated($obj)) {
			// Ничего не делать на активируемые вещи
		} else {
			$obj.append(createInspectButton(item_name));
		}
	});
}


// -------------- Phrases ---------------------------

function isArena() {
	return $('#last_items_arena').length > 0;
}

function appendCheckbox($div, id, label) {
	$div.append('<input type="checkbox" id="' + id +  '" >');
	$div.append('<label for="' + id + '">' + label + '</label>');
}

function generateArenaPhrase() {
	var parts = [];
	var keys = ['hit', 'heal', 'pray'];
	for (i in keys) {
		var key = keys[i];
		if ($('#say_' + key).is(':checked')) {
			parts.push(get_random_phrase(key));
		}
	}
	// TODO: shuffle parts
	// TODO: smart join: .... , .... и ....
	var msg = parts.join(', ');
	if(msg.length < 80) {
		return msg;
	} else {
		return generateArenaPhrase();
	}
}

function getArenaSayBox() {
	// TODO: стиль для бокса, чтобы он был по центру
	var $div = $('<div id="arena_say_box"></div>');

	appendCheckbox($div, 'say_hit', 'бей');
	appendCheckbox($div, 'say_heal', 'лечись');
	appendCheckbox($div, 'say_pray', 'молись');

	$div.click(function() { sayToHero(generateArenaPhrase);});
	return $div;
}

function improveSayDialog() {
	if (isAlreadyImproved( $('#aog_box') )) return;

	// Hide hint
	$('#aog_hint_label').hide();

	// Add links
	var $box = $('#hero_actsofgod');

	if (isArena()) {
		$('#god_phrase_form').before(getArenaSayBox());
	} else {
		addSayPhraseAfterLabel($box, 'Прана', 'жертва', 'sacrifice');
		addSayPhraseAfterLabel($box, 'Прана', 'ещё', 'pray');

		// Show timeout bar after saying
		$('#god_phrase_btn').click(function () {timeout_bar.start(); return true;});
	}

	// Save stats
	stats.setFromLabelCounter('prana', $box, 'Прана');
}

// ----------- Вести с полей ----------------
function improveFieldBox() {
	if (isAlreadyImproved( $('#hero_details fieldset') )) return;

	// Add links
	var $box = $('#hero_details');

	addSayPhraseAfterLabel($box, 'Противник', 'бей', 'hit');
}

// ---------- Stats --------------

function improveStats() {
	if (isAlreadyImproved( $('#hs_box') )) return;

	// Add links
	var $box = $('#hero_stats');

	addSayPhraseAfterLabel($box, 'Уровень', 'ещё', 'exp');
	addSayPhraseAfterLabel($box, 'Здоровье', 'ещё', 'heal');
	addSayPhraseAfterLabel($box, 'Золота', 'клад', 'gold');
	//addSayPhraseAfterLabel($box, 'Задание', 'отмена', 'cancel_task');
	addSayPhraseAfterLabel($box, 'Задание', 'ещё', 'do_task');
	//addSayPhraseAfterLabel($box, 'Смертей', 'ещё', 'die');
	addSayPhraseAfterLabel($box, 'Столбов от столицы', 'дом', 'town');

	// Save stats
	// Парсер строки с золотом
	var gold_parser = function(val) {
		return parseInt(val.replace(/[^0-9]/g, ''));
	};

	stats.setFromProgressBar('exp', $('#pr3'));
	stats.setFromProgressBar('task', $('#pr4'));
	stats.setFromLabelCounter('level', $box, 'Уровень');
	stats.setFromLabelCounter('inv', $box, 'Инвентарь');
	stats.setFromLabelCounter('heal', $box, 'Здоровье');
	stats.setFromLabelCounter('gold', $box, 'Золота', gold_parser);
	stats.setFromLabelCounter('monster', $box, 'Убито монстров');
 	stats.setFromLabelCounter('death', $box, 'Смертей');
 	stats.setFromLabelCounter('brick', $box, 'Кирпичей для храма', parseFloat);
}

// ---------- Equipment --------------

function improveEquip() {
	if (isAlreadyImproved( $('#equipment_box') )) return;

	// Save stats
	var $box = $('#equipment_box');

	stats.setFromEquipCounter('equip1', $box, 'Оружие');
	stats.setFromEquipCounter('equip2', $box, 'Щит');
	stats.setFromEquipCounter('equip3', $box, 'Голова');
	stats.setFromEquipCounter('equip4', $box, 'Тело');
	stats.setFromEquipCounter('equip5', $box, 'Руки');
	stats.setFromEquipCounter('equip6', $box, 'Ноги');
	stats.setFromEquipCounter('equip7', $box, 'Талисман');
}

// -------------- Переписка ---------------------------

function improveMailbox() {
	if (isAlreadyImproved( $('#recent_friends') )) return;

	// Ссылки на информацию о боге по средней кнопке мыши
	$('#recent_friends .new_line a')
		.each(function(ind, obj) {
				  if (obj.innerHTML == 'показать всех знакомых'
					  || obj.innerHTML.substring(0, 20) == 'скрыть всех знакомых') {
					  return;
				  }
				  obj.href = "http://godville.net/gods/"+obj.innerHTML;
			  });

}

// -------- do all improvements ----------
var ImproveInProcess = false;
function improve() {
	ImproveInProcess = true;
	try {
		improveLoot();
		improveSayDialog();
		improveStats();
		improveFieldBox();
		improveEquip();
		improveMailbox();
	} catch (x) {
		GM_log(x);
	} finally {
		ImproveInProcess = false;
	}
}



// Main code
$(function() {
	  logger.create();
	  timeout_bar.create();
	  menu_bar.create();
	  updater.check();

	  improve();

	  // event listeners
	  $(document).bind("DOMNodeInserted", function () {
						   if(!ImproveInProcess)
							   setTimeout(improve, 1);
					   });
	  $('body').hover( function() { logger.update(); } );

});
