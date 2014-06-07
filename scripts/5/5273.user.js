// ==UserScript==
// @name           No Pop-up Links
// @namespace      http://www.mittineague.com/dev/
// @description    Changes pop-up links to regular links
// @include        *
// @exclude	   http://www.mittineague.com/blog/wp-admin/*
// ==/UserScript==

/*
 * No Pop-up Links -  nopopuplinks.user.js version 1.6
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 *
 * script hosted at http://www.mittineague.com/dev/nopopuplinks.user.js
 * and can be found at http://userscripts.org/scripts/show/5273
 *
 * Change Log
 * version 1.0 - August 23, 2006
 * version 1.1 - August 23, 2006	// added removal of target="_blank"
 * version 1.2 - August 30, 2006	// added removal of scripted pop-ups, added option vars
 * version 1.3 - September 1, 2006	// made "target" "blank" only for frame functionality
 * version 1.4 - September 3, 2006	// added open = null for external scripts
 *					// added form target="_blank"
 * version 1.5 - October 8, 2006	// regex improvement, added '-' and '_'
 * version 1.6 - November 15, 2006	// added (function(){ [CODE] })();
 * 
 * FEEDBACK REQUESTED
 * If anyone using this script finds a pop-up link (other than CSS hide -> display)
 * that is not nullified please leave a comment at http://www.mittineague.com/cont.php
 * 
 * To Do - Restore link functionality to scripted pop-ups
 *
 * This script searches for "window.open" in every anchor
 * It will work for pop-ups in these formats:
 * 	<a href="javascript:window.open ....
 * 	<a href="#" onclick="window.open ....
 *	<a .... target="_blank"
 *
 * The above alone does not prevent scripted pop-ups. That is, those techniques which
 * do not have "window.open" in the link, but rather in a script that's either called
 * from the link or an event handler, such as:
 *	<a href="javascript:functionName ....
 *	<a href="#" onclick="functionName ....
 *	<a class="X ....
 *	Setting this option to "true" - BREAKS LINK - unless URL is in href
 *
 * The link regular expression logic (case-insensitive) is as follows:
 * 	any or no character  ~  followed by
 * 	window.open(' or window.open("  ~  followed by
 * 	http:// or https:// or not  ~  followed by
 * 	www. or not  ~  followed by
 * 	any one or more letters, numbers, forward slashes or periods  ~  up to
 * 	the first character that is a hash, question mark, quote or white-space
 *
 * Note: The link will be stripped of any GET variables or anchor hashes
 *	eg. page.html?var=val will become page.html
 *	page.html#top will become page.html
 *
 *	If the pop-up is attempting to open multiple windows the link will be the first.
 *	eg. window.open{"one.html","","");window.open{"two.html","",""); will become one.html
 *
 *	New functions with "window.open" removed from their content are appended to the body
 *	to over-ride any loaded during onload. - MAY BREAK LINK
 *
 *	nullify_all "true" will over-ride ALL scripted "open"s - MAY BREAK LINK
 *	This is not as defensive as turning off javascript. But it's close.
 *
 *	form_targets "true" prevents form result "_blank"s
 *
 *	*** There are some instances where the use of a pop-up is justified.
 *	eg. instructions for a multi-page form, maps, click for larger image, etc.
 *	This script can be customized by adding sites to the @exclude above
 *	or by setting various PREFERENCE OPTIONS to "false"
 */

(function(){

/* PREFERENCE OPTIONS */
var remove_href_popups = "true"; // <a href="javascript:window.open ....
var remove_event_popups = "true"; // <a href="#" onclick="window.open ....
var remove_target_popups = "true"; // <a .... target="_blank"
var remove_script_popups = "true"; // all "in-page" script pop-ups - MAY BREAK LINK
var nullify_all = "true"; // nullifies open in all scripts (external too) - MAY BREAK LINK
var form_targets = "true"; // for <form .. target="_blank"
/* END OF PREFERENCE OPTIONS */

var allLinks, thisLink, L_att_vals, L_attr;
var allScriptTags, target_string;
var allForms, thisForm, F_att_vals, F_attr;

var expression = /(.)*(window\.open\([\'|\"])(https?\:\/\/)?(www\.)?([-_A-Z0-9\/\.]+[^#|?|\'|\"|\s])*/gi;

allLinks = document.evaluate(
			'//a',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
			);
	for (var i = 0; i < allLinks.snapshotLength; i++)
	{
		thisLink = allLinks.snapshotItem(i);
		L_att_vals = thisLink.attributes;
		for (var j = 0; j < L_att_vals.length; j++)
		{
			L_attr = L_att_vals[j].value;
				if((L_att_vals[j].name == "href") && L_attr.match(expression) && (remove_href_popups == "true"))
			{
				thisLink.setAttribute("href", RegExp.$3 + RegExp.$4 + RegExp.$5);
			}
				if((L_att_vals[j].name != "href") && L_attr.match(expression) && (remove_event_popups == "true"))
			{
				thisLink.setAttribute("href", RegExp.$3 + RegExp.$4 + RegExp.$5);
				thisLink.setAttribute(L_att_vals[j].name, "");
			}
				if((L_att_vals[j].name == "target") && L_attr.match(/_blank/gi) && (remove_target_popups == "true"))
			{
				thisLink.setAttribute(L_att_vals[j].name, "_self");
			}

		}
	}

if(remove_script_popups == "true")
{
allScriptTags = document.evaluate(
			'//script',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
			);
	for (var k = 0; k < allScriptTags.snapshotLength; k++)
	{
		target_string = allScriptTags.snapshotItem(k).innerHTML;
		if(target_string.match(/window\.open/gi))
		{	
			target_string = target_string.replace(/window\.open/gi, "");	
			var new_script_tag = document.createElement('script');
			new_script_tag.setAttribute("type","text/javascript");
			new_script_tag.innerHTML = target_string;
			document.body.appendChild(new_script_tag);
		}
	}
}

if(nullify_all == "true")
{
	var nulling_script_tag = document.createElement('script');
	nulling_script_tag.setAttribute("type","text/javascript");
	nulling_script_tag.innerHTML = "open = null;"
	document.body.appendChild(nulling_script_tag);
}

if(form_targets == "true")
{
allForms = document.evaluate(
			'//form',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
			);
	for (var m = 0; m < allForms.snapshotLength; m++)
	{
		thisForm = allForms.snapshotItem(m);
		F_att_vals = thisForm.attributes;
		for (var n = 0; n < F_att_vals.length; n++)
		{
			F_attr = F_att_vals[n].value;
			if((F_att_vals[n].name == "target") && F_attr.match(/_blank/gi))
			{
				thisForm.setAttribute(F_att_vals[n].name, "_self");
			}
		}
	}
}

})();