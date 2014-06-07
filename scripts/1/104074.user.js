// ==UserScript==
// @name           Approve Messaggiamo Articles
// @namespace      http://userscripts.org/scripts/show/104074
// @description    Easier approval of messaggiamo articles
// @include        *messaggiamo.com/editor/add_art.php*
// @updated        2011-07-12
// ==/UserScript==

updateCheck(1);

var a = window.location.href;
var temp = new Array();
var finalurl = 'http://www.messaggiamo.com/editor/index.php?not_approve='
temp = a.split('=');
finalurl += temp[1];

space = document.createTextNode(' - ');

var link = document.evaluate(
'.//a[text()="Add Content"]',
document.body,
null,
XPathResult.FIRST_ORDERED_NODE_TYPE,
null
).singleNodeValue;


if (link != null) {
var newLink = document.createElement('a');
newLink.href = finalurl;

newLink.appendChild(document.createTextNode('Remove Article'));
link.parentNode.insertBefore(newLink, link.nextSibling);

link.parentNode.insertBefore(space, link.nextSibling);
}



function updateCheck( dayDelay )
{
	var scriptNum = 104074;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
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
}