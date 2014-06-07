// ==UserScript==
// @name           GMail FavIcon Alerts
// @description    Updates the "Favorites Icon" for the tab in which Gmail is loaded when you have new mail or new chat messages.
// @source         http://userscripts.org/scripts/show/8354
// @identifier     http://userscripts.org/scripts/source/8354.user.js
// @version        1.1.0
// @date           2007-04-06
// @author         David Alan Schoonover
// @namespace      http://www.ascetics.net
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/mail*
// ==/UserScript==

/* Register Preferences
 * --------------------------
 */

var host = "http://www.ascetics.net/dev/greasemonkey/gmailfaviconalerts/",
	chatEnabled = true;

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
} else {
	chatEnabled = false || GM_getValue('chatEnabled', chatEnabled);
	GM_registerMenuCommand( "Gmail FavIcon Alerts > Toggle Chat Alerts", function() {setChat(!chatEnabled);} );
	GM_registerMenuCommand( "Gmail FavIcon Alerts > Chat Alerts On", function() {setChat(true);} );
	GM_registerMenuCommand( "Gmail FavIcon Alerts > Chat Alerts Off", function() {setChat(false);} );
	// GM_registerMenuCommand( "Gmail FavIcon Alerts > Post Bug!", sendBug);
}

function setChat(b) {
	GM_setValue('chatEnabled', chatEnabled = b);
}

function sendBug() {
	var emailTo = 'david.schoonover@gmail.com',
	emailSubject = '[GMailFavIcon Bug]',
	emailBody = "Mind answering a few questions? At what URL did the bug occur? What other GreaseMonkey scripts were running on the page? Then, please Describe the nasty Bug! Thanks!",
	mailLink = "https://mail.google.com/mail?view=cm&tf=0" + 
		(emailTo ? ("&to=" + emailTo) : "") + 
		(emailSubject ? ("&su=" + emailSubject) : "") +
		(emailBody ? ("&body=" + emailBody) : "");
	window.open(mailLink);
}

/* Script
 * --------------------------
 */

var chatMsg = false, counter = 0,
	head = document.getElementsByTagName("head")[0],
	blue = host + "gmblue_ico.png",
	red = host + "gmred_ico.png",
	orange = host + "gmorange_ico.png",
	new_mail = "Gmail - Inbox (", no_new_mail = "Gmail - Inbox",
	icons = [red, orange];

function setIcon(url) {
	var links = head.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++)
		if (links[i].type == "image/x-icon" && 
		   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
		   links[i].href != url)
			head.removeChild(links[i]);
		else if(links[i].href == url)
			return;
	
	var newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = url;
	head.appendChild(newIcon);
}

function toggleIcon() {
	chatMsg = !chatMsg;
	setIcon(icons[chatMsg + 0]);
}

function newMail(title,test) {
	if(test)
		return title.slice(0,15) == new_mail;
	else
		return title == no_new_mail;
}

function poll() {
	var t = document.title;
	
	// Reset the icon based on mail status
	if (newMail(t,true))
		icons[0] = blue;
	else if (newMail(t,false))
		icons[0] = red;
	
	// Only change icon if we haven't passed control off to the blinking icon
	if(!chatMsg) 
	
		// Blink the icon, we have a chat (Title reads, "Some Dumbass says...")
		if (chatEnabled && t.slice(0,5) != "Gmail") {
			toggleIcon();
			setTimeout(toggleIcon,2000);
	
		// Otherwise, update the newMail icon
		} else 
			setIcon(icons[0]);
}

var timer = setInterval(poll,500);