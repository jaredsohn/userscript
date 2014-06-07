// ==UserScript==
// @name           Casino Blocker
// @namespace      http://
// @include        http://www.bootleggers.us/keno.php*
// @include        http://www.bootleggers.us/cashier.php*
// ==/UserScript==


var SUC_script_num = 79831;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

	if ( GM_getValue('blockedPages') ) {} else {
		GM_setValue('blockedPages', '-');
	}

	function blockPage() {
		var whichPage = window.location.href.split('.us/')[1].split('.php')[0];
		var myBlockedPages = GM_getValue('blockedPages') + '-' + whichPage;
		GM_setValue('blockedPages', myBlockedPages);
		window.location.href = window.location.href;
	}

	function unblockPage() {
		var whichPage = window.location.href.split('.us/')[1].split('.php')[0];
		var myBlockedPages = GM_getValue('blockedPages').split('-');
		for ( i = 0; i < myBlockedPages.length; i++ ) {
			if ( myBlockedPages[i] == whichPage ) {
				myBlockedPages[i] = '';
			}
		}
		GM_setValue('blockedPages', myBlockedPages.join('-'));
		window.location.href = window.location.href;
	}

	var isThisPageBlocked = false;
	var blockedPages = GM_getValue('blockedPages').split('-');
	var thisPage = window.location.href.split('.us/')[1].split('.php')[0];
	for ( i = 0; i < blockedPages.length; i++ ) {
		if ( blockedPages[i] == thisPage ) {
			var add = '';
			add += '<span class="insideTables">';
			add += '<table border="1" cellpadding="2" class="sub2" cellspacing="0" bordercolor="#000000" style="margin-top: 10px">';
			add += '<tr>';
			add += '<th class="header">Block This Casino</th>';
			add += '</tr>';
			add += '<tr>';
			add += '<td style="padding: 10px" align="center">You have blocked this page!<br /><input type="button" value="Unblock" id="unblock" style="display: none" /></td>';
			add += '</tr>';
			add += '</table>';
			add += '</span>';
			document.getElementsByTagName('center')[1].innerHTML = add;
			document.getElementById('unblock').addEventListener('click', unblockPage, false);
			var isThisPageBlocked = true;
		}
	}

	var allPages = new Array('keno', 'bj/blackjack', 'roulette', 'slot', 'war', 'race', 'poker', 'cashier');
	var thisPage = window.location.href.split('.us/')[1].split('.php')[0];
	for ( i = 0; i < allPages.length; i++ ) {
		if ( allPages[i] == thisPage ) {
			if ( isThisPageBlocked == false ) {
				var add = '';
				add += '<span class="insideTables">';
				add += '<table border="1" cellpadding="2" class="sub2" cellspacing="0" bordercolor="#000000" style="margin-top: 10px">';
				add += '<tr>';
				add += '<th class="header">Block This Casino</th>';
				add += '</tr>';
				add += '<tr>';
				add += '<td style="padding: 10px" align="center"><input type="button" value="Block This Casino" id="block" /></td>';
				add += '</tr>';
				add += '</table>';
				add += '</span>';
				document.getElementsByTagName('center')[1].innerHTML = add + document.getElementsByTagName('center')[1].innerHTML;
				document.getElementById('block').addEventListener('click', blockPage, false);
			}
		}
	}