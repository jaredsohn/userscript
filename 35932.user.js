// ==UserScript==
// @name           Gmail - Google Notebook Seamless Integration
// @namespace      mail.google.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

//OBSOLETE: Please use <a href="http://userscripts.org/scripts/show/36028">Gmail - Seamless Integration (Google Calendar, Reader, Notebook, etc...) with Collapsible Inbox for Standard GMail and GMail Apps</a> instead.

var notebook_frame_height = "600px"; 
var place_before = "ATBOTTOM"; //Choice are (depending on what scripts you have): ATTOP, calendar, reader, notebook, ATBOTTOM;
 
function loadNotebook(gmail_notebook,gmail_notebookBox) 
{	
	gmail_notebook.getFooterElement().insertBefore(gmail_notebookBox.getElement(), gmail_notebook.getFooterElement().childNodes[0]);

	var notebookBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById("notebookBox");
	notebookBox.id = "notebookBoxLoaded";

	notebookBox = notebookBox.parentNode.parentNode;
	notebookBox.style.textAlign = "left";
	
	for(var i = 0; i < 11; i++) notebookBox = notebookBox.parentNode;
	notebookBox.style.width = "100%";

	if(notebookURLDetector()) 
	{
		notebookBox.style.display = "none";
		return;
	}
	
	var notebookBoxIFrame = parent.document.getElementById("canvas_frame").contentDocument.getElementById("notebook_iframe");
	notebookBoxIFrame.src = 'null';
	notebookBoxIFrame.src = 'https://www.google.com/notebook';
	notebookBoxIFrame.style.height = notebook_frame_height;
	
	setTimeout(function(){moveCurrentBox(gmail_notebook,gmail_notebookBox);},500);
	
	gmail_inbox.registerViewChangeCallback(function(){moveCurrentBox(gmail_notebook,gmail_notebookBox);});		
};

function notebookURLDetector()
{
	if(document.URL.search("mail.google.com/a") != -1) return true;
	else return false; 
}

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

function checkNotebookElementsLoaded(gmail_notebook,notebookBox) 
{
	var checkNotebookLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById("notebookBoxLoaded"); 
	try {if(typeof gmail_notebook.getFooterElement() != 'undefined' && typeof notebookBox.getElement() != 'undefined' && checkNotebookLoaded == null) loadNotebook(gmail_notebook,notebookBox);}
	catch(err) {setTimeout(function(){checkNotebookElementsLoaded(gmail_notebook,notebookBox);},300);}
}

function checkGMailAPILoaded(gmail_notebook)
{
	try 
	{
		var notebookBox = gmail_notebook.addNavModule('<span id="notebookBox">Notebook</span>');
		notebookBox.setContent("<iframe id='notebook_iframe' style='border: medium none ; padding: 2px; display:block; width:100%;'></iframe>");
		
		checkNotebookElementsLoaded(gmail_notebook,notebookBox);	
	}
	catch(err) {setTimeout(function(){checkGMailAPILoaded(gmail_notebook);},200);}
}

function onNotebookPageLoaded()
{
	if(unsafeWindow.gmonkey) unsafeWindow.gmonkey.load('1.0', function(gmail_notebook) {checkGMailAPILoaded(gmail_notebook)});
}

window.addEventListener('load', onNotebookPageLoaded, true);