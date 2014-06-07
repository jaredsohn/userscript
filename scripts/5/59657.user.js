// ==UserScript==
// @name           NotDoppler fullscreen
// @namespace      nijtram1@userscripts
// @description    A link  to play the game in fullscreen
// @include        http://www.notdoppler.com/*.php*
// ==/UserScript==
function updateCheck(forced){if ((true) || (parseInt(GM_getValue('TLM_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/59657.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('TLM_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('TLM_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('TLM_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to install it now?')){GM_openInTab('http://userscripts.org/scripts/source/59657.user.js');GM_setValue('TLM_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('TLM_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('TLM_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);
var td;
var linktd;
td = document.getElementsByTagName('td');
for (i = 0; i < td.length; i++)
{
	if ((td[i].width == "420")&&(td[i].height == "30")) linktd = td[i];

}

var param;
var movie;
param = document.getElementsByTagName('param');
for (i = 0; i < param.length; i++)
{
	if((param[i].name == "movie")&&(param[i].value.substr(0, 7) == "/files/")) movie = param[i].value;
}
if(movie != "") linktd.firstChild.innerHTML += '- <a style="color:#003467; text-decoration: none;" href="' + movie + '">FULLSCREEN</a>';