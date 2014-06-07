// ==UserScript==
// @name           Trukz True Distance
// @namespace      TrukzTrueDist
// @description    Displays the true distance until the end of the route without rounding off. Sometimes the Dashboard will show 815 miles when all is really required is 814, on rare occations this could save you 1mph on the last leg when you do not need to speed.
// @include        http://www.trukz.com/in_route.asp
// @include        http://trukz.com/in_route.asp
// @include        http://www.trukz.com/in_route.asp?*
// @include        http://trukz.com/in_route.asp?*
// ==/UserScript==

for(var i = 0;i < document.body.getElementsByTagName('TD').length;i++) {
	var cell = document.body.getElementsByTagName('TD')[i];
	if (cell.innerHTML.replace(/<?[^<]*>|<[\S\s]*|\s*/g,'') == 'RouteDistance:') {
		var trueMiles = /var perComp = \(traveled\/(\d+)\)/;
		trueMiles = trueMiles.exec(document.getElementById('main').innerHTML);
		trueMiles = trueMiles[1];
		
		cell = cell.nextSibling.nextSibling;
		if (cell.innerHTML.search(trueMiles) == -1)
			cell.innerHTML += ' <font color="red">'+trueMiles+' True Miles</font>';
	}
}

 /*************************************************************************************\
| * Below is the Update Checker for userscripts.org                                     |
| * for more info on this script please see http://userscripts.org/scripts/review/20145 |
 \*************************************************************************************/
var SUC_script_num = 61799;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}