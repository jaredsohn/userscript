// ==UserScript==
// @name           Crimes Security Image Mover
// @namespace      http://
// @description    Move your Crime Security Image to the top, where it should be
// @include        http://www.bootleggers.us/crime.php*
// ==/UserScript==

// Update checker - http://userscripts.org/scripts/show/20145
var SUC_script_num = 72548;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if ( document.getElementById('captchaImg') ) {
	var findImage = document.getElementById('captchaImg').parentNode.parentNode.parentNode.parentNode;
	var image = findImage.innerHTML;
	var findForm =  document.getElementById('captchaImg').parentNode.parentNode.parentNode.parentNode.parentNode;
	findForm.removeChild(findImage);
	findForm.innerHTML = '<table class="sub2" align="center" border="1" bordercolor="black" cellpadding="2" cellspacing="0" width="300">' + image + '</table>&nbsp;' + findForm.innerHTML;
}