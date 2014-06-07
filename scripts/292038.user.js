// ==UserScript==
// @name        feedly2Mendeley
// @namespace   http://userscripts.org/users/mariannebezaire
// @author      http://userscripts.org/users/mariannebezaire
// @description Take over an existing sharing form on feedly for URL-based sharing method
// @include     http://www.feedly.com/*
// @include     http://feedly.com/*
// @version     1.6
// @grant       none
// ==/UserScript==

/*
PURPOSE: To streamline the import of academic journal articles from feedly RSS feed
into Mendeley, an online reference manager, when using Firefox browser.

DETAILS: When Feedly is viewed in list view (Settings>Presentation>Title only),
hover over a title to show the Custom Sharing icon. With this script installed,
clicking on that icon will cause the article to be imported into Mendeley using
Mendeley's web importer link and specifying either the URL or the DOI.

If you do not have a custom sharing button that looks like a paper airplane, or if
you want a different button to be replaced, simpy change the word in quotes marked
on the first code line below (where it says "Change the word in quotes on this line!").
Change it either to "Custom", "Twitter", or "Facebook".

Note that different journal rss feeds send feedly different URL information for
their articles, which the Mendeley importer may or may not be able understand.
For certain journals whose basic URLs are not understood (Nature, ScienceDirect,
eLife), the provided URL is parsed into something that Mendeley can understand.

This script can be used in conjunction with MendeleyTagger to speed the import
process. Apply a general tag to all articles imported via the Mendeley URL, put
the focus on the "Save" button so simply pushing 'Enter' will import a found
article, and then automatically close the Mendeley window and return to the
previous tab.

*****************************************************************

Script name: feedly2mendeley

Copyright 2014 Marianne Bezaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*****************************************************************/

/* By default, this new functionality replaces the custom sharing button.
However, you can change the next code line so that it replaces the twitter
button instead.*/

ButtonToSwitch = "Custom"; // Change the word in quotes on this line! Either "Custom", "Twitter", or "Facebook"

/* This next section sets the attribute values to look for based on which button
you specified above to be replaced with the Mendeley button*/
switch (ButtonToSwitch) {
    case "Custom":
		var ShareOptionToReplace ='askCustomSharingPopup( event ); return false'; // replace custom sharing button
		var checkTitle='Custom Sharing Tool (Pro Feature)';
        break;
    case "Twitter":
		var ShareOptionToReplace ='askTweetPopup( event ); return false'; // replace tweet button
		var checkTitle='Twitter';
        break;
    case "Facebook":
		var ShareOptionToReplace ='askFacebookPopup( event ); return false'; // replace facebook button
		var checkTitle='Facebook';
        break;
	default:
		var ShareOptionToReplace ='askCustomSharingPopup( event ); return false'; // replace custom sharing button
		var checkTitle='Custom Sharing Tool (Pro Feature)';
        break;
}


// Mendeley import URLs
var NewShareByURL = "http://www.mendeley.com/import/?url="; // URL for sharing the item using its URL
var NewShareByDOI = "http://www.mendeley.com/import/?doi=" // URL for sharing the item using its DOI

/* Check the URL supplied by the article source to see whether it comes
from one of the journals with odd URLs not directly recognized by the
Mendeley importer. If so, use a special function (defined below) for
that journal that extracts the pertinent info from the URL and recodes
it into a URL that Mendeley importer can understand.*/
var check_Nature = "http://dx.doi.org/";
var check_ScienceDirect = "http://rss.sciencedirect.com/action/redirectFile?&zone=main&currentActivity=feed&usageType=outward&url=";                   
var check_eLife = "http://elife.elifesciences.org/cgi/content/short/"

/* Function to change a particular feedly sharing button into a feedly -> Mendeley
sharing button.*/
var event
function updateShareOption() {
    try {
        var ArticleEntries = document.getElementsByClassName('u0Entry '); // Get all the article entries on the page when in "Title Only" view
        for (var i = 0; i < ArticleEntries.length; i++) { // For all the article entries on the page when in "Title Only" view
            var ShareLinks = ArticleEntries[i].getElementsByTagName('a'); // Get all the links associated with an entry
            for (var a = 0; a < ShareLinks.length; a++) { // For all the links associated with the entry
                if (ShareLinks[a].getAttribute('onclick') == ShareOptionToReplace) { // If 'onclick' action of the link matches the specification to be replaced
                    var theURL = ShareLinks[a].getAttribute('data-url'); // Get the URL provided by the article enty
					
					// Now set the onclick property of the button so that it will call the Mendeley importer with the correct article URL
                    ShareLinks[a].setAttribute("onclick","window.open('" + getMyLink(theURL) + "'); return false") ;
					
					// Set the button image to the Mendeley icon
					ShareLinks[a].setAttribute("style","background-image:url(http://www.mendeley.com/graphics/mendeley.png)");
                }
            }
        }
		
		var ShareLinks = document.getElementsByTagName('a'); // Get all the links associated with an entry
		for (var a = 0; a < ShareLinks.length; a++) { // For all the links associated with the entry
			if (ShareLinks[a].getAttribute('onclick') == ShareOptionToReplace) { // If 'onclick' action of the link matches the specification to be replaced

				var TheIMGs = ShareLinks[a].getElementsByClassName("wikiWidgetAction highlightableIcon");
				for (var m = 0; m < TheIMGs.length; m++) {
					if (TheIMGs[m].getAttribute('title') == checkTitle) {
						 TheIMGs[m].setAttribute("src","http://www.mendeley.com/graphics/mendeley.png");                       
						 TheIMGs[m].setAttribute("title","Save to Mendeley");
					}
				}

				var theURL = ShareLinks[a].getAttribute('data-url'); // Get the URL provided by the article enty
				
				// Now set the onclick property of the button so that it will call the Mendeley importer with the correct article URL
				ShareLinks[a].setAttribute("onclick","window.open('" + getMyLink(theURL) + "'); return false") ;
			}
		}		
    } catch (err) { // Catch and report any errors
        txt = 'Error!\n';
        txt += err.name + ': ' + err.message + '\n';
        txt += err.fileName + ': ' + err.lineNumber;
        alert(txt)
    }
}

/* Run this function every second, because it can take awhile to load
the rss feed and also because the page loads more as you scroll down */
window.setInterval(function () {updateShareOption()}, 1000) 


// check to see if link must be updated
function getMyLink(theURL) {
    var myLink = NewShareByURL + theURL; // Set the new sharing URL to be associated with the 'onclick' event to the Mendeley import URL
										 // and include the URL provided by the article entry, as requested by the Mendeley import tool.
														 
	/* Now check to see if the URL provided by the article entry is
	from any of the problematic journal sources. If so, update the URL
	provided by the article entry to something Mendeley can understand.*/
	// Nature
	if (theURL.substring(0,check_Nature.length) == check_Nature) {
		var myLink = NewShareByDOI + get_Nature(theURL,check_Nature);
	}    
	
	// ScienceDirect
	if (theURL.substring(0,check_ScienceDirect.length) == check_ScienceDirect) {                        
		var myLink = NewShareByURL + get_ScienceDirect(theURL);
	}
	
	// elife
	if (theURL.substring(0,check_eLife.length) == check_eLife) {
		var myLink = NewShareByDOI + get_eLife(theURL);
	}

	return myLink
}


// Extract the DOI for Nature articles
function get_Nature(theURL,mycompstr) {
    var theDOI = theURL.substring(mycompstr.length,theURL.length+1);
    return theDOI;
}

// Extract the DOI for eLife articles
function get_eLife(theURL) {
    // http://elife.elifesciences.org/cgi/content/short/3/0/e01539?rss=1
    var myDOITMPi = theURL.lastIndexOf("/")
    var myDOITMP = theURL.substring(myDOITMPi+2,theURL.length) // +2 to get rid of /e
    var myDOITMPi = myDOITMP.indexOf("?")
    var myDOI = myDOITMP.substring(0,myDOITMPi)
    var theDOI = "10.7554/eLife." + myDOI
    return theDOI
}

// Extract the pii for ScienceDirect articles and use it to form a new URL
function get_ScienceDirect(theURL) {
    var searchfor = "piikey%3D" 
    var mypiiTMPi = theURL.indexOf(searchfor)
    var mypiiTMP = theURL.substring(mypiiTMPi+searchfor.length,theURL.length)
    var mypiiTMPi = mypiiTMP.indexOf("%26")
    var mypii = mypiiTMP.substring(0,mypiiTMPi)
    var theNewURL = "http://www.sciencedirect.com/science/article/pii/" + mypii
    return theNewURL
}