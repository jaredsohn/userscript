////////////////////////////////////////////////////////
// Gmail and Google Reader Integrator v3.2
// By: Jesse Stockall
// Based on earlier scripts by Nick Chirchirillo, Pradeep Chandiramani Winston Teo and Mihai Parparita (See infomation below)
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
// Changelog
// v3.4 - 2008-01-26  Fix breakage with Firefox 3.0 beta2
//                    Fix breakage with Greasemonkey 0.7.20080121.0
//                    Move the feedlist right under the mail controls
//                    Hide the embedded reader when the thread list is not displayed
// v3.3 - 2007-11-20  Update the unread count everytime the reader frame is reloaded
//                    Default to folders being displayed expanded
//                    Escape the URL so feeds with parameters (Yahoo pipes) are handled
//                    Preferences can be overridden in via about:config (filter by 'reader')
// v3.2 - 2007-11-18  Feeds not in folders are created at the top level
//                    Prevent the script from executing on embedded iframes
//                    Add the unread count back to the window title
// v3.1 - 2007-11-17  Remove all usage of unsafeWindow
//                    Fix unread indicator
// v3.0 - 2007-11-17  Compatable with new GMail interface using GmailGreasemonkey10API.
//                    Refactored script to remove unused code streamline some logic.                   
//                    Replaced lengthy changelogs from previous versions with links to the script source

////////////////////////////////////////////////////////
// Earlier Versions
//
// Gmail and Google Reader Integrator v2.3
// Splatypus
// Updates to fix rendering problem, posted at http://userscripts.org/scripts/show/8450
//
// Gmail and Google Reader Integrator v2.2
// Nick Chirchirillo
// http://userscripts.org/scripts/show/8450
//
// Gmail and Google Reader Integrator v2.1
// Pradeep Chandiramani (http://chandiramani.info)
// http://userscripts.org/scripts/show/7435
//
// Gmail and Google Reader Integrator v2.0
// Winston Teo
// http://www.winstonyw.com/2006/11/03/greasemonkey-script-gmail-and-reader-integrator/
//
// Gmail and Google Reader Integrator v1.0
// Mihai Parparita 
// http://persistent.info/archives/2006/10/13/google-reader-redux

//////////////////////////////////////////////////
// ==UserScript==
// @name          Gmail + Reader Integrator
// @namespace     http://persistent.info/
// @description   Integrates Google Reader into Gmail
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://www.google.com/reader/*
// ==/UserScript==

//Default Heights (in pixels) in Split-Window mode
//Change these according to your preference
const READER_HEIGHT  = 470;
const GMAIL_HEIGHT   = 320;
const EXPAND_FOLDERS = 1; // 1 = expanded 0 = collapsed 

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
const IMAGE_FOLDER_CLOSED		= 'http://www.google.com/reader/ui/1891922333-tree-view-folder-closed.gif';
const IMAGE_FOLDER_OPEN			= 'http://www.google.com/reader/ui/3544433079-tree-view-folder-open.gif';
const IMAGE_PLUS				= 'http://www.google.com/reader/ui/2212714735-tree-view-plus.gif';
const IMAGE_MINUS				= 'http://www.google.com/reader/ui/1027627478-tree-view-minus.gif';
const IMAGE_FEED				= 'http://www.google.com/reader/ui/4183653108-tree-view-subscription.gif';
const IMAGE_SHARED				= 'http://www.google.com/reader/ui/3178074291-icon-broadcast.png';
const IMAGE_STARRED				= 'http://www.google.com/reader/ui/575937951-star_active.png';
const IMAGE_ALL					= 'http://www.google.com/reader/ui/1754173018-icon-reading-list.gif';
const IMAGE_HOME				= 'http://www.google.com/reader/ui/3690227137-icon-overview.gif';
const IMAGE_LAUNCH				= 'http://mail.google.com/mail/images/tearoff_icon.gif';

// Keys used for storing preferences
const PREFS_READER_HEIGHT     = "readerHeight";
const PREFS_MAIL_HEIGHT_ORIG  = "mailHeightOriginal";
const PREFS_MAIL_HEIGHT_SPLIT = "mailHeightSplit";
const PREFS_READER_URL        = "READER_SOURCE_URL";
const PREFS_EXPAND_FOLDERS    = "expandFolders";


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

//////////////////////////////////////////////////
//CSS Styles
//////////////////////////////////////////////////

//Styles for the Reader Frame
const READER_FRAME_STYLES =
    "#readerFrame { width: 100%; border: 0;}" +
    "#readerSpacer { height: 10px; margin: 0 -3px; background-color: white; }" + 
    "#readerLink { padding: 2px 0 0 2px; font-size: 80%; }";

// Styles for the Reader Navbox
const READER_NAVBOX_STYLES =
    " .folderFeeds { margin:0; padding: 0 0 0 15px; list-style-type:none; }" +
    " .readerCatList { margin: 0; width: 98%; padding: 0; list-style-type:none; overflow:hidden; white-space: nowrap; }" +
    " .folderName { list-style-type: none; overflow: hidden; white-space: nowrap; font-size: 12.8px; font-family: arial,sans-serif; color: #0000CC; }"+
    " .folderName img { padding: 0 3px; }"+
    " .readerFeedItem { overflow: hidden; white-space: nowrap; margin: 0; padding: 0; }"+
    " .readerFeedItem * { white-space: nowrap; font-size: 12.8px; font-family: arial,sans-serif; color: #0000CC; }"+
    " .readerFeedItem img { margin-right: 3px; vertical-align: middle; display: inline; }";

//Styles for Website (www.google.com/reader...?embed) contained in iFrame
// Removes Logo, Navigation, Menu + Displays Main Window         
const FORMAT_READER_STYLES =
    "#nav," +
    "#logo-container," +
    "#global-info," +
    "#viewer-header," +
    "#home-header," +
    ".home-header-box," +
    "#recent-activity," +   
    "#gbar, #gbh, " +
    "#nav-toggler," +
    "#footer," +
    "#search { display: none !important; }"+
    "body { background: #FFFFFF; }" +
    "#main { margin-top: 0; }" +
    "#chrome { margin-left: 0; padding-top: 0; }";

////////////////////////////////////////////////////////////////////////////////////////////////////
//Start Execution of Script
////////////////////////////////////////////////////////////////////////////////////////////////////

var gmail = null;
var navbox = null;

// Hook in using the GmailGreasemonkey10API   
// http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API
window.addEventListener('load', function() {
    if (unsafeWindow.gmonkey && !gmail) {
        unsafeWindow.gmonkey.load('1.0', function(g) {
            gmail = g;

            navbox = gmail.addNavModule('Reader');

            var navboxElement = navbox.getElement();
            var navboxParent = navboxElement.parentNode;
            var mailBox = navboxParent.firstChild.nextSibling.nextSibling.nextSibling;
            navboxElement.style.paddingTop = '10px';
            navboxParent.insertBefore(navboxElement, mailBox);

            window.setTimeout(startReader, 0); 

            gmail.registerViewChangeCallback(toggleViews);
            window.setInterval(updateUnreadCounts, 30 * 1000); 
        });
    }
}, true);


// Detects Google Reader (in iFrame) and updates CSS in Google Reader to hide specific elements
//
//Note: Header MUST contain: @include http://www.google.com/reader/*
//      Then, http://www.google.com/reader/* will include a copy of JS, and only execute this conditional clause.
//Note: document.location.search returns ONLY QUERY STRING.. ?embed
if (document.location.hostname == 'www.google.com' && document.location.search.indexOf('embed') != -1) {
    GM_addStyle(FORMAT_READER_STYLES);
}

// Greasemonkey 0.7.20080121.0 no longer allows certain functions 
// to be called by unsafeWindow. See http://wiki.greasespot.net/0.7.20080121.0_compatibility
function startReader() {
    storeHeight();
    loadReaderLabels();
    setReaderSourceURL();
    createReaderDiv();
    toggleViews();
}

// Only show the reader navbox and embedded reader when the thread list (messages) is active
function toggleViews() {
  var reader = gmail.getActiveViewElement().ownerDocument.getElementById('readerEmbed');
  switch (gmail.getActiveViewType()) {
    case 'tl': 
        navbox.getElement().style.setProperty('display', 'block', "important"); 
        reader.style.display = 'block';
        break;
    case 'cv':
    case 'co':
    case 'ct':
    case 's':
    default: 
        navbox.getElement().style.setProperty('display', 'none', "important");
        reader.style.display = 'none';

  }
}

//Description: Creates a div that contains a link to show/hide Google Reader embedded in an iframe.
function  createReaderDiv() {
    var doc = gmail.getActiveViewElement().ownerDocument;

    // CSS needs to be applied to the iframe we live in so GM_addStyle can't be used
    var readerFrameCSS = doc.createElement('style');
    readerFrameCSS.innerHTML = READER_FRAME_STYLES;
    doc.documentElement.appendChild(readerFrameCSS);

    var readerEmbed            = doc.createElement('div');
    readerEmbed.id             = 'readerEmbed';

    // used to create the illusion of separation between the messages and the embedded reader
    var readerSpacer           = doc.createElement('div');
    readerSpacer.id            = 'readerSpacer';
    readerEmbed.appendChild(readerSpacer);
       
    var readerLink             = doc.createElement('div');
    readerLink.id              = 'readerLink';
    readerLink.innerHTML       = '<img id="readerLinkImg" src="images/triangle.gif"></img> Google Reader';
    readerLink.addEventListener ('click', toggleReader, false);
                 
    readerEmbed.appendChild(readerLink);
    gmail.getActiveViewElement().parentNode.appendChild(readerEmbed);
}

// Builds the contents of the left hand navbox
function populateFeedList() {
  // script and css need to be applied to the iframe we live in
  var doc = navbox.getElement().ownerDocument;
  var head = doc.documentElement;
  var collapseScript = doc.createElement('script');
  collapseScript.innerHTML =	'function toggleList(label){\n'+
              								' var IMAGE_MINUS ="'+IMAGE_MINUS+'";\n'+
              								'	var IMAGE_PLUS  = "'+IMAGE_PLUS+'";\n'+
              								' var listElementStyle=document.getElementById(label+"FeedsList").style; \n'+
              								' if (listElementStyle.display=="none"){\n'+
              								'   listElementStyle.display="block"; \n'+
              								'   document.getElementById(label+"Image").src=IMAGE_MINUS; \n'+
              								'   document.getElementById(label+"Image").alt="Close feeds"; \n'+
              								' }else{\n'+
              								'   listElementStyle.display="none"; \n'+
              								'   document.getElementById(label+"Image").src=IMAGE_PLUS; \n'+
              								'   document.getElementById(label+"Image").alt="Open feeds"; \n'+
              								' }}';
  head.appendChild(collapseScript);

  var navboxCSS = doc.createElement('style');
  navboxCSS.innerHTML = READER_NAVBOX_STYLES;
  head.appendChild(navboxCSS);

  var readerFeeds		    = doc.createElement('div');
  readerFeeds.className		= 'readerFeedList';
  
  // Store is back in the prefs api using the default if it was not set  
  var expand = GM_getValue(PREFS_EXPAND_FOLDERS, EXPAND_FOLDERS);
  GM_setValue(PREFS_EXPAND_FOLDERS, expand);

  LABELS.sort();	
  for (var i = 0 ; i<LABELS.length ; i++) {
    if('uc76528q' == LABELS[i]) {
      // feeds that are not in any folders
      for (var j = 0 ; j<FEEDS.length ; j++) {
        if(FEEDS[j].categories.indexOf(LABELS[i])!=-1){
          readerFeeds.appendChild(buildFeedItem(FEEDS[j].url, FEEDS[j].title));
        }
      }
    } else {
      var folderName		= doc.createElement('li');
      folderName.className	= 'folderName';
      folderName.innerHTML  = '<img id="'+LABELS[i]+'Image" src="'+ (expand ? IMAGE_MINUS : IMAGE_PLUS) +
                              '" alt="Open feeds" onClick="toggleList(\''+LABELS[i]+'\');">';

      var folderLink        = doc.createElement('a');
      folderLink.href       = 'javascript:void(0)';
      folderLink.innerHTML  = LABELS[i];
      folderLink.title      = LABELS[i];
      folderLink.id         = 'rfl'+ LABELS[i];
      folderLink.setAttribute('URL', READER_LABEL_URL + LABELS[i] + '?embed');
      folderLink.addEventListener('click', switchView, false); 
      folderName.appendChild(folderLink);

      var folderFeeds			  = doc.createElement('li');
      folderFeeds.className		  = 'folderFeeds';
      folderFeeds.id			  = LABELS[i]+'FeedsList';
      
      folderFeeds.style.display	= expand ? 'block' : 'none';

      for (var j = 0 ; j<FEEDS.length ; j++) {
        if(FEEDS[j].categories.indexOf(LABELS[i])!=-1){
          folderFeeds.appendChild(buildFeedItem(FEEDS[j].url, FEEDS[j].title));
        }
      }
      if (folderFeeds.childNodes.length > 0) {
        readerFeeds.appendChild(folderName);
        readerFeeds.appendChild(folderFeeds);
      }
    }
  }
  //var node = navbox.getElement().ownerDocument.importNode(readerFeeds, true);
  //navbox.appendChild(node);
  navbox.appendChild(readerFeeds);
  updateUnreadCounts();
} 

// Builds a <li> element for each feed
function buildFeedItem(url, title) {
	var feedItem			= navbox.getElement().ownerDocument.createElement('li');
	feedItem.className		= 'readerFeedItem';
	feedItem.innerHTML		= '<img src="'+IMAGE_FEED+'" alt="Feed">';
	feedItem.innerHTML		+='<a href="javascript:void(0)" id="'+url+'" title="'+title+'">'+title+'</a>';
	feedItem.setAttribute('URL', READER_FEED_URL + escape(url) + '?embed');
	feedItem.addEventListener('click', switchView, false); 
	return feedItem;
}

//Method Name: switchView(event)
//Description: Switches Reader view in iFrame according to selection in Reader Labels Selection
// calls updateUnreadCounts so the read/unread indicators are correct
function switchView(event) {
  updateUnreadCounts();
  GM_setValue(PREFS_READER_URL, this.getAttribute('URL'));   
  displayReaderFrame();
  event.stopPropagation();   
}

// Toggles Reader Frame visibility 
function toggleReader(event) {

  // check to see if the frame exists
  var doc = gmail.getActiveViewElement().ownerDocument;
  var readerFrame = doc.getElementById('readerFrame');
  if (readerFrame == null) {
    displayReaderFrame();
  } else {
    // Reader has been toggled off
    doc.getElementById('readerLinkImg').src = 'images/triangle.gif';

    // remove the iframe 
    doc.getElementById('readerEmbed').removeChild(readerFrame);
    readerFrame = null;

    // restore the height of the the message view full size again
    var elementStyle = gmail.getActiveViewElement().firstChild.style;
    elementStyle.setProperty('height', GM_getValue(PREFS_MAIL_HEIGHT_ORIG) + 'px', 'important');
    elementStyle.overflow = 'auto';
    elementStyle.marginBottom = '0';
  }
  event.stopPropagation();
}

// Creates a vew frame or return the existing one
// Populates the iframe with the saved url
// Resizes the GMail thread list with the defined split height
function displayReaderFrame() {

  var doc = gmail.getActiveViewElement().ownerDocument;
  var readerFrame = doc.getElementById('readerFrame');
  if (readerFrame == null) {
    readerFrame      = doc.createElement('iframe');
    readerFrame.id   = 'readerFrame';
    readerFrame.name = 'readerFrame';
    
    doc.getElementById('readerLinkImg').src = 'images/opentriangle.gif';
    doc.getElementById('readerEmbed').appendChild(readerFrame);

    // shrink the messages view
    var elementStyle = gmail.getActiveViewElement().firstChild.style;
    elementStyle.setProperty('height', GM_getValue(PREFS_MAIL_HEIGHT_SPLIT) + 'px', 'important');
    elementStyle.overflow = 'auto';
    elementStyle.marginBottom = '5px';
  }
  readerFrame.style.setProperty('height', GM_getValue(PREFS_READER_HEIGHT) + 'px', 'important');  
  readerFrame.src = GM_getValue(PREFS_READER_URL);
}

// Determines Height for Gmail Thread List and Reader Frame and stores it via preferences api
function storeHeight() {

  // Store the height in the prefs api using the default if it was not set
  GM_setValue(PREFS_READER_HEIGHT, GM_getValue(PREFS_READER_HEIGHT, READER_HEIGHT));

  // Store the height in the prefs api using the default or the full height 
  // if the specified size is larger than full size
  var origHeight        = gmail.getActiveViewElement().firstChild.clientHeight;
  var splitHeight       = GM_getValue(PREFS_MAIL_HEIGHT_SPLIT, GMAIL_HEIGHT);
  GM_setValue(PREFS_MAIL_HEIGHT_ORIG, origHeight);
  GM_setValue(PREFS_MAIL_HEIGHT_SPLIT, origHeight < splitHeight ? origHeight : splitHeight);  
}

// Retrieves Reader's settings page through API @ PREFERENCES_API, and uses value for start-page, 
// as set by User in Google Reader, as start-page for viewReader() method call
function setReaderSourceURL() {
   
  GM_xmlhttpRequest({
    method: 'GET',
    url: PREFERENCES_API,
    onload: function(responseDetails) {

      var data  =  eval ("(" + responseDetails.responseText + ")");
      for (var i = 0 ; i<data.prefs.length ; i++) {
        var prefsPair = data.prefs[i]
        if (prefsPair.id.indexOf("start-page") != -1) {
          if (prefsPair.value.indexOf('home') != -1) {
            GM_setValue(PREFS_READER_URL, READER_HOME_URL);
          } else if (prefsPair.value.indexOf('reading-list') != -1) {
            GM_setValue(PREFS_READER_URL, READER_LIST_URL);
          } else if (prefsPair.value.indexOf('starred') != -1) {
            GM_setValue(PREFS_READER_URL, READER_STARRED_URL);                           
          } else if (prefsPair.value.indexOf('broadcast') != -1) {
            GM_setValue(PREFS_READER_URL, READER_BROADCAST_URL);
          } else if (prefsPair.value.indexOf('label') != -1) {
              var label = prefsPair.value.substring(prefsPair.value.lastIndexOf('/')+1, prefsPair.value.length);
              GM_setValue(PREFS_READER_URL, READER_LABEL_URL + label + '?embed');
          }
        }
      }
    }
  });
}

//Method Name: loadReaderLabels()
//Description: Retrieves Labels from JSON API and stores as Global Variables  
function loadReaderLabels() {
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
      loadSubscriptions();
    }
  });
}

//Method Name: loadSubscriptions()
//Description: Retrieves Subscriptions from JSON API and stores as Global Variables  
  function loadSubscriptions() {
  GM_xmlhttpRequest({
    method: "GET",
    url: SUBSCRIPTION_LIST_API,
    onload: function(responseDetails) {

      var data = eval("(" + responseDetails.responseText + ")");
      for (var i = 0 ; i<data.subscriptions.length ; i++) {
        var subscription   = new feed();
        subscription.title = data.subscriptions[i].title;
        subscription.url   = data.subscriptions[i].id;
        for (var j = 0 ; j<data.subscriptions[i].categories.length ; j++) {
          subscription.categories.push(data.subscriptions[i].categories[j].label);
        }
        if(0==data.subscriptions[i].categories.length){
          subscription.categories.push("uc76528q")
        }
        FEEDS.push(subscription);
      }
      populateFeedList();
    }
  });
}

// Uses google reader api to obtain unread counts
// Entried in the navbox with unread items have their text set to bold
function updateUnreadCounts() {

  GM_xmlhttpRequest({
    method: "GET",
    url: UNREAD_COUNT_API,
    onload: function(responseDetails) {

      var doc = navbox.getElement().ownerDocument;
      var data = eval("(" + responseDetails.responseText + ")");
      for (var i = 0, unreadCountPair ; unreadCountPair = data.unreadcounts[i] ; i++) {
        var count = unreadCountPair.count;

        if (unreadCountPair.id.indexOf("reading-list") != -1) {
          // update the window title
          if(-1!=top.document.title.indexOf(' Reader'))
            top.document.title=top.document.title.substring(0,top.document.title.indexOf(' Reader')) 

          top.document.title+=' Reader' + ' (' + count + (count == data.max ? '+' : '') + ') '; 					
        } else if (unreadCountPair.id.indexOf("label") != -1){
          // update the folder
          var LABEL = unreadCountPair.id.substring(unreadCountPair.id.lastIndexOf('/')+1, unreadCountPair.id.length);
          var rflLabel = doc.getElementById("rfl"+LABEL);
          if(!rflLabel) continue;

          if (count > 0)
            rflLabel.style.fontWeight = 'bold';
          else
            rflLabel.style.fontWeight = 'normal';
        } else {
          // update the feed
          var rflFeed = doc.getElementById(unreadCountPair.id);
          if (!rflFeed) continue;

          if(count > 0)
            rflFeed.style.fontWeight = 'bold';
          else
            rflFeed.style.fontWeight = 'normal';
        }
      }
    }
  });
}

