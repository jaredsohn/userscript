// ==UserScript==
// @name Groove Shark Lube
// @namespace 
// @version  3.0 
// @description    Removes Ad sidebar and extends player
// @include        http://grooveshark.com/*
// @include        http://listen.grooveshark.com/*
// @author         Eric Lammertsma (http://userscripts.org/users/4742) & Manish Chiniwalar (http://userscripts.org/users/manishchiniwalar) & seadugo
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

//Auto Update Script
var SUC_script_num = 103643; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var adSidebar = document.getElementById('capital');
if(adSidebar) {
	adSidebar.parentNode.removeChild(adSidebar);
	}
var themeHomeDiv = document.getElementById('theme_home');
if(themeHomeDiv ) {
	themeDiv.parentNode.removeChild(themeHomeDiv );
	}
var themePageHeaderDiv = document.getElementById('theme_page_header');
if(themePageHeaderDiv ) {
	themeDiv.parentNode.removeChild(themePageHeaderDiv );
	}

GM_addStyle("#application { margin-right: 0px !important;}");