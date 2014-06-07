// ==UserScript==
// @name           What.CD :: Extended Main Menu (2014 Version)
// @description    Insert logchecker, better and WhatIMG link in the main menu
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @version        1
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js

// ==/UserScript==

var target = document.getElementById('nav_upload');

// Add Logchecker link
$("#nav_upload").after('<li id="nav_logchecker" class="brackets"><a href="logchecker.php">Logchecker</a></li>');

// Add Better link
$("#nav_logchecker").after('<li id="nav_better" class="brackets"><a href="better.php">Better</a></li>');

// Add WhatIMG link
$("#nav_better").after('<li id="nav_whatimg" class="brackets"><a href="https://whatimg.com" target="_blank">WhatIMG</a></li>');

/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
	var SUC_script_num = 456629; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
	/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */