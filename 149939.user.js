// ==UserScript==
// @name           Speedy
// @namespace      http://www.mentha.pt
// @description    Speedy Bookmarklet
// @include        *
// @exclude        data*
// ==/UserScript==

/*	Instructions:
1. 	Login to Speedy..
2.	Locate the bookmarklet and click on the buttons.
*/
var ID = GM_getValue('ID', 'speedy');

if (ID != '') {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.language = 'javascript';
	script.src = 'http://speedy.mentha.pt/widget?id=' + ID;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
}

GM_registerMenuCommand('Set Speedy account ID', function() {
	var ID = GM_getValue('ID', '');
	var msg = '1. Login to Speedy.\n2. Locate the bookmarklet and click on the buttons.';

	ID = window.alert(ID);
	
	if (ID) {
		GM_setValue("ID", ID);
	}
});

// Begin Script Update Checker code	http://userscripts.org/scripts/show/20145
SUC_script_num = 149939;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// End Script Update Checker code