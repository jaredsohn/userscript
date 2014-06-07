// ==UserScript==
// @name		Grepolis Tools
// @author		Dreambreaker
// @license		Creative Commons
// @version           	0.9.2
// @require		http://sizzlemctwizzle.com/updater.php?id=71132
// @namespace		gretools
// @description		Some improvements and tools for the Grepolis browser game.
// @include		*.grepolis.*/game/*
// ==/UserScript==

/*
	Changelog 0.9.2
	- added languages: swedish, dutch
	- added the possibility to change the widgets' position (preferences)
	- corrected greek translation
	- fixed show/hide functionality on report/message pages
	- "BBCode" button doesn't show on messages anymore
	- Ally forum now shows the new messages scroll again (needs verification)
	- partly fixed troop movements (red-color bug known)
	- renamed "GrepoStats" field to "Extern Tools" and added GrepolisMaps link
	- various changes to navigation/widgets
*/

//Access to window object cross-browser
var uW;
if(typeof unsafeWindow==='object'){uW=unsafeWindow;}else{uW=window;}

//Access jQuery
var $=uW.jQuery;

//Script Data
var gt_version='0.9.2';

//Basic game data
var player=uW.Game.player_id;
var town=uW.Game.townId;
var ally=uW.Game.alliance_id;
var csrfToken=uW.Game.csrfToken;
var storage=uW.Layout.storage_volume;
var servertime=uW.Game.server_time;
var res=[];
res['wood']=uW.Layout.resources['wood'];
res['stone']=uW.Layout.resources['stone'];
res['iron']=uW.Layout.resources['iron'];
res['wood-i']=uW.Layout.production['wood'];
res['stone-i']=uW.Layout.production['stone'];
res['iron-i']=uW.Layout.production['iron'];
res['fav']=uW.Layout.favor;
res['fav-i']=uW.Layout.favor_production;

//Function allowing to use GM_setValue on event
function GMset(string,value){
	setTimeout(function(){
		GM_setValue(string,value);
	},0);
}

//Preferences / Help
var gtPrefMode=0; //1 if currently editing preferences
var gtHelpMode=0; //1 if currently reading help
var gtWidgetsToggled=GM_getValue('widgetsToggled');
if(gtWidgetsToggled!=1 && gtWidgetsToggled!=0){
	GM_setValue('widgetsToggled',0);
	gtWidgetsToggled=0;
}
var playerName=GM_getValue('playerName');
var allyName=GM_getValue('allyName');
var dispBL=GM_getValue('dispBL');
var aboutWidget=GM_getValue('dispAbout');
var widgetOffset=GM_getValue('wOffset');

//Notepad Data
var gtNotesInst=7;
var gtNotes=[];
while(gtNotesInst>=1){
	gtNotes[gtNotesInst]=GM_getValue('notes'+gtNotesInst);
	if(typeof(gtNotes[gtNotesInst])=='undefined'){gtNotes[gtNotesInst]='Notes...';}
	--gtNotesInst;
}

//Language specific data
var translation = {
	de: {
		main: "Senat",
		barracks: "Kaserne",
		academy: "Akademie",
		docks: "Hafen",
		market: "Marktplatz",
		place: "Agora",
		temple: "Tempel",
		wall: "Mauer",
		sim: "Simulator",
		storage: "Speicher",
		lumber: "Holz",
		stone: "Stein",
		iron: "Eisen"
	},
    fr: {
		main: "Sénat",
		barracks: "Caserne",
		academy: "Académie",
		docks: "Port",
		market: "Marché",
		place: "Agora",
		temple: "Temple",
		wall: "Remparts",
		sim: "Simulateur",
		storage: "Entrepôt",
		lumber: "Bois",
		stone: "Pierre",
		iron: "Argent"
	},
	en: {
		main: "Senate",
		barracks: "Barracks",
		academy: "Academy",
		docks: "Harbour",
		market: "Marketplace",
		place: "Agora",
		temple: "Temple",
		wall: "Wall",
		sim: "Simulator",
		storage: "Storage",
		lumber: "Lumber",
		stone: "Stone",
		iron: "Iron"
	},
	es: {
		main: "Senado",
		barracks: "Barracones",
		academy: "Academia",
		docks: "Puerto",
		market: "Comercio",
		place: "Agora",
		temple: "Templo",
		wall: "Muralla",
		sim: "Simulador",
		storage: "Depositó",
		lumber: "Madera",
		stone: "Piedra",
		iron: "Hierro"
	},
	pl: {
		main: "Senat",
		barracks: "Koszary",
		academy: "Akademia",
		docks: "Port",
		market: "Targowisko",
		place: "Agora",
		temple: "Swiatynia",
		wall: "Mur",
		sim: "Symulator",
		storage: "Magazyn",
		lumber: "Drewno",
		stone: "Kamien",
		iron: "Srebro"
	},
	hu: {
		main: "Szenátus",
		barracks: "Kaszárnya",
		academy: "Akadémia",
		docks: "Kiköto",
		market: "Piac",
		place: "Agora",
		temple: "Templom",
		wall: "Városfal",
		sim: "Szimulátor",
		storage: "Raktár",
		lumber: "Fa",
		stone: "Ko",
		iron: "Acél"
	},
	pt: {
		main: "Senado",
		barracks: "Quartel",
		academy: "Academia",
		docks: "Porto",
		market: "Mercado",
		place: "Agora",
		temple: "Templo",
		wall: "Muralha",
		sim: "Simulador",
		storage: "Armazém",
		lumber: "Madeira",
		stone: "Pedra",
		iron: "Prata"
	},
	ro: {
		main: "Senat",
		barracks: "Cazarma",
		academy: "Academie",
		docks: "Port",
		market: "Piata",
		place: "Agora",
		temple: "Templu",
		wall: "Zid",
		sim: "Simulator",
		storage: "Depozit",
		lumber: "Lemn",
		stone: "Piatra",
		iron: "Argint" 
	},
	cz: {
		main: 'Senát',
		barracks: 'Kasárna',
		academy: 'Akademie',
		docks: 'Prístav',
		market: 'Tržište',
		place: 'Agora',
		temple: 'Chrám',
		wall: 'Hradby',
		sim: 'Simulátor',
		storage: 'Sklad',
		lumber: 'Drevo',
		stone: 'Kámen',
		iron: 'Stríbro'
	},
	it: {
		main: 'Senato',
		barracks: 'Caserma',
		academy: 'Accademia',
		docks: 'Porto',
		market: 'Mercato',
		place: 'Piazza',
		temple: 'Tempio',
		wall: 'Mura cittadine',
		sim: 'Simulatore',
		storage: 'Magazzino',
		lumber: 'Legna',
		stone: 'Pietra',
		iron: 'Ferro'
	},
	gr:{
		main: "Σύγκλητος",
		barracks: "Στρατώνες",
		academy: "Ακαδημία",
		docks: "Λιμάνι",
		market: "Αγορά",
		place: "Φάρμα",
		temple: "Ναός",
		wall: "Τείχος",
		sim: "Προσωμοιωτής",
		storage: "Αποθήκη",
		lumber: "Ξύλο",
		stone: "Πέτρα",
		iron: "Ασημένια νομίσματα"
	},
	nl:{
		main: "Senaat",
		barracks: "Kazerne",
		academy: "Academie",
		docks: "Haven",
		market: "Marktplaats",
		place: "Agora",
		temple: "Tempel",
		wall: "Stadsmuur",
		sim: "Simulator",
		storage: "Pakhuis",
		lumber: "Houthakkerskamp",
		stone: "Steengroeve",
		iron: "Zilvermijn"
	},
	sv:{
		main: 'Senat',
		barracks: 'Kaserner',
		academy: 'Akademi',
		docks: 'Hamn',
		market: 'Marknad',
		place: 'Torg',
		temple: 'Tempel',
		wall: 'Mur',
		sim: 'Simulator',
		storage: 'Lager',
		lumber: 'Trä',
		stone: 'Sten',
		iron: 'Silvermynt'
	}
};

//Get language
var lang=uW.location.href.substring(7,9);
if(lang!='fr' && lang!='de' && lang!='es' && lang!='en' && lang!='pl' && lang!='hu' && lang!='pt' && lang!='ro' && lang!='cz' &&lang!='it' && lang!='gr' && lang!='nl' && lang!='sv'){lang='en';}
var trad={main:'',barracks:'',academy:'',docks:'',market:'',place:'',temple:'',wall:'',sim:'',storage:'',lumber:'',stone:'',iron:''};
var language=[];
language['fr']='french/francais';
language['de']='german/deutsch';
language['es']='spanish/espanol';
language['pl']='polish/polski';
language['hu']='hungarian/magyar';
language['pt']='portugese';
language['ro']='romanian/româna';
language['cz']='czech/Ceština';
language['it']='italian/italiano';
language['gr']='greek';
language['nl']='dutch';
language['sv']='swedish/svenska ';
language['en']='english';
var gt_langs=13;

//Set chosen traduction
eval('trad.main=translation.'+lang+'.main');
eval('trad.barracks=translation.'+lang+'.barracks');
eval('trad.academy=translation.'+lang+'.academy');
eval('trad.docks=translation.'+lang+'.docks');
eval('trad.market=translation.'+lang+'.market');
eval('trad.place=translation.'+lang+'.place');
eval('trad.temple=translation.'+lang+'.temple');
eval('trad.wall=translation.'+lang+'.wall');
eval('trad.sim=translation.'+lang+'.sim');
eval('trad.storage=translation.'+lang+'.storage');
eval('trad.lumber=translation.'+lang+'.lumber');
eval('trad.stone=translation.'+lang+'.stone');
eval('trad.iron=translation.'+lang+'.iron');

//Building Levels - Get
if(location.href.match('game/building_main')){
	var gtb=uW.BuildingMain;
	gtb.b=gtb.buildings;
	GM_setValue('gtb_academy_level',gtb.b.academy.level);
	GM_setValue('gtb_barracks_level',gtb.b.barracks.level);
	GM_setValue('gtb_docks_level',gtb.b.docks.level);
	GM_setValue('gtb_farm_level',gtb.b.farm.level);
	GM_setValue('gtb_hide_level',gtb.b.hide.level);
	GM_setValue('gtb_ironer_level',gtb.b.ironer.level);
	GM_setValue('gtb_lumber_level',gtb.b.lumber.level);
	GM_setValue('gtb_main_level',gtb.b.main.level);
	GM_setValue('gtb_market_level',gtb.b.market.level);
	GM_setValue('gtb_place_level',gtb.b.place.level);
	GM_setValue('gtb_stoner_level',gtb.b.stoner.level);
	GM_setValue('gtb_storage_level',gtb.b.storage.level);
	GM_setValue('gtb_temple_level',gtb.b.temple.level);
	GM_setValue('gtb_wall_level',gtb.b.wall.level);
}
//Building Levels - Set
if(location.href.match('game/index')){
	var gtBuildings={
		main:{
			level:GM_getValue('gtb_main_level')
		},
		academy:{
			level:GM_getValue('gtb_academy_level')
		},
		barracks:{
			level:GM_getValue('gtb_barracks_level')
		},
		docks:{
			level:GM_getValue('gtb_docks_level')
		},
		farm:{
			level:GM_getValue('gtb_farm_level')
		},
		hide:{
			level:GM_getValue('gtb_hide_level')
		},
		ironer:{
			level:GM_getValue('gtb_ironer_level')
		},
		lumber:{
			level:GM_getValue('gtb_lumber_level')
		},
		market:{
			level:GM_getValue('gtb_market_level')
		},
		place:{
			level:GM_getValue('gtb_place_level')
		},
		stoner:{
			level:GM_getValue('gtb_stoner_level')
		},
		storage:{
			level:GM_getValue('gtb_storage_level')
		},
		temple:{
			level:GM_getValue('gtb_temple_level')
		},
		wall:{
			level:GM_getValue('gtb_wall_level')
		}
	}
}

//Grepolis Tools
$(document).ready(function(){
	//General stuff
		$('body').append('<div id="cache" style="display:none;"></div>');
		$('.report_translation').empty().html('<div id="gt_notepad_trigger" style="height:40px;margin:6px;position:relative;top:8px;padding-top:10px;color:#ffcc66;">Notepad</div>');
	//Additional ressources info
		$('#res').css({'height':'75px'});
		$('#res').append('<div id="gt_res" style="position:relative;top:55px;text-align:left;height:22px;text-align:center;color:#ffcc66;"></div>');
		$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">'+res['wood-i']+'</div>');
		$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">'+res['stone-i']+'</div>');
		$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">'+res['iron-i']+'</div>');
		if(res['fav-i']>0){
			$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;"></div>');
			$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;"></div>');
			$('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">'+res['fav-i']+'</div>');
		}
		$('.gt_res-inner').css({'background':'url(/images/game/layout/bg_resources.png) repeat-x 0px -32px'});
	//Other style-related stuff
		$('#advisers').remove();
		$('#report_translation_dialog_tmpl').remove();
		$('#report_list').css({'font-size':'10px'});
		$('#message_list').css({'font-size':'10px'});
	//Extern Tools
		var world=uW.location.href.substring(7,10);
		if(world.substring(2,3)=='.'){world=world.substring(0,2)+'1';}
		var gt_gs_player='http://www.grepostats.com/world/'+world+'/player/'+player;
		var gt_gs_ally='http://www.grepostats.com/world/'+world+'/alliance/'+ally;
		$('#menu').append('<div id="gt_gs_container" style="text-align:center;background-color:#ffeebb;position:absolute;top:415px;width:150px;margin-left:12px;"></div>');
		$('#gt_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
		$('#gt_gs_container').append('<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>');
		$('#gt_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
		$('#gt_gs_container').append('<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>');
		$('#gt_gs_container').append('<div id="gt_gs" style="float:left;width:130px;height:70px;font-size:10px;"></div>');
		$('#gt_gs_container').append('<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>');
		$('#gt_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
		$('#gt_gs_container').append('<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>');
		$('#gt_gs_container').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
		$('#gt_gs').append('<span style="font-size:10px;text-decoration:underline;">Extern Tools</span>');
		$('#gt_gs').append('<div style="text-align:left;"><a href="http://www.grepostats.com/">Grepostats</a> (<a href="'+gt_gs_player+'" target="_blank">You</a>, <a href="'+gt_gs_ally+'" target="_blank">Your Ally</a>)</div>');
		$('#gt_gs').children('div').append(' <a href="http://www.grepolismaps.org/">GrepolisMaps</a>');
		$('#gt_gs a').css({'font-size':'10px'});
	//BBCodes
		$('#message_bbcodes').append('<div style="float:left;width:100px;height:14px;margin-top:4px;">Grepolis Tools:</div>');
		$('#message_bbcodes').append('<a title="Me" href="#" id="gt_bb_player"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -88px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>');
		$('#message_bbcodes').append('<a title="My Ally" href="#" id="gt_bb_ally"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -110px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>');
		$('#message_bbcodes').append('<a title="My Town" href="#" id="gt_bb_town"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -132px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>');
		$('#message_bbcodes').append('<a class="button"  href="#" style="float:left;position:relative;top:-2px;" id="gt_bb_init"><span class="left"></span><span class="middle">Reinitialize</span><span class="right"></span><span style="clear:both;"></span></a>');
		$('#gt_bb_player').click(function(){
			$('textarea').val($('textarea').val()+'[player]'+playerName+'[/player]');
		});
		$('#gt_bb_ally').click(function(){
			$('textarea').val($('textarea').val()+'[ally]'+allyName+'[/ally]');
		});
		$('#gt_bb_town').click(function(){
			$('textarea').val($('textarea').val()+'[town]'+town+'[/town]');
		});
		$('#gt_bb_init').click(function(){
			$('textarea').val('');
		});
	//Navigation
		//General Stuff
			//$('#link_index').before('<span style="font-size:16px;font-weight:bold;color:#ffcc66;text-decoration:underline;">Navigation</span>');
			$('#link_ranking').next().append('<span style="color:#FFCC66;"> | </span><a href="http://forum.'+lang+'.grepolis.com" target="_blank">Forum</a>').next().remove();
			var temp=$('#link_report').next().next().html();
			$('#link_report').next().next().remove();
			$('#link_report').next().append('<span style="color:#FFCC66;"> | </span>'+temp);
			$('#links ul').append('<span style="font-size:16px;font-weight:bold;color:#ffcc66;text-decoration:underline;">Grepolis Tools</span>');
			$('#links ul').append('<li><a id="w_pref" style="font-size:10px;font-weight:bold;">Preferences</a><span style="color:#FFCC66;"> | </span><a id="w_help" style="font-size:10px;font-weight:bold;">Help</a></li>');
			$('#links ul').append('<li id="w_toggle"><a style="font-size:10px;font-weight:bold;">Show/Hide</a></li>');
			$('#links a').css({'display':'inline','font-size':'10px'});
			$('body').append('<style>#links a:hover{background:none;}#links li:hover{background:url(/images/game/layout/menu_hover.png)no-repeat ;}</style>');
		//Toggling Widgets
			$('#w_toggle').click(function(){
				if(gtWidgetsToggled==0){
					$('.gtwidget').hide();
					gtWidgetsToggled=1;
					GMset('widgetsToggled',1);
				}else{
					$('.gtwidget').show();
					gtWidgetsToggled=0;
					GMset('widgetsToggled',0);
				}
			});
		//Preferences
			$('#cache').append('<div id="gt_pref" style="padding:10px;position:absolute;left:23px;height:465px;width:760px;text-align:left;overflow-x:hidden;overflow-y:hidden;"></div>');
			$('#gt_pref').append('<a href="#" id="gt_pref_quit" class="main_tasks_cancel" style="float:right;position:relative;left:0px;top:-2px;"></a>');
			$('#gt_pref').append('<div style="text-align:center;height:40px;font-weight:bold;">Grepolis Tools - General Preferences</div>');
			$('#gt_pref').append('<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Your name:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_name" style="border:1px solid;" value="'+playerName+'" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_name_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>');
			$('#gt_pref').append('<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Your allaince\'s name:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_ally" style="border:1px solid;" value="'+allyName+'" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_ally_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>');
			$('#gt_pref').append('<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:225px;float:left;">Levels on town overview:</div><div style="width:85px;float:left;"><select id="gt_pref_bl" style="border:1px solid;"><option>enabled</option><option>disabled</option></select></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_bl_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>');
			$('#gt_pref').append('<div style="text-align:center;height:40px;margin-top:30px;font-weight:bold;">Grepolis Tools - Widgets Preferences</div>');
			$('#gt_pref').append('<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:225px;float:left;">"About Grepolis Tools" widget:</div><div style="width:85px;float:left;"><select id="gt_pref_about" style="border:1px solid;"><option>enabled</option><option>disabled</option></select></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_about_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>');
			$('#gt_pref').append('<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Widgets position:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_offset" style="border:1px solid;" value="'+widgetOffset+'" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_offset_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>');
			$('#gt_pref').append('<div style="font-size:12px;color:#0174DF;padding:20px;padding-top:0px;padding-bottom:0pxe;">The position is set relative to the normal position, and is given in pixel. Example: "200" in order to move the widgets 200 pixels to the right; "-10" in order to move then 10 pixels left.</div>');
			$('#w_pref').click(function(){
				if(gtPrefMode==0){
					$('#gt_help').appendTo('#cache');
					gtHelpMode=0;
					$('#content').hide();
					$('#gt_pref').appendTo('#content_box');
					gtPrefMode=1;
				}else if(gtPrefMode==1){
					$('#gt_help').appendTo('#cache');
					gtHelpMode=0;
					$('#content').show();
					$('#gt_pref').appendTo('#cache');
					$('.temp').remove();
					gtPrefMode=0;
				}
			});
			$('#gt_pref_quit').click(function(){
					$('#content').show();
					$('#gt_pref').appendTo('#cache');
					$('.temp').remove();
					gtPrefMode=0;
					gtHelpMode=0;
			});
			$('#gt_pref_name_button').click(function(){
				GMset('playerName',$('#gt_pref_name').val());
				$(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
			});
			$('#gt_pref_ally_button').click(function(){
				GMset('allyName',$('#gt_pref_ally').val());
				$(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
			});
			$('#gt_pref_bl_button').click(function(){
				GMset('dispBL',$('#gt_pref_bl').val());
				if($('#gt_pref_bl').val()=='enabled'){
					$('.gt_bl').show();
				}else{
					$('.gt_bl').hide();
				}
				$(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
			});
			$('#gt_pref_about_button').click(function(){
				GMset('dispAbout',$('#gt_pref_about').val());
				if($('#gt_pref_about').val()=='enabled'){
					$('#widget_about').show();
				}else{
					$('#widget_about').hide();
				}
				$(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
			});
			$('#gt_pref_offset_button').click(function(){
				GMset('wOffset',$('#gt_pref_offset').val());
				$(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
				widgetOffset=$('#gt_pref_offset').val();
				widgetOffset=parseInt(widgetOffset);
				if((typeof(widgetOffset)=='number') && (widgetOffset.toString().indexOf('.')==-1)){
					var pos=10+widgetOffset+'px';
					$('.gtwidget').css({'left':pos});
				}
			});
		//Help
			$('#cache').append('<div id="gt_help" style="padding:10px;position:absolute;left:23px;height:465px;width:760px;text-align:left;overflow-x:hidden;overflow-y:hidden;"></div>');
			$('#gt_help').append('<a href="#" id="gt_help_quit" class="main_tasks_cancel" style="float:right;position:relative;left:0px;top:-2px;"></a>');
			$('#gt_help').append('<div style="text-align:center;height:40px;font-weight:bold;">Grepolis Tools - Help</div>');
			$('#gt_help').append('<span style="font-weight:bold;">Languages</span><br /><br />');
			$('#gt_help').append('Grepolis Tools automatically gets your game language through the URL. Currently (version '+gt_version+'), '+gt_langs+' languages are supported. ');
			$('#gt_help').append('If you want to contribute a translation, check out <a href="http://userscripts.org/scripts/show/71132" target="_blank">this link</a> and post the needed data.<br />');
			$('#gt_help').append('<span style="font-size:10px;">Thanks for the translations: r0nin, Bogesz, RUISJESUS, TTF, davchy, Freezer2k, teobest1, Rww, kjin, Ellie29</span><br /><br />');
			$('#gt_help').append('<span style="font-weight:bold;">Special BBCode</span><br /><br />');
			$('#gt_help').append('The additional BBCode options do respectively add your player link, your ally link and your current town link. In order for the first two to work, you have to enter your player name and alliance name in the preferences, only one time of course.<br /><br />');
			$('#gt_help').append('<span style="font-weight:bold;">Notepad</span><br /><br />');
			$('#gt_help').append('Through the notepad you can save up to 7 sheets of notes. They are saved permanently on that computer. Note: You have to save a sheet before switching to another one, otherwise the content will not be saved.<br /><br />');
			$('#w_help').click(function(){
				if(gtHelpMode==0){
					$('#gt_pref').appendTo('#cache');
					gtPrefMode=0;
					$('#content').hide();
					$('#gt_help').appendTo('#content_box');
					gtHelpMode=1;
				}else if(gtHelpMode==1){
					$('#gt_pref').appendTo('#cache');
					gtPrefMode=0;
					$('#content').show();
					$('#gt_help').appendTo('#cache');
					gtHelpMode=0;
				}
			});
			$('#gt_help_quit').click(function(){
					$('#content').show();
					$('#gt_help').appendTo('#cache');
					gtHelpMode=0;
					gtPrefMode=0;
			});
	//Widgets
		//Language Widget
			$('#cache').append('<div id="widget_lang" class="gtwidget" style="width:200px;height:16px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;padding:2px;text-align:left;font-size:10px;"></div>');
			$('#widget_lang').append('Language: '+language[lang]);
			$('#widget_lang').appendTo('body').draggable();
			$('#widget_lang').css({'position':'absolute','top':'10px','left':'10px'});
			var h1=$('#widget_lang').height()+20;
			h1=h1+'px';
		//Buildings Widget
			$('#cache').append('<div id="widget_buildings" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;padding:2px;text-align:left;font-size:10px;"></div>');
			$('#widget_buildings').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">Buildings</div>');
			//Links
				$('#widget_buildings').append('<a href="building_place?action=simulator&town_id='+town+'">'+trad.sim+'</a><br />');
				$('#widget_buildings').append('<a href="building_main?town_id='+town+'">'+trad.main+'</a> - <a href="building_academy?town_id='+town+'">'+trad.academy+'</a><br />');
				$('#widget_buildings').append('<a href="building_barracks?town_id='+town+'">'+trad.barracks+'</a> - <a href="building_docks?town_id='+town+'">'+trad.docks+'</a><br />');
				$('#widget_buildings').append('<a href="building_storage?town_id='+town+'">'+trad.storage+'</a> - <a href="building_lumber?town_id='+town+'">'+trad.lumber+'</a> - <a href="building_stoner?town_id='+town+'">'+trad.stone+'</a> - <a href="building_ironer?town_id='+town+'">'+trad.iron+'</a><br />');
				$('#widget_buildings').append('<a href="building_temple?town_id='+town+'">'+trad.temple+'</a> - <a href="building_market?town_id='+town+'">'+trad.market+'</a><br />');
				$('#widget_buildings').append('<a href="building_wall?town_id='+town+'">'+trad.wall+'</a> - <a href="building_place?town_id='+town+'">'+trad.place+'</a><br />');
			$('#widget_buildings').appendTo('body').draggable();
			$('#widget_buildings').css({'position':'absolute','top':h1,'left':'10px','color':'#ffcc66'});
			$('#widget_buildings a').css({'color':'#ffcc66'});
			var h2=$('#widget_lang').height()+$('#widget_buildings').height()+30;
			h2=h2+'px';
		//Storage Widget
			$('#cache').append('<div id="widget_storage" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
			$('#widget_storage').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">'+trad.storage+'</div>');
			//Storage countdowns
				$('#widget_storage').append('<div>'+trad.lumber+': <span id="widget_storage_wood" style="font-size:14px;"></span></div>');
				$('#widget_storage').append('<div>'+trad.stone+': <span id="widget_storage_stone" style="font-size:14px;"></span></div>');
				$('#widget_storage').append('<div>'+trad.iron+': <span id="widget_storage_iron" style="font-size:14px;"></span></div>');
				setInterval(counters, 1000);
				var wood_c=parseInt(storage-res['wood'])/res['wood-i']*3600;
				var stone_c=parseInt(storage-res['stone'])/res['stone-i']*3600;
				var iron_c=parseInt(storage-res['iron'])/res['iron-i']*3600;
				function counters(){
					if(wood_c>0){--wood_c;}
					if(stone_c>0){--stone_c;}
					if(iron_c>0){--iron_c;}
					if(wood_c<=3600){$('#widget_storage_wood').css({'color':'#FF0000'});}
					if(stone_c<=3600){$('#widget_storage_stone').css({'color':'#FF0000'});}
					if(iron_c<=3600){$('#widget_storage_iron').css({'color':'#FF0000'});}
					var wc_w_h=parseInt(wood_c/3600);
					var wc_w_m=parseInt((wood_c-wc_w_h*3600)/60);
					var wc_w_s=parseInt((wood_c-wc_w_h*3600-wc_w_m*60));
					var wc_s_h=parseInt(stone_c/3600);
					var wc_s_m=parseInt((stone_c-wc_s_h*3600)/60);
					var wc_s_s=parseInt((stone_c-wc_s_h*3600-wc_s_m*60));
					var wc_i_h=parseInt(iron_c/3600);
					var wc_i_m=parseInt((iron_c-wc_i_h*3600)/60);
					var wc_i_s=parseInt((iron_c-wc_i_h*3600-wc_i_m*60));
					$('#widget_storage_wood').html(wc_w_h+':'+wc_w_m+':'+wc_w_s);
					$('#widget_storage_stone').html(wc_s_h+':'+wc_s_m+':'+wc_s_s);
					$('#widget_storage_iron').html(wc_i_h+':'+wc_i_m+':'+wc_i_s);
				}
			$('#widget_storage').appendTo('body').draggable();
			$('#widget_storage').css({'position':'absolute','top':h2,'left':'10px','color':'#ffcc66'});
			var h3=$('#widget_lang').height()+$('#widget_buildings').height()+$('#widget_storage').height()+56;
			h3=h3+'px';
		//Troop Movements
			$('#cache').append('<div id="widget_troops" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
			$('#widget_troops').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">Troop Movements</div>');
			$('#widget_troops').appendTo('body').draggable();
			$('#widget_troops').css({'position':'absolute','top':h3,'left':'10px','color':'#ffcc66'});
			if(location.href.match('game/index')){
				for(x in uW.UnitOverview.unit_movements){
					var gt_tm=uW.UnitOverview.unit_movements[x];
					$('#widget_troops').append('<div id="gt_troops_'+x+'"></div>');
					if(gt_tm.type=='ask_farm_for_resources'){
						$('#gt_troops_'+x).append('Resources: '+gt_tm.town.name_short);
					}else if(gt_tm.type=='farm_attack'){
						$('#gt_troops_'+x).append('Farm: '+gt_tm.town.name_short);
					}else if(gt_tm.type=='attack_land'){
						$('#gt_troops_'+x).append('Attack: '+gt_tm.town.name_short);
					}else if(gt_tm.type=='attack'){
						$('#gt_troops_'+x).append('Attack: '+gt_tm.town.name_short);
					}else if(gt_tm.type=='attack_sea'){
						$('#gt_troops_'+x).append('Sea attack: '+gt_tm.town.name_short);
					}
					if(gt_tm.incoming==true){
						$('#gt_troops_'+x).append(' < ');
					}else{
						$('#gt_troops_'+x).append(' > ');
					}
					$('#gt_troops_'+x).append('<span id="gt_troops_'+x+'b"></span>');
					$('#gt_troops_'+x+'b').countdown(gt_tm.arrival_at);
					if(gt_tm.type=='attack' && gt_tm.incoming==true){
						$('#gt_troops_'+x).css({'color':'#FF0000'});
					}
				}
			}else{
				$('#widget_troops').append('<div>[bug:known] Working on fix.</div>');
			}
			var h3=$('#widget_lang').height()+$('#widget_buildings').height()+$('#widget_storage').height()+$('#widget_troops').height()+66;
			h3=h3+'px';
		//About Grepolis Tools Widget
			$('#cache').append('<div id="widget_about" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
			$('#widget_about').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">About Grepolis Tools</div>');
			$('#widget_about').append('Version: '+gt_version+'<br />');
			$('#widget_about').append('Languages: '+gt_langs+'<br />');
			$('#widget_about').append('<div style="text-align:center;"><a href="http://userscripts.org/scripts/show/71132" target="_blank">Check for newer version.</a></div>');
			$('#widget_about').appendTo('body').draggable();
			$('#widget_about').css({'position':'absolute','top':h3,'left':'10px','color':'#ffcc66'});
	//Notepad
		$('body').append('<div id="gt_notepad" style="padding:10px;width:300px;height:390px;background-color:#FFFFFF;position:absolute;top:10px;left:10px;z-index:1000;background:url(/images/game/layout/content.jpg) no-repeat -30px 0px;border:1px solid #3B3B3B;border-top:none;"></div>');
		$('#gt_notepad').append('<div style="font-size:14px;font-weight:bold;margin-bottom:15px;">Grepolis Tools Notepad<a href="#" id="gt_notepad_quit" class="main_tasks_cancel" style="float:right;position:relative;top:0px;left:0px;"></a></div>');
		$('#gt_notepad').append('<div id="gt_notepad_menu" style="height:24px;></div>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_1" class="paginator_bg" style="margin-left:1px;margin-right:4px;">1</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_2" class="paginator_bg" style="margin-right:4px;">2</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_3" class="paginator_bg" style="margin-right:4px;">3</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_4" class="paginator_bg" style="margin-right:4px;">4</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_5" class="paginator_bg" style="margin-right:4px;">5</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_6" class="paginator_bg" style="margin-right:4px;">6</a>');
		$('#gt_notepad_menu').append('<a href="#" id="gt_notepad_7" class="paginator_bg">7</a>');
		$('#gt_notepad').append('<div id="gt_notepad_content" style="height:310px;background-color:#FFFFFF;"><div id="gt_notepad_content_top" style="height:10px;"></div><div id="gt_notepad_content_mid" style="height:290px;"></div><div id="gt_notepad_content_bot" style="height:10px;"></div></div>');
		$('#gt_notepad_content_top').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>');
		$('#gt_notepad_content_top').append('<div class="game_border_top" style="float:left;height:10px;width:280px;"></div>');
		$('#gt_notepad_content_top').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
		$('#gt_notepad_content_mid').append('<div class="game_border_left" style="float:left;width:10px;height:290px;"></div>');
		$('#gt_notepad_content_mid').append('<textarea id="gt_notepad_focus" style="float:left;width:280px;height:280px;border:none;"></textarea>');
		$('#gt_notepad_content_mid').append('<div class="game_border_right" style="float:left;width:10px;height:290px;"></div>');
		$('#gt_notepad_content_bot').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>');
		$('#gt_notepad_content_bot').append('<div class="game_border_bottom" style="float:left;height:10px;width:280px;"></div>');
		$('#gt_notepad_content_bot').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
		$('#gt_notepad').append('<a class="button"  href="#" style="float:right;" id="gt_notepad_save"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a>');
		$('#gt_notepad').append('<a href="#" style="position:relative;top:3px;width:64px;height:21px;float:right;margin-right:3px;padding-top:2px;background:url(/images/game/layout/bg_resources.png) repeat-x 0px -32px" id="gt_notepad_reset">Reset</a>');
		$('#gt_notepad').append('<a href="#" style="position:relative;top:3px;width:64px;height:21px;float:right;margin-right:3px;padding-top:2px;background:url(/images/game/layout/bg_resources.png) repeat-x 0px -32px" id="gt_notepad_clear">Clear</a>');
		$('#gt_notepad').draggable();
		$('body').append('<style>#gt_notepad a{color:#ffcc66;}</style>');
		$('#gt_notepad_focus').val(gtNotes[1]);
		$('#gt_notepad_trigger').click(function(){$('#gt_notepad').toggle();});
		$('#gt_notepad_quit').click(function(){$('#gt_notepad').hide();});
		$('#gt_notepad_1').click(function(){
			$('#gt_notepad_focus').val(gtNotes[1]);
			gtNotesInst=1;
		});
		$('#gt_notepad_2').click(function(){
			$('#gt_notepad_focus').val(gtNotes[2]);
			gtNotesInst=2;
		});
		$('#gt_notepad_3').click(function(){
			$('#gt_notepad_focus').val(gtNotes[3]);
			gtNotesInst=3;
		});
		$('#gt_notepad_4').click(function(){
			$('#gt_notepad_focus').val(gtNotes[4]);
			gtNotesInst=4;
		});
		$('#gt_notepad_5').click(function(){
			$('#gt_notepad_focus').val(gtNotes[5]);
			gtNotesInst=5;
		});
		$('#gt_notepad_6').click(function(){
			$('#gt_notepad_focus').val(gtNotes[6]);
			gtNotesInst=6;
		});
		$('#gt_notepad_7').click(function(){
			$('#gt_notepad_focus').val(gtNotes[7]);
			gtNotesInst=7;
		});
		$('#gt_notepad_save').click(function(){
			gtNotes[gtNotesInst]=$('#gt_notepad_focus').val();
			if(gtNotesInst==1){GMset('notes1',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==2){GMset('notes2',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==3){GMset('notes3',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==4){GMset('notes4',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==5){GMset('notes5',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==6){GMset('notes6',gtNotes[gtNotesInst]);}
			else if(gtNotesInst==7){GMset('notes7',gtNotes[gtNotesInst]);}
		});
		$('#gt_notepad_clear').click(function(){
			$('#gt_notepad_focus').val('');
		});
		$('#gt_notepad_reset').click(function(){
			$('#gt_notepad_focus').val(gtNotes[gtNotesInst]);
		});
		$('#gt_notepad').hide();
	//Battle Report Converter
		if(location.href.match('report')){
			//Convert BBCode functions
			function gt_spyReport(){
				var output='[quote]';
				//General
					att_town=$('#report_sending_town .town_name').children('a').html();
					att_name=$('#report_sending_town .town_owner').children('a').html();
					att_ally=$('#report_sending_town .town_owner_ally').children('a').html();
					def_town=$('#report_receiving_town .town_name').children('a').html();
					def_name=$('#report_receiving_town .town_owner').children('a').html();
					def_ally=$('#report_receiving_town .town_owner_ally').children('a').html();
					output=output+'[b][player]'+att_name+'[/player] ('+att_town+') spied on [player]'+def_name+'[/player] ('+def_town+')[/b]';
					output=output+'\r\r';
				//Ressources
					output=output+'[b]Ressources[/b]\r';
					var res=[];
					res['wood']=$.trim($('.wood_img').siblings('span').html());
					res['stone']=$('.stone_img').siblings('span').html();
					res['iron']=$('.iron_img').siblings('span').html();
					res['total']=parseInt(res['wood'])+parseInt(res['stone'])+parseInt(res['iron']);
					output=output+trad.lumber+': '+res['wood']+'\r';
					output=output+trad.stone+': '+res['stone']+'\r';
					output=output+trad.iron+': '+res['iron']+'\r';
					output=output+'Total: '+res['total']+'\r';
				//Units
					output=output+'\r[b]'+$('#left_side').children('h4').html()+'[/b]\r';
					var gt_aunits=[];
					gt_aunits['militia']=$('#left_side .unit_militia').children('.place_unit_black').html();
					gt_aunits['sword']=$('#left_side .unit_sword').children('.place_unit_black').html();
					gt_aunits['slinger']=$('#left_side .unit_slinger').children('.place_unit_black').html();
					gt_aunits['archer']=$('#left_side .unit_archer').children('.place_unit_black').html();
					gt_aunits['hoplite']=$('#left_side .unit_hoplite').children('.place_unit_black').html();
					gt_aunits['rider']=$('#left_side .unit_rider').children('.place_unit_black').html();
					gt_aunits['chariot']=$('#left_side .unit_chariot').children('.place_unit_black').html();
					gt_aunits['catapult']=$('#left_side .unit_catapult').children('.place_unit_black').html();
					gt_aunits['centaur']=$('#left_side .unit_centaur').children('.place_unit_black').html();
					gt_aunits['harpy']=$('#left_side .unit_harpy').children('.place_unit_black').html();
					gt_aunits['manticore']=$('#left_side .unit_manticore').children('.place_unit_black').html();
					gt_aunits['medusa']=$('#left_side .unit_medusa').children('.place_unit_black').html();
					gt_aunits['minotaur']=$('#left_side .unit_minotaur').children('.place_unit_black').html();
					gt_aunits['pegasus']=$('#left_side .unit_pegasus').children('.place_unit_black').html();
					gt_aunits['sea_monster']=$('#left_side .unit_sea_monster').children('.place_unit_black').html();
					gt_aunits['zyklop']=$('#left_side .unit_zyklop').children('.place_unit_black').html();
					gt_aunits['small_transporter']=$('#left_side .unit_small_transporter').children('.place_unit_black').html();
					gt_aunits['bireme']=$('#left_side .unit_bireme').children('.place_unit_black').html();
					gt_aunits['attack_ship']=$('#left_side .attack_ship').children('.place_unit_black').html();
					gt_aunits['demolition_ship']=$('#left_side .demolition_ship').children('.place_unit_black').html();
					gt_aunits['big_transporter']=$('#left_side .unit_big_transporter').children('.place_unit_black').html();
					gt_aunits['trireme']=$('#left_side .unit_trireme').children('.place_unit_black').html();
					gt_aunits['colonize_ship']=$('#left_side .unit_colonize_ship').children('.place_unit_black').html();
					if(gt_aunits['militia']!=null){output=output+uW.GameData.units.militia.name+': '+gt_aunits['militia']+'\r';}
					if(gt_aunits['sword']!=null){output=output+uW.GameData.units.sword.name+': '+gt_aunits['sword']+'\r';}
					if(gt_aunits['slinger']!=null){output=output+uW.GameData.units.slinger.name+': '+gt_aunits['slinger']+'\r';}
					if(gt_aunits['archer']!=null){output=output+uW.GameData.units.archer.name+': '+gt_aunits['archer']+'\r';}
					if(gt_aunits['hoplite']!=null){output=output+uW.GameData.units.hoplite.name+': '+gt_aunits['hoplite']+'\r';}
					if(gt_aunits['rider']!=null){output=output+uW.GameData.units.rider.name+': '+gt_aunits['rider']+'\r';}
					if(gt_aunits['chariot']!=null){output=output+uW.GameData.units.chariot.name+': '+gt_aunits['chariot']+'\r';}
					if(gt_aunits['catapult']!=null){output=output+uW.GameData.units.catapult.name+': '+gt_aunits['catapult']+'\r';}
					if(gt_aunits['centaur']!=null){output=output+uW.GameData.units.centaur.name+': '+gt_aunits['centaur']+'\r';}
					if(gt_aunits['harpy']!=null){output=output+uW.GameData.units.harpy.name+': '+gt_aunits['harpy']+'\r';}
					if(gt_aunits['manticore']!=null){output=output+uW.GameData.units.manticore.name+': '+gt_aunits['manticore']+'\r';}
					if(gt_aunits['medusa']!=null){output=output+uW.GameData.units.medusa.name+': '+gt_aunits['medusa']+'\r';}
					if(gt_aunits['minotaur']!=null){output=output+uW.GameData.units.minotaur.name+': '+gt_aunits['minotaur']+'\r';}
					if(gt_aunits['pegasus']!=null){output=output+uW.GameData.units.pegasus.name+': '+gt_aunits['pegasus']+'\r';}
					if(gt_aunits['sea_monster']!=null){output=output+uW.GameData.units.sea_monster.name+': '+gt_aunits['sea_monster']+'\r';}
					if(gt_aunits['zyklop']!=null){output=output+uW.GameData.units.zyklop.name+': '+gt_aunits['zyklop']+'\r';}
					if(gt_aunits['small_transporter']!=null){output=output+uW.GameData.units.small_transporter.name+': '+gt_aunits['small_transporter']+'\r';}
					if(gt_aunits['bireme']!=null){output=output+uW.GameData.units.bireme.name+': '+gt_aunits['bireme']+'\r';}
					if(gt_aunits['attack_ship']!=null){output=output+uW.GameData.units.attack_ship.name+': '+gt_aunits['attack_ship']+'\r';}
					if(gt_aunits['demolition_ship']!=null){output=output+uW.GameData.units.demolition_ship.name+': '+gt_aunits['demolition_ship']+'\r';}
					if(gt_aunits['big_transporter']!=null){output=output+uW.GameData.units.big_transporter.name+': '+gt_aunits['big_transporter']+'\r';}
					if(gt_aunits['trireme']!=null){output=output+uW.GameData.units.trireme.name+': '+gt_aunits['trireme']+'\r';}
					if(gt_aunits['colonize_ship']!=null){output=output+uW.GameData.units.colonize_ship.name+': '+gt_aunits['colonize_ship']+'\r';}
				//Buildings
					output=output+'\r[b]'+$('#spy_buildings').children('h4').html()+'[/b]\r';
					var gt_b=[];
					gt_b['academy']=$('#building_academy').children('.place_unit_black').html();
					gt_b['barracks']=$('#building_barracks').children('.place_unit_black').html();
					gt_b['docks']=$('#building_docks').children('.place_unit_black').html();
					gt_b['farm']=$('#building_farm').children('.place_unit_black').html();
					gt_b['hide']=$('#building_hide').children('.place_unit_black').html();
					gt_b['ironer']=$('#building_ironer').children('.place_unit_black').html();
					gt_b['lumber']=$('#building_lumber').children('.place_unit_black').html();
					gt_b['main']=$('#building_main').children('.place_unit_black').html();
					gt_b['market']=$('#building_market').children('.place_unit_black').html();
					gt_b['place']=$('#building_place').children('.place_unit_black').html();
					gt_b['stoner']=$('#building_stoner').children('.place_unit_black').html();
					gt_b['storage']=$('#building_storage').children('.place_unit_black').html();
					gt_b['temple']=$('#building_temple').children('.place_unit_black').html();
					gt_b['wall']=$('#building_wall').children('.place_unit_black').html();
					if(gt_b['academy']!=null){output=output+trad.academy+': level '+gt_b['academy']+'\r';}
					if(gt_b['barracks']!=null){output=output+trad.barracks+': level '+gt_b['barracks']+'\r';}
					if(gt_b['docks']!=null){output=output+trad.docks+': level '+gt_b['docks']+'\r';}
					if(gt_b['farm']!=null){'Farm: level '+gt_b['farm']+'\r';}
					if(gt_b['hide']!=null){'Hide: level '+gt_b['hide']+'\r';}
					if(gt_b['ironer']!=null){output=output+trad.iron+': level '+gt_b['ironer']+'\r';}
					if(gt_b['lumber']!=null){output=output+trad.lumber+': level '+gt_b['lumber']+'\r';}
					if(gt_b['main']!=null){output=output+trad.main+': level '+gt_b['main']+'\r';}
					if(gt_b['market']!=null){output=output+trad.market+': level '+gt_b['market']+'\r';}
					if(gt_b['place']!=null){output=output+trad.place+': '+gt_b['place']+'\r';}
					if(gt_b['stoner']!=null){output=output+trad.stone+': level '+gt_b['stoner']+'\r';}
					if(gt_b['storage']!=null){output=output+trad.storage+': level '+gt_b['storage']+'\r';}
					if(gt_b['temple']!=null){output=output+trad.temple+': level '+gt_b['temple']+'\r';}
					if(gt_b['wall']!=null){output=output+trad.wall+': level '+gt_b['wall']+'\r';}
				output=output+'[/quote]';
				return(output);
			}
			function gt_attackReport(){
				var output='[quote]';
				//General
					att_town=$('#report_sending_town .town_name').children('a').html();
					att_name=$('#report_sending_town .town_owner').children('a').html();
					att_ally=$('#report_sending_town .town_owner_ally').children('a').html();
					def_town=$('#report_receiving_town .town_name').children('a').html();
					def_name=$('#report_receiving_town .town_owner').children('a').html();
					def_ally=$('#report_receiving_town .town_owner_ally').children('a').html();
					output=output+'[b][player]'+att_name+'[/player] ('+att_town+') attacks [player]'+def_name+'[/player] ('+def_town+')[/b]';
					output=output+'\r\r';
				//Ressources
					var morale=$.trim($('.morale').text());
					var luck=$.trim($('.luck').text());
					output=output+morale+'\r'+luck;
					output=output+'\r\r';
					var res=[];
					res['total']=$('#load').html();
					res['wood']=$('.wood_img').siblings('span').html();
					res['stone']=$('.stone_img').siblings('span').html();
					res['iron']=$('.iron_img').siblings('span').html();
					output=output+res['total']+'\r';
					output=output+trad.lumber+': '+res['wood']+'\r';
					output=output+trad.stone+': '+res['stone']+'\r';
					output=output+trad.iron+': '+res['iron']+'\r';
				//Attacker Units
					output=output+'\r[b]Attacker[/b]\r';
					var gt_aunits=[];
					gt_aunits['militia']=$('.report_side_attacker .unit_militia').children('.place_unit_black').html();
					gt_aunits['militia-l']=$('.report_side_attacker .unit_militia').siblings('span').html();
					gt_aunits['sword']=$('.report_side_attacker .unit_sword').children('.place_unit_black').html();
					gt_aunits['sword-l']=$('.report_side_attacker .unit_sword').siblings('span').html();
					gt_aunits['slinger']=$('.report_side_attacker .unit_slinger').children('.place_unit_black').html();
					gt_aunits['slinger-l']=$('.report_side_attacker .unit_slinger').siblings('span').html();
					gt_aunits['archer']=$('.report_side_attacker .unit_archer').children('.place_unit_black').html();
					gt_aunits['archer-l']=$('.report_side_attacker .unit_archer').siblings('span').html();
					gt_aunits['hoplite']=$('.report_side_attacker .unit_hoplite').children('.place_unit_black').html();
					gt_aunits['hoplite-l']=$('.report_side_attacker .unit_hoplite').siblings('span').html();
					gt_aunits['rider']=$('.report_side_attacker .unit_rider').children('.place_unit_black').html();
					gt_aunits['rider-l']=$('.report_side_attacker .unit_rider').siblings('span').html();
					gt_aunits['chariot']=$('.report_side_attacker .unit_chariot').children('.place_unit_black').html();
					gt_aunits['chariot-l']=$('.report_side_attacker .unit_chariot').siblings('span').html();
					gt_aunits['catapult']=$('.report_side_attacker .unit_catapult').children('.place_unit_black').html();
					gt_aunits['catapult-l']=$('.report_side_attacker .unit_catapult').siblings('span').html();
					gt_aunits['centaur']=$('.report_side_attacker .unit_centaur').children('.place_unit_black').html();
					gt_aunits['centaur-l']=$('.report_side_attacker .unit_centaur').siblings('span').html();
					gt_aunits['harpy']=$('.report_side_attacker .unit_harpy').children('.place_unit_black').html();
					gt_aunits['harpy-l']=$('.report_side_attacker .unit_harpy').siblings('span').html();
					gt_aunits['manticore']=$('.report_side_attacker .unit_manticore').children('.place_unit_black').html();
					gt_aunits['manticore-l']=$('.report_side_attacker .unit_manticore').siblings('span').html();
					gt_aunits['medusa']=$('.report_side_attacker .unit_medusa').children('.place_unit_black').html();
					gt_aunits['medusa-l']=$('.report_side_attacker .unit_medusa').siblings('span').html();
					gt_aunits['minotaur']=$('.report_side_attacker .unit_minotaur').children('.place_unit_black').html();
					gt_aunits['minotaur-l']=$('.report_side_attacker .unit_minotaur').siblings('span').html();
					gt_aunits['pegasus']=$('.report_side_attacker .unit_pegasus').children('.place_unit_black').html();
					gt_aunits['pegasus-l']=$('.report_side_attacker .unit_pegasus').siblings('span').html();
					gt_aunits['sea_monster']=$('.report_side_attacker .unit_sea_monster').children('.place_unit_black').html();
					gt_aunits['sea_monster-l']=$('.report_side_attacker .unit_sea_monster').siblings('span').html();
					gt_aunits['zyklop']=$('.report_side_attacker .unit_zyklop').children('.place_unit_black').html();
					gt_aunits['zyklop-l']=$('.report_side_attacker .unit_zyklop').siblings('span').html();
					gt_aunits['small_transporter']=$('.report_side_attacker .unit_small_transporter').children('.place_unit_black').html();
					gt_aunits['small_transporter-l']=$('.report_side_attacker .unit_small_transporter').siblings('span').html();
					gt_aunits['bireme']=$('.report_side_attacker .unit_bireme').children('.place_unit_black').html();
					gt_aunits['bireme-l']=$('.report_side_attacker .unit_bireme').siblings('span').html();
					gt_aunits['attack_ship']=$('.report_side_attacker .attack_ship').children('.place_unit_black').html();
					gt_aunits['attack_ship-l']=$('.report_side_attacker .attack_ship').siblings('span').html();
					gt_aunits['demolition_ship']=$('.report_side_attacker .demolition_ship').children('.place_unit_black').html();
					gt_aunits['demolition_ship-l']=$('.report_side_attacker .demolition_ship').siblings('span').html();
					gt_aunits['big_transporter']=$('.report_side_attacker .unit_big_transporter').children('.place_unit_black').html();
					gt_aunits['big_transporter-l']=$('.report_side_attacker .unit_big_transporter').siblings('span').html();
					gt_aunits['trireme']=$('.report_side_attacker .unit_trireme').children('.place_unit_black').html();
					gt_aunits['trireme-l']=$('.report_side_attacker .unit_trireme').siblings('span').html();
					gt_aunits['colonize_ship']=$('.report_side_attacker .unit_colonize_ship').children('.place_unit_black').html();
					gt_aunits['colonize_ship-l']=$('.report_side_attacker .unit_colonize_ship').siblings('span').html();
					if(gt_aunits['militia']!=null){output=output+uW.GameData.units.militia.name+': '+gt_aunits['militia']+' [color=#ff0000]'+gt_aunits['militia-l']+'[/color]\r';}
					if(gt_aunits['sword']!=null){output=output+uW.GameData.units.sword.name+': '+gt_aunits['sword']+' [color=#ff0000]'+gt_aunits['sword-l']+'[/color]\r';}
					if(gt_aunits['slinger']!=null){output=output+uW.GameData.units.slinger.name+': '+gt_aunits['slinger']+' [color=#ff0000]'+gt_aunits['slinger-l']+'[/color]\r';}
					if(gt_aunits['archer']!=null){output=output+uW.GameData.units.archer.name+': '+gt_aunits['archer']+' [color=#ff0000]'+gt_aunits['archer-l']+'[/color]\r';}
					if(gt_aunits['hoplite']!=null){output=output+uW.GameData.units.hoplite.name+': '+gt_aunits['hoplite']+' [color=#ff0000]'+gt_aunits['hoplite-l']+'[/color]\r';}
					if(gt_aunits['rider']!=null){output=output+uW.GameData.units.rider.name+': '+gt_aunits['rider']+' [color=#ff0000]'+gt_aunits['rider-l']+'[/color]\r';}
					if(gt_aunits['chariot']!=null){output=output+uW.GameData.units.chariot.name+': '+gt_aunits['chariot']+' [color=#ff0000]'+gt_aunits['chariot-l']+'[/color]\r';}
					if(gt_aunits['catapult']!=null){output=output+uW.GameData.units.catapult.name+': '+gt_aunits['catapult']+' [color=#ff0000]'+gt_aunits['catapult-l']+'[/color]\r';}
					if(gt_aunits['centaur']!=null){output=output+uW.GameData.units.centaur.name+': '+gt_aunits['centaur']+' [color=#ff0000]'+gt_aunits['centaur-l']+'[/color]\r';}
					if(gt_aunits['harpy']!=null){output=output+uW.GameData.units.harpy.name+': '+gt_aunits['harpy']+' [color=#ff0000]'+gt_aunits['harpy-l']+'[/color]\r';}
					if(gt_aunits['manticore']!=null){output=output+uW.GameData.units.manticore.name+': '+gt_aunits['manticore']+' [color=#ff0000]'+gt_aunits['manticore-l']+'[/color]\r';}
					if(gt_aunits['medusa']!=null){output=output+uW.GameData.units.medusa.name+': '+gt_aunits['medusa']+' [color=#ff0000]'+gt_aunits['medusa-l']+'[/color]\r';}
					if(gt_aunits['minotaur']!=null){output=output+uW.GameData.units.minotaur.name+': '+gt_aunits['minotaur']+' [color=#ff0000]'+gt_aunits['minotaur-l']+'[/color]\r';}
					if(gt_aunits['pegasus']!=null){output=output+uW.GameData.units.pegasus.name+': '+gt_aunits['pegasus']+' [color=#ff0000]'+gt_aunits['pegasus-l']+'[/color]\r';}
					if(gt_aunits['sea_monster']!=null){output=output+uW.GameData.units.sea_monster.name+': '+gt_aunits['sea_monster']+' [color=#ff0000]'+gt_aunits['sea_monster-l']+'[/color]\r';}
					if(gt_aunits['zyklop']!=null){output=output+uW.GameData.units.zyklop.name+': '+gt_aunits['zyklop']+' [color=#ff0000]'+gt_aunits['zyklop-l']+'[/color]\r';}
					if(gt_aunits['small_transporter']!=null){output=output+uW.GameData.units.small_transporter.name+': '+gt_aunits['small_transporter']+' [color=#ff0000]'+gt_aunits['small_transporter-l']+'[/color]\r';}
					if(gt_aunits['bireme']!=null){output=output+uW.GameData.units.bireme.name+': '+gt_aunits['bireme']+' [color=#ff0000]'+gt_aunits['bireme-l']+'[/color]\r';}
					if(gt_aunits['attack_ship']!=null){output=output+uW.GameData.units.attack_ship.name+': '+gt_aunits['attack_ship']+' [color=#ff0000]'+gt_aunits['attack_ship-l']+'[/color]\r';}
					if(gt_aunits['demolition_ship']!=null){output=output+uW.GameData.units.demolition_ship.name+': '+gt_aunits['demolition_ship']+' [color=#ff0000]'+gt_aunits['demolition_ship-l']+'[/color]\r';}
					if(gt_aunits['big_transporter']!=null){output=output+uW.GameData.units.big_transporter.name+': '+gt_aunits['big_transporter']+' [color=#ff0000]'+gt_aunits['big_transporter-l']+'[/color]\r';}
					if(gt_aunits['trireme']!=null){output=output+uW.GameData.units.trireme.name+': '+gt_aunits['trireme']+' [color=#ff0000]'+gt_aunits['trireme-l']+'[/color]\r';}
					if(gt_aunits['colonize_ship']!=null){output=output+uW.GameData.units.colonize_ship.name+': '+gt_aunits['colonize_ship']+' [color=#ff0000]'+gt_aunits['colonize_ship-l']+'[/color]\r';}
				//Defender Units
					output=output+'\r[b]Defender[/b]\r';
					var gt_dunits=[];
					gt_dunits['militia']=$('.report_side_defender .unit_militia').children('.place_unit_black').html();
					gt_dunits['militia-l']=$('.report_side_defender .unit_militia').siblings('span').html();
					gt_dunits['sword']=$('.report_side_defender .unit_sword').children('.place_unit_black').html();
					gt_dunits['sword-l']=$('.report_side_defender .unit_sword').siblings('span').html();
					gt_dunits['slinger']=$('.report_side_defender .unit_slinger').children('.place_unit_black').html();
					gt_dunits['slinger-l']=$('.report_side_defender .unit_slinger').siblings('span').html();
					gt_dunits['archer']=$('.report_side_defender .unit_archer').children('.place_unit_black').html();
					gt_dunits['archer-l']=$('.report_side_defender .unit_archer').siblings('span').html();
					gt_dunits['hoplite']=$('.report_side_defender .unit_hoplite').children('.place_unit_black').html();
					gt_dunits['hoplite-l']=$('.report_side_defender .unit_hoplite').siblings('span').html();
					gt_dunits['rider']=$('.report_side_defender .unit_rider').children('.place_unit_black').html();
					gt_dunits['rider-l']=$('.report_side_defender .unit_rider').siblings('span').html();
					gt_dunits['chariot']=$('.report_side_defender .unit_chariot').children('.place_unit_black').html();
					gt_dunits['chariot-l']=$('.report_side_defender .unit_chariot').siblings('span').html();
					gt_dunits['catapult']=$('.report_side_defender .unit_catapult').children('.place_unit_black').html();
					gt_dunits['catapult-l']=$('.report_side_defender .unit_catapult').siblings('span').html();
					gt_dunits['centaur']=$('.report_side_defender .unit_centaur').children('.place_unit_black').html();
					gt_dunits['centaur-l']=$('.report_side_defender .unit_centaur').siblings('span').html();
					gt_dunits['harpy']=$('.report_side_defender .unit_harpy').children('.place_unit_black').html();
					gt_dunits['harpy-l']=$('.report_side_defender .unit_harpy').siblings('span').html();
					gt_dunits['manticore']=$('.report_side_defender .unit_manticore').children('.place_unit_black').html();
					gt_dunits['manticore-l']=$('.report_side_defender .unit_manticore').siblings('span').html();
					gt_dunits['medusa']=$('.report_side_defender .unit_medusa').children('.place_unit_black').html();
					gt_dunits['medusa-l']=$('.report_side_defender .unit_medusa').siblings('span').html();
					gt_dunits['minotaur']=$('.report_side_defender .unit_minotaur').children('.place_unit_black').html();
					gt_dunits['minotaur-l']=$('.report_side_defender .unit_minotaur').siblings('span').html();
					gt_dunits['pegasus']=$('.report_side_defender .unit_pegasus').children('.place_unit_black').html();
					gt_dunits['pegasus-l']=$('.report_side_defender .unit_pegasus').siblings('span').html();
					gt_dunits['sea_monster']=$('.report_side_defender .unit_sea_monster').children('.place_unit_black').html();
					gt_dunits['sea_monster-l']=$('.report_side_defender .unit_sea_monster').siblings('span').html();
					gt_dunits['zyklop']=$('.report_side_defender .unit_zyklop').children('.place_unit_black').html();
					gt_dunits['zyklop-l']=$('.report_side_defender .unit_zyklop').siblings('span').html();
					gt_dunits['small_transporter']=$('.report_side_defender .unit_small_transporter').children('.place_unit_black').html();
					gt_dunits['small_transporter-l']=$('.report_side_defender .unit_small_transporter').siblings('span').html();
					gt_dunits['bireme']=$('.report_side_defender .unit_bireme').children('.place_unit_black').html();
					gt_dunits['bireme-l']=$('.report_side_defender .unit_bireme').siblings('span').html();
					gt_dunits['attack_ship']=$('.report_side_defender .attack_ship').children('.place_unit_black').html();
					gt_dunits['attack_ship-l']=$('.report_side_defender .attack_ship').siblings('span').html();
					gt_dunits['demolition_ship']=$('.report_side_defender .demolition_ship').children('.place_unit_black').html();
					gt_dunits['demolition_ship-l']=$('.report_side_defender .demolition_ship').siblings('span').html();
					gt_dunits['big_transporter']=$('.report_side_defender .unit_big_transporter').children('.place_unit_black').html();
					gt_dunits['big_transporter-l']=$('.report_side_defender .unit_big_transporter').siblings('span').html();
					gt_dunits['trireme']=$('.report_side_defender .unit_trireme').children('.place_unit_black').html();
					gt_dunits['trireme-l']=$('.report_side_defender .unit_trireme').siblings('span').html();
					gt_dunits['colonize_ship']=$('.report_side_defender .unit_colonize_ship').children('.place_unit_black').html();
					gt_dunits['colonize_ship-l']=$('.report_side_defender .unit_colonize_ship').siblings('span').html();
					if(gt_dunits['militia']!=null){output=output+uW.GameData.units.militia.name+': '+gt_dunits['militia']+' [color=#ff0000]'+gt_dunits['militia-l']+'[/color]\r';}
					if(gt_dunits['sword']!=null){output=output+uW.GameData.units.sword.name+': '+gt_dunits['sword']+' [color=#ff0000]'+gt_dunits['sword-l']+'[/color]\r';}
					if(gt_dunits['slinger']!=null){output=output+uW.GameData.units.slinger.name+': '+gt_dunits['slinger']+' [color=#ff0000]'+gt_dunits['slinger-l']+'[/color]\r';}
					if(gt_dunits['archer']!=null){output=output+uW.GameData.units.archer.name+': '+gt_dunits['archer']+' [color=#ff0000]'+gt_dunits['archer-l']+'[/color]\r';}
					if(gt_dunits['hoplite']!=null){output=output+uW.GameData.units.hoplite.name+': '+gt_dunits['hoplite']+' [color=#ff0000]'+gt_dunits['hoplite-l']+'[/color]\r';}
					if(gt_dunits['rider']!=null){output=output+uW.GameData.units.rider.name+': '+gt_dunits['rider']+' [color=#ff0000]'+gt_dunits['rider-l']+'[/color]\r';}
					if(gt_dunits['chariot']!=null){output=output+uW.GameData.units.chariot.name+': '+gt_dunits['chariot']+' [color=#ff0000]'+gt_dunits['chariot-l']+'[/color]\r';}
					if(gt_dunits['catapult']!=null){output=output+uW.GameData.units.catapult.name+': '+gt_dunits['catapult']+' [color=#ff0000]'+gt_dunits['catapult-l']+'[/color]\r';}
					if(gt_dunits['centaur']!=null){output=output+uW.GameData.units.centaur.name+': '+gt_dunits['centaur']+' [color=#ff0000]'+gt_dunits['centaur-l']+'[/color]\r';}
					if(gt_dunits['harpy']!=null){output=output+uW.GameData.units.harpy.name+': '+gt_dunits['harpy']+' [color=#ff0000]'+gt_dunits['harpy-l']+'[/color]\r';}
					if(gt_dunits['manticore']!=null){output=output+uW.GameData.units.manticore.name+': '+gt_dunits['manticore']+' [color=#ff0000]'+gt_dunits['manticore-l']+'[/color]\r';}
					if(gt_dunits['medusa']!=null){output=output+uW.GameData.units.medusa.name+': '+gt_dunits['medusa']+' [color=#ff0000]'+gt_dunits['medusa-l']+'[/color]\r';}
					if(gt_dunits['minotaur']!=null){output=output+uW.GameData.units.minotaur.name+': '+gt_dunits['minotaur']+' [color=#ff0000]'+gt_dunits['minotaur-l']+'[/color]\r';}
					if(gt_dunits['pegasus']!=null){output=output+uW.GameData.units.pegasus.name+': '+gt_dunits['pegasus']+' [color=#ff0000]'+gt_dunits['pegasus-l']+'[/color]\r';}
					if(gt_dunits['sea_monster']!=null){output=output+uW.GameData.units.sea_monster.name+': '+gt_dunits['sea_monster']+' [color=#ff0000]'+gt_dunits['sea_monster-l']+'[/color]\r';}
					if(gt_dunits['zyklop']!=null){output=output+uW.GameData.units.zyklop.name+': '+gt_dunits['zyklop']+' [color=#ff0000]'+gt_dunits['zyklop-l']+'[/color]\r';}
					if(gt_dunits['small_transporter']!=null){output=output+uW.GameData.units.small_transporter.name+': '+gt_dunits['small_transporter']+' [color=#ff0000]'+gt_dunits['small_transporter-l']+'[/color]\r';}
					if(gt_dunits['bireme']!=null){output=output+uW.GameData.units.bireme.name+': '+gt_dunits['bireme']+' [color=#ff0000]'+gt_dunits['bireme-l']+'[/color]\r';}
					if(gt_dunits['attack_ship']!=null){output=output+uW.GameData.units.attack_ship.name+': '+gt_dunits['attack_ship']+' [color=#ff0000]'+gt_dunits['attack_ship-l']+'[/color]\r';}
					if(gt_dunits['demolition_ship']!=null){output=output+uW.GameData.units.demolition_ship.name+': '+gt_dunits['demolition_ship']+' [color=#ff0000]'+gt_dunits['demolition_ship-l']+'[/color]\r';}
					if(gt_dunits['big_transporter']!=null){output=output+uW.GameData.units.big_transporter.name+': '+gt_dunits['big_transporter']+' [color=#ff0000]'+gt_dunits['big_transporter-l']+'[/color]\r';}
					if(gt_dunits['trireme']!=null){output=output+uW.GameData.units.trireme.name+': '+gt_dunits['trireme']+' [color=#ff0000]'+gt_dunits['trireme-l']+'[/color]\r';}
					if(gt_dunits['colonize_ship']!=null){output=output+uW.GameData.units.colonize_ship.name+': '+gt_dunits['colonize_ship']+' [color=#ff0000]'+gt_dunits['colonize_ship-l']+'[/color]\r';}
				output=output+'[/quote]';
				return(output);
			}
			//Containers and buttons
			$('.game_list_footer').append('<a class="button" href="#" style="float:right;" id="gt_bbc_show"><span class="left"></span><span class="middle">BBCode</span><span class="right"></span><span style="clear:both;"></span></a>');
			$('.game_list_footer').append('<a class="button" href="#" style="float:right;" id="gt_bbc_hide"><span class="left"></span><span class="middle">Report</span><span class="right"></span><span style="clear:both;"></span></a>');
			$('#report_report_header').after('<div class="game_body" id="gt_bbc"><textarea id="gt_bbc_focus" style="width:730px;height:300px;border:1px solid #ffcc66;"></textarea></div>').next().hide();
			$('#gt_bbc_hide').hide();
			//Check kind of report and execute function
			if($('#report_arrow').children('img').attr('src')=='/images/game/towninfo/espionage.png'){
				output=gt_spyReport();
			}else if($('#report_arrow').children('img').attr('src')=='/images/game/towninfo/attack.png'){
				output=gt_attackReport();
			}
			//Bug fixing
				if(gtWidgetsToggled==1){$('.gtwidget').hide();}
			//Add output to window
			$('#gt_bbc_focus').val(output);
			//Show/Hide BBCode
			$('#gt_bbc_show').click(function(){
				$('#report_game_body').hide();
				$('#gt_bbc').show();
				$('#gt_bbc_hide').show();
				$('#gt_bbc_show').hide();
			});
			$('#gt_bbc_hide').click(function(){
				$('#gt_bbc').hide();
				$('#report_game_body').show();
				$('#gt_bbc_hide').hide();
				$('#gt_bbc_show').show();
			});
		}
	//Building Levels
		if(location.href.match('game/index')){
			$('#map_town').append('<div style="top:200px;left:380px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.main.level+'</div');
			$('#map_town').append('<div style="top:90px;left:340px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.academy.level+'</div');
			$('#map_town').append('<div style="top:160px;left:260px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.barracks.level+'</div');
			$('#map_town').append('<div style="top:370px;left:330px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.docks.level+'</div');
			$('#map_town').append('<div style="top:110px;left:570px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.farm.level+'</div');
			$('#map_town').append('<div style="top:340px;left:380px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.hide.level+'</div');
			$('#map_town').append('<div style="top:20px;left:60px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.ironer.level+'</div');
			$('#map_town').append('<div style="top:430px;left:520px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.lumber.level+'</div');
			$('#map_town').append('<div style="top:200px;left:580px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.market.level+'</div');
			$('#map_town').append('<div style="top:290px;left:20px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.stoner.level+'</div');
			$('#map_town').append('<div style="top:250px;left:300px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.storage.level+'</div');
			$('#map_town').append('<div style="top:110px;left:10px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.temple.level+'</div');
			$('#map_town').append('<div style="top:220px;left:200px;z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;" class="gt_bl">'+gtBuildings.wall.level+'</div');
			$('.gt_bl').css({'padding':'1px'});
		}
	//Other
		if(gtWidgetsToggled==1){$('.gtwidget').hide();}
		widgetOffset=parseInt(widgetOffset);
		if((typeof(widgetOffset)=='number') && (widgetOffset.toString().indexOf('.')==-1)){
			var pos=10+widgetOffset+'px';
			$('.gtwidget').css({'left':pos});
		}
		if(aboutWidget=='disabled'){$('#widget_about').hide();}
		if(dispBL=='disabled'){$('.gt_bl').hide();}
});