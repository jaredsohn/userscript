// ==UserScript==
// @name           vMultiply Plus
// @namespace      http://www.vavar-studio.net/vmultiply
// @description    GreasMonkey Multiply Integration
// @include        http://*.multiply.com
// @include        http://*.multiply.com/
// @exclude        http://*.multiply.com/*
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function generateReply(){
	var obj = find("//div[@id='home_guestbook']//script",XPFirst);
	if (obj != null) {
		obj.innerHTML.search(/replies_count = (\d+)/);
		var guestbookCount = RegExp.$1;
		//guestbookCount--;
		window.location.host.search(/(.*).multiply/);
		var subDomain = RegExp.$1;
		
		var prefix = "http://" + window.location.host + "/item/reply/"+subDomain+":guestbook:1+";
		var suffix = "?xurl=" + window.location;

		var allreplystamp = find("//div[@class='replyboxstamp']",XPList);
		for (var i = 0; i < allreplystamp.snapshotLength; i++) {
			var obj = allreplystamp.snapshotItem(i);
			obj.innerHTML += " <a href='"+ prefix + guestbookCount + suffix +"' >reply</a>";
			guestbookCount--;
			// do something with thisLink
		}
	}
}

function customizeSite(){
		var GM_JQ = document.createElement('script');
	    GM_JQ.innerHTML="toggle_edit_mode();";
	    GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

function editHeadShot(){
		var GM_JQ = document.createElement('script');
	    GM_JQ.innerHTML="window.setTimeout('create_and_show_headshot_form()', 100);";
	    GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}

generateReply();
GM_registerMenuCommand("Customize Site", customizeSite);
GM_registerMenuCommand("Edit Head Shot", editHeadShot);