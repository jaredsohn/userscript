// ==UserScript==
// @name           Jtv Cleaner -New Jtv Layout-
// @namespace      justin.tv
// @description    cleans up the new jtv interface
// @include    *justin.tv/*
// @exclude    *justin.tv/*/old*
// @exclude    *justin.tv/directory*
// @exclude    *justin.tv/home
// @exclude    *justin.tv/*/profile
// @exclude    *justin.tv/settings*
// @exclude    *justin.tv/bulletins*
// @exclude    *justin.tv/inbox*
// @exclude    *justin.tv/messages*
// @exclude    *justin.tv/*/gifts*
// @exclude    *justin.tv/sort*
// @exclude    *justin.tv/search*
// @exclude    *justin.tv/user/*
// @exclude    *justin.tv/p/*
// @exclude    *blog.justin.tv/*
// @exclude    *justin.tv/jobs*
// @exclude    *apiwiki.justin.tv/mediawiki*
// @exclude    *community.justin.tv/mediawiki*
// @exclude    *justin.tv/
// @exclude    *justin.tv/clip*
// @exclude    *justin.tv/*/archive*
// @exclude    *justin.tv/broadcast*
// @exclude    *justin.tv/login*
// @exclude    *justin.tv/*/dmca*
// @exclude    *justin.tv/*/popout*
// @exclude    *justin.tv/*/*/*
// @exclude     justin.tv/*/*
// ==/UserScript==


//check for new script version
var SUC_script_num = 59312; 

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


function cleanup() {
kill(window.document,document.getElementById('header_inside'),null,null,null);
kill(window.document,document.getElementById('action_links'),null,null,null);
kill(window.document,document.getElementById('action_contents'),null,null,null);
kill(window.document,document.getElementById('no_clips'),null,null,null);
kill(window.document,document.getElementById('footer'),null,null,null);
kill(window.document,document.getElementById('lateload0'),null,null,null);
kill(window.document,document.getElementById('status'),null,null,null);
kill(window.document,document.getElementById('info'),null,null,null);
kill(window.document,document.getElementById('banner_custom'),null,null,null);
kill(window.document,document.getElementById('sitenav_dropmenu_toggle'),null,null,null);
kill(window.document,document.getElementById('banner_default'),null,null,null);
kill(window.document,document.getElementById('related'),null,null,null);
kill(window.document,document.getElementById('about'),null,null,null);
kill(window.document,document.getElementById('clips'),null,null,null);
kill(window.document,document.getElementById('admin_nxtchan'),null,null,null);
kill(window.document,document.evaluate('/html/body/div[14]/div[2]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[14]/div[2]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html[1]/body[1]/div[13]/div[2]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[2]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html[1]/body[1]/div[2]/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[3]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[13]/div[3]/div/div[7]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
kill(window.document,document.evaluate('/html/body/div[15]/div[3]/div[2]/div[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
style(window.document,document.getElementById('chat_container'),"width: 380px;",null,null);
document.body.style.background="#000000 url()";
};

function kill(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};

function style(doc, element, new_style) {
    element.setAttribute('style', new_style);
};


window.addEventListener("load", function() { cleanup() }, false);