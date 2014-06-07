// ==UserScript==
// @name           MySpace Homepage Handler
// @description    Blocks ads on your MySpace home, and has a few commands. This was made with the minimalist theme, so do not be surprised if it looks odd on your theme.
// @namespace      http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
// @include        http://home.myspace.com/index.cfm?fuseaction=user&*
// ==/UserScript==

/* 
 * Made by Eric Carr, http://www.myspace.com/superjapanfreak
 * Script notes:
 * Not all abbreviated functions are by me, $() for example.
 * Has good things that users might like :D
 * Keep in mind that I'm 15, I'm not a super-dev, moreover a nooby code-monkey.
 * Report bugs to the comments of the script page, or message WHILE i'm online on myspace.
 * === CHANGELOG ===
 * June 19 2008
 *      Added View Options
 *      Added Auto-Refresh
 *      Fixed a few bugs
 */



/* 
 * MY NOTES
 * Inherent childNodes[] contains closing and opening tags, e.g. <b> and </b>, as separate members of the
 * array
 */
var customNameText = GM_getValue('custom_name');
var autoRefreshRate = GM_getValue('refresh_rate');
var userNamePrompt, autoRefreshPrompt;
var refreshInterval;


// Important functions




function $(elementid) {
return document.getElementById(elementid);
}


function removeElement(elementId) { if (document.getElementById(elementId)) { document.getElementById(elementId).setAttribute('style','display:none'); return true; } else { return false; } }
// My Important Self-mades
function removeElementChild(elementId, child) { if (document.getElementById(elementId) && document.getElementById(elementId).childNodes[child]) { document.getElementById(elementId).childNodes[child].setAttribute('style','display:none'); return true; } else { return false; } }
// end importants



// Register Menu Commands

GM_registerMenuCommand("Set Auto-Refresh", setAutoRefresh, 'r', 'accel', 'r');
GM_registerMenuCommand("Set Custom Name", setCustomUserName, 'u', 'accel', 'u');
GM_registerMenuCommand("View Options", viewOptions, 'o', 'accel', 'o');

// User Command Functions


function setCustomUserName() 
{
userNamePrompt = prompt("Enter your custom user name. Leave blank to keep your normal name.");
if (userNamePrompt == "" || userNamePrompt == null) GM_setValue('custom_name', '');
else {GM_setValue('custom_name', userNamePrompt);window.location.reload();}
}

function setAutoRefresh() 
{
autoRefreshPrompt = prompt("Enter your refresh rate in seconds, leave as nothing, cancel, or leave as 0 to turn it off.");
if (autoRefreshPrompt == "" || autoRefreshPrompt == null) {GM_setValue('refresh_rate', -1);window.location.reload();}
else {try { GM_setValue('refresh_rate', parseInt(autoRefreshPrompt)); } catch (e) { alert("Your input was not valid."); GM_setValue('refresh_rate', -1); } finally { window.location.reload(); } }
}

function viewOptions() 
{
if (customNameText == "" && (autoRefreshRate == -1 || autoRefreshRate == null || autoRefreshRate == 0)) 			// Both custom name and refresh unset
	alert("\t\t\tYour Options:\n\nCustom Name: <UNSET>\nRefresh Rate: <UNSET>");
else if (customNameText == "" && (autoRefreshRate != -1 || autoRefreshRate != null || autoRefreshRate != 0)) 			// Custom Unset and refresh is set
	alert("\t\t\tYour Options:\n\nCustom Name: <UNSET>\nRefresh Rate: "+autoRefreshRate+" seconds");
else if (customNameText != "" && (autoRefreshRate == -1 || autoRefreshRate == null || autoRefreshRate == 0)) 			// Custom set, refresh unset
	alert("\t\t\tYour Options:\n\nCustom Name: "+customNameText.toString()+"\nRefresh Rate: <UNSET>");
else																// Both set
	alert("\t\t\tYour Options:\n\nCustom Name: "+customNameText.toString()+"\nRefresh Rate: "+autoRefreshRate+" seconds");
}

// Ad removal

	if ($('squareAd'))
		removeElement('squareAd');
	if ($('col3').childNodes[3] && $('col3') != null) // ff3 firebug calls null on the div even though it exists.
		removeElementChild('col3', 3); // For some odd reason, childNode array has no 0th member, access 1st as 1st instead of 1st as 0th.
	if ($('ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs'))
		removeElement('ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs');
	if ($('googleadtest'))
		removeElement('googleadtest');
	if ($('leaderboard'))
		removeElement('leaderboard');

// GM_getValue dependent things.

	if (customNameText != "")
		$('welcome').childNodes[4].textContent = customNameText + "!";
	if (autoRefreshRate != "" && autoRefreshRate != null && autoRefreshRate != -1)
			refreshInterval = window.setTimeout(function k() { window.location.reload();}, (autoRefreshRate*1000));
			
// Annoying Things Removal
	if ($('tomannouncement'))
		removeElement('tomannouncement'); // Myspace Announcement