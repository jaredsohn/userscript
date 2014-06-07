// ==UserScript==
// @name           TVBOXNOW Refresh Script
// @namespace      ZC.Khoo
// @description    A refresh script - every 5min
// @include        http://58.64.234.36/*
// @include        http://210.6.90.149:8801/*
// @include        http://www3.tvboxnow.com/*
// @include        http://os.tvboxnow.com/*
// @include        http://tvboxnow.com/*
// @include        http://www.tvboxnow.com/*
// @include        http://www1.tvboxnow.com/*
// @version        1.03
// @history        1.03 - Update url domain
// @history        1.02 - Restrict only available in space-uid page (user display)
// @history        1.01 - Set refreshing time to 5min
// @history        1.00 - New script created

// ==/UserScript==
var SUC_local_ver = 1.03;

/** SETTINGS IS NOW A MENU OPENED BY A JAVASCRIPT HYPERLINK AT THE TOP OF THE PAGE!) **/

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/
/********************* Update Checker *********************/
var SUC_script_num = 99267;
function updateCheck(forced)
{
	try
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
			headers: {
				"Pragma": "no-cache",
				"Cache-Control": "no-cache"
			},
			onload: function(resp)
			{
				var remote_version, rt, script_name;
				
				rt=resp.responseText;
				remote_version=(/@version\s*(.*?)\s*$/m.exec(rt))[1];
				if(SUC_local_ver!=-1)
				{
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					if (remote_version > SUC_local_ver)
					{
						if ( document.getElementById("newsText")) {
							document.getElementById("newsText").innerHTML = "<p style=\"font-family:arial;color:red;font-size:22px;\"><b><u>There is an update available for the auto-hunt script! <a href=\"http://userscripts.org/scripts/source/99267.user.js\">Download</a> now!<u></b></p>";
						}
						if (forced)
						{
							alert('Update available for "'+script_name+'! Click on the link at the newsText near the hunt button to download."');
						}
					}
					else if (forced)
					{
						alert('No update is available for "'+script_name+'."');
					}
				}
			}
		});
	}
	catch (err)
	{
		if (forced)
			alert('An error occurred while checking for updates:\n'+err);
	}
}
GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
{
	updateCheck(true);
});
updateCheck(false);

timedRefresh(300000);

function timedRefresh(timeoutPeriod) {
    var url = String(document.location);
        if(url.indexOf('space-uid-')!= -1)
        {
            document.title = "TVBoxNow Reload Every 5min";
            setTimeout("location.reload(true);",timeoutPeriod);
        }
}