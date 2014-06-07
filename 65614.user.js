// ==UserScript==
// @name           Trukz Contracts linkable to Supply and Demand
// @namespace      TrukzSupplyDemandLink
// @description    Changes contract titles to links to the Trukz Supply and Demand website.
// @include        http://www.trukz.com/contracts_open.asp
// @include        http://trukz.com/contracts_open.asp
// @include        http://www.trukz.com/contracts_open.asp?*
// @include        http://trukz.com/contracts_open.asp?*
// @include        http://www.trukz.com/contracts_company.asp
// @include        http://trukz.com/contracts_company.asp
// ==/UserScript==

for(var i = 0; i < document.body.getElementsByClassName('contract_title').length; i++)
{
	var contracts = document.body.getElementsByClassName('contract_title')[i];
	
	var re = contracts.innerHTML.match(/^(.*) to (.*)$/);
	var cargo = re[1];
	var city = re[2];

	var mileage = document.evaluate("ancestor::tr/following-sibling::tr[1]/td/table/tbody/tr[4]/td",contracts,null,XPathResult.ANY_TYPE,null)
					.iterateNext().firstChild.nodeValue.replace(/^(?:(\d),)?(\d+) .*/,"$1$2");

	var ppm = document.evaluate("ancestor::tr/following-sibling::tr[1]/td/table/tbody/tr[7]/td",contracts,null,XPathResult.ANY_TYPE,null)
					.iterateNext().firstChild.nodeValue.match(/^\$([01]\.\d\d)$/);
   	ppm = (ppm) ? ppm[1] : 1.99;

	contracts.innerHTML = '<a href="http://trukz.robsonradio.com/?supplies='+cargo+'&amp;distance='+city+'&amp;contract='+mileage+'&amp;ppm='+ppm+'" target="_blank">'+cargo+' to '+city+'</a> ';
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://trukz.robsonradio.com/?supplies='+cargo+'&distance='+city+'&contract='+mileage+'&ppm='+ppm+'&short='+i,
	    onload: function(responseDetails) {
	        if(responseDetails.status == 200) {
	        	var re = responseDetails.responseHeaders.match(/classi: (\d+)/);
	        	document.body.getElementsByClassName('contract_title')[re[1]].innerHTML += responseDetails.responseText;
	        }
	    }
	});
}

 /*************************************************************************************\
| * Below is the Update Checker for userscripts.org                                     |
| * for more info on this script please see http://userscripts.org/scripts/review/20145 |
 \*************************************************************************************/
var SUC_script_num = 65614;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
