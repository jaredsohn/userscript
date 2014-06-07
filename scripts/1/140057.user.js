/**
// ==UserScript==
// @name           The West - Battles Stats - Polish Language Pack
// @description    Language Pack for The West - Battles Stats (http://userscripts.org/scripts/show/118401)
// @translator(s)  Darius II
// Translators notice: If you are continuing the work of someone else, please keep the name of all the previous contributors in the line above!
// @version        2.0
// @exclude        *
// ==/UserScript==
**/

TWBS.Langs.pl = {
	'not_reload'    : "Zniany nie wymagają odświeżania.",
	'need_reload'   : 'Zniany wymagają odświeżania strony.',
	'reload_win'    : 'Część z tych zmian wymaga odświeżenia strony.',
	'select'        : 'Wybierz',
	'select_lang'   : 'Wybierz język (wymuszenie)',
	'select_sort'   : 'Order {1}by', /* Displayed in Settings tab. {1} will result in "hits", "results" or nothing. */
	'results'       : 'wyniki',
	'hits'          : 'hits', /* Substitutes {1} in the line above */
	'sort_down'     : 'Rosnąco',
	'sort_up'       : 'Malejąco',
	'wait'          : ["Odczekąć pomiędzy aktualizacjami", "Jeśli podczas okno aktualizacji zawiesza się lub zwalnia, spróbuj zwiększyć tę wartość."],
	'wait_0'        : 'brak',
	'wait_200'      : 'krótki',
	'wait_500'      : 'średni',
	'wait_1000'     : 'długi',
	'safe'          : ['Speed Mode', "It updates the table only at the end, saving time and lessening the calculation.<br>With the Speed Mode activated, the waiting time can be reduced without the risk of blocking the window."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'will'          : 'Coming Soon', /* Displayed in Forts Highscores tab until it will be avaiable */
	'lang_name'     : 'Polski',
	'aut'           : 'Author', /* Prepended author's name */
	'trad'          : 'Translator', /* Prepended your name */
	'trads'         : 'Translators', /* Prepended list of translators (keep plural) */
	'trad_name'     : 'Narulez', /* Write the nickname that you want to be displayed */
	'trad_link'     : {
		'it2'  : ['Builder', 178056], /* Write the subdomain of the world you play plus the server number, then your character name and your character id. If you play more than 1 server, add a new line for each of them. */
		'http' : 'http://userscripts.org/users/268539/scripts', /* Website which will be opened by clicking your name in a server where you don't play */
	},
	'duels_highs'   : 'Duels Highscores', /* Duels Highscores tab name */
	'settings'      : 'Settings', /* Settings tab name */
	'duels_single'  : 'Single Duels', /* Single Duels tab name */
	'forts_highs'   : 'Forts Highscores', /* Forts Highscores tab name */
	'Export'        : 'Export', /* Export tab name */
	'about'         : 'About', /* About tab name */
	'add'           : 'Add', /* Button to add players (Duels Highscores) or reports (Single Duels) */
	'add_players'   : "Add players", /* Label to text input to add players (Duels Highscores) */
	'add_player_tp' : 'Write the player name.<br>Hint: you can write "[player1, player2, ...]" without quotes<br>to add more players together.', /* Tip displayed hovering the "?" near the text input to add players (Duels Highscores) */
	'add_report'    : 'Add reports', /* Label to text input to add reports (Single Duels) */
	'add_report_tp' : 'Write the report link.<br>Ex.: [report=12345678abcdefghij]Report_name[/report]<br>Hint: you can write only "[report=12345678abcdefghij]" without quotes.<br>Hint: you can write more links below to add more reports together.', /* Tip displayed hovering the "?" near the text input to add reports (Single Duels). Leave [report=12345678abcdefghij] and [/report] untranslated. */
	'show_info'     : 'Players infos', /* Table showing players infos (Duels Highscores) */
	'show_start'    : 'Initial data', /* Table showing intial data (Duels Highscores) */
	'show_end'      : 'Final data', /* Table showing final data (Duels Highscores) */
	'show_high'     : 'Highscores', /* Displayed in Duels Highscores tab. */
	'show_exp'      : 'Experience', /* Table showing experience highscore (Duels Highscores) */
	'title_exp'     : 'Experience highscore', /* Displayed exporting experience highscore */
	'show_win'      : 'Won duels', /* Table showing won duels highscore (Duels Highscores) */
	'title_win'     : 'Won duels highscore', /* Displayed exporting won duels highscore */
	'show_summ'     : 'Summary', /* Summary of duel reports (Single Duels) */
	'show_higt'     : 'Hits and duels', /* Best/worst hits and duels of duel reports (Single Duels) */
	'show_recm'     : 'Best results', /* Best attackers results (exp, $$, bounty) of duel reports (Single Duels) */
	'show_reco'     : 'Best opponent results', /* Best defenders results (exp, $$, bounty) of duel reports (Single Duels) */
	'day'           : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], /* Days, three letters */
	'dayl'          : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], /* Days, complete */
	'month'         : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], /* Months, three letters */
	'monthl'        : ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], /* Months, complete */
	'check_update'  : 'Check for updates', /* Check for script updates (About) */
	'reset'         : 'Reset data', /* Delete all data (Settings) */
	'recov'         : 'Recover data', /* Display an alert with raw data (Settings) */
	'percent'       : 'Indicative progress percentage', /* Displayed hovering the progress bar updating or adding data. */
	'tab_name'      : 'Name', /* Column in Duels Highscores tab */
	'tab_class'     : 'Class', /* Column in Duels Highscores tab */
	'tab_craft'     : 'Craft', /* Column in Duels Highscores tab */
	'tab_title'     : 'Title', /* Column in Duels Highscores tab */
	'tab_city'      : 'City', /* Column in Duels Highscores tab */
	'tab_ally'      : 'Alliance', /* Column in Duels Highscores tab */
	'tab_start'     : 'Start', /* Tip that shows the initial data (Duels Highscores) */
	'tab_end'       : 'End', /* Tip that shows the final data (Duels Highscores) */
	'tab_update'    : 'Update', /* Text to update initial/final data (Duels Highscores) */
	'tab_updated'   : 'Updated', /* Tip that shows when the data were last updated (Duels Highscores) */
	'tab_rel'       : 'Values relative from beginning', /* Tip on the column name (final data table) (Duels Highscores) */
	'tab_rank'      : 'Rank', /* Column in Duels Highscores tab */
	'tab_succ'      : 'Success Points', /* Column in Duels Highscores tab */
	'tab_liv'       : 'Level', /* Column in Duels Highscores tab */
	'tab_liv_duel'  : 'Duel level', /* Column in Duels Highscores tab */
	'tab_rank_duel' : 'Duel rank', /* Column in Duels Highscores tab */
	'tab_exp'       : 'Exp', /* Column in Duels Highscores tab */
	'tab_win'       : 'Won', /* Column in Duels Highscores tab */
	'win'           : 'Duels Won', /* Displayed selecting the order in Settings tab */
	'tab_lost'      : 'Lost', /* Column in Duels Highscores tab */
	'lost'          : 'Duels Lost', /* Displayed selecting the order in Settings tab */
	'tab_diff'      : 'Diff', /* Column in Duels Highscores tab */
	'tab_actions'   : 'Actions', /* Column in Duels Highscores tab */
	'tab_delete'    : 'Delete', /* Delete the player/report of that row */
	'tab_pos'       : 'Rank', /* Column in Duels Highscores tab */
	'tab_pos_l'     : 'Rank', /* Column in Fortbattles Highscores tab */
	'tab_points'    : 'Points', /* Column in Duels Highscores tab */
	'tab_players'   : 'Players', /* Column in Duels Highscores tab */
	'tab_player'    : 'Player', /* Column in Single Duels tab */
	'tab_weapons'   : 'Weapons', /* Column in Single Duels tab */
	'tab_duel'      : 'Duel', /* Column in Single Duels tab */
	'tab_rounds'    : 'Rounds', /* Column in Single Duels tab */
	'tab_res'       : 'Result', /* Column in Single Duels tab */
	'tab_noone'     : 'There are no players', /* Displayed when no players were added (Duels Highscores) */
	'tab_noduel'    : 'There are no duels', /* Displayed when no reports were added (Single Duels) */
	'tab_nobatt'    : 'There are no fortbattles', /* Displayed when no fortbattles were added (Fortbattles) */
	'tab_nobattime' : 'There were no fortbattles in that period of time', /* Displayed when no fortbattles for that period of time were added (Fortbattles) */
	'no_city'       : 'No city', /* Displayed when a player has no city (Duels Highscores) */
	'no_ally'       : 'No alliance', /* Displayed when a player has no alliance (Duels Highscores) */
	'rem_data_conf' : 'Do you really want to delete all the data?', /* Asks confirm to delete all the data */
	'rem_pl_conf'   : 'Do you really want to delete the player?', /* Asks confirm to delete that player */
	'rem_rp_conf'   : 'Do you really want to delete the report?', /* Asks confirm to delete that report */
	'rem_fb_conf'   : 'Do you really want to delete the fortbattle?', /* Asks confirm to delete that fortbattle */
	'deleted'       : '{1} deleted from list', /* Displayed when a player was deleted */
	'added'         : '{1} added to list', /* Displayed when a player was added */
	'add_duel'      : 'Duel added to list: {1} vs. {2}', /* Displayed when a report was added */
	'notaduel'      : 'This report isn\'t a duel.', /* Displayed when a report isn't a duel (Single Duels) */
	'unknown_e'     : 'An unknown error has occurred.', /* Displayed when an unknown error has occurred */
	'not_found'     : 'The player {1} was not found.', /* Displayed when the player searched was not found. {1} will be replaced with the searched name */
	'not_resp'      : 'The server is not responding. Please try again later.', /* Displayed when the server doesn't respond */
	'no_p_insrtd'   : 'Nie dodano gracza',
	'no_r_insrtd'   : 'Nie dodano raportu',
	'soldier'       : 'Żołnierz',
	'worker'        : 'Budowniczy',
	'duelist'       : 'Zawadiaka',
	'adventurer'    : 'Poszukiwacz',
	'greenhorn'     : 'Nowicjusz',
	'craft0'        : 'Untrained', /* No-craft name */
	'craft1'        : 'Kucharz',
	'craft2'        : 'Znachor',
	'craft3'        : 'Kowal',
	'craft4'        : 'Rymarz',
	'hit_sh_left'   : 'Left shoulder', /* Hit name */
	'hit_ar_left'   : 'Left arm', /* Hit name */
	'hit_sh_righ'   : 'Right shoulder', /* Hit name */
	'hit_ar_righ'   : 'Right arm', /* Hit name */
	'hit_head'      : 'Head', /* Hit name */
	'hit_none'      : 'No hit', /* Hit name */
	'vs'            : 'vs.', /* Player1 vs. Player2 */
	'HP'            : 'HP', /* Column in Single Duels tab */
	'exp'           : 'Exp', /* Column in Single Duels tab */
	'pass'          : '{1} passes out.', /* {1} will be replaced with a player name (Single Duels) */
	'dwin'          : '{1} earns {2} experience', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'ddwin'         : 'and ${1}', /* {1} will be replaced with a number (Single Duels) */
	'dbwin'         : '{1} receives a bounty of ${2}', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'best_hit'      : 'Best hit', /* Column in Single Duels tab */
	'best_duel'     : 'Best duel', /* Column in Single Duels tab */
	'worst_hit'     : 'Worst hit', /* Column in Single Duels tab */
	'worst_duel'    : 'Worst duel', /* Column in Single Duels tab */
	'high_exp'      : 'Higher experience', /* Column in Single Duels tab */
	'high_$$'       : 'Higher gain', /* Column in Single Duels tab */
	'high_bou'      : 'Higher bounty received', /* Column in Single Duels tab */
	'opponent'      : 'Opponent', /* Displayed selecting the order in Settings tab */
	'yes'           : 'Yes', /* Displayed updating the script */
	'no'            : 'No', /* Displayed updating the script */
	'update'        : 'Update?', /* Displayed updating the script */
	'latest_v'      : "The latest version is ", /* Will be followed by a version number */
	'current_v'     : "Your version is ", /* Will be followed by a version number */
	'webpage'       : 'Web page', /* Link to the script website */
	'credit_upd'    : '{subj} slightly modified by {name}', /* {subj} will be replaced with a string like "Script Updater [SOM]", {name} with "Narulez" */
	'exp_nsel'      : 'Select a highscore', /* Displayed in Export tab */
	'exp_data'      : 'Export data', /* Displayed in Export tab */
	'only_name'     : 'Only names', /* Displayed in Export tab */
	'name_score'    : 'Names and scores', /* Displayed in Export tab */
	'ctrl_c'        : 'Ctrl + C to copy', /* Displayed in Export tab */
	'thanks'        : 'Thanks', /* Displayed in About tab */
	'team'          : '{1} team', /* Displayed in About tab. {1} will be replaced with the team name */
	'thanks2'		: "{1} and {2}", /* Displayed in About tab. {1} and {2} will be replaced with two names */
	'thankguys'		: "{1} guys", /* Displayed in About tab. {1} will be replaced with the team name */
	'tidea'         : 'for the idea.', /* Displayed in About tab */
	'tupder'        : 'for the original in-game script Updater.', /* Displayed in About tab */
	'IndexedDB_tiw' : 'You will need to activate IndexedDB to see forts highscores', /* Displayed in Forts Highscores tab until it will be avaiable */
	'IndexedDB_tip' : 'You need to activate IndexedDB to see forts highscores', /* Displayed in Forts Highscores tab if IndexedDB is not activated */
	'Ind_info'      : 'Compatibility infos', /* Link to IndexedDB compatibility infos */
	'IDB_not_supp'  : 'IndexedDB is not supported by your browser.', /* Displayed in Forts Highscores tab if IndexedDB is not supported by the user's browser */
	'IndexedDB_nsp' : 'not supported', /* Displayed in Settings tab if IndexedDB is not supported by the user's browser */
	'addlang'       : 'Add lang', /* Option in the lang selection to add an external lang */
	'lang_added'    : "Language pack added.", /* Displayed when a new language pack was successfully added */
	'transferred'   : "{1} has been transferred.", /* Displayed when changing IndexedDB-LocalStorage method and all went fine. {1} will be replaced with the specific data name (SingleDuels etc.)*/
	'n_transferred' : "{1} hasn't been transferred!", /* Displayed when changing IndexedDB-LocalStorage method and something went wrong. {1} will be replaced with the specific data name (SingleDuels etc.)*/
	'hf_get_lab'    : 'Latest fort battles to load', /* Displayed in HighForts > Summary tab. */
	'hf_overwrite'  : 'Overwrite', /* Displayed in HighForts > Summary tab. Option to overwrite fortbattles or skip if they have been downloaded before. */
	'add_fortbatt'  : 'Load', /* Displayed in HighForts > Summary tab. Starts downloading fortbattles. */
	'hf_insnum'     : 'Insert a number', /* Error displayed if the number of latest fortbattles to load isn't a number :P */
	'hf_badded'     : '"{fort}" fort battle added to the list', /* Fortbattle added. {fort} is the fortbattle name. */
	'hf_bremoved'   : '"{fort}" fort battle removed from the list', /* Fortbattle removed. {fort} is the fortbattle name. */
	'err_head'      : 'List of errors encountered. Please, report them to me.', /* Displayed in About tab. */
	'cacheloaded'   : 'Cache ({1}) loaded', /* Displayed in Settings tab. The {1}-type cache has been loaded. */
	'cachehloaded'  : 'Cache ({1}) half loaded', /* Displayed in Settings tab. The {1}-type cache has been half loaded (only HighDuels). */
	'cachenloaded'  : 'Cache ({1}) not loaded', /* Displayed in Settings tab. The {1}-type cache has not been loaded. */
	'bfsaved'       : 'Fortbattles loaded', /* Displayed in HighForts > Summary tab. It is followed by a number. */
	'date'          : 'Date', /* Column name in HighForts > Summary tab. */
	'defender'      : 'Defender', /* Column name in HighForts > Summary tab. */
	'result'        : 'Result', /* Column name in HighForts > Summary tab. */
	'attacker'      : 'Attacker', /* Column name in HighForts > Summary tab. */
	'reload'        : 'Reload', /* Tip on a link to redownload a specific fortbattle. */
	'calcStats'     : 'Calculate', /* Starts calculating the Highscores (HighForts > Highscores tab) */
	'statsType'     : 'Type of stats', /* Clicking on that button a new window will be opened to change type of stats. Keep it short. */
	'dmy'           : '%5/%4/%3', /* Date format: %3 is day, %4 is month, %5 is year. */
	'thousSepar'    : ',', /* Thousand separator. */
	'decimSepar'    : '.', /* Decimal separator. */
	'formulas'      : 'Formulas', /* Tab name in "Type of stats" window. */
	'playerstats'   : 'Player stats', /* Tab name in "Type of stats" window. */
	'townstats'     : 'Town stats', /* Tab name in "Type of stats" window. */
	'use'           : 'Use', /* Checkbox to use player stats or town stats in Formulas tab. */
	'tS_sel_form'   : 'Select formula', /* All strings code starting with tS_ are displayed in "Type of stats" window. (for the moment only Player Stats tab) */
	'tS_nam_form'   : 'Formula name',
	'tS_algorithm'  : 'Formula',
	'tS_locked'     : 'Locked',
	'tS_flocked'    : 'This formula is locked!',
	'tS_clone'      : 'Clone',
	'tS_save'       : 'Save',
	'tS_delete'     : 'Delete',
	'tS_var'        : 'Variable',
	'tS_consider'   : 'Consider',
	'tS_multiply'   : 'Multiplier',
	'tS_vb'         : 'Battle won', /* All strings from this to 'tS_weapmin' are variables name. If a string starts with 'tS_d', it is a tip displayed hovering the variable row.*/
	'tS_dvb'        : 'Has value 1 if the battle has been won, otherwise 0.',
	'tS_pb'         : 'Battle lost',
	'tS_dpb'        : 'Has value 1 if the battle has been lost, otherwise 0.',
	'tS_def'        : 'DEFENSE',
	'tS_ddef'       : 'Has value 1 if the battle is a defense, otherwise 0.',
	'tS_att'        : 'ATTACK',
	'tS_datt'       : 'Has value 1 if the battle is an attack, otherwise 0.',
	'tS_vdef'       : 'Defense won',
	'tS_dvdef'      : 'Has value 1 if the battle is a defense and has been won, otherwise 0.',
	'tS_vatt'       : 'Attack won',
	'tS_dvatt'      : 'Has value 1 if the battle is an attack and has been won, otherwise 0.',
	'tS_pdef'       : 'Defense lost',
	'tS_dpdef'      : 'Has value 1 if the battle is a defense and has been lost, otherwise 0.',
	'tS_patt'       : 'Attack lost',
	'tS_dpatt'      : 'Has value 1 if the battle is an attack and has been lost, otherwise 0.',
	'tS_charclass'  : 'CLASS',
	'tS_sold'       : 'Żołnierz',
	'tS_lavo'       : 'Budowniczy',
	'tS_duel'       : 'Zawadiaka',
	'tS_avve'       : 'Poszukiwacz',
	'tS_novi'       : 'Nowicjusz',
	'tS_levl'       : 'Poziom',
	'tS_maxhp'      : 'Max HP',
	'tS_starthp'    : 'Początkowe HP',
	'tS_finishedhp' : 'Końcowe HP',
	'tS_hitcount'   : 'Hit count',
	'tS_maxdamage'  : 'Max damage',
	'tS_totaldmg'   : 'Total damage',
	'tS_crithits'   : 'Critical hits',
	'tS_misscount'  : 'Missed hits',
	'tS_playdead'   : 'Enemies passed out',
	'tS_takenhits'  : 'Taken hits',
	'tS_takendmg'   : 'Taken damage',
	'tS_dodgecount' : 'Dodged hits',
	'tS_diedwhen'   : 'Rounds in life',
	'tS_flaghold'   : 'Rounds on flag',
	'tS_weapmax'    : 'Max weapon damage',
	'tS_weapdiff'   : 'Average weapon damage',
	'tS_weapmin'    : 'Min weapon damage',
	'tS_undefval'   : '{1} has undefined value or is 0. It has been converted to 1.', /* Error displayed when saving a formula if a multiplier is 0 or isn't a number. {1} is replaced with variable name. */
	'tS_saved'      : 'Formula saved!',
	'tS_rusure'     : 'Czy jesteś pewien?',
	'tS_deleted'    : 'Formula deleted!',
	'tS_toclone'    : '{1} cloned', /* The new name for a cloned formula. {1} is the original name. */
	'tS_cloned'     : 'Formula cloned!',
};