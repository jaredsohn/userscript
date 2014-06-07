// ==UserScript==
// @name           Check IP for Spam and Whois on vBulletin
// @namespace      http://userscripts.org/scripts/show/107135
// @description    Add a link to check if the ip is listed in the spam database and another link to check the whois data in moderate users area on vBulletin
// @include        */admincp/index.php*
// @include        */admincp/user.php?do=moderate
// @updated        2011-07-22
// ==/UserScript==

updateCheck(1);

var alink = document.getElementsByTagName('a');
var ipfilter = /^.*([0-9]{0,2})+\.([0-9]{0,2})+\.([0-9]{0,2})+\.([0-9]{0,2})+$/;
//var ipfilter = /^(?:\d{1,3}\.){3}\d{1,3}$/;

var whoisurl = 'http://ip-lookup.net/index.php?';
var whoislinktitle = 'WHOIS Check';
var whoisanchorext = '<img src="http://dl.dropbox.com/u/2291044/link.png" />';

var spamcheckurl = 'http://www.mxtoolbox.com/SuperTool.aspx?action=blacklist%3a'
var spamchecktitle = 'Spam Check';
var spamcheckanchortext = '<img src="http://dl.dropbox.com/u/2291044/spam.png" />';

for (var i = 0; i < alink.length; i++){
    
        if (alink[i].textContent.match(ipfilter)){
        
        span = document.createElement('span');
            
            if (alink[i].textContent.match(/\:/g)){
                var ipaddr = alink[i].textContent.split(/\:/g);
                ipaddr = ipaddr[1];
                
                if (ipaddr.match(/\//g)){
                    var ipaddr = alink[i].textContent.split(/\//g);
                    ipaddr = ipaddr[1];
                }
                
            }else{
                var ipaddr = alink[i].textContent;
            }
            
            linkurl = ' - <a style="color:red;" href="' + whoisurl + ipaddr + '" target="_blank" title="' + whoislinktitle + '">' + whoisanchorext + '</a>&nbsp;';
            Spamlink = '<a style="color:red;" href="' + spamcheckurl + ipaddr + '" target="_blank" title="' + spamchecktitle + '">' + spamcheckanchortext + '</a>';
            linkurl += Spamlink;
            
            span.innerHTML = linkurl;
            
            alink[i].parentNode.insertBefore(span, alink[i].nextSibling);
        }
}

function updateCheck(dayDelay)
{
	var scriptNum = 107135;
	
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
