// ==UserScript==
// @name           	Ikariam ExMachina (mobile version)
// @namespace      	ExMachina
// @description    	A collection of mods, tools ...
// @author		SHAB_RO
// @include       	http://*.ikariam.*/
// @include       	http://*.ikariam.*/index.php
// @include       	http://s*.ikariam.*/*
// @include       	http://m*.ikariam.*/*
// @exclude		http://*.ikariam.*/board
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        	http://userscripts.org/scripts/source/88158.user.js
// @require       	http://userscripts.org/scripts/source/94662.user.js
// @require       	http://userscripts.org/scripts/source/94663.user.js
// @version		5.0
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_openInTab
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @grant		GM_log
//
// ==/UserScript==


var startTime = new Date();

ScriptUpdater.check(138218, "5.0");


var isChrome = navigator.userAgent.match(/Chrome/i);

Config.prefix = document.domain;
Config.footerHtml = '';
Config.reloadOnSave = true;
Config.scriptName = "Ikariam ExMachina";
Config.settings = {
	"General":{
		fields:{
			externalArmyHelper:{
				type:'checkbox',
				label:'<a href="http://userscripts.org/scripts/show/59908" target="_blank" title="v0.23 by GrAndAG" style="font-weight:bold !important;">Army Helper</a>',
				text:'show troop layout in deployment screens (by <a href="http://userscripts.org/users/grandag" target="_blank">GrAndAG</a>)',
				value:false,
			},
			islandShowGarrisons:{
				type:'checkbox',
				label:'Garrisons',
				text:'show garrisons next to city names in island view (requires Army Helper enabled)',
				value: false,
			},
			keyboardShortcuts:{
				type:'checkbox',
				label:'Keyboard Shortcuts',
				text:'press 1 through # of cities to change city etc.',
				value:false,
			},
			antiPlus:{
				type:'checkbox',
				label:'Anti-Plus',
				text:'remove all Ikariam Plus features',
				value:false,
			},
			resourceLinks:{
				type:'checkbox',
				label:'Resource Links',
				text:'turn resource icons into links',
				value:true,
			},
			expandCargo:{
				type:'checkbox',
				label:'Expand Cargo',
				text:'always show cargo in military movements',
				value:true,
			},
			messagePreviews:{
				type:'checkbox',
				label:'Message Previews',
				text:'show first line of messages instead of subject',
				value:false,
			},
			ajaxNextMessages:{
				type:'checkbox',
				label:'Message Append',
				text:'append messages to list when clicking next...',
				value:false,
			},
			stripAds:{
				type:'checkbox',
				label:'Strip Ads',
				text:'remove banner ads',
				value:false,
			},
			stripFacebook:{
				type:'checkbox',
				label:'Strip Facebook',
				text:'remove facebook buttons',
				value:false,
			},
			sessionExpireRedirect:{
				type:'checkbox',
				label:'Session Redirect',
				text:'go to login page on session expire',
				value:false,
			},
			leftAlign:{
				type:'checkbox',
				label:'Left Align',
				text:'game window on left to leave room for things on right',
				value:false,
			},
			autoBuildFeaturesEnabled:{
				type:'checkbox',
				label:'Auto Build',
				text:'enable auto build features (in testing)',
				value:false,
			},
			allianceColor:{
				type:'checkbox',
				label:'Alliance Highlighter',
				text:'lets you highlight alliences in different colors',
				value:true,
			},
			hideFriendsBar:{
				type:'checkbox',
				label:'Hide Friends',
				text:'hide the friends bar',
				value:false,
			},
			hideGFBar:{
				type:'checkbox',
				label:'Hide GF Bar',
				text:'hide new top GameForge bar',
				value:false
			},
			autoAcceptDailyBonus:{
				type:'checkbox',
				label:'Automatically accept daily bonus',
				text:'Automatically accept daily bonus',
				value:true,
			}
		}
	},
	"Overviews":{
		fields:{
			empireOverview:{
				type:'select',
				label:'Empire',
				text:'overview of empire',
				options:{
					'Disabled':'none',
					'Dropdown':'dropdown',
					'Bottom':'bottom'
				},
				value:'dropdown',
			},
			buildingsOverview:{
				type:'select',
				label:'Buildings',
				text:'overview of buildings',
				options:{
					'Disabled':'none',
					'Dropdown':'dropdown',
					'Bottom':'bottom'
				},
				value:'dropdown',
			},
			militaryOverview:{
				type:'select',
				label:'Military',
				text:'overview of your armies',
				options:{
					'Disabled':'none',
					'Dropdown':'dropdown',
					'Bottom':'bottom'
				},
				value:'dropdown',
			},
			targetsOverview:{
				type:'checkbox',
				label:'Espionage',
				text:'espionage overview under research advisor',
				value:true,
			},
			movementsOverview:{
				type:'checkbox',
				label:'Movements',
				text:'overview of movements under show island',
				value:true,
			},
			buildingList:{
				type:'checkbox',
				label:'Building List',
				text:'add list of buildings to the show town button',
				value:false,
			},
			tradeOverview:{
				type:'checkbox',
				label:'Trade',
				text:'shows