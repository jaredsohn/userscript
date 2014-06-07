var scr_version = <><![CDATA[
// ==UserScript==
// @name           Cria perfis para determinadas tarefas
// @namespace  Cria perfis para determinadas tarefas
// @author          James Maxwel
// @description    Cria perfis para determinadas tarefas
// @version        0.2.5
// @include        http://*pennergame.de/*
// @include        http://*clodogame.fr/*
// @include        http://*mendigogame.es/*
// @include        http://*menelgame.pl/*
// @include        http://*dossergame.co.uk/*
// @include        http://*serserionline.com/*
// @include        http://*bumrise.com/*
// @include        http://*faveladogame.com.br/*
// @exclude        */change_please*
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

function German() {
	this.LANGUAGE_NAME            = "Deutsch";
	
	this.NAME_TEXT                = "Name:";
	this.PLUNDER_TEXT             = "Plunder";
	this.HOME_TEXT                = "Eigenheim";
	this.WEAPON_TEXT              = "Waffe";
	this.DISTRICT_TEXT            = "Stadtteil";
	
	this.UNCHANGED_PLUNDER_TEXT   = "Plunder beibehalten";
	this.UNCHANGED_HOME_TEXT      = "nicht umziehen";
	this.UNCHANGED_WEAPON_TEXT    = "Waffe beibehalten";
	this.UNCHANGED_DISTRICT_TEXT  = "nicht umziehen";
	
	this.MISSING_PLUNDER_TEXT     = "Plunder nicht gefunden!";
	this.MISSING_HOME_TEXT        = "Eigenheim nicht gefunden!";
	this.MISSING_WEAPONG_TEXT     = "Waffe nicht gefunden!";
	this.MISSING_DISTRICT_TEXT    = "Stadtteil nicht gefunden!";
	
	this.EQUIPMENT_CHANGER_TEXT   = "Aufgaben";
	this.NEWLINE_TEXT             = "eine weitere Zeile hinzufügen";
	this.NO_CFGS_TEXT             = "noch keine Konfigurationen angegeben";
	this.DO_NOTHING_TEXT          = "nichts tun";
	this.ACCEPT_TEXT              = "Änderungen übernehmen";
	this.DELETE_TEXT              = "Zeile löschen";
	this.CONFIGURATION_SAVED_TEXT = "Konfiguration gespeichert.";
	this.STATUS_HEADLINE_TEXT     = "Ausrüstungswechsel";
	this.CLOSE_BUTTON_TEXT        = "schließen";
	this.UNKN_PLUNDER_ID_HL_TEXT  = "Aufgabenwechsler";
	this.UNKN_PLUNDER_ID_TEXT     = "Du besitzt den derzeitig angelegten Plunder nur ein mal. " +
			"Er ist damit nicht automatisch anlegbar.";
	this.SHOW_CONFIGURATIONS_TEXT = "Einstellungen";
	this.EDIT_CONFIGURATIONS_TEXT = "Einstellungen bearbeiten.";
	
	this.FORFEIT_UNSAVED_CHANGES  = "Eventuelle nicht-übernommene Änderungen gehen hierbei verloren!";
	this.ADD_NEW_LINE_QUESTION    = "Neue Zeile hinzufügen?"
	this.FINISH_CFG_TEXT          = "Konfiguration abschließen";
	this.FINISH_CFG_QUESTION      = "Konfigurationsänderung wirklich abschließen?";
	this.DELETE_LINE_QUESTION     = "Konfigurationszeile wirklich löschen?";
	
	this.CHANGED_PLUNDER_TEXT     = "Angelegt";
	this.CHANGED_HOME_TEXT        = "Neues Eigenheim";
	this.CHANGED_WEAPON_TEXT      = "Neue Waffe";
	this.CHANGED_DISTRICT_TEXT    = "Neuer Stadtteil";
	
	this.CHANGE_PLUNDER_ERROR     = "Plunder nicht gewechselt!"
	this.CHANGE_HOME_ERROR        = "Eigenheim nicht gewechselt!";
	this.CHANGE_WEAPON_ERROR      = "Waffe nicht gewechselt!";
	this.CHANGE_DISTRICT_ERROR    = "Stadtteil nicht gewechselt!";
	
	this.PERMIL_TEXT              = "Promille";
	this.CHANGED_PERMIL_TEXT      = "Neuer Pegel";
	this.CHANGE_PERMIL_ERROR      = "Promille konne nicht geändert werden.";
	this.PERMIL_UNCHANGED_TEXT    = "Pegel ist bei %1% ‰";
	this.PERMIL_BUY_GOODS         = "Du musst Alk und/oder Nahrung einkaufen!";
	this.BROWSER_TOO_OLD          = "Update deinen Firefox auf 3.5!";
	this.PERMIL_CLASSES           = {
		"-1": { "name": "nicht ändern", "min": 0.00, "max": 4.00, "higher": false },
		"0":  { "name": "trocken",      "min": 0.00, "max": 0.75, "higher": true },
		"1":  { "name": "mittel",       "min": 2.50, "max": 3.00, "higher": false },
		"2":  { "name": "vorhaltend",   "min": 2.80, "max": 3.50, "higher": false },
		"3":  { "name": "besoffen",     "min": 3.50, "max": 4.00, "higher": true }
	};
}

function English() {
	this.LANGUAGE_NAME            = "English";
	
	this.NAME_TEXT                = "Titulo:";
	this.PLUNDER_TEXT             = "Treco";
	this.HOME_TEXT                = "Lar";
	this.WEAPON_TEXT              = "Arma";
	this.DISTRICT_TEXT            = "Bairro";
	
	this.UNCHANGED_PLUNDER_TEXT   = "Manter Treco";
	this.UNCHANGED_HOME_TEXT      = "Não Alterar";
	this.UNCHANGED_WEAPON_TEXT    = "Manter Arma";
	this.UNCHANGED_DISTRICT_TEXT  = "Não Alterar";
	
	this.MISSING_PLUNDER_TEXT     = "Treco não encontrado!";
	this.MISSING_HOME_TEXT        = "Lar não encontrado!";
	this.MISSING_WEAPONG_TEXT     = "Arma não encontrada!";
	this.MISSING_DISTRICT_TEXT    = "Bairro não encontrado!";
	
	this.EQUIPMENT_CHANGER_TEXT   = "Tarefa";
	this.NEWLINE_TEXT             = "Adicionar nova configuração";
	this.NO_CFGS_TEXT             = "Não à configurações salvas";
	this.DO_NOTHING_TEXT          = "Perfil1";
	this.ACCEPT_TEXT              = "Aceitar configuração";
	this.DELETE_TEXT              = "Excluir configuração";
	this.CONFIGURATION_SAVED_TEXT = "Configurações salvas.";
	this.STATUS_HEADLINE_TEXT     = "Alternador de tarefas";
	this.CLOSE_BUTTON_TEXT        = "Fechar";
	this.UNKN_PLUNDER_ID_HL_TEXT  = "Alternador de tarefas";
	this.UNKN_PLUNDER_ID_TEXT     = "Treco pode ser usado apenas uma vez. " +
		"Por isso, não pode ser equipado automaticamente.";
	this.SHOW_CONFIGURATIONS_TEXT = "Configurações";
	this.EDIT_CONFIGURATIONS_TEXT = "Editar configurações.";
	
	this.FORFEIT_UNSAVED_CHANGES  = "As alterações não salvas serão perdidas!";
	this.ADD_NEW_LINE_QUESTION    = "Adicionar novas configurações?"
	this.FINISH_CFG_TEXT          = "Aceitar configuração";
	this.FINISH_CFG_QUESTION      = "Você realmente quer finalizar a configuração?";
	this.DELETE_LINE_QUESTION     = "Você realmente quer apagar esta configuração?";
	
	this.CHANGED_PLUNDER_TEXT     = "Equipado";
	this.CHANGED_HOME_TEXT        = "Novo Lar";
	this.CHANGED_WEAPON_TEXT      = "Nova Arma";
	this.CHANGED_DISTRICT_TEXT    = "Novo Bairro";
	
	this.CHANGE_PLUNDER_ERROR     = "Treco permaneceu inalterado!"
	this.CHANGE_HOME_ERROR        = "Lar manteve-se inalterado!";
	this.CHANGE_WEAPON_ERROR      = "Arma manteve-se inalterada!";
	this.CHANGE_DISTRICT_ERROR    = "Bairro manteve-se inalterado!";
	
	this.PERMIL_TEXT              = "Alcool";
	this.CHANGED_PERMIL_TEXT      = "Novo BAC";
	this.CHANGE_PERMIL_ERROR      = "O BAC não poderá ser mudado.";
	this.PERMIL_UNCHANGED_TEXT    = "BAC: %1% ‰";
	this.PERMIL_BUY_GOODS         = "Tem que comprar bebidas e / ou comida!";
	this.BROWSER_TOO_OLD          = "Você precisa do Firefox 3.5 ou superior!";
	this.PERMIL_CLASSES           = {
		"-1": { "name": " Não Alterar", "min": 0.00, "max": 4.00, "higher": false },
		"0":  { "name": " Sobrio",        "min": 0.00, "max": 0.75, "higher": true },
		"1":  { "name": " Meia Boca",       "min": 2.50, "max": 3.00, "higher": false },
		"2":  { "name": " Com Brilho no Zoio",      "min": 2.80, "max": 3.50, "higher": false },
		"3":  { "name": " Podre de Bebado",   "min": 3.50, "max": 4.00, "higher": true }
	};
}

/**
 * French translation by lordclodo. Thank you very much!
 * @author lordclodo <http://userscripts.org/users/122087>
 */
function French() {
	this.LANGUAGE_NAME            = "Français";
	
	this.NAME_TEXT                = "Nom du profil:";
	this.PLUNDER_TEXT             = "Babiole";
	this.HOME_TEXT                = "Domicile";
	this.WEAPON_TEXT              = "Arme";
	this.DISTRICT_TEXT            = "Arrondissement";
	
	this.UNCHANGED_PLUNDER_TEXT   = "Babiole à équiper";
	this.UNCHANGED_HOME_TEXT      = "Ne pas déménager";
	this.UNCHANGED_WEAPON_TEXT    = "Garder la même arme";
	this.UNCHANGED_DISTRICT_TEXT  = "Ne pas déménager";
	
	this.MISSING_PLUNDER_TEXT     = "Babiole non trouvée!";
	this.MISSING_HOME_TEXT        = "Domicile non trouvé!";
	this.MISSING_WEAPONG_TEXT     = "Arme non trouvée!";
	this.MISSING_DISTRICT_TEXT    = "Arrondissement non trouvé!";
	
	this.EQUIPMENT_CHANGER_TEXT   = "Profil";
	this.NEWLINE_TEXT             = "Ajouter un profil";
	this.NO_CFGS_TEXT             = "Pas encore configuré";
	this.DO_NOTHING_TEXT          = "Passer";
	this.ACCEPT_TEXT              = "Enregistrer les changements";
	this.DELETE_TEXT              = "Effacer la config.";
	this.CONFIGURATION_SAVED_TEXT = "Configuration enregistrée!";
	this.STATUS_HEADLINE_TEXT     = "Changeur de profil";
	this.CLOSE_BUTTON_TEXT        = "Fermer";
	this.UNKN_PLUNDER_ID_HL_TEXT  = "Changeur de profil";
	this.UNKN_PLUNDER_ID_TEXT     = "Cette babiole ne peut être utilisée qu'une seule fois " +
		"elle ne peut donc pas être équipée automatiquement.";
	this.SHOW_CONFIGURATIONS_TEXT = "Configuration";
	this.EDIT_CONFIGURATIONS_TEXT = "Changer la configuration.";
	
	this.FORFEIT_UNSAVED_CHANGES  = "Tout changement non sauvegardé sera perdu!";
	this.ADD_NEW_LINE_QUESTION    = "Ajouter un nouveau profil?"
	this.FINISH_CFG_TEXT          = "Accepter la configuration";
	this.FINISH_CFG_QUESTION      = "Voulez-vous enregistrer la configuration?";
	this.DELETE_LINE_QUESTION     = "Voulez-vous vraiment supprimer ce profil?";
	
	this.CHANGED_PLUNDER_TEXT     = "Nouvelle babiole";
	this.CHANGED_HOME_TEXT        = "Nouveau domicile";
	this.CHANGED_WEAPON_TEXT      = "Nouvelle arme";
	this.CHANGED_DISTRICT_TEXT    = "Nouvel arrondissement";
	
	this.CHANGE_PLUNDER_ERROR     = "La babiole n'a pas été changée!"
	this.CHANGE_HOME_ERROR        = "Le domicile n'a pas été changé!";
	this.CHANGE_WEAPON_ERROR      = "L'arme n'a pas été changée!";
	this.CHANGE_DISTRICT_ERROR    = "L'arrondissement n'a pas été changé!";

	this.PERMIL_TEXT = "Pour Mille"; 
	this.CHANGED_PERMIL_TEXT = "Nouveau taux d'alcool";
	this.CHANGE_PERMIL_ERROR = "Ton taux d'alcool n'a pas pu être changé";
	this.PERMIL_UNCHANGED_TEXT = "Taux d'alcool: %1% ‰";
	this.PERMIL_BUY_GOODS = "T'as besoin d'acheter de la binouze ou de la bouffe!";
	this.BROWSER_TOO_OLD = "Une version de Firefox > 3.5 est nécessaire!";
	this.PERMIL_CLASSES = { 
		"-1": { "name": "Ne change pas", "min": 0.00, "max": 4.00, "higher": false },
		"0":  { "name": "Sobre",         "min": 0.00, "max": 0.75, "higher": true },
		"1":  { "name": "Bonne humeur",  "min": 2.50, "max": 3.00, "higher": false },
		"2":  { "name": "Bourré",        "min": 2.80, "max": 3.50, "higher": false },
		"3":  { "name": "Mort saoul",    "min": 3.50, "max": 4.00, "higher": true }
	};
}

/**
* Traducción al español por glomayol.
* @author glomayol <http://userscripts.org/users/125170>
*/
function Spanish() {
	this.LANGUAGE_NAME = "Spanish";
	
	this.NAME_TEXT = "Título:";
	this.PLUNDER_TEXT = "Cachivache";
	this.HOME_TEXT = "Domicilio";
	this.WEAPON_TEXT = "Arma";
	this.DISTRICT_TEXT = "Barrio";
	
	this.UNCHANGED_PLUNDER_TEXT = "sin cambio";
	this.UNCHANGED_HOME_TEXT = "sin cambio";
	this.UNCHANGED_WEAPON_TEXT = "sin cambio";
	this.UNCHANGED_DISTRICT_TEXT = "sin cambio";
	
	this.MISSING_PLUNDER_TEXT = "Cachivache no disponible!";
	this.MISSING_HOME_TEXT = "Domicilio no encontrado!";
	this.MISSING_WEAPONG_TEXT = "Arma no disponible!";
	this.MISSING_DISTRICT_TEXT = "Barrio no existe!";
	
	this.EQUIPMENT_CHANGER_TEXT = "Tareas";
	this.NEWLINE_TEXT = "nueva tarea";
	this.NO_CFGS_TEXT = "no configs, yet";
	this.DO_NOTHING_TEXT = "saltar";
	this.ACCEPT_TEXT = "Aceptar cambios";
	this.DELETE_TEXT = "Borrar config.";
	this.CONFIGURATION_SAVED_TEXT = "Config. salvada.";
	this.STATUS_HEADLINE_TEXT = "Cambio tareas";
	this.CLOSE_BUTTON_TEXT = "cerrar";
	this.UNKN_PLUNDER_ID_HL_TEXT = "Cambio tareas";
	this.UNKN_PLUNDER_ID_TEXT = "Ya tienes ese cachivache. " +
			"pero no puede ser equipado automáticamente.";
	this.SHOW_CONFIGURATIONS_TEXT = "Configuraciones";
	this.EDIT_CONFIGURATIONS_TEXT = "Editar config.";
	
	this.FORFEIT_UNSAVED_CHANGES = "Los cambios no salvados se perderán!";
	this.ADD_NEW_LINE_QUESTION = "Añadir nueva config.?"
	this.FINISH_CFG_TEXT = "Aceptar configuración";
	this.FINISH_CFG_QUESTION = "Seguro que quieres salir?";
	this.DELETE_LINE_QUESTION = "Seguro que quieres borrar esta línea de la config.?";
	
	this.CHANGED_PLUNDER_TEXT = "Equipado con";
	this.CHANGED_HOME_TEXT = "Nuevo domicilio";
	this.CHANGED_WEAPON_TEXT = "Nueva arma";
	this.CHANGED_DISTRICT_TEXT = "Nuevo barrio";
	
	this.CHANGE_PLUNDER_ERROR = "Cachivache no cambiado!"
	this.CHANGE_HOME_ERROR = "Domicilio no cambiado!";
	this.CHANGE_WEAPON_ERROR = "Arma no cambiada!";
	this.CHANGE_DISTRICT_ERROR = "Sigues en el mismo barrio!";
	
	this.PERMIL_TEXT = "por mil";
	this.CHANGED_PERMIL_TEXT = "Grado alcohol";
	this.CHANGE_PERMIL_ERROR = "Grado alcohol no puede cambiarse.";
	this.PERMIL_UNCHANGED_TEXT = "Alcohol: %1% ‰";
	this.PERMIL_BUY_GOODS = "Comprado alcohol y/o alimentos!";
	this.BROWSER_TOO_OLD = "Necesitas Firefox 3.5 o superior!";
	this.PERMIL_CLASSES = {
		"-1": { "name": "sin cambio",   "min": 0.00, "max": 4.00, "máximo": false },
		"0":  { "name": "sobrio",       "min": 0.00, "max": 0.75, "máximo": true },
		"1":  { "name": "alegre",       "min": 2.50, "max": 3.00, "máximo": true },
		"2":  { "name": "borracho",     "min": 2.80, "max": 3.50, "máximo": false },
		"3":  { "name": "coma etílico", "min": 3.50, "max": 4.00, "máximo": true }
	};
}

/**
 * Polish translation by Wime. Thank you very much!
 * @author Wime <http://userscripts.org/users/162551>
 */
function Polish() { 
	this.LANGUAGE_NAME = "Polish";

	this.NAME_TEXT = "Zadanie:"; 
	this.PLUNDER_TEXT = "Rupieć"; 
	this.HOME_TEXT = "Mieszkanie"; 
	this.WEAPON_TEXT = "Broń"; 
	this.DISTRICT_TEXT = "Dzielnica";

	this.UNCHANGED_PLUNDER_TEXT = "nie zmieniaj rupiecia"; 
	this.UNCHANGED_HOME_TEXT = "nie zmieniaj mieszkania"; 
	this.UNCHANGED_WEAPON_TEXT = "nie zmieniaj broni"; 
	this.UNCHANGED_DISTRICT_TEXT = "nie zmieniaj dzielnicy";

	this.MISSING_PLUNDER_TEXT = "Rupieć nie znaleziony!"; 
	this.MISSING_HOME_TEXT = "Mieszkanie nie znalezione!"; 
	this.MISSING_WEAPONG_TEXT = "Broń nie znaleziona!"; 
	this.MISSING_DISTRICT_TEXT = "Dzielnica nie znaleziona!";

	this.EQUIPMENT_CHANGER_TEXT = "Zadanie"; 
	this.NEWLINE_TEXT = "dodaj linie"; 
	this.NO_CFGS_TEXT = "jeszcze nie skonfigurowane"; 
	this.DO_NOTHING_TEXT = "opućć"; 
	this.ACCEPT_TEXT = "Potwierdź zmiany"; 
	this.DELETE_TEXT = "Skasuj ustawienia"; 
	this.CONFIGURATION_SAVED_TEXT = "Ustawienia zapisane"; 
	this.CLOSE_BUTTON_TEXT = "Zamknij"; 
	this.UNKN_PLUNDER_ID_HL_TEXT = "Przełącznik zadań"; 
	this.UNKN_PLUNDER_ID_TEXT = "Możesz użyc tego rupiecia tylko raz. " + 
		"Od tej chwili nie będzie już zakładany."; 
	this.SHOW_CONFIGURATIONS_TEXT = "Ustawienia"; 
	this.EDIT_CONFIGURATIONS_TEXT = "Edytuj ustawienia.";

	this.FORFEIT_UNSAVED_CHANGES = "Każde nie zapisane zmiany będą stracone"; 
	this.ADD_NEW_LINE_QUESTION = "Dodać nowe ustawienia?" 
	this.FINISH_CFG_TEXT = "Akceptuj ustawienia"; 
	this.FINISH_CFG_QUESTION = "Czy na pewno chcesz zakończyc konfigurację?"; 
	this.DELETE_LINE_QUESTION = "Czy na pewno chcesz skasowac linijkę ustawień?";

	this.CHANGED_PLUNDER_TEXT = "Graty"; 
	this.CHANGED_HOME_TEXT = "Nowe mieszkanie"; 
	this.CHANGED_WEAPON_TEXT = "Nowa broń"; 
	this.CHANGED_DISTRICT_TEXT = "Nowa dzielnica";

	this.CHANGE_PLUNDER_ERROR = "Nie zmieniłeć rupiecia!" 
	this.CHANGE_HOME_ERROR = "Nie zmieniłeć mieszkania!"; 
	this.CHANGE_WEAPON_ERROR = "Nie zmieniłeć broni!"; 
	this.CHANGE_DISTRICT_ERROR = "Nie zmieniłeć dzielnicy!";

	this.PERMIL_TEXT = "Upicie"; 
	this.CHANGED_PERMIL_TEXT = "Upojenie"; 
	this.CHANGE_PERMIL_ERROR = "promile nie zostały zmienione."; 
	this.PERMIL_UNCHANGED_TEXT = "Upojenie: %1% \u2030"; 
	this.PERMIL_BUY_GOODS = "Kupuję alkohol / żarcie!"; 
	this.BROWSER_TOO_OLD = "Potrzebujesz FireFoxa 3.5 lub nowszego!"; 
	this.PERMIL_CLASSES = { 
		"-1": { "name": "nie zmieniaj", "min": 0.00, "max": 4.00, "maksymalnie": false }, 
		"0": { "name": "trzeźwy", "min": 0.00, "max": 0.75, "maksymalnie": true }, 
		"1": { "name": "idealny", "min": 2.50, "max": 3.00, "maksymalnie": false }, 
		"2": { "name": "nawalony jak szpak", "min": 2.80, "max": 3.50, "maksymalnie": false }, 
		"3": { "name": "upity w trupa", "min": 3.50, "max": 4.00, "maksymalnie": true } 
	}; 
}

var Default    = English;

// please send me some translations!
function Turkish() {}
function Portuguese() {}

var L10N = [
	[/pennergame\.de$/g,        German    ],
	[/clodogame\.fr$/g,         French    ],
	[/mendigogame\.es$/g,       Spanish   ],
	[/menelgame\.pl$/g,         Polish    ],
	[/dossergame\.co\.uk$/g,    English   ],
	[/serserionline\.com$/g,    Turkish   ],
	[/bumrise\.com$/g,          English   ],
	[/faveladogame\.com\.br$/g, Portuguese]
];

function populateConstants() {
	this.ACCEPT_IMG = "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
			"TUUH2QgTAA0VU0rOUQAAAf5JREFUOI1jYKAX8G2QEgnpkPFEF2cm1oD4bKdVDka21Saeck5ipp9P" +
			"X9718TUDAwMDEzGaI7ulneSlZBy//XnKpiQv4igvqpoHk2MhxgADJcvGvwzvuP78+c3w9suP5xfu" +
			"X2qAyRF0QXyXcpykmKD5j59fGdgY+RjuPL69alvD6xdEuSA0lIFZV9W48OuPl6z//v9lePft790b" +
			"jw5VIatBdgFj6XzHJSmT9ephAgL2+iWC/Jz6P39/Z2BnFvp/9eGVOZsbGL4hGwB3Qf5Myz5lKfEI" +
			"Bgbpf/xzBbRO3r6YoSalkfr+82NGJkYmhjdfflx6f+B8N7or4QaI8ol7ff7+mvnP35/MChIiYQLc" +
			"zhZcHH/lPn3/xcDHIf37/P2zvatXM/xFNwCeDgSMPh0T51e2Y2NhEv3y/Q0DA+Nn/u+/PjEwMbIy" +
			"fPrKeHxS5okCbOEEN+D6vs/PGVWfrhDklrLk5+KT//HrE8O/f/8YuNmlv566eTz9xv6v9/EawMDA" +
			"wHD/yK/vLIb3FrP/E1IW5ZfU+PvvF/O7T7/3zC280o5NM7oBzAwMDFwPDjDwnNr2ZL+QGiOzEL+0" +
			"zKbVR6pf3fn9h4GBgYuBgYGNARJz/xgYGP4zMDAwMKIZwAHF7FDFMAv+MjAw/GJgYPjJwMDwA4r/" +
			"ohuADBiRMAPUNhhGAQAaXbHCvxMWfgAAAABJRU5ErkJggg==";
	
	this.MISSING_PLUNDER_IMG = "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
			"TUUH2gQSBBg7RPh1nAAAA+9JREFUSIm9lk1rXUUYx3/PnDPn5raVm2BsxMYWrG0WrYIGu6kudKMF" +
			"Xxb9BkLI1k8h4kLEnfiy00IhGw0ttckH0IVJCyoKhfbWQNqFaXObe15nHhdzzum9TWgKggPDOcN9" +
			"nvnN8zL/c+F/GDK6uHjxYpKm6ftJkpz8D3um29vbPywuLt7YBblw4cJzs7OzV+bm5k5ZawVARPba" +
			"ZM+hqgB479na2rp/7dq1j8+fP//pGGR5efny2bNn3xkMBogqUjuaBqQ6BlVVqNe+/s2rIsYQW8vO" +
			"zs791dXV+cXFxRtx43TkyJHTRVEgeY5mGeocRhXvPaIK3uPr07ZRiqAiiDF4ESSKIIqoDh1icnKy" +
			"1+v1PgA+ayFxHFsAhkOkLME51LkWgGp4f0gJD2NaEDVEul2MMURRNAUQw6ifQJZBUYBziPctSL0f" +
			"6xKtQWJMAEYREkVoFAXfkdTugkhRoFn2MBLvwZgQnWqYIgggSRJsogiMQY1Bowjj/VhTxGMAEcjz" +
			"EE1VgXNEz0zTOX0Kd+8exa/r+KIAIDn+AvGLx/FbW2Tr18EYiGMkjsPBRobZla48hzQNoCzDWAsi" +
			"RFNTJK++gjiHPfo89uQJxBik223tNU3RNMU80om70qVNJM5BVZH//gfR9NOY6WmiqUkm3noTc6Ab" +
			"HJyj+PmXAKgjIY5Do+wVyWi6NE3R4RBNUxgMGF6+grtzJziMANKfrlLd6re2zXxs4QFoCl+3MVUF" +
			"3uNu9YlmZlozPxjg/t5AyxKJY6g7S6zdvybaRJJl7QmTl18iOfNaMKrvipmcpPveu+AcvraTPA81" +
			"3ReSZW3KyDLiY0fpvPF6MChLht99j+v3AYienaF77u2xVGmWgfeICMaYvSFNujTL8GmKmZpqAQ++" +
			"+ZZibZ0HX35FdfNm2ODw4fZAjd+j6dpVE20gRQFFQXZ1BXf3LuWff+E3N4NwDocMPv+C5MwZqtu3" +
			"8cNhqEWnE1K1H4SiCG2c52hR4IsCt7KKVhVSCyYiSJqSrqyEza1FvUcbfXviSPI8wIoiROUcvtEx" +
			"gjASx6G7kqTVOiBIzeNaWFWDdDSS30RWlg9VWaS9fGJtUGhAG6GMw7a+hraQ7e3tf4wxM4fOnWPn" +
			"0qVQzBqgZRnuTZNvkSCacQzWgrWYiQnUWuyxY9gTJyjLUrMsWx+DbGxsfD03N/fJwfl5e3B+PnSO" +
			"Ma0StIowEvHoJ7dZqyrGGNbW1q53Op0f4ZE/EktLSx/Nzs4u9Hq9p5xzIiLivTeqKoCoqtTviIiK" +
			"iIYsiYqIB7SqKre5uflbv9//cGFh4c4uyB5jAjhQP209m7vlgAoogAwYAvk++z3xkCc43Nj4FyaK" +
			"dkLvZsCLAAAAAElFTkSuQmCC";
	
	this.MISSING_HOME_IMG = "http://www.abload.de/img/86642.jpgdzau.png";
	this.MISSING_WEAPON_IMG = MISSING_HOME_IMG;
	
	this.DELETE_IMG = "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
			"TUUH2gQSBR06T0rbeAAAAkpJREFUOI3NUD1oU1EU/t7LS+7Lz+vzJakNlaalESqmNtjSFutvEUsn" +
			"EWkcRAdbEEFwERxcxF3XDrVm0BYHQUQ0oEuH4tA2RegQaAlNpiD2tSShSXNz37vXpQlpdHLywBnO" +
			"+X74zgH+q1odHg6lp6dTqcnJ+F+xmZnUSgvmaBCi0ZBvaCipB4ODaig0fsfjyc1tb6frmDY6mtT9" +
			"/kHS3j5+W1Vz89lsGgCkusFGPL5qdHQMC0oBRYHldu/8XF9/SE1zOTQyktR0/SyvVCA4R40QM7e0" +
			"NHEtnf7RSHDX59txBYOXZcY0WBZkSr2ezs4rzra2m5qmxfj+PmBZEIRYe5nM4sWVlfkjCQDgeyw2" +
			"YQwMvFKFCINzQJIgEQJRrUIIAXg81V9bW7Pnlpcf1zVHDADgW1/f+eP9/Qseh6NH2HZjz93uyu7m" +
			"5osLa2vPmvlKqwFjrGQfHDDL5YKwrMbeliRRrdVKrXxH8/A5HO4NdHd/IIpyyqYU3LYbLSh1qYYx" +
			"OiXLxbe7u6k/DL76/V2+cPiTSkh/XSwcDptxXhKMqYcmqlPXx6YkKb9QKGwAgNyIGAy+dyrKQK1c" +
			"hkUpbCFsM5tNmJnMI8pYwaIUjFLwctlwBwIvPxrGmSMJbslyUSbkEjj3ccDey+cTa7ncg/vF4sZ1" +
			"xmTi9Y5xxpyWEOViPj93wzQXm8+XAXhnNe3el0hk543f/84FRAHEDvt0IhBIJCMR87WuPwXgbU7f" +
			"/A/fc0W56gZOAOgBEAFwEkAvgK4nijIO4BgA0ir+5/oNhIT8DSJgK00AAAAASUVORK5CYII=";
	
	this.EMPTY_PLUNDER_IMG = "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
			"TUUH2QcUBDkF7VkqdgAAABlJREFUSIntwQENAAAAwqD3T20PBxQAADcGCd0AAXzmjiIAAAAASUVO" +
			"RK5CYII=";
	this.EMPTY_HOME_IMG = "http://www.abload.de/img/86642.jpggz66.png";
	this.EMPTY_WEAPON_IMG = EMPTY_HOME_IMG;
	this.EMPTY_DISTRICT_IMG = EMPTY_PLUNDER_IMG;
	
	this.imgSrcOf = {
		'plunder':  { '-1': EMPTY_PLUNDER_IMG },
		'home':     { '-1': EMPTY_HOME_IMG },
		'weapon':   { '-1': EMPTY_WEAPON_IMG },
		'district': { '-1': EMPTY_DISTRICT_IMG }
	};
	this.nameOf = {
		'plunder':  { '-1': UNCHANGED_PLUNDER_TEXT },
		'home':     { '-1': UNCHANGED_HOME_TEXT },
		'weapon':   { '-1': UNCHANGED_WEAPON_TEXT },
		'district': { '-1': UNCHANGED_DISTRICT_TEXT }
	};
	this.idOf = {
		'plunder':  { '-1': '-1' },
		'home':     { '-1': '-1' },
		'weapon':   { '-1': '-1' },
		'district': { '-1': '-1' }
	};
	
	this.hasLoaded = {
		'plunder':  false,
		'home':     false,
		'weapon':   false,
		'district': false
	};
	
	this.cfgs = [];
}

function populatePlunder() {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'http://' + window.location.host + '/stock/plunder/',
		'onload': function(result) {
			if(--populatePlunder.once < 0) {
				return;
			}
			
			var dom = document.createElement("div");
			dom.innerHTML = result.responseText;
			var lines = dom.getElementsByClassName("gbox")[0].getElementsByTagName("tr");
			for(var i = 1; i < lines.length; ++i) {
				var line = lines[i];
				var tds = line.getElementsByTagName("td");
				if(!/\/icon_equip\.png$/.test(tds[5].getElementsByTagName("img")[0].getAttribute("src"))) {
					continue;
				}
				var id = tds[3].getElementsByTagName("a")[0].getAttribute("href").match(/\/(\d+)\/$/)[1];
				var name = tds[1].getElementsByTagName("a")[0].firstChild.data.trim();
				var img = tds[0].getElementsByTagName("img")[0].getAttribute("src");
				
				// A: weil sich die ID irgendwie ständig ändert ... Q: warum name als id?
				idOf.plunder[name] = id;
				nameOf.plunder[name] = name;
				imgSrcOf.plunder[name] = img;
			}
			
			var h4;
			if(dom.querySelector) {
				h4 = dom.querySelector('#content div.box.special h4');
			} else {
				h4 = dom.getElementById("content").getElementsByClassName("box special")[0].getElementsByTagName("h4")[0];
			}
			var name = h4.firstChild.nextSibling.data.trim();
			var img = h4.firstChild.getAttribute("src");
			if(typeof(idOf.plunder[name]) === "undefined") {
				idOf.plunder[name] = id;
				nameOf.plunder[name] = name;
				imgSrcOf.plunder[name] = img;
				
				/*
				unsafeWindow.PgFunction.showMsg(unsafeWindow.$("notifyme"), UNKN_PLUNDER_ID_HL_TEXT, UNKN_PLUNDER_ID_TEXT, "bottle");
				var notifyme = unsafeWindow.$("notifyme");
				var icon = notifyme.getElement('div#nicon');
				icon.setAttribute('class', 'icon bottle zleft');
				var content = notifyme.getElement('div#ntext');
				content.innerHTML = "";
				content.appendChild(document.createElement("h2")).appendChild(document.createTextNode(UNKN_PLUNDER_ID_HL_TEXT));
				content.appendChild(document.createElement("p")).appendChild(document.createTextNode(UNKN_PLUNDER_ID_TEXT));
				notifyme.tween('top', 87);
				window.setTimeout(function() {
					notifyme.tween('top', -10);
				}, 5000);
				*/
			}
			
			init2("plunder");
		}
	});
}
populatePlunder.once = 1;

function populateFromShopRequest(field, store) {
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'http://' + window.location.host + '/city/' + store + '/',
		'onload': function(result) {
			if(--populateFromShopRequest[field].once < 0) {
				return;
			}
			
			var dom = document.createElement("div");
			dom.innerHTML = result.responseText;
			var lines = dom.getElementsByClassName("listshop")[0].getElementsByTagName("form");
			for(var i = 0; i < lines.length; ++i) {
				var id;
				var inputs = lines[i].getElementsByTagName("input");
				for(var h = 0; h < inputs.length; ++h) {
					if(inputs[h].getAttribute("name") === "id") {
						id = inputs[h].value;
						break;
					}
				}
				
				var name = lines[i].getElementsByClassName;
				
				nameOf[field][id] = (name("tiername")[0] || name("city_name")[0]).firstChild.data.trim();
				idOf[field][id] = id;
				
				var img = lines[i].getElementsByTagName("img")[0];
				if(img) {
					imgSrcOf[field][id] = img.getAttribute("src");
				}
			}
			init2(field);
		}
	});
}
populateFromShopRequest.home = 1;
populateFromShopRequest.weapon = 1;
populateFromShopRequest.district = 1;

function saveConfiguration() {
	var wrapper = document.createElement("wrapper");
	var configuration = wrapper.appendChild(document.createElement("c"));
	for(var i = 0; i < cfgs.length; ++i) {
		var setting = configuration.appendChild(document.createElement("s"));
		setting.setAttribute("n", cfgs[i].name);
		setting.setAttribute("p", cfgs[i].plunder);
		setting.setAttribute("l", cfgs[i].home);
		setting.setAttribute("a", cfgs[i].weapon);
		setting.setAttribute("b", cfgs[i].district);
		setting.setAttribute("m", cfgs[i].permil);
	}
	GM_setValue("configuration-" + window.location.host, wrapper.innerHTML);
}

function loadConfiguration() {
	var wrapper = document.createElement("wrapper");
	wrapper.innerHTML = GM_getValue("configuration-" + window.location.host, '<c><s/></c>');
	for(var setting = wrapper.firstChild.firstChild; setting; setting = setting.nextSibling) {
		cfgs.push({
			'name':     setting.getAttribute('n') || DO_NOTHING_TEXT,
			'plunder':  setting.getAttribute('p') || "-1",
			'home':     setting.getAttribute('l') || "-1",
			'weapon':   setting.getAttribute('a') || "-1",
			'district': setting.getAttribute('b') || "-1",
			'permil':   setting.getAttribute('m') || "-1"
		});
	}
}

function showOptionsMenu() {
	var crowncap = document.getElementsByClassName("crowncap")[0];
	var dest = crowncap.cloneNode(false);
	
	var options = dest.appendChild(document.createElement("select"));
	options.setAttribute("class", "crowncap");
	options.style.maxWidth = crowncap.offsetWidth + "px";
	
	var hlOption = options.appendChild(document.createElement("option"));
	hlOption.appendChild(document.createTextNode(EQUIPMENT_CHANGER_TEXT));
	hlOption.setAttribute("value", "-hl");
	hlOption.setAttribute("selected", "selected");
	hlOption.style.fontWeight = "bold";
	
	options.addEventListener("change", function(ev) {
		ev.preventDefault();
		if(options.value[0] === "-") {
			return false;
		}
		
		if(options.value === "cfg") {
			showConfig();
		} else {
			applyConfig(cfgs[parseInt(options.value)]);
		}
		
		options.value = "-hl";
		return false;
	}, false);
	
	var option = options.appendChild(document.createElement("option"));
	option.appendChild(document.createTextNode(SHOW_CONFIGURATIONS_TEXT));
	option.setAttribute("value", "cfg");
	option.setAttribute("class", "ttip");
	option.setAttribute("rel", EDIT_CONFIGURATIONS_TEXT);
	
	option = options.appendChild(document.createElement("option"));
	option.appendChild(document.createTextNode("\u2014\u2014\u2014\u2014\u2014\u2014"));
	option.setAttribute("value", "-hr");
	option.style.textAlign = "center";
	
	for(var i = 0; i < cfgs.length; ++i) {
		option = options.appendChild(document.createElement("option"));
		option.appendChild(document.createTextNode(cfgs[i].name));
		option.setAttribute("value", i.toString());
		option.setAttribute("class", "ttip");
		
		var title = [];
		if(cfgs[i].plunder != "-1") {
			var text = nameOf.plunder[cfgs[i].plunder] || (MISSING_PLUNDER_TEXT + " (" + cfgs[i].plunder + ")");
			title.push("<strong>" + PLUNDER_TEXT + "</strong>: " + text);
		}
		if(cfgs[i].home != "-1") {
			var text = nameOf.home[cfgs[i].home] || (MISSING_HOME_TEXT + " (" + cfgs[i].home + ")");
			title.push("<strong>" + HOME_TEXT + "</strong>: " + text);
		}
		if(cfgs[i].weapon != "-1") {
			var text = nameOf.weapon[cfgs[i].weapon] || (MISSING_WEAPONG_TEXT + " (" + cfgs[i].weapon + ")");
			title.push("<strong>" + WEAPON_TEXT + "</strong>: " + text);
		}
		if(cfgs[i].district != "-1") {
			var text = nameOf.district[cfgs[i].district] || (MISSING_DISTRICT_TEXT + " (" + cfgs[i].district + ")");
			title.push("<strong>" + DISTRICT_TEXT + "</strong>: " + text);
		}
		if(cfgs[i].permil != "-1") {
			title.push("<strong>" + PERMIL_TEXT + "</strong>: " + PERMIL_CLASSES[cfgs[i].permil].name);
		}
		option.setAttribute("rel", title.join("<br/>"));
	}
	
	crowncap.parentNode.replaceChild(dest, crowncap);
	
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.appendChild(document.createTextNode("new Tips('select.crowncap option.ttip', {className: 'tooltipshow'});"));
	unsafeWindow.document.getElementsByTagName("html")[0].appendChild(script);
}

function mkAcceptFun(i, name, plunder, home, weapon, district, permil) {
	return function(ev) {
		ev.preventDefault();
		cfgs[i] = {
			'name':     name.value,
			'plunder':  plunder.plab_id,
			'home':     home.plab_id,
			'weapon':   weapon.plab_id,
			'district': district.plab_id,
			'permil':   permil.plab_id
		};
		saveConfiguration();
		showOptionsMenu();
		alert(CONFIGURATION_SAVED_TEXT);
		return false;
	};
}

function mkDeleteFun(i, configuration, content) {
	return function(ev) {
		ev.preventDefault();
		if(window.confirm(FORFEIT_UNSAVED_CHANGES + "\n" + DELETE_LINE_QUESTION) === true) {
			cfgs.splice(i, 1);
			configuration.parentNode.replaceChild(content, configuration);
			saveConfiguration();
			showOptionsMenu();
			showConfig();
		}
		return false;
	};
}

function mkSelectFun(button, type, MISSING_TEXT, MISSING_IMG) {
	return function(ev) {
		ev.preventDefault();
		
		var content = document.getElementById("content");
		var configuration = content.cloneNode(false);
		
		var div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-top");
		div.setAttribute("class", "zabsolute");
		
		var i = 0;
		for(var e in nameOf[type]) {
			var table = configuration.appendChild(document.createElement("table"));
			table.setAttribute("class", "tieritem" + (++i%2 ? 'A' : 'B'));
			var tr = table.appendChild(document.createElement("tr"));
			
			var td = tr.appendChild(document.createElement("td"));
			td.style.verticalAlign = "middle";
			var input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "radio");
			input.setAttribute("name", "plab-select");
			if(button.plab_id === e) {
				input.setAttribute("checked", "checked");
			}
			input.addEventListener("click", (function(e) {
				return function(ev) {
					ev.preventDefault();
					button.plab_id = e;
					button.setAttribute("title", nameOf[type][e] || (MISSING_TEXT + " (" + e + ")"));
					button.style.backgroundImage = "url('" + (imgSrcOf[type][e] || MISSING_IMG) + "')";
					configuration.parentNode.replaceChild(content, configuration);
					return false;
				};
			})(e), false);
			
			td = tr.appendChild(document.createElement("td"));
			td.style.padding = "1ex";
			td.appendChild(document.createElement("img")).setAttribute("src", imgSrcOf[type][e]);
			
			td = tr.appendChild(document.createElement("td"));
			td.style.width = "100%";
			td.style.verticalAlign = "middle";
			var span = td.appendChild(document.createElement("span"));
			span.setAttribute("class", "tiername"),
			span.appendChild(document.createTextNode(nameOf[type][e]));
		}
		
		div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-bottom");
		div.setAttribute("class", "zabsolute");
		
		content.parentNode.replaceChild(configuration, content);
		return false;
	};
}

function mkSelectDistrictFun(button) {
	return function(ev) {
		ev.preventDefault();
		
		var content = document.getElementById("content");
		var configuration = content.cloneNode(false);
		
		var div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-top");
		div.setAttribute("class", "zabsolute");
		
		var i = 0;
		for(var e in nameOf.district) {
			var table = configuration.appendChild(document.createElement("table"));
			table.setAttribute("class", "tieritem" + (++i%2 ? 'A' : 'B'));
			var tr = table.appendChild(document.createElement("tr"));
			
			var td = tr.appendChild(document.createElement("td"));
			td.style.verticalAlign = "middle";
			var input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "radio");
			input.setAttribute("name", "plab-select");
			if(button.plab_id === e) {
				input.setAttribute("checked", "checked");
			}
			input.addEventListener("click", (function(e) {
				return function(ev) {
					ev.preventDefault();
					button.plab_id = e;
					var district_name = nameOf.district[e] || (MISSING_DISTRICT_TEXT + " (" + e + ")");
					button.setAttribute("title", district_name);
					button.replaceChild(document.createTextNode(district_name), button.firstChild);
					configuration.parentNode.replaceChild(content, configuration);
					return false;
				};
			})(e), false);
			
			td = tr.appendChild(document.createElement("td"));
			td.style.width = "100%";
			td.style.verticalAlign = "middle";
			var span = td.appendChild(document.createElement("span"));
			span.setAttribute("class", "tiername"),
			span.appendChild(document.createTextNode(nameOf.district[e]));
		}
		
		div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-bottom");
		div.setAttribute("class", "zabsolute");
		
		content.parentNode.replaceChild(configuration, content);
		return false;
	};
}

function mkSelectButton(i, tr, type, measures, TEXT, MISSING_TEXT, MISSING_IMG) {
	var td = tr.appendChild(document.createElement("td"));
	td.style.verticalAlign = "middle";
	td.style.textAlign = "center";
	td.style.border = "1px dashed #aaa";
	td.appendChild(document.createTextNode(TEXT));
	td.appendChild(document.createElement("br"));
	var button = td.appendChild(document.createElement("button"));
	button.plab_id = cfgs[i][type];
	button.setAttribute("title", nameOf[type][cfgs[i][type]] || (MISSING_TEXT + " (" + cfgs[i][type] + ")"));
	button.style.height = button.style.width = measures;
	button.style.backgroundImage = "url('" + (imgSrcOf[type][cfgs[i][type]] || MISSING_IMG) + "')";
	button.style.backgroundPosition = "center";
	button.style.backgroundRepeat = "no-repeat";
	button.style.backgroundColor = "white";
	button.addEventListener("click", mkSelectFun(button, type, MISSING_TEXT, MISSING_IMG), false);
	return button;
}

function mkAddNewLineFun(configuration, content) {
	return function(ev) {
		ev.preventDefault();
		if(window.confirm(FORFEIT_UNSAVED_CHANGES + "\n" + ADD_NEW_LINE_QUESTION) === true) {
			cfgs.push({ 'name': DO_NOTHING_TEXT, 'plunder': "-1", 'home': "-1", 'weapon': "-1", 'district': "-1", "permil": "-1" });
			configuration.parentNode.replaceChild(content, configuration);
			saveConfiguration();
			showConfig();
		}
		return false;
	};
}

function mkFinishCfgFun(configuration, content) {
	return function(ev) {
		ev.preventDefault();
		if(window.confirm(FORFEIT_UNSAVED_CHANGES + "\n" + FINISH_CFG_QUESTION) === true) {
			configuration.parentNode.replaceChild(content, configuration);
			showOptionsMenu();
		}
		return false;
	};
}

function mkSelectPermilFun(button) {
	return function(ev) {
		ev.preventDefault();
		
		var content = document.getElementById("content");
		var configuration = content.cloneNode(false);
		
		var div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-top");
		div.setAttribute("class", "zabsolute");
		
		var i = 0;
		for(var e in PERMIL_CLASSES) {
			var clazz = PERMIL_CLASSES[e];
			
			var table = configuration.appendChild(document.createElement("table"));
			table.setAttribute("class", "tieritem" + (++i%2 ? 'A' : 'B'));
			var tr = table.appendChild(document.createElement("tr"));
			
			var td = tr.appendChild(document.createElement("td"));
			td.style.verticalAlign = "middle";
			var input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "radio");
			input.setAttribute("name", "plab-select");
			if(button.plab_id === e) {
				input.setAttribute("checked", "checked");
			}
			input.addEventListener("click", (function(e) {
				return function(ev) {
					ev.preventDefault();
					button.plab_id = e;
					button.setAttribute("title", PERMIL_CLASSES[e].name);
					button.replaceChild(document.createTextNode(PERMIL_CLASSES[e].name), button.firstChild);
					configuration.parentNode.replaceChild(content, configuration);
					return false;
				};
			})(e), false);
			
			td = tr.appendChild(document.createElement("td"));
			td.style.width = "100%";
			td.style.verticalAlign = "middle";
			var span = td.appendChild(document.createElement("span"));
			span.setAttribute("class", "tiername"),
			span.appendChild(document.createTextNode(clazz.name));
			
			td = tr.appendChild(document.createElement("td"));
			if(e != "-1") {
				td.style.width = "100%";
				td.style.verticalAlign = "middle";
				
				var span = td.appendChild(document.createElement("span"));
				if(!clazz.higher) {
					span.setAttribute("class", "tiername");
				}
				span.appendChild(document.createTextNode(clazz.min + "\xA0‰"));
				
				td.appendChild(document.createTextNode("\xA0\u2264\xA0" + PERMIL_TEXT + "\xA0<\xA0"));
				
				var span = td.appendChild(document.createElement("span"));
				if(clazz.higher) {
					span.setAttribute("class", "tiername");
				}
				span.appendChild(document.createTextNode(clazz.max + "\xA0‰"));
			}
		}
		
		div = configuration.appendChild(document.createElement("div"));
		div.setAttribute("id", "content-bottom");
		div.setAttribute("class", "zabsolute");
		
		content.parentNode.replaceChild(configuration, content);
		return false;
	};
}

function showConfig() {
	var content = document.getElementById("content");
	var configuration = content.cloneNode(false);
	
	var div = configuration.appendChild(document.createElement("div"));
	div.setAttribute("id", "content-top");
	div.setAttribute("class", "zabsolute");
	
	var cfgLines = configuration.appendChild(document.createElement("div"));
	
	div = configuration.appendChild(document.createElement("div"));
	div.setAttribute("id", "content-bottom");
	div.setAttribute("class", "zabsolute");
	
	if(cfgs.length > 0) {
		for(var i = 0; i < cfgs.length; ++i) {
			var table = cfgLines.appendChild(document.createElement("table"));
			table.setAttribute("class", "tieritem" + (i%2?'B':'A'));
			table.style.borderCollapse = "collapse";
			
			var tr = table.appendChild(document.createElement("tr"));
			tr.style.verticalAlign = "middle";
			
			var td = tr.appendChild(document.createElement("td"));
			td.style.border = "1px dashed #aaa";
			td.style.verticalAlign = "middle";
			td.style.textAlign = "center";
			td.appendChild(document.createTextNode(NAME_TEXT));
			td.appendChild(document.createElement("br"));
			var name = td.appendChild(document.createElement("input"));
			name.setAttribute("type", "text");
			name.value = cfgs[i].name;
			
			var plunder = mkSelectButton(i, tr, "plunder", "30px", PLUNDER_TEXT, MISSING_PLUNDER_TEXT, MISSING_PLUNDER_IMG);
			var home    = mkSelectButton(i, tr, "home",    "75px", HOME_TEXT,    MISSING_HOME_TEXT,    MISSING_HOME_IMG);
			var weapon  = mkSelectButton(i, tr, "weapon",  "75px", WEAPON_TEXT,  MISSING_WEAPONG_TEXT, MISSING_WEAPON_IMG);
			
			tr = table.appendChild(document.createElement("tr"));
			
			td = tr.appendChild(document.createElement("td"));
			td.style.border = "1px dashed #aaa";
			td.style.verticalAlign = "middle";
			td.style.textAlign = "center";
			td.appendChild(document.createTextNode(DISTRICT_TEXT));
			td.appendChild(document.createElement("br"));
			var district = td.appendChild(document.createElement("button"));
			district.plab_id = cfgs[i].district;
			var district_name = nameOf.district[cfgs[i].district] || (MISSING_DISTRICT_TEXT + " (" + cfgs[i].district + ")");
			district.appendChild(document.createTextNode(district_name));
			district.setAttribute("title", district_name);
			district.style.backgroundColor = "white";
			district.addEventListener("click", mkSelectDistrictFun(district, "district", MISSING_DISTRICT_TEXT, EMPTY_DISTRICT_IMG), false);
			
			td = tr.appendChild(document.createElement("td"));
			td.style.border = "1px dashed #aaa";
			td.style.verticalAlign = "middle";
			td.style.textAlign = "center";
			td.appendChild(document.createTextNode(PERMIL_TEXT));
			td.appendChild(document.createElement("br"));
			var permil = td.appendChild(document.createElement("button"));
			permil.plab_id = cfgs[i].permil;
			var permil_name = PERMIL_CLASSES[cfgs[i].permil].name;
			permil.appendChild(document.createTextNode(permil_name));
			permil.setAttribute("title", permil_name);
			permil.style.backgroundColor = "white";
			permil.addEventListener("click", mkSelectPermilFun(permil), false);
			
			tr.appendChild(document.createElement("td"));
			td.style.border = "1px dashed #aaa";
			td.appendChild(document.createTextNode("\xA0"));
			
			td = tr.appendChild(document.createElement("td"));
			td.style.border = "1px dashed #aaa";
			td.style.verticalAlign = "middle";
			td.style.textAlign = "center";
			
			var accept = td.appendChild(document.createElement("a"));
			accept.setAttribute("href", "#");
			accept.setAttribute("title", ACCEPT_TEXT);
			accept.addEventListener("click", mkAcceptFun(i, name, plunder, home, weapon, district, permil), false);
			var acceptImg = accept.appendChild(document.createElement("img"));
			acceptImg.setAttribute("src", ACCEPT_IMG);
			acceptImg.style.height = acceptImg.style.width = "16px";
			acceptImg.style.verticalAlign = "middle";
			
			var del = td.appendChild(document.createElement("a"));
			del.setAttribute("href", "#");
			del.setAttribute("title", DELETE_TEXT);
			del.addEventListener("click", mkDeleteFun(i, configuration, content), false);
			var delImg = del.appendChild(document.createElement("img"));
			delImg.setAttribute("src", DELETE_IMG);
			delImg.style.height = delImg.style.width = "16px";
			delImg.style.verticalAlign = "middle";
		}
	} else {
		var table = cfgLines.appendChild(document.createElement("table"));
		table.setAttribute("class", "tieritemA");
		var td = table.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
		td.appendChild(document.createTextNode(NO_CFGS_TEXT));
		td.style.fontStyle = "italic";
	}
	
	var br = cfgLines.appendChild(document.createElement("br"));
	br.style.clear = "both";
	var newline = cfgLines.appendChild(document.createElement("input"));
	newline.setAttribute("type", "button");
	newline.setAttribute("value", NEWLINE_TEXT);
	newline.addEventListener("click", mkAddNewLineFun(configuration, content), false);
	
	cfgLines.appendChild(document.createTextNode("\xA0"));
	var endCfg = cfgLines.appendChild(document.createElement("input"));
	endCfg.setAttribute("type", "button");
	endCfg.setAttribute("value", FINISH_CFG_TEXT);
	endCfg.addEventListener("click", mkFinishCfgFun(configuration, content), false);
	
	content.parentNode.replaceChild(configuration, content);
}

function applyPlunder(id, notifyMe) {
	function error() {
		notifyMe(PLUNDER_TEXT, CHANGE_PLUNDER_ERROR, 'error');
	}
	GM_xmlhttpRequest({
		'method': 'POST',
		'url': 'http://' + window.location.host + '/stock/plunder/change/',
		'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
		'data': encodeURI('f_plunder=' + idOf.plunder[id]),
		'onload': function(result) {
			try {
				var dom = document.createElement("div");
				dom.innerHTML = result.responseText;
				var h4;
				if(dom.querySelector) {
					h4 = dom.querySelector('#content div.box.special h4');
				} else {
					h4 = dom.getElementById("content").getElementsByClassName("box special")[0].getElementsByTagName("h4")[0];
				}
				var name = h4.firstChild.nextSibling.data;
				var ok = h4.firstChild.getAttribute("src") === imgSrcOf.plunder[id];
				if(ok) {
					notifyMe(PLUNDER_TEXT, CHANGED_PLUNDER_TEXT + ": " + name, 'ok');
				} else {
					notifyMe(PLUNDER_TEXT, CHANGED_PLUNDER_TEXT + ": " + name, 'error');
				}
			} catch(e) {
				error();
			}
		},
		'onerror': error
	});
}

function applyHome(id, notifyMe) {
	function error() {
		notifyMe(HOME_TEXT, CHANGE_HOME_ERROR, 'error');
	}
	GM_xmlhttpRequest({
		'method': 'POST',
		'url': 'http://' + window.location.host + '/city/home/buy/',
		'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
		'data': encodeURI('id=' + idOf.home[id]),
		'onload': function(result) {
			try {
				var dom = document.createElement("div");
				dom.innerHTML = result.responseText;
				
				var newId = -1;
				var forms = dom.getElementsByTagName("form");
				for(var i = 0; i < forms.length; ++i) {
					if(/\/city\/home\/buy\/$/.test(forms[i].getAttribute("action"))) {
						var isMyHome = false;
						var id = -1;
						var inputs = forms[i].getElementsByTagName("input");
						for(var h = 0; (!isMyHome || id > 0) && h < inputs.length; ++h) {
							var input = inputs[h]
							if(input.getAttribute("type") === "submit" && input.getAttribute("disabled")) {
								isMyHome = true;
							} else if(input.getAttribute("name") === "id") {
								id = input.getAttribute("value");
							}
						}
						if(isMyHome) {
							newId = id;
							break;
						}
					}
				}
				
				if(newId == -1) {
					error();
				} else if(id == newId) {
					notifyMe(HOME_TEXT, CHANGED_HOME_TEXT + ": " + nameOf.home[newId], 'ok');
				} else {
					notifyMe(HOME_TEXT, CHANGED_HOME_TEXT + ": " + nameOf.home[newId], 'error');
				}
			} catch(e) {
				error();
			}
		},
		'onerror': error
	});
}

function applyWeapon(id, notifyMe) {
	function error() {
		notifyMe(WEAPON_TEXT, CHANGE_WEAPON_ERROR, 'error');
	}
	GM_xmlhttpRequest({
		'method': 'POST',
		'url': 'http://' + window.location.host + '/stock/armoury/use/',
		'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
		'data': encodeURI('id=' + idOf.weapon[id]),
		'onload': function(result) {
			try {
				var dom = document.createElement("div");
				dom.innerHTML = result.responseText;
				
				var input = false;
				var forms = dom.getElementsByTagName("form");
				for(var i = 0; i < forms.length; ++i) {
					if(/\/stock\/armoury\/use\/$/.test(forms[i].getAttribute("action"))) {
						var inputs = forms[i].getElementsByTagName("input");
						for(var h = 0; h < inputs.length; ++h) {
							if(inputs[h].getAttribute("type") === "submit" && inputs[h].getAttribute("disabled")) {
								input = inputs[h];
								break;
							}
						}
					}
				}
				var newId = input.previousSibling.getAttribute("value");
				
				if(id === newId) {
					notifyMe(HOME_TEXT, CHANGED_WEAPON_TEXT + ": " + nameOf.weapon[newId], 'ok');
				} else {
					notifyMe(HOME_TEXT, CHANGED_WEAPON_TEXT + ": " + nameOf.weapon[newId], 'error');
				}
			} catch(e) {
				alert(e);
				error();
			}
		},
		'onerror': error
	});
}

function applyDistrict(id, notifyMe) {
	function error() {
		notifyMe(DISTRICT_TEXT, CHANGE_DISTRICT_ERROR, 'error');
	}
	GM_xmlhttpRequest({
		'method': 'POST',
		'url': 'http://' + window.location.host + '/city/district/buy/',
		'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
		'data': encodeURI('id=' + idOf.district[id]),
		'onload': function(result) {
			try {
				var dom = document.createElement("div");
				dom.innerHTML = result.responseText;
				var name = dom.getElementsByClassName("el2")[0].firstChild.data.trim();
				
				if(name === nameOf.district[id]) {
					notifyMe(DISTRICT_TEXT, CHANGED_DISTRICT_TEXT + ": " + name, 'ok');
				} else {
					notifyMe(DISTRICT_TEXT, CHANGED_DISTRICT_TEXT + ": " + name, 'error');
				}
			} catch(e) {
				error();
			}
		},
		'onerror': error
	});
}

function applyStockItem(url, min, max, higher, useThisFunction, notifyMe) {
	function error() {
		notifyMe(PERMIL_TEXT, CHANGE_PERMIL_ERROR, 'error');
	}
	
	function useStockItems(item, n) {
		GM_xmlhttpRequest({
			'method': 'POST',
			'url': 'http://' + window.location.host + '/stock/foodstuffs/use/',
			'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
			'data': encodeURI("item=" + item.name + "&promille=" + item.permil + "&id=" + item.id + "&menge=" + n),
			'onload': function(result) {
				try {
					var dom = document.createElement("div");
					dom.innerHTML = result.responseText;
					var currentPermil = parseFloat(dom.querySelector("li.beer a.ttip").firstChild.data);
					
					if(currentPermil >= max || currentPermil < min) {
						notifyMe(PERMIL_TEXT, CHANGED_PERMIL_TEXT + ": " + currentPermil, 'error');
					} else {
						notifyMe(PERMIL_TEXT, CHANGED_PERMIL_TEXT + ": " + currentPermil, 'ok');
					}
				} catch(e) {
					error();
				}
			},
			'onerror': error
		});
	}
	
	if(typeof(document.querySelector) !== "function") {
		notifyMe(PERMIL_TEXT, BROWSER_TOO_OLD, 'error');
		return;
	}
	
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'http://' + window.location.host + url,
		'onload': function(result) {
		try {
				var dom = document.createElement("div");
				dom.innerHTML = result.responseText;
				
				var currentPermil = parseFloat(dom.querySelector("li.beer a.ttip").firstChild.data);
				if(!useThisFunction(currentPermil, error)) {
					return;
				}
				
				var forms = dom.querySelectorAll("#content form");
				var items = [];
				for(var i = 0; i < forms.length; ++i) {
					if(forms[i].getAttribute("action") === "/stock/foodstuffs/use/") {
						var name   = forms[i].querySelector("input[name=item]").value;
						items.push({
							"name":   name,
							"id":     parseInt(forms[i].querySelector("input[name=id]").value),
							"permil": parseInt(forms[i].querySelector("input[name=promille]").value) / 100,
							"amount": parseInt(forms[i].querySelector("#lager_" + name).value)
						});
					}
				}
				
				for(var i in items) {
					var n = 0;
					var item = items[i];
					if(item.permil>=0) {
						var minN = Math.floor((min-currentPermil) / item.permil);
						var maxN = Math.ceil((max-currentPermil) / item.permil);
						if(currentPermil + minN*item.permil < min) {
							++minN;
						}
						if(currentPermil + maxN*item.permil >= max) {
							--maxN;
						}
						if(maxN < minN || minN > item.amount) {
							continue;
						}
						n = higher ? maxN : minN;
					} else {
						var maxN = Math.floor((min-currentPermil) / item.permil);
						var minN = Math.ceil((max-currentPermil) / item.permil);
						if(currentPermil + minN*item.permil < min) {
							--minN;
						}
						if(currentPermil + maxN*item.permil >= max) {
							++maxN;
						}
						if(maxN < minN || minN > item.amount) {
							continue;
						}
						n = higher ? minN : maxN;
					}
					useStockItems(item, n);
					return;
				}
				
				notifyMe(PERMIL_TEXT, PERMIL_BUY_GOODS, 'error');
			} catch(e) {
				error();
			}
		},
		'onerror': error
	});
}

function applyEating(min, max, higher, notifyMe) {
	function useThisFunction(currentPermil, error) {
		if(currentPermil < max) {
			notifyMe(PERMIL_TEXT, PERMIL_UNCHANGED_TEXT.replace("%1%", currentPermil), 'ok');
			return false;
		} else if(currentPermil < min) {
			error();
			return false;
		}
		return true;
	}
	applyStockItem('/stock/foodstuffs/food/', min, max, higher, useThisFunction, notifyMe)
}

function applyPermil(min, max, higher, notifyMe) {
	function useThisFunction(currentPermil, error) {
		if(currentPermil >= max) {
			applyEating(min, max, higher, notifyMe);
			return;
		} else if(currentPermil >= min) {
			notifyMe(PERMIL_TEXT, PERMIL_UNCHANGED_TEXT.replace("%1%", currentPermil), 'ok');
			return;
		}
		return true;
	}
	
	applyStockItem('/stock/', min, max, higher, useThisFunction, notifyMe)
}

function applyConfig(cfg) {
	var notifyme = unsafeWindow.$("notifyme");
	var nfS = notifyme.style.fontSize;
	notifyme.style.fontSize = "75%";
	var icon = notifyme.getElement('div#nicon');
	icon.setAttribute('class', 'icon ok zleft');
	var content = notifyme.getElement('div#ntext');
	var cfS = content.style.fontSize;
	content.style.fontSize = "80%";
	content.innerHTML = "";
	content.appendChild(document.createElement("h2")).appendChild(document.createTextNode(STATUS_HEADLINE_TEXT));
	var p = content.appendChild(document.createElement("p"));
	var okButton = content.appendChild(document.createElement("input"));
	okButton.setAttribute("type", "button");
	okButton.setAttribute("value", CLOSE_BUTTON_TEXT);
	okButton.addEventListener("click", function(ev) {
		ev.preventDefault();
		notifyme.tween('top', -10);
		content.innerHTML = "";
		notifyme.style.fontSize = nfS;
		content.style.fontSize = cfS;
		return false;
	}, false);
	
	notifyme.tween('top', 87);
	
	function notifymeFun(headline, text, status) {
		var line = p.appendChild(document.createElement("div"));
		// line.appendChild(document.createElement("strong")).appendChild(document.createTextNode(headline + ": "));
		line.appendChild(document.createTextNode(text));
		
		if(status === 'error') {
			icon.setAttribute('class', 'icon error zleft');
		}
	}
	
	if(cfg.plunder != "-1") {
		applyPlunder(cfg.plunder, notifymeFun);
	}
	if(cfg.home != "-1") {
		applyHome(cfg.home, notifymeFun);
	}
	if(cfg.weapon != "-1") {
		applyWeapon(cfg.weapon, notifymeFun);
	}
	if(cfg.district != "-1") {
		applyDistrict(cfg.district, notifymeFun);
	}
	if(cfg.permil != "-1") {
		applyPermil(PERMIL_CLASSES[cfg.permil].min, PERMIL_CLASSES[cfg.permil].max, PERMIL_CLASSES[cfg.permil].higher, notifymeFun);
	}
}

function init0() {
	Default();
	for(var i = 0; i < L10N.length; ++i) {
		if(L10N[i][0].test(window.location.host)) {
			L10N[i][1].call(this);
			break;
		}
	}
	init1();
}

function init1() {
	populateConstants();
	loadConfiguration();
	
	populatePlunder();
	populateFromShopRequest("home",     "home");
	populateFromShopRequest("weapon",   "weapon_store");
	populateFromShopRequest("district", "district");
}

function init2(field) {
	delete hasLoaded[field];
	for(var e in hasLoaded) {
		if(hasLoaded[e]) {
			return;
		}
	}
	hasLoaded.once = false;
	showOptionsMenu();
}

init0();







// name          easy userscript updater snippet
// author        Thomas Duerr
// version       1.0.1
// date          2009-03-27

var userscriptUpdater = function(){
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 12*60*60,                                  // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)(?:\s+.*)?[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;

    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };

    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };

    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };

    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };

    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();

// initialize updater
userscriptUpdater.init({
    scriptId:       "74845", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
