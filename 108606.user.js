// ==UserScript==
// @id             yt-link-cleaner@uglyhorst.de
// @name           YouTube Link Cleaner
// @namespace      http://uglyhorst.de
// @author         derula
// @developer      3ICE
// @contributor    Mewes Kochheim
// @version        1.10
// @description    Removes some annoying extra parameters from YouTube video links.
// @match          http://*/*
// @match          https://*/*
// @run-at         document-start
// ==/UserScript==

// Script is based on 3ICE's Youtube Link Optimizer / Cleaner / Shortener / Tracking Remover.
// Original script is at: http://userscripts.org/scripts/show/86758

/**
 * parseQueryString
 * @author derula
 * @description This function parses a query string and returns an "associative array".
 * @param {string} qs (A query string including question mark.)
 * @return {array} o An object with the GET parameters as properties.
 * @throws Error if s is not a valid query string.
 */
function parseQueryString(qs) {
	// Require the string to start with a ? for safety.
	if (qs.charAt(0) != '?') throw "Invalid query string";
	
	// Remove the ? and separate the individual parameters.
	qs = qs.slice(1);
	qs = qs.split('&');
	
	// Initialize the variable that will hold the parameters.
	var o = new Object();

	// Separate keys from values
	for (i=0; i<qs.length; i++) {
		// Split by = separator
		qs[i] = qs[i].split('=');
		// Use first as key and re-join the others
		o[qs[i].shift()] = qs[i].join("=");
	}
	return o;
}

/**
 * makeQueryString
 * @author derula
 * @description This function creates a query string out of an "associative array".
 * @param {string} o (An object whose properties are the GET variables)
 * @return {array} qs A query string including the question mark.
 */
function makeQueryString(o) {
	// Nothing much to say here. I'm just writing this comment because I'm getting paid per line of code.
	// Wait, I'm not getting paid at all... FFFFFUUUUUUUUU-
	var qs = '';
	for (key in o) qs += '&' + key + '=' + o[key];
	return qs.replace('&', '?');
}

/**
 * cleanURL
 * @author 3ICE, derula
 * @description This function removes annoying parameters from a YouTube URL.
 * @param {string} s (What to clean.)
 * @return {string} s The cleaned URL.
 */
function cleanURL(s) {
	// Retrieve and parse the query string or abort if none present.
	query_pos = s.indexOf('?');
	if (query_pos == -1) return s;
	anchor_pos = s.indexOf('#');
	if (anchor_pos == -1)
		query_string = s.slice(query_pos);
	else
		query_string = s.slice(query_pos, anchor_pos);
	if (query_string.length == 0) return s;
	queries = parseQueryString(query_string);
	
	// Delete all the nasties ranch2thedressing mentioned and instantly resolves redirect links.
	// (Yay for for-case paradigm! If you know a better way to do this, let me know.)
	for (key in queries) {
		switch (key.toLowerCase()) {
			case 'feature': case 'aq': case 'blend': case 'suggested_categories':
			case 'lclk': case 'gclid': case 'kw': case 'eurl': case 'context':
			case 'annotation_id': case 'src_vid':
				delete queries[key];
				break;
			case 'nr':
				if (queries[key] == '1') delete queries[key];
				break;
			case 'redirect': return queries[key];
		}
	}
	
	// Insert the new query back into the link.
	return s.replace(query_string, makeQueryString(queries));
}

// Prepare the YouTube regex for later reuse.
const yt_regex = /^https?:\/\/([a-z\d]+\.)?youtube\.com\//;
// Determine if the current site is YouTube.
const on_youtube = yt_regex.test(window.location.href);

/**
 * isYouTubeLink
 * @author derula
 * @description This function determines if the passed link is a youtube link.
 */
function isYouTubeLink(s) {
	return ((on_youtube && s.charAt(0) == '/') || yt_regex.test(s));
}

/**
 * cleanNode
 * @author derula
 * @description This function calls CleanURL on inserted <a> nodes.
 */
function cleanNode(event){
	// Grab all links into an array...
	var links = event.target.getElementsByTagName('a');
	// ...and process them.
	for (var i=0; i<links.length; i++) {
		var s = links[i].href;
		// Clean all YouTube URLs (if we're on YouTube, also accept domain-relative URLs):
		if (isYouTubeLink(s)) links[i].href = cleanURL(s);
	}
}

/**
 * main
 * @authors 3ICE, Mewes Kochheim, derula
 * @description This function makes sure we are on YouTube, cleans document.location,
 *              the document, and registers an EventListener for AJAX.
 */
// Remove parameters from the URL we are at:
if (isYouTubeLink(location.href)) {
	var l = cleanURL(location.href);
	if (l != location.href) location.replace(l);
}

// Clean all links that are on the site from the start:
document.addEventListener("DOMContentLoaded", cleanNode, false);

// But when we click the [Show More], [Page 2], [Load more suggestions] or [1234 videos]
// buttons, YouTube loads new videos for us with AJAX. But those still have the ugly
// parameters like &feature=more_related so we better optimize all links on the page again!
document.addEventListener("DOMNodeInserted", cleanNode, false);