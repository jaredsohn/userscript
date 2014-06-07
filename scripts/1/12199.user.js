// ==UserScript==
// @name           Yahoo Fantasy Baseball Show MLB Matchup Info
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// $LastChangedRevision: 487 $
// $LastChangedDate: 2008-08-14 14:29:02 -0500 (Thu, 14 Aug 2008) $
// ==/UserScript==
/*
    Updates:
    12-Sep-2007 - Initial version.
    30-Mar-2008 - Updates.
    14-Aug-2008 - Fixes for displaying matchup data in tip window.
*/

(function() {

var Y   = YAHOO,
    yut = Y.util,
    yud = yut.Dom,
    yue = yut.Event,
    yua = yut.Anim;

String.prototype.trim = function () {
  return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
}

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/gi,'');
}

var gSpan = document.createElement( 'span' );

var MatchupNotes = function() {

	var infoCache    = {};
	var descTimeout  = null;
	var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";
	var MLB_IMG_URL = "data:image/gif,GIF89a%10%00%09%00%87%00%00%04%02%84%CC%02%04%B4%B6%DC%EC%A6%A4%F4%D2%D4%E4%E2%EC%FC%FE%FC" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00" +
"%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
"0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%FF%00%2C%00%00%00%00%10%00%0" +
"9%00%00%08D%00%01%08%1C(%D0%80%81%01%01%12%26%24(P%40A%03%0A%17%12%2C%60%C0!%80%83%11%09%0A0X%B1%60%C6%89%06%0B%14%24%A0%90!%C7" +
"%93%06H%06%B8(%90%22J%83*A%A2%24%40%00%E1J%82%2FU%26%0C%08%00%3B";


	return {

		init:function() {
			this.inject();

			var oppTH = document.evaluate( '//tr[@class="headerRow1"]/th[contains(@class,"opp")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if ( oppTH.snapshotLength == 0 )
				return;

			var oppCol = oppTH.snapshotItem( 0 ).cellIndex;

			var date = null;
			var currentDate = document.evaluate( '//div[@id="datenav"]/ul/li[@class="current selected"]//a[@title="Current Date"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if ( currentDate.snapshotLength > 0 )
			{
				var m = currentDate.snapshotItem( 0 ).innerHTML.match( /[a-z]+,\s+([a-z]+)\s+(\d+)/i );
				if ( m )
				{
					var month = ('jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec'.indexOf( m[ 1 ].toLowerCase() ) / 4) + 1;
					if ( month.toString().length == 1 )
						month = '0' + month;
					var day = m[ 2 ];
					if ( day.length == 1 )
						day = '0' + day;
					var date = (new Date()).getFullYear() + month + day;
				}
			}

			if ( !date )
			{
				var th = oppTH.snapshotItem( 0 );
				var date = getDateFromMMDD( th );
			}

			var pitcherTDs = document.evaluate( '//table[contains(@id,"statTable")]//td[contains(@class,"player")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for ( var iPitcher = 0; iPitcher < pitcherTDs.snapshotLength; iPitcher++ )
			{
				var tdPitcher = pitcherTDs.snapshotItem( iPitcher );
				var tr = tdPitcher.parentNode;
				if ( /\b(SP|RP|P)\)/.test( tdPitcher.innerHTML ) )
				{
					tdPitcher.id = 'gncPitcher';

					if ( /\^/.test( tr.cells[ oppCol ].innerHTML ) )
						var oppCell = tr.cells[ oppCol ];
					else if ( /\^/.test( tr.cells[ oppCol + 1 ].innerHTML ) )
						var oppCell = tr.cells[ oppCol + 1 ];
					else
						continue;

					var matchup = getMatchup( tdPitcher, oppCell );

					oppCell.style.whiteSpace = 'nowrap';
					oppCell.innerHTML += ' ' + getMLBLink( date, matchup );
				}
			}

			var starterTDs = document.evaluate( '//td[@id="gncPitcher"]/../td[contains(@class,"stat wide")][contains(.,"^")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for ( var iStarter = 0; iStarter < starterTDs.snapshotLength; iStarter++ )
			{
				var tdOpp = starterTDs.snapshotItem( iStarter );
				if ( tdOpp.parentNode.cells[ 3 ].getAttribute( "class" ) != "action" )
					var tdDate = tdOpp.parentNode.parentNode.parentNode.rows[ 1 ].cells[ tdOpp.cellIndex ];
				else
					var tdDate = tdOpp.parentNode.parentNode.parentNode.rows[ 1 ].cells[ tdOpp.cellIndex - 1 ];
				var date = getDateFromMMDD( tdDate );
				var matchup = getMatchup( tdOpp.parentNode.cells[ 2 ], tdOpp );
				tdOpp.style.whiteSpace = 'nowrap';
				tdOpp.innerHTML += ' ' + getMLBLink( date, matchup );
			}

			this.onMatchupNotesReceived = new yut.CustomEvent('matchupNoteReceived', this);

			var noteImages = yud.getElementsBy(function(el) { return el.getAttribute( 'class' ) == 'gncMatchupImage'; }, 'img' );

			yue.addListener( noteImages, 'mouseover', this.showDesc, this, true );
			yue.addListener( noteImages, 'mouseout', this.hideDesc, this, true );

			this.onMatchupNotesReceived.subscribe( function ( e, args ) {
				this.refreshDesc( args[ 0 ], args[ 1 ] );
			}, this, true);
		},

		refreshDesc: function ( matchupContent, url ) {
			var tip = yud.get('matchupNoteDesc');
			
			var aname = url.replace( /.*#(.+)/, '$1' );
			var html = matchupContent.replace( /[\r\n]+/g, '' );
			var tag = '<a name="' + aname + '"></a>';
			html = html.substr( html.indexOf( tag ) + tag.length );
			gSpan.innerHTML = html;
			tip.innerHTML = '<table cellspacing="0">' + gSpan.getElementsByTagName( 'table' )[ 0 ].innerHTML.replace( /(?:\s*<br>)+\s*(<\/p>)/gi, '$1' ) + '</table>';
			for ( var i = 0; i < 3; i++ )
			{
				var tr = tip.getElementsByTagName( 'tr' );
				if ( tr.length > 0 )
				{
					tr = tr[ 0 ];
					tr.parentNode.removeChild( tr );
				}
			}
			tip.innerHTML = tip.innerHTML.replace( /(<img src=")\//gi, '$1http://mlb.mlb.com/' );
		},

		showDesc: function (e) {
			descTimeout = setTimeout(function () {
				var tip  = yud.get('matchupNoteDesc'),
					noteLink  = yue.getTarget(e).parentNode,
					anim       = new yua( tip, {opacity: {to: 1.0}}, 0.4, YAHOO.util.Easing.easeBoth );

				tip.innerHTML = '<div class="gncLoading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

				MatchupNotes.getMatchupNotes(noteLink.href);

				yud.setStyle( tip, 'opacity', 0.0 );
				yud.setStyle( tip, 'display', 'block' );

				yud.setXY( tip, [ yud.getX(noteLink), yud.getY( noteLink ) + noteLink.offsetHeight + 18 ] );

				anim.animate();
			}, 100);
		},


		getMatchupNotes: function (url) {
			if (infoCache.hasOwnProperty(url)) {
				this.onMatchupNotesReceived.fire(infoCache[url], url );
				return;
			}

			GM_xmlhttpRequest({
				method: 'GET',
				url   : url,
				onload: function (response) {
					infoCache[url] = response.responseText;
					MatchupNotes.onMatchupNotesReceived.fire(response.responseText, url);
				}
			});
		},


		hideDesc: function(e) {
			clearTimeout( descTimeout );
			yud.setStyle( 'matchupNoteDesc', 'display', 'none' );
		},


		inject: function () {
		  GM_addStyle( '\
IMG.gncMatchupImage { height: 8px } \
#matchupNoteDesc { border: solid 1px } \
.gncMatchupInfoTip { border: solid 1px; padding: 2px; width: 500px; border-width: 0px; } \
.gncMatchupInfoTip, .gncMatchupInfoTip TABLE { background: #e6e6e6 } \
.gncMatchupInfoTip TABLE TD { text-align: left; font-size: 77%; font-family: Verdana } \
.gncMatchupInfoTip TABLE TD P { margin-bottom: 0px } \
.gncLoading { font-style: italic; font-size: 11px; color: #333 } \
' );

		  var div = document.createElement( 'DIV' );
		  div.id = 'matchupNoteDesc';
		  div.style.display = 'none';
		  div.setAttribute( 'class', 'gncMatchupInfoTip' );
		  div.style.zIndex = 99;
		  document.body.appendChild( div );
		},
	}

	function getMLBLink( date, matchup )
	{
		var url = 'http://mlb.mlb.com/news/probable_pitchers.jsp?c_id=mlb&ymd=' + date + '#' + matchup;
		return '<a target="sports" href="' + url + '"><img class="gncMatchupImage" border="0" src="' + MLB_IMG_URL + '"/></a>';
	}

	function getDateFromMMDD( el )
	{
		var date = null;
		var mmdd = el.innerHTML.match( /.*(\d+)\/(\d+).*/ );
		if ( mmdd )
		{
			var month = mmdd[ 1 ];
			if ( month.length == 1 )
				month = '0' + month;
			var day = mmdd[ 2 ];
			if ( day.length == 1 )
				day = '0' + day;

			date = (new Date()).getFullYear() + month + day;
		}
		return date;
	}

	function getMatchup( tdPitcher, tdOpp )
	{
		var pitcherTeam = tdPitcher.innerHTML.replace( /.*\(([a-z]+) -.+/i, '$1' );
		var oppTeam = tdOpp.innerHTML;
		if ( oppTeam.indexOf( '@' ) >= 0 )
			var matchup = pitcherTeam + oppTeam;
		else
			var matchup = oppTeam + '@' + pitcherTeam;
		matchup = matchup.replace( /WAS/ig, 'WSH' );
		return matchup.replace( /\^(\s+|&nbsp;)/gi, '' ).toUpperCase();
	}

}();

MatchupNotes.init();

})();