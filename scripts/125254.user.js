// ==UserScript==
// @name           The West - Battles Stats - Spanish Language Pack By Lafias
// @description    Language Pack for The West - Battles Stats (http://userscripts.org/scripts/show/118401)
// @translator(s)  Lafias
// Translators notice: 
// @version        1.9
// @include        http://*.the-west.*/game.php*
// ==/UserScript==


TWBS.Langs.es = { /* use the two or three letters of your language server */
	'options'       : 'Opciones de Battles Stats', /* Displayed when hovering the button on the left menu */
	'not_reload'    : "No es necesario actualizar para ver los cambios.", /* Warning displayed in Settings tab. */
	'need_reload'   : 'Es necesario actualizar la pagina para ver los cambios.', /* Warning displayed in Settings tab. */
	'reload_win'    : 'Es posible que necesites actualizar la ventana The West Battle Stats para ver parte de esos cambios.', /* Warning displayed in Settings tab. */
	'select'        : 'Seleccionar', /* First element of lang menu (=no lang selected). Keep this the shortest you can. */
	'select_lang'   : 'Seleccionar idioma', /* Label for lang menu. */
	'addlang'       : 'Añadir idioma', /* Option in the lang selection to add an external lang */
	'lang_added'    : "Pack de idioma añadido.", /* Displayed when a new language pack was successfully added */
	'select_sort'   : 'Orden {1}por', /* Displayed in Settings tab. {1} will result in "hits", "results" or nothing. */
	'results'       : 'resultados', /* Substitutes {1} in the line above */
	'hits'          : 'aciertos', /* Substitutes {1} in the line above */
	'sort_down'     : 'Creciente', /* Order type (A-Z / 0-10) */
	'sort_up'       : 'Decreciente', /* Order type (Z-A / 10-0) */
	'wait'          : ["Esperar entre una actualización y otra", "Si durante la actualización la ventana se congela o se realentiza, intenta aumentar este valor."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'wait_0'        : 'Ninguno', /* Waits 0 seconds. Refers to the line above. */
	'wait_200'      : '0,2 segundos', /* Waits 0,2 seconds. Refers to the line above. */
	'wait_500'      : '0,5 segundos', /* Waits 0,5 seconds. Refers to the line above. */
	'wait_1000'     : '1 segundo', /* Waits 1 second. Refers to the line above. */
	'safe'          : ['Modo Rápido', "Se actualiza la tabla sólo al final, ahorrando tiempo y reduciendo el cálculo.<br>Con el Modo Rápido activado, el tiempo de espera se puede reducir sin el riesgo de bloquear la ventana."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'will'          : 'Próximamente', /* Displayed in Forts Highscores tab until it will be avaiable */
	'lang_name'     : 'Español', /* Write your lang name */
	'aut'           : 'Lafias', /* Prepended author's name */
	'trad'          : 'Lafias', /* Prepended your name */
	'trads'         : 'Traductores', /* Prepended list of translators (keep plural) */
	'trad_name'     : 'Lafias', /* Write the nickname that you want to be displayed */
	'trad_link'     : {
		'es1'  : ['Constructor', 70405], /* Write the subdomain of the world you play plus the server number, then your character name and your character id. If you play more than 1 server, add a new line for each of them. */
		'es4'  : ['Soldado', 70405], /* Write the subdomain of the world you play plus the server number, then your character name and your character id. If you play more than 1 server, add a new line for each of them. */
		'http' : 'http://userscripts.org/users/434876/scripts', /* Website which will be opened by clicking your name in a server where you don't play */
	},
	'duels_highs'   : 'Duelos', /* Duels Highscores tab name */
	'settings'      : 'Opciones', /* Settings tab name */
	'duels_single'  : 'Duelos Individuales', /* Single Duels tab name */
	'forts_highs'   : 'Fuertes', /* Forts Highscores tab name */
	'Export'        : 'Exportar', /* Export tab name */
	'about'         : 'Información', /* About tab name */
	'add'           : 'Añadir', /* Button to add players (Duels Highscores) or reports (Single Duels) */
	'add_players'   : "Añadir Jugadores", /* Label to text input to add players (Duels Highscores) */
	'add_player_tp' : 'Escribir el nombre del jugador.<br>Nota: Puedes escribir "[jugador1, jugador2, ...]" sin comillas<br>para añadir más jugadores juntos.', /* Tip displayed hovering the "?" near the text input to add players (Duels Highscores) */
	'add_report'    : 'Añadir Reportes', /* Label to text input to add reports (Single Duels) */
	'add_report_tp' : 'Escribe el link del reporte.<br>Ej.: [report=12345678abcdefghij]Report_name[/report]<br>Nota: Puedes escribir solo "[report=12345678abcdefghij]" sin comillas.<br>Nota: Puedes escribir mas links debajo para añadir mas reportes juntos.', /* Tip displayed hovering the "?" near the text input to add reports (Single Duels). Leave [report=12345678abcdefghij] and [/report] untranslated. */
	'show_info'     : 'Información de Jugadores', /* Table showing players infos (Duels Highscores) */
	'show_start'    : 'Datos Iniciales', /* Table showing intial data (Duels Highscores) */
	'show_end'      : 'Datos Finales', /* Table showing final data (Duels Highscores) */
	'show_high'     : 'Puntuación más alta', /* Displayed in Duels Highscores tab. */
	'show_exp'      : 'Experiencia', /* Table showing experience highscore (Duels Highscores) */
	'title_exp'     : 'Puntuación más alta de experiencia', /* Displayed exporting experience highscore */
	'show_win'      : 'Duelos Ganados', /* Table showing won duels highscore (Duels Highscores) */
	'title_win'     : 'Puntuación más alta en Duelos Ganados', /* Displayed exporting won duels highscore */
	'show_summ'     : 'Resúmen', /* Summary of duel reports (Single Duels) */
	'show_higt'     : 'Daños y Duelos', /* Best/worst hits and duels of duel reports (Single Duels) */
	'show_recm'     : 'Mejores Resultados', /* Best attackers results (exp, $$, bounty) of duel reports (Single Duels) */
	'show_reco'     : 'Mejor Oponente', /* Best defenders results (exp, $$, bounty) of duel reports (Single Duels) */
	'day'           : ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'], /* Days, three letters */
	'month'         : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], /* Months, three letters */
	'check_update'  : 'Buscar Actualizaciones', /* Check for script updates (About) */
	'reset'         : 'Resetear Datos', /* Delete all data (Settings) */
	'recov'         : 'Recuperar Datos', /* Display an alert with raw data (Settings) */
	'percent'       : 'Porcentaje del Indicador del Proceso', /* Displayed hovering the progress bar updating or adding data. */
	'tab_name'      : 'Nombre', /* Column in Duels Highscores tab */
	'tab_class'     : 'Clase', /* Column in Duels Highscores tab */
	'tab_craft'     : 'Oficio', /* Column in Duels Highscores tab */
	'tab_title'     : 'Título', /* Column in Duels Highscores tab */
	'tab_city'      : 'Ciudad', /* Column in Duels Highscores tab */
	'tab_ally'      : 'Alianza', /* Column in Duels Highscores tab */
	'tab_start'     : 'Inicio', /* Tip that shows the initial data (Duels Highscores) */
	'tab_end'       : 'Final', /* Tip that shows the final data (Duels Highscores) */
	'tab_update'    : 'Actualizar', /* Text to update initial/final data (Duels Highscores) */
	'tab_updated'   : 'Actualizar', /* Tip that shows when the data were last updated (Duels Highscores) */
	'tab_rel'       : 'Variacion de puntuación', /* Tip on the column name (final data table) (Duels Highscores) */
	'tab_rank'      : 'Ranking', /* Column in Duels Highscores tab */
	'tab_succ'      : 'Puntos de Logros', /* Column in Duels Highscores tab */
	'tab_liv'       : 'Nivel', /* Column in Duels Highscores tab */
	'tab_liv_duel'  : 'Nivel de Duelo', /* Column in Duels Highscores tab */
	'tab_rank_duel' : 'Ranking de Duelo', /* Column in Duels Highscores tab */
	'tab_exp'       : 'Exp', /* Column in Duels Highscores tab */
	'tab_win'       : 'Ganados', /* Column in Duels Highscores tab */
	'win'           : 'Duelos Ganados', /* Displayed selecting the order in Settings tab */
	'tab_lost'      : 'Perdidos', /* Column in Duels Highscores tab */
	'lost'          : 'Duelos Perdidos', /* Displayed selecting the order in Settings tab */
	'tab_diff'      : 'Diferencia', /* Column in Duels Highscores tab */
	'tab_actions'   : 'Acciones', /* Column in Duels Highscores tab */
	'tab_delete'    : 'Eliminar', /* Delete the player/report of that row */
	'tab_pos'       : 'Ranking', /* Column in Duels Highscores tab */
	'tab_points'    : 'Puntos', /* Column in Duels Highscores tab */
	'tab_players'   : 'Jugadores', /* Column in Duels Highscores tab */
	'tab_player'    : 'Jugador', /* Column in Single Duels tab */
	'tab_weapons'   : 'Armas', /* Column in Single Duels tab */
	'tab_duel'      : 'Duelo', /* Column in Single Duels tab */
	'tab_rounds'    : 'Rondas', /* Column in Single Duels tab */
	'tab_res'       : 'Resultado', /* Column in Single Duels tab */
	'tab_noone'     : 'No hay Jugadores', /* Displayed when no players were added (Duels Highscores) */
	'tab_noduel'    : 'No hay Duelos', /* Displayed when no reports were added (Single Duels) */
	'no_city'       : 'No hay Ciudad', /* Displayed when a player has no city (Duels Highscores) */
	'no_ally'       : 'No hay Alianza', /* Displayed when a player has no alliance (Duels Highscores) */
	'rem_data_conf' : '¿Estás seguro de que quieres eliminar todos los datos?', /* Asks confirm to delete all the data */
	'rem_pl_conf'   : '¿Estás seguro de que quieres eliminar el jugador?', /* Asks confirm to delete that player */
	'rem_rp_conf'   : '¿Estás seguro de que quieres eliminar el reporte?', /* Asks confirm to delete that report */
	'deleted'       : '{1} borrado de la lista', /* Displayed when a player was deleted */
	'added'         : '{1} añadido a la lista', /* Displayed when a player was added */
	'add_duel'      : 'Duelo añadido a la lista: {1} vs. {2}', /* Displayed when a report was added */
	'unknown_e'     : 'Ha ocurrido un error desconocido.', /* Displayed when an unknown error has occurred */
	'not_found'     : 'El jugador {1} no se encontró.', /* Displayed when the player searched was not found. {1} will be replaced with the searched name */
	'not_resp'      : 'El Servidor no está respondiendo. Por favor intentalo más tarde..', /* Displayed when the server doesn't respond */
	'no_p_insrtd'   : 'Ningún jugador añadido', /* Displayed when no players were added (Settings) */
	'no_r_insrtd'   : 'Ningún reporte añadido', /* Displayed when no reports were added (Settings) */
	'soldier'       : 'Soldado', /* Class name */
	'worker'        : 'Trabajador', /* Class name */
	'duelist'       : 'Duelista', /* Class name */
	'adventurer'    : 'Aventurero', /* Class name */
	'greenhorn'     : 'Novato', /* Class name */
	'craft0'        : 'Sin Oficio', /* No-craft name */
	'craft1'        : 'Cocinero de campo', /* Craft name */
	'craft2'        : 'Vendedor de Tónicos', /* Craft name */
	'craft3'        : 'Herrero', /* Craft name */
	'craft4'        : 'Maestro de Guarnición', /* Craft name */
	'hit_sh_left'   : 'Hombro Izquiedo', /* Hit name */
	'hit_ar_left'   : 'Mano Izquierda', /* Hit name */
	'hit_sh_righ'   : 'Hombro Derecho', /* Hit name */
	'hit_ar_righ'   : 'Mano Derecha', /* Hit name */
	'hit_head'      : 'Cabeza', /* Hit name */
	'hit_none'      : 'Ningún Acierto', /* Hit name */
	'vs'            : 'vs.', /* Player1 vs. Player2 */
	'HP'            : 'HP', /* Column in Single Duels tab */
	'exp'           : 'Exp', /* Column in Single Duels tab */
	'pass'          : '{1} se desmaya.', /* {1} will be replaced with a player name (Single Duels) */
	'dwin'          : '{1} gana {2} puntos de experiencia', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'ddwin'         : 'y ${1}', /* {1} will be replaced with a number (Single Duels) */
	'dbwin'         : '{1} recibe una recompensa de ${2}', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'best_hit'      : 'Mejor Acierto', /* Column in Single Duels tab */
	'best_duel'     : 'Mejor Duelo', /* Column in Single Duels tab */
	'worst_hit'     : 'Peor Acierto', /* Column in Single Duels tab */
	'worst_duel'    : 'Peor Duelo', /* Column in Single Duels tab */
	'high_exp'      : 'Mayor cantidad de Experiencia conseguida', /* Column in Single Duels tab */
	'high_$$'       : 'Mayor cantidad de Dinero conseguido', /* Column in Single Duels tab */
	'high_bou'      : 'Mayor Recompensa recibida', /* Column in Single Duels tab */
	'opponent'      : 'Oponente', /* Displayed selecting the order in Settings tab */
	'settings_save' : 'Guardar Configuración', /* Button to save Settings */
	'settings_drop' : 'Ignorar Cambios', /* Button to ignore Settings */
	'yes'           : 'Si', /* Displayed updating the script */
	'no'            : 'No', /* Displayed updating the script */
	'update'        : 'Actualizar?', /* Displayed updating the script */
	'latest_v'      : "La última versión es ", /* Will be followed by a version number */
	'current_v'     : "Tu versión es ", /* Will be followed by a version number */
	'webpage'       : 'Página web', /* Link to the script website */
	'credit_upd'    : '{subj} modificado por {name}', /* {subj} will be replaced with a string like "Script Updater [SOM]", {name} with "Narulez" */
	'exp_nsel'      : 'Seleccionar una Puntuación Máxima', /* Displayed in Export tab */
	'exp_data'      : 'Exportar datos', /* Displayed in Export tab */
	'only_name'     : 'Sólo Nombres', /* Displayed in Export tab */
	'name_score'    : 'Nombres y Resultados', /* Displayed in Export tab */
	'ctrl_c'        : 'Ctrl + C para Copiar', /* Displayed in Export tab */
	'thanks'        : 'Gracias', /* Displayed in About tab */
	'team'          : '{1} Equipo', /* Displayed in About tab. {1} will be replaced with the team name */
	'tidea'         : 'Por la idea.', /* Displayed in About tab */
	'tidb'          : 'por el método de almacenamiento en caché de IndexedDB.', /* Displayed in About tab */
	'tupder'        : 'por el script original que actualiza in-game.', /* Displayed in About tab */
	'IndexedDB_tiw' : 'Tendrás que activar IndexedDB para ver los reportes de las Mejores Puntuaciones en Fuertes', /* Displayed in Forts Highscores tab until it will be avaiable */
	'IndexedDB_tip' : 'Tienes que activar IndexedDB para ver los reportes de las Mejores Puntuaciones en Fuertes', /* Displayed in Forts Highscores tab if IndexedDB is not activated */
	'Ind_info'      : 'Información de compatibilidad', /* Link to IndexedDB compatibility infos */
	'IDB_not_supp'  : 'IndexedDB no es compatible con tu navegador.', /* Displayed in Forts Highscores tab if IndexedDB is not supported by the user's browser */
	'IndexedDB_nsp' : 'No Compatible', /* Displayed in Settings tab if IndexedDB is not supported by the user's browser */
};