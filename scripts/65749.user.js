// ==UserScript==
// @name   Hotmail - Mark all emails as read
// @namespace  Email Scripts
// @description Adds a "Mark all as read" item to the context menu which will go through each page, marking unread emails as read until all are read..
// @include *mail.live.com/mail/InboxLight.aspx*
// @version        2.0.1
// ==/UserScript==

//Send the "clicked" event to an element
function clickElement(elem) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	elem.dispatchEvent(evt); 
}

//Add a item to the right click menu
function addContextItem(text, href, fn, index) {
	var elem = document.getElementById("contextMenu");
	if(elem != null) {
		var newListItem = document.createElement("li");
		var newA = document.createElement("a");
		newA.setAttribute("href", href);
		newA.setAttribute("unselectable", "on");
		newA.appendChild(document.createTextNode(text));
		newListItem.appendChild(newA);
		elem.childNodes[1].insertBefore(newListItem, elem.childNodes[1].childNodes[index]);
		newA.addEventListener('click', fn, true);
	}
}

//The function ran when you click the button in the context menu
function checkMail() {
	//Check we have unread
	var unread = document.querySelector("#folderList .Caption > span > span").textContent;
	if(unread == "") {
		GM_log("No unread emails")
		return;
	}
	unread = parseInt(unread);
	
	//Load the next page of the inbox
	var nextPage = function() {
		var nBtn = document.getElementById("nextPageLink");
		if(nBtn == null) {
			GM_log("Reached last page")
			return;
		}
		var pnCur = nBtn.getAttribute("pncur");
		clickElement(nBtn);
		//Wait for the new page to be loaded
		var checkForNewPage = function() {
			nBtn = document.getElementById("nextPageLink");
			if(nBtn == null) {
				GM_log("Reached last page")
				return;
			}
			if(nBtn.getAttribute("pncur") == pnCur) {
				setTimeout(checkForNewPage, 100);
			} else {
				//GM_log("Next page");
				checkUnread();
			}
		}
		checkForNewPage();
	}
	
	//Click the mark as read button then check if we have more unread mail
	var markAsRead = function() {
		clickElement(document.getElementById("MarkAsRead"));
		//If we still have unread emails, go to next page
		if(unread > 0) {
			setTimeout(nextPage, 500);
		} else {
			GM_log("Complete");
		}
	}
	
	//Mark any unread items on the current page, mark them as read, go to next page
	var checkUnread = function() {
		var f = false;
		var table = document.querySelector("#messageListContentContainer > .InboxTable");
		for(i = 0; i < table.rows.length; i++) {
			if(table.rows[i].className == "InboxContentItemUnread") {
				unread--;
				f = true;
				//Check it
				clickElement(table.rows[i].cells[0].children[0])
			}
		}
		//Do we have unread emails on the page?
		if(f) {
			markAsRead();
		} else {
			nextPage();
		}
	}
	checkUnread();
}

addContextItem("Mark all as read", "javascript:", checkMail, 2);
