// ==UserScript==
// @name The-West Sweets
// @namespace TWSweets
// @date 9 November, 2012.
// @description TWSweets - mini-pack of Sh3l1's scripts.
// @author Code, ru, eng lang - Sh3l1 a.k.a Pil3p0m (Main)
// @author [Italian] lang - anto81
// @author TWS DX Map - ПоросячийКот
// @version 0.6.1
// @include http://*.the-west.*
// @include http://*.beta.the-west.*
// @include http://zz1w1.tw.innogames.net/game.php*
// @exclude http://www.the-west.*
// @exclude http://forum.the-west.*
// ==/UserScript==

    /* what todo
	 Вшить переодевалку от сторана (маловероятно, ибо код у переодевалки просто "божественнен")
	 Возможность поиска серебряных и золотых работ на карте. (Картинка карты - ПоросячийКот)
	*/
	
	(function(fn) {
		var script = document.createElement('script');
		script.type = "application/javascript";
		script.textContent = '(' + fn + ')();\nTWSweets.Core.init();';
		document.body.appendChild(script);
		script.parentNode.removeChild(script);
	})(function() {
	  if(/http:\/\/.+\.the-west\..*\/game\.php.*/.test(window.location.href) && !window.hasOwnProperty("TWSweets")) { 

	  TWSweets = {
						version: "0.6.1",
						revision: 54,
						author_url: "http://sh3l1.koding.com/about",
						author_name: "Sh3l1",
						langs: {
							ru_RU: {},
							en_US: {}
						},
						Config: {},
						Core: {},
						Chat: {},
						DuelSafer: {
							GUI: {}
						},
						DX: {
							GUI: {}
						},
						FastTasks: {},
						icons: {},
						Menu: {},
						Patches: {},
						Settings: {},
						Updater: {},
						Wir: {}
	  };
	  var TWS = TWSweets;
	  TWS.langs.ru_RU = {
		add : "Добавить",
		alliance : "альянс",
		auto_update : "Проверка обновлений",
		auto_update_title : "Разрешить автоматическую проверку обновлений?",
		bank : "Банк",
		beeper_sound : "Звук уведомления:",
		beeper_set_sound : "Установить",
		changed : "Изменено успешно!",
		chat_title : "Чат",
		church : "Церковь",
		default : "Стандартный",
		dont_have_hotel: "У тебя не построен отель!",
		DuelSafer_ally : "Нападение на союзника",
		DuelSafer_ally_text : "О нет! Это союзник! Вы действительно хотите напасть?",
		DuelSafer_already_have : "Уже есть в списке городов/альянсов",
		DuelSafer_found : "DuelSafer.",
		DuelSafer_from_alliance : "Альянс: ",
		DuelSafer_from_town : "Город: ",
		DuelSafer_input_alliance : "Введите название альянса:",
		DuelSafer_input_town : "Введите название города:",
		DuelSafer_not_found : "Не найден такой город/альянс",
		DuelSafer_own_alliance_text : "О нет! Ты собираешься напасть на свой альянс! Серьезно?",
		DuelSafer_own_town_text : "О нет! Ты атакуешь жителя своего города!! Как такое могло произойти?!",
		dx_not_found: "К сожалению, ничего не найдено.",
		dx_show_on_map : "Показать на карте",
		dx_transit_time : "Расстояние",
		dx_warning : "Использование данного скрипта может привести к <b>блокированию</b> вашего аккаунта со стороны администрации. Допускается использование <b>только</b> на русских серверах игры.<br /> Используйте на свой страх и риск.<br />Продолжить?",
		dx_what_needed : "Что ищем?",
		enable_beeper : "Включить бипер",
		enable_beeper_title : "<b>Бипер</b> - звуковое уведомление о личном сообщении в чате",
		enable_select : "Выделение текста в 2.0",
		enable_select_title : "Включить возможность выделять мышью текст в 2.0",
		enable_town_button : "Включить кнопку \"Город\"",
		enable_town_title : "Добавляет справа кнопку <b>\"город\"</b>, которая содержит функции для быстрого управления \"городскими\" задачами. (Открыть сплетни, лечь спать в ближ. форт, рынок, церковь и т.п)",
		forum : "Сплетни",
		general : "Основные",
		HealthTL_to : "До полного восстановления здоровья: ",
		have_not_forts : "У тебя нет фортов!",
		listen : "Прослушать",
		main : "Главные настройки",
		market : "Рынок",
		need_reload : "Требуется перезагрузка страницы. Выполнить?",
		own_saloon : "Cалун",
		play_current_sound : "Воспроизвести текущий звук уведомления",
		patches_title : "Патчи (Модификации)",
		revision_current : "Текущая ревизия",
		revision_new : "Новая ревизия",
		settings : "Настройки",
		settings_reload : "Большинство настроек требует перезагрузки страницы",
		sheriff : "Шериф",
		sleep_in_fort : "Спать в ближ. форте",
		sleep_in_hotel : "Спать в своем отеле",
		switch_on : "Включить",
		to_last_page : "К последней странице",
		town : "Город",
		update_found : "Новая версия TWSweets.",
		update_found_html : "TWSweets обнаружил новую версию скрипта. Установить?",
		version_current : "Текущая версия",
		version_new : "Новая версия",
		wir_enabler : "Уменьшитель инвентаря.",
		wir_on_line : "на строку",
		wir_on_one_line : "Кол-во элементов на строку в инвентаре:",
		without_city : "Но у тебя же нет города!",
		your_character: "Ты"
	  };
	  TWS.langs.en_US = {
		add : "Hinzufügen",
		alliance : "Bündnis",
		auto_update : "Nach Updates suchen",
		auto_update_title : "Automatische Updates erlauben",
		bank : "Bank",
		beeper_sound : "Sound-Datei:",
		beeper_set_sound : "wechseln",
		chat_title : "Chat",
		changed : "Erfolgreich geändert!",
		church : "Kirche",
		default : "default",
		dont_have_hotel: "Du hast noch kein Hotel!",
		DuelSafer_ally : "Fremdes Bündnis angreifen",
		DuelSafer_ally_text : "Dieser Spieler ist von einem fremden Bündnis. Willst du ihn angreifen?",
		DuelSafer_already_have : "Es ist bereits in der Städte / Bündnis - Liste vorhanden",
		DuelSafer_found : "Duellspeicher",
		DuelSafer_from_alliance : "Bündnis: ",
		DuelSafer_from_town : "Stadt: ",
		DuelSafer_input_alliance : "Bündnisname eingeben:",
		DuelSafer_input_town : "Stadtname eingeben:",
		DuelSafer_not_found : "Stadt / Bündnis nicht gefunden",
		DuelSafer_own_alliance_text : "Du willst dein eigenes Bündnis angreifen. Bist du dir sicher?",
		DuelSafer_own_town_text : "Du kannst deine eigene Stadt nicht angreifen!",
		dx_not_found: "Leider wurde nichts gefunden.",
		dx_show_on_map : "Auf der Karte anzeigen",
		dx_transit_time : "Trans. Zeit",
		dx_warning : "Der Administrator könnte die Verwendung des Scripts <b>verbieten</b>.<br /> Es wird empfohlen das Script <b> nur auf einem russischen Server zu verwenden </ b>. Benutzung auf eigene Gefahr (Diese Funktion kann eine Sperrung deines Accounts hervorrufen). <br /> <br /> Fortfahren?",
		dx_what_needed : "Was suchst du?",
		enable_beeper : "Beeper aktivieren",
		enable_beeper_title : "<b>Beeper</b> - erklingt Warnung, wenn du eine private Nachricht bekommst",
		enable_select : "Wählbarer Text für 2.0",
		enable_select_title : "Wählbaren Text in 2.0 aktivieren",
		enable_town_button : "Erlauben \"Stadt\"",
		enable_town_title : "Du kannst sofort die meisten Aufgaben in deiner Stadt mit diesem Skript verwalten. Das Hinzufügen des Buttons wird mit dem gleichen Namen auf der rechten Seite angezeigt. (z.B.: schlafen gehen, nächstes Fort, Markt, Kirche etc.)",
		forum : "Forum",
		general : "Allgemein",
		listen : "Hören",
		have_not_forts : "Du hast noch keine Forts",
		HealthTL_to : "Zeit zu vollen Lebenspunkten: ",
		main : "Die wichtigsten Einstellungen",
		market : "Markt",
		need_reload : "Die Seite muss neu geladen werden. Willst du das tun?",
		own_saloon : "Eigener Saloon",
		patches_title : "Patches (Modifikationen)",
		play_current_sound : "Den aktuellen Sound abspielen",
		revision_current : "aktuelle Version",
		revision_new : "neue Version",
		settings : "Einstellungen",
		settings_reload : "Die meisten Einstellungen erfordern das neue Laden der Seite. (F5)",
		sheriff : "Sheriff",
		sleep_in_fort : "In der Kaserne schlafen",
		sleep_in_hotel : "Im eigenen Hotel schlafen",
		switch_on : "erlauben",
		to_last_page : "Gehe zur letzten Seite",
		town : "Die Stadt",
		update_found : "Neue Version von TWSweets!",
		update_found_html : "TWSweets hat eine neue Version des Skripts. Willst du sie installieren?",
		version_current : "aktuelle Version",
		version_new : "Neue version",
		wir_enabler : "Inventar - Reduzierer.",
		wir_on_line : "in einer Zeile",
		wir_on_one_line : "Anzahl der Items in einer Zeile:",
		without_city : "Du hast keine Stadt",
		your_character: "Dein Charakter"
	  };
	  
	TWSweets.langs.it_IT = {
		add : "Aggiungere",
		alliance : "Alleanza",
		auto_update : "Verificare la presenza di aggiornamenti",
		auto_update_title : "Permettere il controllo automatico degli aggiornamenti",
		bank : "Banca",
		beeper_sound : "File audio:",
		beeper_set_sound : "File audio",
		chat_title : "Chat",
		changed : "Cambiato con successo!",
		church : "Chiesa",
		default : "Predefinito",
		dont_have_hotel: "Non si dispone di un albergo!",
		DuelSafer_ally : "Alleato attaccato",
		DuelSafer_ally_text : "Questo giocatore e un alleato. Attaccare lui in ogni caso?",
		DuelSafer_already_have : "E ‘gia presente nella lista citta / alleanze",
		DuelSafer_found : "Duello sicuro.",
		DuelSafer_from_alliance : "Alleanza: ",
		DuelSafer_from_town : "Citta: ",
		DuelSafer_input_alliance : "Inserisci il nome del alleanza:",
		DuelSafer_input_town : "Inserisci il nome della citta:",
		DuelSafer_not_found : "Citta/alleanza non trovata",
		DuelSafer_own_alliance_text : "Sei sicuro di voler attaccare questa alleanza?",
		DuelSafer_own_town_text : "E’ la tua citta! Non si puo attaccare la propria citta!",
		dx_not_found: "Purtroppo non e stato trovato.",
		dx_show_on_map : "Visualizza sulla mappa",
		dx_transit_time : "Distanza",
		dx_warning : "L'amministrazione potrebbe vietare l'utilizzo di questo script. Si consiglia di utilizzare lo script solo sui server russi. Usatelo a vostro rischio e pericolo! Continuare?",
		dx_what_needed : "Cosa stai cercando?",
		enable_beeper : "Abilita segnale acustico",
		enable_beeper_title : "Segnale acustico – suono di avviso se si ottiene un messaggio privato",
		enable_select : "Testo selezionabile per 2.0",
		enable_select_title : "Abilita testo selezionabile in 2.0",
		enable_town_button : "Attiva pulsante  \"Citta\"",
		enable_town_title : "Con questo script si puo immediatamente gestire la maggior parte dei compiti della tua citta, grazie all'aggiunta del pulsante citta sul lato destro. (Es.: voci aperte, andare a dormire al piu vicino forte, mercato, chiesa ecc.)",
		forum : "Forum",
		general : "Generale",
		listen : "Ascoltare",
		have_not_forts : "Non ci sono forti",
		HealthTL_to : "Recupero totale della salute in: ",
		main : "Impostazioni principali",
		market : "Mercato",
		need_reload : "La pagina ha bisogno di essere ricaricata. Procedere?",
		own_saloon : "Proprio saloon",
		patches_title : "Patch (Modifiche)",
		play_current_sound : "Ascolta il suono corrente",
		revision_current : "Versione corrente",
		revision_new : "Nuova versione",
		settings : "Impostazioni",
		settings_reload : "Per la maggior parte delle impostazioni e necessario ricaricare la pagina",
		sheriff : "Sceriffo",
		sleep_in_fort : "Dormire in caserma",
		sleep_in_hotel : "Dormire nel proprio albergo",
		switch_on : "Abilita",
		to_last_page : "Vai all'ultima pagina",
		town : "Citta",
		update_found : "Nuova versione di TWSweets!",
		update_found_html : "TWSweets ha trovato la nuova versione dello script. installarlo?",
		version_current : "Versione corrente",
		version_new : "Nuova versione",
		wir_enabler : "Riduttore di inventario.",
		wir_on_line : "Su una linea",
		wir_on_one_line : "Numero di articoli su una linea:",
		without_city : "Non si ha una citta!",
		your_character : "Il tuo personaggio"
	};
	  
	  TWS.icons.tw20 = 'data:image/png;base64,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';
	  TWS.icons.tw20_town = "data:image/png;base64,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";
	  TWS.icons.map = 'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAtAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2RjQwMkZGNTI2MjExRTI4RkE1ODFEMDI3QUFBQ0I0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2RjQwMzAwNTI2MjExRTI4RkE1ODFEMDI3QUFBQ0I0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDZGNDAyRkQ1MjYyMTFFMjhGQTU4MUQwMjdBQUFDQjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDZGNDAyRkU1MjYyMTFFMjhGQTU4MUQwMjdBQUFDQjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAKBwcHCAcKCAgKDgkICQ4RDQoK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';	
		// Добавляем стили.
	  TWS.Core.addStyle = function() {
		var style = ".tws_items { min-height: 50px; font-weight: normal; width: 100%; background: rgba(175, 146, 94, 0.5); top: 5px; position: relative; border: 1px solid #000000; -moz-border-radius: 7px; -webkit-border-radius: 7px; -khtml-border-radius: 7px; -o-border-radius: 7px; border-radius: 7px; padding: 3px 3px 3px 0px; }\n"
		style += ".tws_duelsafer_block { display: inline-block; position: relative; width: 45%; }\n"
		style += ".tws_duelsafer_block .tw2gui_button { float: right; }\n";
		style += "#tws_duelsafer_towns { float: right; right: 25px; }\n";
		style += ".tws_item { padding: 3px; margin: 0px 0px 3px 3px; background: rgba(163, 163, 163, 0.60); border: 1px solid #000000; -moz-border-radius: 3px; -webkit-border-radius: 3px; -khtml-border-radius: 3px; -o-border-radius: 3px; border-radius: 3px; display: inline-block }\n";
		style += ".tws_item a { color: #A80000 }";
		style += ".tws_item b { cursor: pointer; }"
		style += "#tws_main { position: relative; padding: 0px 10px 10px 10px; height: 100% }\n";
		style += "#tws_gen_patches { margin-top: 10px; }\n"
		style += "#tws_other_settings { margin: 0px 10px 0px 10px; }\n"
		style += "#tws_duelsafer { position: relative; left: 10px; font-weight: bold;}\n";
		style += "#tws_icon10 { cursor: pointer; position: absolute; right:-36px; top: 10px;}\n";
		style += ".tws_block { display: block; border: 1px solid #000000; -moz-border-radius: 10px; -webkit-border-radius: 10px; -khtml-border-radius: 10px; -o-border-radius: 10px; border-radius: 10px; background: rgba(175, 146, 94, 0.5); padding: 10px;}\n"
		style += ".tws_block.settings { width: 45.2%; box-shadow: 0px 2px 5px #333; float: left;}\n";
		style += "#tws_info { font-size:10px; position: absolute; bottom: -8px; right: 0px; }\n";
		style += "#tws_healthtl { position: absolute; bottom: 17px; right: 40px; font-size: 8px; color: #000000; cursor: help; text-shadow: 0px 0px 3px white; }";
		style += ".show_priority { display: block !important; }"
		style += ".tws_block hr { color: #000; background-color: #000; border: 0px none; height: 1px; box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.6); margin: 5px 0px 5px 0px; }\n";
		style += ".tws_block hr.vertical { width: 1px; height: 180px; box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.6), -1px 0px 1px rgba(255, 255, 255, 0.6) }";
		style += "#tws_beeper { position: absolute; z-index: 15; left: 50%; height: 145px; bottom: 15px; margin-left: -320px;}\n";
		style += "#tws_chat { margin: 10px 0px 0px 10px; }\n";
		style += ".tws_county { width: 82px; height: 122px; background: rgb(185, 156, 0); float:left; margin: 1px; border: 1px solid rgb(197, 158, 0); }\n";
		style += ".tws_county.middle { height: 82px; }";
		style += "#tws_counties { width: 600px; height: 263px; background: url('" + TWS.icons.map + "') no-repeat; margin: 0 auto; border: 1px solid #000; }\n"
		style += "#tws_dx { width: 100%; opacity: .85; }\n";
		style += "#tws_dx_control { width: 600px; height: 190px; }\n";
		style += "#tws_jobs_list { width: 205px; border-right: solid 1px #000; height: 190px }\n";
		style += "#tws_jobs_list .tw2gui_jobsearchbar_results { overflow-y: auto; max-height: 160px; width: 180px; }";
		style += ".twsweets.big .tw2gui_window_inset { background: url('http://www.the-west.ru/images/window/premium/premium_buy_bg.jpg') no-repeat; }\n";
		style += ".twsweets.big .tw2gui_inner_window_bg2 { background-repeat: repeat-y; }\n";
		style += ".twsweets.big .tw2gui_window_content_pane { -webkit-transition: opacity 0.5s linear; -moz-transition: opacity 0.5s linear; -o-transition: opacity 0.5s linear; transition: opacity 0.5s linear; }\n"
		style += "#tws_dx_header { text-align: center; width: 380px; height: 44px; position: absolute; right: 51px; bottom: 183px; border-bottom: solid 1px #000; }\n";
		style += "#tws_jobs_container { width: 400px; bottom: 22px; right: 41px; position: absolute; height: 160px; text-align: center; overflow-y: hidden; overflow-x: auto; }\n";
		style += ".map_mark { width: 5px; height: 5px; position: relative; border-radius: 3px; border: 1px solid #FFF }\n"
		style += ".twsweets .job_ico { width: 67px; height: 67px; position: absolute; }\n";
		style += ".twsweets .job_ico img { position: relative; left: -12px; bottom: 12px; cursor: pointer; }\n";
		style += ".twsweets .job_block { width: 190px; height: 63px; margin: 5px; float: left; }\n";
		style += ".twsweets .job_info { background: url(http://www.the-west.ru/images/interface/tasks/time.png) no-repeat; background-position-x: -44px; margin-top:10px; height: 22px; width: 140px; float: right; }\n";
		style += ".twsweets .job_info p { padding-top: 3px; padding-left: 4px; font-size: 12px; }\n";
		style += ".twsweets .centermap { background-image: url(http://www.the-west.ru/images/map/icons/instantwork.png); width: 20px; height: 20px; cursor: pointer; position: relative; top: 20px; z-index: 1; left: 40px; margin-top: -20px;  }"
		
		$("head").append('<style type="text/css">' + style + '</style>');
	  }
	  
	  TWS.Core.checkLocalStorage = function() {
	  if (window.localStorage) return true;
		window.localStorage = {
			getItem: function (sKey) {
				if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
					return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
				},
			setItem: function (sKey, sValue) {
				if(!sKey) { return; }
					document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
					this.length = document.cookie.match(/\=/g).length;
			},
			length: 0,
			removeItem: function (sKey) {
				if (!sKey || !this.hasOwnProperty(sKey)) { return; }
					document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				this.length--;
			},
			hasOwnProperty: function (sKey) {
				return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
			}
		};
	  }
		TWS.Core.haveObject = function(obj, value) {
		var answer = false;
		for (key in obj) {
			if (typeof obj[key] == "string" && obj[key].toLowerCase() == value.toLowerCase()) {
				answer = true; break } 
		}
		return answer;
	  }
	  TWS.Core.addToStorage = function(key, value) {
		  this.checkLocalStorage();
		  localStorage.setItem(key, JSON.stringify(value));
	  }
	  TWS.Core.getFromStorage = function(key) {
		this.checkLocalStorage();
		return $.parseJSON(localStorage.getItem(key));
	  }
	  
	  /** Class Config START **/
	  
	  TWS.Config.openConfig = function(tab) {
		var info = $("<div id=\"tws_info\"></div>")
		.append("<a href=\"" + TWS.author_url + "\" target=\"_blank\">" + TWS.author_name + "</a>. v" + TWS.version);
		var mainTab = $(this.mainTab().hide());
		var DuelSafer = $(TWS.DuelSafer.GUI.tab().hide());
		var DeluxeJobs = $(TWS.DX.GUI.tab().hide());
		var openTab = function(win, id) {
			var self = TWSweets.Config
			self.win.activateTab(id);
			switch (id) {
			case 'tws_main':
				self.win.setTitle('TWSweets ' + TWS.lang.settings);
				mainTab.fadeIn("fast");
				DuelSafer.hide();
				DeluxeJobs.hide();
				self.win.setSize(748, 471);
			break;
			case 'tws_ds':
				self.win.setTitle('DuelSafer');
				mainTab.hide();
				DuelSafer.fadeIn("fast");
				DeluxeJobs.hide();
				self.win.setSize(748, 471);
			break;
			case 'tws_dx': 
				self.win.setTitle('Deluxe Jobs');
				mainTab.hide();
				DuelSafer.hide();
				if (!TWS.Settings.dx_force) return new MessageDialog("TWSweets Deluxe Jobs").addButton('yes', function () {
					TWS.Core.switchSetting("dx_force", "true");
					TWS.Config.openConfig("tws_dx");
				}).addButton('no', function() { TWS.Config.openConfig("tws_main"); }).setText('<div class="messagedialog_icon system_icon_warning"></div><div style="margin-left: 75px;">' + TWS.lang.dx_warning + '</div>').setWidth(470).show();
				DeluxeJobs.fadeIn("fast");
				self.win.setSize(748, 620);
				if (!TWS.DX.Jobs) {
					self.win.showLoader();
					TWS.DX.getAllTiles(function() {
						TWS.DX.GUI.drawMyPos();
						self.win.hideLoader();
					});
				} else TWS.DX.GUI.drawMyPos();
			break;
			default:
				self.win.setTitle('TWSweets ' + TWS.lang.settings);
				mainTab.show();
				DuelSafer.hide();
				DeluxeJobs.hide();
				self.win.setSize(748, 471);
			break;
			}
		}
		this.win = wman.open("twsweets", "TWSweets " + TWS.lang.settings, " bigwman nominimize noreload")
				.setMiniTitle("Settings")
				.addTab(TWS.lang.general, "tws_main", openTab)
				.addTab("DuelSafer", "tws_ds", openTab)
				.addTab("Deluxe Jobs", "tws_dx", openTab)
				.appendToContentPane("<br>")
				.appendToContentPane(mainTab)
				.appendToContentPane(DuelSafer)
				.appendToContentPane(DeluxeJobs)
				.appendToContentPane(info)
				.addClass("big");
		this.win
		
	  openTab(this.win, tab)
	  }
	  
	  TWS.Config.mainTab = function() {
		var tws_main = $('<div id="tws_main" style="display: block;"></div>');	
			var tws_main_wir = $('<div id="tws_wir" class="tws_block settings"></div>')
			.append("<b>Inventory Reducer</b><hr>")
			.append(new tw2gui.checkbox(TWS.lang.switch_on + " WIR", "", function (state) { TWS.Core.switchSetting("wir_enabled", state); }).setSelected(TWS.Settings.wir_enabled).setId("tws_wir_enabler").setTitle("<b>WIR</b> <i>(West Inventory Reducer)</i>: <br /> " + TWS.lang.wir_enabler).getMainDiv())
			.append("<br /><br /><p>" + TWS.lang.wir_on_one_line + "</p>")
			.append(new tw2gui.combobox("wir_sizer").addItem(4, "4 " + TWS.lang.wir_on_line).addItem(5, "5 " + TWS.lang.wir_on_line).addItem(6, "6 " + TWS.lang.wir_on_line).select(TWS.Settings.wir_size).addListener(function (v) {TWS.Core.switchSetting("wir_size",v);}).getMainDiv())
			.appendTo(tws_main);
			
			var tws_main_other = $('<div id="tws_other_settings" class="tws_block settings"></div>')
			.append("<b>" + TWS.lang.main + "</b><hr>")
			.append(new tw2gui.checkbox(TWS.lang.auto_update, "", function(state) { TWS.Core.switchSetting("auto_update", state); }).setId("tws_autoupdate_check").setSelected(TWS.Settings.auto_update).setTitle(TWS.lang.auto_update_title).getMainDiv())
			.append("<br /><br /><p>Language settings:</p>")
			.append(new tw2gui.combobox("tws_changelang").addItem("ru_RU", "Russian").addItem("en_US", "English").addItem("it_IT", "Italian").select(TWS.Settings.language).addListener(function(v) { TWS.Core.switchSetting("language", v); TWS.lang = TWS.langs[v]; var need = confirm(TWS.lang.need_reload); need && location.reload(true);}).getMainDiv())
			.appendTo(tws_main);
			
			var tws_main_patches = $('<div id="tws_gen_patches" class="tws_block settings"></div>')
			.append("<b>" + TWS.lang.patches_title + "</b><hr>")
			.append(new tw2gui.checkbox(TWS.lang.enable_select, "", function(state) {TWS.Core.switchSetting("enable_select", state)}).setSelected(TWS.Settings.enable_select).setTitle(TWS.lang.enable_select_title).getMainDiv())
			.append("<br /><br />")
			.append(new tw2gui.checkbox(TWS.lang.enable_town_button, "", function(state) { TWS.Core.switchSetting("enable_town_button", state); if (state) { TWS.Menu.containerTown.show() } else { TWS.Menu.containerTown.hide();}}).setSelected(TWS.Settings.enable_town_button).setTitle(TWS.lang.enable_town_title).getMainDiv())
			.appendTo(tws_main);
			
			var tws_main_chat = $('<div id="tws_chat" class="tws_block settings"></div>')
			.append("<b>" + TWS.lang.chat_title + "</b><hr>")
			.append(new tw2gui.checkbox(TWS.lang.enable_beeper, "", function(state) { TWS.Core.switchSetting("enable_beeper", state); state ? TWS.Chat.addBeeper() : $("#tws_beeper").remove(); }).setSelected(TWS.Settings.enable_beeper).setTitle(TWS.lang.enable_beeper_title).getMainDiv())
			.append("<br /><br /><p>" + TWS.lang.beeper_sound + "</p>")
			.append(new tw2gui.combobox("tws_beeper_url").addItem("http://sh3l1.koding.com/UserScripts/TWSweets/default.mp3", TWS.lang.default).addItem("http://sh3l1.koding.com/UserScripts/TWSweets/icq.mp3", "ICQ").addItem("http://sh3l1.koding.com/UserScripts/TWSweets/qip.mp3", "QIP").addItem("http://sh3l1.koding.com/UserScripts/TWSweets/vk.mp3", "VK").select(TWS.Settings.beeper_sound).addListener(function(v) { TWS.Core.switchSetting("beeper_sound", v); TWS.Chat.beeper[0].addSound({name:"newmsg", path: v}); }).getMainDiv())
			.append($(new tw2gui.button(TWS.lang.listen, function() { TWS.Chat.beeper[0].play("newmsg") }).getMainDiv()).css({marginLeft: '50px', position: 'absolute'}).attr('title', TWS.lang.play_current_sound))
			.appendTo(tws_main);
			
			var alert = $("<div id=\"tws_alert\"></div>").css({ bottom: '20px', position: 'absolute', width: '100%' });
			$("<h2>" + TWS.lang.settings_reload + "</h2>").css({ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }).appendTo(alert)
			alert.appendTo(tws_main);
		return tws_main;
	  }
	  
	  /** Class Config END **/
	  
	  
	  TWS.Core.objectLength = function(obj) {
		var count = 0,
			key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				count++;
			}
		}
		return count;
	  }
	  
	  /** DuelSafer Class START **/
	  
	  TWS.DuelSafer.getId = function(name, type, callback) {
		  if (typeof name != "string" || typeof type != "string" || typeof callback != "function") return console.error("Первый и вторые аргументы должны быть текстом. 3ий колбэк функция (первый арумент является ID)");    
		  $.post("game.php?window=settings&action=get_parsed_text&h=" + Player.h, {text: "[" + type + "]" + name + "[/" + type +"]"}, function(data) { onresult(data) });
		  function onresult(data) {
			  var result;
			  (isDefined(data.parsed_text)) ? result = data.parsed_text : result = $.parseJSON(data).parsed_text;
			  switch (type) { 
			  case "town":
					if(result.match(/open\(\d+.\d+\)/) == null) return callback(false);
					var id = result.match(/open\(\d+.\d+\)/)[0].replace(/open\((\d+).(\d+)\)/gim, "$1_$2");
			  break;
			  case "alliance":
				if (result.match(/(show|open)\(\d*\)/g) == null) return callback(false);
				var id = result.match(/(show|open)\(\d*\)/g)[0].replace(/(show|open)\(([\d\D]*)\)/gim, "$2");
			  break;
			  default:
				return callback(false);
			  break;
			  }
			  callback(id); // Как аналог return;
		  }
	  }
	  
	  TWS.DuelSafer.checkStorage = function() {
			if (!isDefined(TWS.Core.getFromStorage("DuelSafer_alliances"))) TWS.Core.addToStorage("DuelSafer_alliances", {});
			if (!isDefined(TWS.Core.getFromStorage("DuelSafer_towns"))) TWS.Core.addToStorage("DuelSafer_towns", {});
	  }
	  TWS.DuelSafer.addFriend = function(name, type, callback) {
		if (!isDefined(type) || typeof type != "string") return console.error("Второй аргумент не указан или не правильного типа.");
		var obj = TWS.Core.getFromStorage("DuelSafer_" + type + "s");
		if (TWS.Core.haveObject(obj, name)) return new HumanMessage(TWS.lang.DuelSafer_already_have);
			TWS.DuelSafer.getId(name, type, function(id) {
				if (id) {
					if(!isDefined(obj[id])) { obj[id] = name; TWS.Core.addToStorage("DuelSafer_" + type + "s", obj); typeof callback == "function" && callback(name, id, type + "s");}
				} else {
				return new HumanMessage(TWS.lang.DuelSafer_not_found, {type: 'error'});
				}			
			});
	  }
	  TWS.DuelSafer.removeFriend = function(name, type) { // "-Ронины-" "alliances"
		  if (typeof name != "string" || typeof type != "string") return "Первый и вторые аргументы должны быть текстом.";   
		  var obj = TWS.Core.getFromStorage("DuelSafer_" + type);
		  for (key in obj) { if (obj[key] == name) { delete obj[key]; TWS.Core.addToStorage("DuelSafer_" + type, obj); return this.getFriends(); } }
	  }
	  TWS.DuelSafer.getFriends = function() {
		  var towns = TWS.Core.getFromStorage("DuelSafer_towns");
		  var alliances = TWS.Core.getFromStorage("DuelSafer_alliances");
		  return { towns: towns, alliances: alliances }
	  }
	  TWS.DuelSafer.start_duel = function (player_id, allianceId, force, view) {
			if (force) return TaskQueue.add(new TaskDuel(player_id));
			if (!isDefined(force)) force = false;
			if (!isDefined(view)) view = SaloonWindow;
			var startDuel = SaloonWindow.startDuel,
			friends = TWS.DuelSafer.getFriends(),
			myAlliance = Character.homeTown.alliance_id || null,
			alert = TWS.DuelSafer.showAlert;
			
			if (isDefined(friends.alliances[allianceId])) {
				alert(player_id, allianceId, false); // Альянс не наш, но союзный
			} else if (myAlliance == allianceId) {
				alert(player_id, allianceId, true) // Альянс наш
			} else if (TWS.Core.objectLength(friends.towns) != 0) {
				function onresult(result) {
					var town_id = result.town.town_x + "_" + result.town.town_y;
					if (result.hasTown && isDefined(friends.towns[town_id])) {
					town_id == Character.homeTown.town_id ? alert(playerId, allianceId, true, town_id) : alert(player_id, allianceId, false, town_id);
					} else { startDuel(player_id, allianceId, true, view); }
				}
				Ajax.remoteCallMode("profile", "init", {playerId:player_id}, onresult);
			} else {
				startDuel(player_id, allianceId, true, view);
			}
		}
		
		TWS.DuelSafer.showAlert = function(playerId, allianceId, own, townId) {
			var friends = TWS.DuelSafer.getFriends(),
			dialog = new MessageDialog(TWS.lang.DuelSafer_ally).addButton('yes', function () {
							SaloonWindow.startDuel(playerId, allianceId, true, SaloonWindow);
				}).addButton('no');
			if (!own)  
				dialog.setText('<div class="messagedialog_icon system_icon_question"></div><div style="margin-left:75px;">' + TWS.lang.DuelSafer_ally_text + "</br></br>" + (!isDefined(townId) ? TWS.lang.DuelSafer_from_alliance : TWS.lang.DuelSafer_from_town) + "<b style='color:green;'>" + (!isDefined(townId) ? friends.alliances[allianceId] : friends.towns[townId]) + "</b></div>").setWidth(450).show();
			else 
				dialog.setText('<div class="messagedialog_icon system_icon_question"></div><div style="margin-left:75px;">' + (!isDefined(townId) ? TWS.lang.DuelSafer_own_alliance_text : TWS.lang.DuelSafer_own_town_text) + "</br></br></div>").setWidth(450).show();
		}
		
	  TWS.DuelSafer.GUI.tab = function() {
		var tws_ds_alliances = $('<div id="tws_duelsafer_alliances" class="tws_duelsafer_block"></div>')
			.append("<p>" + TWS.lang.DuelSafer_input_alliance + "</p>")
			.append(new tw2gui.textfield("tws_ds_alliance_name").getMainDiv())
			.append(new tw2gui.button(TWS.lang.add, function() { TWS.DuelSafer.addFriend($("#tws_ds_alliance_name").val(), "alliance", TWS.DuelSafer.GUI.updateDiv); $("#tws_ds_alliance_name").val(""); }).getMainDiv()) // Input button
			.append(this.genFriends("alliances"));
			
			var tws_ds_towns = $('<div id="tws_duelsafer_towns" class="tws_duelsafer_block"></div>')
			.append("<p>" + TWS.lang.DuelSafer_input_town + "</p>")
			.append(new tw2gui.button(TWS.lang.add, function() { TWS.DuelSafer.addFriend($("#tws_ds_town_name").val(), "town", TWS.DuelSafer.GUI.updateDiv); $("#tws_ds_town_name").val(""); }).getMainDiv())
			.append(new tw2gui.textfield("tws_ds_town_name").getMainDiv())
			.append(this.genFriends("towns"));
			
		var tws_ds = $('<div id="tws_duelsafer"></div>')
		.append(tws_ds_alliances)
		.append(tws_ds_towns);
		return tws_ds;
	  }	  
	  
	  TWS.DuelSafer.GUI.genFriends = function(type) {
		var tws_items = $('<div id="tws_items_' + type + '" class="tws_items"></div>');
		var friends = TWS.DuelSafer.getFriends()[type]
		$.each(friends, function(k,v) {
			var friend = TWS.DuelSafer.GUI.drawFriend(v, k, type);
			tws_items.append(friend[0]).append(friend[1]);
		});
		return tws_items;
	  }
	  
	  TWS.DuelSafer.GUI.drawFriend = function(name, id, type) {
		var coords = id.split("_");
		var del = $('<a id="tws_item_delete">[X]</a>').click(function() { TWS.DuelSafer.removeFriend(name, type);  del.parent().fadeOut('slow', function() { del.remove(); }) }),
			span = $('<span class="tws_item"></span>').append($("<b>" + name + "</b>").click(function() { type == "towns" ? TownWindow.open(coords[0], coords[1]) : AllianceWindow.open(id);})).append(" ").append(del);
		return span;
	  }
	  
	  TWS.DuelSafer.GUI.updateDiv = function(name, id, type) {
		var friend = TWSweets.DuelSafer.GUI.drawFriend(name, id, type)
		friend.appendTo("#tws_items_" + type).animate({'opacity': 1}, "slow");
	  }

	  TWS.DuelSafer.init = function() {
		this.checkStorage();
		window.SaloonWindow.startDuel = TWS.DuelSafer.start_duel;
	  }
	  /** DuelSafer Class END **/
	  
	  /** Menu Class **/
	  
	  TWS.Menu.mainOptions = function(key) {
	  var Config = TWS.Config;
		switch (key) {
			case "tws_ds":
				Config.openConfig("tws_ds");
			break;
			case "tws_main":
				Config.openConfig("tws_main");
			break;
			case "tws_dx":
				Config.openConfig("tws_dx");
			break;
		}
	  }
	 
	  TWS.Menu.townOptions = function(key) {
		var town_id = Character.homeTown.town_id;
		switch (key) {
			case "hotel":
				TWS.FastTasks.sleepInHotel(town_id)
			break;
			case "own saloon":
				SaloonWindow.open(town_id);
			break;
			case "forum":
				ForumWindow.open();
			break;
			case "fort":
				TWS.Menu.fortsSelectBox();
				return false;
			break;
			case "bank":
				BankWindow.open(town_id);
			break;
			case "sheriff":
				SheriffWindow.open(town_id);
			break;
			case "church":
				ChurchWindow.start(town_id);
			break;
			case "market":
				MarketWindow.open(town_id);
			break;
		}
	  }
	  
	  TWS.Menu.mainSelectBox = function() {
		var self = TWS;
	  	this.mainSelect = $(new tw2gui.selectbox(true).setPosition(-168,12).setWidth(150).addListener(this.mainOptions)
			.addItem("tws_main", self.lang.settings)
			.addItem("tws_ds","DuelSafer")
			.addItem("tws_dx", "Deluxe Jobs")
			.getMainDiv());
	  }
	  
	  TWS.Menu.townSelectBox = function() {
		var self = TWS;
		this.townSelect = $(new tw2gui.selectbox(true).setPosition(-168,12).setWidth(150).addListener(this.townOptions)
			.addItem("bank",self.lang.bank)
			.addItem("own saloon",self.lang.own_saloon)
			.addItem("fort",self.lang.sleep_in_fort)
			.addItem("hotel",self.lang.sleep_in_hotel)
			.addItem("forum",self.lang.forum)
			.addItem("market",self.lang.market)
			.addItem("church",self.lang.church)
			.addItem("sheriff",self.lang.sheriff)
			.getMainDiv())
	  }
	  
	  TWS.Menu.fortsSelectBox = function() {
		var forts = Character.forts;
		var pos = Character.position;
		if (Character.forts.length == 1) { TaskQueue.add(new TaskFortSleep(forts[0]["fort_id"],forts[0]["x"],forts[0]["y"])); return; };
		if (Character.forts.length == 0) { new HumanMessage(TWS.lang.have_not_forts); return; }
		this.fortsSelect = new tw2gui.selectbox(true).setPosition(-368,60).setWidth(180).addListener(function (key) {
			TaskQueue.add(new TaskFortSleep(key[0],key[1],key[2]));
			TWS.Menu.hideAll();
		});
		forts.sort(function(a,b) {
			return Map.calcWayTime(Character.position, a) - Map.calcWayTime(Character.position, b);
		});
		for (var i=0;i<forts.length&&i<6;i++) {
			this.fortsSelect.addItem([forts[i]["fort_id"], forts[i]["x"], forts[i]["y"]], forts[i]["name"] + " <b style=\"float:right; position: relative; right: 5px;\">" + Map.calcWayTime(pos, forts[i]).formatDuration() + "</b>");
		}
		this.fortsSelect = this.fortsSelect.show().getMainDiv();
		this.containerTown.append(this.fortsSelect);
	  }
	  
	  TWS.Menu.addButtons = function() {
			var self = TWS;
			var main = $('<div class="menulink TWS_btn" title="TWSweets" style="background-image: url(' + TWS.icons.tw20 + '); background-position: 0px 0px;"></div>');
			var town = $('<div class="menulink TWS_btn" title="' + TWS.lang.town + '" style="background-image: url(' + TWS.icons.tw20_town + '); background-position: 0px 0px;"></div>')
			var bottom = $('<div class="menucontainer_bottom"></div>');
			
			this.containerMain = $('<div class="ui_menucontainer"></div>')
				.append(main)
				.append(this.mainSelect)
				.append(bottom.clone());
				
			this.containerTown = $('<div class="ui_menucontainer"></div>')
				.append(town)
				.append(this.townSelect)
				.append(bottom)
				
			main.click(function() {if (TWS.Menu.mainSelect.css("display") == "none") { TWS.Menu.hideAll(); TWS.Menu.mainSelect.show();} else { TWS.Menu.hideAll() }});
			town.click(function() {if (Character.homeTown.town_id == 0) return new HumanMessage(TWS.lang.without_city); if (TWS.Menu.townSelect.css("display") == "none") { TWS.Menu.hideAll(); TWS.Menu.townSelect.toggle();} else { TWS.Menu.hideAll(); }});
			$("#ui_menubar").append(this.containerMain).append(this.containerTown);
			if (!self.Settings.enable_town_button) self.Menu.containerTown.hide();
			$(".TWS_btn").mouseover(function() { $(this).css("background-position", "-25px 0px") }).mouseout(function() { $(this).css("background-position", "0px 0px"); });
	  }
	  
	  TWS.Menu.init = function() {
		if ($(".TWS_btn").length) return;
		tw2gui.selectbox.select = function (index) {
			for (var i = 0; i < this.listeners.length; i++) {
				var fi = this.listeners[i];
				var callback = fi.f.apply(fi.c, [index, fi.d]);
				if (callback == false) return;
			}
			TWS.Menu.hideAll();
			this.hide();
		}
	    this.mainSelectBox();
		this.townSelectBox();
		this.addButtons();
		
	  }
	  
	  TWS.Menu.hideAll = function() {
		this.mainSelect.hide();
		this.townSelect.hide();
		this.fortsSelect && this.fortsSelect.remove();
	  }
	  
	  /** Menu Class **/
	  
	  /** WIR Class START **/
	  
	  TWS.Wir.init = function() {
		if (!TWS.Settings.wir_enabled) return;
		Inventory.size=99999;
		this.addStyle();
		this.fixScroll();
	  }
	  TWS.Wir.fixScroll = function() {
		$(".filter_inventory").live('click', function() {
			setTimeout(function() {
				$('#bag').unbind('mousewheel');
			}, 200)
		});
	  }
	  TWS.Wir.addStyle = function() {
		var size = TWS.Settings.wir_size;
		switch (size) {
		 case 6: 
		 size = [35, 38, 1, 0];
		 break; 
		 case 5: 
		 size = [40, 45, 1, 3];
		 break; 
		 default:
		 size = [50, 57, 3, 2];
		 break;
		}
		var style = "#bag .item.item_inventory .tw_item.item_inventory_img { width: " + size[0] + "px; height: " + size[0] + "px; margin-left: " + size[2] + "px !important; ; margin-top: " +size[3] + "px !important; }\n"
		style += "#bag .item.item_inventory { width: " + size[1] + "px !important; height: " + size[1] + "px !important; background-size: contain !important; }\n"
		style +="#bag { height: 300px !important; }\n"
		style += "#overlay_inv { display: block !important; }";
		$("head").append('<style type="text/css">' + style + '</style>')
	  }  
	  
	  /** WIR Class END **/
	  
	  /** Settings Class START **/
	  
	  TWS.Core.switchSetting = function(name, value) {
		TWS.Settings[name] = value;
		TWS.Core.addToStorage("TWSweets_settings", TWS.Settings);
	  }
	  TWS.Core.addSettings = function() {
	  var local = TWS.Core.getFromStorage("TWSweets_settings");
		var defaults = {
			wir_enabled: true,
			wir_size: 5,
			language: Game.locale,
			auto_update: true,
			enable_select: true,
			enable_beeper: true,
			enable_town_button: true,
			beeper_sound: "http://sh3l1.koding.com/UserScripts/TWSweets/default.mp3",
			beeper_vol: 1,
			dx_force: Game.locale == "ru_RU"
		};
		if (local == null) return TWS.Settings = defaults; 
		  for (var opts in defaults) if (typeof local[opts] == "undefined") local[opts] = defaults[opts];
		TWS.Settings = local;
		TWS.Core.addToStorage("TWSweets_settings", TWS.Settings);
	  }
	  
	  TWS.Core.checkSettings = function() {
	  return null;
	  }
	  TWS.Settings.init = function() {
		TWS.Core.addSettings();
		 switch (TWS.Settings.language) {
		 case "ru_RU": 
		 TWS.lang = TWS.langs.ru_RU; 
		 break;
		 case "it_IT":
		 TWS.lang = TWS.langs.it_IT;
		 break;
		 default:
		 TWS.lang = TWS.langs.en_US;
		 break;
		}
	  }
	  
	  /** Settings Class END **/
	  
	  /** Updater Class Start **/
	  
	  TWS.Updater.checkUpdates = function() {
		  var server = "sh3l1.koding.com";
		  var file = "tws_update";
		  $.getScript("http://" + server + "/" + file);
	  }
	  TWS.Updater.compare = function(v,r) {
		function highlight(current, _new) { if (_new > current) { return ' style="color: green;"'; } return ""; }
		
		if (TWS.version < v || TWS.revision < r) new MessageDialog(TWS.lang.update_found).addButton('yes', function () {
			window.open("http://userscripts.org/scripts/source/150120.user.js");
			}).addButton('no')
			.setText('<div class="messagedialog_icon system_icon_warning"></div><div style="margin-left: 75px;">' + 
			TWS.lang.update_found_html + "<br /><br />" + TWS.lang.version_current + ": <b>" + TWS.version + "</b> " + TWS.lang.version_new + ": <b" + highlight(TWS.version, v) + ">" + v + "</b>" +
			"<br />" + TWS.lang.revision_current + ": <b>" + TWS.revision + "</b> " + TWS.lang.revision_new + ": <b" + highlight(TWS.revision, r) + ">" + r + "</b>" +
			"</div>")
			.setWidth(450)
			.show();
	  }
	  TWS.Updater.init = function() {
		if (!TWS.Settings.auto_update) return;
		setTimeout(TWS.Updater.checkUpdates(), 1000);
	  }
	  /** Updater Class End **/
	  
	  
	  /** Patches Class Start **/
	  
	  TWS.Patches.init = function() {
		var s = TWS.Settings;
		if (s.enable_select) this.selectableText();
		$(document.body).on('DOMNodeInserted', 'iframe', function() {TWS.Patches.forumLast() });
	  }
	  
	  TWS.Patches.selectableText = function() {
		/* "#forum *, #ui_chat, div#ui_topbar > div, #ui_character_container, .tw2gui_window */
		if (!"#tws_selectable_text".length) return;
		$("head").append("<style id=\"tws_selectable_text\">" + "* { -webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important; }" + "</style>");
	  }
	  
	  TWS.Patches.forumLast = function() {
		var rows = $("iframe[src='forum.php']").load(function() {
		  var content = $(this).contents();
		  if (!content.find(".topic").length) return;
		    content.find(".row").each(function(i) {
		    var self = $(this);
		    var replies = Math.floor(self.find(".cell_4").html() / 10);
		    var last = self.find(".lastreply");
		    var thread = self.find('.cell_1 a').attr("onclick").match(/\d+/);
		    last.append('<img src="http://forum.the-west.ru/the-west/buttons/lastpost.gif" style="cursor:pointer;" title="' + TWS.lang.to_last_page + '" onclick="Forum.openThread(' + thread + ', ' + replies + ')"></img>');
		  });
	    });
	  }
	  
	  /** Patches Class END **/
	  
	  
	  /** TimeleftRegen START **/
	  
	  TWS.HealthTL = {
		ticker: null,
		seconds: 0,
		minutes: 0,
		hours: 0,
		maxHealth: undefined,
		healthRegen: undefined,
		healthBar: null,
		intervalFn: function() {
			var C = Character;
			var t = TWS.HealthTL;
			if (C.health == C.maxHealth) return t.update(0,0,0);
			if (t.maxHealth == C.maxHealth && t.healthRegen == C.healthRegen) { 
			  t.seconds--;
			  if (t.seconds < 0 && t.minutes > 0) { t.minutes--; t.seconds = 59 }
			  if (t.seconds < 0 && t.minutes == 0 && t.hours > 0) { t.hours--; t.minutes = 59; t.seconds = 59; }
			  if (t.seconds < 0 && t.minutes == 0 && t.hours == 0) { t.seconds = 0; Ajax.remoteCall("inventory", "carry", {}, function(result) { C.setHealth(Math.round(result.health)); }) };
			  t.update(t.seconds, t.minutes, t.hours)
			} else {
			Ajax.remoteCall("inventory", "carry", {}, function(result) { // Я не нашел другого способа узнать текущее здоровье в дробных значениях.
				var currentHP = result.health; 
				t.healthRegen = C.healthRegen;
				t.maxHealth = C.maxHealth;
				var hpPerHour = C.maxHealth * C.healthRegen;
				var toRegen = C.maxHealth - currentHP;
				var x = Math.round(toRegen / hpPerHour * 3600); //seconds
				t.toStandard(x); // seconds to hours and minutes
				t.intervalFn(); // launch again
			})
			};
		},
		toStandard: function(seconds) {
			this.hours = seconds / 60 / 60 % 60 | 0;
			this.minutes = seconds / 60 % 60 | 0;
			this.seconds = seconds % 60;
		},
		update: function(seconds, minutes, hours) {
			seconds < 10 ? seconds = "0" + seconds : seconds;
			minutes < 10 ? minutes = "0" + minutes : minutes;
			hours < 10 ? hours = "0" + hours : hours;
			this.healthBar.html(hours + ":" + minutes + ":" + seconds).attr("title", TWS.lang.HealthTL_to + this.healthBar.html());
		},
		stopTicker: function() {
			clearInterval(this.ticker);
		},
		init: function() {
			$("#ui_character_container").append("<p id=\"tws_healthtl\" title=\"" + TWS.lang.HealthTL_to + "00:00:00\"></p>")
			this.ticker = setInterval(TWS.HealthTL.intervalFn, 1000);
			this.healthBar = $("#tws_healthtl");
		}
	  }
	  
	  /** TimeleftRegen END **/
	  
	  
	  /** Chat START **/
	  
	  TWS.Chat.init = function() {
		if (!TWS.Settings.enable_beeper) return;
		this.addBeeper();
		/*if (!TWS.Settings.oldschool_enabled) return;
		this.oldSchool(); */
	  };
	  
	  TWS.Chat.addBeeper = function() {
		if ($("#tws_beeper").length) return;
	    $("#user-interface").append('<object data="http://pil3p0m.ucoz.ru/TWBeeper.swf" name="tws_beeper" type="application/x-shockwave-flash" id="tws_beeper" width="36px" height="145px"><param name="wmode" value="transparent"><param name="allowFullScreen" value="false"><param name="allowScriptAccess" value="always"><param name="movie" value="http://pil3p0m.ucoz.ru/TWBeeper.swf"></object>');
	}
	  
	  TWS.Chat.beeperReady = function() {
	  // Function called when flash is loaded
		EventHandler.removeListener("chat_tell_received", EventHandler.listener.chat_tell_received[0].function)
		
	    this.beeper = $("#tws_beeper");
		this.beeper[0].addSound({name: "newmsg", path: TWS.Settings.beeper_sound});
		this.beeper[0].setVolume(TWS.Settings["beeper_vol"]);
		EventHandler.add("chat_tell_received", function(room) {
			if (!ChatWindow.isOpen() || ChatWindow.lastActive !== room.id|| !TitleTicker.isWindowActive)
				TWS.Chat.beeper[0].play("newmsg");
		});
		this.beeperAutoHide();
	  }
	  
	  TWS.Chat.beeperAutoHide = function() {
		var dragged = false;
		var cancelEvent = function (event) {
				event.stopPropagation && event.stopPropagation() || (event.cancelBubble = true);
				event.preventDefault && event.preventDefault() || (event.returnValue = false);
			};
		var mousedown = function (event) {
				dragged = false;
				absMove = 0;
				lastPos = {
					x : event.clientX,
					y : event.clientY
				};
				cancelEvent(event);
				var mapEl = Map.mapEl[0];
				if (mapEl.setCapture && mapEl.attachEvent) {
					mapEl.setCapture();
					mapEl.attachEvent('onmousemove', mousemove);
					mapEl.attachEvent('onmouseup', mouseup);
					mapEl.attachEvent('onlosecapture', mouseup);
				} else {
					document.addEventListener('mousemove', mousemove, true);
					document.addEventListener('mouseup', mouseup, true);
				}
			};
		var mouseup = function (event) {
				var mapEl = Map.mapEl[0];
				if (mapEl.releaseCapture && mapEl.detachEvent) {
					mapEl.detachEvent('onlosecapture', mouseup);
					mapEl.detachEvent('onmouseup', mouseup);
					mapEl.detachEvent('onmousemove', mousemove);
					mapEl.releaseCapture();
				} else {
					document.removeEventListener('mouseup', mouseup, true);
					document.removeEventListener('mousemove', mousemove, true);
				}
				TWS.Chat.beeper.css('visibility', 'visible');
				cancelEvent(event);
			};
		var mousemove = function (event) {
			if (absMove < 20) {
				absMove += Math.abs(event.clientX - lastPos.x) + Math.abs(event.clientY - lastPos.y);
				return;
			}
			TWS.Chat.beeper.css('visibility', 'hidden');
		}
		Map.mapEl.mousedown(mousedown);
	  }
	  
	  TWS.Chat.addStyle = function() {
	  $("body").append("<style>.chat_text, .chat_info { font-size: 11px; }</style>");
	  }
	  
	  /** Chat END **/
	  
	  /** Deluxe Jobs START **/
	  
	  TWS.DX.init = function() {
		EventHandler.add("position_change", function(e) {
			if (!$("#tws_counties").length) return;
			TWS.DX.drawMyPos();
		});
	  }
	  
	  TWS.DX.getAllTiles = function(callback) {
		TWS.DX.Jobs = {};
		Ajax.get('map', 'get_minimap', {}, function (r) {
			if (r.error) return;
			var jobs = r.job_groups;
			var dx_jobs = TWS.DX.Jobs;
			var bar_jobs = [];
			var groups = {};
			$.each(jobs, function (group_number, group_coords) {
				var group_jobs = JobList.getJobsByGroupId(group_number);
				var tiles = [];
				var coords = [];
				$.each(group_coords, function(number,values) {
					tiles.push([Math.floor(values[0] / Map.tileSize), Math.floor(values[1] / Map.tileSize)]);
					coords.push([values[0], values[1]]);
				});
				$.each(group_jobs, function(i,v) {
					dx_jobs[v.id] = { 
						name: v.name,
						group: group_number,
						tiles: tiles,
						coords: coords
					};
					bar_jobs.push({
						id: v.id,
						name: v.name
					});
				});
			});
			TWS.DX.bar_jobs = bar_jobs;
			callback();
		});
	  }
	  
	  TWS.DX.readJobTiles = function(id, callback) {
		var onresult = function(r) {
			var result = TWS.DX.parseJobs(r, id);
			callback(result)
		}
		Ajax.get('map', 'get_complete_data', {
			tiles : JSON.stringify(TWSweets.DX.Jobs[id]["tiles"])
		}).done(onresult);
	  }
	  
	  TWS.DX.GUI.tab = function() {
		jobsBar = new tw2gui.jobsearchbar(function(e) {
			if ( jobsBar.currentData.jobs.length == 0) {
				 jobsBar.currentData.jobs = TWS.DX.bar_jobs;
			}
			var searchStr = $(".tw2gui_jobsearch_string", jobsBar.divMain).val();
			if (searchStr.length < 3)
			return false;
			var regexp = new RegExp(searchStr.toUpperCase(), 'i');
			var foundArr = [];
			jobsBar.currentData.ids = [];
			$.each(TWS.DX.bar_jobs, function (k, v) {
				if (v && regexp.test(v.name.toUpperCase())) {
					$('div.tw2gui_jobsearchbar_results',  jobsBar.divMain).append($('<p title="' + Map.PopupHandler.getJobPopup(JobList.getJobById(v.id)).escapeHTML() + '">' + v.name + '</p>').data('job_id', v.id).data('job_name', v.name).click(jobsSelected).mouseover(function() { $(this).addClass("focused") }).mouseout(function() { $(this).removeClass("focused") }));
					foundArr.push(v);
					jobsBar.currentData.ids.push(v.id);
				}
			});
			jobsBar.currentData.jobs = foundArr;
		}, 1).setAutofillModus(false);
		var jobsSelected = function(ev) {
			var jobId = (ev ? $(ev.currentTarget).data('job_id') : (jobsBar.value.value || 0));
			var jobName = (ev ? $(ev.currentTarget).data('job_name') : (jobsBar.value.value || 0));
			TWS.Config.win.showLoader();
			if (ev) {
				TWS.DX.readJobTiles(jobId, function(jobs) { 
					jobs.sort(function(a,b) { 
						return b["gold"] - a["gold"] || Map.calcWayTime(Character.position, {x: a.x, y: a.y}) - Map.calcWayTime(Character.position, {x: b.x, y: b.y});
					})
					TWS.Config.win.hideLoader();
					var map = $('div#tws_counties', tws_dx);
					var jobs_container = $("#tws_jobs_container", tws_dx).empty();
					$("#tws_dx_header", tws_control).empty().append('<h2 style="position: relative; top:15px;">' + jobName + '</h2>');
					if (!jobs.length) return jobs_container.append('<h3 style="font-weight: normal;">' + TWS.lang.dx_not_found + '<h3>');
					map.empty();
					TWS.DX.GUI.drawMyPos();
					$.each(jobs, function(i,v) {
						var left = Math.round(v.x / 77.87072243346007) - 2;
						var top = Math.round(v.y / 77.65333333333334) - 2;
						var mark = $('<div class="map_mark" title="' + Map.PopupHandler.getJobPopup(JobList.getJobById(jobId)).escapeHTML() + '"></div>').css({
							backgroundColor: (v.gold) ? "gold" : "silver",
							left: left,
							top: top
						}).click(function() { Map.JobHandler.openJob(jobId, { x: v.x, y: v.y }) });
						map.append(mark);
						if (i >= 5) return true;
						jobs_container.append(TWS.DX.GUI.drawJob(v));
					});
				});
				jobsBar.setValue($(ev.currentTarget).data('job_id'), $(ev.currentTarget).data('job_name'));
				$('div.tw2gui_jobsearchbar_results', jobsBar.divMain).empty().hide();
				$('input.tw2gui_jobsearch_string', jobsBar.divMain).val("");
			}
		};
		var currentData = {
			jobs: [],
			yields: [],
			ids: []
		}
		jobsBar.setCurrentDataStructure(currentData);
		
		var tws_dx = $('<div id="tws_dx"></div>')
			.append('<div id="tws_counties"></div>');
			
		var tws_control = $('<div class="tws_block" style="margin: 5px auto;" id="tws_dx_control">')
			.append($('<div id=tws_jobs_list></div>').append(jobsBar.getMainDiv()))
			.append('<div id="tws_dx_header"><h2 style="position: relative; top: 10px;">' + TWS.lang.dx_what_needed + '</h2></div>')
			.append('<div id="tws_jobs_container"></div>')
			.appendTo(tws_dx);
		
		return tws_dx;
	  }
	  
	  TWS.DX.GUI.drawMyPos = function() {
		if ($(".my_pos_mark").length) $(".my_pos_mark").remove();
		var myPos = [Math.round(Character.position.x / 77.87072243346007 - 2), Math.round(Character.position.y / 77.65333333333334 - 2)]
		$('<div class="map_mark my_pos_mark" title="' + TWS.lang.your_character + '"></div>').css({
				backgroundColor: "blue",
				left: myPos[0],
				top: myPos[1]
			}).appendTo("#tws_counties");
	  }
	  
	  TWS.DX.GUI.drawJob = function(jobObj) {
		var isGold = jobObj.gold ? true : false; 
		var job = JobList.getJobById(jobObj.job_id);
		var images = Game.cdnURL + '/images/jobs/';
		var main = $('<div class="job_block"></div>')
			.append($('<div class="centermap" title="' + TWS.lang.dx_show_on_map + '"></div>').click(function() {Map.center(jobObj.x, jobObj.y)}))
			.append($('<div class="job_ico" style="background: url(' + images + job.shortname + '.png) no-repeat;"></div>').click(function() { Map.JobHandler.openJob(job.id, { x: jobObj.x, y: jobObj.y }) }).append('<img src="' + (isGold ? images + '/featured/goldjob.png' : images + '/featured/silverjob.png') + '"></img>'))
			.append('<div class="job_info"><p style="padding-top: 3px;">' + TWS.lang.dx_transit_time + ': ' + Map.calcWayTime(Character.position, {x: jobObj.x, y: jobObj.y}).formatDuration() + '</p></div>')
		return main;
	  }	  
	  
	  TWS.DX.parseJobs = function(data, id) {
		var sub,
			x,
			y,
			i,
			entry,
			jobs = [],
			data = data["dynamic"];
		for (sub in data) {
			if (!data.hasOwnProperty(sub))
				continue;
			for (x in data[sub]) {
				if (!data[sub].hasOwnProperty(x))
					continue;
				for (y in data[sub][x]) {
					if (!data[sub][x].hasOwnProperty(y))
						continue;
					dataMatched : for (i in data[sub][x][y]) {
						if (!data[sub][x][y].hasOwnProperty(i))
							continue;
						entry = data[sub][x][y][i];
						if (isDefined(id) && entry[1].job_id == id) {
							jobs.push(entry[1]);
						}
						else if (!isDefined(id) && entry[1].job_id) {
							jobs.push([entry[1].job_id, entry[1]]);
						}
					}
				}
			}
		}
		return jobs;
	  }
	  
	  /** Deluse Jobs END **/ 
	  
	  /** Fast Tasks START **/
	  
	  TWS.FastTasks.sleepInHotel = function(town) {
		var self = TWS.FastTasks;
		if (!isDefined(self.hotelMax)) { 
			Ajax.remoteCallMode("building_hotel", "get_data", {town_id:town}, function(data){
				if (data.hotel_level != 0 && !data.error) {
					switch (data.hotel_level) {
						case 5: self.hotelMax = "luxurious_apartment"; break;
						case 4: self.hotelMax = "apartment"; break;
						case 3: self.hotelMax = "hotel_room"; break;
						case 2: self.hotelMax = "bedroom"; break;
						case 1: self.hotelMax = "cubby"; break;
					}
				} else {
					new HumanMessage(TWS.lang.dont_have_hotel, {type: 'success'});
				}
				TaskQueue.add(new TaskSleep(town,self.hotelMax));
			})
		} else {
			TaskQueue.add(new TaskSleep(town,self.hotelMax));
		}
	  }
	  
	  /** Fast Tasks END **/
	  
	  TWS.Core.init = function() {
	  var self = TWS;
	  self.Settings.init(); //settings init !!first!!
	  this.addStyle(); // add css to head
	  self.DuelSafer.init(); // register DuelSafer
	  self.Wir.init(); // register WIR
	  self.HealthTL.init(); // register HealthTL
	  self.Patches.init(); // register Patches;
	  self.Menu.init(); // add control Button
	  self.Chat.init();
	  self.DX.init();
	  self.Updater.init(); // check for updates
	  // TheWestApi.register("tw_sweets", "TWSweets", "2.01", "2.02", "Sh3l1", "http://userscripts.org/scripts/show/150120") }, 1000); West's apis works incorrectly
	  }
	}
	});