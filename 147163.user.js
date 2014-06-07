// ==UserScript==
// @name           Knastvögel Youtube autoplay Stop
// @description	   Verhindert das automatische starten von Musikvideos auf den Profilseiten auf Knastvögel.de
// @namespace       http://userscripts.org/scripts/show/147163

// @include        *knastvoegel.de*
// ==/UserScript==


// ***********************************************************************************************
// Überprüfe ob Update verfügbar
// ***********************************************************************************************

var SUC_script_num = 147163; // userscript ID
var scriptende = ".user.js";
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000  <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
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
								if(confirm('"'+script_name+'"Update verfügbar. \nUpdate jetzt installieren?'))
								{
									GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+''+scriptende);
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

for (var i = 0; document.getElementsByTagName('embed')[i]; i++) document.getElementsByTagName('embed')[i].src = document.getElementsByTagName('embed')[i].src.replace(/autoplay=1/, 'autoplay=0');


// Ende im Gelände