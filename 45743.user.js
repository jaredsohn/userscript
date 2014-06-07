// ==UserScript==
// @name           BYBS Ikariam Alliance Sorter
// @namespace      domz
// @description    Adds links in the Embassy and Diplomacy Advisor to sorts the Alliance Members by inactive date, name, rank, points and number of towns.
// @include        http://*.ikariam.*/index.php?*view=embassy*
// @include        http://*.ikariam.*/index.php?*view=diplomacyAdvisor*&watch=4*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
// Version - 1.0
//
// Notes:
// The lightbulb symbol for on/offline will be replaced with (i) if a player has not been active in the last
// 7 days.
//
// Click on the < in the table header to sort Ascending.
// Click on the > in the table header to sort Descending.
//

var allianceData = [];

function generateHeaderCell( cell, dataType ) {
	var html = [];
	html.push( '<a href="javascript:sortAllianceDataBy( \'' + dataType + 'Ascending\' );">&lt;</a>' );
	html.push( cell.innerHTML.replace(/^\s*|\s*$|\s+/g, '&nbsp;') );
	html.push( '<a href="javascript:sortAllianceDataBy( \'' + dataType + 'Descending\' );">&gt;</a>' );
	cell.innerHTML = html.join( '' );
}

function parsePage() {
	var membersTable	= document.evaluate("//table[@id='memberList']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var membersTableHeader	= document.evaluate("./thead/tr/th", membersTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var members		= document.evaluate("./tbody/tr", membersTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	generateHeaderCell( membersTableHeader.snapshotItem( 0 ), 'lastActive' );
	generateHeaderCell( membersTableHeader.snapshotItem( 1 ), 'name' );
	generateHeaderCell( membersTableHeader.snapshotItem( 2 ), 'towns' );
	generateHeaderCell( membersTableHeader.snapshotItem( 3 ), 'rank' );
	generateHeaderCell( membersTableHeader.snapshotItem( 4 ), 'points' );
	generateHeaderCell( membersTableHeader.snapshotItem( 5 ), 'default' );

	var now		= new Date();
	now.setDate( now.getDate() - 7 );
	for ( var i = 0; i < members.snapshotLength; i++) {
		var member	= members.snapshotItem( i );
		var townMatch	= /highlight|\b1\b/.exec( member.getAttribute( 'class' ) );
		var ownTown	= (townMatch?'highlight':'');
		var tds		= document.evaluate("./td", member, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var online	= tds.snapshotItem( 0 ).getAttribute( 'class' ) == 'online';
		var lastActive	= /Last Action\s+:\s+(\d+)\.(\d+)\.(\d+)/.exec( tds.snapshotItem( 0 ).getAttribute( 'title' ) );
		var then	= new Date();
		then.setFullYear( lastActive[3], lastActive[2] - 1, lastActive[1] )
		var inactive	= then < now;
		if ( inactive )	{
			tds.snapshotItem( 0 ).setAttribute( 'class', '' );
			tds.snapshotItem( 0 ).innerHTML = '<strong>(i)</strong>';
		}
		var name	= tds.snapshotItem( 1 ).innerHTML;
		var townsData	= tds.snapshotItem( 2 );
		var towns	= parseInt( /Total: (\d+)/.exec( townsData.innerHTML )[1] );
		var rank	= tds.snapshotItem( 3 ).innerHTML;
		var points	= parseInt( tds.snapshotItem( 4 ).innerHTML.replace( /,/g, '' ) );
		var html	= member.innerHTML;
//		alert( 'Owntown: ' + ownTown + '\nOnline:' + online + '\nLastActive: ' + lastActive[1] + '/' + lastActive[2] + '/' + lastActive[3] + '\nInactive: ' + inactive + '\nName: ' + name + '\nTowns: ' + towns + '\nRank: ' + rank + '\nPoints: ' + points + '\n\n' + html );
		allianceData.push( {
				'index':	i,
				'html':		html,
				'online':	online,
				'owntown':	ownTown,
				'lastActive':	then,
				'inactive':	inactive,
				'name':		name,
				'towns':	towns,
				'rank':		rank,
				'points':	points
			} );
	}
}

parsePage();

getCompareFunction = function( ascending, variable ) {
	var compareFunction = function( a, b, v ) { if ( a[v] < b[v] ) return -1; else if ( a[v] > b[v] ) return 1; return 0; };
	var compareRank = function( a, b, r ) { if ( r.test( a.rank ) ) return -1; if ( r.test( b.rank ) ) return 1; return 0; };
	if ( variable == 'default' ) {
		var defaultFunction = function( a, b ) {
			if ( a.rank == b.rank ) {
				var c = -compareFunction( a, b, 'points' );
				if ( c == 0 ) return compareFunction( a, b, 'name' );
				return c;
			}
			var c = compareRank( a, b, /(^|, )Leader($|,)/i );
			if ( c != 0 ) return c;
			var c = compareRank( a, b, /(^|, )General($|,)/i );
			if ( c != 0 ) return c;
			var c = compareRank( a, b, /(^|, )Home Secretary($|,)/i );
			if ( c != 0 ) return c;
			var c = compareRank( a, b, /(^|, )Diplomat($|,)/i );
			if ( c != 0 ) return c;
			var c = compareRank( a, b, /^Member$/i );
			if ( c != 0 ) return -c;
			var c = compareRank( a, b, /^Partner$/i );
			if ( c != 0 ) return -c;
			return compareFunction( a, b, 'rank' );
		};
		if ( ascending )	return function( a, b ) { return defaultFunction( a, b ); };
		else			return function( a, b ) { return -defaultFunction( a, b ); };
	}
	if ( ascending )	return function( a, b ) { return compareFunction( a, b, variable ); };
	else			return function( a, b ) { return -compareFunction( a, b, variable ); };
}

sortAllianceDataBy = function( type ) {
	var match = /^(.*)(Ascending|Descending)$/.exec( type );
	allianceData.sort( getCompareFunction( (match[2] == 'Ascending'), match[1] ) );
	var membersTable	= document.evaluate("//table[@id='memberList']/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var html = [];
	for ( var i = 0; i < allianceData.length; i++ ) {
		if ( i % 2 == 1 )	html.push( '<tr class="' + allianceData[i].owntown + ' alt">' );
		else			html.push( '<tr class="' + allianceData[i].owntown + ' default">' );
		html.push( allianceData[i].html );
		html.push( '</tr>' );
	}
	membersTable.innerHTML = html.join( '\n' );
}

sortAllianceDataBy( 'defaultAscending' );

document.body.appendChild( document.createElement("script")).innerHTML =
	"var allianceData = " + allianceData.toSource() + ";\n" +
	"var getCompareFunction = (" + getCompareFunction + ");\n" + 
	"var sortAllianceDataBy = (" + sortAllianceDataBy + ");";