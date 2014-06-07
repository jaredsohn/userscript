// ==UserScript==
// @name          Web Page to Podcast
// @namespace     http://www.japaninyourpalm.com
// @description   Generates a podcast RSS/XML file from MP3 or WAV web links
// @include       http://*
// ==/UserScript==

// updated 9/30/06
// Instructions at:
// http://blog.medallia.com/2006/07/from_web_page_to_podcast_1.html

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Al Nevarez

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK 
*/

/*
The Javascript design approach for Web Page to Podcast was partially derived 
from Hack #88 Automatically Collect Syndicated Feeds, in
Greasemonkey Hacks by Mark Pilgrim, 
Copyright 2006 O'Reilly Media Inc, 0-596-10165-1
*/

/*
This script is intended for use with publically hosted and web accessible MP3's 
and the resulting podcast file is intended for personal use only.  To use this 
script, you must visit the original publisher's web page.  The functionality 
contained here merely creates a link to the original content, arranged in an 
XML format, and allows playback through your computer.  There is no 
physical difference created or implied as compared to merely playing the hosted
MP3 file with your computer's media player.  The script only helps you to 
categorize the audio in the convenient podcast format for local personal use.
The audio content itself is copyright by the producer of the web page through 
which the original audio files are hosted.
*/

function getMP3Links() {
    /**
     * This function performs several steps including:
     * Search for MP3 or WAV in hyperlinks - using regex and XPath
     * filter further to only those hrefs which end with .MP3 or .WAV
     * Check if href is full url or relative url, prepend full url if relative
     * If sound file's hyperlink does not contain a suitable text node and content
     * then test the surrounding text for a better title.
     * If no suitable text in nearby DOM nodes, then set title = mp3 filename
     * Skip the mp3 if it is same as previous mp3
     * Add the sound file's title and url to the global mp3Links array   
     */
    var xpath = "//a[contains(@href,'.mp3') or contains(@href,'.MP3') or " + 
                "contains(@href,'.wav') or contains(@href,'.WAV')]";
    var soundElems = document.evaluate(xpath , 
                   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var count=0;
    var href, url, title, fileName, additionalText;
    var oldHref = 'repeatMp3';
    
    // a collection of regular expression patters we'll use shortly    
    var pattern1 = /\.mp3$|\.wav$/i; // for testing if ends with...
    var pattern2 = /(.*)\//;         // for extracting full url from location url
    var pattern3 = /listen|hear|download|mp3|link|play|\|/i;
    var pattern4 = /\n/g;
    var pattern5 = /.*\/(.*)\.mp3$|.*\/(.*)\.wav$/i;
    var pattern6 = /^\s+$/;
    var pattern7 = /^\s*(.*)\s*$/;
    var pattern8 = /\*/g;
    
    for (var i = 0; i < soundElems.snapshotLength; i++) { // iterate thru each node
        soundElem = soundElems.snapshotItem(i);
        
        // Decide on rss item link element value
        href = soundElem.getAttribute('href');
        if (!pattern1.test(href)) {  // test if href ends with mp3 or wav
            continue;                // if not, skip to next a node
        }
        count++;
        if ((href.indexOf("http") == -1) && (href.indexOf("HTTP") == -1)) {
            var hrefPathMatch = pattern2.exec(document.location);
            var hrefPath = hrefPathMatch[1]; // get url up to the last "/"
            href = hrefPath + "/" + href;    // form the full url
        }
        
        href = encodeURI(href);
        
        // If mp3 link matches previous mp3 link then skip this mp3 node
        if (href == oldHref) { continue; }        
        
        // Assign RSS item's title element value - first attempt
        mp3Title = soundElem.textContent;
        
        // clean up title, remove line breaks and get mp3/wav file name
        mp3Title = mp3Title.replace(pattern4,"");
        if (pattern7.test(mp3Title)) {
            var textSplitUp = pattern7.exec(mp3Title); // strip off leading spaces
            mp3Title = textSplitUp[1];
        }
        
        var fileNameMatchArray = pattern5.exec(href); // extract the filename
        fileName = fileNameMatchArray[1];
        
        // Next part will attempt to find the best possible title text for mp3
        // this may involve making an attempt to get any helpful text which
        // preceeds the mp3 link
        additionalText = ""; // clear this out before starting

        // then test if the hyperlink element's text is short and has the words 
        // listen, hear, or download or mp3 or link in it
        if ((mp3Title.length < 12) && (pattern3.test(mp3Title))) {
            // probably best to look for text that preceeds the node
            if (soundElem.previousSibling) {
               var previousElem = soundElem.previousSibling;
               additionalText = previousElem.textContent;
               additionalText = additionalText.replace(pattern4,"");
            }
            else {
               var previousElem = "";
            }
            
            if (pattern7.test(additionalText)) {
                var textSplitUp = pattern7.exec(additionalText); // strip spaces
                additionalText = textSplitUp[1];
            }
            if (additionalText.length < 2) { // too short, go up another node
               if (previousElem.previousSibling) {
                  previousElem = previousElem.previousSibling;
                  additionalText = previousElem.textContent;
                  additionalText = additionalText.replace(pattern4,"");
               }
            }
            if ((additionalText.length < 10 && pattern3.test(additionalText)) ||
                (additionalText.length < 4 ) || 
                (pattern6.test(additionalText)) ) {
                mp3Title = fileName;
            }            
            else {
                mp3Title = additionalText + ' ' + mp3Title;
            }
        }
        
        // if still no suitable title, then set title = mp3 file name
        if (mp3Title.length < 1) {  
            mp3Title = fileName;
        }
        
        mp3Title = mp3Title.replace(pattern8,"");  // strip any * for itunes
        
        oldHref = href; // use to avoid making new item element for repeat mp3
        
        mp3Links.push({url: href,
                        title: mp3Title});
                        
        // GM_log('URL ' + mp3Links[i].url + ' TITLE '+mp3Links[i].title);       
     }     
     // GM_log(count); 
     return;
}

function appendNewElement(elmRoot, elmParent, sNodeName) {
    /** 
     * Tool for creating and appending DOM nodes in one line
     */
    var elmChild = elmRoot.createElement(sNodeName);
    elmParent.appendChild(elmChild);
    return elmChild;
}

function buildPodCastFile() {
    /**
     * Build the Podcast RSS XML File 
     * use the handy DOMParser class to build the xml node structure
     * includes iTunes extensions
     */
    var oParser = new DOMParser();
    var documentTitle = document.title; 
    
    var elmRoot = oParser.parseFromString('<rss/>', 'application/xml');
    elmRoot.documentElement.setAttribute('version', '2.0');
    elmRoot.documentElement.setAttribute('xmlns:itunes','http://www.itunes.com/DTDs/Podcast-1.0.dtd');
    var nodeComment = elmRoot.createComment(
        'READ ME!!  Save this tab\'s contents using the brower\'s "File/Save Page As..."\n to a local web server directory, '+
        'and then import it ' +
        'into your favorite podcast player. ');
    elmRoot.documentElement.appendChild(nodeComment);
    
    var nodeComment2 = elmRoot.createComment(
        'The audio content is Copyright by the organization which produces the web page ' +
        'found at: '+ document.location + 
        '. This podcast file is intended for personal use only.');
    elmRoot.documentElement.appendChild(nodeComment2);
    
    var elmChannel = appendNewElement(elmRoot, elmRoot.documentElement, 'channel');

    var elmChannelTitle = appendNewElement(elmRoot, elmChannel, 'title');
    elmChannelTitle.appendChild(elmRoot.createTextNode(documentTitle));

    var elmChannelLink = appendNewElement(elmRoot, elmChannel, 'link');
    elmChannelLink.appendChild(elmRoot.createTextNode(document.location));
    
    var elmChannelDescription = appendNewElement(elmRoot, elmChannel, 'description');
    elmChannelDescription.appendChild(elmRoot.createTextNode(documentTitle));

    var elmChanneliTunesSubT = appendNewElement(elmRoot, elmChannel, 'itunes:subtitle');
    elmChanneliTunesSubT.appendChild(elmRoot.createTextNode(documentTitle));

    var elmChannelDoc = appendNewElement(elmRoot, elmChannel, 'docs');
    elmChannelDoc.appendChild(elmRoot.createTextNode(document.location));

    var elmChannelLanguage = appendNewElement(elmRoot, elmChannel, 'language');
    elmChannelLanguage.appendChild(elmRoot.createTextNode('en-us'));

    var elmChannelWebMaster = appendNewElement(elmRoot, elmChannel, 'webMaster');
    elmChannelWebMaster.appendChild(elmRoot.createTextNode('anyone@anywhere.org'));    

    var dateNow = new Date();
    var elmChannelPubDate = appendNewElement(elmRoot, elmChannel, 'pubDate');
    elmChannelPubDate.appendChild(elmRoot.createTextNode(dateNow.toGMTString()));

    var elmChannelBuildDate = appendNewElement(elmRoot, elmChannel, 'lastBuildDate');
    elmChannelBuildDate.appendChild(elmRoot.createTextNode(dateNow.toGMTString()));

    var elmChannelAuthor = appendNewElement(elmRoot, elmChannel, 'itunes:author');
    elmChannelAuthor.appendChild(elmRoot.createTextNode(documentTitle));    
    
    var elmChannelKeywords = appendNewElement(elmRoot, elmChannel, 'itunes:keywords');
    elmChannelKeywords.appendChild(elmRoot.createTextNode(documentTitle));    

    for (var i = 0; i < mp3Links.length; i++) {
        var elmItem = appendNewElement(elmRoot, elmChannel, 'item');
        
        var elmItemTitle = appendNewElement(elmRoot, elmItem, 'title');    
        elmItemTitle.appendChild(elmRoot.createTextNode(mp3Links[i].title));
        
        var elmItemDescription = appendNewElement(elmRoot, elmItem, 'description');    
        elmItemDescription.appendChild(elmRoot.createTextNode(documentTitle));
        
        var elmItemLink = appendNewElement(elmRoot, elmItem, 'link');
        elmItemLink.appendChild(elmRoot.createTextNode(document.location));        
        
        var elmItemPubDate = appendNewElement(elmRoot, elmItem, 'pubDate');
        elmItemPubDate.appendChild(elmRoot.createTextNode(dateNow.toGMTString()));  
        
        var elmEnclosure = appendNewElement(elmRoot, elmItem, 'enclosure');    
        elmEnclosure.setAttribute('url', mp3Links[i].url);
        
        var elmItemAuthor = appendNewElement(elmRoot, elmItem, 'itunes:author');    
        elmItemAuthor.appendChild(elmRoot.createTextNode(documentTitle));
        
        var elmItemSubtitle = appendNewElement(elmRoot, elmItem, 'itunes:subtitle');    
        elmItemSubtitle.appendChild(elmRoot.createTextNode(documentTitle));
        
        var elmItemSummary = appendNewElement(elmRoot, elmItem, 'itunes:summary');    
        elmItemSummary.appendChild(elmRoot.createTextNode(documentTitle));
        
        var elmItemKeywords = appendNewElement(elmRoot, elmItem, 'itunes:keywords');    
        elmItemKeywords.appendChild(elmRoot.createTextNode(documentTitle));
        
        var elmItemCategory = appendNewElement(elmRoot, elmItem, 'itunes:category');
        elmItemCategory.setAttribute('text','podcasts');     
        
        var elmItemCategory = appendNewElement(elmRoot, elmItem, 'itunes:duration');
        
        var elmItemGuid = appendNewElement(elmRoot, elmItem, 'guid');
        elmItemGuid.setAttribute('isPermaLink','false');
        elmItemGuid.appendChild(elmRoot.createTextNode(documentTitle+(i+1)));                
    }      
    var serializer = new XMLSerializer();
    return serializer.serializeToString(elmRoot);
}

function displayPodCastFile(event) { 
    /**
     * Get the serialized podcast xml and open a new tab with this content
     */
    var podCastXMLString = buildPodCastFile();
    GM_openInTab('data:application/xml,'+ podCastXMLString);
    event.preventDefault();
}


/** 
 * Upon fully loading the page's DOM, the Greasemonkey script will start running here
 * Create & set scope, for an array that will hold all links and description, 
 * at page level.  Newly loaded web pages and web pages at other tabs will 
 * have their own array in scope
 * initialize the count per page
 * and search for links to .mp3 or .wav and add those to the mp3Links array
 */
var mp3Links = new Array();
var mp3Count = 0;
getMP3Links();

// Any mp3 or wav file links?  If not, exit GM script, else continue
mp3Count = mp3Links.length;
if (!mp3Count) { return; }

// Add a div element with sound file count and link to generate the podcast
var divHolder = document.createElement('div');
divHolder.setAttribute('id', 'floater');
divHolder.innerHTML = 
    '- Web Page to Podcast -<br>'+
    '<b>'+mp3Count + '</b>&nbsp&nbsp; MP3' + (mp3Count > 1 ? 's' : '') + '&nbsp;&nbsp; found<br>' +
    '<a href="#" id="genpodcastnode" title="Click here to generate the podcast file in a new tab">' +
     'Create Podcast in new Tab' +
    '</a>';

document.body.insertBefore(divHolder, document.body.firstChild);

// Set style for the floater div
GM_addStyle("div#floater { position: fixed; " +
                        "top: 20px; " +
                        "right: 10px; " +
                        "width: 135px; " +
                        "padding: 3px 4px 3px 4px; " +                        
                        "border: 1px solid orange; "+
                        "background-color: #FFC; "+
                        "text-align: center; "+
                        "color: #000; "+
                        "opacity: 0.86; "+
                        "font-family: sans-serif; font-size: x-small; "+
                        "line-height: 120%; "+
                        "z-index: 100; " +
                       " } " +
                       
                       
            "a#genpodcastnode { " +
                        "background-color: transparent; " +
                        "color: #2828F0; " +
                        "font-size: x-small; font-family: sans-serif;" +
                       " } " );

document.getElementById('genpodcastnode').addEventListener(
    'click', displayPodCastFile, true);


// Handy GM feature that adds a menu item under Firefox Tools, User Scripts
// commands.
// I found this to be handy for cases when my floating div doesn't cooperate
// well with the web pages DOM.
GM_registerMenuCommand( "Generate Podcast XML File in new tab", displayPodCastFile );