// ==UserScript==
// @name           Bootleggers Quick Links
// @namespace      http://
// @include        http://www.bootleggers.us/*
// @exclude        http://www.bootleggers.us/index.php
// @exclude        http://www.bootleggers.us/
// @exclude        http://www.bootleggers.us/checkuser.php
// @exclude        http://www.bootleggers.us/faqOther.php*
// @exclude        http://www.bootleggers.us/login.php*
// @exclude        http://www.bootleggers.us/logout.php*
// ==/UserScript==

// Update checker - http://userscripts.org/scripts/show/20145
var SUC_script_num = 75417;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

if ( top.location.href == location.href ) {
	var urls = new Array();
	var titles = new Array();
	var links = new Array();

	urls[0] = "http://www.altrozero.co.uk/boot/";
	urls[1] = "http://www.bootcrews.com/";
	urls[2] = "http://www.blhelp.com/";
	urls[3] = "http://illegitimi.net/other/bootleggers/";
	urls[4] = "http://www.imageshack.com/";
	urls[5] = "http://www.tinypic.com/";
	urls[6] = "http://www.photobucket.com/";
	urls[7] = "http://userscripts.org/users/140312/scripts";

	titles[0] = "Altrozero";
	titles[1] = "Bootcrews";
	titles[2] = "BLHelp";
	titles[3] = "Illegitimi.net";
	titles[4] = "ImageShack";
	titles[5] = "TinyPic";
	titles[6] = "PhotoBucket";
	titles[7] = "Sky's User Scripts";

	if ( urls.length == titles.length ) {
		for ( i = 0; i < urls.length; i++ ) {
			links[i] = '<a href="' + urls[i] + '" title="' + urls[i] + '" target="_blank">' + titles[i] + '</a>';
		}
	}

	if ( links.length == urls.length ) {
		document.getElementsByTagName('td')[6].style.fontSize = '9px';
		document.getElementsByTagName('td')[6].style.borderBottom = '1px solid #b1a89b';
		document.getElementsByTagName('td')[6].innerHTML = '<b>Quick links:</b> ' + links.join(' | ');
	}
}