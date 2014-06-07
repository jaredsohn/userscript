// ==UserScript==
// @name           HBO Time Adjuster
// @namespace      http://scr.im/2041
// @description    Adjusts the time on HBO (forums for now) to account for your time zone and server inaccuracy.
// @require		   http://datejs.googlecode.com/svn/trunk/build/date-en-US.js
// @require        http://userscripts.org/scripts/source/45988.user.js
// @include        http://*.bungie.org/*
// @version        1.5
//
// @copyright 	   2011+, Arithmomaniac (http://scr.im/2041)
// @license		   MPL 1.1+ / GPL 2.0+ / LGPL 2.1+ / CC BY-SA 3.0+ US
// @license		   GNU Lesser General Public License 2.1+; http://www.gnu.org/licenses/lgpl.html
// @license		   Mozilla Public License 1.1+ ; http://www.mozilla.org/MPL/
// @license		   GNU General Public License 2.0+; http://www.gnu.org/licenses/gpl.html
// @license		   Creative Commons Attribution-Noncommercial 3.0+ United States License; http://creativecommons.org/licenses/by-sa/3.0/us/
// ==/UserScript==

/*
VERSION HISTORY
1.5		(6/02/2011)
	-	Added news-post and archive time adjustment
1.1		(5/30/2011)
	-	Initial flag for early cookie reset
1.0.1  (5/12/2011)
    -  Fixed regex, date bugs
1.0		(5/11/2011)
	-	initial release
*/

//menu and about/config autobuilder. from the 45988 file.
USP.theScriptName = 'HBO Time Adjuster';
USP.init(
         {theName:'timeDiff', theText:'Time Differential', theDefault:0},
		 {theName:'autoUpdate', theText:'Automatically set time with post previews', theDefault: true},
		 {theName:'minReset', theText:'Minutes until timing cookie force-reset (-1 for off)', theDefault: -1}
    );
GM_registerMenuCommand('Preferences for '+ USP.theScriptName, USP.invoke);

//-------------

//creates array of matching xPath items.
function getElementsByXPath(obj, xPathString) 
{
	var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var xPathPattern = [];
	for (var i = 0; i < xPathSnapshot.snapshotLength; i++)
	{
		xPathPattern[i] = xPathSnapshot.snapshotItem(i); //convert snapshot to node
	}
	return xPathPattern;
}

var url = window.location;

//-------------cookie harvesting (for future use)
if (url.href.match(/http:\/\/carnage\.bungie\.org\/haloforum\/halo\.forum\.pl\??.*/))
{
var cookieText = unescape(document.cookie).match(/\&m1.*/)[0].replace(/\&/g, '\n').replace(/::/g, '\t');
	var realTime = Math.floor(parseInt(Date.now()) / 1000);
	var cookieTime = cookieText.match(/ts\t(\d+)/)[1];
	var resetTime = cookieText.match(/v2\t(\d+)/)[1];
}


//--------forum page time adjustment
if ( 
url.href.match(/http:\/\/carnage\.bungie\.org\/haloforum\/halo\.forum\.pl\??.*/) ||
url.href.match(/http:\/\/forums.bungie.org\/halo\/archive\d*\.pl\?.*/) ||
url.href.match(/http:\/\/library\.bungie\.org\/cgi-bin\/SearchResults\.pl\?.*/)
){
	//----grab time differential from post previews------
	if (GM_getValue('autoUpdate') && //auto-change
		window.location.href.match(/http:\/\/carnage\.bungie\.org\/haloforum\/halo\.forum\.pl\?post/) && 
		getElementsByXPath(document, '//div[@id="glob_header"]/h3[text()="Message Preview"]').length){ //in preview page
			var forumCurr = Date.parse(getElementsByXPath(document,'//span[@class="msg_date"]')[0].innerHTML);
			var localTime = new Date(Date.now()) //time on server
			localTime.addSeconds(-3).set({millisecond: 0, second: 0}); //round off to last minute; account for gap between server post and page load
			var minGap = (localTime-forumCurr)/60000 //minute difference
			GM_setValue('timeDiff', minGap) //save for future
	}

	//------function to change time value----------
	function dateAdjust(str){ //adjust a string
		dateObj = Date.parse(str);
		if (dateObj){ //is a date
			dateObj.addMinutes(GM_getValue('timeDiff') || 0); //change time
			return dateObj.toString('M/d/yy h:mm tt').toLowerCase(); //zap back to forums string format
		}
		else {return str} //if bogus date, leave as is
	}

	//------crawl through page, change dates-----------
	dateString = /([3-9]|1?[0-2])\/([12]?[0-9]|3[01])\/\d\d (?:[3-9]|1?[0-2]):[0-5][0-9] [ap]\.?m\.?/g;
	document.body.innerHTML = document.body.innerHTML.replace(dateString, dateAdjust); //replaces all date instances in text

}

//--------front page time adjustment
if (
url.href.match(/http:\/\/(halo|nikon).bungie.org\/(news[\w]*\.html.*)?/)
){
	function UTCReplace(str, p1, p2, p3, p4, p5, p6){ //reads UTC time, spits out local date
		theDate = new Date(Date.UTC(p3, p1-1 , p2, p4, p5, p6))		 
		return theDate.toString('M/dd hh:mm:ss')
	}

	UTCRegex = /(?:[01]\d|2[0-3])(?:\:[0-5][0-9]){2} <a href=\"http:\/\/www\.timeanddate\.com\/worldclock\/fixedtime\.html\?month=(\d\d?)&amp;day=(\d\d?)&amp;year=(\d{4})&amp;hour=(\d\d?)&amp;min=(\d\d?)&amp;sec=(\d\d?)&amp;p1=0\">UTC<\/a>/ig //UTC dates on news posts
	document.body.innerHTML = document.body.innerHTML.replace(UTCRegex, UTCReplace) //replace

}

