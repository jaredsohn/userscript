// ==UserScript==
// @name           Friends List
// @namespace      http://
// @include        http://www.bootleggers.us/profile.php
// @include        http://www.bootleggers.us/viewprofile.php*
// ==/UserScript==

// Update checker - http://userscripts.org/scripts/show/20145
var SUC_script_num = 72088;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if ( document.location.href == 'http://www.bootleggers.us/profile.php' ) {
	var forms = document.getElementsByTagName('form');
	friendsForm = forms[3];

	var tds = friendsForm.getElementsByTagName('td');
	friendsTd = tds[2];

	var checker;

	var users = friendsTd.getElementsByTagName('a');
	for ( i = 0; i < users.length; i++ ) {
		var url = 'http://www.bootleggers.us/viewprofile.php?viewuser=';
		if ( users[i].innerHTML.charAt(0) == '@' ) {
			url += users[i].innerHTML.substring(1, users[i].innerHTML.length) + '#returnid' + i;
		} else {
			url += users[i].innerHTML + '#returnid' + i;
		}
		users[i].innerHTML = '<span id="statusChecker_' + i + '">' + users[i].innerHTML + '</span> <img src="http://images.illegitimi.net/bl/loading.gif" border="0" id="busy_' + i + '" />';
		users[i].innerHTML += '<iframe id="checker_' + i + '" height="0" width="0" src="about:blank" border="0" frameborder="0"></iframe>';
		checker = document.getElementById('checker_' + i);
		checker.src = url;
	}
}


if ( parent.document.location.href == 'http://www.bootleggers.us/profile.php' ) {
	var returnId = window.location.href.split('#returnid')[1];
	if ( isNaN(returnId) == false ) {
		var center = document.getElementsByTagName('center');
		var cells = center[0].getElementsByTagName('td');
		if ( cells[24].innerHTML.indexOf('Name:') > '-1' ) {
			myCell = cells[35];
			myOtherCell = cells[25];
		} else {
			myCell = cells[36];
			myOtherCell = cells[26];
		}
		if ( myCell.innerHTML.indexOf('Online') > '-1' ) {
			parent.document.getElementById('statusChecker_' + returnId).style.color = '#0F0';
		} else
		if ( myCell.innerHTML.indexOf('Dead') > -1 ) {
			parent.document.getElementById('statusChecker_' + returnId).style.color = '#800000';
		} else
		if ( myOtherCell.innerHTML.indexOf('Banned') > -1 ) {
			parent.document.getElementById('statusChecker_' + returnId).style.color = '#000';
		}
		var myParent = parent.document.getElementById('checker_' + returnId).parentNode;
		var removeMe = parent.document.getElementById('checker_' + returnId);
		var removeBusy = parent.document.getElementById('busy_' + returnId);
		myParent.removeChild(removeMe);
		myParent.removeChild(removeBusy);
	}
}