// ==UserScript==
// @name           Portal Google Logo
// @namespace      http://localhost/
// @description    Replaces Google Logo with a portal themed one
// @include        http://*.google.*/*
// replace select value to desired logo (0 for random)
// image list:
// 1 = http://i.imgur.com/JZZ8D.png 
// designed by eyefork
// 2 = http://i305.photobucket.com/albums/nn217/Wert_Ac/ApertureGoogle2.png
// designed by Wert Ac
// 3 = http://img138.imageshack.us/img138/8565/ashgd.png
// designed by wade
// ==/UserScript==
var select = 0;
//do not edit further unless you know what you are doing
// Script update Checker by Jarett http://userscripts.org/scripts/show/20145
var SUC_script_num = 72376;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// end of script update checker
var logos = [['http://i.imgur.com/JZZ8D.png'],['http://i305.photobucket.com/albums/nn217/Wert_Ac/ApertureGoogle2.png'],['http://img138.imageshack.us/img138/8565/ashgd.png']];
var selectedlogo;
if (select == 0 | select > logos.length) {
	selectedlogo = Math.floor(Math.random()*logos.length);
}
else {
	selectedlogo = select -1;
}
var logotipo = document.getElementById('logo');
if (logotipo) {
	logotipo.height=110;
	logotipo.width=276;
	logotipo.src=logos[selectedlogo];
}