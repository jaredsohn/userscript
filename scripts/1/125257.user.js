/**
// ==UserScript==
// @name           The West - Battles Stats - Spanish Language Pack
// @description    Language Pack for The West - Battles Stats (http://userscripts.org/scripts/show/118401)
// @translator(s)  pepe100
// Translators notice: If you are continuing the work of someone else, please keep the name of all the previous contributors in the line above!
// @version        1.9
// @exclude        *
// ==/UserScript==
**/

TWBS.Langs.es = { /* use the two or three letters of your language server */
	'options'       : 'Opciones TWBS', /* Displayed when hovering the button on the left menu */
	'not_reload'    : "No es necesario actualizar nada para ver estos cambios.", /* Warning displayed in Settings tab. */
	'need_reload'   : 'Se necesita actualizar la página para ver estos cambios.', /* Warning displayed in Settings tab. */
	'reload_win'    : 'Es posible que necesite actualizar la ventana TWBS para ver parte de estos cambios.', /* Warning displayed in Settings tab. */
	'select'        : 'Seleccionar', /* First element of lang menu (=no lang selected). Keep this the shortest you can. */
	'select_lang'   : 'Seleccionar idioma (forzar)', /* Label for lang menu. */
	'addlang'       : 'Añadir idioma', /* Option in the lang selection to add an external lang */
	'lang_added'    : "Paquete de idioma añadido.", /* Displayed when a new language pack was successfully added */
	'select_sort'   : 'Ordenar {1}por', /* Displayed in Settings tab. {1} will result in "hits", "results" or nothing. */
	'results'       : 'resultados', /* Substitutes {1} in the line above */
	'hits'          : 'aciertos', /* Substitutes {1} in the line above */
	'sort_down'     : 'Creciente', /* Order type (A-Z / 0-10) */
	'sort_up'       : 'Decreciente', /* Order type (Z-A / 10-0) */
	'wait'          : ["Espere entre una actualización y la siguiente", "si durante la actualización la ventana se bloquea o se queda parada, intente aumentar este valor."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'wait_0'        : 'Ninguno', /* Waits 0 seconds. Refers to the line above. */
	'wait_200'      : '0,2 segundos', /* Waits 0,2 seconds. Refers to the line above. */
	'wait_500'      : '0,5 segundos', /* Waits 0,5 seconds. Refers to the line above. */
	'wait_1000'     : '1 segundo', /* Waits 1 second. Refers to the line above. */
	'safe'          : ['Modo velocidad', "Se actualiza la tabla sólo al final, ahorrando tiempo y reduciendo el cálculo.<br>Con el modo velocidad activado, el tiempo de espera se puede reducir sin el riesgo de bloquear la ventana."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'will'          : 'Muy pronto', /* Displayed in Forts Highscores tab until it will be avaiable */
	'lang_name'     : 'Español', /* Write your lang name */
	'aut'           : 'Autor', /* Prepended author's name */
	'trad'          : 'Traductor', /* Prepended your name */
	'trads'         : 'Traductores', /* Prepended list of translators (keep plural) */
	'trad_name'     : 'pepe100', /* Write the nickname that you want to be displayed */
	'trad_link'     : {
		'es1'  : ['pepe100', 14950],
		'en1'  : ['pepe100', 67019],
		'en2'  : ['pepe100', 67019],
		'en3'  : ['pepe100', 67019],
		'w1'   : ['pepe100', 42293],/* Write the subdomain of the world you play plus the server number, then your character name and your character id. If you play more than 1 server, add a new line for each of them. */
		'http' : 'http://userscripts.org/users/407722/favorites', /* Website which will be opened by clicking your name in a server where you don't play */
	},
	'duels_highs'   : 'Clasificación duelos', /* Duels Highscores tab name */
	'settings'      : 'Ajustes', /* Settings tab name */
	'duels_single'  : 'Duelos individuales', /* Single Duels tab name */
	'forts_highs'   : 'Clasificación fuertes', /* Forts Highscores tab name */
	'Export'        : 'Exportar', /* Export tab name */
	'about'         : 'Acerca de', /* About tab name */
	'add'           : 'Agregar', /* Button to add players (Duels Highscores) or reports (Single Duels) */
	'add_players'   : "Agregar jugadores", /* Label to text input to add players (Duels Highscores) */
	'add_player_tp' : 'Escriba el nombre del jugador.<br>Sugerencia: puede escribir "[jugador1, jugador2, ...]" sin las comillas<br>para agregar más jugadores juntos.', /* Tip displayed hovering the "?" near the text input to add players (Duels Highscores) */
	'add_report'    : 'Agregar informes', /* Label to text input to add reports (Single Duels) */
	'add_report_tp' : 'Escribe el enlace del informe.&lt;br&gt;Ex.: [report=12345678abcdefghij]Nombre_informe[/report]&lt;br&gt;Sugerencia: puede escribir sólo "[report=12345678abcdefghij]" sin las comillas.&lt;br&gt;Sugerencia: puede escribir "[enlace1, enlace2, ...]" sin las comillas&lt;br&gt;para agregar más informes juntos.', /* Tip displayed hovering the "?" near the text input to add reports (Single Duels). Leave [report=12345678abcdefghij] and [/report] untranslated. */
	'show_info'     : 'Info de jugadores', /* Table showing players infos (Duels Highscores) */
	'show_start'    : 'Datos iniciales', /* Table showing intial data (Duels Highscores) */
	'show_end'      : 'Datos finales', /* Table showing final data (Duels Highscores) */
	'show_high'     : 'Mejores puntuaciones', /* Displayed in Duels Highscores tab. */
	'show_exp'      : 'Experiencia', /* Table showing experience highscore (Duels Highscores) */
	'title_exp'     : 'Mejores puntuaciones Experiencia', /* Displayed exporting experience highscore */
	'show_win'      : 'Duelos ganados', /* Table showing won duels highscore (Duels Highscores) */
	'title_win'     : 'Mejores puntuaciones duelos ganados', /* Displayed exporting won duels highscore */
	'show_summ'     : 'Resumen', /* Summary of duel reports (Single Duels) */
	'show_higt'     : 'Aciertos y duelos', /* Best/worst hits and duels of duel reports (Single Duels) */
	'show_recm'     : 'Mejores resultados', /* Best attackers results (exp, $$, bounty) of duel reports (Single Duels) */
	'show_reco'     : 'Mejores resultados oponente', /* Best defenders results (exp, $$, bounty) of duel reports (Single Duels) */
	'day'           : ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'], /* Days, three letters */
	'month'         : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], /* Months, three letters */
	'check_update'  : 'Comprobar actualizaciones', /* Check for script updates (About) */
	'reset'         : 'Restablecer datos', /* Delete all data (Settings) */
	'recov'         : 'Recuperar datos', /* Display an alert with raw data (Settings) */
	'percent'       : 'Porcentaje indicativo de avance', /* Displayed hovering the progress bar updating or adding data. */
	'tab_name'      : 'Nombre', /* Column in Duels Highscores tab */
	'tab_class'     : 'Clase', /* Column in Duels Highscores tab */
	'tab_craft'     : 'Artesano', /* Column in Duels Highscores tab */
	'tab_title'     : 'Título', /* Column in Duels Highscores tab */
	'tab_city'      : 'Ciudad', /* Column in Duels Highscores tab */
	'tab_ally'      : 'Alianza', /* Column in Duels Highscores tab */
	'tab_start'     : 'Inicio', /* Tip that shows the initial data (Duels Highscores) */
	'tab_end'       : 'Final', /* Tip that shows the final data (Duels Highscores) */
	'tab_update'    : 'Actualizar', /* Text to update initial/final data (Duels Highscores) */
	'tab_updated'   : 'Actualizado', /* Tip that shows when the data were last updated (Duels Highscores) */
	'tab_rel'       : 'Valores relativos desde el inicio', /* Tip on the column name (final data table) (Duels Highscores) */
	'tab_rank'      : 'Rango', /* Column in Duels Highscores tab */
	'tab_succ'      : 'Puntos de logro', /* Column in Duels Highscores tab */
	'tab_liv'       : 'Nivel', /* Column in Duels Highscores tab */
	'tab_liv_duel'  : 'Nivel de duelo', /* Column in Duels Highscores tab */
	'tab_rank_duel' : 'Rango en duelos', /* Column in Duels Highscores tab */
	'tab_exp'       : 'Exp', /* Column in Duels Highscores tab */
	'tab_win'       : 'Ganados', /* Column in Duels Highscores tab */
	'win'           : 'Duelos ganados', /* Displayed selecting the order in Settings tab */
	'tab_lost'      : 'Perdidos', /* Column in Duels Highscores tab */
	'lost'          : 'Duelos perdidos', /* Displayed selecting the order in Settings tab */
	'tab_diff'      : 'Dif', /* Column in Duels Highscores tab */
	'tab_actions'   : 'Acciones', /* Column in Duels Highscores tab */
	'tab_delete'    : 'Borrar', /* Delete the player/report of that row */
	'tab_pos'       : 'Rango', /* Column in Duels Highscores tab */
	'tab_points'    : 'Puntos', /* Column in Duels Highscores tab */
	'tab_players'   : 'Jugadores', /* Column in Duels Highscores tab */
	'tab_player'    : 'Jugador', /* Column in Single Duels tab */
	'tab_weapons'   : 'Armas', /* Column in Single Duels tab */
	'tab_duel'      : 'Duelo', /* Column in Single Duels tab */
	'tab_rounds'    : 'Rondas', /* Column in Single Duels tab */
	'tab_res'       : 'Resultado', /* Column in Single Duels tab */
	'tab_noone'     : 'Sin jugadores', /* Displayed when no players were added (Duels Highscores) */
	'tab_noduel'    : 'Sin duelos', /* Displayed when no reports were added (Single Duels) */
	'no_city'       : 'Sin ciudad', /* Displayed when a player has no city (Duels Highscores) */
	'no_ally'       : 'Sin alianza', /* Displayed when a player has no alliance (Duels Highscores) */
	'rem_data_conf' : '¿Realmente desea borrar todos los datos?', /* Asks confirm to delete all the data */
	'rem_pl_conf'   : '¿Realmente desea borrar el jugador?', /* Asks confirm to delete that player */
	'rem_rp_conf'   : '¿Realmente desea borrar el informe?', /* Asks confirm to delete that report */
	'deleted'       : '{1} eliminado de la lista', /* Displayed when a player was deleted */
	'added'         : '{1} agregado a la lista', /* Displayed when a player was added */
	'add_duel'      : 'Duelo agregado a la lista: {1} vs. {2}', /* Displayed when a report was added */
	'unknown_e'     : 'Ocurrió un error desconocido.', /* Displayed when an unknown error has occurred */
	'not_found'     : 'El jugador {1} no se encontró.', /* Displayed when the player searched was not found. {1} will be replaced with the searched name */
	'not_resp'      : 'El servidor no responde. Por favor, inténtelo de nuevo más tarde.', /* Displayed when the server doesn't respond */
	'no_p_insrtd'   : 'Ningún jugador introducido', /* Displayed when no players were added (Settings) */
	'no_r_insrtd'   : 'Ningún informe introducido', /* Displayed when no reports were added (Settings) */
	'soldier'       : 'Soldado', /* Class name */
	'worker'        : 'Trabajador', /* Class name */
	'duelist'       : 'Duelista', /* Class name */
	'adventurer'    : 'Aventurero', /* Class name */
	'greenhorn'     : 'Novato', /* Class name */
	'craft0'        : 'Inexperto', /* No-craft name */
	'craft1'        : 'Cocinero', /* Craft name */
	'craft2'        : 'Vendedor tónicos', /* Craft name */
	'craft3'        : 'Herrero', /* Craft name */
	'craft4'        : 'Maestro guarnicionero', /* Craft name */
	'hit_sh_left'   : 'Hombro izquierdo', /* Hit name */
	'hit_ar_left'   : 'Brazo izquierdo', /* Hit name */
	'hit_sh_righ'   : 'Hombro derecho', /* Hit name */
	'hit_ar_righ'   : 'Brazo derecho', /* Hit name */
	'hit_head'      : 'Cabeza', /* Hit name */
	'hit_none'      : 'Sin acierto', /* Hit name */
	'vs'            : 'vs.', /* Player1 vs. Player2 */
	'HP'            : 'PS', /* Column in Single Duels tab */
	'exp'           : 'Exp', /* Column in Single Duels tab */
	'pass'          : '{1} desmayado.', /* {1} will be replaced with a player name (Single Duels) */
	'dwin'          : '{1} gana {2} experiencia', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'ddwin'         : 'y ${1}', /* {1} will be replaced with a number (Single Duels) */
	'dbwin'         : '{1} recibe una recompensa de ${2}', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'best_hit'      : 'Mejor golpe', /* Column in Single Duels tab */
	'best_duel'     : 'Mejor duelo', /* Column in Single Duels tab */
	'worst_hit'     : 'Peor golpe', /* Column in Single Duels tab */
	'worst_duel'    : 'Peor duelo', /* Column in Single Duels tab */
	'high_exp'      : 'Mayor experiencia', /* Column in Single Duels tab */
	'high_$$'       : 'Mayor beneficio', /* Column in Single Duels tab */
	'high_bou'      : 'Mayor botín recibido', /* Column in Single Duels tab */
	'opponent'      : 'Oponente', /* Displayed selecting the order in Settings tab */
	'settings_save' : 'Guardar ajustes', /* Button to save Settings */
	'settings_drop' : 'Ignorar cambios', /* Button to ignore Settings */
	'yes'           : 'Sí', /* Displayed updating the script */
	'no'            : 'No', /* Displayed updating the script */
	'update'        : 'Actualizar?', /* Displayed updating the script */
	'latest_v'      : "La última versión es ", /* Will be followed by a version number */
	'current_v'     : "Su versión es ", /* Will be followed by a version number */
	'webpage'       : 'Web page', /* Link to the script website */
	'credit_upd'    : '{subj} ligeramente modificado por {name}', /* {subj} will be replaced with a string like "Script Updater [SOM]", {name} with "Narulez" */
	'exp_nsel'      : 'Seleccione una clasificación', /* Displayed in Export tab */
	'exp_data'      : 'Exportar datos', /* Displayed in Export tab */
	'only_name'     : 'Sólo nombres', /* Displayed in Export tab */
	'name_score'    : 'Nombres y puntuaciones', /* Displayed in Export tab */
	'ctrl_c'        : 'Ctrl + C para copiar', /* Displayed in Export tab */
	'thanks'        : 'Gracias', /* Displayed in About tab */
	'team'          : '{1} equipo', /* Displayed in About tab. {1} will be replaced with the team name */
	'tidea'         : 'por la idea.', /* Displayed in About tab */
	'tidb'          : 'por el método de almacenamiento en caché.', /* Displayed in About tab */
	'tupder'        : 'por el script de actualización original.', /* Displayed in About tab */
	'IndexedDB_tiw' : 'Necesitará activar IndexedDB para ver las clasificaciones de fuertes', /* Displayed in Forts Highscores tab until it will be avaiable */
	'IndexedDB_tip' : 'Necesita activar IndexedDB para ver las clasificaciones de fuertes', /* Displayed in Forts Highscores tab if IndexedDB is not activated */
	'Ind_info'      : 'Info de compatibilidad', /* Link to IndexedDB compatibility infos */
	'IDB_not_supp'  : 'IndexedDB no es soportado por su navegador.', /* Displayed in Forts Highscores tab if IndexedDB is not supported by the user's browser */
	'IndexedDB_nsp' : 'no soportado', /* Displayed in Settings tab if IndexedDB is not supported by the user's browser */
};