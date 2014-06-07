// ==UserScript==
// @name           Yahoo Baseball Player Status Changes
// @namespace      http://www.glenncarr.com/yahoofantasy
// @description    Display recent player status changes
// @include        http://baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 507 $
// $LastChangedDate: 2009-03-18 13:34:43 -0500 (Wed, 18 Mar 2009) $
// ==/UserScript==
/*
	Updates:
	12-Aug-2008 Modified to show last 10 adds, instead of just guys on waivers
	18-Mar-2009 Fixes due to Yahoo changes
*/
(function() {

if (!location.href.match(/\.fantasysports\.yahoo\.com\/b\d\/\d+/i))
    return;

var standings = document.getElementById( 'leaguehomestandings' );
if ( standings == null )
    return;

var playersLink = document.evaluate( '//div[@id="yspnav"]/div/ul/li/a[contains(.,"Players")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( playersLink.snapshotLength == 0 )
    return;

playersLink = playersLink.snapshotItem( 0 ).href.replace( /\/players$/i, '/playerchanges?type=added' );

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

var divPlayerAdditions = document.createElement( 'DIV' );
divPlayerAdditions.setAttribute( "id", "leaguenotes" );
divPlayerAdditions.innerHTML = '<h4>Player Additions</h4><ul><li class="first last">Retrieving recent player additions... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/></li></ul>';

standings.parentNode.insertBefore( divPlayerAdditions, standings );

var gSpan = document.createElement( 'span' );

GM_addStyle( '\
.yspcontent .teamtable {\
  width:100%;\
}\
.teamtable {\
  border:1px solid #ABAB9E;\
  border-width: 1px 0 0 0;\
  width:auto;\
  background:#ABAB9E;\
  margin-bottom:8px;\
}\
.teamtable tbody tr.last td {\
  border-bottom:1px solid #ABAB9E;\
}\
.teamtable tr th {\
  padding:3px 2px;\
  font:bold 9px Verdana;\
  border-bottom:1px solid #ABAB9E;\
  border-right:1px solid #ABAB9E;\
  color:#222;\
  text-align:left;\
  vertical-align:bottom;\
}\
.teamtable tr.headerRow0 th {\
  border-bottom:0;\
}\
.teamtable td {\
  background: #fff;\
  padding:0px 2px;\
  font:77% Verdana;\
  border-bottom:1px solid #E7E7E5;\
  border-right:0px solid #E7E7E5;\
  text-align:left;\
  line-height:100%;\
}\
.teamtable tr.last td {\
  border-bottom:0;\
}\
.teamtable td.last, .teamtable th.last{\
  border-width: 0 0 1px 0;\
}\
.teamtable  tr.headerRow0 th.group {\
  text-align:center;\
  background:#D5D6C6;\
  position:relative;\
  border-color:#ABAB9E;\
  border-bottom:1px solid #ABAB9E;\
}\
.teamtable th.group div {\
  width:100%;\
  height:100%;\
  text-overflow:ellipsis;\
  overflow:hidden;\
\
  _height:12px;\
}\
.teamtable td.stat, .teamtable th.stat{\
  width:30px;\
  text-align:right;\
  white-space:nowrap;\
}\
.teamtable td.nogroupstat, .teamtable th.nogroupstat{\
  text-align:right;\
  white-space:nowrap;\
}\
.teamtable td.wide, .teamtable th.wide{\
  width:60px;\
}\
.teamtable td.superwide, .teamtable th.superwide{\
  width:100px;\
}\
.teamtable td.auto, .teamtable th.auto{\
  width:auto;\
  text-align:left;\
}\
.teamtable td.rating, .teamtable th.rating {\
  text-align:center;\
}\
.teamtable td.gdcnote, .teamtable th.gdcnote {\
  text-align:left;\
  width:300px;\
}\
.teamtable td.gdcstatus, .teamtable th.gdcstatus {\
  text-align:left;\
  width:70px;\
}\
.teamtable td.gdctime, .teamtable th.gdctime {\
  text-align:left;\
  width:90px;\
}\
.teamtable th.stat div{\
  text-overflow:ellipsis;\
  overflow:hidden;\
  width:30px;\
}\
.teamtable th.wide div {\
  width:60px;\
}\
.teamtable th.superwide div {\
  width:100px;\
}\
.teamtable th.auto div {\
  width:auto;\
}\
.teamtable th.gdcstatus div {\
  width:70px;\
}\
.teamtable th.gdcnote div {\
  width:300px;\
}\
.teamtable th.gdctime div {\
  width:90px;\
}\
.teamtable th {\
  background:#D8D9D5;\
}\
.teamtable .headerRow0  th.stat {\
  background:#D5D6C6;\
  border-bottom: 1px solid #ABAB9E;\
}\
.teamtable th.stat {\
  background:url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/header_bg.gif) repeat-x #EEEEDD  0px -2px;\
}\
.teamtable td.player {\
  width:135px;\
  white-space:nowrap;\
}\
.teamtable td.player img {\
  display:inline;\
}\
.teamtable td.player a.name{\
  white-space:nowrap;\
}\
.teamtable td.player div.detail a{\
  display:inline;\
  width:auto;\
}\
.teamtable td.opp {\
  width:30px;\
}\
.teamtable span.status {\
  color:#F00;\
}\
div.detail span {\
  float:left;\
  margin-right:5px;\
}\
span.injured {\
  background:url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/ic/injury.jpg) no-repeat center center;\
  display:block;\
  text-indent:-9000px;\
  width:10px;\
  overflow:hidden;\
}\
.teamtable td.pos {\
  width:30px;\
}\
.teamtable td.note, .teamtable td.vs, .teamtable th.note, .teamtable th.vs  {\
  width:13px;\
  text-align:left;\
}\
.teamtable td.watch, .teamtable td.action, .teamtable th.watch, .teamtable th.action {\
  width:18px;\
  text-align:center;\
}\
.teamtable th.actiongroup {\
  text-align:center;\
}\
.teamtable th.note{\
  border-right:0px;\
}\
.teamtable td.edit,\
.teamtable td.edit select {\
  width:50px;\
}\
.teamtable td div img {\
  display:inline;\
}\
.teamtable select {\
  font:10px Verdana;\
  width:100%;\
}\
.teamtable tr.odd td{\
  background:#ffffff;\
}\
.teamtable tr.even td{\
  background:#f1f2ed;\
}\
.teamtable th div {\
  font:bold 9px Verdana;\
  overflow:hidden;\
  *overflow:visible;\
}\
.teamtable td div {\
  font:10px Verdana;\
}\
.teamtable td.pts, .teamtable th.pts {\
  width:40px;\
  text-align:right;\
}\
.teamtable th.pts {\
  padding-right:4px;\
}\
.teamtable td.pts {\
  font-weight:bold;\
}\
.teamtable th.check, .teamtable td.check {\
  width:20px;\
  text-align:center;\
}\
.teamtable td.check input {\
  padding:0;\
  margin:0;\
}\
.teamtable tr.headerRow0  th.sorted {\
  background:#666666;\
  color:#fff;\
}\
.teamtable tr.headerRow1  th.sorted {\
  background:#666666;\
  color:#fff;\
}\
.teamtable  th a:visited, .teamtable  td.pts a:visited{\
  color:blue;\
}\
.teamtable tr td.sorted {\
  background-color:#FFFFE5;\
  border-bottom-color:#FFFFE5;\
}\
.teamtable th.sorted a:link, .teamtable th.sorted a:visited, .teamtable th.sorted a:active, .teamtable th.sorted a:hover{\
  color:#fff;\
}\
.teamtable tr.odd td a.esp {\
  padding:4px 0;\
  *padding:4px 0 5px 0;\
  display:block;\
  background:url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/esp.gif) no-repeat top right ;\
}\
.teamtable tr.even td a.esp {\
  padding:4px 0;\
  *padding:4px 0 5px 0;\
  display:block;\
  background:url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/esp.gif) no-repeat  top right ;\
}\
' );

GM_xmlhttpRequest({
    method: 'GET',
    url: playersLink,
    onload: function( responseDetails )
    {
		gSpan.innerHTML = responseDetails.responseText;
		var tables = gSpan.getElementsByTagName( 'table' );
		for ( var iTable = 0; iTable < tables.length; iTable++ )
		{
			if ( tables[ iTable ].id == 'cantcutlisttable0' )
			{
				tables[ iTable ].id = 'playeradditions';
				tables[ iTable ].setAttribute( "class", "teamtable" );
				tables[ iTable ].style.width = '100%';
				divPlayerAdditions.innerHTML = '<h4><a href="' + playersLink + '">Player Additions</a></h4>';
				tables[ iTable ].style.display = 'none';
				for ( var i = 11; i < tables[ iTable ].rows.length; i++ )
				{
					tables[ iTable ].rows[ i ].style.display = 'none';
				}
				tables[ iTable ].style.display = '';
				divPlayerAdditions.appendChild( tables[ iTable ] );
				return;
			}
		}
		divPlayerAdditions.innerHTML = 'not found';
    },
    });

})();