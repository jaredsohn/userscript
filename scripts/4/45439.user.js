// ==UserScript==
// @name           Ikariam Multi-Page Combat Report Viewer
// @namespace      Ikariam Scripts
// @description    Shows multiple pages of Combat Reports in the first page of the Military Advisor View.
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @include        http://s*.ikariam.*/index.php?*view=militaryAdvisorCombatReports*
// @include        http://s*.ikariam.*/index.php?*view=militaryAdvisorReportView*
// @exclude        http://support*.ikariam.*/*
// @version        1.0.2 
// ==/UserScript==

// Version 1.0.0 -	Basic Version
// Version 1.0.1 -	Bugfix: Fixed sea battles and added international language support.
// Version 1.0.2 -	Bugfix: Fixed for v0.3.1.
//			Bugfix: Optimised data storage.
//			Bugfix: CRs stop being 'new' when they are clicked on.
//		

const	version	= '1.0.2',
	unknown	= 0,
	land	= 1,
	sea	= 2,

	won	= 1,
	lost	= 2,
	running	= 3,

	ID	= 0,
	NAME	= 1,
	TYPE	= 2,
	NEW	= 3,
	STATUS	= 4,
	TIME	= 5;

/**
 * Set up Greasemonkey Cache Variables.
 * getServerWorld() and getServerDomain() are in IkariamHostDetection.js
 */
const cache_key		= getServerDomain() + '.' + getServerWorld();
const cache_variables	= {
		BATTLES:	cache_key + '.battles',
		VERSION:	cache_key + '.version'
	};

if ( GM_getValue( cache_variables.VERSION, '' ) != version ) {
	GM_setValue( cache_variables.VERSION, version );
	GM_setValue( cache_variables.BATTLES, '[]' )
}

var CombatReports = eval( GM_getValue( cache_variables.BATTLES, false ) ) || [];

if ( /view=militaryAdvisorReportView/.test( window.location.search ) ) {
/*
 * Gets the combat report ID and sets the CR not to display as new.
 */
	var match = /combatId=(\d+)/.exec( window.location.search );
	if ( match ) {
		var id = parseInt( match[1] );
		for ( var i = 0; i < CombatReports.length; i++ )
			if ( CombatReports[i][ID] == id ) {
				CombatReports[i][NEW] = 0;
				GM_setValue( cache_variables.BATTLES, CombatReports.toSource() );
				break;
			}
	}
} else {

/*
 * Needs updating for all languages.
 * land: Translation of the phrase "Battle for "
 * sea: Translation of the phrase "Sea battle near "
 */

const language = {
	"arabic":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"bulgarian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"chinese":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"czech":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"danish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"dutch":	{	land:	"Gevecht voor ",	sea:	"Zeegevecht bij "},
	"english":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"finish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"french":	{	land:	"Bataille de ",		sea:	"Bataille navale de "},
	"german":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"greek":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"hebrew":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"hungarian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"italian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"norwegian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"korean":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"latvian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"lithuanian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"pinoy":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"polish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"portugese":	{	land:	"Batalha por ",		sea:	"Batalha no mar perto de "},
	"romanian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"russian":	{	land:	"Битва за ",		sea:	"Морское сражение под "},
	"serbian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"slovak":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"slovene":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"spanish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"swedish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"turkish":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"ukranian":	{	land:	"Battle for ",		sea:	"Sea battle near "},
	"urdu":		{	land:	"Battle for ",		sea:	"Sea battle near "},
	"vietnamese":	{	land:	"Battle for ",		sea:	"Sea battle near "}
}[getLanguage()];

Array.prototype.peek = function() {
	if ( this.length > 0 )
		return this[this.length - 1];
	return null;
};

function getInteger( string ) {
	var s = string.replace( /^0*/, '' );
	if ( s == '' )
		return 0;
	return parseInt( s );
}

$().ready( function() {
	var CombatMap = {};
	for ( var i = 0; i < CombatReports.length; i++ )
		CombatMap[ CombatReports[i][ID] ] = true;

	var now = new Date();
	var operations = $("#troopsOverview .operations");
	$("tr", operations).each( function() {
		var battle	= $("td:eq(3)", this);
		var className	= battle.attr( "class" );
		if ( !/\bsubject\b/.test( className ) ) return;

		var a		= $("a", battle);
		var combatId	= parseInt(/\bcombatId=(\d+)\b/.exec( a.attr("href") )[1]);
		if ( CombatMap[ combatId ] )  {
			for ( var i = 0; i < CombatReports.length; i++ )
				if ( CombatReports[i][ID] == combatId ) {
					CombatReports[i][NEW] = /\bnew\b/i.test( className )?1:0;
					var match = /\b(won)\b|\b(lost)\b|\b(running)\b/i.exec( className );
					CombatReports[i][STATUS] = match[1]?won:(match[2]?lost:(match[3]?running:unknown));
					break;
				}
			return;
		}

		var dateMatch	= /(\d+)\.(\d+)\.\s+(\d+):(\d+)/.exec( $("td:eq(2)", this).html() );
		var month	= getInteger( dateMatch[2] ) - 1;
			var year	= now.getFullYear();
		if ( month > now.getMonth() )
			year	= year - 1; // Deal with december-january
		var timestamp = Date.UTC( year, month, getInteger( dateMatch[1] ),
					getInteger( dateMatch[3] ), getInteger( dateMatch[4] ), 0 )/10000;

		var name, type;
		var l	= new RegExp( "^" + language.land.replace( /\s+/g, '\\s+' ) + "(.+)", "i" ).exec( a.attr("title") );
		if ( l ) {
			name = l[1];
			type = land;
		} else {
			var s	= new RegExp( "^" + language.sea.replace( /\s+/g, '\\s+' ) + "(.+)", "i" ).exec( a.attr("title") );
			if ( s ) {
				name = s[1];
				type = sea;
			} else {
				name = a.attr("title");
				type = unknown;
			}
		}

		var match = /\b(won)\b|\b(lost)\b|\b(running)\b/i.exec( className );
		var row = [
			combatId,
			name,
			type,
			/\bnew\b/i.test( className )?1:0,
			match[1]?won:(match[2]?lost:(match[3]?running:unknown)),
			timestamp
		];

		CombatReports.push( row );
		CombatMap[ combatId ] = true;
	} );

	Array.sort( CombatReports, function( a, b ) { if ( a[ID] < b[ID] ) return 1; if ( a[ID] > b[ID] ) return -1; return 0; } );

	now.setDate( now.getDate() - 7 );
	while ( CombatReports.length > 0 && CombatReports.peek()[TIME] * 10000 < now.getTime() )
		CombatReports.pop();

	GM_setValue( cache_variables.BATTLES, CombatReports.toSource() );

	var page = parseInt( $("#finishedReports :hidden").attr( 'value' ) );
	if ( page == 0 ) {
		$("tbody tr .subject", operations).parent().remove();
		var tbody = $("tbody", operations);
		for ( var i = CombatReports.length - 1; i >= 0; i-- ) {
			var date	= new Date(CombatReports[i][TIME] * 10000);
			var dateString	= date.toUTCString().replace( /:00 GMT$/, '' ).replace( ' ' + date.getFullYear(), ',' );
			var info;
			switch ( CombatReports[i][TYPE] ) {
			case land:	info = language.land + CombatReports[i][NAME]; break;
			case sea:	info = language.sea + CombatReports[i][NAME];  break;
			case unknown:
			default:
					info = CombatReports[i][NAME];
			}
			var status;
			switch ( CombatReports[i][STATUS] ) {
			case won:	status = ' won'; break;
			case lost:	status = ' lost'; break;
			case running:	status = ' running'; break;
			default:
					status = '';
			}
			tbody.prepend(
				'<tr>\n' + 
				'<td class="empty"></td>\n' +
				'<td><input type="checkbox" name="combatId[' + CombatReports[i][ID] + ']" value="1" /></td>\n' +
				'<td class="date">' + dateString + '</td>\n' +
				'<td class="subject' + status + (CombatReports[i][NEW] == 1?' new':'') + '"><a combatID="' + CombatReports[i][ID] + '" href="/index.php?view=militaryAdvisorReportView&amp;combatId=' + CombatReports[i][ID] + '" title="' + info + '">' + info + '</a></td>\n' +
				'<td class="empty"></td>\n' +
				'</tr>' );
		}
	}
});

}