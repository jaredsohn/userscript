// ==UserScript==
// @name           "Select All" Checkbox
// @namespace      http://
// @include        http://www.bootleggers.us/autoburglary.php*
// ==/UserScript==

// Update checker - http://userscripts.org/scripts/show/20145
var SUC_script_num = 72099;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if ( document.title == 'Bootleggers :: Auto Burglary' ) {
	if ( document.body.innerHTML.indexOf('You are now in jail') == '-1' ) {
		var table = document.getElementsByTagName('table');
		if ( table[11].innerHTML.indexOf('You are recovering from your previous crime!') > '-1' ) {
			table[11].style.marginBottom = '20px';
			var input = table[12].getElementsByTagName('input');
			var tds = table[12].getElementsByTagName('td');
			if ( input.length > '5' ) {
				tds[1].innerHTML = '<input type="checkbox" onclick="var input = document.getElementsByTagName(\'table\')[12].getElementsByTagName(\'input\'); for ( i = 0; i < input.length; i++ ) { if ( input[i].type == \'checkbox\' ) { input[i].checked = this.checked; } }" />';
			}
			for ( i = 1; i <= 8; i++ ) {
				tds[i].className = 'sub3';
				tds[i].style.fontWeight = 'bold';
			}
		} else {
			table[10].style.marginBottom = '20px';
			var input = table[11].getElementsByTagName('input');
			var tds = table[11].getElementsByTagName('td');
			if ( input.length > '5' ) {
				tds[1].innerHTML = '<input type="checkbox" onclick="var input = document.getElementsByTagName(\'table\')[11].getElementsByTagName(\'input\'); for ( i = 0; i < input.length; i++ ) { if ( input[i].type == \'checkbox\' ) { input[i].checked = this.checked; } }" />';
			}
			for ( i = 1; i <= 8; i++ ) {
				tds[i].className = 'sub3';
				tds[i].style.fontWeight = 'bold';
			}
		}
		if ( input.length > '5' ) {
			tds[(tds.length - 2)].firstChild.innerHTML = (input.length - 6) + ' @ ' + tds[(tds.length - 2)].firstChild.innerHTML;
		} else {
			tds[(tds.length - 2)].firstChild.innerHTML = '0 @ ' + tds[(tds.length - 2)].firstChild.innerHTML;
		}
	}
}