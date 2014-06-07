// ==UserScript==
// @name           Pagerize Literotica 
// @namespace      fitphotographer.literotica_pagerize
// @description    Show stories and series on single page
// @include        http://www.literotica.com/s/*
// ==/UserScript==
//
// author: fitPhotographer
// version: 0.0.5
//
// Utility Functions createHTMLDocumentByString, createDocumentFragmentByString, and strip_html_tag
// taken from AutoPagerizer which is also released under GPL.
//
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Updated version of the Literotica Pagerizer by After 8, to handle Literotica's latest 
// (as of 2012-03-21) redesign.  *Should* handle ALL multi-page, multi-part stories 
// correctly.  I haven't been able to break it in my limited testing, at any rate.

var DEBUG = false;
var COUNTER = 1;



// do something only if this is the first page of the story
if( isFirstPage(document) ) {
		if (DEBUG) GM_log('This is a first run first page');
		var temp = document.getElementById('b-bottom').previousSibling
		processDocument(document, temp.parentNode.previousSibling.previousSibling.previousSibling, true, 1);
}

function getElementsByClassName(inDoc, className)
{
    if (inDoc.getElementsByClassName == undefined)
	{
        var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
    }
    else
    {
        return inDoc.getElementsByClassName(className);
    }
}

function processDocument( inDoc, inInsertAfter, isFirstRun, inChapter ) {
	var BUILDSERIES = false;
	var LINKARR = getPageNavArray(inDoc);

	var NEWLAST = inInsertAfter;
	if(LINKARR) {
		for(x=0; x<LINKARR.length; x++) {
			// GM_xmlHTTPRequest is asynchronous
            if (DEBUG) GM_log('Running through pages' + NEWLAST.toString());
			newStory = document.createElement('p');
			newStory.id = 'story' + COUNTER;
			COUNTER += 1;
			if(isFirstRun) { newStory.innerHTML = '<br/><u><b>Part' + (x+2) + '</b></u><br/><br/>';} 
				else {newStory.innerHTML = '<br/><u><b>Ch ' + inChapter + ' Part' + (x+2) + '</b></u><br/><br/>';}
			NEWLAST.parentNode.insertBefore(newStory, NEWLAST.nextSibling);
			if(x==LINKARR.length-1 && isFirstRun) BUILDSERIES=true;
			insertRequest(newStory, LINKARR[x].toString(), BUILDSERIES, inChapter);
			NEWLAST = newStory;
		}
	}
	else if (isFirstRun) {
		if (DEBUG) GM_log('First Run chapter without any parts. Building Series');
		// remove current content
		var temp = document.getElementById('content');
		while ( temp.childNodes.length >= 1 ) temp.removeChild( temp.firstChild ); 

		newStory = document.createElement('p');
		newStory.id = 'story' + COUNTER;
		COUNTER += 1;
		newStory.innerHTML = '<br/><u><b>Ch 1 Part 1 (implicit) </b></u><br/><br/>';
		temp.appendChild(newStory);
		insertRequest(newStory, location.href, true, inChapter);	
	}
}

// Request Page and Insert
function insertRequest(inStory, inUrl, processSeries, inChapter) {
	if (DEBUG) GM_log('insert called with inUrl = ' + inUrl + ';  buildseries = ' + processSeries.toString());
	var doc;
  var content;
	GM_xmlhttpRequest({
		  method: 'GET',
		  url: inUrl,
		  headers: {
		      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		      'Accept': 'text/plain, text/html',
		  },
		  onload: function(response) {
				doc = createHTMLDocumentByString(response.responseText);

				// if the first page of a new chapter, process this chapter
				if( isFirstPage(doc) ) {
					if (DEBUG) GM_log('Chapter = ' + inChapter + '; First page found');
					processDocument(doc, inStory, false, inChapter);
				}

				// build story series if required
				if(processSeries && doc.getElementById('b-series')) {
				if (DEBUG) GM_log('Begin Process Series');
					var seriesLinks = doc.getElementById('b-series').getElementsByTagName('a');
					// only process series if first chapter
					if(seriesLinks[0].innerHTML.substr(seriesLinks[0].innerHTML.length-1,1) == '2' || (seriesLinks[0].innerHTML.substr(seriesLinks[0].innerHTML.length-1,1) == '1' && seriesLinks[1].innerHTML.substr(seriesLinks[1].innerHTML.length-1,1) == 2)) {
						for(y=seriesLinks.length-1; y>-1; y--) {
							// process each chapter
                            var chapter = y+2;
							if (DEBUG) GM_log('Begin Process Chapter ' + chapter);
							newStory = document.createElement('p');
							newStory.id = 'story' + COUNTER;
							COUNTER += 1;
							newStory.innerHTML = '<br/><u><b>Ch ' + chapter + ' Part 1</b></u><br/><br/>';
							inStory.parentNode.insertBefore(newStory, inStory.nextSibling);
							if (DEBUG) GM_log('Requesting First Page, Chapter = ' + chapter);
							insertRequest(newStory, seriesLinks[y].toString(), false, chapter);
						}
					}
				}

				// delete pesky divs once all is done. For some reason, repeating 3 times works.
				var content = doc.getElementById('content');
				var divs = content.getElementsByTagName('div');
				for(z=0; z<divs.length; z++) 
                {
                    if (divs[z].className == 'b-story-body-x x-r15')
                    {
                        content = divs[z];
                        break;
                    }
                }

				inStory.innerHTML += content.innerHTML;
		  }
	})
}

// Utility Functions ***************

// Check if "prev" link exists
function isFirstPage( inDoc ) {
    var links = inDoc.getElementsByTagName('a');
    var prev=null;
    for (x=0; x < links.length; x++)
    {
        if (links[x].className == 'b-pager-prev')
        {
            prev = links[x];
            break;
        }
    }
	if (!prev) {
		return true;
	}
	else {
		return false;
	}
}

// return array of link elements
function getPageNavArray( inDoc ) {
    var temp=inDoc.getElementById('b-bottom').previousSibling
    if (temp && temp.className == 'b-pager')
    {
        var results = new Array();
        var base = temp.getElementsByTagName('a')[0].toString();
        base = base.substring(0, base.length-1);
        var options = temp.getElementsByTagName('option');
        for (x=1; x < options.length; x++)
        {
            results.push(base + options[x].innerHTML);
        }

        return results;
    }
    return null;
}

function createHTMLDocumentByString(str) {
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml')
    }
    var html = strip_html_tag(str)
    var htmlDoc = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
    return htmlDoc
}

function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}

function strip_html_tag(str) {
    var re = /^[\s\S]*?<html(?:[ \t\r\n][^>]*)?>|<\/html[ \t\r\n]*>[\w\W]*$/ig
    return str.replace(re, '')
}