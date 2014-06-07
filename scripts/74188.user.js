// ==UserScript==
// @name           Ubuntu Countdown
// @namespace      http://userscripts.org/users/127886
// @description    Add a countdown for the next Ubuntu release to the Google Search page
// @include        http://www.google.com/*
// @include        http://google.com/*
// @include        http://www.google.no/*
// @include        http://google.no/*
// ==/UserScript==

var d = new Date();
dom = d.getDate();
month = d.getMonth();
year = d.getYear();
if (year < 2000) year = year - 100;
else year = year - 2000;

if (year == 10 && month == 3)
	days = 29 - dom;
else
	days = 0;
if (days < 0) days = 0;
if (days < 10) days = '0' + days.toString();

var base = 'http://www.ubuntu.com/files/countdown/1004/countdown-10.04-1/';

var img = document.createElement('img');
img.width = "180";
img.height = "150";
img.border = "0";

//if (days > 0) {
	img.id = "countdownimage";
	img.alt = "Ubuntu 10.04 LTS - Coming soon";
	img.src = base+days+'.png';
/*} else {
	img.id = "ubuntucountdownimage";
	img.src = base+'here.png';
	img.alt = "Ubuntu 10.04 LTS is here";
}*/

var logo = document.getElementById('logo');
logo.parentNode.replaceChild(img, logo);

// Script Update Checker by Jarett
// http://userscripts.org/scripts/show/20145
var SUC_script_num = 74188; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}