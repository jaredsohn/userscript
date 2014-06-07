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
// --------------------------------------------------------------------
// ==UserScript==
// @name           My Brute Manager
// @version        0.4c
// @namespace      http://www.gamertoolz.com
// @description    A suite of extra options for playing My Brute
// @include        http://*.mybrute.com/cellule*
// @include        http://*.mybrute.com/arene*
// @include        http://*.mybrute.com/vs*
// @include        http://*.mybrute.com/fight*
// @include        http://*gamertoolz.com/mybrute/mybrutemanager/configure.php*
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
// v04.b - Apr 27, 2009
// -Change: Hide the dropdown list, the controller, and the "ATK" button when you don't have any managed brutes yet.
//
// v04.c - May 6th, 2009
// -Fix: Catch and fix error when brutes and brute-levels are not in sync
// ==/ChangeLog==

var url=window.location.href;
var site='unknown'; var page='unknown';
if(url.indexOf('.mybrute.com/cellule')>=0){	site='mybrute'; page='cellule';}
else if(url.indexOf('.mybrute.com/arene')>=0){ site='mybrute'; page='arene';}
else if(url.indexOf('.mybrute.com/vs/')>=0){ site='mybrute'; page='vs';}
else if(url.indexOf('.mybrute.com/fight')>=0){ site='mybrute'; page='fight';}
else if(url.indexOf('gamertoolz.com/mybrute/mybrutemanager/configure.php')>=0){	site='gamertoolz'; page='config';}

var config_show_dropdown	= GM_getValue('config_show_dropdown',false);
var config_show_controller	= GM_getValue('config_show_controller',false);
var config_show_quick_fight	= GM_getValue('config_show_quick_fight',false);
var config_skip_quick_fight	= GM_getValue('config_skip_quick_fight',false);
var config_manage_arena		= GM_getValue('config_manage_arena',false);
var config_brutes			= GM_getValue('config_brutes',false);
var config_brute_levels		= GM_getValue('config_brute_levels',false);
var active_current_brute	= GM_getValue('active_current_brute','');
var active_quick_fight_loaded=GM_getValue('active_quick_fight_loaded',0);

if(!config_show_dropdown)	{ config_show_dropdown=1;	GM_setValue('config_show_dropdown', 1); }
if(!config_show_controller)	{ config_show_controller=0;	GM_setValue('config_show_controller', 0); }
if(!config_show_quick_fight){ config_show_quick_fight=0;GM_setValue('config_show_quick_fight', 0); }
if(!config_skip_quick_fight){ config_skip_quick_fight=0;GM_setValue('config_skip_quick_fight', 0); }
if(!config_manage_arena)	{ config_manage_arena=1;	GM_setValue('config_manage_arena', 1); }

if(site=='mybrute')	var thisbrute=url.substr(7,url.indexOf('.mybrute')-7);
	
if(page=='cellule' || page=='arene' && self==top){
	var managed=false;
	var i=0;
	var brutenum=0;
	var thislevel='?';
	if(page=='cellule'){
		var cell_t=document.getElementsByClassName('level');
		if(cell_t) var cell_s = cell_t[0].getElementsByTagName('span');
		if(cell_s) var cell_d=cell_s[0];
		if(cell_d) var cell_leveltext=cell_d.innerHTML.split(" ");
		if(cell_leveltext) thislevel=cell_leveltext[1];
	}
	else if (page=='arene'){
		var arena_t=document.getElementsByClassName('areneLeft');
		if(arena_t) var arena_s = arena_t[0].getElementsByTagName('span');
		if(arena_s) var arena_d=arena_s[0];
		if(arena_d) var arena_leveltext=arena_d.innerHTML.split(" ");
		if(arena_leveltext) thislevel=arena_leveltext[1];
	}

	if(config_brutes && config_brutes!=''){
		var brutes=config_brutes.split(";");
		var numbrutes=brutes.length;
		if(config_brute_levels) { var brutelevels=config_brute_levels.split(";"); var numlevels=brutelevels.length; }
		else { var brutelevels=new Array(); var numlevels=0;}

			config_brute_levels='';
			for(i=0;i<numbrutes;i++){
				if(brutes[i]==thisbrute){
					managed=true;
					GM_setValue('active_current_brute',thisbrute);
					brutenum=i;
					if(thislevel!='?') { brutelevels[i]=thislevel; }
				}
				if(i<numlevels) config_brute_levels=config_brute_levels+';'+brutelevels[i];
				else config_brute_levels=config_brute_levels+';'+'?';
			}	
			config_brute_levels=config_brute_levels.substr(1,config_brute_levels.length-1);
			if(managed || numbrutes!=numlevels){
				GM_setValue('config_brute_levels', config_brute_levels);
			}

	}
	if(page=='cellule'){
		var command=url.substr(url.length-4,4);
	
		if(command=='?add'){
			if(config_brutes && !managed){
				config_brutes=config_brutes+';'+thisbrute;
				config_brute_levels=config_brute_levels+';'+thislevel;
				GM_setValue('config_brutes', config_brutes);
				GM_setValue('config_brute_levels', config_brute_levels);
				brutes[numbrutes]=thisbrute;
				brutelevels[numbrutes]=thislevel;
				brutenum=numbrutes;
				numbrutes=numbrutes+1;
			}
			else if(!managed){
				config_brutes=thisbrute;
				config_brute_levels=thislevel;
				GM_setValue('config_brutes', config_brutes);
				GM_setValue('config_brute_levels',config_brute_levels);
				var brutes=new Array();
				brutes[0]=thisbrute;
				var brutelevels=new Array();
				brutelevels[0]=thislevel;
				numbrutes=1;
				brutenum=0;
			}
			managed=true;
			GM_setValue('active_current_brute',thisbrute);
		}
		else if(command=='?del'){
			if(config_brutes && managed){
				config_brutes='';
				config_brute_levels='';
				for(i=0;i<numbrutes;i++){
					if(brutes[i]!=thisbrute){
						config_brutes=config_brutes+';'+brutes[i];
						config_brute_levels=config_brute_levels+';'+brutelevels[i];
					}
				}
				if(config_brutes==''){
					GM_deleteValue('config_brutes');
					GM_deleteValue('config_brute_levels');
					config_brutes=false;
				}
				else {
					config_brutes=config_brutes.substr(1,config_brutes.length-1);
					config_brute_levels=config_brute_levels.substr(1,config_brute_levels.length-1);
					GM_setValue('config_brutes',config_brutes);
					GM_setValue('config_brute_levels', config_brute_levels);
				}
				managed=false;
				numbrutes=numbrutes-1;
				GM_setValue('active_current_brute','');
			}
		}
	}

	var menu='<div id="mbmmenu">';
	var menudel='<div id="mbmdel" style="width:35px;height:35px;background-image:url(http://data.mybrute.com/img/log_lose.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right"><a href="http://'+thisbrute+'.mybrute.com/cellule/?del" style="text-decoration:none;font-size:small;color:#000000;">DEL</a></div>';
	var menuadd='<div id="mbmadd" style="width:35px;height:35px;background-image:url(http://data.mybrute.com/img/log_win.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right"><a href="http://'+thisbrute+'.mybrute.com/cellule/?add" style="text-decoration:none;font-size:small;color:#000000;">ADD</a></div>';
	var menuattack='<div id="mbmatk" style="width:35px;height:35px;background-image:url(http://data.mybrute.com/img/log_childup.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right"><a href="http://'+active_current_brute+'.mybrute.com/vs/'+thisbrute+'" style="text-decoration:none;font-size:small;color:#000000;">ATK</a></div>';
	var menuconfig='<div id="mbmcfg" style="width:35px;height:35px;background-image:url(http://data.mybrute.com/img/log_child.gif);background-position:-5px -5px;text-align:center;vertical-align:bottom;float:right"><a href="http://www.gamertoolz.com/mybrute/mybrutemanager/configure.php" style="text-decoration:none;font-size:small;color:#000000;">CFG</a></div>';
	if(managed) menu=menu+menudel;
	else menu=menu+menuadd;
	if(page=='cellule' && !managed && active_current_brute!='' && numbrutes>0) menu=menu+menuattack;
	menu=menu+menuconfig+'</div>';
	var quickfight='';
	if(managed && config_show_quick_fight==1) quickfight='<iframe src="http://'+thisbrute+'.mybrute.com/arene" width="1" height="1" style="display:none;"></iframe>	<div class="vsLaunch">Looking for an Opponent...</div>';
	var controls='<div id="mbmcontrols" style="font-size: medium; text-align: center; float: right;">';
	var dropdown='';
	if(numbrutes>0){
		dropdown='<form id="bruteform" name="bruteform" method="post" action="">	<select name="brutechooser" onchange="javascript:var brute=0; brute=document.bruteform.brutechooser.options[document.bruteform.brutechooser.selectedIndex].value; if(brute!=0){ location.href=\'http://\'+brute+\'.mybrute.com/'+page+'/\'; }">    <option value="0">Choose a Brute</option>';
		for(i=0;i<numbrutes;i++){
			dropdown=dropdown+'<option value="'+brutes[i]+'">'+brutes[i]+' ('+brutelevels[i]+')</option>';
		}
		dropdown=dropdown+'</select></form>';
	}
	var controller='';
	if(numbrutes>0){
		controller=controller+'<img id="controls" src="http://www.gamertoolz.com/mybrute/images/media.png" usemap="#controlmap" border="0" /><map id="_controlmap" name="controlmap">';
		if(brutenum>0) controller=controller+'<area shape="rect" coords="1,1,28,24" href="http://'+brutes[0]+'.mybrute.com/'+page+'" alt="First" title="First" /><area shape="rect" coords="30,1,56,24" href="http://'+brutes[brutenum-1]+'.mybrute.com/'+page+'" alt="Previous" title="Previous" />';
		if(brutenum<numbrutes-1) controller=controller+'<area shape="rect" coords="57,1,83,24" href="http://'+brutes[brutenum+1]+'.mybrute.com/'+page+'" alt="Next" title="Next" /><area shape="rect" coords="84,1,110,24" href="http://'+brutes[numbrutes-1]+'.mybrute.com/'+page+'" alt="Last" title="Last" />';
	controller=controller+'</map>';
	}
	if(config_show_dropdown==1) controls=controls+dropdown;
	if(config_show_controller==1) controls=controls+controller;
	controls=controls+'</div>';

	var cellprefix='<div id="celllink" style="width:35px;height:15px;background-image:url(http://data.mybrute.com/img/log_childup.gif);background-position:-5px -30px;text-align:center;vertical-align:middle;float:right;"><a href="http://';
	var cellsuffix='.mybrute.com/cellule" style="text-decoration:none;font-size:small;color:#FF0000;">CELL</a></div>';
	
}

if(page=='cellule'){
	GM_setValue('active_quick_fight_loaded',0);

var cell_n=document.getElementsByTagName('h1');
var cell_name=cell_n[0].innerHTML;
if(cell_name.substr(cell_name.length-4,4)=='cell')
	cell_name=cell_name.substr(0,cell_name.length-7);
var cell_t=document.getElementsByClassName('level');
var cell_cell=document.getElementsByClassName('caracs');
var cell_r = cell_t[0].getElementsByTagName('div');
var cell_s = cell_t[0].getElementsByTagName('span');
var cell_f =document.getElementsByClassName('areneInfos');
var cell_fights=0;
if(cell_f[0]) cell_fights=parseInt(cell_f[0].innerHTML.substr(9,1));
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
if(cell_fights>0) cell_t[0].innerHTML=menu+quickfight+controls+cell_t[0].innerHTML;
else cell_t[0].innerHTML='<div id="mbm" style="width:250px;height:60px;">'+menu+controls+'</div>'+cell_t[0].innerHTML;
}
else if(page=='arene' && self==top && config_manage_arena==1){
	GM_setValue('active_quick_fight_loaded',0);
	var thisbrute=url.substr(7,url.indexOf('.mybrute')-7);
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

	var m=document.getElementsByClassName('miniCaracs');
	var o=document.getElementsByClassName('swf');

	var celllink='';
	for(i=0;i<m.length;i++){
		var mc=m[i].getElementsByTagName('div');
		var mc_content=mc[4];
		var opp=o[i+1].id.substr(10,o[i+1].id.length);
		celllink='<div id="celllink" style="width:35px;height:15px;background-image:url(http://data.mybrute.com/img/log_childup.gif);background-position:-5px -30px;text-align:center;vertical-align:middle;float:right;"><a href="http://'+opp+'.mybrute.com/cellule" style="text-decoration:none;font-size:small;color:#FF0000;">CELL</a></div>';
		mc_content.innerHTML=celllink+mc_content.innerHTML;
		celllink='';
	}

	e.style.height='15px';
	r[5].style.height='14px'
	e.innerHTML='<div style="position: relative; left: 2px; top: 7px; font-size: small; color: #339933; z-index: 1; vertical-align: bottom; text-decoration: none;">'+percent+'%</div>'+e.innerHTML;
	t[0].innerHTML=menu+controls+t[0].innerHTML;
}
else if(page=='arene' && self!=top && config_show_quick_fight==1){
	GM_setValue('active_quick_fight_loaded',0);
	var thisbrute=url.substr(7,url.indexOf('.mybrute')-7);
	var o=document.getElementsByClassName('swf');
	var ql=parent.document.getElementsByClassName('vsLaunch');
	if(o[1]){
		var opp=o[1].id.substr(10,o[1].id.length);
		location.href='http://'+thisbrute+'.mybrute.com/vs/'+opp;
	}
	else if(ql[0]){
		ql[0].innerHTML='Unable to Find Opponent';
	}
}
else if(page=='vs' && self!=top && config_show_quick_fight==1){
	GM_setValue('active_quick_fight_loaded',0);
	var thisbrute=url.substr(7,url.indexOf('.mybrute')-7);
	var opp=url.substr(url.indexOf('/vs/')+4,url.length-url.indexOf('/vs/')-4);
	var sf=document.getElementsByClassName('vsLaunch');
	var ql=parent.document.getElementsByClassName('vsLaunch');
	if(sf[0] && ql[0]){
		var button=sf[0].getElementsByTagName("script");
		if(button[0]){
			var aindex=button[0].innerHTML.indexOf('&amp;k=');
			var sindex=button[0].innerHTML.indexOf('so.addParam("scale"');
			var attack=button[0].innerHTML.substr(aindex+7,sindex-aindex-11)												
			ql[0].innerHTML='<embed type="application/x-shockwave-flash" src="http://data.mybrute.com/swf/uc.swf?v=14" id="btn" name="btn" bgcolor="#FAF8C3" quality="high" menu="false" allowscriptaccess="always" flashvars="__file=http://data.mybrute.com/swf/btn.swf?v=0&amp;__key=http://data_labrute_fr/swf_key&amp;lang=en&amp;u=/fight/&amp;d='+opp+'&amp;b=http://data.mybrute.com/img/en/teasing_submit.gif&amp;o=http://data.mybrute.com/img/en/teasing_submit_over.gif&amp;a='+thisbrute+'&amp;k='+attack+'" scale="noscale" width="212" height="66">';
			GM_setValue('active_quick_fight_loaded',1);
		}
	}
	else if (ql[0]){
		ql[0].innerHTML='Unable to Find Opponent';
	}
}
else if(page=='fight' && config_show_quick_fight==1 && config_skip_quick_fight==1 && GM_getValue('active_quick_fight_loaded',0)==1){
	location.href='http://'+thisbrute+'.mybrute.com/cellule';
}
else if(page=='config'){
	var form = document.forms.namedItem("configform");
	if(form){
		var push_config_show_dropdown = form.elements.namedItem("push_config_show_dropdown");
			if(push_config_show_dropdown) push_config_show_dropdown.value=config_show_dropdown;
		var push_config_show_controller = form.elements.namedItem("push_config_show_controller");
			if(push_config_show_controller) push_config_show_controller.value=config_show_controller;
		var push_config_show_quick_fight = form.elements.namedItem("push_config_show_quick_fight");
			if(push_config_show_quick_fight) push_config_show_quick_fight.value=config_show_quick_fight;
		var push_config_skip_quick_fight = form.elements.namedItem("push_config_skip_quick_fight");
			if(push_config_skip_quick_fight) push_config_skip_quick_fight.value=config_skip_quick_fight;
		var push_config_manage_arena = form.elements.namedItem("push_config_manage_arena");
			if(push_config_manage_arena) push_config_manage_arena.value=config_manage_arena;
		var push_config_brutes = form.elements.namedItem("push_config_brutes");
			if(push_config_brutes) push_config_brutes.value=config_brutes;
		var push_config_brute_levels = form.elements.namedItem("push_config_brute_levels");
			if(push_config_brute_levels) push_config_brute_levels.value=config_brute_levels;
		document.getElementById('loadconfig').style.display='';
	}
	var changes = document.getElementById('mbmchanges');
	if(changes){
		var grab_config_show_dropdown = document.getElementById("grab_config_show_dropdown");
			if(grab_config_show_dropdown) GM_setValue('config_show_dropdown',grab_config_show_dropdown.innerHTML);
		var grab_config_show_controller = document.getElementById("grab_config_show_controller");
			if(grab_config_show_controller) GM_setValue('config_show_controller',grab_config_show_controller.innerHTML);
		var grab_config_show_quick_fight = document.getElementById("grab_config_show_quick_fight");
			if(grab_config_show_quick_fight) GM_setValue('config_show_quick_fight',grab_config_show_quick_fight.innerHTML);
		var grab_config_skip_quick_fight = document.getElementById("grab_config_skip_quick_fight");
			if(grab_config_skip_quick_fight) GM_setValue('config_skip_quick_fight',grab_config_skip_quick_fight.innerHTML);
		var grab_config_manage_arena = document.getElementById("grab_config_manage_arena");
			if(grab_config_manage_arena) GM_setValue('config_manage_arena',grab_config_manage_arena.innerHTML);
		var grab_config_brutes = document.getElementById("grab_config_brutes");
			if(grab_config_brutes) GM_setValue('config_brutes',grab_config_brutes.innerHTML);
		var grab_config_brute_levels = document.getElementById("grab_config_brute_levels");
			if(grab_config_brute_levels) GM_setValue('config_brute_levels',grab_config_brute_levels.innerHTML);
		var updatestatus = document.getElementById('mbmupdatestatus')
		if(updatestatus)
			updatestatus.innerHTML='My Brute Manager Has been Succesfully Updated! :)';
	}
}