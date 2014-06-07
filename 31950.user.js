/*==============================================================================
Google Fx
Version 2.35
2010-09-01
Copyright 2007, Pablo Custo
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

==============================================================================*/
// ==UserScript==
// @name         Google Fx
// @version      2.35
// @description  Many Improvements for Google (Autopager, Sidebars, MultiLanguage Suggest, ThumbShots, Image Preview, Toolbars, Filters & much more) - Fully Customizable - includes 8 Theme Colors with Iconization.
// @date         2010-09-01
// @creator      pablocusto@gmail.com
// @namespace    http://userscripts.org/scripts/show/31950
// @updateURL    http://userscripts.org/scripts/source/31950.user.js
// @include	http://*.google.*
// @include	https://*.google.*
// @include	http://similar-images.googlelabs.com/*
// @include	http://webcache.googleusercontent.com/*
// @include	https://webcache.googleusercontent.com/*
// @exclude	http://*analytics*
// @exclude	https://*analytics*
// @exclude	https://*.google.*/alerts/*
// @exclude	https://*.google.*/calendar/*
// @exclude	https://*.google.*/complete/*
// @exclude	https://*.google.*/ig/directory*
// @exclude	https://*.google.*/notebook/*
// @exclude	https://*.google.*/reader/*
// @exclude	https://*.google.*/toolkit/*
// @exclude	http://code.google.*
// @exclude	https://code.google.*
// @exclude	http://docs.google.*
// @exclude	https://docs.google.*
// @exclude	http://local.google.*
// @exclude	http://mail.google.*
// @exclude	https://mail.google.*
// @exclude	http://sites.google.*
// @exclude	https://sites.google.*
// @exclude	http://wave.google.*
// @exclude	https://wave.google.*
// ==/UserScript==
( function(unsafeWindow) {

//========================================================================================================
var SCRIPT_VER = '2.35';
var SCRIPT_NUM = '31950';
//========================================================================================================
var win = unsafeWindow, doc = document;
if(win!=win.top) return;
if( /^\/complete\/search/.test(doc.location.pathname) ){return;}

/* Initialization */
function GFX_Init()
{

/*========================================================================================================
                                                U S E R     S E T T I N G S   
==========================================================================================================*/
GFX = {

		_lastChk	: getValue('GFX._lastChk',		0),		/* To Check last Updates */

		bLeftNavAH	: getValue('GFX.bLeftNavAH',	true),	/* AutoHide Left Menu */

		bMnuChk		: getValue('GFX.bMnuChk',		true),	/* Check & Complete Google Menu */

		bMnuFix		: getValue('GFX.bMnuFix',		true),	/* Static Google Header */

		bMnuIcn		: getValue('GFX.bMnuIcn',		true),	/* Add Icons to Main Menu */

		bShtName	: getValue('GFX.bShtName',		true),	/* Short UserName */

		bSidebar	: getValue('GFX.bSidebar',		true),	/* Right SideBar feature */

		bStyles		: getValue('GFX.bStyles',		true),	/* Enabled Styles */

		bToolbar	: getValue('GFX.bToolbar',		true),	/* Toolbars options */


		bSrchs		: getValue('GFX.bSrchs',		true),	/* Others Searchers toolbar */

		bSrchsIcn	: getValue('GFX.bSrchsIcn',		true),	/* Icons reference in Other Searchers */


		gTheme		: getValue('GFX.gTheme',	'Default'),	/* Current Color Theme */
		
		gFxLogo		: getValue('GFX.gFxLogo',		true),	/* Google FX Logo */

		gNewVer		: getValue('GFX.gNewVer',		true),	/* Notify new versions of GoogleFx */

		gSuggest	: getValue('GFX.gSuggest',		true),	/* Google Suggest always */

		gSuggestLng	: getValue('GFX.gSuggestLng',	true),	/* Multi-Language switcher in Suggest */


		iAutoPag	: getValue('GFX.iAutoPag',		true),	/* Auto-Paging results for Images */
		
		iCounter	: getValue('GFX.iCounter',		true),	/* Counter numbers in images items */
		
		iOldStyle	: getValue('GFX.iOldStyle',		true),

		iPrev		: getValue('GFX.iPrev',			true),	/* Preview Original Image on MouseOver */

		iPrevNoIcn	: getValue('GFX.iPrevNoIcn',	false),	/* Show Preview when MouseOver on ThumbShots */

		iPrevRT		: getValue('GFX.iPrevRT',		200),	/* Reaction Time of Image Preview ( in millisecs ) */


		rAutoPag	: getValue('GFX.rAutoPag',		true),	/* Auto-Paging results */

		rAutoPagRT	: getValue('GFX.rAutoPagRT',	3),		/* Auto-Paging Sensitivity Detection ( 1=Min, 2=Normal, 3=High, 4=Extreme ) */

		rAutoPagNav	: getValue('GFX.rAutoPagNav',	false),	/* Navigator Bar for Auto-Paging */


		rCounter	: getValue('GFX.rCounter',		true),	/* Counter numbers in result items */


		rNoAds		: getValue('GFX.rNoAds',		true),	/* Hide Google Ads */

		rNoTrack	: getValue('GFX.rNoTrack',		true),	/* Remove Google Tracks */


		rRefIcn		: getValue('GFX.rRefIcn',		true),	/* Reference Links to Icons */


		rSiteFlt	: getValue('GFX.rSiteFlt',		true),	/* Site Filter feature */
		
		rTrgLnk		: getValue('GFX.rTrgLnk',		'_blank'),	/* Default Target of Links */

		rThShots	: getValue('GFX.rThShots',		true),	/* ThumbShots of results */
		
		rThSize		: getValue('GFX.rThSize',		0.75),	/* ThumbShots Ratio Size  (0.5 = 50% / 0.75 = 75% / 1 = 100% / 1.5 = 150%) */
		
		rThLft		: getValue('GFX.rThLft',		true),	/* ThumbShots Position ( "true" for Left, "false" for right) */


		rCols		: getValue('GFX.rCols',				1), /* Show Results in Columns */

		rNoAds		: getValue('GFX.rNoAds',		true),	/* Hide Google Ads */

		/* Right Panels */
		rSbar : {
			blogs		: getValue('GFX.rSbar.blogs',		true),
			books		: getValue('GFX.rSbar.books',		true),
			calc		: getValue('GFX.rSbar.calc',		true),
			images		: getValue('GFX.rSbar.images',		true),
			maps		: getValue('GFX.rSbar.maps',		true),
			movies		: getValue('GFX.rSbar.movies',		true),
			news		: getValue('GFX.rSbar.news',		true),
			related		: getValue('GFX.rSbar.related',		true),
			recents		: getValue('GFX.rSbar.recents',		true),
			translate	: getValue('GFX.rSbar.translate',	true),
			twitter		: getValue('GFX.rSbar.twitter',		true),
			video		: getValue('GFX.rSbar.video',		true),
			wikipedia	: getValue('GFX.rSbar.wikipedia',	true),
			youtube		: getValue('GFX.rSbar.youtube',		true)
		
		},
		
		/* Permanent Preferences */
		rPrefs : {
			safemode	: getValue('GFX.rPrefs.safemode', 'images'),
		},
		
		/* Run GoogleFx over */
		Srv	: {
			blogsearch	: getValue('GFX.Srv.blogsearch',	true),
			code		: getValue('GFX.Srv.code',			true),
			books		: getValue('GFX.Srv.books',			true),
			dirhp		: getValue('GFX.Srv.dirhp',			true),
			finance		: getValue('GFX.Srv.finance',		true),
			firefox		: getValue('GFX.Srv.firefox',		true),
			groups		: getValue('GFX.Srv.groups',		true),
			history		: getValue('GFX.Srv.history',		true),
			ig			: getValue('GFX.Srv.ig',			true),
			images		: getValue('GFX.Srv.images',		true),
			intl		: getValue('GFX.Srv.intl',			false),
			labs		: getValue('GFX.Srv.labs',			true),
			maps		: getValue('GFX.Srv.maps',			true),
			movies		: getValue('GFX.Srv.movies',		true),
			news		: getValue('GFX.Srv.news',			true),
			picasaweb	: getValue('GFX.Srv.picasaweb',		true),
			products	: getValue('GFX.Srv.products',		true),
			scholar		: getValue('GFX.Srv.scholar',		true),
			search		: getValue('GFX.Srv.search',		true),
			translate	: getValue('GFX.Srv.translate',		true),
			video		: getValue('GFX.Srv.video',			true)
		},



		mzBrd		: getValue('GFX.mzBrd',			true),	/* Mozilla Borders Radius */
		
		mzBrdTL		: getValue('GFX.mzBrdTL',		7),	/* Top Lef Rad */

		mzBrdTR		: getValue('GFX.mzBrdTR',		7),	/* Top Right Rad */

		mzBrdBL		: getValue('GFX.mzBrdBL',		7),	/* Bottom Lef Rad */

		mzBrdBR		: getValue('GFX.mzBrdBR',		7),	/* Bottom Right Rad */
};


/******************************************************************************************************************
                                                C S S    S t y l e s      
*******************************************************************************************************************/
CSS = {
	body:		getValue('CSS.body', 'color:#333; background-color:#f2f2f2;'),

	menus:		getValue('CSS.menus', 'color:#222; background-color:#fff; border-color:#abd; border-style:solid; border-width:1px;'),
	
	header:		getValue('CSS.header', 'color:#555; background-color:#fdfdfd; border-color:#aabbcc; border-width:1px; border-style:solid; box-shadow: 3px 3px 6px #99a;'),

	inputbox:	getValue('CSS.inputbox', 'color:#000; background-color:#eeeeee; border-color:#329fed; border-width:1px; border-style:solid;'),
	
	buttons:	getValue('CSS.buttons', 'color:#fff; background-color:#7788dd; border-color:#445577; border-width:1px; border-style:solid;'),
	
	infobar:	getValue('CSS.infobar', 'color:#446; background-color:#d0e0ff; border-color:#c9d7f1; border-width:1px; border-style:solid;'),
	
	resbox:		getValue('CSS.resbox', 'color:#333; background-color:#ffffff; border-color:#bbccdd; border-width:1px; border-style:solid; margin-top:2px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:4px; padding-bottom:5px;'),

	thumbs:		getValue('CSS.thumbs', 'border-color:#000; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;'),
	
	titles:		getValue('CSS.titles', 'color:#00b; font-family:arial,sans-serif; font-size:14pt; font-weight:normal; margin-bottom:1px;'),
	
	counter:	getValue('CSS.counter', 'color:#333; float:left; font-family:arial,sans-serif; font-weight:normal; font-size:14pt; margin-right:5pt; margin-top: -2pt;'),

	desc:		getValue('CSS.desc', 'color:#222; font-size:10pt;'),

	highlights:	getValue('CSS.highlights', 'border-color:#d90; border-style:dashed; border-width:1px; font-style:normal;'),


	url:		getValue('CSS.url', 'color:#070; font-size:10pt;'),
	
	links:		getValue('CSS.links', 'color:#186d73; font-size:10pt;'),

	notes:		getValue('CSS.notes', 'color:#222;'),
	
	mzborder:	'border-top-left-radius:' + GFX.mzBrdTL + 'px;'+
				'border-top-right-radius:' + GFX.mzBrdTR + 'px;'+
				'border-bottom-left-radius:' + GFX.mzBrdBL + 'px;'+
				'border-bottom-right-radius:' + GFX.mzBrdBR + 'px;'

};


THEMES = {
	MyTheme:{
		color	:(CSS.resbox.match(/background-color:([^;]+)/)||[,''])[1],
		bgcolor	:(CSS.body.match(/background-color:([^;]+)/)||[,''])[1],
		styles	:JSON.encode(CSS)},
	Default:{
		color	:'#44b',
		bgcolor	:'#f2f2f2',
		styles	:'{\
			"body"		: "color:#333; background-color:#f2f2f2;",\
			"menus"		: "color:#222; background-color:#ffffff; border-color:#aabbdd; border-width:1px; border-style:solid;",\
			"header"	: "color:#555; background-color:#fdfdfd; border-color:#aabbcc; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #aaa;",\
			"inputbox"	: "color:#000; background-color:#eeeeee; border-color:#329fed; border-width:1px; border-style:solid;",\
			"buttons"	: "color:#fff; background-color:#7788dd; border-color:#445577; border-width:1px; border-style:solid;",\
			"infobar"	: "color:#446; background-color:#d0e0ff; border-color:#c9d7f1; border-width:1px; border-style:solid;",\
			"resbox" 	: "color:#333; background-color:#ffffff; border-color:#bbccdd; border-width:1px; border-style:solid; margin-top:2px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:4px; padding-bottom:5px;",\
			"thumbs" 	: "border-color:#000; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
			"titles" 	: "color:#00b; font-family:arial,sans-serif; font-size:14pt; font-weight:normal; margin-bottom:1px;",\
			"counter" 	: "color:#333; float:left; font-family:arial,sans-serif; font-weight:normal; font-size:14pt; margin-right:5pt; margin-top: -2pt;",\
			"desc" 		: "color:#222; font-size:10pt;",\
			"highlights": "border-color:#d90; border-style:dashed; border-width:1px; font-style:normal;",\
			"url"		: "color:#070; font-size:10pt;",\
			"links"		: "color:#186d73; font-size:10pt;",\
			"notes"		: "color:#222;",\
			"mzborder"	: "border-radius:7px;"\
		}'
	},
	Gray:{
		color	:'#ccc',
		bgcolor	:'#666',
		styles	:'{\
		"body"		: "color:#bbb; background-color:#222;",\
		"menus"		: "color:#ccc; background-color:#333; border-color:#000; border-width:1px; border-style:solid;",\
		"header"	: "color:#999; background-color:#444; border-color:#777; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #111;",\
		"inputbox"	: "color:#eee; background-color:#222; border-color:#7be; border-width:1px; border-style:solid;",\
		"buttons"	: "color:#fff; background-color:#555; border-color:#111; border-width:1px; border-style:solid;",\
		"infobar"	: "color:#333; background-color:#888; border-color:#999; border-width:1px; border-style:solid;",\
		"resbox"	: "color:#333; background-color:#666; border-color:#111; border-width:1px; border-style:solid; margin-top:3px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:6px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#666; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "color:#fff; font-family:Trebuchet MS, Georgia, serif; font-size:14pt; font-weight:normal; margin-bottom:1px;",\
		"counter"	: "color:#333; float:left; font-family:Trebuchet MS, Georgia, serif; font-weight:normal; font-size:16pt; margin-right:5pt; margin-top: -2pt;",\
		"desc"		: "color:#ccc; font-size:10pt;",\
		"highlights": "border-color:#d90; border-style:dashed; border-width:1px; font-style:normal;",\
		"url"		: "color:#ADFF9E; font-size:10pt;",\
		"links"		: "color:#fea; font-size:10pt;",\
		"notes"		: "color:#222;",\
		"mzborder"	: "border-radius:7px;"\
		}'
	},
	Plastic:{
		color	:'#9b7',
		bgcolor	:'#303545',
		styles	:'{\
		"body"		: "color:#ddd; background-color:#000;",\
		"menus"		: "color:#c0c9d5; background-color:#101520; border-color:#789; border-width:1px; border-style:solid;",\
		"header"	: "color:#89a; background-color:#202530; border-color:#567; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #111;",\
		"inputbox"	: "color:#fff; background-color:#101520; border-color:#bcd; border-width:1px; border-style:solid;",\
		"buttons"	: "color:#fff; background-color:#345; border-color:#99a; border-width:1px; border-style:solid;",\
		"infobar"	: "color:#9ab; background-color:#303545; border-color:#567; border-width:1px; border-style:solid;",\
		"resbox"	: "color:#bbb; background-color:#202529; border-color:#404549; border-width:1px; border-style:solid; margin-top:3px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:6px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#678; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "font-family:trebuchet ms, georgia, serif; font-size:14pt; font-weight:normal; color:#ffc; margin-bottom:1px;",\
		"counter"	: "font-family:trebuchet ms, georgia, serif; font-size:16pt; font-weight:normal; color:#767; margin-top:-2pt; margin-right:5pt; float:left;",\
		"desc"		: "font-size:10pt; color:#90a0b0;",\
		"highlights": "font-weight:bold; border-color:#49418c; border-width:1px; border-style:dotted;",\
		"url"		: "font-size:10pt; color:#9b7;",\
		"links"		: "font-size:10pt; color:#dc9;",\
		"notes"		: "color:#43a4c4;",\
		"mzborder"	: "border-top-left-radius:9px; border-top-right-radius:3px; border-bottom-left-radius:3px; border-bottom-right-radius:9px;"\
		}'
	},
	Black:{
		color	:'#bbb',
		bgcolor	:'#000',
		styles	:'{\
		"body"		: "color:#aaa; background-color:#000;",\
		"menus"		: "color:#c8c8c8; background-color:#000; border-color:#828282; border-width:1px; border-style:solid;",\
		"header"	: "color:#777; background-color:#222; border-color:#555; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #111;",\
		"inputbox"	: "color:#eee; background-color:#000; border-color:#ccc; border-width:1px; border-style:solid;",\
		"buttons"	: "color:#fff; background-color:#444; border-color:#bbb; border-width:1px; border-style:solid;",\
		"infobar"	: "color:#999; background-color:#333; border-color:#777; border-width:1px; border-style:solid;",\
		"resbox"	: "color:#bbb; background-color:#222; border-color:#555; border-width:1px; border-style:solid; margin-top:3px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:6px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#aaa; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "font-family:trebuchet ms, georgia, serif; font-size:14pt; font-weight:normal; color:#fff; margin-bottom:1px;",\
		"counter"	: "font-family:trebuchet ms, georgia, serif; font-size:16pt; font-weight:normal; color:#999; margin-top:-2pt; margin-right:5pt; float:left;",\
		"desc"		: "font-size:10pt; color:#aaa;",\
		"highlights": "font-style:normal; border-color:#c66; border-width:1px; border-style:dashed;",\
		"url"		: "font-size:10pt; color:#92a674;",\
		"links"		: "font-size:10pt; color:#dc9;",\
		"notes"		: "color:#777;",\
		"mzborder"	: "border-top-left-radius:7px; border-top-right-radius:7px; border-bottom-left-radius:7px; border-bottom-right-radius:7px;"\
		}'
	},
	Chocolate:{
		color	:'#a68e71',
		bgcolor	:'#543d28',
		styles	:'{\
			"body"		: "color:#917750; background-color:#26170d;",\
			"menus"		: "color:#a68e71; background-color:#2b1e12; border-color:#5c4727; border-width:1px; border-style:solid;",\
			"header"	: "color:#8a7254; background-color:#382719; border-color:#6c5737; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #140c02;",\
			"inputbox"	: "color:#f2ea9d; background-color:#140c02; border-color:#edc80c; border-width:1px; border-style:solid;",\
			"buttons"	: "color:#d6bc9c; background-color:#4d2707; border-color:#754e1e; border-width:1px; border-style:solid;",\
			"infobar"	: "color:#947550; background-color:#543d28; border-color:#694b19; border-width:1px; border-style:solid;",\
			"resbox"	: "color:#333333; background-color:#4d3a29; border-color:#7c6747; border-width:1px; border-style:solid; margin-top:3px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:6px; padding-bottom:5px;",\
			"thumbs"	: "border-color:#917750; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
			"titles"	: "color:#e8c88e; font-family:trebuchet ms, georgia, serif; font-size:14pt; font-weight:normal; margin-bottom:1px;",\
			"counter"	: "color:#887766; font-family:trebuchet ms, georgia, serif; font-size:14pt; font-weight:normal; margin-top:-2pt; margin-right:5pt; float:left;",\
			"desc"		: "color:#9c8767; font-size:10pt;",\
			"highlights": "border-color:#d90; border-width:1px; border-style:dashed; font-style:normal;",\
			"url"		: "color:#8a5f20; font-size:10pt;",\
			"links"		: "color:#ffeeaa; font-size:10pt;",\
			"notes"		: "color:#b57b4e;",\
			"mzborder"	: "border-top-left-radius:9px; border-top-right-radius:3px; border-bottom-left-radius:3px; border-bottom-right-radius:9px;"\
		}'
	},
	FaceBook:{
		color	:'#eceff5',
		bgcolor	:'#4b69a8',
		styles	:'{\
		"body"		: "color:#333; background-color:#f2f2f2; font-family:tahoma,verdana,arial,sans-serif;",\
		"menus"		: "color:#fff; background-color:#3b5998; border-color:#333; border-style:solid; border-width:1px; font-family:tahoma,verdana,arial,sans-serif;",\
		"header"	: "color:#333; background-color:#eceff5; border-color:#94a3c4; border-width:1px; border-style:solid; font-family:tahoma,verdana,arial,sans-serif; box-shadow: 2px 2px 10px #88a;",\
		 "inputbox"	: "color:#000; background-color:#fff; border-color:#111; border-width:1px; border-style:solid; font-family:tahoma,verdana,arial,sans-serif;",\
		"buttons"	: "color:#fff; background-color:#5b74a8; background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAwCAYAAAAYX/pXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAI1JREFUSEvtk8sNwkAMBR9dEgj/Dkj4d0AN3AkJNEFjD6/ogLlw8EpznFnJskfX29sib3N5mSAiF5cH1uenCVpFgKDlaTCBBxbHwQQRubiaH3oTNNv3JqjePUxQ3UYAoGnbmaBJBAiqms4EVdsIACJwj8Dv8MA4fieIyMXNQM4g9+B7hHkLOYPcg3+5hQ+t2jxSvFYtygAAAABJRU5ErkJggg==\'); background-repeat:repeat; border-color:#29447e; border-bottom-color:#1a356e; border-style:solid; border-width:1px; font-family:tahoma,verdana,arial,sans-serif; padding-bottom:2px; padding-left:6px; padding-right:6px; padding-top:2px;",\
		"infobar"	: "color:#333; background-color:#d8dee8; border-color:#8992a3; border-width:1px; border-style:solid; font-family:tahoma,verdana,arial,sans-serif;",\
		"resbox"	: "color:#333; background-color:#fff; border-color:#ddd; border-width:1px; border-style:solid; font-family:tahoma,verdana,arial,sans-serif; margin-top:2px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:4px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#000; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "font-family:tahoma,verdana,arial,sans-serif; font-weight:700; font-size:13pt; color:#38578c; margin-bottom:1px;",\
		"counter"	: "color:#555; float:left; font-family:tahoma,verdana,arial,sans-serif; font-weight:normal; font-size:13pt; margin-right:5pt; margin-top: -2pt;",\
		"desc"		: "color:#454545; font-family:tahoma,verdana,arial,sans-serif; font-size:10pt;",\
		"highlights": "border-color:#ccc312; border-style:dashed; border-width:1px; font-style:normal;",\
		"url"		: "color:#575; font-family:tahoma,verdana,arial,sans-serif; font-size:10pt;",\
		"links"		: "font-family:tahoma,verdana,arial,sans-serif; font-size:10pt; color:#56458f;",\
		"notes"		: "color:#222;",\
		"mzborder	" :"border-radius:2px;"\
		}'
	},
	SeaGreen:{
		color	:'#b4d6db',
		bgcolor	:'#497b8a',
		styles	:'{\
		"body"		: "color:#d3dfe0; background-color:#30505e;",\
		"menus"		: "color:#b4d6db; background-color:#1f4652; border-color:#0b1b21; border-width:1px; border-style:solid;",\
		"header"	: "color:#a1bbbf; background-color:#175669; border-color:#021724; border-width:1px; border-style:solid; box-shadow: 2px 2px 10px #10252b;",\
		"inputbox"	: "color:#eee; background-color:#10252b; border-color:#089dcf; border-width:1px; border-style:solid;",\
		"buttons"	: "color:#fff; background-color:#22939c; border-color:#accee8; border-width:1px; border-style:solid;",\
		"infobar"	: "color:#24404a; background-color:#4e8899; border-color:#82a3bd; border-width:1px; border-style:solid;",\
		"resbox"	: "color:#333; background-color:#497b8a; border-color:#063033; border-width:1px; border-style:solid; margin-top:3px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:6px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#000; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "font-family:trebuchet ms, georgia, serif; font-size:14pt; font-weight:normal; color:#eff; margin-bottom:1px;",\
		"counter"	: "font-family:trebuchet ms, georgia, serif; font-size:16pt; font-weight:normal; color:#223e42; margin-top:-2pt; margin-right:5pt; float:left;",\
		"desc"		: "font-size:10pt; color:#012324;",\
		"highlights": "border-color:#d90; border-style:dashed; border-width:1px; font-style:normal;",\
		"url"		: "color:#ADFF9E; font-size:10pt;",\
		"links"		: "color:#fea; font-size:10pt;",\
		"notes"		: "color:#b8bf2c;",\
		"mzborder"	: "border-radius:7px;"\
		}'
	},
	Violet:{
		color	:'#fafafc',
		bgcolor	:'#533d75',
		styles	:'{\
		"body"		: "color:#b28dcc; background-color:#533d75;",\
		"menus"		: "color:#e8d1e3; background-color:#481963; border-color:#b98ed4; border-width:1px; border-style:solid;",\
		"header"	: "color:#fafafc; background-color:#5d4187; border-color:#3e0e4a; border-width:1px; border-style:solid;  box-shadow: 2px 2px 10px #432d65;",\
		"inputbox"	: "color:#000; background-color:#f5f2fa; border-color:#d9166d; border-width:1px; border-style:solid;",\
		"buttons"	: "color:#fff; background-color:#885eb8; border-color:#111; border-width:1px; border-style:solid;",\
		"infobar"	: "color:#68328a; background-color:#a380d9; border-color:#4a285e; border-width:1px; border-style:solid;",\
		"resbox"	: "background-color:#9d7ac4; border-color:#471752; border-width:1px; border-style:solid; margin-top:2px; padding-top:0px; padding-left:0px; padding-right:5px; margin-bottom:4px; padding-bottom:5px;",\
		"thumbs"	: "border-color:#471752; margin-top:7px; margin-left:7px; margin-right:7px; margin-bottom:7px; border-style:solid; border-width:1px;",\
		"titles"	: "font-size:14pt; color:#ffffff; margin-bottom:1px;",\
		"counter"	: "font-size:16pt; font-weight:normal; color:#61419c; margin-top:-2pt; margin-right:5pt; float:left;",\
		"desc"		: "font-size:10pt; color:#40057a;",\
		"highlights": "font-style:normal; border-color:#efb7f7; border-width:1px; border-style:dashed;",\
		"url"		: "font-size:10pt; color:#f191f2;",\
		"links"		: "font-size:10pt; color:#ffdbfa;",\
		"notes"		: "color:#efb7f7;",\
		"mzborder"	: "border-top-left-radius:9px; border-top-right-radius:3px; border-bottom-left-radius:3px; border-bottom-right-radius:9px;"\
		}'
	},
};



/******************************************************************************************************************
                                                     Searchers
*******************************************************************************************************************/
SEARCHER = {

	/* Web Searchers */
	search:{
		_commons:{

	/**-------------------------------------------------------------------------------------------------
	Sintax:

	         SiteName : [ ' < Domain-Url>  '  ,   ' < Query-Path > '    , ' [ Favicon ] '  ]


	* Domain-URL       String URL of the domain site

	* Query-Path         String of Path & Query (the last value must be the query to search)
					         or
			Can be an array in case of complex search path querys
			( the query to seach is between the array elements )
			ex: 
			       [ ' /some/path/?search= ' , ' &more_options ' ]

	* Favicon         ( optional ) Can be a relative or absolute path to favicon or a data base64 image
	-----------------------------------------------------------------------------------------------------*/

			AllTheWeb :['www.alltheweb.com'     ,'/search?q='							],
			Ask       :['web.ask.com'           ,'/web?q='								],
			Bing      :['www.bing.com'          ,'/search?q='							],
			Exalead   :['www.exalead.com'       ,'/search/web/results/?q='				],
			DDG       :['duckduckgo.com'       ,'/?q='				],
			IxQuick   :['us2.ixquick.com'       ,'/do/metasearch.pl?cat=web&cmd=process_search&query='	],
			Lycos     :['search.lycos.com'      ,'/cgi-bin/pursuit?query=', 'http://search.lycos.es/favicon.ico'	],
			SurfCanyon:['search.surfcanyon.com' ,'/search?q='							],
			Wiki      :['en.wikipedia.org'      ,'/wiki/Special:Search?go=go&search='	],
			Yahoo     :['search.yahoo.com'      ,'/search?p='    ,'/'					],
			Yauba     :['www.yauba.com'        ,'/?query='				            	],
		},
		ar:{ Wiki:['ar.wikipedia.org'] },
		bg:{ Wiki:['bg.wikipedia.org'] },
		ca:{ Wiki:['ca.wikipedia.org'] },
		cs:{ Wiki:['cs.wikipedia.org'] },
		da:{ Wiki:['da.wikipedia.org'] },
		de:{ Wiki:['de.wikipedia.org'] },
		el:{ Wiki:['el.wikipedia.org'] },
		en:{ },
		eo:{ Wiki:['eo.wikipedia.org'] },
		es:{
			Lycos		:['search.lycos.es'	],
			Taringa		:['www.taringa.net'		,'/buscador-taringa.php?q=', 'http://i.t.net.ar/images/favicon.ico'],
			Wiki		:['es.wikipedia.org'	],
			Yahoo		:['es.search.yahoo.com'	],
			},
		et:{ Wiki:['et.wikipedia.org'] },
		fi:{ Wiki:['fi.wikipedia.org'] },
		fr:{ Wiki:['fr.wikipedia.org'] },
		gl:{ Wiki:['gl.wikipedia.org'] },
		he:{ Wiki:['he.wikipedia.org'] },
		hu:{ Wiki:['hu.wikipedia.org'] },
		hr:{ Wiki:['hr.wikipedia.org'] },
		id:{ Wiki:['id.wikipedia.org'] },
		it:{ Wiki:['it.wikipedia.org'] },
		ja:{ Wiki:['ja.wikipedia.org'] },
		ko:{ Wiki:['ko.wikipedia.org'] },
		lt:{ Wiki:['lt.wikipedia.org'] },
		ms:{ Wiki:['ms.wikipedia.org'] },
		nl:{ Wiki:['nl.wikipedia.org'] },
		no:{ Wiki:['no.wikipedia.org'] },
		pl:{
			Allegro		:['www.allegro.pl'		,'/search.php?string=', 'http://static.allegro.pl/site_images/1/0/common/favicon.ico'],
			Ceneo		:['www.ceneo.pl'	,'/categories.aspx?search=yes&categoryID=0&inDesc=False&minPrice=0&maxPrice=99999999&searchText='],
			Elektroda	:['szukaj.elektroda.pl'	,'/search.php?mode=results&fraza=+'],
			Wiki		:['pl.wikipedia.org'],
			Wykop		:['www.wykop.pl'		,'/search?phrase='],
			Yahoo		:['uk.search.yahoo.com'],
			},
		pt:{ Wiki:['pt.wikipedia.org'] },
		ro:{ Wiki:['ro.wikipedia.org'] },
		ru:{ Wiki:['ru.wikipedia.org'] },
		sk:{ Wiki:['sk.wikipedia.org'] },
		sl:{ Wiki:['sl.wikipedia.org'] },
		sr:{ Wiki:['sr.wikipedia.org'] },
		sv:{ Wiki:['sv.wikipedia.org'] },
		te:{ Wiki:['te.wikipedia.org'] },
		th:{ Wiki:['th.wikipedia.org'] },
		tr:{ Wiki:['tr.wikipedia.org'] },
		uk:{ Wiki:['uk.wikipedia.org'] },
		vo:{ Wiki:['vo.wikipedia.org'] },
		zh:{ Wiki:['zh.wikipedia.org'] }
	},


	/* Specials Searchers */
	special:{
		_commons:{
			BtJunkie		:['btjunkie.org'		,'/search?q='],
			FileWatcher		:['www.filewatcher.com'	,'/_/?q='],
			isoHunt			:['isohunt.com'			,'/torrents/?ihq='],
			MiniNova		:['www.mininova.org'	,'/search/?search='],
			PirateBay		:['thepiratebay.org'	,['/search/','/0/99/0']],
			RapidLib		:['rapid.tvphp.net'		,'/?q=','data:image/gif;base64,R0lGODdhEAAQAO4AAPr5+/nQy7rK4+qfkeHp9PrKw/zy8PjCu8DP5dHb6YSo0nCaysLT6Pq/teft9v+rg6i/3Iqq00KR0vipiPB8crLJ5SyY4OQ7AP6fgvnX0fmyqmKRxUSEw/W4sDF5vpqsziaOz/+wkRh6yQBQmjGo6iqr87Hb+Nfi78nZ65PK8EO09Ozw93XI9pbV+P61hABNmfX4+6Xc/fukm/iYjeuej/eakP63ivCbhvP2+vWaivONgeRDBfg9A/tuBvtfBf9hAPo2AOQtAP9TAMHq//EjB/qcaPqSW/STgNrz/vp0KvhnCPxcB+FIDvIpCvqmnKG82JGw1p2425u32TeW0yml64iw1o6u1abH6ZLG57HH4Tyi5rbL42+z37XD3BqS4b7R56vP7PvKvpvQ8zmx8zyAwfOxqRZhpf71867W9HXF8naezYmmzP3y7SCKzluRydfi8CaBzMPZ8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAH34AAgoODZwaHgzArBA4OBDiCGQEBGYMOCAICDJlvAAEHBwGDBBUQXwAMEBUABRoaooInUlYCACgRUQAHTjIFgygKalkACAsRAA01M2GDDAsLCidQGwoAHUc6DYNbHBxkHh5uKwBlFBTagldwIhJxEiJYABhNRDmDaFoWaQBiXhZIGHgAmTDIhIoSLAC0KDFmyIMlQggKMkgiYQsqJGK46PEjhCA2YKaA4AIgRRsQKWwo8ZGkiJEHT8yM2ABgzYsRVUIw2XHhQpAbBBB0SQAgwYcPCQoMGEBjaQdCUKMCCAQAOw=='],
			RapidLibrary	:['www.rapidlibrary.com'	,'/index.php?q='],
			Rapidpedia		:['www.rapidpedia.com'		,'/?q='],
			RapidShareData	:['www.rapidsharedata.com'	,'/tag/'],
			SeedPeer		:['www.seedpeer.com'		,'/search.php?search='],
			Taringa			:['www.taringa.net'			,'/buscador-taringa.php?q='],
			Torrentz		:['www.torrentz.com'		,'/search?q='],
		}
	},


	/* Blogs Searchers */
	blogsearch:{
		_commons:{
			Ask			:['www.ask.com'					,'/blogsearch?q='],
			Bloglines	:['www.bloglines.com'			,'/search?t=1&q='],
			BlogPulse	:['www.blogpulse.com'			,'/search?query='],
			BlogScope	:['www.blogscope.net'			,'/?q=',
				'http://www.blogscope.net/images/favicon.gif'],
			BlogSearcher:['www.blogsearchengine.com'	,'/blog-search/?action=Search&q='],
			IceRocket	:['www.icerocket.com'			,'/search?tab=blog&q='],
			Sphere		:['www.sphere.com'				,'/sphereit/?sortby=rel&q='],
			Technorati	:['technorati.com'				,'/search?return=sites&q='],
			Twingly		:['www.twingly.com'				,'/search?q=',
				'http://static.twingly.com/content/images/favicon.ico'],
			Yahoo		:['us.builder.search.yahoo.com'	,'/search?ei=UTF-8&fr=ystg-c&mobvs=0&p=',
				'http://search.yahoo.com/favicon.ico'],
		},
		en:{ Twingly:[ false, '/search?lang=en&q='] },
		es:{ Twingly:[ false, '/search?lang=es&q='] },
		pl:{ Twingly:[ false, '/search?lang=pl&q='] }
	},


	/* Books Searchers */
	books:{
		_commons:{
			Amazon		:['www.amazon.com'				,['/exec/obidos/redirect?link_code=ur2&camp=1789&creative=9325&path=external-search%3Fsearch-type=ss%26keyword=','%26index=books']],
			BarnesNoble	:['search.barnesandnoble.com'	,'/booksearch/results.asp?WRD='],
			Blackwells	:['bookshop.blackwell.co.uk'  	,'/jsp/search_results.jsp?wcp=1&quicksearch=1&searchType=keywords&searchData='],
			NYTimes		:['topics.nytimes.com'			,'/top/features/books/bookreviews/?s=closest&amp;match=all&amp;query='],
			ReviewScout	:['www.reviewscout.com'			,['/','/']],
		}
	},


	/* Image Searchers */
	images:{
		_commons:{
			AllTheWeb	:['www.alltheweb.com'			,'/search?cat=img&q='],
			Ask			:['images.ask.com'				,'/pictures?q='],
			Bing		:['www.bing.com'				,'/images/?q='],
			Exalead		:['www.exalead.com'  			,'/search/image/results/?q='],
			Flickr		:['www.flickr.com'				,'/search/?z=t&q='],
			IxQuick     :['us2.ixquick.com'     		,'/do/metasearch.pl?cat=pics&cmd=process_search&query='	],
			Photobucket	:['photobucket.com'				,['/search/','/']],
			PicSearch	:['www.picsearch.com'			,'/search.cgi?q='],
			Picasa		:['picasaweb.google.com'		,'/lh/searchbrowse?psc=G&filter=0&q='],
			SmugMug		:['www.smugmug.com'				,'/search/index.mg?searchType=Image&searchWords='],
			WebShots	:['www.webshots.com'			,'/search?query='],
			Yahoo		:['images.search.yahoo.com'		,'/search/images?p='],
			deviantART	:['search.deviantart.com'		,'/?section=browse&qh=boost%3Apopular+age_sigma%3A24h+age_scale%3A5&q='],
		}
	},


	/* News Searchers */
	news:{
		_commons:{
			AllTheWeb	:['www.alltheweb.com'			,'/search?cat=news&amp;q='],
			Ask			:['news.ask.com'				,'/news?q='],
			Bing		:['www.bing.com'				,'/news/?q='],
			Bloglines	:['www.bloglines.com'			,'/search?t=1&q='],
			CNN			:['search.cnn.com'				,'/pages/search.jsp?type=news&sortBy=date&intl=true&query=',
						'http://edition.cnn.com/favicon.ico'],
			Lycos		:['search.lycos.com'			,'/default.asp?tab=news&query='],
			Sky_News	:['search.sky.com'				,'/search/skynews/results/1,,,00.html?QUERY='],
			Yahoo		:['news.search.yahoo.com'		,'/search/news/?p='],
		},
		pl:{
			Dziennik	:['www.dziennik.pl'			,'/archiwum/?to=on&se=&search.execute=true&lucyStemmed=1&lucyField=2&lucySection=2&lucyFromDateOn=false&lucyToDateOn=false&lucySort=1&lucyMaxNumberResultsSorted=500&lucyOptimized=false&lucyExpr='],
			Interia		:['szukaj.interia.pl'		,'/szukaj?q=', 'http://www.interia.pl/interia.ico'],
			Onet		:['szukaj.onet.pl'			,'/onet.html?qt=', 'http://www.onet.pl/favicon.ico'],
			RMF			:['www.rmf.fm'				,'/fakty/search/?hid=1&s='],
			TVN24		:['www.tvn24.pl'			,'/szukaj.html?wideo=0&q='],
			WP			:['szukaj.wp.pl'			,'/szukaj.html?szukaj='],
			Wykop		:['www.wykop.pl'			,'/search?phrase='],
		}
	},


	/* Products Searchers */
	products:{
		_commons:{
			Yahoo		:['shopping.yahoo.com'		,'/search?p='],
			eBay		:['search.ebay.com'			,'/search/search.dll?query='],
		},
		en:{
			CNET		:['shopper-search.cnet.com'	,'/search?q=',	'http://www.cnet.com/favicon.ico'],
			MySimon		:['search.mysimon.com'		,'/search?qt='],
			NexTag		:['www.nextag.com'			,'/serv/main/buyer/OutPDir.jsp?search='],
			ResellerR	:['shop.resellerratings.com','/?keyword=', 'http://images.resellerratings.com/images/shop/favicon.ico'],
			Shopping	:['www.shopping.com'		,'/xFS?KW='],
			StreetPrices:['www.streetprices.com'	,'/x/search.cgi?query='],
		},
		pl:{
			Bazzar		:['bazzar.interia.pl'		,'/site/szukaj/?szukaj='],
			Ceneo		:['www.ceneo.pl'			,'/categories.aspx?search=yes&categoryID=0&inDesc=False&minPrice=0&maxPrice=99999999&searchText='],
			Cenomaniak	:['cenomaniak.pl'			,'/cenomaniakpl/cenomaniak.1.M.html?phrase=', '/skin/default/img/'],
			Eeeby		:['www.eeeby.pl'			,'/?q=',	'data:image/gif;base64,R0lGODlhEAAQAPEAAP///6oAAOq/vwAAACH5BAEAAAAALAAAAAAQABAAAAIuhI8JwerChFNQzsSy1idUD37dRgbdh4JjmVlLiiJshF3KbFKeUU2Z8XvsAD1EAQA7'],
			Kupujemy	:['www.kupujemy.pl'			,'/ceny-oferty.html?c=offer_subject&qw='],
			Nokaut		:['www.nokaut.pl'			,['/szukaj/','.html']],
			Skapiec		:['www.skapiec.pl'			,'/szukaj/w_calym_serwisie/'],
			Sklepiki	:['www.sklepiki.pl'			,'/index.php?ik1s=Wszystkie+kategorie&se=1&opiss=', 'data:image/gif;base64,R0lGODlhEAAQAPQAALOMQJ9wEKyDMMyyf6Z5IMapcOziz+XZv7+gYPn179nFn9/Pr7mWUP///wAAAKwHl5lmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAA8ALAAAAAAQABAAAAVU4COOZCk6aKqqJ+S+sOu0cT0/TswMA/DeuZehcRj6IMAXoKFwCQgyGiSQaDQMhZ90WlhUEVHcSzCAIhpZpFRgtR4C4aASANWKa7EkHgZc+VEmgSQhADs='],
			ZakupyWp	:['zakupy.wp.pl'			,'/szukaj.html?nazwa=', 'http://i.wp.pl/a/i/sg/favicon.ico'],
		}
	},


	/* Video Searchers */
	video:{
		_commons:{
			Blinkx		:['www.blinkx.com'			,'/videos/'],
			Dailymotion	:['www.dailymotion.com'		,['/visited/search/','/']],
			Exalead		:['www.exalead.com'  		,'/search/video/results/?q='],
			IxQuick		:['us2.ixquick.com'    	    ,'/do/metasearch.pl?cat=video&cmd=process_search&query='	],
			JumpCut		:['jumpcut.com'				,'/explore/?type=all&keywords=' ,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAzNJREFUOE89U0lMU1EUfdUQN8bEEHXlTpdinTBaNYipEF1IjEGiGEXYqAsrGJXWARRUMFZFmRMhxAFMXJlixNKJNlAsVi2Y1gZFaSgIpSCiBf7/x/tehZ/c/27ufefc8akURWEqlYopkNki1WLGv8CYg/WEX6X8kaJWBsaWJCxj6pVpqnWr0oRfVubY4kUJ5CInADJI4pyMjSS09OnPlLnSZq7bd+CabSuuWpNRTPpt5148+VTgHJv+rhYYmTAKEUjynACPTPWzu50HQvr29dC3bxCAWk8O6npyUeZKFzYut5xafIu+13GMRCTiNz07we53HfJfsW5BiT0Fb4KPEP07RHfi32TsJ+zfGnGrQ4urtmQiTCP/8FmeuYhu+mLMvkSRb9h3wT9uXQBGo1FQj6DIcVP/eDdKO/ZAb1HjRZ9hmkzLWfRvmBk7M3yXzEloG3iA8OAoPvk+oLXVBJPJBKPRiLq6WphaXwFE5Ao1odCsRqljN6ZmIoWsrb+KlXakwmDejF9KCJa3dpzMzcH9e/dQXl4OjUYDrVaLvLxcHDt6HIHvXtx17xP98IZNXeyp7yK7ZtuGso791NRZvH1jxvmCAlQ8qEBzczOysrKQmZkJg8GA/HP5GB4ZQr03B4VUsrm/Cux5r54V2bajzJmO6dkohsPDGBz8AbfbjZrqGmRkZKC6qhoej0f0QcIMHroPCwLbwGOwrtALxkdz2bIJwUjXQgO5otPpkJiYCJ/PJ+yyJGHoVwDX7TtxxbIZgTFnL5uVYqzyXbZgbPqoEx2XpDkEgn4wFcOatWsISsXNxQTJy8/FVL8ad1z7QdjbYozu0Ms7nKDYrsHrYIW4OBGZgrnNij6ffyErx0Cj2MpCmlj711o+3NViE2VFXv7Md2FCb1mPIvt2NHhPIzDuoGrH8VsZgX/UAfKTTwODZQPqe/J49HqxiXyn+YOakf4sbe69SKWoSZLo4kYUWTQotsXr5TaeZYP3FDV7wsIzp8DxTeQE/GGQvpRmO1DjOUEblwq+2pcJXOJIQWX3EVDDZVrM+nkwP+Pg/yQ8Ja6TrJuMjRYEI+7KLxFXC72Lm2Q7SLJiPuN5zD85FNezu7RVfAAAAABJRU5ErkJggg=='],
			Metacafe	:['www.metacafe.com'		,['/tags/','/']],
			Revver		:['www.revver.com'			,'/find/video/?query=' ,'http://static2.revver.com/images/favicon.ico'],
			Rupid		:['www.rupid.com'			,'/search_result.php?search_id='  ,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAqtJREFUOE99kltIk2EYx98tJTpAYJdZwbCoKUS1NKPLRV5IBdmwC41kLjC8qRsvgqyboiDTDlqepZNGqaWFCTM8zANz06k7eD7NeZibOt2+6bZ/z74pOFhefDzvy8fzf3////MIADAffUKBgC05N1jx7yFwQsbCdgmZZ8PH9u4LZ3KpSMDAGOf2sj3hQrZ/dxjz9wmohz94fT6+TlnXIkQPlRDndUD8UgVxjgpRVK8UqtX66ZX3ZodbMevgDm/vCRawOUXivHac/9iLuAot4j/0QEL1yIs2VGst6J1zwDDviPcLeLyBR4MEpu0uyYmcNkhKNThb0o3YEg2i33Xh5nc95lbdaJmwQze7ItuJQMoLlGlxjkROF6kRld+JuDINZF/7kViohtnuvBcg8IYkkPkF/PjHCzqRWmPA479jiMxtR0yxGgefNqNp2LopEMLClM2piM5V4QJ5P5bfhZTKPpAtnKGXL5Jo5KsOvO2a5i1seLYReLamsLiWdfRJM06VduMQhZlUrsGEzYWTZCOG7Bx41oLX7ZN8iOvbBbbGaFnmshLLtUgh9MTPOjxSjqBcM4OEih7cqjUggf4NzDn4MQZNwbdJMEtzvlHZj7v1JmTUmZBOTSnfBpD5axBp1Xpk1g9iybXOh+fzhQjRssLJrn7S4c5PI+TUnP7DCAWdFVSTKnWo6p9H67g9egcCTnrNL0Cvy6lJXmskMROSq/pQ1G3Gn2ErGoasgRBDLRJZkAQREIWfJpl2wC9QZ1qActSW/V8Ci4MTXf/Sx2eQSt6ft07gfsMQblOoaTV6IlhE4xaBJ8QeWJZdEbFvaIGqB3CJEs9uGkWtYR5S2sTLNIkHjSMYtzv5DLyhLKxyHlZvXEBFjwXKMRtUk0swLazSfQYFajOKyYbD7dmcQoDgHyQq14azLYvsAAAAAElFTkSuQmCC'],
			Spike		:['www.spike.com'			,'/search?query='],
			Videosurf	:['www.videosurf.com'		,'/videos/'],
			Vimeo		:['www.vimeo.com'			,['/videos/search:','/sort:newest/format:detail']],
			Yahoo		:['video.yahoo.com'			,'/video/search?p='],
			YouTube		:['www.youtube.com'			,'/results?search_query='],
			ZippyVideos	:['www.zippyvideos.com'		,'/video_search.z?q=',  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAbFJREFUOE/dkstrE1EUxo9/haLoxkWl3WgRQVEMwcdScG27UFdSXbiQBhGKGCUboRSpWEoLutC1j74QQTRFKUZcqCkJiSVt0qY6HaeZm7kzd35OJtB/YHZeOJzH5XznfB9nFyCJXgcgiSVqjrdPMj0G+PtT8WGoTHXcYuO1w+kbWWzb2QHWvhbfN3EeGsQPI9+JI1upNUT+FG2+Ta8wl/pO+VGdK7mHGI1sqapY7uoOUN35KoHRQtAWz92I/dqvUpeCWvd5c67AtlJcHHjO/OoUJ+/20n+zh0pzmezMIH2XD9A/lmLr4zjWzBCtTyNYC2OIcUNeHFtC1TWOVpw68Yqzo/txlM18aYKeO3tI5Q5Fc2Dv6G6yI/sIF4dxvgzTXJhEZs//4GWqwPtLRfL3ilzNPOXB3ACPZzNcuJ+mUHtH+kkvtyaucyZ3HNdepzE5SGP6MJuLzxCv5YluaXE326LdQPxAS/r2ET6X3mICZM2uyNFrfSivHYkYxpTd2hKVzEG2l/OdIwojRbsfxgQSRio3rWYc+4EvncbG766YXkTRRLVWNY9Tzse0kt9BUpD/YIN/ZXHJrQb5lqYAAAAASUVORK5CYII='],
		}
	}
};


/***********************************************************************************************************************
                                                   END OF USER SETTINGS
************************************************************************************************************************/


/*========================================================================================================
                                                  L A N G U A G E S
==========================================================================================================*/

switch ( LANG ){
	/* German (by Watermelonman & Umoenks)*/
	case 'de':
	LNG = {
	about:'Über',
	alerts:'Alerts',
	all:'Alle',
	aspect:'Hoogte-breedteverhouding',
	avatars:'Avatars',
	blogs:'Blogs',
	books:'Bücher',
	buttons:'Buttons',
	by:'by',
	calc:'Rechner',
	calendar:'Kalender',
	cancel:'Stornieren',
	cliparts:'ClipArts',
	close:'Schließen',
	cnt_box:'Content Box',
	code:'Code',
	color:'Farbe',
	content:'Inhalt',
	counter:'Ergebnis-Anzahl',
	custom:'Brauch',
	day:'Tag',
	defaults:'Voreinstellungen',
	desc:'Beschreibung',
	dirhp:'Verzeichnis',
	disabled:'Deaktiviert',
	docs:'Dokumente',
	domain:'Domain',
	enabled:'Aktiviert',
	extreme:'Extrem',
	faces:'Gesichter',
	filetype:'Dateityp',
	filters:'Filter',
	finance:'Finanzen',
	from:'von',
	general:'Generell',
	grayscale:'Graustufen',
	groups:'Gruppen',
	height:'Höhe',
	here:'hier',
	high:'Hoch',
	highest:'Höchste',
	highlights:'Highlights',
	history:'Verlauf',
	hour:'Hour',
	huge:'Riesig',
	icon:'Icons',
	ig:'iGoogle',
	images:'Bilder',
	in_:'in',
	install:'Installiere',
	labs:'Labs',
	large:'Groß',
	last:'letzte',
	linearts:'LineArt',
	links:'Links',
	login:'Login',
	mail:'Mail',
	maps:'Maps',
	mchrome:'Schwarzweiß',
	medium:'Mittel',
	min:'Minimal',
	month:'Monat',
	more:'Mehr',
	movies:'Film',
	new_tab:'Neuer Tab',
	news:'News',
	no:'Nein',
	normal:'Normal',
	notebook:'Notizblock',
	one_level_up:'Eine Ebene höher',
	only:'Nur',
	panoramic:'Panoramisch',
	photos:'Fotos',
	picasaweb:'Picasa',
	prdhp:'Shopping',
	preview:'Vorschau',
	products:'Shopping',
	reader:'Reader',
	recents:'Recents',
	ref_links:'Ähnliche Links',
	results:'Ergebnisse',
	safemode:'SafeMode',
	save:'Sichern',
	scholar:'Scholar',
	search:'Suche',
	searchers:'Suchmaschinen',
	self_tab:'Aktueller Tab',
	similar:'Ähnliche',
	sites:'Webseiten',
	size:'Größe',
	square:'Vierkant',
	small:'Klein',
	special:'Spezial',
	str_url:'String URL',
	styles:'Styles',
	tags:'Tags',
	tall:'Hoog',
	text:'Text',
	this_:'dieses',
	title:'Titel',
	toolbar:'ToolBars',
	translate:'Übersetzer',
	trycache:'Cache testen',
	ui_ask_for_disabling:'Sind sie sicher, dass sie diese funktion deaktivieren?',
	ui_bar_adv_search:'Erweiterte Such-Toolbar',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Zeige Icons im Menü',
	ui_bar_menu_static:'Fixiere das Menü',
	ui_bar_sidebar:'Aktiviere die rechten Panele',
	ui_bar_sch_icons:'zeige Icons',
	ui_bar_searchers:'Andere Suchmaschinen-Toolbar',
	ui_bar_suggest:'Google Suggest',
	ui_bar_suggest_lngs:'Unterstützung von mehreren Sprachen',
	ui_bar_username:'Wandle den Usernamen in einen kurzen Namen um',
	ui_css_defaults:'Den Style zurücksetzen',
	ui_css_mozBrd:'Abgerundete Ecken',
	ui_grl_new_ver:'Benachrichtigung bei neuen Versionen',
	ui_grl_run_over:'GoogleFX aktivieren für:',
	ui_grl_show_logo:'Zeige das GoogleFx-Logo',
	ui_img_autopaged:'Auto-Paged of Images',
	ui_img_oldstyle:'Zur alten Version wechseln',
	ui_img_prev_onThumb:'schon beim Bewegen über den Thumbnail',
	ui_img_prev_rt:'Reaktionszeit',
	ui_img_preview:'Zeige das Orginalbild beim MouseOver',
	ui_res_autopaged:'Automatisches Laden der nächsten Seite',
	ui_res_autopaged_nb:'Zeige Navigationsleiste',
	ui_res_autopaged_rt:'Empfindlichkeit',
	ui_res_counter:'Zeige die Nummer des Ergebnisses',
	ui_res_ref_icon:'Google-Referenzlinks zu Icons umwandeln',
	ui_res_ref_pos:'Icons an der rechten Seite ausrichten',
	ui_res_remove_ads:'Entferne Google Ads (Sponsor)',
	ui_res_remove_tracks:'Entferne Google Tracks von den Links (Verlauf)',
	ui_res_sitefilter:'Aktiviere die Filterfunktion',
	ui_res_targetLnks:'Standard-Ziel der Links',
	ui_res_th_lft:'Richte die Websitevorschauen links aus',
	ui_res_th_sz:'Größe',
	ui_res_thumbs:'Websitevorschauen',
	ui_res_cols:'Alle Ergebnisse in Spalten',
	ui_title:'Benutzereinstellungen',
	ui_txt_cache:'Strg+Klick / Shift+Klick den Google-Cache zu nutzten',
	url:'Url',
	video:'Video',
	webhp:'Web',
	week:'Woche',
	wide:'Breed',
	width:'Breite',
	year:'Jahr',
	yes:'Ja',
	youtube:'YouTube'
	};
	break;
	/* Spanish */
	case 'es':
	LNG = {
	about:'Acerca de',
	alerts:'Alertas',
	all:'Todo',
	aspect:'Aspecto',
	avatars:'Avatares',
	blogs:'Blogs',
	books:'Libros',
	buttons:'Botones',
	by:'por',
	calc:'Calculadora',
	calendar:'Calendario',
	cancel:'Cancelar',
	cliparts:'Prediseñadas',
	close:'Cerrar',
	cnt_box:'Recuadro',
	code:'Código',
	color:'Color',
	content:'Contenido',
	counter:'Numeración',
	custom:'Personalizado',
	day:'Día',
	defaults:'x Defecto',
	desc:'Descripción',
	dirhp:'Directorio',
	disabled:'Desactivado',
	docs:'Documentos',
	domain:'dominio',
	enabled:'Activado',
	extreme:'Máxima',
	faces:'Cara',
	filetype:'Extensión',
	filters:'Filtros',
	finance:'Finanza',
	from:'desde',
	general:'General',
	grayscale:'Grises',
	groups:'Grupos',
	height:'Alto',
	here:'Aquí',
	high:'Alta',
	highest:'Muy Alta',
	highlights:'Resaltados',
	history:'Historial',
	hour:'Hora',
	huge:'Enormes',
	icon:'Iconos',
	ig:'iGoogle',
	images:'Imágenes',
	in_:'en',
	install:'Instalar',
	labs:'Labs',
	large:'Grandes',
	last:'último/a',
	linearts:'Boceto',
	links:'Referencias',
	login:'Acceder',
	mail:'Correo',
	maps:'Mapas',
	mchrome:'Monocromo',
	medium:'Medianas',
	min:'Mínima',
	month:'Mes',
	more:'Más',
	movies:'Películas',
	new_tab:'Nueva pestaña',
	news:'Noticias',
	no:'No',
	normal:'Normal',
	notebook:'Notas',
	one_level_up:'Un Nivel Arriba',
	only:'Solo',
	panoramic:'Panorámicas',
	photos:'Fotografía',
	picasaweb:'Picasa',
	prdhp:'Compras',
	preview:'Vista Previa',
	products:'Compras',
	reader:'Lector',
	recents:'Recientes',
	ref_links:'Referencias',
	results:'Resultados',
	safemode:'Filtro',
	save:'Guardar',
	scholar:'Academico',
	search:'Buscar',
	search_in:'Buscar en',
	searchers:'Buscadores',
	self_tab:'Misma pestaña',
	similar:'Similares',
	sites:'Sitios',
	size:'Tamaño',
	square:'Cuadradas',
	small:'Pequeñas',
	special:'Especiales',
	str_url:'Direcciones',
	styles:'Estilos',
	tags:'Etiquetas',
	tall:'Alargadas',
	text:'Texto',
	this_:'este',
	title:'Título',
	toolbar:'Barras',
	translate:'Traductor',
	trycache:'en Cache',
	ui_ask_for_disabling:'¿Está seguro que desea deshabilitar esta característica?',
	ui_bar_adv_search:'Barra de Herramientas de Busqueda Avanzada',
	ui_bar_leftnav_ah:'Auto-Ocultar Menu Izquierdo',
	ui_bar_menu_icons:'Mostrar iconos en menu',
	ui_bar_menu_static:'Menus y Encabezados siempre visibles',
	ui_bar_sidebar:'Paneles de la Derecha',
	ui_bar_sch_icons:'mostrar iconos',
	ui_bar_searchers:'Barra de Otros Buscadores',
	ui_bar_suggest:'Sugerencias de Google',
	ui_bar_suggest_lngs:'multi-idioma',
	ui_bar_username:'Acortar nombre de usuario',
	ui_css_defaults:'Ajustar los estilos predeterminados de',
	ui_css_mozBrd:'Redondear esquinas',
	ui_grl_run_over:'Ejecutar script en',
	ui_grl_new_ver:'Avisar sobre nuevas versiones',
	ui_grl_show_logo:'Mostrar Logo FX',
	ui_img_autopaged:'Auto-Paginación en Images',
	ui_img_oldstyle:'Cambiar a la versión básica',
	ui_img_prev_onThumb:'ejecutar sobre la imagen',
	ui_img_prev_rt:'tiempo de reacción',
	ui_img_preview:'Vista Previa de imagen original',
	ui_res_autopaged:'Auto-Paginación',
	ui_res_autopaged_nb:'barra virtual de navegación',
	ui_res_autopaged_rt:'sensibilidad de carga',
	ui_res_counter:'Enumerar Resultados',
	ui_res_ref_icon:'Cambiar Links de Ref. a Iconos',
	ui_res_ref_pos:'alinear a la derecha',
	ui_res_remove_ads:'Ocultar Patrocinadores (Publicidad)',
	ui_res_remove_tracks:'Eliminar Seguimientos de enlaces (Historial de Google)',
	ui_res_sitefilter:'Capacidad de Filtrado por Sitio',
	ui_res_targetLnks:'Abrir Links en',
	ui_res_th_lft:'alinear a la izquierda',
	ui_res_th_sz:'escala de tamaño',
	ui_res_thumbs:'Vista Previa de Sitios',
	ui_res_cols:'Mostrar resultados en columnas',
	ui_title:'Configuración del Usuario',
	ui_txt_cache:'Ctrl+Click / Shift+Click para continuar en Google Cache',
	url:'Dirección',
	video:'Video',
	webhp:'Web',
	week:'Semana',
	wide:'Anchas',
	width:'Ancho',
	year:'Año',
	yes:'Si',
	youtube:'YouTube'
	};
	break;
	/* French */
	case 'fr':
	LNG = {
	about:'À propos de',
	alerts:'Alertes',
	all:'Tous',
	aspect:'Format',
	avatars:'Avatars',
	blogs:'Blogs',
	books:'Livres',
	buttons:'Buttons',
	by:'par',
	calc:'Calculatrice',
	calendar:'Agenda',
	cancel:'Annuler',
	cliparts:'Designs',
	close:'Fermer',
	cnt_box:'Content Box',
	code:'Code',
	color:'Couleur',
	content:'Contenu',
	counter:'Counter Number',
	custom:'Personnalisé',
	day:'Jour',
	defaults:'Défauts',
	desc:'Description',
	dirhp:'Répertoire',
	disabled:'Désactiver',
	docs:'Documents',
	domain:'domaine',
	enabled:'Activer',
	extreme:'Extrême',
	faces:'Visage',
	filetype:'FichierType',
	filters:'Filtres',
	finance:'Finance',
	from:'dès',
	general:'Général',
	grayscale:'Grayscale',
	groups:'Groupes',
	height:'Taille',
	here:'ici',
	high:'Haut',
	highest:'Plus haut',
	highlights:'Highlights',
	history:'Histoire',
	hour:'Heure',
	huge:'Énorme',
	icon:'Icônes',
	ig:'iGoogle',
	images:'Images',
	in_:'dans',
	install:'Installer',
	labs:'Labs',
	large:'Large',
	last:'dernier/e',
	linearts:'Délimitées',
	links:'Links',
	login:'Connexion',
	mail:'GMail',
	maps:'Maps',
	mchrome:'Mono',
	medium:'Medium',
	min:'Min',
	month:'Mois',
	more:'Plus',
	movies:'Films',
	new_tab:'New Tab',
	news:'Actualités',
	no:'Non',
	normal:'Normal',
	notebook:'NoteBook',
	one_level_up:'Un niveau au-dessus',
	only:'Uniquement',
	panoramic:'Panoramique',
	photos:'Photos',
	picasaweb:'Photos',
	prdhp:'Shopping',
	preview:'Preview',
	products:'Shopping',
	reader:'Lecteur',
	recents:'Récents',
	ref_links:'Référence Liens',
	results:'Résultats',
	safemode:'SafeMode',
	save:'Sauver',
	scholar:'Scholar',
	search:'Recherche',
	search_in:'Recherche dans',
	searchers:'Searchers',
	self_tab:'Current Tab',
	similar:'Similaires',
	sites:'Sites',
	size:'Taille',
	square:'Carré',
	small:'Petit',
	special:'Spécial',
	str_url:'String URL',
	styles:'Styles',
	tags:'Tags', //TODO
	tall:'Portrait',
	text:'Texte',
	this_:'ce',
	title:'Titre',
	toolbar:'ToolBars',
	translate:'Traduire',
	trycache:'tenter Cache',
	ui_ask_for_disabling:'Êtes-vous sûr de vouloir désactiver cette fonction?',
	ui_bar_adv_search:'Barre de recherche avancée',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Voir les icônes dans le menu',
	ui_bar_menu_static:'Faites statique menus',
	ui_bar_sidebar:'Activer le panneau de droite',
	ui_bar_sch_icons:'Voir les icônes',
	ui_bar_searchers:'D\'autres chercheurs d\'outils',
	ui_bar_suggest:'Google Suggest',
	ui_bar_suggest_lngs:'multi-langue',
	ui_bar_username:'Convertir nom d\'utilisateur pour nom court',
	ui_css_defaults:'Définir la valeur par défaut pour les styles de',
	ui_css_mozBrd:'Arrondi bords',
	ui_grl_new_ver:'Souscription des nouvelles versions',
	ui_grl_run_over:'Run GoogleFx sur',
	ui_grl_show_logo:'Voir GoogleFx Logo',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'Passer à la version de base',
	ui_img_prev_onThumb:'déroulera sur images',
	ui_img_prev_rt:'temps de réaction',
	ui_img_preview:'Aperçu de l\'image',
	ui_res_autopaged:'Streaming Auto-Page',
	ui_res_autopaged_nb:'afficher la barre de navigation',
	ui_res_autopaged_rt:'ratio de détection',
	ui_res_counter:'Voir Counter Numéros',
	ui_res_ref_icon:'Ref-Texte des liens vers des icônes',
	ui_res_ref_pos:'aligner à droite',
	ui_res_remove_ads:'Masquer Google Ads (Commanditaire)',
	ui_res_remove_tracks:'Suppression pistes à liens (Google Histoire)',
	ui_res_sitefilter:'Activer la fonction de filtre de site',
	ui_res_targetLnks:'Cible par défaut des liens',
	ui_res_th_lft:'aligner à gauche',
	ui_res_th_sz:'ratio taille',
	ui_res_thumbs:'Preview Sites',
	ui_res_cols:'Afficher les résultats sur colonnes',
	ui_title:'Paramètres utilisateur',
	ui_txt_cache:'Ctrl+Click / Shift+Click pour continuer dans Google Cache',
	url:'Url',
	video:'Vidéo',
	webhp:'Web',
	week:'Semaine',
	wide:'Paysage',
	width:'Largeur',
	year:'Année',
	yes:'Oui',
	youtube:'YouTube',
	};
	break;
	/* Italian (by RNiK)*/
	case 'it':
	LNG = {
	about:'Circa',
	alerts:'Alert',
	all:'Tutto',
	aspect:'Proporzioni',
	avatars:'Avatars',
	blogs:'Blog',
	books:'Libri',
	buttons:'Pulsanti',
	by:'di',
	calc:'Calcolatrice',
	calendar:'Calendar',
	cancel:'Cancellare',
	cliparts:'Disegni',
	close:'Chiudere',
	cnt_box:'Contenuto Box',
	code:'Codice',
	color:'Colore',
	content:'Contenuto',
	counter:'Counter Number',
	custom:'Personalizzato',
	day:'Giorno',
	defaults:'Predefiniti',
	desc:'Descrizione',
	dirhp:'Directory',
	disabled:'Disabili',
	docs:'Documenti',
	domain:'dominio',
	enabled:'Abilitato',
	extreme:'Estremo',
	faces:'Faccia',
	filetype:'TipoFile',
	filters:'Filtri',
	finance:'Finance',
	from:'da',
	general:'Generale',
	grayscale:'ScalaGrigi',
	groups:'Gruppi',
	height:'Altezza',
	here:'qui',
	high:'Alto',
	highest:'Altezza mas',
	highlights:'Highlights',
	history:'Cronologia',
	hour:'Ore',
	huge:'Enorme',
	icon:'Icone',
	ig:'iGoogle',
	images:'Immagini',
	in_:'in',
	install:'Installare',
	labs:'Labs',
	large:'Grande',
	last:'último/a',
	linearts:'Delineate',
	links:'Links',
	login:'Accesso',
	mail:'Mail',
	maps:'Mappe',
	mchrome:'Mono',
	medium:'Media',
	min:'Min',
	month:'Mese',
	more:'Più',
	movies:'Cinema',
	new_tab:'Nuova scheda',
	news:'News',
	no:'No',
	normal:'Normale',
	notebook:'Blocco Note',
	one_level_up:'Un livello alto',
	only:'Solo',
	panoramic:'Molto Grandi',
	photos:'Fotos',
	picasaweb:'Picasa',
	prdhp:'Shopping',
	preview:'Anteprima',
	products:'Shopping',
	reader:'Reader',
	recents:'Recenti',
	ref_links:'Link di riferimento',
	results:'Risultati',
	safemode:'SafeMode',
	save:'Salvare',
	scholar:'Scholar',
	search:'Web',
	search_in:'Cerca in',
	searchers:'Ricercatori',
	self_tab:'Stessa scheda',
	similar:'Simili',
	sites:'Sites',
	size:'Dimensione',
	square:'Quadrate',
	small:'Piccolo',
	special:'Speciali',
	str_url:'String URL',
	styles:'Stili',
	tags:'Tags',
	tall:'Alte',
	text:'Testo',
	this_:'questo',
	title:'Titolo',
	toolbar:'Barre',
	translate:'Traduttore',
	trycache:'provare Cache',
	ui_ask_for_disabling:'Sei sicuro di voler disattivare questa funzione?',
	ui_bar_adv_search:'Ricerca avanzata Bar',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Visualizza le icone nel menu',
	ui_bar_menu_static:'Rendere statico Menu',
	ui_bar_sidebar:'Visualizza il pannello di destra',
	ui_bar_sch_icons:'mostra icone',
	ui_bar_searchers:'Bar altri motori di ricerca',
	ui_bar_suggest:'Suggerimenti Google',
	ui_bar_suggest_lngs:'multi-lingue',
	ui_bar_username:'Abbreviare il tuo nome utente',
	ui_css_defaults:'Impostare gli stili di default di',
	ui_css_mozBrd:'Bordes Redondedos',
	ui_grl_new_ver:'Notifica di nuove versioni',
	ui_grl_run_over:'Esegui GoogleFx su',
	ui_grl_show_logo:'Visualizza GoogleFx logo',
	ui_img_autopaged:'Auto-Paginazione di Immagines',
	ui_img_oldstyle:'Passa alla versione di base',
	ui_img_prev_onThumb:'girare su l\'immagine',
	ui_img_prev_rt:'tempo di reazione',
	ui_img_preview:'Visualizza Anteprima immagine',
	ui_res_autopaged:'Auto-Paginazione',
	ui_res_autopaged_nb:'visualizza la barra di navigazione',
	ui_res_autopaged_rt:'sensibilità di autopaginacion',
	ui_res_counter:'Elenco Risultati',
	ui_res_ref_icon:'Modifica accesso di Ref. a Icone',
	ui_res_ref_pos:'allinea a destra',
	ui_res_remove_ads:'Elimina Sponsor (Pubblicità)',
	ui_res_remove_tracks:'Rimuovere Tracce de link (Google Storia)',
	ui_res_sitefilter:'Abilita capacità di filtraggio di sito',
	ui_res_targetLnks:'Aperto Links in',
	ui_res_th_lft:'allinea a sinistra',
	ui_res_th_sz:'dimensioni scala',
	ui_res_thumbs:'Anteprima Siti',
	ui_res_cols:'Mostra i risultati in colonne',
	ui_title:'Impostazioni Utente',
	ui_txt_cache:'Ctrl + Click / Shift + Click per continuare nella cache',
	url:'Url',
	video:'Video',
	webhp:'Web',
	week:'Settimana',
	wide:'Largue',
	width:'Ampiezza',
	year:'Anno',
	yes:'Si',
	youtube:'YouTube'
	};
	break;
	/* Japanese (by Tejas)*/
	case 'ja':
	LNG = {
	about:' Google Fxについて',
	alerts:'警告',
	all:'すべて', 
	aspect:'アスペクト比',
	avatars:'アバター',
	blogs:'ブログ',
	books:'書籍',
	buttons:'ボタン',
	by:'バイ',
	calc:'電卓',
	calendar:'カレンダー',
	cancel:'キャンセル',
	cliparts:'クリップアート',
	close:'閉じる',
	cnt_box:'コンテンツボックス',
	code:'コード',
	color:'カラー',
	content:'内容',
	counter:'番号',
	custom:'カスタム',
	day:'日',
	defaults:'デフォルト',
	desc:'サイトの要約',
	dirhp:'ディレクトリ',
	disabled:'無効',
	docs:'ドキュメント',
	domain:'ドメイン',
	enabled:'有効',
	extreme:'極端',
	faces:'顔',
	filetype:'ファイル形式',
	filters:'フィルタ',
	finance:'Google Finance',
	from:'から',
	general:'基本設定',
	grayscale:'グレースケール',
	groups:'Google グループ',
	height:'高さ',
	here:'ここで',
	high:'高い',
	highest:'最高',
	highlights:'ハイライト',
	history:'ウェブ履歴',
	hour:'時間',
	huge:'巨大な',
	icon:'アイコン',
	ig:'iGoogle',
	images:'画像',
	in_:'〜で',
	install:'インストール',
	labs:'Google Labs',
	large:'大',
	last:'最後の',
	linearts:'ラインアート',
	links:'リンク',
	login:'ログイン',
	mail:'メール',
	maps:'マップ',
	mchrome:'モノクロ',
	medium:'中',
	min:'分',
	month:'月',
	more:'その他',
	movies:'映画',
	new_tab:'新しいタブ',
	news:'ニュース',
	no:'ノー',
	normal:'標準',
	notebook:'ノートブック',
	one_level_up:'1つ上のレベル',
	only:'ひとつの',
	panoramic:'パノラマ表示',
	photos:'写真',
	picasaweb:'Picasa',
	prdhp:'ショッピング',
	preview:'プレビュー',
	products:'ショッピング',
	reader:'リーダー',
	recents:'更新ムービー',
	ref_links:'参照リンク',
	results:'結果',
	safemode:'セーフモード',
	save:'保存する',
	scholar:'学者',
	search:'探す',
	searchers:'検索',
	self_tab:'現在のタブ',
	similar:'同様の',
	sites:'サイト',
	size:'サイズ',
	square:'通常表示',
	small:'小さい',
	special:'スペシャル',
	str_url:'文字列のURL',
	styles:'スタイル',
	tags:'タグ',
	tall:'縦長表示',
	text:'本文',
	this_:'この',
	title:'タイトル',
	toolbar:'ツールバー',
	translate:'翻訳する',
	trycache:'キャッシュしてください',
	ui_ask_for_disabling:'あなたはこの機能を無効にしてもよろしいですか？',
	ui_bar_adv_search:'高度な検索ツールバー',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'メニューのアイコンを表示する',
	ui_bar_menu_static:'メニューを静的にする',
	ui_bar_sidebar:'右側のパネルを有効にする',
	ui_bar_sch_icons:'詳細アイコン',
	ui_bar_searchers:'他の検索ツールバー',
	ui_bar_suggest:'Googleサジェスト',
	ui_bar_suggest_lngs:'多言語機能',
	ui_bar_username:'ユーザー名を短い名前に変換する',
	ui_css_defaults:'デフォルトのスタイルを設定する',
	ui_css_mozBrd:'丸枠',
	ui_grl_new_ver:'通知新しいバージョンの',
	ui_grl_run_over:'チェックを入れて適用します',
	ui_grl_show_logo:'GoogleFxロゴを表示',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'簡易形式に切り替える',
	ui_img_prev_onThumb:'画像上で実行',
	ui_img_prev_rt:'反応時間',
	ui_img_preview:'オリジナルサイズをマウスオーバーで表示する',
	ui_res_autopaged:'ページを自動で読み込む',
	ui_res_autopaged_nb:'詳細ナビゲーションバー',
	ui_res_autopaged_rt:'スクロールの検出率',
	ui_res_counter:'検索番号を表示',
	ui_res_ref_icon:'テキストリンクをアイコンに変更する',
	ui_res_ref_pos:'アイコンを右揃えにする',
	ui_res_remove_ads:'スポンサーとして表示されるGoogle Adsを削除する',
	ui_res_remove_tracks:'Google Historyのリンクから追跡を削除する',
	ui_res_sitefilter:'サイトフィルタを有効にする',
	ui_res_targetLnks:'リンクのデフォルトのターゲット',
	ui_res_th_lft:'左揃え',
	ui_res_th_sz:'サイズ比',
	ui_res_thumbs:'サイトプレビュー',
	ui_res_cols:'結果は、列に表示されます',
	ui_title:'ユーザー設定',
	ui_txt_cache:'Ctrl+クリック / Shift+クリック キャッシュ内に継続する',
	url:'Url',
	video:'ビデオ',
	webhp:'ウェブ',
	week:'週', 
	wide:'横長表示',
	width:'幅',
	year:'年', 
	yes:'はい',
	youtube:'YouTube'
	};
	break;
	/* Korean (by Jucke)*/
	case 'ko':
	case 'kr':
	LNG = {
	about : 'Google Fx 정보',
	alerts : '경고',
	all : '전체',
	aspect : '화면 비율',
	avatars : '아바타',
	blogs : '블로그',
	books : '책',
	buttons : '버튼',
	by : 'by',
	calc : '계산기',
	calendar : '캘린더',
	cancel : '취소',
	cliparts : '클립아트',
	close : '닫기',
	cnt_box : '콘텐츠 박스',
	code : '코드',
	color : '컬러',
	content : '내용',
	counter : 'ID',
	custom : '맞춤',
	day : '일',
	defaults : '기본',
	desc : '사이트 요약',
	dirhp : '디렉토리',
	disabled : '비활성',
	docs : '문서',
	domain : '도메인',
	enabled : '사용',
	extreme : 'Extreme',
	faces : 'Faces',
	filetype : '파일 형식',
	filters : '필터',
	finance : 'Finance',
	from : 'From',
	general : '기본 설정',
	grayscale : '회색조',
	groups : 'Google 그룹',
	height : '높이',
	here : '여기에',
	high : '높음',
	highest : '최고',
	highlights : '하이라이트',
	history : '웹 기록',
	hour : '시간',
	huge : '거대한',
	icon : '아이콘',
	ig : 'iGoogle',
	images : '이미지',
	in_ : 'in',
	install : '설치',
	labs : 'Google 실험실',
	large : '큰',
	last : '마지막',
	linearts : '라인 아트',
	links : '연결',
	login : '로그인',
	mail : '메일',
	maps : '지도',
	mchrome : '흑백',
	medium : '사이',
	min : '분',
	month : '월',
	more : '기타',
	movies : '영화',
	new_tab : '새 탭',
	news : '뉴스',
	no : '아니오',
	normal : '표준',
	notebook : '노트북',
	one_level_up : '한 단계 위로',
	only : '하나의',
	panoramic : '파노라마보기',
	photos : '사진',
	picasaweb : '피카사',
	prdhp : '쇼핑',
	preview : '미리보기',
	products : '쇼핑',
	reader : '리더',
	recents : '업데이트 동영상',
	ref_links : '참조 링크',
	results : '결과',
	safemode : '안전 모드',
	save : '저장',
	scholar : '학자',
	search : '찾기',
	searchers : '찾기',
	self_tab : '현재 탭',
	similar : '유사',
	sites : '사이트',
	size : '크기',
	square : '정사각형',
	small : '작은',
	special : 'Special',
	str_url : '문자열 URL',
	styles : '스타일',
	tags : '태그',
	tall : '긴 사진',
	text : '본문',
	this_ : '이것',
	title : '제목',
	toolbar : '도구 모음',
	translate : '번역',
	trycache : '저장된 이미지',
	ui_ask_for_disabling : '당신은이 기능을 해제 하시겠습니까? ',
	ui_bar_adv_search : '고급 검색 툴바',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons : '메뉴 아이콘을 표시하는',
	ui_bar_menu_static : '메뉴를 고정한다',
	ui_bar_sidebar : '오른쪽 패널을 사용하려면',
	ui_bar_sch_icons : '추가 아이콘',
	ui_bar_searchers : '다른 검색 툴바',
	ui_bar_suggest : 'Google 추천',
	ui_bar_suggest_lngs : '다국어 기능',
	ui_bar_username : '사용자 이름을 짧은 이름으로 변환한다',
	ui_css_defaults : '기본 스타일을 설정하려면',
	ui_css_mozBrd : '둥근 테두리',
	ui_grl_new_ver : '새 버전 알림',
	ui_grl_run_over : '적용할 기능을 선택하십시오.',
	ui_grl_show_logo : 'GoogleFx 로고 표시',
	ui_img_autopaged : 'Auto-Paged of Images',
	ui_img_oldstyle:'기 본 버전으로 전환',
	ui_img_prev_onThumb : 'set over thumbs',
	ui_img_prev_rt : '반응 속도',
	ui_img_preview : '원래 크기를 마우스를 올리면 표시',
	ui_res_autopaged : '페이지를 자동으로 로드',
	ui_res_autopaged_nb : '고급 내비게이션',
	ui_res_autopaged_rt : '스크롤의 검출 율',
	ui_res_counter : '검색 번호 표시',
	ui_res_ref_icon : '텍스트 링크를 아이콘으로 변경',
	ui_res_ref_pos : '아이콘을 오른쪽 맞춤',
	ui_res_remove_ads : 'Google 광고(스폰서) 제거',
	ui_res_remove_tracks : 'Google History 링크를 추적 제거',
	ui_res_sitefilter : '사이트 필터 기능 사용',
	ui_res_targetLnks : '링크의 기본 대상',
	ui_res_th_lft : '왼쪽 정렬',
	ui_res_th_sz : '크기 비율',
	ui_res_thumbs : '사이트 미리보기',
	ui_res_cols : '결과를 컬럼으로 표시',
	ui_title : '사용자 설정',
	ui_txt_cache : 'Ctrl + 클릭 / Shift + 클릭 캐시에 계속',
	url : 'URL',
	video : '비디오',
	webhp : '웹',
	week : '주',
	wide : '넓은 사진',
	width : '가로',
	year : '년',
	yes : '예',
	youtube : 'YouTube'
	};
	break;
	/* Dutch (by Jerone)*/
	case 'nl':
	LNG = {
	about:'Over',
	alerts:'Meldingen',
	all:'Alles',
	aspect:'Hoogte-breedteverhouding',
	avatars:'Avatars',
	blogs:'Blogs',
	books:'Boeken',
	buttons:'Knoppen',
	by:'door',
	calc:'Rekenmachine',
	calendar:'Kalender',
	cancel:'Annuleren',
	cliparts:'Modellen',
	close:'Sluiten',
	cnt_box:'Inhoud Box',
	code:'Code',
	color:'Kleur',
	content:'Inhoud',
	counter:'Nummering',
	custom:'Gebruik',
	day:'Dag',
	defaults:'Standaard',
	desc:'Beschrijving',
	dirhp:'Directory',
	disabled:'Uitgeschakeld',
	docs:'Documenten',
	domain:'domein',
	enabled:'Ingeschakeld',
	extreme:'Extreem',
	faces:'Gezichten',
	filetype:'Bestandstype',
	filters:'Filters',
	finance:'Financiën',
	from:'van',
	general:'Algemene',
	grayscale:'Grijsschaal',
	groups:'Discussiegroepen',
	height:'Hoogte',
	here:'hier',
	high:'Hoog',
	highest:'Hoogst',
	highlights:'Highlights',
	history:'Geschiedenis',
	hour:'Uur',
	huge:'Enorm',
	icon:'Iconen',
	ig:'iGoogle',
	images:'Afbeeldingen',
	in_:'aan',
	install:'Installeren',
	labs:'Labs',
	large:'Groot',
	last:'laatste',
	linearts:'Afgebakend',
	links:'Links',
	login:'Inloggen',
	mail:'Gmail',
	maps:'Maps',
	mchrome:'Monochroom',
	medium:'Medium',
	min:'Minimaal',
	month:'Maand',
	more:'Meer',
	movies:'Bioscoop',
	new_tab:'Nieuw tabblad',
	news:'Nieuws',
	no:'Neen',
	normal:'Normaal',
	notebook:'NoteBook',
	one_level_up:'Een Niveau Omhoog',
	only:'Alleen',
	panoramic:'Panoramisch',
	photos:'Fotos',
	picasaweb:'Picasa',
	prdhp:'Shopping',
	preview:'Preview',
	products:'Shopping',
	reader:'Reader',
	recents:'Recenten',
	ref_links:'Ref Links',
	results:'Resultaten',
	safemode:'Veilige Mode',
	save:'Opslaan',
	scholar:'Student',
	search:'Zoeken',
	search_in:'Zoeken in',
	searchers:'Zoekers',
	self_tab:'Huidig tabblad',
	similar:'Soortgelijke',
	sites:'Webpagina\'s',
	size:'Grootte',
	square:'Vierkant',
	small:'Klein',
	special:'Speciaal',
	str_url:'String URL',
	styles:'Stijlen',
	tags:'Tags', //TODO
	tall:'Hoog',
	text:'Tekst',
	this_:'dit',
	title:'Titel',
	toolbar:'ToolBars',
	translate:'Vertalen',
	trycache:'Probeer Cache',
	ui_ask_for_disabling:'Weet zeker dat u deze functie uitschakelen?',
	ui_bar_adv_search:'Geavanceerde Zoek toolbars',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Iconen in menu weergeven',
	ui_bar_menu_static:'Maak menu statisch',
	ui_bar_sidebar:'Stel Rechterkant Paneel',
	ui_bar_sch_icons:'iconen weergeven',
	ui_bar_searchers:'Andere Zoekers toolbar',
	ui_bar_suggest:'Google Suggestie',
	ui_bar_suggest_lngs:'multi-language feature',
	ui_bar_username:'Gebruikersnaam veranderen in kleine naam',
	ui_css_defaults:'Ingesteld op de standaardinstellingen stijlen van',
	ui_css_mozBrd:'Ronde Grenzen',
	ui_grl_new_ver:'Kennis van nieuwe versies',
	ui_grl_run_over:'Uitvoeren GoogleFx over',
	ui_grl_show_logo:'GoogleFx logo weergeven',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'Naar basisversie overschakelen',
	ui_img_prev_onThumb:'op de afbeelding',
	ui_img_prev_rt:'reactie tijd',
	ui_img_preview:'Origineel weergeven bij MouseOver',
	ui_res_autopaged:'Streaming Auto-Page',
	ui_res_autopaged_nb:'toon navigatiebalk',
	ui_res_autopaged_rt:'scroll detectie ratio',
	ui_res_counter:'Nummering weergeven',
	ui_res_ref_icon:'Tekst referentie links naar iconen',
	ui_res_ref_pos:'iconen rechts uitlijnen',
	ui_res_remove_ads:'Verwijder Google Ads (Sponsor)',
	ui_res_remove_tracks:'Verwijder Tracks uit links (Google History)',
	ui_res_sitefilter:'Activeer webpagina filter feature',
	ui_res_targetLnks:'Standaard links locatie',
	ui_res_th_lft:'voorbeeld links uitlijnen',
	ui_res_th_sz:'ratio size',
	ui_res_thumbs:'Voorbeeldafbeeldingen van websites',
	ui_res_cols:'Resultaten weergeven in kolommen',
	ui_title:'Gebruikers Instellingen',
	ui_txt_cache:'Ctrl + klik / Shift + klik om door te gaan met Google Cache',
	url:'Url',
	video:'Video',
	webhp:'Het internet',
	week:'Week',
	wide:'Breed',
	width:'Wijdte',
	year:'Jaar',
	yes:'Ja',
	youtube:'YouTube'
	};
	break;
	/* Polish (by Mr.Cat)*/
	case 'pl':
	LNG = {
	about:'Okolo',
	alerts:'Alarmy',
	all:'Wszystko',
	aspect:'Proporcji',
	avatars:'Avatars',
	blogs:'Blogi',
	books:'Ksiazki',
	buttons:'Przyciski',
	by:'przez',
	calc:'Kalkulator',
	calendar:'Kalendarz',
	cancel:'Odwolac',
	cliparts:'Wzorów',
	close:'Zamknij',
	cnt_box:'Zawartosc',
	code:'Kod',
	color:'Kolor',
	content:'Tresc',
	counter:'Licznik stron',
	custom:'Niestandardowy',
	day:'Dzien',
	defaults:'Domyslny',
	desc:'Opis',
	dirhp:'Katalog',
	disabled:'Wylaczyc',
	docs:'Dokumenty',
	domain:'domeny',
	enabled:'Wlaczyc',
	extreme:'Ekstremalne',
	faces:'Twarzy',
	filetype:'Typ pliku',
	filters:'Filtry',
	finance:'Finanse',
	from:'z',
	general:'Ogólne',
	grayscale:'GraySkala',
	groups:'Grupy',
	height:'Wysokosc',
	here:'tu',
	high:'Wysoki',
	highest:'Najwyzszy',
	highlights:'Podkreslenie',
	history:'Historia',
	hour:'Hora',
	huge:'Wielki',
	icon:'Ikony',
	ig:'iGoogle',
	images:'Grafika',
	in_:'w',
	install:'Instalowac',
	labs:'Labs',
	large:'Duze',
	last:'ostatni/e',
	linearts:'Ograniczone',
	links:'Linki',
	login:'Login',
	mail:'Poczta',
	maps:'Mapy',
	mchrome:'Monochromia',
	medium:'Sredni',
	min:'Min',
	month:'Miesiac',
	more:'Wiecej',
	movies:'Kino',
	new_tab:'Nowa Zakladka',
	news:'Wiadomosci',
	no:'Nie',
	normal:'Normalne',
	notebook:'Notatnik',
	one_level_up:'O Poziom w Góre',
	only:'Tylko',
	panoramic:'Panoramiczne',
	photos:'Zdjecia',
	picasaweb:'Zdjecia',
	prdhp:'Zakupy',
	preview:'Podgladu',
	products:'Zakupy',
	reader:'Czytnik',
	recents:'Niedawni',
	ref_links:'Wyrównaj Linki',
	results:'Wyniki',
	safemode:'Rodzicielski',
	save:'Zapisz',
	scholar:'Szkola',
	search:'Siec',
	search_in:'Szukaj w',
	searchers:'Wyszukiwarki',
	self_tab:'Aktualna Zakladka',
	similar:'Podobne',
	sites:'Witryny',
	size:'Rozmiar',
	square:'Kwadratowe',
	small:'Maly',
	special:'Special',
	str_url:'String Adres',
	styles:'Styl',
	tags:'Tagi',
	tall:'Pionowe',
	text:'Tekst',
	this_:'tej',
	title:'Tytul',
	toolbar:'Pasek',
	translate:'Tlumaczyc',
	trycache:'spróbuj w Wikislowniku',
	ui_ask_for_disabling:'Czy na pewno chcesz wylaczyc te funkcje?',
	ui_bar_adv_search:'Wyszukiwanie zaawansowane',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Pokaz ikony do menu',
	ui_bar_menu_static:'Zrobic Statyczne menu',
	ui_bar_sidebar:'Wlacz Prawym Panelu',
	ui_bar_sch_icons:'Pokaz Ikony',
	ui_bar_searchers:'Dodatkowe wyszukiwarki',
	ui_bar_suggest:'Podpowiedzi Google',
	ui_bar_suggest_lngs:'podpowiedzi w unnych jezykach',
	ui_bar_username:'Skrócenie w imie uzytkownika',
	ui_css_defaults:'Ustaw domyslne style z',
	ui_css_mozBrd:'Zaokraglone narozniki',
	ui_grl_new_ver:'Powiadom o nowej wersji',
	ui_grl_run_over:'Uruchom GoogleFx na',
	ui_grl_show_logo:'Pokaz logo GoogleFx',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'Przełącz na wersję podstawową',
	ui_img_prev_onThumb:'uruchom na obrazki',
	ui_img_prev_rt:'czas reakcji',
	ui_img_preview:'Podglad obrazka',
	ui_res_autopaged:'Automatyczne Przewijanie Stron',
	ui_res_autopaged_nb:'pokaz pasek nawigacyjny',
	ui_res_autopaged_rt:'szybkosc przewijania',
	ui_res_counter:'Numeracja Stron',
	ui_res_ref_icon:'Tekst lub ikony',
	ui_res_ref_pos:'wyrównaj do Prawej',
	ui_res_remove_ads:'Usun Google Sponsorzy',
	ui_res_remove_tracks:'Usun utworów z linków (Google Historia)',
	ui_res_sitefilter:'Wlacz Filtr Witryn funkcji',
	ui_res_targetLnks:'Adres Docelowy',
	ui_res_th_lft:'wyrównaj do Lewej',
	ui_res_th_sz:'Wielkosc miniaturki strony',
	ui_res_thumbs:'Miniaturki stron',
	ui_res_cols:'Pokaz wyniki w kolumnach',
	ui_title:'Konfiguracja uzytkownika',
	ui_txt_cache:'Ctrl + Kliknij / Shift + Kliknij, aby nadal w pamieci podrecznej Google',
	url:'Url',
	video:'Wideo',
	webhp:'Web',
	week:'Tydzien',
	wide:'Poziome',
	width:'Szerokosc',
	xlarge:'B-Duza',
	year:'Rok',
	yes:'Tak',
	youtube:'YouTube'
	};
	break;
	/* Portuguese */
	case 'pt':
	case 'pt-br':
	LNG = {
	about:'Sobre',
	alerts:'Alertas',
	all:'Tudo',
	aspect:'Formato',
	avatars:'Avatares',
	blogs:'Blogs',
	books:'Livros',
	buttons:'Botões',
	by:'por',
	calc:'Calculadora',
	calendar:'Calendário',
	cancel:'Cancelar',
	cliparts:'Desenhos',
	close:'Fechar',
	cnt_box:'Conteúdo Caixa',
	code:'Código',
	color:'Cor',
	content:'Conteúdo',
	counter:'Numeração',
	custom:'Personalizado',
	day:'Día',
	defaults:'Predefinidos',
	desc:'Descrição',
	dirhp:'Diretório',
	disabled:'Desactivado',
	docs:'Documentos',
	domain:'domínio',
	enabled:'Ativado',
	extreme:'Extremo',
	faces:'Rostros',
	filetype:'TipoArquivo',
	filters:'Filtros',
	finance:'Finanças',
	from:'de',
	general:'General',
	grayscale:'Grayscale',
	groups:'Grupos',
	height:'Altura',
	here:'daqui',
	high:'Alto',
	highest:'Maior',
	highlights:'Destaques',
	history:'Histórico',
	hour:'Godzina',
	huge:'Enorme',
	icon:'Ícones',
	ig:'iGoogle',
	images:'Imagens',
	in_:'em',
	install:'Instalar',
	labs:'Labs',
	large:'Largo',
	last:'último/a',
	linearts:'Delineadas',
	links:'Ligações',
	login:'Fazer logon',
	mail:'Correio',
	maps:'Mapas',
	mchrome:'Mono',
	medium:'Médio',
	min:'Min',
	month:'Mês',
	more:'Mais',
	movies:'Filmes',
	new_tab:'Nova Tab',
	news:'Notícias',
	no:'Não',
	normal:'Normal',
	notebook:'Caderno',
	one_level_up:'Um nível acima',
	only:'Somente',
	panoramic:'Panorâmico',
	photos:'Fotos',
	picasaweb:'Picasa',
	prdhp:'Compras',
	preview:'Visualização',
	products:'Compras',
	reader:'Leitor',
	recents:'Recentes',
	ref_links:'Referência Ligações',
	results:'Resultados',
	safemode:'SafeMode',
	save:'Salvar',
	scholar:'Académico',
	search:'Buscar',
	search_in:'Buscar en',
	searchers:'Buscadores',
	self_tab:'Atual Tab',
	similar:'Semelhante',
	sites:'Sitios',
	size:'Tamanho',
	square:'Quadrado',
	small:'Pequeno',
	special:'Especial',
	str_url:'Seqüência URL',
	styles:'Estilos',
	tags:'Tags',
	tall:'Alto',
	text:'Texto',
	this_:'deste',
	title:'Título',
	toolbar:'Bares',
	translate:'Traduzir',
	trycache:'tentar Cache',
	ui_ask_for_disabling:'Tem certeza que você deseja desativar esse recurso?',
	ui_bar_adv_search:'Barres de busca avançada',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Mostrar ícones nos menus',
	ui_bar_menu_static:'Tornar Menus Estáticos',
	ui_bar_sidebar:'Vire à direita do painel',
	ui_bar_sch_icons:'mostrar ícones',
	ui_bar_searchers:'Bares de Outros pesquisadores',
	ui_bar_suggest:'Dicas Google',
	ui_bar_suggest_lngs:'multi-lingual',
	ui_bar_username:'Reduza o seu nome de usuário',
	ui_css_defaults:'Definir padrões para os estilos de',
	ui_css_mozBrd:'Bordes Redondedos',
	ui_grl_new_ver:'Notifique de novas versões',
	ui_grl_run_over:'Executar GoogleFx mais',
	ui_grl_show_logo:'Mostrar Logo GoogleFx',
	ui_img_autopaged:'Auto-Paginação em Imagemes',
	ui_img_oldstyle:'Switch to basic version', //TODO
	ui_img_prev_onThumb:'deslocam sobre a imagem',
	ui_img_prev_rt:'reacção tempo',
	ui_img_preview:'Preview da imagem original',
	ui_res_autopaged:'Auto-Paginação',
	ui_res_autopaged_nb:'mostrar barra de navegação',
	ui_res_autopaged_rt:'Carga sensibilidade',
	ui_res_counter:'Mostrar Enumeração dos Resultados',
	ui_res_ref_icon:'Ligações Texto Referência para Ícones',
	ui_res_ref_pos:'alinhado à direita',
	ui_res_remove_ads:'Remover Patrocinadores (Publicidade)',
	ui_res_remove_tracks:'Remover Faixas de ligações (Google História)',
	ui_res_sitefilter:'Ativar filtragem capacidade do site',
	ui_res_targetLnks:'Abrir o acesso em',
	ui_res_th_lft:'alinhado à esquerda',
	ui_res_th_sz:'rácio tamanho',
	ui_res_thumbs:'Preview de Sítios',
	ui_res_cols:'Mostrar resultados em colunas',
	ui_title:'Definições do usuário',
	ui_txt_cache:'Ctrl + Clique / Shift + Clique para continuar no cache do Google',
	url:'Url',
	video:'Vídeo',
	webhp:'Web',
	week:'Semana',
	wide:'Largo',
	width:'Largura',
	year:'Ano',
	yes:'Se',
	youtube:'YouTube'
	};
	break;
	/* Russian (by AHTOH - k.ahtoh@gmail.com) */
	case 'ru':
	LNG = {
	about:'О Google Fx',
	alerts:'Предупреждения',
	all:'Все',
	aspect:'Соотношение сторон',
	avatars:'Аватари',
	blogs:'Блоги',
	books:'Книги',
	buttons:'Кнопки',
	by:'автор',
	calc:'Калькулятор',
	calendar:'Календарь',
	cancel:'Отменить',
	cliparts:'Клипарт',
	close:'Закрыть',
	cnt_box:'Содержание Box',
	code:'Код',
	color:'Цвет',
	content:'Содержание',
	counter:'Содержание',
	custom:'Обычай',
	day:'День',
	defaults:'По умолчанию',
	desc:'Описание',
	dirhp:'Каталог',
	disabled:'Инвалиды',
	docs:'Документы',
	domain:'домен',
	enabled:'Включено',
	extreme:'Экстрим',
	faces:'Лица',
	filetype:'Файла',
	filters:'Фильтры',
	finance:'Финансы',
	from:'от',
	general:'Общее',
	grayscale:'Серая шкала',
	groups:'Группы',
	height:'Высота',
	here:'здесь',
	high:'Средне',
	highest:'Много',
	highlights:'Подчеркнута',
	history:'История',
	hour:'Час',
	huge:'Огромный',
	icon:'Иконы',
	ig:'iGoogle',
	images:'Фото',
	in_:'в',
	install:'Устанавливать',
	labs:'Лаборатория',
	large:'Большие',
	last:'последний',
	linearts:'Разграничены',
	links:'Ссылки',
	login:'Войти',
	mail:'Почта',
	maps:'Карты',
	mchrome:'Монохромные',
	medium:'Средне',
	min:'Минимум',
	month:'Месяц',
	more:'Еще',
	movies:'Кино',
	new_tab:'Новой вкладке',
	news:'Новости',
	no:'Нет',
	normal:'Нормально',
	notebook:'Блокнот',
	one_level_up:'На уровень вверх',
	only:'Только',
	panoramic:'панорамные',
	photos:'Фото',
	picasaweb:'Picasa',
	preview:'Предосмоотр',
	products:'Покупка товаров',
	reader:'Reader',
	recents:'Постройка',
	ref_links:'Справка Ссылки',
	results:'Результаты',
	safemode:'Безопасный режим',
	save:'Сохранить',
	scholar:'Академия',
	search:'Поиск',
	searchers:'Искать в:',
	self_tab:'Этом окне',
	similar:'Похожие',
	sites:'Сайты',
	size:'Размер',
	square:'квадратные',
	small:'Маленький',
	special:'Специальные',
	str_url:'String URL',
	styles:'Стили',
	tags:'Теги',
	tall:'узкие',
	text:'Текст',
	this_:'этот',
	title:'Название',
	toolbar:'Панели',
	translate:'Переводить',
	trycache:'попробуйте Кэш',
	ui_ask_for_disabling:'Вы уверены, что вы хотите отключить эту функцию?',
	ui_bar_adv_search:'Панели инструментов: Расширенный поиск',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Показывать значки в меню',
	ui_bar_menu_static:'Закрепить панель меню',
	ui_bar_sidebar:'Включить правую боковую панель',
	ui_bar_sch_icons:'показать значки',
	ui_bar_searchers:'Отображать другие поисковые системы',
	ui_bar_suggest:'Google Подсказки',
	ui_bar_suggest_lngs:'многоязычная поддержка',
	ui_bar_username:'Преобразовать имя пользователя в короткое имя',
	ui_css_defaults:'Установите по умолчанию стили',
	ui_css_mozBrd:'Закругленые границы',
	ui_grl_new_ver:'Уведомлять о новых версиях',
	ui_grl_run_over:'Включить GoogleFx в:',
	ui_grl_show_logo:'Показывать логотип GoogleFx',
	ui_img_autopaged:'Автоматическая подгрузка изображений (при скролинге)', //TODO
	ui_img_oldstyle:'Переключитесь на упрощенную версию',
	ui_img_prev_onThumb:'Отобразить над миниатюрой',
	ui_img_prev_rt:'задержка (мили сек)',
	ui_img_preview:'Показать исходное изображение при наведении курсора',
	ui_res_autopaged:'Автоматическая загрузка результатов поиска на странице (подружается скролингом)',
	ui_res_autopaged_nb:'Панель навигации Gooooooole',
	ui_res_autopaged_rt:'Загружать результатов на страницу',
	ui_res_counter:'Показывать порядковый номер ссылки',
	ui_res_ref_icon:'Показывать текст "Сохраненная копия", "Похожие"',
	ui_res_ref_pos:'выравнивание значков правой',
	ui_res_remove_ads:'Удалить рекламу Google',
	ui_res_remove_tracks:'Удалить Google треков по ссылкам (История)',
	ui_res_sitefilter:'Включить функцию фильтра "на этом сайте"',
	ui_res_targetLnks:'Открывать ссылки в',
	ui_res_th_lft:'Показывать скриншот слева',
	ui_res_th_sz:'соотношение размера',
	ui_res_thumbs:'Предварительный просмотр сайтов',
	ui_res_cols:'Кол-во колонок на странице',
	ui_title:'Пользовательские настройки',
	ui_txt_cache:'Ctrl+Click / Shift+Click to continue in Google Cache',
	url:'Url',
	video:'Видео',
	webhp:'Веб',
	week:'Неделя',
	wide:'широкие',
	width:'Ширина',
	year:'Год',
	yes:'Да',
	youtube:'YouTube'
	};
	break;
	/* Turkish (by Sabbath) */
	case 'tk':
	case 'tr':
	LNG = {
	about:' Hakkında',
	alerts:'Uyarılar',
	all:'Hepsi',
	aspect:'Görünüm',
	avatars:'Avatarlar',
	blogs:'Bloglar',
	books:'Kitaplar',
	buttons:'Düğmeler',
	by:'tarafından',
	calc:'Hesaplama',
	calendar:'Takvim',
	cancel:'Iptal',
	cliparts:'Küçük resimler',
	close:'Kapat',
	cnt_box:'İçerik Kutusu',
	code:'Kod',
	color:'Renk',
	content:'İçerik',
	counter:'Sayaç',
	custom:'Özel',
	day:'Gün',
	defaults:'Varsayılanlar',
	desc:'Açıklama',
	dirhp:'Rehber',
	disabled:'Devredışı',
	docs:'Belgeler',
	domain:'Alan',
	enabled:'Etkinleştirildi',
	extreme:'Maksimum',
	faces:'Yüzler',
	filetype:'Dosya Türü',
	filters:'Filtreler',
	finance:'Finans',
	from:'-den',
	general:'Genel',
	grayscale:'Grilik skalası',
	groups:'Gruplar',
	height:'Yükseklik',
	here:'Burada',
	high:'Yüksek',
	highest:'En Yüksek',
	highlights:'Vurgulanmışlar',
	history:'Geçmiş',
	hour:'Saat',
	huge:'Kocaman',
	icon:'Simge',
	ig:'iGoogle',
	images:'Resimler',
	in_:'içinde',
	install:'Kur',
	labs:'Laboratuvarlar',
	large:'Büyük',
	last:'son',
	linearts:'Çizimler',
	links:'Bağlantılar',
	login:'Oturum aç',
	mail:'Posta',
	maps:'Haritalar',
	mchrome:'Tek Renk',
	medium:'Orta',
	min:'Dak',
	month:'Ay',
	more:'Daha',
	movies:'Filmler',
	new_tab:'Yeni Sekme',
	news:'Haberler',
	no:'Hayır',
	normal:'Normal',
	notebook:'Not Defteri',
	one_level_up:'Bir Seviye Yukarı',
	only:'Yalnızca',
	panoramic:'Panoramik',
	photos:'Fotoğraflar',
	picasaweb:'Picasa',
	preview:'Önizleme',
	products:'Alışveriş',
	reader:'Okuyucu',
	recents:'Son yapılan aramalar',
	ref_links:'Referans Bağlantılar',
	results:'Sonuçlar',
	safemode:'Güvenli Mod',
	save:'Kaydet',
	scholar:'Akademik',
	search:'Ara',
	searchers:'Arama Motorları',
	self_tab:'Güncel Sekme',
	similar:'Benzer',
	sites:'Web Siteleri',
	size:'Büyüklük',
	square:'Kare',
	small:'Küçük',
	special:'Özel',
	str_url:'Dize URL',
	styles:'Stiller',
	tags:'Etiketler',
	tall:'Uzun',
	text:'Metin',
	this_:'bu',
	title:'Başlık',
	toolbar:'Aracı Barlar',
	translate:'Tercüme et',
	trycache:'Önbelleği deneyin',
	ui_ask_for_disabling:'Bu özelliği devredışı bırakmak istediğinize emin misiniz?',
	ui_bar_adv_search:'Gelişmiş Arama Araç Çubukları',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'Simgeleri Menüde Göster',
	ui_bar_menu_static:'Menüyü Sabit Yap',
	ui_bar_sidebar:'Sağ Paneli Etkinleştir',
	ui_bar_sch_icons:'Simgeleri Göster',
	ui_bar_searchers:'Diğer Arama Motorları Araç Çubuğu',
	ui_bar_suggest:'Google Arama Önerileri',
	ui_bar_suggest_lngs:'çok dilli özelliği',
	ui_bar_username:'Kullanıcı adını kısalt',
	ui_css_defaults:'Varsayılana döndür stiller kapalı',
	ui_css_mozBrd:'Kenarları yuvarla',
	ui_grl_new_ver:'Yeni sürüm çıktığında uyar',
	ui_grl_run_over:'GoogleFx\'i üstte çalıştır',
	ui_grl_show_logo:'GoogleFx Logosunu göster',
	ui_img_autopaged:'Resimler için Sürekli Sayfalama',
	ui_img_oldstyle:'Temel sürüme geç',
	ui_img_prev_onThumb:'Küçük Resimlerin üstünde göster',
	ui_img_prev_rt:'Ektinleşme Süresi',
	ui_img_preview:'Fare imleci üzerindeyken orjinalini göster',
	ui_res_autopaged:'Sürekli Sayfalama',
	ui_res_autopaged_nb:'Gezinti Çubuğunu göster',
	ui_res_autopaged_rt:'kaydırmayı algılama oranı',
	ui_res_counter:'Sayaç Sayılarını göster',
	ui_res_ref_icon:'Referans Bağlantıları simgeye dönüştür',
	ui_res_ref_pos:'Simgeleri Sağa sırala',
	ui_res_remove_ads:'Google Reklamlarını (Sponsor) kaldır',
	ui_res_remove_tracks:'Google izlerini bağlantılardan kaldır (Geçmiş)',
	ui_res_sitefilter:'Web Sitesi filtreleme özelliğini etkinleştir',
	ui_res_targetLnks:'Bağlantıların Varsayılan Hedefi',
	ui_res_th_lft:'Küçük resimleri Sola sırala',
	ui_res_th_sz:'oran büyüklüğü',
	ui_res_thumbs:'Web Sitelerinin küçük resimleri',
	ui_res_cols:'Sonuçları Sütun halinde göster',
	ui_title:'Kullanıcı Ayarları',
	ui_txt_cache:'Google Belleğinde devam edebilmek için Ctrl+Tıklama / Shift+Tıklama',
	url:'Url',
	video:'Video',
	webhp:'Web',
	week:'Hafta',
	wide:'Geniş',
	width:'En',
	year:'Yıl',
	yes:'Evet',
	youtube:'YouTube'
	};
	break;
	/* Chinese Simplified (by Baker Zhao & Deep Blue)*/
	case 'zh':
	LNG = {
	about:'关于',
	alerts:'快讯',
	all:'所有',
	aspect:'方面',
	avatars:'虚拟形象',
	blogs:'博客',
	books:'图书',
	buttons:'按钮',
	by:'由',
	calc:'计算器',
	calendar:'日历',
	cancel:'取消',
	cliparts:'剪贴画',
	close:'关闭',
	cnt_box:'搜索结果栏',
	code:'代码',
	color:'颜色',
	content:'搜索结果',
	counter:'序号',
	custom:'自定义',
	day:'天',
	defaults:'默认',
	desc:'详述',
	dirhp:'目录',
	disabled:'禁用',
	docs:'文档',
	domain:'域名',
	enabled:'允许',
	extreme:'极端',
	faces:'面孔',
	filetype:'文件类型',
	filters:'过滤器',
	finance:'金融',
	from:'来自',
	general:'一般',
	grayscale:'灰度',
	groups:'网上论坛',
	height:'高度',
	here:'这里',
	high:'高',
	highest:'最高',
	highlights:'高亮',
	history:'历史记录',
	huge:'巨大',
	icon:'图标',
	ig:'iGoogle',
	images:'图像',
	in_:'在',
	install:'安装',
	labs:'实验室',
	large:'大',
	last:'最近',
	linearts:'素描画',
	links:'链接',
	login:'登陆',
	mail:'邮件',
	maps:'地图',
	mchrome:'黑白',
	medium:'中等',
	min:'分',
	month:'月',
	more:'更多',
	movies:'电影',
	new_tab:'新标签',
	news:'新闻',
	no:'没有',
	normal:'普通',
	notebook:'笔记本',
	one_level_up:'一个级别最高',
	only:'只',
	panoramic:'全景',
	photos:'照片',
	picasaweb:'Picasa',
	prdhp:'购物',
	preview:'预览',
	products:'产品',
	reader:'阅读器',
	recents:'Recents', //TODO
	ref_links:'相关链接',
	results:'结果',
	safemode:'安全模式',
	save:'保存',
	scholar:'学术',
	search:'搜索',
	searchers:'其他搜索站点',
	self_tab:'当前标签',
	similar:'相似',
	sites:'站点',
	size:'尺寸',
	square:'广场',
	small:'小',
	special:'特别',
	str_url:'字符串的URL',
	styles:'风格',
	tags:'标签',
	tall:'高大',
	text:'文本',
	this_:'这个',
	title:'标题',
	toolbar:'工具栏',
	translate:'翻译',
	trycache:'尝试缓存',
	ui_ask_for_disabling:'你确定要停用此功能？',
	ui_bar_adv_search:'高级搜索工具条',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'在菜单里显示图标',
	ui_bar_menu_static:'锁定菜单',
	ui_bar_sidebar:'允许使用右键菜单',
	ui_bar_sch_icons:'显示图标',
	ui_bar_searchers:'其他搜索站点栏',
	ui_bar_suggest:'Google 提示',
	ui_bar_suggest_lngs:'多语种功能',
	ui_bar_username:'使用短用户名',
	ui_css_defaults:'设为默认风格',
	ui_css_mozBrd:'圆角',
	ui_grl_new_ver:'有新版本时提醒',
	ui_grl_run_over:'在以下页面运行脚本',
	ui_grl_show_logo:'显示 GoogleFx Logo',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'切換至基本版',
	ui_img_prev_onThumb:'set over thumbs', //TODO
	ui_img_prev_rt:'延迟',
	ui_img_preview:'鼠标悬停时显示原始图片',
	ui_res_autopaged:'自动翻页',
	ui_res_autopaged_nb:'显示导航栏',
	ui_res_autopaged_rt:'滚动敏感度',
	ui_res_counter:'显示结果序号',
	ui_res_ref_icon:'“相关链接”显示为图标',
	ui_res_ref_pos:'将图标置于右侧',
	ui_res_remove_ads:'隐藏Google广告 (赞助商)',
	ui_res_remove_tracks:'从链接中移除google的追踪链接 (即历史记录)',
	ui_res_sitefilter:'打开站点过滤功能',
	ui_res_targetLnks:'默认打开新链接于',
	ui_res_th_lft:'将缩略图置于左侧',
	ui_res_th_sz:'尺寸比例',
	ui_res_thumbs:'站点缩略图',
	ui_res_cols:'两列中显示结果',
	ui_title:'用户设置',
	ui_txt_cache:'Ctrl+左键 / Shift+左键 以在Google缓存里继续',
	url:'URL',
	video:'视频',
	webhp:'网页',
	week:'周',
	wide:'宽',
	width:'宽度',
	year:'年',
	yes:'是的',
	youtube:'YouTube'
	};
	break;
	/* Chinese Traditional (by Baker Zhao & Deep Blue)*/
	case 'zh-tw':
	LNG = {
	about:'關於',
	alerts:'快訊',
	all:'全部',
	aspect:'方面',
	avatars:'虛擬人偶',
	blogs:'部落格',
	books:'圖書',
	buttons:'按鈕',
	by:'由',
	calc:'計算機',
	calendar:'日曆',
	cancel:'取消',
	cliparts:'貼圖',
	close:'關閉',
	cnt_box:'搜尋結果欄',
	code:'程式碼',
	color:'顏色',
	content:'搜尋結果',
	counter:'編號',
	custom:'自訂',
	day:'日期',
	defaults:'預設',
	desc:'描述',
	dirhp:'目錄',
	disabled:'關閉',
	docs:'文件',
	domain:'域名',
	enabled:'開啟',
	extreme:'極致',
	faces:'面孔',
	filetype:'檔案類型',
	filters:'過濾器',
	finance:'金融',
	from:'來自',
	general:'一般',
	grayscale:'灰階',
	groups:'網上論壇',
	height:'高度',
	here:'這裡',
	high:'高',
	highest:'最高',
	highlights:'高亮',
	history:'歷史紀錄',
	huge:'巨大',
	icon:'圖示',
	ig:'iGoogle',
	images:'圖片',
	in_:'在',
	install:'安裝',
	labs:'實驗室',
	large:'大',
	last:'最近',
	linearts:'素描',
	links:'連結',
	login:'登入',
	mail:'郵件',
	maps:'地圖',
	mchrome:'單色',
	medium:'中等',
	min:'分',
	month:'月',
	more:'更多',
	movies:'電影',
	new_tab:'新標籤',
	news:'新聞',
	no:'沒有',
	normal:'正常',
	notebook:'筆記本',
	one_level_up:'一個級別最高',
	only:'僅',
	panoramic:'全景',
	photos:'照片',
	picasaweb:'Picasa',
	prdhp:'購物',
	preview:'預覽',
	products:'產品',
	reader:'閱讀器',
	recents:'Recents', //TODO
	ref_links:'相關連結',
	results:'結果',
	safemode:'安全模式',
	save:'保存',
	scholar:'學術',
	search:'搜尋',
	searchers:'其他搜尋引擎',
	self_tab:'目前標籤',
	similar:'相似',
	sites:'網站',
	size:'尺寸',
	square:'廣場',
	small:'小',
	special:'特別',
	str_url:'字串的URL',
	styles:'風格',
	tags:'標籤',
	tall:'高大',
	text:'文本',
	this_:'這個',
	title:'標題',
	toolbar:'工具列',
	translate:'翻譯',
	trycache:'嘗試快取',
	ui_ask_for_disabling:'你確定要停用此功能？',
	ui_bar_adv_search:'進階搜尋工具列',
	ui_bar_leftnav_ah:'AutoHide Left Menu', //TODO
	ui_bar_menu_icons:'在選單裡顯示圖示',
	ui_bar_menu_static:'鎖定選單',
	ui_bar_sidebar:'允許使用右鍵選單',
	ui_bar_sch_icons:'顯示圖示',
	ui_bar_searchers:'其他搜尋引擎欄',
	ui_bar_suggest:'Google 搜尋建議',
	ui_bar_suggest_lngs:'多國語言功能',
	ui_bar_username:'使用簡短用戶名稱',
	ui_css_defaults:'設為預設風格',
	ui_css_mozBrd:'圓角',
	ui_grl_new_ver:'有新版本時提醒',
	ui_grl_run_over:'在以下頁面運行腳本',
	ui_grl_show_logo:'顯示 GoogleFx Logo',
	ui_img_autopaged:'Auto-Paged of Images', //TODO
	ui_img_oldstyle:'切換至基本版',
	ui_img_prev_onThumb:'置於縮圖上',
	ui_img_prev_rt:'反應時間',
	ui_img_preview:'當滑鼠移至時顯示原始圖片',
	ui_res_autopaged:'自動翻頁',
	ui_res_autopaged_nb:'顯示導航列',
	ui_res_autopaged_rt:'滾動敏感度',
	ui_res_counter:'顯示搜尋結果編號',
	ui_res_ref_icon:'以圖示顯示“相關連結”',
	ui_res_ref_pos:'將圖示置於右側',
	ui_res_remove_ads:'隱藏 Google 廣告〈贊助商〉',
	ui_res_remove_tracks:'從連結中移除 Google 的追蹤連結（即歷史記錄）',
	ui_res_sitefilter:'打開網站過濾功能',
	ui_res_targetLnks:'預設開啟新連結於',
	ui_res_th_lft:'將預覽圖置於左側',
	ui_res_th_sz:'尺寸比例',
	ui_res_thumbs:'網站預覽圖',
	ui_res_cols:'結果顯示兩列',
	ui_title:'用戶設定',
	ui_txt_cache:'Ctrl+左鍵 / Shift+左鍵 以在 Google 快取裡繼續',
	url:'網址',
	video:'影片',
	webhp:'網頁',
	week:'周',
	wide:'寬',
	width:'寬度',
	year:'年',
	yes:'是的',
	youtube:'YouTube'
	};
	break;
	/* English */
	default:
	LNG = {
	about:'About',
	alerts:'Alerts',
	all:'All',
	aspect:'Aspect',
	avatars:'Avatars',
	blogs:'Blogs',
	books:'Books',
	buttons:'Buttons',
	by:'by',
	calc:'Calculator',
	calendar:'Calendar',
	cancel:'Cancel',
	cliparts:'ClipArts',
	close:'Close',
	cnt_box:'Content Box',
	code:'Code',
	color:'Color',
	content:'Content',
	counter:'Counter Number',
	custom:'Custom',
	day:'Day',
	defaults:'Defaults',
	desc:'Description',
	dirhp:'Directory',
	disabled:'Disabled',
	docs:'Documents',
	domain:'domain',
	enabled:'Enabled',
	extreme:'Extreme',
	faces:'Faces',
	filetype:'Filetype',
	filters:'Filters',
	finance:'Finance',
	from:'from',
	general:'General',
	grayscale:'Grayscale',
	groups:'Groups',
	height:'Height',
	here:'here',
	high:'High',
	highest:'Highest',
	highlights:'Highlights',
	history:'History',
	hour:'Hour',
	huge:'Huge',
	icon:'Icons',
	ig:'iGoogle',
	images:'Images',
	in_:'in',
	install:'Install',
	labs:'Labs',
	large:'Large',
	last:'last',
	linearts:'LineArts',
	links:'Links',
	login:'Login',
	mail:'Mail',
	maps:'Maps',
	mchrome:'Monochrome',
	medium:'Medium',
	min:'Min',
	month:'Month',
	more:'More',
	movies:'Movies',
	new_tab:'New Tab',
	news:'News',
	no:'No',
	normal:'Normal',
	notebook:'NoteBook',
	one_level_up:'One Level Up',
	only:'Only',
	panoramic:'Panoramic',
	photos:'Photos',
	picasaweb:'Picasa',
	prdhp:'Shopping',
	preview:'Preview',
	products:'Shopping',
	reader:'Reader',
	recents:'Recents',
	ref_links:'Reference Links',
	results:'Results',
	safemode:'SafeMode',
	save:'Save',
	scholar:'Scholar',
	search:'Search',
	searchers:'Searchers',
	self_tab:'Current Tab',
	similar:'Similar',
	sites:'Sites',
	size:'Size',
	square:'Square',
	small:'Small',
	special:'Special',
	str_url:'String URL',
	styles:'Styles',
	tags:'Tags',
	tall:'Tall',
	text:'Text',
	this_:'this',
	title:'Title',
	toolbar:'ToolBars',
	translate:'Translate',
	trycache:'try Cache',
	ui_ask_for_disabling:'Are you sure you want to disable this feature?',
	ui_bar_adv_search:'Advanced Search Toolbar',
	ui_bar_leftnav_ah:'AutoHide Left Menu',
	ui_bar_menu_icons:'Show icons in menu',
	ui_bar_menu_static:'Make Static Header and Menus',
	ui_bar_sidebar:'Enable Right Sidebars',
	ui_bar_sch_icons:'show icons',
	ui_bar_searchers:'Other Searchers Toolbar',
	ui_bar_suggest:'Google Suggest',
	ui_bar_suggest_lngs:'multi-language feature',
	ui_bar_username:'Convert username to short name',
	ui_css_defaults:'Set to defaults the styles of',
	ui_css_mozBrd:'Round Borders',
	ui_grl_new_ver:'Notify of New Versions',
	ui_grl_run_over:'Run this script over',
	ui_grl_show_logo:'Show GoogleFx Logo',
	ui_img_autopaged:'Auto-Paged of Images',
	ui_img_oldstyle:'Switch to basic version',
	ui_img_prev_onThumb:'set over thumbs',
	ui_img_prev_rt:'reaction time',
	ui_img_preview:'Show original on MouseOver',
	ui_res_autopaged:'Auto-Paged of Results',
	ui_res_autopaged_nb:'show virtual navigation bar',
	ui_res_autopaged_rt:'scroll detection ratio',
	ui_res_counter:'Show Counter Numbers',
	ui_res_ref_icon:'Convert Text Ref-links to Icons',
	ui_res_ref_pos:'align icons to Right',
	ui_res_remove_ads:'Hide Google Ads (Sponsor)',
	ui_res_remove_tracks:'Remove Google Tracks from links (History)',
	ui_res_sitefilter:'Enable site filter feature',
	ui_res_targetLnks:'Open Links in',
	ui_res_th_lft:'align thumbs to left',
	ui_res_th_sz:'ratio size',
	ui_res_thumbs:'Show Sites Thumbshots',
	ui_res_cols:'Show Results in Columns',
	ui_title:'User Settings',
	ui_txt_cache:'Ctrl+Click / Shift+Click to continue in Google Cache',
	url:'Url',
	video:'Video',
	webhp:'Web',
	week:'Week',
	wide:'Wide',
	width:'Width',
	year:'Year',
	yes:'Yes',
	youtube:'YouTube'
	};
}


LNG.blogsearch = LNG.blogs;
LNG.videosearch = LNG.video;
LNG.intl = LNG.more + ' &raquo;';
LNG.prdhp = LNG.products;
LNG.search_in = LNG.search + ' ' + LNG.in_;


GFX.Srv.local = GFX.Srv.maps;
GFX.Srv.webhp = GFX.Srv.search;


setColorTheme=function(theme,save){


	if(theme) GFX.gTheme = theme;
	
	if( !$defined(THEMES[GFX.gTheme]) ) GFX.gTheme = 'Default';
	
	/*  Set CSS Theme  */
	if( THEMES[GFX.gTheme] ){
		var currentTheme = JSON.decode(THEMES[GFX.gTheme].styles.replace(/([\W])\s/g,'$1').replace(/(box\-shadow)/g,(isGecko?'-moz-$1':(isWebkit?'-webkit-$1':'$1'))));
		if(currentTheme != null){
			CSS = currentTheme;
		}
	}


	/* Convert CSS Styles in an Object */
	for(var prop in CSS){
		if(prop=='_v') continue;
		var cssDB = DB.css[prop] = {};
		var cssObj = CSS[prop];
		var rules = String(cssObj).split(';');
		for(var i=0; i < rules.length-1; i++){
			str = rules[i].split(':');
			var name = str[0].replace(/\-[a-z]/g,function(s){return s.substring(1).toUpperCase();});
			cssDB[name.trim()] = str[1];
		}
	}

	// Convert CSS3 Border Radius for Firefox
	if(isGecko) {
		CSS.mzborder = CSS.mzborder.replace('border-radius','-moz-border-radius').replace('border-top-left-radius','-moz-border-radius-topleft').replace('border-top-right-radius','-moz-border-radius-topright').replace('border-bottom-left-radius','-moz-border-radius-bottomleft').replace('border-bottom-right-radius','-moz-border-radius-bottomright');
	}

	var thumbsWidth = parseInt(111*(GFX.rThSize||0.75));
	var thumbsHeight = parseInt(82*(GFX.rThSize||0.75));
	
	DB.css.thumbs.width =  thumbsWidth + 'px';
	DB.css.thumbs.height = thumbsHeight + 'px';
	
	DB.css.thumbs.maxWidth = thumbsWidth + parseInt(DB.css.thumbs.marginLeft||'0') + parseInt(DB.css.thumbs.marginRight||'0') + 'px';
	DB.css.thumbs.maxHeight = thumbsHeight + parseInt(DB.css.thumbs.marginTop||'0') + parseInt(DB.css.thumbs.marginBottom||'0') + 'px';

	if(DB.css.resbox.paddingLeft && parseInt(DB.css.resbox.paddingLeft) < 1){
		DB.css.resbox.paddingLeft = '10px';
		if(DB.css.thumbs.marginLeft && parseInt(DB.css.thumbs.marginLeft) > 0){
			DB.css.thumbs.marginLeft = '0px';
		}
	}

	var value, isDarkBg;
	if(DB.css.titles.color && DB.css.titles.color.hexToRgb(true)){
		value = new Color(DB.css.titles.color);
		DB.css.titles.colorHover = value.brightness(30).rgbToHex();
		value = new Color(DB.css.resbox.backgroundColor||DB.css.body.backgroundColor||'#fff');
		DB.css.titles.colorVisited = value.mix((new Color(DB.css.titles.color)).hue(-100),50).invert().hue(-150).brightness(-5).rgbToHex();
	}
	if(DB.css.thumbs.borderColor && DB.css.thumbs.borderColor.hexToRgb(true)){
		value = new Color(DB.css.thumbs.borderColor);
		DB.css.thumbs.borderColorHover = value.brightness(40).rgbToHex();
		value = new Color(DB.css.resbox.backgroundColor||DB.css.body.backgroundColor||'#fff');
		DB.css.thumbs.borderColorVisited = value.mix('#f0f',50).rgbToHex();
		DB.css.thumbs.backgroundColorVisited = value.mix('#505',80).rgbToHex();
	}
	if(DB.css.buttons.backgroundColor && DB.css.buttons.backgroundColor.hexToRgb(true)){
		value = new Color(DB.css.buttons.backgroundColor);
		isDarkBg = (value[0] + value[1] + value[2] < 380);
		DB.css.buttons.backgroundColorHover = value.brightness(isDarkBg?30:-40).rgbToHex();
		value = new Color(DB.css.buttons.backgroundColorHover);
		isDarkBg = (value[0] + value[1] + value[2] < 500);
		DB.css.buttons.colorHover = (isDarkBg ? '#fff' : '#000');
	}
	if(DB.css.header.color && DB.css.header.color.hexToRgb(true)){
		value = new Color(DB.css.header.color);
		DB.css.header.colorHover = DB.css.menus.colorHover = value.brightness(20).rgbToHex();
	}
	if(DB.css.header.backgroundColor && DB.css.header.backgroundColor.hexToRgb(true)){
		value = new Color(DB.css.header.borderColor);
		value = value.brightness(60);
		DB.css.header.backgroundColorHover = value.rgbToHex();
	}
	
	// first, must be implemented before saving the variables 
	if(theme) GFX_ColorTheme();
	
	if(save){
		GM_setValue('GFX.gTheme', theme);
	}
	
}
setColorTheme();




/***********************************/
/**  Common Global Variables	   */
/***********************************/

/* Resolve Current Google Service through the URL */
SERVICE = (URI.host[0]=='www' && URI.path[0] ? URI.path[0] : URI.host[0]).replace(/-/,'');

/* Remove empty arguments from URI query */
URI.search = URI.search.replace(/[a-z0-9_]+=(&|$)/ig,'');

/* Convert URI arguments of the query in an Object */
URI.query = {};
var o = (/(^|&)q=/.test(URI.hash) ? URI.hash : URI.search).split('&');
for(var i=0,len=o.length; i < len; i++){
	var val = o[i].split('=');
	URI.query[val[0]] = unescape(val[1]);
};


URI.query.start = isNaN(URI.query.start) ? 0 : Number(URI.query.start);
URI.query.num = isNaN(URI.query.num) ? 0 : Number(URI.query.num);

if(URI.query.tbs){
	URI.query._tbs = URI.query.tbs;
	var items = URI.query.tbs.split(',');
	URI.query.tbs = {};
	for(var i=0,len=items.length; i < len; i++){
		var val = items[i].split(':');
		URI.query.tbs[val[0]] = unescape(val[1]);
	}
} else {
	URI.query._tbs = '';
	URI.query.tbs = {};
}


SUBSERVICE = false;
if(URI.query.tbs.vid) SUBSERVICE = 'video';
else if(URI.query.tbs.nws) SUBSERVICE = 'news';
else if(URI.query.tbs.bks) SUBSERVICE = 'books';
else if(URI.query.tbs.blg) SUBSERVICE = 'blogsearch';


INPUT = {};
if(URI.query.q && URI.query.q.indexOf(':') != -1)
{
	hasSomeFilter = true;

	var q = URI.query.q.replace(/\+/g,' ');
	var q  = q.split(/(\-?[\w\_]+\:\s*"[^"]*"|\-?[\w\_]+\:\s\("[^\)]*\)|\-?[\w\_]+\:\s*[^\s]*|$)/g);
	var clean_q = '';
	
	for(var i=0, len=q.length; i < len; i++){
		var name = q[i].split(':');
		if(!name[1] || name[0].length < 3){
			clean_q += q[i];
			continue;
		}
		var val = name[1].replace(/^\s*|\s*$/g,'');
		name = name[0].replace(/\-/,'_');
		INPUT[name] = ( $defined(INPUT[name]) ? INPUT[name].concat([val]) : [val] );
	}
	
	if(INPUT.imagesize) {
		var size = String(INPUT.imagesize).split('x');
		URI.query.imgw = size[0];
		URI.query.imgh = size[1];
	}
	
	if(INPUT.filetype) {
		URI.query.as_filetype = INPUT.filetype;
	}
	
	INPUT.q = clean_q;

} else {
	INPUT.q = URI.query.q || URI.query.as_q;
	if(URI.query.as_sitesearch) INPUT.site = [URI.query.as_sitesearch];
}

hasSomeQuery = (URI.query.q && URI.query.q.length != 0) || (URI.query.as_q && URI.query.as_q.length != 0) || (URI.query.as_oq && URI.query.as_oq.length != 0) || (URI.query.as_epq && URI.query.as_epq.length != 0) || (URI.query.as_eq && URI.query.as_eq.length != 0) || false;



//  Rules for run services
var srvRule = {
				intl		: URI.path[2] && URI.path[2] == 'options',
				search		: !INPUT.define
};
canRun = {
				gSuggest	: false,
				code		: false,
				blogsearch	: false,
				books		: false,
				chrome		: false,
				finance		: false,
				firefox		: false,
				groups		: false,
				history		: false,
				ig			: false,
				images		: false,
				intl		: false,
				local		: false,
				maps		: false,
				movies		: false,
				news		: false,
				options		: false,
				picasaweb	: false,
				products	: false,
				scholar		: false,
				search		: false,
				translate	: false,
				video		: false
};

if ( $defined(canRun[SERVICE]) ) {
	canRun[SERVICE] = ($defined(srvRule[SERVICE]) ? srvRule[SERVICE] : true);
} else {
	switch(SERVICE){
		case 'www':
		case 'webhp':
			SERVICE = 'search';
			break;
		case 'bkshp':
			SERVICE = 'books';
			break;
		case 'grphp':
			SERVICE = 'groups';
			break;
		case 'imghp':
			SERVICE = 'images';
			break;
		case 'nwshp':
			SERVICE = 'news';
			break;
		case 'translate_t':
			SERVICE = 'translate';
			break;
		case 'schhp':
			SERVICE = 'scholar';
			break;
	}
	if ($defined(canRun[SERVICE])) {
		canRun[SERVICE] = ($defined(srvRule[SERVICE]) ? srvRule[SERVICE] : true);
	}
}

canRun.googlefx =  SERVICE ? GFX.Srv[SERVICE] : true;

canRun.gSuggest = GFX.gSuggest && !canRun.finance && URI.pathname != '/dictionary';

GFX.rThSize = (GFX.rThSize > 2) ? 2: ((GFX.rThSize < 0) ? 0.2 : GFX.rThSize);
if(GFX.rAutoPagRT < 1){ GFX.rAutoPagRT = 1; }

DB.titleSz = CSS.titles.match(/font-size\s?:([0-9]+)/i);
DB.titleSz = ( DB.titleSz && DB.titleSz[1] ) ? Number(DB.titleSz[1]) : 12;

} //END GFX_Init



/***************************************************************************************************/
/**                                        GoogleFx First Run                                      */
/***************************************************************************************************/
var GFX_GUI_Functions = function()
{
	
	var docSize = doc.getScrollSize();

	BgBox = new Element('div',{
		'id'	: 'gfx-BgBox',
		'styles': {
			'display'	: 'none',
			'position'	: 'fixed',
			'top'		: '0',
			'left'		: '0',
			'z-index'	: '5555',
			'height'	: + docSize.y +'px',
			'width'		: + docSize.x +'px'
		}
	});
	
	AlertBox = new SexyAlertBox({
		name: 'gfx-alertbox',
		OverlayStyles   : {
			'background-color': '',
			'background-image': 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA/SURBVHjaYmRgYEhjIAIABBATA5EAIICIVggQQEQrBAggohUCBBDRCgECiGiFAAFEtEKAACJaIUAAEa0QIMAAs2IAetPOw3cAAAAASUVORK5CYII=")',
			'opacity': '1'
		},
		showDuration    : 0,
		closeDuration   : 0
	});

	
	//  GUI Settings
	//**********************************
	var addGUI = function()
	{
		GFX_GUI_Styles();
		var html = '\
		<div id=gfx-gui-dragger></div>\
		<div class=hdr>\
			<span>\
			  <div>\
			  <img src="'+Google_Logo+'" width=138 height=48 />\
			  <a id=gfx-logo href="http://userscripts.org/scripts/show/'+ SCRIPT_NUM +'" target="_blank">v'+ SCRIPT_VER +'</a>\
			 </div>\
			  <ul id=gfx-gui-mnu>\
				<li class=selected><span onclick=gfxGuiMenu(0,event)>' + LNG.general + '</span></li>\
				<li><span onclick=gfxGuiMenu(1,event)>' + LNG.toolbar + '</span></li>\
				<li><span onclick=gfxGuiMenu(2,event)>' + LNG.results + '</span></li>\
				<li><span onclick=gfxGuiMenu(3,event)>' + LNG.images  + '</span></li>\
				<li><span onclick=gfxGuiMenu(4,event)>' + LNG.styles  + '</span></li>\
				<li><span onclick=gfxGuiMenu(5,event)>' + LNG.about   + '</span></li>\
			  </ul>\
			</span>\
			'+ (DB.info && DB.info.newVer ? '<span class=subtitle><a href="http://userscripts.org/scripts/source/31950.user.js" target=_blank>' + LNG.install + ' GoogleFx v' + DB.info.v + '</a></span>':'') +'\
		  </div>\
		  <div class=tabs>\
			<fieldset id=gfx-tab-0 style="display:block">\
				<legend>' + LNG.general + '</legend>\
					<label><input name=GFX.gNewVer type=checkbox \
					' + (GFX.gNewVer ? 'checked=checked' : '')	+ '>'	+ LNG.ui_grl_new_ver	+'</label>\
					<label><input name=GFX.gFxLogo type=checkbox \
						onclick="$id(\'gfx-PV_fxlogo\').style.display = (this.checked ? \'inline-block\' : \'none\');" \
					' + (GFX.gFxLogo ? 'checked=checked' : '')	+ '>'	+ LNG.ui_grl_show_logo	+'</label>\
					<hr width=90% align=center>\
					<div class=services>\
					<span class=subtitle>'+ LNG.ui_grl_run_over +'</span><br>';
					
					// Sort GFX.Srv object based on current Language
					var list = [];
					for (var o in GFX.Srv){
						if(LNG[o]){ list.push([LNG[o].toLowerCase(), o]); }
					}
					list.sort( function(a,b){return ( a[0] > b[0] ) - ( a[0] < b[0] );} );
					
					var len = list.length;
					var rows = Math.ceil(len/3);
					var dbrow = rows*2;
					len--;
					for(var i=0;i < rows;){
						html += '<label><input name=GFX.Srv.'+ list[i][1] +' type=checkbox ' +
						(GFX.Srv[list[i][1]] ? 'checked=checked' : '') +
						'>'+ list[i][0].capitalize() +'</label>';
						if( i+rows > dbrow ){ break; }
						html += '<label><input name=GFX.Srv.'+ list[i+rows][1] +' type=checkbox ' +
						(GFX.Srv[list[i+rows][1]] ? 'checked=checked' : '') +
						'>'+list[i+rows][0].capitalize() +'</label>';
						if( i+dbrow > len ){ break; }
						html += '<label><input name=GFX.Srv.'+ list[i+dbrow][1] +' type=checkbox ' +
						(GFX.Srv[list[i+dbrow][1]] ? 'checked=checked' : '') +
						'>' + list[i+dbrow][0].capitalize() +'</label>';
						i++;
					}

		html += '</div>\
			</fieldset>\
			<fieldset id=gfx-tab-1>\
				<legend>' + LNG.toolbar + '</legend>\
				<label><input name=GFX.gSuggest type=checkbox \
				' + (GFX.gSuggest ? 'checked=checked' : '')	+ ' \
					onclick="this.parentNode.nextSibling.className=(this.checked?\'sub\':\'sub disabled\');$id(\'gfx-PV_inputbox\').innerHTML=(this.checked ? \'Suggest Me!\' : \'...\');">\
				'														+ LNG.ui_bar_suggest		+'</label>\
				<label class=sub><input name=GFX.gSuggestLng type=checkbox \
				' + (GFX.gSuggestLng ? 'checked=checked' : '')+ '>'		+ LNG.ui_bar_suggest_lngs	+'</label>\
				<br/>\
				<label><input name=GFX.bMnuFix type=checkbox '
				+ (GFX.bMnuFix ? 'checked=checked' : '')
				+ ' onclick="this.parentNode.nextSibling.className=(this.checked?\'sub\':\'sub disabled\');var hd=$id(\'gfx-PV_headers\');hd.style.borderWidth=(this.checked ? \'2px\' : \'0px\');hd.style.position=(this.checked ? \'fixed\' : \'relative\');$id(\'gfx-PV_body\').style.marginTop=(this.checked ? \'140px\' : \'0px\');"'
				+ '>' + LNG.ui_bar_menu_static + '</label>\
				<label class=sub><input name=GFX.bMnuIcn type=checkbox '
				+ (GFX.bMnuIcn ? 'checked=checked' : '')
				+ ' onclick="var items=$id(\'gfx-PV_menus\').getElementsByTagName(\'LI\');for(var i=0;i<items.length;i++){items[i].style.paddingLeft=(this.checked?\'20px\':\'3px\');items[i].style.backgroundPosition=(this.checked?\'left center\':\'left -20px\');}"'
				+ '>' + LNG.ui_bar_menu_icons + '</label>\
				<label class=sub><input name=GFX.bShtName type=checkbox '
				+ (GFX.bShtName ? 'checked=checked' : '')
				+ ' onclick="$id(\'gfx-PV_username\').style.display=(this.checked ? \'none\' : \'inline-block\');"'
				+ '>' + LNG.ui_bar_username + '</label>\
				<br/>\
				<label><input name=GFX.bToolbar type=checkbox '
				+ (GFX.bToolbar ? 'checked=checked' : '')
				+ '>' + LNG.ui_bar_adv_search + '</label>\
				<br/>\
				<label><input name=GFX.bSrchs type=checkbox '
				+ (GFX.bSrchs ? 'checked=checked' : '')
				+ ' onclick="var o = this.parentNode.nextSibling; o.className = o.nextSibling.className = (this.checked ? \'sub\' : \'sub disabled\');$id(\'gfx-PV_searchers\').style.display=(this.checked ? \'block\' : \'none\');"'
				+ '>' + LNG.ui_bar_searchers + '</label>\
				<label class=sub><input name=GFX.bSrchsIcn type=checkbox '
				+ (GFX.bSrchsIcn ? 'checked=checked' : '')
				+ ' onclick="var items=$id(\'gfx-PV_searchers\').getElementsByTagName(\'IMG\');for(var i=0;i<items.length;i++){items[i].style.display=(this.checked?\'inline-block\':\'none\');}"'
				+ '>' + LNG.ui_bar_sch_icons + '</label>\
				<br/>\
				<label><input name=GFX.bLeftNavAH type=checkbox '
				+ (GFX.bLeftNavAH ? 'checked=checked' : '')
				+ '>' + LNG.ui_bar_leftnav_ah + '</label>\
				<br/>\
				<label><input name=GFX.bSidebar type=checkbox '
				+ ' onclick="$id(\'gfx-PV_sidebar\').style.display=(this.checked ? \'block\' : \'none\');"'
				+ (GFX.bSidebar ? 'checked=checked' : '')
				+ '>' + LNG.ui_bar_sidebar + '</label>\
				<div class=sidebar>';
				// Add GFX.rSbar
				var list = [];
				for (var o in GFX.rSbar){
					list.push([ (LNG[o] || o).toLowerCase(), o]);
				}
				list.sort( function(a,b){return ( a[0] > b[0] ) - ( a[0] < b[0] );} );
				
				var len = list.length;
				var rows = Math.ceil(len/3);
				var dbrow = rows*2;
				len--;
				for(var i=0;i < rows;){
					html += '<label class=sub><input name=GFX.rSbar.'+ list[i][1] +' type=checkbox ' +
					(GFX.rSbar[list[i][1]] ? 'checked=checked' : '') +
					'>'+ list[i][0].capitalize() +'</label>';
					if( i+rows > dbrow ){ break; }
					html += '<label class=sub><input name=GFX.rSbar.'+ list[i+rows][1] +' type=checkbox ' +
					(GFX.rSbar[list[i+rows][1]] ? 'checked=checked' : '') +
					'>'+list[i+rows][0].capitalize() +'</label>';
					if( i+dbrow > len ){ break; }
					html += '<label class=sub><input name=GFX.rSbar.'+ list[i+dbrow][1] +' type=checkbox ' +
					(GFX.rSbar[list[i+dbrow][1]] ? 'checked=checked' : '') +
					'>' + list[i+dbrow][0].capitalize() +'</label>';
					i++;
				}
			html+='\
				</div>\
			</fieldset>\
			<fieldset id=gfx-tab-2>\
				<legend>' + LNG.results + '</legend>\
				<label><input name=GFX.rNoAds type=checkbox \
				onclick="$id(\'gfx-PV_ads\').style.display=(this.checked ? \'none\' : \'block\');" \
				' + (GFX.rNoAds ? 'checked=checked' : '')+ '>'		+ LNG.ui_res_remove_ads	+'</label>\
				<label><input name=GFX.rNoTrack type=checkbox \
				' + (GFX.rNoTrack ? 'checked=checked' : '')+ '>'	+ LNG.ui_res_remove_tracks	+'</label>\
				<br>\
				<label><input name=GFX.rAutoPag type=checkbox \
				' + (GFX.rAutoPag ? 'checked=checked' : '') + ' \
					onclick="this.parentNode.nextSibling.className=(this.checked?\'sub\':\'sub disabled\');">\
				'													+ LNG.ui_res_autopaged		+'</label>\
				<label class=sub style="vertical-align:middle;">' + LNG.ui_res_autopaged_rt + ': \
					<select name=GFX.rAutoPagRT>\
					<option value=1' + (GFX.rAutoPagRT < 1.01 ? ' selected' : '') 
					+ '>' + LNG.min +'</option>\
					<option value=2' + ((GFX.rAutoPagRT > 1 && GFX.rAutoPagRT < 2.01) ? ' selected' : '')
					+ '>' + LNG.normal + '</option>\
					<option value=3' + ((GFX.rAutoPagRT > 2 && GFX.rAutoPagRT < 3.01) ? ' selected' : '')
					+ '>' + LNG.high + '</option>\
					<option value=4' + ((GFX.rAutoPagRT > 3 && GFX.rAutoPagRT < 4.01) ? ' selected' : '')
					+ '>' + LNG.highest + '</option>\
					<option value=5' + ((GFX.rAutoPagRT > 4) ? ' selected' : '')
					+ '>' + LNG.extreme + '</option>\
					</select>\
				</label>\
				<label class=sub><input name=GFX.rAutoPagNav type=checkbox \
				onclick="$id(\'gfx-PV_navbar\').style.display=(this.checked ? \'table\' : \'none\');" \
				' + (GFX.rAutoPagNav ? 'checked=checked' : '')+ '>'		+ LNG.ui_res_autopaged_nb	+'</label>\
				<br/>\
				<label><input name=GFX.rThShots type=checkbox \
					onclick="$id(\'gfx-PV_thumbs\').style.display=(this.checked?\'inline-block\':\'none\'); var o=this.parentNode.nextSibling; o.className = o.nextSibling.className = (this.checked ? \'sub\' : \'sub disabled\');" '
				+ (GFX.rThShots ? 'checked=checked' : '')
				+ '>' + LNG.ui_res_thumbs + '</label>\
				<label class=sub><input name=GFX.rThLft type=checkbox \
					onclick="var o=$id(\'gfx-PV_thumbs\'); o.setAttribute(\'style\',(this.checked ? \'float:left;\' : \'float:right;\'));" '
				+ (GFX.rThLft ? 'checked=checked' : '')
				+ '>' + LNG.ui_res_th_lft + '</label>\
				<label class=sub style="vertical-align:middle;">' + LNG.ui_res_th_sz + ': '	+ '\
				<select name=GFX.rThSize onchange="var o=$id(\'gfx-PV_thumbs\');var v=this.options[this.selectedIndex].value;o.style.minWidth=(120*v)+\'px\';o.style.minHeight=(90*v)+\'px\';o=$id(\'gfx-PV_content_holder\');o.style.minHeight=((90*v)+10)+\'px\';">'	+ '\
				<option value=0.5'  + ((GFX.rThSize < 0.51) ? ' selected' : '')
				+ '>50%</option>\
				<option value=0.75' + ((GFX.rThSize > 0.5 && GFX.rThSize < 0.8) ? ' selected' : '')
				+ '>75%</option>\
				<option value=1'    + ((GFX.rThSize > 0.8 && GFX.rThSize < 1.1) ? ' selected' : '')
				+ '>100%</option>\
				<option value=1.25' + ((GFX.rThSize > 1 && GFX.rThSize < 1.3) ? ' selected' : '')
				+ '>125%</option>\
				<option value=1.5'  + ((GFX.rThSize > 1.3) ? ' selected' : '')
				+ '>150%</option>\
				</select>\
				</label>\
				<br/>\
				<label><input name=GFX.rCounter type=checkbox \
					onclick="var o = $id(\'gfx-PV_counter\'); o.style.display = (this.checked ? \'inline-block\' : \'none\');" '
				+ (GFX.rCounter ? 'checked=checked' : '')
				+ '>' + LNG.ui_res_counter+'</label>\
				<br/>\
				<label><input name=GFX.rRefIcn type=checkbox '
				+ (GFX.rRefIcn ? 'checked=checked' : '')
				+ ' onclick="var o = $id(\'gfx-PV_links\'); if(this.checked){o.innerHTML=\'<span class=ch></span><span class=sm></span>\';o.setAttribute(\'style\',\'float:right;display:block;\');}else{o.innerHTML=\'<span class=inline>Cache</span> - <span class=inline>Similar Pages</span>\';o.setAttribute(\'style\',\'margin-top:0px;float:left;\');}"'
				+ '>' + LNG.ui_res_ref_icon + '</label>\
				<br/>\
				<label>' + LNG.ui_res_targetLnks + ': \
				<select name=GFX.rTrgLnk>\
				<option value=_blank' + (GFX.rTrgLnk == '_blank' ? ' selected' : '')
				+ '>' + LNG.new_tab + '</option>\
				<option value=_self'  + (GFX.rTrgLnk == '_self' ? ' selected' : '')
				+ '>' + LNG.self_tab + '</option>\
				</select>\
				</label>\
				<br/>\
				<label><input name=GFX.rSiteFlt type=checkbox '
				+ (GFX.rSiteFlt ? 'checked=checked' : '')
				+ ' onclick="var o=$id(\'gfx-PV_url\');o.innerHTML=(this.checked?\'<span class=sf></span>\':\'\')+\'www.domain.url - 99k\';"'
				+ '>' + LNG.ui_res_sitefilter + '</label>\
				<br/>\
				<label>' + LNG.ui_res_cols + ': \
					<select name=GFX.rCols>\
					<option value=1' + (GFX.rCols == 1 ? ' selected' : '') + '>1&nbsp;</option>\
					<option value=2' + (GFX.rCols == 2 ? ' selected' : '') + '>2&nbsp;</option>\
					<option value=3' + (GFX.rCols == 3 ? ' selected' : '') + '>3&nbsp;</option>\
					<option value=4' + (GFX.rCols == 4 ? ' selected' : '') + '>4&nbsp;</option>\
					<option value=5' + (GFX.rCols == 5 ? ' selected' : '') + '>5&nbsp;</option>\
					<option value=6' + (GFX.rCols == 6 ? ' selected' : '') + '>6&nbsp;</option>\
					</select>\
				</label>\
			</fieldset>\
			<fieldset id=gfx-tab-3>\
				<legend>' + LNG.images + '</legend>\
				<label><input name=GFX.iOldStyle type=checkbox '
				+ (GFX.iOldStyle ? 'checked=checked' : '')
				+ '>' + LNG.ui_img_oldstyle + '</label>\
				<br/>\
				<label><input name=GFX.iAutoPag type=checkbox '
				+ (GFX.iAutoPag ? 'checked=checked' : '')
				+ '>' + LNG.ui_img_autopaged + '</label>\
				<br/>\
				<label><input name=GFX.iCounter type=checkbox '
				+ (GFX.iCounter ? 'checked=checked' : '')
				+ '>' + LNG.ui_res_counter + '</label>\
				<br/>\
				<label><input name=GFX.iPrev type=checkbox '
				+ (GFX.iPrev ? 'checked=checked' : '')
				+ ' onclick="this.parentNode.nextSibling.className=(this.checked?\'sub\':\'sub disabled\');"'
				+ '>' + LNG.ui_img_preview + '</label>\
				<label class=sub><input name=GFX.iPrevNoIcn type=checkbox '
				+ (GFX.iPrevNoIcn ? 'checked=checked' : '')
				+ '>' + LNG.ui_img_prev_onThumb + '</label>\
				<label class=sub>' + LNG.ui_img_prev_rt + ': '
				+ '<input name=GFX.iPrevRT type=text size=8 onblur="closeList();" value='
				+ GFX.iPrevRT + '><span onclick="addList(this,\'0,100,200,300,400,500,600,700,800,900,1000\');" class=virtual-list-icon>&#9660;</span></label>\
			</fieldset>\
			<fieldset id=gfx-tab-4>\
				<legend>' + LNG.styles + '</legend>\
				<div class=overflow-y>\
				<label><input name=GFX.bStyles type=checkbox '
				+ (GFX.bStyles ? 'checked=checked' : '')
				+ '>' + LNG.enabled + ' ' + LNG.styles + '</label>\
				<label><input name=GFX.mzBrd type=checkbox '
				+ (GFX.mzBrd ? 'checked=checked' : '')
				+ ' onclick="var n='+(isOpera?'\'borderRadius\'':'\'mozBorderRadius\'')+';var v=(this.checked?7:0);$id(\'gfx-PV_inputbox\').style[n]=v;$id(\'gfx-PV_buttons\').style[n]=v;$id(\'gfx-PV_resbox\').style[n]=v;$id(\'gfx-PV_sidebar\').style[n]=v;$id(\'gfx-PV_ads\').style[n]=v;$id(\'gfx-PV_infobar\').style[n]=v;"'
				+ '>' + LNG.ui_css_mozBrd + '</label>\
				<hr width=90% align=center>\
				Color Theme: <select name=GFX.gTheme id=gfx-css-theme style="min-width:100px;">';
				for(var name in THEMES){
					html += '<option value='+ name + (name==GFX.gTheme?' selected=selected':'') + '>' + name + '</option>';
				}
				html += '\
				</select>\
				<button type=button onclick="var o=$id(\'gfx-css-theme-area\').style; if(o.display==\'none\'){o.display=\'block\';this.innerHTML=\' &#9650;  \';}else{o.display=\'none\';this.innerHTML=\''+LNG.more+'&#9660;\';}">' + LNG.more +'&#9660;</button>\
				<div id=gfx-css-theme-area style="display:none;text-align:right;">\
				<textarea id="gfx-css-theme-str" style="width:100%;height:100px;"></textarea>\
				<button id=gfx-css-theme-save type=button>Set My Theme</button>\
				</div>\
				<hr width=90% align=center>\
				<input id=gfx-css-PV-selected type=hidden>\
				<input id=CSS.body.value type=hidden>\
				<input id=CSS.menus.value  type=hidden>\
				<input id=CSS.inputbox.value  type=hidden>\
				<input id=CSS.buttons.value type=hidden>\
				<input id=CSS.header.value  type=hidden>\
				<input id=CSS.infobar.value  type=hidden>\
				<input id=CSS.resbox.value  type=hidden>\
				<input id=CSS.thumbs.value  type=hidden>\
				<input id=CSS.counter.value  type=hidden>\
				<input id=CSS.titles.value  type=hidden>\
				<input id=CSS.desc.value  type=hidden>\
				<input id=CSS.highlights.value   type=hidden>\
				<input id=CSS.url.value  type=hidden>\
				<input id=CSS.links.value  type=hidden>\
				<input id=CSS.notes.value   type=hidden>\
				Element: <select id=gfx-css-list>\
				  <option id=CSS.body>'		+ 'Body'		+'</option>\
				  <option id=CSS.menus>'	+ 'Menus'		+'</option>\
				  <option id=CSS.inputbox>'	+ 'InputBox'	+'</option>\
				  <option id=CSS.buttons>'	+ LNG.buttons	+'</option>\
				  <option id=CSS.header>'	+ 'Header'		+'</option>\
				  <option id=CSS.infobar>'	+ 'Info Bar'	+'</option>\
				  <option id=CSS.resbox>'	+ LNG.cnt_box	+'</option>\
				  <option id=CSS.thumbs>'	+ 'Thumbs'		+'</option>\
				  <option id=CSS.counter>'	+ LNG.counter	+'</option>\
				  <option id=CSS.titles>'	+ LNG.title		+'</option>\
				  <option id=CSS.desc>'		+ LNG.desc		+'</option>\
				  <option id=CSS.highlights>'+ LNG.highlights +'</option>\
				  <option id=CSS.url>'		+ LNG.str_url	+'</option>\
				  <option id=CSS.links>'	+ LNG.ref_links	+'</option>\
				  <option id=CSS.notes>'	+ 'Notes'		+'</option>\
				</select>\
				<button id=gfx-css-reset type=button>'+ LNG.defaults +'</button>\
				<div style="display:block;margin-top:10px;">\
					Font-Name:\
					<input id=CSS_font-family type=text size=22 onblur="closeList()"><span onclick="addList(this, [\'Arial, Helvetica, sans-serif\' , \'Arial Black, Gadget, sans-serif\' , \'Bookman Old Style, serif\' , \'Comic Sans MS, cursive\' , \'Courier, monospace\' , \'Courier New, Courier, monospace\' , \'Garamond, serif\' , \'Georgia, serif\' , \'Impact, Charcoal, sans-serif\' , \'Lucida Console, Monaco, monospace\' , \'Lucida Sans Unicode, Lucida Grande, sans-serif\' , \'MS Sans Serif, Geneva, sans-serif\' , \'MS Serif, New York, sans-serif\' , \'Palatino Linotype, Book Antiqua, Palatino, serif\' , \'Tahoma, Geneva, sans-serif\' , \'Times New Roman, Times, serif\' , \'Trebuchet MS, Helvetica, sans-serif\' , \'Verdana, Geneva, sans-serif\'], \'fontFamily\');" class=virtual-list-icon>&#9660;</span>\
					Size:\
					<input id=CSS_font-size type=text size=5 pattern="[0-9\.]{1,2}(px|pt)" onblur="closeList()"><span  onclick="addList(this,\'6pt,7pt,8pt,9pt,10pt,11pt,12pt,13pt,14pt,15pt,16pt,17pt,18pt,19pt,20pt,21pt,22pt,23pt,24pt,25pt,26pt,27pt,28pt\',\'fontSize\');" class=virtual-list-icon>&#9660;</span>\
				</div>\
				<div style="position:relative;clear:right;display:inline-block;margin:10px 40px 10px 20px;border:1px solid gray;padding:5px;">\
					<table>\
					<tr><td>\
						<input id=CSS_font-weight type=hidden>\
						<input id=CSS_font-style type=hidden>\
						<label><input id=gfx-css-fop1 name=fnt_w type=radio onclick="$id(\'CSS_font-weight\').value=\'normal\';"> Normal</label>\
						<label style="font-weight:bold;"><input id=gfx-css-fop2 name=fnt_w type=radio onclick="$id(\'CSS_font-weight\').value=\'bold\';"> Bold</label>\
						<label><input id=gfx-css-fop3 type=checkbox onclick="$id(\'CSS_font-style\').value=(this.checked?\'italic\':\'normal\');"><i> Italic</i></label>\
					</td></tr>\
					</table>\
				</div>\
				<div style="position:relative;clear:left;display:inline-block;margin:10px 0px;border:1px solid gray;padding:5px;">\
					<table>\
					<tr>\
					<td>\
						<b>F</b>ont-Color:\
					</td><td>\
						<input id=CSS_color type=text size=8 maxlength=7 pattern="^#[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}$"><span id=gfx-font-cp class=virtual-list-icon>&#9660;</span>\
					</td>\
					</tr><tr>\
					<td>\
						<b>B</b>ackground:\
					</td><td>\
						<input id=CSS_background-color type=text size=8 maxlength=7 pattern="^#[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}$"><span id=gfx-bg-cp class=virtual-list-icon>&#9660;</span>\
					</td>\
					</tr><tr>\
					<td>\
						Border:<br/>\
					</td><td>\
						<input id=CSS_border-color type=text size=8 maxlength=7 pattern="^#[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}[A-F0-9a-f]{1,2}$" onblur="var bw=$id(\'CSS_border-width\');var bs=$id(\'CSS_border-style\');if(this.value.length){if(!bw.value||bw.value.lenght==0){bw.value=\'1px\';};if(!bs.value||bs.value.lenght==0){bs.value=\'solid\';}}else{bw.value=bs.value=\'\';}"><span id=gfx-border-cp class=virtual-list-icon>&#9660;</span>\
					</td>\
					</tr>\
					</table>\
				</div>\
				<br/>\
				<button type=button onclick="var o=$id(\'gfx-css-adv\').style; if(o.display==\'none\'){o.display=\'block\';this.innerHTML=\' &#9650;  \';}else{o.display=\'none\';this.innerHTML=\''+LNG.more+'&#9660;\';}">' + LNG.more +'&#9660;</button>\
				<table id=gfx-css-adv class=gfx-css-styles style="display:none;">\
				<tr>\
				<td>\
					Text-Decoration:\
				</td><td>\
					<input id=CSS_text-decoration type=text size=8 pattern="\s*(none|underline|overline|line-through|blink)\s*" onblur="closeList()"><span  onclick="addList(this,\'none,underline,overline,line-through,blink\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					White-Space:\
				</td><td>\
					<input id=CSS_white-space type=text size=8 pattern="\s*(normal|pre|nowrap)\s*" onblur="closeList()"><span  onclick="addList(this,\'normal,pre,nowrap\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				<td>\
					Border-Width:\
				</td><td>\
					<input id=CSS_border-width type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span onclick="addList(this,\'1px,2px,3px,4px,5px,6px,7px,8px,9px,10px\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Border-Style:\
				</td><td>\
					<input id=CSS_border-style type=text size=8 pattern="\s*(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)\s*" onblur="closeList()"><span  onclick="addList(this,\'none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				<td>\
					Margin-Top:\
				</td><td>\
					<input id=CSS_margin-top type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Padding-Top:\
				</td><td>\
					<input id=CSS_padding-top type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				<td>\
					Margin-Left:\
				</td><td>\
					<input id=CSS_margin-left type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Padding-Left:\
				</td><td>\
					<input id=CSS_padding-left type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				<td>\
					Margin-Right:\
				</td><td>\
					<input id=CSS_margin-right type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Padding-Right:\
				</td><td>\
					<input id=CSS_padding-right type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				<td>\
					Margin-Bottom:\
				</td><td>\
					<input id=CSS_margin-bottom type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Padding-Bottom:\
				</td><td>\
					<input id=CSS_padding-bottom type=text size=8 pattern="[0-9\.]{1,2}p[t|x]" onblur="closeList()"><span  onclick="addList(this,\'0px,1px,2px,3px,4px,5px,6px,7px,8px,9px,10px,11px,12px,13px,14px,15px,16px,17px,18px,19px,20px,21px,22px,23px,24px,25px,26px,27px,28px,29px,30px,31px,32px,33px,34px,35px,36px,37px,38px,39px,40px,41px,42px,43px,44px,45px,46px,47px,48px,49px,50px\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr><tr>\
				</tr><tr>\
				<td>\
					Float:\
				</td><td>\
					<input id=CSS_float type=text size=8 pattern="\s*(none|left|right)\s*" onblur="closeList()"><span  onclick="addList(this,\'none,left,right\');" class=virtual-list-icon>&#9660;</span>\
				</td><td>\
					Clear:\
				</td><td>\
					<input id=CSS_clear type=text size=8 pattern="\s*(none|left|right|both)\s*" onblur="closeList()"><span  onclick="addList(this,\'none,left,right,both\');" class=virtual-list-icon>&#9660;</span>\
				</td>\
				</tr>\
				</table>\
				</div>\
			</fieldset>\
			<fieldset id=gfx-tab-5 style="margin-left: 160px;width:450px;">\
				<legend>' + LNG.about + '</legend>\
				<div class=about>\
				<span>\
				<img src="'+Google_Logo+'" width=138 height=48 style="width:138px;height:48px;"/>\
				<a class=gfx href="http://userscripts.org/scripts/show/'+ SCRIPT_NUM +'" target=_blank><span style="font-weight:bold;">v'+ SCRIPT_VER +'</span></a>\
				<br><a href="http://userscripts.org/scripts/show/'+ SCRIPT_NUM +'" target=_blank>http://userscripts.org/scripts/show/'+ SCRIPT_NUM +'</a>\
				</span>\
				<br>\
				<br>\
				<h3>Script Author</h3>\
				<h2>Pablo H. Custo</h2>\
				<br>\
				<h3>Translations</h3>\
				<table><tr>\
				<td>Chinese by</td>\
				<td>Baker Zhao<br>Deep Blue<td>\
				</tr><tr>\
				<td>Dutch by</td>\
				<td>Jerone<td>\
				</tr><tr>\
				<td>German by</td>\
				<td>Watermelonman<br>Umoenks<td>\
				</tr><tr>\
				<td>Italian by</td>\
				<td>RNiK<td>\
				</tr><tr>\
				<td>Japanese by</td>\
				<td>Tejas<td>\
				</tr><tr>\
				<td>Korean by</td>\
				<td>Jucke<td>\
				</tr><tr>\
				<td>Polish by</td>\
				<td>Mr.Cat<td>\
				</tr><tr>\
				<td>Russian by</td>\
				<td>AHTOH<td>\
				</tr><tr>\
				<td>Turkish by</td>\
				<td>Sabbath<td>\
				</tr></table>\
				<br>\
				<h3>Script Resources</h3>\
				<h2><a href="http://mootools.net/" target="_blank">MooTools framework v1.2.1 by mootools.net</a></h2>\
				<h2><a href="http://www.coders.me/web-js-html/javascript/sexy-alert-box" target="_blank">Sexy Alert Box v1.2 by Eduardo D. Sada</a></h2>\
				<h2><a href="http://moorainbow.woolly-sheep.net" target="_blank">MooRainbow v1.2b2 by Djamil Legato</a></h2>\
				<br>\
				<h3>Thanks</h3>\
				<h2>Google Inc.<h2>\
				<h2><a href="http://userscripts.org/" target="_blank">UserScripts.org</a><h2>\
				<h2><a href="http://googlepreview.com/" target="_blank">GooglePreview.com</a><h2>\
				<h2><a href="http://twitter.com/" target="_blank">Twitter.com</a><h2>\
				<h2>Script\'s Users<h2>\
				<br>\
				<br>\
				Google FX is not endorsed or affiliated with Google Inc.\
				<br>\
				GOOGLE TM is a trademark of Google Inc.\
				</div>\
			</fieldset>\
		</div>\
		<div id=gfx-preview>\
			<fieldset>\
			<legend>' + LNG.preview + '</legend>\
			<div id=gfx-PV_headers style="position:'+ (GFX.bMnuFix ? 'fixed' : 'relative') +';">\
				<div id=gfx-PV_menus class=menus onmouseover=PvOver(event,this) onclick=PvClick()>\
				  <ul>\
					<li class="header search" style="margin-top:-4px;padding:2px 5px 2px 20px;border-bottom:0px;">'+ LNG.webhp +'</li>\
					<li class=images>'+ LNG.images +'</li>\
					<li class=intl>'+ LNG.more +' &raquo;</li>\
					<li style="float:right;margin-right:3px;">Username<span id=gfx-PV_username style="display:'+(GFX.bShtName?'none':'inline-block')+';">@gmail.com</span></li>\
				  </ul>\
				</div>\
				<div id=gfx-PV_header class=header onmouseover=PvOver(event,this) onclick=PvClick()>\
					<table>\
					 <tr><td>\
						<img src="'+Google_Logo+'" width=138 height=48 />\
						<div id=gfx-PV_fxlogo class=gfx></div>\
					 </td><td align=top>\
						<span id=gfx-PV_inputbox class=inputbox onmouseover=PvOver(event,this) onclick=PvClick()>'+(GFX.gSuggest?'Suggest Me':'')+'</span> \
						<span id=gfx-PV_buttons class=buttons onmouseover=PvOver(event,this) onclick=PvClick()>'+ LNG.search +'</span>\
					 </td></tr>\
					</table>\
					<div id=gfx-PV_searchers>\
						<img src="http://web.ask.com/favicon.ico" width=16 height=16> Ask \
						<img src="http://us2.ixquick.com/favicon.ico" width=16 height=16> IxQuick \
						<img src="http://en.wikipedia.org/favicon.ico" width=16 height=16> Wikipedia \
					</div>\
				</div>\
				<div id=gfx-PV_infobar class=infobar onmouseover=PvOver(event,this) onclick=PvClick()>Results <b>1-10</b> of about <b>1,000</b></div>\
			</div>\
			<div id=gfx-PV_body class=body onmouseover=PvOver(event,this) onclick=PvClick()>\
				<div id=gfx-PV_ads><span style="color:blue;">Buy Me, Buy Me, Buy Me...</span><span style="color:#550;"> by Google Ads</span></div>\
				<span style="color:'+(DB.css.highlights.borderColor||'red')+';">\
				Did you mean:\
				</span>\
				Some <b>Text</b>\
				<br>\
				<div id=gfx-PV_resbox class=resbox onmouseover=PvOver(event,this) onclick=PvClick()>\
					<div id=gfx-PV_thumbs class=thumbs onmouseover=PvOver(event,this) onclick=PvClick()>\
						<img src="http://e.googlepreview.com/preview?s=http://images.google.com/">\
					</div>\
					<span id=gfx-PV_counter class=counter onmouseover=PvOver(event,this) onclick=PvClick()>\
						01\
					</span>\
					<span id=gfx-PV_titles class=titles onmouseover=PvOver(event,this) onclick=PvClick()>\
						Title of \
						<span id=gfx-PV_highlights class=highlights onmouseover=PvOver(event,this) onclick=PvClick()>\
							results\
						</span>\
					</span>\
					<br>\
					<span id=gfx-PV_notes class=notes onmouseover=PvOver(event,this) onclick=PvClick()>\
						Last post: 1 day ago\
					</span>\
					<span id=gfx-PV_desc class=desc onmouseover=PvOver(event,this) onclick=PvClick()>\
						Description of result with<br>\
						<span id=gfx-PV_highlights class=highlights onmouseover=PvOver(event,this) onclick=PvClick()>\
							highlighted \
						</span>\
						word<b>...</b>\
					</span>\
					<br>\
					<span id=gfx-PV_url class=url onmouseover=PvOver(event,this) onclick=PvClick()>\
						'+ (GFX.rSiteFlt ? '<span class=sf></span>' : '') +'www.domain.url - 99k\
					</span>\
					<br>\
					<span id=gfx-PV_links class="links" onmouseover=PvOver(event,this) onclick=PvClick()>'
					  + (GFX.rRefIcn 
					  ? '<span class=ch style="display:block;"></span><span class=sm style="display:block;"></span>'
					  : '<span style="display:inline-block;">Cache</span> - <span style="display:inline-block;">Similar Pages</span>') + '\
					</span>\
				</div>\
				<div id=gfx-PV_sidebar><span class=title></span></div>\
				<br>\
				<table id=gfx-PV_navbar align=center><tr><td colspan=3 class=img></tr><tr><td align=right>Prev</td><td> 1 2 3 4 5 6 </td><td>Next</td></tr></table>\
			</div>\
		  </fieldset>\
		  </div>\
		  <div class=btns>\
			<button id=gfx-gui-save type=button>' + LNG.save + '</button>\
			<button id=gfx-gui-close type=button>' + LNG.close + '</button>\
		  </div>\
		  <span style="position:absolute;float:left;margin-top:-16px;margin-left:10px;color:#777;font-size:9pt;">\
			Google FX is not affiliated with Google Inc.\
		  </span>\
		';
		
		var gui = new Element('div', {
			'id'	: 'gfx-gui',
			'html'	: html
		});
		gui.inject(body)

		
		return gui;
	};

	var makeSettings = function(event)
	{
		var gui = addGUI();
		
		var dragGUI = gui.makeDraggable({
			handle: $id('gfx-gui-dragger')
		});
		

		var cssList = $id('gfx-css-list');
		var cssPreview = $id('gfx-preview');
		var cssStyleList = doc.evaluate('//input[starts-with(@id,"CSS_")]', doc.body, null, 7, null);
		var cssTheme = $id('gfx-css-theme');
		var cssThemeStr = $id('gfx-css-theme-str');
		var cssThemeSave = $id('gfx-css-theme-save');
		
		var cssCurrElement = $id('gfx-css-PV-selected');

		var MoorCP_Fnt = $empty;
		var MoorCP_Bg = $empty;
		var MoorCP_Brd = $empty;
		var cssFntColor = $id('CSS_color');
		var cssBgColor = $id('CSS_background-color');
		var cssBrdColor = $id('CSS_border-color');
		
		var setCssTheme = function()
		{

			//if(cssTheme.selectedIndex==0) return;
			var name = cssTheme.options[cssTheme.selectedIndex].value;
			
			try{
				cssThemeStr.value = THEMES[name].styles;
			}catch(e){}
			
			setColorTheme(name);
			
			for(var i=0,len=cssList.options.length; i < len; i++){
				var name = cssList.options[i].id;
				var opVal = $id(name + '.value');
				name = name.replace(/CSS\./, '');
				var styles = CSS[name];
				var curPrev = cssPreview.getElement('*[class='+ name +']');
				curPrev.setAttribute('style', styles);
				opVal.value = styles;
			}
		}
		cssTheme.addEvent('change', setCssTheme);
		
		var saveCssTheme = function()
		{
			THEMES.MyThemeColor.styles = cssThemeStr.value;
			cssTheme.selectedIndex = 0;
			GFX.gTheme = 'MyTheme';
			setCssTheme();
		}
		cssThemeSave.addEvent('click', saveCssTheme);

		
		var lastPrev;
		var cIdx;
		
		var setStyleList = function(event)
		{
			if(event && event.stopPropagation){ event.stopPropagation(); }
			
			cIdx = cssList.selectedIndex;
		
			// Clean Values
			for(var i=0,len=cssStyleList.snapshotLength; i < len; i++){
				var el = cssStyleList.snapshotItem(i);
				el.value='';
			}
				
			// Define CSS variable name
			var name = cssList.options[cIdx].id;
			var opVal = $id(name + '.value');
			name = name.replace(/CSS\./, '');

			if(!opVal.value || opVal.value==''){
				var styles = CSS[name];
				opVal.value = styles;
			} else {
				var styles = opVal.value;
			}

			var curPrev = cssPreview.getElement('*[class='+ name +']');
			curPrev.setAttribute('style', styles);
			if(lastPrev){ lastPrev.style.outline=''; }
			lastPrev = curPrev;
			curPrev.style.outline = '1px solid #c00';
			styles = styles.split(/\s*;\s*/);
			
			
			cssFntColor.nextSibling.style.backgroundColor = '';
			cssBgColor.nextSibling.style.backgroundColor = '';
			cssBrdColor.nextSibling.style.backgroundColor = '';
			
			for(var i=0,len=styles.length; i < len; i++){
				var v = styles[i].split(/\s*:\s*/);
				if(!v[0]) continue;
				var el = $id( 'CSS_' + v[0] );
				if(el){
					el.value = v[1];
					if(v[0].test(/color/i)){
						el.nextSibling.style.backgroundColor = v[1];
					}
				}
			}
			
			$id('gfx-css-PV-selected').value = cssList.options[cIdx].id.replace(/CSS/, 'gfx-PV').replace(/\./g, '_');
			
			if(MoorCP_Fnt && MoorCP_Fnt.manualSet && cssFntColor.value){
				MoorCP_Fnt.manualSet( (new Color(cssFntColor.value)).rgb );
			}
			if(MoorCP_Bg && MoorCP_Bg.manualSet && cssBgColor.value){
				MoorCP_Bg.manualSet( (new Color(cssBgColor.value)).rgb );
			}
			if(MoorCP_Brd && MoorCP_Brd.manualSet && cssBrdColor.value){
				MoorCP_Brd.manualSet( (new Color(cssBrdColor.value)).rgb );
			}
		};

		setStyleList();

		cssList.addEvent('change', setStyleList);
		cssPreview.addEvent('click', setStyleList);

		var resetValues = function(ev)
		{
			cIdx = cssList.selectedIndex;
			var name = cssList.options[cIdx].id;
			var opVal = $id(name + '.value');
			var label = cssList.options[cIdx].innerHTML;
			AlertBox.confirm(LNG.ui_css_defaults+': <b>' + label + '</b>?', {
				onComplete:
					function(isOk) {
						if (isOk) {
							GM_setValue(name, '');
							name = name.split('.');
							CSS[name[1]] = '';
							opVal.value = '';
							setStyleList(cIdx);
						}
					},
				textBoxBtnCancel: LNG.cancel
			});
		};

		$id('gfx-css-reset').addEvent('click', resetValues);

		var setPreview = function(ev)
		{
			if(ev.stopPropagation){ ev.stopPropagation(); }
			var target = $id(ev.target||ev);
			var pattern = target.get('pattern');
			if(target.value != '' && pattern){
				if(!new RegExp(pattern.replace(/\\/g,'\\')).test(target.value)){
					return false;
				}
			}
			var styles = '';
			
			for(var i=0,len=cssStyleList.snapshotLength; i < len; i++){
				var el = cssStyleList.snapshotItem(i);
				if(!/[a-z0-9A-Z\.\-]/.test(el.value)){ continue; }
				styles += el.id.replace(/^CSS_/,'') + ':' + el.value.toLowerCase() + ';';
			}
			
			var opVal = $id(cssList.options[cIdx].id + '.value');
			opVal.value = styles;
			var name = cssList.options[cIdx].id.replace(/CSS/, 'gfx-PV').replace(/\./g, '_');
			$id(name).set('style', styles.replace(/[a-z0-9\.\-]+:null;/g, ''));
			
			cssTheme.selectedIndex = 0;
			GFX.gTheme = 'MyThemeColor';
		};
		
		for(var i=0,len=cssStyleList.snapshotLength; i < len; i++){
			var el = $id(cssStyleList.snapshotItem(i));
			el.addEvent('blur',setPreview);
			el.addEvent('keyup',setPreview);
		}

		$id('gfx-css-fop1').addEvent('click', setPreview);
		$id('gfx-css-fop2').addEvent('click', setPreview);
		$id('gfx-css-fop3').addEvent('click', setPreview);
		
		MoorCP_Fnt = new MooRainbow('gfx-font-cp', {
			id: 'moor-gui-font',
			onChange: function(c){ $id(cssCurrElement.value).setStyle('color', c.hex); },
			onComplete: function(c,self){
				var el=$id('CSS_color');
				el.value = c.hex;
				self.element.setStyle('backgroundColor', c.hex);
				setPreview('CSS_color');
			}
		});
		
		
		MoorCP_Bg = new MooRainbow('gfx-bg-cp', {
			id: 'moor-gui-bg',
			onChange: function(c){ $id(cssCurrElement.value).setStyle('backgroundColor', c.hex); },
			onComplete: function(c,self){
				var el=$id('CSS_background-color');
				el.value = c.hex;
				self.element.setStyle('backgroundColor', c.hex);
				setPreview('CSS_background-color');
			}
		});
		
		MoorCP_Brd = new MooRainbow('gfx-border-cp', {
			id: 'moor-gui-border',
			onChange: function(c){ $id(cssCurrElement.value).setStyle('borderColor', c.hex); },
			onComplete: function(c,self){
				var el=$id('CSS_border-color');
				el.value = c.hex;
				self.element.setStyle('backgroundColor', c.hex);
				setPreview('CSS_border-color');
			}
		});
		
		
		var saveSettings = function(event)
		{
		
			if(event) {
				event.preventDefault();
				event.stopPropagation();
			}
			var nodes;
			
			nodes = doc.evaluate('//div[@id="gfx-gui"]//INPUT[starts-with(@name,"GFX.")]', doc.body, null, 7, null);
			for(var i=0,len=nodes.snapshotLength; i < len; i++){
				var el = nodes.snapshotItem(i);
				var value = (el.type=='checkbox' ? el.checked : el.value);
				GM_setValue(el.name, value);
			}

			nodes= doc.evaluate('//div[@id="gfx-gui"]//SELECT[starts-with(@name,"GFX.")]', doc.body, null, 7, null);
			for(var i=0,len=nodes.snapshotLength; i < len; i++){
				var el = nodes.snapshotItem(i);
				var idx = el.selectedIndex;
				GM_setValue(el.name, el.options[idx].value);
			}

			if(cssTheme.selectedIndex == 0) {
				for(var i=0,len=cssList.options.length; i < len; i++){
					var name = cssList.options[i].id;
					var opVal = $id(name + '.value');
					if(opVal.value || opVal.value != ''){
						//GM_setValue(name.replace(/\./g,'_'), opVal.value);
						GM_setValue(name, opVal.value);
						name = name.split('.');
						CSS[name[1]] = opVal.value;
					}
				}
			}


			window.setTimeout(function(){doc.location.reload();}, 50);

			MoorCP_Fnt.closeAll();
			
			return false;
		};

		var hideSettings = function()
		{
			BgBox.hide();
			gui.hide();
			var vlist = $id('virtual-option-list');
			if(vlist){ vlist.parentNode.removeChild(vlist); }
			MoorCP_Fnt.closeAll();
			return false;
		};
	
		$id('gfx-gui-close').addEvent('click', hideSettings);
		$id('gfx-gui-save').addEvent('click', saveSettings);
	

		BgBox.show();
		gui.show();
		gui.style.left = Math.round((body.clientWidth-780)/2) + 'px';
		gui.style.top = '40px';
	};
	

	showSettings = function(ev)
	{
		var gui = $id('gfx-gui');
		if (!gui){
			makeSettings();
		} else {
			BgBox.show();
			gui.show();
		}
		if(ev) {
			ev.preventDefault();
			ev.stopPropagation();
		}
		return false;
	};
	
	var checkUpdate = function(ev)
	{
		if(DB.info && DB.info.newVer) {
			var info = '\
				<div>\
					<img src="http://www.google.com/images/google_sm.gif" width=143 height=59 style="border:0;margin:0;" />\
					<div id=gfx-logo style="position:absolute;margin-left:140px;margin-top:-60px;padding-left:40px;font-size:18pt;">\
						v'+ DB.info.v +'\
					</div>\
				</div>\
				<br>\
				<div style="font-size:14pt;"><a href="http://userscripts.org/scripts/source/31950.user.js" style="color:blue !important;">' + LNG.install + ' GoogleFx v' + DB.info.v + '</a> ?</div>\
			 ';
			AlertBox.confirm(info, {
				onComplete:
					function(isOk) {
						if (isOk) {
							doc.location.href = 'http://userscripts.org/scripts/source/31950.user.js';
						}
					},
				textBoxBtnOk: LNG.yes,
				textBoxBtnCancel: LNG.no
			});
		}
	};

	if(GFX.gNewVer) win.setTimeout(checkUpdate,1500);
	
	if(!isOpera) GM_registerMenuCommand('Google Fx '+LNG.ui_title, showSettings, null, null, "");
	
	
}




	  
var GFX_Start = function()
{

	var docSize = doc.getScrollSize();
	//======================================
	//   P R I V A T E    F U N C T I O N S
	//======================================

	var getQueryFromUrl = function()
	{
		if(!hasSomeQuery){return '';}
		var q = '';

		if(URI.query.q){
			q += URI.query.q.replace(/\+/g, ' ');
		} else {
			// with all
			q += (URI.query.as_q) ? URI.query.as_q.replace(/\+/g, ' ') : '';
			// with some
			q += (URI.query.as_oq) ? ' ' + URI.query.as_oq.replace(/\+/g, ' OR ') : '';
			// with exact
			q += (URI.query.as_epq) ? ' "' + URI.query.as_epq.replace(/\+/g, ' ') + '"' : '';
			// with not
			q += (URI.query.as_eq) ? ' -' + URI.query.as_eq.replace(/\+/g, ' -') : '';
		}
		return q;
	};
	var queryString = encodeURL(($nd('//input[@name="q"]') || '').value);

	// Search in all Searchers
	//*************************
	var inAllSearchers = function()
	{
		var q = encodeURL(($nd('//input[@name="q"]') || '').value);
		
		var type = $id('gfx-searchers').firstChild.value;
		var sites = SEARCHER[type];
		var local = sites[LANG] ? sites[LANG] : sites.en;

		sites = sites._commons;

		for (var n in local)
		{
			if (sites[n])
			{
				if (local[n][0]){ sites[n][0] = local[n][0]; }
				if (local[n][1]){ sites[n][1] = local[n][1]; }
			} else {
				sites[n] = local[n];
			}
		}
		
		for (var name in sites)
		{
			var item = sites[name];
			var href = 'http://';
			href += item[0];
			if(typeof item[1] == 'object')
			{
				href += (item[1])[0];
				href += q;
				href += (item[1])[1];
			} else {
				href += item[1];
				href += q;
			}
			window.open( href, '_blank');
		}
	};

	var getSearchers = function (type)
	{
		if (!SEARCHER[type]){ type = 'search'; }
		var sites = SEARCHER[type];
		var local = sites[LANG] ? sites[LANG] : sites.en;

		// change & add items to common list
		sites = sites._commons;
		for (var n in local)
		{
			if(sites[n])
			{
				if (local[n][0]){ sites[n][0] = local[n][0]; }
				if (local[n][1]){ sites[n][1] = local[n][1]; }
			} else {
				sites[n] = local[n];
			}
		}

		var s = '';

		// Set the sites
		for (var name in sites)
		{
			var item = sites[name];
			s += '<a href="#" onmousedown="searchWith(\'http://';
			s += item[0] || GM_log('Missing domain in: '+name);
			if(typeof item[1] == 'object')
			{
				s += (item[1])[0] || GM_log('Missing query in: '+name);
				s += '\',\'';
				s += (item[1])[1] || GM_log('Missing query in: '+name);
			} else {
				s += item[1] || GM_log('Missing query in: '+name);
				s += '\',\'';
			}
			s += '\',event)" title="' + name + '"';
			s += ' target="'+GFX.rTrgLnk+'">';

			if(GFX.bSrchsIcn)
			{
				s += '<img src="';
				if(item[2])
				{
					if( item[2].substr(0,1) == '/' )
					{
						s += 'http://';
						s += item[0];
						s += item[2] || GM_log('Wrong FavIcon set: '+name);
						if( item[2].substr(-3) != 'ico' ){ s += '/favicon.ico'; }
					}else{
						s += item[2] || GM_log('Wrong FavIcon set: '+name);
					}
				} else {
					s += 'http://';
					s += item[0];
					s += '/favicon.ico';
				}
				s += '" width="16px" height="16px" />';
			}
			s += name;
			s += '</a>';
		}
		return s;
	};

	// Add Searchers ToolBar & Menu
	//******************************
	var addSearchers = function (target, type)
	{
		if(!GFX.bSrchs) {return;}
		if(!target) {
			GM_log('Target object not found in: '+type);
			return;
		}
		var query = queryString;

		// Top Menu
		var itemBar = new Element('a', {
			'class'	: 'gb3 search',
			'href'	: '#',
			'html'	: LNG.searchers + ' <span style="font-size:7pt;">&#9660;</span>'
		});
		itemBar.set('onclick'	 , 'gfxPdef(event);');
		
		var menuHolder = new Element('div', {
			'id'	: 'gfx-searchers-mnu',
			'class'	: 'gbm'
		});
		
		for(var name in SEARCHER){
			var a = new Element('a', {
				'class'	: name,
				'href'	: '#',
				'html'	: LNG[name],
				'events':{
					'click'	: function(event){
						if(event) {
							event.preventDefault();
							event.stopPropagation();
						}
						var self = event.target;
						var sb = $id('gfx-searchers');
						sb.lastChild.innerHTML = getSearchers(self.className);
						sb.firstChild.nextSibling.innerHTML = self.title + ':';
						sb.firstChild.nextSibling.className = self.className;
						sb.firstChild.value = self.className;
					}
			}});
			menuHolder.appendChild(a);
		};

		//  ToolBar
		var toolBar = new Element('div', {'id' : 'gfx-searchers'});

		var comboBox = new Element('input', {
			'id'	: 'gfx-searchers-cbox',
			'title'	: LNG.search_in + ' ' + LNG.all,
			'type'	: 'checkbox',
			'value'	: type,
			'events': {
				'click' : function(ev){
					var frm =$nd('//FORM');
					var btn =$id('gfx-searchers-button');
					if(ev.target.checked)
					{
						frm.addEvent('submit', inAllSearchers);
						btn.style.display='inline-block';
					} else{
						frm.removeEvent('submit', inAllSearchers);
						btn.style.display='none';
					}
				}
		}});
		
		var comboBoxLabel = new Element('label', {
			'class'	: type,
			'for'	: 'gfx-searchers-cbox',
			'title'	: LNG.search_in + ' ' + LNG.all,
			'html'	: ':'
		});

		var sitesList = new Element('div', {
			'class' : 'siteList',
			'html'	: getSearchers(type)
		});
		
		var searchInAllBtn = new Element('button', {
			'id'	: 'gfx-searchers-button',
			'type'	: 'button',
			'style'	: 'margin-top:2px;margin-left:5px;height:30px;display:none;',
			'html'	: LNG.in_ + ' ' + LNG.searchers
		});
		searchInAllBtn.addEvent('click', inAllSearchers);
		
		try{
			$nd('//input[@type="submit"]/ancestor::td|//input[@type="submit"]').grab(searchInAllBtn, 'after');
		}catch(e){GM_log(e)}

		itemBar.grab(menuHolder,'top');
		GBAR.appendChild(itemBar);
		
		toolBar.appendChild(comboBox);
		toolBar.appendChild(comboBoxLabel);
		toolBar.appendChild(sitesList);
		
		toolBar.inject(target,(target.id=='gfx-head-content'?'bottom':'before'));

	};

	// AutoPaged
	//*************
	var AutoPaged = function(obj){
		var self = arguments.callee;
		var iframe, request, lastSrc, holder, xPathContent, nextLink, prevLink, nextUrl, prevUrl, prevStart, nextStart, isStreaming=false, isReverse = false, navbar, navContent, navprev;
		
		var WinScroller = new Fx.Scroll(window, {
			'wheelStops'	: true,
			'fps'			: 50,
			'duration'		: 1000,
			'transition'	: 'quad:in:out'
		});
		
		var createHTMLByString = function(str) {
			if (doc.documentElement.nodeName != 'HTML') {
				return new DOMParser().parseFromString(str, 'application/xhtml+xml');
			}
			var html = str.replace(/^.*<\/head>/, '').replace(/<\/html>.*/, '');
			var htmlDoc;
			try {
				htmlDoc = doc.cloneNode(false)
				htmlDoc.appendChild(htmlDoc.importNode(doc.documentElement, false))
			}
			catch(e) {
				htmlDoc = doc.implementation.createDocument(null, 'html', null)
			}
			var range = doc.createRange();
			range.setStartAfter(doc.body);
			var fragment = range.createContextualFragment(html);
			var nodes;
			try {
				nodes = doc.adoptNode(fragment);
			} catch(e) {
				nodes = doc.importNode(fragment, true);
			}
			htmlDoc.documentElement.appendChild(nodes);
			return htmlDoc;
		};
		
		var createRequest = function()
		{
			if(canRun.images){
				createImageRequest();
				return;
			}else{
				if(isGecko || isChrome || isWebkit){
					retry = 1;
					iframe = new Element('iframe', {
						'id'		: 'gfx-stream',
						'styles'	: {
							'height'	: '0',
							'left'		: '0',
							'margin'	: '0 0 0 -10000px',
							'position'	: 'absolute',
							'top'		: '0',
							'width'		: '100%'
						}
					});
					iframe.inject(body);
				} else {
					request = new Request({
						method: 'get',
						url: (nextUrl.split('?'))[0],
						headers: {
							'Cookie': document.cookie
						},
						onSuccess: onSuccess
					});
				}
			}

			
			if(GFX.rAutoPagNav){
				navbar = new Element('table', {
					'id'	: 'gfx-nav',
					'styles': {
						'border-collapse'	: 'collapse',
						'bottom'			: '0',
						'direction'			: 'ltr',
						'margin-bottom'		: '5px',
						'margin-right'		: '10px',
						'position'			: 'fixed',
						'right'				: '0',
						'text-align'		: 'center',
						'z-index'			: '99',
						'max-width'			: '35%'
					},
					'html'	:
				'<tr valign=top>\
					<td class=b>\
						<a id=gfx-nav-prev href="#page_0" rel="0" onclick="var page=parseInt(this.getAttribute(\'rel\'));if(page==0)return;this.setAttribute(\'rel\',(page-1));this.href=\'#page_\'+(page-1);">\
							<span class="csb ch" style="background-position: 0px 0; width: 75px;"></span>\
							<div class=prev style="margin-right:8px;font-weight:bold;">Previous</div>\
						</a>\
					</td>\
					<td>\
					<div  style="height:80px;width:150px;max-width:150px;overflow:hidden;overflow-y:hidden;overflow-x:scroll;">\
						<div id=gfx-nav-content></div>\
						</div>\
					</td>\
					<td class=b>\
						<a id=gfx-nav-next href="#pageBot">\
							<span class="csb ch" style="background-position:-96px 0; width:75px;"></span>\
							<div class=prev style="font-weight:bold;">Next</div>\
						</a>\
					</td>\
				</tr>'
				});
				navbar.inject(holder, 'before');
				navContent = $id('gfx-nav-content');
				navprev = $id('gfx-nav-prev');
			}
		};
		
		var createImageRequest = function()
		{
			request = new Request({
				method: 'get',
				url: (nextUrl.split('?'))[0],
				headers: {
					'Cookie': document.cookie
				},
				onSuccess: onImageSuccess
			});
		}

		var doRequest = function()
		{
			isStreaming = true;
			
			var url = isReverse ? prevUrl : nextUrl;
			
			if(canRun.images){
				url = doc.location.href.replace(/start=[0-9]*/g,'') + '&start=' + (isReverse?prevStart:nextStart);
				url = (url.test(/#.*&/) ? url.split('#') : url.split('?'));
				request.send(url[1]+'&ijn=page');
				return;
			}
			
			if(isGecko){
				iframe.addEvent('load', onLoadIframe);
				iframe.contentWindow.location.replace(url + '#gfx-ap');
			} else if(isChrome||isWebkit){
				iframe.addEvent('load', onLoadIframe);
				iframe.src = url + '#gfx-ap';
			} else {
				url = url.split('?');
				request.send(url[1]);
			}
		};
		
		var onLoadIframe = function()
		{
			// Prevent Double Ejecution
			if(isGecko){
				if(lastSrc == iframe.contentWindow.location){ return; }
				lastSrc = iframe.contentWindow.location;
			} else {
				if(lastSrc == iframe.src){ return; }
				lastSrc = iframe.src;
			}

			iframe.removeEvent('load', onLoadIframe);

			processDocument(iframe.contentDocument);
		};
		

		var onSuccess = function(responseText)
		{
			processDocument(createHTMLByString(responseText));
		};
		
		var onImageSuccess = function(responseText)
		{
			var obj = JSON.decode(responseText.replace(/^\/\*/,'').replace(/,\"navbar.+,\"rn\":([0-9]+).+/,',"rn":$1}').replace(/\\x26/g,'&').replace(/\\x3c/g,'<').replace(/\\x3d/g,'=').replace(/\\x3e/g,'>') );
			
			if(!obj || obj.images.length == 0 || nextStart > 999 || obj.rn < nextStart){
				$id(window).removeEvent('scroll', onScroll);
				return;
			}
			
			var iset = 'gfx-iset-'+(Math.round(nextStart/10)+1);
			
			var html = '';
			for(var i=0; i<obj.images.length; i++){
				var data = obj.images[i];
				html = '\
				<div id=tDataImage'+(nextStart+i)+' style="display:block;">\
					<a href="'+data[0]+'&tbnid='+data[2]+'&tbnh:'+data[4]+'&tbnw:'+data[5]+'">\
						<img src="'+data[14]+'?q=tbn:'+data[2]+data[3]+'" id="'+data[2]+'" width='+data[4]+' height='+data[5]+' />\
					</a>\
				</div>\
				<div id=tDataText'+(nextStart+i)+' style="display:block;">\
					<div class=std>'+data[6]+'<div class=f>'+data[9]+'</div><div class=a><cite>'+data[11]+'</cite></div></div>\
				</div>\
				';
				new Element('div',{'class':iset,'style':'display:inline-block;width:178px;margin-right:16px;text-align:center;','html':html}).inject(holder);
			}

			processImages('//div[@class="'+iset+'"]');

			nextStart += obj.images.length;
			nextUrl	= nextUrl.replace(/start=[0-9]*/g, 'start='+nextStart);
			isStreaming = false;
		};
		
		var processDocument = function(contentDocument)
		{
			if (!contentDocument){ return; }
			
			GFX_processResults(contentDocument,isReverse,prevStart);
			
			var contentNodes = $xpath(xPathContent, contentDocument, 7);

			if(contentNodes)
			{
				var nodesLength = contentNodes.snapshotLength;
				
				// Process Previous Page
				//-----------------------
				if(isReverse){
					
					// Virtual Navigator
					if(GFX.rAutoPagNav){
						var page = (Math.round(prevStart/10)+1);
						holder.grab(new Element('a',{'name':'page_'+page,'style':'position:absolute;margin-top:-120px;'}),'top');
						navContent.grab(new Element('a', {
							'href': '#page_' + page,
							'rel'	: page,
							'html':	'<span class="csb ch"></span>' + page,
							'onclick' : 'var el=document.getElementById("gfx-nav-prev");var page=(parseInt(this.getAttribute("rel"))-1);el.setAttribute("rel",page);el.href="#page_"+page;'
						}), 'top');
						navContent.parentNode.scrollLeft = 0;
					}
					
					// Import Nodes
					var len = nodesLength-1;
					do {
						var node = contentNodes.snapshotItem(len);
						var iNode = doc.importNode(node,true);
						$id(iNode).inject(holder, 'top');
					} while (len--);
					
					// Get Prev Page
					var isPrev = $nd(prevLink, contentDocument);
					if(isPrev)
					{
						prevStart -= 10;
						prevUrl	= prevUrl.replace(/start=[0-9]*/, 'start='+prevStart);
					} else {
						prevUrl = false;
					}
					
					WinScroller.start(0, (isOpera?win.innerHeight:doc.clientHeight));
					
				// Process Next Page
				//-----------------------
				} else {

					// Virtual Navigator
					if(GFX.rAutoPagNav){
						var page = (Math.round(nextStart/10)+1);
						holder.grab(new Element('a',{'name':'page_'+page,'style':'position:absolute;margin-top:-120px;'}));
						navContent.grab(new Element('a',{
							'href'	: '#page_'+page,
							'rel'	: page,
							'html'	: '<span class="csb ch"></span>' + page,
							'onclick' : 'var el=document.getElementById("gfx-nav-prev");var page=(parseInt(this.getAttribute("rel"))-1);el.setAttribute("rel",page);el.href="#page_"+page;'
						}));
						navContent.parentNode.scrollLeft = 9999999;
						navprev.href = '#page_'+ (page-1);
						navprev.setAttribute('rel', (page-1));
					}
					
					// Import Nodes
					for (var i=0; i < nodesLength; i++) {
						var iNode;
						var node = contentNodes.snapshotItem(i);
						iNode = doc.importNode(node,true);
						$id(iNode).inject(holder);
					}

					// Get Next Page
					var isNext = $nd(nextLink, contentDocument);
					
					if(isNext)
					{
						if(GFX.rCols==1) holder.grab(new Element('hr'));
						nextStart += 10;
						nextUrl	= nextUrl.replace(/start=[0-9]*/, 'start='+nextStart);
					}
					else
					{
						$id(window).removeEvent('scroll', onScroll);
						var nofilter = $nd('//a[contains(@href,"filter=0")]', contentDocument);
						if(nofilter)
						{
							nofilter.inject(holder, 'bottom');
							nofilter.setAttribute('style', '\
								background-color	: #fdc;\
								display				: block;\
								text-align			: center;\
								width				: 100%'
							);
						}
					}
				
				}
				
				isReverse = false;

			}
			isStreaming = false;
		};
		
		var onScroll = function(ev)
		{
			if( isStreaming ){ return; }
			var st = doc.body.scrollTop + doc.documentElement.scrollTop;
			if(st==0){
				if(prevUrl){
					isReverse = true;
					doRequest();
				}
				return;
			}

			var rt = (doc.body.scrollHeight-st)/(doc.body.scrollTop?doc.body.clientHeight:doc.documentElement.clientHeight);

			if( rt < GFX.rAutoPagRT ){ doRequest(); }
		};

	
		// Syntax of Argument Object 
		//  { 
		//   holder    :    " string xPath of Holder "   or   Node element  , 
		//   content   :    " string xPath of Content to import  ( Single or Multi elements  )  "  ,
		//   nextLink  :    " string xPath of Next Page "  ,
		//	 prevLink  :    " string xPath of Prev Page " 
		//  } 
		var init = function ( obj )
		{
			holder = (typeof obj.holder == 'string' ? $nd(obj.holder) : $id(obj.holder));
			if(!holder) { GM_log('holder not found with: ' + obj.holder); return; }

			xPathContent = obj.content;
			nextLink = obj.nextLink || '//*[contains(@id,"nav")]//td[last()]//a';
			prevLink = obj.prevLink || '//*[contains(@id,"nav")]//td[1]//a';

			var nav = $nd(nextLink+'/ancestor::*[starts-with(@id,"nav")] | '+ nextLink +'/ancestor::table');
			if(nav){ nav.hide(); }
			
			nextUrl = canRun.images ? doc.location : $nd(nextLink);
			prevUrl = $nd(prevLink);

			if(!nextUrl && !prevUrl){ return; }
			
			if(nextUrl){
				nextUrl = nextUrl.href.replace(/num=[0-9]*/,'num=10');
				nextStart	= nextUrl.match(/start=([0-9]+)/);

				if(nextStart && nextStart[1]){
					nextStart = parseInt(nextStart[1]);
				} else {
					nextStart = canRun.images ? 18 : 10;
					nextUrl += '&start='+nextStart;
				}

				var currStart = (URI.query.start||1);
				if(nextStart <= currStart){ return; }
			}
			
			if(prevUrl){
				prevStart	= Number(URI.query.start||-1) -10;
				var currentUrl = URI.location + (!URI.query.start ? '&start=0' : '');
				prevUrl	= prevStart > -10 ? currentUrl.replace(/num=[0-9]*/,'num='+(prevStart<0?prevStart*-1:10)).replace(/start=[0-9]*/,'start='+(prevStart>0?prevStart:0)) : false;
			}
			
			
			createRequest();
			
			if(GFX.rAutoPagNav && !canRun.images){
				body.grab(new Element('a',{'name':'page_0'}),'top');
				body.grab(new Element('a',{'name':'pageBot'}));
				
				var page = (Math.round(currStart/10)+1);
				holder.grab(new Element('a', {
					'name'	:	'page_'+page,'style':'position:absolute;margin-top:-120px;'
				}),'top');
				navContent.grab(new Element('a', {
					'href'	: '#page_' + page,
					'html'	: '<span class="csb ch"></span>' + page
				}));
				var len = parseInt(URI.query.num||10);
				var step = docSize.y / len;
				for (var i=10; i<len; i+=10){
					var page = Math.round((currStart+i)/10) + 1;
					holder.grab(new Element('a',{
						'name'	: 'page_'+page,
						'styles': {
							'position'	: 'absolute',
							'margin-top': (i*step-50) +'px'
						}
					}),'top');
					navContent.grab(new Element('a', {
						'href'	: '#page_'+page,
						'html'	: '<span class="csb ch"></span>' + page
					}));
				}
			}
			
			$id(window).addEvent('scroll', onScroll);
			
			doRequest();
		};
		
		init(obj);
	};
	
	
	
	// ==============================================================================================================
	//         REPLACE  TRACKER  FUNCTIONS
	// ==============================================================================================================
	if(GFX.rNoTrack)
	{
		var domain = doc.location.hostname.replace(/[a-z]+\.google/,'google');
		if(win.clk) win.clk = function(){};
		if(win.rwt) win.rwt = function(){};
		//doc.cookie='PREF=ID=0a1b2c3d4e5f6g7h:U=h7g6f5e4d3c2b1a0:TM=9876543210:LM=9876543210:S=0a1b2c3d4e5f6g7h; path=/;domain='+domain;
		doc.cookie='NID=; path=/;domain='+domain;
		doc.cookie='SID=; path=/verify;domain='+domain;
		doc.cookie='SNID=; path=/verify;domain='+domain;
		doc.cookie='SS=; path=/search';
	}
	

	// =====================================================================================================
	// Check and Complete the Main Menu
	// =====================================================================================================
	var GBAR_BG = new Element('div',{id:'gbar_bg'});
	GBAR_BG.inject(body);
	
	var GBAR = $id('gbar') || $nd('//*[@id="gbar"]');

	var gbimenu='\
	<a href="http://www.google.com/blogsearch?q='
	+ queryString +'" class="gb2 blogsearch">'						+	LNG.blogs	+'</a>\
	<a href="http://www.google.com/groups?q='
	+ queryString +'" class="gb2 groups">'							+	LNG.groups	+'</a>\
	<a href="http://www.google.com/books?q='
	+ queryString +'" class="gb2 books">'							+	LNG.books	+'</a>\
	<a href="http://www.google.com/movies?q='
	+ queryString +'" class="gb2 movies">'							+	LNG.movies	+'</a>\
	<a href="http://www.google.com/scholar?q='
	+ queryString +'" class="gb2 scholar">'							+	LNG.scholar	+'</a>\
	<a href="http://code.google.com/intl/en/'
	+(hasSomeQuery ? '#q='+queryString : '')+'" class="gb2 code">'	+	LNG.code	+'</a>\
	<div class=gb2><div class=gbd></div></div><a></a>\
	<a href="https://docs.google.com/#search/'
	+ queryString +'" class="gb2 docs">'							+	LNG.docs	 +'</a>\
	<a href="https://www.google.com/calendar/render?q='
	+ queryString +'" class="gb2 calendar">'						+	LNG.calendar +'</a>\
	<a href="https://www.google.com/reader/view/?q='
	+ queryString +'" class="gb2 reader">'							+	LNG.reader	 +'</a>\
	<a href="https://wave.google.com/wave/" class="gb2 wave">Wave</a>\
	<a href="https://sites.google.com/site/sites/system/app/pages/meta/search?q='
	+ queryString +'" class="gb2 sites">'							+	LNG.sites	 +'</a>\
	<a href="https://www.google.com/alerts/" class="gb2 alerts">'	+	LNG.alerts	 +'</a>\
	<a href="https://www.google.com/notebook/#q='
	+ queryString +'" class="gb2 notebook">'						+	LNG.notebook +'</a>\
	<a href="https://www.google.com/history/find?q='
	+ queryString +'" class="gb2 history">'							+	LNG.history	 +'</a>\
	<div class=gb2><div class=gbd></div></div><a></a>\
	<a href="http://www.google.com/maps?q='
	+ queryString +'" class="gb2 maps">'							+	LNG.maps	 +'</a>\
	<a href="http://picasaweb.google.com/lh/view?q='
	+ queryString+'&psc=G&filter=0" class="gb2 picasaweb">'			+	LNG.picasaweb+'</a>\
	<a href="http://www.youtube.com/results?search_query='
	+ queryString+'&aq=f" class="gb2 youtube">'						+	LNG.youtube	 +'</a>\
	<div class=gb2><div class=gbd></div></div><a></a>\
	<a href="http://www.google.com/products?q='
	+ queryString +'" class="gb2 products">'						+	LNG.products +'</a>\
	<a href="http://www.google.com/finance?q='
	+ queryString +'" class="gb2 finance">'							+	LNG.finance	 +'</a>\
	<a href="http://www.google.com/intl/'+LANG+'/options/" class="gb2 intl">'+	LNG.more	 +' &raquo;</a>';
	
	if (!GBAR)
	{
		GBAR = new Element('div', {
			'id'	: 'gbar',
			'html'	: '\
			<nobr>\
			<a href="http://www.google.com/search?q='
			+ queryString +'" class="gb1 search">'					+ LNG.webhp		+'</a>\
			<a href="http://www.google.com/images?q='
			+ queryString +'&sout=1" class="gb1 images">'			+ LNG.images	+'</a>\
			<a href="http://www.google.com/videosearch?q='
			+ queryString +'" class="gb1 video">'					+ LNG.video		+'</a>\
			<a href="http://www.google.com/news?q='
			+ queryString +'" class="gb1 news">'					+ LNG.news		+'</a>\
			<a href="https://mail.google.com/mail/#search/'
			+ queryString +'" class="gb1 mail">'					+ LNG.mail		+'</a>\
			<a href="http://www.google.com/translate_t?hl='+LANG+'" class="gb1 translate">'+LNG.translate+'</a>\
			<a href="#" class="gb3 intl">'
				+ LNG.more +' &#9660;<div id=gbi>' + gbimenu + '</div></a>\
			</nobr>'
		});
		GBAR.inject(body, 'top');
		
		STYLES += 'body { margin-top : 24px; }';
	}

	//Because some regions don't have all menu's links
	else if(GFX.bMnuChk)
	{

		var addMenuItem = function (obj, href, label, class)
		{
			var item = new Element('a',{
				'class'		: class,
				'href'		: href,
				'target'	: '_self',
				'html'		: label
			});
			item.inject(obj,'before');
		};
		
		// Icons Feature
		var addIcons = GFX.bMnuIcn ?
			function(el){
				var srvname = {vid:'video',nws:'news',bks:'books',blg:'blogsearch'};
				var srv = el.href.match(/^https?:\/\/(\w+)\.(\w+)\.[^\/]+\/\??(\w+)\??.*/);
				if (srv){
					srv[0] = srv[0].replace(/^.+[\?\&]tbs=.*(vid|nws|bks|blg):1.*$/,'$1');
					var newclass = (srv[0].length==3 ? srvname[srv[0]]: (srv[2]=='google' ? srv[(srv[1]=='www' ? 3 : 1)] : srv[2]));
					$id(el).addClass(newclass);
					if(LANG != 'en' && LNG[title]) el.innerHTML = LNG[title];
				}
			}
			: function(){};

		var gbi = $id('gbi') || $nd('//*[@id="gbi"]');
		if(!gbi){
			var a = new Element('a', {
				'class'	: 'gb3',
				'href'	: 'http://www.google.com/intl/'+ LANG +'/options/',
				'html'	: LNG.more + ' &#9660'
			});
			gbi = new Element('div', {
				'id'	: 'gbi',
				'html'	: gbimenu
			});
			a.grab(gbi,'top');
			GBAR.grab(a);

		}

		var items = '';
		var nodes = doc.evaluate('//*[@id="gbar"]//a', doc.body, null, 7, null);

		for(var i=0,len=nodes.snapshotLength; i<len; i++) {
			var el = nodes.snapshotItem(i);

			el.href = el.href.replace(/(blogs|finance|groups|images|news|maps|scholar)\./,'www.')+'&tbo=1';
			el.removeAttribute('onclick');
			el.setAttribute('target', '_self');
			items += el.href.split('?')[0];
			
			if(/images\?/.test(el.href) && GFX.iOldStyle) el.href += '&sout=1';
			
			addIcons(el);
		};
		items = items.replace(/https?\/\//ig, ';');

		var lastGbi = nodes.snapshotItem(nodes.snapshotLength-1);
		lastGbi.href = lastGbi.href.replace(/&tbo=1/,'');
		
		var lastGBar = $nd('//*[@id="gbar"]//a[contains(concat(" ",@class," ")," gb3 ")][contains(@href,"/options/")]') || $nd('//*[@id="gbar"]//a//small/ancestor::a');


		// Add Links to NavBar Menu
		if(SERVICE != 'translate'	&& $nd('//*[@id="gbar"]//a[contains(@href,"translate.")][contains(concat(" ",@class," ")," gb1 ")]')==null)
			addMenuItem(lastGBar, 'http://translate.google.com'
			+ (hasSomeQuery ? '/translate_t?q='+queryString : ''),				LNG.translate,	'gb1 translate');


		//Add Links to NavBar SubMenu -> More...
		if(SERVICE != 'alerts'		&& items.indexOf('alerts')		== -1)
			addMenuItem(lastGbi, 'https://www.google.com/alerts/',				LNG.alerts,		'gb2 alerts');
			
		if(SERVICE != 'blogsearch'	&& items.indexOf('blogs')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/blogsearch'
			+ (hasSomeQuery ? '?q='+queryString : ''),							LNG.blogs,		'gb2 blogsearch');
			
		if(SERVICE != 'books'		&& items.indexOf('books')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/books'
			+ (hasSomeQuery ? '?q='+queryString : ''),							LNG.books,		'gb2 books');
			
		if(SERVICE != 'calendar'	&& items.indexOf('calendar')	== -1)
			addMenuItem(lastGbi, 'https://www.google.com/calendar/'
			+ (hasSomeQuery ? 'render?'+queryString : ''),						LNG.calendar,	'gb2 calendar');
			
		if(SERVICE != 'code'		&& items.indexOf('code')		== -1)
			addMenuItem(lastGbi, 'http://code.google.com'
			+ (hasSomeQuery ? '/intl/en/search/#q='+queryString : ''),			LNG.code,		'gb2 code');
			
		if(SERVICE != 'docs'		&& items.indexOf('docs')		== -1)
			addMenuItem(lastGbi, 'https://docs.google.com'
			+ (hasSomeQuery ? '/#search/'+queryString : ''),					LNG.docs,		'gb2 docs');
			
		if(SERVICE != 'finance'		&& items.indexOf('finance')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/finance'
			+ (hasSomeQuery ? '?'+queryString : ''),							LNG.finance,	'gb2 finance');
			
		if(SERVICE != 'groups'		&& items.indexOf('groups')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/groups'
			+ (hasSomeQuery ? '?'+queryString : ''),							LNG.groups,		'gb2 groups');
			
		if(SERVICE != 'history'		&& items.indexOf('history')		== -1)
			addMenuItem(lastGbi, 'https://www.google.com/history/'
			+ (hasSomeQuery ? 'find?'+queryString : ''),						LNG.history,	'gb2 history');
			
		if(SERVICE != 'maps'		&& items.indexOf('maps')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/maps'
			+ (hasSomeQuery ? '?'+queryString : ''),							LNG.maps,		'gb2 maps');
		
		if(SERVICE != 'movies'		&& items.indexOf('movies')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/movies'
			+ (hasSomeQuery ? '?q='+queryString : ''),							LNG.movies,		'gb2 movies');
			
		if(SERVICE != 'news'		&& items.indexOf('news')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/news'
			+ (hasSomeQuery ? '?'+queryString : ''),							LNG.news,		'gb2 news');
			
		if(SERVICE != 'notebook'	&& items.indexOf('notebook')	== -1)
			addMenuItem(lastGbi, 'https://www.google.com/notebook/'
			+ (hasSomeQuery ? '#q='+queryString : ''),							LNG.notebook,	'gb2 notebook');
			
		if(SERVICE != 'picasaweb'	&& items.indexOf('picasaweb')	== -1)
			addMenuItem(lastGbi, 'http://picasaweb.google.com'
			+ (hasSomeQuery ? '/lh/view?q='+queryString+'&psc=G&filter=0' : ''),LNG.picasaweb,	'gb2 picasaweb');
			
		if(SERVICE != 'products'	&& items.indexOf('products')			== -1)
			addMenuItem(lastGbi, 'http://www.google.com/products'
			+ (hasSomeQuery ? '?q='+queryString : ''),							LNG.products,	'gb2 products');
			
		if(SERVICE != 'reader'		&& items.indexOf('reader')		== -1)
			addMenuItem(lastGbi, 'https://www.google.com/reader/'
			+ (hasSomeQuery ? 'view/?'+queryString : ''),						LNG.reader,		'gb2 reader');

		if(SERVICE != 'sites'		&& items.indexOf('sites')		== -1)
			addMenuItem(lastGbi, 'https://sites.google.com'
			+ (hasSomeQuery ? '/site/sites/system/app/pages/meta/search?'+queryString : ''),LNG.sites,	'gb2 sites');
			
		if(SERVICE != 'scholar'		&& items.indexOf('scholar')		== -1)
			addMenuItem(lastGbi, 'http://www.google.com/scholar'
			+ (hasSomeQuery ? '?'+queryString : ''),							LNG.scholar,	'gb2 scholar');
			
		if(URI.host[1] != 'youtube' && items.indexOf('youtube')		== -1)
			addMenuItem(lastGbi, 'http://www.youtube.com'
			+ (hasSomeQuery ? '/results?search_query='+queryString+'&aq=f' : ''),LNG.youtube,	'gb2 youtube');
			
		if(SERVICE != 'wave'		&& items.indexOf('wave')		== -1)
			addMenuItem(lastGbi, 'https://wave.google.com'
			+ (hasSomeQuery ? '/wave/'+queryString : ''),						'Wave',			'gb2 wave');

		lastGBar.innerHTML = LNG.more + ' <span style="font-size:7pt;">&#9660;</span>';
		lastGBar.removeAttribute('onclick');
		lastGBar.setAttribute('href','#');
		lastGBar.grab(gbi,'top');
		
		var el;
		// Login Icon
		el = $nd('//div[@id="guser"]//a[contains(@href,"/accounts/Login?")]');
		if(el) el.addClass('login');
		// Preferences Icon
		el = $nd('//div[@id="guser"]//a[contains(@href,"/preferences?")]');
		if(el){
			el.addClass('prefs');
			el.title = el.innerHTML;
			if(el.getAttribute('onclick')){
				el.removeAttribute('title');
				el.removeAttribute('onclick');
				el.innerHTML = '<div id=gprefs><a href="/preferences?hl='+LANG+'" target="_self" class="gb2">Search Preferences</a><a href="/accounts/ManageAccount?hl='+LANG+'" target="_self" class="gb2">Manage Account</a></div></nobr>';
				var gprefs = $id('gprefs');
				gprefs.style.display = 'block';
				gprefs.style.marginLeft = '-'+(gprefs.offsetWidth-18)+'px';
				gprefs.style.display = '';
			}else{
				el.innerHTML = '';
			}
		}
		// History Icon
		el = $nd('//div[@id="guser"]//a[contains(@href,"/history/")]');
		if(el){
			el.addClass('history');
			el.setAttribute('style','margin-top:3px;');
			el.title = el.innerHTML;
			el.innerHTML = '';
		}

	}

	var GUSER = $id('guser') || $nd('//*[@id="guser"]');
	
	// Add GoogleFx User Settings access item to Main Menu
	var menu = $id('gbi') || $nd('//*[@id="gbi"]');
	if(menu){
		
		new Element('div', {
			'class'	: 'gb2',
			'html'	: '<div class=gbd></div>'
		}).inject(menu);
		new Element('a', {
			'class'	: 'gb2 gfx',
			'href'	: '#',
			'html'	: 'Google Fx',
			'events': {'click':showSettings}
		}).inject(menu);
	}
	
	
	// Remove @gmail.com from User name (TopBar)
	if(GFX.bShtName)
	{
		if(GUSER)
		{
			var username = GUSER.getElement('B');
			if(username && username.innerHTML.indexOf('@') != -1)
				username.innerHTML = username.innerHTML.replace(/@[a-z]+\.com/,'');
		}
		else
		{
			var o = $nd("//div[@id='gbar']/following::*//a[contains(@href,'accounts')]");
			if(o){
				o.setAttribute('class', (o.getAttribute('class') || '') + ' login');
				var username = o.getParent().getElement('B');
				if(username && username.innerHTML.indexOf('@') != -1){
					username.innerHTML = username.innerHTML.replace(/@[a-z]+\.com/,'');
				}
			}
		}
	}
	
	if(!GUSER) GUSER = new Element('div',{id:'guser'});
	
	new Element('a', {
		'class'	: 'gfx',
		'href'	: '#',
		'style'	: 'margin-right:10px !important;',
		'events': {'click':showSettings}
	}).inject(GUSER.getElement('nobr')||GUSER,'top');

	
	

	
	// Fixes for Search Request Form
	//***********************************
	var FORM = $id(doc.forms[0]) || $nd('//FORM');
	
	if(FORM) {
	
	
		// Remove unnecessary form elements
		if( !(canRun.maps||canRun.local) ) {
			for(var i=0,len=FORM.length-1; i < len; i++){
				var el = FORM[i];
				if(el && el.type=='hidden' && el.value==''){
					FORM.removeChild(el);
				}
			}
		}
		
		// Show Full LeftNav Options
		var tbo = $nd('input[name="tbo"]');
		if(!tbo){
			new Element('input', {
				'name'	: 'tbo',
				'type'	: 'hidden',
				'value'	: '1'
			}).inject(FORM);
		}
		
		// We need to increase the number of search results for the first request
		// if the Right Panel is enabled
		if (canRun.search && !SUBSERVICE && GFX.bSidebar && !URI.query.num) {
			var el = new Element('input', {
				'name'	: 'num',
				'type'	: 'hidden',
				'value'	: '50',
			});
			FORM.appendChild(el);
		}

		// SafeMode Feature
		var safe = $nd('input[name="safe"]');
		if(safe){
			safe.value = GFX.Prefs.safe;
		} else if (GFX.rPrefs.safe!='images'){
			var el = new Element('input', {
				'name'	: 'safe',
				'type'	: 'hidden',
				'value'	: GFX.rPrefs.safe
			});
			FORM.appendChild(el);
		}
		
		// Set OldStyle Images
		if(canRun.images && GFX.iOldStyle) {
			var sout = $nd('input[name="sout"]');
			if(!sout){
				new Element('input', {
					'name'	: 'sout',
					'type'	: 'hidden',
					'value'	: '1'
				}).inject(FORM);
			}
		}
	}

	
	
	if(hasSomeQuery || canRun.news) {
		// Header Feature
		//--------------------
		var gfxHeader = new Element('div', {'id' : 'gfx-header'});
		gfxHeader.appendChild(GBAR_BG);
		gfxHeader.appendChild(GBAR);
		gfxHeader.appendChild(GUSER);
		gfxHeadContent = new Element('div', {'id' : 'gfx-head-content'});
		gfxHeader.appendChild(gfxHeadContent);
		if(GFX.bMnuFix) gfxHeader.addClass('fixed');
		body.insertBefore(gfxHeader, body.firstChild);
		
		// ==================================================================================================
		//  Set Click event to small GoogleFX Logo
		// ==================================================================================================
		if(GFX.gFxLogo) {
			var el = $nd('//*[@id="sft"]//TD//A//IMG | //*[@id="logoimg"]//IMG | //*[@id="q_form"]//DIV[@id="logo"]//A//IMG | //*[@id="advanced-search"]//DIV[@id="logo"]//A//IMG | //*[@id="advanced-search-header"]//TABLE//TD//A//IMG | //*[@id="gc-header"]//*[@id="logo"]//A//IMG | //*[@id="h"]//TABLE//TD//A//IMG | //*[@id="headerdiv"]//TABLE//TD//A//IMG | //*[@id="page-header"]//TABLE//TD//A//IMG | //*[@id="title-t"]//TD//A//IMG | //*[@id="top_search_box"]//TD//A//IMG | //*[@id="whole"]//TD//A//IMG | //DIV[@class="g-section.header"]//A//IMG | //DIV[@class="search-header"]//DIV[@class="sfe-logo"]//A//IMG | //FORM//TD[@rowspan="2"]//A[@id="logo"]//SPAN | //FORM[@name="langform"]//TABLE//TD[@width="1%"]//A//IMG');
			if(el){
				el.title = 'Google Fx - ' + LNG.ui_title;
				el.addEvent('click', showSettings);
			}
		}
		
		STYLES += '\
		BODY {\
			overflow-x			: auto;\
		}';
		
	} else {
	
		// Remove Google Fade Fx
		try{
			$nd('//html').removeAttribute('onmousemove');
			$nd('//form//input[@name="q"]').removeAttribute('onblur');
		}catch(e){}
	
	
		// ==================================================================================================
		//  Change Google Logo for Dark Background
		// ==================================================================================================

		var logo = $nd('//div[@id="lga"]') || $nd('//div[@id="logo"]') || $nd('//img[contains(@src,"/intl/") and contains(@src,"/images/") and contains(@src,"logo")]');

		/* Big Logo */
		if( logo && logo.offsetHeight > 106 ){
			if(GFX.gFxLogo) {
				new Element('a', {
					'id'	: 'gfx-logo',
					'href'	: '#',
					'title'	: 'Google FX v' + SCRIPT_VER + ' - '+LNG.ui_title,
					'style' : 'margin-bottom:'+(LANG!='en'&&!canRun.images?'55':'0')+'px;',
					'events':{
						'click'	: showSettings
					}
				}).inject(logo,'after');
				
				logo.style.display = 'inline-block';
			}
			
			var img = logo.getElement('img');
			if(img) logo = img;
			
			try{
				if( logo.nodeName == 'IMG' && logo.src.split('/')[3] != 'logos' ) {
					logo.src = Google_Logo;
					logo.width = '275';
					logo.height = '95';
				}
			}catch(e){GM_log(e)}
		}
	}
	
	
	STYLES += '\
	BODY {\
		margin-top			: 30px !important;\
	}';

	
	// ==================================================================================================
	if( /advanced_/.test(URI.path[0]) || (URI.path[1]&&/advanced_/.test(URI.path[1])) ){
		return;
	}
	

	// Color Themes Feature
	var themesBar = new Element('div', {
		'id' : 'gfx-themes-bar',
		'html'	:'<div></div>'
	}).inject(GBAR,'before');

	for (var name in THEMES) {
		var el = new Element('a', {
			'title'	: name,
			'style' : 'border-color:'+THEMES[name].color+' !important;background:'+THEMES[name].bgcolor+';'
		}).inject(themesBar.firstChild);
		el.addEvent('click',function(event){
			event.preventDefault();
			event.stopPropagation();
			setColorTheme(event.target.getAttribute('title'), true);
			return !false;
		});
	}
	
	
	// ==============================================================================================================
	//                                           W E B   S E A R C H  -  ( 01 )
	// ==============================================================================================================

	if(canRun.search)
	{
	
		if(hasSomeQuery){
		
		
			var tsf = $nd('//*[@id="sfcnt"]') || $nd('//*[@id="tsf"]') || $nd('//form[@name="gs"]');
			if(tsf) gfxHeadContent.appendChild(tsf);
		
		
			// Add Other Web Searches
			//-----------------------------------
			addSearchers((gfxHeadContent || $nd('//*[@id="res"]')), (SUBSERVICE||SERVICE) );

			//  Advance Search ToolBars
			//----------------------------------
			if(GFX.bToolbar)
			{
			
				var cloneLeftItem = function(xpred,target){
					var el = $nd('//div[@id="leftnav"]//li'+xpred+'//a') || $nd('//div[@id="leftnav"]//li'+xpred);
					if(!el) return;
					var class = el.nodeName == 'A' ?el.parentNode.id : el.id+' on' ;
					el = el.clone();
					el.set('class',class);
					el.set('title',el.innerHTML);
					el.innerHTML='';
					el.inject(target);
				}
			
				var toolbar = new Element('div', {
					'id'	: 'gfx-toolbar'
				});
				
				var isTbs = URI.query._tbs.length;
			
				//  SafeMode
				//-----------------

				var isSafeOff = (URI.query.safe && URI.query.safe == 'off') || (GFX.rPrefs.safe == 'off');
				var value = (isSafeOff ? 'off' : 'images');

				var url = URI.href;
				url = url.replace(/&?safe=[^&]*|$/, '');
				
				var setSafeMode = function(){
					GFX.rPrefs.safe = this.className=='images' ? 'images': 'off';
					GM_setValue('GFX.Prefs.safe', GFX.rPrefs.safe);
				};

				toolbar.grab(new Element('div',{
					'class'	: 'icons safemode',
					'html'	: '<a id=gfx-safemode class=' + (isSafeOff ? 'off' : 'images') + ' href="' + url + '&safe=' + (isSafeOff ? 'images' : 'off')+'" title="'+LNG.safemode+' '+(isSafeOff ? LNG.disabled : LNG.enabled)+'"></a>'
				}));
				
				

				// Language and Country
				//----------------------
				var icons = new Element('UL', {
					'class' : 'icons',
				});
				
				cloneLeftItem('[@id="lr_"]',icons);
				cloneLeftItem('[starts-with(@id,"lr_lang")]',icons);
				cloneLeftItem('[starts-with(@id,"ctr_country")]',icons);

				if(icons.hasChildNodes()) icons.inject(toolbar);


			
				// by Date ToolBar
				//-----------------
				var qdr = (URI.query.tbs.qdr ? URI.query.tbs.qdr : 'a');
				
				var rltm = (URI.query.tbs.rltm ? parseInt(URI.query.tbs.rltm) : 0);
									
				var url = URI.href;
				if(isTbs) {
					url = url.replace(/&?tbs=[^&]*|$/, '') 
						+ ('&tbs=' + URI.query._tbs.replace(RegExp(',?(rltm|qdr):.'),'') + ',').replace(/=,+/,'=');
				} else {
					url += '&tbs=';
				}

									
				var html = '<a class="rltm'+ (rltm ? ' on' : '') + '" '
						+	'href="'+ url + 'rltm:' + (rltm ? 0 : 1) + '" '
						+	'title="'+ LNG.last + ' ' + LNG.recents + (rltm ? ' '+LNG.enabled : '')
						+	'"></a>';
				
				var qdr_lst = {h:[LNG.hour,false], d:[LNG.day,false], w:[LNG.week,false], m:[LNG.month,false], y:[LNG.year,false]};					
				qdr = qdr.split('');
				if(qdr_lst[qdr[0]]) qdr_lst[qdr[0]][1]=true;
				for(var name in qdr_lst){
					var item = qdr_lst[name];
					html += '<a class="qdr_'+ name + (item[1] ? ' on' : '') + '" '
						+	'href="'+ url + 'qdr:' + (item[1] ? 'a' : name) + '" '
						+	'title="'+ LNG.last + ' ' + item[0] + (item[1] ? ' '+LNG.enabled : '')
						+	'"></a>';
				};
				
				new Element('div', {
					'class' : 'icons',
					'html'	: html
				}).inject(toolbar);
				

				// Result Type
				//----------------------
				var icons = new Element('UL', {
					'class' : 'icons',
				});
				
				cloneLeftItem('[@id="sts_"]',icons);
				cloneLeftItem('[@id="img_1"]',icons);
				cloneLeftItem('[@id="sts_1"]',icons);
				cloneLeftItem('[@id="clir_1"]',icons);
				
				if(icons.hasChildNodes()) icons.inject(toolbar);

				

				//"Search in:"  ToolBar
				//---------------------
				var value = (URI.query.as_occt ? URI.query.as_occt : 'any');
			
				var url = URI.href;
				url = url.replace(/&?as_occt=[^&]*|$/g, '');
				
				var list = {title:[LNG.title,false], body:[LNG.text,false], url:[LNG.url,false], links:[LNG.links,false]};
				if(list[value]) list[value][1]=true;
				var html = '';
				for(var name in list){
					var item = list[name];
					html += '<a class="' + name + (item[1] ? ' on' : '') + '" '
						+	'href="' + url
						+	'&as_occt=' + (item[1] ? 'any' : name) + '" '
						+	'title="' + LNG.search_in + ' ' + item[0] + (item[1] ? ' '+LNG.enabled : '')
						+	'"></a>';
				};
				
				new Element('div', {
					'class' : 'icons',
					'html'	: html
				}).inject(toolbar);
				

				// Video ToolBar
				//*****************
				if(URI.query.tbs.vid){
				
					// Duration
					var icons = new Element('UL', {
						'class' : 'icons',
					});
					cloneLeftItem('[@id="dur_"]',icons);
					cloneLeftItem('[@id="dur_s"]',icons);
					cloneLeftItem('[@id="dur_m"]',icons);
					cloneLeftItem('[@id="dur_l"]',icons);
					if(icons.hasChildNodes()) icons.inject(toolbar);
					
					// Quality
					var icons = new Element('UL', {
						'class' : 'icons',
					});
					cloneLeftItem('[@id="hq_"]',icons);
					cloneLeftItem('[@id="hq_h"]',icons);
					if(icons.hasChildNodes()) icons.inject(toolbar);
					
					// Subtitles
					var icons = new Element('UL', {
						'class' : 'icons',
					});
					cloneLeftItem('[@id="cc_"]',icons);
					cloneLeftItem('[@id="cc_1"]',icons);
					if(icons.hasChildNodes()) icons.inject(toolbar);
					
				}
				
				
				// Sorted By
				//-----------
				var icons = new Element('UL', {
					'class' : 'icons',
				});
				cloneLeftItem('[@id="clue_"]',icons);
				cloneLeftItem('[@id="tl_1"]',icons);
				cloneLeftItem('[@id="sbd_"]',icons);
				cloneLeftItem('[@id="sbd_1"]',icons);
				if(icons.hasChildNodes()) icons.inject(toolbar);
				
				
				var sft = $nd('//div[@class="tsf-p"]//table') || $nd('//input[@name="q"]');
				sft.parentNode.insertBefore(toolbar, sft);
				
				$id('gfx-safemode').addEvent('click', setSafeMode);

			}

			
			// +(.mp3|.wma|.wav) intitle:"Index of" intext:"Parent Directory" -inurl:(.htm|.html|.asp|.php) -listen77 -idmusic -airmp3 -shexy -vmp3

			// Fix Header
			//-------------
			if(GFX.bMnuFix)
			{
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				';
			}
			
			//  SideBar Feature
			//---------------------------------
			if(GFX.bSidebar) {
				
				var GFX_Sidebar = function() {
							
					var gfxSidebar = new Element('div', {
						'id'	: 'gfx-sidebar'
					});
					
					var res = $nd( (GFX.rCols == 1 ? '//*[@id="center_col"]|//*[@id="res"]' : '//*[@id="ires"]') );
					gfxSidebar.inject(res||body, 'top');

					
					var closeSidebarBox = function(ev){
						var target = ev.target;
						var name = ev.target.getAttribute('alt');
						AlertBox.confirm('<span style="font-size:16pt;">'+name+'</span><br/><span style="font-size:12pt;">'+LNG.ui_ask_for_disabling+'</span>', {
							onComplete:
								function(isOk) {
									if (isOk) {
										$id(ev.target.parentNode).destroy();
										GM_setValue('GFX.rSbar.'+name, false);
									}
								},
							textBoxBtnOk: LNG.yes,
							textBoxBtnCancel: LNG.no
						});
					}
					
					
					var Sidebar = {
						// filters
						filters: function()
						{
							if(!hasSomeFilter) return;
							
							var box = new Element('div', {
								'id' : 'gfx-sbar-filters',
								'class' : 'box',
								'html'	: '<h3 class=r>'+LNG.filters+'</h3><div id=gfx-filters-holder></div>'
							}).inject(gfxSidebar);
							
						},
						// Blogs
						blogs: function()
						{
							if (URI.query.tbs.blg) return;
							var node = $nd('//*[@id="res"]//a[starts-with(@href,"http://blogsearch.google.") or contains(@href,"oi=blogsearch")]/ancestor::*[starts-with(@class,"g")]');
							if (!node) return;
							var title = node.getElementsByTagName('h3')[0];
							if(title){
								title.innerHTML = title.innerHTML.replace(/\s[^\s]+\s<.+$/,'');
								with(title.style){
									backgroundColor = '#b97';
									borderColor = '#964';
									backgroundPosition = '0px -72px';
								}
							}
							node.id='gfx-sbar-blogs';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'blogs'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
						},
						// Books
						books: function()
						{
							if (URI.query.tbs.bks) return;
							var nodes = doc.evaluate('//*[@id="res"]//a[starts-with(@href,"http://books.google.")]/ancestor::li', doc.body, null, 7, null);
							if (!nodes || !nodes.snapshotLength) return;
							var box;
							if( !(box=$id('gfx-sbar-books')) )
							{
								box = new Element('div', {
									'id'	: 'gfx-sbar-books',
									'class' : 'box',
									'html'	: '<h3 class=r>'+LNG.books+'</h3>'
									}).inject(gfxSidebar);
								var bclose = new Element('span',{
									'class'		: 'gfx-icon_tb i_close',
									'title'		: LNG.close,
									'alt'		: 'books'
								});
								bclose.addEvent('click',closeSidebarBox);
								box.grab(bclose, 'top');
							}
							for(var i=0,len=nodes.snapshotLength; i<len; i++)
							{
								var el = nodes.snapshotItem(i);
								try{
									var a = el.getElementsByTagName('a')[0];
									var url = a.href.replace(/&.+/,'');
									new Element('a',{
										'class'	:'gfx-thumb',
										'href'	:a.href,
										'html'	:'<img src="'+url+'&printsec=frontcover&img=1&zoom=5&img=1&zoom=5&edge=curl" />'
									}).inject(a.parentNode,'before');
								}catch(e){}
								box.appendChild(el);
							}
						},
						// Calc
						calc: function()
						{
							var node = $nd('//*[@id="res"]//table//img[@src="/images/calc_img.gif"]/ancestor::table');
							if (!node) return;
							var box;
							if( !(box=$id('gfx-sbar-calc')) )
							{
								box = new Element('div', {
									'id'	: 'gfx-sbar-calc',
									'class' : 'box',
									'html'	: '<h3 class=r>'+LNG.calc+'</h3>'
									}).inject(gfxSidebar);
								var bclose = new Element('span',{
									'class'		: 'gfx-icon_tb i_close',
									'title'		: LNG.close,
									'alt'		: 'calc'
								});
								bclose.addEvent('click',closeSidebarBox);
								box.grab(bclose, 'top');
							}
							box.appendChild(node);
						},
						// Images
						images: function()
						{
							var node = $nd('//*[@id="res"]//a[starts-with(@href,"http://images.google.")]/ancestor::div[starts-with(@class,"g")] | //*[@id="res"]//a[starts-with(@href,"http://images.google.")]/ancestor::li | //div[@id="iur"]/ancestor::li');
							if (!node) return;
							var title = node.getElementsByTagName('h3')[0];
							if(title) title.innerHTML = title.innerHTML.replace(/\s[^\s]+\s<.+$/,'');
							node.id='gfx-sbar-images';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'images'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
							var images = doc.evaluate('//div[@id="gfx-sidebar"]//div[@id="iur"]//a', doc.body, null, 7, null);
							var len = images.snapshotLength;
							while(len--) {
								var lnk = images.snapshotItem(len);
								lnk.href = lnk.href.replace(/^.+imgurl=([^&]+).+$/,'$1');
								lnk.target = GFX.rTrgLnk;
							}
						},
						// Maps
						maps: function(){
							var node = $nd('//*[@id="res"]//a[starts-with(@href,"http://maps.google.")]/ancestor::li');
							if (!node) return;
							node.id='gfx-sbar-maps';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'maps'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
							var el = node.getElement('.r');
							node.insertBefore(el, node.firstChild);
						},
						// Movie
						movies: function()
						{
							var node = $nd('//*[@id="res"]//form[@action="/movies"]/ancestor::div[@class="e"]');
							if (!node) return;
							node.id = "gfx-sbar-movies";
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'movies'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
						},
						// News
						news: function()
						{
							if (URI.query.tbs.nws) return;
							var node = $nd('//*[@id="res"]//a[starts-with(@href,"http://news.google.")]/ancestor::li');
							if (!node) return;
							var title = node.getElementsByTagName('h3')[0];
							if(title) title.innerHTML = title.innerHTML.replace(/\s[^\s]+\s<.+$/,'');
							node.id='gfx-sbar-news';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'news'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
						},
						// Recents
						recents: function()
						{
							var node = $nd('//*[@id="rtr"]/ancestor::li[starts-with(@class,"g")]');
							if (!node) return;
							node.id = "gfx-sbar-recents";
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'recents'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
							STYLES += '\
							';
						},
						// Related Bottom
						related_bottom: function()
						{
							var node = $id('brs') || $nd('//*[@id="brs"]') || $nd('//*[@id="tbt5"]//ol');
							if (!node) return;
							var title = node.getElementsByTagName('caption')[0];
							if(title) title.innerHTML = title.innerHTML.replace(/\s[^\s]+\s<.+$/,'');
							node.id='gfx-sbar-brs';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'related'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
							STYLES += '\
								#tbt5 {\
									display				: none;\
								}\
							';
						},
						// Related Top
						related_top: function()
						{
							var node = $id('trev') || $nd('//*[@id="trev"]');
							if (!node) return;
							node.id='gfx-sbar-trev';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'related'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
						},
						// Translate
						translate: function()
						{
							var node = $nd('//*[@id="res"]//a[starts-with(@href,"http://translate.google.") and contains(@href,"/translate_s")]/ancestor::li');
							if (!node) return;
							node.id='gfx-sbar-trans';
							node.addClass('box');
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'translate'
							});
							bclose.addEvent('click',closeSidebarBox);
							node.grab(bclose, 'top');
							gfxSidebar.appendChild(node);
						},
						// Twitter
						twitter: function()
						{
							var box = new Element('div', {
									'id'	: 'gfx-sbar-twitter',
									'class' : 'box',
									'html'	: '<div id=gfx-sbar-twitter-box></div>'
								}).inject(gfxSidebar);
							var bclose = new Element('span',{
								'class'		: 'gfx-icon_tb i_close',
								'title'		: LNG.close,
								'alt'		: 'twitter'
							});
							bclose.addEvent('click',closeSidebarBox);
							box.grab(bclose, 'top');
							new TWTR.Widget({
								id:'gfx-sbar-twitter-box',
								version: 2,
								type: "search",
								search: INPUT.q,
								interval: 10000,
								title: "",
								subject: INPUT.q.replace(/\+/g,' '),
								width: 'auto',
								height: 300,
								theme: {
									shell: {
										background: "#2785b0",
										color: DB.css.body.backgroundColor||"#ffffff"
									},
									tweets: {
										background: DB.css.resbox.backgroundColor||"#ffffff",
										color: DB.css.desc.color||DB.css.resbox.color||"#444444",
										links: DB.css.titles.color||"#1985b5"
									}
								},
								features: {
									scrollbar: true,
									loop: false,
									live: true,
									hashtags: true,
									timestamp: true,
									avatars: true,
									behavior: "all"
								}
							}).render().start();
						},
						// Videos
						video: function()
						{
							if(URI.query.tbs.vid) return;
							var nodes = doc.evaluate('//*[@id="res"]//a[starts-with(@class,"l")][starts-with(@href,"http://video.google.")]/ancestor::li', doc.body, null, 7, null);
							if (!nodes || !nodes.snapshotLength) return;
							var box;
							if( !(box=$id('gfx-sbar-video')) )
							{
								box = new Element('div', {
									'id'	: 'gfx-sbar-video',
									'class'	: 'box',
									'html'	: '<h3 class=r>'+LNG.video+'</h3>'
								}).inject(gfxSidebar);
								var bclose = new Element('span',{
									'class'		: 'gfx-icon_tb i_close',
									'title'		: LNG.close,
									'alt'		: 'video'
								});
								bclose.addEvent('click',closeSidebarBox);
								box.grab(bclose, 'top');
							}
							
							for(var i=0,len=nodes.snapshotLength; i<len; i++)
							{
								var el = nodes.snapshotItem(i);
								var title = $id(el).getElement('A[class="l"]');
								if(title) title.innerHTML = title.innerHTML.replace(/_/g,' ');
								box.appendChild(el);
							}
						},
						// Wikipedia
						wikipedia: function()
						{
							if( INPUT.site && /wikipedia/i.test(INPUT.site) ) return;
							var nodes = doc.evaluate('//*[@id="res"]//a[contains(@href,".wikipedia.org/wiki")]/ancestor::li', doc.body, null, 7, null);
							if (!nodes || !nodes.snapshotLength) return;
							
							var box;
							if( !(box=$id('gfx-sbar-wiki')) )
							{
								box = new Element('div', {
									'id'	: 'gfx-sbar-wiki',
									'class'	: 'box',
									'html'	: '<h3 class=r>Wikipedia</h3>'
								}).inject(gfxSidebar);
								var bclose = new Element('span',{
									'class'		: 'gfx-icon_tb i_close',
									'title'		: LNG.close,
									'alt'		: 'wikipedia'
								});
								bclose.addEvent('click',closeSidebarBox);
								box.grab(bclose, 'top');
							}

							for(var i=0,len=nodes.snapshotLength; i < len; i++)
							{
								var el = nodes.snapshotItem(i);
								el.className = '';
								try{
									var a = el.getElementsByTagName('H3')[0].getElementsByTagName('A')[0];
									a.innerHTML = a.innerHTML.replace(/- Wikipedia.*/,'');
								}catch(e){}
								box.appendChild(el);
								box.appendChild(doc.createElement('br'));
							}
						},
						// WonderWheel
						wonderwheel: function()
						{
							if(!URI.query.tbs.ww) return;
							
							var node = $id('wonderwheel');
							if (!node) return;

							var box = new Element('div', {
								'id' : 'gfx-sbar-ww',
								'class' : 'box'
							}).inject(gfxSidebar);
							box.grab(node);

							STYLES += '\
								#gfx-sbar-ww {\
									display			: block;\
									text-align		: center;\
								}\
							';
						},
						// YouTube
						youtube: function()
						{
							if(SUBSERVICE=='video') return;
							if( INPUT.site && /youtube/i.test(INPUT.site) ) return;
							var nodes = doc.evaluate('//*[@id="res"]//a[starts-with(@class,"l")][starts-with(@href,"http://www.youtube.com/watch")]/ancestor::li', doc.body, null, 7, null);
							if (!nodes || !nodes.snapshotLength) return;
							var box;
							if( !(box=$id('gfx-sbar-youtube')) )
							{
								box = new Element('div', {
									'id'	: 'gfx-sbar-youtube',
									'class'	: 'box',
									'html'	: '<h3 class=r>YouTube</h3>'
								}).inject(gfxSidebar);
								var bclose = new Element('span',{
									'class'		: 'gfx-icon_tb i_close',
									'title'		: LNG.close,
									'alt'		: 'youtube'
								});
								bclose.addEvent('click',closeSidebarBox);
								box.grab(bclose, 'top');
							}
							
							for(var i=0,len=nodes.snapshotLength; i < len; i++)
							{
								var el = nodes.snapshotItem(i);
								var title = $id(el).getElement('A[class="l"]');
								if(title) title.innerHTML = title.innerHTML.replace(/_/g,' ');
								box.appendChild(el);
							}
						}
					};
					Sidebar.related = function(){
						Sidebar.related_top();
						Sidebar.related_bottom();
					};
					
					Sidebar.wonderwheel();
					
					Sidebar.filters();
					
					if(GFX.rSbar.calc) Sidebar.calc();
					
					if(GFX.rSbar.related) Sidebar.related();
					
					if(GFX.rSbar.movies) Sidebar.movies();
					
					if(GFX.rSbar.recents) Sidebar.recents();
					
					if(GFX.rSbar.images) Sidebar.images();
					
					if(GFX.rSbar.youtube) Sidebar.youtube();
					
					if(GFX.rSbar.video) Sidebar.video();
					
					if(GFX.rSbar.maps) Sidebar.maps();
					
					if(GFX.rSbar.blogs) Sidebar.blogs();
					
					if(GFX.rSbar.news) Sidebar.news();
					
					if(GFX.rSbar.books) Sidebar.books();
					
					if(GFX.rSbar.wikipedia) Sidebar.wikipedia();
					
					if(GFX.rSbar.translate) Sidebar.translate();
					
					if(GFX.rSbar.twitter && !isChrome) Sidebar.twitter();
				
					
					// Google Ads
					if(!GFX.rNoAds){
						var node = $id('mbEnd') || $nd('//*[@id="mbEnd"]');
						if(node) gfxSidebar.appendChild(node);
						var node = $nd('//*[@id="rhs"]');
						if(node) gfxSidebar.appendChild(node);
					}
					
				}
				GFX_Sidebar();
			} // end RightBox
			
			
			//  Filters
			//--------------------------
			var holder = $id('gfx-filters-holder') || $nd('//*[@id="subform_ctrl"]') || $nd('//*[@id="prs"]');
			var html = '<TABLE>';
			if(INPUT.site){
				html += '<TR><TD style="font-size:12px;"><b>' + LNG.sites + ':</b></TD><TD>';
				for(var i=0,len=INPUT.site.length; i<len; i++){
					var oneLess	= INPUT.site[i].replace(/\/$/,'').split('/');
					var title	= oneLess.slice(0,oneLess.length-1).join('/');
					oneLess		= oneLess.slice(0,oneLess.length).join('/');
					html += INPUT.site[i] + '<a class="-sf" style="float:none;vertical-align:middle;" onmouseup="siteFilter(\''+ oneLess +'\',event);return !1;" title="'+ LNG.one_level_up +': '+ title +'"></a><br/>';
				}
				html += '</TD></TR>';
			}
			if(INPUT.intitle || INPUT.allintitle){
				var filters = (INPUT.intitle||[]).concat(INPUT._intitle||[]).concat(INPUT.allintitle||[]);
				var html = '<TR><TD style="font-size:12px;"><b>' + LNG.in_+' '+LNG.title + ':</b></TD><TD>';
				for(var i=0,len=filters.length; i<len; i++){
					html += filters[i] + '<a class="title" style="float:none;vertical-align:middle;" href="" title=""></a><br/>';
				}
				html += '<TD></TR>';
			}
			html += '</TABLE>';
			holder.innerHTML = html;
			
			
			// Auto Streaming Pages
			// -----------------------------
			if (GFX.rAutoPag){
				AutoPaged( {
					holder	: '//*[@id="ires"]/child::ol | //*[@id="rso"] | //*[@id="res"]//ol',
					content	: '//*[@id="ires"]/child::ol//li | //*[@id="rso"]//li | //*[@id="res"]//ol//li'
				} );
			}
		} // END hasSomeQuery
	}


	// ==============================================================================================================
	//                                                I M A G E S  -  ( 01 )
	// ==============================================================================================================
	else if (canRun.images) {

		if(hasSomeQuery){
		
			var tsf = $id('tsf') || $nd('//*[@id="tsf"]') || $nd('//form[@name="gs"]');
			if(tsf) gfxHeadContent.appendChild(tsf);
		
			var tbs = $nd('//input[@name="tbs"]');
			if (!tbs)
			{
				new Element('input', {
					'name'	: 'tbs',
					'value'	: '',
					'type'	: 'hidden'
				}).inject(FORM||body);
			}		

			//-------------------------------------------------------
			//   T O O L B A R
			//-------------------------------------------------------
			if(GFX.bToolbar) {
			
				var toolbar = new Element('div', {
					'id'	: 'gfx-toolbar'
				});
		
				//  SafeMode
				//-----------------
				var isSafeOff = (URI.query.safe && URI.query.safe == 'off') || (GFX.rPrefs.safe == 'off');
				var value = (isSafeOff ? 'off' : 'images');

				var url = URI.href;
				url = url.replace(/&?safe=[^&]*|$/, '');
				
				var setSafeMode = function(){
					GFX.rPrefs.safe = this.className=='images' ? 'images': 'off';
					GM_setValue('GFX.Prefs.safe', GFX.rPrefs.safe);
				};

				toolbar.grab(new Element('div',{
					'class'	: 'icons safemode',
					'html'	: '<a id=gfx-safemode class=' + (isSafeOff ? 'off' : 'images') + ' href="' + url + '&safe=' + (isSafeOff ? 'images' : 'off')+'" title="'+LNG.safemode+' '+(isSafeOff ? LNG.disabled : LNG.enabled)+'"></a>'
				}));
				
			
			
				// Content Type
				//--------------------
				var value = URI.query.tbs.itp || '';
				new Element('UL' ,{
					'class'	: 'icons',
					'html'	: '<LI class="photo'+ (value=='photo' ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?itp:[^,]*|$/i,\'\')+\',itp:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.photos	+ '"></LI>'
					+ '<LI class="clipart' + (value=='clipart'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?itp:[^,]*|$/i,\'\')+\',itp:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.cliparts	+'"></LI>'
					+ '<LI class="lineart' + (value=='lineart'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?itp:[^,]*|$/i,\'\')+\',itp:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.linearts+'"></LI>'
					+ '<LI class="news' 	+ (value=='news'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?itp:[^,]*|$/i,\'\')+\',itp:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.news+'"></LI>'
					+ '<LI class="face' 	+ (value=='face'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?itp:[^,]*|$/i,\'\')+\',itp:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.faces+'"></LI>'
				}).inject(toolbar);
				

				// Aspect Ratio
				//--------------------
				var value = URI.query.tbs.iar || '';
				new Element('UL' ,{
					'class'	: 'icons',
					'html'	: '<LI class="t'+ (value=='t' ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?iar:[^,]*|$/i,\'\')+\',iar:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.tall	+ '"></LI>'
					+ '<LI class="s' + (value=='s'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?iar:[^,]*|$/i,\'\')+\',iar:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.square	+'"></LI>'
					+ '<LI class="w' + (value=='w'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?iar:[^,]*|$/i,\'\')+\',iar:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.wide+'"></LI>'
					+ '<LI class="xw' 	+ (value=='xw'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?iar:[^,]*|$/i,\'\')+\',iar:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.panoramic+'"></LI>'
				}).inject(toolbar);
				
			
				// File Type
				//-------------
				var value = URI.query.tbs.ift || '';
				new Element('UL' ,{
					'class'	: 'icons',
					'html'	: '<LI class="jpg'+ (value=='jpg' ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ift:[^,]*|$/i,\'\')+\',ift:\'+this.className; f.submit();return false;"'
					+	'title=".JPG"></LI>'
					+ '<LI class="png' + (value=='png'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ift:[^,]*|$/i,\'\')+\',ift:\'+this.className; f.submit();return false;"'
					+	'title=".PNG"></LI>'
					+ '<LI class="gif' + (value=='gif'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ift:[^,]*|$/i,\'\')+\',ift:\'+this.className; f.submit();return false;"'
					+	'title=".GIF"></LI>'
					+ '<LI class="bmp' 	+ (value=='bmp'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ift:[^,]*|$/i,\'\')+\',ift:\'+this.className; f.submit();return false;"'
					+	'title=".BMP"></LI>'
				}).inject(toolbar);
				
			
				// Color Type
				//-------------
				var value = URI.query.tbs.ic || '';
				new Element('UL' ,{
					'class'	: 'icons',
					'html'	: '<LI class="color'+ (value=='color' ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ic:[^,]*|$/i,\'\')+\',ic:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.color	+ '"></LI>'
					+ '<LI class="gray' + (value=='gray'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ic:[^,]*|$/i,\'\')+\',ic:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.grayscale	+'"></LI>'
					+ '<LI class="mono' + (value=='mono'  ? ' on' : '') +'" '
					+	'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?ic:[^,]*|$/i,\'\')+\',ic:\'+this.className; f.submit();return false;"'
					+	'title="'	+ LNG.mchrome+'"></LI>'
				}).inject(toolbar);
					
			

				// Image Color
				//---------------------
				var isc = URI.query.tbs.isc || '';
				var onclick = 'onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?(ic|isc):[^,]*|$/ig,\'\')+\',ic:specific,isc:\'+this.getAttribute(\'rel\'); f.submit();return false;"';
				
				// Color 1
				toolbar.grab(new Element('div', {
					'class'		: 'imgcolor',
					'title'		: LNG.color+' 1',
					'onclick'	: 'gooSC(event)',
					'style'		: 'display:inline-block;',
					'html'		: '\
						<div class="sc-icon '+(isc.length?'sc-hide':'sc-show')+'" style="background-color:'+(isc.length?isc:'transparent')+';">\
							<div style="background-color:#c33;"></div>\
							<div style="background-color:#e6ba40;"></div>\
							<div style="background-color:#155eb1;"></div>\
							<div style="background-color:#109618;"></div>\
						</div>\
						<span style="float:left;"><small>&#9660;</small></span>'
					}).grab(new Element('div', {
						'id'	: 'sc-dropdown',
						'html'	: '\
						<div class=sc-block style="width:145px">\
							<div><span rel="red" '+onclick+' style="background:#c00" title="Red"></span></div>\
							<div><span rel="orange" '+onclick+' style="background:#fb940b" title="Orange"></span></div>\
							<div><span rel="yellow" '+onclick+' style="background:#ff0" title="Yellow"></span></div>\
							<div><span rel="green" '+onclick+' style="background:#0c0" title="Green"></span></div>\
							<div><span rel="teal" '+onclick+' style="background:#03c0c6" title="Teal"></span></div>\
							<div><span rel="blue" '+onclick+' style="background:#00f" title="Blue"></span></div>\
							<div><span rel="purple" '+onclick+' style="background:#762ca7" title="Purple"></span></div>\
							<div><span rel="pink" '+onclick+' style="background:#ff98bf" title="Pink"></span></div>\
							<div><span rel="brown" '+onclick+' style="background:#885418" title="Brown"></span></div>\
							<div><span rel="white" '+onclick+' style="background:#fff" title="White"></span></div>\
							<div><span rel="gray" '+onclick+' style="background:#999" title="Gray"></span></div>\
							<div><span rel="black" '+onclick+' style="background:#000" title="Black"></span></div>\
							<div><span class=color onclick="var f=doc.forms[0];f.tbs.value=f.tbs.value.replace(/,?(ic|isc):[^,]*|$/ig,\'\'); f.submit();return false;" style="background:transparent" title="Black"></span></div>\
						</div>'
				})));
			
			
				// Size Bar
				//----------------
				var isz = URI.query.tbs.isz || '';
				var islt = URI.query.tbs.islt || '';

				new Element('div', {
					'class'	: 'icons',
					'html'	: '\
						<span class="isz"></span>\
						<select onchange="var f=doc.forms[0];var val=this.options[this.selectedIndex].value;if(val==\'ex\'){doc.getElementById(\'exactsize\').style.display=\'inline-block\';return false;}f.tbs.value = f.tbs.value.replace(/,?(isz|islt|iszw|iszh):[^,]*|$/ig,\'\')+ \',\' +(val.length>1?\'isz:lt,islt\':\'isz\')+ \':\' + val; f.submit();return false;">\
						<option value="">'	+ LNG.size +'</option>\
						<option value="ex"'	+ (isz=='ex'? ' selected':'') +'>'	+ LNG.custom	+'</option>\
						<option value="i"'	+ (isz=='i'	? ' selected':'') +'>'	+ LNG.icon		+'</option>\
						<option value="s"'	+ (isz=='s'	? ' selected':'') +'>'	+ LNG.avatars	+'</option>\
						<option value="m"'	+ (isz=='m'	? ' selected':'') +'>'	+ LNG.medium	+'</option>\
						<option value="l"'	+ (isz=='l'	? ' selected':'') +'>'	+ LNG.large		+'</option>\
						<option value="qsvga"'	+ (islt=='qsvga'? ' selected':'') +'>&gt; 400x300</option>\
						<option value="vga"'	+ (islt=='vga'	? ' selected':'') +'>&gt; 640x480</option>\
						<option value="svga"'	+ (islt=='svga'	? ' selected':'') +'>&gt; 800x600</option>\
						<option value="xga"'	+ (islt=='xga'	? ' selected':'') +'>&gt;  1 mp</option>\
						<option value="2mp"'	+ (islt=='2mp'	? ' selected':'') +'>&gt;  2 mp</option>\
						<option value="4mp"'	+ (islt=='4mp'	? ' selected':'') +'>&gt;  4 mp</option>\
						<option value="6mp"'	+ (islt=='6mp'	? ' selected':'') +'>&gt;  6 mp</option>\
						<option value="8mp"'	+ (islt=='8mp'	? ' selected':'') +'>&gt;  8 mp</option>\
						<option value="10mp"'	+ (islt=='10mp'	? ' selected':'') +'>&gt; 10 mp</option>\
						<option value="12mp"'	+ (islt=='12mp'	? ' selected':'') +'>&gt; 12 mp</option>\
						<option value="15mp"'	+ (islt=='15mp'	? ' selected':'') +'>&gt; 15 mp</option>\
						<option value="20mp"'	+ (islt=='20mp'	? ' selected':'') +'>&gt; 20 mp</option>\
						<option value="40mp"'	+ (islt=='40mp'	? ' selected':'') +'>&gt; 40 mp</option>\
						<option value="70mp"'	+ (islt=='70mp'	? ' selected':'') +'>&gt; 70 mp</option>\
						</select>\
						'
				}).inject(toolbar);
				

				// Exact Size
				if(URI.query.tbs.iszw && URI.query.tbs.iszw != ''){
					STYLES += '#gfx-toolbar #exactsize{display:inline-block;}';
				}
				
				var iszw  = URI.query.tbs.iszw ? URI.query.tbs.iszw : '';
				var iszh = URI.query.tbs.iszh ? URI.query.tbs.iszh : '';
				
				new Element('div', {
					'id'		: 'exactsize',
					'html'		: '\
						<input id=iszw size=3 type=text title="'+ LNG.width  +'" value="'+ (iszw||'') +'"> x\
						<input id=iszh size=3 type=text title="'+ LNG.height +'" value="'+ (iszh||'') +'">\
						<input type=button value="&gt;&gt;" onclick="var f=doc.forms[0];var w=doc.getElementById(\'iszw\').value;var h=doc.getElementById(\'iszh\').value;if(h==\'\')h=w;if(w==\'\')w=h; f.tbs.value=f.tbs.value.replace(/,?(isz|islt|iszw|iszh):[^,]*|$/ig,\'\') +  \',isz:ex,iszw:\' + w + \',iszh:\' + h; f.submit();return false;">'
				}).inject(toolbar);
				
				
			
			
				var sft = $nd('//*[@id="tsf"]//div[@class="tsf-p"]//table') || $nd('//*[@id="sff"]//table') || $nd('//*[@id="sft"]//table//td[@class="tc"]') || $nd('//input[@name="q"]');
				sft.parentNode.insertBefore(toolbar, sft);
			
				$id('gfx-safemode').addEvent('click', setSafeMode);
			
			} // END Image Bar Section


			//  Site Filter
			//--------------------------
			if(INPUT.site){
				var table = $nd('//TD[@id="resultStats"]/ancestor::TABLE');
				if(table){
					var td = (new Element('tr')).grab(new Element('td'));
					var html = '<span style="font-size:14px;"><b>' + LNG.only + ': ';
					var len = INPUT.site.length;
					for(var i=0; i<len; i++){
						var oneLess = INPUT.site[i].replace(/\/$/,'').split('/');
						var title = oneLess.slice(0,oneLess.length-1).join('/');
						oneLess = oneLess.slice(0,oneLess.length).join('/');
						html += INPUT.site[i] + '<a class="-sf" style="float:none;vertical-align:middle;" onmouseup="siteFilter(\''+oneLess+'\',event);return !1;" title="'+LNG.one_level_up+': '+title+'"></a>';
					}
					td.innerHTML = html + '</b></span>';
					table.grab(td);
				}
			}
			
			// Add Other Images Searches
			//-------------------------------------
			addSearchers( (gfxHeadContent || $id('ImgCont').previousSibling), SERVICE);

			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				STYLES += '\
				BODY,\
				#rg_hp,\
				#rg_h {\
					margin-top			: '+ (gfxHeader.offsetHeight) +'px !important;\
				}\
				';
			}
			
			
			// Upgrade Dynamic Update
			// --------------------------------
			if (win.dyn && win.dyn.updateNavbar){
				win.dyn._updateNavbar = win.dyn.updateNavbar;
				win.dyn.updateNavbar = function(){
					win.dyn._updateNavbar();
					resCounter=0;
					win.setTimeout(function(){eval('processImages();');},500);
				};
				var rp = $nd('//*[@id="rptgl"]');
				if(rp){
					rp.style.display = 'inline-block';
					rp.addEvent('click', win.dyn.updateNavbar);
				}
			}
			
			
			// Auto Streaming Pages
			// -----------------------------
			if(GFX.iAutoPag){
				AutoPaged( {
					holder	: '//*[@id="ImgContent"]',
					content	: '//*[@id="ImgContent"]'
				} );
			}
		}// End hasSomeQuery
	}


	// ==============================================================================================================
	//                                                N E W S  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.news)
	{
		// Header Feature
		//--------------------
		var guser = $nd('//*[contains(concat(" ",@class," ")," gaiaNav ")]');
		if(guser){
			guser.style.marginRight = "20px";
			gfxHeader.appendChild(guser);
		}
		var tsf = $id('page-header') || $id('search-header') || $id('browse-header');
		if(tsf) gfxHeadContent.appendChild(tsf);
	

		if(hasSomeQuery) {
			var o = $nd('//*[contains(concat(" ",@class," ")," leftnav ")]/following-sibling::*');
			if(o) o.className = 'rightnav';

			// Add Other News Searches
			//-------------------------------------
			addSearchers((gfxHeadContent || $nd('//*[contains(concat(" ",@class," ")," search-sub-header ")]')), SERVICE);

			// Auto Streaming Pages
			// -----------------------------
			if (GFX.rAutoPag){
				AutoPaged( {
					holder	: '//*[@id="main-table"]//table//td[contains(concat(" ",@class," ")," search-middle ")]',
					content	: '//*[@id="search-stories"]',
					nextLink: '//div[@id="pagination"]//td[last()]//a',
					prevLink: '//div[@id="pagination"]//td[1]//a'
				} );
			}
		}
		
		// Fix Header
		//-------------
		if(GFX.bMnuFix){
			try{
				$nd('//*[@class="sub-header"] | //*[@id="ssb"]').inject(gfxHeader);
			}catch(e){GM_log(e);}
			
			STYLES += '\
			BODY {\
				margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
			}\
			.sub-header {\
				width				: 98%;\
				margin-left			: 10px;\
			}\
			';
		}
		
	}

	// ==============================================================================================================
	//                                                  B O O K S -  ( 01 )
	// ==============================================================================================================
	else if(canRun.books)
	{
		if(hasSomeQuery){
			// Header Feature
			var tsf = $nd('//FORM[@name="gs"]/ancestor::table');
			if(tsf) {
				tsf.id = 'sft';
				gfxHeadContent.appendChild(tsf);
			}
			

			// Add Other Books Reviews
			//----------------------------------
			addSearchers( (gfxHeadContent || $id('results_bar')), SERVICE);
			
			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					$id('results_bar').inject(gfxHeader);
				}catch(e){GM_log(e);}
				
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				#results_bar {\
					width				: 98%;\
				}\
				';
			}

			// Auto Streaming Pages
			// -----------------------------
			if (GFX.rAutoPag){
				AutoPaged( {
					holder	: '//*[contains(concat(" ",@class," ")," scontentarea ")]',
					content	: '//*[contains(concat(" ",@class," ")," scontentarea ")]'
				} );
			}
		}
	}

	// ==============================================================================================================
	//                                          B L O G  S E A R C H  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.blogsearch)
	{
		if(hasSomeQuery){
		
			// Header Feature
			var tsf = $id('tsf') || $nd('//*[@id="tsf"]') || $nd('//*[@id="sft"]') || $nd('//form[@name="gs"]/ancestor::table');
			if(tsf) {
				tsf.id = 'sft';
				gfxHeadContent.appendChild(tsf);
			}

			
			// Add Other Blogs Searches
			//----------------------------------
			addSearchers( (gfxHeadContent || $nd('//TABLE[contains(concat(" ",@class," ")," ttt ")]')), SERVICE);

			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					( $nd('//table[@class="ttt"]') || $id('h') ).inject(gfxHeader);
				}catch(e){GM_log(e);}
				
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				#h, TABLE.ttt {\
					width				: 98%;\
				}\
				TABLE.ttt .ttb, TABLE.ttt .rsb,\
				#h .ttb, #h .rsb {\
					background-color	: transparent !important;\
				}\
				';
			}
			
			// Auto Streaming Pages
			// ----------------------------
			if (GFX.rAutoPag){
				AutoPaged( {
					holder	: '//*[@id="m"]',
					content	: '//div[contains(concat(" ",@class," ")," ln ")]/following-sibling::*'
				} );
			}
		}
	}

	// ==============================================================================================================
	//                                               G R O U P S  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.groups)
	{

		
		if(hasSomeQuery){
			// Header Feature
			//---------------------
			var tsf = $id('tsf') || $nd('//*[@id="tsf"]') || $nd('//*[@id="sft"]') || $nd('//form[@name="gs"]/ancestor::table');
			if(tsf) gfxHeadContent.appendChild(tsf);


			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					$nd('//table[starts-with(@class,"sb")]').inject(gfxHeader);
				}catch(e){GM_log(e);}
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				TABLE.sb {\
					width				: 98%;\
				}\
				';
			}
			
			// Auto Streaming Pages
			// ----------------------------
			var res = $id('res') || $nd('//*[@id="res"]');
			if(res) {
				var holder = doc.createElement('div');
				holder.id = 'gfx-holder';
				res.parentNode.insertBefore(holder, res);
				holder.appendChild(res);
				if (GFX.rAutoPag){
					AutoPaged( {
						holder	: '//div[@id="gfx-holder"]',
						content	: '//*[@id="res"]'
					} );
				}
			}
		}
	}
	
	// ==============================================================================================================
	//                                                S C H O L A R  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.scholar)
	{
		if(hasSomeQuery){
			// Header Feature
			//---------------------
			var tsf = body.getElementsByTagName('table')[0];
			if(tsf) {
				tsf.id = 'sft';
				gfxHeadContent.appendChild(tsf);
			}
			var resbar = $nd('//TABLE[@bgcolor="#dcf6db"]');
			if(resbar) resbar.addClass('sh-res-bar');
			
			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					$nd('//*[@class="sh-res-bar"]').inject(gfxHeader);
				}catch(e){GM_log(e);}
				
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				.sh-res-bar {\
					width				: 98%;\
				}\
				.sh-res-bar * {\
					background-color	: transparent;\
				}\
				';
			}
			
			// Auto Streaming Pages
			// -----------------------------
			/*
			if(GFX.rAutoPag){
				var holder = new Element('div',{'id' : 'gfx-holder'});
				var nav =$nd('//DIV[@class="n"]');
				if (nav){
					body.insertBefore(holder, nav);
					AutoPaged( {
						holder	: "//DIV[@id='gfx-holder']",
						content	: "//P[@class='g']",
						nextLink: "//DIV[@class='n']/descendant::a[last()]"
					} );
					nav.style.display = 'none';
				}
			}
			*/
		}
	}

	// ==============================================================================================================
	//                                               P R O D U C T S  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.products)
	{
		if(hasSomeQuery){
			// Header Feature
			//---------------------
			var tsf = body.getElementsByTagName('table')[0];
			if(tsf) {
				tsf.id = 'sft';
				gfxHeadContent.appendChild(tsf);
			}

			// Remove Top Sponsors
			//----------------------------
			var ads = $nd('//*[@id="ps-top-ads-sponsored"]');
			if(ads) ads.parentNode.parentNode.removeChild(ads.parentNode);
			
			// Add Other Products Searches
			//----------------------------------
			addSearchers( (gfxHeadContent || $id('ps-titlebar')), SERVICE);
			
			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					$id('ps-titlebar').inject(gfxHeader);
				}catch(e){GM_log(e);}
				
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				#search-input{\
					margin-left			: 0px !important;\
					margin-top			: 30px !important;\
				}\
				#ps-titlebar {\
					width				: 98%;\
				}\
				';
			}

			// Auto Streaming Pages
			// -----------------------------
			var results = $nd('//*[@id="results"]');
			if(results) {
				var holder = doc.createElement('div');
				holder.id = 'gfx-holder';
				results.parentNode.insertBefore(holder, results);

				var refhead = $nd('//*[@id="refinement-header"]');
				if(refhead) {
					var refitems = $nd('//*[@id="refinements"]');
					holder.appendChild(refhead);
					holder.appendChild(refitems);
				}
				
				holder.appendChild(results);
				
				if (GFX.rAutoPag){
					AutoPaged( {
						holder	: '//div[@id="gfx-holder"]',
						content	: '//*[@id="results"]'
					} );
				}
			}
		}
	}

	// ==============================================================================================================
	//                                                V I D E O S  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.video)
	{
		
		if(hasSomeQuery) {
			// Header Feature
			//---------------------
			var tsf = $id('videoheader') || $nd('//*[@id="videoheader"]') || $nd('//*[@class="table-header"]') || $nd('//form[@name="f"]/ancestor::table');
			if(tsf) gfxHeadContent.appendChild(tsf);
		
			// Add Other Video Searches
			//----------------------------------
			addSearchers( ( $id('videoheader')?$id('videoheader').lastChild:$id('resultsheadertable') ), SERVICE);
			
			// Fix Header
			//-------------
			if(GFX.bMnuFix){
				try{
					$id('results-bar').inject(gfxHeader);
				}catch(e){GM_log(e);}
				
				STYLES += '\
				BODY {\
					margin-top			: '+ (gfxHeader.offsetHeight+5) +'px !important;\
				}\
				#results-bar {\
					width				: 98%;\
				}\
				';
			}
			
			// Auto Streaming Pages 
			// -----------------------------
			if (GFX.rAutoPag){
				AutoPaged( {
					holder	: "//*[@id='search-results-main']",
					content	: "//*[@id='search-results']",
					nextLink: "//*[@id='main-pagi-next']",
					prevLink: "//*[@id='main-pagi-prev']"
				} );
			}
		}
		
	}

	// ==============================================================================================================
	//                                               T R A N S L A T E  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.translate)
	{
		var rbox = $id('result_box');
		if(rbox){
			try{
				var el = rbox.getElement('span');
				el.removeProperties('onmouseover', 'onmouseout');
			} catch(e){}
		}
		
		//var cb_langs = $id('old_sl');
		
	}

	// ==============================================================================================================
	//                                                     M A P S  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.maps || canRun.local)
	{

	}

	// ==============================================================================================================
	//                                                  O P T I O N S  -  ( 01 )
	// ==============================================================================================================
	else if (canRun.intl || canRun.options)
	{
		GFX.bMnuFix = false;

		var o = $nd('//td[@id="hc-links"]/font');
		if(!o){
			o = $id('0a') || $nd('//*[@id="0a"]');
			if(o) o = o.parentNode;
		}
		if(o) o.innerHTML = '';
	}

	// ==============================================================================================================
	//                                             P I C A S A W E B  -  ( 01 )
	// ==============================================================================================================
	else if(canRun.picasaweb)
	{

			
		// Relink Images
		//--------------------
		var isLH = URI.path[0]=='lh';
		var isAlbum = !isLH && URI.path[1] != undefined;

		if(isAlbum)
		{
			STYLES += '\
			BODY {\
				margin-top			: 0px !important;\
			}';
			
			SCRIPTS += '\
				function gfxRelink(el){\
					var href = el.firstChild.src.replace(/\\/s[0-9]{2,3}/,"");\
					el.href = href;\
					el.setAttribute("onmouseover", "gfxShowImg(event);");\
				};\
			';
			
			
			var doRelink = function(){
				var nodes = doc.evaluate('//A[@class="goog-icon-list-icon-link"]', doc.body, null, 7, null);
				for(var i=0,len=nodes.snapshotLength; i<len; i++) {
					var a = nodes.snapshotItem(i);
					a.setAttribute('onmouseover', 'gfxRelink(this);gfxShowImg(event);');
					a.setAttribute('onmouseout', 'gfxHideImg();');
				}
			};
			doRelink();
			
			// Image Preview
			//--------------------
			if(GFX.iPrev) 
			{
			SCRIPTS += 'var iPrevRT=' + GFX.iPrevRT + ';';
			SCRIPTS += '\
				var iPrevID;\
				var isPreview;\
				var iPrev = doc.createElement("div");\
				iPrev.id="gfx-iprev";\
				doc.body.appendChild(iPrev);\
				function gfxShowImg(ev){\
					if(isPreview) return false;\
					isPreview = true;\
					gfxHideImg();\
					var el = ev.target;\
					var w,h;\
					if(el.clientWidth > el.clientHeight){\
						w = 640;\
						h = parseInt(el.clientHeight*640/el.clientWidth);\
					}else{\
						w = parseInt(el.clientWidth*640/el.clientHeight);\
						h = 640;\
					}\
					var pos = {x:0,y:0};\
					var parent=el;\
					do{\
						pos.x += parent.offsetLeft;\
						pos.y += parent.offsetTop;\
					} while(parent=parent.offsetParent);\
					var width = Math.max(pos.x, doc.documentElement.clientWidth - pos.x) - 10;\
					var height = doc.documentElement.clientHeight-10;\
					if(w > width){var r=width/w; w=parseInt(w*r); h=parseInt(h*r);}\
					if(h > height){var r=height/h; w=parseInt(w*r); h=parseInt(h*r);}\
					iPrev.style.left = (pos.x-30 > w ? pos.x - w - 30 : pos.x + el.clientWidth + 10) + "px";\
					iPrev.style.bottom = parseInt((height - h)/2) + "px";\
					var img = doc.createElement("IMG");\
					img.onerror = function(){\
						iPrev.removeChild(img);\
						var sp = doc.createElement("span");\
						sp.className = "error";\
						sp.style.width = w + "px";\
						sp.style.height = parseInt((h+30)/2) + "px";\
						sp.style.paddingTop = parseInt((h-30)/2) + "px";\
						sp.innerHTML = "ERROR 404";\
						iPrev.appendChild(sp);\
					};\
					img.setAttribute("width", w);\
					img.setAttribute("height", h);\
					iPrev.appendChild(img);\
					var url = el.src ? el.src : el.firstChild.src;\
					url = url.replace(/\\/s[0-9]{2,3}/,"/s640");\
					iPrevID = window.setTimeout(function(){\
						img.src = url;\
						iPrev.style.display="block";\
					},iPrevRT);\
					return false;\
				};\
				function gfxHideImg(){\
					isPreview = false;\
					window.clearTimeout(iPrevID);\
					if(!iPrev.firstChild) return;\
					iPrev.removeChild(iPrev.firstChild);\
					iPrev.style.display="none";\
					return false;\
				};\
				';
			}

		}

	}

	try{
		STYLES += '\
			#leftnav {\
				margin-top			: '+ gfxHeader.offsetHeight +'px;\
			}\
		';
	}catch(e){}
	
	// Add Second Level of Styles
	addStyle( STYLES );
	


	// ==============================================================================================================
	//                                             G O O G L E    S U G G E S T
	// ==============================================================================================================
	if(canRun.gSuggest && !(canRun.maps || canRun.local) ){

		var qInput = $nd('//input[@name="q"]');
		
		if(qInput){
		qInput.setAttribute("size","50");
		qInput.setAttribute("autocomplete","off");
		qInput.autocomplete = "off";
		
		SCRIPTS += '\
		function doSecond() {\
			var iquery=doc.evaluate(\'//input[@name="q"]\',doc.body,null,9,null).singleNodeValue;\
			if(!window.google){\
				window.google={};\
			}\
			else if( window.google.ac ){\
				window.google.ac = function(){};\
				var target = iquery.parentNode;\
				var qClone = iquery.cloneNode(true);\
				target.replaceChild(qClone, iquery);\
				iquery = qClone;\
				iquery.setAttribute("size","50");\
				iquery.setAttribute("autocomplete","off");\
				iquery.autocomplete = "off";\
				iquery.focus();\
				iquery.className = iquery.className+" selected";\
			};\
			(function(){\
			var form, input, table, qVal, curVal, lastVal, reqVal="";\
			var args = "";\
			var data=null, curRow=null;\
			var row=-1, isVisible=0, isOver=0;\
			var head=doc.getElementsByTagName("head")[0];\
			var domainURL="http://clients1.google.com";\
			var pathURL="/complete/search?hl=";\
			var lngFixer = {nl:"de", nn:"no"};\
			var lang = (doc.location.search.match(/hl=([^&]*)|$/i)[1] || (window.google.kHL ? window.google.kHL : "en")).toLowerCase();\
			var sortByRes=false;\
			if(lngFixer[lang]!=null) lang = lngFixer[lang];\
			function install(el){\
				input = el;\
				form = input.form || doc.forms[0];\
				input.setAttribute("autocomplete", "off");\
				input.addEventListener("blur", hide, false);\
				input.addEventListener("focus", onFocus, false);\
				input.addEventListener("keydown", onKeyDown, false);\
				input.addEventListener("keyup", onKeyUp, false);\
				if(window.opera) \
					window.addEventListener("mousewheel", function(){if(isVisible)hide();}, false);\
				else \
					window.addEventListener("DOMMouseScroll", function(){if(isVisible)hide();}, false);\
				curVal = lastVal = qVal = getValue();\
				table = doc.createElement("table");\
				table.cellSpacing = table.cellPadding = "0";\
				table.className = "gac_m";\
				table.onmouseover=(function(){isOver=1;});\
				table.onmouseout=(function(){isOver=0;});\
				doc.body.appendChild(table);\
				hide();\
				setPos();\
				window.addEventListener("resize", setPos, false);\
				var style = doc.createElement("style");\
				head.appendChild(style);\
				var addRule = function(obj, att){\
					var rule = obj + " { " + att + " }";\
					style.sheet.insertRule(rule, style.sheet.cssRules.length);\
				};\
				addRule(".gac_m","background-color:'+ (DB.css.header.backgroundColor||'#fff') +'; border:2px solid '+ (DB.css.menus.borderColor||'gray') +'; display:none; cursor:default; line-height:14pt; margin:0; position:fixed; opacity:.95; z-index:99999;");\
				addRule("tr.gac_a","color:'+ (DB.css.header.color||'#000') +'; font-family:arial,hevetica,sans-serif !important;");\
				addRule("tr.gac_a:hover, tr.gac_a.hover","background-color:'+ (DB.css.header.backgroundColorHover||'#47b') +';");\
				addRule("tr.gac_a:hover td, tr.gac_a:hover td b, tr.gac_a.hover td, tr.gac_a.hover td b","color:#000;");\
				addRule("tr.gac_a td","border:1px solid transparent;border-left:0;border-right:0;");\
				addRule("tr.gac_a:hover td, tr.gac_a.hover td","border-color:'+(DB.css.menus.borderColor||'#c9d7f1')+';");\
				addRule(".gac_c","color:'+ (DB.css.header.color||'#000') +'; white-space:nowrap; overflow:hidden; font-size:12pt; text-align:left; padding-left:2pt; padding-bottom:1px; font-family:arial,hevetica,sans-serif !important;");\
				addRule(".gac_c b","font-weight: 700 !important; color:'+ (DB.css.titles.color||DB.css.header.color||'#00f') +' !important;");\
				addRule(".gac_d", "color:'+ (DB.css.url.color||'#494') +'; white-space:nowrap; overflow:hidden; font-size:8pt; text-align:right; padding:0 3px; font-family:arial,hevetica,sans-serif !important;");\
				addRule(".gac_e","background-color:'+ (DB.css.infobar.backgroundColor||'#d0d0d7') +';");\
				addRule(".gac_e td","padding:0 2pt 1pt; text-align:right; font-size:8pt; line-height:14pt; opacity:0.8; font-family:arial,hevetica,sans-serif !important;");\
				addRule(".gac_e span","color:black; text-decoration:none; cursor:pointer; font-size:11pt; font-weight:bold; padding:0 3px;");\
				addRule(".gac_e select","background-color:'+ (DB.css.buttons.backgroundColor||'#eee') +'; color:'+ (DB.css.buttons.color||'#368') +'; display:inline-block; border:1px solid transparent; padding:0 1pt; text-align:right; font-size:9pt !important; font-weight:bold; line-height:11pt; font-family:arial,hevetica,sans-serif !important;");\
				addRule(".more","width:30px;background-repeat:no-repeat;background-position:center -30px;cursor: pointer;background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAYdJREFUOE+lkc1LAlEUxe0vqRQDCXIlbSQIooI+DBOlMItcRDBQbdykki4SNFv0ARO1yAo0pnJiGmbKTCyComwVaO1ql1C4aKmcdISHLpJHPbhw4Z7z4553mwCoaN582oliqagqlkrlKqp2+mNNiq8CoCnmahL8K4fjXBRToqVsqfoampPJJCRJUsSzlxM4eYmByx5gQjDTARKJBBHOXIxjWrLCcTaK8VMTHUCWZSL8LWbDCIIg0AE2Ut8IygW44x9g9t+IieM40ldWt8YHMBTtQc+usT5C8LyA++cCUg+fcLBZZSiKIiKRCBHa+EFsPoYRuPXCuGWoB3hP80hnviBd52EKZZQhz/NgWZYITYe9CN35sZhagGFNXw+Yi75jcjuHkZUndHtuyDAcDpO+b68LXdudMKzr0RHS0V3B5/PRfeJvJ3K5XP8DMAxDAPrVduiWtdD6WqHxttBFcDqdsNvtilgXaMPYiRnWIxM0nmY6QG00rV8N2/EILNww1O6/AJaqq1fMtYAfh8q7du5xUe0AAAAASUVORK5CYII=\') !important;");\
				addRule("tr.gac_a:hover > .more, tr.gac_a.hover > .more","background-position:center center;");\
				addRule("td.more:hover","border: 2px solid '+(DB.css.menus.borderColor||'#c9d7f1')+';");\
			};\
			function hide(ev){\
				if(isOver) return;\
				table.style.display = "none";\
				isVisible = 0;\
				reqVal = lastVal = "";\
				if(ev){\
					ev.target.className = ev.target.className.replace(/\s*selected/,"");\
				}\
			};\
			function show(){\
				table.style.display = "table";\
				setPos();\
				isVisible = 1;\
			};\
			function getValue(){\
				if(!/:\s/.test(input.value)) return (curVal=input.value);\
				args = input.value.split(/([\-]?\s*[a-z]+\s*:\s*[^ ]*)/);\
				var len = args.length;\
				for(var x=0; x < len; x++){\
					if(args[x].lastIndexOf(":") == -1 && args[x].length){\
						curVal = args[x];\
						args.splice(x,1);\
						break;\
					}\
				}\
				args = args.join("");\
				return curVal;\
			};\
			function setValue(value){\
				input.value = value + (args ? " " + args: "");\
				qVal=value;\
			};\
			function getGlobalPos(obj,offset){\
				var pos=0;\
				while(obj){\
					pos += obj[offset];\
					obj = obj.offsetParent;\
				}\
				return pos;\
			};\
			function setPos(){\
				if(table){\
					table.style.left = getGlobalPos(input,"offsetLeft") + "px";\
					table.style.top = getGlobalPos(input,"offsetTop") + input.offsetHeight-1 + "px";\
					table.style.width = input.offsetWidth + "px";\
				}\
			};\
			function onFocus(ev){\
				lastVal = "";\
				getValue();\
				send();\
				if(ev){\
					ev.target.className = ev.target.className+" selected";\
				}\
				return 0;\
			};\
			function onKeyDown(event){\
				if (!isVisible) return;\
				var key = event.keyCode;\
				(key==40 && select(row+1));\
				(key==38 && select(row-1));\
				(key==39 && send());\
				if(key==13){\
					if(event.ctrlKey){\
						send();\
						event.preventDefault();\
						event.stopPropagation();\
						return false;\
					} else {\
						hide();\
						send();\
						event.cancelBubble=true;\
						form.submit();\
					}\
				}\
				else if(key==27){\
					setValue(curVal.replace(/ +/g," "));\
					isOver=0;\
					input.focus();\
					hide();\
					event.cancelBubble=true;\
					return event.returnValue=false;\
				}\
			};\
			function onKeyUp(event){\
				var key=event.keyCode;\
				if(key!=40 && key!=38){\
					getValue();\
					send();\
				}\
			};\
			function onMouseOver(){\
				if(curRow && curRow.className=="gac_a hover") curRow.className="gac_a";\
				curRow=this;\
				row = parseInt(curRow.alt);\
			};\
			function onMouseDown(event){\
				event.stopPropagation();\
				setValue(this.parentNode.completeString);\
				(event.ctrlKey && form.submit());\
				onFocus();\
				return false;\
			};\
			function submit(event){\
				setValue(this.completeString);\
				onFocus();\
				form.submit();\
				return true;\
			};\
			function select(idx){\
				if (!reqVal && curVal){\
					lastVal="";\
					scriptReq();\
					return;\
				}\
				if (!data || data.length<1) return;\
				if (!isVisible){\
					show();\
					return;\
				}\
				var len=data.length-2;\
				if(curRow) curRow.className="gac_a";\
				if(idx > len) idx=0;\
				else if(idx < 0) idx=len;\
				row=idx;\
				curRow=data.item(idx);\
				curRow.className="gac_a hover";\
				setValue(curRow.completeString);\
				return;\
			};\
			function send(){\
				qVal = curVal;\
				if(qVal == ""){\
					hide();\
				} else {\
					scriptReq();\
					setPos();\
					show();\
				}\
			};\
			function scriptReq(){\
				if(lastVal!=curVal && curVal){\
					var req=$id("gfx-gs-req");\
					if(req) head.removeChild(req);\
					req=doc.createElement("script");\
					req.setAttribute("id","gfx-gs-req");\
					req.src = domainURL + pathURL + lang + "&q=" + encodeURIComponent(curVal);\
					head.appendChild(req);\
				}\
				lastVal=curVal;\
			};\
			function onRequest(a){\
				if(a[0] != curVal) return;\
				reqVal=a[0];\
				table.innerHTML="";\
				var regVal = "("+qVal.replace(/\\s/g,"\\\\s*").replace(/(^\\s|\\s$)/g,"")+")(.*)";\
				var cnt=0;\
				var db = a[1];\
				if(sortByRes){\
					for(var i=0,len=db.length; i < len; i++) db[i][2]=db[i][1].replace(/[^0-9]*/g,"");\
					db.sort( function(a, b) { return b[2] - a[2] } );\
				}else{\
					db.sort( function(a, b) { return a[0] > b[0] } );\
				}\
				for(var i=0,len=db.length; i < len; i++){\
					var col=db[i];\
					if(col){\
						var tr=table.insertRow(-1);\
						tr.onmousedown = submit;\
						tr.onmouseover = onMouseOver;\
						tr.completeString = col[0];\
						tr.results = col[2];\
						tr.alt = cnt;\
						tr.className = "gac_a";\
						var td=doc.createElement("td");\
						td.className="gac_c";\
						var match = col[0].match(RegExp(regVal,"i"));\
						if(match && match[2]){\
							td.innerHTML =  match[1];\
							var b = doc.createElement("b");\
							b.innerHTML = match[2];\
							td.appendChild(b);\
						} else {\
							td.innerHTML =  col[0];\
						}\
						tr.appendChild(td);\
						td=doc.createElement("td");\
						td.className="more";\
						td.onmousedown = onMouseDown;\
						tr.appendChild(td);\
						td=doc.createElement("td");\
						td.innerHTML = col[1].replace(/[^0-9\.\,\\s]*/g,"");\
						td.className="gac_d";\
						tr.appendChild(td);\
						cnt++;\
					}\
				};\
				if(cnt > 0){\
					var tr=table.insertRow(-1);\
					tr.className="gac_e";\
					var td=doc.createElement("td");\
					td.colSpan=3;\
					td.align="right";\
					' +	(GFX.gSuggestLng ? 'addLangs(td);' : '') + '\
					var bc=doc.createElement("span");\
					tr.appendChild(td);\
					td.appendChild(bc);\
					bc.appendChild(doc.createTextNode(" x"));\
					bc.onclick=function(){\
						isOver=0;\
						hide();\
						lstVal=reqVal="";\
					};\
				}\
				row=-1;\
				data=table.rows;\
				(data.length > 0 ? show : hide)();\
			};\
			function toggleOrder(){\
				sortByRes=!sortByRes;\
			};\
			' +
			(GFX.gSuggestLng ? '\
			var langs = {ar:"Arabic",am:"Amharic",bn:"Bengali",bg:"Bulgarian",ca:"Catalan",zh_CN:"Chinese",zh_TW:"Chinese (Tr)",hr:"Croatian",cs:"Czech",da:"Danish",en:"English",et:"Estonian",tl:"Filipino",fi:"Finnish",fr:"French",de:"German",el:"Greek",gu:"Gujarati",iw:"Hebrew",hu:"Hungarian",id:"Indonesian",it:"Italian",ja:"Japanese",ko:"Korean",lv:"Latvian",lt:"Lithuanian",ms:"Malay",ml:"Malayalam",no:"Norwegian",pl:"Polish",pt_BR:"Portuguese (Br)",pt_PT:"Portuguese (Pt)",pa:"Punjabi",ro:"Romanian",ru:"Russian",sr:"Serbian",sk:"Slovak",sl:"Slovenian",es:"Spanish",sv:"Swedish",ta:"Tamil",te:"Telugu",th:"Thai",ti:"Tigrinya",tr:"Turkish",uk:"Ukrainian",vi:"Vietnamese"};\
			function setLng(){\
				lang=this.options[this.selectedIndex].value;\
				onFocus();\
				return false;\
			};\
			function addLangs(target){\
				var sel = doc.createElement("select");\
				sel.onchange=setLng;\
				for(var id in langs){\
					var op=doc.createElement("option");\
					var label = langs[id];\
					id = id.replace("_", "-");\
					op.innerHTML = label;\
					op.value = id;\
					if(lang==id) op.selected = "true";\
					sel.appendChild(op);\
				}\
				target.appendChild(sel);\
			};' : '') +
			'\
			window.google.ac={i:install,h:onRequest};\
			})();\
			window.google.ac.i(iquery);\
		};\
		window.setTimeout(doSecond,500);';

		}
	}


	// Add JavaScript Object to the Body 
	var sc = doc.createElement("script");
	sc.setAttribute("type","text/javascript");
	sc.innerHTML = SCRIPTS;
	body.appendChild(sc);

	
	BgBox.inject(body, 'top');
	$id(window).addEvent('resize',function(){
		var docSize = doc.getSize();
		BgBox.setStyles({
			'height': docSize.y +'px',
			'width': docSize.x +'px'
		});
	});
	
	
	
	/* Check and Make it Compatible with other scripts */
	var checkOtherScripts = function(){

		var el, rightPanel;
			
		if(canRun.search) {
		
			/* Google++ */
			el = $id('gpp-config-btn');
			if(el){
				el = $nd('//div[@id="res"]//div//div[@style]');
				if(el){
					el.setStyles({
							borderColor		: (DB.css.header.borderColor||'rgb(107, 144, 218)'),
							backgroundColor	: (DB.css.header.backgroundColor||'rgb(240, 247, 249)')
						});
				}
			}
			
			
			/* Right Panels*/
			if(GFX.bSidebar && (rightPanel=$id('gfx-sidebar')) ){
				/* Google Extra */
				el = $id('google_extra');
				if(el){el.inject(rightPanel);}
				/* Google++ */
				var el = $nd('//div[@class="gpp-sidePanel"]');
				if(el){
					el = el.getParent();
					el.inject(rightPanel);
					el.setStyles({
						display			: 'table',
						width			: '100%',
						marginRight		: '0px',
						borderColor		: (DB.css.header.borderColor||'rgb(107, 144, 218)'),
						backgroundColor	: (DB.css.header.backgroundColor||'rgb(240, 247, 249)')
					});

				}
				/* Googlepedia */
				var el = $id('showGooglepediaBox');
				if(el){el.inject(rightPanel);}
				var el = $id('wikibox');
				if(el){el.inject(rightPanel);}
			}
			/* GooglePreview */
			//var el = $nd('//img[contains(@src,"googlepreview.com/preview")]');
			
		}
		
		
	};
	
	GFX_processResults();
	win.setTimeout(checkOtherScripts,1000);
	
};
// END GoogleFx FirstRun










//#################################################################################################################################
//                                                           B Y     R E Q U E S T
//#################################################################################################################################

var GFX_processResults = function(contentDocument, isReverse, startNum)
{

	var doc = contentDocument||document;
	
	var startNum = typeof(startNum)!='undefined' ? startNum : URI.query.start;

	// ==============================================================================================================
	//                                              R E M O V E     T R A C K S
	// ==============================================================================================================
	if(GFX.rNoTrack)
	{
		
		var o = $xpath('//a[contains(@href,"/url?")]|//a[contains(@href,"/pagead?")]', doc, 7);
		var i = o.snapshotLength;
		while(i--) {
			var el = o.snapshotItem(i);
			el.href = unescape(el.href.replace(/.*[\?&](url|q|adurl)=(https?:[^&]+).*/,'$2'));
		}
		
		var o = $xpath('//a[starts-with(@href,"/") or starts-with(@href,"http://translate.")][contains(@href,"usg=") or contains(@href,"ei=") or contains(@href,"ved=")]', doc, 7);
		var i = o.snapshotLength;
		while(i--) {
			var el = o.snapshotItem(i);
			el.href = el.href.replace(/&amp;/g,'&').replace(/&(usg|ei|ved)=[^&]+/g,'').replace(/&[a-z_]=&/g,'');
		}

		var o = $xpath('//a[starts-with(@onmousedown,"return")]', doc, 7);
		var i = o.snapshotLength;
		while(i--) {
			var el = o.snapshotItem(i);
			el.removeAttribute('onmousedown');
		}
	}


	// ==============================================================================================================
	//                                             W E B     S E A R C H  -  ( 02 )
	// ==============================================================================================================
	if(canRun.search)
	{
		var isTimeline = URI.query.tbs.tl != undefined;
		
		var results = $xpath((isTimeline?'//div[@id="res"]//ol//li[starts-with(@class, "g")]//table[@class="ts"]//a[starts-with(@class, "l")][not(img)][1]':'//div[@id="res"]//ol//li[starts-with(@class, "g")]//h3//a[starts-with(@class, "l")][not(img)][1]'), doc, 7);
		
		if (!results) {GM_log('Error! Results elements not found!');return;}

		if(contentDocument) {
			var botRev = $nd('//*[@id="brs"]', doc);
			if(botRev) botRev.parentNode.removeChild(botRev);
		}
		
		var setCounter = GFX.rCounter ?
			function(el)
			{
				new Element('span', {
					'class'	: 'cnt',
					'html'	: (isReverse ? ++startNum : (++resCounter)+startNum)
				}).inject(isTimeline?el.parentNode:el,'before');
			}
			: function(){return;};
   
		//  setThumbshot  
		//----------------
		var thumbshot = function(url){
			return new Element('a', {
					'href'	: url,
					'target': GFX.rTrgLnk,
					'title'	: url,
					'class'	: 'gfx-thumb',
			}).grab(new Element('img',{
					'src'	: 'http://e.googlepreview.com/preview?s=' + url
				}));
		};
		var setThumbshot = function(){return;};
		if(GFX.rThShots && !URI.query.tbs.vid) {
			if(URI.query.tbs.clir) // Translate Results
			{
				setThumbshot = function(el)	{
					var target = el.parentNode.parentNode;
					target.insertBefore(thumbshot(el.href.replace(/.+&u=/,'')), target.firstChild);
				};
			}
			else if(URI.query.tbs.tl) // Timeline
			{
				setThumbshot = function(el)	{
					var target = el.parentNode.parentNode.parentNode;
					target.insertBefore(thumbshot(el.href), target.firstChild);
				};
			}
			else // Common
			{
				setThumbshot = function(el)	{
					var target = el.parentNode.parentNode;
					target.insertBefore(thumbshot(el.href), target.firstChild);
				};
			}
		}
		
			
		//  setSiteFilter  
		//----------------
		var setSiteFilter = GFX.rSiteFlt ?
			function(el)
			{
				var cite = $id(el).getParent('li[class*="g"]').getElement('div[class*="s"] cite');
				if(!cite) return;
				
				var url = encodeURL(el.href.replace(/^https?:\/\//,'').replace(/\/[^\/]*$/,'')).replace(/%2F/g,'/').replace(/([\$\*\?\(\)\{\}\[\]])/g,'\\$1');
				
				var sfMode = RegExp(url).test( (INPUT.site||['']).join(',') ) ? '-' : '';
				
				new Element('a', {
					'class'		: sfMode+'sf',
					'title'		: (sfMode=='-' ? sfMode + 'remove: ' : LNG.only +' '+ LNG.from +': ') + url,
					'onmouseup'	: 'siteFilter("' + url + '",event);return !1;'
				}).inject(cite, 'before');
			}
			: function(){return;};
		
			
		//  Runtime
		//---------------------------------
		for(var i=0,len=results.snapshotLength; i<len; i++)
		{
			var el = results.snapshotItem(i);
			el.setAttribute('target', GFX.rTrgLnk);
			el.setAttribute('title', el.href);
			setCounter(el);
			setThumbshot(el);
			setSiteFilter(el);
		};

		

		// Reference Icons
		if(GFX.rRefIcn) {
			var processRefLinks = function(xPathHeader){
				var links = $xpath((xPathHeader||'//div[@id="res"]')+'//*[starts-with(@class,"g")]//a[@href][not(starts-with(@class,"l"))]', doc, 7);

				for(var i=0,len=links.snapshotLength; i<len; i++){
					var el = links.snapshotItem(i);
					var href = el.href;
					
					el.target = GFX.rTrgLnk;
					
					var clean = false;
				   
					if( href.indexOf('://translate.') != -1 )
					{
						el.title = el.innerHTML.replace(/nbsp\;/g,' ').replace(/\&/g,'');
						el.innerHTML = '';
						el.className = el.className + ' tr';
						try{
							if(el.previousSibling.previousSibling.nodeName=='SPAN'){
								el.parentNode.removeChild(el.previousSibling.previousSibling);
							}
						}catch(e){}
						clean = true;
					}
					else if( href.indexOf('q=cache:') != -1 )
					{
						el.title = el.innerHTML.replace(/nbsp\;/g,' ').replace(/\&/g,'');
						el.innerHTML = '';
						el.className = 'ch';
						clean = true;
					}
					else if( href.indexOf('q=related:') != -1 || href.indexOf('timeline-related') != -1)
					{
						el.title = el.innerHTML.replace(/nbsp\;/g,' ').replace(/\&/g,'');
						el.innerHTML = '';
						el.className = 'sm';
						clean = true;
					}
					else if( el.id && el.id.substring(0,3)=='gnl' )
					{
						el.title = el.innerHTML.replace(/nbsp\;/g,' ').replace(/\&/g,'');
						el.innerHTML = '';
						el.className = 'nt';
						clean = true;
					}

					if(clean){
						if(el.previousSibling && el.previousSibling.nodeType == 3)
							el.parentNode.removeChild(el.previousSibling);
						if(el.nextSibling && el.nextSibling.nodeType == 3) 
							el.parentNode.removeChild(el.nextSibling);
					}
				}
			};
			
			processRefLinks();
			
			// ManyBox Feature
			var items = $xpath('//li[contains(concat(" ",@class," ")," g ")]//span[contains(@id,"mbl")]', doc, 7);

			var self = arguments.callee;
			var processManyBox = function(){
				if(this.isClicked) return;
				var num = this.id.replace('mbl','');
				win.setTimeout(function(){
					processRefLinks('//div[@id="mbf'+num+'"]/preceding-sibling::div');
				},1000);
				this.isClicked = true;
			};
				
			for(var i=0,len=items.snapshotLength; i<len; i++){
				var el = $id(items.snapshotItem(i));
				el.addEvent('click', processManyBox.bind(el));
			};
			
			
		}
		
		
	}

	/*************************************************************************************************************
												I M A G E S  -  ( 02 )
	 *************************************************************************************************************/
	else if(canRun.images)
	{
	
		/* Convert Image Query to Object */
		var imgQueryToData = canRun.images ? function(el){
			var obj = {};
			var query = el.href.split('imgres?');
			if(query[1]){
				query = query[1].replace(/\&amp;/ig,'&').split('&');
				var i = query.length-1;
				while(i--){
					var value = query[i].split('=');
					obj[value[0]] = decodeURL(value[1]);
				}
			} else {
				return false;
			}
			return obj;
		} : function(el){
			var obj = {imgurl:'',w:0,h:0,sz:0};
			el = el.getElementsByTagName('IMG')[0];
			var query = el.src.split('tbn:');
			if(query[1]){
				query = query[1].split(':http://');
				obj.tbnid = query[0];
				obj.imgurl = 'http://'+decodeURL(query[1]);
			} else {
				return false;
			}
			return obj;
		};
		
		
		/* Image Preview */
		if(GFX.iPrev) {
			if(GFX.iPrevNoIcn) {
				var imgSetPreview = function(el, db){
					el.setAttribute('onmouseover', 'showImg(this,'+db.w+','+db.h+','+db.sz+');');
					el.setAttribute('onmouseout', 'hideImg(200);');
				};
			} else{
				var imgSetPreview = function(el, db){
					var o = doc.createElement('a');
					o.setAttribute('class', 'zoom');
					o.setAttribute('onmouseover', 'showImg(this,'+db.w+','+db.h+','+db.sz+');');
					o.setAttribute('onmouseout', 'hideImg(200);');
					el.parentNode.appendChild(o);
				};
			}
		} else {
			var imgSetPreview = function(el, db){
				el.title = db.imgurl + ' - ' + db.w + 'x' + db.h;
			};
		}
		
		resCounter += startNum;
		
		var imgSetCounter = GFX.iCounter ?
			function(el)
			{
				new Element('span', {
					'class'	: 'num',
					'html'	: ++resCounter
				}).inject(el,'top');
			}
			: function(){}

		
		processImages = function(xHead){

			/* takes the thumbs images */
			var thumbs = $xpath( (xHead||'') + '//*[contains(@id,"tDataImage")]/a/img', doc, 7);
			/* takes the information of the images */
			var texts = $xpath( (xHead||'') + '//*[contains(@id,"tDataText")]/div | //*[contains(@id,"tDataText")]/font', doc, 7);
			
			var len = thumbs.snapshotLength;

			
			/* Processing elements
			-----------------------*/
			for(var i=0; i < len; i++)
			{
				
				/* current thumb */
				var img = thumbs.snapshotItem(i);
				/* current link */
				var lnk = img.parentNode;
				/* current info */
				var txt = texts.snapshotItem(i);

				/* takes the image data from the query */
				var data = imgQueryToData(lnk);
				if(!data) continue;

				/* relink to real img */
				lnk.href=data.imgurl;
				lnk.removeAttribute('onclick');
				lnk.setAttribute('rel', data.imgurl);

				/* change the default target of the link */
				lnk.target = GFX.rTrgLnk;
				
				/* add some cosmetics */
				lnk.setAttribute('class', 'gfx-thumb');
				lnk.parentNode.setAttribute('class', 'gfx-img');
				lnk.parentNode.setAttribute('align', 'center');

				/* defines the holder references */
				var iRefs = new Element('div');
				iRefs.className = 'icons';

				/* Image Preview */
				imgSetPreview(lnk, data);
				
				/* Image Counter */
				imgSetCounter(lnk);

				
				/* Search with TinEye service */
				var tineye = doc.createElement('a');
				tineye.className = 'tineye';
				tineye.title = LNG.search + ' ' + LNG.in_ + ' TinEye';
				tineye.target = '_blank';
				tineye.href = 'http://www.tineye.com/search/?pluginver=0.5&url=' + encodeURIComponent(img.src);
				iRefs.appendChild(tineye);
				
				/* Search by Similar Images */
				/*
				var tbnid = data.tbnid.replace(/\:$/,'');
				var byImg = doc.createElement('a');
				byImg.className = 'sm'
				byImg.title = LNG.search + ' ' + LNG.by + ' ' + LNG.similar;
				byImg.target = GFX.rTrgLnk;
				byImg.href = '/images?q=' + URI.query.q + '&imgtype=i_similar&tbnid=' + tbnid;
				iRefs.appendChild(byImg);
				*/
				
				/* Site Filter from Image Source */
				var sfUrl = parseUrl(data.imgurl);
				sfUrl = sfUrl.host + sfUrl.path;
				sfUrl = encodeURL(sfUrl.replace(/^https?:\/\//,'').replace(/\/[^\/]*$/,'')).replace(/%2F/g,'/').replace(/([\$\*\?\(\)\{\}\[\]])/g,'\\$1');

				var sfMode = RegExp(sfUrl).test( (INPUT.site||['']).join(',') ) ? '-' : '';
				
				var imgSF = doc.createElement('a');
				imgSF.className = sfMode + 'sf';
				imgSF.title = (sfMode=='' ? sfMode + 'remove: ' : LNG.only +' '+ LNG.from +': ') + sfUrl
				imgSF.setAttribute('onmouseup','siteFilter("'+ sfUrl +'",event);return !1;');
				iRefs.appendChild(imgSF);
				
				
				
				/* add Thumbs Refs */
				lnk.parentNode.appendChild(iRefs);


				/* Data Text
				---------------------------*/
				
				/* convert text link to right reference link */
				if(canRun.images){
					txt.className += ' gfx-info';
					var el = txt.getElementsByTagName('DIV');
					if(el) refUrl = el[1];
					else continue;
				} else {
					var div = new Element('div',{'class':'gfx-info'});
					txt.parentNode.appendChild(div);
					div.grab(txt);
					el = txt.getElementsByTagName('FONT');
					if(el) refUrl = el[0];
					else continue;
				}
				

				/* Site Filter from RefLink */
				var sfUrl = parseUrl(data.imgrefurl);
				sfUrl = sfUrl.host + sfUrl.path;
				sfUrl = encodeURL(sfUrl.replace(/^https?:\/\//,'').replace(/\/[^\/]*$/,'')).replace(/%2F/g,'/').replace(/([\$\*\?\(\)\{\}\[\]])/g,'\\$1');

				var sfMode = RegExp(sfUrl).test( (INPUT.site||['']).join(',') ) ? '-' : '';
				
				/* Add RefLink, Site Filter & Try Cache to Info area */
				refUrl.innerHTML =  '<div class="icons">'
					+ '<a class="ch" href="/search?q=cache:' + encodeURL(data.imgrefurl) 
					+ '" target="_blank" title="'+ LNG.trycache +'"></a>'
					+ '<p></p>'
					+ '<a class="'+ sfMode +'sf" title="'+ (sfMode=='' ? LNG.only+' '+LNG.from+': ' : sfMode+'remove: ') + sfUrl 
					+ '" onmouseup="siteFilter(\''+ sfUrl +'\',event);return !1;"></a></div>' 
					+ '<a href="'+ data.imgrefurl +'" target="'+ GFX.rTrgLnk +'" title="'+ data.imgrefurl+'">' + refUrl.innerHTML +'</a>';


			}
		};
		
		processImages();
		
	}
	// ==============================================================================================================
	//                                                 N E W S  -  ( 02 )
	// ==============================================================================================================
	else if(canRun.news && hasSomeQuery)
	{
		var items = $xpath('//*[contains(@class,"story")]//H2[contains(@class,"title")]/A[starts-with(@class,"usg-")]', doc, 7);


		var setCounter = GFX.rCounter ?
			function(el)
			{
				new Element('span', {
					'class'	: 'cnt',
					'html'	: (isReverse ? ++startNum : (++resCounter)+startNum)
				}).inject(el,'before');
			}
			: function(){return;};
   
		//  setThumbshot   function
		//---------------------------------
		var setThumbshot = GFX.rThShots ?
			function(el)
			{
				el.setAttribute('target', GFX.rTrgLnk);
			   
				var a = new Element('a', {
					'href'	: el.href,
					'target': GFX.rTrgLnk,
					'title'	: el.href,
					'class'	: 'gfx-thumb',
				}).grab(new Element('img',{
						'src'	: 'http://e.googlepreview.com/preview?s=' + el.href
					}));

				el.parentNode.parentNode.insertBefore(a, el.parentNode.parentNode.firstChild);
			}
			: function(){return;};

			
		//  Runtime
		//---------------------------------
		for(var i=0,len=items.snapshotLength; i<len; i++)
		{
			var el = items.snapshotItem(i);
			setCounter(el);
			setThumbshot(el);
			el.setAttribute('title', el.href);
		};
	}

	// ==============================================================================================================
	//                                            B L O G S E A R C H  -  ( 02 )
	// ==============================================================================================================
	else if(canRun.blogsearch)
	{
		var o = $nd(xPathHead+'//*[@id="m"]//div//a[contains(@href,"scoring=")]/ancestor::table', doc);
		if(o) o.parentNode.removeChild(o);

		// Runtime
		//---------
		if( $nd('//*[@id="m"]', doc) )
		{
			//  setThumbshot
			var setThumbshot = GFX.rThShots ?
			function(el)
			{
				(new Element('a', {
						'href'		: el.href,
						'target'	: GFX.rTrgLnk,
						'title' 	: el.href,
						'class'		: 'gfx-thumb',
					}).grab(new Element('img', {
						'src' : 'http://e.googlepreview.com/preview?s=' + el.href
					}))
				).inject(el,'before');
			}
			: function(){return;};

			var setCounter = GFX.rCounter ?
				function(el)
				{
					new Element('span', {
						'class'	: 'cnt',
						'html'	: (isReverse ? ++startNum : (++resCounter)+startNum)
					}).inject(el,'before');
				}
				: function(){return;};
		
			
			
			// Fix Results
			
			var items = $xpath('//p[@class="g"]', doc, 7);

			for(var i=0,len=items.snapshotLength; i<len; i++){
				var el = $id(items.snapshotItem(i));
				var o=el.getPrevious();
				
				while( o && o.nodeName != 'P' ) {
					el.grab(o,'top');
					o=el.getPrevious();
				}

			};
			
			var items = $xpath('//a[starts-with(@id,"p-")]', doc, 7);


			for(var i=0,len=items.snapshotLength; i<len; i++){
				var el = $id(items.snapshotItem(i));
				el.className = 'gfx-title';
				el.target = GFX.rTrgLnk;
				el.title = el.href;
				setThumbshot(el);
				setCounter(el);
			};
			
			
		}

	}
	
}; // END GoogleFx byRequest







// ==============================================================================================================
//                                                   C S S    S T Y L E S
// ==============================================================================================================
var GFX_Styles = function(){

	var docSize = doc.getScrollSize();
	
	var css = '\
	HTML\
	{\
		background-attachment: fixed !important;\
		background-position	: center center !important;\
		background-repeat	: no-repeat;\
		margin				: 0 !important;\
	}\
	BODY\
	{\
		background-color	: transparent;\
		display				: block;\
		margin				: 0px !important;\
		width				: 99.5% !important;\
		min-width			: 99.5% !important;\
		max-width			: 99.5% !important;\
		overflow-x			: hidden;\
	}\
	A,\
	A:link,\
	A:visited\
	{\
		text-decoration		: none;\
	}\
	A:hover\
	{\
		text-decoration		: underline;\
	}\
	B\
	{\
		font-weight			: bold !important;\
	}\
	IMG\
	{\
		border				: 0;\
	}\
	INPUT[type="checkbox"]\
	{\
		display				: inline-block;\
		vertical-align		: middle;\
	}\
	INPUT[type="text"], INPUT[name="q"]\
	{\
		font-weight			: bold;\
		padding				: 2px 8px;\
	}\
	BUTTON:not(.ws):not(.wsa),\
	BUTTON[type="submit"],\
	INPUT#stxemailsend,\
	INPUT[type="submit"],\
	INPUT[value="Cancel"],\
	INPUT[value="Discard"],\
	INPUT[value="Download"],\
	INPUT[value="Save"]\
	{\
		font-size			: 10pt !important;\
		font-weight			: bold;\
		padding				: 0px 5px !important;\
		background-position : 0 -192px;\
	}\
	HR {\
		border				: 0px;\
		border-bottom		: 2px dotted #999;\
		margin-bottom		: 3pt;\
	}\
	#fctr,#ghead,#pmocntr,#sbl,#tba,#tbe,.fade, .gbh {\
		opacity				: 1;\
	}\
	.ds, .lsbb {\
		border				: 0;\
	}\
	.lsbb {\
		background-color	: transparent;\
	}\
	#gfx-header{\
		display				: block;\
		min-width			: 780px;\
		width				: 100%;\
	}\
	#gfx-header.fixed {\
		position			: fixed;\
		top					: 0;\
		left				: 0;\
		vertical-align		: top;\
		z-index				: 1000;\
	}\
	.gac_m {\
		z-index				: 1010;\
	}\
	#gfx-head-content {\
		padding-left		: 5px;\
		padding-right		: 3px;\
		margin-top			: 23px;\
		background-color	: white;\
		width				: 100%;\
	}\
	#gfx-head-content A:link,\
	#gfx-head-content A:visited,\
	#gfx-head-content A:active {\
		text-decoration		: none !important;\
	}\
	#gbar_bg {\
		position			: absolute;\
		top					: 0;\
		left				: 0;\
		height				: 22px;\
		width				: 100%;\
		z-index				: -1;\
		background-color	: white;\
		border-bottom		: 1px solid gray;\
	}\
	#gbar_bg, #gfx-preview .menus {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAYAAAABxvaqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABwSURBVHjaYmBgYNAFCCAmIPEDIIBAxE+AAAIRfwACCEwABBCI+AsQQCDiP0AAgQgGgAACEwABBCYAAghMAAQQmAAIIDABEEBgAiCAQAQjQACBWQABBGYBBBCYAAggEMEEEEBgFkAAgQmAAAITAAEGACXuBkV5zlS1AAAAAElFTkSuQmCC") !important\
	}\
	#gbar, #guser {\
		top					: 0 !important;\
		min-height			: 18px;\
		margin				: 0 !important;\
		margin-top			: 2px !important;\
		padding				: 0 !important;\
	}\
	#gbar {\
		position			: absolute;\
		left				: 0;\
		z-index				: 1010;\
	}\
	#guser {\
		position			: absolute;\
		right				: 0;\
		padding				: 0 !important;\
		margin-right		: 17px !important;\
	}\
	#gbi, #gprefs {\
		display				: none;\
		visibility			: visible;\
		min-width			: 115px;\
		position			: absolute;\
		margin-top			: -1000px;\
		margin-left			: -19px;\
		padding				: 1px;\
		z-index				: 1100;\
		opacity				: 0.9;\
		left				: auto;\
		text-align			: left;\
	}\
	#gbar A.gb3:hover > div, #guser A.gb3:hover > div {\
		display				: block;\
		margin-top			: 19px;\
	}\
	#gbar NOBR, #guser NOBR {\
		cursor				: default;\
	}\
	#guser NOBR {\
	}\
	#gbar A, #gbi A, #guser A, #gb A {\
		text-decoration		: none !important;\
		white-space			: nowrap;\
		margin				: 0 !important;\
		height				: 0;\
		font-size			: 0;\
	}\
	#gbi div.gb2 {\
		height				: 2px !important;\
		font-size			: 1px !important;\
	}\
	#gbi div.gb2 div {\
		display				: none !important;\
	}\
	#gbar A[href], #gbi A[href], #guser A[href], .login,\
	#gb A, B.gb1\
	{\
		display				: inline-block;\
		height				: 19px;\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 10pt;\
		font-weight			: bold;\
		border				: 1px solid transparent;\
	}\
	#guser A[href] {\
		padding-top			: 0;\
	}\
	#gbar A.gb1, #gbi A.gb1, #guser A.gb1 {\
		padding-right		: 3px;\
	}\
	A.gb2[href] {\
		display				: block !important;\
		min-width			: 100px;\
		padding				: 1px 10px !important;\
	}\
	#gbar B.gb1, #gbi B.gb1, #guser B.gb1 {\
		margin				: 0px;\
		padding				: 0 4px;\
	}\
	#gbar B.gb2, #gbi B.gb2, #guser B.gb2 {\
		font-size			: 10pt;\
		color				: gray;\
	}\
	.gbh, .gbd {\
		display				: none !important;\
	}\
	#gfx-header.fixed #sft {\
		margin-top			: -10px;\
		vertical-align		: middle;\
		font-size			: 10pt;\
		width				: 100%;\
	}\
	#sd {\
		font-size			: 12pt;\
	}\
	#sft LABEL {\
		font-size			: 9pt;\
	}\
	#sft INPUT[type="radio"] {\
		margin				: 0;\
		vertical-align		: bottom;\
	}\
	#gfx-nav, #nav, #navbar, #lhid_pager {\
		background-color	: transparent;\
		opacity				: .7;\
	}\
	#gfx-nav .csb{\
		background-repeat	: no-repeat;\
		height				: 40px;\
		display				: block;\
	}\
	#gfx-nav .ch{\
		cursor				: pointer;\
	}\
	#gfx-nav:hover, #nav:hover, #navbar:hover, #lhid_pager:hover {\
		opacity				: 1;\
	}\
	#gfx-nav #gfx-nav-content {\
		width				: 100%;\
		height				: 80px;\
		max-height			: 80px;\
		white-space			: nowrap;\
	}\
	#gfx-nav #gfx-nav-content .csb {\
		background-position	: -74px 0;\
		width				: 22px;\
	}\
	#gfx-nav td{\
		padding				: 0;\
		text-align			: center;\
	}\
	#gfx-nav A, #gfx-nav .cur, #nav A, #navbar A {\
		display				: inline-block !important;\
		clear				: both;\
		font-weight			: bold;\
		font-size			: 10pt;\
	}\
	#gfx-nav A:hover, #nav A:hover, #navbar A:hover, #lhid_pager td:hover {\
		outline				: 1px solid #c9d7f1;\
	}\
	#gfx-logo {\
		position			: relative;\
		display				: inline-block;\
		min-width			: 44px;\
		min-height			: 38px;\
		z-index				: 1005;\
		opacity				: 0.75;\
		background-repeat	: no-repeat;\
		background-position	: left top;\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAmCAYAAAC/H3lnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAACwVJREFUWEfVmXl0TmcexydN7EIisQcVu1kkLWOtJZaWWMdgtCaGVodBLbN0OtMiSSkRqmSU4dgzZmo4EaIhRmKZWjOotoiIyIokRCKLbHe+n5v7khrpvJmTf+Y953NuvO9zn+d7f89vey4HwzC+93/1QfBTshwMI+sF4SicRA1R004Yyz3cyxyaq+Lc1fO3JdYUymK1hbNwE82Eh2gjXhRtK4HfGMNY7uFe5mAu5qxW4TbBTFxXuFuivHR9RQwTI8WY72C0fvMVQ0U/0c2ag7nqlYuuHuua7ltuAdMaLNBJDBCviwXCXwSLT8TaSlij71eKJWKemCwGWnM11rWOkItUj2gE429sIVuO2LctgRG6XhS3RIpIrYRkfZ8g/iUOWvfO1HWQaCcaCsfqCGybhQkS/A43wLKypiGRRpGo6uexbvhKc/xJ/Fy8LJqIGtUpGP8lWPBZ3ECWNYq0wFwxWfxEjLWT8XPnzlhx79718xcvxuAquAbBWKs6BZOOmJQAw2flBmZyRmx30VG0sZMOQUFLFuTk3L4VF3d+m+YiIDuKBlhZYBwr5Zmx87w0yriKKdLB9rA2lyDPkpbIBgQY7oBgLItYd1HXThpt2LDq7YKCtMzk5Cthmot46C86iBaCwEY8gVhLEOz1RSPBLre0jMdYAhb/Z+yT9EjQIZhcSuoiGyjATMG4AZZFrO3D034XdbduDZleVHQnJysr/oTm+kjMEFiagManbeLxbUQS7N0EKXGwGFJhbHv9zTgeSlYvT2sI5iYEk7qUDZ4ruOb06W+0mDRpXMfx40d1HjfOt8uzDBkywDssbFdQcfHd3Ly8lK81V7jYLFaId8V0MUL0Et7ix4L8PUUsFIvEYvFr4WeJ76prU2GmR7sFjxgxtBlWe/QoOTU3NylNfppuwd+pIkUk5+enZpWVZT40jMIsPXeGSBNx4gt9t9swHgRo4V9aIt/U9Y/6Tg/1+JjGED+gv8v0Xc47+t1HYGncw9FewQ7Dhg1qm519S/6NjqwyIVFZN8VlcUHEii/Lv8vPKdLn8bc/hSUlJZmGUXC+tDRDwrM2iB0iWhPeLy4uto0v1G25hYWFlzRu3ePH6Vif3cD/newW7OPzSjsJvm0JztP1ijgi9ohQgQhc4KwE5ERERJyaOXNm8Lx58wIXLly4WCwJCwsLl7sUl5Tcu69xFJt0jS0qLS0t27Rp0945c+YsYxzjZ8zw++ju3etRZ84cWaZxuBBuUcNuwQMH9m0vwVQ1LFworop/WIK367rFEq7vjIy0tLT03r17z1aQ9hfdxA9cXBoOjI+/wI5oSDGhYpTpEx0dfcrR0fGnGtPXGuu9YMGs+enpV784ezYqyBJM8Nlv4cGD+3eU78oipmAoEPJP0w2OiwNir4g0jLyEsrKS0piYmChnZ+d+EtFaNBIt58+fOVm+zgTmJykpKblXr16z9FtP8aJoKuN4xcfHnkhJ+eqYmK85XxJUY/sF+/oO81TAEUDPfuTPhixuKLvkndGkUYK+Ik/5OD8kJCiwVq1a7SWknqjTvHnTNtHR4Zvls8VyhZLNmzfvdHJyGqzfPIVL48buzU6fPrxKD5WUlvbNdrnPeM1FU0b+tj9LtG7t4RoaGuoXEhLyh+XLly8NDAwMCggIWAn+/v7Ba9as3pKREZfw8GHiOS2Cq+AyRampXyeMHPnqKIlpLCjR9bp39/KWZWMzMjJue3p6jsddrN9dDh3626zCwrTszMwbMcrntAp9BYWEtOZgrw9TOGhgXK3t7WQt8kNdwWv48CGT1EMkaqFzWogA3C9uKtJLDx7cvVuW89K4hqKmcNu5c6ffokWL3rDub8Hcs2e/+ZLuvybrxmk3V+t+W2knpZl9dVUEU+EQTeVrwPZVwG3atNd9ZOEb2sZoWehjLQC0qNl6gKItW9Yt0/i21v21PTw88OmmlmUbTpkysX1S0peHlcayFSv79KCU9e6CYKOMmyeXqgh+wballmBEYzFwVRUcpP4hVllgn6zzey1AtfpUXJdvG8nJyTcnTpw41hKIa/DwXKFBRMRf35HIIvl9vK5URnob+mnKstlPV0lwz54vN1AwvBUTE/5eVNS+9+HIkb0fwOeff/bB3r3bghITL+2/ceNCsARP0yJUMVKSAtAwVDRKIiMjtysAO2htAhARtr7ETRXSzEDy/3O6vi+ocHSRNEhmx1YVwQ4TJoxprUk5edjSGrn4riC4osVW8Z74mWUdeoFVQg29qoM+8tuNWrertUMVTyFucgfm0Lg7HAA+FMMFTRnnQna3aoKVhz1VOBJ1c6l6hSRdDwsaGzoyGhssSpBwNHpNcExSQcm7h+Cr+nh7e9Nj07LiThUF11u7dvlk+X6uBGfJyvTSPHA3Qf6lQauSDztQmh88SEjUhA9VXskAi61JOTEjsqeg5nMdK3QovX9SWkvz8vLyVXYDJLKPaCmcR49+zdnyYzOY27Vr2yoyck+Igq5AnV6s/JjDBA/uKThz6ihnf9A5UJolOEkp56Zcg+PPREEFYtvwNZpvgqSPeEuosTFkrZLS9evX75SoYZZ13dzd3ZorQD/x85uEtck6ZvZp1qxJ12vXzv5TBsmRaA4AdHUYgL653Jctc/+3fviJYLWYl5R2CApOEraEzmTkSgS/KmT9XJqgsri4uHgvL69fSBD9RBNn5/rux48feFeiHp06dSikSRP3dvq+viA/uwYHB0xV0GZLcLyszeuDUYL2Eis/qXRYiR/InfLP/2jgbYIT79y5dlZWptnuIVyZRHDyRjDNNkGndGZkFhQUFKoKrlHppQGin2ioXsJLO0VbSoAVrFzpP0ffe4jaghTXfMeOT/3z81MytVa4xpBx8GWOUWY/zIGvlcBfaOW+qUywrJugrYxW+f2VxuGvLpZgzlwEBy6iU0XpZ5oj9+jRo8ddXFzGSkQXQaFwPXHioL/8swTBcPXqmdgePbwHWL9j5Tpt2rTqcvnyicMq68dv375MQHMy4YxnNj8IZms5kvOj0otRohtZyHamcxg0qF8nPfEV5dkwWYgIxppmQ2LNwYRUJmULY7/6hAQfH5/faA6sS/PTVNWwj7b7nrJArjKNskdWjv4u2rhx9Wr9Trqj36AQtfD1HTpOYo+qUVpuCS5/v4FqSz1bzJlLfe3DRN00VfQWnUXbzp079L9+/dzRCxeObVIJJn0RveRIjuo8NCcCtk4uURpy6NCevytV/XnXrg0f798fukyV7MO4uHNREnxJQUsrukuQbYiJpO3b168NDw9dqkzhf+DAXxatW7dikXLztpMnI6iYtvRmWtjmf7RwJOvfCpqXi4J+9464IdTnmpWLt0NYksg1X5BYD40PExxUqFmCAy3CTguqF20n+TVQzBGcpul1KcOsR0/NmoylB1lnzcN8T1956R9YiNYNAT8S5NXZYqlYLzh7UbF+Jwio3oKsgkAnSzBuwdtP5vi+4KiO2xCcH1jw91Rrfo70pCsyzRhBGsQdlbvN/M5YXnVx7H/21MxbRXNLSRv4MgN4bUXzMUFMEhQCbibQyChELKlMQs37bW7BHIjm3QPvIBCEeO5FpJdgF8jbzQXBzs4ydoDgyA/cRwA/772EuSAWovzhk0S7rQgwWWfrxta64vgEGu2eWXme8iT42C2sTxBiAFtR4UF4UB6KMTwwu8J8+D8PwFiwvfnht2ff/NgWNa2EP2NtBDGQBwAmZgF+Y4xZ15/Pk3kIZsbb/svBdi/GYS0bzPfsWO6pMP7pWpUsWj0vnyt/qP99/n8D6hMQ1h6tk7kAAAAASUVORK5CYII=") !important;\
	}\
	#gfx-logo:hover {\
		opacity				: 1;\
	}\
	A.sf, A.-sf, #gfx-preview SPAN.sf {\
		display				: inline-block;\
		float				: left;\
		padding				: 1px;\
		width				: 16px;\
		height				: 16px;\
		min-width			: 16px !important;\
		min-height			: 16px !important;\
		background-repeat	: no-repeat;\
		background-position	: center center;\
		border				: 1px solid transparent;\
		cursor				: pointer;\
	}\
	A.sf, #gfx-preview SPAN.sf {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAn5JREFUOE+lk11IU2EYx983qt1MvbPWVRAEIwS7qruEAlHM0HWRuYoSLzbcNBxIpjDSSPzAtC9FkYlDNCGIEO1ChpmmsMIJikKM1ObUMV1pa+zDf89zjkMK6qYXfvCc5//Bew4cCUD81+GCVSmF74B0mouJJsK5D8+8Y03xcoYRfxRk+dPS+r4XFMzG7PatvZaWGMMz71ijcNbfCrI2dLrXZN7GwADg9QKRiArPtGONPVzy2w1W+Gqpqc5oTU0I4+PA+joSPT1I1Naq0Mw71tjDXs4sJ1/BK6VxKydnLuF0An4/4hRi9gYHFZLPrLGHvZwh1G+wKGVr2Grdji0tIdrRgWh1NeJra4i53Qo884419rCXM4Ra4JFyKGKzxXeDQUQqK/HT4UB4agoRk0mBZ96xpnjIyxlCLZiR8lXYYokHfT6Ey8ux09WFkMuFcGmpAs+8Y03xkJczhFowLuXzYFFRaGNyEqHGRuxarfB7PNgcHVXgmXesPXjzBUMVzTucIdSCYSFK5jIzl4INDViZmcE3s1kh0NamkHxmzdj+CYb6d5G7BdVPbJdMakG/ELqXGs3I1/z8XX9vL5anpxGoq0OIrn+/yomrjyZQ+HQWhuZpFNa8TbzwAWfrP3oyHs4alQIH/QydQuT1abXu5dzc8CaFV8bG4F1YQE7TB7SvAuZ54IbngMpF4NS9CbdSwOc0USHE5W6NxuXS61e92dk/AgZDwnKnde9CiSNx7lZ3NKO4c+dkyeDn85PAcfOwW1c2ot6AzmHiGHFGL8TFMiHsj4UYeibEe4Zn3rGWcs0xn3K9z5Nq7L9JJeo3oHOI0BLpxIl/cfRKR8+RvLbb+xnxC4zGFp5ViB1yAAAAAElFTkSuQmCC") !important;\
	}\
	A.qs_n,\
	A.-sf {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAkhJREFUOE+lks9L03EYx5/PCOZhqCdrCeFpOGLgnzDoIEoJ4kkKL+FByRnoSRQWFogl5aGYGDJx6EyIwiIvMkYpDnZoHqRBDDabU8d05ppjP3x63p9vIyqiQx94wfN93j++n32ZYmb6r4OCXaUo+ZMGmW8KDwXfDzBjB017kQH0W4EzVVe38LWz82PJ7T46n5oqAczYQZOw828FzgOr9bWYj9nvZ47FmAsFA8yygwYPSn65QQJXq631FUdHsxwMMu/vc2VujitjYwYyYwcNHniRiVd/QkypW0dtbdsVn485leKyhMD58rKm+gwNHniREYxv8Empx3mX67gUjXLR4+HiyAiX9/a4FA5rMGMHDR54kRGMgohSK4Xh4XIuk+HC0BCfeb2c39zkQl+fBjN20LRHvMgIRkFIqZf5gYFyJpnk/OAgn87OcjYQ4HxvrwYzdtC0R7zICEZBUKlnme7u7MHGBmcnJznncnEqEuHDtTUNZuygwQMvMoJR8Jbo9nZLSzQzMcGJUIhP+vs16elpTfUZGjzwIvMKf2EULBJZX5jN7750dORS8/Mc39ri9Pg4Z3F94b3DwavNzfymqYlX6+srfpPpZIkoIrkZXeCVohmi6wsWSzje3p4/lHBifZ1jOzuaJZuNz3p6/sBDFNYFODbhLtGN52ZzIGC378ZaW7+lu7oqYLGxsfiopqb4QKnTe0Sf3RIE96s3kOwF4aJw1U507Q6R+wnRylOiDwAzdtDE4xAuXZGMlBjfQI5JsAgNwuV/gBfBiwx9B3v+/q1EEQ69AAAAAElFTkSuQmCC") !important;\
	}\
	#gfx-searchers {\
		position			: relative;\
		display				: block;\
		width				: 99%;\
		min-height			: 19px;\
	}\
	#gfx-searchers * {\
		display				: inline-block;\
		clear				: left;\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 8pt;\
		font-weight			: bold;\
		vertical-align		: middle;\
		margin				: 0;\
		padding				: 0;\
	}\
	#gfx-searchers LABEL {\
		font-size			: 8pt;\
		font-weight			: normal;\
		margin-left			: 2pt;\
		padding-left		: 18px !important;\
		min-width			: 16px;\
		min-height			: 16px;\
		background-repeat	: no-repeat;\
		background-position	: left center;\
		vertical-align		: middle !important;\
		cursor				: pointer;\
	}\
	#gfx-searchers LABEL:first-letter {\
		text-transform		: uppercase;\
	}\
	#gfx-searchers .siteList {\
		display				: inline-block;\
	}\
	#gfx-searchers A {\
		font-size			: 8pt;\
		margin-left			: 3px;\
		min-height			: 19px;\
		background-color	: transparent !important;\
	}\
	#gfx-searchers A IMG {\
		margin-left			: 1px;\
		margin-right		: 2px;\
		max-width			: 16px;\
		max-height			: 16px;\
	}\
	#gfx-searchers A:hover {\
		color				: #000 !important;\
		padding-top			: 1px;\
		margin-left			: 5px;\
		min-height			: 18px;\
		text-shadow			: 0 2px 7px #555;\
	}\
	#gfx-searchers A:hover IMG {\
		margin-left			: 0;\
		margin-right		: 1px;\
		width				: 18px;\
		height				: 18px;\
	}\
	#gfx-searchers-mnu {\
		opacity				: 0.9;\
		position			: absolute;\
		display				: none;\
		margin-top			: -1000px;\
		margin-left			: -19px;\
		width				: 100px;\
		min-width			: 100px;\
		padding				: 1px;\
		z-index				: 1111;\
		background-color	: white;\
		visibility			: visible;\
		left				: auto;\
	}\
	#gfx-searchers-mnu A {\
		display				: block !important;\
		font-size			: 10pt;\
		font-weight			: bold;\
		text-decoration		: none !important;\
		min-height			: 16px;\
		padding				: 2px;\
		padding-left		: 23px;\
		width				: 79px;\
		background-repeat	: no-repeat;\
		background-position	: 2px center;\
		cursor				: pointer;\
	}\
	#gfx-searchers-mnu A:first-letter {\
		text-transform		: uppercase;\
	}\
	#gfx-searchers-mnu A:hover {\
		text-decoration		: none !important;\
		color				: #000 !important;\
		border				: 1px solid #c9d7f1;\
		background-color	: #ebeff9;\
	}\
	.virtual-list-icon {\
		display				: inline-block;\
		font-size			: 11px !important;\
		border				: 1px solid #999;\
		color				: #000;\
		background-color	: #fff;\
		padding				: 3px 2px 2px 2px;\
		margin-top			: 0;\
		margin-left			: -6px !important;\
		cursor				: default;\
	}\
	SPAN.virtual-list-icon:hover {\
		color				: #fff !important;\
		background-color	: #000 !important;\
	}\
	#virtual-list {\
		position			: absolute;\
		display				: block !important;\
		overflow-y			: auto;\
		overflow-x			: hidden;\
		margin				: 0;\
		margin-top			: 2px;\
		padding				: 0;\
		max-height			: 130px;\
		border				: 1px solid #333;\
		background-color	: white;\
		z-index				: 9010;\
	}\
	#virtual-list SPAN {\
		display				: block !important;\
		margin				: 0;\
		padding				: 2px;\
		padding-left		: 3px;\
		padding-right		: 5px;\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 9pt;\
		color				: #000;\
		text-align			: right;\
	}\
	#virtual-list SPAN:hover {\
		background-color	: #33f !important;\
		color				: white;\
	}\
	#virtual-list SPAN.selected {\
		background-color	: #777;\
		color				: white;\
	}\
	.tip {\
		padding				: 1px 5px;\
		background-color	: #fdfdfd;\
		border				: 1px solid #99a;\
		opacity				: .9;\
		z-index				: 99999 !important;\
	}\
	.tip-title {\
		font-family			: tahoma,verdana,arial,sans-serif;\
		color				: #10c;\
		font-size			: 10pt;\
		font-weight			: bold;\
	}\
	.tip-text {\
		font-family			: tahoma,verdana,arial,sans-serif;\
		color				: #003;\
		font-size			: 8pt;\
		padding				: 5px;\
	}\
	#gfx-alertbox-Box {\
		padding		: 6px;\
		border				: 1px solid #eee;\
		background-repeat	: repeat;\
		background-position	: bottom left;\
	}\
	#gfx-alertbox-InBox {\
	}\
	#gfx-alertbox-BoxContent {\
		padding				: 10px;\
		border				: 1px solid #bbb;\
		background-color	: white;\
		background-repeat	: repeat;\
		background-position	: top left;\
	}\
	#gfx-alertbox-BoxContenedor {\
		padding				: 0px 0px 0px 55px;\
		text-align			: left;\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 12px;\
		color				: #000;\
	}\
	#gfx-alertbox-BoxContenedor h1,\
	#gfx-alertbox-BoxContenedor h2,\
	#gfx-alertbox-BoxContenedor h3,\
	#gfx-alertbox-BoxContenedor b,\
	#gfx-alertbox-BoxContenedor strong{\
		text-align			: left;\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 12px;\
		color				: #000;\
		font-weight			: bold;\
		margin				: 0;\
		padding				: 0;\
	}\
	#gfx-alertbox-Buttons{\
		text-align			: right;\
	}\
	#gfx-alertbox-Buttons input {\
		margin				: 10px 10px;\
	}\
	#gfx-alertbox-BoxContenedor #BoxPromptInput{\
		margin-top			: 5px;\
	}\
	#gfx-alertbox-Box .BoxAlert {\
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOpQTFRF+qIvEhMS9oAI+I8Z94cQ5q1/+IoT/PXv+ZEb+evf9nwE2oVA/Kw694MM9XwE1GgQ89a/9YgT3WkC7cKf9XsC4Jlg13Ig8oMQ+6g24m4E+ZQfTTod1moQ7XwM53UIh2Eo1HAg02AA53IEW0Qgwogz7HkI35w5+Zsn2mUA3Y9QIR0V1WEA9YUQ0JI2+IwV4mwC+JEbs34w6beP8oAM9n4G7aU78Myv32oC+Zcj+p4r9uDPLycY+6Uy5HAE3WcA6ncIPjAa53MG94UO94oT7XoKlmsr9oEKak4j5KRw2GMA+I0X/K8+9XkA////SUCmvwAAAkJJREFUeNqUlulW4jAYQLPQFZAutuwuICqg6Dg6OquzzzTpvP/rTJo0IUUo8fvTlJPL7Wm45wD+vXLA1k8/NJfLuWcOOJ2fhMxSxxhIvmHfx58tU8A7Jfd5/tseOYZA8mznbMjkrxngZa5fAIicekbAfMwFTHGUmABBhn0BIJJ5BkBz3MjLsWfz/UBwiQ8l4OMs2As0u1yADrhi3NwHBJHLBQBwhXsZ7AFOhIBQyq+Nt816II4wf/oepVxxiKN3tUDabZcCqeie1AFxXwko7XGF+xjXAGnIBQPKhxTr9lW6G7D6brHnoCUArsjxzd0uwOmESBNQessVYcfZAVh9UgrOh2wobfHTc/vWdsAZrbjgiX03hPAjuwz4oVdK0gDriAtQ8TALCJmhVJCJtQ1gYXLBRQEMIZwW16cXJa2B5GilBHQK4TFfoM2SFOAtia8E9FgCF8Vn91pJCkhmPMyGeKG/IDyja4U9SzYBWT4Q284U8H6jJKDC1AX0GsLzctmolgSq5QN5yBDKlSgJy5JApfwfchf9ulDLakkCCL6I8ntq18MftfxUKQno5RO6dYheEhBhuhsCdXBaSVGsgLL8W7XlDfvxqddULakA4kesdyMOWh2E+g3im7gE0qt2pRt+DHDxsL4frEsCqnxNwJ5pOL3WbrWSQBHmpuDliJJCVhKQ5aO6/bSFZElAlo9A7Yg9ZOQBa0Jy42ElgY6NzAG0GoHsFQKmyJihbb7/e5gCK7KJ8YTRHXutncx4UmvHv5ma+S/AAMZeScTXQU/VAAAAAElFTkSuQmCC") top left no-repeat;\
	}\
	#gfx-alertbox-Box .BoxConfirm,\
	#gfx-alertbox-Box .BoxPrompt {\
		background		: url("data:image/png;base64,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") top left no-repeat;\
	}\
	#gfx-alertbox-Box .BoxInfo {\
		background		: url("data:image/png;base64,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") top left no-repeat;\
	}\
	#gfx-alertbox-Box .BoxError {\
		background		: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAblQTFRFvgAAvQAA0S0tvAAAxAAA6ZaWzi0t0i0tuwAA+e/vuAAAtQAAxQAArRAQuQAAugAAhQAAsQAAu0BA14+P3Z+frQAACgAAewAAtTAwyyIi7s/P0X9/rhAQtwAAyR8fsiAgrgAArwAAf39/swAAyRcXzS0tySIiuw4O9N/fzHBwn5+fZwAAtgAAKQAAzCoqQEBAEBAQqwAAMDAwzCIisgAAICAgxwsLcHBwz8/PyAsLsSAgtAAAv7+/qgAAvAsLr6+vzCcnxmBgrAAAzCUlxQYGsAYG7+/vuAMDuwsLyCIisgMDvRERyyUlMwAAxBwcrwMDzScn4q+v39/fwVBQkAAAzSIiUFBQwxQUXAAAwxcX3mJiSAAAxxQUxxcXxw4OxRcXyxcXxxwcPgAArBAQj4+PqAAAsAAAwhcXvQ4O3WJiuQYGp0BAyBERvwsL2UdHyxwcnQAAyx8fxhcXwAYGhwAAyhwcyhkZyxkZyh8fxgYGnAAAxx8fyhcXYGBg6paWGhAQxBcXyBcXtlBQzioqxA4OvgsLyAgI0C0tvwAA0y0tzy0twAAAwgAAwwAAwQAA1C0tAAAA1S0t////pzS0agAAAtNJREFUeNqM1vV/onAYwHGdHgoeKOI8z5w1u9Z567h1x617t+vuLsFtgH/xISEyEH3/hs/zmS8c+05N8aaoLWaFmxiwNWaLysYa6SWIOeYjZ60jYQAIj7SeReYdGKgSgC53xBsmDCTNIg1E2Btxu8BqAQafDxI4LYETg+cwphiAy2PNAEnLkEDz2DIoD5y+6TROK8LT0z7nzcAJbyr9eOFNNmGnNHDCcwStgpgTCi4Afeuq+0yx7gMrAuskQNcATFrFAJtKk7UCMj2FCQEIH+B0TfgBDPKB6x5A1wG45+IC0O0l6wlIrxtkA+yCoOtCXGBs4NjG6wvwbUcpiKIzdJ1m0CgT2CaIegNiwsYEQ08MSneopOHPEBNYQzipAq9g+GFlAvcON3n69VZ1fLHjZoImL3fxoKiCDz41MkFjcx2BgXO/HDAXD2sEDQwu2ONq1aCB870U+F42VPPvpr2e0sf6m1AYSRC8969KH2sMufzb3d29v/9udVWcyf169uEaipUejWD+tqij4/Pb1gVmDkgsvNnV6/WattKjAfbr9DKjHY9DoRd3WaHQ7ugVy9gPso+3+bq8eKWmgLCPd9HWppMPLxUYURv3J3pkLlxWdV2Wh45A/hBAjdKRooL51CUcMz2QVjJSpIV6hGOmuJhD8oUq8jwN1L8oHpWPTpkir0YD+X+KR2Wn3dIGacShAgi1fIsLQSdF2V8nIdmSVuRJWuwUFeeCLopht6AenbYKowct7VNZLjimuMLvQbRanQIk6Wf3KaqPDfoozsZJb9JcuWhkIabgyQa/ssTdQwt/mbI09pogYyUzZAoOW1L8Qid/0+NCQR2uDAdNJg+EmBkI5DH1BnMrh8L0i/h7CGSFF2cTz3N+1MRC/bmPiVlh0j5Q+V90PNAuDKjUVuIOK7GVKr/YEpd9E+gKZChl2bXjpSrfZvrigUwmK662Z9YCA12Slf8CDABsANFro6KJwgAAAABJRU5ErkJggg==") top left no-repeat;\
	}\
	#tbd .tbou, #tbd .tbotu, #tbd .tbos, #tbd .tbots,\
	#rpsp .tl,#rpsp .tl-sel,\
	#gbar A, #gbi A {\
		font-family			: tahoma,verdana,arial,sans-serif;\
		padding-left		: 20px !important;\
		min-width			: 17px;\
		min-height			: 17px;\
		background-repeat	: no-repeat !important;\
		background-position	: left center !important;\
	}\
	#gbi A {\
		padding-left		: 20px !important;\
	}\
	#tbd .tbou, #tbd .tbotu, #tbd .tbos, #tbd .tbots,\
	#rpsp .tl,#rpsp .tl-sel {\
		padding-left		: 24px !important;\
	}\
	#gfx-header .alerts, #gbar .alerts { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAy5JREFUOE+lkn1MzHEcxz/dXerqrjo0pZWuUpiEmqZoSYik5KFOedzCRVdRmrCRpzzEztP0SKVUIrWhtWZmwt2NzdOw2SzCasXkodR1b5+rPKT+891e+/3z+74+n8/78zVJHktDHn03kZ2jVO4bPCUq//zdosdv9e/NTIf+l4ySoVA6kEnlhrHleBgH9RLHs14CIn/J0FCyK0v+IWEMUfoks8B3JeFduBuFpsLZ36MdBFPnWBEtGD4YSnKhgbBQaU9UofSs6apVQH85ELgTgVMK56JpIqJA68HQFncaQCJLtk82C3lZENn9qTgA7dluMFRNQmNxUEfYKKGfr3Ekm4EMyiPeicSVKp97LaUh+FAajbZbmegsCwFqvJC3Sl4bYEGi+SOJ/oZUbvSbeM5il68k5nVhOJrU49F68wCM50d9OpAtQ/O5KYbVLqLQeTKiMFuihf38kfAYGx1JXJ00WfepfB7eHJWj7UZar+TrdRU6M0yBM1bIW2p9y8ecRDN4pF+Qii8bUToR7faTxjWdC0Zrjg+asxzwpS6lV/K5OAbt8QTsI7QclPUo5MKombyp2bwpI5TA78TIBmeS3UjxfP691B+fcz3xTW2LrnpVr6SzQoGOJIJhN4tOi1ESLdWFyMgi3I4ogqGtHtwJrznD33JTS4EffhR7oStHjp69AhjyPGF4kAlD/kT07GTBXuaYKZozZYiVC2Nn8UhzOWRKNUpcyaY+1f2Vodwb+uMyYL8JcFiI7vxx+HYzCXr+IksEHGIOczbZVihZbvlwsS2JV/IyKIUlWUGW29rUrujJGNZX7aQVty0FNHt6x4FmB1+04WC5QJY5cELM2Uih9BDELRvNkrQJNKo+RtTYvaN/ZrUEKHACyryAan6tDZxLdRBQMRUodOkrcISLnRHjwiLhswApWVNuqGXqxzRu0xiamlsttQeuefPlSOBRAvCEN/R0K6BVAHUzgItjWMTdHBeg44gEa3xGKOlEqM2Ki0ssNOVhdL8qapjmymprTVWcvaY63k3Lb0ZzdYuvtirRW1u5ebyuYp2T9tKqEbrb68yfNsSYPNcpJS/WT7ddy+Xx3/wE5nLuE5WUMPcAAAAASUVORK5CYII=") !important;}\
	#gfx-header .blogsearch, #gbar .blogsearch, #blg_1, #mode_blogs  { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAppJREFUOE+dk91PUmEcx09dtdZ1669o3mW+8XaAc1BEBBRBTbN0WW62tWq11dZWq63NK0tCxQQyMhVFBCVNpbJ1EflHpHbVSnI54Xz7PefECbfaXBfPnocDv8/5vjwcAsAFPvX2fd391ruzl+eyErifeYnL5nLcTj7P/djLcTlJ4iR6Bvos0XNll7ijh48kY61JkWOQ/g/n/A/X2nHnTSuurXrRs+hGR8oF91w9rDO1sERrIExYYHpuAh/mYRjVQTdcCe1geZrNy5C+92eH7hPkVroFV5a9uPjKjfakC40EqZm2QZwiyEsRpogZxmcEeaqDPqCB1l/xB3LvXVvgdroV11ea0bvUhK5UI1qSDjjjdohRK0GqZYhxzAijqqQKmidFSm6uNgevLntwmQDdZKWNVDQlHLDF6siKVbZiHhfIihGGoF5RMVgJja/srWqHhsM9Sx5cYFksNMBLKhwMQHmIk0VWGGT0N8RfQUqKIJ0LDZHzZOHMvAuehBMOlsWMDZbpWrJBKl4IlEWRlSGWR/l+iDfhHGdvd83ZYZ+tQzUBxClmg6kQYGaBUha8aoVU+Mr2Z1Ifs0/YYjaqk4ajZIG1QTnIjVCtTAUfNMit6IaqCir2Z0Ky46wFgfwrTdCdiAgywESNsDALtWqULGQlVQNFmVD/88KkMsz8yxmMKXeCD5ECCtMwolUaIYCcB4M8Ll1T27GGxTgf0stDyjDJZxkQQD+syJcHB07T20uV/dEpiH4+pUK2slvH17+sn2SLAkzxIXa1tdCPaF4/WL17I7OZKclsfCzJfKZV2Om8+X3jhAphh8Ki/8UiDcsqOmc6/MXf/eusDhd+QPJX2PXumu30be9uH/svCIWa6Jo7OOCvdrpTl/oPqqCg8hetQsv6qr5tMAAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .books, #gbar .books, #gbar .bkshp, #bks_1, #mode_books { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAw5JREFUOE99kmtIU3EYxs/Z5jabTi27oVlWrml3uqCSJlQf+lAgXahhFqRhFFkREdUHXaDmB+scI6EwKYugkBDyg5qWty5YmXZRk9RcO6eL2/I6B3NP79mczog+/PhzOOf5vc/757AuW/faMVZ7aWDANs8xMvBY6a9sCgid2arRMNa7pbXOuLhYxvqrn9FrdWxglEbhHP8WNPRz1OByMXvVWq3Zb8xxigGfVOkoTbNbXjxwiZ9fDwqfW2rFL62Gn6YP6wcdtoDG5gaZc2hYZbd0R/T3tSaJ7U3pQlvVc6GGHxm6ttDVn6MUGHCbnxKQsD84gR/vnrjEjuZRoeNNu9jVFjv8+0eYRejaLryvLxDaKk3m+uJx660tFA6E2aiCOVvpmCYBnwDw8Rgty8T3T40QOt96+NgEoaEE1tLdsOWGUlALc5a/JJiQ8Il14BOpySa3ANxGoHAdxq/HQbx7AH1lJ9F1k8JXoikgCYIJapGt9pXEN4GLI0Es4RGAX02swPMzLGpOsihJZWHKj6HQLFohiE4NNXGv4l1nwyvw66mBFF47KQCnR+NpFtWZLIoPymC6rKdAiKfF1Credda04Ko0eRWxkmQx1EZP51LUn2JRmSnDjRSS5C+bamGcXMUrWf7eHeSiPWFeRywhIlFLgorjMhQZpCZLqUEAhSYv1PdOdJ3gotyTvWHwC+k5HFUkKD8qQ+E+GfouL6YmM3zvwlcS+QXcIhIQXASdC4gwYh4qjsnxMF2Ogj1ykiz6l8C7TrgJnBQiuPnuMPg5RCgeZchxL02B3GQFvuZFeCf/fUo/21zRE5KYTcwiWQgRhPuHFSg+5IesnQr05v5P8jLvLIUs4CnIBxNaIpAkGhSn+oE3KHF2uxI9/5CIRqVj8JnxIgOAwcDXCFRnFIHXDKFwBknUhArcfhVydqlwbIsKPdPXcdjK0246bb10iWA8Ei/f6hJRtq2SBHZJcilZjfM71DiSNClx9N/eWj3WS9/55KZLvC8+3UlBia7zwg7/kXMESex91xPqRlpup04bOvH9H/yu4VSwfLNBAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .calendar, #gbar .calendar { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA5hJREFUOE9Vkm9sE2Ucx2/bi/nOFzAJiYhogoKv1JgYKsaoLzAiGI0G3xwCiRIN0RdGDWYhik5cxD/oCBrMjDNOhDkxcx3raGh3bdc/a7v1rr22d22v1+tWytat66TXFr7+7m4kmNw3z/P7Pc/v83x/z3NtQs+DTG9qB/PA1q2Ozs7OdTGef+S1u2PM010ywzBt9LXR185ML21k+tIPM9u3beM6OjraeUHYceg+gdnZPcUwze+6GEf3o8yx45+j58SXOPXurjvq397FNE+tI60311vfb2CafRuZ/vef7Tze04tPSENHn6TcJgYAwzQc76DJdePDj7/AsRPfYHXsCPRLb6FhfwON0YNoDL2Ixq82tAYehz74GI5+ehIfffY1boxvx8KPdxLDgIy/jYbjCPpPvoczvR/g+l/7UB9+Ffr556GffQj1vk3QT29G66ctaP6xAWe/2o/+028C4XtROde+Bhl+BY2L+6D/+RIV7oZ+bhdadHLzzBaz2NCNH+4nJ/egNbIeN7ku3JSegp7bg0X7ZguiDLIoXDgEbeggiiTt/H5ogy9D/WUv8j+/YEod2IvC73ugDj+H/Mhu5JyvQ3YfRnjgGQvimgohNMPDH57F1HQUnmAYnkAYnJ+0Nk7SHrfPkssbhJPzY8Ltw29Df1uQRDqDbL4AOZeHlFWQknOm0pkcxUYub63dti5STTwlE9BvQYzAKEjKWYhSBsaGpAEhSRnlNoiKdFaFSLm4lIUg5eDyBS2IkJRMqjHempsg2pjKGA7IZV5DxpCqQVIKSJE7kQ7h/NMWhBfTmIknERVEzAhJzCYIliJHsoI0FWQLRahzJWilMrT5MpTCHLWnEkiBLxSxIDGCBKM8AnS5IZ5giTQEcmKcltPmUCxdQ3lxCZXlKsoLFdRW/8W1xQrUYglOz9qdROMpTAbpVcIxBGcT5CqFBLVi2J8jwOLSMlao8Hq9boLqNFZrNRTLC/DcchKhVpz0dAbIHxVMiHGxijaPq3TySm0Vut5Aq9UiYBVL1RUsLNfMeTgWt9q54gtggpuC0xuA2x+CNxhBIBJDhE9AEAkoyebTy0oeYT6OacqHeRGzcZH2hi3IiMO185LLa/u/PBR7bGMk+xXOHI34wui4ze7kbP9cnrSNUX7ksvsJEzLB+Q4MXhxlh+0TrN05ybq8AZb+XpZPpNiMorLzpatspVJhq9Uqm1ULrJiWWYnyWnGejSfTBwzIf7uNbEuXrfcFAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .code, #gbar .code { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAcNJREFUOE/NlEtLAlEUx20vbdrYwo0IiqKCL+YhKj5QHMdUxIULceOinbQRv8Jg0CKIJMN1K6GFWU1Z0FfozeSi6GP8m3NlIntAj00Dh/OcH3PPOXcWAJj+/JjN5kVFWd/d3u6Pe73+mPTW1s6cbeQo/rZuY2Nzz2KxLJs4jq9Mp8+YTC6gqmc4Oprg8PB0zqYY5Shu2Kp6Dk17RD5fWDUJgli/vX1ANBrVA3nkcjlkMhmk02kkk0nE43FEIhHwPI9QKIRAIACfzwen08mAsryy9gpJpVLodrtotVoolUooFAoMms1mQbn3MI/Hg/H45CNEURQMBoMvIaIoIhgMwuv1wm63YzQ6/gip1WqoVCrodDpot9vsS+hosVgMHMfB7/czgMvlgs1m+xxSrVYZpNlsotFosL5QrwRBQDgc/j6kXC6z5hIgkUj8DEKTKBaLkCSJNfPHkJubBzZGWZb/BqFz/w8IjY8aSUtFE6GdMLbUGK3b7YbD4WA7YrVa50esaU9s++hukB6N1Fd7ONzHwcHMp/jbuutrbbZs+gWsX11poObe3U2ZJt+wVXWCy8t75n9WJ0nyGv1KlnThdYn8QkT9HcsLcS0nedG6ePkAAAAASUVORK5CYII=") !important;}\
	#gfx-header .dirhp, #gbar .dirhp { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA35JREFUOE+llG1Mk1cYhk+hoDCY4KqO0lJxaJTXqMuciZKZiDhAFNuOL9kHOIE4hbBYcWGxW3QxgbGR5Y2yxOkPfxjD1HaU4aS02RSb0ioI8S1SLAIvlEppKTJbwhTvnbJotmV/Fk9y5fx5niv3k5PzCACQlz5tQvLqHbHI2C1ZYuyOFxm7IiJb0i5E7C5pZowHWjZQ1hsVF6OPyXKbSfweA0nIMb5NSZLlGMhziD6EMH/Un8DM999htqEO/m0pyNMlsJrBOrS7tNA7T+GAJtede9aH4h8fQ3X1KXbWjz79p4QQxuv4Dd7+bzExasD03kIodHGsefgneM/VoH/QgLKmd0cOt8zirOUJTI4eVGsnkaDU/y0JlUxxOvjMJZjsb8R0bh7kTctYE38Z7oZq9A22olT3jqXx1jR+6C7GMdNbOG9+CKm89V+SUR5Do054pqbgz9qB3drFrGnsCoaGh2H3WFGmT7Rm1/ue+ANzCDyawbjHB7HSuEn2Xtu8iOhpEh8/BPvAAMa9XgQyUpGlXcTedF2C3W5Hn8eC0jZxz5pKZ2/n0GPYbDaMu3jEFZiOPh+J6AWEme3sgM/ei8D9Pvg3rkOG5hX26shp8G4Hbk38jKJrIk4kt+QfvOCDe4zHiGsCKw8PeKjktb+ShBFmThKBZytiMJcQhelwMj+OuisVNZwcx3vSUfTL61y8wiDdqOZnjugCyDjzO5LVY5Dl/Zr+QjITTRCIIgjek2EEu7Sx7NHbm/EZpborBR+2xHGJ+VfI8tJea9IJD5JPesEcn0DiR+baeUkbTeIREjxaKYGXphgjBJmaaPZQx2rU2hSosKxBgW4pt7r0GyJVdmSu+HwcW+vc2PCVB7JDDv8LycDWLVCrjoDLzoKTStI1kWyFlcG+ov2our0JOU0x3NrKKiLdYxKlnHyIg6ov8WntJayqciH4QuQGTWJWKlBYXonWj/fjgSAEOzRhbLmFwa60fFRZtkCuW8iJtyWRpSkNJFnFQ1XTiJKv2yGtcGJ53vUF5JSQML3CUNxN2457kQtxjybZfnEBW9i+CHWmffjAFANlc5Qt+EkFIaFEXMY/e6PSSQVuSMrdiEs9LSaMgLzpoI33Kf0UXkCwVh1+pvhOLAos4SjqjEXm+QhaQqKCxL9v9Uk+cWNZ9uW7izd/wQpChML/swUEtDj0PxuC++Rl+RMHwTogM8zN7wAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .docs, #gbar .docs { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA2RJREFUOE+NVG1rI1UUvmmaVoT+jKIfRIqubyWUQpu2X1pYP7gryi5+8Qf4A9alCpYiLOJaiNayVEtCutWoDd112UXry7LVdqVUNjFpm5dNJsnMZCbznpnMPJ472x+wFx7OOZdzn3mec28SAfC6C/axx1hkOMJ6g4z1GWMDBL58Aq+fIQRndYRilOCtr6/v7O7ufsUeHR3FH2qumxN6KFsBcT79Wl1dvTE6Ohpl//z91xv3JcfeKps4MfynZ6DOZDKZisVig6xSzMd/bVrON4UuipoHzbAhKhokxYTU0SATVM2CQpDCfZ1yEwGJXllZSY2MjAwytS3Ef64advJIRl7twXU9WFYPhuXAcnqwCeZZbdqUEwyqOcna2lp6YGAgxly9O/5DUXE+3RNwKNqhknanC5EUtGWK9HVZ1QkGZFIhKwY6XYNIAtBMNmnAgwzwX838K7pXfqlir0EN1HhcaeGk1sbJ4xYqdRFVQUZNkFBrypTzKMH3faRSqa2Q5ODB/XOb+Y7zwa0SditdmKYDhb4kh/41dEhB50wJz1Wah27a4QVkMpmbw8PDMfb1F5+NfXsomu9n87hdktHruaF8TsQP8KF2dSu0yQ/rFDWK3A5XQiRD7M729y+t7TeMd9KHyD0SoShdlCoNgoBSlUCxTLZOa2SrIaJCqLcUshMgnU5no9HoEPvpZvrc53+cGudv7GPrsAHHsqCSkg5ZUbo6VJ2reTJUbkehXCNlXMnGxsZ34UwqpcIry/dK9syXe0gf1GAZBoS2jGZLRkvqoC0pBJVuSkVTfJLLRM6VkB1OEmFtof7yR7cL/sT1P7H+oAxd19FoSyRZQpPIBJETdSASSUtWwgfIB93v+8hmsz8uLi4y1qxXX7x6qxC8du03JH8vQSKC/05pJqd1HJcJNBeOIu0VaK9YboQz8rw+crnc9tLSEmPZzczzi3eO8cIn93Dtbh6eZcIwdJhky7Yter0mwYLj2HRzvRAu3WC/38fOzs728vIyY1c/vPLcwWMtyDysB/tlMXCpyXGcgJoDivQzcPlB3/O8gEAKvID26K35wV1a4d/GwsLCs/Pz8xdmE4lLc3Nzl2dnZ9+bmpp6Nx6Pvz0zM3Npenr6MuUXJiYm3kokEhcnJycvjo+Pn6f6zbGxsQSRDP0PmUCHH9HPbVYAAAAASUVORK5CYII=") !important;}\
	#gfx-header .finance, #gbar .finance { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAyNJREFUOE+lVFlPE1EYrf/K8uCb+gBVLBJEIgVZLAU6EFwSgkaERATUxCVqDLS00MoqFstSRRAF626ILF2ndcpWWkpLO9M+NMdvBpDoq5OczL135p7vfOfMnUMAZP99yZl8GaFQrs23EF7Iq/P+xTCt/Q1t/rBcqxyWM6fr5DVnZSLBOUO/DU+7LdA/G4M4Ng7YoHs2jk6TFTrTKK1NQN83gQ7zOGGM3h1F7r0GCXIm74yMqtutb+cRCofBBbfBriXArvMIhJJY3RKwEk7BH+SxzMXw3bsDuyOGqfkgjr5pRKGzE/KakjEiKbC/++bA6mYMvmASXCiFtYiAYJRHOMYjFBWwvhUHtxGBJxDGAhtB49wIcufvQ+XSIYMp3yWZ/uKkagI4qroRTSEUExCL80jwPOIJHjvxBIrf3sXJmRZkT7fgxGwLStxdBAMpKRVJ8onEjV9BUUEKm7EUIjtJxHkBPJEIgoBPK8s49b4NmsVuVBG0iyZoHSYwy2ZSstfO5Gc3/JtJrG+LLSSxQ9VFgn2S2g+PoHJ04LxLjwtOAyrc3VB7elDpNh208+qjC14ydC0SRySWkOSHElH8WHeie9GGTJJfRCaed+uhJoJKrxnVbC8Yby+RXNj1ZHzOBQcXh25hCgpbIxTTzTgyVY/jc01QfLyF0iW9pKKMNaKKpTb8A7jkG5SwR0IRv3OidsaE7NlWqJeMqPhpRPmSQYI4r1wwQuOizWwfLvuGcM1nQRNrxXV2ZM9YJs9+0tyM7K/tKHbqUEIoWzZI8ospwjKaa6j3Cs4MZrUf9WsW3AiM4mZgHI2cZV+J0n588vqfTfskYv8lni4y0EAt9EK70o8rG6RgdRRtnA23f9nQ7H9JJFLE2faizw8l10WoXSTd0SMloKEEtKwZF72DqOeeozlgRTttvu+fxBPPG7R6xvbSYZSzBTN3UE4fTrmb/BDdp/7VXoqQUqhjB3DVM4wmvxVt/gk88L1Gh2caPe4PaHAOkSeqEfEAZlQ9bkFmoTK9j6zCnIOxKiedRc+yxHuRMq0oykmfEMcqZfqo4liIDuBhmfg/+V/8BsLlBkITQoa8AAAAAElFTkSuQmCC") !important;}\
	#gfx-header .groups, #gbar .groups, #gbar .grphp { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAx1JREFUOE+lVElMU1EULcqwMq5MXLhwYVyoyCTgQgYpBWoIolFQUWIMIpSWFmWUokRmB0SSBhAqgkxKIhIlShQhyiCQGAVERYyGGQqhlcFCleN9D1s0Gjf+5Px//33vnn/uee99M2dxlMB4AQIB6GZmtpwxMwYU6xcWhQbD9zAaMlhamassLSxaTIWMxAgnnyiBo7dC4OSzDJannJXN7gj1yTO5S+rKx8grfYjA0Myl7bsl2TS+iov4F8lOmmDtHp6RcvU2dLOL0M7o6bmAyelZhMeqQERn/iQRR5nbecrW23tKN5ASCwcv+VqvQOXw5yENxjRfMDQ2zTGpnUPn648gle8dveWrTUocRJE2DiJZw77jqfMHQtINTt6Kzi0upyRBkkszE1MrBIxkVKPDx4EJCA8kaKhuHSex95RZiwIStQ3NXZiYmoGG5La97IPvsWTs3HN66W3/MOXmMDg6zaGb1eNpaw+orpt5xw209YiorK3vwOxXg0myliY2d77DNrdwRCTkYWRci5n5RY4Pn8YQEJoJGw/pKe4JybESHjw7wOSN/tL3MBUx2ay1Tc4ntOLD5xCdrIY8sQBu/rHY6hrWRASWnGSHl3y1i19Mf2//CMapFaN5IxM6Lt37kBLHInOQlf8AksRCyJLUPD4qzYa9SFZsWh1rd8nFtNxqzOkN3A+Gef03qG7UQRSYhNLaFyi+24KSe20oqWnjcdn9DgTLr8FOKJX/3FCKNbTm7fGpxXhC5ja1vUHK1SqQV7h0vQ7lDzp48c2aVsLyk+Vyiuvh6CVv5yTki5BaGjwsuQLf4AsQByUjMPwyRAFKhESrEJdRgZi0Mo7Y9DJ6L0dCVgWkyiI4iRU65slmV/+46Wz1Iy6RfYXJvVXbjvzKJvgcOc9WqJFUKQlptsKINGqBIZ025UUSIRfQi4qxlxNBUfXz38A8YOS0V1ppZ1oQ6GytwHi+mJIP6apaFN55hryKRhPyKxtRUNUEVVkD3PfHg4q3sNb/SkID9bv8YrqppS5CD4HF3W774hl6XfbG9tGcV4SNK6ddwclMStj/43/xA7D/eWVsb7d1AAAAAElFTkSuQmCC") !important;}\
	#gfx-header .history, #gbar .history { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAtlJREFUOE99k19I01EUxyc0jR5cpVQPzRSUIF+c+OJ7lhChbD4IbkpzqSvIPxv+IX+JtrV6t9BQoYdCsG1kc6KZuanFTzMip2666SxzZnOW/pz19O3eX25MftGBc7m/e8/5/A7nfk9cXW2dSGhQiyCSk/Mrojh6yy8DxC3EewTxFBLjJS0tbdzTZ32Y+jCPYHAP+7+Bra19vP/oRm+vBa2tBo7El8TmxQKY9vZOzC14sbb+HUOvxtDM3IH2xk3cbm7B8IgTgW/bcC+uoqOjCwTCREARiOrho8dY/hyA08mitlYHrVYLlmXhGHeivFyD/Px8cl6HybfTWF0LoqOzm4JUfDvo0tZ2N+xe9GPiHYvq6hrk5uaiQnMdv8L7CIW2UVqqQuq5FGTLslBZWQWbfQSL3i8wGu+FIxB1n/kFXyr9U17eRWRnZ0Gj0YDjduHzeSGTyUCaGfW8S5exEfwJs9VGq1HTSmyzc168cUxALlcgM/MC4uPFyMnJgde7hKkpFomJkkOQk0lJGBmbIP1bphAbhWB3DyCvgrS01GjwieMSzMzMwOWahVR69hCEVtXYyPB5NJ+HUKuoqBIEWixm/q6pqVFwd400m1oUwoUBhmkVBBYWFsC35ENoK4SaW9VIEMfzMQnHjkJf33CoEtuCZwWvRydx6sxpAUihUMCz4Aa3s4umhr8VSVOkGBwahWveF+2J2tpvx2ZwB8rSMgGEJhWRho87x9HT00X6I4WcgNc3QjBb+qOvIzKZ7od9K+uYZKehVCr/CZJIJMg4n47i4mIMDAzDs7QKg9EY1Qltrqq7+wm+Bn4QeTtwtaAQycnJEIuPIIE8N92np2cQCRThJQH4/QGhYg9mgKEgWtHG5g6ZHQf0+gaoysqg09XDPjhKZirEV3AgecHsRGaoxGR6wFmtdrg8foTJq1HbI3r4NL+C5+Z+GAym/05x7ESrqRKpBmKcftPz2Dh+/wf4/V8DB3u7WQAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .igoogle, #gbar .igoogle { background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAA1JJREFUOE9Fk39M1HUYxz8ozM21CTRJquE/Nl2uX4xsZNmalr+WVLq12cSkdKtNW5F1/HLaKWiYDOeE3SYYB1MoQrhxmXA7yRAZow7jJAwOECI65ToM7uL74159vt84+myfzz7P53me9/M8n+d5C0BEIpH5rSmKUEIhYbxHd6/nF1FuyRX63JumqqbO8DMPU9B1oc8pDHnq/t+i/dtL8bUH9r/23bYN/u7nV+L87JPZ+4qaaOg1TTP9zEOfE4z7nYHBxEardaM9Y0tz2/YN+Pe9Ae9thR1rGUuJoy4j497d6ZlUE0QGFJG5qMFgUDjz8goLF4iQZ1M6HNsP+fvggx2ob76A8tIqeHopwThBXdoaxicDFjODWXlcr6lOLE1+aLBAJlSQsgLbkgeYeWcLWuarqBnp6OtXo6cuQ390IcrDCxiWdlXPpDLq81lESVpa0CqEal35OC57HWNTMxx65S3OyEjhzalEXlyB9mQSLI8jvFQwkSDwLYmlVYJ8Gp+AaD1ZPFz8/m6mVfnH5tK5N62Rv3EnNgmirk6AR2IIJwn+ejCGocWyBOn8UVIyN6+6wuYnVp+z3pwK+P9z1yWQrkoQlbzNb3NeGoeSFxGMF3QuFFhjF7P35XcpyMk2zHeZHbCftRaNDNzCPzHGZGASVTNAFIJhnSPb9nAxVmCPEWStWseuA3aKSxtx1BQhfZeZc9B0sfw5r+cGXS1fY8vfyU/trbR7R+gfG8frmyB3614yX7ew/dAVjp5yY/uyFLezRqYckdCyhGst9cvbWurxdnzPwbUC1zc2jjff5queSTr6fDiaeiksaeaLk/X83PknJdYcfh/pq45EZBsjRMTIgDexquwYd/o9ZKcLfnRUUn6pm9yGHhpvePF09OFsuE535x+cPn4Ce/lhNE1dpxqDpCizsgw9zlF7drDydD4Vh3fjqCgipPzDr7+NEgioXHP34mod4ESehdpzRxWZepUxyvNciI6y23mhuUKClJUUcMb9LLar6+kavUKba5Aj2Vm4m89rsuQ1Bm+iHJpnlWyfeb87Pvxxw2X7rc+bHiOzbBFZlU9RlPMh/T0/GG17QlWV/wkYZWOUzoYySuE+/9Cmy7dbDnqGuk6h6Xvke0pUH7U3bP8FTYG/6vilZVEAAAAASUVORK5CYII=") !important;}\
	#gfx-header .images, #gbar .images, #gbar .imghp, #gfx-preview .images, #isch_1, #mode_images { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAuRJREFUOE+lk9lLVHEUx8c/QHxJMG2x3pRwx2lT09wVUqGSSpOeCqIoEemhchkVIUvE9tyyMU1z13EwmzG3bBxmhDTIxvIlJdColLznjn07v6tDpUEPDXz5cefc8znnfM/vOgFQ/fdPQH7X++UfnjFtpIt6SvoILfWFVZFh320a2HuLhtQ3aMQ8uxKwPucPgAiW2eSzSQOEQ0ZCYi8hXicjrlNGdCuBwbholEs2QKpm7RkJeupI6JE74jqpK7qZ9FFNhIP1hMgnhNh2QngtYXeZBPV1QkChZPbXkNnnqjTun0/mGqs9XZWolzvidcTVCDGtXLFZVqo3ThOME3Ooez6JrtEZGGZkRDYSAgsJEXUyysZkBBYRBEgl5o/tIES3cLvcQXw3YdD2DTGnb8LZ/xxc1LmsIuxIq0ObaZYBPCq/b51bgbqU4JcrWVTCwCiuIFqPbJBRb7MjObsSLsFZ2BSugVv8Tbgf0sI1uh7qrJcwTn2Bz2VOzhEARRZVZAP1HnzMLWoJB2oIM/MynAMy4RpRAI+kGmw92oltx/qx/fgAthzpQ9+bJey79RW+ORL88iU+GRJWTQYWQisJIRWE6QVZGcEt4Q4DerD9xBA8T5qwI+MVNicZ8GxiGcHXPsAvjwRAgCyq0ArqD3lA2H93VR8WCG6J1Qxp4A6MnDyGnafGsTV1FF4XrDDPELwzLQpkTRbVnnIa4osEPnmNhOxhGQ8HP8M9uZ3VyyATPA4PwzPdBI1uHlrDNHZdWvwFEZ6oS6UR4XJwicRaBbWwud3WJRwpt8H7wjjS7n9E7ctFvHj9CV7nR8RaV8e5yr7kMSSomEwiOahYYvHeC0RAQkrLd9SOLuCR4S0e90/hzH0rj/OOAQ5D+XRsJ+Qe9QcU8E3UKBcHvquBNeOE+xJ8rigVFSPXzHQAhI8DqqZJewpXV66yaE3sXUisziHlv3Uxx3t1E/bUDR+gfQVO6z+wfz1vgPwr4W/xn6BA7glCYc1+AAAAAElFTkSuQmCC") !important;}\
	#gfx-header .intl, #gbar .intl, #gfx-preview .intl { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA1JJREFUOE9dkm1sU2UUxy/RT3zxk34xMRoxKjimU/Z2+7o6Bo7hTGSZGEJ8F4wMxARDQiZOERNEGEw3aJk4YWwC2xhsdusSmIMJFQZCxImkY9K0tl17uw72QuDnuW25Iz65/9xzbp7ze/7nPHcG8KCiKDPHJhna5A4qEW1SqXA8pMx5eKZ8VhRt9cfKfcQlIpkryozko4AydYc1D6z/bLvENIiuVnZFyN02TFbVFWxbLsun1Lod1YhanhVlErVOv2MSB8xziTpr6nVIcr35078C8ZP1uY/Zay9wfnjMAMVKX01BDFAK5lczGNldgwFZ2nCd5zf5yNwwyFMV59nYOmxA4p9WTQPSbsLmTHz5zxDevXMaUvdLiIxP/uDpNReZ9Z6XjS3XDMj1gvlEpEhvQXcQkvgfcTGYO4fArh3TEO3mLWZ/NMCsd708+eEZfKGbSUjQP0j1ugwqXdmUe6ws6rBQvvU5PljxBO65jzNcW42ytzdI7MatZIEvPME2t5+h8HgyH4r9zSp3KWv7HKzstbPUY6Okw8ZLrVaKmi04Gkw4u2Qmr20eEAen+OLgFX73xY0Wgokgy9pe5u0eB++fsPPWcTtl3TaKj1pZ2GJlfpNAflD5/pxLIF+e5rHlHTy67CglVX0GJDGZoKx1MWVucSDFS7rExc9WitutLDhooXC/GcdeE/VnnSjlVd08Ur6PonXHWLKhk/jYhAEam0qwovsdKbSx6JiF4iMWFh62UNRk5sUfTRTUq9T/JpAzl/yM3lNoENKB7milZzULDqUc6LMo3GemQFzYduWnIPreO1MaiatfETtXgnYyl4gnm9E/Nxs8fyIg/cscGtMOBGB3qljvhQROLCbek8N4Xx4TovHjeYTb5xG58LUBKm1fJfb1FnQHAqhTsXwnTrwyWH3XteYsRt05JDw53PDkEu/MIdo2j1DP6waksPGNpH1d1jpRbT6Wb1Vcv6bbCXQWM9KWTexINpouibXDkvdXpv4XLYC6XU6uvetAxbxTxVRtwtWfdjI5cplYbwWhAy8QFo3IDSTObuW2DFVfr7SsTxaYa9LFO1Tyv1HJ22LigLd5QG/HLtr//1u5mw8E/sJ5ag+u0y6xLpKTnf17cJ500ehtbpJ99/8HdTsuWYdX2uMAAAAASUVORK5CYII=") !important;}\
	#gfx-header .mail, #gbar .mail { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAtRJREFUOE+lk1tIVFEUhrdRPoTQS1FmaJb3QAqRoNCnqB5EsUIiumCEIKRdR7TIJgQ1CisojfShIsrLjFNqytFRTzaSOo6M1hSmTVmTZniZnPv1b51tYUX44ob/7H3Ya337P2vtEwCALXl8VlSWjdXcbfv4+I4woVELpvYmwai4Lww/uC28KS8R9GWFgq4kjyQTdMUyYeD6RWHwllx4nrReqI9krapY9oiNVpX2jlYW493NAhifVMA2Z4GT7FntflhsfsxZF2T1ABanG9rLuaiPXA5VDANBvjFD6SnRUJKLQXkWtDmp0F86jpkRAygedocPNpuX5IOL3i3maWiy9qEuhKE+igMkGZnuXIaoO5sBbW4aNId3oCMtDh3p8Rh/2UJpgJtoPsnZpAmdB5JQs45BEc7wdMuK306MTHM0Sew6tB39soMYeXgDLclr0ZQYhIatK/G+8hoHzY2+hbArBjXBjEsvP4menP1QhJGTOHKiTokWW3eHoTtrD0/4UF2Bhm1BUGycP1FXkIm2vXE8uS6UYehqAY/rlx1D7YZfkOadq8VGOlnMSITf7+cBn1oU5GQNP0lKrKNZGREIQ3kx5iMA7fkjC5Bn8YFifXQA1Clx8Pt8vAZuyZH4Ag0JwaglB4qwZegvyeddc0mbNHQXTixAqLqichMjy1EE8cJLAebJKZheaTAz1AdNZiqM1VUwG4fxtbcbTqltNAYKs1FLXeI1+RMibdpnp/GlvRH2qUneFY/Hw8HSenpIi4meLu5YfyX3b4hiM6PPiYV9fAwmsRl28yxclOlweOB0++F0emnthZtI08OvMaXvIUjOP58Twai1ITBpOvHD7ITF6qPZ9V9ZHMDMxAQ02em84Pyy0aNPSU6ak0Mxa6V60NWctS0iiqFtaIvy+M2lmnyXIEWqSKZqSFil7Jef4dLKTy8qXXG+Up2eqFSGMxX9P/cYQZesJQMkEz8B/c8C4puEEygAAAAASUVORK5CYII=") !important;}\
	#gfx-header .maps, #gbar .maps { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAq1JREFUOE91lFtIk2EYx58Q1Jaiy+Y3nfMw3afbPM7TtOmUzdTKCxfmMdvmYZ7PdiS6iIjowg4DL7wpKrqK7qTuKopMCCKoC6kIyamrpZu4JLSn51tM5sX7wZ/vfT94fs///7wv3z5EhMBjyVbB88UlSIuOktK3waiwUJ30gCjC5fu9uba1Nb+DcPubx+vUyaTw6OPCbh0IkIAsWRkQK9pf3KrmF161mnGxtx1/DXeic8CC8+0NaM1SfeFEotJmtXJP3Z5Ns5pPMfOpy9/7Lbjcb0XXoA09o11+UEAtat5l5hXK4OZ7IFqpxCE4WCLIj6EOXOqz4GxDHa4OWnFjzI7rI534wdqEWmnsDBNyJCXxzWf7Kb+L1QEr0h5DQ0Kwmt6Co43RbvxJcHIyx4Yky+e+EmSVYriGbFirSBKmjkfp7SEnvnE7rlE0grxlx+Ekjhct9f5ZeKmrk2K9pHhC9+0zfeib6Pkfh5Ow41wpL1a0aninm4rc5MRH3fHcAG5P9uEmrf9M9mJXjmblfEl+OtOJo6ocsiQxZWd1WvfGWDe6yfr6SBd6R7r9Ti7rCz2qGHHl9YoS9hFPGfWgT4iD5KhI843KwzteGuYKRRNczNRUoDwyoq1UFgfXDDo25Im5Fu4eM8LDuiqgk7n/us2MK3RKnzpasFwePztckAPDBdlwqbSADbl33AgPCPC4vhYqEmWpY4W5m8Ilu2rQ/aXbrJ+uNsAdUxncJMfMmZzgUyGgxow0MMhlT9/bGtGUnPDudGZGSE9eJthzNX4xIQ1UGFCTSgk6GTfx7GQd1vOKqZmaSrhlLNsVE6IUR0OwNIcOVnfmqDGXi2kqjuegKC52V0yIKUkOwaK5aMXhoZjHSfQkCBYTcqEkHwK6SOvxorwUcXjYYpuGT7fRvyZYwZB/p1VK7ERbj5IAAAAASUVORK5CYII=") !important;}\
	#gfx-header .movies, #gbar .movies { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAANf7bzMYAQAAACBjSFJNAABsmwAAcm8AAPauAACFgwAAbvcAAOhBAAAxdAAAF2yhti2bAAACzklEQVR42mJggAJGBgYGZlVV1T8AAAAA//9iYGBgYIiPj09jVFVV/c/AwMAAAAAA//9iMDY2fjVt2rQ5yGoZZGRk/sMEAAAAAP//YoYxQkND1UVERNYyiIqK/hcREfGBa4EbBgUs379/h3MYGRkZAAAAAP//YpCXl/fu6elZoqur+y47O/v//fv3/8vJyf1vaWn539HRcYPp379/y37+/Bnd0NAguHfvXgYhISGG379/M5ibmzOcPHlSnZGBgYFBR0cHxR5kK1gYGBi0Hj58CPHBf4hXIMz/DIyMjAwANsgQh0EYDKN/E0LVgkNUgcGTKSx+1HIA7kDSg+wcbCdAd4YDMAOuZiMZpAj6TY/x2Zfvicf2r6IoTmEYnsdxvHDON5JSqrquH1EUbcMwoKoqJEkCrfUrTdMbK8sSRNQ7565t296NMc8fZZ7nAIA4jtE0DZRSyLIMXddBCGH/Su3nWWspCIJD+J4m8ubPTMCxZF4WYr7vg3N+lInW1dKXcrJXTRgMo/D5mhT8Ygw0BL7aSas1Q9GlvQC9AH8uIEMgwRsRvQPBG1Bwce3iDbh1StVWqFVBxNImNmQpvB0E+zf5Li88B850Hvknqtfrp/P53FAUJSOEuDYMw5xMJlfT6VRwzi9c1z2vVqvScDhEu91GEAQPLJ/P+7lcTrMsC7VaDb1eD81mE8vlEoVC4dN13bcoip77/b7n+/5YVdVxNpt9iaJo7fv+qxyGYbTdbjXbtlEqlR4rlcq9EGLneZ48Go1kx3GkVCp1MpvNlMVicZNMJm8dx8FqtUKr1XoHgDvTNHeDwYAajQbpuk6xWIzK5TJ1u12yLIs456RpGtm2TZ1Oh4rFInHOSdf1NQOAy3SaznR9Pw62nwcRgYj+sYMMkoTNZrO3RAhBiUQCxxxjDEEQ7AtUNU6KEj+6IPwIwQBkJEl6+h3T92PsDz/YAAbgawBQdxJwGsGCtwAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .news, #gbar .news, #gbar .nwshp, #gfx-preview .news, #nws_1, #mode_news  { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAyZJREFUOE+llAtTE2cYhdM/qi0DgpUGgmK4CBEEBloMrXYYMZ2RCgSMLY1WCIQIBHIlyWZz35DES5FbMBc11MZ25um3C+MfcGfOnH139zt73rPvt18Bui8+VJFnThdXh8w0m8YYt0zTcL1P1OMYhn/ka6MJ0937XDKNcLlvBOMPd/im6yb9d6a42GWi+YYJ3Um5wvv3VY6OT0goed69+0BITnJweEy5XCYoxXhbqiCnFF693mPv8EjcT/D6rzcEIzIXugfRHZ6UiWXzxDO7GkczWY6Kxyj5HGklQVxRiKXSFF68IiLJBMIRtv0BfP4gkqgbrg+gi2dy9Jp/oXvivsY9ty1C4CVTM7NMzU5zb+YBk9MPiMRk7losTEzdwzw5iWXOSjgS1VrTHRRPSGaEg+yu1o7qpFgsks7nyWQVEpk0yXSKwssX7Mgy/lBYc+EJBAlJCS4ahZOiHCPbZiDdcY2UvoOEoR2p3UDU0EGgvRWfOPfo23CLZ1x6PUv6FpZam3AM3SIcDp+LiF7VPOKZAvHULrKS41iEnM4rZJRd0sJZLJXUnKiZ7ISimgs1F0mOnolUSmUebwT43b1zxps+bO4gj1whQskcpqFRGlo7aerooanrBo3GXho7TVwQ13ZzhTORt+USixt+IbDDb+sBwT4er3uxuXwE41kGRs1cutrL5Z5Bvusf5UrfGC09I3x7rR+lkD0XEcHa1oWIuvD5No/WvCy4vBoHYmlujf9EY+8AV8SwqcNnGDbTNnBbE0qJ0DUnav/qAqsQsK1tM7/mESxqpxevSH/w+59p6eynTUxr+6BZYJzWm2M0dw9rX00TUQdrwekRi4SAy8280411dZOHq262xBw8dTixLj5h3r6E7U8nC09WmF9cZs5mR04o2rbQHRwdYl3ZYm71HA43s8ubzDg22QrJ1Ot1DZ8+/cc/9X81rp9zNBo7c7K3/4YZ+wq/2h08FG9RefqPZQ0uj5/a6Uc+1P6mVqtxenp6zh+pij0W3JEwjk6g29/f55lrg6diJ6tYcq4Lfo59ZU1Mp0S1Wv2MSqVCqVT6DEmSCMaS6NRfwZfif6GCVjIg0Z6wAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .notebook, #gbar .notebook { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA75JREFUOE9d0mtMW2UYB/C3czpjjNEMsShrofQOVMmYdZKNzY0NP0yjjKxDTdSNYMu52HLp0IyCGzTO3UKiM0E35tpB24zbKrRsENpD6aFcnSxGY6JOE6NRiZ9mjPr3Ocztg+fN77wn7znPP+95zlEFTjgYaPyV9Zyw23xz/1oVW/cP2J8AY4rbxxqVcqW6K/uBv3WL37LLQ1+pX125eTdbXfa/P0gGvN9Pn0XP+YvoPtd7x4cfh/B/wQsBLMU/wkR/z++Cf5QpWPOJTxWZhuOjcPrjqCO1nXEc6Ijj9aNxvPYf5fogrQnHRuGiZ97uGoHwbuxBwliNT2IOn5Te357EvnYJe8m+9knsbUugypdALRW84EviRVLVlkR1O6230kz3HL7E/TW+BGOV3jTb7U1P7/KmUdmSwi7vFCq8KWxvTCF58SSQHITvdARl7hmUeTKofCuJ8sYMtjXNYGezfB/VMbbDk2LPeFJTWxtkbG0kDSk85ZHR2dUHLE4CyykAP+OdU0EU80sodS+hRFzARn4Om4TZe+1ihjG7KLMnRVnaJMooJSWCDLswiS3COOS+U/jp16/xBw3gBlxtl2Covw5j/SJM3AIs3Pw9hfwcYzZBVkjFVFxErMQkzsHAzUHnmke05yRWfpkC0uuA79To6DiMR5zLyHVdg8a5sFbrnGfMyssKicBCTMTAZ6DjZqGtn8cG5wKiXRwwRiGf0a8zzeBu/QAPOz/H+rrlNVl11xiz8JJCIhQiwUyM/BQK+BTyuDQ09Wnk0I5+PL4eSFDILLnB0OJ7D57OsAornzBm5MaZiRuXzMIEzNw4lJnWoKe+6IQktJwEPRej0Ks40+EGRm7tBovkm8rTqyHa+hjL52OpAj4GPTEI8TvyqVDDTyCXn4SaTyKbeA8dAiIUcL0G+G0M/iMuNct1DlPQcFonDsNAjMQkXqY5Sr0ZgU6MQSuOUdAVCrqKrDcllDcN44fEMSwnz2BDTnYne7QuyLSu3pkCrg9GoZca2wcrKRRC9KUi1KdL1KMBep1B5PFDyKFQtWsIDx0MQazebi62WLbRvsAeq+2eyOMuwOgOwCIGKCBIn7sXNlEJC1Of6P8Q+qlH/dCIA8gVw1BzQeQ5jqzWKyfVYvfhAxtb+6BrOAdz03kUNvaiuDkMW0sINpqLmijIHYLBE4apMQRNcwRXIgGZak23Q9gbr1Szis1PFJaXWvc8/bjhqN2qjdqL8lN2W0HGbtPfUqTPlJVYv9ixZfOXL7/kiNZUV7U8W7Hzeb/fz/4FCfmJCsAgYgYAAAAASUVORK5CYII=") !important;}\
	#gfx-header .orkut, #gbar .orkut { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAASAAAAEgARslrPgAAAnFJREFUeNpNkktIVHEUxr//fcx9zduRO5XaWGIjWUgiBAOaULZI3USbFrmxVbRs5SZo0y5oXVRaEAQtKiITrIVtcgyZwkWNaT6G0RmbmTuP+5p7/y1GJw9ncTh8H4fv8COUUhxUQauKHpgZzc7XAIhRxaP6qjUaDnmbGq456VqpPJtOPUoVv+3YJRMAHxBahztik2driZis7HtI44KulVK3P/yeXgYIAAYsABf1hqZ3arB7KiFIvn2DqZeXJt6uv0qx4JV2f+fNvvD5o7Tu7n7a+PPku5GvunB67iR67l0QBIVo5Uru9Y/FiXcAoiMnzj2+wrT69JoDQPax5s/84o03haUsy3OJ2Wt8XwdDakb6YdKFE4hH+mfGTUna3tazBStbsLY2dLSFB6bHxYhi28bqg6TsAaOvF7VUHsCxq6dIQN4t2hZAAAKYQC5vCidb1JEYgOLyjp2rMPWS4dh1BqzSHbJMF43UjbCADdh1+OItAOyy5dZsBhwB4MKhtsuwTfGBh6IhbW4YUfV5giJA/37NiDLLEbgAPWiZZ0SOlpayAKSol4/IjHA8pF7qBMjGzMre3K+240qQZz2ABwjy7JF2aet5Kju/DiA61uUoEsnlNbq6u3D5pVU0xIjSe39IHetm/SIARzM2n6ZW7i5Yuu7vjAx+vl7mJEIp1Y1q5kUqOfnehcOADcQj/jOtAArJbGWt4MIRg8rA9GhguMvnVQ7QMKp7c+nlWx/LmwUK939oMKG42v9sVDmtNnAiTVo1rUK0Wm5+be/LVi1dBMfIMb96MRYeilm80ASWHMY7kylJXk4QCKGUEkJBLNMN+ZXDj/4HpLIczArza/IAAAAielRYdFNvZnR3YXJlAAB42nNMyU9KVfDMTUxPDUpNTKkEAC+cBdSuDKlNAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .picasaweb, #gbar .picasaweb { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAjpJREFUOE+N0d1rUnEcx/HvmXvwIVYgEU5GFkYUJDWtmf0BYcVis5roClZQEV31cLW1NiqFmNDVYA/JlKCHi7HYOAeGEXgx6CbwZrCLMYTVdBfdFTXLX5/v8GfnHEYlvDlHj9+XX89RpmIa6V9CsVD/TFdrtcESx+dBUhSPaKI1ZVMsUpVy38K25R+BZsMMMaLLORlfePi6O+Ou2G3vNh2OX0jIKi32ldJT9+5yos2FSKYHrMBWkQC0PB2dbarYrVkD0mxfKo26OzFcRk4z4sRwkQHZRN9Ccf706JHvO3YO1jf5gwgAJbkRb6KgtB6Q59jo2qd2P1WtjbcZqhgRhuY3Eq4GRg5sA3zFZ3G+Vx+P9pGwWghIP5BC7e8wIDaSLlEYCnQwctOE/MT7kLzZOoSA7C+l3EEGZMXH3geMZCXyPKato+P6J2ZCqJxsMyDAZhnJM5KOaWuPotrBGxfVVkTcrXsJCmX89OqZt/44MWRG8jR+ee7lZEwrJKLarmhEneiNqF2Izl8f2wJk71MeCZmROcIGpzDccimiLuIoULjHBJigk9imqmuErl5QbfjlDxiuMtLTnQuPjHsNW+g3ujLlc6AOLpfyBD4n3U4CYMHwm9oWIn5nINw7fTiNQW27OjN+NVgL54NPxg4RYZjbg0oMnb0/FA6+8C0BEP/oC657eEuJ8NGJ1oGc+Q+kDpgRhtqB7AOy8pctcri2V3+f9JtsnZ+7O0yh7DEfvjSAZlAevUXD6ARq1AN8/hsw+ABg/xQmyAAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .reader, #gbar .reader { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA+BJREFUOE9VlG1MU1cYx+8VWto4YCQLUBzFIEpRbADFfZAsG2qBlgKVlwqlVEptjFOhwEoRVGTbBz8sw8XFLRu0okajcYsDWmh5LbAMJ4kbCaO8lJeNYcwQeV23mv53eiXZOPf+7vOckzy/e5+Tey9N/TfowGDOgYT3IpWvPG6Wx+OhPPBQACiaHN7Te/nH5XaNDiw0/rX6apQs4H/1FMXZ7hNZ05y7VGFKRVnjUcIR6JqOodyYgkpTGj40iaE3SVBpTIOi7tDsNh+at0Xgnew9HFahvyXBNfNZ3PiyGI3VOWjSZcBYJsXNUimaz7/m5rl0mM6JoUuIfRTKZsduEe1L4hlKv07Gvbu1GKuugUOpwpiiCGMFSgYHyccVKkwUqjBJ8imyZk0Rz/vQdDAjotmBEXGSAkuGoQyF2kpUK69AL78EfW4tqvIuwkDyWpJ3yJRwyhWYySvAbG4+nCRGcTgZFO3LDRHp7swlXe5BnKEbQkMXhFU9JPZiv8GO/VX9iNX3Q1g+gKSSh+gUZWEuKwezWdlwkhjD5copDu9AUfKVPuR8Oojq5p+Q/xkp0HciqrwX0eV2CEoJZwln7Ig93YcL7xdjKk0KpyQTk+IMxHCIhLsjURNf3Yv6ByNYX98grGN6/jnqbj3BHm03dhX3IbqEoOnFbnUXqiqvwyGWYjJVggkiYyScsIOavRWdEOiseIe0UtwwhNbBGaytrWNoZA7v6rqxs8iGSJUNfKUVl78w47cmEyaOpmIiNR0CP46cYvMSNTvVVsjq7dB/NYRDH7QjKLsNZxoeY3llDaOTCxCesoCvMINf2MFI1hdfwJF5HBMpktcSVmiiJlxhRZ3pF7hcLiy+WEbDvWG8ldOC858/Zlq8b/sVO/LbEK5oh+GSEW63G9MffYJxRuInp3xDDxJJO+JP23Dy6o+wDs0y+3Lj26cIOt6C7+xO8kSrSCOthhVYUJZdwUiePWrBuEiMaPamhF/YjvACM4RaC4LzWmE0O7BCWpHVdkFywY6NjQ1ce/AzePkWlCafhIvc5M+BHzBONjaKxc6hfEMSNHyFBbn1g1haXsXV28OIKenA0stVPOzytmHG4tIKep5MI+QEkRzOh0Mqw3h6JrqOHFtm0bSA8g2OU/MLLci82I/fn71EzTfDCJG3YeDpPBzOBfBOtGJ06jlGHH+QPTFDtE8083HUHrthd7SF7+eXTV54X4pmbReEyu6sRRCRl7dJW14iiyzYpWonkjYmeolR3P2bZgdISSGX4Mf8GzbHNh//cOkbQtX3/vGnbAEMWltAgtYWSPD35oSgeLWF9WaEerN4y8f7L/0xVoxcw36cAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .scholar, #gbar .scholar, #gbar .schhp { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA4pJREFUOE+F039Q02UcB/APd13/hHXnXZ2VXJBgzVPSdmehu04EG5iA49dgmwTkNmCMbUxxTAjYxjbAjV8iIxEboJaeImYW4jX1dsXl2XGezTLUFqKJFvt+t11Xnr37wh9eSdZz9/739byf+3yeiJKt79GD+0Fauy6J/u/MzAQWPRMR/iLEsrwZJkQsLdQPe8acNIvI380lu81GO41G6uhoe2z2ddrqf715BiH2DtibB3D1XBNEos11DxH9NiNt3JRDDQ0OMlna56XR3kFHe6yTocB1hGaugbnUCuY7B77/RIt5iEqhI02lifKkahJLdaQs2zGXUqXG4vO6EA7NgJ0YAnOhGcy3TgRG1fMRSUYmyUv1FB3Lp+ejE0mYVUmGOkvKl8NNCE57uBbXwVx2grnSgsDJCpzQJYTmNXkUeWWVnE4esE0Fp88geG8M7K3DYG44EPBo0SWNv7/0VV7yfyLPRb0liIzSjStU++E52g7W78LnbiN2KkWoEsbcWBwVsy5mKY8ei6Ss5T9bnrfG+83pbhhUCryQcBrbq9qgLCzGEsERbiob41LS0ik5RfjviKywPG24p/bP4PRZhMNhbpxujJg3Y8FLVXiR34flb6qGWpyNNBv3wJ55yJNl+WLJqY+dbPDuOYSYKQR/GcfoQSOk7wgRHZuEl/mqPzaklcUqi2Sk0b5Pn3166CESaTVZ1P0u+7V7/rMI3j2PUGACwZ+93C7Y8BpPDOOOVsSt3oXcgsYj2YXuS6kZZrdaY+LPIbXVhqzG7JW/awukuOW/zd0+OYewkyfAXOVG+WML6vPSEblsGCqdxfpG6kcPbE22NUXyzuPCzP7fXN1dS0iTk9g8mLsIlUlxGKwpwsjhQ9wTLoKZ6ATj53LZAot0lW+1QPR6SXkFFcjb2raUfOA5dbyTdIZ99W+L2kdpS3HBim7V+nCvOhkGyXoMGMQY7d3GNXGB8TXDVZnJCFNFMcUKNRlr6yhfVpGwTPAh/D8cy9/d1U452Qobma0O6tplax1zFsPXK4E9Kx49+ctx58puHGuQYZNEJUrckEH9B/tp6raPvGNfK+MTzOz+vi7un5nJbtLQHFJjcSyoLpV5h2rSsFfGQwX/aezRpUNZph0cGPFFcKHz4xP005Sfxi5cfCIpMW2hRKanrYrt/0AoS1r4lKlar91bIviqScyHsrzSbG3to1ngEYQ4hP6O/AVdsjNF5hWCEQAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .sites, #gbar .sites { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA/RJREFUOE+lU3tM22UU/RrlMWE4oAyQtkB57McSFsSKcT5wki6bm8AQDQycRMRsIcBIp3ahICCP4EbGwEA2ig2OTVhWeXREqIXiCl0pA7q1KB20pq8B2gEDZHEKx7b+YfzbLzn5cm/uPTnnJJcGgPzvR4+KfJrGZgfseD4+KTw5+WRaQVH5kZwPa987kdOem3Vi6HRauurssfTfXuNyv2Hui3uKYsWSCH8W2bt7J3kpKoDERwQQwklKOne1tuaRtqgYltyPMZeZjfkDB3EvioLcexfEhIbrDpTGvYzAsPgXInwpwqYz/0uSmnX84taRtzBBCDpp7mhy90G1VwDKGBRK4jk4+8brKOYmoiglGenHMyaTj74t3vNcZAJF9/5XSeSLCcWWiiooBF9AcleGFqsQ5bOfo0CVi8yBQzgm3o+j7bE4VM9AanUg0muYSHw1SE150XZzmJ679jF3ErLD1/fN+Qf2rUnrfbRtNuNAz17ktaXhk68/Ar/lFMoaiyFo5OPTxlKcuViNwqY6nKpvQm5542peTYP98GFuHXnGy2vPhFrz+KvWFnSYGnBalA2LeRPaVeB7G3DNBFy4DwimAd5toEAO5PUDOb1/IMv5Nw+DeHp6vjI1Nb01IruF1ZVVDIi/Q+foTyjTAtmKbaRKgYO9fyKxaw37RTYkNM4ivuYOKL4cbN4tJBTdAPHxefYdtVqNbnE3TEYTyng8NDQLIVsGbjwAxA4lYsMTiPUb6NL8iq5xM64r5yAe+xmScQP65GoQDofD0+v16O3txezsrINMjGvtIjxaskEzOgydUooZ1Q/QjQ1A0dcB+/wUVjae4OT5EbxfdxtawyIIl8utsFqtkMlkMBqNmNHp0H/zJpRjCnxWXIjyEj4qBHxUlpbgTFE+fuzvxMTcCgh1HiSpA5JpG0hwcDCVkpIizcjI0C4uLqKnpwetQiFmZnRoamqEsPUy2tqEEIlEuHzpEu6qFdAvbID6oA/cqgnc+8UM4u/v7zqd8PDwzO3t7X8sdXfDZrNhcHAQQ0NDUCqVUKnGMTo6CpvVjMebv+NqxxUMywZhMRlBAgMDibe3N6EoiiuXy9eGh4fXpFLpX0tLS45FFTQaDbRaLbQ6LSYn72BxYQEPH9rB5xXi2ysiGAwGlx0SEhJC6HQ6zcPDg+Hu7s4SCAT6lZUVjIyMQKFQwEHuUiSRSGCxWLC+vo7a2lpopqdhdJIEBQW5iPz8/Fy23NzcaPn5+ZPOQZPJBLPZ7IIzfCfsdjuWl5ddPWeG/f39IGFhYc48CJPJdClis9mEwWC8GxcX1+DAhdjY2PqYmJhzDrtfRkdH1zjmq0JDQytZLFalY4fvrP8G8wV/I9YjdwYAAAAASUVORK5CYII=") !important;}\
	#gfx-header .products, #gbar .products, #gfx-header .prdhp, #gbar .prdhp { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAkRJREFUOE9jYCAT1AkyMHZJMLCRqZ2BYYsLo8utXqkd744lvNvqyqhDskFZnAyMh6JZb5wt4L78ZJnRt21ujNYMNzrEvJ+vt+kH43VWYPxsjUX/09UgbNb/dJUpBK8EYZP+e9OVpuwJZL66SJdBaI46g3wMKwMjw61uiZx/f3/9R8F/vv3/++vt/78/X/7/++MpGP/5+vD/n8/X/r/ZF/Z/qwvjEhQvHI1ndUU24O8voAE/gQaANH4HabwLxdf+//506T/QJf/XWjHkohiyzJBBDmjIv38w238AbQdp/grSDNEIxh/O/f/17vD/M7mc/1YYM5iiGFLNz8Dy693pD2Cnfwc5G6YZaMBHkMbTYPzz7YH/P56uAXnl5VQFBgGMGPl4vugszM+/QbZ/vPT/1weQxsP/f77aA8Y/Xu78//ZQ1P/VJgz7gTHERBtDXmxyWA73P9TvP18f+P8TaPuPF5sg+Nn6//emKvxfYcTQiTVx7fJmstsfylywLxiIg5gL9gZC8J4ApoI9/hC8y5epYI0Fw/llRgwBWA3Z5MDYtMWZ8cgme8YjG2wZj6y1ZDgC9PuRlcYMR5bpQ/BiHYYjCzUZ9i7UZpDE7hJfpuZd/sxHV5szmBfzgAMNjoEpUxCE9wYxb9ruzrRuviaWmAFGMdeeAOY/WxwZ/680YZiPbgtQLBCEd/kw/d9oC1RjzBCGzSWMa8wZ+pboMVwB+tcTXcEEWQYhEAZ6b89iXYaDi/UYZHDlWsYsDvxlAzCjMaewM7BgMwAALv+wmLttefsAAAAASUVORK5CYII=") !important;}\
	#gfx-header.specialsearches, #gbar .specialsearches { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAj1JREFUOE+FkktoU0EUhicabyo0vsBERSGCYsGFigqiCzULaRaCIjYLF2KLVKrForRQEcGKC4sLaUWKoo2vhQsXEtF2oRTbhYKBLFxELe6kYkBt1Jvcx9zfc+Zm0hsNOHBg5pz5//nOzIQACD30PBQKCdu2RTgcViXXdYVhGCJYrxNx4X/heV7DPXVJ3sSnsVk+nzcSiTWX4rHY/enpj62c49rfRv8YOI6jcul0WythUn8GVq5aQSkslVIKjiBt3UJtqBKc7bt84fTJfbg+MoSwsZgN2lnIBEGKBgQVlRvo635azAoUnjCFgAdkG7VRM2BXjWeWy+L4iTNfn2WGgIqFlo1bkEqlmELoFjVFHYEuJpPJrtFMhgVqjI+PKYpcLjcaNFHPqnvSp1uWKbZv3Wyy0LUrgEfwNBY2RRCPLZc0bQ6+Ro3Atv3bP9p5fm1H5zmlmi2V4LqsAQ4cOqIozN/WXk3Bh8/dqud/pqmb2wbfv+pXop+l73CU/gvWxSKIRnkLesldeNL/L2QgVfBiJrvzYvm5wCxFcBTePMLrAQFrTEB+6nlMnvPZQBHIqhN12/xu2CjO3CPxhED+7npcG76N7p5+rG6i3AeBzw8EipNp9t7tH6wM/IkL3Mi9LeDhyBXc6W1Bx55F2LBpF/YfbMOp9sO4dSyCiReTsEhNLSQ0tUKvvukymg9STH2z4Zn+5evx4xfwkhZXAWeH/3K+rvYtOcHteK5Nps4CesQlRBeniErXmUc5qjvV/XPf+Q+LqsCuAgxPwwAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .translate, #gbar .translate, #gbar .translate_t { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA/VJREFUOE9Vk2tMk2cYhr/92b8lmDmzHyT75WKcDKsVBUs5iRgn/lgcmxsQddmcA8ZhU0A0I1M3qVUGUqCgdqgBAQ8gq4gcx5wGDzC7SdQ5mLSC1RZKW+Brvw+vfZBpxpPcyfu8yXPlvp83rzDtlwYl0e8URdHplkSnS1LOU37nqDTpdEhep0scdXrGXc6dO3fpBEF4VdFsWSwWQZZlIT4+XhCc9idMjbp47pcQZT+eaRlZlJj2eXEM/Ul7gwmvY5jcXdm3lNl5M4D29vZZwEvIo6G/sXR3o0/PZNLxBNHv4unIA5qyMihdHETR6lBk2wOyd2X1BQYGznvhYA5k0G5jyj1G7Z5vuX6qCs/d2xzYEMOx2LUcUqm5ZjQoTmy0NDWN3O21FCjD+f+XEudt4S+7FXHcwVXd4dnBgrAV/JKSjjl7N8+fPUP0eJmcFPGJPkSfhE9W4iqxJWlGErGxsTrBOvQUx8QYPTo9JaoQrhr0tGbvpTovD9nnRhK9KAvH3PIrRZe6qe+5hfjcruzQzbR/muiYGIPQbx3BOjGKra2Dp80dPLP8TuGaaP64dBnJ52FCnOA3m4vIlEIiUsqIzzAwPO5BnlKcKA8QGR1lEB4ODjLkGcbYf47ugU5qszPpyM3g8f0hZK+bccVNXnUv72RV81VRJ2s+r8LUeJOpKRlx0k9kVKRBsNzro8HazJLWj9hwMYFvvgjhZvkR+u8M4HON8dg+TFyqiZVfH+fa3WGiviwmKdfIiNuH1zNOZITWIJy6cZ5NzWkEn9WiPbOKD0zR5L6/jtOlJ/DY7Vzq6iF6h5GUEjP/ONwk608Tk6qnrf8hzjErEeEag2C8WME203ZWnohjeVUcCaZEij9Lojh9B09sNvYYrxCUWcPmAw1klJ5lY1494TuqKajtYNB6D+1qBdJzvYvOvmbWVnzM4sr1ZHXtpburhtPnC2l9ZCE25xjq9Drey/yJ+KxDrE8zokmt5cN9Z+i9P4AmTIF0tLWN1Zvr5O3FqT5VQQRBR8P5pOpTlv6gZd3JFNZ8v4/cshZabw7ReaOPy7cH2FrYRHjaUWrbbhAWFmaY+QqLFCUGvB6QtHlf8h11TjgLv1tO4MGFBO5fhCZ/E/nGUhrNZprNDTRe6eJIXTcJOcXs/7ECtVo9C3lZC95c8FZwuCpn05Et9sW5KpbkvEuiLonKmhNcONfAz+cvcLHxAmfMHdS0XKe28TLLli2bC/mP9krwClVi3NaNJO/exuEKPeVllZSWnFRkwmgooqysnOLy45SUH2OpSmWc4+RFM3/+G6+tCAlJC1m16mBoaKhOq9HqtNooXUREtCKtTqPR6Gbu1SEr9QEBAQn/Albh5pzIsGWSAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .video, #gbar .video, #gfx-header .videosearch, #gbar .videosearch, #gfx-preview .video, #vid_1, #mode_videos { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAyRJREFUOE+lUllIlFEUvvXSW0H01FsvkrtWM2O5FeqoM6OOkzo644prplli5FIStBhIFNKC6YO9VCiI4zbOorMpkpapRQgJYalBL0VRSlRf59zR6L2Hj/Pfc//zne985+7w+j5j765f4u3SF7Hy5qvY3PgtAsL2iAMHdwshID59/CF6O5fFxrefIl63X0TG7KO8EJt0vnPplXj/facQnqE1+KxrmBr7gP6uZXRcXMS12jn0tC/JHMPe9w5VKV4Uxo6jo3mBcusy7x5cRX6UA+Jy+SwmBlYxaV3HJF26LWtoq32O5oJpdF9/7SeiO1vvCkpPTMCkdOB244L8n/NuyypEfvgTlKr60KQfRpNhRMa6pAGYQx/DGPgIDbpByvvvquL6kRbwENqAHtRrLGjKHEajfgjiftM8OlsW0N36El2ti3hA6GxZxL0L87h7fh4d9S/QcXYOt0jdzepnaK+cxY2yGbQVz+BqwVNcyZ2GqNNP4pxhEvVZU2jImUJ9tv98JsOHaq0XlWo3ymiMwmgnzConcg7ZYAi1Ii14BKlBQ0gKHICo1vpQm+aVRQz+rtF5cVrrQWWyW/pQEj+B/KNO5B5xICvchswQJhlGctAg1ARRqfagKtmDUxpCqh8VahcqkkhBghtFtJGCY07kKWwwHrLDQAQZISPQEkkKKwmyQJTEj6M0wUUFVEhF5Ynb3V2SwEwKTCq7HONkGBNYoaNRUkhBIo2SSmSigGYtiplAUdw4igmFsU4UxhCoOxfnbilgAj0V64KHoPk7ikWOJfIUDrl7s4pAD8dMhSalHUYFERy2IztiTBqZLgmGt8y0kBcWaGgcHk9khVuRHWmTciXomwuzI8jA0FHZnbuxB7wNNjMp0CLPfGekGqEnJnabI7NyV0PIKM3ux7Z89kASkAIm4ztumEeKBZvEMtPJcd799pnjv93V1J2hCSIFRGCMtEsC9oxIeFWDkp0jr83/7X9IPLvcAt3xWJkhY6RgDCbyMo+8NNHaRYbChyLlOEqUtCElbUqCNqVwopijip5AtBsVsS5UHad3lEAPMZHhQQ3FrCgfBPD/+APenbgNv8AvyAAAAABJRU5ErkJggg==") !important;}\
	#gfx-header .wave, #gbar .wave { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA6FJREFUOE+llItP21UUx0+pbsO5xMQZCS46YtAxEwUkm3PagY/JmFjZDIPBFmwCTiYVBTRxI2O4mg0QZrpmPFpefUCflKaULn3RB6+1YENbS9tB1rJRDFHiFFm2pcf7q/oXcJNvbs65N5/7PffkXhoiwqYHBdmsQKLQ5DPPNN4KHHiTQXmi9EdJCQRXVuDW7Tsw75LXrIW6xeSgrfPLHvi8swDY/A/hnIj5NEd2ojoU9pyE+t5xES2nCcVpWb8TQDEF2UhLA9+cB9xe/7P6a/vureh2EsZ6rsEzAp/yclNqxAUXOPrChR7rd+uBQDAZSiS3F+CkEdk55Yh0UhlAIyYkPH7/bQaEThVVDlxMwl9Hn0LcuHmx09CRwBIe9Z63lmKD7QSKrG3G0PwCAMu43gC1/iFGueSXRzuepCCU8ilHq6VFX4taXv45OrwNcU2sbFA1ZhTJc2PV5mL8Sv8JKseEV+Z9AYDq8QcA50PQYQknxxgHf/sPcmkZaDsW268VDv64hxNWbkWMfu87p6qv/Uh5BMtuHMeKoUI0TxiPz7nnACos96Fu7N6/HWJXjcWIkzsABlXi9oMTGiVDefkF5qL0CYwFT/9VKTrje1eRhx9r8/EzGevPycnJXS6XC2Ai+gj+fhiLQx709rb5CURCGnQp9SWtyaDdZby6e2doIPEuBo7ht8JTmCn5ABnyw1gzWOd0TjrpBETqjt6F6DLR6ioExyzFki1bsJmALhzJ9alHb9DNXdkQkdEP4SJzVaAow9Tuw/iaMAc5kisdrgkn2G12AJvNFpd9fBxMJnMKJ+X5jUoC+bLsNLdXrADx9RoISp8hNTKzp82sted+YmBq5zvYo+qvcFgdYLFYAGQyWVxSqRSkCgW9/L2cm1k0wNpv6gqkJN/dI4Su6z9AZK4VIs769zMv5z18tSkvpteNvmg0GMBABB6PB7xeL1AXRCW4PN4BNptdJ5FI6FTM5/OhueUqDAyqQKMeAoGsr6hjoJtlMZnBarXC1NQUwNLSUlzhcBhmZ2dpw8PD2wel0qS+vr5X2tvbX+fxePu5XO5bra1th5qaW/YIuvgwqtWB3WGn9oPb7QaIRCJxyMzMTKJOp3tDr9eXEQdnyfwFiau0Wm2VWq1mq1QqtlwuP9vf318qEAiyRSLRbrK+Ld7i/yF+v/8xQk4isL3T09MZpHXpDocjnVhON5lMmQScRcBZIyMj+zQazX5yjxnEbTLJU49l81/BP8p2dZA0wme0AAAAAElFTkSuQmCC") !important;}\
	#gfx-header .webhp, #gbar .webhp, #gfx-header .search, #gbar .search, #gfx-preview .search, #DUMMY_KEY_VALUE_ { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA/RJREFUOE+F031ME2ccB/CnWugf/uF/W7LogBCjG6yQTSRsxE2BKejUMWUx2EK3hSGuQJkDggqEMV4nlQBhZAZ5KT1TQIezgFlYIAjS7kopG9gOOsZLy9ECLRw9em3xt7vbe7JkT/LN78kl98n3+ePHm5p1oA2KRrt283gYpvY/FBz0ll5nDrGsOfzBzw8dDHzOc+xI0KRm0j64dy/fdyYhBrHnYKA/N7nDIqOTxK76juGI08llZaFHMqZOvltGS67UgeijWjj6djEtfD1Xe/6Dr1KqGnr3AAAyztFc2DsbFuE1qzQRrxzP64yKyydalaO0aY4A++oWLFvXwTA9C+W37lMHwq/gp5Irs1ruagXmJReas1B/I+pHBsHp98orouMLCZ3B6vN4n4Gd2oHpRRrmnV5Y97jB7QVobR6iD0Vm4VevK0Vzli3e/LILseGaNLUMnAiPkE3dUQzTNDwDk9UJPfoVaNMuQLuegH7jJlhIH2yQbvgkr5mKfDNvwGC0R0+bHYgNh6RmN+YkJFb6TL+uwsL2NvRMrMNdnQUU41bo0K9DJ74Cj00r4PTuwMN+HA5HFViYJ0kUXTrEhkPOikryL6XVg33FBUY7CQoDAUp8DVT4JnQwUzFhhU7DHCwyT9LoZuDoqRJbeY0qraq2C7HhkHPi8vzk9HpYJhxgtjuhQ2MF1fgiYJoZwHQEYAz0kGm15gYYw3+BqNhC4kt5r0Re14/YcEjWdYUs8uQ1evLpPDjdbvjupy2myTK06xYA+3EVMO0KjC9uAun1QBs25Hs5Qqr9Vm2M7X80i9hwSHev/nhI1FVtSUUX5WO+LJI7MGgmQfmDBboNS6C1rIPD64NVpwsuiKvIuAulTY9HlgRL8yRiwyFPxuf5ovSGlLDXpPjXLYO0nXKBy+cB2zaA3b0D5LYH1mwUSDPkECBMJ0+IqxuLv+jksz+vEttckN60jJqU3+85L6qRHXjpYzwrt5lS9+HwRG+GYY0RWtoHfUliORkQlknuC8+mXnhVqhdLavNHhn7eNzRkQqOjZoRmbBtcpZJqteBGsUIUHZM5EPbGp5bo+GJbVMw1Qhgp1cadK22Mv1jd8KJQhgdESNcChNlT7yTJpQXFmKCspud3hA2DIEw1wDM8tUffUY1ISm92p1Xd+ubD7ge62NxCpeByTtPuJIk8dX9oxsjzIRm24MOZY0niylQG4XMt/oGgqRkHar83hph9QTfrHqCe3gmUV4QhBkH5RUq/s0kV7weHy4b3C7NtweGX8XTZbelfS8RiTJP/Q1BBUavfRUl9SmBoDh4UlkEdO/N537+QP1f7v+YfTVgE3Si9x8/8rE2akFjWp+rVJ/4GtRnSt3z37tIAAAAASUVORK5CYII=") !important;}\
	#gfx-header .youtube, #gbar .youtube { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA8JJREFUOE99Um1MW1UYPuAQMDEmy8ANHGq6bmW1HbTr+FZ0CJPgPgyRTJL9MIs/9A8oc2tRF7uB2Yxz0w2iyTadIWYKi4zWGTRhG2F82Bbm1vINFrZCe8robW+htxf6eG7p/vrmPnnf89z3ec4997xxxqZLJDtTbtr6fMarTyYliesSElYEQUBiYiLh/TyJEBASxVrEsSc+Ln4dARLGZ2a7bI7RCnKt86YZsZh9MIs7vb3g+SC6um4+pv83tzI9sTjGxMddt3vuoLSsDMdPnMC7hw9jfpGDY2oaIdZAAzweBZfh4QIQ2Dq0uqay2EdFMjTl5KIkAx+JoPrQIbwgk+FSSwtqjx7F62/swY9Xf8GRT+pxtukC6vR6hFnvEoOkk/TENuH0SgTHnCXzr5qasE2two3Ov1C690182tCAGr0BB96pRo2hHvurqqIb+mNGtkmnlwyMO6lE0Mias5mJi9iR+hyjKK6owOnvvscHx/TYV12NOuNJVBw8iADrW4gZDUzMUNI34aReRszFnFt//wMyrQaDs3NQFRZAkZuL2pMNyC8vR7pCgZyyPeBYrztm1DfJTHqmXFQycDK4GKzLAi533cIDVnfct+NMaxsG2TlNjmFWX8PP/RY8ZO9mYhv3TM9R0v3vPPW0/Qb3Z0a4PjoC78cGhE99CfrFaQjfnAfOnANnbIBwjtUXmqPZ03gKbmMjaFs7up1uSvoNx2joiXgEk59G5MM6gP088a1K+NmEBRhCShXEgqJozTNIvJQlCMlJ6DfoKbFvSaOhDc/AL1cAdkf07kMNjeCyNPA9txmrV34ChkfgS98cXfN794HLyIB//QYIac/CLk+nZDhbTsOqTHDJT4GvqQXmPaBsZ3HoHvirv2KF3ZIUK/fuQ7jVzQYkBOGHK+BSUiG+lIlhzVZKHMU6r5inA7dxE/z6esDng6vybYRmH+JR558QFxbhbe9AcGwiaibFct8AFl+UQczVQtKTodJ8ji/KxTwzcR//HJHVVYxXVkFYDsM79A+W2Lh7evvhZ6ZSzA1Y4fz6W7hkcvCFOZD05PbuAtFVUoix9akYee99UOtdWPJfQYCZeManMXn9BnwL7OsYP3XdDP9SGJNnz2MkNQ2u3YWQ9KRFqTBbD5Rg9LUCDGqzYMlWY2iHClY2aJYdavydqYB1lxa2HB1saiUGK8pxV6fBaHEerPtLIOlJc8omclGxxdT+si5oLtrpM+dleU35WbRDu5127NxOTTol7dBksrWSmnapqUmr9JoLsn1S/8VtMlNzykbyHyy2M3UIuOISAAAAAElFTkSuQmCC") !important;}\
	#gfx-header .special, #gbar .special { background-image :url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAoBJREFUOE99kl9I01Ecxe/Uwj2sxV56sUiCCAl76S0oCZRKGOmDSkSE6FxQxPrz0EP4FGhkSKXSS+hgbf6CCWqREOWDf9hoU9BN9mutcjYagjoHs5h4+p6fTJSgCwfOPd/PuZftd02NjY2Ky2KxKKvVqsxms6WoqKhCosMiqzFUKiNKbm1tRTc2NrKZTEZls9ntCQ+gWlpalMvlOtHe3n5jfHxcW11d/ZbP539T9Mw4I0O20Nsxzc3NLD8IBoPJzc085CbkcjlD9HIQOCNDducAu92u6urqDrS2tt5Mp9PJcDiMtbUMksmfiMe/G1pcXMLKyhpCoTDIkGWHXVVVVUWdcbvd/vX1dUxOTgm0jFjsK2Zno5iZiWJhIY5UKo2JiUmQIcsOu6qyspK6Kjf/SCQSCAQCGB0dw+DgCAYG/Ojv98PnG8Hw8HtMTwdAhiw77CqbzabKyspuz89H/oRCIUSjC3K7Dl3fK2ackSHLDruqpKTkouhpJBJDZ2cX9u0v/a/IkGWHXVVcXOzp6OiQ35lA+fHThg41uWB57N/Z0zMrzMmyw64ymUzXRB/n5hK5y013cb7WiVN3eqE+w/AUPTN6MmTZYVfJq6OuDw190PtejeGKowvnHg0ZJXqKnhk9GbLssFs4oKK6uvZ1TF+GWwvC+ewT7L1TuPXwjSF6ZpyRIcvnvvsAk2wu1NRc8mna25Su/5KHlMHS0rbomWnauxQZsiJ2FP+DghiclL3W1tYGh8OxR06nEzJjmQyX0du9DsqmXMKX9fX18e7ubng8Hni9XvT09KChoeGLzPqEOSaSB/DvKpXoiEBn5Zb78oleyHd+Qol/Ltk9zoQ5KjIX6n8ByVbhxr6wa4IAAAAASUVORK5CYII=") !important;}\
	#gbar .gfx, #guser .gfx, #gfx-gui .gfx, #gfx-preview .gfx { background-image :url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAnJJREFUOE89kktLW1EUhVcLklGpOGwHFiQoMcbEd4yPxAdG5Q58oyKYhy/QJGpEkzSoKAYFxUSUQulf6I/oUChk0pmho7bDCpEYQsnu2hk4OJzLOXut8+2176vT01MxmUx4fn5GqVSqrHK5jEKhgJqamnB1dXVGRKCrWCxW6p6enpDP5/H4+Aicn5/L9fW1nJ2dydHRkSQSCdnf35fNzU05OTkJ3d7e4ubmBul0GhcXFzg8PMTu7i78fj8mJyeBZDIpSnFwcFDa3t7OUpjd2NjILi8vZ1ls3N3dQU0ymcyLAevAe0xMTADRaFTi8biEw+HcwsICRkZG4PV6MTAwgFAohKurKzsJXZeXlzYSYW9vD2tra5ibm3OyzoWtrS2JRCKyurr6oMLGxkbYbLbKrpipVCpCdKUsx2IxG+kwPz+fHB0dld7e3n8IBAKyvr4uPp/vNw0Mh8NhtLe3GzSxr6ysgNlUcX1jO0Ki70tLS+/GxsbyPT090tbW5gcPVCzEl6GhIaFYnE6ntLS0fFFUvozj42MLM/pLSmFwf9xut4q/NjU1vcbMzIzMzs6KYRjFvr6+e17cu1yu+46OjiQFKtagsbOzE2NLWif6ut1uf2uxWIDx8XEhkgwODubYE7q6ukADkALBYBAMGHxds/q0uLhYqe3u7ha2+KG+vh7o7+8XReJhrrOz88VAv9keGLBOw0uz0vT0dHl4ePgn78Rqtf4ym81VILIQVxhejn2DGUDFra2toEAnYeLMf3BsQtoY23zPukJDQ4PU1tZ+1pGpm7CfB4YCGkGNmpubwVFhamrqI38YFec9Hs8bNWddpq6uTg3kP1g6L/uXDesKAAAAAElFTkSuQmCC") !important;}\
	#guser .gfx,\
	#guser .login,\
	#guser .history,\
	#guser .prefs\
	{\
		display				: inline-block;\
		min-width			: 16px;\
		min-height			: 16px;\
		background-repeat	: no-repeat;\
		background-position	: left center;\
		vertical-align		: top;\
	}\
	#guser .history,\
	#guser .gfx {\
		background-position	: center center;\
		padding				: 0px 2px;\
	}\
	#guser .login {\
		padding-left		: 20px !important;\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAipJREFUOE99k11IU2EYx59zZlZU6E1QXkQUESOdSFdRLLoQIg1vrDWisIJ0A6UkVtQqTScF9skYGRScMWHShy7xI9GbzSlbpwNqKozWB7jdLPugciW1p+cpj2wX57zw433f5/m/Pw7nnFdARFDHoDMP8g0giCIUU20PUbTUS9I8msnA68U/gPtbfy+fARaoDFwyCC+chsqIxyjNK1fiH6dvYlJuwsRofTzi3iZxjzPZZ3IEPQ6xNHR3u+/Xh4c4JpXPdF4sGPJeWDM07DbOfJs4j8HbW3yc0RT4z4hnv862p14+Lo/72uBa5w3YyPB63GuMf47aU5zRFDyyi/cyCQkD9wsV/x2IZNPjWa0sTjUgZzQF7lOCK/2uI/3z7QP8EfNgItqMsZEGnAvZ8UvUht9f2dKc0RS0Hxcqwr5qeYEOf5Kv49TzWgx7K3G2+yDOj53EYMdumTOaApcVVrYegfrALXP4fciZig03ovLsKE52W1JP24rD3OOMngCaD8OKpkOwj3iSkFtwsvcE8ppr3CNBzpfL2XCTQkBhJsCC6cHTLAhwjXu6gqWDqqCPBVTrI0yqoMWi8wRXqwGy6GfBm6BjgWr9ar1mr46Af3DrLgBHxT+6WMAzYTp3AGDz+v9XQPMlqjekqhSgzgwSC+ail9FmBi/X1KEnECiUT6w7thP8ScWFNHeZt0IV1QqIVYSoJxApsJavcVkRWC0lMGLaADW030FsIgqJvGzBXx71EMokejw+AAAAAElFTkSuQmCC") !important;\
	}\
	#guser .prefs {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAh5JREFUOE+lk0+IEnEUx3+uiogd9GJRKRHKEmosI4RTB2FhkdSD/+7hKSI6BUJRe1iIJehQrJ26tFB738VTti1sMguOoOtItmSbybgt3iXw8nrfIYcJgg4NfHmP7/t8v6OCNiIS//WgIJ1Oi2w2K/L5vCgUCsYslUoy6/ZvydYbWGSMl1sLcrncdQbv8LyAOZvNaDqdktUD89eCTCZzo1KpPJ9MJlQulx8ydPfkZEwQdni4gQH7xydIpVKCdW84HJKqNmk81qlWq33RdZ0g7IPBwLiBAYuM+RVkWRbJZPJisVhcPTzsUKfTpuPjrzQafTeEHR5uYMAiYxYkEokkG/ehzc3Xg15Po62tt/1oNPoSwg4PtzmHjFkgSVKl1VJpb+8DHRwo1O12KRa7um632wWEHR5uYMAiYxZEIpEHjUaD6vU6YWraJ1paktZsNpuAsMOzMsiYBeFweCUUCj2CNjaq39rtHu3svG/H49ceQ9jh4TbnkDELgsGgCAQClyQp/kxRWrS7+5GOjnQ6Pf1pCDs83MCARcYs8Pv9grWmKB3a3n5H+/stqlZfDZvNHkHY4eEGBiwyZoHP5xOsm8vLK29U9TMtLl554fV6nyiKxgGNsMPDDQxYZMwC/JkcDodwu91pj8ez7nK5LmP2+z/4Bx2R1QMDFo+1AM5ZVoQVh5xO5y0uegphn/s8Y6xzeKe1YIGNMyw/6/w/hBeBXUDBL1kqvVROblHxAAAAAElFTkSuQmCC") !important;\
	}\
	#gfx-themes-bar {\
		position			: absolute;\
		display				: block;\
		top					: 0;\
		right				: 0;\
		margin-top			: 2px;\
		vertical-align		: middle;\
		min-width			: 16px;\
		min-height			: 16px;\
		background-repeat	: no-repeat;\
		background-position	: right center;\
		z-index				: 1000;\
	}\
	#gfx-themes-bar, #imgc_specific {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAhtJREFUOE+lkV9IU3EUx881E0GpFwnak3POB71ooBP8s/XQtrCIQS16miRFT0W+6YtBgj4LPQa9OTdNRYugAqmeIofmMsfchtcFBZJNhEJE9+38fr9759xLUT/43Pvj3HM+nHOuBoB+2DZBh0Rlh+VU9bOGKvYqtf63BDrgGBFVg2jYSxqt3gDlOSiOVkbQJzUSgu0zBrYfpZAb28D+yT1OJ7r/hjD+xYWJbBuGXrNMnE/XcXf3iYTiQS7lsHjs1BjYuZPG7i0DB+W/ZHL/O8LI0mmMLp3C0IIpSFyDI3tPQomrRwJUZYBKpsIAtJwUDMQIAx8Ig8wDvssOtvygrQsm3iMBf2otQaT/MVYYQZ8GGqcYfje9EIMRdflW0On7iA7/Ms4FYjI2zwPPmsyJ4a0dNEeB25+ZBKA/U4Jufwy9D4HQMNASeC9jonhzLC+ZLhY0scDzknnFXZiCzovL8IWy8PZm0RxYlIIZLlpoUTwtFtjCwFlBBLDNqw70HgP6pQ00MnVXMjIW4aJxk3Cx4G8WJv9CyWILO0CcdSvMqhhS/bK024G0x46U246kq07GMGUHorWKSb5bS5TF3x8DOcZQgmR3PdAXRP5mEGut9UoQcSC/GJIg7CgRpDqADGMJ3E58u9yOrz3tWGuzBCx9zjmCCb4XOoif4BG0YyOsuxuwft6JpMeJhKtBdRB1qkJBhO+W4P+XyCZh+xd+A7RF/vyzl3+XAAAAAElFTkSuQmCC") !important;\
	}\
	#gfx-themes-bar DIV {\
		position			: absolute;\
		right				: 0;\
		margin-right		: 16px;\
		margin-top			: -2px !important;\
		display				: none;\
		min-height			: 20px;\
		width				: auto;\
		margin-top			: -100px;\
		visibility			: hidden;\
		white-space			: nowrap;\
	}\
	#gfx-themes-bar:hover {\
		border				: 1px solid black;\
	}\
	#gfx-themes-bar:hover DIV {\
		margin-top			: -1px;\
		visibility			: visible;\
		display				: block;\
	}\
	#gfx-themes-bar DIV A {\
		display				: inline-block;\
		vertical-align		: middle;\
		min-width			: 16px;\
		min-height			: 16px;\
		margin				: 1px !important;\
		border				: 1px solid #555;\
		cursor				: pointer;\
	}\
	#gfx-themes-bar DIV A:hover {\
		margin				: 0px !important;\
		border-width		: 2px;\
	}\
	#gfx-toolbar {\
		position			: relative;\
		display				: block;\
		height				: 18px;\
		padding-top			: 3px;\
		white-space			: nowrap !important;\
		font-size			: 9pt;\
	}\
	#gfx-toolbar .icons {\
		display				: inline-block;\
		vertical-align		: bottom;\
		margin-right		: 5px;\
		padding-left		: 3px;\
		font-size			: 9pt;\
		border-left			: 1px solid #777;\
	}\
	#gfx-toolbar .icons A,\
	#gfx-toolbar .icons LI,\
	#gfx-toolbar .icons SPAN {\
		display				: inline-block;\
		width				: 16px;\
		height				: 16px;\
		vertical-align		: middle;\
		padding				: 1px;\
		border				: 1px solid transparent;\
		background-repeat	: no-repeat;\
		background-position	: center center;\
		cursor				: pointer;\
	}\
	#gfx-toolbar .icons SPAN {\
		cursor				: default;\
	}\
	#gfx-toolbar .icons SELECT {\
		margin-left			: 0px !important;\
	}\
	#gfx-toolbar .on {\
		font-weight			: bold;\
	}\
	#ss-bar {\
		display				: none !important;\
	}\
	#gfx-toolbar .safemode A.images {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAppJREFUOE9tk21IU1EYx5+rg5m6yd121TYRm2+FGpUkNaIXsqxmTKRJmUQJvVAfK/oS9AL1ocAvUgml1NJpqUEbzOgFQjAtM6c4aqNsTdrABZWfhsiennM2PRld+J/z3PP8/7/LufBIiAiSUwH+IClFIrEdSmltSzTgFMTBTwKIk4ks3N4YpYUA0GVIqDMpp0EHPQb39qn6H0ysBqdBWeon/TybBLgJcIMMq0jlVPdWvt39vTF0Bg99O41Vo3sidPaU95iHebsMbgFw6Iet/qY5dbdxPK3H5LWM1c7av5zAmvGDXAc+H0fL+9oo9b1qp3F856R9DigjAB26oYavJ+N1n46h7eNRHtr6xrZMlkEr7hprwH2Th3G/70gcKCMAd+WX1qmmhU2v9+L/tNazjbyI94KdvL/jXf0CUEYA7sh91R/sscoX1Vjm3oJsZ6Givo1ofFiGoVAIZ2ZmMBKJoNJRgqtdm2NAGQFozbptGbL+ZuFYLIZ5PRWocxSi3GHG6elpDgiHw/xdfmBG0+PyX9CadUsAWrTnS11VYWegD30+H0ajUZS7/gk7KPzIjIbeYpQdBWFo0Z4TgJvaGrm9IFAwsJ4DAoHA8i93U9idkOIpwbS27ABQRgCuZWZJ1zXD5sEN87r+wuXhfgq+EtI/L5oH8gJlBOBqJsCVjEua+6Zg7ugalF3mxJ1pl0eEdCOFqG5XgswLlBGAyxkAF9P1cFb9TOs0RpSJYtQN0E+coPCivGZM78yOMA/3UkYA2GTk0wTZVPnQnOpQXVjhy3St/Cn7CUBidSqdsR73MC8bpqVZSMwf3QOyIUfKg3VSM9glT0a3MsvEan7GegA5SW/K3wBVslFGeyWXBixggydQR2L14jlABdW5JBUD/AHrks1XwJxHHgAAAABJRU5ErkJggg==") !important;\
	}\
	#gfx-toolbar .safemode A.off {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAABARJREFUOE99VG1Mk1cULqAMKBQRfiACxo8WacHoEKPxB4utho9sJDJNaxjFQH01UKC1bJAY/enqfmwE9gOXRcI2FJao0WQxwQydQRmtgeQdwyUMqZpotolrrMKK9dk5t3tra8huct+ce99zn/Oczzifz6dabp05eTJr/uHD9mAgUBlcWChinXfU6l8SU1N/yMzP/9x16tSTZR8yYPRub23VfGQyue0bN8pnVq3C90lJuBEfLzbLn9Ed/6vbt8/9scOheft9DFiT1Zov6XTyF6mp+EmlgiclBdO7d+OBw4EHbW1C9hAo/2MdafNm2d7YmB0NGgEksOymnBx5IDERXlKea25GwOtFaHERvF7TfrWwgOejo7hvs8FLxr4j3ebc3BhQAUjUM45otQJsUqvF/LVrAoTXq9cM9WYpp/mrVzG5bh34zdHCQrnD5coQ+eBPrdHo7kpLwzgxez4yEma0tASEQjFgyiEUDArx6eXLIiz81lpe7haATfX12fYNG+QbFJc/2tuFovv0abxXVibknu5uFBQUYG1ODkwmU9hYFOvZw4dFTBmjk1iqLHv2uDmbU6tX42uXC9rCQlA5iN3X1weNRoM0YlBaWiru7HY7loj9b9PTePT4Mf6+eRM/r1wJN2EcOXjQoarZsUMepMzNGY24cukSLGazAEkhV/r7+5GZmSkY8oqn0lHkivJyOIkAr3vbt+MCYZjLymTV+8XFosbmWlrCIaK4FRcVCTYTExOQJCnCmI30nTuHL3t6kJ+Xh3e3bUP32bMYq67GLcL4YMsWCMAROvgUQMI0GAyIi4vD0NCQkNOJsU6nE3c1+/cLlunk4to1a1BTV4cf9+7FKGEwlurDnTuFy7/u2hXJqF6vR3xCAnp7e5GcnIySkhLxj1krLjNDp9Mp7qe2bn3jssVodHBSPFRPL+7cEQpFlJiEFSvwFbmTRMaYnY2KWQEMUVjGbt/GvZkZBDgppPtpejoki8Whsjc0ZFBvYoSs+xob4X/5Elo68+Ph4WFUVVVFYphIRgcHB2PK5vdDh8JlQ/19oqNDIwqbhoGDe9OrVuMvyvStu3dx5eJFwfZFICBi2dXVBa/HE65DLnpafw4MYJyMiMKuqAgXNn8+cTrVPBS4NyfXr8diVOtFAvufwK3H++n585jIzcW33Hp6vSjqCCALNDWyuNG/IYUxKtQZqxV+ik/Q7wfz4f3Ps2fwX7+O2dpajFPcGMyelye3SZIAiwHkQ4vNlsHW2H1uRS8BT1GGZym29xsaRDbH6U4ZX8cMBgbLWnZ8KZcdx49rKB4OO7nOmeOSUgYsy3zXsmmTXF9Z6SY3/3/ARlsiZbXtwIFWC7VTNXUAb5Yls7n1RGen+u1JrZz/BXywjhIcBuOaAAAAAElFTkSuQmCC") !important;\
	}\
	A.ch,\
	A.sm,\
	A.nt,\
	A.tineye,\
	SPAN A.tr,\
	#gfx-preview SPAN.ch, #gfx-preview SPAN.sm\
	{\
	display				: none;\
	margin				: 0;\
	padding				: 1px;\
	width				: 16px;\
	height				: 16px;\
	min-width			: 16px !important;\
	min-height			: 16px !important;\
	background-repeat	: no-repeat;\
	background-position	: center center;\
	border				: 1px solid transparent;\
	}\
	SPAN A.tr {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA5RJREFUOE9Vk11MU3cYxs925x23W3A3I4IiDlYtFEpPCww/WAebyQYmbprFKFAJcZBubqvOsYDVMaccbOwHH1XEUuwAEaGiUJHYqUGLMNmwZNBhW+gX1J5Dz6nPDsvGtjd58v5vnt/7u/kTsSg7w9IrPnqF8QVZxhdhWD4rvgU27PNHg77lcMDXZGjqIAhiHZ+/xuFwEBzHEXK5nCDm537Hk3s/I+RdAM0xiLBRcEwE7oejuFKjxNSdfrTqLjj53mvx8fFr5X8Bz2fxyHoTih27EFmcB8MuwnZRAyp5CxqTkjHZ1gSjlprhAa+P/315tbwGcHrmEA34oH63EA5jM65+XomGHfkw79mLoVNq0H43fpt8Ep54ON4TYzkTX1xLQUFBDvFsnr8aXIS5eC9qNiejt7wMPx0oR+DpJFiaBs3QiNBR+LkYQjEO0dgyuCgNjuWQl5d3jnDOeuFb9sNSvB825VEE7CM4LpLA7fwFUWYJSyyD75vMyFHU4qPjFOiXAcRWInxikOXmUMTknAuusBfOsbsIOaehK9mNwe++hX+ON2NCeB6LYftX7XjvixbkHtTj8YyHN+NNaBZSmYwink1PweIagMD6KVRd1ajJSID7wX3ewAv6hQeXB58iraIVI+Pz2K1sR2WdCcEIhxfhCKRSkiJuOAbxsa0Kb/aR2N4mRlnJRgzoDHBNzWIp4MEhlR7yo0Z4PX5U6bqxs+IUxlxeBENuSCXZFHHy6llkUruQbiQhbM7GPmU+DkulGLMNwf54GhJFI0pqu2Aauo8j+n6QZVrorXb84Z4GKRZTxKjdioabP2BTcyFkV/Zj9FEP7Jp63Bu5hjOmEWw5YsZWRStEh09DWqqHuLQbijMWTPw6AUkmD7AN30abtQ3v1BUh+awE5TeqUGmsxL6OahRR9ZBWaNDQOY7W6zZou+5A/vVlyD7TYuDBFLIysyiClJCfCEXC+jTy7frcYwULKccykVDzFtbXbcS2k0UoOfElzH2D6L3ejR7rEGrbh1FY9SPUGiOEQiH1z/9Y3a8kpiTt/EC1Z2azSvQyQZWE1GoBVNoT6LR0otdiwbVuC0z9d9E57ICl7xYEAsH/AKuQV+PfWJ/4fmnx7ZzSfCjPKXHecB567SUYdB1o0V+A1tCMRv1FaHQtSE1N0/zXYO29YUNiyrZ04TcZGRlqcZZYLcmWqkkyl49ELRaL1SKRSL1VmH46Li7uwz8BEgCNEPFhrqwAAAAASUVORK5CYII=") !important;\
	}\
	A.ch, #gfx-preview SPAN.ch {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEgAACxIB0t1+/AAAA3pJREFUOE9NU1lsG1UUfYFIENHS8Ad8GfEDUoX4ACGQkFCFDEUgtg9ksZSoVEpNg5IugQBpKCUhUmeKUyJKm9JWDYI2Ch9OXLnpkqULThtPFse7WyeN7YSkrT322ONZ3+GNoyDe03lf95yrc969VQBI5RgGIckEIfGQXUtEXjNnhZeM9eueph8+RWi1GnnwkYf/rn6gZuj+9ZvPV9U8Qaqq71vlWQIKg5y4aVO+/5KT335RkuveRPq3LmSGh5BN+5DNnEJp6QDkkEOSI60cCtM2UFS4BJSSS7eKtp9OjPTmt72DzFEe+bkEdKUMk1WYlMI0y9CURZTu9KGcasK94Be982LCplGdkPBikTh6AtzGH69j7LIATS5C1kwcd8fh/GYSHzfPoOnQFNzBEgqqBlGO4kjsZ7hiXVxMihNy3Ldkr919WWrrn4Ss6riWzGPje1fwgWscQ8IiLkwsY8vhKZA3jqLzyEUY7F745xI+F3ZI7rTbThpOR/j3e2bgT2SQvltG7Sfn0Pq7nzkrMAMWVAbgo24BnpFpZl3GHWUFrqgLe2f38qTuVMjXPhBAUdHQ3D2Hhz71IJfLMf95yMx7gV1DWRUxUGYvy4QaGMx4sHN6t4/Un54WB29EUdR0bNp3A8/sPAtNY4W6Acp4hpWkZlSIlEmsnXA+gpaZr0ViPaPzYyw44IV6P9bVnUWpVGJdy9BNRmK/8H/imkB0uYD2oahIvgvu8/XFzqCsK9jSEQLZ7MGv5xMwWXeLOjUv4vWOq9jwmReP1XshlxVoTNg1msIrBwUf4cMH+c7ZTmQKaYzfKqDmcU+lWEhmrSlgHjRIkoqTIwt47uUeqKqC2zkFW/+MYddfcZ78sXDG3jDZKLlvD8KgOgY8STz65DFs2OqFd2oJkbSIE2Mp2BqH8arjB6hM8Jeri6jdc0XqHk3ZSUSKEj7Cc82Tu9iQhCtZT8SzaG67CGfLOBr2x7H925vYwwlYviciFkvh2QMTcBwLcoGURIhOTbIgRm3JGN+rLDTCzA8wkbtW9P8lDsqsrCzBPNeP7FdOtHV5er2hbGUfKgvBhp0g77fl/B2ctTBm/hDMQj9oaQ40KMD09kNvdUJ763lJaW/hxEDQJutry2QJMFDDJLoYJ2rqsH1leDsvXm/ySTP7RX3bu6LmdPj07k7e6Dtpp+EAa2isNmb4F7GcDzLJh+O/AAAAAElFTkSuQmCC") !important;\
	}\
	A.sm, #gfx-preview SPAN.sm {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAoxJREFUOE9j/P//PwNFQKvpLINe+yU4Nuy6ymDcd5PBfPI9Bosp9xmspj8CY/u5Lxgc5r2cCcQxtrOeMlhOe8gAtpxYA6xnPGYAajwDxTHEGMAEdIENUGEbEG8B4pNAfKb5/K//INpy6oMYfC7QMZlwe6H9zPsXU3e+fVZ96uuX7uu//0648/d/9vaP/6uOffsPlD+DbAALMBzEgdjdoPPKBJPea2eTtrx81n/7z7+8fe/f+y56cNtiwvULQLkz5Ye//AfRwLCCuECz8cxMYDicMey4cN5l5s0b8RufPWs4+/1X7enP34D8W0C5HdrN5+KAWAGkDoSB7BigIZBAVK06eqb7+p//DWd+/K848vVf2rbXX5ymXr2tWn3sGFCuUL3uJBcooDUbTjOo1RxPA2IPEB9ugHzxvjOtF3+CNP+P2/Xxn82qZ1+M+y/ekS/ZdwwoVyCTv4tLMnsbg3TuDgbZwj1pQOwB4oukrIe4QCpn+0ygwBmFot3ntZuP3zCfc+u59a6vf1x2fPim2nLyJlBuh2TW1jiJzC0KIHVgnLU1Bm4AyDTRtI0sQCwBxJ5Aieni2VvPq8y6+9Lk0L//8ktevJdqPHFbNGfbBaDcGYHt//+DaOHkdZBAhBoAMgSMhZLWMvDHrTTji12xRih32xWJSTdeiKz68E1y+5+/EruAOjb9/8+59f9/oDwkGtEBp2E4A7dbHQNP1FJW7ojFnlzhi3qAeCcQnwTiMxxAzSAaKAdxAT7AJKbBwKIdAMesgXPOgDCLbVkMSA5mACPQEHYg5gViUSCWA2I1INYFYiMgNoZhJqviZUzGqQVAviwQCyAbwAI1hBtI8wOxMBCLA7EkEEuhYZA4SA0HyAAAsaSfKmfMw2EAAAAASUVORK5CYII=") !important;\
	}\
	A.nt {\
	background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAj9JREFUOE+V0N9rUnEUAPD6G4JiL0bQ6qEgKBhBb+spt4KKgohF2RI3jLWI5rUl82XUYjmCJH9FXremtTRz3c05pqHTNdtmutm05N7p0mtX3JzXXVO8J2USNSTowPfhyzmfczhnJwDs+K8oA4qiZLJ+FEWtVqvX6w2HwyRJMgxTTpUDf/zAuK9urLmZoahK9/JD0XGVytLdLeXzBQJBu0gkFom6xGLxewzLfPHHzx6mhSfH63djXG4VKBSfrBMuqUQqvNF2jXezp2cAQfrEiOzKrUszc8HsE2SDd9zTsHeIw6kCpXIWj6zGVqNBi94yatGh2kH05RvjyEVHvcLe51/EP3S1YwfryElbFaiU03gKogVI297ieSA2AF+Dzrmm3uyFAbalTXtZ0NHhcE1vrVTZQaVyJlMlGiA38SqZhzQNvQutSIL7tHhdGDh1YGDPI9fDreoq0Gic+PfiWglyY/pcEQZDCuG3E3K29U749BE5B7He/V1dBVqt83OYITbhh3GQoOG27YwcePdWzh1Tc64aWliW3Q6Ghz3+xUyyANSILkKD/jm/0bD/kHLX0fsNvvn4n9XVCUaj1z1D0iyUzC+iifXzTY3tnaL+d9hsiHXYv9YAGLYwOklENoEc0vhieffHYJaBCAVzBJjNvhpgaipgsoQIBkidYjkD8ys/IynI5CARL6CouwbweMKG1/5KwvBscXndYg6oVXa12mUyzRNEugZYWopJJEaF0qHVTTtdoVgsVSr9dZntV9rW49/fXyLJQRtab5rFAAAAAElFTkSuQmCC") !important;\
	}\
	A.tineye {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAHlJREFUOE9jYBj6wK925n9KMAMlmkF6qWvApmOX4N65fO8pmL333I3/qb3LcHoTxQUgTSBD7j1/8x8Elu87A2aDxGDiyJZgeAFkAAiAJEBsEAYZAqK/fP8JZhM0AKQAZhDMVpA3Tly7DzcQOeCpG4jkRCnlLhj6eQkAiKGh4NI869UAAAAASUVORK5CYII=") !important;\
	}\
	.gfx-icon_tb,\
	.gfx-icon {\
		display				: block;\
		width				: 16px;\
		height				: 16px;\
		background-repeat	: no-repeat;\
		background-position	: center center;\
	}\
	.gfx-icon_tb {\
		background-position	: left bottom;\
	}\
	.gfx-icon_tb:hover {\
		background-position	: left top;\
	}\
	.i_close {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAA+9JREFUSEuNVVtLW1sQ3v6I0j4cKLSch76UPrUv3rWpRShRTBEtKoTYaLRgXlKTaiMqiA/6EKF4aQ94IwQVHxQt6NFzRMjx1gNq1VgvYLxfiFqviNP5lt3bvaPFLlisvdbMfGvmm1mzQ4hICh7rISF3+ezPSpvtwd7e3vn7Dx++8n72NpH/ijIA5LkmSfquri739vY2bW5u0sbGBq2trYl1cnKSWO5Q64vLVcZv+Tbyer1QvDKbm5tZlaiystLD8qeynQDgA9vJyQlVVFRca6wGPDg4oNLSUo8CwMJb4+Pj1NbWdqOxDLS7uwvdRBECfzw+Pj7WGC8uLlJVVZVyNjY2RsyNsu/o6KCGhgbhhVRXV5fU3d2tAQgEAiLe+vp6wQkGG2h0fD4f9g+l0dFR63Wxz83NCUMZKJjYnZ0dABil4eFhKzN7Jf6JiQkFQB2ODIRU87dJqq2tNbS0tGgA5NsR2tTUlAByVbk0OjMzM9g/AolPtra2NELUgzrmbxxO/z//Kjp1Hz9RY1PjBYkMcGdkZISqq6t/O42r6+vQTVIqkTdOeJGfn38jyOzcPJWUlFwWkqqUC/x+PwXzIZP2rqCQ/P5lVCtK+YWmlFUgL91ut2d6epqQBdTAly//01cm0uv9D945f/mY1AJWvM/z2RsevOby1PG8F2yscBAsSE1NvctxxtbU1OSyy5bs7Oyo6OjoP24EMJlMeq5M99HRER0eHhJe3v7+vljBT1FR0a/7QXFx8duzszNCjZeXl1NsbCyFhoaKabFYqK+vTxRUa2urh73R9oO8vDwbhMhARESEYhgWFkbh4eHKHmk+Pz+npqamyzTqdLpbS0tLNDg4qCgmJiYq3/AgPj6e4uLixJnVaqXT01N4ddEPCgsLH+N2Jk4omM1mwkNpb28X++TkZFpYWCDmhth1cTY0NES9vb0XpcyNIglCuA6XAYT2htHT0yM4wWADoYOQ7HaHaLYM+FCan5+3InYgR0ZGitVoNIquLA8AQSbzk5aWRuhier3eKPHTtTKzwjAqKkqsBoOBwIs8EA68kwHS0zMIqWYAE0IwDAwMCEO4BwLl2xHaysqKwAEI5ACyWHJodXWVYmJiHkl2u/0JiiYhIUEIs7KyCPWAmAGamZlJGxzO+MSkQmJX92fq/fsniYxyBx2os7NTSV1GRoYAkwsJXsmpNTHg/vfvSONlP+DUOeEFtzdN/gGgBnr1Kp292aLGxotupHlMNputAO0cfOTk5GiA4p4/p4+f/qJAYBfV6mGyr+8HKSkpL/v7+z0gDllADeAns8x7n2+WnM6i3+sHnMb7DofjmcvlelNWVpb72mzWcQqv7Qc/AC6Q/PBEYf1nAAAAAElFTkSuQmCC") !important;\
	}\
	#leftnav {\
		position			: fixed !important;\
		overflow-y			: auto;\
		width				: 155px !important;\
		height				: 87%;\
		border-right		: 2px solid #555;\
	}\
	#leftnav * {\
		font-size			: 8pt;\
	}\
	#leftnav .mitem,\
	#leftnav .mitem A {\
		font-size			: 10pt;\
	}\
	#leftnav:hover {\
		margin-left			: 0px;\
	}\
	#leftnav A {\
		font-weight			: bold;\
	}\
	#leftnav A, #leftnav A:hover {\
		text-decoration		: none !important;\
	}\
	#tbd LI {\
		margin-right		: 0px;\
	}\
	#tbd .tbou {\
		border				: 1px solid transparent;\
	}\
	#tbd .tbt {\
		margin				: 0px;\
		border-bottom		: 1px solid #555;\
	}\
	#tbd .tbt DIV {\
		padding				: 0px;\
	}\
	#tbd .tbt A {\
		display				: block;\
		width				: 96%;\
		border				: 1px solid transparent;\
		padding-left		: 3px;\
		padding-top			: 1px;\
		padding-bottom		: 1px;\
		margin-left			: 0;\
	}\
	#cdr_opt {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAodJREFUOE91k19IU1Ecx88JInoxxCKi/1nZq+1hEAq+SD606CnBRmEPc/q2HFRo1khIhdBmW4GMIsIiFzFcNbMYMV0iCkNiM1ZDbSv/TObc7jbv5k7fc72Oi9WFD79zf5zvZ79z7x1po5TMyPxEtQNcanCFV34f+U+f7y+EuWSO0rtovrYQMuH3+xmv/H6TrX2+n/gRVOBiJhMLVFUxh8Mh1XxrawFln+9DzkW+YE4Fo2JTE5usqGAdxcVSTdbXF1D2+T7kRskpCBQYhHSaRVdWWCyRYEImw3K5HMsz9hdoMeQMpAwCBcZQJMISqRQT19dZFojZLMsAESIluXyeIWckJyGQKaurrOyOC0LWYrWOnlapHpeXlz/qMZs9q4IgJjCNsLZWIAM5cjfICQhkLvvGxgJ9NtvI+Tpdx3ggPDA+HR64oG3ofGi1fo5jqiiOFRMEiSSmQq5VKbiZTqXS5zSa7ifDgf4XI3ODHLsnaD9bU3Ofh2YWF9l8PC4RwzQQ3CHHMYHMrbQgpC9ptV32kR+v/OHVD5xPvvDgxdrae0v49a+zs2xueVliCQ8buXZSiu9ApmHS6w06nE63qeOBKfQ75pqZXxnu6rG0v7Tbh0ILC2wiGGTfMQXnFyZCrpMcheDYBtVPe3t9KVHMvR0a+njNaLxtaG5ue+N0usLRaNYzNcW+QRLGJJxFHOEIpVZJUEqIqq2x0cHfrc1snva63ZFkIrHG4WuNWu08SOnzf9DCBdUtev07HkZ9f5hSzX5KTeCZDF+rD1BKAVECISEI9PHwdZ3OvZfSM7vQLNrCjo1/qHTx9R5ZJAl2U6rHor+E0qvyV40TkUNgHygBRWAn2A62bYq4hAv+AEOW3mJz3ZbqAAAAAElFTkSuQmCC") !important;\
	}\
	#mode_discussions, #dsc_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAQlJREFUOE+lkjFrwlAUha//zF/TwamjY7ZMxUE6OLhYKJROrU5ZIlKKhAxCQbCkJQVNh9IgBB0M5fSdNoEQcp+CFw7v5d7zzgsfrwVAzqpBCLl9wfN4BcxiIEz+xT17nNHDi5ok1/PcD9Y/ZtZcnNGjBvRmO+TmvE30qAGu943dAVbRowY4jxuke1hFj8ZGuvfv+MxgFT31KtnI5c3SuQu+8LFFozjre3EjI7KRznBBYfqa4S0F3IcI/C51NYlUPmQjF4NQzEGuGD0l4GrUPpXNX0BFjtn7Rs6pbNQXZtj4x9iQnxpQsPGrPMiHnMir6IsaULIhn4JRu8qp6NkDND7VvvoH2tOt938BS6wLR9blkN8AAAAASUVORK5CYII=") !important;\
	}\
	#dur_, #gfx-toolbar .dur_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAJZJREFUOE+dUsERgCAM69MnK7AKK/lkDdZgHGdgA7/1Ui0iAqc8uKPQpCGEmJl0pZTY+5WttUxEbMwie5yVfdhnUIxRmsu1b3cNEvQogQBDCC9QTaK1ggnywIaLckJvOnpFKvT32HvnolCN+AN2zmHY05Av9TXsBI7eVzstwGmp0+ZMf8coAK135wBohFqRK01pRm4m5AfuCzW09uCjrwAAAABJRU5ErkJggg==") !important;\
	}\
	#dur_s, #gfx-toolbar .dur_s {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAMhJREFUOE99krEVwyAMRFW69AqswhhpU6Z0yQopKbMCI6TNCC7TMobCiQhjDBR6z4b76BBHzExaMUZ2bmNjDBMRx8+Sa3dJcujwXaAQgojrAsTfJEn1ei4MjR4goPf+AuGA/Z0hHLCuuRQm2MNC260GH7fDCbRiFXfqQQpqt1ojDnUQo47b/Xxv6Ky1aHbd0DUMpLf/bzYGR3cXcGZ15EaszoYzAmU4s+fogeU5ZgHogSUAGqFe5GqwTs0pq/hpQw4xhoc5tCH/AQEOQlyOPj4JAAAAAElFTkSuQmCC") !important;\
	}\
	#dur_m, #gfx-toolbar .dur_m {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAASdJREFUOE9j+P//PwMMP3/+/H91dfF/RUXF/wwMDP9ZWFjAdG40UMmr6IU/Pl82hamFa1q7di1YETrmYGf4f3Mnx/8v5xj+Pztt/P/Xr18OIM1gjVOmTMGqCWRITBBQyXOG/z9eMPx/A9R87ED//+/fvzswgJwnIMCBU+O2BQz/vzyBYJDG2wfY/l+9fHQfA8hP2JwIEvN1Adr2hAmuEaT55WGG/2eOV/9ngAUENs2BHowomkAaf91j+H/nqAfIMswAAYmpq7D/n97B/v/oGob/l3awgvGj/az/r+wE+nN3Nm6NIM24/A52JT6n4nKNk5PTf7yBg0sjOPoIRQe6ZpDziUoA6BpBKQyuEcTAleRgGkE2wTShaARx0BM5SDEo8ECJBDkzgNgAnw1YEsIKNagAAAAASUVORK5CYII=") !important;\
	}\
	#dur_l, #gfx-toolbar .dur_l {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAdJJREFUOE9j/P//PwMy2L17j8fevdtbvn//avzu3fvPEhJyXyIiIr4oKCjMFhYWPgVUexCsHqQRhB8/fiITFRW1ACSEDRsaGvw/ffroaZh6sKZjxw4W6+jofMfUwIhiCD8/z//p02cUg10JJKbn5KT+Z2Njw2oTumGcnJzfHz9+LMOwfv3a3bich0s8Ni5pAUN5ecVtkAJGRiacNjIzQfzNwY7kf1NTU6waGBkZ/yvIsf0P9mQA45IUhv/dNQz/F/ax/t80meEvg5aWFlaNUuLM/zMTOP9/fsrw/9dLYFB8Zvz//i4kEr5eBNrs6emIVWNmPCNYA0wjiP76nOH/l0cM/9+fA2qsqChfjh4I8tIQW36/gGj8+4Tl/49XQI1A/qvTDP9PbwO68vbtOypAjf9gmmE2/f/P+P/rM6DTvjKBNf95yvT/N9C2J/sY/l843gS0E+jo/v7uapBGmCawnz4AbXgN1ACk/39j+H8HqOHDRe7/Z/b7/r9z/3kbPMllZ6dfun3QAOzEj48Z////wvD/022G/9+uMvx/fYbhP0ju6Y15Tz++OecPSzlgzcBEbXD69AlbkAIQBgXA1d0S/4+vt/i/Z2P4/3MnF+0GqpOBpVUAoCh4dkYaMBEAAAAASUVORK5CYII=") !important;\
	}\
	#lr_, #gfx-toolbar .lr_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAz9JREFUOE+Fj3tIk1Echs82iaKkgkJSwdCJl4LKIMvsZuCs0G5QJiZGlKUVZbaiKLOrOtdqeWlON61hqZnTZtrUwqbFWm3VtryVadS0vj9aF0JG+XbOZvRnB15+5/I+D9/H42c9IUTgRXhTphHiNWEi3UcTHi+WEBJIM5XmK80AAfTk969O8ss1ih9OQvfkt2QxIUzAP2oigjO9swVn+xWRyiHL6UdDXNnL96NV9sGxaodhVGJ7xkVreizsnfVYn3EAxgVi42zvbJN2T323o8higvrjXZSY36Kw6xMqB9txg6tDFdeAI51dDtbj0/4/QVrTJH66XpV62zCc2fYABW9uonykFsXm1yi1voB6qBlljlrIh1XIdxRjb7tumPX5lHN/AS+5ShRy7K49qdKGbXUGiO1KiNue4njzIHLtjZCOKLC/Xo8sayEOvD+FrIFcCLOa7IzzCDaWyOPVN74sUeoQU2pFfKUVW272Iam6H8nah9ikakOstAVJPZlY9/goVmgLEF+m/cI4t4CI8loSDCdcc9VXMU9qQmTJKywttWEZTZT8OZbfz8Hq/i2ItiQjXF6E0FwdRHKji3Eewaoc46KT98aEjfsQdKEDIZJnCCswI1xqpmUjhDIVgioPIeRpHGZlNCCgRIKovNYxxnkEK0/fXyCrcAVkd1GBCcF5ZoTkjyf3OYKyO+GvyYDf42jMPHgNvq/mYH5bootxHsHq84Vh4kZn8AULQiVWzL1kw3yZDRFX7O7Mk1gQXC5DgDQfPnVrMcMkRFD1ZifjPII46Zrpydf7ImR9FHiDqKIBxCjeQVT2DnHlg4hVDmDF1V5E5Bjg2xEK/45weO8T9zHOI0gonkQ2KDShJ41cjGIYCRWfsK3qM1JrOOys5dwzUTMC0aVuhDUvxCx5Esf6jPMItl4nJFET6LW9Rh9x0cal3HIiQ/sNh3XfIW767p7pd5xIVAxBeDmNE6So9azPOI+ALZ9w+ivnAsmOBo2/uKt3vfKjM73uq+uI7ucYm+tLPzj9Mh/1snd3j/Xp+isQ0P1MmjDi7bOYLNm9i6TUqMjullaSpje6Jzuze/ZOCKNZX/BXwKeHyeOXvnT+LwxmfT4T/AHitA3CQskNOwAAAABJRU5ErkJggg==") !important;\
	}\
	#leftnav LI[id^="lr_lang"], #gfx-toolbar [class^="lr_lang"] {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAn1JREFUOE99kdlLlGEUxt/+jy5m38eb5j/oqmyTLJcWt9QUx8bd0dF0dEZpIYusLM3ccRCzlMzUIISsCyGiuooOREhFRBdBG87TOe8Mpog9fIfv/Xi/c37nOWdHSufiklJqJ0dCAD+Qg1LxuEJ8jY/JN5/1dzKwtvZBcQHigIS3YwHe6Dy8kTl42mbhCc/A03If7ua7cIcm4GoYh6t+FM7aITir+uGo6KVEAU6cernK4O0VmngOX/M4bj95DX//IhyBm7D7r5FiKgk1Ho//l+oLjWGFPmmC/OvvnYW99DIXiD4ib/tDfeFpnYb77BTcTZNwN8bgCo7BVTcMX2gUK+8+bmpv4cVb2IrOk/K0PSDxKtritWYQvobhLcnff/xCVucwrPlRLtA6TUIVuTZQndUD2BUc3CZ5CNa8dlhOtpBiKsmEdQGZMFP1hAO3UDmwsKltTe4YhCUnDMuJZpizG0m5GmIkXkXO6jtwVPbBcaYHsadvUHD1HrpnlvWdTo4OCBWW400wZwVhyqjlAnUjJFSRUB3lN5ASuI6fv//oyL8UQ2RsHpmRfk1d/fIN5sx6mI5Ww5ReQYqpJFQR75VXcwXpnaPrrb///BX2XG45SZUL05EqmA4HYEzzk2IqCVUXKOmCrfgidgd7EB6ZQ3q4D7acFvHK1DpNFRnTymE8VAbDgRJS9rJuEqqI9wprQQesuW0Jr8dC2qs5o3adqgscLIVh/2kY9hWRspV0ka3oAqaWX22a+HYfk4+fcXIxDKmnYNhbwAUKz9FGqjk7QeUJb/T6j5paKIkc+TDsySNlzYss8V6JJ0yyV/ZK7JVkwuyV2CsZ2StTiakkVElMxtJfMuSPYQCrPLYAAAAASUVORK5CYII=") !important;\
	}\
	#leftnav LI[id^="ctr_country"], #gfx-toolbar [class^="ctr_country"] {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAp1JREFUOE+Fk11IU2Ecxt+Jg6Tuo4+bgizEEqfGUlC7kQkt86KsTG077n9007VSKiaY0pKy8gvyM5VtlB9RKRMSTfLjriTBKEoQNBWDMCILJY97et+DwrKyAw//c+A8P573+Z+jAcBkWWYKC2ajLJpp2QoTl6IoRq1W2+v3+/doNJoJ8by0vFK+beuW6aCgIIPwjTYQY+KGiJiZrOwQtTCdpT4sPKumJ+HSA+xOLRuIlhuf6rLrehIL2tA88hHGokcITa9KiaIG1RsICAmX3Xdjcppw+vYLlPrmUNr5Goar7Yi1e3G9dwHPpoCWoVkcyKh5o6MGbSAgnydY0En3kF45jKIn0yj2zWNwHqjtm8QRuwfOx1MoH/iG4Vk/pIo+7DtbWRgImLeSGckmJxKdPuS1juNy5yRuPf+KoRkFaa4uJBf7OPQTPGM/0fP2O2JtLYuBgKM5lA3eBQ5L1Th1exAFDz/A2TWL7kmg4+VnxDs8cHjfoWJ4Cb73P6C3Ns/91gE3d9jIhBPmAugd7ci5P4bCtgmklvWj/dUXRZ/bCGOJD2kcHmmpV3jZxzcC9stkWbXKEuJMN2F09SOzagQ7U1zeBIc7OkKqdfOCF8MyqrzcvOOPLYhVct0QKc5k26HP9/D23eAmFmGuZVHUKFasE8Z1bUwgANu5Zmy80CSLazVUcqeJlw9SK4uhOnXqOGgzgICcs5IEE9kWjlEJi6UaZqRrzEAulkRlKiSCmlXI3xIIQIiF5BE+Vy9S+p3zlMcuUIb6peaSxOKomsVThfrV/gsgIHqxUg4CX2+Y6IcXzHg/LJPsjKdjkdS0KUBAWgWEq5sreK1kNUU+ZbGTdOW/gL3ctLwGMawD1qeAbHYE9Q/lcq4BxvncFQjhR1MBvwCXb/fyqf7Y5QAAAABJRU5ErkJggg==") !important;\
	}\
	#mode_updates, #mbl_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEAAACxABrSO9dQAAAuhJREFUOE9l0wtMzVEcB/Df7eEZxU26bg+7abYrhrH1mGJkV7ieK6VxqcywFG56rVZqNPPYSnmmLM/J8lpKelyyXiTJmKhVwtbGxHWl7s/31I3kbJ+d//9/zu+3nd/5/SU0fGyvjLC1swm2kkjmmPf29LS1tlX+6nx7lsoi72KrHvr+ixn8IIlrzZQfNxiVJ3rZM5d58WVmbRmzw976b+SZEI999mABEpMhuXY+0ZjFNn2g9RnHSak+Qovir7qkvNMHFDDHVDA7767qJjtPjXTr4yLbzTWPETkZRv7NEFaVTq5L/PAhDDbCGpq2LNotpVmvLWU+VMNMfpe+nKkzslu4rhvrwTBl6HGs8TIPZpqy22B2JM+UtKhCA2fUMZ+sZy5oYbZfk/0Ka8mgGEgQ1TmGFB6j8SSSiNms/4yqAnvyykj2SHhizGlkvtDAfLOV2WJujA7riTCVKLTCf2l2q0Gd0/JzdnpHu0PSm1rL8NrbtDZzIa2+npXzmrnkPXN5B+Y25mLM5BhYgOBIkBNtKU5/381cicXCZubcF8wJD7FpZXoeKdYFWa7IuyYLzH/qtrOkfUmSzuClLf9B0rnnEKyBSTR2V+ndhk/Mec+Zz+OMyuRnfaT0v0yjxqdhw1rwhs0QDQdIYnEYcxz4gBW5xla/fIBzZSM4E4XSXOpimhFwEYs7QAkTQFyZM7jAdBDFs+mv1fzURn2qro/Nw+59PlrNvA9X5hLXZCCFar8paKBxVPedyK9INNM4sISBYbunod465FYpWdmfc4io+h5SyBx4i9lJ+8JAizNO4xY05HslSbL8zkdyT9uFkFmmJH9yiGbYBNtIGbRHHlnXveoGsyqfeQFaWZnFLEvsMpLXsVzsCQWP/rMPGaIdRY8LMpJ7bzDzOVgoDXv0VbqjtmeE76l6claLqh+AAHAA86EJxPPgzyEaaCK4w3ZIBXEbWlCDKOTf8w/PYnoXyUQ3ykBUfRo4gbgNUdB/xm/XmS+oR7ChpgAAAABJRU5ErkJggg==") !important;\
	}\
	#qdr_, .qdr_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAArJJREFUOE+lkUlMU1EUhtGNG3cudOfCGI0xQUxcyUI3Gl1gNEYFI4EITlGjSTHgQII4xkSgDDIIgoAllQBBGUKglUAKpbZKKUMZCq99QKEBKmBR4L3P16JxiMSFNzn3nHPPuV/+e+4aIOi/lh/gN1kirKqiJ/3q1TKOHb9P9NlE2ts6BaW2+UfP33zgMjJhGRm2L3GqKsoK3/Ak8TGhey+xYeMR6ut1xn8CaurGVA8eNbO8PK30ztBRnU2ltpLw0zls2XoSURTcq0ECCp6mmRkadijhIpNCL6qL13ie30ezzk5wyHXUqWVepbht1SdkZrXhGR9B9s1Slqfm5i0t1k6Z/r5poqKLiIlRI8uyyg8wNOkwfDQr4crsAltqmgFx0M7cqIvI8PNk57Yw4ZYZG10mIaGJcxeK8Tlsb99nJakqGt9RXlrEcG6SyuLp3xMApGea0LyoZXbSS12NmSuXk3hV2oZ3BqJi3/LwcSto0lmI3kdhwjX0N2JZDN2IabBDFQAMOuaKo6Iyqa7QIwqLGI1j1Nb1UlHl4NSZBrrNI7iPhuAIXo9z+1qEnevo3hTE+wHjCsBvLa0Od2RECveStWg0fRSXDBAX30FD4yiIQ0iuIfCMsSQ4mLd3YdDbaBH7fwL8ENHlfV1d2e4t11jRNU0iCHO453zK0LroHXHxUvsaU4/dP0Cax0EvDv0O+K7mgOJPdIk+pGUJ0wcbd27fwePxkPUsh5y8ApAkajpn0bv+UPDrP9dYvcwvKao/Q4o6k3kJcvMLMVh6WJKh3DSNzmn/q4LATMqNE0z5JEamligo0dLrnEGdlYdzRmJ6QaKkxU2T0Lc6oMgyy4RCGlAUOL+CYx5ciyv5pHKe3faJhuGe1QGWw7uxHNxF56UIrMkJdKc+wXo3PpBbDoVg2b8Ds2hTfQPmr+MBIXmOfQAAAABJRU5ErkJggg==") !important;\
	}\
	#qdr_d, .qdr_d, #qdr_d2, #qdr_d3, #qdr_d4, #qdr_d5, #qdr_d6, #qdr_d7 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAcZJREFUOE+Vkr1LQlEYh8/5E1waggj63hoiamnMMdoCCRpszSEIA6FIIVoaW9ocgoYgbAuiLyMSNUX8oNQatEwoKuKadrG393duV7ygUBee+55zz+95ee9VUZBSFJk9hq8xZg4V+4dfWp3BgatuvPEye1tCRNLpNKFi30yLM69qkOcbc0A+H6UmJigQCKhKKysWLGechQNXpPjGHNbdbjobHqYNm01V3eWy0HyGLBy4IswvzJzrCwukZzL07PfT++4uPV1ckDY/3+B1dpaKU1OEiiwcuCJoEKo6nXRnt1NpelqB9ZvD0RJk4cAVQwaL9M8LDlwxaLBU//6mubUSjTuOqXdyn0ZnknTJrxRMJukskaCTeJyOYzE6ikYJWThwxYDBcq1eVw1Orz8VaKDzM4AG5hoNkIUD12zg0XS97QTRbNYyAbIse1SDfoPV968viuTzpHEFVzc3jTUmMJ9jAmThwBV9Bt6XalU1COdyFLq9pfj9feMbhHnf/A2QhQNX9BqslysV1eCNK8AE5hoTmGtMgCwcuKKT/009Um4+applAjRo9ysgCweu6tEt5Xa5VqPCx8efQBYOXDQY6ZByo0vKnf8AB+4PUJxR+FvQ1+gAAAAASUVORK5CYII=") !important;\
	}\
	#qdr_h, .qdr_h {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAl1JREFUOE+lk99rUmEYx0/DG8WiGyv6A5qUoQgykTCweSh/Iag3q0kI1WTrdsdddDEoQmiyYKxyjEFeZCUVSAVJCEYNUo+xrZyeqZvOY7Efx+GNXT29j8yDK6KLDnx4X9/n+X7eRw7nEABQ//WgwOFwUE6nk3K5XJTb7T7s8XgGCC6Cbx/cD2ANe7AXM53LfxMor/p8/tmFhWeZfL5S395uI7jHM6wRgfJvAuW1kZFAkmVrXKMBW3t7EH66DK8/CZBkBchwPFnZ2nW/P0AEygMT2O32I5eHh8eS2Wzty/o6/Gg2OwLmzguIf2xCNLEL09Hv8PJDGVK5XO2K1zuGGfEvWCwWw3Q4HMuUSlDk+U4YGZ14DG8Wmx1epQQYv78K77JrMDs/H8OMKKBpeuh9Or2Bgl6sQ7chktgUCUY4uPUgDYtLSxuYEQUmk2k0w3Htbrg7gdE+IU6AU8SSW3Dxxlv4Vq22MSMKjEbjTbZU6gi6YZ1OBwzDwGnzQ1DSEeinn8ApOgr9l55DoV5vY0YUGAwGb4plq72CtUoF9Ho94NqFI/tMoQC5fL6KGVFAbjsfmpmJ4xtoCII4BQa7E+GKteVqFR7NzcUxIwq0Wu3RC4ODzOeVFX5zZ+dAqFdQJ7WvxSJvNpsZzIgCjUZDqVQqtcVqDWLDbqv1hwTPuHKZt9lsQezFjCjAj0kmk1EKhUKrVqsn701NJfKFAi+0Wj+bhFUiDYVCCRKaxB7sxadXICG/jxPOSCSSc1Kp1CuXywOEu/sE8AxrpOcs4QRB0ivoIwdywjHCyX+AF2FvHwp+AZjuL0FvPcYyAAAAAElFTkSuQmCC") !important;\
	}\
	#qdr_m, .qdr_m {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAcZJREFUOE+VkrtLI1EUxu/9E2y2EBZh11eXQtAqbex8dIsIFkkbQUEUBBciio2ljaJscH0UaaKySyTIumuhu7KdsfCBGp+oqITRxCF+nu+OMySQIg787jl37ve7nIFRaa3VqRAT5GkSuli5P3uj1BkdumaRTUSITSi1nUqlwMp9ISXOIuaCA1mEJQwPY8fvRzweNxVDQ0UUnUmWDl21I4uQyPf3Y93nw1hFhal2d3cRhWfM0qGr/skHC7/tcBj27i5uolE8LC7icmMDVijkcdfZidOWFrAyS4eu+uOwlQ0GcRgI4KKtzcD+vqOjJMzSoavqHXrxzocOXVXn0Jd/eUFw5LosmKVDV9U6DOTyebT2pPDr/5Mhmjj2+umVA69nhlk6dN0LBi3bRuOXJGZX0yKfYGHtHN9+HmHmxyG+y7up5X1hz2SYFXnQXFDj8PXh+Rk1zTEkty0DJ3B7TuD2zJisOHRVtUPkNptFdSDuTTCfPPMmmJWJ3AmYMVlx6KrPDqNXj4/wtW8i8Tdj4ARuzwncnhlm6dBVlfI3fdJ6/Nyy4O86KQtm6dA1d1RpPXmVyyGdyZQFs3To8oKGD1qPfdR67j3QofsKAFU11JoiOu0AAAAASUVORK5CYII=") !important;\
	}\
	#qdr_w, .qdr_w {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAd9JREFUOE+VkrFLW1EUxu/9E1w6FErB1talOEjJJHQQAx2smyiCoFk6mEEoVgIRIgSXji5ChwwFQRGiXaRiqwmlkkSDaMSQGIrWVrDUEJ5NfMTP891nHglk0Ae/d87lnt/HeSTqWGt1IiwK8niEYVaef93S7I4OXfOSQ0hYnFUqmclkwMpzPU3uQiYgLy9hGdPT2O/qQjQaNRXBYAMNdzJLh67al5ewWp2YwEZHB2ZaWky1/f4G6u84S4euSsgHC5v22BjsgwOcRyIozs/jTzwOy+dz+Tc0hJPeXrBylg5dFXPYKo+O4qinB7/7+gzsLwYHm8JZOnRVu8M47vnQoaueO7yrXl/DFz5H/2QB3rcpvOz/gvbXS2jtXkCbdwUv3sThGcjg1cgpOEuHrnrm8L5SrZqAb9v/DZHVn27/8XPe7RnAWTp0awEBy7bvvAFnRQ6YgDaHqeLVFZL5PCyp5Mfhodtv7O66/VoqBc7SoaueOoT+lssmIJHLYSubRbpQwHf5WWN7e0jI+Ws6jfWdHTCAs3ToqicO4bPLSxNwIZVwg1rPDWo9AzhLh656KP+mVq0/nFpWwwYMqG3AgPoNOEuHrsl4rPXcWaWC41LpTnCWDl0GdD7QeuaR1p/uAx26N9Q3Q8dCvmOvAAAAAElFTkSuQmCC") !important;\
	}\
	#qdr_y , .qdr_y {\
		background-image	: url("data:image/gif;base64,R0lGODlhEAAQAPUAAP///2dpeqKoq7i6vPJTJqGjpJCTn7rDxs0eA/BZLkpasPtjNf9fLz9h38bGx5CRkomMkImQmO08DeY8E/FAE1Nbd/NMIu1PJO9HHIyMjISEhf9LG77IzLK1uKOzw6O7zcqvrMTg+77V7cnJxLW8vsfH2+3W1afL7LbC4XSKr/FUKIGgvc8dAKatrpWWmOjQzs61s9K5tgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAGmcANY5FgWCgIIdGInFwSBAJGgnBCpdQSAAToAgKKrReA+nAEBwFJEDCj1YKVCDAYB+Z178lzKAwKHQYBfH6ABikhAA4AIwAKDYmLjY8RBhkPGhABFZWXmZtKCwRHSUOipFYqWCypWAiPICYwLzEBJSZcXmUcLWkDbG5pa3J0dnhjew6FgYN9f4GIioyOkNIADZSWmJqcLp7cQQA7") !important;\
	}\
	#rltm_1, .rltm, #gfx-toolbar .rltm_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqJJREFUOE+lk19IU3EUx49g5dYsc+rDKuuhUmmxNdHmsAXq5DL3x5hKxFi1B2llIyKaDxEIKxGmL4WyTLQgZJH9oadhKPpSjIuaqXP+25puK9Km7MUoOP1+V+/IEnroBx/O4Zzz/f7O5d6bgojwf8cgAHiUucFjMcDTLBC+yM09NljSfLqL6dDdOHuztrbWSjARTtXU1KSbTCaorq4Gg8FA7ubFmwZpnv2mEl9V6JL3epD1+4OR5eV1Cs3bu7ufXbRabcQgf3uDHrG+mGU+VwzU/RxbmsOva2s4MDTERcpsLIaDIyOL9TZbIzHI39jAvW+Dh5mSrL6jPs1kHd4avodfVlc5kcvlShrQ2lgohMOjo4tmi6VBr9fvAWglPMigNJx4r44Xesuxb8qbFDmdzmRODWeiURwJBrG9q+u5VqtVAdwVAbSkU6PewunyH9JeFXqnfMjOz3OYzeZkztdofDc+/qmysvI8gFPkJiYs5XioFAvcxVjQUYyWV5e5m41G45YNYvE4ZzgVDq+XlZVdBbizm4HbQvZw6CTyyO4r0fPhNRYVFaHD4UCGYZC8QrRarWi327HH48FAJLKuVquvAREDNOxk4MoONmchDwua5OhhX3K3zpFnVSqVXOSZJTkbCOCo3x9WqVQWkJw7BBLjQZBoD1wQ1+dE2t8+Qbom/+qokM9ppL2P4TC6OzvfkA3PgEKh4Mkor6hw+CYmoksrK1tEvxtESG9yZiaq0WgcRJsBcrk8iVQqlWmrqlrowLdE4i8TWptdWIjqdLoWOku1W45QKITs7GyFTCZrcrW29vsDgWg8kfi+Spgmpm1tbf1E1ERn6Ox2h3wQcCQ1NbVUIBBYRCJRI6F5k0Zaoz0yk0fYS0j502QXKZDfEiT/IIv006jBL/j42xjmVCLIAAAAAElFTkSuQmCC") !important;\
	}\
	#sbd_1, .sbd, #gfx-toolbar .sbd_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAlxJREFUOE+VkktoE1EUhg2CC6G4EHEhFhSVig8IkSItTYtEQUUUhCBC3elC27hwoSBiF2KxoLai4AN8NSY0iQuJNFKbSRMkk+atQW1jJSZNKnmQOEma10zm9840KSqzqBfO3DPn3P8753KPDMCq/10ymYzIIBN1AkAw2udXG3VamCet6maM+LtI7DPJDTRjjYICQNSJH84+Lh8f01MO/0dYDXqKd1Gd/DTVaRt7dc3h9sKi14K1mds5ll0nCSh3rE9SfWoM3rkL//kTwJn9QG87aM0p3HimxcTlcyjtXl2s5ZkjkoDUvhY4Hz6HyePHmwv94I5tQ+6kApnjezGt2okU8ePyFtSYnHi9pZv/cQWvfAOChxX43qtCQLUH0Z4tmOveim9drYgpWzHTsRmuto1gC3lpwFRCAAIcyy05/yye/L+LAfkKpAHvw1XwPI/FKotJK4VoLA6j6TV0Oh3CcxExZ/5SQb5clwaYQ0WxZpqU0GguwkG74fV40NevIb5HzBl8eTBlThpg9OVI9TrKdR6jOgM+uIOoEdHwvQeY+ZEkHQAvnBkwJVYaMOpMIlviIfTx+OlLTNEBWGw0hm6PIMsCTAV4ZFtAl7LbRF7gqPAKxA4SGxIH6Qk1j3SRR6JYB+UKIRD+CYdvFnbPVyQW68iQ3IglQoDDVxpiASDYARFw355CkrQ5+wuIk96jJbJXgXniC7E0yd2aWEC2UFUT0duG2Lk8yu62tRG/cjuCpw8heOksQoMD+HTzuugLMX/PDtCb1uTYAiO0rWhWXwY0p2qlOwFc/WsSVyqUOvcbEyys0FednlsAAAAASUVORK5CYII=") !important;\
	}\
	#clue_, #gfx-toolbar .clue_,\
	#sbd_, .sbr, #gfx-toolbar .sbd_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAbtJREFUOE9j/P//PwOpgJGREajtPyNYH8gAED6jyPAfiquBtDxMHBsN0QbRBzfgehGj+mU/puOXfZn+X7Ri+n9OhTkcXfOf37/5oS7GNACm+JIW++7rySz/r4Wz/LqkwR6NbMivTx+9CBpwVZdH9bob1/87U5j+X/flfAnkG8MM+fXxfRhBA24ZC6ne9ub7f3clw/87Vez/gfx5MAN+f/5E2IB7luIl97P5/j9cy/D/4XLG//dDhP4DxQxBhnz68R+/AY8d5CyB+MWzpSz/n29mAOOn5QL/gWKVYAO+/8VtwAs3FcsXfkr33s7j/P9uFwMcv5nB/R8otxNkwMfvf3Ab8NZXe+HHLpH/Xw8yoOAvO5n/A+Vegw349hu3AR+DDf//PsGAFYPkQAbY2tmvASYib1BCAmJXIO6CJ6Rvkeb//58Bcm87oGKgGFgOaEBX74QKqGaQASDsBDfgZ5zNwj/TZf7//zALBYPEQHIgA959/hkG1LQFqvkYSlL+m+Rg+TfT5t6/mXJA8btgDGKDxEByIMW/P38EOdsYZjuKAeDEkupsCcQLgfg/FIPYYM3IGGhANUZmwpbriBEDAPlcZu4Aqq9BAAAAAElFTkSuQmCC") !important;\
	}\
	#clue_1, #gfx-toolbar .clue_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAp9JREFUOE9lk19Ik2EUxs8211iLpdsysE0wEQKHDKfOIRMyRxeixFSEZILahAgUylh2kSVpdSFJEY2ivPUqK6oFOYtyKpP+TbK0GlorV02UCeKF+vWcsW/MeuHH+c457/Pw/vskbrebxCGTyTKkUukh5FqwtLW15dvc3FwW+6FQKDkXddrY2CByuVypNAQCgadoChzRaxD7jY2NVF9fn8ThcFBNTQ2R3W5PpSMWiwki6HVwv7a2dpuYjZIGeXl5lELT4OCgLxwOCxxRbzKbzf+Jtxmkp6eTiFqt1qlUqmbg5sh5RUWFoq6urhg0gGOJWIwVKJJbYAOtVksajYYgouzs7DaDwUA2m01xBKN34Pa5J1OhoS+Lq2PBr4v3r1y70811GCji+2cDiKth0sbodLpqk8lEVVVVlp5+T/ezYGT03fzyeHhp7Q0TXFgZ6xu4dYH7cYPS0lJSKpVtRqOR8vPz46tJHK7z4cTnIRi8+Bff2/l7mOOkyspKLT6O5ubmnuDIOfZN5eXlTPvodMTH4vcLKxPiCuZ+rgYm56J+7lNRUZHT6/WO8N1z5BzEV2WxWByP/DNeNhDFYpyY+f64pKSklXJycjpT755zwGIqLCy0dp2/dMM/+2f8W3TttSj+tbI+fbn/+tWCggIbH2Czx+N5znfPkXO9Xs83oIZJ6/DwA6G9s+tu8FNoMhpb/zD/4/fLnot9NzMzM1vwTpQkl8t1aWlpLeAMR85xA3uwheMjI68EHO4p1A6CZtAHToPDOzGysrKIICL8QEkg3me1Wjumpj4KeExn8YNpADGp8/g7PkQDiUTC6Y6ysrKTs7MRAQ+qBzUTajqQAXaDXUDJ84AMSOIGCTEbqHCATpxDL2p25EZwAOwHBrA3YaZKmEj/AiI4VGTeyySKAAAAAElFTkSuQmCC") !important;\
	}\
	#tl_1, #gfx-toolbar .tl_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAnxJREFUOE+Nkl1IU2EcxpcOmbsRJtEmfeCmJiSEBBs0tuVmsgyCRmc3aZDTqYNtrfahW4XghRde6JzNMPftZomlzrUttIjWRQ66E1x147zoQymEpJvQp3OOuKDTxQ784fC87/N73//zf48AYP376To6W/hVx2+eOFmtwt4edzO/kd3a/hz0+abCjM0U4LCUSpXIaLbHfIHYfjyegnvMi4eTPsSX0vAFpmEy2d6plM3SkpIS9qGnYKYE4y1HbG4+ve/3h6HTdSIUCqGnpwdt19sRjsxgYeE5LJb+NTabLWIAdB26FurkYCiK1tZL0FzVIL+Rh9VqQ02NCBKJBKPuByQ0BuIaMcEAOF0DM4vxJLq69JBKz0MulyOTyUCtVlMh0SVXKJB68RLdeuM6AzA2/mjLH4igsbER5eXlqKysROZNBlqtljbzeDwIhUJMR5/Aesf5iwHweCZ3A8EoBAI+bSgtLcXg4CCyq1n6+hUVFaivP01m8Rh9DudvBsDRd//VUiINpVJJA7hcLjgcDoaGhpDL5SAWi6FQXEAyvYzeXtPm/0K84SdHNTkVQG1tDcik6Tb4fAE0Gg2ampowMuo5CJEgZhmASCSCfucAOaoEPOMTkMnkqKurRUPDGcjkCtr8bD4Bh90Fg8FA+g/eT+EdeL1eUI/EYulbC5KnJFMrCIVjCJJF/5Oa3eb60ay62G61WpmA4eFhqnd2WVmZiJpzt960brfdIwNz0T0ThHaWXDtL7uGYzea/AF3qJ9oWd0DMfceV2LfCQrE66/L0V3zYBd7vAGL3pwKgWJ11buQjlreBp1+A6rvZAqBYnXXKtYoq21scu/0aR80rBUCx+h8FZWbfcGykcwAAAABJRU5ErkJggg==") !important;\
	}\
	#ww_1, #gfx-toolbar .ww_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAONJREFUOE9j/P//PwM2YGgX1MfKzFT4+++/sPOH1q3GqggkCDIAGzZ1CP5/98WP/+bW9kBp7GrAloMIA9vAPpAGIB0KUwxigzQD7UAWw1AHNoBY27Cpg7kAwzaQwS5RtSjOx+YqrP6HaUSnsYUFVv+DFNqFlP8HYn0QjawRPbww/A+y1T604r+5f4GMvnv6f1X7+CXyFuH/JU2CwAahhwPIBVj9DzTgv6ZTUg/QALzhgDUMQC4A2aZgGQGmQS7AlRZwpgOQBpizkdIGHdMBsamTOnkBWwDhih10tThdgC8HIssBAPSaYEjD5lgzAAAAAElFTkSuQmCC") !important;\
	}\
	#sts_, #gfx-toolbar .sts_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAALpJREFUOE9j/P//PwNFAGQAJRisecaZ//s33fz//8wzCAaxQWLEGAw2YMLh70AKFUDFGFbuOvN/7b4L/zcfufZ/15m7/w9efvL/xM1X/8/cfQfSwAA2oHXHm/9ffwFZK9vBGMQGiRHtgorV9/8//wx0viIDGIPYIDGQAUS5IHfBlf8gFyFjkBjRLkidcWZ/89qb/xcefgbGIDZIjGgXEGMTLjXgQMTnT6LCYJi7gJD3KMpI8KRMyBZ88gCWkfKnmys5wwAAAABJRU5ErkJggg==") !important;\
	}\
	#sts_1, #gfx-toolbar .sts_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGBJREFUOE9j/P//PwNFAGSAyyoXIPWf4czdd/9P3X7z//iNl/+PXH32/+Clx//3nrv/f+ep2/+3Hrv+f9PhK//XH7j4f83ec/9X7T4D1sMAIijBYM2jLhgNg9F0QHlmAgCgbuwxP0RbEAAAAABJRU5ErkJggg==") !important;\
	}\
	#img_1, #gfx-toolbar .img_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAORJREFUOE/VkrEKwkAQRNdP8Rf8p5T29iK2lim1DGKjjaQwSCwsrhAUIYXYSAQRGxHBZty5aFAEL6KNBxM2mzA73L4SAPnq0CAIDXqjGQaTJUKzwni+wTTZwawO+hniG0T9BDBpJtbs2eF8uNSKzzR6OrdeZuBK0Bjucbron0HTijV7hRPUumtsjxq/LFas2csNXAmq7QV4HY9ir3ACzzdRvZegE6dWrNn7xEB0en7ZrNXAvjs34NpQoS04OdBLFAVJFCRRkERBEgVJFCQ74GccaBIS+MqBK8Gdg4rng/pDDt6t8gouvO8d5SoW4gAAAABJRU5ErkJggg==") !important;\
	}\
	#prv_1, #gfx-toolbar .prv_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAgRJREFUOE+lk+1LU1Ecx2//Te+LCAqigsaiSESwYBDUm5ov7MGwOSOTNp3rMrNWa5vE0ml37i50yz3ElLHBnu5U2tSkBkYhVFBQL3r56WzaA8S2oAvfe875ncPvfM7vfM8uQPqvr5ZASWioCyuEM2sktCqp8ntyGx/Rqp/FNJJLY3FuA7StbdX6tVh989qvlUbT3/9a8zNWn2hAIKnzL4jF5igW0uTzKfK5FDmhguhHo7PY5eGtprvnchnK62+YVMI8VWMooSiBZ7H6+NXrTR77vNv4jQjWV0v0WrzsOWVGf+4WB08PcqBzkN26a5iGxlGD/ubnr7zMY7b5kf3P+fS1jFNNYLTFOXtTpX/Eh6r+Q4Ib9imU+LwA/UY4ncA0luSyfZYBeYJgcLI5wcpyFuuYwgMlSaGSxBfOYPPEsbhiWO5OEZzZSdCoBkulLLIrgD9SYia+RCRdxXLHxaU+G/KjEAFl4lcRJWEkSRhJEkaShJEkYSSpUi7RZ3mIoes2xusOzl+V6TAYOXz0GGar+3cNGhGsrS7TbXaw73gXh9qvsFd3kbYOAydOttE7MIoamm5FoGESBEfau9F19tSlP9PDfv0F+ofcoog7t9CIoFjMCsO8ZToUJxRZRA0voIq2Nt589wHfk/Hmt2CzW9P3nA48Xiduz/0/5KQWHx6xfGn5kFo9tB/ASMD8UwT1yAAAAABJRU5ErkJggg==") !important;\
	}\
	#clir_1, #gfx-toolbar .clir_1 {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAASFJREFUOE9j/P//PwMMxAXvOwRk28IFsDN2LVrr5A6XAhngvNIZSP1nSI468L+i+OT/tdvv/V+19c7/2KC9YLxozZX/81de/J8Usf9/WtyB/6v3nPu/ctcZsB4GEAHDQMWHgNgBiQ82AIlfCOSvRdYD1gxzwZm77/6fuv3m//EbL/8fvvoM7oIdp27/33L0+v+Nh678X7f/Im4XIJsMYsO8gC4+RFyw/dgjeBis3XODtDAA+t0A5n8o/Qkkhi0sELHAwGB8Q98YJRYOXHr8f8+5+/8JxwJQMyRJINIEsWwGoEawZpDtuPCxRRvgYQBSs3v6UrSUCHU+sbaCXQuyGJaUwSkRLQzOr96B11UwQ1DyArEuAHkDxQXEagSpQ9YM4gMAlbasyR1t28gAAAAASUVORK5CYII=") !important;\
	}\
	#hq_, #gfx-toolbar .hq_ {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQABxAIiysrKGoFUNcw7IFpMTIwZxP779y/Dv3//GF6+fPkXJA7CILGvX7+2Llq0qB4ggFigGmpVItoZ0U0HmfcXiP/9+8/w7/tf5qeffjN8/wsUB8q9nxdVC6TqAQJwNEYrAIJAAJsFKafP/f8HRgR5HnFSia+DbTMgImHPgaN9WFMeq2ypMDy03lw9cto7uLKmzBIFd5/DXwAxwZzMATRKgPkbw7undxlKXaUZXj6+y/Dk/i2GGi8ZoPNfMPz8+IphaYISw48PLxmYGBnB3gABgAACGwA0jeE3kP/+1QuGhnAjhqC8doa2KCOGe3dugxX9+/mV4S8Qg8MESDP9Z4AbABBAYAN+/frF8OsfA8OnLxBF6yZVgunf3yH870Bb//yAsH+8B7J/foMbABBATLCQBrmAiZ0bLBhTNxdM8whJQAys8YcH7NaGAIbfQMNgBgAEECPI/zk5Of9NUicw/Pj6leHj588MP//8Z/gDlP8KdNanz1+AMfEfaDgPw49vXxj+AF3Kzi/OcHuSP8OxY8cYAQKIBeaFrz//M/xm4mL4x8XBwAhyDShggTQjrxgDyLLfQI2sfOJgA/4A5UBpAwQAAghswI8fP5quzM+rZmZmZmAEhjAIi4uLM7MzMTHwM4PTE8OrV6/+gsTBzgbSonZ2rSA2QAAxUpqZAAKI4rwAEEAUGwAQYAAkv/wMG3v6IgAAAABJRU5ErkJggg==") !important;\
	}\
	#hq_h, #gfx-toolbar .hq_h {\
		background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK7wAACu8BfXaKSAAAAbNJREFUOE+lkktLAlEYhlXQLm4KWvgbdKkgIgiC4Ma/YDWFJYxGpJILFQoRhBYRQREt20WalV1WbYKi2yLoRv9inC40B9++c3K8trID73xn5pz3+d4zM0YAhn8NDviPhDmVSi2RWDKZFEokEqxYLIKrUCggn88jHo+zWCzGZFlm0WiUhcPhJZGeX8hU37zV0K2NGw3r1xrWrr6xfP6J2YqC8ZKCMCkUCtWbgFwuh9Izw9ZdC6KbVy+/kT57R2RfwXS5BqmsYIIAwWCQ/I0E2WwWx28MB68M2/cadPPKxRcSJyrkwxqilRpmSNMEkAgUCARagHQ6jcoLE9p7YuIo3Lx4qmKhqmLuiENUgqiUhCClGvx+/y+AxjMJI2M27D4yDAxZYTQaSSYYqLZreNSGWQ6gBD6frwnQ+Iybdh6YqI0VUdsHb2QetBJAhdfr7QTwRW7mtR3A70UK/TnNp8rv8Hg8nYC/uokdZJivfoiq308SwO129yYQ3f5I0J0sEonA5XL1AjKZTA+g5x2YzZAkCU6ns/MrWCwWcS4zbdCTdFeTyQSHwyFkt9tb/wE/ar/q26g3/AHccWaQfgbclQAAAABJRU5ErkJggg==") !important;\
	}\
	#cc_, #gfx-toolbar .cc_ {\
	background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG7SURBVHjaYty4cSMDKQAggFjevn2LJsTExITM/ffvHzIXIIBYPn/+jGnM379/IQxmZmY0KYAAQmgAGgw07Pv373/+/IGwIeJsbGycnJxwLkAAQTUAVQCV/vr1S1xcXFdXV0ZGhpWVFSj16NGjmzdvAp3Nzc0NcSpAALF8/foVSP38+RMoFBAQYGNjAzQP2Q2vXr3atGnT2bNnmcAAIICYtbW1gaoZGRnj4uLs7e2BBqM5GmiQkZHRixcvgFYBXQsQQMwcHBwfP37U0dEBasATmvz8/Nu3b79+/TpAADE9efIESAE9gD/4ge588+bNs2fPAAII4jCmq1evAjl4NBw7dgxoNNDBAAHEDLQLGNgvX74EBoixsTEfHx+m6t27d3d1dQHVADUABKCAzm0AAGAQiO3fIaZirDjtSbwvsBgVsg2ldyuig3OStGVvLXgCiEEOBoCKhIWFgdHU0tLy////I0eO2NnZKSkpCQoKioqKwpUBBBAjEMOtBkYc0MKenh5gIAINBpoK1M/Ozo6cugACiBFoBnI6A4YGUA8wAIBBDnUDKgAIIEZ9fX3kFAZMdkB7WFhYMGMQAgACDAAhI7ryTOIwWgAAAABJRU5ErkJggg==") !important;\
	}\
	#cc_1, #gfx-toolbar .cc_1 {\
	background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAF1QTFRFXV1d0tLSiIiIyMjIa2trZGRk1dXV0NDQzc3Nenp6y8vLxcXFgYGBjo6OcnJyNjY2SkpKLCwsQEBAVFRU/f39IyMjGhoabm5ue3t7dXV1CwsLBQUFEhISgICAZmZmZYgvaQAAAFdJREFUKFNdy0cOgDAMRNGhd0jAdMj9j0lssZonjfw3xktwEJwEO0FQg4iUVgEqlcRmlqiXSo+BU018qa0c5t8orRWmKJfMpuBVEV86K4+VYCN4CC6Cm3z/dBTc9282qwAAAABJRU5ErkJggg==") !important;\
	}\
	#leftnav #atd, #ghead, #gog {\
		background-color	: transparent;\
	}\
	BODY CENTER DIV#lga{\
		display				: block;\
		width				: 275px;\
		height				: 110px;\
	}\
	#gfx-head-content #logo {\
		font-size			: 0;\
		background-position	: 0 -41px;\
	}\
	#gfx-head-content #logo IMG	{\
		display				: none;\
	}\
	#tbp, .g .csb, mbi {\
		background-position	: -153px -70px !important;\
	}\
	#gfx-head-content #logo {\
		width				: 137px;\
		height				: 49px;\
	}\
	BUTTON,\
	BUTTON[type="submit"],\
	INPUT#stxemailsend,\
	INPUT[type="submit"],\
	INPUT[value="Cancel"],\
	INPUT[value="Discard"],\
	INPUT[value="Download"],\
	INPUT[value="Save"],\
	.tbi div, #tbp, .csb, .ss, .w10, .w11, .w20, .w21, .w24, .wci, .wpb, .w4, .w5, .w40, .w41, .w44, .w50, .w51, .w54, li.w0 .w5, li.w1 .w5,\
	.micon,\
	.csb,\
	#gfx-head-content #logo {\
		background-image	: url("data:image/png;base64,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") !important;\
	}\
	/* Remove Footers */\
	#footer,\
	#footer_promos,\
	#footerwrap,\
	#main-wrapper .bottom-search,\
	#searchagain,\
	P FONT[size="-2"],\
	TABLE[class="t n bt"][width="100%"][cellpadding="2"],\
	DIV[align="center"][style="white-space: nowrap;"],\
	FONT[class="p"][size="-1"],\
	FONT[size="-1"][color="#6f6f6f"],\
	DIV.div-copyright,\
	SPAN.copyr,\
	DIV.content DIV.footer,\
	DIV#footarea,\
	TABLE[width="99%"][cellpadding="3"][bgcolor="#c3d9ff"][align="center"][style="margin-bottom: 5px;"],\
	CENTER > DIV[style="padding: 2px;"] > FONT[size="-1"],\
	CENTER > CENTER > P > FONT[size="-1"],\
	BODY.search > DIV[align="center"] > SMALL > FONT[size="-1"][face="Arial, sans-serif"],\
	BODY > TABLE[width="100%"][height="100%"][style="margin-bottom: 1px;"] > TBODY > TR > TD[valign="top"] > CENTER > FONT[size="-1"],\
	BODY > CENTER > TABLE[width="100%"][cellspacing="0"][cellpadding="2"][border="0"] *,\
	DIV[class="padt10 padb10"] > TABLE[width="100%"] > TBODY > TR > TD[class="fontsize1 padt5"][align="center"],\
	BODY[marginheight="3"][bgcolor="#ffffff"][dir="ltr"][topmargin="3"] > CENTER > FONT[size="-1"],\
	BODY > DIV[style="width: 100%; clear: both;"] > FORM[name="langform"] > DIV[align="center"] > FONT[size="-1"]\
	#foot FORM\
	{\
		display			: none;\
	}\
	' ;
	
	
	// First Block of Styles
	addStyle(css);

	css += '\
	BODY CENTER DIV#logo {\
		background			: url("'+ Google_Logo +'") no-repeat scroll 0% 0% transparent !important;\
	}\
	A.gfx-thumb, A.gfx-thumb IMG {\
		width				: '+ DB.css.thumbs.width +';\
		height				: '+ DB.css.thumbs.height  +';\
	}\
	A.gfx-thumb {\
		position			: relative;\
		display				: inline-block;\
	}\
	A.gfx-thumb IMG {\
		display				: block;\
	}\
	A.gfx-thumb:visited > IMG {\
		opacity				: .9;\
	}\
	#gfx-themes-bar div {\
		margin-left			: -'+ ((THEMES.length*14)+2) +'px;\
	}\
	' +
	(!GFX.bMnuIcn ? '\
		#gbar A, #gbi A, #gfx-header .login {\
			padding-left		: 3px !important;\
			background-position	: left -25px !important;\
		}\
		#gbi, #gprefs, #gfx-searchers-mnu\
		{\
			margin-left			: 0px;\
		}\
	' : '') +
	(!GFX.bMnuFix ? '\
		#gfx-head-content {\
			margin-top			: -7px;\
		}\
	' : '') +
	(GFX.bLeftNavAH ? '\
		#leftnav {\
			margin-left			: -160px;\
		}\
		#center_col,\
		#foot {\
			margin-left			: 5px;\
		}\
	' : '\
	') +
	(GFX.rNoAds ? '\
		#ads-rhs,\
		#adt,\
		#ad-label,\
		#lhid_search_ad_unit\
		#mbEnd,\
		#mclip,\
		#pa1,\
		#rhs,\
		#rhssection,\
		#rhsline.std,\
		#rhsa,\
		#rhsads,\
		#rhswrapper > TABLE#rhssection TR,\
		#rhspad,\
		#rv_panel,\
		#tads,\
		.ads.noprint,\
		.ads.topads,\
		.serp TD.right-nav,\
		.serp TD#table-spacer-cell,\
		.ra [bgcolor],\
		.ra,\
		.pY,\
		.tas,\
		.u5,\
		.u8,\
		[id^="tba"],\
		BODY[onunload="google.Quote.stopQuotes();"] DIV[class="sfe-break-bottom-16"],\
		DIV.sfe-break-top.sfe-break-bottom-16,\
		DIV[ads],\
		DIV[id=":rh"],DIV[id=":ri"],\
		DIV[id^="tpa"],\
		DIV[spl],\
		IFRAME[name="google_ads_frame"],\
		TABLE[class="lads"],\
		TABLE[style=""][align="right"],\
		TABLE[width="25%"][align="right"]\
		{\
			display				: none !important;\
		}\
	' : '');
	


	//****************************************************
	// SERVICES STYLES
	//****************************************************

	
	
	/** WebSearch Service
	================================================================*/
	if (canRun.search) {
		css += '\
		#gfx-head-content TD[style^="padding: 5px; background: rgb(255, 255, 153)"],\
		#gfx-head-content TD[style^="background:#ff9;padding:5px;"],\
		#res > p[class*="stp"],\
		#res .g > HR,\
		#res OL > DIV,\
		TD[style="background:#ff9;padding:5px;text-align:center"]\
		{\
			display				: none;\
		}\
		#sft {\
			margin				: 0 !important;\
		}\
		#sfcnt DIV.lsd {\
			margin-right		: 20pt;\
		}\
		.tsf-p {\
			margin-bottom		: 15px;\
		}\
		#sfcnt .ds {\
			margin-top			: 2px;\
		}\
		.tsf-p TABLE, .lst-td {\
			border				: 0 !important;\
		}\
		#center_col, #subform_ctrl, #foot {\
			margin-right		: 0px;\
		}\
		#cnt,\
		#res {\
			margin				: 0;\
			padding				: 0;\
		}\
		#res > DIV {\
			margin-left			: 0 !important;\
		}\
		#res .g,\
		#mfr {\
			margin-top			: 2px;\
			margin-bottom		: 5px;\
			margin-right		: 0;\
			margin-left			: 0;\
			vertical-align		: top;\
		}\
		.g A.l {\
			margin				: 0;\
		}\
		#res .std,\
		.g .s,\
		LI .med,\
		LI .s\
		{\
			min-width			:100%;\
		}\
		EM {\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.g {\
			margin-left			: 0px !important;\
		}\
		.g SPAN.cnt {\
			display				: inline-block;\
			float				: left;\
			margin-right		: 5px;\
			font-size			: 10pt;\
			font-weight			: bold;\
		}\
		.g .f {\
			font-size			: 10pt !important;\
		}\
		.s .f {\
			margin				: 0px;\
			margin-left			: 5px;\
		}\
		#mfr {\
			font-size			: 10pt !important;\
			color				: gray;\
		}\
		#res LI.g DIV.std LI.g,\
		.g .g\
		{\
			width				: 95%;\
			min-width			: 95%;\
			max-width			: 95%;\
		}\
		.g .qSite {\
			display				: inline-block;\
			font-size			: 9pt;\
			margin-left			: 10px;\
			color				: #55f;\
			cursor				: pointer;\
		}\
		.g .w.xsm {\
			position			: relative;\
			display				: inline-block;\
			float				: right;\
			margin-top			: ' + DB.titleSz + 'pt;\
			margin-right		: ' + (isOpera ? 20 : 0 ) +'px;\
			color				: #d00;\
		}\
		.g .tbpr {\
			display				: inline-block !important;\
			visibility			: hidden;\
		}\
		.g:hover .tbpr {\
			visibility			: visible;\
		}\
		.h {\
			font-size			: 20px;\
			color				: #3366cc;\
		}\
		.p {\
			font-weight			: bold;\
		}\
		.q {\
			color				: #00c;\
		}\
		.ts {\
			border-collapse		: collapse;\
		}\
		.ts td {\
			padding				: 0;\
		}\
		.w0 A.l {\
			min-width			: 90% !important;\
		}\
		.w0 H3 + SPAN {\
			float				: right;\
			margin-top			: -25px;\
			display				: none !important;\
		}\
		.w0:hover > H3 + SPAN {\
			display				: inline-block !important;\
		}\
		.osl A {\
			padding				: 0px 4px !important;\
		}\
		' + (GFX.rThLft ?
			'A.gfx-thumb {\
				float			: left;\
				margin-right	: 7px;\
			}\
			.g > table.ts td[align="right"] {\
				width			: 40px;\
			}'
		:
			'A.gfx-thumb {\
				float			: right;\
				margin-left		: 20px;\
			}'
		) +
		'\
		#rtr {\
			overflow 			: visible !important;\
		}\
		#rtr .ts {\
			border 				: 1px solid black;\
		}\
		#rtr .ts td {\
			'+ DB.css.op.b2 +'\
		}\
		.rt1 {\
			background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAQCAYAAACycufIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAdhJREFUSEvdVj9IAlEcvneXZ94JmrVkBSVBtUjn6qIQDmKEe7lVQ2ubSxm0t2sETZWGDU0t6h5BS0kgiSQ1tbbI9T7hQF53vgPLC4W3vO/P7/vu7t1JdF0XRvaHcqO6Bip2dV0aa7XbitXFSaWSUUXx5OmTcUnXZr8lSdIt64M9ng7emIFZrH6gcnbueCaztUeIoEuieGEVNBicPqacGuuHPWBWOnjCGzPMsvx5OQxNJNYKkiTqsuzKmgX1+3y1wIT/nA2IPWBmGnjBE95WF3ko5TA8oq3e0zAtj2f8kA1LBOElomnrbEjsAWP58IAXPPs9PUMrV6lVo6HQQpMGrfaGDYfD+4SQT6uQwMBhClbhBc9/UQ4hyjfl5NRkoCOK5MQIG4/HcvTF8WAVEhg4Bh9aeMCLd+aHdueMIPnTQtbrVWlBsXv+6Auj4XbLZ1ZBgYEDLjTQwoNXrPv9tkP6bU7uKHcnu1yPCKwqSmd2JvjjvBkzgYEDLjTQ2s3jSLm3j/f53Z3tOn3j6aqqfPHCggMuNNDy+AbuSDkMbzRfF9PpDfz3q/DCggMuNDxuL+5YOYR4qj/HVpaXDniBwQGXx2NxR8shTLFUnOOFtsMx83C8HK/YIPhIl/sGojJda8g/GQUAAAAASUVORK5CYII=");\
		}\
		td.rt1, td.rt2 {\
			background			: transparent;\
		}\
		#gfx-searchers {\
			margin-top			: -5px;\
		}\
		#gfx-toolbar .title,\
		#gfx-filters-holder	.title {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAdhJREFUOE+lkttKAlEUhncP1Qv0Aj1BTxDde5FaxCCSlo2BSGFIUY0X0UkrR80yigiKoBIq6egpLWcm6Kpm9a+ZfRF0JS74ZvYwe/3/2muvPiISPcXo6Gtqe9ugVOrDQdPeaWXlnZaW2rS42KZksk0LCy1KJFo0P9+iePzNWXOeY76+3iER9XdNLPaGfAiwqwh6u0ZVm64AlyyOQ91xOUXT0w1XYHUVAhQn8azWQAM8iif1RTyqFXArHtQHh8pMDTTF/cyHuIt8hUJSgBuGeLVtuyw5xfcp1jpYkyTxZqJAwX8lGKy7FXC3EeWjo8+7Uunz6vDQuigWrZv9fesmnzfPczkzv7dnaru7RoKTgQf7PYGAFOCrYkegS/66Rn9+bEaReL6/7WHsG1aUmlsB3zMnHhxYRbhmCwUrA9dCNmvm4Jzf2TFO0mnjbGurc7252ang2mvAmpiQAjwciH+uslynZHbFmxkCg9g/6PdX3Qrm5hyBJFwTum5qfF64pjMZQ8eELsM5trHR8cF1hJPBAPYPeL1SgEcTEZU4HeYm8TklQ+wo4eR+BqPsVoCFNjvbJJ6sSKRB4XCDJifrxF3mRvFZx8erNDZWJZ+vSuzMyZznCPCjF3pKZuNfotvNjRU4ucQAAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .body,\
		#gfx-ilters-holder .body {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAbtJREFUOE+lkk1OAkEQhctDeQEuwAk4gXFPIgwM44BEUIIQHEFwkIiD0bjQFV6AhYkbNZooieFPAX8Wbi1f9bQrY9TQyTfVmUy9V/O655iZZlqRSK91cvLKrdazwvOm3GxOudGY8O7uhF13wrXamKvVMVcqY3acJ7WXPmV+fPzCZ2dv/6ZUekI/BL6c/1vz+UdfQEbWq4cqXGs6qG3NEarggg1hfX3kC+zvK4EeHSZvwR24JG/5gprLl1S3bqmauKEts0vF+APljAFljGdKRt4zGS0ggYkjfTjX1M3zL1zRtHhE7ITT6aE/gaSN1aEDuwdXpobFtAPKJlMpzpSPMWUNppUowySsYGchldICclTyn3jZ/sME5zQpVvBtyLYH/gRyzkqgbl3RdoJpE84FOK/BNQ1XO8IUW/qGZWkBuRySMEZzf5zgHtlMix18EwJBTBCMxfr+BOWyEnCRchUpe0jZQ8qnZC614bwHSsAAi6r5wwlAIBCNagG5mvpsbVQhDBY0IVQhqAmgzgu4yv4E2HiFwiPLzcrlRpzNjnh1dciSsgQl/2qafY7H+2wYfRZnaZY+JSCPWZipWYw/AboOpb7jfoBOAAAAAElFTkSuQmCC") !important;\
		}\
		#gfx-toolbar .links,\
		#gfx-ilters-holder .links {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAcBJREFUOE+lkr1OAkEUha+vZCIPwAv4BPQmvgAFyq7rhhAgEFBhA4gbiAgFoYDERCo7Ohsw9iD//jQ24l7vmR2MloZJvp2Z7Jxz7vzsMDNt1SKRUbPTeeNm80XRaKy4Xl9xrbbkanXJrrvkSmXBl5cLLpUW7DhzNYZOhbfbr9zrvf+bfH4uejHYJP+3z2ZnvgFK1m0kPXjU9KW/07SkB66QA+n01De4uVEGI8/zHjVKKOMNSixzV8gBmdvJpDbAgSFxI4ZQG0D0RyhzG8j/cDw+8SvAaUvryw+gUnXij/jrSyVDHAby/zAW0wa4qs1eg8Gn4e9yA4FhX8S2Jry7OywNBh9xWROy7We/AtwzDMgx76lgMGWjt9gnXRgtKptM5RNHDMLkWhmqWkw1qwwDy9IGeBxIpevTB/IclkUqlSon92peMLrrtXdITbul5q51Luv3o9GxX0GxqAxcKppI7MuCqghsqcihvNGlKyvz+emFqGTaElKXyg5kffDoSBvgaUpTV6NRh6QJoVwkaoLS7wF5yn4FMmicnc0YLyuTmXIqNeVEYsI4ZRwU9mqaYzaMMR8fjxnJEEOnDPDZhq3ECP4Ge1nuqKBM6f8AAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .url,\
		#gfx-ilters-holder .url {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEQAACxEBf2RfkQAAAi5JREFUOE+lUt9LU2EYPv0LYhdFGAUFpUhFf0LQH2BdVNhFmFJDwi5kxa6Cg1iC6AZjKBsHTT0LDmKDbUyZP7bodHHqIg01C2qYup25neGVet7e59u3Ud6JHzy83/vred7vxykiUk60fL5cNBYrUTRaFNB1myYnbRofL9DYWIE0rUCRSJ7C4TyNjuYpFNoRe/QJ8enpXZqdLR8bweAO9zNBTfm4dnh4u0qAkeXKsQW+SZhsUxIGW0Bj+IHBwa0qwdSUIMhls5U1xgZjOZOpfFlcdJYXFpy1+XlnNZ12fvIxf6VS5c1kslyMx0t7AwOSABcGRdd1AZMhVNkaEhpbv4TKVuW8t7//T3UC3DYvk1WtpaXKR1b+zKoWq67MzZU/sPJ7VtUTidIQN3sBrvf09UkCPNXRs3JRXfXw0FUlvGw9Bweuh+vbVXWzOgHeGQR83hXb3jc057t2LRYKX4h06Bf1xzpb4/b621Rb0cjw3uLYD7a7bOnNvqUo+By4Yaj69kw/J0wuoBu/e+n6Ri81f+oh+GiAfzSmjIwIAo3PGr+a7V4/N/SQWr/2UFPwETU+v0tnXt0XBIhjjxhyIEZMwdeUb6uiEEkQ3Nx6QQ3dd4hJqcV6JhouJ5+IGHLwUavwn9YDgW3Cz7o000lnXz+oT9DwtI0AqAI1H8ogQK2Cm6yhazUtxsR5oQZgj0I0/RvHtKj9j2BiwqZbRoJOv7wnkmgEzocCdOVdsO4jhxoI/gXY1bxM+fwrSwAAAABJRU5ErkJggg==") !important;\
		}\
		' +
		(GFX.bMnuFix ? '\
			#bsf {\
				display				: none;\
			}\
			#tbt9 {\
				margin				: 0px;\
				display				: block;\
				width				: 100%;\
				min-width			: 100%;\
				max-width			: 100%;\
			}\
		' : '') +
		(GFX.bToolbar ? '\
			.tsf-p TABLE {\
				padding-top			: 3px !important;\
			}\
		' : '') +
		(GFX.rThShots ? '\
			#res .g,\
			#mfr {\
				min-height			: '+ DB.css.thumbs.maxHeight +';\
			}\
		' : '') +
		(GFX.rRefIcn ? '\
			#res .g,\
			#mfr {\
				padding-right		: 10px !important;\
			}\
			.g A.l {\
				padding-right		: 10px !important;\
			}\
			.g .gl {\
				position			: relative;\
				display				: inline-block;\
				float				: right;\
				clear				: none;\
				min-height			: 24px;\
				min-width			: 16px;\
				margin-top			: 5px;\
				margin-right		: -10px;\
				text-align			: right;\
				visibility			: hidden;\
			}\
			SPAN A.tr {\
				display				: block;\
				visibility			: hidden;\
				float				: right;\
			}\
			BUTTON.ws + SPAN A.tr,\
			BUTTON.wsa + SPAN A.tr {\
				margin-right		: 0px;\
			}\
			BUTTON.ws, BUTTON.wsa {\
				float				: right;\
				margin-right		: -7px;\
			}\
			BUTTON.ws {\
				visibility			: hidden;\
			}\
			.g:hover .gl,\
			.g:hover SPAN A.tr,\
			.g:hover BUTTON.ws\
			{\
				visibility			: visible;\
			}\
			.g A.sm {\
				float				: right;\
				margin-right		: 0;\
				margin-top			: 1px;\
			}\
			SPAN A.tr {\
				margin-right		: -10px;\
			}\
			A.ch, A.sm, A.nt {\
				margin-right		: -10px;\
			}\
			.g A.ch {\
				float				: right;\
				margin-top			: -20px;\
			}\
			BUTTON.wci {\
				display				: none !important;\
			}\
			.gl A.ch, .gl A.sm, .gl A.nt, .gl .wci\
			{\
				display				: block !important;\
				clear				: none;\
			}\
			.gl A.ch, .gl A.nt\
			{\
				margin-right		: 0;\
			}\
			.g A.sf, .g A.-sf {\
				background-position	: 0 -20px;\
			}\
			.g:hover .s A.sf, .g:hover .s A.-sf {\
				background-position	: center center;\
			}\
			#rtr .gl {\
				position			: relative;\
				display				: inline-block;\
				float				: none;\
				height				: auto;\
				width				: auto;\
				margin-right		: 0px;\
				text-align			: left;\
				visibility			: visible;\
			}\
			#rtr .gl * {\
				display				: inline-block;\
				padding-right		: 0px !important;\
				width				: auto;\
				float				: left;\
			}\
			' 
			+ (isOpera ? '\
				.f + A.ch {\
					margin-right		: -50px;\
				}\
			' : '\
			' ) 
		: '\
			.g:hover .s .gl\
			.g:hover SPAN A.tr {\
				display				: inline-block;\
			}\
		') + 
		(GFX.bSidebar ? '\
			#gfx-sidebar {\
				position			: relative;\
				display				: inline-block;\
				clear				: left;\
				float				: right;\
				margin				: 0;\
				margin-bottom		: 5px;\
			}\
			#gfx-sidebar nobr{\
				white-space			: normal;\
			}\
			#gfx-sidebar A.l{\
				font-size			: 12pt !important;\
			}\
			#gfx-sidebar .box {\
				display				: table;\
				min-width			: 100%;\
				padding				: 0 !important;\
				margin				: 0 !important;\
				margin-bottom		: 8px !important;\
			}\
			#gfx-sidebar .box * {\
				font-family			: inherit !important;\
			}\
			#gfx-sidebar .box .gfx-icon_tb {\
				position			: absolute;\
				display				: none;\
				right				: 0;\
				opacity				: 0.7;\
				cursor				: pointer;\
				z-index				: 10;\
			}\
			#gfx-sidebar .box .gfx-icon_tb:hover {\
				opacity				: 1;\
			}\
			#gfx-sidebar .box:hover .gfx-icon_tb {\
				display				: block;\
			}\
			#gfx-sidebar .box > .r, #gfx-sbar-brs .med {\
				display				: block;\
				min-height			: 18px;\
				margin				: -1px;\
				padding-left		: 45px;\
				font-size			: 12pt !important;\
				font-weight			: bold;\
				border				: 1px solid;\
				background-repeat	: no-repeat !important;\
				background-attachment: scroll;\
				background-image	: url("http://www.google.com/options/i3.png");\
				text-shadow			: 0px 0px 2px #888 !important;\
			}\
			#gfx-sidebar .box > .r > A {\
				color				: inherit !important;\
			}\
			#gfx-sidebar .box  EM {\
				border				: 0;\
			}\
			#gfx-sidebar .box .ts {\
				margin				: 10px;\
			}\
			#gfx-sbar-blogs > .r {\
				color				: #050 !important;\
				background-color	: #efe !important;\
				border-color		: #8b8 !important;\
				background-position	: 0px -86px !important;\
			}\
			#gfx-sbar-books > .r {\
				color				: #640 !important;\
				background-color	: #eda !important;\
				border-color		: #ba0 !important;\
				background-position	: 0px -105px !important;\
			}\
			#gfx-sbar-brs .med {\
				display				: block;\
				width				: auto;\
				padding-bottom		: 0px !important;\
				color				: #467 !important;\
				background-color	: #def !important;\
				border-color		: #9ab !important;\
				background-position	: left center;\
				background-image	: url("http://www.google.com/intl/en/options/icons/search.gif");\
			}\
			#gfx-sbar-calc > .r {\
				color				: #689 !important;\
				background-color	: #bde !important;\
				border-color		: #ccc !important;\
				background-position	: left center;\
				background-image	: url("http://www.google.com/images/calc_img.gif") !important;\
			}\
			#gfx-sbar-filters > .r {\
				color				: #831 !important;\
				background-color	: #da8 !important;\
				border-color		: #620 !important;\
				background-position	: 0px -290px !important;\
			}\
			#gfx-sbar-images .r {\
				color				: #115 !important;\
				background-color	: #8df !important;\
				border-color		: #08b !important;\
				background-position	: 0px -810px !important;\
			}\
			#gfx-sbar-maps > .r {\
				color				: #b11 !important;\
				background-color	: #fbb !important;\
				border-color		: #d66 !important;\
				background-position	: 0px -1020px !important;\
			}\
			#gfx-sbar-news > .r {\
				color				: #333 !important;\
				background-color	: #ddd !important;\
				border-color		: #aaa !important;\
				background-position	: 0px -1125px !important;\
			}\
			#gfx-sbar-video > .r {\
				color				: #206 !important;\
				background-color	: #caf !important;\
				border-color		: #76b !important;\
				background-position	: 0px -1860px !important;\
				margin-bottom		: 10px;\
			}\
			#gfx-sbar-wiki > .r {\
				color				: #222 !important;\
				background-color	: #777 !important;\
				border-color		: #111 !important;\
				text-shadow			: 0px 0px 3px #000 !important;\
				font-weight			: bold;\
				background-position	: left center;\
				background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAq9JREFUWEftVjtoVFEQXRMx5oMfsJGASAiKNiI2CoFEEQQVLRJTKCoIphE7yxQBfxBTiWIhCKmCVlukUAtDApIiHxSMINoYMCksFPwh/nKOzMhkeHN3962Fwg4M+97MmZlz752d+wqFmtR24D/agfXgmtKWv7iWFalcv+BM6Sj8h0pg3sO/qQSmA/6JBKZwGc7vGYCvsA1At0KboDuhx6EvHZbJ90DroVug56A/BMO8Q9BO6GroDugt4+cGvIGehv6Wg1AWtjtzU53ud5fDDTp/A94/CeZCkOO6+D/ilwtdJmddgftBEpofGOxbPDcbrOZ5BduqIMekxJNQpoybAj/xvC3Acavt7p0XXB1+9eiOBbG7JZbH1x4ROeAKhIyBe2ywLE4SLE6CXHH0DxkRTDEiofZZU+ADntcFAUcd6W68T4vtcBCzEXbtxf2liOiqdOujhrPHQOyikHiW2I2LgplLYP7w8wVew7MyYO8bnIROBdhG2NnYxDCuLGHz2WbkMWSJTU4858aaAHtGcpIM48qStUCxP5TMWCLqqiMdrVZ771JZDAyIA83uCidrljx0uKzz7xLMN/zyKqhItgPNWaJkhjOi9zkSiuUYsFIU3N2KGBjwI1PoC543GB/nxJT4Oea5WiVip/Jm2PXu4TDLJT1uxf0mi/rmYeP9wtVmHeU1sXPI5Rb+bRdMAT7z/qD9hdj7JHuXI8Kj5LfMO7GfyM1CAgdcAc4JFufqebHZGfPUYDlBr8i7LqAqLq2Ituc/g3d+Q5DISZfZDzhtdnukVZHx508Sz6H8GLLCQaVHof3yGTbb5FUR0avbNmNvkFGbU7G3q6qcEWy/N5/AH13zbfDp35VkokGYm5+99o+UyFKUHkpdDbmJ8Fa+A72R2A1Nzi/2e9C9uavVAms78K/uwBLR3RKeIJX6XgAAAABJRU5ErkJggg==") !important;\
				margin-bottom		: 10px;\
			}\
			#gfx-sbar-youtube > .r {\
				color				: #737 !important;\
				background-color	: #fdf !important;\
				border-color		: #a6a !important;\
				font-weight			: bold;\
				background-image	: url("data:image/png;base64,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") !important;\
			}\
			#gfx-filters-holder {\
				padding				: 5px;\
			}\
			#gfx-filters-holder TD{\
				padding-left		: 5px;\
			}\
			#gfx-sbar-blogs > div > div {\
				padding-bottom		: 5px;\
				margin-bottom		: 5px;\
				border-bottom		: 1px dotted #aaa;\
			}\
			#gfx-sbar-books .g {\
				display				: block;\
				float				: left;\
				list-style-type		: none;\
			}\
			#gfx-sbar-books .g .s cite {\
				display				: none;\
			}\
			#gfx-sbar-books A.gfx-thumb,\
			#gfx-sbar-books A.gfx-thumb IMG {\
				width				: auto;\
				height				: auto;\
			}\
			#gfx-sbar-brs .brs_col {\
				padding-left		: 10px !important;\
				padding-right		: 10px !important;\
			}\
			#gfx-sbar-brs .med EM {\
				display				: none;\
			}\
			#gfx-sbar-calc TD > IMG {\
				display				: none;\
			}\
			#gfx-sbar-images #iur {\
				display				: table;\
				padding				: 0px 10px 10px 10px;\
				text-align			: center;\
			}\
			#gfx-sbar-images #iur IMG {\
				display				: inline-block;\
				margin				: 3px;\
				margin-right		: 8px;\
				border				: 1px solid #888;\
			}\
			#gfx-sbar-images .bl {\
				display				: none;\
			}\
			#gfx-sbar-maps {\
				text-align			: left;\
			}\
			#gfx-sbar-maps > DIV {\
				text-align			: center;\
			}\
			#gfx-sbar-maps > .ts {\
				margin				: 5px 15px;\
			}\
			#gfx-sbar-maps .ts cite {\
				display				: block;\
			}\
			#gfx-sbar-movies {\
				display				: table;\
				padding				: 0;\
				min-width			: 100%;\
			}\
			#gfx-sbar-blogs > DIV,\
			#gfx-sbar-movies TABLE {\
				margin				: 10px;\
			}\
			#gfx-sbar-news TD[style*="padding-right: 10px"],\
			#gfx-sbar-news TD[style*="padding-top:5px;padding-right:10px;font-size:78%;"],\
			#gfx-sbar-news .ts > TD IMG {\
				display				: none;\
			}\
			#gfx-sbar-news div:not(:nth-of-type(1)) {\
				padding-top			: 5px;\
				border-top			: 1px dotted #aaa;\
			}\
			#gfx-sbar-news .s {\
				width				: auto !important;\
				padding				: 5px 10px !important;\
			}\
			#gfx-sbar-news .gl, #gfx-sbar-news .l {\
				display				: block;\
				float				: left;\
				margin				: 0;\
				visibility			: visible;\
			}\
			#gfx-sbar-news .tsw > div,\
			#gfx-sbar-news .tsw nobr .f {\
				display				: block;\
				float				: left;\
			}\
			#gfx-sbar-news .gl A {\
				display				: inline-block;\
			}\
			#gfx-sbar-trans {\
				padding-left		: 10px;\
			}\
			#gfx-sbar-trev {\
				background-color	: #ffc;\
				color				: #330 !important;\
				border-color		: #dda;\
			}\
			#gfx-sbar-trev TABLE TD {\
				display				: block;\
				padding-left		: 10px !important;\
			}\
			#gfx-sbar-twitter {\
				font-size			: 10px !important;\
			}\
			#gfx-sbar-video .ts {\
				margin-top			: 0;\
				margin-bottom		: 3px;\
			}\
			#gfx-sbar-video .ts TD {\
				width				: auto !important;\
			}\
			#gfx-sbar-video .ts .ts TD {\
				display				: block;\
			}\
			#gfx-sbar-video .ts .ts TD A {\
				margin-top			: 10px;\
			}\
			#gfx-sbar-wiki li:not(:nth-of-type(1)) {\
				padding-top			: 5px;\
				border-top			: 1px dotted #aaa;\
			}\
			#gfx-sbar-wiki h3 + li {\
				margin-top			: 5px;\
			}\
			#gfx-sbar-wiki > li {\
				padding-left		: 5px;\
				padding-right		: 5px;\
			}\
			#gfx-sbar-wiki .gl {\
				display				: none;\
			}\
			#gfx-sbar-wiki .s {\
				margin-right		: 10px;\
			}\
			#gfx-sbar-video LI, #gfx-sbar-wiki LI, #gfx-sbar-youtube LI {\
				list-style			: none;\
				margin-left			: 5px !important;\
			}\
			#gfx-sbar-youtube LI.g {\
				padding-left		: 10px !important;\
				background-color	: transparent !important;\
			}\
			#gfx-sbar-youtube LI.g .gl {\
				margin-right		: 10px !important;\
			}\
			#gfx-sbar-video .g, #gfx-sbar-youtube .g {\
				padding-left		: 0 !important;\
				padding-bottom		: 0 !important;\
			}\
			#gfx-sbar-youtube LI .r {\
				font-size			: 12px !important;\
			}\
			#gfx-sbar-youtube TABLE TABLE TD {\
				display				: block;\
			}\
			#gfx-sbar-youtube TABLE.ti TD {\
				display				: inline-block;\
			}\
			#gfx-sbar-video CITE,\
			#gfx-sbar-youtube CITE {\
				display				: none;\
				font-size			: 10px !important;\
			}\
			#gfx-sbar-wiki OL.mr\
			{\
				width				: 95%;\
				min-width			: 95%;\
				max-width			: 95%;\
			}\
		' : '') +
		'\
		#cnt,\
		#res,\
		#ires {\
			display				: block;\
			width				: 100%;\
			max-width			: 100%;\
		}\
		#center_col {\
			display				: block;\
			width				: auto;\
			min-width			: '+ (URI.query.tbs.tl?'100%':'auto')+' !important;\
			padding				: 0px;\
			border-left			: 0;\
		}\
		#res {\
			margin-left			: 8px !important;\
		}\
		' +
		(GFX.rCols == 1 ? '\
			#tbbc,\
			#res {\
				' + (GFX.bLeftNavAH ? '\
				width				: 57%;\
				min-width			: 57%;\
				max-width			: 57%;\
				' : '\
				width				: 48%;\
				min-width			: 48%;\
				max-width			: 48%;\
				')+'\
				padding-right		: 0px;\
			}\
			#res {\
				padding-top			: 5px;\
				padding-bottom		: 5px;\
			}\
			#res .g,\
			#mfr {\
				display				: block;\
				width				: 100%;\
				min-width			: 100%;\
				max-width			: 100%;\
			}\
			#gfx-sidebar {\
				width				: 37%;\
				max-width			: 37%;\
			}\
			#res li.g[style]{\
				margin-top			: -12px !important;\
				padding-top			: 13px !important;\
				border-top-width	: 0px !important;\
				' + (isGecko ? '\
				-moz-border-radius-topleft	: 0px !important;\
				-moz-border-radius-topright	: 0px !important;\
				' : '\
				border-top-left-radius		: 0px !important;\
				border-top-right-radius		: 0px !important;\
				')+'\
			}\
			#res li.g[style] > .gfx-thumb {\
				visibility			: hidden;\
			}\
			#gfx-sidebar {\
				position			: absolute;\
				display				: block;\
				right				: 10px;\
			}\
		' : '\
			#cnt {\
				min-width			: 800px;\
			}\
			#tbbc {\
				width				: 47%;\
			}\
			#res .g,\
			#mfr {\
				display				: inline-block;\
				width				: '+ Math.floor((95-GFX.rCols*2)/GFX.rCols) +'%;\
				max-width			: '+ Math.floor((95-GFX.rCols*2)/GFX.rCols) +'%;\
				clear				: both;\
				margin-right		: 1%;\
				min-height			: '+ parseInt(60*GFX.rCols) +'px;\
			}\
			#gfx-sidebar {\
				width				: '+ (GFX.rCols%2 ? '32' : '47') +'%;\
				max-width			: '+ (GFX.rCols%2 ? '32' : '47') +'%;\
				margin-right		: 3%;\
			}\
			#gfx-sidebar .g,\
			#gfx-sidebar #mfr {\
				display				: block;\
				width				: 90%;\
				max-width			: 90%;\
				clear				: none;\
			}\
		');
	}
	/**  Images 
	================================================================*/
	else if (canRun.images) {
		css += '\
		#cnt {\
			margin-top			: 0px;\
			padding-top			: 0px;\
		}\
		#rgsh_s {\
			right				: 0px;\
			width				: auto;\
			padding-right		: 10px;\
			padding-left		: 10px;\
			opacity				: 0.7;\
		}\
		.rshdr {\
			position			: relative;\
			margin-top			: 0px;\
		}\
		#center_col {\
			display				: block;\
			width				: auto;\
			margin-top			: 0px;\
			padding				: 0px;\
			padding-left		: 10px;\
			border-left			: 0;\
		}\
		.fl {\
			font-size			: 7pt !important;\
		}\
		#ImgContent {\
			padding-top			: 0;\
		}\
		#ImgContent TABLE {\
			max-width			: 100%;\
		}\
		#gfx-toolbar #exactsize {\
			display				: none;\
			vertical-align		: bottom;\
			margin-right		: 5px;\
		}\
		#gfx-toolbar #exactsize INPUT {\
			display				: inline-block;\
			margin				: 0 !important;\
			padding-right		: 4px;\
			text-align			: right;\
			font-size			: 8pt;\
			vertical-align		: bottom;\
		}\
		#itp_clipart, #gfx-toolbar .clipart {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAVVJREFUOE+lky1ywzAUhNsb+Ao+gmGoYaFhqWGgYKiPIBgqWChoKhgoGCpoKLh9+zyy5TSdybSa2bEyk/3ej9fvAN7+dQiwLuKoAHsNmOwqM3nVeHGqwYjOTqxSvAD467eTM5CWXTEB3cf0GiDfI+LYrbrJXczOJ7SvAFiZRiwBCAZxaBHiU4D84eGUthVAs+0RNkBE29cjyMLqU8+sbdMo8j7C36ALPwC46XJSyrJxp4ox68xsm6JZAVLwKaCY+aS5H0ZZWNTnek9wUksBp2oEvuPaXABsefg08LO0LpLAwc1ZsuHRPALYclqyvu94z1rNz0nnJcR9SbicV8gPANPFU5u3ZEq7hHf9IE8Lc7EKabpqBAJYnXOXqgTsMZbojpNC2A330XRmTyKzvba9mmrjaCzGs1UAjd1pUB0B8mEw24ynSkKySZbFhamkbRqLto+Jl7/qGyNCzab64EeIAAAAAElFTkSuQmCC") !important;\
		}\
		#itp_face, #gfx-toolbar .face {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAhNJREFUOE+lUztoakEQfekEUVOJtU1AsBAM2IhKJCCCEgs1/jAxNipoYyXWVlqLjY2NCAEFK8FW0EKwlRBUgkr8G+Kf895s4iUmVXgDe/fe3Zkz58zMPQPw57+MAA6HA3a7HdbrNd7f37Hf7/8dnxqdr1Yr5kP3FMOS02O73WKxWOD19RXD4RDtdhv5fB6JRAKpVAr1eh0vLy/o9/sYjUZ4e3sDxXAAm80G4/EYnU6HgSSTSchkMigUCkgkEphMJjQaDTw9PaHX62EymYBifgB0u11G8/b2FkajEel0GtFoFEKhENVqFc/PzwxgOp3+BJjNZowimcfjYSC5XI7JEIvFqNVqGAwGbJHcEwZUQNJF+siCwSB0Oh0ymQxjIJVK0Wq1QEmIPvlSDCeBqkrU5/M5AyiVSlCr1YjFYjAYDLi7u2PFJR/KfuwEB0At+aTE9c5isSAQCEAulyObzXLnVH3KftLGrx0vFousBlqtFpFIBE6nE1dXVwiHw2g2m9/H42MOlssl4vE4lEolLi8vcX19DZ/Px4JCoRAcDgdUKhW71+v1qFQqR6APgHK5jPPzc2g0GthsNni9Xvj9frYeHh5wf3/PmJjNZibp4uLiFODx8RECgYANjNVqZRldLhfcbjfbKdhut+Pm5oZJ4/F4pwCFQoH+KDYwxISWSCTi9q/vfD6f+X7ah4TvlfnFNwdwBPr1/hfOFs+ZS47SGQAAAABJRU5ErkJggg==") !important;\
		}\
		#itp_lineart, #gfx-toolbar .lineart {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAIpJREFUOE+lk4ENgCAMBHU7lmGfbsIqbFN9tAltMG2FBGNi7vh+8GTmY2tBQERca01tMONwPABn18vEBPeImFOdERYA7L1za01JUgLAkMwpwoKnqeQIK8CW/Jlgjinv4QS2aYmPDtwSV7DExjcrCZeI9m2SUsq4te5NFHglcQUWthIl2P6ZMMvffQEgdujFqhEOfQAAAABJRU5ErkJggg==") !important;\
		}\
		#itp_news, #gfx-toolbar .news {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALBwAACwcBtnMLwAAAAWlJREFUOE+t07+rglAUB/D+zLBRtCGiRXBqEQeJlkZ31yAwCIIIDBwqKCgKpEEKLPoxpEEN2fdxDth7YvEaunC496rnc8+9ai73jdbpdPBpvFyPksMwTEUURTifz3wtGdO8Xq/zYikoAcrlMsbjMaiXJAmVSgX9fp/nhmHg8XigWq0yrGnaL/IXGI1GnLBaraDrOo+pUU+JBBCkKEoW4CfftOv1iiAInhVQdc9tJBW4rot3cTgcsFwuGSCoVCr9X8H9fgetTAe53+8xm80YIKhYLGYBVVXRarVAfa1Ww+Vy4XESk8mEAYJkWX4NOI6DRqPBr+50OmG322G9XvOh0vYIIEgUxSwQxzFut9szebvdpiro9XoMECQIQhZIko/HIyjZ931eebFYYDqdot1uM0BQPp9PA5vNBp7nYT6fc4nD4RCDwQDdbhe2baPZbMKyLAYISgGmafKNT4OgFJB8EIVCgW98Gt/4kXM//alOvNy7whIAAAAASUVORK5CYII=") !important;\
		}\
		#itp_photo, #gfx-toolbar .photo {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAhdJREFUOE+Vk91LU3Ech09XEv0D1p2X4U0XXYR00UXQRawQWYGiIBKbG3upObemkx3U5nSrrdGL9mY4Vpt200xaaDrpZYTWjq4ljS504dQgCKdzue3T7zvidynbgQ/nwHme5xwOnEMAhEs2m0wQhKNslRzpoM0WEijQYLUq2Lmi478jlAL1FouyyC4Cs7MoFIsHjhhiySG3FLhgMqnyTPybz5c1YsnhgfMGgzpXKKBVfAOdMwK9a55P64pAMxSBenAOyoG3aO55DWLJ4YFzOp0my55uvhuFyy/ByTbki2Fg7Av6RhchPlqAdeQTOr0f0Hw9BGLJ4YGzarU2s78P8YkE9/g3uAIJ2H3LEB/H0DW8iI47C2h3vEO96gUuKoMglhweOKNQ6P/kcrB4JPSOxGH2Sui8/Rm3fBK8z2LQO9+jqSOMy/opyLWTIJYcHjjd1nbt994ejDe/4urgEjQ32Ks/jONlOInwdBIefxyt3RE0GWeg7PsIYsnhgVMtLYZf2SwLfEfXvR/oHVuFZyKFV9MpTM2soX80gSs9UXQ/SKLfnwKx5PDAycZG4+buLuzP1+EYT5fmnEjDHUjBen8FOscSxKer/B6x5PDACbnctL6zg+TWVlkjlhweOC6TWX5mMhgOBrGysXHgiCGWHB6orqsTN9mXXdveLmvEksMDh2tq2o/U1torGTk8wP7hKrZqtmNljtgqCvwDH/mmtqnHAtIAAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .t {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAmJJREFUOE+NkV1IU2EYgM8upTsvDC8KhAiSoKCgtcJhJGSaIY0QWYKB6MENmxxUrI3UC5MKM7GiAvUmC7M0y2wJlnlTiWllmkoXOs0ydaSzqdOn7zvw3ZYvPOzveV7GeywOn0+TY7FYToiXWPPD/+c70G5qp7xeRa74clMjmlzVaemlpYq8DZHvz71tEp12mtgzh7CXZVPxtBf9PtiugHREk6c6La24WKFHNjawuRtMYtIz2eVKIbkqnwd9U5x7CIevgnREo6tOSzUMRf7q+jqJRpPJ9syz2C44qfF34R8G3zNIvAbSEU2+6rRjHo/CFY5EOO5tJcXXxl6XQXlLI4NT8EIsuP4KkmpBOqJxqU5LcrsV7tDaGo5KPxmXuzhoeKnv6WZI3FsuKH0C9mqQjmjcqtOO6Lqi4PfqKlk1veTdecdR3yU6P48zNgsDAah4DgligXREU6A6LSEnR+EJrqyg3/1ASfMIJ6tq6Z+YY/QndH6Bmm5IvQnSEY1HdZotO1tROBcOYzSNUtU1hbOugeGZkHmDx4NigbhBZj1IRzSFqtMOOJ0KY3Z5GV9bgFvvg+iNLUwuYNL+Cco6IKsRpCMaQ3XavowMRdFMKESlf457X8OUPHpJIAjffsHrMWgZgIviUUpHNEWq03bY7doeh0NSPL20RHVPiNbJdereDLGwDAHxD+STGBfHbO4H6UhXNrI1Z5vVqu1MTj4fED/eeBuhU8gdI0H+rMG8WDIxDx+noalPLBSOdGWjJkq8idlqtZb/EBeeWFz8J9KRrmwEstWiBbuj4uIKt8THV24G6cpGtn8BEmFAehGqfjMAAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .s {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAe1JREFUOE+lk09Ik2EYwIuOadCxbp3ECnepQ4cO2aWDhIe6GJYIEevSHygsRfszbUtmbDTX5mqbfqvR1MKcW9uoLcKCIKU+c0hkuUq0tMIaJeSvZ6x26AWTfOHH+/K87/P7nu95eVcCK5Y1coLlUEje29S0RzgsHPoHRtmv/vPRgsASCDgkuKShxWJhReAIdbanJbrZBOW2PNvboMIJVV443gPeRzD8Hm7Eo6rAet3r/CSCWg1MUTDHoLEf7ElZx8H1EJ5L8ux38EXCA0oFF/w+17xEr6TGiI9C9AU8fg1xKat3WGaJPXsH2Z/gudMXUQRmf5db/zHJtsb9uJODjE7B2DSkZc7xZhYyUqLk47zVe1cRtHg7O5KTI6yt2squZiO26G36hnSeTszw8uM8bz9L+dl8j+3dIfnB/PUXbuGcp+NqYjzDqp0VbKg+yJajdeyob6bScpkal8axYBhbUkefWcB+Myhd+Utwut1+7ckH2FjjpPxEkMrzA9Q6BjnVnebSgyn8+jd6Mgvo0ihrQEsogpM2qy8n2PRbsPtsP/vaUhg9Q9SFXmGKTGO5nyUxAa1dvnuK4EBDg/ZFopm5uUX5KmfOuN0pRVBUUnKk2GC4WFxW1rIoBoO5qLS0XhHIi1wtrBPWL4E1iuB/X+Qv9zqdr12t9C0AAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .w {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAgVJREFUOE+l009I02Ecx/Gni5fo0kGoQ128dLEOXlyhaEXUsn+siGFKgcz5hxH9ghFzZkI2+mOrrJBAd2mFrVqSrWVU5qUStT+mqQS1raz8M5jbcm2+e5516uj2wIfneeB5Pd/nOXyXASKroS7IJmJ/Y2OZjCnDlIl9Nlu1fEFGQ1mx22o1pxYX0Z2DTeeh5CJsvQzFrVB0AXZeA2MHVLjg5EPoGgT3ACijrNBrWm0ilcJ8Cyx3wC4PXXoOJx5A86N/a6dMUw94hmHyF7wLgTLKim0WS308maS5u5/bAyH8o/D4o4ych4Pgk+t7Ena/hxcTMPIdvsyCMsqKzTU1lkgiQXHTYbY7anH6e3krK6iDE7La+E/S+8AcfJ6GYBhmo6CMsqKoquro3MICqw5tZF2dHp2tnFMeFx19z/B9mGTw6wyjU1ECEqZxTFb/A8ooKworK49Nx+Os3HWA3L1G1hiPsKFOo1BrYIv9DHscVyhv68Ts8mC9+4S2lyP0jIVRRllRYDQen4rFKDC1o6vvpERzo7d7OXj2Kab211i7xnD0hrj+JszNT7/xBlP45NfSRlqx3mCwfpuf/++CHQ33MbT4qXD2Y74xhOYex+4N0uKfobUvytVXSZRRVqwtLbX/kP8JRCJLijLKiuV5edUr8vNPZxJlVSPmyOTKrF5ilMnJqhNVF/8FkwZ8teJliLYAAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .xw {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAgJJREFUOE/F01tIU3EcwPETvvQcvbhlQdRTS00fCl8iyEG9CF3Ap1VCxtKysSDEWlgQSGu9VVAQ3aVWyS6alXke5oWYOeel5rSWTk1musApU/b/9v9Peg1iDx34cs6B8/n9D4fzXwdoOR1qQC7lhLNvf8ThOO7p6tLf9K7V9pf8PV26r3stZZTVKurra+QkWgZlYfAOQesIeOS9qv0LdEbXCk1BPAnfF5QAZbWDdntNOpPB2pyiwQvX3sLND+DwgfM9uOS1swOutEJzH4TlkP5JUEZZrby29mxqdZWqu9dpcD/E3feV/rh8cBpiciV17v0GQzMwIov9hMQiKKOstre62pZMpzFYythuLcd81YrL/5pHgQD+gQg9Y9MEY3OMzi4S+bFEfCHNr6UMyiir7bFY7InlZfIPn2RL5Wm2Hatjt62R/RddHGq6x4nbzzn3pA2HJ8ANPcTjgUk6JlIoo6xWUll5YW5lhdJT9yk785R9519y4JKfo006VbeCEke47J3CqSe5E0zzQH7gZ+OgjLLaVrO5MTo/L150Dwp377B49XFEtAQjwvMpKnyhcdEWjon24Qnx7vOU6IjMiM7RWaGPJYQyymrrjcaKjSZT3ebSYtufCkqKbJtUuwptxuKd2QxFJlu+qnBHNmWU1bS8vA1yLxhkBf+YIWtz2QfZX/m/D/gNna2GmDI4vhQAAAAASUVORK5CYII=") !important;\
		}\
		#gfx-toolbar .jpg {\
			background-image	: url("data:image/gif;base64,R0lGODlhEAAQAPIAAIaGhsDAwAQEBP///wAAAICAAP///wAAACH5BAEAAAYALAAAAAAQABAAAANEaGrS/muJQCsVUc3Be3DR1nGVQJxoqp5F674v2xWcWxcs3Q467+a+G88H3NmMsuDrloM5casoKhQYjT5UixYjeXgFgAQAOw==") !important;\
		}\
		#gfx-toolbar .png {\
			background-image	: url("data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///8bDxgAEAIQAAP///wAAAAAAACH5BAEAAAUALAAAAAAQABAAAANEWFrT/msNQSsdUc3Au3DR1nHVAJxoqp5E674vy7UBTdcyUc+7K9c6XQ8HCNqCwEDumCTCnr6VFBUSjEafqmWLkTy+mAQAOw==") !important;\
		}\
		#gfx-toolbar .gif {\
			background-image	: url("data:image/gif;base64,R0lGODlhEAAQAPIAAIaGhsDAwAQEBAAAAP///wCAAP///wAAACH5BAEAAAYALAAAAAAQABAAAANFaGrS/muJQCsVUU3Ce3DR1nGVMJxoqp5F674vW3BtN3csAeuzm/e1Gu0H5PEKMtpNd5TBnsiVFBUKjEafqmWLkTy+AkACADs=") !important;\
		}\
		#gfx-toolbar .bmp {\
			background-image	: url("data:image/gif;base64,R0lGODlhEAAQAPIAAMbDxgAA//7//gAAAP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAQABAAAAM9SDrcPioOQWsdIJJpbZNd+IxkYJ4oygSUKbjsG6xvXbE4Le+xSeM82WzQwwFPq5TSR2pCFqHOcxP1SJyNBAA7") !important;\
		}\
		#ic_color, #gfx-toolbar .color {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAuNJREFUOE+l021IU2EUB/CjrmUQQYGaxSqICHvBPlYUZfRC0LeEYVSY2AuWoYNENIvmzGbL3kAIc+R8aaGmiU6dmqOyhi+Zm123YhS4zMwxrqLp5u6/ox9mQtCHLhwenstzfs85z71PCAD6r2cOqCgj6n9O9DGfyJpAEf0HSenYEZbniJSXOOQrSxyybXkDFKfsoxMRAmnITjVkITPNb74IuE1xzuurDKMlZ/umXxo90luLX2p/5Z82NHlGE4v6nKuyDQLdivs7UE+HnFWKlpnPT0XYygHjNSBXBah4zCkDirsw88AmOtc+bbFT3aFFFZRXU7Ste4Vp2vNkAu5CwMqJjWpArwN0jwBNPXClk8cvmFZ/n7Att5rMZIkOtqC3UKrgjh+alYqBiXRgqACw64H2KqC6BSj9ABR+BTJEzOYGIOxzDxnJmhoEtFaq+zSp/eVGJry4gdlZTvY2A64uoMcJtI4hYPBh/CbwjYv7kDT5S0fWuiBw/jU5bIEiqROXYYcWQ3iGCVgRmHFDGpnCVC8wXAsId4F3aUDHhYCUQq8dQeBgB7maA7ekSqSikYE3DAwwMIyf+CECg+85kYEmBowM6E8GpCPU4QoC68zUljee7CvgCu5xC6UwoJmBLoyhh4FWBiqMwENuIS8FuHhg3LeBzG1BIKSCsnYOxorpDKQjBwWohB7dqGKgepzPsJ/PsJrPUAMkngZi1g+KoVSbFQRITQq5SS4cE0/5krkFFbegRg908EDHgMbGX5FbSNQCe4+LPtkSk0D0WLEApPFtqCTlsoYo937vVX8CapCMXlxi4BID5xhIeAHsyfH6wxUNbqIqJdH9hV95/jLFcKSFKWX6GEHRqRJ3jTb7jvpHpKMev7S7fdS3LrNTlMXqBZKrOHnLfMpCBUQynkdxbKWNSw/Tmc13SBNvofwMF2XnuyhBY6GtSXcofNNhXrOdYzWH7E8glF8s54jkWPOPmNtobm3oHPAb/jpFcwEx1ZEAAAAASUVORK5CYII=") !important;\
		}\
		#ic_gray, #gfx-toolbar .gray {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqVJREFUOE+lk0FIYlEUht9UuIhxVzPjQNtAhtmGrkREoxTKjYK4CtykQrgQFEKQXBRJWZQaiGDgogSrRaIYSiBIEZWSSfAU0qDQCGkRKHg650KPmWFgFiP8+O5973znP/ec+wkAuP/6EcDj8XDBYJBzuVycwWAYnZ2dNep0Op9Go4mo1WqST6VSGZVK5ejU1BSn1Wo5XHMs+QcgFApxi4uLSqfTGdva2rpMpVLPp6envUwm09vd3X1eWFi4RGhsenpa+VfAzs6OGiHpq6urztnZGcTjcVhdXYWlpSX2H4vFIBwOd/R6fRpB6t8cLC8vSw4PD4/r9fprtVqFXC4HuIZoNAroBgKBAKysrMD29jY9v87MzBwrFAqJUAKS7efn542Xlxd4eHiA29tbIBfpdBoSiQRzgw5hbW2NQebm5hoymcwuACKRyEGtVnt7enqCdrsNBGo2m1CpVKBYLMLJyQns7e3B5uYmeL1ewPN4k0qlBwJgY2OjigH9+/t75qDVajEIifbIzf7+PnOAhwx2u70vkUiqAgDr49FB/+7uDvAcWPbHx0cGIGA+n2eH6PP5YH5+HkwmU18sFvMCAG1l0WqXLFP9PM9Do9EAKgnBgK0EdAkOhwPMZjPI5fLu4OBgVgDYbDY39rpTKpWgXC4DdYICCUJAnAnWCavVCjgHMDIy0sHpdQuAycnJMRyiClrtEuTm5gaoHIJcX1/D0dERrK+vM/uUHYMrqDEBMDExwaELo9vtbuIM9AhC5ZCTi4sLSCaT4Pf7qfaeSCRqYrCR7o8A+LhMCDJaLJYK2u1ks1ly0y8UCn1sXxenrzM8PEyZWfCfgCHc+Ir6gdKMj4/7cd7zOLY8XiQe13nc99M71E/UN9TQrw4GcOMz6gvq+z9EiejbAQK8A3JYJjzj1i0eAAAAAElFTkSuQmCC") !important;\
		}\
		#gfx-toolbar .mono {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAkxJREFUOE+l029oEmEcwPFzyHzhvzeyxWCvBhMae+mfHKKb80xGKZW6TEoabApiLxSSISnbS33hqxgEvQuiIIiI8EXMUmkuma4Nl4huzJkgIS6ITpJ+/U644zSiFz3w4Y6Hu+9zd9zDAwDivwYdCAaDRCgUIsLhMBGJRMTRaFSFrqO7PB7vCYqjW2gMEYz+4kMBeSwW82QymWedTue41+tR6+vrP30+X3t+fn5fJBLRsYW/BeSJROJ+u90+7Xa7QFFUn8fj6cMIfezIZLLXTIR9gkAgIN7Y2PC2Wq36+fk54Oosp9MJDJfLBW63uyMUCp9iZJwN+P1+dTKZfI4BaDabA2w2G3DRMaVSWcKAmw14vV57rVY7wQGMSqUCxWIRtFotqNVqUCgUffS50WjsYOAhG1hZWVltNBpUtVqFcrkMu7sfIZV6D9vb70CluvSHxUVjDwOv2AC+21q9XqcOD0uQzeYgnf7AmpvTwTCDgaQDb9iA3W5fzucLJ7lcEXZ2CgP0ehMM02j03zDwmA1YLBbN1tajF4XCZ9jbKw0gSQtwmUxWmJqSH2PAwwbMZrPU4Vi+l83unR0c1IBrackOXDrd5e8CgeAtBibYAEmShF6vv+hw3HyQzX46Ozr6AgyL5TYwFhau/hAKxQW8+Qr9N7IBejNJpVJicnJyBr96YHMz/jKd3j/FSNdqvfPLYLB2p6dnv46OCvJ46TVm83EDfJwcRzN8Pl+Df9oNiUSyhgI4V0MpFEckmkUXEJ8bGMEJERpDE/9AL0RfO0IHfgMmGNenLralmAAAAABJRU5ErkJggg==") !important;\
		}\
		#gfx-toolbar .isz {\
			background-image	: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAc1JREFUOE+lk01IVGEYhW+72rU1WhUFVpt+F9WiMSOiknBQCzQimyCoKFGQCoUwylVRCJIurE2FFBMVRWF8YZREIEKDaP6AEjFjTRGOQzbO43demk0/42IuPHdxz3POdxf3LgKCgq7I5a+I41eS7mhLPDh4bjwINwz/hZ4rl5fr2OHVTZPUNH9ylY2j/yz+OSZPvno2UF4/5CSVnYm5A3WDLIQ8+erZgC8EJcf6hBbJ5kG5PPnq2UCo9m2wueq5YC6bZU8bVHRC+CZUd8HJe3D1JbwYxHJ58tWzgTX7ojn4mclw8dF7ogMZHn+AniHo7gc3DCNTWO59YR0bWLmrOwep2VnW14c5fesGfWNTxD6n+ZiYYyIJ32aw3PvCOjawovR+Dn6k0yyvOkJx5BShCy0cut7B2TtRWnve8HQkYbn3hXVsYF2ZC1btfiJIplJsOdFJScNdyi89I9L+jvMPxrjW+53bsV+Wy5Ovng1srOgP1u5/JZjxr/hlevq/KJcnXz0b2FQ54Ip3dgWrd3T0+ocshPdey1fPBrbVjLL98LhbWrR1sf8nijzL8uG9JfLV+/0dxAnVxv3HkXAb9j7M+18plydf2IBuhVBQWQfPA4v2PmoU9gfaAAAAAElFTkSuQmCC") !important;\
		}\
		#gfx-toolbar .imgcolor {\
			display				: inline-block;\
			vertical-align		: bottom;\
			padding-bottom		: 3px;\
			cursor				: pointer;\
		}\
		#gfx-toolbar .sc-block div{\
			float				: left;\
			font-size			: 2px;\
			margin				: 0;\
			cursor				: pointer;\
		}\
		#gfx-toolbar .sc-block div:hover{\
			background-color	: #000;\
		}\
		#gfx-toolbar .sc-block div span{\
			border				: 1px solid #555;\
			display				: block;\
			margin				: 3px;\
			height				: 16px;\
			width				: 16px;\
		}\
		#gfx-toolbar .sc-block div:hover span{\
			border-color		: #fff;\
		}\
		#gfx-toolbar .sc-icon{\
			background-color	: #fff;\
			float				: left;\
			font-size			: 1px;\
			margin				: 0 1px 0 5px;\
		}\
		#gfx-toolbar .sc-icon div{\
			background-color	: #c33;\
			float				: left;\
			height				: 6px;\
			margin				: 1px 0 0 1px;\
			width				: 6px;\
		}\
		#gfx-toolbar #sc-dropdown{\
			border				: 1px solid;\
			margin-top			: -8px;\
			margin-left			: 22px;\
			padding				: 3px;\
			position			: absolute;\
			visibility			: hidden;\
			width				: 145px;\
			z-index				: 1;\
		}\
		#gfx-toolbar .sc-show{\
			border				: 0;\
			height				: 15px;\
			width				: 15px;\
		}\
		#gfx-toolbar .sc-hide{\
			border				: 1px solid #00c;\
			height				: 13px;\
			width				: 13px;\
		}\
		#gfx-toolbar .sc-show div{\
			display				: block;\
		}\
		#gfx-toolbar .sc-hide div{\
			display				: none;\
		}\
		#gfx-toolbar .virtual-list-icon {\
			font-size			: 10px !important;\
			padding				: 1px 1px 1px 1px;\
			margin-left			: -3px !important;\
		}\
		.gfx-info {\
			text-align			: center;\
			margin-top			: 3px;\
			margin-bottom		: 10px !important;\
			margin-left			: -16px;\
			margin-right		: 1px;\
			padding				: 2px 3px;\
			font-size			: 8pt;\
			overflow-x			: hidden;\
		}\
		.gfx-info .icons {\
			position			: absolute;\
			display				: inline-block;\
			width				: 18px;\
			min-width			: 18px;\
			height				: 18px;\
			min-height			: 18px;\
			margin-top			: -33px;\
			margin-left			: 178px;\
			visibility			: hidden;\
		}\
		.gfx-info .icons A {\
			display				: block;\
		}\
		.gfx-info:hover .icons,\
		DIV.gfx-info:hover DIV.icons {\
			visibility			: visible;\
		}\
		.gfx-img {\
			padding-top			: 0px !important;\
		}\
		.gfx-img .num {\
			position			: absolute;\
			display				: inline-block;\
			margin				: 1px;\
			font-size			: 8pt;\
			color				: #ddd;\
			background-color	: #555;\
			border				: 1px solid #777;\
			padding				: 0px 3px;\
			opacity				: 0.8;\
			z-index				: 10;\
			visibility			: hidden;\
		}\
		.gfx-img .icons {\
			position			: relative;\
			display				: inline-block;\
			visibility			: hidden;\
			width				: 18px;\
			min-width			: 18px;\
			height				: 18px;\
			min-height			: 18px;\
			margin-left			: 0px;\
			margin-bottom		: 36px;\
			padding-left		: 3px;\
		}\
		.gfx-img .icons A,\
		.gfx-img .zoom {\
			display				: block;\
			width				: 16px;\
			height				: 16px;\
			background-repeat	: no-repeat;\
			background-position	: center center;\
		}\
		.gfx-img .zoom {\
			position			: relative;\
			display				: inline-block;\
			width				: 32px;\
			height				: 32px;\
			margin-left			: -37px;\
			margin-bottom		: -1px;\
			visibility			: hidden;\
			border				: 1px solid #000;\
			background-color	: #555;\
			opacity				: 0.8;\
			background-image	: url("data:image/gif;base64,R0lGODlhEgASAKIAALm5upCQkRcXGG9vcE5OUN3e3v7+/v///yH5BAAAAAAALAAAAAASABIAAANfeLrcziU+ZeopgegBqFlWoQEFMBDdYakXMRRgBq8fQMCM4T7n12Q+xukBZC1kRpUryCoIBsyAIOWQciLWD3MBEHi9BK3DYgAEpFPVNqkYPCcURleAg7N0b/bE3FnbGQkAOw==") !important;\
		}\
		' + ((URI.query.tbs.iszw && URI.query.tbs.iszw < 32) || (URI.query.tbs.isz && URI.query.tbs.isz == 'i') ? '\
			.gfx-img .zoom {\
				width				: 16px;\
				height				: 16px;\
				margin-left			: 3px;\
			}\
			.gfx-thumb {\
				margin-left			: 28px;\
			}\
		' : '') + '\
		.gfx-img .zoom:hover,\
		TD.gfx-img A.zoom:hover {\
			border-color		: #ccc;\
			opacity				: 0.95;\
		}\
		.gfx-img:hover .icons,\
		TD.gfx-img:hover DIV.icons,\
		.gfx-img:hover .num,\
		TD.gfx-img:hover SPAN.num,\
		.gfx-img:hover .zoom,\
		TD.gfx-img:hover A.zoom {\
			visibility			: visible;\
		}\
		.gfx-img .icons A {\
			position			: relative;\
			display				: block;\
			margin				: 0px !important;\
		}\
		.gfx-thumb {\
			display				: inline-block;\
			border				: 1px solid #99a;\
			min-width			: 16px;\
			min-height			: 16px;\
		}\
		.gfx-thumb, .gfx-thumb > IMG {\
			width				: auto !important;\
			height				: auto !important;\
		}\
		A.gfx-thumb IMG {\
			margin				: 1px;\
			padding				: 0;\
			border				: 0;\
		}\
		.gfx-thumb IMG {\
			border				: 0 !important;\
			margin				: 1px;\
		}\
		A.gfx-thumb:hover {\
			text-decoration		: none;\
		}\
		A.gfx-thumb:visited IMG {\
			opacity				: 0.6;\
		}\
		A.gfx-thumb:visited:hover IMG {\
			opacity				: 0.9;\
		}\
		#gfx-iprev {\
			display				: none;\
			position			: fixed;\
			z-index				: 9090;\
			padding				: 5px 10px 10px 5px;\
			border				: 1px solid #666;\
			'+ DB.css.op.b5 +'\
		}\
		#gfx-iprev .high, #gfx-iprev .low {\
			position			: absolute;\
			top					: 0;\
			left				: 0;\
			margin-top			: 6px;\
			margin-left			: 6px;\
			border				: 1px solid #eee;\
		}\
		#gfx-iprev .low {\
			opacity				: 0.8;\
			background-color	: #fff;\
		}\
		#gfx-iprev .high {\
			z-index				: 1;\
		}\
		#gfx-iprev .loading {\
			position			: absolute;\
			display				: block;\
			border				: 1px solid #ddd;\
			margin-left			: 1px;\
			opacity				: 0.5;\
			z-index				: 2;\
		}\
		#gfx-iprev .error {\
			position			: absolute;\
			display				: block;\
			border				: 2px solid white;\
			font-family			: tahoma,verdana,arial,sans-serif;\
			font-size			: 40pt;\
			font-weight			: bold;\
			color				: #900;\
			background-color	: #111;\
			text-align			: center;\
			background-repeat	: no-repeat;\
			background-position	: center center;\
			background-image	: url("data:image/png;base64,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") !important;\
			opacity				: 0.8;\
			z-index				: 2;\
		}\
		#gfx-iprev .ratio {\
			position			: absolute;\
			top					: 0;\
			left				: 0;\
			display				: block;\
			margin				: 7px;\
			padding				: 0 5px;\
			font-size			: 24pt;\
			color				: #FFF;\
			background-color	: #333;\
			border				: 1px solid #ddd;\
			border-top			: 0px;\
			border-left			: 0px;\
			opacity				: 0.6;\
			z-index				: 2;\
		}\
		.loading {\
			background-repeat	: no-repeat;\
			background-position : center center;\
			background-image	: url("data:image/gif;base64,R0lGODlhJQAlAJECAL3L2AYrTv///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAJQAlAAACi5SPqcvtDyGYIFpF690i8xUw3qJBwUlSadmcLqYmGQu6KDIeM13beGzYWWy3DlB4IYaMk+Dso2RWkFCfLPcRvFbZxFLUDTt21BW56TyjRep1e20+i+eYMR145W2eefj+6VFmgTQi+ECVY8iGxcg35phGo/iDFwlTyXWphwlm1imGRdcnuqhHeop6UAAAIfkEBQoAAgAsEAACAAQACwAAAgWMj6nLXAAh+QQFCgACACwVAAUACgALAAACFZQvgRi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwXABEADAADAAACBYyPqcsFACH5BAUKAAIALBUAFQAKAAsAAAITlGKZwWoMHYxqtmplxlNT7ixGAQAh+QQFCgACACwQABgABAALAAACBYyPqctcACH5BAUKAAIALAUAFQAKAAsAAAIVlC+BGL3Z3IlxUmUuhtR2LzHhsiEFACH5BAUKAAIALAEAEQAMAAMAAAIFjI+pywUAIfkEBQoAAgAsBQAFAAoACwAAAhOUYJnAagwdjGq2amXGU1PuLEYBACH5BAUKAAIALBAAAgAEAAsAAAIFhI+py1wAIfkEBQoAAgAsFQAFAAoACwAAAhWUL4AIvdnciXFSZS6G1HYvMeGyIQUAIfkEBQoAAgAsFwARAAwAAwAAAgWEj6nLBQAh+QQFCgACACwVABUACgALAAACE5RgmcBqDB2MarZqZcZTU+4sRgEAIfkEBQoAAgAsEAAYAAQACwAAAgWEj6nLXAAh+QQFCgACACwFABUACgALAAACFZQvgAi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwBABEADAADAAACBYSPqcsFADs=") !important;}\
		' + (isOpera ? '\
			#gfx-toolbar .safe {\
				margin-top			: 5px;\
			}\
		' :	'\
		') +
		(GFX.bMnuFix ? '\
			.tsf-p TABLE, .lst-td {\
				border				: 0 !important;\
			}\
			#tsf .tsf-p {\
				padding-bottom		: '+(isOpera?'5':'5')+'px !important;\
			}\
		' : '') +
		(GFX.bToolbar ? '\
			#gfx-head-content #logo {\
				margin-top			: 10px !important;\
				max-height			: 48px;\
			}\
			#gfx-toolbar .sizes INPUT[type="checkbox"] {\
			' + (isOpera ? '\
				' : '\
				display				: none;\
			') + '\
			}\
			#gfx-toolbar SELECT {\
				display				: inline-block;\
				font-size			: 8pt;\
				margin-left			: 10px !important;\
				margin-top			: 5px !important;\
				margin-bottom		: 0 !important;\
			}\
		' : '');
	}
	/** Blogs
	================================================================*/
	else if(canRun.blogsearch)
	{
		css += '\
		INPUT#btnW, TD.tpb {\
			display				: none;\
		}\
		#sft TABLE TD + TD {\
			width				: auto;\
		}\
		#ddcal1_pop, #ddcal2_pop {\
			z-index				: 100;\
		}\
		.g, TABLE.j {\
			display				: block;\
			min-width			: ' + parseInt(DB.titleSz*50) + 'px;\
			white-space			: nowrap;\
			vertical-align		: top;\
		}\
		.g DIV.cont {\
			padding-left		: 5pt !important;\
			vertical-align		: top;\
			display				: inline-block;\
			clear				: left;\
		}\
		.g A.gfx-thumb {\
			margin-top			: 5px;\
		}\
		.g .gfx-title {\
			display				: inline-block;\
		}\
		.g SPAN.cnt {\
			display				: inline-block;\
			float				: left;\
			margin-right		: 5px;\
			font-size			: 10pt;\
			font-weight			: bold;\
		}\
		.g .std {\
			position			: absolute;\
			float				: right;\
		}\
		.g A.f1 {\
			display				: block;\
		}\
		' + (GFX.bMnuFix ? '\
			#f .btb,\
			#f .bts	{\
				display				: none;\
			}\
			'
			+ (isOpera ? '\
				#sft {\
					margin-top			: 0 !important;\
				}' : '\
				#sft {\
					margin-top			: 10px !important;\
				}\
				') + '\
		' : '') + '\
		' + (GFX.rThShots ? '\
			.g {\
				min-height			: ' + (parseInt(90*GFX.rThSize) + 8) + 'px;\
				max-width			: ' + (parseInt(DB.titleSz*50) + parseInt(120*GFX.rThSize)) + 'px;\
			}\
			.g .cnt {\
				display				: inline-block;\
				position			: relative;\
				float				: left;\
				margin-right		: 5px;\
			}'
			+ (GFX.rThLft ? '\
				A.gfx-thumb {\
					float			: left;\
					margin-right	: 5px;\
				}\
			' : '\
				A.gfx-thumb {\
					float			: right;\
					margin-left		: 5px;\
				}\
			') + '\
		' : '') +'\
		' + (GFX.mzBrd ? '\
				.g {\
					' + CSS.mzborder + '\
				}\
		' : '');
	}
	/** Books
	================================================================*/
	else if(canRun.books) {
		css += '\
		.rsi TR {\
			display				: block;\
			width				: ' + parseInt(DB.titleSz*35) + 'pt;\
		}\
		TD.j {\
			padding				: 2pt;\
		}\
		#sft TD + TD + TD {\
			width				: 100%;\
		}\
		' + (GFX.mzBrd ? '\
			.rsi TR {\
				' + CSS.mzborder + '\
			}\
		' : '') +'\
		' + (GFX.bMnuFix ? '\
			#sft {\
				margin-top			: 10px !important;\
			}\
		' : '');
	}
	/** Google Chrome
	================================================================*/
	else if(canRun.chrome)
	{
		css += (GFX.bMnuFix ? '\
			BODY {\
				margin-top			: 0;\
			}\
			#gfx-header{\
				position			: relative;\
				display				: inline-block;\
				min-height			: 30px;\
				padding-top			: 24px;\
			}\
			#container {\
				width				: 70%;\
			}\
		' : '');
	}
	/** Finance
	================================================================*/
	else if(canRun.finance)
	{
		css += '\
		BODY {\
			margin-top			: 20px !important;\
		}\
		#gbar {\
			margin-top			: -4px !important;\
		}\
		#guser {\
			margin-top			: -24px !important;\
		}\
		';
	}
	/* Groups
	================================================================*/
	else if(canRun.groups)
	{
		css += '\
		#rhsc TR + TR {\
			display				: none;\
		}\
		#logo {\
			float				: left;\
		}\
		#sft {\
			margin-top			: 1px !important;\
		}\
		#sft .tb{\
			margin-top			: 10px !important;\
		}\
		#res > BR {\
			line-height			: 3px;\
		}\
		.g,\
		#gdr {\
			display				: block;\
			max-width			: ' + parseInt(DB.titleSz*50) + 'px;\
		}\
		.g TABLE {\
			min-width			: 100%;\
		}\
		.g SPAN.cnt {\
			display				: inline-block;\
			float				: left;\
			margin-right		: 5px;\
			font-size			: 10pt;\
			font-weight			: bold;\
		}\
		.g .a {\
			display				: block;\
		}\
		.g .f {\
			font-size			: 10px !important;\
		}\
		.g .f A {\
			font-size			: 10px !important;\
		}\
		#guser B {\
			font-size			: 10pt;\
		}\
		' + (GFX.mzBrd ? '\
			.g,\
			#gdr {\
				' + CSS.mzborder + '\
			}\
		' : '')
		+ ((GFX.bMnuFix && hasSomeQuery) ? '\
			#myg_popup {\
				z-index				: 1005 !important;\
			}\
			TABLE.ft {\
				display				: none;\
			}\
			#logo {\
				margin-top			: 15px;\
			}\
			#rhsc {\
				position			: fixed;\
				right				: 10px;\
				top					: 40px;\
				z-index				: 1005;\
			}\
			' + (isOpera ? '\
				#sft {\
					margin-top			: 0 !important;\
				}\
			' : '') + '\
		' : '\
			BODY {\
				margin-top			: 30px !important;\
			}\
		');
	}
	/** iGoogle
	================================================================*/
	else if(canRun.ig)
	{
		css += '\
		BODY {\
			width				: 100%; !important;\
		}\
		';
	}
	/** Maps
	================================================================*/
	else if(canRun.maps || canRun.local)
	{
		css += (GFX.bMnuFix ? '\
			#loadmessagehtml {\
				position			: absolute;\
				margin-top			: 25px;\
			}\
			#gbi A {\
				display				: inline-block !important;\
			}\
			#search {\
				margin-top			: 0px !important;\
			}\
			.cntrltable TD[width="100%"],\
			.q_d_container,\
			q-outer, .q-inner {\
				background-color	: transparent !important;\
				border				: 0px !important;\
			}\
			' : '');
	}
	/** News
	================================================================*/
	else if(canRun.news) {
		css += '\
		#homepage-link {\
			position			: absolute;\
			right				: 3px;\
			margin-top			: -15px;\
		}\
		.gaiaNav {\
			position			: absolute;\
			top					: 1;\
			right				: 0;\
			padding				: 0 !important;\
		}\
		#page-header {\
			padding				: 0 !important;\
			margin				: 0 !important;\
		}\
		#page-header .search-form {\
			padding				: 0 !important;\
			margin				: 0 !important;\
		}\
		#page-header .vspace {\
			display				: none;\
		}\
		.search-in-header * {\
			width				: auto;\
		}\
		.story .body A:link,\
		.story .body A:visited\
		{\
			text-decoration		: underline !important;\
		}\
		'
		+ (hasSomeQuery ? '\
		.tile {\
			border				: 0px !important;\
		}\
		.rightnav TABLE { max-width : 80% }\
		.story {\
			padding-left		: 7px !important;\
		}\
		.story SPAN.cnt {\
			display				: inline-block;\
			float				: left;\
			margin-right		: 5px;\
			font-size			: 10pt;\
			font-weight			: bold;\
		}\
		.story .body {\
			width				: auto;\
		}\
		.story .snippet {\
			display				: block;\
		}\
		.story .hover,\
		.story .count-bar {\
			background-color	: transparent !important;\
		}\
		.quote-story .info {\
			margin-bottom		: 15px;\
		}\
		.quotesnippet {\
			margin-top			: 5px;\
		}\
		TD.j {\
			padding				: 2pt;\
		}\
		'
		+ (GFX.mzBrd ? '\
			.story {\
				' + CSS.mzborder + '\
			}\
			' : '')
		+ (GFX.rThShots ? '\
			.story {\
				padding-left		: 7px !important;\
				min-height			: ' + DB.css.thumbs.maxHeight + ';\
			}\
			A.gfx-thumb {\
				min-height			: 100%;\
			}\
			' + (GFX.rThLft ? '\
					.gfx-thumb {\
						float			: left;\
						margin-right	: 7px;\
					}\
					.thumbnail  {\
						float			: right;\
					}\
				' : '\
					.story {\
						max-width			: 90%;\
						width				: 90%;\
					}\
					.gfx-thumb {\
						float			: right;\
						margin-left		: 5px;\
					}\
					.thumbnail  {\
						float			: left;\
					}\
				') + '\
			' : '\
		') : '\
			#main-wrapper\
			{\
				margin-top			: 23px;\
			}\
		');
	}
	/** Picasa Web
	================================================================*/
	else if(canRun.picasaweb)
	{
		var isLH = (URI.path[0] == 'lh');
		var isAlbum = !isLH && $defined(URI.path[1]);
		
		css += (isAlbum ? '\
			.gphoto-topnav {\
				margin-top			: 24px;\
			}\
			#guser A.lhcl_newfeatures, .lhcl_browserwarning {\
				display				: none;\
			}\
			.goog-icon-list-tooltip {\
				border				: 1px solid #888;\
				overflow			: hidden;\
				margin-top			: -35px;\
				max-height			: 45px;\
			}\
			.goog-icon-list-icon-img-div A {\
				display				: inline-block;\
			}\
			.goog-icon-list-icon-img-div A IMG {\
				border				: 0;\
			}\
			.goog-icon-list-icon-img-div A:hover IMG {\
			}\
			.goog-icon-list-icon-img-div A:visited IMG {\
				opacity				: 0.7;\
			}\
			.goog-icon-list-icon-img-div A:visited:hover IMG {\
				opacity				: 0.8 !important;\
			}\
			.goog-icon-list-searchicon-meta-by A {\
				font-weight			: bold;\
			}\
			#gbar {\
				margin-top			: -3px;\
			}\
			#guser {\
				margin-top			: -23px !important;\
			}\
		' : '') +'\
		.lhcl_browserwarning\
		{\
			display				: none;\
		}\
		.goog-icon-list-tooltip\
		{\
			background-image	: none;\
		}\
		#lhid_pager\
		{\
			background			: transparent;\
		}\
		.SPRITE_shadow\
		{\
			padding				: 3px 1px 1px 4px;\
			border				: 1px solid #000;\
			'+ DB.css.op.b4 +'\
		}\
		.SPRITE_shadow:hover\
		{\
			border-color		: #eee;\
			'+ DB.css.op.w5 +'\
		}\
		.SPRITE_shadow IMG\
		{\
			border				: 1px solid #ddd;\
		}\
		#gfx-iprev {\
			display				: none;\
			position			: fixed;\
			z-index				: 9090;\
			padding				: 5px 10px 10px 5px;\
			border				: 1px solid #555;\
			'+ DB.css.op.b5 +'\
		}\
		#gfx-iprev IMG {\
			margin-top			: 5px;\
			margin-left			: 5px;\
			border				: 1px solid #fff;\
		}\
		#gfx-iprev .error {\
			display				: block;\
			border				: 2px solid white;\
			font-size			: 24pt;\
			font-weight			: bold;\
			color				: #fff;\
			background-color	: #d66;\
			text-align			: center;\
			opacity				: 0.7;\
			z-index				: 2;\
		}\
		';
	}
	/** Products
	================================================================*/
	else if(canRun.products)
	{
		css += '\
		INPUT[name="btnmeta=search=search"] {\
			display				: none;\
		}\
		'
		+ (GFX.mzBrd ? '\
			.result,\
			#refinements {\
				' + CSS.mzborder + '\
			}\
		' : '')
		+ (GFX.bMnuFix ? '\
		#ps-vertical-ads {\
			display				: none !important;\
		}\
		'
			+ (isOpera ? '\
			#sft {\
				margin-top			: 0 !important;\
			}' : '') + '\
		' : '');
	}
	/** Scholar
	================================================================*/
	else if(canRun.scholar)
	{
		css += '\
		.g {\
			'+ CSS.resbox +'\
			display				: block;\
			min-width			: 63%;\
			max-width			: 63%;\
			padding-right		: '+(isOpera?6:20)+'px;\
		}\
		.g A.w {\
			min-width			: 100%;\
			display				: block;\
			margin-right		: 20px;\
		}\
		.g > FONT {\
			min-width			: 100%;\
		}\
		'
		+ (GFX.mzBrd ? '\
			.g {\
				' + CSS.mzborder + '\
			}\
		' : '')
		+ (GFX.bMnuFix ? '\
			#gfx-header .gbar {\
				position			: relative;\
			}\
			#sft {\
				margin-top			: 22px !important;\
			}\
		' : '');
	}
	/** Translate
	================================================================*/
	else if(canRun.translate)
	{
		css += '\
		#source {\
			height				: 200px !important;\
		}\
		BODY {\
			margin-top			: 30px !important;\
		}\
		TABLE + BR + H1,\
		#content\
		{\
			margin-top			: -15px;\
		}\
		.swap {\
			padding-top			: 3px;\
			padding-bottom		: 3px;\
		}\
		';
	}
	/** Videos
	================================================================*/
	else if(canRun.video)
	{
		css += '\
		TABLE#resultsheadertable {'
			+ CSS.mzborder + '\
		}\
		BODY {\
			margin-top			: 25px !important;\
		}\
		#gbar {\
			position			: absolute;\
		}\
		#gbi A.gb2, #gbi B.gb2 {\
			display				: inline-block !important;\
		}\
		#guser {\
			font-size			: 13px !important;\
			font-weight			: bold;\
		}\
		#gfx-header{\
			position			: relative;\
			min-height			: 75px !important;\
			margin-bottom		: -2px !important;\
		}\
		#videoheader {\
			background-color	: transparent;\
		}\
		#upload-control {\
			margin-top			: 15px;\
		}\
		.table-header DIV A,\
		.site-filter {\
			font-size			: 10pt;\
		}\
		.search-options * {\
			font-size			: 7pt !important;\
		}\
		.header-search {\
			margin-top			: 25px;\
		}\
		#search-web-button {\
			display				: none;\
		}\
		#search-results-toolbelt *\
		{\
			text-decoration		: none !important;\
		}\
		.search-box * {\
			width				: auto;\
		}\
		' + (GFX.bSrchs ? '\
			#videoheader {\
				margin-bottom		: 0 !important;\
			}\
		' : '');
	}
	/** Firefox Start
	================================================================*/
	else if(canRun.firefox)
	{
		css += '\
			#frame DIV,\
			#frame TD[style="overflow:hidden"] DIV,\
			#frame TD[width="100%"][valign="bottom"] DIV,\
			#frame TD[bgcolor="#b0b0b0"],\
			#frame TD[bgcolor="#ababab"]\
			{\
				background-image: url("data:image/png;base64,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") !important;\
			}\
			#frame TD[style="overflow: hidden;"] DIV\
			{\
				background-position	: -190px 0px !important;\
			}\
			#frame TD[width="100%"][valign="bottom"] DIV\
			{\
				background-color	: transparent !important;\
				background-position	: -20px -148px !important;\
				min-height			: 4px !important;\
			}\
			#frame DIV[title="Google"]\
			{\
				background-position	: -5px -95px !important;\
				min-height			: 24px !important;\
			}\
			#frame TD[bgcolor="#b0b0b0"],\
			#frame TD[bgcolor="#ababab"]\
			{\
				min-width			: 4px !important;\
				background-color	: transparent !important;\
			}\
			#frame TD[bgcolor="#ababab"]\
			{\
				background-position	: -565px -30px !important;\
			}\
			#frame TD[bgcolor="#b0b0b0"]\
			{\
				background-position	: -575px -30px !important;\
			}\
		';
	}

	
	
	/* Opacity Backgrounds */
	css += '\
		#gfx-gui-dragger:hover\
		{'+DB.css.op.b2+'}\
		#gfx-BgBox\
		{'+DB.css.op.b4+'}\
		.story .count-bar,\
		.story .hover,\
		#gfx-themes-bar div\
		{'+ DB.css.op.w3 +'}\
		#gfx-nav,\
		#gfx-alertbox-Box\
		{'+ DB.css.op.w7 +'}\
	';
	

	addStyle(css);
	
	delete css;

}; /* END GFX_Styles function */


// ==============================================================================================================
//                                          C S S   C O L O R   T H E M E
// ==============================================================================================================
var GFX_ColorTheme = function(){

	if(!GFX.bStyles) return;

	var css = '\
	/**** Change Colors by Colors ****/\
	FONT[color="#000000"]\
	{\
		color				: '+ (DB.css.body.color||'black') +';\
	}\
	FONT[color="#999999"],\
	FONT[color="#666666"]\
	{\
		color				: '+ (DB.css.url.color||'#666') +';\
	}\
	[bgcolor="#3366cc"]\
	{\
		background-color	: '+ (DB.css.menus.borderColor||'#36c') +';\
	}\
	[bgcolor="#d5ddf3"],\
	[bgcolor="#e5ecf9"],\
	[bgcolor="#ebeff9"]\
	{\
		background-color	: '+ (DB.css.menus.backgroundColor||'#e5ecf9') +';\
		border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
	}\
	TR[bgcolor="#e5ecf9"] TD,\
	TR[bgcolor="#ebeff9"] TD\
	{\
		border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
	}\
	[bgcolor="#d5ddf3"] *,\
	[bgcolor="#e5ecf9"] *,\
	[bgcolor="#ebeff9"] *\
	{\
		color				: '+ (DB.css.menus.color||'#000') +';\
	}\
	#gfx-gui,\
	.moor-box,\
	[bgcolor="#e8eef7"],\
	[bgcolor="#c6d8ff"]\
	{\
		background-color	: '+ (DB.css.header.backgroundColor||'#d5ddf3') +';\
		border-color		: '+ (DB.css.header.borderColor||'#36c') +';\
	}\
	#gfx-gui,\
	.moor-box,\
	[bgcolor="#e8eef7"] *,\
	[bgcolor="#c6d8ff"] *\
	{\
		color				: '+ (DB.css.header.color||'#000') +';\
	}\
	[bgcolor="#f7f7ff"],\
	[bgcolor="#f3f6fb"],\
	[bgcolor="#cbdced"],\
	[bgcolor="#bbcced"],\
	TD[bgcolor="#ffffff"],\
	TR[bgcolor="#ffffff"],\
	TABLE[bgcolor="#ffffff"]\
	{\
		background-color	: '+ (DB.css.resbox.backgroundColor||'#cbdced') +';\
		border-color		: '+ (DB.css.resbox.borderColor||'#36c') +';\
	}\
	[bgcolor="#f7f7ff"] *,\
	[bgcolor="#f3f6fb"] *,\
	[bgcolor="#cbdced"] *,\
	[bgcolor="#bbcced"] *,\
	TD[bgcolor="#ffffff"] *,\
	TR[bgcolor="#ffffff"] *,\
	TABLE[bgcolor="#ffffff"] *\
	{\
		color				: '+ (DB.css.resbox.color||'#000') +';\
	}\
	FONT[color="#6f6f6f"]\
	{\
		color				: '+ (DB.css.url.color||'#6f6f6f') +';\
	}\
	FONT[color="#555555"]\
	{\
		color				: '+ (DB.css.notes.color||'#555555') +';\
	}\
	FONT[color="#008000"],\
	FONT[color="#cc0000"]\
	{\
		color				: '+ (DB.css.highlights.borderColor||'#cc0000') +';\
	}\
	/*** Main Background ***/\
	#sbl,\
	.fade,\
	HTML {\
		background-color	: '+ (DB.css.body.backgroundColor||'white') +';\
	}\
	/*** Body ***/\
	BODY {\
		'+ CSS.body +'\
	}\
	#lga *,\
	#body #logo > DIV\
	{\
		color				: '+ (DB.css.body.color||'#000') +';\
	}\
	P {\
		color				: '+ (DB.css.body.color||'#444') +';\
	}\
	/*** Links ***/\
	A:link, SPAN.i, .linkon, #codesiteContent A, TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN, TABLE TBODY TR TD TABLE TBODY TR TD A, .lk, BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table TH.sortable, SPAN.linkbtn, DIV#ss-status A.gb3, SPAN#rptgl SPAN, A SPAN.b, .mmttl SPAN, A > SPAN.navlink, SPAN > SPAN.link, DIV#rptgl > SPAN, DIV#tbt-expander DIV, #guser SPAN > SPAN, DIV#ss-bar > DIV#ss-box > A, DIV#rpsp.rpop DIV.tl B {\
		color				:'+ (DB.css.titles.color||'blue') +';\
	}\
	.g A:hover {\
		color				:'+ (DB.css.titles.colorHover||'#99F') +';\
		text-shadow			: 0 0 6px '+ (DB.css.header.colorHover||'#000') +';\
	}\
	.g A:visited {\
		color				:'+ (DB.css.titles.colorVisited||'violet') +';\
	}\
	.g A:visited:hover {\
		text-shadow			: none;\
	}\
	/*** Google Menu Bar ***/\
	#leftnav,\
	#gfx-head-content {\
		'+ CSS.header +'\
	}\
	#gfx-head-content {\
		border-top-width	: 0px;\
		border-left-width	: 0px;\
		border-right-width	: 0px;\
	}\
	#gfx-head-content A:link,\
	#gfx-head-content A:visited,\
	FORM A:link,\
	FORM A:visited\
	{\
		color				: '+ (DB.css.header.color||'#444') +';\
	}\
	#gfx-head-content A:hover\
	{\
		color				: '+ (DB.css.header.colorHover||'#000') +';\
	}\
	#gfx-head-content A.on\
	{\
		color				: '+ (DB.css.menus.colorHover||'#000') +';\
	}\
	#clirlanglist,\
	#gb,\
	#gbar,\
	#gbar_bg,\
	#gbg,\
	#gbi,\
	#gfx-searchers-mnu,\
	#gprefs,\
	#guser,\
	#myg_popup\
	{\
		'+ CSS.menus +'\
	}\
	#gbi,\
	#gfx-searchers-mnu,\
	#gfx-iprev\
	{\
		'+ (DB.css.header.boxShadow?'box-shadow:'+DB.css.header.boxShadow+';':'') + '\
		'+ (DB.css.header.MozBoxShadow?'-moz-box-shadow:'+DB.css.header.MozBoxShadow+';':'') + '\
		'+ (DB.css.header.WebkitBoxShadow?'-webkit-box-shadow:'+DB.css.header.WebkitBoxShadow+';':'') + '\
	}\
	#gbar_bg {\
		border-top-width	: 0px;\
		border-left-width	: 0px;\
		border-right-width	: 0px;\
	}\
	#gbar, #guser, #gb {\
		background-color	: transparent;\
		border				: none;\
	}\
	#gbar A[href], #gbi A[href], #guser A[href], .login,\
	A.gb1, A.gb2, A.gb3, A.gb4,\
	#gb A, B.gb1,\
	#myg_popup A[href],\
	#gfx-searchers-mnu A,\
	#gbar A:visited, #gbi A:visited, #guser A:visited, .login:visited,\
	A.gb1:visited, A.gb2:visited, A.gb3:visited, A.gb4:visited,\
	#gb A:visited,\
	#myg_popup A:visited,\
	#gfx-searchers-mnu A:visited\
	{\
		color				: inherit;\
	}\
	#gbar A:hover, #gbi A:hover, #guser A:hover, #gbg A[href]:hover, .login:hover,\
	A.gb1:hover, A.gb2:hover, A.gb3:hover, A.gb3.hover, A.gb4:hover,\
	#gb A:hover,\
	#myg_popup A:hover\
	{\
		color				: black;\
		background-color	: '+ (DB.css.header.backgroundColorHover||'#ebeff9') +';\
		border-width		: 1px;\
		border-style		: solid;\
		border-color		: '+ (DB.css.menus.borderColor||'#c9d7f1') +';\
		text-decoration		: none;\
	}\
	B.gb1 {\
		color				: '+ (DB.css.header.color||'#444') +';\
		border-width		: 1px;\
		border-style		: solid;\
		border-color		: '+ (DB.css.menus.borderColor||'#c9d7f1') +';\
		background-color	: '+ (DB.css.header.backgroundColor||'#ebeff9') +';\
	}\
	#tbd A {\
		color				: '+ (DB.css.titles.color||'#00b') +';\
	}\
	#leftnav,\
	#leftnav #hidden_modes,\
	#leftnav #hmp,\
	#ss-box,\
	#tbd {\
		background-color:'+ (DB.css.header.backgroundColor||'#fff') +';\
		color:'+ (DB.css.header.backgroundColor||'#000') +';\
	}\
	#leftnav #ms .msel,\
	#tbd .tbt .tbos {\
		color				: '+ (DB.css.header.colorHover||'#444') +';\
		background-color	: '+ (DB.css.body.backgroundColor||'#fff') +';\
	}\
	#leftnav .mitem:hover,\
	#leftnav .tbou:hover {\
		background-color	: '+ (DB.css.menus.backgroundColor||'#fff') +';\
	}\
	#leftnav .mitem:hover > a,\
	#leftnav .tbou:hover > a {\
		color				: '+ (DB.css.menus.color||'#444') +';\
	}\
	#leftnav {\
		border-color		: '+ (DB.css.resbox.borderColor||'#c9d7f1') +';\
	}\
	#tbd .tbt {\
		border-color		: '+ (DB.css.menus.borderColor||'#c9d7f1') +';\
	}\
	#gbar B.gb1 {\
		padding-left		: 5px;\
		padding-right		: 5px;\
	}\
	#gbar B.gb1, #gbi B.gb1, #guser B.gb1 {\
		border-bottom-color	: '+ (DB.css.header.backgroundColor||'#FAFAFA') +';\
	}\
	#gfx-searchers A:hover {\
		color				: '+ (DB.css.header.colorHover||'#444') +';\
	}\
	#center_col\
	{\
		border-left-color	: '+ (DB.css.infobar.borderColor||'rgb(211, 225, 249)') +';\
	}\
	#gfx-toolbar .on {\
		color				: '+ (DB.css.inputbox.color||'black') +';\
		border-color		: '+ (DB.css.inputbox.borderColor||'#ebeff9') +';\
		background-color	: '+ (DB.css.inputbox.backgroundColor||'#4169E1') +';\
	}\
	/*** Info Bar ***/\
	#tbbc, /* websearch 2.0 */\
	.lhshdr, .rshdr, .tpblk, #rgsh_s,\
	#title_bar  /* movies */\
	{\
		'+ CSS.infobar +'\
	}\
	#ssb, /* search */\
	BODY > TABLE.t.bt, /* images */\
	#_h, #gfx-header .sub-header, /* news */\
	#titlebar, #results_bar, .hp_header, .header_bar, /* books */\
	#h .ttt, TABLE.ttt, /* blogs */\
	.sh-res-bar, /* scholar */\
	#ps-titlebar, /* products */\
	#results-bar /* videos */\
	{\
		'+ CSS.infobar +'\
		border-top-width	: 0px;\
		margin-top			: -1px;\
		padding-top			: 0px;\
		' + (isGecko ? '\
		-moz-border-radius-topleft		: 0px;\
		-moz-border-radius-topright		: 0px;\
		' : '\
		border-top-left-radius		: 0px;\
		border-top-right-radius		: 0px;\
		')+'\
	}\
	#ssb *, /* search */\
	BODY > TABLE.t.bt *, /* images */\
	#_h *, #gfx-header .sub-header *, /* news */\
	#results_bar *, /* books */\
	#h .ttt *, TABLE.ttt *, /* blogs */\
	.sh-res-bar *, /* scholar */\
	#ps-titlebar *, /* products */\
	#results-bar * /* videos */\
	{\
		color				: '+ (DB.css.infobar.color||'black') +';\
		background-color	: transparent;\
	}\
	/**** Button Icons ****/\
	SPAN A.fl:hover, A.ch:hover, A.sm:hover, A.nt:hover,\
	A.sf:hover, A.-sf:hover,\
	#gfx-toolbar .icons,\
	#gfx-toolbar .icons A:hover,\
	#gfx-toolbar .icons LI:hover\
	{\
		border-color		: '+ (DB.css.header.borderColor||'#abf') + ';\
	}\
	/**** Suggest ****/\
	.gac_m {\
		background-color	: '+ (DB.css.header.backgroundColor||'#fff') +';\
		border-color		: '+ (DB.css.menus.borderColor||'gray') +';\
		'+ (DB.css.header.boxShadow?'box-shadow:'+DB.css.header.boxShadow+';':'') + '\
		'+ (DB.css.header.MozBoxShadow?'-moz-box-shadow:'+DB.css.header.MozBoxShadow+';':'') + '\
		'+ (DB.css.header.WebkitBoxShadow?'-webkit-box-shadow:'+DB.css.header.WebkitBoxShadow+';':'') + '\
	}\
	TR.gac_a {\
		color				: '+ (DB.css.header.color||'#000') +';\
	}\
	TR.gac_a:hover, TR.gac_a.hover {\
		background-color	: '+ (DB.css.header.backgroundColorHover||'#47b') +';\
	}\
	TR.gac_a:hover TD,\
	TR.gac_a:hover TD B,\
	TR.gac_a.hover TD,\
	TR.gac_a.hover TD B {\
		color				: #000;\
	}\
	TR.gac_a:hover TD,\
	TR.gac_a.hover TD {\
		border-color		: '+ (DB.css.menus.borderColor||'#c9d7f1') +';\
		color				: #000;\
	}\
	.gac_c {\
		color				: '+ (DB.css.header.color||'#000') +';\
	}\
	.gac_c B {\
		color				: '+ (DB.css.titles.color||DB.css.header.color||'#00f') +';\
	}\
	.gac_d {\
		color				: '+ (DB.css.url.color||'#494') +';\
	}\
	.gac_e {\
		background-color	: '+ (DB.css.infobar.backgroundColor||'#d0d0d7') +';\
	}\
	.gac_e SELECT {\
		background-color	: '+ (DB.css.buttons.backgroundColor||'#eee') +';\
		color				: '+ (DB.css.buttons.color||'#368') +';\
	}\
	TD.more:hover {\
		border-color		: '+(DB.css.menus.borderColor||'#c9d7f1')+';\
	}\
	';
	if (canRun.search) {
		css += '\
		#gfx-sbar-trev TABLE TD *,\
		.spell {\
			color				:'+ (DB.css.highlights.borderColor||'#F88') +';\
		}\
		.g,\
		#mfr {\
			'+ CSS.resbox +'\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
		}\
		#gfx-sidebar .box {\
			'+ CSS.resbox + '\
			display				: table;\
			min-width			: 100%;\
			padding				: 0;\
			margin				: 0;\
			margin-bottom		: 8px;\
		}\
		#gfx-sidebar .box .g {\
			border-width		: 0px;\
			margin				: 0;\
			padding-right		: 0;\
		}\
		#gfx-sidebar .twtr-timeline {\
			background-color	:'+ (DB.css.resbox.backgroundColor||'#fff') +';\
		}\
		#gfx-sidebar .twtr-timeline P {\
			color				:'+ (DB.css.desc.color||'#111') +';\
		}\
		A.gfx-thumb {\
			'+ CSS.thumbs +'\
			margin-left			: '+ (DB.css.thumbs.marginLeft||'0px') +';\
		}\
		#lu_map,\
		#iur A:link > IMG,\
		.ibk TABLE.ts DIV,\
		.ibk TABLE.ts DIV A:link,\
		A.gfx-thumb:link {\
			border-color		: '+ (DB.css.resbox.borderColor||'gray') +';\
		}\
		#iur A:hover > IMG,\
		.ibk TABLE.ts DIV A:hover,\
		A.gfx-thumb:hover {\
			border-color		: '+ (DB.css.titles.colorHover||'#99F') +';\
		}\
		A.gfx-thumb:visited {\
			border-color		: '+ (DB.css.titles.colorVisited||'#707') +';\
		}\
		A.gfx-thumb:visited > IMG {\
			background-color	: '+ (DB.css.titles.colorVisited||'#faf') +';\
		}\
		.g A.l {\
			'+ CSS.titles + '\
		}\
		#gfx-sidebar .twtr-timeline A,\
		.g A:link {\
			color				:'+ (DB.css.titles.color||'blue') +';\
		}\
		#gfx-sidebar .twtr-timeline A:hover,\
		.g A:hover {\
			color				:'+ (DB.css.titles.colorHover||'#99F') +';\
			text-shadow			: 0 0 13px '+ (DB.css.header.colorHover||'#000') +';\
		}\
		#gfx-sidebar .twtr-timeline A:visited,\
		.g A:visited {\
			color				:'+ (DB.css.titles.colorVisited||'violet') +';\
		}\
		.g A:visited:hover\
		{\
			text-shadow			: none;\
		}\
		EM {\
			'+ CSS.highlights + '\
			border-top-width	: 0px;\
			border-left-width	: 0px;\
			border-right-width	: 0px;\
		}\
		' + (URI.query.as_occt && URI.query.as_occt!='any' ? '\
			em {\
				background-color:'+ (DB.css.body.backgroundColor||'#dde') +';\
			}\
		' : '') + '\
		.g SPAN.cnt {\
			'+ CSS.counter +'\
		}\
		.g CITE,\
		.s CITE,\
		.a,\
		FONT[color="#666666"]\
		{\
			'+ CSS.url +'\
		}\
		.g .tbpr,\
		.g .ts .s SPAN:first-child,\
		.g .gl A {\
			'+ CSS.links +'\
		}\
		.g .s,\
		LI .ts TD,\
		LI .s,\
		.std {\
			'+ CSS.desc +'\
		}\
		.g .f {\
			color				: '+ (DB.css.notes.color||'gray') +';\
		}\
		P.std {\
			color				:'+ (DB.css.body.color||'#888') +';\
		}\
		.w {\
			color				: '+ (DB.css.highlights.borderColor||DB.css.menus.colorHover||'#20c') +';\
		}\
		' +
		( GFX.mzBrd ? '\
			.g, #mfr {\
				' + CSS.mzborder + '\
			}\
			.g A.l {\
				' + (isGecko ? '\
				-moz-border-radius-topleft		: '+ GFX.mzBrdTL +'px;\
				-moz-border-radius-topright		: '+ GFX.mzBrdTR +'px;\
				' : '\
				border-top-left-radius		: '+GFX.mzBrdTL+'px;\
				border-top-right-radius		: '+GFX.mzBrdTR+'px;\
				') +'\
			}\
		' : '');
	}
	else if (canRun.images) {
		css += '\
		.spell,\
		.ts FONT {\
			color				: '+ (DB.css.highlights.borderColor||'#c00') +';\
		}\
		A.gfx-thumb {\
			'+ CSS.thumbs +'\
			margin				: 0;\
		}\
		A.gfx-thumb:link {\
			border-color		: '+ (DB.css.thumbs.borderColor||'gray') +';\
		}\
		A.gfx-thumb:hover {\
			border-color		: '+ (DB.css.thumbs.borderColorHover||'#99F') +';\
		}\
		A.gfx-thumb:visited {\
			border-color		: '+ (DB.css.thumbs.borderColorVisited||'#a0a') +';\
		}\
		A.gfx-thumb:visited {\
			background-color	: '+ (DB.css.thumbs.backgroundColorVisited||'#505') +';\
		}\
		.rg_hv,\
		.gfx-info,\
		.autoPagerS\
		{\
			border-color		: '+ (DB.css.resbox.borderColor||'#4169E1') + ';\
			border-width		: '+ (DB.css.resbox.borderWidth||'0') + ';\
			border-style		: '+ (DB.css.resbox.borderStyle||'solid') + ';\
			color				: '+ (DB.css.desc.color||'gray') +';\
			background-color	: '+ (DB.css.resbox.backgroundColor||'white') +';\
		}\
		.gfx-info DIV B {\
			border				: 0;\
			' + CSS.highlights + '\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.gfx-info .a * {\
			'+ CSS.url + '\
		}\
		.gfx-info .a:hover {\
			text-decoration		: underline;\
		}\
		.gfx-info .f {\
			color				: '+ (DB.css.notes.color||'gray') +';\
		}\
		#rpsp,\
		#gfx-toolbar #sc-dropdown\
		{\
			'+ CSS.header +'\
		}\
		#rpsp .tl *{\
			color				:'+ (DB.css.titles.color||'blue') +';\
			text-decoration		: none;\
		}\
		#rpsp .tl-sel *{\
			color				: '+ (DB.css.menus.colorHover||'black') +';\
			background-color	: '+ (DB.css.header.backgroundColor||'#ebeff9') +';\
			text-decoration		: none;\
		}\
		#sc-block DIV {\
			background-color	: '+ (DB.css.menus.backgroundColor||'#fff') +';\
		}\
		';
	}
	else if(canRun.blogsearch){
		css += '\
		#sft .lrr * {\
			color				: '+ (DB.css.header.color||'black') +';\
		}\
		.asb,\
		TD.ttb,\
		.ln {\
			'+ CSS.menus +'\
		}\
		.hd,\
		.ln .ctx {\
			color				: '+ (DB.css.menus.colorHover||'black') +';\
			background-color	: '+ (DB.css.header.backgroundColor||'#ebeff9') +';\
			border-width		: 1px;\
			border-style		: solid;\
			border-color		: '+ (DB.css.menus.borderColor||'#c9d7f1') +';\
		}\
		.hd *,\
		.asb *,\
		.asb TABLE TABLE *\
		{\
			color				: '+ (DB.css.menus.color||'black') +';\
		}\
		.g,\
		TABLE.j {\
			'+ CSS.resbox +'\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
		}\
		.g SPAN.cnt {\
			'+ CSS.counter +'\
		}\
		.g A[id|="p"] {\
			'+ CSS.titles +'\
		}\
		.g .j FONT + BR + FONT {\
			'+ CSS.desc +'\
		}\
		.g B {\
			border				: 0;\
			'+ CSS.highlights +'\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.g .std {\
			'+ CSS.links +'\
		}\
		.g A.f1 {\
			'+ CSS.url +'\
		}\
		';
	}
	else if(canRun.books){
		css += '\
		.sub_cat_section,\
		.thumbohover,\
		.rsi TR,\
		.goog-tooltip,\
		.linkbar-panel-div,\
		.scroll-toc-div\
		{\
			'+ CSS.resbox + '\
		}\
		div[unselectable="on"],\
		.goog-inline-block\
		{\
			background-color	: transparent;\
		}\
		.hpm_title,\
		.sub_cat_title,\
		#toolbar_container\
		{\
			'+ CSS.header + '\
		}\
		.rsi TR {\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
		}\
		.rsi B {\
			border				: 0;\
			'+ CSS.highlights +';\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		#result_filtersvblt SELECT,\
		.about_title\
		{\
			'+ CSS.infobar +'\
		}\
		.coverthumb\
		{\
			border-color		: '+ (DB.css.thumbs.borderColor||'black') +';\
		}\
		#toolbar_container *,\
		.scroll-toc-div *,\
		.thtitle\
		{\
			color				: '+ (DB.css.titles.color||'blue') +';\
		}\
		.snippet,\
		.thauthor\
		{\
			color				: '+ (DB.css.desc.color||'black') +';\
		}\
		.thdate\
		{\
			color				: '+ (DB.css.url.color||'gray') +';\
		}\
		.ln2\
		{\
			color				: '+ (DB.css.notes.color||'gray') +';\
		}\
		#viewport\
		{\
			background-color	: '+ (DB.css.body.backgroundColor||'f9f9f9') +';\
		}\
		';
	}
	else if(canRun.finance)
	{
		css += '\
		#left-nav .nav-selected\
		{\
			color				: '+ (DB.css.buttons.color||'black') +';\
			background-color	: '+ (DB.css.buttons.backgroundColor||'white') +';\
		}\
		.hdg,\
		.criteria_wizard,\
		#compare-bar-wrapper,\
		#left-nav .nav-item\
		{\
			color				: '+ (DB.css.menus.color||'black') +';\
			background-color	: '+ (DB.css.menus.backgroundColor||'white') +';\
		}\
		.top\
		{\
			border-color		: '+ (DB.css.menus.borderColor||'black') +';\
		}\
		.searchtabs *,\
		.gf-table TH,\
		.gf-table .bb,\
		.gf-table .tptr,\
		#left-nav .navsub\
		{\
			color				: '+ (DB.css.header.color||'black') +';\
			background-color	: '+ (DB.css.header.backgroundColor||'white') +';\
		}\
		.gf-table-control\
		{\
			color				: '+ (DB.css.infobar.color||'black') +';\
			background-color	: '+ (DB.css.infobar.backgroundColor||'white') +';\
		}\
		.selected_tab,\
		.selected_tab *,\
		.news-item,\
		#rq-box\
		{\
			color				: '+ (DB.css.desc.color||'black') +';\
			background-color	: '+ (DB.css.resbox.backgroundColor||'white') +';\
		}\
		.hilite *\
		{\
			background-color	: '+ (DB.css.resbox.backgroundColor||'white') +';\
		}\
		.linkbtn\
		{\
			color				: '+ (DB.css.links.color||'blue') +';\
		}\
		.src\
		{\
			color				: '+ (DB.css.url.color||'gray') +';\
		}\
		';
	}
	else if(canRun.groups){
		css += '\
		.overflow-hide *\
		{\
			color				: '+ (DB.css.resbox.color||'black') +';\
			background-color	: '+ (DB.css.resbox.backgroundColor||'white') +';\
			border				: 0;\
		}\
		.ss {\
			color				: '+ (DB.css.header.color||'black') + ';\
		}\
		.header_bar,\
		.module H2,\
		.survey_invite,\
		.grhdr\
		{\
			border				: 0;\
			'+ CSS.header +'\
		}\
		TD FONT[color="#000000"]\
		{\
			color				: '+ (DB.css.header.color||'black') +';\
		}\
		TABLE.sb, #rhsc {\
			border				: 0;\
			'+ CSS.infobar +'\
		}\
		TABLE [width="450px"]\
		{\
			border-color		: '+ (DB.css.header.borderColor||'black') +';\
		}\
		.secttlbarwrap *\
		{\
			color				: '+ (DB.css.infobar.color||'black') +';\
			background-color	: '+ (DB.css.infobar.backgroundColor||'gray') +';\
			border				: 0;\
		}\
		#rhsc * {\
			border				: 0;\
		}\
		TABLE.sb *,TABLE.sb .fm, #rhsc * {\
			color				: '+ (DB.css.infobar.color||'black') +';\
		}\
		#sp\
		{\
			color				: '+ (DB.css.highlights.borderColor||'#c00') +';\
		}\
		.g,\
		#gdr {\
			'+ CSS.resbox + '\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
		}\
		.g > A:link {\
			' + CSS.titles + '\
		}\
		.g > A:visited {\
			color				:'+ (DB.css.titles.colorVisited||'violet') +';\
		}\
		.g .j,\
		.g .j .std > SPAN {\
			' + CSS.desc + '\
		}\
		.g SPAN.cnt {\
			' + CSS.counter + '\
		}\
		.g B {\
			border				: 0;\
			' + CSS.highlights + '\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.g .j SPAN.a {\
			' + CSS.url + '\
		}\
		.g .j .f,\
		.gdrrm,\
		FONT[color="blue"]\
		{\
			color				: '+ (DB.css.notes.color||'blue') +';\
		}\
		';
	}
	else if(canRun.maps || canRun.local)
	{
		css += '\
		#wpanel, #panel {\
			'+ CSS.body + '\
		}\
		#page .bar, #wpanel .actbar, #wpanel .pp-footer-line {\
			'+ CSS.menus + '\
		}\
		#attrWidgetPanel, #topbar-startcol, .ddwpt {\
			'+ CSS.header + '\
		}\
		#page .one, #wpanel .pp-story-item, .altroute_current, .dir-stephover {\
			'+ CSS.resbox + '\
		}\
		#wpanel .pp-sub-title {\
			'+ CSS.titles + '\
		}\
		#page .text, #wpanel .snippet, #wpanel .ugc-description {\
			'+ CSS.desc + '\
		}\
		#wpanel .pp-attribution, #wpanel .ugc-attribution {\
			'+ CSS.url + '\
		}\
		#page .unver, #wpanel .author, #wpanel .date, .category_caption {\
			'+ CSS.notes + '\
		}\
		#wpanel .zrvwidget{\
			'+ CSS.links + '\
		}\
		';
	}
	else if(canRun.news){
	
		var isDarkBg = DB.css.body.backgroundColor?new Color(DB.css.body.backgroundColor):[255,255,255];
		isDarkBg = isDarkBg[0]+isDarkBg[1]+isDarkBg[2] < 380;
	
		css += '\
		.divider,\
		.center-image,\
		#headline-gadgets .basic-title,\
		.bottom-search\
		{\
			'+ CSS.menus + '\
		}\
		.sidebar,\
		.browse-sidebar,\
		.quotesnippet\
		{\
			'+ CSS.header + '\
		}\
		#headline-gadgets .basic-title *,\
		.quotesnippet *\
		{\
			color					: '+ (DB.css.header.color||'#777') +';\
		}\
		.spelling-correction P,\
		.spelling-correction\
		{\
			color				: '+ (DB.css.highlights.borderColor||'#c00') +';\
		}\
		.long,\
		.short,\
		#search-stories .story,\
		#top-stories .story\
		{\
			'+ CSS.resbox + '\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
		}\
		.long,\
		.short\
		{\
			padding				: 2px;\
		}\
		A.gfx-thumb IMG {\
			'+ CSS.thumbs +'\
			margin-left			: '+ (DB.css.thumbs.marginLeft||'0px') +';\
		}\
		A.gfx-thumb:link IMG {\
			border-color		: '+ (DB.css.resbox.borderColor||'gray') +';\
		}\
		A.gfx-thumb:hover IMG {\
			border-color		: '+ (DB.css.titles.colorHover||'#99F') +';\
		}\
		A.gfx-thumb:visited IMG {\
			border-color		: '+ (DB.css.titles.colorVisited||'#707') +';\
		}\
		A.gfx-thumb:visited > IMG {\
			background-color	: '+ (DB.css.titles.colorVisited||'#faf') +';\
		}\
		.story SPAN.cnt\
		{\
			'+ CSS.counter + '\
		}\
		#search-stories .story > A[id|="u"],\
		#search-stories .story .title,\
		#top-stories .story > A[id|="u"],\
		#top-stories .story .title\
		{\
			'+ CSS.titles +'\
		}\
		#headline-gadgets .story .body,\
		#twocol-section .story .body\
		{\
			color					: '+ (DB.css.body.color||'#ddd') +';\
		}\
		#search-stories .story .body,\
		#top-stories .story .body\
		{\
			'+ CSS.desc +'\
		}\
		.story .source\
		{\
			color					: '+ (DB.css.menus.color||'#777') +';\
		}\
		#search-stories .story .source,\
		#search-stories .story .sources,\
		#top-stories .story .source,\
		#top-stories .story .sources\
		{\
			'+ CSS.url +'\
		}\
		.story .moreLinks A,\
		.story .moreLinks\
		{\
			'+ CSS.links +'\
		}\
		.story .date,\
		.story .info\
		{\
			'+ CSS.notes +'\
		}\
		.story B\
		{\
			border				: 0;\
			'+ CSS.highlights + '\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.thumbnail A > IMG {\
			'+ CSS.thumbs +'\
		}\
		.thumbnail A:link > IMG {\
			border-color		: '+ (DB.css.resbox.borderColor||'gray') +';\
		}\
		.thumbnail A:hover > IMG {\
			border-color		: '+ (DB.css.titles.colorHover||'#99F') +';\
		}\
		.thumbnail A:visited > IMG {\
			border-color		: '+ (DB.css.titles.colorVisited||'#707') +';\
		}\
		';
		if(!hasSomeQuery) {
			css += '\
			.more-link,\
			.fewer-link,\
			.footer-disclaimer,\
			.bottom-search,\
			.b-w, .b-n, .b-b, .b-t, .b-e, .b-s, .b-m, .b-h {\
				'+ DB.css.op.b3 +'\
				color	: '+ (isDarkBg ? (DB.css.menus.backgroundColor||'black') : 'black') +';\
			}\
			.basic-title H2,\
			.basic-title H2 A\
			{\
				color	: '+ (isDarkBg ? (DB.css.menus.backgroundColor||'black') : 'black') +';\
			}\
			#left-nav-sections,\
			#left-nav-sections TR.row TD {\
				border-color	: '+ (DB.css.menus.borderColor||'white') +';\
			}\
			#left-nav-sections TR.selected .title {\
				color			: black;\
			}\
			#left-nav-sections A:visited {\
				color			: '+ (DB.css.titles.color||'black') +';\
			}\
			DIV.sources,\
			SPAN.sources {\
				'+ CSS.links +'\
			}\
			';
		}
	}
	else if(canRun.picasaweb)
	{
		css += '\
		.goog-icon-list-icon-link\
		{\
			border				: 1px solid '+ (DB.css.thumbs.borderColor||'gray') +';\
		}\
		.goog-icon-list-icon-link:visited {\
			border-color		: #a58;\
		}\
		.goog-icon-list-icon-link:hover {\
			border-color		: '+ (DB.css.titles.colorHover||'#33c') +';\
			background-color	: #aaf;\
		}\
		.goog-icon-list-icon-link:visited:hover {\
			border-color		: #b69;\
			background-color	: #f9b;\
		}\
		#lhid_leftbox\
		{\
			'+ CSS.body +'\
		}\
		#lhid_crowder,\
		#lhid_galleryContextDisplay,\
		.lhcl_contextbar,\
		.lhcl_popularityinfo,\
		.goog-icon-list-tooltip\
		{\
			'+ CSS.infobar +'\
		}\
		.gphoto-topnav TR,\
		.lhcl_toolbar,\
		#lhid_rightbox,\
		#lhid_slider,\
		#lhid_tray,\
		#lhid_trayhandle\
		{\
			'+ CSS.header + '\
		}\
		#lhid_tray *\
		{\
			color					: '+ (DB.css.desc.color||'#555') +';\
		}\
		.lhcl_toolbar\
		{\
			border					: 0px;\
		}\
		.gphoto-context-display *,\
		.lhcl_toolbar_text\
		{\
			color					: '+ (DB.css.header.color||'#777') +';\
		}\
		#lhid_rightbox,\
		#lhid_tray\
		{\
			border-left				: 0px;\
		}\
		#lhid_slider,\
		#lhid_trayhandle\
		{\
			border-right			: 0px;\
			background-image		: none;\
		}\
		#lhid_trayhandle_icon\
		{\
			opacity					: .7;\
		}\
		.goog-toolbar-separator,\
		.gphoto-context-box,\
		#lhid_shell\
		{\
			border-color			: '+ (DB.css.header.borderColor||'#eee') +';\
		}\
		.gphoto-topnav,\
		.gphoto-topnav-contents\
		{\
			border					: 1px solid '+ (DB.css.menus.borderColor||'#444') +';\
			border-bottom			: 0;\
		}\
		.gphoto-topnav-contents *\
		{\
			border					: 0px;\
		}\
		.gphoto-topnav-tab-inactive A,\
		.gphoto-topnav-tab-inactive .gphoto-notch *\
		{\
			color					: '+ (DB.css.menus.color||'#555') +';\
			background-color		: '+ (DB.css.menus.backgroundColor||'#fff') +';\
			border					: 0px;\
		}\
		.gphoto-topnav-tab-active A,\
		.gphoto-topnav-tab-active .gphoto-notch B\
		{\
			color					: '+ (DB.css.header.color||'#000') +';\
			background-color		: '+ (DB.css.header.backgroundColor||'#fff') +';\
			border-bottom			: 0;\
		}\
		.gphoto-topnav-tab-active .gphoto-notch I\
		{\
			background-color		: '+ (DB.css.header.backgroundColor||'#fff') +';\
		}\
		.gphoto-topnav-contents A:hover\
		{\
			color					: '+ (DB.css.menus.colorHover||'#000') +';\
		}\
		#lhid_pager TD  DIV\
		{\
			opacity	: .6;\
		}\
		#lhid_pager TD  DIV + DIV\
		{\
			opacity	: 1;\
		}\
		.lhcl_sidebar,\
		.lhcl_toolbox,\
		.gphoto-explore-recent-filmContainer,\
		#lhid_pager .pagercurrentpagenum\
		{\
			color					: '+ (DB.css.titles.color||'#f00') +';\
			background-color		: '+ (DB.css.resbox.backgroundColor||'#ddd') +';\
		}\
		.gphoto-comment-hoverable:hover\
		{\
			background-color		: '+ (DB.css.resbox.backgroundColor||'#ddd') +';\
		}\
		.gphoto-context-display A,\
		.lhcl_fakelink,\
		.lhcl_header,\
		.lhcl_title\
		{\
			color					: '+ (DB.css.titles.color||'#333') +';\
		}\
		.gphoto-sidebar-photoinfo\
		{\
			'+ CSS.desc + '\
		}\
		goog-flat-button\
		{\
			'+ CSS.url + '\
		}\
		.lhcl_recent,\
		.gphoto-context-search-count,\
		.gphoto_tags_title,\
		.gphoto-exifbox-exif-field,\
		.lhcl_indexbox,\
		.gphoto-comment-info DIV\
		{\
			'+ CSS.notes + '\
		}\
		';
	}
	else if(canRun.products) {
		css += '\
		#lhs-ref {\
			'+ CSS.header + '\
		}\
		.result,\
		#refinements {\
			'+ CSS.resbox + '\
			padding-left		: '+ (DB.css.resbox.paddingLeft||'5px') +';\
			display				: block;\
		}\
		.result-title {\
			' + CSS.titles + '\
		}\
		.result-title-description P,\
		.result-price-seller,\
		#refinements * {\
			' + CSS.desc + ';\
		}\
		.result-title-description B {\
			border				: 0;\
			' + CSS.highlights + '\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.result-seller CITE,\
		.result-rating {\
			' + CSS.url + '\
		}\
		#spelling\
		{\
			color					: '+ (DB.css.highlights.borderColor||'#c00') +';\
		}\
		';
	}
	else if(canRun.scholar)
	{
		css += '\
		.g A.w {\
			'+ CSS.titles + '\
		}\
		.g > FONT {\
			'+ CSS.desc +'\
		}\
		.g > FONT B {\
			border				: 0;\
			'+ CSS.highlights +'\
			border-top			: 0;\
			border-left			: 0;\
			border-right		: 0;\
		}\
		.a {\
			'+ CSS.url +'\
		}\
		';
	}
	else if(canRun.translate)
	{
		css += '\
		H1, H2, .tabbar, .tab, .main, .resulthd, #alang, #autotrans, #zippyspan, #dict_head {\
			background-color	: '+ (DB.css.menus.backgroundColor||'#e5ecf9') +';\
			border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
			color				: '+ (DB.css.menus.color||'#000') +';\
		}\
		.active {\
			background-color	: '+ (DB.css.header.backgroundColor||'#fff') +';\
			border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
		}\
		.swap {\
			' + CSS.buttons + '\
		}\
		A.swap:visited {\
			color				: '+ (DB.css.buttons.color||'#000') +';\
		}\
		A.swap:hover {\
			color				: '+ (DB.css.buttons.colorHover||'black') + ';\
			background-color	: '+ (DB.css.buttons.backgroundColorHover||'none') + ';\
		}\
		#gs TD {\
			color				: '+ (DB.css.menus.colorHover||'#000') +';\
			color				: '+ (DB.css.menus.colorHover||'#000') +';\
		}\
		#result_box span {\
			background-color	: '+ (DB.css.body.backgroundColor||'#fff') +';\
		}\
		';
	}
	else if (canRun.video) {
		css += '\
		#search-results-toolbelt,\
		#searchagain,\
		#recommended-pane,\
		.hot_videos_title_bar,\
		.mod-header\
		{\
			'+ CSS.header +'\
		}\
		.div-footer\
		{\
			'+ CSS.infobar +'\
		}\
		#top-divider,\
		#bottom-divider,\
		.mod-header\
		{\
			border-color	: '+ (DB.css.menus.borderColor||'white') +';\
		}\
		#search-results-toolbelt .tbos {\
			color				: '+ (DB.css.menus.color||'#000') +';\
		}\
		#recommended-pane * {\
			background-color	: '+ (DB.css.menus.backgroundColor||'white') +';\
		}\
		.spelling-title\
		{\
			color				: '+ (DB.css.highlights.borderColor||'#c00') +';\
		}\
		.video-list-item,\
		.rl-highlight,\
		.rl-item,\
		.video\
		{\
			color				: '+ (DB.css.resbox.color||'#000') +';\
			background-color	: '+ (DB.css.resbox.backgroundColor||'white') +';\
			border-color		: '+ (DB.css.resbox.borderColor||'gray') +';\
		}\
		.rl-highlight,\
		.video-selected\
		{\
			border-color		: '+ (DB.css.inputbox.borderColor||'#c9d7f1') +';\
			background-color	: '+ (DB.css.buttons.backgroundColor||'white') +';\
		}\
		.rl-thumbnail-inner IMG\
		{\
			border-color	: '+ (DB.css.thumbs.borderColor||'blue') +';\
		}\
		.rl-title {\
			'+ CSS.titles +'\
		}\
		.rl-snippet,\
		.rl-snippet-grid-view,\
		.description {\
			'+ CSS.desc +'\
		}\
		.rl-details,\
		.share-widget,\
		.duration_text\
		{\
			'+ CSS.notes +'\
		}\
		.rl-filetype,\
		.vlim-domain,\
		.rl-domain-below,\
		.site\
		{\
			'+ CSS.url +'\
		}\
		.rl-watch-on\
		{\
			'+ CSS.links +'\
		}\
		';
	}
	
	if (/advanced_/.test(URI.path[0]) || (URI.path[1]&&/advanced_/.test(URI.path[1])) || URI.path[0]=='support' || URI.path[0]=='preferences') {
		css += '\
		TABLE {\
			border				: 0;\
		}\
		#gen-query\
		{\
			'+ CSS.menus +'\
		}\
		.tip, .tip-content,\
		.header_bar,\
		#advsearch-t *,\
		#advd-search-header H1,\
		.module H2\
		{\
			background-color	: '+ (DB.css.menus.backgroundColor||'#e5ecf9') +';\
			border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
		}\
		[bgcolor="#bbcced"] *,\
		TABLE[bgcolor="#ffffff"] *,\
		TR[bgcolor="#ffffff"] *,\
		#advsearch-t *,\
		.header_bar *,\
		.module H2 *\
		{\
			color				: '+ (DB.css.menus.color||'#000') +';\
		}\
		.as-table-cont,\
		.page-title\
		{\
			background-color	: '+ (DB.css.header.backgroundColor||'#e5ecf9') +';\
			border-color		: '+ (DB.css.header.borderColor||'#36c') +';\
		}\
		.block,\
		.qbuilder-env\
		{\
			background-color	: '+ (DB.css.resbox.backgroundColor||'#e5ecf9') +';\
			border-color		: '+ (DB.css.resbox.borderColor||'#36c') +';\
		}\
		.link {\
			'+ CSS.titles +'\
		}\
		.hint,\
		.comment {\
			'+ CSS.url +'\
		}\
		';
	}
	if (/language/.test(URI.path[0])) {
	css += '\
		H4\
		{\
			background-color	: '+ (DB.css.menus.backgroundColor||'#e5ecf9') +';\
			border-color		: '+ (DB.css.menus.borderColor||'#36c') +';\
		}\
		TR[bgcolor="#ffffff"] *\
		{\
			color				: '+ (DB.css.desc.color||'#000') +';\
		}\
	';
	}

	css += '\
	/*** Buttons ***/\
	SELECT,\
	BUTTON:not(.ws):not(.wsa),\
	BUTTON[type="submit"],\
	INPUT#stxemailsend,\
	INPUT[type="button"],\
	INPUT[type="checkbox"],\
	INPUT[type="radio"],\
	INPUT[type="submit"],\
	INPUT[value="Cancel"],\
	INPUT[value="Discard"],\
	INPUT[value="Download"],\
	INPUT[value="Save"]\
	{\
		'+ CSS.buttons +'\
		cursor				: pointer;\
		background-position	: 0px -192px;\
	}\
	SELECT:hover,\
	BUTTON:not(.ws):not(.wsa):hover,\
	BUTTON[type="submit"]:hover,\
	INPUT#stxemailsend:hover,\
	INPUT[type="button"]:hover,\
	INPUT[type="checkbox"]:hover,\
	INPUT[type="radio"]:hover,\
	INPUT[type="submit"]:hover,\
	INPUT[value="Cancel"]:hover,\
	INPUT[value="Discard"]:hover,\
	INPUT[value="Download"]:hover,\
	INPUT[value="Save"]:hover\
	{\
		color				: '+ (DB.css.buttons.colorHover||'black') + ';\
		background-color	: '+ (DB.css.buttons.backgroundColorHover||'none') + ';\
	}\
	INPUT[type="checkbox"] {\
		width				: 1.5em;\
	}\
	/*** Input Box ***/\
	INPUT[type="text"], INPUT[name="q"] {\
		'+ CSS.inputbox +'\
		border-color		: '+ (DB.css.header.borderColor||'gray') +';\
		padding-top			: '+ (DB.css.inputbox.paddingTop||'1px') +';\
		padding-bottom		: '+ (DB.css.inputbox.paddingBottom||'1px') +';\
		cursor				: text;\
		margin				: 1px;\
	}\
	SELECT,\
	TEXTAREA\
	{\
		color				: '+ (DB.css.titles.color||DB.css.resbox.color||'black') + ';\
		background-color	: '+ (DB.css.resbox.backgroundColor||'white') + ';\
		border-color		: '+ (DB.css.resbox.borderColor||'black') +';\
		border-width		: '+ (DB.css.inputbox.borderWidth||'1px') +';\
		border-style		: '+ (DB.css.inputbox.borderStyle||'solid') +';\
		cursor				: pointer;\
	}\
	SELECT:hover {\
		border-color		: '+ (DB.css.inputbox.borderColor||'gray') +';\
	}\
	INPUT[type="text"]:focus, INPUT[name="q"]:focus {\
		border				: 2px solid '+ (DB.css.inputbox.borderColor||'#4169E1') + ';\
		margin				: 0px;\
	}\
	';
	
	if(GFX.bStyles && GFX.mzBrd){
		css += '\
		SELECT\
		{\
		' + (isGecko ? '\
			-moz-border-radius			: 3px;\
		' : '\
			border-radius				: 3px;\
		')+'\
		}\
		BUTTON:not(.ws):not(.wsa), INPUT, TEXTAREA,\
		#gfx-preview .inputbox,\
		#gfx-iprev,\
		#gfx-alertbox-Box, #gfx-alertbox-InBox, #gfx-alertbox-BoxContent,\
		#gfx-sidebar .box,\
		#_h, /* news */\
		#h .ttt, TABLE.ttt, /* blogs result bar */\
		#ps-titlebar, /* products result bar */\
		#results-bar, /* videos result bar */\
		#results_bar, /* books result bar */\
		#ssb, /* search result bar */\
		#virtual-option-list,\
		.lsbb,\
		.gac_m,\
		.moor-box,\
		.sh-res-bar, /* scholar result bar */\
		.story,\
		.gfx-info,\
		BODY > TABLE.t.bt, /* images result bar */\
		BODY,\
		TABLE.sb, /* groups result bar */\
		TABLE[class="t bt"]\
		{\
			' + CSS.mzborder + '\
		}\
		.tsf-p .lst {\
			' + (isGecko ? '\
			-moz-border-radius-topright		: 0;\
			-moz-border-radius-bottomright	: 0;\
			' : '\
			border-top-right-radius		: 0;\
			border-bottom-right-radius	: 0;\
			') +'\
		}\
		.tsf-p .lsb {\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 0;\
			-moz-border-radius-bottomleft	: 0;\
			' : '\
			border-top-left-radius		: 0;\
			border-bottom-left-radius	: 0;\
			') +'\
		}\
		#gfx-sidebar .box > .r,\
		#gfx-sidebar .box #brs caption,\
		#gfx-sidebar .box #cloud-header {\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: '+ (GFX.mzBrdTL - 3) +'px;\
			-moz-border-radius-topright		: '+ (GFX.mzBrdTR - 3) +'px;\
			-moz-border-radius-bottomleft	: 0px;\
			-moz-border-radius-bottomright	: 0px;\
			' : '\
			border-top-left-radius		:'+ (GFX.mzBrdTL - 3) +'px;\
			border-top-right-radius		:'+ (GFX.mzBrdTR - 3) +'px;\
			border-bottom-left-radius	: 0;\
			border-bottom-right-radius	: 0;\
			') +'\
		}\
		.gphoto-topnav-contents,\
		#gbar .gb1, #gbar .gb3,#guser A[href], .login, #gb A\
		{\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 4px;\
			-moz-border-radius-topright		: 4px;\
			-moz-border-radius-bottomleft	: 0px;\
			-moz-border-radius-bottomright	: 0px;\
			' : '\
			border-top-left-radius		: 4px;\
			border-top-right-radius		: 4px;\
			border-bottom-left-radius	: 0px;\
			border-bottom-right-radius	: 0px;\
			')+'\
		}\
		#gbi, #gprefs,\
		#gfx-PV_headers,\
		#gfx-PV_infobar,\
		#gfx-searchers-mnu\
		{\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 0px;\
			-moz-border-radius-topright		: 0px;\
			-moz-border-radius-bottomleft	: 5px;\
			-moz-border-radius-bottomright	: 5px;\
			' : '\
			border-top-left-radius		: 0px;\
			border-top-right-radius		: 0px;\
			border-bottom-left-radius	: 5px;\
			border-bottom-right-radius	: 5px;\
			')+'\
		}\
		#gbar .gb2,\
		#gfx-searchers-mnu A\
		{\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 2px;\
			-moz-border-radius-topright		: 2px;\
			-moz-border-radius-bottomleft	: 2px;\
			-moz-border-radius-bottomright	: 2px;\
			' : '\
			border-top-left-radius		: 2px;\
			border-top-right-radius		: 2px;\
			border-bottom-left-radius	: 2px;\
			border-bottom-right-radius	: 2px;\
			')+'\
		}\
		.gfx-img .zoom,\
		A.gfx-thumb,\
		A.gfx-thumb IMG,\
		.tip {\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 3px;\
			-moz-border-radius-topright		: 3px;\
			-moz-border-radius-bottomleft	: 3px;\
			-moz-border-radius-bottomright	: 3px;\
			' : '\
			border-top-left-radius		: 3px;\
			border-top-right-radius		: 3px;\
			border-bottom-left-radius	: 3px;\
			border-bottom-right-radius	: 3px;\
			')+'\
		}\
		.virtual-list-icon {\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 0px;\
			-moz-border-radius-topright		: 3px;\
			-moz-border-radius-bottomleft	: 0px;\
			-moz-border-radius-bottomright	: 3px;\
			' : '\
			border-top-left-radius		: 0px;\
			border-top-right-radius		: 3px;\
			border-bottom-left-radius	: 0px;\
			border-bottom-right-radius	: 3px;\
			')+'\
		}\
		.goog-icon-list-icon-link\
		{\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 5px;\
			-moz-border-radius-topright		: 5px;\
			-moz-border-radius-bottomleft	: 5px;\
			-moz-border-radius-bottomright	: 5px;\
			' : '\
			border-top-right-radius		: 5px;\
			border-top-left-radius		: 5px;\
			border-bottom-right-radius	: 5px;\
			border-bottom-left-radius	: 5px;\
			')+'\
		}\
		#gfx-iprev .ratio {\
			' + (isGecko ? '\
			-moz-border-radius-topleft		: 0px;\
			-moz-border-radius-topright		: 0px;\
			-moz-border-radius-bottomleft	: 0px;\
			-moz-border-radius-bottomright	: 5px;\
			' : '\
			border-top-left-radius		: 0px;\
			border-top-right-radius		: 0px;\
			border-bottom-left-radius	: 0px;\
			border-bottom-right-radius	: 5px;\
			')+'\
		}\
		';
	}
	
	addStyle(css.replace(/;/g,' !important;'), 'gfx-color-theme');
	
	delete css;

}; /* END GFX_Styles function */




/**  User Settings Styles
*******************************************/
var GFX_GUI_Styles = function(){
	
	/***
	 *  - mooRainbow: defaultCSS
	 * author: w00fz <w00fzIT@gmail.com>
	 */
	css = '\
	#mooRainbow { font-size: 11px; }\
	.moor-box {\
		width: 390px;\
		margin-left: -395px;\
		height: 310px;\
		margin-top: -230px;\
		border-width: 1px;\
		border-style: solid;\
		border-color: inherit;\
		background-color: inherit;\
	}\
	.moor-dragBox {\
		width: 390px;\
		height: 310px;\
		margin-top: 0px;\
		margin-left: 0px;\
		cursor: move;\
	}\
	.moor-overlayBoxColor,\
	.moor-overlayBoxOver {\
		width: 256px;\
		height: 256px;\
		margin-top: 9px;\
		margin-left: 9px;\
		border-width: 1px;\
		border-style: solid;\
		border-color: inherit;\
		background-repeat: no-repeat;\
		cursor: crosshair;\
	}\
	.moor-overlayBoxColor {\
		background-image:url("data:image/png;base64,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")\
	}\
	.moor-overlayBoxOver {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAACOdJREFUeF7t1AULAGYZBODT2d0dm87uTqw5NrfJ3MRiBhYGBgYGBhYGBnNjOnSKm2KhTmxssbu7u7sT73/c88H9gO943ks8DWhguoEz9PeiAwY2DTh+A8jAsIGcsZ8XHTCwacDxG0AGhg3kgH5edMDApgHHbwAZGDaQM/XzogMGNg04fgPIwLCBnLmfFx0wsGkgZ+kAiA4Y2DTg+A0gA8MGctZ+XnTAwKYBx28AGRg2kLP186IDBjYN5OwdANEBA5sGHL8BZGDYQM7Rz4sOGNg0kHN2AEQHDGwacPwGkIFhAzlXPy86YGDTQM7dARAdMLBpIOfpAIgOGNg04PgNIAPDBnLefl50wMCmgZyvAyA6YGDTQM7fARAdMLBpwPEbQAaGDeQC/bzogIFNA7lgB0B0wMCmgVyoAyA6YGDTQC7cARAdMLBpwPEbQAaGDeQi/bzogIFNA7loB0B0wMCmgVysAyA6YGDTQC7eARAdMLBpIJfoAIgOGNg0kEt2AEQHDGwacPwGkIFhA7lUPy86YGDTQC7dARAdMLBpIJfpAIgOGNg0kMt2AEQHDGwayIEdANEBA5sGclAHQHTAwKaBXK4DIDpgYNNALt8BEB0wsGkgB3cARAcMbBrIFToAogMGNg3kih0A0QEDmwZypQ6A6ICBTQO5cgdAdMDApoFcpQMgOmBg00Cu2gEQHTCwaSBX6wCIDhjYNJCrdwBEBwxsGsg1OgCiAwY2DeSaHQDRAQObBnKtDoDogIFNA7l2B0B0wMCmgVynAyA6YGDTQK7bARAdMLBpINfrAIgOGNg0kOt3AEQHDGwayA06AKIDBjYN5IYdANEBA5sGcqMOgOiAgU0DuXEHQHTAwKaB3KQDIDpgYNNAbtoBEB0wsGkgN+sAiA4Y2DSQm3cARAcMbBrILToAogMGNg3klh0A0QEDmwZyqw6A6ICBTQO5dQdAdMDApoHcpgMgOmBg00AO6QCIDhjYNJDbdgBEBwxsGsihHQDRAQObBnJYB0B0wMCmgRzeARAdMLBpILfrAIgOGNg0kCM6AKIDBjYN5MgOgOiAgU0DOaoDIDpgYNNAbt8BEB0wsGkgR3cARAcMbBrIHToAogMGNg3kmA6A6ICBTQM5tgMgOmBg00Du2AEQHTCwaSB36gCIDhjYNJA7dwBEBwxsGshdOgCiAwY2DeSuHQDRAQObBnK3DoDogIFNAzmuAyA6YGDTQO7eARAdMLBpIPfoAIgOGNg0kHt2AEQHDGwayL06AKIDBjYN5N4dANEBA5sGcp8OgOiAgU0DuW8HQHTAwKaB3K8DIDpgYNNA7t8BEB0wsGkgD+gAiA4Y2DSQB3YARAcMbBrIgzoAogMGNg3kwR0A0QEDmwbykA6A6ICBTQN5aAdAdMDApoE8rAMgOmBg00Ae3gEQHTCwaSCP6ACIDhjYNJBHdgBEBwxsGsijOgCiAwY2DeTRHQDRAQObBvKYDoDogIFNA3lsB0B0wMCmgTyuAyA6YGDTQB7fARAdMLBpIE/oAIgOGNg0kCd2AEQHDGwayJM6AKIDBjYN5MkdANEBA5sG8pQOgOiAgU0DeWoHQHTAwKaBPK0DIDpgYNNAnt4BEB0wsGkgz+gAiA4Y2DSQZ3YARAcMbBrIszoAogMGNg3k2R0A0QEDmwbynA6A6ICBTQN5bgdAdMDApoE8rwMgOmBg00Ce3wEQHTCwaSAv6ACIDhjYNJDjOwCiAwY2DeSFHQDRAQObBnJCB0B0wMCmgZzYARAdMLBpICd1AEQHDGwayIs6AKIDBjYN5MUdANEBA5sGcnIHQHTAwKaBvKQDIDpgYNNAXtoBEB0wsGkgp3QARAcMbBrIyzoAogMGNg3k5R0A0QEDmwbyig6A6ICBTQM5tQMgOmBg00BO6wCIDhjYNJBXdgBEBwxsGsirOgCiAwY2DeTVHQDRAQObBvKaDoDogIFNA3ltB0B0wMCmgbyuAyA6YGDTQF7fARAdMLBpIG/oAIgOGNg0kDd2AEQHDGwayJs6AKIDBjYN5PQOgOiAgU0DeXMHQHTAwKaBvKUDIDpgYNNA3toBEB0wsGkgb+sAiA4Y2DSQt3cARAcMbBrIOzoAogMGNg3knR0A0QEDmwbyrg6A6ICBTQN5dwdAdMDApoG8pwMgOmBg00De2wEQHTCwaSDv6wCIDhjYNJD3dwBEBwxsGsgHOgCiAwY2DeSDHQDRAQObBvKhDoDogIFNA/lwB0B0wMCmgXykAyA6YGDTQD7aARAdMLBpIB/rAIgOGNg0kI93AEQHDGwayCc6AKIDBjYN5JMdANEBA5sG8qkOgOiAgU0D+XQHQHTAwKaBfKYDIDpgYNNAPtsBEB0wsGkgn+sAiA4Y2DSQz3cARAcMbBrIFzoAogMGNg3kix0A0QEDmwbypQ6A6ICBTQP5cgdAdMDApoF8pQMgOmBg00C+2gEQHTCwaSBf6wCIDhjYNJCvdwBEBwxsGsg3OgCiAwY2DeSbHQDRAQObBvKtDoDogIFNA/l2B0B0wMCmgXynAyA6YGDTQL7bARAdMLBpIN/rAIgOGNg0kO93AEQHDGwayA86AKIDBjYN5IcdANEBA5sG8qMOgOiAgU0D+XEHQHTAwKaB/KQDIDpgYNOA4zeADAwbyE/7edEBA5sG8rMOgOiAgU0D+XkHQHTAwKaB/KIDIDpgYNNAftkBEB0wsGkgv+oAiA4Y2DTg+A0gA8MG8ut+XnTAwKaB/KYDIDpgYNNAftsBEB0wsGkgv+sAiA4Y2DTg+A0gA8MG8vt+XnTAwKaB/KEDIDpgYNNA/tgBEB0wsGnA8RtABoYN5E/9vOiAgU0D+XMHQHTAwKaB/KUDIDpgYNOA4zeADAwbyF/7edEBA5sG8rcOgOiAgU0Djt8AMjBsIH/v50UHDGwayD86AKIDBjYNOH4DyMCwgfyznxcdMLBpwPEbQAaGDeRf/bzogIFNA/l3B0B0wMCmAcdvABkYNpD/9POiAwY2DTh+A8jAsIH8t58XHTCwacDxG0AGhg3kf/286ICBTQOO3wAysGrg/0A0CHLrMYgjAAAAAElFTkSuQmCC")\
	}\
	.moor-slider {\
		border-width: 1px;\
		border-style: solid;\
		border-color: inherit;\
		margin-top: 9px;\
		margin-left: 280px;\
		width: 19px;\
		height: 256px;\
		cursor: n-resize;\
		background-repeat: no-repeat;\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAEACAIAAADeB9oaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAs9JREFUaEPt2hFzc1EURuH3k1AoFAqVSqFSKFQqhUKhUilUKpVKoVCpVCqFSqVQqVQKlUqhUDr7W//gzCw+d1595uidNftfxX6VgVsqQzfkyA05dkNO3JAXbshLN+TUDXnlhpy5IeduyGs35I0bcuGGXLohV27IWzfknRty7Ya8d0M+uCEf3ZBPbsiNG3Lrhnx2Q764IV/dkG9uyJ0b8t0N+eGG3LshP92QX27IbzfkwQ3544b8dUMe3ZAnN+SfW84pt5xSbjmm3PKbcstPyi2HlFu+U275SrnlM+WWfcotHym3vKfcsku55S3llteUW15SbnlOuWWbcssm5ZanlFseU255SLnlPuWWdcotdym33Kbcskq5ZZlyyyLllpuUW65Tbpmn3DJLueUq5ZZpyi2XKbdcpNwySbllnHLLKOWWYcotg5Qb+YyG5iYDGo/JgIaUAQ0pAxpSBjSkDGhIGdCQUxfQkDKgIWVAQ8qAhpQBDSkDGlIGNKQMaMiVC2hIGdCQMqAhZUBDyoCGlAENKQMaUgY0pAxoSBnQkDKgIWVAQ8qAhpQBDSkDGlIGNKQMaEgZ0JAyoCFlQEPKgIaUAQ0pAxpSBjSkDGhIGdCQ55KzAe3MP58LaCekC2hHpAtov0gX0H6QLqAdkC6gfSNdQPtCuoD2iXQBbY90Ae0D6QLaO9IFtB3SBbQ3pAtor0gX0F6QLqA9I11A2yJdQNsgXUB7QrqA9oh0Ae0B6QLaPdIFtDXSBbQ7pAtot8iVnA1oS950AW2BdAHtBukC2jXSBbQ50gW0GdIFtCvkVM4GtEvedAHtAukC2gTpAtoY6QLaCOkC2hDpAtoAadcDWqOt9YDWukzrAa11mdYDWusyrQe01mVaD2ity7Qe0FqXaT2gtS7TekA7NtpaD2itsNYDWius9YDWCms9oLXCWg9orcu0HtBaYa0HtFZY6wGtFdb+A5l1SX9URrSzAAAAAElFTkSuQmCC");\
	}\
	.moor-colorBox {\
		border-width: 1px;\
		border-style: solid;\
		border-color: inherit;\
		width: 59px;\
		height: 68px;\
		margin-top: 20px;\
		margin-left: 315px;\
	}\
	.moor-currentColor {\
		margin-top: 55px;\
		margin-left: 316px;\
		width: 59px;\
		height: 34px;\
	}\
	.moor-okButton {\
		font-family: tahoma,verdana,arial,sans-serif;\
		font-weight: bold;\
		font-size: 11px;\
		margin-top: 275px;\
		margin-left: 200px;\
		height: 23px;\
		cursor: pointer;\
	}\
	.moor-okButton:hover{\
	}\
	#mooRainbow LABEL {\
		font-family: mono;\
	}\
	/* Following are just <label> */\
	.moor-rLabel {\
		margin-top: 100px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-gLabel {\
		margin-top: 125px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-bLabel {\
		margin-top: 150px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-HueLabel {\
		margin-top: 190px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	span.moor-ballino {\
		margin-top: 190px;\
		margin-left: 370px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-SatuLabel {\
		margin-top: 215px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-BrighLabel {\
		margin-top: 240px;\
		margin-left: 315px;\
		font-size:8pt;\
		color: inherit;\
	}\
	.moor-hexLabel {\
		margin-top: 275px;\
		margin-left: 270px;\
		font-size:8pt;\
		color: inherit;\
	}\
	/* <input> */\
	.moor-rInput, .moor-gInput, .moor-bInput, .moor-HueInput, .moor-SatuInput, .moor-BrighInput {\
		width: 30px;\
		text-align: right !important;\
		font-size: 8pt !important;\
		color: inherit !important;\
	}\
	.moor-hexInput {\
		width: 64px;\
	}\
	.moor-cursor {\
		background-image: url("data:image/gif;base64,R0lGODlhDAAMAPEAAOzp2AAAAP///wAAACH5BAEAAAIALAAAAAAMAAwAAAIhlINpG+AfGFgLxEapxdns2QlfKCJgN4aWwGnR8UBZohgFADs=");\
		width: 12px;\
		height: 12px;\
		cursor: crosshair;\
	}\
	.moor-arrows {\
		background-image: url("data:image/gif;base64,R0lGODlhKQAJAPEAAP///25tbwAAAAAAACH5BAEAAAIALAAAAAApAAkAAAIvVC6py+18ggFUvotVoODwnoXNxnmfJYZkuZZp1lYx+l5zS9f2ueb6XjEgfqmIoAAAOw==");\
		top: 9px;\
		left: 270px;\
		width: 41px;\
		height: 9px;\
		cursor: n-resize;\
	}\
	.moor-chooseColor { /* Top Box Color, the choosen one */\
		margin-top: 21px;\
		margin-left: 316px;\
		width: 59px;\
		height: 34px;\
	}';
	/****
	*  GoogleFx GUI CSS
	*/
	css += '\
	#gfx-gui {\
		border-width		: 2px;\
		border-style		: solid;\
		display				: none;\
		max-width			: 780px;\
		min-width			: 780px;\
		position			: fixed;\
		text-align			: left;\
		z-index				: 9000;\
	}\
	#gfx-gui A {\
		cursor				: pointer !important;\
		text-decoration		: none !important;\
	}\
	#gfx-gui-dragger {\
		cursor				: move;\
		display				: block;\
		margin				: 1px;\
		min-height			: 63px;\
		min-width			: 778px;\
		position			: absolute;\
		width				: 778px;\
		z-index				: 9001;\
	}\
	#gfx-gui .hdr {\
		display				: block;\
		border				: 0px;\
		border-color		: inherit;\
		border-bottom-width	: 1px;\
		margin				: 0 10px;\
		margin-top			: 10px;\
	}\
	#gfx-gui .hdr A {\
		color				: inherit !important;\
	}\
	#gfx-gui .hdr SPAN {\
		display				: inline-block;\
		height				: 83px;\
	}\
	#gfx-gui .hdr .subtitle {\
		color				: inherit;\
		cursor				: default;\
		font-size			: 22pt;\
		height				: 22pt;\
		position			: absolute;\
		text-align			: right;\
		top					: 0;\
		width				: '+(isChrome?'570':'750')+'px;\
		padding-top			: 15px;\
	}\
	#gfx-gui .hdr .subtitle A {\
		display				: block;\
		float				: right;\
		margin-top			: 20px;\
		padding				: 1px 5px;\
		text-align			: center;\
		width				: 200px;\
	}\
	#gfx-gui .hdr .subtitle A:hover {\
		background-color	: #bed;\
		border				: 1px solid #0b0;\
		color				: #009 !important;\
	}\
	#gfx-gui #gfx-logo {\
		display				: inline-block;\
		font-size			: 12pt;\
		font-weight			: bold;\
		margin				: 0 !important;\
		min-width			: 44px;\
		min-height			: 38px;\
		padding-top			: 33px;\
		position			: relative;\
		opacity				: 1;\
	}\
	#gfx-gui a.gfx {\
		background-position	: left top;\
		background-repeat	: no-repeat;\
		color				: inherit !important;\
		display				: inline-block;\
		font-weight			: bold;\
		margin-left			: 0px;\
		margin-top			: 10px;\
		min-height			: 20px;\
		min-width			: 20px;\
		padding-top			: 13px;\
		position			: relative;\
	}\
	#gfx-gui a.gfx span {\
		margin-left			: 20px;\
	}\
	#gfx-gui-mnu {\
		font				: bold 12px Verdana;\
		list-style-type		: none;\
		margin-left			: 10px;\
		margin-top			: 72px !important;\
		padding				: 1px 0;\
		position			: absolute;\
		top					: 0;\
		vertical-align		: bottom;\
		z-index				: 1010;\
	}\
	#gfx-gui-mnu LI {\
		display				: inline;\
	}\
	#gfx-gui-mnu LI span {\
		vertical-align		: top;\
		display				: inline-block;\
		max-height			: 13px;\
		background-color	: #f6ffd5;\
		border				: 1px solid gray;\
		color				: #555;\
		padding				: 3px 7px;\
		cursor				: pointer;\
	}\
	#gfx-gui-mnu LI span:hover {\
		background-color	: #DBFF6C;\
		color				: #003;\
	}\
	#gfx-gui-mnu LI span:active {\
		color				: #000;\
	}\
	#gfx-gui-mnu LI.selected span {\
		background-color	: #DBFF6C;\
		border-bottom		: 1px solid #fff;\
		border-top			: 2px solid #096;\
		color				: #003;\
		padding-top			: 5px;\
		position			: relative;\
		margin-top			: -5px;\
	}\
	#gfx-gui .tabs {\
		cursor				: default;\
		display				: inline-block;\
		height				: 400px !important;\
		max-height			: 400px !important;\
		min-height			: 400px !important;\
		position			: relative;\
		width				: 380px;\
	}\
	#gfx-gui H1 {\
		display				: inline-block;\
		font-size			: 22pt;\
		font-weight			: bold;\
		color				: inherit;\
	}\
	#gfx-gui FIELDSET {\
		display				: inline-block;\
		border-width		: 1px;\
		border-style		: solid;\
		border-color		: inherit;\
		display				: none;\
		height				: 380px !important;\
		margin				: 0 15px;\
		margin-bottom		: 4px;\
		min-height			: 380px !important;\
		min-width			: 360px;\
		padding				: 0 5px;\
		padding-top			: 5px;\
		position			: absolute;\
	}\
	#gfx-gui .tabs FIELDSET {\
		padding-bottom		: 3px;\
	}\
	#gfx-gui .tabs FIELDSET * {\
		font-family			: tahoma,verdana,arial,sans-serif;\
		font-size			: 9pt;\
		font-weight			: normal;\
		height				: auto;\
		margin				: 0;\
		padding				: 0;\
		text-align			: left;\
		vertical-align		: top;\
		width				: auto;\
	}\
	#gfx-gui FIELDSET HR {\
		border				: 0px;\
		border-style		: dotted;\
		border-color		: #999;\
		border-bottom-width	: 1px;\
		margin				: 5px 0 !important;\
	}\
	#gfx-gui FIELDSET SPAN.subtitle {\
		display				: inline-block;\
		font-size			: 12pt;\
		font-weight			: bold;\
		margin-bottom		: 5px;\
	}\
	#gfx-gui .about {\
		max-height			: 350px;\
		overflow-y			: auto;\
		text-align			: center !important;\
	}\
	#gfx-gui .about * {\
		background-color	: transparent;\
		text-shadow			: 0 1px 5px #555;\
	}\
	#gfx-gui .about h1,\
	#gfx-gui .about h2,\
	#gfx-gui .about h3,\
	#gfx-gui .about h2 A\
	{\
		display				: block;\
		text-align			: center !important;\
		color				: inherit !important;\
	}\
	#gfx-gui .about h1 {\
		font-size			: 11pt;\
	}\
	#gfx-gui .about h2 {\
		font-size			: 10pt;\
		line-height			: 11pt;\
	}\
	#gfx-gui .about h3 {\
		margin-top			: 10px;\
		font-size			: 10pt;\
		font-weight			: bold;\
	}\
	#gfx-gui .about TABLE {\
		width				: 100%;\
	}\
	#gfx-gui .about TD {\
		width				: 50%;\
		padding				: 2px 3px;\
		text-align			: right;\
	}\
	#gfx-gui .about TD + TD {\
		text-align			: left;\
	}\
	#gfx-gui .btns {\
		display				: block;\
		height				: 11pt;\
		margin				: 3px 0 10px 0;\
		text-align			: center;\
		width				: 100%;\
	}\
	#gfx-gui .btns BUTTON {\
		text-align			: center;\
		width				: 80px;\
	}\
	#gfx-gui FIELDSET LEGEND {\
		color				: inherit;\
		font-size			: 14pt !important;\
		font-weight			: bold !important;\
		margin-left			: 5px;\
		padding				: 0 1px;\
	}\
	#gfx-gui LABEL {\
		border				: 1px solid transparent;\
		color				: inherit;\
		cursor				: pointer !important;\
		display				: block;\
		padding-left		: 2px;\
	}\
	#gfx-gui LABEL.sub {\
		font-size			: 8pt;\
		margin-left			: 20px;\
	}\
	#gfx-gui LABEL:hover {\
		color				: #000;\
		background-color	: #ffd;\
		border				: 1px solid #990;\
	}\
	#gfx-gui LABEL.disabled,\
	#gfx-gui LABEL.disabled:hover,\
	#gfx-gui LABEL.disabled * {\
		color				: #999;\
	}\
	#gfx-gui .sidebar {\
		margin-left			: 10px !important;\
	}\
	#gfx-gui .sidebar LABEL,\
	#gfx-gui .services LABEL {\
		display				: inline-block;\
		min-width			: 110px;\
	}\
	#gfx-gui .sidebar LABEL {\
		margin-left			: 0px !important;\
	}\
	#gfx-gui INPUT[type="checkbox"] {\
		display				: inline-block;\
		margin-right		: 5px;\
		margin-top			: 1px;\
	}\
	#gfx-gui INPUT[type="text"],\
	#gfx-gui SELECT {\
		max-height			: 21px;\
		padding-left		: 4px;\
	}\
	#gfx-gui INPUT[type="number"] {\
		cursor				: text;\
		font-weight			: bold;\
		padding-right		: 7px;\
		text-align			: right;\
		width				: 26px;\
	}\
	#gfx-gui OPTION {\
		display				: block;\
	}\
	#gfx-gui TABLE TR {\
		font-size			: 10pt;\
	}\
	#gfx-gui TABLE TD {\
		white-space			: nowrap;\
	}\
	.gfx-css-styles * {\
		font-size			: 8pt !important;\
	}\
	.gfx-css-styles INPUT {\
		font-size			: 8pt;\
		height				: 12pt;\
		min-width			: 65px;\
		padding				: 0 4px;\
	}\
	#gfx-gui FIELDSET BUTTON {\
		padding				: 0 4px !important;\
		font-weight			: bold !important;\
	}\
	#gfx-css-list {\
		margin-left			: 10px;\
		width				: 180px;\
	}\
	#gfx-gui .virtual-list-icon {\
		margin-top			: 0px !important;\
		padding				: 1px 1px 1px 1px !important;\
		margin-left			: -6px !important;\
		text-shadow			: 0px 0px 4px #FFF;\
	}\
	#gfx-gui #virtual-list {\
		margin-top			: 2px;\
	}\
	#gfx-gui #virtual-list SPAN {\
		padding				: 2px;\
		padding-left		: 3px;\
		padding-right		: 5px;\
		text-align			: right;\
	}\
	#gfx-gui .overflow-y {\
		display				: block;\
		height				: 360px !important;\
		max-height			: 360px;\
		overflow-y			: auto;\
		overflow-x			: hidden;\
	}\
	#gfx-preview {\
		display				: inline-block;\
		position			: relative;\
		vertical-align		: top;\
		clear				: left;\
		width				: 380px;\
		max-width			: 380px;\
		overflow-x			: hidden;\
	}\
	#gfx-preview * {\
		outline-offset		: 2px;\
		cursor				: default;\
	}\
	#gfx-preview FIELDSET {\
		position			: relative !important;\
		border-width		: 2px;\
		border-style		: solid;\
		border-color		: inherit;\
		display				: block;\
		margin				: 0;\
		padding				: 0;\
		margin-left			: 5px;\
		overflow			: auto;\
		min-height			: 386px !important;\
		height				: 386px !important;\
	}\
	#gfx-preview FIELDSET LEGEND {\
		position			: fixed;\
		margin-top			: '+(isChrome?'-30':'0')+'px;\
	}\
	#gfx-preview EM {\
		border-top			: 0 !important;\
		border-left			: 0 !important;\
		border-right		: 0 !important;\
	}\
	#gfx-preview UL {\
		font-size			: 10pt;\
		font-weight			: bold;\
		list-style-type		: none;\
		margin				: 0;\
		padding				: 0;\
	}\
	#gfx-preview LI {\
		display				: inline;\
		background-repeat	: no-repeat;\
		padding-left		: 18px;\
		margin				: 0;\
	}\
	#gfx-preview BR {\
		line-height			: 2px;\
	}\
	' + (!GFX.bMnuIcn ? '\
		#gfx-preview LI {\
			background-position	: left -20px;\
			padding-left		: 3px;\
		}\
	' : '') + '\
	#gfx-PV_resbox SPAN\
	{\
		display					: inline-block;\
		border					: 1px solid transparent;\
	}\
	#gfx-preview .body\
	{\
		font-size			: 11pt;\
		'+ CSS.body		+'\
		display				: block;\
		height				: 360px;\
		margin-top:'+ (GFX.bMnuFix ? '130px' : '0px') +'\
	}\
	#gfx-preview .menus\
	{\
		'+ CSS.menus	+'\
		border-top			: 0;\
		border-left			: 0;\
		border-right		: 0;\
	}\
	#gfx-preview .inputbox\
	{\
		padding				: 2px 6px;\
		font-weight			: bold;\
		width				: 120px;\
		display				: inline-block;\
		'+ CSS.inputbox	+'\
	}\
	#gfx-preview .header\
	{\
		font-size			: 8pt;\
		'+ CSS.header	+'\
		padding-bottom		: 4px;\
		border-top			: 0 !important;\
		border-left			: 0 !important;\
		border-right		: 0 !important;\
	}\
	#gfx-preview .infobar\
	{\
		font-size			: 10pt;\
		padding				: 2px;\
		'+ CSS.infobar	+'\
		text-align			: right;\
	}\
	#gfx-preview .resbox\
	{\
		margin-left			: 2px;\
		'+ CSS.resbox	+'\
		padding-right		: 10px;\
		white-space			: nowrap;\
		padding-left		: 6px;\
	}\
	#gfx-preview .counter\
	{\
		'+ CSS.counter	+'\
	}\
	#gfx-preview .titles\
	{\
		'+ CSS.titles	+'\
	}\
	#gfx-preview .desc\
	{\
		'+ CSS.desc		+'\
		display				: inline-block;\
		width				: auto;\
		white-space			: normal;\
		clear				: both;\
	}\
	#gfx-preview .highlights\
	{\
		'+ CSS.highlights +'\
		border-top			: 0 !important;\
		border-left			: 0 !important;\
		border-right		: 0 !important;\
	}\
	#gfx-preview .url\
	{\
		'+ CSS.url		+'\
	}\
	#gfx-preview .links\
	{\
		'+ CSS.links	+'\
		' + (GFX.rRefIcn ? '\
			display				: block;\
			float				: right;\
			margin-top			: -35px;\
			' : '\
			display				: inline-block;\
		') + '\
	}\
	#gfx-preview .notes\
	{\
		font-size			: 9pt;\
		'+ CSS.notes	+'\
		display				: block;\
	}\
	#gfx-preview .buttons\
	{\
		padding				: 2px 4px;\
		font-weight			: bold;\
		border				: 2px solid #666;\
		border-top-color	: white;\
		border-left-color	: white;\
		background-color	: #ccc;\
		'+ CSS.buttons	+'\
	}\
	#gfx-preview .links A.inline\
	{\
		display				: inline-block;\
	}\
	#gfx-preview .links A.ch,\
	#gfx-preview .links A.sm\
	{\
		display				: block;\
	}\
	#gfx-preview .header IMG\
	{\
		margin-left			: 1px;\
		margin-right		: 2px;\
		vertical-align		: middle;\
	}\
	#gfx-preview .thumbs\
	{\
		'+ CSS.thumbs	+'\
		display				: '+ (GFX.rThShots?'inline-block':'none') +';\
		position			: relative;\
		clear				: both;\
	}\
	#gfx-preview .thumbs, #gfx-preview .thumbs IMG\
	{\
		height				: '+ DB.css.thumbs.height	+';\
		width				: '+ DB.css.thumbs.width	+';\
		border				: 0px;\
	}\
	#gfx-preview .thumbs\
	{\
		border					: 1px solid #777;\
		'+ (GFX.rThLft ? '\
			float				: left;\
		' : '\
			float				: right;\
			margin-left			: 5px;\
		') + '\
	}\
	#gfx-PV_headers\
	{\
		margin-top				: '+ (GFX.bMnuFix && !isChrome?'20':'0') +'px;\
		border					: '+ (GFX.bMnuFix?'2':'0') +'px solid #333;\
		border-left				: 0px !important;\
		border-right			: 0px !important;\
		width					: 370px;\
		z-index					: 9090;\
	}\
	#gfx-PV_hd_box\
	{\
		display					: block;\
	}\
	#gfx-PV_fxlogo\
	{\
		display					: ' + (GFX.gFxLogo?'inline-block':'none') + ';\
		width					: 16px;\
		height					: 16px;\
		background-repeat		: no-repeat;\
		background-position		: center center;\
		margin-bottom			: 10px;\
	}\
	#gfx-PV_ads\
	{\
		display					: '+ (GFX.rNoAds ? 'none' : 'block') +';\
		width					: 250px;\
		margin					: 2px 6px;\
		padding					: 4px;\
		border					: 1px solid #660;\
		background				: #ffa;\
		font-size				: 9pt;\
	}\
	#gfx-PV_resbox\
	{\
		display					: inline-block;\
		min-width				: 260px;\
		min-height				:'	+ DB.css.thumbs.maxHeight +';\
		clear					: right;\
	}\
	#gfx-PV_counter\
	{\
		display					: '+ (GFX.rCounter ? 'inline-block' : 'none') +';\
	}\
	#gfx-PV_sidebar\
	{\
		'+ CSS.resbox	+'\
		display					: '+ (GFX.bSidebar ? 'inline-block' : 'none') +';\
		width					: 70px;\
		height					: 70px;\
		margin					: 0px;\
		margin-right			: 2px;\
		padding					: 0px;\
		font-size				: 9pt;\
		clear					: left;\
		float					: right;\
	}\
	#gfx-PV_sidebar .title\
	{\
		display				: block;\
		min-height			: 18px;\
		margin				: -1px;\
		padding-left		: 24px;\
		font-size			: 11pt;\
		font-weight			: bold;\
		border				: 1px solid;\
		background-repeat	: no-repeat !important;\
		background-position	: left center !important;\
		text-shadow			: 0px 0px 3px #FFF !important;\
		background-color	: #eef;\
		border-color		: #bbe;\
		background-image	: url("http://www.google.com/intl/en/options/icons/search.gif");\
	}\
	#gfx-PV_searchers\
	{\
		padding-left			: 5px;\
	}\
	#gfx-PV_navbar\
	{\
		display					: '+ (GFX.rAutoPagNav ? 'table' : 'none') +';\
		font-size				: 10pt;\
		font-weight				: bold;\
	}\
	#gfx-PV_navbar .img\
	{\
		background-image		: url("http://www.google.com/images/nav_logo7.png");\
		background-repeat		: no-repeat;\
		background-position		: left top;\
		height					: 24px;\
		width					: 135px;\
		border					: 1px solid #777;\
	}\
	' + (GFX.mzBrd ? '\
			#gfx-gui,\
			#gfx-gui .tabs FIELDSET,\
			#gfx-gui-dragger,\
			#gfx-preview .resbox,\
			#gfx-preview .buttons,\
			#gfx-PV_sidebar,\
			#gfx-PV_ads\
			{\
				' + CSS.mzborder + '\
			}\
	' : '');
	

	addStyle(css, 'gfx-gui-theme');
	delete css;
};








/****************************************************************************************************************
                                         E M B E D D E D     S C R I P T S
*****************************************************************************************************************/
var GFX_Scripts = function(){
	var STR = '';
	/*  GUI Settings Script */
	STR += '\
	var win = window, doc = document;\
	if (typeof($id) != "function"){\
		var $id = function(el){\
			return doc.getElementById(el);\
		};\
	}\
	var gfxPdef = function(event) {\
		if(event) {\
			event.preventDefault();\
			event.stopPropagation();\
			event.cancelBubble = true;\
		}\
	};\
	var gfxFrmBlur = function() {\
		try{doc.forms[0].q.blur();}catch(e){};\
	};\
	var currentPV = null;\
	var PvOver = function(event, target){\
		event.stopPropagation();\
		currentPV = target;\
	};\
	var PvClick = function(){\
		if(!currentPV) return;\
		var name = currentPV.id.replace(/gfx-PV/,"CSS").replace(/_/g,".");\
		var list = $id("gfx-css-list");\
		var x = list.options.length;\
		while(x--){\
			if(list.options[x].id==name){\
				list.selectedIndex = x;\
				break;\
			}\
		}\
		gfxGuiMenu(4);\
		return false;\
	};\
	var gfxLastCb=null;\
	var addList = function (target,list,attr){\
		if(!target || !list) return;\
		var lst = $id("virtual-list");\
		if(lst){\
			doc.removeEventListener?doc.removeEventListener("click",closeList,false):doc.detachEvent("onclick",closeList);\
			lst.parentNode.removeChild(lst);\
			if(gfxLastCb == target) return;\
		}\
		gfxLastCb=target;\
		var input;\
		lst = doc.createElement("div");\
		lst.id = "virtual-list";\
		if(target.nodeName=="input"){\
			input = target;\
			lst.style.marginTop = input.offsetHeight + "px";\
		} else {\
			input = target.previousSibling;\
			lst.style.marginLeft =  -(input.offsetWidth+(window.opera?-4:-8)) + "px";\
		}\
		lst.style.minWidth = (input.offsetWidth+(window.opera?-9:1)) + "px";\
		var setValue = function(ev){\
			input.value = ev.target.innerHTML;\
			input.focus();input.blur();\
		};\
		var db = (typeof(list)=="string"?list.split(","):list);\
		var len = db.length;\
		for (var x=0; x < len; x++)\
		{\
			var p = doc.createElement("span");\
			if(attr) p.style[attr] = db[x];\
			p.innerHTML = db[x];\
			p.addEventListener("mousedown", setValue, false);\
			if(input.value==db[x]) p.className="selected";\
			lst.appendChild(p);\
		}\
		target.appendChild(lst);\
		window.setTimeout(function(){doc.addEventListener?doc.addEventListener("click",closeList,false):doc.attachEvent("onclick",closeList);},250);\
		return false;\
	};\
	var closeList = function() {\
		var lst = $id("virtual-list");\
		if (!lst) return;\
		doc.removeEventListener?doc.removeEventListener("click",closeList,false):doc.detachEvent("onclick",closeList);\
		lst.parentNode.removeChild(lst);\
		gfxLastCb=null;\
	};\
	var lastGuiMnu=0;\
	var gfxGuiMenu = function(n,ev) {\
		if(ev) {\
			ev.stopPropagation();\
		}\
		var tb = $id("gfx-gui-mnu");\
		tb.getElementsByTagName("li")[lastGuiMnu].className="";\
		var ltb = $id("gfx-tab-"+lastGuiMnu);\
		ltb.style.display="none";\
		tb.getElementsByTagName("li")[n].className="selected";\
		var ltb = $id("gfx-tab-"+n);\
		ltb.style.display="block";\
		lastGuiMnu = n;\
		if(n < 5) {\
			($id("gfx-preview")).style.display="inline-block";\
		} else {\
			($id("gfx-preview")).style.display="none";\
		}\
		return false;\
	};\
	var siteFilter = function (url,event,takeoff) {\
		gfxPdef(event);\
		var form = doc.forms[0];\
		form.target = (event.button == 1 || event.ctrlKey) ? "_blank" : "";\
		url = url.replace(/\\/$/,"");\
		if(form.q.value.indexOf(url) != -1){\
			var path = url.split("/");\
			if(path[1]) {\
				var len = path.length-1;\
				var last = len?(path[len]?-1:-2):-1;\
				path = path.slice(0,last).join("/");\
				form.q.value = form.q.value.replace(url, path);\
			} else {\
				form.q.value = form.q.value.replace(RegExp("\\-?site:" + url +"[^\\s]*|$","i"),"");\
			}\
		} else {\
			form.q.value = form.q.value.replace(/[^\\-]site:[^\\s]*|$/,(takeoff?"-":" ")+"site:"+url);\
		}\
		form.submit();\
	};\
	var searchWith = function(url,args,event) {\
		var q = window.encodeURIComponent&&(doc.forms[0].q||"").value;\
		if(!q) return true;\
		event.target.href = url + q + args;\
		return true;\
	};\
	var fixToolbelt = function (event) {\
		gfxPdef(event);\
		window.setTimeout(function(){\
			var o = document.evaluate(\'//a[contains(@href,"search?")]|//a[contains(@href,"images?")]\', document.body, null, 7, null);\
			var i = o.snapshotLength;\
			while(i--) {\
				var el = o.snapshotItem(i);\
				el.href = el.href.replace(/&amp;/g,"&").replace(/[\\?&](usg|ei|ved)=[^&]+|$/g,"").replace(/tbo=1/,"tbo=0");\
			}\
		},500);\
		return !false;\
	};\
	function getResults(q) {\
		var f = doc.forms[0];\
		f.q.value=q[0];\
		f.submit();\
	};\
	';

	
	if (canRun.images) {
		STR += '\
		var gooSC=function(ev){\
			ev=ev||window.event;\
			if(ev.stopPropagation){ ev.stopPropagation(); }\
			else{ ev.cancelBubble=true; }\
			var a=doc.getElementById("sc-dropdown").style;\
			if(a.visibility=="visible"){\
				a.visibility="hidden";\
				doc.removeEventListener("click",gooSC,false);\
			}else{\
				a.visibility="visible";\
				doc.addEventListener("click",gooSC,false);\
			}\
		};\
		';
		/* Image Preview */
		if(GFX.iPrev){
			STR += 'var iPrevRT=' + GFX.iPrevRT + ';';
			STR += '\
			var iPrevID;\
			var isPreview=false;\
			var isOverPreview=false;\
			function showImg(el,w,h,sz){\
				isOverPreview=false;\
				var q=doc.evaluate(\'//input[@name="q"]\',doc.body,null,9,null).singleNodeValue;\
				if(q) { q.blur();}\
				var ratio=0;\
				var thumb = el.className=="gfx-thumb" ? el.getElementsByTagName("IMG")[0] : (el.parentNode.className=="icons" ? el.parentNode.parentNode.getElementsByTagName("IMG")[0] : el.parentNode.getElementsByTagName("IMG")[0]);\
				var imgW,imgH;\
				if(w){\
					imgW = parseInt(w);\
					imgH = parseInt(h);\
				} else {\
					if(thumb.clientWidth > thumb.clientHeight){\
						imgW = 576;\
						imgH = parseInt(thumb.clientHeight*576/thumb.clientWidth);\
					}else{\
						imgW = parseInt(thumb.clientWidth*576/thumb.clientHeight);\
						imgH = 576;\
					}\
				}\
				var pos = {x:0,y:0};\
				var parent=el;\
				do{\
					pos.x += parent.offsetLeft;\
					pos.y += parent.offsetTop;\
				} while(parent=parent.offsetParent);\
				var mrgW = parseInt( (thumb.parentNode.parentNode.offsetWidth - thumb.parentNode.offsetWidth)/2 );\
				var mxWidth = Math.max( pos.x, doc.documentElement.clientWidth - pos.x - 20 );\
				var mxHeight = doc.documentElement.clientHeight - 20;\
				if(imgW > mxWidth){var ratio = mxWidth/imgW; imgW = parseInt(imgW * ratio); imgH = parseInt(imgH * ratio);}\
				if(imgH > mxHeight){var ratio = mxHeight/imgH; imgW = parseInt(imgW * ratio); imgH = parseInt(imgH * ratio);}\
				var holder = $id("gfx-iprev");\
				if (!holder){\
					var holder = doc.createElement("div");\
					holder.id="gfx-iprev";\
					holder.onmouseout = function(){isOverPreview=false;hideImg();};\
					holder.onmouseover = function(){isOverPreview=true;};\
					doc.body.appendChild(holder);\
				} else {\
					while(holder.firstChild){\
						holder.removeChild(holder.firstChild);\
					}\
				}\
				holder.style.display="none";\
				holder.style.left = (( pos.x == mxWidth ? pos.x - imgW + mrgW + 20 : pos.x - 20 ))+ "px";\
				holder.style.bottom = parseInt((mxHeight - imgH)/2) + "px";\
				holder.style.width  = imgW + "px";\
				holder.style.height = imgH + "px";\
				var low = doc.createElement("IMG");\
				var img = doc.createElement("IMG");\
				var loading = doc.createElement("span");\
				loading.className = "loading";\
				loading.style.width  = imgW + "px";\
				loading.style.height = imgH + "px";\
				holder.appendChild(loading);\
				img.onerror = function(){\
					holder.removeChild(img);\
					holder.removeChild(loading);\
					var sp = doc.createElement("span");\
					sp.className = "error";\
					sp.style.width  = imgW + "px";\
					sp.style.height = parseInt(imgH/1.83) + "px";\
					sp.style.paddingTop = parseInt(imgH/2.2) + "px";\
					holder.appendChild(sp);\
				};\
				img.onload = function(){\
					holder.removeChild(loading);\
					low.style.display = "none";\
				};\
				img.className = "high";\
				img.setAttribute("width",imgW);\
				img.setAttribute("height",imgH);\
				low.className = "low";\
				low.setAttribute("width",imgW);\
				low.setAttribute("height",imgH);\
				holder.appendChild( low );\
				holder.appendChild( img );\
				if(ratio){\
					var sp = doc.createElement("span");\
					sp.className = "ratio";\
					sp.innerHTML = parseInt( ratio * 100 ) + "% <span style=\'font-size:18pt;\'>:: " + (w||imgW) + "x" + (h||imgH) + "</span>";\
					holder.appendChild(sp);\
				}\
				window.clearTimeout(iPrevID);\
				iPrevID = window.setTimeout(function(){\
					isPreview = true;\
					low.src = thumb.src;\
					img.src = thumb.parentNode.rel;\
					holder.style.display = "block";\
				},iPrevRT);\
			};\
			function hideImg(timeout){\
				window.clearTimeout(iPrevID);\
				var onTimeout = function(){\
					if(isPreview && isOverPreview) return;\
					iPrevID=0;\
					isPreview=false;\
					var holder=$id("gfx-iprev");\
					if(!holder) return;\
					holder.style.display="none";\
					while(holder.firstChild){\
						holder.removeChild(holder.firstChild);\
					}\
				};\
				if(timeout) iPrevID=window.setTimeout(onTimeout, timeout);\
				else onTimeout();\
			};\
			function hideImgForced(){\
				isOverPreview=false;\
				hideImg();\
			}\
			if(window.opera){\
				window.addEventListener("mousewheel", hideImgForced, false);\
			}else{\
				window.addEventListener("DOMMouseScroll", hideImgForced, false);\
			}\
			';
		} /* END ImagePreview */
	}

	/* Add JavaScript Object to the Body */
	var js = doc.createElement("script");
	js.setAttribute("type","text/javascript");
	js.appendChild(doc.createTextNode(STR));
	//js.innerHTML = STR;
	head.appendChild(js);
	delete STR;
};
/* END GFX_Scripts function */










/*************************************************************************************************************
                                     M O O T O O L S       F R A M E W O R K
**************************************************************************************************************/

//MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:"1.2.4",build:"0d9113241a90b9cd5643b926795852a2026710d4"};
var Native=function(k){k=k||{};var a=k.name;var i=k.legacy;var b=k.protect;var c=k.implement;var h=k.generics;var f=k.initialize;var g=k.afterImplement||function(){};var d=f||i;h=h!==false;d.constructor=Native;d.$family={name:"native"};if(i&&f){d.prototype=i.prototype;}/*Fix4GM*/if(!d.prototype)d.prototype={};/*EndFix*/d.prototype.constructor=d;if(a){var e=a.toLowerCase();d.prototype.$family={name:e};Native.typize(d,e);}var j=function(n,l,o,m){if(!b||m||!n.prototype[l]){n.prototype[l]=o;}if(h){Native.genericize(n,l,b);}g.call(n,l,o);return n;};d.alias=function(n,l,p){if(typeof n=="string"){var o=this.prototype[n];if((n=o)){return j(this,l,n,p);}}for(var m in n){this.alias(m,n[m],l);}return this;};d.implement=function(m,l,o){if(typeof m=="string"){return j(this,m,l,o);}for(var n in m){j(this,n,m[n],l);}return this;};if(c){d.implement(c);}return d;};Native.genericize=function(b,c,a){if((!a||!b[c])&&typeof b.prototype[c]=="function"){b[c]=function(){var d=Array.prototype.slice.call(arguments);return b.prototype[c].apply(d.shift(),d);};}};Native.implement=function(d,c){for(var b=0,a=d.length;b<a;b++){d[b].implement(c);}};Native.typize=function(a,b){if(!a.type){a.type=function(c){return($type(c)===b);};}};(function(){var a={Array:Array,Date:Date,Function:Function,Number:Number,RegExp:RegExp,String:String};for(var h in a){new Native({name:h,initialize:a[h],protect:true});}var d={"boolean":Boolean,"native":Native,object:Object};for(var c in d){Native.typize(d[c],c);}var f={Array:["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],String:["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};for(var e in f){for(var b=f[e].length;b--;){Native.genericize(a[e],f[e][b],true);}}})();
var Hash=new Native({name:"Hash",initialize:function(a){if($type(a)=="hash"){a=$unlink(a.getClean());}for(var b in a){this[b]=a[b];}return this;}});Hash.implement({forEach:function(b,c){for(var a in this){if(this.hasOwnProperty(a)){b.call(c,this[a],a,this);}}},getClean:function(){var b={};for(var a in this){if(this.hasOwnProperty(a)){b[a]=this[a];}}return b;},getLength:function(){var b=0;for(var a in this){if(this.hasOwnProperty(a)){b++;}}return b;}});Hash.alias("forEach","each");Array.implement({forEach:function(c,d){for(var b=0,a=this.length;b<a;b++){c.call(d,this[b],b,this);}}});Array.alias("forEach","each");
function $A(b){if(b.item){var a=b.length,c=new Array(a);while(a--){c[a]=b[a];}return c;}return Array.prototype.slice.call(b);}function $arguments(a){return function(){return arguments[a];};}function $chk(a){return !!(a||a===0);}function $clear(a){clearTimeout(a);clearInterval(a);return null;}function $defined(a){return(a!=undefined);}function $each(c,b,d){var a=$type(c);((a=="arguments"||a=="collection"||a=="array")?Array:Hash).each(c,b,d);}function $empty(){}function $extend(c,a){for(var b in (a||{})){c[b]=a[b];}return c;}function $H(a){return new Hash(a);}function $lambda(a){return($type(a)=="function")?a:function(){return a;};}function $merge(){var a=Array.slice(arguments);a.unshift({});return $mixin.apply(null,a);}function $mixin(e){for(var d=1,a=arguments.length;d<a;d++){var b=arguments[d];if($type(b)!="object"){continue;}for(var c in b){var g=b[c],f=e[c];e[c]=(f&&$type(g)=="object"&&$type(f)=="object")?$mixin(f,g):$unlink(g);}}return e;}function $pick(){for(var b=0,a=arguments.length;b<a;b++){if(arguments[b]!=undefined){return arguments[b];}}return null;}function $random(b,a){return Math.floor(Math.random()*(a-b+1)+b);}function $splat(b){var a=$type(b);return(a)?((a!="array"&&a!="arguments")?[b]:b):[];}var $time=Date.now||function(){return +new Date;};function $try(){for(var b=0,a=arguments.length;b<a;b++){try{return arguments[b]();}catch(c){}}return null;}function $type(a){if(a==undefined){return false;}if(a.$family){return(a.$family.name=="number"&&!isFinite(a))?false:a.$family.name;}if(a.nodeName){switch(a.nodeType){case 1:return"element";case 3:return(/\S/).test(a.nodeValue)?"textnode":"whitespace";}}else{if(typeof a.length=="number"){if(a.callee){return"arguments";}else{if(a.item){return"collection";}}}}return typeof a;}function $unlink(c){var b;switch($type(c)){case"object":b={};for(var e in c){b[e]=$unlink(c[e]);}break;case"hash":b=new Hash(c);break;case"array":b=[];for(var d=0,a=c.length;d<a;d++){b[d]=$unlink(c[d]);}break;default:return c;}return b;}
var Browser=$merge({Engine:{name:"unknown",version:0},Platform:{name:(window.orientation!=undefined)?"ipod":(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase()},Features:{xpath:!!(document.evaluate),air:!!(window.runtime),query:!!(document.querySelector)},Plugins:{},Engines:{presto:function(){return(!window.opera)?false:((arguments.callee.caller)?960:((document.getElementsByClassName)?950:925));},trident:function(){return(!window.ActiveXObject)?false:((window.XMLHttpRequest)?((document.querySelectorAll)?6:5):4);},webkit:function(){return(navigator.taintEnabled)?false:((Browser.Features.xpath)?((Browser.Features.query)?525:420):419);},gecko:function(){return(!document.getBoxObjectFor&&window.mozInnerScreenX==null)?false:((document.getElementsByClassName)?19:18);}}},Browser||{});Browser.Platform[Browser.Platform.name]=true;Browser.detect=function(){for(var b in this.Engines){var a=this.Engines[b]();if(a){this.Engine={name:b,version:a};this.Engine[b]=this.Engine[b+a]=true;break;}}return{name:b,version:a};};Browser.detect();Browser.Request=function(){return $try(function(){return new XMLHttpRequest();},function(){return new ActiveXObject("MSXML2.XMLHTTP");},function(){return new ActiveXObject("Microsoft.XMLHTTP");});};Browser.Features.xhr=!!(Browser.Request());Browser.Plugins.Flash=(function(){var a=($try(function(){return navigator.plugins["Shockwave Flash"].description;},function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");})||"0 r0").match(/\d+/g);return{version:parseInt(a[0]||0+"."+a[1],10)||0,build:parseInt(a[2],10)||0};})();function $exec(b){if(!b){return b;}if(window.execScript){window.execScript(b);}else{var a=document.createElement("script");a.setAttribute("type","text/javascript");a[(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerText":"text"]=b;document.head.appendChild(a);document.head.removeChild(a);}return b;}Native.UID=1;var $uid=(Browser.Engine.trident)?function(a){return(a.uid||(a.uid=[Native.UID++]))[0];}:function(a){return a.uid||(a.uid=Native.UID++);};
var Window=new Native({name:"Window",legacy:(Browser.Engine.trident)?null:window.Window,initialize:function(a){$uid(a);if(!a.Element){a.Element=$empty;if(Browser.Engine.webkit){a.document.createElement("iframe");}a.Element.prototype=(Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{};}a.document.window=a;return $extend(a,Window.Prototype);},afterImplement:function(b,a){window[b]=Window.Prototype[b]=a;}});Window.Prototype={$family:{name:"window"}};new Window(window);
var Document=new Native({name:"Document",legacy:(Browser.Engine.trident)?null:window.Document,initialize:function(a){$uid(a);a.head=a.getElementsByTagName("head")[0];a.html=a.getElementsByTagName("html")[0];if(Browser.Engine.trident&&Browser.Engine.version<=4){$try(function(){a.execCommand("BackgroundImageCache",false,true);});}if(Browser.Engine.trident){a.window.attachEvent("onunload",function(){a.window.detachEvent("onunload",arguments.callee);a.head=a.html=a.window=null;});}return $extend(a,Document.Prototype);},afterImplement:function(b,a){document[b]=Document.Prototype[b]=a;}});Document.Prototype={$family:{name:"document"}};new Document(document);
Array.implement({every:function(c,d){for(var b=0,a=this.length;b<a;b++){if(!c.call(d,this[b],b,this)){return false;}}return true;},filter:function(d,e){var c=[];for(var b=0,a=this.length;b<a;b++){if(d.call(e,this[b],b,this)){c.push(this[b]);}}return c;},clean:function(){return this.filter($defined);},indexOf:function(c,d){var a=this.length;for(var b=(d<0)?Math.max(0,a+d):d||0;b<a;b++){if(this[b]===c){return b;}}return -1;},map:function(d,e){var c=[];for(var b=0,a=this.length;b<a;b++){c[b]=d.call(e,this[b],b,this);}return c;},some:function(c,d){for(var b=0,a=this.length;b<a;b++){if(c.call(d,this[b],b,this)){return true;}}return false;},associate:function(c){var d={},b=Math.min(this.length,c.length);for(var a=0;a<b;a++){d[c[a]]=this[a];}return d;},link:function(c){var a={};for(var e=0,b=this.length;e<b;e++){for(var d in c){if(c[d](this[e])){a[d]=this[e];delete c[d];break;}}}return a;},contains:function(a,b){return this.indexOf(a,b)!=-1;},extend:function(c){for(var b=0,a=c.length;b<a;b++){this.push(c[b]);}return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[$random(0,this.length-1)]:null;},include:function(a){if(!this.contains(a)){this.push(a);}return this;},combine:function(c){for(var b=0,a=c.length;b<a;b++){this.include(c[b]);}return this;},erase:function(b){for(var a=this.length;a--;a){if(this[a]===b){this.splice(a,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var d=[];for(var b=0,a=this.length;b<a;b++){var c=$type(this[b]);if(!c){continue;}d=d.concat((c=="array"||c=="collection"||c=="arguments")?Array.flatten(this[b]):this[b]);}return d;},hexToRgb:function(b){if(this.length!=3){return null;}var a=this.map(function(c){if(c.length==1){c+=c;}return c.toInt(16);});return(b)?a:"rgb("+a+")";},rgbToHex:function(d){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!d){return"transparent";}var b=[];for(var a=0;a<3;a++){var c=(this[a]-0).toString(16);b.push((c.length==1)?"0"+c:c);}return(d)?b:"#"+b.join("");}});
Function.implement({extend:function(a){for(var b in a){this[b]=a[b];}return this;},create:function(b){var a=this;b=b||{};return function(d){var c=b.arguments;c=(c!=undefined)?$splat(c):Array.slice(arguments,(b.event)?1:0);if(b.event){c=[d||window.event].extend(c);}var e=function(){return a.apply(b.bind||null,c);};if(b.delay){return setTimeout(e,b.delay);}if(b.periodical){return setInterval(e,b.periodical);}if(b.attempt){return $try(e);}return e();};},run:function(a,b){return this.apply(b,$splat(a));},pass:function(a,b){return this.create({bind:b,arguments:a});},bind:function(b,a){return this.create({bind:b,arguments:a});},bindWithEvent:function(b,a){return this.create({bind:b,arguments:a,event:true});},attempt:function(a,b){return this.create({bind:b,arguments:a,attempt:true})();},delay:function(b,c,a){return this.create({bind:c,arguments:a,delay:b})();},periodical:function(c,b,a){return this.create({bind:b,arguments:a,periodical:c})();}});
Number.implement({limit:function(b,a){return Math.min(a,Math.max(b,this));},round:function(a){a=Math.pow(10,a||0);return Math.round(this*a)/a;},times:function(b,c){for(var a=0;a<this;a++){b.call(c,a,this);}},toFloat:function(){return parseFloat(this);},toInt:function(a){return parseInt(this,a||10);}});Number.alias("times","each");(function(b){var a={};b.each(function(c){if(!Number[c]){a[c]=function(){return Math[c].apply(null,[this].concat($A(arguments)));};}});Number.implement(a);})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);
String.implement({test:function(a,b){return((typeof a=="string")?new RegExp(a,b):a).test(this);},contains:function(a,b){return(b)?(b+this+b).indexOf(b+a+b)>-1:this.indexOf(a)>-1;},trim:function(){return this.replace(/^\s+|\s+$/g,"");},clean:function(){return this.replace(/\s+/g," ").trim();},camelCase:function(){return this.replace(/-\D/g,function(a){return a.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/[A-Z]/g,function(a){return("-"+a.charAt(0).toLowerCase());});},capitalize:function(){return this.replace(/(?:^|\s)\w/g,function(a){return a.toUpperCase();});},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");},toInt:function(a){return parseInt(this,a||10);},toFloat:function(){return parseFloat(this);},hexToRgb:function(b){var a=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
return(a)?a.slice(1).hexToRgb(b):null;},rgbToHex:function(b){var a=this.match(/\d{1,3}/g);return(a)?a.rgbToHex(b):null;},stripScripts:function(b){var a="";var c=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){a+=arguments[1]+"\n";return"";});if(b===true){$exec(a);}else{if($type(b)=="function"){b(a,c);}}return c;},substitute:function(a,b){return this.replace(b||(/\\?\{([^{}]+)\}/g),function(d,c){if(d.charAt(0)=="\\"){return d.slice(1);}return(a[c]!=undefined)?a[c]:"";
});}});
Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(b){for(var a in this){if(this.hasOwnProperty(a)&&this[a]===b){return a;}}return null;},hasValue:function(a){return(Hash.keyOf(this,a)!==null);},extend:function(a){Hash.each(a||{},function(c,b){Hash.set(this,b,c);},this);return this;},combine:function(a){Hash.each(a||{},function(c,b){Hash.include(this,b,c);},this);return this;},erase:function(a){if(this.hasOwnProperty(a)){delete this[a];}return this;},get:function(a){return(this.hasOwnProperty(a))?this[a]:null;},set:function(a,b){if(!this[a]||this.hasOwnProperty(a)){this[a]=b;}return this;},empty:function(){Hash.each(this,function(b,a){delete this[a];},this);return this;},include:function(a,b){if(this[a]==undefined){this[a]=b;}return this;},map:function(b,c){var a=new Hash;Hash.each(this,function(e,d){a.set(d,b.call(c,e,d,this));},this);return a;},filter:function(b,c){var a=new Hash;Hash.each(this,function(e,d){if(b.call(c,e,d,this)){a.set(d,e);}},this);return a;},every:function(b,c){for(var a in this){if(this.hasOwnProperty(a)&&!b.call(c,this[a],a)){return false;}}return true;},some:function(b,c){for(var a in this){if(this.hasOwnProperty(a)&&b.call(c,this[a],a)){return true;}}return false;},getKeys:function(){var a=[];Hash.each(this,function(c,b){a.push(b);});return a;},getValues:function(){var a=[];Hash.each(this,function(b){a.push(b);});return a;},toQueryString:function(a){var b=[];Hash.each(this,function(f,e){if(a){e=a+"["+e+"]";}var d;switch($type(f)){case"object":d=Hash.toQueryString(f,e);break;case"array":var c={};f.each(function(h,g){c[g]=h;});d=Hash.toQueryString(c,e);break;default:d=e+"="+encodeURIComponent(f);}if(f!=undefined){b.push(d);}});return b.join("&");}});Hash.alias({keyOf:"indexOf",hasValue:"contains"});
var Event=new Native({name:"Event",initialize:function(a,f){f=f||window;var k=f.document;a=a||f.event;if(a.$extended){return a;}this.$extended=true;var j=a.type;var g=a.target||a.srcElement;while(g&&g.nodeType==3){g=g.parentNode;}if(j.test(/key/)){var b=a.which||a.keyCode;var m=Event.Keys.keyOf(b);if(j=="keydown"){var d=b-111;if(d>0&&d<13){m="f"+d;}}m=m||String.fromCharCode(b).toLowerCase();}else{if(j.match(/(click|mouse|menu)/i)){k=(!k.compatMode||k.compatMode=="CSS1Compat")?k.html:k.body;var i={x:a.pageX||a.clientX+k.scrollLeft,y:a.pageY||a.clientY+k.scrollTop};var c={x:(a.pageX)?a.pageX-f.pageXOffset:a.clientX,y:(a.pageY)?a.pageY-f.pageYOffset:a.clientY};if(j.match(/DOMMouseScroll|mousewheel/)){var h=(a.wheelDelta)?a.wheelDelta/120:-(a.detail||0)/3;}var e=(a.which==3)||(a.button==2);var l=null;if(j.match(/over|out/)){switch(j){case"mouseover":l=a.relatedTarget||a.fromElement;break;case"mouseout":l=a.relatedTarget||a.toElement;}if(!(function(){while(l&&l.nodeType==3){l=l.parentNode;}return true;}).create({attempt:Browser.Engine.gecko})()){l=false;}}}}return $extend(this,{event:a,type:j,page:i,client:c,rightClick:e,wheel:h,relatedTarget:l,target:g,code:b,key:m,shift:a.shiftKey,control:a.ctrlKey,alt:a.altKey,meta:a.metaKey});}});Event.Keys=new Hash({enter:13,up:38,down:40,left:37,right:39,esc:27,space:32,backspace:8,tab:9,"delete":46});Event.implement({stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation){this.event.stopPropagation();}else{this.event.cancelBubble=true;}return this;},preventDefault:function(){if(this.event.preventDefault){this.event.preventDefault();}else{this.event.returnValue=false;}return this;}});
function Class(b){if(b instanceof Function){b={initialize:b};}var a=function(){Object.reset(this);if(a._prototyping){return this;}this._current=$empty;var c=(this.initialize)?this.initialize.apply(this,arguments):this;delete this._current;delete this.caller;return c;}.extend(this);a.implement(b);a.constructor=Class;a.prototype.constructor=a;return a;}Function.prototype.protect=function(){this._protected=true;return this;};Object.reset=function(a,c){if(c==null){for(var e in a){Object.reset(a,e);}return a;}delete a[c];switch($type(a[c])){case"object":var d=function(){};d.prototype=a[c];var b=new d;a[c]=Object.reset(b);break;case"array":a[c]=$unlink(a[c]);break;}return a;};new Native({name:"Class",initialize:Class}).extend({instantiate:function(b){b._prototyping=true;var a=new b;delete b._prototyping;return a;},wrap:function(a,b,c){if(c._origin){c=c._origin;}return function(){if(c._protected&&this._current==null){throw new Error('The method "'+b+'" cannot be called.');}var e=this.caller,f=this._current;this.caller=f;this._current=arguments.callee;var d=c.apply(this,arguments);this._current=f;this.caller=e;return d;}.extend({_owner:a,_origin:c,_name:b});}});Class.implement({implement:function(a,d){if($type(a)=="object"){for(var e in a){this.implement(e,a[e]);}return this;}var f=Class.Mutators[a];if(f){d=f.call(this,d);if(d==null){return this;}}var c=this.prototype;switch($type(d)){case"function":if(d._hidden){return this;}c[a]=Class.wrap(this,a,d);break;case"object":var b=c[a];if($type(b)=="object"){$mixin(b,d);}else{c[a]=$unlink(d);}break;case"array":c[a]=$unlink(d);break;default:c[a]=d;}return this;}});
Class.Mutators={Extends:function(a){this.parent=a;this.prototype=Class.instantiate(a);this.implement("parent",function(){var b=this.caller._name,c=this.caller._owner.parent.prototype[b];if(!c){throw new Error('The method "'+b+'" has no parent.');}return c.apply(this,arguments);}.protect());},Implements:function(a){$splat(a).each(function(b){if(b instanceof Function){b=Class.instantiate(b);}this.implement(b);},this);}};
var Chain=new Class({$chain:[],chain:function(){this.$chain.extend(Array.flatten(arguments));return this;},callChain:function(){return(this.$chain.length)?this.$chain.shift().apply(this,arguments):false;},clearChain:function(){this.$chain.empty();return this;}});
var Events=new Class({$events:{},addEvent:function(c,b,a){c=Events.removeOn(c);if(b!=$empty){this.$events[c]=this.$events[c]||[];this.$events[c].include(b);if(a){b.internal=true;}}return this;},addEvents:function(a){for(var b in a){this.addEvent(b,a[b]);}return this;},fireEvent:function(c,b,a){c=Events.removeOn(c);if(!this.$events||!this.$events[c]){return this;}this.$events[c].each(function(d){d.create({bind:this,delay:a,"arguments":b})();},this);return this;},removeEvent:function(b,a){b=Events.removeOn(b);if(!this.$events[b]){return this;}if(!a.internal){this.$events[b].erase(a);}return this;},removeEvents:function(c){var d;if($type(c)=="object"){for(d in c){this.removeEvent(d,c[d]);}return this;}if(c){c=Events.removeOn(c);}for(d in this.$events){if(c&&c!=d){continue;}var b=this.$events[d];for(var a=b.length;a--;a){this.removeEvent(d,b[a]);}}return this;}});Events.removeOn=function(a){return a.replace(/^on([A-Z])/,function(b,c){return c.toLowerCase();});};
var Options=new Class({setOptions:function(){this.options=$merge.run([this.options].extend(arguments));if(!this.addEvent){return this;}for(var a in this.options){if($type(this.options[a])!="function"||!(/^on[A-Z]/).test(a)){continue;}this.addEvent(a,this.options[a]);delete this.options[a];}return this;}});
var Element=new Native({name:"Element",legacy:window.Element,initialize:function(a,b){var c=Element.Constructors.get(a);if(c){return c(b);}if(typeof a=="string"){return document.newElement(a,b);}return document.id(a).set(b);},afterImplement:function(a,b){Element.Prototype[a]=b;if(Array[a]){return;}Elements.implement(a,function(){var c=[],g=true;for(var e=0,d=this.length;e<d;e++){var f=this[e][a].apply(this[e],arguments);c.push(f);if(g){g=($type(f)=="element");}}return(g)?new Elements(c):c;});}});Element.Prototype={$family:{name:"element"}};Element.Constructors=new Hash;var IFrame=new Native({name:"IFrame",generics:false,initialize:function(){var f=Array.link(arguments,{properties:Object.type,iframe:$defined});var d=f.properties||{};var c=document.id(f.iframe);var e=d.onload||$empty;delete d.onload;d.id=d.name=$pick(d.id,d.name,c?(c.id||c.name):"IFrame_"+$time());c=new Element(c||"iframe",d);var b=function(){var g=$try(function(){return c.contentWindow.location.host;});if(!g||g==window.location.host){var h=new Window(c.contentWindow);new Document(c.contentWindow.document);$extend(h.Element.prototype,Element.Prototype);}e.call(c.contentWindow,c.contentWindow.document);};var a=$try(function(){return c.contentWindow;});((a&&a.document.body)||window.frames[d.id])?b():c.addListener("load",b);return c;}});
var Elements=new Native({initialize:function(f,b){b=$extend({ddup:true,cash:true},b);f=f||[];if(b.ddup||b.cash){var g={},e=[];for(var c=0,a=f.length;c<a;c++){var d=document.id(f[c],!b.cash);if(b.ddup){if(g[d.uid]){continue;}g[d.uid]=true;}if(d){e.push(d);}}f=e;}return(b.cash)?$extend(f,this):f;}});Elements.implement({filter:function(a,b){if(!a){return this;}return new Elements(Array.filter(this,(typeof a=="string")?function(c){return c.match(a);}:a,b));}});
Document.implement({newElement:function(a,b){if(Browser.Engine.trident&&b){["name","type","checked"].each(function(c){if(!b[c]){return;}a+=" "+c+'="'+b[c]+'"';if(c!="checked"){delete b[c];}});a="<"+a+">";}return document.id(this.createElement(a)).set(b);},newTextNode:function(a){return this.createTextNode(a);},getDocument:function(){/*return this;*//*Fix4GM*/return $id(this);/*EndFix*/},getWindow:function(){/*return this.window;*//*Fix4GM*/return (new Window(this.defaultView||this.parentWindow));/*EndFix*/},id:(function(){var a={string:function(d,c,b){d=b.getElementById(d);return(d)?a.element(d,c):null;},element:function(b,e){$uid(b);if(!e&&!b.$family&&!(/^object|embed$/i).test(b.tagName)){var c=Element.Prototype;for(var d in c){b[d]=c[d];}}return b;},object:function(c,d,b){if(c.toElement){return a.element(c.toElement(b),d);}return null;}};a.textnode=a.whitespace=a.window=a.document=$arguments(0);return function(c,e,d){if(c&&c.$family&&c.uid){return c;}var b=$type(c);return(a[b])?a[b](c,e,d||document):null;};})()});
if(window.$id==null){Window.implement({$id:function(a,b){/*return document.id(a,b,this.document);*//*Fix4GM*/return document.id(a,b,(new Document(this.document)));/*EndFix*/}});}Window.implement({$$:function(a){/*if(arguments.length==1&&typeof a=="string"){return this.document.getElements(a);}*//*Fix4GM*/if(arguments.length==1&&typeof a=='string'){return (new Document(this.document)).getElements(a);}/*EndFix*/var f=[];var c=Array.flatten(arguments);for(var d=0,b=c.length;d<b;d++){var e=c[d];switch($type(e)){case"element":f.push(e);break;/*case"string":f.extend(this.document.getElements(e,true));*//*Fix4GM*/case 'string':f.extend((new Document(this.document)).getElements(e,true));/*EndFix*/}}return new Elements(f);},getDocument:function(){/*return this.document;*//*Fix4GM*/return (new Document(this.document));/*EndFix*/},getWindow:function(){return this;}});
Native.implement([Element,Document],{getElement:function(a,b){return document.id(this.getElements(a,true)[0]||null,b);},getElements:function(a,d){a=a.split(",");var c=[];var b=(a.length>1);a.each(function(e){var f=this.getElementsByTagName(e.trim());(b)?c.extend(f):c=f;},this);return new Elements(c,{ddup:b,cash:!d});}});(function(){var h={},f={};var i={input:"checked",option:"selected",textarea:(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerHTML":"value"};var c=function(l){return(f[l]||(f[l]={}));};var g=function(n,l){if(!n){return;}var m=n.uid;if(Browser.Engine.trident){if(n.clearAttributes){var q=l&&n.cloneNode(false);n.clearAttributes();if(q){n.mergeAttributes(q);}}else{if(n.removeEvents){n.removeEvents();}}if((/object/i).test(n.tagName)){for(var o in n){if(typeof n[o]=="function"){n[o]=$empty;}}Element.dispose(n);}}if(!m){return;}h[m]=f[m]=null;};var d=function(){Hash.each(h,g);if(Browser.Engine.trident){$A(document.getElementsByTagName("object")).each(g);}if(window.CollectGarbage){CollectGarbage();}h=f=null;};var j=function(n,l,s,m,p,r){var o=n[s||l];var q=[];while(o){if(o.nodeType==1&&(!m||Element.match(o,m))){if(!p){return document.id(o,r);}q.push(o);}o=o[l];}return(p)?new Elements(q,{ddup:false,cash:!r}):null;};var e={html:"innerHTML","class":"className","for":"htmlFor",defaultValue:"defaultValue",text:(Browser.Engine.trident||(Browser.Engine.webkit&&Browser.Engine.version<420))?"innerText":"textContent"};var b=["compact","nowrap","ismap","declare","noshade","checked","disabled","readonly","multiple","selected","noresize","defer"];var k=["value","type","defaultValue","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","maxLength","readOnly","rowSpan","tabIndex","useMap"];b=b.associate(b);Hash.extend(e,b);Hash.extend(e,k.associate(k.map(String.toLowerCase)));var a={before:function(m,l){if(l.parentNode){l.parentNode.insertBefore(m,l);}},after:function(m,l){if(!l.parentNode){return;}var n=l.nextSibling;(n)?l.parentNode.insertBefore(m,n):l.parentNode.appendChild(m);},bottom:function(m,l){l.appendChild(m);},top:function(m,l){var n=l.firstChild;(n)?l.insertBefore(m,n):l.appendChild(m);}};a.inside=a.bottom;Hash.each(a,function(l,m){m=m.capitalize();Element.implement("inject"+m,function(n){l(this,document.id(n,true));return this;});Element.implement("grab"+m,function(n){l(document.id(n,true),this);return this;});});
Element.implement({set:function(o,m){switch($type(o)){case"object":for(var n in o){this.set(n,o[n]);}break;case"string":var l=Element.Properties.get(o);(l&&l.set)?l.set.apply(this,Array.slice(arguments,1)):this.setProperty(o,m);}return this;},get:function(m){var l=Element.Properties.get(m);return(l&&l.get)?l.get.apply(this,Array.slice(arguments,1)):this.getProperty(m);},erase:function(m){var l=Element.Properties.get(m);(l&&l.erase)?l.erase.apply(this):this.removeProperty(m);return this;},setProperty:function(m,n){var l=e[m];if(n==undefined){return this.removeProperty(m);}if(l&&b[m]){n=!!n;}(l)?this[l]=n:this.setAttribute(m,""+n);return this;},setProperties:function(l){for(var m in l){this.setProperty(m,l[m]);}return this;},getProperty:function(m){var l=e[m];var n=(l)?this[l]:this.getAttribute(m,2);return(b[m])?!!n:(l)?n:n||null;},getProperties:function(){var l=$A(arguments);return l.map(this.getProperty,this).associate(l);},removeProperty:function(m){var l=e[m];(l)?this[l]=(l&&b[m])?false:"":this.removeAttribute(m);return this;},removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this;},hasClass:function(l){return this.className.contains(l," ");},addClass:function(l){if(!this.hasClass(l)){this.className=(this.className+" "+l).clean();}return this;},removeClass:function(l){this.className=this.className.replace(new RegExp("(^|\\s)"+l+"(?:\\s|$)"),"$1");return this;},toggleClass:function(l){return this.hasClass(l)?this.removeClass(l):this.addClass(l);},adopt:function(){Array.flatten(arguments).each(function(l){l=document.id(l,true);if(l){this.appendChild(l);}},this);return this;},appendText:function(m,l){return this.grab(this.getDocument().newTextNode(m),l);},grab:function(m,l){a[l||"bottom"](document.id(m,true),this);return this;},inject:function(m,l){a[l||"bottom"](this,document.id(m,true));return this;},replaces:function(l){l=document.id(l,true);l.parentNode.replaceChild(this,l);return this;},wraps:function(m,l){m=document.id(m,true);return this.replaces(m).grab(m,l);},getPrevious:function(l,m){return j(this,"previousSibling",null,l,false,m);},getAllPrevious:function(l,m){return j(this,"previousSibling",null,l,true,m);},getNext:function(l,m){return j(this,"nextSibling",null,l,false,m);},getAllNext:function(l,m){return j(this,"nextSibling",null,l,true,m);},getFirst:function(l,m){return j(this,"nextSibling","firstChild",l,false,m);},getLast:function(l,m){return j(this,"previousSibling","lastChild",l,false,m);},getParent:function(l,m){return j(this,"parentNode",null,l,false,m);},getParents:function(l,m){return j(this,"parentNode",null,l,true,m);},getSiblings:function(l,m){return this.getParent().getChildren(l,m).erase(this);},getChildren:function(l,m){return j(this,"nextSibling","firstChild",l,true,m);},getWindow:function(){/*return this.ownerDocument.window;*//*Fix4GM*/return (new Window(this.ownerDocument.defaultView||this.ownerDocument.parentWindow));/*EndFix*/},getDocument:function(){/*return this.ownerDocument;*//*Fix4GM*/return new Document(this.ownerDocument);/*EndFix*/},getElementById:function(o,n){var m=this.ownerDocument.getElementById(o);if(!m){return null;}for(var l=m.parentNode;l!=this;l=l.parentNode){if(!l){return null;}}return document.id(m,n);},getSelected:function(){return new Elements($A(this.options).filter(function(l){return l.selected;}));},getComputedStyle:function(m){/*if(this.currentStyle){return this.currentStyle[m.camelCase()];}var l=this.getDocument().defaultView.getComputedStyle(this,null);*//*Fix4GM*/var $this=$id(this);if($this.currentStyle){return $this.currentStyle[m.camelCase()];}var l=$this.getDocument().defaultView.getComputedStyle($this,null);/*EndFix*/return(l)?l.getPropertyValue([m.hyphenate()]):null;},toQueryString:function(){var l=[];this.getElements("input, select, textarea",true).each(function(m){if(!m.name||m.disabled||m.type=="submit"||m.type=="reset"||m.type=="file"){return;}var n=(m.tagName.toLowerCase()=="select")?Element.getSelected(m).map(function(o){return o.value;}):((m.type=="radio"||m.type=="checkbox")&&!m.checked)?null:m.value;$splat(n).each(function(o){if(typeof o!="undefined"){l.push(m.name+"="+encodeURIComponent(o));}});});return l.join("&");},clone:function(o,l){o=o!==false;var r=this.cloneNode(o);var n=function(v,u){if(!l){v.removeAttribute("id");}if(Browser.Engine.trident){v.clearAttributes();v.mergeAttributes(u);v.removeAttribute("uid");if(v.options){var w=v.options,s=u.options;for(var t=w.length;t--;){w[t].selected=s[t].selected;}}}var x=i[u.tagName.toLowerCase()];if(x&&u[x]){v[x]=u[x];}};if(o){var p=r.getElementsByTagName("*"),q=this.getElementsByTagName("*");for(var m=p.length;m--;){n(p[m],q[m]);}}n(r,this);return document.id(r);},destroy:function(){Element.empty(this);Element.dispose(this);g(this,true);return null;},empty:function(){$A(this.childNodes).each(function(l){Element.destroy(l);});return this;},dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this;},hasChild:function(l){l=document.id(l,true);if(!l){return false;}if(Browser.Engine.webkit&&Browser.Engine.version<420){return $A(this.getElementsByTagName(l.tagName)).contains(l);}return(this.contains)?(this!=l&&this.contains(l)):!!(this.compareDocumentPosition(l)&16);},match:function(l){return(!l||(l==this)||(Element.get(this,"tag")==l));}});
Native.implement([Element,Window,Document],{addListener:function(o,n){if(o=="unload"){var l=n,m=this;n=function(){m.removeListener("unload",n);l();};}else{h[this.uid]=this;}if(this.addEventListener){this.addEventListener(o,n,false);}else{this.attachEvent("on"+o,n);}return this;},removeListener:function(m,l){if(this.removeEventListener){this.removeEventListener(m,l,false);}else{this.detachEvent("on"+m,l);}return this;},retrieve:function(m,l){var o=c(this.uid),n=o[m];if(l!=undefined&&n==undefined){n=o[m]=l;}return $pick(n);},store:function(m,l){var n=c(this.uid);n[m]=l;return this;},eliminate:function(l){var m=c(this.uid);delete m[l];return this;}});
window.addListener("unload",d);})();
Element.Properties=new Hash;
Element.Properties.style={set:function(a){this.style.cssText=a;},get:function(){return this.style.cssText;},erase:function(){this.style.cssText="";}};
Element.Properties.tag={get:function(){return this.tagName.toLowerCase();}};
Element.Properties.html=(function(){var c=document.createElement("div");var a={table:[1,"<table>","</table>"],select:[1,"<select>","</select>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"]};a.thead=a.tfoot=a.tbody;var b={set:function(){var e=Array.flatten(arguments).join("");var f=Browser.Engine.trident&&a[this.get("tag")];if(f){var g=c;g.innerHTML=f[1]+e+f[2];for(var d=f[0];d--;){g=g.firstChild;}this.empty().adopt(g.childNodes);}else{this.innerHTML=e;}}};b.erase=b.set;return b;})();
if(Browser.Engine.webkit&&Browser.Engine.version<420){Element.Properties.text={get:function(){if(this.innerText){return this.innerText;}var a=this.ownerDocument.newElement("div",{html:this.innerHTML}).inject(this.ownerDocument.body);var b=a.innerText;a.destroy();return b;}};}
Element.Properties.events={set:function(a){this.addEvents(a);}};
Native.implement([Element,Window,Document],{addEvent:function(e,g){var h=this.retrieve("events",{});h[e]=h[e]||{keys:[],values:[]};if(h[e].keys.contains(g)){return this;}h[e].keys.push(g);var f=e,a=Element.Events.get(e),c=g,i=this;if(a){if(a.onAdd){a.onAdd.call(this,g);}if(a.condition){c=function(j){if(a.condition.call(this,j)){return g.call(this,j);}return true;};}f=a.base||f;}var d=function(){return g.call(i);};var b=Element.NativeEvents[f];if(b){if(b==2){d=function(j){j=new Event(j,i.getWindow());if(c.call(i,j)===false){j.stop();}};}this.addListener(f,d);}h[e].values.push(d);return this;},removeEvent:function(c,b){var a=this.retrieve("events");if(!a||!a[c]){return this;}var f=a[c].keys.indexOf(b);if(f==-1){return this;}a[c].keys.splice(f,1);var e=a[c].values.splice(f,1)[0];var d=Element.Events.get(c);if(d){if(d.onRemove){d.onRemove.call(this,b);}c=d.base||c;}return(Element.NativeEvents[c])?this.removeListener(c,e):this;},addEvents:function(a){for(var b in a){this.addEvent(b,a[b]);}return this;},removeEvents:function(a){var c;if($type(a)=="object"){for(c in a){this.removeEvent(c,a[c]);}return this;}var b=this.retrieve("events");if(!b){return this;}if(!a){for(c in b){this.removeEvents(c);}this.eliminate("events");}else{if(b[a]){while(b[a].keys[0]){this.removeEvent(a,b[a].keys[0]);}b[a]=null;}}return this;},fireEvent:function(d,b,a){var c=this.retrieve("events");if(!c||!c[d]){return this;}c[d].keys.each(function(e){e.create({bind:this,delay:a,"arguments":b})();},this);return this;},cloneEvents:function(d,a){d=document.id(d);var c=d.retrieve("events");if(!c){return this;}if(!a){for(var b in c){this.cloneEvents(d,b);}}else{if(c[a]){c[a].keys.each(function(e){this.addEvent(a,e);},this);}}return this;}});
Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
(function(){var a=function(b){var c=b.relatedTarget;if(c==undefined){return true;}if(c===false){return false;}return($type(this)!="document"&&c!=this&&c.prefix!="xul"&&!this.hasChild(c));};Element.Events=new Hash({mouseenter:{base:"mouseover",condition:a},mouseleave:{base:"mouseout",condition:a},mousewheel:{base:(Browser.Engine.gecko)?"DOMMouseScroll":"mousewheel"}});})();
Element.Properties.styles={set:function(a){this.setStyles(a);}};
Element.Properties.opacity={set:function(a,b){if(!b){if(a==0){if(this.style.visibility!="hidden"){this.style.visibility="hidden";}}else{if(this.style.visibility!="visible"){this.style.visibility="visible";}}}if(!this.currentStyle||!this.currentStyle.hasLayout){this.style.zoom=1;}if(Browser.Engine.trident){this.style.filter=(a==1)?"":"alpha(opacity="+a*100+")";}this.style.opacity=a;this.store("opacity",a);},get:function(){return this.retrieve("opacity",1);}};
Element.implement({setOpacity:function(a){return this.set("opacity",a,true);},getOpacity:function(){return this.get("opacity");},setStyle:function(b,a){switch(b){case"opacity":return this.set("opacity",parseFloat(a));case"float":b=(Browser.Engine.trident)?"styleFloat":"cssFloat";}b=b.camelCase();if($type(a)!="string"){var c=(Element.Styles.get(b)||"@").split(" ");a=$splat(a).map(function(e,d){if(!c[d]){return"";}return($type(e)=="number")?c[d].replace("@",Math.round(e)):e;}).join(" ");}else{if(a==String(Number(a))){a=Math.round(a);}}this.style[b]=a;return this;},getStyle:function(g){switch(g){case"opacity":return this.get("opacity");case"float":g=(Browser.Engine.trident)?"styleFloat":"cssFloat";}g=g.camelCase();var a=this.style[g];if(!$chk(a)){a=[];for(var f in Element.ShortStyles){if(g!=f){continue;}for(var e in Element.ShortStyles[f]){a.push(this.getStyle(e));}return a.join(" ");}a=this.getComputedStyle(g);}if(a){a=String(a);var c=a.match(/rgba?\([\d\s,]+\)/);if(c){a=a.replace(c[0],c[0].rgbToHex());}}if(Browser.Engine.presto||(Browser.Engine.trident&&!$chk(parseInt(a,10)))){if(g.test(/^(height|width)$/)){var b=(g=="width")?["left","right"]:["top","bottom"],d=0;b.each(function(h){d+=this.getStyle("border-"+h+"-width").toInt()+this.getStyle("padding-"+h).toInt();},this);return this["offset"+g.capitalize()]-d+"px";}if((Browser.Engine.presto)&&String(a).test("px")){return a;}if(g.test(/(border(.+)Width|margin|padding)/)){return"0px";}}return a;},setStyles:function(b){for(var a in b){this.setStyle(a,b[a]);}return this;},getStyles:function(){var a={};Array.flatten(arguments).each(function(b){a[b]=this.getStyle(b);},this);return a;}});
Element.Styles=new Hash({left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@"});
Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};["Top","Right","Bottom","Left"].each(function(g){var f=Element.ShortStyles;var b=Element.Styles;["margin","padding"].each(function(h){var i=h+g;f[h][i]=b[i]="@px";});var e="border"+g;f.border[e]=b[e]="@px @ rgb(@, @, @)";var d=e+"Width",a=e+"Style",c=e+"Color";f[e]={};f.borderWidth[d]=f[e][d]=b[d]="@px";f.borderStyle[a]=f[e][a]=b[a]="@";f.borderColor[c]=f[e][c]=b[c]="rgb(@, @, @)";});
(function(){Element.implement({scrollTo:function(h,i){if(b(this)){this.getWindow().scrollTo(h,i);}else{this.scrollLeft=h;this.scrollTop=i;}return this;},getSize:function(){if(b(this)){return this.getWindow().getSize();}return{x:this.offsetWidth,y:this.offsetHeight};},getScrollSize:function(){if(b(this)){return this.getWindow().getScrollSize();}return{x:this.scrollWidth,y:this.scrollHeight};},getScroll:function(){if(b(this)){return this.getWindow().getScroll();}return{x:this.scrollLeft,y:this.scrollTop};},getScrolls:function(){var i=this,h={x:0,y:0};while(i&&!b(i)){h.x+=i.scrollLeft;h.y+=i.scrollTop;i=i.parentNode;}return h;},getOffsetParent:function(){var h=this;if(b(h)){return null;}if(!Browser.Engine.trident){return h.offsetParent;}while((h=h.parentNode)&&!b(h)){if(d(h,"position")!="static"){return h;}}return null;},getOffsets:function(){if(this.getBoundingClientRect){var j=this.getBoundingClientRect(),/*m=document.id(this.getDocument().documentElement),*//*Fix4GM*/m=document.id($id(this).getDocument().documentElement),/*EndFix*/p=m.getScroll(),k=this.getScrolls(),i=this.getScroll(),h=(d(this,"position")=="fixed");return{x:j.left.toInt()+k.x-i.x+((h)?0:p.x)-m.clientLeft,y:j.top.toInt()+k.y-i.y+((h)?0:p.y)-m.clientTop};}var l=this,n={x:0,y:0};if(b(this)){return n;}while(l&&!b(l)){n.x+=l.offsetLeft;n.y+=l.offsetTop;if(Browser.Engine.gecko){if(!f(l)){n.x+=c(l);n.y+=g(l);}var o=l.parentNode;if(o&&d(o,"overflow")!="visible"){n.x+=c(o);n.y+=g(o);}}else{if(l!=this&&Browser.Engine.webkit){n.x+=c(l);n.y+=g(l);}}l=l.offsetParent;}if(Browser.Engine.gecko&&!f(this)){n.x-=c(this);n.y-=g(this);}return n;},getPosition:function(k){if(b(this)){return{x:0,y:0};}var l=this.getOffsets(),i=this.getScrolls();var h={x:l.x-i.x,y:l.y-i.y};var j=(k&&(k=document.id(k)))?k.getPosition():{x:0,y:0};return{x:h.x-j.x,y:h.y-j.y};},getCoordinates:function(j){if(b(this)){return this.getWindow().getCoordinates();}var h=this.getPosition(j),i=this.getSize();var k={left:h.x,top:h.y,width:i.x,height:i.y};k.right=k.left+k.width;k.bottom=k.top+k.height;return k;},computePosition:function(h){return{left:h.x-e(this,"margin-left"),top:h.y-e(this,"margin-top")};},setPosition:function(h){return this.setStyles(this.computePosition(h));}});Native.implement([Document,Window],{getSize:function(){if(Browser.Engine.presto||Browser.Engine.webkit){var i=this.getWindow();return{x:i.innerWidth,y:i.innerHeight};}var h=a(this);return{x:h.clientWidth,y:h.clientHeight};},getScroll:function(){var i=this.getWindow(),h=a(this);return{x:i.pageXOffset||h.scrollLeft,y:i.pageYOffset||h.scrollTop};},getScrollSize:function(){var i=a(this),h=this.getSize();return{x:Math.max(i.scrollWidth,h.x),y:Math.max(i.scrollHeight,h.y)};},getPosition:function(){return{x:0,y:0};},getCoordinates:function(){var h=this.getSize();return{top:0,left:0,bottom:h.y,right:h.x,height:h.y,width:h.x};}});var d=Element.getComputedStyle;function e(h,i){return d(h,i).toInt()||0;}function f(h){return d(h,"-moz-box-sizing")=="border-box";}function g(h){return e(h,"border-top-width");}function c(h){return e(h,"border-left-width");}function b(h){return(/^(?:body|html)$/i).test(h.tagName);}function a(h){var i=h.getDocument();return(!i.compatMode||i.compatMode=="CSS1Compat")?i.html:i.body;}})();
Element.alias("setPosition","position");
Native.implement([Window,Document,Element],{getHeight:function(){return this.getSize().y;},getWidth:function(){return this.getSize().x;},getScrollTop:function(){return this.getScroll().y;},getScrollLeft:function(){return this.getScroll().x;},getScrollHeight:function(){return this.getScrollSize().y;},getScrollWidth:function(){return this.getScrollSize().x;},getTop:function(){return this.getPosition().y;},getLeft:function(){return this.getPosition().x;}});
Native.implement([Document,Element],{getElements:function(h,g){h=h.split(",");var c,e={};for(var d=0,b=h.length;d<b;d++){var a=h[d],f=Selectors.Utils.search(this,a,e);if(d!=0&&f.item){f=$A(f);}c=(d==0)?f:(c.item)?$A(c).concat(f):c.concat(f);}return new Elements(c,{ddup:(h.length>1),cash:!g});}});
Element.implement({match:function(b){if(!b||(b==this)){return true;}var d=Selectors.Utils.parseTagAndID(b);var a=d[0],e=d[1];if(!Selectors.Filters.byID(this,e)||!Selectors.Filters.byTag(this,a)){return false;}var c=Selectors.Utils.parseSelector(b);return(c)?Selectors.Utils.filter(this,c,{}):true;}});
var Selectors={Cache:{nth:{},parsed:{}}};Selectors.RegExps={id:(/#([\w-]+)/),tag:(/^(\w+|\*)/),quick:(/^(\w+|\*)$/),splitter:(/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),combined:(/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)};Selectors.Utils={chk:function(b,c){if(!c){return true;}var a=$uid(b);if(!c[a]){return c[a]=true;}return false;},parseNthArgument:function(h){if(Selectors.Cache.nth[h]){return Selectors.Cache.nth[h];}var e=h.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!e){return false;}var g=parseInt(e[1],10);var d=(g||g===0)?g:1;var f=e[2]||false;var c=parseInt(e[3],10)||0;if(d!=0){c--;while(c<1){c+=d;}while(c>=d){c-=d;}}else{d=c;f="index";}switch(f){case"n":e={a:d,b:c,special:"n"};break;case"odd":e={a:2,b:0,special:"n"};break;case"even":e={a:2,b:1,special:"n"};break;case"first":e={a:0,special:"index"};break;case"last":e={special:"last-child"};break;case"only":e={special:"only-child"};break;default:e={a:(d-1),special:"index"};}return Selectors.Cache.nth[h]=e;},parseSelector:function(e){if(Selectors.Cache.parsed[e]){return Selectors.Cache.parsed[e];}var d,h={classes:[],pseudos:[],attributes:[]};while((d=Selectors.RegExps.combined.exec(e))){var i=d[1],g=d[2],f=d[3],b=d[5],c=d[6],j=d[7];if(i){h.classes.push(i);}else{if(c){var a=Selectors.Pseudo.get(c);if(a){h.pseudos.push({parser:a,argument:j});}else{h.attributes.push({name:c,operator:"=",value:j});}}else{if(g){h.attributes.push({name:g,operator:f,value:b});}}}}if(!h.classes.length){delete h.classes;}if(!h.attributes.length){delete h.attributes;}if(!h.pseudos.length){delete h.pseudos;}if(!h.classes&&!h.attributes&&!h.pseudos){h=null;}return Selectors.Cache.parsed[e]=h;},parseTagAndID:function(b){var a=b.match(Selectors.RegExps.tag);var c=b.match(Selectors.RegExps.id);return[(a)?a[1]:"*",(c)?c[1]:false];},filter:function(f,c,e){var d;if(c.classes){for(d=c.classes.length;d--;d){var g=c.classes[d];if(!Selectors.Filters.byClass(f,g)){return false;}}}if(c.attributes){for(d=c.attributes.length;d--;d){var b=c.attributes[d];if(!Selectors.Filters.byAttribute(f,b.name,b.operator,b.value)){return false;}}}if(c.pseudos){for(d=c.pseudos.length;d--;d){var a=c.pseudos[d];if(!Selectors.Filters.byPseudo(f,a.parser,a.argument,e)){return false;}}}return true;},getByTagAndID:function(b,a,d){if(d){var c=(b.getElementById)?b.getElementById(d,true):Element.getElementById(b,d,true);return(c&&Selectors.Filters.byTag(c,a))?[c]:[];}else{return b.getElementsByTagName(a);}},search:function(o,h,t){var b=[];var c=h.trim().replace(Selectors.RegExps.splitter,function(k,j,i){b.push(j);return":)"+i;}).split(":)");var p,e,A;for(var z=0,v=c.length;z<v;z++){var y=c[z];if(z==0&&Selectors.RegExps.quick.test(y)){p=o.getElementsByTagName(y);continue;}var a=b[z-1];var q=Selectors.Utils.parseTagAndID(y);var B=q[0],r=q[1];if(z==0){p=Selectors.Utils.getByTagAndID(o,B,r);}else{var d={},g=[];for(var x=0,w=p.length;x<w;x++){g=Selectors.Getters[a](g,p[x],B,r,d);}p=g;}var f=Selectors.Utils.parseSelector(y);if(f){e=[];for(var u=0,s=p.length;u<s;u++){A=p[u];if(Selectors.Utils.filter(A,f,t)){e.push(A);}}p=e;}}return p;}};Selectors.Getters={" ":function(h,g,j,a,e){var d=Selectors.Utils.getByTagAndID(g,j,a);for(var c=0,b=d.length;c<b;c++){var f=d[c];if(Selectors.Utils.chk(f,e)){h.push(f);}}return h;},">":function(h,g,j,a,f){var c=Selectors.Utils.getByTagAndID(g,j,a);for(var e=0,d=c.length;e<d;e++){var b=c[e];if(b.parentNode==g&&Selectors.Utils.chk(b,f)){h.push(b);}}return h;},"+":function(c,b,a,e,d){while((b=b.nextSibling)){if(b.nodeType==1){if(Selectors.Utils.chk(b,d)&&Selectors.Filters.byTag(b,a)&&Selectors.Filters.byID(b,e)){c.push(b);}break;}}return c;},"~":function(c,b,a,e,d){while((b=b.nextSibling)){if(b.nodeType==1){if(!Selectors.Utils.chk(b,d)){break;}if(Selectors.Filters.byTag(b,a)&&Selectors.Filters.byID(b,e)){c.push(b);}}}return c;}};Selectors.Filters={byTag:function(b,a){return(a=="*"||(b.tagName&&b.tagName.toLowerCase()==a));},byID:function(a,b){return(!b||(a.id&&a.id==b));},byClass:function(b,a){return(b.className&&b.className.contains&&b.className.contains(a," "));},byPseudo:function(a,d,c,b){return d.call(a,c,b);},byAttribute:function(c,d,b,e){var a=Element.prototype.getProperty.call(c,d);if(!a){return(b=="!=");}if(!b||e==undefined){return true;}switch(b){case"=":return(a==e);case"*=":return(a.contains(e));case"^=":return(a.substr(0,e.length)==e);case"$=":return(a.substr(a.length-e.length)==e);case"!=":return(a!=e);case"~=":return a.contains(e," ");case"|=":return a.contains(e,"-");}return false;}};Selectors.Pseudo=new Hash({checked:function(){return this.checked;},empty:function(){return !(this.innerText||this.textContent||"").length;},not:function(a){return !Element.match(this,a);},contains:function(a){return(this.innerText||this.textContent||"").contains(a);},"first-child":function(){return Selectors.Pseudo.index.call(this,0);},"last-child":function(){var a=this;while((a=a.nextSibling)){if(a.nodeType==1){return false;}}return true;},"only-child":function(){var b=this;while((b=b.previousSibling)){if(b.nodeType==1){return false;}}var a=this;while((a=a.nextSibling)){if(a.nodeType==1){return false;}}return true;},"nth-child":function(g,e){g=(g==undefined)?"n":g;var c=Selectors.Utils.parseNthArgument(g);if(c.special!="n"){return Selectors.Pseudo[c.special].call(this,c.a,e);}var f=0;e.positions=e.positions||{};var d=$uid(this);if(!e.positions[d]){var b=this;while((b=b.previousSibling)){if(b.nodeType!=1){continue;}f++;var a=e.positions[$uid(b)];if(a!=undefined){f=a+f;break;}}e.positions[d]=f;}return(e.positions[d]%c.a==c.b);},index:function(a){var b=this,c=0;while((b=b.previousSibling)){if(b.nodeType==1&&++c>a){return false;}}return(c==a);},even:function(b,a){return Selectors.Pseudo["nth-child"].call(this,"2n+1",a);},odd:function(b,a){return Selectors.Pseudo["nth-child"].call(this,"2n",a);},selected:function(){return this.selected;},enabled:function(){return(this.disabled===false);}});
Element.Events.domready={onAdd:function(a){if(Browser.loaded){a.call(this);}}};(function(){var b=function(){if(Browser.loaded){return;}Browser.loaded=true;window.fireEvent("domready");document.fireEvent("domready");};window.addEvent("load",b);if(Browser.Engine.trident){var a=document.createElement("div");(function(){($try(function(){a.doScroll();return document.id(a).inject(document.body).set("html","temp").dispose();}))?b():arguments.callee.delay(50);})();}else{if(Browser.Engine.webkit&&Browser.Engine.version<525){(function(){(["loaded","complete"].contains(document.readyState))?b():arguments.callee.delay(50);})();}else{document.addEvent("DOMContentLoaded",b);}}})();
var JSON=new Hash({$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(a){return JSON.$specialChars[a]||"\\u00"+Math.floor(a.charCodeAt()/16).toString(16)+(a.charCodeAt()%16).toString(16);},encode:function(b){switch($type(b)){case"string":return'"'+b.replace(/[\x00-\x1f\\"]/g,JSON.$replaceChars)+'"';case"array":return"["+String(b.map(JSON.encode).clean())+"]";case"object":case"hash":var a=[];Hash.each(b,function(e,d){var c=JSON.encode(e);if(c){a.push(JSON.encode(d)+":"+c);}});return"{"+a+"}";case"number":case"boolean":return String(b);case false:return"null";}return null;},decode:function(string,secure){if($type(string)!="string"||!string.length){return null;}if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){return null;}return eval("("+string+")");}});Native.implement([Hash,Array,String,Number],{toJSON:function(){return JSON.encode(this);}});
var Swiff=new Class({Implements:[Options],options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:"high",allowScriptAccess:"always",wMode:"transparent",swLiveConnect:true},callBacks:{},vars:{}},toElement:function(){return this.object;},initialize:function(l,m){this.instance="Swiff_"+$time();this.setOptions(m);m=this.options;var b=this.id=m.id||this.instance;var a=document.id(m.container);Swiff.CallBacks[this.instance]={};var e=m.params,g=m.vars,f=m.callBacks;var h=$extend({height:m.height,width:m.width},m.properties);var k=this;for(var d in f){Swiff.CallBacks[this.instance][d]=(function(n){return function(){return n.apply(k.object,arguments);};})(f[d]);g[d]="Swiff.CallBacks."+this.instance+"."+d;}e.flashVars=Hash.toQueryString(g);if(Browser.Engine.trident){h.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie=l;}else{h.type="application/x-shockwave-flash";h.data=l;}var j='<object id="'+b+'"';for(var i in h){j+=" "+i+'="'+h[i]+'"';}j+=">";for(var c in e){if(e[c]){j+='<param name="'+c+'" value="'+e[c]+'" />';}}j+="</object>";this.object=((a)?a.empty():new Element("div")).set("html",j).firstChild;},replaces:function(a){a=document.id(a,true);a.parentNode.replaceChild(this.toElement(),a);return this;},inject:function(a){document.id(a,true).appendChild(this.toElement());return this;},remote:function(){return Swiff.remote.apply(Swiff,[this.toElement()].extend(arguments));}});Swiff.CallBacks={};Swiff.remote=function(obj,fn){var rs=obj.CallFunction('<invoke name="'+fn+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+"</invoke>");return eval(rs);};
var Fx=new Class({Implements:[Chain,Events,Options],options:{fps:50,unit:false,duration:500,link:"ignore"},initialize:function(a){this.subject=this.subject||this;this.setOptions(a);this.options.duration=Fx.Durations[this.options.duration]||this.options.duration.toInt();var b=this.options.wait;if(b===false){this.options.link="cancel";}},getTransition:function(){return function(a){return -(Math.cos(Math.PI*a)-1)/2;};},step:function(){var a=$time();if(a<this.time+this.options.duration){var b=this.transition((a-this.time)/this.options.duration);this.set(this.compute(this.from,this.to,b));}else{this.set(this.compute(this.from,this.to,1));this.complete();}},set:function(a){return a;},compute:function(c,b,a){return Fx.compute(c,b,a);},check:function(){if(!this.timer){return true;}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.bind(this,arguments));return false;}return false;},start:function(b,a){if(!this.check(b,a)){return this;}this.from=b;this.to=a;this.time=0;this.transition=this.getTransition();this.startTimer();this.onStart();return this;},complete:function(){if(this.stopTimer()){this.onComplete();}return this;},cancel:function(){if(this.stopTimer()){this.onCancel();}return this;},onStart:function(){this.fireEvent("start",this.subject);},onComplete:function(){this.fireEvent("complete",this.subject);if(!this.callChain()){this.fireEvent("chainComplete",this.subject);}},onCancel:function(){this.fireEvent("cancel",this.subject).clearChain();},pause:function(){this.stopTimer();return this;},resume:function(){this.startTimer();return this;},stopTimer:function(){if(!this.timer){return false;}this.time=$time()-this.time;this.timer=$clear(this.timer);return true;},startTimer:function(){if(this.timer){return false;}this.time=$time()-this.time;this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);return true;}});Fx.compute=function(c,b,a){return(b-c)*a+c;};Fx.Durations={"short":250,normal:500,"long":1000};Fx.CSS=new Class({Extends:Fx,prepare:function(d,e,b){b=$splat(b);var c=b[1];if(!$chk(c)){b[1]=b[0];b[0]=d.getStyle(e);}var a=b.map(this.parse);return{from:a[0],to:a[1]};},parse:function(a){a=$lambda(a)();a=(typeof a=="string")?a.split(" "):$splat(a);return a.map(function(c){c=String(c);var b=false;Fx.CSS.Parsers.each(function(f,e){if(b){return;}var d=f.parse(c);if($chk(d)){b={value:d,parser:f};}});b=b||{value:c,parser:Fx.CSS.Parsers.String};return b;});},compute:function(d,c,b){var a=[];(Math.min(d.length,c.length)).times(function(e){a.push({value:d[e].parser.compute(d[e].value,c[e].value,b),parser:d[e].parser});});a.$family={name:"fx:css:value"};return a;},serve:function(c,b){if($type(c)!="fx:css:value"){c=this.parse(c);}var a=[];c.each(function(d){a=a.concat(d.parser.serve(d.value,b));});return a;},render:function(a,d,c,b){a.setStyle(d,this.serve(c,b));},search:function(a){if(Fx.CSS.Cache[a]){return Fx.CSS.Cache[a];}var b={};Array.each(document.styleSheets,function(e,d){var c=e.href;if(c&&c.contains("://")&&!c.contains(document.domain)){return;}var f=e.rules||e.cssRules;Array.each(f,function(j,g){if(!j.style){return;}var h=(j.selectorText)?j.selectorText.replace(/^\w+/,function(i){return i.toLowerCase();}):null;if(!h||!h.test("^"+a+"$")){return;}Element.Styles.each(function(k,i){if(!j.style[i]||Element.ShortStyles[i]){return;}k=String(j.style[i]);b[i]=(k.test(/^rgb/))?k.rgbToHex():k;});});});return Fx.CSS.Cache[a]=b;}});Fx.CSS.Cache={};Fx.CSS.Parsers=new Hash({Color:{parse:function(a){if(a.match(/^#[0-9a-f]{3,6}$/i)){return a.hexToRgb(true);}return((a=a.match(/(\d+),\s*(\d+),\s*(\d+)/)))?[a[1],a[2],a[3]]:false;},compute:function(c,b,a){return c.map(function(e,d){return Math.round(Fx.compute(c[d],b[d],a));});},serve:function(a){return a.map(Number);}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(b,a){return(a)?b+a:b;}},String:{parse:$lambda(false),compute:$arguments(1),serve:$arguments(0)}});
Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=document.id(b);this.parent(a);},set:function(b,a){if(arguments.length==1){a=b;b=this.property||this.options.property;}this.render(this.element,b,a,this.options.unit);return this;},start:function(c,e,d){if(!this.check(c,e,d)){return this;}var b=Array.flatten(arguments);this.property=this.options.property||b.shift();var a=this.prepare(this.element,this.property,b);return this.parent(a.from,a.to);}});Element.Properties.tween={set:function(a){var b=this.retrieve("tween");if(b){b.cancel();}return this.eliminate("tween").store("tween:options",$extend({link:"cancel"},a));},get:function(a){if(a||!this.retrieve("tween")){if(a||!this.retrieve("tween:options")){this.set("tween",a);}this.store("tween",new Fx.Tween(this,this.retrieve("tween:options")));}return this.retrieve("tween");}};Element.implement({tween:function(a,c,b){this.get("tween").start(arguments);return this;},fade:function(c){var e=this.get("tween"),d="opacity",a;c=$pick(c,"toggle");switch(c){case"in":e.start(d,1);break;case"out":e.start(d,0);break;case"show":e.set(d,1);break;case"hide":e.set(d,0);break;case"toggle":var b=this.retrieve("fade:flag",this.get("opacity")==1);e.start(d,(b)?0:1);this.store("fade:flag",!b);a=true;break;default:e.start(d,arguments);}if(!a){this.eliminate("fade:flag");}return this;},highlight:function(c,a){if(!a){a=this.retrieve("highlight:original",this.getStyle("background-color"));a=(a=="transparent")?"#fff":a;}var b=this.get("tween");b.start("background-color",c||"#ffff88",a).chain(function(){this.setStyle("background-color",this.retrieve("highlight:original"));b.callChain();}.bind(this));return this;}});
Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=document.id(b);this.parent(a);},set:function(a){if(typeof a=="string"){a=this.search(a);}for(var b in a){this.render(this.element,b,a[b],this.options.unit);}return this;},compute:function(e,d,c){var a={};for(var b in e){a[b]=this.parent(e[b],d[b],c);}return a;},start:function(b){if(!this.check(b)){return this;}if(typeof b=="string"){b=this.search(b);}var e={},d={};for(var c in b){var a=this.prepare(this.element,c,b[c]);e[c]=a.from;d[c]=a.to;}return this.parent(e,d);}});Element.Properties.morph={set:function(a){var b=this.retrieve("morph");if(b){b.cancel();}return this.eliminate("morph").store("morph:options",$extend({link:"cancel"},a));},get:function(a){if(a||!this.retrieve("morph")){if(a||!this.retrieve("morph:options")){this.set("morph",a);}this.store("morph",new Fx.Morph(this,this.retrieve("morph:options")));}return this.retrieve("morph");}};Element.implement({morph:function(a){this.get("morph").start(a);return this;}});Fx.implement({getTransition:function(){var a=this.options.transition||Fx.Transitions.Sine.easeInOut;if(typeof a=="string"){var b=a.split(":");a=Fx.Transitions;a=a[b[0]]||a[b[0].capitalize()];if(b[1]){a=a["ease"+b[1].capitalize()+(b[2]?b[2].capitalize():"")];}}return a;}});Fx.Transition=function(b,a){a=$splat(a);return $extend(b,{easeIn:function(c){return b(c,a);},easeOut:function(c){return 1-b(1-c,a);},easeInOut:function(c){return(c<=0.5)?b(2*c,a)/2:(2-b(2*(1-c),a))/2;}});};
Fx.Transitions=new Hash({linear:$arguments(0)});Fx.Transitions.extend=function(a){for(var b in a){Fx.Transitions[b]=new Fx.Transition(a[b]);}};Fx.Transitions.extend({Pow:function(b,a){return Math.pow(b,a[0]||6);},Expo:function(a){return Math.pow(2,8*(a-1));},Circ:function(a){return 1-Math.sin(Math.acos(a));},Sine:function(a){return 1-Math.sin((1-a)*Math.PI/2);},Back:function(b,a){a=a[0]||1.618;return Math.pow(b,2)*((a+1)*b-a);},Bounce:function(f){var e;for(var d=0,c=1;1;d+=c,c/=2){if(f>=(7-4*d)/11){e=c*c-Math.pow((11-6*d-11*f)/4,2);break;}}return e;},Elastic:function(b,a){return Math.pow(2,10*--b)*Math.cos(20*b*Math.PI*(a[0]||1)/3);}});["Quad","Cubic","Quart","Quint"].each(function(b,a){Fx.Transitions[b]=new Fx.Transition(function(c){return Math.pow(c,[a+2]);});});
var Request=new Class({Implements:[Chain,Events,Options],options:{url:"",data:"",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:true,format:false,method:"post",link:"ignore",isSuccess:null,emulation:true,urlEncoded:true,encoding:"utf-8",evalScripts:false,evalResponse:false,noCache:false},initialize:function(a){this.xhr=new Browser.Request();this.setOptions(a);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers=new Hash(this.options.headers);},onStateChange:function(){if(this.xhr.readyState!=4||!this.running){return;}this.running=false;this.status=0;$try(function(){this.status=this.xhr.status;}.bind(this));this.xhr.onreadystatechange=$empty;if(this.options.isSuccess.call(this,this.status)){this.response={text:this.xhr.responseText,xml:this.xhr.responseXML};this.success(this.response.text,this.response.xml);}else{this.response={text:null,xml:null};this.failure();}},isSuccess:function(){return((this.status>=200)&&(this.status<300));},processScripts:function(a){if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader("Content-type"))){return $exec(a);}return a.stripScripts(this.options.evalScripts);},success:function(b,a){this.onSuccess(this.processScripts(b),a);},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain();},failure:function(){this.onFailure();},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr);},setHeader:function(a,b){this.headers.set(a,b);return this;},getHeader:function(a){return $try(function(){return this.xhr.getResponseHeader(a);}.bind(this));},check:function(){if(!this.running){return true;}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.bind(this,arguments));return false;}return false;},send:function(k){if(!this.check(k)){return this;}this.running=true;var i=$type(k);if(i=="string"||i=="element"){k={data:k};}var d=this.options;k=$extend({data:d.data,url:d.url,method:d.method},k);var g=k.data,b=String(k.url),a=k.method.toLowerCase();switch($type(g)){case"element":g=document.id(g).toQueryString();break;case"object":case"hash":g=Hash.toQueryString(g);}if(this.options.format){var j="format="+this.options.format;g=(g)?j+"&"+g:j;}if(this.options.emulation&&!["get","post"].contains(a)){var h="_method="+a;g=(g)?h+"&"+g:h;a="post";}if(this.options.urlEncoded&&a=="post"){var c=(this.options.encoding)?"; charset="+this.options.encoding:"";this.headers.set("Content-type","application/x-www-form-urlencoded"+c);}if(this.options.noCache){var f="noCache="+new Date().getTime();g=(g)?f+"&"+g:f;}var e=b.lastIndexOf("/");if(e>-1&&(e=b.indexOf("#"))>-1){b=b.substr(0,e);}if(g&&a=="get"){b=b+(b.contains("?")?"&":"?")+g;g=null;}this.xhr.open(a.toUpperCase(),b,this.options.async);this.xhr.onreadystatechange=this.onStateChange.bind(this);this.headers.each(function(m,l){try{this.xhr.setRequestHeader(l,m);}catch(n){this.fireEvent("exception",[l,m]);}},this);this.fireEvent("request");this.xhr.send(g);if(!this.options.async){this.onStateChange();}return this;},cancel:function(){if(!this.running){return this;}this.running=false;this.xhr.abort();this.xhr.onreadystatechange=$empty;this.xhr=new Browser.Request();this.fireEvent("cancel");return this;}});(function(){var a={};["get","post","put","delete","GET","POST","PUT","DELETE"].each(function(b){a[b]=function(){var c=Array.link(arguments,{url:String.type,data:$defined});return this.send($extend(c,{method:b}));};});Request.implement(a);})();Element.Properties.send={set:function(a){var b=this.retrieve("send");if(b){b.cancel();}return this.eliminate("send").store("send:options",$extend({data:this,link:"cancel",method:this.get("method")||"post",url:this.get("action")},a));},get:function(a){if(a||!this.retrieve("send")){if(a||!this.retrieve("send:options")){this.set("send",a);}this.store("send",new Request(this.retrieve("send:options")));}return this.retrieve("send");}};Element.implement({send:function(a){var b=this.get("send");b.send({data:this,url:a||b.options.url});return this;}});
Request.HTML=new Class({Extends:Request,options:{update:false,append:false,evalScripts:true,filter:false},processHTML:function(c){var b=c.match(/<body[^>]*>([\s\S]*?)<\/body>/i);c=(b)?b[1]:c;var a=new Element("div");return $try(function(){var d="<root>"+c+"</root>",g;if(Browser.Engine.trident){g=new ActiveXObject("Microsoft.XMLDOM");g.async=false;g.loadXML(d);}else{g=new DOMParser().parseFromString(d,"text/xml");}d=g.getElementsByTagName("root")[0];if(!d){return null;}for(var f=0,e=d.childNodes.length;f<e;f++){var h=Element.clone(d.childNodes[f],true,true);if(h){a.grab(h);}}return a;})||a.set("html",c);},success:function(d){var c=this.options,b=this.response;b.html=d.stripScripts(function(e){b.javascript=e;});var a=this.processHTML(b.html);b.tree=a.childNodes;b.elements=a.getElements("*");if(c.filter){b.tree=b.elements.filter(c.filter);}if(c.update){document.id(c.update).empty().set("html",b.html);}else{if(c.append){document.id(c.append).adopt(a.getChildren());}}if(c.evalScripts){$exec(b.javascript);}this.onSuccess(b.tree,b.elements,b.html,b.javascript);}});Element.Properties.load={set:function(a){var b=this.retrieve("load");if(b){b.cancel();}return this.eliminate("load").store("load:options",$extend({data:this,link:"cancel",update:this,method:"get"},a));},get:function(a){if(a||!this.retrieve("load")){if(a||!this.retrieve("load:options")){this.set("load",a);}this.store("load",new Request.HTML(this.retrieve("load:options")));}return this.retrieve("load");}};Element.implement({load:function(){this.get("load").send(Array.link(arguments,{data:Object.type,url:String.type}));return this;}});
Request.JSON=new Class({Extends:Request,options:{secure:true},initialize:function(a){this.parent(a);this.headers.extend({Accept:"application/json","X-Request":"JSON"});},success:function(a){this.response.json=JSON.decode(a,this.options.secure);this.onSuccess(this.response.json,a);}});

/* MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net>, MIT Style License. */ 
Class.Mutators.Binds=function(a){return a;};
Class.Mutators.initialize=function(a){return function(){$splat(this.Binds).each(function(b){var c=this[b];if(c){this[b]=c.bind(this);}},this);return a.apply(this,arguments);};};
Class.refactor=function(b,a){$each(a,function(e,d){var c=b.prototype[d];if(c&&(c=c._origin)&&typeof e=="function"){b.implement(d,function(){var f=this.previous;this.previous=c;var g=e.apply(this,arguments);this.previous=f;return g;});}else{b.implement(d,e);}});return b;};
Class.Occlude=new Class({occlude:function(c,b){b=document.id(b||this.element);var a=b.retrieve(c||this.property);if(a&&!$defined(this.occluded)){return this.occluded=a;}this.occluded=false;b.store(c||this.property,this);return this.occluded;}});(function(){var a={wait:function(b){return this.chain(function(){this.callChain.delay($pick(b,500),this);}.bind(this));}};Chain.implement(a);if(window.Fx){Fx.implement(a);["Css","Tween","Elements"].each(function(b){if(Fx[b]){Fx[b].implement(a);}});}Element.implement({chains:function(b){$splat($pick(b,["tween","morph","reveal"])).each(function(c){c=this.get(c);if(!c){return;}c.setOptions({link:"chain"});},this);return this;},pauseFx:function(c,b){this.chains(b).get($pick(b,"tween")).wait(c);return this;}});})();

/* Array.Extras */
Array.implement({min:function(){return Math.min.apply(null,this);},max:function(){return Math.max.apply(null,this);},average:function(){return this.length?this.sum()/this.length:0;},sum:function(){var a=0,b=this.length;if(b){do{a+=this[--b];}while(b);}return a;},unique:function(){return[].combine(this);},shuffle:function(){for(var b=this.length;b&&--b;){var a=this[b],c=Math.floor(Math.random()*(b+1));this[b]=this[c];this[c]=a;}return this;}});

/* Hash.Extras */
Hash.implement({getFromPath:function(a){var b=this.getClean();a.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g,function(c){if(!b){return null;}var d=arguments[2]||arguments[1]||arguments[0];b=(d in b)?b[d]:null;return c;});return b;},cleanValues:function(a){a=a||$defined;this.each(function(c,b){if(!a(c)){this.erase(b);}},this);return this;},run:function(){var a=arguments;this.each(function(c,b){if($type(c)=="function"){c.run(a);}});}});

/* String.Extras */
(function(){var b=["À","à","Á","á","Â","â","Ã","ã","Ä","ä","Å","å","Ă","ă","Ą","ą","Ć","ć","Č","č","Ç","ç","Ď","ď","Đ","đ","È","è","É","é","Ê","ê","Ë","ë","Ě","ě","Ę","ę","Ğ","ğ","Ì","ì","Í","í","Î","î","Ï","ï","Ĺ","ĺ","Ľ","ľ","Ł","ł","Ñ","ñ","Ň","ň","Ń","ń","Ò","ò","Ó","ó","Ô","ô","Õ","õ","Ö","ö","Ø","ø","ő","Ř","ř","Ŕ","ŕ","Š","š","Ş","ş","Ś","ś","Ť","ť","Ť","ť","Ţ","ţ","Ù","ù","Ú","ú","Û","û","Ü","ü","Ů","ů","Ÿ","ÿ","ý","Ý","Ž","ž","Ź","ź","Ż","ż","Þ","þ","Ð","ð","ß","Œ","œ","Æ","æ","µ"];var a=["A","a","A","a","A","a","A","a","Ae","ae","A","a","A","a","A","a","C","c","C","c","C","c","D","d","D","d","E","e","E","e","E","e","E","e","E","e","E","e","G","g","I","i","I","i","I","i","I","i","L","l","L","l","L","l","N","n","N","n","N","n","O","o","O","o","O","o","O","o","Oe","oe","O","o","o","R","r","R","r","S","s","S","s","S","s","T","t","T","t","T","t","U","u","U","u","U","u","Ue","ue","U","u","Y","y","Y","y","Z","z","Z","z","Z","z","TH","th","DH","dh","ss","OE","oe","AE","ae","u"];var d={"[\xa0\u2002\u2003\u2009]":" ","\xb7":"*","[\u2018\u2019]":"'","[\u201c\u201d]":'"',"\u2026":"...","\u2013":"-","\u2014":"--","\uFFFD":"&raquo;"};var c=function(e,f){e=e||"";var g=f?"<"+e+"[^>]*>([\\s\\S]*?)</"+e+">":"</?"+e+"([^>]+)?>";reg=new RegExp(g,"gi");return reg;};String.implement({standardize:function(){var e=this;b.each(function(g,f){e=e.replace(new RegExp(g,"g"),a[f]);});return e;},repeat:function(e){return new Array(e+1).join(this);},pad:function(f,h,e){if(this.length>=f){return this;}var g=(h==null?" ":""+h).repeat(f-this.length).substr(0,f-this.length);if(!e||e=="right"){return this+g;}if(e=="left"){return g+this;}return g.substr(0,(g.length/2).floor())+this+g.substr(0,(g.length/2).ceil());},getTags:function(e,f){return this.match(c(e,f))||[];},stripTags:function(e,f){return this.replace(c(e,f),"");},tidy:function(){var e=this.toString();$each(d,function(g,f){e=e.replace(new RegExp(f,"g"),g);});return e;}});})();
String.implement({parseQueryString:function(){var b=this.split(/[&;]/),a={};if(b.length){b.each(function(g){var c=g.indexOf("="),d=c<0?[""]:g.substr(0,c).match(/[^\]\[]+/g),e=decodeURIComponent(g.substr(c+1)),f=a;d.each(function(j,h){var k=f[j];if(h<d.length-1){f=f[j]=k||{};}else{if($type(k)=="array"){k.push(e);}else{f[j]=$defined(k)?[k,e]:e;}}});});}return a;},cleanQueryString:function(a){return this.split("&").filter(function(e){var b=e.indexOf("="),c=b<0?"":e.substr(0,b),d=e.substr(b+1);return a?a.run([c,d]):$chk(d);}).join("&");}});


/* Element.From */
Elements.from=function(e,d){if($pick(d,true)){e=e.stripScripts();}var b,c=e.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);
if(c){b=new Element("table");var a=c[1].toLowerCase();if(["td","th","tr"].contains(a)){b=new Element("tbody").inject(b);if(a!="tr"){b=new Element("tr").inject(b);
}}}return(b||new Element("div")).set("html",e).getChildren();};

/* Element.Delegation */
(function(d,e){var c=/(.*?):relay\(([^)]+)\)$/,b=/[+>~\s]/,f=function(g){var h=g.match(c);
return !h?{event:g}:{event:h[1],selector:h[2]};},a=function(m,g){var k=m.target;if(b.test(g=g.trim())){var j=this.getElements(g);for(var h=j.length;h--;
){var l=j[h];if(k==l||l.hasChild(k)){return l;}}}else{for(;k&&k!=this;k=k.parentNode){if(Element.match(k,g)){return document.id(k);}}}return null;};Element.implement({addEvent:function(j,i){var k=f(j);
if(k.selector){var h=this.retrieve("$moo:delegateMonitors",{});if(!h[j]){var g=function(m){var l=a.call(this,m,k.selector);if(l){this.fireEvent(j,[m,l],0,l);
}}.bind(this);h[j]=g;d.call(this,k.event,g);}}return d.apply(this,arguments);},removeEvent:function(j,i){var k=f(j);if(k.selector){var h=this.retrieve("events");
if(!h||!h[j]||(i&&!h[j].keys.contains(i))){return this;}if(i){e.apply(this,[j,i]);}else{e.apply(this,j);}h=this.retrieve("events");if(h&&h[j]&&h[j].keys.length==0){var g=this.retrieve("$moo:delegateMonitors",{});
e.apply(this,[k.event,g[j]]);delete g[j];}return this;}return e.apply(this,arguments);},fireEvent:function(j,h,g,k){var i=this.retrieve("events");if(!i||!i[j]){return this;
}i[j].keys.each(function(l){l.create({bind:k||this,delay:g,arguments:h})();},this);return this;}});})(Element.prototype.addEvent,Element.prototype.removeEvent);

/* Element.Measure */
Element.implement({measure:function(e){var g=function(h){return !!(!h||h.offsetHeight||h.offsetWidth);};if(g(this)){return e.apply(this);}var d=this.getParent(),f=[],b=[];while(!g(d)&&d!=document.body){b.push(d.expose());d=d.getParent();}var c=this.expose();var a=e.apply(this);c();b.each(function(h){h();});return a;},expose:function(){if(this.getStyle("display")!="none"){return $empty;}var a=this.style.cssText;this.setStyles({display:"block",position:"absolute",visibility:"hidden"});return function(){this.style.cssText=a;}.bind(this);},getDimensions:function(a){a=$merge({computeSize:false},a);var f={};var d=function(g,e){return(e.computeSize)?g.getComputedSize(e):g.getSize();};var b=this.getParent("body");if(b&&this.getStyle("display")=="none"){f=this.measure(function(){return d(this,a);});}else{if(b){try{f=d(this,a);}catch(c){}}else{f={x:0,y:0};}}return $chk(f.x)?$extend(f,{width:f.x,height:f.y}):$extend(f,{x:f.width,y:f.height});},getComputedSize:function(a){a=$merge({styles:["padding","border"],plains:{height:["top","bottom"],width:["left","right"]},mode:"both"},a);var c={width:0,height:0};switch(a.mode){case"vertical":delete c.width;delete a.plains.width;break;case"horizontal":delete c.height;delete a.plains.height;break;}var b=[];$each(a.plains,function(g,f){g.each(function(h){a.styles.each(function(i){b.push((i=="border")?i+"-"+h+"-width":i+"-"+h);});});});var e={};b.each(function(f){e[f]=this.getComputedStyle(f);},this);var d=[];$each(a.plains,function(g,f){var h=f.capitalize();c["total"+h]=c["computed"+h]=0;g.each(function(i){c["computed"+i.capitalize()]=0;b.each(function(k,j){if(k.test(i)){e[k]=e[k].toInt()||0;c["total"+h]=c["total"+h]+e[k];c["computed"+i.capitalize()]=c["computed"+i.capitalize()]+e[k];}if(k.test(i)&&f!=k&&(k.test("border")||k.test("padding"))&&!d.contains(k)){d.push(k);c["computed"+h]=c["computed"+h]-e[k];}});});});["Width","Height"].each(function(g){var f=g.toLowerCase();if(!$chk(c[f])){return;}c[f]=c[f]+this["offset"+g]+c["computed"+g];c["total"+g]=c[f]+c["total"+g];delete c["computed"+g];},this);return $extend(e,c);}});

/* Element.Shortcuts */
Element.implement({isDisplayed:function(){return this.getStyle("display")!="none";},isVisible:function(){var a=this.offsetWidth,b=this.offsetHeight;return(a==0&&b==0)?false:(a>0&&b>0)?true:this.isDisplayed();},toggle:function(){return this[this.isDisplayed()?"hide":"show"]();},hide:function(){var b;try{b=this.getStyle("display");}catch(a){}return this.store("originalDisplay",b||"").setStyle("display","none");},show:function(a){a=a||this.retrieve("originalDisplay")||"block";return this.setStyle("display",(a=="none")?"block":a);},swapClass:function(a,b){return this.removeClass(a).addClass(b);}});

/* Element.Pin */
(function(){var a=false;window.addEvent("domready",function(){var b=new Element("div").setStyles({position:"fixed",top:0,right:0}).inject(document.body);a=(b.offsetTop===0);b.dispose();});Element.implement({pin:function(d){if(this.getStyle("display")=="none"){return null;}var f,b=window.getScroll();if(d!==false){f=this.getPosition();if(!this.retrieve("pinned")){var h={top:f.y-b.y,left:f.x-b.x};if(a){this.setStyle("position","fixed").setStyles(h);}else{this.store("pinnedByJS",true);this.setStyles({position:"absolute",top:f.y,left:f.x}).addClass("isPinned");this.store("scrollFixer",(function(){if(this.retrieve("pinned")){var i=window.getScroll();}this.setStyles({top:h.top.toInt()+i.y,left:h.left.toInt()+i.x});}).bind(this));window.addEvent("scroll",this.retrieve("scrollFixer"));}this.store("pinned",true);}}else{var g;if(!Browser.Engine.trident){var e=this.getParent();g=(e.getComputedStyle("position")!="static"?e:e.getOffsetParent());}f=this.getPosition(g);this.store("pinned",false);var c;if(a&&!this.retrieve("pinnedByJS")){c={top:f.y+b.y,left:f.x+b.x};}else{this.store("pinnedByJS",false);window.removeEvent("scroll",this.retrieve("scrollFixer"));c={top:f.y,left:f.x};}this.setStyles($merge(c,{position:"absolute"})).removeClass("isPinned");}return this;},unpin:function(){return this.pin(false);},togglepin:function(){this.pin(!this.retrieve("pinned"));}});})();

/* Element.Position */
(function(){var a=Element.prototype.position;Element.implement({position:function(g){if(g&&($defined(g.x)||$defined(g.y))){return a?a.apply(this,arguments):this;}$each(g||{},function(u,t){if(!$defined(u)){delete g[t];}});g=$merge({relativeTo:document.body,position:{x:"center",y:"center"},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false,ignoreScroll:false,allowNegative:false},g);var r={x:0,y:0},e=false;var c=this.measure(function(){return document.id(this.getOffsetParent());});if(c&&c!=this.getDocument().body){r=c.measure(function(){return this.getPosition();});e=c!=document.id(g.relativeTo);g.offset.x=g.offset.x-r.x;g.offset.y=g.offset.y-r.y;}var s=function(t){if($type(t)!="string"){return t;}t=t.toLowerCase();var u={};if(t.test("left")){u.x="left";}else{if(t.test("right")){u.x="right";}else{u.x="center";}}if(t.test("upper")||t.test("top")){u.y="top";}else{if(t.test("bottom")){u.y="bottom";}else{u.y="center";}}return u;};g.edge=s(g.edge);g.position=s(g.position);if(!g.edge){if(g.position.x=="center"&&g.position.y=="center"){g.edge={x:"center",y:"center"};}else{g.edge={x:"left",y:"top"};}}this.setStyle("position","absolute");var f=document.id(g.relativeTo)||document.body,d=f==document.body?window.getScroll():f.getPosition(),l=d.y,h=d.x;var n=this.getDimensions({computeSize:true,styles:["padding","border","margin"]});var j={},o=g.offset.y,q=g.offset.x,k=window.getSize();switch(g.position.x){case"left":j.x=h+q;break;case"right":j.x=h+q+f.offsetWidth;break;default:j.x=h+((f==document.body?k.x:f.offsetWidth)/2)+q;break;}switch(g.position.y){case"top":j.y=l+o;break;case"bottom":j.y=l+o+f.offsetHeight;break;default:j.y=l+((f==document.body?k.y:f.offsetHeight)/2)+o;break;}if(g.edge){var b={};switch(g.edge.x){case"left":b.x=0;break;case"right":b.x=-n.x-n.computedRight-n.computedLeft;break;default:b.x=-(n.totalWidth/2);break;}switch(g.edge.y){case"top":b.y=0;break;case"bottom":b.y=-n.y-n.computedTop-n.computedBottom;break;default:b.y=-(n.totalHeight/2);break;}j.x+=b.x;j.y+=b.y;}j={left:((j.x>=0||e||g.allowNegative)?j.x:0).toInt(),top:((j.y>=0||e||g.allowNegative)?j.y:0).toInt()};var i={left:"x",top:"y"};["minimum","maximum"].each(function(t){["left","top"].each(function(u){var v=g[t]?g[t][i[u]]:null;if(v!=null&&j[u]<v){j[u]=v;}});});if(f.getStyle("position")=="fixed"||g.relFixedPosition){var m=window.getScroll();j.top+=m.y;j.left+=m.x;}if(g.ignoreScroll){var p=f.getScroll();j.top-=p.y;j.left-=p.x;}if(g.ignoreMargins){j.left+=(g.edge.x=="right"?n["margin-right"]:g.edge.x=="center"?-n["margin-left"]+((n["margin-right"]+n["margin-left"])/2):-n["margin-left"]);j.top+=(g.edge.y=="bottom"?n["margin-bottom"]:g.edge.y=="center"?-n["margin-top"]+((n["margin-bottom"]+n["margin-top"])/2):-n["margin-top"]);}j.left=Math.ceil(j.left);j.top=Math.ceil(j.top);if(g.returnPos){return j;}else{this.setStyles(j);}return this;}});})();


/* FX.Elements */
Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(b,a){this.elements=this.subject=$$(b);this.parent(a);},compute:function(g,h,j){var c={};for(var d in g){var a=g[d],e=h[d],f=c[d]={};for(var b in a){f[b]=this.parent(a[b],e[b],j);}}return c;},set:function(b){for(var c in b){var a=b[c];for(var d in a){this.render(this.elements[c],d,a[d],this.options.unit);}}return this;},start:function(c){if(!this.check(c)){return this;}var h={},j={};for(var d in c){var f=c[d],a=h[d]={},g=j[d]={};for(var b in f){var e=this.prepare(this.elements[d],b,f[b]);a[b]=e.from;g[b]=e.to;}}return this.parent(h,j);}});
/* FX.Accordion */
Fx.Accordion=new Class({Extends:Fx.Elements,options:{display:0,show:false,height:true,width:false,opacity:true,alwaysHide:false,trigger:"click",initialDisplayFx:true,returnHeightToAuto:true},initialize:function(){var c=Array.link(arguments,{container:Element.type,options:Object.type,togglers:$defined,elements:$defined});this.parent(c.elements,c.options);this.togglers=$$(c.togglers);this.previous=-1;this.internalChain=new Chain();if(this.options.alwaysHide){this.options.wait=true;}if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}if(this.options.start){this.options.display=false;this.options.show=false;}this.effects={};if(this.options.opacity){this.effects.opacity="fullOpacity";}if(this.options.width){this.effects.width=this.options.fixedWidth?"fullWidth":"offsetWidth";}if(this.options.height){this.effects.height=this.options.fixedHeight?"fullHeight":"scrollHeight";}for(var b=0,a=this.togglers.length;b<a;b++){this.addSection(this.togglers[b],this.elements[b]);}this.elements.each(function(e,d){if(this.options.show===d){this.fireEvent("active",[this.togglers[d],e]);}else{for(var f in this.effects){e.setStyle(f,0);}}},this);if($chk(this.options.display)||this.options.initialDisplayFx===false){this.display(this.options.display,this.options.initialDisplayFx);}if(this.options.fixedHeight!==false){this.options.returnHeightToAuto=false;}this.addEvent("complete",this.internalChain.callChain.bind(this.internalChain));},addSection:function(e,c){e=document.id(e);c=document.id(c);var f=this.togglers.contains(e);this.togglers.include(e);this.elements.include(c);var a=this.togglers.indexOf(e);var b=this.display.bind(this,a);e.store("accordion:display",b);e.addEvent(this.options.trigger,b);if(this.options.height){c.setStyles({"padding-top":0,"border-top":"none","padding-bottom":0,"border-bottom":"none"});}if(this.options.width){c.setStyles({"padding-left":0,"border-left":"none","padding-right":0,"border-right":"none"});}c.fullOpacity=1;if(this.options.fixedWidth){c.fullWidth=this.options.fixedWidth;}if(this.options.fixedHeight){c.fullHeight=this.options.fixedHeight;}c.setStyle("overflow","hidden");if(!f){for(var d in this.effects){c.setStyle(d,0);}}return this;},detach:function(){this.togglers.each(function(a){a.removeEvent(this.options.trigger,a.retrieve("accordion:display"));},this);},display:function(a,b){if(!this.check(a,b)){return this;}b=$pick(b,true);if(this.options.returnHeightToAuto){var d=this.elements[this.previous];if(d&&!this.selfHidden){for(var c in this.effects){d.setStyle(c,d[this.effects[c]]);}}}a=($type(a)=="element")?this.elements.indexOf(a):a;if((this.timer&&this.options.wait)||(a===this.previous&&!this.options.alwaysHide)){return this;}this.previous=a;var e={};this.elements.each(function(h,g){e[g]={};var f;if(g!=a){f=true;}else{if(this.options.alwaysHide&&((h.offsetHeight>0&&this.options.height)||h.offsetWidth>0&&this.options.width)){f=true;this.selfHidden=true;}}this.fireEvent(f?"background":"active",[this.togglers[g],h]);for(var j in this.effects){e[g][j]=f?0:h[this.effects[j]];}},this);this.internalChain.chain(function(){if(this.options.returnHeightToAuto&&!this.selfHidden){var f=this.elements[a];if(f){f.setStyle("height","auto");}}}.bind(this));return b?this.start(e):this.set(e);}});var Accordion=new Class({Extends:Fx.Accordion,initialize:function(){this.parent.apply(this,arguments);var a=Array.link(arguments,{container:Element.type});this.container=a.container;},addSection:function(c,b,e){c=document.id(c);b=document.id(b);var d=this.togglers.contains(c);var a=this.togglers.length;if(a&&(!d||e)){e=$pick(e,a-1);c.inject(this.togglers[e],"before");b.inject(c,"after");}else{if(this.container&&!d){c.inject(this.container);b.inject(this.container);}}return this.parent.apply(this,arguments);}});
/* FX.Move */
Fx.Move=new Class({Extends:Fx.Morph,options:{relativeTo:document.body,position:"center",edge:false,offset:{x:0,y:0}},start:function(a){return this.parent(this.element.position($merge(this.options,a,{returnPos:true})));
}});Element.Properties.move={set:function(a){var b=this.retrieve("move");if(b){b.cancel();}return this.eliminate("move").store("move:options",$extend({link:"cancel"},a));
},get:function(a){if(a||!this.retrieve("move")){if(a||!this.retrieve("move:options")){this.set("move",a);}this.store("move",new Fx.Move(this,this.retrieve("move:options")));
}return this.retrieve("move");}};Element.implement({move:function(a){this.get("move").start(a);return this;}});
/* FX.Reveal */
Fx.Reveal=new Class({Extends:Fx.Morph,options:{link:"cancel",styles:["padding","border","margin"],transitionOpacity:!Browser.Engine.trident4,mode:"vertical",display:"block",hideInputs:Browser.Engine.trident?"select, input, textarea, object, embed":false},dissolve:function(){try{if(!this.hiding&&!this.showing){if(this.element.getStyle("display")!="none"){this.hiding=true;this.showing=false;this.hidden=true;this.cssText=this.element.style.cssText;var d=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode});this.element.setStyle("display",this.options.display);if(this.options.transitionOpacity){d.opacity=1;}var b={};$each(d,function(f,e){b[e]=[f,0];},this);this.element.setStyle("overflow","hidden");var a=this.options.hideInputs?this.element.getElements(this.options.hideInputs):null;this.$chain.unshift(function(){if(this.hidden){this.hiding=false;$each(d,function(f,e){d[e]=f;},this);this.element.style.cssText=this.cssText;this.element.setStyle("display","none");if(a){a.setStyle("visibility","visible");}}this.fireEvent("hide",this.element);this.callChain();}.bind(this));if(a){a.setStyle("visibility","hidden");}this.start(b);}else{this.callChain.delay(10,this);this.fireEvent("complete",this.element);this.fireEvent("hide",this.element);}}else{if(this.options.link=="chain"){this.chain(this.dissolve.bind(this));}else{if(this.options.link=="cancel"&&!this.hiding){this.cancel();this.dissolve();}}}}catch(c){this.hiding=false;this.element.setStyle("display","none");this.callChain.delay(10,this);this.fireEvent("complete",this.element);this.fireEvent("hide",this.element);}return this;},reveal:function(){try{if(!this.showing&&!this.hiding){if(this.element.getStyle("display")=="none"||this.element.getStyle("visiblity")=="hidden"||this.element.getStyle("opacity")==0){this.showing=true;this.hiding=this.hidden=false;var d;this.cssText=this.element.style.cssText;this.element.measure(function(){d=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode});}.bind(this));$each(d,function(f,e){d[e]=f;});if($chk(this.options.heightOverride)){d.height=this.options.heightOverride.toInt();}if($chk(this.options.widthOverride)){d.width=this.options.widthOverride.toInt();}if(this.options.transitionOpacity){this.element.setStyle("opacity",0);d.opacity=1;}var b={height:0,display:this.options.display};$each(d,function(f,e){b[e]=0;});this.element.setStyles($merge(b,{overflow:"hidden"}));var a=this.options.hideInputs?this.element.getElements(this.options.hideInputs):null;if(a){a.setStyle("visibility","hidden");}this.start(d);this.$chain.unshift(function(){this.element.style.cssText=this.cssText;this.element.setStyle("display",this.options.display);if(!this.hidden){this.showing=false;}if(a){a.setStyle("visibility","visible");}this.callChain();this.fireEvent("show",this.element);}.bind(this));}else{this.callChain();this.fireEvent("complete",this.element);this.fireEvent("show",this.element);}}else{if(this.options.link=="chain"){this.chain(this.reveal.bind(this));}else{if(this.options.link=="cancel"&&!this.showing){this.cancel();this.reveal();}}}}catch(c){this.element.setStyles({display:this.options.display,visiblity:"visible",opacity:1});this.showing=false;this.callChain.delay(10,this);this.fireEvent("complete",this.element);this.fireEvent("show",this.element);}return this;},toggle:function(){if(this.element.getStyle("display")=="none"||this.element.getStyle("visiblity")=="hidden"||this.element.getStyle("opacity")==0){this.reveal();}else{this.dissolve();}return this;},cancel:function(){this.parent.apply(this,arguments);this.element.style.cssText=this.cssText;this.hidding=false;this.showing=false;}});Element.Properties.reveal={set:function(a){var b=this.retrieve("reveal");if(b){b.cancel();}return this.eliminate("reveal").store("reveal:options",a);},get:function(a){if(a||!this.retrieve("reveal")){if(a||!this.retrieve("reveal:options")){this.set("reveal",a);}this.store("reveal",new Fx.Reveal(this,this.retrieve("reveal:options")));}return this.retrieve("reveal");}};Element.Properties.dissolve=Element.Properties.reveal;Element.implement({reveal:function(a){this.get("reveal",a).reveal();return this;},dissolve:function(a){this.get("reveal",a).dissolve();return this;},nix:function(){var a=Array.link(arguments,{destroy:Boolean.type,options:Object.type});this.get("reveal",a.options).dissolve().chain(function(){this[a.destroy?"destroy":"dispose"]();}.bind(this));return this;},wink:function(){var b=Array.link(arguments,{duration:Number.type,options:Object.type});var a=this.get("reveal",b.options);a.reveal().chain(function(){(function(){a.dissolve();}).delay(b.duration||2000);});}});
/* FX.Sort */
Fx.Sort=new Class({Extends:Fx.Elements,options:{mode:"vertical"},initialize:function(b,a){this.parent(b,a);this.elements.each(function(c){if(c.getStyle("position")=="static"){c.setStyle("position","relative");}});this.setDefaultOrder();},setDefaultOrder:function(){this.currentOrder=this.elements.map(function(b,a){return a;});},sort:function(e){if($type(e)!="array"){return false;}var i=0,a=0,c={},h={},d=this.options.mode=="vertical";var f=this.elements.map(function(m,j){var l=m.getComputedSize({styles:["border","padding","margin"]});var n;if(d){n={top:i,margin:l["margin-top"],height:l.totalHeight};i+=n.height-l["margin-top"];}else{n={left:a,margin:l["margin-left"],width:l.totalWidth};a+=n.width;}var k=d?"top":"left";h[j]={};var o=m.getStyle(k).toInt();h[j][k]=o||0;return n;},this);this.set(h);e=e.map(function(j){return j.toInt();});if(e.length!=this.elements.length){this.currentOrder.each(function(j){if(!e.contains(j)){e.push(j);}});if(e.length>this.elements.length){e.splice(this.elements.length-1,e.length-this.elements.length);}}var b=i=a=0;e.each(function(l,j){var k={};if(d){k.top=i-f[l].top-b;i+=f[l].height;}else{k.left=a-f[l].left;a+=f[l].width;}b=b+f[l].margin;c[l]=k;},this);var g={};$A(e).sort().each(function(j){g[j]=c[j];});this.start(g);this.currentOrder=e;return this;},rearrangeDOM:function(a){a=a||this.currentOrder;var b=this.elements[0].getParent();var c=[];this.elements.setStyle("opacity",0);a.each(function(d){c.push(this.elements[d].inject(b).setStyles({top:0,left:0}));},this);this.elements.setStyle("opacity",1);this.elements=$$(c);this.setDefaultOrder();return this;},getDefaultOrder:function(){return this.elements.map(function(b,a){return a;});},forward:function(){return this.sort(this.getDefaultOrder());},backward:function(){return this.sort(this.getDefaultOrder().reverse());},reverse:function(){return this.sort(this.currentOrder.reverse());},sortByElements:function(a){return this.sort(a.map(function(b){return this.elements.indexOf(b);},this));},swap:function(c,b){if($type(c)=="element"){c=this.elements.indexOf(c);}if($type(b)=="element"){b=this.elements.indexOf(b);}var a=$A(this.currentOrder);a[this.currentOrder.indexOf(c)]=b;a[this.currentOrder.indexOf(b)]=c;return this.sort(a);}});
/* FX.Slide */
Fx.Slide=new Class({Extends:Fx,options:{mode:"vertical",wrapper:false,hideOverflow:true},initialize:function(b,a){this.addEvent("complete",function(){this.open=(this.wrapper["offset"+this.layout.capitalize()]!=0);if(this.open){this.wrapper.setStyle("height","");}if(this.open&&Browser.Engine.webkit419){this.element.dispose().inject(this.wrapper);}},true);this.element=this.subject=document.id(b);this.parent(a);var d=this.element.retrieve("wrapper");var c=this.element.getStyles("margin","position","overflow");if(this.options.hideOverflow){c=$extend(c,{overflow:"hidden"});}if(this.options.wrapper){d=document.id(this.options.wrapper).setStyles(c);}this.wrapper=d||new Element("div",{styles:c}).wraps(this.element);this.element.store("wrapper",this.wrapper).setStyle("margin",0);this.now=[];this.open=true;},vertical:function(){this.margin="margin-top";this.layout="height";this.offset=this.element.offsetHeight;},horizontal:function(){this.margin="margin-left";this.layout="width";this.offset=this.element.offsetWidth;},set:function(a){this.element.setStyle(this.margin,a[0]);this.wrapper.setStyle(this.layout,a[1]);return this;},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);});},start:function(b,e){if(!this.check(b,e)){return this;}this[e||this.options.mode]();var d=this.element.getStyle(this.margin).toInt();var c=this.wrapper.getStyle(this.layout).toInt();var a=[[d,c],[0,this.offset]];var g=[[d,c],[-this.offset,0]];var f;switch(b){case"in":f=a;break;case"out":f=g;break;case"toggle":f=(c==0)?a:g;}return this.parent(f[0],f[1]);},slideIn:function(a){return this.start("in",a);},slideOut:function(a){return this.start("out",a);},hide:function(a){this[a||this.options.mode]();this.open=false;return this.set([-this.offset,0]);},show:function(a){this[a||this.options.mode]();this.open=true;return this.set([0,this.offset]);},toggle:function(a){return this.start("toggle",a);}});Element.Properties.slide={set:function(b){var a=this.retrieve("slide");if(a){a.cancel();}return this.eliminate("slide").store("slide:options",$extend({link:"cancel"},b));},get:function(a){if(a||!this.retrieve("slide")){if(a||!this.retrieve("slide:options")){this.set("slide",a);}this.store("slide",new Fx.Slide(this,this.retrieve("slide:options")));}return this.retrieve("slide");}};Element.implement({slide:function(d,e){d=d||"toggle";var b=this.get("slide"),a;switch(d){case"hide":b.hide(e);break;case"show":b.show(e);break;case"toggle":var c=this.retrieve("slide:flag",b.open);b[c?"slideOut":"slideIn"](e);this.store("slide:flag",!c);a=true;break;default:b.start(d,e);}if(!a){this.eliminate("slide:flag");}return this;}});
/* FX.Scroll */
Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(b,a){this.element=this.subject=document.id(b);this.parent(a);var d=this.cancel.bind(this,false);if($type(this.element)!="element"){this.element=document.id(this.element.getDocument().body);}var c=this.element;if(this.options.wheelStops){this.addEvent("start",function(){c.addEvent("mousewheel",d);},true);this.addEvent("complete",function(){c.removeEvent("mousewheel",d);},true);}},set:function(){var a=Array.flatten(arguments);if(Browser.Engine.gecko){a=[Math.round(a[0]),Math.round(a[1])];}this.element.scrollTo(a[0],a[1]);},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);});},start:function(c,g){if(!this.check(c,g)){return this;}var e=this.element.getScrollSize(),b=this.element.getScroll(),d={x:c,y:g};for(var f in d){var a=e[f];if($chk(d[f])){d[f]=($type(d[f])=="number")?d[f]:a;}else{d[f]=b[f];}d[f]+=this.options.offset[f];}return this.parent([b.x,b.y],[d.x,d.y]);},toTop:function(){return this.start(false,0);},toLeft:function(){return this.start(0,false);},toRight:function(){return this.start("right",false);},toBottom:function(){return this.start(false,"bottom");},toElement:function(b){var a=document.id(b).getPosition(this.element);return this.start(a.x,a.y);},scrollIntoView:function(c,e,d){e=e?$splat(e):["x","y"];var h={};c=document.id(c);var f=c.getPosition(this.element);var i=c.getSize();var g=this.element.getScroll();var a=this.element.getSize();var b={x:f.x+i.x,y:f.y+i.y};["x","y"].each(function(j){if(e.contains(j)){if(b[j]>g[j]+a[j]){h[j]=b[j]-a[j];}if(f[j]<g[j]){h[j]=f[j];}}if(h[j]==null){h[j]=g[j];}if(d&&d[j]){h[j]=h[j]+d[j];}},this);if(h.x!=g.x||h.y!=g.y){this.start(h.x,h.y);}return this;},scrollToCenter:function(c,e,d){e=e?$splat(e):["x","y"];c=$(c);var h={},f=c.getPosition(this.element),i=c.getSize(),g=this.element.getScroll(),a=this.element.getSize(),b={x:f.x+i.x,y:f.y+i.y};["x","y"].each(function(j){if(e.contains(j)){h[j]=f[j]-(a[j]-i[j])/2;}if(h[j]==null){h[j]=g[j];}if(d&&d[j]){h[j]=h[j]+d[j];}},this);if(h.x!=g.x||h.y!=g.y){this.start(h.x,h.y);}return this;}});
/* Fx.SmoothScroll */
var SmoothScroll=Fx.SmoothScroll=new Class({Extends:Fx.Scroll,initialize:function(b,c){c=c||document;this.doc=c.getDocument();var d=c.getWindow();this.parent(this.doc,b);this.links=$$(this.options.links||this.doc.links);var a=d.location.href.match(/^[^#]*/)[0]+"#";this.links.each(function(f){if(f.href.indexOf(a)!=0){return;}var e=f.href.substr(a.length);if(e){this.useLink(f,e);}},this);if(!Browser.Engine.webkit419){this.addEvent("complete",function(){d.location.hash=this.anchor;},true);}},useLink:function(c,a){var b;c.addEvent("click",function(d){if(b!==false&&!b){b=document.id(a)||this.doc.getElement("a[name="+a+"]");}if(b){d.preventDefault();this.anchor=a;this.toElement(b).chain(function(){this.fireEvent("scrolledTo",[c,b]);}.bind(this));c.blur();}}.bind(this));}});
/* Drag */
var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,stopPropagation:false,modifiers:{x:"left",y:"top"}},initialize:function(){var b=Array.link(arguments,{options:Object.type,element:$defined});this.element=document.id(b.element);this.document=this.element.getDocument();this.setOptions(b.options||{});var a=$type(this.options.handle);this.handles=((a=="array"||a=="collection")?$$(this.options.handle):document.id(this.options.handle))||this.element;this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.Engine.trident)?"selectstart":"mousedown";this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:$lambda(false)};this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);return this;},start:function(c){if(c.rightClick){return;}if(this.options.preventDefault){c.preventDefault();}if(this.options.stopPropagation){c.stopPropagation();}this.mouse.start=c.page;this.fireEvent("beforeStart",this.element);var a=this.options.limit;this.limit={x:[],y:[]};for(var d in this.options.modifiers){if(!this.options.modifiers[d]){continue;}if(this.options.style){this.value.now[d]=this.element.getStyle(this.options.modifiers[d]).toInt();}else{this.value.now[d]=this.element[this.options.modifiers[d]];}if(this.options.invert){this.value.now[d]*=-1;}this.mouse.pos[d]=c.page[d]-this.value.now[d];if(a&&a[d]){for(var b=2;b--;b){if($chk(a[d][b])){this.limit[d][b]=$lambda(a[d][b])();}}}}if($type(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};}this.document.addEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});this.document.addEvent(this.selection,this.bound.eventStop);},check:function(a){if(this.options.preventDefault){a.preventDefault();}var b=Math.round(Math.sqrt(Math.pow(a.page.x-this.mouse.start.x,2)+Math.pow(a.page.y-this.mouse.start.y,2)));if(b>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});this.fireEvent("start",[this.element,a]).fireEvent("snap",this.element);}},drag:function(a){if(this.options.preventDefault){a.preventDefault();}this.mouse.now=a.page;for(var b in this.options.modifiers){if(!this.options.modifiers[b]){continue;}this.value.now[b]=this.mouse.now[b]-this.mouse.pos[b];if(this.options.invert){this.value.now[b]*=-1;}if(this.options.limit&&this.limit[b]){if($chk(this.limit[b][1])&&(this.value.now[b]>this.limit[b][1])){this.value.now[b]=this.limit[b][1];}else{if($chk(this.limit[b][0])&&(this.value.now[b]<this.limit[b][0])){this.value.now[b]=this.limit[b][0];}}}if(this.options.grid[b]){this.value.now[b]-=((this.value.now[b]-(this.limit[b][0]||0))%this.options.grid[b]);}if(this.options.style){this.element.setStyle(this.options.modifiers[b],this.value.now[b]+this.options.unit);}else{this.element[this.options.modifiers[b]]=this.value.now[b];}}this.fireEvent("drag",[this.element,a]);},cancel:function(a){this.document.removeEvent("mousemove",this.bound.check);this.document.removeEvent("mouseup",this.bound.cancel);if(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.fireEvent("cancel",this.element);}},stop:function(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.document.removeEvent("mousemove",this.bound.drag);this.document.removeEvent("mouseup",this.bound.stop);if(a){this.fireEvent("complete",[this.element,a]);}}});Element.implement({makeResizable:function(a){var b=new Drag(this,$merge({modifiers:{x:"width",y:"height"}},a));this.store("resizer",b);return b.addEvent("drag",function(){this.fireEvent("resize",b);}.bind(this));}});Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:false,precalculate:false,includeMargins:true,checkDroppables:true},initialize:function(b,a){this.parent(b,a);b=this.element;this.droppables=$$(this.options.droppables);this.container=document.id(this.options.container);if(this.container&&$type(this.container)!="element"){this.container=document.id(this.container.getDocument().body);}var c=b.getStyles("left","top","position");if(c.left=="auto"||c.top=="auto"){b.setPosition(b.getPosition(b.getOffsetParent()));}if(c.position=="static"){b.setStyle("position","absolute");}this.addEvent("start",this.checkDroppables,true);this.overed=null;},start:function(a){if(this.container){this.options.limit=this.calculateLimit();}if(this.options.precalculate){this.positions=this.droppables.map(function(b){return b.getCoordinates();});}this.parent(a);},calculateLimit:function(){var d=this.element.getOffsetParent(),g=this.container.getCoordinates(d),f={},c={},b={},i={},k={};["top","right","bottom","left"].each(function(o){f[o]=this.container.getStyle("border-"+o).toInt();b[o]=this.element.getStyle("border-"+o).toInt();c[o]=this.element.getStyle("margin-"+o).toInt();i[o]=this.container.getStyle("margin-"+o).toInt();k[o]=d.getStyle("padding-"+o).toInt();},this);var e=this.element.offsetWidth+c.left+c.right,n=this.element.offsetHeight+c.top+c.bottom,h=0,j=0,m=g.right-f.right-e,a=g.bottom-f.bottom-n;if(this.options.includeMargins){h+=c.left;j+=c.top;}else{m+=c.right;a+=c.bottom;}if(this.element.getStyle("position")=="relative"){var l=this.element.getCoordinates(d);l.left-=this.element.getStyle("left").toInt();l.top-=this.element.getStyle("top").toInt();h+=f.left-l.left;j+=f.top-l.top;m+=c.left-l.left;a+=c.top-l.top;if(this.container!=d){h+=i.left+k.left;j+=(Browser.Engine.trident4?0:i.top)+k.top;}}else{h-=c.left;j-=c.top;if(this.container==d){m-=f.left;a-=f.top;}else{h+=g.left+f.left;j+=g.top+f.top;}}return{x:[h,m],y:[j,a]};},checkAgainst:function(c,b){c=(this.positions)?this.positions[b]:c.getCoordinates();var a=this.mouse.now;return(a.x>c.left&&a.x<c.right&&a.y<c.bottom&&a.y>c.top);},checkDroppables:function(){var a=this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=a){if(this.overed){this.fireEvent("leave",[this.element,this.overed]);}if(a){this.fireEvent("enter",[this.element,a]);}this.overed=a;}},drag:function(a){this.parent(a);if(this.options.checkDroppables&&this.droppables.length){this.checkDroppables();}},stop:function(a){this.checkDroppables();this.fireEvent("drop",[this.element,this.overed,a]);this.overed=null;return this.parent(a);}});Element.implement({makeDraggable:function(a){var b=new Drag.Move(this,a);this.store("dragger",b);return b;}});
/* Slider (Drag) */
var Slider=new Class({Implements:[Events,Options],Binds:["clickedElement","draggedKnob","scrolledElement"],options:{onTick:function(a){if(this.options.snap){a=this.toPosition(this.step);}this.knob.setStyle(this.property,a);},initialStep:0,snap:false,offset:0,range:false,wheel:false,steps:100,mode:"horizontal"},initialize:function(f,a,e){this.setOptions(e);this.element=document.id(f);this.knob=document.id(a);this.previousChange=this.previousEnd=this.step=-1;var g,b={},d={x:false,y:false};switch(this.options.mode){case"vertical":this.axis="y";this.property="top";g="offsetHeight";break;case"horizontal":this.axis="x";this.property="left";g="offsetWidth";}this.full=this.element.measure(function(){this.half=this.knob[g]/2;return this.element[g]-this.knob[g]+(this.options.offset*2);}.bind(this));this.min=$chk(this.options.range[0])?this.options.range[0]:0;this.max=$chk(this.options.range[1])?this.options.range[1]:this.options.steps;this.range=this.max-this.min;this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;this.stepWidth=this.stepSize*this.full/Math.abs(this.range);this.knob.setStyle("position","relative").setStyle(this.property,this.options.initialStep?this.toPosition(this.options.initialStep):-this.options.offset);d[this.axis]=this.property;b[this.axis]=[-this.options.offset,this.full-this.options.offset];var c={snap:0,limit:b,modifiers:d,onDrag:this.draggedKnob,onStart:this.draggedKnob,onBeforeStart:(function(){this.isDragging=true;}).bind(this),onCancel:function(){this.isDragging=false;}.bind(this),onComplete:function(){this.isDragging=false;this.draggedKnob();this.end();}.bind(this)};if(this.options.snap){c.grid=Math.ceil(this.stepWidth);c.limit[this.axis][1]=this.full;}this.drag=new Drag(this.knob,c);this.attach();},attach:function(){this.element.addEvent("mousedown",this.clickedElement);if(this.options.wheel){this.element.addEvent("mousewheel",this.scrolledElement);}this.drag.attach();return this;},detach:function(){this.element.removeEvent("mousedown",this.clickedElement);this.element.removeEvent("mousewheel",this.scrolledElement);this.drag.detach();return this;},set:function(a){if(!((this.range>0)^(a<this.min))){a=this.min;}if(!((this.range>0)^(a>this.max))){a=this.max;}this.step=Math.round(a);this.checkStep();this.fireEvent("tick",this.toPosition(this.step));this.end();return this;},clickedElement:function(c){if(this.isDragging||c.target==this.knob){return;}var b=this.range<0?-1:1;var a=c.page[this.axis]-this.element.getPosition()[this.axis]-this.half;a=a.limit(-this.options.offset,this.full-this.options.offset);this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();this.fireEvent("tick",a);this.end();},scrolledElement:function(a){var b=(this.options.mode=="horizontal")?(a.wheel<0):(a.wheel>0);this.set(b?this.step-this.stepSize:this.step+this.stepSize);a.stop();},draggedKnob:function(){var b=this.range<0?-1:1;var a=this.drag.value.now[this.axis];a=a.limit(-this.options.offset,this.full-this.options.offset);this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;this.fireEvent("change",this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent("complete",this.step+"");}},toStep:function(a){var b=(a+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?Math.round(b-=b%this.stepSize):b;},toPosition:function(a){return(this.full*Math.abs(this.min-a))/(this.steps*this.stepSize)-this.options.offset;}});
/* Sortables (Drag) */
var Sortables=new Class({Implements:[Events,Options],options:{snap:4,opacity:1,clone:false,revert:false,handle:false,constrain:false},initialize:function(a,b){this.setOptions(b);this.elements=[];this.lists=[];this.idle=true;this.addLists($$(document.id(a)||a));if(!this.options.clone){this.options.revert=false;}if(this.options.revert){this.effect=new Fx.Morph(null,$merge({duration:250,link:"cancel"},this.options.revert));}},attach:function(){this.addLists(this.lists);return this;},detach:function(){this.lists=this.removeLists(this.lists);return this;},addItems:function(){Array.flatten(arguments).each(function(a){this.elements.push(a);var b=a.retrieve("sortables:start",this.start.bindWithEvent(this,a));(this.options.handle?a.getElement(this.options.handle)||a:a).addEvent("mousedown",b);},this);return this;},addLists:function(){Array.flatten(arguments).each(function(a){this.lists.push(a);this.addItems(a.getChildren());},this);return this;},removeItems:function(){return $$(Array.flatten(arguments).map(function(a){this.elements.erase(a);var b=a.retrieve("sortables:start");(this.options.handle?a.getElement(this.options.handle)||a:a).removeEvent("mousedown",b);return a;},this));},removeLists:function(){return $$(Array.flatten(arguments).map(function(a){this.lists.erase(a);this.removeItems(a.getChildren());return a;},this));},getClone:function(b,a){if(!this.options.clone){return new Element("div").inject(document.body);}if($type(this.options.clone)=="function"){return this.options.clone.call(this,b,a,this.list);}var c=a.clone(true).setStyles({margin:"0px",position:"absolute",visibility:"hidden",width:a.getStyle("width")});if(c.get("html").test("radio")){c.getElements("input[type=radio]").each(function(d,e){d.set("name","clone_"+e);});}return c.inject(this.list).setPosition(a.getPosition(a.getOffsetParent()));},getDroppables:function(){var a=this.list.getChildren();if(!this.options.constrain){a=this.lists.concat(a).erase(this.list);}return a.erase(this.clone).erase(this.element);},insert:function(c,b){var a="inside";if(this.lists.contains(b)){this.list=b;this.drag.droppables=this.getDroppables();}else{a=this.element.getAllPrevious().contains(b)?"before":"after";}this.element.inject(b,a);this.fireEvent("sort",[this.element,this.clone]);},start:function(b,a){if(!this.idle){return;}this.idle=false;this.element=a;this.opacity=a.get("opacity");this.list=a.getParent();this.clone=this.getClone(b,a);this.drag=new Drag.Move(this.clone,{snap:this.options.snap,container:this.options.constrain&&this.element.getParent(),droppables:this.getDroppables(),onSnap:function(){b.stop();this.clone.setStyle("visibility","visible");this.element.set("opacity",this.options.opacity||0);this.fireEvent("start",[this.element,this.clone]);}.bind(this),onEnter:this.insert.bind(this),onCancel:this.reset.bind(this),onComplete:this.end.bind(this)});this.clone.inject(this.element,"before");this.drag.start(b);},end:function(){this.drag.detach();this.element.set("opacity",this.opacity);if(this.effect){var a=this.element.getStyles("width","height");var b=this.clone.computePosition(this.element.getPosition(this.clone.offsetParent));this.effect.element=this.clone;this.effect.start({top:b.top,left:b.left,width:a.width,height:a.height,opacity:0.25}).chain(this.reset.bind(this));}else{this.reset();}},reset:function(){this.idle=true;this.clone.destroy();this.fireEvent("complete",this.element);},serialize:function(){var c=Array.link(arguments,{modifier:Function.type,index:$defined});var b=this.lists.map(function(d){return d.getChildren().map(c.modifier||function(e){return e.get("id");},this);},this);var a=c.index;if(this.lists.length==1){a=0;}return $chk(a)&&a>=0&&a<this.lists.length?b[a]:b;}});

/* Color */
var Color=new Native({initialize:function(b,c){if(arguments.length>=3){c="rgb";b=Array.slice(arguments,0,3);}else{if(typeof b=="string"){if(b.match(/rgb/)){b=b.rgbToHex().hexToRgb(true);}else{if(b.match(/hsb/)){b=b.hsbToRgb();}else{b=b.hexToRgb(true);}}}}c=c||"rgb";switch(c){case"hsb":var a=b;b=b.hsbToRgb();b.hsb=a;break;case"hex":b=b.hexToRgb(true);break;}b.rgb=b.slice(0,3);b.hsb=b.hsb||b.rgbToHsb();b.hex=b.rgbToHex();return $extend(b,this);}});Color.implement({mix:function(){var a=Array.slice(arguments);var c=($type(a.getLast())=="number")?a.pop():50;var b=this.slice();a.each(function(d){d=new Color(d);for(var e=0;e<3;e++){b[e]=Math.round((b[e]/100*(100-c))+(d[e]/100*c));}});return new Color(b,"rgb");},invert:function(){return new Color(this.map(function(a){return 255-a;}));},setHue:function(a){return new Color([a,this.hsb[1],this.hsb[2]],"hsb");},setSaturation:function(a){return new Color([this.hsb[0],a,this.hsb[2]],"hsb");},setBrightness:function(a){return new Color([this.hsb[0],this.hsb[1],a],"hsb");}});var $RGB=function(d,c,a){return new Color([d,c,a],"rgb");};var $HSB=function(d,c,a){return new Color([d,c,a],"hsb");};var $HEX=function(a){return new Color(a,"hex");};Array.implement({rgbToHsb:function(){var b=this[0],c=this[1],j=this[2],g=0;var i=Math.max(b,c,j),e=Math.min(b,c,j);var k=i-e;var h=i/255,f=(i!=0)?k/i:0;if(f!=0){var d=(i-b)/k;var a=(i-c)/k;var l=(i-j)/k;if(b==i){g=l-a;}else{if(c==i){g=2+d-l;}else{g=4+a-d;}}g/=6;if(g<0){g++;}}return[Math.round(g*360),Math.round(f*100),Math.round(h*100)];},hsbToRgb:function(){var c=Math.round(this[2]/100*255);if(this[1]==0){return[c,c,c];}else{var a=this[0]%360;var e=a%60;var g=Math.round((this[2]*(100-this[1]))/10000*255);var d=Math.round((this[2]*(6000-this[1]*e))/600000*255);var b=Math.round((this[2]*(6000-this[1]*(60-e)))/600000*255);switch(Math.floor(a/60)){case 0:return[c,b,g];case 1:return[d,c,g];case 2:return[g,c,b];case 3:return[g,d,c];case 4:return[b,g,c];case 5:return[c,g,d];}}return false;}});String.implement({rgbToHsb:function(){var a=this.match(/\d{1,3}/g);return(a)?a.rgbToHsb():null;},hsbToRgb:function(){var a=this.match(/\d{1,3}/g);return(a)?a.hsbToRgb():null;}});

/* Scroller */
var Scroller=new Class({Implements:[Events,Options],options:{area:20,velocity:1,onChange:function(a,b){this.element.scrollTo(a,b);},fps:50},initialize:function(b,a){this.setOptions(a);this.element=document.id(b);this.docBody=document.id(this.element.getDocument().body);this.listener=($type(this.element)!="element")?this.docBody:this.element;this.timer=null;this.bound={attach:this.attach.bind(this),detach:this.detach.bind(this),getCoords:this.getCoords.bind(this)};},start:function(){this.listener.addEvents({mouseover:this.bound.attach,mouseout:this.bound.detach});},stop:function(){this.listener.removeEvents({mouseover:this.bound.attach,mouseout:this.bound.detach});this.detach();this.timer=$clear(this.timer);},attach:function(){this.listener.addEvent("mousemove",this.bound.getCoords);},detach:function(){this.listener.removeEvent("mousemove",this.bound.getCoords);this.timer=$clear(this.timer);},getCoords:function(a){this.page=(this.listener.get("tag")=="body")?a.client:a.page;if(!this.timer){this.timer=this.scroll.periodical(Math.round(1000/this.options.fps),this);}},scroll:function(){var b=this.element.getSize(),a=this.element.getScroll(),f=this.element!=this.docBody?this.element.getOffsets():{x:0,y:0},c=this.element.getScrollSize(),e={x:0,y:0};for(var d in this.page){if(this.page[d]<(this.options.area+f[d])&&a[d]!=0){e[d]=(this.page[d]-this.options.area-f[d])*this.options.velocity;}else{if(this.page[d]+this.options.area>(b[d]+f[d])&&a[d]+b[d]!=c[d]){e[d]=(this.page[d]-b[d]+this.options.area-f[d])*this.options.velocity;}}}if(e.y||e.x){this.fireEvent("change",[a.x+e.x,a.y+e.y]);}}});

/* MooTools Extras */
Element.implement({'hover':function(fnA,fnB){this.addEvents({'mouseenter':function(e){fnA.attempt(e,this);},'mouseleave':function(e){fnB.attempt(e,this);}})}});
Color.implement({brightness:function(A){var B=this.hsb[2]+A;return this.setBrightness(B>0?(B>100?100:B):0);},hue:function(A){var B=this.hsb[0]+A;return this.setHue(B>0?(B>255?Math.abs(255-B):B):Math.abs(255+B));}});

/**
 * Sexy Alert Box for mootools 1.2 
 * @author Eduardo D. Sada - http://www.coders.me/web-js-html/javascript/sexy-alert-box
 * @version 1.2.2
 * @date 25-May-2009
 * @copyright (c) 2009 Eduardo D. Sada (www.coders.me)
 * @license MIT - http://es.wikipedia.org/wiki/Licencia_MIT
*/

/*
Class: SexyAlertBox
	Clone class of original javascript function : 'alert', 'confirm' and 'prompt'

Arguments:
	options - see Options below

Options:
	name - name of the box for use different style
	zIndex - integer, zindex of the box
	onReturn - return value when box is closed. defaults to false
	onReturnFunction - a function to fire when return box value
	BoxStyles - stylesheets of the box
	OverlayStyles - stylesheets of overlay
	showDuration - duration of the box transition when showing (defaults to 200 ms)
	showEffect - transitions, to be used when showing
	closeDuration - Duration of the box transition when closing (defaults to 100 ms)
	closeEffect - transitions, to be used when closing
	onShowStart - a function to fire when box start to showing
	onCloseStart - a function to fire when box start to closing
	onShowComplete - a function to fire when box done showing
	onCloseComplete - a function to fire when box done closing
*/
/*
	Property: messageBox
		Core system for show all type of box
		
	Argument:
		type - string, 'alert' or 'confirm' or 'prompt'
		message - text to show in the box
		properties - see Options below
		input - text value of default 'input' when prompt
		
	Options:
		textBoxBtnOk - text value of 'Ok' button
		textBoxBtnCancel - text value of 'Cancel' button
		onComplete - a function to fire when return box value
*/	

var SexyAlertBox=new Class({Implements:[Options, Chain, Events],getOptions:function(){return{name:'SexyAlertBox',zIndex:65555,onReturn:false,onReturnFunction:$empty,BoxStyles:{'width':500},OverlayStyles:{'background-color':'#000','opacity':0.7},showDuration:200,showEffect:Fx.Transitions.linear,closeDuration:100,closeEffect:Fx.Transitions.linear,moveDuration:500,moveEffect:Fx.Transitions.Back.easeOut,onShowStart:$empty,onShowComplete:$empty,onCloseStart:$empty,onCloseComplete:function(a){this.options.onReturnFunction(this.options.onReturn)}.bind(this)}},initialize:function(b){this.i=0;this.setOptions(this.getOptions(),b);this.Overlay=new Element('div',{'id':'BoxOverlay','styles':{'display':'none','position':'absolute','top':'0','left':'0','opacity':0,'z-index':this.options.zIndex,'background-color':this.options.OverlayStyles['background-color'],'height':window.getScrollHeight()+'px','width':window.getScrollWidth()+'px'}});this.Content=new Element('div',{'id':this.options.name+'-BoxContenedor'});this.Contenedor=new Element('div',{'id':this.options.name+'-BoxContent'}).adopt(this.Content);this.InBox=new Element('div',{'id':this.options.name+'-InBox'}).adopt(this.Contenedor);this.Box=new Element('div',{'id':this.options.name+'-Box','styles':{'display':'none','z-index':this.options.zIndex+2,'position':'absolute','top':'0','left':'0','width':this.options.BoxStyles['width']+'px'}}).adopt(this.InBox);this.Overlay.injectInside(document.body);this.Box.injectInside(document.body);this.preloadImages();window.addEvent('resize',function(){if(this.options.display==1){this.Overlay.setStyles({'height':window.getScrollHeight()+'px','width':window.getScrollWidth()+'px'});this.replaceBox()}}.bind(this));this.Box.addEvent('keydown',function(a){if(a.key=='esc'){this.options.onReturn=false;this.display(0)}}.bind(this));window.addEvent('scroll',this.replaceBox.bind(this))},preloadImages:function(){var a=new Array(2);a[0]=new Image();a[1]=new Image();a[2]=new Image();a[0].src=this.Box.getStyle('background-image').replace(new RegExp("url\\('?([^']*)'?\\)",'gi'),"$1");a[1].src=this.InBox.getStyle('background-image').replace(new RegExp("url\\('?([^']*)'?\\)",'gi'),"$1");a[2].src=this.Contenedor.getStyle('background-image').replace(new RegExp("url\\('?([^']*)'?\\)",'gi'),"$1")},togFlashObjects:function(a){var b=new Array("embed","iframe","object");for(y=0;y<b.length;y++){var c=document.getElementsByTagName(b[y]);for(i=0;i<c.length;i++){c[i].style.visibility=a}}},display:function(a){if(this.Transition)this.Transition.cancel();if(this.options.display==0&&a!=0||a==1){if(Browser.Engine.trident4)$$('select','object','embed').each(function(node){node.style.visibility='hidden'});this.togFlashObjects('hidden');this.Overlay.setStyle('display','block');this.options.display=1;this.fireEvent('onShowStart',[this.Overlay]);this.Transition=new Fx.Tween(this.Overlay,{property:'opacity',duration:this.options.showDuration,transition:this.options.showEffect,onComplete:function(){sizes=window.getSize();scrollito=window.getScroll();this.Box.setStyles({'display':'block','left':(scrollito.x+(sizes.x-this.options.BoxStyles['width'])/2).toInt()});this.replaceBox();this.fireEvent('onShowComplete',[this.Overlay])}.bind(this)}).start(this.options.OverlayStyles['opacity'])}else{if(Browser.Engine.trident4)$$('select','object','embed').each(function(node){node.style.visibility='visible'});this.togFlashObjects('visible');this.queue.delay(500,this);this.Box.setStyles({'display':'none','top':0});this.Content.empty();this.options.display=0;this.fireEvent('onCloseStart',[this.Overlay]);if(this.i==1){this.Transition=new Fx.Tween(this.Overlay,{property:'opacity',duration:this.options.closeDuration,transition:this.options.closeEffect,onComplete:function(){this.fireEvent('onCloseComplete',[this.Overlay])}.bind(this)}).start(0)}}},replaceBox:function(){if(this.options.display==1){sizes=window.getSize();scrollito=window.getScroll();if(this.MoveBox)this.MoveBox.cancel();this.MoveBox=new Fx.Morph(this.Box,{duration:this.options.moveDuration,transition:this.options.moveEffect}).start({'left':(scrollito.x+(sizes.x-this.options.BoxStyles['width'])/2).toInt(),'top':(scrollito.y+(sizes.y-this.Box.offsetHeight)/2).toInt()});this.focusin.delay(this.options.moveDuration,this)}},focusin:function(){if($chk($id('BoxAlertBtnOk'))){$id('BoxAlertBtnOk').focus()}else if($chk($id('BoxPromptInput'))){$id('BoxPromptInput').focus()}else if($chk($id('BoxConfirmBtnOk'))){$id('BoxConfirmBtnOk').focus()}},queue:function(){this.i--;this.callChain()},messageBox:function(a,b,c,d){this.chain(function(){c=$extend({'textBoxBtnOk':'OK','textBoxBtnCancel':'Cancelar','textBoxInputPrompt':null,'password':false,'onComplete':$empty},c||{});this.options.onReturnFunction=c.onComplete;this.ContenedorBotones=new Element('div',{'id':this.options.name+'-Buttons'});if(a=='alert'||a=='info'||a=='error'){this.AlertBtnOk=new Element('input',{'id':'BoxAlertBtnOk','type':'submit','value':c.textBoxBtnOk,'styles':{'width':'70px'}});this.AlertBtnOk.addEvent('click',function(){this.options.onReturn=true;this.display(0)}.bind(this));if(a=='alert')this.clase='BoxAlert';else if(a=='error')this.clase='BoxError';else if(a=='info')this.clase='BoxInfo';this.Content.setProperty('class',this.clase).set('html',b);this.AlertBtnOk.injectInside(this.ContenedorBotones);this.ContenedorBotones.injectInside(this.Content);this.display(1)}else if(a=='confirm'){this.ConfirmBtnOk=new Element('input',{'id':'BoxConfirmBtnOk','type':'submit','value':c.textBoxBtnOk,'styles':{'width':'70px'}});this.ConfirmBtnCancel=new Element('input',{'id':'BoxConfirmBtnCancel','type':'submit','value':c.textBoxBtnCancel,'styles':{'width':'70px'}});this.ConfirmBtnOk.addEvent('click',function(){this.options.onReturn=true;this.display(0)}.bind(this));this.ConfirmBtnCancel.addEvent('click',function(){this.options.onReturn=false;this.display(0)}.bind(this));this.Content.setProperty('class','BoxConfirm').set('html',b);this.ConfirmBtnOk.injectInside(this.ContenedorBotones);this.ConfirmBtnCancel.injectInside(this.ContenedorBotones);this.ContenedorBotones.injectInside(this.Content);this.display(1)}else if(a=='prompt'){this.PromptBtnOk=new Element('input',{'id':'BoxPromptBtnOk','type':'submit','value':c.textBoxBtnOk,'styles':{'width':'70px'}});this.PromptBtnCancel=new Element('input',{'id':'BoxPromptBtnCancel','type':'submit','value':c.textBoxBtnCancel,'styles':{'width':'70px'}});a=c.password?'password':'text';this.PromptInput=new Element('input',{'id':'BoxPromptInput','type':a,'value':d,'styles':{'width':'250px'}});this.PromptBtnOk.addEvent('click',function(){this.options.onReturn=this.PromptInput.value;this.display(0)}.bind(this));this.PromptBtnCancel.addEvent('click',function(){this.options.onReturn=false;this.display(0)}.bind(this));this.Content.setProperty('class','BoxPrompt').set('html',b+'<br />');this.PromptInput.injectInside(this.Content);new Element('br').injectInside(this.Content);this.PromptBtnOk.injectInside(this.ContenedorBotones);this.PromptBtnCancel.injectInside(this.ContenedorBotones);this.ContenedorBotones.injectInside(this.Content);this.display(1)}else{this.options.onReturn=false;this.display(0)}});this.i++;if(this.i==1)this.callChain()},alert:function(a,b){this.messageBox('alert',a,b)},info:function(a,b){this.messageBox('info',a,b)},error:function(a,b){this.messageBox('error',a,b)},confirm:function(a,b){this.messageBox('confirm',a,b)},prompt:function(a,b,c){this.messageBox('prompt',a,c,b)}});


/***
 * MooRainbow
 *
 * @version		1.2b2
 * @license		MIT-style license
 * @author		Djamil Legato - < djamil [at] djamil.it >
 * @infos		http://moorainbow.woolly-sheep.net
 * @copyright	Author
 * 
 *
 */

var Rainbows = [];

var MooRainbow = new Class({
	options: {
		id: 'mooRainbow',
		prefix: 'moor-',
		imgPath: 'images/',
		startColor: [255, 0, 0],
		wheel: true,
		onComplete: $empty,
		onChange: $empty
	},
	
	initialize: function(el, options) {
		this.element = $id(el);
		if (!this.element) return;
		this.setOptions(options);
		
		this.sliderPos = 0;
		this.pickerPos = {x: 0, y: 0};
		this.backupColor = this.options.startColor;
		this.currentColor = this.options.startColor;
		this.sets = {
			rgb: [],
			hsb: [],
			hex: []	
		};
		this.pickerClick = this.sliderClick  = false;
		if (!this.layout) this.doLayout();
		this.OverlayEvents();
		this.sliderEvents();
		this.backupEvent();
		if (this.options.wheel) this.wheelEvents();
		this.element.addEvent('click', function(e) { this.closeAll().toggle(e); }.bind(this));
				
		this.layout.overlay.setStyle('background-color', this.options.startColor.rgbToHex());
		this.layout.backup.setStyle('background-color', this.backupColor.rgbToHex());

		
		this.manualSet(this.currentColor);

		if (window.khtml) this.hide();
	},
	
	toggle: function() {
		this[this.visible ? 'hide' : 'show']();
	},
	
	show: function() {
		this.rePosition();
		this.layout.setStyle('display', 'block');
		this.visible = true;
		this.manualSet(this.currentColor);
	},
	
	hide: function() {
		this.layout.setStyles({'display': 'none'});
		this.visible = false;
	},
	
	closeAll: function() {
		Rainbows.each(function(obj) { obj.hide(); });
		
		return this;
	},
	
	manualSet: function(color, type) {
		
		color = new Color(color, type);
		
		this.setMooRainbow(color.rgb, 'rgb');
		this.autoSet(color.hsb);
	},
	
	autoSet: function(hsb) {
		var oveH = this.layout.overlay.height;
		var oveW = this.layout.overlay.width;
		var sliH = this.layout.slider.height;
		var arwH = parseInt(this.layout.arrows.height/2);
		var hue;
		
		//var scrollTop = doc.body.scrollTop + doc.documentElement.scrollTop;
		
		var posx = Math.round(((oveW * hsb[1]) / 100) + this.layout.cursor.halfwidth);
		var posy = Math.round(- ((oveH * hsb[2]) / 100) + oveH + this.layout.cursor.halfheight);

		var c = Math.round(((sliH * hsb[0]) / 360)); c = (c == 360) ? 0 : c;
		var position = sliH - c + this.layout.slider.getStyle('marginTop').toInt() - arwH;
		hue = (new Color([hsb[0], 100, 100],'hsb')).rgbToHex();
		
		this.layout.cursor.setStyles({'top': posy, 'left': posx});
		this.layout.arrows.setStyle('top', position);
		this.layout.overlay.setStyle('background-color', hue);
		this.sliderPos = this.layout.arrows.offsetTop - arwH;
		this.pickerPos.x = this.layout.cursor.offsetLeft + this.layout.cursor.halfwidth;
		this.pickerPos.y = this.layout.cursor.offsetTop + this.layout.cursor.halfheight;// - scrollTop;
	},
	
	setMooRainbow: function(color, type) {
		
		color = new Color(color,type)

		this.sets = {
			rgb: color.rgb,
			hsb: color.hsb,
			hex: color.hex
		};

		if (!$chk(this.pickerPos.x))
			this.autoSet(color.hsb);		

		this.RedInput.value = color.rgb[0];
		this.GreenInput.value = color.rgb[1];
		this.BlueInput.value = color.rgb[2];
		this.HueInput.value = color.hsb[0];
		this.SatuInput.value =  color.hsb[1];
		this.BrighInput.value = color.hsb[2];
		this.hexInput.value = color.hex;
		
		this.currentColor = color.rgb;

		this.chooseColor.setStyle('background-color', color.hex);
	},
	
	setStartColor: function(color, type) {
		color = new Color(color,type)
		this.backupColor = this.currentColor = color.rgb;
		this.layout.backup.setStyle('background-color', (new Color(this.backupColor)).rgbToHex());
		this.manualSet(this.currentColor);
	},
	
	parseColors: function(x, y, z) {
		var s = Math.round((x * 100) / this.layout.overlay.width);
		var b = 100 - Math.round((y * 100) / this.layout.overlay.height);
		var h = 360 - Math.round((z * 360) / this.layout.slider.height) + this.layout.slider.getStyle('marginTop').toInt() - parseInt(this.layout.arrows.height/2);
		h -= parseInt(this.layout.arrows.height/2);
		h = (h >= 360) ? 0 : (h < 0) ? 0 : h;
		s = (s > 100) ? 100 : (s < 0) ? 0 : s;
		b = (b > 100) ? 100 : (b < 0) ? 0 : b;

		return [h, s, b];
	},
	
	OverlayEvents: function() {
		var inputs = $A(this.arrRGB).concat(this.arrHSB, this.hexInput);

		document.addEvent('click', function() { 
			if(this.visible) this.hide(this.layout); 
		}.bind(this));

		inputs.each(function(el) {
			el.addEvent('keydown', this.eventKeydown.bindWithEvent(this, el));
			el.addEvent('keyup', this.eventKeyup.bindWithEvent(this, el));
		}, this);
		
		[this.element, this.layout].each(function(el) {
			el.addEvents({
				'click': function(e) { new Event(e).stop(); },
				'keyup': function(e) {
					e = new Event(e);
					if(e.key == 'esc' && this.visible) this.hide(this.layout);
				}.bind(this)
			}, this);
		}, this);
		
		
		var lim = {
			x: [0 + this.layout.cursor.halfwidth, this.layout.overlay.width + this.layout.cursor.halfwidth],
			y: [0 + this.layout.cursor.halfheight, this.layout.overlay.height + this.layout.cursor.halfheight]
		};

		this.layout.drag = new Drag(this.layout.cursor, {
			limit: lim,
			onBeforeStart: this.overlayDrag.bind(this),
			onStart: this.overlayDrag.bind(this),
			onDrag: this.overlayDrag.bind(this),
			snap: 0
		});	
		
		this.layout.overlay2.addEvent('mousedown', function(e){
			e = new Event(e);
			//var st = doc.body.scrollTop + doc.documentElement.scrollTop;
			this.layout.cursor.setStyles({
				'top': e.page.y - this.layout.overlay.getTop(),
				'left': e.page.x - this.layout.overlay.getLeft()
			});
			this.layout.drag.start(e);
		}.bind(this));
		
		
		var setColor = function(){
			if (this.currentColor == this.options.startColor) {
				this.hide();
				this.fireEvent('onComplete', [this.sets, this]);
			}
			else {
				this.backupColor = this.currentColor;
				this.layout.backup.setStyle('background-color', (new Color(this.backupColor)).rgbToHex());
				this.hide();
				this.fireEvent('onComplete', [this.sets, this]);
			}
		};
		
		this.layout.cursor.addEvent('dblclick', setColor.bind(this));
		
		this.okButton.addEvent('click', setColor.bind(this));
		
		this.transp.addEvent('click', function () {
			this.hide();
			this.fireEvent('onComplete', ['transparent', this]);
		}.bind(this));
	},
	
	overlayDrag: function() {
		this.pickerPos.x = this.layout.cursor.offsetLeft - this.layout.cursor.halfwidth;
		this.pickerPos.y = this.layout.cursor.offsetTop - this.layout.cursor.halfheight;
		
		this.setMooRainbow(this.parseColors(this.pickerPos.x, this.pickerPos.y, this.sliderPos), 'hsb');
		this.fireEvent('onChange', [this.sets, this]);
	},
	
	sliderEvents: function() {
		var arwH = parseInt(this.layout.arrows.height/2);
		var slrT = this.layout.slider.getStyle('marginTop').toInt();
		var lim;

		lim = [0 + slrT - arwH, this.layout.slider.height - arwH + slrT];
		this.layout.sliderDrag = new Drag(this.layout.arrows, {
			limit: {y: lim},
			modifiers: {x: false},
			onBeforeStart: this.sliderDrag.bind(this),
			onStart: this.sliderDrag.bind(this),
			onDrag: this.sliderDrag.bind(this),
			snap: 0
		});	
	
		this.layout.slider.addEvent('mousedown', function(e){
			e = new Event(e);

			this.layout.arrows.setStyle(
				'top', e.page.y - this.layout.slider.getTop() + this.layout.slider.getStyle('marginTop').toInt() - arwH
			);
			this.layout.sliderDrag.start(e);
		}.bind(this));
	},

	sliderDrag: function() {
		var arwH = parseInt(this.layout.arrows.height/2);
		var hue;
		
		this.sliderPos = this.layout.arrows.offsetTop - arwH;
		this.setMooRainbow(this.parseColors(this.pickerPos.x, this.pickerPos.y, this.sliderPos), 'hsb');
		hue = (new Color([this.sets.hsb[0], 100, 100])).hsbToRgb().rgbToHex();
		this.layout.overlay.setStyle('background-color', hue);
		this.fireEvent('onChange', [this.sets, this]);
	},
	
	backupEvent: function() {
		this.layout.backup.addEvent('click', function() {
			this.manualSet(this.backupColor);
			this.fireEvent('onChange', [this.sets, this]);
		}.bind(this));
	},
	
	wheelEvents: function() {
		var arrColors = $A(this.arrRGB).extend(this.arrHSB);

		arrColors.each(function(el) {
			el.addEvents({
				'mousewheel': this.eventKeys.bindWithEvent(this, el),
				'keydown': this.eventKeys.bindWithEvent(this, el)
			});
		}, this);
		
		[this.layout.arrows, this.layout.slider].each(function(el) {
			el.addEvents({
				'mousewheel': this.eventKeys.bindWithEvent(this, [this.arrHSB[0], 'slider']),
				'keydown': this.eventKeys.bindWithEvent(this, [this.arrHSB[0], 'slider'])
			});
		}, this);
	},
	
	eventKeys: function(e, el, id) {
		var wheel, type;
		id = (!id) ? el.id : this.arrHSB[0];

		if (e.type == 'keydown') {
			if (e.key == 'up') wheel = 1;
			else if (e.key == 'down') wheel = -1;
			else return;
		} else if (e.type == Element.Events.mousewheel.base) wheel = (e.wheel > 0) ? 1 : -1;
		
		if (this.arrRGB.contains(el)) type = 'rgb';
		else if (this.arrHSB.contains(el)) type = 'hsb';
		else type = 'hsb';

		if (type == 'rgb') {
			var rgb = this.sets.rgb, hsb = this.sets.hsb, prefix = this.options.prefix, pass;
			var value = (el.value.toInt() || 0) + wheel;
			value = (value > 255) ? 255 : (value < 0) ? 0 : value;

			switch(el.className) {
				case prefix + 'rInput': pass = [value, rgb[1], rgb[2]];	break;
				case prefix + 'gInput': pass = [rgb[0], value, rgb[2]];	break;
				case prefix + 'bInput':	pass = [rgb[0], rgb[1], value];	break;
				default : pass = rgb;
			}
			this.manualSet(pass);
			this.fireEvent('onChange', [this.sets, this]);
		} else {
			var rgb = this.sets.rgb, hsb = this.sets.hsb, prefix = this.options.prefix, pass;
			var value = (el.value.toInt() || 0) + wheel;

			if (el.className.test(/(HueInput)/)) value = (value > 359) ? 0 : (value < 0) ? 0 : value;
			else value = (value > 100) ? 100 : (value < 0) ? 0 : value;
			
			switch(el.className) {
				case prefix + 'HueInput': pass = [value, hsb[1], hsb[2]]; break;
				case prefix + 'SatuInput': pass = [hsb[0], value, hsb[2]]; break;
				case prefix + 'BrighInput':	pass = [hsb[0], hsb[1], value]; break;
				default : pass = hsb;
			}
			
			this.manualSet(pass, 'hsb');
			this.fireEvent('onChange', [this.sets, this]);
		}
		e.stop();
	},
	
	eventKeydown: function(e, el) {
		var n = e.code, k = e.key;

		if 	((!el.className.test(/hexInput/) && !(n == 38 || n == 107 || n == 40 || n == 109) && !(n >= 48 && n <= 57) && !(n >= 96 && n <= 105)) &&
			(k!='backspace' && k!='tab' && k !='delete' && k!='left' && k!='right'))
		e.stop();
		
		if (!el.className.test(/hexInput/)) {
			if(n==38 || n==107) el.value = parseInt(el.value) + 1;
			else if (n==40 || n==109) el.value = parseInt(el.value) - 1;
			
			if (el.value < 0) el.value = 0;
			
			if (el.className.test(/(rInput|gInput|bInput)/)) {
				if (el.value  > 255) el.value = 255;
			} else {
				if (el.className.test(/HueInput/)){
					if (el.value  > 360) el.value = 360;
				} else {
					if (el.value  > 100) el.value = 100;
				}
			}
		}
	},
	
	eventKeyup: function(e, el) {
		var n = e.code, k = e.key, pass, prefix, chr = el.value.charAt(0);

		if (!$chk(el.value)) return;
		if (el.className.test(/hexInput/)) {
			if (chr != "#" && el.value.length != 6) return;
			if (chr == '#' && el.value.length != 7) return;
		} else {
			if (!(n == 38 || n == 107 || n == 40 || n == 109) && !(n >= 48 && n <= 57) && !(n >= 96 && n <= 105) && (!['backspace', 'tab', 'delete', 'left', 'right'].contains(k)) && el.value.length > 3) return;
		}
		
		prefix = this.options.prefix;

		if (el.className.test(/(rInput|gInput|bInput)/)) {
			if (el.value  < 0) el.value = 0;
			else if (el.value  > 255) el.value = 255;
			switch(el.className){
				case prefix + 'rInput': pass = [el.value, this.sets.rgb[1], this.sets.rgb[2]]; break;
				case prefix + 'gInput': pass = [this.sets.rgb[0], el.value, this.sets.rgb[2]]; break;
				case prefix + 'bInput': pass = [this.sets.rgb[0], this.sets.rgb[1], el.value]; break;
				default : pass = this.sets.rgb;
			}
			this.manualSet(pass);
			this.fireEvent('onChange', [this.sets, this]);
		}
		else if (!el.className.test(/hexInput/)) {
			if (el.className.test(/HueInput/) && el.value  < 0 || el.value > 360) return;
			else if (el.className.test(/HueInput/) && el.value == 360) el.value = 0;
			else if (el.className.test(/(SatuInput|BrighInput)/) && el.value  < 0 || el.value > 100) return;
			switch(el.className){
				case prefix + 'HueInput': pass = [el.value, this.sets.hsb[1], this.sets.hsb[2]]; break;
				case prefix + 'SatuInput': pass = [this.sets.hsb[0], el.value, this.sets.hsb[2]]; break;
				case prefix + 'BrighInput': pass = [this.sets.hsb[0], this.sets.hsb[1], el.value]; break;
				default : pass = this.sets.hsb;
			}
			this.manualSet(pass, 'hsb');
			this.fireEvent('onChange', [this.sets, this]);
		} else {
			pass = (new Color(el.value)).rgb;
			if (isNaN(pass[0])||isNaN(pass[1])||isNaN(pass[2])) return;

			if ($chk(pass)) {
				this.manualSet(pass);
				this.fireEvent('onChange', [this.sets, this]);
			}
		}
			
	},
			
	doLayout: function() {
		var id = this.options.id, prefix = this.options.prefix;
		var idPrefix = id + ' .' + prefix;

		this.layout = new Element('div', {
			'styles': {'display': 'block', 'position': 'fixed','z-index':'9999'},
			'id': id
		}).inject(document.body);
		
		Rainbows.push(this);

		var box = new Element('div', {
			'styles':  {'position': 'relative'},
			'class': prefix + 'box'
		}).inject(this.layout);

		
		var drag = new Element('div', {
			'styles': {'position': 'absolute', 'overflow': 'hidden'},
			'class': prefix + 'dragBox'
		}).inject(box);
		
		this.layout.makeDraggable({	handle: drag });
		
		var div = new Element('div', {
			'styles': {'position': 'absolute', 'overflow': 'hidden'},
			'class': prefix + 'overlayBox'
		}).inject(box);
		
		var ar = new Element('div', {
			'styles': {'position': 'absolute', 'zIndex': 1},
			'class': prefix + 'arrows'
		}).inject(box);
		
		var ov = new Element('div', {
			'styles': {'background-color': '#fff', 'position': 'relative', 'zIndex': 2},
			'class': prefix + 'overlayBoxColor'
		}).inject(div);
		
		var ov2 = new Element('div', {
			'styles': {'position': 'absolute', 'top': 0, 'left': 0, 'zIndex': 2},
			'class': prefix + 'overlayBoxOver'
		}).inject(div);
		

		var cr = new Element('div', {
			'styles': {'overflow': 'hidden', 'position': 'absolute', 'zIndex': 2},
			'class': prefix + 'cursor'	
		}).inject(div);
		
		var sl = new Element('div', {
			'styles': {'position': 'absolute', 'z-index': 2},
			'class': prefix + 'slider'
		}).inject(box);

		new Element('div', {
			'styles': {'position': 'absolute'},
			'class': prefix + 'colorBox'
		}).inject(box);

		new Element('div', {
			'styles': {'zIndex': 2, 'position': 'absolute'},
			'class': prefix + 'chooseColor'
		}).inject(box);
			
		this.layout.backup = new Element('div', {
			'styles': {'zIndex': 2, 'position': 'absolute', 'cursor': 'pointer'},
			'class': prefix + 'currentColor'
		}).inject(box);
		
		var R = new Element('label').inject(box).setStyle('position', 'absolute');
		var G = R.clone().inject(box).addClass(prefix + 'gLabel').appendText('G: ');
		var B = R.clone().inject(box).addClass(prefix + 'bLabel').appendText('B: ');
		R.appendText('R: ').addClass(prefix + 'rLabel');
		
		var inputR = new Element('input',{'type': 'text','maxlength':'3'});
		var inputG = inputR.clone().inject(G).addClass(prefix + 'gInput');
		var inputB = inputR.clone().inject(B).addClass(prefix + 'bInput');
		inputR.inject(R).addClass(prefix + 'rInput');
		
		var HU = new Element('label').inject(box).setStyle('position', 'absolute');
		var SA = HU.clone().inject(box).addClass(prefix + 'SatuLabel').appendText('S: ');
		var BR = HU.clone().inject(box).addClass(prefix + 'BrighLabel').appendText('B: ');
		HU.appendText('H: ').addClass(prefix + 'HueLabel');

		var inputHU = new Element('input',{'type': 'text','maxlength':'3'});
		var inputSA = inputHU.clone().inject(SA).addClass(prefix + 'SatuInput');
		var inputBR = inputHU.clone().inject(BR).addClass(prefix + 'BrighInput');
		inputHU.inject(HU).addClass(prefix + 'HueInput');
		SA.appendText(' %'); BR.appendText(' %');
		new Element('span', {'styles': {'position': 'absolute'}, 'class': prefix + 'ballino'}).set('html', " &deg;").injectAfter(HU);

		var hex = new Element('label').inject(box).setStyle('position', 'absolute').addClass(prefix + 'hexLabel').appendText('#hex: ').adopt(new Element('input',{'type': 'text','maxlength':'7'}).addClass(prefix + 'hexInput'));
		
		var ok = new Element('input', {
			'styles': {'position': 'absolute'},
			'type': 'button',
			'value': 'Select',
			'class': prefix + 'okButton'
		}).inject(box);
		
		var transp = new Element('a', {'style': {'position': 'absolute'}, 'href': '#', 'class': prefix + 'transp'}).inject(box);
		
		this.rePosition();

		this.layout.overlay = document.getElement('#' + idPrefix + 'overlayBoxColor');
		this.layout.overlay2 = document.getElement('#' + idPrefix + 'overlayBoxOver');
		this.layout.cursor = document.getElement('#' + idPrefix + 'cursor');
		this.layout.arrows = document.getElement('#' + idPrefix + 'arrows');
		this.layout.slider = document.getElement('#' + idPrefix + 'slider');
		this.layout.backup = document.getElement('#' + idPrefix + 'currentColor');
		this.chooseColor = document.getElement('#' + idPrefix + 'chooseColor');
		this.RedInput = document.getElement('#' + idPrefix + 'rInput');
		this.GreenInput = document.getElement('#' + idPrefix + 'gInput');
		this.BlueInput = document.getElement('#' + idPrefix + 'bInput');
		this.HueInput = document.getElement('#' + idPrefix + 'HueInput');
		this.SatuInput = document.getElement('#' + idPrefix + 'SatuInput');
		this.BrighInput = document.getElement('#' + idPrefix + 'BrighInput');
		this.hexInput = document.getElement('#' + idPrefix + 'hexInput');
		
		this.layout.overlay.width=this.layout.overlay.getStyle('width').toInt();
		this.layout.overlay.height=this.layout.overlay.getStyle('height').toInt();
		
		this.layout.cursor.width=this.layout.cursor.getStyle('width').toInt();
		this.layout.cursor.halfwidth = parseInt(this.layout.cursor.width/2);
		this.layout.cursor.height=this.layout.cursor.getStyle('height').toInt();
		this.layout.cursor.halfheight = parseInt(this.layout.cursor.height/2);
		
		this.layout.arrows.width=this.layout.arrows.getStyle('width').toInt();
		this.layout.arrows.height=this.layout.arrows.getStyle('height').toInt();
		
		this.layout.slider.width=this.layout.slider.getStyle('width').toInt();
		this.layout.slider.height=this.layout.slider.getStyle('height').toInt();

		this.arrRGB = [this.RedInput, this.GreenInput, this.BlueInput];
		this.arrHSB = [this.HueInput, this.SatuInput, this.BrighInput];
		this.okButton = document.getElement('#' + idPrefix + 'okButton');
		this.transp = box.getElement('.' + prefix + 'transp');
		
		if (!window.khtml) this.hide();
	},
	rePosition: function() {
		var coords = this.element.getCoordinates();
		var st = doc.body.scrollTop + doc.documentElement.scrollTop;
		this.layout.setStyles({
			'left': coords.left,
			'top': coords.top + coords.height + 1 - st
		});
	}
});

MooRainbow.implement(new Options);
MooRainbow.implement(new Events);

// END of MooTools


/**
 * Twitter - http://www.twitter.com
 * Copyright (C) 2009 Twitter
 * Author: Dustin Diaz (dustin@twitter.com)
 *
 * V 2.1.1 Twitter search/profile/faves/list widget
 * http://twitter.com/widgets
 */
TWTR={};
(function(){
function A(B,D,C){
	this.el=B;
	this.prop=D;
	this.from=C.from;
	this.to=C.to;
	this.time=C.time;
	this.callback=C.callback;
	this.animDiff = this.to - this.from;
}
A.canTransition=function(){
	var B=document.createElement("twitter");
	B.style.cssText="-webkit-transition: all .5s linear;";
	return !!B.style.webkitTransitionProperty;
}();
A.prototype._setStyle=function(B){
	switch(this.prop){
		case"opacity":
			this.el.style[this.prop]=B;
			this.el.style.filter="alpha(opacity="+B*100+")";
			break;
		default:
			this.el.style[this.prop]=B+"px";
			break;
	}
};
A.prototype._animate=function(){
	var B=this;
	this.now=new Date();
	this.diff=this.now-this.startTime;
	if(this.diff>this.time){
		this._setStyle(this.to);
		if(this.callback){
			this.callback.call(this);
		}
		clearInterval(this.timer);
		return;
	}
	this.percentage=(Math.floor((this.diff/this.time)*100)/100);
	this.val=(this.animDiff*this.percentage)+this.from;
	this._setStyle(this.val);
};
A.prototype.start=function(){
	var B=this;
	this.startTime=new Date();
	this.timer=setInterval(function(){B._animate.call(B)},25);
};
TWTR.Widget=function(B){
	this.init(B);
};
(function(){
	var N={};
	var a={};
	var Y=function(d){
		var b=a[d];
		if(!b){
			b=new RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)");
			a[d]=b;
		}
		return b;
	};
	var C=function(g,l,h,j){
		var l=l||"*";
		var h=h||document;
		var d=[], b=h.getElementsByTagName(l), k=Y(g);
		for(var e=0,f=b.length;e<f;++e){
			if(k.test(b[e].className)){
				d[d.length]=b[e];
				if(j){
					j.call(b[e],b[e]);
				}
			}
		}
		return d;
	};
	var Z=function(){
		var b=navigator.userAgent;
		return {ie:b.match(/MSIE\s([^;]*)/)};
	}();
	var G=function(b){
		if(typeof b=="string"){
			return document.getElementById(b);
		}
		return b;
	};
	var S=function(b){
		return b.replace(/^\s+|\s+$/g,"");
	};
	var R=function(){
		var b=self.innerHeight;
		var c=document.compatMode;
		if((c||Z.ie)){
			b=(c=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;
		}
		return b;
	};
	var X=function(d,b){
		var c=d.target||d.srcElement;
		return b(c);
	};
	var P=function(c){
		try{
			if(c&&3==c.nodeType){
				return c.parentNode;
			}else{
				return c;
			}
		}catch(b){}
	};
	var Q=function(c){
		var b=c.relatedTarget;
		if(!b){
			if(c.type=="mouseout"){
				b=c.toElement;
			}else{
				if(c.type=="mouseover"){
					b=c.fromElement;
				}
			}
		}
		return P(b);
	};
	var U=function(c,b){
		b.parentNode.insertBefore(c,b.nextSibling);
	};
	var V=function(c){
		try{
			c.parentNode.removeChild(c);
		}catch(b){}
	};
	var T=function(b){
		return b.firstChild;
	};
	var B=function(d){
		var c=Q(d);
		while(c&&c!=this){
			try{
				c=c.parentNode;
			}catch(b){
				c=this;
			}
		}
		if(c!=this){
			return true;
		}
		return false;
	};
	var F=function(){
		if(document.defaultView&&document.defaultView.getComputedStyle){
			return function(c,f){
				var e=null;
				var d=document.defaultView.getComputedStyle(c,"");
				if(d){e=d[f]}
				var b=c.style[f]||e;
				return b;
				}
		}else{
			if(document.documentElement.currentStyle&&Z.ie){
				return function(b,d){
					var c=b.currentStyle?b.currentStyle[d]:null;
					return(b.style[d]||c);
				}
			}
		}
	}();
	var W={
		has:function(b,d){
			return new RegExp("(^|\\s)"+d+"(\\s|$)").test(G(b).className);
		},
		add:function(b,d){
			if(!this.has(b,d)){
				G(b).className=S(G(b).className)+" "+d
			}
		},
		remove:function(b,d){
			if(this.has(b,d)){
				G(b).className=G(b).className.replace(new RegExp("(^|\\s)"+d+"(\\s|$)","g"),"");
			}
		}
	};
	var D={
		add:function(d,c,b){
			if(d.addEventListener){
				d.addEventListener(c,b,false);
			}else{
				d.attachEvent("on"+c,function(){b.call(d,window.event)});
			}
		},
		remove:function(d,c,b){
			if(d.removeEventListener){
				d.removeEventListener(c,b,false);
			}else{
				d.detachEvent("on"+c,b);
			}
		}
	};
	var H={
		bool:function(c){
			return typeof c==="boolean";
		},
		def:function(b){
			return !(typeof b==="undefined");
		},
		number:function(b){
			return typeof b==="number"&&isFinite(b);
		},
		string:function(b){
			return typeof b==="string";
		},
		fn:function(b){
			return typeof b==="function";
		},
		array:function(b){
			if(b){
				return H.number(b.length)&&H.fn(b.splice);
			}
			return false;
		}
	};
	var L=["January","February","March","April","May","June","July","August","September","October","November","December"];
	var O=function(f){
		var i=new Date(f);
		if(Z.ie){
			i=Date.parse(f.replace(/( \+)/," UTC$1"));
		}
		var c="";
		var b=function(){
			var d=i.getHours();
			if(d>0&&d<13){
				c="am";
				return d;
			}else{
				if(d<1){
					c="am";
					return 12;
				}else{
					c="pm";
					return d-12;
				}
			}
		}();
		var e=i.getMinutes();
		var h=i.getSeconds();
		function g(){
			var d=new Date();
			if(d.getDate()!=i.getDate()||d.getYear()!=i.getYear()||d.getMonth()!=i.getMonth()){
				return" - "+L[i.getMonth()]+" "+i.getDate()+", "+i.getFullYear()
			}else{
				return""
			}
		}
		return b+":"+e+c+g();
	};
	var J=function(h){
		var j=new Date();
		var f=new Date(h);
		if(Z.ie){
			f=Date.parse(h.replace(/( \+)/," UTC$1"));
		}
		var i=j-f;
		var c=1000, d=c*60, e=d*60, g=e*24, b=g*7;
		if(isNaN(i)||i<0){return""}
		if(i<c*7){return"right now"}
		if(i<d){return Math.floor(i/c)+" seconds ago"}
		if(i<d*2){return"about 1 minute ago"}
		if(i<e){return Math.floor(i/d)+" minutes ago"}
		if(i<e*2){return"about 1 hour ago"}
		if(i<g){return Math.floor(i/e)+" hours ago"}
		if(i>g&&i<g*2){return"yesterday"}
		if(i<g*365){return Math.floor(i/g)+" days ago"}
		else{return"over a year ago"}
	};
	var E={
		link:function(b){
			return b.replace(/\b(((https*\:\/\/)|www\.).+?)(([!?,.\)]+)?(\s|$))/g, function(h,g,e,d,c){
				var f=e.match(/w/) ? "http://" : "";
				return'<a class="twtr-hyperlink" target="_blank" href="'+f+g+'">'+((g.length>25)?g.substr(0,24)+"...":g)+"</a>"+c;
			});
		},
		at:function(b){
			return b.replace(/\B\@([a-zA-Z0-9_]{1,20})/g, function(c,d){
				return '@<a target="_blank" class="twtr-atreply" href="http://twitter.com/'+d+'">'+d+"</a>";
			});
		},
		list:function(b){
			return b.replace(/\B\@([a-zA-Z0-9_]{1,20}\/\w+)/g, function(c,d){
				return'@<a target="_blank" class="twtr-atreply" href="http://twitter.com/'+d+'">'+d+"</a>";
			});
		},
		hash:function(b){
			return b.replace(/\B\#(\w+)/gi, function(c,d){
				return'<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23'+d+'">#'+d+"</a>";
			});
		},
		clean:function(b){
			return this.hash(this.at(this.list(this.link(b))));
		}
	};
	function M(c,d,b){
		this.job=c;
		this.decayFn=d;
		this.interval=b;
		this.decayRate=1;
		this.decayMultiplier=1.25;
		this.maxDecayTime=3*60*1000;
	}
	M.prototype={
		start:function(){
			this.stop().run();
			return this;
		},
		stop:function(){
			if(this.worker){
				window.clearTimeout(this.worker);
			}
			return this;
		},
		run:function(){
			var b=this;
			this.job(function(){
				b.decayRate=b.decayFn()?Math.max(1,b.decayRate/b.decayMultiplier):b.decayRate*b.decayMultiplier;
				var c=b.interval*b.decayRate;
				c=(c>=b.maxDecayTime)?b.maxDecayTime:c;
				c=Math.floor(c);
				b.worker=window.setTimeout(function(){
					b.run.call(b);
				},c);
			});
		},
		destroy:function(){
			this.stop();
			this.decayRate=1;
			return this;
		}
	};
	function I(c,d,b,e){
		this.time=d||10000;
		this.loop=b||false;
		this.repeated=0;
		this.total=c.length;
		this.callback=e;
		this.haystack=c;
	}
	I.prototype={
		start:function(b){
			var c=this;
			if(b){
				this.repeated=0;
			}
			this.stop()._job();
			this.timer=window.setInterval(function(){c._job.call(c)},this.time);
			return this;
		},
		stop:function(){
			if(this.timer){
				window.clearInterval(this.timer);
			}
			return this;
		},
		_job:function(){
			if(this.repeated===this.total){
				if(this.loop){
					this.repeated=0;
				}else{
					this.stop();
					return;
				}
			}
			this.callback(this.haystack[this.repeated]);
			this.repeated++;
			return this;
		}
	};
	function K(c){
		var b = '<div class="twtr-tweet-wrap">\
					<div class="twtr-avatar">\
						<div class="twtr-img">\
						<a target="_blank" href="http://twitter.com/'+ c.user +'">\
							<img alt="'+ c.user +' profile" src="'+c.avatar+'">\
						</a>\
						</div>\
					</div>\
					<div class="twtr-tweet-text">\
						<p>\
						<a target="_blank" href="http://twitter.com/'+ c.user +'" class="twtr-user">'+ c.user +"</a> "
						+ c.tweet +'<i>\
						<a target="_blank" class="twtr-timestamp" time="'+ c.timestamp +'" href="http://twitter.com/'+ c.user +"/status/"+ c.id +'">'+ c.created_at +'</a>\
						<a target="_blank" class="twtr-reply" href="http://twitter.com/?status=@'+ c.user +"%20&in_reply_to_status_id="+ c.id +"&in_reply_to="+ c.user +'">reply</a></i>\
						</p>\
					</div>\
				</div>';
		var d=document.createElement("div");
		d.id="tweet-id-"+ ++K._tweetCount;
		d.className="twtr-tweet";
		d.innerHTML=b;
		this.element=d;
	}
	K._tweetCount=0;
	N.loadStyleSheet=function(d,c){
		TWTR.Widget.loadingStyleSheet=true;
		var b=document.createElement("link");
		b.href=d;
		b.rel="stylesheet";
		b.type="text/css";
		document.getElementsByTagName("head")[0].appendChild(b);
		var e=setInterval(function(){
			var f=F(c,"position");
			if(f=="relative"){
				clearInterval(e);
				TWTR.Widget.hasLoadedStyleSheet=true;
			}
		},50)};
		(function(){
			var b=false;
			N.css=function(e){
				var d=document.createElement("style");
				d.type="text/css";
				if(Z.ie){
					d.styleSheet.cssText=e;
				}else{
					var f=document.createDocumentFragment();
					f.appendChild(document.createTextNode(e));
					d.appendChild(f);
				}
				function c(){
					document.getElementsByTagName("head")[0].appendChild(d);
				}
				if(!Z.ie||b){
					c();
				}else{
					window.attachEvent("onload",function(){
						b=true;
						c();
					});
				}
			}
		})();
		TWTR.Widget.isLoaded=false;
		TWTR.Widget.loadingStyleSheet=false;
		TWTR.Widget.hasLoadedStyleSheet=false;
		TWTR.Widget.WIDGET_NUMBER=0;
		TWTR.Widget.matches={
			mentions:/^@[a-zA-Z0-9_]{1,20}\b/,
			any_mentions:/\b@[a-zA-Z0-9_]{1,20}\b/
		};
		TWTR.Widget.jsonP=function(c,d){
			var b=document.createElement("script");
			b.type="text/javascript";
			b.src=c;
			document.getElementsByTagName("head")[0].appendChild(b);
			d(b);
			return b;
		};
		TWTR.Widget.prototype=function(){
			var f="http://search.twitter.com/search.";
			var g="http://twitter.com/statuses/user_timeline.";
			var d="http://twitter.com/favorites/";
			var e="http://twitter.com/";
			var c=20000;
			var b="http://widgets.twimg.com/j/1/default.gif";
			return{
				init:function(i){
					var h=this;
					this._widgetNumber=++TWTR.Widget.WIDGET_NUMBER;
					TWTR.Widget["receiveCallback_"+this._widgetNumber]=function(j){
						h._prePlay.call(h,j);
					};
					this._cb="TWTR.Widget.receiveCallback_"+this._widgetNumber;
					this.opts=i;
					this._base=f;
					this._isRunning=false;
					this._hasOfficiallyStarted=false;
					this._rendered=false;
					this._profileImage=false;
					this._isCreator=!!i.creator;
					this._setWidgetType(i.type);
					this.timesRequested=0;
					this.runOnce=false;
					this.newResults=false;
					this.results=[];
					this.jsonMaxRequestTimeOut=19000;
					this.showedResults=[];
					this.sinceId=1;
					this.source="TWITTERINC_WIDGET";
					this.id=i.id||"twtr-widget-"+this._widgetNumber;
					this.tweets=0;
					this.setDimensions(i.width,i.height);
					this.interval=i.interval||10000;
					this.format="json";
					this.rpp=i.rpp||50;
					this.subject=i.subject||"";
					this.title=i.title||"";
					this.setFooterText(i.footer);
					this.setSearch(i.search);
					this._setUrl();
					this.theme=i.theme?i.theme:this._getDefaultTheme();
					if(!i.id){
						document.write('<div class="twtr-widget" id="'+this.id+'"></div>');
					}
					this.widgetEl=G(this.id);
					if(i.id){
						W.add(this.widgetEl,"twtr-widget");
					}
					if(i.version>=2&&!TWTR.Widget.hasLoadedStyleSheet){
						N.loadStyleSheet("http://widgets.twimg.com/j/2/widget.css",this.widgetEl);
					}
					this.occasionalJob=new M(function(j){
						h.decay=j;
						h._getResults.call(h);
						},
						function(){
							return h._decayDecider.call(h);
						},c);
					this._ready = H.fn(i.ready) ? i.ready : function(){};
					this._isRelativeTime=true;
					this._tweetFilter=false;
					this._avatars=true;
					this._isFullScreen=false;
					this._isLive=true;
					this._isScroll=false;
					this._loop=true;
					this._behavior="default";
					this.setFeatures(this.opts.features);
					return this;
				},
				setDimensions:function(i,j){
					this.wh = (i&&j) ? [i,j] : [250,300];
					if(i=="auto"||i=="100%"){
						this.wh[0] = "100%";
					}else{
						this.wh[0] = ((this.wh[0]<150) ? 150 : this.wh[0]) + "px";
					}
					this.wh[1] = ((this.wh[1]<100) ? 100 : this.wh[1]) + "px";
					return this;
				},
				setRpp:function(h){
					var h=parseInt(h);
					this.rpp = (H.number(h)&&(h>0&&h<=100)) ? h : 30;
					return this;
				},
				_setWidgetType:function(h){
					this._isSearchWidget=false,
					this._isProfileWidget=false,
					this._isFavsWidget=false,
					this._isListWidget=false;
					switch(h){
						case"profile":
								this._isProfileWidget=true;
								break;
						case"search":
								this._isSearchWidget=true,
								this.search=this.opts.search;
								break;
						case"faves":
						case"favs":
								this._isFavsWidget=true;
								break;
						case"list":
						case"lists":
								this._isListWidget=true;
								break;
					}
					return this;
				},
				setFeatures:function(h){
					if(h){
						if(H.def(h.filters)){
							this._tweetFilter=h.filters;
						}
						if(H.def(h.dateformat)){
							this._isRelativeTime=!!(h.dateformat!=="absolute");
						}
						if(H.def(h.fullscreen)&&H.bool(h.fullscreen)){
							if(h.fullscreen){
								this._isFullScreen=true;
								this.wh[0]="100%";
								this.wh[1]=(R()-90)+"px";
								var i=this;
								D.add(window,"resize",function(l){
									i.wh[1]=R();
									i._fullScreenResize();
								});
							}
						}
						if(H.def(h.loop)&&H.bool(h.loop)){
							this._loop=h.loop;
						}
						if(H.def(h.behavior)&&H.string(h.behavior)){
							switch(h.behavior){
								case"all":
									this._behavior="all";
									break;
								default:
									this._behavior="default";
									break;
							}
						}
						if(H.def(h.avatars)&&H.bool(h.avatars)){
							if(!h.avatars){
								N.css("#"+this.id+" .twtr-avatar, #"+this.id+" .twtr-user { display: none; } #"+this.id+" .twtr-tweet-text { margin-left: 0; }");
								this._avatars=false;
							}else{
								var j=(this._isFullScreen)?"90px":"40px";
								N.css("#"+this.id+" .twtr-avatar { display: block; } #"+this.id+" .twtr-user { display: inline; } #"+this.id+" .twtr-tweet-text { margin-left: "+j+"; }");
								this._avatars=true;
							}
						}else{
							if(this._isProfileWidget){
								this.setFeatures({avatars:false});
								this._avatars=false;
							}else{
								this.setFeatures({avatars:true});
								this._avatars=true;
							}
						}
						if(H.def(h.hashtags)&&H.bool(h.hashtags)){
							(!h.hashtags)?N.css("#"+this.id+" a.twtr-hashtag { display: none; }"):"";
						}
						if(H.def(h.timestamp)&&H.bool(h.timestamp)){
							var k=h.timestamp?"block":"none";
							N.css("#"+this.id+" i { display: "+k+"; }");
						}
						if(H.def(h.live)&&H.bool(h.live)){
							this._isLive=h.live;
						}
						if(H.def(h.scrollbar)&&H.bool(h.scrollbar)){
							this._isScroll=h.scrollbar;
						}
					}else{
						if(this._isProfileWidget){
							this.setFeatures({avatars:false});
							this._avatars=false;
						}
						if(this._isProfileWidget||this._isFavsWidget){
							this.setFeatures({behavior:"all"});
						}
					}
					return this;
				},
				_fullScreenResize:function(){
					var h=C("twtr-timeline", "div", document.body, function(i){
						i.style.height=(R()-90)+"px";
					});
				},
				setTweetInterval:function(h){
					this.interval=h;
					return this;
				},
				setBase:function(h){
					this._base=h;
					return this;
				},
				setUser:function(i,h){
					this.username=i;
					this.realname=h||" ";
					if(this._isFavsWidget){
						this.setBase(d+i+".");
					}else{
						if(this._isProfileWidget){
							this.setBase(g+this.format+"?screen_name="+i);
						}
					}
					this.setSearch(" ");
					return this;
				},
				setList:function(i,h){
					this.listslug=h.replace(/ /g,"-").toLowerCase();
					this.username=i;
					this.setBase(e+i+"/lists/"+this.listslug+"/statuses.");
					this.setSearch(" ");
					return this;
				},
				setProfileImage:function(h){
					this._profileImage=h;
					this.byClass("twtr-profile-img","img").src=h;
					this.byClass("twtr-profile-img-anchor","a").href="http://twitter.com/"+this.username;
					return this;
				},
				setTitle:function(h){
					this.title=h;
					this.widgetEl.getElementsByTagName("h3")[0].innerHTML=this.title;
					return this;
				},
				setCaption:function(h){
					this.subject=h;
					this.widgetEl.getElementsByTagName("h4")[0].innerHTML=this.subject;
					return this;
				},
				setFooterText:function(h){
					this.footerText=(H.def(h)&&H.string(h))?h:"Join the conversation";
					if(this._rendered){
						this.byClass("twtr-join-conv","a").innerHTML=this.footerText;
					}
					return this;
				},
				setSearch:function(i){
					this.searchString=i||"";
					this.s=this.searchString.replace(" ","+");
					this.search=escape("-RT "+this.s);
					this._setUrl();
					if(this._rendered){
						var h=this.byClass("twtr-join-conv","a");
						h.href="http://twitter.com/"+this._getWidgetPath();
					}
					return this;
				},
				_getWidgetPath:function(){
					if(this._isProfileWidget){
						return this.username;
					}else{
						if(this._isFavsWidget){
							return this.username+"/favorites";
						}else{
							if(this._isListWidget){
								return this.username+"/lists/"+this.listslug;
							}else{
								return"#search?q="+this.search;
							}
						}
					}
				},
				_setUrl:function(){
					var h=this;
					function i(){
						return(h.sinceId==1)?"":"&since_id="+h.sinceId+"&refresh=true";
					}
					if(this._isProfileWidget){
						this.url=this._base+"&callback="+this._cb+"&count="+this.rpp+i()+"&clientsource="+this.source;
					}else{
						if(this._isFavsWidget||this._isListWidget){
							this.url=this._base+this.format+"?callback="+this._cb+i()+"&clientsource="+this.source;
						}else{
							this.url=this._base+this.format+"?q="+this.search+"&callback="+this._cb+"&rpp="+this.rpp+i()+"&clientsource="+this.source;
						}
					}
					return this;
				},
				setTheme:function(m,h){
					var k=this;
					var i=" !important";
					var l=((window.location.hostname.match(/twitter\.com/))&&(window.location.pathname.match(/goodies/)));
					if(h||l){i=""}
					this.theme={
						shell:{
							background:function(){
								return m.shell.background||k._getDefaultTheme().shell.background;
							}(),
							color:function(){
								return m.shell.color||k._getDefaultTheme().shell.color}()
						},
						tweets:{
							background:function(){
								return m.tweets.background||k._getDefaultTheme().tweets.background;
							}(),
							color:function(){
								return m.tweets.color||k._getDefaultTheme().tweets.color;
							}(),
							links:function(){
								return m.tweets.links||k._getDefaultTheme().tweets.links;
							}()
						}
					};
					var j="#"+this.id+" .twtr-doc, #"+this.id+" .twtr-hd a,#"+this.id+" h3,#"+this.id+" h4 {background: "+this.theme.shell.background+i+";color: "+this.theme.shell.color+i+";}#"+this.id+" .twtr-tweet a {color: "+this.theme.tweets.links+i+";}#"+this.id+" .twtr-bd, #"+this.id+" .twtr-timeline i a,#"+this.id+" .twtr-bd p {color: "+this.theme.tweets.color+i+";}#"+this.id+" .twtr-new-results, #"+this.id+" .twtr-results-inner,#"+this.id+" .twtr-timeline {background: "+this.theme.tweets.background+i+";}";
					if(Z.ie){
						j+="#"+this.id+" .twtr-tweet { background: "+this.theme.tweets.background+i+"; }";
					}
					N.css(j);
					return this;
				},
				byClass:function(k,h,i){
					var j=C(k,h,G(this.id));
					return(i)?j:j[0];
				},
				render:function(){
					var j=this;
					if(!TWTR.Widget.hasLoadedStyleSheet){
						window.setTimeout(function(){j.render.call(j)},50);
						return this;
					}
					this.setTheme(this.theme,this._isCreator);
					if(this._isProfileWidget){
						W.add(this.widgetEl,"twtr-widget-profile");
					}
					if(this._isScroll){
						W.add(this.widgetEl,"twtr-scroll");
					}
					if(!this._isLive&&!this._isScroll){
						this.wh[1]="auto";
					}
					if(this._isSearchWidget&&this._isFullScreen){
						document.title="Twitter search: "+escape(this.searchString);
					}
					this.widgetEl.innerHTML=this._getWidgetHtml();
					this.spinner=this.byClass("twtr-spinner","div");
					var i=this.byClass("twtr-timeline","div");
					if(this._isLive&&!this._isFullScreen){
						var k=function(l){
							if(B.call(this,l)){
								j.pause.call(j);
							}
						};
						var h=function(l){
							if(B.call(this,l)){
								j.resume.call(j);
							}
						};
						this.removeEvents=function(){
							D.remove(i,"mouseover",k);
							D.remove(i,"mouseout",h);
						};
						D.add(i,"mouseover",k);
						D.add(i,"mouseout",h);
					}
					this._rendered=true;
					this._ready();
					return this;
				},
				removeEvents:function(){},
				_getDefaultTheme:function(){
					return{
						shell:{
							background:"#8ec1da",
							color:"#ffffff"
						},
						tweets:{
							background:"#ffffff",
							color:"#444444",
							links:"#1985b5"
						}
					}
				},
				_getWidgetHtml:function(){
					var k=this;
					function l(){
						if(k._isProfileWidget){
							return '<a target="_blank" href="http://twitter.com/" class="twtr-profile-img-anchor"><img alt="profile" class="twtr-profile-img" src="'+b+'"></a><h3></h3><h4></h4>';
						}else{
							return "<h3>"+k.title+"</h3><h4>"+k.subject+"</h4>";
						}
					}
					function j(){
						if(!k._isFullScreen){
							return' height="15"'
						}
						return"";
					}
					function i(){
						return k._isFullScreen?" twtr-fullscreen":"";
					}
					var h='<div class="twtr-doc'+i()+'" style="width: '+this.wh[0]+';"><div class="twtr-hd"><a target="_blank" href="http://twitter.com/'+this._getWidgetPath()+'" title="'+this.footerText+'"><img alt="" src="http://widgets.twimg.com/j/1/twitter_logo_s.'+(Z.ie?"gif":"png")+'"'+j()+'></a><div class="twtr-spinner twtr-inactive"></div></div><div class="twtr-bd"><div class="twtr-timeline" style="height:auto;max-height: '+this.wh[1]+';"><div class="twtr-tweets"><div class="twtr-reference-tweet"></div><!-- tweets show here --></div></div></div><div class="twtr-ft" style="min-height:7px;"></div></div>';
					return h;
				},
				_appendTweet:function(h){
					U(h,this.byClass("twtr-reference-tweet","div"));
					return this;
				},
				_slide:function(i){
					var j=this;
					var h=T(i).offsetHeight;
					if(this.runOnce){
						new A(i,"height",{
							from:0,
							to:h,
							time:500,
							callback:function(){
								j._fade.call(j,i);
							}
						}).start();
					}
					return this;
				},
				_fade:function(h){
					var i=this;
					if(A.canTransition){
						h.style.webkitTransition="opacity 0.5s ease-out";
						h.style.opacity=1;
						return this;
					}
					new A(h,"opacity",{
						from:0,
						to:1,
						time:500
					}).start();
					return this;
				},
				_chop:function(){
					if(this._isScroll){
						return this;
					}
					var n=this.byClass("twtr-tweet","div",true);
					var o=this.byClass("twtr-new-results","div",true);
					if(n.length){
						for(var k=n.length-1;k>=0;k--){
							var m=n[k];
							var l=parseInt(m.offsetTop);
							if(l>parseInt(this.wh[1])){
								V(m);
							}else{
								break;
							}
						}
						if(o.length>0){
							var h=o[o.length-1];
							var j=parseInt(h.offsetTop);
							if(j>parseInt(this.wh[1])){
								V(h);
							}
						}
					}
					return this;
				},
				_appendSlideFade:function(i){
					var h=i||this.tweet.element;
					this._chop()._appendTweet(h)._slide(h);
					return this;
				},
				_createTweet:function(h){
					h.timestamp=h.created_at;
					h.created_at=this._isRelativeTime?J(h.created_at):O(h.created_at);
					this.tweet=new K(h);
					if(this._isLive&&this.runOnce){
						this.tweet.element.style.opacity=0;
						this.tweet.element.style.filter="alpha(opacity:0)";
						this.tweet.element.style.height="0";
					}
					return this;
				},
				_getResults:function(){
					var h=this;
					this.timesRequested++;
					this.jsonRequestRunning=true;
					this.jsonRequestTimer=window.setTimeout(function(){
						if(h.jsonRequestRunning){
							clearTimeout(h.jsonRequestTimer);
							W.add(h.spinner,"twtr-inactive");
						}
						h.jsonRequestRunning=false;
						V(h.scriptElement);
						h.newResults=false;
						h.decay();
					},this.jsonMaxRequestTimeOut);
					W.remove(this.spinner,"twtr-inactive");
					TWTR.Widget.jsonP(h.url,function(i){h.scriptElement=i});
				},
				clear:function(){
					var i=this.byClass("twtr-tweet","div",true);
					var h=this.byClass("twtr-new-results","div",true);
					i=i.concat(h);
					i.forEach(function(j){V(j)});
					return this;
				},
				_sortByLatest:function(h){
					this.results=h;
					this.results=this.results.slice(0,this.rpp);
					this.results.reverse();
					return this;
				},
				_sortByMagic:function(h){
					var h=h;
					var i=this;
					if(this._tweetFilter){
						if(this._tweetFilter.negatives){
							h=h.filter(function(j){
								if(!i._tweetFilter.negatives.test(j.text)){
									return j;
								}
							});
						}
						if(this._tweetFilter.positives){
							h=h.filter(function(j){
								if(i._tweetFilter.positives.test(j.text)){
									return j;
								}
							});
						}
					}
					switch(this._behavior){
						case"all":
							this._sortByLatest(h);
							break;
						default:
							this._sortByDefault(h);
							break;
					}
					return this;
				},
				_sortByDefault:function(i){
					var j=this;
					var h=function(){
						if(Z.ie){
							return function(k){
								return Date.parse(k.replace(/( \+)/," UTC$1"));
							}
						}else{
							return function(k){
								return new Date(k);
							}
						}
					}();
					this.results.unshift.apply(this.results,i);
					this.results.forEach(function(k){if(!k.views){k.views=0}});
					this.results.sort(function(l,k){
						if(h(l.created_at)<h(k.created_at)){
							return 1;
						}else{
							if(h(l.created_at)>h(k.created_at)){
								return -1;
							}else{
								return 0;
							}
						}
					});
					this.results=this.results.slice(0,this.rpp);
					if(!this._isLive){
						this.results.reverse();
					}
					this.results.sort(function(l,k){
						if(l.views>k.views){
							return 1;
						}else{
							if(l.views<k.views){
								return -1;
							}
						}
						return 0;
					});
				},
				_prePlay:function(i){
					if(this.jsonRequestTimer){
						clearTimeout(this.jsonRequestTimer);
					}
					if(!Z.ie){
						V(this.scriptElement);
					}
					if(i.error){
						this.newResults=false;
					}else{
						if(i.results&&i.results.length>0){
							this.response=i;
							if(this.intervalJob){
								this.intervalJob.stop();
							}
							this.newResults=true;
							this.sinceId=i.max_id;
							this._sortByMagic(i.results);
							if(this.isRunning()){
								this._play();
							}
						}else{
							if((this._isProfileWidget||this._isFavsWidget||this._isListWidget)&&H.array(i)&&i.length>0){
								if(this.intervalJob){
									this.intervalJob.stop();
								}
								this.newResults=true;
								if(!this._profileImage&&this._isProfileWidget){
									var h=i[0].user.screen_name;
									this.setProfileImage(i[0].user.profile_image_url);
									this.setTitle(i[0].user.name);
									this.setCaption('<a target="_blank" href="http://twitter.com/'+h+'">'+h+"</a>");
								}
								this.sinceId=i[0].id;
								this._sortByMagic(i);
								if(this.isRunning()){
									this._play();
								}
							}else{
								this.newResults=false;
							}
						}
					}
					this._setUrl();
					if(this._isLive){
						this.decay();
					}
					W.add(this.spinner,"twtr-inactive");
				},
				_play:function(){
					var h=this;
					if(this._avatars){
						this._preloadImages(this.results);
					}
					if(this._isRelativeTime&&this._behavior=="all"){
						this.byClass("twtr-timestamp","a",true).forEach(function(i){
							i.innerHTML=J(i.getAttribute("time"));
						});
					}
					if(!this._isLive||this._behavior=="all"){
						this.results.forEach(function(j){
							if(h._isProfileWidget){
								j.from_user=h.username;
								j.profile_image_url=j.user.profile_image_url;
							}
							if(h._isFavsWidget||h._isListWidget){
								j.from_user=j.user.screen_name;
								j.profile_image_url=j.user.profile_image_url;
							}
							h._createTweet({
								id:j.id,
								user:j.from_user,
								tweet:E.clean(j.text),
								avatar:j.profile_image_url,
								created_at:j.created_at
							});
							var i=h.tweet.element;
							(h._behavior=="all")?h._appendSlideFade(i):h._appendTweet(i);
						});
						return this;
					}
					this._insertNewResultsNumber();
					this.intervalJob=new I(this.results,this.interval,this._loop,function(i){
						i.views++;
						if(h._isProfileWidget){
							i.from_user=h.username;
							i.profile_image_url=i.user.profile_image_url;
						}
						if(h._isFavsWidget||h._isListWidget){
							i.from_user=i.user.screen_name;
							i.profile_image_url=i.user.profile_image_url;
						}
						if(h._isFullScreen){
							i.profile_image_url=i.profile_image_url.replace(/_normal\./,"_bigger.");
						}
						h._createTweet({
							id:i.id,
							user:i.from_user,
							tweet:E.clean(i.text),
							avatar:i.profile_image_url,
							created_at:i.created_at
						})._appendSlideFade();
					}).start(true);
					return this;
				},
				_insertNewResultsNumber:function(){
					if(this.runOnce&&this._isSearchWidget){
						var k=this.response.total>this.rpp?this.response.total:this.response.results.length;
						var h=k>1?"s":"";
						var j=(this.response.warning&&this.response.warning.match(/adjusted since_id/))?"more than":"";
						var i=document.createElement("div");
						W.add(i,"twtr-new-results");
						i.innerHTML='<div class="twtr-results-inner"> &nbsp; </div><div class="twtr-results-hr"> &nbsp; </div><span>'+j+" <strong>"+k+"</strong> new tweet"+h+"</span>";
						U(i,this.byClass("twtr-reference-tweet","div"));
					}
				},
				_preloadImages:function(h){
					if(this._isProfileWidget||this._isFavsWidget||this._isListWidget){
						h.forEach(function(j){
							var i=new Image();
							i.src=j.user.profile_image_url;
						});
					}else{
						h.forEach(function(i){
							(new Image()).src=i.profile_image_url;
						});
					}
				},
				_decayDecider:function(){
					var h=false;
					if(!this.runOnce){
						this.runOnce=true;
						h=true;
					}else{
						if(this.newResults){
							h=true;
						}
					}
					return h;
				},
				start:function(){
					var h=this;
					if(!this._rendered){
						setTimeout(function(){
							h.start.call(h);
						},50);
						return this;
					}
					if(!this._isLive){
						this._getResults();
					}else{
						this.occasionalJob.start();
					}
					this._isRunning=true;
					this._hasOfficiallyStarted=true;
					return this;
				},
				stop:function(){
					this.occasionalJob.stop();
					if(this.intervalJob){
						this.intervalJob.stop();
					}
					this._isRunning=false;
					return this;
				},
				pause:function(){
					if(this.isRunning()&&this.intervalJob){
						this.intervalJob.stop();
						W.add(this.widgetEl,"twtr-paused");
						this._isRunning=false;
					}
					if(this._resumeTimer){
						clearTimeout(this._resumeTimer);
					}
					return this;
				},
				resume:function(){
					var h=this;
					if(!this.isRunning()&&this._hasOfficiallyStarted&&this.intervalJob){
						this._resumeTimer=window.setTimeout(function(){
							h.intervalJob.start();
							h._isRunning=true;
							W.remove(h.widgetEl,"twtr-paused");
						},2000);
					}
					return this;
				},
				isRunning:function(){
					return this._isRunning;
				},
				destroy:function(){
					this.stop();
					this.clear();
					this.runOnce=false;
					this._hasOfficiallyStarted=false;
					this.intervalJob=false;
					this._profileImage=false;
					this._isLive=true;
					this._tweetFilter=false;
					this._isScroll=false;
					this.newResults=false;
					this._isRunning=false;
					this.sinceId=1;
					this.results=[];
					this.showedResults=[];
					this.occasionalJob.destroy();
					if(this.jsonRequestRunning){
						clearTimeout(this.jsonRequestTimer);
						W.add(this.spinner,"twtr-inactive");
					}
					W.remove(this.widgetEl,"twtr-scroll");
					this.removeEvents();
					return this;
				}
			}
		}()
	})()
})();
win.TWTR = TWTR;



// ==============================================================================================================
//                                                 G L O B A L    V A R S
// ==============================================================================================================
// 	Global Vars Declaration
var resCounter=0;
var canRun = CSS = THEMES = DB = GFX = LNG = INPUT = SEARCHER = {};
var LANG = SCRIPTS = SERVICE = STYLES = '';
var AlertBox, BgBox, hasSomeQuery, hasSomeFilter=false;
var processImages = setColorTheme = showSettings = function(){};
DB.css = {};


doc = $id(document);
var body = $id(doc.body);
var head = doc.getElementsByTagName('head')[0];

//  G L O B A L   F U N C T I O N S
//===================================

function addDefaultPrefix(xpath, prefix) {
    const tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g
    const TERM = 1, OPERATOR = 2, MODIFIER = 3
    var tokenType = OPERATOR
    prefix += ':'
    function replacer(token, identifier, suffix, term, operator, modifier) {
        if (suffix) {
            tokenType =
                (suffix == ':' || (suffix == '::' &&
                 (identifier == 'attribute' || identifier == 'namespace')))
                ? MODIFIER : OPERATOR
        }
        else if (identifier) {
            if (tokenType == OPERATOR && identifier != '*') {
                token = prefix + token
            }
            tokenType = (tokenType == TERM) ? OPERATOR : TERM
        }
        else {
            tokenType = term ? TERM : operator ? OPERATOR : MODIFIER
        }
        return token
    }
    return xpath.replace(tokenPattern, replacer)
}

function $xpath(xpath, node, resultType) {
    var node = node || document
    var doc = node.ownerDocument || node
    
    var resolver = doc.createNSResolver(node.documentElement || node)

    var defaultNS = node.lookupNamespaceURI(null) 
    if (defaultNS) {
        const defaultPrefix = '__default__'
        xpath = addDefaultPrefix(xpath, defaultPrefix)
        var defaultResolver = resolver
        resolver = function (prefix) {
            return (prefix == defaultPrefix)
                ? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
        }
    }
    
    return doc.evaluate(xpath, node, resolver, resultType, null);
}

var $nd = function (xpath, node)
{
	var node = node || document
	var element = (node.ownerDocument||node).evaluate(xpath, node, null, 9, null).singleNodeValue;
	return $id(element);
};

var addStyle = function (css, id)
{
	//var target = doc.getElementsByTagName('head')[0];
	//if (!target){return;}
	if(id){	var obj = $nd('//style[@id="'+id+'"]'); }
	if(obj){
		obj.destroy();
	}else{
		var obj = doc.createElement('style');
		if(id) obj.id = id;
		obj.type = 'text/css';
	}
	obj.appendChild(doc.createTextNode(css));
	//target.appendChild(obj);
	head.appendChild(obj);
};

var encodeURL = function (str)
{
	return (win.encodeURIComponent ? encodeURIComponent(str) : escape(str));
};

var decodeURL = function (str)
{
	return (win.decodeURIComponent ? decodeURIComponent(str) : unescape(str));
};


var parseUrl = function (url) {
	var r;
	r  = "(?:([a-z0-9+-._]+)://)?"; //protocol
	r += "(?:";
	r += "(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9a-f]{2})*)@)?"; //userinfo
	r += "(?:\\[((?:[a-z0-9:])*)\\])?"; // host (IPv6)
	r += "((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9a-f]{2})*)"; // host
	r += "(?::(\\d*))?"; // port
	r += "(/(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9a-f]{2})*)?"; // path
	r += "|";
	r += "(/?";
	r += "(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+";
	r += "(?:[a-z0-9-._~!$&'()*+,;=:@\\/]|%[0-9a-f]{2})*";
	r += ")?";
	r += ")";
	r += "(?:\\?((?:[a-z0-9-._~!$&'()*+,;=:\\/?@]|%[0-9a-f]{2})*))?"; // query
	r += "(?:#((?:[a-z0-9-._~!$&'()*+,;=:\\/?@]|%[0-9a-f]{2})*))?"; //hash
	
	match = (new RegExp(r)).exec(url);

	var o={protocol:'',userinfo:'',host:'',port:'',path:'',query:'',hash:''};
	
	switch (match.length) {
		case 10: o.hash  = match[9]||'';
		case 9:  o.query = match[8]||'';
		case 8:  o.path  = match[7]||'';
		case 7:  o.path  = match[6]||'' + o.path;
		case 6:  o.port  = match[5]||'';
		case 5:  o.host  = match[3] ? "[" + match[3] + "]" : match[4]||'';
		case 4:  o.userinfo = match[2]||'';
		case 3:  o.protocol = match[1]||'';
	}
	
	return o;
}


var URI = {
		hash		: doc.location.hash.substring(1),
		host		: doc.location.hostname.split('.'),
		hostname	: doc.location.hostname,
		href		: doc.location.href.replace(/[a-z0-9_]+=&/ig,'').replace(/#.*/i,''),
		location	: doc.location.toString(),
		path		: doc.location.pathname.substr(1).split('/'),
		pathname	: doc.location.pathname,
		port		: doc.location.port,
		protocol	: doc.location.protocol,
		search		: doc.location.search.substring(1)
};
URI.domainName = (URI.host[1].toLowerCase()=='google' ? URI.host.slice(1) : URI.host).join('.');

URI.getURL = function(){
	return URI.protocol +'//'+ URI.hostname + URI.pathname + (URI.search.length?'?' + URI.search:'') + (URI.hash.length?'#' + URI.hash:'');
}


var isGecko = Browser.Engine.gecko;
var isWebkit = Browser.Engine.webkit;
var isOpera = Browser.Engine.presto;
var isChrome = typeof(chrome) != 'undefined';

/* Take the Language value from the Url or Google vars */
LANG = URI.search.match(/hl=([^&]*)|$/);
LANG = (LANG && LANG[1]) ? LANG[1] : false;
if (!LANG){
	LANG = URI.search.match(/rls=org\.mozilla:(\w\w)|$/i);
	LANG = (LANG && LANG[1]) ? LANG[1] : false;
	if (!LANG){
		LANG = URI.search.match(/^\/intl\/([^\-\/]+)/);
		LANG = (LANG && LANG[1]) ? LANG[1] : false;
		if (!LANG){LANG = ((win.google && win.google.kHL) ? win.google.kHL : 'en');}
	}
}
LANG = LANG.toLowerCase();

var makeOpacities = function(){
	var r_i = 'background-image: url("data:image/png;base64,';
	var r_e = '"); background-repeat:repeat;';
	var d1_i = 'iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA';
	var d1_e = 'AAAAASUVORK5CYII=';

	DB.css.op = {
		b1 : r_i + d1_i + 'BZJREFUGFdjZGBgMARiOABxYBjOMAQAFDYBWXCvLcA' + d1_e + r_e,
		b2 : r_i + d1_i + 'BZJREFUGFdjZGBg8ABiOABxYBjO8AAAHY4B+iZGnEA' + d1_e + r_e,
		b3 : r_i + d1_i + 'BZJREFUGFdjZGBgiAdiOABxYBjOiAcAJuYCm6PG9s0' + d1_e + r_e,
		b4 : r_i + d1_i + 'BZJREFUGFdjZGBgKANiOABxYBjOKAMAMD4DPBkD/54' + d1_e + r_e,
		b5 : r_i + d1_i + 'BZJREFUGFdjZGBg6AViOABxYBjO6AUAOZYD3S5Q3Ug' + d1_e + r_e,
		b6 : r_i + d1_i + 'BZJREFUGFdjZGBgWAzEcADiwDCcsRgAQoYEd7NEUAM' + d1_e + r_e,
		b7 : r_i + d1_i + 'BZJREFUGFdjZGBg2A3EcADiwDCcsRsATEYFH/vULek' + d1_e + r_e,
		b8 : r_i + d1_i + 'BZJREFUGFdjZGBguAjEcADiwDCccREAVTYFudrB1JA' + d1_e + r_e,
		b9 : r_i + d1_i + 'BZJREFUGFdjZGBgeAnEcADiwDCc8RIAXvYGYfqwlE4' + d1_e + r_e,
		w1 : r_i + d1_i + 'BZJREFUGFdj/P//vxQDDIA4MMyAzAEAa4sVo9L3jiE' + d1_e + r_e,
		w2 : r_i + d1_i + 'BZJREFUGFdj3Lp1qwcDDIA4MMyAzAEAF+cQ0wj70jU' + d1_e + r_e,
		w3 : r_i + d1_i + 'BZJREFUGFdjPH/+fDwDDIA4MMyAzAEARTMTlrtt3n4' + d1_e + r_e,
		w4 : r_i + d1_i + 'BZJREFUGFdjvHPnThkDDIA4MMyAzAEAYIUVSOeWB+o' + d1_e + r_e,
		w5 : r_i + d1_i + 'BZJREFUGFdjfP78eS8DDIA4MMyAzAEAeRMW0Cxey8g' + d1_e + r_e,
		w6 : r_i + d1_i + 'BZJREFUGFdjfP/+/WIGGABxYJgBmQMAjRMYEkMl1Mg' + d1_e + r_e,
		w7 : r_i + d1_i + 'BZJREFUGFdj/PLly24GGABxYJgBmQMAnb0ZI6QC3Xk' + d1_e + r_e,
		w8 : r_i + d1_i + 'BZJREFUGFdj/Pnz50UGGABxYJgBmQMArZcaJpEqLGw' + d1_e + r_e,
		w9 : r_i + d1_i + 'BZJREFUGFdj/PPnz0sGGABxYJgBmQMAu30bDQoJPiI' + d1_e + r_e
	};
};
makeOpacities();


var Google_Logo = 'data:image/png;base64,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';


//    GREASEMONKEY FEATURE FOR OPERA & CHROME
// ==========================================

if(isOpera){

	GM_log = function(s){
		opera.postError('> [ Google FX ] :: '+s);
	};

	GM_setValue = function(name, value){
		localStorage.setItem(name, value);
	};
	
	GM_getValue = function(name, _default){
		var value = localStorage.getItem(name);
		if(value==undefined || value=='undefined'){
			GM_setValue(name, _default);
			return _default;
		}
		if(value=='true'||value==true) return true;
		if(value=='false'||value==false) return false;
		return isNaN(parseFloat(value)) ? String(value) : parseFloat(value);
	};
	
} else if(isChrome||isWebkit){
	
	GM_setValue = function(name, value){
		localStorage[name] = value;
	};
	
	GM_getValue = function(name, _default){
		var value = localStorage[name];
		if(value==undefined || value=='undefined'){
			GM_setValue(name, _default);
			return _default;
		}
		if(value=='true'||value==true) return true;
		if(value=='false'||value==false) return false;
		return isNaN(parseFloat(value)) ? String(value) : parseFloat(value);
	};
	
}

// Because GreaseMonkey getValue have some limitations
var getValue = function(name, _default){
	var value=GM_getValue(name, _default);
	return (value==undefined || value.length==0) ? _default : value;
};



// ==============================================================================================================
//                                             G F X      S T A R T
// ==============================================================================================================

GFX_Init();

//       G O O G L E     C A C H E
// ===================================
if(/q=cache:/.test(doc.location.search)) {
	var o = doc.evaluate('//a[@href][not(contains(@href,"search?q=cache:"))]', doc.body, null, 7, null);
	var x = o.snapshotLength;
	while ( x-- )
	{
		var el = o.snapshotItem(x);
		el.setAttribute('rel',el.href);
		el.href = 'http://' + URI.hostname + '/search?q=cache:' + encodeURL(el.href);
		el.setAttribute('onmousedown', 'if(event.ctrlKey||event.shiftKey){var a=this.getAttribute("rel");this.setAttribute("rel",this.href);this.href=a;}return 1;');
		el.setAttribute('title', LNG.ui_txt_cache);
	}
	return;
} // end Google Cache

// Check and Fix the 403 Forbidden Page
if( !win.google ) {
	var title = doc.getElementsByTagName('title');
	if (title && title[0]) title = title[0].innerHTML;
	else title = '';
	if ( isOpera && /error/i.test(title) ){
		return;
	} else if ( /403/.test(title) && /sorry/i.test(title) ){
		location.replace('http://'+URI.hostname+'/sorry/?continue='+URI.href);
	}
}


GFX_Scripts();

GFX_GUI_Functions();

if(!canRun.googlefx) return;

//DB.info = {newVer:true,v:3.33};

GFX_Styles();

GFX_ColorTheme();

window.setTimeout(GFX_Start,isGecko?500:0);


// Check the last version of GoogleFx
if(parseInt(GFX._lastChk)+86400000 < (new Date().getTime())) {

	GFX._lastChk = new Date().getTime();
	GM_setValue('GFX._lastChk', GFX._lastChk+'');


	var onMessageInfo = function(ev){
		var data = ev.data.split(/::/);
		switch (data[0]){
			
			case 'ver':
			case 'cver':
				DB.info = eval(data[1]);
				DB.info.newVer = (parseFloat(DB.info.v) > parseFloat(SCRIPT_VER));
			break;

		}
		ev.stopPropagation();
	};

	window.addEventListener('message', onMessageInfo, false);

	
	var chkver = new Element('iframe',{
		'id'	: 'gfx-chkver',
		'style' : '\
			position:absolute;\
			top:0;\
			left:0;\
			margin:0 0 -10px -10000px;\
			width:1px;\
			height:1px'
	});

	body.appendChild(chkver);
	chkver.src = 'http://googlefx.com.ar/chkver.html';
	
}

})(typeof(unsafeWindow) != 'undefined' ? unsafeWindow : window);

