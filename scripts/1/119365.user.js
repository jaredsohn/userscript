// ==UserScript==
// @name           Block Rivals Users
// @namespace	   http://userscripts.org/scripts/show/119365
// @description    You can block users for REAL that you want to ignore. Replaces ignore with "REALLY ignore", and also allows for unblocking.
// @include        *rivals.com/forum.asp*
// @include        *rivals.com/showmsg.asp*
// @version        0.7
// ==/UserScript==

if (!this.GM_getValues || (this.GM_getValues.toString && this.GM_getValues.toString().indexOf("not supported")>-1)) {
    this.GM_getValues=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValues=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


if (GM_getValues("blockedUserIDs")==null || GM_getValues("blockedUserIDs")=="") {
	GM_setValues("blockedUserIDs","999999999")
};

if (GM_getValues("blockedThreadIDs")==null || GM_getValues("blockedThreadIDs")=="") {
	GM_setValues("blockedThreadIDs","9999999999999")
};

blockedUserIDs = GM_getValues("blockedUserIDs")
blockedThreadIDs = "9999999999"

function blockUser(thisUserID) {
	GM_setValues("blockedUserIDs", blockedUserIDs + "|" + thisUserID)
		
}

function blockThread(thisThreadID) {
//	alert(thisThreadID)
	if (blockedThreadIDs.indexOf(thisThreadID)==-1) {
		blockedThreadIDs += "|tid=" + thisThreadID
	//	alert("This Thread: "+thisThreadID)
	//	alert("All Threads:" +blockedThreadIDs)
	}
}

function unblockUser(thisUserID) {
	GM_setValues("blockedUserIDs", blockedUserIDs.replace("|" + thisUserID,""))
	
}

//Debuggging
//blockedUserIDs = "2258097"
if (blockedUserIDs==null) {blockedUserIDs="99999999"}
var userRegExp = new RegExp(blockedUserIDs);
var ignoredUserNamesInThread = "firstname"

//Store user names in this thread for later deletion if they're quoted

if (window.location.href.indexOf("showmsg.asp")!==-1) {
	
	allElements = document.evaluate(
	 '//a',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	for (var i = 0; i < allElements.snapshotLength; i++) {
		thisElement = allElements.snapshotItem(i);
		if (thisElement.href.indexOf("window.open")!==-1 && thisElement.href.indexOf("User=")!==-1) {
			if (thisElement.href.search(userRegExp) !== -1) {
				ignoredUserNamesInThread+="|"+thisElement.innerHTML
			}
		}
	}
	
	
	//Now remove this user if they're quoted anywhere in a blockquote
	allElements = document.evaluate(
	 '//blockquote',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);

	for (var i = 0; i < allElements.snapshotLength; i++) {
	 	thisElement = allElements.snapshotItem(i);
		if(thisElement.innerHTML.search(ignoredUserNamesInThread) !== -1) {
			thisElement.parentNode.removeChild(thisElement)
		}
	}
}


//Remove ignored user's posts
	
	allElements = document.evaluate(
	 '//tr/td[@class="fnavborderright"]',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
	 thisElement = allElements.snapshotItem(i);
	
	 if(thisElement.innerHTML.search(userRegExp) !== -1) {
		
		thisParent = thisElement.parentNode;
		thenHisParent = thisParent.parentNode;
	   thisParent.parentNode.removeChild(thisParent)

	
	 }
	}
	
	allElements = document.evaluate(
	 '//tr/td[@class="tdthread"]/..',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	

	
	for (var i = 0; i < allElements.snapshotLength; i++) {
	 thisElement = allElements.snapshotItem(i);
	
	
	 	if(thisElement.innerHTML.search(userRegExp) !== -1) {
		
			thisElement.parentNode.removeChild(thisElement)
			
			
			//alert(topicID)

			//If it's the first post in a thread, remove the whole  thread
			if (thisElement.innerHTML.indexOf("&nbsp;")!== -1 && thisElement.innerHTML.indexOf("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")== -1) {
			//alert("Blocking a Thread: "+thisElement.innerHTML.split("tid=")[1].split("&")[0])
				blockThread(thisElement.innerHTML.split("tid=")[1].split("&")[0]);
				
				
			}
		}
		
	}
	//Remove all the blocked Threads
	
	allElements = document.evaluate(
	 '//tr/td[@class="tdthread"]/..',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	
	var threadRegExp = new RegExp(blockedThreadIDs);
	for (var i = 0; i < allElements.snapshotLength; i++) {
	 	thisElement = allElements.snapshotItem(i);
		if(thisElement.innerHTML.search(threadRegExp) !== -1) {
			thisElement.parentNode.removeChild(thisElement)
			
		}
	}
	





		allElements = document.evaluate(
		 '//a[contains(@href,"mbignore.asp")]',
		 document,
		 null,
		 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		 null);

	
		
		
		
		for (var i = 0; i < allElements.snapshotLength; i++) {
			
			thisElement = allElements.snapshotItem(i)
			url = thisElement.href
			
	  	
	   
	if (url.indexOf("action=remove") != -1) {
		
			thisElement.addEventListener("click", function(){unblockUser(this.href.split("=")[1].split("&")[0])}, true);
	

		} else {
			url = thisElement.href
		     firstPart = url.split("=");
		     secondPart = firstPart[1].split("&");
		userID = secondPart[0];
		 thisElement.innerHTML = "REALLY Ignore";
			thisElement.addEventListener("click", function(){blockUser( this.href.split("=")[1].split("&")[0] )}, true);
		
		
		
	}
	
	
	
}


if (window.location.href.indexOf("showmsg.asp")!=-1 && window.location.href.indexOf("style=2")!=-1) {
	allElements = document.evaluate(
	 '//tr/td/..',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	
	for (var i = 0; i < allElements.snapshotLength; i++) {
	 	thisElement = allElements.snapshotItem(i);
		if(thisElement.innerHTML.indexOf("Remove Ignore") !== -1 && thisElement.innerHTML.indexOf("Remove Ignore") <500 -1) {
			thisElement.parentNode.removeChild(thisElement)
		}
	}
}