// ==UserScript==
// @name           Trukz Total Cashable
// @namespace      TrukzCashable
// @description    Adds to the My Driver page value of truck addons and current truck value.
// @include        http://www.trukz.com/driver_display.asp
// ==/UserScript==

var re = /\$([.0-9,]+) <i>\(Total\)/;
var arg = re.exec(document.getElementById('main').innerHTML);
var cash = 100 * Math.abs(arg[1].replace(',',''));

var re = /Current Value:(?:(?!<td)[\s\S])*<td[^>]*>\n\$([.0-9,]+)/;
var arg = re.exec(document.getElementById('main').innerHTML);
cash += 100 * Math.abs(arg[1].replace(',',''));

GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.trukz.com/item_purchase.asp',
			onload: function(responseDetails) {
				var re = /It is currently valued at \$([0-9,]+\.\d\d)(?:(?!<\/tr)[\s\S])*Item sells with truck/g;
				
				while (arg = re.exec(responseDetails.responseText))
					cash += 100 * Math.abs(arg[1].replace(',',''));
				cash = (Math.round(cash) / 100);
				
				var tds = document.getElementsByTagName("td");
				for(var i=0;i<tds.length;i++)
					if (tds[i].innerHTML.replace(/\s*<[^>]*>\s*/g,'') == 'Money:')
						tds[i+1].innerHTML += '<br><span>$'+cash+' (cash+truck+addons)</span>';
			}
		});


 /*************************************************************************************\
| * Below is the Update Checker for userscripts.org                                     |
| * for more info on this script please see http://userscripts.org/scripts/review/20145 |
 \*************************************************************************************/
var SUC_script_num = 60587;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}