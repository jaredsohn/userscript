/*
// ==UserScript==
// @name           The West - Battles Stats - PT-BR Language Pack
// @description    Language Pack for The West - Battles Stats
// @icon           http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license        GNU Lesser General Public License (LGPL)
// @copyright      2012, Claudiney Walter (The-West BR8,BR10)
// @translator	   CWalter
// @version        1.9.1
// @exclude        *
// ==/UserScript==
*/

TWBS.Langs.br = { /* use the two or three letters of your language server */
	'options'       : 'Opções do Battles Stats', /* Displayed when hovering the button on the left menu */
	'not_reload'    : "Você não precisa atualizar nada para notar as mudanças.", /* Warning displayed in Settings tab. */
	'need_reload'   : 'Você precisa atualizar a página para notar as mudanças.', /* Warning displayed in Settings tab. */
	'reload_win'    : 'Você poderá precisar atualizar a janela do TWBS para notar algumas das mudanças.', /* Warning displayed in Settings tab. */
	'select'        : 'Selecionar', /* First element of lang menu (=no lang selected). Keep this the shortest you can. */
	'select_lang'   : 'Selecionar linguagem (força)', /* Label for lang menu. */
	'select_sort'   : 'Ordenar {1}por', /* Displayed in Settings tab. {1} will result in "hits", "results" or nothing. */
	'results'       : 'resultados', /* Substitutes {1} in the line above */
	'hits'          : 'danos', /* Substitutes {1} in the line above */
	'sort_down'     : 'Crescente', /* Order type (A-Z / 0-10) */
	'sort_up'       : 'Decrescente', /* Order type (Z-A / 10-0) */
	'wait'          : ['Modo de Velocidade', "Atualiza a janela apenas no fim, economizando tempo e diminuindo os cálculos.&lt;br&gt;Com o Modo de Velocidade ativado, o tempo de espera pode ser diminuído sem o risco the travar a janela."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'wait_0'        : 'Nenhum', /* Waits 0 seconds. Refers to the line above. */
	'wait_200'      : '0,2 segundos', /* Waits 0,2 seconds. Refers to the line above. */
	'wait_500'      : '0,5 segundos', /* Waits 0,5 seconds. Refers to the line above. */
	'wait_1000'     : '1 segundo', /* Waits 1 second. Refers to the line above. */
	'safe'          : ['Modo de Velocidade', "Atualiza a janela apenas no fim, economizando tempo e diminuindo os cálculos.&lt;br&gt;Com o Modo de Velocidade ativado, o tempo de espera pode ser diminuído sem o risco the travar a janela."], /* First sentence is displayed in Settings tab, second sentence is displayed when hovering the first one */
	'will'          : 'Está a vir', /* Displayed in Forts Highscores tab until it will be avaiable */
	'lang_name'     : 'Português', /* Write your lang name */
	'aut'           : 'Autor', /* Prepended author's name */
	'trad'          : 'Tradutor', /* Prepended your name */
	'trads'         : 'Tradutores', /* Prepended list of translators (keep plural) */
	'trad_name'     : 'Claudiney W.', /* Write the nickname that you want to be displayed */
	'trad_link'     : {
		'br8'  : ['Claudiney W.', 1529435], /* Write the subdomain of the world you play plus the server number, then your character name and your character id. If you play more than 1 server, add a new line for each of them. */
		'br10' : ['Claudiney W.', 1529435],
		'http' : 'http://userscripts.org/users/344882/scripts', /* Website which will be opened by clicking your name in a server where you don't play */
	},
	'duels_highs'   : 'Recordes de Duelos', /* Duels Highscores tab name */
	'settings'      : 'Configurações', /* Settings tab name */
	'duels_single'  : 'Duelos sozinho', /* Single Duels tab name */
	'forts_highs'   : 'Recorde de Batalhas', /* Forts Highscores tab name */
	'Export'        : 'Exportar', /* Export tab name */
	'about'         : 'About', /* About tab name */
	'add'           : 'Adicionar', /* Button to add players (Duels Highscores) or reports (Single Duels) */
	'add_players'   : "Adicionar jogadores", /* Label to text input to add players (Duels Highscores) */
	'add_player_tp' : 'Escreva o nome do jogador.&lt;br&gt;Dica: Você pode escrever "[jogador1, jogador2, ...]" sem as aspas&lt;br&gt;para adicionar mais jogadores ao mesmo tempo.', /* Tip displayed hovering the "?" near the text input to add players (Duels Highscores) */
	'add_report'    : 'Adicionar relatórios', /* Label to text input to add reports (Single Duels) */
	'add_report_tp' : 'Escreva o link do relatório.&lt;br&gt;Ex.: [report=12345678abcdefghij]Nome_do_Relatório[/report]&lt;br&gt;Dica: Você pode escrever apenas "[report=12345678abcdefghij]" sem as aspas.&lt;br&gt;Dica: Você pode escrever mais links abaixo para adicionar mais relatórios ao mesmo tempo.', /* Tip displayed hovering the "?" near the text input to add reports (Single Duels). Leave [report=12345678abcdefghij] and [/report] untranslated. */
	'show_info'     : 'Info dos jogadores', /* Table showing players infos (Duels Highscores) */
	'show_start'    : 'Dados iniciais', /* Table showing intial data (Duels Highscores) */
	'show_end'      : 'Dados finais', /* Table showing final data (Duels Highscores) */
	'show_high'     : 'Recordes', /* Displayed in Duels Highscores tab. */
	'show_exp'      : 'Experiência', /* Table showing experience highscore (Duels Highscores) */
	'title_exp'     : 'Recorde de Experiência', /* Displayed exporting experience highscore */
	'show_win'      : 'Duelos vencidos', /* Table showing won duels highscore (Duels Highscores) */
	'title_win'     : 'Recorde de duelos vencidos', /* Displayed exporting won duels highscore */
	'show_summ'     : 'Sumário', /* Summary of duel reports (Single Duels) */
	'show_higt'     : 'Hits e duelos', /* Best/worst hits and duels of duel reports (Single Duels) */
	'show_recm'     : 'Melhores resultados', /* Best attackers results (exp, $$, bounty) of duel reports (Single Duels) */
	'show_reco'     : 'Melhores resultados do oponente', /* Best defenders results (exp, $$, bounty) of duel reports (Single Duels) */
	'day'           : ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'], /* Days, three letters */
	'month'         : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], /* Months, three letters */
	'check_update'  : 'Verificar atualizações', /* Check for script updates (About) */
	'reset'         : 'Resetar dados', /* Delete all data (Settings) */
	'recov'         : 'Recuperar dados', /* Display an alert with raw data (Settings) */
	'percent'       : 'Porcentagem indicativa de progresso', /* Displayed hovering the progress bar updating or adding data. */
	'tab_name'      : 'Nome', /* Column in Duels Highscores tab */
	'tab_class'     : 'Classe', /* Column in Duels Highscores tab */
	'tab_craft'     : 'Ofício', /* Column in Duels Highscores tab */
	'tab_title'     : 'Ofício', /* Column in Duels Highscores tab */
	'tab_city'      : 'Cidade', /* Column in Duels Highscores tab */
	'tab_ally'      : 'Aliança', /* Column in Duels Highscores tab */
	'tab_start'     : 'Aliança', /* Tip that shows the initial data (Duels Highscores) */
	'tab_end'       : 'Fim', /* Tip that shows the final data (Duels Highscores) */
	'tab_update'    : 'Atualização', /* Text to update initial/final data (Duels Highscores) */
	'tab_updated'   : 'Atualizado', /* Tip that shows when the data were last updated (Duels Highscores) */
	'tab_rel'       : 'Valores relativos desde o inicio', /* Tip on the column name (final data table) (Duels Highscores) */
	'tab_rank'      : 'Rank', /* Column in Duels Highscores tab */
	'tab_succ'      : 'Pontos de Conquista', /* Column in Duels Highscores tab */
	'tab_liv'       : 'Nivel', /* Column in Duels Highscores tab */
	'tab_liv_duel'  : 'Nivel de duelo', /* Column in Duels Highscores tab */
	'tab_rank_duel' : 'Ranking de duelo', /* Column in Duels Highscores tab */
	'tab_exp'       : 'Exp', /* Column in Duels Highscores tab */
	'tab_win'       : 'Vitór', /* Column in Duels Highscores tab */
	'win'           : 'Duelos vencidos', /* Displayed selecting the order in Settings tab */
	'tab_lost'      : 'Derr', /* Column in Duels Highscores tab */
	'lost'          : 'Duelos perdidos', /* Displayed selecting the order in Settings tab */
	'tab_diff'      : 'Difer', /* Column in Duels Highscores tab */
	'tab_actions'   : 'Ações', /* Column in Duels Highscores tab */
	'tab_delete'    : 'Excluir', /* Delete the player/report of that row */
	'tab_pos'       : 'Posição', /* Column in Duels Highscores tab */
	'tab_points'    : 'Pontos', /* Column in Duels Highscores tab */
	'tab_players'   : 'Jogadores', /* Column in Duels Highscores tab */
	'tab_player'    : 'Jogador', /* Column in Single Duels tab */
	'tab_weapons'   : 'Armas', /* Column in Single Duels tab */
	'tab_duel'      : 'Duelo', /* Column in Single Duels tab */
	'tab_rounds'    : 'Rounds', /* Column in Single Duels tab */
	'tab_res'       : 'Resultado', /* Column in Single Duels tab */
	'tab_noone'     : 'Não há jogadores', /* Displayed when no players were added (Duels Highscores) */
	'tab_noduel'    : 'Não há duelos', /* Displayed when no reports were added (Single Duels) */
	'no_city'       : 'Sem cidade', /* Displayed when a player has no city (Duels Highscores) */
	'no_ally'       : 'Sem aliança', /* Displayed when a player has no alliance (Duels Highscores) */
	'rem_data_conf' : 'Você realmente quer excluir todos os dados?', /* Asks confirm to delete all the data */
	'rem_pl_conf'   : 'Você realmente quer excluir o jogador?', /* Asks confirm to delete that player */
	'rem_rp_conf'   : 'Você realmente quer excluir o relatório?', /* Asks confirm to delete that report */
	'deleted'       : '{1} excluido da lista', /* Displayed when a player was deleted */
	'added'         : '{1} adicionado a lista', /* Displayed when a player was added */
	'add_duel'      : 'Duelo adicionado a lista: {1} vs. {2}', /* Displayed when a report was added */
	'unknown_e'     : 'Um erro desconhecido ocorreu.', /* Displayed when an unknown error has occurred */
	'not_found'     : 'O jogador {1} não foi encontrado.', /* Displayed when the player searched was not found. {1} will be replaced with the searched name */
	'not_resp'      : 'O servidor não está respondendo. Por favor tente novamente mais tarde.', /* Displayed when the server doesn't respond */
	'no_p_insrtd'   : 'Nenhum jogador inserido', /* Displayed when no players were added (Settings) */
	'no_r_insrtd'   : 'Nenhum relatório inserido', /* Displayed when no reports were added (Settings) */
	'soldier'       : 'Soldado', /* Class name */
	'worker'        : 'Trabalhador', /* Class name */
	'duelist'       : 'Pistoleiro', /* Class name */
	'adventurer'    : 'Aventureiro', /* Class name */
	'greenhorn'     : 'Novato', /* Class name */
	'craft0'        : 'Desempregado', /* No-craft name */
	'craft1'        : 'Cozinheiro de campo', /* Craft name */
	'craft2'        : 'Vendedor de tônico', /* Craft name */
	'craft3'        : 'Ferreiro', /* Craft name */
	'craft4'        : 'Perito Mestre', /* Craft name */
	'hit_sh_left'   : 'Ombro esquerdo', /* Hit name */
	'hit_ar_left'   : 'Braço esquerdo', /* Hit name */
	'hit_sh_righ'   : 'Ombro direito', /* Hit name */
	'hit_ar_righ'   : 'Braço direito', /* Hit name */
	'hit_head'      : 'Cabeça', /* Hit name */
	'hit_none'      : 'Não atingiu', /* Hit name */
	'vs'            : 'vs.', /* Player1 vs. Player2 */
	'HP'            : 'HP', /* Column in Single Duels tab */
	'exp'           : 'Exp', /* Column in Single Duels tab */
	'pass'          : '{1} desmaiou.', /* {1} will be replaced with a player name (Single Duels) */
	'dwin'          : '{1} ganhou {2} pontos de experiência', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'ddwin'         : 'e levou ${1}', /* {1} will be replaced with a number (Single Duels) */
	'dbwin'         : '{1} recebeu a recompença de ${2}', /* {1} will be replaced with a player name, {2} with a number (Single Duels) */
	'best_hit'      : 'Melhor dano', /* Column in Single Duels tab */
	'best_duel'     : 'Melhor duelo', /* Column in Single Duels tab */
	'worst_hit'     : 'Pior dano', /* Column in Single Duels tab */
	'worst_duel'    : 'Pior duelo', /* Column in Single Duels tab */
	'high_exp'      : 'Experiência mais alta', /* Column in Single Duels tab */
	'high_$$'       : 'Ganhos mais altos', /* Column in Single Duels tab */
	'high_bou'      : 'Recompensa mais alta recebida', /* Column in Single Duels tab */
	'opponent'      : 'Oponente', /* Displayed selecting the order in Settings tab */
	'yes'           : 'Sim', /* Displayed updating the script */
	'no'            : 'Não', /* Displayed updating the script */
	'update'        : 'Atualizar?', /* Displayed updating the script */
	'latest_v'      : "A última versão é ", /* Will be followed by a version number */
	'current_v'     : "Sua versão é ", /* Will be followed by a version number */
	'webpage'       : 'Página da web', /* Link to the script website */
	'credit_upd'    : '{subj} ligeiramente modificado por {nome}', /* {subj} will be replaced with a string like "Script Updater [SOM]", {name} with "Narulez" */
	'exp_nsel'      : 'Selecionar um recorde', /* Displayed in Export tab */
	'exp_data'      : 'Exportar dados', /* Displayed in Export tab */
	'only_name'     : 'Apenas nomes', /* Displayed in Export tab */
	'name_score'    : 'Nomes e pontuações', /* Displayed in Export tab */
	'ctrl_c'        : 'Ctrl + C para copiar', /* Displayed in Export tab */
	'thanks'        : 'Obrigado', /* Displayed in About tab */
	'team'          : '{1} Equipe', /* Displayed in About tab. {1} will be replaced with the team name */
	'thanks2'	    : "{1} e {2}", /* Displayed in About tab. {1} and {2} will be replaced with two names */
	'thankguys'     : "{1} Rapazes", /* Displayed in About tab. {1} will be replaced with the team name */
	'tidea'         : 'para a idéia.', /* Displayed in About tab */
	'tidb'          : 'para o método de armazenamento de cache IndexedDB.', /* Displayed in About tab */
	'tupder'        : 'para o original script de atualização no jogo.', /* Displayed in About tab */
	'IndexedDB_tiw' : 'Você precisa ativar IndexedDB para ver ranking de fortes', /* Displayed in Forts Highscores tab until it will be avaiable */
	'IndexedDB_tip' : 'Você precisa ativar IndexedDB para ver ranking de fortes', /* Displayed in Forts Highscores tab if IndexedDB is not activated */
	'Ind_info'      : 'Informações de Compatibilidade', /* Link to IndexedDB compatibility infos */
	'IDB_not_supp'  : 'IndexedDB não é suportado pelo seu navegador.', /* Displayed in Forts Highscores tab if IndexedDB is not supported by the user's browser */
	'IndexedDB_nsp' : 'não é suportado', /* Displayed in Settings tab if IndexedDB is not supported by the user's browser */
};