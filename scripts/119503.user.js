// ==UserScript==
// @name OGame Remove GF Bar
// @description Removes new GameForge bar from OGame TopView
// @version 1.1
// @author Glibnes <glibnes@gmail.com> [http://battlespace.pl]
// @include http://*ogame.*
// @exclude http://board.ogame.*

// ==/UserScript==

// Script Update Checker by Jarett (http://userscripts.org/scripts/show/20145) 
var SUC_script_num = 119503; // Change this to the number given to the script by userscripts.org (check the address bar)
var Version        = 1.100;   // Current Script Version (in var is easier to manipulate)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=Version;if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', 'OGame Remove GF Bar');if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// Script Code
var rmEl = document.getElementById('mmonetbar');
var parent = rmEl.parentNode;
parent.removeChild(rmEl);
parent.attributes.class.nodeValue = parent.attributes.class.nodeValue.replace('no-commander', '');