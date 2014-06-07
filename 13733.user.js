// ==UserScript==
// @name           VCDQuality2NewzBin
// @namespace      vcdquality2nzb
// @description    Changes the link on www.vcdquality.com (now forwards to vcdq.com) for newzbin to hopefully link straight to a report for THAT release.
// @include        http://www.vcdq.com/release/*
// ==/UserScript==

/* At the time of writting this code, the folder name was stored in the 2nd table, 6th tr and 2nd td deep */

var folderinfo = $x('//h3[@class="field-label" and contains(.,"Folder Name:")]/../div/div', XPathResult.FIRST_ORDERED_NODE_TYPE).innerHTML;
var nblink = $x('//div[@class="field-item" and contains(a,"binsearch")]/a', XPathResult.FIRST_ORDERED_NODE_TYPE);

GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://www.newzbin.com/search/query/?searchaction=Search&fpn=c&category=-1&u_view_assignment_search=1&u_v3_retention=0&u_file_results_amt=50&q='+folderinfo,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
			onload: function(responseDetails) {
				var re = /Assigned; click to view Report" href="\/browse\/post\/(\d+)\/"/;
				var m = re.exec(responseDetails.responseText);
				if (m) {
					nblink.href='https://www.newzbin.com/browse/post/'+m[1]+'/';
					nblink.innerHTML='https://www.newzbin.com';
				}
				else nblink.innerHTML='Newzbin report not found.';
			}
		});

/*
 * function $x() from http://wiki.greasespot.net/XPath_Helper to enable xpath in grease monkey.
 */
function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case 'string': x+=(x=='') ? cur : ' | ' + cur; continue;
      case 'number': type=cur; continue;
      case 'object': node=cur; continue;
      case 'boolean': fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x='//'+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x='.'+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

 /*************************************************************************************\
| * Below is the Update Checker for userscripts.org                                     |
| * for more info on this script please see http://userscripts.org/scripts/review/20145 |
 \*************************************************************************************/
var SUC_script_num = 13733;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}