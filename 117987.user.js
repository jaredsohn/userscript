// ==UserScript==
// @name           TWSmallInventPics
// @namespace      Narulez
// @author         Narulez
// @description    It decreases the size of pictures in inventory, stores, market and in the merchant for easier visualization.
// @description    IT: Diminuisce la grandezza degli oggetti nell'inventario, nei negozi, nel mercante e nel mercato per una più facile visualizzazione.
// @homepageURL    http://userscripts.org/scripts/show/117987
// @supportURL     http://userscripts.org/scripts/discuss/117987
// @updateURL      http://userscripts.org/scripts/source/117987.meta.js
// @installURL     http://userscripts.org/scripts/source/117987.user.js
// @version        1.1
// @history        1.1 Added link to tranlators' profile
// @history        1.0 Initial Version
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @include        http://*.the-west.*/game.php*
// ==/UserScript==
/*global $, top, ScriptUpdater */
ScriptUpdater.check(117987, '1.1');
var TWSIP = {};
TWSIP.del = function (key) {
	return window.localStorage.removeItem(key);
};
TWSIP.set = function (key, value) {
	return window.localStorage.setItem(key, value);
};
TWSIP.get = function (key) {
	return window.localStorage.getItem(key);
};
TWSIP.checkForSetting = function () {
	if (TWSIP.get('TWSIP_buttonsize') === 'normal') {TWSIP.button_normal(); } else if (TWSIP.get('TWSIP_buttonsize') === 'small') {TWSIP.button_small(); }
};
TWSIP.twsip_settings_visible = function () {
	$('#twsip_settings').css('display', 'block');
	TWSIP.checkForSetting();
};
TWSIP.twsip_settings_invisible = function () {
	$('#twsip_settings').css('display', 'none');
	TWSIP.checkForSetting();
};
TWSIP.button_small = function () {
	var small;
	if ($('#twsip_smallcss')[0]) {small = $('#twsip_smallcss'); } else {small = $('<style id="twsip_smallcss"></style>').attr('type', 'text/css'); }
	small.text('#bag {left: -25px; right: 0px; width: 330px;}\n' +
		'.item_trader_own_inv .bag_item, .trader_inv .bag_item, .own_inv .bag_item, #bag .bag_item_trader {-moz-transform: scale(0.5) !important; -webkit-transform: scale(0.5) !important; -ms-transform: scale(0.5) !important; -o-transform: scale(0.5) !important; transform: scale(0.5) !important; margin:-17px}\n' +
		'#bag .bag_item_trader .bag_item_count, .own_inv .bag_item .bag_item_count, .item_trader_own_inv .bag_item .bag_item_count {-moz-transform: scale(1.3); -webkit-transform: scale(1.3); -ms-transform: scale(1.3); -o-transform: scale(1.3); -transform: scale(1.3); margin: 2px 4px;}\n' +
		'.trader_inv .bag_item .price {-moz-transform: scale(1.5); -webkit-transform: scale(1.5); -ms-transform: scale(1.5); -o-transform: scale(1.5); transform: scale(1.5);}');
	if (!$('#twsip_smallcss')[0]) {$('head').append(small); }
	$('#small').removeClass('button_grey');
	$('#normal').addClass('button_grey');
	TWSIP.set('TWSIP_buttonsize', 'small');
};
TWSIP.button_normal = function () {
	$('#twsip_smallcss').remove();
	$('#small').addClass('button_grey');
	$('#normal').removeClass('button_grey');
	TWSIP.set('TWSIP_buttonsize', 'normal');
};
TWSIP.img = {
	twsip_ButtonLink: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMU7nOPkAAAQSSURBVEhLtVZrU1NXFLV/oe20KC8JGoQAGkhCIMqzRJCiPAIocaCAUHkbGhioWg0DGdDSYVTGQGgKpR/4l8uzdu6+k4uo/WJmzuTc3HP22mvtV76Jj4Vx4Wt/CNJZV4HonQBG7zbInr/1t3jhvZyP2pJ8eIsv4UbRRVm65zvug+5iBEoL5bzaoh3aU1sX+II/1phLvMCXvMCLNSUFAsLlM3su3SuIOGHuKhDv0w7v0q4opSDVhXk2EzFgFoGVwfXCHx17suCisdzz9J7G+c4Bwhf0nh4IK0se9VYN5j43eMrQc7sdjycfYXb6MaID/eIU79MO7TnkUja23gak1mIj3lp7shJZy68i8nMntre2cHp6iudPn2Kwu8tmxXPKwpaLiNRU9ReprICrJBoTyhOu92M1voT9/X388ewZHvTdQ3PtdfTd6cDgve5s/Fz5TiaNniIBoAE1RuNVBT9IHPgbnxkX7lt8N7C0MId3795icW4GPeE2DBnj87MzmBwfQ01RnpylTZvJRyDGC01Xykav+MyLgavFuH2zHiu/xZBOH2Dn9WvM/jqF2OICEi9fYuKXEXGOi2o4QOihpiy/KZ8y0edQ+RV0tTYh/mQBqdR7/Ht8jN3dXaytrWIp9gTzM9Poamm0Y0jnnEwkDgTKpq5KRCZ8DlW40dPeirXlOA4PD3F0dIRX29tYmJvFcKQPvR3t+KnOh7oyly052f9vJjerKxDp6sTz39fwTyaDTOZvrBtpxh4Ooy3oR71xIOB22bWl2fhZJr7SIoQ8btSbVG0xWRON9GJjPYFjI086nZaUHRkaQKvPC785m1s/qgKV+IiJZlfw2hV0tzUj2t8rqTkx8hBbyU38d3KCg4N9rK4sY6jnrknZavhdRRI3JgSzz3eZNZXNSs/F70Q2h1w8yJgwcIkXL/DXzp9Ibm7i7Zs3ODEAe3t7iJvgshZuVZVndTcGtZ+Jk1bT1KJmPB0g2QIswMToiHi9Z2rglanojIlBKpXC8lIMfR1hhCrLpBvQY/VajTu+zRn2QwcI+xVB5kwf2jEsxobvSz9aiceRSCQwOTaKZm9V1rgpNllWy7FbUE4rkjo7y0TlemBiER2MIGgyhjXB3F83INNTj9DorRStK/K+ReWl70V7AvCu1pTdTBmj3Jjk9q4m463fXYJwKIipiXEkk0lsbGxg3KRrkwHJNkzTQCUG2UYqjdOaK/bsOdu7zuvCwwMRzJtCiy0uYtKAtTcEjGEzyKxYqMfUXRqrFXSdP+d24bPzhO28zVQwjQevldpjlyA2G4uJDrfPzhOinjcZJU6Uh1PQ8jR3r8HVb4J8cjLKuDxnxksN8M+EtZzPWUYK/sUZ/6l/KzK/rVlOptr+dc/nWx6XrC/+W2Hgv+b6ACUpClNrn61xAAAAAElFTkSuQmCC",
};
TWSIP.Text = {
	'options'		: 'TWSIP Options',
	'options_desc'	: "Select size of inventory objects:",
	'option_hover'	: "You DON'T need to refresh the page to see these changes.",
	'small'			: 'Small',
	'normal'		: 'Normal',
	'close'			: 'Close',
	'lang_name'		: 'English (Default)',
	'select'		: 'Select',
	'select_lang'	: 'Select language (force) ',
	'select_desc'	: 'You need to refresh the page to see these changes.',
	'trad'			: 'Translator: ',
};
TWSIP.Langs = {
	'it': {
		'options'		: 'Opzioni TWSIP',
		'options_desc'	: "Seleziona la dimensione degli oggetti nell'inventario:",
		'option_hover'	: "NON devi ricaricare la pagina per visualizzare queste modifiche.",
		'small'			: 'Piccola',
		'normal'		: 'Normale',
		'close'			: 'Chiudi',
		'lang_name'		: 'Italiano',
		'select'		: 'Seleziona',
		'select_lang'	: 'Seleziona lingua (forza) ',
		'select_desc'	: 'Devi ricaricare la pagina per visualizzare queste modifiche.',
		'trad'			: 'Traduttore: ',
		'trad_name'		: 'Narulez',
		'trad_link'		: {
			'it2': ['Builder', 178056],
			'en1': ['Narulez', 2452534],
		},
	},
	'en': {
		'lang_name'		: 'English',
		'trad_name'		: 'Narulez',
		'trad_link'		: {
			'it2': ['Builder', 178056],
			'en1': ['Narulez', 2452534],
		},
	},
};
TWSIP.init = function () {
	var logo_twsip, twsip_settings, stili, domain_hostMatch, domain, ln, force = TWSIP.get('TWSIP_lang'), type, name, tru, ttrad;
	domain_hostMatch = /(([a-z]+)\d+)\.the\-west((\.[a-z]+)?\.([a-z]+))/i.exec(top.location.host);
	domain = (domain_hostMatch ? (domain_hostMatch[2] || domain_hostMatch[5]) : false) || 'en';
	ln = (force) ? (TWSIP.Langs[force]) ? force : domain : domain;
	if (TWSIP.Langs[ln]) {
		for (type in TWSIP.Langs[ln]) {
			TWSIP.Text[type] = TWSIP.Langs[ln][type];
		}
	}
	tru = (domain_hostMatch[1] && TWSIP.Langs[ln].trad_link[domain_hostMatch[1]]);
	ttrad = TWSIP.Text.trad + (tru ? '<a title="' + TWSIP.Text.trad_link[domain_hostMatch[1]][0] + '" href="javascript:AjaxWindow.show(\'profile\',{char_id: ' + TWSIP.Text.trad_link[domain_hostMatch[1]][1] + '}, ' + TWSIP.Text.trad_link[domain_hostMatch[1]][1] + ');">' : '') + TWSIP.Text.trad_name + (tru ? '</a>' : '');
	logo_twsip = $("<div id='logo_twsip'></div>").append($('<a id="twsip_ButtonLink" href="#"></a>').click(TWSIP.twsip_settings_visible).append($('<img>').attr('src', TWSIP.img.twsip_ButtonLink).attr('alt', TWSIP.Text.options).attr('title', TWSIP.Text.options)));
	stili = "#twsip_ButtonLink {background: none !important; cursor: pointer; margin-left: 103px; z-index: 10;}" +
		"#twsip_settings {position: absolute; left: 20%; top: 0px; width: 75%; height: 600px; index: 899999; display: none;}" +
		"#twsip_settings_inner {background: url(images/messagebox/messagebox_bg.png) repeat scroll 0% 0%; overflow: hidden; position: absolute; width: 350px; height: 200px; margin-left: -28%; margin-top: -100px; top: 50%; left: 50%; color: rgb(0, 0, 0); z-index: 900000;}" +
		"#twsip_settings_textbox {padding: 15px 15px 60px; text-align: center;}" +
		"#twsip_settings_title {display: block; margin-bottom: 10px;}" +
		"#twsip_settings_buttonsize a {cursor:pointer;}" +
		"#twsip_settings_close {padding-bottom: 12px; position: absolute; bottom: 0px; left: 0px; text-align: center; width: 350px;}" +
		"#twsip_settings_bordertop {background: url(images/messagebox/messagebox_bordertop.png) repeat-x scroll 0% 0%; width: 100%; height: 10px; left: 0px; top: 0px; position: absolute;}" +
		"#twsip_settings_borderbottom {background: url(images/messagebox/messagebox_borderbottom.png) repeat-x scroll center bottom; width: 100%; height: 10px; left: 0px; bottom: 0px; position: absolute;}" +
		"#twsip_settings_borderleft {background: url(images/messagebox/messagebox_bordervertical.png) repeat-y scroll 0% 0%; width: 10px; height: 100%; left: 0px; top: 0px; position: absolute;}" +
		"#twsip_settings_borderright {background: url(images/messagebox/messagebox_bordervertical.png) repeat-y scroll right center; width: 10px; height: 100%; right: 0px; top: 0px; position: absolute;}" +
		"#twsip_settings_cornertopleft {background: url(images/messagebox/messagebox_cornerstop.png) no-repeat scroll 0% 0%; width: 20px; height: 10px; left: 0px; top: 0px; position: absolute;}" +
		"#twsip_settings_cornerbottomleft {background: url(images/messagebox/messagebox_cornersbottom.png) no-repeat scroll left bottom; width: 20px; height: 10px; left: 0px; bottom: 0px; position: absolute;}" +
		"#twsip_settings_cornertopright {background: url(images/messagebox/messagebox_cornerstop.png) no-repeat scroll right top; width: 20px; height: 10px; right: 0px; top: 0px; position: absolute;}" +
		"#twsip_settings_cornerbottomright {background: url(images/messagebox/messagebox_cornersbottom.png) no-repeat scroll right bottom; width: 20px; height: 10px; right: 0px; bottom: 0px; position: absolute;}";
	twsip_settings = $("<div id='twsip_settings'></div>").append($("<div id='twsip_settings_inner'></div>")
		.append($("<style></style>")
			.attr('type', 'text/css')
			.text(stili.replace(/\}/g, '}\n'))
			)
		.append($("<div id='twsip_settings_textbox'></div>")
			.append($("<h2 id='twsip_settings_title'></h2>")
				.text(TWSIP.Text.options)
				.append("<br/>")
				)
			.append($("<div id='twsip_settings_buttonsize'></div>")
				.text(TWSIP.Text.options_desc)
				.append("<br/>")
				.append($("<a id='small' href='#'></a>")
					.addClass('button_wrap')
					.addClass('button')
					.attr('title', TWSIP.Text.option_hover)
					.click(TWSIP.button_small)
					.append("<span class='button_left'></span>")
					.append("<span class='button_middle'>" + TWSIP.Text.small + "</span>")
					.append("<span class='button_right'></span>")
					.append("<span style='clear: both;'></span>")
					)
				.append($("<a id='normal' href='#'></a>")
					.addClass('button_wrap')
					.addClass('button')
					.attr('title', TWSIP.Text.option_hover)
					.click(TWSIP.button_normal)
					.append("<span class='button_left'></span>")
					.append("<span class='button_middle'>" + TWSIP.Text.normal + "</span>")
					.append("<span class='button_right'></span>")
					.append("<span style='clear: both;'></span>")
					)
				)
			.append("<br/>")
			.append($("<div></div>")
				.append($("<span></span>").attr('title', TWSIP.Text.select_desc).text(TWSIP.Text.select_lang))
				.append($("<select id='twsip_lang'></select>").attr('title', TWSIP.Text.select_desc).append("<option value='none'>" + TWSIP.Text.select + "</option>"))
				)
			.append($("<div></div>")
				.append($("<span id='twsip_trad'></span>").html(ttrad))
				)
			.append($("<div id='twsip_settings_close'></div>")
				.append($("<a id='twsip_close' href='#'></a>")
					.addClass('button_wrap')
					.addClass('button')
					.click(TWSIP.twsip_settings_invisible)
					.append("<span class='button_left'></span>")
					.append("<span class='button_middle'>" + TWSIP.Text.close + "</span>")
					.append("<span class='button_right'></span>")
					.append("<span style='clear: both;'></span>")
					)
				)
			)
		.append("<div id='twsip_settings_bordertop'></div>")
		.append("<div id='twsip_settings_borderbottom'></div>")
		.append("<div id='twsip_settings_borderleft'></div>")
		.append("<div id='twsip_settings_borderright'></div>")
		.append("<div id='twsip_settings_cornertopleft'></div>")
		.append("<div id='twsip_settings_cornerbottomleft'></div>")
		.append("<div id='twsip_settings_cornertopright'></div>")
		.append("<div id='twsip_settings_cornerbottomright'></div>")
		);
	$('#left_menu').append(logo_twsip);
	$('#left_top').append(twsip_settings);
	for (name in TWSIP.Langs) {
		if (TWSIP.Langs[name].lang_name) {
			$('#twsip_lang').append($('<option' + (name === force ? ' selected' : '') + '></option>').attr('value', name).text(TWSIP.Langs[name].lang_name));
		}
	}
	$('#twsip_lang')[0].addEventListener('change', function () {
		var lan = $('#twsip_lang option:selected')[0] ? $('#twsip_lang option:selected')[0].value : false;
		if (TWSIP.Langs[lan] && lan !== 'none') {TWSIP.set('TWSIP_lang', lan); } else {TWSIP.del('TWSIP_lang'); }
	});
	$('#twsip_trad a').click(TWSIP.twsip_settings_invisible);
	TWSIP.checkForSetting();
};
TWSIP.init();