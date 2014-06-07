// ==UserScript==
// @name          Full Width Facebook Lite
// @namespace     http://www.onlydreaming.net/software/full-width-facebook-lite
// @description	  Removes the right-hand bar from Facebook Lite, allowing the main column to fill the entire width.
// @include       http://lite.facebook.com/*
// @include       https://lite.facebook.com/*
// @exclude       http://lite.facebook.com/*/photos/*
// @exclude       http://lite.facebook.com/*/video/*
// @exclude       https://lite.facebook.com/*/photos/*
// @exclude       https://lite.facebook.com/*/video/*
// ==/UserScript==

var SUC_script_num = 57527;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

updateCheck(false);

if(typeof GM_addStyle === "undefined") {
	function GM_addStyle(/* String */ styles) {
		var oStyle = document.createElement("style");
		oStyle.setAttribute("type", "text\/css");
		oStyle.appendChild(document.createTextNode(styles));
		document.getElementsByTagName("head")[0].appendChild(oStyle);
	}
}

GM_addStyle(".LSplitPage_Right {display:none;}");
