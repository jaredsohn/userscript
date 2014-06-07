/*==============================================================================================================

GC-EnableDynamicMap 
by JR849 - http://jr849.de/greasemonkey-skripte/

//==============================================================================================================
This is a Greasemonkey user script.

Description:
Enables the dynamic map every time you open a cache listing on gc.com.

If you have any questions, contact me via contactform (Kontakt) at www.jr849.de ;-)
//==============================================================================================================
*/
// ==UserScript==
// @name             GC-EnableDynamicMap
// @description      Enables the dynamic map every time you open a cache listing on gc.com.
// @version       	 1.0
// @copyright        JR849 - http://jr849.de/greasemonkey-skripte/
// @license       	 Attribution-Noncommercial-Share Alike (http://creativecommons.org/licenses/by-nc-sa/3.0/)
// @include          http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==
//==============================================================================================================
var SUC_script_num = 102682; // Change this to the number given to the script by userscripts.org (check the address bar)

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

(function() {
var slippyMap = document.getElementById('lnk_slippyMap');

window.addEventListener("load", function(e) {
		click(slippyMap);
}, false);

//==========================================================================================
//  function click(elm)
//	Simulate Click
//==========================================================================================
function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}
})();