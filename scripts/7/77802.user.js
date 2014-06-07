// ==UserScript==
// @name           Ikariam Alliance Map Arabic
// @namespace      Ikariam Alliance Map Arabic
// @author         Yazmat
// @license        GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    In the alliance and embassy pages, a map of the world can be opened and, in the island view, a mini-map is shown ( This is an adaptation for the arabic servers ).
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/jquery-1.4.2-GM.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.core.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.draggable.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/1.7.2/ui/minified/ui.tabs.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamMap-Id_Luxury_Name.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/ColourSelector.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        1.0
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include        http://s*.ikariam.*/index.php*view=embassy*
// @exclude        http://support.ikariam.*/*
// @exclude        http://support.*.ikariam.*/*
// ==/UserScript==


/*
This is an adaptation of the Ikariam Alliance Map made by Martynius for the arabic servers ( because translation never works as expected ;)
the original script can be downloaded from : http://userscripts.org/scripts/show/46874

*/


const PAGE_ID = {
	island:			"mini",
	diplomacyAdvisor:	"world",
	diplomacyAdvisorAlly:	"world",
	embassy:		"world"
}[ $("body").attr("id") ];

if ( PAGE_ID !== undefined ) {

/**
 * Set up Greasemonkey Cache Variables.
 * getServerWorld() and getServerDomain() are in IkariamHostDetection.js
 */
const cache_key		= getServerDomain() + '.' + getServerWorld();
const cache_variables	= {
	OWNISLANDS:		cache_key + '.ownIslands',
	OWNNAME:		cache_key + '.ownName',
	PLAYER:			cache_key + '.player',
	ALLIANCE:		cache_key + '.alliance',
	SKIN:			cache_key + '.skin',
	OWN:			cache_key + '.own',
	CENTERED:		cache_key + '.centered',
	ISLAND:			cache_key + '.island',
	SEA:			cache_key + '.sea',
	BORDER:			cache_key + '.border',
	GRID:			cache_key + '.grid',
	MARBLE:			cache_key + '.marble',
	WINE:			cache_key + '.wine',
	CRYSTAL:		cache_key + '.crystal',
	SULPHUR:		cache_key + '.sulphur',
	VARIABLE:		cache_key + '.variable',
	FADE:			cache_key + '.fade',
	OWNALLIANCE:		cache_key + '.ownAlliance',
	OWNALLIANCEFADE:	cache_key + '.ownAllianceFade',
	LOCATION:		cache_key + '.location',
	LANGUAGE:		cache_key + '.language',
	DISPLAYMAP:		cache_key + '.displayMap'
};

/**
 * getLanguage() is in IkariamLanguageDetection.js
 *
 * Needs updating for all languages.
 * ltr: Is the language written left to right?
 * open: Translation of the word "Open"
 * worldMap: Translation of the phrase "World Map"
 * miniMap: Translation of the phrase "World Mini-Map"
 */
const lang = "arabic"
const language = {
	"arabic":	{	ltr: true,	open: 'فتح خريطة العالم',			worldMap: 'خريطة العالم',		
	miniMap: 'خريطة صغيرة للعالم',		config: 'خصائص',			scheme: 'تغيير الألوان',		skin: 'لون الخريطة',	
	island: 'الجزر',	sea: 'البحر',	border: 'الحدود',	grid: 'الشبكة',	own: 'الجزر الخاصة',		
	selected: 'الجزيرة المختارة',		marble: 'جزيرة الرخام',			wine: 'جزيرة العنب',		
	crystal: 'جزيرة البلور',		sulphur: 'جزيرة الكبريت',		variable: 'إختلاف السعة',		
	ownAlliance: 'اللون',	ownAllianceFade: 'تلاشي',		alliance: 'التحالف',		details: 'تفاصيل السكريبت',		
	author: 'المؤلف الأصلي',		webpage: 'الموقع',	approved: 'الموافقة ',		close: 'إغلاق',		
	move: 'تحريك',		language: 'اللغة',		reset: 'إعادة الخريطة الصغيرة للأصل',			displayMap: 'عرض خريطة صغيرة' },
	"english":	{	ltr: true,	open: "Open World Map",		worldMap: "World Map",		miniMap: "World Mini-Map",	config: "Configuration",	scheme: "Colour Scheme",	skin: "Skin",	island: "Island",	sea: "Sea",		border: "Border",	grid: "Grid",	own: "Own Island",	selected: "Selected Island",	marble: "Marble Island",	wine: "Wine Island",	crystal: "Crystal Island",	sulphur: "Sulphur Island",	variable: "Vary Size",			ownAlliance: "Colour",	ownAllianceFade: "Fade",	alliance: "Own Alliance",	details: "Script Details",		author: "Author",	webpage: "Webpage",	approved: "Approved on",	close: "Close",	move: "Move",	language: "Language",	reset: "Reset Mini-Map Location",		displayMap: "Display Mini-Map" }
}[lang];

const left	= language.ltr?'left':'right';
const right	= language.ltr?'right':'left';

/**
 * Skin data for the display.
 * Note: Make sure colours are properly capitolised.
 */
const SKINS	= {
	Map:		{ island: 'Green',		sea: 'Blue',		grid: 'Navy',		border:	'Black',		own: 'DarkRed',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Yellow',		ownAllianceFade: 'Red' },
	Pastel:		{ island: 'DarkKhaki',		sea: 'CornflowerBlue',	grid: 'DarkOliveGreen',	border:	'OliveDrab',		own: 'Black',		centered: 'Gold',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'ForestGreen',	ownAllianceFade: 'DarkGreen' },
	Steel:		{ island: 'Gray',		sea: 'DarkSlateGray',	grid: 'Black',		border:	'Black',		own: 'DarkRed',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Yellow',		ownAllianceFade: 'Red' },
	Desert:		{ island: 'Gold',		sea: 'Navy',		grid: 'SaddleBrown',	border:	'SaddleBrown',		own: 'DarkGreen',	centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'LimeGreen',	ownAllianceFade: 'Green' },
	Volcano:	{ island: 'DarkSlateGray',	sea: 'DarkRed',		grid: 'DimGray',	border:	'DimGray',		own: 'Red',		centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Gold',		ownAllianceFade: 'Chocolate' },
	Neon:		{ island: 'DeepPink',		sea: 'Black',		grid: 'DarkSlateGray',	border:	'DarkSlateGray',	own: 'MidnightBlue',	centered: 'White',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'Cyan',		ownAllianceFade: 'Blue' },
	Mono:		{ island: 'White',		sea: 'Black',		grid: 'Gray',		border:	'Gray',			own: 'DarkSlateGray',	centered: 'Gold',	marble: false,	wine: false,	crystal: false,	sulphur: false,	ownAlliance: 'DarkGray',	ownAllianceFade: 'DimGray' }
};

function setColours() {
	const SKIN	= SKINS[ GM_getValue( cache_variables.SKIN, 'Map' ) ];
	const island	= GM_getValue( cache_variables.ISLAND,		SKIN.island );
	const sea	= GM_getValue( cache_variables.SEA,		SKIN.sea );
	const grid	= GM_getValue( cache_variables.GRID,		SKIN.grid );
	const border	= GM_getValue( cache_variables.BORDER,		SKIN.border );
	const own	= GM_getValue( cache_variables.OWN,		SKIN.own );
	const centered	= GM_getValue( cache_variables.CENTERED,	SKIN.centered );
	const marble	= GM_getValue( cache_variables.MARBLE,		SKIN.marble );
	const crystal	= GM_getValue( cache_variables.CRYSTAL,		SKIN.crystal );
	const wine	= GM_getValue( cache_variables.WINE,		SKIN.wine );
	const sulphur	= GM_getValue( cache_variables.SULPHUR,		SKIN.sulphur );
	const ownAll	= GM_getValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
	const ownAllF	= GM_getValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
	const variable	= GM_getValue( cache_variables.VARIABLE,	false );
	const fade	= GM_getValue( cache_variables.FADE,		false );
	GM_addStyle(
		'div#worldMap table				{ background: ' + sea + '; }' +
		'div#worldMap table colgroup.grid		{ border-left: 1px solid ' + grid + '; border-right: 1px solid ' + grid + '; }\n' +
		'div#worldMap table tbody			{ border-top: 1px solid ' + grid + '; border-bottom: 1px solid ' + grid + '; }\n' +
		'div#worldMap table tbody tr td			{ background: transparent; border: none; }\n' +
		'div#worldMap table tbody tr td.island		{ background: ' + island + '; border: 1px solid ' + border + '; }\n' +
		(marble?	'div#worldMap table tbody tr td.marble	{ background: ' + marble + '; }\n':'') +
		(crystal?	'div#worldMap table tbody tr td.crystal	{ background: ' + crystal + '; }\n':'') +
		(wine?		'div#worldMap table tbody tr td.wine	{ background: ' + wine + '; }\n':'') +
		(sulphur?	'div#worldMap table tbody tr td.sulphur	{ background: ' + sulphur + '; }\n':'') +
		'div#worldMap table tbody tr td.own		{ background: ' + own + '; }\n' +
		'div#worldMap table tbody tr td.centered	{ background: ' + centered + '; }\n' +
		'div#worldMap table td a .ownAllianceBackground	{ background: ' + ownAll + '; }\n' +
		'div#worldMap table td a .ownAllianceForeground	{ background: ' + ownAllF + '; }' +
		(variable?
		'div#worldMap table td a .tiny			{ width:  50%; height:  50%; margin: 25%; }' +
		'div#worldMap table td a .small			{ width:  66%; height:  66%; margin: 17%; }' +
		'div#worldMap table td a .medium		{ width:  84%; height:  84%; margin:  8%; }' +
		'div#worldMap table td a .large			{ width: 100%; height: 100%; margin:  0%; }'
		:
		'div#worldMap table td a .tiny			{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .small			{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .medium		{ width: 100%; height: 100%; margin:  0%; }' +
		'div#worldMap table td a .large			{ width: 100%; height: 100%; margin:  0%; }'
		) +
		(fade?
		'div#worldMap table td a .tiny div		{ opacity: 0; }' +
		'div#worldMap table td a .small div		{ opacity: 0.33; }' +
		'div#worldMap table td a .medium div		{ opacity: 0.67; }' +
		'div#worldMap table td a .large div		{ opacity: 1; }' +
		'div#worldMap table td a div div		{ display: block; }'
		:
		'div#worldMap table td a div div		{ display: none; }'
		)

	);
	delete SKIN, island, sea, grid, border, own, centered, marble, crystal, wine, sulphur, ownAll, ownAllF, variable, fade;
}

const MAP_SIZE = 4;
const MINIMAP_SIZE = 9;

setColours();

GM_addStyle(
	'div.worldMap					{ position: absolute; z-index: 9999; padding: 3px; margin: 0px; background: #e4b873; border: 1px solid brown; }\n' +
	'div.worldMap .contentBox01h			{ margin: 0px; padding: 0px; width: auto;}\n' +
	'div.worldMap .headerRight			{ position: absolute; width: 50px; right: 0px; top: 0px; background-position: right top; }\n' +
	'div.worldMap .footerRight			{ position: absolute; width: 50px; right: 0px; bottom: 0px; background-position: right top; }\n' +
	'div.worldMap .contentRight			{ border-left: 1px solid #e4b873; position: absolute; width: 2px; height: 100%; right: -3px; top: 0px; }\n' +
	'div.worldMap .header img			{ float: right; cursor: pointer; }\n' +
	'div#worldMap table				{ width: auto; margin: 2px auto; }\n' +
	'div#worldMap table tbody.nomargin		{ border-top: transparent; border-bottom: transparent; }\n' +
	'div#worldMap table td				{ vertical-align: bottom; }\n' +
	'div#worldMap table td a			{ display: block; position: relative; top: 0px; left: 0px; }\n' +
	'div#worldMap table.map th			{ width: ' + MAP_SIZE + 'px; height: ' + MAP_SIZE + 'px; background: white; }\n' +
	'div#worldMap table.map td			{ padding: 0px 0px ' + MAP_SIZE + 'px ' + MAP_SIZE + 'px; }\n' +
	'div#worldMap table.map td a			{ width: ' + MAP_SIZE + 'px; height: ' + MAP_SIZE + 'px; margin: 0px 0px -' + MAP_SIZE + 'px -' + MAP_SIZE + 'px; }\n' +
	'div#worldMap table.minimap th			{ width: ' + MINIMAP_SIZE + 'px; height: ' + MINIMAP_SIZE + 'px; background: #e4b873; }\n' +
	'div#worldMap table.minimap td			{ padding: 0px 0px ' + MINIMAP_SIZE + 'px ' + MINIMAP_SIZE + 'px; }\n' +
	'div#worldMap table.minimap td a		{ width: ' + MINIMAP_SIZE + 'px; height: ' + MINIMAP_SIZE + 'px; margin: 0px 0px -' + MINIMAP_SIZE + 'px -' + MINIMAP_SIZE + 'px;}\n' +
	'div#worldMap table td a div			{ top: 0px; left: 0px; padding: 0px; position: absolute; }' +
	'div#worldMap table td a div div		{ width: 100%; height: 100%; margin: 0px; }' +
	'div#worldMap table.map td.white		{ background: white; border: 1px solid black; font-size: 8px; text-align: ' + right + '; }\n' +
	'div#worldMap table.map td.black		{ background: black; border: 1px solid black; font-size: 8px; text-align: ' + right + '; color: white; }\n' +
	'div#worldMap table.map td.left			{ text-align: right; }\n' +
	'div#worldMapLink				{ display: block; position: absolute; ' + right + ': 1px; top: 1px; z-index: 100; cursor: pointer; font-size: 8px; background: #e4b873; border: 1px solid brown; }' +
	'div#worldMapLink img				{ float: ' + right + '; margin-top: 5px; }' +
	'div#worldMapLink p				{ float: ' + right + '; margin: 0px; padding: 2px; }'
);

/**
 * getIslandMap() is in IkariamMap-Id_Luxury_Name.js
 */
const ikariamMap = getIslandMap();

var player	= GM_getValue( cache_variables.PLAYER, '' );
var ownIslands	= undefined;

$("select#citySelect").each( function() {
	$("option", this).each( function() {
		var match = /\[0?(\d+):0?(\d+)\]/.exec( this.innerHTML );
		if ( match ) {
			var	x = match[1],
				y = match[2];
			if ( ownIslands == undefined )		ownIslands = {};
			if ( ownIslands[x] == undefined)	ownIslands[x] = {};
			if ( ownIslands[x][y] == undefined)	ownIslands[x][y] = 1;
			else					ownIslands[x][y]++;
		}
	});
});

var createIsland = function( r, c, coords, center ) {
	if ( ikariamMap[c][r] ) {
		var id		= ikariamMap[c][r][0];
		var good;
		switch ( ikariamMap[c][r][1] ) {
		case 1: good = 'wine'; break;
		case 2: good = 'marble'; break;
		case 3: good = 'crystal'; break;
		case 4: good = 'sulphur'; break;
		}
		var name	= ikariamMap[c][r][2];
		var players	= (coords && coords[c] && coords[c][r])?coords[c][r]:false;
		var own		= (ownIslands && ownIslands[c] && ownIslands[c][r])?ownIslands[c][r]:(players && players[player]?players[player]:0);
		var data	= own>0?[player]:[];
		var alliance	= '';
		if ( players ) {
			var numTowns	= own;
			for ( var p in players ) {
				if ( p != player ) {
					data.push(p);
					numTowns += players[p];
				}
			}
			var s = numTowns < 2?'tiny':(numTowns < 4?'small':(numTowns < 6?'medium':'large'));
			alliance = '<div class="ownAllianceBackground ' + s + '"><div class="ownAllianceForeground"/></div>';
		}
		if ( center )
			return '<td class="island ' + good + ' centered"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '"></a></td>'
		else if ( own > 0 )
			return '<td class="island ' + good + ' own"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '"></a></td>';
		else 
			return '<td class="island ' + good + '"><a href="?view=island&id=' + id + '" title="' + name + ' [' + c + ':' + r + ']' + (data.length>0?' - ' + data.join( ', ' ):'') + '">' + alliance + '</a></td>';
	} else
		return '<td />';
};

if ( PAGE_ID == "world" ) {

	var worldMapCreated	= false;
	var worldConfigCreated	= false;

	function createWorldMap() {
		const closeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		const helpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBklEQVR42qXTa2hbdRjH8W9y0pwkTZMlM52FNdXaXVCydZvSbhXRgDpat6lTrG90bi+UCpugOCaulJW2ysZAZAoKVhwM2WRTJowtsuou1Hqpts5pK1nSNCRbm5pkJ7eTc4mHCAPFsRf+3/zh4f//8PDwe0z8z2O6Wf2jVdy/yMeD2GhOa4STGl++GeLnWwInOmj131vX51nWvsXhqseUS5CamSISTRRjEl9IFWH37lNa7D+B0108vbzrsWF/e1eteu1HZn8dAylFg8eNVpSZ/C3GLwva7/Nl4dHe0N/IDeDoQ6xc07VhvGXj8/aroX5Gx+PU3rEeXfSiRS9wty2LKLq4NJtjIq2HBLOw+dXTWqkKeAzo5IuuI61PvNRdM/0+o38U8W48SKCpArksMWsb+ZOvo0cnUDQLP6Q0IkWeGRypHK0CQy0EHt/RNtZ8m2IvRcaRA1vJrNiFN7SZ3JUMicA2AvcFmT70HGZjqmFJZTKrjuw7S7AKHH6Y19qD6/bfXrmCIqWx3RnAuvUzwid6Of/5cTpe+YD6cpzwp3ux2rwkMiWji4LSexZrFTiyieG2VU3b3OY/0WQJwaiqgoOvFvx09ryNeH2GqcN7UHSBOqeX2Fyab5NZ+kYwVYGPN3Ford/d47OV0ZSSMZEKqnGZnx3GlblM+JP9yE4Rh6+ROsHCRCTJ93PZ8NA3tFSB/gd4qnON71hTrQUpX0QtFyjIKrPLummYH0NNxRHrG3G7vSjpDGemYsSl0tBb53ijCrywGt+W1e4LrUsWLbc6nMiKTCGfx/7kQYTkBMXJ4zgXNyDkS/w0HWUskUqqsrZ+4CIzN3JwoLNm54rFrnfWNTciuozgmI15N61FLWZR58KouRKXo3G+m71KvqjsHDjPu/8IUvc9mNvvsn241OXcvrKhHo/Hg0lXKKsaacn4nJgjksoY3Snv9X/NyzfdhcFHavbUOsQer92+VLRYuC4rLOTyFEryJVXV9w2c49gtt7EvaPHrZlOQSqXDVNELaPqIUubi4Cjz/377F9GJSyCacieSAAAAAElFTkSuQmCC';

		var coords;
		$('#memberList .cityInfo').each( function() {
			var name = $( this ).prev().text();
			if ( $( this ).parent().hasClass("1") || $(this).parent().hasClass("highlight") )
				GM_setValue( cache_variables.PLAYER, player = name );
			$( 'a', this ).each( function() {
				var match = /\[0?(\d+):0?(\d+)\]/.exec( this.innerHTML );
				if ( match ) {
					var x = match[1];
					var y = match[2];
					if ( coords == undefined )		coords = {};
					if ( coords[x] == undefined )		coords[x] = {};
					if ( coords[x][y] == undefined )	coords[x][y] = {};
					if ( coords[x][y][name] == undefined )	coords[x][y][name] = 1;
					else					coords[x][y][name]++;
				}
			});
		} );

		if ( coords == undefined )
			coords = eval( GM_getValue( cache_variables.ALLIANCE, false ) ) || {};
		else
			GM_setValue( cache_variables.ALLIANCE, coords.toSource() );

		var html = [];
		for ( var r = 0; r <= 100; r++ ) {
			if ( r % 10 == 1 )
				html.push( '<tbody>' );
			html.push( '<tr>' );
			if ( r % 20 == 1 )
				html.push( '<td class="white" rowspan="10">' + (r+9) + '</td>' );
			else if ( r % 20 == 11 )
				html.push( '<td class="black" rowspan="10">' + (r+9) + '</td>' );
			for ( var c = 100; c >= 1; c-- )
				html.push( createIsland( r, c, coords ) );
			if ( r % 20 == 1 )
				html.push( '<td class="white left" rowspan="10">' + (r+9) + '</td>' );
			else if ( r % 20 == 11 )
				html.push( '<td class="black left" rowspan="10">' + (r+9) + '</td>' );
			if ( r % 10 == 0 )
				html.push( '</tr></tbody>' );
			else
				html.push( '</tr>' );
		}

		GM_addStyle( 'div#worldMap { top: 5px; ' + left + ': 5px; }' );
		$('body').prepend('<div class="worldMap" id="worldMap"><div class="contentBox01h"><h3 class="header"><p>' + language.worldMap + '<p></h3>' +
				'<div class="content"><table class="map">\n' +
				'<colgroup span="1"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="10" class="grid"></colgroup><colgroup span="1"></colgroup>\n' +
				'<tbody class="nomargin"><tr><th /><td class="white" colspan="10">100</td><td class="black" colspan="10">90</td><td class="white" colspan="10">80</td><td class="black" colspan="10">70</td><td class="white" colspan="10">60</td><td class="black" colspan="10">50</td><td class="white" colspan="10">40</td><td class="black" colspan="10">30</td><td class="white" colspan="10">20</td><td class="black" colspan="10">10</td><th /></tr></tbody>\n' +
				html.join( '' ) +
				'<tbody class="nomargin"><tr><th /><td class="white" colspan="10">100</td><td class="black" colspan="10">90</td><td class="white" colspan="10">80</td><td class="black" colspan="10">70</td><td class="white" colspan="10">60</td><td class="black" colspan="10">50</td><td class="white" colspan="10">40</td><td class="black" colspan="10">30</td><td class="white" colspan="10">20</td><td class="black" colspan="10">10</td><th /></tr></tbody>\n' +
				'</table></div><div class="footer"></div>' +
				'<div class="content contentRight"></div><div class="footer footerRight"></div><h3 class="header headerRight">' +
				'<img id="close" src="' + closeImage + '" title="' + language.close + '" width="16" height="16">' +
				'<img id="help" src="' + helpImage + '" title="' + language.config + '" width="16" height="16">' +
				'</h3></div></div>');
		$('div#worldMap h3.header img#close').click( function() { $("div.worldMap").hide(); } );
		$('div#worldMap h3.header img#help').click( function() {
				if ( !worldConfigCreated )
					createConfig();
				$("div#worldMapConfig").show();
			} );

		worldMapCreated = true;

		delete ikariamMap, html, coords, closeImage, helpImage;
	}

	function getChangeFn( id ) {
		return function( v ) { GM_setValue( id, v ); setColours(); };
	}

	function resetControl( cb, s, v, d ) {
		s.attr( "disabled", !v );
		cb.attr( "checked", v!=false );
		selectColour( s, v || d );
	}

	function enableControl( cb, id, s ) {
		cb.change( function() {
			var v = this.checked;
			s.attr( "disabled", !v );
			if ( v )
				GM_setValue( id, s.val() );
			else
				GM_deleteValue( id );
			setColours();
		});
	}

	function createConfig() {
		const closeImage ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		const skin	= GM_getValue( cache_variables.SKIN, 'Map' );
		const SKIN	= SKINS[ skin ];
		const island	= GM_getValue( cache_variables.ISLAND,		SKIN.island );
		const sea	= GM_getValue( cache_variables.SEA,		SKIN.sea );
		const grid	= GM_getValue( cache_variables.GRID,		SKIN.grid );
		const border	= GM_getValue( cache_variables.BORDER,		SKIN.border );
		const own	= GM_getValue( cache_variables.OWN,		SKIN.own );
		const centered	= GM_getValue( cache_variables.CENTERED,	SKIN.centered );
		const marble	= GM_getValue( cache_variables.MARBLE,		SKIN.marble );
		const crystal	= GM_getValue( cache_variables.CRYSTAL,		SKIN.crystal );
		const wine	= GM_getValue( cache_variables.WINE,		SKIN.wine );
		const sulphur	= GM_getValue( cache_variables.SULPHUR,		SKIN.sulphur );
		const ownAll	= GM_getValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
		const ownAllF	= GM_getValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
		const variable	= GM_getValue( cache_variables.VARIABLE,	false );
		const fade	= GM_getValue( cache_variables.FADE,		false );

		GM_addStyle(
			'div#worldMapConfig			{ top: 5px; ' + right + ': 5px; width: 300px; z-index: 400; }\n' +
			'div#worldMapConfig table		{ margin-top: 2px; }\n' +
			'div#worldMapConfig table td		{ border: 1px solid #e4b873; }\n' +
			'div#worldMapConfig table th		{ border: 1px solid #e4b873; }\n' +
			'div#worldMapConfig table tbody td	{ margin: 0px; padding: 0px 3px 0px 0px; }\n' +
			'div#worldMapConfig table tbody th	{ margin: 0px; padding: 0px 0px 0px 2px; text-align: right; }\n' +
			'div#worldMapConfig select		{ width: 100%; border: 1px solid brown; -moz-border-radius: 4px; }\n' +
			'div#worldMapConfig select option	{ -moz-border-radius: 4px; }\n' +
			'div#worldMapConfig input		{ width: 100%; }\n' +
			'div#worldMapConfig span.approval	{ width: 33%; float: left; }\n' +
			'.ui-helper-hidden { display: none; }' +
			'.ui-helper-hidden-accessible { position: absolute; left: -99999999px; }' +
			'.ui-helper-reset { margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.0; text-decoration: none; font-size: 100%; list-style: none; }' +
			'.ui-helper-clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }' +
			'.ui-helper-zfix { width: 100%; height: 100%; top: 0; left: 0; position: absolute; opacity: 0; }' +
			'.ui-state-disabled { cursor: default !important; }' +
			'.ui-widget-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
			'.ui-widget { font-family: Arial,sans-serif; font-size: 0.9em; }' +
			'.ui-widget-content { border: 1px solid #e4b873; background: #ffffff; color: #000; }' +
			'.ui-widget-content a { color: #000; }' +
			'.ui-widget-header { border: 1px solid #8b4513; background: #e4b873; color: #ffffff; font-weight: bold; }' +
			'.ui-widget-header a { color: #ffffff; }' +
			'.ui-state-default, .ui-widget-content .ui-state-default { border: 1px solid #8b4513; background: #eaad4d; font-weight: normal; color: #333; outline: none; }' +
			'.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #333; text-decoration: none; outline: none; }' +
			'.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus { border: 1px solid #8b4513; background: #c49140; font-weight: normal; color: #000000; outline: none; }' +
			'.ui-state-hover a, .ui-state-hover a:hover { color: #000000; text-decoration: none; outline: none; }' +
			'.ui-state-active, .ui-widget-content .ui-state-active { border: 1px solid #8b4513; background: #ffffff; font-weight: normal; color: #8b4513; outline: none; }' +
			'.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #8b4513; outline: none; text-decoration: none; }' +
			'.ui-corner-tl { -moz-border-radius-topleft: 6px; }' +
			'.ui-corner-tr { -moz-border-radius-topright: 6px; }' +
			'.ui-corner-bl { -moz-border-radius-bottomleft: 6px; }' +
			'.ui-corner-br { -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-top { -moz-border-radius-topleft: 6px; -moz-border-radius-topright: 6px; }' +
			'.ui-corner-bottom { -moz-border-radius-bottomleft: 6px; -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-right {  -moz-border-radius-topright: 6px; -moz-border-radius-bottomright: 6px; }' +
			'.ui-corner-left { -moz-border-radius-topleft: 6px; -moz-border-radius-bottomleft: 6px; }' +
			'.ui-corner-all { -moz-border-radius: 6px; }' +
			'.ui-tabs { padding: .2em; zoom: 1; }' +
			'.ui-tabs .ui-tabs-nav { list-style: none; position: relative; padding: .2em .2em 0; }' +
			'.ui-tabs .ui-tabs-nav li { position: relative; float: left; border-bottom-width: 0 !important; margin: 0 .2em -1px 0; padding: 0; }' +
			'.ui-tabs .ui-tabs-nav li a { float: left; text-decoration: none; padding: .5em 1em; height: 2em; }' +
			'.ui-tabs .ui-tabs-nav li.ui-tabs-selected { padding-bottom: 1px; border-bottom-width: 0; }' +
			'.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a { cursor: text; }' +
			'.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a { cursor: pointer; }' +
			'.ui-tabs .ui-tabs-panel { padding: 1em 1.4em; display: block; border-width: 0; background: none; }' +
			'.ui-tabs .ui-tabs-hide { display: none !important; }'
		);
		var skinOptions = '';
		for ( var s in SKINS )
			skinOptions += '<option id="' + s + '" value="' + s + '"' + (skin==s?' selected':'') + ' style="background: ' + SKINS[s].island + '; border: 2px solid ' + SKINS[s].sea + '">' + s + '</option>';

/*
		const approval = {
			org:	{ img: 'gb', url: 'http://board.ikariam.org/index.php?page=Thread&threadID=61032' },
			com:	{ img: 'us', url: 'http://board.ikariam.com/index.php?page=Thread&threadID=42628' },
			it:	{ img: 'it', url: 'http://board.ikariam.it/index.php?page=Thread&threadID=29688' },
			se:	{ img: 'se', url: 'http://board.ikariam.se/index.php?page=Thread&threadID=1738' },
			nl:	{ img: 'nl', url: 'http://board.ikariam.nl/index.php?page=Thread&postID=208064#post208064' },
			ru:	{ img: 'ru', url: 'http://board.ikariam.ru/index.php?page=Thread&threadID=24580' },
			ph:	{ img: 'ph', url: 'http://board.ikariam.ph/index.php?page=Thread&threadID=7123' }
		};

		var approval_html = [];
		for ( var domain in approval )
			approval_html.push( '<span class="approval"><a href="' + approval[domain].url + '" target="blank"><img src="http://nwlng.gameforge.de/flags/' + approval[domain].img + '.gif" width="16px" height="11px" />&nbsp;(.' + domain + ')</a></span>' );
*/

		$('body').prepend(
				'<div class="worldMap" id="worldMapConfig"><div class="contentBox01h"><h3 class="header"><p>' + language.config + '<p></h3>' +
				'<div class="content">' +
				'<ul><li><a href="#fragment-1"><span>' + language.scheme.replace( /\s+/, '<br />' ) + '</span></a></li>' +
				'<li><a href="#fragment-2"><span>' + language.details.replace( /\s+/, '<br />' ) + '</span></a></li></ul>' +
				'<div id="fragment-1"><table>' +
				'<thead><tr><th colspan="3">' + language.scheme + '</th></tr></thead>' +
				'<tbody>' +
				'<tr><th valign="middle">' + language.skin + ':</th><td /><td><select name="skin" style="background: ' + SKINS[skin].island + '; border: 2px solid ' + SKINS[skin].sea + '">' + skinOptions + '</select></td></tr>' +
				'<tr><th valign="middle">' + language.island + ':</th><td /><td><select name="island" /></td></tr>' +
				'<tr><th valign="middle">' + language.sea + ':</th><td /><td><select name="sea" /></td></tr>' +
				'<tr><th valign="middle">' + language.border + ':</th><td /><td><select name="border" /></td></tr>' +
				'<tr><th valign="middle">' + language.grid + ':</th><td /><td><select name="grid" /></td></tr>' +
				'<tr><th valign="middle">' + language.own + ':</th><td /><td><select name="own" /></td></tr>' +
				'<tr><th valign="middle">' + language.selected + ':</th><td /><td><select name="centered" /></td></tr>' +
				'<tr><th valign="middle">' + language.marble + ':</th><td valign="middle"><input type="checkbox" name="showMarble"' + (marble?' checked':'') + '></td><td><select name="marble" /></td></tr>' +
				'<tr><th valign="middle">' + language.wine + ':</th><td valign="middle"><input type="checkbox" name="showWine"' + (wine?' checked':'') + '></td><td><select name="wine" /></td></tr>' +
				'<tr><th valign="middle">' + language.crystal + ':</th><td valign="middle"><input type="checkbox" name="showCrystal"' + (crystal?' checked':'') + '></td><td><select name="crystal" /></td></tr>' +
				'<tr><th valign="middle">' + language.sulphur + ':</th><td valign="middle"><input type="checkbox" name="showSulphur"' + (sulphur?' checked':'') + '></td><td><select name="sulphur" /></td></tr>' +
				'<tr><th colspan="3" style="text-align: center">' + language.alliance + '</th></tr>' +
				'<tr><th valign="middle">' + language.variable + ':</th><td valign="middle"><input type="checkbox" name="variable"' + (variable?' checked':'') + '></td><td /></tr>' +
				'<tr><th valign="middle">' + language.ownAlliance + ':</th><td /><td><select name="ownAlliance" /></td></tr>' +
				'<tr><th valign="middle">' + language.ownAllianceFade + ':</th><td valign="middle"><input type="checkbox" name="fade"' + (fade?' checked':'') + '></td><td><select name="ownAllianceFade" /></td></tr>' +
				'</tbody></table></div>' +
				'<div id="fragment-2"><table>' +
				'<thead><tr><th colspan="2">' + language.details + '</th></tr></thead>' +
				'<tbody>' +
				'<tr><th valign="middle">' + language.author + ':</th><td><a href="http://userscripts.org/users/68307" target="_blank">Martynius</a></td></tr>' +
				'<tr><th valign="middle">' + 'تم التغيير للعربية من طرف' + ':</th><td><a href="http://userscripts.org/users/131804" target="_blank">Yazmat</a></td></tr>' +
				'<tr><th valign="middle">' + language.displayMap + ':</th><td><input name="displayMap" type="checkbox"' + (GM_getValue( cache_variables.DISPLAYMAP, true )?' checked':'') + '></td></tr>' +
				'</table></div></div>' +
				'<h3 class="header headerRight"><img id="close" src="' + closeImage + '" title="' + language.close + '" width="16" height="16"></h3>' +
				'</div></div>');

		$('body div#worldMapConfig div.content').tabs();

		$('div#worldMapConfig select[name=skin]').change( function() {
			var id	= $( "option:selected", this ).attr( 'value' );
			$( this ).css( 'background', SKINS[id].island )
				.css( 'border', '2px solid ' + SKINS[id].sea );
			const SKIN	= SKINS[id];
			GM_setValue( cache_variables.SKIN, 		id );
			GM_setValue( cache_variables.ISLAND,		SKIN.island );
			GM_setValue( cache_variables.SEA,		SKIN.sea );
			GM_setValue( cache_variables.GRID,		SKIN.grid );
			GM_setValue( cache_variables.BORDER,		SKIN.border );
			GM_setValue( cache_variables.OWN,		SKIN.own );
			GM_setValue( cache_variables.CENTERED,		SKIN.centered );
			GM_setValue( cache_variables.MARBLE,		SKIN.marble );
			GM_setValue( cache_variables.WINE,		SKIN.wine );
			GM_setValue( cache_variables.CRYSTAL,		SKIN.crystal );
			GM_setValue( cache_variables.SULPHUR,		SKIN.sulphur );
			GM_setValue( cache_variables.OWNALLIANCE,	SKIN.ownAlliance );
			GM_setValue( cache_variables.OWNALLIANCEFADE,	SKIN.ownAllianceFade );
			delete SKIN;
			selectColour( $('div#worldMapConfig select[name=island]'), SKIN.island );
			selectColour( $('div#worldMapConfig select[name=sea]'), SKIN.sea );
			selectColour( $('div#worldMapConfig select[name=grid]'), SKIN.grid );
			selectColour( $('div#worldMapConfig select[name=border]'), SKIN.border );
			selectColour( $('div#worldMapConfig select[name=own]'), SKIN.own );
			selectColour( $('div#worldMapConfig select[name=centered]'), SKIN.centered );
			selectColour( $('div#worldMapConfig select[name=ownAlliance]'), SKIN.ownAlliance );
			selectColour( $('div#worldMapConfig select[name=ownAllianceFade]'), SKIN.ownAllianceFade );
			resetControl( $('div#worldMapConfig input[name=showMarble]'), $('div#worldMapConfig select[name=marble]'), SKIN.marble, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showWine]'), $('div#worldMapConfig select[name=wine]'), SKIN.wine, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showCrystal]'), $('div#worldMapConfig select[name=crystal]'), SKIN.crystal, SKIN.island );
			resetControl( $('div#worldMapConfig input[name=showSulphur]'), $('div#worldMapConfig select[name=sulphur]'), SKIN.sulphur, SKIN.island );
			setColours();
		});

		/**
		 * createColourSelector() is in ColourSelect.js
		 */
		createColourSelector( $('div#worldMapConfig select[name=island]'),	island,			false,		getChangeFn( cache_variables.ISLAND ) );
		createColourSelector( $('div#worldMapConfig select[name=sea]'),		sea,			false,		getChangeFn( cache_variables.SEA ) );
		createColourSelector( $('div#worldMapConfig select[name=grid]'),	grid,			false,		getChangeFn( cache_variables.GRID ) );
		createColourSelector( $('div#worldMapConfig select[name=border]'),	border,			false,		getChangeFn( cache_variables.BORDER)  );
		createColourSelector( $('div#worldMapConfig select[name=own]'),		own,			false,		getChangeFn( cache_variables.OWN ) );
		createColourSelector( $('div#worldMapConfig select[name=centered]'),	centered,		false,		getChangeFn( cache_variables.CENTERED ) );
		createColourSelector( $('div#worldMapConfig select[name=marble]'),	marble||island,		!marble,	getChangeFn( cache_variables.MARBLE ) );
		createColourSelector( $('div#worldMapConfig select[name=wine]'),	wine||island,		!wine,		getChangeFn( cache_variables.WINE ) );
		createColourSelector( $('div#worldMapConfig select[name=crystal]'),	crystal||island,	!crystal,	getChangeFn( cache_variables.CRYSTAL ) );
		createColourSelector( $('div#worldMapConfig select[name=sulphur]'),	sulphur||island,	!sulphur,	getChangeFn( cache_variables.SULPHUR ) );
		createColourSelector( $('div#worldMapConfig select[name=ownAlliance]'), ownAll,			false,		getChangeFn( cache_variables.OWNALLIANCE ) );
		createColourSelector( $('div#worldMapConfig select[name=ownAllianceFade]'), ownAllF,		false,		getChangeFn( cache_variables.OWNALLIANCEFADE ) );
		enableControl( $('div#worldMapConfig input[name=showMarble]'),	cache_variables.MARBLE,		$('div#worldMapConfig select[name=marble]') );
		enableControl( $('div#worldMapConfig input[name=showWine]'),	cache_variables.WINE,		$('div#worldMapConfig select[name=wine]') );
		enableControl( $('div#worldMapConfig input[name=showCrystal]'),	cache_variables.CRYSTAL,	$('div#worldMapConfig select[name=crystal]') );
		enableControl( $('div#worldMapConfig input[name=showSulphur]'),	cache_variables.SULPHUR,	$('div#worldMapConfig select[name=sulphur]') );
		$('div#worldMapConfig input[name=variable]').change( function() {
				GM_setValue( cache_variables.VARIABLE, this.checked );
				setColours();
			});
		$('div#worldMapConfig input[name=fade]').change( function() {
				var c = this.checked;
				GM_setValue( cache_variables.FADE, c );
				$('div#worldMapConfig select[name=ownAllianceFade]').attr( "disabled", !c );
				setColours();
			});
		$('div#worldMapConfig select[name=language]').change( function() {
				var v = $( "option:selected", this ).attr( 'value' );
				GM_setValue( cache_variables.LANGUAGE, v );
			});
		$('div#worldMapConfig input[name=displayMap]').change( function() {
				GM_setValue( cache_variables.DISPLAYMAP, $( this ).attr('checked') );
			});

		$('div#worldMapConfig h3.header img#close').click( function() { $("div#worldMapConfig").hide(); } );

		worldConfigCreated = true;

		delete	closeImage, skin, SKIN, skinOptions, island, sea, grid, border, own,
			centered, marble, crystal, wine, sulphur, ownAll, ownAllF, variable, fade;
	}

	const globeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdElEQVR42m2Te0xbZRiHf4dzeqM9belKWWG04AEUJhuZ1stkhJsOyJYtI3ZRcPESTUQww+jmostisqiJxsQpc3+PuGjcDFumW3Um25TpMsq4xI31lBaBAiull9PDOZRejkfcyDJ9kyd5v3zJk+998/sI3FMfn50pX0wSexe4ZI2wlDQTy8mUXplhaVXW8VvZI8e/czqXcV8Rd5tPzvtfml+M9sxxJk0qrcKSKIGPcxA4HnoqDcaqHkwSvzx/rKP71n8EQ9Ps7j+mv/iGizMwKh9CoUVAmC/ANa8NngkBtwMRKCUR9ZvPeVodrdWbyjbNrwr8fsk4wB8amloYsRcZ6rBWuwOl+YsIxin0ewoQE69geEwAFx3Fg6Un8MyGD758utLZtSrwzI+0/+jZ36vI5KHC0oSqwh0watSIisCNwAQWUj1gg1cRDPvARRJgTM3zLY9+VF6xbt3CiqBvuO/o6NyR103aQpiVr+KJksdhNVCICRJmuUtgI324OdMPkRewyIlQE3lor/16y8N25rcVwaenh08OeC+0ZsmzM7YGOBjAoqMgpYKICm64x7yoKjEjX7MRWRkB0+FRMEXVz5YXlp9cEXzWN9Xj9g12xBIKGHIc8rYJ6EgKBeZz8vU1mFKvwFZUAV32vzOnRQF8aHw815LbaLVaJ4gj3/ufY+fiJ1Tmt+CfbAO/tBVG1TSq1u/DZmsbzEYnfLwKGoWEYCSN6zPLaLJHoOAnXTW1dU3EoV6PPoc2DEWTB4sTxAAGBt+RF2ZHruICeg+0wxOmcd5LIZWWEPYFkKQI1D/5ABLsT2ipfaRuJQc72/Y5a3bt+VZJH8TUTC5G/nwNS7dD+OpAGWYF4AyrQxoknOzncM0W4K/qF1BB3MDOSuXhu0lUNGx/+f2O/VveiyUM5HjgMcx6p9C4XkCRTY2zk3YMh9Q4emU7PrS8C09xDepNPmwtWT5G3EmjSSafKWW27drz4u7iymYGGV12PDAmWbVzpKgthStYBv3vLnCORpjX0NigYdG00di9+gIZyz8SGTtFUcU6vd4sionMtpbmhre7uxxkDoNT7gQiEg2bkUBe7CLruzn4FHHfv1DL6GS0d3qlzNrOzs6uvW++0ZDMQPPzZXfoav+vl10/nDocCoWu3yv4vyJlaJk1JEnaaJrWRqPRoHz2yURkMn8DmSZfefTcGh0AAAAASUVORK5CYII=';

	$("div#mainview div.contentBox01h:first h3.header")
		.prepend("<div id='worldMapLink'><img src='" + globeImage + "' width='16' height='16'><p>" + language.open.replace(/\s+/, '<br />') + "</p></div>")
		.children().filter("div:first")
			.click(function() {
				if ( !worldMapCreated )
					createWorldMap();
				$("div#worldMap").show();
			});
	delete globeImage;
} else if ( PAGE_ID == 'mini' ) {
/**
 *
 * The script section dealing with the island view.
 *
 */
if ( GM_getValue( cache_variables.DISPLAYMAP, true ) ) {

	function createIslandMap( x, y ) {
		var centerX = Math.min( Math.max( x, 6 ), 95 );
		var centerY = Math.min( Math.max( y, 6 ), 95 );

		var coords = eval( GM_getValue( cache_variables.ALLIANCE, false ) ) || {};

		$("li.city")
			.each( function() {
				if ( $("div.ownCityImg", this).length > 0 ) {
					player = $(".cityinfo .owner", this)
						.text()
						.replace( /^.*?:\s+|\s+$/g, '' );
					GM_setValue( cache_variables.PLAYER, player );
				}
			});

		var html = [];
		for ( var r = centerY - 5; r <= centerY + 5; r++ ) {
			html.push( '<tr>' );
			for ( var c = centerX + 5; c >= centerX - 5; c-- )
				html.push( createIsland( r, c, coords, (r == y && c == x) ) );
			html.push( '</tr>' );
		}

		var pos = eval( GM_getValue( cache_variables.LOCATION + islandID, "({x:242,y:177})" ) );

		const moveImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbElEQVR42nWTW0wcVRzGvzMze4dddinLclm2gEWw0GBDm2qiJBIjVYsvipeEGE2qabJpoIm3aky0ifqijcb0oZEmbWN8USlp0xLSIiIWXcplXaFlYV2t0L3U3bLX2ZlzZsbRB5Nq/Z+nf3LO73z/73yH4A5lem3Sxymsi1NoNy3mbYRKi2ZOm8h8NrD0773ktu7IspEXM6/qB/fzitygUQm1Tjs0WUJu81aBo6UzOvidxIkXVv8D4N4MVGgEX3Ka0sMxGYRSmImKVq8HjXUeTH43DTAKlAppjkpPxU4fmLgNILwxfV4j3F6iKuAVBqrfel9zHdZjcXTv7MDqb9exHArBajaBY9ImKWZ3rn8xFP0bYHrl0oDG8aeg6Y2mgVNVaLoKr9OG5ko7trhccFa5MRu6ikgwACPPgafi5zaqDJCyoXMGlQhfKappH1P/wuWgjwGDZgAPI3Ztq0FbUx2oYEZoJYx4Mg61mIWavJEnCu0iLv/ppiLvnSGGtLul+SI6tm6CqTexsJYGKTyE7h2HwRttSBRyyKoMiegaUj8F9TFl8IwOEsOTgS5r88+zzzw+jf497diQcriejyGRTmFqbhw01YO2tmGoRhP4CgHRS1NYnwrAYjPrStkwwXPHd/Tu+2bR39dJguIiNlJJRK9mINcXkM0oCM+G0er7CK27h2CwAJGJK1gb+xECK4Go9BNScxRPvPzw/hHFzEj8CkOD24sHPb04ufEpxgvjEG+KsN7qRN9LP4DolqeSDAsjl1EKXIagsn7Sfqzi2PbO7QfsDgcObTmKu90tYPrKl/I4NO/HWOQCxGWC+/d8i/JqFzYt1VgduQguOLPBa+ou0v5h9cdl22wH3Q2V2GpugY+/B331/fhVjuLEyjDmVgKIzTBYIi+i5pEeSK5ayGMjEMTs4fDokfdJ41vOXkej64K3vQGK7rIV5dhd9QDm0/NI5lIIzwVRCN2LSrcfal0tsKBLz6QmDRrpXTr7rkQsfqPgrXWfcvs8z/ruaoJVfzKR6dnPFrBybQE3ljRUFA/C4GwCiUXAFbOjnGB8/trXb2f+ibJnsMpucRiPW+xlT9scZZBLMv5IpFCMV6I8txdmxZPUaOZ7wuho+Nx7J//3NzoHHY/pIX1UYrJBN/F8ffr13x1yBxGFUOaXMx+s4g71J/FFiVIWVqw/AAAAAElFTkSuQmCC';
		const closeImage ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCklEQVR42qWTa2gcVRTHfzO7s7vZR8hLTVNImqYxbZNtQzXWxla/VD9ooSClCPpBrCFWK0oKrVRaK4rFhkpbWiKUfooEKi2KiQ/oAyRq3KItZq0xIWmS3Tw22d3MbvYxOzO7s04HFEv9VA9cLgfu/Z17/vd/BP5nCP9OLkNFElpssFOEVgPKNDB085y55xMwbK6BWfjmvJnfBRiC7UXo9tSVt7rXNiE99AB2t4uCqlFIp1HlJRLzcUKzS8xntM+zInsOqVraAnwBpSslflndsauxsuM1WJyCkWFyC1GQk2iJZfSUgigIqGqB74NhRuXMC++pygUL0AeP+xuqhlou9ELgCuGvv0Vw+vBl48xEVZySA6eSQSgtw1NZQTAUI3A7cvZAcnmfBfgKjjQ/98T7q1/ZzfSZ00TbnqepYw/Th7sQNm6h9ql24qe6sYUn8dRUMxFJEBgJDb4Zl5+0AAPQ73/x2R0rHq5hNnCTqpOf4W1cSyERwyaaUjok9N9/I3KwC3d5KXOJLIPB22NvLMabLEA/3Hz01Z2tJYKO/keQuRXNtJzrRSzc0V7DMJ8fOfwu+kgQ37pGFhcTXL0xpu+LyQ4LcAlS7S8943UpaaaC40gvv07z3k5QFROQp5BNm+0cQZgap2JdA1MzMa79+iddclL4W8TxzU8/0uDRssTiGWp7zuPbtIHifAQjr2PzejAQWTp7Ekd4glvTUQaHx0MHk6k6C3DO9NCm5trtNZU+clGZ4no/K/fvJ9bTQ65gsOr4xxRDk2T6LyJEo/x4fYTAaPiHo2pumwU4AZ1rKnyftvnrze9zYBh3hHNi5FRLQG97O/ZcCjGdIja9wHfXbzGzIB/7wMgfsgDd8KBbkn6ur66sb1hVjbfMa96XEF0uBLvNdKOCVhRJymlujIWZnItmVVXd8CFM/GPlT0T7Y4JkO1HiKdlaVerB7XVhdzgoFIsomoa8rLCUyqBkciFDz791FOPLe4bpHTDlYrdol962Ox1+q7rZjq7nl/Wc9pOB0WfOy7WPYPY/p/F+4i+Dw1MghmEh9gAAAABJRU5ErkJggg==';

		GM_addStyle(
			'div#worldMap 			{ ' + left + ': ' + pos.x + 'px; top: ' + pos.y + 'px; z-index: 3000; }\n' +
			'div#worldMapCoords .content	{ padding: 0px 3px; }\n' +
			'div.worldMap table th		{ text-align: left; font-size: 9px; line-height: 15px; }\n' +
			'div#worldMap table tbody	{ border: 1px solid black; }\n' +
			'div.worldMap table th		{ position: relative; }\n' +
			'div#move			{ position: absolute; ' + right + ': 2px; top: 2px; width: 16px; height: 16px; background: transparent url(' + moveImage + '); cursor: move; }' +
			'div#close			{ position: absolute; ' + right + ': 5px; top: 5px; width: 16px; height: 16px; background: transparent url(' + closeImage + '); }'
		);

		$("div#container")
			.prepend(
				'<div class="worldMap" id="worldMap"><table class="minimap">' +
				'<thead><tr><th colspan="11">' + language.miniMap + '<div id="move" title="' + language.move + '" /></th></tr></thead><tbody>\n' +
				html.join( '' ) +
				'</tbody></table>' +
				'</div>'
			);
		$("div#actioncontainer")
			.after(
				'<div id="worldMapCoords" class="dynamic"><h3 class="header">' + language.miniMap + '<div id="close" title="' + language.close + '" /></h3>\n' +
				'<div id="actions" class="content"><ul>' +
				'<li><strong>X:</strong>&nbsp;<input id="worldMapX" type="text" size="4" maxlength="4" value="' + pos.x + '" /></li>' +
				'<li><strong>Y:</strong>&nbsp;<input id="worldMapY" type="text" size="4" maxlength="4" value="' + pos.y + '" /></li>' +
				'</ul></div>\n' +
				'<div class="footer"/>\n' +
				'</div>'
			);
		$( "div#worldMapCoords" ).css( 'display', 'none' );

		$( "div#worldMapCoords div#close" ).click( function() {
				$( "div#worldMapCoords" ).css( 'display', 'none' );
			} );
		$( "input#worldMapX, input#worldMapY" ).change( function() {
				var x = $( "input#worldMapX" ).val();
				var y = $( "input#worldMapY" ).val();
				if ( x.match( /^-?\d+$/ ) && y.match( /^-?\d+$/ ) ) {
					var l = parseInt( x );
					var t = parseInt( y );
					$('div#worldMap')	.css( left, l + 'px' )
								.css( 'top', t + 'px' );
					GM_setValue( cache_variables.LOCATION + islandID, "({x:" + l + ",y:" + t + "})" );
				}
			} );
		$('div#worldMap').draggable({
				containment: 'body',
				cursor: 'move',
				distance: 5,
				handle: 'div#move',
				helper: 'clone',
				opacity: 0.5,
				zIndex: 9999,
				stop: function( event, ui ) {
						var l = ui.position.left,
							r = ui.position.top;
						$('div#worldMap')	.css( left, l + 'px' )
									.css( 'top', r + 'px' );
						GM_setValue( cache_variables.LOCATION + islandID, "({x:" + l + ",y:" + r + "})" );
					}
			})
			.disableSelection();
		delete centerX, centerY, ikariamMap, coords, html, moveImage, closeImage;
	};

	const islandID = '.' + ($("div#mainview").attr("class") || "default");
	const island = /\[(\d+):(\d+)\]$/.exec( $("div#breadcrumbs span.island").text() );
	if ( island )
		createIslandMap( parseInt( island[1] ), parseInt( island[2] ) );

	GM_registerMenuCommand( language.reset || "Reset Island Mini-Map Location" , function() {
		$( "div#worldMapCoords", document ).css( 'display', 'block' );
	});
	delete island, islandID;
}
}
}
