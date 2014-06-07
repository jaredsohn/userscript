// ==UserScript==
// @name           StopForumSpam.com Links for Forums
// @namespace      trparky
// @description    This script modifies the page and presents a link to StopForumSpam for IP and email addresses as well as links for usernames.
// @include        */index.php?action=profile;u=*
// @include        */index.php?action=profile&u=*
// @include        */index.php?action=profile%3Bu=*
// @include        */adm/index.php?i=users&mode=overview*
// @include        */index.php?action=httpBL*
// ==/UserScript==

// ChangeLog from Version 1.05 to 1.06
// Fixed the script so that it would work on the MOD httpBL pages
// of Simple Machines forums.  This involved adding another
// @include line in the top script header.

(function () {
	version = "1.07";

	// Gets the contents of the web page's body and stores it in a variable for working with the data later
	documentBody = document.body.innerHTML;

	// If the browser is Google Chrome and the page contains evidence of the Google
	// Chrome Roboform Toolbar extension installed, this code is executed to fix a 
	// conflict with this script and the Google Chrome Roboform Toolbar extension.
	if ( (/roboform-adapter/i.test(documentBody)) && (/Chrome/i.test(navigator.userAgent)) ) {
		documentBody = documentBody.replace(/ sourceindex="[0-9]+"/ig, "");
	}

	// Now we start working with the HTML code in the documentBody variable using a series of Regular Expression replacement statements

	// For IP Addresses on Simple Machine Forums AND phpBB Forums
	documentBody = documentBody.replace(/<a href="(.{20,})">([\d.]{6,})<\/a>/g, '<a href="$1">$2</a><br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$2" target="_new_window">StopForumSpam.com Report for "$2"</a>)</small>');
	
	// Tests to see if we are going to be working with a phpBB powered forum
	if (/http:\/\/www\.phpbb\.com/i.test(documentBody)) {
		// For Email Addresses
		documentBody = documentBody.replace(/<input class="text medium" id="user_email" name="user_email" value="([\w!#$%&'*+.\/=?`{|}~^\-]+@[\d.A-Za-z\-]+\.[A-Za-z]{2,6})" type="text">/g, '<input class="text medium" id="user_email" name="user_email" value="$1" type="text"><br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$1" target="_new_window">StopForumSpam.com Report for "$1"</a>)</small>');
		
		// For usernames
		documentBody = documentBody.replace(/<input id="user" name="user" value="(.{2,})" type="text">/ig, '<input id="user" name="user" value="$1" type="text"><br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$1" target="_new_window">StopForumSpam.com Report for "$1"</a>)</small>');
		documentBody = documentBody.replace(/<h1>User administration :: (.{2,})<\/h1>/ig, '<h1>User administration :: $1</h1> <small>(<a href="http://www.stopforumspam.com/search.php?q=$1" target="_new_window">StopForumSpam.com Report for "$1"</a>)</small>');
		
		// Adds a line on the bottom of the page
		documentBody = documentBody.replace(/(Powered by phpBB.{5,}<a href="http:\/\/www\.phpbb\.com\/">phpBB Group<\/a>)/ig, '$1. StopForumSpam.com links added by <a href="http://userscripts.org/scripts/show/95269" target="_new_window">StopForumSpam.com Links for Forums Version ' + version + '</a>.');
	}
	// Tests to see if we are going to be working with a Simple Machines powered forum
	else if (/Powered by SMF/i.test(documentBody)) {
		// For Email Addresses
		documentBody = documentBody.replace(/<a href="(mailto:[\d!#$%&'*+.\/=?_`a-z{|}~^\-]+@[\d.a-z\-]+\.[a-z]{2,6})">([\d!#$%&'*+.\/=?_`a-z{|}~^\-]+@[\d.a-z\-]+\.[a-z]{2,6})<\/a>/ig, '<a href="$1">$2</a><br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$2" target="_new_window">StopForumSpam.com Report for "$2"</a>)</small>');
		
		// For usernames
		documentBody = documentBody.replace(/(<tr>\n\t\t\t\t\t<td><b>Name: <\/b><\/td>\n\t\t\t\t\t<td>)(.+)(<\/td>)/ig, '$1$2<br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$2" target="_new_window">StopForumSpam.com Report for "$2"</a>)</small>$3');
		//documentBody = documentBody.replace(/(Summary - )(.{9})(\n\t\t<\/td>)/ig, '$1$2 <small>(<a href="http://www.stopforumspam.com/search.php?q=$2" target="_new_window">StopForumSpam.com Report for "$2"</a>)</small>$3');
		
		// Applies StopForumSpam.com to IP addresses on the HTTPbl log page
		documentBody = documentBody.replace(/<a href="(.{20,})"><strong>([\d.]{2,})<\/strong><\/a><\/td>/ig, '<a href="$1"><strong>$2</strong></a><br /><small>(<a href="http://www.stopforumspam.com/search.php?q=$2" target="_new_window">StopForumSpam.com Report</a>)</small></td>');
		
		// Makes the profile information table larger to accomidate our StopForumSpam.com links
		documentBody = documentBody.replace(/<td class="windowbg" width="420">/ig, '<td class="windowbg" width="720">');
		
		// Adds a line on the bottom of the page
		documentBody = documentBody.replace(/(<a href="http:\/\/www\.simplemachines\.org\/" title="Simple Machines Forum" target="_blank">Powered by SMF .{5,}<\/a> \| )/ig, '$1StopForumSpam.com links added by <a href="http://userscripts.org/scripts/show/95269" target="_new_window">StopForumSpam.com Links for Forums Version ' + version + '</a>. | ');
	}
	
	// HTML manipulation is complete.
	
	// Puts the modified HTML code back into the browser's document body
	document.body.innerHTML = documentBody;
})();