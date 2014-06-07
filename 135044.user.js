// Copyright (C) 2011 - 2012 by Lars-Olof Krause
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// ==UserScript==
// @name           WEB.de - Remove Logout-Advertisement-Personal-Data
// @namespace      LOK-Soft - Lars-Olof Krause
// @description    Removes personal Data which is transfered to Web.de-Logout-Page
// @include        https://freemailng*.web.de/msg/logoff.htm*
// @include        https://*.web.de/logout*
// @version        1.1
// ==/UserScript==

if(document.location.toString().indexOf("web.de/msg/logoff.htm") != -1 || document.location.toString().indexOf("web.de/logout") != -1){
	document.location.href="http://logout.webde.uimserv.net/?p=TG9nb3V0QWRQcm94eS5zZXJ2aWNlPXNraW5uYWJsZWxvZ291dCZzaXRlPXdlYmRlJnNlY3Rpb249Z20xL21haWwvbG9nb3V0L2FkX2R5bmFtaXNjaCZyZWdpb249ZGU="; 
}


//Update Check by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 135044; // Change this to the number given to the script by userscripts.org (check the address bar)

 GM_registerMenuCommand('WEB.de - Personalized Logout Killer - Check for Updates', function(){updateCheck(true);});


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

	updateCheck(false);
}
catch(err)
{}