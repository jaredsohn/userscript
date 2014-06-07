// ==UserScript==
// @name          Wikipedia Dual Language
// @description   Wikipedia displays a topic in dual languages side-by-side
// @include       http://*.wikipedia.org/*
// ==/UserScript==


// v0.1    2007 01 26 
const WB_version="v0.1   2007 01 26";

// Checks before publishing:
// 1. LOG_LEVEL=1; 

/*

    Copyright (C) 2006  Jason Harrop, jharrop@gmail.com
    
    This program is free software; you can redistribute it and/or
    modify it under the terms of version 2 of the GNU General Public License
    as published by the Free Software Foundation.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details, available at
    http://www.gnu.org/copyleft/gpl.html

*/



const LOG_LEVEL = 1;

const DEBUG = 4;
const INFO = 3;
const WARN = 2;
const ERROR = 1;

function myGM_log( message, level) {
    if (level <= LOG_LEVEL) {
        GM_log( message);
    }
}

myGM_log( WB_version, 1)

main();

function main(  ) {
    
    replaceLanguageLinks();
    
}


/* Replace the links to other languages with links to the parallelise javascript function.

<div id="p-lang" class="portlet">
    <h5> In other languages </h5>
		
    <span class="webdeveloper-id-class-details"> .pBody </span>

    <div class="pBody">

	<ul>
		<span class="webdeveloper-id-class-details"> .interwiki-af </span>
		<li class="interwiki-af">
    			<a href="http://af.wikipedia.org/wiki/Wikipedia:Babel"> Afrikaans </a>
		</li>
*/
function replaceLanguageLinks(  ) {
    // var xpathResult = document.evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result);
    
    var otherLangCount = document.evaluate("count(//div[@id='p-lang']/div/ul/li)", document, null, XPathResult.ANY_TYPE, null).numberValue;
    
    var otherLangAnch = document.evaluate("//div[@id='p-lang']/div/ul/li/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    
    var thisAnch;
    var thisHref;
    var thisText;
    
        for (var i = 0; i < otherLangAnch.snapshotLength; i++) {
            thisAnch = otherLangAnch.snapshotItem(i);
            //thisAnch.onclick="alert('Hello ou there ' + i + ' !')";
            thisHref = thisAnch.getAttribute('href');
            thisText = thisAnch.firstChild.nodeValue;
            thisAnch.setAttribute('onclick', "parallelise('" + thisHref + "', '" + thisText + "' )" );        
            thisAnch.removeAttribute('href');
        }
    
    // TODO: add some visual cue that this is different to usual
    // TODO: add a toggle here so user can click to revert to nonGM behaviour
    
    //myGM_log('contains' +  otherLangCount + ' other languages', DEBUG);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    // Note that this function will currently dumbly add another copy of css
    // each time the user chooses another language on the same page!
}



/* 
 *
 * the parallelise javascript function
 *
 */

unsafeWindow.parallelise = function(href, text) {

    
    // if our parallel div exists, delete it
    if ( document.getElementById('content-parallel') ) {
        //alert("Add code to kill parallel column");
        var container = document.getElementById('column-content');
        var unwanted = document.getElementById('content-parallel');
        throwaway_node = container.removeChild(unwanted);
        //myGM_log("deleted prexisting content-parallel", DEBUG);
    }
    
    // create appropriate CSS   - top right bottom left
    addGlobalStyle('#content   { width: 40% ! important; float:left ! important; }');
    addGlobalStyle('#content-parallel { width: 40%; float:right; margin: 2.8em 0 0 0; background: white; color: black; border: 1px solid #aaa; border-left: none; line-height: 1.5em; position: relative; z-index: 3; }'); 
    
    //addGlobalStyle('#content-parallel { width: 40%; float:right; margin: 2.8em 0 0 12.2em; padding: 0 1em 1.5em 1em; background: white; color: black; border: 1px solid #aaa; border-right: none; line-height: 1.5em; position: relative; z-index: 3; }'); 
    
    // Somewhere, allow them to say, "use these languages on every page"
    
    
    // Progress meter
    var container = document.getElementById('column-content');
    var tmpDiv = document.createElement("div");
    tmpDiv.setAttribute("id", "content-parallel");
    var myText = document.createTextNode("Fetching " + text + '-- from --' + href);
    tmpDiv.appendChild(myText);
    container.appendChild(tmpDiv);
	
	// get contents and populate the div

    if (!GM_xmlhttpRequest) {
        alert('Please upgrade to the latest version of Greasemonkey.');
        return;
    }
	
	var pageRequest = new GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		onload: function(responseDetails) {

			/* TODO: add 
				 1. "waiting.." and 
				 2. error handling
				
				 3. look at details.responseHeaders, and log a warning if
				    (i)  content type is not text/html  (since XML parser might be used)
				    (ii) charset is not utf-8
			*/
			
			var pageResponse;


			var parser = new DOMParser();
			var responseXML = parser.parseFromString(responseDetails.responseText, "text/xml");  // or application/xhtml+xml

			var roottag = responseXML.documentElement;
			if ((roottag.tagName == "parserError") ||
    				(roottag.namespaceURI == "http://www.mozilla.org/newlayout/xml/parsererror.xml")){
					var serializer = new XMLSerializer();
					alert("Parsing Error!" + serializer.serializeToString(responseXML));
			}

			
			/* Get the internationalization stuff off the html element

				<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 							"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

				<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ar" lang="ar" dir="rtl">
			 */
			// roottag should be the html element
			if ( roottag.nodeName != "html") {
				myGM_log("Warning: found roottag element name '" + roottag.nodeName + "' but expected 'html'!", ERROR);
			}
			//myGM_log("lang: " + roottag.getAttribute("lang"), DEBUG );
			var lang = roottag.getAttribute("lang");
			
			//myGM_log("dir: " + roottag.getAttribute("dir"), DEBUG );
			var dir = roottag.getAttribute("dir");
			
			/* Since the response header indicated it was served as text/html
			   it would have been parsed with the tag soup parser
			   (See http://www.mozilla.org/docs/web-developer/faq.html#xhtmldiff )
			 
			   "The consequence is that XHTML 1.0 Transitional documents 
			   are rendered in the Almost Standards mode when served as 
			   text/html under pretext of the Appendix C but in the 
			   Standards Mode when served as application/xhtml+xml."
			  
			   I assume "tag soup" means HTML
			   
			*/
			//myGM_log("xml:lang : " + roottag.getAttribute("xml:lang"), DEBUG );
			var xmllang = roottag.getAttribute("xml:lang");

	
			// Now get the content proper ...
			var contents = responseXML.getElementById('content');
            
            /* Structure of document looks like:
            
                TODO - document this
            
                body
                    div id=globalWrapper
                    
                        div id=column-content
                        
                            div id=content
                            
                                contains article firstHeading 
                                
                                div id=bodyContent
                                
                                div id=column-one
                                
                                    div id=p-cactions
                                    
                                        // The  _|article|_ _discussion|____|view source|__history|_
                                        // tabs are actually part of div[@id=column-one]/div[@id=p-cactions]
                                        //
                                        // Currently you don't see this in the right hand language,
                                        // which is probably ok.
                                
                        div id=footer
                                       
            */
            
            

			contents.setAttribute("id", "content-parallel");
			contents.setAttribute("lang", lang);
			contents.setAttribute("dir", dir);
			contents.setAttribute("xml:lang", xmllang); // probably irrelevant, but set it anyway

            myGM_log( "Need to extract base URL from " + href, INFO );
            var lead_slashes = href.indexOf("//");
            var domain_start = lead_slashes + 2;
            var without_resource = href.substring(domain_start, href.length);
            var next_slash = without_resource.indexOf("/");
            var domain = without_resource.substring(0, next_slash);
            var baseURL = "http://" + domain;
            myGM_log( "It is " + baseURL, INFO );
            
            // Go through all the hyperlinks - any relative ones need to be
            // made absolute, so they point to the source language wiki
            //var anchors = roottag.getElementsByTagName("a");
            var anchors = contents.getElementsByTagName("a");
            var thisAnch;
            var thisHref;
            myGM_log( "There are " + anchors.length + " anchors", INFO );
            for (var i = 0; i < anchors.length; i++) {
                thisAnch = anchors[i];
                thisHref = thisAnch.getAttribute('href');
                if (thisHref) {
                    if (thisHref.indexOf("http://") == 0 ) {
                        // Do nothing
                    } else if (thisHref.indexOf("#") == 0 ) {
                        // Do nothing
                    } else {
                        // Make absolute
                        thisAnch.removeAttribute('href');
                        thisAnch.setAttribute('href', baseURL + thisHref );  
                        
                        // Any of these links will replace the entire page.
                        // That seems ok, since your back button works
                        
                        // Other possible behaviours:
                        // - open in new window
                        // - call parallelise on it?
                       
                    }
                } else {
                    myGM_log( i + ": No href? ", INFO );                    
                }
            }

            // Do the same for images.
            // Is this ever necessary?  Maybe wikimedia always uses an absolute URL?
            // Could have a look at the source code for it...
            
            // See http://meta.wikimedia.org/wiki/Help:Images_and_other_uploaded_files
            var images = contents.getElementsByTagName("img");
            var thisImage;
            var thisSrc;
            myGM_log( "There are " + images.length + " images", INFO );
            for (var i = 0; i < images.length; i++) {
                thisImage = images[i];
                thisSrc = thisImage.getAttribute('src');
                if (thisSrc) {
                    if (thisSrc.indexOf("http://") == 0 ) {
                        // Do nothing
                    //} else if (thisHref.indexOf("#") == 0 ) {
                        // Do nothing
                    } else {
                        // Make absolute
                        thisImage.removeAttribute('src');
                        thisImage.setAttribute('src', baseURL + thisSrc );  
                        myGM_log( "Made " + thisSrc + " absolute", INFO );
                    }
                } else {
                    myGM_log( i + ": No src? ", INFO );                    
                }
            }
            
            // Other objects?
            
            
			// add in "full screen" option
            var pFullScreen = document.createElement("p");  //hmm document here is a bug?
			pFullScreen.innerHTML= "<a href=\"" + href + "\">[This language full screen]</a>";

			var bodyContent = responseXML.getElementById('bodyContent');
			var siteSub = responseXML.getElementById('siteSub');
            bodyContent.insertBefore(pFullScreen, siteSub.nextSibling);

            // add in a remove option?  
            
             
			var container = document.getElementById('column-content');

			// get rid of the progress meter
			var unwanted = document.getElementById('content-parallel');
			throwaway_node = container.removeChild(unwanted);
			
			// add in the real contents
			container.appendChild(contents);
			// or could have used replacechild (or replacenode?)

        }  // end onload
    }); // end GM_xmlhttpRequest
	
} // end unsafeWindow.parallelise

