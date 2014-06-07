// ==UserScript==
// @name The-West Sweets IT
// @namespace TWSweets
// @date 9 November, 2012.
// @description TWSweets - mini-pack of Sh3l1's scripts.
// @author Programming, ru, eng langs - Sh3l1 aka Pil3p0m
// @author [Hungarian] – JackJeruk
// @author [Italian] - anto81
// @author [Polish] - 0ndra
// @author [Portuguese] - Marcos Bercke
// @author [Deutsch] - Hanya
// @author [French] - Lutte Finale 
// @author [Spanish] - pepe100
// @author [DE,FR] - some phrases from Google translate :D
// @author Deluxe Jobs Map - ПоросячийКот
// @version 0.6.5
// @include http://*.the-west.*
// @include http://*.beta.the-west.*
// @include http://zz1w1.tw.innogames.net/game.php*
// @exclude http://www.the-west.*
// @exclude http://forum.the-west.*
// ==/UserScript==	
	(function(fn) {
		var script = document.createElement('script');
		script.type = "application/javascript";
		script.textContent = '(' + fn + ')();\nTWSweets.Core.init();';
		document.body.appendChild(script);
		script.parentNode.removeChild(script);
	})(function() {
	  if(/http:\/\/.+\.the-west\..*\/game\.php.*/.test(window.location.href) && !window.hasOwnProperty("TWSweets")) { 

	  window.TWSweets = {
						version: "0.6.5",
						revision: 66,
						author_url: "http://sh3l1.koding.com/redirect?page=about",
						author_name: "Sh3l1",
						langs: {},
						Config: {},
						Core: {},
						DuelSafer: {
							GUI: {}
						},
						DX: {
							GUI: {},
							Loaded : {}
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
		dx_show_on_map : "Показать на карте",
		dx_transit_time : "Расстояние",
		dx_warning : "Использование данного скрипта может привести к <b>блокированию</b> вашего аккаунта со стороны администрации. Допускается использование <b>только</b> на русских серверах игры.<br /> Используйте на свой страх и риск.<br />Продолжить?",
		dx_jobs_types : ["Серебряные", "Золотые", "Все работы"],
		dx_jobs_list : "Список работ",
		dx_sort: [["Название", "Сортировать по названию работ"], ["Расстояние", "Сортировать по времени в пути"]],
		dx_input: ["Фильтр работ", "Название работы или продукт"],
		dx_update: "Обновить данные",
		dx_expired: "Загруженным данным уже более 8 часов, вероятно они устарели.<br/> Загрузить новые данные?",
		enable_select : "Выделение текста в 2.0",
		enable_select_title : "Включить возможность выделять мышью текст в 2.0",
		enable_town_button : "Включить кнопку \"Город\"",
		enable_town_title : "Добавляет справа кнопку <b>\"город\"</b>, которая содержит функции для быстрого управления \"городскими\" задачами. (Открыть сплетни, лечь спать в ближ. форт, рынок, церковь и т.п)",
		forum : "Сплетни",
		general : "Основные",
		HealthTL_to : "До полного восстановления здоровья: ",
		have_not_forts : "У тебя нет фортов!",
		main : "Главные настройки",
		market : "Рынок",
		name: "Русский",
		need_reload : "Требуется перезагрузка страницы. Выполнить?",
		own_saloon : "Cалун",
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
	  
	TWS.langs.de_DE = { 
		add : "Hinzufugen",  
		alliance : "Bundnis",  
		auto_update : "Nach Updates suchen",  
		auto_update_title : "Automatische Updates erlauben",  
		bank : "Bank",  
		chat_title : "Chat",  
		church : "Kirche",  
		default : "default",  
		dont_have_hotel: "Du hast noch kein Hotel!",  
		DuelSafer_ally : "Fremdes Bundnis angreifen",  
		DuelSafer_ally_text : "Dieser Spieler ist von einem fremden Bundnis. Willst du ihn angreifen?",  
		DuelSafer_already_have : "Es ist bereits in der Stadte / Bundnis - Liste vorhanden",  
		DuelSafer_found : "Duellspeicher",  
		DuelSafer_from_alliance : "Bundnis: ",  
		DuelSafer_from_town : "Stadt: ",  
		DuelSafer_input_alliance : "Bundnisname eingeben:",  
		DuelSafer_input_town : "Stadtname eingeben:",  
		DuelSafer_not_found : "Stadt / Bundnis nicht gefunden",  
		DuelSafer_own_alliance_text : "Du willst dein eigenes Bundnis angreifen. Bist du dir sicher?",  
		DuelSafer_own_town_text : "Du kannst deine eigene Stadt nicht angreifen!",  
		dx_show_on_map : "Auf der Karte anzeigen",  
		dx_transit_time : "Trans. Zeit",  
		dx_warning : "Der Administrator konnte die Verwendung des Scripts <b>verbieten</b>.<br /> Es wird empfohlen das Script <b> nur auf einem russische Server zu verwenden </ b>. Benutzung auf eigene Gefahr (Diese Funktion kann eine Sperrung deines Accounts hervorrufen). <br /> <br /> Fortfahren?",  
		dx_jobs_types : ["Silver Arbeitsplätze", "Gold Arbeitsplätze", "Alle Jobs"],
		dx_jobs_list : "Liste der Werke",
		dx_sort: [["Name", "Sortieren nach Name"], ["Distance", "Sortieren nach Abstand"]],
		dx_input: ["Der Filter von Werken", "Titel der Arbeit oder Produktnamen"],
		dx_update: "Daten aktualisieren",
		dx_expired: "Loaded Daten ist zu alt.<br/>Laden Sie die neue Daten?",
		enable_select : "Wahlbarer Text fur 2.0",  
		enable_select_title : "Wahlbaren Text in 2.0 aktivieren",  
		enable_town_button : "Erlauben \"Stadt\"",  
		enable_town_title : "Du kannst sofort die meisten Aufgaben in deiner Stadt mit diesem Skript verwalten. Das Hinzufugen des Buttons wird mit dem gleichen Namen auf der rechten Seite angezeigt. (z.B.: schlafen gehen, nachstes Fort, Markt, Kirche etc.)",  
		forum : "Forum",  
		general : "Allgemein",   
		have_not_forts : "Du hast noch keine Forts",  
		HealthTL_to : "Zeit zu vollen Lebenspunkten: ",  
		main : "Die wichtigsten Einstellungen",  
		market : "Markt",  
		name: "Deutsch",
		need_reload : "Die Seite muss neu geladen werden. Willst du das tun?",  
		own_saloon : "Eigener Saloon",  
		patches_title : "Patches (Modifikationen)",  
		revision_current : "aktuelle Version",  
		revision_new : "neue Version",  
		settings : "Einstellungen",  
		settings_reload : "Die meisten Einstellungen erfordern das neue Laden der Seite. (F5)",  
		sheriff : "Sheriff",  
		sleep_in_fort : "In der Kaserne schlafen",  
		sleep_in_hotel : "Im eigenen Hotel schlafen",  
		switch_on : "Erlauben",  
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
	  
	TWS.langs.en_US = {
		add : "Add",
		alliance : "Alliance",
		auto_update : "Check for updates",
		auto_update_title : "Allow to checking updates automatically",
		bank : "Bank",
		church : "Church",
		default : "Default",
		dont_have_hotel: "You don't have a hotel!",
		DuelSafer_ally : "Ally attacking",
		DuelSafer_ally_text : "This player is ally. Attack him anyway?",
		DuelSafer_already_have : "It is already exist in the towns/alliances list",
		DuelSafer_found : "DuelSafer.",
		DuelSafer_from_alliance : "Alliance: ",
		DuelSafer_from_town : "Town: ",
		DuelSafer_input_alliance : "Enter the name of alliance:",
		DuelSafer_input_town : "Enter the name of the town:",
		DuelSafer_not_found : "Not found town/alliance",
		DuelSafer_own_alliance_text : "You're want to attack own alliance! Seriously?",
		DuelSafer_own_town_text : "It's your town!! You can't attack own town!",
		dx_show_on_map : "Show on map",
		dx_transit_time : "Distance",
		dx_warning : "Administration could <b>ban</b> you while using this script.<br /> It is recommended to use script <b>only on Russian servers</b>. Use it at your own liability.<br /><br /> Continue?",
		dx_jobs_types : ["Silver jobs", "Gold jobs", "All jobs"],
		dx_jobs_list : "List of works",
		dx_sort: [["Name", "Sort by name"], ["Distance", "Sort by distance"]],
		dx_input: ["The filter of works", "Title of work or product."],
		dx_update: "Update data",
		dx_expired: "Loaded data is too old.<br/> Download new data?",
		enable_select : "Selectable text for 2.0",
		enable_select_title : "Enable selectable text in 2.0",
		enable_town_button : "Enable button \"Town\"",
		enable_town_title : "You can instantly manage most of tasks in your Town with this script, which is adding the button with the same name to the right side. (E.g.: Open rumors, go sleep to the nearest fort, market, church e t.c.)",
		forum : "Forum",
		general : "General",
		have_not_forts : "You don't have any forts",
		HealthTL_to : "Time to full health: ",
		main : "Main settings",
		market : "Market",
		name: "English",
		need_reload : "The page needs to be reloaded. Proceed?",
		own_saloon : "Own saloon",
		patches_title : "Patches (Modifications)",
		revision_current : "Current revision",
		revision_new : "New revision",
		settings : "Settings",
		settings_reload : "Most of the settings requires page reloading",
		sheriff : "Sheriff",
		sleep_in_fort : "Sleep in the barracks",
		sleep_in_hotel : "Sleep in the own hotel",
		switch_on : "Enable",
		to_last_page : "Go to the last page",
		town : "The town",
		update_found : "New version of TWSweets!",
		update_found_html : "TWSweets has found new version of the script. Install it?",
		version_current : "Current version",
		version_new : "New version",
		wir_enabler : "Inventory Reducer.",
		wir_on_line : "on one line",
		wir_on_one_line : "Number of items on one line:",
		without_city : "You haven't city!",
		your_character: "Your character"
	};
	
    TWS.langs.es_ES = {
		add : "Anadir",  
		alliance : "Alianza",  
		auto_update : "Comprobar si hay actualizaciones",  
		auto_update_title : "Permitir la comprobacion de actualizaciones de forma automatica",  
		bank : "Banco",      
		church : "Iglesia",  
		default : "Por defecto",  
		dont_have_hotel: "Usted no tiene un hotel!",  
		DuelSafer_ally : "Atacando aliado",  
		DuelSafer_ally_text : "Este jugador es un aliado. ?Atacarlo de todas formas?",  
		DuelSafer_already_have : "Ya existe en la lista de ciudades/alianzas",  
		DuelSafer_found : "Duelo mas seguro.",  
		DuelSafer_from_alliance : "Alianza: ",  
		DuelSafer_from_town : "Ciudad: ",  
		DuelSafer_input_alliance : "Introduzca el nombre de la alianza:",  
		DuelSafer_input_town : "Introduzca el nombre de la ciudad:",  
		DuelSafer_not_found : "Ciudad/Alianza no encontrada",  
		DuelSafer_own_alliance_text : "Quiere atacar a su propia alianza! En serio?",  
		DuelSafer_own_town_text : "Es tu ciudad!! No puedes atacar a tu propia ciudad!",  
		dx_show_on_map : "Mostrar en el mapa",  
		dx_transit_time : "Distancia",  
		dx_warning : "La administracion podria <b>banearle</b> durante el uso de este script.<br /> Es recomendable usar este script <b>solo en servidores rusos</b>. Uselo bajo su propia responsabilidad.<br /><br /> ?Continuar?",  
		dx_jobs_types : ["Trabajos Bonus-Plata", "Trabajos Bonus-Oro", "Todos trabajos"],
		dx_jobs_list : "Lista de trabajos",
		dx_sort: [["Nombre", "Clasificar por nombre"], ["Distancia", "Clasificar por distancia"]],
		dx_input: ["El filtro de trabajos", "Titulo del trabajo o producto."],
		dx_update: "Actualizar los datos",
		dx_expired: "Datos cargados muy antiguos. Descargar nuevos datos?",
		enable_select : "Texto seleccionable para 2.0",  
		enable_select_title : "Activar texto seleccionable en 2.0",  
		enable_town_button : "Activar boton \"Ciudad\"",  
		enable_town_title : "En cualquier momento puede manejar la mayoria de las tareas en su ciudad con este script, que anade el boton con el mismo nombre en el lado derecho. (Ejemplo: Abrir rumores, ir a dormir al fuerte mas cercano, mercado, iglesia, etc.)",  
		forum : "Foro",  
		general : "General",    
		have_not_forts : "No tiene ningun fuerte",  
		HealthTL_to : "Tiempo para salud completa: ",  
		main : "Ajustes principales",  
		market : "Mercado",
		name: "Español",  
		need_reload : "La pagina necesita ser recargada. ?Continuar?",  
		own_saloon : "Salon propio",  
		patches_title : "Parches (Modificaciones)",   
		revision_current : "Revision actual",  
		revision_new : "Nueva revision",  
		settings : "Ajustes",  
		settings_reload : "La mayoria de los ajustes requiere recargar la pagina",  
		sheriff : "Sherif",  
		sleep_in_fort : "Dormir en las barracas",  
		sleep_in_hotel : "Dormir en el hotel propio",  
		switch_on : "Activar",  
		to_last_page : "Ir a la ultima pagina",  
		town : "La ciudad",  
		update_found : "Nueva version de TWSweets!",  
		update_found_html : "TWSweets ha encontrado una nueva version del script. ?Instalarlo?",  
		version_current : "Version actual",  
		version_new : "Nueva version",  
		wir_enabler : "Reductor de Inventario.",  
		wir_on_line : "en una linea",  
		wir_on_one_line : "Numero de articulos en una linea:",  
		without_city : "Usted no tiene una ciudad!",  
		your_character: "Su caracter"  
    };	
	  
	TWS.langs.fr_FR = {
		add : "Ajouter",
		alliance : "Alliance",
		auto_update : "Maj Auto",
		auto_update_title : "Autoriser auto MAJ",
		bank : "Banque",
		church : "Eglise",
		default : "Defaut",
		dont_have_hotel: "Tu n'as pas d'hotel",
		DuelSafer_ally : "Attaque Alliee",
		DuelSafer_ally_text : "Ce joueur est allie, l'attaquer quand meme?",
		DuelSafer_already_have : "Deja present dans les listes Alliances/Villes",
		DuelSafer_found : "Duels Securises",
		DuelSafer_from_alliance : "Alliance: ",
		DuelSafer_from_town : "Ville: ",
		DuelSafer_input_alliance : "Entrer nom de l'alliance:",
		DuelSafer_input_town : "Entrer nom de la ville:",
		DuelSafer_not_found : "Ville/Alliance non trouvee",
		DuelSafer_own_alliance_text : "Tu veux vraiment attaquer ta propre alliance?",
		DuelSafer_own_town_text : "C'est ta ville, laisses tomber",
		dx_show_on_map : "Montrer sur la map",
		dx_transit_time : "Arrivee dans",
		dx_warning : "Ils pourraient te bannir, mais honnetement, on s'en fout ;)",
		dx_jobs_types : ["Emplois argent", "Emplois d'or", "Tous les emplois"],
		dx_jobs_list : "Liste des œuvres",
		dx_sort: [["Nom", "Trier par nom"], ["Distance", "Classer par distance"]],
		dx_input: ["Le filtre de travaux", "Titre de l'œuvre ou du produit"],
		dx_update: "Les données mise à jour",
		dx_expired: "Données chargées est trop vieux.<br/> Télécharger de nouvelles données?",
		enable_select : "Texte Selectionnable",
		enable_select_title : "Active la possibilite de surligner le texte",
		enable_town_button : "Active le bouton \"Ville\"",
		enable_town_title : "Permet de prevoir/activer des taches automatiques (dormir a l'hotel, au fort, ouvrir le sheriff...",
		forum : "Forum",
		general : "Parametres",
		have_not_forts : "Pas de forts",
		HealthTL_to : "Temps avant rege PV: ",
		main : "Options",
		market : "Marche",
		name: "Français",
		need_reload : "La page doit etre rafraichie, proceder? ",
		own_saloon : "Propre saloon",
		patches_title : "Patches (Modifications)",
		revision_current : "Revision actuelle ",
		revision_new : "Nouvelle revision",
		settings : "Reglages",
		settings_reload : "La majorite des reglages recquierent rafraichissement",
		sheriff : "Sheriff",
		sleep_in_fort : "Dormir a la caserne",
		sleep_in_hotel : "Dormir a l'hotel",
		switch_on : "Activer",
		to_last_page : "Derniere page",
		town : "Ville",
		update_found : "Nouvelle version de TWSweets disponible",
		update_found_html : "TWSweets a trouve une nouvelle version du script",
		version_current : "Version actuelle",
		version_new : "Nouvelle version",
		wir_enabler : "Reducteur d'inventaire",
		wir_on_line : "Sur une ligne",
		wir_on_one_line : "Nombre d'item sur une ligne: ",
		without_city : "Pas de ville",
		your_character: "Ton perso"
	};
	  
	TWS.langs.it_IT = {
		add : "Aggiungere",
		alliance : "Alleanza",
		auto_update : "Verificare la presenza di aggiornamenti",
		auto_update_title : "Permettere il controllo automatico degli aggiornamenti",
		bank : "Banca",
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
		dx_show_on_map : "Visualizza sulla mappa",
		dx_transit_time : "Distanza",
		dx_warning : "L'amministrazione potrebbe vietare l'utilizzo di questo script. Si consiglia di utilizzare lo script solo sui server russi. Usatelo a vostro rischio e pericolo! Continuare?",
		dx_jobs_types : ["Lavori argento", "Lavori oro", "Tutti i lavori"],
		dx_jobs_list : "Elenco dei lavori",
		dx_sort: [["Nome", "Ordina per nome"], ["Distanza", "Ordina per distanza"]],
		dx_input: ["Il filtro dei lavori", "Nome del lavoro o del prodotto."],
		dx_update: "Aggiornare i dati",
		dx_expired: "I dati caricati sono vecchi.<br/> Scaricare i nuovi dati?",
		enable_select : "Testo selezionabile per 2.0",
		enable_select_title : "Abilita testo selezionabile in 2.0",
		enable_town_button : "Attiva pulsante  \"Citta\"",
		enable_town_title : "Con questo script si puo immediatamente gestire la maggior parte dei compiti della tua citta, grazie all'aggiunta del pulsante citta sul lato destro. (Es.: voci aperte, andare a dormire al piu vicino forte, mercato, chiesa ecc.)",
		forum : "Forum",
		general : "Generale",
		have_not_forts : "Non ci sono forti",
		HealthTL_to : "Recupero totale della salute in: ",
		main : "Impostazioni principali",
		market : "Mercato",
		name: "Italiano",
		need_reload : "La pagina ha bisogno di essere ricaricata. Procedere?",
		own_saloon : "Proprio saloon",
		patches_title : "Patch (Modifiche)",
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
	
	TWS.langs.hu_HU ={  
		add : "Hozzáadás",  
		alliance : "Szövetség",  
		auto_update : "Frissítés keresése",  
		auto_update_title : "Bekapcsolásával minden betöltődéskor automatikusan ellenőrzi, hogy jelent-e meg a script-ből újabb verzió ( ajánlott beállítás )",  
		bank : "Bank",    
		church : "Ima",  
		default : "Alapbeállítás",  
		dont_have_hotel: "Nincs Hoteled!",  
		DuelSafer_ally : "Szövetséges megtámadása",  
		DuelSafer_ally_text : "Ez a Játékos a Szövetségesed! Mindenképpen megtámadod?",  
		DuelSafer_already_have : "Ez a Város/Szövetség már szerepel a listán!",  
		DuelSafer_found : "Párbaj-segéd.",  
		DuelSafer_from_alliance : "Szövetség: ",  
		DuelSafer_from_town : "Város: ",  
		DuelSafer_input_alliance : "Írd be a Szövetség nevét:",  
		DuelSafer_input_town : "Írd be a Város nevét:",  
		DuelSafer_not_found : "Ez a Város/Szövetség nem található!",  
		DuelSafer_own_alliance_text : "A szövetségesed akarod megtámadni! Komolyan gondolod??",  
		DuelSafer_own_town_text : "Ő a telekszomszédod! Nem támadhatod meg!",  
		dx_show_on_map : "Mutasd a Térképen!",  
		dx_transit_time : "Távolság",  
		dx_warning : "Nem minden szerveren/országban megengedett a script használata,<br /><b>akár ki is tilthatnak miatta, ami karaktered törlésével is járhat!</b><br>A script orosz szerverekre készült eredetileg, ott nem tiltott.<br>Mindezek ismeretében csakis saját felelősségedre használd más szervereken!<br /><br /> Akarod még használni?",  
		dx_jobs_types : ["Csak az Ezüst munkák", "Csak az Arany munkák", "Arany és Ezüst munkák"],  
		dx_jobs_list : "Munkák listája",  
		dx_sort: [["Név", "Rendezés Név alapján"], ["Távolság", "Rendezés Távolság alapján"]],  
		dx_input: ["Szűrés Munkára", "Munka vagy Termék megnevezése."],  
		dx_update: "Adatok frissítése",  
		dx_expired: "A jelenlegi adatok túl régiek.<br/> Frissítsem az adatokat?",  
		enable_select : "Szöveg kijelölés/másolás engedélyezése ( v2.0 )",  
		enable_select_title : "A v2.0 verzió óta a játékban a legtöbb helyen nem lehet egérrel másoláshoz kijelölni a szöveges tartalmakat. Ezzel a funkcióval ez ismét elérhető.",  
		enable_town_button : "\"Városom\" gomb mutatása",  
		enable_town_title : "Engedélyezésével egy új gomb jelenik meg a jobb oldali Menüsoron, mellyel gyorsan hozzáférhetsz városod épületeihez, egy kattintással a legközelebbi Szövetséges Erődbe mehetsz aludni, stb.",  
		forum : "Fórum",  
		general : "Általános",  
		have_not_forts : "Nincsenek Erődjeid",  
		HealthTL_to : "Ennyi idő kell még mire felépülsz: ",  
		main : "Keretprogram beállítások",  
		market : "Piac",  
		name: "Magyar",  
		need_reload : "A változtatáshoz újra kell tölteni az oldalt! Mehet most?",  
		own_saloon : "Saját Kocsma",  
		patches_title : "Kényelmi funkciók beállításai",  
		revision_current : "Jelenlegi kiadás",  
		revision_new : "Új kiadás",  
		settings : "Beállítások",  
		settings_reload : "A legtöbb változtatás oldal-újratöltést ( F5 ) igényel!",  
		sheriff : "Sheriff",  
		sleep_in_fort : "Alvás Kaszárnyában",  
		sleep_in_hotel : "Alvás saját Hotelben",  
		switch_on : "Engedélyezve:",  
		to_last_page : "Ugrás az utolsó oldalra",  
		town : "Városom",  
		update_found : "TWSweets frissítés!",  
		update_found_html : "A TWSweets újabb verziója elérhető! Telepítsem?",  
		version_current : "Jelenlegi verzió",  
		version_new : "Új verzió",  
		wir_enabler : "Ezzel a funkcióval beállíthatod, hogy hány elem jelenjen meg soronként a Felszerelések ablakban.<br><br><b>TIPP:</b> A funkció bekapcsolásával nem csak a soronkénti darabszámot állíthatod be, hanem kényelmesebb gördítősávra cserélheted a Felszerelések ablak alján látható számozott, oldal-lapozó funkciót is.",  
		wir_on_line : "darab soronként",  
		wir_on_one_line : "Megjelenített darabszám:",  
		without_city : "Jelenleg egy Városnak sem vagy tagja!",  
		your_character: "Karaktered"  
	};
	
	TWS.langs.pl_PL = {  
		add : "Dodaj",  
		alliance : "Sojusz",  
		auto_update : "Sprawdź aktualizacje",  
		auto_update_title : "Automatycznie sprawdzaj czy pojawiła się nowa wersja",  
		bank : "Bank",    
		church : "Kościół",  
		default : "Domyślny",  
		delux_jobs : "Premiowane prace",  
		dont_have_hotel: "Nie posiadasz hotelu!",  
		duelsafer : "Bezpieczne pojedynki",  
		DuelSafer_ally : "Atak na sojusznika",  
		DuelSafer_ally_text : "Ten przeciwnik jest sojusznikiem. Chcesz go zaatakować?",  
		DuelSafer_already_have : "Te miasto/sojusz jest już dopisane do listy",  
		DuelSafer_found : "Bezpieczne pojedynki.",  
		DuelSafer_from_alliance : "Sojusz: ",  
		DuelSafer_from_town : "Miasto: ",  
		DuelSafer_input_alliance : "Wprowadź nazwę sojuszu:",  
		DuelSafer_input_town : "Wprowadź nazwę miasta:",  
		DuelSafer_not_found : "Nie znaleziono miast/sjuszu",  
		DuelSafer_own_alliance_text : "Atakujesz sojusznika!<br />Jesteś pewien?",  
		DuelSafer_own_town_text : "To jest Twoje miasto!! Nie możesz atakować własnych mieszkańców!",  
		dx_show_on_map : "Pokaż na mapie",  
		dx_transit_time : "Czas dojścia",  
		dx_warning : "Administracja może nałożyć <b>karę</b> za użycie tego skryptu.<br />Używanie tego skryptu zaleca się <b>TYLKO na Rosyjskim serwerze</b>. Używasz tylko na własną odpowiedzialność.<br /><br /> Kontynuować?",  
		dx_what_needed : "Jaką pracę szukasz?",  
		dx_jobs_types : ["Srebrne prace", "Złote prace", "Wszystkie prace"],  
		dx_jobs_list : "Lista prac",  
		dx_sort: [["Nazwa", "Sortuj według nazwy"], ["Odległość", "Sortuj według odległości"]],  
		dx_input: ["Filtr", "Podaj szukaną frazę"],  
		dx_update: "Aktualizowania danych",  
		dx_expired: "Załadowane dane są zbyt stare.<br/> Pobrać nowe dane?",  
		enable_select : "Zaznaczanie tekstu dla 2.0",  
		enable_select_title : "Możliwość zaznacznia teksty w wersji 2.0",  
		enable_town_button : "Włącz przycisk \"Miasto\"",  
		enable_town_title : "Za pomocą tego przycisku, otrzymujemy dostęp do wiekszości budynków w mieście.<br />Po prawej stronie zostanie dodany przycisk.<br />(Np.: Forum, spanie w koszarach, targ, kościól e t.c.)",  
		forum : "Forum",  
		general : "Ogólne",    
		have_not_forts : "Miasto nie ma fortu",  
		HealthTL_to : "Czas do uzyskania pełnego HP: ",  
		main : "Ustawienia główne",  
		market : "Targ",  
		name: "Polish",  
		need_reload : "Strona musi zostać ponownie załadowana. Kontynuować?",  
		own_saloon : "Własny saloon",  
		patches_title : "Poprawki (Modyfikacje)",  
		revision_current : "Aktualna podwersja",  
		revision_new : "Nowa podwersja",  
		settings : "Ustawienia",  
		settings_reload : "Większość ustawień wymaga przeładowania strony",  
		sheriff : "Szeryf",  
		sleep_in_fort : "Spanie w koszarach",  
		sleep_in_hotel : "Spanie w hotelu",  
		switch_on : "Włącz",  
		to_last_page : "Idź do ostatniej strony",  
		town : "Miasto",  
		update_found : "Nowa wersja TWAddon!",  
		update_found_html : "Dostępna jest nowa wersja skryptu TWSweets. Zainstalować go?",  
		version_current : "Obecna wersja",  
		version_new : "Nowa wersja",  
		wir_enabler : "Redukcja ekwipunku.",  
		wir_on_line : "pozycji w linii",  
		wir_on_one_line : "Ilość przedmiotów w jednej linii:",  
		without_city : "Nie należysz do żadnego miasta!",  
		your_character: "Twoja pozycja",  
    };
	
	TWS.langs.br_BR = {  
		add : "Adicionar",  
		alliance : "Alianca",  
		auto_update : "Checar atualizacoes",  
		auto_update_title : "Confirma checagem automatica de atualizacoes",  
		bank : "Banco",      
		church : "Igreja",  
		default : "Padrao",  
		dont_have_hotel: "Voce nao tem um hotel!",  
		DuelSafer_ally : "Aliado atacando",  
		DuelSafer_ally_text : "Esse jogador e uma alianca. Ataca-lo mesmo assim?",  
		DuelSafer_already_have : "Ja existe na lista das cidades/aliancas",  
		DuelSafer_found : "DuelSafer.",  
		DuelSafer_from_alliance : "Alianca: ",  
		DuelSafer_from_town : "Cidade: ",  
		DuelSafer_input_alliance : "Insira o nome de uma alianca:",  
		DuelSafer_input_town : "Insira o nome de uma cidade:",  
		DuelSafer_not_found : "Cidade/alianca nao encontrada",  
		DuelSafer_own_alliance_text : "Voce esta prestes a atacar sua propria alianca! Quer isso mesmo?",  
		DuelSafer_own_town_text : "Esta e a sua cidade! Voce nao pode atacar a sua propria cidade!",  
		dx_show_on_map: "Mostrar no mapa",  
		dx_transit_time: "Distância",  
		dx_warning: "Os administradores podem te <b>banir</b> enquanto usa esta parte do script.<br /> Recomendamos usar o DeluxeJobs <b>apenas nos servidores russos</b>. Use-o sob sua propria responsabilidade.<br /><br /> Continuar?",  
		dx_jobs_types: ["Trabalhos prateados", "Trabalhos dourados", "Todos os trabalhos"],
		dx_jobs_list: "Lista de trabalhos",
		dx_sort: [["Nome", "Ordenar por nome"], ["Distância", "Ordenar por distância"]],
		dx_input: ["Filtro dos trabalhos", "Nome do trabalho ou produto."],
		dx_update: "Atualizar dados",
		dx_expired: "Os dados carregados são muito antigos. Baixar novos dados?", 
		enable_select : "Texto selecionavel na 2.0",  
		enable_select_title : "Habilitar texto selecionavel na 2.0",  
		enable_town_button : "Habilitar botao \"Cidade\"",  
		enable_town_title : "Voce pode gerenciar instantaneamente a maioria das tarefas em sua cidade com este script, que e a adicao de um botao com o mesmo nome no lado direito. (Ex: Ir dormir no forte mais proximo, mercado, igreja etc)",  
		forum : "Forum",  
		general : "Geral",   
		have_not_forts : "A sua cidade nao possui fortes",  
		HealthTL_to : "Tempo faltante para completar a vida: ",  
		main : "Configuracoes principais",  
		market : "Mercado",
		name: "Português",  
		need_reload : "A pagina precisa ser recarregada. Continuar?",  
		own_saloon : "Salao da cidade",  
		patches_title : "Patches (Modificacoes)",  
		revision_current : "Revisao atual",  
		revision_new : "Nova revisao",  
		settings : "Configuracoes",  
		settings_reload : "A maioria das configuracoes requer um recarregamento da pagina",  
		sheriff : "Xerife",  
		sleep_in_fort : "Dormir nas barracas",  
		sleep_in_hotel : "Dormir no hotel",  
		switch_on : "Habilitar",  
		to_last_page : "Ir para a ultima pagina",  
		town : "A cidade",  
		update_found : "Nova versao do TWSweets!",  
		update_found_html : "O TWSweets encontrou uma nova versao do script. Instala-la?",  
		version_current : "Versao atual",  
		version_new : "Nova versao",  
		wir_enabler : "Redutor de Inventario.",  
		wir_on_line : "em uma linha",  
		wir_on_one_line : "Numero de itens em uma linha:",  
		without_city : "Voce nao possui cidade!",  
		your_character: "Seu personagem"  
	};	
	
	  TWS.icons.tw20 = 'data:image/png;base64,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';
	  TWS.icons.tw20_town = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZEAYAAAAjxKEHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAZKUlEQVR42qyaf5QU5ZnvP/VWdXV1dXVNT09PM8AwDMM4jIAEEGGiOAISxB+XsFl/EI5hCccQYgzrcllDPB5DjMfDsoZrvF6P1+t1DZpc4s41hmjiKiHoIlHvRAlBxAGHYZgZhvnRM9NTU91dXT/uHzUo0cjmj33P6VOnT5+3+vnW8/0+z/M+T0kP/OCWW5uagiCTietRDTpODwz09sKpjmx2NAcTqyrSU2uhUAh8z4WOjr6+vj6wrDG75EK+kLdHc1Bm6npMh2QymTRNSJi2XShAKpUwYxoEfkzzfTAMWQkAM2GaCQOimmmWXFBVIWQBebtYkBXQ9bLkhAwMZnt62tthZMR1IyosXXpp44QMaJoRT5jwpyNnuru7YGi4r09RoDId11UVOs8MDJzrg/b2waxlwYSqdHpKNZScwPf9z+Kwbdu2LEgm47qmfRZHRcowYhp4fkz3Qhwi8KEsUZY0TVDVMrPkQlSThCzAtkuOEBDXE2ZmHEdHx2dxxLREwjThyJHTp3t6QPrevV9bN2dOEPT39fT09UHCnJCZOxdOtJ3uPN0JspK38zZomqZpGjiOoozZkDAkkUyCrkdV3wfPl4RtQ5mZSiUMGMwOD4/ZUCjYdkQB13UcWQHP9VzbBsNImIoCrltyZBHeP5mEMXsk19sL/X09PZ2dMDTsunEDRoYhqkIqlUzKCiRMx8nlwDBMsyIFi66YNbMsCe2nTncGPpSnplSXp+BU+5muM51QdCzLdcP95SkoFAqFYgFUVVVlBTTNMEJ8UChAVVVIGMvKZvMFGBjI27IAzy0U3HECFR2QFcMIfIgohYIQoGmmaRgwmB3MDg3Dmc6ensEBsCyJqAajlue7LlRXm6ZpQlzP5fI2RLVMJqqB9OAP16y5YmEQ1NVd0jB7Nvzjd/955zPPQG+v6wY+SLgugCRkJXyAvu/5IBH4igK+ryglByTh+4oCEBBRIfDBcyG6Tb1H2gLuw97DxR3gueH9ABQFVBVcF7zx3ed/VxSQROhoAImIoihQmdH1iALbv7958623wtmzfzzy5iGIRKKqpkFNTUPDNc3w9tsftrW2Qi7nOPlC6HgJ8HzXzRfAMKJawghtLLkgxJiVtyFfkJWoBooS3s91S26xALFdiVcij0Nwb3GVvRGKBccRIsSv6yAJIcas0KG+D0KECtH1iBrToeSEyBxHUVwX0ulQcU2LGi5pbISO0+/98e13QK6/pKqqrGz79pd/89prvz8Ep9qHsqUSxONlyVgMtGgkIssQ0xRZUUCP6bHAh2R5VEskQBZRVY9Bqtwsi0ZB14VUKMDkbOWh8odg/vcW/N+FxyE6zesrfQE0JM1pg/LysjIhIDPBNDUNZFlIkgBZVtWYBq7rB0EAcT10gCQkfA/ssdHRYhE83ymNWrB61bIlcy6Dt97+4MOODvj1rw/87r13oVgkcByIRNSIqoKqxvRYDGQhSZ4LsgzhA5XwPCgWI2pMg7iuKBKgRiTJLUF8cdk/lB+AKUFjzTWnoJhw48XLIejx7bG3IJFQI04RDEOWjQR4nlMMfIhpkhTVoFSyrNEcaFEhyTII2fMJwBq1Rh0Henr7B3OjsGJ508JL6kF4flXVxCr4Q2t3l2WBYYSe03UJx4FJkwxDUWDipLKk78Pk6rjhupBMatpQFqqrNS0AJlfHNM+HqSsmZLR2uOrBpX3LbPjG4Kb3vvUmLGxpXnVNC0x8LLUgvgzqmqfurXseLtl22RuX3wqLsl+8o3kHzHl+xjt166G+PpXyfairSxhRDRoaKtJxA2prMxlVhdde/f2hj05CV1c6XVsLMGnS5EmQy0U1RYG4kTATJggRhqaIGoaahBn4YWhx3ZDJihIyWVF8H1RVouSCsbx8eXwdzPo/V1yxcjKsUK+//ssJmB2ZM7Z0CqSej23SWyG9smrSrCao+c3MhsV3wKwvzt+8vAUqV9T0XNIEyaRhSAJ0XdMcBxJGTDsfAQKgu6urq78POjsrM7W1oNROrZ8+uRrOBxIhIqokIKJEVFmA4wR+eAPPlwWghBJVFMOIG6Drtl0sgNvkHgm2QV3r5YeX3gurbvzK2dtuhOiq6KroKlj13b/J3ZyD0fKR9pGPoNDo1JV64K4/3P3DLQkQefGI+Hv4H/2P/uCRq8DSzionVBAifHARRUEIcN2wKJg4KZUyDGg78fq//+4ATJ0yrXZGA7zuvF5oa4O8PWbZNqhJz3ecMMR4Pvi+rBQLYe5LJiHwCwXPB0nYtu9DUK0+KfbApKtmfOfaFbDwg6sGl90DkdWRxyOrYUHXlV3XdEHunpGDw3eCN49y2YLrnl+96m/ngdgv9otfwq+u/MW1P58J517p/OC9feD5eSf8X1WVNNB1WZEEJExN83w4+dGB1393AMTY2OkzJ9qgIh3G8JqayrRpQmXGNFUVTNMwdB0qM+WpdBpMUwjDgIgSxlChRV+M3gH1v15Uf+0OuHnRV3+1bgL46/31/no423G242wHuGvdte5auO1/3t79d3+AyWtrrNqVUNhT2FPYA85WZ6uzFZSnpIGgJQwncR1KToDj8PHSdUUxTUgYui4rkCr3/YgCJe9Ux9leUFXbzhdg4iTT1HXQ9ZgWUUBR4kZEgZhWZiZM8P2SG+Yuz/dcUGy5Rm+GS3519bU374erNy/Tb7wK/Ca/yW+CIWvIGrLA3+Hv8HfAktx1N/2XZ6Hy8YmF6qlQWlNaU1oD7i53l7sL5MYgGdwEnj+S81zwXMsKc2t49X3LCnzQNCEUBSoqAl9VQeQLgwPn+qA8qWlxAwJseygblo+SgLghK44DsnCc4WFIGBG15ELkDVrza6G6r2lg6V3w5fduOb3mHMh75D3yHhhZPrJ8ZDnIM+WZ8kzIteReyLUAxzjGMbju/evev+59yK/Pr8+vB+kR6RHpEYg8Jm+UaqC6uiKtqnDZnMbG2tqQEJoGihKG0qgmhOtCff2lMyZXQ7GQy2WzoGkRFSCXGxjo64OYFtNlBTxfFo4TVnvFAhQLeTtfALe1uNtthRmvLf/+34xB076lx677BojD4rA4DLawhS1ANIgG0QD2SnulvQJ4hEd4BOYm5ybnJsGpd+qdemADG9gAQqPPHYDq6vJkyYVFi2bNrK6GZDIs/zVNVUPlFguDAzC97tJLq6pApCtqaiZWQYCqKsonZSG4brEQ1uPJJKhqXI/pYM1VdkpHoPaNqzYsteD6iSv/2w3fhGh9tD5aD4NLBpcMLoHgoeCh4CHwHvQe9B6EYHtwf7AdRppGmkaaYOi+ofuG7oOROSNzRuZAsD/YH+wH6X55mUhDKlWelBXw/ULBsiDwHceyYNKkCVWqCjFN0xQFHGd4ZGQYkmVTqjMZKDqhw5LJCVXlSZAV13UcSKdjetwAVfX9ADBvVw19LSz64Yoff/UBmO80zb16L0RmRmZGZsLoitEVoyuAFlpoAX+1v9pfDexhD8/D2E1jN43dBFaNVWPVgG3Zlm0BRznKURCPRRqV2ZCpnFyt63Du3MDAiTYICMjbENOjqqpCRbo8lUyGOIaHQYkoQpQlwbZL7sgw5G3fFwJMU9cNI2SUBKRUv86/EtKNly64fAlc1X/N2MrvQ6Ij8UDideht7+3o7QCxSWwUG4EXeIEXAAUFBbApYAN3cid3hukKwGvymrwm8DJexsvA6NTiE9JjkNjj7fP7wM2MHfQegKgG2nixoapQlowbsoCzvSM5ywpzmmFAsZAvuC54rm3ncqAosoDw3DEyDEY1yyN3Q8XXr163/G6Ylbr8+ubLQdun7df2w/Du4d3Du0GyJUuygAwZMoCDg/OJ3TzKozwK+OHH3+xv9jeDv8/f5++D4YrC9yLbQOseedV4F2x79L58I3h+mJOnTC5PSQLy9mjOMOBc31A2b8N4zQ1xvcxMJiFhxnRVBU2LaiUHbDtkaP7xCq36frj6R80/uv5foFKr1CqPwlnrrHU2B7zDW7wF/nH/uH8cOMIRjgAqKuoFgAQC8cnVr/Gr/RoYbR1tHW2FpQ8te25pK7yx6d8+yH0XpJ+Nrj1WC+WZcr8iG3YMig7Y9qiVK4CuyyKmg20rimGAoiSMdDoEHioiboZKCosDec+06rmPwIyji+Jf+gaY6806sw6GxBBDgHRUOiIdAVazmtWAi4t7AbHOfz+/xnEE7wbvBu9C/kj+SP4ILMot/O6CzfD2b0bbz/gQvTs387XFUCaXDRiHwXEcZ9QCyyo6hQJomqJUZkApFEZyQ1lwnFDKEuHBRlVlEdXAbyo/NNGHed9qfnP138Pk+ZP3T26G7oPdB7sPQnA8OB4cB+kG6QbpBqBAgQLg4+P/BSCfcgj3cz/3Q39jf2N/I0zcVHVDVR0sfLF56peWwrEzB/+3/QBo2/PPDAFD2VxuZBgCv1gIWzOVmVQK8vaZTssCSRQKJQdiWkQVAiCqFgtg3DrxwKXL4AvfWVL8SiVU3F7x84rbYXDX4K7BXcA7vMM7wJM8yZMXEOg8js8j1vmVI0cORjaNbBrZBOV7yveU74F5y67uv/EHcEZXmosaRHN9e4+pcOLEud7RHJTc0ZxtQ0Uqk6lIgaKqsnBdONs7MJDLQWUmbFFI+2uq6x6AWdkvbl4+AHVl04emn4buh7pf6N4BftpP+SmQ6qV6qf4vAGBczgrKxRRyHmgwEAwEA9Cd7E52J2HKc1P21OyHMXfuNcs7IHvn4VsPLoDEzsKyfAESZjqdSoGmaVEA3xcib0N3V29vLgfn+so7JQHGgeQNjbvgstiib9zyY6gqVB2YeBMMrh2cPXg7BNuD7cF2kFqkFqnlAuJ8guM8sS6q9PPECzYGG4ONkD2YPZg9CJXHK49XHofii/My168FO9P6U3khpLOjD/s+xHTD8H2IatFoACgJwzSTSYjeHN0QvQ/U2WXapGaYvrPpwJeWwYJnr/AWfhO6N3Zv7d4KxVQxVUyDaBEt4vlPmPGxYeeBXMgsgMI4EOVTQM4rqosuusBf7C/2F0N2Q3ZDdgPMa57fPL8Z3rrFucW5BZS7up/xs9C9+Vj90XoYypa2Fx+H8lRZMmGCfmvZw+rPQHpl4raZt8KMZ1f85usfQP2OhpdnZCBrZa3sfnD3unvdl8YJVQcsYQlL+Oz6tNKdj0PYnyvk/BrHEfiBH/gwum503eg6mDaz7r7p98GJK70rl18JE9pTSSUG78ff/uWr78LQfy89XbwZlKPvt7V1dkK8NzbbnAP63Rlr8gPwUe6DuUd3Q2FW/rb8Tphnzbcu/wBGWkZaRp4H8ZR4Sjx1gcEXc8jFmPWp/V6z1+w1Q8W2im0V2+DVpf825TcfQv8zZ051dIHzcGmH0OGDtzqPsQAWfrl/oOjAqVOnO850QuL+1ObKjVBrXTpp9nLoiB+/68hkcO4rVhTTML29/r5L1sJYbiw3lgNxUBwUBwETE/OvcMinQ+/nLH+lv9JfCYlsIpvIwuEr333oD3Ohf++Zb5/8AxS/X6jX5sNvW/+0WxyECS9PGSg6oORyYbNt9K3sroGHIbups0apgqiqKMVjkNiTTJavAO+Md5s3HUo/Lf209FOQX5dfl1+/iEPc8as27pDPU8inHRL34l4c3FnuLHcWDL8yeFf/lXDq5tY9/56E0jppgxBQmGTn5C3Qfurw/JNpiKqmGVXh3OxTdWdycPTKQ/NfWQDGTmotCxJDf/u9bx8Df62fm/4r8HRP8zQIGoKGoOGvwKF+jkI+B4df69f6tZ9Uj0OL+5Xev4MD//Dzbz8zBxTFc4WA7O7eXucr8NHK9+afSIEyf96VX7xsNvz8+df2nWqHkWHLsiyIG6oaAG7SvdM/DI7sJJxrwX3Zfdl9GYJfBL8IfvlJ2fcXFOKOA9HGFVIYd4jyGSAXMM6b5k3zpoEzz5nnzAPplmCHfAzKzOQrFSlImGWmqsJg69GjHR0wZfKCBdcsCdvwEpAv/HZfWxv09GSzJQcmVIUnfnerl5VuB7fXVd2vgjffW+DNh2A4yAW5jzMFiHH7LlQ640pXxpV+3iH8BRyMO2S+P9+fD+5R96h7FGikWnwbksnyZMKE2tqKdFSF9vbh4ZMnoWbKFQuvWQLKmN3X7zhQkapMqypUZtJpXYdL6sPWiVMn9rMWSt8qnS09Ae617rXutRA4gRMU/oqQdT65nw9ZLu5FFdLgNXgNUHq09GjpUZAs6UvcBvHqYmFoGBKGnDJNMM24kUpBOh12i4eGR3OuC5lMwoxqMGv2xCrPh0tnpNOGBpGn5CbpX8Hd7da7CvhL/CX+EgieDp4Onr4Ijo9nBRcvez+9P9gQbAg2gHvAPeAeAHmH9JbYCKlUoVBMgCTC9n55Kjx4V2bKzJgGSn//6c62NshkwoNVeTJuxA0YGh61slkwZopnxCFwGpxvO/XgLfOWeUsgmBPMDuZ8wogLzBfjTvhzhZxP3ueBiT+L0x/v95f5y/xl4PzE+YnzLxB5Rl2tbIWpT86YP7UGhodlUSjAuV7PHcpCNtvddfIkdHV397guTJ5UkSpPQnkynTZNOHtuaHgkB3V7aRQvgau6wr0VvHu8rd5WEKvFarH6cxKBGLeNT4Us58/sFxeg+ATSDn+H/xC4mqu6KmhrtfmRX8OsV+bNz3wHLCumxXTo6jp4sKcHBge6uk6cBGXixIlV0+rgdOdrr/52H3h+eCo+37aufaF41HkYSmdK/1x6Fkr7Sq+W9oFwhCvcz09qHzNJQ0P7Cw75vGSo+qqvQkkuySUZ6PCXuc9D7dRJenolHC+c6z3bCxXpqBZR4dTp/gEJmD5tWu3UGvjXltcPHDsGCTNhygpIhHV+leV8y/kReHu9Gz0NvGqv2qseV7pzERz+nwWtzz+HfHpbtV/tV4P3orfX2wtBfbDXPQIzGhpn1NbCn452njnXBzU1YfP29JmBAQDFNMPRbBiZoebwhJPJHqi8ucxIvwGD20uucxzkD+Wr5XtA+b3ye/lNkPZIe8Tz/wEQdxyG9tcDEWvEGrEG5KXyUnkpFKYVLyu9CR9lz/X02aA/H3tJF7Byy4LVly+BqgnlyYBwjlNywTSjWuDDdLO6Lt0E9f9Ydc+MO8E9KM/AAdEiNomfgNgtdotnQPjCF/5FcYTEcj+TK7gYsVjAAhaA2CA2iDvAfzFYJR2CI8dPfHXoTZCfjKzS74I1t61a1VQFlpXLDQ+D0tdXKEQU0LSwvZ5/ys9Id8OQaVeVUhDUmra8HZxm5z0nC9Et0S3aVuAkJ0n955e9bGELW6DYVGwqNoHTFdwj5eENpe2xnlehMle5NXEPFFvHjvf2wcqVX5hbZsK5/lHr0pkQ0ypS6TQUd8hJaQ4MPZSfU9wOiW5xLvJfwe1wW91WUA3VUM0Lyt3/CIfycdX1SdnrXgSHgYEJpfZSe6kdirq/WXoXDnz9jz/rvAMMpeym6A5wX3eXt98Ac+dOnBRVQVq4sKFh4qQgeOedtrazPRA/Hj8e64D4fEk4rRDZFd0fuw8ij6tHoz5wUtotDgKOdEy0gT5JrMeHYKdSp9RBYX/xUacGYnO0NUrtBUSbCXITyDdJG6T1EOz0mt1NwE5QngBvsfeW/xLIh8VJ/yVgW7C9eBykp6Xl8j7Q+ozHjGbI3WnvtVohv2Ns2+hKuGJhTY1pQneXbWsa/L/WY8c6OyGTrqjXboCymeIxZQlMfqh227TnQJ9tpoy7QD4gFmsHQN4gd/Ak6A9xV/AoyG/ou6NrYKTNespqgLIG4w6jDaT1wW4eBv8laZ3fCMHD0oYgA8FMv9ndBP7TIb5gknvEbwHlOT8VDANXurtKO6CUKy0o7IRibSmTWwv9h0Zy9jMw+Ni5dWO1MHNmdbWqgrLxG6tXNzWBpu3d+7v9cHjhidkjdZBqm9Bn5kBfpe6IbAJxk/Kg/CKUOkrb3DtB6iRXSoP2SvCM0g4iG3ssfi/k9hdqxzbBxAFztvoYyD2ABkNbnAXuW6A/ZdxuLoPCytGtOcAY0F4NFoNyOHIgfhJYWXo0vwOUJ7x7OAhyRmsxt0D/SwVDOgIjc+17B1dBOh32qqJqRDVN2PTNL69obISYXnQcBz483tHR+2uoqK/ZP2UuRB9whWWBV2/dOrwE7HvzjnoryPu8ZrcZnDdiT/k6RG21NbYOxp7o7xrZDJkjk6pq7gdxRDnqVcPok34qdwdIO0Oiya+W0qwC/YB5L4A4pDyht0BQXVjnpkBbLefk5RBsiD0ZWQxDnRE90QDt7e2HemugpiaVSqdBVlRVCJCee/buuxcuDIKiEzfq6uCf/ul/PfmLFyGbHbVcF8qSCSNhQMnxfM8PZ8MRBQJKTi4HspCEEGBZ4UEnXwi7lwkjnIULEU7kwkEvxHRVNQyI664bANmsECPDECArcQMShqbFdSg6I8O5HHhuAMDQsGUVHZjRUFOTSsHXvnbjDYsXw9H3jx370xFYes2cOakUeL6uNzTAIz9+9rmWFhgYGMoGQMII35/yfUVxHEiYoR3gOH19ICGLVApGcq47ZkHedpyiA2VJTdN1kAVEFBjJhe9vpVKmmU6D647Z4Wg4HOApimlmMqAoMS2qQn/fwEBnZzgEj2rQ3XOubzQHVy/+wpzGRrj++kVNU2rg+IdtbSfa4P8PAIBIFfc7e5K5AAAAAElFTkSuQmCC";
	  TWS.icons.map = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/4Rc4RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAcAAAAcgEyAAIAAAAUAAAAjodpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTMiBXaW5kb3dzADIwMTM6MDE6MTIgMjA6Mjg6MjYAAAAAA6ABAAMAAAAB//8AAKACAAQAAAABAAAB8qADAAQAAAABAAAA2wAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAABYCAAAAAAAAAEgAAAABAAAASAAAAAH/2P/gABBKRklGAAECAABIAEgAAP/tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgARgCgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8AD0/AGS5m5kVMA9R7G/D9H/Xdu3q5d0zEqtlzXCkua7cQPTGrv1fc33+/21+o9BwMq/CsbXkyzGLSNSNrXkBwb+76jvZv3v8A0f8AhFZr6q2H1P8AUbaGkMseWw7XTf8A0ehr/d+b/g/8IsvW21EQrXfxTZNtTBYx+M1gDd+jWufALZb6dbHenu/we9/6RYORkU25eQ5tUOLnFpLGtnX6O1vtq/7cW2DQAbG1fZ8stDbWWF4d6YewkN/wbtljmbN3/Fqv1igV5W8OE3ucS0diCBu5/P8AzvzEhQpWUEi+zHGy2twLb72VttpEMsuqb7y36O38zfSw2Ms2/wA4s+6uh9oyGtFb7XEvjUDcHe9jHe30/wBzckWOfkCxrbLrAyGySQ1p9zgyA538rYtKrHZWyht9gbY2wXNqEusAh3qbq2j/AEdbPZ/pP5xG6WazoXs5dlVrbWSwemBu1bteT+8AQnc0CXekxx0A2gb/AD3F21jVf6rkUNqxnP3h+QXOqtu1sNf7tvGxvqO9ioupc4i0ktqa7bXtdGu2Xtf/AJzdqQJpbKNEgG0dbC1wLmsafeAANNpLT4f9+WljdJ6dmuNhbuqqjexzRuI1Oxzw1vu9v0qrf+tp6aHmhu0td9oa4WPskV11sLLH+5m73e337/T/ANGj41WXhVWPc5jWXBziWuB2hjXObbWywtrducfT9NAyPkvhHaxY6uXd6BduxmNbWY2scZIHHve785zUJ5awusoqEEDdW7UncSD7vbtez6X0Vbbl1ZGNa2yptb2ub9k9OsMAZzYzdPvZ/XVQObW62x7iQQ0j91vblEXqsPh1V6NbGyBucB9Nw3OMfvbfpq1ViY+UGVtcBkPdtdUWaOaB9OrZ/J3OtZYoU1my5lbnhoe4Au7Nn6S16qWYQayx/pPDZstqYZsALtrWvJftcxz/ANJ+j/Sf2ECT9UwhfT09XBfjhuQ+l8PZWS1wAA9zPaHtc3a/3bUeqmtmFdZeGh1Qa6t5bsnc4N9Pb7mPaxi1LsSoWtLqKTYbSHhzy0OIax5a36DLXOl9j96bLzsOitptvFhrMV1h4gOA2+m7a30nupbvYx7/AKaPETS72wLJIaXTXhwYymkWPl1zyWi02Fomulmzb6Wx/wDKsV8V31NrtprbebztbQ9rWsqPJe57WOc6tuz371RyMipmY2/pw9JrWxBaA0mP3BP0vz1N2ZOBU8PBeQxrK3gPhzd4usbW53qV+795DX7UxkACCfl6j9jZfidJsqbe0Vtx5c+y9k7nGXN9Nvt9zPVfuWCRWQNwILQ4CGuIII/O3e3/AM+bPoLZ6dFteRdmPY6q5zSHOa1rLID3fpPpNa9k/wCD2fo603XqHNLLmNje11b3A7RLfcz6Ld2/buSBo1apx4oiQAD/AP/QA7Putsa4vbvDWAM2giGtgBjbN/t/f/fUKch1Vu+l0WNHeHESPzt29v8AnK7dXhXNpsDhXWWMFzgQNujZPoj3vft+n6ap247GUi+ksfZqxwIDHSANGD+cfS7d7Lf/AANZejMRIG7vqjtO71Jgb4Lm9tT4Kd+VXdRTSKyCxriS9pc867nb5ZubV+dt37EOze6qLiC7gAHiIb7d3ub/ACVZxaq7LCbngVVOG8xq5x+hQ1rf8Jb/AOe0dAECyaHVAx5pvZZIeGuD3+mdvsPdk/ntarjmWMcK8U+q/KfNWSDq9hBFm8RuofXuf66d9NuVi+rj4TKb959OprnNLmtMWb7LGemz2lr6/wB9Svx7Bh1UU1urtbfuupa42lhLXbA2x7f0n/CeggV8YkX9oNFFm9NqFfrBxyXMhmU7Uhu4SzbH0qfc9m9BoynVMFVgF1LHOHp2ASZ0mtw/SV/ydiv1Y+cMCyiqsCyvVhkTtsP6xQBZtazcz89v/VrJLLaprvrdXa0bmseIEHWt6Q1G6JiiCARYb3rWYj6xSw+lcwWNY55bLv0bnsbkVjc9nsb6vsWhjX42dU597Kq9xc19TnBxIcGtLmPft9L9z9G1Y7c3KpDRXeWhgcBLoHu2btfzdzfo/uLW6T9Xs3qGKcjKsdj49oa/CL9pa8u3ve65m71fS/0f+E/widHHKekR9VDJw+I/dLnV4tf263HdY1wp2vl7gG2sJ+i21m5u70/5xXcp+LWLRZY0m2ltbKqS1zW62W+kxrIbtqs/wtit9T+rWT06qzq7eoetZiAEtdWOPbW33Pe/3e//AK5sWS/pnq2VXVe997Q6zJdDg0PaXPc/0/5TLG/vpTxmBqWmioysHhF/wa2NRbkb201QKQIbpBk7QGtj3bnIufdXmemTUSQC2x9hDge5aGfusfu9P3/QUr7G5WTUcHcbQ1rXPDfS3WA7fUa0fQb7fpomVijJyr78drG01u279Nu6Gsf6TW+529zk29VUaIGuv+MywKrMuh+Pd+kxdwIbIMGv27TrvrZub+6nsp6ZjF/qE22SCMas7RXPu+kPzP8AvihW1mDbZlY9vr0NeabHMEuDi3du1/R7HbdtSfI+yXWMy62vLri0XU6uDY3e17BHqb3M2fo/oJfku04RoOIfva+lr5tTGXA1FopeQ9ooA+ifpNa14q2c+xVq2RWNgDSDoYk+E/1tqvZ3p3W1XMuDWPhsWOA2taNGDaH+z+u71/Z/UTYuHXbDWPdaQwOe9ghjHau9K17tztzvzdqV0FhjcjSOjKuqD2UH6ftDgJc3d+45v0HWbUHItvtM2PdadrgS8kgNg6cj87+SrObhjFe3049K3UdyC36df0WfQ3fzmxVHS1kNG5pB2iRIEe5EdwiVj0np0f/RXUaHsxaHNcfs7RtLdoawOcwOeR/W+g/f9P8Awar4XTmPrvNZFTGNa4uayRuP5r2tPqP9g/NVl2bgBuOQ032MabJMfzg+jW/2s9Wqr9zYh4Drv2gHWFz3zucCCQY03bWSxz/d7H/4BZlkAhsERMx16JOo4bcfFBBLy0NYHDYzVxB9Z25znWUeo5te1rPV9RVKMxzGU00NNTsexz3H0g1od/KFjWPs/OatTNqZbvyLshv2Zu13okE6Vlhu3Mjd7Z+hs3qp1A05TxlUbx6kNdXtO0Bv80d2nus9luzZ6n+lQB01CcgokjTw60x6i/IsooyLXPsbZLTXEkODnbrGscW/ovf9P/ralgZGQz225dbYs2UOd+lPDnbm/S3M/kep+YhZJdnWkNx317w1jKo2OeGAMGvt3e79GqTWna1oZtZuJ3uhpLnDXa2v+a/c9iIGiwyIlY1/7ps/a2Y+U3Jo30NLmtc5zWOJaTtc7069rfS2+70v8xGudY261mTc9+OQ57HbGkw4uHrMu2Mc17/636O39L6fpKt6T30V2Db6byQWkbxWGcWO2fm+130HWf1FH1m7WNsP6JjxZaJILZH6R4tZ7WX+nsRoKsj8/BJdSKrAGvFtdoLq3n86S1v07PpOa/2fR+muv+qnVsO/p2NgCxtWbQ11XoAEF7WS4Pq9lbXO9Pdu2rnqHYbw21tdjasdjw2WDgOa/wBu572fabd+/wBSxv5/+k/SqpnOdaX2U12FjjvdeA4OkHQtsc3c5zGj0/pfT/SJ2LKYSurvQqlAVd/Y9n9ZDmW9Gyhjlrg3b644OzcHWj37f3f+uLkS+619uFTWzHL9pt9F29ro3uDa3P8Ac72H+bq+ns/RqLusOtrAzr8nIxjH6N9ryyzad36Xcx+73/8AbSgzfbZZkVe25w1r+i4CPa/GDX/ufo9rf8H6iOaYnK6I0r1Ihp4+XZXpZ+HvfbW5te3ZY8sDpJHt2s+g5zfzH7/Z+YpYmbZSHMLWuDvo17WtgABuvq7m7bHNrfZ/24lhUuuqssc1ptrYz9HYfTDA4Or32+tP0d2yrY72exaYwKHMcw47vTrkBx0sIaHA2Y7m/SffY1tj6rf0ajJA0IXxjI6xNdnFrOXl3Oexwdba4gVhgaSXDVvt27G/v7/zFr4jDjU7ckfZWtAa972sO5wO7a1vu9X6e9j6t/8ALQMbBOGw5llmx9QebR7fa94Yytw9v5nqufZ7vfYqvVG+nfXi+kHMxTAcQ5xcLA0u27j+i/Sf2ECbNaUoXAGR3/i13uiyKmuNe/QwPaJ3NL9f3StnE6dS3EY5zy71m+9zWgiCNzve3a70vZvZ/wAIsvGxW5F7W2Pe2mloda5k7iJiWhjfc9zjt/qfzi0cbNwq8an9ZDX1uIYL2y+thGz9Gyke2trPdvs37/8ASpS8CrHV2a8E2ZS5+BtFhZU1u4F9Ibta0bm7j/OVbnBn8tc/EhzmhvquaQXbYnTjcukpeMljXVO2tsfuNbml8sG+vc/cW+nXk+nvp+h/wfqKsOj01epv3WtdU6GGNrDtJLm2nY+zbs/R7K9/+lSjKl2SBkQQ/wD/0q7On5NjGtqLXWFjXPrDwbQPo7PTnb+d+Yg41JxrabWEVua4l1pY6BBPs/f/AOM9JblDmvLMey0PeKRvpDQBDtpkWe13sZt3sVfq7q7qv0bg+zHLXGDI2WEN02n97ZuWXxdGzLGAOIHUfsa+dTXlZLjj5LLS4yxskBoJa1zPU/m97f8Atz+2lgtt+2tLWO3Vudv2Fu4NEse/f9Fm2fpqpUWZlVoqdNrTDGvEMftHZw3fpNFaquqoxn2uxW/bKXtYbXAjYdxc19uR+jdt/NbiNb+Z/P8A6RIgjRaCCeLb9Js5j7awW41jcQ+obLTaW79YbWXtsfY39I79L9H/AK0oZTW5vUacfcwMprLb3ho213Btjne9pG5vt/Sf+BJ8B7Lb2stxGN3OO2xodO9oNkvucd727foVv/m2I3Uq6LMEMybOXhj7GSTuG/8AnWtc9ztv+ErehsWSuIE3pe391y8TKy6rP0AcHOmvZG4Ok/m7f3vzHKzlYotz3sx9ga7b7XuADnn22NY/6Nzd/wBN3+lQ8bpuPe7bRlPa1jW+17WsI/t1uY/3VfpKtns/nPXR/X9ENy7rzmNocBVQ32EPhzXD0fpMfXWPbt/nbESddGMD01La73/xmnU77O59dtb7qHEstdP0C1zPcyzb9Jsfy7Nliv1vyTcboZXhGTcHOHpikxusyW+oXfzbfpKJax2LbQcltuOGn0nGSa9zqtHNjdv/AKjv9KiNbjepRZThPtqINbXNBhxJ2l9tfv3N3Od/Ov8Aof8ABoE2uArr/L/B/Rcx2Jh+g+2p+8i017HAbdjg81v2tds/N2odE0PLmyNrm2AEnWC53053OZ++r/UcljzZTS2ptfqFj/TA9V2w7vd7G7KfVRukNrFF+Qxo9VmhcASRPqO2+zf9No9+xOJNarREGVA/Vu5Nf2hraqvs7coM/m7Ys2NO3dta0+6vYx9f0P8AMWfk9TczIAx21+hU9jntZ7fULBqWP93sdt/R7/8ABpW5uN1E22VvuqrqrcbGgCDtP58e/wB29EZ0zCa00Mc99hYb2uLv0sH3VMbS5ux7Hf8AGfo7E2q3ZJEy+T7b3+jNnU8Nrf5102v91or3uDXNbs9R9n+id/Js/wCKVd2eOoZn2Syqtu/20Pfo5on6e5u76bf8F/pVQe9jRaK5cS6WOcAHAR3G7Y3+Vu/cVuqjqGLbVbXWb7GkfQ1BP+EqsfVv2bkSAs45S8utOyynFrr2Ujayl0vcz6Uthztz4/Sbtv6XYqbMjEuZ9nYDa7Gr3vpYwAFpd6Z9OyC79Wr3O9NiWTdmMym49LanUucGegAP5x49R9WR/K92/wDRfTVW7Mw6DVRXji3KxQdWHY1r3Dafc39O/wDN+k9ABklIDTatNR/0W306vGdjiuuxtgqnbY87nMEubQx9dgrf/NfpG+/2b1LNsrqYH8spdZ6gIJfucx1dZb6jm7KnOd9NYr8g/Z7aNwDHua95ZoYYTH8nZvcrz8nNxWP+1VG6x9X85RsDiGfo7G5NjPzKfa/093/GpVqtGQVVVXXs/wD/0xWW5e17baat/pM9R7du7ZNe3T1Pp/RTYwr2WOsLxitINjGge6D7G267Gsd7l5gksz7Pozn5uvX5n19lrXSbamtyNhADPTMt3tO4Ftvt/ce1yKHFwBI2U12vOSHNaXWCTta/1bTZV7vobv8Arf6NeNpJnTozD+Xf/CfWOmfYWY95pN1tBsYXhjXtaHA+xtk2Oftc7Zv9382r9k76NbNLCTtbXsLdry5j9tnpbNvsd6i8YSTpbnf/AAt0Q+Qbf4O3zPrdTun1Y9jmNsyKRIsY/Y1hJ13MJf8ATrr9v6D/AAX84srdP0WQdwnVsx/5wvOUkB1Yp9Nvo+p4n2PVxncGH12PDCz6Vewu99T930fz/wDwNam5nquIbkbgCLRWAKi7bq+1rLHM+j/wv0F4wkkyY9uj6x09uI31GtsdaX17S4sYxzGx/OVNte/1Lf5KxrNzd/pkvrOrokQNdgP2f2u/8+f8IuASToblinXDGq6930nEfibaxk12bQ8uDmEbCeXVPY7/AAbn+x7t60bbevGgh9LBjQS80lrYq2/Qqiy7d7P9G1eSpJH5v+/XQ2O/+B/3T6X0wPdkPbS705Hue5rHkV7R/Oes9jXO/wCt/wCk/qLcvftn1K7H0mkhutYIZA9d7NrvU+hs/mN9f/F/o14wkhLfpsuxfKf5B9gqdLKHtZeMav1PSrMH1BrsG97/AFK7dv0P/ZZZOU+8lzr6wxu1u1ktJ77PUd/Obtu/+d9/+kXmqSMdyjJ8o/lHZ9aod0sWby0FrrGmup4r2tgOa8MffZsdW/8AnP8A1IrNjg22Gtc/J9K6S0Na30ju+l6dj/5r/Pf/AIReOJJvVfHbpv0f/9n/7R0yUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAccAgAAAgACADhCSU0EJQAAAAAAEEYM8okmuFbasJwBobCnkHc4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNBAoAAAAAAAEAADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0cAAAAGAAAAAAAAAAAAAADbAAAB8gAAAAkEGgQwBEAEQgQwAF8ANQAwADAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAfIAAADbAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAADbAAAAAFJnaHRsb25nAAAB8gAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAA2wAAAABSZ2h0bG9uZwAAAfIAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRz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Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSIzLjEuMS0xMTEiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDUzIgV2luZG93czwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMy0wMS0xMlQyMDoyODoyNiswNDowMDwveGFwOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4YXA6TWV0YWRhdGFEYXRlPjIwMTMtMDEtMTJUMjA6Mjg6MjYrMDQ6MDA8L3hhcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDEzLTAxLTEyVDIwOjI4OjI2KzA0OjAwPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIj4KICAgICAgICAgPHhhcE1NOkluc3RhbmNlSUQ+dXVpZDpBRjBFNjAwRkQzNUNFMjExODFCM0MxNjgwQzc0Q0Y0MTwveGFwTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhhcE1NOkRvY3VtZW50SUQ+dXVpZDpBRTBFNjAwRkQzNUNFMjExODFCM0MxNjgwQzc0Q0Y0MTwveGFwTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhhcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjU0RjJDNUVFOTU0RUUyMTFBMjUxRkM1RkI3ODhDOUJBPC94YXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4YXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjU0RjJDNUVFOTU0RUUyMTFBMjUxRkM1RkI3ODhDOUJBPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDEyLTEyLTI1VDE3OjIxOjMxKzA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93czwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NTVGMkM1RUU5NTRFRTIxMUEyNTFGQzVGQjc4OEM5QkE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTItMTItMjVUMTc6MjY6MTkrMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1NkYyQzVFRTk1NEVFMjExQTI1MUZDNUZCNzg4QzlCQTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxMi0xMi0yNVQxNzo0NToxNSswNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3M8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOkFGREI2Q0Y5RTc1QkUyMTE4MTEyRjg3MkVGRDVGODFBPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDEzLTAxLTExVDE2OjExOjA1KzA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93czwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6QjBEQjZDRjlFNzVCRTIxMTgxMTJGODcyRUZENUY4MUE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTMtMDEtMTFUMTY6MTE6MDUrMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBXaW5kb3dzPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpCMURCNkNGOUU3NUJFMjExODExMkY4NzJFRkQ1RjgxQTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxMy0wMS0xMVQxNjoxMjoxMCswNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3M8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOkIyREI2Q0Y5RTc1QkUyMTE4MTEyRjg3MkVGRDVGODFBPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDEzLTAxLTExVDE2OjEyOjEwKzA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93czwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94YXBNTTpIaXN0b3J5PgogICAgICAgICA8eGFwTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD51dWlkOkFDMEU2MDBGRDM1Q0UyMTE4MUIzQzE2ODBDNzRDRjQxPC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjU0RjJDNUVFOTU0RUUyMTFBMjUxRkM1RkI3ODhDOUJBPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICA8L3hhcE1NOkRlcml2ZWRGcm9tPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIj4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFkb2JlIFJHQiAoMTk5OCk8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT4wNkVFRDUwQUQ4NjYzQkMxNTA1M0ZDQzc0Qzk2OTZCQzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjA4OTAzNEI5NzU5M0EwQTYyNjQyRDg0NUUzNUU1MDczPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MTVCOTA1QkE2RDQ4QUMwRUQwQ0U5Q0FEMzBCODJBQkY8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4xNzhCRTA0NkEwQTQzRUUxM0M5RERFQTAwRkEzMzY3NTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjIzMDc2MTFCMzJCOTk1MDg3MERFQjUzRTg4RjYxRjg4PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+NDIxNDBGOUY0MjY2REU5OEM2MzMyMDkwREM2NDdCOTk8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT40RTUwRDZGMTlCNzdFOUYxMUZBQzFDN0FEOTJBRERBQjwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjRFOENGQzgzREJFQjUyQTIwMjdCQkI4MDAyMkE1RUM2PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+NEVGMTk0QTBFNzQ4RDgyQ0Q5MkM3ODA5QTAzQjI3MzE8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT41MTU4QTdGRkZCQkRDQjA3MEY1MTJDRDYyQjU0RTNGRTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjU4RDAwQzBFRTgxODg3QjVGRkExREQzRDJGRTFEQTM1PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+NUI4NDY4MEIxQzk1RjU0MjY0Q0M2RjcxRjBCNEUxNUI8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5BQjMzQTA4MjNFRDE5QzNFMUM1QjQ0RDg4QkZDNjgxRDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPkFDMzdGQkM1RDExMjYwRkQyRTBGNUU5RTc2RUMxNTQ4PC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QkZGOTlGNTQ0NzUxQUNBNzQ0NkYzOUQzRkI0RUIwQjg8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpIaXN0b3J5Lz4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOk5hdGl2ZURpZ2VzdD4yNTYsMjU3LDI1OCwyNTksMjYyLDI3NCwyNzcsMjg0LDUzMCw1MzEsMjgyLDI4MywyOTYsMzAxLDMxOCwzMTksNTI5LDUzMiwzMDYsMjcwLDI3MSwyNzIsMzA1LDMxNSwzMzQzMjsyRTQzRThEODc2M0JCNTQzMTFEOURDRURCMTI4MUI4ODwvdGlmZjpOYXRpdmVEaWdlc3Q+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+LTE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjQ5ODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMTk8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpOYXRpdmVEaWdlc3Q+MzY4NjQsNDA5NjAsNDA5NjEsMzcxMjEsMzcxMjIsNDA5NjIsNDA5NjMsMzc1MTAsNDA5NjQsMzY4NjcsMzY4NjgsMzM0MzQsMzM0MzcsMzQ4NTAsMzQ4NTIsMzQ4NTUsMzQ4NTYsMzczNzcsMzczNzgsMzczNzksMzczODAsMzczODEsMzczODIsMzczODMsMzczODQsMzczODUsMzczODYsMzczOTYsNDE0ODMsNDE0ODQsNDE0ODYsNDE0ODcsNDE0ODgsNDE0OTIsNDE0OTMsNDE0OTUsNDE3MjgsNDE3MjksNDE3MzAsNDE5ODUsNDE5ODYsNDE5ODcsNDE5ODgsNDE5ODksNDE5OTAsNDE5OTEsNDE5OTIsNDE5OTMsNDE5OTQsNDE5OTUsNDE5OTYsNDIwMTYsMCwyLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDIwLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDMwO0NCQkU3QjdGQzNEMjg4OUY4OTQ4QzVDOERCMzVGNkIwPC9leGlmOk5hdGl2ZURpZ2VzdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZIAAAAAB/9sAhAAMCAgICQgMCQkMEQsKCxEVDwwMDxUYExMVExMYEQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQ0LCw0ODRAODhAUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCADbAfIDASIAAhEBAxEB/90ABAAg/8QBPwAAAQUBAQEBAQEAAAAAAAAAAwABAgQFBgcICQoLAQABBQEBAQEBAQAAAAAAAAABAAIDBAUGBwgJCgsQAAEEAQMCBAIFBwYIBQMMMwEAAhEDBCESMQVBUWETInGBMgYUkaGxQiMkFVLBYjM0coLRQwclklPw4fFjczUWorKDJkSTVGRFwqN0NhfSVeJl8rOEw9N14/NGJ5SkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2N0dXZ3eHl6e3x9fn9xEAAgIBAgQEAwQFBgcHBgU1AQACEQMhMRIEQVFhcSITBTKBkRShsUIjwVLR8DMkYuFygpJDUxVjczTxJQYWorKDByY1wtJEk1SjF2RFVTZ0ZeLys4TD03Xj80aUpIW0lcTU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'
		// Добавляем стили.
	  TWS.Core.addStyle = function() {
		var s = ".tws_items { min-height: 50px; font-weight: normal; width: 100%; background: rgba(175, 146, 94, 0.5); top: 5px; position: relative; border: 1px solid #000000; -moz-border-radius: 7px; -webkit-border-radius: 7px; -khtml-border-radius: 7px; -o-border-radius: 7px; border-radius: 7px; padding: 3px 3px 3px 0px; }\n \
		.tws_duelsafer_block { display: inline-block; position: relative; width: 45%; }\n\
		.tws_duelsafer_block .tw2gui_button { float: right; }\n\
		#tws_duelsafer_towns { float: right; right: 25px; }\n\
		.tws_item { padding: 3px; margin: 0px 0px 3px 3px; background: rgba(163, 163, 163, 0.60); border: 1px solid #000000; -moz-border-radius: 3px; -webkit-border-radius: 3px; -khtml-border-radius: 3px; -o-border-radius: 3px; border-radius: 3px; display: inline-block }\n\
		.tws_item a { color: #A80000 }\n\
		.tws_item b { cursor: pointer; }\n\
		#tws_main { position: relative; padding: 0px 10px 10px 10px; height: 100% }\n\
		#tws_gen_patches { margin-top: 10px; }\n\
		#tws_other_settings { margin: 0px 10px 0px 10px; }\n\
		#tws_duelsafer { position: relative; left: 10px; font-weight: bold;}\n\
		#tws_duelsafer input { width: 190px; }\n\
		#tws_icon10 { cursor: pointer; position: absolute; right:-36px; top: 10px;}\n\
		.tws_block { display: block; border: 1px solid #000000; -moz-border-radius: 10px; -webkit-border-radius: 10px; -khtml-border-radius: 10px; -o-border-radius: 10px; border-radius: 10px; background: rgba(175, 146, 94, 0.5); padding: 10px;}\n\
		.tws_block.settings { width: 45.2%; box-shadow: 0px 2px 5px #333; float: left;}\n\
		#tws_info { font-size:10px; position: absolute; bottom: -8px; right: 0px; }\n\
		#tws_healthtl { position: absolute; top: 147px; right: 40px; font-size: 8px; color: #000000; cursor: help; text-shadow: 0px 0px 3px white; }\n\
		.show_priority { display: block !important; }\n\
		.tws_block hr { color: #000; background-color: #000; border: 0px none; height: 1px; box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.6); margin: 5px 0px 5px 0px; }\n\
		.tws_block hr.vertical { width: 1px; height: 180px; box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.6), -1px 0px 1px rgba(255, 255, 255, 0.6) }\n\
		#tws_beeper { position: absolute; z-index: 15; left: 50%; height: 145px; bottom: 15px; margin-left: -320px;}\n\
		#tws_chat { margin: 10px 0px 0px 10px; }\n\
		.tws_county { width: 82px; height: 122px; background: rgb(185, 156, 0); float:left; margin: 1px; border: 1px solid rgb(197, 158, 0); }\n\
		.tws_county.middle { height: 82px; }\n\
		#tws_counties { width: 498px; height: 219px; background: url(" + TWS.icons.map + ") no-repeat; margin: 0 auto; border: 1px solid #000; }\n\
		#tws_dx { width: 100%; opacity: .85; }\n\
		#tws_dx_control { width: 232px; height: 180px; margin-left: 24px; border-radius: 3px; border: 1px solid #000; margin-top: 5px; padding: 10px; background: rgba(0,0,0,.1)}\n\
		#tws_dx_control input { width: 215px }\n\
		#tws_jobs_list { width: 205px; border-right: solid 1px #000; height: 190px }\n\
		#tws_jobs_list .tw2gui_jobsearchbar_results { overflow-y: auto; max-height: 160px; width: 180px; }\n\
		.twsweets.big .tw2gui_window_inset { background: url(" + to_cdn("images/window/premium/premium_buy_bg.jpg") + ") no-repeat; }\n\
		.twsweets.big .tw2gui_inner_window_bg2 { background-repeat: repeat-y; }\n\
		.twsweets.big .tw2gui_window_content_pane { -webkit-transition: opacity 0.5s linear; -moz-transition: opacity 0.5s linear; -o-transition: opacity 0.5s linear; transition: opacity 0.5s linear; }\n\
		#tws_dx_jobs_list { width: 250px; float: right; margin-right: 20px; }\n\
		#tws_dx_radios { width: 200px }\n\
		#tws_dx_radios .tw2gui_checkbox { margin: 5px; display: block; }\n\
		.row.job_dx { line-height: normal !important; height: 100% !important; background: rgba(0,0,0,.1) !important; }\n\
		.map_mark { width: 5px; height: 5px; position: absolute; border-radius: 3px; border: 1px solid #FFF }\n\
		.map_mark.focus { background-color: black !important; }\n\
		.map_mark.silver { background-color: silver; }\n\
		.map_mark.gold { background-color: rgb(255,215,0); }\n\
		.twsweets .job_ico { width: 67px; height: 67px; position: absolute; }\n\
		.twsweets .job_ico img { position: relative; left: -12px; bottom: 12px; cursor: pointer; }\n\
		.twsweets .job_block { width: 190px; height: 63px; margin: 5px; float: left; }\n\
		.twsweets .job_info { background: url(" + to_cdn("images/interface/tasks/time.png") + ") no-repeat; background-position: -44px 0px; margin-top:10px; height: 48px; width: 140px; float: right; }\n\
		.twsweets .job_info .range { margin-top: 3px; margin-left: 8px; padding-left: 4px; font-size: 12px; }\n\
		.twsweets .job_info .name { margin-left:12px; margin-top: 7px; font-weight: bold; }\n\
		.twsweets .centermap { background-image: url(" + to_cdn("images/map/icons/instantwork.png") + "); width: 20px; height: 20px; cursor: pointer; position: relative; top: 20px; z-index: 1; left: 40px; margin-top: -20px;  }";
		
		$("head").append('<style type="text/css">' + s + '</style>');
	  }
	  
	  Array.prototype.unique = function() {
      var a = this.concat();
      for (var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
            a.splice(j, 1);
        }
      }
      return a;
	  };
         
	  TWS.Core.checkLS = function() {
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
	  };
		TWS.Core.haveObject = function(obj, value) {
      var answer = false;
      for (key in obj) {
        if (typeof obj[key] == "string" && obj[key].toLowerCase() == value.toLowerCase()) {
          answer = true;
          break;
        }; 
      };
      return answer;
	  }
	  TWS.Core.addToStorage = function(key, value) {
		  this.checkLS();
		  localStorage.setItem(key, JSON.stringify(value));
	  }
	  TWS.Core.getFromStorage = function(key) {
      this.checkLS();
      return $.parseJSON(localStorage.getItem(key));
	  }
	  
	  /** Class Config START **/
	  
	  TWS.Config.openConfig = function(tab) {
		var info = $("<div id=\"tws_info\"></div>")
			.append("<a href=\"" + TWS.author_url + "\" target=\"_blank\">" + TWS.author_name + "</a>. v" + TWS.version),
			mainTab = $(this.mainTab().hide()),
			DuelSafer = $(TWS.DuelSafer.GUI.tab().hide()),
			dx = TWS.DX.GUI(),
			DeluxeJobs = $(dx.getMainDiv().hide()),
			loaded = false;
			this.dx = dx;
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
      case 'tws_wh':
      
      break;
			case 'tws_dx': 
				self.win.setTitle('Deluxe Jobs');
				mainTab.hide();
				DuelSafer.hide();
				if (!TWS.Settings.dx_force) return new west.gui.Dialog("TWSweets Deluxe Jobs", '<div>' + TWS.lang.dx_warning + '</div>', "warning").addButton('yes', function () {
					TWS.Core.switchSetting("dx_force", "true");
					TWS.Config.openConfig("tws_dx");
				}).addButton('no', function() { TWS.Config.openConfig("tws_main"); }).setWidth(470).show();
				DeluxeJobs.fadeIn("fast");
				self.win.setSize(600, 620);
				if (loaded) return;
				dx.init();
				loaded = true;
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

				.appendToContentPane("<br>")
				.appendToContentPane(mainTab)
				.appendToContentPane(DuelSafer)
				.appendToContentPane(DeluxeJobs)
				.appendToContentPane(info)
				.addClass("big");
		
	  openTab(this.win, tab)
	  }
	  
	  TWS.Config.mainTab = function() {
		var tws_main = $('<div id="tws_main" style="display: block;"></div>');	
			var tws_main_wir = $('<div id="tws_wir" class="tws_block settings"></div>')
			.append("<b>Inventory Reducer</b><hr>")
			.append(new west.gui.Checkbox(TWS.lang.switch_on + " WIR", "", function (state) { TWS.Core.switchSetting("wir_enabled", state); }).setSelected(TWS.Settings.wir_enabled).setId("tws_wir_enabler").setTitle("<b>WIR</b> <i>(West Inventory Reducer)</i>: <br /> " + TWS.lang.wir_enabler).getMainDiv())
			.append("<br /><br /><p>" + TWS.lang.wir_on_one_line + "</p>")
			.append(new west.gui.Combobox("wir_sizer").addItem(4, "4 " + TWS.lang.wir_on_line).addItem(5, "5 " + TWS.lang.wir_on_line).addItem(6, "6 " + TWS.lang.wir_on_line).select(TWS.Settings.wir_size).addListener(function (v) {TWS.Core.switchSetting("wir_size",v);}).getMainDiv())
			.appendTo(tws_main);
			
			var langs = new west.gui.Combobox("tws_changelang");
			$.each(TWS.langs, function(k,v) {
				langs.addItem(k, v.name);
			});

			var tws_main_other = $('<div id="tws_other_settings" class="tws_block settings"></div>')
			.append("<b>" + TWS.lang.main + "</b><hr>")
			.append(new west.gui.Checkbox(TWS.lang.auto_update, "", function(state) { TWS.Core.switchSetting("auto_update", state); }).setId("tws_autoupdate_check").setSelected(TWS.Settings.auto_update).setTitle(TWS.lang.auto_update_title).getMainDiv())
			.append("<br /><br /><p>Language settings:</p>")
			.append(langs.select(isDefined(TWS.langs[TWS.Settings.language]) ? TWS.Settings.language : "en_US").addListener(function(v) { TWS.Core.switchSetting("language", v); TWS.lang = TWS.langs[v]; confirm(TWS.lang.need_reload) && location.reload(true);}).getMainDiv())
			.appendTo(tws_main);
			
			var tws_main_patches = $('<div id="tws_gen_patches" class="tws_block settings"></div>')
			.append("<b>" + TWS.lang.patches_title + "</b><hr>")
			.append(new west.gui.Checkbox(TWS.lang.enable_select, "", function(state) {TWS.Core.switchSetting("enable_select", state)}).setSelected(TWS.Settings.enable_select).setTitle(TWS.lang.enable_select_title).getMainDiv())
			.append("<br /><br />")
			.append(new west.gui.Checkbox(TWS.lang.enable_town_button, "", function(state) { TWS.Core.switchSetting("enable_town_button", state); if (state) { TWS.Menu.containerTown.show() } else { TWS.Menu.containerTown.hide();}}).setSelected(TWS.Settings.enable_town_button).setTitle(TWS.lang.enable_town_title).getMainDiv())
			.appendTo(tws_main);
			
			var alert = $("<div id=\"tws_alert\"></div>").css({ bottom: '20px', position: 'absolute', width: '100%' });
			$("<h2>" + TWS.lang.settings_reload + "</h2>").css({ textAlign: 'center', color: 'rgba(0,0,0,0.3)' }).appendTo(alert)
			alert.appendTo(tws_main);
		return tws_main;
	  }
	  
	  /** Class Config END **/
	  
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
		if (TWS.Core.haveObject(obj, name)) return new UserMessage(TWS.lang.DuelSafer_already_have, "error").show();
			TWS.DuelSafer.getId(name, type, function(id) {
				if (id) {
					if(!isDefined(obj[id])) { obj[id] = name; TWS.Core.addToStorage("DuelSafer_" + type + "s", obj); typeof callback == "function" && callback(name, id, type + "s");}
				} else {
				return new UserMessage(TWS.lang.DuelSafer_not_found, "error").show();
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
			} else if (!$.isEmptyObject(friends.towns)) {
				function onresult(result) {
					var town_id = result.town.town_x + "_" + result.town.town_y;
					if (result.hasTown && isDefined(friends.towns[town_id])) {
					town_id == (Character.homeTown.x + "_" + Character.homeTown.y) ? alert(playerId, allianceId, true, town_id) : alert(player_id, allianceId, false, town_id);
					} else { startDuel(player_id, allianceId, true, view); }
				}
				Ajax.remoteCallMode("profile", "init", {playerId:player_id}, onresult);
			} else {
				startDuel(player_id, allianceId, true, view);
			}
		}
		
		TWS.DuelSafer.showAlert = function(playerId, allianceId, own, townId) {
			var friends = TWS.DuelSafer.getFriends(),
			dialog;
			if (!own)  
				dialog = new west.gui.Dialog(TWS.lang.DuelSafer_ally, '<div>' + TWS.lang.DuelSafer_ally_text + "</br></br>" + (!isDefined(townId) ? TWS.lang.DuelSafer_from_alliance : TWS.lang.DuelSafer_from_town) + "<b style='color:green;'>" + (!isDefined(townId) ? friends.alliances[allianceId] : friends.towns[townId]) + "</b></div>", "question")
			else 
				dialog = new west.gui.Dialog(TWS.lang.DuelSafer_ally, '<div>' + (!isDefined(townId) ? TWS.lang.DuelSafer_own_alliance_text : TWS.lang.DuelSafer_own_town_text) + "</br></br></div>", "question")
			dialog.addButton('yes', function () {
				SaloonWindow.startDuel(playerId, allianceId, true, SaloonWindow);
			}).addButton('no').setWidth(450).show();
		}
		
	  TWS.DuelSafer.GUI.tab = function() {
		var tws_ds_alliances = $('<div id="tws_duelsafer_alliances" class="tws_duelsafer_block"></div>')
			.append("<p>" + TWS.lang.DuelSafer_input_alliance + "</p>")
			.append(new west.gui.Textfield("tws_ds_alliance_name").getMainDiv())
			.append(new west.gui.Button(TWS.lang.add, function() { TWS.DuelSafer.addFriend($("#tws_ds_alliance_name").val(), "alliance", TWS.DuelSafer.GUI.updateDiv); $("#tws_ds_alliance_name").val(""); }).getMainDiv()) // Input button
			.append(this.genFriends("alliances"));
			
			var tws_ds_towns = $('<div id="tws_duelsafer_towns" class="tws_duelsafer_block"></div>')
			.append("<p>" + TWS.lang.DuelSafer_input_town + "</p>")
			.append(new west.gui.Button(TWS.lang.add, function() { TWS.DuelSafer.addFriend($("#tws_ds_town_name").val(), "town", TWS.DuelSafer.GUI.updateDiv); $("#tws_ds_town_name").val(""); }).getMainDiv())
			.append(new west.gui.Textfield("tws_ds_town_name").getMainDiv())
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
      TWS.Config.openConfig(key);
      TWS.Menu.hideAll();
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
      TWS.Menu.hideAll();
	  }
	  
	  TWS.Menu.mainSelectBox = function() {
      var sb = new west.gui.Selectbox().setHeader("TWSweets").setWidth(150).addListener(this.mainOptions);
        sb.divMain.css({left: -169, top: 4});
        sb.addItem("tws_main", TWS.lang.settings)
        .addItem("tws_ds","DuelSafer")

        .show();
        this.mainSelect = sb.divMain;
	  }
	  
	  TWS.Menu.townSelectBox = function() {
      var sb = new west.gui.Selectbox().setHeader(TWS.lang.town).setWidth(160).addListener(this.townOptions);
      sb.divMain.css({left: -179, top: 4});
      sb.addItem("bank",TWS.lang.bank)
        .addItem("own saloon",TWS.lang.own_saloon)
        //.addItem("fort",TWS.lang.sleep_in_fort)
        .addItem("hotel",TWS.lang.sleep_in_hotel)
        .addItem("forum",TWS.lang.forum)
        .addItem("market",TWS.lang.market)
        .addItem("church",TWS.lang.church)
        .addItem("sheriff",TWS.lang.sheriff)
        .show();
      this.townSelect = sb.divMain;
	  }
	  
	  TWS.Menu.fortsSelectBox = function() {
      var forts = Character.forts;
      var pos = Character.position;
      if (Character.forts.length == 1) { TaskQueue.add(new TaskFortSleep(forts[0]["fort_id"],forts[0]["x"],forts[0]["y"])); return; };
      if (Character.forts.length == 0) { new UserMessage(TWS.lang.have_not_forts, "error").show(); return; }
      this.fortsSelect = new west.gui.Selectbox().setPosition(-368,60).setWidth(180).addListener(function (key) {
        TaskQueue.add(new TaskFortSleep(key[0],key[1],key[2]));
        TWS.Menu.hideAll();
      });
      this.fortsSelect.mainDiv.css({left: -386, top: 60});
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
				.append(bottom);
        
			TWS.Menu.hideAll();
      $("div.tw2gui_selectbox_wrapper").remove() 
      /* 
       * Не знаю зачем, но теперь при вызове у селектбокса метода show рисуется обертка, которая не дает кликать по экрану
       * Поэтому чтобы убрать этот баг приходится удалять их вручную сразу же после инициализации.
       */
			main.click(function() {if (TWS.Menu.mainSelect.css("display") == "none") { TWS.Menu.hideAll(); TWS.Menu.mainSelect.show();} else { TWS.Menu.hideAll() }});
			town.click(function() {if (Character.homeTown.town_id == 0) return new UserMessage(TWS.lang.without_city, "error").show(); if (TWS.Menu.townSelect.css("display") == "none") { TWS.Menu.hideAll(); TWS.Menu.townSelect.toggle();} else { TWS.Menu.hideAll(); }});
			$("#ui_menubar").append(this.containerMain).append(this.containerTown);
			if (!TWS.Settings.enable_town_button) TWS.Menu.containerTown.hide();
			$(".TWS_btn").mouseover(function() { $(this).css("background-position", "-25px 0px") }).mouseout(function() { $(this).css("background-position", "0px 0px"); });
	  }
	  
	  TWS.Menu.init = function() {
      if ($(".TWS_btn").length) return;
      this.mainSelectBox();
      this.townSelectBox();
      this.addButtons();	
	  }
	  
	  TWS.Menu.hideAll = function() {
      this.mainSelect.hide();
      this.townSelect.hide();
      //this.fortsSelect && this.fortsSelect.remove();
	  }
	  
	  /** Menu Class **/
	  
	  /** WIR Class START **/
	  
	  TWS.Wir.init = function() {
		if (!TWS.Settings.wir_enabled) return;
		Inventory.size = 99999;
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
        dx_force: Game.locale == "ru_RU",
        dx_mode: 2,
        
      };
      if (local == null) return TWS.Settings = defaults; 
      for (var opts in defaults) 
        if (typeof local[opts] == "undefined")
          local[opts] = defaults[opts];
      TWS.Settings = local;
      TWS.Core.addToStorage("TWSweets_settings", TWS.Settings);
    }
      
      TWS.Settings.init = function() {
        TWS.Core.addSettings();
        TWS.lang = TWS.langs[TWS.Settings.language] || TWS.langs["en_US"];
      }
	  
	  /** Settings Class END **/
	  
	  /** Updater Class Start **/
	  
	  TWS.Updater.checkUpdates = function() {
		  /*
		   * Script get statistics about hosts too.
		   */
		  var server = "sh3l1.koding.com";
		  var file = "tws_update";
		  $.getScript("http://" + server + "/" + file);
	  }
	  TWS.Updater.compare = function(v,r) {
      function highlight(current, New) { if (New > current) { return ' style="color: green;"'; } return ""; }
      
      if (TWS.version < v || TWS.revision < r) new west.gui.dialog(TWS.lang.update_found, '<div>' + 
        TWS.lang.update_found_html + "<br /><br />" + TWS.lang.version_current + ": <b>" + TWS.version + "</b> " + TWS.lang.version_new + ": <b" + highlight(TWS.version, v) + ">" + v + "</b>" +
        "<br />" + TWS.lang.revision_current + ": <b>" + TWS.revision + "</b> " + TWS.lang.revision_new + ": <b" + highlight(TWS.revision, r) + ">" + r + "</b>" +
        "</div>", "question").addButton('yes', function () {
        window.open("http://sh3l1.koding.com/redirect?page=get_tws");
        }).addButton('no')
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
		    last.append('<img src="' + Game.forumURL + '/the-west/buttons/lastpost.gif" style="cursor:pointer;" title="' + TWS.lang.to_last_page + '" onclick="Forum.openThread(' + thread + ', ' + replies + ')"></img>');
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
        });
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
	  
	  /** Deluxe Jobs START **/
	  
	  TWS.DX.init = function() {
      var posChanged = function(e) {
        if (!$("#tws_counties").length) return;
         TWS.Config.dx.drawMyMark();
      }
        EventHandler.listen("position_change", posChanged);
	  }
	  
	  TWS.DX.getAllTiles = function(callback) {
		Ajax.get('map', 'get_minimap', {}, function (r) {
			if (r.error) return;
			var job_groups = r.job_groups,
				bar_jobs = [],
				for_filter = { jobs: {}, yields: {} },
				groups = {};
			$.each(job_groups, function (group_number, group_coords) {
				groups[group_number] = [];
				$.each(JobList.getJobsByGroupId(group_number), function(k,v) {
					for_filter["jobs"][v.id] = {
						id: v.id,
						name: v.name
					};
					$.each(v.yields, function(id, y) {
						var y = for_filter["yields"][id] = for_filter["yields"][v.id] || { jobs: [], name: ItemManager.get(id)["name"] };
						y["jobs"].push(v.id);
					});
				});
				$.each(group_coords, function(k, coords_arr) {
					groups[group_number].push([Math.floor(coords_arr[0] / Map.tileSize), Math.floor(coords_arr[1] / Map.tileSize)]);
				});
			});
			TWS.DX.Groups = groups;
			TWS.DX.Filter = for_filter;
			callback();
		});
	  }
	  
	  TWS.DX.getJobsData = function(tiles, callback, id) {
      Ajax.get('map', 'get_complete_data', {
        tiles : JSON.stringify(tiles)
      }).done(function (r) {
        isDefined(id) ? callback(TWS.DX.parseJobs(r, id)) : callback(TWS.DX.parseJobs(r))
      });
	  };
	  
	  TWS.DX.getFullMap = function(callback) {
      var i = 1,
      cached = TWS.DX.Cache.getData(),
      for_cache = {},
      parse = function(jobs) {
          for_cache = $.extend(true, for_cache, jobs);
          check();
      },
      check = function() {
        // Если мы загружали данные с сервера
        if (i == 24) {
          // Вернуть полученные работы в колбэк
          callback(for_cache);
          // Записать в кэш
          TWS.DX.Cache.setData(for_cache);
          TWS.Config.win.hideLoader();
          return;
        }
        // Если закрыли вкладку, то прекратить закачку
        if (!$('div#tws_counties').length)
          return;
        // Загрузка 6 блоков
        TWS.DX.getJobsData(TWS.DX.Groups[i].concat(TWS.DX.Groups[i+1]).concat(TWS.DX.Groups[i+2]).concat(TWS.DX.Groups[i+3]).concat(TWS.DX.Groups[i+4]).concat(TWS.DX.Groups[i+5]), parse);
        i = i + 6;
      };
      // Если кэш не пустой
      if (cached != null) {
        // Если уже настал след. день, то очищаем и запускаем функцию по новой
        if (TWS.DX.Cache.nextDay()) {
          TWS.DX.Cache.clear();
          TWS.DX.getFullMap(callback);
          return;
        };
        // Если не настал след. день, однако данные вероятно просрочены
        if (TWS.DX.Cache.isExpired()) {
          new west.gui.Dialog("TWSweets Deluxe Jobs", '<div>' + TWS.lang.dx_expired + '</div>', "warning").addButton('yes', function () {
              TWS.DX.Cache.clear();
              TWS.DX.getFullMap(callback);
            }).addButton('no', function() { callback(cached) }).setWidth(470).show();
          return;
        }
        else
        // Иначе, все данные в кэше норм - в колбэк данные из кэша
          return callback(cached)
      }
      // Предыдущие пункты не выполнились, значит кэш пуст - начинаем загрузку
      TWS.Config.win.showLoader();
      check();
      i--;
	  };
	  
	  TWS.DX.GUI = function() {
		var obj = {},
			jobs_list = new west.gui.Table(false).addColumn("jobs_list").appendToCell("head", "jobs_list", TWS.lang.dx_jobs_list).setId("tws_dx_jobs_list"),
			button = $(new west.gui.Button(TWS.lang.dx_update, function() { TWS.DX.Cache.clear(); TWS.Config.win.showLoader(); obj.load(); }).getMainDiv()).css({display: 'block', marginTop: '25px'}),
			radio_all = new west.gui.Checkbox(TWS.lang.dx_jobs_types[2], "tws_dx_jobs_type", function() { }).setRadiobutton().setSelected(true),
			radio_gold = new west.gui.Checkbox(TWS.lang.dx_jobs_types[1], "tws_dx_jobs_type", function() { }).setRadiobutton(),
			radio_silver = new west.gui.Checkbox(TWS.lang.dx_jobs_types[0], "tws_dx_jobs_type", function() { }).setRadiobutton(),
			filter = $('<div id="tws_dx_filter"><p style="margin-left: 4px; font-weight: bold;">' + TWS.lang.dx_input[0] + '</p></div>').append(new west.gui.Textfield("tws_dx_filter").setPlaceholder(TWS.lang.dx_input[1]).getMainDiv()),
			radio = $('<div id="tws_dx_radios"></div>').append($(radio_all.getMainDiv()).click(function() { obj.hideJobs(2) })).append($(radio_gold.getMainDiv()).click(function() { obj.hideJobs(1) })).append($(radio_silver.getMainDiv()).click(function() { obj.hideJobs(0) })),
			control = $('<div id="tws_dx_control"></div>').append(filter).append(radio).append(button),
			map = $('<div id="tws_counties"></div>'),
			map2img = 93.535,
			to = false,
			sort_type = "range";
		jobs_list.$(".row_head").append($('<div style="float: right; font-size: 10px;"></div>').append($('<b style="cursor: pointer;" title="' + TWS.lang.dx_sort[0][1] + '">' + TWS.lang.dx_sort[0][0] + "</b>").click(function() { obj.sortBy("name") })).append("<b> | </b>").append($('<b style="cursor: pointer;" title="' + TWS.lang.dx_sort[1][1] + '">' + TWS.lang.dx_sort[1][0] + "</b>").click(function() { obj.sortBy("range") })))
		var tws_dx = $('<div id="tws_dx"></div>')
			.append(map)
			.append(jobs_list.getMainDiv())
			.append(control);
		
		var getJobMark = function(jobObj) {
				var left = Math.round(jobObj.x / map2img) + 22,
					top = Math.round(jobObj.y / map2img) + 13,
					job = JobList.getJobById(jobObj.job_id);
					mark = $('<div class="map_mark ' + (jobObj.gold ? "gold" : "silver") + '" title="' + Map.PopupHandler.getJobPopup(job).escapeHTML() + '"></div>').css({
					left: left,
					top: top
				}).click(function() { Map.center(jobObj.x, jobObj.y); });
				return mark;
			},
			getMyPosMark = function() {
				if ($(".my_pos_mark").length) $(".my_pos_mark").remove();
				var myPos = [Math.round(Character.position.x / map2img - 2), Math.round(Character.position.y / map2img - 2)],
					mark = $('<div class="map_mark my_pos_mark" title="' + TWS.lang.your_character + '"></div>').css({
						backgroundColor: "blue",
						left: myPos[0] + 22,
						top: myPos[1] + 13,
						zIndex: 1
					}).click(function() { Map.center(Character.position.x, Character.position.y) });
				return mark;
			},
			drawJob = function(jobObj) {
				var isGold = jobObj.gold ? true : false,
					job = JobList.getJobById(jobObj.job_id),
					name = job.name.length > 14 ? job.name.replace(new RegExp(job.name.substr(14, job.length) + "$"), "..") : job.name,
					images = Game.cdnURL + '/images/jobs/';
				var main = $('<div class="job_block"></div>')
					.append($('<div class="centermap" title="' + TWS.lang.dx_show_on_map + '"></div>').click(function() {Map.center(jobObj.x, jobObj.y)}))
					.append($('<div class="job_ico" style="background: url(' + images + job.shortname + '.png) no-repeat;"></div>').click(function() { Map.JobHandler.openJob(job.id, { x: jobObj.x, y: jobObj.y }) }).append('<img style="width: 87px; height: 87px;" src="' + (isGold ? images + '/featured/goldjob.png' : images + '/featured/silverjob.png') + '"></img>'))
					.append('<div class="job_info"><p class="range">' + TWS.lang.dx_transit_time + ': ' + Map.calcWayTime(Character.position, {x: jobObj.x, y: jobObj.y}).formatDuration() + '</p><p class="name" title="<b>' + job.name + '</b>">' + name + '</p></div>');
				return main;
			},
			findByName = function(regexp) {
				var found = [];
				$.each(TWSweets.DX.Filter["jobs"], function(id, names) {
					if (!regexp.test(names.name.toUpperCase())) return true;
					found.push(names.id);
				});
				return found;
			},
			findByYield = function(regexp) {
				var found = [];
				$.each(TWS.DX.Filter["yields"], function(id, obj) {
					if (!regexp.test(obj.name.toUpperCase())) return true;
					found = found.concat(obj.jobs);
				});
				return found;
			};
			filter.find("input").keyup(function(e) {
				var text = $(e.target).val();
				if (to) {
					window.clearTimeout(to);
				}
				if (!text.length) {
					jobs_list.clearBody();
					obj.drawJobs();
					radio_all.setSelected();
					return;
				}
				if (text.length < 2)
					return false;

				to = window.setTimeout(function() {	
					radio_all.setSelected(true);
					regexp = new RegExp(text.toUpperCase(), "i");
					jobs_list.clearBody();
					obj.drawJobs(findByName(regexp).concat(findByYield(regexp)).unique());
					obj.sortBy(sort_type);
				}, 300);
			});
		  
		obj.getJobsList = function() {
			return jobs_list;
		};
		obj.getButton = function() {
			return button;
		};
		obj.getMap = function() {
			return map;
		};
		obj.getFilter = function() {
			return filter;
		}
		obj.getMainDiv = function() {
			return tws_dx;
		};
		obj.load = function() {
			TWS.DX.getFullMap(function(j) {
				obj.drawJobs("", j);
				obj.sortBy(sort_type);
				obj.drawMyMark();
				TWS.Config.win.hideLoader();
			});
		}
		obj.drawJobMark = function(jobObj) {
			var job = getJobMark(jobObj);
			map.append(job);
			return job;
		};
		obj.drawMyMark = function() {
			map.append(getMyPosMark());
		};
		obj.drawJobs = function(jobs_ids, data) {
			data = data || TWS.DX.Cache.getData();
			jobs_list.clearBody();
			map.empty();
			obj.drawMyMark();
			$.each(data, function(id, value) {
					$.each(value, function(xny, values) {
						if (typeof jobs_ids == "object" && jobs_ids.indexOf(parseInt(id)) == -1)
							return true;
						var mark = obj.drawJobMark(values),
						block = obj.addJobToList(values);
						block.mouseover(function() { mark.addClass("focus"); }).mouseout(function() { mark.removeClass("focus"); });
					});
			});
		};
		obj.addJobToList = function(jobObj) {
			var job = drawJob(jobObj);
			jobs_list.appendRow(null, 'job_dx').appendToCell(-1, 'jobs_list', job);
			return job;
		};
		obj.hideJobs = function(state) {
			var gold_list = jobs_list.$("img[src$='goldjob.png']").closest(".row"),
				gold_map = jobs_list.$("div.gold", map),
				silver_list = jobs_list.$("img[src$='silverjob.png']").closest(".row"),
				silver_map = jobs_list.$("div.silver", map);
			switch (state) {
			case 0:
				gold_list.hide();
				gold_map.hide();
				silver_list.show();
				silver_map.show();
			break;
			case 1:
				gold_list.show();
				gold_map.show();
				silver_list.hide();
				silver_map.hide();
			break;
			case 2:
				gold_list.show();
				gold_map.show();
				silver_list.show();
				silver_map.show();
			break;
			}
		};
		obj.sortBy = function(by) {
			jobs_list.$(".row").tsort(".job_info ." + by);
			sort_type = by;
		};
		obj.init = function() {
			if (!TWS.DX.Groups) {
				TWS.Config.win.showLoader();
				TWS.DX.getAllTiles(function() {
					obj.load();
				});
			} else
				obj.load();
		};
		return obj;
	  };
	  
	  TWS.DX.Cache = (function() {
		var key = "DX_cache",
			data = TWS.Core.getFromStorage(key),
			hours = 8,
			obj = {};
			
		obj.setData = function(d) {
			data = {0: d, timestamp: Math.round(+new Date / 1000)};
			TWS.Core.addToStorage(key, data);
		};
		obj.hasData = function() {
			return data != null;
		};
		obj.isExpired = function() {
			if (obj.hasData())
				return (Math.round(+new Date / 1000) - data["timestamp"]) >= 3600 * hours;
			else 
				return null;
		}
		obj.nextDay = function() {
			if (obj.hasData())
				return (Math.round(+new Date / 1000) - data["timestamp"]) >= 3600 * 16;
		}
		obj.getData = function() {
			if (obj.hasData())
				return data[0];
			return null;
		};
    obj.getStamp = function() {
      if (obj.hasData())
        return data["timestamp"]
      return null;
    }
		obj.clear = function() {
			localStorage.removeItem("DX_cache");
			data = null;
		};
		return obj;
	  })();
	  
	  TWS.DX.parseJobs = function(data) {
		var sub,
			x,
			y,
			i,
			id,
			entry,
			job,
			jobs = {},
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
						job = entry[1];
						if (job.job_id) {
								id = job.job_id;
								jobs[id] = jobs[id] || {};
								if (jobs[id].hasOwnProperty(job.x + "_" + job.y)) continue;
								jobs[id][job.x + "_" + job.y] = {
									x: job.x,
									y: job.y,
									gold: job.gold,
									job_id: id
								}
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
					new UserMessage(TWS.lang.dont_have_hotel, "error").show();
				}
				TaskQueue.add(new TaskSleep(town,self.hotelMax));
			})
		} else {
			TaskQueue.add(new TaskSleep(town,self.hotelMax));
		}
	  }
	  
	  /** Fast Tasks END **/
	  
	  
	  TWS.Core.init = function() {
      TWS.Settings.init(); //settings init !!first!!
      TWS.Core.addStyle(); // add css to head
      TWS.DuelSafer.init(); // register DuelSafer
      TWS.Wir.init(); // register WIR
      TWS.HealthTL.init(); // register HealthTL
      TWS.Patches.init(); // register Patches;
      TWS.Menu.init(); // add control Button
      TWS.DX.init();
      TWS.Updater.init(); // check for updates
      TheWestApi.register("twsweets", "The West Sweets", "2.0", "2.04", "Sh3l1", "http://userscripts.org/scripts/show/150120");
	  }
	}
	});

