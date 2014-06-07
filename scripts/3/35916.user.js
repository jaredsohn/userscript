// ==UserScript==
// @name           Gmail - Collapsible Inbox
// @namespace      mail.google.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

//OBSOLETE: Please use <a href="http://userscripts.org/scripts/show/36028">Gmail - Seamless Integration (Google Calendar, Reader, Notebook, etc...) with Collapsible Inbox for Standard GMail and GMail Apps instead.

var place_before = "ATTOP"; //Choice are (depending on what scripts you have): ATTOP, calendar, reader, notebook, ATBOTTOM;
var border_around_inbox = true; 

function loadTreadBox(gmail_inbox,gmail_threadBox) 
{
	gmail_inbox.getFooterElement().insertBefore(gmail_threadBox.getElement(), gmail_inbox.getFooterElement().childNodes[0]);

	var threadBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById("threadBox");
	threadBox.id = "threadBoxLoaded";

	threadBox = threadBox.parentNode.parentNode;
	threadBox.style.textAlign = "left";

	for(var i = 0; i < 11; i++) threadBox = threadBox.parentNode;
	threadBox.style.width = "100%";
	
	var threadBoxDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById("threadBoxDiv"); 
	if(border_around_inbox) threadBoxDiv.style.padding = "5px";
	else threadBoxDiv.style.padding = "-10px";

	fillThreadBoxDiv(gmail_inbox,threadBoxDiv);
	redrawViewList(gmail_inbox,gmail_threadBox);
	
	setTimeout(function(){moveCurrentBox(gmail_inbox,gmail_threadBox);resizeThreadBox(gmail_inbox,false);},500);
	
	gmail_inbox.registerViewChangeCallback(function(){moveCurrentBox(gmail_inbox,gmail_threadBox); resizeThreadBox(gmail_inbox,false);});		
	window.parent.addEventListener('resize',function(){resizeThreadBox(gmail_inbox,true);},false);
};

function moveCurrentBox(gmail,currentBox) 
{
	var place_before_id = "ATTOP";
	
	switch (place_before)
	{
		case 'calendar': place_before_id = "calendarBoxLoaded"; break;
		case 'reader': place_before_id = "readerBoxLoaded"; break;
		case 'notebook': place_before_id = "notebookBoxLoaded"; break;
		case 'ATBOTTOM': place_before_id = "ATBOTTOM"; break;
	}

	if(place_before_id.search("AT") == -1)
	{
		var placeBeforeBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById(place_before_id); 
		if(placeBeforeBox  == null) {setTimeout(function(){moveReader(gmail,currentBox);},200); return;}
		
		for(var i = 0; i < 13; i++) placeBeforeBox = placeBeforeBox.parentNode;
		gmail.getFooterElement().insertBefore(currentBox.getElement(),placeBeforeBox);
	}
	else if(place_before_id == "ATTOP") gmail.getFooterElement().insertBefore(currentBox.getElement(),gmail.getFooterElement().childNodes[0]);		
	else if(place_before_id == "ATBOTTOM") gmail.getFooterElement().insertBefore(currentBox.getElement(),gmail.getFooterElement().childNodes[gmail.getFooterElement().childNodes.length-1]);				
}

function resizeThreadBox(gmail_inbox, windowResized)
{ 
	if(gmail_inbox.getActiveViewType() != 'cv') return; 
	
	var messageBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById("threadBoxDiv").getElementsByTagName("table"); 
		
	for(var i = 0; i < messageBox.length; i++) 
	{
		if(messageBox[i].className.split(" ").length > 2) 
		{
			messageBox = messageBox[i].childNodes[0].childNodes[0].childNodes[0];
			break;
		}
	}

	if(messageBox.style.width.split("px").length <= 1 || (messageBox.id == "resizedMessageBox" && !windowResized)) {setTimeout(function(){resizeThreadBox(gmail_inbox)},100); return;}
	
	messageBox.id = "resizedMessageBox";
	messageBox.style.width = (messageBox.style.width.split("px")[0]-50)+"px";
}

function fillThreadBoxDiv(gmail_inbox,threadBoxDiv)
{ 
	var placeHolder = parent.document.getElementById("canvas_frame").contentDocument.getElementById("placeHolder");
	
	var activeView = gmail_inbox.getActiveViewElement()
	for(var i = 0; i < 9; i++) activeView = activeView.parentNode;

	threadBoxDiv.insertBefore(activeView,placeHolder);
}

function redrawViewList(gmail_inbox,gmail_threadBox)
{
	topRightCurlClass = findTopRightCurlClass(gmail_threadBox);
	
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[0],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[3],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[4],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[5],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[6],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[7],topRightCurlClass);
	redrawListItem(gmail_inbox.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[2],topRightCurlClass);
}

function findTopRightCurlClass(gmail_threadBox)
{
	return  gmail_threadBox.getElement().childNodes[0].childNodes[0].childNodes[0].childNodes[0].className.split(" ")[1];
}

function redrawListItem(item, topRightCurlClass)
{
	item.style.width = "90%";
		item = item.childNodes[0].childNodes[0].childNodes[0];
	item.className = item.className + " " + topRightCurlClass;
		item = item.childNodes[1];
	item.style.width = "3px";
		item = item.parentNode.parentNode.childNodes[3].childNodes[0];
	item.style.width = "3px";	
}

function checkInboxElementsLoaded(gmail_inbox,threadBox) 
{
	var checkThreadBoxLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById("threadBoxLoaded"); 
	try {if(typeof gmail_inbox.getActiveViewType() != 'undefined' && typeof threadBox.getElement() != 'undefined' && checkThreadBoxLoaded == null) loadTreadBox(gmail_inbox,threadBox);}
	catch(err) {setTimeout(function(){checkInboxElementsLoaded(gmail_inbox,threadBox);},300);}
}

function checkGMailAPILoaded(gmail_inbox)
{
	try 
	{
		var threadBox = gmail_inbox.addNavModule('<span id="threadBox">Mail</span>');
		threadBox.setContent("<div id='threadBoxDiv'><div id='placeHolder'></div></div>");
		
		checkInboxElementsLoaded(gmail_inbox,threadBox);	
	}
	catch(err) {setTimeout(function(){checkGMailAPILoaded(gmail_inbox);},200);}
}

function onGmailInboxLoad()
{
	if(unsafeWindow.gmonkey) unsafeWindow.gmonkey.load('1.0', function(gmail_inbox) {checkGMailAPILoaded(gmail_inbox)});
}

window.addEventListener('load', onGmailInboxLoad, true);