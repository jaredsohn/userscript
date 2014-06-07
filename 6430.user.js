// ==UserScript==
// @name		dATitleCleaner
// @namespace		http://hoffer.cx
// @description		Sets a standard "dA: something" title for all deviantART pages
// @include		http://deviantart.com/*
// @include		http://*.deviantart.com/*
// ==/UserScript==

/*
	version:	0.7
	last update:	2008.08.26
	by:		http://rotane.deviantart.com/
	contact:	dATitleCleaner@hoffer.cx
	licence:	Licensed under the GNU General Public License, 
			version 2 (but no later version!)

	This script replaces most titles to a coherent "dA: something" format, 
	excluding pages on dAmn (I suggest using dAmn.extend for that).
	Since dA v6 is still in development, parts of this script will have
	to be updated sooner or later.  
	Feel free to contact me if you find any pages I missed!

	version history:
	v0.7		2008.08.26 - added Activity, Gallery Stats, Pageviews
	v0.6		2008.08.23 - updated for dA v6
	v0.4		2006.09.21 - added Browse and deviant's journal sub-pages
	v0.3		2006.09.04 - added deviant's prints and store pages
	v0.2		2006.09.04 - initial release
	v0.1		2006.08.20 - private testing
	
	todo:
	gallery management
*/

t = document.title;
u = window.location.href;

if	(t.indexOf("\'s Forums") > 1) {
	document.title = t.substring(12);
	document.title = 'dA: ' + document.title.replace("\'s Forums", ": Forums");
}

else if (t.indexOf('on deviantART') > 1) {
	document.title = 'dA: ' + t.replace(' on deviantART', '');
}

else if (t.indexOf("\'s deviantART gallery") > 1) {
	document.title = 'dA: ' + t.replace("\'s deviantART gallery", ": Gallery");
}

else if (t.indexOf("\'s deviantART favourites") > 1) {
	document.title = 'dA: ' + t.replace("\'s deviantART favourites", ": Favourites");
}

else if (t.indexOf("\'s deviantART Journal") > 1) {
	document.title = 'dA: ' + t.replace("\'s deviantART Journal", ": Journal");
}

else if (t.indexOf("\'s deviantART Forum") > 1) {
	document.title = 'dA: ' + t.replace("\'s deviantART Forum", ": Forum");
}

else if (t.indexOf("\'s Activity") > 1) {
	document.title = 'dA: ' + t.replace("\'s Activity", ": Activity");
}

else if (t.indexOf("\'s Pageviews") > 1) {
	x = t.replace("\'s Pageviews", ": Pageviews");
	document.title = x.replace("deviantART", "dA");
}

else if (t.indexOf("\'s Gallery Stats") > 1) {
	x = t.replace("\'s Gallery Stats", ": Gallery Stats");
	document.title = x.replace("deviantART", "dA");
}

else if (t.indexOf("\'s Polls") > 1) {
	x = t.replace("\'s Polls", ": Polls");
	document.title = x.replace("deviantART", "dA");
}

else if	(t.indexOf('News: ') == 0) {
	document.title = 'dA: News: ' + t.substring(6);
}

else if (t.indexOf('Browse deviantART') == 0) {
	document.title = t.replace('Browse deviantART', 'dA: Browse');
}

else if	(u.indexOf('.deviantart.com\/prints\/') > 1 && u.substr(0,7) == 'http:\/\/') {
	document.title = u.substring(7);
	document.title = 'dA: ' + document.title.replace(".deviantart.com\/prints\/", ": Prints");
}

else if	(u.indexOf('.deviantart.com\/store\/') > 1 && u.substr(0,7) == 'http:\/\/') {
	document.title = u.substring(7);
	document.title = 'dA: ' + document.title.replace(".deviantart.com\/store\/", ": Store");
}

else if (t.indexOf('Your Journal') == 0) {
	document.title = t.replace('Your Journal', 'dA: Journal');
}

else if (t.indexOf('Your Journal Enhancements') == 0) {
	document.title = t.replace('Your Journal Enhancements', 'dA: Journal Enhancements');
}

else if (t.indexOf('Favourites for ') == 0) {
	document.title = t.replace('Favourites for ', 'dA: ') + ': Favourites';
}

else if	(t.indexOf('deviantART: ') == 0) {
	document.title = 'dA: ' + t.substring(12);
}

else if (t.indexOf('deviantART ') == 0) {
	document.title = 'dA: ' + t.substring(11);
}