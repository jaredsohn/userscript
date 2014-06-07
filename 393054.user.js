// ==UserScript==
// @name        	DoA Power Tools Plus IV (update by DragonWar)
// @description		Power Tools for Dragons of Atlantis
// @grant			GM_xmlhttpRequest
// @grant			GM_info
// @grant			GM_setValue
// @grant			GM_getValue
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/*/game*
// @match         *://www.kabam.com/dragons-of-atlantis/play
// @match         *://www.kabam.com/*/dragons-of-atlantis/*
// @match         *://www.kongregate.com/games/kabam/dragons-of-atlantis
// @match         *://www.kongregate.com/games/kabam/dragons-of-atlantis*
// @match         *://www.agame.com/game/dragons-of-atlantis*
// @match         *://www.agame.com/plinga/gadget/spil/Atlantis*
// @match         *://*.yahoo.com/game/dragons-of-atlantis*
// @match         *://*.yahooapis.com/*
// @match         *://apps.yahoo.com/-iframe/mDuFjS4e/*
// @match         *://*.yahoo.com/*
// @include       *://www.kongregate.com/games/kabam/dragons-of-atlantis*
// @include       *://www.agame.com/game/dragons-of-atlantis*
// @include       *://www.agame.com/plinga/gadget/spil/Atlantis*
// @include       *://www.kabam.com/dragons-of-atlantis/play
// @include       *://www.kabam.com/*/dragons-of-atlantis/*
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/*/game*
// @include       *://*.yahoo.com/game/dragons-of-atlantis*
// @include       *://*.yahooapis.com/*
// @include       *://apps.yahoo.com/-iframe/mDuFjS4e/*
// @include       *://*.yahoo.com/*
// @exclude       *://apps.facebook.com/dragonsofatlantis/rubies
// @exclude       *://apps.facebook.com/ai.php*
// @exclude       *://www.facebook.com/plugins/like.php*
// @exclude       *://kabam1-a.akamaihd.net/pixelkabam/*
// @exclude       *://*.akamaihd.net/pixelkabam/*
// @exclude       *://plus.google.com/_/apps-static/*
// @exclude       *://plus.google.com/u/0/_/gadgets/contactPicker*
// @exclude       *://accounts.google.com/*
// @exclude       *://talkgadget.google.com/*
// @exclude       *://www.googleapis.com/static*
// @exclude		  *://realmtheraindoa.altervista.org/*
// @version			2014.02.18
// @changeLog		View description
// ==/UserScript==

/*
	===== TO DO EVERYTIME WHEN PACKAGING CHROME EXTENSION =====
	!! Change CHROME_EXT here and version in manifest.json before packing !!
*/

(function() {

var CHROME_EXT = false;
var scriptVersion = '2014.02.18';
var scriptId	  = '18016';

var LAST_CHANGES = '';
var LAST_CHANGES_FR = '';

var chrome_extensions = 'chrome://chrome/extensions/';
var userscripts_src  = 'http://userscripts.org/scripts/source/'+scriptId+'.user.js'; 

/* To remove header bar "play | rubies | ...." */
var REMOVE_HD = false;

/* Set layout on kabam.com */
if ((/dragons-of-atlantis\/play/.test(window.location.href)) && window.location.href.indexOf("kabam.com") !== -1)
	setTimeout(function(){document.getElementById('promo-sidebar').style.display = 'none';
		var to_remove = document.getElementById('promo-sidebar').parentNode;
		to_remove.parentNode.removeChild(to_remove);
	},7000);

/* Check to see if script is running in an iframe or not and removes unnecessary elements before continuing with the script. */
if (/(pixelkabam|akamaihd|plugins|ai\.php|talkgadget|notifications|contactPicker|accounts|googleapis\.com\/static)/.test(window.location.href)) return;

if ( !( (/apps\.facebook\.com\/dragonsofatlantis/.test(window.location.href) && /rubies/.test(window.location.pathname) == false) ||
 		/castle\.wonderhill\.com\/platforms\/.+\/game/.test(window.location.href) ||
 		/plus\.google\.com.*\/games.*\/659749063556/.test(window.location.href)         || 
 		/plus\.google\.com.*\/games\/play\/659749063556/.test(window.location.href)         || 
 		/googleusercontent\.com\/gadgets\/.*\/659749063556/.test(window.location.href)  || 
 		/kabam.com\/dragons-of-atlantis\/play/.test(window.location.href)	||
 		/kongregate.com\/games\/kabam\/dragons-of-atlantis/.test(window.location.href)	||
 		(/realmtheraindoa.altervista.org\/*/.test(window.location.href)	&& !/realmtheraindoa.altervista.org\/Jeux\/*/.test(window.location.href)) ||
 		/wackoscripts.com\/realm*/.test(window.location.href)
 	)){
 		return;
}
var REALM_URL = '';

function debugLog (data) {
	if (window.console && console.log) console.log(data);
}
function hide_all(body, game_container) {
	if (body.childNodes) {
		var child_elements = body.childNodes;
		for (var c=0; c<child_elements.length; c++) {
			var child = child_elements[c];
			if (child.id && child.id == game_container) {
				child.style.width = '100%';
				child.style.margin = '0';
				child.style.border = '0';
				child.style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
			} else {
				var depend = content_dependant(child);
				if (!depend) {
					if (child.tagName == 'DIV' || child.tagName == 'IFRAME' || child.tagName == 'TABLE') {
						child.style.width = '0%';
						child.style.display = 'none';
					} else hide_all (child, game_container);
				} else {
					if (child.tagName == 'DIV' || child.tagName == 'IFRAME' || child.tagName == 'TABLE' || child.tagName == 'TD') {
						child.style.padding = '0px';
						child.style.width = '100%';
						child.style.margin = '0';
						child.style.border = '0';
						child.style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
					}
					hide_all (child, game_container);
				}
			}
		}
		function content_dependant (tag) {
			if (!tag.childNodes) return (false);
			var child_list = tag.childNodes;
			var found = false;
			for (var x=0; x<child_list.length && !found; x++) {
				if (child_list[x].id && child_list[x].id == game_container) found = true;
				else found = content_dependant (child_list[x]);
			}
			return found;
		}
	}
}
function setHD (element) {
	if (element.parentNode) {
		var parent_element = element.parentNode;
		setHD (parent_element);
		if (parent_element.tagName == 'DIV' || parent_element.tagName == 'IFRAME' || parent_element.tagName == 'TABLE' || parent_element.tagName == 'TD') {
			parent_element.style.width = '100%';
			parent_element.style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
		}
	}
}
function make_space_for_kongregate(frame,width) {
	var maxWidth = (width ? width : (document.body.offsetWidth - 50)+'px');
	if (frame) {
		if (frame.width) frame.width = maxWidth;
		else if (frame.style.width) frame.style.width = maxWidth;
		else frame.setAttribute("style", "width: "+maxWidth+";");
	}
}
if (window.top === window.self) {
	function setWide() {
		if ( window.location.href.indexOf('facebook') !== -1 ) {
			iframe	 = document.getElementById('iframe_canvas');
			platform = 'facebook';
		}
		else if ( window.location.href.indexOf("google") !== -1 ) {
			game_frame = 'oz-gadgets-canvas-iframe-659749063556';
			iframe	 = document.getElementById('oz-gadgets-canvas-iframe-659749063556');
			platform = 'google';
		}
		else if ( window.location.href.indexOf("kongregate.com") !== -1 ) {
			game_frame = 'gameiframe';
			iframe	 = document.getElementById('gameiframe');
			platform = 'kongregate';
		}
		else if ( window.location.href.indexOf("kabam.com") !== -1 ) {
			iframe	 = document.getElementById('game_frame');
			platform = 'kabam';
		}
		else if ( window.location.href.indexOf("altervista.org") !== -1 || window.location.href.indexOf("wackoscripts.com/realm") !== -1 ) {
			iframe = 'none';
			platform = 'altervista';
		}
		if (!iframe || iframe.length < 1) {
			setTimeout (setWide, 1000);
			return;
		}
		var background_118446 = localStorage.getItem( '118446_background' );
		var USE_BACKGROUND = (background_118446 && background_118446 != undefined && background_118446 != null) ? eval(background_118446) : true;
		switch (platform) {
			case 'facebook' :
				while ((iframe = iframe.parentNode) != null) {
					if (iframe.tagName == 'DIV')
						iframe.style.width = '100%';
				}
				document.getElementById('rightCol').style.display = 'none';
				document.getElementById('rightCol').style.display = 'none';
				document.getElementById('blueBarHolder').style.display = 'none';
				document.getElementById('blueBar').style.display = 'none';
				document.getElementById('pageHead').style.display = 'none';
				document.getElementById('jewelContainer').style.display = 'none';
				document.getElementById('headNav').style.display = 'none';
				document.getElementById('contentCol').style.margin = '0px';
				document.getElementById('contentCol').style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
				var contentColChild = document.getElementById('contentCol').childNodes;
				for (var i=0; i<contentColChild.length; i++)
					if (contentColChild[i].tagName == 'DIV')
						contentColChild[i].style.margin = '0px';
				document.scrollTop = '42px';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++)
						body_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
				}
				break;
			case 'kabam' :
				iframe.style.width = '100%';
				iframe.style.margin = '0';
				iframe.style.border = '0';
				if (USE_BACKGROUND)
					iframe.style.backgroundColor = 'transparent';
				else
					iframe.style.backgroundColor = 'white';
				while ((iframe = iframe.parentNode) != null) {
					if (iframe.tagName == 'DIV') {
						iframe.style.width = '100%';
						iframe.style.margin = '0';
						iframe.style.border = '0';
						iframe.style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
					}
				}
				break;
			case 'altervista' :
				if (!document.getElementsByTagName('head')) {
					var header = document.createElement ('head');
					var html_elements = document.getElementsByTagName ('html');
					html_elements[0].appendChild(header);
				}
				if (document.getElementsByTagName('link').length <= 0) {
					var ss = document.createElement("link"); 
					ss.type = "text/css"; 
					ss.rel = "stylesheet"; 
					ss.media = "screen"; 
					ss.href = "https://kabam1-a.akamaihd.net/castle/stylesheets/chomped/common_258783ec84eaa8c2ad74bf6168ec24317be52dab.css"; 
					document.getElementsByTagName('head')[0].appendChild(ss); 
					var ss = document.createElement("link"); 
					ss.type = "text/css"; 
					ss.rel = "stylesheet"; 
					ss.media = "screen"; 
					ss.href = "https://kabam1-a.akamaihd.net/castle/stylesheets/chomped/facebook_37fbd906939be51243d0becafcb7aca6edbc3a8f.css"; 
					document.getElementsByTagName('head')[0].appendChild(ss); 
				}
				var centers = document.getElementsByTagName ('center');
				for (var el=0; el < centers.length; el++) {
					var old_elem = centers[el];
					var new_elem = document.createElement ('div');
					new_elem.id = 'altervista_div'+el;
					old_elem.parentNode.appendChild(new_elem);
					while (old_elem.hasChildNodes())
						new_elem.appendChild(old_elem.removeChild(old_elem.firstChild));
				}
				var object = document.getElementsByTagName('object');
				if (object) initScript(object);
				break;
			default :
				if (platform == 'kongregate') setTimeout (function(){make_space_for_kongregate(document.getElementById('gameiframe'),undefined)}, 10000);
				var top_body = document.getElementsByTagName ('body');
				for (var el=0; el < top_body.length; el++) {
					if (top_body[el].id) debugLog ('top_body['+el+'].id = '+top_body[el].id);
					hide_all (top_body[el], game_frame);
				}
				var frame = document.getElementById(game_frame);
				if (frame) {
					if (frame.width) frame.width = '100%';
					frame.style.width = '100%';
					frame.setAttribute("style", "width: 100%;");
				}
				break;
		}
	}
	setWide();
} else {
	platform = document.body.className.split(' ');
	if (platform && platform[0]){
		platform = platform[0].replace(/(platforms_|_game)/g,'');
	} else {
		platform = 'google';
	}
	var errors = 0;
	function setHigh() {
		clearTimeout;
		/* Custom treatment for intermediate iframe */
		if (document.getElementById('game_frame')) setTimeout (function(){make_space_for_kongregate(document.getElementById('game_frame'),'100%')}, 10000);
		var object = document.getElementsByTagName('object');
		if (object.length < 1) {
			if ( ++errors > 6 ){
				errors = 0;
				window.location =  window.location.href;
			}
			setTimeout (setHigh, 1000);
			return;
		}
		var background_118446 = localStorage.getItem( '118446_background' );
		var USE_BACKGROUND = (background_118446 && background_118446 != undefined && background_118446 != null) ? eval(background_118446) : true;
		switch (platform) {
			case 'facebook' :
				REALM_URL = 'http://apps.facebook.com/dragonsofatlantis/realm/';
				for (var i=0; i<object.length; i++) {
					switch (object[i].parentNode.id) {
						case 'hd' :
							object[i].style.display = 'none'; 
							break;
						default :
							object[i].parentNode.style.margin = '0px';
					}
				}
				document.getElementById('hd').parentNode.style.width = '760px';
				var hdChild = document.getElementById('hd').childNodes;
				for (var i=0; i<hdChild.length; i++) {
					if (hdChild[i].tagName == 'DIV') hdChild[i].style.display = 'none';
					if (hdChild[i].tagName == 'IFRAME') hdChild[i].style.display = 'none';
				}
				document.getElementById('ft').style.display = 'none';
				document.scrollTop = '42px';
				if (REMOVE_HD) document.getElementById('hd').style.display = 'none';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++)
						body_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
					var html_elements = document.getElementsByTagName ('html');
					for (var el=0; el < html_elements.length; el++)
						html_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
				}
				break;
			case 'google' :
				document.getElementById('pane_hd').style.display = 'none';
				if (USE_BACKGROUND) {
					var body_elements = document.getElementsByTagName ('body');
					for (var el=0; el < body_elements.length; el++) {
						body_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
						body_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
					}
				}
				break;
			case 'kabam' :
				var html_elements = document.getElementsByTagName ('html');
				for (var el=0; el < html_elements.length; el++) {
					html_elements[el].style.overflow = 'hidden'
					html_elements[el].style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
				}
				if (!USE_BACKGROUND) document.body.style.background = '#888 url(http://www.heberger-image.fr/data/images/11663_dragonsd_dragons_fire_people_and_monsters_1382215.jpg)';
				document.getElementById('cn').style.textAlign = 'left';
				if (document.getElementById('castlemania_swf')) setHD(document.getElementById('castlemania_swf'));
				break;
		}
		initScript(object);
	}
	setHigh();
}



function initScript (SWF_OBJECT) {
var UID = {};
var UIDN = {};

    function makeUID(len){
        var len = ( len != undefined ? len : 20);
        var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','u','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','U','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_'];
    	var uid = chars[Math.floor(Math.random()*54)];
    	for(var i = 0; i < len; i++)
    	{
    		uid += chars[Math.floor(Math.random()*64)];
    	}
    	return uid;
    }
    function getUID(name){
    	return UID[name] != undefined ? UID[name] : name;
    }
    function setUID(name){
    	var uid = makeUID();
    	while(UIDN[uid] != undefined){
    		uid = makeUID();
    	}
    	UIDN[uid] = 1;
    	UID[name] = uid;
    	return uid;
    }
    function parseQuotedVars(str){
        var obj = {};
    	var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
    	var match;
    	while ((match = pattern.exec(str)) != null){
    		obj[match[1]] = match[3];
    	}
    	return obj;
    }
    function getFlashVars (swf){
    	/* "use strict"; */
    	var params = swf.innerHTML;
    	var pattern = /\<\s*param\s*(.*?)\>/gi;
    	var attrs={};
    	var args, match, p;
    	while ((match = pattern.exec(params)) != null){
    		var p = parseQuotedVars(match[1]);
    		if (p.name && p.name == 'flashvars'){
    			args = decodeEntity(p.value).split('&');
    			for (var i=0; i < args.length; i++)	{
    				var v = args[i].split('=');
    				attrs[v[0].strip()] = v[1].strip();
    			}
    			break;
    		}
    	}
    	/* will have to enhance this if they change the names ... */
    	C.attrs.apiServer	= attrs.api_server;
    	C.attrs.sessionId	= attrs.session_id;
    	C.attrs.dragonHeart = attrs.dragon_heart;
    	C.attrs.userId		= attrs.user_id;
    	C.attrs.locale		= attrs.locale;
    	USER_ID		 		= attrs.user_id;
    	S3_SERVER	 		= attrs.s3_server;
    	S3_SWF_PREFIX		= attrs.s3_swf_prefix;
    	PUB_SERVER	 		= attrs.pub_server;
    	PUB_PORT			= attrs.pub_port;
    	MAP_BIN_CACHEBREAKER = attrs.map_bin_cachebreaker;
    	SERVER_ID	 		= ( /realm(\d+)\./.exec( attrs.api_server ) || ['',''] )[1];
    	url_versions		= C.attrs.apiServer;
    	if (url_versions.indexOf('/api') > 0)
    		url_versions = url_versions.substring(0,url_versions.indexOf('/api'));
    }

/* All global variables MUST be set here or they will not be available to all functions throughout the script.*/
var api_version = 'overarch', scriptName = 'Doa Power Tools IV', mainAuthor = 'DragonWar';
/* Skins */
var urlBackgroundImage = '', urlBackgroundLogo  = 'http://img28.imageshack.us/img28/9260/9hbh.png';
/* Styles List */
var styleList = [ 'btn_blue', 'blue', 'btn_cyan', 'btn_green', 'btn_on', 'btn_off', 'btn_red', 'btn_purple', 'btn_red', 'btn_yellow', 'bold_red', 'compact_table',
 'content', 'content_table', 'defending', 'hiding', 'popup_bar', 'popup_close', 'popup_main', 'popup_outer', 'popup_top', 'row_headers', 'row_style', 'row_top_headers',
 'row_headers_left', 'scrollable', 'status_feedback', 'status_report', 'status_ticker', 'subtitle', 'support_link', 'table', 'table_console', 'table_headers', 'table_targets',
 'table_wrap', 'title', 'red', 'green', 'btn_disabled', 'title_main', 'info_protect', 'info_alerts', 'info_boosts' ];

/* Tab order */
var INFO_TAB_ORDER = 1,
    JOBS_TAB_ORDER = 2,
    ALLIANCE_TAB_ORDER = 3,
    WAVE_TAB_ORDER = 4,
    ATTACK_TAB_ORDER = 5,
    SINGLE_TAB_ORDER = 6,
    SEARCH_TAB_ORDER = 10,
    TOWER_TAB_ORDER = 11,
    WALL_TAB_ORDER = 12,
    OPTIONS_TAB_ORDER = 20,
    WHEEL_TAB_ORDER = 21,
    BOOKMARK_TAB_ORDER = 30,
    MULTI_TAB_ORDER = 31,
    SPY_TAB_ORDER = 32,
    INBOX_TAB_ORDER = 50,
    LOG_TAB_ORDER = 99;

/* Tab enable/disable */
var ALLIANCE_TAB_ENABLE = true,
    ATTACK_TAB_ENABLE = true,
    BOOKMARK_TAB_ENABLE = true,
    INBOX_TAB_ENABLE = true,
    INFO_TAB_ENABLE = true,
    JOBS_TAB_ENABLE = true,
    LOG_TAB_ENABLE = true,
    MULTI_TAB_ENABLE = true,
    OPTIONS_TAB_ENABLE = true,
    WHEEL_TAB_ENABLE = true,
    SEARCH_TAB_ENABLE = true,
    SINGLE_TAB_ENABLE = true,
    SPY_TAB_ENABLE = true,
    TOWER_TAB_ENABLE = true,
    WALL_TAB_ENABLE = true,
    WAVE_TAB_ENABLE = true;

/* Global variables */
var DEBUG_TRACE_AJAX = 2,
    DEBUG_MARCHES = false,
    E429_TIMER = 0,
    E429_DELAY = 3600,
    TILE_DELAY = 2250,
    MAP_DELAY = 1250,
    MIN_DELAY = 20,
    EMULATE_NET_ERROR = 0,
    MIN_DELAY_BETWEEN_WAVE = 20;

var BUTTON_BGCOLOR = '#436',
    JOB_BUTTON_BGCOLOR = '#436';

/* Message handling */
var MESSAGES_ALL = 0,
    MESSAGES_ONLY = 1,
    REPORTS_ONLY = 2,
    MAX_READ = 120,
    MAX_DELETE = 30;

/* Capital and outposts IDs */
var CAPITAL = {id:0, type:'capital', name:'', dragon_name:'CityGreatDragon'},
    SPECTRAL_OUTPOST = {id:1, type:'spectral', name:'SpectralDragonOutpost', dragon_name:''},
    ICE_OUTPOST = {id:2, type:'ice', name:'IceDragonOutpost', dragon_name:'IceDragon'},
    SWAMP_OUTPOST = {id:3, type:'swamp', name:'SwampDragonOutpost', dragon_name:'SwampDragon'},
    FOREST_OUTPOST = {id:4, type:'forest', name:'ForestDragonOutpost', dragon_name:'ForestDragon'},
    DESERT_OUTPOST = {id:5, type:'desert', name:'DesertDragonOutpost', dragon_name:'DesertDragon'},
    WATER_OUTPOST = {id:6, type:'water', name:'WaterDragonOutpost', dragon_name:'WaterDragon'},
    STONE_OUTPOST = {id:7, type:'stone', name:'StoneDragonOutpost', dragon_name:'StoneDragon'},
    FIRE_OUTPOST = {id:8, type:'fire', name:'FireDragonOutpost', dragon_name:'FireDragon'},
    WIND_OUTPOST = {id:9, type:'wind', name:'WindDragonOutpost', dragon_name:'WindDragon'},
    CHRONO_OUTPOST = {id:10, type:'chrono', name:'ChronoDragonOutpost', dragon_name:'ChronoDragon'},
    SKY_OUTPOST = {id:11, type:'skythrone', name:'SkythroneOutpost', dragon_name:'KaiserDragon'},
    CAVE_OUTPOST = {id:12, type:'cave', name:'CaveDragonOutpost', dragon_name:'CaveDragon'},
	LUNA_OUTPOST = {id:13, type:'luna', name:'LunaDragonOutpost', dragon_name:'LunaDragon'};

var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

/* Error messages */
var kFatalSeedTitle	= 'ERROR WHILST FETCHING DATA FROM SERVER',
    kFatalSeedMsg = 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.',
    kFatalSWF = '"<B>Error initializing:</b><BR><BR>Unable to find SWF element"',
    kStartupErr = '"Unable to start "'+ scriptName +'"<BR>"',
    kInitErr = '"<B>Error initializing:</b><BR><BR>"';

var marchErrorTexts = [
		{ vb : 'delayed due to', fb : ''},
		{ vb : 'delayed due to pending march request', fb : 'Another march request is pending'},
		{ vb : 'has-too-many-marches', fb : 'has-too-many-marches'},
		{ vb : 'delayed due to no available generals', fb : 'No Generals Available'},
		{ vb : 'No Troops Defined', fb : 'No Troops Defined'},
		{ vb : 'delayed due to no available Great Dragon', fb : 'No Great Dragon available'},
		{ vb : '<b>Rate Limit Exceeded</b>, too many requests!', fb : 'Rate Limit Exceeded because there were too many requests'},
		{ vb : 'Requirements Unmet', fb : 'Requirements Unmet'},
		{ vb : 'no resources to transport', fb : 'no resources to transport'}
	];

/* Main arrays used in the script */
var sanctuaryDragonRank = new Array('common','lesser','heightened','royal','exalted','omniscient','legendary');
/* Troops arrays */
var all_dragon_list		 = ['GreatDragon', 'WaterDragon', 'StoneDragon', 'FireDragon', 'WindDragon', 'IceDragon', 'SwampDragon', 'ForestDragon', 'DesertDragon', 'ChronoDragon', 'SpectralDragon', 'KaiserDragon', 'CaveDragon','LunaDragon',];
var all_unit_types		 = [ 'Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'Giant', 'FireMirror', 'PackDragon', 'DarkSlayer', 'DimensionalRuiner', 'LightningCannon', 'ChargeTroop', 'VengeWyrm', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'IceTroop', 'SwampTroop', 'FrostGiant', 'ForestTroop', 'DesertTroop', 'ArcticLeviathan', 'Harrier', 'Defendo', 'ShadowStalker', 'Shaman','WarScarab'];
var attack_unit_types	 = [ 'Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'SwiftStrikeDragon', 'BattleDragon', 'ArmoredTransport', 'PackDragon', 'Giant', 'FireMirror', 'DarkSlayer', 'DimensionalRuiner', 'LightningCannon', 'ChargeTroop', 'VengeWyrm', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'IceTroop', 'SwampTroop', 'FrostGiant', 'ForestTroop', 'DesertTroop', 'ArcticLeviathan', 'Harrier', 'Defendo', 'ShadowStalker', 'Shaman','WarScarab'];
var wave_unit_types		 = [ 'Porter', 'Conscript', 'Spy', 'Halberdsman', 'Minotaur', 'Longbowman', 'ArmoredTransport', 'PackDragon', 'SwiftStrikeDragon', 'BattleDragon', 'Giant', 'FireMirror', 'DarkSlayer', 'DimensionalRuiner', 'LightningCannon', 'ChargeTroop', 'VengeWyrm', 'AquaTroop', 'StoneTroop', 'FireTroop', 'WindTroop', 'IceTroop', 'SwampTroop', 'FrostGiant', 'ForestTroop', 'DesertTroop', 'ArcticLeviathan', 'Harrier', 'Defendo', 'ShadowStalker', 'Shaman','WarScarab'];
var spy_unit_types		 = [ 'Spy' ];
var transport_unit_types = [ 'Porter', 'ATrans', 'PackDrg' ];
/* Resources arrays */
var all_resource_types				= [	'gold', 'food', 'wood', 'ore', 'stone', 'blue_energy','lunar_energy', 'enchanting'];
var transportable_resource_types	= [	'gold', 'food', 'wood', 'ore', 'stone', 'enchanting'];
/* Buildings arrays */
var capital_buildings	= [	'Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'];
var outpost_buildings	= [	'TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'];
var field_buildings		= [	'Mine', 'Farm', 'Lumbermill', 'Quarry'];
var spectral_buildings	= [	'DarkPortal', 'Mausoleum', 'SpectralDragonKeep'];
var spectral_fields		= [	'EnergyCollector'];
var skythrone_buildings	= [	'KaiserDragonKeep', 'Cathedral', 'Forge', 'Greenhouse', 'Library', 'Workshop'];
var cave_buildings		= [ 'CaveDragonKeep', 'CaveCathedral', 'CaveDepot', 'CaveForge', 'CaveGreenhouse', 'CaveLibrary', 'CaveTrainingCamp', 'CaveWorkshop']; 
var luna_buildings		= [ 'DragonKeep','LunaCathedral','LunaDepot','LunaForge','LunaGreenhouse','LunaLibrary','LunaShrine','LunaWorkshop']; 
/* Research arrays */
var research_list		= {	Agriculture:'Agriculture', Woodcraft:'Woodcraft', Masonry:'Masonry', Mining:'Mining', Clairvoyance:'Clairvoyance', RapidDeployment:'RapidDeployment', Ballistics:'Ballistics', Metallurgy:'Metallurgy', Medicine:'Medicine', Dragonry:'Dragonry', Levitation:'Levitation', Mercantilism:'Mercantilism', AerialCombat:'AerialCombat', EnergyCollection:'EnergyCollection', WarriorRevival:'WarriorRevival', GuardianRevival:'GuardianRevival', Rationing:'Rationing'};
var research_name		= [	'Agriculture', 'Woodcraft', 'Masonry', 'Mining', 'Clairvoyance', 'RapidDeployment', 'Ballistics', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'AerialCombat', 'EnergyCollection', 'WarriorRevival', 'GuardianRevival', 'Rationing'];
/* Items arrays */
var armor_item_list     = [	'GreatDragonClawGuards','GreatDragonBodyArmor',		'GreatDragonTailGuard',		'GreatDragonHelmet',
							'WaterDragonHelmet',	'WaterDragonBodyArmor',		'WaterDragonClawGuards',	'WaterDragonTailGuard',
							'StoneDragonHelmet',	'StoneDragonClawGuards',	'StoneDragonTailGuard',		'StoneDragonBodyArmor',
							'FireDragonHelmet',		'FireDragonClawGuards',		'FireDragonTailGuard',		'FireDragonBodyArmor',
							'WindDragonHelmet',		'WindDragonClawGuards',		'WindDragonTailGuard',		'WindDragonBodyArmor',
							'SpectralDragonHead',	'SpectralDragonTalons',		'SpectralDragonTail',		'SpectralDragonBody', 
							'SpectralDragonHelmet', 'SpectralDragonClawGuards', 'SpectralDragonTailGuard',	'SpectralDragonBodyArmor', 
							'IceDragonHelmet',		'IceDragonClawGuards',		'IceDragonTailGuard',		'IceDragonBodyArmor',
							'SwampDragonHelmet',	'SwampDragonClawGuards',	'SwampDragonTailGuard',		'SwampDragonBodyArmor',
							'ForestDragonHelmet',	'ForestDragonClawGuards',	'ForestDragonTailGuard',	'ForestDragonBodyArmor',
							'DesertDragonHelmet',	'DesertDragonClawGuards',	'DesertDragonTailGuard',	'DesertDragonBodyArmor',
							'ChronoDragonHelmet',	'ChronoDragonClawGuards',	'ChronoDragonTailGuard',	'ChronoDragonBodyArmor',
							'KaiserDragonHelmet',	'KaiserDragonClawGuards',	'KaiserDragonTailGuard',	'KaiserDragonBodyArmor', 
							'CaveDragonHelmet',		'CaveDragonClawGuards',		'CaveDragonTailGuard',		'CaveDragonBodyArmor',
							'LunaDragonHelmet',		'LunaDragonClawGuards',		'LunaDragonTailGuard',		'LunaDragonBodyArmor'];
							
var time_item_list = [	{ name:'Blink',					text:'1m',		type:'JMTR',	confirmation:false},
						{ name:'Hop',					text:'5m',		type:'JMTR',	confirmation:false},
						{ name:'Skip',					text:'15m',		type:'JMTR',	confirmation:false},
						{ name:'Jump',					text:'1h00', 	type:'JMTR',	confirmation:false},
						{ name:'Leap',					text:'2h30', 	type:'JMTR',	confirmation:false},
						{ name:'Bounce',				text:'8h00', 	type:'JMTR',	confirmation:false},
						{ name:'Bore',					text:'15h00',	type:'JMTR',	confirmation:false},
						{ name:'Bolt',					text:'24h00',	type:'JMTR',	confirmation:true},
						{ name:'Blast',					text:'60h00',	type:'JMTR',	confirmation:true},
						{ name:'Blitz',					text:'96h00',	type:'JMTR',	confirmation:true},
						{ name:'ForcedMarchDrops', 		text:'25%',		type:'M',	confirmation:false},
						{ name:'TranceMarchDrops', 		text:'50%',		type:'M',	confirmation:false},
						{ name:'TestroniusPowder', 		text:'30%',		type:'JMTR',	confirmation:false},
						{ name:'DarkTestroniusPowder', 	text:'30%',		type:'JMTR',	confirmation:false},
						{ name:'TestroniusDeluxe', 		text:'50%',		type:'JMTR',	confirmation:false},
						{ name:'DarkTestroniusDeluxe', 	text:'50%',		type:'JMTR',	confirmation:false},
						{ name:'TestroniusInfusion', 	text:'99%',		type:'JMTR',		confirmation:true},
						{ name:'DarkTestroniusInfusion',text:'99%',		type:'JMTR',		confirmation:true}];

/* TRANSLATIONS */
var LANG_CODE = navigator.language.substring(0,2).toLowerCase();
var IS_NOT_NATIVE_LANG = (LANG_CODE !== 'en');
var TRANSLATION_ARRAY = {};

var div_player_attack	= setUID('div_SwfPlyr_attack');
var div_player_spy	 	= setUID('div_SwfPlyr_spy');
var div_player_building = setUID('div_SwfPlyr_building');
var div_player_units	= setUID('div_SwfPlyr_units');
var div_player_research = setUID('div_SwfPlyr_research');
var div_player_fortuna  = setUID('div_SwfPlyr_fortuna');
var short_alerts = setUID('short_alerts');
var TIMER_COLOR = '#2B4988';

/* Global variables */
var Tabs = {};
var progressBarPop;
var updaterPop;
var mainPop;
var header_2lines = false;
var swf_object;
var SWF_CONTAINER;
var SWF_CONTAINER_INNERHTML;
var gAttScrollPos = 0;
var gMapScrollPos = 0;
var C = {};
var gFormatTime = ':';
var gFormatDate = '/';
var kForumLink 		 = 'Forum';
var kWikiLink		 = 'Wiki DoA';
var scriptUrlError	 = 'http://www.calciumscript.net/';
var scriptTitle		 = '';
var scriptSite		 = '';
var scriptTimeout	 = null;
var scriptLoaded	 = false;
var startupCount = 0;
var initTimeout	 = null;
var STARTUP_TIMER;
var citySteps;

styleList.forEach(
    function (element, index, array)
    {
        setUID(element);
    });
/* Set initial Language */
setLanguage();
C.attrs = {};

/* Main entry */
function scriptStartup() {
	var i;
	progressBar.hideshow(false);
	clearTimeout(scriptTimeout);

	if (scriptLoaded){
		return;
	}

	if (++startupCount > 20) {
		dialogFatal (kFatalSWF);
		return;
	}

	try {  
		var swf = null;
		var object = document.getElementsByTagName ('object');
		if (object.length < 1) {
			scriptTimeout = setTimeout(scriptStartup, 1000);
			return;
		}
		for (i=0; i < object.length; i++) {
			if (object[i].type && object[i].type=='application/x-shockwave-flash') {
				swf = object[i];
				getFlashVars(swf);
				if (C.attrs.apiServer){
					var maxWidth = document.body.offsetWidth - 570;
					if (maxWidth < 760) maxWidth = 760;
					if (window.location.href.indexOf("facebook") !== -1)
						document.getElementById('hd').parentNode.style.width = maxWidth+'px';
					if (swf.id == 'castlemania_swf') swf.style.width = maxWidth+'px';
					swf_object = swf;
					SWF_CONTAINER = swf.parentNode;
					SWF_CONTAINER_INNERHTML = SWF_CONTAINER.innerHTML;
					setTimeout (function(){logit('Mute sound'); swf.musicMute();}, 30000);
					break;
				}
			}
		}
		if (!C.attrs.apiServer) {
			scriptTimeout = setTimeout(scriptStartup, 1000);
			return;
		}  
	} catch (e) {
		debugLog ('scriptStartup : Error = '+e);
		scriptTimeout = setTimeout(scriptStartup, 1000);
		return;
	}

	scriptLoaded = true;

	try {
		AutoUpdater.check();
		var retry = 0;
		var startupDelay = Math.randRange(10000, 15000);
		progressBar.start({ steps:21, delay:startupDelay, title:translate('Initializing...'), stepText:translate('Loading basic data') });

		Data.init({
			log		: [ [], [] ],
			/* Static data and scripts settings - Will be stored in local storage and be backup in local file */
			options	: {
				popUp	: {
					open : true,
					drag : true,
					x	 : 0,
					y	 : 0
				},
				background			: true,
				currentTab			: false,
				forumUrl			: 'https://www.facebook.com/groups/DoAscripts/',
				wikiUrl				: 'https://www.facebook.com/doa.wiki.page',
				disable_wave		: !WAVE_TAB_ENABLE,
				disable_multi		: MULTI_TAB_ENABLE,
				disable_bookmark	: !BOOKMARK_TAB_ENABLE,
				disable_spies		: SPY_TAB_ENABLE,
				disable_inbox		: !INBOX_TAB_ENABLE,
				disable_search		: !SEARCH_TAB_ENABLE,
				disable_alliance	: !ALLIANCE_TAB_ENABLE,
				disable_wall		: !WALL_TAB_ENABLE,
				disable_single		: !SINGLE_TAB_ENABLE,
				disable_wheel		: !WHEEL_TAB_ENABLE,
				disable_log			: !LOG_TAB_ENABLE,
                enable_notifications_fortuna : false,
				enable_notifications_spy : false,
				enable_notifications_attack : false,
				cheat_cure 			:false,
                messages_notification : [],
				speedups_enabled	: false,
				jobs_speedups_enabled : true,
				cheat_enabled		: true,
				use_speedup_confirmation: true,
				jobs_cancel_confirmation : true,
				utc_time			: false,
				user_language		: LANG_CODE,

				alliance	: {
					last_update		: '',
					alliance_update	: '',
					activity_update	: '',
					current_tab		: 0,
					transport_id	: 0,
					reinforce_id	: 0,
					auto_id			: 0,
					sort_list		: '0',
					sort_alliance	: '0',
					sort_activity	: '0',
					sort_applicants : '0',
					data		 : {
						transports	: {},
						resources	: {},
						units		: {}
					},
					auto		 : {
						enabled		: false,
						recall 		: false,
						max_load	: false,
						delay_min	: 30,
						delay_max	: 45,
						max_marches	: null,
						transports	: {},
						resources	: {}
					},
					recall		 :false
				},

                sanctuaryAbilities : { },

				autoCollect	: {
					enabled		: true,
					last_time	: 0,
					delay		: 60,
					unit		: 60
				},

				autoRefresh	: {
					enabled	: false,
					delay	: 1,
					unit	: 3600
				},
				flashRefresh	: {
					enabled	: false,
					delay	: 30,
					unit	: 60
				},

				info	: {	current_tab	: 0, troop_sub_tab : 0, consumption_sel : 0	},
				jobs	: {	current_tab	: 0	},
				building	: {
					enabled		 : false,
					hide_fields  : false,
					level_enable : [{},{},{},{},{},{},{},{},{},{},{},{},{}], /* Add 1 for new outpost - luna added */
					level_cap	 : [{},{},{},{},{},{},{},{},{},{},{},{},{}]  /* Add 1 for new outpost - luna added */
				},
				research	: {
					enabled		: false,
					res_enable	: [{},{},{},{},{},{}],
					res_cap		: [{},{},{},{},{},{}]
				},
				training	: {
					enabled		: false,
					current_tab	: 0,
					city		: [ /* Add 1 line for new outpost */
						{ enabled : true, units : [], cap : [] }, /* main */
						{ enabled : true, units : [], cap : [] }, /* spectral */
						{ enabled : true, units : [], cap : [] }, /* ice */
						{ enabled : true, units : [], cap : [] }, /* swamp */
						{ enabled : true, units : [], cap : [] }, /* water */
						{ enabled : true, units : [], cap : [] }, /* stone */
						{ enabled : true, units : [], cap : [] }, /* fire */
						{ enabled : true, units : [], cap : [] }, /* wind */
						{ enabled : true, units : [], cap : [] }, /* forest */
						{ enabled : true, units : [], cap : [] }, /* desert */
						{ enabled : true, units : [], cap : [] }, /* chrono */
						{ enabled : true, units : [], cap : [] },  /* skythrone */
						{ enabled : true, units : [], cap : [] }, /* cave */
						{ enabled : true, units : [], cap : [] }  /* luna */
						
					],
					mode		: 'min_resource'
				},
				resurrect	: {
					enabled		: false,
					res_enable	: [{},{},{},{},{},{}],
					res_max		: [{},{},{},{},{},{}]
				},
				sanctuary	: {
					enabled		: false,
					current_tab	: 0,
					male_id		: 0,
					female_id	: 0,
					feeding		: {}
				},

				collapsed	: {
					train	: [],
					build	: []
				},
				inbox	: {
					current_tab		: 0
				},
				map	: {
					radius		: 16,
					radius_fast	: 32,
					x			: 0,
					y			: 0
				},
				messages	: {
					last_read	: 0,
					missing		: 0
				},
				messages_tower	: [],
				messages_delete	: {
					type				: 0,
					msgGame				: true,
					msgPlayer			: true,
					msgSentinel			: true,
					msgAlliance			: true,
					rptAnthropus		: true,
					rptTransport		: true,
					rptSpy				: true,
					rptBattle			: true,
					rptReinforcement 	: true,
					rptCurse			: true,
					rptTrading			: true,
					rptBreeding			: true,
					rptExceptMyAttacks	: true,
					rptExceptYourAttacks: true,
					dateAll				: true
				},
				search	: {
					enabled		: false,
					current_tab	: 0,
					sort_list	: '0',
					last_update	: '',
					target		: {
						enabled	 : false,
						alliance : null,
						player	 : null,
						distance : 14,
						x		 : 999,
						y		 : 999,
						type	 : '',
						level	 : 0
					},
					grassland	: true,
					lake		: true,
					hill		: true,
					mountain	: true,
					forest		: true,
					nuage		: true,
					plain		: true,
					swamp		: true,
					min_level	: 1,
					max_level	: 10,
					unowned		: false
				},
				sound : {
					enable_jobs		: false,
					enable_fortuna  : false,
					enable_sentinel : false,
					repeat_attack	: false,
					attack_rdelay	: 2,
					repeat_spy		: false,
					spy_rdelay		: 2,
					URL_player		: SoundPlayer.SWF_PLAYER_URL,
					URL_attack		: SoundPlayer.DEFAULT_SOUND_URL.attack,
					URL_spy			: SoundPlayer.DEFAULT_SOUND_URL.spy,
					URL_building	: SoundPlayer.DEFAULT_SOUND_URL.building,
					URL_units		: SoundPlayer.DEFAULT_SOUND_URL.units,
					URL_research	: SoundPlayer.DEFAULT_SOUND_URL.research,
					URL_fortuna		: SoundPlayer.DEFAULT_SOUND_URL.fortuna
				},
				verboseLog	: { enabled : false },

				tower	: {
					enabled			: false,
					current_tab		: 0,
					nospy			: false,
					delay			: 2,
					unit			: 60,
					delete_report	: true,
					delete_delay	: 1,
					delete_unit		: 3600,
					preset			: '',
					send_message	: false,
					msg_subject		: 'I\'m under attack !! (automatic message)',
					msg_body		: '%1 at %2 is leading an attack on me...\n'+
									  'Ennemy forces are composed with :\n'+
									  '%3\n\n'+
									  'The attack should arrive at %4.\n'+
									  'Could you please reinforce me ASAP (%6 at %7) ?\n'+
									  'Thanks\n\n'+
									  '%5'
				},

				attacks	: {
					enabled				: false,
					current_tab			: 0,
					choice				: 'AnthropusCamp',
					delay_min			: 30,
					delay_max			: 60,
					delete_reports		: true,
					stop_on_loss		: true,
					log_attacks			: false,
					max_marches			: null,
					level_enable		: ['',     0,     0,     0,     0,     0,     0,     0,     0,     0,     0,     0],
					level_distance		: ['',    16,    16,    16,    16,    16,    16,    16,    16,    16,    16,    16],
					units				: ['',	  {},    {},    {},    {},    {},    {},    {},    {},    {},    {},    {}],
					include_great_dragon: ['', false, false, false, false, false, false, false, false, false, false, false],
					except_great_dragon	: ['',    {},    {},    {},    {},    {},    {},    {},    {},    {},    {},    {}],
					clear_all_targets	: false
				},
				bookmarks	: {
					enabled			: false,
					current_tab		: 0,
					choice			: 3,
					sort			: 0,
					delay_min		: 30,
					delay_max		: 45,
					max_marches		: null,
					stop_on_loss	: true,
					delete_reports	: false,
					targets	: [],
					new_bookmark	: {
						x			: 0,
						y			: 0,
						sequence	: '',
						type		: '',
						level		: 0,
						units		: {},
						dragons		: {},
						include_great_dragon : false,
						comment		: ''
					}
				},
				multiple : {
					enabled				: false,
					current_tab			: 0,
					delay_min			: 30, /* Delay before sending a primary wave */
					delay_max			: 45,
					delay_b4_secondary	: 20, /* Delay before sending first secondary after primary wave */
					delay_min2			: 10, /* Delay between seconday waves */
					delay_max2			: 15,
					max_marches			: null, /* Total marches that can send by multi tab */
					max_secondary		: null, /* Number of secondary before sending again a primary */
					stop_on_loss		: true,
					delete_reports		: false,
					target	: {
						x				: 0,
						y				: 0,
						type			: '',
						level			: 0,
						ai				: 0,
						primary_units	: {},
						dragons_1		: {},
						include_gd_1	: false,
						saved_units_1	: {},
						secondary_units	: {},
						dragons_2		: {},
						include_gd_2	: false,
						saved_units_2	: {},
						comment			: ''
					}
				},
				single	: {
					current_tab		: 0,
					current_preset	: '',
					presets			: [],
					preset			: {
						name		: '',
						units		: {}
					},
					target	: {
						x			: 0,
						y			: 0,
						type		: '',
						level		: 0,
						ai			: 0,
						units		: {},
						dragons		: {},
						saved_units	: {},
						include_great_dragon : false,
						comment		: ''
					},
					history		: []
				},
				spies	: {
					enabled			: false,
					current_tab		: 0,
					delay_min		: 30,
					delay_max		: 45,
					max_marches		: null,
					stop_on_loss	: true,
					delete_reports	: false,
					target	: {
						x		: 0,
						y		: 0,
						type	: '',
						level	: 0,
						ai		: 0,
						units	: {},
						comment	: ''
					},
					history		: []
				},
				wall	: {
					current_tab		: 0,
					current_preset	: '',
					presets			: [],
					preset			: {
						name		: '',
						units		: {},
                        scales		: '',
						armor		: ''
					}
				},
				waves	: {
					enabled				: false,
					current_tab			: 0,
					delay_min			: 30,
					delay_max			: 45,
					max_marches			: null,
					stop_on_loss		: true,
					delete_reports		: false,
					send_without_dragon	: false,
					target	: {
						x			: 0,
						y			: 0,
						type		: '',
						level		: 0,
						ai			: 0,
						units		: {},
						dragons		: {},
						saved_units	: {},
						include_great_dragon : false,
						comment		: ''
					},
					history		: []
				},
				wheel	: {
					current_tab	 : 0,
					type		 : 'regular',
					auto_refresh : true,
					auto_play	 : true,
					delay		 : 3,
					unit		 : 1,
					number		 : 1,
					max_auto	 : 1,
					mandatory	 : [['CompletionGrant', 'null'],
									['AncestralSeal', 'TestroniusInfusion']],
					optional	 : [['null', 'null', 'null', 'null'],
									['null', 'null', 'null', 'null']]
				}
			},
			/* Statistics data - Will be stored in local storage and WON'T be backup in local file */
			stats	: {
				attacks	: {
					start_at		: 0,
					run_time		: 0,
					total_attacks	: 0,
					loss			: {},
					items			: {},
					resources		: {},
					by_level		: [ '',
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}},
						{total_attacks:0, items:{}, resources:{}}
					]
				},
				bookmarks	: {
					start_at		: 0,
					run_time		: 0,
					total_attacks	: 0,
					loss			: {},
					items			: {},
					resources		: {}
				},
				leaderboards	: {
					alliance	: {
						offensive_kills : [ {}, {}, {} ],
						defensive_kills	: [ {}, {}, {} ],
						power_taken		: [ {}, {}, {} ],
						power_gained	: [ {}, {}, {} ]
					},
					player	: {
						offensive_kills : [ [ {}, {}, {} ], [ {}, {}, {} ] ],
						defensive_kills	: [ [ {}, {}, {} ], [ {}, {}, {} ] ],
						power_taken		: [ [ {}, {}, {} ], [ {}, {}, {} ] ]
					},
					last_refresh : ''
				},
				multiple : {
					start_at		: 0,
					run_time		: 0,
					total_attacks	: 0,
					loss			: {},
					items			: {},
					resources		: {}
				},
				requests : {
					start_at	: 0,
					run_time	: 0,
					last_block	: 0,
					count_block	: 0,
					ajax_type	: {
						binary		 : {time:[], error:[]},
						/* Startup requests & refresh player/cities data */
						versions	 : {time:[], error:[]},
						locales		 : {time:[], error:[]},
						cookie		 : {time:[], error:[]},
						manifest     : {time:[], error:[]},
						player		 : {time:[], error:[]},
						cities		 : {time:[], error:[]},
						jobs		 : {time:[], error:[]},
						dragons		 : {time:[], error:[]},
						/* Alliance reated requests */
						alliances	 : {time:[], error:[]},
						membership	 : {time:[], error:[]},
						activity	 : {time:[], error:[]},
						/* Map requests */
						map			 : {time:[], error:[]},
						tile_at		 : {time:[], error:[]},
						/* Jobs requests */
						building	 : {time:[], error:[]},
						research	 : {time:[], error:[]},
						training	 : {time:[], error:[]},
						resurrect	 : {time:[], error:[]},
						canceljob	 : {time:[], error:[]},
						/* Marches requests */
						marches		 : {time:[], error:[]},
						cancelmarch	 : {time:[], error:[]},
						/* Report requests */
						reports		 : {time:[], error:[]},
						reports_del  : {time:[], error:[]},
						reports_read : {time:[], error:[]},
						message		 : {time:[], error:[]},
						/* Other requests */
						minigame	 : {time:[], error:[]},
						save_minigame: {time:[], error:[]},
						leaderboards : {time:[], error:[]},
						collect		 : {time:[], error:[]},
						claim		 : {time:[], error:[]},
						defended	 : {time:[], error:[]},
						defense		 : {time:[], error:[]},
						items		 : {time:[], error:[]},
						breeding	 : {time:[], error:[]},
						feeding	 	 : {time:[], error:[]},
						dragonHandle : {time:[], error:[]},
                        customization: {time:[], error:[]}
					}
				},
				spies	: {
					start_at		: 0,
					run_time		: 0,
					total_attacks	: 0,
					loss			: {}
				},
				total	: {
					start_at		: 0,
					total_attacks	: 0,
					loss			: {},
					items			: {},
					resources		: {}
				},
				waves	: {
					start_at		: 0,
					run_time		: 0,
					total_attacks	: 0,
					loss			: {},
					items			: {},
					resources		: {}
				},
				wheel	: {
					type		 : 'regular',
					total_grids	 : [0, 0],
					total_played : [0, 0],
					items		 : [{}, {}],
					last_won	 : [[], []]
				}
			},
			/* Dynamic data - Will be stored in local storage and WON'T be backup in local file */
			dynamic	: {
				recall_marches	: [],
				players	: {
					memberships				: [],
					memberships_evolution	: [],
					alliances				: [],
					friends					: [],
					foes					: [],
					alliances_evolution		: [],
					activity				: [],
					applicants				: []
				}
			},
			map	: {
				terrains	: {},
				players		: {},
				evolution	: {},
				alliance	: {},
				coords		: {}
			},
			marches	: {
				start_at	: 0,
				attacks		: {},
				bookmark	: {},
				waves		: {},
				spies		: {},
				transport	: {},
				multiple	: {},
				count_limit	: 1,
				ressources	: {}
			}
		});

		verboseLog ('Session parameters : '+inspectObj (C, 6, 1));
		clearAndReload ();

		/* Set the default locale use */
		if ( Data.options.user_language != undefined && Data.options.user_language != null && Data.options.user_language != LANG_CODE) {
			setLanguage(Data.options.user_language);
		}
		/*  Check basic initialization */
		function stepStarting (current_step) {
			var wait_time = Math.randRange(2500, 4500);
			var error_code;
			var error_msg;
            var progress_title;
			progressBar.resume ();

			function onSuccess (message, waitTime, currentStep) {
				verboseLog ( message );
				debugLog ( message );
				STARTUP_TIMER = setTimeout(stepStarting, waitTime, currentStep);
			}

			function onError (errorCode, errorMsg, message, waitTime, currentStep) {
				error_code = errorCode;
				switch (errorCode) {
					/* Bad request (API version ?) */
					case 400 :	error_msg = translate('<b>Bad request!</b>');
								progressBar.stop;
								progressBar.hideshow(false);
								retry = 400;
								dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
											<font color="#BF0000"><b> ' + errorMsg + '</b></font>\
											<br><br><div align=left>\
											' + kFatalSeedMsg + '<br><br></div>\
											<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br>');
								return;
								break;
					/* Forbidden (RefControl or --no-referrers missing ?) */
					case 403 :	error_msg = translate('<b>Forbidden!</b>');
								retry = 403;
								return;
								break;
					/* Rate Limit Exceeded */
					case 429 :	error_msg = '<b>API </b>'+translate('<b>Rate Limit Exceeded</b>, too many requests!');
								waitTime = E429_DELAY;
								progressBar.update ({ step:currentStep, title:progress_title, stepText:translate('Fetching') + ' ' + message +'<br>'+ error_msg + ' - ' + translate('Retry in') + ' ' + waitTime });
								progressBar.pause ();
								verboseLog(error_msg + ' - ' + translate('Retry in :') + waitTime);
								STARTUP_TIMER = setTimeout( stepStarting, waitTime * 1000, currentStep );
								return;
								break;
					case 509 :	error_msg = translate('<b>Rate Limit Exceeded</b>, too many requests!');
								waitTime = 600;
								progressBar.update ({ step:currentStep, title:progress_title, stepText:translate('Fetching') + ' ' + message +'<br>'+ error_msg + ' - ' + translate('Retry in') + ' ' + waitTime });
								progressBar.pause ();
								verboseLog(error_msg + ' - ' + translate('Retry in :') + waitTime);
								STARTUP_TIMER = setTimeout( stepStarting, waitTime * 1000, currentStep );
								return;
								break;
					default : break;
				}
				error_msg = errorMsg;
				debugLog('stepStarting: '+message+', Error '+errorCode+', '+error_msg+'. Retry ' + retry);
				STARTUP_TIMER = setTimeout( stepStarting, waitTime, currentStep, ++retry);
			}

			if (retry <= 20) {
			switch ( current_step ) {
				case 1: /*  Check API version */
					function getSupportedVersions (callback) {
						var params = {};
						new MyAjaxRequest ('versions', url_versions + '/supported_versions', params, function (res) {
							if (res.ok && res.dat) {
								var list = '';
								if (res.dat.length) {
									api_version = res.dat[res.dat.length-1];
									for (var v=0; v<res.dat.length; v++) list = list+((v==0) ? '':', ')+res.dat[v];
								} else {
									api_version = res.dat;
									list = res.dat;
								}
								verboseLog ( 'List of supported API version : '+list );
								debugLog ( 'List of supported API version : '+list );
							}
							if (callback) callback(res);
						}, false);
					}
					progress_title = translate('Getting API version...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Checking API version') });
					getSupportedVersions(function (res) {
						if (res.ok) {
							onSuccess (translate('API version Successfully initialized')+' : '+api_version, wait_time, current_step + 1);
						} else {
							debugLog('stepStarting: '+translate('Checking API version')+', Error '+res.status+', '+res.errmsg+'.');
							onSuccess (translate('API version not available. Using default')+' : '+api_version, wait_time, current_step + 1);
						}
					});
					break;
				case 2: /*  Map data Initialization */
					progress_title = translate('Getting map data...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Charging Map binairy file') });
					Map.initMapData(function (res) {
						if (res.ok) {
							onSuccess (translate('Map Bin Successfully initialized'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Map Bin'), wait_time, current_step);
						}
					});
					break;
				case 3: /*  Translation Initialization */
					progress_title = translate('Getting basic data...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Fetching Translation matrix') });
					Translation.init(function (res) {
						if (res.ok) {
							onSuccess (translate('Translation Matrix Successfully initialized'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Translation matrix'), wait_time, current_step);
						}
					});
					break;
				case 4: /*  Manifest Initialization */
					progress_title = translate('Getting game data...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Fetching Manifest') });
					Manifest.init(function (res) {
						if (res.ok) {
							onSuccess (translate('Manifest Successfully initialized'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Manifest'), wait_time, current_step);
						}
					});
					break;
				case 5: /*  Seed Initialization */
					progress_title = translate('Getting game data...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Fetching Seed') });
					Seed.init(function (res) {
						if (res.ok) {
							onSuccess (translate('Seed Successfully initialized'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Seed'), wait_time, current_step);
						}
					});
					break;
				case 6: /* Sanctuary dragons data */
					progress_title = translate('Getting dragons data...');
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Fetching Dragons data') });
					Seed.fetchDragons (function(res) {
						if (res.ok) {
							onSuccess (translate('Dragons data successfully fetched'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Dragons'), wait_time, current_step);
						}
					});
					break;
				case 7: /* Fetch capital data */
					progress_title = translate('Getting cities data...');
					var cityIdx;
					/* We make sure to first start the capital */
					for (var i=0; i < Seed.cityInit.length; i++) {
						if (Seed.cityInit[i].type == 'capital') {
							cityIdx = Seed.cityInit[i].id;
						}
					}
					/* Set progress bar steps / city */
					citySteps = Math.floor(14 / (Seed.cityInit.length-1));
					progressBar.update ({ step:current_step, title:progress_title, stepText:translate('Fetching Capital data') });
					Seed.fetchCity (cityIdx, function(res) {
						if (res.ok) {
							wait_time = Math.randRange(2500,6000);
							onSuccess (translate('Capital data successfully fetched'), wait_time, current_step + 1);
						} else {
							onError (res.status, res.errmsg, translate('Capital data'), wait_time, current_step);
						}
					});
					break;
				case 8: /* Fetch outposts data */
					progress_title = translate('Getting cities data...');
					for (var i=0; i < Seed.cityInit.length; i++) {
						if (Seed.cityInit[i].loaded) {
							continue;
						}
						progressBar.update ({ step:current_step+(citySteps*i), title:progress_title, stepText:translate('Fetching Outpost #')+(i+1) });
						if (Seed.cityInit[i].timer) {
							clearTimeout (Seed.cityInit[i].timer);
						}
						var current_index = i;
						var cityIdx = Seed.cityInit[i].id;
						Seed.fetchCity (cityIdx, function(res) {
							if (res.ok) {
								wait_time = Math.randRange(2500,6000);
								if (current_index == Seed.cityInit.length - 1) {
									wait_time = 2500;
								}
								onSuccess (translate('Outpost')+' #'+(i+1)+' '+translate('data successfully fetched'), wait_time, current_step);
							} else {
								onError (res.status, res.errmsg, translate('Outpost')+' #'+(i+1), wait_time, current_step);
							}
						});
						return;
					}
					startScript();
					return;
					break;
				}
			} else {
				/* Retries Limit */
				clearTimeout( STARTUP_TIMER );
				progressBar.stop;
				progressBar.hideshow(false);
				if (retry < 400) { /* to avoid displaying twice a dialogFatal popup */
					dialogFatal('<b>' + kFatalSeedTitle + '</b><br><br>\
								<font color="#BF0000"><b> ' + (error_code || retry) + ' - ' + error_msg + '</b></font>\
								<br><br><div align=left>\
								' + kFatalSeedMsg + '<br><br></div>\
								<a id="' + UID['support_link'] + '" href="" target="_blank">Bugs and Known Issues</a><br>');
				}
				return;
			}
		}
		
		actionLog('<B>' + scriptVersion + ' ' +translate('Loading...') + '</B>');
		consoleLog('<B>' + scriptVersion + ' ' +translate('Loading...') + '</B>');
		stepStarting( 1 );

		function startScript() {

			if (updaterPop)	setTimeout (function(){updaterPop.destroy()}, 100);

			progressBar.update ({ step:19, title:translate('Completing...'), stepText:translate('Initializing map, auto-collect, ...') });
			Names.init ();
			Map.init ();
			Marches.init ();
			AutoCollect.init ();
			AutoRefresh.init ();
			Messages.init ();

			progressBar.stop;
			progressBar.hideshow(false);
			progressBarPop.destroy();

			if (Data.options.popUp==null || Data.options.popUp.x==null || Data.options.popUp.x=='' || isNaN(Data.options.popUp.x)){
				var maxWidth = document.body.offsetWidth - 570;
				if (maxWidth < 760) maxWidth = 760;
				Data.options.popUp.x = maxWidth+2;
				Data.options.popUp.y = 1;
			}
			var popupWidth = 550;
			var popupHeight = 800;

			/* Random Title */
			makeRandomTitle();

			/* Create a new popup DIV for the main script window */
			mainPop = new PopUp ('main', Data.options.popUp.x, Data.options.popUp.y, popupWidth, popupHeight, Data.options.popUp.drag, function () { tabManager.hideTab(); }); /*resetScript(); });*/

			/* Check Our Coords */
			Map.checkOurCoords();

			/* Create all the tabs and insert them into the main script popup DIV */
			tabManager.init(mainPop.getMainDiv());

			/* Display everything */
			Data.options.popUp.open = true;
			if (Data.options.popUp.open) {
				mainPop.show(true);
				tabManager.showTab();
			}

			Data.setDefaultValues ('options');
			RecallMarch.init ();
			SoundPlayer.init ();
			WackoScript.init ();
			AutoCure.init ();
            CalciumWall.init ();
            CalciumNotifications.init ();
			window.addEventListener('unload', Data.onUnload, false);

			/* Apply CSS styles (THIS MUST BE THE LAST ALWAYS) */
			setStyles();

			actionLog('<B>' + scriptVersion + ' ' +translate('Loaded') + '</B>');
			consoleLog('<B>' + scriptVersion + ' ' +translate('Loaded') + '</B>');
			if (Data.stats.requests) Data.stats.requests.start_at = serverTime();
			/* sendNewVersionMsg (); */

			checkDelay();
		}
	} catch (e) {
		dialogFatal(kInitErr + e);
		logit(inspectObj (e, 8, 1));				
	}
}

var AutoCure = {
	timer			: null,
	intervalCure 	: 20000,

	init : function () {
		var t = AutoCure;
		t.setEnable (Data.options.cheat_cure);
	},

	setEnable : function (onOff) {
		var t = AutoCure;
		Data.options.cheat_cure = onOff;
		if (onOff){
			t.AutoCure();
		}
	},

	AutoCure : function () {
		var t = AutoCure;
		var options = {noPlayer:true, cities:[], jobs:true, dragons:true};
		clearTimeout(t.timer);
		
		if (Data.options.cheat_cure) {
			if (Seed.cities.length > 0){
				for (var cityIdx=0; cityIdx < Seed.cities.length; ++cityIdx){
					var job = Jobs.getJobs('dragon', true, cityIdx)[0];
					if(job && job.id) {
						t.Cure(job);
                        options.cities.push(Seed.cities[cityIdx].id);
					}
				}
                Seed.fetchPlayer (options);
			}
			t.timer = setTimeout(t.AutoCure, t.intervalCure);
		}
	},
	
	Cure : function(job) {
		try
		{
			if(Data.options.cheat_cure) {
				MyAjax.cancelTraining(
					job.id,
					function (r) {
						if (r.ok && r.dat.result.success) {
							logit(translate('Cure job cancelled'));
						}
					}
				);
			}
		} catch (e) {
			verboseLog('Erreur AutoCure = '+inspectObj(e,8,1));
		}
	}
}

/******************************** CalciumNotification package ****************/
var CalciumNotifications = {
    init : function () {
    	var t = CalciumNotifications;
		Messages.addAlarmReportListener(t.gotAlarmReport);
		verboseLog('CalciumNotifications init successfully');
	},

	showFortunaWin : function (bodyWin) {
		var t = CalciumNotifications;
		if(Data.options.enable_notifications_fortuna) {
			t.showNotification(SERVER_ID + '-FORTUNA', bodyWin, SERVER_ID+'fortuna'+serverTime());
		}
	},
	
	showNotification : function(title, body, tag) {
		try {
			verboseLog('IsChrome = ' + IsChrome);
			if(!IsChrome) {
				Notification.requestPermission(function(perm) {
					verboseLog('perm = ' + perm);
					if(perm == 'granted') {
						new Notification(title, {
							body: body,
							tag: tag
						});
					}				
				});
			} else {
				verboseLog('checkPermission = ' + window.webkitNotifications.checkPermission());
				if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
					new Notification(title, {
						body: body,
						tag: tag
					});
				} else {
					window.webkitNotifications.requestPermission();
				}
			}
		}  catch (e) {
			verboseLog('Error Notification = '+inspectObj(e,8,1));
		}
	},
	
	showAlertNotification : function (msg) {
		if(	(Data.options.enable_notifications_spy && msg.type == 1) ||
			(Data.options.enable_notifications_attack && msg.type == 0) ) {
			
			CalciumNotifications.showNotification(
				SERVER_ID + '-' + translate(( msg.type == 1 ? 'Spy' : 'Attack')) + '-' + translate('Arrival time') + ': ' + new Date(msg.arrive_at).formatDate() + ' ' + new Date(msg.arrive_at).formatTime()
				, msg.x+','+msg.y+ ' : ' + msg.alliance + '/' + msg.troups
				, SERVER_ID+( msg.type == 1 ? 'Spy' : 'Attack')+msg.x+msg.y+serverTime()
			);

		}
	},
	
	gotAlarmReport : function (rpt_alm, msgid) {
		var t = CalciumNotifications;
		var msg = {id : msgid, type : 0, arrive_at : 0, alliance : '', x : 0, y : 0, units : {}, troups : '', general : 0, op : 0 };
		if (!rpt_alm) {
			return;
		}
		if (rpt_alm.report.warnings) {
			var warn = rpt_alm.report.warnings;
			if (warn.attacker_name) {
				msg.alliance = warn.attacker_name;
			}
			if (warn.attacker_title && warn.attacker_title.alliance) {
				if (msg.alliance) {
					msg.alliance = msg.alliance + ' / ' + warn.attacker_title.alliance;
				} else {
					msg.alliance = warn.attacker_title.alliance;
				}
			}
			//if (warn.outpost_attack) msg.op = warn.march_incoming;
			if (warn.attacker_coords) {
				msg.x = warn.attacker_coords.x;
				msg.y = warn.attacker_coords.y;
			}
			if (warn.march_type && warn.march_type == 'SpyMarch') {
				msg.type = 1;
			}
			if (warn.attacker_units) {
				var results = [];
				for (var tr in warn.attacker_units) {
					var unit = numf(warn.attacker_units[tr], ' ') + ' ' + translate(tr);
					results.push(unit);
				}
				if (results.length>0) {
					msg.troups = results.join (', ');
				}
				msg.units = cloneProps(warn.attacker_units);
			}
			if (warn.march_arrival_time) {
				msg.arrive_at = t.getTimeAlarm(warn.march_arrival_time);
			}
		}
		
		var found = false;
		for (var i=0; i<Data.options.messages_notification.length && !found; i++) {
			if (Data.options.messages_notification[i].id == msgid) {
				found = true;
			}
		}
		
		if (!found) {
			Data.options.messages_notification.push(msg);
			t.showAlertNotification(msg);
		}
		
	},

	getTimeAlarm : function (str) {
		var result = 0;
		if (str.length>=19) {
			var year = toNum(str.substr(0,4));
			var month = toNum(str.substr(5,2));
			if (month == 0) {
				month = toNum(str.substr(6,1));
			}
			var day = toNum(str.substr(8,2));
			if(day == 0) {
				day = toNum(str.substr(9,1));
			}
			var hours = toNum(str.substr(11,2));
			if (hours == 0) {
				hours = toNum(str.substr(12,1));
			}
			var minutes = toNum(str.substr(14,2));
			if (minutes == 0) {
				minutes = toNum(str.substr(15,1));
			}
			var seconds = toNum(str.substr(17,2));
			if (seconds == 0) {
				seconds = toNum(str.substr(18,1));
			}
			result = new Date(Date.UTC(year, month-1, day, hours, minutes, seconds));
		}
		return result;
	}
}
/******************************** CalciumNotification package ****************/

/******************************** CalciumWall package ************************/
var CalciumWall = {
    
    messages : new Array(),
    all_unit_types : new Array(),
    
	init : function () {
		var t = CalciumWall;
        t.all_unit_types[1] = 'Porter';
        t.all_unit_types[10] = 'Conscript';
        t.all_unit_types[20] = 'Spy';
        t.all_unit_types[30] = 'Halberdsman';
        t.all_unit_types[40] = 'Minotaur';
        t.all_unit_types[50] = 'Longbowman';
        t.all_unit_types[60] = 'SwiftStrikeDragon';
        t.all_unit_types[70] = 'BattleDragon';
        t.all_unit_types[100] = 'ArmoredTransport';
        t.all_unit_types[80] = 'Giant';
        t.all_unit_types[90] = 'FireMirror';
        t.all_unit_types[200] = 'PackDragon';
        t.all_unit_types[300] = 'DarkSlayer';
        t.all_unit_types[7000] = 'DimensionalRuiner';
        t.all_unit_types[400] = 'LightningCannon';
        t.all_unit_types[500] = 'ChargeTroop';
        t.all_unit_types[600] = 'VengeWyrm';
        t.all_unit_types[4000] = 'AquaTroop';
        t.all_unit_types[2000] = 'StoneTroop';
        t.all_unit_types[1000] = 'FireTroop';
        t.all_unit_types[800] = 'WindTroop';
        t.all_unit_types[5000] = 'IceTroop';
        t.all_unit_types[3000] = 'SwampTroop';
        t.all_unit_types[900] = 'FrostGiant';
        t.all_unit_types[6000] = 'ForestTroop';
        t.all_unit_types[700] = 'DesertTroop';
        t.all_unit_types[8000] = 'ArcticLeviathan';
        t.all_unit_types[9000] = 'Harrier';
		t.all_unit_types[10000] = 'Defendo';
		t.all_unit_types[11000] = 'ShadowStalker';
		Messages.addAlarmReportListener(t.gotAlarmReport);
		verboseLog('CalciumWall init successfully');
	},
	
	gotAlarmReport : function (rpt_alm, msgid) {
		var t = CalciumWall;
		if (!rpt_alm) {
			return;
		}
		if (rpt_alm.report.warnings) {
			var warn = rpt_alm.report.warnings;
			if (warn.march_type && warn.march_type == 'SpyMarch') {
				if (warn.attacker_units) {
					var x = warn.attacker_coords.x;
					var y = warn.attacker_coords.y;
					var city = Seed.cities[CAPITAL.id];
					var units = {};
					var nb = 0, numTroops, unit_max=1, found = false;
					for (var tr in warn.attacker_units) {
						nb = warn.attacker_units[tr];
					}
					switch (nb) {
						case 666:
							units = {};
						break;
						case 10000: 
							for(var i=0; i < all_unit_types.length ; i++) {
								numTroops = getTroopNumbers(city, all_unit_types[i]);
								unit_max = numTroops.incity + numTroops.indefense;
								units[all_unit_types[i]] = unit_max;
							}
						break;
						default :
							if ( t.all_unit_types[nb] != undefined ) {
								numTroops = getTroopNumbers(city, t.all_unit_types[''+nb]);
								unit_max = numTroops.incity + numTroops.indefense;
								units[t.all_unit_types[nb]] = unit_max;
							}
						break;
					}

                    for (var i=0; i<t.messages.length && !found; i++) {
                        if (t.messages[i] == msgid) {
                            found = true;
                        }
                    }
                    
                    if (!found) {
                        t.messages.push(msgid);
						if( (SERVER_ID == 999 && ( (x == 999 && y == 999) || (x == 999 && y == 999) )) ) {
							if(nb == 666) {
								new MyAjax.setDefenseForce(city.id, units, function (rslt){ 
									if(Seed.cities[CAPITAL.id].defended)
										new MyAjax.switchDefense (city.id, true, function (rslt){ }); 
								});
							} else {
								new MyAjax.setDefenseForce(city.id, units, function (rslt){ 
									if(!Seed.cities[CAPITAL.id].defended)
										new MyAjax.switchDefense (city.id, false, function (rslt){ });
								});
							}
						}
                    }
				}
			}
		}
	}
}
/******************************** CalciumWall package ************************/


/******************************** MyAjax package *****************************/
var MyAjax = {
	addMainParams : function (){
		var t = MyAjax;
		var p = {};
		p['user_id']		= C.attrs.userId;
		p['dragon_heart']	= C.attrs.dragonHeart;
		p['_session_id']	= C.attrs.sessionId;
		p['version']		= api_version;
		p['timestamp']		= toNum(serverTime());
		return p;
	},
    sanctuaryAbilities : function (callback) {
    	var t = MyAjax;
		var p = {};
        p = t.addMainParams();
        new MyAjaxRequest ('dragonHandle', 'sanctuary_abilities',p , mycb, false);
        function mycb (rslt){
    		if (rslt.ok) {
				Data.options.sanctuaryAbilities = rslt.dat.sanctuary_abilities;
				if (callback){
					callback (true);
				}
			} 
            else {
                verboseLog('Ajax.sanctuaryAbilities ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
                if (callback) {
                    callback (false);
                }
            }
		}
    },
	battleReport : function (report_id, player_id, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		new MyAjaxRequest ('reports_read', 'reports/battle/'+ report_id +'/player/'+player_id+'.json',p , mycb, false);
		function mycb (rslt){
			if (rslt.ok) {
				var msg = rslt.dat.result.report_notification;
				var rpt = {	id:msg.id,
							created_at:msg.created_at,
							summary:msg.summary,
							type:msg.report_type,
							from:msg.from,
							unread:(is_null(msg.read_at) ? true : false),
							report:(rslt.dat.result.report ? rslt.dat.result.report : null) };
				if ( Messages.activity[report_id] )
					 Messages.activity[report_id].mergeWith(rpt);
				else Messages.activity[report_id] = cloneProps(rpt);
				if (callback){
					callback (rpt);
					return;
				}
			} else verboseLog('Ajax.battleReport ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
			return;
		}
	},
    setCustomization : function (unitName, armor, scales, callback ) {
        var t = MyAjax;
		var p = {};
        
        p = t.addMainParams();
        p['unit_name'] = unitName;
        
        if(armor) {
                p['customizations'] = scales + ',' + armor;
        }
        else {
            p['customizations'] = scales;
        }
        
        new MyAjaxRequest ('customization', 'player_unit_customization/update.json', p, mycb, true);
        function mycb (rslt){
            if (rslt.dat.result) {
				if (rslt.dat.result.success){
                    var dragon_name = rslt.dat.result.unit_type.substring(rslt.dat.result.unit_type.indexOf('::')+2);
					Seed.dragons[dragon_name].slots = rslt.dat.result.slots;
					if(Seed.dragons[dragon_name].slots.scales == undefined)
						Seed.dragons[dragon_name].slots.scales = "GreenScales";
					if(Seed.dragons[dragon_name].slots.armor == undefined)
						Seed.dragons[dragon_name].slots.armor = "GreenArmor";

				} 
            } else {
                verboseLog('Ajax.setCustomization ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
            }
			if (callback) callback (rslt);
			return;
		}
    },
	buildingUpgrade : function (cityId, buildingId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method'] = 'put';
		new MyAjaxRequest ('building', 'cities/'+ cityId +'/buildings/'+ buildingId +'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success){
					Seed.checkAddJob (rslt.dat.result.job);
				} 
			} else verboseLog('Ajax.buildingUpgrade ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	cancelTraining : function (jobId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['job_id']		  = jobId;
		p['_method']	  = 'delete';
		new MyAjaxRequest ('canceljob', 'jobs/'+ jobId +'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success){
					delete (Seed.jobs[rslt.dat.result.job.city_id][rslt.dat.result.job.id]);
					Seed.updateCity (rslt.dat.result.city);
				} 
			} else verboseLog('Ajax.cancelTraining ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	collectResources : function (cityId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		new MyAjaxRequest ('collect', 'cities/'+ cityId +'/move_resources.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) Seed.updateCity (rslt.dat.city);
			else verboseLog( translate('Auto-Collect Error') +': ' + rslt.errmsg);
			if (callback) callback (rslt.ok);
			return;
		}
	},
	dragonBreeding : function (male_id, female_id, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']	= 'put';
		p['male_id']	= male_id;
		p['female_id']	= female_id;
		new MyAjaxRequest ('breeding', 'dragons', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success)
					Seed.checkAddJob (rslt.dat.result.breeding_job);
			} else verboseLog('Ajax.dragonBreeding ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	dragonHandle : function (options, callback){
		/* options : { dragon_id, method, building_id }
		 method delete = Dismiss a dragon
		 method put = Remove a dragon from roost
		 method put + a roost building id = Set a dragon in the roost (boosts activated) */
		if (!options.dragon_id) return;
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']	  = (options.method || 'put');
		if (options && options.building_id) p['building_id'] = options.building_id;
		new MyAjaxRequest ('dragonHandle', 'dragons/'+ options.dragon_id, p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success) {
					if (options.method == 'delete') {
						delete (Seed.sanctuary_dragons[options.dragon_id]);
						if (Data.options.sanctuary.feeding[options.dragon_id]) delete (Data.options.sanctuary.feeding[options.dragon_id]);
					} else {
						Seed.player.boosts = cloneProps(rslt.dat.boosts);
						try {
							for (var i in rslt.dat.result.dragon) {
								var dragon = cloneProps(rslt.dat.result.dragon[i]);
								var dragon_name = dragon.type.substring(dragon.type.indexOf('::')+2);
								dragon_name = (dragon_name == 'CityGreatDragon') ? 'GreatDragon' : dragon_name;
								dragon.name = dragon_name;
								var dragon_rank = sanctuaryDragonRank[dragon.rank];
								dragon.type = dragon.gender+'-'+dragon_rank;
								dragon.subtype = ((i == 'city_great_dragon') ? 'great_dragon' : i).replace(/ |_/g,'-');
								Seed.sanctuary_dragons[dragon.id] = cloneProps(dragon);
							}
						} catch (e) {
							rslt.ok = false;
							rslt.errmsg = 'Exception - '+e.toString();
							verboseLog('Ajax.dragonHandle ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg)
						}
					}
				}
			} else verboseLog('Ajax.dragonHandle ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	dragonFeeding : function (dragon_id, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		new MyAjaxRequest ('feeding', 'dragons/'+ dragon_id +'/feed', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success)
					Seed.checkAddJob (rslt.dat.result.feeding_job);
			} else verboseLog('Ajax.dragonFeeding ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	getMinigame : function (type, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['ticket_type']  = type;
		new MyAjaxRequest ('minigame', 'minigames/index.json',p , mycb, false);
		function mycb (rslt){
			if (rslt.ok) {
				if (callback){
					callback ( {ok:rslt.ok,
								list:rslt.dat.result.prize_list,
								id:rslt.dat.result.minigame_timestamp,
								ticket:rslt.dat.result.has_free_ticket,
								golden:rslt.dat.result.has_free_golden_ticket} );
					return;
				}
			} else verboseLog('Ajax.getMinigame ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
			return;
		}
	},
	marchRecall : function (cityId, marchId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']		= 'delete';
		new MyAjaxRequest ('cancelmarch', 'cities/'+ cityId +'/marches/'+ marchId +'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (rslt.dat.result.success)
					Seed.updateCity(rslt.dat.result.city);
			} else verboseLog('Ajax.marchRecall ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	marchBusy : false,
	marchSend : function (cityId, x, y, generalId, units, ownerId, callback) {
		var t = MyAjax;
		
		t.marchBusy = true;
	    var dragon_type = null;
		var found_in_list = false;
		var u = {}
		var mt = false;
		var sendTroops = "{";
		for (var pu in units){
			if (units[pu] > 0) {
				for (var gd=0; gd < Seed.dragonList.length && !found_in_list; gd++) {
					if (Seed.dragonList[gd].type == units[pu]) {
						found_in_list = true;
						dragon_type = units[pu];
					}
				}
				u[pu] = units[pu];
				if (mt == true ){
					sendTroops += ',';
				}
				sendTroops += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		sendTroops += "}";

		var p = {};
		p = t.addMainParams();
		p['march[x]']			= x;
		p['march[y]']			= y;
		p['_method']			= 'post';
		p['march[units]']		= sendTroops;
		p['march[general_id]']	= generalId;
		p['march[march_type]']	= 'attack'; /* Fix to send only spies in attack */
		new MyAjaxRequest ('marches', 'cities/'+ cityId +'/marches.json', p, mycb, true);
		function mycb(rslt) {
			t.marchBusy = false;
			if (rslt.ok) {
				try {
					rslt.dat.result.job.ownerId = ownerId;
					if (rslt.dat.result.city.marches) {
						for (var i=0; i<rslt.dat.result.city.marches.length; i++) {
							if (rslt.dat.result.city.marches[i].id == rslt.dat.result.job.march_id)
								rslt.dat.result.city.marches[i].ownerId = ownerId;
						}
					}
					Seed.updateCity(rslt.dat.result.city);
					if (dragon_type !== null && Seed.dragons[dragon_type])
						Seed.dragons[dragon_type].is_in_city = false;
				} catch (e) {
					debugLog ('***********'+ e);
				}
			} else verboseLog('Ajax.marchSend ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	marchSpy : function (cityId, x, y, units, ownerId, callback) {
		var t = MyAjax;
		
		t.marchBusy = true;
		var u = {}
		var mt = false;
		var sendTroops = "{";
		for (var pu in units){
			if (units[pu] > 0) {
				u[pu] = units[pu];
				if (mt == true ){
					sendTroops += ',';
				}
				sendTroops += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		sendTroops += "}";

		var p = {};
		p = t.addMainParams();
		p['march[march_type]']	= 'spy';
		p['march[y]']			= y;
		p['march[units]']		= sendTroops;
		p['_method']			= 'post';
		p['march[x]']			= x;
		new MyAjaxRequest ('marches', 'cities/'+ cityId +'/marches.json', p, mycb, true);
		function mycb(rslt) {
			t.marchBusy = false;
			if (rslt.ok) {
				try {
					rslt.dat.result.job.ownerId = ownerId;
					if (rslt.dat.result.city.marches) {
						for (var i=0; i<rslt.dat.result.city.marches.length; i++) {
							if (rslt.dat.result.city.marches[i].id == rslt.dat.result.job.march_id)
								rslt.dat.result.city.marches[i].ownerId = ownerId;
						}
					}
					Seed.updateCity(rslt.dat.result.city);
				} catch (e) {
					debugLog ('***********'+ e);
				}
			} else verboseLog('Ajax.marchSpy ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	membership : function (alliance_id, id, method, callback){
		var t = MyAjax;
		var p = {}, json = 'alliances/'+ alliance_id +'/memberships';
		p = t.addMainParams();
		if (method == 'put')
			p['alliance_membership[approved]'] = 'true';
		if (method == 'invite')
			p['alliance_membership[player_id]'] = id;
		else {
			json += '/'+ id;
			p['_method'] = method;
		}
		new MyAjaxRequest ('membership', json, p, mycb, true);
		function mycb (rslt){
			if (!rslt.ok) verboseLog('Ajax.membership ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	messageDetail : function (id, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		new MyAjaxRequest ('reports_read', 'reports/'+ id +'.json',p , mycb, false);
		function mycb (rslt){
			if (rslt.ok) {
				var msg = rslt.dat.result.report_notification;
				var d = {id:msg.id,
						 created_at:msg.created_at,
						 summary:msg.summary,
						 type:msg.report_type,
						 from:msg.from,
						 unread:(is_null(msg.read_at) ? true : false),
						 report:(rslt.dat.result.report ? rslt.dat.result.report : null) };
				if ( Messages.details[msg.id] )
					 Messages.details[msg.id].mergeWith(d);
				else Messages.details[msg.id] = cloneProps(d);
				Messages.updateUnreadCount();
				if (callback){
					callback (rslt.dat.result);
					return;
				}
			} else verboseLog('Ajax.messageDetail ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
			return;
		}
	},
	messageDelete : function (ids, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']		= 'delete';
		p['ids']			= ids.join('|');
		new MyAjaxRequest ('reports_del', 'reports/bulk_delete.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				for (var i=0; i<ids.length; i++) {
					if (Messages.details[ids[i]]) delete(Messages.details[ids[i]]);
				}
				Messages.updateUnreadCount();
			} else verboseLog('Ajax.messageDelete ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt.ok);
			return;
		}
	},
	messageList : function (cat, numpage, count, callback){
		var t = MyAjax;
		if (!cat){
			cat = 'all';
		}
		var npage = (numpage == -1 ? 1 : numpage);
		var p = {};
		p = t.addMainParams();
		p['count']			= count;
		p['category']		= cat;
		p['page']			= npage;
		new MyAjaxRequest ('reports', 'reports.json', p, mycb, false);
		function mycb (rslt){
			if (rslt.ok) {
				Messages.total_count = rslt.dat.result.total;
				if (rslt.dat.result.report_notifications) {
					var msgs = rslt.dat.result.report_notifications;
					for (var i=0; i<msgs.length; i++) {
						var d = {id:msgs[i].id,
								 created_at:msgs[i].created_at,
								 summary:msgs[i].summary,
								 type:msgs[i].report_type,
								 from:msgs[i].from,
								 unread:(is_null(msgs[i].read_at) ? true : false) };
						if ( Messages.details[msgs[i].id] )
							 Messages.details[msgs[i].id].mergeWith(d);
						else Messages.details[msgs[i].id] = cloneProps(d);
					}
					Messages.updateUnreadCount();
				}
				if (callback) callback (rslt.dat.result);
				return;
			} else verboseLog('Ajax.messageList ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
			return;
		}
	},
	messageSend : function (subject, body, id, to_player, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		if (to_player)
			 p['player_id']		= id;
		else p['alliance_id']	= id;
		p['message[subject]'] = subject;
		p['message[message]'] = body;
		new MyAjaxRequest ('message', 'messages.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				if (callback){
					callback (rslt.dat.result);
					return;
				}
			} else verboseLog('Ajax.messageSend ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
		}
	},
	pollingList : function (callback){
		var t = MyAjax;
		var p = {};
		new MyAjaxRequest ('reports', 'poll.json', p, mycb, false);
		function mycb (rslt){
			if (rslt.ok) {
				if (callback) {
					callback (rslt.dat.result); /* should find unread_count (number) and next_attack (number) */
					return;
				}
			} else verboseLog('Ajax.pollingList ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (null);
			return;
		}
	},
	researchStart : function (cityId, researchType, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']		= 'post';
		p['research[research_type]'] = researchType;
		new MyAjaxRequest ('research', 'cities/'+ cityId +'/researches.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				Seed.updateCity (rslt.dat.result.city);
				Seed.checkAddJob (rslt.dat.result.job);
			} else verboseLog('Ajax.researchStart ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	save_sound : function (callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['cookie']			= '{"DoALocalSoundKey":{"sound":0,"music":0}}';
		new MyAjaxRequest ('cookie', 'cookie/save.json', p, mycb, true);
		function mycb (rslt){
			if (!rslt.ok) verboseLog('Ajax.save_sound ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt.ok);
			return;
		}
	},
	saveMinigame : function (id, type, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['ticket_type']	= type;
		p['minigame_timestamp']	= id;
		new MyAjaxRequest ('save_minigame', 'minigames/save_result.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				try {
					if (rslt.dat.result.items) Seed.player.items = cloneProps(rslt.dat.result.items);
					Seed.player.tickets.gold_club		= rslt.dat.result.tickets.fortunas_chance;
					Seed.player.tickets.fortunas_chance = rslt.dat.result.tickets.gold_club;
					if (callback){
						callback ( {ok:rslt.ok,
									item:rslt.dat.result.item_won} );
						return;
					}
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.name +' - '+ e.message;
					verboseLog( translate('Save minigame Error') +': ' + e.name +' - '+ e.message);
				}
			} else verboseLog( translate('Save minigame Error') +': ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	setDefenseForce : function (cityId, units, callback) {
		var t = MyAjax;
		var u = {};
		var mt = false;
		var defenseForce = "{";
		for (var pu in units){
			if (units[pu] > 0) {
				u[pu] = units[pu];
				if (mt == true ){
					defenseForce += ',';
				}
				defenseForce += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		defenseForce += "}";
		var p = {};
		p = t.addMainParams();
		p['_method']				= 'put';
		p['defense_force[units]']	= defenseForce;
		new MyAjaxRequest ('defense', 'cities/'+ cityId +'/defense_force.json', p, mycb, true);
		function mycb(rslt) {
			if (rslt.ok) {
				try {
					Seed.updateCity(rslt.dat.result.city);
				} catch (e) { debugLog ('***********'+ e); }
			} else verboseLog('Ajax.setDefenseForce ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	switchDefense : function (cityId, onOff, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['callback']		= 'function Function() {}';
		p['_method']		= 'put';
		p['defended']		= onOff ? '0' : '1';
		new MyAjaxRequest ('defended', 'cities/'+ cityId +'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				verboseLog( translate('switchDefense OK') );
				Seed.updateCity (rslt.dat.city);
			} else verboseLog( translate('switchDefense Error') +': ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	TransportMarch : function (cityId, x, y, units, resources, ownerId, callback) {
		var t = MyAjax;
		
		t.marchBusy = true;
		var r = {};
		var trs = false;
		var sendResources = "{";
		for (var pr in resources){
			if (resources[pr] > 0) {
				r[pr] = resources[pr];
				if (trs == true ){
					sendResources += ',';
				}
				sendResources += '"' + pr + '":' + resources[pr];
				trs = true;
			}
		}
		sendResources += "}";
		var u = {};
		var mt = false;
		var sendTroops = "{";
		for (var pu in units){
			if (units[pu] > 0) {
				u[pu] = units[pu];
				if (mt == true ){
					sendTroops += ',';
				}
				sendTroops += '"' + pu + '":' + units[pu];
				mt = true;
			}
		}
		sendTroops += "}";

		var p = {};
		p = t.addMainParams();
		p['march[type]']	= 'TransportMarch';
		p['march[y]']			= y;
		p['march[resources]']	= sendResources;
		p['march[units]']		= sendTroops;
		p['_method']			= 'post';
		p['march[x]']			= x;
		new MyAjaxRequest ('marches', 'cities/'+ cityId +'/marches.json', p, mycb, true);
		function mycb(rslt) {
			t.marchBusy = false;
			if (rslt.ok) {
				try {
					rslt.dat.result.job.ownerId = ownerId;
					if (rslt.dat.result.city.marches) {
						for (var i=0; i<rslt.dat.result.city.marches.length; i++) {
							if (rslt.dat.result.city.marches[i].id == rslt.dat.result.job.march_id)
								rslt.dat.result.city.marches[i].ownerId = ownerId;
						}
					}
					Seed.updateCity(rslt.dat.result.city);
					Data.marches.ressources[rslt.dat.result.job.march_id] = cloneProps(resources);
				} catch (e) { debugLog ('***********'+ e); }
			} else verboseLog('Ajax.marchSend ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	troopTraining : function (troopType, troopQty, cityId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']		  = 'post';
		p['units[quantity]']  = troopQty;
		p['units[unit_type]'] = troopType;
		new MyAjaxRequest ('training', 'cities/'+ cityId +'/units.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				Seed.updateCity (rslt.dat.result.city);
				Seed.checkAddJob (rslt.dat.result.job);
			} else verboseLog('Ajax.troopTraining ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	troopReviving : function (troopType, troopQty, cityId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['units[quantity]']  = troopQty;
		p['_method']		  = 'post';
		p['units[unit_type]'] = troopType;
		new MyAjaxRequest ('resurrect', 'cities/'+ cityId +'/units/resurrect.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) Seed.checkAddJob (rslt.dat.result.job);
			else verboseLog('Ajax.troopReviving ' + translate('was returned with a status of') + ' ' + rslt.ok + ' - ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	useItem : function (cityId, url, jobId, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['job_id']			= jobId;
		p['_method']		= 'delete';
		new MyAjaxRequest ('items', 'player_items/'+url+'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				try {
					if (rslt.dat.result.items) Seed.player.items = cloneProps(rslt.dat.result.items);
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.name +' - '+ e.message;
					verboseLog( translate('March speedup Error') +': ' + e.name +' - '+ e.message);
				}
			} else verboseLog( translate('March speedup Error') +': ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	},
	useSingleItem : function (url, callback){
		var t = MyAjax;
		var p = {};
		p = t.addMainParams();
		p['_method']		= 'delete';
		p['quantity']		= 1;
		new MyAjaxRequest ('items', 'player_items/'+url+'.json', p, mycb, true);
		function mycb (rslt){
			if (rslt.ok) {
				try {
					if (rslt.dat.result.items) Seed.player.items = cloneProps(rslt.dat.result.items);
				} catch (e) {
					rslt.ok = false;
					rslt.errmsg = e.name +' - '+ e.message;
					verboseLog( translate('Single item usage Error') +': ' + e.name +' - '+ e.message);
				}
			} else verboseLog( translate('Single item usage Error') +': ' + rslt.errmsg);
			if (callback) callback (rslt);
			return;
		}
	}
};
/******************************** MyAjax package *****************************/

/******************************** Auto-collect package ***********************/
var AutoCollect = {
	init : function (){
		var t = AutoCollect;
		t.setEnable (Data.options.autoCollect.enabled);
	},
	
	setEnable : function (onOff){
		var t = AutoCollect;
		clearTimeout (t.timer);
		Data.options.autoCollect.enabled = onOff;
		if (onOff){
			var time = (Data.options.autoCollect.delay*Data.options.autoCollect.unit) - serverTime() + Data.options.autoCollect.last_time;
			if (time <= 0){
				t.doit ();
			} else {
				t.timer = setTimeout (t.doit, time*1000);
			}
		}
	},
	
	doit : function (){
		var t = AutoCollect, offset = 0;
		Data.options.autoCollect.last_time = serverTime();
		if (Seed.player.boosts && Seed.player.boosts.collect_resources) {  /* Do not collect from OP if nano collector is running */
			actionLog (translate('Collected resources at outpost')+ ' : '+ translate('pause').initCap() +' ('+ translate('boost-collect-week') +')');
		} else {
			for (var out=2; out<Seed.cities.length; ++out){ /* Start at 2 (0=Capital, 1=Spectral) */
				if (Seed.cities[out] && Seed.cities[out].id	&& Buildings.getCount (out, 'Silo') > 0) { /* Do not collect if there's no silo on OP */
					++offset;
					collect (out, offset*Math.randRange(5000,10000));
				}
			}
		}
		var delay_time = ((Data.options.autoCollect.delay * Data.options.autoCollect.unit) + (Math.random()*120))*1000;
		t.timer = setTimeout (t.doit, delay_time);

		function collect (cityIdx, delay){
			setTimeout (function(){
				MyAjax.collectResources (Seed.cities[cityIdx].id);
				actionLog (translate('Collected resources at outpost')+ ' <B>#'+ cityIdx +'</B>');
			}, delay);
		}
	}
};
/******************************** Auto-collect package ***********************/

/******************************** Falsh auto-refresh package *****************/
var AutoRefresh = {
	timer			: null,
	current_mouse	: [0,0],
	last_mouse		: [0,0],
	last_time		: 0,

	init : function () {
		var t = AutoRefresh;
		t.setEnable (Data.options.flashRefresh.enabled);
	},
	setEnable : function (onOff) {
		var t = AutoRefresh;
		Data.options.flashRefresh.enabled = onOff;
		if (Data.options.flashRefresh.enabled){
			t.last_time = toNum(serverTime());
			window.addEventListener('mousemove', t.onMouseMove, false);
			t.onTimeout();
		} else {
			window.removeEventListener('mousemove', t.onMouseMove, false);
		}
	},
	onMouseMove : function (event) {
		AutoRefresh.current_mouse = [event.clientX, event.clientY];
	},
	onTimeout : function () {
		var t = AutoRefresh;
		clearTimeout(t.timer);
		if (t.current_mouse.join() !== t.last_mouse.join()) {
			t.last_time = toNum(serverTime());
			t.last_mouse = [].concat(t.current_mouse);
		}
		if (toNum(serverTime()) - t.last_time > Data.options.flashRefresh.delay*Data.options.flashRefresh.unit) {
			t.last_time = toNum(serverTime());
			verboseLog ('Flash refresh');
			setTimeout(toggleFlash,500);
			setTimeout(toggleFlash,5000);
		}
		if (Data.options.flashRefresh.enabled) {
			t.timer = setTimeout(t.onTimeout, 30000);
		}
	}
}
/******************************** Falsh auto-refresh package *****************/

/******************************** Buildings package **************************/
var Buildings = {
	getCount : function (cityIdx, type) {
		var nb = 0;
		for (var i=0; i < Seed.cities[cityIdx].buildings.length; i++) {
			if (Seed.cities[cityIdx].buildings[i].type === type) nb++;
		}
		return nb;
	},
	getList : function (cityIdx, type) {
		var ret = [];
		for (var i=0; i < Seed.cities[cityIdx].buildings.length; i++) {
			if (Seed.cities[cityIdx].buildings[i].type === type) ret.push (Seed.cities[cityIdx].buildings[i]);
		}
		return ret;
	},
	getLevel : function (cityIdx, type){
		var build_list = Buildings.getList(cityIdx, type );
		if (build_list.length < 1) return {min:0, max:0};
		build_list.sort(function(a,b){return a.level - b.level;});
		return {min:build_list[0].level, max:build_list[build_list.length-1].level};
	},
	getById : function (cityIdx, bid){
		for (var i=0; i < Seed.cities[cityIdx].buildings.length; i++){
			if (Seed.cities[cityIdx].buildings[i].id == b