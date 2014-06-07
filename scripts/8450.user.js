////////////////////////////////////////////////////////
// Gmail and Google Reader Integrator v2.2
// Based on Script by Winston Teo (See infomation below)
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
//Made some visual changes as well as added some features
//
//Author:
// Nick Chirchirillo
//
//Credits:
//  This script is the modification to the script by Winston Teo http://www.winstonyw.com/2006/11/03/greasemonkey-script-gmail-and-reader-integrator/
//	Mihai @ http://persistent.info/ 
//  Winston Teo @ http://www.winstonyw.com/2006/11/03/greasemonkey-script-gmail-and-reader-integrator/
//  Everything I used to make my changes came from the code that was already here
//
//Changelog:
//  1. 04-11-2007: Moved Collapse Gmail link to under Compose Mail
//  2. 04-11-2007: Removed unnessasary spaces
//  3. 04-11-2007: Added Google Reader favicon to Reader link
//  4. 04-11-2007: Added a Launch Reader link to open Google Reader in a new window
//  5. 04-11-2007: Added a Home link
//  6. 04-11-2007: Made Reader's labels collapsable
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
//Replaces the dropdown with a tree menu
//
//Author:
// Pradeep Chandiramani (http://chandiramani.info)
//
//Credits:
//  This script is the modification to the script by Winston Teo http://www.winstonyw.com/2006/11/03/greasemonkey-script-gmail-and-reader-integrator/
//	Mihai @ http://persistent.info/ 
//  Winston Teo @ http://www.winstonyw.com/2006/11/03/greasemonkey-script-gmail-and-reader-integrator/
//
//Changelog:
//  1. 06-02-2007: Replaced dropdown with menu
//
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// Information on Gmail and Google Reader Integrator v2.0
/////////////////////////////////////////////////////////
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
const READER_HOME_URL			= 'http://www.google.com/reader/view?embed';
const READER_LIST_URL			= 'http://www.google.com/reader/view/user/-/state/com.google/reading-list?embed';
const READER_STARRED_URL		= 'http://www.google.com/reader/view/user/-/state/com.google/starred?embed';
const READER_BROADCAST_URL		= 'http://www.google.com/reader/view/user/-/state/com.google/broadcast?embed';
const READER_LABEL_URL			= 'http://www.google.com/reader/view/user/-/label/' ;
const READER_FEED_URL			= 'http://www.google.com/reader/view/'
const UNREAD_COUNT_API			= 'http://www.google.com/reader/api/0/unread-count?all=true&output=json&client=gm';
const PREFERENCES_API			= 'http://www.google.com/reader/api/0/preference/list?output=json&client=gm';
const LABELS_LIST_API			= 'http://www.google.com/reader/api/0/tag/list?output=json&client=gm';
const SUBSCRIPTION_LIST_API		= 'http://www.google.com/reader/api/0/subscription/list?output=json&client=gm';


//Images for the subscription panel
const IMAGE_FOLDER_CLOSED		= 'http://www.google.com/reader/ui/848719042-tree-view-folder-closed.gif';
const IMAGE_FOLDER_OPEN			= 'http://www.google.com/reader/ui/1113767132-tree-view-folder-open.gif';
const IMAGE_PLUS				= 'http://www.google.com/reader/ui/3962655764-tree-view-plus.gif';
const IMAGE_MINUS				= 'http://www.google.com/reader/ui/2859029755-tree-view-minus.gif';
const IMAGE_FEED				= 'http://www.google.com/reader/ui/338499216-feed-icon-12.png';
const IMAGE_SHARED				= 'http://www.google.com/reader/ui/2797636568-icon-broadcast.png';
const IMAGE_STARRED				= 'http://www.google.com/reader/ui/3499563204-star_active.png';
const IMAGE_ALL					= 'http://www.google.com/reader/ui/117279103-icon-reading-list.gif';
const IMAGE_HOME				= 'http://www.google.com/reader/ui/2018795750-icon-overview.gif';
const IMAGE_LAUNCH				= 'http://mail.google.com/mail/images/tearoff_icon.gif';


//Local Storage for ALL Labels as retrieved from Reader
//Note: GM_setValue only allows for integers, strings and booleans
var LABELS = [];

//Local Storage for all feeds 
var FEEDS = [];

//Feed object
function feed()
{
	this.title="";
	this.url="";
	this.categories=[];
}

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
    "}"+    
	
	".readerFeedsList {" +
    "  margin: 0;"+
	"  padding: 0 0 0 15px;" +
	"  list-style-type:none;" +
    "}" +

	".readerCatList {" +
    "  margin: 0;"+
	"  width: 98%;"+
	"  padding: 0;" +
	"  list-style-type:none;" +
	"  overflow:hidden;"+
	"}" +
	
	".readerFeedLabel {" +
	"  list-style-type:none;" +
    "}"  +
	
	"#FeedsDiv {" +
	"  background: #C3D9FF;" +
	"  padding: 0;" +
	"  width: 95%;"+
	"  display:none;" +
    "}"  +

	"#LabelsDiv {" +
	"  background: #C3D9FF;" +
	"  padding: 0;" +
	"  width: 95%;"+
	"  display:none;" +
	" overflow:hidden;" +
    "}"  +

	"#BottomDiv {" +
	"  display:none;" +
    "}"  +

	"b.rtop, b.rbottom{display:block;background: #FFF}"+
	"b.rtop b, b.rbottom b{display:block;height: 1px;overflow: hidden; background: #C3D9FF}"+
	"b.r1{margin: 0 5px}"+
	"b.r2{margin: 0 3px}"+
	"b.r3{margin: 0 2px}"+
	"b.rtop b.r4, b.rbottom b.r4{margin: 0 1px;height: 2px}";	

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
     
    window.setInterval (updateFeedsCount, 30 * 1000);
                            
}

//Method Name: setNavLink()
//Description: Displays Reader Links (and Feed Counts), and Show|Hide Gmail Link in #nav.
function setNavLink() {
	
    //Reader Link in #nav   
    var navReaderLink       = newNode('div');
    navReaderLink.className = 'nl';
    navReaderLink.innerHTML = '<span id="navReaderLink" class="lk">Reader <span id="unreadCount"></span> <img src="http://google.com/reader/ui/favicon.ico"></span>';

    //Insert AFTER Trash Link
    var custNode = getNode('nds');
    custNode.parentNode.insertBefore(navReaderLink, custNode.nextSibling);
    
    //Event to Show|Hide Reader
    navReaderLink.addEventListener('click', setReaderVisibility, false);  
        
    //Gmail Show|Hide Link                 
    var GmailToggle         = newNode ('div');
    GmailToggle.className   = 'nl';
    GmailToggle.innerHTML   = '<span id="GmailToggle" class="lk">Collapse Gmail</span>';
    
    //Insert AFTER Compose Link
    var navNode = getNode('comp');
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
   
    //Initializes Global Variable, and appends to Selection Node
    setReaderLabels();
    
}

//Method Name: setReaderLabels()
//Description: Retrieves Labels from JSON API and stores as Global Variables  
function setReaderLabels() {
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
                    
                }
            }
			LABELS.push('uc76528q');
			setSubscriptions();
		}
	});
  
}

//Method Name: setSubscriptions()
//Description: Retrieves Subscriptions from JSON API and stores as Global Variables  
function setSubscriptions() {
    GM_xmlhttpRequest({
        method: "GET",
        url: SUBSCRIPTION_LIST_API,
        onload: function(responseDetails) {
             
            var data = eval("(" + responseDetails.responseText + ")");
            for (var i = 0 ; i<data.subscriptions.length ; i++) {
			    var subscription= new feed();
                subscription.title=data.subscriptions[i].title;
                subscription.url=data.subscriptions[i].id;
                for (var j = 0 ; j<data.subscriptions[i].categories.length ; j++) {
					subscription.categories.push(data.subscriptions[i].categories[j].label);
                }
				if(0==data.subscriptions[i].categories.length){
					subscription.categories.push("uc76528q")
				}
                FEEDS.push(subscription);
            }
			
			setFeedList();
		}
	});
}
 
function setFeedList(){

	var head=unsafeWindow.document.getElementsByTagName("head");
	var collapseScript= newNode('script');
	collapseScript.innerHTML =	'function toggleList(label){'+'\n'+
								'   var IMAGE_MINUS ="'+IMAGE_MINUS+'";'+'\n'+
								'	var IMAGE_PLUS  = "'+IMAGE_PLUS+'";'+'\n'+
								'   var listElementStyle=document.getElementById(label+"FeedsList").style;'+'\n'+
								'    if (listElementStyle.display=="none"){'+'\n'+
								'      listElementStyle.display="block";'+'\n'+
								'      document.getElementById(label+"Image").src=IMAGE_MINUS;'+'\n'+
								'      document.getElementById(label+"Image").alt="Close feeds";'+'\n'+
								'    }else{'+'\n'+
								'      listElementStyle.display="none";'+'\n'+
								'      document.getElementById(label+"Image").src=IMAGE_PLUS;'+'\n'+
								'      document.getElementById(label+"Image").alt="Open feeds";'+'\n'+
								'    }'+'\n'+
								'  }';
	head[0].appendChild(collapseScript);
	
	var selectionNode         = newNode('div');
    selectionNode.className   = 'nl';
	selectionNode.id		  ='FeedsDiv';
	
	
	var catList					= newNode('ul');
	catList.className			= 'readerCatList';
	catList.id					= 'readerCatList';
	
	var currLabel;
	
   currLabel='Launch Reader';
    var liLaunch			= newNode('li');
	liLaunch.className	= 'readerLabel';
	liLaunch.id			= 'readerLabel';
    liLaunch.innerHTML	= '<img src="'+IMAGE_LAUNCH+'" alt="Launch Reader" style="margin-right:5px;">';
	liLaunch.innerHTML	+='<a href="http://google.com/reader" target="_blank">'+currLabel+'</a>';
	catList.appendChild(liLaunch);

    currLabel='Home';
    var liHome			= newNode('li');
	liHome.className	= 'readerFeedLabel';
	liHome.id			= 'readerFeedLabel';
    liHome.innerHTML	= '<img src="'+IMAGE_HOME+'" alt="All feeds" style="margin-right:5px;">';
	liHome.innerHTML	+='<a href="javascript:void(0)">'+currLabel+'</a>';
	liHome.URL          = READER_HOME_URL;
	liHome.addEventListener('click', switchView, false); 
	catList.appendChild(liHome);

    currLabel='All';
    var liList			= newNode('li');
	liList.className	= 'readerFeedLabel';
	liList.id			= 'readerFeedLabel';
    liList.innerHTML	= '<img src="'+IMAGE_ALL+'" alt="All feeds" style="margin-right:5px;">';
	liList.innerHTML	+='<a href="javascript:void(0)">'+currLabel+'</a>';
	liList.URL          = READER_LIST_URL;
	liList.addEventListener('click', switchView, false); 
	catList.appendChild(liList);


    currLabel='Starred';
    var liStarred			= newNode('li');
	liStarred.className		= 'readerFeedLabel';
	liStarred.id			= 'readerFeedLabel';
    liStarred.innerHTML		= '<img src="'+IMAGE_STARRED+'" alt="Starred" style="margin-right:5px;">';
	liStarred.innerHTML		+='<a href="javascript:void(0)">'+currLabel+'</a>';
	liStarred.URL       	= READER_STARRED_URL;
	liStarred.addEventListener('click', switchView, false); 
	catList.appendChild(liStarred);

    currLabel='Shared';
    var liBroadcast			= newNode('li');
	liBroadcast.className	= 'readerFeedLabel';
	liBroadcast.id			= 'readerFeedLabel';
    liBroadcast.innerHTML	= '<img src="'+IMAGE_SHARED+'" alt="Starred" style="margin-right:5px;">';
	liBroadcast.innerHTML	+='<a href="javascript:void(0)">'+currLabel+'</a>';
	liBroadcast.URL         = READER_BROADCAST_URL;
	liBroadcast.addEventListener('click', switchView, false); 
	catList.appendChild(liBroadcast);

    currLabel='Reader Labels';
    var liLabel			= newNode('li');
	liLabel.className	= 'readerLabel';
	liLabel.id			= 'readerLabel';
    liLabel.innerHTML       = '<img id="labelImg" src="images/opentriangle.gif">  <a href="javascript:void(0)">'+currLabel+'</a>';
	liLabel.addEventListener ('click', setLabelVisibility, false);
	catList.appendChild(liLabel);
    

	LABELS.sort();

	var selectionNode2         = newNode('div');
    selectionNode2.className   = 'nl';
	selectionNode2.id		  ='LabelsDiv';
	
	var labelList					= newNode('div');
	labelList.className			= 'readerLabelList';
	labelList.id					= 'readerLabelList';
	
	for (var i = 0 ; i<LABELS.length ; i++) {
		var catListLabel		= newNode('li');
		if('uc76528q' != LABELS[i])
			currLabel = LABELS[i];
		else currLabel 			= "Uncategorized";
		catListLabel.className	= 'readerFeedLabel';
		catListLabel.id			= 'readerFeedLabel';
		catListLabel.innerHTML  = '<img id="'+currLabel+'Image" src="'+IMAGE_PLUS+'" alt="Open feeds" onClick="toggleList(\''+currLabel+'\');" style="padding: 0px 10px 0px 10px;">';
		
		var catListLabelLink= newNode('a');
		catListLabelLink.href = 'javascript:void(0)';
		catListLabelLink.innerHTML  = currLabel;
		if('uc76528q' != LABELS[i]){
			catListLabelLink.URL = READER_LABEL_URL + currLabel + '?embed';
			catListLabelLink.addEventListener('click', switchView, false); 
		}
		catListLabelLink.id='rfl'+ currLabel;
		catListLabel.appendChild(catListLabelLink);
		
		var feedsList			= newNode('li');
		feedsList.className		= 'readerFeedsList';
		feedsList.id			= currLabel+'FeedsList';
		feedsList.style.display	= 'none';
		
		
		for (var j = 0 ; j<FEEDS.length ; j++) {
			if(FEEDS[j].categories.indexOf(LABELS[i])!=-1){
				var feedItem			= newNode('li');
				feedItem.className		= 'readerFeedItem';
				feedItem.id				= 'readerFeedItem';
				feedItem.innerHTML		= '<img src="'+IMAGE_FEED+'" alt="Feed" style="margin-right:5px;">';
				feedItem.innerHTML		+='<a href="javascript:void(0)" id="'+FEEDS[j].url+'">'+FEEDS[j].title+'</a>';
				feedItem.URL			= READER_FEED_URL+FEEDS[j].url+ '?embed';
				feedItem.addEventListener('click', switchView, false); 
				
				feedsList.appendChild(feedItem);
			}
		}
		labelList.appendChild(catListLabel);
		labelList.appendChild(feedsList);
	}
	
	var rtop = newNode('b');
	rtop.className='rtop';
	rtop.innerHTML = '<b class="r1"></b><b class="r2"></b><b class="r3"></b><b class="r4"></b>';
	
	rbottom = newNode('b');
	rbottom.className='rbottom';
	rbottom.id = 'BottomDiv';
	rbottom.innerHTML = '<b class="r4"></b><b class="r3"></b><b class="r2"></b><b class="r1"></b>';
	rbottom.style.width = '95%';
	
	selectionNode.appendChild(rtop );
	selectionNode.appendChild(catList);
	selectionNode2.appendChild(labelList);
    
    var navReaderLink = getNode('navReaderLink');
    navReaderLink.parentNode.parentNode.insertBefore(selectionNode, navReaderLink.parentNode.nextSibling);
    selectionNode.parentNode.insertBefore(selectionNode2, selectionNode.nextSibling);
    selectionNode2.parentNode.insertBefore(rbottom, selectionNode2.nextSibling);
	
	rbottom = null;
	updateFeedsCount();
} 


//Method Name: switchView(event)
//Description: Switches Reader view in iFrame according to selection in Reader Labels Selection
function switchView(event) {

    GM_setValue('READER_SOURCE_URL', this.URL);   
	hideReader();
    viewReader();
    resizeReaderFrame();
	 return 0;
   
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

//////////////////////////////////////////////////
//Label Visibility
//////////////////////////////////////////////////
//Method Name: setLabelVisibility(event)
//Description: Toggles Label visibility by calling viewLabels() or hideLabels()

function setLabelVisibility() {

var labels = getNode('LabelsDiv');

    if (labels.style.display == 'none') {
        swapImg('show' , 'labelImg');
        viewLabels();
    } else {
        swapImg('hide', 'labelImg');
        hideLabels();
    }
     
}

//Method Name: hideLabels()
//Description: Hides labels and creates a new bottom for the box
function hideLabels() {

	var labelNode = getNode('LabelsDiv')

	//Hides the labels
	labelNode.style.display = "none";      
}

//Method Name: viewLabels()
//Description: Shows Labels and removes the bottom of the box created by hideLabels()
function viewLabels() {

    var labelNode = getNode('LabelsDiv'); 

    //Shows the labels
    labelNode.style.display = "block";  
      
}

//Method Name: viewReaderLabelsSelection()
//Description: Displays Reader Labels Selection in LHS Navigation when Reader is visible
function viewReaderLabelsSelection() {
    getNode('FeedsDiv').style.display = 'block';
    getNode('LabelsDiv').style.display = 'block';
    getNode('BottomDiv').style.display = 'block';
}

//Method Name: hideReaderLabelsSelection()
//Description: Hidess Reader Labels Selection in LHS Navigation when Reader is invisible (removed)
function hideReaderLabelsSelection() {
    getNode('FeedsDiv').style.display = 'none';
    getNode('LabelsDiv').style.display = 'none';
    getNode('BottomDiv').style.display = 'none';
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
				var count = unreadCountPair.count;
                if (unreadCountPair.id.indexOf("reading-list") != -1) {
                    unreadCountNode.innerHTML = count == 0 ? '' : ' (' + count + (count == data.max ? '+' : '') + ') ';
					if(-1!=top.document.title.indexOf(' Reader'))
						top.document.title=top.document.title.substring(0,top.document.title.indexOf(' Reader')) 
					top.document.title+=' Reader' + ' (' + count + (count == data.max ? '+' : '') + ') '; 
					
                }
				if (unreadCountPair.id.indexOf("label") != -1){
                    
                    var LABEL = unreadCountPair.id.substring(unreadCountPair.id.lastIndexOf('/')+1, unreadCountPair.id.length);
					var rflLabel = getNode("rfl"+LABEL);
					if(!rflLabel) continue;
					if (count > 0)
					{
						if (!rflLabel) continue;
						rflLabel.style.fontWeight = 'bold';
					}
					else{
						rflLabel.style.fontWeight = 'normal';
					}
                }
				else{
						var rflFeed = getNode(unreadCountPair.id);
						if (!rflFeed) continue;
						if(count>0)
							rflFeed.style.fontWeight = 'bold';
						else
							rflFeed.style.fontWeight = 'normal';
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