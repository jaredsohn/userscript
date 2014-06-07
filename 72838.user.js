// ==UserScript==
// @name           Motobit base64 results modifier
// @namespace      http://www.thenewgroup.com/gmscripts
// @description    Modifies the results returned by the base64 (de|en)coder.
// @include        http://www.motobit.com/util/base64-decoder-encoder.asp
// @copyright      2010+, The New Group (http://theNewGroup.com)
// @author         Kory Paulsen
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        0.1.1
// ==/UserScript==


// Jarett's update checker (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 72838; // Basecamp Writeboard Sorting UserScripts script id
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var adXpath = "//div[@id='dcenter']/div[1]";
var ad = document.evaluate( adXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
ad.style.display='none';

var resultXpath = "//textarea[@id='resultdata']";
var result = document.evaluate( resultXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

var oneLineResult = document.createElement('input');
oneLineResult.setAttribute('style', 'display:block; width:640px; font:normal 1.4em monospace;');
oneLineResult.setAttribute('value', result.value.replace( /\s/gi, '' ));
result.parentNode.insertBefore( oneLineResult, result );
