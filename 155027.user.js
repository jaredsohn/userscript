
// ==UserScript==
// @name           Scripts LoU 
// @description    Ajoute diverses fonctionnalités de Lord of Ultima



// ==UserScript==
// @name           LoU Tweak
// @description    Adds various functionalities to Lord of Ultima
// @namespace      AmpliDude
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.7.6
// @grant          GM_log
// ==/UserScript==

(function(){

var LT_mainFunction = function() {

	function createTweak() {
		var LTversion = "1.7.6";
		var louTweak = {};
		var LT = {};
		
		LT_strings = {
			"0": { /* english */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"1": { /* german */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"2": { /* spanish */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"3": { /* polish */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"4": { /* portuguese */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"5": { /* russian */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"6": { /* italian */
				"options_btn_tt": "Clicca per mostrare le opzioni di LoU Tweak",
				"layout_btn_tt": "Clicca per creare un layout Sharestring per questa citta'",
				"chat_btn_city": "Citta'",
				"chat_btn_player": "Giocatore",
				"chat_btn_alliance": "Alleanza",
				"chat_btn_url": "Link",
				"copy_coords_btn": "Copia Coordinate nella Chat",
				"up_count_tt": "Edifici Potenziabili:",
				"opts_max_chatlines": "Numero massimo di lnee in chat:",
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
					"show_lawless": "Senza Legge",
					"show_moongate": "Moongates",
					"show_shrine": "Santuari",
					"clr_self": "Mie:",
					"clr_alliance": "Alleanza:",
					"clr_allied": "Alleate:",
					"clr_enemy": "Nemiche:",
					"clr_nap": "PNA:",
					"clr_other": "Altre:",
					"clr_lawless": "Senza Legge:",
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
			},
			"7": { /* french */
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
				"btn_support_hide": "Hide Support labels",
				"copy_to_chat": "Copy Share report ID to chat"
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
				lastSendCommand: null,
				sendCommandBuffer: null,
				sendCommandBusy: null,
				reportPageListener: null,
				cTradeInfoView: null,
				getUseBtnVisibility: null,
				getUseCont1: null,
				getUseCont2: null,
				getUseCont3: null,
				cCmdInfoView: null,
				moveBuildingDetView: null,
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
					
					this.bDetView = this.app.getBuildingDetailView();
					this.bPlaceDetView = this.app.getBuildingPlaceDetailView();
					
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
					this.lastSendCommand = 0;
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
		 //try {
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
					btn = new qx.ui.form.Button("O");
					btn.set({width: 30, appearance: "button-text-small", toolTipText: L("options_btn_tt")});
					btn.addListener("click", this.showOptionsPage, this);
					this.srvBar.add(btn, {top: 2, left: 390});
					
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
					//this.reportPageListener = this.app.getReportPage().reportBody.addListenerOnce("addChildWidget", this.tweakReport, this);
					
					// ***** Copy Share report ID to chat ***** //
					btn = new qx.ui.form.Button("To chat");
					btn.set({width: 45, appearance: "button-text-small", toolTipText: L("copy_to_chat")});
					btn.addListener("click", function() {
						reportId = this.app.getReportPage().contractData.objShareId.sFormated
						if (this.chat.chatLine.getValue() == null) this.chat.chatLine.setValue("");
						this.chat.chatLine.setValue(this.chat.chatLine.getValue() + " " + "[report]" + reportId + "[/report]");
					}, this);
					this.app.getReportPage().getLayoutChildren()[2].removeAt(1);
					this.app.getReportPage().getLayoutChildren()[2].addAt(new qx.ui.core.Spacer(10), 1);
					this.app.getReportPage().getLayoutChildren()[2].addAt(btn, 1);
					this.app.getReportPage().getLayoutChildren()[2].addAt(new qx.ui.core.Spacer(10), 1);
					
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
		 // } catch (e) {
			 // console.log(e);
		 // }
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
				cityObject: function(_action, _buildingId, _buildingType, _upgrades, _minister) {
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
					_cid = webfrontend.data.City.getInstance().getId()
					for (o=0; o<_upgrades; o++) {
						//console.log({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});
						this.sendCommandBuffer.push({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});
					}
					if (!this.sendcommandBusy) {
						this.sendCommandBusy = true;
						this.sendCmd();
					}
				},
				sendCmd: function() {
					if (this.sendCommandBuffer.length == 0) {
						this.sendCommandBusy = false;
						return;
					}
					currentTime = new Date().getTime();
					if (currentTime > this.lastSendCommand+500) {
						cmd = this.sendCommandBuffer.shift();
						//LT.debug(cmd.a + ", " + cmd.p);
						webfrontend.net.CommandManager.getInstance().sendCommand(cmd.a, cmd.p, this, function(){});
						this.lastSendCommand = currentTime;
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
				upgradeLowestLevelBuilding: function(_type, _minis) {
					if (this.app.visMain.mapmode != "c") return;

					c = webfrontend.data.City.getInstance();
					tw = parseInt(c.getResourceCount(1));
					ts = parseInt(c.getResourceCount(2));
					bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
					bqcur = c.buildQueue;
					bqcur = (bqcur != null) ? bqcur.length : 0;
					freeS = bqmax - bqcur;
					if (freeS == 0) return;
					
					buildingTypes = {
						"T":"|38|39|40|41|42|43|44|45|46|",
						"M":"|15|16|17|18|19|21|36|37|",
						"R":"|1|2|3|6|47|48|49|50|",
						"C":"|4|",
						"B":"|14|",
						"U":"|5|7|8|9|10|11|12|13|20|22|",
						"A":"|"+this.options.lowestLevelUpgradeIDs.join("|")+(this.options.lowestLevelUpgradeIDs[0] != "" ? "|1" : "")+(this.options.lowestLevelUpgradeIDs[1] != "" ? "|2" : "")+(this.options.lowestLevelUpgradeIDs[2] != "" ? "|3" : "")+(this.options.lowestLevelUpgradeIDs[5] != "" ? "|6" : "")+"|"
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
					_bTable = this.getValidBuildings(buildingTypes[_type]);
					ud = {"wl":tw, "sl":ts,"a":[]};
					for (j=0; j<freeS; j++) {
						_bTable.sort(function(a,b){return a[1]-b[1];});
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
					for (i=0; i<ud.a.length; i++) {
						this.cityObject("UpgradeBuilding", ud.a[i][0], ud.a[i][1], 1, ud.a[i][2]);
					}
				},
				getValidBuildings: function(_ids) {
					c = webfrontend.data.City.getInstance();
					th = c.getTownhallLevel();
					this.getCity();
					_arr = new Array();
					_wallIn = false;
					for (k=0; k<this.city.length; k++) {
						if (_ids.indexOf("|" + this.city[k][2] + "|") != -1 && this.city[k][1] < 10 && this.city[k][1] > -1) {
							if ((_wallIn && this.city[k][2] == 23) || this.self(arguments).bd[this.city[k][2]].th > th)
								continue;
							_arr.push(this.city[k]);
							if (this.city[k][2] == 23)
								_wallIn = true;
						}
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
				debug: function(s) {
					if (typeof console != 'undefined') console.log(s);
					else if (window.opera) opera.postError(s);
					else GM_log(s);
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
				this.queueTimeGrid.add(new qx.ui.basic.Label("BQ:").set({textColor: "text-gold", font: "bold"}), {column:0, row:0});
				this.queueTimeGrid.add(new qx.ui.basic.Label("UQ:").set({textColor: "text-gold", font: "bold"}), {column:0, row:1});
				this.buildQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.buildQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.unitQueueTimeLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
				this.unitQueueSlotsLabel = new qx.ui.basic.Label("").set({textColor: "text-gold", font: "bold"});
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
				this.incResLab = new qx.ui.basic.Label("Incoming resources").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLab, {left: 8, top: 3});
				this.incResLabNext = new qx.ui.basic.Label("Next arrival in:").set({font: "bold", width: 150, textAlign: "right", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabNext, {left: 180, top: 3});
				this.incResLabTr = new qx.ui.basic.Label("TR:").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabTr, {left: 6, top: 38});
				this.incResLabFs = new qx.ui.basic.Label("FS:").set({font: "bold", textColor: "#ffCC82"});
				this.incResCont.add(this.incResLabFs, {left: 7, top: 50});
				for (i=0; i<4; i++) {
					imgo = m.getFileInfo(m.resources[i+1].i);
					incResImg = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(imgo.url));
					incResImg.setHeight(22);
					incResImg.setWidth(20);
					incResImg.setScale(true);
					this.incResCont.add(incResImg, {top: 17, left: 5 + 83*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
					this.incResCont.setUserData("incResLab" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 21, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
					this.incResCont.setUserData("incResLabTot" + (i+1), incResLab);
					this.incResCont.add(incResLab, {top: 38, left: 27 + 82*i});
					incResLab = new qx.ui.basic.Label("").set({width: 62, textAlign: "center", font: "bold"});
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
						this.incResLabNext.setValue("Next arrival in: " + webfrontend.Util.getTimespanString(timeSpan));
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
				this.setTitle("LoU Tweak Options");
				this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
				this.tabPages = [
					{name:"General", page:null, vbox:null},
					{name:"Hotkeys", page:null, vbox:null},
					{name:"Colors", page:null, vbox:null}
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
				
				sp = new webfrontend.ui.SpinnerInt(0, (100-parseInt(LT.options.chatOpacity)), 100);
				sp.getChildControl("textfield").setLiveUpdate(true);
				sp.getChildControl("textfield").addListener("changeValue", function() { _val = parseInt(this.getValue()); LT.options.chatOpacity = 100 - _val; LT.a.chat.BgrLabel.setOpacity((100-_val)/100); }, sp);
				LT.a.setElementModalInput(sp);
				cont.add(sp);
				this.tabPages[0].vbox.add(cont);
				this.tabPages[0].vbox.add(new qx.ui.core.Widget().set({ backgroundColor: "#bd966d", height: 1, allowGrowX: true}));
				// ----- -----
				
				// ----- Hide 'Get & U se' buttons
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
				}			
				this.tabPages[0].vbox.add(cont);				
				
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
/* marketplace */	"5": "data:image/png;base64,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",
/* iron mine */		"49": "data:image/png;base64,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",
/* sawmill */		"7": "data:image/png;base64,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",
/* mill */			"8": "data:image/png;base64,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",
/* hideout */		"9": "data:image/png;base64,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",
/* stonemason */	"10": "data:image/png;base64,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",
/* foundry */		"11": "data:image/png;base64,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",
/* town house */	"13": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUvklEQVR4XmV52XMc13lv9+nT+z4rZoDBRoAgQVKURIq+smTLqmvZsVWJnXLsKjvXsStVeUhV/oa85ikPqcpLKqqKnYorqcSuXMsP11d2bIuWZEkUSXEDCRIgQGyDWTBLL9N7d77TMwAV+aCnMdNzlu98y+/7fWdoaNQnGvn4e408+tTzLIMbvD41NsuycUfTNBzbDaPouHtGviYjSJ+ThTIqoyfTTxpCCEM7nvETApwIR+7ZZDyZazLv5Cv4kMJi5O9ERJgQ+sdxVCkVkjieiDVZFSYhr4mgJ28mQ08e02mW4mMBTtR2IhbcJmuezAJSEFGO56PRSQ9yk2X5K6//oSrxb7/925HnxnHMMGgsekYauZN5P63mk/lP3qYMjISeDIJGVoEbGr+f/B+3p8Yda5oiT/L+4zH513/23f9z5coVXZdv3PzoxRdfabU6I9eZbJCCnvnAfFQ+z+TJiUCTheA6lofGeCzVU2ngmowcz5qPejr45FtE5cKRKwz96eny+9duLOKMP9y7t38QJbBvNO5wMjD7lEEm7amhoTEoX5nBk5FMfkfwmLyjyHJMPjQfnvch98lFGoUYqtGY/cKrX37ppStbGw9XZWG0v39ze1dlqIChqbwPCHesnlwmIunYmPTYfk/dPn8wEYvFiDweT3IiHP37jSxAxuTjQGLMkIdffu31z3/+pZsffzhLUa37D27v7GdUKjNkQy5xlBMD5hs79tbcBhl14iFPDUKdGJHsARwN7rmc0E4CEHx1ojDiRpOx4xicrNTuNB3HDluHVLd7f3c3plOFRWGasohxiI4nMp1cCMFFxsMtTbPfByBMfUKDaZoSGTKUTcLzOACz9OleCCyQZshSlCSu749d5uzirEj5v7m2wbM0ThGdYY3LWIoOEL3nBjAMRiVpOpkvj8UxYqA8WoneSJvELJhkYpG8O7nIqnkUn2whV2guEIiXd4D5v35q5rOzDZ+iD/pWo1A4lcZvvX+NZSmMUErRhsCCSkxBoFP6YBREcZYkaZyAZFmaTGIvd/+JGYlFJug68a1xpJBux5g5Ca7xnYidd3nqkxQ9W9C/WC/aI1dBaHV+9o8unn3rvQ9EnmEw2RgD20cZy9AKx4Hmh2HkxCnZcgqvsbKfYuWJaZ+qkco9ONfHJ1GDOBkRiKHHzsqyzLhhzIw7Xm5UpzWRybJGo1HV1f/81TsrBT1lwCdoDUShMYdQRZRghJ8GNVne9v08GKk8AI9xNd9zvuBEmhNMZZjjUKePEwPBB1iAmJcGOXiO5VgsCJwosDzLCAJrGMJfvHKeSWhFU/bd8L0bdxq63I9DhQGpUo0VDJaReYFDZA4JM2KS7sUxjUmAUyfZgoIlaJYjq8PHsbNNMgHoBeeKgWti6RxRBR6WxyCHJMLFiyLHspjjmDNnTkWhw3G4lVC1qXJ7EFz/+G5ZFMI0URkcJDHMbHDgVlStbPCqxmPGd0YJ5qs826ZDUH+O8kRVoCaOo+HCmCjxRFVpHhYo1+r4OgH5CWAyGGGWKA384tLcrMoLoDdJ4hVRfG761Mbd3es3bhkC9KBYihpFnsrTCmYP/UjiWYVORkOr74XLZ1cUlJkIFVkYjXgOsRixLOI4uGieR3BhTKSc4E7eUG7ZE/MR8cAv4RqnRzoPK1UQFsPgy1PVQoqquvnq3NK963d2d3eJWTECE3DE7Viw/IHjlXksSpLLaWCI07r08MGDn263ZQGdETURLCBijmc0na1URVFkQCZVY0FKQSDqOGnEi+HfJAnm2MkwY1VNUkVGo1fmG4zjxl4QnL5UHA6v37zDBp7MkQAQGGwIvBMlU7J84MdVnveieGVlbqpkVHRdUcR397vmXNVwAw2lNM9ZdASz8jwsmkoSDVIKkhhHFMsxSZSFYTLBLYzRCTkBqQgNycUyi4LvJaBcgeO+NlNO4qQoCwlDv3X1PTaJeJ4Pk0Qn/sYcjoKyyPfCuASOyDK6yDlRYONIUwRw/1+EXEnlb2/sqoZwvjqz7Q9YgRYVCKoUtCVrktULQS1AgjwvSnPMhDvK4THHujiBhlmUxGm1pkgKAol5gZ6uajQOAioonTsX9g7PqPySqcVJXFck2FGQZc/Wy0axoGOmBlEqKWBCzk8ebfY/TLg3n+ylssbzgPZoreOvtQ4VVshSBA0LPGDsyPFhoUq1BP4KduR5DjN5aoeWjluuvSTJwNShl/S6Pi/IcZjKKosXlhdmF976+C6PBzNSqdkfFkQeOsNOyrIgIqLk6nQtwCwf+EHgh3F8oVxQl89WzpwFPN1/tNnuDso678o0oWAj2rbDIEjhAttJCh9FPugLYTQYgAuQJIAykqqyPJ/k0IGyKIrCKKQZChYAHOE4HoDxYBh/6ZvfBEJbWV6W6AwsCF/pMrixaPkBAPqD3YPED0ZmIfSDekFvO4Pgd++kiF67+vZw5+D5OY2TEOYAubg4SgWsxF7Gs3oWa3GYBWEaBrEzDECIcQJkqGNOkUNFNk6OYyJm6GqhoF48tagMBx33yWDnji5gTuHwKIMtG6KgC3wviJfqFQDGNIobqvjb9Y31vnNhqmDToaErbPcJDuMry4U7R07I6YB+kiyCO7IMWYdhBVmSPTcytEqvfwTrgv0h+nwvZiblwoTXIkxilQWMBTOrsrA631ii8EcD5/IXv33u0ovrN65uO+hs0YwGlsjhJ7Y/q8mFqok0raAKdho/YcG4iSmw3TiuGOwwzhoV7f89anf6o5XVlZHtMJyYxsQmeQBGNAK3iTzPTqkUAMW2AriItkCek3oB3EiWhMZMlUriqWrxXGN6BTH3Rkcvf+bZaPf93bUPfNdZWloKzQWutTfw4wVTbdqurLMu4/IqH4fonlAKXPvd9Z2CwkqCeHq2+qvNzhpdaWBn7vRSc68VpowXxgCMsHOOY+MoJiSPTsvFhtV3kyxOEyoKUzTJ02BzHqsyX6uWYj+pFM3PLy/KrjVYOHfxuRf3P/z1IEQvf+OvXM+/t9WqaFb9mWcBxx+1e0UeH2x1H+4nbaX2y2YvouiSoYqY3R94Hzd7/3h17Z6Din6HF3iv3yGMBSyIWQimwAcJGI7lGYTBgQ/297zQF2WO50kkThIi4CxPkiAHwlZKZr2kSygRi5TfvFsW9GDfOXzc2rz1C1FXn/vit3e3DzzvCe9hU+QGKaXJ4gwVT734cizJM6YMCQBi29TFdkR5GVNQuT6tyl7XjgC4M8TLIFwQBAlJJiAlBpz0g8gLQnjuj5J6pT4YDAlLHle8hL5ltMBzU5VCuWpiiDEqrl/+k/TuDZ7OACVci8o8ZrD5UWlKfLyzNV2pb23uz5YLHJOxlcrwwbpXLb/z5i9OScLzS+U7ncEI63WVHlKSPjoEv5kqqFbEpMQwEwoKCEAhSB+QzT0IT9CaKDPtds8PYuJbKCcwcJk6RA+wBY6isShKMhNa25tfWF5iwe0kFqK3KkkDOzp42KXSZNftv9JYGHZbdobChFpt1LjO4Yyuz86av358gFWDtTopK+Esmp6pJ8Pe0dYRpcghxYwRUte1KISWjPwgDGMIAgwyo3TkAkBlaEy/CBdElDMaeUEysF3wIdvzQb4zp1bvtrZpU6ZYjCXc8t05Uz1X1T2b2XrseDMNRdcLler8XHn3qLnrjiol/l9ubPSc0fzcdKqYPIqXF2eio+Zgz16Q2Fnbxo4FwARkwho6OTWnYWKR5/icYE0KHPo4EscUZ3wkUTCMStnkBUFBYftouznsWyz7ZG+f45AMXIJHRSAIbnD3qKvPKOcrNdVUj4LhzjApl6X/e2/H4oyGlMjlWtbcOHX+mfbDB8O94eVKAcwHaLoiYUMWDsMYY5bK43FcU0FUapqZRKRccEcB0RbLEoJBMwRjVVkumkatWqlVqil4o1Jbni5eeeXVi9/5S6t6uuPFiMt8ml4bOKzADFJjG8DbC2WsvHB26ofv3R/IlamglWRI5Fmsl3fW7ll71pKupJjSRK5WUJWCEAytF2Qs0THDgqaIluAfUIFWuw3m8v0op9a5A4LuwGSqKpWK+nS9XDB0QB0G0XlFEL35zz9oX/3BZ5+tLn71W8PGhWHqNzngBayOvUvf+j6jSnY0+pu31tTZRaG1EUiFOM28MHUPD1DHq8mAaMB8RozIpmw6CJNaVS2YiArBpcYJkE7SNIoSALM0BfESelyLyYChAjM1VSroeh2SuSKGgQ/fiEnfGQ6mi8JInxNf+/NrP/qHsL+FQsssoHuHkcYlQ9udLbHr67f/6XebyLeMZGQVF43BE8wL7UePMjtTeLZhaF6WxQyer5T8LCpWdDcKrm62B0jJj6JIi5IkjCIAC5KFMxqIDCgS6SYvqzgIE4FjFWAEoO0pk6ETmleH7YOynK3vOhX7kSBwhe/89dbP/52h4tv39yAxv/iVbzZvXWVxEkjlwPW8+rLaelhZWmpuPOECNKcpMkaGxHfT4OJMA5i1WdGB6P/w2hOscX4ApJD1fD+vfBAQj5RwK1A00RwACgKyZVtRuSzPnVJAk0VTsmxP00WYojK/GnY2zyzM6JdevfnO78QsEJ0Da2iP5LpOjXaerNWrpsIiXJy12k05cqYXGuvvf+zb0XJRL4l8UeKHaTClK1VVZgzloNP+ye1dbuVSiekPbQpjCiQDRwnCIEliolOWjqIU5MFpRlhDoSAuLGocogp1QVIzXcNxMLLsrMBpR1Ttg9+8P7t298KMoWi4zeGmF0KEQwwZ1VPLL//x4KOfuIOeN3LOPXfh6jsfUYy4YtIqOGYalioNPUtnK4WQBkZK/fi3h6UpjbgOxhkD9AkUE4DzgnAIAwXJfD9BDB0nKSPwzEy9+P3vftvqHxSLGBQWJ6Pe8CBlaQ2cWRBffPXrO2vv3nhsP97tHj5cg9ANQhIIw4HDScpzZ2eC/v61OzuAm7fXd4wpOWO4EcfB4qcKOgBSvTYVZnHCh3/77lbj7BkxPZrV6e2DoyTBxOEpUtezHAZJNVlmWV7XSt1un5EkfGF18bB9c+GMPHtK294YeHZ0YeWrzccbnIQ5DkchHzQfzn3utUwr2Z32g2ZY1uhbm0MniFbnTbq37tjWXj/c6dmzy1UKZb5Hnzk95ynSoG89v9CImLgbDP7u7Tu4OmMqEgr66xst12XJkQBgE4MLplIqqDSV8Grq+d7OTgdgHwPR3t7dWl4pZO7M9qPtQpnnBeb+1ptI0rzQQ641U6Mh2Xvtdr2kTc3ry/rqxsMHz592I0YVp07f3tv0+t3NjtdomCKv0VTP41GtWjAN7cat9Ecf3v7Kxfk3trLV51Zta6ik3v19O4x4UZZ5ga1Vi5ghFYM1tIDOUAl4PVZUwXF8RlE4TmCiIL7wApPEsT1MOvtxHHMxBGImJRRzbvUz7cPHM1RnMLB91zp7+ZXnZqU1WzClWAn3q/PnykurjtXk+oNKoza0+2nKQ8yaqvy5Kxemzpz9+5/9f6a+XJWo0G7tN32wlW4UlhYbiwuzgOyQX5I4kGWVQ8iL3KNucNR1ISBRoaD8r8/NfuF/zyOG9WNWUY2Z+vksQAoq0gzrxd1rt/9r6dKXBuaztKDuW1F9ZhpWlRW5qHBa4wyklOl6PYmimQLgOtAqHjHU+bPTz55fYjA7UyueWpqeZVqD1ubefiSK5dWVM8+fP12vVOMwNhRZExhd1SjOUitIEGRw3JELoBEAYCShnyWJcrDjS9S83eGA/M9PP8OLRhoL1Mi4d/PBj3/6hpe0nrn88le/9qdZSrfbBy8UHIx5mufTJOsfWYamIMwGod/sevYofvPX13/2899UNHSmofKcZw3a3S5aWlpeXVlkMdgkCXynZKo8Q3OsEDPtSiNrdwatlmOaZfBmAqeQGo864DkB0Ize0YhnNVoIRv4oizOMGdAn5ChdLQ77R2v3b/TdliobcmE2YvD+9iN3+54xs2yWS9c+fC+LqbvbPYqSgAwzFJdQ/Ie37rcGg7v3dmWxfPr0WSAxtmX7IbB1SxZYiM6Yis2C3h0+7nVR/yhALOp2wM0c4DnYdf0kjdIskeUybH1oHxZ9BvlYU0xNk0RJlRMmikJVrgIXGrZG/3H/35bOlVfmL379e99YX+ueXrn43gcfxLR8v+NxomwWzaX5OZGDKAOjSJvb+/ML51wv2t7ZQYgByTw/ZEFqDk9Ncbs7DyuUgkVBZKmZUxLLId/taypyXYQRgzRVqFYV16YxAlfJei22XFCKZT2Igm7X1g0jTZ0sRcVCCZ6UqqWUGd26f2u7czceoKma0evsKgZOUmNpcY7FnGU7No0UUbKGHaCfrc6gP7Ag8QGFSvOfJ2jEDUd9ZAfnX9JGbtg59DqHfhRRWEA7Ox5DiRTl0pABzYJIE/IvSCI5yjMMfbFRFEyfTkSJKfYGVhBGQNgpyPaIHLsBzU6yWJRiN9ge9kY0LQWxHAcsJLQkyaI4BZVAMsl/IKFbnQ48BEoFA6cqFUlGgO7VWZjErzXMJ496naMRoqNux3+43gMIEHiIaRvDPhw7pEmxMT48ko1SCtnw6CAQuKzjH5KlEHAPIHHppReufHTtg2azVa/XAIdWr5QOd0a9wdA5HFpDZtC3o5icJnuehxlMmCcHd4oXRImc8KblBsUJGRVLhaq7v5ketZyRlSkGEiS8v+/R4GoliKEUO/nBKcvRgQ+cL4Xt1mfkQoE/aHatvp8xIXgVlWHHsfqW0zzsXrt+ve/YFIXjaKSYCcKpyKu+F4eZZw0Dy7JhHtuBisF3vQD8VTUQosJiiZ+qGpU6qtSZxBVDL3n9te+dP3v53V9effC4pcvm1pP2vVtHwOvBytYgiKLc1vmxdhbHkDhjRRFsO9p63HZ8G/ORM/IPmrvrj5pRHPf6fS8EVBmxLF2qCpxId1vxrRv7/iiVFDYiOgqtgQv6IkVClmEGgbFVXSpXVElmBFHY3Qim6zXIIhvrH7/xxr9uNY92doY0Yr/2B6/funkLC4xjAfU6PoXOFYZyW9GSxEoy7h35efHIAEIGgReToo7CHEpJbqUrVVXVcBim3c7I86JSUdV0wR56jgP8hOwxjsjckoSrNR3Shm6IrhXEMVGG7fi6JsMOhsPR5Bwkf42raHhC5e2/AbCk53m/umA0AAAAAElFTkSuQmCC",
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
				
				this.louFCPlink = new qx.ui.basic.Label("Open in Flash City Planner 1").set({
					textColor: "#105510",
					rich: true,
					appearance: "clickable-link",
					cursor: "pointer",
					marginLeft: 310
				});
				this.louFCPlink.addListener("click", function(){LT.a.showExternal(this.cityLayout.u);}, this);
				page1.add(this.louFCPlink);
				this.louFCPlink2 = new qx.ui.basic.Label("Open in Flash City Planner 2").set({
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
				open: function() {
					this.win.open();
					this.ssTa1.setValue(this.cityLayout.s);
					this.ssTa2.setValue(this.cityLayout.u);
					this.ssTa3.setValue(this.cityLayout.u2);
					if (this.cityLayouts[this.srvName].hasOwnProperty(webfrontend.data.City.getInstance().getId() + "o"))
						this.olTa.setValue(this.cityLayouts[this.srvName][webfrontend.data.City.getInstance().getId() + "o"]);
					else this.olTa.setValue("");
					this.errorLabel.setValue("");
				},
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
					// !this.validateSharestring(ss) || 
					if (ss == undefined || ss == null || LT.a.visMain.mapmode != "c") return;

					if (!this.cityLayouts[this.srvName].hasOwnProperty(cId)) {
						this.cityLayouts[this.srvName][cId] = ss;
						this.cityLayouts[this.srvName][cId + "o"] = or;
						this.saveCityLayouts();
					}

					this.oObjs = new Array();
					/*
					for (i=0; i<ss.length; i++) {
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
						var url = "http://www.lou-fcp.co.uk/map.php?map=" + ((waterCity) ? "W" : "L");
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
	}
	
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



// ==UserScript==
// @name           LoU BoS
// @description    Additions to Lord of Ultima: summary, food calculator, recruitment speed calculator, combat calculator and various other features
// @namespace      BoS
// @author         Urthadar
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.6.0
// @require        http://sizzlemctwizzle.com/updater.php?id=84343&days=1
// ==/UserScript==







(function wholeBosScriptFunc(){

var main = function bosMainFunc() {


function bosStartIfQooxoodoIsAvailable() {
    if (typeof qx != 'undefined') {
		bosAddMissingQooxoodo();
		bosScript();		    
    } else {
		window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);    
    }
}

function bosAddMissingQooxoodo() {
	/*
	webfrontend.gui.SpinnerInt
qx.util.Json.parse
qx.util.Json.stringify
webfrontend.gui.RowRendererCustom
webfrontend.gui.MessageBox
webfrontend.gui.CellRendererHtmlCustom
	*/
	if (typeof qx.lang == 'undefined' || typeof qx.lang.Json == 'undefined') {
		qx.Class.define("qx.lang.Json", {
			type: "singleton",
			extend: qx.core.Object,
			statics: {
				parse: function(s) {
					return qx.util.Json.parse(s);
				},
				stringify: function(o) {
					return qx.util.Json.stringify(o);
				}
			}
		});
	}
	
	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.SpinnerInt == 'undefined') {
		qx.Class.define("webfrontend.ui.SpinnerInt", {			
			extend: webfrontend.gui.SpinnerInt
		});		
	}
	
	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.RowRendererCustom == 'undefined') {
		qx.Class.define("webfrontend.ui.RowRendererCustom", {			
			extend: webfrontend.gui.RowRendererCustom
		});		
	}

	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.MessageBox == 'undefined') {
		qx.Class.define("webfrontend.ui.MessageBox", {			
			extend: webfrontend.gui.MessageBox,
			statics: {
				messageBox: function(o) {
					webfrontend.gui.MessageBox.messageBox(o);
				}
			}			
		});		
	}

	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.CellRendererHtmlCustom == 'undefined') {
		qx.Class.define("webfrontend.ui.CellRendererHtmlCustom", {			
			extend: webfrontend.gui.CellRendererHtmlCustom
		});		
	}	
}

window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);

var bosScript = function() {

qx.Class.define("bos.Const", {
	statics: {	
		DEBUG_VERSION: true,
	
		TRADE_TRANSPORT_CART: 1,
		TRADE_TRANSPORT_SHIP: 2,
		TRADE_TRANSPORT_CART_FIRST: 3,
		TRADE_TRANSPORT_SHIP_FIRST: 4,
		
		CART_CAPACITY: 1000,
		SHIP_CAPACITY: 10000,
		
		TRADE_STATE_TRANSPORT: 1,
		TRADE_STATE_RETURN: 2,

		GOLD: 0,
		WOOD: 1,
		STONE: 2,
		IRON: 3,
		FOOD: 4,

		ORDER_ATTACK: 0,
		ORDER_DEFEND: 1,
		ORDER_SUPPORT: 2,

		MOONSTONE_COST: 1000,
		
		TABLE_SUMMARY_ROW_BORDER: "2px solid #E8D3AE",
		TABLE_BORDER: "1px dotted rgb(77, 79, 70)",
		TABLE_DEFAULT_COLOR: "#F3D298",
		RESOURCE_GREEN: "#40C849",
		RESOURCE_YELLOW: "#FFE400",
		RESOURCE_RED: "#FF0000",
		
		INF: 1000000000,
		
		REGION_CITY: 0,
		REGION_CASTLE: 1,
		REGION_LAWLESS_CITY: 2,
		REGION_LAWLESS_CASTLE: 3,
		REGION_RUINS: 4,
		REGION_UNKNOWN: 5,

		EXTRA_WIDE_OVERLAY: 999,
		
		FAKE_ATTACK_TS: 4000,
		
		//flood control
		MIN_SEND_COMMAND_INTERVAL: 500,
		
		//server peridically sends new data with new resource levels, updated city orders -> it causes summary to refresh but better not to refresh if very recently there was another refresh
		MIN_INTERVAL_BETWEEN_AUTO_REFRESHES: 5000,
		
		MAX_POPUPS: 10
	}
});

var server;
var locale = qx.locale.Manager.getInstance().getLocale();

var bosLocalizedStrings = {
  "en": {
	"summary": "Summary",
	"combat calculator": "Combat calculator",
	"food calculator": "Food calculator",
	"recruitment speed calculator": "Recruitment speed calculator",
	"jump to coords": "Jump to coords",
	"jump to city": "Jump to city",
	"please enter city coordinates": "Please enter city coordinates (for example 12:34) :",
	"jump to player": "Jump to player",
	"please enter player name:": "Please enter player name:",
	"jump to alliance": "Jump to alliance",
	"please enter alliance name:": "Please enter alliance name:",
	"error during BOS Tools menu creation: ": "Error during BOS Tools menu creation: ",
	"id": "Id", 
	"cityId": "City Id", 
	"from": "From", 
	"type": "Type", 
	"transport": "Transport", 
	"state": "State", 
	"start": "Start", 
	"end": "End", 
	"position": "Position", 
	"target": "Target", 
	"lastUpdated": "Last Updated", 
	"resources": "Resources",
	"filter by trade type": "Filter by: <b>trade type</b>",
	"filter by: transport type": "Filter by: <b>transport type</b>",
	"filter by: resources receiver": "Filter by: <b>resources receiver</b>",
	"you": "You",
	"someone else": "Someone else",
	"filter by: state": "Filter by: <b>state</b>",
	"trade route": "Trade route",
	"OK": "OK",
	"clear": "Clear",
	"max": "Max",
	"please enter some resources amount": "Please enter some resources amount",
	"invalid destination": "Invalid destination",
	"to": "To",
	"ships then carts": "Ships then carts",
	"carts then ships": "Carts then ships",
	"only carts": "Only carts",
	"only ships": "Only ships",
	"group": "Group",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Trade Routes",
	"fromTo": "From/To",
	"action": "Action",
	"status": "Status",
	"wood": "Wood", 
	"stone": "Stone", 
	"iron": "Iron", 
	"food": "Food", 
	"land/sea": "Land/Sea", 
	"edit": "Edit",	
	"options": "Options",
	"table settings": "Table settings",
	"load table settings at start": "Load tables settings at start",
	"table name": "Table name",
	"cities": "Cities",
	"military": "Military",
	"btnLoadTableSettings": "Load table settings",
	"btnLoadTableSettings_toolTip": "Loads previously saved table settings (column order, widths, visibility, sort order)",
	"btnSaveTableSettings": "Save table settings",
	"btnSaveTableSettings_toolTip": "Saves table settings: column order, widths, visibility, sort order",
	"saving cities data": "Saving cities data",
	"cbPersistCities": "Save cities data",
	"cbPersistCities_toolTip": "After navigating to next city previous city is saved to browser local storage.",
	"cbLoadPersistedCitiesAtStart": "Load saved cities data at game start",
	"btnLoadCities": "Manually load saved cities data",
	"btnLoadCities_toolTip": "Manually loads cities data saved during previous game sessions",
	"btnDeleteAllSavedData": "Delete all saved data",
	"btnDeleteAllSavedData_confirmation": "All saved data has been deleted",
	"persistHelp": "When web browser session ends all data about visited cities are lost. Because of that on next game session summary widget doesn't contain a lot data. To enable better game experience there is possibility to save in persistent browser storage all data about visited cities and load them manually or automaticaly before showing summary. This feature works best if used together with 'Refresh resources' button.",	
	"all": "All",
	"building": "Building",
	"castles": "Castles",
	"defensive": "Defensive",
	"warehouses": "Warehouses",
	"moonstones": "Moonstones",
	"gold": "Gold",
	"name": "Name",
	"reference": "Reference",
	"btnRefreshResources": "Refresh resources",
	"btnRefreshResources_toolTip": "Uses 'Request resources' functionality to get current resource levels.<br/>It won't be able to fetch information about cities without any <b>available</b> cart or ship.<br/>Processing request can take some time because it waits until server will respond.<br>Resources refreshed at: never",	
	"purify resources": "Purify Resources",
	"btnPurifyAll": "Purify All",
	"btnPurifyAll_toolTip": "Purify resources for cities with <b>marked Moonglow Tower</b>.<br/>When Building Minister is present it will try not to purify food in city with negative food balance or in castles.<br/>If there is no Building Minister then it will skip castles.",
	"confirmation": "Confirmation",
	"are you sure?": "Are you sure?",
	"btnMarkMoonglowTower": "Mark Moonglow Tower",
	"btnMarkMoonglowTower_toolTip": "Finds in current city <b>Moonglow Tower</b> and saves it's id for later use",
	"btnUnmarkMoonglowTower": "Unmark Moonglow Tower",
	"btnUnmarkMoonglowTower_toolTip": "Unmarks previously saved <b>Moonglow Tower</b> in current city",
	"help": "Help",	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. put *M* in city reference, by doing so city will be displayed in table below<br/>2. mark Moonglow Tower in cities enabled for 'Purify All'<br/>3. Use Purify all button or click in cell one of purified resource types",
	"purifiable": "Purifiable",
	"darkwood": "Darkwood",
	"runestone": "Runestone",
	"veritum": "Veritum",
	"trueseed": "Trueseed",
	"refresh": "Refresh",
	"sbSourceContinent_toolTip": "Filter by: <b>source continent</b>",
	"sbDestinationContinent_toolTip": "Filter by: <b>destination continent</b>",
	"defender": "Defender",
	"attacker": "Attacker",
	"btnUpdateView_toolTip": "Refresh View",
	"cbShowFakeAttacks": "Show fake attacks",
	"cbShowFakeAttacks_toolTip": "Fake attack is: plunder or siege or assault with TS < 4000",
	"unit orders": "Unit Orders",
	"incoming attacks": "Incoming attacks",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "You need to be in city",
	"food calculator": "Food calculator",
	"mass recruitment": "Mass Recruitment",
	"bos.gui.MassRecruitmentPage.help": "Currently requires Building Minister and War Minister. Persisting of cities and loading them on start have to be enabled or there will be popups saying to visit some city. Recruitment time is updated when enabling city for mass recruitment, if it changes enable it again. List of error codes:", 
	"bos.gui.MassRecruitmentPage.help2": "I - Invalid, R - not enough Resources, Q - recruitment Queue is full, T - Troop limit exceeded, B - missing Building, G - not enough Gold",
	"city/order": "City / Orders",
	"missing": "Missing",
	"resourcesFor": "Resources for",
	"recruiting": "Recruiting",
	"available": "Available",
	"btnEnableMassRecruitment": "Enable",
	"btnEnableMassRecruitment_toolTip": "Enables current city for mass recruitment",
	"btnDisableMassRecruitment": "Disable",
	"btnDisableMassRecruitment_toolTip": "Disables current city from mass recruitment",
	"recruitmentTime": "Recruitment Time [s]",
	"btnRefreshView": "Refresh",
	"btnRefreshView_toolTip": "Refresh View",
	"btnRecruitAll": "Recruit All",
	"btnRecruitAll_toolTip": "Recruits all possible units",
	"filter by: city types": "Filter by: <b>city types</b>",
	"purify": "Purify",
	"recruitment": "Recruitment",
	"carts": "Carts",
	"orders": "Orders",
	"wood/h": "Wood/h",
	"woodMax": "Wood max",
	"woodFree": "Wood free",					
	"woodIncoming": "Wood incoming",
	"woodFullAt": "Wood full at",
	"stone/h": "Stone/h",
	"stoneMax": "Stone max",
	"stoneFree": "Stone free",					
	"stoneIncoming": "Stone incoming",
	"stoneFullAt": "Stone full at",
	"iron/h": "Iron/h",
	"ironMax": "Iron max",
	"ironFree": "Iron free",					
	"ironIncoming": "Iron incoming",
	"ironFullAt": "Iron full at",
	"food/h": "Food/h",
	"foodMax": "Food max",
	"foodFree": "Food free",					
	"foodIncoming": "Food incoming",
	"foodFullAt": "Food full at",
	"gold/h": "Gold/h",
	"ships": "Ships",
	"buildQueue": "Build Queue",
	"unitQueue": "Unit Queue",	
	"cbTweakReportAtStart": "Tweak reports at start",
	"cbTweakReportAtStart_toolTip": "When option is checked reports are tweaked at start",
	"recruit": "Recruit",
	"in city:": "Recruited: ",
	"add city units": "Add city units",
	"purify options": "Purify Options",
	"cbIncludeCastles": "Include castles",
	"cbIncludeCastles_toolTip": "Includes castles in mass purification.<br/>Without Building Minister it won't purify food in castle, with minister it can purify food as long as food balance is > 0",
	"cbUseRecruitmentData": "Uses Recruitment tab data",
	"cbUseRecruitmentData_toolTip": "Uses <strong>Recruitment</strong> tab data to check if some resource type is needed in castle to recruit missing troops",
	"btnPurifyOptions": "Options",
	
	"role": "Role",
	"lastLogin": "Last Login",
	"title": "Title",
	"rank": "Rank",
	"score": "Score",
	"continent": "Continent",
	"player name": "Player name",
	"land": "Land",
	"water": "Water",
	"palaces": "Palaces",
	"player": "Player",
	"my alliance": "My Alliance",
	"extra summary": "Extra Summary",
	"minScoreInput_toolTip": "Minimum score",
	"alliance": "Alliance",
	"zoom in": "Zoom in",
	"zoom out": "Zoom out",
	"jump to continent": "Jump to continent",
	"btnExportSettings": "Export settings", 
	"btnExportSettings_toolTip": "Exports settings to text form",
	"btnImportSettings": "Import settings",			
	"btnImportSettings_toolTip": "Imports settings. Currently saved settings will be discarded",	
	"fetching resources, please wait": "Fetching resources, please wait",
	"btnFetchCities": "Fetch cities",
	"btnFetchCities_toolTip": "Simulates visiting city to fetch it's data. Function is called every 0.5s so it's slow",
	"btnTxtExport": "Text Export",
	
	"btnMarkAllMoonglowTowers": "Mark all MTs",
	"btnMarkAllMoonglowTowers_toolTip": "Marks moonglow towers in all cities",
	
	"btnAddIntel": "Add intel",
	"btnAddIntel_toolTip": "Add intelligence connected with enemy city",
	"isLandlocked": "Landlocked?",
	"hasCastle": "Castle?",
	"intelligence": "Intelligence",
	"delete": "Delete",
	"owner": "Owner",
	
	"fill with": "Fill with",
	"fill with resources": "Fill with resources",
	"resource type": "Resource type",
	"max resources to send": "Max resources to send",
	"max travel time": "Max travel time (h)",
	"cbAllowSameContinent": "Include cities from the same continent as target",
	"cbAllowOtherContinent": "Include cities from other continents than target",
	"cbPalaceSupport": "Palace delivery",
	"cbPalaceSupport_toolTip": "Sends resources as palace deliver (wood and stone only)",
	"current city": "Current city",
	"search": "Search",
	"request resources": "Request resources",
	
	"defenders": "Defenders",
	"btnSaveAllCities": "Save all cities",
	"save summary position": "Save summary position",
	
	"targetCityName": "Target City",
	"targetPosition": "Target Pos",
	"attackerCityName": "Attacker City",
	"attackerPosition": "Attacker Pos",
	"playerName": "Attacker",
	"allianceName": "Alliance",
	"attackerTS": "Attacker TS",
	"attackerUnits": "Attacker Units",
	"spotted": "Spotted", 
	"claim": "Claim",
	"show intel": "Show intel",
	
	"btnCopyCityType2Group": "Assign",
	"btnCopyCityType2Group_toolTip": "For each city of given BOS type (set in reference) assigns EA city group",
	
	"": ""
  },
"de": {
	"summary": "Übersicht",
	"combat calculator": "Kampf Kalkulator",
	"food calculator": "Nahrungsberechner",
	"recruitment speed calculator": "Rekrutiergeschwinigkeitsberechnung",
	"jump to coords": "Gehe zu",
	"jump to city": "Gehe zu City",
	"please enter city coordinates": "Bitte gebe Stadtkoordinaten (z.B.: 12:34) ein",
	"jump to player": "Gehe zu Spieler",
	"please enter player name:": "Bitte gebe einen Spielernamen ein",
	"jump to alliance": "Gehe zu Allianz",
	"please enter alliance name:": "Bitte gib den Namen der Allianz ein",
	"error during BOS Tools menu creation: ": "Error bei der Erstellung des BOS-Tool Menüs:",
	"id": "Id", 
	"cityId": "Stadt Id", 
	"from": "von", 
	"type": "Handelstyp", 
	"transport": "Transporttyp", 
	"state": "Status", 
	"start": "Aufbruchszeit", 
	"end": "Ankunft", 
	"position": "Pos", 
	"target": "Ziel", 
	"lastUpdated": "Zuletzt aktualisiert", 
	"resources": "Ressourcen",
	"filter by trade type": "Filtere nach <b>Transportart</b> ",
	"filter by: transport type": "Filtere nach <b>Transporttyp</b>",
	"filter by: resources receiver": "Filtere nach <b>Ressourcenempfänger</b>",
	"you": "Du",
	"someone else": "Jemand andres",
	"filter by: state": "Filtere nach <b>Status</b>",
	"trade route": "Handelsroute",
	"OK": "OK",
	"clear": "Löschen",
	"max": "Max",
	"please enter some resources amount": "Bitte gib die Anzahl der Ressourcen ein",
	"invalid destination": "Ungültiges Ziel",
	"to": "zu",
	"ships then carts": "Schiffe über Karren", /* 100% accurate translation would be "erst Handelschiffe, dann Marktkarren" there was soneone else who  
	translated things too maybe you should let him check what to do*/
	"carts then ships": "Karren vor Schiffen", /*same as above just inversed*/
	"only carts": "Nur Karren",
	"only ships": "Nur Schiffe",
	"group": "Gruppe",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Handelsrouten",
	"fromTo": "Von/Zu",
	"action": "Aktion",
	"status": "Status",
	"wood": "Holz", 
	"stone": "Stein", 
	"iron": "Eisen", 
	"food": "Nahrung", 
	"land/sea": "Land/See", 
	"edit": "Bearbeiten",
	
	"options": "Optionen",
	"table settings": "Tabelleneinstellungen",
	"load table settings at start": "Lade Tabelleneinstellungen beim Start",
	"table name": "Tabellenname",
	"cities": "Städte",
	"military": "Militär",
	"btnLoadTableSettings": "Lade Tabelleneinstellungen",
	"btnLoadTableSettings_toolTip": "Lädt die (vorher) gespeicherten Einstellungen für die Tabelle (Spaltenordnung, Spaltenbreite, angezeigte Felder, Sortierordnung",
	"btnSaveTableSettings": "Speichern der Tabelleneigenschaften",
	"btnSaveTableSettings_toolTip": "Speichert die Tabelleneigenschaften: Spaltenordnung, Spaltenbreite, Angezeigte Spalten, Sortierordnung",
	"saving cities data": "Speichern der Stadtdaten",
	"cbPersistCities": "Speicher Stadtdaten",
	"cbPersistCities_toolTip": "Wenn du zur nächsten Stadt wechselst, werden die Daten der vorherigen im lokalen Speicher des Browers gespeichert.",
	"cbLoadPersistedCitiesAtStart": "Lade gespeicherte Stadtdaten beim Start des Spieles",
	"btnLoadCities": "Lade gespeicherte Stadtdaten manuell",
	"btnLoadCities_toolTip": "Läd manuell die Stadtdaten einer verherigen LoU-Session ",
	"btnDeleteAllSavedData": "Lösche alle gespeicherten Daten",
	"btnDeleteAllSavedData_confirmation": "Alle gespeicherten Daten wurden gelöscht!",
	"persistHelp": "Wenn Lord of Ultima beendet wird gehen alle Daten der besuchten Städte verloren. Deswegen sind beim nächsten Start von LoU nicht viele bzw. keine Daten im der Tabelle. Dies kann man verhindern, indem man die Daten der Städte im lokalen Speicher des Browsers speichert und sie automatisch oder manuell laden lässt. Diese Einstellung funktioniert am besten, wenn sie zusammen mit `Ressourcen aktualisieren` verwendet wird.",	
	"all": "Alle",
	"building": "In Bau/Aufbau",
	"castles": "Burgen",
	"defensive": "Defensive",
	"warehouses": "Lager",
	"moonstones": "Mondsteine",
	"gold": "Geld",
	"name": "Name",
	"reference": "Referenz",
	"btnRefreshResources": "Ressourcen aktualisieren",
	"btnRefreshResources_toolTip": "Benutzt die 'Request resources' Funktion umd die momentanen Ressourcen der Städte zu bekommen.<br/>Dies funktioniert nur bei Städten mit <b>vorhandenen</b> Marktkarren oder Handelsschiffen.<br/>Das sammeln aller Ressourcen kann einige Zeit dauern, da immer auf Antwort des Servers gewartet wird.<br/>Ressourcen wurden aktualisiert am: nie",	
	"purify resources": "Ressourcen veredeln",
	"btnPurifyAll": "Veredele alle",
	"btnPurifyAll_toolTip": "Veredelt Ressurcen in Städten mit <b>markiertem Mondschein-Turm</b>.<br/>Falls ein Bauminister aktiv ist, so wird versucht keine Ressurcen zu veredeln in Städten/Burgen mit negativer Nahrungbalance.<br/>Wenn kein Bauminister aktiv ist werden Burgen übersprungen.",
	"confirmation": "Bestätigung",
	"are you sure?": "Bist du sicher?",
	"btnMarkMoonglowTower": "Markiere einen Mondschein-Turm",
	"btnMarkMoonglowTower_toolTip": "Sucht in der Stadt nach einem <b>Mondschein-Turm</b> und speichert die ID für die weitere Benutzung",
	"btnUnmarkMoonglowTower": "Lösche Mondstein-Turm Markierung",
	"btnUnmarkMoonglowTower_toolTip": "Löscht alle markierten<b>Mondstein-Türme</b> in dieser Stadt<br/>",
	
	"_minimumResLevelInput_toolTip": "% der max. Lagerkapzität, welche in jeder Stadt nach der Massenveredlung bestehen bleiben muss.<br/>Manuelle Veredlung ist hiervon nicht betroffen",
	"_minimumResLevelInput_absolute_toolTip": "Anzahl der Ressurcen,  welche in jeder Stadt nach der Massenveredlung bestehen bleiben muss.<br/>Manuelle Veredlung ist hiervon nicht betroffen",
	"purificationHelp": "1. schreibe *M* in die Stadtreferenz, damit die Stadt in der Veredelungstabelle angezeigt wird.<br/>2. Markiere den Monddstein-Turm in der Stadt umd diese Stadt für die Massenveredelung freizuschalten<br/>3. Klicke den Veredele alle \"Button\" oder klicke in das Kästchen des zuveredelnden Ressourcentypes",
	"purifiable": "veredeDunkelholzDarkwood",
	"runestone": "Runensteine",
	"veritum": "Veritum",
	"trueseed": "Trueseed",	
	"refresh": "Aktualisieren",
	"sbSourceContinent_toolTip": "Filtern nach: <b>Herrkunftskontinent</b>",
	"sbDestinationContinent_toolTip": "Filtern nach: <b>Zielkontinent</b>",
	"defender": "Verteidiger",
	"attacker": "Angreifer",
	"btnUpdateView_toolTip": "Ansicht aktualisieren",
	"cbShowFakeAttacks": "Zeige Fake-Angriffe",
	"cbShowFakeAttacks_toolTip": "Fake-Angriffe sind: Plünderungen/Überfälle/Belagerungen mit einer TS < 1000",	
	"unit orders": "Einheitenbefehle",
	"incoming attacks": "Eingehende Angriffe",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!", 
	"food calculator": "Nahrungsberechner",
	"mass recruitment": "Massrekrutierung",
	"bos.gui.MassRecruitmentPage.help": "Benötigt zur Zeit einen Bau- und Kiegsminister. Persisting of cities and 'Lade bei Start' muss aktiviert werden oder es werden Popups erscheinen, welche bvesagen, dass eine Stadt besucht werden soll. Rekruierzeiten werden aktualiesiert wenn die Massenrekrutierung für die jeweilige Stadt aktiviert wird, falls die Zeiten sich ändern, aktiviere die Massenrekrutierung erneut. Liste der Errormeldungen:",
	"bos.gui.MassRecruitmentPage.help2": "I - Ungültig (Invalid), R - nicht genügend Resourcen, Q - Rekrutierliste ist voll (recruitment Queue), T - Truppenlimit erreicht, B - Fehlendes Einheitengebäude, G - nicht genug Gold",	
	"city/order": "Stadt / Befehle",
	"missing": "Fehlend",
	"resourcesFor": "Ressourcen für",
	"recruiting": "Rekrutiert",
	"available": "Verfügbar",
	"btnEnableMassRecruitment": "Aktivieren",
	"btnEnableMassRecruitment_toolTip": "Schaltet die momentane Stadt für Massenrekrutierung",
	"btnDisableMassRecruitment": "Deaktivierung",
	"btnDisableMassRecruitment_toolTip": "Deaktiviert Massenrekrutierung für die momentane Stadt",	
	"recruitmentTime": "Rekrutierzeit [s]",
	"btnRefreshView": "Aktualisieren",
	"btnRefreshView_toolTip": "Ansicht aktualisieren",
	"btnRecruitAll": "Rekrutiere alle",
	"btnRecruitAll_toolTip": "Rekrutiert alle Verfügbaren Einheiten",
	"filter by: city types": "Filtern nach: <b>Stadttyp</b>",
	"purify": "Veredeln",
	"recruitment": "Rekrutieren",
	"carts": "Karren",
	"orders": "Orders",
	"wood/h": "Holz/h",
	"woodMax": "max. Holz",
	"woodFree": "freie Holzkapazität",					
	"woodIncoming": "eintreffendes Holz",
	"woodFullAt": "Holz voll am/um",
	"stone/h": "Stein/h",
	"stoneMax": "max. Stein",
	"stoneFree": "freie Steinkapazität",					
	"stoneIncoming": "eintreffende Steine",
	"stoneFullAt": "Stein voll am/um",
	"iron/h": "Eisen/h",
	"ironMax": "max. Eisen",
	"ironFree": "freie Eisenkapazität",					
	"ironIncoming": "eiintreffendes Eisen",
	"ironFullAt": "Eisen voll am/um",
	"food/h": "Nahrung/h",
	"foodMax": "max. Nahrung",
	"foodFree": "freie Nahrungskapazität",					
	"foodIncoming": "eintreffende Nahrung",
	"foodFullAt": "Nahrung voll am/um",
	"gold/h": "Gold/h",
	"ships": "Handelsschiffe",
	"buildQueue": "Bauliste",
	"unitQueue": "Rekrutierliste",
	"cbTweakReportAtStart": "Tweak Report beim Start",
	"cbTweakReportAtStart_toolTip": "Läd die Tweak-Reports beim Start",
	"recruit": "Rekrutiere",
	"in city:": "Rekrutiert: ",
	"add city units": "Füge Einheiten dieser Stadt hinzu",
	"purify options": "Veredelungsoptionen",
	"cbIncludeCastles": "Schließe Burgen mit ein",
	"cbIncludeCastles_toolTip": "Schließt Burgen in die Massenveredelung ein.<br/>Ohne Bauminister wird keine Nahrung ist Burgen veredelt. Falls vorhanden wird Nahrung nur in Burgen mit positiver Nahrungsbalance veredelt",
	"cbUseRecruitmentData": "Uses Recruitment tab data",
	"cbUseRecruitmentData_toolTip": "Benutzt die <strong>Rekrutiertab</strong>-Daten um zu kontrollieren ob Ressourcen für die fehlenden Einheiten in der Burg benötigt werden",
	"btnPurifyOptions": "Optionen",
	
	"role": "Role",
	"lastLogin": "Last Login",
	"title": "Title",
	"rank": "Rank",
	"score": "Score",
	"continent": "Continent",
	"player name": "Player name",
	"land": "Land",
	"water": "Water",
	"palaces": "Palaces",
	"player": "Player",
	"my alliance": "My Allianz",	
	"extra summary": "Extra Summary",
	"minScoreInput_toolTip": "Minimum score",
	"alliance": "Allianz",
	"zoom in": "Zoom in",
	"zoom out": "Zoom out",
	"btnExportSettings": "Export settings", 
	"btnExportSettings_toolTip": "Exports settings to text form",
	"btnImportSettings": "Import settings",			
	"btnImportSettings_toolTip": "Imports settings. Currently saved settings will be discarded",	
	"fetching resources, please wait": "Lade Ressourcen..",
	"btnFetchCities": "Fetch cities",
	"btnFetchCities_toolTip": "Simulates visiting city to fetch it's data. Function is called every 0.5s so it's slow",
	"btnTxtExport": "Text Export",
	
	"": ""
  },
  "pl": {
	"summary": "BOS Przegląd",
	"combat calculator": "Kalkulator bitew",
	"food calculator": "Kalkulator jedzenia",
	"recruitment speed calculator": "Kalkulator szybkości rekrutacji",
	"jump to coords": "Skocz do współrzędnych",
	"jump to city": "Skocz do miasta",
	"please enter city coordinates": "Wprowadź współrzędne (np. 12:34) :",
	"jump to player": "Skocz do gracza",
	"please enter player name:": "Wprowadź nazwę gracza:",
	"jump to alliance": "Skocz do sojuszu",
	"please enter alliance name:": "Wprowadź nazwę sojuszu:",
	"error during BOS Tools menu creation: ": "Błąd podczas tworzenia BOS Tools: ",
	"id": "Id", 
	"cityId": "Miasto Id", 
	"from": "Skąd", 
	"type": "Typ", 
	"transport": "Transport", 
	"state": "Stan", 
	"start": "Start", 
	"end": "Koniec", 
	"position": "Pozycja", 
	"target": "Cel", 
	"lastUpdated": "Ost. Aktualizacja", 
	"resources": "Zasoby",
	"filter by trade type": "Filtruj po: <b>typie handlu</b>",
	"filter by: transport type": "Filtruj po: <b>typie transportu</b>",
	"filter by: resources receiver": "Filtruj po: <b>odbiorcy zasobów</b>",
	"you": "Ty",
	"someone else": "Ktoś inny",
	"filter by: state": "Filtruj po: <b>stanie</b>",
	"trade route": "Szlak handlowy",
	"OK": "OK",
	"clear": "Wyczyść",
	"max": "Max",
	"please enter some resources amount": "Wprowadź liczbę surowców",
	"invalid destination": "Nieprawidłowe miejsce docelowe",
	"to": "Do",
	"ships then carts": "Statki później wozy",
	"carts then ships": "Wozy później statki",
	"only carts": "Tylko wozy",
	"only ships": "Tylko statki",
	"group": "Grupa",
	"resourceMultiplierNotice": "jeżeli liczbaZasobów < 10000 to liczbaZasobów = liczbaZasobów * 1000",
	"trade routes": "Szlaki Handlowe",
	"fromTo": "Skąd/Dokąd",
	"action": "Akcja",
	"status": "Status",
	"wood": "Drewno", 
	"stone": "Kamień", 
	"iron": "Żelazo", 
	"food": "Jedzenie", 
	"land/sea": "Ląd/Morze", 
	"edit": "Edycja",	
	"options": "Opcje",
	"table settings": "Ustawienia tabel",
	"load table settings at start": "Ładuj ustawienia tabel przy starcie",
	"table name": "Nazwa tabeli",
	"cities": "Miasta",
	"military": "Wojsko",
	"btnLoadTableSettings": "Wczytaj ustawienia tabeli",
	"btnLoadTableSettings_toolTip": "Ładuje poprzednio zapisane ustawienia tabel (porządek kolumn, szerokości, widoczność, porządek sortowania)",
	"btnSaveTableSettings": "Zapisz ustawienia tabeli",
	"btnSaveTableSettings_toolTip": "Zapisuje ustawienia tabeli: porządek kolumn, szerokości, widoczność, porządek sortowania.<br/>Ciągle musisz kliknąć przycisk <b>Zapisz</b> celem zapisania tego na stałe",
	"saving cities data": "Zapisuje dane miast",
	"cbPersistCities": "Zapisz dane miast",
	"cbPersistCities_toolTip": "Po udaniu się do kolejnego miasta stan poprzedniego miasta zapisany jest w local storage przeglądarki.",
	"cbLoadPersistedCitiesAtStart": "Załaduj zapisane miasta przy starcie gry",
	"btnLoadCities": "Manualnie załaduj dane miast",
	"btnLoadCities_toolTip": "Manualnie ładuje dane miast zapisane podczas poprzednich sesji z grą",
	"btnDeleteAllSavedData": "Skasuj wszystkie zapisane dane",
	"btnDeleteAllSavedData_confirmation": "Wszystkie dane zostały skasowane",
	"persistHelp": "Normalnie kiedy sesja przeglądarki zostaje zakończona wszystkie informacje o odwiedzonych miastach są tracone. Z tego powodu podsuwanie nie będzie zawierać wielu danych. Z tego powodu możliwe jest zapisanie informacji o odwiedzonych miastach w lokalnej bazie danych dostępnej w nowoczesnej przeglądarce internetowej.",	
	"all": "Wszystko",
	"building": "W budowie",
	"castles": "Zamki",
	"defensive": "Defensywne",
	"warehouses": "Składy",
	"moonstones": "Moonstones",
	"gold": "Złoto",
	"name": "Nazwa",
	"reference": "Uwagi",
	"btnRefreshResources": "Odśwież surowce",
	"btnRefreshResources_toolTip": "Używa funkcjonalności 'Poproś o surowce' celem otrzymania aktualnych ilości surowców.<br/>Nie będzie w stanie poobrać informacji dla miast nie posiadających żadnych <b>dostępnych</b> statków lub wozów.<br/>Przetwarzanie żądania może zabrać trochę czasu z uwagi na czas odpowiedzi serwera.<br>Zasoby odświeżono: nigdy",	
	"purify resources": "Oczyszczanie zasobów",
	"btnPurifyAll": "Oczyść wszystko",
	"btnPurifyAll_toolTip": "Oczyszcza zasoby w miastach posiadających <b>oznaczoną Wieżę Księżycową</b>.<br/>Gdy dostępny jest Minister Budownictwa jedzenie nie zostanie oczywszczone w miastach o ujemnym bilansie jedzenia oraz w zamkach.<br/>Jeżeli gracz nie posiada Ministra Budownictwa podczas oczyszczania pominięte zostaną zamki.",
	"confirmation": "Potwierdzenie",
	"are you sure?": "Czy jesteś pewien?",
	"btnMarkMoonglowTower": "Oznacz Wieżę Księżycową",
	"btnMarkMoonglowTower_toolTip": "Znajduje w aktualnym mieście <b>Wieżę Księżycową</b> i zapisuje ją celem późniejszego użycia",
	"btnUnmarkMoonglowTower": "Odznacz Wieżę Księżycową",
	"btnUnmarkMoonglowTower_toolTip": "Dla aktualnego miasta odznacza uprzednio zaznaczoną <b>Wieżę Księżycową<b>",
	"help": "Pomoc",	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. umieść *M* uwagach dotyczących miasta dzięki czemu miasto będzie widoczne w poniżej tabeli<br/>2. Oznacz Wieżę Księżycową dla miast mających brać udział w 'Oczyść wszystko'<br/>3. Użyj przycisku 'Oczyść wszystko' lub kliknij w komórce odpowiadającej oczyszczonym typom surowców",
	"purifiable": "Oczyszczalne",
	"darkwood": "Ciemnolas",
	"runestone": "Kamień runiczny",
	"veritum": "Veritum",
	"trueseed": "Magiczny pokarm",
	"refresh": "Odśwież",
	"sbSourceContinent_toolTip": "Filtruj po: <b>kontynencie źródłowym</b>",
	"sbDestinationContinent_toolTip": "Filtruj po: <b>kontynencie docelowym</b>",
	"defender": "Obrońca",
	"attacker": "Atakujący",
	"btnUpdateView_toolTip": "Odśwież widok",
	"cbShowFakeAttacks": "Pokazuj ataki pozorowane",
	"cbShowFakeAttacks_toolTip": "Atak pozorowany to: grabież, oblężenie lub szturm o SO < 1000",
	"unit orders": "Rozkazy",
	"incoming attacks": "Nadchodzące ataki",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "Musisz być w mieście",
	"food calculator": "Kalkulator jedzenia",
	"mass recruitment": "Masowa rekrutacja",
	"bos.gui.MassRecruitmentPage.help": "Aktualnie wymaga Ministra Budownictwa i Ministra Wojny. Zapisywane miast i ładowanie ich na stracie musi być załączone. W przyciwnym razie będą wyskakiwać błędu nakazujące odwiedzić jakieś miasto. Czas rekrutacji jest aktualizowany podczas załączania miasta miasto do masowej rekrutacji, jeśli ulegnie zmianie - dodaj miasto raz jeszcze. Lista kodów błędu:", 
	"bos.gui.MassRecruitmentPage.help2": "I - Nieprawidłowy, R - za mało surowców, Q - kolejka rekrutacji jest pełna, T - przekroczono SO, B - brakuje budynku, G - za mało złota",
	"city/order": "Miasto / Rozkazy",
	"missing": "Brakuje",
	"resourcesFor": "Surowców dla",
	"recruiting": "Rekrutuje",
	"available": "Dostępne",
	"btnEnableMassRecruitment": "Załącz",
	"btnEnableMassRecruitment_toolTip": "Załącza miasto do masowej rekrutacji",
	"btnDisableMassRecruitment": "Wyłącz",
	"btnDisableMassRecruitment_toolTip": "Wyłącza miasto z masowej rekrutacji",
	"recruitmentTime": "Czas rekrutacji [s]",
	"btnRefreshView": "Odśwież",
	"btnRefreshView_toolTip": "Odśwież widok",
	"btnRecruitAll": "Rekrutuj Wszystko",
	"btnRecruitAll_toolTip": "Rekrutuje wszystkie możliwe jednostki",
	"filter by: city types": "Filtruj po: <b>typach miast</b>",
	"purify": "Oczyść",
	"recruitment": "Rekrutacja",
	"carts": "Wozy",
	"orders": "Rozkazy",
	"wood/h": "Drewno/h",
	"woodMax": "Drewno max",
	"woodFree": "Drewno wolne",					
	"woodIncoming": "Drewno nadchodzi",
	"woodFullAt": "Drewno pełne",
	"stone/h": "Kamień/h",
	"stoneMax": "Kamień max",
	"stoneFree": "Kamień wolne",					
	"stoneIncoming": "Kamień nadchodzi",
	"stoneFullAt": "Kamień pełne",
	"iron/h": "Żelazo/h",
	"ironMax": "Żelazo max",
	"ironFree": "Żelazo wolne",					
	"ironIncoming": "Żelazo nadchodzi",
	"ironFullAt": "Żelazo pełne",
	"food/h": "Jedzenie/h",
	"foodMax": "Jedzenie max",
	"foodFree": "Jedzenie wolne",					
	"foodIncoming": "Jedzenie nadchodzi",
	"foodFullAt": "Jedzenie pełne",
	"gold/h": "Złoto/h",
	"ships": "Statki",
	"buildQueue": "Kolejka Budowy",
	"unitQueue": "Kolejka Rekrutacji",	
	"cbTweakReportAtStart": "Podrasuj raporty na starcie",
	"cbTweakReportAtStart_toolTip": "Gdy załączone raporty są podrasowane na starcie",
	"recruit": "Rekrutuj",
	"in city:": "Zrekrutowano: ",
	"add city units": "Dodaj jednostki miasta",
	"purify options": "Opcje Oczyszczania",
	"cbIncludeCastles": "Załącz zamki",
	"cbIncludeCastles_toolTip": "Załącza zamki do masowego oczyszczania.<br/>Bez Ministra Handlu nie oczyści jedzenia w zamku, z ministrem zrobi to o ile bilans jedzenia jest dodatni",
	"cbUseRecruitmentData": "Używaj masową rekrutację",
	"cbUseRecruitmentData_toolTip": "Używa zakładki <strong>Rekrutacja</strong> do sprawdzenia jakie typy surowców są potrzebne celem rekrutacji brakujących jednostek",
	"btnPurifyOptions": "Opcje",
	
	"role": "Rola",
	"lastLogin": "Ostatnie Logowanie",
	"title": "Tytuł",
	"rank": "Ranga",
	"score": "Punkty",
	"continent": "Kontynent",
	"player name": "Nazwa gracza",
	"land": "Ląd",
	"water": "Woda",
	"palaces": "Pałace",
	"player": "Gracz",
	"my alliance": "Mój sojusz",
	"extra summary": "Extra Przegląd",
	"minScoreInput_toolTip": "Minimalna liczba punktów",
	"alliance": "Sojusz",
	"zoom in": "Przybliż",
	"zoom out": "Oddal",
	"jump to continent": "Skocz do kontynentu",
	"btnExportSettings": "Eksportuj ustawienia", 
	"btnExportSettings_toolTip": "Eksportuje ustawienia do postaci tekstowej",
	"btnImportSettings": "Importyj ustawienia",			
	"btnImportSettings_toolTip": "Importuje ustawienia. Aktualne ustawienia zostaną usunięte",	
	"fetching resources, please wait": "Pobieram zasoby, proszę czekać",
	"btnFetchCities": "Pobierz miasta",
	"btnFetchCities_toolTip": "Symuluje odwiedziny miast, aby pobrać ich dane. Funkcja wywoływan jest co 0.5s tak więc jest to wolne przy dużej liczbie miast",
	"btnTxtExport": "Eksport tekstowy",
	
	"": ""
  }
  
};

function tr(messageId) {
	var locale = qx.locale.Manager.getInstance().getLocale();
	
	if (bosLocalizedStrings[locale] != undefined && bosLocalizedStrings[locale][messageId] != undefined) {
		return bosLocalizedStrings[locale][messageId];
	}
	
	if (bosLocalizedStrings["en"][messageId] != undefined) {
		return bosLocalizedStrings["en"][messageId];
	}
	
	return messageId;
}

qx.Class.define("bos.gui.ResourcesFillerWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		this.setLayout(new qx.ui.layout.Dock());
		
		this.set({
			width: 500,
			minWidth: 200,
			maxWidth: 600,
			height: 350,
			minHeight: 200,
			maxHeight: 600,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("fill with resources")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {flex: true});
		
		scroll.add(this.createForm());		

		container.add(this.createFooter());
		
		this.add(container);
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
		this.timer = new qx.event.Timer(1000);
		this.timer.addListener("interval", this._updateSendingProgress, this);
		
		this.timer.start();		

	}, 
	members: {
		toX: null,
		toY: null,
		sbResType: null,
		maxResourcesInput: null,
		maxTravelTimeInput: null,
		cbAllowSameContinent: null,
		cbAllowOtherContinent: null,
		cbPalaceSupport: null,
		lblTarget: null,
		cityInfos: {},
		progressLabel: null,
		timer: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button(tr("request resources"));
			btnAdd.setWidth(160);					
			container.add(btnAdd);
			btnAdd.addListener("click", this.fillResources, this);
			
			this.progressLabel = new qx.ui.basic.Label("");		
			container.add(this.progressLabel);
			
			return container;
		}, 
		fillResources: function() {

			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			if (toX == 0 && toY == 0) {
				bos.Utils.handleWarning(tr("invalid destination"));
				return;					
			}			
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			if (this.cityInfos[cityId] == undefined || this.cityInfos[cityId] == null) {
				alert("Please click search button");
				return;
			}			
			var targetCityInfo = this.cityInfos[cityId];			
						
			var req = {
				maxResourcesToBeSent: parseInt(this.maxResourcesInput.getValue()),
				cityId: cityId,
				maxTravelTime: parseInt(this.maxTravelTimeInput.getValue()),
				targetPlayer: targetCityInfo.pn,
				palaceSupport: this.cbPalaceSupport.getValue(),
				resType: parseInt(this.sbResType.getSelection()[0].getModel()),
				allowSameContinent: this.cbAllowSameContinent.getValue(),
				allowOtherContinent: this.cbAllowOtherContinent.getValue()
			}
			bos.ResourcesFiller.getInstance().populateCityWithResources(req);
						
			//this.close();			
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			var selectWidth = 320;		
			var row = 0;
			
			container.add(new qx.ui.basic.Label(tr("resource type")), {
				row: row, 
				column : 0
			});					
			this.sbResType = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});				
			this.sbResType.add(new qx.ui.form.ListItem(tr("wood"), null, bos.Const.WOOD));
			this.sbResType.add(new qx.ui.form.ListItem(tr("stone"), null, bos.Const.STONE));
			this.sbResType.add(new qx.ui.form.ListItem(tr("iron"), null, bos.Const.IRON));
			this.sbResType.add(new qx.ui.form.ListItem(tr("food"), null, bos.Const.FOOD));
			container.add(this.sbResType, {
				row: row,
				column: 1
			});
			row++;

			container.add(new qx.ui.basic.Label(tr("to")), {
				row: row, 
				column : 0
			});	
			var containerXY = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			
			this.toX = new qx.ui.form.TextField("");
			this.toX.setWidth(40);			
			containerXY.add(this.toX);
			this.toY = new qx.ui.form.TextField("");
			this.toY.setWidth(40);			
			containerXY.add(this.toY);
			
			var btnSearchTarget = new qx.ui.form.Button(tr("search"));
			btnSearchTarget.setWidth(80);					
			container.add(btnSearchTarget);
			btnSearchTarget.addListener("click", this.searchTarget, this);
			containerXY.add(btnSearchTarget);
			
			var btnCurrentCity = new qx.ui.form.Button(tr("current city"));
			btnCurrentCity.setWidth(120);					
			container.add(btnCurrentCity);
			btnCurrentCity.addListener("click", this.setCurrentCityAsTarget, this);
			containerXY.add(btnCurrentCity);			
			
			container.add(containerXY, {
				row: row, 
				column : 1
			});
			row++;
			
			/*
			this.lblTarget = new qx.ui.basic.Label("");
			container.add(this.lblTarget, {
				row: row, 
				column : 1
			});			
			row++;
			*/
			
			container.add(new qx.ui.basic.Label(tr("max resources to send")), {
				row: row, 
				column : 0
			});
			
			var resContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxResourcesInput = new webfrontend.ui.SpinnerInt(0, 0, 100000000);
			this.maxResourcesInput.setWidth(100);
			resContainer.add(this.maxResourcesInput);
			
			resContainer.add(this._createIncreaseAmountBtn("500k", 500000));
			resContainer.add(this._createIncreaseAmountBtn("1M", 1000000));
			resContainer.add(this._createIncreaseAmountBtn("5M", 5000000));
			resContainer.add(this._createIncreaseAmountBtn("10M", 10000000));		
			
			container.add(resContainer, {
				row: row,
				column: 1
			});		
			row++;
			
			container.add(new qx.ui.basic.Label(tr("max travel time")), {
				row: row, 
				column : 0
			});
			var timeContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxTravelTimeInput = new webfrontend.ui.SpinnerInt(24, 1, 96);
			this.maxTravelTimeInput.setWidth(100);
			timeContainer.add(this.maxTravelTimeInput);
			
			timeContainer.add(this._createMaxTravelTimeBtn("24h", 24));
			timeContainer.add(this._createMaxTravelTimeBtn("48h", 48));
			timeContainer.add(this._createMaxTravelTimeBtn("96h", 96));
			
			container.add(timeContainer, {
				row: row,
				column: 1
			});		
			row++;			

			this.cbAllowSameContinent = new qx.ui.form.CheckBox(tr("cbAllowSameContinent"));
			this.cbAllowSameContinent.setToolTipText(tr("cbAllowSameContinent_toolTip"));
			this.cbAllowSameContinent.setValue(true);
			container.add(this.cbAllowSameContinent, {
				row: row,
				column: 1
			});
			row++;
			
			this.cbAllowOtherContinent = new qx.ui.form.CheckBox(tr("cbAllowOtherContinent"));
			this.cbAllowOtherContinent.setToolTipText(tr("cbAllowOtherContinent_toolTip"));
			this.cbAllowOtherContinent.setValue(true);
			container.add(this.cbAllowOtherContinent, {
				row: row,
				column: 1
			});	
			row++;

			this.cbPalaceSupport = new qx.ui.form.CheckBox(tr("cbPalaceSupport"));
			this.cbPalaceSupport.setToolTipText(tr("cbPalaceSupport_toolTip"));
			this.cbPalaceSupport.setValue(false);
			container.add(this.cbPalaceSupport, {
				row: row,
				column: 1
			});	
			row++;			
					
			return box;
		}, 
		_createMaxTravelTimeBtn: function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting", 
				font: "bold",
				width: 50
			});
			
			btn.addListener("click", function(event) {
				this.maxTravelTimeInput.setValue(amount);
			}, this);
			return btn;
		},
		_createIncreaseAmountBtn: function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting", 
				font: "bold",
				width: 50
			});
			
			btn.addListener("click", function(event) {
				this.maxResourcesInput.setValue(this.maxResourcesInput.getValue() + amount);
			}, this);
			return btn;
		},
		searchTarget: function() {
			
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
				id: cityId
			}, this, this._onCityInfo, cityId);
		},
		_onCityInfo: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.cityInfos[cityId] = result;
			}
		},
		setCurrentCityAsTarget: function() {
			this.editedRoute = null;
			var city = webfrontend.data.City.getInstance();
			var coords = bos.Utils.convertIdToCoordinatesObject(city.getId());
			this.toX.setValue("" + coords.xPos);
			this.toY.setValue("" + coords.yPos);
			this.cityInfos[city.getId()] = {
				pn: webfrontend.data.Player.getInstance().getName()
			}			
			
			var resType = parseInt(this.sbResType.getSelection()[0].getModel());
			
			var server = bos.Server.getInstance();
			var bosCity = server.cities[city.getId()];
			if (bosCity != null) {			
				var freeSpace = Math.max(0, parseInt(bosCity.getResourceMaxStorage(resType)) - parseInt(bosCity.getTradeIncomingResources(resType)) - parseInt(bosCity.getResourceCount(resType)));			
				this.maxResourcesInput.setValue(freeSpace);			
			}
		},
		_updateSendingProgress: function() {
			var count = bos.net.CommandManager.getInstance().getNumberOfPendingCommands();
			this.progressLabel.setValue(tr("in queue") + ": " + count);
		}
	}
});

qx.Class.define("bos.BatchResourcesFiller", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		this.timer = new qx.event.Timer(1000);
		this.timer.addListener("interval", this._sendPendingFillRequest, this);	
	},
	properties: {

	},
	members: {
		timer: null,
		_progressDialog: null,
		fillRequests: new Array(),
		fillCitiesWithResources: function(cities, resType) {
			var server = bos.Server.getInstance();
			for (var i = 0, count = cities.length; i < count; i++) {
				var cityId = cities[i];
				var city = server.cities[cityId];
				if (city == null) {
					continue;
				}
				this.fillRequests.push({
					city: city,
					resType: resType
				});
			}
			
			this._disposeProgressDialog();

			this._progressDialog = new webfrontend.gui.ConfirmationWidget();
			this._progressDialog.showInProgressBox(tr("cities to be filled: ") + this.fillRequests.length);
			qx.core.Init.getApplication().getDesktop().add(this._progressDialog, {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			});
			this._progressDialog.show();
			this.timer.start();
		},
		_sendPendingFillRequest: function() {
			if (this.fillRequests.length == 0) {
				this.timer.stop();
				this._disposeProgressDialog();
				return;
			}
			if (bos.net.CommandManager.getInstance().getNumberOfPendingCommands() == 0 && bos.ResourcesFiller.getInstance().getNumberOfMessagesWaitingForResponse() == 0) {
				this._progressDialog.showInProgressBox(tr("cities to be filled: ") + this.fillRequests.length);
				
				var req = this.fillRequests[0];
				this.fillRequests.splice(0, 1);
				this.fillCityWithResources(req.city, req.resType);				
			}
		},
		fillCityWithResources: function(city, resType) {
				
			var cityId = city.getId();
			var playerName = webfrontend.data.Player.getInstance().getName();			
			
			var freeSpace = Math.max(0, parseInt(city.getResourceMaxStorage(resType)) - parseInt(city.getTradeIncomingResources(resType)) - parseInt(city.getResourceCount(resType)));
			if (freeSpace < bos.Const.SHIP_CAPACITY) {
				return;
			}
			
			var req = {
				maxResourcesToBeSent: freeSpace,
				cityId: cityId,
				maxTravelTime: 48,
				targetPlayer: playerName,
				palaceSupport: false,
				resType: resType,
				allowSameContinent: true,
				allowOtherContinent: true
			}
			bos.ResourcesFiller.getInstance().populateCityWithResources(req);			
		},
		_disposeProgressDialog: function() {
			if (this._progressDialog != null) {
				this._progressDialog.disable();
				this._progressDialog.destroy();
				this._progressDialog = null;
			}
		}	
	}
});

qx.Class.define("bos.ResourcesFiller", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		
	},
	properties: {
		numberOfMessagesWaitingForResponse: {
			init: 0
		}
	},
	members: {
		lastStatus: null,		
		populateCityWithResources: function(request) {
			this.setNumberOfMessagesWaitingForResponse(this.getNumberOfMessagesWaitingForResponse() + 1);
			bos.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
				cityid: request.cityId,
				resType: request.resType,
				minResource: bos.Const.SHIP_CAPACITY,
				maxTime: request.maxTravelTime * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
			}, this, this._processTradeSearchResources, request);			
		}, 
		_processTradeSearchResources: function(result, n, request) {
			this.setNumberOfMessagesWaitingForResponse(this.getNumberOfMessagesWaitingForResponse() - 1);
			
			if (result == false || n == null) return;

			var cities = new Array();
			var transports = new Array();
			
			var destCoords = bos.Utils.convertIdToCoordinatesObject(request.cityId);

			for (var i = 0; i < n.length; i++) {
				var city = n[i];
				var srcCoords = bos.Utils.convertIdToCoordinatesObject(city.i);
				
				if (city.i == request.cityId || city.sg) {
					continue;
				}
				if (destCoords.cont == srcCoords.cont && !request.allowSameContinent) {
					continue;
				} else if (destCoords.cont != srcCoords.cont && !request.allowOtherContinent) {
					continue;
				}
				
				if (request.resType == bos.Const.FOOD) {
					var playerCities = webfrontend.data.Player.getInstance().cities;					
					var type = bos.CityTypes.getInstance().parseReference(playerCities[city.i].reference);
					if (type.isCastle) {
						continue;
					}
				}
				
				cities.push(city);
				
				if (city.lt > 0) {
					transports.push({
						cityIndex: cities.length - 1,
						capacity: city.la,
						travelTime: city.lt,
						land: true
					});
				}
				if (city.st > 0) {
					transports.push({
						cityIndex: cities.length - 1,
						capacity: city.sa,
						travelTime: city.st,
						land: false
					});					
				}

			}

			transports.sort(function(a, b) {
				if (a.travelTime > b.travelTime) {
					return 1;
				} else if (a.travelTime < b.travelTime) {
					return -1;
				} else {
					return 0;
				}
			});

			var toBeSent = request.maxResourcesToBeSent;			
			for (var i = 0, count = transports.length; i < count; i++) {
				var transport = transports[i];
				var city = cities[transport.cityIndex];
				var srcCoords = bos.Utils.convertIdToCoordinatesObject(city.i);
				
				if (toBeSent <= 0) {
					break;
				}
				
				var resCount = Math.min(city.rc, transport.capacity, toBeSent);				
				if (resCount <= 0) {
					continue;
				}
								
				var trade = {
					cityid: city.i,
					tradeTransportType: transport.land ? 1 : 2,
					targetPlayer: request.targetPlayer,
					targetCity: destCoords.xPos + ":" + destCoords.yPos,
					palaceSupport: request.palaceSupport,
					res: new Array()
				};
				
				trade.res.push({
					t: request.resType,
					c: resCount					
				});				
				
				city.rc -= resCount;
				toBeSent -= resCount;
				
				bos.net.CommandManager.getInstance().sendCommand("TradeDirect", trade, this, this._onTradeDirectSendDone, trade);	
			}

		},
		_onTradeDirectSendDone: function(isOk, result, param) {
			this.lastStatus = result;
			//console.log(isOk + " " + result + " " + param);
		}		
	}
});


qx.Class.define("bos.Server", {
	extend: qx.core.Object,
	type: "singleton",
	construct: function() {
		//webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCity, this);
		//webfrontend.data.City.getInstance().addListener("changeCity", this.onCityChanged, this);
		webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);
				
		this.persistCityTimer = new qx.event.Timer(5500);
		this.persistCityTimer.addListener("interval", this._persistPendingCity, this);	
		this.persistCityTimer.start();

		this._pollCityTimer = new qx.event.Timer(bos.Const.MIN_SEND_COMMAND_INTERVAL);
		this._pollCityTimer.addListener("interval", this._pollNextCity, this);		
	}, 
	properties: {
		lastUpdatedCityId: {
			init: false,
			event: "bos.data.changeLastUpdatedCityId"
		}, 
		lastUpdatedCityAt: {
			init: false
		}, 
		cityResourcesUpdateTime: {
			init: null,
			event: "bos.data.changeCityResourcesUpdateTime"
		}
	}, 
	members: {
		cities: new Object(),
		cityResources: new Object(),
		como: new Object(),
		_citiesToPoll: new Array(),
		_citiesToPersist: new Array(),
		_dirtyCities: new Object(),
		persistCityTimer: null,
		_pollCitiesProgressDialog: null,
		sectors: new Object(),
		onCityChanged: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}
			this.markCityDirty(city.getId());			
		},
		markCityDirty: function(s) {
			var cityId = parseInt(s, 10);
			var dirty = this._dirtyCities[cityId] || false;
			if (!dirty) {
				this._dirtyCities[cityId] = true;
				this._citiesToPersist.push(cityId);
			}
		},
		_persistPendingCity: function() {
			if (this._citiesToPersist.length == 0) {
				return;
			}
			var cityId = this._citiesToPersist[0];
			this._dirtyCities[cityId] = false;
			this._citiesToPersist.splice(0, 1);
			this.persistCity(cityId);
			return;
		},
		persistCity: function(cityId) {
			if (!bos.Storage.getInstance().getPersistingCitiesEnabled()) {
				return;
			}
			var prevCity = this.cities[cityId];
			if (prevCity != null) {
				try {
					bos.Storage.getInstance().saveCity(prevCity);
				} catch (e) {
					bos.Storage.getInstance().setPersistingCitiesEnabled(false);
					bos.Utils.handleError("Error when trying to persist city " + prevCity.getName() + ". Persisting has been disabled. Error: " + e);
				}
			}
		},
		persistAllPendingCities: function() {
			if (confirm("there are " + this._citiesToPersist.length + " cities to be saved, continue?")) {
				var count = 0;
				while (this._citiesToPersist.length > 0) {
					this._persistPendingCity();
					count++;
				}
				alert("Persisted " + count + " cities");
			}
		},
		pollCities: function(citiesToPoll) {
			this._citiesToPoll = citiesToPoll;
			
			this._disposePollCitiesProgressDialog();
			this._pollCitiesProgressDialog = new webfrontend.gui.ConfirmationWidget();
			this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch: ") + this._citiesToPoll.length);
			qx.core.Init.getApplication().getDesktop().add(this._pollCitiesProgressDialog, {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			});
			this._pollCitiesProgressDialog.show();
		
			this._pollCityTimer.start();
		},
		pollAllCities: function() {
			var citiesToPoll = [];		
		
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				if (qx.lang.Type.isNumber(cityId)) {
					citiesToPoll.push(cityId);
				}
			}
			
			this.pollCities(citiesToPoll);
		},
		_disposePollCitiesProgressDialog: function() {
			if (this._pollCitiesProgressDialog != null) {
				this._pollCitiesProgressDialog.disable();
				this._pollCitiesProgressDialog.destroy();
				this._pollCitiesProgressDialog = null;
			}
		}, 		
		_pollNextCity: function() {
			if (this._citiesToPoll.length > 0) {
				var cityId = this._citiesToPoll[0];
				this._citiesToPoll.splice(0, 1);
				bos.net.CommandManager.getInstance().pollCity(cityId);
				
				this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch: ") + this._citiesToPoll.length);
			} else {
				this._pollCityTimer.stop();
				this._disposePollCitiesProgressDialog();
			}
		},
		updateCity: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}

//bos.Utils.handleError(city.getId() + " " + city.getVersion());			
			
			//do not update the same city too often
			/*
			if (this.getLastUpdatedCityId() != null && this.getLastUpdatedCityId() == city.getId()) {
				var diff = new Date() - this.getLastUpdatedCityAt();
				if (diff < 10) {
					return;
				}
			}
*/
			var c = new bos.City();
			c.populate(city);
			if (this.cities[c.getId()] != undefined) {
				//alert("DELETE");
				this.cities[c.getId()].dispose();
				//this._disposeObjects(this.cities[c.getId()]);
				//delete this.cities[c.getId()];
			}
			this.cities[c.getId()] = c;

			this.setLastUpdatedCityId(c.getId());
			this.setLastUpdatedCityAt(new Date());
			
			this.markCityDirty(city.getId());
		},
		addCOMOItem: function(item) {
			this.como[item.i] = item;
			this.updateCityFromCOMOItem(item);
		},
		updateCityFromCOMOItem: function(item) {
			if (this.cities[item.i] == undefined) {
				return;
			}
			var city = this.cities[item.i];
			city.units = new Object();
			city.unitOrders = new Array();
			
			for (var i = 0; i < item.c.length; i++) {
				var command = item.c[i];
				var units = new Array();
				for (var j = 0; j < command.u.length; j++) {
					var unit = command.u[j];
					
					if (command.i == 0) {						
						city.units[unit.t] = {
							count: unit.c,
							total: unit.c,
							speed: -1
						};
					} else {
						var cityUnits = city.units[unit.t];
						if (cityUnits == undefined) {
							city.units[unit.t] = {
								count: 0,
								total: 0,
								speed: -1							
							}
							cityUnits = city.units[unit.t];
						}
						if (command.d == 0) {
							//delayed order cannot increase troop count
							cityUnits.total += unit.c;
						}
					}
					
					units.push({
						type: unit.t,
						count: unit.c
					});
				}
				
				if (command.i != 0) {
				//{"i":26722474,"t":8,"s":2,"cn":"Mountain:9","c":7995428,"pn":"","p":0,"e":19024467,"d":0,"q":0,"r":1,"u":[{"t":6,"c":129237}]}]},
				
					var order = {
						id: command.i,
						type: command.t,
						state: command.s,
						//start: command.ss,
						start: null,
						end: command.e,
						city: command.c,
						cityName: command.cn,
						player: command.p,
						playerName: command.pn,
						//alliance: command.a,
						//allianceName: command.an,
						units: units,
						isDelayed: command.d,
						recurringType: command.r,
						//recurringEndStep: command.rs,
						quickSupport: command.q
					};
					city.unitOrders.push(order);				
				}
			}			
		}		
	}
});

qx.Class.define("bos.Storage", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		try {
			qx.Bootstrap.setDisplayName(this, "bos.Storageoooo");
			this._player = webfrontend.data.Player.getInstance().getId();
			
			var options = this._loadOptions();
			if (options != null) {
				if (options.optionsFormatVersion != bos.Storage.OPTIONS_FORMAT_VERSION) {
					bos.Utils.handleError("This script version requires options to be in new format. Default values has been applied. Please set options again. Sorry for inconvenience");
					this.deleteAllSavedData();
					this.saveOptions(); //force saving defaults
				} else {
					this._applyOptions(options);
				}
			}

			var saved = this.getSavedCities();
			this._savedCities = [];
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];

				this._savedCities["c" + cityId] = cityId;
			}			
		} catch (e) {
			bos.Utils.handleError("Error loading LoU BOS settings: " + e + ".\nIt may mean that you browser has disabled local storage.\nTo turn local storage on - in Firefox please open page 'about:config' and make sure that in 'dom.storage.enabled' you have true value. For Firefox please make sure that you have cookies enabled");
		}
	}, 
	statics: {
		OPTIONS_FORMAT_VERSION: 0
	}, 
	properties: {
		persistingCitiesEnabled: {
			init: true
		}, 
		loadPersistedCitiesAtStart: {
			init: true
		}, 
		optionsFormatVersion: {
			init: 0
		}, 
		loadTableSettingsAtStart: {
			init: false
		}, 
		citiesTableSettings: {
			init: null
		}, 
		militaryTableSettings: {
			init: null
		}, 
		moonstonesTableSettings: {
			init: null
		}, 
		moonglowTowers: {
			init: []
		}, 
		customCityTypes: {
			init: []
		}, 
		summaryPosition: {
			init: null
		}, 
		tradeRoutesVersion: {
			init: 0,
			event: "changeTradeRoutesVersion"
		},
		recruitmentOrdersVersion: {
			init: 0,
			event: "changeRecruitmentOrdersVersion"
		},
		intelligenceVersion: {
			init: 0,
			event: "changeIntelligenceVersion"
		},
		customCityTypesVersion: {
			init: 0,
			event: "changeCustomCityTypesVersion"
		},		
		tweakReportAtStart: {
			init: false	
		}, 
		tweakChatAtStart: {
			init: false
		}, 
		startRefreshingResourcesAtStart: {
			init: false
		}
	}, members: {
		_savedCities: null,		
		_citiesWithMooglowTower: null,
		_tradeRoutes: null,
		_recruitmentOrders: null,
		_intelligence: null,
		_player: "",
		_getValue: function(key, namespace) {
			var result = GM_getValue(this._calculateKey(key, namespace, true));
			if (result == null) {
				result = GM_getValue(this._calculateKey(key, namespace, false));
			}
			return result;
		}, 
		_setValue: function(key, value, namespace) {
			GM_setValue(this._calculateKey(key, namespace, true), value);		
		}, 
		_calculateKey: function(key, namespace, withPlayer) {
			if (namespace == undefined) {
				namespace = "Storage";
			}		
			if (withPlayer == undefined) {
				withPlayer = true;
			}
			if (withPlayer) {
				return "bos." + this._player + "." + namespace + "." + key;				
			} else {
				return "bos." + namespace + "." + key;
			}
		}, 
		_loadOptions: function() {
			var json = this._getValue("options");
			var options = null;
			if (json != null) {
				options = qx.lang.Json.parse(json);
			}
			return options;
		}, 
		_applyOptions: function(options) {
			this.setOptionsFormatVersion(options.optionsFormatVersion);
			this.setPersistingCitiesEnabled(options.persistingCitiesEnabled);
			this.setLoadPersistedCitiesAtStart(options.loadPersistedCitiesAtStart);
			this.setCitiesTableSettings(options.citiesTableSettings);
			this.setMilitaryTableSettings(options.militaryTableSettings);
			if (options.moonstonesTableSettings != undefined) {
				this.setMoonstonesTableSettings(options.moonstonesTableSettings);
			}
			if (options.loadTableSettingsAtStart != undefined) {
				this.setLoadTableSettingsAtStart(options.loadTableSettingsAtStart);
			}
			if (options.moonglowTowers != undefined) {
				this.setMoonglowTowers(options.moonglowTowers);
			}
			if (options.customCityTypes != undefined) {
				this.setCustomCityTypes(options.customCityTypes);
			}
			if (options.summaryPosition != undefined) {
				this.setSummaryPosition(options.summaryPosition);
			}
			if (options.tweakReportAtStart != undefined) {
				this.setTweakReportAtStart(options.tweakReportAtStart);
			}
			if (options.tweakChatAtStart != undefined) {
				this.setTweakChatAtStart(options.tweakChatAtStart);
			}
			if (options.startRefreshingResourcesAtStart != undefined) {
				this.setStartRefreshingResourcesAtStart(options.startRefreshingResourcesAtStart);
			}						
		}, 
		saveCity: function(city) {
			var simple = city.toSimpleObject();
			var json = qx.lang.Json.stringify(simple);
			this._setValue(city.getId(), json, "City");

			this._savedCities["c" + city.getId()] = city.getId();
			this._saveSavedCities();
		}, 
		loadCity: function(cityId) {
			var json = this._getValue(cityId, "City");
			if (json == null)
				return null;
			var parsed = qx.lang.Json.parse(json);
			var city = bos.City.createFromSimpleObject(parsed);
			return city;
		}, 
		_calculateCityKey: function(cityId) {			
			return "bos.City." + cityId;			
		}, 
		getSavedCities: function() {
			var s = this._getValue("index", "City");
			var cities = [];
			if (s != null) {
				cities = qx.lang.Json.parse(s);
			}
			return cities;
		}, 
		_saveSavedCities: function() {
			var cities = [];
			for (var key in this._savedCities) {
				var cityId = parseInt(key.substring(1));
				if (!isNaN(cityId)) {
					cityId = parseInt(this._savedCities[key]);
					if (!isNaN(cityId)) {
							cities.push(cityId);
					}
				}
			}

			var json = qx.lang.Json.stringify(cities);
			this._setValue("index", json, "City");
		}, 
		deleteAllSavedData: function() {
			var saved = this.getSavedCities();
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];
				GM_deleteValue(this._calculateKey(cityId, "City"));
			}
			GM_deleteValue(this._calculateKey("index", "City"));

			this._savedCities = [];
		}, 
		saveOptions: function() {
			var o = {
				persistingCitiesEnabled: this.getPersistingCitiesEnabled(),
				loadPersistedCitiesAtStart: this.getLoadPersistedCitiesAtStart(),
				tweakChatAtStart: this.getTweakChatAtStart(),				
				tweakReportAtStart: this.getTweakReportAtStart(),
				startRefreshingResourcesAtStart: this.getStartRefreshingResourcesAtStart(),
				
				loadTableSettingsAtStart: this.getLoadTableSettingsAtStart(),							
				citiesTableSettings: this.getCitiesTableSettings(),
				militaryTableSettings: this.getMilitaryTableSettings(),
				moonstonesTableSettings: this.getMoonstonesTableSettings(),
				summaryPosition: this.getSummaryPosition(),
									
				moonglowTowers: this.getMoonglowTowers(),
				customCityTypes: this.getCustomCityTypes(),
				optionsFormatVersion: bos.Storage.OPTIONS_FORMAT_VERSION
			}
			var json = qx.lang.Json.stringify(o);
			this._setValue("options", json);
						
		}, 
		setTableSettings: function(settings, tableName) {
			//not the best way to do it
			switch (tableName) {
				case "cities":
					this.setCitiesTableSettings(settings);
					break;
				case "military":
					this.setMilitaryTableSettings(settings);
					break;
				case "moonstones":
					this.setMoonstonesTableSettings(settings);
					break;
				default:
					bos.Utils.handleError("Unknown table name " + tableName);
					break;
			}
		}, 
		addMoonglowTower: function(cityId, towerId) {		
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					o.towerId = towerId;
					this.saveOptions();
					return;
				}
			}
			var t = {
				cityId: cityId,
				towerId: towerId
			};
			this.getMoonglowTowers().push(t);
			this._citiesWithMooglowTower = null;
			this.saveOptions();
		}, 
		removeMoonglowTower: function(cityId) {
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					this.getMoonglowTowers().splice(i, 1);
					this._citiesWithMooglowTower = null;
					this.saveOptions();
					return;
				}
			}								
		}, 
		findMoonglowTowerId: function(cityId) {
			var withMoonglow = this.getCitiesWithMooglowTower();
			if (withMoonglow["c" + cityId] == undefined) {
				return -1;
			} else {
				return withMoonglow["c" + cityId];
			}
			/*
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {											
					return o.towerId;
				}
			}
			return -1;
			*/
		}, 
		getCitiesWithMooglowTower: function() {
			if (this._citiesWithMooglowTower == null) {
				this._citiesWithMooglowTower = [];
				for (var i = 0; i < this.getMoonglowTowers().length; i++) {
					var o = this.getMoonglowTowers()[i];
					this._citiesWithMooglowTower["c" + o.cityId] = o.towerId;
				}										
			}
			return this._citiesWithMooglowTower;
		}, 
		addCustomCityType: function(letter, description) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					o.description = description;
					return;
				}
			}
			var t = {
				letter: letter,
				description: description
			};
			this.getCustomCityTypes().push(t);

			this.setCustomCityTypesVersion(this.getCustomCityTypesVersion() + 1);			
		}, 
		removeCustomCityType: function(letter) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					this.getCustomCityTypes().splice(i, 1);							
					return;
				}
			}

			this.setCustomCityTypesVersion(this.getCustomCityTypesVersion() + 1);			
		}, 
		loadTradeRoutes: function() {
			this._tradeRoutes = [];
			var json = this._getValue("tradeRoutes");			
			if (json != null) {
				this._tradeRoutes = qx.lang.Json.parse(json);
			}
			return this._tradeRoutes;
		}, 
		getTradeRoutes: function() {
			if (this._tradeRoutes == null) {
				this.loadTradeRoutes();
			}
			return this._tradeRoutes;		
		}, 
		saveTradeRoutes: function() {
			var json = qx.lang.Json.stringify(this._tradeRoutes);
			this._setValue("tradeRoutes", json);			
		}, 
		addTradeRoute: function(route) {
			route.id = this._tradeRoutes.length + 1;
			this._tradeRoutes.push(route);
			this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
			this.saveTradeRoutes();
			return route.id;
		}, 
		removeTradeRoute: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {
					this._tradeRoutes.splice(i, 1);
					this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
					this.saveTradeRoutes();
					return true;
				}
			}
			return false;
		},
		findTradeRouteById: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {					
					return r;
				}
			}
			return null;			
		},
		importTradeRoutes: function(json) {
			try {
				var required = ["from", "to", "wood", "stone", "iron", "food", "transport", "group"];
				var orders = qx.lang.Json.parse(json);
				for (var i = 0; i < orders.length; i++) {
					var order = orders[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!order.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(order);
							return;
						}
					}
				}				
				
				this._tradeRoutes = orders;
				this.saveTradeRoutes();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},		
		loadRecruitmentOrders: function() {
			this._recruitmentOrders = [];
			var json = this._getValue("recruitmentOrders");			
			if (json != null) {
				this._recruitmentOrders = qx.lang.Json.parse(json);
			}
			return this._recruitmentOrders;
		}, 
		getRecruitmentOrders: function() {
			if (this._recruitmentOrders == null) {
				this.loadRecruitmentOrders();
			}
			return this._recruitmentOrders;		
		}, 
		saveRecruitmentOrders: function() {
			var json = qx.lang.Json.stringify(this._recruitmentOrders);
			this._setValue("recruitmentOrders", json);			
		}, 
		addRecruitmentOrder: function(order) {			
			this._recruitmentOrders.push(order);
			this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
			this.saveRecruitmentOrders();
		}, 
		removeRecruitmentOrder: function(cityId) {
			for (var i = 0; i < this._recruitmentOrders.length; i++) {
				var o = this._recruitmentOrders[i];
				if (o.cityId == cityId) {
					this._recruitmentOrders.splice(i, 1);
					this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
					this.saveRecruitmentOrders();
					return true;
				}
			}
			return false;
		},
		findRecruitmentOrderById: function(cityId) {
			for (var i = 0; i < this.getRecruitmentOrders().length; i++) {
				var o = this.getRecruitmentOrders()[i];
				if (o.cityId == cityId) {					
					return o;
				}
			}
			return null;			
		},
		importRecruitmentOrders: function(json) {
			try {
				var required = ["cityId", "units"];
				var orders = qx.lang.Json.parse(json);
				for (var i = 0; i < orders.length; i++) {
					var order = orders[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!order.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(order);
							return;
						}
					}
				}				
				
				this._recruitmentOrders = orders;
				this.saveRecruitmentOrders();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},

		loadIntelligence: function() {
			this._intelligence = [];
			var json = this._getValue("intelligence");			
			if (json != null) {
				this._intelligence = qx.lang.Json.parse(json);
			}
			return this._intelligence;
		}, 
		getIntelligence: function() {
			if (this._intelligence == null) {
				this.loadIntelligence();
			}
			return this._intelligence;		
		}, 
		saveIntelligence: function() {
			var json = qx.lang.Json.stringify(this._intelligence);
			this._setValue("intelligence", json);			
		}, 
		addIntelligence: function(intel) {			
			this.getIntelligence().push(intel);
			this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
			this.saveIntelligence();
		}, 
		removeIntelligence: function(cityId) {
			for (var i = 0; i < this._intelligence.length; i++) {
				var o = this._intelligence[i];
				if (o.cityId == cityId) {
					this._intelligence.splice(i, 1);
					this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
					this.saveIntelligence();
					return true;
				}
			}
			return false;
		},
		findIntelligenceById: function(cityId) {
			for (var i = 0; i < this.getIntelligence().length; i++) {
				var o = this.getIntelligence()[i];
				if (o.cityId == cityId) {					
					return o;
				}
			}
			return null;			
		},
		mergeIntelligence: function(json) {
			try {
				var required = ["cityId", "name", "isLandlocked", "hasCastle", "owner", "description", "lastModified", "modifiedBy"];
				var intelligence = qx.lang.Json.parse(json);
				for (var i = 0; i < intelligence.length; i++) {
					var intel = intelligence[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!intel.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(intel);
							return;
						}
					}
				}

				for (var i = 0; i < intelligence.length; i++) {
					var intel = intelligence[i];
					var old = this.findIntelligenceById(intel.cityId);
					if (old == null) {
						this.addIntelligence(intel);
					} else if (intel.lastModified > old.lastModified) {
						if (confirm("Would you like to replace intel for '" + old.name + "' - '" + old.description + "' with '" + intel.description + "'?")) {
							for (var j = 0; j < this.getIntelligence().length; j++) {
								var o = this.getIntelligence()[j];
								if (o.cityId == intel.cityId) {					
									this.getIntelligence()[j] = intel;								
									break;
								}
							}
						}						
					}
				}
				
				this.saveIntelligence();
				this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},		
		getPurifyOptions: function() {
			var json = this._getValue("purifyOptions");
			var options;
			if (json != null) {
				options = qx.lang.Json.parse(json);
			} else {
				options = {					
					includeCastles: false,
					useRecruitmentData: false,
					ministerBuildPresent: webfrontend.data.Player.getInstance().getMinisterTradePresent()
				};
				
				if (options.ministerBuildPresent) {
					options.minimumResLevels = [0, 20, 20, 20, 20];
				} else {
					options.minimumResLevels = [0, 50000, 50000, 50000, 50000];
				}
			}
			return options;
		},
		savePurifyOptions: function(options) {
			options.ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			var json = qx.lang.Json.stringify(options);
			this._setValue("purifyOptions", json);
		}
	}
});

qx.Class.define("bos.net.CommandManager", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		this._sendTimer = new qx.event.Timer(bos.Const.MIN_SEND_COMMAND_INTERVAL);
		this._sendTimer.addListener("interval", this.sendPendingCommand, this);	
		this._sendTimer.start();		
	},
	properties: {
		lastSendCommand: {
			init: 0
		}
	},
	members: {
		_toSend: [],
		_sendTimer: null,
		sendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			if (now - this.getLastSendCommand() >= bos.Const.MIN_SEND_COMMAND_INTERVAL) {
				this.forcedSendCommand(endPoint, request, context, onSendDone, extraValue);
			} else {
				this._toSend.push({
					endPoint: endPoint, 
					request: request, 
					context: context, 
					onSendDone: onSendDone, 
					extraValue: extraValue
				});
			}
		},
		getNumberOfPendingCommands: function() {
			return this._toSend.length;
		},
		forcedSendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			webfrontend.net.CommandManager.getInstance().sendCommand(endPoint, request, context, onSendDone, extraValue);			
			this.setLastSendCommand(now);		
		}, 
		sendPendingCommand: function() {
			if (this._toSend.length > 0) {
				var o = this._toSend[0];
				this._toSend.splice(0, 1);
				this.forcedSendCommand(o.endPoint, o.request, o.context, o.onSendDone, o.extraValue);
			}
		},
		pollCity: function(cityId) {
			var sb = new qx.util.StringBuilder(2048);
			sb.add("CITY", ":", cityId, '\f');
			this.poll(sb.get(), cityId);
		},
		pollWorld: function(sectorIds) {
			var sb = new qx.util.StringBuilder(2048);
			sb.add("WORLD", ":");
			
			for (var i = 0; i < sectorIds.length; i++) {
				var sectorId = sectorIds[i];
				var s = I_KEB_MEB(sectorId) + I_KEB_REB(0);
				sb.add(s);
			}
			
			sb.add('\f');
			this.poll(sb.get(), sectorIds);
		},
		poll: function(requests, callbackArg) {
			this.requestCounter = 0;
			
			var updateManager = webfrontend.net.UpdateManager.getInstance();
			
			var data = new qx.util.StringBuilder(2048);
			data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', qx.lang.Json.stringify(requests), "}");
			updateManager.requestCounter++;			
			
			var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
			req.setProhibitCaching(false);
			req.setRequestHeader("Content-Type", "application/json");
			req.setData(data.get());
			req.setTimeout(10000);
			req.addListener("completed", function(e) {
				this.completeRequest(e, callbackArg);
			}, this);
			req.addListener("failed", this.failRequest, this);
			req.addListener("timeout", this.timeoutRequest, this);
			req.send();			
		},
		completeRequest: function(e, obj) {
		
			if (e.getContent() == null) return;
			
			for (var i = 0; i < e.getContent().length; i++) {
				var item = e.getContent()[i];
				var type = item.C;
				if (type == "CITY") {
					this.parseCity(obj, item.D);
				} else if (type == "WORLD") {
					this.parseWorld(item.D);
				} else if (type == "OA") {
					this.parseOA(item.D);
				}
			}
		}, 
		failRequest: function(e) {
			
		}, 
		timeoutRequest: function(e) {
			
		},
		parseOA: function(data) {
			if (data == null || data.a == null) {
				return;
			}
			try {
				var sum = 0;
				for (var i = 0; i < data.a.length; i++) {
					var a = data.a[i];
					sum += a.ta;					
				}
				console.log(sum);
			} catch (e) {
				bos.Utils.handleError(e);
			}			
		},
		parseWorld: function(data) {
			if (data == null || data.s == null) {
				return;
			}
			try {
				var server = bos.Server.getInstance();
				for (var i = 0; i < data.s.length; i++) {
					var d = data.s[i];
					
					var sector;
					if (server.sectors[d.i] != null) {
						sector = server.sectors[d.i];
					} else {
						sector = new bosSector();
					}
					sector.init(d);

					server.sectors[d.i] = sector;
				}
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},
		parseCity: function(cityId, data) {
			try {
				var server = bos.Server.getInstance();
				var city = server.cities[cityId];
				var store = false;
				if (city == undefined) {
					city = new bos.City();
					store = true;
				}
				city.dispatchResults(data);
				if (store) {
					city.setId(cityId);
					server.cities[cityId] = city;
				}
				server.markCityDirty(cityId);
			} catch (e) {
				bos.Utils.handleError(e);
			}
		}
	}
});


qx.Class.define("bos.Tweaks", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		gameStarted: function() {
			trace("In gameStarted");

			this.tweakErrorReporting();
			var res = webfrontend.res.Main.getInstance();		

			try {
				var container = a.title.reportButton.getLayoutParent();
				var btnSummary = new qx.ui.form.Button(tr("summary")).set({
					marginLeft: 10
				});
				btnSummary.setWidth(78);
				btnSummary.setHeight(32);
				container._add(btnSummary, {
					row: 0,
					column: 13
				});
				btnSummary.addListener("click", function (event) {
					bos.Tweaks.getInstance().showSummary();
				}, this);			

				var menu = new qx.ui.menu.Menu();

				var btnCombatCalc = new qx.ui.menu.Button(tr("combat calculator"), null);
				btnCombatCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showCombatCalc();
				});

				var btnFoodCalc = new qx.ui.menu.Button(tr("food calculator"), null);
				btnFoodCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showFoodCalc();
				});
				
				var btnRecruitmentSpeedCalc = new qx.ui.menu.Button(tr("recruitment speed calculator"), null);
				btnRecruitmentSpeedCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showRecruitmentSpeedCalc();
				});								

				var btnJumpCoords = new qx.ui.menu.Button(tr("jump to coords"), null);
				btnJumpCoords.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showJumpToCoordsDialog();
				});

				var btnJumpToCity = new qx.ui.menu.Button(tr("jump to city"), null);
				btnJumpToCity.addListener("execute", function(event) {
					var s = prompt(tr("please enter city coordinates"), "");
					if (s != null && s != "") {
						s.match(/^(\d{1,3}):(\d{1,3})$/);
						var x = parseInt(RegExp.$1, 10);
						var y = parseInt(RegExp.$2, 10);
						webfrontend.gui.Util.openCityProfile(x, y);
					}
				});

				var btnJumpPlayer = new qx.ui.menu.Button(tr("jump to player"), null);
				btnJumpPlayer.addListener("execute", function(event) {
					var name = prompt(tr("please enter player name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openPlayerProfile(name);					        
						a.showInfoPage(a.getPlayerInfoPage(), {
							name: name
						});
					}
				});

				var btnJumpAlliance = new qx.ui.menu.Button(tr("jump to alliance"), null);
				btnJumpAlliance.addListener("execute", function(event) {
					var name = prompt(tr("please enter alliance name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openAllianceProfile(name);
						bos.Utils.showAllianceInfo({
							name: name
						});
					}
				});
				
				var btnJumpContinent = new qx.ui.menu.Button(tr("jump to continent"), null);
				btnJumpContinent.addListener("execute", function(event) {
					var s = prompt(tr("please enter continent:"), "");
					if (s != null && s != "") {
						var cont = parseInt(s, 10);
						var col = Math.floor(cont % 10);
						var row = Math.floor(cont / 10);						
						var srv = webfrontend.data.Server.getInstance();
						var height = srv.getContinentHeight();
						var width = srv.getContinentWidth();
						
						var x = Math.floor(col * width + 0.5 * width);
						var y = Math.floor(row * height + 0.5 * height);
						
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				});
				
				var btnExtraSummary = new qx.ui.menu.Button(tr("extra summary"), null);
				btnExtraSummary.addListener("execute", this.extraSummary);
				
				menu.add(btnCombatCalc);
				menu.add(btnFoodCalc);
				menu.add(btnRecruitmentSpeedCalc);
				menu.addSeparator();
				menu.add(btnJumpCoords);
				menu.add(btnJumpToCity);
				menu.add(btnJumpPlayer);
				menu.add(btnJumpAlliance);
				menu.add(btnJumpContinent);
				
				menu.addSeparator();
				menu.add(btnExtraSummary);
				menu.addSeparator();
				
				var btnZoomOut = new qx.ui.menu.Button(tr("zoom out"), null);
				btnZoomOut.addListener("execute", function(event) {
					this.setZoom(0.5);					
				}, this);				
				
				menu.add(btnZoomOut);
				
				var btnZoomIn = new qx.ui.menu.Button(tr("zoom in"), null);
				btnZoomIn.addListener("execute", function(event) {				
					this.setZoom(1.0);
				}, this);								
				menu.add(btnZoomIn);
				
				menu.addSeparator();
				
				var btnFillWithResources = new qx.ui.menu.Button(tr("fill with resources"), null);
				btnFillWithResources.addListener("execute", function(event) {
					bos.gui.ResourcesFillerWidget.getInstance().open();
					bos.gui.ResourcesFillerWidget.getInstance().setCurrentCityAsTarget();
				}, this);
				menu.add(btnFillWithResources);				
												
				var btnMenu = new qx.ui.form.MenuButton("BOS Tools", null, menu).set({
					marginLeft: 10
				});
				container._add(btnMenu, {
					row: 0,
					column: 14
				});
								
				var zoomSlider = new qx.ui.form.Slider().set({
					minimum: 25,
					maximum: 200,
					singleStep: 5,
					pageStep: 1,
					value: 100,
					width: 200
				});
				zoomSlider.addListener("changeValue", function(e) {
					this.setZoom(zoomSlider.getValue() / 100.0);
				}, this);
				
				var btnZoomReset = new qx.ui.form.Button("R");
				btnZoomReset.addListener("execute", function(e) {
					this.setZoom(1);
					zoomSlider.setValue(100);
				}, this);
				
				var zoomBox = new qx.ui.container.Composite().set({
					width: 250,
					height: 28
				});
				zoomBox.setLayout(new qx.ui.layout.HBox(0));
				zoomBox.add(zoomSlider);
				zoomBox.add(btnZoomReset);
				
				qx.core.Init.getApplication().getDesktop().add(zoomBox, {
					  left: 400 + 300,
					  top: 70,
					  right: null
				});
						
			} catch (e) {
				bos.Utils.handleError(tr("error during BOS Tools menu creation: ") + e);
			}

			a.overlaySizes[bos.Const.EXTRA_WIDE_OVERLAY] = {
					width: 0,
					height: 0
			};

			var pos = a.overlayPositions[0];
			a.overlayPositions[bos.Const.EXTRA_WIDE_OVERLAY] = {
				left: pos.left,
				top: pos.top,
				bottom: pos.bottom
			};

			server = bos.Server.getInstance();
			
			try {
				this.applyPersistedTweaks();
			} catch (e) {
				bos.Utils.handleError("applyPersistedTweaks failed " + e);
			}
			
			trace("after gameStarted");
			
		},
		sentResourcesCounter: {},
		countSentResources: function(x, y) {
			this.sentResourcesCounter = new Object();
			var cityId = bos.Utils.convertCoordinatesToId(x, y);
			bos.net.CommandManager.getInstance().sendCommand("ReportGetCount", {
				"folder": 0,
				"city": cityId,
				"mask": 197119
			}, this, this.processReportGetCount, cityId);
		},
		processReportGetCount: function(isOk, result, cityId) {
			if (isOk && result != null) {
				var count = result;
				
				bos.net.CommandManager.getInstance().sendCommand("ReportGetHeader", {
					"folder": 0,
					"city": cityId,
					"start": 0,
					"end": count, 
					"sort": 0,
					"ascending": false,
					"mask": 197119
				}, this, this.processReportGetHeader, cityId);				
								
			}
		},
		processReportGetHeader: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.sentResourcesCounter = {
					reports: 0,
					ok: 0,
					errors: 0,
					players: {}
				};
				for (var i = 0; i < result.length; i++) {
					var report = result[i];
					if (report.t == "02010" || report.t == "02110") {
						//resources arrived
						this.sentResourcesCounter.reports++;
						bos.net.CommandManager.getInstance().sendCommand("GetReport", {
							"id": report.i,
						}, this, this.processGetReport, {cityId: cityId, state: this.sentResourcesCounter});						
					}
				}			
			}
		},
		processGetReport: function(isOk, result, params) {
			if (isOk && result != null) {
				params.state.ok++;
				var players = params.state.players;
				if (players[result.h.p] == undefined) {
					players[result.h.p] = {
						1: 0,
						2: 0,
						3: 0,
						4: 0
					};
				}
				var res = players[result.h.p];
				
				for (var i = 0; i < result.r.length; i++) {
					var item = result.r[i];
					res[item.t] += item.v;
				}
			} else {
				params.state.errors++;
			}
			
			if (params.state.errors + params.state.ok >= params.state.reports) {
				var json = qx.lang.Json.stringify(params);
				bos.Utils.displayLongText(json);
			}
		},
		setZoom: function(zoom) {
			//for region and world
			var visMain = ClientLib.Vis.VisMain.GetInstance();
			visMain.set_ZoomFactor(zoom);
			
			//for city view
			try {
				if (qx.bom.client.Engine.GECKO) {
					a.visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
					a.visMain.scene.domRoot.style["overflow"] = "hidden";
				} else {
					a.visMain.scene.domRoot.style["zoom"] = zoom;
				}
			} catch (ex) {
				//ignore any exception
			}
		},
		extraSummary: function() {
			var widget = bos.gui.ExtraSummaryWidget.getInstance();
			widget.open();
		},
		tweakErrorReporting: function() {
			if (bos.Const.DEBUG_VERSION) {
				//qx.event.GlobalError.setErrorHandler(null, this);
				//window.onerror = null;
				qx.event.GlobalError.setErrorHandler(handleError, this);
				//qx.event.GlobalError.setErrorHandler(null, this);
			}
		}, 
		bosTest: function() {
			//webfrontend.net.UpdateManager.getInstance().completeRequest = this.test_completeRequest;
		},
		tweakReports: function() {

			if (reportsTweaked) {
				return;
			}

			trace("in tweakReports");
			//a.title.reportButton.removeListener(a.title.reportButton, reportsBtnListener);

			//webfrontend.gui.ReportListWidget
			var rep = a.title.report;
			if (rep == null) {
				debug("rep is NULL");
				return;
			}

			rep.selectAllBtn.set({
				width: 90
			});

			rep.deleteBtn.set({
				width: 90
			});

			var left = 110;
			var step = 35;
			var bottom = 7;

			var selectDropdown = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});

			var locale = qx.locale.Manager.getInstance().getLocale();
			if (locale == "de") {
				selectDropdown.add(new qx.ui.form.ListItem("Keine", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("Alle", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Spionage", null, "Spionage: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plünderung", null, "Plünderung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Überfall", null, "Überfall: "));
				selectDropdown.add(new qx.ui.form.ListItem("Belagerung", null, "Belagerung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Unterstützung", null, "Unterstützung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Waren", null, "Waren: "));
				selectDropdown.add(new qx.ui.form.ListItem("Handel", null, "Handel: "));
				selectDropdown.add(new qx.ui.form.ListItem("Jagd", null, "Jagd: "));
				selectDropdown.add(new qx.ui.form.ListItem("Schatzsuche", null, "Schatzsuche: "));
			} else {
				selectDropdown.add(new qx.ui.form.ListItem("None", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("All", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Assault", null, "Assault: |: Assaulted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Goods", null, "Goods: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plunder", null, "Plunder: |: Plundered by "));
				selectDropdown.add(new qx.ui.form.ListItem("Raids", null, "Raid: "));
				selectDropdown.add(new qx.ui.form.ListItem("Scout", null, "Scout: |: Scouted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Siege", null, "Siege: |: Siege canceled by |: Sieged by |Reinforcement: Joins Siege vs."));
				selectDropdown.add(new qx.ui.form.ListItem("Support", null, ": Support sent for your city |: Support from |Support: Your troops arrived at |: Support retreat by |Support: Sent home by "));
				selectDropdown.add(new qx.ui.form.ListItem("Trade", null, "Trade: "));
			}

			selectDropdown.addListener("changeSelection", function onReportSelectFilter() {
				var sel = selectDropdown.getSelection()[0].getModel();
				selectReports(sel);
			}, false);


			rep.clientArea.add(selectDropdown, {
				bottom: 1,
				right: 1
			});
			//right = 100 + 1;

			var btnExport = new qx.ui.form.Button("Export");
			btnExport.set({width: 60, appearance: "button-text-small", toolTipText: locale =="de" ? "Exportieren den ausgewählten Report" : "Export selected reports."});
			btnExport.addListener("click", exportSelectedReports, false);
			rep.clientArea.add(btnExport, {
				bottom: 1,
				right: 110
			});
			//right += step;

			var tcm = rep.headers.getTableColumnModel();
			var behavior = tcm.getBehavior();
			behavior.setWidth(2, 90);

			//webfrontend.gui.ReportPage
			var reportPage = a.getReportPage();
			var widgets = reportPage.getChildren();
			var container = widgets[widgets.length - 1];
			var btnExportThisReport = new qx.ui.form.Button("Export");
			btnExportThisReport.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, this, parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportThisReport);
			
			var btnExportToCombatCalc = new qx.ui.form.Button(locale == "de" ? "Zum Kampfkalk hinzuf." : "To Combat calc");
			btnExportToCombatCalc.setToolTipText(locale == "de" ? "Fügt den Spionage Report zum Kampfkalkulator hinzu." : "Adds <b>scout</b> report to combat calculator");
			btnExportToCombatCalc.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					onCombatCalc();
					var combat = getCombatCalculatorWidget();
					combat.addDefendersFromReport = true;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, combat, combat.parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportToCombatCalc);						
			
			trace("after tweakReports");

			reportsTweaked = true;
			
		}, 
		applyPersistedTweaks: function() {
			var storage = bos.Storage.getInstance();
						
			if (storage.getTweakReportAtStart()) {
				this.tweakReport();
			}
			
			if (storage.getTweakChatAtStart()) {
				this.tweakChat();
			}	
			
		}, 
		tweakChat: function() {		
			var cls = a.chat;
			if (cls.oldOnNewMessage != undefined) {
				//already applied
				return;
			}
			
			a.chat.tabView.addListener("changeSelection", this._onChatChangeTab, this);
			a.chat.tabView.setSelection([a.chat.tabView.getChildren()[1]]);
			
			this._onChatChangeTab();
			
			cls.oldOnNewMessage = cls._onNewMessage;			
					
		}, 
		_onChatChangeTab: function(event) {
			var chatId = a.chat.tabView.getSelection()[0].getUserData("ID");
			var ch = a.chat.chatLine;
			
			switch (chatId) {
				case 0:
					ch.setBackgroundColor("red");
					break;
				case 1:
					ch.setBackgroundColor("");
					break;
				case 99:
					ch.setBackgroundColor("");
					break;
			}
									
		},
		showJumpToCoordsDialog: function() {
			var cwac = jumpCoordsDialog();
			cwac.askCoords();
			a.allowHotKey = false;
			qx.core.Init.getApplication().getDesktop().add(cwac, {left: 0, right: 0, top: 0, bottom: 0});
			cwac.show();
		},
		showSummary: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			
			var summary = getSummaryWidget();
			if (summary.isVisible()) {
			  summary.close();
			} else {
			  summary.open();
			  summary.updateView();
			}
		},		
		showCombatCalc: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getCombatCalculatorWidget();
			//widget.updateView();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget, bos.Const.EXTRA_WIDE_OVERLAY);
			}
		},
		showFoodCalc: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getFoodCalculatorWidget();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget);
			}
		},
		showRecruitmentSpeedCalc: function () {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getRecruitmentSpeedCalculatorWidget();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget);
			}
		},	
		getCombatCalculatorWidget: function() {
			if (this.combatCalculatorWidget == null) {
				this.combatCalculatorWidget = new bos.gui.CombatCalculatorWidget();
			}
			return this.combatCalculatorWidget;
		},
		getFoodCalculatorWidget: function() {
			if (this.foodCalculatorWidget == null) {
				this.foodCalculatorWidget = new bos.gui.FoodCalculatorWidget();
			}
			return this.foodCalculatorWidget;
		},
		getRecruitmentSpeedCalculatorWidget: function () {
			if (this.recruitmentSpeedCalculatorWidget == null) {
				this.recruitmentSpeedCalculatorWidget = new bos.gui.RecruitmentSpeedCalculatorWidget();
			}
			return this.recruitmentSpeedCalculatorWidget;
		}		
	}
});

/** code by XyFreak and Secusion */
qx.Class.define("bos.SharestringConverter", {
	type: "singleton",
	extend: qx.core.Object,
	statics: {
		fieldmask:"########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--VV--##---------#----V--V-##---------#----V---V###--------#-----V-######-------#------V########################",
		fcp: new Array("B","A","C","D","2","3","5","O","J","4","K","N","1","L","M","E","P","S","Q","U","V","Y","Z","X","T","R","W","","0","F","G","H","I"),
		ncp: new Array(":",".",",",";","2","3","1","C","P","4","L","M","H","A","D","U","B","K","G","E","Y","V","S","X","R","J","Z","#","-","W","Q","I","F")

	},
	construct: function(inputstring) {
		raw = this._convert(inputstring);
	},
	members: {
		raw: null,
		_convert: function(inputstring) {
			var letter = inputstring[0];

			if (letter =="h") {
				var tmp = inputstring.split("=");
				var raw = tmp[1];
			
				if (raw.length == 294){
					return this.fcp2ncp(raw);
				} else {
					throw new Exception("Incorrect length of raw string " + raw.length);
				}
			} else if (letter=="[") {
				var pos = inputstring.indexOf("]");
				var raw = inputstring.slice(pos + 1, pos + 443);					
				return this.ncp2fcp(raw);
			}	
				
			throw new Exception("Incorrect sharestring format");			
		},
		fcp2ncp: function(str) {

			var watercity;
						
			if (str.length != 294) {
				throw new Exception("Incorrect sharestring length");
			}
			
			var out  = "[ShareString.1.3]";
			if (str[0] == 'W') {
				out += ";";
				watercity = true;
			} else if (str[0] == 'L') {
				out += ":";
				watercity = false;
			} else {
				throw new Exception("Incorrect sharestring format");
			}
			
			var i,j, iswater = false;
			for (i = 0, j = 1; i < bos.SharestringConverter.fieldmask.length; i++ ) {
				var mask = bos.SharestringConverter.fieldmask[i];
				if (watercity && mask == 'V') {
					iswater = !iswater;
				}

				if (mask == '#') {
					out += "#";
					iswater = false;
				} else if (mask == 'T') {
					j++;
					out += "T";
				} else if (watercity && str[j] == '0' && mask == 'V' ) {
					j++;
					out += '_';
				} else if(watercity && iswater && str[j] == '0') {
					j ++;
					out += "#";
				} else {
					out += this._convertFCPtoNCPchar(str[j++]);
				}
			}			
			return out;
		},
		_convertFCPtoNCPchar: function(str) {
			for(var i = 0; i < fcp.length; i ++) {
				if(fcp[i] == str) {
					return ncp[i];
				}
			}
			return "@";
		},
		ncp2fcp: function(rawstring){		
			var watercity = false;
			var tempstring = "http://www.lou-fcp.co.uk/map.php?map=";
			for(var i = 1; i < 442; i++) {
				if(i==1 && rawstring.charAt(0) == ";"){
					tempstring = tempstring + "W";
					watercity = true;
				}
				if(i==1 && rawstring.charAt(0)==":"){
					tempstring=tempstring+"L";
				}

				if(i==221 && watercity){
					tempstring+="0";
					continue;
				}
				else if(i==353 && watercity){
					tempstring+="0";
					continue;
				} 
				else if(i==354 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==374 && watercity){
					tempstring+="0"; 
					continue;
				}
				else if(i==375 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==376 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==396 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==397 && watercity){
					tempstring+="0"; 
					continue;
				}
				else if(rawstring[i]='T'){
					tempstring+="0";
					continue;
				}
				for(var a=0; a < ncp.length; a++){
					if(rawstring[i] == ncp[a]) {
						tempstring += fcp[a];
					}
				}
					
			}
				
			return tempstring;
		}		
	}
});

qx.Class.define("bos.Utils", {
	type: "singleton",
	extend: qx.core.Object,
	statics: {
		_popupsCount: 0,
		convertCoordinatesToId: function(x, y) {
			var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
			return id;
		},
		convertIdToCoodrinates: function(id) {
			var o = this.convertIdToCoordinatesObject(id);
			return o.xPos + ":" + o.yPos;
		},
		convertIdToCoordinatesObject: function(id) {
			var o = {
				xPos: (id & 0xFFFF),
				yPos: (id >> 16),				
			}
			o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
			return o;
		},
		extractCoordsFromClickableLook: function(pos) {
			if (pos == null)
				return null;

			if (pos.substring != undefined) {
				var startPos = pos.indexOf("\">");
				var endPos = pos.indexOf("</div>");
				if (startPos < endPos) {
					var coords = pos.substring(startPos + 2, endPos);
					var spacePos = pos.indexOf(" ");
					if (spacePos > 0) {
						coords = coords.substring(spacePos);
					}
					return coords;
				} else {
					return pos;
				}
			}
			return pos;
		}, 
		translateOrderType: function(type) {
			switch(type) {
				case 0:
					return qx.locale.Manager.tr("tnf:unknown");
				case 1:
					return qx.locale.Manager.tr("tnf:scout");
				case 2:
					return qx.locale.Manager.tr("tnf:plunder");
				case 3:
					return qx.locale.Manager.tr("tnf:assult");
				case 4:
					return qx.locale.Manager.tr("tnf:support");
				case 5:
					return qx.locale.Manager.tr("tnf:siege");
				case 8:
					return qx.locale.Manager.tr("tnf:raid");
				case 9:
					return qx.locale.Manager.tr("tnf:settle");
				case 10:
					return qx.locale.Manager.tr("tnf:boss raid");
				case -2:
					return "PvP";
			}
			return "??? " + type;
		}, 
		translateArray: function(arr) {
			var translated = [];
			for (var i = 0; i < arr.length; i++) {
				translated.push(tr(arr[i]));
			}
			return translated;
		},
		createCitiesGroupsSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});

			sb.setToolTipText(tr("filter by: city group"));
				
			return sb;
		},
		populateCitiesGroupsSelectBox: function(sb) {
			if (sb == null) {
				return;
			}
			sb.removeAll();
			if (webfrontend.data.Player.getInstance().citygroups != undefined) {
				var groups = webfrontend.data.Player.getInstance().citygroups;
				for (var i = 0, iCount = groups.length; i < iCount; i++) {
					var item = groups[i];
					sb.add(new qx.ui.form.ListItem(item.n, null, "cg" + item.i));
				}
			}
		},		
		createCitiesTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});

			sb.setToolTipText(tr("filter by: city types"));
				
			return sb;
		}, 
		populateCitiesTypesSelectBox: function(sb, onlyMilitary, onlyBosTypes) {					
			if (sb == null) {
				return;
			}
			
			if (onlyMilitary == undefined) {
				onlyMilitary = false;
			}
			
			if (onlyBosTypes == undefined) {
				onlyBosTypes = false;
			}
			
			sb.removeAll();

			sb.add(new qx.ui.form.ListItem(tr("all"), null, "A"));
			
			if (!onlyBosTypes && webfrontend.data.Player.getInstance().citygroups != undefined) {
				var groups = webfrontend.data.Player.getInstance().citygroups;
				for (var i = 0, iCount = groups.length; i < iCount; i++) {
					var item = groups[i];
					sb.add(new qx.ui.form.ListItem(item.n, null, "cg" + item.i));
				}
			}
			
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("building"), null, "B"));
			}
			sb.add(new qx.ui.form.ListItem(tr("castles"), null, "C"));
			sb.add(new qx.ui.form.ListItem(tr("defensive"), null, "D"));
			
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("warehouses"), null, "W"));
				sb.add(new qx.ui.form.ListItem(tr("moonstones"), null, "M"));
				sb.add(new qx.ui.form.ListItem(tr("gold"), null, "G"));
				var list = bos.Storage.getInstance().getCustomCityTypes();
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					sb.add(new qx.ui.form.ListItem(item.description, null, item.letter));
				}
			}
		},
		isCityInCityGroup: function(cityId, groupId) {
			if (webfrontend.data.Player.getInstance().citygroups == undefined) {
				return false;
			}
			var groups = webfrontend.data.Player.getInstance().citygroups;
			for (var i = 0, iCount = groups.length; i < iCount; i++) {
				var item = groups[i];
				if (item.i == groupId) {
					for (var j = 0, jCount = item.c.length; j < jCount; j++) {
						if (item.c[j] == cityId) {
							return true;
						}						
					}
					break;
				}
			}
			
			return false;
		},
		shouldCityBeIncluded: function(city, selectedCityType, selectedContinent) {

			if (selectedCityType != null && selectedCityType != "A") {
				if (selectedCityType.indexOf("cg") == 0) {
					var groupId = parseInt(selectedCityType.substring(2));
					var cityId = bos.Utils.convertCoordinatesToId(city.xPos, city.yPos);
					if (bos.Utils.isCityInCityGroup(cityId, groupId) == false) {
						return false;
					}
				} else {
					var type = bos.CityTypes.getInstance().parseReference(city.reference);
					switch (selectedCityType) {
						case 'C':
							if (!type.isCastle) return false;
							break;
						case 'B':
							if (!type.isBuildInProgress) return false;
							break;
						case 'W':
							if (!type.isWarehouse) return false;
							break;
						case 'M':
							if (!type.hasMoonglowTower) return false;
							break;
						case 'G':
							if (!type.isGold) return false;
							break;
						case 'D':
							if (!type.isDefensive) return false;
							break;
						default:
							if (type.customTypes.indexOf(selectedCityType) < 0) return false;
							break;
					}
				}				
			}
			
			if (selectedContinent != null && selectedContinent != "A") {
				var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
				if (parseInt(selectedContinent) != cont) {
					return false;
				}
			}

			return true;
		},
		createCitiesContinentsSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			var cities = webfrontend.data.Player.getInstance().cities;

			sb.setToolTipText("Filter by: <b>continents</b>");

			var continents = [];
			for (var cityId in cities) {
				var city = cities[cityId];

				var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
				continents["c" + cont] = true;
			}

			var list = [];
			for (var key in continents) {
				if (key.substring != undefined && qx.lang.Type.isString(key)) {
					var cont = parseInt(key.substring(1), 10);
					if (!isNaN(cont)) {
						list.push(cont);
					}
				}
			}
			list.sort();

			sb.add(new qx.ui.form.ListItem(tr("all"), null, "A"));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}

			return sb;
		},		
		makeClickable: function(msg, color) {
			return qx.lang.String.format("<div style=\"cursor:pointer;color:%1\">%2</div>", [color, msg]);			
		},
		makeColorful: function(msg, color) {
			return qx.lang.String.format("<font color=\"%1\">%2</font>", [color, msg]);			
		},
		handleError: function(message) {
			//TODO make it nicer than alert box (webfrontend.gui.ConfirmationWidget)
			bos.Utils._alert(message);
		},
		handleWarning: function(message) {
			bos.Utils._alert(message);
		},
		handleInfo: function(message) {
			alert(message);
		},
		_alert: function(message) {
			if (bos.Utils._popupsCount < bos.Const.MAX_POPUPS) {
				alert(message);
				bos.Utils._popupsCount++;
			}
		},
		displayLongText: function(body) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			//dialog.setZIndex(100000);
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea(body).set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable();}, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});	
			dialog.show();
		},
		inputLongText: function(callback) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			//dialog.setZIndex(100000);
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea("").set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable(); callback(shrStr.getValue()) }, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
		},
		getDistance: function(x1, y1, x2, y2) {
			var diffX = Math.abs(x1 - x2);
			var diffY = Math.abs(y1 - y2);
			return Math.sqrt(diffX * diffX + diffY * diffY);
		},
		getDistanceUsingIds: function(id1, id2) {
			var c1 = this.convertIdToCoodrinates(id1);
			var c2 = this.convertIdToCoodrinates(id2);
			return this.getDistance(c1.xPos, c1.yPos, c2.xPos, c2.yPos);
		},		
		summaryWidget: function() { 
			return summaryWidget; 
		},
		showAllianceInfo: function(o) {
			var a = qx.core.Init.getApplication();
			if (typeof webfrontend.gui.Alliance != 'undefined') {
				a.showAllianceInfo(webfrontend.gui.Alliance.Info.MainWindow.tabs.info, o);
			} else {
				a.showAllianceInfo(webfrontend.gui.AllianceInfoWindow.tabs.info, o);
			}
		}
	}
});

qx.Class.define("bos.CityTypes", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		//nothing to do
	}, 
	members: {
		parseReference: function(ref) {
			var result = {
				isCastle: false,
				isBuildInProgress: false,
				isWarehouse: false,
				hasMoonglowTower: false,
				isGold: false,
				isDefensive: false,
				customTypes: new qx.data.Array([])
			};

			if (ref == null) {
				return result;
			}

			var insideOptions = false;
			for (var i = 0; i < ref.length; i++) {
				var c = ref.charAt(i);
				if (c == '*') {
					insideOptions = !insideOptions;
				} else if (insideOptions) {
					switch (c) {
						case 'C':
							result.isCastle = true;
							break;
						case 'B':
							result.isBuildInProgress = true;
							break;
						case 'W':
							result.isWarehouse = true;
							break;
						case 'M':
							result.hasMoonglowTower = true;
							break;
						case 'G':
							result.isGold = true;
							break;
						case 'D':
							result.isDefensive = true;
							break;
						default:
							result.customTypes.push(c);
							break;
					}
				}
			}

			return result;

		}, 
		getCastles: function() {
			return this._getCitiesByType("isCastle");
		}, 
		getCitiesWithMoonglowTower: function() {
			return this._getCitiesByType("hasMoonglowTower");
		}, 
		getCitiesBuildInProgress: function() {
			return this._getCitiesByType("isBuildInProgress");
		}, _getCitiesByType: function(typeName) {
			var list = [];

			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];

				var types = this.parseReference(city.reference);
				if (types[typeName]) {
					list.push(cityId);
				}
			}

			return list;
		}, 
		isReservedLetter: function(letter) {
			switch (letter) {
				case 'A':
				case 'C':
				case 'B':
				case 'W':
				case 'M':
				case 'G':
				case 'D':
					return true;
			}
			return false;
		}
	}
});

/** most of code of this class is taken from game source code */
qx.Class.define("bos.City", {
	extend: qx.core.Object,
	construct: function() {
		qx.Bootstrap.setDisplayName(this, "bos.City");
		this.resources = new Object();
		this.setId(-1);
		//this.setRequestId(-1);
	}, destruct: function() {
		//alert("Destroying " + this.getId());
	
		delete this.resources;
		delete this.buildQueue;
		delete this.units;
		delete this.traders;

		delete this.unitOrders;
		delete this.tradeOrders;
		
		delete this.unitQueue;
		delete this.recruitingSpeed;
		delete this.incomingUnitOrders;
		delete this.supportOrders, 
		delete this.tradeIncoming; 

	}, 
	statics: {
		SERIALIZABLE_MEMBERS: ["resources", "units", "buildQueue", "unitQueue", "recruitingSpeed", "unitOrders", "incomingUnitOrders", "supportOrders", "traders" /*XXX trades are useless to save, "tradeOrders", "tradeIncoming"*/],
		createFromSimpleObject: function(o) {
			var c = new bos.City();
			var props = qx.Class.getProperties(c.constructor);

			o["lastUpdated"] = new Date(o["lastUpdated"]);

			for (var prop in props) {
				var name = props[prop];
				try {
					if (o[name] != undefined) {
						c.set(name, o[name]);
					}
				} catch (e) {
					debug(name + " " + e);
				}
			}

			var members = bos.City.SERIALIZABLE_MEMBERS;
			for (var key in members) {
				var m = members[key];
				c[m] = o[m];
			}

			return c;
		}
	}, properties: {
		id: {
			init: -1
		},
		lastUpdated: {
			init: null
		},
		requestId: {
			init: -1
		}, 
		version: {
			init: -1
		},
		//id: {
		//        event: bK
		// }, version: {
		//        init: -1,
		//        event: ba
		onWater: {
				init: false
		}, unitCount: {
				init: 0
		}, unitLimit: {
				init: 0
		}, unitsInQueue: {
				init: 0
		}, buildingCount: {
				init: 0
		}, buildingLimit: {
				init: 0
		}, buildingsInQueue: {
				init: 0
		}, strongHold: {
				init: false
		}, sieged: {
				init: false
		}, canRecruit: {
				init: false
		}, canCommand: {
				init: false
		}, orderLimit: {
				init: 0
		}, barracksLevel: {
				init: 0
		}, townhallLevel: {
				init: 0
		}, marketplaceLevel: {
				init: 0
		}, harborLevel: {
				init: 0
		}, wallLevel: {
				init: 0
		}, hideoutSize: {
				init: 0
		}, foodConsumption: {
				init: 0
		}, foodConsumptionSupporter: {
				init: 0
		}, foodConsumptionQueue: {
				init: 0
		}, buildTimeAbsMod: {
				init: 0
		}, buildTimePercentMod: {
				init: 0
		}, plunderProtection: {
				init: 0
		}, goldProduction: {
				init: 0
		}, name: {
				init: ""
		}, reference: {
				reference: ""
		}, text: {
				init: ""
		}, buildingQueueStart: {
			init: 0
		}, buildingQueueEnd: {
			init: 0		
		}
	}, members: {
		resources: null,
		units: null,
		buildQueue: null,
		unitQueue: null,
		recruitingSpeed: null,
		unitOrders: null,
		incomingUnitOrders: null,
		tradeOrders: null,
		tradeIncoming: null,
			//----------------
		toSimpleObject : function() {
				var o = new Object();

				var props = qx.Class.getProperties(this.constructor);
				for (var prop in props) {
					var name = props[prop];
					try {
						if (qx.lang.Type.isString(name) && name.indexOf("function ") != 0) {
							o[name] = this.get(name);
						}
					} catch (e) {
						debug(name + " " + e);
					}
				}

				//qx does strange things for date object when serializing to JSON, below is workaround
				o["lastUpdated"] = this.getLastUpdated().getTime();

				var members = bos.City.SERIALIZABLE_MEMBERS;
				for (var key in members) {
					var m = members[key];
					o[m] = this[m];
				}

				return o;
			},
			//----------------
			populate: function(other) {

					this.setLastUpdated(new Date());

					this.resources = new Object();
					this.setId(-1);
					//this.setRequestId(-1);

					var props = qx.Class.getProperties(this.constructor);
					for (var prop = 0; prop < props.length; prop++) {
					//for (var prop in props) {
						var name = props[prop];
						try {
							if (qx.lang.Type.isString(name)) {
									this.set(name, other.get(name));
							}
						} catch (e) {
							//debug(name + " " + e);
						}
					}

					this.setId(parseInt(this.getId()));

					for (var res = 1; res <= 4; res++) {

						this.resources[res] = {
							step: 0,
							base: 0,
							delta: 0,
							max: 0
						};

						if (other.resources.hasOwnProperty(res)) {
							var thisRes = this.resources[res];
							var otherRes = other.resources[res];
							thisRes.step = otherRes.step;
							thisRes.base = otherRes.base;
							thisRes.delta = otherRes.delta;
							thisRes.max = otherRes.max;
						}
					}

					this.buildQueue = new Array();

					if (other.hasBuildQueue()) {
						for (var i = 0; i < other.buildQueue.length; i++) {
							var item = other.buildQueue[i];
							this.buildQueue[i] = {
								id: item.id,
								building: item.building,
								state: item.state,
								start: item.start,
								end: item.end,
								type: item.type,
								level: item.level,
								x: item.x,
								y: item.y,
								isPaid: item.isPaid
							};
						}
					}

					this.units = new Object();
					if (other.getUnits() != null) {
						for (var key in other.getUnits()) {
							var item = (other.getUnits())[key];
							this.units[key] = {
								count: item.count,
								total: item.total,
								speed: item.speed
							};
						}
					}

					this.unitQueue = new Array();
					if (other.hasUnitQueue()) {
						for (var i = 0; i < other.unitQueue.length; i++) {
							var item = other.unitQueue[i];
							this.unitQueue[i] = {
								id: item.id,
								type: item.type,
								count: item.count,
								batch: item.batch,
								left: item.left,
								start: item.start,
								end: item.end,
								isPaid: item.isPaid
							};
						}
					}

					this.traders = new Object();
					if (other.traders != null) {
						for (var key in other.traders) {
							var item = other.traders[key];
							this.traders[key] = {
								count: item.count,
								total: item.total,
								order: item.order
							};
						}
					}


					this.unitOrders = new Array();
					if (other.unitOrders != null) {
						for (var i = 0; i < other.unitOrders.length; i++) {
							var item = other.unitOrders[i];
							this.unitOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: item.units,
								isDelayed: item.isDelayed,
								recurringType: item.recurringType,
								recurringEndStep: item.recurringEndStep,
								quickSupport: item.quickSupport
							};
						}
					}

					this.supportOrders = new Array();
					if (other.supportOrders != null) {
						for (var i = 0; i < other.supportOrders.length; i++) {
							var item = other.supportOrders[i];

							this.supportOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: new Array(),
								quickSupport: item.quickSupport
							};

							for (var u = 0; u < item.units.length; u++) {
								this.supportOrders[i].units[u] = {
									type: item.units[u].type,
									count: item.units[u].count
								};
							}
						}
					}

					this.tradeOrders = new Array();
					if (other.tradeOrders != null) {
						for (var i = 0; i < other.tradeOrders.length; i++) {
							var item = other.tradeOrders[i];
						
							this.tradeOrders[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeOrders[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}
					
					this.tradeIncoming = new Array();
					if (other.tradeIncoming != null) {
						for (var i = 0; i < other.tradeIncoming.length; i++) {
							var item = other.tradeIncoming[i];
						
							this.tradeIncoming[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeIncoming[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}		
			},
			//----------------
			
			dispatchResults: function(K) {
			
			  this.setLastUpdated(new Date());
			
			  var bh = "changeVersion",
				bg = "",
				bf = "CITY",
				be = "s",
				bd = "m",
				bc = "psr",
				bb = "at",
				ba = "bl",
				Y = "hrl",
				X = "rs",
				ch = "to",
				cg = "v",
				cf = "iuo",
				ce = "t",
				cd = "nr",
				cc = "changeCity",
				cb = "r",
				ca = "singleton",
				bY = "f",
				bX = "sh",
				bo = "q",
				bp = "btam",
				bm = "d",
				bn = "tl",
				bk = "ts",
				bl = "webfrontend.data.City",
				bi = "bc",
				bj = "pl",
				bu = "b",
				bv = "pp",
				bD = "mtl",
				bB = "ae",
				bL = "su",
				bG = "n",
				bT = "mpl",
				bQ = "wl",
				bx = "btpm",
				bW = "uq",
				bV = "_applyId",
				bU = "ol",
				bw = "st",
				bz = "cpr",
				bA = "i",
				bC = "fc",
				bE = "cr",
				bH = "w",
				bN = "pd",
				bS = "bbl",
				bq = "tf",
				br = "u",
				by = "ul",
				bK = "pwr",
				bJ = "g",
				bI = "uo",
				bP = "et",
				bO = "uc",
				bF = "fcs",
				bM = "ns",
				W = "hs",
				bR = "fcq",
				bs = "ad",
				bt = "ti";			
			
				var O = webfrontend.res.Main.getInstance();
				var P = webfrontend.data.Server.getInstance();
				if (K.hasOwnProperty(bz)) {
				  //this.setCanPurifyResources(K.cpr);
				}
				if (K.hasOwnProperty(bA)) {
				  //if (this.getRequestId() != K.i) return;
				}
				if (K.hasOwnProperty(bG)) this.setName(K.n);
				if (K.hasOwnProperty(cb) && K.r != null) {
				  for (var i = 0; i < K.r.length; i++) {
					var M = K.r[i].i;
					if (!this.resources.hasOwnProperty(M)) this.resources[M] = {
					  step: 0,
					  base: 0,
					  delta: 0,
					  max: 0
					};
					if (K.r[i].hasOwnProperty(be)) this.resources[M].step = K.r[i].s;
					if (K.r[i].hasOwnProperty(bu)) this.resources[M].base = K.r[i].b;
					if (K.r[i].hasOwnProperty(bm)) this.resources[M].delta = K.r[i].d;
					if (K.r[i].hasOwnProperty(bd)) this.resources[M].max = K.r[i].m;
				  }
				}
				//if (K.hasOwnProperty(bK)) this.palaceWoodResources = K.pwr;
				//if (K.hasOwnProperty(bc)) this.palaceStoneResources = K.psr;
				if (K.hasOwnProperty(W)) this.setHideoutSize(K.hs);
				if (K.hasOwnProperty(bC)) this.setFoodConsumption(K.fc);
				if (K.hasOwnProperty(bF)) this.setFoodConsumptionSupporter(K.fcs);
				if (K.hasOwnProperty(bR)) this.setFoodConsumptionQueue(K.fcq);
				if (K.hasOwnProperty(bH)) this.setOnWater(K.w != 0);
				if (K.hasOwnProperty(bJ)) this.setGoldProduction(K.g);
				//if (K.hasOwnProperty(bk)) this.setTypeSlots(K.ts);
				var R = 0;
				if (K.hasOwnProperty(bo)) {
				  if (K.q != null && K.q.length > 0) {
					if (this.buildQueue == null) this.buildQueue = new Array();
					else qx.lang.Array.removeAll(this.buildQueue);
					for (var i = 0; i < K.q.length; i++) {
					   var item = K.q[i];
					   this.buildQueue[i] = {
						id: item.i,
						building: item.b,
						state: item.s,
						type: item.t,
						l: item.l,
						x: item.x,
						y: item.y,
						isPaid: item.p,
						warnings: item.w,
						time: -1
					  };

					  if (K.q[i].l == 1 && K.q[i].s == 1) R++;
					}
				  } else {
					if (this.buildQueue != null) delete this.buildQueue;
				  }
				  this.setBuildingsInQueue(R);
				}
				R = 0;
				if (K.hasOwnProperty(bW)) {
				  if (K.uq != null && K.uq.length > 0) {
					if (this.unitQueue == null) this.unitQueue = new Array();
					else qx.lang.Array.removeAll(this.unitQueue);
					for (var i = 0; i < K.uq.length; i++) {
					  this.unitQueue[i] = {
						id: K.uq[i].i,
						type: K.uq[i].t,
						count: K.uq[i].o,
						batch: K.uq[i].c,
						left: K.uq[i].l,
						start: K.uq[i].ss,
						end: K.uq[i].es,
						isPaid: K.uq[i].p
					  };
					  R += K.uq[i].l * O.units[K.uq[i].t].uc;
					}
				  } else {
					if (this.unitQueue != null) delete this.unitQueue;
				  }
				  this.setUnitsInQueue(R);
				}
				if (K.hasOwnProperty(br)) {
				  if (K.u != null && K.u.length > 0) {
					if (this.units == null) this.units = new Object();
					else qx.lang.Object.empty(this.units);
					for (var i = 0; i < K.u.length; i++) this.units[K.u[i].t] = {
					  count: K.u[i].c,
					  total: K.u[i].tc,
					  speed: K.u[i].s
					};
				  } else {
					if (this.units != null) delete this.units;
				  }
				}
				if (K.hasOwnProperty(cf)) {
				  if (K.iuo != null && K.iuo.length > 0) {
					if (this.incomingUnitOrders == null) this.incomingUnitOrders = new Array();
					else qx.lang.Array.removeAll(this.incomingUnitOrders);
					for (var i = 0; i < K.iuo.length; i++) {
					  this.incomingUnitOrders[i] = {
						id: K.iuo[i].i,
						type: K.iuo[i].t,
						state: K.iuo[i].s,
						end: K.iuo[i].es,
						city: K.iuo[i].c,
						cityName: K.iuo[i].cn,
						player: K.iuo[i].p,
						playerName: K.iuo[i].pn,
						alliance: K.iuo[i].a,
						allianceName: K.iuo[i].an
					  };
					}
				  } else {
					if (this.incomingUnitOrders != null) delete this.incomingUnitOrders;
				  }
				}
				if (K.hasOwnProperty(ce)) {
				  if (K.t != null && K.t.length > 0) {
					if (this.traders == null) this.traders = new Object();
					else qx.lang.Object.empty(this.traders);
					for (var i = 0; i < K.t.length; i++) this.traders[K.t[i].t] = {
					  count: K.t[i].c,
					  total: K.t[i].tc,
					  order: 0
					};
				  } else {
					if (this.traders != null) delete this.traders;
				  }
				}
				if (K.hasOwnProperty(bI)) {
				  if (K.uo != null && K.uo.length > 0) {
					if (this.unitOrders == null) this.unitOrders = new Array();
					else qx.lang.Array.removeAll(this.unitOrders);
					for (var i = 0; i < K.uo.length; i++) {
					  var U = null;
					  if (K.uo[i].u != null && K.uo[i].u.length > 0) {
						U = new Array();
						for (var j = 0; j < K.uo[i].u.length; j++) U.push({
						  type: K.uo[i].u[j].t,
						  count: K.uo[i].u[j].c
						});
					  }
					  this.unitOrders[i] = {
						id: K.uo[i].i,
						type: K.uo[i].t,
						state: K.uo[i].s,
						start: K.uo[i].ss,
						end: K.uo[i].es,
						city: K.uo[i].c,
						cityName: K.uo[i].cn,
						player: K.uo[i].p,
						playerName: K.uo[i].pn,
						alliance: K.uo[i].a,
						allianceName: K.uo[i].an,
						units: U,
						isDelayed: K.uo[i].d,
						recurringType: K.uo[i].rt,
						recurringEndStep: K.uo[i].rs,
						quickSupport: K.uo[i].q
					  };
					}
				  } else {
					if (this.unitOrders != null) delete this.unitOrders;
				  }
				}
				if (K.hasOwnProperty(bL)) {
				  if (K.su != null && K.su.length > 0) {
					if (this.supportOrders == null) this.supportOrders = new Array();
					else qx.lang.Array.removeAll(this.supportOrders);
					for (var i = 0; i < K.su.length; i++) {
					  var U = null;
					  if (K.su[i].u != null && K.su[i].u.length > 0) {
						U = new Array();
						for (var j = 0; j < K.su[i].u.length; j++) U.push({
						  type: K.su[i].u[j].t,
						  count: K.su[i].u[j].c
						});
					  }
					  this.supportOrders[i] = {
						id: K.su[i].i,
						type: K.su[i].t,
						state: K.su[i].s,
						end: K.su[i].es,
						city: K.su[i].c,
						cityName: K.su[i].cn,
						player: K.su[i].p,
						playerName: K.su[i].pn,
						alliance: K.su[i].a,
						allianceName: K.su[i].an,
						units: U,
						quickSupport: K.su[i].q
					  };
					}
				  } else {
					if (this.supportOrders != null) delete this.supportOrders;
				  }
				}
				if (K.hasOwnProperty(ch)) {
				  if (K.to != null && K.to.length > 0) {
					if (this.tradeOrders == null) this.tradeOrders = new Array();
					else qx.lang.Array.removeAll(this.tradeOrders);
					for (var i = 0; i < K.to.length; i++) {
					  var U = null;
					  var T = 0;
					  if (K.to[i].r != null && K.to[i].r.length > 0) {
						var O = new Array();
						for (var j = 0; j < K.to[i].r.length; j++) {
						  O.push({
							type: K.to[i].r[j].t,
							count: K.to[i].r[j].c
						  });
						  T += K.to[i].r[j].c;
						}
						this.traders[K.to[i].tt].order += Math.ceil(T / P.getTradeCapacity(K.to[i].tt));
					  }
					  this.tradeOrders[i] = {
						id: K.to[i].i,
						type: K.to[i].t,
						transport: K.to[i].tt,
						state: K.to[i].s,
						start: K.to[i].ss,
						end: K.to[i].es,
						city: K.to[i].c,
						cityName: K.to[i].cn,
						player: K.to[i].p,
						playerName: K.to[i].pn,
						alliance: K.to[i].a,
						allianceName: K.to[i].an,
						resources: O
					  };
					}
				  } else {
					if (this.tradeOrders != null) delete this.tradeOrders;
				  }
				}
				if (K.hasOwnProperty(bq)) {
				  if (K.tf != null && K.tf.length > 0) {
					if (this.tradeOffers == null) this.tradeOffers = new Array();
					else qx.lang.Array.removeAll(this.tradeOffers);
					for (var i = 0; i < K.tf.length; i++) {
					  this.tradeOffers[i] = {
						id: K.tf[i].i,
						transport: K.tf[i].t,
						deliverTime: K.tf[i].d,
						price: K.tf[i].p,
						resourceType: K.tf[i].r,
						amountTradeUnit: K.tf[i].a
					  };
					}
				  } else {
					if (this.tradeOffers != null) delete this.tradeOffers;
				  }
				}
				if (K.hasOwnProperty(bt)) {
				  if (K.ti != null && K.ti.length > 0) {
					if (this.tradeIncoming == null) this.tradeIncoming = new Array();
					else qx.lang.Array.removeAll(this.tradeIncoming);
					for (var i = 0; i < K.ti.length; i++) {
					  if (K.ti[i].r != null && K.ti[i].r.length > 0) {
						var O = new Array();
						for (var j = 0; j < K.ti[i].r.length; j++) O.push({
						  type: K.ti[i].r[j].t,
						  count: K.ti[i].r[j].c
						});
					  }
					  this.tradeIncoming[i] = {
						id: K.ti[i].i,
						type: K.ti[i].t,
						transport: K.ti[i].tt,
						state: K.ti[i].s,
						start: K.ti[i].ss,
						end: K.ti[i].es,
						city: K.ti[i].c,
						cityName: K.ti[i].cn,
						player: K.ti[i].p,
						playerName: K.ti[i].pn,
						alliance: K.ti[i].a,
						allianceName: K.ti[i].an,
						resources: O
					  };
					}
				  } else {
					if (this.tradeIncoming != null) delete this.tradeIncoming;
				  }
				}
				if (K.hasOwnProperty(X)) {
				  if (K.rs != null && K.rs.length > 0) {
					if (this.recruitingSpeed == null) this.recruitingSpeed = new Object();
					else qx.lang.Object.empty(this.recruitingSpeed);
					for (var i = 0; i < K.rs.length; i++) this.recruitingSpeed[K.rs[i].t] = {
					  abs: K.rs[i].a,
					  percent: K.rs[i].p
					};
				  } else {
					if (this.recruitingSpeed != null) delete this.recruitingSpeed;
				  }
				}
				if (K.hasOwnProperty(by)) this.setUnitLimit(K.ul);
				if (K.hasOwnProperty(bO)) this.setUnitCount(K.uc);
				if (K.hasOwnProperty(ba)) this.setBuildingLimit(K.bl);
				if (K.hasOwnProperty(bU)) this.setOrderLimit(K.ol);
				if (K.hasOwnProperty(bi)) this.setBuildingCount(K.bc);
				if (K.hasOwnProperty(bX)) this.setStrongHold(K.sh);
				if (K.hasOwnProperty(be)) this.setSieged(K.s);
				if (K.hasOwnProperty(bE)) this.setCanRecruit(K.cr);
				if (K.hasOwnProperty(bn)) this.setTownhallLevel(K.tl);
				if (K.hasOwnProperty(bS)) this.setBarracksLevel(K.bbl);
				if (K.hasOwnProperty(bT)) this.setMarketplaceLevel(K.mpl);
				if (K.hasOwnProperty(Y)) this.setHarborLevel(K.hrl);
				//if (K.hasOwnProperty(bD)) this.setMageTowerLevel(K.mtl);
				if (K.hasOwnProperty(bp)) this.setBuildTimeAbsMod(K.btam);
				if (K.hasOwnProperty(bx)) this.setBuildTimePercentMod(K.btpm);
				if (K.hasOwnProperty(bQ)) this.setWallLevel(K.wl);
				if (K.hasOwnProperty(bv)) this.setPlunderProtection(K.pp);
				if (K.hasOwnProperty(cd)) {
				/*
				  if (this.getReference() != K.nr && this.getRequestId() == K.i) {
					var Q = webfrontend.data.Player.getInstance();
					var S = this.getRequestId();
					if (Q.cities.hasOwnProperty(S)) {
					  Q.cities[S].reference = K.nr;
					  Q.fireDataEvent(bh, Q.getVersion());
					}
				  }
				  */
				  this.setReference(K.nr);
				}
				if (K.hasOwnProperty(bM)) this.setText(K.ns);
				//if (K.hasOwnProperty(bs)) this.setAutoBuildOptionDefense(K.ad);
				//if (K.hasOwnProperty(bB)) this.setAutoBuildOptionEconomy(K.ae);
				//if (K.hasOwnProperty(bb)) this.setAutoBuildTypeFlags(K.at);
				//if (K.hasOwnProperty(bN)) this.setPalaceDamage(K.pd);
				//if (K.hasOwnProperty(bP)) this.setEnlightenmentTime(K.et);
				//if (K.hasOwnProperty(bw)) this.setShrineType(K.st);
				this.setCanCommand(this.getCanRecruit() && this.getBarracksLevel() > 0 || this.getUnitCount() > 0);
				//if (K.hasOwnProperty(bY)) this.setFaith(K.f);
				//if (K.hasOwnProperty(bj)) this.setPalaceLevel(K.pl);
				if (K.hasOwnProperty("bqs")) this.setBuildingQueueStart(K.bqs);
				if (K.hasOwnProperty("bqe")) this.setBuildingQueueEnd(K.bqe);
				this.calculateBuildingQueueTimes();
				var N = false;
				if (this.getId() != this.getRequestId()) {
				  this.setId(this.getRequestId());
				  N = true;
				}
				if (K.hasOwnProperty(cg)) {
				  if (this.getVersion() != K.v) {
					this.setVersion(K.v);
					N = false;
				  }
				} else N = true;
				
				/*
				if (N) {
				  var v = this.getVersion();
				  var V = qx.event.Registration;
				  if (V.hasListener(this, bh)) V.fireEvent(this, bh, qx.event.type.Data, [v, v]);
				}
				*/
				var L = webfrontend.data.TradeMinister.getInstance();
			
			},
			
			calculateBuildingQueueTimes: function() {
				if (this.buildQueue == null) return false;
				var cF = false;
				var cA = webfrontend.res.Main.getInstance();
				var cE = new Object();
				var cy = this.getBuildingQueueStart();
				var cB = this.getBuildingQueueEnd();
				for (var i = 0; i < this.buildQueue.length; i++) {
				  if (this.buildQueue[i].BuildingX == -1 || this.buildQueue[i].BuildingY == -1) {
					if (i > 0) this.buildQueue[i].start = this.buildQueue[i - 1].end;
					this.buildQueue[i].end = this.buildQueue[i].start;
					continue;
				  }
				  var cz;
				  var cC = this.buildQueue[i].building;
				  if (cE.hasOwnProperty(cC)) cz = cE[cC];
				  else cz = this.buildQueue[i].l;
				  switch (this.buildQueue[i].state) {
				  case 1:
					cz++;
					cE[cC] = cz;
					this.buildQueue[i].level = cz;
					break;
				  case 2:
					cE[cC] = cz - 1;
					this.buildQueue[i].level = cz - 1;
					break;
				  case 5:
					cE[cC] = 0;
					this.buildQueue[i].level = 0;
					break;
				  }
				  if ((i == 0) && (cy != 0) && (cB != 0)) {
					if (this.buildQueue[i].state == 5) {
					  this.buildQueue[i].start = cy;
					  this.buildQueue[i].end = this.buildQueue[i].start + this.urthBuildingGetDemolishTime(this.buildQueue[i].type, cz);
					} else {
					  this.buildQueue[i].start = cy;
					  this.buildQueue[i].end = cB;
					}
				  } else {
					var cD = 0;
					if (this.buildQueue[i].state == 5) cD = this.urthBuildingGetDemolishTime(this.buildQueue[i].type, cz);
					else cD = this.urthBuildingGetBuildTime(this.buildQueue[i].type, cz, this.buildQueue[i].state);
					if (i > 0) {
					  if (this.buildQueue[i - 1].start == 0) this.buildQueue[i].start = 0;
					  else this.buildQueue[i].start = this.buildQueue[i - 1].end;
					} else this.buildQueue[i].start = 0;
					this.buildQueue[i].end = this.buildQueue[i].start + cD;
				  }
				  if ((this.buildQueue[i].end - this.buildQueue[i].start) != this.buildQueue[i].time) {
					cF = true;
					this.buildQueue[i].time = (this.buildQueue[i].end - this.buildQueue[i].start);
				  }
				}
				return cF;
			},
			//----------------
			getIncomingUnitOrders: function() {
				return this.incomingUnitOrders;
			}, getUnitTypeInfo: function(g) {
				if (this.units != null && this.units.hasOwnProperty(g)) return this.units[g];
				return {
					count: 0,
					total: 0,
					speed: -1
				};
			}, getBuildQueue: function() {
					return this.buildQueue;
			}, hasBuildQueue: function() {
					return this.buildQueue != null;
			}, getUnitQueue: function() {
					return this.unitQueue;
			}, hasUnitQueue: function() {
					return this.unitQueue != null;
			}, getAvailableUnitQueueSpace: function() {
					var e = webfrontend.data.Player.getInstance().getMaxUnitQueueSize();
					if (this.unitQueue != null) {
							e -= this.unitQueue.length;
					}
					return e;
			}, getUnitOrders: function() {
					return this.unitOrders;
			}, getSupportOrders: function() {
					return this.supportOrders;
			}, getRecruitingSpeed: function() {
					return this.recruitingSpeed;
			}, getIncomingUnitOrders: function() {
					return this.incomingUnitOrders;
			}, getUnits: function() {
					return this.units;
			}, getTraders: function() {
					return this.traders;
			}, getTradeOrders: function() {
					return this.tradeOrders;
			}, getTradeOffers: function() {
					return this.tradeOffers;
			}, getTradeIncoming: function() {
					return this.tradeIncoming;
			}, getOrder: function(d) {
					if (this.unitOrders != null) {
					for (var i = 0; i < this.unitOrders.length; i++) if (this.unitOrders[i].id == d) return this.unitOrders[i];
					}
					if (this.incomingUnitOrders != null) {
					for (var i = 0; i < this.incomingUnitOrders.length; i++) if (this.incomingUnitOrders[i].id == d) return this.incomingUnitOrders[i];
					}
					if (this.supportOrders != null) {
					for (var i = 0; i < this.supportOrders.length; i++) if (this.supportOrders[i].id == d) return this.supportOrders[i];
					}
					return null;
			}, getResourceCount: function(F) {
					if (!this.resources.hasOwnProperty(F)) return 0;
					var G = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (G == 0) return 0;
					var I = G - this.resources[F].step;
					var H = this.resources[F].delta;
					if (F == 4) {
					H -= this.getFoodConsumption() + this.getFoodConsumptionSupporter();
					}
					var J = I * H + this.resources[F].base;
					J = Math.max(0, Math.min(J, this.resources[F].max));
					return J;
			}, getResourceGrowPerHour: function(a) {
					if (!this.resources.hasOwnProperty(a)) return 0;
					return this.resources[a].delta * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, getResourceMaxStorage: function(f) {
					if (!this.resources.hasOwnProperty(f)) return 0;
					return this.resources[f].max;
			}, getResourceStorageFullTime: function(K) {
					if (!this.resources.hasOwnProperty(K)) return new Date(0);
					var L = this.getResourceGrowPerHour(K);
					if (L <= 0) return new Date(0);
					var M = this.resources[K].step + (this.resources[K].max - this.resources[K].base) / this.resources[K].delta;
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= M) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(M);
			}, getResourceStorageEmptyTime: function(l, m) {
					if (!this.resources.hasOwnProperty(l)) return new Date(0);
					var n = this.resources[l].step + this.resources[l].base / -(this.resources[l].delta - m);
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(n);
			}, getResourceCountTime: function(o, p) {
					if (!this.resources.hasOwnProperty(o)) return new Date(0);
					if (this.resources[o].delta <= 0) return new Date(0);
					var q = this.resources[o].step + (p - this.resources[o].base) / this.resources[o].delta;
					return webfrontend.data.ServerTime.getInstance().getStepTime(q);
			}, countDefenders: function() {
					if (this.units == null || this.units.length == 0) return 0;
					var c = 0;
					for (var b in this.units) c += this.units[b].count;
					return c;
			}, getGoldGrowPerHour: function() {
					return this.getGoldProduction() * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, _applyId: function(O, P) {
					if (O != -1 && P == -1) webfrontend.net.UpdateManager.getInstance().addConsumer(Y, this);
					if (O == -1 && P != -1) {
							webfrontend.net.UpdateManager.getInstance().removeConsumer(Y);
							this.setId(-1);
					}
			}, getSupportMoving: function(r) {
					r = r || false;
					var u = [];
					var t = this.getUnitOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4) {
							if (t[i].state == 1 || t[i].state == 2) {
									u[u.length] = [t[i], 0];
							}
							}
					}
					}
					var t = this.getSupportOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4 && t[i].state == 1) {
							u[u.length] = [t[i], 1];
							}
					}
					}
					return u;
			},
			//MINE
			buildQueueOcuppied: function() {
					if (this.buildQueue == null || this.buildQueue.length == 0) {
							return null;
					}
					return (this.buildQueue[this.buildQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			unitQueueOcuppied: function() {
					if (this.unitQueue == null || this.unitQueue.length == 0) {
							return null;
					}
					return (this.unitQueue[this.unitQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			setResourceCount: function(res, count) {
					if (!this.resources.hasOwnProperty(res)) {
							return;
					}

					var serverStep = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (serverStep == 0) return;

					this.resources[res].step = serverStep;
					this.resources[res].base = count;
			},
			getFoodBalance: function() {
					var steps = webfrontend.data.ServerTime.getInstance().getStepsPerHour();
					var foodGrow = Math.floor(this.getResourceGrowPerHour(bos.Const.FOOD) + 0.5);
					var foodCons = Math.round(this.getFoodConsumption() * steps);
					var foodConsQueue = Math.round(this.getFoodConsumptionQueue() * steps);
					var foodConsSupport = Math.round(this.getFoodConsumptionSupporter() * steps);

					var foodBalance = foodGrow - foodCons - foodConsQueue - foodConsSupport;
					return foodBalance;
			}, 
			getTradeIncomingResources: function(resType) {
				var totalRes = 0;
				if (this.tradeIncoming == null) {
					return totalRes;
				}
				var now = webfrontend.data.ServerTime.getInstance().getServerStep();
				for (var i = 0; i < this.tradeIncoming.length; i++) {
					var order = this.tradeIncoming[i];
					if (order.end >= now) {
						for (var j = 0; j < order.resources.length; j++) {
							var r = order.resources[j];
							if (r.type == resType) {
								totalRes += r.count;
							}
						}
					}
				}
				return totalRes;
			},
			urthBuildingGetBuildTime: function(P, Q, R, S) {
				if (S == null) S = this.urthBuildingGetTotalSpeedBouns();
				var res = webfrontend.res.Main.getInstance();
				var T = 0;
				if (res.buildings.hasOwnProperty(P) && res.buildings[P].r.hasOwnProperty(Q)) {
				  var U = res.buildings[P].r[Q].t;
				  if (res.buildings[P].im == 0) {
					U = (U * 100) / S;
					if (R == 2 || R == 5) U /= 2;
				  }
				  T = Math.floor(Math.max(webfrontend.data.Server.getInstance().getBuildingMinimumBuildTime(), U + 0.5));
				}
				return T;
			}, 
			urthBuildingGetDemolishTime: function(V, W) {
				var X = this.urthBuildingGetTotalSpeedBouns();
				var Y = 0;
				for (var ba = W; ba > 0; ba--) Y += this.urthBuildingGetBuildTime(V, ba, 5, X);
				return Y;
			}, 
			urthBuildingGetTotalSpeedBouns: function() {
				//var city = webfrontend.data.City.getInstance();
				var city = this;
				var tech = webfrontend.data.Tech.getInstance();
				var bf = tech.getBonus("constSpeed", webfrontend.data.Tech.research);
				var be = tech.getBonus("constSpeed", webfrontend.data.Tech.shrine);
				var bc = Math.floor(city.getBuildTimePercentMod());
				return bc + bf + be;
			}			
	}
});

//webfrontend.Application
var a;

var summaryWidget = null;

var reportsTweaked = false;

window.setTimeout(bosCheckIfLoaded, 1000);

function bosCheckIfLoaded() {
	if (/*qx.$$domReady == */true) {
		a = qx.core.Init.getApplication();
		if (a && a.chat && a.cityInfoView && a.title.reportButton) {
			bos.Tweaks.getInstance().gameStarted();
		} else {
			window.setTimeout(bosCheckIfLoaded, 1000);
		}
	} else {
		window.setTimeout(bosCheckIfLoaded, 1000);
	}
}



function getSummaryWidget() {
	if (summaryWidget == null) {
		summaryWidget = new bos.gui.SummaryWidget();
		if (bos.Storage.getInstance().getLoadPersistedCitiesAtStart()) {
			summaryWidget.loadPersistedCities();
		}
		if (bos.Storage.getInstance().getLoadTableSettingsAtStart()) {
			summaryWidget.loadPersistedTableSettings();
		}
	}
	return summaryWidget;
}

qx.Class.define("bos.gui.SummaryPage", {
	extend: qx.ui.tabview.Page,
	construct: function() {
		qx.ui.tabview.Page.call(this);
	}, 
	members: {
		_table: null,
		_tableModel: null,
		_addBlankValuesToRow: function(row, tableModel) {
			//it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				row[tableModel.getColumnId(col)] = "";
			}
		}, 
		updateView: function() {
			if (!this.isSeeable()) {
				//console.log("Some view is hidden, nothing to update");
				return;
			}
		
			if (this._tableModel == null) {
				return;
			}
			var prevSortColumnIndex = this._tableModel.getSortColumnIndex();
			var isSortAscending = this._tableModel.isSortAscending();
			this._tableModel.setDataAsMapArray(this.createRowData(), false);
			if (prevSortColumnIndex >= 0) {
				this._tableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
			}	
		}, 
		_setupSorting: function(tableModel) {
			tableModel.setCaseSensitiveSorting(false);

			var compare = {
				ascending  : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveAscending,
				descending : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveDescending
			};

			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				tableModel.setSortMethods(col, compare);
			}
		}
	}
});

qx.Class.define("bos.ui.table.Table", {
	extend: qx.ui.table.Table,
	construct: function(tableModel, custom) {
		//this.base(arguments);
		qx.ui.table.Table.call(this, tableModel, custom);
		this._setupTableLookAndFeel();
	}, 
	members:  {
		_setupTableLookAndFeel: function() {
			this.setStatusBarVisible(false)
			var focusedRowBGColor = "#555555";
			var rowBGColor = "#373930";
			this.setDataRowRenderer(new webfrontend.ui.RowRendererCustom(this, focusedRowBGColor, focusedRowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor));
			this.setHeaderCellHeight(22);
			var tcm = this.getTableColumnModel();
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {								
				tcm.setDataCellRenderer(col, new bos.ui.table.cellrenderer.Default());
			}										
				
		}, 
		applyTableSettings: function(settings, tableName) {
			if (settings == null) {
				return;
			}
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			if (tcm.getOverallColumnCount() != settings.columns.length) {
				if(locale == "de"){
					bos.Utils.handleError("Die gespeicherten Werte sind für eine Tabelle mit " + settings.columns.length + "Spalten, diese Tabelle hat jedoch " + tcm.getOverallColumnCount() );
				} else {
					bos.Utils.handleError("Saved settings are for table with " + settings.columns.length + " but table has " + tcm.getOverallColumnCount() + " columns. Please save your '" + tableName + "' table layout again");
				}
				return;
			}

			var colOrder = [];
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {
				var c = settings.columns[col];
				tcm.setColumnVisible(col, c.visible);
				tcm.setColumnWidth(col, c.width);

				colOrder.push(c.columnAt);
			}
			tcm.setColumnsOrder(colOrder);

			if (settings.sortColumnIndex >= 0 && settings.sortColumnIndex < tcm.getOverallColumnCount()) {
					tm.sortByColumn(settings.sortColumnIndex, settings.sortAscending);
			}

		}, 
		saveTableSettings: function(tableName) {
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			var settings = {
				sortColumnIndex: tm.getSortColumnIndex(),
				sortAscending: tm.isSortAscending(),
				columns: []
			};
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {

				var c = {
					visible: tcm.isColumnVisible(col),
					width: tcm.getColumnWidth(col),
					columnAt: tcm.getOverallColumnAtX(col)
				};
				settings.columns.push(c);
			}

			bos.Storage.getInstance().setTableSettings(settings, tableName);

		},
		createCsvString: function() {
			var tableModel = this.getTableModel();
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\t";
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				if (col > 0) {
					sb.add(sep);
				}
				sb.add(tableModel.getColumnName(col));
			}
			sb.add("\n");
			
			var labels = new qx.data.Array(["position", "targetPosition", "attackerPosition"]);

			for (var row = 0; row < tableModel.getRowCount(); row++) {
				var rowData = tableModel.getRowData(row);
				for (var col = 0; col < tableModel.getColumnCount(); col++) {
					if (col > 0) {
						sb.add(sep);
					}
					var s = bos.Utils.extractCoordsFromClickableLook(rowData[col]);
					if (labels.indexOf(tableModel.getColumnId(col)) >= 0) {
						s = "'" + s;
					}
					sb.add('"', s, '"');
				}
				sb.add("\n");
			}
			return sb.get();
		},
		exportToCsv: function() {
			var csv = this.createCsvString();
			bos.Utils.displayLongText(csv);
		}	
	}
});

qx.Class.define("bos.gui.TradeOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("carts"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnIds = ["id", "cityId", "from", "type", "transport", "state", "start", "end", "position", "target",   
					"lastUpdated", "resources"];		
					
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		columnModel.setColumnWidth(5, 70);		
		
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(9, 125);
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 80);
		columnModel.setDataCellRenderer(10, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(11, 180);
		
		this.add(this.table, {flex: 1});
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var sel;
			
			var filterTypeId = -1;
			sel = this.sbTradeTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}	

			var filterTransportTypeId = -1;
			sel = this.sbTransportTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTransportTypeId = sel[0].getModel();
			}

			var filterTargetTypeId = -1;
			sel = this.sbTargetTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTargetTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}						
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var now = serverTime.getServerStep();
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.tradeOrders == null) {
					continue;
				}
				
				for (var i = 0; i < city.tradeOrders.length; i++) {
					var item = city.tradeOrders[i];

					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					if (filterTransportTypeId != -1 && filterTransportTypeId != item.transport) {
						continue;
					}
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					if (filterTargetTypeId != -1) {
						if (filterTargetTypeId == 1 && item.player != playerId) {
							continue;
						} else if (filterTargetTypeId == 2 && item.player == playerId) {
							continue;
						}
					}
					
					var timeSpan = item.end - item.start;
					if (item.end + timeSpan < now) {
						continue;
					}					
				
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);

					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = this.translateType(item.type);
					row["state"] = this.translateState(item.state);
					row["transport"] = this.translateTransport(item.transport);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["resources"] = "";
					
					if (item.resources != null) {					
						for (var u = 0; u < item.resources.length; u++) {
							var trade = item.resources[u];
							if (u > 0) {
								row["resources"] += ", ";
							}
							var resource = res.resources[trade.type];
							row["resources"] += trade.count + " " + resource.dn;
						}
					}


					row["lastUpdated"] = city.getLastUpdated();
					
					rowData.push(row);
				}

			}
			
			return rowData;
		}, 
		translateState: function(state) {
			switch (state) {
				case bos.Const.TRADE_STATE_TRANSPORT:
					return "transport";
				case bos.Const.TRADE_STATE_RETURN:
					return this.tr("tnf:returns");			
			}

			return "??? " + state;			
		}, 
		translateType: function(type) {
			switch (type) {
				case 1:
					return this.tr("tnf:trade");
				case 2:
					return tr("transfer");
				case 3:
					return tr("minister");
			}

			return "??? " + type;
		}, 
		translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("tnf:ships");
			}
	

			return "??? " + type;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbTradeTypes = this._createTradeTypesSelectBox();
			this.sbTradeTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTradeTypes);
			
			this.sbStates = this._createStatesSelectBox();
			this.sbStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbStates);			
			
			this.sbTransportTypes = this._createTransportTypesSelectBox();
			this.sbTransportTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTransportTypes);
			
			this.sbTargetTypes = this._createTargetTypesSelectBox();
			this.sbTargetTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTargetTypes);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}, 
		_createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by trade type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, 
		_createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: transport type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, 
		_createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("filter by: resources receiver");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(tr("you"), null, 1));
			sb.add(new qx.ui.form.ListItem(tr("someone else"), null, 2));

			return sb;		
		}, 
		_createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: state"));
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}
	}
});


qx.Class.define("bos.gui.TradeRouteWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		this.setLayout(new qx.ui.layout.Dock());
		
		this.set({
			width: 440,
			minWidth: 200,
			maxWidth: 600,
			height: 440,
			minHeight: 200,
			maxHeight: 600,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("trade route")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {flex: true});
		
		scroll.add(this.createForm());		

		container.add(this.createFooter());
		
		this.add(container);
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);

	}, 
	members: {
		sbTo: null,
		sbFrom: null,	
		sbTransport: null,
		sbGroup: null,			
		woodInput: null,
		stoneInput: null,
		ironInput: null,
		foodInput: null,
		editedRoute: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.woodInput.setValue(0);
			this.stoneInput.setValue(0);
			this.ironInput.setValue(0);
			this.foodInput.setValue(0);				
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button(tr("OK"));
			btnAdd.setWidth(70);					
			container.add(btnAdd);
			btnAdd.addListener("click", this.addTradeRoute, this);

			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnMax = new qx.ui.form.Button(tr("max"));
			btnMax.setWidth(70);
			container.add(btnMax);
			btnMax.addListener("click", this.maxResources, this);				

			return container;
		}, 
		addTradeRoute: function() {

			var route = {};

			route.from = parseInt(this.sbFrom.getSelection()[0].getModel());
			route.to = parseInt(this.sbTo.getSelection()[0].getModel());
			
			route.wood = parseInt(this.woodInput.getValue(), 10);
			route.stone = parseInt(this.stoneInput.getValue(), 10);
			route.iron = parseInt(this.ironInput.getValue(), 10);
			route.food = parseInt(this.foodInput.getValue(), 10);
			
			if (route.wood < bos.Const.SHIP_CAPACITY) {
				route.wood *= 1000;
			}
			if (route.stone < bos.Const.SHIP_CAPACITY) {
				route.stone *= 1000;
			}
			if (route.iron < bos.Const.SHIP_CAPACITY) {
				route.iron *= 1000;
			}
			if (route.food < bos.Const.SHIP_CAPACITY) {
				route.food *= 1000;
			}				
			
			route.transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			route.group = this.sbGroup.getSelection()[0].getModel();				
			
			var sum = route.wood + route.stone + route.iron + route.food;
			if (sum == 0) {
				bos.Utils.handleWarning(tr("please enter some resources amount"));
				return;
			}
			
			if (route.from == route.to) {
				bos.Utils.handleWarning(tr("invalid destination"));
				return;					
			}
			
			var storage = bos.Storage.getInstance();
			if (this.editedRoute == null) {					
				storage.addTradeRoute(route);
			} else {
				this.editedRoute.from = route.from;
				this.editedRoute.to = route.to;
				
				this.editedRoute.wood = route.wood;
				this.editedRoute.stone = route.stone;
				this.editedRoute.iron = route.iron;
				this.editedRoute.food = route.food;				
			
				this.editedRoute.transport = route.transport;
				this.editedRoute.group = route.group
				//refactor it later
				storage.saveTradeRoutes();
				storage.setTradeRoutesVersion(storage.getTradeRoutesVersion() + 1);
			}
			
			this.editedRoute == null;
			
			this.close();
			
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			container.add(new qx.ui.basic.Label(tr("from")), {
				row: 1, 
				column : 0
			});	

			var selectWidth = 320;
			
			this.sbFrom = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbFrom);
			container.add(this.sbFrom, {
				row: 1,
				column: 1
			});

			container.add(new qx.ui.basic.Label(tr("to")), {
				row: 2, 
				column : 0
			});					
			this.sbTo = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbTo);
			container.add(this.sbTo, {
				row: 2,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:wood")), {
				row: 3, 
				column : 0
			});
			this.woodInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			this.woodInput.setWidth(120);
			container.add(this.woodInput, {
				row: 3,
				column: 1
			});					
		
			container.add(new qx.ui.basic.Label(this.tr("tnf:stone")), {
				row: 4, 
				column : 0
			});
			this.stoneInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			this.stoneInput.setWidth(120);
			container.add(this.stoneInput, {
				row: 4,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:iron")), {
				row: 5, 
				column : 0
			});
			this.ironInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			this.ironInput.setWidth(120);
			container.add(this.ironInput, {
				row: 5,
				column: 1
			});	
			
			container.add(new qx.ui.basic.Label(this.tr("tnf:food")), {
				row: 6, 
				column : 0
			});
			this.foodInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			this.foodInput.setWidth(120);
			container.add(this.foodInput, {
				row: 6,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("transport")), {
				row: 7, 
				column : 0
			});					
			this.sbTransport = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});	
			
			this.sbTransport.add(new qx.ui.form.ListItem(tr("ships then carts"), null, bos.Const.TRADE_TRANSPORT_SHIP_FIRST));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("carts then ships"), null, bos.Const.TRADE_TRANSPORT_CART_FIRST));							
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only carts"), null, bos.Const.TRADE_TRANSPORT_CART));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only ships"), null, bos.Const.TRADE_TRANSPORT_SHIP));
			
			container.add(this.sbTransport, {
				row: 7,
				column: 1
			});
			
			container.add(new qx.ui.basic.Label(tr("group")), {
				row: 8, 
				column : 0
			});	
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 200,
				height: 28
			});	
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			container.add(this.sbGroup, {
				row: 8,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("resourceMultiplierNotice")), {
				row: 9, 
				column : 0,
				colSpan: 2
			});					
		
			return box;
		}, 
		_populateCitiesSelectBox: function(sb) {

			sb.removeAll();
			
			var list = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];
				var name = city.name;
				if (city.reference != null && city.reference != "") {
					name += " [" + city.reference + "]";
				}
				list.push({
					id: parseInt(cityId),
					name: name
				});
			}
			
			
			list.sort(function(a, b) {
				var n1 = a.name.toLowerCase();
				var n2 = b.name.toLowerCase();
				if (n1 > n2) {
					return 1;
				} else if (n1 < n2) {
					return -1;
				} else if (a.id > b.id) {
					return 1;
				} else if (a.id < b.id) {
					return -1;
				} else {
					return 0;
				}
			});
			
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				sb.add(new qx.ui.form.ListItem(item.name, null, item.id));
			}

		}, 
		editRoute: function(route) {
			this.editedRoute = route;
			
			this.sbFrom.setModelSelection([route.from]);
			this.sbTo.setModelSelection([route.to]);
			
			this.woodInput.setValue(route.wood);
			this.stoneInput.setValue(route.stone);
			this.ironInput.setValue(route.iron);
			this.foodInput.setValue(route.food);
			
			this.sbTransport.setModelSelection([route.transport]);
			this.sbGroup.setModelSelection([route.group]);
							
		}, 
		addNewRoute: function() {
			this.editedRoute = null;
			var city = webfrontend.data.City.getInstance();
			this.sbFrom.setModelSelection([parseInt(city.getId())]);
		}, 
		maxResources: function() {
			var from = parseInt(this.sbFrom.getSelection()[0].getModel());
			var server = bos.Server.getInstance();
			var city = server.cities[from];
			if (city == undefined) {
				bos.Utils.handleError("Don't have data about selected 'from' city");
				return;
			}
						
			var wood = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
			var stone = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
			var iron = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
			var food = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
			/* TODO do it later, not so important
			var totalRes = wood + stone + iron + food;
			
			var transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			
			var dg = city.getTraders();
			if (dg != null) {
				var carts = dg[bos.Const.TRADE_TRANSPORT_CART].total;
				var ships = dg[bos.Const.TRADE_TRANSPORT_SHIP].total;				

				var amountLand = carts * bos.Const.CART_CAPACITY;
				var amountSea = ships * bos.Const.SHIP_CAPACITY;
				
				var totalTransportable;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						totalTransportable = amountLand;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						totalTransportable = amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						totalTransportable = amountLand + amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						totalTransportable = amountLand + amountSea;
						break;						
				}				

				if (totalTransportable < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						//wood = Math.min(wood, Math.floor(amountCurrent * woodPart));
						resources[i] = Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i]));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {							
								var left = Math.min(step, diff, ri.from.resources[i] - resources[i]);
								if (left > 0) {
									resources[i] += left;
									diff -= left;
									noIncrement = false;
								}								
							}						
						}
					}
					//COPY & PASTE END
				}					
				
			}
			*/
			
			this.woodInput.setValue(wood);
			this.stoneInput.setValue(stone);
			this.ironInput.setValue(iron);
			this.foodInput.setValue(food);
		}
	}
});

qx.Class.define("bos.gui.PurifyOptionsWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 300,
			minWidth: 200,
			maxWidth: 700,
			height: 280,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("purify options")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(10, 10));	

		var storage = bos.Storage.getInstance();
		var purifyOptions = storage.getPurifyOptions();

		var container = new qx.ui.groupbox.GroupBox();
		container.setLayout(new qx.ui.layout.VBox(10, 10));
		this.add(container);
		
		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
		container.add(box);
		
		this._inputs = new Array();
		this._inputs.push(null);
		var row = 0;		
		var purifiedRes = ["", "darkwood", "runestone", "veritum", "trueseed"];
		for (var i = 1; i <= 4; i++) {
			var name = purifiedRes[i];
			var lbl = new qx.ui.basic.Label(tr(name));
			var input = this._createMinimumResLevelInput();
			this._inputs.push(input);
			input.setValue(purifyOptions.minimumResLevels[i]);			
			
			box.add(lbl, {row: row, column: 1});
			box.add(input, {row: row, column: 0});
			
			row++;
		}
		
		this.cbIncludeCastles = new qx.ui.form.CheckBox(tr("cbIncludeCastles"));
		this.cbIncludeCastles.setToolTipText(tr("cbIncludeCastles_toolTip"));
		this.cbIncludeCastles.setValue(purifyOptions.includeCastles);
		container.add(this.cbIncludeCastles);	
		
		row++;
		
		this.cbUseRecruitmentData = new qx.ui.form.CheckBox(tr("cbUseRecruitmentData"));
		this.cbUseRecruitmentData.setToolTipText(tr("cbUseRecruitmentData_toolTip"));
		this.cbUseRecruitmentData.setValue(purifyOptions.useRecruitmentData);
		container.add(this.cbUseRecruitmentData);			
		
		row++;

		var btnSave = new qx.ui.form.Button(tr("save"));
		btnSave.setWidth(60);
		this.add(btnSave);
		btnSave.addListener("execute", this.confirm, this);

		row++;		
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);	
	},
	members: {
		_inputs: null,
		cbIncludeCastles: null,
		_createMinimumResLevelInput: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (ministerBuildPresent) {
				var _minimumResLevelInput = new webfrontend.ui.SpinnerInt(0, 20, 90);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_toolTip"));
				_minimumResLevelInput.setWidth(60);	
				return _minimumResLevelInput;
			} else {
				_minimumResLevelInput = new webfrontend.ui.SpinnerInt(0, 50000, 50000000);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_absolute_toolTip"));
				_minimumResLevelInput.setWidth(100);
				return _minimumResLevelInput;
			}
		},
		confirm: function() {
						
			purifyOptions = {
				includeCastles: this.cbIncludeCastles.getValue(),
				useRecruitmentData: this.cbUseRecruitmentData.getValue()				
			};
			purifyOptions.minimumResLevels = new Array();
			purifyOptions.minimumResLevels.push(0);
			
			for (var i = 1; i <= 4; i++) {
				var input = this._inputs[i];
				var val = parseInt(input.getValue(), 10);
				purifyOptions.minimumResLevels.push(val);
			}
			
			var storage = bos.Storage.getInstance();
			storage.savePurifyOptions(purifyOptions);
			
			this.close();			
		}
	}
});

qx.Class.define("bos.gui.PurifyResourcesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("purify"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "name", "position", "reference", "wood", "woodMax", "woodFree", "stone", "stoneMax", "stoneFree", "iron", "ironMax", "ironFree", "food", "foodMax", "foodFree", "purifiable", "darkwood", "runestone", "veritum", "trueseed"];
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(16, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", function(event) {
			this._handleCellClick(event, this._tableModel);
		}, this);		
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 100);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		var index = 4;
		for (var res = 1; res <= 4; res++) {
			columnModel.setColumnWidth(index++, 90);
			columnModel.setColumnVisible(index++, false);
			columnModel.setColumnVisible(index++, false);
		}

		var woodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "woodMax", "woodFree");
		columnModel.setDataCellRenderer(4, woodRenderer);

		var stoneRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "stoneMax", "stoneFree");
		columnModel.setDataCellRenderer(7, stoneRenderer);

		var ironRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "ironMax", "ironFree");
		columnModel.setDataCellRenderer(10, ironRenderer);

		var foodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "foodMax", "foodFree");
		columnModel.setDataCellRenderer(13, foodRenderer);
		
		columnModel.setColumnWidth(16, 70);
		
		for (var i = 0; i < 4; i++) {
			columnModel.setDataCellRenderer(17 + i, new bos.ui.table.cellrenderer.ClickableLook());
			columnModel.setColumnWidth(17 + i, 50);
		}

		this.add(this.table, {flex: 1});
			
	}, members: {		
		_purifyOptionsWidget: null,
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			var btnPurifyAll = new qx.ui.form.Button(tr("btnPurifyAll"));
			btnPurifyAll.setToolTipText(tr("btnPurifyAll_toolTip"));
			btnPurifyAll.setWidth(120);
			toolBar.add(btnPurifyAll);
			btnPurifyAll.addListener("execute", function(evt) {
				webfrontend.ui.MessageBox.messageBox({
					title: tr("confirmation"),
					text: tr("are you sure?"),
					textRich: true,
					executeOk: function() {
						this._purifyAllResources(this._tableModel);
					},
					callbackContext: this
				});										
			}, this);
			
			var btnPurifyOptions = new qx.ui.form.Button(tr("btnPurifyOptions"));
			btnPurifyOptions.setToolTipText(tr("btnPurifyOptions_toolTip"));
			btnPurifyOptions.setWidth(120);
			toolBar.add(btnPurifyOptions);
			btnPurifyOptions.addListener("execute", function(evt) {
				var widget = this._getPurifyOptionsWidget();
				widget.open();
			}, this);

			var btnMarkMoonglowTower = new qx.ui.form.Button(tr("btnMarkMoonglowTower"));
			btnMarkMoonglowTower.setToolTipText(tr("btnMarkMoonglowTower_toolTip"));
			btnMarkMoonglowTower.setWidth(180);
			btnMarkMoonglowTower.addListener("execute", this.markMoonglowTower, this);										
			toolBar.add(btnMarkMoonglowTower);
			
			var btnUnmarkMoonglowTower = new qx.ui.form.Button(tr("btnUnmarkMoonglowTower"));
			btnUnmarkMoonglowTower.setToolTipText(tr("btnUnmarkMoonglowTower_toolTip"));
			btnUnmarkMoonglowTower.setWidth(180);
			btnUnmarkMoonglowTower.addListener("execute", this.unmarkMoonglowTower, this);										
			toolBar.add(btnUnmarkMoonglowTower);

			var btnMarkMoonglowTower = new qx.ui.form.Button(tr("btnMarkAllMoonglowTowers"));
			btnMarkMoonglowTower.setToolTipText(tr("btnMarkAllMoonglowTowers_toolTip"));
			btnMarkMoonglowTower.setWidth(180);
			btnMarkMoonglowTower.addListener("execute", this.markAllMoonglowTowers, this);										
			toolBar.add(btnMarkMoonglowTower);			
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("purificationHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");						
				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);						
			
			return toolBar;
		}, 
		markMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			if (buildings.length == 0) {
				bos.Utils.handleWarning(tr("you need to be in city"));
				return;
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if (bType == 36 && b.level == 10) {
					var towerId = b.visId;
					var cityId = city.getId();
					bos.Storage.getInstance().addMoonglowTower(cityId, towerId);
					this.updateView();
					return;
				}
			}

			bos.Utils.handleWarning("Couldn't find Moonglow Tower at level 10");

		}, 
		markAllMoonglowTowers: function() {
			var withMoonglow = bos.CityTypes.getInstance().getCitiesWithMoonglowTower();

			var cities = webfrontend.data.Player.getInstance().cities;

			for (var key in withMoonglow) {
				var cityId = parseInt(withMoonglow[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}
				
				var towerId = bos.Storage.getInstance().findMoonglowTowerId(cityId);
				if (towerId > 0) {
					continue;
				}
				
				towerId = 1;
				bos.Storage.getInstance().addMoonglowTower(cityId, towerId);
			}
			this.updateView();
		},
		unmarkMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var cityId = city.getId();
			bos.Storage.getInstance().removeMoonglowTower(cityId);
			this.updateView();
		}, 
		_purifyAllResources: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (ministerBuildPresent) {
				this._purifyAllResourcesImpl();
			} else {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				
				var server = bos.Server.getInstance();
				server.addListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);				
				
				summary.fetchResources();
			}			
		},
		_resourcesRefreshed: function() {
			var server = bos.Server.getInstance();
			server.removeListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);
			this._purifyAllResourcesImpl();
		},
		_purifyAllResourcesImpl: function() {

			var storage = bos.Storage.getInstance();
			var purifyOptions = storage.getPurifyOptions();
			var towers = storage.getMoonglowTowers();
																									
			var rowData = this.createRowData();
			
			var totalCreated = 0;
			
			var types = ["", "darkwood", "runestone", "veritum", "trueseed"];
			var rawTypes = ["", "wood", "stone", "iron", "food"];
			
			var totalDelay = 0;	

			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			
			for (var i = 0; i < rowData.length; i++) {
				var row = rowData[i];	

				var cityInfo = bos.CityTypes.getInstance().parseReference(row["reference"]);
				if (cityInfo.isCastle && !purifyOptions.includeCastles) {
					continue;
				}
				
				var res = [];
				
				for (var r = 1; r <= 4; r++) {
					var resType = types[r];
					var purify = row[resType] * bos.Const.MOONSTONE_COST;
					if (purify == 0) {
						continue;
					}
					
					if (r == 4) {
						if (row["food/h"] != undefined && row["food/h"] < 0) {
							continue;
						}
						if (!ministerBuildPresent && cityInfo.isCastle) {
							continue;
						}
					}
					
					var minimumResLevel = purifyOptions.minimumResLevels[r];
					
					if (minimumResLevel > 0) {
						var rawType = rawTypes[r];
						if (ministerBuildPresent) {
							var max = row[rawType + "Max"];
							if (max > 0) {
								var keepRes = Math.floor(max * minimumResLevel / 100.0);
								purify -= keepRes;
							}
						} else {
							purify -= minimumResLevel;
						}
					}
					
					if (purify < bos.Const.MOONSTONE_COST) {
						continue;
					}
					
					res.push({
						t: r,
						c: purify
					});
				}
				if (res.length > 0) {
					var created = this._purifyResources(storage, row, res);
					totalCreated += created;
					
					totalDelay += bos.Const.MIN_SEND_COMMAND_INTERVAL;
				}				
			}
				
			bos.Utils.handleInfo("It will take " + Math.floor(totalDelay / 1000) + " seconds to refine " + totalCreated + " resources");
		}, 
		_purifyResources: function(storage, row, res) {
			var created = 0;
			var cityId = row["id"];
			if (res.length == 0) {
				return 0;
			}
			var towerId = storage.findMoonglowTowerId(cityId);
			if (towerId >= 0) {
			
				bos.net.CommandManager.getInstance().sendCommand("ResourceToVoid", {
					cityid: parseInt(cityId),
					res: res
				}, this, this._onResourcesPurified);
				
				for (var i = 0; i < res.length; i++) {
					created += res[i].c;
				}
			}
			return created;
		}, 
		_onResourcesPurified: function(result) {
			//do nothing
		},
		createRowData: function() {
			var rowData = [];

			var withMoonglow = bos.CityTypes.getInstance().getCitiesWithMoonglowTower();

			var cities = webfrontend.data.Player.getInstance().cities;
			
			var summary = getSummaryWidget();
			
			var unknownValue = "";
			
			var server = bos.Server.getInstance();

			for (var key in withMoonglow) {
				var cityId = parseInt(withMoonglow[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}				

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;

				if (server.cities[cityId] == undefined) {

					var resCity = server.cityResources["c" + cityId];
					if (resCity != null) {
						summary._updateRowFromResCity(resCity, row);
					}

				} else {
					var city = server.cities[cityId];

					row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
					row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
					row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
					row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));

					row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
					row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
					row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
					row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));

					row["woodFree"] = row["woodMax"] - row["wood"];
					row["stoneFree"] = row["stoneMax"] - row["stone"];
					row["ironFree"] = row["ironMax"] - row["iron"];
					row["foodFree"] = row["foodMax"] - row["food"];					
				}
								
				summary._populateResources(row, cityId);

				if (!(row["wood"] === unknownValue && row["stone"] === unknownValue && row["iron"] === unknownValue && row["food"] === unknownValue)) {
					var wood = Math.floor(row["wood"] / bos.Const.MOONSTONE_COST);
					var stone = Math.floor(row["stone"] / bos.Const.MOONSTONE_COST);
					var iron = Math.floor(row["iron"] / bos.Const.MOONSTONE_COST);
					var food = Math.floor(row["food"] / bos.Const.MOONSTONE_COST);
					
					row["purifiable"] = wood + stone + iron + food;
					
					if (row["purifiable"] > 0) {
						var towerId = bos.Storage.getInstance().findMoonglowTowerId(cityId);
						if (towerId > 0) {
							//"darkwood", "runestone", "veritum", "trueseed"
							row["darkwood"] = wood;
							row["runestone"] = stone;
							row["veritum"] = iron;
							row["trueseed"] = food;										
						}
					}
				}

				rowData.push(row);
			}

			return rowData;
		},
		_getPurifyOptionsWidget: function() {
			if (this._purifyOptionsWidget == null) {
				this._purifyOptionsWidget = new bos.gui.PurifyOptionsWidget();
			}
			return this._purifyOptionsWidget;
		},
		_handleCellClick: function(event, tableModel) {
		
			var row = event.getRow();
			var rowData = tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			var cityInfo = bos.CityTypes.getInstance().parseReference(rowData["reference"]);			
			
			var storage = bos.Storage.getInstance();
			var towerId = storage.findMoonglowTowerId(cityId);

			var resources = [];
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var x = parseInt(city["xPos"]);
					var y = parseInt(city["yPos"]);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;						
			case 17:
				resources.push({
					t: bos.Const.WOOD,
					c: rowData["darkwood"] * bos.Const.MOONSTONE_COST
				});
				break;
			case 18:
				resources.push({
					t: bos.Const.STONE,
					c: rowData["runestone"] * bos.Const.MOONSTONE_COST
				});					
				break;
			case 19:
				resources.push({
					t: bos.Const.IRON,
					c: rowData["veritum"] * bos.Const.MOONSTONE_COST
				});						
				break;
			case 20:
				if (cityInfo.isCastle) {
					bos.Utils.handleWarning("purifing food in castles is prohibited");
					return;
				}	
				resources.push({
					t: bos.Const.FOOD,
					c: rowData["trueseed"] * bos.Const.MOONSTONE_COST
				});					
				break;
			};
			
			if (towerId < 0) {
				return;
			}			

			if (resources.length > 0) {
				var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
				if (!ministerBuildPresent) {
					bos.Utils.handleWarning("Currently only mass purification is enabled for players without Trade Minister");
					return;
				}
			
				if (this._waitingForFullMessage) {
					bos.Utils.handleWarning("Resource auto refresh has to be turned on (which requires Trade Minister)");
					return;
				}
			
				this._purifyResources(storage, rowData, resources);
			}
		}
	}
});

qx.Class.define("bos.gui.TradeRoutesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("trade routes"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "group", "fromToIds", "fromTo", "position", "action", "status", "wood", "stone", "iron", "food", "land/sea", "edit"];				
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);
		for (var i = 0; i < columnIds.length; i++) {
			this._tableModel.setColumnSortable(i, false);
		}		

		this._setupSorting(this._tableModel);
		//this._tableModel.sortByColumn(1, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		this.table.setColumnVisibilityButtonVisible(false);
		
		var columnModel = this.table.getTableColumnModel();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 40);
		columnModel.setColumnVisible(2, false);
		
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());		
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(5, 70);
		columnModel.setColumnWidth(6, 70);		
		
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnWidth(8, 70);
		columnModel.setColumnWidth(9, 70);
		columnModel.setColumnWidth(10, 70);
		
		columnModel.setColumnWidth(11, 70);	
		columnModel.setColumnWidth(12, 70);	
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
		
		bos.Storage.getInstance().addListener("changeTradeRoutesVersion", this.updateView, this);
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		_tradeRouteWidget: null,
		_sendingStatuses: {},
		_usedCarts: {},
		_showErrors: false,
		_pendingRequests: [],
		_sendingRequest: -1,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();

			var sel;
			
			var filterGroup = "";
			sel = this.sbGroup.getSelection();
			if (sel != null && sel.length > 0) {
				filterGroup = sel[0].getModel();
			}			
			
			var storage = bos.Storage.getInstance();
			var routes = storage.getTradeRoutes();
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var now = new Date();
			
			for (var i = 0; i < routes.length; i++) {
				var r = routes[i];
			
				if (filterGroup != "" && r.group != filterGroup) {
					continue;
				}
				
				var row = [];
				var secondRow = [];				
				
				row["id"] = r.id;
				secondRow["id"] = -r.id;
				
				row["group"] = r.group;
				secondRow["group"] = "";
								
				var fromCity = cities[r.from];
				var toCity = cities[r.to];
				
				var skip = false;
				if (fromCity == undefined) {
					row["fromTo"] = "invalid";
					row["fromToIds"] = -1;
					skip = true;
				} else {
					row["fromTo"] = fromCity.name;
					row["position"] = fromCity.xPos + ":" + fromCity.yPos;
					row["fromToIds"] = r.from;
				}
				
				row["wood"] = r.wood;
				row["stone"] = r.stone;
				row["iron"] = r.iron;
				row["food"] = r.food;
				
				if (toCity == undefined) {
					secondRow["fromTo"] = "invalid";
					secondRow["fromToIds"] = -1;
					skip = true;
				} else {
					secondRow["fromTo"] = toCity.name;
					secondRow["position"] = toCity.xPos + ":" + toCity.yPos;
					secondRow["fromToIds"] = r.to;
				}				

				row["action"] = "";
				secondRow["action"] = "";
				if (!skip) {
					var ri = this.createRouteInfo(r);
					
					if (ri.from.reqRes != null) {
														
						if (r.transport != bos.Const.TRADE_TRANSPORT_SHIP)
							row["land/sea"] = ri.from.carts;
						else
							row["land/sea"] = "disabled";
						
						if (r.transport != bos.Const.TRADE_TRANSPORT_CART)
							secondRow["land/sea"] = ri.from.ships;
						else
							secondRow["land/sea"] = "disabled";
					}				
					
					if (ri.to.serverRes != null) {
						
						secondRow["wood"] = ri.to.freeResources[1];
						secondRow["stone"] = ri.to.freeResources[2];
						secondRow["iron"] = ri.to.freeResources[3];
						secondRow["food"] = ri.to.freeResources[4];
					}
					
					if (this.canBeSend(r, false, ri)) {
						row["action"] = this.tr("tnf:send");
					}
					if (this.canBeSend(r, true, ri)) {
						secondRow["action"] = "Send max";
					}
				}
				
				if (server.cities[r.from] == undefined) {
					
					//continue;
				} else {								
					var city = server.cities[r.from];
					
				/*
					var route = {
						from: parseInt(this.sbFrom.getSelection()[0].getModel()),
						to: parseInt(this.sbTo.getSelection()[0].getModel()),
						wood: parseInt(this.woodInput.getValue()),
						stone: parseInt(this.stoneInput.getValue()),
						iron: parseInt(this.ironInput.getValue()),
						food: parseInt(this.foodInput.getValue()),
						transport: parseInt(this.sbTransport.getSelection()[0].getModel())
					};
*/					
				}
				
				var status = this._getStatus(r.id);
				if (status != null) {
					row["status"] = this.translateStatus(status.status);
					secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));
				}
								
				row["edit"] = "Edit";
				secondRow["edit"] = this.tr("tnf:delete");
									
				rowData.push(row);				
				rowData.push(secondRow);
			}
			
			return rowData;
		}, 
		createRouteInfo: function(route) {
			var result = {
				from: {
					reqRes: null,
					serverRes: null,
					carts: 0,
					ships: 0,
					resources: [0, 0, 0, 0, 0]
				}, to: {
					reqRes: null,
					serverRes: null,
					freeResources: [bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF]
				}
			};

			var server = bos.Server.getInstance();
			var resCity = server.cityResources["c" + route.from];
			if (resCity != null) {
				result.from.reqRes = resCity;
				//it's impossible to get exact number of carts because when there are 1 cart and city has 1k wood and 1k stone for both resources it will return amountLand = 1000, the would be if city had 1000carts, we take lower bound here
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					result.from.resources[r] = res.count;
					if (res.amountLand < res.count) {
						result.from.carts = Math.ceil(res.amountLand / bos.Const.CART_CAPACITY);
						break;
					} else {
						result.from.carts = Math.max(result.from.carts, Math.ceil(res.count / bos.Const.CART_CAPACITY));
					}
				}
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					if (res.amountSea < res.count) {
						result.from.ships = Math.ceil(res.amountSea / bos.Const.SHIP_CAPACITY);
						break;
					} else {
						result.from.ships = Math.max(result.from.ships, Math.ceil(res.count / bos.Const.SHIP_CAPACITY));
					}
				}

				var usedCarts = this._usedCarts["c" + route.from];				
				if (usedCarts != null) {
					result.from.carts = Math.max(0, result.from.carts - usedCarts.carts);
					result.from.ships = Math.max(0, result.from.ships - usedCarts.ships);
				}				
			}
			
			resCity = server.cityResources["c" + route.to];
			if (resCity != null) {
				result.to.reqRes = resCity;
			}
			
			var summary = getSummaryWidget();
			
			var row = [];				
			if (summary._populateResources(row, route.from)) {
				result.from.serverRes = row;
				
				result.from.resources[1] = row["wood"];
				result.from.resources[2] = row["stone"];
				result.from.resources[3] = row["iron"];
				result.from.resources[4] = row["food"];
			}
			row = [];
			if (summary._populateResources(row, route.to)) {
				result.to.serverRes = row;
				
				result.to.freeResources[1] = row["woodFree"] - row["woodIncoming"];
				result.to.freeResources[2] = row["stoneFree"] - row["stoneIncoming"];
				result.to.freeResources[3] = row["ironFree"] - row["ironIncoming"];
				result.to.freeResources[4] = row["foodFree"] - row["foodIncoming"];
			}		
			
			return result;
		}, 
		translateStatus: function(status) {
			var s = "";
			if (status == -1) {
				s = "Comm. err";
			} else if (status == 0) {
				s = "OK";
			} else {
				if (status & (1 << 0)) {
					s += "I";
				}
				if (status & (1 << 1)) {
					s += "C";
				}
				if (status & (1 << 2)) {
					s += "T";
				}
				if (status & (1 << 3)) {
					s += "R";
				}
			}
			return s;
		}, 
		translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("tnf:ships");
			}
	

			return "??? " + type;
		}, 
		_handleCellClick: function(event) {
			
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
						
			var id = Math.abs(rowData["id"]);
			var isFirstRow = rowData["id"] >= 0;
			var route = bos.Storage.getInstance().findTradeRouteById(id);
			
			switch (event.getColumn()) {
			case 2:
			case 3:
				var cityId = parseInt(rowData["fromToIds"]);
				a.setMainView("c", cityId, -1, -1);
				break;
			case 4:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;				
			case 5:
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (this._sendingRequest != -1) {
						bos.Utils.handleWarning("Please wait, waiting for response for last trade");
					} else {
						this._showErrors = true;
						this.sendTrade(route, !isFirstRow, false);
					}
				}
				break;
			case 12:
				
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (isFirstRow) {											
						var widget = this._getTradeRouteWidget();
						widget.editRoute(route);
						widget.open();
					} else {
						webfrontend.ui.MessageBox.messageBox({
							title: "Confirmation",
							text: "Are you sure?",
							textRich: true,
							executeOk: function() {
								var storage = bos.Storage.getInstance();
								storage.removeTradeRoute(route.id);	
								
								this.updateView();
							},
							callbackContext: this
						});						
					}
				}
				
				break;
			}
		}, 
		canBeSend: function(route, maxMode, ri) {

			var totalRes = route.wood + route.stone + route.iron + route.food;	
			
			var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
			var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;
			
			//var transportType;
			var totalTransportable;
			switch (route.transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					totalTransportable = amountLand;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP:
					totalTransportable = amountSea;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_CART_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_CART;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					break;						
			}
			
			if (totalTransportable == 0 || (totalTransportable < totalRes && !maxMode)) {
				return;
			}
			
			if (!maxMode) {
							
				if (ri.from.resources[1] < route.wood) {
					return false;
				}
				if (ri.from.resources[2] < route.stone) {
					return false;
				}
				if (ri.from.resources[3] < route.iron) {
					return false;
				}
				if (ri.from.resources[4] < route.food) {
					return false;
				}				
			} else {
				var total = 0;
				if (route.wood > 0) {
					total += ri.from.resources[1];
				}
				if (route.stone > 0) {
					total += ri.from.resources[2];
				}
				if (route.iron > 0) {
					total += ri.from.resources[3];
				}
				if (route.food > 0) {
					total += ri.from.resources[4];
				}

				if (total < bos.Const.SHIP_CAPACITY) {
					return false;
				}
			}
			return true;
		}, sendAll: function(maxMode) {
			var rows = this.createRowData();
			var storage = bos.Storage.getInstance();
			
			this._pendingRequests = [];
			
			for (var i = 0; i < rows.length; i += 2) {
				var rowData = rows[i];
				
				var id = Math.abs(rowData["id"]);			
				var route = storage.findTradeRouteById(id);
				
				this.sendTrade(route, maxMode, true);
			}
			
			this.sendPendingTrades();
			
		}, 
		sendTrade: function(route, maxMode, onlyQueue) {
			try {
		
				var player = webfrontend.data.Player.getInstance();
				var targetPlayer = player.getName();
				var targetCity = bos.Utils.convertIdToCoodrinates(route.to);				
			
				var ri = this.createRouteInfo(route);
				
				//dumpObject(route);
				//dumpObject(ri);

				if (!this.canBeSend(route, maxMode, ri)) {
					return;
				}

				var resTypes = ["gold", "wood", "stone", "iron", "food"];
				var routeRes = [0, route.wood, route.stone, route.iron, route.food];
				var totalRouteRes = route.wood + route.stone + route.iron + route.food;
				var routeResPart = [0, 0, 0, 0, 0];
				
				for (var i = 1; i <= 4; i++) {
					routeResPart[i] = routeRes[i] / totalRouteRes;
				}
				
				//to be transported resources
				var resources = [0, 0, 0, 0, 0];

				//var reserved = [0, 0, 0, 0, 0];
																		
				if (maxMode) {
				/*
					for (var i = 1; i <= 4; i++) {
						if (ri.to.serverRes != null) {
							var type = resTypes[i];
							reserved[i] += serverRes[type + "Incoming"];
							//TODO reserve: trade time * production/h
						}
					}
				*/
					for (var i = 1; i <= 4; i++) {
						if (routeRes[i] > 0) {
							
							resources[i] = ri.from.resources[i];
							if (ri.to.serverRes != null) {
								//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
								resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
							}
							
						}
					}
				} else {
					for (var i = 1; i <= 4; i++) {
						resources[i] = routeRes[i];
					}						
				}
							
				var totalRes = 0;
				for (var i = 1; i <= 4; i++) {
					totalRes += resources[i];
				}
				
				if (totalRes == 0) {
					return;
				}
										
				var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
				var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;				
				
				var useSecondTransportType = false;
				var transportType;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						if (amountLand > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_CART;						
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;	
						}
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						if (amountSea > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_CART;
						}
						break;						
				}
						
				var amountCurrent = 0;						
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					amountCurrent = amountLand;
				} else {
					amountCurrent = amountSea;
				}
				
				if (amountCurrent < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {	
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}
							}						
						}
					}
					//COPY & PASTE END
				} else {
					//all resources fits in current transport type, there is no need for use other type
					useSecondTransportType = false;
				}				
				
				if (!onlyQueue) {
					this._pendingRequests = [];
				}
				var req1 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
				this._pendingRequests.push({
					route: route,
					request: req1
				});

				//make resources scheduled to send unavailable for other transport type
				for (var i = 1; i <= 4; i++) {
					ri.from.resources[i] -= resources[i];
					ri.to.freeResources[i] -= resources[i];
				}
				
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					amountCurrent = amountSea;
				} else {
					transportType = bos.Const.TRADE_TRANSPORT_CART;
					amountCurrent = amountLand;
				}
				
				if (amountCurrent == 0) {
					useSecondTransportType = false;
				}

				if (useSecondTransportType) {	
		
					if (!maxMode) {
						for (var i = 1; i <= 4; i++) {
							resources[i] = routeRes[i] - resources[i];
						}
					} else {
						for (var i = 1; i <= 4; i++) {
							if (routeRes[i] > 0) {
								
								resources[i] = ri.from.resources[i];
								if (ri.to.serverRes != null) {
									//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
									resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
								}
								
							} else {
								resources[i] = 0;
							}
						}																		
					}
						
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}		
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}								
							}						
						}
					}
					//COPY & PASTE END
					
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						totalRes += resources[i];
					}								
						
					if (totalRes > 0) {
						var req2 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
						this._pendingRequests.push({
							route: route,
							request: req2
						});
					}
				}
				
				if (!onlyQueue) {					
					this.sendPendingTrades();
				}
							
			} catch (ex) {
				this._sendingRequest = -1;
				bos.Utils.handleError("Sending resources failed: " + ex);
			}
		}, 
		sendPendingTrades: function() {
			if (this._pendingRequests.length == 0) {
				this._sendingRequest = -1;
				this._showErrors = false;
				this.updateView();
				return;
			}
			this._sendingRequest = 0;
			var req = this._pendingRequests[this._sendingRequest];
			bos.net.CommandManager.getInstance().sendCommand("TradeDirect", req.request, this, this._onSendDone, new Date());
		}, 
		_createTradeDirectRequest: function(from, resToBeSend, tradeTransportType, targetPlayer, targetCity) {
			var resources = [];
			if (resToBeSend[1] > 0) {
				resources.push({
					t: bos.Const.WOOD,
					c: resToBeSend[1]										
				});
			}
			if (resToBeSend[2] > 0) {
				resources.push({
					t: bos.Const.STONE,
					c: resToBeSend[2]					
				});
			}
			
			if (resToBeSend[3] > 0) {
				resources.push({
					t: bos.Const.IRON,
					c: resToBeSend[3]
				});
			}

			if (resToBeSend[4] > 0) {
				resources.push({
					t: bos.Const.FOOD,
					c: resToBeSend[4]					
				});
			}				
			var req = {
				cityid: from,
				res: resources,
				tradeTransportType: tradeTransportType,
				targetPlayer: targetPlayer,
				targetCity: targetCity
			}
			return req;
		}, 
		_onSendDone: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(-1);
				} else {
					this._setStatus(parseInt(errorCode));
				}	
			} catch (e) {
				bos.Utils.handleError(e);
			}
		}, 
		_setStatus: function(status) {
			var req = this._pendingRequests[this._sendingRequest];
		
			var prevStatus = this._sendingStatuses["r" + req.route.id];						
		
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["r" + req.route.id] = newStatus;
			var usedCarts = this._usedCarts["c" + req.route.from];
			
			if (usedCarts == null) {
				usedCarts = {
					carts: 0,
					ships: 0
				};
				this._usedCarts["c" + req.route.from] = usedCarts;
			}
			
			if (status == 0) {
				//OK
				var totalRes = 0;
				for (var i = 0; i < req.request.res.length; i++) {
					var res = req.request.res[i];
					totalRes += res.c; 
				}
				
				if (req.request.tradeTransportType == bos.Const.TRADE_TRANSPORT_CART) {
					var carts = Math.ceil(totalRes / bos.Const.CART_CAPACITY);
					usedCarts.carts += carts;
				} else {
					var ships = Math.ceil(totalRes / bos.Const.SHIP_CAPACITY);
					usedCarts.ships += ships;				
				}
			}
			
			/* because of user req disabled showing errors
			if (this._showErrors) {
				if (status != 0) {
					this._showErrorMessage(req, status);
				}
			}
*/			
			
			this._pendingRequests.splice(0, 1);
			this.sendPendingTrades();
			
		}, 
		_showErrorMessage: function(req, status) {
			
			var s = "";
			if (status == -1) {
				s = this.tr("tnf:communication error_1");
			} else if (status == 0) {
				s = "OK";
			} else {
				var sep = "<br/>"
				if (status & (1 << 0)) {
					s += this.tr("tnf:invalid!") + sep;
				}
				if (status & (1 << 1)) {
					s += this.tr("tnf:not enough traders!") + sep;
				}
				if (status & (1 << 2)) {
					s += this.tr("tnf:target cannot be reached!") + sep;
				}
				if (status & (1 << 3)) {
					s += this.tr("tnf:not enough resource!") + sep;
				}
			}

			if (s == "") {
				return;
			}
			
			var dialog = new webfrontend.gui.ConfirmationWidget();
			dialog.showGenericNotice("Error", s, s, "webfrontend/ui/bgr_popup_survey.gif");

			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
			
		}, 
		_getStatus: function(routeId) {
			return this._sendingStatuses["r" + routeId];
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});	
			this.sbGroup.setToolTipText("Filter by <b>group</b>");
			this.sbGroup.addListener("changeSelection", this.updateView, this);
			
			this.sbGroup.add(new qx.ui.form.ListItem("Any group", null, ""));
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			toolBar.add(this.sbGroup);			
			
			this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
			this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
			this.btnRefreshResources.setWidth(120);
			if (locale == "de") {				
				this.btnRefreshResources.setWidth(150);
			}
			
			toolBar.add(this.btnRefreshResources);

			this.btnRefreshResources.addListener("execute", function(evt) {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				summary.fetchResources();
				this._sendingStatuses = {};
				this._usedCarts = {};
			}, this);			
			
			var btnAddRoute = new qx.ui.form.Button(locale == "de" ? "Add route" : "Add route");			
			btnAddRoute.setWidth(100);
			toolBar.add(btnAddRoute);
			btnAddRoute.addListener("execute", function(evt) {
				var widget = this._getTradeRouteWidget();
				widget.addNewRoute();
				widget.open();
			}, this);

			var btnSendAll = new qx.ui.form.Button(tr("Send all"));			
			btnSendAll.setWidth(100);
			toolBar.add(btnSendAll);
			btnSendAll.addListener("execute", function(evt) {
				this.sendAll(false);
			}, this);
			
			var btnSendAllMax = new qx.ui.form.Button(tr("Send all max"));			
			btnSendAllMax.setWidth(100);
			toolBar.add(btnSendAllMax);
			btnSendAllMax.addListener("execute", function(evt) {
				this.sendAll(true);
			}, this);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice("Trade Routes Help", "Currently requires building minister, it may have some bugs. First you need to enable autorefresh of resources then click refresh resources on this tab (it will calculate lower bound of available carts and ships). List of error codes:", "I - Invalid target, C - not enough Carts or ships, T - Target cannot be accessed, R - not enough Resources", "webfrontend/ui/bgr_popup_survey.gif");

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);		

			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);			
						
			return toolBar;
		}, 
		_createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>trade type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, 
		_createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>transport type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, 
		_createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>resources receiver</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem("someone else", null, 2));

			return sb;		
		}, 
		_createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>state</b>");
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}, 
		_getTradeRouteWidget: function() {
			if (this._tradeRouteWidget == null) {
				this._tradeRouteWidget = new bos.gui.TradeRouteWidget();
			}
			return this._tradeRouteWidget;
		},
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getTradeRoutes();
			
			var json = qx.lang.Json.stringify(orders);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.importTradeRoutes(json);
			});
		}		
	}
});

qx.Class.define("bos.gui.MyAlliancePage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("my alliance"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "rank", "status", "name", "title", "score", "cities", "role", "lastLogin"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(3, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(1, 64);
		columnModel.setColumnWidth(2, 64);
				
		columnModel.setColumnWidth(3, 120);
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		columnModel.setColumnWidth(5, 100);
		columnModel.setColumnWidth(6, 64);
		
		columnModel.setColumnWidth(7, 100);
		columnModel.setColumnWidth(8, 120);
		
		//var dateRenderer = new qx.ui.table.cellrenderer.Date();
		//dateRenderer.setDateFormat(qx.util.format.DateFormat.getDateTimeInstance());
		//columnModel.setDataCellRenderer(8, dateRenderer);		
		
		this.add(this.table, { flex : 1 });
			
	}, members: {
		allianceInfo: null,
		createRowData: function() {
			var rowData = [];
					
			if (this.allianceInfo == null) {
				return rowData;
			}
			
			var roles = webfrontend.data.Alliance.getInstance().getRoles();
			
			var statuses = [tr("offline"), tr("online"), tr("afk"), tr("hidden")];
			
			var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
			
			var titles = webfrontend.res.Main.getInstance().playerTitles;
			
			for (var i = 0; i < this.allianceInfo.length; i++) {
				var item = this.allianceInfo[i];
				
				//{"c":494,"i":247863,"l":"01\/08\/2011 13:43:16","n":"Urthadar","o":3,"os":0,"p":4756785,"r":312856,"ra":5,"t":10},

				var row = [];
				row["id"] = item.i;
				row["rank"] = item.ra;
				row["status"] = statuses.hasOwnProperty(item.o) ? statuses[item.o] : item.o;
				row["name"] = item.n;
				row["title"] = titles[item.t].dn;
				row["score"] = item.p;
				row["cities"] = item.c;
				row["role"] = roles != null ? roles[item.r].Name : item.r;
				//row["lastLogin"] = qx.util.format.DateFormat.getDateTimeInstance("short").format(new Date(item.l));
				row["lastLogin"] = dateFormat.format(new Date(item.l));
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var name = rowData["name"];
			if (name != null) {
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: name
				});
			}
			
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
				
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {				
				bos.net.CommandManager.getInstance().sendCommand("AllianceGetMemberInfos", {}, this, this.parseAllianceInfo);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
					
			return toolBar;
		},
		parseAllianceInfo: function(isOk, result) {
			if (isOk == false || result == null) {
				alert("Not found");
				return;
			}
			
			this.allianceInfo = result;
			this.updateView();			
		}		
	}
});

qx.Class.define("bos.gui.IntelligenceOptionsWidget", {
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 420,
			minWidth: 200,
			maxWidth: 700,
			height: 200,
			minHeight: 200,
			maxHeight: 400,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("intelligence")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(5));
		
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.add(scroll, {flex: true});

		scroll.add(this.createForm());
		
		this.add(this.createFooter());
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
	}, 
	members: {
		editedIntel: null,
		description: null,
		toX: null,
		toY: null,
		lblCityInfo: null,
		cityInfos: new Object(),
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnOk = new qx.ui.form.Button(tr("OK"));
			btnOk.setWidth(150);
			container.add(btnOk);
			btnOk.addListener("click", this.confirm, this);
			
			return container;
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			var row = 1;
			
			container.add(new qx.ui.basic.Label(tr("position")), {
				row: row, 
				column : 0
			});	

			var containerXY = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			
			this.toX = new qx.ui.form.TextField("");
			this.toX.setWidth(40);			
			containerXY.add(this.toX);
			this.toY = new qx.ui.form.TextField("");
			this.toY.setWidth(40);			
			containerXY.add(this.toY);
			
			var btnSearchTarget = new qx.ui.form.Button(tr("Search"));
			btnSearchTarget.setWidth(80);					
			container.add(btnSearchTarget);
			btnSearchTarget.addListener("click", this.searchTarget, this);
			containerXY.add(btnSearchTarget);
			
			this.lblCityInfo = new qx.ui.basic.Label("");
			containerXY.add(this.lblCityInfo);
			
			container.add(containerXY, {
				row: row, 
				column : 1
			});

			row++;

			container.add(new qx.ui.basic.Label(this.tr("description")), {
				row: row, 
				column : 0
			});
			this.description = new qx.ui.form.TextField("");
			this.description.setWidth(320);
			a.setElementModalInput(this.description);			
			container.add(this.description, {
				row: row, 
				column : 1
			});			
								
			return box;
		}, 
		clearAll: function() {
			this.toX.setValue("");
			this.toY.setValue("");
			this.description.setValue("");			
		},
		searchTarget: function() {
			
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
				id: cityId
			}, this, this._onCityInfo, cityId);
		},
		_onCityInfo: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.cityInfos[cityId] = result;
				this.lblCityInfo.setValue(result.pn + " - " + result.n);
			}
		},	
		confirm: function() {
		
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);

			if (this.cityInfos[cityId] == undefined) {
				bos.Utils.handleError("Click search first");
				return;
			}
			
			var info = this.cityInfos[cityId];
			
			var intel = {
				cityId: cityId,
				name: info.n, 
				isLandlocked: info.w != 1,
				hasCastle: info.s == 1, 
				owner: info.pn, 
				description: this.description.getValue(), 
				lastModified: (new Date()).getTime(), 
				modifiedBy: webfrontend.data.Player.getInstance().getName()
			};
			
			var storage = bos.Storage.getInstance();
			if (this.editedIntel == null) {	
				storage.addIntelligence(intel);
			} else {
				storage.removeIntelligence(cityId);
				storage.addIntelligence(intel);				
			}
			storage.setIntelligenceVersion(storage.getIntelligenceVersion() + 1);
			
			this.editedIntel == null;

			this.close();			
		},
		updateView: function() {

		},
		prepareView: function(cityId) {		
			this.clearAll();			
			var storage = bos.Storage.getInstance();
			this.editedIntel = storage.findIntelligenceById(cityId);
			if (this.editedIntel != null) {
				var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
				this.toX.setValue("" + coords.xPos);
				this.toY.setValue("" + coords.yPos);
				this.description.setValue("" + this.editedIntel.description);
			}
			this.updateView();
		}
	}
});


qx.Class.define("bos.gui.IntelligencePage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("intelligence"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["cityId", "name", "position", "isLandlocked", "hasCastle", "owner", "description", "lastModified", "modifiedBy", "edit", "delete"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(3, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);		
		columnModel.setColumnWidth(1, 100);			
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(3, 64);
		columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setColumnWidth(4, 64);
		columnModel.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setColumnWidth(5, 100);
		columnModel.setColumnWidth(6, 160);
		columnModel.setColumnVisible(7, false);
		columnModel.setColumnVisible(8, false);
		columnModel.setColumnWidth(9, 64);
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(10, 64);
		columnModel.setDataCellRenderer(10, new bos.ui.table.cellrenderer.ClickableLook());	
		
		this.add(this.table, { flex : 1 });
		
		bos.Storage.getInstance().addListener("changeIntelligenceVersion", this.updateWholeView, this);
		this.updateWholeView();
			
	}, members: {
		_optionsWidget: null,
		sbLandOrWater: null,
		sbOwnerName: null,
		sbCityType: null,
		sbContinent: null,
		_sbContinentAsList: "_",
		_sbOwnerNameAsList: "_",
		createRowData: function() {
			var rowData = [];
			
			var sel;

			var landOrWater = "";			
			sel = this.sbLandOrWater.getSelection();
			if (sel != null && sel.length > 0) {
				landOrWater = sel[0].getModel();
			}
			
			var cityType = "";
			sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				cityType = sel[0].getModel();
			}
			
			var continent = -1;
			sel = this.sbContinent.getSelection();
			if (sel != null && sel.length > 0) {
				continent = parseInt(sel[0].getModel(), 10);
			}
			
			var ownerName = "";
			sel = this.sbOwnerName.getSelection();
			if (sel != null && sel.length > 0) {
				ownerName = sel[0].getModel();
			}			
			
			var storage = bos.Storage.getInstance();
			var intelligence = storage.getIntelligence();
			
			var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
						
			for (var i = 0; i < intelligence.length; i++) {
				var item = intelligence[i];				
				
				if (landOrWater == "L" && !item.isLandlocked) {
					continue;
				} else if (landOrWater == "W" && item.isLandlocked) {
					continue;
				}
				
				if (cityType == "C" && !item.hasCastle) {
					continue;
				} else if (cityType == "T" && item.hasCastle) {
					continue;
				}
				
				var pos = bos.Utils.convertIdToCoordinatesObject(item.cityId);
				if (continent != -1 && continent != pos.cont) {
					continue;
				}
				
				if (ownerName != "" && ownerName != item.owner) {
					continue;
				}
				
				var row = [];
				row["cityId"] = item.cityId;
				row["name"] = item.name;
				row["position"] = bos.Utils.convertIdToCoodrinates(item.cityId);
				row["isLandlocked"] = item.isLandlocked;
				row["owner"] = item.owner;
				row["description"] = item.description;
				row["hasCastle"] = item.hasCastle;
				row["lastModified"] = item.lastModified;
				row["modifiedBy"] = item.modifiedBy;
				row["edit"] = this._createActionButton(tr("edit"));
				row["delete"] = this._createActionButton(tr("delete"));
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var cityId = parseInt(rowData["cityId"], 10);
			
			switch (event.getColumn()) {
				case 0:
				case 1:
				case 2:
					var pos = rowData["position"];
					if (pos != null) {
						var coords = bos.Utils.extractCoordsFromClickableLook(pos);
						var sepPos = coords.indexOf(":");
						if (sepPos > 0) {
							var x = parseInt(coords.substring(0, sepPos), 10);
							var y = parseInt(coords.substring(sepPos + 1), 10);
							a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
					}
					break;
				case 5:
					a.showInfoPage(a.getPlayerInfoPage(), {
						name: rowData["owner"]
					});
					break;				
				case 9:
					var widget = this._getOptionsWidget();
					widget.prepareView(cityId);
					widget.open();
					break;
				case 10:
					
					if (confirm(tr("are you sure?"))) {
						var storage = bos.Storage.getInstance();
						storage.removeIntelligence(cityId);
					}
					break;
			}
			
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
						
			this.sbOwnerName = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			this.sbOwnerName.setToolTipText(tr("filter by: owner name"));
			this.sbOwnerName.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOwnerName);
			
			this.sbCityType = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});			
			this.sbCityType.setToolTipText(tr("filter by: city type"));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("any"), null, ""));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("castle"), null, "C"));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("city"), null, "T"));
			this.sbCityType.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbCityType);

			this.sbLandOrWater = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbLandOrWater.setToolTipText(tr("filter by: land or water"));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("any"), null, ""));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("land"), null, "L"));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("water"), null, "W"));
			this.sbLandOrWater.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbLandOrWater);

			this.sbContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbContinent.setToolTipText(tr("filter by: continent"));
			this.sbContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinent);			
			
			var btnAddIntel = new qx.ui.form.Button(tr("btnAddIntel"));
			btnAddIntel.setToolTipText(tr("btnAddIntel_toolTip"));
			btnAddIntel.setWidth(100);
			btnAddIntel.addListener("execute", this.addIntel, this);										
			toolBar.add(btnAddIntel);
												
			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);
					
			return toolBar;
		},
		_createActionButton: function(caption, color) {
			var format = "<div style=\"background-image:url(%1);color:%3;cursor:pointer;margin-left:-6px;margin-right:-6px;margin-bottom:-3px;font-size:11px;height:19px\" align=\"center\">%2</div>";
			if (color == undefined) {
				color = "#f3d298";
			}
			return qx.lang.String.format(format, [this.buttonActiveUrl, caption, color]);
		},			
		addIntel: function() {
			var widget = this._getOptionsWidget();
			widget.prepareView(-1);
			widget.open();
		},
		_getOptionsWidget: function() {
			if (this._optionsWidget == null) {
				this._optionsWidget = new bos.gui.IntelligenceOptionsWidget();
			}
			return this._optionsWidget;
		},		
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var intel = storage.getIntelligence();
			
			var json = qx.lang.Json.stringify(intel);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {			
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.mergeIntelligence(json);
			});
		},
		_populateContinentsSelectBox: function(sb, list) {
			list.sort();
			var newValues = list.join(",");				
			if (newValues == this._sbContinentAsList) {
				return;
			}
			this._sbContinentAsList = newValues;
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},
		_populateOwnersSelectBox: function(sb, list) {
			list.sort();
			var newValues = list.join(",");			
			if (newValues == this._sbOwnerNameAsList) {
				return;
			}
			this._sbOwnerNameAsList = newValues;
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, ""));
			for (var i = 0; i < list.length; i++) {
				var name = list[i];
				sb.add(new qx.ui.form.ListItem(name, null, name));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},		
		updateWholeView: function() {

			var storage = bos.Storage.getInstance();
			var intelligence = storage.getIntelligence();
			
			var continents = new Array();
			var addedContinents = new Object();
			var owners = new Array();
			var addedOwners = new Object();
			
			for (var i = 0; i < intelligence.length; i++) {
				var item = intelligence[i];
				
				var pos = bos.Utils.convertIdToCoordinatesObject(item.cityId);
				if (addedContinents[pos.cont] == undefined) {
					addedContinents[pos.cont] = true;
					continents.push(pos.cont);
				}
				
				if (addedOwners[item.owner] == undefined) {
					addedOwners[item.owner] = true;
					owners.push(item.owner);
				}
			}
			
			this._populateContinentsSelectBox(this.sbContinent, continents);
			this._populateOwnersSelectBox(this.sbOwnerName, owners);			
		
			this.updateView();
		}
	}
});


qx.Class.define("bos.gui.PlayerInfoPage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("player"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "type", "name", "continent", "position", "score"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(5, 64);
		
		this.add(this.table, { flex : 1 });
			
	}, 
	members: {
		cbLand: null,
		cbWater: null,
		cbCities: null,
		cbCastles: null,
		cbPalaces: null,
		minScoreInput: null,
		playerInfo: null,
		createRowData: function() {

			var rowData = [];
			
			if (this.playerInfo == null) {
				return rowData;
			}
			
			var minScore = parseInt(this.minScoreInput.getValue());
					
			for (var i = 0; i < this.playerInfo.c.length; i++) {
				var city = this.playerInfo.c[i];
				
				if (city.s == 0 && !this.cbCities.getValue()) {
					continue;
				}
				if (city.s == 1 && !this.cbCastles.getValue()) {
					continue;
				}
				if (city.s == 2 && !this.cbPalaces.getValue()) {
					continue;
				}
				if (city.w == 1) {
					if (!this.cbWater.getValue()) {
						continue;
					}
				} else {
					if (!this.cbLand.getValue()) {
						continue;
					}
				}
				
				if (city.p < minScore) {
					continue;
				}
				
				var row = [];

				row["id"] = city.i;
				
				var type = (city.w == 1) ? tr("water") : tr("land");
				type += " ";
 			    switch (city.s) {
				  case 0:
					type += tr("city");
					break;
				  case 1:
					type += tr("castle");
					break;
				  case 2:
					type += tr("palace");
					break;
				}
				row["type"] = type;
				
				row["name"] = city.n;
				row["continent"] = webfrontend.data.Server.getInstance().getContinentFromCoords(city.x, city.y);
				row["position"] = city.x + ":" + city.y;
				row["score"] = city.p;
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var pos = rowData["position"];
			if (pos != null) {
				var coords = bos.Utils.extractCoordsFromClickableLook(pos);
				var sepPos = coords.indexOf(":");
				if (sepPos > 0) {
					var x = parseInt(coords.substring(0, sepPos), 10);
					var y = parseInt(coords.substring(sepPos + 1), 10);
					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.playerName = new qx.ui.form.TextField("");
			this.playerName.setToolTipText(tr("player name"));
			this.playerName.setWidth(120);
			a.setElementModalInput(this.playerName);
			toolBar.add(this.playerName);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				var name = this.playerName.getValue();
				bos.net.CommandManager.getInstance().sendCommand("GetPublicPlayerInfoByName", {
					name: name
				}, this, this.parsePublicPlayerInfo, name);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
			
			var btnTxtExport = new qx.ui.form.Button(tr("btnTxtExport"));			
			btnTxtExport.setWidth(100);
			toolBar.add(btnTxtExport);
			btnTxtExport.addListener("execute", function(evt) {
				this._exportToTxt();								
			}, this);			
			
			this.minScoreInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			this.minScoreInput.setToolTipText(tr("minScoreInput_toolTip"));
			this.minScoreInput.setWidth(60);			
			this.minScoreInput.addListener("changeValue", this.updateView, this);
			toolBar.add(this.minScoreInput);
		
			this.cbLand = new qx.ui.form.CheckBox(tr("land"));			
			this.cbLand.setValue(true);
			this.cbLand.addListener("execute", this.updateView, this);
			toolBar.add(this.cbLand);			

			this.cbWater = new qx.ui.form.CheckBox(tr("water"));			
			this.cbWater.setValue(true);
			this.cbWater.addListener("execute", this.updateView, this);
			toolBar.add(this.cbWater);
			
			this.cbCities = new qx.ui.form.CheckBox(tr("cities"));			
			this.cbCities.setValue(true);
			this.cbCities.addListener("execute", this.updateView, this);
			toolBar.add(this.cbCities);

			this.cbCastles = new qx.ui.form.CheckBox(tr("castles"));			
			this.cbCastles.setValue(true);
			this.cbCastles.addListener("execute", this.updateView, this);
			toolBar.add(this.cbCastles);

			this.cbPalaces = new qx.ui.form.CheckBox(tr("palaces"));			
			this.cbPalaces.setValue(true);
			this.cbPalaces.addListener("execute", this.updateView, this);
			toolBar.add(this.cbPalaces);			
			
			return toolBar;
		},
		_exportToTxt: function() {
			var sb = new qx.util.StringBuilder(2048);
			var sep = " - ";
			var rows = this.createRowData();
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				sb.add(row["continent"], " ", row["position"], sep);
				sb.add(row["type"], sep, row["name"], sep);
				sb.add("\n");
			}
			bos.Utils.displayLongText(sb.get());
		},
		parsePublicPlayerInfo: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found " + name);
				return;
			}
			
			this.playerInfo = result;
			this.updateView();		
		}		
	}
});

qx.Class.define("bos.gui.AllianceInfoPage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("alliance"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "rank", "name", "score", "cities"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		//this._tableModel.sortByColumn(2, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(1, 64);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		
		this.add(this.table, { flex : 1 });
			
	}, 
	members: {
		allianceInfo: null,
		playerInfo: null,
		createRowData: function() {

			var rowData = [];
			
			//{"c":353,"i":102497,"n":"Danzie","p":3402087,"r":11}
			
			if (this.allianceInfo == null || this.playerInfo == null) {
				return rowData;
			}
					
			for (var i = 0; i < this.playerInfo.length; i++) {
				var item = this.playerInfo[i];
				
				var row = [];

				row["id"] = item.i;			
				row["rank"] = item.r;				
				row["name"] = item.n;
				row["score"] = item.p;
				row["cities"] = item.c;
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			var name = rowData["name"];
			if (name != null) {
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: name
				});
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.allianceName = new qx.ui.form.TextField("");
			this.allianceName.setToolTipText(tr("alliance name"));
			this.allianceName.setWidth(120);
			a.setElementModalInput(this.allianceName);
			toolBar.add(this.allianceName);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.playerInfo = null;
				this.allianceInfo = null;
				var name = this.allianceName.getValue();
				bos.net.CommandManager.getInstance().sendCommand("GetPublicAllianceInfoByNameOrAbbreviation", {
					name: name
				}, this, this.parsePublicAllianceInfoByNameOrAbbreviation, name);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
					
			return toolBar;
		},
		parsePublicAllianceInfoByNameOrAbbreviation: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found " + name);
				return;
			}
			
			this.allianceInfo = result;
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicAllianceMemberList", {
				id: result.i
			}, this, this.parsePublicAllianceMemberList, name);				
		},
		parsePublicAllianceMemberList: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found (2)" + name);
				return;
			}
			
			this.playerInfo = result;
			this.updateView();		
		}		
	}
});

qx.Class.define("bos.gui.IncomingAttacksPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("incoming attacks"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "targetCityId", "targetCityName", "targetPosition", "targetTS", "lastUpdated", //5
			"type", "state", "start", "end", 
			"attackerCityId", "attackerCityName", "attackerPosition", "player", "playerName", "alliance", "allianceName", "attackerTS", "attackerUnits", "spotted", "claim"];
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 70);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setColumnWidth(5, 80);
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(2));		
		
		columnModel.setColumnWidth(6, 70);
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnVisible(7, false);
		columnModel.setColumnWidth(8, 120);
		columnModel.setColumnVisible(8, false);
		columnModel.setColumnWidth(9, 120);

		columnModel.setColumnVisible(10, false);
		columnModel.setColumnWidth(11, 70);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(12, 64);
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnVisible(13, false);
		columnModel.setDataCellRenderer(14, new bos.ui.table.cellrenderer.ClickableLook());
		
		//allianceId
		columnModel.setColumnVisible(15, false);
		//alliance name
		columnModel.setDataCellRenderer(16, new bos.ui.table.cellrenderer.ClickableLook());
				
		columnModel.setColumnWidth(17, 64);
		columnModel.setColumnVisible(17, true);
		
		columnModel.setColumnWidth(18, 120);
		columnModel.setColumnVisible(18, true);
		
		columnModel.setColumnWidth(20, 40);
		
		this.add(this.table, { flex : 1 });
		
		this.updateIcon();
		
		if (webfrontend.data.AllianceAttack != undefined) {
			webfrontend.data.AllianceAttack.getInstance().addListener("changeVersion", this.updateIcon, this);
		}
			
	}, 
	members: {
		sbOrderTypes: null,
		sbDefenderTypes: null,
		attacksInfo: new Object(),
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var player = webfrontend.data.Player.getInstance();
			var playerId = player.getId();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var storage = bos.Storage.getInstance();

			var addedAttacks = {};
			
			var filterTypeId = -1;
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var defenderTypeId = -1;
			var sel = this.sbDefenderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				defenderTypeId = sel[0].getModel();
			}			
			
			var server = bos.Server.getInstance();
			var list = player.getIncomingUnitOrders();
			if (list != null && defenderTypeId != 2) {

				for (var i = 0, iCount = list.length; i < iCount; i++) {
					var item = list[i];
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					var cityId = item.targetCity;
				
					addedAttacks["a" + item.id] = true;
				
					row["id"] = item.id;
					row["targetCityId"] = cityId;
					row["targetCityName"] = item.targetCityName;
					if (cityId >= 0) {
						row["targetPosition"] = bos.Utils.convertIdToCoodrinates(cityId);
						row["targetTS"] = item.ts_defender;
						var city = server.cities[cityId];
						if (city != undefined) {							
							row["lastUpdated"] = city.getLastUpdated();
						}
					}
					
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					
					row["spotted"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.detectionStep));
					row["claim"] = (item.hasBaron) ? item.claim : "";
					
					row["attackerCityId"] = item.city;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["attackerCityName"] = item.cityName;
									
					row["player"] = item.player;
					row["playerName"] = item.playerName;
					row["alliance"] = item.alliance;
					row["allianceName"] = item.allianceName;
										
					row["attackerUnits"] = "";
					row["attackerTS"] = item.ts_attacker;
					if (item.units != null) {
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["attackerUnits"] += ", ";
							}
							row["attackerUnits"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							//var space = unit.count * getUnitRequiredSpace(unit.type);
							//row["attackerTS"] += space;
						}
					} else {
						var intel = storage.findIntelligenceById(item.city);					
						row["attackerUnits"] = (intel == null) ? "?" : "intel: " + intel.description;						
					}

					rowData.push(row);
				}
			}
			
			if (webfrontend.data.AllianceAttack != undefined) {
				list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			} else {
				list = null;
			}
			if (list != null && defenderTypeId != 1) {
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					
					if (addedAttacks["a" + item.id] != undefined || (defenderTypeId == -1 && item.tp == playerId)) {
						//dont add twice the same attack and dont show play attacks and alliance attacks for the same city
						continue;
					}
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}					
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
								/*
			                    "i": 22697776,
                    "t": 0,
                    "ss": 0,
                    "es": 13812688,
                    "s": 0,
                    "c": 15400977,
                    "cn": "D08 Sieniawa",
                    "p": 247863,
                    "pn": "Urthadar",
                    "a": 8508,
                    "an": "Brotherhood_Of_Steel",
                    "tc": 15400978,
                    "tcn": "Theramore2",
                    "tp": 248055,
                    "tpn": "Cudgel"
			*/
				
					row["id"] = item.i;
					row["targetCityId"] = item.tc;
					row["targetCityName"] = item.tpn + ": " + item.tcn;
					row["targetPosition"] = bos.Utils.convertIdToCoodrinates(item.tc);
					
					row["type"] = bos.Utils.translateOrderType(item.t);
					row["state"] = this.translateState(item.s);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.ss));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.es));
					
					row["attackerCityId"] = item.c;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.c);
					row["attackerCityName"] = item.cn;
									
					row["player"] = item.p;
					row["playerName"] = item.pn;
					row["alliance"] = item.a;
					row["allianceName"] = item.an;
										
					var intel = storage.findIntelligenceById(item.c);					
					row["attackerUnits"] = (intel == null) ? "?" : "intel: " + intel.description;
					row["attackerTS"] = "?";

					rowData.push(row);
				}			
			
			}

			this.updateIcon();
			
			return rowData;
		}, 
		updateIcon: function() {
			var attacked = false;
			var list;

			if (webfrontend.data.AllianceAttack != undefined) {
				list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			} else {
				list = null;
			}
			if (list != null && list.length > 0) {
				attacked = true;
			} else {
				var player = webfrontend.data.Player.getInstance();
				list = player.getIncomingUnitOrders();
				if (list != null && list.length > 0) {
					attacked = true;
				}
			}
			
			if (attacked) {				
				var img = webfrontend.config.Config.getInstance().getUIImagePath("ui/icons/icon_attack_warning.gif");
				this.setIcon(img);
			} else {
				this.setIcon("");
			}
		}, 
		translateState: function(state) {
		/*
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");

			}
			*/
			return "??? " + state;			
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:				
				var cityId = parseInt(rowData["targetCityId"]);
				if (!isNaN(cityId)) {
					a.setMainView("c", cityId, -1, -1);
					break;
				}
				//yes, I dont want break here
			case 3:
				var pos = rowData["targetPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 10:
			case 11:
			case 12:
				var pos = rowData["attackerPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						if (event.getColumn() != 12) {
							webfrontend.gui.Util.openCityProfile(x, y);
						} else {
							a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
						
					}
				}				
				break;
			case 13:
			case 14:
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: rowData["playerName"]
				});
				break;				
			case 15:
			case 16:				
				bos.Utils.showAllianceInfo({
					name: rowData["allianceName"]
				});
				break;				
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbDefenderTypes = this._createDefenderTypesSelectBox();
			this.sbDefenderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDefenderTypes);

			var btnExport = new qx.ui.form.Button(tr("export"));
			btnExport.setToolTipText(tr("exports icoming attacks informations in text format"));
			btnExport.setWidth(100);
			toolBar.add(btnExport);
			btnExport.addListener("execute", function(evt) {
				this.exportInTextFormat();								
			}, this);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));
			btnCsvExport.setToolTipText(tr("btnCsvExport_toolTip"));
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			var btnShowIntel = new qx.ui.form.Button(tr("show intel"));
			btnShowIntel.setWidth(100);			
			toolBar.add(btnShowIntel);
			btnShowIntel.addListener("execute", function(evt) {
				var widget = bos.gui.ExtraSummaryWidget.getInstance();
				widget.open();
				widget.switchToIntelligenceTab();
			}, this);			
			
			return toolBar;
		}, 
		exportInTextFormat: function() {
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\n";
			
			var rows = this.createRowData();
			
			var date = new Date();
			sb.add("Attacked cities list generated at ", qx.util.format.DateFormat.getDateTimeInstance().format(date), sep, sep);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (i > 0) {
					sb.add(sep);
				}
				
				sb.add(row["targetCityName"], " (", row["targetPosition"], ")");
				if (["targetTS"] != null) {
					sb.add(" total def: ", row["targetTS"], " TS");
				}
				sb.add(sep);
				sb.add(row["type"], " attack at: ", row["end"], sep);
				sb.add("Attacks: ", row["playerName"], " (", row["allianceName"], ") from city: ", row["attackerCityName"], " (", row["attackerPosition"], ") ", sep);
				if (row["attackerUnits"] != "?") {
					sb.add("Attack strength: ", row["attackerTS"], "TS", sep);
					sb.add("Attacker units: ", row["attackerUnits"], sep);
				}
								
			}
			
			bos.Utils.displayLongText(sb.get());
			
		}, 
		_createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:siege"), null, 5));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:unknown"), null, 0));

			return sb;		
		}, 
		_createDefenderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>defender type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:alliance members"), null, 2));

			return sb;		
		}
	}
});

qx.Class.define("bos.gui.MassRecruitmentOptionsWidget", {
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 640,
			minWidth: 200,
			maxWidth: 700,
			height: 540,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("mass recruitment")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(5));
		
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer, key);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.lblUnitsInCity = new qx.ui.basic.Label(tr("in city:"));
		this.unitContainer.add(this.lblUnitsInCity, {
			left: 2,
			top: maxUnitsPerColumn * unitHeight + 10
		});
		
		this.add(this.createFooter());
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
	}, 
	members: {
		units: null,
		unitContainer: null,
		lblUtilisation: null,
		editedOrder: null,
		productionInfo: null,
		lblUnitsInCity: null,
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container, unitType) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			
			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			lblUnitName.setRich(true);			
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			countInput.addListener("changeValue", this.updateView, this);
			countInput.setWidth(100);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);
			
			var btnMax = new qx.ui.form.Button("Max");
			btnMax.setWidth(50);
			container.add(btnMax, {
				left: x + 230,
				top: y + 6
			});						
			btnMax.addListener("click", function(event) {
				this._toMax(unitType);
			}, this);

			var result = {
				'image': img,
				'count': countInput,
				'label': lblUnitName,
				'name': unit.dn
			};
			return result;
		},  
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnOk = new qx.ui.form.Button(tr("OK"));
			btnOk.setWidth(150);
			container.add(btnOk);
			btnOk.addListener("click", this.confirm, this);
			
			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnAddCityUnits = new qx.ui.form.Button(tr("add city units"));
			btnAddCityUnits.setWidth(110);
			container.add(btnAddCityUnits);
			btnAddCityUnits.addListener("click", this.addCityUnits, this);			

			this.lblUtilisation = new qx.ui.basic.Label("");
			container.add(this.lblUtilisation);

			return container;
		}, 
		confirm: function() {
			var city = webfrontend.data.City.getInstance();
		
			var order = {
				cityId: city.getId(),
				units: new Array()
			};
			
			var res = webfrontend.res.Main.getInstance();
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					var info = this._findProductionInfo(key);
					if (info == null) {
						bos.Utils.handleError("Couldn't find production info for unit type " + key);
						return;
					}
					totalTS += count * getUnitRequiredSpace(key);
					var u = {
						type: key,
						count: count,
						time: info.ti
					};
					order.units.push(u);
				}
			}
			
			if (totalTS == 0) {
				bos.Utils.handleWarning(tr("please enter some unit count"));
				return;
			}			
			
			if (totalTS > city.getUnitLimit()) {
				bos.Utils.handleWarning("You have entered " + totalTS + "TS while max for this city is " + city.getUnitLimit());
				return;
			}			

			var storage = bos.Storage.getInstance();
			if (this.editedOrder == null) {					
				storage.addRecruitmentOrder(order);
			} else {
				this.editedOrder.units = order.units;
				
				storage.saveRecruitmentOrders();
				storage.setRecruitmentOrdersVersion(storage.getRecruitmentOrdersVersion() + 1);
			}
			
			this.editedOrder == null;

			this.close();
			
		},
		_calculateTS: function() {
			var res = webfrontend.res.Main.getInstance();
			
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					totalTS += count * getUnitRequiredSpace(key);
				}
			}		
			return totalTS;
		},
		_toMax: function(unitType) {
			var inputs = this.units[unitType];
			var count = parseInt(inputs.count.getValue(), 10);
			
			var ts = this._calculateTS();
			var city = webfrontend.data.City.getInstance();
			var max = city.getUnitLimit();
			
			var heads = getUnitRequiredSpace(unitType);
			var c = max - ts + count * heads;
			if (heads > 1) {
				c = Math.floor(c / heads);
			}
			inputs.count.setValue(c);
		},
		updateView: function() {
			var city = webfrontend.data.City.getInstance();
			var current = this._calculateTS();
			var max = city.getUnitLimit();
			this.lblUtilisation.setValue(current + " / " + max + " TS");
		},
		prepareView: function() {
			var city = webfrontend.data.City.getInstance();
			
			this.clearAll();			
			var storage = bos.Storage.getInstance();
			this.editedOrder = storage.findRecruitmentOrderById(city.getId());
			if (this.editedOrder != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var i = 0; i < this.editedOrder.units.length; i++) {
					var o = this.editedOrder.units[i];
					var inputs = this.units[o.type];
					inputs.count.setValue(o.count);
				}
			}
			
			var inCity = "";
			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];
					if (inCity.length > 0) {
						inCity += ", ";
					}					
					inCity += unit.total + " " + formatUnitType(key, unit.total);
				}			
			}
			this.lblUnitsInCity.setValue(tr("in city:") + inCity);			
			
			this.requestProductionInfo();
			this.updateView();
		},
		addCityUnits: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];					
					if (this.units.hasOwnProperty(key)) {
						this.units[key].count.setValue(unit.total);
					}
				}			
			}			
		},
		requestProductionInfo: function() {
			this.productionInfo = null;
			webfrontend.net.CommandManager.getInstance().sendCommand("GetUnitProductionInfo", {
				cityid: webfrontend.data.City.getInstance().getId()
			}, this, this._onProductionInfo);
		},
		_onProductionInfo: function(isOk, result) {
			if (!isOk || result == null) {
				return;
			}
			this.productionInfo = result;
			
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (this.units.hasOwnProperty(info.t) && info.r != null && info.r.length > 0) {
					var u = this.units[info.t];
					if (info.r[0].b == 0) {
						u.label.setValue("<strong>" + u.name + "</strong>");
					} else {
						u.label.setValue(u.name);
					}
				}
			}
		},
		_findProductionInfo: function(unitType) {
			if (this.productionInfo == null) {
				return null;
			}
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (info.t == unitType) {
					return info;
				}
			}
			return null;
		}
	}
});


qx.Class.define("bos.gui.MassRecruitmentPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("recruitment"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.buttonActiveUrl = webfrontend.config.Config.getInstance().getImagePath("ui/btn_army_overview.gif");
		
		this.add(this._createToolBar());
		
		this.cityIdColumn = 8;
		this.typeColumn = 9;
		var columnNames = [tr("city/order"), tr("action"), tr("status"), tr("missing"), tr("resourcesFor"), tr("recruiting"), tr("available"), tr("recruitmentTime"), tr("cityId"), tr("type")];
		
		this.tree = new qx.ui.treevirtual.TreeVirtual(columnNames, {
			tableColumnModel: function(d) {
				return new qx.ui.table.columnmodel.Basic(d);
			}
		});
		this.tree.addListener("cellClick", this._handleCellClick, this);
		this.tree.setStatusBarVisible(false);
		this.tree.setAlwaysShowOpenCloseSymbol(false);
		this.tree.set({
			rowHeight: 19,
			headerCellHeight: 22,
			focusCellOnMouseMove: false,
			columnVisibilityButtonVisible: false			
		});
        var eU = "#564d48";
        var fi = "#c9ae7c";
        var eY = "#70645d";
        var fa = "#f3d298";      
        var fm = "#373930";
        var eQ = "#4d4f46";
        var eP = "#4f5245"; 		
		
		var eE = {
			sBgcolFocusedSelected: eY,
			sBgcolFocused: eY,
			sBgcolSelected: eU,
			sBgcolEven: eU,
			sBgcolOdd: eU,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: fi,
			sStyleHorLine: "1px solid "
		};
		var eF = {
			sBgcolFocusedSelected: eP,
			sBgcolFocused: eP,
			sBgcolSelected: fm,
			sBgcolEven: fm,
			sBgcolOdd: fm,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: eQ,
			sStyleHorLine: "1px dotted "
		};		
		this.tree.setDataRowRenderer(new webfrontend.gui.TreeRowRendererCustom(this.tree, eE, eF));
				
		var tcm = this.tree.getTableColumnModel();
		tcm.setDataCellRenderer(0, new webfrontend.data.TreeDataCellRendererCustom({
			leafIcon: false
		}));		
		tcm.setColumnVisible(this.cityIdColumn, false);		
		tcm.setColumnVisible(this.typeColumn, false);
		
		this.tree.setMetaColumnCounts([-1]);		

		tcm.setColumnWidth(0, 150);
		tcm.setColumnWidth(1, 75);
		tcm.setColumnWidth(2, 60);
		
		for (var i = 3; i <= 7; i++) {
			tcm.setColumnWidth(i, 100);
			//tcm.setColumnSortable(i, true);
		}
		/*
		tcm.setDataCellRenderer(1, new webfrontend.ui.CellRendererHtmlCustom({
			sBorderRCol: "#4d4f46"
		}));
		*/
		
		for (var i = 1; i <= 7; i++) {
			tcm.setDataCellRenderer(i, new webfrontend.ui.CellRendererHtmlCustom({
				sBorderRCol: "#4d4f46"
			}));
		}
		
				
		tcm.addListener("widthChanged", this._treeWidthChanged, this)
		
		this.add(this.tree, { flex: 1 } );
		
		bos.Storage.getInstance().addListener("changeRecruitmentOrdersVersion", this.updateWholeView, this);
	}, 
	members: {
		tree: null,
		cityIdColumn: null,
		typeColumn: null,
		_optionsWidget: null,
		sbCityType: null,
		_sendingStatuses: {},
		buttonActiveUrl: null,
		sbMissingCount: null,
		cities: {},
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, true);
			
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, true);
			}, this);
			
			this.sbCityType.addListener("changeSelection", this.updateWholeView, this);						
			toolBar.add(this.sbCityType);

			this.sbMissingCount = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			this.sbMissingCount.setToolTipText(tr("missing"));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr("Any"), null, -1));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">0"), null, 0));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">10k"), null, 10000));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">30k"), null, 30000));	
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">100k"), null, 100000));			
			this.sbMissingCount.addListener("changeSelection", this.updateWholeView, this);						
			toolBar.add(this.sbMissingCount);			
			
			var btnRecruitAll = new qx.ui.form.Button(tr("btnRecruitAll"));
			btnRecruitAll.setToolTipText(tr("btnRecruitAll_toolTip"));
			btnRecruitAll.setWidth(100);
			btnRecruitAll.addListener("execute", this.recruitAll, this);										
			toolBar.add(btnRecruitAll);
			
			var btnEnableMassRecruitment = new qx.ui.form.Button(tr("btnEnableMassRecruitment"));
			btnEnableMassRecruitment.setToolTipText(tr("btnEnableMassRecruitment_toolTip"));
			btnEnableMassRecruitment.setWidth(100);
			btnEnableMassRecruitment.addListener("execute", this.enableMassRecruitment, this);										
			toolBar.add(btnEnableMassRecruitment);
			
			var btnDisableMassRecruitment = new qx.ui.form.Button(tr("btnDisableMassRecruitment"));
			btnDisableMassRecruitment.setToolTipText(tr("btnDisableMassRecruitment_toolTip"));
			btnDisableMassRecruitment.setWidth(100);
			btnDisableMassRecruitment.addListener("execute", this.disableMassRecruitment, this);										
			toolBar.add(btnDisableMassRecruitment);
			
			var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
			btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
			btnRefreshView.setWidth(100);
			btnRefreshView.addListener("execute", this.updateWholeView, this);
			toolBar.add(btnRefreshView);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("bos.gui.MassRecruitmentPage.help"), tr("bos.gui.MassRecruitmentPage.help2"), "webfrontend/ui/bgr_popup_survey.gif");

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);
			
			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);	

			var btnDefenceMinisterSetTargetArmy = new qx.ui.form.Button(tr("btnDefenceMinisterSetTargetArmy"));
			btnDefenceMinisterSetTargetArmy.setToolTipText(tr("btnDefenceMinisterSetTargetArmy_toolTip"));
			btnDefenceMinisterSetTargetArmy.setWidth(120);
			btnDefenceMinisterSetTargetArmy.addListener("execute", this.defenceMinisterSetTargetArmy, this);
			toolBar.add(btnDefenceMinisterSetTargetArmy);	
			
			return toolBar;
		},
		defenceMinisterSetTargetArmy: function() {
			//SetTargetArmy
			//"cityid":"3670229","units":[{"t":"17","c":780}]}
			//{"cityId":"10354721","units":[{"type":"7","count":168500,"time":6}	
			
			var cities = webfrontend.data.Player.getInstance().cities;
			
			var orders = bos.Storage.getInstance().getRecruitmentOrders();
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				
				var units = new Array();
				for (var u = 0; u < order.units.length; u++) {
					var o = order.units[u];
					units.push({
						t: o.type,
						c: o.count
					});
				}
				
				var request = {
					cityid: order.cityId,
					units: units
				};
				
				bos.net.CommandManager.getInstance().sendCommand("SetTargetArmy", request, this, this._parseSetTargetArmyResponse, request);
			}			
		},
		_parseSetTargetArmyResponse: function(isOk, result, context) {
			
		},
		enableMassRecruitment: function() {
			var widget = this._getOptionsWidget();
			widget.prepareView();
			widget.open();
		},
		disableMassRecruitment: function() {
			var city = webfrontend.data.City.getInstance();
			var storage = bos.Storage.getInstance();
			var order = storage.findRecruitmentOrderById(city.getId());
			if (order != null) {
				if (confirm(tr("are you sure?"))) {
					storage.removeRecruitmentOrder(city.getId());
				}
			}
		},
		_shouldCityBeIncluded: function(city, order) {
		
			var sel = this.sbCityType.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var reqType = sel[0].getModel();
			if (reqType != "A") {
				var type = bos.CityTypes.getInstance().parseReference(city.reference);
				switch (reqType) {
					case 'C':
						if (!type.isCastle) return false;
						break;
					case 'D':
						if (!type.isDefensive) return false;
						break;
				}
			}
			
			var minimalMissing = parseInt(this.sbMissingCount.getSelection()[0].getModel());
			if (minimalMissing != -1) {
				var res = webfrontend.res.Main.getInstance();
				
				var server = bos.Server.getInstance();
				var storedCity = server.cities[order.cityId];
				if (storedCity == undefined) {
					return true;
				}
				
				var totalMissing = 0;				
				for (var j = 0; j < order.units.length; j++) {
					var unit = order.units[j];					
					
							
					var details = this._calculateUnitDetails(unit, storedCity);				
					var heads = res.units[unit.type].uc;
					
					if (heads > 1) {
						totalMissing += details.missing * heads;
					} else {
						totalMissing += details.missing;
					}					
				}
								
				if (totalMissing < minimalMissing) {
					return false;
				}
			}

			return true;
		},
		_treeWidthChanged: function(e) {
			var ed = e.getData();
			if (ed.col == 1 && ed.newWidth != 75) {
				var tcm = this.tree.getTableColumnModel();
				tcm.setColumnWidth(ed.col, 75);
			}
        },
		_getOptionsWidget: function() {
			if (this._optionsWidget == null) {
				this._optionsWidget = new bos.gui.MassRecruitmentOptionsWidget();
			}
			return this._optionsWidget;
		},
		updateWholeView: function() {
			this.cities.reset = true;
			this.updateView();
		},
		updateView: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getRecruitmentOrders();
			
			var model = this.tree.getDataModel();
			
			if (this.cities.hasOwnProperty("reset")) {
				model.clearData();
				this.cities = {};
			}
			
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();			
			var server = bos.Server.getInstance();		
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city, order)) {
					continue;
				}
				
				var storedCity = server.cities[order.cityId];
				var unitLimit = 0;
				var unitCount = new Object();
				if (storedCity != undefined) {
					unitLimit = storedCity.getUnitLimit();
					
					//var h = f.getUnitLimit() - f.getUnitCount() - f.getUnitsInQueue();
				} else {					
					bos.Utils.handleError("No data about city. Please visit " + bos.Utils.convertIdToCoodrinates(order.cityId));
					continue;
				}
				
				var currentTS = this._currentTSInCity(storedCity);
				var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
				var bid;
				if (!this.cities.hasOwnProperty(order.cityId)) {				
					bid = model.addBranch(null, city.name, true);
					this.cities[order.cityId] = {
						bid: bid,
						leafs: []
					}
					model.setState(bid, {
						icon: "",
						iconSelected: ""
					});
				} else {
					bid = this.cities[order.cityId].bid;
				}
				var treeData = this.cities[order.cityId];
				
				var totalMissing = 0;
				var totalResourcesFor = 0;
				var totalRecruited = 0;
				var totalCount = 0;
				var ordersAvailableForRecruitment = 0;
				
				var textColor = bos.Const.TABLE_DEFAULT_COLOR;
				for (var j = 0; j < order.units.length; j++) {
					var unit = order.units[j];					
					
					var lid;
					if (treeData.leafs.length <= j) {
						lid = model.addLeaf(bid, unit.count + " " + formatUnitType(unit.type, unit.count));
						treeData.leafs.push(lid);
					} else {
						lid = treeData.leafs[j];
					}								
					var details = this._calculateUnitDetails(unit, storedCity);
					
					var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
					var availableSpace = freeSpaceInBarracks;
					var heads = res.units[unit.type].uc;
					if (heads > 1) {
						availableSpace = Math.floor(availableSpace / heads);
					}
					
					if (details.missing > 0 && details.resourcesFor > 0 && availableSpace >= heads) {
						model.setColumnData(lid, 1, this._createActionButton(tr("recruit")));
						ordersAvailableForRecruitment++;
					} else {
						model.setColumnData(lid, 1, "");
					}
					var status = this._getStatus(order.cityId, j);
					if (status != undefined) {
						model.setColumnData(lid, 2, this.translateStatus(status.status));
						//secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));						
					} else {
						model.setColumnData(lid, 2, "");
					}
					model.setColumnData(lid, 3, bos.Utils.makeColorful(details.missing, textColor));
					model.setColumnData(lid, 4, bos.Utils.makeColorful(details.resourcesFor, textColor));
					model.setColumnData(lid, 5, bos.Utils.makeColorful(details.recruited, textColor));					
					model.setColumnData(lid, 6, bos.Utils.makeColorful(details.currentCount, textColor));
					model.setColumnData(lid, 7, bos.Utils.makeColorful(unit.time, textColor));
					model.setColumnData(lid, this.cityIdColumn, order.cityId);
					model.setColumnData(lid, this.typeColumn, j);					
					
					totalMissing += details.missing;
					totalResourcesFor += details.resourcesFor;
					totalRecruited += details.recruited;
					totalCount += details.currentCount;
				}
								
				if (ordersAvailableForRecruitment > 0) {
					model.setColumnData(bid, 1, this._createActionButton(tr("recruit")));
				} else {
					model.setColumnData(bid, 1, "");
				}
				model.setColumnData(bid, 3, bos.Utils.makeColorful(totalMissing, textColor));
				model.setColumnData(bid, 4, bos.Utils.makeColorful(totalResourcesFor, textColor));
				model.setColumnData(bid, 5, bos.Utils.makeColorful(totalRecruited, textColor));
				model.setColumnData(bid, 6, bos.Utils.makeColorful(totalCount, textColor));
				model.setColumnData(bid, this.cityIdColumn, order.cityId);
				model.setColumnData(bid, this.typeColumn, -1);
				
			}
			
			model.setData();
		},
		_createActionButton: function(caption, color) {
			var format = "<div style=\"background-image:url(%1);color:%3;cursor:pointer;margin-left:-6px;margin-right:-6px;margin-bottom:-3px;font-size:11px;height:19px\" align=\"center\">%2</div>";
			if (color == undefined) {
				color = "#f3d298";
			}
			return qx.lang.String.format(format, [this.buttonActiveUrl, caption, color]);
		},
		_calculateTotalRecruitingUnits: function(storedCity) {
			if (storedCity.unitQueue == null) {
				return 0;
			}
			var res = webfrontend.res.Main.getInstance();
			var recruiting = 0;
			for (var k = 0; k < storedCity.unitQueue.length; k++) {
				var uq = storedCity.unitQueue[k];
				if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {					
					recruiting += uq.left * res.units[uq.type].uc;					
				}
			}
			return recruiting;
		},
		_currentTSInCity: function(storedCity) {			
			var ts = 0;			
			if (storedCity.getUnits() != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var key in storedCity.getUnits()) {
					var item = (storedCity.getUnits())[key];
					
					var unit = res.units[key];
					ts += item.total * unit.uc;
				}
			}
			return ts;
		},
		_calculateUnitDetails: function(unit, storedCity) {
			var o = {
				currentCount: 0,
				recruited: 0,
				missing: 0,
				resourcesFor: 0
			};
		
			var currentItem = (storedCity.getUnits())[unit.type];
			if (currentItem != undefined) {						
				o.currentCount = currentItem.total;
			}
			
			if (storedCity.unitQueue != null) {
				for (var k = 0; k < storedCity.unitQueue.length; k++) {
					var uq = storedCity.unitQueue[k];
					if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {
						if (uq.type == unit.type) {
							o.recruited += uq.left;
						}
					}
				}
			}
			
			o.missing = Math.max(0, unit.count - o.currentCount - o.recruited);
						
			var resources = new Array();
			resources[0] = webfrontend.data.Player.getInstance().getGold();
			var row = [];
			var summary = getSummaryWidget();			
			if (summary._populateResources(row, storedCity.getId())) {				
				resources[1] = row["wood"];
				resources[2] = row["stone"];
				resources[3] = row["iron"];
				resources[4] = row["food"];
			}
			
			var maxRecruitable = [0, -1, -1, -1, -1];
			if (resources.length >= 5) {
				var res = webfrontend.res.Main.getInstance();
				var u = res.units[unit.type];	
				if (u.g == 0) {
					maxRecruitable[0] = -1;
				} else {
					maxRecruitable[0] = Math.floor(resources[0] / u.g);
				}
				
				for (var resType in u.res) {
					var req = u.res[resType];
					maxRecruitable[resType] = Math.floor(resources[resType] / req);
				}
				
				o.resourcesFor = bos.Const.INF;
				
				for (var i = 0; i <= 4; i++) {
					var min = maxRecruitable[i];
					if (min != -1) {
						o.resourcesFor = Math.min(o.resourcesFor, min);
					}
				}
			}			
			
			return o;
		},
		recruitAll: function() {
			var cities = webfrontend.data.Player.getInstance().cities;
			var orders = bos.Storage.getInstance().getRecruitmentOrders();
			this._sendingStatuses = {};
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city, order)) {
					continue;
				}				
				this.recruit(order.cityId, -1, false);
			}
		},
		_handleCellClick: function(e) {
			
			var row = this.tree.getDataModel().getRowData(e.getRow());
			var cityId = row[this.cityIdColumn];
			
			switch (e.getColumn()) {
				case 0:
					a.setMainView("c", cityId, -1, -1);
					break;
				case 1:
					//action
					this.recruit(cityId, row[this.typeColumn], true);					
					break;
			}
		},
		recruit: function(cityId, type, manual) {
			//type = -1 whole city, else index in units
			
			var order = bos.Storage.getInstance().findRecruitmentOrderById(cityId);
			if (order == null) {
				bos.Utils.handleError("Couldnt find recruitment order for cityId=" + cityId);
				return;
			}
			
			var server = bos.Server.getInstance();
			var storedCity = server.cities[cityId];
			if (storedCity == null) {
				bos.Utils.handleError("Couldnt find saved city data for cityId=" + cityId);
				return;
			}
			
			var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
			var currentTS = this._currentTSInCity(storedCity);
			var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
			if (freeSpaceInBarracks <= 0) {
				if (manual) {
					bos.Utils.handleWarning("No free space in barracks");
				}
				return;
			}
			
			var res = webfrontend.res.Main.getInstance();
			
			for (var i = 0; i < order.units.length; i++) { 
				if (type != -1 && type != i) {
					continue;
				}
				var unit = order.units[i];
				
				var availableSpace = freeSpaceInBarracks;
				var heads = res.units[unit.type].uc;
				if (heads > 1) {
					availableSpace = Math.floor(availableSpace / heads);
				}				
				
				var details = this._calculateUnitDetails(unit, storedCity);
				
				var count = Math.min(details.missing, details.resourcesFor, availableSpace);
				if (count <= 0) {
					continue;
				}
				
				var units = new Array();
				units.push({
					t: unit.type,
					c: count
				});
				
				var context = { 
					order: order,
					orderIndex: i,
					units: units
				};
			
				bos.net.CommandManager.getInstance().sendCommand("StartUnitProduction", {
					cityid: cityId,
					units: units,
					isPaid: true
				}, this, this._parseResponse, context);
				
				freeSpaceInBarracks -= count * heads;				
			}
		},
		_parseResponse: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(context, -1);
				} else {
					this._setStatus(context, parseInt(errorCode));
				}
				this.updateView();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},
		_setStatus: function(context, status) {
					
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["o" + context.order.cityId + "_" + context.orderIndex] = newStatus;
			
			if (status == 0) {
				var server = bos.Server.getInstance();
				var storedCity = server.cities[context.order.cityId];
				if (storedCity != undefined) {
					if (storedCity.unitQueue == null) {
						storedCity.unitQueue = new Array();
					}
					
					var start = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (storedCity.unitQueue.length > 0) {
						var lastOrder = storedCity.unitQueue[storedCity.unitQueue.length - 1];
						if (lastOrder.end > start) {
							start = lastOrder.end;
						}						
					}
				
					var unit = context.units[0];
					
					var usedRecruitmentOrder = context.order.units[context.orderIndex];

					var end = start + usedRecruitmentOrder.time * unit.c;
					
					var uq = {
						id: -1,
						type: unit.t,
						count: unit.c,
						batch: 1,
						left: unit.c,
						start: start,
						end: end,
						isPaid: true
					};
					
					storedCity.unitQueue.push(uq);
					storedCity.unitsInQueue += unit.c;
					
					server.markCityDirty(storedCity.getId());
				}
			}
		},
		_getStatus: function(cityId, orderIndex) {
			return this._sendingStatuses["o" + cityId + "_" + orderIndex];
		},
		translateStatus: function(status) {
			if (status == 0) {
				return "OK";
			}
			if (status == -1) {
				return "Comm. err";
			}
			var errors = "";
			if ((status & 0x01) != 0) errors += "I";
			if ((status & 0x02) != 0) errors += "R";
			if ((status & 0x04) != 0) errors += "Q";
			if ((status & 0x08) != 0) errors += "T";
			if ((status & 0x10) != 0) errors += "B";
			if ((status & 0x20) != 0) errors += "G";
			return errors;
		},
		_sortCities: function(tcm) {
			var data = tcm.getData();
			if (data.length == 0 || data[0].children.length == 0) {
				return;
			}
			
			data[0].children.sort(function(a, b) {
				var o1 = data[a].label.toLowerCase();
				var o2 = data[b].label.toLowerCase();
				if (o1 < o2) return -1;
				if (o1 > o2) return 1;
				return 0;
			});
		},
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getRecruitmentOrders();
			
			var json = qx.lang.Json.stringify(orders);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {			
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.importRecruitmentOrders(json);
			});
		}
	}
});


qx.Class.define("bos.gui.UnitOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("orders"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		
		if(locale == "de") {
			columnNames = ["id", "StadtId", "Ausgehende Stadt", "Angriffstyp", "State", "Abreise", "Ankunft", "Rückkehr", "Pos", "Ziel",   
					"periodischer Angriffstyp?", "zuletzt Aktualisiert", "TS", "Einheiten"];
		} else {
			columnNames = ["id", "City Id", "From", "Type", "State", "Departure", "Arrival", "Back at home", "Pos", "Target",   
					"Recurring type", "Last visited", "TS", "Units"];
		}
		
		var columnIds = ["id", "cityId", "from", "type", "state", "start", "end", "recurringEndStep", "position", "target",   
					"recurringType", "lastUpdated", "ts", "units"];		
					
		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();				

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		
		columnModel.setColumnWidth(5, 120);
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 125);
		
		columnModel.setColumnWidth(11, 80);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(12, 50);
		
		columnModel.setColumnWidth(13, 180);
		
		var ministerMilitaryPresent = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();	
		
		if (ministerMilitaryPresent) {
			columnModel.setColumnVisible(5, false);
			columnModel.setColumnVisible(7, false);
			columnModel.setColumnVisible(11, false);
		}

		this.add(this.table, { flex: 1 } );		
			
	}, members: {
		sbOrderTypes: null,
		sbOrderStates: null,
		sbSourceContinent: null,
		_sbSourceContinentAsList: "",
		sbDestinationContinent: null,
		_sbDestinationContinentAsList: "",
		cbShowFakeAttacks: null,
		receivedFirstCOMO: false,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var filterTypeId = -1;
			
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbOrderStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}

			var filterSourceContinent = -1;
			sel = this.sbSourceContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterSourceContinent = sel[0].getModel();
			}

			var filterDestinationContinent = -1;
			sel = this.sbDestinationContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterDestinationContinent = sel[0].getModel();
			}

			var showFakeAttacks = this.cbShowFakeAttacks.getValue();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var sourceContinents = [];
			var destContinents = [];
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.unitOrders == null) {
					continue;
				}
						
				for (var i = 0; i < city.unitOrders.length; i++) {
					var item = city.unitOrders[i];
					
					var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
					sourceContinents["c" + cont] = true;
					
					var destCoords = bos.Utils.convertIdToCoordinatesObject(item.city);
					var destCont = webfrontend.data.Server.getInstance().getContinentFromCoords(destCoords.xPos, destCoords.yPos);
					destContinents["c" + destCont] = true;					
					
										
					if (filterTypeId != -1) {
						if (filterTypeId == -2) {
							if (!(item.type == 1 || item.type == 2 || item.type == 3 || item.type == 5)) {
								continue;
							}
						} else if (filterTypeId != item.type) {
							continue;
						}
					}
					
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					
					if (filterSourceContinent != -1 && filterSourceContinent != cont) {
						continue;
					}
					
					if (filterDestinationContinent != -1 && filterDestinationContinent != destCont) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);									
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["units"] = "";
					row["ts"] = 0;
					
					if (item.units != null) {					
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["units"] += ", ";
							}
							row["units"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							var space = unit.count * getUnitRequiredSpace(unit.type);
							row["ts"] += space;							
						}
					}
					//row["isDelayed"] = item.isDelayed;
					row["recurringType"] = this.translateRecurringType(item.recurringType);
					if (item.recurringEndStep > 0) {
						row["recurringEndStep"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.recurringEndStep));
					}
					row["lastUpdated"] = city.getLastUpdated();
					
					if (!showFakeAttacks && row["ts"] < bos.Const.FAKE_ATTACK_TS && (item.type == 2 || item.type == 3 || item.type == 5)) {
						//plunder, siege, assault
						continue;
					}					
										
					rowData.push(row);
				}
			}
			
			this._populateContinentsSelectBox(this.sbSourceContinent, sourceContinents, true);
			this._populateContinentsSelectBox(this.sbDestinationContinent, destContinents, false);
			
			return rowData;
		}, 
		translateState: function(state) {
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");
				case 5:
					return this.tr("tnf:on siege");
			}
			return "??? " + state;			
		}, 
		translateRecurringType: function(recurringType) {
			switch (recurringType) {
				case 0:
					return this.tr("tnf:once");
				case 1:
					return this.tr("tnf:dungeon completed");
				case 2:
					return this.tr("tnf:latest return time");
			}
			return "??? " + recurringType;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbOrderStates = this._createOrderStatesSelectBox();
			this.sbOrderStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderStates);
			
			this.sbSourceContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbSourceContinent.setToolTipText(tr("sbSourceContinent_toolTip"));
			//this.sbSourceContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbSourceContinent);

			this.sbDestinationContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbDestinationContinent.setToolTipText(tr("sbDestinationContinent_toolTip"));
			//this.sbDestinationContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDestinationContinent);			
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setToolTipText(tr("btnUpdateView_toolTip"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);
			
			this.cbShowFakeAttacks = new qx.ui.form.CheckBox(tr("cbShowFakeAttacks"));
			this.cbShowFakeAttacks.setToolTipText(tr("cbShowFakeAttacks_toolTip"));
			this.cbShowFakeAttacks.setValue(true);
			toolBar.add(this.cbShowFakeAttacks);
			this.cbShowFakeAttacks.addListener("execute", function(event) {
				this.updateView();
			}, this);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
			
			return toolBar;
		}, 
		_createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order type</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [1, 2, 3, 4, 5, 8, 9, 10, -2];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(bos.Utils.translateOrderType(t), null, t));
			}					

			return sb;		
		}, 
		_createOrderStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filter by: <b>order state</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [0, 1, 2, 4, 5];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(this.translateState(t), null, t));
			}

			return sb;				
		},
		_populateContinentsSelectBox: function(sb, continents, isSource) {

			var list = [];
			for (var key in continents) {
				if (key.substring != undefined && qx.lang.Type.isString(key)) {
					var cont = parseInt(key.substring(1), 10);
					if (!isNaN(cont)) {
						list.push(cont);
					}
				}
			}
			list.sort();
			
			var newValues = list.join(",");
			
			if (isSource) {				
				if (newValues == this._sbSourceContinentAsList) {
					return;
				}
				this._sbSourceContinentAsList = newValues;
			} else {
				if (newValues == this._sbDestinationContinentAsList) {
					return;
				}
				this._sbDestinationContinentAsList = newValues;			
			}
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},
		startRefreshingFromServer: function() {
			receivedFirstCOMO = false;
			webfrontend.net.UpdateManager.getInstance().addConsumer("COMO", this);			
		},
		getRequestDetails: function(dt) {
			if (!this.receivedFirstCOMO) {				
				return "a";
			} else {
				return "";
			}
		}, 
		dispatchResults: function(r) {
			if (r == null || r.length == 0) return;
			
			this.receivedFirstCOMO = true;			
			try {
				var server = bos.Server.getInstance();
				for (var i = 0; i < r.length; i++) {
					var item = r[i];		
					server.addCOMOItem(item);
				}
			} catch (e) {
				bos.Utils.handleError(e);
			}
			if (this.isSeeable()) {
				//console.log("UnitOrders view is displayed -> updating");
				this.updateView();
			} else {
				//console.log("UnitOrders view is hidden, nothing to update");
			}
		}
	}
});

qx.Class.define("bos.gui.RegionPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Region");
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if(locale == "de") {
			columnNames = [ "Type", "Name", "Pos", "Punkte", "Besitzer", "Spieler Id", "Allianz", "Allianz Id", "Entfernung" ];
		} else {
			columnNames = [ "City type", "Name", "Pos", "Points", "Owner", "Player Id", "Alliance", "Alliance Id", "Distance"];
		}

		var columnIds = ["id", "name", "position", "points", "owner", "playerId", "allianceName", "allianceId", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(4, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		//columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 180);
		columnModel.setColumnVisible(5, false);
		columnModel.setColumnWidth(6, 140);
		columnModel.setColumnVisible(7, false);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(6, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
			
	}, 
	members: {
		createRowData: function() {
			var rowData = [];
			if (a.visMain.getMapMode() == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof webfrontend.vis.WorldCity) {
						if (entity.progress < 0) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = this.translateCityType(entity.id) + " (" + entity.id + ")";

						row["name"] = entity.getCityName();
						row["position"] = entity.getCoordinates();
						row["points"] = entity.getCityPoints();
						row["playerId"] = entity.getPlayerId();
						row["owner"] = entity.getPlayerName() + " (" + entity.getPlayerPoints() + ")";
						if (row["owner"] != " (0)") {
							row["owner"] = row["owner"];
						}
						row["allianceName"] = entity.getAllianceName();
						row["allianceId"] = entity.getAllianceId();

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
						rowData.push(row);
					}
				}		
			}
			return rowData;
		}, 
		processRegionItem: function(city, entity) {
			if (entity instanceof ClientLib.Vis.Region.RegionCity) {
				if (entity.get_PalaceLevel() == 0) {
					return null;
				}
			
				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				//row["id"] = this.translateCityType(entity.id) + " (" + entity.id + ")";

				var xPos = entity.get_Coordinates() & 0xFFFF;
				var yPos = entity.get_Coordinates() >> 16;
				
				row["name"] = entity.get_Name();
				row["position"] = bos.Utils.convertIdToCoodrinates(entity.get_Coordinates());
				row["points"] = entity.get_Points();
				row["playerId"] = entity.get_PlayerId();
				row["owner"] = entity.get_PlayerName() + " (" + entity.get_PlayerPoints() + ")";
				if (row["owner"] != " (0)") {
					row["owner"] = row["owner"];
				}
				row["allianceName"] = entity.get_AllianceName();
				row["allianceId"] = entity.get_AllianceId();

				var diffX = Math.abs(city.xPos - xPos);
				var diffY = Math.abs(city.yPos - yPos);
				row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
				
				return row;
			} else {
				return null;
			}
		},
		calculateCityType: function(cityType) {
			if (cityType >= 0 && cityType <= 7) {
				return bos.Const.REGION_CITY;
			}
			if (cityType >= 8 && cityType <= 15) {
				return bos.Const.REGION_CASTLE;
			}
			if (cityType >= 16 && cityType <= 23) {
				return bos.Const.REGION_LAWLESS_CITY;
			}
			if (cityType >= 24 && cityType <= 34) {
				return bos.Const.REGION_LAWLESS_CASTLE;
			}
			if (cityType >= 40 && cityType <= 40) {
				return bos.Const.REGION_RUINS;
			}
			return bos.Const.REGION_UNKNOWN;
		}, 
		translateCityType: function(cityType) {
			var ct = this.calculateCityType(cityType);
			switch (ct) {						
			case bos.Const.REGION_CITY:
				return this.tr("tnf:city");
			case bos.Const.REGION_CASTLE:
				return "Castle";			
			case bos.Const.REGION_LAWLESS_CITY:
				return this.tr("tnf:lawless city");			
			case bos.Const.REGION_LAWLESS_CASTLE:
				return "Lawless Castle";
			case bos.Const.REGION_RUINS:
				return "Ruins";			
			default:
				return "???";
			}
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 4:
				if (rowData["playerId"]) {
						var app = qx.core.Init.getApplication();
						app.showInfoPage(app.getPlayerInfoPage(), {
							id: rowData["playerId"]
						});
				}
			break;
			case 6:
				if (rowData["allianceId"]) {
					bos.Utils.showAllianceInfo({
						id: rowData["allianceId"]
					});
				}
				break;
			}

		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
					
			var btnCsvExport = new qx.ui.form.Button(locale == "de" ? "Export csv" : "Export csv");
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);	

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.DungeonsPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Dungeons");
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if( locale == "de") {
			columnNames = [ "Id", "Name", "Pos", "Level", "Fortschritt", "Entfernung" ];
		} else {
			columnNames = [ "Id", "Name", "Pos", "Level", "Progress", "Distance" ];
		}

		var columnIds = ["id", "name", "position", "level", "progress", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(5, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
	
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});		
			
	}, 
	members: {
		sbDungeonTypes: null,
		sbBossTypes: null,
		createRowData: function() {
			var rowData = [];

			if (a.visMain.getMapMode() == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof ClientLib.Vis.Region.RegionDungeon) {
						if (!this._shouldBeIncluded(entity)) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = entity.id;
						var dungeonType = Math.abs(entity.id);
						row["name"] = res.dungeons[dungeonType].dn + " (" + entity.get_Level() + ")";
						row["position"] = entity.get_Coordinates();
						row["level"] = entity.get_Level();
						row["progress"] = entity.get_Progress();

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);;
						rowData.push(row);
					}
				}
			}
			return rowData;

		}, 
		_shouldBeIncluded: function(dungeon) {
			if (dungeon.get_Progress() < 0) {
				return false;
			}
		
			var sel = this.sbDungeonTypes.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var dungeonType = Math.abs(dungeon.id);
			var reqType = sel[0].getModel();
			if (reqType != "A") {

				switch (reqType) {
				case "M":
					if (dungeonType != 4 && dungeonType != 8) {
						return false;
					}					
					break;								
				case "F":
					if (dungeonType != 5 && dungeonType != 6) {
						return false;
					}					
					break;				
				case "H":
					if (dungeonType != 3 && dungeonType != 7) {
						return false;
					}					
					break;				
				case "S":
					if (dungeonType != 2 && dungeonType != 12) {
						return false;
					}					
					break;	
				}
			}
			
			var bossType = this.sbBossTypes.getSelection()[0].getModel();
			if (bossType != "A") {
				if (bossType == "B") {
					if (dungeonType <= 5) {
						return false;
					}
				} else if (bossType == "D") {
					if (dungeonType > 5) {
						return false;
					}					
				}
			}			

			return true;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());									
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbDungeonTypes = this._createDungeonTypesSelectBox();
			this.sbDungeonTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbDungeonTypes);

			this.sbBossTypes = this._createBossTypesSelectBox();
			this.sbBossTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbBossTypes);			

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}, 
		_createDungeonTypesSelectBox: function() {
			var dungeonTypes = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			dungeonTypes.setToolTipText("Filter by: <b>dungeon type</b>");									
			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("All"), null, "A"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Mountain"), null, "M"));			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Forest"), null, "F"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Hill"), null, "H"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Sea"), null, "S"));

			return dungeonTypes;			
		}, 
		_createBossTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			sb.setToolTipText("Filter by: <b>boss type</b>");									
			
			sb.add(new qx.ui.form.ListItem(tr("All"), null, "A"));
			sb.add(new qx.ui.form.ListItem(tr("Boss"), null, "B"));			
			sb.add(new qx.ui.form.ListItem(tr("Dungeon"), null, "D"));	

			return sb;
		}
	}
});

qx.Class.define("bos.gui.CastlesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("castles"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames;
		if( locale == "de") {
			columnNames = [ "Id", "Name", "Pos", "Nahrung", "Nahrung: Lagerkapazität", "Keine Nahrung mehr am", "Einheiten", "Rekutierungsliste", "Orders", "TS der Einheiten die z.Z. verfügbar sind", "Holz: Lagerkapazität", "Eisen: Lagerkapazität", "Verteidiger (Doppelklicken zum Auswählen)"];
		} else {
			columnNames = [ "Id", "Name", "Pos", "Food", "Food: storage capacity", "Food empty in", "Units", "Units queue", "Orders", "Not raiding", "Wood: storage capacity", "Iron: storage capacity", "Defenders (dbl click to select)"];
		}
		var columnIds = ["id", "name", "position", "foodLevel", "foodFree", "foodEmptyAt", "unitsLevel", "unitQueue", "activeOrders", "unitsAtHome", "woodFree", "ironFree", "summary_defenders"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(5, true);
		this._tableModel.setColumnEditable(12, true);

		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		this.table = new bos.ui.table.Table(this._tableModel, custom);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		var foodRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		foodRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
		foodRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
		foodRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
		foodRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(3, foodRenderer);

		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(true));
		columnModel.setDataCellRenderer(7, new bos.ui.table.cellrenderer.HumanTime());
		
		var unitsRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		unitsRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
		unitsRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
		unitsRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
		unitsRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(6, unitsRenderer);

		var tcm = this.table.getTableColumnModel();
		var resizeBehavior = tcm.getBehavior();
		resizeBehavior.setWidth(1, 100);
		resizeBehavior.setWidth(2, 64);
		resizeBehavior.setWidth(3, 50);
		resizeBehavior.setWidth(4, 120);
		resizeBehavior.setWidth(5, 100);
		resizeBehavior.setWidth(6, 50);
		resizeBehavior.setWidth(7, 100);
		resizeBehavior.setWidth(8, 50);
		resizeBehavior.setWidth(9, 80);
		resizeBehavior.setWidth(10, 90);
		resizeBehavior.setWidth(11, 90);
		resizeBehavior.setWidth(12, "1*");
		resizeBehavior.setMinWidth(12, 100);	
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		fillRequests: new Array(),
		createRowData: function() {
			var rowData = [];

			var castles = bos.CityTypes.getInstance().getCastles();

			var cities = webfrontend.data.Player.getInstance().cities;
			var server = bos.Server.getInstance();
			
			for (var key in castles) {
				var cityId = parseInt(castles[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
			
				var city = server.cities[cityId];
				if (city != undefined) {
					
					var wood = parseInt(city.getResourceCount(bos.Const.WOOD));
					var iron = parseInt(city.getResourceCount(bos.Const.IRON));
					var food = parseInt(city.getResourceCount(bos.Const.FOOD));

					var maxFood = city.getResourceMaxStorage(bos.Const.FOOD);

					row["woodFree"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD)) - wood;
					row["ironFree"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON)) - iron;
					row["foodFree"] = maxFood - food;
					
					if (maxFood > 0) {
						row["foodLevel"] = parseInt(100 * food / maxFood);
						row["foodLevel"] = row["foodLevel"];
					}

					if (city.getUnitLimit() > 0) {
						var totalUnits = city.getUnitCount() + city.getUnitsInQueue();
						row["unitsLevel"] = parseInt(100 * totalUnits / city.getUnitLimit());
						row["unitsLevel"] = row["unitsLevel"];
					}

					var foodBallance = city.getFoodBalance();
					if (foodBallance >= 0) {
						row["foodEmptyAt"] = "food positive";
					} else {
						var totalConsumption = city.getFoodConsumption() + city.getFoodConsumptionSupporter() + city.getFoodConsumptionQueue();
						var emptyAt = city.getResourceStorageEmptyTime(bos.Const.FOOD, totalConsumption);
						var timeDiff = emptyAt - new Date();
						row["foodEmptyAt"] = parseInt(timeDiff / 1000);
					}

					row["unitQueue"] = city.unitQueueOcuppied();
					row["activeOrders"] = city.getUnitOrders() != null ? city.getUnitOrders().length : 0;
					
					var sum = [];
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}
				
				if (getSummaryWidget()._populateResources(row, cityId)) {
					if (row["foodMax"] > 0) {
						row["foodLevel"] = parseInt(100 * row["food"] / row["foodMax"]);
						row["foodLevel"] = row["foodLevel"];														
					}												
				}												

				rowData.push(row);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			return true;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var x = parseInt(city["xPos"], 10);
					var y = parseInt(city["yPos"], 10);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			var fillMenu = new qx.ui.menu.Menu();
			
			var fillWithWood = new qx.ui.menu.Button(tr("wood"), null);
			fillWithWood.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.WOOD);		
			}, this);
			fillMenu.add(fillWithWood);
			
			var fillWithStone = new qx.ui.menu.Button(tr("stone"), null);
			fillWithStone.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.STONE);		
			}, this);
			fillMenu.add(fillWithStone);

			var fillWithIron = new qx.ui.menu.Button(tr("iron"), null);
			fillWithIron.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.IRON);		
			}, this);
			fillMenu.add(fillWithIron);	

			var fillWithFood = new qx.ui.menu.Button(tr("food"), null);
			fillWithFood.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.FOOD);		
			}, this);
			fillMenu.add(fillWithFood);

			var btnFillWith = new qx.ui.form.MenuButton(tr("fill with"), null, fillMenu);
			toolBar.add(btnFillWith);			
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.CitiesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("cities"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
				
		var columnIds = ["id", "name", "position", "reference", "wood", "wood/h", "woodMax", "woodFree", "woodIncoming", "woodFullAt", "stone", "stone/h", "stoneMax", "stoneFree", "stoneIncoming", "stoneFullAt", "iron", "iron/h", "ironMax", "ironFree", "ironIncoming", "ironFullAt", "food", "food/h", "foodMax", "foodFree", "foodIncoming", "foodFullAt", "gold/h", "buildQueue", "unitQueue", "carts", "ships", "lastUpdated"];

		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);		
		
		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);
		columnModel.setColumnWidth(3, 160);

		//hide all "*/h", "*Max", "*Free", "*Incoming", "*FullAt" columns
		var columnsPerRes = 6;
		var columnsBeforeWood = 4;
		for (var res = 1; res <= 4; res++) {
			var col = columnsBeforeWood + (res - 1) * columnsPerRes;
			col++; //skip resource count column
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
            columnModel.setDataCellRenderer(col, new bos.ui.table.cellrenderer.FullAt());
			columnModel.setColumnVisible(col++, false);            
		}					
		
		//gold/h
		var goldColumn = columnsBeforeWood + 4 * columnsPerRes;
		columnModel.setColumnVisible(goldColumn, false);

		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setDataCellRenderer(goldColumn + 1, new bos.ui.table.cellrenderer.HumanTime());
		columnModel.setDataCellRenderer(goldColumn + 2, new bos.ui.table.cellrenderer.HumanTime());
		columnModel.setDataCellRenderer(goldColumn + 5, new bos.ui.table.cellrenderer.HumanTime(2));
		
		var resTypes = ["gold", "wood", "stone", "iron", "food"];
		for (var res = 1; res <= 4; res++) {
			var col = columnsBeforeWood + (res - 1) * columnsPerRes;
			var resType = resTypes[res];
			var resRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", resType + "Max", resType + "Free");
			columnModel.setDataCellRenderer(col, resRenderer);
		}

		var foodPerHourRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		foodPerHourRenderer.addNumericCondition("<", 0, null, bos.Const.RESOURCE_RED, null, null);
		foodPerHourRenderer.addNumericCondition(">=", 0, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(columnsBeforeWood + (4 - 1) * columnsPerRes + 1, foodPerHourRenderer);					
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		sbCityType: null,
		sbContinents: null,
		createRowData: function() {

			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var unknownValue = "";

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			
			var resTypes = ["wood", "stone", "iron", "food"];
			for (var i = 0; i < resTypes.length; i++) {
				var res = resTypes[i];
				sum[res] = 0;
				sum[res + "/h"] = 0;
				sum[res + "Max"] = 0;
				sum[res + "Free"] = 0;
				sum[res + "Incoming"] = 0;
			}

			sum["ts"] = 0;
			sum["gold/h"] = 0;
			sum["summary_defenders_ts"] = 0;
			
			var totalCarts = 0;
			var availableCarts = 0;
			var totalShips = 0;
			var availableShips = 0;
			
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();

			var summary = getSummaryWidget();
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (!bos.Utils.shouldCityBeIncluded(c, selectedCityType, selectedContinent)) {
					continue;
				}			

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = key;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["lastUpdated"] = "";

				row["reference"] = c.reference;

				if (server.cities[key] == undefined) {

					var resCity = server.cityResources["c" + key];
					if (resCity != null) {
						this._updateRowFromResCity(resCity, row);
					}
				} else {
					var city = server.cities[key];

					row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
					row["wood/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.WOOD));
					row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
					row["woodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.WOOD));
					row["woodFullAt"] = city.getResourceStorageFullTime(bos.Const.WOOD);
					row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
					row["stone/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.STONE));
					row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
					row["stoneIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.STONE));
					row["stoneFullAt"] = city.getResourceStorageFullTime(bos.Const.STONE);
					row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
					row["iron/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.IRON));
					row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
					row["ironIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.IRON));
					row["ironFullAt"] = city.getResourceStorageFullTime(bos.Const.IRON);
					row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));
					row["food/h"] = parseInt(city.getFoodBalance());
					row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
					row["foodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.FOOD));
					row["foodFullAt"] = city.getResourceStorageFullTime(bos.Const.FOOD);
                    
                    row["gold/h"] = city.getGoldGrowPerHour();

					row["woodFree"] = row["woodMax"] - row["wood"];
					row["stoneFree"] = row["stoneMax"] - row["stone"];
					row["ironFree"] = row["ironMax"] - row["iron"];
					row["foodFree"] = row["foodMax"] - row["food"];

					row["buildQueue"] = city.buildQueueOcuppied();
					row["unitQueue"] = city.unitQueueOcuppied();

					row["lastUpdated"] = city.getLastUpdated();

					var dg = city.getTraders();
					if (dg != null) {
						row["carts"] = dg[bos.Const.TRADE_TRANSPORT_CART].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_CART].total;
						row["ships"] = dg[bos.Const.TRADE_TRANSPORT_SHIP].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_SHIP].total;

						totalCarts += dg[bos.Const.TRADE_TRANSPORT_CART].total;
						availableCarts += dg[bos.Const.TRADE_TRANSPORT_CART].count;
						totalShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].total;
						availableShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].count;
					} else {
						row["carts"] = "0/0";
						row["ships"] = "0/0";
					}

				}
				
				summary._populateResources(row, key);
				
				for (var i = 0; i < resTypes.length; i++) {
					var t = resTypes[i];
					
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "/h";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "Max";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "Free";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];

					t = resTypes[i] + "Incoming";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
				}
				
				if (qx.lang.Type.isNumber(row["gold/h"])) {
					sum["gold/h"] += row["gold/h"];
				}
				
				rowData.push(row);
			}

			sum["carts"] = availableCarts + "/" + totalCarts;
			sum["ships"] = availableShips + "/" + totalShips;

			rowData.push(sum);

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}			
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {

					var x = parseInt(city["xPos"], 10);
					var y = parseInt(city["yPos"], 10);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;
			}
		},
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);					
			this.sbCityType.addListener("changeSelection", this.updateView, this);						
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
			this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
			this.btnRefreshResources.setWidth(120);
			if (locale == "de") {
				this.btnRefreshResources.setWidth(150);
			}
			
			var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
			btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
			btnRefreshView.setWidth(120);
			btnRefreshView.addListener("execute", this.updateView, this);					
			
			var ministerTradePresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (!ministerTradePresent) {
				toolBar.add(this.btnRefreshResources);
				toolBar.add(btnRefreshView);
			}
			this.btnRefreshResources.addListener("execute", function(evt) {				
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				summary.fetchResources();
			}, this);
						
			var btnFetchCities = new qx.ui.form.Button(tr("btnFetchCities"));
			btnFetchCities.setToolTipText(tr("btnFetchCities_toolTip"));
			btnFetchCities.setWidth(100);
			btnFetchCities.addListener("execute", this.fetchCities, this);
			toolBar.add(btnFetchCities);
			
			var fillMenu = new qx.ui.menu.Menu();
			
			var fillWithWood = new qx.ui.menu.Button(tr("wood"), null);
			fillWithWood.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.WOOD);		
			}, this);
			fillMenu.add(fillWithWood);
			
			var fillWithStone = new qx.ui.menu.Button(tr("stone"), null);
			fillWithStone.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.STONE);		
			}, this);
			fillMenu.add(fillWithStone);

			var fillWithIron = new qx.ui.menu.Button(tr("iron"), null);
			fillWithIron.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.IRON);		
			}, this);
			fillMenu.add(fillWithIron);	

			var fillWithFood = new qx.ui.menu.Button(tr("food"), null);
			fillWithFood.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.FOOD);		
			}, this);
			fillMenu.add(fillWithFood);

			var btnFillWith = new qx.ui.form.MenuButton(tr("fill with"), null, fillMenu);
			toolBar.add(btnFillWith);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));
			btnCsvExport.setToolTipText(tr("btnCsvExport_toolTip"));
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);

			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				if (locale == "de"){
					dialog.showGenericNotice("Summary Hilfe", "Die Städte werden nach speziellen Zeichen in den Referenzen sortiert.Diese Zeichen werden durch *Zeichen* makiert und können an einer beliebigen Stelle in der Referenz stehen. Als Beispiel: 'Kont 23_3 *CM*'würde eine Burg darstellen, welche auch Mondsteine herstellen kann.", "C - Burg (Castle), M - Mondstein, W - Lager(Warehouse), B - In Bau/Aufbau, D - Defensive, G - Gold", "webfrontend/ui/bgr_popup_survey.gif");
				}
				else {
					dialog.showGenericNotice("Summary Help", "Cities are categorized according to special pattern in city reference. Pattern is *OPTIONS* and could be placed anywhere. For example '*CM* some more info' means castle which could produce moonstones", "C - Castle, M - Moonstones, W - Warehouse, B - Building, D - Defensive, G - Gold", "webfrontend/ui/bgr_popup_survey.gif");
				}

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);

			return toolBar;
		},
		_createCitiesIds: function() {
			var rows = this.createRowData();
			
			var citiesIds = [];
			
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var cityId = row["id"];
				if (cityId != "Total") {
					citiesIds.push(cityId);
				}
			}
			return citiesIds;
		},
		fetchCities: function() {				
			var citiesIds = this._createCitiesIds();
			var server = bos.Server.getInstance();
			server.pollCities(citiesIds);
		}		
	}
});

qx.Class.define("bos.gui.OptionsPage", {
	extend: qx.ui.tabview.Page,
	construct: function() {
		qx.ui.tabview.Page.call(this);
		this.setLabel(tr("options"));
		this.setLayout(new qx.ui.layout.Dock());
						
		var scrollable = new qx.ui.container.Scroll();						
		this.add(scrollable);
		
		var scroll = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
		scrollable.add(scroll);
		
		var container;

		container = new qx.ui.groupbox.GroupBox(tr("table settings"));
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		
		var storage = bos.Storage.getInstance();

		this.cbLoadTableSettingsAtStart = new qx.ui.form.CheckBox(tr("load table settings at start"));
		this.cbLoadTableSettingsAtStart.setValue(bos.Storage.getInstance().getLoadTableSettingsAtStart());
		this.cbLoadTableSettingsAtStart.addListener("execute", function(event) {
			storage.setLoadTableSettingsAtStart(this.cbLoadTableSettingsAtStart.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbLoadTableSettingsAtStart);

		this.sbTableName = new qx.ui.form.SelectBox().set({
			width: 120,
			height: 28
		});
		this.sbTableName.setToolTipText(tr("table name"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("cities"), null, "cities"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("Military"), null, "military"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("purify resources"), null, "moonstones"));
		container.add(this.sbTableName);

		var btnLoadTableSettings = new qx.ui.form.Button(tr("btnLoadTableSettings"));
		btnLoadTableSettings.setToolTipText(tr("btnLoadTableSettings_toolTip"));
		btnLoadTableSettings.setWidth(140);
		container.add(btnLoadTableSettings);
		btnLoadTableSettings.addListener("execute", function(evt) {
			var tableName = this.sbTableName.getSelection()[0].getModel();
			var storage = bos.Storage.getInstance();
			var tbl = null;
			var settings = null;
			var summary = getSummaryWidget();
			switch (tableName) {
				case "cities":
					tbl = summary.citiesTab.table;
					settings = storage.getCitiesTableSettings();
					break;
				case "military":
					tbl = summary.militaryTab.table;
					settings = storage.getMilitaryTableSettings();
					break;
				case "moonstones":
					tbl = summary.moonstonesTable;
					settings = storage.getMoonstonesTableSettings();
					break;
			}
			if (tbl != null && settings != null) {
				tbl.applyTableSettings(settings, tableName);
				storage.saveOptions();
			}

		}, this);

		var btnSaveTableSettings = new qx.ui.form.Button(tr("btnSaveTableSettings"));
		btnSaveTableSettings.setToolTipText(tr("btnSaveTableSettings_toolTip"));
		btnSaveTableSettings.setWidth(140);
		container.add(btnSaveTableSettings);
		btnSaveTableSettings.addListener("execute", function(evt) {
			var tableName = this.sbTableName.getSelection()[0].getModel();
			var tbl = null;
			var summary = getSummaryWidget();
			switch (tableName) {
				case "cities":
					tbl = summary.citiesTab.table;
					break;
				case "military":
					tbl = summary.militaryTab.table;
					break;
				case "moonstones":
					tbl = summary.moonstonesTable;
					break;
			}
			if (tbl != null) {
				tbl.saveTableSettings(tableName);
				storage.saveOptions();
			}
		}, this);

		container = new qx.ui.groupbox.GroupBox(tr("saving cities data"));
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);

		this.cbPersistCities = new qx.ui.form.CheckBox(tr("cbPersistCities"));
		this.cbPersistCities.setToolTipText(tr("cbPersistCities_toolTip"));
		this.cbPersistCities.setValue(storage.getPersistingCitiesEnabled());
		this.cbPersistCities.addListener("execute", function(event) {
			bos.Storage.getInstance().setPersistingCitiesEnabled(this.cbPersistCities.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbPersistCities);

		this.cbLoadPersistedCitiesAtStart = new qx.ui.form.CheckBox(tr("cbLoadPersistedCitiesAtStart"));
		this.cbLoadPersistedCitiesAtStart.setValue(storage.getLoadPersistedCitiesAtStart());
		this.cbLoadPersistedCitiesAtStart.addListener("execute", function(event) {
			storage.setLoadPersistedCitiesAtStart(this.cbLoadPersistedCitiesAtStart.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbLoadPersistedCitiesAtStart);

		var btnLoadCities = new qx.ui.form.Button(tr("btnLoadCities"));
		btnLoadCities.setToolTipText("btnLoadCities_toolTip");
		btnLoadCities.setWidth(220);
		btnLoadCities.addListener("execute", this.loadPersistedCities, this);
		container.add(btnLoadCities);

		var btnDeleteAllSavedData = new qx.ui.form.Button(tr("btnDeleteAllSavedData"));
		btnDeleteAllSavedData.addListener("execute", function(event) {
			storage.getInstance().deleteAllSavedData();			
			bos.Utils.handleInfo(tr("btnDeleteAllSavedData_confirmation"));
		}, this);
		container.add(btnDeleteAllSavedData);
		
		var btnSaveAllCities = new qx.ui.form.Button(tr("btnSaveAllCities"));
		btnSaveAllCities.addListener("execute", function(event) {
			var server = bos.Server.getInstance();
			server.persistAllPendingCities();						
		}, this);
		container.add(btnSaveAllCities);

		var btnPersistHelp = new qx.ui.form.Button(tr("help"));
		btnPersistHelp.addListener("execute", function(event) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			dialog.showGenericNotice(tr("help"), tr("persistHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");								
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
		}, this);
		btnPersistHelp.setWidth(60);
		container.add(btnPersistHelp);
		
		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		this.sbCustomCityTypes = new qx.ui.form.SelectBox().set({
			width: 120,
			height: 28
		});
		this.sbCustomCityTypes.setToolTipText(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
		container.add(this.sbCustomCityTypes);
		this._populateCustomCityTypes();
		
		var btnAddCustomCityType = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" :"Add");
		btnAddCustomCityType.addListener("execute", this._addCustomCityType, this);
		container.add(btnAddCustomCityType);
		
		var btnRemoveCustomCityType = new qx.ui.form.Button(locale == "de" ? "Löschen" :"Remove");
		btnRemoveCustomCityType.addListener("execute", this._removeCustomCityType, this);
		container.add(btnRemoveCustomCityType);
		
		container = new qx.ui.groupbox.GroupBox(tr("city types to city groups copier"));
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
		bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, false, true);
		bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, false, true);
		}, this);
		container.add(this.sbCityType);
		this.sbCityGroup = bos.Utils.createCitiesGroupsSelectBox();
		bos.Utils.populateCitiesGroupsSelectBox(this.sbCityGroup);		
		webfrontend.data.Player.getInstance().addListener("changedCityGroups", function(event) {
			bos.Utils.populateCitiesGroupsSelectBox(this.sbCityGroup);
		}, this);				
		container.add(this.sbCityGroup);
		var btnCopyCityType2Group = new qx.ui.form.Button(tr("btnCopyCityType2Group"));
		btnCopyCityType2Group.setToolTipText(tr("btnCopyCityType2Group_toolTip"));
		btnCopyCityType2Group.addListener("execute", this._copyCityType2Group, this);
		container.add(btnCopyCityType2Group);		
		
		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Chat" : "Chat");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		
		this.cbTweakChatAtStart = new qx.ui.form.CheckBox(locale == "de" ? "Tweak chat at start" : "Tweak chat at start");
		this.cbTweakChatAtStart.setToolTipText("When option is checked chat is tweaked at start");
		this.cbTweakChatAtStart.setValue(bos.Storage.getInstance().getTweakChatAtStart());
		this.cbTweakChatAtStart.addListener("execute", function(event) {
			storage.setTweakChatAtStart(this.cbTweakChatAtStart.getValue());
			storage.saveOptions();
		}, this);					
		container.add(this.cbTweakChatAtStart);					

		var btnTweakChat = new qx.ui.form.Button("Tweak chat");
		btnTweakChat.addListener("execute", function(event) {						
			bos.Tweaks.getInstance().tweakChat();
			btnTweakChat.hide();
		}, this);
		container.add(btnTweakChat);					

		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Sonstiges" : "Other");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		/*
		this.cbTweakReportAtStart = new qx.ui.form.CheckBox(tr("cbTweakReportAtStart"));
		this.cbTweakReportAtStart.setToolTipText(tr("cbTweakReportAtStart_toolTip"));
		this.cbTweakReportAtStart.setValue(bos.Storage.getInstance().getTweakReportAtStart());
		this.cbTweakReportAtStart.addListener("execute", function(event) {
			storage.setTweakReportAtStart(this.cbTweakReportAtStart.getValue());
			storage.saveOptions();
		}, this);					
		container.add(this.cbTweakReportAtStart);
		
		var btnTweakReports = new qx.ui.form.Button("Tweak reports");
		btnTweakReports.setToolTipText("Tweaks reports, it may not work when EA will publish next patch. That's the reason why it's not automatic like in previous versions");
		btnTweakReports.addListener("execute", function(event) {
			bos.Tweaks.getInstance().tweakReports();
		}, this);
		container.add(btnTweakReports);										
		*/
		var btnSaveSummaryPosition = new qx.ui.form.Button(tr("save summary position"));
		btnSaveSummaryPosition.addListener("execute", function(event) {
			var storage = bos.Storage.getInstance();
			var summary = getSummaryWidget();
			var props = summary.getLayoutProperties();
			var pos = {
				left: props.left,
				top: props.top,
				width: summary.getWidth(),
				height: summary.getHeight()
			};
			storage.setSummaryPosition(pos);
			storage.saveOptions();
		}, this);
		container.add(btnSaveSummaryPosition);	
	}, 
	members: {
		sbCustomCityTypes: null,			
		cbTweakChatAtStart: null,				
		cbTweakReportAtStart: null,
		sbCityType: null,
		sbContinents: null,
		sbTableName: null,
		cbPersistCities: null,
		cbLoadPersistedCitiesAtStart: null,
		btnRefreshResources: null,
		cbLoadTableSettingsAtStart: null,
		sbCityGroup: null,
		_progressDialog: null,
		_disposeProgressDialog: function() {
			if (this._progressDialog != null) {
				this._progressDialog.disable();
				this._progressDialog.destroy();
				this._progressDialog = null;
			}
		},
		_copyCityType2Group: function() {
			if (this.sbCityType.getSelection() == null || this.sbCityGroup.getSelection() == null) {
				alert(tr("please select both city type and city group"));
				return;
			}
			var cityType = this.sbCityType.getSelection()[0].getModel();
			var cityGroup = this.sbCityGroup.getSelection()[0].getModel();
			cityGroup = parseInt(cityGroup.substring(2));
			
			var player = webfrontend.data.Player.getInstance();
			var cities = player.cities;
			for (var key in cities) {
				var c = cities[key];

				if (!bos.Utils.shouldCityBeIncluded(c, cityType, "A")) {
					continue;
				}
				
				var groups = player.getCitysGroups(key);
				var alreadyMemberOfGroup = false;
				for (var i = 0, iCount = groups.length; i < iCount; i++) {
					if (groups[i] == cityGroup) {
						alreadyMemberOfGroup = true;
						break;
					}
				}
				
				if (!alreadyMemberOfGroup) {
					groups.push(cityGroup);					
					var req = {
						_idCityCoord: key,
						_arrNewGroups: groups
					};
					bos.net.CommandManager.getInstance().sendCommand("SetCitysGroups", req, this, this._processSetCitysGroups);					
				}
			}
			
			var count = bos.net.CommandManager.getInstance().getNumberOfPendingCommands();
			if (count > 5) {
				this._progressDialog = new webfrontend.gui.ConfirmationWidget();
				this._progressDialog.showInProgressBox(tr("cities to be filled: ") + count);
				qx.core.Init.getApplication().getDesktop().add(this._progressDialog, {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				});
				this._progressDialog.show();			
			}
		},
		_processSetCitysGroups: function(isOk, result) {
			var count = bos.net.CommandManager.getInstance().getNumberOfPendingCommands();
			if (count == 0) {
				this._disposeProgressDialog();
			} else if (this._progressDialog != null) {
				this._progressDialog.showInProgressBox(tr("cities to be filled: ") + count);
			}
		},
		_addCustomCityType: function() {
			var letter = prompt(locale=="de"? "Bitte geb einen Buchstaben ein" : "Please enter one letter");
			if (letter == null || letter.length != 1) {
				return;
			}
			if (bos.CityTypes.getInstance().isReservedLetter(letter)) {
				bos.Utils.handleWarning(locale=="de"? "Dieser Buchstabe ist schon in Benutzung" : "This letter is reserved");
				return;
			}
			
			var description = prompt(locale=="de"? "Bitte gebe eine Beschreibung ein" : "Please enter description");
			if (description == null || description.length == 0) {
				return;
			}
			
			var storage = bos.Storage.getInstance();
			storage.addCustomCityType(letter, description);
			storage.saveOptions();
			
			this._populateCustomCityTypes();			
		}, 
		_removeCustomCityType: function() {
			
			var sel = this.sbCustomCityTypes.getSelection();
			if (sel == null || sel.length == 0) {
				return;
			}
			var letter = sel[0].getModel();
			
			var storage = bos.Storage.getInstance();
			storage.removeCustomCityType(letter);
			storage.saveOptions();
			
			this._populateCustomCityTypes();			
		}, 
		_populateCustomCityTypes: function() {
			var storage = bos.Storage.getInstance();
			var list = storage.getCustomCityTypes();
			this.sbCustomCityTypes.removeAll();
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				this.sbCustomCityTypes.add(new qx.ui.form.ListItem(item.letter + " - " + item.description, null, item.letter));
			}
		}		
	}
});

qx.Class.define("bos.gui.MilitaryPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("military"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames = [ tr("id"), tr("name"), tr("position"), tr("reference")];
		var columnIds = ["id", "name", "position", "reference"];
		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;
			var unitName = formatUnitType(i, 2);
			columnNames.push(unitName);
			columnIds.push("unit_" + i);
		}
		columnNames.push("TS");
		columnIds.push("ts");

		columnNames.push("Summary (dbl click to select)");
		columnIds.push("summary_military");

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);
		this._tableModel.setColumnEditable(23, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);

		var res = webfrontend.res.Main.getInstance();

		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;

			var col = i + 3;
			if (i == 19) {
				col--;
			}

			columnModel.setColumnWidth(col, 60);
		}

		columnModel.setColumnWidth(20, 50);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setColumnWidth(23, 400);					
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		sbCityType: null,
		sbContinents: null,
		createRowData: function() {
			var rowData = [];

			var cities = webfrontend.data.Player.getInstance().cities;

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			sum["ts"] = 0;
			sum["summary_defenders_ts"] = 0;			
			
			var server = bos.Server.getInstance();
			for (var cityId in cities) {
				var c = cities[cityId];

				if (!this._shouldBeIncluded(c)) {
					continue;
				}

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;
			
				var city = server.cities[cityId];
				if (city != undefined) {										
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}	

				rowData.push(row);
			}
			
			if (rowData.length > 0) {
				rowData.push(sum);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
					a.setMainView('r', 0, coords.xPos * a.visMain.getTileWidth(), coords.yPos * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			this.sbCityType.addListener("changeSelection", this.updateView, this);	
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);			
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.DefendersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("defenders"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames = [ tr("id"), tr("name"), tr("position"), tr("reference")];
		var columnIds = ["id", "name", "position", "reference"];
		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;
			var unitName = formatUnitType(i, 2);
			columnNames.push(unitName);
			columnIds.push("unit_def_" + i);
		}
		columnNames.push("TS");
		columnIds.push("summary_defenders_ts");

		columnNames.push("Summary (dbl click to select)");
		columnIds.push("summary_defenders");

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);
		this._tableModel.setColumnEditable(23, true);

		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		this.table = new bos.ui.table.Table(this._tableModel, custom);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);

		var res = webfrontend.res.Main.getInstance();

		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;

			var col = i + 3;
			if (i == 19) {
				col--;
			}

			columnModel.setColumnWidth(col, 60);
			columnModel.setColumnVisible(col, false);
		}

		columnModel.setColumnWidth(20, 60);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setColumnWidth(23, 400);

		var resizeBehavior = columnModel.getBehavior();
		resizeBehavior.setWidth(1, 100);
		resizeBehavior.setWidth(2, 60);
		resizeBehavior.setWidth(22, 60);
		resizeBehavior.setWidth(23, "1*");
		resizeBehavior.setMinWidth(23, 100);		
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		createRowData: function() {
			var rowData = [];

			var cities = webfrontend.data.Player.getInstance().cities;

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			sum["ts"] = 0;
			sum["summary_defenders_ts"] = 0;			
			
			var server = bos.Server.getInstance();
			for (var cityId in cities) {
				var c = cities[cityId];

				if (!this._shouldBeIncluded(c)) {
					continue;
				}
				var c = cities[cityId];

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;
			
				var city = server.cities[cityId];
				if (city != undefined) {										
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}	

				rowData.push(row);
			}
			
			if (rowData.length > 0) {
				rowData.push(sum);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
					a.setMainView('r', 0, coords.xPos * a.visMain.getTileWidth(), coords.yPos * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			this.sbCityType.addListener("changeSelection", this.updateView, this);
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);			
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});


qx.Class.define("bos.gui.ExtraSummaryWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,		
	construct: function() {
		qx.ui.window.Window.call(this);				
		this.setLayout(new qx.ui.layout.Dock());

		var maxWidth = qx.bom.Viewport.getWidth(window);
		var maxHeight = qx.bom.Viewport.getHeight(window);			
					
		pos = {
			left: 400,
			top: 150,
			width: 600,
			height: 500
		}		
		
		this.set({
			width: pos.width,
			minWidth: 200,
			maxWidth: parseInt(maxWidth * 0.9),
			height: pos.height,
			minHeight: 200,
			maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: tr("extra summary"),
			resizeSensitivity: 7,
			contentPadding: 0,
			zIndex: 100000 - 1
		});				

		this.moveTo(pos.left, pos.top);

		this.tabView = new qx.ui.tabview.TabView().set({
			contentPadding: 5
		});
		this.tabView.setAppearance("tabview");
					
		this.playerInfoTab = new bos.gui.PlayerInfoPage();
		this.tabView.add(this.playerInfoTab);
		
		this.allianceInfoTab = new bos.gui.AllianceInfoPage();
		this.tabView.add(this.allianceInfoTab);
		
		this.myAllianceTab = new bos.gui.MyAlliancePage();
		this.tabView.add(this.myAllianceTab);
		
		this.intelligenceTab = new bos.gui.IntelligencePage();
		this.tabView.add(this.intelligenceTab);
		
		this.tabView.addListener("changeSelection", this.onChangeTab, this);		
		this.add(this.tabView);

		webfrontend.gui.Util.formatWinClose(this);
					
	}, 
	members: {
		tabView: null,
		playerInfoTab: null,
		allianceInfoTab: null,
		myAllianceTab: null,
		intelligenceTab: null,
		onChangeTab: function() {
			this.updateView();
		},
		updateView: function() {
			if (this.tabView.isSelected(this.playerInfoTab)) {
				this.playerInfoTab.updateView();
			} else if (this.tabView.isSelected(this.allianceInfoTab)) {
				this.allianceInfoTab.updateView();
			} else if (this.tabView.isSelected(this.myAllianceTab)) {
				this.myAllianceTab.updateView();
			} else if (this.tabView.isSelected(this.intelligenceTab)) {
				this.intelligenceTab.updateView();
			}	
		},
		switchToIntelligenceTab: function() {
			this.tabView.setSelection([this.intelligenceTab]);
		}
	}
});

qx.Class.define("bos.gui.SummaryWidget", {
		type: "singleton",
		extend: qx.ui.window.Window,
		implement: [webfrontend.net.IUpdateConsumer],
		construct: function() {

			qx.ui.window.Window.call(this);				
			this.setLayout(new qx.ui.layout.Dock());

			var maxWidth = qx.bom.Viewport.getWidth(window);
			var maxHeight = qx.bom.Viewport.getHeight(window);			
			
			var pos = bos.Storage.getInstance().getSummaryPosition();
			if (pos == null) {
				pos = {
					left: 400,
					top: 150,
					width: Math.max(600, qx.bom.Viewport.getWidth(window) - 420),
					height: 500
				}
			} else {
				if (pos.left >= maxWidth) {
					pos.left = 0;
				}
				if (pos.top >= maxHeight) {
					pos.top = 0;
				}
			}
			
			this.set({
				width: pos.width,
				minWidth: 200,
				maxWidth: parseInt(maxWidth * 0.9),
				height: pos.height,
				minHeight: 200,
				maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
				allowMaximize: false,
				allowMinimize: false,
				showMaximize: false,
				showMinimize: false,
				showStatusbar: false,
				showClose: false,
				caption: ("Summary"),
				resizeSensitivity: 7,
				contentPadding: 0
				
			});				

			this.moveTo(pos.left, pos.top);

			this.tabView = new qx.ui.tabview.TabView().set({
				contentPadding: 5
			});
			this.tabView.setAppearance("tabview");
			
			this.citiesTab = new bos.gui.CitiesPage();
			this.tabView.add(this.citiesTab);
			
			this.militaryTab = new bos.gui.MilitaryPage();
			this.tabView.add(this.militaryTab);
			
			this.defendersTab = new bos.gui.DefendersPage();
			this.tabView.add(this.defendersTab);			

			this.castlesTab = new bos.gui.CastlesPage();
			this.tabView.add(this.castlesTab);			
						
			this.purifyResourcesTab = new bos.gui.PurifyResourcesPage();
			this.tabView.add(this.purifyResourcesTab);
			
			this.massRecruitmentTab = new bos.gui.MassRecruitmentPage();
			this.tabView.add(this.massRecruitmentTab);
			
			if (false) {
				//disabled
				this.dungeonsTab = new bos.gui.DungeonsPage();
				this.tabView.add(this.dungeonsTab);
				
				this.regionTab = new bos.gui.RegionPage();
				this.tabView.add(this.regionTab);					
			}
			
			this.tradeOrdersTab = new bos.gui.TradeOrdersPage();
			this.tabView.add(this.tradeOrdersTab);
			
			this.tradeRoutesTab = new bos.gui.TradeRoutesPage();
			this.tabView.add(this.tradeRoutesTab);

			this.unitOrdersTab = new bos.gui.UnitOrdersPage();
			this.tabView.add(this.unitOrdersTab);

			this.incomingAttacksTab = new bos.gui.IncomingAttacksPage();
			this.tabView.add(this.incomingAttacksTab);

			this.optionsTab = new bos.gui.OptionsPage();
			this.tabView.add(this.optionsTab);
			
			this.tabView.addListener("changeSelection", this.onChangeTab, this);
			
			this.add(this.tabView);

			this.cities = new Array();
			webfrontend.gui.Util.formatWinClose(this);
			
			this.guardianTimer = new qx.event.Timer(10500);
			this.guardianTimer.addListener("interval", this.checkAndReattachConsumers, this);	
			this.guardianTimer.start();	

			if (webfrontend.data.Player.getInstance().getMinisterTradePresent()) {
				this.startCosumingRESO();
			}
			
			if (webfrontend.data.Player.getInstance().getMinisterMilitaryPresent()) {
				this.unitOrdersTab.startRefreshingFromServer();
			}
			
		}, 
		statics: {
			_defaultSortComparatorInsensitiveAscending : function(row1, row2) {
				//summary row always at the bottom
				if (row1[0] == "Total") {
					return 1;
				}

				if (row2[0] == "Total") {
					return -1;
				}

				var obj1 = null;
				if (row1[arguments.callee.columnIndex] != null)
						obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
								row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

				var obj2 = null;
				if (row2[arguments.callee.columnIndex] != null)
						obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
								row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

				var n1 = qx.lang.Type.isNumber(obj1);
				var n2 = qx.lang.Type.isNumber(obj2);
				if (n1 && n2) {
					var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
					if (result != null) {
						if (result == 0) {
							return row1[0] > row2[0] ? 1 : -1;
						}
						return result;
					}
				}

				if (n1 && !n2) {
					return -1;
				}

				if (!n1 && n2) {
					return 1;
				}

				if (obj1 > obj2) {
					return 1;
				} else if (obj1 < obj2) {
					return -1;
				}
				
				return row1[0] > row2[0] ? 1 : -1;
			}, 
			_defaultSortComparatorInsensitiveDescending : function(row1, row2) {
				//summary row always at the bottom
				if (row1[0] == "Total") {
					return 1;
				}
				if (row2[0] == "Total") {
					return -1;
				}

				var obj1 = null;
				if (row1[arguments.callee.columnIndex] != null)
						obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
								row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

				var obj2 = null;
				if (row2[arguments.callee.columnIndex] != null)
						obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
								row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

				var n1 = qx.lang.Type.isNumber(obj1);
				var n2 = qx.lang.Type.isNumber(obj2);
				if (n1 && n2) {
					var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
					if (result != null) {
						if (result == 0) {
							return row1[0] < row2[0] ? 1 : -1;
						}
					}
				}

				if (n1 && !n2) {
					return -1;
				}

				if (!n1 && n2) {
					return 1;
				}
				
				if (obj1 < obj2)
					return 1;
				if (obj1 > obj2)
					return -1;

				return row1[0] > row2[0] ? 1 : -1;
			}
		}, 
		members: {
				tabView: null,
				citiesTab: null,
				militaryTab: null,
				defendersTab: null,
				dungeonsTab: null,
				regionTab: null,
				unitOrdersTab: null,
				tradeOrdersTab: null,
				tradeRoutesTab: null,
				incomingAttacksTab: null,
				castlesTab: null,
				purifyResourcesTab: null,
				optionsTab: null,
				
				_requestedResourceType: 1,
				_requestedResourceCity: 0,
				_requestedResourceFetchedCities: null,
				_requestedResourceRefreshView: false,								
				_requestResourcesProgressDialog: null,
				_waitingForFullMessage: true,
				
				cities: null,
				resfHandlerAdded: false,

				updateManagerConsumers: [],
				guardianTimer: null,
				lastUpdateViewTime: 0,
				getRequestDetails: function(dt) {
					if (this._waitingForFullMessage) {
						return "a";
					} else {
						return "";
					}
				}, 
				dispatchResults: function(du) {
					if (this._waitingForFullMessage) {
						this._waitingForFullMessage = false;
					}
					if (du == null || du.length == 0) return;
					
					for (var i = 0, count = du.length; i < count; i++) {
						var dv = du[i];
						this.cities[dv.i] = dv;
					}
					
					this.updateView(true);					
				}, 
				startCosumingRESO: function() {
					if (!this.resfHandlerAdded) {
						webfrontend.net.UpdateManager.getInstance().addConsumer("RESO", this);
						this.updateManagerConsumers.push("RESO");																				
						this.resfHandlerAdded = true;
					}
				},
				checkAndReattachConsumers: function() {
					var manager = webfrontend.net.UpdateManager.getInstance();					
					for (var c = 0; c < this.updateManagerConsumers.length; c++) {
						var code = this.updateManagerConsumers[c];
						var attached = false;
						for (var i = 0; i < manager.reciever.length; i++) {	
							var item = manager.reciever[i];
							if (item != null && item.code == code && item.consumer == this) {
								attached = true;
								break;
							}
						}
						if (!attached) {
							manager.addConsumer(code, this);
						}
					}
				}, 
				onTick: function() {

				}, 
				onChangeTab: function() {
					
					if ((this.dungeonsTab != null && this.tabView.isSelected(this.dungeonsTab)) || (this.regionTab != null && this.tabView.isSelected(this.regionTab))) {
						this._forceRegionMap();
					}			

					this.updateView();
				}, 
				activateOverlay: function(show) {
					var server = bos.Server.getInstance();
					if (show) {
						server.addListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					} else {
						server.removeListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					}
				},  
				_createExportButton: function() {
					var btnExport = new qx.ui.form.Button(locale == "de" ? "Exportiere zu csv" : "Export to csv");
					btnExport.setToolTipText(locale == "de" ? "Exportiert die Tabelle ins csv Format" : "Exports table in csv format");
					btnExport.setWidth(120);
					return btnExport;
				}, 
				loadPersistedCities: function() {
					var savedCities = bos.Storage.getInstance().getSavedCities();
					var cities = webfrontend.data.Player.getInstance().cities;

					var server = bos.Server.getInstance();
					
					var count = 0;
					for (var key in savedCities) {
						var cityId = parseInt(savedCities[key]);
						if (server.cities[cityId] == undefined && cities[cityId] != undefined && !isNaN(cityId)) {
							var loaded = bos.Storage.getInstance().loadCity(cityId);
							server.cities[cityId] = loaded;
							count++;
						}
					}
					
					this.updateView();

				}, 
				loadPersistedTableSettings: function() {
					var storage = bos.Storage.getInstance();

					if (storage.getCitiesTableSettings() != null) {
						this.citiesTab.table.applyTableSettings(storage.getCitiesTableSettings(), "Cities");
					}
					if (storage.getMilitaryTableSettings() != null) {
						this.militaryTab.table.applyTableSettings(storage.getMilitaryTableSettings(), "Military");
					}
					if (storage.getMoonstonesTableSettings() != null) {
						this.purifyResourcesTab.table.applyTableSettings(storage.getMoonstonesTableSettings(), "Moonstones");
					}
				}, 
				_disposeRequestResourcesProgressDialog: function() {
					if (this._requestResourcesProgressDialog != null) {
						this._requestResourcesProgressDialog.disable();
						this._requestResourcesProgressDialog.destroy();
						this._requestResourcesProgressDialog = null;
					}
				}, 
				fetchResources: function() {
					this._disposeRequestResourcesProgressDialog();

					this._requestResourcesProgressDialog = new webfrontend.gui.ConfirmationWidget();
					this._requestResourcesProgressDialog.showInProgressBox(tr("fetching resources, please wait"));
					qx.core.Init.getApplication().getDesktop().add(this._requestResourcesProgressDialog, {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					});
					this._requestResourcesProgressDialog.show();
					
					this._requestedResourceCity = webfrontend.data.City.getInstance().getId();
					this._requestedResourceType = bos.Const.WOOD;
					this._requestedResourceFetchedCities = [];
					
					var server = bos.Server.getInstance();
					server.cityResources = {};
					this._fetchResourcesImpl();
				}, 
				_fetchResourcesImpl: function() {
					this._requestedResourceFetchedCities["c" + this._requestedResourceCity] = true;
					bos.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
						cityid: this._requestedResourceCity,
						resType: this._requestedResourceType,
						minResource: 0,
						maxTime: 24 * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
					}, this, this._processTradeSearchResources);
				}, 
				_processTradeSearchResources: function(r, n) {
					if (r == false || n == null) return;

					//[{"i":7667741,"la":140698,"lt":2400,"n":"041 Wroclaw","rc":140698,"sa":0,"sg":false,"st":4800}
					//al = land capacity
					//as = sea capacity
					//i = cityId
					//n = cityName
					//rc = resources count
					//sg = sieged?
					//tl = land transport time, if < 0 then city not reachable
					//ts = sea transport time, if < 0 then city not reachable

					var resourceType = this._requestedResourceType;
					var lastUpdated = new Date();
					
					var server = bos.Server.getInstance();
					for (var i = 0; i < n.length; i++) {

						var c = {
							cityId: n[i].i,
							//city: n[i].n,
							timeLand: n[i].lt,								
							timeSea: n[i].st,
							seaTransportTime: n[i].st,
							landTransportTime: n[i].lt,
							sieged: n[i].sg,
							resources: [null, null, null, null, null],
							lastUpdated: lastUpdated
						};

						var prevCity = server.cityResources["c" + c.cityId];
						if (prevCity != null) {
							for (var res = 1; res <= 4; res++) {
								c.resources[res] = prevCity.resources[res];
							}
							prevCity.resources = null;
						}
						
						var resCount = n[i].rc;

						c.resources[resourceType] = {							
							count: resCount,
							amountLand: n[i].la,
							amountSea: n[i].sa
						}
						server.cityResources["c" + c.cityId] = c;

						var realCity = server.cities[c.cityId];
						if (realCity != null && realCity.resources.hasOwnProperty(resourceType)) {
							realCity.setResourceCount(resourceType, resCount);

							/*
							var diff = Math.abs(realCity.getResourceCount(resourceType) - resCount);
							if (diff > 5000) {
									//big diff means city storage has been changed
									alert("city " + realCity.getName() + " res=" + resourceType + " good: " + resCount + " bad: " + realCity.getResourceCount(resourceType));
							}
							*/
						}

					}

					if (this._requestedResourceType < 4) {
						this._requestedResourceType++;
						this._fetchResourcesImpl();
					} else {
						this._prepareNextTradeSearchResourcesBatch();
					}

				}, 
				_prepareNextTradeSearchResourcesBatch: function() {
					var cities = webfrontend.data.Player.getInstance().cities;
					
					var server = bos.Server.getInstance();
					for (var key in cities) {
						var cacheKey = "c" + key;
						var resCity = server.cityResources[cacheKey];
						if (resCity == null && this._requestedResourceFetchedCities[cacheKey] == null) {
							this._requestedResourceCity = parseInt(key);
							this._requestedResourceType = bos.Const.WOOD;
							this._fetchResourcesImpl();
							return;
						}
					}

					//details about every city has been already fetched or there was some error during fetching
					server.setCityResourcesUpdateTime(new Date());
					if (this._requestedResourceRefreshView) {
						this._requestedResourceRefreshView = false;
						this.updateView();
						this._disposeRequestResourcesProgressDialog();
					}

				}, 
				_updateRowFromResCity: function(resCity, row) {
					if (resCity.resources[1] != null) {
						row["wood"] = resCity.resources[1].count;
					}
					if (resCity.resources[2] != null) {
						row["stone"] = resCity.resources[2].count;
					}
					if (resCity.resources[3] != null) {
						row["iron"] = resCity.resources[3].count;
					}
					if (resCity.resources[4] != null) {
						row["food"] = resCity.resources[4].count;
					}
				}, 
				_populateResources: function(row, cityId) {
					if (!this.cities.hasOwnProperty(cityId)) {
						return false;
					}
					
					var st = webfrontend.data.ServerTime.getInstance();
					var serverStep = st.getServerStep();
					var stepsPerHour = st.getStepsPerHour();
											
					var c = this.cities[cityId];
					
					var resTypes = ["", "wood", "stone", "iron", "food"];
					
					var gold = Math.round(c.g * stepsPerHour);
					row["gold/h"] = gold;
					
					for (var i = 0; i < c.r.length; i++) {
						var res = c.r[i];
						var timeDiff = serverStep - res.s;
						var delta = res.d;
						var count = timeDiff * delta + res.b;
						count = Math.max(0, Math.min(count, res.m));
						
						var key = resTypes[res.i];
						row[key] = Math.floor(count);
						row[key + "/h"] = Math.round(delta * stepsPerHour);
						row[key + "Max"] = res.m;
						row[key + "Free"] = res.m - row[key];
						row[key + "Offers"] = res.o;
						row[key + "Incoming"] = res.t;
						
						if (res.i == 4) {
							var foodBallance = row[key + "/h"]
							if (foodBallance >= 0) {
								row["foodEmptyAt"] = "food positive";
							} else {
								//var n = res.s + r.b / -(foodBallance);
								var n = Math.floor(serverStep + count / -delta);
								var emptyAt;
								if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) {
									emptyAt = 0;
									row["foodEmptyAt"] = "storage empty";
								} else {												
									emptyAt = webfrontend.data.ServerTime.getInstance().getStepTime(n);	
									row["foodEmptyAt"] = parseInt((emptyAt - new Date()) / 1000);													
								}
							}																							
						}
					}
				
					return true;
				}, 
				_addDefendersToRow: function(city, row, sum) {
					row["ts"] = 0;
					row["summary_military"] = "";
					row["unitsAtHome"] = 0;
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_" + i;
						if (i == 18) continue;
						var unit = city.getUnitTypeInfo(i);
						row[unitKey] = unit.total;
						row["unit_def_" + i] = unit.count;
						row["unitsAtHome"] += unit.count;
						if (sum[unitKey] == null || sum[unitKey] == "") {
							sum[unitKey] = 0;
						}
						sum[unitKey] += unit.total;

						var space = unit.total * getUnitRequiredSpace(i);
						row["ts"] += space;
						sum["ts"] += space;

						if (unit.total > 0) {
							if (row["summary_military"].length > 0) {
								row["summary_military"] += ", ";
							}
							row["summary_military"] += unit.total + " " + formatUnitType(i, unit.total);
						}
					}

					if (city.getSupportOrders() != null) {
						for (var i = 0; i < city.getSupportOrders().length; i++) {
							var order = city.getSupportOrders()[i];
							if (order.state = 4 && order.units != null) {
								for (var u = 0; u < order.units.length; u++) {
									var unit = order.units[u];
									row["unit_def_" + unit.type] += unit.count;
								}
							}
						}
					}

					row["summary_defenders_ts"] = 0;
					row["summary_defenders"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_def_" + i;
						if (i == 18) continue;
						if (row[unitKey] != "0" && row[unitKey] != null) {
							if (row["summary_defenders"].length > 0) {
								row["summary_defenders"] += ", ";
							}
							row["summary_defenders"] += row[unitKey] + " " + formatUnitType(i, row[unitKey]);

							if (sum[unitKey] == null || sum[unitKey] == "") {
								sum[unitKey] = 0;
							}
							sum[unitKey] += row[unitKey];
							var space = row[unitKey] * getUnitRequiredSpace(i);
							row["summary_defenders_ts"] += space;
							sum["summary_defenders_ts"] += space;
						}
					}


					sum["summary_military"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_" + i;
						if (i == 18) continue;
						if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
							if (sum["summary_military"].length > 0) {
									sum["summary_military"] += ", ";
							}
							sum["summary_military"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
						}
					}

					sum["summary_defenders"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_def_" + i;
						if (i == 18) continue;
						if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
							if (sum["summary_defenders"].length > 0) {
									sum["summary_defenders"] += ", ";
							}
							sum["summary_defenders"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
						}
					}
				},
				_forceRegionMap: function() {
					if (a.visMain.getMapMode() != "r") {
						var cityId = webfrontend.data.City.getInstance().getId();
						var city = webfrontend.data.Player.getInstance().cities[cityId];
						var x = city.xPos;
						var y = city.yPos;
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}	
				}, 
				updateView: function(isAutoRefreshed) {
					
					var startTime = (new Date()).getTime();
					
					if (!this.isSeeable()) {
						//console.log("Main summary view is hidden, nothing to update");
						return;
					}
					
					if (isAutoRefreshed === true && startTime - this.lastUpdateViewTime <= bos.Const.MIN_INTERVAL_BETWEEN_AUTO_REFRESHES) {
						//console.log("summary was recently auto updated skipping update");
						return;
					}

					if (this.tabView.isSelected(this.citiesTab)) {
						this.citiesTab.updateView();
					} else if (this.tabView.isSelected(this.militaryTab)) {
						this.militaryTab.updateView();
					} else if (this.tabView.isSelected(this.defendersTab)) {
						this.defendersTab.updateView();
					} else if (this.dungeonsTab != null && this.tabView.isSelected(this.dungeonsTab)) {
						this.dungeonsTab.updateView();
					} else if (this.regionTab != null && this.tabView.isSelected(this.regionTab)) {
						this.regionTab.updateView();
					} else if (this.tabView.isSelected(this.unitOrdersTab)) {
						this.unitOrdersTab.updateView();
					} else if (this.tabView.isSelected(this.tradeOrdersTab)) {
						this.tradeOrdersTab.updateView();
					} else if (this.tabView.isSelected(this.tradeRoutesTab)) {
						this.tradeRoutesTab.updateView();
					} else if (this.tabView.isSelected(this.incomingAttacksTab)) {
						this.incomingAttacksTab.updateView();
					} else if (this.tabView.isSelected(this.purifyResourcesTab)) {
						this.purifyResourcesTab.updateView();
					} else if (this.tabView.isSelected(this.massRecruitmentTab)) {
						this.massRecruitmentTab.updateView();
					} else if (this.tabView.isSelected(this.castlesTab)) {
						this.castlesTab.updateView();
					}

					var server = bos.Server.getInstance();
					if (this.citiesTab.btnRefreshResources != null && server.getCityResourcesUpdateTime() != null) {
						this.citiesTab.btnRefreshResources.setToolTipText("Resources refreshed at: " + qx.util.format.DateFormat.getDateTimeInstance().format(server.getCityResourcesUpdateTime()));
					}

					this.optionsTab.cbPersistCities.setValue(bos.Storage.getInstance().getPersistingCitiesEnabled());
					
					var finishTime = (new Date()).getTime();
					//console.log("summary.updateView took " + (finishTime - startTime) + "ms , previous update ended " + (startTime - this.lastUpdateViewTime) + "ms before current one started");
					this.lastUpdateViewTime = finishTime;
				}
		}
});

function handleError(dp) {
	try {	
		var dq = dp.toString();
		var cx = " ";
		if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
		if (dp.getUri != null) dq += cx + dp.getUri();
		if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
		if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
		if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;

		dq = qx.lang.Json.stringify(dq);

		var msg = "{error:" + dq + "}";
		
		if (console.log != undefined) {
			console.log(msg);
		} else {
			alert(msg);
		}
	} catch (e) {
		alert("Error in error handler " + e);
	}
}

function selectReports(startsWith) {
	var rep = a.title.report;

	var select = startsWith != null;

	var parts;

	if (startsWith != null) {
		parts = startsWith.split("|");
	} else {
		parts = [];
		parts.push(null);
	}

	rep.headerData.iterateCachedRows(_changeCheckState, {
		s: select,
		parts: parts
	});

	rep.headerData.fireDataEvent("dataChanged", {
		firstColumn: 0,
		lastColumn: 0,
		firstRow: 0,
		lastRow: rep.headerData.getRowCount()
	});
	rep._updateButtonState();
}

function _changeCheckState(D, E) {
	var rep = a.title.report;
	for (var key in this.parts) {
		var part = this.parts[key];
		if (part == null || part == "" || (E.s != null && E.s.indexOf(part) > 0)) {
			E.c = this.s;
			rep.headerData.setSelected(E.i, this.s);
			break;
		}
	}
}

function exportSelectedReports() {
	var rep = a.title.report;
	var ids = rep.headerData.getSelectedIds();

	if (ids.length == 0 || (ids.length == 1 && ids[0] == 0)) {
		return;
	}

	if (ids.length > 5) {
		if (locale == "de"){
			bos.Utils.handleWarning("Bitte wähle nicht mehr als 5 Berichte aus");
		}
		else{
			bos.Utils.handleWarning("Please do not select more than 5 reports");
		}

		return;
	}

	var counter = 1;
	for (key in ids) {
		var id = ids[key];
		bos.net.CommandManager.getInstance().sendCommand("GetReport", {
				id: id
		}, this, parseReport, counter);
		counter++;
	}
}

function parseReport(r, data, eh) {

	if (r == false || data == null) return;

	var date = new Date(data.h.d); 
	var header = data.h.l + " on " + qx.util.format.DateFormat.getDateTimeInstance().format(date) + ".";

	var result = new Array();
	result["short"] = header;
	result["onlyDef"] = header;
	result["csv"] = "TODO";

	if (data.a != null && data.a.length > 0) {

		var totalAtt = [];
		var totalDef = [];

		for (var i = 0; i < data.a.length; i++) {
				var army = data.a[i];

				for (var key in army.u) {
						var total = army.r == bos.Const.ORDER_ATTACK ? totalAtt : totalDef;

						var unit = army.u[key];
						var totalKey = unit.t;
						if (total[totalKey] == undefined) {
								total[totalKey] = {o: 0, l: 0, t: unit.t};
						}

						total[totalKey].o += unit.o;
						total[totalKey].l += unit.l;
				}
		}

		result["short"] += "\nAttackers: " + formatUnits(totalAtt) + ".";

		var tmp = "\nTotal Defenders: " + formatUnits(totalDef) + ".";
		result["onlyDef"] += tmp;
		result["short"] += tmp;
	}

	result["full"] = result["short"];
	if (data.rs != null && data.rs.length > 0) {
			result["full"] += "\nRes: ";
			for (var i = 0; i < data.rs.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.rs[i]);
			}
			result["full"] += ".";
	}

	if (data.r != null && data.r.length > 0) {
			result["full"] += "\nRes looted: ";
			for (var i = 0; i < data.r.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.r[i]);
			}
			result["full"] += ".";
	}

	if (data.cp != undefined && data.cpo != undefined && data.cp >= 0) {
			result["full"] += "\nPower of claim: ";
			if (data.cp > data.cpo) {
					result["full"] += "increased from " + data.cpo + "% to " + data.cp + "%";
			} else if (data.cp == data.cpo) {
					result["full"] += "stays at " + data.cp + "%";
			} else {
					result["full"] += "decreased from " + data.cpo + "% to " + data.cp + "%";
			}
	}

	if (data.b != undefined && data.b.m != undefined && data.b.n != undefined) {
			result["full"] += "\nMorale: " + Math.round(100 * (data.b.m - 1)) + "%";
			result["full"] += "\nAttack reduction: " + Math.round(100 * (data.b.n - 1)) + "%";
	}

	if (data.s != null && data.s.length > 0) {
			result["full"] += "\nBuildings: ";
			for (var i = 0; i < data.s.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatBuilding(data.s[i]);
			}
			result["full"] += ".";
	}

	showReport(result);
}

function formatResource(rs) {
	if (rs.t == bos.Const.GOLD) {
		return rs.v + " " + "gold";
	} else {
		var res = webfrontend.res.Main.getInstance();
		var resource = res.resources[rs.t];
		return rs.v + " " + resource.n.toLowerCase();
	}
}

function formatBuilding(s) {
	var res = webfrontend.res.Main.getInstance();
	var building = res.buildings[s.t];

	var res = "";
	if (s.a > 1) {
			res += s.a + " x ";
	}
	res += "lvl " + s.l + " " + building.dn.toLowerCase();
	return res;
}

function showReport(report) {
	var dialog = shareReportWindow();
	dialog.show(report);
	qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
	dialog.show();
}

function shareReportWindow() {
	var dialog = new webfrontend.gui.ConfirmationWidget();

	dialog.show = function(report) {

		var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
		this.dialogBackground._add(bgImg, {left: 0, top: 0});

		var la = new qx.ui.basic.Label("Exported report");
				la.setFont("font_subheadline_sidewindow");
				la.setTextColor("text-gold");
				la.setTextAlign("left");
		this.dialogBackground._add(la, {left: 17, top: 5});


		var shrStr = new qx.ui.form.TextArea(report["short"]).set({allowGrowY: true, tabIndex: 303});
		this.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
		shrStr.selectAllText();

		var shwStr = function(type) {
				shrStr.setValue(report[type]);
				shrStr.selectAllText();
		}

		var top = 175;
		var btnShort = new qx.ui.form.Button(locale == "de" ? "Kurz" : "Short").set({width: 125, appearance: "button-text-small"});
		btnShort.addListener("click", function(){shwStr("short");}, false);
		this.dialogBackground._add(btnShort, {left: 30, top: top});

		var btnOnlyDef = new qx.ui.form.Button(locale == "de" ? "Nur Verteidiger" : "Only defender").set({width: 125, appearance: "button-text-small"});
		btnOnlyDef.addListener("click", function(){shwStr("onlyDef");}, false);
		this.dialogBackground._add(btnOnlyDef, {left: 160, top: top});

		var btnFull = new qx.ui.form.Button(locale == "de" ? "Komplett" : "Full").set({width: 125, appearance: "button-text-small"});
		btnFull.addListener("click", function(){shwStr("full");}, false);
		this.dialogBackground._add(btnFull, {left: 290, top: top});


		var okButton = new qx.ui.form.Button("OK");
				okButton.setWidth(120);
				okButton.addListener("click", function(){dialog.disable();}, false);
		this.dialogBackground._add(okButton, {left: 445, top: 190});
	}
	return dialog;
}


function formatUnits(units) {
	var s = "";

	for (var key in units) {
		if (key == undefined) continue;

		var unit = units[key];

		if (unit == undefined || unit.o == undefined || unit.t == undefined || unit.l == undefined) {
			continue;
		}

		if (s != "") {
			s += ", ";
		}

		//var lost = unit.o - unit.l;
		//s += unit.o + "-" + lost + "=" + unit.l + " ";
		/* old format */
		s += unit.o + " ";
		if (unit.l != unit.o) {
				s += "(" + unit.l + ") ";
		}

		s += formatUnitType(unit.t, unit.o);
	}

	if (s == "") {
		s = "none";
	}

	return s;
}

function formatUnitType(unitType, count) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
		return "UNKNOWN_" + unitType;
	}
	var name = unit.dn.toLowerCase();
	var locale = qx.locale.Manager.getInstance().getLocale();
	if (locale == "en") {
		if (name != null && name.length > 0 && name.charAt(name.length - 1) != 's' && count > 1) {
			name += 's';
			if (name == "crossbowmans") {
				name = "crossbowmen";
			}
		}
	} else {
		if (name != null && name.length > 0 && count > 1) {
			switch (name) {
				case "stadtwächter":
				name = "Stadtwächter";
				break;
				case "balliste":
				name = "Baliste(n)";
				break;
				case "jäger":
				name = "Jäger";
				break;
				case "pikenier":
				name = "Pikenier(e)";
				break;
				case "templer":
				name = "Templer";
				break;
				case "beserker":
				name = "Berserker";
				break;
				case "magier":
				name = "Magier";
				break;
				case "kundschafter":
				name = "Kundschafter";
				break;
				case "armbrustschütze":
				name = "Armbrustschütze(n)";
				break;
				case "paladin":
				name = "Paladin(e)";
				break;
				case "ritter":
				name = "Ritter";
				break;
				case "hexenmeister":
				name = "Hexenmeister";
				break;
				case "rammbock":
				name = "Rammböcke";
				break;
				case "katapult":
				name = "Katapult(e)";
				break;
				case "fregatte":
				name = "Fregatte(n)";
				break;
				case "schaluppe":
				name = "Schaluppe(n)";
				break;
				case "kriegsgaleone":
				name = "Kriegsgaleone(n)";
				break;
				case "baron":
				name = "Baron(e)";
				break;
			}
		}
	}
	return name;
}

function getUnitAttackType(unitId) {
	var unitId = parseInt(unitId);
	var infantry = new qx.data.Array([1, 3, 4, 5, 6, 19]);
	var cavalery = new qx.data.Array([8, 9, 10, 11]);
	var magic = new qx.data.Array([7, 12]);
	var artilery = new qx.data.Array([2, 13, 14, 15, 16, 17]);

	if (infantry.indexOf(unitId) >= 0) {
		//return "infantry";
		return 1;
	}
	if (cavalery.indexOf(unitId) >= 0) {
		//return "cavalery";
		return 2;
	}
	if (magic.indexOf(unitId) >= 0) {
		//return "magic";
		return 4;
	}
	if (artilery.indexOf(unitId) >= 0) {
		//return "artilery";
		return 3;
	}
	//return "unknown";
	bos.Utils.handleError("Unknown attack type for unit " + unitId);
	return 0;
}

function getUnitRequiredSpace(unitType) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
		return 0;
	}
	return unit.uc;
}

function human_time(val) {
	if (val <= 0)
		return "00:00:00";

	var seconds = val % 60;
	var minutes = Math.floor(val / 60) % 60;
	var hours = Math.floor(val / 3600) % 24;
	var days = Math.floor(val / 86400);

	var str = sprintf("%02d:%02d:%02d", hours, minutes, seconds);

	if (days > 0)
		str = sprintf( "%dd %s", days, str);

	return str;
}

function debug(sMsg) {
	if (bos.Const.DEBUG_VERSION) {
/*
	if (window.JS_log != undefined)
		window.JS_log(sMsg);
	else
	*/
		alert(sMsg);
	}
}

function dumpObject(obj) {
	debug(qx.lang.Json.stringify(obj));
}

function trace(sMsg) {
	//alert(sMsg);
}
				
qx.Class.define("bos.gui.FoodCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(tr("food calculator"));
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.clientArea.add(this.createFooter());

	}, 
	members: {
		units: null,
		unitContainer: null,
		summary: null,
		sbAdd: null,
		addDefendersFromReport: false,
		lblFoodConsumption: null,
		btnClear: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}

			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(120);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);

			var result = {
				'image': img,
				'count': countInput
			};
			return result;
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var label;

			this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Einheiten zu Nahrung" : "Units to food");
			this.btnCalc.setWidth(150);
			this.btnCalc.setToolTipText(locale == "de" ? "Berechnet den Nahrungsbedarf pro Stunde der aufgelisteten Einheiten" : "Calculates the food consumtion/h for the selected units");
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateFoodConsumption, this);
			
			this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Nahrung zu Einheiten" : "Food to units");
			this.btnRevCalc.setToolTipText(locale == "de" ? "Berechnet die maximale Einheitenzahl für die eingegebene Nahrungsmenge" : "Calculates the max. unit count for the entered food");
			this.btnRevCalc.setWidth(150);
			container.add(this.btnRevCalc);
			this.btnRevCalc.addListener("click", this.calculateUnitsPerConsumption, this);					

			this.btnClear = new qx.ui.form.Button(tr("clear"));
			this.btnClear.setWidth(70);
			container.add(this.btnClear);
			this.btnClear.addListener("click", this.clearAll, this);

			label = new qx.ui.basic.Label(locale == "de" ? "Nahrungsbedarf:" : "Consumption:");
			label.setMarginLeft(20);
			container.add(label);

			this.lblFoodConsumption = new qx.ui.basic.Label("");
			container.add(this.lblFoodConsumption);

			return container;
		}, 
		onAdd: function() {

		}, 
		calculateFoodConsumption: function() {

			var res = webfrontend.res.Main.getInstance();
			var sum = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];

				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					sum += count * u.f;
				}
			}
			var perH = Math.round(sum / 24.0);
			this.lblFoodConsumption.setValue(perH + "/h");
		}, 
		calculateUnitsPerConsumption: function() {
			var s = prompt(locale == "de" ? "Bitte gebe das Nahrungseinkommen pro Stunde ein" : "Please enter food per hour");
			if (s != null && s != "") {
				var foodPerHoour = parseInt(s, 10);
				var res = webfrontend.res.Main.getInstance();
				
				
				for (var key in this.units) {
					var u = res.units[key];
					var inputs = this.units[key];

					var count = Math.round(24.0 * foodPerHoour / u.f);
					inputs.count.setValue(count);
				}
				this.lblFoodConsumption.setValue("N/A");
			}
		}
	}
});


qx.Class.define("bos.gui.RecruitmentSpeedCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(locale == "de" ? "Rekutiergeschwindigkeits Kalkulator" : "Recruitment speed calculator");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box, {flex: true});

		this.mainContainer = new qx.ui.groupbox.GroupBox();
		this.mainContainer.setLayout(new qx.ui.layout.Grid(10, 10));
		box.add(this.mainContainer, {edge: "center"});
			
		this.config = [
			{buildingId: "15", units: ["1"], times: [50]},
			{buildingId: "16", units: ["6", "3", "4"], times: [200, 250, 300]},
			{buildingId: "36", units: ["7", "12"], times: [600, 1300]},			
			{buildingId: "17", units: ["8", "11", "9"], times: [300, 500, 600]},			
			{buildingId: "18", units: ["13", "2", "14"], times: [2500, 3500, 4000]},
			{buildingId: "19", units: ["16", "15", "17"], times: [25000, 40000, 80000]},			
			{buildingId: "37", units: ["5", "10", "19"], times: [350, 700, 60000]}			
		];
		
		for (var row = 0; row < this.config.length; row++) {
			var o = this.config[row];
			o.result = this._addRow(row + 1, o.buildingId, o.units);
		}

		this.mainContainer.setMinHeight(100);

		this.clientArea.add(this.createFooter());
		
		this.calculate();
	}, 
	members: {
			mainContainer: null,
			sbUnitTypes: null,
			btnClear: null,
			btnCalc: null,
			btnReverseCalc: null,
			activateOverlay: function(activated) {
					//nothing
			}, 
			clearAll: function() {
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					inputs.speed.setValue(100);
				}
				this.calculate();
				
			}, 
			_addRow: function(row, buildingId, units) {
				var res = webfrontend.res.Main.getInstance();
				var result = new Object();
						
				var label;
			
				label = new qx.ui.basic.Label(res.buildings[buildingId].dn);
				this.mainContainer.add(label, {
					row: row, 
					column: 0
				});

				result.speed = new webfrontend.ui.SpinnerInt(0, 100, 1000000);
				result.speed.setWidth(80);
				this.mainContainer.add(result.speed, {
					row: row,
					column: 1
				});
				
				result.units = [];
				for (var i = 0; i < units.length; i++) {
					var unit = units[i];
					label = new qx.ui.basic.Label(res.units[unit].dn);
					this.mainContainer.add(label, {
						row: row, 
						column: i + 2
					});
					result.units.push(label);
				}
				
				return result;
			}, 
			createFooter: function() {
				var box = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				var label;

				this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Berechne" :"Calculate");
				this.btnCalc.setWidth(120);
				container.add(this.btnCalc);
				this.btnCalc.addListener("click", this.calculate, this);
				
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.sbUnitTypes = new qx.ui.form.SelectBox().set({
					width: 120,
					height: 28
				});
				
				var res = webfrontend.res.Main.getInstance();
				for (var key in res.units) {
					var u = res.units[key];
					if (parseInt(key) > 19) {
						break;
					}
					this.sbUnitTypes.add(new qx.ui.form.ListItem(u.dn, null, key));					
				}	
				container.add(this.sbUnitTypes);
				
				this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Zeit zu Prozentsatz" : "Time to speed");
				this.btnRevCalc.setWidth(120);
				container.add(this.btnRevCalc);
				this.btnRevCalc.addListener("click", this.timeToSpeedCalculate, this);					

				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.btnClear = new qx.ui.form.Button(tr("clear"));
				this.btnClear.setWidth(120);
				container.add(this.btnClear);
				this.btnClear.addListener("click", this.clearAll, this);

				return box;
			}, 
			timeToSpeedCalculate: function() {
				var reqUnitId = this.sbUnitTypes.getSelection()[0].getModel();					
				var s = prompt(locale == "de" ? "Bitte gebe die Rekrutierzeit in Sekunden an." : "Please enter recruitment time in seconds:");
				if (s != null && s != "") {
					var unitEvery = parseInt(s, 10);
					if (unitEvery <= 0) {
						bos.Utils.handleWarning("Invalid value");
						return;
					}
					
					for (var i = 0; i < this.config.length; i++) {
						var c = this.config[i];
						var inputs = c.result;
						
						for (var j = 0; j < c.units.length; j++) {
							var unitId = c.units[j];
							if (reqUnitId == unitId) {
								
								var speed = Math.round((c.times[j] * 100) / (unitEvery + 0.4999999)) + 1;
								inputs.speed.setValue(speed)
								
								i = this.config.length;
								break;
							}
						}
					
					}						
					
					this.calculate();
				}
			}, 
			calculate: function() {

				var res = webfrontend.res.Main.getInstance();
				
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					var speed = parseInt(inputs.speed.getValue());
					
					for (var j = 0; j < c.units.length; j++) {
						var unitId = c.units[j];
						var label = inputs.units[j];
						var unitEvery = Math.max(1, Math.round((c.times[j] * 100) / speed));
						label.setValue(res.units[unitId].dn + ": " + unitEvery + "s");
						label.setToolTipText(webfrontend.Util.getTimespanString(unitEvery));
					}
				
				}
			}
		}
});


qx.Class.define("bos.gui.CombatCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.Canvas());
		this.setWidth(790);
		
		this.setTitle(locale == "de" ? "Kampf Kalkulator" : "Combat calculator");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {
			left: 0,
			top: 2,
			right: 0,
			bottom: 2
		});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 20));
		scroll.add(box);

		this.attUnitContainer = new qx.ui.groupbox.GroupBox();
		this.attUnitContainer.setLegend(locale == "de" ? "Angreifer" : "Attacker");
		this.attUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.attUnitContainer, {row: 0, column: 0});

		this.defUnitContainer = new qx.ui.groupbox.GroupBox();
		this.defUnitContainer.setLegend(locale == "de" ? "Verteidiger" : "Defender");
		this.defUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.defUnitContainer, {row: 0, column: 1});

		this.defUnits = new Object();
		this.attUnits = new Object();

		var lblAttScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Score");
		this.attUnitContainer.add(lblAttScore, {
			left: 0,
			top: 6
		});
		this.attScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.attUnitContainer.add(this.attScore, {
			left: 40,
			top: 6
		});

		var lblDefScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Score");
		this.defUnitContainer.add(lblDefScore, {
			left: 0,
			top: 6
		});
		this.defScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.defUnitContainer.add(this.defScore, {
			left: 40,
			top: 6
		});

		var cT = 0;
		for (var key in res.units) {
			var cY = res.units[key];
			if (cY.x < 0 || cY.y < 0) continue;
			this.defUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.defUnitContainer);
			this.attUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.attUnitContainer);
			if (key == "1") {
				this.attUnits[key].count.setEditable(false);
			}
			if (cY.y > cT) cT = cY.y;
		}
		this.defUnitContainer.setMinHeight((cT + 1) * 31);
		this.attUnitContainer.setMinHeight((cT + 1) * 31);		

		box.add(this.createDefences(), {row: 0, column: 2});
		
		var rightColumn = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
		box.add(rightColumn, {row: 0, column: 3});
		
		rightColumn.add(this.createSummary());
		rightColumn.add(this.createFooter());		
/*
		this.clientArea.add(this.createFooter(), {
			bottom: 0,
			left: 0,
			right: 250
		});
*/

/*
		this.clientArea.add(this.createSummary(), {
			bottom: 0,
			left: 450,
			right: 0
		});
		*/

	}, 
	members: {
		defUnits: null,
		defUnitContainer: null,
		attUnits: null,
		attUnitContainer: null,
		defences: null,
		summary: null,
		sbAdd: null,
		hourInput: null,
		minuteInput: null,
		addDefendersFromReport: false,
		btnSubstractLosses: null,
		sbCombatType: null,
		btnClearAll: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing to do
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Actions");
			//container.setHeight(120);
			container.setLayout(new qx.ui.layout.VBox(5));
			
			var typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);			
			
			this.hourInput = new webfrontend.ui.SpinnerInt(0, 0, 23);
			this.hourInput.setValue(10);
			this.hourInput.setWidth(40);
			typeContainer.add(this.hourInput);

			var separatorLabel = new qx.ui.basic.Label(":");
			typeContainer.add(separatorLabel);

			this.minuteInput = new webfrontend.ui.SpinnerInt(0, 0, 59);
			this.minuteInput.setValue(0);
			this.minuteInput.setWidth(40);
			typeContainer.add(this.minuteInput);

			this.sbCombatType = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});
			if (locale == "de") {
				this.sbCombatType.add(new qx.ui.form.ListItem("Überfall", null, "Assault"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Belagerung", null, "Siege"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plünderung", null, "Plunder"));
			} else {
				this.sbCombatType.add(new qx.ui.form.ListItem("Assault", null, "Assault"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Siege", null, "Siege"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plunder", null, "Plunder"));
			}

			container.add(this.sbCombatType, {
				row: 1,
				column: 0
			});

			this.btnCalc = new qx.ui.form.Button("Calc");
			this.btnCalc.setWidth(50);
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateLosses, this);
			
			this.btnClearAll = new qx.ui.form.Button(locale == "de" ? "Alles Löschen" : "Clear All");
			this.btnClearAll.setWidth(90);
			container.add(this.btnClearAll);
			this.btnClearAll.addListener("click", this.clearAll, this);
			
			this.btnSubstractLosses = new qx.ui.form.Button(locale == "de" ? "Substract losses" : "Substract losses");
			this.btnSubstractLosses.setWidth(90);
			container.add(this.btnSubstractLosses);
			this.btnSubstractLosses.addListener("click", this.substractLosses, this);			
			
			typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);
			this.sbAdd = new qx.ui.form.SelectBox().set({
				width: 160,
				height: 28
			});
			if (locale == "de") {
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger & Verteidigung", null, "Defenders & Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger", null, "Defenders"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidigung", null, "Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Angreifer", null, "Attackers"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Alle", null, "Scout Report: All"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Verteidigung", null, "Scout Report: Defences"));
			} else {
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders & Defences", null, "Defenders & Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders", null, "Defenders"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defences", null, "Defences"));
				this.sbAdd.add(new qx.ui.form.ListItem("Attackers", null, "Attackers"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: All", null, "Scout Report: All"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: Defences", null, "Scout Report: Defences"));
			}

			typeContainer.add(this.sbAdd);

			this.btnAdd = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" : "Add");
			this.btnAdd.setWidth(50);
			typeContainer.add(this.btnAdd);
			this.btnAdd.addListener("execute", this.onAdd, this);

			return container;
		}, 
		onAdd: function() {
			var add = this.sbAdd.getSelection()[0].getModel();
			if (add == "Attackers") {
				this.addAttackers();
			} else if (add == "Defences") {
				this.addDefences();
			} else if (add == "Defenders") {
				this.addDefenders();
			} else if (add == "Defenders & Defences") {
				this.addDefences();
				this.addDefenders();
			} else if (add == "Scout Report: All") {
				this.addReport(true);
			} else if (add == "Scout Report: Defences") {
				this.addReport(false);
			}

		}, 
		calculateLosses: function() {
			var attStrength = this.calculateAttackStrength(this.attUnits, this.defences);
			var defStrength = this.calculateDefenceStrength(this.defUnits, this.defences);

			//dumpObject(attStrength);
			//dumpObject(defStrength);

			var str;

			var attackerForcesTypes = 0;
			var totalAttackerStrength = 0;
			var totalDefenderStrength = 0;

			str = 0;
			if (attStrength[1] != null) {
				str = attStrength[1].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[1].setValue(str);

			str = 0;
			if (attStrength[2] != null) {
				str = attStrength[2].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[2].setValue(str);

			str = 0;
			if (attStrength[3] != null) {
				str = attStrength[3].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[3].setValue(str);

			str = 0;
			if (attStrength[4] != null) {
				str = attStrength[4].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[4].setValue(str);

			str = 0;
			if (defStrength[1] != null) {
				str = defStrength[1].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[1].setValue(str);

			str = 0;
			if (defStrength[2] != null) {
				str = defStrength[2].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[2].setValue(str);

			str = 0;
			if (defStrength[3] != null) {
				str = defStrength[3].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[3].setValue(str);

			str = 0;
			if (defStrength[4] != null) {
				str = defStrength[4].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[4].setValue(str);

			this.clearLosses(this.defUnits);
			this.clearLosses(this.attUnits);

			
			//Mixed attacks are resolved as single type attacks where defensing forces are divided as proportions of attack strength. 
			//Example attacker: 100 zerks and 100 mages. Total attack is 12000. 
			//Defender is divided 41,7% (50*100/12000) against zerks and 58,3% (70*100/12000) against mages.
			var totalDefenderStrength = 0;
			for (var i = 1; i <= 4; i++) {
				
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					
					var def = defStrength[i].strength * attackPart;
					//alert(def + " = " + defStrength[i].strength + " * " + attackPart);
					totalDefenderStrength += def;
				}
			}
			
			//alert("totalAttackerStrength: " + totalAttackerStrength);
			//alert("totalDefenderStrength: " + totalDefenderStrength);
			
			for (var i = 1; i <= 4; i++) {
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					var defAgainstThatGroup = defStrength[i].strength * attackPart;
					var attackerLosses = (defAgainstThatGroup / totalAttackerStrength) * this.getAttackerMultiplier();
					
					this.applyAttackerLosses(i, attackerLosses);
				}
			}
			
			if (totalDefenderStrength > 0) {
				var defenderLosses = (totalAttackerStrength / totalDefenderStrength) * this.getDefenderMultiplier();
				this.applyDefenderLosses(0, defenderLosses);
			}


		}, 
		clearLosses: function(units) {

			for (var key in units) {
				var inputs = units[key];
				inputs.losses.setValue("");
			}

		}, 
		getAttackerMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Assault") {
				return 0.5;
			} else if (mode == "Siege") {
				return 0.1;
			} else if (mode == "Plunder") {
				return 0.1;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, 
		getDefenderMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Assault") {
				return 0.5;
			} else if (mode == "Siege") {
				return 0.1;
			} else if (mode == "Plunder") {
				return 0.02;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, 
		substractLosses: function() {
			this._substractLossesImpl(this.attUnits);
			this._substractLossesImpl(this.defUnits);

			var hour = parseInt(this.hourInput.getValue());
			hour++;
			if (hour >= 24) {
				hour = 0;
			}
			this.hourInput.setValue(hour);
		}, 
		_substractLossesImpl: function(units) {
			for (var key in units) {				
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());				

				var s = inputs.losses.getValue();
				if (s != null && s != "") {
					inputs.losses.setValue("");
					var lost = parseInt(s);
					if (qx.lang.Type.isNumber(lost) && !isNaN(lost)) {
						count = Math.max(0, count - lost);
						inputs.count.setValue(count);
					}
				}
			}
		}, 
		applyAttackerLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.attUnits) {
				var unit = res.units[key];
				var inputs = this.attUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0 || attackType != type) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);

			}

		}, 
		applyDefenderLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.defUnits) {
				var unit = res.units[key];
				var inputs = this.defUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);
			}
		}, 
		calculateAttackStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];
			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				if (result[attackType] == null) {
					result[attackType] = {count: 0, strength: 0, neutralized: 0};
				}
				result[attackType].count += count;
			}

			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				var r = result[attackType];
				var trapId = this.getTrapAgainst(attackType);

				var maxNeutralized = 0;
				if (defences[trapId] != null) {
					maxNeutralized = parseInt(defences[trapId].count.getValue());
				}

				maxNeutralized -= r.neutralized;

				if (maxNeutralized > 0) {
					maxNeutralized = Math.min(maxNeutralized, parseInt(r.count / 2) - r.neutralized);
					if (count <= maxNeutralized) {
						r.neutralized += count;
						count = 0;
					} else {
						r.neutralized += maxNeutralized;
						count -= maxNeutralized;
					}
				}

				var attack = unit.av * count;
				r.strength += attack;
			}

			var hour = parseInt(this.hourInput.getValue(), 10);
			var minute = parseInt(this.minuteInput.getValue(), 10);
			var attackReduction = this.calculateAttackReduction(hour, minute);
			this.summary.attackReduction.setValue(attackReduction + "%");

			if (attackReduction != 0) {
				for (var attackType in result) {
					var attack = result[attackType];
					attack.strength = Math.round(attack.strength * (1 + attackReduction / 100.0));
				}
			}
			return result;
		}, 
		calculateDefenceStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];

			var totalBoosted = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "8": 0};

			for (var key in units) {
				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}
					result[u].count += count;
					//var defValue = unit.def[u];
					//result[u].strength += defValue * count;
				}
			}

			var cityWallsLevel = parseInt(defences[23].count.getValue());

			for (var key in units) {

				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = 0;
				var towerId = this.getTowerFor(key);

				if (towerId >= 0) {
					var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];
					if (maxBoosted >= count) {
						boosted = count;
						count = 0;
					} else {
						boosted = maxBoosted;
						count -= boosted;
					}

					totalBoosted[key] += boosted;
				}

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}
			}

			//dumpObject(totalBoosted);

			for (var key in units) {

				if (key != "1")
				continue;

				var unit = res.units[key];

				var boostableGuards = 0;
				for (var b in totalBoosted) {

					var towerId = this.getTowerFor(b);
					if (towerId > 0) {
						var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];

						var guardsPerUnit = this.getAffectedGuardsPerUnit(towerId);

						boostableGuards += guardsPerUnit * maxBoosted;
					}
				}

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = Math.min(boostableGuards, count);
				count -= boosted;

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}

			}

			var moraleBoost = this.calculateMoraleBoost();
			if (moraleBoost > 0) {
				var factor = (1 + moraleBoost / 100.0);
				for (var u in result) {
					result[u].strength = parseInt(result[u].strength * factor);
				}
			}

			this.summary.moraleBonus.setValue("+" + moraleBoost.toString() + "%");

			return result;
		}, 
		calculateAttackReduction: function(hour, minute) {
			/* some test data:
				22:00:01 -0
				22:10:00 -3
				22:20:00 -7
				22:26:35 -9%
				22:27:53 -9%
				22:30    -10
				22:40    -13
				22:50    -17
				23:00    -20
				23:10    -23
				23:20:27 -27%
				23:26:35 -29
				23:27:53 -29
				23:30    -30
				23:40    -33
				23:50    -37
				00:26:35 -40
				07:27:52 -40
				08:26:35 -31
				09:26:35 -11
				*/
			if (hour >= 10 && hour <= 21) {
				return 0;
			}
			if (hour >= 0 && hour <= 7) {
				return -40;
			}
			var m = hour * 60 + minute;
			if (hour >= 22) {
				var result = (-1.0/3.0) * m + 440;
				return Math.round(result);
			}
			if (hour >= 8) {
				var result = (1.0/3.0) * m - 200;
				return Math.round(result);
			}
			bos.Utils.handleError("It shouldn't happend " + hour + ":" + minute);
			return 0;
		}, 
		calculateMoraleBoost: function() {
			var a = parseInt(this.attScore.getValue());
			var d = parseInt(this.defScore.getValue());

			if (a == 0 || d == 0) {
				return 0;
			}

			var factor = a / d;
			if (factor <= 4) {
				return 0;
			}

			if (factor >= 40) {
				return 300;
			}

			if (factor < 10) {
				var y = (100 / 6) * factor - 200 / 3;
				return parseInt(y);
			}

			var y = 10 * factor;
			return parseInt(y);

		}, 
		getCityWallsBonus: function(level) {
			var bonusses = [0, 0.01, 0.03, 0.06, 0.1, 0.15, 0.2, 0.26, 0.33, 0.41, 0.5];
			if (bonusses[level] != null) {
				return bonusses[level];
			} else {
				return 0;
			}
		}, 
		isNavalUnit: function(unitType) {
			var t = parseInt(unitType);
			if (t >= 15 && t <= 17) {
				return true;
			} else {
				return false;
			}
		}, 
		addReport: function(addDefenders) {

			var rep = a.title.report;
			if (rep == null) {
				if (locale == "de"){
					bos.Utils.handleWarning("Der Reportframe ist nicht geöffnet, bitte klicke auf den Report-Button");
				} else {
					bos.Utils.handleWarning("Cannot find reports widget, please click Reports button");
				}
				return;
			}

			var rep = a.title.report;
			var ids = rep.headerData.getSelectedIds();

			if (ids.length == 0 || (ids.length == 1 && ids[0] == 0) || ids.length != 1) {
				if (locale == "de"){
					bos.Utils.handleWarning("Bitte markiere einen Spionage Report");
				} else {
					bos.Utils.handleWarning("Please select one scout report");
				}

				return;
			}

			this.addDefendersFromReport = addDefenders;
			var counter = 1;
			for (key in ids) {
				var id = ids[key];
				bos.net.CommandManager.getInstance().sendCommand("GetReport", {
					id: id
				}, this, this.parseReport, counter);
				counter++;
			}

		}, 
		parseReport: function(r, data, eh) {

			if (r == false || data == null) return;

			this.clear(this.defences);

			if (this.addDefendersFromReport) {
				this.clear(this.defUnits);
			}

			if (data.a != null && data.a.length > 0 && this.addDefendersFromReport) {

				var totalDef = new Array();

				for (var i = 0; i < data.a.length; i++) {
					var def = data.a[i];
					if (def.r == bos.Const.ORDER_ATTACK) {
						continue;
					}

					for (var key in def.u) {

						var unit = def.u[key];
						if (totalDef[unit.t] == undefined) {
							totalDef[unit.t] = {o: 0, l: 0, t: unit.t};
						}

						totalDef[unit.t].o += unit.o;
						totalDef[unit.t].l += unit.l;
					}

				}

				for (var i = 1; i <= 19; i++) {
					if (i == 18) continue;
					var inputs = this.defUnits[i];

					if (totalDef[i] != null) {
						var unit = totalDef[i];
						inputs.count.setValue(unit.l);
					}
				}

			}

			if (data.s != null && data.s.length > 0) {
				for (var i = 0; i < data.s.length; i++) {
					var building = data.s[i];

					var bt = parseInt(building.t);
					if (this.defences[bt] != null) {
						//dumpObject(building);
						if (bt == 23) {
							//walls
							this.defences[bt].count.setValue(building.l);
						} else {
							//tower
							var count = parseInt(this.defences[bt].count.getValue());


							var affected = this._getAffectedTroops(bt, parseInt(building.l));

							this.defences[bt].count.setValue(count + parseInt(building.a) * affected.affected);
						}
					}
				}
			}

		}, 
		clearAll: function() {
			this.clear(this.defences);
			this.clear(this.defUnits);
			this.clear(this.attUnits);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
				if (inputs.losses) {
					inputs.losses.setValue("");
				}
			}

		}, 
		addDefenders: function() {
			var server = bos.Server.getInstance();
			var city = webfrontend.data.City.getInstance();
			for (var i = 1; i <= 19; i++) {
				if (i == 18) continue;
				var inputs = this.defUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.count);
			}

			if (city.getSupportOrders() != null) {
				for (var i = 0; i < city.getSupportOrders().length; i++) {
					var order = city.getSupportOrders()[i];
					if (order.state = 4 && order.units != null) {
						for (var u = 0; u < order.units.length; u++) {
							var unit = order.units[u];
							var inputs = this.defUnits[unit.type];
							var current = parseInt(inputs.count.getValue());
							inputs.count.setValue(current + unit.count);
						}
					}
				}
			}
		}, 
		addAttackers: function() {
			var server = bos.Server.getInstance();
			var city = webfrontend.data.City.getInstance();
			for (var i = 2; i <= 19; i++) {
				if (i == 18) continue;
				//var unitKey = "unit_" + i;
				var inputs = this.attUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.total);
				inputs.losses.setValue("");
			}

		}, 
		addDefences: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			for (var key in this.defences) {
				this.defences[key].count.setValue(0);
			}

			var affectedTroops = {};

			if (buildings.length == 0) {
				if (locale == "de"){
					bos.Utils.handleWarning("Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!");
				} else {
					bos.Utils.handleWarning("You need to be in city to fetch it's defences!");
				}
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if ((bType >= 38 && bType <= 46)) {
					var count = parseInt(this.defences[bType].count.getValue());

					var affected = this.getAffectedTroops(b);

					this.defences[bType].count.setValue(count + affected.affected);
				}

			}

			this.defences[23].count.setValue(city.getWallLevel());

		}, 
		getTowerFor: function(unitType) {
			var t = parseInt(unitType);
			if (t == 2) {
				return 39;
			} else if (t == 3) {
				return 41;
			} else if (t == 4) {
				return 40;
			} else if (t == 5) {
				return 42;
			} else if (t == 8) {
				return 38;
			}
			return -1;
		}, 
		_getAffectedTroops: function(type, level) {
			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap
			var stats = [];
			//0 index = guards multiplier
			stats[38] = [2, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[39] = [10, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[40] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[41] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[42] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[43] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[44] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[45] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[46] = [0, 20, 30, 50, 100, 160, 240, 350, 500, 700, 1000]

			var result = {affected: 0, guards: 0};

			var bType = parseInt(type);

			if (stats[bType] != null) {
				result.affected = stats[bType][level];
				result.guards = result.affected * stats[bType][0];
			}

			return result;

		}, 
		getAffectedTroops: function(b) {
			return this._getAffectedTroops(b.getType(), b.getLevel());
		}, 
		getAffectedGuardsPerUnit: function(towerId) {
			var id = parseInt(towerId);
			switch (id) {
			case 38: return 2;
			case 39: return 10;
			case 40: return 1;
			case 41: return 1;
			case 42: return 1;
			default:
				return 0;
			}
		}, 
		getTrapAgainst: function(attackType) {
			if (attackType == 1) {
				return 43;
			} else if (attackType == 2) {
				return 44;
			} else if (attackType == 3) {
				return 45;
			} else if (attackType == 4) {
				return 46;
			} else {
				bos.Utils.handleError("Unknown attackType: " + attackType);
				return 0;
			}
		}, 
		createSummary: function() {

			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Summary");
			container.setLayout(new qx.ui.layout.Grid(5, 5));

			this.summary = {att: [], def: [], attackReduction: 0, moraleBonus: 0};
			var label;

			var att = new qx.ui.basic.Label(tr("attacker"));
			container.add(att, {
				row: 0,
				column: 1
			});

			var def = new qx.ui.basic.Label(tr("defender"));
			container.add(def, {
				row: 0,
				column: 2
			});

			var inf = new qx.ui.basic.Label("Inf.");
			container.add(inf, {
				row: 1,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 1
			});
			this.summary.att[1] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 2
			});
			this.summary.def[1] = label;

			var cav = new qx.ui.basic.Label(locale == "de" ? "Kavallerie" : "Cavalry");
			container.add(cav, {
				row: 2,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 1
			});
			this.summary.att[2] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 2
			});
			this.summary.def[2] = label;

			var mag = new qx.ui.basic.Label(locale == "de" ? "Magie" : "Magic");
			container.add(mag, {
				row: 3,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 1
			});
			this.summary.att[4] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 2
			});
			this.summary.def[4] = label;

			var siege = new qx.ui.basic.Label(locale == "de" ? "Artilery" : "Siege");
			container.add(siege, {
				row: 4,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 1
			});
			this.summary.att[3] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 2
			});
			this.summary.def[3] = label;

			var siege = new qx.ui.basic.Label("Modifier");
			container.add(siege, {
				row: 5,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Angriffsverringerung  durch den Nachtschutz" : "Night protection attack reduction");
			container.add(label, {
				row: 5,
				column: 1
			});
			this.summary.attackReduction = label;

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Maloral Bonus" : "Morale bonus");
			container.add(label, {
				row: 5,
				column: 2
			});
			this.summary.moraleBonus = label;

			return container;
		}, 
		createDefences: function() {
			var walls = new qx.ui.groupbox.GroupBox();
			walls.setLegend(locale == "de" ? "Verteidigung (des Verteidigers)" : "Defences (affected)");
			walls.setLayout(new qx.ui.layout.Basic());

			this.defences = new Object();

			var x = 0;
			var y = 0;
			var margin = 36;

			var res = webfrontend.res.Main.getInstance();

			var building = res.buildings[23];
			this.defences[23] = this.createBuildingSlot(x, y, building, walls, 10);
			y += margin;

			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap

			for (var i = 38; i <= 46; i++) {
				var building = res.buildings[i];
				this.defences[i] = this.createBuildingSlot(x, y, building, walls, 48000);
				y += margin;
			}

			return walls;
		}, 
		createBuildingSlot: function(x, y, building, container, max) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (building.mimg >= 0) {
				var fi = res.getFileInfo(building.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(32);
				img.setHeight(32);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(building.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x + 8 - 4,
					top: y + 6
				});
			}
			var countInput = new webfrontend.ui.SpinnerInt(0, 0, max);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 50 - 4,
				top: y + 10
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var result = {
				image: img,
				count: countInput
			};
			//countInput.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);

			return result;
		}, 
		createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(22);
				img.setHeight(22);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			var countInput = new webfrontend.ui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 40,
				top: y + 4
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var losses = new qx.ui.basic.Label("");
			container.add(losses, {
				left: x + 40 + 75,
				top: y + 4
			});

			var result = {
				'image': img,
				'count': countInput,
				'losses': losses
			};
			//cj.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);
			//cn.addListener("click", this._onMax, cq);
			return result;
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		clearSelections: function() {
			for (var bG in this.units) {
				this.units[bG].buildCount.setValue(0);
			}
		}
	}
});

function jumpCoordsDialog() {
	var wdg = new webfrontend.gui.ConfirmationWidget();
		wdg.askCoords = function() {
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_castle_warning.gif");
			this.dialogBackground._add(bgImg, {left: 0, top: 0});

			var f20 = new qx.bom.Font(20);
			var f25 = new qx.bom.Font(25);

			var la = new qx.ui.basic.Label("Coordinates");
			la.setFont("font_subheadline_sidewindow");
			la.setTextColor("text-gold");
			la.setTextAlign("left");
			this.dialogBackground._add(la, {left: 17, top: 5});

			var lb = new qx.ui.basic.Label(locale == "de" ? "Gebe die Koordinaten in das Textfeld ein" : "Insert target coords into text field.");

			lb.setFont(f20);
			this.dialogBackground._add(lb, {left: 275, top: 65});

			var lc = new qx.ui.basic.Label(locale == "de" ? "Koordinaten(0-699) müssen mit einem Doppelpunkt getrennt werden! <br />Beispiel: 432:231 " : "Values (0-699) should be separated by a colon<br />Example: 432:231");
			lc.setRich(true);
			lc.setTextAlign("center");
			this.dialogBackground._add(lc, {left: 305, top: 90});

			var crds = new qx.ui.form.TextField("").set({width: 120, maxLength: 7, font: f25});
					crds.setTextAlign("center");
			this.dialogBackground._add(crds, {left: 360, top: 137});

			var ok = new qx.ui.form.Button("OK").set({width: 120});
			ok.addListener("click", function(){
				crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				var x = parseInt(RegExp.$1, 10);
				var y = parseInt(RegExp.$2, 10);

				a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				wdg.disable();
			}, true);
			ok.setEnabled(false);
			this.dialogBackground._add(ok, {left: 295, top: 205});

			var c = new qx.ui.form.Button("Cancel").set({width: 120});
			c.addListener("click", function(){a.allowHotKey = true; wdg.disable();}, true);
			this.dialogBackground._add(c, {left: 445, top: 205});

			var validateCoords = function() {
				tfc = crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				if (tfc == null) {
						ok.setEnabled(false);
						return;
				}
				if (!/[^\d]/.test(tfc[1]) && !/[^\d]/.test(tfc[2])) {
						if (tfc[1] >= 0 && tfc[1] <= 699 && tfc[2] >= 0 && tfc[2] <= 699) {
								ok.setEnabled(true);
						} else {
								ok.setEnabled(false);
						}
				}
			}
			crds.addListener("input", validateCoords, false);
			crds.focus();
		}
	return wdg;
}

qx.Class.define("bos.ui.table.cellrenderer.Default", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.TABLE_DEFAULT_COLOR;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		
	}, 
	members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			} else if (qx.lang.Type.isNumber(id) && id < 0) {
				style["border-bottom"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});

qx.Class.define("bos.ui.table.cellrenderer.FullAt", {
	extend: bos.ui.table.cellrenderer.Default,
	construct: function(mode){
		this.base(arguments);		
	}, 
    members: {
		_mode: 0,
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else if (value instanceof Date) {
                if (value.getTime() != 0) {
                    cellInfo.value = webfrontend.Util.getDateTimeString(value);
                } else {
                    cellInfo.value = "now";
                }
			} 
			return qx.bom.String.escape(this._formatValue(cellInfo));
		}, 
		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();
			var value = cellInfo.value;
			var color = bos.Const.TABLE_DEFAULT_COLOR;
			
			var seconds = -1;
			if (value instanceof Date) {
                if (value.getTime() == 0) {
                    color = bos.Const.RESOURCE_RED;
                } else {
                    var diff = value - new Date();
                    seconds = Math.floor(diff / 1000);	
                    if (seconds >= 3600 * 24) {
                        color = bos.Const.RESOURCE_GREEN;
                    } else if (seconds >= 3600 * 8) {
                        color = bos.Const.TABLE_DEFAULT_COLOR;						
                    } else if (seconds > 0) {
                        color = bos.Const.RESOURCE_YELLOW;
                    }
                }
			} else if (qx.lang.Type.isString(value)) {
				color = bos.Const.RESOURCE_GREEN;
			}
						
			var border = bos.Const.TABLE_BORDER;
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				border = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}
			
			return "color: " + color + ";" + "border-top:" + border;
		}
	}
});

				
qx.Class.define("bos.ui.table.cellrenderer.HumanTime", {
	extend: bos.ui.table.cellrenderer.Default,
	construct: function(mode){
		this.base(arguments);
		this._mode = mode || 0;
	}, 
    members: {
		_mode: 0,
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else if (value instanceof Date) {
				var diff = new Date() - value;
				cellInfo.value = human_time(Math.floor(diff / 1000));
			} else if (qx.lang.Type.isNumber(cellInfo.value)) {
				cellInfo.value = human_time(cellInfo.value);
			}
			return qx.bom.String.escape(this._formatValue(cellInfo));
		}, 
		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();
			var value = cellInfo.value;
			var color = bos.Const.TABLE_DEFAULT_COLOR;
			
			var seconds = -1;
			if (value instanceof Date) {
				var diff = new Date() - value;
				seconds = Math.floor(diff / 1000);
			} else if (qx.lang.Type.isNumber(value)) {
				seconds = (value);
			} else if (qx.lang.Type.isString(value)) {
				color = bos.Const.RESOURCE_GREEN;
			}
			
			if (seconds >= 0) {					
				if (this._mode == 1) {
					//food
					if (seconds >= 3600 * 24 * 2) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 3600 * 12) {
						color = bos.Const.RESOURCE_YELLOW;
					} else {
						color = bos.Const.RESOURCE_RED;
					}					
				} else if (this._mode == 0) {
					//build queue, unit queue
					if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 0) {
						color = bos.Const.RESOURCE_YELLOW;
					} else if (seconds <= 0) {
						color = bos.Const.RESOURCE_RED;
					}
				} else if (this._mode == 2) {
					//last visited
					if (seconds >= 3600 * 24 * 3) {
						color = bos.Const.RESOURCE_RED;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_YELLOW;						
					} else if (seconds > 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;
					} else {
						color = bos.Const.RESOURCE_GREEN;
					}						
				}					
			}
			
			var border = bos.Const.TABLE_BORDER;
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				border = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}
			
			return "color: " + color + ";" + "border-top:" + border;
		}
	}
});

qx.Class.define("bos.ui.table.cellrenderer.ClickableLook", {
	extend: bos.ui.table.cellrenderer.Default,
	members: {			
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else {
				cellInfo.value = this.clickableLook(cellInfo.value);
			}
			return this._formatValue(cellInfo);
		}, 
		clickableLook: function(s) {
			//return "<div style=\"cursor: pointer; color: rgb(45, 83, 149);\">" + s + "</div>";
			return bos.Utils.makeClickable(s, "#81adff");
		}/*, // overridden
		_getCellClass : function(cellInfo) {
		  return "qooxdoo-table-cell";
		}*/
	}
});

qx.Class.define("bos.ui.table.cellrenderer.Resource", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight, maxColumn, freeColumn, warningLevel, errorLevel){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.RESOURCE_GREEN;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		this._maxColumn = maxColumn;
		this._freeColumn = freeColumn;
		this._warningLevel = warningLevel;
		this._errorLevel = errorLevel;
	}, 
	members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,
		_maxColumn: null,
		_freeColumn: null,
		_warningLevel: null,
		_errorLevel: null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};

			var maxValue = tableModel.getValueById(this._maxColumn, cellInfo.row);
			var freeValue = tableModel.getValueById(this._freeColumn, cellInfo.row);

			if (freeValue != null && maxValue != null && maxValue > 0) {
				if (freeValue <= 0) {
					style["color"] = bos.Const.RESOURCE_RED;
				} else {
					var mod = freeValue / maxValue;
					if (mod < 0.2) {
						style["color"] = bos.Const.RESOURCE_YELLOW;
					}
				}
			}
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}			

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});

//------------------------------------------------------------------------------------------------------------
//taken from http://userscripts.org/topics/41177
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
				return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
					return value == 'true';
			case 'n':
					return Number(value);
			default:
					return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

				/**
sprintf() for JavaScript 0.5

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
	* Redistributions of source code must retain the above copyright
	notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright
	notice, this list of conditions and the following disclaimer in the
	documentation and/or other materials provided with the distribution.
	* Neither the name of sprintf() for JavaScript nor the
	names of its contributors may be used to endorse or promote products
	derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2007.04.03 - 0.1:
- initial release
2007.09.11 - 0.2:
- feature: added argument swapping
2007.09.17 - 0.3:
- bug fix: no longer throws exception on empty paramenters (Hans Pufal)
2007.10.21 - 0.4:
- unit test and patch (David Baird)
2010.05.09 - 0.5:
- bug fix: 0 is now preceeded with a + sign
- bug fix: the sign was not at the right position on padded results (Kamal Abdali)
- switched from GPL to BSD license
**/

function str_repeat(i, m) {
	for (var o = []; m > 0; o[--m] = i);
	return(o.join(""));
}

function sprintf() {
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while (f) {
		if (m = /^[^\x25]+/.exec(f)) {
			o.push(m[0]);
		}
		else if (m = /^\x25{2}/.exec(f)) {
			o.push("%");
		}
		else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
			if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
				throw("Too few arguments.");
			}
			if (/[^s]/.test(m[7]) && (typeof(a) != "number")) {
				throw("Expecting number but found " + typeof(a));
			}
			switch (m[7]) {
				case 'b': a = a.toString(2); break;
				case 'c': a = String.fromCharCode(a); break;
				case 'd': a = parseInt(a); break;
				case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
				case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
				case 'o': a = a.toString(8); break;
				case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
				case 'u': a = Math.abs(a); break;
				case 'x': a = a.toString(16); break;
				case 'X': a = a.toString(16).toUpperCase(); break;
			}
			if (/[def]/.test(m[7])) {
				s = (a >= 0 ? (m[2] ? '+' : '') : '-');
				a = Math.abs(a);
			}
			c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
			x = m[5] - String(a).length - s.length;
			p = m[5] ? str_repeat(c, x) : '';
			o.push(s + (m[4] ? a + p : p + a));
		}
		else {
			throw("Huh ?!");
		}
		f = f.substring(m[0].length);
	}
	return o.join("");
}



//---------------------- END OF INJECTED PART -----------------------------------
}
};

injectBoSScript();

function injectBoSScript() {
	GM_log("Injecting LoU BoS script");

	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);		
}
		
})();

// ==UserScript==
// @name           LoU Suite (LGG + Philokei Edition)
// @description    Boss and Dungon Raid (enhanced vers. from LoU Suite)
// @namespace      philokei.ch
// @license        Creative Commons Attribution-ShareAlike 3.0 Unported License - http://creativecommons.org/licenses/by-sa/3.0/
// @icon		   http://i1170.photobucket.com/albums/r523/lordgreggreg/Screenshots/2012-07-07_12-04-45.png
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.2
// @author         LGG
// @require        http://sizzlemctwizzle.com/updater.php?id=149657
// ==/UserScript==
//
//                      ====================================
//                      == Edition pour Traduction Fr MJR ==
//                      ====================================



(function ()
{
 	var LS_mainFunction = function ()
	{

		function createSuite()
		{
			var louSuite = {};
			var LT = {};

			qx.Class.define("louSuite.main", {
				type   :"singleton",
				extend :qx.core.Object,
				members:{
					_player         :null,
					app             :null,
					srvBar          :null,
					bosses          :null,
					dungeons        :null,
					city            :null,
					cities          :null,
					cityId          :null,
					boss_raider     :null,
					dungeon_raider  :null,
					LS_RAID         :8,
					LS_RAID_REPEAT  :1,
					LS_RAID_ONCE    :0,
					options         :null,
					optionsPage     :null,
					initialize      :function ()
					{
						this.app = qx.core.Init.getApplication();
						this.cities = {};
						this.bosses = {};
						this.dungeons = {};
						var t_c = webfrontend.data.Player.getInstance().cities;

						for (var cityId in t_c)
						{
							var c = t_c[cityId];

							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
							this.bosses['c' + cont] = {};
							this.dungeons['c' + cont] = {};
						}

						this._player = webfrontend.data.Player.getInstance().getId();

						this.srvBar = this.app.serverBar;

						this.startScript();
						
						
					},
					startScript     :function ()
					{
						//_LT = LT;
						this.loadOptions();
						LT.options = this.options;
						LT.srvTime = webfrontend.data.ServerTime.getInstance().refTime; // reference time (server start date in milisec?)
						LT.debug = this.debug;
						LT.a = this.app;
						LT.main = this;
						LT.player = webfrontend.data.Player.getInstance();
						LT.curr_city = webfrontend.data.City.getInstance();
						this.scanAllCities();

                                          


						// ***** Options button ***** //
						btn = new qx.ui.form.Button("S");
						btn.set({width:30, appearance:"button-text-small", toolTipText:"LoU Suite - Options"});
						btn.addListener("click", this.showOptionsPage, this);
						this.srvBar.add(btn, {top:2, left:420});

						// ***** Listeners ***** //
						this.optionsPage = new window.louSuite.optionsPage();
					},
					sendTroops      :function (order_type, city_id, x, y, units, repeat, callbackFunc)
					{
						var updateManager = webfrontend.net.UpdateManager.getInstance();
						var data = {
							session                   :updateManager.getInstanceGuid(),
							cityid                    :city_id,
							units                     :units,
							targetPlayer              :"",
							targetCity                :x + ':' + y,
							order                     :order_type,
							transport                 :1,
							createCity                :"",
							timeReferenceType         :1,
							referenceTimeUTCMillis    :0,
							raidTimeReferenceType     :repeat, // Repeat raid or not
							raidReferenceTimeUTCMillis:0,
							iUnitOrderOptions         :0
						};

						var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/OrderUnits", "POST", "application/json");
						req.setProhibitCaching(false);
						req.setRequestHeader("Content-Type", "application/json");
						req.setData(qx.lang.Json.stringify(data));
						req.setTimeout(10000);
						req.addListener("completed", function (e)
						{
							callbackFunc(e, {cid:city_id, x:x, y:y, units:units});
						}, this);
						req.send();
					},
					moveToContRegion:function (cont, q)
					{
						var c = 0;
						for (var x = 1; x < 4; x++)
						{
							for (var y = 1; y < 4; y++)
							{
								c += 1;
								if (c == q)
								{
									var xm = x / 4;
									var ym = y / 4;
									var col = Math.floor(cont % 10);
									var row = Math.floor(cont / 10);
									var srv = webfrontend.data.Server.getInstance();
									var height = srv.getContinentHeight();
									var width = srv.getContinentWidth();
									var x = Math.floor(col * width + 0.5 * width);
									var y = Math.floor(row * height + 0.5 * height);

									LT.a.setMainView('r', 0, x * LT.a.visMain.getTileWidth(), y * LT.a.visMain.getTileHeight());
								}
							}
						}
					},
					scanRegion      :function ()
					{
						if (LT.a.visMain.mapmode == "r")
						{
							p = webfrontend.data.Player.getInstance().getName();

							clib = ClientLib.Vis.VisMain.GetInstance();
							region_object = clib.get_Region();
							if (region_object == null || region_object == undefined) return;
							for (var o in region_object)
							{
								if (region_object[o] != null && region_object[o].hasOwnProperty("d"))
									data_object = region_object[o];
							}
							if (data_object == null || data_object == undefined) return;
							d_object = data_object.d;
							if (d_object == null || d_object == undefined) return;
							for (var n in d_object)
							{
								data_table = null;
								// this is just way too much, but couldn't find better solution to get obfuscated and version changing variables
								try
								{
									for (var dob in d_object[n])
									{
										if (d_object[n][dob] instanceof Array && d_object[n][dob].length == 32)
										{
											for (e = 0; e < d_object[n][dob].length; e++)
											{
												r = d_object[n][dob][e];
												if (r == null && typeof r == "object")
												{
													data_table = d_object[n][dob];
													break;
												} else
												{
													for (f = 0; f < r.length; f++)
													{
														if (r[f] == null && typeof r[f] == "object")
														{
															data_table = d_object[n][dob];
															break;
														}
													}
												}
											}
										}
										if (data_table != null) break;
									}
								} catch (e)
								{

								}
								//data_table = d_object[n].SIB;
								if (data_table == null || data_table == undefined) continue;
								for (q = 0; q < data_table.length; q++)
								{
									row = data_table[q];
									for (w = 0; w < row.length; w++)
									{
										if (row[w] != null)
										{
											crd = row[w].get_Coordinates();
											posX = crd & 0xFFFF;
											posY = crd >> 16;
											uit = row[w].get_UIType();
											//console.log("(" + posX + ":" + posY +"), " + uit);
											// uit - City / LawlessCity / Shrine / Dungeon / Boss / FreeSlot / null (moongate)
											if (uit == "Boss")
											{
												// Determine what kind of boss we have, and what level
												var b_type = null;
												var b_level = null;
												for (var fg in row[w])
												{
													if (row[w][fg] != null && row[w][fg].hasOwnProperty("BossLevel"))
													{
														b_type = row[w][fg]['BossType'];
														b_level = row[w][fg]['BossLevel'];
														b_state = row[w][fg]['State'];
													}
												}
												switch (b_type)
												{
													case 6:
														b_name = "Dragon";
														break;
													case 7:
														b_name = "Moloch";
														break;
													case 8:
														b_name = "Hydra";
														break;
													case 5:
														b_name = "Octopus";
														break;
													default:
														b_name = "Boss";
														break;
												}
												//console.log("(" + posX + ":" + posY + ") - " + b_name + " Level " + b_level + " State: " + b_state);
												//console.log(row[w]);
												var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(posX, posY);
												try
												{
													this.bosses['c' + cont][posX + "-" + posY] = {
														'type' :b_name,
														'level':b_level,
														'x'    :posX,
														'y'    :posY,
														'state':b_state,
														't'    :b_type
													};
												}
												catch (e)
												{
													// The boss was from a different continent. Oh well
												}
											}
											if (uit == "Dungeon")
											{
												// Determine what kind of dungeon we have, and what level
												var d_type = null;
												var d_level = null;
												var d_state = null;
												var d_progress = null;
												for (var fg in row[w])
												{
													if (row[w][fg] != null && row[w][fg].hasOwnProperty("DungeonLevel"))
													{
														d_type = row[w][fg]['DungeonType'];
														d_level = row[w][fg]['DungeonLevel'];
														d_state = row[w][fg]['State'];
														d_progress = row[w][fg]['Progress'];
													}
												}
												switch (d_type)
												{
													case 4:
														d_name = "Montagne";
														break;
													case 3:
														d_name = "Colline";
														break;
													case 5:
														d_name = "Foret";
														break;
													default:
														d_name = "Unknown Dungeon";
														break;
												}
												var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(posX, posY);
												try
												{
													this.dungeons['c' + cont][posX + "-" + posY] = {
														'type'    :d_name,
														'level'   :d_level,
														'x'       :posX,
														'y'       :posY,
														'progress':d_progress,
														'state'   :d_state,
														't'       :d_type
													};
												}
												catch (e)
												{

												}
											}
										}
									}
								}
							}
						}
					},
					scanAllCities   :function ()
					{
						var storage = bos.Storage.getInstance();
						for (var cid in LT.player.cities)
						{
							var city = storage.loadCity(cid);
							this.cities[cid] = city;
						}
					},
					getAllCityUnits :function ()
					{
						for (var cid in LT.player.cities)
						{
							this.getCityUnits(cid);
						}
					},
					getCityUnits    :function (id)
					{
						var city = this.cities[id];
						var c_info = LT.player.cities[id];
						c_name = c_info['name'];
						var units = {};
						if (city != null)
						{
							for (var uid in city['units'])
							{
								u_name = this.getUnitName(uid);
								u_count = city['units'][uid]['count'];
								u_speed = city['units'][uid]['speed'];
								u_total = city['units'][uid]['total'];
								//console.log(c_name + " : " + u_count + "/" + u_total + " " + u_name + " available.");
								units[uid] = {
									count:u_count,
									name :u_name,
									total:u_total
								};
							}
						}

						return units;
					},
					getUnitName     :function (id)
					{
						switch (id)
						{
						
						        case '1':
								return "Garde";
							case '2':
								return "Baliste";
							case '3':
								return "RÃ´deurs";
							case '4':
								return "Gardiens";
							case '5':
								return "Templiers";
							case '6':
								return "Berserkers";
							case '7':
								return "Mages";
							case '8':
								return "Eclaireur";
							case '9':
								return "ArbalÃ©triers";
							case '10':
								return "Paladins";
							case '11':
								return "Chevaliers";
							case '12':
								return "Sorciers";
							case '13':
								return "BÃ©lier";
							case '14':
								return "Catapulte";
							case '15':
								return "FrÃ©gate";
							case '16':
								return "Corvettes";
							case '17':
								return "Galion";
							case '19':
								return "Baron";
							default:
								return id;
						}
					},
					setMessage      :function (message)
					{
						var dialog = new webfrontend.gui.ConfirmationWidget();
						dialog.showGenericNotice("Error", message, message, "webfrontend/ui/bgr_popup_survey.gif");

						qx.core.Init.getApplication().getDesktop().add(dialog, {left:0, right:0, top:0, bottom:0});
						dialog.show();
					},
					showOptionsPage :function ()
					{
						this.app.switchOverlay(this.optionsPage);
					},
					loadOptions     :function ()
					{

						forceSave = false;
						_str = localStorage.getItem("LT_options");
						if (_str)
							this.options = qx.lang.Json.parse(_str);
						else
						{
							this.options = {
								"lowestLevelMax":[10, 10, 10, 10, 10, 10]
							};
						}

						this.app.setUserData("LT_options", this.options);
						if (forceSave)
						{
							str = qx.lang.Json.stringify(this.options);
							localStorage.setItem("LT_options", str);
						}
					},
					debug           :function (s)
					{
						if (typeof console != 'undefined') console.log(s);
						else if (window.opera) opera.postError(s);
						else GM_log(s);
					}
				}
			});
			qx.Class.define("louSuite.optionsPage", {
				extend   :webfrontend.gui.OverlayWidget,
				construct:function ()
				{
					webfrontend.gui.OverlayWidget.call(this);
					this.clientArea.setLayout(new qx.ui.layout.Canvas());
					this.setTitle("LoU Suite");
					this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft:15, contentPaddingRight:10, contentPaddingTop:10, contentPaddingBottom:10});
					this.tabView.add(new lou_suite.gui.BossRaider());
					this.tabView.add(new lou_suite.gui.DungeonRaider());

					this.clientArea.add(this.tabView, {top:0, right:3, bottom:30, left:3});
				},
				members  :{
					tabView    :null,
					tabPages   :null,
					clrSel     :null,
					saveOptions:function ()
					{
						str = qx.lang.Json.stringify(LT.options);
						localStorage.setItem("LT_options", str);
						LT.a.switchOverlay(null);
					}
				}
			});
			qx.Class.define("lou_suite.gui.DungeonRaider", {
				extend   :bos.gui.SummaryPage,
				construct:function ()
				{
					var lou_suite = window.louSuite.main.getInstance();
					lou_suite.dungeon_raider = this;
					bos.gui.SummaryPage.call(this);
					this.setLabel("Raid Donjon");
					this.setLayout(new qx.ui.layout.VBox(10));
					this.add(this._createToolBar());
					this._tableModel = new qx.ui.table.model.Simple();
					var columnNames = [ "Id", "Row Info", "Type", "Level", "Progres", "Pos", "Nom", "Distance", "UnitÃ©s", "Actions"];
					var columnIds = ["id", "row_info", "dungeon_type", "dungeon_level", "dungeon_progress", "position", "name", "distance", "units", "actions"];

					this._tableModel.setColumns(columnNames, columnIds);

					this._setupSorting(this._tableModel);
					this._tableModel.sortByColumn(4, true);

					var custom = {
						tableColumnModel:function (obj)
						{
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					this.table = new bos.ui.table.Table(this._tableModel, custom);
					this.table.addListener("cellClick", this._handleCellClick, this);

					var columnModel = this.table.getTableColumnModel();

					columnModel.setColumnVisible(0, false);
					columnModel.setColumnVisible(1, false);
					columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());

					var tcm = this.table.getTableColumnModel();
					var resizeBehavior = tcm.getBehavior();
					resizeBehavior.setWidth(2, 60);
					resizeBehavior.setWidth(3, 20);
					resizeBehavior.setWidth(4, 30);
					resizeBehavior.setWidth(5, 50);
					resizeBehavior.setWidth(6, 100);
					resizeBehavior.setWidth(7, 70);
					resizeBehavior.setWidth(8, 80);
					resizeBehavior.setWidth(9, "1*");
					resizeBehavior.setMinWidth(9, 100);

					this.add(this.table, {flex:1});
				},
				members  :{

					/**
					 *
					 * edit by philokei
					 *
					 * @param sbField
					 * @param chkViewAll
					 *
					 */
					sbContinents                   :null,
					btnUpdateView                  :null,
					sbLevel                        :null,
					sbField                        :null,
					chkViewAll                     :null,
					classicView                    :function ()
					{
						this.btnUpdateView.setEnabled(LT.a.visMain.mapmode == "r");

						var rowData = [];
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();

						var min_level = this.sbLevel.getSelection()[0].getModel();
						//edit by philokei / get field = distance / get all boolean show all (true,false)
						var field = 5;
						field = this.sbField.getSelection()[0].getModel();
						var all = false;
						all = this.chkViewAll.getValue();

						// Refresh the city list to get new troop counts
						lou_suite.scanAllCities();

						// First get all the dungeons in the area for the continent we are working with
						var dungeons = lou_suite.dungeons;
						for (var d_key in dungeons['c' + selectedContinent])
						{
							var dungeon = dungeons['c' + selectedContinent][d_key];
							if (dungeon['state'] && (dungeon['level'] >= min_level))
							{
								// Then get all the cities on that continent that can hit it
								for (var cityId in LT.player.cities)
								{
									c = LT.player.cities[cityId];

									if (c == null)
									{
										continue;
									}

									var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
									// Check that the city is on the right continent
									if (city_cont != selectedContinent)
									{
										continue;
									}

									var city = lou_suite.cities[cityId];
									if (city == undefined)
									{
										continue;
									}

									// Check that the city has enough troops
									if (city.getUnitCount() == 0)
									{
										continue;
									}

									var units = lou_suite.getCityUnits(cityId);

									//edit by philokei: check if distance is in range (field)
									var diffX = Math.abs(c.xPos - dungeon['x']);
									var diffY = Math.abs(c.yPos - dungeon['y']);
									var distance = Math.sqrt(diffX * diffX + diffY * diffY);

									if (distance <= field)
									{


										// Check that there are enough units to send for this dungeon
										var units_to_send = this.getTroopsNeeded(dungeon['type'], dungeon['level'], dungeon['progress'], units);
										if (typeof(units_to_send) == 'object')
										{
											var row = [];

											var units_string = "";
											for (var u_key in units_to_send)
											{
												units_string = units_string + " " + units_to_send[u_key] + " " + units[u_key]['name'];
											}

											this._addBlankValuesToRow(row, this._tableModel);
											row["units"] = units_string;
											row["id"] = cityId;
											row["row_info"] = {
												units  :units_to_send,
												dungeon:dungeon,
												city   :c
											};
											row["name"] = c.name;
											var diffX = Math.abs(c.xPos - dungeon['x']);
											var diffY = Math.abs(c.yPos - dungeon['y']);
											row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
											row["position"] = dungeon['x'] + ":" + dungeon['y'];
											row["dungeon_type"] = dungeon['type'];
											row["dungeon_level"] = dungeon['level'];
											row["dungeon_progress"] = dungeon['progress'] + "%";

											row["actions"] = "Envoyer";

											rowData.push(row);

										}

										else
										{
											//edit by philokei: if not enough troops return needed troops and disables action[send]
											if (all)
											{
												var units_to_send = this.getTroopsNeededNumber(dungeon['type'], dungeon['level'], dungeon['progress'], units);
												if (typeof(units_to_send) == 'object')
												{
													var row = [];

													var units_string = "";
													for (var u_key in units_to_send)
													{
														units_string = units_string + " " + units_to_send[u_key] + " " + units[u_key]['name'];
													}

													this._addBlankValuesToRow(row, this._tableModel);
													row["units"] = units_string;
													row["id"] = cityId;
													row["row_info"] = {
														units  :units_to_send,
														dungeon:dungeon,
														city   :c
													};
													row["name"] = c.name;
													var diffX = Math.abs(c.xPos - dungeon['x']);
													var diffY = Math.abs(c.yPos - dungeon['y']);
													row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
													row["position"] = dungeon['x'] + ":" + dungeon['y'];
													row["dungeon_type"] = dungeon['type'];
													row["dungeon_level"] = dungeon['level'];
													row["dungeon_progress"] = dungeon['progress'] + "%";

													rowData.push(row);

												}
											}
										}
									}
								}
							}
						}

						return rowData;
					},
					createRowData                  :function ()
					{
						return this.classicView();
					},
					getUnitsPerDungeon             :function ()
					{

						//edit by philokei add knights and mages to every dungeon
						var units = {
							Mountain:{
								6 :[15, 75, 350, 900, 3000, 6800, 15000, 25000, 40000, 60000], // Berserker
								3 :[23, 147, 687, 2324, 4500, 9750, 21000, 30000, 54000, 90000], // Ranger
								//4: [7, 32, 146, 375, 1250, 2834, 6250, 10417, 16667, 25000], // Guardian
								7 :[30, 150, 700, 1800, 6000, 13600, 30000, 50000, 80000, 120000], // Mage
								11:[11, 53, 245, 630, 2100, 4760, 10500, 17500, 28000, 42000] // Knight

							},
							Hill    :{
								6:[15, 65, 250, 850, 2500, 5000, 12000, 20000, 35000, 50000], // Berserker
								3:[23, 147, 687, 2324, 4500, 9750, 21000, 30000, 54000, 90000], // Ranger
								//4: [5, 20, 75, 255, 750, 1500, 3600, 6000, 10500, 15000], // Guardian
								7:[30, 130, 500, 1700, 5000, 10000, 24000, 40000, 70000, 100000], // Mage

								11:[11, 46, 175, 595, 1750, 3500 , 8400, 14000, 24500, 35000], // Knight

								12:[15, 65, 250, 850, 2500, 5000, 12000, 20000, 35000, 50000] // Warlock
							},
							Forest  :{
								6:[15, 65, 250, 850, 2500, 5000, 12000, 20000, 35000, 50000], // Berserker
								3:[23, 147, 687, 2324, 4500, 9750, 21000, 30000, 54000, 90000], // Ranger
								//4: [5, 20, 75, 255, 750, 1500, 3600, 6000, 10500, 15000], // Guardian

								7:[30, 130, 500, 1700, 5000, 10000, 24000, 40000, 70000, 100000], // Mage

								11:[10, 44, 167, 567, 1667, 3334, 8000, 13334, 23334, 33334], // Knight
								10:[8, 33, 125, 425, 1250, 2500, 6000, 10000, 17500, 25000] // Paladin
							},
							Sea     :{
								16:[2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667], // Sloop
								15:[1, 4, 23, 44, 111, 167, 227, 334, 500, 667], // Frigate
								17:[1, 1, 6, 11, 28, 42, 57, 84, 125, 167] // War Galleon
							}
						};

						return units;
					},
					//edit by philokei get only troops needed
					getTroopsNeededNumber          :function (dungeon_name, dungeon_level, dungeon_progress, units)
					{
						var units_min = this.getUnitsPerDungeon();
						var kill_percent = 0.0;
						var queued_units = {};
						for (var u_key in units)
						{

							var unit = units[u_key];
							unit['count'] = 400000;
							//GM_log(u_key);
							try
							{
								var units_needed = units_min[dungeon_name][u_key][dungeon_level - 1];
								units_needed = Math.round((dungeon_progress * 0.02 + 1.1) * units_needed);

								var this_kill_percent = unit['count'] / units_needed;
								var total_kill = this_kill_percent + kill_percent;

								// We have enough, return the queued units
								var percent_needed = 1 - kill_percent;
								units_needed = Math.ceil(units_needed * percent_needed);

								queued_units[u_key] = units_needed;
								return queued_units;

							}
							catch (e)
							{
							}

						}
					},
					getTroopsNeeded                :function (dungeon_name, dungeon_level, dungeon_progress, units)
					{
						var units_min = this.getUnitsPerDungeon();
						var kill_percent = 0.0;
						var queued_units = {};
						for (var u_key in units)
						{
							// TODO - Figure out a good way to combine berserkers and/or rangers with guardians
							/*if (u_key == 4 || u_key == 3) {
							              continue;
							            }*/
							var unit = units[u_key];
							//GM_log(u_key);
							if (unit['count'] > 0)
							{
								try
								{
									var units_needed = units_min[dungeon_name][u_key][dungeon_level - 1];
									units_needed = Math.round((dungeon_progress * 0.02 + 1.1) * units_needed);
									//units_needed = Math.round(;  
									// GM_log(unit['count']+" - "+ units_needed);             
									var this_kill_percent = unit['count'] / units_needed;
									var total_kill = this_kill_percent + kill_percent;
									if (total_kill >= 1)
									{
										// We have enough, return the queued units
										var percent_needed = 1 - kill_percent;
										units_needed = Math.ceil(units_needed * percent_needed);

										queued_units[u_key] = units_needed;
										return queued_units;
									}
									else
									{
										// Otherwise, let's add these to the queued units
										queued_units[u_key] = unit['count'];
										kill_percent += this_kill_percent;
									}
								}
								catch (e)
								{

								}
							}
						}
						return false;
					},
					_shouldBeIncluded              :function (city)
					{
						return true;
					},
					_handleCellClick               :function (event)
					{
						var row = event.getRow();
						var column = event.getColumn();
						var rowData = this._tableModel.getRowDataAsMap(row);
						var cityId = rowData["id"];
						var row_info = rowData["row_info"];
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						switch (column)
						{
							case 5:
								LT.a.setMainView("c", cityId, -1, -1);
								break;
							case 4:
								var dungeon = row_info['dungeon'];
								LT.a.setMainView('r', 0, dungeon['x'] * LT.a.visMain.getTileWidth(), dungeon['y'] * LT.a.visMain.getTileHeight());
								break;
							case 9:
								// Send the proper units from the correct city to the correct boss
								var lou_suite = window.louSuite.main.getInstance();
								var dungeon = row_info['dungeon'];
								var city = row_info['city'];
								var units = row_info['units'];
								var units_to_send = [];

								for (var u_key in units)
								{
									units_to_send.push({t:u_key, c:units[u_key]});
								}

								this._tableModel.setValue(column, row, "");
								lou_suite.sendTroops(lou_suite.LS_RAID, cityId, dungeon['x'], dungeon['y'], units_to_send, lou_suite.LS_RAID_REPEAT, this.onTroopsSent);
								break;
						}
					},
					onTroopsSent                   :function (event, v)
					{
						if (event.getContent() == null)
						{
							console.log('invalid');
							return;
						}
						var message = "";
						var code = event.getContent();
						//console.log("Code Received: " + code);
						switch (code.r1)
						{
							case 0:
								// Success
								var lou_suite = window.louSuite.main.getInstance();
								var selectedContinent = lou_suite.dungeon_raider.sbContinents.getSelection()[0].getModel();

								// Subtract units sent from city
								var city_id = v['cid'];
								var units_sent = v['units'];
								for (var u_key in units_sent)
								{
									var unit = units_sent[u_key];
									var total = lou_suite.cities[city_id]['units'][unit['t']]['count'];
									total = total - unit['c'];
									lou_suite.cities[city_id]['units'][unit['t']]['count'] = total;
								}

								// Save the city
								bos.Storage.getInstance().saveCity(lou_suite.cities[city_id]);

								// Update the view
								lou_suite.dungeon_raider.updateView();
								return;
								break;
							case 4: // Not enough units
								message = "Pas assez d'unités. Essayez une nouvelle analyse de la ville.";
								break;
							case 64: // No more command slots
								message = "Maximum d'ordre atteint. Utilisez une autre ville.";
								break;
							default:
								message = "Erreur inconnue: " + code;
								break;
						}

						// Failed
						console.log("Failed with status code " + code);

						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.dungeon_raider.sbContinents.getSelection()[0].getModel();

						if (message)
						{
							lou_suite.setMessage(message);
						}

						// Update the view
						lou_suite.dungeon_raider.updateView();
					},
					createCitiesContinentsSelectBox:function ()
					{
						var sb = new qx.ui.form.SelectBox().set({
							width :60,
							height:28
						});
						var cities = webfrontend.data.Player.getInstance().cities;

						sb.setToolTipText("Trier par: <b>continents</b>");

						var continents = [];
						var numOfMostPopularCont=0;
						var popularityHighScore = 0;
						for (var cityId in cities)
						{
							var city = cities[cityId];
							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
							if(typeof continents["c" + cont] != 'undefined')
							{
								continents["c" + cont] ++;   //count cities, pick biggest
							}
							else
							{
								continents["c" + cont] = 1;
							}
							if( (continents["c" + cont])>popularityHighScore)
							{
								popularityHighScore=continents["c" + cont];
								numOfMostPopularCont=cont;
							}

						}

						var list = [];
						for (var key in continents)
						{
							if (key.substring != undefined && qx.lang.Type.isString(key))
							{
								var cont = parseInt(key.substring(1), 10);
								if (!isNaN(cont))
								{
									list.push(cont);
								}
							}
						}

						list.sort();

						for (var i = 0; i < list.length; i++)
						{
							var cont = list[i];
							var Citem = new qx.ui.form.ListItem("C" + cont, null, cont);
							sb.add(Citem);
							if(cont==numOfMostPopularCont)
							{
								sb.setSelection([Citem]);
							}
						}

						return sb;
					},
					_createToolBar                 :function ()
					{
						// TODO - Add a selector for repeat or non-repeat
						var toolBar = new qx.ui.groupbox.GroupBox();
						toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

						this.sbContinents = this.createCitiesContinentsSelectBox();
						this.sbContinents.addListener("changeSelection", function (evt)
						{
							this.updateView();
						}, this);
						toolBar.add(this.sbContinents);

						this.sbLevel = new qx.ui.form.SelectBox().set({
							width :70,
							height:28
						});

						this.sbLevel.setToolTipText("Trier par: <b>niveau min</b>");

						var min_level = localStorage.getItem("lou_suite_min_level");

						if (typeof min_level == 'undefined')
						{
							min_level = 1;
						}

						var levels_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

						for (var i = 1; i < 10; i++)
						{
							var item = new qx.ui.form.ListItem("Level " + i, null, i);
							this.sbLevel.add(item);
							if (i == min_level)
							{
								this.sbLevel.setSelection([item]);
							}
						}

						this.sbLevel.addListener("changeSelection", function (evt)
						{
							localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
							this.updateView();
						}, this);
						toolBar.add(this.sbLevel);

						var btnViewRegion = new qx.ui.form.Button("Vue Region");
						btnViewRegion.setWidth(90);
						toolBar.add(btnViewRegion);
						btnViewRegion.addListener("execute", function (evt)
						{
							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							window.louSuite.main.getInstance().moveToContRegion(selectedContinent, 4);
							this.updateView();
						}, this);

						this.btnUpdateView = new qx.ui.form.Button("Scan");
						this.btnUpdateView.setWidth(80);
						toolBar.add(this.btnUpdateView);
						this.btnUpdateView.addListener("execute", function (evt)
						{
							window.louSuite.main.getInstance().scanRegion();
							this.btnUpdateView.setEnabled(false);
							this.updateView();
						}, this);
						this.btnUpdateView.setEnabled(false);

						var btnRecount = new qx.ui.form.Button("Analyse des troupes");
						btnRecount.setWidth(120);
						toolBar.add(btnRecount);
						btnRecount.addListener("execute", function (evt)
						{
							var server = new bos.Server();

							var citiesIds = [];

							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							// Limit by selected continent
							for (var cityId in LT.player.cities)
							{
								c = LT.player.cities[cityId];

								if (c == null)
								{
									continue;
								}

								var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
								// Check that the city is on the right continent
								if (city_cont != selectedContinent)
								{
									continue;
								}
								citiesIds.push(cityId);
							}
							server.pollCities(citiesIds);

							this.updateView();
						}, this);
						//edit by philokei: add checkbox for show all
						this.chkViewAll = new qx.ui.form.CheckBox("All");
						this.chkViewAll.setWidth(30);

						this.chkViewAll.addListener("execute", function (evt)
						{
							this.updateView();

						}, this);
						toolBar.add(this.chkViewAll);

						//edit by philokei: ad dropdown for the fields
						this.sbField = new qx.ui.form.SelectBox().set({
							width :70,
							height:28
						});

						this.sbField.setToolTipText("Distance max <b>du chateau</b>");

						for (var i = 1; i <= 20; i++)
						{
							var itemField = new qx.ui.form.ListItem("champs " + i, null, i);
							this.sbField.add(itemField);
							if (i == 20)
							{
								this.sbField.setSelection([itemField]);
							}

						}
						this.sbField.addListener("changeSelection", function (evt)
						{
							this.updateView();
						}, this);
						toolBar.add(this.sbField);

						return toolBar;
					}
				}
			});
			qx.Class.define("lou_suite.gui.BossRaider", {
				extend   :bos.gui.SummaryPage,
				construct:function ()
				{
					var lou_suite = window.louSuite.main.getInstance();
					lou_suite.boss_raider = this;
					bos.gui.SummaryPage.call(this);
					this.setLabel("Raid Boss");
					this.setLayout(new qx.ui.layout.VBox(10));
					this.add(this._createToolBar());
					this._tableModel = new qx.ui.table.model.Simple();
					var columnNames = [ "Id", "Ligne Info", "Type", "Niveau", "Pos", "Name", "Distance", "Unités", "Actions"];
					var columnIds = ["id", "row_info", "boss_type", "boss_level", "position", "name", "distance", "units", "actions"];

					this._tableModel.setColumns(columnNames, columnIds);

					this._setupSorting(this._tableModel);
					this._tableModel.sortByColumn(4, true);

					var custom = {
						tableColumnModel:function (obj)
						{
							return new qx.ui.table.columnmodel.Resize(obj);
						}
					};

					this.table = new bos.ui.table.Table(this._tableModel, custom);
					this.table.addListener("cellClick", this._handleCellClick, this);

					var columnModel = this.table.getTableColumnModel();

					columnModel.setColumnVisible(0, false);
					columnModel.setColumnVisible(1, false);
					columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.ClickableLook());
					columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());

					var tcm = this.table.getTableColumnModel();
					var resizeBehavior = tcm.getBehavior();
					resizeBehavior.setWidth(2, 60);
					resizeBehavior.setWidth(3, 20);
					resizeBehavior.setWidth(4, 50);
					resizeBehavior.setWidth(5, 100);
					resizeBehavior.setWidth(6, 70);
					resizeBehavior.setWidth(7, 80);
					resizeBehavior.setWidth(8, "1*");
					resizeBehavior.setMinWidth(8, 100);

					this.add(this.table, {flex:1});
				},
				members  :{
					sbContinents                   :null,
					btnUpdateView                  :null,
					sbLevel                        :null,
					classicView                    :function ()
					{
						this.btnUpdateView.setEnabled(LT.a.visMain.mapmode == "r");

						var rowData = [];
						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						var min_level = this.sbLevel.getSelection()[0].getModel();

						// Refresh the city list to get new troop counts
						lou_suite.scanAllCities();

						// First get all the bosses in the area for the continent we are working with
						var bosses = lou_suite.bosses;
						for (var b_key in bosses['c' + selectedContinent])
						{
							var boss = bosses['c' + selectedContinent][b_key];
							if (boss['state'] && (boss['level'] >= min_level))
							{
								// Then get all the cities on that continent that can hit that boss
								// Show the distance for the city to hit the boss

								for (var cityId in LT.player.cities)
								{
									c = LT.player.cities[cityId];

									if (c == null)
									{
										continue;
									}

									var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
									// Check that the city is on the right continent
									if (city_cont != selectedContinent)
									{
										continue;
									}

									var city = lou_suite.cities[cityId];
									if (city == undefined)
									{
										continue;
									}

									// Check that the city has enough troops to hit the boss
									if (city.getUnitCount() == 0)
									{
										continue;
									}

									var units = lou_suite.getCityUnits(cityId);
									// Check that there are enough units to send for this boss
									var units_to_send = this.getTroopsNeeded(boss['type'], boss['level'], units);
									if (typeof(units_to_send) == 'object')
									{
										var row = [];

										var units_string = "";
										for (var u_key in units_to_send)
										{
											units_string = units_string + " " + units_to_send[u_key] + " " + units[u_key]['name'];
										}

										this._addBlankValuesToRow(row, this._tableModel);
										row["units"] = units_string;
										row["id"] = cityId;
										row["row_info"] = {
											units:units_to_send,
											boss :boss,
											city :c
										};
										row["name"] = c.name;
										var diffX = Math.abs(c.xPos - boss['x']);
										var diffY = Math.abs(c.yPos - boss['y']);
										row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
										row["position"] = boss['x'] + ":" + boss['y'];
										row["boss_type"] = boss['type'];
										row["boss_level"] = boss['level'];
										row["actions"] = "Envoyer";

										rowData.push(row);
									}
								}
							}
						}

						return rowData;
					},
					createRowData                  :function ()
					{
						return this.classicView();
					},
					getUnitsPerBoss                :function ()
					{
						var units = {
							Dragon :{
								6 :[50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000], // Berserker
								3 :[84, 500, 3334, 6667, 16667, 25000, 33334, 50000, 75000, 100000], // Ranger
								5 :[100, 600, 4000, 8000, 20000, 30000, 40000, 60000, 90000, 120000], // Templar
								9 :[42, 250, 1700, 3300, 8300, 12500, 17000, 25000, 37500, 50000], // Crossbowmen
								11:[19, 112, 756, 1467, 3689, 5556, 7556, 11112, 16667, 22223], // Knight
								7 :[36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858], // Mage
								12:[21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 250000], // Warlock
								10:[28, 167, 1134, 2200, 5534, 8334, 11334, 16667, 25000, 33334] // Paladin
							},
							Moloch :{
								6 :[50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000], // Berserker
								3 :[84, 500, 3334, 6667, 16667, 25000, 33334, 50000, 75000, 100000], // Ranger
								5 :[100, 600, 4000, 8000, 20000, 30000, 40000, 60000, 90000, 120000], // Templar
								9 :[63, 375, 2500, 5000, 12500, 18750, 25000, 37500, 56250, 75000], // Crossbowmen
								11:[28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334], // Knight
								7 :[24, 143, 972, 1886, 4743, 7143, 9715, 14286, 21429, 28572], // Mage
								12:[14, 84, 567, 1100, 2767, 4167, 5667, 8664, 12500, 16667], // Warlock
								10:[42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000] // Paladin
							},
							Hydra  :{
								6 :[34, 200, 1360, 2640, 6640, 10000, 13600, 20000, 30000, 40000], // Berserker
								3 :[56, 334, 2267, 4400, 11067, 16667, 22667, 33334, 50000, 66667], // Ranger
								5 :[68, 400, 2720, 5280, 13280, 20000, 27200, 40000, 60000, 80000], // Templar
								9 :[63, 375, 2500, 5000, 12500, 18750, 25000, 37500, 56250, 75000], // Crossbowmen
								11:[28, 167, 1112, 2223, 5556, 8334, 11112, 16667, 25000, 33334], // Knight
								7 :[36, 215, 1429, 2858, 7143, 10715, 14286, 21429, 32143, 42858], // Mage
								12:[21, 125, 834, 1667, 4167, 6250, 8334, 12500, 18750, 250000], // Warlock
								10:[42, 250, 1667, 3334, 8334, 12500, 16667, 25000, 37500, 50000] // Paladin
							},
							Octopus:{
								16:[2, 9, 57, 110, 277, 417, 567, 834, 1250, 1667], // Sloop
								15:[1, 4, 23, 44, 111, 167, 227, 334, 500, 667], // Frigate
								17:[1, 1, 6, 11, 28, 42, 57, 84, 125, 167] // War Galleon
							}
						};

						// Apply the research and shrine bonuses
						var tech = webfrontend.data.Tech.getInstance();

						for (var boss_id in units)
						{
							var unit_counts = units[boss_id];

							for (var unit_id in unit_counts)
							{
								unit_count = unit_counts[unit_id];
								var bf = tech.getBonus("unitDamage", webfrontend.data.Tech.research, parseInt(unit_id));
								var be = tech.getBonus("unitDamage", webfrontend.data.Tech.shrine, parseInt(unit_id));
								var bonus = bf + be;
								for (var i = 0; i < unit_count.length; i++)
								{
									var units_needed = units[boss_id][unit_id][i];
									var new_units_needed = Math.ceil(units_needed / (1 + (bonus / 100)));
									units[boss_id][unit_id][i] = new_units_needed;
								}
							}
						}

						return units;
					},
					getTroopsNeeded                :function (boss_name, boss_level, units)
					{
						var units_min = this.getUnitsPerBoss();
						var kill_percent = 0.0;
						var queued_units = {};

						for (var u_key in units)
						{
							var unit = units[u_key];
							if (unit['count'] > 0)
							{
								try
								{
									var units_needed = units_min[boss_name][u_key][boss_level - 1];
									var this_kill_percent = unit['count'] / units_needed;
									var total_kill = this_kill_percent + kill_percent;
									if (total_kill >= 1)
									{
										// We have enough, return the queued units
										var percent_needed = 1 - kill_percent;
										units_needed = Math.ceil(units_needed * percent_needed);

										queued_units[u_key] = units_needed;
										return queued_units;
									}
									else
									{
										// Otherwise, let's add these to the queued units
										queued_units[u_key] = unit['count'];
										kill_percent += this_kill_percent;
									}
								}
								catch (e)
								{

								}
							}
						}

						// If we got this far, there isn't enough units to hit that boss
						return false;
					},
					_shouldBeIncluded              :function (city)
					{
						return true;
					},
					_handleCellClick               :function (event)
					{
						var row = event.getRow();
						var column = event.getColumn();
						var rowData = this._tableModel.getRowDataAsMap(row);
						var cityId = rowData["id"];
						var row_info = rowData["row_info"];
						var selectedContinent = this.sbContinents.getSelection()[0].getModel();
						switch (column)
						{
							case 5:
								LT.a.setMainView("c", cityId, -1, -1);
								break;
							case 4:
								var boss = row_info['boss'];
								LT.a.setMainView('r', 0, boss['x'] * LT.a.visMain.getTileWidth(), boss['y'] * LT.a.visMain.getTileHeight());
								break;
							case 8:
								// Send the proper units from the correct city to the correct boss
								var lou_suite = window.louSuite.main.getInstance();
								var boss = row_info['boss'];
								var city = row_info['city'];
								var units = row_info['units'];
								var units_to_send = [];

								for (var u_key in units)
								{
									units_to_send.push({t:u_key, c:units[u_key]});
								}

								// Show some kind of progress thing
								this._tableModel.setValue(column, row, "");
								lou_suite.sendTroops(lou_suite.LS_RAID, cityId, boss['x'], boss['y'], units_to_send, lou_suite.LS_RAID_ONCE, this.onTroopsSent);
								break;
						}
					},
					onTroopsSent                   :function (event, v)
					{
						console.log(v);
						if (event.getContent() == null)
						{
							console.log('invalid');
							return;
						}
						var message = "";
						var removeBoss = true;
						var code = event.getContent();
						//console.log("Code Received: " + code);
						switch (code.r1)
						{
							case 0:
								// Success
								var lou_suite = window.louSuite.main.getInstance();
								var selectedContinent = lou_suite.boss_raider.sbContinents.getSelection()[0].getModel();

								// Subtract units sent from city
								var city_id = v['cid'];
								var units_sent = v['units'];
								for (var u_key in units_sent)
								{
									var unit = units_sent[u_key];
									var total = lou_suite.cities[city_id]['units'][unit['t']]['count'];
									total = total - unit['c'];
									lou_suite.cities[city_id]['units'][unit['t']]['count'] = total;
								}

								// Save the city
								bos.Storage.getInstance().saveCity(lou_suite.cities[city_id]);

								if (removeBoss)
								{
									// Mark the boss as taken
									lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
								}

								// Update the view
								
								
								lou_suite.boss_raider.updateView();
								return;
								break;
							case 33554436: // Already ordered
								message = "Boss deja pris.";
								break;
							case 33554432: // Already ordered from a different castle
								message = "Boss deja pris.";
								break;
							case 16781312: // Dungeon is closed
								message = "Boss deja pris";
								break;
							case 4: // Not enough units
								message = "Pas assez d'unités. Essayez une nouvelle analyse de la ville.";
								removeBoss = false;
								break;
							case 64: // No more command slots
								message = "Maximum d'ordre atteint. Utilisez une autre ville.";
								removeBoss = false;
								break;
							default:
								message = "Erreur inconnue : " + code;
								break;
						}

						// Failed
						console.log("Failed with status code " + code);

						var lou_suite = window.louSuite.main.getInstance();
						var selectedContinent = lou_suite.boss_raider.sbContinents.getSelection()[0].getModel();

						if (message)
						{
							lou_suite.setMessage(message);
						}

						if (removeBoss)
						{
							// Mark the boss as taken
							lou_suite.bosses['c' + selectedContinent][v['x'] + '-' + v['y']]['state'] = false;
						}

						// Update the view
						lou_suite.boss_raider.updateView();
					},
					createCitiesContinentsSelectBox:function ()
					{
						var sb = new qx.ui.form.SelectBox().set({
							width :60,
							height:28
						});
						var cities = webfrontend.data.Player.getInstance().cities;

						sb.setToolTipText("Trier par: <b>continents</b>");

						var continents = [];
						var numOfMostPopularCont=0;
						var popularityHighScore = 0;
						for (var cityId in cities)
						{
							var city = cities[cityId];
							var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
							if(typeof continents["c" + cont] != 'undefined')
							{
								continents["c" + cont] ++;   //count cities, pick biggest
							}
							else
							{
								continents["c" + cont] = 1;
							}
							if( (continents["c" + cont])>popularityHighScore)
							{
								popularityHighScore=continents["c" + cont];
								numOfMostPopularCont=cont;
							}
						}


						var list = [];
						for (var key in continents)
						{
							if (key.substring != undefined && qx.lang.Type.isString(key))
							{
								var cont = parseInt(key.substring(1), 10);
								if (!isNaN(cont))
								{
									list.push(cont);
								}
							}
						}

						list.sort();

						//sb.add(new qx.ui.form.ListItem("All", null, "A"));
						for (var i = 0; i < list.length; i++)
						{
							var cont = list[i];
							var Citem =new qx.ui.form.ListItem("C" + cont, null, cont);
							sb.add(Citem);
							if(cont==numOfMostPopularCont)
							{
								sb.setSelection([Citem]);
							}
						}

						return sb;
					},
					_createToolBar                 :function ()
					{
						var toolBar = new qx.ui.groupbox.GroupBox();
						toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

						this.sbContinents = this.createCitiesContinentsSelectBox();
						this.sbContinents.addListener("changeSelection", function (evt)
						{
							this.updateView();
						}, this);
						toolBar.add(this.sbContinents);

						this.sbLevel = new qx.ui.form.SelectBox().set({
							width :70,
							height:28
						});

						this.sbLevel.setToolTipText("Trier par: <b>min niveaul</b>");

						var min_level = localStorage.getItem("lou_suite_min_level");

						if (typeof min_level == 'undefined')
						{
							min_level = 1;
						}

						var levels_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];

						for (var i = 1; i < 10; i++)
						{
							var item = new qx.ui.form.ListItem("Level " + i, null, i);
							this.sbLevel.add(item);
							if (i == min_level)
							{
								this.sbLevel.setSelection([item]);
							}
						}

						this.sbLevel.addListener("changeSelection", function (evt)
						{
							localStorage.setItem("lou_suite_min_level", this.sbLevel.getSelection()[0].getModel());
							this.updateView();
						}, this);
						toolBar.add(this.sbLevel);

						var btnViewRegion = new qx.ui.form.Button("Vue Region");
						btnViewRegion.setWidth(120);
						toolBar.add(btnViewRegion);
						btnViewRegion.addListener("execute", function (evt)
						{
							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							window.louSuite.main.getInstance().moveToContRegion(selectedContinent, 4);
							this.updateView();
						}, this);

						this.btnUpdateView = new qx.ui.form.Button("Scan");
						this.btnUpdateView.setWidth(80);
						toolBar.add(this.btnUpdateView);
						this.btnUpdateView.addListener("execute", function (evt)
						{
							window.louSuite.main.getInstance().scanRegion();
							this.btnUpdateView.setEnabled(false);
							this.updateView();
						}, this);
						this.btnUpdateView.setEnabled(false);

						var btnRecount = new qx.ui.form.Button("Analyse des troupes");
						btnRecount.setWidth(120);
						toolBar.add(btnRecount);
						btnRecount.addListener("execute", function (evt)
						{
							var server = new bos.Server();

							var citiesIds = [];

							var selectedContinent = this.sbContinents.getSelection()[0].getModel();
							// Limit by selected continent
							for (var cityId in LT.player.cities)
							{
								c = LT.player.cities[cityId];

								if (c == null)
								{
									continue;
								}

								var city_cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
								// Check that the city is on the right continent
								if (city_cont != selectedContinent)
								{
									continue;
								}
								citiesIds.push(cityId);
							}
							server.pollCities(citiesIds);

							this.updateView();
						}, this);

						return toolBar;
					}
				}
			});
		}

		function LT_checkIfLoaded()
		{
			try
			{
				if (qx === undefined || bos === undefined)
				{
					window.setTimeout(LT_checkIfLoaded, 1000);
				}
				else
				{
					if (typeof qx != 'undefined' && typeof bos != 'undefined')
					{
						a = qx.core.Init.getApplication(); // application
						c = a.getCityInfoView();
						wdst = webfrontend.data.ServerTime.getInstance().refTime;
						if (a && c && wdst)
						{
							createSuite();
							window.louSuite.main.getInstance().initialize();
						} else
							window.setTimeout(LT_checkIfLoaded, 1000);
					} else
					{
						window.setTimeout(LT_checkIfLoaded, 1000);
					}
				}
			} catch (e)
			{
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
			}
		}

		if (/lordofultima\.com/i.test(document.domain))
		{
			window.setTimeout(LT_checkIfLoaded, 25000);
		}
	}

	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var louSuiteScript = document.createElement("script");
	txt = LS_mainFunction.toString();
	louSuiteScript.innerHTML = "(" + txt + ")();";
	louSuiteScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louSuiteScript);
})();
