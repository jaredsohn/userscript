// ==UserScript==
// @name            GrepoAssist
// @author		    LudoO
// @namespace       ludoo
// @version         1.0.3
// @description		Assistant for Grepolis game.
// @source          http://userscripts.org/scripts/show/82043
// @include         http://*.grepolis.com/*
// ==/UserScript==

/*
 * Migration of fabulous GrepoAssist
 * http://userscripts.org/scripts/show/71132
 *
 * Fixed a few bugs and refactored a little
 *
 * Works now in Chrome using thema : http://goo.gl/Jjvn
 *
 */
var uW, gm = this;
if (typeof unsafeWindow === 'object') {
    uW = unsafeWindow;
} else {
    uW = window;
}

//Access jQuery
var $ = uW.jQuery;

//Script Data
var gt_version = '1.0.2';

//Basic game data
var player = uW.Game.player_id;
var town = uW.Game.townId;
var ally = uW.Game.alliance_id;
var csrfToken = uW.Game.csrfToken;
var storage = uW.Layout.storage_volume;
var servertime = uW.Game.server_time;
var res = [];

var gtPrefMode = 0; //1 if currently editing preferences
var gtHelpMode = 0; //1 if currently reading help
var gtWidgetsToggled, playerName, allyName, dispBL, aboutWidget, widgetOffset;

//Notepad Data
var gtNotesInst = 7, gtNotes = [];

var gt_langs = 13, gtBuildings = {}, gtb;
var buildings = {
    main: {
        t: 200,
        l: 380
    },
    academy: {
        t: 90,
        l: 260
    },
    lumber: {
        t: 430,
        l: 520
    },
    farm: {
        t: 110,
        l: 570
    },
    stoner: {
        t: 290,
        l: 20
    },
    storage: {
        t: 250,
        l: 300
    },
    ironer: {
        t: 20,
        l: 60
    },
    barracks: {
        t: 160,
        l: 260
    },
    wall: {
        t: 220,
        l: 200
    },
    hide: {
        t: 340,
        l: 380
    },
    docks: {
        t: 370,
        l: 330
    },
    academy: {
        t: 90,
        l: 340
    },
    temple: {
        t: 1100,
        l: 10
    },
    market: {
        t: 200,
        l: 580
    },
    place: {},
    sim: {
        url: 'building_place?action=simulator'
    }
};

var language = [];

//Language specific data
var translation = {
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
		iron: "Argent",
	   	//Added i18n
		stoner: "Carrière",
		ironer: "Mine d'argent",
		farm: "Ferme",
		hide: "Grotte"
  },
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
var trad, lang = uW.location.href.substring(7, 9);
if (!translation[lang]) {
    lang = 'en';
}
trad = translation[lang];

/**
 * Start
 */
$(document).ready(function(){
    waitGM(function(){
        setTimeout(function(){
            grepotools.call(gm);
        }, 0);
    });
});


function waitGM(cb){
    if (typeof GM_getValue !== 'undefined') {
        cb();
    } else {
        setTimeout(function(){
            waitGM(cb);
        }, 100);
    }
}

function GM_save(name, value){
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    GM_setValue(name, value);
}

function GM_read(name, value){
    var value = GM_getValue(name);
    try {
        value = JSON.parse(value);
    } catch (e) {
        //
    }
    return value;
}

var rex = {
    unit_movements: {
        url: '/game/index?town_id=$town$',
        re: /UnitOverview.unit_movements\s=.*/
    }
};
function fillurl(url){
    return url.replace(/$player$/g, player).replace(/$town$/g, town).replace(/$ally$/g, ally).replace(/$token$/g, csrfToken);
}

function xhr(url, re, cb){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://' + window.location.host + fillurl(rex[re].url),
        onload: function(r){
            if (r.status == 4) {
                var t = r.responseText;
                if (t && rex[re]) {
                    var m = rex[re].exec(t);
                    if (m) {
                        t = m[0];
                    }
                }
                cb(t);
            }
        }
    });
}


//Function allowing to use GM_setValue on event
function GMset(string, value){
    setTimeout(function(){
        GM_setValue(string, value);
    }, 0);
}

function grepotools(){
    gtWidgetsToggled = GM_getValue('widgetsToggled');
    playerName = GM_getValue('playerName');
    allyName = GM_getValue('allyName');
    dispBL = GM_getValue('dispBL');
    aboutWidget = GM_getValue('dispAbout');
    widgetOffset = GM_getValue('wOffset');
    
    res['wood'] = uW.Layout.resources['wood'];
    res['stone'] = uW.Layout.resources['stone'];
    res['iron'] = uW.Layout.resources['iron'];
    res['wood-i'] = uW.Layout.production['wood'];
    res['stone-i'] = uW.Layout.production['stone'];
    res['iron-i'] = uW.Layout.production['iron'];
    res['fav'] = uW.Layout.favor;
    res['fav-i'] = uW.Layout.favor_production;
    
    //Preferences / Help
    if (gtWidgetsToggled != 1 && gtWidgetsToggled != 0) {
        GM_setValue('widgetsToggled', 0);
        gtWidgetsToggled = 0;
    }
    
    while (gtNotesInst >= 1) {
        gtNotes[gtNotesInst] = GM_getValue('notes' + gtNotesInst);
        if (typeof(gtNotes[gtNotesInst]) == 'undefined') {
            gtNotes[gtNotesInst] = 'Notes...';
        }
        --gtNotesInst;
    }
    
    language['fr'] = 'french/francais';
    language['de'] = 'german/deutsch';
    language['es'] = 'spanish/espanol';
    language['pl'] = 'polish/polski';
    language['hu'] = 'hungarian/magyar';
    language['pt'] = 'portugese';
    language['ro'] = 'romanian/rom�na';
    language['cz'] = 'czech/Ce�tina';
    language['it'] = 'italian/italiano';
    language['gr'] = 'greek';
    language['nl'] = 'dutch';
    language['sv'] = 'swedish/svenska ';
    language['en'] = 'english';
    
    var me = this;
    //Building Levels - Get
    if (location.href.match('game/building_main')) {
        gtb = uW.BuildingMain;
        gtb.b = gtb.buildings;
        gtBuildings = gtb.b || {};
        for (var i = 0, len = buildings.length; i < len; i++) {
            //$.each(buildings, function(i, o){
            if (gtb.b[i]) {
                GM_setValue('gtb_' + i + '_level', gtb.b[i].level);
            }
        }
        //);
    } else {
        gtBuildings = {};
        for (var i = 0, len = buildings.length; i < len; i++) {
            //$.each(buildings, function(i, o){
            gtBuildings[i] = gtBuildings[i] || {};
            gtBuildings[d].level = GM_getValue('gtb_' + i + '_level');
        }
        //);
    }
    
    //General stuff
    $('body').append('<div id="cache" style="display:none;"></div>');
    $('.report_translation').empty().html('<div id="gt_notepad_trigger" style="height:40px;margin:6px;position:relative;top:8px;padding-top:10px;color:#ffcc66;">Notepad</div>');
    //Additional ressources info
    $('#res').css({
        'height': '75px'
    });
    $('#res').append('<div id="gt_res" style="position:relative;top:55px;text-align:left;height:22px;text-align:center;color:#ffcc66;"></div>');
    $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">' + res['wood-i'] + '</div>');
    $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">' + res['stone-i'] + '</div>');
    $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">' + res['iron-i'] + '</div>');
    if (res['fav-i'] > 0) {
        $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;"></div>');
        $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;"></div>');
        $('#gt_res').append('<div class="gt_res-inner" style="width:64px;height:22px;float:left;margin-right:3px;padding-top:2px;">' + res['fav-i'] + '</div>');
    }
    $('.gt_res-inner').css({
        'background': 'url(/images/game/layout/bg_resources.png) repeat-x 0px -32px'
    });
    //Other style-related stuff
    $('#advisers').remove();
    $('#report_translation_dialog_tmpl').remove();
    $('#report_list').css({
        'font-size': '10px'
    });
    $('#message_list').css({
        'font-size': '10px'
    });
    //Extern Tools
    var world = uW.location.href.substring(7, 10);
    if (world.substring(2, 3) == '.') {
        world = world.substring(0, 2) + '1';
    }
    var gt_gs_player = 'http://www.grepostats.com/world/' + world + '/player/' + player;
    var gt_gs_ally = 'http://www.grepostats.com/world/' + world + '/alliance/' + ally;
    $('#menu').append('<div id="gt_gs_container" style="text-align:center;background-color:#ffeebb;position:absolute;top:415px;width:150px;margin-left:12px;"></div>');
    var html = '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>';
    html += '<div class="game_border_top" style="float:left;height:10px;width:130px;"></div>';
    html += '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>';
    html += '<div class="game_border_left" style="float:left;width:10px;height:70px;"></div>';
    html += '<div id="gt_gs" style="float:left;width:130px;height:70px;font-size:10px;"></div>';
    html += '<div class="game_border_right" style="float:left;width:10px;height:70px;"></div>';
    html += '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>';
    html += '<div class="game_border_bottom" style="float:left;height:10px;width:130px;"></div>';
    html += '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>';
    $('#gt_gs_container').append(html);
    $('#gt_gs').append('<span style="font-size:10px;text-decoration:underline;">Extern Tools</span>' +
    '<div style="text-align:left;"><a href="http://www.grepostats.com/">Grepostats</a> (<a href="' +
    gt_gs_player +
    '" target="_blank">You</a>, <a href="' +
    gt_gs_ally +
    '" target="_blank">Your Ally</a>)</div>');
    $('#gt_gs').children('div').append(' <a href="http://www.grepolismaps.org/">GrepolisMaps</a>');
    $('#gt_gs a').css({
        'font-size': '10px'
    });
    //BBCodes
    $('#message_bbcodes').append('<div style="float:left;width:100px;height:14px;margin-top:4px;">GrepoAssist:</div>' +
    '<a title="Me" href="#" id="gt_bb_player"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -88px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>' +
    '<a title="My Ally" href="#" id="gt_bb_ally"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -110px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>' +
    '<a title="My Town" href="#" id="gt_bb_town"><span style="float: left; background: url(&quot;/images-1/game/bbcodes.png&quot;) no-repeat scroll -132px 0px transparent; padding-left: 0px; padding-bottom: 0px; margin-right: 4px; width: 21px; height: 21px;"></span></a>' +
    '<a class="button"  href="#" style="float:left;position:relative;top:-2px;" id="gt_bb_init"><span class="left"></span><span class="middle">Reinitialize</span><span class="right"></span><span style="clear:both;"></span></a>');
    $('#gt_bb_player').click(function(){
        $('textarea').val($('textarea').val() + '[player]' + playerName + '[/player]');
    });
    $('#gt_bb_ally').click(function(){
        $('textarea').val($('textarea').val() + '[ally]' + allyName + '[/ally]');
    });
    $('#gt_bb_town').click(function(){
        $('textarea').val($('textarea').val() + '[town]' + town + '[/town]');
    });
    $('#gt_bb_init').click(function(){
        $('textarea').val('');
    });
    //Navigation
    //General Stuff
    //$('#link_index').before('<span style="font-size:16px;font-weight:bold;color:#ffcc66;text-decoration:underline;">Navigation</span>');
    $('#link_ranking').next().append('<span style="color:#FFCC66;"> | </span><a href="http://forum.' + lang + '.grepolis.com" target="_blank">Forum</a>').next().remove();
    var temp = $('#link_report').next().next().html();
    $('#link_report').next().next().remove();
    $('#link_report').next().append('<span style="color:#FFCC66;"> | </span>' + temp);
    $('#links ul').append('<span style="font-size:16px;font-weight:bold;color:#ffcc66;text-decoration:underline;">GrepoAssist</span>' +
    '<li><a id="w_pref" style="font-size:10px;font-weight:bold;">Preferences</a><span style="color:#FFCC66;"> | </span><a id="w_help" style="font-size:10px;font-weight:bold;">Help</a></li>' +
    '<li id="w_toggle"><a style="font-size:10px;font-weight:bold;">Show/Hide</a></li>');
    $('#links a').css({
        'display': 'inline',
        'font-size': '10px'
    });
    $('body').append('<style>#links a:hover{background:none;}#links li:hover{background:url(/images/game/layout/menu_hover.png)no-repeat ;}</style>');
    //Toggling Widgets
    $('#w_toggle').click(function(){
        if (gtWidgetsToggled == 0) {
            $('.gtwidget').hide();
            gtWidgetsToggled = 1;
            GMset('widgetsToggled', 1);
        } else {
            $('.gtwidget').show();
            gtWidgetsToggled = 0;
            GMset('widgetsToggled', 0);
        }
    });
    //Preferences
    $('#cache').append('<div id="gt_pref" style="padding:10px;position:absolute;left:23px;height:465px;width:760px;text-align:left;overflow-x:hidden;overflow-y:hidden;"></div>');
    $('#gt_pref').append('<a href="#" id="gt_pref_quit" class="main_tasks_cancel" style="float:right;position:relative;left:0px;top:-2px;"></a>' +
    '<div style="text-align:center;height:40px;font-weight:bold;">GrepoAssist - General Preferences</div>' +
    '<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Your name:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_name" style="border:1px solid;" value="' +
    playerName +
    '" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_name_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>' +
    '<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Your alliance\'s name:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_ally" style="border:1px solid;" value="' +
    allyName +
    '" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_ally_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>' +
    '<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:225px;float:left;">Levels on town overview:</div><div style="width:85px;float:left;"><select id="gt_pref_bl" style="border:1px solid;"><option>enabled</option><option>disabled</option></select></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_bl_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>' +
    '<div style="text-align:center;height:40px;margin-top:30px;font-weight:bold;">GrepoAssist - Widgets Preferences</div>' +
    '<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:225px;float:left;">"About GrepoAssist" widget:</div><div style="width:85px;float:left;"><select id="gt_pref_about" style="border:1px solid;"><option>enabled</option><option>disabled</option></select></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_about_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>' +
    '<div style="height:30px;overflow:auto;padding-top:1px;"><div style="width:160px;float:left;">Widgets position:</div><div style="width:150px;float:left;"><input type="text" id="gt_pref_offset" style="border:1px solid;" value="' +
    widgetOffset +
    '" /></div><a class="button"  href="#" style="float:left;position:relative;top:-4px;" id="gt_pref_offset_button"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a></div>' +
    '<div style="font-size:12px;color:#0174DF;padding:20px;padding-top:0px;padding-bottom:0pxe;">The position is set relative to the normal position, and is given in pixel. Example: "200" in order to move the widgets 200 pixels to the right; "-10" in order to move then 10 pixels left.</div>');
    $('#w_pref').click(function(){
        if (gtPrefMode == 0) {
            $('#gt_help').appendTo('#cache');
            gtHelpMode = 0;
            $('#content').hide();
            $('#gt_pref').appendTo('#content_box');
            gtPrefMode = 1;
        } else if (gtPrefMode == 1) {
            $('#gt_help').appendTo('#cache');
            gtHelpMode = 0;
            $('#content').show();
            $('#gt_pref').appendTo('#cache');
            $('.temp').remove();
            gtPrefMode = 0;
        }
    });
    $('#gt_pref_quit').click(function(){
        $('#content').show();
        $('#gt_pref').appendTo('#cache');
        $('.temp').remove();
        gtPrefMode = 0;
        gtHelpMode = 0;
    });
    $('#gt_pref_name_button').click(function(){
        GMset('playerName', $('#gt_pref_name').val());
        $(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
    });
    $('#gt_pref_ally_button').click(function(){
        GMset('allyName', $('#gt_pref_ally').val());
        $(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
    });
    $('#gt_pref_bl_button').click(function(){
        GMset('dispBL', $('#gt_pref_bl').val());
        if ($('#gt_pref_bl').val() == 'enabled') {
            $('.gt_bl').show();
        } else {
            $('.gt_bl').hide();
        }
        $(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
    });
    $('#gt_pref_about_button').click(function(){
        GMset('dispAbout', $('#gt_pref_about').val());
        if ($('#gt_pref_about').val() == 'enabled') {
            $('#widget_about').show();
        } else {
            $('#widget_about').hide();
        }
        $(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
    });
    $('#gt_pref_offset_button').click(function(){
        GMset('wOffset', $('#gt_pref_offset').val());
        $(this).parent().append(' <span class="temp" style="color:#04B404;position:relative;left:10px;">saved!</span>');
        widgetOffset = $('#gt_pref_offset').val();
        widgetOffset = parseInt(widgetOffset);
        if ((typeof(widgetOffset) == 'number') && (widgetOffset.toString().indexOf('.') == -1)) {
            var pos = 10 + widgetOffset + 'px';
            $('.gtwidget').css({
                'left': pos
            });
        }
    });
    //Help
    $('#cache').append('<div id="gt_help" style="padding:10px;position:absolute;left:23px;height:465px;width:760px;text-align:left;overflow-x:hidden;overflow-y:hidden;"></div>');
    $('#gt_help').append('<a href="#" id="gt_help_quit" class="main_tasks_cancel" style="float:right;position:relative;left:0px;top:-2px;"></a>' +
    '<div style="text-align:center;height:40px;font-weight:bold;">GrepoAssist - Help</div>' +
    '<span style="font-weight:bold;">Languages</span><br /><br />' +
    'GrepoAssist automatically gets your game language through the URL. Currently (version ' +
    gt_version +
    '), ' +
    gt_langs +
    ' languages are supported. ' +
    '<span style="font-weight:bold;">Special BBCode</span><br /><br />' +
    'The additional BBCode options do respectively add your player link, your ally link and your current town link. In order for the first two to work, you have to enter your player name and alliance name in the preferences, only one time of course.<br /><br />' +
    '<span style="font-weight:bold;">Notepad</span><br /><br />' +
    'Through the notepad you can save up to 7 sheets of notes. They are saved permanently on that computer. Note: You have to save a sheet before switching to another one, otherwise the content will not be saved.<br /><br />');
    $('#w_help').click(function(){
        if (gtHelpMode == 0) {
            $('#gt_pref').appendTo('#cache');
            gtPrefMode = 0;
            $('#content').hide();
            $('#gt_help').appendTo('#content_box');
            gtHelpMode = 1;
        } else if (gtHelpMode == 1) {
            $('#gt_pref').appendTo('#cache');
            gtPrefMode = 0;
            $('#content').show();
            $('#gt_help').appendTo('#cache');
            gtHelpMode = 0;
        }
    });
    $('#gt_help_quit').click(function(){
        $('#content').show();
        $('#gt_help').appendTo('#cache');
        gtHelpMode = 0;
        gtPrefMode = 0;
    });
    //Widgets
    //Language Widget
    $('#cache').append('<div id="widget_lang" class="gtwidget" style="width:200px;height:16px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;padding:2px;text-align:left;font-size:10px;"></div>');
    $('#widget_lang').append('Language: ' + language[lang]);
    $('#widget_lang').appendTo('body').draggable();
    $('#widget_lang').css({
        'position': 'absolute',
        'top': '10px',
        'left': '10px'
    });
    var h1 = $('#widget_lang').height() + 20;
    h1 = h1 + 'px';
    //Buildings Widget
    $('#cache').append('<div id="widget_buildings" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;padding:2px;text-align:left;font-size:10px;"></div>');
    $('#widget_buildings').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">Buildings</div>');
    //Links
    var html = '';
    $.each(buildings, function(id, o){
        var url = (o.url) ? (o.url + '&') : ('building_' + id + '?');
        html += '<a href="' + url + 'town_id=' + town + '">' + trad[id];
        if (gtBuildings[id] && gtBuildings[id].level) {
            html += '(' + gtBuildings[id].level + ')';
        }
        html += '</a><br/>';
    });
    $('#widget_buildings').append(html);
    $('#widget_buildings').appendTo('body').draggable();
    $('#widget_buildings').css({
        'position': 'absolute',
        'top': h1,
        'left': '10px',
        'color': '#ffcc66'
    });
    $('#widget_buildings a').css({
        'color': '#ffcc66'
    });
    var h2 = $('#widget_lang').height() + $('#widget_buildings').height() + 30;
    h2 = h2 + 'px';
    //Storage Widget
    $('#cache').append('<div id="widget_storage" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
    $('#widget_storage').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">' + trad.storage + '</div>');
    //Storage countdowns
    $('#widget_storage').append('<div>' + trad.lumber + ': <span id="widget_storage_wood" style="font-size:14px;"></span></div>' +
    '<div>' +
    trad.stone +
    ': <span id="widget_storage_stone" style="font-size:14px;"></span></div>' +
    '<div>' +
    trad.iron +
    ': <span id="widget_storage_iron" style="font-size:14px;"></span></div>');
    setInterval(counters, 1000);
    var wood_c = parseInt(storage - res['wood']) / res['wood-i'] * 3600;
    var stone_c = parseInt(storage - res['stone']) / res['stone-i'] * 3600;
    var iron_c = parseInt(storage - res['iron']) / res['iron-i'] * 3600;
    function counters(){
        if (wood_c > 0) {
            --wood_c;
        }
        if (stone_c > 0) {
            --stone_c;
        }
        if (iron_c > 0) {
            --iron_c;
        }
        if (wood_c <= 3600) {
            $('#widget_storage_wood').css({
                'color': '#FF0000'
            });
        }
        if (stone_c <= 3600) {
            $('#widget_storage_stone').css({
                'color': '#FF0000'
            });
        }
        if (iron_c <= 3600) {
            $('#widget_storage_iron').css({
                'color': '#FF0000'
            });
        }
        var wc_w_h = parseInt(wood_c / 3600);
        var wc_w_m = parseInt((wood_c - wc_w_h * 3600) / 60);
        var wc_w_s = parseInt((wood_c - wc_w_h * 3600 - wc_w_m * 60));
        var wc_s_h = parseInt(stone_c / 3600);
        var wc_s_m = parseInt((stone_c - wc_s_h * 3600) / 60);
        var wc_s_s = parseInt((stone_c - wc_s_h * 3600 - wc_s_m * 60));
        var wc_i_h = parseInt(iron_c / 3600);
        var wc_i_m = parseInt((iron_c - wc_i_h * 3600) / 60);
        var wc_i_s = parseInt((iron_c - wc_i_h * 3600 - wc_i_m * 60));
        $('#widget_storage_wood').html(wc_w_h + ':' + wc_w_m + ':' + wc_w_s);
        $('#widget_storage_stone').html(wc_s_h + ':' + wc_s_m + ':' + wc_s_s);
        $('#widget_storage_iron').html(wc_i_h + ':' + wc_i_m + ':' + wc_i_s);
    }
    $('#widget_storage').appendTo('body').draggable();
    $('#widget_storage').css({
        'position': 'absolute',
        'top': h2,
        'left': '10px',
        'color': '#ffcc66'
    });
    var h3 = $('#widget_lang').height() + $('#widget_buildings').height() + $('#widget_storage').height() + 56;
    h3 = h3 + 'px';
    //Troop Movements
    $('#cache').append('<div id="widget_troops" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
    $('#widget_troops').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">Troop Movements</div>');
    $('#widget_troops').appendTo('body').draggable();
    $('#widget_troops').css({
        'position': 'absolute',
        'top': h3,
        'left': '10px',
        'color': '#ffcc66'
    });
    //if (location.href.match('game/index')) {
    if (uW.UnitOverview) {
        GM_save('unit_movements', uW.UnitOverview.unit_movements || {});
    } else {
        var b = GM_read('unit_movements');
        uW.UnitOverview = {
            unit_movements: b
        };
    }
    
    if (uW.UnitOverview && uW.UnitOverview.unit_movements) {
        $.each(uW.UnitOverview.unit_movements, function(x, gt_tm){
            $('#widget_troops').append('<div id="gt_troops_' + x + '"></div>');
            if (gt_tm.type == 'ask_farm_for_resources') {
                $('#gt_troops_' + x).append('Resources: ' + gt_tm.town.name_short);
            } else if (gt_tm.type == 'farm_attack') {
                $('#gt_troops_' + x).append('Farm: ' + gt_tm.town.name_short);
            } else if (gt_tm.type == 'attack_land') {
                $('#gt_troops_' + x).append('Attack: ' + gt_tm.town.name_short);
            } else if (gt_tm.type == 'attack') {
                $('#gt_troops_' + x).append('Attack: ' + gt_tm.town.name_short);
            } else if (gt_tm.type == 'attack_sea') {
                $('#gt_troops_' + x).append('Sea attack: ' + gt_tm.town.name_short);
            }
            if (gt_tm.incoming == true) {
                $('#gt_troops_' + x).append(' < ');
            } else {
                $('#gt_troops_' + x).append(' > ');
            }
            $('#gt_troops_' + x).append('<span id="gt_troops_' + x + 'b"></span>');
            $('#gt_troops_' + x + 'b').countdown(gt_tm.arrival_at);
            if (gt_tm.type == 'attack' && gt_tm.incoming == true) {
                $('#gt_troops_' + x).css({
                    'color': '#FF0000'
                });
            }
        });
    } else {
        $('#widget_troops').append('<div>[bug:known] Working on fix.</div>');
    }
    var h3 = $('#widget_lang').height() + $('#widget_buildings').height() + $('#widget_storage').height() + $('#widget_troops').height() + 66;
    h3 = h3 + 'px';
    //About GrepoAssist Widget
    $('#cache').append('<div id="widget_about" class="gtwidget" style="width:200px;background-color:#3B3B3B;color:#ffcc66;z-index:1000;opacity:0.8;border:1px solid;text-align:left;padding:2px;text-align:left;font-size:10px;"></div>');
    $('#widget_about').append('<div style="text-align:center;font-size:12px;margin-bottom:4px;">About GrepoAssist</div>' +
    'Version: ' +
    gt_version +
    '<br />' +
    'Languages: ' +
    gt_langs +
    '<br />' +
    '<div style="text-align:center;"><a href="http://userscripts.org/scripts/show/82043" target="_blank">Check for newer version.</a></div>');
    $('#widget_about').appendTo('body').draggable();
    $('#widget_about').css({
        'position': 'absolute',
        'top': h3,
        'left': '10px',
        'color': '#ffcc66'
    });
    //Notepad
    $('body').append('<div id="gt_notepad" style="padding:10px;width:300px;height:390px;background-color:#FFFFFF;position:absolute;top:10px;left:10px;z-index:1000;background:url(/images/game/layout/content.jpg) no-repeat -30px 0px;border:1px solid #3B3B3B;border-top:none;"></div>');
    $('#gt_notepad').append('<div style="font-size:14px;font-weight:bold;margin-bottom:15px;">GrepoAssist Notepad <span id="gt_notepad_ino"></span><a href="#" id="gt_notepad_quit" class="main_tasks_cancel" style="float:right;position:relative;top:0px;left:0px;">X</a></div>'+
	'<div id="gt_notepad_menu" style="height:24px;"></div>'+
	'<div id="gt_notepad_content" style="height:310px;background-color:#FFFFFF;"><div id="gt_notepad_content_top" style="height:10px;"></div><div id="gt_notepad_content_mid" style="height:290px;"></div><div id="gt_notepad_content_bot" style="height:10px;"></div></div>');
    $('#gt_notepad_content_top').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png);"></div>'+
    '<div class="game_border_top" style="float:left;height:10px;width:280px;"></div>'+
    '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -10px;"></div>');
    $('#gt_notepad_content_mid').append('<div class="game_border_left" style="float:left;width:10px;height:290px;"></div>'+
    '<textarea id="gt_notepad_focus" style="float:left;width:280px;height:280px;border:none;margin:0;padding:0;"></textarea>'+
    '<div class="game_border_right" style="float:left;width:10px;height:290px;"></div>');
    $('#gt_notepad_content_bot').append('<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -30px;"></div>'+
    '<div class="game_border_bottom" style="float:left;height:10px;width:280px;"></div>'+
    '<div style="float:left;width:10px;height:10px;background: url(/images/game/border/edge.png) 0px -20px;"></div>');
    $('#gt_notepad').append('<a class="button"  href="#" style="float:right;" id="gt_notepad_save"><span class="left"></span><span class="middle">Save</span><span class="right"></span><span style="clear:both;"></span></a>'+
    '<a href="#" style="position:relative;top:3px;width:64px;height:21px;float:right;margin-right:3px;padding-top:2px;background:url(/images/game/layout/bg_resources.png) repeat-x 0px -32px" id="gt_notepad_reset">Reset</a>'+
    '<a href="#" style="position:relative;top:3px;width:64px;height:21px;float:right;margin-right:3px;padding-top:2px;background:url(/images/game/layout/bg_resources.png) repeat-x 0px -32px" id="gt_notepad_clear">Clear</a>');
    $('#gt_notepad').draggable();
    $('body').append('<style>#gt_notepad a{color:#ffcc66;}</style>');
    $('#gt_notepad_focus').val(gtNotes[1]);
    $('#gt_notepad_trigger').click(function(){
        $('#gt_notepad').toggle();
    });
    $('#gt_notepad_quit').click(function(){
        $('#gt_notepad').hide();
    });
    for (var ino = 1; ino < 8; ino++) {
		 $('<a href="#" id="gt_notepad_'+ino+'" class="paginator_bg" style="margin-right:3px;">'+ino+'</a>')
		 .appendTo($('#gt_notepad_menu'))
		 .click(function(){
			var _ino = $(this).attr('id').replace('gt_notepad_','');
			$('#gt_notepad_ino').text(_ino);
			$('#gt_notepad_focus').val(gtNotes[_ino]);
            gtNotesInst = _ino;
         });
    }
    $('#gt_notepad_save').click(function(){
        gtNotes[gtNotesInst] = $('#gt_notepad_focus').val();
        if (gtNotesInst > 0 && gtNotesInst < 8) {
            GMset('notes' + gtNotesInst, gtNotes[gtNotesInst]);
        }
    });
    $('#gt_notepad_clear').click(function(){
        $('#gt_notepad_focus').val('');
    });
    $('#gt_notepad_reset').click(function(){
        $('#gt_notepad_focus').val(gtNotes[gtNotesInst]);
    });
    $('#gt_notepad').hide();
    //Battle Report Converter
    if (location.href.match('report')) {
        //Convert BBCode functions
        function gt_spyReport(){
            var output = '[quote]';
            //General
            att_town = $('#report_sending_town .town_name').children('a').html();
            att_name = $('#report_sending_town .town_owner').children('a').html();
            att_ally = $('#report_sending_town .town_owner_ally').children('a').html();
            def_town = $('#report_receiving_town .town_name').children('a').html();
            def_name = $('#report_receiving_town .town_owner').children('a').html();
            def_ally = $('#report_receiving_town .town_owner_ally').children('a').html();
            output += '[b][player]' + att_name + '[/player] (' + att_town + ') spied on [player]' + def_name + '[/player] (' + def_town + ')[/b]';
            output += '\r\r';
            //Ressources
            output += '[b]Ressources[/b]\r';
            var res = [];
            res['wood'] = $.trim($('.wood_img').siblings('span').html());
            res['stone'] = $('.stone_img').siblings('span').html();
            res['iron'] = $('.iron_img').siblings('span').html();
            res['total'] = parseInt(res['wood']) + parseInt(res['stone']) + parseInt(res['iron']);
            output += trad.lumber + ': ' + res['wood'] + '\r';
            output += trad.stone + ': ' + res['stone'] + '\r';
            output += trad.iron + ': ' + res['iron'] + '\r';
            output += 'Total: ' + res['total'] + '\r';
            //Units
            output += '\r[b]' + $('#left_side').children('h4').html() + '[/b]\r';
            var gt_aunits = [];
            gt_aunits['militia'] = $('#left_side .unit_militia').children('.place_unit_black').html();
            gt_aunits['sword'] = $('#left_side .unit_sword').children('.place_unit_black').html();
            gt_aunits['slinger'] = $('#left_side .unit_slinger').children('.place_unit_black').html();
            gt_aunits['archer'] = $('#left_side .unit_archer').children('.place_unit_black').html();
            gt_aunits['hoplite'] = $('#left_side .unit_hoplite').children('.place_unit_black').html();
            gt_aunits['rider'] = $('#left_side .unit_rider').children('.place_unit_black').html();
            gt_aunits['chariot'] = $('#left_side .unit_chariot').children('.place_unit_black').html();
            gt_aunits['catapult'] = $('#left_side .unit_catapult').children('.place_unit_black').html();
            gt_aunits['centaur'] = $('#left_side .unit_centaur').children('.place_unit_black').html();
            gt_aunits['harpy'] = $('#left_side .unit_harpy').children('.place_unit_black').html();
            gt_aunits['manticore'] = $('#left_side .unit_manticore').children('.place_unit_black').html();
            gt_aunits['medusa'] = $('#left_side .unit_medusa').children('.place_unit_black').html();
            gt_aunits['minotaur'] = $('#left_side .unit_minotaur').children('.place_unit_black').html();
            gt_aunits['pegasus'] = $('#left_side .unit_pegasus').children('.place_unit_black').html();
            gt_aunits['sea_monster'] = $('#left_side .unit_sea_monster').children('.place_unit_black').html();
            gt_aunits['zyklop'] = $('#left_side .unit_zyklop').children('.place_unit_black').html();
            gt_aunits['small_transporter'] = $('#left_side .unit_small_transporter').children('.place_unit_black').html();
            gt_aunits['bireme'] = $('#left_side .unit_bireme').children('.place_unit_black').html();
            gt_aunits['attack_ship'] = $('#left_side .attack_ship').children('.place_unit_black').html();
            gt_aunits['demolition_ship'] = $('#left_side .demolition_ship').children('.place_unit_black').html();
            gt_aunits['big_transporter'] = $('#left_side .unit_big_transporter').children('.place_unit_black').html();
            gt_aunits['trireme'] = $('#left_side .unit_trireme').children('.place_unit_black').html();
            gt_aunits['colonize_ship'] = $('#left_side .unit_colonize_ship').children('.place_unit_black').html();
            $.each(gt_aunits, function(i, o){
                if (o != null) {
                    output += uW.GameData.units[i].name + ': ' + gt_aunits[i] + '\r';
                }
            });
            //Buildings
            output += '\r[b]' + $('#spy_buildings').children('h4').html() + '[/b]\r';
            var gt_b = [];
            gt_b['academy'] = $('#building_academy').children('.place_unit_black').html();
            gt_b['barracks'] = $('#building_barracks').children('.place_unit_black').html();
            gt_b['docks'] = $('#building_docks').children('.place_unit_black').html();
            gt_b['farm'] = $('#building_farm').children('.place_unit_black').html();
            gt_b['hide'] = $('#building_hide').children('.place_unit_black').html();
            gt_b['ironer'] = $('#building_ironer').children('.place_unit_black').html();
            gt_b['lumber'] = $('#building_lumber').children('.place_unit_black').html();
            gt_b['main'] = $('#building_main').children('.place_unit_black').html();
            gt_b['market'] = $('#building_market').children('.place_unit_black').html();
            gt_b['place'] = $('#building_place').children('.place_unit_black').html();
            gt_b['stoner'] = $('#building_stoner').children('.place_unit_black').html();
            gt_b['storage'] = $('#building_storage').children('.place_unit_black').html();
            gt_b['temple'] = $('#building_temple').children('.place_unit_black').html();
            gt_b['wall'] = $('#building_wall').children('.place_unit_black').html();
            $.each(gt_b, function(i, o){
                if (o != null) {
                    output += trad[i] + ': level ' + gt_b[i] + '\r';
                }
            });
            output += '[/quote]';
            return (output);
        }
        function gt_attackReport(){
            var output = '[quote]';
            //General
            att_town = $('#report_sending_town .town_name').children('a').html();
            att_name = $('#report_sending_town .town_owner').children('a').html();
            att_ally = $('#report_sending_town .town_owner_ally').children('a').html();
            def_town = $('#report_receiving_town .town_name').children('a').html();
            def_name = $('#report_receiving_town .town_owner').children('a').html();
            def_ally = $('#report_receiving_town .town_owner_ally').children('a').html();
            output += '[b][player]' + att_name + '[/player] (' + att_town + ') attacks [player]' + def_name + '[/player] (' + def_town + ')[/b]';
            output += '\r\r';
            //Ressources
            var morale = $.trim($('.morale').text());
            var luck = $.trim($('.luck').text());
            output += morale + '\r' + luck;
            output += '\r\r';
            var res = [];
            res['total'] = $('#load').html();
            res['wood'] = $('.wood_img').siblings('span').html();
            res['stone'] = $('.stone_img').siblings('span').html();
            res['iron'] = $('.iron_img').siblings('span').html();
            output += res['total'] + '\r';
            output += trad.lumber + ': ' + res['wood'] + '\r';
            output += trad.stone + ': ' + res['stone'] + '\r';
            output += trad.iron + ': ' + res['iron'] + '\r';
            //Attacker Units
            output += '\r[b]Attacker[/b]\r';
            var gt_aunits = [];
            gt_aunits['militia'] = $('.report_side_attacker .unit_militia').children('.place_unit_black').html();
            gt_aunits['sword'] = $('.report_side_attacker .unit_sword').children('.place_unit_black').html();
            gt_aunits['slinger'] = $('.report_side_attacker .unit_slinger').children('.place_unit_black').html();
            gt_aunits['archer'] = $('.report_side_attacker .unit_archer').children('.place_unit_black').html();
            gt_aunits['hoplite'] = $('.report_side_attacker .unit_hoplite').children('.place_unit_black').html();
            gt_aunits['rider'] = $('.report_side_attacker .unit_rider').children('.place_unit_black').html();
            gt_aunits['chariot'] = $('.report_side_attacker .unit_chariot').children('.place_unit_black').html();
            gt_aunits['catapult'] = $('.report_side_attacker .unit_catapult').children('.place_unit_black').html();
            gt_aunits['centaur'] = $('.report_side_attacker .unit_centaur').children('.place_unit_black').html();
            gt_aunits['harpy'] = $('.report_side_attacker .unit_harpy').children('.place_unit_black').html();
            gt_aunits['manticore'] = $('.report_side_attacker .unit_manticore').children('.place_unit_black').html();
            gt_aunits['medusa'] = $('.report_side_attacker .unit_medusa').children('.place_unit_black').html();
            gt_aunits['minotaur'] = $('.report_side_attacker .unit_minotaur').children('.place_unit_black').html();
            gt_aunits['pegasus'] = $('.report_side_attacker .unit_pegasus').children('.place_unit_black').html();
            gt_aunits['sea_monster'] = $('.report_side_attacker .unit_sea_monster').children('.place_unit_black').html();
            gt_aunits['zyklop'] = $('.report_side_attacker .unit_zyklop').children('.place_unit_black').html();
            gt_aunits['small_transporter'] = $('.report_side_attacker .unit_small_transporter').children('.place_unit_black').html();
            gt_aunits['bireme'] = $('.report_side_attacker .unit_bireme').children('.place_unit_black').html();
            gt_aunits['attack_ship'] = $('.report_side_attacker .attack_ship').children('.place_unit_black').html();
            gt_aunits['demolition_ship'] = $('.report_side_attacker .demolition_ship').children('.place_unit_black').html();
            gt_aunits['big_transporter'] = $('.report_side_attacker .unit_big_transporter').children('.place_unit_black').html();
            gt_aunits['trireme'] = $('.report_side_attacker .unit_trireme').children('.place_unit_black').html();
            gt_aunits['colonize_ship'] = $('.report_side_attacker .unit_colonize_ship').children('.place_unit_black').html();
            $.each(gt_aunits, function(i, o){
                output += uW.GameData.units[i].name + ': ' + gt_aunits[i] + ' [color=#ff0000]' + gt_aunits[i + '-l'] + '[/color]\r';
            });
            $.each(gt_aunits, function(i, o){
                gt_dunits[i + '-l'] = $('.report_side_attacker .' + i).siblings('span').html();
            });
            
            //Defender Units
            output += '\r[b]Defender[/b]\r';
            var gt_dunits = [];
            gt_dunits['militia'] = $('.report_side_defender .unit_militia').children('.place_unit_black').html();
            gt_dunits['sword'] = $('.report_side_defender .unit_sword').children('.place_unit_black').html();
            gt_dunits['slinger'] = $('.report_side_defender .unit_slinger').children('.place_unit_black').html();
            gt_dunits['archer'] = $('.report_side_defender .unit_archer').children('.place_unit_black').html();
            gt_dunits['hoplite'] = $('.report_side_defender .unit_hoplite').children('.place_unit_black').html();
            gt_dunits['rider'] = $('.report_side_defender .unit_rider').children('.place_unit_black').html();
            gt_dunits['chariot'] = $('.report_side_defender .unit_chariot').children('.place_unit_black').html();
            gt_dunits['catapult'] = $('.report_side_defender .unit_catapult').children('.place_unit_black').html();
            gt_dunits['centaur'] = $('.report_side_defender .unit_centaur').children('.place_unit_black').html();
            gt_dunits['harpy'] = $('.report_side_defender .unit_harpy').children('.place_unit_black').html();
            gt_dunits['manticore'] = $('.report_side_defender .unit_manticore').children('.place_unit_black').html();
            gt_dunits['medusa'] = $('.report_side_defender .unit_medusa').children('.place_unit_black').html();
            gt_dunits['minotaur'] = $('.report_side_defender .unit_minotaur').children('.place_unit_black').html();
            gt_dunits['pegasus'] = $('.report_side_defender .unit_pegasus').children('.place_unit_black').html();
            gt_dunits['sea_monster'] = $('.report_side_defender .unit_sea_monster').children('.place_unit_black').html();
            gt_dunits['zyklop'] = $('.report_side_defender .unit_zyklop').children('.place_unit_black').html();
            gt_dunits['small_transporter'] = $('.report_side_defender .unit_small_transporter').children('.place_unit_black').html();
            gt_dunits['bireme'] = $('.report_side_defender .unit_bireme').children('.place_unit_black').html();
            gt_dunits['attack_ship'] = $('.report_side_defender .attack_ship').children('.place_unit_black').html();
            gt_dunits['demolition_ship'] = $('.report_side_defender .demolition_ship').children('.place_unit_black').html();
            gt_dunits['big_transporter'] = $('.report_side_defender .unit_big_transporter').children('.place_unit_black').html();
            gt_dunits['trireme'] = $('.report_side_defender .unit_trireme').children('.place_unit_black').html();
            gt_dunits['colonize_ship'] = $('.report_side_defender .unit_colonize_ship').children('.place_unit_black').html();
            $.each(gt_dunits, function(i, o){
                if (o) {
                    output += uW.GameData.units[i].name + ': ' + gt_dunits[i] + ' [color=#ff0000]' + gt_dunits[i + '-l'] + '[/color]\r';
                }
            });
            $.each(gt_dunits, function(i, o){
                gt_dunits[i + '-l'] = $('.report_side_defender .' + i).siblings('span').html();
            });
            
            output += '[/quote]';
            return (output);
        }
        //Containers and buttons
        $('.game_list_footer').append('<a class="button" href="#" style="float:right;" id="gt_bbc_show"><span class="left"></span><span class="middle">BBCode</span><span class="right"></span><span style="clear:both;"></span></a>');
        $('.game_list_footer').append('<a class="button" href="#" style="float:right;" id="gt_bbc_hide"><span class="left"></span><span class="middle">Report</span><span class="right"></span><span style="clear:both;"></span></a>');
        $('#report_report_header').after('<div class="game_body" id="gt_bbc"><textarea id="gt_bbc_focus" style="width:730px;height:300px;border:1px solid #ffcc66;"></textarea></div>').next().hide();
        $('#gt_bbc_hide').hide();
        //Check kind of report and execute function
        if ($('#report_arrow').children('img').attr('src') == '/images/game/towninfo/espionage.png') {
            output = gt_spyReport();
        } else if ($('#report_arrow').children('img').attr('src') == '/images/game/towninfo/attack.png') {
            output = gt_attackReport();
        }
        //Bug fixing
        if (gtWidgetsToggled == 1) {
            $('.gtwidget').hide();
        }
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
    if (location.href.match('game/index')) {
        GM_addStyle('#map_town .gt_bl{z-index:10;float:left;position:absolute;background-color:#FFFFFF;border:1px solid;opacity:0.6;}');
        var html = '';
        $.each(buildings, function(i, o){
            if (gtBuildings[i] && gtBuildings[i].level && o.t) {
                html += '<div style="top:' + o.t + 'px;left:' + o.l + 'px;" class="gt_bl">' + gtBuildings[i].level + '</div';
            }
        });
        $('#map_town').append(html);
        $('.gt_bl').css({
            'padding': '1px'
        });
    }
    //Other
    if (gtWidgetsToggled == 1) {
        $('.gtwidget').hide();
    }
    widgetOffset = parseInt(widgetOffset);
    if ((typeof(widgetOffset) == 'number') && (widgetOffset.toString().indexOf('.') == -1)) {
        var pos = 10 + widgetOffset + 'px';
        $('.gtwidget').css({
            'left': pos
        });
    }
    if (aboutWidget == 'disabled') {
        $('#widget_about').hide();
    }
    if (dispBL == 'disabled') {
        $('.gt_bl').hide();
    }
};
