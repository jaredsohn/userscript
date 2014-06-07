// ==UserScript==
// @name           TopGear.com Region Free Videos
// @namespace      http://userscripts.org/users/75016
// @description    Removes the region blocking from videos on TopGear.com.
// @version        20090529
// @include        http://www.topgear.com/uk/videos/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Based on a concept by Trollbooth
// http://forums.finalgear.com/top-gear/topgear-com-makes-video-clips-uk-only-32314/page-9/#post989871

if ( typeof $ == 'function' ) {
	var flashvars = $("#player param[name='flashvars']").attr("value");

	flashvars = flashvars.replace(/playerID/, 'foobar');
	flashvars = flashvars.replace(/adServerURL/, 'foobar');

	$("#player param[name='flashvars']").attr("value", flashvars);
} else {
	alert( "The \"TopGear.com Region Free Videos\" Greasemonkey script needs the @require attribute to work. Your browser's partial implementation of it doesn't support it." );
}

// Script update checker by Jarett
// http://userscripts.org/scripts/show/20145
var SUC_script_num = 50444;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}