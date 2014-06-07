// ==UserScript==
// @name           Google Task Alert
// @namespace      http://starsky51.googlepages.com/gtaskalert
// @description    Displays an alert in GMail when a task is due.
// @include        http://mail.google.*/*
// @include        https://mail.google.*/*
// ==/UserScript==

var taskArray = new Array();
var alertDiv;
var alertColor = "#ffff80";
var alertHeader = "<div><small><i>Task Alerts</i></small><HR/></div><div style=\"position:absolute; top:0px; right:4px; background-color:"+alertColor+";\"><a href='#' onclick=\"this.parentNode.parentNode.style.top='-3000px';\"><small>Close</small></a>";

alertDiv = document.createElement('div');
alertDiv.id = "alertDiv";
alertDiv.style.position = "fixed";
alertDiv.style.zIndex = 998;
alertDiv.style.width = "400px";
alertDiv.style.height = "79px";
alertDiv.style.right = "10px";
alertDiv.style.top = "40px";
alertDiv.style.padding = "8px";
alertDiv.style.border = "1px solid black";
alertDiv.style.backgroundColor = alertColor;
alertDiv.style.visibility = "hidden";

function init() {
	if(document.getElementsByTagName("iframe")[4]) {
		document.getElementsByTagName("iframe")[4].contentDocument.body.getElementsByTagName("div")[0].appendChild(alertDiv);
		setTimeout(getTasks, 30000);
	}
}

function getTasks() {
	var allLinks, thisLink;
	var alarmCount = 0;

	allLinks = document.evaluate(
		  '//iframe[@id=\'tasksiframe\']'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		,	null);
	if (allLinks.snapshotItem(0) != null && typeof(allLinks.snapshotItem(0).contentDocument)!='undefined')
	{	
		allLinks = allLinks.snapshotItem(0).contentDocument.evaluate(
			  '//td[@class=\'EV\']'
			, allLinks.snapshotItem(0).contentDocument
			, null
			, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			, null);
		GM_log('Number of task items: '+allLinks.snapshotLength);
	}
	alertDiv.innerHTML=alertHeader;
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if(thisLink.getElementsByClassName('EE').length > 0) {
			taskArray[i,0] = thisLink.getElementsByClassName('EY')[0].innerHTML; //Task Title
			taskArray[i,1] = (thisLink.getElementsByClassName('EY')[0].className.indexOf(' DL') > 0); //Is Task Completed?
			taskArray[i,2] = thisLink.getElementsByClassName('EE')[0].childNodes[0].innerHTML; //Task Date (if there is no date set, this may retrieve some other string)
			if(taskArray[i,2].toString() != 'Invalid Date') {
				if((new Date())-new Date(taskArray[i,2]) > 0 && !taskArray[i,1]) {
					alarmCount++;
					GM_log('Task Overdue: '+taskArray[i,0].toString()+'\nDue date: '+taskArray[i,2]);
					thisLink.style.backgroundColor = alertColor;
					alertDiv.style.visibility = "visible";
					alertDiv.style.height = ((57*alarmCount)+21).toString()+"px";
					alertDiv.innerHTML = alertDiv.innerHTML+taskArray[i,0]+"<BR/><small>Due date: "+taskArray[i,2]+"</small><HR/>";
				} else {
					thisLink.style.backgroundColor = null;
				}
			}
		}
	}
	if (!alarmCount) alertDiv.style.visibility = "hidden";
	delete taskArray;
	setTimeout(getTasks, 30000);
}

window.addEventListener('load', function(e) {init();}, true );