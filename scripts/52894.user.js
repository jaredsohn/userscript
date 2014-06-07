// --------------------------------------------------------------------
//
// Hello User!
//
// If you are seeing this text, it means you don't yet meet the requirements for this tool.
//
// You must be running the Firefox browser, which you can get here: http://www.getfirefox.com
//
// Then you must be running the Greasemonkey add-on for Firefox, which you can get here: http://www.greasespot.net/
//
// Once you've got both of those prerequisites, restart Firefox and try clicking the "Install" link again.
//
// To find out what this tool is all about, visit its homepage at http://gamertoolz.com/mybrute/mybrutemanager/
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           La Brute Manager
// @version        0.5g.2
// @namespace      http://www.gamertoolz.com
// @description    A suite of extra options for playing La Brute
// @include        http://*.labrute.fr/cellule*
// @include        http://*.labrute.fr/arene*
// @include        http://*.labrute.fr/vs*
// @include        http://*.labrute.fr/fight*
// @include        http://*gamertoolz.com/mybrute/mybrutemanager/configurez.php*
// @copyright      Copyright (c) 2009 GamerToolz.com
// @maintainer     Tool Meister
// ==/UserScript==

// ==ChangeLog==
// v0.1 - Apr 16, 2009
// - All new Tool Starting features are
// - Controls to move back and forth between your brutes' cells
// - Quick link to add a new brute to your list from its cell
// - Quick link to delete a brute from your list from its cell
//
// v0.2 - Apr 16, 2009
// - Fix: Corrected the positioning of the Control elements around Tournament Rankings
// - Add: Level-Up Progress Percentage on top of the Experience Bar
//
// v0.3 - Apr 19, 2009
// - Change: Changed the add and delete URLs to prevent accidentally adding and deleting brutes
// - Change: Changed the name of the script from "mybrutemanager" to "My Brute Manager"
// - Change: Changed the layout of the code to follow the userscripts format better to more easily maintain updates
//
// v0.3b - Apr 19, 2009
// - Fix: Didn't actually change the code of version 0.3 to show that it was version 0.3
// - Remove: Removed the remoteconfig iframe
//
// v0.3c - Apr 19, 2009
// - Fix: Reduced the experience percentage back to two decimal places
//
// v0.3d - Apr 19, 2009
// - Fix: And added the percentage symbol to the experience percentage
//
// v0.4 - Apr 25, 2009
// - Fix: Prevent from adding a brute if it's already on your list
// - Fix: Got rid of the javascript error when changing the experience bar to include percentage
// - Fix: Overall general code clean-up to make things more efficient and run faster
// - Change: Changed positioning of elements for a more consistant layout and to handle the new features
// - Add: Dropdown list of your brutes for quick access
// - Add: Storing the Levels of your brutes in the list
// - Add: One-click Fighting (Quick Fight) from the cell without having to go to the arena
// - Add: Ability to skip watching the animation of the Quick Fights
// - Add: Manager Works in Arena as well as in the cell now
// - Add: "CELL" link on Opponents List in the arena to view an opponents cell
// - Add: Remember which of your brutes was the last active brute (for use in below the "ATK" link)
// - Add: "ATK" link in the Cell of non-managed brutes to attack an opponent from their cell
// - Add: Configration Website to configure the manager.  Options you can configure follow:
// - Config: Show or Hide the Dropdown list
// - Config: Show or Hide the Controller Buttons
// - Config: Show or Hide a Quick Fight Button
// - Config: Watch or Skip a Quick Fight's Animation
// - Config: Manage the Arena or Leave the Arena Alone
// - Config: Sort your brutes by Name, by Level, or manually
// - Config: Add or Delete brutes to your list without having to visit each brute's cell
//
// v0.4a - Apr 27, 2009
// -Fix: Prevent Javascript errors on "Brutal Error" or "Technical Maintanence" Pages
// -Fix: Prevent Erasing levels on "Brutal Error" or "Technical Maintanence" Pages
// -Fix: Prevent Erasing Brute list on a double loading the page of "ADD" links due to "Brutal Error" or "Technical Maintanence" Pages
//
// v0.4b - Apr 27, 2009
// -Change: Hide the dropdown list, the controller, and the "ATK" button when you don't have any managed brutes yet.
//
// v0.4c - May 6th, 2009
// -Fix: Catch and fix error when brutes and brute-levels are not in sync
//
// v0.5 - May 8th, 2009
// - Fix: Error when deleting brute from your list, they still showed up on the drop down list on the cell of the deleted brute
// - Fix: Error where levels of brutes got shifted when deleting a brute from your list
// - Fix: When no known 'last active brute' is available, defaults the 'last active brute' to the first managed brute
// - Fix: Erratic results when brutes had semicolon's in their name
// - Change: Changed layout again to incorporate all the new features and give the added elements a snazzier look
// - Change: Drop down now uses real names of brutes, instead of just their URL names
// - Change: Changed the large "CFG" button, to a smaller "Config & Brute Summary" link
// - Change: Tooltip pop-up on controller buttons now gives brute names instead of "First, Previous, Next, Last"
// - Change: Changed the ADD, DEL, and ATK buttons so the whole icon is clickable
// - Change: Replaced the small anchor text from the ADD, DEL, and ATK buttons with descriptive pop-up tooltips
// - Change: Changed the icon of the Attack button
// - Change: Replace the controller with a link to go to last active brute's cell when in a non-managed brute's cell
// - Remove: Erroneous buttons from the Arena Controls
// - Add: Version variable so you can tell what version your on.
// - Add: Ability to auto-register in the tournament
// - Add: Collecting your brutes' Level-Up Percentage, Victories, number of pupils, and Tournament Rankings
// - Add: An Enemy List to keep track of your, well, enemies
// - Add: An Enemy-Add button on non-managed brute's cells to add them to your enemy list
// - Add: An Enemy-Delete button on enemy brutes' cells to make-nice with them (delete them from your enemy list)
// - Add: A dropdown list of your enemies (with configurable behaviour when selecting an enemy)
// - Add: Ability to have Quick Fight go after your enemies first, then if no valid enemy, grab a random opponent
// - Add: Ability to see name of a Quick Fight Opponent before initiating the battle
// - Add: Ability to have Cell pop-up links in the arena
// - Config: Give your brutes custom aliases
// - Config: Now you can see and sort your brutes by experience points, victories, Tournament Rankings, or aliases
// - Config: Show or hide name of Quick Fight Opponent
// - Config: Turn on or off auto-registering in the tournament
// - Config: Turn on or off the enemy management features
// - Config: Pick behaviour of the enemy list: Go to enemy's cell, Go to attacking enemy, or Quick Fight enemy
// - Config: Organize and edit your enemy list
// - Config: Option to have Quick Fight search for an enemy first
// - Config: Show or hide additional pop-up links on the top of the arena for the listed opponents' cells
//
// v0.5a - May 8th, 2009
// - Change: Changed the default settings for the new features
//
// v0.5b - May 12th, 2009
// - Fix: Changed the code marking Quick Fights for slightly better response and to try to deal with multiple mybrute.com tabs/windows
// - Add: 'Try Again' Link when quick fight fails on a 'brutal error' page
//
// v0.5c - May 12th, 2009
// - Fix: Typo with variable defaults
// - Fix: Code Error preventing all quick fights
//
// v0.5d - May 17th, 2009
// - Fix: Enemy dropdown behaviour when in managed cell but not logged in
// - Fix: Enemy dropdown behaviour in arena when set to quick fight
// - Fix: First Quick Fight of each brute erratically not being skipped
// - Change: Better arena management which changes the behaviour of the six opponents' preview panes
// - Change: In the arena, Click-to-attack has been reduced to just their picture instead of the whole preview pane
// - Change: Cell link color in the arena
// - Change: Quick Fights are loaded up almost completely different and are now much faster
// - Add: Arena option, Mouse-over an arena opponent pane can preview their bonuses and Victories
// - Add: Arena option, Cell link in opponent panes can pop-up into a new window (much better than the old banner option)
// - Add: Arena option, Add/Remove Enemies button in the opponent panes
// - Add: Auto-collect and save mybrute battlenumbers for faster quick fights
// - Add: Ability to Auto-retry to find opponent's when Quick Fight fails on a 'brutal error' page
// - Add: Quick Fight tries to pre-load 3(or 6 for new brutes) opponent's to make loading the quick fights faster
// - Add: Quick Fights can try to find lower level brutes (both random and from enemy list)
// - Add: Ability to auto-nav to next brute after final quick fight
// - Add: Enemy levels are now updated on their vs pages
// - Add: Catch 'brutal errors' and 'technical maintanence' pages to prevent 
// - Add: The check for empty Config Variables only happens once per version now (rather than everytime on everypage)
// - Add: Announcement when fresh install of when upgrading to a new version
// - Config: Arena option, Cell link can pop-up into a new window or the same current window
// - Config: Arena option, Add/Remove Enemies button can pop-up into a new window or the same current window
// - Config: Arena option, Turn on or off the Bonus Preview
// - Config: Customize how quick fight chooses the levels of opponents (both random and from enemy list)
// - Config: Customize all the new arena management options
// - Config: Customize the number Quick Fight auto-retries and Bonus Preview auto-retries
// - Config: Turn on or off Auto-Navigating to the next brute after current brute finishes last quick fight

// - v0.5e - May 19th, 2009
// - Fix: Newly Added Brutes Tried to fight previous brutes pre-loaded enemies
// - Fix: Prevent Stuck Quick Fights when gaining pupils or other brutes attack you in the middle of quick fighting
// - Fix: Prevent Stuck Quick Fights when helper brute arena auto-forwards to cell page
// - Fix: Several javascript math errors, concatenating strings instead of resolving equations
// - Add: Arena searching of brutes of varying levels now better matches enemy searching of varying levels
// - Add: Level-Up triggers reloading quick fight opponents
// - Add: Ability to Fight Level 0 Brutes
// - Add: Auto-Login brutes when using them to find quick fight enemies (Requires Firefox saved passwords)
// - Add: Brutal Error automatic retry setting
// - Config: Number of times to auto-retry on brutal error pages
//
// - v0.5f - May 20th, 2009
// - Fix: Error preventing manager from showing up on non-managed brutes pages
// - Change: The wording of the Quick Fight dialog to make it more understandable
//
// - v0.5g - May 21st, 2009
// - Fix: Tightened up some various quick fight code trying to get it more stable
// - Fix: Caught 'undefined' opponent and force to have to reload opponents
// - Fix: Enemy Dropdown behaviour when set to "vs" but not logged in or no remaining fights
// - Fix: Quick Fight fails when adding your very first brute
// - Fix: Error in vs frame when page failed to load and attempting to auto-retry
// - Fix: Improved catching Level-Up to force reloading opponents
// - Fix: Error with false 'brutal error' reporting causing several unneeded page reloads
// - Fix: Searching Varying Levels not grabbing enemies that qualify
// - Add: Language Notes and variables to make porting over to elbruto.es and labrute.fr easier
//
// ==/ChangeLog==

var version='0.5g';
var init05g = GM_getValue('init05g',0);
var url=window.location.href;
var site='unknown'; var page='unknown';
//var brutesite='mybrute.com'; //English mybrute.com 
//var brutesite='elbruto.es'; //EspaÃ±ola elbruto.es 
var brutesite='labrute.fr'; //FranÃ§aise labrute.fr
//var configpage='configure'; //English mybrute.com 
//var configpage='elconfig'; //EspaÃ±ola elbruto.es 
var configpage='configurez'; //FranÃ§aise labrute.fr
if(url.indexOf('.'+brutesite+'/cellule')>=0){	site=brutesite; page='cellule';}
else if(url.indexOf('.'+brutesite+'/arene')>=0){ site=brutesite; page='arene';}
else if(url.indexOf('.'+brutesite+'/vs/')>=0){ site=brutesite; page='vs';}
else if(url.indexOf('.'+brutesite+'/fight')>=0){ site=brutesite; page='fight';}
else if(url.indexOf('.'+brutesite+'/login')>=0){ site=brutesite; page='login';}
else if(url.indexOf('gamertoolz.com/mybrute/mybrutemanager/'+configpage+'.php')>=0){ site='gamertoolz'; page=configpage;}

var config_show_dropdown	= GM_getValue('config_show_dropdown',false);
var config_show_controller	= GM_getValue('config_show_controller',false);
var config_auto_register	= GM_getValue('config_auto_register',false);
var config_brutal_retries	= GM_getValue('config_brutal_retries',false);

var config_arch_enemies		= GM_getValue('config_arch_enemies',false);
var config_enemy_action		= GM_getValue('config_enemy_action',false);

var config_show_quick_fight	= GM_getValue('config_show_quick_fight',false);
var config_quick_fight_level_min=GM_getValue('config_quick_fight_level_min',false);
var config_quick_fight_level_max=GM_getValue('config_quick_fight_level_max',false);
var config_skip_quick_fight	= GM_getValue('config_skip_quick_fight',false);
var config_name_quick_fight	= GM_getValue('config_name_quick_fight',false);
var config_quick_fight_enemies= GM_getValue('config_quick_fight_enemies',false);
var config_quick_fight_retries= GM_getValue('config_quick_fight_retries',false);
var config_quick_nav= GM_getValue('config_quick_nav',false);

var config_manage_arena		= GM_getValue('config_manage_arena',false);
var config_arena_cell_target= GM_getValue('config_arena_cell_target',false);
var config_arena_enemy_target=GM_getValue('config_arena_enemy_target',false);
var config_arena_bonus_preview=GM_getValue('config_arena_bonus_preview',false);
var config_arena_bonus_retries=GM_getValue('config_arena_bonus_retries',false);

var config_brutes			= GM_getValue('config_brutes',false);
var config_brute_aliases	= GM_getValue('config_brute_aliases',false);
var config_brute_levels		= GM_getValue('config_brute_levels',false);
var config_brute_percents	= GM_getValue('config_brute_percents',false);
var config_brute_victories	= GM_getValue('config_brute_victories',false);
var config_brute_pupils		= GM_getValue('config_brute_pupils',false);
var config_brute_ranks		= GM_getValue('config_brute_ranks',false);
var config_brute_ranknums	= GM_getValue('config_brute_ranknums',false);
var config_brute_battles	= GM_getValue('config_brute_battles',false);

var config_enemies			= GM_getValue('config_enemies',false);
var config_enemy_levels		= GM_getValue('config_enemy_levels',false);

var active_current_brute	= GM_getValue('active_current_brute','');
var active_quick_fight_loaded=GM_getValue('active_quick_fight_loaded',0);
var active_just_battled		= GM_getValue('active_just_battled',0);
var active_next_battle		= GM_getValue('active_next_battle',0);
var active_brutal_retry		= GM_getValue('active_brutal_retry',0);
var active_quick_fight_retry= GM_getValue('active_quick_fight_retry',0);
var active_bonus_preview_retry= GM_getValue('active_bonus_preview_retry',0);
var active_preload_enemies	= GM_getValue('active_preload_enemies',0);
var active_helper_brute		= GM_getValue('active_helper_brute','');
var active_helper_level		= GM_getValue('active_helper_level',-1);
var active_preload_enemy=new Array();
	active_preload_enemy[1]	=GM_getValue('active_preload_enemy_1','');
	active_preload_enemy[2]	=GM_getValue('active_preload_enemy_2','');
	active_preload_enemy[3]	=GM_getValue('active_preload_enemy_3','');
	active_preload_enemy[4]	=GM_getValue('active_preload_enemy_4','');
	active_preload_enemy[5]	=GM_getValue('active_preload_enemy_5','');
	active_preload_enemy[6]	=GM_getValue('active_preload_enemy_6','');
var active_preload_enemy_level=new Array();
	active_preload_enemy_level[1]	=GM_getValue('active_preload_enemy_level_1',-1);
	active_preload_enemy_level[2]	=GM_getValue('active_preload_enemy_level_2',-1);
	active_preload_enemy_level[3]	=GM_getValue('active_preload_enemy_level_3',-1);
	active_preload_enemy_level[4]	=GM_getValue('active_preload_enemy_level_4',-1);
	active_preload_enemy_level[5]	=GM_getValue('active_preload_enemy_level_5',-1);
	active_preload_enemy_level[6]	=GM_getValue('active_preload_enemy_level_6',-1);
	
if(init05g!=1){
	if(!config_show_dropdown)	{ config_show_dropdown=1;	GM_setValue('config_show_dropdown', 1); }
	if(!config_show_controller)	{ config_show_controller=0;	GM_setValue('config_show_controller', 0); }
	if(!config_auto_register)	{ config_auto_register=0;	GM_setValue('config_auto_register', 0); }
	if(!config_brutal_retries)	{ config_brutal_retries=0;	GM_setValue('config_brutal_retries', 0); }

	if(!config_arch_enemies)	{ config_arch_enemies=1;	GM_setValue('config_arch_enemies', 1); }
	if(!config_enemy_action)	{ config_enemy_action='cell';GM_setValue('config_enemy_action', 'cell'); }

	if(!config_show_quick_fight){ config_show_quick_fight=1;GM_setValue('config_show_quick_fight', 1); }
	if(!config_quick_fight_level_min){ config_quick_fight_level_min=0;GM_setValue('config_quick_fight_level_min', 0); }
	if(!config_quick_fight_level_max){ config_quick_fight_level_max=0;GM_setValue('config_quick_fight_level_max', 0); }
	if(!config_skip_quick_fight){ config_skip_quick_fight=1;GM_setValue('config_skip_quick_fight', 1); }
	if(!config_name_quick_fight){ config_name_quick_fight=1;GM_setValue('config_name_quick_fight', 1); }
	if(!config_quick_fight_enemies)	{ config_quick_fight_enemies=0;	GM_setValue('config_quick_fight_enemies', 0); }
	if(!config_quick_fight_retries)	{ config_quick_fight_retries=0;	GM_setValue('config_quick_fight_retries', 0); }
	if(!config_quick_nav)	{ config_quick_nav=0;	GM_setValue('config_quick_nav', 0); }

	if(!config_manage_arena)	{ config_manage_arena=1;	GM_setValue('config_manage_arena', 1); }
	if(!config_arena_cell_target)	{ config_arena_cell_target='_blank';	GM_setValue('config_arena_cell_target', '_blank'); }
	if(!config_arena_enemy_target)	{ config_arena_enemy_target='_blank';	GM_setValue('config_arena_enemy_target', '_blank'); }
	if(!config_arena_bonus_preview)	{ config_arena_bonus_preview=1;	GM_setValue('config_arena_bonus_preview', 1); }
	if(!config_arena_bonus_retries)	{ config_arena_bonus_retries=0;	GM_setValue('config_arena_bonus_retries', 0); }

	GM_setValue('init05g',1);
	//English mybrute.com 
	//alert('My Brute Manager version 0.5g installed!\r\n\r\nThe manager has been loaded with the default settings for any new options.\r\nThe defaults may or may not fit your individual needs.\r\n\r\nTo the top right of the manager is a link called "Config & Brute Summary"\r\nClick that link to see what is new and customize My Brute manager to fit your needs.\r\n\r\nEnjoy My Brute Manager!');
	//EspaÃ±ola elbruto.es 
	//alert('Â¡El Bruto Manager versiÃ³n 0.5g instalado!\r\n\r\nScript cargado con configuraciones por defecto para todas las opciones nuevas.\r\nPuede que no sea lo que necesitas.\r\n\r\nArriba a la derecha de el script hay un link llamado "Lista de Brutos y Conf"\r\nHaz click en el link para ver lo nuevo y configurar El Bruto Manager segÃºn tus necesidades.\r\n\r\nÂ¡Disfruta de El Bruto Manager!');
	//FranÃ§aise labrute.fr
	alert('La version 0.5g d\'La Brute Manager a installÃ© !\r\n\r\nLe directeur a Ã©tÃ© chargÃ© avec les arrangements de dÃ©faut pour toutes les nouvelles options.\r\nLes dÃ©fauts peuvent ou peuvent ne pas adapter vos diffÃ©rents besoins.\r\n\r\nVers la droite supÃ©rieure du directeur est un lien appelÃ© le "Config & RÃ©sumÃ© Brute"\r\nCliquez sur ce lien pour voir ce qu\'il y a de neuf et pour adapter l\'La Brute Manager aux besoins du client pour adapter vos besoins.\r\n\r\nApprÃ©ciez l\'La Brute Manager !');
}

var managed=false;
var arched=false;
var i=0;
var brutenum=0;
var enemynum=0;
var numbrutes=0;
var numenemies=0;
var pagesuccess=true;
var brutalerror=false;
var readytofight=false;
var forcereload=false;

//English mybrute.com 
//EspaÃ±ola elbruto.es 
//FranÃ§aise labrute.fr
if(site==brutesite)	{
	var n=document.getElementsByTagName('h1');
	if (n[0]){
		//English mybrute.com 'A brutal error has been encountered!' 'Technical maintenance'
		//EspaÃ±ola elbruto.es  'Ha ocurrido un error... Â¡brutal!'    'Mantenimiento en curso...'
		//FranÃ§aise labrute.fr                                     'Maintenance technique en cours...'
		if(n[0].innerHTML=='????' || n[0].innerHTML=='Maintenance technique en cours...'){
			pagesuccess=false;
			if(n[0].innerHTML=='????'){
				brutalerror=true;
			}
		}
	}
	if(pagesuccess){
		var thisbrute=url.substr(7,url.indexOf(brutesite)-8);
		if(config_brutes && config_brutes!=''){
			var brutes=config_brutes.split(";");
			numbrutes=brutes.length;
			if(config_brute_levels) { var brutelevels=config_brute_levels.split(";"); var numlevels=brutelevels.length; }
				else { var brutelevels=new Array(); var numlevels=0;}
			if(config_brute_aliases) { var brutealiases=config_brute_aliases.split(";"); var numaliases=brutealiases.length; }
				else { var brutealiases=new Array(); var numaliases=0;}
			if(config_brute_battles) { var brutebattles=config_brute_battles.split(";"); var numbattles=brutebattles.length; }
				else { var brutebattles=new Array(); var numbattles=0;}
			for(i=0;i<numbrutes;i++){
				if(brutes[i]==thisbrute){
					managed=true;
					brutenum=i;
				}
			}
		}
		if(config_arch_enemies==1 && config_enemies && config_enemies!=''){
			var enemies=config_enemies.split(";");
			numenemies=enemies.length;
			if(config_enemy_levels) { var enemylevels=config_enemy_levels.split(";"); var numenemylevels=enemylevels.length; }
				else { var enemylevels=new Array(); var numenemylevels=0;}
			for(i=0;i<numenemies;i++){
				if(enemies[i]==thisbrute){
					arched=true;
					enemynum=i;
				}
			}
		}
	}
}

if(page=='cellule' && self==top && pagesuccess){

	var command=url.substr(url.length-4,4);
	var thisname=' ';
	var thislevel='?';
	var thispercent='0';
	var thisvictory='0';
	var thispupil='0';
	var thisrank='N.A';
	var thisranknum='0';
	var thisbattlegain=0;
	var cell_fights=0;

	if(managed || arched || command=='?add' || command=='?ead'){
		//var n=document.getElementsByTagName('h1');
		if(n) { var thisname=n[0].innerHTML;
			//English mybrute.com  's cell'
			//if(thisname.substr(thisname.length-6,6)=='s cell')
			//	thisname=thisname.substr(0,thisname.length-7);
			//EspaÃ±ola elbruto.es <h1>Celda de xxxx</h1>
			//if(thisname.substr(0,9)=='Celda de ')
			//	thisname=thisname.substr(9,thisname.length-9);
			//FranÃ§aise labrute.fr <h1>Cellule de </h1>
			if(thisname.substr(0,11)=='Cellule de ')
				thisname=thisname.substr(11,thisname.length-11);

			//English mybrute.com  'A brutal error has been encountered!' 'Technical maintenance'
			//EspaÃ±ola elbruto.es   'Ha ocurrido un error... Â¡brutal!'   'Mantenimiento en curso...'
			//FranÃ§aise labrute.fr                                     Maintenance technique en cours...
			if(thisname=='????' || thisname=='Maintenance technique en cours...')
				thisname=' ';
			thisname=thisname.replace(/;/g,' ');
		}
		var cell_t=document.getElementsByClassName('level');
			if(cell_t[0]){ var cell_s = cell_t[0].getElementsByTagName('span');
				if(cell_s[0]){ var cell_d=cell_s[0];
					if(cell_d){ var cell_leveltext=cell_d.innerHTML.split(" ");
						if(cell_leveltext[1]) thislevel=cell_leveltext[1];
					}
				}
			}
		var lb=document.getElementsByClassName('levelBar');
			if(lb[0]){	var lbw = lb[0].style.width;


				if(lbw){
					thispercent=lbw.substr(0,lbw.length-1);
				}
			}
		var vs=document.getElementsByClassName('value');
		if(vs.length>2){
			thisvictory=vs[0].innerHTML;
			thispupil=vs[1].innerHTML.substr(16,(vs[1].innerHTML.length-4-16));
			var rankv=vs.length-1;
			var rankstart=vs[rankv].innerHTML.indexOf('?r=');
			var rankend=vs[rankv].innerHTML.indexOf('">');
			if(rankstart>0){
				thisrank=vs[rankv].innerHTML.substr(rankstart+3, rankend-rankstart-3);
				thisranknum=vs[rankv].innerHTML.substr(rankend+2, vs[rankv].innerHTML.length - rankend -6);
			}
			
			
		}
		//English mybrute.com  9,1
		//EspaÃ±ola elbruto.es  10,1
		//FranÃ§aise labrute.fr 12,1
		var cell_f =document.getElementsByClassName('areneInfos');
		if(cell_f[0]) cell_fights=parseInt(cell_f[0].innerHTML.substr(12,1));
		if(isNaN(cell_fights)) cell_fights=0;

		if(active_just_battled==1 && parseInt(active_next_battle)>0){
			if(parseInt(active_next_battle)!=cell_fights) {
				var ld=document.getElementsByClassName('ldetails');
				var news='';
				var battlegain='';
				if(ld[0]){
					news=ld[0].innerHTML;
					//English mybrute.com  'experience'
					//EspaÃ±ola elbruto.es  'puntos'
					//FranÃ§aise labrute.fr 'point'
					battlegain=news.substring(news.indexOf('point')-1,1);
					if(!isNaN(parseInt(battlegain))){
						thisbattlegain=battlegain;
						readytofight=true;
					}
					else{
						forcereload=true;
					}
				}
			}
			else{
				 forcereload=true;
			}
		}
	}
	if(managed || command=='?add' || forcereload){
				if(GM_getValue('active_current_brute','')!=thisbrute || command=='?add' || forcereload){
					GM_setValue('active_quick_fight_retry',config_quick_fight_retries);
					GM_setValue('active_brutal_retry',config_brutal_retries);
					GM_setValue('active_preload_enemy_1','');
					GM_setValue('active_preload_enemy_2','');
					GM_setValue('active_preload_enemy_3','');
					GM_setValue('active_preload_enemy_4','');
					GM_setValue('active_preload_enemy_5','');
					GM_setValue('active_preload_enemy_6','');
					GM_setValue('active_preload_enemy_level_1',-1);
					GM_setValue('active_preload_enemy_level_2',-1);
					GM_setValue('active_preload_enemy_level_3',-1);
					GM_setValue('active_preload_enemy_level_4',-1);
					GM_setValue('active_preload_enemy_level_5',-1);
					GM_setValue('active_preload_enemy_level_6',-1);
					GM_setValue('active_preload_enemies',1);
					GM_setValue('active_helper_brute','');
					GM_setValue('active_helper_level',-1);
					GM_setValue('active_current_brute',thisbrute);
					GM_setValue('active_quick_fight_loaded',0);
					GM_setValue('active_just_battled',0);
					GM_setValue('active_next_battle',0);
					
					active_quick_fight_retry=config_quick_fight_retries;
					active_preload_enemy[1]	='';
					active_preload_enemy[2]	='';
					active_preload_enemy[3]	='';
					active_preload_enemy[4]	='';
					active_preload_enemy[5]	='';
					active_preload_enemy[6]	='';
					active_preload_enemy_level[1]=-1;
					active_preload_enemy_level[2]=-1;
					active_preload_enemy_level[3]=-1;
					active_preload_enemy_level[4]=-1;
					active_preload_enemy_level[5]=-1;
					active_preload_enemy_level[6]=-1;
					active_preload_enemies=1;
					active_helper_brute='';
					active_helper_level=-1;
					active_quick_fight_loaded=0;
					active_just_battled=0;
					active_next_battle=0;
					
				}
				else{
					GM_setValue('active_preload_enemies',0);
				}
	}

	GM_setValue('active_quick_fight_loaded',0);
	GM_setValue('active_just_battled',0);
	GM_setValue('active_next_battle',cell_fights);
	active_quick_fight_loaded=0;
	active_just_battled=0;
	active_next_battle=cell_fights;

	if(managed || command=='?add'){
		if(config_brute_percents) { var brutepercents=config_brute_percents.split(";"); var numpercents=brutepercents.length; }
			else { var brutepercents=new Array(); var numpercents=0;}
		if(config_brute_victories) { var brutevictories=config_brute_victories.split(";"); var numvictories=brutevictories.length; }
			else { var brutevictories=new Array(); var numvictories=0;}
		if(config_brute_pupils) { var brutepupils=config_brute_pupils.split(";"); var numpupils=brutepupils.length; }
			else { var brutepupils=new Array(); var numpupils=0;}
		if(config_brute_ranks) { var bruteranks=config_brute_ranks.split(";"); var numranks=bruteranks.length; }
			else { var bruteranks=new Array(); var numranks=0;}
		if(config_brute_ranknums) { var bruteranknums=config_brute_ranknums.split(";"); var numranknums=bruteranknums.length; }
			else { var bruteranknums=new Array(); var numranknums=0;}

		config_brute_aliases='';
		config_brute_levels='';
		config_brute_percents='';
		config_brute_victories='';
		config_brute_pupils='';
		config_brute_ranks='';
		config_brute_ranknums='';
		config_brute_battles='';
			for(i=0;i<numbrutes;i++){
				if(brutes[i]==thisbrute){
					if(thisname!=' ' && i<numaliases && brutealiases[i]==' ') { brutealiases[i]=thisname; }
					if(thislevel!='?') { brutelevels[i]=thislevel; }
					if(thispercent!='0') { brutepercents[i]=thispercent; }
					if(thisvictory!='0') { brutevictories[i]=thisvictory; }
					if(thispupil!='0') { brutepupils[i]=thispupil; }
					if(thisrank!='N.A') { bruteranks[i]=thisrank; }
					if(thisranknum!='---') { bruteranknums[i]=thisranknum; }
					if(thisbattlegain>0) { brutebattles[i]=(parseInt(brutebattles[i])+parseInt(thisbattlegain)); }
				}
				else if(config_show_quick_fight==1 && parseInt(config_quick_fight_level_min)>0 && parseInt(brutelevels[i])<parseInt(thislevel) && parseInt(brutelevels[i])>=(parseInt(thislevel)-parseInt(config_quick_fight_level_min))){
					if(active_helper_brute=='' || parseInt(active_helper_level)>parseInt(brutelevels[i])) {						
						GM_setValue('active_helper_brute',brutes[i]);
						GM_setValue('active_helper_level',parseInt(brutelevels[i]));
						active_helper_brute=brutes[i];
						active_helper_level=parseInt(brutelevels[i]);
					}
				}

				if(i<numaliases) config_brute_aliases=config_brute_aliases+';'+brutealiases[i];
					else {brutealiases[i]=' '; config_brute_aliases=config_brute_aliases+';'+' '; }
				if(i<numlevels) config_brute_levels=config_brute_levels+';'+brutelevels[i];
					else {brutelevels[i]='?'; config_brute_levels=config_brute_levels+';'+'?'; }
				if(i<numpercents) config_brute_percents=config_brute_percents+';'+brutepercents[i];
					else {brutepercents[i]='0'; config_brute_percents=config_brute_percents+';'+'0'; }
				if(i<numvictories) config_brute_victories=config_brute_victories+';'+brutevictories[i];
					else {brutevictories[i]='0'; config_brute_victories=config_brute_victories+';'+'0'; }
				if(i<numpupils) config_brute_pupils=config_brute_pupils+';'+brutepupils[i];
					else {brutepupils[i]='0'; config_brute_pupils=config_brute_pupils+';'+'0'; }
				if(i<numranks) config_brute_ranks=config_brute_ranks+';'+bruteranks[i];
					else {bruteranks[i]='N.A'; config_brute_ranks=config_brute_ranks+';'+'N.A'; }
				if(i<numranknums) config_brute_ranknums=config_brute_ranknums+';'+bruteranknums[i];
					else {bruteranknums[i]='0'; config_brute_ranknums=config_brute_ranknums+';'+'0'; }
				if(i<numbattles) config_brute_battles=config_brute_battles+';'+brutebattles[i];
					else {brutebattles[i]='0'; config_brute_battles=config_brute_battles+';'+'0'; }
			}	
			config_brute_aliases=config_brute_aliases.substr(1,config_brute_aliases.length-1);
			config_brute_levels=config_brute_levels.substr(1,config_brute_levels.length-1);
			config_brute_percents=config_brute_percents.substr(1,config_brute_percents.length-1);
			config_brute_victories=config_brute_victories.substr(1,config_brute_victories.length-1);
			config_brute_pupils=config_brute_pupils.substr(1,config_brute_pupils.length-1);
			config_brute_ranks=config_brute_ranks.substr(1,config_brute_ranks.length-1);
			config_brute_ranknums=config_brute_ranknums.substr(1,config_brute_ranknums.length-1);
			config_brute_battles=config_brute_battles.substr(1,config_brute_battles.length-1);

		GM_setValue('config_brute_aliases', config_brute_aliases);
		GM_setValue('config_brute_levels', config_brute_levels);
		GM_setValue('config_brute_percents', config_brute_percents);
		GM_setValue('config_brute_victories', config_brute_victories);
		GM_setValue('config_brute_pupils', config_brute_pupils);
		GM_setValue('config_brute_ranks', config_brute_ranks);
		GM_setValue('config_brute_ranknums', config_brute_ranknums);
		GM_setValue('config_brute_battles', config_brute_battles);
		
	}
	if(config_arch_enemies==1 && arched || command=='?ead'){
		config_enemy_levels='';
			for(i=0;i<numenemies;i++){
				if(enemies[i]==thisbrute){
					if(thislevel!='?') { enemylevels[i]=thislevel; }
				}
				if(i<numenemylevels) config_enemy_levels=config_enemy_levels+';'+enemylevels[i];
					else {enemylevels[i]='?'; config_enemy_levels=config_enemy_levels+';'+'?'; }
			}
		config_enemy_levels=config_enemy_levels.substr(1,config_enemy_levels.length-1);
		GM_setValue('config_enemy_levels', config_enemy_levels);
	}

		if(command=='?add'){
			if(config_brutes && !managed){
				config_brutes=config_brutes+';'+thisbrute;
				config_brute_aliases=config_brute_aliases+';'+thisname;
				config_brute_levels=config_brute_levels+';'+thislevel;
				config_brute_percents=config_brute_percents+';'+thispercent;
				config_brute_victories=config_brute_victories+';'+thisvictory;
				config_brute_pupils=config_brute_pupils+';'+thispupil;
				config_brute_ranks=config_brute_ranks+';'+thisrank;
				config_brute_ranknums=config_brute_ranknums+';'+thisranknum;
				config_brute_battles=config_brute_battles+';'+'0';
				GM_setValue('config_brutes', config_brutes);
				GM_setValue('config_brute_aliases', config_brute_aliases);
				GM_setValue('config_brute_levels', config_brute_levels);
				GM_setValue('config_brute_percents', config_brute_percents);
				GM_setValue('config_brute_victories', config_brute_victories);
				GM_setValue('config_brute_pupils', config_brute_pupils);
				GM_setValue('config_brute_ranks', config_brute_ranks);
				GM_setValue('config_brute_ranknums', config_brute_ranknums);
				GM_setValue('config_brute_battles', config_brute_battles);
				brutes[numbrutes]=thisbrute;
				brutelevels[numbrutes]=thislevel;
				brutealiases[numbrutes]=thisname;
				brutebattles[numbrutes]=0;
				brutenum=numbrutes;
				numbrutes=numbrutes+1;
			}
			else if(!managed){
				config_brutes=thisbrute;
				config_brute_aliases=thisname;
				config_brute_levels=thislevel;
				config_brute_percents=thispercent;
				config_brute_victories=thisvictory;
				config_brute_pupils=thispupil;
				config_brute_ranks=thisrank;
				config_brute_ranknums=thisranknum;
				config_brute_battles='0';
				GM_setValue('config_brutes', config_brutes);
				GM_setValue('config_brute_aliases', config_brute_aliases);
				GM_setValue('config_brute_levels',config_brute_levels);
				GM_setValue('config_brute_percents', config_brute_percents);
				GM_setValue('config_brute_victories', config_brute_victories);
				GM_setValue('config_brute_pupils', config_brute_pupils);
				GM_setValue('config_brute_ranks', config_brute_ranks);
				GM_setValue('config_brute_ranknums', config_brute_ranknums);
				GM_setValue('config_brute_battles', config_brute_battles);
				var brutes=new Array();
				brutes[0]=thisbrute;
				var brutelevels=new Array();
				brutelevels[0]=thislevel;
				var brutealiases=new Array();
				brutealiases[0]=thisname;
				var brutebattles = new Array();
				brutebattles[0]=0;
				numbrutes=1;
				brutenum=0;
			}
			managed=true;
			GM_setValue('active_current_brute',thisbrute);
		}
		else if(command=='?del'){
			if(config_brutes && managed){
				config_brutes='';
				config_brute_aliases='';
				config_brute_levels='';
				config_brute_percents='';
				config_brute_victories='';
				config_brute_pupils='';
				config_brute_ranks='';
				config_brute_ranknums='';
				config_brute_battles='';
				for(i=0;i<numbrutes;i++){
					if(brutes[i]!=thisbrute){
						config_brutes=config_brutes+';'+brutes[i];
						config_brute_aliases=config_brute_aliases+';'+brutealiases[i];
						config_brute_levels=config_brute_levels+';'+brutelevels[i];
						config_brute_percents=config_brute_percents+';'+brutepercents[i];
						config_brute_victories=config_brute_victories+';'+brutevictories[i];
						config_brute_pupils=config_brute_pupils+';'+brutepupils[i];
						config_brute_ranks=config_brute_ranks+';'+bruteranks[i];
						config_brute_ranknums=config_brute_ranknums+';'+bruteranknums[i];
						config_brute_battles=config_brute_battles+';'+brutebattles[i];
					}
				}
				if(config_brutes==''){
					GM_deleteValue('config_brutes');
					GM_deleteValue('config_brute_aliases');
					GM_deleteValue('config_brute_levels');
					GM_deleteValue('config_brute_percents');
					GM_deleteValue('config_brute_victories');
					GM_deleteValue('config_brute_pupils');
					GM_deleteValue('config_brute_ranks');
					GM_deleteValue('config_brute_ranknums');
					GM_deleteValue('config_brute_battles');
					config_brutes=false;
				}
				else {
					config_brutes=config_brutes.substr(1,config_brutes.length-1);
					config_brute_aliases=config_brute_aliases.substr(1,config_brute_aliases.length-1);
					config_brute_levels=config_brute_levels.substr(1,config_brute_levels.length-1);
					config_brute_percents=config_brute_percents.substr(1,config_brute_percents.length-1);
					config_brute_victories=config_brute_victories.substr(1,config_brute_victories.length-1);
					config_brute_pupils=config_brute_pupils.substr(1,config_brute_pupils.length-1);
					config_brute_ranks=config_brute_ranks.substr(1,config_brute_ranks.length-1);
					config_brute_ranknums=config_brute_ranknums.substr(1,config_brute_ranknums.length-1);
					config_brute_battles=config_brute_battles.substr(1,config_brute_battles.length-1);
					GM_setValue('config_brutes',config_brutes);
					GM_setValue('config_brute_aliases', config_brute_aliases);
					GM_setValue('config_brute_levels', config_brute_levels);
					GM_setValue('config_brute_percents', config_brute_percents);
					GM_setValue('config_brute_victories', config_brute_victories);
					GM_setValue('config_brute_pupils', config_brute_pupils);
					GM_setValue('config_brute_ranks', config_brute_ranks);
					GM_setValue('config_brute_ranknums', config_brute_ranknums);
					GM_setValue('config_brute_battles', config_brute_battles);
					
					
					brutes=config_brutes.split(";");
					brutealiases=config_brute_aliases.split(";");
					brutelevels=config_brute_levels.split(";");
					brutepercents=config_brute_percents.split(";");
					brutevictories=config_brute_victories.split(";");
					brutepupils=config_brute_pupils.split(";");
					bruteranks=config_brute_ranks.split(";");
					bruteranknums=config_brute_ranknums.split(";");
					brutebattles=config_brute_battles.split(";");
					
					
					
				}
				managed=false;
				numbrutes=numbrutes-1;
				if(numbrutes>0) GM_setValue('active_current_brute',brutes[0]);
				else GM_setValue('active_current_brute','');
			}
		}
		else if(config_arch_enemies==1 && command=='?ead'){
			if(config_enemies && !arched){
				config_enemies=config_enemies+';'+thisbrute;
				config_enemy_levels=config_enemy_levels+';'+thislevel;

				GM_setValue('config_enemies', config_enemies);
				GM_setValue('config_enemy_levels', config_enemy_levels);

				enemies[numenemies]=thisbrute;
				enemylevels[numenemies]=thislevel;

				enemynum=numenemies;
				numenemies=numenemies+1;
			}
			else if(!arched){
				config_enemies=thisbrute;
				config_enemy_levels=thislevel;

				GM_setValue('config_enemies', config_enemies);
				GM_setValue('config_enemy_levels', config_enemy_levels);

				var enemies=new Array();
				enemies[0]=thisbrute;
				var enemylevels=new Array();
				enemylevels[0]=thislevel;
				numenemies=1;
				enemynum=0;
			}
			arched=true;
		}
		else if(config_arch_enemies==1 && command=='?ede'){
			if(config_enemies && arched){
				config_enemies='';
				config_enemy_levels='';
				for(i=0;i<numenemies;i++){
					if(enemies[i]!=thisbrute){
						config_enemies=config_enemies+';'+enemies[i];
						config_enemy_levels=config_enemy_levels+';'+enemylevels[i];
					}
				}
				if(config_enemies==''){
					GM_deleteValue('config_enemies');
					GM_deleteValue('config_enemy_levels');
					config_enemies=false;
				}
				else {
					config_enemies=config_enemies.substr(1,config_enemies.length-1);
					config_enemy_levels=config_enemy_levels.substr(1,config_enemy_levels.length-1);
					GM_setValue('config_enemies',config_enemies);
					GM_setValue('config_enemy_levels', config_enemy_levels);
					enemies=config_enemies.split(";");
					enemylevels=config_enemy_levels.split(";");
				}
				arched=false;
				numenemies=numenemies-1;
			}
		}



if(config_quick_nav==1 && readytofight && cell_fights==0 && brutenum<numbrutes-1){
	//English mybrute.com  'experience'
	//EspaÃ±ola elbruto.es  'puntos'
	//FranÃ§aise labrute.fr 'point'
	location.href='http://'+brutes[brutenum+1]+'.'+brutesite+'/cellule';
}

	//English mybrute.com  My Brute Manager - Config & Brute Summary
	//EspaÃ±ola elbruto.es El Bruto Manager - Lista de Brutos y Conf
	//FranÃ§aise labrute.fr La Brute Manager - Config & RÃ©sumÃ© Brute
	var topbar='<table width="250" border="0" cellspacing="0" cellpadding="0"><tr><td height="13" colspan="2"><div id="mbmtopbar" style="font-size:x-small; background-color:#996633; width:250px; height:13px; color:#FFFFFF"><a href="http://www.gamertoolz.com/mybrute/mybrutemanager/" target="gamertoolz" style="text-decoration:none;font-size:x-small;color:#FFFFFF;">La Brute Manager v'+version+'</a> | <a href="http://www.gamertoolz.com/mybrute/mybrutemanager/'+configpage+'.php" style="text-decoration:none;font-size:x-small;color:#FFFFFF;">Config & RÃ©sumÃ© Brute</a></div></td></tr>';
	var menu='<td width="110" align="right" valign="top"><div id="mbmmenu">';
	//English mybrute.com  "Remove '+thisbrute+' from your brute list"
	//EspaÃ±ola elbruto.es "Quitar '+thisbrute+' de Mis Brutos"
	//FranÃ§aise labrute.fr "Enlevez '+thisbrute+' de votre liste brute"
	var menudel='<div id="mbmdel" style="width:35px;height:35px;background-image:url(http://data.'+brutesite+'/img/log_lose.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right;cursor:pointer;" onclick="window.open(\'http://'+thisbrute+'.'+brutesite+'/cellule/?del\',\'_self\')" title="Enlevez '+thisbrute+' de votre liste brute"></div>';
	//English mybrute.com  "Add '+thisbrute+' to your brute list"
	//EspaÃ±ola elbruto.es "AÃ±adir '+thisbrute+' a Mis Brutos"
	//FranÃ§aise labrute.fr "Ajoutez '+thisbrute+' Ã  votre liste brute"
	var menuadd='<div id="mbmadd" style="width:35px;height:35px;background-image:url(http://data.'+brutesite+'/img/log_win.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right;cursor:pointer;" onclick="window.open(\'http://'+thisbrute+'.'+brutesite+'/cellule/?add\',\'_self\')" title="Ajoutez '+thisbrute+' Ã  votre liste brute"></div>';
	//English mybrute.com  "Attack '+thisbrute+' with '+GM_getValue('active_current_brute','')+'"
	//EspaÃ±ola elbruto.es "Atacar a '+thisbrute+' con '+GM_getValue('active_current_brute','')+'"
	//FranÃ§aise labrute.fr "Attaque '+thisbrute+' avec l\''+GM_getValue('active_current_brute','')+'"
	var menuattack='<div id="mbmatk" style="width:35px;height:35px;background-image:url(http://data.'+brutesite+'/img/lvl_3.gif);background-position:-1px -1px;background-repeat:no-repeat;text-align:center;vertical-align:bottom;float:right;cursor:pointer;" onclick="window.open(\'http://'+active_current_brute+'.'+brutesite+'/vs/'+thisbrute+'\',\'_self\')" title="Attaque '+thisbrute+' avec l\' '+GM_getValue('active_current_brute','')+'"></div>';
	//English mybrute.com  "Add '+thisbrute+' to your list of enemies"
	//EspaÃ±ola elbruto.es "AÃ±adir '+thisbrute+' a Mis Enemigos"
	//FranÃ§aise labrute.fr "Ajoutez '+thisbrute+' Ã  votre liste d\'ennemis"
	var menuenemyadd='<div id="mbmnmeadd" style="width:35px;height:35px;background-image:url(http://data.'+brutesite+'/img/lvl_2.gif);background-position:-1px -1px;background-repeat:no-repeat;text-align:center;vertical-align:bottom;float:right;cursor:pointer;" onclick="window.open(\'http://'+thisbrute+'.'+brutesite+'/cellule/?ead\',\'_self\')" title="Ajoutez '+thisbrute+' Ã  votre liste d\'ennemis"></div>';
	//English mybrute.com  "Remove '+thisbrute+' from your list of enemies"
	//EspaÃ±ola elbruto.es "Quitar '+thisbrute+' de mi Mis Enemigos"
	//FranÃ§aise labrute.fr "Enlevez '+thisbrute+' de votre liste d\'ennemis"
	var menuenemydel='<div id="mbmnmeadd" style="width:35px;height:35px;background-image:url(http://data.'+brutesite+'/img/log_child.gif);background-position:-5px -5px;background-repeat:no-repeat;text-align:center;vertical-align:bottom;float:right;cursor:pointer;" onclick="window.open(\'http://'+thisbrute+'.'+brutesite+'/cellule/?ede\',\'_self\')" title="Enlevez '+thisbrute+' de votre liste d\'ennemis"></div>';
	if(managed) menu=menu+menudel;
	else if(arched) menu=menu+menuenemydel;
	else if(config_arch_enemies!=1) menu=menu+menuadd;
	else menu=menu+menuadd+menuenemyadd;
	if(page=='cellule' && !managed && active_current_brute!='' && numbrutes>0) menu=menu+menuattack;
	menu=menu+'</div></td>';
	
	var register='';
	if(managed)	register='<iframe src="http://'+thisbrute+'.'+brutesite+'/sub" width="1" height="1" style="display:none;"></iframe>';
	
	var quickfight='';
	
	if(managed && config_show_quick_fight==1 && cell_fights>0){
		var quick_opp='';
		var quick_level='';
		var qfcount=0;
		var qfenemies=new Array();
		var qflevels=new Array();
		var battleframesrc='';
		var battlebutton='';
		var oppname='';
		qfenemies[0]='';		
		qfenemies[1]='';		
		qfenemies[2]='';
		qfenemies[3]='';
		qfenemies[4]='';
		qfenemies[5]='';
		qfenemies[6]='';
		active_preload_enemies=1;
		for(j=1;j<=cell_fights;j++){
			active_preload_enemy[j]	=GM_getValue('active_preload_enemy_'+j,'');
			if(active_preload_enemy[j]!='') { active_preload_enemies=0; }
		}
		if(config_arch_enemies==1 && config_quick_fight_enemies==1 && numenemies>0 && active_preload_enemies==1){
			for(j=(parseInt(thislevel)-parseInt(config_quick_fight_level_min));j<=(parseInt(thislevel)+parseInt(config_quick_fight_level_max)) && qfcount<cell_fights;j++){
					for(i=0;i<numenemies && qfcount<cell_fights;i++){
						if(parseInt(enemylevels[i])==j){
							qfenemies[qfcount]=enemies[i];
							qflevels[qfcount]=parseInt(enemylevels[i]);
							qfcount++;
						}
					}
			}
			// [cell_fight-j] == reverse
			for(j=0;j<cell_fights;j++){
				if(qfenemies[j]!=''){
					GM_setValue('active_preload_enemy_'+(j+1),qfenemies[j]);
					GM_setValue('active_preload_enemy_level_'+(j+1),qflevels[j]);
					active_preload_enemy[j+1]=qfenemies[j];
					active_preload_enemy_level[j+1]=qflevels[j];
				}
			}
		}
			if(brutebattles[brutenum]>0 && active_preload_enemy[cell_fights]!='' && active_preload_enemy[cell_fights].length>1){
				quick_opp=active_preload_enemy[cell_fights];
				quick_level=active_preload_enemy_level[cell_fights];
			}
		if(quick_opp!='' && quick_opp.length>1){
			if(readytofight){
				//English mybrute.com  Attack
				//EspaÃ±ola elbruto.es Atacar a
				//FranÃ§aise labrute.fr Attaque
				if(config_name_quick_fight==1) oppname='Attaque '+quick_opp+'('+quick_level+')<br />';
				GM_setValue('active_quick_fight_loaded',1);
				//English mybrute.com  v=14
				//battlebutton='<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=14" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;u=/fight/&amp;d='+quick_opp+'&amp;b=http://data.'+brutesite+'/img/en/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/en/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+brutebattles[brutenum]+'" scale="noscale" width="212" height="66">';
				//EspaÃ±ola elbruto.es v=15
				//battlebutton='<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=15" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;lang=es&amp;u=/fight/&amp;d='+quick_opp+'&amp;b=http://data.'+brutesite+'/img/es/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/es/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+brutebattles[brutenum]+'" scale="noscale" width="212" height="66">';
				//FranÃ§aise labrute.fr
				battlebutton='<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=15" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;u=/fight/&amp;d='+quick_opp+'&amp;b=http://data.'+brutesite+'/img/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+brutebattles[brutenum]+'" scale="noscale" width="212" height="66">';

			}
			else{
				battleframesrc='http://'+thisbrute+'.'+brutesite+'/vs/'+quick_opp;
				//English mybrute.com  'Grabbing '+quick_opp+'('+quick_level+') ...'
				//EspaÃ±ola elbruto.es 'Tomando '+quick_opp+'('+quick_level+') ...'
				//FranÃ§aise labrute.fr ''+quick_opp+'('+quick_level+') de saisie ...'
				battlebutton=''+quick_opp+'('+quick_level+') de saisie  ...';
			}
		}
		else{
			//English mybrute.com  Complicated Grammar, will address later
			//EspaÃ±ola elbruto.es Complicated Grammar, will address later
			//FranÃ§aise labrute.fr Complicated Grammar, will address later
			var arenalookupbrute=thisbrute;
			if(active_helper_brute!='') {
				arenalookupbrute=active_helper_brute;
				quick_level='de nivel mayor que '+active_helper_level;
			}
			battleframesrc='http://'+arenalookupbrute+'.'+brutesite+'/arene';
			battlebutton='';
			if(qfcount>0){
				//battlebutton='Found '+qfcount+' enemies, searching for '+(cell_fights-qfcount)+' random opponent(s) '+quick_level+'';
				battlebutton=''+qfcount+' enemies, encontrados, buscando '+(cell_fights-qfcount)+' mÃ¡s oponentes al azar '+quick_level+'';
			}
			else{
				battlebutton='Buscando '+cell_fights+' oponentes al azar '+quick_level+'';
			}
		}
		
		quickfight='<tr><td colspan="2" align="center">'+oppname+'<iframe src="'+battleframesrc+'" width="1" height="1" style="display:none;" id="battleframe"></iframe><div class="vsLaunch">'+battlebutton+'</div></td></tr>';
	}
	var controls='<div id="mbmcontrols" style="font-size: medium; text-align: center; float: left;">';
	var dropdown='';
	if(numbrutes>0){
		//English mybrute.com Your Brutes
		//EspaÃ±ola elbruto.es Sus Bruses
		//FranÃ§aise labrute.fr Vos Brutes
		dropdown='<form id="bruteform" name="bruteform" method="post" action="">	<select name="brutechooser" style="width: 125px;" onchange="javascript:var brute=0; brute=document.bruteform.brutechooser.options[document.bruteform.brutechooser.selectedIndex].value; if(brute!=0){ location.href=\'http://\'+brute+\'.'+brutesite+'/'+page+'/\'; }">    <option value="0">Vos Brutes</option>';
		var alias=' ';
		for(i=0;i<numbrutes;i++){
			if(brutealiases[i]!=' ') alias=brutealiases[i];
				else alias=brutes[i];
			dropdown=dropdown+'<option value="'+brutes[i]+'">'+alias+' ('+brutelevels[i]+')</option>';
		}
		dropdown=dropdown+'</select></form>';
	}
	
	var enemydropdown='';
	if(config_arch_enemies==1 && numenemies>0){
		var enemyaction='location.href=\'http://\'+enemy+\'.'+brutesite+'/cellule/\';';
		if(managed && config_enemy_action=='vs' && cell_fights>0) enemyaction='location.href=\'http://'+thisbrute+'.'+brutesite+'/vs/\'+enemy+\'\';';
		else if(managed && config_enemy_action=='quickfight' && config_show_quick_fight==1 && cell_fights>0)
		//English mybrute.com Looking for
		//EspaÃ±ola elbruto.es Buscando a
		//FranÃ§aise labrute.fr Recherche de
		enemyaction='var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Recherche de \'+enemy+\'...\'; var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/vs/\'+enemy+\'\';';
		//English mybrute.com Your Enemies
		//EspaÃ±ola elbruto.es Mis Enemigos
		//FranÃ§aise labrute.fr Vos Ennemis
		enemydropdown='<form id="enemyform" name="enemyform" method="post" action="">	<select name="enemychooser" style="width: 125px;" onchange="javascript:var enemy=0; enemy=document.enemyform.enemychooser.options[document.enemyform.enemychooser.selectedIndex].value; if(enemy!=0){ '+enemyaction+' }">    <option value="0">Vos Ennemis</option>';
		for(i=0;i<numenemies;i++){
			enemydropdown=enemydropdown+'<option value="'+enemies[i]+'">'+enemies[i]+' ('+enemylevels[i]+')</option>';
		}
		enemydropdown=enemydropdown+'</select></form>';
	}
	
	var controller='';
	if(managed && numbrutes>0){
		controller=controller+'<img id="controls" src="http://www.gamertoolz.com/mybrute/images/media.png" usemap="#controlmap" border="0" /><map id="_controlmap" name="controlmap">';
		if(brutenum>0) controller=controller+'<area shape="rect" coords="1,1,28,24" href="http://'+brutes[0]+'.'+brutesite+'/'+page+'" alt="'+brutes[0]+'" title="'+brutes[0]+'" /><area shape="rect" coords="30,1,56,24" href="http://'+brutes[brutenum-1]+'.'+brutesite+'/'+page+'" alt="'+brutes[brutenum-1]+'" title="'+brutes[brutenum-1]+'" />';
		if(brutenum<numbrutes-1) controller=controller+'<area shape="rect" coords="57,1,83,24" href="http://'+brutes[brutenum+1]+'.'+brutesite+'/'+page+'" alt="'+brutes[brutenum+1]+'" title="'+brutes[brutenum+1]+'" /><area shape="rect" coords="84,1,110,24" href="http://'+brutes[numbrutes-1]+'.'+brutesite+'/'+page+'" alt="'+brutes[numbrutes-1]+'" title="'+brutes[numbrutes-1]+'" />';
	controller=controller+'</map>';
	}
	else if(numbrutes>0){
		//English mybrute.com Back to '+GM_getValue('active_current_brute','')+'\'s Cell
		//EspaÃ±ola elbruto.es Volver a la celda de '+GM_getValue('active_current_brute','')+'
		//FranÃ§aise labrute.fr De nouveau Ã  la cellule de '+GM_getValue('active_current_brute','')+'
		controller=controller+'<a href="http://'+GM_getValue('active_current_brute','')+'.'+brutesite+'/cellule" style="font-size:small;">De nouveau Ã  la cellule de '+GM_getValue('active_current_brute','')+'</a>';
	}
	if(config_show_dropdown==1) controls=controls+dropdown;
	if(config_arch_enemies==1) controls=controls+enemydropdown;
	if(config_show_controller==1) controls=controls+controller;
	controls=controls+'</div>';



	var cell_t=document.getElementsByClassName('level');
	var cell_cell=document.getElementsByClassName('caracs');
	var cell_r = cell_t[0].getElementsByTagName('div');
	var cell_s = cell_t[0].getElementsByTagName('span');
	var cell_c=cell_r[3];
	var cell_e=cell_r[1];
	var cell_pindex=cell_t[0].innerHTML.indexOf('style="width: ');
	var cell_lindex=cell_t[0].innerHTML.indexOf(' class="levelBar"');
	var percent=parseFloat(cell_t[0].innerHTML.substr(cell_pindex+14, cell_lindex-cell_pindex-16)).toFixed(2);
	var cell_d=cell_s[0];
	var cell_leveltext=cell_d.innerHTML.split(" ");
	var thislevel=cell_leveltext[1];
	
	cell_e.style.height='15px';
	cell_r[2].style.height='14px'
	cell_e.innerHTML='<div style="position: relative; left: 2px; top: 7px;font-size:small;color:#339933;z-index:1;vertical-align:bottom;text-decoration:none;">'+percent+'%</div>'+cell_e.innerHTML;

	if(cell_fights<0 || config_auto_register!=1) register='';
	if(cell_fights<1) quickfight='';
	cell_t[0].innerHTML='<div id="mbm" style="border: thin solid #996633;">'+topbar+'<tr><td width="140" align="center" valign="top">'+controls+register+'</td>'+menu+'</tr>'+quickfight+'</table></div>'+cell_t[0].innerHTML;

}

else if(page=='arene' && self==top && config_manage_arena==1 && pagesuccess){
	GM_setValue('active_quick_fight_loaded',0);
	GM_setValue('active_just_battled',0);
	GM_setValue('active_bonus_preview_retry',config_arena_bonus_retries);
	var thisbrute=url.substr(7,url.indexOf(brutesite)-8);
	var i=0;
	var managed=false;
	var brutenum=0;
	var t=document.getElementsByClassName('areneLeft');
	var r = t[0].getElementsByTagName('div');
	var s = t[0].getElementsByTagName('span');
	var c=r[2];
	var e=r[4];
	var pindex=t[0].innerHTML.indexOf('style="width: ');
	var lindex=t[0].innerHTML.indexOf(' class="levelBar"');
	var percent=parseFloat(t[0].innerHTML.substr(pindex+14, lindex-pindex-16)).toFixed(2);
	var d=s[0];
	var leveltext=d.innerHTML.split(" ");
	var thislevel=leveltext[1];

	var lineup=document.getElementsByClassName('areneCenter');
	var rightcol=document.getElementsByClassName('areneRight');
	var m=document.getElementsByClassName('miniCaracs');
	var o=document.getElementsByClassName('swf');

	var celllink='';
	var cellbanner='';
	var enemybutton='';
	var arenaopps=new Array();

	//English mybrute.com 
	//rightcol[0].innerHTML='<div>Welcome to the Arena!</div><div>Here is a selection of opponents of your level. Choose one and let\'s start the fight!</div>';
	//EspaÃ±ola elbruto.es 
	//rightcol[0].innerHTML='<div>Â¡Bienvenido a la Arena!</div><div>AquÃ­ tienes una selecciÃ³n de adversarios de tu nivel. Elige uno, Â¡y que empiece el combate!</div>';
	//FranÃ§aise labrute.fr 
	rightcol[0].innerHTML='<div>Bienvenue dans l\'arÃ¨ne !</div><div>J\'ai sÃ©lectionnÃ© quelques adversaire Ã  ta taille. Choisis-en un, et on commence le combat !</div>';
		for(i=0;i<m.length;i++){
			var mc=m[i].getElementsByTagName('div');
			var mc_content=mc[4];
			var opp=o[i+1].id.substr(10,o[i+1].id.length);
			arenaopps[i]=opp;

			celllink='<div id="celllink'+opp+'" style="width:25px;height:15px;background-color:#000000;background-position:-5px -30px;text-align:center;vertical-align:middle;float:right;overflow:hidden;font-size:x-small;color:#FF99FF;"  onclick="window.open(\'http://'+opp+'.'+brutesite+'/cellule\',\''+config_arena_cell_target+'\'); return false;">CELL</div>';
			m[i].removeAttribute("onclick");
			m[i].removeAttribute("onmouseover");
			m[i].removeAttribute("onmouseout");

			if(config_arena_bonus_preview==1){
			   var hoveraction="";
				for(j=1;j<=6;j++) {
					if(j!=i+1) hoveraction=hoveraction+"document.getElementById('opp"+j+"preview').style.display='none';";
					else hoveraction=hoveraction+"document.getElementById('opp"+j+"preview').style.display='';";
				}
				m[i].setAttribute("onmouseover",hoveraction);
				rightcol[0].innerHTML=rightcol[0].innerHTML+'<div id="opp'+(i+1)+'preview" style="background-color:#FAF8C3;width:217px;height:420px; border: 0px; padding: 0px; margin: 0px;overflow:hidden; display:none;"><iframe id="opp'+(i+1)+'cellframe" src="http://'+opp+'.'+brutesite+'/cellule" style="width:217px;height:420px;" scrolling="no" frameborder="0" marginwidth="0" marginheight="0" allowtransparency="true"></iframe></div>';
				if(config_arch_enemies==1){
					//English mybrute.com  "Add '+opp+' to your list of enemies"
					//EspaÃ±ola elbruto.es "AÃ±adir '+opp+' a Mis Enemigos"
					//FranÃ§aise labrute.fr "Ajoutez '+opp+' Ã  votre liste d\'ennemis"
					enemybutton='<div id="mbmnmearena'+(i+1)+'" style="width:25px;height:15px;background-color:#FF0000;text-align:center;vertical-align:middle;float:right;overflow:hidden;font-size:xx-small;color:#000000;" onclick="window.open(\'http://'+opp+'.'+brutesite+'/cellule/?ead\',\''+config_arena_enemy_target+'\'); return false;" title="Ajoutez '+opp+' Ã  votre liste d\'ennemis">ARCH</div>';
               	}

				mc_content.innerHTML=celllink+enemybutton+mc_content.innerHTML;
			}else{
			celllink='<div id="celllink" style="width:35px;height:15px;background-image:url(http://data.'+brutesite+'/img/log_childup.gif);background-position:-5px -30px;text-align:center;vertical-align:middle;float:right;"><a href="http://'+opp+'.'+brutesite+'/cellule" style="text-decoration:none;font-size:small;color:#FF0000;">CELL</a></div>';
			cellbanner=cellbanner+'<a href="http://'+opp+'.'+brutesite+'/cellule" style="font-size:small;color:#FFFFFF;" target="cellpop'+opp+'">'+opp+'</a> | ';
			}

			celllink='';
		}

	var controls='<div id="mbmcontrols" style="font-size: medium; text-align: center; float: left;">';
	var dropdown='';
	if(numbrutes>0){
		//English mybrute.com Your Brutes
		//EspaÃ±ola elbruto.es Mis Brutos
		//FranÃ§aise labrute.fr Vos Brutes
		dropdown='<form id="bruteform" name="bruteform" method="post" action="">	<select name="brutechooser" style="width: 125px;" onchange="javascript:var brute=0; brute=document.bruteform.brutechooser.options[document.bruteform.brutechooser.selectedIndex].value; if(brute!=0){ location.href=\'http://\'+brute+\'.'+brutesite+'/'+page+'/\'; }">    <option value="0">Vos Brutes</option>';
		var alias=' ';
		for(i=0;i<numbrutes;i++){
			if(brutealiases[i]!=' ') alias=brutealiases[i];
				else alias=brutes[i];
			dropdown=dropdown+'<option value="'+brutes[i]+'">'+alias+' ('+brutelevels[i]+')</option>';
		}
		dropdown=dropdown+'</select></form>';
	}
	
	var enemydropdown='';
	enemybutton='';
	if(config_arch_enemies==1 && numenemies>0){
		var enemyaction='location.href=\'http://\'+enemy+\'.'+brutesite+'/cellule/\';';
		if(managed && config_enemy_action=='vs') enemyaction='location.href=\'http://'+thisbrute+'.'+brutesite+'/vs/\'+enemy+\'\';';
		//English mybrute.com Your Enemies
		//EspaÃ±ola elbruto.es Mis Enemigos
		//FranÃ§aise labrute.fr Vos Ennemis
		enemydropdown='<form id="enemyform" name="enemyform" method="post" action="">	<select name="enemychooser" style="width: 125px;" onchange="javascript:var enemy=0; enemy=document.enemyform.enemychooser.options[document.enemyform.enemychooser.selectedIndex].value; if(enemy!=0){ '+enemyaction+' }">    <option value="0">Vos Ennemis</option>';
		for(i=0;i<numenemies;i++){
			enemydropdown=enemydropdown+'<option value="'+enemies[i]+'">'+enemies[i]+' ('+enemylevels[i]+')</option>';
			if(config_arch_enemies==1){
				for(j=1;j<=6;j++){
					if(enemies[i]==arenaopps[j]){
						var thebutton=document.getElementById('mbmnmearena'+(i+1));
                		thebutton.style.backgroundColor='#33FF66';
		                thebutton.setAttribute("onclick","window.open('http://"+opp+"."+brutesite+"/cellule/?ead','_self'); return false;");
        		        thebutton.innerHTML="PEACE";
						//English mybrute.com  "Remove "+opp+" from your list of enemies"
						//EspaÃ±ola elbruto.es "Quitar "+opp+" de mi Mis Enemigos"
						//FranÃ§aise labrute.fr "Enlevez "+opp+" de votre liste d\'ennemis"
                		thebutton.setAttribute("title","Enlevez "+opp+" de votre liste d\'ennemis");
				
					}
				}
			}
		}
		enemydropdown=enemydropdown+'</select></form>';
	}
	
	var controller='';
		controller=controller+'<img id="controls" src="http://www.gamertoolz.com/mybrute/images/media.png" usemap="#controlmap" border="0" /><map id="_controlmap" name="controlmap">';
		if(brutenum>0) controller=controller+'<area shape="rect" coords="1,1,28,24" href="http://'+brutes[0]+'.'+brutesite+'/'+page+'" alt="'+brutes[0]+'" title="'+brutes[0]+'" /><area shape="rect" coords="30,1,56,24" href="http://'+brutes[brutenum-1]+'.'+brutesite+'/'+page+'" alt="'+brutes[brutenum-1]+'" title="'+brutes[brutenum-1]+'" />';
		if(brutenum<numbrutes-1) controller=controller+'<area shape="rect" coords="57,1,83,24" href="http://'+brutes[brutenum+1]+'.'+brutesite+'/'+page+'" alt="'+brutes[brutenum+1]+'" title="'+brutes[brutenum+1]+'" /><area shape="rect" coords="84,1,110,24" href="http://'+brutes[numbrutes-1]+'.'+brutesite+'/'+page+'" alt="'+brutes[numbrutes-1]+'" title="'+brutes[numbrutes-1]+'" />';
	controller=controller+'</map>';
	if(config_show_dropdown==1) controls=controls+dropdown;
	if(config_arch_enemies==1) controls=controls+enemydropdown;
	if(config_show_controller==1) controls=controls+controller;
	controls=controls+'</div>';



	e.style.height='15px';
	r[5].style.height='14px'
	e.innerHTML='<div style="position: relative; left: 2px; top: 7px; font-size: small; color: #339933; z-index: 1; vertical-align: bottom; text-decoration: none;">'+percent+'%</div>'+e.innerHTML;
	t[0].innerHTML=controls+t[0].innerHTML;
}
else if(page=='arene' && self!=top && config_show_quick_fight==1){
	GM_setValue('active_quick_fight_loaded',0);
	GM_setValue('active_just_battled',0);
	var loggedin=true;
	var loginform = document.getElementsByTagName('form');
	if(loginform[0]){
		var password= loginform[0].elements[1];
		if(password){
			if(password.name=='pass'){
				if(password.value.length>0){
					loggedin=false;
					loginform[0].submit();
				}
			}
		}
	}
	if(loggedin){
	var ql=false;
		if(GM_getValue('active_current_brute','')==thisbrute){
				ql=parent.document.getElementsByClassName('vsLaunch');
		}
		if(pagesuccess){
			var cell_t=document.getElementsByClassName('level');
			if(cell_t[0]){
				var cell_s = cell_t[0].getElementsByTagName('span');
				if(cell_s[0]){
					var cell_d=cell_s[0];
					if(cell_d){
						var cell_leveltext=cell_d.innerHTML.split(" ");
						if(cell_leveltext[1]) thislevel=cell_leveltext[1];
					}
				}
			}

			var thisbrute=url.substr(7,url.indexOf(brutesite)-8);
			var thislevel=0;
			var o=document.getElementsByClassName('swf');
			var cell_t=document.getElementsByClassName('xpContainer');
			if(cell_t[0]){ var cell_s = cell_t[0].getElementsByTagName('span');
				if(cell_s[0]){ var cell_d=cell_s[0];
					if(cell_d){ var cell_leveltext=cell_d.innerHTML.split(" ");
						if(cell_leveltext[1]) thislevel=cell_leveltext[1];
					}
				}
			}
			
			active_preload_enemies=1;
			var eachopp='';
			if(typeof(o) != "undefined" && o.length>6 && active_preload_enemies==1){
				for(var i=1;i<=6;i++){
					eachopp='';
					if(o[i].id.substr(0,10)=='swf_brute_'){
						eachopp=o[i].id.substr(10,o[i].id.length-10);
						if(eachopp.length>1 && GM_getValue('active_preload_enemy_'+i,'')==''){
							GM_setValue('active_preload_enemy_'+i,eachopp);
							GM_setValue('active_preload_enemy_level_'+i,thislevel);
						}
					}
				}
			}
			else if(typeof(o) != "undefined" && o[1]){
				if(o[1].id.substr(0,10)=='swf_brute_'){
					eachopp=o[1].id.substr(10,o[1].id.length-10);
					if(eachopp.length>1 && GM_getValue('active_preload_enemy_6','')==''){
						GM_setValue('active_preload_enemy_6',eachopp);
						GM_setValue('active_preload_enemy_level_6',thislevel);
					}
				}
			}
			else{
				pagesuccess=false;
			}
			var readyopp=GM_getValue('active_preload_enemy_6','');
			if(typeof(readyopp) != "undefined" && readyopp!='' && readyopp.length>1){
				location.href='http://'+GM_getValue('active_current_brute',thisbrute)+'.'+brutesite+'/vs/'+readyopp+'';
			}
			else{
				pagesuccess=false;
			}
		}
		if(!pagesuccess){
			active_quick_fight_retry= GM_getValue('active_quick_fight_retry',0);
			if(active_quick_fight_retry>0){
				GM_setValue('active_quick_fight_retry',(active_quick_fight_retry-1));
				location.href='http://'+thisbrute+'.'+brutesite+'/arene';
				if(ql[0]){
					//English mybrute.com  'Unable to Find An Opponent<br />Trying again...'
					//EspaÃ±ola elbruto.es  'No se pudo encontrar a nadie<br />probando de nuevo...'
					//FranÃ§aise labrute.fr 'Incapable de trouver un adversaire<br />Essai encore...'
					ql[0].innerHTML='Incapable de trouver un adversaire<br />Essai encore...';
				}
			}
			else if(ql[0]){
				//English mybrute.com
				//ql[0].innerHTML='Unable to Find An Opponent<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Looking for a random Opponent...\';">Try another random brute</a>';
				//EspaÃ±ola elbruto.es 
				//ql[0].innerHTML='No se pudo encontrar a nadie<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Buscando un oponente al azar...\';">Prueba otro bruto al azar</a>';
				//FranÃ§aise labrute.fr 
				ql[0].innerHTML='Incapable de trouver un adversaire<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Recherche d\'un adversaire alÃ©atoire...\';">Jugez une autre brute alÃ©atoire</a>';
			}
			else {
				location.href='http://'+GM_getValue('active_current_brute',thisbrute)+'.'+brutesite+'/arene';
			}
		}
	}
}
else if(page=='vs' && self!=top && config_show_quick_fight==1){
	GM_setValue('active_quick_fight_loaded',0);
	GM_setValue('active_just_battled',0);
	var ql=false;
	ql=parent.document.getElementsByClassName('vsLaunch');
	if(pagesuccess){
		var thisbrute=url.substr(7,url.indexOf(brutesite)-8);
		var opp=url.substr(url.indexOf('/vs/')+4,url.length-url.indexOf('/vs/')-4);
		var opplevel=0;
		var sf=document.getElementsByClassName('vsLaunch');
		var levels=false;
		levels=document.getElementsByClassName('level');
		if(levels[1]){ 
			var vs_leveltext=levels[1].innerHTML.split(" ");
			if(vs_leveltext[1]) opplevel=vs_leveltext[1];
			config_enemy_levels='';
			for(i=0;i<numenemies;i++){
				if(enemies[i]==opp){
					enemylevels[i]=opplevel;
				}
				config_enemy_levels=config_enemy_levels+';'+enemylevels[i];
			}
			config_enemy_levels=config_enemy_levels.substr(1,config_enemy_levels.length-1);
			GM_setValue('config_enemy_levels', config_enemy_levels);

		}
		
		if(sf[0] && ql[0]){
			var button=sf[0].getElementsByTagName("script");
			if(button[0]){
				var aindex=button[0].innerHTML.indexOf('&amp;k=');
				var sindex=button[0].innerHTML.indexOf('so.addParam("scale"');
				var attack=button[0].innerHTML.substr(aindex+7,sindex-aindex-11);
				config_brute_battles='';
				for(i=0;i<numbrutes;i++){
					if(brutes[i]==thisbrute){
						brutebattles[i]=attack;
					}
					config_brute_battles=config_brute_battles+';'+brutebattles[i];
				}	
				config_brute_battles=config_brute_battles.substr(1,config_brute_battles.length-1);
				GM_setValue('config_brute_battles', config_brute_battles);



				var oppname='';
				//English mybrute.com  Attack
				//EspaÃ±ola elbruto.es Atacar a 
				//FranÃ§aise labrute.fr Attaque
				if(config_name_quick_fight==1) oppname='Attaque '+opp+'('+opplevel+')<br />';
				GM_setValue('active_quick_fight_loaded',1);
				//English mybrute.com
				//ql[0].innerHTML=oppname+'<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=14" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;u=/fight/&amp;d='+opp+'&amp;b=http://data.'+brutesite+'/img/en/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/en/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+attack+'" scale="noscale" width="212" height="66">';
				//EspaÃ±ola elbruto.es 
				//ql[0].innerHTML=oppname+'<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=15" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;lang=es&amp;u=/fight/&amp;d='+opp+'&amp;b=http://data.'+brutesite+'/img/es/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/es/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+attack+'" scale="noscale" width="212" height="66">';				//FranÃ§aise labrute.fr
				ql[0].innerHTML=oppname+'<embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=15" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.'+brutesite+'/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;u=/fight/&amp;d='+opp+'&amp;b=http://data.'+brutesite+'/img/teasing_submit.gif&amp;o=http://data.'+brutesite+'/img/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+attack+'" scale="noscale" width="212" height="66">';
			}
		}
		else{
			pagesuccess=false;
		}
	}
	if(!pagesuccess && ql[0]){
			active_quick_fight_retry= GM_getValue('active_quick_fight_retry',0);
			if(active_quick_fight_retry>0){
				GM_setValue('active_quick_fight_retry',(active_quick_fight_retry-1));
				location.href='http://'+thisbrute+'.'+brutesite+'/vs/'+opp;
				//English mybrute.com  'No se pudo encontrar a nadie<br />probando de nuevo...'
				//EspaÃ±ola elbruto.es  'Incapaz de encontrar a un opositor<br />El intentar otra vez...'
				//FranÃ§aise labrute.fr 'Incapable de trouver un adversaire<br />Essai encore...'
				ql[0].innerHTML='Incapable de trouver un adversaire<br />Essai encore...';
			}
			else{
				//English mybrute.com  
				//ql[0].innerHTML='Unable to Find An Opponent<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Looking for a random Opponent...\';">Try another random brute</a><br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/vs/'+opp+'\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Looking for '+opp+'...\';">Try '+opp+' again</a>';
				//EspaÃ±ola elbruto.es 
				//ql[0].innerHTML='No se pudo encontrar a nadie<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Buscando un oponente aleatorio...\';">Prueba otro bruto al azar</a><br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/vs/'+opp+'\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Buscando a '+opp+'...\';">Prueba con '+opp+' otra vez</a>';
				//FranÃ§aise labrute.fr 
				ql[0].innerHTML='Incapable de trouver un adversaire<br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/arene\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Recherche d\'un adversaire alÃ©atoire...\';">Jugez une autre brute alÃ©atoire</a><br /><a style="font-size:small;" onclick="javascript:var battleframe=document.getElementById(\'battleframe\'); battleframe.src=\'http://'+thisbrute+'.'+brutesite+'/vs/'+opp+'\'; var battlediv=document.getElementsByClassName(\'vsLaunch\'); battlediv[0].innerHTML=\'Recherche de '+opp+'...\';">Essai '+opp+' encore</a>';
			}
	}
}
else if(page=='vs' && pagesuccess){
	GM_setValue('active_quick_fight_loaded',0);
	GM_setValue('active_just_battled',0);
	var sf=document.getElementsByClassName('vsLaunch');
	if(sf[0]){
		var button=sf[0].getElementsByTagName("script");
		if(button[0]){
			var opp=url.substr(url.indexOf('/vs/')+4,url.length-url.indexOf('/vs/')-4);
			var aindex=button[0].innerHTML.indexOf('&amp;k=');
			var sindex=button[0].innerHTML.indexOf('so.addParam("scale"');
			var attack=button[0].innerHTML.substr(aindex+7,sindex-aindex-11);
			var levels=false;
			levels=document.getElementsByClassName('level');
			if(levels[1]){ 
				var vs_leveltext=levels[1].innerHTML.split(" ");
				if(vs_leveltext[1]) opplevel=vs_leveltext[1];
			}

			config_brute_battles='';
			for(i=0;i<numbrutes;i++){
				if(brutes[i]==thisbrute){
					brutebattles[i]=attack;
				}
				config_brute_battles=config_brute_battles+';'+brutebattles[i];
			}
			config_brute_battles=config_brute_battles.substr(1,config_brute_battles.length-1);
			GM_setValue('config_brute_battles', config_brute_battles);
			
			config_enemy_levels='';
			for(i=0;i<numenemies;i++){
				if(enemies[i]==opp){
					enemylevels[i]=opplevel;
				}
				config_enemy_levels=config_enemy_levels+';'+enemylevels[i];
			}
			config_enemy_levels=config_enemy_levels.substr(1,config_enemy_levels.length-1);
			GM_setValue('config_enemy_levels', config_enemy_levels);
		}
	}
}
else if(page=='fight' && pagesuccess && config_show_quick_fight==1 && config_skip_quick_fight==1 && GM_getValue('active_quick_fight_loaded',0)==1){
	GM_setValue('active_just_battled', 1);		
	location.href='http://'+thisbrute+'.'+brutesite+'/cellule';
}
else if(page==configpage){
	var message='';
	var form = document.forms.namedItem("configform");
	if(form){
		var push_version = form.elements.namedItem("push_version");
			if(push_version) push_version.value=version;

		var push_config_show_dropdown = form.elements.namedItem("push_config_show_dropdown");
			if(push_config_show_dropdown) push_config_show_dropdown.value=config_show_dropdown;
		var push_config_show_controller = form.elements.namedItem("push_config_show_controller");
			if(push_config_show_controller) push_config_show_controller.value=config_show_controller;
		var push_config_auto_register = form.elements.namedItem("push_config_auto_register");
			if(push_config_auto_register) push_config_auto_register.value=config_auto_register;
		var push_config_brutal_retries = form.elements.namedItem("push_config_brutal_retries");
			if(push_config_brutal_retries) push_config_brutal_retries.value=config_brutal_retries;

		var push_config_arch_enemies = form.elements.namedItem("push_config_arch_enemies");
			if(push_config_arch_enemies) push_config_arch_enemies.value=config_arch_enemies;
		var push_config_enemy_action = form.elements.namedItem("push_config_enemy_action");
			if(push_config_enemy_action) push_config_enemy_action.value=config_enemy_action;

		var push_config_show_quick_fight = form.elements.namedItem("push_config_show_quick_fight");
			if(push_config_show_quick_fight) push_config_show_quick_fight.value=config_show_quick_fight;
		var push_config_quick_fight_level_min = form.elements.namedItem("push_config_quick_fight_level_min");
			if(push_config_quick_fight_level_min) push_config_quick_fight_level_min.value=config_quick_fight_level_min;
		var push_config_quick_fight_level_max = form.elements.namedItem("push_config_quick_fight_level_max");
			if(push_config_quick_fight_level_max) push_config_quick_fight_level_max.value=config_quick_fight_level_max;
		var push_config_skip_quick_fight = form.elements.namedItem("push_config_skip_quick_fight");
			if(push_config_skip_quick_fight) push_config_skip_quick_fight.value=config_skip_quick_fight;
		var push_config_name_quick_fight = form.elements.namedItem("push_config_name_quick_fight");
			if(push_config_name_quick_fight) push_config_name_quick_fight.value=config_name_quick_fight;
		var push_config_quick_fight_enemies = form.elements.namedItem("push_config_quick_fight_enemies");
			if(push_config_quick_fight_enemies) push_config_quick_fight_enemies.value=config_quick_fight_enemies;
		var push_config_quick_fight_retries = form.elements.namedItem("push_config_quick_fight_retries");
			if(push_config_quick_fight_retries) push_config_quick_fight_retries.value=config_quick_fight_retries;
		var push_config_quick_nav = form.elements.namedItem("push_config_quick_nav");
			if(push_config_quick_nav) push_config_quick_nav.value=config_quick_nav;

		var push_config_manage_arena = form.elements.namedItem("push_config_manage_arena");
			if(push_config_manage_arena) push_config_manage_arena.value=config_manage_arena;
		//var push_config_arena_banner = form.elements.namedItem("push_config_arena_banner");
			//if(push_config_arena_banner) push_config_arena_banner.value=config_arena_banner;
		var push_config_arena_cell_target = form.elements.namedItem("push_config_arena_cell_target");
			if(push_config_arena_cell_target) push_config_arena_cell_target.value=config_arena_cell_target;
		var push_config_arena_enemy_target = form.elements.namedItem("push_config_arena_enemy_target");
			if(push_config_arena_enemy_target) push_config_arena_enemy_target.value=config_arena_enemy_target;
		var push_config_arena_bonus_preview = form.elements.namedItem("push_config_arena_bonus_preview");
			if(push_config_arena_bonus_preview) push_config_arena_bonus_preview.value=config_arena_bonus_preview;
		var push_config_arena_bonus_retries = form.elements.namedItem("push_config_arena_bonus_retries");
			if(push_config_arena_bonus_retries) push_config_arena_bonus_retries.value=config_arena_bonus_retries;

		var push_config_brutes = form.elements.namedItem("push_config_brutes");
			if(push_config_brutes) push_config_brutes.value=config_brutes;
		var push_config_brute_aliases = form.elements.namedItem("push_config_brute_aliases");
			if(push_config_brute_aliases) push_config_brute_aliases.value=config_brute_aliases;
		var push_config_brute_levels = form.elements.namedItem("push_config_brute_levels");
			if(push_config_brute_levels) push_config_brute_levels.value=config_brute_levels;
		var push_config_brute_percents = form.elements.namedItem("push_config_brute_percents");
			if(push_config_brute_percents) push_config_brute_percents.value=config_brute_percents;
		var push_config_brute_victories = form.elements.namedItem("push_config_brute_victories");
			if(push_config_brute_victories) push_config_brute_victories.value=config_brute_victories;
		var push_config_brute_pupils = form.elements.namedItem("push_config_brute_pupils");
			if(push_config_brute_pupils) push_config_brute_pupils.value=config_brute_pupils;
		var push_config_brute_ranks = form.elements.namedItem("push_config_brute_ranks");
			if(push_config_brute_ranks) push_config_brute_ranks.value=config_brute_ranks;
		var push_config_brute_ranknums = form.elements.namedItem("push_config_brute_ranknums");
			if(push_config_brute_ranknums) push_config_brute_ranknums.value=config_brute_ranknums;

		var push_config_enemies = form.elements.namedItem("push_config_enemies");
			if(push_config_enemies) push_config_enemies.value=config_enemies;
		var push_config_enemy_levels = form.elements.namedItem("push_config_enemy_levels");
			if(push_config_enemy_levels) push_config_enemy_levels.value=config_enemy_levels;

		document.getElementById('loadconfig').style.display='';
	}
	var changes = document.getElementById('mbmchanges');
	if(changes){
		var grab_config_show_dropdown = document.getElementById("grab_config_show_dropdown");
			if(grab_config_show_dropdown) GM_setValue('config_show_dropdown',grab_config_show_dropdown.innerHTML);
		var grab_config_show_controller = document.getElementById("grab_config_show_controller");
			if(grab_config_show_controller) GM_setValue('config_show_controller',grab_config_show_controller.innerHTML);
		var grab_config_auto_register = document.getElementById("grab_config_auto_register");
			if(grab_config_auto_register) GM_setValue('config_auto_register',grab_config_auto_register.innerHTML);
		var grab_config_brutal_retries = document.getElementById("grab_config_brutal_retries");
			if(grab_config_brutal_retries) GM_setValue('config_brutal_retries',grab_config_brutal_retries.innerHTML);

		var grab_config_arch_enemies = document.getElementById("grab_config_arch_enemies");
			if(grab_config_arch_enemies) GM_setValue('config_arch_enemies',grab_config_arch_enemies.innerHTML);
		var grab_config_enemy_action = document.getElementById("grab_config_enemy_action");
			if(grab_config_enemy_action) GM_setValue('config_enemy_action',grab_config_enemy_action.innerHTML);

		var grab_config_show_quick_fight = document.getElementById("grab_config_show_quick_fight");
			if(grab_config_show_quick_fight) GM_setValue('config_show_quick_fight',grab_config_show_quick_fight.innerHTML);
		var grab_config_quick_fight_level_min = document.getElementById("grab_config_quick_fight_level_min");
			if(grab_config_quick_fight_level_min) GM_setValue('config_quick_fight_level_min',grab_config_quick_fight_level_min.innerHTML);
		var grab_config_quick_fight_level_max = document.getElementById("grab_config_quick_fight_level_max");
			if(grab_config_quick_fight_level_max) GM_setValue('config_quick_fight_level_max',grab_config_quick_fight_level_max.innerHTML);
		var grab_config_skip_quick_fight = document.getElementById("grab_config_skip_quick_fight");
			if(grab_config_skip_quick_fight) GM_setValue('config_skip_quick_fight',grab_config_skip_quick_fight.innerHTML);
		var grab_config_name_quick_fight = document.getElementById("grab_config_name_quick_fight");
			if(grab_config_name_quick_fight) GM_setValue('config_name_quick_fight',grab_config_name_quick_fight.innerHTML);
		var grab_config_quick_fight_enemies = document.getElementById("grab_config_quick_fight_enemies");
			if(grab_config_quick_fight_enemies) GM_setValue('config_quick_fight_enemies',grab_config_quick_fight_enemies.innerHTML);
		var grab_config_quick_fight_retries = document.getElementById("grab_config_quick_fight_retries");
			if(grab_config_quick_fight_retries) GM_setValue('config_quick_fight_retries',grab_config_quick_fight_retries.innerHTML);
		var grab_config_quick_nav = document.getElementById("grab_config_quick_nav");
			if(grab_config_quick_nav) GM_setValue('config_quick_nav',grab_config_quick_nav.innerHTML);

		var grab_config_manage_arena = document.getElementById("grab_config_manage_arena");
			if(grab_config_manage_arena) GM_setValue('config_manage_arena',grab_config_manage_arena.innerHTML);
		//var grab_config_arena_banner = document.getElementById("grab_config_arena_banner");
			//if(grab_config_arena_banner) GM_setValue('config_arena_banner',grab_config_arena_banner.innerHTML);
		var grab_config_arena_cell_target = document.getElementById("grab_config_arena_cell_target");
			if(grab_config_arena_cell_target) GM_setValue('config_arena_cell_target',grab_config_arena_cell_target.innerHTML);
		var grab_config_arena_enemy_target = document.getElementById("grab_config_arena_enemy_target");
			if(grab_config_arena_enemy_target) GM_setValue('config_arena_enemy_target',grab_config_arena_enemy_target.innerHTML);
		var grab_config_arena_bonus_preview = document.getElementById("grab_config_arena_bonus_preview");
			if(grab_config_arena_bonus_preview) GM_setValue('config_arena_bonus_preview',grab_config_arena_bonus_preview.innerHTML);
		var grab_config_arena_bonus_retries = document.getElementById("grab_config_arena_bonus_retries");
			if(grab_config_arena_bonus_retries) GM_setValue('config_arena_bonus_retries',grab_config_arena_bonus_retries.innerHTML);
			
		
		var grab_config_brutes = document.getElementById("grab_config_brutes");
			if(grab_config_brutes) GM_setValue('config_brutes',grab_config_brutes.innerHTML);
		var grab_config_brute_aliases = document.getElementById("grab_config_brute_aliases");
			if(grab_config_brute_aliases) GM_setValue('config_brute_aliases',grab_config_brute_aliases.innerHTML);
		var grab_config_brute_levels = document.getElementById("grab_config_brute_levels");
			if(grab_config_brute_levels) GM_setValue('config_brute_levels',grab_config_brute_levels.innerHTML);
		var grab_config_brute_percents = document.getElementById("grab_config_brute_percents");
			if(grab_config_brute_percents) GM_setValue('config_brute_percents',grab_config_brute_percents.innerHTML);
		var grab_config_brute_victories = document.getElementById("grab_config_brute_victories");
			if(grab_config_brute_victories) GM_setValue('config_brute_victories',grab_config_brute_victories.innerHTML);
		var grab_config_brute_pupils = document.getElementById("grab_config_brute_pupils");
			if(grab_config_brute_pupils) GM_setValue('config_brute_pupils',grab_config_brute_pupils.innerHTML);
		var grab_config_brute_ranks = document.getElementById("grab_config_brute_ranks");
			if(grab_config_brute_ranks) GM_setValue('config_brute_ranks',grab_config_brute_ranks.innerHTML);
		var grab_config_brute_ranknums = document.getElementById("grab_config_brute_ranknums");
			if(grab_config_brute_ranknums) GM_setValue('config_brute_ranknums',grab_config_brute_ranknums.innerHTML);

		var grab_config_enemies = document.getElementById("grab_config_enemies");
			if(grab_config_enemies) GM_setValue('config_enemies',grab_config_enemies.innerHTML);
		var grab_config_enemy_levels = document.getElementById("grab_config_enemy_levels");
			if(grab_config_enemy_levels) GM_setValue('config_enemy_levels',grab_config_enemy_levels.innerHTML);
		
		//message='My Brute Manager Has been Succesfully Updated! :)';
		message='Â¡El Bruto Manager se ha actualizado satisfactoriamente! :)';

		var updatestatus = document.getElementById('mbmupdatestatus')
		
		
		if(updatestatus)
			updatestatus.innerHTML=message;
	}
}
else if(page=='cellule' && self!=top){
	if(pagesuccess){
		if(GM_getValue('active_helper_brute','')==thisbrute){
			location.href='http://'+GM_getValue('active_current_brute','')+'.'+brutesite+'/arene';
		}
		var bonuses=document.getElementsByTagName('script');
		if(bonuses[1]){
			var aindex=bonuses[1].innerHTML.indexOf('so.addParam("FlashVars","');
			var sindex=bonuses[1].innerHTML.indexOf('so.addParam(\"scale\"');
			var invid=bonuses[1].innerHTML.substr(aindex+25,sindex-aindex-11);
	
	
			var n=document.getElementsByTagName('h1');
			if(n) { var thisname=n[0].innerHTML;
				//English mybrute.com  's cell'
				//if(thisname.substr(thisname.length-6,6)=='s cell')
				//	thisname=thisname.substr(0,thisname.length-7);
				//EspaÃ±ola elbruto.es <h1>Celda de xxxx</h1>
				//if(thisname.substr(0,9)=='Celda de ')
				//	thisname=thisname.substr(9,thisname.length-9);
				//FranÃ§aise labrute.fr <h1>Cellule de ugobos</h1>
				if(thisname.substr(0,11)=='Cellule de ')
					thisname=thisname.substr(11,thisname.length-11);

				//English mybrute.com  'A brutal error has been encountered!' || thisname=='Technical maintenance'
				//EspaÃ±ola elbruto.es  'Ha ocurrido un error... Â¡brutal!'     'Mantenimiento en curso...'
				//FranÃ§aise labrute.fr                                Maintenance technique en cours...
				if(thisname=='????' || thisname=='Maintenance technique en cours...')
					thisname=' ';
				thisname=thisname.replace(/;/g,' ');
			}

			var thislevel=0;
			var cell_t=document.getElementsByClassName('level');
				if(cell_t[0]){ var cell_s = cell_t[0].getElementsByTagName('span');
					if(cell_s[0]){ var cell_d=cell_s[0];
						if(cell_d){ var cell_leveltext=cell_d.innerHTML.split(" ");
							if(cell_leveltext[1]) thislevel=cell_leveltext[1];
						}
					}
				}
			config_enemy_levels='';
			for(i=0;i<numenemies;i++){
				if(enemies[i]==opp){
					enemylevels[i]=thislevel;
				}
				config_enemy_levels=config_enemy_levels+';'+enemylevels[i];
			}
			config_enemy_levels=config_enemy_levels.substr(1,config_enemy_levels.length-1);
			GM_setValue('config_enemy_levels', config_enemy_levels);

		var thisvictory='?';
		var vs=document.getElementsByClassName('value');
		if(vs[0]){
			thisvictory=vs[0].innerHTML;
		}
	
		var fullpage=document.getElementById('gradientBG');
		fullpage.style.border="0px";
		//fullpage.style.margin="0px;";
		//fullpage.style.padding="0px;";
		fullpage.style.textAlign='left';
		fullpage.style.verticalAlign='middle';
		//English mybrute.com  '+thisname+'\'s Bonuses Victories
		//EspaÃ±ola elbruto.es  Bonus de '+thisname+' Victorias
		//FranÃ§aise labrute.fr Bonifications de '+thisname+' Victoires
		fullpage.innerHTML='<div id="bonuspreview" style="font-size:large;position: absolute; top: 0px; left: 0px;background-color:#FAF8C3;width:217px;height:420px; border:0px; margin: 0px; padding: 0px; overflow:hidden;">Bonifications de '+thisname+'<br />'+thisvictory+' Victoires<br /><embed type="application/x-shockwave-flash" src="http://data.'+brutesite+'/swf/uc.swf?v=15" id="inventory" name="inventory" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="'+invid+'" height="400" sc wmode="opaque"></div>';
		}
	}
	else{
		active_bonus_preview_retry= GM_getValue('active_bonus_preview_retry',0);
		if(active_bonus_preview_retry>0){
			GM_getValue('active_bonus_preview_retry',(active_bonus_preview_retry-1));
			location.href='http://'+thisbrute+'.'+brutesite+'/cellule';	
		}
	}
}
else if(brutalerror){
	active_brutal_retry= GM_getValue('active_brutal_retry',0);
	if(active_brutal_retry>0){
		GM_setValue('active_brutal_retry',(active_brutal_retry-1));
		location.href=url;
	}

}