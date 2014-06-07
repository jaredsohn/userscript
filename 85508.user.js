// Reddit_Bypass_CommentsPage, a Greasemonkey user script
// Version 1 - September, 2010
// Copyright 2010 Ashwyn Mittal 
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Reddit_Bypass_CommentsPage
// @namespace      Ashwyn
// @description    Reddit - When you click Reddit links in Google Reader or anywhere, It doesn't go to the story directly but goes to the comments page. From there you have to navigate to the story by clicking on the title link. This script will take you to the title link directly bypassing the comments page.
// @include        http://www.reddit.com/r/*
// ==/UserScript==


var arr = document.getElementsByTagName("a");
for (i = 0; i < arr.length; i++) 
{
if (arr[i].className == "title ")
 {
    if (history.length <= 1) window.location = arr[i].href;
 }
}



//Script Update Checker http://userscripts.org/scripts/review/20145

var SUC_script_num = 85508; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}