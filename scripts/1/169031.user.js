// ==UserScript==
// @name           4funRedirect
// @namespace      4funRedirect
// @description    Direct Goto Current web address
// @version        0.02
// @include        http*://4fun.tw/*
// ==/UserScript==
var thisVersion = "0.02";
var SUC_script_num = 169031;


if (parseInt(GM_getValue('SUC_remote_version',0),10) > thisVersion) {
	newVersionAvailable=1;
}

// update script from: http://userscripts.org/scripts/review/000000

try{ function updateCheck(forced) {
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0'),10) + (86400000*1) <= (new Date().getTime()))) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp){
					var remote_version, rt, script_name;
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(rt)[1],10);
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					GM_setValue('SUC_remote_version', remote_version);
					GM_log('remote version ' + remote_version);
					if (remote_version > thisVersion) {
						newVersionAvailable=1;
						if (forced) {
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
							}
						}
					} else if (forced) alert('No update is available for "'+script_name+'."');
				}
			});
		}catch (err) {
			if (forced) alert('An error occurred while checking for updates:\n'+err);
		}
	}
     }
     GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
     updateCheck(false);
} catch(err) {}

////////////////
currentAddress = document.getElementById('original_url').value;
window.location = currentAddress;


// ENDOFSCRIPT
