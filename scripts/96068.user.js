// ==UserScript==
// @name           Lockerz Auto Redeemer
//       
// @include    http://fileups.net/1i9I61    
// @include        
// @description    lockerz auto redeemer, just enter the name of the item you want to redeem and the price and //shipping info. then on redemption day, when u log in, it will automatically choose the item for you and bypass the //captcha.  for the updated version, get it here: http://fileups.net/1i9I61
// @updated        2011-02-03
// ==/UserScript==

var imageSearch = "http://danbooru.iqdb.hanyuu.net/db-search.php?url=";
	//Danbooru:         "http://danbooru.iqdb.hanyuu.net/db-search.php?url=";
	//Multi-service:    "http://iqdb.hanyuu.net/?url=";
	//nothing:          null;

function modifyLinks(e)
{
	var link = (e ? e.target : document).getElementsByTagName("a");
	for( var i = 0; i < link.length; i++ )
	{
		if( /^[0-9]+X+$/.test( link[i].textContent ) )
			link[i].textContent = link[i].href.replace(/(javascript:quote\('|'\)|.*#q)/gi,'');
		else if( imageSearch && "filesize" == link[i].parentNode.getAttribute("class") && !/\.iqdb\./.test( link[i].href ) )
			link[i].href = imageSearch + link[i].href.replace(/\/src\//,'/thumb/').replace(/....$/,'s.jpg') + "&fullimage=" + link[i].href;
	}
}

if( !/\/res\//.test(location.href) )
	window.addEventListener( "DOMNodeInserted", modifyLinks, true );
modifyLinks();

function updateCheck( dayDelay )
{
	var scriptNum = 43268;
	if( parseInt( GM_getValue('last_check', 0) ) + 24*3600*1000 < new Date().getTime() ) GM_xmlhttpRequest(
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
}updateCheck(2);
