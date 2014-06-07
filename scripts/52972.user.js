// ==UserScript==
// @name           hkreporterQDownload
// @namespace      hkreporter.com
// @include        http://www.hkreporter.com/myradio/channel_list.php?channelid=*
// @include        http://www.hkreporter.com/myradio/search_program.php?timeword=*
// ==/UserScript==

var server = new Array();
server[ 0 ] = "dl10.hkreporter.com";
server[ 1 ] = "dl11.hkreporter.com";
server[ 2 ] = "dl12.hkreporter.com";
server[ 3 ] = "dl3.hkreporter.com";
server[ 4 ] = "dl4.hkreporter.com";
server[ 5 ] = "dl3a.hkreporter.com";
server[ 6 ] = "us.hkreporter.com";

var mp3td = document.evaluate("//td[@width='48%']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = mp3td.snapshotLength - 1; i >= 0; i--) {
		var elm = mp3td.snapshotItem(i);

		var index1 = elm.innerHTML.indexOf( '<a href="' ) + 9;
		var index2 = elm.innerHTML.indexOf( '.mp3"' ) + 4;
		var hrefStr = elm.innerHTML.substring( index1, index2 );
		
		index1 = 7;
		index2 = hrefStr.indexOf( '.com/' ) + 4;
		var ServerStr = hrefStr.substring( index1, index2 );
		var dirStr = hrefStr.substr( index2 );
		
		addHtml = '';
		for ( s=0; s<server.length; s++ ) {
			index2 = server[ s ].indexOf( '.' );
			serverName = server[ s ].substring( 0, index2 );
			addHtml = addHtml + ' | <a href="http://' + server[ s ] + dirStr + '">' + serverName + '</a>';
		}

		elm.innerHTML = elm.innerHTML + addHtml;
}
