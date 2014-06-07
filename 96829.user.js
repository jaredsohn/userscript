// ==UserScript==
// @name           TheWest chat report linkifier
// @namespace      armeagle.nl
// @description    Will convert [report] tags in chat into links as viewed in telegrams
// @include        http://*.the-west.*/game.php*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/96829.meta.js
// @version        0.02
// ==/UserScript==


/* Converts from
 *   [report=11111111222aa222aa]Duel: Jupiter vs. Zeus[/report]
 * to
 *   <a href="javascript:parent.Reports.show(11111111, '222aa222aa');" class="public_report_link">[Duel: Jupiter vs. Zeus]</a>
 */
 
var win = window;
if ( unsafeWindow ) {
	win = unsafeWindow;
}
// hook into the addTextLine function by replacing it and calling it later again.
win.chatcontrol._addTextLine = win.chatcontrol.addTextLine;

win.chatcontrol.addTextLine = function(channel, message) {
	// get all [report...[/report] strings
	var matches = message.match(/\[report=[^\]]+\][^\[]+\[\/report\]/g);
	// loop over all these strings, creating the link as we want it and replace the original tagged version in the source string with the new version (string.replace only replaces first occurance).
	if ( matches != null ) {
		for ( match_ind = 0; match_ind < matches.length; match_ind++ ) {
			// a matched tagged string
			var match = matches[match_ind];
			// clean up the string by removing the report open and close tags, but keep the id and message (thus also the closing bracket ']' of the opening [report..] tag
			var n_str = match.replace('[report=','').replace('[/report]','');
			// get the id part of the string (which will have to be split up later)
			var rep_ids = n_str.match(/[^\]]+/)[0];
			// get the message part based on the string lengths of the id and match strings
			var rep_msg = n_str.substring(rep_ids.length+1, n_str.length);
			// now split up the id string into the two needed ids. Apparently the first part is 8 digits long and has to be turned into an integer. The second part is 10 characters long. But this could change later (TODO).
			var rep_id1 = parseInt(rep_ids.substring(0, rep_ids.length-10));
			var rep_id2 = rep_ids.substring(rep_ids.length-10, rep_ids.length+1);
			// and now replace the tagged string with the linkified version
			message = message.replace(match, '<a href="javascript:parent.Reports.show('+ rep_id1 +', \''+ rep_id2 +'\');" class="public_report_link">['+ rep_msg +']</a>');
		}
	}
	// call base function with the modified message string
	win.chatcontrol._addTextLine(channel, message);
}
