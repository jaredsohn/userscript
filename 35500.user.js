// ==UserScript==
// @name          Gmail - Google Reader Seamless Integration
//@author	      Michael A. Balazs
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

//OBSOLETE: Please use <a href="http://userscripts.org/scripts/show/36028">Gmail - Seamless Integration (Google Calendar, Reader, Notebook, etc...) with Collapsible Inbox for Standard GMail and GMail Apps</a> instead.

var reader_frame_height = "600px"; 
var place_before = "calendar"; //Choice are (depending on what scripts you have): ATTOP, calendar, reader, notebook, ATBOTTOM;
 
function loadReader(gmail_reader,gmail_readerBox) 
{	
	gmail_reader.getFooterElement().insertBefore(gmail_readerBox.getElement(), gmail_reader.getFooterElement().childNodes[0]);

	var readerBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById("readerBox");
	readerBox.id = "readerBoxLoaded";

	readerBox = readerBox.parentNode.parentNode;
	readerBox.style.textAlign = "left";
	
	for(var i = 0; i < 11; i++) readerBox = readerBox.parentNode;
	readerBox.style.width = "100%";

	if(readerURLDetector()) 
	{
		readerBox.style.display = "none";
		return;
	}
	
	var readerBoxIFrame = parent.document.getElementById("canvas_frame").contentDocument.getElementById("reader_iframe");
	readerBoxIFrame.src = 'null';
	readerBoxIFrame.src = 'https://www.google.com/reader';
	readerBoxIFrame.style.height = reader_frame_height;
	
	setTimeout(function(){moveCurrentBox(gmail_reader,gmail_readerBox);},500);
	
	gmail_inbox.registerViewChangeCallback(function(){moveCurrentBox(gmail_reader,gmail_readerBox);});		
};

function readerURLDetector()
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


function checkReaderElementsLoaded(gmail_reader,readerBox) 
{
	var checkReaderLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById("readerBoxLoaded"); 
	try {if(typeof gmail_reader.getFooterElement() != 'undefined' && typeof readerBox.getElement() != 'undefined' && checkReaderLoaded == null) loadReader(gmail_reader,readerBox);}
	catch(err) {setTimeout(function(){checkReaderElementsLoaded(gmail_reader,readerBox);},300);}
}

function checkGMailAPILoaded(gmail_reader)
{
	try 
	{
		var readerBox = gmail_reader.addNavModule('<span id="readerBox">Reader</span>');
		readerBox.setContent("<iframe id='reader_iframe' style='border: medium none ; padding: 2px; display:block; width:100%;'></iframe>");
		
		checkReaderElementsLoaded(gmail_reader,readerBox);	
	}
	catch(err) {setTimeout(function(){checkGMailAPILoaded(gmail_reader);},200);}
}

function onReaderPageLoaded()
{
	if(unsafeWindow.gmonkey) unsafeWindow.gmonkey.load('1.0', function(gmail_reader) {checkGMailAPILoaded(gmail_reader)});
}

window.addEventListener('load', onReaderPageLoaded, true);