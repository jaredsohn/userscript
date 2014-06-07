//////////////////////////////////////////////////
// Gmail and Google Reader Integrator v2.0
//////////////////////////////////////////////////
//Author:
//	Winston Teo, inspired by Mihai@http://persistent.info/archives/2006/10/13/google-reader-redux
//Description:
//	This script integrates Google Reader into Gmail, built for Greasemonkey.
//Requirements:
//	Firefox Browser
//	Greasmonkey Extension    
//Features:
//	1. Spilt-window view of Gmail and Reader on a single page
//	2. Links to collapse|expand either Gmail or Reader
//	3. Integrated Reader uses start-page as specified in Reader's "Settings"
//	4. Labels selector  
//	5. Key 'v' to open Reader links in a new Window
//	6. Automatic resize of Gmail and Reader views
//Credits:
//	Mihai @ http://persistent.info/ for having such a good code basis for me to learn and start with.
//	I used some of his functions as listed:
//		function newNode, getNode, hasClass, addClass, removeClass, getClassMap, updateFeedsCount
//Changelog:
//  1. 06-11-2006: Removed Reader on clicking "Contacts" link
//  2. 09-11-2006: Resolved variable naming bug; from READER_SHARED_URL to READER_BROADCAST_URL
//  3. 10-11-2006: Resolved default start-page issue; able to display "Home" as default start-page

//////////////////////////////////////////////////
// ==UserScript==
// @name          Gmail + Reader Integrator
// @namespace     http://www.winstonyw.com
// @description   Integrates Google Reader into Gmail, built for Greasemonkey.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://www.google.com/reader/*
// ==/UserScript==

//////////////////////////////////////////////////
//Setting of DEFAULTS
//////////////////////////////////////////////////
//Note: All Links have to end with ?embed
//		In this way, only the Reader view embedded in Gmail would be affected by the style changes,
//		and not the Reader view even at its own URL: www.google.com/reader/view
const READER_HOME_URL       = 'http://www.google.com/reader/view?embed';
const READER_LIST_URL       = 'http://www.google.com/reader/view/user/-/state/com.google/reading-list?embed';
const READER_STARRED_URL    = 'http://www.google.com/reader/view/user/-/state/com.google/starred?embed';
const READER_BROADCAST_URL  = 'http://www.google.com/reader/view/user/-/state/com.google/broadcast?embed';
const READER_LABEL_URL      = 'http://www.google.com/reader/view/user/-/label/' ;
const UNREAD_COUNT_API      = 'http://www.google.com/reader/api/0/unread-count?all=true&output=json&client=gm';
const PREFERENCES_API       = 'http://www.google.com/reader/api/0/preference/list?output=json&client=gm';
const LABELS_LIST_API       = 'http://www.google.com/reader/api/0/tag/list?output=json&client=gm'

//Local Storage for ALL Labels as retrieved from Reader
//Note: GM_setValue only allows for integers, strings and booleans
var LABELS = [];

//Default Heights in Split-Window mode
//Change these according to your preference
const READER_EMBED_HEIGHT = 400;
const GMAIL_SPLIT_HEIGHT  = 220;

//////////////////////////////////////////////////
//CSS Styles
//////////////////////////////////////////////////
//Styles for:
//  Frame wrapping an iFrame (with Reader in iFrame)
//  Reader Links on LHS Navigation
//  Labels Selector
const READER_FRAME_STYLES =
    "#readerFrame {" +
    "  width: 100%;" +
    "  border: 0px;" +
    "  padding: 0px;" +
    "}" +
      
    "#readerEmbed {" +
    "  width: 100%;" +
    "  height: " + READER_EMBED_HEIGHT + "px;" +
    "  border: 0px;" +
    "  padding: 0px;" +
    "}" +
     
    "#readerLabelsSelection {" +
    "  width: 80%;" +
    "  font-family: arial,sans-serif;" +
    "  font-size: 100%;" +
    "}" +
    
    //Selected Link appears UNSELECTED
    //Usage: hideGmail
    ".readerEmbed table.cv * {"+
    "  background: #FFFFFF;" +
    "  font-weight: normal;" +
    "}";    

//Styles for Website (www.google.com/reader...?embed) contained in iFrame
//Removes Logo, Navigation, Menu + Displays Main Window         
const FORMAT_READER_STYLES =
    "body {" +
    "  background: #FFFFFF;" +
    "}" +

    "#nav," +
    "#logo-container," +
    "#global-info," +
    "#viewer-header," +
    "#home-header," +
    ".home-header-box," +
    "#recent-activity," +   
    "#footer {" +
    "  display: none !important;" +
    "}" +

    "#main {" +
    "  margin-top: 0;" +
    "}" +

    "#chrome {" +
    "  margin-left: 0;" +
    "}";

        
////////////////////////////////////////////////////////////////////////////////////////////////////
//Start Execution of Script
////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
//Detects Google Reader (in iFrame) and updates CSS in Google Reader to hide specific elements
//////////////////////////////////////////////////
//Note: Header MUST contain: @include http://www.google.com/reader/*
//      Then, http://www.google.com/reader/* will include a copy of JS, and only execute this conditional clause.
//Note: document.location.search returns ONLY QUERY STRING.. ?embed
if (document.location.hostname == 'www.google.com' && document.location.search.indexOf('embed') != -1) {
    GM_addStyle(FORMAT_READER_STYLES);
    addKeypressEvents();
}          

//Method Name: addKeypressEvents()
//Description: Adds keypress events to current window.
//        	   Currently events include:
//                 1. Key 'v' opens Reader links in new Window/Tab
function addKeypressEvents() {
    document.addEventListener('keypress', openInNewWindow, false);
}

//Method Name: openInNewWindow()
//Description: Key 'v' opens Reader links in new Window/Tab
function openInNewWindow (event) {

    var code = event.keyCode ? event.keyCode : event.which;
    var char = String.fromCharCode(code);
   
    if (char == 'v') {
   
        var currEntry = getNode('current-entry');
       
        if (!currEntry) return;
       
        currEntryHREF = document.evaluate(
                            "//div[@id='current-entry']//a[@href]",
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
       
        window.open (currEntryHREF.snapshotItem(0).href, 'target=newWin');

    }

}

//////////////////////////////////////////////////
//Detects Gmail + Displays Google Reader
//////////////////////////////////////////////////
if (document.location.hostname == 'mail.google.com') {
    GM_addStyle(READER_FRAME_STYLES);
    addReader();   
}

//Method Name: addReader()
//Description: Adds Reader in iFrame below Inbox
//        	   Displays Reader Links (and Feed Counts) in #nav, with Links to specific Labels
//        	   Stores Global Variables: Gmail Frame Height + Default Reader start-page in Reader's settings
function addReader() {
    
    //Only Display in Messages view (Inbox, Starred, Sent etc);
    //No Display in misc iFrames, or "Compose Mail" view, or "Contacts" view
    if (!getNode('co') || getNode('msgs') || getNode('cm_compose') || getNode('ctm') || getNode('cnt')) return;   

    //Stores Global Variable
	setHeight();
    setReaderSourceURL();
           
    //Create Links, Feed Counts  
    setNavLink(); updateFeedsCount();
    //Create Label Selector
    setReaderLabelsSelection();
    
    //Create iFrame
    setReaderFrame();
     
    window.setInterval (updateFeedsCount, 5 * 60 * 1000);
                            
}

//Method Name: setNavLink()
//Description: Displays Reader Links (and Feed Counts), and Show|Hide Gmail Link in #nav.
function setNavLink() {
    
	var separator           = newNode('div');
    separator.innerHTML     = '<br>';
	
    //Reader Link in #nav   
    var navReaderLink       = newNode('div');
    navReaderLink.className = 'nl';
    navReaderLink.innerHTML = '<span id="navReaderLink" class="lk"><b>Reader <span id="unreadCount"></span></b></span>';
   
    //Insert BEFORE Contacts Link
    var contNode = getNode('cont');
    contNode.parentNode.parentNode.insertBefore(separator, contNode.parentNode);
    contNode.parentNode.parentNode.insertBefore(navReaderLink, contNode.parentNode);
    
    //Event to Show|Hide Reader
    navReaderLink.addEventListener('click', setReaderVisibility, false);  
        
    //Gmail Show|Hide Link                 
    var GmailToggle         = newNode ('div');
    GmailToggle.className   = 'nl';
    GmailToggle.innerHTML   = '<span id="GmailToggle" class="lk">Collapse Gmail</span>';
    
    //Insert AFTER Trash Link
    var navNode = getNode('nds');
    navNode.parentNode.insertBefore(GmailToggle, navNode.nextSibling);
       
    //Event to Show|Hide Gmail
    GmailToggle.addEventListener('click', setGmailVisibility, false);
    //Event to Show Gmail on clicking any link in #nds
    getNode('nds').addEventListener('click', showGmail, false);
   
}

//Method Name: setReaderFrame()
//Description: Creates a Frame that contains an iFrame (embedded with Reader) and appends below #co (Inbox, Starred etc)
function setReaderFrame() {

    var readerFrame            = newNode('div');
    readerFrame.id             = 'readerFrame';
    readerFrame.className      = 'thc';
       
    var readerFrameTop         = newNode('div');
    readerFrameTop.className   = 'tbc';
       
    var readerFrameLinks       = newNode('div');
    readerFrameLinks.id        = 'readerFrameLinks';
    readerFrameLinks.className = 'tbcs';
       
    var readerLink             = newNode ('div');
    readerLink.id              = 'readerLink';
    readerLink.className       = 'l';
    readerLink.innerHTML       = '<img id="readerLinkImg" src="images/triangle.gif"></img> Google Reader';
    
    readerLink.addEventListener ('click', setReaderVisibility, false);
                 
    readerFrame.appendChild     (readerFrameTop);
    readerFrameTop.appendChild  (readerFrameLinks);
    readerFrameLinks.appendChild(readerLink);
       
    var mailFrame       = getNode('co');
    var separator       = newNode('div');
    separator.innerHTML = '<br>';
   
    mailFrame.appendChild(separator);
    mailFrame.appendChild(readerFrame);
   
}

//Method Name: setReaderSourceURL()
//Description: Retrieves Reader's settings page through API @ PREFERENCES_API, 
//			   and uses value for start-page, as set by User in Google Reader, as start-page for viewReader() method call
function setReaderSourceURL() {
   
    GM_xmlhttpRequest({
        method: 'GET',
        url: PREFERENCES_API,
        onload: function(responseDetails) {
           
            var data  =  eval ("(" + responseDetails.responseText + ")");
			
            for (var i = 0 ; i<data.prefs.length ; i++) {
				
                var prefsPair = data.prefs[i]
                
                if (prefsPair.id.indexOf("start-page") != -1){
	                //alert(array[i]);
	                if (prefsPair.value.indexOf('home') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_HOME_URL);
                    } else
                    if (prefsPair.value.indexOf('reading-list') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_LIST_URL);
                    } else
                    if (prefsPair.value.indexOf('starred') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_STARRED_URL);                           
                    } else
                    if (prefsPair.value.indexOf('broadcast') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_BROADCAST_URL);
                    } else
                    if (prefsPair.value.indexOf('label') != -1) {
                        var LABEL = prefsPair.value.substring(prefsPair.value.lastIndexOf('/')+1, prefsPair.value.length);
                        //alert (LABEL);
                        GM_setValue('READER_SOURCE_URL', READER_LABEL_URL + LABEL + '?embed');
                        GM_setValue('LABEL', LABEL);
                    }   
                }
            }
		}       
    });
   
}

/***********************************
 //Obsolete: This method reads the HTML of Reader setting's and is easily breakable.
 //Refer instead to the same method name which uses API and JSON.
function setReaderSourceURL() {
   
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.google.com/reader/settings?nochrome',
        onload: function(responseDetails) {
           
            var data  =  responseDetails.responseText;
           
            var array = data.split('\n');
           
            for (var i=0; i<array.length; i++) {
           
                if (array[i].indexOf('selected="selected"') != -1 ) {
                    //alert(array[i]);
                    if (array[i].indexOf('reading-list') != -1 || array[i].indexOf('home') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_LIST_URL);
                    } else
                    if (array[i].indexOf('starred') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_STARRED_URL);                           
                    } else
                    if (array[i].indexOf('broadcast') != -1) {
                        GM_setValue('READER_SOURCE_URL', READER_BROADCAST_URL);
                    } else
                    if (array[i].indexOf('label') != -1) {
                        var LABEL = array[i].substring(array[i].lastIndexOf('/')+1, array[i].lastIndexOf('\"'));
                        //alert (LABEL);
                        GM_setValue('READER_SOURCE_URL', READER_LABEL_URL + LABEL + '?embed');
                        GM_setValue('LABEL', LABEL);
                    }   
                   
                }
                       
            } 
                       
        } 
               
    });
   
}
***********************************/

//////////////////////////////////////////////////
//Reader Labels Selector
//////////////////////////////////////////////////
//Method Name: setReaderLabelsSelection()
//Description: Creates Reader Labels Selection from Global Variable LABELS[] in LHS Navigation when Reader is visible 
function setReaderLabelsSelection() {
   
    var selectionNode         = newNode('div');
    selectionNode.className   = 'nl';
       
    var readerLabelsSelection = newNode('select');
    readerLabelsSelection.id  = "readerLabelsSelection";
    
   	//Default: Hidden; Display only when Reader Frame is visible 
    readerLabelsSelection.style.visibility = 'hidden';
    
    selectionNode.appendChild(readerLabelsSelection);
    
   	var separator             = newNode('div');
    separator.innerHTML       = '<br>';
       
    var navReaderLink = getNode('navReaderLink');
    navReaderLink.parentNode.parentNode.insertBefore(separator, navReaderLink.parentNode.nextSibling);
    navReaderLink.parentNode.parentNode.insertBefore(selectionNode, navReaderLink.parentNode.nextSibling);
  
    var opList            = newNode('option');
    opList.value          = READER_LIST_URL;
    opList.innerHTML      = 'All';
	if (GM_getValue('READER_SOURCE_URL') == READER_LIST_URL) 
		opList.selected = true;
    
    var opStarred         = newNode('option');
    opStarred.value       = READER_STARRED_URL;
    opStarred.innerHTML   = 'Starred';
    if (GM_getValue('READER_SOURCE_URL') == READER_STARRED_URL) 
    	opStarred.selected = true;
    
    var opBroadcast       = newNode('option');
    opBroadcast.value     = READER_BROADCAST_URL;
    opBroadcast.innerHTML = 'Shared';
    if (GM_getValue('READER_SOURCE_URL') == READER_BROADCAST_URL) 
    	opBroadcast.selected = true;

    readerLabelsSelection.appendChild(opList);
    readerLabelsSelection.appendChild(opStarred);
    readerLabelsSelection.appendChild(opBroadcast);
   
    //Initializes Global Variable, and appends to Selection Node
    setReaderLabels();
            
    readerLabelsSelection.addEventListener('change', switchView, false);
             
}

//Method Name: setReaderLabels()
//Description: Retrieves Labels from JSON API and stores as Global Variables  
function setReaderLabels() {
          
    var readerLabelsSelection = getNode("readerLabelsSelection");
   
    if (!readerLabelsSelection) return;
 
    GM_xmlhttpRequest({
        method: "GET",
        url: LABELS_LIST_API,
        onload: function(responseDetails) {
             
            var data = eval("(" + responseDetails.responseText + ")");
           
			for (var i = 0 ; i<data.tags.length ; i++) {
				
                var tagsPair = data.tags[i]
                
                if (tagsPair.id.indexOf("label") != -1){
                    
                    var LABEL = tagsPair.id.substring(tagsPair.id.lastIndexOf('/')+1, tagsPair.id.length);
                   
                    LABELS.push(LABEL);
                    
                    var opLabel = newNode('option');
                    opLabel.value = READER_LABEL_URL + LABEL + '?embed';   
                    opLabel.innerHTML = LABEL;
                    if (GM_getValue('READER_SOURCE_URL') == opLabel.value) 
                    	opLabel.selected = true;
       
                    readerLabelsSelection.appendChild(opLabel);
                    
                }
            }
		}
	});
  
}

//Method Name: switchView(event)
//Description: Switches Reader view in iFrame according to selection in Reader Labels Selection
function switchView(event) {

    var readerLabelsSelection = getNode('readerLabelsSelection');
       
    for (var i=0; childNode = readerLabelsSelection.childNodes[i]; i++) {
        if (childNode.selected) {
            //alert('URL:' childNode.value);
            GM_setValue('READER_SOURCE_URL', childNode.value);   
            break;   
        }
    }
   
    hideReader();
    viewReader();
    resizeReaderFrame();
   
}

//////////////////////////////////////////////////
//Gmail Visibility
//////////////////////////////////////////////////
//Method Name: setGmailVisibility (event)
//Description: Toggles Gmail Frame visibility by calling showGmail() or hideGmail()
function setGmailVisibility (event) {

    var GmailToggle = getNode('GmailToggle');
   
    if (GmailToggle.innerHTML.indexOf('Collapse') != -1) {
        hideGmail();
    } else {
        showGmail();   
    }
   
    resizeMailFrame();
    resizeReaderFrame();
   
    event.stopPropagation();
   
}

//Method Name: showGmail (event)
//Description: Shows Gmail Frame
function showGmail() {
   
    var GmailToggle = getNode('GmailToggle');
 
    //Shows Gmail
    var mailFrame = getNode('co');
    for (var i = mailFrame.firstChild; i.id != 'readerFrame'; i = i.nextSibling) {
        i.style.display='';           
    }

    //Adds "highlight" to Link in #nav
    removeClass(document.body, 'readerEmbed');
        
    //Change Link in #nav, from "Show" to "Hide"
    GmailToggle.innerHTML = 'Collapse Gmail';       
   
}

//Method Name: hideGmail (event)
//Description: Hides Gmail Frame
function hideGmail() {
       
    var GmailToggle = getNode('GmailToggle');
   
    //Hides Gmail
    var mailFrame = getNode('co');
    for (var i = mailFrame.firstChild; i.id != 'readerFrame'; i = i.nextSibling) {
        i.style.display='none';           
    }
    
    //Removes "highlight" from Link in #nav
    addClass(document.body, 'readerEmbed');
    
    //Change Link in #nav, from "Hide" to "Show"
    GmailToggle.innerHTML = 'Expand Gmail';
       
}

//////////////////////////////////////////////////
//Reader Visibility
//////////////////////////////////////////////////
//Method Name: setReaderVisibility(event)
//Description: Toggles Reader Frame visibility by calling viewReader() or hideReader()
//			   In addition, visibility of Label links at #nav is dependent on viewReader() or hideReader() method call
//			   Event can be activated by 2 Links, Navigation Link and Reader Frame Link
function setReaderVisibility(event) {
       
    var readerEmbed = getNode('readerEmbed');

    if (readerEmbed == null || (readerEmbed != null && readerEmbed.style.display == 'none')) {
        swapImg('show' , 'readerLinkImg');
        viewReaderLabelsSelection();
        viewReader();
    } else {
        swapImg('hide', 'readerLinkImg');
        hideReaderLabelsSelection();
        hideReader();
    }
   
    resizeMailFrame();
    resizeReaderFrame();
  
    event.stopPropagation();
     
}

//Method Name: viewReader()
//Description: Displays Reader Frame, and embeds READER_SOURCE_URL into iFrame
function viewReader() {

    var readerEmbed = getNode('readerEmbed');

    if (readerEmbed == null) {
       
        readerEmbed      = newNode('iframe');
        readerEmbed.id   = 'readerEmbed';
        readerEmbed.name = 'readerEmbed';
        readerEmbed.src  = GM_getValue('READER_SOURCE_URL');
        getNode('readerFrame').appendChild(readerEmbed);
       
    } 
    //Not Applicable - Reader is ALWAYS REMOVED in hideReader(), and not hidden through style properties
	//Reason: Saves on resources + Updated Reader iFrame on every viewReader() method call
    else {
		readerEmbed.style.display = '';
    }

}

//Method Name: hideReader()
//Description: Hides (Removes) Reader Frame
function hideReader() {
   
    var readerEmbed = getNode('readerEmbed');
    getNode('readerFrame').removeChild(readerEmbed);
    readerEmbed = null;
    
    //Problem with Memory Management?
    //readerEmbed.style.display="none";   
      
}

//Method Name: viewReaderLabelsSelection()
//Description: Displays Reader Labels Selection in LHS Navigation when Reader is visible
function viewReaderLabelsSelection() {
    getNode('readerLabelsSelection').style.visibility = 'visible';
}

//Method Name: hideReaderLabelsSelection()
//Description: Hidess Reader Labels Selection in LHS Navigation when Reader is invisible (removed)
function hideReaderLabelsSelection() {
    getNode('readerLabelsSelection').style.visibility = 'hidden';
}

//////////////////////////////////////////////////
//Aesthetic Functions
//////////////////////////////////////////////////
//Method Name: minHeight()
//Description: Determines Height for Gmail Frame
function setHeight() {

	//Original   
	GM_setValue('mailHeightOriginal', getNode('co').childNodes[1].clientHeight);

	//Split	
    if (GM_getValue('mailHeightOriginal') < GMAIL_SPLIT_HEIGHT) {
    	GM_setValue('mailHeightSplit', getNode('co').childNodes[1].clientHeight);
    }
    else {
	    GM_setValue('mailHeightSplit', GMAIL_SPLIT_HEIGHT);
    }
   
}

//Method Name: swapImg(key, id)
//Description: Imitates Contacts, Labels Box with Triangle GIF
function swapImg(key, id) {
   
    var elem = getNode(id);
   
    if (key == 'show')
        elem.src = 'images/opentriangle.gif';
    else
        elem.src = 'images/triangle.gif';
               
}

//Method Name: resizeMailFrame()
//Description: Resizes Gmail Frame based on presence of Reader Frame, or based on Click Events
function resizeMailFrame() {

	//Shrinks Gmail Frame in Split-Window mode
	var GMAIL_FRAME_SMALL =
    	".fs {" +
    	"  height: " + GM_getValue('mailHeightSplit') + "px !important;" +
    	"  overflow: auto;" +
    	"}";
    
	//Expands Gmail Frame in Single-Window mode
	var GMAIL_FRAME_LARGE =
    	".fs {" +
    	"  height: " + GM_getValue('mailHeightOriginal') + "px !important;" +
    	"  overflow: auto;" +
    	"}";
	
    if (!getNode('readerEmbed')) {
        GM_addStyle (GMAIL_FRAME_LARGE);
    }
    else {
	    GM_addStyle (GMAIL_FRAME_SMALL);      
    }
      
}

//Method Name: resizeReaderFrame()
//Description: Resizes Reader Frame based on Click Events
function resizeReaderFrame() {

    var readerEmbed = getNode('readerEmbed');
   
    if (!readerEmbed) return;
   
    if (getNode('co').firstChild.style.display == 'none') {
        readerEmbed.style.height = (window.innerHeight - readerEmbed.offsetTop) + "px";
    } else {
        readerEmbed.style.height = READER_EMBED_HEIGHT + "px";
    }
           
}

//////////////////////////////////////////////////
//Functions credited to Mihai @ http://persistent.info/
//////////////////////////////////////////////////
function updateFeedsCount() {
     
	var unreadCountNode = getNode("unreadCount");
   
    if (!unreadCountNode) return;
 
    GM_xmlhttpRequest({
        method: "GET",
        url: UNREAD_COUNT_API,
        onload: function(responseDetails) {
             
		var data = eval("(" + responseDetails.responseText + ")");
               
        	for (var i = 0, unreadCountPair ; unreadCountPair = data.unreadcounts[i] ; i++) {
                if (unreadCountPair.id.indexOf("reading-list") != -1) {
                	var count = unreadCountPair.count;
                    unreadCountNode.innerHTML = count == 0 ? '' : ' (' + count + (count == data.max ? '+' : '') + ') ';
                    break;
                }
            }
       }
	});
           
}

function newNode(type) {
	return unsafeWindow.document.createElement(type);
}

function getNode(id) {
	return unsafeWindow.document.getElementById(id);
}

function hasClass(node, className) {
	return className in getClassMap(node);
}

function addClass(node, className) {
	if (hasClass(node, className)) return;
   	node.className += " " + className;
}

function removeClass(node, className) {

	var classMap = getClassMap(node);

  	if (!(className in classMap)) return;
 
  	delete classMap[className];
  	var newClassList = [];
 
  	for (var className in classMap) {
    	newClassList.push(className);
  	}
 
  	node.className = newClassList.join(" ");

}

function getClassMap(node) {
	
	var classMap = {};
	var classNames = node.className.split(/\s+/);
 
  	for (var i = 0; i < classNames.length; i++) {
    	classMap[classNames[i]] = true;
  	}
 
  	return classMap;

}