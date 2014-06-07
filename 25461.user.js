// ==UserScript==
// @name           MyStickies
// @namespace      http://www.richarddavies.us
// @description    Runs your MyStickies.com bookmarklet at each page load
// @include        *
// @exclude        data*
// ==/UserScript==

/*	Instructions:
1. 	Login to http://www.mystickies.com/ and goto your "Dashboard" page.
2.	Under the "Extension or Bookmarklet" heading, locate the link to your bookmarklet.
3. 	Find your account ID inside the bookmarklet URL. It's the string of letters and numbers after "MyStickies.js?user=".
	(It should look something like: baff5438c6215406adbcd137acc0a881)
4.	In Firefox, click Tools -> User Script Commands -> Set MyStickies account ID
5.	Enter your account ID in the field and click OK.
*/
var userID = GM_getValue('userID', '');

if (userID != '') {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.language = 'javascript';
	script.src = 'http://www.mystickies.com/js/account/MyStickies.js?user=' + userID;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
}

GM_registerMenuCommand('Set MyStickies account ID', function() {
	var userID = GM_getValue('userID', '');
	var msg = '1. Login to http://www.mystickies.com/ and goto your "Dashboard" page.\n2. Under the "Extension or Bookmarklet" heading, locate the link to your bookmarklet.\n3. Find your account ID inside the bookmarklet URL. It\'s the string of letters and numbers after "MyStickies.js?user=".\n  (It should look something like: baff5438c6215406adbcd137acc0a881)\n4. Enter your account ID below:';

	userID = window.prompt(msg, userID);
	
	if (userID) {
		GM_setValue("userID", userID);
	}
});

// Begin Script Update Checker code	http://userscripts.org/scripts/show/20145
SUC_script_num = 25461; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// End Script Update Checker code
