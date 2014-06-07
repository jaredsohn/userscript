// ==UserScript==
// @name           LoU Tweak T2
// @description    Adds incredible functionalities to Lord of Ultima, by turbo-charging LoU Tweak v1.7.1 then to v1.7.4
// @namespace      SachinM
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.3.13-1.7.4
// @require        
// ==/UserScript==

/*
Changes:
v0.3.2
-Added new translated entries
-Fixed: Script errors after new EA patch released on July-August 2012
-Changed LoU Tweak 1.6.0 framework to 1.7.1
-Changed attribute 'm' to 'th' about minimun townhall needed for buildings
-Fixed: generic issues
-Changed some bold text in normal text for legibility
-Changed drop down city menu in alphabeticaly list ordered
-Changes made by jhon bauman
v0.3.12
-Fixed: Script error after new patch released on some worlds by EA
-Fixed: City wall upgrade mixup for fresh cities.
-Fixed: AutoPurify was not working for values less than 500 in a specific scenario
v0.3.11
-Fixed: Invalid Autoputify threshold value for new cities causes wrong autopurify.
v0.3.10
-Fixed: Autoswitch city not working whenever one of the auto-purify/autiattack/etc options get stuck
Now, we autoswitch cities even whenever last 7 commnds of a certain type are identical
-Fixed: Problem in simple sharestring format not working if it contains newlines
-Added feature of city specific purification (THANKS TO KITSAB for support and initial implemetation)
-Changed 'Apply Default to All Cities' functionality to 'Apply Current for all Cities'
-Fixed: Added trace level debugging so some extra debugs will be hidden during normal runtime
-Fixed: Autoupdate will now update Turbo instead of LoU Tweak
v0.3.9
-Moved Auto-Add, Autobuild, autopurify and autoattack settings to be city-specific. 
Cities will be listed in a drop down.
There is a 'Default' city added to top of list so that if the 'Use Default' checkbox is selected, all cities will use the 'Default' city setting.
Another button called Apply Default to All cities copies default settngs to all cities.
-Fixed: Autoupdate notification for LoU Tweak Turbo
v0.3.8
-Fixed: After new EA update, script was failing after build queue in a city reached 2 or 3.
v0.3.7
-Fixed: Townhall still gets upgraded even when not selected for selected once add building is stuck due to low townhall level.
-Fixed: Lowest building not being upgraded (sorting by building level was not working)
-Fixed?: Resources were being autodestroyed and some unselected buildings, auto-built. Added lots of additional conditional checks to ensure only the targetted city gets its auto-order.
-Fixed: Not all valid units were available in drop down for auto-raid.
v0.3.6
-Fixed: City switchin happens too fast sometimes.
-Fixed: In Auto-build mode, when max city building limit reached due to low townhall level, it was always forcing townhall to be upgrade.
In this case, TH will now still be given preferred upgradation but only if it is in the current selection criteria.
v0.3.5
-Fixed: Long standing issue of auto-switch city not working for certain scenarios
v0.3.4
-Fixed: auto-switch city interval field got removed from  options window in previous version.
-In addition to just time, message link now shows city, detailed level and also message.
-Tuned up message system performance
-Fixed: "Level 10 Moonglow tower not present" message which appeared even if auto-purify was not turned on.
-Fixed: auto-purification not working sometimes
-Added UI for choosing units and count when forming auto-attack army
v0.3.3
-Adds to auto-build/upgrade items to queue without pre-paying if Build Minister present.
-corrected expected wood requirements at level 6 for some utility buildings (merged from fix in v1.6.4 LoU Tweak)
-Restored overlay window feature of v1.6.0 LoU Tweak
-Introduced new message system into UI that shows important updates, warnings and errors. This lets user know what auto-features are working (or not working).
v0.3.2
-Resolved multi language support errors in original LoU Tweak.
v0.3.1
-Data like sharestring, attack units,etc which are city specific, now considers that there can be different servers (so Turbo features now works even when user has presence on multiple worlds).
prev
-Automatically trigger building upgrades a based on specific sets of buildings or use LOU Tweaks own detailed settings.
-Create new buildings from a provided layout!!!! If a valid sharestring is uploaded for a city, it uses that to AUTOMATICALLY create buildings as specfied in the sharestring!
-Auto reattack a target (dungeons for now - later cities!) 
-Seperate button to start or stop auto-upgrade.
-Initiate only 1 upgrade at a time and with a user specified interval (interval required so that it wont be detected as a bot by the server).
-An additional random interval between 0 to 5 seconds is added on top of the user specified interval to arrive at the actual build interval (again, to throw off bot-detection).
-If current city has insufficient resources or free slots, automatically switch to next city after above specified interval.
-New Turbo tab in LOU Tweak menu for all options.
-Auto purify when resources reach 90% level including incoming

Todos:
New
-Auto send resources to a city when it runs out, from another city (shd have parameters like surplus level in donating city, how far, etc).
-Auto send defence forces to a city thats under attack.
-If any incoming attacks, calculate success rate, recruit units if necessary and if necessary purify resources (BOS updateIcon()).
-Do all auto-stuff even without auto-cycling through cities!
-Build Priority for Auto-add like how it is there for Auto-upgrade
-In auto-add buildings mode, when limit is reached due to townhall not being of sufficient level, and if auto-upgrade is on, instead of trying to upgrade the townhall just once, it keeps focussing only on Townhall (this is usually only a problem when Build minister is on, since otherwise, there usually wont be enough resources for more than 1 townhall upgrade to go into queue)
Improvements
-Show a warning countdown on screen before switching to another city!
-Add 3 radio buttons to filter messages by Info, Warn or Error (and 1 for debug too?)
-always auto-purify when hitting maximum capacity (without incoming resources).
-only auto-reattack based on level of target. and maybe recruit and prepare units before attacking to ensure success rate?
-Include ALL important events as messages to user.
-Auto upgrade category-focus radio buttons shd be checkboxes (just like buildingspecific-focus checkboxes)
eg: Show a message when no auto pilot options has been enabled but none have been turned on (line 1560)
-Support for attacking cities
*/

(function(){

var LT_mainFunction = function() {

	function createTweak() {
		var LTversion = "0.3.13";
		var louTweak = {};
		var LT = {};
		
		LT_strings = {
			"0": { /* english */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Click to show LoU Tweak Options",
				"layout_btn_tt": "Click to generate layout Sharestring for current city",
				"chat_btn_city": "City",
				"chat_btn_player": "Player",
				"chat_btn_alliance": "Alliance",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copy coordinates to chat",
				"up_count_tt": "Buildings available for upgrade:",
				"opts_max_chatlines": "Maximum lines of chat:",
				"opts_chat_opacity": "Chat background transparency:",
				"opts_switch_to_ally_tab": "Switch to Alliance Tab at start",
				"opts_show_queue_win": "Show queue info window",
				"opts_limit_req_res": "Limit requested resources to city free space",
				"opts_inc_res": {
					"lab": "Incoming resources label:",
					"disabled": "Disabled",
					"always": "Always on",
					"context": "Contextual"
				},
				"opts_separator": {
					"lab": "Thousands separator:",
					"period": "'.' (period)",
					"comma": "',' (comma)",
					"space": "' ' (space)",
					"none": "none"
				},
				"opts_city_tag": {
					"lab": "[city] tag shows:",
					"info": "City info",
					"region": "Region view"
				},
				"opts_lowest_lvl": {
					"lab1": "Select buildings that you want to upgrade with 'L (upgrade any lowest level)' shortcut",
					"lab2": "Define Max levels of every group type at which shortcut 'L' will stop upgrading",
					"towers": "Towers:",
					"military": "Military:",
					"resource": "Resource:",
					"cottage": "Cottage:",
					"barracks": "Barracks:",
					"utilities": "Utilities:"
				},
				"opts_set_hotkeys": "Click on one of the following buttons and then press a key to define shortcut",
				"opts_hotkey_labels": {
					"lab1": "Build hotkeys:",
					"lab2": "Upgrade hotkeys:",
					"lab3": "Moonstone creation hotkeys:",
					"lab4": "Global hotkeys:",
					"upgrade": "Upgrade building",
					"downgrade": "Downgrade / Demolish (Shift+)",
					"minister": "Assign to Minister",
					"prev_city": "Previous city",
					"next_city": "Next city"
				},
				"opts_clr_inc_res": "Incoming resources label font colors:",
				"opts_clr_chat": {
					"lab": "Chat font colors:",
					"all": "All:",
					"alliance": "Alliance:",
					"whisper": "Whisper ",
					"background": "Background:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Save",
					"export": "Export",
					"import": "Import",
					"export_lab": "You can save this string in a text file and import it later when needed.",
					"import_lab": "Insert saved LoU Tweak Options into text field and press OK.",
					"import_invalid": "Inserted string is invalid"
				},
				"layout": {
					"city": "City layout",
					"overlay": "Overlay layout",
					"apply": "Apply layout",
					"remove": "Remove layout"
				},
				"opts_lang": {
					"lab": "LoU Tweak language",
					"en": "English (Englisch)",
					"de": "German (Deutsch)",
					"es": "Spanish (Español)",
					"pl": "Polish (Polski)",
					"pt": "Portuguese (Português)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Click to open 'Purify resources' window",
				"opts_minimap": {
					"enable_lab": "Enable MiniMap",
					"clrs_lab": "MiniMap colors:",
					"show_cities": "Show cities",
					"show_none": "None",
					"show_noncastle": "Non-castle",
					"show_castle": "Castle",
					"show_all": "All",
					"show_self": "My",
					"show_alliance": "Alliance",
					"show_allied": "Allied",
					"show_enemy": "Enemy",
					"show_nap": "NAP",
					"show_other": "Other",
					"show_lawless": "Lawless",
					"show_moongate": "Moongates",
					"show_shrine": "Shrines",
					"clr_self": "Self:",
					"clr_alliance": "Alliance:",
					"clr_allied": "Allied:",
					"clr_enemy": "Enemy:",
					"clr_nap": "NAP:",
					"clr_other": "Other:",
					"clr_lawless": "Lawless:",
					"clr_moongate": "Moongate:",
					"clr_shrine": "Shrine:"
				},
				"trade_limit": "Limit",
				"no": "No",
				"yes": "Yes",
				"req_restart": "(requires restart)",
				"opts_save_ss_cn": "Save overlay layout Sharestring in city notes",
				"opts_trade_lab_max_amount": "Amount of Trade Summary labels to be displayed:",
				"show_get_use_btn_tt": "Show 'Get & Use' buttons",
				"opts_hide_get_use": "Hide 'Get & Use' buttons",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"1": { /* german */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "LoU Tweak Optionen anzeigen",
				"layout_btn_tt": "Für die aktuelle Stadt einen LoU City Planner Sharestring erzeugen",
				"chat_btn_city": "Stadt",
				"chat_btn_player": "Spieler",
				"chat_btn_alliance": "Allianz",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Kopiere Koordinaten in den Chat",
				"up_count_tt": "Zum Aufwerten verfügbare Gebäude:",
				"opts_max_chatlines": "Maximale Zeilen im Chat:",
				"opts_chat_opacity": "Chat Hintergrundtransparenz:",
				"opts_switch_to_ally_tab": "Beim Start zum  Allianz-Tab wechseln",
				"opts_show_queue_win": "Info-Fenster für Aufträge anzeigen",
				"opts_limit_req_res": "Begrenze bestellte Rohstoffe auf die freie Lagerkapazität der Stadt",
				"opts_inc_res": {
					"lab": "Label für ankommende Waren:",
					"disabled": "deaktiviert",
					"always": "Immer an",
					"context": "Kontextabhängig"
				},
				"opts_separator": {
					"lab": "Tausendertrennung:",
					"period": "'.' (Punkt)",
					"comma": "',' (Komma)",
					"space": "' ' (Leerzeichen)",
					"none": "ohne"
				},
				"opts_city_tag": {
					"lab": "[stadt] Tag zeigt:",
					"info": "Stadt Info",
					"region": "Regionsansicht"
				},
				"opts_lowest_lvl": {
					"lab1": "Wähle die Gebäude zur Aufwertung durch den 'L (niedrigste Stufe aufwerten)' Tastenkürzel aus",
					"lab2": "Die maximale Stufe für jede Gruppe festlegen, bei der das Tastenkürzel 'L' das Aufwerten beendet",
					"towers": "Türme:",
					"military": "Militär:",
					"resource": "Waren:",
					"cottage": "Wohnhaus:",
					"barracks": "Kaserne:",
					"utilities": "Versorger:"
				},
				"opts_set_hotkeys": "Zum Festlegen eines Tastenkürzels zuerst den Button anklicken und dann eine Taste drücken",
				"opts_hotkey_labels": {
					"lab1": "Aufbau-Hotkeys:",
					"lab2": "Aufwertungs-Hotkeys:",
					"lab3": "Mondsteinerzeugungs-Hotkeys:",
					"lab4": "Allgemeine Hotkeys:",
					"upgrade": "Gebäude aufwerten",
					"downgrade": "Abwerten / Abriss (Umschalt+)",
					"minister": "Dem Minister zuweisen",
					"prev_city": "Vorherige Stadt",
					"next_city": "Nächste Stadt"
				},
				"opts_clr_inc_res": "Font Farbe für Ankommende Waren Label:",
				"opts_clr_chat": {
					"lab": "Font Farben für Chat:",
					"all": "Alle:",
					"alliance": "Allianz:",
					"whisper": "Flüstern ",
					"background": "Hintergrund:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Speichern",
					"export": "Exportieren",
					"import": "Importieren",
					"export_lab": "Diese Zeichenkette in einer Textdatei speichern und später bei Bedarf importieren.",
					"import_lab": "Gespeicherte LoU Tweak Optionen in das Textfeld einfügen und OK drücken.",
					"import_invalid": "Die eingefügte Zeichenkette ist ungültig"
				},
				"layout": {
					"city": "Stadtplan",
					"overlay": "Übersichtsplan einblenden",
					"apply": "Übersichtsplan anwenden",
					"remove": "Übersichtsplan entfernen"
				},
				"opts_lang": {
					"lab": "Sprache des LoU Tweak",
					"en": "Englisch (English)",
					"de": "Deutsch (German)",
					"es": "Spanisch (Spanish)",
					"pl": "Polnisch (Polish)",
					"pt": "Portuguese (Portuguese)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Click to open 'Purify resources' window",
				"opts_minimap": {
					"enable_lab": "Enable MiniMap",
					"clrs_lab": "MiniMap colors:",
					"show_cities": "Show cities",
					"show_none": "None",
					"show_noncastle": "Non-castle",
					"show_castle": "Castle",
					"show_all": "All",
					"show_self": "My",
					"show_alliance": "Alliance",
					"show_allied": "Allied",
					"show_enemy": "Enemy",
					"show_nap": "NAP",
					"show_other": "Other",
					"show_lawless": "Lawless",
					"show_moongate": "Moongates",
					"show_shrine": "Shrines",
					"clr_self": "Self:",
					"clr_alliance": "Alliance:",
					"clr_allied": "Allied:",
					"clr_enemy": "Enemy:",
					"clr_nap": "NAP:",
					"clr_other": "Other:",
					"clr_lawless": "Lawless:",
					"clr_moongate": "Moongate:",
					"clr_shrine": "Shrine:"
				},
				"trade_limit": "Limit",
				"no": "No",
				"yes": "Yes",
				"req_restart": "(requires restart)",
				"opts_save_ss_cn": "Save overlay layout Sharestring in city notes",
				"opts_trade_lab_max_amount": "Amount of Trade Summary labels to be displayed:",
				"show_get_use_btn_tt": "Show 'Get & Use' buttons",
				"opts_hide_get_use": "Hide 'Get & Use' buttons",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"2": { /* spanish */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Pincha para mostrar las opciones de LoU Tweak",
				"layout_btn_tt": "Pincha para generar un texto con el diseño de tu ciudad actual",
				"chat_btn_city": "Ciudad",
				"chat_btn_player": "Jugador",
				"chat_btn_alliance": "Alianza",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copiar coordenadas al chat",
				"up_cout_tt": "Edificios disponibles para ampliar:",
				"opts_max_chatlines": "Líneas máximas de chat:",
				"opts_chat_opacity": "Transparencia de la ventana de Chat:",
				"opts_switch_to_ally_tab": "Cambiar a la pestaña Alianza al comenzar",
				"opts_show_queue_win": "Mostrar ventana de información de colas",
				"opts_limit_req_res": "Limitar recursos solicitados a la capacidad disponible de la ciudad",
				"opts_inc_res": {
					"lab": "Etiqueta de recursos entrates:",
					"disabled": "Desactivado",
					"always": "Siempre",
					"context": "Contextual"
				},
				"opts_separator": {
					"lab": "Separador de miles:",
					"period": "'.' (punto)",
					"comma": "',' (coma)",
					"space": "' ' (espacio)",
					"none": "ninguno"
				},
				"opts_city_tag": {
					"lab": "La etiqueta [city] muestra:",
					"info": "Información de la ciudad",
					"region": "Vista de la región"
				},
				"opts_lowest_lvl": {
					"lab1": "Selecciona los edificios que quieres ampliar con el acceso directo 'L (amplia cualquiera del nivel más bajo)'",
					"lab2": "Define el nivel máximo de todos los tipos de grupo con el que el acceso directo 'L' se detendrá la actualización",
					"towers": "Torres:",
					"military": "Militares:",
					"resource": "Recursos:",
					"cottage": "Cottage:",
					"barracks": "Barracas:",
					"utilities": "Utilidades:"
				},
				"opts_set_hotkeys": "Pincha en uno de los siguientes botones y presiona una tecla para definir un acceso directo",
				"opts_hotkey_labels": {
					"lab1": "Teclas de acceso directo para Edificios:",
					"lab2": "Teclas de acceso directo para Ampliaciones:",
					"lab3": "Teclas de acceso directo para la creación de Moonstone:",
					"lab4": "Teclas de acceso directo Globales:",
					"upgrade": "Ampliar edificios",
					"downgrade": "Desampliar / Demoler (Shift+)",
					"minister": "Asignar al Ministro",
					"prev_city": "Ciudad anterior",
					"next_city": "Ciudad siguiente"
				},
				"opts_clr_inc_res": "Color de las fuente de la etiqueta de recursos entrantes:",
				"opts_clr_chat": {
					"lab": "Color de la fuente del Chat:",
					"all": "Todos:",
					"alliance": "Alianza:",
					"whisper": "Susurro ",
					"background": "Fondo:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Salvar",
					"export": "Exportar",
					"import": "Importar",
					"export_lab": "Puedes salvar esta cadena de texto como un fichero de texto e importarlo más adelante.",
					"import_lab": "Inserta las opciones salvadas del LoU Tweak en el campo de texto y presiona ok.",
					"import_invalid": "La cadena de texto introducida no es válida"
				},
				"layout": {
					"city": "Diseño de la ciudad",
					"overlay": "Superponer diseño",
					"apply": "Aplicar diseño",
					"remove": "Eliminar diseño"
				},
				"opts_lang": {
					"lab": "Idoma:",
					"en": "Inglés (English)",
					"de": "Alemán (Deutsch)",
					"es": "Español (Spanish)",
					"pl": "Polaco (Polish)",
					"pt": "Portuguese (Portuguese)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Pincha aquí para abrir la ventana 'Purificación de recursos'",
				"opts_minimap": {
					"enable_lab": "Activar MiniMapa",
					"clrs_lab": "Colores del MiniMapa:",
					"show_cities": "Mostrar ciudades",
					"show_none": "Ninguno",
					"show_noncastle": "Sin castillo",
					"show_castle": "Castillo",
					"show_all": "Todo",
					"show_self": "Yo",
					"show_alliance": "Alianza",
					"show_allied": "Aliado",
					"show_enemy": "Enemigo",
					"show_nap": "NAP",
					"show_other": "Otro",
					"show_lawless": "Lawless",
					"show_moongate": "Moongates",
					"show_shrine": "Shrines",
					"clr_self": "Yo:",
					"clr_alliance": "Alianza:",
					"clr_allied": "Aliado:",
					"clr_enemy": "Enemigo:",
					"clr_nap": "NAP:",
					"clr_other": "Otro:",
					"clr_lawless": "Lawless:",
					"clr_moongate": "Moongate:",
					"clr_shrine": "Shrine:"
				},
				"trade_limit": "Límite",
				"no": "No",
				"yes": "Si",
				"req_restart": "(requiere reiniciar)",
				"opts_save_ss_cn": "Save overlay layout Sharestring in city notes",
				"opts_trade_lab_max_amount": "Amount of Trade Summary labels to be displayed:",
				"show_get_use_btn_tt": "Show 'Get & Use' buttons",
				"opts_hide_get_use": "Hide 'Get & Use' buttons",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"3": { /* polish */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Kliknij aby otworzyć okno opcji LoU Tweak",
				"layout_btn_tt": "Kliknij aby wygenerować plan (ShareString) tego miasta",
				"chat_btn_city": "Miasto",
				"chat_btn_player": "Gracz",
				"chat_btn_alliance": "Sojusz",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Kopiuj współrzędne do czatu",
				"up_count_tt": "Ilość budynków możliwych do rozbudowy:",
				"opts_max_chatlines": "Maksymalna liczba linii czatu:",
				"opts_chat_opacity": "Przezroczystość tła czatu:",
				"opts_switch_to_ally_tab": "Przełącz na kartę Sojuszu podczas startu",
				"opts_show_queue_win": "Pokaż okno z czasami kolejek",
				"opts_limit_req_res": "Ogranicz zamawiane surowce do wolnego miejsca",
				"opts_inc_res": {
					"lab": "Okno przybywających surowców:",
					"disabled": "Wyłączone",
					"always": "Zawsze włączone",
					"context": "Kontekstowo"
				},
				"opts_separator": {
					"lab": "Separator tysięczny:",
					"period": "'.' (kropka)",
					"comma": "',' (przecinek)",
					"space": "' ' (spacja)",
					"none": "brak"
				},
				"opts_city_tag": {
					"lab": "Tag [city] pokazuje:",
					"info": "Informacje o mieście",
					"region": "Widok regionu"
				},
				"opts_lowest_lvl": {
					"lab1": "Wybierz budynki, które chcesz rozbudować przy pomocy skrótu 'L (rozbuduj najniższy poziom)'",
					"lab2": "Zdefinuj poziomy dla każdej grupy, przy których skrót 'L' przestanie ulepszać",
					"towers": "Wieże:",
					"military": "Wojskowe:",
					"resource": "Surowce:",
					"cottage": "Chatki:",
					"barracks": "Baraki:",
					"utilities": "Użyteczności:"
				},
				"opts_set_hotkeys": "Aby przypisać skrót, kliknij na przycisku, a następnie wciśnij klawisz na klawiaturze",
				"opts_hotkey_labels": {
					"lab1": "Skróty konstrukcyjne:",
					"lab2": "Skróty ulepszeń:",
					"lab3": "",
					"lab4": "Skróty globalne:",
					"upgrade": "Rozbuduj budynek",
					"downgrade": "Degraduj / Zniszcz (Shift+)",
					"minister": "Przypisz do Ministra",
					"prev_city": "Poprzednie miasto",
					"next_city": "Następne miasto"
				},
				"opts_clr_inc_res": "Kolory okna przybywających surowców:",
				"opts_clr_chat": {
					"lab": "Kolory czatu:",
					"all": "Wszyscy:",
					"alliance": "Sojusz:",
					"whisper": "Szept ",
					"background": "Tło:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Zapisz",
					"export": "Eksport",
					"import": "Import",
					"export_lab": "Możesz zapisać ten tekst w pliku tekstowym i w razie potrzeby przywrócić opcje.",
					"import_lab": "Wklej zapisane opcje LoU Tweak i wciśnij OK.",
					"import_invalid": "Wklejony ciąg jest niepoprawny"
				},
				"layout": {
					"city": "Plan miasta",
					"overlay": "Wirtualny plan",
					"apply": "Zastosuj plan",
					"remove": "Usuń plan"
				},
				"opts_lang": {
					"lab": "Język LoU Tweak",
					"en": "Angielski (English)",
					"de": "Niemiecki (German)",
					"es": "Hiszpański (Spanish)",
					"pl": "Polski (Polish)",
					"pt": "Portugalski (Português)",
					"ru": "Rosyjski (Русский)",
					"it": "Włoski (Italiano)",
					"fr": "Francuski (French)"
				},
				"purify_btn_tt": "Kliknij aby otworzyć okno oczyszczania surowców",
				"opts_minimap": {
					"enable_lab": "Włącz MiniMapę",
					"clrs_lab": "Kolory MiniMapy:",
					"show_cities": "Pokaż miasta",
					"show_none": "Żadne",
					"show_noncastle": "Bez zamku",
					"show_castle": "Z zamkiem",
					"show_all": "Wszystkie",
					"show_self": "Moje",
					"show_alliance": "Sojuszu",
					"show_allied": "Sprzymierzone",
					"show_enemy": "Wrogów",
					"show_nap": "NAP",
					"show_other": "Inne",
					"show_lawless": "Porzucone",
					"show_moongate": "Moongates",
					"show_shrine": "Shrines",
					"clr_self": "Moje:",
					"clr_alliance": "Sojusz:",
					"clr_allied": "Sprzymierzone:",
					"clr_enemy": "Wrogie:",
					"clr_nap": "NAP:",
					"clr_other": "Inne:",
					"clr_lawless": "Porzucone:",
					"clr_moongate": "Moongate:",
					"clr_shrine": "Shrine:"
				},
				"trade_limit": "Limit",
				"no": "Nie",
				"yes": "Tak",
				"req_restart": "(wymagany restart)",
				"opts_save_ss_cn": "Zapisz plan miasta w notatkach",
				"opts_trade_lab_max_amount": "Amount of Trade Summary labels to be displayed:",
				"show_get_use_btn_tt": "Show 'Get & Use' buttons",
				"opts_hide_get_use": "Hide 'Get & Use' buttons",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"4": { /* portuguese */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Clique para mostrar as opções do LoU Tweak",
				"layout_btn_tt": "Clique para gerar a Sharestring da cidade atual",
				"chat_btn_city": "Cidade",
				"chat_btn_player": "Jogador",
				"chat_btn_alliance": "Aliança",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copiar as coordenadas para o bate-papo",
				"up_count_tt": "Construções disponíveis para melhora:",
				"opts_max_chatlines": "Máximo de linhas no bate-papo:",
				"opts_chat_opacity": "Transparência do fundo do bate-papo:",
				"opts_switch_to_ally_tab": "Mostrar a guia Aliança ao iniciar",
				"opts_show_queue_win": "Mostrar janela de informações da fila",
				"opts_limit_req_res": "Limitar os recursos pedidos ao espaço livre da cidade",
				"opts_inc_res": {
					"lab": "Rótulo dos recursos a chegar:",
					"disabled": "Desabilitado",
					"always": "Sempre ligado",
					"context": "Contextual"
				},
				"opts_separator": {
					"lab": "Separador de milhares:",
					"period": "'.' (ponto)",
					"comma": "',' (vírgula)",
					"space": "' ' (espaço)",
					"none": "nenhum"
				},
				"opts_city_tag": {
					"lab": "A marca [city] mostra:",
					"info": "Informações da cidade",
					"region": "Vista da região"
				},
				"opts_lowest_lvl": {
					"lab1": "Selecione as construções que você quer melhor com o atalho 'L (melhorar o de menor nível)'",
					"lab2": "Defina o nível máximo ao qual o atalho 'L' irá parar de melhorar",
					"towers": "Torres:",
					"military": "Militar:",
					"resource": "Recursos:",
					"cottage": "Casas pequenas:",
					"barracks": "Casernas:",
					"utilities": "Utilitários:"
				},
				"opts_set_hotkeys": "Clique em um dos seguintes botões e aperte uma tecla para definir o atalho",
				"opts_hotkey_labels": {
					"lab1": "Atalhos para construção:",
					"lab2": "Atalhos para melhora:",
					"lab3": "Artalhos para criação de Pedra do Luar:",
					"lab4": "Atalhos globais:",
					"upgrade": "Melhorar construção",
					"downgrade": "Reduzir nível / Demolir (Shift+)",
					"minister": "Atribuir ao ministro",
					"prev_city": "Cidade anterior",
					"next_city": "Próxima cidade"
				},
				"opts_clr_inc_res": "Cores dos rótulos dos recursos a chegar:",
				"opts_clr_chat": {
					"lab": "Cores do texto do bate-papo:",
					"all": "Todos:",
					"alliance": "Aliança:",
					"whisper": "Sussurrar ",
					"background": "Cor do fundo:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Salvar",
					"export": "Exportar",
					"import": "Importar",
					"export_lab": "Você pode salvar isto em um arquivo de texto e importar mais tarde quando necessário.",
					"import_lab": "Insira as opções salvas do LoU Tweak no campo de texto e aperte OK.",
					"import_invalid": "O texto inserido é inválido"
				},
				"layout": {
					"city": "Projeto da cidade",
					"overlay": "Sobrepor projeto",
					"apply": "Aplicar projeto",
					"remove": "Remover projeto"
				},
				"opts_lang": {
					"lab": "Idioma do LoU Tweak",
					"en": "Inglês (Englisch)",
					"de": "Alemão (Deutsch)",
					"es": "Espanhol (Español)",
					"pl": "Polonês (Polski)",
					"pt": "Português (Portuguese)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Clique para abrir a janela 'Purificar Recursos'",
				"opts_minimap": {
					"enable_lab": "Habilitar Minimapa",
					"clrs_lab": "Cores do Minimapa:",
					"show_cities": "Mostrar cidades",
					"show_none": "Nenhuma",
					"show_noncastle": "Sem castelo",
					"show_castle": "Com castelo",
					"show_all": "Todas",
					"show_self": "Minhas",
					"show_alliance": "Aliança",
					"show_allied": "Aliados",
					"show_enemy": "Inimigos",
					"show_nap": "PNA",
					"show_other": "Outras",
					"show_lawless": "Cidades sem lei",
					"show_moongate": "Portas do Luar",
					"show_shrine": "Palácios",
					"clr_self": "Próprias:",
					"clr_alliance": "Aliança:",
					"clr_allied": "Aliados:",
					"clr_enemy": "Inimigos:",
					"clr_nap": "PNA:",
					"clr_other": "Outras:",
					"clr_lawless": "Cidades sem lei:",
					"clr_moongate": "Portas do Luar:",
					"clr_shrine": "Palácios:"
				},
				"trade_limit": "Limite",
				"no": "Não",
				"yes": "Sim",
				"req_restart": "(requer reinício)",
				"opts_save_ss_cn": "Salvar a Sharestring do projeto sobreposto nas Notas da Cidade",
				"opts_trade_lab_max_amount": "Quantide de rótulos a mostrar no Resumo do Comércio:",
                "show_get_use_btn_tt": "Mostrar botões 'Obter e usar'",
                "opts_hide_get_use": "Ocultar botões 'Obter e usar'",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"5": { /* russian */

				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Нажмите для показа настроек LoU Tweak",
				"layout_btn_tt": "Нажмите для создания макета Sharestring для этого города",
				"chat_btn_city": "Город",
				"chat_btn_player": "Игрок",
				"chat_btn_alliance": "Альянс",
				"chat_btn_url": "Ссылка",
				"copy_coords_btn": "Координаты в чат",
				"up_count_tt": "Здания, доступные для повышения уровня:",
				"opts_max_chatlines": "Максимум строк в чате:",
				"opts_chat_opacity": "Прозрачность фона чата:",
				"opts_switch_to_ally_tab": "Перейти во вкладку альянса при запуске",
				"opts_show_queue_win": "Показывать очередь в окне информации",
				"opts_limit_req_res": "Установить лимит запрашиваемых ресурсов исходя из свободного места в городе",
				"opts_inc_res": {
					"lab": "Показ информации о поступающих ресурсах:",
					"disabled": "Отключить",
					"always": "Всегда",
					"context": "Если поступают"
				},
				"opts_separator": {
					"lab": "Разделять тысячи:",
					"period": "'.' (точкой)",
					"comma": "',' (запятой)",
					"space": "' ' (пробелом)",
					"none": "не разделять"
				},
				"opts_city_tag": {
					"lab": "тэг [city] показывает:",
					"info": "Информацию о городе",
					"region": "Место в регионе"
				},
				"opts_lowest_lvl": {
					"lab1": "Выберите здания, которым вы хотите повысить уровень с горячей клавишей 'L (Повышение уровня любого низкого уровня)'",
					"lab2": "Определить максимальный уровень повышения каждой группы для горячей клавиши 'L'",
					"towers": "Башни:",
					"military": "Военные:",
					"resource": "Ресурсные:",
					"cottage": "Коттеджи:",
					"barracks": "Казармы:",
					"utilities": "Обслуживающие:"
				},
				"opts_set_hotkeys": "Нажмите на одну из следующих кнопок и затем нажмите на клавишу, для определения горячей клавиши",
				"opts_hotkey_labels": {
					"lab1": "Горячие клавишит зданий:",
					"lab2": "Горячие клавиши повышения уровня:",
					"lab3": "Горячие клавиши обогащения ресурсов:",
					"lab4": "Глобальные горячие клавиши:",
					"upgrade": "Повышение уровня здания",
					"downgrade": "Понижение уровня / Снос (Shift+)",
					"minister": "Назначить министра",
					"prev_city": "Предыдущий город",
					"next_city": "Следующий город"
				},
				"opts_clr_inc_res": "Цвет шрифта окна поступающих ресурсов:",
				"opts_clr_chat": {
					"lab": "Цвет шрифта чата:",
					"all": "Все:",
					"alliance": "Альянс:",
					"whisper": "Личные сообщения ",
					"background": "Фон:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Сохранить",
					"export": "Экспорт",
					"import": "Импорт",
					"export_lab": "Вы можете сохранить эти строки в текстовый файл и импортировать когда понадобится.",
					"import_lab": "Вставьте сохраненные настройки LoU Tweak в текстовое поле и нажмите OK.",
					"import_invalid": "Вставленная строка не подходит"
				},
				"layout": {
					"city": "План города",
					"overlay": "Наложение плана",
					"apply": "Применить план",
					"remove": "Удалить план"
				},
				"opts_lang": {
					"lab": "LoU Tweak language",
					"en": "English (Englisch)",
					"de": "German (Deutsch)",
					"es": "Spanish (Español)",
					"pl": "Polish (Polski)",
					"pt": "Portuguese (Português)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Нажмите, что бы открыть окно 'Послать ресурсы'",
				"opts_minimap": {
					"enable_lab": "Включить миникарту",
					"clrs_lab": "Цвета на миникарте:",
					"show_cities": "Показатьт города",
					"show_none": "Ничего",
					"show_noncastle": "Без замка",
					"show_castle": "Замок",
					"show_all": "Все",
					"show_self": "Мой",
					"show_alliance": "Альянс",
					"show_allied": "Союзник",
					"show_enemy": "Враг",
					"show_nap": "NAP",
					"show_other": "Другое",
					"show_lawless": "Вне закона",
					"show_moongate": "Лунные ворота",
					"show_shrine": "Святилище",
					"clr_self": "Сам:",
					"clr_alliance": "Альянс:",
					"clr_allied": "Союзник:",
					"clr_enemy": "Враг:",
					"clr_nap": "NAP:",
					"clr_other": "Другое:",
					"clr_lawless": "Нарушающий:",
					"clr_moongate": "Лунные врата:",
					"clr_shrine": "Святилище:"
				},
				"trade_limit": "Лимит",
				"no": "Нет",
				"yes": "Да",
				"req_restart": "(требуется перезагрузка)",
				"opts_save_ss_cn": "Сохранить макет Sharestring в заметках города",
				"opts_trade_lab_max_amount": "Amount of Trade Summary labels to be displayed:",
				"show_get_use_btn_tt": "Show 'Get & Use' buttons",
				"opts_hide_get_use": "Hide 'Get & Use' buttons",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"6": { /* italian */

				/* adding new italian translation for LoU turbo*/
				"start_autopilot": "Avvia pilota automatico",
				"stop_autopilot": "Ferma pilota automatico",
				"auto_switch_cities_enabled": "Ruota automaticamente le citta'",
				"default_4all_cities": "Default per tutte le citta'",
				"refresh_cities": "Aggiorna",
				"apply_2all_cities": "Applica a tutte le citta'",
				"enbl_autoadd_build": "Edificazione automatica\xa0",
				"enbl_autoupgrd_build": "Aggiornamento automatico degli edifici",

				"enbl_autosend_attack": "Attacco automatico sotterranei\xa0",
				"enbl_autopurify": "Auto-purificazione",
				"purify_thrsld": "Soglia in deposito %\xa0",
				"autoupgrd_focus": "Edifici da aggiornare in base alle risorse",
				"upgrd_all_blds_from_gen_tab": "Aggiorna TUTTO dal livello piu' basso in base all'elenco in fondo alla scheda Generale",


				"res_wood": "Legna",
				"res_stone": "Pietra",
				"res_iron": "Ferro",
				"res_food": "Cibo",
				"bld_military": "Edifici militari",
				"bld_barracks": "Caserme",
				"bld_towers": "Torri",
				"notify_msgs": "Area di notifica",
				"refresh_msgs": "Aggiorna",
				"txt_clear": "Pulisci",
				"min_wait_auto_topups": "Tempo di aggiornamento dei comandi automatici (sec) ",
				"min_wait_switch_city": "Tempo di rotazione tra citta' (sec) ",
				"turbo_city_specific": "Turbo per questa citta'",
				"auto_build_layout": "Edifica automaticamente (incolla qui il codice Sharestring per costruire automaticamente)",

				"open_flash_pl_1": "Apri con Flash City Planner 1",
				"open_flash_pl_2": "Apri con Flash City Planner 2",
				"txt_auto_attack": "Attacco automatico:",
				"txt_units": "Unita':",
				"txt_coords": "Coordinate:",
				"btn_apply": "Applica",
				"tab_general": "Generale",
				"tab_hotkeys": "Tasti rapidi",
				"tab_colors": "Colori",
				"tab_turbo": "Turbo-v",
				"main_title": "Opzioni di LoU Tweak",
				"inc_res_txt": "Risorse in arrivo",
				"nxt_arr_txt": "Prossimo arrivo: ",
				"sel_all": "Seleziona tutto",
				"unsel_all": "Deseleziona tutto",
				/* ending new italian translation for LoU turbo*/
				"options_btn_tt": "Clicca per mostrare le opzioni di LoU Tweak",
				"layout_btn_tt": "Clicca per creare un layout Sharestring per questa citta'",
				"chat_btn_city": "Citta'",
				"chat_btn_player": "Giocatore",
				"chat_btn_alliance": "Alleanza",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copia Coordinate nella Chat",
				"up_count_tt": "Edifici Potenziabili:",
				"opts_max_chatlines": "Numero massimo di righe in chat:",
				"opts_chat_opacity": "Trasparenza dello sfondo nella Chat:",
				"opts_switch_to_ally_tab": "Apri la scheda Alleanza all'avvio",
				"opts_show_queue_win": "Mostra la lista della Code di Costruzione/Reclutamento",
				"opts_limit_req_res": "Impostare un limite di risorse richieste in base allo spazio disponibile in città",
				"opts_inc_res": {
					"lab": "Informazioni sulle Risorse in Arrivo:",
					"disabled": "Disabilita",
					"always": "Sempre Attiva",
					"context": "Automatica (Solo se in arrivo)"
				},
				"opts_separator": {
					"lab": "Separatore Migliaia:",
					"period": "'.' (punto)",
					"comma": "',' (virgola)",
					"space": "' ' (spazio)",
					"none": "nessuna"
				},
				"opts_city_tag": {
					"lab": "la tag [city] mostra:",
					"info": "Informazioni cità'",
					"region": "Vista Regione"
				},
				"opts_lowest_lvl": {
					"lab1": "Seleziona gli edifici che vuoi potenziare con il tasto 'L' (potenzia tutte gli edifici più bassi)",
					"lab2": "Definisci il livello massimo di poteziamento per tutti gli edifici aggiornabile con il tasto 'L'",
					"towers": "Torri:",
					"military": "Militari:",
					"resource": "Risorse:",
					"cottage": "Cottage:",
					"barracks": "Caserme:",
					"utilities": "Utilita':"
				},
				"opts_set_hotkeys": "Clicca in una dei seguenti bottoni e premi un tasto per definire la nuova scorciatoia",
				"opts_hotkey_labels": {
					"lab1": "Scorciatoie Costruzioni:",
					"lab2": "Scorciatoie Potenziamento:",
					"lab3": "Scorciatoie Risorse Purificate:",
					"lab4": "Scorciatoie Globali",
					"upgrade": "Potenzia Edificio",
					"downgrade": "Depotenzia / Demolisci (Shift+)",
					"minister": "Assegna al Ministro",
					"prev_city": "Citta' Precedente",
					"next_city": "Citta' Successiva"
				},
				"opts_clr_inc_res": "Colore scritta 'Risorse in Arrivo'",
				"opts_clr_chat": {
					"lab": "Colore del testo in Chat:",
					"all": "Tutti:",
					"alliance": "Alleanza:",
					"whisper": "Sussurro ",
					"background": "Sfondo:",
					"social": "Social:",
					"louwin": "LoU:"
				},
				"opts": {
					"save": "Salva",
					"export": "Esporta",
					"import": "Importa",
					"export_lab": "Puoi salvare questa stringa in un file di testo e importarla quando vuoi.",
					"import_lab": "Inserisci le opzioni salvate di LoU Tweak nel campo seguente e premi OK.",
					"import_invalid": "Stringa inserita non valida!"
				},
				"layout": {

					"city": "Layout Citta'",

					"overlay": "Etichette",
					"apply": "Applica etichette",
					"remove": "Rimuovi etichette"
				},
				"opts_lang": {
					"lab": "LoU Tweak language",
					"en": "English (Englisch)",
					"de": "German (Deutsch)",
					"es": "Spanish (Español)",
					"pl": "Polish (Polski)",
					"pt": "Portuguese (Português)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Clicca su 'Purifica Risorse' per aprire la finestra",
				"opts_minimap": {
					"enable_lab": "Abilita Mini Mappa",
					"clrs_lab": "Colori Mini Mappa:",
					"show_cities": "Mostra Citta'",
					"show_none": "Nessuna",
					"show_noncastle": "Senza Castello",
					"show_castle": "Castlelli",
					"show_all": "Tutte",
					"show_self": "Mie",
					"show_alliance": "Alleanza",
					"show_allied": "Alleate",
					"show_enemy": "Nemici",
					"show_nap": "PNA",
					"show_other": "Altre",
					"show_lawless": "Fuorilegge",
					"show_moongate": "Moongates",
					"show_shrine": "Santuari",
					"clr_self": "Mie:",
					"clr_alliance": "Alleanza:",
					"clr_allied": "Alleate:",
					"clr_enemy": "Nemiche:",
					"clr_nap": "PNA:",
					"clr_other": "Altre:",
					"clr_lawless": "Fuorilegge:",
					"clr_moongate": "Moongate:",
					"clr_shrine": "Santuari:"
				},
				"trade_limit": "Limiti",
				"no": "No",
				"yes": "Si",
				"req_restart": "(richiede riavvio)",
				"opts_save_ss_cn": "Salva layout Sharestring nelle note della citta'",
				"opts_trade_lab_max_amount": "Numero di etichette da mostrare per il commercio:",
				"show_get_use_btn_tt": "Mostra i pulsanti 'Compra & Usa'",
				"opts_hide_get_use": "Nascondi i pulsanti 'Compra & Usa'",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			},
			"7": { /* french */
				/* adding new translation for LoU turbo*/
				"start_autopilot": "Start autopilot",
				"stop_autopilot": "Stop autopilot",
				"auto_switch_cities_enabled": "Enable Auto Switch Cities",
				"default_4all_cities": "Use Default for all cities",
				"refresh_cities": "Refresh Cities",
				"apply_2all_cities": "Apply Current to all Cities",
				"enbl_autoadd_build": "Enable Auto Add Buildings\xa0",
				"enbl_autoupgrd_build": "Enable Auto Upgrade Buildings",
				"enbl_autosend_attack": "Enable Auto Send Attack\xa0",
				"enbl_autopurify": "Enable Auto Purify",
				"purify_thrsld": "Threshold %:\xa0",
				"autoupgrd_focus": "Auto upgrade Focus",
				"upgrd_all_blds_from_gen_tab": "Upgrade ALL based on detailed priority settings in General Tab",
				"res_wood": "Wood",
				"res_stone": "Stone",
				"res_iron": "Iron",
				"res_food": "Food",
				"bld_military": "Military",
				"bld_barracks": "Barracks",
				"bld_towers": "Towers",
				"notify_msgs": "Messages",
				"refresh_msgs": "Refresh",
				"txt_clear": "Clear",
				"min_wait_auto_topups": "Minimum wait between auto top-ups (secs) ",
				"min_wait_switch_city": "Minimum wait before switching a city (secs) ",
				"turbo_city_specific": "Turbo City Specific",
				"auto_build_layout": "Auto build layout (paste your required building layout between [sharestring] tags with actual 444)",
				"open_flash_pl_1": "Open with Flash City Planner 1",
				"open_flash_pl_2": "Open with Flash City Planner 2",
				"txt_auto_attack": "Auto-attack:",
				"txt_units": "Unit:",
				"txt_coords": "Coordinates:",
				"btn_apply": "Apply",
				"tab_general": "General",
				"tab_hotkeys": "Hotkeys",
				"tab_colors": "Colors",
				"tab_turbo": "Turbo-v",
				"main_title": "LoU Tweak Options",
				"inc_res_txt": "Incoming resources",
				"nxt_arr_txt": "Next arrival in: ",
				"sel_all": "Select all",
				"unsel_all": "Unselect all",
				/* ending new translation for LoU turbo*/
				"options_btn_tt": "Cliquez pour accéder aux Options de LoU Tweak",
				"layout_btn_tt": "Cliquez pour générer un 'Sharestring' pour la ville actuelle",
				"chat_btn_city": "Ville",
				"chat_btn_player": "Joueur",
				"chat_btn_alliance": "Alliance",
				"chat_btn_url": "Lien",
				"copy_coords_btn": "Copier les coordonnées dans le chat",
				"up_count_tt": "Bâtiments disponibles pour mise à niveau :",
				"opts_max_chatlines": "Lignes maximum dans le chat :",
				"opts_chat_opacity": "Transparence de l'arrière-plan du chat :",
				"opts_switch_to_ally_tab": "Aller à l'onglet Alliance au démarrage",
				"opts_show_queue_win": "Montrer la fenêtre de file d'attente",
				"opts_limit_req_res": "Limiter les ressources demandées à l'espace libre dans la ville",
				"opts_inc_res": {
					"lab": "Panneau des ressources entrantes :",
					"disabled": "Désactivé",
					"always": "Toujours actif",
					"context": "Contextuel"
				},
				"opts_separator": {
					"lab": "Séparateur de milliers :",
					"period": "'.' (point)",
					"comma": "',' (virgule)",
					"space": "' ' (espace)",
					"none": "Aucun"
				},
				"opts_city_tag": {
					"lab": "[Ville] Montrer les balises :",
					"info": "Infos de la ville",
					"region": "Vue de la région "
				},
				"opts_lowest_lvl": {
					"lab1": "Sélectionnez les bâtiments que vous souhaitez mettre à niveau avec 'L' (mise à niveau des plus bas niveau) ",
					"lab2": "Définissez les niveaux maximum de chaque type de groupe auquel 'L' doit arrêter la mise à niveau",
					"towers": "Tours :",
					"military": "Militaire :",
					"resource": "Ressources :",
					"cottage": "Cottages :",
					"barracks": "Casernes :",
					"utilities": "Utilitaires :"
				},
				"opts_set_hotkeys": "Cliquez sur un des boutons suivants, puis appuyez sur une touche pour définir des raccourcis",
				"opts_hotkey_labels": {
					"lab1": "Raccourci Construire :",
					"lab2": "Raccourci Monter de niveau :",
					"lab3": "Raccourci Création de pierre lunaire :",
					"lab4": "Raccourci Globaux :",
					"upgrade": "Monter niveau bâtiment",
					"downgrade": "Baisser niveau / DDémolir (Shift+)",
					"minister": "Assigner au Ministre",
					"prev_city": "Ville précédente",
					"next_city": "Ville suivante"
				},
				"opts_clr_inc_res": "Coleurs pour les ressources entrantes :",
				"opts_clr_chat": {
					"lab": "Couleurs pour le chat :",
					"all": "Tous :",
					"alliance": "Alliance :",
					"whisper": "Murmurer :",
					"background": "Arrière-plan :",
					"social": "Social :",
					"louwin": "LoU :"
				},
				"opts": {
					"save": "Sauver",
					"export": "Exporter",
					"import": "Importer",
					"export_lab": "Vous pouvez enregistrer cette chaîne dans un fichier texte et l'importer plus tard, lorsque cela est nécessaire.",
					"import_lab": "Insérez les données sauvées de LoU Tweak Options dans le champ texte et appuyez sur OK.",
					"import_invalid": "La chaîne insérée est invalide"
				},
				"layout": {
					"city": "Masque de la ville",
					"overlay": "Supperposer masque",
					"apply": "Appliquer masque",
					"remove": "Enlever masque"
				},
				"opts_lang": {
					"lab": "LoU Tweak language",
					"en": "English (Englisch)",
					"de": "German (Deutsch)",
					"es": "Spanish (Español)",
					"pl": "Polish (Polski)",
					"pt": "Portuguese (Português)",
					"ru": "Russian (Русский)",
					"it": "Italian (Italiano)",
					"fr": "French (Français)"
				},
				"purify_btn_tt": "Cliquez ici pour ouvrir la fenêtre 'Purifier des ressources'",
				"opts_minimap": {
					"enable_lab": "Activer la MiniMap",
					"clrs_lab": "Couleurs de la MiniMap :",
					"show_cities": "Montrer les villes",
					"show_none": "Rien",
					"show_noncastle": "Sans château",
					"show_castle": "Avec château",
					"show_all": "Tout",
					"show_self": "Moi",
					"show_alliance": "Alliance",
					"show_allied": "Alliés",
					"show_enemy": "Ennemis",
					"show_nap": "NAP",
					"show_other": "Autre ",
					"show_lawless": "Sans foi ni loi",
					"show_moongate": "Portes lunaires",
					"show_shrine": "Sanctuaires",
					"clr_self": "Self:",
					"clr_alliance": "Alliance :",
					"clr_allied": "Alliés :",
					"clr_enemy": "Ennemis :",
					"clr_nap": "NAP :",
					"clr_other": "Autres :",
					"clr_lawless": "Sans foi ni loi :",
					"clr_moongate": "Portes lunaires :",
					"clr_shrine": "Sanctuaires:"
				},
				"trade_limit": "Limite",
				"no": "Non",
				"yes": "Oui",
				"req_restart": "(Redémarrage nécessaire)",
				"opts_save_ss_cn": "Enregistrer la superposition des masques Sharestring dans les notes de la ville",
				"opts_trade_lab_max_amount": "Nombre d'opérations de commerce à afficher :",
				"show_get_use_btn_tt": "Montrer les boutons 'Avoir & Utiliser'",
				"opts_hide_get_use": "Cacher les boutons 'Avoir & Utiliser'",
				"btn_trade_show": "Show Trade Summary labels",
				"btn_trade_hide": "Hide Trade Summary labels",
				"btn_support_show": "Show Support labels",
				"btn_support_hide": "Hide Support labels"
			}
		};
		function L(str) {
			return LT_strings[window.louTweak.main.getInstance().getLang()][str];
		}
		
		qx.Class.define("louTweak.main", {
			type: "singleton",
			extend: qx.core.Object,
			statics: {
				lou_building_id: {
					"woodcutter": 47, "quarry": 48, "farm": 50, "cottage": 4, "market": 5, "ironmine": 49, "sawmill": 7, "mill": 8, "hideout": 9, "stonemason": 10, "foundry": 11, "townhouse": 13, "barracks": 14, "cityguardhouse": 15, "trainingground": 16, "stable": 17, "workshop": 18, "shipyard": 19, "warehouse": 20, "castle": 21, "harbor": 22, "moonglowtower": 36, "trinsictemple": 37, "lookouttower": 38, "ballistatower": 39, "guardiantower": 40, "rangertower": 41, "templartower": 42, "pitfalltrap": 43, "barricade": 44, "arcanetrap": 45, "camouflagetrap": 46
				},
				bd: {


/* woodcutter */		"1": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 1},
/* quarry */			"2": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 2},
/* farm */				"3": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 3},
/* cottage */			"4": {"w": [ 0, 0, 0, 0, 200, 500, 1000, 2000, 5000, 12000 ], "s": [ 50, 150, 300, 600, 1000, 2000, 4000, 7500, 14000, 17000 ], "th": 1},
/* marketplace */		"5": {"w": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200 ], "s": [ 20, 40, 80, 200, 600, 1400, 2800, 4800, 7600, 11600 ], "th": 5},
/* iron mine */			"6": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 4},
/* sawmill */			"7": {"w": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "s": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "th": 6},
/* mill */				"8": {"w": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "s": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "th": 8},
/* hideout */			"9": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 50, 200, 600, 1000, 1500, 2200, 3500, 4500, 6000, 8000 ], "th": 2},
/* stonemason */		"10": {"w": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "s": [ 60, 150, 350, 1100, 2700, 5000, 7800, 13500, 21500, 33000 ], "th": 7},
/* foundry */			"11": {"w": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "s": [ 60, 150, 350, 1100, 2700, 5000, 8500, 13500, 21500, 33000 ], "th": 9},
/* town hall */			"12": {"w": [ 0, 200, 500, 1000, 3000, 8000, 15000, 30000, 60000, 120000 ], "s": [ 0, 0, 100, 300, 1500, 4000, 10000, 25000, 60000, 120000 ], "th": 0},
/* townhouse */			"13": {"w": [ 0, 0, 0, 0, 1000, 2000, 3500, 7000, 14000, 29000 ], "s": [ 100, 300, 600, 2000, 4000, 7000, 11500, 17000, 24000, 29000 ], "th": 5},
/* barracks */			"14": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],"s": [ 50, 150, 300, 600, 1200, 2500, 4000, 7000, 11500, 17500 ], "th": 4},
/* city guard house */	"15": {"w": [ 15, 30, 55, 140, 400, 1000, 1900, 3200, 5100, 8000 ], "s": [ 30, 60, 110, 280, 800, 2000, 3800, 6400, 10200, 16000 ], "th": 3},
/* training ground */	"16": {"w": [ 20, 40, 80, 200, 600, 1400, 2800, 4800, 7500, 11500 ], "s": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15000, 23000 ], "th": 4},
/* stable */			"17": {"w": [ 25, 55, 110, 275, 800, 1900, 3750, 6500, 10200, 15500 ], "s": [ 50, 110, 220, 550, 1600, 3800, 7500, 13000, 20400, 31000 ], "th": 6},
/* workshop */			"18": {"w": [ 40, 75, 150, 370, 1100, 2600, 5200, 8900, 14000, 21500 ], "s": [ 80, 150, 300, 740, 2200, 5200, 10400, 17800, 28000, 43000 ], "th": 9},
/* shipyard */			"19": {"w": [ 50, 100, 200, 500, 1500, 3500, 7000, 12000, 19000, 29000 ], "s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ], "th": 10},
/* warehouse */			"20": {"w": [ 60, 150, 250, 500, 1600, 3000, 6000, 9600, 15000, 20000 ], "s": [ 0, 0, 50, 150, 400, 1000, 2000, 4800, 9000, 13000 ], "th": 1},
/* castle */			"21": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 20000, 25000, 30000, 40000, 55000, 75000, 100000, 130000, 160000, 200000 ], "th": 8},
/* harbor */			"22": {"w": [ 80, 160, 320, 800, 2400, 5600, 11200, 19200, 30400, 46400 ], "s": [ 40, 80, 160, 400, 1200, 2800, 5600, 9600, 15200, 23200 ], "th": 10},
/* wall */				"23": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 200, 2000, 8000, 20000, 30000, 45000, 70000, 100000, 140000, 200000 ], "th": 2},
/* moonglow tower */	"36": {"w": [ 30, 60, 120, 300, 900, 2100, 4200, 7200, 11400, 17400 ], "s": [ 60, 120, 240, 600, 1800, 4200, 8400, 14400, 22800, 34800 ], "th": 7},
/* trinsic temple */	"37": {"w": [ 35, 70, 135, 335, 1000, 2350, 4650, 8000, 12700, 19500 ], "s": [ 70, 140, 270, 670, 2000, 4700, 9300, 16000, 25400, 39000 ], "th": 8},
/* lookout tower */		"38": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 200, 400, 600, 1000, 1500, 2200, 3500, 5000, 7500, 10000 ], "th": 2},
/* ballista tower */	"39": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ], "th": 9},
/* guardian tower */	"40": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ], "th": 6},
/* ranger tower */		"41": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ], "th": 3},
/* templar tower */		"42": {"w": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], "s": [ 100, 200, 400, 1000, 3000, 7000, 14000, 24000, 38000, 58000 ], "th": 8},
/* pitfall trap */		"43": {"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ], "s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ], "th": 5},
/* barricade */			"44": {"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ], "s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ], "th": 7},
/* arcane trap */		"45": {"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ], "s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ], "th": 8},
/* camouflage trap */	"46": {"w": [ 30, 60, 110, 280, 830, 1930, 3850, 6600, 10500, 16000 ], "s": [ 90, 180, 330, 840, 2490, 5790, 11550, 19800, 31500, 48000 ], "th": 10},
/* woodcutter */		"47": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 1},
/* quarry */			"48": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 2},
/* iron mine */			"49": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 4},
/* farm */				"50": {"w": [ 50, 200, 400, 1400, 3500, 6000, 10000, 16000, 25000, 38000 ], "s": [ 0, 0, 200, 600, 1500, 3000, 5000, 8000, 13000, 20000 ], "th": 3},


				}
			},
			members: {
				app: null,
				chat: null,
				titleW: null,
				cBar: null,
				srvBar: null,
				cInfoView: null,
				cDetView: null,
				dDetView: null,
				ncView: null,
				bDetView: null,
				bPlaceDetView: null,
				bQc: null,
				bQcSpdLab: null,
				bQh: null,
//k				uQc: null,
//k				uQh: null,
				city: null,
				cityId: null,
				originalConvertBBCode: null,
				createdTopBottomButtons: null,
				topBottomButtonsListener: null,
				tradeButtonsListener: null,
				temp_limit: null,
				lang: null,
				options: null,
				optionsPage: null,
				layoutWindow: null,
				miniMap: null,
				qtLab: null,
				timer: null,
				lastSentCommand: {},
				lastSentCommandTime: null,
				commandIdenticalCount: {},
				sendCommandBuffer: null,
				sendCommandBusy: null,
//k				reportPage: null,
				reportPageListener: null,
				cTradeInfoView: null,
				getUseBtnVisibility: null,
				getUseCont1: null,
				getUseCont2: null,
				getUseCont3: null,
				cCmdInfoView: null,
//k				moveBuldingDetView: null,
				moveBuildingDetView: null,
				// sg:start
				turboUtils: null, // - class that now holds all new utility methods
				lastUpgradeTime: 0, // - holds last time at which upgrade was triggered
				autoTriggerCount: 0, // This variable is used to identify whether to switch city or not
				upgradeTownHall: false, 
				optBtn: null, // this is a reference to the option button as its label should have a * to indicate new messages
				explicitCityToNull: false, // this is in an indicator that old LT.main.city value has been cleared earlier (to avoid ghost commands to wrong cities). So theres no need to clear it again this time.
				// sg:end
				initialize: function() {



					if (typeof qx.lang.Json == "undefined")
						qx.lang.Json = qx.util.Json;
					if (typeof webfrontend.ui.SpinnerInt == "undefined")
						webfrontend.ui.SpinnerInt = webfrontend.gui.SpinnerInt;
					
					this.app = qx.core.Init.getApplication();

					this.cInfoView = this.app.cityInfoView;
					
					this.chat = this.app.chat;
					
					this.bQc = this.cInfoView.buildingQueue;
					this.bQh = this.bQc.header;
					this.bQcSpdLab = this.bQc.constructionSpeedLabel;
					
//k					this.bDetView = this.app.buildingDetailView;
//k					this.bPlaceDetView = this.app.buildingPlaceDetailView;
					this.bDetView = this.app.getBuildingDetailView();
					this.bPlaceDetView = this.app.getBuildingPlaceDetailView();
					
//k					this.cDetView = this.app.cityDetailView;
//k					this.dDetView = this.app.dungeonDetailView;
//k					this.ncView = this.app.newCityView;
					this.cDetView = this.app.cityDetailView || this.app.getCityDetailView();
					this.dDetView = this.app.dungeonDetailView || this.app.getDungeonDetailView();
					this.ncView = this.app.newCityView || this.app.getNewCityView();
					
					this.titleW = this.app.title;
					this.cBar = this.app.cityBar;
					this.srvBar = this.app.serverBar;
					
					this.lang = qx.locale.Manager.getInstance().getLocale();
					if (!/en|de|es|pl|pt|pt_BR|ru|it/.test(this.lang)) this.lang = "en";
					
					this.createdTopBottomButtons = 0;
					this.getUseBtnVisibility = "visible";
					
					this.timer = qx.util.TimerManager.getInstance();
					this.lastSentCommandTime = 0;
					this.sendCommandBuffer = new Array();
					this.sendCommandBusy = false;
					civ_ch = this.cInfoView.container.getChildren();
					for (i=0; i<civ_ch.length; i++) {
						if (civ_ch[i] instanceof webfrontend.gui.CityTradeInfoView)
							this.cTradeInfoView = civ_ch[i];
					}
					this.moveBuildingDetView = this.app.getMoveBuildingDetailView();
					this.tweakLoU();
				},
				tweakLoU: function() {
//k		try {
					_LT = LT;
					this.loadOptions();
					if (this.options.userLang == "") this.options.userLang = this.lang;
					else this.setLang(this.options.userLang);
					LT.options = this.options;
					LT.srvTime = webfrontend.data.ServerTime.getInstance().refTime; // reference time (server start date in milisec?)
					LT.debug = this.debug;
					LT.thSep = this.thSep;
					LT.a = this.app;
					LT.main = this;
					
					this.miniMap = new window.louTweak.miniMap();
//k					if (!this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
					if (!this.app.getSelectorBar().isMapSelectorBarAnchorToLeft()) {
						this.app.desktop.add(this.miniMap.clientArea, {right: 0, top: 133});
					} else {
						this.app.desktop.add(this.miniMap.clientArea, {right: 0, top: 62});
					}
					if (!LT.options.showMiniMap)
						LT.main.miniMap.clientArea.setVisibility("excluded");
			
					this.app.visMain.addListener("changeMapLoaded", this.miniMap.updateCameraPos, this.miniMap);
					webfrontend.data.City.getInstance().addListener("changeVersion", this.miniMap.updateCameraPos, this.miniMap); // hack to redraw map in region view while switching cities
					qx.bom.Element.addListener(this.app.worldView, "mouseup", LT.main.miniMap.updateCameraPos, this.miniMap);
					
					// ***** Options button ***** //
					this.optBtn = new qx.ui.form.Button("O");
 					this.optBtn.set({width: 30, appearance: "button-text-small", toolTipText: L("options_btn_tt")});
 					this.optBtn.addListener("click", this.showOptionsPage, this);
 					this.srvBar.add(this.optBtn, {top: 2, left: 390});
					
					// sg:start - For displaying the auto-build button
 					// This toggles between starting and stopping auto-pilot.
 					btn = new qx.ui.form.Button("Auto");
 					btn.set({width: 130, appearance: "button-text-small", toolTipText: L("start_autopilot")});
 					this.updateAutoButtonLabel(btn);
 					btn.addListener("click", this.toggleAutoBuild, btn);
					this.srvBar.add(btn, {top: 2, left: 420});
 					// sg:end
					
					// ***** City layout button ***** //
					btn = new qx.ui.form.Button("L");
					btn.set({width: 25, appearance: "button-text-small", toolTipText: L("layout_btn_tt")});
					btn.addListener("click", function(){this.layoutWindow.generateSharestring(); this.layoutWindow.open();}, this);
					this.bQh.add(btn, {top: 33, left: 305});
					// make the button disabled if in region view
					this.app.visMain.addListener("changeMapLoaded", function() { this.setEnabled(LT.a.visMain.mapmode == "c" ? true : false); }, btn);
					
					// ***** Purify resources window button ***** //
					btn = new qx.ui.form.Button("P");
					btn.set({width: 25, appearance: "button-text-small", toolTipText: L("purify_btn_tt")});
					btn.addListener("click", this.showPurifyWindow, this);
					this.bQh.add(btn, {top: 33, left: 275});
					
					// ***** Show 'Get & use' buttons ***** //
					btn = new qx.ui.form.Button("A");
					btn.set({width: 25, appearance: "button-text-small", toolTipText: L("show_get_use_btn_tt"), visibility: "excluded"});
					btn.addListener("click", function() {
						if (this.getUseBtnVisibility == "visible")
							this.getUseBtnVisibility = "excluded";
						else
							this.getUseBtnVisibility = "visible";
						this.showGetUseButtons();
					}, this);
					this.bQh.add(btn, {top: 33, left: 8});
					this.app.setUserData("showGetUseBtn", btn);

					// ***** 'Show/Hide Trade Summary labels' button ***** //
					btn = new qx.ui.form.Button(null, "webfrontend/theme/scrollbar/scrollbar-up.png");
					btn.set({width: 30, height: 20, appearance: "button-brown-sort", toolTipText: L("btn_trade_hide")});
					btn.addListener("click", function() {
						if (LT.main.cTradeInfoView._getChildren()[2].getVisibility() == "visible") {
							LT.main.cTradeInfoView._getChildren()[2].setVisibility("excluded");
							this.set({toolTipText: L("btn_trade_show"), icon: "webfrontend/theme/scrollbar/scrollbar-down.png"});
						} else {
							LT.main.cTradeInfoView._getChildren()[2].setVisibility('visible');
							this.set({toolTipText: L("btn_trade_hide"), icon: "webfrontend/theme/scrollbar/scrollbar-up.png"});
						}
					}, btn);
					LT.main.cTradeInfoView._getChildren()[0].add(btn, {top: 7, left: 140});

					
					// ***** 'Show/Hide Support Container' button ***** //
					civ_cont = this.cInfoView.container.getChildren();
					for (i=0; i<civ_cont.length; i++) {
						if (civ_cont[i].basename == "CityCommandInfoView") {
							this.cCmdInfoView = civ_cont[i];
							break;
						}
					}
					btn = new qx.ui.form.Button(null, "webfrontend/theme/scrollbar/scrollbar-up.png");
					btn.set({width: 30, height: 20, appearance: "button-brown-sort", toolTipText: L("btn_support_hide")});
					btn.addListener("click", function() {
						if (LT.main.cCmdInfoView.supports.getVisibility() == "visible") {
							LT.main.cCmdInfoView.supports.setVisibility("excluded");
							this.set({toolTipText: L("btn_support_show"), icon: "webfrontend/theme/scrollbar/scrollbar-down.png"});
						} else {
							LT.main.cCmdInfoView.supports.setVisibility('visible');
							this.set({toolTipText: L("btn_support_hide"), icon: "webfrontend/theme/scrollbar/scrollbar-up.png"});
						}
					}, btn);
					this.cCmdInfoView.supportHeaderData.header.add(btn, {top: 7, left: 210});

					// ***** BBCode buttons in chat window ***** //
					cont = new qx.ui.container.Composite(new qx.ui.layout.Grid());

					btns = [
						{lab: L("chat_btn_city"), func: this.parseCoords},
						{lab: L("chat_btn_player"), func: function() {this.parseText("player")}},
						{lab: L("chat_btn_alliance"), func: function() {this.parseText("alliance")}},
						{lab: L("chat_btn_url"), func: function() {this.parseText("url")}}
					];
					for (i=0; i<btns.length; i++) {
						btn = new qx.ui.form.Button(btns[i].lab).set({appearance: "button-text-small", padding: [0,3,0,3]});
						btn.addListener("click", btns[i].func, this);
						cont.add(btn, {row: Math.floor(i/2), column: i%2});
					}
					this.chat.add(cont, {top: 0, left: 275});

					// ***** Copy City Coords To Chat buttons ***** //
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({maxWidth:160, height: 32, alignX: "center", paddingLeft: 2, paddingRight: 2});
						btn.addListener("click", function() {this.copyCoordsToChat("c")}, this);
					this.cDetView.actionArea.add(btn, {left:86, top: 130});
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({width:160, height: 32, paddingLeft: 2, paddingRight: 2});
						btn.addListener("click", function() {this.copyCoordsToChat("d")}, this);
					this.dDetView.actionArea.add(btn, {left:86, top: 110});
					btn = new qx.ui.form.Button(L("copy_coords_btn")).set({maxWidth:160, height: 32, alignX: "center", paddingLeft: 2, paddingRight: 2});
						btn.addListener("click", function() {this.copyCoordsToChat("n")}, this);
					this.ncView.container.add(new qx.ui.core.Spacer(0,30));
					this.ncView.container.add(btn);

					// ***** Queue times label ***** //
					this.qtLab = new window.louTweak.queueTimesLabel();
					if (this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
						this.app.desktop.add(this.qtLab.queueTimeCont, {left: 690, top: 65});
					} else {
						this.app.desktop.add(this.qtLab.queueTimeCont, {left: 405, top: 65});
					}
			
					// ***** Incoming resources label ***** //
					lab = new window.louTweak.incomingResourcesLabel();
					this.bQc.getLayoutParent().addBefore(lab.incResCont, this.bQc);

					// ***** Switch to ally tab on start ***** //
					if (this.options.switchToAllyTab)
						this.chat.tabView.setSelection([this.chat.tabView.getChildren()[1]]);

					// ***** Listeners ***** //
					// app keyboard
					this.app.mainContainer.addListener("keypress", this.appPerformAction, this);
					// scene keyboard
					this.app.visMain.scene.getOutputWidget().addListener("keypress", this.scenePerformAction, this);
			




					webfrontend.data.City.getInstance().addListener("changeVersion", this.countUpgradeable, this);

					webfrontend.data.City.getInstance().addListener("changeVersion", this.showGetUseButtons, this);
					this.cInfoView.addListener("appear", this.showGetUseButtons, this);
					if (this.cInfoView.quickUseBuildingItemBtn != null) {
						this.cInfoView.quickUseBuildingItemBtn.addListener("appear", this.showGetUseButtons, this);
					} else {
						for (var p in this.cInfoView) {
							if (this.cInfoView[p] != null && (this.cInfoView[p].basename == "SoundButton" || this.cInfoView[p].basename == "QuickUseButton")) {
								if (this.cInfoView[p].getAppearance() == "button-quickuse") {
									glp = this.cInfoView[p].getLayoutParent();
									if (this.getUseCont1 == null) {
										this.getUseCont1 = glp;
										continue;
									}
									if (this.getUseCont2 == null) {
										if (this.getUseCont1 != glp) {
											this.getUseCont2 = glp;
										}
										continue;
									}
									if (this.getUseCont2 != glp && this.getUseCont3 == null) {
										this.getUseCont3 = glp;
										break;
									}
								}
							}
						}
					}






					//this.topBottomButtonsListener = webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateTopBottomButtons, this);
					this.tradeButtonsListener = webfrontend.base.Timer.getInstance().addListener("uiTick", this.createTradeButtons, this);
					webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateMiniMapButton, this);
					this.reportPageListener = this.app.getReportPage().reportBody.addListenerOnce("addChildWidget", this.tweakReport, this);
					
 					// sg:start - Add a listener to UI update event (which is which now invokes the turboAutoChecks() 
 					// This means this method is invoked each time the UI is updated (this is currently every second).
 					webfrontend.base.Timer.getInstance().addListener("uiTick", this.turboAutoChecks, this);
 					// sg:end
					
					// ***** Chat colors ***** //
					chatIns = webfrontend.config.Config.getInstance().getChat();
					chatIns.channelColors.global = this.options.chatColors[0];
					chatIns.channelColors._a = this.options.chatColors[1];
					chatIns.channelColors.privatein = this.options.chatColors[3];
					chatIns.channelColors.privateout = this.options.chatColors[4];
					chatIns.channelColors.social = this.options.chatColors[5];
					chatIns.channelColors.LoUWin = this.options.chatColors[6];
					chatIns.setMaxLines(this.options.chatMaxLines);
					
					this.chat.BgrLabel.setBackgroundColor(this.options.chatColors[2]);
					this.chat.BgrLabel.setOpacity((parseInt(this.options.chatOpacity))/100);

					this.tweakInterface();

					this.optionsPage = new window.louTweak.optionsPage();
					this.layoutWindow = new window.louTweak.layoutWindow();

					this.app.visMain.addListener("changeMapLoaded", function(){this.tabView.setSelection([this.tabView.getChildren()[0]]); this.win.close(); this.showOverlayLayout();}, this.layoutWindow);


					this.getCity();
					//
					
					this.originalConvertBBCode = webfrontend.gui.Util.convertBBCode;
					webfrontend.gui.Util.convertBBCode = this.newConvertBBCode;
					
 					// sg:start
 					this.turboUtils = new window.louTweak.turboUtils();
 					// sg:end
//k		} catch (e) {
//k			console.log(e);
//k		}
				},
				appPerformAction: function(e) {
					if (!this.app.allowHotKey || this.bDetView.visBuilding != null || this.bPlaceDetView.active || this.app.currentOverlay != null || this.app.cityBar.citiesSelect.getSelectables()[0].getLayoutParent().getLayoutParent().getLayoutParent().getLayoutParent().isVisible()) {
						return;
					}
					key = e.getKeyIdentifier();
					if (key == "") return;
					shft = e.isShiftPressed();
					ctrl = e.isCtrlPressed();
					
					if (key == this.options.hotkeys.global.prevcity)
						this.cBar.prevButton.execute();
					else if (key == this.options.hotkeys.global.nextcity)
						this.cBar.nextButton.execute();
					
					if (this.app.visMain.mapmode != "c" || this.sendCommandBusy) return;
					switch (key) {
						case 'T':
							this.upgradeLowestLevelBuilding("T", shft);
							break;

						case 'N':

							this.upgradeLowestLevelBuilding("M", shft);
							break;
						case 'B':
							this.upgradeLowestLevelBuilding("B", shft);
							break;
						case 'C':
							this.upgradeLowestLevelBuilding("C", shft);
							break;
						case 'L':
							this.upgradeLowestLevelBuilding("A", shft);
							break;
						case 'E':
							this.upgradeLowestLevelBuilding("R", shft);
							break;
						case 'U':
							this.upgradeLowestLevelBuilding("U", shft);
							break;
						case 'Q':
							if (shft)
								this.upgradeLowestLevelBuilding("F", false);
							break;
						case 'A':
							if (shft)
								this.upgradeLowestLevelBuilding("F", true);
							break;
						default:
							return;
					}
				},
				scenePerformAction: function(e) {
					if (this.app.visMain.mapmode != "c" || this.sendCommandBusy) return;
					
					key = e.getKeyIdentifier();
					shft = e.isShiftPressed();

					if (this.moveBuildingDetView.active && this.moveBuildingDetView.placeId != null) {
						this.moveBuildingDetView._onMoveBuildingQuickUse();
						return;
					}
					if (!this.bDetView.visBuilding) {
						if (this.bPlaceDetView.active) {
							if (/\b(27|28|29|30|60|61|62|63)\b/.test(this.bPlaceDetView.buildingType) && key == this.options.hotkeys.upgrades.downgrade) {
								this.bPlaceDetView.downgradeButton.execute(); // destroy resource
								return;
							} else {
								for (var i in this.options.hotkeys.build) {
									if (this.options.hotkeys.build[i] == key) {
										_bid = this.self(arguments).lou_building_id[i];
										if (this.bPlaceDetView.buildingInfo[_bid].canBuild) {
											this.cityObject("Build", this.bPlaceDetView.placeId, _bid, 1, false);
											return;
										}
									}
								}
							}
						}
					}
					if (this.bDetView.visBuilding) {
					try {
						_bid = this.bDetView.visBuilding.getId();
						_ind = this.getIndex(_bid);
						if (_ind == -1) return;
						_btype = this.city[_ind][2];
						if (/\b(27|28|29|30|60|61|62|63)\b/.test(_btype)) return;
						_blvl = this.city[_ind][1];
						if (_blvl < 0) return;
						if (/\b(1|2|3|4|5|6|7|8|9)\b/.test(key)) {
							if (this.isAssignedToMinister(_bid)) return;
							_ups = (RegExp.$1 == "1" ? 10 - _blvl : parseInt(RegExp.$1) - _blvl);
							if (_ups <= 0) return;
							au = this.availUpgrades(_btype, _blvl, _ups);
							this.cityObject("UpgradeBuilding", _bid, _btype, au, false);
							return;
						}
						au = 10;
						_ups = shft ? au - _blvl : 1;
						if (key != this.options.hotkeys.upgrades.minister) {
							if (this.isAssignedToMinister(_bid)) return;
							au = this.availUpgrades(_btype, _blvl, _ups);
						} else
							au = _ups;
						switch (key) {
							case this.options.hotkeys.upgrades.upgrade:
								this.cityObject("UpgradeBuilding", _bid, _btype, au, false);
								break;
							case this.options.hotkeys.upgrades.downgrade:
								au = shft ? 10 : 1;
								this.cityObject("DowngradeBuilding", _bid, _btype, au, false);
								break;
							case this.options.hotkeys.upgrades.minister:
								this.cityObject("UpgradeBuilding", _bid, _btype, au, true);
								break;
							case 'M':
								this.bDetView.quMoveBuilding.btn.execute();
								break;
							default:
								return;
						}
					} catch (e) { LT.debug(e); }
				}
				},
				cityObject: function(_action, _buildingId, _buildingType, _upgrades, _minister, _cid) {
					if (_upgrades <= 0) return;

					bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					bqcur = webfrontend.data.City.getInstance().buildQueue;
					bqcur = (bqcur != null) ? bqcur.length : 0;
					freeSlots = bqmax - bqcur;
					if (freeSlots == 0) return;
					if (freeSlots < _upgrades && _action != "DowngradeBuilding") _upgrades = freeSlots;
					
					if (_action == "Build") {
						if (_buildingType == 21 && this.bPlaceDetView.active) {
							this.bPlaceDetView.buildingType = 21;
							this.bPlaceDetView._onClickBuild();
							return;
						}
						_action = "UpgradeBuilding";
					}
					
					if (_action == "DowngradeBuilding" && _upgrades == 10) {
						_action = "DemolishBuilding";
						_upgrades = 1;
					}

					

					_cid = webfrontend.data.City.getInstance().getId();

					

 					// sg:start - This aims to prevent sending of commands in the rare instance when we have switched to a new city but the auto command is trying to send a command for the previous city.
 					if (_cid != LT.main.cityId) {
 						LT.debug("Skipping command '" + _action + "/" + _buildingId + "/" + _buildingType + "'due to city id mismatch:" + _cid + LT.main.cityId);
 						return;
 					}
 					// sg:end
					for (o=0; o<_upgrades; o++) {
						//console.log({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});
						this.sendCommandBuffer.push({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});
					}
					
					if (!this.sendcommandBusy) {
						this.sendCommandBusy = true;
						this.sendCmd();
					}
				},
				// sg: This is a method that supports any command to be sent extending the original Upgrade, Downgrade and demolish commmands in cityObject() 
				genericOrder: function(_action, _params) {
					this.sendCommandBuffer.push({a:_action, p:_params});
					if (!this.sendcommandBusy) {
						this.sendCommandBusy = true;
						this.sendCmd();
					}
				},
				sendCmd: function() {
					MAX_COMMAND_LIMIT=7; //TODO: Move this variable declarations upto a common constants declaration
					if (this.sendCommandBuffer.length == 0) {
						this.sendCommandBusy = false;
						return;
					}
					currentTime = new Date().getTime();
					if (currentTime > this.lastSentCommandTime+500) {
						cmd = this.sendCommandBuffer.shift();
						// sg:start - Because of auto-switcher mechanism, added a new check to ensure the command going out is for the current city
						if (cmd.p.cityid == webfrontend.data.City.getInstance().getId()) {
							/*if (qx.lang.Json.stringify(this.lastSentCommand[cmd.a]).indexOf(qx.lang.Json.stringify(cmd))>=0) {
								if (!this.commandIdenticalCount[cmd.a]) {
									this.commandIdenticalCount[cmd.a]=0;
								}
								this.commandIdenticalCount[cmd.a]++;
							}							
							if (this.commandIdenticalCount[cmd.a]>=MAX_COMMAND_LIMIT) {
								LT.debug("Command '"+ cmd.a +"' seems to be stuck (repeated "+ this.commandIdenticalCount[cmd.a]+ " times) - so switching city");
								this.scheduleSwitchCity();
								this.lastSentCommand={};
								this.commandIdenticalCount={};
								return;
							}
							this.lastSentCommand[cmd.a]=cmd;
							LT.debug("Command sent for " + cmd.a + " :");
							LT.debug(cmd);*/

							webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, function(){});
						}
						// sg:end
						this.lastSentCommandTime = currentTime;
					}
					this.timer.start(this.sendCmd, null, this, null, 250);
				},
				availUpgrades: function(bt, bl, bu) {
					c = webfrontend.data.City.getInstance();
					th = c.getTownhallLevel();
					if (this.self(arguments).bd[bt].th > th)
						return 0;
					wood = c.getResourceCount(1);
					stone = c.getResourceCount(2);
					u = 0;
					while (bu > 0) {
						wn = this.self(arguments).bd[bt].w[bl];
						sn = this.self(arguments).bd[bt].s[bl];
						if (wn > wood || sn > stone) break;
						wood -= wn;
						stone -= sn;
						u++;
						bl++;
						bu--;
					}
					return u;
				},
				isAssignedToMinister: function(bid) {
					cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
					if (cBuildQueue != null) {
						for (m=0; m<cBuildQueue.length; m++) {
							if (cBuildQueue[m].building == bid && cBuildQueue[m].isPaid == false) return true;
						}
					}
					return false;
				},
				upgradeLowestLevelBuilding: function(_type, _minis, c) {
					if (this.app.visMain.mapmode != "c") return;

					if (!c) {
						c = webfrontend.data.City.getInstance();
					}
					tw = parseInt(c.getResourceCount(1));
					ts = parseInt(c.getResourceCount(2));
					bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					bqcur = c.buildQueue;
					bqcur = (bqcur != null) ? bqcur.length : 0;
					freeS = bqmax - bqcur;
					if (freeS == 0) {
						//TODO: not sure if this message is needed as we already have the free slots check and message in the main method that calls this.
						LT.main.turboUtils.addMessage("NO_BUILD_SLOTS");
						return;
					}
					
					buildingTypes = {
						"T":"|38|39|40|41|42|43|44|45|46|",
						"M":"|15|16|17|18|19|21|36|37|",
						"R":"|1|2|3|6|47|48|49|50|",
						"C":"|4|",
						"B":"|14|",
						"U":"|5|7|8|9|10|11|12|13|20|22|",
						"A":"|"+this.options.lowestLevelUpgradeIDs.join("|")+(this.options.lowestLevelUpgradeIDs[0] != "" ? "|1" : "")+(this.options.lowestLevelUpgradeIDs[1] != "" ? "|2" : "")+(this.options.lowestLevelUpgradeIDs[2] != "" ? "|3" : "")+(this.options.lowestLevelUpgradeIDs[5] != "" ? "|6" : "")+"|",
						// sg:start -  added some more commands to speecify buildings
						"W":"|7|47|", //Wood related
						"S":"|10|48|", //Stone related
						"I":"|11|49|", // Iron related
						"D":"|8|50|", // Food related
						"Z":"|7|47|10|48|11|49|8|50|", // Military related
						"Hall":"|12|",
						// sg:end
					};
					maxLvls = {
						"T":this.options.lowestLevelMax[0],
						"M":this.options.lowestLevelMax[1],
						"R":this.options.lowestLevelMax[2],
						"C":this.options.lowestLevelMax[3],
						"B":this.options.lowestLevelMax[4],
						"U":this.options.lowestLevelMax[5]
					}
					if (_type != "F") freeS = 1;
					if (_type == "F") _type = "A";
					LT.debug("upgradeLowestLevelBuilding1");
					_bTable = this.getValidBuildings(buildingTypes[_type]);
					
					LT.debug("_bTable:", true);
					LT.debug({"data":_bTable}, true);
					
					// sg:start - Throttle the build to just 1 upgrade at a time by resetting free slots to 1.
					// This is to prevent possible kicks from server or even blacklisting.
					//if ("WSIDZ".indexOf(_type) >= 0) 
					freeS = 1;
					// sg:end
					ud = {"wl":tw, "sl":ts,"a":[]};
					for (j=0; j<freeS; j++) {
						//_bTable.sort(function(a,b){return a[1]-b[1];});
						// sg:If stuck in adding buildings, first try to manually upgrade the townhall. If that fits the bill, dont enter the next loop to try upgrade other buildings
						if (this.upgradeTownHall && _bTable!=null && _bTable.length>0 && _bTable[0][2]==12) {
							// IF UPGRADETOWNHALL FLAG IS ON AND THE FIRST ITEM IN LIST IS TOWNHALL, SORT ONLY THE REST OF THE LIST
							temp=_bTable[0];
							_bTable.splice(0,1);
							_bTable.sort(function(a,b){return a[1]-b[1];});
							_bTable.splice(0,0,temp);
						} else {
							//if the first item in list is not townhall (code!=12)
							_bTable.sort(function(a,b){return a[1]-b[1];});
						}
						this.upgradeTownHall=false;
						
						_bType = "";
						for (i=0; i<_bTable.length; i++) {
							if (_type == "A") {
								for (var b in buildingTypes) {
									if (b == "A") continue;
									if (buildingTypes[b].indexOf("|" + _bTable[i][2] + "|") != -1) _bType = b;
								}
								if (buildingTypes["A"].indexOf("|" + _bTable[i][2] + "|") != -1 && _bTable[i][1] >= maxLvls[_bType])
									continue;
								if (_bTable[i][2] == 23 && _bTable[i][1] >= 10)
									continue;
							}
							if (buildingTypes[_type].indexOf("|" + _bTable[i][2] + "|") != -1) {
								if (!_minis) {
									if (this.isAssignedToMinister(_bTable[i][0])) continue;
									wn = this.self(arguments).bd[_bTable[i][2]].w[_bTable[i][1]];
									sn = this.self(arguments).bd[_bTable[i][2]].s[_bTable[i][1]];
									if (wn > ud.wl || sn > ud.sl) continue;
									ud.wl -= wn;
									ud.sl -= sn;
								}
								ud.a.push([_bTable[i][0], _bTable[i][2], _minis]);
								_bTable[i][1] += 1;
								break;
							}
						}
					}
					// sg:start - just debugging info and autoTriggerCount increment
					if (ud.a.length == 0) {
						if (_bTable.length == 0) {
							//LT.debug("No matching buildings for upgrade");
							LT.main.turboUtils.addMessage("NO_MATCH_BUILDNG");//"No buildings match current preferences for auto-upgrade");
						} else {
							LT.debug("Insufficient resources");
							LT.main.turboUtils.addMessage("NO_RES_BUILD");//"Insufficient resources to Auto-upgrade");
						}
						this.autoTriggerCount++;
					}
					// sg:end
					for (i=0; i<ud.a.length; i++) {
						LT.debug("UpgradeBuilding" + ud.a[i][0] + " " + ud.a[i][1] + " " + ud.a[i][2]);
						this.cityObject("UpgradeBuilding", ud.a[i][0], ud.a[i][1], 1, ud.a[i][2],c.getId());
						/*this.cityObject("UpgradeBuilding", ud.a[i][0], ud.a[i][1], 1, ud.a[i][2]);*/
					}
				},
				// start:LTT-main
				// sg: This method is the main method that triggers all Turbo methods appropriately
				turboAutoChecks: function() {
					var MINIMUM_RANDOM_RANGE = 2000; //TODO: this variable is declared twice - fix this & move this upto a common constants declaration section.
					var MAX_TRIGGER_COUNT = this.calculateTriggerCount([LT.main.turboUtils.getCitySpecificTurboProperty("autoAddBuildings"),LT.main.turboUtils.getCitySpecificTurboProperty("autoUpgradeBuildings"),LT.main.turboUtils.getCitySpecificTurboProperty("autoSendAttack"),LT.main.turboUtils.getCitySpecificTurboProperty("autoPurify")]);
					if (this.app.visMain.mapmode != "c" || !LT.options.enableAutoPilot || this.autoTriggerCount > MAX_TRIGGER_COUNT) return;
					elapsedTime = (new Date().getTime()) - this.lastUpgradeTime;
					if (elapsedTime >= (LT.options.upgradeInterval * 1000)) {
						if (this.explicitCityToNull) {
							this.explicitCityToNull=false;
							LT.debug('clearedBefore');
						} else {
							LT.debug('Clearing city');
							this.city=null;
						}
						this.getCity();
						city = webfrontend.data.City.getInstance();
						if (this.city==null) {
							LT.debug("City object is null");
							this.explicitCityToNull=true;
							return;
						} else if (LT.main.cityId != city.getId()) {
							LT.debug("City Id mismatch. LT City id is " +LT.main.cityId+" but the server says city id is " +city.getId());
							this.explicitCityToNull=true;
							return;
						}
						bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
						bqcur = city.buildQueue;
						bqcur = (bqcur != null) ? bqcur.length : 0;
						freeS = bqmax - bqcur;
						LT.debug("-----------------------------------\nturboAutoChecks-" + city.getName() + "-" + freeS + "-" + this.autoTriggerCount);
						if (freeS > 0) {
							beforeCount=this.autoTriggerCount;
							this.addBuildings(city); // this checks if a hashstring city plan is available, and if so uses it to create new buildings.
							if (!LT.main.turboUtils.getCitySpecificTurboProperty("autoAddBuildings") || (this.autoTriggerCount-beforeCount) == 1) { // this is to ensure that only 1 building command goes at 1 shot - either add or upgrade with preference to add
								this.addUpgrages(city);
							}
						} else {
							if (LT.main.turboUtils.getCitySpecificTurboProperty("autoAddBuildings") || LT.main.turboUtils.getCitySpecificTurboProperty("autoUpgradeBuildings")) {
								LT.main.turboUtils.addMessage("NO_BUILD_SLOTS");
								this.autoTriggerCount += this.calculateTriggerCount([LT.main.turboUtils.getCitySpecificTurboProperty("autoAddBuildings"),LT.main.turboUtils.getCitySpecificTurboProperty("autoUpgradeBuildings")]);
							}
						}
						this.sendAttack(city); // If army is intact, resends army to raid/siege.
						this.purifyResources(city); // purifies resources approaching max storage limit ???after completing 1 cycle.???
						/*
						this.replaceFallen(); // tries to recruits any lost members from attacks or defenses.
						this.sendDefense(); // sends defensive forces to any city under attacks or scheduled for attack.
						this.requestResources(); // this requests resources that are short in current city from cities identified having above a minimum threshold resources (this minimum level is proportional to city's size) having that city which is the closest and is closest (if multiple).
						*/
						if (LT.options.autoSwitchCities && this.autoTriggerCount==MAX_TRIGGER_COUNT) {
							//if (this.autoTriggerCount==MAX_TRIGGER_COUNT) { // this is to ensure that a new timer request is not raised once the timer has started
								this.autoTriggerCount++;
								LT.debug("Nothing more to do in city, "+city.getName()+" ("+city.getId()+").");
								this.scheduleSwitchCity();
							//}
						} else {
							this.autoTriggerCount = 0;
						}
						
						this.lastUpgradeTime = new Date().getTime() + Math.floor(Math.random()*MINIMUM_RANDOM_RANGE);
					}
				},
				// sg: This method identifies max trigger count based on passed list of user options (currenrly for Add and Upgrade building only)
				calculateTriggerCount: function(list) {
					count = 0;
					for (i=0;i<list.length;i++) {
						if (list[i]) count++;
					}
					return count;
				},
				// sg: This method adds new buildings based on the city plan in sharestring format
				addBuildings: function(c) {
					if (!LT.main.turboUtils.getCitySpecificTurboProperty("autoAddBuildings")) {
						return;
					}
					try {
						LT.debug("Entered addBuildings");
						ss = null;
						buildMinisterPresent=webfrontend.data.Player.getInstance().getMinisterBuildPresent();
						buildCommandAdded=false;
					// 1. read sharestring for specified city
						// 1a. read array of sharestrings from localstorage
						shareString = LT.main.turboUtils.getObjectFromLocalStorageSC("AutoBuildShareString");
						if (shareString != null && shareString != undefined) {
							ss = shareString.replace(/\[[^\]]+\](\:|\;)?/g, ""); // strip out the opening and closing tags
						}
						isValidShareString=true;
						isTownHallLevelTooLowForThisBuilding=false;
						anotherResourceOrBuildingExists=false;
						insuffcientResources=false;
						maxBuildLimitReached=false;
						if (ss != null && ss != undefined) {
							if (ss.length != 441) {
								LT.debug("Share string is not of length 441");
								isValidShareString=false;
							}
							error=this.layoutWindow.myValidateSharestring(ss);
							if (isValidShareString && error!="") {
								LT.debug("myValidateSharestring failed:" + error);
								isValidShareString=false;
							}
							if (isValidShareString) {
								type = shareString.match(/\](\:|\;){1}/)[1]; //; indicates water city and : indicates a pure land city
								LT.debug("CP1-", true);LT.debug(city, true);
								if (city.getOnWater() && type == ":") {
									LT.debug("City is water based but share string has a mismatch");
									isValidShareString=false;
								} else if (!city.getOnWater() && type == ";") {
									LT.debug("City is land based but share string has a mismatch");
									isValidShareString=false;
								}
							}
							if (isValidShareString) {
								if ((city.getBuildingLimit() - city.getBuildingCount())<=0) {
									maxBuildLimitReached=true;
									if (this.city[220][1]<10) {
										this.upgradeTownHall = true;
									}
								} else {
									this.upgradeTownHall = false;
									// 2. Loop through all locations in sharestring
									for (i=0; i<this.city.length; i++) {
										// 3. For each location,
										// 3a. If no building specified, continue to next location
										if (/\;|\:|\,|\.|T|#|\-|\_|W|Q|F|I/.test(ss.charAt(i))) {
											continue;
										}
										
										bid = window.louTweak.layoutWindow.ssToId[ss.charAt(i)];
										
										// 3b. if any building already exists at that spot in actual city (or in build queue), check next location.
										if (this.city[i][1] == 0 && (this.city[i][2] == 97 || this.city[i][2] == 98)) { //this means its an open buildable space with no resource or building already present.
											placeId = this.city[i][0];
											// TODO: ALso verify a bulding is not in buildqueue either
										} else {
											anotherResourceOrBuildingExists=true;
											continue;
										}
										//TODO: ADD LOGIC FOR CHECKING THE TOTAL BUILDING LIMIT based on townhall level.
										// Keep track of when the limit is reached by using A FLAG so that we can then focus on upgrading townhall instead of any other buildings in upgrade logic.
										if (!this.canBuild(bid,this.city[220][1],this.city[220][0])) {
											//LT.debug("town hall level does not meet requirement");
											isTownHallLevelTooLowForThisBuilding=true;
											continue;
										}
										// 3c. If insuffient resources, note this and continue.									
										tw = parseInt(city.getResourceCount(1));
										ts = parseInt(city.getResourceCount(2));
										wn = this.self(arguments).bd[bid].w[this.city[i][1]];
										sn = this.self(arguments).bd[bid].s[this.city[i][1]];
										if (wn > tw || sn > ts) {
											//LT.debug("Insufficient resources");
											insuffcientResources=true;
											continue;
										}
										
										// 3d. invoke build command and exit loop.
										this.cityObject("Build", placeId, bid, 1, buildMinisterPresent,c.getId());
										
										//LT.debug("Successful Add build in city " + this.city[i] + " with building id " + bid);
										buildCommandAdded = true;
										break;
									}
								}
								//LT.debug("Last cell/city[i]/SS-Id/Building-Id " + (i-1) + " / " + (i>0?this.city[i-1]:"-") + " / " + (i>0?ss.charAt(i-1):"_") + " / " + bid);
							}
						} else {
							isValidShareString=false;
						}
						
						// 4. If no building was built, raise buildCommandAdded flag.
						if (!buildCommandAdded) {
							if (!isValidShareString) {
								LT.main.turboUtils.addMessage("INVALID_SHARESTRING");
							} else {
								if (isTownHallLevelTooLowForThisBuilding) {
									LT.main.turboUtils.addMessage("BUILDING_NOT_ALLOWED_TH");
								}
								if (maxBuildLimitReached) {
									LT.main.turboUtils.addMessage("MAX_BUILNG_LIMIT");
								}
								if (insuffcientResources) {
									LT.main.turboUtils.addMessage("NO_RES_ADDBUILD");
								}
								if (anotherResourceOrBuildingExists) {
									LT.main.turboUtils.addMessage("ANOTHER_OBJ_EXISTS_ADDBUILD");
								}
								if (!(isTownHallLevelTooLowForThisBuilding || maxBuildLimitReached || insuffcientResources || anotherResourceOrBuildingExists)) {
									LT.main.turboUtils.addMessage("DONE_ADDBUILD", "I");
								}
							}
							this.autoTriggerCount++;
						}
					} catch (e) {
						this.autoTriggerCount++;
						LT.debug(e);
					}
				},
				// sg: This method returns true if the building with specified building id can be built at the current townhall level.
				canBuild: function(bid, townhallLevel, townhallBuildingId) {
					if (townhallLevel > this.self(arguments).bd[bid].th || (townhallLevel == this.self(arguments).bd[bid].th && this.checkBuilding(townhallBuildingId)==0)) {
						return true;
					} else {
						return false;
					}
				},
				// sg: This method upgrades the buildings based on either the 5 class options or building specific checkboxes, and in combination with max levels
				addUpgrages: function(city) {
				if (!LT.main.turboUtils.getCitySpecificTurboProperty("autoUpgradeBuildings")) {
					return;
				}
					try {
						var command;
							{
							switch (LT.options.upgradeFocus) {
								case 0:
									command="C";
									break;
								case 1:
									command="W";
									break;
								case 2:
									command="S";
									break;
								case 3:
									command="I";
									break;
								case 4:
									command="D";
									break;
								case 5:
									command="M";
									break;
								case 6:
									command="B";
									break;
								case 7:
									command="T";
									break;
								default:
									command="A";
									break;
							}
						}
						LT.debug("Calling Upgrade: " + command + "(" + LT.options.upgradeFocus + ")");
						buildMinisterPresent=webfrontend.data.Player.getInstance().getMinisterBuildPresent();
						this.upgradeLowestLevelBuilding(command, buildMinisterPresent, city); // S is a custom queue for Stone
					} catch (e) {
						this.autoTriggerCount++;
						LT.debug(e);
					}
				},
				// sg: This method sends the army types to the specified location (army and destination is saved in city sharestring popup
				sendAttack: function(city) {
					//1. fetch target attack location, target attack level, and expected army size from storage
					//TODO: remove hard coding and fetch from location!
					try {
						if (!LT.main.turboUtils.getCitySpecificTurboProperty("autoSendAttack")) {
							return;
						}
						LT.debug("sendAttack");
						cid = city.getId();
						army=LT.main.turboUtils.getObjectFromLocalStorageSC("attack_units");
						targetCity=LT.main.turboUtils.getObjectFromLocalStorageSC("attack_target");
						if (army != undefined) {
							//2. Verify if current army size matches expected army size.
							//TODO!!!: how???
							missingDetails = this.getMissingUnitDetails(army, city);
							if (missingDetails!=null) {
								params = null;
								if (missingDetails.missingFromQueue != null) {
									// 1) Obtain the maximum units that can be recruited based on remaining city army capacity.
									freeCityCapacity = city.getUnitLimit() - (city.getUnitCount() + city.getUnitsInQueue());
									// 2) Obtain the free Recruitment slots
									freeSlots = webfrontend.data.Player.getInstance().getMaxUnitQueueSize() - (city.unitQueue == null ? 0 : city.unitQueue.length);
									LT.debug(freeCityCapacity + " - " + freeSlots);
									// 3) if both counts  are greater than zero
									if (freeCityCapacity > 0 && freeSlots > 0) {
										masterUnitsData = webfrontend.res.Main.getInstance().units;
										tw = city.getResourceCount(1);
										ts = city.getResourceCount(2);
										ti = city.getResourceCount(3);
										tf = city.getResourceCount(4);
										tg = webfrontend.data.Player.getInstance().getGold();
										LT.debug(tw + " " + ts + " " + ti + " " + tf + " " + tg);
										//2a. If not, recruit sufficient forces or exit.
										//for(var i; i < freeSlots; i++) { Dont loop as we want only 1 order at a time.
										for (var missingType in missingDetails.missingFromQueue) {
											missingCount = missingDetails.missingFromQueue[missingType];
										// 4) check if sufficient resources (wood/stone/bronze/food)
											woodn = masterUnitsData[missingType].res["1"];
											stonen = masterUnitsData[missingType].res["2"];
											ironn = masterUnitsData[missingType].res["3"];
											foodn = masterUnitsData[missingType].res["4"];
											goldn = masterUnitsData[missingType].g;
											LT.debug(masterUnitsData[missingType] + "=" + woodn + "*" + stonen + "*" + ironn + "*" + foodn + "*" + goldn);
											woodFactor =  (woodn == undefined || woodn == 0) ? missingCount : Math.floor(tw/woodn);
											stoneFactor = (stonen == undefined || stonen == 0) ? missingCount : Math.floor(ts/stonen); 
											ironFactor = (ironn == undefined || ironn == 0) ? missingCount : Math.floor(ti/ironn);
											foodFactor = (foodn == undefined || foodn == 0) ? missingCount : Math.floor(tf/foodn); 
											goldFactor = (goldn == undefined || goldn == 0) ? missingCount : Math.floor(tg/goldn);
											unitFactor = masterUnitsData[missingType].uc;
											permittedCount = Math.min(missingCount, woodFactor, stoneFactor, ironFactor, foodFactor, goldFactor, freeCityCapacity / unitFactor);
											LT.debug(permittedCount + "-" + missingCount + "-" + woodFactor + "-" + stoneFactor + "-" + ironFactor + "-" + foodFactor + "-" + goldFactor + "-" + freeCityCapacity / unitFactor);
											if (permittedCount > 0) {
												break;
											}
										}
										if (permittedCount > 0) {
											params = {"cityid":cid,"units":[{"t":missingType,"c":permittedCount}],"isPaid":true};
											LT.main.turboUtils.addMessage("RECRUIT", "I");
											this.genericOrder("StartUnitProduction",params); // this order is for recruiting
										} else {
											LT.main.turboUtils.addMessage("NO_RES_UNIT");
										}
										//}
									} else {
										if (freeCityCapacity <= 0) {
											LT.main.turboUtils.addMessage("MAX_UNIT_LIMIT");//"Max units level in ciry reached.");
										} else {
											LT.main.turboUtils.addMessage("NO_UNIT_SLOTS");//"Insufficient free unit slots for recruiting.");
										}
									}
								} else {
									LT.main.turboUtils.addMessage("ARMY_NOT_READY");
								}
								if (params == null) {
									this.autoTriggerCount++;
								}
								return;
							}
						} else {
							LT.main.turboUtils.addMessage("ARMY_UNDEFINED");
						}
						//2b. Get success chances by using combat calculator (comparing target forces with current forces). If rate is below, then increase strength if available or abort attack.
						//TODO
						//3. Send army. 
						if (army!= null && army!=undefined && targetCity!=null && targetCity!=undefined) {
							params={"cityid":cid,"units":army,"targetPlayer":"","targetCity":targetCity,"order":8,"transport":1,"createCity":"","timeReferenceType":1,"referenceTimeUTCMillis":0,"raidTimeReferenceType":0,"raidReferenceTimeUTCMillis":0,"iUnitOrderOptions":0}
							this.genericOrder("OrderUnits",params); // this order is for attacking
						} else { // this is to indicate no attacks were ordered.
							if (army== null || army==undefined) {
								LT.main.turboUtils.addMessage("ARMY_UNDEFINED");
							}
							if (targetCity==null || targetCity==undefined) {
								LT.main.turboUtils.addMessage("ATTACK_TARGET_UNDEFINED");
							}
							this.autoTriggerCount++;
						}
					} catch (e) {
						LT.debug(e);
					}
				},
				getMissingUnitDetails: function(requiredArmy, city) {
					//Check if the required type count balance is sufficient
					var missing = {}; var missingFromQueue = {};
					var isMissing=false;
					var isMissingFromQueue = false;
					for (var k=0; k < requiredArmy.length; k++) {
						if (city.getUnits() != null) {
							currentUnit = city.getUnits()[requiredArmy[k].t];
							if (currentUnit == undefined || currentUnit == null) {
								totalAvailable = 0;
							} else {
								totalAvailable = currentUnit.count; //this is how many of this type units are available on the base
							}
						} else {
							currentUnit={"count":0, "total":0};
							totalAvailable = 0;
						}
						//totalAvailable = webfrontend.data.City.getInstance().getUnits()[requiredArmy[k].t].count;
						//totalOnAMission = totalOrdered[requiredArmy[k].t];
						totalRequired = requiredArmy[k].c;
						if (totalRequired > (totalAvailable)) {// - totalOnAMission)) {
							//LT.debug("THis is a fail for type " + requiredArmy[k].t +" - "+totalRequired+"/"+totalAvailable);
							isMissing=true;
							missingTemp = totalRequired - currentUnit.total;
							missing[requiredArmy[k].t] = missingTemp;
							missingFromQueueTemp = this.getMissingUnitQuantityAgainstQueue({type:parseInt(requiredArmy[k].t), count: missingTemp}, city);
							if (missingFromQueueTemp > 0)
								isMissingFromQueue = true;
							missingFromQueue[requiredArmy[k].t] = missingFromQueueTemp;
						}
					}
					if (!isMissing) {
						return null;
					} else {
						if (!isMissingFromQueue) {
							missingFromQueue = null;
						}
						return {"missing":missing, "missingFromQueue":missingFromQueue};
					}
				},
				getMissingUnitQuantityAgainstQueue: function(missingUnits, city) {
					unitQueue = city.unitQueue;
					if (unitQueue != null) {
						for (var i = 0; i < unitQueue.length; i++) {
							item = unitQueue[i];
							if (item.type == missingUnits.type) {
								if (item.count < missingUnits.count) {
									//LT.debug("In3 - " + missingUnits.count + " " + item.count);
									return missingUnits.count - item.count;
								} else {
									return 0;
								}
							}
						}
					}
					return missingUnits.count;
				},
				// TODO Delete the below calculateTotalUnitsOnMissions function if not used by release 1.0.0
				calculateTotalUnitsOnMissions: function(city) {
					totalOrdered = {};
					//initialise all possible units to count 0
					for (var unit in webfrontend.res.Main.getInstance().units) {
						totalOrdered[unit]=0;
					}
					//Add up all those already on a mission
					currentUnitOrders = city.getUnitOrders();
					LT.debug("currentUnitOrders.length " + currentUnitOrders.length );
					for (var i=0; i < currentUnitOrders.length; i++) {
						orderedUnits = currentUnitOrders[i].units;
						for (var j=0; j < orderedUnits.length; j++) {
							type = orderedUnits[j].type + "";
							totalOrdered[type] = totalOrdered[type] + orderedUnits[j].count;
						}
					}
					
					LT.debug("Final total ordered:");
					LT.debug(totalOrdered);
				},
				scheduleSwitchCity: function() {
					var MINIMUM_RANDOM_RANGE = 2000; // TODO: move this variable declaration up to a place where all constants are initialised
					tempInterval = (LT.options.switchCityInterval * 1000) + Math.floor(Math.random()*MINIMUM_RANDOM_RANGE);
					LT.debug("Switchin to next city at : " + new Date(new Date().getTime() + tempInterval));
					qx.event.Timer.once(this.switchCity,this,tempInterval);
				},
				switchCity: function() {
					// Todo - add a countdown timer on screen and then switch
					if (LT.options.enableAutoPilot && LT.options.autoSwitchCities) {
						this.switchCityNow(); //this.cBar.nextButton.execute();
						city = webfrontend.data.City.getInstance();
						LT.debug("Now leaving city " + city.getName() + "("+ city.getId() + ") at " + new Date());
					}
					qx.event.Timer.once(this.resetTriggerCount,this, 2000);
				},
				resetTriggerCount: function() {
					this.autoTriggerCount = 0;
				}, 
				switchCityNow: function() {
					this.cBar.nextButton.execute();
				},
				purifyResources: function(city) {
					try {
						if (!LT.main.turboUtils.getCitySpecificTurboProperty("autoPurify") || !city.getCanPurifyResources()) {
							if (LT.main.turboUtils.getCitySpecificTurboProperty("autoPurify")) {
								LT.main.turboUtils.addMessage("NO_L10_MOONGLOW");
								this.autoTriggerCount++;
							}
							return;
						}

						var incoming ={};
						for (k=1; k<=4; k++) {
							incoming[k]=0;
						}
						it = city.tradeIncoming;
						if (it == null || it == undefined) it = [];
						for (k=0; k<it.length; k++) {
							for (j=0; j<it[k].resources.length; j++) {
								type = it[k].resources[j].type;
								incoming[type]+=it[k].resources[j].count;
							}
						}
						res = new Array();
						purifyThreshold=LT.main.turboUtils.getCitySpecificTurboProperty("autopurifyThreshold", city.getId());
						LT.debug("purifyResources %:" + purifyThreshold);
						if (purifyThreshold!=null) {
							minimumQuantity=500;//5000;
							for (type=1; type<=4; type++) {
								resource = city.resources[type];
								actual = city.getResourceCount(type) + incoming[type];
								max = resource.max;
								//LT.debug(type + ":" + max + "|" + actual + "-" + resource.base + "-" + incoming[type]);
								// if actual + incoming is > threshold, and the difference is either greater than 500 or the actual + incoming > max
								net = Math.floor(actual - ((purifyThreshold / 100) * max));
								if (net>0 && (net>=minimumQuantity || actual>=max)) {
									res.push({"t": type,"c":net});
								}
							}
							if (res.length > 0) {
								params = {"cityid":city.getId(), "res":res};
								this.genericOrder("ResourceToVoid", params); // this order is for purifying
								LT.main.turboUtils.addMessage("DONE_PURIFY","I");
							} else {
								this.autoTriggerCount++;
							}
						}
					} catch (e) {
						LT.debug(e);
					}
				},
				// end:LTT-main
				getValidBuildings: function(_ids) {
					c = webfrontend.data.City.getInstance();
					th = c.getTownhallLevel();
					//this.getCity();
					_arr = new Array();
					_wallIn = false;
					LT.debug("getValidBuildings for " + _ids);
					tempBuilding=null;
					for (k=0; k<this.city.length; k++) {
						if (_ids.indexOf("|" + this.city[k][2] + "|") != -1 && this.city[k][1] < 10 && this.city[k][1] > -1) {

							/*
							if ((_wallIn && this.city[k][2] == 23) || this.self(arguments).bd[this.city[k][2]].th > th)
								continue;
							_arr.push(this.city[k]);
							if (this.city[k][2] == 23)
								_wallIn = true;
							*/
							
							if ((_wallIn && this.city[k][2] == 23) || this.self(arguments).bd[this.city[k][2]].th > th)
								continue;
							if (this.upgradeTownHall &&  this.city[k][2]==12) {
								tempBuilding=this.city[k];
							} else if (this.canBuild(this.city[k][2],this.city[220][1],this.city[220][0])) {
								_arr.push(this.city[k]);
							}








						}
					}
					if (tempBuilding!=null) {
						_arr=[tempBuilding].concat(_arr);
					}
					return _arr;
				},
				getCity: function() {
					if (LT.a.visMain.mapmode != "c") return;
					_cells = LT.a.visMain.cells;
					if (!_cells[0]) {
						window.setTimeout(function(){LT.main.getCity()}, 250);
						return;
					}
					_cgi = webfrontend.data.City.getInstance();
					waterCity = _cgi.getOnWater();

					_se = new Array();
					for (var _c in _cells) {
						_cell = _cells[_c].entities;
						for (var d in _cell) {
							if (_cell[d].basename != "CityWallLevel" && _cell[d].basename != "CityObject") {
								if (_cell[d].selectNode2 != null && _cell[d].selectNode3 != null) {
									if (_cell[d].selectNode.getY() < 880) {
										_se.push([_cell[d], _cell[d].selectNode2.getY()*256+_cell[d].selectNode2.getX()+1, _cell[d].visId]);
									} else {
										_se.push([_cell[d], _cell[d].selectNode3.getY()*256+_cell[d].selectNode3.getX()+1, _cell[d].visId]);
									}
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX(), _cell[d].visId]);
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()+1, _cell[d].visId]);
									_se.push([_cell[d], _cell[d].selectNode2.getY()*256+_cell[d].selectNode2.getX(), _cell[d].visId]);
									_se.push([_cell[d], _cell[d].selectNode3.getY()*256+_cell[d].selectNode3.getX(), _cell[d].visId]);
								} else {
									if (_cell[d].getType) {
										if (_cell[d].getType() > 51 && _cell[d].getType() < 60) {
											_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()+1, _cell[d].visId]);
											_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX()+2, _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+80)*256+_cell[d].selectNode.getX(), _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+80)*256+_cell[d].selectNode.getX()+1, _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+80)*256+_cell[d].selectNode.getX()+2, _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+160)*256+_cell[d].selectNode.getX(), _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+160)*256+_cell[d].selectNode.getX()+1, _cell[d].visId]);
											_se.push([_cell[d], (_cell[d].selectNode.getY()+160)*256+_cell[d].selectNode.getX()+2, _cell[d].visId]);
										}
									}
									_se.push([_cell[d], _cell[d].selectNode.getY()*256+_cell[d].selectNode.getX(), _cell[d].visId]);
								}
							}
						}
					}

					_se.sort(function(a,b){return a[1]-b[1];});

					this.city = new Array(441);
					_empty = [0, 1, 19, 20, 21, 41, 399, 419, 420, 421, 439, 440];
					_water = [352, 353, 373, 374, 375, 395, 396, 397, 398, 417, 418, 438];

					for (i=0; i<this.city.length; i++) this.city[i] = null;

					for (i=0; i<_empty.length; i++)	this.city[_empty[i]] = [-1, -1, -1]; // [buildingID/placeID, buildingLvl, buildingType]

					if (waterCity) {
						for (i=0; i<_water.length; i++) this.city[_water[i]] = [-1, -1, -2];
					}

					try {
						for (i=0, c=0; i<_se.length; i++) {
							while(this.city[c] != null) c++;
							if (_se[i][0].getResType != undefined)
								this.city[c] = [_se[i][0].getId(), 0, _se[i][0].getResType()+900]; // resource node
							else if (_se[i][0].getType != undefined) {
								if (_se[i][0].getLevel != undefined) // building
									this.city[c] = [_se[i][0].getId(), _se[i][0].getLevel()+LT.main.checkBuilding(_se[i][0].getId()), _se[i][0].getType()];
								else
									this.city[c] = [_se[i][0].getId(), _cgi.getWallLevel()+LT.main.checkBuilding("wall"), _se[i][0].getType()]; // wall
							} else if (_se[i][0].getPlaceId != undefined) {
								if (_se[i][0].drawNode != null) {
									if (_se[i][0].drawNode.image != undefined) {
										if (_se[i][0].drawNode.image.indexOf("tower") != -1) {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 99]; // tower place
										} else {
											this.city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty, can be corn field
										}
									} else if (_se[i][0].drawNode.basename == "EffectNode") {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 99]; // ??? bottom left tower in water city
									}
								} else {
									if (waterCity && /\b(331|332|351|354|372|376|394|416)\b/.test(c)) {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 97]; // water building place
									} else {
										this.city[c] = [_se[i][0].getPlaceId(), 0, 98]; // empty
									}
								}
							}
						}

					for (i=0; i<this.city.length; i++) {
						if (this.city[i] == null) {
							this.city = new Array(441);
							window.setTimeout(function(){LT.main.getCity()}, 1000);
							return;
						}
					}

					LT.main.cityId = _cgi.getId();
					LT.city = this.city;
					} catch (e) { LT.debug(e); }
				},
				checkBuilding: function(_buildingId) {
					try {
						cBuildQueue = webfrontend.data.City.getInstance().getBuildQueue();
						d = 0;
						if (cBuildQueue != null) {
							for (j=0; j<cBuildQueue.length; j++) {
								if (cBuildQueue[j].building == _buildingId && (cBuildQueue[j].state == 2 || cBuildQueue[j].state == 5)) return -11; // single downgrade / full demolish
								if (cBuildQueue[j].building == _buildingId) d++;
								if (cBuildQueue[j].type == 23 && _buildingId == "wall") d++; // is city wall on queue?
							}
						}
					} catch(e) { LT.debug(e); }
					return d;
				},
				getIndex: function(_buildingId) {
					this.getCity();
					for (i=0; i<this.city.length; i++) {
						if (this.city[i][0] == _buildingId) return i;
					}
					return -1;
				},
				countUpgradeable: function() {
					if (this.app.visMain.getBuildings().length == 0) {
						window.setTimeout(function(){LT.main.countUpgradeable()}, 1500);
						return;
					}
					this.getCity();

					_upCount = 0;
					_wallLvl = 0;
					_palaceLvl = 0;
					for (i=0; i<this.city.length; i++) {
						if (this.city[i] == null) {
							this.getCity();
							window.setTimeout(function(){LT.main.countUpgradeable()}, 250);
							return;
						}
						if (this.city[i][1] > -1 && this.city[i][1] < 10 && !/\b(-1|-2|23|27|28|29|30|60|61|62|63|900|901|902|903|904|905|906|907|97|98|99)\b/.test(this.city[i][2]) && !(this.city[i][2] > 52 && this.city[i][2] < 60)) _upCount++;
						else if (this.city[i][2] == 23) _wallLvl = this.city[i][1];
						else if (this.city[i][2] > 51 && this.city[i][2] < 60) _palaceLvl = this.city[i][1];
					}
					if (_wallLvl < 10) _upCount++;
					if (_palaceLvl > 0 && _palaceLvl < 10) _upCount++;
					_cba = _cgi.getBuildingLimit() - _cgi.getBuildingCount();
					if (this.bQc.buildingSlotsTooltip.getLabel().indexOf("LT_cUp") == -1) {
						this.bQc.buildingSlotsValue.setValue(_cba + " (" + _upCount + ")");
						_ctxt = '</tr><tr><td id="LT_cUp">' + L("up_count_tt") + '</td><td>' + _upCount + '</td></tr></table>';
						_ttxt = LT.main.bQc.buildingSlotsTooltip.getLabel().replace("</tr></table>", _ctxt);
						this.bQc.buildingSlotsTooltip.setLabel(_ttxt);
					}
				},
				parseCoords: function() {
					tag = (this.lang != "de") ? "city" : "stadt";
					if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
					re = new RegExp("\\b(\\d{1,3}\\:\\d{1,3})(?!\\[\\\/" + tag + "\\])\\b", "g");
					if (this.chat.chatLine.getValue().match(re)) {
						this.chat.chatLine.setValue(this.chat.chatLine.getValue().replace(re, "[" + tag + "]$1[/" + tag + "]"));
						this.chat.chatLine.focus();
					} else {
						pos = this.chat.chatLine.getValue().length + tag.length + 3;
						this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + tag + "][/" + tag + "]");
						this.chat.chatLine.focus();
						this.chat.chatLine.setTextSelection(pos, pos);
					}
				},
				parseText: function(txt) {
					if (this.lang == "de") {
						if (txt == "player") txt = "spieler";
						if (txt == "alliance") txt = "allianz";
					}
					
					if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
					cs = this.chat.chatLine.getTextSelection();
					ss = this.chat.chatLine.getTextSelectionStart();
					se = this.chat.chatLine.getTextSelectionEnd();
					if (cs != "") {
						this.chat.chatLine.setValue(this.chat.chatLine.getValue().substring(0, ss) + "[" + txt + "]" + cs + "[/" + txt + "]" + this.chat.chatLine.getValue().substring(se));
						this.chat.chatLine.focus();
					} else {
						pos = this.chat.chatLine.getValue().length + txt.length + 3;
						this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[" + txt + "][/" + txt + "]");
						this.chat.chatLine.focus();
						this.chat.chatLine.setTextSelection(pos, pos);
					}
				},
				newConvertBBCode: function (D,E,F) {
					if (LT.options.cityTag == 1) {
						if (LT.main.getLang() != 1)
							D = D.replace(/\[city\]([0-9]*?)\:([0-9]*?)\[\/city\]/g, '<a href=# style="color: #1d79ff" onClick="qx.core.Init.getApplication().setMainView(\'r\', 0, $1*128, $2*80)">$1:$2</a>');
						if (LT.main.getLang() == 1)
							D = D.replace(/\[stadt\]([0-9]*?)\:([0-9]*?)\[\/stadt\]/g, '<a href=# style="color: #1d79ff" onClick="qx.core.Init.getApplication().setMainView(\'r\', 0, $1*128, $2*80)">$1:$2</a>');
					}
					D = LT.main.originalConvertBBCode(D,E,F);
					return D;
				},
				tweakInterface: function() {
					this.titleW.pointsLabel.setWidth(50);
					this.titleW.manaLabel.setLayoutProperties({left: 630});
					this.titleW.manaIcon.setLayoutProperties({left: 607})
					this.titleW.goldLabel.setWidth(110);
					this.bQc.sortButtonCont.setLayoutProperties({left: 200});
				},
				tweakReport: function() {
					children = this.app.getReportPage().reportBody.getChildren();
					if (children.length != 0 && typeof children[0].getValue != 'undefined') {
						if (qx.event.Registration.serializeListeners(children[0]).length != 0) return;
						children[0].addListener("click", function() {
							labValue = this.app.getReportPage().reportBody.getChildren()[0].getValue();
							reportId = labValue.match(/[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}/)[0];
							if (!reportId) return;
							if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
							this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[report]" + reportId + "[/report]");
						}, this);
						children[0].addListener("disappear", function() {
							this.app.getReportPage().reportBody.addListenerOnce("addChildWidget", this.tweakReport, this);
						}, this);
						children[0].set({cursor: "pointer"});
					}
				},
				copyCoordsToChat: function(v) {
					posX = posY = 0;
					if (v == "c") {
						if (typeof this.cDetView.city.get_Coordinates == "undefined") {
							posX = this.cDetView.city.getPosX(); posY = this.cDetView.city.getPosY();
						} else {
							ctid = this.cDetView.city.get_Coordinates(); posX = ctid & 0xFFFF; posY = ctid >> 16;
						}
					}
					else if (v == "d") {
						if (typeof this.dDetView.city.get_Coordinates == "undefined") {
							posX = this.dDetView.city.getPosX(); posY = this.dDetView.city.getPosY();
						} else {
							did = this.dDetView.city.get_Coordinates(); posX = did & 0xFFFF; posY = did >> 16;
						}
					}
					else if (v == "n") { posX = this.ncView.cityPosX; posY = this.ncView.cityPosY; }
					//ctag = (this.lang != "de") ? "city" : "stadt";
					ctag = "coords";
					ccl = this.chat.chatLine.getValue();
					if (ccl == null) { this.chat.chatLine.setValue(""); ccl = ""; }
					if (posX >= 0 && posX <= 9) posX = "00" + posX;
					else if (posX > 9 && posX < 100) posX = "0" + posX;
					if (posY >= 0 && posY <= 9) posY = "00" + posY;
					else if (posY > 9 && posY < 100) posY = "0" + posY;
					this.chat.chatLine.setValue(ccl + " " + "[" + ctag + "]" + posX + ":" + posY + "[/" + ctag + "]");
				},
				showPurifyWindow: function() {
					if (webfrontend.data.City.getInstance().getCanPurifyResources()) {
						var g = this.app.getTradeWidget();
						g.setTab(5);
						this.app.switchOverlay(g);
						return;
					}
				},
				updateTopBottomButtons: function() {
					_j = this.bQc.getJobs();
					for (i=1; i<_j.length; i++) {
						if (_j[i].getUserData("Warnings") == 0) {
							if (i > 1) {
								bTop = _j[i].getUserData("top");
								bTop.set({width: 25, label: "T"});
								_j[i].getLayout()._getLayoutChildren()[0]._add(bTop, {left: 153, top: 26});
							}
							if (i >= 1 && i < _j.length-1) {
								bBottom = _j[i].getUserData("bottom");
								bBottom.set({width: 25, label: "B"});
								_j[i].getLayout()._getLayoutChildren()[0]._add(bBottom, {left: 238, top: 26});						
							}
							_j[i].getUserData("payButton").setLayoutProperties({left: 89, width: 16});
						}
					}
				},
				updateMiniMapButton: function() {
					if (typeof this.app.selectorBar.isMapSelectorBarAnchorToLeft != 'undefined') {
						if (!this.app.selectorBar.isMapSelectorBarAnchorToLeft()) {
							if (this.app.selectorBar.contNavigationRose.isVisible())
								this.miniMap.clientArea.setLayoutProperties({right:0, top: 260});
							else
								this.miniMap.clientArea.setLayoutProperties({right: 0, top: 133});
						} else {
							this.miniMap.clientArea.setLayoutProperties({right: 0, top: 62});
						}
					}
				},
				showGetUseButtons: function() {
					if (this.getUseCont1 == null) {
						this.cInfoView.palaceQuickUseStoneButton.getLayoutParent().setVisibility((this.cInfoView.palaceQuickUseStoneButton.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
						this.cInfoView.palaceQuickUseWoodButton.getLayoutParent().setVisibility((this.cInfoView.palaceQuickUseWoodButton.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
						this.cInfoView.quickUseBuildSpeedItemBtn.getLayoutParent().setVisibility((this.cInfoView.quickUseBuildSpeedItemBtn.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
						this.cInfoView.quickUseTownHallButton.getLayoutParent().setVisibility((this.cInfoView.quickUseTownHallButton.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
						this.cInfoView.quickUseBuildingItemBtn.getLayoutParent().setVisibility((this.cInfoView.quickUseBuildingItemBtn.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
						this.cInfoView.quickUseUnitQueueItemBtn.getLayoutParent().setVisibility((this.cInfoView.quickUseUnitQueueItemBtn.getVisibility() == "excluded" ? "excluded" : this.getUseBtnVisibility));
					} else {
						this.getUseCont1.getLayoutParent().setHeight((this.getUseBtnVisibility == "visible" ? 61 : 0));
						this.getUseCont2.getLayoutParent().setHeight((this.getUseBtnVisibility == "visible" ? 61 : 0));
						this.getUseCont3.getLayoutParent().setHeight((this.getUseBtnVisibility == "visible" ? 61 : 0));
					}
				},
				switchGetUseDisplay: function() {
					if (this.getUseCont1 == null) {
						if (LT.options.hideGetUseBtn) {
							this.getUseBtnVisibility = "excluded";
							this.app.getUserData("showGetUseBtn").setVisibility("visible");
							this.cInfoView.palaceQuickUseStoneButton.getLayoutParent().setVisibility("excluded");
							this.cInfoView.palaceQuickUseWoodButton.getLayoutParent().setVisibility("excluded");
							this.cInfoView.quickUseBuildSpeedItemBtn.getLayoutParent().setVisibility("excluded");
							this.cInfoView.quickUseTownHallButton.getLayoutParent().setVisibility("excluded");
							this.cInfoView.quickUseBuildingItemBtn.getLayoutParent().setVisibility("excluded");
							this.cInfoView.quickUseUnitQueueItemBtn.getLayoutParent().setVisibility("excluded");
						} else {
							this.getUseBtnVisibility = "visible";
							this.app.getUserData("showGetUseBtn").setVisibility("excluded");
							this.cInfoView.palaceQuickUseStoneButton.getLayoutParent().setVisibility("visible");
							this.cInfoView.palaceQuickUseWoodButton.getLayoutParent().setVisibility("visible");
							this.cInfoView.quickUseBuildSpeedItemBtn.getLayoutParent().setVisibility("visible");
							this.cInfoView.quickUseTownHallButton.getLayoutParent().setVisibility("visible");
							this.cInfoView.quickUseBuildingItemBtn.getLayoutParent().setVisibility("visible");
							this.cInfoView.quickUseUnitQueueItemBtn.getLayoutParent().setVisibility("visible");
						}
					} else {
						if (LT.options.hideGetUseBtn) {
							this.app.getUserData("showGetUseBtn").setVisibility("visible");
							if (this.getUseCont1 != null) {
								this.getUseCont1.getLayoutParent().setHeight(0);
								this.getUseCont2.getLayoutParent().setHeight(0);
								this.getUseCont3.getLayoutParent().setHeight(0);
							}
						} else {
							this.app.getUserData("showGetUseBtn").setVisibility("excluded");
							if (this.getUseCont1 != null) {
								this.getUseCont1.getLayoutParent().setHeight(61);
								this.getUseCont2.getLayoutParent().setHeight(61);
								this.getUseCont3.getLayoutParent().setHeight(61);
							}
						}
					}
				},
				createTradeButtons: function() {
					if (this.app.tradeWidget) {
						_pageSend = null;
						for (var o in LT.a.tradeWidget) {
							if (LT.a.tradeWidget[o] != null && /SendResourcesPage/.test(LT.a.tradeWidget[o].basename))
								_pageSend = LT.a.tradeWidget[o];
							if (LT.a.tradeWidget[o] != null && /RequestResourcesPage/.test(LT.a.tradeWidget[o].basename))
								_prr = LT.a.tradeWidget[o];
						}
						if (_pageSend == null) return;
						_pageSendCont = _pageSend.aResValueSpinner[0].getLayoutParent(); // spinners container
						_tbd = [
							["1k", 1], ["5k", 5], ["10k", 10], ["25k", 25],
							["50k", 50], ["100k", 100], ["250k", 250], ["500k", 500]
						];
						_pageSendCont.getLayout().setSpacingX(5);
						for (i=0; i<4; i++) {
							for (j=0; j<8; j++) {
								tb = new qx.ui.form.Button(_tbd[j][0]).set({appearance: "button-recruiting", font: "bold"});
									tb.addListener("click", this.increaseResAmount, {am:_tbd[j][1], r:i, p:_pageSend});
								_pageSendCont.add(tb, {column: j+3, row: i+1});
							}
						}

						// add listeners to spinners in request resources page
						_prrTable = null;
						_spObj = null;
						_prrSel = null;
						for (var p in _prr) {
							if (_prr[p] != null) {
								if (_prr[p].toString().indexOf("SpinnerInt") != -1 && _prr[p].toString().indexOf("9999999") != -1) {
									re = /([_a-zA-z]+)(?=\s*=\s*\(?new\s*\(?webfrontend\.g?ui\.SpinnerInt)/g;
									_spObj = _prr[p].toString().match(re);
								}
								if (_prr[p].toString().indexOf("SimpleColFormattingDataModel") != -1) {
									_prrTable = _prr[p];
								}
								if (_prr[p].toString().indexOf("SelectBox") != -1) {
									_prrSel = _prr[p];
								}
							}
						}
						cb = new qx.ui.form.CheckBox(L("trade_limit"));
						if (LT.options.resLimit)
							cb.setValue(true);
						cb.addListener("appear", function() { this.setValue(LT.options.resLimit); }, cb);
						_prr[_spObj[0]].getLayoutParent().add(cb, {row:2, column:0});
						LT.main.temp_limit = cb;
						_prrSel.addListener("changeSelection", function() { if (this.getSelectables()[1] == this.getSelection()[0]) {LT.main.temp_limit.setValue(false);} else {LT.main.temp_limit.setValue(LT.options.resLimit);}}, _prrSel);
						_prrSel.addListener("appear", function() { if (this.t.getData().length > 0 && this.t.getData()[0].originalData.resType > 2) this.s.setSelection([this.s.getChildren()[0]]); if (this.s.getSelectables()[1] == this.s.getSelection()[0]) {LT.main.temp_limit.setValue(false);} else {LT.main.temp_limit.setValue(LT.options.resLimit);}}, {t:_prrTable, s:_prrSel});
						
						_prr[_spObj[0]].addListener("changeValue", this.limitResources, {t:_prrTable, s:_prr[_spObj[0]], b:0});
						_prr[_spObj[1]].addListener("changeValue", this.limitResources, {t:_prrTable, s:_prr[_spObj[1]], b:1});

						webfrontend.base.Timer.getInstance().removeListenerById(this.tradeButtonsListener);
					}
				},
				increaseResAmount: function() {
					curVal = this.p.aResValueSpinner[this.r].getValue();
					this.p.aResValueSpinner[this.r].setValue(curVal + this.am*1000);
				},
				limitResources: function() {
					if (!LT.main.temp_limit.getValue()) return;
					c = webfrontend.data.City.getInstance();
					_it = c.tradeIncoming;
					if (_it == null || _it == undefined) _it = [];
					_data = this.t.getData();
					for (i=0; i<_data.length; i++) {
						if (_data[i][0] == true) {
							_res = _data[i].originalData.resType; // resource type
							_inc = 0;
							// incoming trade
							for (k=0; k<_it.length; k++) {
								for (j=0; j<_it[k].resources.length; j++) {
									if (_it[k].resources[j].type == _res) 
										_inc += _it[k].resources[j].count;
								}
							}
					
							_timeSpan = (this.b == 0) ? _data[i].originalData.tl : _data[i].originalData.ts;
							if (_res == 4) {
								_fc = Math.round(c.getFoodConsumption() * 3600);
								_fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
								_ft = c.getResourceGrowPerHour(4) - _fc - _fcs;
							}
							curVal = c.getResourceCount(_res);
							curDel = c.resources[_res].delta;
							curMax = c.getResourceMaxStorage(_res);

							_val = Math.floor(curMax - (curVal + ((_res == 4) ? _ft*_timeSpan/3600 : _timeSpan * curDel)) - _inc);
							if (_val < 0) _val = 0;

							if (this.s.getValue() > _val) {
								this.s.setValue(_val);
							}
						}
					}
				},
				showOptionsPage: function() {
					this.app.switchOverlay(this.optionsPage);
					LT.main.turboUtils.refreshOptionsPage();
				},
				toggleAutoBuild: function() {
					LT.options.enableAutoPilot = !LT.options.enableAutoPilot;
					window.louTweak.main.getInstance().updateAutoButtonLabel(this);
				},
				updateAutoButtonLabel: function(btn) {
					if (LT.options.enableAutoPilot) {
						btn.setLabel(L("stop_autopilot"));
					} else {
						btn.setLabel(L("start_autopilot"));
					}
				},
				loadOptions: function() {
					forceSave = false;
					_str = localStorage.getItem("LT_options");
					if (_str)
						this.options = qx.lang.Json.parse(_str);
					else {
						this.options = {
							"thousandsSeparator": 0,
							"hotkeys": {
								"build": {
									"woodcutter": "W",
									"quarry": "Q",
									"farm": "F",
									"cottage": "C",
									"market": "P",
									"ironmine": "I",
									"sawmill": "L",
									"mill": "M",
									"hideout": "H",
									"stonemason": "A",
									"foundry": "D",
									"townhouse": "U",
									"barracks": "B",
									"cityguardhouse": "K",
									"trainingground": "G",
									"stable": "E",
									"workshop": "Y",
									"shipyard": "V",
									"warehouse": "S",
									"castle": "X",
									"harbor": "R",
									"moonglowtower": "J",
									"trinsictemple": "Z",
									"lookouttower": "1",
									"ballistatower": "2",
									"guardiantower": "3",
									"rangertower": "4",
									"templartower": "5",
									"pitfalltrap": "6",
									"barricade": "7",
									"arcanetrap": "8",
									"camouflagetrap": "9"
								},
								"upgrades": {
									"upgrade": "U",
									"downgrade": "D",
									"minister": "A"
								},
								"global": {
									"prevcity": "[",
									"nextcity": "]"
								}
							},
							"lowestLevelUpgradeIDs": [47,48,50,4,5,49,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,36,37,38,39,40,41,42,43,44,45,46,12,23],
							"lowestLevelMax": [10,10,10,10,10,10],
							"switchToAllyTab": false,
							"showIncResCont": 1,
							"showQueueTimes": true,
							"incResClrs": ["#FF0000","#F7941D","#FFE400","#40C849"],
							"chatColors": ["#fcbf8f", "#78b042", "#000000", "#ff4076", "#fa9bb6", "#aaaaaa", "#b0843f"],
							"chatMaxLines": 100,
							"chatOpacity": 55,
							"cityTag": 0,
							"resLimit": true,
							"userLang": "",
							"showMiniMap": true,
							"miniMapColors": [ "#00C0FF", "#0000FF", "#00FF80", "#468246", "#E0E060", "#969640", "#FF8080", "#FF0000", "#00C8C8", "#008080", "#8C4600", "#643200", "#C0C0C0", "#737373", "#FFFFFF", "#000000", "#FFFFFF", "#000000" ],
							"miniMapMark": [ 3, 3, 3, 3, 3, 3, 3, 1, 1 ],
							"saveSsCn": false,
							"tradeLabelsAmount": 999,
							"hideGetUseBtn": false,
							"enableAutoPilot": false,
							"upgradeFocus": 4,
							"upgradeInterval": 5,
							"switchCityInterval": 5,
							"autoSwitchCities": false,
							"useDefaultCityTurboSettings":false,
							"autoAddBuildings": false,
							"autoUpgradeBuildings": false,
							"autoSendAttack": false,
							"autoPurify":false,
							"LTver": LTversion
						};
					}
					//1.3.2
					if (this.options.lowestLevelUpgradeIDs[0] == 1) this.options.lowestLevelUpgradeIDs[0] = 47;
					if (this.options.lowestLevelUpgradeIDs[1] == 2) this.options.lowestLevelUpgradeIDs[1] = 48;
					if (this.options.lowestLevelUpgradeIDs[2] == 3) this.options.lowestLevelUpgradeIDs[2] = 50;
					if (this.options.lowestLevelUpgradeIDs[5] == 6) this.options.lowestLevelUpgradeIDs[5] = 49;
					//
					//1.3.7
					if (!this.options.hasOwnProperty("showMiniMap")) this.options.showMiniMap = true;
					if (!this.options.hasOwnProperty("miniMapColors")) this.options.miniMapColors = [ "#00C0FF", "#0000FF", "#00FF80", "#468246", "#E0E060", "#969640", "#FF8080", "#FF0000", "#00C8C8", "#008080", "#8C4600", "#643200", "#C0C0C0", "#737373", "#FFFFFF", "#000000", "#FFFFFF", "#000000" ];
					if (!this.options.hasOwnProperty("miniMapMark")) this.options.miniMapMark = [ 3, 3, 3, 3, 3, 3, 3, 1, 1 ];
					//1.3.8
					if (this.options.miniMapColors.length == 8) this.options.miniMapColors = [ "#00C0FF", "#0000FF", "#00FF80", "#468246", "#E0E060", "#969640", "#FF8080", "#FF0000", "#00C8C8", "#008080", "#8C4600", "#643200", "#C0C0C0", "#737373", "#FFFFFF", "#000000", "#FFFFFF", "#000000" ];
					if (this.options.miniMapMark.length == 8) this.options.miniMapMark = [ 3, 3, 3, 3, 3, 3, 3, 1, 1 ];
					//1.3.9
					if (/false|true/.test(this.options.miniMapMark.join(""))) this.options.miniMapMark = [ 3, 3, 3, 3, 3, 3, 3, 1, 1 ];
					//1.4.7
					if (!this.options.hasOwnProperty("saveSsCn")) this.options.saveSsCn = false;
					//1.5.1
					if (this.options.chatColors.length == 5) this.options.chatColors.push("#bd0000");
					if (!this.options.hasOwnProperty("tradeLabelsAmount")) this.options.tradeLabelsAmount = 999;
					if (!this.options.hasOwnProperty("hideGetUseBtn")) this.options.hideGetUseBtn = false;

					//1.5.8
					if (this.options.hasOwnProperty("LTver") && parseInt(this.options.LTver.replace(/\./g, "")) < 158) {
						this.options.LTver = LTversion;
						if (this.options.chatColors.length < 7) {
							this.options.chatColors[5] = "#aaaaaa";
							this.options.chatColors.push("#b0843f");
						}
						forceSave = true;
					}
					
					// Auto pilot should be turned off when starting up - TODO: should not keep it in the options localstorage
					this.options.enableAutoPilot=false;
					this.app.setUserData("LT_options", this.options);
					if (forceSave) {
						str = qx.lang.Json.stringify(this.options);
						localStorage.setItem("LT_options", str);
					}
				},
				getLang: function() {
					return this.langToId(this.lang);
				},
				setLang: function(l) {
					this.lang = l;
					//qx.locale.Manager.getInstance().setLocale(l);
				},
				langToId: function(l) {
					switch(l) {
						case "en":
							return 0;
						case "de":
							return 1;
						case "es":
							return 2;
						case "pl":
							return 3;
						case "pt":
						case "pt_BR":
							return 4;
						case "ru":
							return 5;
						case "it":
							return 6;
						case "fr":
							return 7;
						default:
							return 0;
					}
				},
				thSep: function(val) {
					if (val == undefined) return "";
					separators = [".", ",", " ", ""];
					return val.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&" + separators[LT.options.thousandsSeparator]);
				},
				debug: function(s, isTrace) {
					traceOn=false;
					if (!isTrace || (isTrace && traceOn)) {
						if (typeof console != 'undefined') console.log(s);
						else if (window.opera) opera.postError(s);
						else GM_log(s);
					}
				}
			}
		});
		
		qx.Class.define("louTweak.queueTimesLabel", {
			extend: qx.core.Object,
			construct: function () {
				this.queueTimeCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.queueTimeContBgr = new qx.ui.basic.Image("data:image/png;base64,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");
				this.queueTimeContBgr.setWidth(280);
				this.queueTimeContBgr.setHeight(50);
				this.queueTimeCont.add(this.queueTimeContBgr, {left: 0, top: 0});
				gr = new qx.ui.layout.Grid(3, 4);
				gr.setColumnMaxWidth(0, 20);
				gr.setColumnMinWidth(1, 200);
				gr.setColumnMaxWidth(2, 40);
				this.queueTimeGrid = new qx.ui.container.Composite(gr);
				this.queueTimeCont.add(this.queueTimeGrid, {left: 8, top: 8});
				this.queueTimeGrid.add(new qx.ui.basic.Label("BQ:").set({textColor: "text-gold"}), {column:0, row:0});
				this.queueTimeGrid.add(new qx.ui.basic.Label("UQ:").set({textColor: "text-gold"}), {column:0, row:1});
				this.buildQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold"});
				this.buildQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold"});
				this.unitQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold"});
				this.unitQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold"});
				this.queueTimeGrid.add(this.buildQueueTimeLabel, {column:1, row:0});
				this.queueTimeGrid.add(this.buildQueueSlotsLabel, {column:2, row:0});
				this.queueTimeGrid.add(this.unitQueueTimeLabel, {column:1, row:1});
				this.queueTimeGrid.add(this.unitQueueSlotsLabel, {column:2, row:1});
				
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateQueueTimes, this);
			},
			members: {
				queueTimeCont: null,
				queueTimeContBgr: null,
				queueTimeGrid: null,
				buildQueueTimeLabel: null,
				buildQueueSlotsLabel: null,
				unitQueueTimeLabel: null,
				unitQueueSlotsLabel: null,
				updateQueueTimes: function() {
					if (LT.options.showQueueTimes)
						this.queueTimeCont.setVisibility("visible");
					else
						this.queueTimeCont.setVisibility("excluded");
					
					if (typeof LT.a.selectorBar.isMapSelectorBarAnchorToLeft != 'undefined') {
						if (LT.a.selectorBar.isMapSelectorBarAnchorToLeft()) {
							if (LT.a.selectorBar.contNavigationRose.isVisible())
								this.queueTimeCont.setLayoutProperties({left: 690, top: 65});
							else
								this.queueTimeCont.setLayoutProperties({left: 405, top: 135});
						} else {
							this.queueTimeCont.setLayoutProperties({left: 405, top: 65});
						}
					}

					p = webfrontend.data.Player.getInstance();
					b = webfrontend.data.City.getInstance().buildQueue;
					u = webfrontend.data.City.getInstance().unitQueue;
					st = webfrontend.data.ServerTime.getInstance();
					if (b != null) {

						timeSpan = b[b.length-1].end - st.getServerStep();
						endTime = webfrontend.Util.getDateTimeString(st.getStepTime(b[b.length-1].end));
						if (timeSpan < 0)
							this.buildQueueTimeLabel.setValue("0:00");
						else
							this.buildQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(timeSpan) + ")");
						this.buildQueueSlotsLabel.setValue(b.length + " / " + p.getMaxBuildQueueSize());
					} else {
						this.buildQueueTimeLabel.setValue("0:00");
						this.buildQueueSlotsLabel.setValue("0" + " / " + p.getMaxBuildQueueSize());
					}
					if (u != null) {

						timeSpan = u[u.length-1].end - st.getServerStep();
						endTime = webfrontend.Util.getDateTimeString(st.getStepTime(u[u.length-1].end));
						if (timeSpan < 0)
							this.unitQueueTimeLabel.setValue("0:00");
						else
							this.unitQueueTimeLabel.setValue(endTime + " (" + webfrontend.Util.getTimespanString(timeSpan) + ")");
						this.unitQueueSlotsLabel.setValue(u.length + " / " + p.getMaxUnitQueueSize());
					} else {
						this.unitQueueTimeLabel.setValue("0:00");
						this.unitQueueSlotsLabel.setValue("0" + " / " + p.getMaxUnitQueueSize());
					}
				}
			}
		});
		qx.Class.define("louTweak.incomingResourcesLabel", {
			extend: qx.core.Object,
			construct: function () {
				m = webfrontend.res.Main.getInstance();
				this.incResCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.incResContBgr = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVIAAABFCAMAAAAvr55KAAABX1BMVEVtSytsSiubjXRpRytqSCtbVUdoTz/Bm36jfGOie2OifGOajHSajXSFe2VwZ1VtYlGlfWSYdV6KajJmRCuhk3mYinGYcFl2VSuunoJtU0J3XUqngWe+rY5+c2BdUkN+XkvAmn18ZVLOvJuomX5lVkammH3dyabGtJWvn4PZxqNjXU2gknjFtJSZi3J0UythPiuThWyXclqYc1uUhW2ShGyfeGDl0Kt3VitfPCuac1qcdl1eOyuShGtgPStjQSuhkXeUhm2ohmuAXytVMSt5WCvSv5yThGzEqYmed19vTSt9XCtwTiuXcVrl0ayWcFpyUStdOiuYiXCWcVp7Wiu7nH+wnoJxUCtrSSvBr5CXc1vm0azdyaWZc1uShWyBYSuThG3kz6qVhm6wj3Z8WyuhemJ1VCuadFxuTCvjzanJsJCSczygeWGajHOie2JkQiueeF9XMyuIaDBiPyuVh26XiHAEM5p5AAACG0lEQVR4XuzW1W0FQRiD0b+imWXey8zMzBBO+lfSQ/zoU8InWbIsvN3IfYcgd7TzFuK1q6ECobDa9uR2Dx8fIPQI7zdZ5g/FNxAqHvJLKUc9nYKQ7kVlma2QSZl0NZOxldEwlLHGkjU1EJlZ6ZspEJl9sVspELVscToaiDqOJNCk1EnEgA6fWgY+KZM6Aw1EA0cSaFIaJGJAfymZhhjzWKcgpOO5IWtLxV8gFCtrLZXLZhoEMQAFwXRzqcg2KhUyIFQoRVuxa/6wNCwA0F9Iv2bL3lX+sfEJQI2jr9y95J5dpc4NADor1X3m5PvUnHRBaNI8vcjP6/Var9eb/0a/7NnBbcQwDETRCU+S7IPtRcpIIapEF9L9H4OtIWNggfxXgA4DkYSoOedaFfqu9Tb/DOutdn+kRPrTlxF6KpuM0ELRvozQQnuTEVr4C59Io2SESsWQEcZmHk9ooXRHSqRbyYxeWjIj0i4j9Pz0Xsp4Qgtz4aOnP1IizZIRyj2e8Mi+lEiHjDA2bUNeRJolMx6kTR+P7zwmvozQwtxLUfnvJj5/T7yeYO+lqFR2GaHnE4XP2mR92WCNUB73lAnmfaTivF7TBK/rDP22AydXDIJAAEDniUlO4IXHvuOurdB/O2lijvNlVZohIVpVCWZxns0oCPNuMRB4yuWHgpSceIDWxWq/KIhdRW+wH1u8PyjIHbdjh3G95zOhIM/5XuMPR3QydajAz8UAAAAASUVORK5CYII=");
				this.incResContBgr.setWidth(338);
				this.incResContBgr.setHeight(69);
				this.incResCont.add(this.incResContBgr, {left: 0, top: 0});
				this.incResLab = new qx.ui.basic.Label(L("inc_res_txt")).set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLab, {left: 8, top: 3});
				this.incResLabNext = new qx.ui.basic.Label(L("nxt_arr_txt")).set({width: 150, textAlign: "right", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabNext, {left: 180, top: 3});
				this.incResLabTr = new qx.ui.basic.Label("TR:").set({textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabTr, {left: 6, top: 38});
				this.incResLabFs = new qx.ui.basic.Label("FS:").set({textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabFs, {left: 7, top: 50});
				for (i=0; i<4; i++) {
					imgo = m.getFileInfo(m.resources[i+1].i);
					incResImg = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(imgo.url));
					incResImg.setHeight(22);
					incResImg.setWidth(20);
					incResImg.setScale(true);
					this.incResCont.add(incResImg, {top: 17, left: 5 + 83*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center"});
					this.incResCont.setUserData("incResLab" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 21, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center"});
					this.incResCont.setUserData("incResLabTot" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 38, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center"});
					this.incResCont.setUserData("incResLabFree" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 50, left: 27 + 82*i});
				}
				
				webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateIncResCont, this);
			},
			members: {
				incResCont: null,
				incResContBgr: null,
				incResLab: null,
				incResLabNext: null,
				incResLabTr: null,
				incResLabFs: null,
				updateIncResCont: function() {
					var c = webfrontend.data.City.getInstance();
					it = c.getTradeIncoming();
					ot = c.getTradeOrders();
					// start:LTT
					ctiv = LT.main.cTradeInfoView;
					at = ctiv.tradeJobsIn.concat(ctiv.tradeJobsOut);
					for (i=0; i<at.length; i++) {
						if (at[i].getUserData("Show") == false) {
							at.splice(i, 1);
							i--;
						}
					}
					at.sort(function(a, b){
						return (a.getUserData("Trade").end < b.getUserData("Trade").end ? 0 : 1);
					});
					for (j=0; j<at.length; j++) {
						if (j < LT.options.tradeLabelsAmount)
							at[j].setVisibility("visible");
						else
							at[j].setVisibility("excluded");
					}
					// end:LTT
					if (LT.options.showIncResCont == 0) {
						this.incResCont.setVisibility("excluded");
						return;
					}
					if (it == null || it == undefined) {
						if (LT.options.showIncResCont == 2) {
							this.incResCont.setVisibility("excluded");
							return;
						}
						this.incResCont.setVisibility("visible");
						it = [];
					}
					this.incResCont.setVisibility("visible");
					var resVal = [0,0,0,0,0,-1]; // 0 - last trader, 1-4 res, 5 - first trader
					for (i=0; i<it.length; i++) {
						for (j=0; j<it[i].resources.length; j++) {
							resVal[it[i].resources[j].type] += it[i].resources[j].count;
						}
						if (it[i].end > resVal[0])
							resVal[0] = it[i].end;
						if (resVal[5] == -1 || it[i].end < resVal[5])
							resVal[5] = it[i].end;
					}

					for (i=1; i<5; i++) {
						freeSpc = 0;
						curVal = c.getResourceCount(i);
						curDel = (c.resources[i] == undefined ? 0 : c.resources[i].delta);
						curMax = c.getResourceMaxStorage(i);
						dateNow = new Date().getTime();
						this.incResCont.getUserData("incResLab" + i).setTextColor("#FFCC82");
						this.incResCont.getUserData("incResLab" + i).setValue(LT.thSep(resVal[i]));
						ft = 0;
						if (i == 4) {
							fc = Math.round(c.getFoodConsumption() * 3600);
							fcs = Math.round(c.getFoodConsumptionSupporter() * 3600);
							ft = c.getResourceGrowPerHour(i) - fc - fcs;
						}
						if (it.length > 0) {

							timeSpan = resVal[0] - st.getServerStep();
							resAtArrival = Math.floor(curVal + ((i == 4) ? ft*timeSpan/3600 : timeSpan * curDel) + resVal[i]);
							
							if (curVal == curMax)
								freeSpc = -resVal[i];
							else
								freeSpc = curMax - resAtArrival;
								
							if (resAtArrival > curMax) resAtArrival = curMax;
						} else {
							resAtArrival = Math.floor(curVal);
							freeSpc = curMax - curVal;
						}
						this.incResCont.getUserData("incResLabTot" + i).setValue(LT.thSep(resAtArrival));
						this.incResCont.getUserData("incResLabFree" + i).setValue(LT.thSep(Math.floor(freeSpc)));
						
						if (freeSpc < 0) {
							clr = LT.options.incResClrs[0];
						} else {
							clr = "#FFCC82";
						}
						this.incResCont.getUserData("incResLabFree" + i).setTextColor(clr);
						
						r = resAtArrival/curMax;
						clr = LT.options.incResClrs[3];
						if (r > 0) {
							if (r >= 1.0) {
								clr = LT.options.incResClrs[0];
							} else if (r >= 0.9) {
								clr = LT.options.incResClrs[1];
							} else if (r >= 0.75) {
								clr = LT.options.incResClrs[2];
							} else {
								clr = LT.options.incResClrs[3];
							}
						}
						this.incResCont.getUserData("incResLabTot" + i).setTextColor(clr);
					}
					
					if (it.length > 0) {

						timeSpan = resVal[5] - st.getServerStep();
						this.incResLabNext.setValue(L("nxt_arr_txt") + webfrontend.Util.getTimespanString(timeSpan));
					} else
						this.incResLabNext.setValue("");
				}
			}
		});
		qx.Class.define("louTweak.optionsPage", {
			extend: webfrontend.gui.OverlayWidget,
			construct: function() {
				webfrontend.gui.OverlayWidget.call(this);

				this.clientArea.setLayout(new qx.ui.layout.Canvas());
				this.setTitle(L("main_title"));
				this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
				this.tabPages = [
					{name:(L("tab_general")), page:null, vbox:null},
					{name:(L("tab_hotkeys")), page:null, vbox:null},
					{name:(L("tab_colors")), page:null, vbox:null},
					{name:(L("tab_turbo")) + LT.options.LTver, page:null, vbox:null}
				];
				for (i=0; i<this.tabPages.length; i++) {
					page = new qx.ui.tabview.Page(this.tabPages[i].name);
					page.setLayout(new qx.ui.layout.Canvas());
					vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
					scroll = new qx.ui.container.Scroll(vbox);
					page.add(scroll, {top: 0, left: 0, right: 0, bottom: 0});
					this.tabPages[i].vbox = vbox;
					this.tabPages[i].page = page;
				}
				
				// ----- Page 1
{
				// ----- Switch to alliance tab
				cb = new qx.ui.form.CheckBox(L("opts_switch_to_ally_tab"));
				if (LT.options.switchToAllyTab)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.switchToAllyTab = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);

				// ----- Chat max lines / transparency
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_max_chatlines")).set({paddingTop: 4});
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.ui.SpinnerInt(10, LT.options.chatMaxLines, 100);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.chatMaxLines = _val; webfrontend.config.Config.getInstance().getChat().setMaxLines(_val); }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);

				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_chat_opacity")).set({paddingTop: 4});
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.ui.SpinnerInt(0, LT.options.lowestLevelMax[i], 10);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.chatOpacity = 100 - _val; LT.a.chat.BgrLabel.setOpacity((100-_val)/100); }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[0].vbox.add(cont);

				/*this lines give a script error on load! // ----- Max amout of labels in trade summary
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_trade_lab_max_amount")).set({paddingTop: 4});
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.gui.SpinnerInt(0, LT.options.tradeLabelsAmount, 999);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.tradeLabelsAmount = _val; }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[0].vbox.add(cont);*/

				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				




				// ----- Hide 'Get & Use' buttons
				cb = new qx.ui.form.CheckBox(L("opts_hide_get_use"));
				if (LT.options.hideGetUseBtn) {
					cb.setValue(true);
					LT.main.switchGetUseDisplay();
				}
				cb.addListener("click", function() { LT.options.hideGetUseBtn = this.getValue() ? true : false; LT.main.switchGetUseDisplay(); }, cb);
				this.tabPages[0].vbox.add(cb);


				
				// ----- Show queue info window
				cb = new qx.ui.form.CheckBox(L("opts_show_queue_win"));
				if (LT.options.showQueueTimes)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.showQueueTimes = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);
				
				// ----- Save overlay layout in city notes
				cb = new qx.ui.form.CheckBox(L("opts_save_ss_cn"));
				if (LT.options.saveSsCn)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.saveSsCn = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);

				// ----- Requested resources limit
				cb = new qx.ui.form.CheckBox(L("opts_limit_req_res"));
				if (LT.options.resLimit)
					cb.setValue(true);
				cb.addListener("click", function() { LT.options.resLimit = this.getValue() ? true : false; }, cb);
				this.tabPages[0].vbox.add(cb);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- Incoming resources label
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_inc_res").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_inc_res").disabled, L("opts_inc_res").always, L("opts_inc_res").context ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));
				}
				
				rg.setSelection([rg.getChildren()[LT.options.showIncResCont]]);
				rg.addListener("changeSelection", function() { LT.options.showIncResCont = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);
				
				// ----- Thousands separator
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_separator").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_separator").period, L("opts_separator").comma, L("opts_separator").space, L("opts_separator").none ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));				
				}
			
				rg.setSelection([rg.getChildren()[LT.options.thousandsSeparator]]);
				rg.addListener("changeSelection", function() { LT.options.thousandsSeparator = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);

				// ----- City tag
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("opts_city_tag").lab);
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ L("opts_city_tag").info, L("opts_city_tag").region ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(rbs[i]);
					rb.setUserData("id", i);
					rb.setGroup(rg);
					cont.add(rb);
					cont.add(new qx.ui.core.Spacer(10));				
				}

				rg.setSelection([rg.getChildren()[LT.options.cityTag]]);
				rg.addListener("changeSelection", function() { LT.options.cityTag = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);

				// ----- LoU Tweak language
				gr = new qx.ui.layout.Grid(0, 5);
				gr.setColumnMinWidth(0, 120);
				gr.setColumnMinWidth(1, 120);
				gr.setColumnMinWidth(2, 120);
				gr.setColumnMinWidth(3, 120);
				cont = new qx.ui.container.Composite(gr).set({marginLeft: 20});
				lab = new qx.ui.basic.Label(L("opts_lang").lab + " " + L("req_restart") + ":").set({marginLeft: 20});
				this.tabPages[0].vbox.add(lab);
				
				rg = new qx.ui.form.RadioGroup();
				
				rbs = [ "en", "de", "es", "pl", "pt", "ru", "it", "fr" ];
				for (i=0; i<rbs.length; i++) {
					rb = new qx.ui.form.RadioButton(L("opts_lang")[rbs[i]]);
					rb.setUserData("id", rbs[i]);
					rb.setGroup(rg);
					cont.add(rb, {row: Math.floor(i/4), column: i%4});
				}

				rg.setSelection([rg.getChildren()[LT.main.langToId(LT.options.userLang)]]);
				rg.addListener("changeSelection", function() { LT.options.userLang = this.getSelection()[0].getUserData("id"); }, rg);
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- MiniMap
				gr = new qx.ui.layout.Grid(0, 9);
				gr.setColumnMinWidth(0, 80);
				gr.setColumnMinWidth(1, 60);
				gr.setColumnMinWidth(2, 60);
				gr.setColumnMinWidth(3, 60);
				gr.setColumnMinWidth(4, 60);
				gr.setColumnAlign(0, "right", "middle");
				gr.setColumnAlign(1, "center", "middle");
				gr.setColumnAlign(2, "center", "middle");
				gr.setColumnAlign(3, "center", "middle");
				gr.setColumnAlign(4, "center", "middle");
				cgb = new qx.ui.container.Composite(gr).set({marginLeft: 20});
				this.setUserData("mmcb", cgb);
				//cgb.setVisibility("excluded");
				
				cb = new qx.ui.form.CheckBox(L("opts_minimap").enable_lab);
					if (LT.options.showMiniMap) {
						cb.setValue(true);
						this.getUserData("mmcb").setVisibility("visible");
					}
				cb.addListener("click", function() {
					LT.options.showMiniMap = this.getValue() ? true : false;
					LT.main.optionsPage.getUserData("mmcb").setVisibility((this.getValue() ? "visible" : "excluded"));
					LT.main.miniMap.clientArea.setVisibility((this.getValue() ? "visible" : "excluded"));
				}, cb);
						
				this.tabPages[0].vbox.add(cb);
				
				cbs = [
					[L("opts_minimap").show_cities, 0, 0],
					[L("opts_minimap").show_none, 0, 1],
					[L("opts_minimap").show_noncastle, 0, 2],
					[L("opts_minimap").show_castle, 0, 3],
					[L("opts_minimap").show_all, 0, 4],
					[L("opts_minimap").show_self, 1, 0],
					[L("opts_minimap").show_alliance, 2, 0],
					[L("opts_minimap").show_allied, 3, 0],
					[L("opts_minimap").show_enemy, 4, 0],
					[L("opts_minimap").show_nap, 5, 0],
					[L("opts_minimap").show_other, 6, 0],
					[L("opts_minimap").show_lawless, 7, 0]
				];
				for (i=0; i<cbs.length; i++) {
					lab = new qx.ui.basic.Label(cbs[i][0]);
					cgb.add(lab, {row:cbs[i][1], column:cbs[i][2]});
				}
				lab = new qx.ui.basic.Label(L("opts_minimap").show_moongate);
				cgb.add(lab, {row:9, column:0});
				lab = new qx.ui.basic.Label(L("opts_minimap").show_shrine);
				cgb.add(lab, {row:10, column:0});
				
				for (j=0; j<7; j++) {
					rg = new qx.ui.form.RadioGroup();
					for (i=0; i<4; i++) {
						rb = new qx.ui.form.RadioButton(null);
						rb.setUserData("id", i);
						rb.setGroup(rg);
						cgb.add(rb, {row:j+1, column:i+1});
					}
					rg.setSelection([rg.getChildren()[LT.options.miniMapMark[j]]]);
					rg.addListener("changeSelection", function() { LT.options.miniMapMark[this.it] = this.g.getSelection()[0].getUserData("id"); }, {g:rg, it:j});
				}
				rg = new qx.ui.form.RadioGroup();
				rb = new qx.ui.form.RadioButton(L("no")); rb.setUserData("id", 0); rb.setGroup(rg); cgb.add(rb, {row:9, column:1});
				rb = new qx.ui.form.RadioButton(L("yes")); rb.setUserData("id", 1); rb.setGroup(rg); cgb.add(rb, {row:9, column:2});
				rg.setSelection([rg.getChildren()[LT.options.miniMapMark[7]]]);
				rg.addListener("changeSelection", function() { LT.options.miniMapMark[7] = this.getSelection()[0].getUserData("id"); }, rg);
				rg = new qx.ui.form.RadioGroup();
				rb = new qx.ui.form.RadioButton(L("no")); rb.setUserData("id", 0); rb.setGroup(rg); cgb.add(rb, {row:10, column:1});
				rb = new qx.ui.form.RadioButton(L("yes")); rb.setUserData("id", 1); rb.setGroup(rg); cgb.add(rb, {row:10, column:2});
				rg.setSelection([rg.getChildren()[LT.options.miniMapMark[8]]]);
				rg.addListener("changeSelection", function() { LT.options.miniMapMark[8] = this.getSelection()[0].getUserData("id"); }, rg);

				if (!LT.options.showMiniMap) {
					this.getUserData("mmcb").setVisibility("excluded");
				}
				this.tabPages[0].vbox.add(cgb);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- Lowest level upgrades
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				rg = new qx.ui.form.RadioGroup();
				rb = new qx.ui.form.RadioButton(L("sel_all"));
				rb.setGroup(rg); rb.setUserData("id", 0);
				cont.add(rb);
				cont.add(new qx.ui.core.Spacer(20));
				rb = new qx.ui.form.RadioButton(L("unsel_all"));
				rb.setGroup(rg); rb.setUserData("id", 1);
				cont.add(rb);
				this.tabPages[0].vbox.add(cont);
				cbArray = new Array(34);

				gr = new qx.ui.layout.Grid(0, 9);
				gr.setColumnMinWidth(0, 130);
				gr.setColumnMinWidth(1, 130);
				gr.setColumnMinWidth(2, 130);
				gr.setColumnMinWidth(3, 130);
				cont = new qx.ui.container.Composite(gr);
				
				lab = new qx.ui.basic.Label(L("opts_lowest_lvl").lab1);
				this.tabPages[0].vbox.add(lab);
				
				_bids = [47,48,50,4,5,49,7,8,9,10,11,13,14,15,16,17,18,19,20,21,22,36,37,38,39,40,41,42,43,44,45,46,12,23];
				mb = webfrontend.res.Main.getInstance().buildings;
				for (i=0; i<34; i++) {
					cb = new qx.ui.form.CheckBox(mb[_bids[i]].dn);
					if (LT.options.lowestLevelUpgradeIDs[i] != "")
						cb.setValue(true);
					cb.addListener("click", function() { LT.options.lowestLevelUpgradeIDs[this.i] = this.c.getValue() ? this.b : ""; }, {c:cb, b:_bids[i], i:i});
					cont.add(cb, {column: i%4, row: Math.floor(i/4)});
					cbArray[i]=cb;
				}			
				this.tabPages[0].vbox.add(cont);				
				
				rg.addListener("changeSelection", function() {
					if (this.rg.getSelection()[0].getUserData("id") == 0) {
						for(i=0;i<34;i++) {
							this.cbA[i].setValue(true);
							LT.options.lowestLevelUpgradeIDs[i] = this.b[i];
						}
					} else if (this.rg.getSelection()[0].getUserData("id") == 1) {
						for(i=0;i<34;i++) {
							this.cbA[i].setValue(false);
							LT.options.lowestLevelUpgradeIDs[i] = "";
						}
					}
				}, {rg:rg, b:_bids, cbA:cbArray});

				// ----- Level limits
				lab = new qx.ui.basic.Label(L("opts_lowest_lvl").lab2);
				this.tabPages[0].vbox.add(lab);
				
				gr = new qx.ui.layout.Grid(4, 4);
				gr.setColumnMinWidth(0, 60);
				gr.setColumnMinWidth(2, 60);
				gr.setColumnAlign(0, "right", "middle");
				gr.setColumnAlign(2, "right", "middle");
				cont = new qx.ui.container.Composite(gr);
				bTypesLabels = [ L("opts_lowest_lvl").towers, L("opts_lowest_lvl").military, L("opts_lowest_lvl").resource, L("opts_lowest_lvl").cottage, L("opts_lowest_lvl").barracks, L("opts_lowest_lvl").utilities ];
				for (i=0; i<6; i++) {
					lab = new qx.ui.basic.Label(bTypesLabels[i]);
					cont.add(lab, {row: Math.floor(i/2), column: ((i%2 == 0) ? 0 : 2)});
					sp = new webfrontend.ui.SpinnerInt(0, LT.options.lowestLevelMax[i], 10);
					sp.getChildControl("textfield").setLiveUpdate(true);
					sp.getChildControl("textfield").addListener("changeValue", function() { LT.options.lowestLevelMax[this.i] = parseInt(this.c.getValue()); }, {c:sp, i:i});
					LT.a.setElementModalInput(sp);
					cont.add(sp, {row: Math.floor(i/2), column: ((i%2 == 0) ? 1 : 3)});
				}
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Spacer(0, 10));
}		
				// ----- Page 2
{
				lab = new qx.ui.basic.Label(L("opts_set_hotkeys"));
				this.tabPages[1].vbox.add(lab);
				
				gr = new qx.ui.layout.Grid(5, 5);
				gr.setColumnMinWidth(0, 50);
				gr.setColumnMinWidth(1, 150);
				gr.setColumnMinWidth(2, 50);
				gr.setColumnMinWidth(3, 50);
				gr.setColumnMinWidth(4, 200);
				cont = new qx.ui.container.Composite(gr);
				
				btn_arr = [];

				// ----- Build hotkeys
				lab = new qx.ui.basic.Label(L("opts_hotkey_labels").lab1).set({font: "bold"});
				cont.add(lab, {column: 0, row: 0, colSpan: 3});

				cnt = 1;
				for (var i in window.louTweak.main.lou_building_id) {
					name = mb[window.louTweak.main.lou_building_id[i]].dn;
					hk = LT.options.hotkeys.build[i];
					
					lab  = new qx.ui.basic.Label(name);
					cont.add(lab, {column: 1, row: cnt});
					
					btn = new qx.ui.form.Button(hk).set({appearance: "button-recruiting", font: "bold"});
					btn.addListener("click", function() { LT.a.allowHotKey = false; this.o.btn.setLabel("..."); LT.a.mainContainer.addListenerOnce("keypress", function(e) { this.o.t.setKey(e, this.o); }, {o:this.o}); }, {o:{btn:btn, t:this, prop:i, group:"build"}});
					btn_arr.push({"btn":btn, "group":"build", "prop":i, "hk":hk});
					cont.add(btn, {column: 0, row: cnt});
					cnt++;
				}
				
				// ----- Other hotkeys
				oh = [
					[L("opts_hotkey_labels").lab2, -1, "upgrades"],
					[L("opts_hotkey_labels").upgrade, "upgrade", "upgrades"],
					[L("opts_hotkey_labels").downgrade, "downgrade", "upgrades"],
					[L("opts_hotkey_labels").minister, "minister", "upgrades"],
					[L("opts_hotkey_labels").lab4, -1, "global"],
					[L("opts_hotkey_labels").prev_city, "prevcity", "global"],
					[L("opts_hotkey_labels").next_city, "nextcity", "global"]
				];
				
				for (i=0; i<oh.length; i++) {
					if (oh[i][1] == -1) {
						lab = new qx.ui.basic.Label(oh[i][0]).set({font: "bold"});
						cont.add(lab, {column: 3, row: i, colSpan: 2});
					} else {
						name = oh[i][0];
						hk = LT.options.hotkeys[oh[i][2]][oh[i][1]];
						
						lab  = new qx.ui.basic.Label(name);
						cont.add(lab, {column: 4, row: i});
						
						btn = new qx.ui.form.Button(hk).set({appearance: "button-recruiting", font: "bold"});
						btn.addListener("click", function() { LT.a.allowHotKey = false; this.o.btn.setLabel("..."); LT.a.mainContainer.addListenerOnce("keypress", function(e) { this.o.t.setKey(e, this.o); }, {o:this.o}); }, {o:{btn:btn, t:this, prop:oh[i][1], group:oh[i][2]}});
						btn_arr.push({"btn":btn, "group":oh[i][2], "prop":oh[i][1], "hk":hk});
						cont.add(btn, {column: 3, row: i});
					}
				}
				LT.a.setUserData("btn_arr", btn_arr);
				this.tabPages[1].vbox.add(cont);
				// ----- -----
}				
				// ----- Page 3
{				
				// Color selector
				this.clrSel = new qx.ui.control.ColorPopup();
				this.clrSel.exclude();
				this.clrSel._createColorSelector();
				for (var G in this.clrSel) {
					if (this.clrSel[G] instanceof qx.ui.window.Window) {
						this.clrSel[G].set({ showMaximize: false, showMinimize: false, allowMaximize: false });
						break;
					}
				}
				this.clrSel.addListener("changeValue", function(e) {
					co = e.getData();
					if (co == null) return;

					co = qx.util.ColorUtil.rgbToHexString(qx.util.ColorUtil.stringToRgb(co));
					if (!/#/.test(co)) co = "#" + co;
					t = this.clrSel.getUserData("_type");
					id = this.clrSel.getUserData("_id");
					if (t == "incres")
						LT.options.incResClrs[id] = co;
					else if (t == "chat") {
						LT.options.chatColors[id] = co;
						chat = webfrontend.config.Config.getInstance().getChat();
						prop = ["global", "_a", "not_used", "privatein", "privateout", "social", "LoUWin"];
						if (id != 2)
							chat.channelColors[prop[id]] = co;
						else
							LT.a.chat.BgrLabel.setBackgroundColor(co);
					} else if (t == "minimap") {
						LT.options.miniMapColors[id] = co;
					}
					this.clrSel.getUserData("_btn").setBackgroundColor(co);
				}, this);
				
				this.tabPages[2].page.add(this.clrSel);
				
				// ----- Incres colors
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(3)).set({marginLeft: 50});
				lab = new qx.ui.basic.Label(L("opts_clr_inc_res"));
				this.tabPages[2].vbox.add(lab);
				
				cl = [ "Full:", "High:", "Med:", "Low:" ];
				for (i=0; i<cl.length; i++) {
					lab = new qx.ui.basic.Label(cl[i]);
					cont.add(lab);

					btn = new qx.ui.form.Button().set({width: 20, backgroundColor: LT.options.incResClrs[i], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
					btn.addListener("click", this.setColor, {b:btn, id:i, t:this, type:"incres"});
					cont.add(btn);
					cont.add(new qx.ui.core.Spacer(10));
				}

				this.tabPages[2].vbox.add(cont);
				this.tabPages[2].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));

				// ----- Chat colors
				cont = new qx.ui.container.Composite(new qx.ui.layout.Grid(10,5)).set({marginLeft: 50});
				lab = new qx.ui.basic.Label(L("opts_clr_chat").lab);
				this.tabPages[2].vbox.add(lab);
				
				cl = [
					[L("opts_clr_chat").all, 0, 0],
					[L("opts_clr_chat").alliance, 0, 2],
					[L("opts_clr_chat").background, 0, 4],
					[L("opts_clr_chat").whisper + "1:", 0, 6],
					[L("opts_clr_chat").whisper + "2:", 1, 0],
					[L("opts_clr_chat").social, 1, 2],
					[L("opts_clr_chat").louwin, 1, 4]
				];
				for (i=0; i<cl.length; i++) {
					lab = new qx.ui.basic.Label(cl[i][0]);
					cont.add(lab, {row: cl[i][1], column: cl[i][2]});

					btn = new qx.ui.form.Button().set({width: 20, backgroundColor: LT.options.chatColors[i], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
					btn.addListener("click", this.setColor, {b:btn, id:i, t:this, type:"chat"});
					cont.add(btn, {row: cl[i][1], column: cl[i][2]+1});
				}
				this.tabPages[2].vbox.add(cont);
				this.tabPages[2].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				
				// ----- MiniMap colors
				lab = new qx.ui.basic.Label(L("opts_minimap").clrs_lab);
				this.tabPages[2].vbox.add(lab);
				
				gr = new qx.ui.layout.Grid(5, 5);
				gr.setColumnMinWidth(1, 55);
				gr.setColumnMinWidth(2, 55);
				gr.setColumnMinWidth(3, 55);
				gr.setColumnMinWidth(4, 55);
				gr.setColumnMinWidth(5, 55);
				gr.setColumnMinWidth(6, 55);
				gr.setColumnMinWidth(7, 55);

				cont = new qx.ui.container.Composite(gr);
				cl = [
					[L("opts_minimap").clr_self, 0, 1],
					[L("opts_minimap").clr_alliance, 0, 2],
					[L("opts_minimap").clr_allied, 0, 3],
					[L("opts_minimap").clr_enemy, 0, 4],
					[L("opts_minimap").clr_nap, 0, 5],
					[L("opts_minimap").clr_other, 0, 6],
					[L("opts_minimap").clr_lawless, 0, 7],
					[L("opts_minimap").show_noncastle+":", 1, 0],
					[L("opts_minimap").show_castle+":", 2, 0]
				];

				for (i=0; i<cl.length; i++) {
					lab = new qx.ui.basic.Label(cl[i][0]);
					cont.add(lab, {row: cl[i][1], column: cl[i][2]});
				}
				for (i=0; i<14; i++) {
					btn = new qx.ui.form.Button().set({maxWidth: 20, backgroundColor: LT.options.miniMapColors[(i%7)*2+Math.floor(i/7)], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
					btn.addListener("click", this.setColor, {b:btn, id:(i%7)*2+Math.floor(i/7), t:this, type:"minimap"});
					cont.add(btn, {row: Math.floor(i/7)+1, column: (i%7)+1});
				}
				lab = new qx.ui.basic.Label(L("opts_minimap").clr_moongate);
				cont.add(lab, {row: 4, column: 0});
				lab = new qx.ui.basic.Label(L("opts_minimap").clr_shrine);
				cont.add(lab, {row: 5, column: 0});
				btn = new qx.ui.form.Button().set({maxWidth: 20, backgroundColor: LT.options.miniMapColors[14], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
				btn.addListener("click", this.setColor, {b:btn, id:14, t:this, type:"minimap"});
				cont.add(btn, {row: 4, column: 1});
				btn = new qx.ui.form.Button().set({maxWidth: 20, backgroundColor: LT.options.miniMapColors[16], padding: [5,15,5,15], decorator: new qx.ui.decoration.Single(1, "solid", "#b2956e"), cursor: "pointer"});
				btn.addListener("click", this.setColor, {b:btn, id:16, t:this, type:"minimap"});
				cont.add(btn, {row: 5, column: 1});
				this.tabPages[2].vbox.add(cont);
				// ----- -----
				
				// start:LTT
				//Turbo tab options
				// Enable Auto top-up
				/*cb = new qx.ui.form.CheckBox("Enable Auto top-up");
				cb.setValue(LT.options.enableAutoPilot);
				cb.addListener("click", function() { LT.options.enableAutoPilot = this.getValue() ? true : false; }, cb);
				this.tabPages[3].vbox.add(cb);*/
				
				// Choose to enable/disable specific modules of Turbo
				
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cb = new qx.ui.form.CheckBox(L("auto_switch_cities_enabled"));
				if (LT.options.autoSwitchCities) {
					cb.setValue(true);
				}
				cb.addListener("click", function() { LT.options.autoSwitchCities = this.getValue() ? true : false; }, cb);
				cont.add(cb);
				this.tabPages[3].vbox.add(cont);
				this.tabPages[3].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cityList = new qx.ui.form.SelectBox();
				cont.add(cityList);
				cont.add(new qx.ui.core.Spacer(10));
				
				btn = new qx.ui.form.Button(L("refresh_cities")).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					LT.main.turboUtils.loadAndInitialiseCitiesList();
				}, this);
				cont.add(btn);
				cont.add(new qx.ui.core.Spacer(10));
				
				applyCurrentToAllBtn = new qx.ui.form.Button(L("apply_2all_cities")).set({appearance: "button-text-small"});
				cont.add(applyCurrentToAllBtn);
				cont.add(new qx.ui.core.Spacer(10));
				
				cb = new qx.ui.form.CheckBox(L("default_4all_cities"));
				if (LT.options.useDefaultCityTurboSettings) {
					cb.setValue(true);
				}
				cb.addListener("click", function() { LT.options.useDefaultCityTurboSettings = this.getValue() ? true : false; }, cb);
				cont.add(cb)
				this.tabPages[3].vbox.add(cont);
				
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());			
				cb = new qx.ui.form.CheckBox(L("enbl_autoadd_build"));
				refreshCBArray=new Array();
				refreshCBArray.push(cb);
				this.setupTurboCheckbox(cb,cityList,"autoAddBuildings");
				cont.add(cb);
				
				cb = new qx.ui.form.CheckBox(L("enbl_autoupgrd_build"));				
				refreshCBArray.push(cb);
				this.setupTurboCheckbox(cb,cityList,"autoUpgradeBuildings");
				cont.add(cb);
				this.tabPages[3].vbox.add(cont);

				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cb = new qx.ui.form.CheckBox(L("enbl_autosend_attack"));
				refreshCBArray.push(cb);
				this.setupTurboCheckbox(cb,cityList,"autoSendAttack");
				cont.add(cb);
				
				cb = new qx.ui.form.CheckBox(L("enbl_autopurify"));
				refreshCBArray.push(cb);
				this.setupTurboCheckbox(cb,cityList,"autoPurify");
				cont.add(cb);
				
				// ----- % of max resources to Autopurify 
				cont.add(new qx.ui.core.Spacer(10));
				lab = new qx.ui.basic.Label(L("purify_thrsld")).set({paddingTop: 4});
				cont.add(lab);
				autopurifyThreshold = new webfrontend.ui.SpinnerInt(0, 90, 100);
				autopurifyThreshold.getChildControl("textfield").setLiveUpdate(true);
				autopurifyThreshold.getChildControl("textfield").addListener("changeValue", function() {

					_val = parseInt(this.autopurifyThreshold.getValue());
					LT.main.turboUtils.setCitySpecificTurboProperty("autopurifyThreshold",_val,this.cityList.getSelection()[0].getModel()); 
				}, {autopurifyThreshold:autopurifyThreshold,cityList:cityList});
				LT.a.setElementModalInput(autopurifyThreshold);
				cont.add(autopurifyThreshold);
				
				this.tabPages[3].vbox.add(cont);
				this.tabPages[3].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				
				cityList.addListener("changeSelection", function(){
					LT.main.turboUtils.updateCitySpecificTurboCheckboxes(this.cityList,this.refreshCBArray);
					LT.main.turboUtils.updateAllCitySpecificControls(cityList,autopurifyThreshold);
				},{cityList:cityList,refreshCBArray:refreshCBArray,autopurifyThreshold:autopurifyThreshold});
				
				applyCurrentToAllBtn.addListener("click", function() {
					LT.main.turboUtils.applyCurrentToAll(this.cityList,this.refreshCBArray);
				}, {refreshCBArray:refreshCBArray,cityList:cityList});
				
				// Auto upgrade focus
				try {
					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					lab = new qx.ui.basic.Label(L("autoupgrd_focus"));
					cont.add(lab);
					this.tabPages[3].vbox.add(cont);

					rg = new qx.ui.form.RadioGroup();
					rbs = [ "Cottage", (L("res_wood")), (L("res_stone")), (L("res_iron")), (L("res_food")), (L("bld_military")), (L("bld_barracks")), (L("bld_towers")), (L("upgrd_all_blds_from_gen_tab")) ];

					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					cont.add(new qx.ui.core.Spacer(30));
					for (i=0; i<7; i++) {
						rb = new qx.ui.form.RadioButton(rbs[i]);
						rb.setUserData("id", i);
						rb.setGroup(rg);
						cont.add(rb);
						cont.add(new qx.ui.core.Spacer(10));
					}
					this.tabPages[3].vbox.add(cont);
					
					cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					cont.add(new qx.ui.core.Spacer(30));
					for (i=7; i<rbs.length; i++) {
						rb = new qx.ui.form.RadioButton(rbs[i]);
						rb.setUserData("id", i);
						rb.setGroup(rg);
						cont.add(rb);
						cont.add(new qx.ui.core.Spacer(10));
					}
					this.tabPages[3].vbox.add(cont);
					
					rg.setSelection([rg.getChildren()[LT.options.upgradeFocus]]);
					rg.addListener("changeSelection", function() { LT.debug(LT.options.upgradeFocus + ":" + this.getSelection()[0]); LT.options.upgradeFocus = this.getSelection()[0].getUserData("id"); }, rg);
				} catch (e) {
					LT.debug(e);
				}
				
				// ----- Amount of wait between auto upgrades
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("min_wait_auto_topups")).set({paddingTop: 4});
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.ui.SpinnerInt(1, LT.options.upgradeInterval, 999);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() {
					_val = parseInt(this.getValue());
					//LT.options.upgradeInterval = _val; 
					if (_val <= (LT.options.switchCityInterval - 2)) {
						LT.options.upgradeInterval = _val;
					} else {
						// we dont want to switch windows too fast - the time interval between switchin windows should be more than the interval for
						LT.options.upgradeInterval = ((LT.options.switchCityInterval - 2) < 1 ? 1 : (LT.options.switchCityInterval - 2));
						this.setValue(LT.options.upgradeInterval + "");
					}
				}, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[3].vbox.add(cont);
				
				// ----- Amount of wait before switching cities
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				cont.add(new qx.ui.core.Spacer(20));
				lab = new qx.ui.basic.Label(L("min_wait_switch_city")).set({paddingTop: 4});
				cont.add(lab);
				cont.add(new qx.ui.core.Spacer(10));
				
				sp = new webfrontend.ui.SpinnerInt(1, LT.options.switchCityInterval, 999);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() {
					_val = parseInt(this.getValue());
					if (_val >= (LT.options.upgradeInterval + 2)) {
						LT.options.switchCityInterval = _val;
					} else {
						// we dont want to switch windows too fast - the time interval between switchin windows should be more than the interval for
						LT.options.switchCityInterval = LT.options.upgradeInterval + 2;
						this.setValue(LT.options.switchCityInterval + "");
					}
				}, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[3].vbox.add(cont);

				this.tabPages[3].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				
				gr = new qx.ui.layout.Grid(0, 4);
				cont = new qx.ui.container.Composite(gr);
				lab=new qx.ui.basic.Label(L("notify_msgs"));
				cont.add(lab, {row:0, column:0});
				btn = new qx.ui.form.Button(L("refresh_msgs")).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					LT.main.turboUtils.displayMessages();
				}, this);
				cont.add(btn, {row:0, column:1});
				btn = new qx.ui.form.Button(L("txt_clear")).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					LT.main.turboUtils.clearMessages();
				}, this);
				cont.add(btn, {row:0, column:2});
				this.tabPages[3].vbox.add(cont);

				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				messageDisplay = new qx.ui.basic.Label().set({value:"",rich:true});
				cont.add(messageDisplay);
				this.tabPages[3].vbox.add(cont);

				this.tabPages[3].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// end:LTT
}
								

{

				// ----- Save Button
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
				btn = new qx.ui.form.Button(L("opts").save).set({width: 90, marginLeft: 30});
				btn.addListener("click", this.saveOptions, this);
				cont.add(btn);

				this.expImpWin = this.createExpImpWindow();
				// ----- Export button
				btn = new qx.ui.form.Button(L("opts")['export']).set({appearance: "button-text-small", marginLeft: 280});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['export']);
					this.expImpWin.setUserData("id", 2);
					this.expImpWin.getUserData("lab").setValue(L("opts").export_lab);
					this.expImpWin.getUserData("ta").setValue(qx.lang.Json.stringify(LT.options));
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				
				// ----- Import button
				btn = new qx.ui.form.Button(L("opts")['import']).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['import']);
					this.expImpWin.setUserData("id", 1);
					this.expImpWin.getUserData("lab").setValue(L("opts").import_lab);
					this.expImpWin.getUserData("ta").setValue("");
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				// ----- -----
				
				// ----- Add pages to tabview
				for (i=0; i<this.tabPages.length; i++) {
					this.tabView.add(this.tabPages[i].page);
				}
				
				this.clientArea.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
				this.clientArea.add(cont, {right: 3, bottom: 3, left: 3});
}
			},
			members: {
				tabView: null,
				tabPages: null,
				clrSel: null,
				expImpWin: null,
				// start:LTT
				messageDisplay: null, // sg: this is a new label for showing important messages - it needs to be a member
				cityList: null,
				refreshCBArray: null,
				autopurifyThreshold: null,
				// end:LTT
				setKey: function(e, o) {
					if (LT.a.getCurrentOverlay() != o.t) {
						LT.a.allowHotKey = true;
						return;
					}
					key = e.getKeyIdentifier();
					ch = null;
					cb = null;
					ba = LT.a.getUserData("btn_arr");
					for (i=0; i<ba.length; i++) {
						if (ba[i].group == o.group && ba[i].hk == key)
							ch = ba[i];
						if (ba[i].btn == o.btn)
							cb = ba[i];
					}
					
					if (!/,/.test(key)) {
						if (key != "Delete") {
							if (o.group == "global" && /[BCMEUL]/.test(key)) {// global hotkeys B,C,M,R,U,L,(S,X,[,]), E prior to asscession
								o.btn.setLabel(LT.options.hotkeys[o.group][o.prop]);
								LT.a.allowHotKey = true;
								return;
							}
							if (ch) {
								LT.options.hotkeys[o.group][ch.prop] = "";
								ch.btn.setLabel("");
								ch.hk = "";
							}
							LT.options.hotkeys[o.group][o.prop] = key;
							cb.btn.setLabel(key);
							cb.hk = key;
						} else {
							LT.options.hotkeys[o.group][o.prop] = "";
							cb.btn.setLabel("");
							cb.hk = "";
						}
					}
					LT.a.allowHotKey = true;
				},
				setColor: function() {
					cs = this.t.clrSel;
					cs.setUserData("_id", this.id);
					cs.setUserData("_btn", this.b);
					cs.setUserData("_type", this.type);
					cs.moveTo(100, 50);
					if (this.type == "incres")
						cs.setValue(LT.options.incResClrs[this.id]);
					else if (this.type == "chat")
						cs.setValue(LT.options.chatColors[this.id]);
					else if (this.type == "minimap")
						cs.setValue(LT.options.miniMapColors[this.id]);
					cs.show();
				},
				saveOptions: function() {
					str = qx.lang.Json.stringify(LT.options);
					localStorage.setItem("LT_options", str);
					LT.a.switchOverlay(null);
				},
				createExpImpWindow: function() {
					win = new qx.ui.window.Window("");
					win.setLayout(new qx.ui.layout.VBox(10));
					win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
					win.setWidth(450);
					win.setHeight(200);
					//win.open();
					LT.a.getRoot().add(win, {left:250, top:200});

					lab = new qx.ui.basic.Label("");
					win.add(lab);
					win.setUserData("lab", lab);
					
					ta = new qx.ui.form.TextArea(qx.lang.Json.stringify(LT.options));
					ta.addListener("click", function(){this.selectAllText();});
					win.add(ta, {height: 65});
					win.setUserData("ta", ta);
					btn = new qx.ui.form.Button("OK").set({maxWidth: 50, alignX: "center"});
					btn.addListener("click", function(){
						id = this.getUserData("id");
						if (id == 1) {
							txt = this.getUserData("ta").getValue();
							try {
								obj = qx.lang.Json.parse(txt);
							} catch(e) { obj = "error"; }
							if (typeof obj == "object" && obj != null) {
								LT.options = qx.lang.Json.parse(txt);
								localStorage.setItem("LT_options", txt);
								this.close();
							} else {
								alert(L("opts").import_invalid);
							}
						} else if (id == 2) {
							this.close();
						}
					}, win);
					win.add(btn);
					return win;
				},
				setupTurboCheckbox: function(cb,cityList,property) {
				cb.setModel(property);
				cb.addListener("click", function() {
					LT.main.turboUtils.setCitySpecificTurboProperty(property,this.cb.getValue() ? true : false,this.cityList.getSelection()[0].getModel()); 
					LT.debug("This is for city "+this.cityList.getSelection()[0].getModel());
					LT.debug("checkbox was :" + this.cb.getValue() ? true : false);
					}, {cb:cb,cityList:cityList});
				}
			}
		});
		qx.Class.define("louTweak.overlayObject", {
			extend: webfrontend.vis.Entity,
			statics: {
				img: {
/* remove marker */	"0": "data:image/png;base64,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",
/* woodcutter */	"47": "data:image/png;base64,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",
/* quarry */		"48": "data:image/png;base64,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",
/* farm */			"50": "data:image/png;base64,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",
/* cottage */		"4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAASM0lEQVR4Xu152Y8c13V31a19767eprtn6Vk4XIYjkhYl0pK1xDYiJFaQQDASBAlgw0CAvOQhD99Lvr8gLwGMBEEe4sRxFjuJA0dxbClhZIt2ZFkiJZIzI3KGwxnOxum9u6qra6+6lVM9HM5I8iYnyFNuD6qrq27V+d2z/s4d4iOM/xvk/7Y88rjE5DiAJEmOpv3PyTh6+884+Sc8S//3McHJB67D2z/qez7wCP1jJ/10QEfnCKHj15PROGYq+HxQH6O55I9bBvXzKunonARQJElRiKLo0Wl64fCEginw+bBq4RvuP/r5c8IiRwNkPTqnAAhC6XGEgxoNuKvrmTiOKZoaYUngBAY8cxzH6HgE9EBhHw0WeWwQh+s+0MYjYCOI6d0XX/x0Ril86pPPDLbXzmnoC0+d7ht2DyPABphA9gec8tH5zw7rCBAIfXSORoOGwdAsyyGUCqPoVCcg4cx09flPPms6nnB/5TOffq65V1/ZazkEzfL86CWwniPfheNxWR8NFggenaEDL0EULB0wjYAxqZo++/jsiYmyGg5/faFUqdU2jeHy968+e2ri3ffuLu+2qppIBWEgqfTIrHGcwEiteywIflYjHjccrA9UQadYaMBEpSPVFssyHMeVs/L/e+mTBSLICazRN9jevmp3Xnps6pUfLjdNS2JogSJrWXnHcKVcHgAkCX4YpwfHHzPoHx9lMI5CjWGYA8Wj0TjUF/dLizOh7/e9GIXe+dnqTsccq47/xatv2UHA0rSfkDgmIz/8mEYuD61MJnsIC44Yp288sOYHcx79E7LAASzQE8uycIQLCY5pAAiKSi1IZ3gy4/Tv3naoIOAk3uW4hbmpP//2GziOIxLxiBQQKnAUYmgjTKZ9a2eIMhmNII5w4RhwYbhyXPRPh5UqhGN5GAKfxBgMCpDApCQi8gr9+RMlRZFAgB9HmMSd9uDrV67nJNaNKZ0BWFRG4oVitdXuOsNuSRMykf/uMMlmMimMEbQwCYmYGLnajzMiSX6oeiRp8CMkioIoHCgsOV3KiTx7e2v3dxdnMhx1v95uGJ2PXXxy6/bqK++s6qoQI1KXQUV0ARGtMElcO6Pwu43QSBI7jKrY7ZOSqkqwsCiGAYcPYgLp6EcW7YMAhPgH3YgSz7O0Ios8R/EM/xvPXfjUXPn3nz17c23jm9dWWUmcnZ559eo7/3RtVRJ5nqHzGYkUeE0SbnZs+Pkrl86eG8+v5+aGYTRezT13dnw2NkVJUGRZlEQImoc573D8SN+C28moasAHRurgURj7ztAlsKgq45W8hhJClW++fWd+pqYrolqu/P3Xv7Xa6J7IS4hmQHaWxLYd7vjOU7UCxokTRtfv7c6Q9JlxnVaUjmdfPDfZWusFNM1zXOAHURSHIaCJjwcmdeRMo8PIu+mD5J2iIyCUMMsxY9WJYql2sQQZYA95XkXhBn4QxORXXn4N42BWYyiW6w6cAoeskKB5qlRQhkHS8/x2q00R8XxeGJ+s2HGUy8mbHuNzhTgKPc/HGEdRasyDOPigb8GlUdZEcArgRsoiMI5hYnGsBIEXx8EYZ358ouY7AmjeCqIZmv7il/8RnInGiYnpOV2laFCHatY7Opg9IX0cTNfKMcaWFzE8XR8YicB8525HmzwdxzYIg5h+WDDoKAjw8aSK3q8tkjqs/QlBMiydy+V8L+A45nxZ/8KlRXAzmuVs237w4MGf/fU3xvMKRxIBJujIG9pDimEEVZ2YmU2QeOd+y3DCd9Z3r6/t7e02+44dIebKu/vDIGZoPo4fKunAIOiovh1q6zjTGKmKpOhE1+UoTDI5XpEZRAkvnD/9mYmibfUH5uB2vXfl5pqc0X7x8un+7lZ9SEgsk4hKxHNiHJ+q6hQv/skrD0JaIr2AV4VJXRBkvu3F37m2r7AhS9EAKAxDWG0YBlEYYPCqkXhQRxQd+laqnGOkLMYwjfC9ECGKQQKOqN96+twFhXn5zeUrS2v/sLStLl6SmeG2K0QEBZ4EEW4GuIdJjiKSIJwYr3j28PUeoUdmWWXy+QxSJC+Or/W5Srlg9zuiqCYU59iu67me58U4DvwIP0z9R/yRBix4xCCBFLFcmsCjKNELYqGgBh6aUqX65t1Xt/b1mZNnnlwQWtHnP/e517/amnl84c3Xvp0vFnOBJ6nabrfv4mSyoG/e3wUZi1GnVFUpWJgmh47/+loLXKI34HKaGDHcYDCwnSEETBDGnuvjJGJYhL335XoEEMmHiYoC9Q4HjqzS+YIIV0SJtuhkJWZmz0xDimlvrz02TiSxB2qtzcxcOFl8fXvATs4z3nB2vKLRaOj79XqjN3SnyppPkMVy6cJM+d+WduV8kWbFsi7utFzLARP6qshCeEJimJyoQp0AW/EClDPqeIJI/f/AsYB1jEIQ+S4xNTk5MD3fTR+ermR+7///YeJ3//Sv/qPx3vczbJCr1Jrb60/8wotv3t68PD9e391PSEZgObWQQQzV6Lvz0xP7nc6VJh3BuxJCo+yl7T7ieJ5MCrrA8+AuSa1a6Pf7oBY+jaTUer4fPjTiISMD8MmhzlLlbW/vEZiamVchcBgEcYAwxmPlPF89XUfxra98aarAa9H2k8889Xf/+u1fm59yBt2h7fc8FMZxJa8EPPfKaidfRKAbkQjvDbmxiazZ6RHY6zRDhMjKWD4OvbMzJdBuuz/ca8TgaQiBs+LUiMdLIjXKVxxUGYqNImpiOt/vELsbfRZb3/jjP/AGbS9CoR/IyPvES7+DcrU/+uLX3nn1q9jev7nbzut5rZhjIq+oK42Q+Mvv3kE41LQMQ+JNX8xUxnN5DQzT6Biu52gC4ogwr0m6wj82M/aJj0/NzxVEgRvFYwoJoUOuBx/IT4UxKFaQ4ROGBgVSmQw1u6B6cTIxf3Hpzv7zZ6SLVV+MLUmUqgVN1lRl+kxYOvPqjdXlfeNEKbcwN7llhks9YBBhNquCO+6YIWJYwhvCmqHkq1kJagCkB1lgJYnRciwvIo6k87KSVXkKPeT7FBwAYEaT5k/Xkgg5lhsFiSjI4GgnT54oVTizi7sRu7JyR6P88swpkyw3ttZ0lRsYnRvrvalylsEBz1K7Aatj7+26fX3A8IEhS0KnbZoRlx/LBmZ/viKub9ZBqDW0SyJzopZTVZmB3A9ao5AbRJKseyE2TcfzfUCWOj/HUpLMONYwlxd9D5MIBnHyzLSeFxr1PstSY1Vtenphq2G9fX0t6t1XZPZe3e3Xm4uTnC4iqlhRGerU4oWv/ft3fU6Ju418Mb+7vTuUxqpgOIbI5dSO5Xk2WM+uKOhEJUuxFLi9pikcJwzDoGP4W7vtVr/jp4UyJMnDUo0xCetTVDoMY4blShNc7SRvmV6pqNNEVsvReb0SOJ5SGW947Np6gwuNybLcDLSYVtnemqTIpfHJ1Vs3QtfLasLq+nbAyZysigxDIgwWCAIbEcGEgmYqGqswIi/kcrrIi6LIm+DqbOR52LTtZsPAeEQ/D8IwlxPnTum+Q5QYQIc5gTXbCYPgNk/pUCOI7fu7KIkwJxc5nD8x/cTli1euXDX2li+dm2NztVvXb9ntpqqIkpp7e2nj5MKCj/3EHWQYcbcDKdMWqOh0SYAUDW/MKFlEMqIoCwyj6hmH9Lv3nG7HSfCIVRH4IQ0EbweOkrYzFBL4VMGJy+hSpZStQlwWpPGddTefy8+fmHtunKSk7KXLZ7/8pb+JfW/85Ol/+cHdq28sTVb1UrUY++6trS5RmKrVqrzIZUrFroMGpinR+GxV0XMixSCaoDmaKxYLPCdQNO+TQyT5EfYFmQFkKbmPMcZJWqoFgY3B3XqOJgFj5JUSjdy8M3DGymPW0MAUQyHE8lyr3Vq5/laj2efRBTIKL4/jNsE/9+yTAadtNOq33trrWohSFYagh45j9ge6onU77aJMLtSyekmJwxiHWFVUWVYh9EWBjzHZa7oEUngUGd1OrsATVNhqhIDroKXEk3OZcqWIErYwQffqUITohcWzEKUQtu9eX9GUxKPuy7J86ekXfMeTRLK+33r6fMWKaFGWPCHP2d1zi/Mtww1wMq3gVqtTzI5h2syKYVWkM7oUxZHAitmsLmtK320DZaJozrQDgZO6AytEDsnGmxudVsvCOE0QD3PX7oaxubzPsRHp02oGLZw62Wpu9Q2jlM8/cW6aCI2k6ze3N7718t+Wp/XTZ8/5nm8OnInpmWJef6rglmcmnn/uaZYD05MYseXK5IP6lr/XKCaoWNQty6Ywo2lZJw7vP3jAERmGlhzgy6SBUZApM6wUNfcNsCCRHGOnoK1snh+bUy0Dj02wE4WT67c3Z+cnkiBee+e7xaz4/LnFJMZxhG3d2li/t/rmtYunpzcb6PwpzWzXb7y9ZJkWn+AojEiak2Xt3sZqniNn8iov8gTNqEo+UygyafckFEsztj3sGZ6PDWCl4cDADGpvxUYvMPru+5rnUlnO6ILC5ubPZMiEzFAlSZZJMiirSJOFnmloqoqDBKTCCFwX8optuxDc++Fw7uzjJOZ+ePU/x8Zyr7+zOlEu3rqxPKZzkwWlmFertZkYKZKeNfYbjt1TVRX4DMszA8MQIQ0VdDZD39tq3Ly1c+3mtjl0OZ4EfvDQt2SFn57Lihyby7OBQ9YqMzv1TYHwRQroIqYR7bsBxCkY3bEdWVGAC0myxHGshKj99sat5aXaibnFxWmU0KvrywuT5dNzk9lcNleYMq1gdX1nenZh4967jAC5MimPTzqWxzKQonWCidsdf+V2Y+XuPiNSc6cy5y+V23XHtn1qxKvYoelXSgoZMJ5LAxfMs6ioyhk1E8UY9Af+ybKsa7sQjxjHMOBnnGBVU/mYURiFYMidVvut712bLKlnz83zsq7ny/UHD6CYgnpazVVFFhUOqm3W9AxVFzFtY4rglfGlO/fWtzqW7Z04o8oKs3VvsLdtwPspcjRqs3q5WiwVTnIkEQaNnMADTwWyjWCkewiMbduQisB8NKQbRAE2YG2wAJcMX/jVz967fUcSM4Ohff7CE02zETDOD964o+bKkFMYGrMkU6hIzY41iA3EorbT4OlZwyCvfv97d9eBOPYZHqo4fXupvbuVYkprIsi9/MzU5MRc4FCtvQclDZUU1Q3imCAhEiHNhKHv+wEkYIYFXbpgU1EQUgLEkATkXRzcWbttOe5+3QwTn5Ssc09NWINkv+5bQ7/VNh03FBQGU5yL/TihMees37burG7rNdsYOPsPrDBMBqa7t9O3h0D68QGjH7XaFNFr9HmczJR1lqJs18c4GZFGDhjuiPKMdvHgCRyD20ZhTBJYyEggcujyUnZqaeVuvdN7/PLFX37h89/857c27m+5jt9sdjtdq903+5a9u9eLk7jZsPfux62G4/ru3ffMrY0eSC+NaZ1OH6GkUJFdO8IxxgALZPIUNz2WL+lKghMviFLpGAOF5jkujPw4jsC7wXAwFfQUREEawCzTM4NhJG3tG1deu2pY7vTsPMtwnUZva2N3YEJlShwgq4bhB34YRrDKbsfa3zPGx6vAe+cXVaDjU3NKe9/d3m4GQdrt97vuATUFbdGyyFXymiryUZyAblJiz1GKyJMkCgKfJEiK4SKMIDOouhRHievaQcS4KIlZHmz09o337KGNyejG8rWxhoYYcdAPgsglaM+PPIYmQCIrULbtwPtplnrjB2+Bgd54zVY1pTp24jd/++lbK9dWlnbiCPd7HizgoG+ldE2qFDIcy/hhBIkXLkK1EsF+AhOGGJys2TVanX7MxViKoLeJSonZjUqF/F5je3333tC28hmJl9DetmlbXmRHA9PCSewPk9Q5EI5DSHhgGfiLbcvHGHMssCzumWcu9cw9YJert/c6reFwmO6RPNrqpVFKH0LLdiDx0xQFBAl8y/FDCGwSIT+IPMAbR1A3ODJLcomxRJY0cmV5wyE9lqDHK1mz71oDN6MqiMSlSZFla5sb91kWY4JptftgyoNtNTDQQYsFcIFWvPzyKzg+RDE6vH8jKSEdL4xBwxSKaGx5gCcC/7ZsH8qWIANUBPTSlfwWMrrbsdvubYp8s93qGTbiqH7ftKwA1KJK/MmFfKPb6zyo16amtve2u90hpJg0snDa58FxBIIwTPOn/NcKYPlB2LccgWMg5B0/sBw/jmK4EcWYokkvoCiSIhI0HNJrN7quE1h2yn7BA2DCo1XCFNcPb93cDyMMgnv99wAQTDiSEyfERxn/BUlHFZZ+00uOAAAAAElFTkSuQmCC",
/* marketplace */	"5": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAATo0lEQVR4Xu14aZBc5Xnu2fel92V6uqdn61k1mxgkJCEbYTDCxoKAwdjGJnYcJ46Xik2MHadSweWUAzE45SUFpAobs9ggIVAMkkHIEpYQ2qXRaLSMZullpnt673P67GsOKVc5Fdvlyq26/3h/nN5Onfr63Z4FeDfei/fivXgv3ov3AgT/xA0IgmzbuiEU5AmCAL27/38HBEEwDPsCBMUg/+MQMEFgLEeSJI5hCIzAt9x6s3juW1r9zNyFU7/c/dTD37rrE3e9b3iom6KI/3MK/lSGQASF+/o6PnfLpO7ve/ix/wAA17EdliVhFJzYzCgSsLKoKZIjS/rupx+Ziq+R674EWLrVOqeX9oGO48bvbLuJMyf2Hzly5LkXD5bXKpZl/+lE/PEMgSiGrF8X+cEPv/HPN68fvuMz/NzlHR+9LZEI33J3atNNnTfsiAEOFutkbvm4f8O22Fe/9oVh9yzSud01my7oaFf2u4LlSAodyERD3Lae+uc//bFIxD+0Lonj2P/jsbzqDPRFf/SDbz722KPEiij5uupH34lu33YDS2zatkVtMZoEVHIuw6KFBfXsISNCT9w/TaDJzViwx3VBef5NqVpWWjKAD4IIBhhtV1J/+ORLXb1sTyZy3313f+2BL/X2JZOpCEXhwB8K+Pe/4n1MIMh+ZOtYeKFC3XRD89Dh2Ee2l3e9ErltO1Cvj3OSr3c6n1uzTZfEOMsACdwXALDXn927FhpxHDCMSNr8HgDEHNviN37eBqzWsZ/MqendL71SE5S+3qHvP/q93t7reV88l7vAMAQAuJpquO4fzxYEQ+neyPY7M9s/nqSj2ALslh5/uusz92Wf+GnnZz/d/MkT2+772JZPfSUlZ4PhxMb1U4lo10DvQCKWBhia7UpXr154aecLn9vxqSf//dSRAwvNwDYJoJzqIozRjz75kqUbN97wwcce+eHSspUraCOjN/78+V1btmyORHwURfzRlscwpH8oPDjBdaTRZl3Xy3wq3JWEwSAT7di8wVd8O/OBj5799QtPv5K/IijdYYQOh4I+v6RotoOOhigDWD5/aLbVclcBkJZE2AJG776XCwbFI/vt7omzMzPfePCBzVuuO3K02GpDJIFt2cCxLHn8dPvMmRf/9ZFHiquNP5Atn5/e9qHBkdFELBXKXjJrq2AoGWUR9LmzSzKNjNErTnL67/7663/18NF975woInnH1LPL9cvzuVK5Sdtyyk9idiKzYXTLR6amrqU/9oUNA3786uW339iz68rCapi2fvaznyZS/Tt3X1ktSRCg3LiVokl9z6tXWBa5fGWhbyg8fX2cINDfZcsr3PBkMBBgg3zqvsG+/UfOaWkaCpin32neMTnRoPHjV2d9ZkxaWKw6thhw103iTYzfkEdWhebY9Nihd7LpvuDdn/zksV3PZXwcCKEA5DbqtXK+yk87wJI461WoFvUl1rl4/9i64a4kvWGaE0V77+sr3d2hA2+9cHLf8wZPO65km3C51Lp6qe44LtLdF0glO8Jdmg/i/Z+6/7atOfHkudri/O23R0lS9WXYjW7nPx062x3yZVKhS9cEqDeW44pwplRyKZe6YhgGGOjZIITMM5px5cJsEkRiAQ7F0EBHEK+R5WYpmBPIDHTixJuCWVCFSx/6zgOXLjeOnShv2dz1zM9/vHvXni2DkSrolEpCOI7GknyjalQrItyTCbE+nOLtOMCpuw4ikSC/8ZrI+7Zs2/7p/unb4j3bXzyWhehWtCverCmZRVFr1qqKCrGMQ2OSC1NEiAXZel4snM8NDG9putRCXS9Wm3K72myVm6bR0vSNE9fUpJXRda4mgfteP2UBoanJ4L888tDre16mWY4hoGxRuPEuivHDUgsUqrYkKeD1N3cPjMZrJWXbzXen4snqL/dpVxc7BpI33XMNzPhg3P7ygy9ArhXg/bn8/FKxPjC53iWIxeyiKmOpVDKTyXAsq4PI8tWrm66dqFWbDMMs5/IXLp+F0CaKuD4QnehLR+ik5mvOnjl5bJYZXzf2+t49NKl3B8MCzJqqzEU5yoeBqALD0MqSmltuwLripnrRUh4b0hvtt8+Htm6K3X5rfN1wIpmBKBZiU8//51tzl85JQnt4Q09R1As1tbBa7e/r7+/LjI2PIyii6zpK0pZu8CwHAqCmadX6aqVcQ2EfT3XoELIm1TMsFWc6iw11YhQSylWKMYci0Sv5MuoD+651QTsSSWCk32w1dRiBSwUR4f00TjCxDj111/1mPld7463Vp56F1ieMWwcBjoVRmGiW2yC3bip2ZqFiYUiAZgN8fHhwHEMRnz9MEFhxJTcyMfnKcq5QyKIY3RZbF2YvD4+MDGT6Tcs2Ta1WKx5cyG82zK3DY2+evzQ26DeOa20b2nzrDgU/AdR6w0Fg3TR+8ngznLBn33YoGkMsy5QEvd4wxVd3YqMbex78IgAAPQyJcwwII6YDt9DXYmGikHMBh+tOhIOBeKwjgWGkrqmW3q63HZzyHzh4oC21w8GembMny+WVdaOjCELAoEc6fIFgqF5PlMKp104dHqiWeyLR1/cdtnk9PTgaD8NC61pfvx/E24WFHA4GuJDoj7YbFRjuTIVT/UitZOsGSuRXlDcPN+euxCiDRURAWDRLJ/bsPlE1HVV1g8EA7mWa5yiSCwd5mmVYlm+pwME1+v4PbbxSkGYL/rCfRDEQR4He7nQoGgFBWGrLAAwiIBSJd9p+uVjJu/wgH+oJBTKmRVu23RJabauGQrSsr2Gkd6tSLthwz6C/b4SulNyecPJAsSX7OQSBSJ5rGG5eInefNeeOH/FqB+MUhqH9/RkYxqPxaLFUrlQqfCDym2b8s9uS5eIqhdlnTx4lN947HidqlWyqM4mhRLPR8Pn9FEWLohDwh+UGjJHrt3/4L8bG+yuVYr1W0w3HBU2p5Zo6gMCgolgLczIIQrAHgmoLgwE8FYyBtP9GUmnOnPzBzoMvvXxw769+wwmrsC7XHIpj2f6+PgzDOd5vOS5B4AzDkb50nkj3uBVVFjRFGh1JExMbgqY6P3uKZ+h4PAbDmKpKwLs47FqW0dER/cIX79M0PZe3kqnRkeHR8Ylrh0evD4Unfv3mr0zHwBhTbOmWAcLDYx3j77dbZRNzGRxnbKFu6FZfmGd5loWtjR++/VfHZ3l/EMEwv8/P+/hAIESThAM47XYrkU7TNLfrjNgS5YLoOt0TUzyxOveOowmxWMywDB/PtSWRZlhRFCGEQcgRBAGHBwMTY1RHB+O1XSjI0JT9+PcfAi0x1IXCpFjKGgyDwkNjcUdjqzm4M5EK+3hNKAquWVQUX1fPJx/4LhHaPLVx++rqBbHVJEmG4zlFkSOxmGWanZ2dVy+dYUDprvcN9XQmpkZ7+2nr4Gu/WM2eff/1N1iWk0qm1splimIt0+J5/v4/v5Pn8AsXKidPlRYWZVlFQYjQdPihh75Wyi4ZICg0Zb0NRDu9jtKQekUzDYv0kRs2b2xW86bvGm/MCN+oi6QvLkqbNnIf2NYbi3/vmacfaQsrrut2dKay2WVvwgAHGB6ZXCsuvbrzR6VKG6eKuQV34/TU9I23Yzji9Y2iqDTDyLIUi8ZFNTUzW5sYC/b2IIqMKRqoqd7DnG//43ePHDk5nPA3DYfGwGiKxGgQXULg6a0xGHVwOKpXW5eKsZoSUEyGwLV1Q77xsb65S8WDh5c9pnrPR3cs5QQYFHVFgRE01dWFEwSGY5Zjh4JRhsRigbFr10/HwrFyuUhSVKvV9IpumbYkSZ+47550Fzczu3bs2NpqUQEAAkYgw4L/7dHvHN37HBULxkh0TZHTqZhD5wDI0CUc0hWkfxwjEAykWbv85nj/uxzs9AXtscdPvPjy0aGBwL13Dnlr/dXXZ77ylb+c3nKvbpg4iqysFKvlSltoN8oixwQS8V6OYwAQdAAQweBauUFirqiqhWLBVloP/O1XHUe/c0fPn93RPzraRTOs46CP/+iJM689RXMgBuGirsW6KRgFOajPVBHAAb0FwbeqIEYYruvz4ZjpomG/m04H4mFUUdqLWUEUjfVjbCxKv3Fg8cAbL1KkVa9VMRRlWK9AysDwgGWaGIbKkqxomqGqOKBOb566MeOKS4cLWhSFPfStPrvzqd2vHlxbKRRWFs7NHN/z8tPn9j8Dw3AdCHAc7U+ihmr42S4+YsiyJokWTJP05HUdlZJJ4ZyfJEHGv7iUUwXZF+3gGAxFDJRg5y6pew8cfOnn3/FZa6qDEgSNoAiMkd5F1wxZUWstgaFQFqhObtyyIanwjWP01Gcjbq5RvLws8CvZU8J1bmJVe3Zm/xuHD5DFVaexprZbVSjAsjxJMpnRWLHQ4nnWwYRiVjFUF/zgXQk2CMgN1iOmHNYBSC4W4MnSQrYO7J3JUwFCa7UcXZAgpW+rL5VlRTIc5Ph4JBaPxUmeI0maZLg0stw7vYOp7rPEYmDrP7Qv7LTWzvFbHwSlfHZm3y/2HZrPMRWxSEzwScF39eS5UCRybKnmD0dtyxkZG8KZVnGl1dvTGR3M5bKN80dcpFEGOnvYdhmEEA0Li0ZDXSguJS0s08GWy2ZXf+Q81nBsGlvhOQE3dJUEGjlBaMua4ZhptAcCrDuGKkx8Ul16xjtH++xP2of+nrn2b5zUtH7hxw42MG9PnVuZXZg9lYqGmBl9Rb6i2WZb1dlAuFptjA4OcX49X6wF+V4YhjCcLi4JjbICZ0bD/iAlNxBVsH0RrSpXaHcUD9JLywshf6iLJa4JDjVXFVoB9EoVh7AlwLBVxDAUmvGZuoHhRHHu6PhEP0SGzMvPU2MfR0IZI7sHbFcOXYl8/dtP/PiVnVml2g2hOIYEWGq13mpYeIglCg19ZHiwozPoQhJH9pGs6u/QlxbWYFxbuqTCvI9OpjiUcEyZCZIZQPele/pcGzYQPoBYlmYkO+O/PvA2bCuGA3F9o/KyDtMoR1HJri5BaLIcmy9r5ZWLU+OdaPctenZve3Fu72niyw/vevLVF9doI9jjoxGIVuw2y4AhzMK858bFVh1jQpwv6IKGKuOhIG0omI2tXj7XNNq4aTgw78f8QXr1KoQQjmuBnZ2xtUoNxzCGYWHXPn5xeTwdOX9pXrHce774DVVzsrWFRDzJB0M0QQ4OjyiKbNYKlUjo5Z37+MqVF/YL33zuyC9O7lvRBH+S3xSKBouytdp0IKSuoI6F+IJ+grRNBGCJqN9HGg6USkSL5SoXkbmIoVlCKevUKm1ElmxBVCJ9cKtA2gGhWMEYv5pfK/UkxhySiUQDh1v5oovzPDd/aeb46VOT45MhX1y1LJ7jIBiCCEaTVEyVz7L46uHC6nzB+XCcP00PIXzMQoq5iqbpLggquslGEAiE1JYdjIZ7khmKBDXNQl1VEOusz9ahtSsX1yAXb7WkcknwskUMTfjVJmYAkiS6qbRPbZHBDgui12DSrZdKC/Pm9DVT45sCdEeDdhPdqQwIOwHOIyw+qS1pssqjxoZguAfgHAYwWuoEHeoUXKXRrgii7QKmqftTrEUh6QwWiNChEB0IopBLyIYKAwBGq5LSTAyJ1bKa6EWzl63KiiG0JJBhiKHxjsmNYV8EWJyzVUmLBCIEjQb8aCHfglyWxf3eUMi2jiFsKBjS2gpCIAgKe1loNlvJVKeptxeOH+7wMxxNvXr4RKVS9lpbN22ORwMjbKEAGxJJsxzHINFQQLd0GMN03SJwTHPljiRRyJdkSR/bhM7NrFk6NvOOkF9eg+MpzrbdsU3UwlytWbNAyGUYXBCF1ZV2lE94R6Q4xTJdnvFzNN8WBBu2QABsNkXbatsWvFi4yFP0+VwWRR3XsmtNEQdMDHfY7qCEkmLTk/v+RKIzEouwHMrQjKpbHMsiuJ4cryxnF1QZTnSjMCHNnq5UVuDcvGTqligoIEHiWz+Ytk2M96OhGORpD9tVUScS6kCWLkpTW/00Zx3dL0aowd7BAGBjLmC4Bq3IMoIRgKugEVEqyxQXqLcEUBbnT5dbTovl+yEIiUbDIAKyJAojkAWKGC2Vs1C42ygtO5lR9tzp/MRm0kRWD+2EKBZmeGjmaKNZVyHYEYV36wuUV1R/CE8PkowfWJw1bB3PTCI2uqw2mMmNHWdOrACulR6gbfYigLRBXJi/uNLVH3BcUVNA2AwQBANBWqS/DVNQNm+kEuM93elUKo7jII67LgCnh6BKs1CvqjDsEqw5uLlx6ULBtvViXmuULblJ+MPgqbeaQkvGCFBu67btgN6xrrspMTjSoalaYVGyDFBXgXQ/pymQKpuZcXJ5Xg5HyViKluu2brajMZak6Gi/fviXzaGxsNxEuRBIsPbpt1d00ZdJj9CdRVkwxDoEw3AoKWsqgnBr5bwtlGiGRwJJ9fzRNs0i+QVdlVyxpWcmaJyyC1ft7LzA+hBZcFotEUQQ+AM7MmurTakJtAVdVQ2GxREMVCWgI8WAAGQY9roNPpo3Fs6AHENhGMIHoWZL6xvwtQRZka3eEbS1hpmOnOhza0XYFyLmzlUHB7tspFleIAHELGbbEGJLAuiJtmbZxkkoEIVra2Yx37QdyzRt2Cs5iv7Wf/tvAw70Ck8QqK5ZjuM6joOisJdD7ycIgrz3MAxiGMb5Ce8j6EIkhWIojpNoNMqDsG5qKEGSDgATBOLYqmXLpgHhNFwtWoE4WilW+SC6umTJsh7u1FcW7XpFsSzr3RqBgO29OL+1AP+XW+6d7L8AxsjtzArsf8wAAAAASUVORK5CYII=",
/* iron mine */		"49": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAR60lEQVR4Xu1ZWYwl51Wufbu13X3p9fYyPdNte2Y8Y4/xzNixnXhie2KcOEoIWIGHJAoICQnxwCPLEw8IkCIhBCgIGQkhBRKkEJI4IVFi4uA4Gc/Sc3vce/fd696qurXvnLrds08WEl6Q+Kfm9r1V/3/+s/3nfOcU8n9//P9A//cpordpJknyP1mYfsCS22xhGAbkHrjHrY2S8X8UPfxy+BRNv8dxdHs2ht0iFATBbTqHc8d/7xrpvZQBLOUp8NMlxI+TGGbA55hKkjIDV/othh/x+BEGF44dCAb34Nl43S0VpRQOpB2vP2BmTHesmMOFqTzo4ZzkUNq72IL5d/IEI47jn2CFlF4YkjRD4ESSRLDJwVxYdZO7+EAcbPyR8pAgURQeCDw2EQ6f6eMEGe92W4v4ISs3xy1ufka3iKOIIIgx1eRANnSsxUOyB5RTnR1KDua+QxFjsVGEJEmWZUG1URTB7repYzfHz+fj9/glMMrQNEVRNE0zDMPC4NjHzz8rSNKP82BYAjPhE37exRaO4+ma/6UBe9AMDWrgMpwoi1OzM7/x27/34U9++uSZs8DsT90Iv8kWCuOWh/3iA2wRhREMIMjz3NGVR1TdsV03CMPqZF3OyWh6TkOY9ZOoAFtw/Rzbg45/qolL5ezHf/1T51/88NMXP3rmmQ8+fOb8iXPvXzl99omnn2VZBjR6v/NgN4Ub++zPMLDUD1CWpfJ56cjS3EOPHBNF/icLnMsJJJ8Xs3nfcxEMF7NFOHucXJQTlaZoEIykKIIk4cst/oifhRWKpmZmpnlBLBXFQqE6suwAThHKuK7nud5zT+e/9o3/smzngarKyuLS8knXAZZ8NiNwGcEyDQyVQAeDZptnSc/3k9Ti4Z0Z4l7tsQwFPN9jpvpU8dwzH2CyE3qcu3SjqVhIhPFeEAVhFMYJxcknTiyR5L0SEgROUWRtojy5eNK2NQxLpFzR8z3LHDEclyGCkW4RsQeqCsPwVqR8AFtwev7i93/nDz7ziaW5KYYBmgRHg37xyA8zhEPQNIYEpeoEL8kgIkGCWzAsl/FxYW9zGyYvr8xNThXLlZwk8aKQkQQBjZNisRBi9NTsPMtLrm2BD0zMLuAki/gmS+EkkbAsf79v3eWwWUk6MVNhKZL2nOmJKp5ECEbEYfDcoysZNgiEBRIGRQErELeBOY7neVGkxdKRjHHx+Rc++5EPnZgsTovcbk81TMdxXBxLjh9/AuNlpd+F4GXoKpxNcKwgDKzdd0s5xnCCNBHQgmOZP5atarlwopplM/wHnj1blASt0zHD+GOvvDAjsXvt9fLy+3CCAEUD25AxWF6gWQ7cNZOtZhmn96MfXL58yQoSmiRYhjm2OOu4DoejH/vdP1R6XZCmWKl5rpOKQbNo4ruta+ABFIaCADTHg3P5nv9gtsBix/KZiYna1k7T0tUrm7sXzz0GwaW918zmcc3FxcljNMNlRFGWBCpxvGHT7m5GyrXAHHS7mh9j7zvz6PZe8zc/+xkO8YdDzXC969/9xuyR+ZASgWA2X4TzPlR6gd4edXfAT8DxY4rrD3XfC4Kx1z/gJEKOCnyHIVBLH/SVgetHttJSDEfVzNxk1etcN5ROt7ljat3AC2w3qJVESA3FHO+GWJbntQC5trra6fY//zefn19cqItkZWUJ3IbafosU6A62wFYmlX5HzpV0ZZXAMT+IZZ7pdgzTdHw/uC9u3Q7NYUTzjfUtpd9zvQDO63v73aGqq27QH5pTRYLxdo/XMysL5fbQc0L01RdPv/z8o6dOLMgsDaGCCOxup9PUbUHI9Dau5QXetozlxbnr693EdfrvfPF7//inVncH9hkpHbA+iNTRHDdGQVH3Rrt7QqXjB912s6NZAaQNJOl4CCYw5Vnhu5e2JVlYWqgtLdbKBYljiKV6DmaYtj8yvZbt7Q5HkP05QSRjd/fG9ZaiwfXLr7wslye4wJpdOnr89KNEZA7W3iS3/10d6jGKw4GyLRcPIAgmPwk0ryzOnp+rKMrg6IlTvutMZbl31q8/embesNxuZwARoT/QWJrWDUPM0PW52W6vN1AdiLFxFA90d3E6m2YLlDJUA/KhTGeoMLYCz7WR088e/9xf/tPjJ+e+/p0r1VrJ0IwETUALlhsqhtcd2j8pQBybquKWfuLxM0a/laUSBkcuXd22knh2djqXz6qGB5su1ou1aiWblXTDLpXy87OVgeZVCny1lBPFzPX3OrPTJZ6nsnmpWOFJkYBzG1ExhlFXr65ZXkAkUaGYg9gbIxhNIOBetp+Ayu8NxXdim6OL9SxDab2mrmsrE/VvrbY/cOGFr7351n++81UEjedmqj1FS6IoiCmajFs9fXNniCQp8LQtoIv5UUiT+NuXd4FUpQDRlLrw9HI+S2YYTMK0T7/2zJfeuNL2EcH1MRzMZ3EcK7O44jAIYjxYW5CMcrJ4aqoIqUZV+hkKo3ITH3vt17TO3pvfe/vJemW+Urn6XhMl8evramO9ZdqhollH5qpad1RfrNJB8uJjjxQZwrQdkqYAyezsaUiEf/v7a2EUIBhLYfFAHXFIcObk3NxMqaeMANY6ptM3fAyJVdN7sMtDojn96Mn2/u7ifB0ycTabPwmmHPS+8+3/kASukhVQkmIIDLKKIAnPvPDK9MxkfbJ45cqeGyVhEM4XJEAor7z0/MUnTuQIspjnF2RmMDJkgVtdH642mgKD5STOdALfD1k0lFlyZAWlSi4v0BmelaXMg40IELcyNUHJLIPGMk2ceuqZvcbljqICtsfRhKIZRVEB1jEMGVvU6saWKBUSXJ5aLgtYTCOeZRuG5fzzv/4bqCoN1rYNSJn3ooemanuWEbvRpiW/e32X88IjJGK4semGRYmGAw+H0bDMcjkHMcJ2/FtHEr/JFl4qZl944vTuzo7v+6PthjXSFFULXNf0AznDrnc03bDkghAR0vSRlbQKwVA/jBTHV0NcI8UemnH5kstkqeIELVexbI2kmd7eTm2mdGJ5skk+FDHy9hDZ7FiTfNhW9IEZZjkC8mZxek7VNQQB+bEwBLrJbW1BHFKam74yPWjtZtLyAEcp0u6rUVqaIgPdInH4EkGKEORcgmBBEIDybNsCXwyDAMdQcGED/CUMxrgbC3zPM/pc4Bcs59K7a7K0u96kF0+eufH2t2vVqh0iGzvXQg7wPjVQW2HoHRSSBIlFXnybLd8Ldd0h0IQGgJIWpgRGkLbrxwkKAVh3PUi6IIWi6AuLJd22aJrBCZymazhBAn5C0vI1Td7WSE/vjFQUvJWl1UE7dIoxyS8vlr70xldbG+8+drQ8sEqrG21B4vEogNQ+0BycQF3fj5EYRe92eRAQx3CISwxFAFsAPkgGfCMO4iSMUc10OAJyAKbq3uNPPjU7tyjIWXA4MDfNMjTLJzFC0nTgAchzaJouVielXMFzLFFgd1oKGjmjkQ05gGIFHsIxEu22VMe0EJISOTIrsJ4bAnFiXHrd5fJBmPhBBBAgwpnEt3CaBD79MPY8z3FDgMMTMg+rophc39zSh4OMIEJwKpSrQChfwjVlAKoCnjhBAsqmrgITrulMyiQYoSBXm12d5XM8LwECFUXuydOLq41dy7BQknQdNy1u4oggyDhKHCS4M24hGZY+Up+G0BJ4tml5HI039jrV+tJvfeqTy9NVACmq44sT9QsffQ3BSIbjAZwDHgTnM7UhUAQnDDxfysqZjJAtVUD3rcY7OY4GfGtHERZHhVrl7Lnzo+42TmCdrrrd0koFYaDaflpYxzjcxdEwjFwvus0WuJMksIs5EY8B8KPPXXyZY9mvvXVpJp/5+pe/rPU7uu3W85lLqw1FaW3daLS3rgpSYdBry9kcAGcOkKqQBXcC9J6ME21zYxXxdTBB/aFTZy9+fG9/D4uD3v5m5DnnH1t859o+qGdfRwK2TLIiFljjBkUCzuz70W0jgi0okgS39vyAICmEEX547Tu52vSHPvLqP7z+OrgRgSR9TWUo/MILF+Rcfmd7R+31CTfc+ME395odDvczuUqMEQhKTs7O4zRvjnQEcCuVTC/Mi7wwV5/e2NgKiZLlNH/U6JTLWWH5/adrFVsb/ujtd4ajPdCP74Mfx3f5VtobQtAMSw2GNp0Ef/vXfwVa/eiZlR9+5Qu2bUNCnS4IShQxKAKGazQaCwvz6mhECfzjT59/NpOxXc+17PZ+03BdgY0SEtCkgeKkZwe8nB0Oe5cuXT1y7Mj5l17Lirzthps3VgvV2ut/9/eW54L9qpV8FPnXN5QwuJuttJUDkhKAwzPGsC8wpCTww05TzBWCrZ7u+wtlzI1A02nbCvL/xsbG0aWlP/mjPzZGo2y5FrnWK5/4lWavf+zYYrFYhJDNCkLgmpodRgja3FjT9VGrN1q/sVYulxzbkfL5z/3Zn3thmFbVCIgqkjjueT2IhnexBQdnbrIEnjnotss82zQcGtFHqERxGCBWSPiWlzBgZCS5em0VfCfD80NNxTFidn4JwmdHU48eWei3mpVKxTBMOZ+HCQNzFFA8iqGxZ9IZwQnQTqcNYWCoqmAZP/AZhgX3SSvgILINFXDzA9Cp6RgOHMIo7FuODkk1RHoDjRgjHsvxdxTD8uOQofVhH7D32vXVbqsFmpByOVPrT0lou9nkBQEsDisgQ0JKGA2VGNaO1K2d/TBKcsVKhmVbe01tqFq2Q7FsFISubYNUKI4JADIw9AEwEDIlADMfTUrV4ihGNGMEwJ/0nZYb0gLLZJm5xUW5mM0QBkgWE7JpWDSJ2p3NR45OuUQewrzng1mCrY0dxzY331uv8Nj5X3p8SWZnc9lzDx29sbVLcILtOL1ul8tkWvv70TiuS3R0flkybWt7T73VpUTvbPRyDFWvyb/60tO+ZWckfmPzPYTl0QStz00NOgGcE5zHG/tgMavA2Ag/gXNyRuAbjQ0MJ+GQgq5FPnPusSNf+MrbSwV6rjbJseLcYv3Nr3xxEJDxoN1k85M1Gfc1h5u63tgqiYTrWZ+4eOqNN775vcuD/tACHiBb3wuawyg+vpSXxKIUhOub3VA12bIkSUTPREAxmq+t7TRVw5+pZHWssLG+ruxv7qxvRL69MD8zVy7MFyUSs3vK8Mba5pmTK8ePHms2rrSU4f7ufuI7cNi3u8rCsboRkFdWt/zAfeXFpzw/wiJte3fEULTjBkHaEruLrcPudKtnURlpoljctEcxjxWrVI7G/+UbDfCr3ghZbWybYAXVLFDa2TOzp5dnzp1eOvPw8kIVloiGaV26tg5hbKZWmJqa6qxebaytXbj4cr0+A7ZDCPq1D55v7bW3oaDwh0+dAMjPN9Y2XQ+Zq9H9oYpimOOEXhDeMuJhd/sgQAPELsjsqYdLEHAZIirVqq1uoJo+pAsoIuaK7Px8oZITojCJ/ARDIppiLzc2l+emvDAZmbYk8hIN1s3v7O1+660fvvrS8+re5lqzD+dDM20cCSvHazk60T1kbTe2zdHDs/m95nvKyHNsZL9r6oZ75+sCNBlHVAj1HEfDXYYmMhBTsBg0cXxlvhflMW90bLGmDzo0STe2OjnwRBwIKQxLR6EvioAAkIIkRxg52B66fdVOiKadXDhWiRNsaLmXt5sgORzUJ8+utNqtrmYRhAApqK+oXVWP4ghFCeDJsrw7onycgL5wCERkalZg0PFSqAfRbmD6N7Z7BK3mBLK9F/YVG4XnCUhCjIIgm8tDQF+clpyov9719/ojjhEkuaz71EgZfPjZswQStne3OprRtoNHTi4DbLp2o72z3x23az2GpqI0PjCu64ag//hB5euYMwB3RNpwSoDRhGUBzKVACG7mBIaC8AgSu/5sOQcZiSJQBAsTJEAxM0ADXfM8lMETtprNixKP4gRrhrZpQ3D6/m5/YnpCFpgbGzsD1UhdO073goQRjn08TPsiCfg8hKV7jHjY7AedgSkBZsRRfPBOBGhQFA4Rj6ZShcIUCFGmHRA4muWZGAMf89KOOomRGAWCZDgWzp1rhbViHqUJfWDv93XPcQgsMW0vAD5SL4YBCrv13iSGJcAtGPEmW/e8rAFWxtq6BVwP3xaht84GpPZD0qDIMdFUKGy8D5gEPkESuA7eFsVRSgOH9bA2PqSLPuiVVIIcdpb/GyHF+HMDaTmxAAAAAElFTkSuQmCC",
/* sawmill */		"7": "data:image/png;base64,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",
/* mill */			"8": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAQAElEQVR4Xu1ZeWwc53Wf+9rZnb2Xu1ySy0sSKUqULIoSLUqWLMmnZFeKjyoqgsKNbNVG2qBwXeQ/p0DtFEUDAy1qoGhhtHZr2E6cFm3i2E0TWbYsyRIVXaTE5bVccrlL7n3NffTNMiITwZLtWn+0QB6Xs7Mz337fb37v/hb5/ye/ld8KQRAYhv1fQYOiKBxDIf/3Xjze0RG9w7P7AgLDUF8WUNDn3jfccVd/1yvfP/7okw97g8H/3eqfQTLH0o/sG3j60N6uaDP+hbWA49jh+7r+/Hhnh1/f0mG889Z7H19asBDtzsAKBYQj9w+yaD0Qaz10cG+T3/lFZhGczPPHevdtZacSJRRDmz3E7j72rjBWK9buDKy6qFy8PvW1rz/FIvI3vvlUb0eH383efoomP//XL/R1B/H5pMxSeNBNoRQRcePD65SA24HcKXHy7NGHtpz52esv/enjzz6+a/fGNorAb2VMm9eH/uG7Ay8/1/v9P17/d8/3vXys5y+f6Xn52YFXnt/26gv9zz2xDpR7Z2yrWpP+86Nrf//K3168Ou6Pxfbsf3hjp/8zMe0fjn73Wx1S1SapJDoQC3WwFEXThmkaOlwhu8P4xm7fnYEFUq6KPz17bevgA12x1m07B0KeoNfJ/PoAiiSOHF7z7adbZuIVRUNQy+xqxWQ8gGAkTVEsjeuqUq4iVRnfu8UDg+8MLJCFbOX1N970eaL/8earFEd0hr1AzwqmP/r9NY/ew4+dL2AoTlooXCnlxfYWhHaHTBwDmIDV1KVcDV/TyjQHuTsGC2QssfAXL77kCPUefvyR+x4+IPA04HK7uGcPtTQTyqkPCxfHJYYm/EE/73C4PByKYizHaKhPNTDTMhXdQk3pv0ZqqSXxTsLSDWM0k2cthOcdvetaYyF3MOA5NBxs4qxrGTWe4RQVvXS9SOE6SbNO3lXMK066pplYoc4W6oYOwQwzPvplXtX0hi02EsAXE/z2t1VVn5xNRhzIj3/yb1uHdiDykmbKeREfW/T0D+6iva3FfCabK/o9vFhXMJJZytVMC6nV6rpa0xHz3Hh9eq5iWRZmC4425A7AgllqorKQzj/9zB+u627WRfHklcXxhNQcjW4c2LqhfyC1WCsVC/lcDqecqiLXFKxQKLKszvDNssaJpplIFmAekiRx3F7rq8KC79sPiNuPWJEUSq96PQ5FzM9msijJUJi2NHrywrmTFKLXFdzQ6pJUFmWVYsnOzjZRJoqq8eQ3n4sE/BOTiViQUQxEA1PDbE2uzA8sfmlY+A0hSQIniORiAakulWq1e/cMj8ZTW3Y+QJm13/vaLq+LnxgdtXDFYr07du6XyoVA26auTcOzidTO7YPpyatoNYkqJRkRarKK3pBlU8NwBMPgzH6hXwgWipAEiRP2H8CiKArF8bKobV3fHWry05glEd73Pzz7o5+etxCLEkKHHn2EQrFQW8+6DVsNzWApNJu49u/vvNXR07/57j0nLiaXsmVNN4F+FAE09oukEIpGSRIlSISwVdJAat0aFgwBTCA2VRRJ0xTD0CzHyqppmiqhVShLrJhkcjG3rj344HCvWElvHNwRCftJRK1mUyOnf7GQXjh09Ln03PTw3oOVbDE3m1kErjQFnBtCGkEgBIUAIAyzwA2sBhZbv6h9BMXCBfwmQARhI4IjEAXvNiaWphmKZkiWo1jLyqYSblp3kmbUS0QdSt+OfdGAu5BJVCrFqfj1prbuoeE9U/F4RVROjky8/voPT1+6lCxWyrWKpokYbiGoqWkqTiBwArENFoUDQIFXg7HGufmbsIgVIeEPMNmAKMr+AEYQcDsFlmrrjhom/tiBPbgmOjmqUpeTBXlqPP7Qgd9RJPnEJ+df+8H7l6dS/33q/Fg8TWLGxHS6VCoxLEaQwIZlmApBmQRl4aBKYMgmDFs2m2WIhmEjI1Z4WrbuhvPBP8xi3zJ0I9wSiPqdqKHUy+Xd+/dVcykG9yykZq9cnzlxKb2+Xx8a7F9k/ce+81fFpZyH5yJMtddDEE7lrOWcmC9YiGbZHDCyDHaqMBygwWBh017ehDxl25vVoO4GplXbAizAEYAH7HDu4JhowLW2zbdjc7ubwbu72u/Zc09LxLM0N6nqxtTUnMvNxpNV0SJGxxfOXZwoZAsRj6NQKEQE5J4YyhP6uQVspkLiqIIRBgQZtxPpjLJgVbKmEyRgsckBKFbDD3Ud0VRE10zTsEwbVoOtG05rybIMJyzL9IRb9+3bgpi1A08eO/n+24LL9eEHP3rg8NeTibnmJv/UQu79c3Nbujt7W4uJIrKQq8K8tZrGsAJL6j1roj/4aEomnZpa4TlEt0iWMg7vYnrDVkXn/vE9oySpyy4H9m4YlqZYhoE2yGuY/wosECBW1w2rIZIkZ8Uay7t8HPXPf/Pi5u07p6bn9u5/+MfvvhVP5uLvnTMQpDvIVCVFoNm2CKmo9apCUiznEISggL7683Qd9XOURRKmqlE+gehqtfIVrX0r1xYmzo8RP7usAm0NtoAkQIEhJpACJ7YPLAu+4oDg/cthF47VupzOLLWv3bp79/D1i+eTydm3f3LifDx7fXJR1QzLsLwc0d+/OZ8vdMWaIs3Nk4mk2+s3DLOuGAzvYkjKQZhVVWdIZLCFeHCgT6lgxZra4TFzFWtszlJ0HTCpCvBDYChlAB4Q+2gDWFUiXDPA3m6IKMpjk6kTp07FR/EPT1+cSVWAz0aYoMD+cAIMkPL5ox6PZ3z0XL2ajfpdZ8fjfo8fs1CvW0Btzi2fE1ikNrTSilSZTJXmy0irSwMEgpPOz2vw9BQNt+AdB50ChgZVNm0rSlyhb1U0Tfvg56dZlgaIYJgkjnE8A45J0VRzKOCPMb4mfzVn+ppie/feqxkayl34eGQMQ8mFbJbnXdu6XJkq2xsyWppDn4ylEiU9xnFzRWU6A4RgDMu4XRTjFFKJmlxXUIQwDH05SKyyZYEYN2dNksJBFEUD70AxBHiCSMZy8I6TNalqUhxLSYCRFU59cnrwrp6d/R3T8XhOwgmKlkxkoSxPp4uDEb4m62cmcjWLLMrm+JKRLoET4H92xEEQRrysGm3IG+9hKJCMoF8oVWuqDqEe/ADH0Egk1NffFXOFBB8bbjeDveHFSXxPf+fpkau5XGHb9rvffftNweX43SNHE4lkuVzHlVKbU+oW1KG+tl9cq/xytgI6K0vIUlldquIvHHF84z7WRaLdvJE3VKVOzKTkhgeYVkNuV502DM4eEQ4HAx2shBdKaHq2uDA5UVTnGU4uguPePbBp7ZqO2eRC3+atO3bdX86l9g71tUc80YAQEPjHH9gxsah/cq0ccfsVySyWlMUyHg0QB4cYjMXDAZJzYh7C6uswOR5hWJThsJViDLtN8w5BvyUWcno4izJUrF5HC0FXvTPixzTN73fznONqfKIKVamizi5K777zL2dPn7py4czG3k7c4fvXj3Pf+acLb5wpqKpB4wRNUmDKJE30tDKFjIIQqMsFUQuhMUzR1PYo521yhVr8kFp+A9bNOz4NSr1BYfv2Hm8TqxminC8ZmsrytM/F0TQRCgnzqYlsNm9YmNsndLdHp7JaNBLZ9+DBHUMDDFLf0NtekTFTN1FY2ERxBHUKnMfLQDxYyOq5tLw0Jy3lNMiTcBfUIlbrgotbgbEaTgHHb3SCNNkSDXI8v5i8hNXAj+l1ne6An0bKWDjgncksaGTZHVR0cv7atFTMizRPXRmfKVWr2cVUtEkoTxddHke5LNEM43LymXKOphAKUq5uSTIiJTUVQ3NVRDUw0AsvUFZWnRidU2TV4WAURcdvVb+63I5YNBAvzQmU4eQcO4fChx5oZx3uK1eyLb5WEiUuT01FQl6/NzSdSDy0Y9/W/i2RaNfopfOPHf2DQDDUGm2ey6RSi+Vd/T2xcOB6MkEwCE/a5YuDJsIetCgjyRwCAbUmolcn5EymLolaI7CDjRi3hOUJcoxA6Ui1u9U5tNHbFvEqIjE+URdFhae8Tgfj572zi7PgrGJBGbkw8dqbPxz59AR0G10dLaauwNWxS9d2Du8OegXFMHNyFjHrXa2Uk6coBJlIWedmkIUCki9h81l0dkGu13WI/I3Cy471twwQ4RZ/e7errxlpEsi1LZyp48mUmcnJ8WvZNTzKgIkUqhxCjI4mxZpKOV3VfLI/aHT6iVIdOTFy/fxkHuWannri4KeXxjwep4OmJas2sIbqjaDhIB5fMjECWxPCGY4gaVY1uUxWghhJ3jD5W27FNIU8loYyNME7CESSFROXZHTkwsKONe371zdfGJ3uEsjL89VNXbG+WPO5qQVDKQ624OBKfGCDNxBDLczJMoNbNkFmCQYDPi8X4iYiXojwRNWkuwLomjY05AV3R9NFfGyqCkiqVQkipWXLrWFBNioXpWLJhBHpAkZRRhNv9MZ0Pya+dyHz1NFHzp69emYmh5Es9GJXZ2fCXjxTp0eXcMmg5haL84v5dK64VFi6d+cQy1JXr098eOa6h8eDboyzFALDZREbSWAjo/LZK8s9EQGBRtN0AAUpn/hMN4R72WwJniUYUBBKrWn0yGWzGqBiEVPE0LzuSFy8kqhUTUJcqhRU3BPxYk8MNEdbonVVfu2D6azI1MS6hahnLmYWCzN+j29yZhTFzHjKqlfEimhmi1WSJNMFvT1gMbhBkdRcWlpuNACxYai366odHApde7lotLdjKmKMJ+hEATt5voJR8qfzc+lq2bJ0fwDH8Npdsdj6DdsD0V4Mg1SdVoyK04cbiM6wipOTPj03paiwpN31lmQ6XSKmklp8VpZkLLmEEw7XfLpWLEJY1oAnSHef0+xD7tE0C9Rdr+q2UlEq2CIKHtQf1SfHVZff8oTQYlHvWe9sEloigYjgDYAeypWKw0+JWlVUCrKiY5QVaaNKJT3UjNVqer1m0qS2uFijIY5hNO+gvT7HYrosScqvRwN8pa+HqzfDMu2Xolh2IiIQy5SvXq7ihFnLsR3dVmpehcs8Rxbyxlwanc9KTSEfjZmGJqWz9SvXCjVJnBpX4ZFY3m6yqhV1bl5SDDk5J6XTEklRHMsm57Lzc/kVTDfDwgmcpukGlJsLLxgP8aRQMApFQwfyEDTchGRSKkPBCa0qJM8zXk+9VNBDHjeJW4qsWbolCNTEtC6r9dZO4sJp2cMT6ZTGUpiTw/I5DR5VljUExWVwcdNYrh0+e8eBYZjbbKfAHYfDbun8fuKeXc6etcy2Qcddm7h1ax3PHg9/69mePzk+9NQTd0NyPLhv22svHfve848efWynz+vGcXR9L7tuLdPRTnvcOEWhKxNSFAlyq0VX+0Tk1mLPQtrfh8zf3k7jGOgdaWxNYB0dkc7O5kg4uGF9d2d7y+MHdr3wzOFjR+7/9vEDjx4YZBgahoWCsDzi9QqA46Z1v9BvNSv92Zf4QSXoabS+pN/ndrtdHrcguJzwkecd8JGiqJWRYCcr9Nxe/gd+7OWQwfysuwAAAABJRU5ErkJggg==",
/* hideout */		"9": "data:image/png;base64,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",
/* stonemason */	"10": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAVD0lEQVR4Xn1ZZ4wc53meXndne99re41HHknxyKNYxCLKdkBbhmMgCSKXxI4N2IB/BAgQIECcf/mVP4EBJ/kTJ0hiILATJ3FixUWOJEumRKpQR/I6r2677TuzMzu95J3du6MkW/5ub8q338z3fm953uf9FmUY1vNcaJ7noQjiIXAe/H9EQ1H0fdfDkehwPBw/NADDUATFEM89HI14GNwicAH93vFA/zwYCM+6jqdrJuEN2pMp4XD4ml8jHDrohGEfmP6jF+C/wHPhYngNT7xvOg/DsEORDsXH/AGIA4NxnMCP5/jAoge9RxJ8pMKGwqJHw4+/eiL6sQkGhyORjiYZtuEQ1z+B2WzbxrFBg15ow5egGHo41WE7WjfygR6/DXoOZx12PhnxxNDvnxv+hs8jHzTIUHy4cAeNGF5B13Ckd/iPDCYaOA7qr+D9Chi+YCAUNujDvOFof5h3pIPj84dshx55xpEKB+ZDjtxjIAxCHOv0gwbx27DvWCZoT+w1FAz9oO3wY/c/Fu5QoKFmDyc6DqljZSNHY44aMVziB9YHBva84VwfHO2hoJjDr7BjUw4iDjsytHcUm+5xRA91MHjbBwx3rKEP9QzEQtyhtHA3dDIM2uFQ79ixhheDoPElgxGDNjwhBE4MvjxGCliY6zruUFUg03DuX4s7v9p5bMShSbAh0gyXNbTP8F1Hujlu2DCkh50gKA5tcAR9DqRxx3MZzjLe3a+67vGSPqyY3yAiceTixw8PVQIdw+shxh5OP5AAUO9QndBJkiR0EgSJ4wOEHKykkIh84cqZv/znFzmSNBzHduAdjjfEgEH7KLXBeofSEE/A50i494sxuB0uFARCfQF8tRCgFLgf3KCBgGAYJlwjKGCON8oTX3924S/+5cdTyVhVkioGQmG4haKO4/hY6bofLRjE8qEr43A8jiaQY3j2bTIQAR8cCRIaRVEkTdMkTbIsLQgCxzLQOJ4bfIdxHEdjyPWI96lzs9/67zsxlhNoRKBQy0P6Dvji0EE/DLkflSrwAaogIMdQLhxDfWFAEl8cAmQBUUAg+Oc4BgTieQ4+NBOAZwM8jbkWDOW5oGs6nwibZ+bn/+7Fe1GOCeOOZiEciU6wbtOwPbA16mMbzACYAxMNUXKIN78q27GSQENDl4db3zogCsxHgWQ0hfudGE1zDEOSA52B6ARJGYZKwFdwiXoLbvvU5PR3fv6O47iog9GEx1AeTpFZgV/arW66BMijKJauG45txxLJ+bPXXUd9+aX/Ad87hvFjJzsMsWEAgjFgWgJHGZoKBPgAT4WEoBAKBoVAPBaNRLlgkAkLfCQSTiRS6cxoAPTGBednZm9gYi6T/9ZP3+r11SSLsYxPFWBtc1FuryFNZNOLKSEG7/P1zTIcm8+mnl2YBb3huK+Rw4Tnn460dRRN0BDC9yaSYSgCdTlQCUkxAT4SizEUA5YGnfja8lUFFuZNow+ZPs4SqfJSfmru3356l6BJ23bARgmOqoj9ySA2EQsgNLXZ1nicUCy76+KRWLSumbH8FBPO/ceLL9VLKygyjAOXojHL8jEO1IWCV4FYIPXAcFQ8loDYxzFbCIVjibGgEPZciST5Znc1wucEIQxPBoIB8DvL0kOGWOiVUyPTf/X9lzTUBXvOx0MujoqyzOKY6pKLaZqhaYalbccLYM5yXTZtt9G3ggSqejjKB1mGeOnh+oEIMOLgJOI4nmN70MCNIM4IEI4ehBhDE+FwJJefpChc1xTU6Rr9uiHWYUAgEAZVcRwPCCWK3bxSORsk9Ujun374quRZUZKajQRdCtdUjScJxXRkA6VwpyybIRLjAYhIyjFtmOLS7BjL0ZRr2Xof1dWteo8iaM2xh9AxBHMcZAKPYjlGEEIhgY+CD0XCLAshTVI0mUzEPOA/pJ+gYqm0EAxCUAiutWjXF8481bKI73z/J2GaDJB0hsNbpunaToIBQoAzNClqNsexp6PksmhEGKba6RVNJB2L/Hx9JxsOFpIxHYLDNpc1Rvds8DEftAbcD8gBDi4IrgUYRIObB/lMdnRk7CyGGuDxjmPGYglIJdFYUhAiOEqiZDDc2X8K1ybPXFrer333Ry/zFFY2tQQABYbVFX1mNK0bhofjuu0URQ2DmSj6dD4RJlCboGyGbWjGlEB2waxd2bLs+5Vui0wxpAtigR0HCdRnFIRpGiRBEwQCtstmCwRuKNI2GBTibrwwLondYDDKsDzDMoYhxiorC/mx1zaLf/PKXwtx/NaFy6vrjwOII4LvkISEI6aLRmPhvU4/H49XJM3AfWQOCYHdhhhmObkutnX98pmxt6tNDnHKmt60SZpDeC5gGJgDre/4+QMaJFYKMJKPBHgW8frJZNZ1MNOwaTKUzkxmMplwNG7qfcc0wGskyfjz7/1r2Vi6ciV06XzqcfedE4VRhud12yIR5BQLCjFM055LRQ4U/TEoKxJew0LffViuGW4yKlwZj39yZkS17Xaj14Z85dgmI+AYaCQghMBpwWQUwwAkouAETCwWHZuYEIRAKMThBBaPx37vc18cn57S1A6CQRxwG5vbjVoNZ9iJ8yfHZ56iSKQvg5+6o9nQO+tbZ8fm7lcqc5n0dCZRFvtRIVDRnDKb08QGIPHE9Fwik7b5yEur2x1Zr7SlVJQtH3QXJkcf1XoNKmIZWoCjQFO2BfBiwRnHBzkREkssGp0YzwvBKEGg2VyewJxmtRgKhldWlteWV+SeXCqWzp49ISt6tVRn+axNjzOhGbknBXn9zmrxU6cXul15PJ+KBtn7pd4KHk7Ewp1GjQuEZVUnb3/ZMRSrXpp6+rqIsculVqnTF1VrsyV7bBAWHw7zpmVFIhEAIFFUVFX3AaJQGMuPZCD2SQK7cfPaiz98EdLfwwcrb775xuTMqRu3nn30cGV7a3Ph4lUuGE0ls/fuLzkH/1ncWdtp8NnCZVmqbld2n790rWfqr+60tOwUR5Cuqir9LseyAk8nHDmbjO+urQIB72DM7NQMHYrIONsxXMcyMM8kSfC/0K3nbn3lq19ZW107qFZwgKxsbuTC4jMzs5OpTK7TaVYqB3vbe62uRHP04sWLd37xqiRJMzPTr/3i9e3tvWwmVizu5gpnIpyo9tUcv5k58bv5wvRrj7brleYKEYE05clyvbkLEYmRuG6auOdWtrZ0TQX35eXXkVDaUa1YPLFfKl25dDaTTq+uridTyZF8fn+/9ItXXtV0FYDCOz0//6U/+kKjVvIcfW15FUz8O7//uWrtPbWvzJ06t76yhmDE2Pjo+tpKOCSsrG1AsMwIazVjxCLTT01i+7uPO1okkcu8tdeAJMm6drtTVvvG2Ph4YWIceqZnZxYXFyHnt1stVdyJo1ZZQiyMOndqanb2RKPRBDhsN5uNlvjW3bdqjTpJuTjM9M1v/lm7safKMizIMOxGo8EJfKfdqNY2V5d2ERS/fO3ivTuvTUzNAMECcNnfK0YFFLMaHJ9tNauyGw1Ec9l0Znl1G7FdXW05Diz1VCQUvH37NgT7f/3gB1efufGDf/8eSegnTt/o2Gx+tMCyZL3RIjCM41nbtsRez/WcntSTJAUoBn5h8fyNK6ciAochdq3W6Pf7kIzgolI8uHzttucRoPkH790/vXAxlUr2uqKhg1laHh6iUSEuoB2lOzc1ajoBRTWL1Qrm9YH5njw5t3jhfHF//8HS0sP7d6cKiWpxPZvkeJ9C0QxFK6rY7XbLpS3Ag1QqtVfc43nac1FZUeSeYpoO4bn29n5te/MxwGsoxAcCDFAiz7KmZk4G+XBx947jWKpqnDo5+979JRdxu53a/Gw2HxuLs4PEhVNv39+IjITDIRI4z8FB9+LFizdv3FD6+r27905O5kZykQiLJmMhGrCHDpXqNcVRs6nRsOUkIjzwwFqtmEwkEMSquQ2g/UNqiJtmn6dYmFvTLbEr1+pt0AY4vqoppf1yMBRWZBWo6+rDlZVHj5r1+kiWPTE6BaQ0CCQZRTk+kk0kddMgKG5ldeXs+adOz5+NRcPf/vbfZhNoKkblI8HRxHg0GEIJFEA0l0oV0jmShSwSAYYi93sx0EWQM01T08x2U1SUPiiI4AL2G2+9G4sIlmkBvvKCW5heLJyY2Frf3tx6PDaaJOgeQ8dr7c3CbDjJZBLBOI96dCgIa6KAM9pmKhENUqpu9j5/bQ7BXPFg++133yGw/snR1NX5eSDMigWp0QISO5JIIhilYxTLUQhF7WztThXSEKmqrlNkkCa14/oeCwTIsQnuzLmzY+M5PmzPP3X10qVzuItNT84snDm3t31wUOsihDZ/amFq5DJww267i5KUZzs+r3RNoAtAC20XiQbpXDI2NZL8zOnkN25NvvDZzwaihWicw/hgODsdO3HFiZ/cLTXBNeVOmyYCoJtTJ096Jjo7d/HM/CXQPEm6BI6RhF9VELaFtiCt66scjxq6d/rMOaDYkXBofXNn5dHKzOzcV7/+NaCMrXbbMgypVREfP9D6CsX7pYKN+OWIZliJmM9obdOwIJu6BsGQ1yb5asQsGUzDDKCW+8b/fh/IYDKWIFw3wFJip8JG06FwkuVCr7/2crncgnTsmg5JkUArXM/FDQ0DdsRx6OLi9ZOnLwA1NQ1td2d3e2O9K3e+8Sd/ith6u7rPUqgidriAsPJ4d3T+HJ+bXV95kBIg6RF9RQ7ynOVgPEXmUyHHwYQAK/flH2+/uVfEAXMKE2Offv75cDiqaNraxhbPoxbO9hXptV8uV8s1pWfFYxRwhlKxBuxSlBQQixhWhRxPXr15E0jjzvrG3//DP2bygUQqmczkLENfXnq73em22yKkCFCMr7mOAll9r0eFFTHNRblQqKcoUfA2mpZMlPGsVkcEZY7SBerMqV7PXF1bbbU6L7/yf4VCYa/eSozmELEPMT8zkVRUxTBMIMOPHj7KjORbXdH1GwJejo0W0M//wdc8Q9vf2a4ddF74wy8VZk5ghL27vQ+UMZpKx1LZ8amZaDxerVQ/+fzz5WJl5dEqSVbjkTEaB4RxCAqzLIcicN3xSS+QHLmvYy7x5uNfLi8vdcXq/XeXadolCBolNCCzwKpZNpBMT0idrmno9YNyPJYan54+qDZqBwc28PpEioglSSHYYMjs7v7+M89+XO7WSJxg6cD09ORBpRqNhpLprKmKkHNAwzMnplr1Vigcqbf3Y+mwouuxmcvLe6thClyVBGYGoCNbfgnNE2iC4TMjQLSoZCwgsATudaeTScay2UDQtJx2W7ENmeeAYBr7+9W7d94olYqA1r5Ypg7xSOayuVKxkszylIODd4U5imdwYEKJRGJvd39rYzM/NrK9sdWVyucXr+KYK0vS9t5Srb6teVKztZxNTOKoFiQYiiSVvoYAKySIbr+vWXY2EI5TfBSnMkIoK0RcC4DFRV2bIFnXtRkCd0Bdal9WZDhLUk83LL8KIiAgEQSuWDZiWGWBS9OcsLt/sLG512w21zZ2gP+0m+1mvVmtVcZGpiqVaq+nLD16/dqNzzx363PdBn5QVkhE5mxS7Vt900FQRzetWCjCMSSHeYrWV2FCFLWAt1o2jWN+feyAZA7cejhtO6btWgYAn6YBD9QN03FdIDZ+4UrTqGNTLlBDT5clTdGRp69ff/RgaXRy+tzCIlBnSP4LT89lR06gCHbv3iuxpHr+wvO7W5uMvykQeG9pNRWhHEoAJmNDhGN+zWfaCJTkALmW5fEExbAM4hDtZm+11LUCGUKuA7p7iIu7IJSpqyoYb/AB3u1jr1/ug4zZPJkfSVjeDspgFy8t0CTaqDWh0K/s7Zb29y5dv5kfOYkjNkXi4yMnqnvEQaUCQQDJFVwhnqYCkEFIBvKsg2K26ZZFHfQmGo6G0TiKBTmOAFFJ2uTCRDS/tVuS2AzRLbMYAogX4uhcIhoLcixNkcOtKj5AZPLsrY//9u3bX0wk51792YOr124Qnr2ystlqVLhQs1kzOmL5Y7c/rUmi64BvlirlSl+1yqV3DV1st+Rub3NsLAjFrdGzCYo1+kB6LZRiuoquKXJHMTXV7Gs2woWXHx9wmBGOhTP5ibYoLa3vjgccghMogoScA1EPWaivGYpm4I6DxBPo9LTA0tl2vVKtLzcbq6Jc2th8FE7IrZoai4+xLDeWz6piS9WMt+6+0+vJsJ5gKJoZZXRDzWdSnsV7XsiXwzZ0BItkpyygISiOBlKuIVkITlAUUAG5vPagasSdruUZHhNhcGJ1Y8PoyclUHPgBinmuh2maoZmG71m3nvutfGZsde11hKwQlMrySF+vXTj7iW6rnx6xOtIeMPJcZqxUrjWa3VatIkQxlCo+97EXguzI5sZ7XKhTb8qW4gFHAOeF5CN3JARoomlKYg/FMNeB2CNs8GycKTW6k2efAWZOY7hcL54cjb76XmlqphDiWXBsx7I0yxJlnzQjLtpqdff7erPTaUkSuIojdRwP656evyi300y40WlYAO+NA4llvfXN4pXrz3p2pFosl0rrBNcCQuuqrKWYFMEwGMqgBIW6NPiyB28yDcOyTRMiwPNcuOd4vrn2hsXkK8t3MwnhR/c2r82PNEQREmUfQtW1wOKq6msL0TUrk6NuXX+BIthSqea5CPD/6RMzy2t3SOagJ5nhUGRnbwkjpUa78cUv/3E6nevW645ltqRVmjMU0RVbpmV6qG0BMwEezNN0gGUd12FxjCZJ1gczBRZGkxRHQ+Q59b4zEqY6Uu/pubwESGnpHkoCIzHcPqCE5dMT3I/EdJYtljaKpaKqmZcvf+rGjRcCzGh1F6nU1ijOLBarWxu9gOAJfILC+Dfv/Lgt7qr2tuepnaYG8Sy1bcNALMe1QTeGCTpSQQoPMSwrwDJA0oGucBTp2FYfIXWcLB+U5X5/LJXY7xpQG6IU1RCbGE7ZnqeoDmRJfPg7CKhXkQ2KRsYnYjdvfl5q1gH/apXK1s5WpQQQrNsmLBIz7G61tt7pVZvNVk/STQeYI14rOl3Qlo+Cdl83REVry2pdVCUZlm6KsgYzGI4DiA8hpqlqp9sFStRVjMfVttiVSm2p3esbumPYpqrYlmFDMA5+GsGB++L+h8PjcWZ8fDQeHWOo5E9/8rODRj0ao0zTxnGPIHHHBk5m27bHsqSLOLbpxRJ0vWLalufvpkLDMM8bsDnAQ8yPJ4ogQiHGsqATt3yoBE+zZFWD0DNMFxpJYNDgAJBF0RSGYtD5/3XR1aAhwPu/AAAAAElFTkSuQmCC",
/* foundry */		"11": "data:image/png;base64,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",
/* town house */	"13": "data:image/png;base64,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",
/* barracks */		"14": "data:image/png;base64,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",
/* city guard house */"15": "data:image/png;base64,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",
/* training ground */"16": "data:image/png;base64,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",
/* stable */		"17": "data:image/png;base64,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",
/* workshop */		"18": "data:image/png;base64,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",
/* shipyard */		"19": "data:image/png;base64,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",
/* warehouse */		"20": "data:image/png;base64,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",
/* castle */		"21": "data:image/png;base64,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",
/* harbor */		"22": "data:image/png;base64,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",
/* moonglow tower */"36": "data:image/png;base64,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",
/* trinsic temple */"37": "data:image/png;base64,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",
/* background */	"bg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAfpJREFUaENjTE9X+8+ABGQFuRmk+DkZmJkYGVAkkBUNYvb3X38Ybr/6zPAVSKMAkEdBuLFM///Fpb7/v++JHhZ400RHsL9gmAHEaC43QPHcvAqr/7NKLf9PKTAbcnhLpxPcL7unuqJ69NIySEwurLb+z8LMCEqxQxo7GIrDPTu7xRLsWYbmCkRsDgdPwiIpxk0J7NnzC3wgHp3bbgUWACXXoR6TyO7n5mAB++vTzkiIRxd0WoMFQPlxOHkU5BdYwTrq0eESs6MxOlxiEuaP0RgdjdEh2lIaTbqjSXc06Q7uXs5oHh3No6N5dDSPDoq+7WhhNFoYjRZGo4XRaGFEz3JgtNSlZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDrtEYpUco09OO0RilZ2jTw67RGKVHKNPTjtEYpWdo08Ou0RilRyjT047RGKVnaNPDLpQYXdQ1QhY9Tm82B6+C3NDmMCgGnakV08rSvGB/Pd8YClnGWpSnBV/uCVq5TC2LBtqcCbmmkAjsdIB4FERsmYxYhx7rrvSfh5NlyHpYVYb3P8yTII/mJGggPAry7M5JLsNidwTyLo/ccIgn4TEK47QXGP0/MtXj/8ftEUPW04/WBP+fU275P9BV7n9ysgp2j4I8nJqq+j8+XnnIY+Q9LyA2AAW4vKIVZy2TAAAAAElFTkSuQmCC",
/* exclam mark */	"-1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVRYhe3ZwYsbZRjH8c+bZJNld0VXFJQFBcGWHgoe9NJePHny7Nmjd/8L/w3BswdPgqdC0ZOgIq3agsRtt7FJ3U022SSTGQ/jO2TdLdh5Y1Zhf4chzCTvfOf5Pe/7PO+ES/3vFdJ/HyiecvVp5y+1UtU0sTLuKnuMGHJCzhY75HR5TF5r/FYi1kfcYEzOnJw2mwy4xacc0GSxNqxSN3nnvC/c404cvYYjNbEqDcjo0aBBQYMjvuEWT1DLx1SsnBadmFgFLZp02E4YPRVrjhgn8Rho0EwYNhVrFj+EMzl09sw/18qitaz0xT0Vq3LtbyhlntXmS8U616aCBfMLxGpFjgqojFxGdoFY7SWasDQfp0wvEGsbZ2pLxpTxs9ecSqlYpcp1vHJwxjEjsnh+TVjVnQ7IT5eXjDGHDCNWDaWW6hdOrw4hYg0ZLMVvTViVJnGURcSaMWbCCDRqZViqiXcZsskkNhHzZAfrY1X6hX3ejKxltPo8Pl2814S1HK19rtGKuT+hTz96dwFYgR/4LXZ/OTOOOEjo4pOwSjUY8SshZv2YEYf0UsZdSanuxqwvy/OY4zhD660OqVhl69Lle67HUA1iC5+iVCzc4Su2+Ikn3KefjLWCdxBNXuMac+Y8pMtxMlkq1rlPlrK/kB6tUm1epUPBkN8TWpoVYJUT7Tne5YMQXi+KBd/yObfJEmZifaDyuMsn9Jnu7BQhlJ3W13wYZ1Oim8+mv24WwscM9vaKK1eGGxt/MAhhRI/PuE6j7m4xqfhs8j67WdabTsfzuehazi5v8DMnS3vufxcrxHr3UlE8z+LRozmdErcomsyYs0mbkxo3SK+JaC7tVMvjIgZprZv9ql94QJe3YvBCvHrEA/rr7+VLZXzJVV5mRM6CQ7o85G5sWdfXy1fh+YIN3qNNgwk9fuQ2++R1l64VLKcv8javsM2EI+7zXVobuDIFtuisqpz9N7WCZwtLc1B09vJvlUv9CahvB6IA/IczAAAAAElFTkSuQmCC"
				}
			},
			construct: function (vis, x, y, img_id) {
				webfrontend.vis.Entity.call(this);
				this.drawNode = new webfrontend.draw.ImageNode.create(vis.scene, x+4, y+4, 50, 50, this.self(arguments).img[img_id]);
				this.drawNode.setSortOrder(100000);
				this.backgroundNode = new webfrontend.draw.BackgroundTextNode(vis.scene, x, y, 58, 58, this.self(arguments).img["bg"], "");
				this.backgroundNode.setSortOrder(99999);
			},
			destruct: function() {
				if (this.drawNode) {
					this.drawNode.release();
					this.drawNode = null;
				}
				this._disposeObjects("backgroundNode");
			},
			members: {
				drawNode: null,
				backgroundNode: null
			}
		});
		qx.Class.define("louTweak.layoutWindow", {
			extend: qx.core.Object,
			statics: {
				node: {
					"28":0,	"900":0, "29":1, "901":1, "27":2, "902":2, "30":3, "903":3, "23":4, "1":5, "2":6, "3":7, "4":8,
					"5":9,	"6":10,	"7":11,	"8":12,	"9":13,	"10":14,"11":15,"12":16,"13":17,"14":18,"15":19,"16":20,"17":21,
					"18":22,"19":23,"20":24,"21":25,"22":26,"36":27,"37":28,"38":29,"39":30,"40":31,"41":32,"42":33,"43":34,
					"44":35,"45":36,"46":37,"98":38,"99":39,"-2":40,"-1":41,"97":46,"47":42,"48":43,"49":45,"50":44,"52":38,
					"53":38,"54":38,"55":38,"56":38,"57":38,"58":38,"59":38,
					"904":0, "61":0, "905":1, "62":1, "906":2, "60":2, "907":3, "63":3, //magic res
					"64":0, "65":0, "66":0, "67":0, "68":0, "69":0 // special buildings
				},
				louCityP: [
					":",".",",",";","#","W","Q","F","C","P","I","L","M","H","A","D","T","U","B","K","G", //20
					"E","Y","V","S","X","R","J","Z","#","#","#","#","#","#","#","#","#","-","#","#","#", //41
					"2","3","1","4","_" //42-45, 46
				],
				louFCityP: [
					"B","A","C","D", "","F","G","I","O","J","H","K","N","1","L","M","0","E","P","S","Q",
					"U","V","Y","Z","X","T","R","W", "", "", "", "", "", "", "", "", "","0", "","0", "",
					"2","3","5","4","0"
				],
				fcpToSs: {
					"B":":", "A":".", "C":",", "D":";", "E":"U", "F":"W", "G":"Q", "H":"I",
					"I":"F", "J":"P", "K":"L", "L":"A", "M":"D", "N":"M", "O":"C", "P":"B",
					"Q":"G", "R":"J", "S":"K", "T":"R", "U":"E", "V":"Y", "W":"Z", "X":"X",
					"Y":"V", "Z":"S", "1":"H", "0":"-", "2":"2", "3":"3", "4":"4", "5":"1"
				},
				ssToId: {
					"2":47, "3":48, "1":50, "C": 4, "P": 5, "4":49, "L": 7, "M": 8,
					"H": 9, "A":10, "D":11, "T":12, "U":13, "B":14, "K":15, "G":16,
					"E":17, "Y":18, "V":19, "S":20, "X":21, "R":22, "J":36, "Z":37
				},
				land: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################",
				water: "########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######---------#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################",
				error: {
					"resource": "invalid resource node position",
					"castle": "invalid building position (Castle)",
					"water": "invalid building position (Harbor/Shipyard)",
					"type": "invalid Sharestring type (stype => ctype)",
					"hash": "invalid Sharestring"
				}
			},
			construct: function() {
				this.win = new qx.ui.window.Window(L("layout").city);
				this.win.setLayout(new qx.ui.layout.Canvas());
				this.win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
				this.win.setWidth(500);
				this.win.setHeight(350);

				this.tabView = new qx.ui.tabview.TabView().set({contentPadding: 5});
				page1 = new qx.ui.tabview.Page("Sharestring");
				page1.setLayout(new qx.ui.layout.VBox(5));
				page2 = new qx.ui.tabview.Page(L("layout").overlay);
				page2.setLayout(new qx.ui.layout.VBox(5));
				
				// Page 1
				gr = new qx.ui.layout.Grid(5, 5);
				gr.setColumnAlign(0, "right", "middle");
				gr.setColumnWidth(1, 380);
				cont = new qx.ui.container.Composite(gr);
				this.ssTa1 = new qx.ui.form.TextArea("").set({height: 60});
				this.ssTa1.addListener("click", function(){this.selectAllText();});
				cont.add(new qx.ui.basic.Label("Sharestring:"), {row: 0, column: 0});
				cont.add(this.ssTa1, {row: 0, column: 1});
				this.ssTa2 = new qx.ui.form.TextArea("").set({height: 60});
				this.ssTa2.addListener("click", function(){this.selectAllText();});
				cont.add(new qx.ui.basic.Label("Flash Planner 1:"), {row: 1, column: 0});
				cont.add(this.ssTa2, {row: 1, column: 1});
				this.ssTa3 = new qx.ui.form.TextArea("").set({height: 60});
				this.ssTa3.addListener("click", function(){this.selectAllText();});
				cont.add(new qx.ui.basic.Label("Flash Planner 2:"), {row: 2, column: 0});
				cont.add(this.ssTa3, {row: 2, column: 1});
				page1.add(cont);
				
				this.louFCPlink = new qx.ui.basic.Label(L("open_flash_pl_1")).set({
					textColor: "#105510",
					rich: true,
					appearance: "clickable-link",
					cursor: "pointer",
					marginLeft: 310
				});
				this.louFCPlink.addListener("click", function(){LT.a.showExternal(this.cityLayout.u);}, this);
				page1.add(this.louFCPlink);
				this.louFCPlink2 = new qx.ui.basic.Label(L("open_flash_pl_2")).set({
					textColor: "#105510",
					rich: true,
					appearance: "clickable-link",
					cursor: "pointer",
					marginLeft: 310
				});
				this.louFCPlink2.addListener("click", function(){LT.a.showExternal(this.cityLayout.u2);}, this);
				page1.add(this.louFCPlink2);

				// Page 2
				this.olTa = new qx.ui.form.TextArea("").set({height: 110});
				page2.add(this.olTa);

				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
				btn = new qx.ui.form.Button(L("layout").apply).set({maxWidth: 150, appearance: "button-text-small"});
				btn.addListener("click", this.applyLayout, this);
				cont.add(btn);

				btn = new qx.ui.form.Button(L("layout").remove).set({maxWidth: 150, appearance: "button-text-small"});
				btn.addListener("click", this.removeLayout, this);
				cont.add(btn);
				
				this.errorLabel = new qx.ui.basic.Label("").set({ textColor: "#FF0000", marginLeft: 20, font: "bold"});
				cont.add(this.errorLabel);
				page2.add(cont);
				
				// ----- Export / Import sharestrings
				cont = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

				this.expImpWin = this.createExpImpWindow();
				// ----- Export button
				btn = new qx.ui.form.Button(L("opts")['export']).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['export']);
					this.expImpWin.setUserData("id", 2);
					this.expImpWin.getUserData("ta").setValue(qx.lang.Json.stringify(this.cityLayouts));
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				
				// ----- Import button
				btn = new qx.ui.form.Button(L("opts")['import']).set({appearance: "button-text-small"});
				btn.addListener("click", function(){
					this.expImpWin.setCaption(L("opts")['import']);
					this.expImpWin.setUserData("id", 1);
					this.expImpWin.getUserData("ta").setValue("");
					this.expImpWin.open();
				}, this);
				cont.add(btn);
				
				page2.add(cont);
				
				// start:LTT
				page0 = new qx.ui.tabview.Page(L("turbo_city_specific"));
				page0.setLayout(new qx.ui.layout.VBox(8));

				page0.add(new qx.ui.basic.Label(L("auto_build_layout")));
				this.turboAutoBuildTa = new qx.ui.form.TextArea("").set({height: 60});
				page0.add(this.turboAutoBuildTa);
				
				page0.add(new qx.ui.basic.Label(L("txt_auto_attack")));
				gr = new qx.ui.layout.Grid();
				cont = new qx.ui.container.Composite(gr);				
				cont.add(new qx.ui.basic.Label(L("txt_units")), {row: 0, column: 0});
				
				this.availArmyList=new qx.ui.form.List();
				this.availArmyList.set({height: 70, width: 140});
				units=webfrontend.res.Main.getInstance().units
				
				allUnits=webfrontend.res.Main.getInstance().units;
				cont.add(this.availArmyList,{row: 0, column: 1, rowSpan:3});
				
				this.unitCountSp = new webfrontend.ui.SpinnerInt(1, 1, 999999);
				this.unitCountSp.getChildControl("textfield").setLiveUpdate(true);
				cont.add(this.unitCountSp,{row: 0, column: 2});
				
				btn = new qx.ui.form.Button(">>");
				btn.set({appearance: "button-text-small"});
				btn.addListener("click", function() {
					LT.debug(">>Click");
					// prepare data
					selected=this.availArmyList.getSelection()[0];
					unitType=selected.getModel();
					unitCount=parseInt(this.unitCountSp.getValue());
					allUnits=webfrontend.res.Main.getInstance().units;
					LT.debug(unitType);
					
					// Add units into selected list
					this.selectedUnits.add(new qx.ui.form.ListItem(allUnits[unitType].dn +'s: '+ unitCount, null, unitType));
					// Remove units from available list
					this.availArmyList.remove(selected);
					// Add this type into the army array.
					unitSet={"t":unitType+"", "c":unitCount};
					this.selArmy.push(unitSet);
					
					LT.debug(">>click done");
				}, this);
				cont.add(btn,{row: 1, column: 2});
				
				this.selectedUnits=new qx.ui.form.List();
				this.selectedUnits.set({height: 70, width: 140});
				cont.add(this.selectedUnits,{row: 0, column: 3, rowSpan:3});
				
				btn = new qx.ui.form.Button("<<");
				btn.set({width: 30, appearance: "button-text-small"});
				btn.addListener("click", function() {
					selected=this.selectedUnits.getSelection()[0];
					unitType=selected.getModel();
					this.selectedUnits.remove(selected);
					allUnits=webfrontend.res.Main.getInstance().units;
					this.availArmyList.add(new qx.ui.form.ListItem(allUnits[unitType].dn, null, unitType));
					this.selArmy.splice(this.selArmyType.indexOf(unitType),1);
				}, this);
				cont.add(btn,{row: 2, column: 2});
				
				cont.add(new qx.ui.basic.Label(L("txt_coords")), {row: 3, column: 0});
				this.turboAutoAttackCoordinatesTa = new qx.ui.form.TextArea("").set({height: 30});
				cont.add(this.turboAutoAttackCoordinatesTa, {row: 3, column: 1});
				//cont.add(new qx.ui.basic.Label("Success rate:"), {row: 2, column: 0});
				
				// Apply button saves everything selected
				btn = new qx.ui.form.Button(L("btn_apply")).set({appearance: "button-text-small"})
				btn.addListener("click", function(){
					this.saveCitySpecificValues();
					// Todo: move below also into savecityspecificValues()
					LT.main.turboUtils.setObjectIntoLocalStorageSC("attack_units", this.selArmy);
					//unitSet={"t":unitType+"", "c":unitCount};					
				}, this);
					
				cont.add(btn, {row: 4, column: 0});
				page0.add(cont);
				
				this.tabView.add(page0);
				// end:LTT

				this.tabView.add(page1);
				this.tabView.add(page2);
				this.win.add(this.tabView, {top: 0, right: 3, bottom: 30, left: 3});
				
				btn = new qx.ui.form.Button("OK").set({width: 75});
				btn.addListener("click", function(){this.tabView.setSelection([this.tabView.getChildren()[0]]); this.win.close()}, this);
				this.win.add(btn, {bottom: 0, right: 20});
				
				LT.a.getRoot().add(this.win, {left:250, top:200});
				this.srvName = webfrontend.data.Server.getInstance().getName();
				this.loadCityLayouts();
			},
			members: {
				cityLayout: null,
				cityLayouts: null,
				olTa: null,
				ssTa1: null,
				ssTa2: null,
				ssTa3: null,
				louFCPlink: null,
				errorLabel: null,
				tabView: null,
				win: null,
				oObjs: null,
				srvName: null,
				// start:LTT
				turboAutoBuildTa: null,
				turboAutoAttackCoordinatesTa: null,
				selArmy: null,
				selArmyType: null,
				// end:LTT
				open: function() {
					this.win.open();
					this.ssTa1.setValue(this.cityLayout.s);
					this.ssTa2.setValue(this.cityLayout.u);
					this.ssTa3.setValue(this.cityLayout.u2);
					if (this.cityLayouts[this.srvName].hasOwnProperty(webfrontend.data.City.getInstance().getId() + "o"))
						this.olTa.setValue(this.cityLayouts[this.srvName][webfrontend.data.City.getInstance().getId() + "o"]);
					else this.olTa.setValue("");
					
					// start:LTT
					shareString=LT.main.turboUtils.getObjectFromLocalStorageSC("AutoBuildShareString");
					if (shareString != null && shareString != undefined) {
						this.turboAutoBuildTa.setValue(shareString);
					} else {
						this.turboAutoBuildTa.setValue("");
					}

//CityGuards1,Ballista 2, Ranger 3, Guardian 4,Templar 5, Bserker6, Mage 7,Scout 8, Crossbowman 9, Paladin 10,
//Knight 11, Warlock 12, Ram 13, Catapult 14, Frigate 15, Sloop 16, War Galleon 17,19 Baron, 
//old list: "6","7","8","11","12","13","14","17","19"
					masterAttackUnits=["6","3","4","9","11","7","12","5","10","16","15","17","19"];
					allUnits=webfrontend.res.Main.getInstance().units;
					currentArmy=LT.main.turboUtils.getObjectFromLocalStorageSC("attack_units");
					LT.debug(currentArmy);
					currentTypes=new Array();currentCount=new Array();
					if (currentArmy != null) {
						for (i=0;i<currentArmy.length;i++) {
							currentTypes.push(currentArmy[i]["t"]);
							currentCount.push(currentArmy[i]["c"]);
						}
					}
					LT.debug(currentTypes);
					this.selectedUnits.removeAll();
					this.availArmyList.removeAll();
					for (i=0;i<masterAttackUnits.length;i++){
						unitType=masterAttackUnits[i];
						index=currentTypes.indexOf(unitType);
						if (index>=0) {
							this.selectedUnits.add(new qx.ui.form.ListItem(allUnits[unitType].dn +'s: '+ currentCount[index], null, unitType));
						} else {
							this.availArmyList.add(new qx.ui.form.ListItem(allUnits[unitType].dn, null, unitType));
						}
						
					}
					this.selArmy = currentArmy;
					if (this.selArmy==null) this.selArmy =new Array();
					this.selArmyType=currentTypes;

					coordinates=LT.main.turboUtils.getObjectFromLocalStorageSC("attack_target");
					if (coordinates != null && coordinates != undefined) {
						this.turboAutoAttackCoordinatesTa.setValue(qx.lang.Json.stringify(coordinates));
					} else {
						this.turboAutoAttackCoordinatesTa.setValue("");
					}
					// end:LTT
					
					this.errorLabel.setValue("");
				},
				// start:LTT
				saveCitySpecificValues: function() {
					cid=webfrontend.data.City.getInstance().getId();
					LT.debug("City Id being saved into is:" + cid);
					//autoBuildShareString[cid] = "[ShareString.1.3]:########################---C-C.#::::-,,#####,3C3A333#3333---,###-A3:3:::A#-CAC,--,-##-.LC3:333#-,3,---,-##-.223A#######----,,##--..C##-,---##-----##----##--,-..C##---.##,---#-;---222-#:--.##---,#----CLCCL#::--#######3AC-T2222#######,,--#:33C-C...#-;--##--,-#::3C3C22.#---.##----##:3A3:CL##----##-:3.-##3C3:-##,,---##-:3C--#######------##-:3A-----#-:-------##--3-,----#---,,,---###-;-,,--;#--------#####-------#.---..-########################[/ShareString]";
					LT.main.turboUtils.setObjectIntoLocalStorageSC("AutoBuildShareString",this.turboAutoBuildTa.getValue().replace(/\r/g,'').replace(/\n/g,''));
					LT.main.turboUtils.setObjectIntoLocalStorageSC("attack_target",qx.lang.Json.parse(this.turboAutoAttackCoordinatesTa.getValue()));
				},
				// end:LTT
				loadCityLayouts: function() {
					_str = localStorage.getItem("LT_cityLayouts");
					this.cityLayouts = {};
					this.cityLayouts[this.srvName] = {};
					if (_str) {
						_scl = qx.lang.Json.parse(_str);
						if (_scl.hasOwnProperty(this.srvName))
							this.cityLayouts[this.srvName] = _scl[this.srvName];
					}
				},
				saveCityLayouts: function() {
					_str = localStorage.getItem("LT_cityLayouts");
					if (_str == null) _str = '{"' + this.srvName + '":{}}';
					_scl = qx.lang.Json.parse(_str);
					_scl[this.srvName] = this.cityLayouts[this.srvName];
					_str = qx.lang.Json.stringify(_scl);
					localStorage.setItem("LT_cityLayouts", _str);
				},
				removeObjects: function() {
					if (this.oObjs != null) {
						for (i=0; i<this.oObjs.length; i++) {
							this.oObjs[i].release();
						}
						this.oObjs = null;
					}
				},
				showOverlayLayout: function(ss, or) {
				this.removeObjects();
		try {
					LT.main.getCity();
					c = LT.city;
					cgi = webfrontend.data.City.getInstance();
					if (c == null || c == undefined) {
						window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 1000);
						return;
					}
					for (i=0; i<c.length; i++) {
						if (c[i] == null) {
							window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 1000);
							return;
						}
					}
					cId = cgi.getId();
					if (LT.main.cityId != cId || qx.lang.Object.isEmpty(LT.a.visMain.selectableEntities) || LT.main.cityId != LT.a.visMain.mapid) {
						window.setTimeout(function(){LT.main.layoutWindow.showOverlayLayout();}, 2000);
						return;
					}
					
					if (this.cityLayouts[this.srvName].hasOwnProperty(cId))
						ss = this.cityLayouts[this.srvName][cId];
					if (ss == null || ss == undefined) {
						cnt = cgi.getText();
						ss = cnt.match(/\[LTS\](.+)\[\/LTS\]/);
						if (ss != null) {
							or = ss[1];
							ss = ss[1].replace(/\[[^\]]+\](\:|\;)?/g, "");
							if (ss.indexOf("map=") != -1) {
								//ss = ss.replace(/http\:\/\/www\.lou\-fcp\.co\.uk\/map\.php\?map=/, "");
								ss = ss.substring(ss.indexOf("=")+1);
								ss = this.convertToSharestring(ss);
							}
						}
					}

					if (!this.validateSharestring(ss) || LT.a.visMain.mapmode != "c") return;
					/*if (ss == undefined || ss == null || LT.a.visMain.mapmode != "c") return;*/

					if (!this.cityLayouts[this.srvName].hasOwnProperty(cId)) {
						this.cityLayouts[this.srvName][cId] = ss;
						this.cityLayouts[this.srvName][cId + "o"] = or;
						this.saveCityLayouts();
					}

					this.oObjs = new Array();
					
					/*for (i=0; i<ss.length; i++) {
						if (!/\;|\:|\,|\.|T|#|\-|\_|W|Q|F|I/.test(ss.charAt(i))) {
							id = this.self(arguments).ssToId[ss.charAt(i)];
							if (c[i][2] != id)
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), id));
						} else if (/\-/.test(ss.charAt(i))) {
							if (c[i][2] != 98 && c[i][2] != -2 && (c[i][2] < 52 || c[i][2] > 60))
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), 0));
						} else if (/\_/.test(ss.charAt(i))) {
							if (c[i][2] != 97)
								this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), 0));
						}
					}*/
					for (i=0; i<ss.length; i++) {
						if (/T|#|W|Q|F|I/.test(ss.charAt(i))) continue;
						id = 0;
						if (!/\;|\:|\,|\.|\-|\_/.test(ss.charAt(i))) {
							id = this.self(arguments).ssToId[ss.charAt(i)];
							if (c[i][2] == id) continue;
						} else if (/\;|\:|\,|\./.test(ss.charAt(i))) {
							if (ss.charAt(i) == ";" && /30|903|63|907/.test(c[i][2])) continue;
							else if (ss.charAt(i) == ":" && /28|900|61|904/.test(c[i][2])) continue;
							else if (ss.charAt(i) == "," && /27|902|60|906/.test(c[i][2])) continue;
							else if (ss.charAt(i) == "." && /29|901|62|905/.test(c[i][2])) continue;
							else id = -1;
						} else if (/\-/.test(ss.charAt(i))) {
							if (c[i][2] == 98 || c[i][2] == -2 || (c[i][2] >= 52 && c[i][2] <= 60))
								continue;
						} else if (/\_/.test(ss.charAt(i))) {
							if (c[i][2] == 97)
								continue;
						}
						this.oObjs.push(new window.louTweak.overlayObject(LT.a.visMain, 163+128*(i%21), 67+80*Math.floor(i/21), id));
					}
		} catch(e) {LT.debug(e);}
				},
				generateSharestring: function() {
					try {
						LT.main.getCity();
						this.cityLayout = {"s":"", "u":"", "u2":""};
						waterCity = webfrontend.data.City.getInstance().getOnWater();
						c = LT.city;
						var sharestring = "[ShareString.1.3]" + ((waterCity) ? ";" : ":");
						var url = "http://www.louopt.com/map.php?map=" + ((waterCity) ? "W" : "L");
						for (i=0; i<c.length; i++) {
							sharestring += this.self(arguments).louCityP[this.self(arguments).node[c[i][2]]];
							url += this.self(arguments).louFCityP[this.self(arguments).node[c[i][2]]];
						}
						if (waterCity) url = url.substring(0,317)+url.substring(319,333);
						sharestring += "[/ShareString]";
						this.cityLayout.s = sharestring;
						this.cityLayout.u = url;
						this.cityLayout.u2 = url.replace(/http\:\/\/www\.lou\-fcp\.co\.uk\/map\.php/, "http://city.louopt.com/");
					} catch(e) { LT.debug(e); }
				},
				applyLayout: function() {
					this.errorLabel.setValue("");
					txt = this.olTa.getValue().replace(/\s/g,"");
					o = txt;
					if (txt.indexOf("ShareString") != -1) {
						t = txt.match(/\](\:|\;){1}/)[1];
						txt = txt.replace(/\[[^\]]+\](\:|\;)?/g, "");
						if (txt.length != 441) {
							this.errorLabel.setValue(this.self(arguments).error.hash);
							return;
						}
						if (webfrontend.data.City.getInstance().getOnWater() && t == ":") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/,"Land").replace(/ctype/,"Water"));
							return;
						} else if (!webfrontend.data.City.getInstance().getOnWater() && t == ";") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/,"Water").replace(/ctype/,"Land"));
							return;
						}
						//if (this.validateSharestring(txt))
						this.saveToCityNotes("a", o);
						//else return;
						this.showOverlayLayout(txt, o);
					} else if (txt.indexOf("map=") != -1) {
						txt = txt.substring(txt.indexOf("=")+1);
						if (txt.length != 294) {
							this.errorLabel.setValue(this.self(arguments).error.hash);
							return;
						}
						if (webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "L") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/,"Land").replace(/ctype/,"Water"));
							return;
						} else if (!webfrontend.data.City.getInstance().getOnWater() && txt.charAt(0) == "W") {
							this.errorLabel.setValue(this.self(arguments).error.type.replace(/stype/,"Water").replace(/ctype/,"Land"));
							return;
						}
						txt = this.convertToSharestring(txt);
						//if (this.validateSharestring(txt))
						this.saveToCityNotes("a", o);
						//else return;
						this.showOverlayLayout(txt, o);
					}
				},
				removeLayout: function() {
					cId = webfrontend.data.City.getInstance().getId();
					this.errorLabel.setValue("");
					this.removeObjects();
					delete this.cityLayouts[this.srvName][cId];
					delete this.cityLayouts[this.srvName][cId + "o"];
					this.saveToCityNotes("r", "");
					this.olTa.setValue("");
					this.saveCityLayouts();
				},
				convertToSharestring: function(u) {
					template = this.self(arguments).land;
					t = u.charAt(0);
					if (t == "W") {
						u = u.substring(0,242) + u.substring(244,260) + u.substring(263,278) + u.substring(280);
						template = this.self(arguments).water;
					}
					u = u.substring(1);
					c = -1;
					u = template.replace(/\-|\_/g, function(){ c++; return window.louTweak.layoutWindow.fcpToSs[u[c]]; });
					u = u.substring(0,220) + "T" + u.substring(221);
					if (t == "W") {
						wbp = [331, 332, 351, 354, 372, 376, 394, 416];
						u = u.split("");
						for (i=0; i<wbp.length; i++) {
							if (u[wbp[i]] == "-") u[wbp[i]] = "_";
						}
						u = u.join("");
					}
					return u;
				},
				validateSharestring: function(s) {
					if (s == undefined || s == null) return false;
					error = "";
					c = LT.city;
					for (i=0; i<c.length; i++) {
						if (/\;|\:|\,|\./.test(s.charAt(i))) {
							switch(s.charAt(i)) {
								case ";":
									if (c[i][2] != 30 && c[i][2] != 903 && c[i][2] != 63 && c[i][2] != 907)

										error = "resource";
									break;
								case ":":
									if (c[i][2] != 28 && c[i][2] != 900 && c[i][2] != 61 && c[i][2] != 904)

										error = "resource";
									break;
								case ",":
									if (c[i][2] != 27 && c[i][2] != 902 && c[i][2] != 60 && c[i][2] != 906)

										error = "resource";
									break;
								case ".":
									if (c[i][2] != 29 && c[i][2] != 901 && c[i][2] != 62 && c[i][2] != 905)

										error = "resource";
									break;
							}
						}
						if (c[i][2] == 21 && s.charAt(i) != "X")
							error = "castle";
						if ((/V|R|\_/.test(s.charAt(i)) && !/\b(19|22|97)\b/.test(c[i][2])) || (/\b(19|22|97)\b/.test(c[i][2]) && !/V|R|\_/.test(s.charAt(i)))) {
							error = "water";
							//LT.debug(i + " " + s.charAt(i) + " " + c[i][2]);
						}
					}
					if (s.replace(/[^X]/g,"").length > 1)
						error = "castle";
					if (error != "") {
						this.errorLabel.setValue(this.self(arguments).error[error]);
						return false;
					} else {
						return true;
					}
				},
				// start:LTT
				myValidateSharestring: function(s) {
					if (s == undefined || s == null) return "Empty";
					error = "";
					c = LT.city;
					for (i=0; i<c.length; i++) {
						if (/\;|\:|\,|\./.test(s.charAt(i))) {
							switch(s.charAt(i)) {
								case ";":
									if (c[i][2] != 30 && c[i][2] != 903 && c[i][2] != 63 && c[i][2] != 907)

										error = "resource";
									break;
								case ":":
									if (c[i][2] != 28 && c[i][2] != 900 && c[i][2] != 61 && c[i][2] != 904)

										error = "resource";
									break;
								case ",":
									if (c[i][2] != 27 && c[i][2] != 902 && c[i][2] != 60 && c[i][2] != 906)

										error = "resource";
									break;
								case ".":
									if (c[i][2] != 29 && c[i][2] != 901 && c[i][2] != 62 && c[i][2] != 905)

										error = "resource";
									break;
							}
						}
						if (c[i][2] == 21 && s.charAt(i) != "X")
							error = "castle";
						if ((/V|R|\_/.test(s.charAt(i)) && !/\b(19|22|97)\b/.test(c[i][2])) || (/\b(19|22|97)\b/.test(c[i][2]) && !/V|R|\_/.test(s.charAt(i)))) {
							error = "water";
							//LT.debug(i + " " + s.charAt(i) + " " + c[i][2]);
						}
						if (error != "") {
							errorPoint = i;
							break;
						}
					}
					if (s.replace(/[^X]/g,"").length > 1)
						error = "castle";
					if (error != "") {
						this.errorLabel.setValue(this.self(arguments).error[error]);
						LT.debug("Invalid share string (at " + errorPoint + "?): " + this.self(arguments).error[error]);
						return error;
					} else {
						return "";
					}
				},
				// end:LTT
				createExpImpWindow: function(t) {
					win = new qx.ui.window.Window("");
					win.setLayout(new qx.ui.layout.VBox(10));
					win.set({showMaximize: false, showMinimize: false, allowMaximize: false});
					win.setWidth(450);
					win.setHeight(200);
					LT.a.getRoot().add(win, {left:250, top:200});
					
					ta = new qx.ui.form.TextArea("");
					ta.addListener("click", function(){this.selectAllText();});
					win.add(ta, {height: 70});
					win.setUserData("ta", ta);
					btn = new qx.ui.form.Button("OK").set({maxWidth: 50, alignX: "center"});
					btn.addListener("click", function() {
						id = this.getUserData("id");
						if (id == 1) {
							txt = this.getUserData("ta").getValue();
							try {
								obj = qx.lang.Json.parse(txt);
							} catch(e) { obj = "error"; }
							if (typeof obj == "object" && obj != null) {
								_icl = qx.lang.Json.parse(txt); // imp ss
								if (_icl.hasOwnProperty(LT.main.layoutWindow.srvName)) {
									LT.main.layoutWindow.cityLayouts[LT.main.layoutWindow.srvName] = _icl[LT.main.layoutWindow.srvName];
									LT.main.layoutWindow.saveCityLayouts();
								}
								this.close();
							} else {
								alert(L("opts").import_invalid);
							}
						} else if (id == 2) {
							this.close();
						}
					}, win);
					win.add(btn);
					return win;
				},
				saveToCityNotes: function(c, s) {
					if (LT.options.saveSsCn == false) return;
					cgi = webfrontend.data.City.getInstance();
					cnt = cgi.getText();
					cnss = cnt.match(/\n?\[LTS\].+\[\/LTS\]/);
					if (c == "a") {
						lts = "\n[LTS]" + s + "[/LTS]";
						if (cnss != null) {
							cnt = cnt.replace(cnss[0], lts);
						} else {
							if (cnt.length + lts.length < 1000) cnt = cnt + lts;
							else return;
						}
					} else if (c == "r") {
						if (cnss != null) {
							cnt = cnt.replace(cnss[0], "");
						} else
							return;
					}
					webfrontend.net.CommandManager.getInstance().sendCommand("CityNoteSet", {
						cityid: cgi.getId(),
						reference: cgi.getReference(),
						text: cnt
					}, this, this.fireChangeVer);
					
				},
				fireChangeVer: function() {
					pgi = webfrontend.data.Player.getInstance();
					pgi.fireDataEvent("changeVersion", pgi.getVersion());
				}
			}
		});
		
		qx.Class.define("louTweak.miniMap", {
			extend: qx.core.Object,
			construct: function () {
				this.clientArea = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.clientArea.setWidth(200);
			
				// ----- MiniMap container
				this.miniMapCont = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.miniMapCont.setHeight(228);
				this.miniMapCont.setWidth(200);
				this.miniMapCont.setAllowGrowY(false);
				this.miniMapCont.setAllowGrowX(false);
				
				// ----- Background
				var background = new qx.ui.core.Widget();
				background.setBackgroundColor("black");
				//background.setOpacity(0.70);
				this.miniMapCont.add(background, {top: 14, left: 0, bottom: 0, right: 0});
				
				// ----- Title bar
				this.titleBar = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.titleBar.setHeight(28);
				this.titleBar.setWidth(200);
				
				var titleBarLeft = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAiCAYAAABmzUjmAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAGYktHRAD%2FAP8A%2F6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfaCQQTFBTXF37OAAACIklEQVQ4y3WUvW4TURCFvzN3f5wEEE0CdDQQCdFFSCiPEIQUhERLS0PavAIPkjqiSB7BCLcokUhDESMSFAkJWUqMY%2B9Q3LubdWy72ea7Z%2BacGY%2BY%2FS0Bz4EtYAO4C6AF0Fvg9d7u5jMWKL0APgHHe7ub%2FuHVE39wb8kf3V92LVLqHl1w8PWMIs%2FIQ0DzoC9HFxz0zlkuC8oiJwQjmwcd9s5Z6RR0yoIiC5iJLLmL0PEFh73frHRKOmVOkWWYCSmCG3VPh71z7nRKljo5RZYjEybhgNU5fe7%2BpFPklEVOmRcEE8GEBCbI6myCGXkWKPKMYIZMgDfZNaCZEYJhJizUqWkWFCAUQWJfSpx7CwQwKWqYkLc0ra2Ynkc9kNWYI58qHfOSiSDD8VRb0HZNisEkkLCoheTTPYpYTwKz2pqn71SPN84l0dh2R1Olqadg1D5cmlVEJDPEqXjdjkBOlvaRm7dqokqGceI%2BXjXxGJglZUXXMSW%2FbSaqWW2mHmPaR27PW3UE9WzaOVbuVO64e%2BtRVBMekwCoJhXX4zHXk4rJxJslMUApsgHA1suHXA5HXA2HjK5HTKp6hHFaAXi63%2B2v7bxZXy1yOOkP0hKLIDV%2FrgBcAqP9bn9tZ3t9tcjg5HSQNt0IFjCLir%2Fa8Mft9dUic076g5QAVB5B5sF5cL6f%2FqWaOONx1YALYPj24w%2FD0b%2BZs0e6aFvAu%2FbZmwcCvAcetw%2Fpf3gLrPIAPHPVAAAAAElFTkSuQmCC");
				titleBarLeft.setScale(true);
				titleBarLeft.setHeight(28);
				var titleBarSpan = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAiCAYAAACeLbMRAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJBBMSEx8pTOsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAGpJREFUCNdFzLEJwlAAhOH%2F%2FiAhSaGtI2QFd3GONI7jHhnIJiSgSIpnER42x8F3HMDMc7oVrpe%2BeB467LsW21ODRiRBAyapQTAGBYxiAD3GwUSM1Jaq8P%2BrkAMKfr47rtsbX8uCj%2FsIwPwDxxsQYxM1b7kAAAAASUVORK5CYII%3D");
				titleBarSpan.setScale(true);
				titleBarSpan.setAllowGrowX(true);
				titleBarSpan.setHeight(28);

				var titleBarOrnmt = new qx.ui.basic.Image("webfrontend/ui/win_mainoverlay_ornament.png");
				titleBarOrnmt.setHeight(22);
				titleBarOrnmt.setWidth(148);

				this.contLabel = new qx.ui.basic.Label().set({font: "bold"});
				this.contLabel.setTextColor("text-gold");

				this.coordLabel = new qx.ui.basic.Label().set({font: "bold"});
				this.coordLabel.setTextColor("text-gold");
				
				btn = new qx.ui.form.Button(null,"webfrontend/ui/icons/icon_chat_resize_minimize.png").set({appearance: "button-text-small", padding: [0,0,0,0]});
				btn.addListener("execute", this.minimizeMap, this);

				this.titleBar.add(titleBarLeft,{top: 0, bottom: 0, left: 0});
				this.titleBar.add(titleBarSpan,{top: 0, bottom: 0, left: 10, right: 0});
				this.titleBar.add(titleBarOrnmt,{top: 2, right: 5});
				this.titleBar.add(this.contLabel,{bottom: 7, left: 8});
				this.titleBar.add(this.coordLabel,{bottom: 7, left: 33});
				this.titleBar.add(btn, {top: 4, right: 2});
				
				// ----- Drawing area
				this.da = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.da.setHeight(200);
				this.da.setWidth(200);
				this.da.setZIndex(1000);
				
				this.camera = new qx.ui.core.Widget().set({width: 12, height: 10, zIndex: 1001, decorator: new qx.ui.decoration.Single(1, "solid", "#c3a67f")});
				this.da.addListener("mouseup", this.onMapClick, this);
				this.da.add(this.camera);
				
				this.worldGrid = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
				this.worldGrid.setHeight(196);
				this.worldGrid.setWidth(196);
				this.worldGrid.setZIndex(1005);
				this.worldGrid.setVisibility("hidden");
				this.worldCamera = new qx.ui.core.Widget().set({width: 8, height: 8, zIndex: 1006, decorator: new qx.ui.decoration.Single(2, "solid", "#c3a67f")});
				this.worldGrid.add(this.worldCamera);
				this.da.add(this.worldGrid, {left: 2, top: 2});
				
				this.miniMapCont.add(this.da, {top: 28, left: 0});
				this.miniMapCont.add(this.titleBar, {top: 0, left: 0});
				// ----- -----

				// ----- Show MiniMap button
				this.restoreBtn = new qx.ui.form.Button("Map","webfrontend/ui/icons/icon_chat_resize_maximize.gif").set({appearance: "button-text-small", width: 60, height: 25});
				this.restoreBtn.addListener("execute", this.restoreMap, this);
				
				this.miniMapCont.setVisibility("excluded");
				this.clientArea.add(this.miniMapCont);
				this.clientArea.add(this.restoreBtn, {right: 0, top: 0});
				// ----- -----
				
				// ----- Map array
				this.map = new Array(700);
				for (i=0; i<700; i++) {
					this.map[i] = new Array(700);
				}
				p = webfrontend.data.Player.getInstance();
				this.playerCont = new Array();
				for (var ci in p.cities) {
					this.map[p.cities[ci].xPos][p.cities[ci].yPos] = 0;
					this.playerCont.push(Math.floor(p.cities[ci].xPos/100) + Math.floor(p.cities[ci].yPos/100)*10);
				}
				this.drawWorldGrid();
				this.cityPoints = new Array();
				this.prevCont = -1;
				// ----- -----
			},
			members: {
				clientArea: null,
				miniMapCont: null,
				titleBar: null,
				contLabel: null,
				coordLabel: null,
				da: null,
				map: null,
				worldGrid: null,
				worldCamera: null,
				camera: null,
				playerCont: null,
				cityPoints: null,
				restoreBtn: null,
				prevCont: null,
				getContinentPrefix: function() {
					x = y = 0;
					if (LT.a.visMain.mapmode == "r") {
						x = Math.floor(LT.a.cameraPos.x / LT.a.visMain.getTileWidth());
						y = Math.floor(LT.a.cameraPos.y / LT.a.visMain.getTileHeight());
					} else if (LT.a.visMain.mapmode == "c") {
						c = webfrontend.data.City.getInstance();
						x = c.getId() & 0xFFFF;
						y = c.getId() >> 16;
					}
					if (x < 0) x = 0;
					if (x > 699) x = 699;
					if (y < 0) y = 0;
					if (y > 699) y = 699;
					return {
						px:Math.floor(x/100), // prefix x
						py:Math.floor(y/100), // prefix y
						csx:Math.floor(x/100)*100, // cont start x
						csy:Math.floor(y/100)*100, // xont start y
						cx:x, // x
						cy:y // y
					};
				},
				createPoint: function (x, y, clr) {
					var point = new qx.ui.core.Widget();
					point.setBackgroundColor(LT.options.miniMapColors[clr]);
					point.setHeight(2);
					point.setWidth(2);
					this.da.add(point, {
						top: y*2,
						left: x*2
					});
					return point;
				},
				clearMap: function (b) {
					if (b != "c") {
						for (var i=0; i<this.cityPoints.length; i++) {
							x = this.cityPoints[i].x;
							y = this.cityPoints[i].y;
							if (x > b[0] && x < b[1] && y > b[2] && y < b[3]) {
								this.cityPoints[i].p.destroy();
								this.cityPoints.splice(i, 1);

								i--;
							}
						}
					} else {
						for (var i=0; i<this.cityPoints.length; i++)
							this.cityPoints[i].p.destroy();
					}
				},
				drawMap: function(type) {
					//start = new Date().getTime();
					cp = this.getContinentPrefix();
					if (type != "c") {
						bounds = [ cp.cx-15, cp.cx+15, cp.cy-15, cp.cy+15 ];
						this.clearMap(bounds);
					} else {
						bounds = [ cp.csx, cp.csx+100, cp.csy, cp.csy+100 ];
						this.clearMap("c");
						this.cityPoints = new Array();
					}
					this.updateLabels(cp);
					bounds = [
						(bounds[0]<cp.csx?cp.csx:bounds[0]),
						(bounds[1]>cp.csx+100?cp.csx+100:bounds[1]),
						(bounds[2]<cp.csy?cp.csy:bounds[2]),
						(bounds[3]>cp.csy+100?cp.csy+100:bounds[3])
					];
					for (i=bounds[0]; i<bounds[1]; i++) {
						for (j=bounds[2]; j<bounds[3]; j++) {
							if (this.map[i][j] != undefined) {
								if (this.map[i][j] == -1) {
									LT.debug("Undefined at: " + i + ":" + j);
									continue;
								}
								v = this.map[i][j];
								t = Math.floor(v/2);
								if ( ((t == 7 || t == 8) && LT.options.miniMapMark[t] == 1) || (t != 7 && t != 8 && ((LT.options.miniMapMark[t] == (v%2)+1) || LT.options.miniMapMark[t] == 3))) {
									this.cityPoints.push({p:this.createPoint(i%100, j%100, v), x:i, y:j});
								}
							}
						}
					}
					//LT.debug("D: " + (new Date().getTime()-start));
				},
				onMapClick: function(e) {
					if (e.getButton() == "left") {
						try {
							mx = this.da.getContainerLocation()["left"];
							my = this.da.getContainerLocation()["top"];

							mx = e.getViewportLeft() - mx;
							my = e.getViewportTop() - my;
							
							cp = this.getContinentPrefix();
							if (this.worldGrid.getVisibility() == "visible")
								LT.a.setMainView('r', 0, Math.floor(mx/2)*7 * LT.a.visMain.getTileWidth(), Math.floor(my/2)*7 * LT.a.visMain.getTileHeight());
							else
								LT.a.setMainView('r', 0, (cp.csx + mx/2) * LT.a.visMain.getTileWidth(), (cp.csy + my/2) * LT.a.visMain.getTileHeight());
							this.updateCameraPos();
						} catch(e) { LT.debug(e); }
					} else if (e.getButton() == "right") {
						if (this.worldGrid.getVisibility() == "hidden")
							this.worldGrid.setVisibility("visible");
						else
							this.worldGrid.setVisibility("hidden");
					}
				},
				updateContinent: function() {
					//non-castle/castle
					// 0, 1 self
					// 2, 3 alliance 0
					// 4, 5 allied 1
					// 6, 7 enemy 2
					// 8, 9 nap 3
					// 10, 11 other 4
					// 12, 13 lawless
					// 14 moongate
					// 16 shrine
					if (LT.a.visMain.mapmode == "r") {
						p = webfrontend.data.Player.getInstance().getName();
						v = LT.a.visMain.cells;
						//
						// if 'cells' object is empty (new version)
						//
						if (qx.lang.Object.isEmpty(v)) {
							clib = ClientLib.Vis.VisMain.GetInstance();
							region_object = clib.get_Region();
							if (region_object == null || region_object == undefined) return;
							for (var o in region_object) {
								if (region_object[o] != null && region_object[o].hasOwnProperty("d"))
									data_object = region_object[o];
							}
							if (data_object == null || data_object == undefined) return;
							d_object = data_object.d;
							if (d_object == null || d_object == undefined) return;

							for (var n in d_object) {
								data_table = null;
								// this is just way too much, but couldn't find better solution to get obfuscated and version changing variables
								try {
									for (var dob in d_object[n]) {
										if (d_object[n][dob] instanceof Array && d_object[n][dob].length == 32) {
											for (e=0; e<d_object[n][dob].length; e++) {
												r = d_object[n][dob][e];
												if (r == null && typeof r == "object") {
													data_table = d_object[n][dob];
													break;
												} else {
													for (f=0; f<r.length; f++) {
														if (r[f] == null && typeof r[f] == "object") {
															data_table = d_object[n][dob];
															break;
														}
													}
												}
											}
										}
										if (data_table != null) break;
									}
								} catch (e) {
									
								}
								//data_table = d_object[n].SIB;
								if (data_table == null || data_table == undefined) continue;
								for (q=0; q<data_table.length; q++) {
									row = data_table[q];
									for (w=0; w<row.length; w++) {
										if (row[w] != null) {
											aid = 0;
											pln = "";
											if (typeof row[w].get_AllianceId != 'undefined')
												aid = row[w].get_AllianceId();
											if (typeof row[w].get_PlayerName != 'undefined')
												pln = row[w].get_PlayerName();
											crd = row[w].get_Coordinates();
											posX = crd & 0xFFFF;
											posY = crd >> 16;
											uit = row[w].get_UIType();
											// uit - City / LawlessCity / Shrine / Dungeon / Boss / FreeSlot / null (moongate)
											if (/City/.test(uit)) {
												if (/military|palace/i.test(row[w].get_ImagePath())) uit = uit.replace(/City/, "Castle");
											}
											//console.log(aid + ", (" + posX + ":" + posY +"), " + uit);
											if (/Lawless/.test(uit))
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), -1);
											else if (pln == p)
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), -2);
											else if (pln != p && pln != "")
												this.map[posX][posY] = this.getCityType((/City/.test(uit) ? 0 : 10), aid);
											else if (uit == "Shrine")
												this.map[posX][posY] = 16;
											else if (uit == null)
												this.map[posX][posY] = 14; // moongate
										}
									}
								}
							} // for d_object
						} else {
							for (var id in v) {
								if (v != null) {
									for (var e in v[id].entities) {
										if (!(v[id].entities[e] instanceof webfrontend.vis.WorldTerrain)) {
											if (v[id].entities[e] instanceof webfrontend.vis.WorldCity) {
												if (v[id].entities[e].playerName == "") this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, -1);
												else {
													if (v[id].entities[e].playerName != p)
														this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, v[id].entities[e].allianceId);
													else if (v[id].entities[e].playerName == p)

														this.map[v[id].entities[e].getPosX()][v[id].entities[e].getPosY()] = this.getCityType(v[id].entities[e].id, -2);
												}
											} else if (v[id].entities[e] instanceof webfrontend.vis.WorldShrine) {
												this.map[(v[id].entities[e].shrineId & 0xFFFF)][(v[id].entities[e].shrineId >> 16)] = 16;
											} else if (v[id].entities[e] instanceof webfrontend.vis.WorldObject) {
												if (v[id].entities[e].image != undefined) {
													if (v[id].entities[e].image.url.indexOf("moongate") != -1)
														this.map[Math.floor(v[id].entities[e].posX/LT.a.visMain.getTileWidth())][Math.ceil(v[id].entities[e].posY/LT.a.visMain.getTileHeight())] = 14;
												}
											}
										}
									}
								}
							}
						} // end else
					}
				},
				updateCameraPos: function() {
					if (LT.options.showMiniMap) {
						cp = this.getContinentPrefix();
						if (LT.a.visMain.mapmode == "r") {
							this.updateLabels(cp);
							this.updateContinent();
							if ((cp.py*10+cp.px) != this.prevCont) {
								this.drawMap("c");
								this.prevCont = cp.py*10+cp.px;
							} else {
								this.drawMap("p");
							}
							camX = ((cp.cx%100)*2)-5;
							camY = ((cp.cy%100)*2)-4;
							if (camX < 0) camX = 0;
							if (camX > 188) camX = 188;
							if (camY < 0) camY = 0;
							if (camY > 188) camY = 188;
							this.camera.set({marginLeft: camX, marginTop: camY});
							this.worldCamera.set({marginLeft: (Math.floor(cp.csx+camX/2)/7)*2-4, marginTop: (Math.floor(cp.csy+camY/2)/7)*2-4});
						} else if (LT.a.visMain.mapmode == "c") {
							this.updateLabels(cp);
							if ((cp.py*10+cp.px) != this.prevCont) {
								this.drawMap("c");
								this.prevCont = cp.py*10+cp.px;
							}
						}
					}
				},
				updateLabels: function(o) {
					this.contLabel.setValue("c" + (o.py*10+o.px));
					this.coordLabel.setValue(o.cx + ":" + o.cy);
				},
				drawWorldGrid: function() {
					cont = new qx.ui.container.Composite(new qx.ui.layout.Grid());
					contStr = "|" + this.playerCont.join("|") + "|";
					for (i=0; i<7; i++) {
						for (j=0; j<7; j++) {
							cell = new qx.ui.basic.Atom(""+j+""+i).set({ textColor: "#ccffcc", backgroundColor: (contStr.indexOf("|"+j+""+i+"|") != -1 ? "#007700":"#005500"), height: 28, width: 28, center: true, font: "bold", decorator: new qx.ui.decoration.Single(1, "solid", "#003300") });
							cont.add(cell, {column: i, row: j});
						}
					}
					this.worldGrid.add(cont);
				},
				minimizeMap: function() {
					this.miniMapCont.setVisibility("excluded");
					this.restoreBtn.setVisibility("visible");
				},
				restoreMap: function() {
					this.miniMapCont.setVisibility("visible");
					this.restoreBtn.setVisibility("excluded");
				},
				getAllyRelation: function(id) {
					if (id == -1) return -1;
					agi = webfrontend.data.Alliance.getInstance();
					if (id > 0 && id == agi.getId()) return 0;
					rd = agi.getRelationData();
					for (r=0; r<rd.length; r++) {
						if (rd[r].a == id) {
							return rd[r].r;
						}
					}
					return 4;
				},
				getCityType: function(cid, aid) {
					ct = -1;
					if ((cid >= 0 && cid <= 7) || (cid >= 30 && cid <= 37)) ct = 2; // non castle city
					else if ((cid >= 10 && cid <= 15) || (cid >= 40 && cid <= 45)) ct = 3; // castle
					else if ((cid >= 20 && cid <= 24) || (cid >= 50 && cid <= 54)) ct = 3; // palace
					if (aid == -1) return ct+10;
					if (aid == -2) return ct-2;
					rt = this.getAllyRelation(aid);
					return (ct == -1) ? -1 : rt*2 + ct;
				}
			}
			// .id in webfrontend.vis.WorldCity
			// noncas nonlaw 0-7
			// cas nonlaw 10-15
			// pal nonlaw 20-24
			
			// noncas law 30-37
			// cas law 40-45
			// pal law 50-54
			
			// noncas ruins 60
			// cas ruins 70
			// pal ruins 80
		});
	
		// start:LTT
		qx.Class.define("louTweak.turboUtils", {
			extend: qx.core.Object,
			construct: function () {
				LT.debug("turboUtils-Constructed");
				this.messageQueue1=new Array();
				this.messageQueue2=new Array();
			},
			statics: {
				messages: {
					"NO_BUILD_SLOTS": "No free building slots",
					"NO_MATCH_BUILDNG": "No buildings match for building upgrade",
					"NO_RES_BUILD": "Insufficient resources for building upgrade",
					"MAX_BUILNG_LIMIT": "Max building limit reached",
					"MAX_UNIT_LIMIT": "Max units limit reached",
					"NO_UNIT_SLOTS": "No free units slots",
					"NO_L10_MOONGLOW": "No Level 10 Moonglow Tower",
					"RECRUIT": "Recruiting new units",
					"NO_RES_UNIT": "Insufficient resources for recruiting units",
					"INVALID_SHARESTRING": "Invalid Sharestring for city plan (auto-build)",
					"ARMY_UNDEFINED": "No valid army set in auto-attack options",
					"ATTACK_TARGET_UNDEFINED": "No valid attack destination set in auto-attack options",
					"BUILDING_NOT_ALLOWED_TH": "Unable to build 1 or more buildings - your townhall level is not high enough",
					"NO_RES_ADDBUILD": "Unable to build 1 or more buildings - insufficient resources",
					"ANOTHER_OBJ_EXISTS_ADDBUILD": "Unable to build 1 or more buildings - a resource or another building already exists there.",
					"DONE_ADDBUILD": "Completed adding all your planned buildings",
					"ARMY_NOT_READY": "Attack not sent - required units are being recruited or not returned from another mission",
					"DONE_PURIFY": "Resources purified"
				},
				messageLevels: {"I":"Information", "W":"Warning","E":"Error"},
				messageTemplate: '<a href="#" onclick="alert(\'%fullLevel%\\n%city%@%dateTime%:\\n%message%\'); return false;">%index%</a>: %level%-%message%%count%',
				MAX_MESSAGE_SIZE:100
			},
			members: {
				messageQueue1: null,
				messageQueue2: null,
				// note that not passing serverid or cityid will not assume the default server or city. Use the getObjectFromLocalStorageSC() version below for that
				getObjectFromLocalStorage: function(property, serverid, cityid) {
					LT.debug(property+"_"+ serverid +"_"+cityid, true);
					mainDataStr=localStorage.getItem("LoUTweakTurboData");
					if (mainDataStr) {
						mainData=qx.lang.Json.parse(mainDataStr)
					} else {
						return null;
					}
					if (typeof serverid === 'undefined') {
						obj = mainData[property];
					} else {
						if (!mainData[serverid]) {
							return null;
						}
						if (typeof cityid === 'undefined') {
							obj=mainData[serverid][property];
						} else {
							if (mainData[serverid][cityid]) {
								obj=mainData[serverid][cityid][property];
							} else {
								return null;
							}
						}
					}
					return obj;
				},
				// note that not passing serverid or cityid will not assume the default server or city. Use the setObjectIntoLocalStoragesc version below for that
				setObjectIntoLocalStorage: function(property, obj, serverid, cityid) {
					LT.debug(property+"_"+ obj+"_"+ serverid +"_"+cityid);
					mainDataStr=localStorage.getItem("LoUTweakTurboData");
					if (mainDataStr) {
						mainData=qx.lang.Json.parse(mainDataStr)
					} else {
						mainData={};
					}
					if (typeof serverid === 'undefined') {
						mainData[property]=obj;
					} else {
						if (!mainData[serverid]) {
							mainData[serverid]={};
						}
						// If cityid passed, set key-value under the cityid in this server. Else directly set key-value into server.
						if (typeof cityid === 'undefined') {
							mainData[serverid][property]=obj;
						} else {
							if (!mainData[serverid][cityid]) {
								mainData[serverid][cityid]={};
							}
							mainData[serverid][cityid][property]=obj;
						}
						mainDataStr = qx.lang.Json.stringify(mainData);
						localStorage.setItem("LoUTweakTurboData", mainDataStr);
					}
				},
				clearObjectFromLocalStorage: function(property, serverid, cityid) {
					this.setObjectIntoLocalStorage(property, null, serverid, cityid);
				},
				// this is the shortcut version for getting property from current server and city, even if you dont pass the server and city id arguments
				// Note: to put at application level or server level, use getObjectFromLocalStorage() above with no server and city id or no cityid respectively
				getObjectFromLocalStorageSC: function(property) {
					return this.getObjectFromLocalStorage(property, webfrontend.data.Server.getInstance().getName(), webfrontend.data.City.getInstance().getId());
				},
				// this is the shortcut version for setting property into current server and city, even if you dont pass the server and city id arguments
				// Note: to put at application level or server level, use setObjectIntoLocalStorage() above with no server and city id or no cityid respectively
				setObjectIntoLocalStorageSC: function(property, obj) {
					this.setObjectIntoLocalStorage(property, obj, webfrontend.data.Server.getInstance().getName(), webfrontend.data.City.getInstance().getId());
				},
				refreshOptionsPage: function() {
					if (!cityList.getSelection()[0]) {
						this.loadAndInitialiseCitiesList();
					}
					this.updateCitySpecificTurboCheckboxes(cityList,refreshCBArray);
					this.updateAllCitySpecificControls(cityList,autopurifyThreshold);
					this.displayMessages();
				},
				loadAndInitialiseCitiesList: function() {
					cities=webfrontend.data.Player.getInstance().cities;  
                LT.debug("loading cities");  
                if (cities && cityList && cityList!=null) {  
                    tmpCityArr = new Array();  
                    citycount=0;  
                    for (var tmpCity in cities) {  
                        tmpCityArr.push(cities[tmpCity].name);  
                        citycount++;  
                    }  
                    tmpCityArr.sort();  
                    cityList.removeAll();  
                    cityList.add(new qx.ui.form.ListItem("Default", null, "DefaultCity"));  
                    for (var i=0; i<tmpCityArr.length; i++) {  
                        //citycount=0;  
                        for (var theCity in cities) {  
                            if (cities[theCity].name == tmpCityArr[i]) {  
                                cityList.add(new qx.ui.form.ListItem(cities[theCity].name, null, theCity));  
                                if (this.getCitySpecificTurboProperty("autopurifyThreshold", theCity) == null) {  
                                    this.setCitySpecificTurboProperty("autopurifyThreshold",90,theCity);  
                                }  
                            }

                            //citycount++;  
                        }     
                        }  
                    LT.debug(citycount + " cities loaded.");  
                    }   
                },
				// this is a method to set specificed city's property on current server
				setCitySpecificTurboProperty: function(property, objval, cityid) {
					serverid=webfrontend.data.Server.getInstance().getName();
					if (!cityid) {
						cityid=webfrontend.data.City.getInstance().getId();
					}
					this.setObjectIntoLocalStorage(property, objval, serverid, cityid);
				},
				// this is a method to set property specific to current city and server
				getCitySpecificTurboProperty: function(property, cityid) {
					serverid=webfrontend.data.Server.getInstance().getName();
					if (!cityid) {
						if (LT.options.useDefaultCityTurboSettings) {
							cityid="DefaultCity";
						} else {
							cityid=webfrontend.data.City.getInstance().getId();
						}
					}
					value=this.getObjectFromLocalStorage(property, serverid, cityid);
					// if the city property was never defined, then use the respective property defined for Default city
					if (typeof value == 'undefined') {
						value=this.getObjectFromLocalStorage(property, serverid, "DefaultCity");
					}
					// if still undefined, return false
					return (typeof value == 'undefined'?false:value);
				},
				applyCurrentToAll: function(cityList,refreshCBArray) {
					if (cityList.getSelection()[0]) {
						selectedCityId=cityList.getSelection()[0].getModel();
						cities=webfrontend.data.Player.getInstance().cities;
						if (cities) {
							cities["DefaultCity"]="Default";
							for (var theCity in cities) {
								for (i=0;i<refreshCBArray.length;i++) {
									property=refreshCBArray[i].getModel();
									value=LT.main.turboUtils.getCitySpecificTurboProperty(property, selectedCityId)
									LT.main.turboUtils.setCitySpecificTurboProperty(property,value,theCity); 
								}
								value=LT.main.turboUtils.getCitySpecificTurboProperty("autopurifyThreshold", selectedCityId)
								LT.main.turboUtils.setCitySpecificTurboProperty("autopurifyThreshold",value,theCity); 
							}
						}
					}
				},
				updateAllCitySpecificControls: function(cityList,autopurifyThreshold) {
					LT.debug('entered updateAllCitySpecificControls');
					if (cityList.getSelection()[0]) {
						selectedCityId=cityList.getSelection()[0].getModel();
						value=this.getCitySpecificTurboProperty("autopurifyThreshold", selectedCityId);
						autopurifyThreshold.setValue(value + "")
					}
					LT.debug('finished updateAllCitySpecificControls');
				},
				updateCitySpecificTurboCheckboxes: function(cityList,refreshCBArray) {
					//if (bypass && !(bypass instanceof qx.event.type.Event)) {
					// the above condition is a confusing piece of code added only, because I was running out of time and had no other way to have this method called from an event as well as from code directly while also getting the 2 'this' arguments to work.
						//this.cityList=bypass.cityList;
						//this.refreshCBArray=bypass.refreshCBArray;
					//}
					if (cityList.getSelection()[0]) {
						selectedCityId=cityList.getSelection()[0].getModel();
						for (i=0;i<refreshCBArray.length;i++) {
							property=refreshCBArray[i].getModel();
							LT.debug("updating checkbox for" + property);							
							if (property) {
								if (this.getCitySpecificTurboProperty(property, selectedCityId)) {
									refreshCBArray[i].setValue(true);
								} else {
									refreshCBArray[i].setValue(false);
								}
							}
						}
					}

					LT.debug("Checkboxes updated");
				},
				addMessage: function(theMsg, level) {
					if (!level) level="W";
					
					if (this.messageQueue2.length>=(this.self(arguments).MAX_MESSAGE_SIZE/2)) {
						this.messageQueue1=this.messageQueue2;
						this.messageQueue2=new Array();
					}
					
					tmpMessage={"city":webfrontend.data.City.getInstance().getName(), "level":level, "msgKey":theMsg, "dateTime":(new qx.util.format.DateFormat("dd:MMM:yy HH:mm:ss zzz").format(new Date()))};
					if (this.messageQueue1.length<(this.self(arguments).MAX_MESSAGE_SIZE/2)) {
						this.messageQueue1.push(tmpMessage);
					} else {
						this.messageQueue2.push(tmpMessage);
					}
					this.updateMessageNotificationStatus();
				},
				updateMessageNotificationStatus: function() {
					btnLabel='O';
					if ((this.messageQueue1.length+this.messageQueue2.length)>0) {
						btnLabel+= ' *';
					}
					LT.main.optBtn.setLabel(btnLabel);
				},
				// this gets the messages

				displayMessages: function() {
					allMessages="";
					messageQueue = this.messageQueue1.concat(this.messageQueue2);
					//messageQueue.reverse();
					if (messageQueue.length>0) {
						msges =[]; counter=-1;prevMsg=""; prevLevel="";prevDate="";prevMessage={"city":"", "level":"", "msgKey":"", "dateTime":null}
						
						msgCounter=0;
						if (messageQueue.length>0) {
							prevMessage=messageQueue[0];
							for (i=0;i<messageQueue.length;i++) {
								if (prevMessage["msgKey"]==messageQueue[i]["msgKey"] && prevMessage["city"]==messageQueue[i]["city"]) {
									counter++;
								} else {								
									// the below section just uses a predefined template and then replaces the placeholders with the values in data
									prevMessage["fullLevel"]=this.self(arguments).messageLevels[prevMessage["level"]];
									prevMessage["message"]=this.self(arguments).messages[prevMessage["msgKey"]];
									prevMessage["index"]=++msgCounter;
									prevMessage["count"]=counter>0?' ('+counter+')':'';
									tempStrBuf=this.self(arguments).messageTemplate.replace(/%(\w*)%/g,function(th,key){return prevMessage.hasOwnProperty(key)?prevMessage[key]:"";});
									
									msges.push(tempStrBuf);
									counter=0;
									prevMessage=messageQueue[i];
								}
							}
							prevMessage["fullLevel"]=this.self(arguments).messageLevels[prevMessage["level"]];
							prevMessage["message"]=this.self(arguments).messages[prevMessage["msgKey"]];
							prevMessage["index"]=++msgCounter;
							prevMessage["count"]=counter>0?' ('+counter+')':'';
							tempStrBuf=this.self(arguments).messageTemplate.replace(/%(\w*)%/g,function(th,key){return prevMessage.hasOwnProperty(key)?prevMessage[key]:"";});
							msges.push(tempStrBuf);
						}
						msges.reverse();
						allMessages=msges.join("\n<BR/>");
					} else {
						allMessages = "";
					}
					messageDisplay.setValue(allMessages);
				},
				clearMessages: function() {
					this.messageQueue1=new Array();
					this.messageQueue2=new Array();
					LT.main.optBtn.setLabel('O');
					messageDisplay.setValue('');
				}
			}
		});
	}
	// end:LTT
	
	function LT_checkIfLoaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					createTweak();
					window.louTweak.main.getInstance().initialize();
				} else
					window.setTimeout(LT_checkIfLoaded, 1000);
			} else {
				window.setTimeout(LT_checkIfLoaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(LT_checkIfLoaded, 1000);
			
}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var louTweakScript = document.createElement("script");
		txt = LT_mainFunction.toString();




		louTweakScript.innerHTML = "(" + txt + ")();";
		louTweakScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louTweakScript);

	
})();