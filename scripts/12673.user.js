// ==UserScript== 
// @name		Link to YouTube Video Pages from Embedded YouTube Videos
// @author     	Jake Kasprzak
// @namespace	http://www.jake.kasprzak.ca
// @version	0.2.5
// @description	Adds links below embedded YouTube videos to the pages on YouTube where these videos can be found.
// @include	* 
// @exclude	http://*youtube.*
// @exclude	http://*video.google.*
// ==/UserScript== 

(function() {
//this function checks if the URL it is passed is for embedding a YouTube video, and returns the node for a link to be added below the embedded video if it is
function checkIfVideo(theURL) {

	//first part of the URL in the link to be added
	var startOfURL = "http://youtube.com/watch?v=";
	
	//this regular expression matches what needs to be added to the startOfURL variable
	var re = new RegExp("http:\/\/.*youtube\.com\/v\/([^(\&|$.%)]*)");
	
	//check if a URL for an embedded video was passed to this function. Return the link node to be added if so, return 0 if not
	var result = re.exec(theURL);
	
	if (result) {
		
		//first part of the text of the link to be added
		var linkText = "YouTube - ";
		
		// what is to be added if video titles are not to be added to links
		var defaultTitle = "video page";
		
		//what is to be added to link if videos titles are to be displayed, but no title is found
		var notAvailable = "(Video Name Not Available)";
		
		//the link node that the information above and the URL are added to
		var linkNode = document.createElement('a');
		
		//then extract the data that is needed from the URL passed to the function, then add it to the link node to be added
		var partsOfURL = theURL.split(re);
		
		var videoID = partsOfURL[1];
		
		var link = startOfURL + videoID;
		
		linkNode.href = link;
		
		//if video titles are to be displayed in links, add these video titles
		//this is based on code in the YouTube Title adder v1.2 script that can be found at http://userscripts.org/scripts/show/12113
		if (displayTitles) {
		
			GM_xmlhttpRequest({
				method:"GET",
				url:link,
				headers:{"User-Agent":"monkeyagent"},
				onload:function(content){
					
					var videoName = content.responseText.match(/<title>YouTube - ([^<]+)<\/title>/); 
						
					if (!videoName) { 
						videoName = content.responseText.match(/<h1.*>([^<]+)<\/h1>/); 
					}
					if (!videoName) {
						videoName = content.responseText.match(/<meta name=\"title\" content=\"([^<]+)\">/);
					}
					if (!videoName) {
						linkText = linkText + notAvailable;
					}
					else {
						videoName[1] = videoName[1].replace(/\&amp;/g, '&');
						videoName[1] = videoName[1].replace(/\&lt;/g, '<');
						videoName[1] = videoName[1].replace(/\&gt;/g, '>');
						videoName[1] = videoName[1].replace(/\&quot;/g, '"');
						linkText = linkText + videoName[1];
					}
					
					linkNode = addToNode(linkNode, linkText);
					
				}
			}) //GM_xmlhttpRequest
		
		}
		//if the option for adding titles is disabled, simply mention in the link that it is a link to the page for the video
		else {
			linkText = linkText + defaultTitle;
			linkNode = addToNode(linkNode, linkText);		
		}
			
		return linkNode;

	} //if
	else {
		return 0;
	}
} //checkIfVideo


//given a link node and the text to be added to it, return the link node with a break tag before it followed by the link with the text to be in it
function addToNode(linkNode, linkText) {
	
	var breakNode = document.createElement('br');
	var linkTextNode = document.createTextNode(linkText);
	
	linkNode.appendChild(breakNode);
	linkNode.appendChild(linkTextNode);
	
	return linkNode;
} //addToNode


//this function is for initializing the menu option for adding/removing video titles to or from links
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff) {
  
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  
  // Add menu toggle (if true that it is set, turn it off, if not, turn it on (set the menu option right first))
  GM_registerMenuCommand((window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
	
  });
}  //makeMenuToggle


//variables for storing all nodes that the script tries to find, and each individual one of these nodes, respectively
var allLocations, thisLocation;

//variable for the node to be added, and the URL that is to be inserted in that node, respectively
var linkNode, theURL;

//create option for displaying video titles, and have it display video titles by default
makeMenuToggle("displayTitles", true, "Display Video Titles in Links to Embedded Videos", "Do Not Display Video Titles in Links to Embedded Videos");

//look for <embed> tags, as well as <object> tags that have data attributes as they might be used to embed videos 
allLocations = document.evaluate(
    "//object[@data] | //embed",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);	
	
//loop through each node that is found, check for embedded videos in tags it finds, and add links to YouTube pages if embedded YouTube videos are found
for (i = 0; i < allLocations.snapshotLength; i++) {
    
	linkNode = 0;
	theURL = 0;
	
	thisLocation = allLocations.snapshotItem(i);
	
	//how to get URL information depends on what kind of tags are used to embed the video
	switch (thisLocation.nodeName.toUpperCase()) {
        case 'OBJECT':
			
			theURL = thisLocation.data;
			break;
		
		case 'EMBED':
			theURL = thisLocation.src;
			break;
		
	}
	
	if (theURL) {
		linkNode = checkIfVideo(theURL);
	}
	
	if (linkNode) {		
		//the link must be added immediately after the object, not as a child of an object tag, so that the NoScript Firefox extension will not remove it
		if (thisLocation.parentNode.nodeName.toUpperCase()=="OBJECT") {
			thisLocation.parentNode.parentNode.insertBefore(linkNode, thisLocation.parentNode.nextSibling);
		}
		
		else {
			thisLocation.parentNode.insertBefore(linkNode, thisLocation.nextSibling);
		}
	}
		
} //for	

})();