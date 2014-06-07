// JoelOnSoftware forums
// version 0.2
// 2005-11-02
// Copyright (c) 2005, Baruch Even
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JoelOnSoftware Forum", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JoelOnSoftware Forum
// @description   Add features to JoelOnSoftware forums
// @include       http://discuss.joelonsoftware.com/*
// @include       http://discuss.fogcreek.com/*
// ==/UserScript==

var VersionStr = "0.1";

function trim(sInString)
{
	if (sInString==null || sInString=="")
	{
		return "";
	}
	sInString = sInString.replace( /^\s+/g, "" );// strip leading
	return sInString.replace( /\s+$/g, "" );// strip trailing
} //End Function

window.mylog = function myLog(obj)
{
  try
  {
    GM_log("JoSforum::: "+obj);
  } 
  catch (exc0)
  {
    try
    {
      var consoleService = Components.classes['@mozilla.org/consoleservice;1']
                    .getService(Components.interfaces.nsIConsoleService);
      consoleService.logStringMessage("JoSforum::: "+obj);
    }
    catch (exc)
    {
    }
  }
}

function xpath(query, inelement)
{
	return document.evaluate(query, inelement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function insertBefore(elem, newelem)
{
	elem.parentNode.insertBefore(newelem, elem);
}

window.untrackTopic = function(idstr, title) {
	// Move it from trackDiv to discussDiv
	var elem = document.getElementById(idstr);
	elem.parentNode.removeChild(elem);
	discussDiv.appendChild(elem);

	// Remember the untrack for the future
	if (GM_setValue) {
		GM_setValue('title_'+title, false);
	}
	
	// Remove the untrack button
	var untrack = document.getElementById('untrack'+idstr);
	if (untrack) {
		untrack.parentNode.removeChild(untrack);
	}
}

window.trackTopic = function(idstr, title) {
	// Move it from discussDiv to trackDiv
	var elem = document.getElementById(idstr);
	elem.parentNode.removeChild(elem);
	trackDiv.appendChild(elem);

	// Remember the choice for the future
	if (GM_setValue) {
		GM_setValue('title_'+title, true);
	}

	// Add an [untrack] button, before the BR
	var untrack = document.createElement('A');
	untrack.setAttribute('id', 'untruck'+idstr);
	untrack.href='javascript:untrackTopic("'+idstr+'", "' + title + '");';
	untrack.appendChild(document.createTextNode('[untrack]'));
	
	// Remove the track button
	var track = document.getElementById('track'+idstr);
	if (track) {
		track.parentNode.removeChild(track);
	}

	var found_br = 0;
	var span_el = elem.firstChild;
	for (; span_el; span_el = span_el.nextSibling) {
		if (span_el.tagName == 'BR') {
			insertBefore(span_el, untrack);
			found_br = 1;
		} 
	}
	
	if (!found_br) {
		elem.appendChild(untrack);
	}
}

function beginTheURLFix()
{
	// Find DIV with class 'discussTopics' and before it enter a new DIV
	var discussTopics = xpath("//DIV[@class='discussTopics']", document);
	if (discussTopics.snapshotLength == 0)
		return;
	
	var discussDiv = discussTopics.snapshotItem(0);
	window.discussDiv = discussDiv;
	
	var trackDiv = document.createElement('DIV')
	window.trackDiv = trackDiv;
//	trackDiv.style.class = 'discussTopics';
	trackDiv.innerHTML = '<p><b>Tracked Topics:</b></p>';
	insertBefore(discussDiv, trackDiv);

	// Insert regular topics header
	var hdr = document.createElement('P');
	hdr.innerHTML = '<b>Regular Topics:</b>';
	insertBefore(discussDiv.firstChild, hdr);
	
	// Replace all Links with a span and do transformations on them as needed
	var idnum = 0;
	var topics = xpath("//A[@class='discuss']", discussDiv);
	for (var i = 0; i < topics.snapshotLength; i++) {
		var idstr = 'span_' + idnum++;
		var elem = topics.snapshotItem(i);
		var next = elem.nextSibling;
		var spanElement = document.createElement('SPAN');
		var title = '';
		spanElement.setAttribute('id', idstr);
		insertBefore(elem, spanElement);

		for (; elem.tagName != 'BR'; elem = next) {
			next = elem.nextSibling;
			elem.parentNode.removeChild(elem);
			if (elem.tagName == 'A') {
				title = elem.firstChild.nodeValue;
			}
			spanElement.appendChild(elem);
		}

		if (title != '' && GM_getValue && GM_getValue('title_' + title, false)) {
			trackTopic(idstr, title);
		} else {
			var add_button = document.createElement('A');
			add_button.setAttribute('id', 'track'+idstr);
			add_button.href='javascript:trackTopic("'+idstr+'", "' + title + '");';
			add_button.appendChild(document.createTextNode('[track]'));
			spanElement.appendChild(add_button);
		}

		// Append the BR element
		next.parentNode.removeChild(next);
		spanElement.appendChild(next);
	}
}

beginTheURLFix();
