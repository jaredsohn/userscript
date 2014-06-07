// ==UserScript==
// @name			Mafia Wars Group Tools
// @namespace		Facebook
// @description		Adds Links For Mafia Wars Functions
// @version			1.2.2
// @include			http://www.facebook.com/board.php*
// @include			http://www.facebook.com/topic.php*
// @exclude			http://www.facebook.com/group.php*
// @author 			Script0rz
// @namespace     http://userscripts.org/scripts/show/55784
// ==/UserScript==

var SUC_script_num = 55784; // Change this to the number given to the script by userscripts.org (check the address bar)
	try
	{
		function updateCheck(forced)
		{
			if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + (86400000*7) <= (new Date().getTime())))
			{
				try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp)
				{
					var local_version, remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
					local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
					if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					if (remote_version > local_version)
					{
						if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
						{
							GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							GM_setValue('SUC_current_version', remote_version);
						}
					}
					else if (forced)alert('No update is available for "'+script_name+'."');
					}
						else GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
				{
					if (forced)alert('An error occurred while checking for updates:\n'+err);
				}
			}
		}
		GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', 
		function()
		{
			updateCheck(true);
		});
			updateCheck(false);
	}catch(err){}
	
 function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}	
function log(message) {
	GM_log(message);
}
function RemoveHash()
{//
    try
    {
    var links = document.evaluate( './/a[ contains( @href, ".php?" ) ]', document, null, 7, null );
	for(var i=links.snapshotLength-1;i>=0;i--) links.snapshotItem(i).target="_parent";
	}
	catch ( e )
	{
		log ( "Got error: RemoveHash" + e );
	}
}
function findMafiaProAddMePro()
{
    try
    {
		var aRows = xpath("//ul[@class='actionspro']");
		for (var i=0; i < aRows.snapshotLength; i++ )
		{
			var aRow = aRows.snapshotItem(i);
			var aRegEx = aRow.innerHTML.match(/rid=([0-9]+)/);
			if ( aRegEx==null ){aRegEx='id';}
			var sNewSpanId2 = "Addme" + aRegEx[1];
                var aNewSpan = document.createElement('div');
				aNewSpan.innerHTML = "<a href='http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user=" + aRegEx[1] + "' class='UIButton UIButton_Gray UIActionButton; UITooltip' target='_blank'><img src='http://photos-h.ak.fbcdn.net/photos-ak-sf2p/v43/231/10979261223/app_2_10979261223_8090.gif' style='border: 1px solid #000000;'><span class='UITooltip_Wrap left'><span class='UITooltip_Text'>Mafia Wars Profile</span></span></div></a>" +
									 "<a onclick='new ConnectDialog(&quot;"+ aRegEx[1] +"&quot;, &quot;&quot;, null, this, 0, null, -1.000000, &quot;&quot;, &quot;&quot;).show();return false;' class='UIButton UIButton_Gray UIActionButton; UITooltip'   href='#'><img src='http://static.ak.fbcdn.net/rsrc.php/z7BCK/hash/anduiizv.gif' style='border: 1px solid #000000;' /><span class='UITooltip_Wrap left'><span class='UITooltip_Text'>Add Friend</span></span></a>" +
									 "<a href='http://www.facebook.com/inbox/?compose&amp;id="+ aRegEx[1] +"' class='UIButton UIButton_Gray UIActionButton; UITooltip' target='_blank'><img src='http://photos-c.ak.fbcdn.net/photos-ak-sf2p/v43/246/56678010978/app_2_56678010978_6189.gif' height='16px' style='border: 1px solid #000000;'><span class='UITooltip_Wrap left'><span class='UITooltip_Text'>Send a Message</span></span></div></a>"; 
                aRow.appendChild ( aNewSpan );
				
		}
	}
	catch ( e )
	{
		log ( "Got error in findMafiaProAddMePro: " + e );
	}
}
function EndofDiscussion()
{
    try
    {
		var aRows = xpath("//div[@class='last_post']");
		for (var i=0; i < aRows.snapshotLength; i++ )
		{
			var aRow = aRows.snapshotItem(i);
			var aRegEx = aRow.innerHTML.match(/href="(.+?)"/);
            var sNewPageId = "FixPage-" + aRegEx[1];
            var aNewPage = document.createElement('div');
            aNewPage.innerHTML = "<a href=" + aRegEx[1] + "  class='UIButton UIButton_Gray UIActionButton' target='_self'><img alt='' class='loading'  src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif' /> <b>End of Discussion</b></a>";
            aRow.appendChild ( aNewPage );
		}
	}
	catch ( e )
	{
		GM_log ( "Got error in EndofDiscussion: " + e );
	}
}
function BackToTopic()
{
    try
    {
		var aRows = xpath("//ul[@class='pagerpro']");
		for (var i=0; i < aRows.snapshotLength; i++ )
		{
			var aRow = aRows.snapshotItem(i);
			var aRegEx = aRow.innerHTML.match(/uid=([0-9]+)/);
            var sNewPageId = "FixPage-" + aRegEx[1];
            var aNewPage = document.createElement('div');
            aNewPage.innerHTML = "<br><center><a href='http://www.facebook.com/board.php?uid=" + aRegEx[1] + "'  class='UIButton UIButton_Gray UIActionButton;tabs clearfix' target='_self'><img alt='' class='loading'  src='http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif' /> <b>Topic View</b></a>";
            aRow.appendChild ( aNewPage );
		}
	}
	catch ( e )
	{
		GM_log ( "Got error in BackToTopic: " + e );
	}
}
RemoveHash()
EndofDiscussion()
findMafiaProAddMePro()
BackToTopic()