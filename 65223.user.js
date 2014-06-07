// 1-click cl spam flagger
// version 0.2 beta!
// 2010-10-26
// copyright (c) 2010-2011, blckshp
// released under the gpl license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// this is a greasemonkey user script.  to install it, you need
// greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// then restart firefox and revisit this script.
// under tools, there will be a new menu item to "install user script".
// accept the default configuration and install.
//
// to uninstall, go to tools/manage user scripts,
// select "1-click cl spam flagger", and click uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          1-click cl spam flagger
// @namespace     http://blckshp.org/
// @description   script that adds a quick way to make dragonflies.
// @include       https://*.craigslist.org/*
// ==/UserScript==

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
this started as a really simple concept that i wanted to prove as well as get some more dom and regex under my belt.
user functionality i wanted to achieve is simple too, simply point at the crosshairs (+) next to a spammy post and
click to flag as spam. this script is currently in a very crude state. i hope to implement a dom solution in place
of regular expressions, and perhaps forgo the iframe altogether. i derived some of this script's contents from
others like aaron boodman and ryan stille.

the only other thing that needs to be said is, i don't even know if it works due to the site's arrangement and flagging policies! :D

ver. 0.2     2010-10-26     changed function, expression and variables to reflect new name.
ver. 0.1     2009-12-23     implementation
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var regex = new RegExp(/forumID=\d+/);
var forumID = regex.exec(window.location.href);
var getIds = xpath('//table[@class="fbod threads"]//a[@href]');
var domain = window.location.hostname;
var thisId;

if (forumID){
	for (var i = 0; i < getIds.snapshotLength; i++) {
		thisId = getIds.snapshotItem(i);	
		regex = new RegExp(/ID=\d+/);
		var ID = regex.exec(thisId.href);

		if (ID){
			var genLink = document.createElement('a');

			genLink.href = threadToFlag(ID, forumID);
			genLink.className = 'crosshairs';
			genLink.target = "flagframe";	//Opens to blank frame
			genLink.setAttribute("onclick", flagPost(ID,forumID));	
			var genContent = document.createTextNode('\u00A0(+)');
			genLink.appendChild(genContent);
			thisId.parentNode.insertBefore(genLink, thisId.nextSibling);
		}
	}
}


addGlobalStyle('a.crosshairs { color:#CC6600; font-weight:bold; text-decoration:none;}');
addGlobalStyle('a.crosshairs:visited { color:red; font-weight:bold; text-decoration:none;}');

var rFrame = new RegExp(/act=DF/);

if( rFrame.exec(window.location.href) ) {
	//this iframe is so we can view if crosshairs has been visited
	flagframe = document.createElement("iframe");
	// start the iframe on the home page.
	flagframe.src = "http://"+domain+"/";
	flagframe.setAttribute("name", "flagframe");
	flagframe.setAttribute("id", "flagframe");
	flagframe.style.visibility="hidden";

	window.parent.parent.frames['1'].document.body.appendChild(flagframe);
}

function threadToFlag(threadID, forum) {
	var flaggedThread = "?act=flag&"+threadID+"&"+forum;
	return flaggedThread;
}

function flagPost(threadID, forum){
	genLink.addEventListener("click", function() {	
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: "http://"+domain+"/forums/?act=flag&"+ threadID + '&' + forum,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		    onload: function(responseDetails) {
				var nonceregexp = new RegExp(/(?:nonce\"\svalue=\")(.*)(?=\"\>)/);
		        var noncearray = nonceregexp.exec(responseDetails.responseText);

//http://www.catonmat.net/blog/wp-content/uploads/2009/12/yo-dawg-regex.jpg

				window.open("?act=flag&"+ threadID + "&" + forum + "&mode=''&nonce=" + noncearray[1] + "&flagType=spam&note=''","R");
		    }
		});
		
	}, false);

}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}