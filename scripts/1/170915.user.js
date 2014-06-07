// ==UserScript==
// @name		What.CD :: Last PM Inbox Link
// @namespace	        http://userscripts.org/scripts/show/EDIT
// @description	        Will make you go automatically to the last Private Message of the conversation
// @include		http*://*what.cd/inbox.php*
// @version		1.2
// @require             http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$("#messageform").find("td").find("a").each(function() { // Inbox form -> Table TD -> Links found
    
    $this = $(this);

    var url_en_cours = $this.attr("href"); // Getting the URL data
    
    // Old URL + Anchor Link
    $this.attr("href", url_en_cours+"#messageform");

});

// Focus to the reply if possible
$("#quickpost").focus();

/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
	var SUC_script_num = 170915; // Change this to the number given to the script by userscripts.org (check the address bar)
	try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
	/* Script Update Checker from: http://userscripts.org/scripts/show/20145 */