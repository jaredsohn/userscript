// ==UserScript==
// @name           TV Tropes - general modifications
// @namespace      http://userscripts.org/scripts/show/64558
// @include        http://tvtropes.org/pmwiki/*
// @description    A few quick modifications to TVTropes
// @updated        2011-06-19
// ==/UserScript==

//Remove "video of the week" notice
var vow = document.evaluate( ".//div[@class = 'vow_banner']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
if( vow )
	vow.parentNode.removeChild( vow );

if( /http:..tvtropes.org.pmwiki.pmwiki/.test(location.href) )
{
	//Remove reviews
	var review = document.evaluate( ".//a[contains(@href,'pmwiki/reviews.php')]", document.getElementById("wikititle"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if( review )
		review.parentNode.removeChild( review );

	//Force default style
	var styleList = document.evaluate( '//head/link[@rel="stylesheet"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	for( i = 0; i < styleList.snapshotLength; i++ )
		styleList.snapshotItem(i).href = "http://tvtropes.org/pmwiki/css_white.css";

	//Change bullet indents
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML =
		'ul ul{padding:0px;margin-left:20px;padding-left:20px;border:none; ! important };\n '+
		'ul ul li{border:none;}\n '+
		'ul ul ul{padding:0px;margin-left:20px;padding-left:20px;border:none; ! important }'+
		'ul ul ul li{padding:0px;border:none;}\n '+
		'ul ul ul ul{padding:0px;margin-left:20px;padding-left:20px;border:none; ! important }'+	
		'ul ul ul ul li{padding:0px;border:none;}\n ';
	document.getElementsByTagName('head')[0].appendChild(style);
}

//Check for updates once a day
function updateCheck( dayDelay )
{
	var scriptNum = 64558;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
	if( typeof GM_getValue != "undefined" && parseInt( GM_getValue('last_check', 0) ) + 24*3600*1000 < new Date().getTime() ) GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+new Date().getTime(),
		headers: { 'Cache-Control': 'no-cache' },
		onload: function(response)
		{
			GM_setValue( 'last_check', ''+new Date().getTime() );

			var localVersion = parseInt( GM_getValue( 'local_version', 0 ) );
			var remoteVersion = parseInt( /@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1] );
			dayDelay = parseInt( GM_getValue( 'day_delay', dayDelay ) );
			
			if( !localVersion || remoteVersion <= localVersion )
				GM_setValue( 'local_version', remoteVersion );
			else if( dayDelay > 0 )
				GM_setValue( 'day_delay', dayDelay - 1 );
			else if( confirm( 'There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?' ) )
			{
				GM_openInTab( 'http://userscripts.org/scripts/show/'+scriptNum );
				GM_setValue( 'local_version', remoteVersion );
				GM_deleteValue( 'day_delay' );
			}
		}
	});
} updateCheck(2);
