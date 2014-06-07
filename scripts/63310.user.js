// ==UserScript==
// @name           cam4 cleaner
// @namespace      cam4.com
// @description    cleans up cam4 rooms
// @include        http://cam4.com/*
// ==/UserScript==


//check for script update
var SUC_script_num = 63310; 

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}



function clean() {
kill(window.document,document.getElementById('topHeader'),null,null,null);
kill(window.document,document.getElementById('right-content'),null,null,null);
kill(window.document,document.getElementById('EroIMslider'),null,null,null);
kill(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.getElementById('header'),null,null,null);
kill(window.document,document.evaluate('/HTML[1]/BODY[1]/H2[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[3]/DIV[1]/DIV[1]/DIV[4]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[3]/DIV[1]/DIV[1]/DIV[4]/DIV[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[3]/DIV[1]/DIV[1]/DIV[4]/DIV[1]/DIV[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div[5]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div/ul/li[9]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div/ul/li[8]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div/ul/li[6]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div/ul/li[4]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div/ul/li[10]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div[3]/a/img', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[3]/div/div/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.getElementById('footer'),null,null,null)};


function kill(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};


unsafeWindow.Set_Layer_ID = "" ;
window.addEventListener("load", function() { clean() }, false);