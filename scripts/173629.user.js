// ==UserScript==
// @name          Kongregate ThreadHide
// @description   Enables you to hide certain threads on the Kongregate forums.
// @version       1.0.0
// @namespace     http://www.kongregate.com/
// @include       http://www.kongregate.com/forums/*
// @exclude       http://www.kongregate.com/forums/*/*
// ==/UserScript==

GM_setValue("version", 1);

var MAX_MEMORY_TIME = 4838400000; //Eight weeks

var hiddenThreads;
var currentTime = new Date().getTime();

function handleThreads() {
	var threads = document.getElementsByClassName("hentry");
	//if(!threads) return;
	
	var len = threads.length, i, tid;
	for(i=len;i--;) {
		tid = parseInt(threads[i].getElementsByClassName("c2")[0].innerHTML.match(/\/topics\/([0-9]+)/)[1]);
		if(isHidden(tid)) {
			updateViewDate(tid);
			deleteThread(threads[i]); //Deleting known troll treads.
		} else {
			addHideLink(threads[i], tid);
		}
	}
	saveMemory();
}

function deleteThread(thread) { //Removing a thread from the list.
	if(thread.parentNode) thread.parentNode.removeChild(thread);
}

function addHideLink(thread, threadId) { //Adds the link to hide the thread
	var threadContainer = thread.getElementsByClassName("c2")[0];
	var smallElement = document.createElement("small");
	var hideLink = document.createElement("a");
	hideLink.innerHTML = "hide";
	hideLink.href = "javascript:void(0);";
	hideLink.addEventListener("dblclick", generateHideCallback(thread, threadId), false);
	smallElement.appendChild(hideLink);
	threadContainer.appendChild(smallElement);
}

function getHiddenThreadDataById(threadId) {
	if(!hiddenThreads) return null;
	for each(var i in hiddenThreads) {
		if(i.id == threadId) return i;
	}
	return null;
}

function isHidden(threadId) { //Checks if the thread is hidden
	if(getHiddenThreadDataById(threadId)) return true;
	else return false;
}

function updateViewDate(threadId) { //Updates the last time that thread was seen
	var threadData = getHiddenThreadDataById(threadId);
	if(!threadData) return;
	threadData.time = currentTime;
}

function addHiddenThread(thread, threadId) {
	deleteThread(thread);
	hiddenThreads.push({
		id: threadId,
		time: currentTime
	});
	saveMemory();
}

function generateHideCallback(thread, threadId) {
	return (function(event) {
		addHiddenThread(thread, threadId);
	});
}

function loadMemory() {
	hiddenThreads = [];
	var data = GM_getValue("threadData", "");
	if(!data) return;
	var splitData = data.split(";");
	var dataFragments,  threadDate;
	for each(var i in splitData) {
		dataFragments = i.split("_"); //id_date;id_date;id_date
		threadDate = parseInt(dataFragments[1])*86400000;
		if(currentTime-threadDate < MAX_MEMORY_TIME) {
			hiddenThreads.push({
				id: parseInt(dataFragments[0]),
				time: threadDate
			});
		}
	}
}

function saveMemory() {
	var saveString = "";
	for each(var i in hiddenThreads) {
		if(saveString) saveString += ";";
		saveString += i.id+"_"+parseInt(i.time/86400000); //This is a day. We're dividing for compression purposes.
	}
	GM_setValue("threadData", saveString);
}

function deleteMemory() {
	hiddenThreads = [];
	GM_deleteValue("threadData");
}

try {
	loadMemory();
	handleThreads();
	GM_registerMenuCommand("Reset Hidden Thread Memory", deleteMemory);
} catch(e) {
	
}