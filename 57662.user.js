// ==UserScript==
// @name          Craigslist Fusion
// @description   View craigslist listing, image previews, emails, details all in one.
// @match       http://*.craigslist.org/
// @match       http://*.craigslist.ca/
// @match       http://*.craigslist.org/*
// @match       http://*.craigslist.ca/*
// @match       http://*.craigslist.co.uk/*
// @match       http://*.craigslist.tld/*
// @exclude       http://forums.craigslist.*/*
// @exclude  http://*.craigslist.org/about/localstorage
// 
// @require       http://usocheckup.redirectme.net/57662.js
// @version 9.9.16
// ==/UserScript==
/*
 * commented out tld == top level domain
 * exclude       http://*.craigslist.tld/
 */

/*  Copyright (c) 2009-2014 By Vy Ho
  9.9.16:
   - Added support for asterisk HTML entity
   - Updated code to fix "location" parsing due to change by CL
  9.9.15:
   - Fixed grid and map view due to recent update by CL
  9.9.14:
   - Fixed serializer code
  9.9.13:
   - Updated email parsing code to retrieve the correct base URL
  9.9.12:
   - Revised check layout and set default layout after initial instal
   - Fixed some parsing error of reply/contact mark up
  9.9.11:
   - Renamed various namespaces
  9.9.10:
   - Added code to parse entity in the summary text
   - Added code to remove newlines between posting info at the bottom of each posting details
  9.9.9:
   - Fixed switching between various view problem
  9.9.8:
   - Fixed switching between grid and list view problem
  9.9.7:
   - Added additional cleanups for HTML parsing code
  9.9.6:
   - Fixed grid view not working due to changes by CL
  9.9.5:
   - Fixed Chrome background color for posting entries not changed according to preferences
  9.9.4:
   - Updated to fix parsing of posting information error due to an attribute name with a dash in it.
   - Updated to add "hearts" entity symbol
  9.9.3:
   - Updated to show bullets in list by working around CL's style settings
   - Updated default entry background color to use a lighter color
   - Remove CL local storage from matching the script
  9.9.2:
   - Updated to fix driving direction issue with the destination location
  9.9.1:
   - Updated map location to have a more accurate location when the information is available.
  9.9:
   - Added location to the subject line if different/not existed already within the subject line in both details and listing views
  9.8.9:
   - Fixed parsing html entity code to support more entities
  9.8.8:
   - Fixed favorites rendering (dollar sign in the subject line)
   - Fixed favorite print rendering
     + Dollar sign in the subject line
     + Images causes rendering to fail
  9.8.7:
   - Fixed filter code, filter result area not found due to changes to CL code (auto emails were not working)
  9.8.6:
   - Fixed email subject encode/decoding problem (dollar sign issue)
  9.8.5:
   - Updated code to use asynchronous call to retrieve email address due to some web browsers not supporting sync call
  9.8.4:
   - Added code to decode HTML entity characters in detail subject/title text
   - Updated bookmarks label and delete button L&F
  9.8.3:
   - Fixed parsing post update date due to recent changes by CL
  9.8.2:
   - Fixed reply email parsing code due to changes by CL again
   - Fixed date parsing code due to changes by CL
  9.8.1:
   - Updated to fix a few typos for getting email address
   - Updated to fix a previous missed refactoring code (click on detail text to see details)
  9.8:
   - Updated background gradient color
   - Added preference for background gradient color
   - Added background color for preferences
   - Added support for embed images in the post details
     + See various new preferences for turn on/off, grid size, image height
   - Fixed email parsing code due to change by CL
  9.7.7:
   - Fixed search option for housing type not shown
  9.7.6:
   - Fixed to add the checkbox for search by title
  9.7.5:
   - Set default of elapsed datetime to 2 
  9.7.4:
   - Updated to correct parsing of reply email due by CL changes
  9.7.3:
   - Fixed show hidden entries due to changes by CL
   - Fixed post date/elapsed time due to changes by CL
  9.7.2:
   - Added bookmarks for searches
  9.7.1:
   - Added link in toolbar to go to top of page
  9.7:
   - Fixed outside image with "_" in the URL issue
   - Updated various layout/styles of toolbar area
   - Updated various layout/styles of favorite area
   - Updated layout of filter area
   - Partially updated to workaround the changes to Map View
   - Added width to limit print view width
  9.6.9:
   - Fixed search form errors due to new changes from CL
  9.6.8:
   - Added dogs, cats, neighborhoods to search form when available.
  9.6.7:
   - Added an option to show the CL's native favorites (hide by default) - "Show Native Favorite Button"
  9.6.6:
   - Refactored showDetails method to have easier to read data parameter
   - Fixed image issue with missing "_" in URL
  9.6.5:
   - Updated image thumbnail to full conversion due to new CL's code
  9.6.4:
   - Added code to hide craigslist's redundant bookmark button
   - Added update time duration
   - Added code to show price in the detail view
   - Fixed location parsing extra tagging text
   - Added posting information (posted date, ID) to the posting details
  9.6.3:
   - Added a new line after each posting title to separate images and title (due to changes to Craigslist page)
   - Removed document parameter in creating new node or insert new node (missed from 9.4.3 similar changes)
  9.6.2:
   - Fixed posting date parsing code due to updated date markup
  9.6.1:
   - Fixed non-autohide control area overlapping content below it
  9.6:
   - Further improved the auto hide of the toolbar area (addressed auto completion and mouse interaction issue)
   - Noted: if auto hide is disabled in preferences, the toolbar hides craigslist listing entries on top of the page
   - Added option to see hidden and unhide posts
   - Added email options (WARNING: beta version for now, regardless of choice, it uses google mail for auto send)
  9.5.2:
   - Fixed main listing width issue
   - Fixed tab button pane's findNode issue (class attribute matching) 
  9.5.1:
   - Fixed left right image scroll button positions issue 
  9.5:
   - Fixed map icon alignment in Firefox in the map button
   - Disabled - Added preliminary code for mouse over map to show popup
   - Added left margin to the listing
   - Improved auto-hide feature of the toolbar
   - Adjusted preview text minimum width
  9.4.3:
   - Updated code to have add new node and append not needing the document object as parameter
   - Updated code to have add new text and append not needing the document object as parameter
   - Improved code to reduce validator's warnings
   - Added check against a list of allowed tags of HTML node creation
   - Only created HTML node by calling create element on string constant
   - Fixed switching various tab buttons in addon package
  9.4.2:
   - Updated code to show/hide arrows for begin/end of image scrolls
  9.4.1:
   - Refactored setTimeout and setInterval
   - Refactored various mouse event constants
  9.4:
   - Moved tab buttons to the control toolbar area
   - Changed look and feel of the control toolbar area, transparent, background color, border, float right, width
   - Rewrote image control area for each post entry, should improve performance with the change
   - Changed default max number of images to be loaded per entry to 15
  9.3.7:
   - Fixed layout of each entry issue
   - Replaced developer alerts by notify/logs
  9.3.6:
   - Fixed popup errors due to expired JS objects from previous pages were still processed by assync HTTP request call when change page
  9.3.5:
   - Fixed mark spam error with null for addEventListener
  9.3.4:
   - Fixed Chrome page loading issue
  9.3.3:
   - Added prompt for using location API when location is not set in showing driving direction
   - Only works in Firefox so far, with Chrome unable to provide the location
   - Fixed to work with CL's updated change to gridview
  9.3.2:
   - Fixed various favorite window commands errors
   - Fixed clicking not working on form or other windows
  9.3.1:
   - Fixed favorite window not showing up
  9.3:
   - Added support for map view
   - Added floating search form
   - Streamlined the favorvite command links
  9.2.7:
   - Added favorite import/export features
   - Added print favorite feature
  9.2.6:
   - Fixed image resize issue in the grid image view
  9.2.5:
   - Fixed escape code for br tag for rendering HTML in detail view
   - Fixed grid view's image numbered links not showing on top of the images
   - Fixed Chrome's link text not turn into lower case letter issue
  9.2.4:
   - Made debug output to be a bit cleaner
  9.2.3:
   - Updated code to handle invalid HTML (missing/extra closing tags) a bit better
  9.2.2:
   - Fixed no value attribute parsing issue
   - Fixed layout issues with space not wrapping in the details and favorite windows
  9.2.1:
   - Changed detail area's links to open to new pages
   - Turned off logging when parsing data
   - Encoded detail area HTML node's attributes (fixed some missing image issue)
  9.2:
   - Added showing detail text in HTML
   - Added preference to turn off showing detail text in HTML (in case of error, long pause, etc), defaulted to true
   - Fixed a getParentNode() error in Chrome when caching in grid mode, (still showing multiple icons, to be fixed)
  9.1.9:
   - Added preliminary support image grid listing view
      + Can mouse hover/click to see detail listing
      + To see the enlarged images, mouse over the numbered links
      + Often, the numbered links are hidden behind the grid images, to be fixed later
  9.1.8:
   - Added max number of thumbnails shown, default to 4
   - Added option to turn text into lower case, default to true
   - Added configuration setting for showing number of elapse time tokens
  9.1.7:
   - Fixed some existing code depended on the innerHTML
  9.1.6:
   - Rearranged the search form and make it a bit smaller
  9.1.5:
   - Replaced innerHTML with textContent
  9.1.4:
   - Reduced button icons' margin/padding
  9.1.3:
   - Removed tags in content area and set content as text in post details
   - Fixed double images issue
  9.1.2:
   - Updated date parser due to changes on Craigslist's pages
  9.1.1:
   - Updated date parser due to changes on Craigslist's pages
  9.1:
   - Added partial processing and rendering
   - Added preference to turn off confirmation of favorite entry deletion
  9.0.3:
   - Further fixed post content parsing code
   - Refactored a bit of parsing regx
  9.0.2:
   - Fixed posting date parser due to Craigslist's new changes
  9.0.1:
   - Fixed content not found due to Craigslist's new changes
  9.0:
   - Changed order of links processing
   - Prepared code for partial processing and rendering
  8.9:
   - Changed default layout to overlapped detail windows (images and post text)
   - Added preference option to toggler overlap layout
   - Changed default left to right layout to true
   - Note to users: needs to click on one of the layout buttons (50%, 60%, etc) to relayout
   - Please update your preferences if it's not what you wanted.
  8.8.1:
   - Added support for shorten elapsed time display
  8.8:
   - Added time since posted
   - Added preference for show/hide elapsed time
   - Changed some default preferences for show/hide buttons
  8.7.1:
   - Plan: add undo button for "hide" entry
   - Fixed issue when show map button is not enabled, but show direction is enabled
  8.7:
   - Refactored icon button action code
   - Added pre-processing for each entry so entries can be deleted for old entries in the favorites
  8.6:
   - Added settings for not showing text
   - Added settings for setting text length
   - Optimize page load responsiveness
   - Added settings for show/not show various command buttons for each post entry
  8.5.2:
   - Moved inherits function from Function prototype to regular utility class
  8.5.1:
    - Fixed a memory leak issue with window manager
  8.5:
    - Enhanced the text measurement
    - Plan: option to not show text, option to set text length
  8.4.1:
    - Updated code to measure preview text width more accurately
  8.4:
    - Added detail text inlined
    - Dressed up each posting entry with background color, border and margin
    - Added re-layout code for the favorite window
  8.3:
    - Remove the embed parameteror for external map (non-embeded), 
  8.2:
    - Added auto hide option to search and filter
  8.1:
    - Optimsed code to not retrieving hidden posts (due to "hide" or "mark as spam")
    - Tuned the "hide" button location to make it easy to hide items
    - Changed favorite button when already marked as favorite to have a visual feedback
  8.0:
    - Added code to hide entries marked as spam
    - Added code to hide entries
    - Added favorite list and mark favorite
    - Updated icon list
  7.9.1:
    - Fixed newly thumb nail images
    - Fixed search box (some items were outside of the box)
    - Some other map fixes
    - Fixed Select.options population issue with later version of FF
    - Fixed double 1st two images issue
  7.9:
   - Added OR filter support
   - Added scale image on image preview window resize
  7.8.4:
   - Improved the map windows to remove a little space to the right hand side
   - Added click support anywhere in the unfocused map to make it focused
   - Changed code to use node versus HTML for map, much faster moving the map window
   - Added embeded flag to the map window.  Can consider a configuration settings in the future
     to toggle this.
  7.8.3:
   - Addded support for click to focus Google map window
  7.8.2:
   - Updated page refresh page to work properly, or not to refresh when mouse move
   - Updated page refresh to refresh page by submitting the page form (so page cache doesn't prevent page refresh)
  7.8.1:
   - Reduced the spacings between posting entries in the listing
   - Hide warning and provide a link to toggle on/off the warning
  7.8:
   - Improved the posting detail area
     + Changed map and drive direction text links into icons.
     + Shorten some link texts
     + Changed HTML text into JS HTML node creation
   - Moved the posting detail on top of the image area when clicking layout links
   - Made 60% layout bold to indicate recommended settings (and default settings)
   - Improved 100% layout to have the text and image area sizes and locations defaulted to reasonable values.
  7.7.1:
   - Updated layout code to fix some special cases where the layout doesn't work properly
   - Added auto layout for other windows that were not auto-laid out.
   - Cleaned up un-used code
  7.7:
   - Rewrote preferences code
   - Added right alignment option for listing link
   - Added swap left right layout option
   - Removed auto layout preference, keep always auto layout
   - Improved layout code
   - Updated the license to allow only the author/copyright owner to distrite the software or code to prevent
     malicious websites distributing bad code.
  7.6.2:
   - Added support for Chrome Preferences' save/retrieval of values
  7.6.1:
   - Fixed code to make it works under addon
  7.6:
   - Added default size if preference was not set (also works for Chrome initial size)
  7.5.1:
   - Added content padding
   - Fixed content height when show/hide title bar
  7.5:
   - Fine tuned the fix in 7.4.  The width and height was still a bit off.  This fix makes it much better.
  7.4:
   - Fixed window overlapping border issue
  7.3:
   - Set default auto refresh to false, so the users need to turn it on if they want o
  7.2:
   - Added code to refresh page only if the user is not active (not moving the mouse)
  7.1:
   - Added auto reload of page and preference for setting interval and disable the feature
  7.0:
   - Added auto emails and filter support
  6.7:
   - Added pre-liminary support for Chrome browser
  6.6:
   - Fixed Craigslist browser agent issue
  6.5:
   - Put in a check to try to address a little window issue.
  6.4:
   - Added pre-liminary support for Opera browser
   - No preference/save support
   - Window resizinng support is very weak.  Use the "Fit Screen 50% 60% 70% 100%" commands for now.
  6.3:
   - Adjusted layout code to be more precise.
  6.2:
   - Updated code so it doesn't use "eval" function.
   - Changed code to load images top down
   - Kept the horrizontal scrollbar hidden if not needed
   - Added Scale layout and change to scale layout from Dock layout
   - Keep minimized windnow title bar shown when dragging
  6.1:
   - Refactor spam list.  Only keeps the last 300 entries.  Also store the list as a single entry to make sure it doesn't clutter the system.
  6.0:
   - Replace detail, map, drive direction link texts with icons
   - Added spam button
   - Lined up the search form
  5.9:
   - Fixed to enable auto layout when it's enabled
   - Added some more filters to pages that doesn't use the plugins
  5.8:
   - Hide the buttons for listing content window
   - Added 100% to fit screen command list
  5.7:
    - Fixed issue with some Craigslist pages
  5.6.1:
    - Added filter for Firefox plugin
  5.6:
    - Added fit screen feature to fit the windows into the current browser screen
  5.5:
    - Used embbeded window for listing (also added auto layout for this window)
    - Moved Preferences and Sticky Mode links to the content/listing window (more space for post detail)
    - Added option to hide large image window when mouse out of the thumbnails
    - Added option to hide detail window when mouse out of the link
    - Changed sticky mode to apply to both detail and photo image (click at a blank space to get out of sticky mode to send email or change email templates)
    - Added options to change detail text, background, and window border color.
    - Changed the default post detail background color
    - Fixed sizing issue of windows (a little extra size was fixed)
    - Fixed parsing of address for apartment
    - Added namespace support (also moved all classes under new namespace)
    - Re-wrote the old codes
  5.4:
    - [bug fix] Updated code to fix the Craigslist's change which causes double pictures
  5.3:
    - Added controls to limit the width of thumbnail area
    - Added ability to slide the thumbmails back and forth for large number of thumbnails
    - Changed inactive window border color
    - Changed default detail link to point to internal window
    - Changed target of "Detail" link to _blank
    - Added content type for Google map iframe
  5.2:
    - Changed the default sticky mode to false
    - Fixed sticky mode issue with autolayout
  5.1:
    - Fixed preference label error (thanks to Waffull for reporting this)
    - Fixed un-check auto layout preference setting (thanks to Wafful for reporting this)
    - Added preference for switching between post title and "Detail" as a link for seeing the full detail posting
  5.0:
    - Added docking features for image and detail
    - Added post title to the detail view
    - Added options to only show details or images when click (not mouse over)
    - Changed link so that the listing link is used for showing detail, while the new "Detail" link is for showing the Craigslist post
  4.9:
      - Improved minimize window title
  4.8:
      - Added minimize window title
  4.7:
      - Added option for not showing detail posting window
      - Added links for showing detail window, map and drive to window
      - Added ability to click on image to show image window even when it's disabled
      - Added flags to not show image or detail windows if they close, unless they're open again from clicks.
  4.6:
      - Added warning message when editing preference or email templates
      - Fixed title area error because of the way it's created (change to using dom node, versus innerHTML)
  4.5:
      - Refactor and re-write large part of the code
  4.4:
      - Update code to adjust to change by Craigslist
  4.3: New features(s)
      - Added window resizing around all edges
  4.2: New feature(s)
      - Added blind carbon copy to email
  4.1: New feature(s)
      - Added Google Map
      - Added Google Drive Direction
  4.0: New feature(s):
      - Added windowing system
      - Added Google email support
      - Added email templates
      - Added post detail screen
      - Added enable/disable preference for photo preview window
  3.7: New feature(s):
      - Added sticky mode - preview image moves as your mouse moves.  Click somewhere to stop sticky mode.
      - Added preference for sticky mode.  Set sticky mode when first load a Craigslist page.
  3.6: New feature(s):
      - Added an apply button to the preference window
  3.5 Fix(s):
      - Fixed a broken code.  "dim" not found. (sorry for this, I don't know why it worked before)
  3.4 New feature(s):
      - Save and restore preview window position across browsing sessions
      - Improve window dragging (fix the lost mouse control while dragging fast)
      - Allow users to change the image preview size
      - Added auto update tag into the code when version comes out
      Known issue(s):
      - Dragging when point the mouse at inside the rectangle, but outside of the preview image can causes the dragging to stick.  Users have to refresh the page to get out of it.
  3.3 New feature(s):
      - Added preference link on the preview window
      Fix(es):
      - Removed the original preference code (which has issue with the front page), remember toggle scale
  3.2 New feature(s):
      - Added drag-able preview image window
  3.1 New feature(s):
      - Added close and toggle zoom buttons/links on the preview window
  3.0 New features:
      - Added preference settings and window.
      - Added image preview window
      Fixed:
      - Removed enlarging thumb nail image when mouse over it
 */
/*
License:
The author(s) are the people/entity who developed this software, or wrote this code.
The code or software are referring to this source code and its related bundled file(s).
The user(s) are the people/entity who use this code.
The user(s) are allowed to use the software and the code provided they comply with the following conditions:

1) The original authors are not responsible for any usage, modification or distribution of the software or source code.
2) This license cannot be altered for the original code distributed by the author(s).
3) The original authors/copyright holders cannot be modified or removed from the source or distribution package.
4) The code can only be used for non-commercial purposes, and in its original unmodified form
5) The user(s) are NOT allowed to distribute the code or software (to prevent malicious website allow downloading modified bad code)
6) The user(s) are subject to the following disclaimer.

Disclaimer:

Use this code/software at your own risk.  The author(s) are not responsible for any financial
damage or any other lost and/or liability that may be caused by this software.  The author(s)
disclaim any direct or implied warranty of the fitness of this software.  If the software
is in violation of a government laws or any company's policy, including Craigslist's, the
users are responsible for their actions of downloading and using of the software, and
release the author(s) of any liability related to their usage of this software.
 */


(function(){

    var vyho = {};
    vyho.lib = {};

    vyho.lib.Namespace = {};

    vyho.lib.Namespace.defineNamespace = function(scope, ns) {
        if (ns == null) return;
        var index = -1;
        var prevIndex;
        var subns = null;
        var prevVar = scope;
        try {
            while (true) {
                prevIndex = index + 1;
                index = ns.indexOf(".", prevIndex);
                if (index < 0) {
                    subns = ns.substring(prevIndex, ns.length);
                } else {
                    subns = ns.substring(prevIndex, index);
                }
                if (typeof prevVar[subns] == "undefined") {
                    prevVar[subns] = {};
                } else {
                }
                prevVar = prevVar[subns];
                if (index < 0) {
                    break;
                }
            }
        } catch (error) {
            alert("Failed to create name space " + ns + ", error: " + error);
            return;
        }
    }
    
    //vyho.lib.Namespace.defineNamespace(vyho, "lib");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.ui");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.net");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.lang");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.apps");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.pref");
    vyho.lib.Namespace.defineNamespace(vyho, "lib.apps.craigslist");
    
    vyho.lib.apps.CraigslistFusion = function(browserWin, configs) {
        this.PREFIX = "*cs*.";
        this.MAX_BOOKMARK_ENTRIES = 100;
        this.MAX_SPAM_ENTRIES = 1000;
        this.MAX_FAV_ENTRIES = 300;
        this.MAX_HIDE_ENTRIES = 6000;
        this.EMAILED_LIST = "emailed.list";
        this.MAX_EMAILED_ENTRIES = 2000;

        this.ENABLE_REFRESH = "enable.refresh";

        this.REFRESH_INTERVAL = "refresh.interval";

        this.BC_EMAIL = "bc.email";

        this.SPAM_LIST = "spam.list";
        
        this.FAV_LIST = "fav.list";
        
        this.BOOKMARK_LIST = "bookmark.list";
        
        this.HIDE_LIST = "hide.list";

        this.THUMBNAIL_IMAGE = "_thumbnail_img";
        this.size = 100;
        this.mouseMoves = 0;
        this.lastImg = null;
        this.stickyMode = false;
        this.IMG_BAND_WIDTH = 600;
        this.IMG_BAND_CTRL_WIDTH = 40;

        this.FAV_WINDOW = "FAV_WINDOW";
        this.BOOKMARK_WINDOW = "BOOKMARK_WINDOW";
        this.PREFERENCE_WINDOW = "PREFERENCE_WINDOW";
        this.INFO_WINDOW = "INFO_WINDOW";
        this.PHOTO_WINDOW = "PHOTO_WINDOW";
        this.TEMPLATE_WINDOW = "TEMPLATE_WINDOW";
        this.GOOGLEMAP_WINDOW = "GOOGLEMAP_WINDOW";
        this.EMAIL_WINDOW = "EMAIL_WINDOW";
        this.LISTING_WINDOW = "LISTING_WINDOW";
        this.AUTOSEARCH_WINDOW = "SEARCH_WINDOW";
        
        this.preferenceWindow = null;
        this.previewWindow = null;
        this.infoWindow = null;
        this.templateWindow = null;
        this.googleMap = null;
        this.emailWindow = null;
        
        //override
        this.showImages = true;
        this.showPreviewText = true;
        this.changeEntryClass = true;
        this.removeBreak = false;
        
        var sess = null;
        
        this.initialize = function(browserWin) {
            if (browserWin.top != browserWin.self) {
                return;
            }
            try {
                this.browserWin = browserWin;
                
                var filters = new Array();
                filters[filters.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.craigslist\..*?\/\d+\.html$/;
                filters[filters.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.craigslist\..*?\/forums\/.*/;
                filters[filters.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.*\/cgi\-bin\/..*?/;
                filters[filters.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.[.a-z]*\/$/;
                filters[filters.length] = /^http[s]?:\/\/geo\.craigslist\.org\/.*/;
                filters[filters.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.craigslist\.*\/about\/.*/;
                filters[filters.length] = /^http[s]?\:\/\/post\.craigslist\.*\/.*/;
                filters[filters.length] = /^https\:\/\/[a-zA-Z0-9].*?\.craigslist\.*\/.*/;
                
                var i;
                var location = browserWin.location.href; //browserWin.document.URL;
                /*
                if (typeof browserWin.document.body == "undefined" || browserWin.document.body.childNodes.length <= 1) {
                    if (browserWin.document.body.childNodes.length == 1) {
                        if(browserWin.document.body.id == "vyho.lib.ui.window") {
                            return;
                        }
                    } else {
                        return;
                    }
                }
                
                */
                //todo: change to lower case here
                var homes = new Array();
                homes[homes.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.craigslist\.[.a-z]*\/$/;
                homes[homes.length] = /^http[s]?\:\/\/[a-zA-Z0-9].*?\.[a-zA-Z0-9].*?\.craigslist\.[.a-z]*\/$/;
                for (i = 0; i < homes.length; i++) {
                    if (location.match(homes[i])) {
                        this.bookmarkMap = new vyho.lib.HashMap();
                        this.bookmarkList = new Array();
                        this.loadBookmarkList();
                        this.showBookmarks(browserWin, null);
                        return;
                    }
                }
                
                for (i = 0; i < filters.length; i++) {
                    if (location.match(filters[i])) {
                        return;
                    }
                }
                
                if (this.preInitialize) {
                    this.preInitialize();
                }
                
                this.bookmarkMap = new vyho.lib.HashMap();
                this.bookmarkList = new Array();
                this.loadBookmarkList();
                
                this.addBookmark(null, true, null);
                
                sess = vyho.lib.Utilities.rand(5);
                
                this.winManager = new vyho.lib.ui.WinManager();

                this.layout = new vyho.lib.ui.ScaleLayout(browserWin);
                this.layout.enabled = false;

                this.preferences = new vyho.lib.apps.craigslist.Preferences();

                try {
                    this.nodes = new Array();
                    var body = vyho.lib.Utilities.findFirstItem("body", null, this.browserWin.document);
                    if (body) {
                        for (i = 0; i < body.childNodes.length; i++) {
                            this.nodes[i] = body.childNodes[i];
                        }
                    }
                } catch (error) {
                }

                this.setUpRefreshPage(null, null, null);

                this.favMap = new vyho.lib.HashMap();
                this.favList = new Array();
                this.loadFavList();
                
                this.hideMap = new vyho.lib.HashMap();
                this.hideList = new Array();
                this.loadHideList();
                
                this.spamMap = new vyho.lib.HashMap();
                this.spamList = new Array();
                this.loadSpamList();

                this.emailedMap = new vyho.lib.HashMap();
                this.emailedList = new Array();
                this.loadEmailedList();

                try {
                    if (typeof GM_registerMenuCommand  != "undefined") {
                        GM_registerMenuCommand("Craigslist Fusion Preference",
                            vyho.lib.Utilities.runWith(this, this.showPreferences, this.browserWin, ""));
                    }
                } catch (err) {
                }

                var minimizeTitle = this.preferences.getMinimizeWindowTitle().getValue();
                var activeWindowBorderColor = this.preferences.getWindowBorderColor().getValue();
                var inactiveWindowBorderColor = this.preferences.getUnfocusedWindowBorderColor().getValue();

                this.showDetailWindow = this.preferences.getShowPostingDetailWindow().getValue();
                this.showImageWindow = this.preferences.getShowImageWindow().getValue();
                this.size = this.preferences.getThumbnailSize().getValue();

                if (this.preferenceWindow != null) {
                    this.preferenceWindow.destroy(null);
                }
                this.preferenceWindow = new vyho.lib.ui.MiniWin(this.PREFERENCE_WINDOW, 500, 400, "Preferences" + sess, null, this.browserWin.document, this.browserWin, this.winManager);

                //            this.preferenceWindow.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.PREFERENCE_WINDOW, browserWin));
                //            this.preferenceWindow.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.PREFERENCE_WINDOW, browserWin));
                this.preferenceWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.PREFERENCE_WINDOW));
                this.preferenceWindow.addVisibleListener(new vyho.lib.ui.WindowHideListener());
                this.preferenceWindow.setMinimizeTitle(minimizeTitle);
                this.preferenceWindow.setActiveBorderColor(activeWindowBorderColor);
                this.preferenceWindow.setInactiveBorderColor(inactiveWindowBorderColor);

                this.layout.addComponent(this.preferenceWindow, vyho.lib.ui.DockLayout.LEFT);
                
                if (this.favWindow != null) {
                    this.favWindow.destroy(null);
                }
                this.favWindow = new vyho.lib.ui.MiniWin(this.FAV_WINDOW, 500, 400, "Favorites" + sess, null, this.browserWin.document, this.browserWin, this.winManager);
                this.favWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.FAV_WINDOW));
                this.favWindow.addVisibleListener(new vyho.lib.ui.WindowHideListener());
                this.favWindow.setMinimizeTitle(minimizeTitle);
                this.favWindow.setActiveBorderColor(activeWindowBorderColor);
                this.favWindow.setInactiveBorderColor(inactiveWindowBorderColor);
                this.layout.addComponent(this.favWindow, vyho.lib.ui.DockLayout.LEFT);

                if (this.bookmarkWindow != null) {
                    this.bookmarkWindow.destroy(null);
                }
                this.bookmarkWindow = new vyho.lib.ui.MiniWin(this.BOOKMARK_WINDOW, 500, 400, "Bookmarks" + sess, null, this.browserWin.document, this.browserWin, this.winManager);
                this.bookmarkWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.BOOKMARK_WINDOW));
                this.bookmarkWindow.addVisibleListener(new vyho.lib.ui.WindowHideListener());
                this.bookmarkWindow.setMinimizeTitle(minimizeTitle);
                this.bookmarkWindow.setActiveBorderColor(activeWindowBorderColor);
                this.bookmarkWindow.setInactiveBorderColor(inactiveWindowBorderColor);
                this.layout.addComponent(this.bookmarkWindow, vyho.lib.ui.DockLayout.LEFT);
                
                if (this.previewWindow != null) {
                    this.previewWindow.destroy(null);
                }
                this.previewWindow = new vyho.lib.ui.MiniWin(this.PHOTO_WINDOW, 500, 400, "Photo" + sess, null, this.browserWin.document, this.browserWin, this.winManager);

                this.imageWindowSizeChangeListener = new vyho.lib.ui.WindowSizeChangeListener(this.PHOTO_WINDOW, this.browserWin);
                this.previewWindow.addSizeChangeListener(this.imageWindowSizeChangeListener);

                this.imageWindowSizeChangeListener.preferences = this.preferences;
                this.imageWindowSizeChangeListener.sizeChanged = function(winObj, evt) {
                    var width = winObj.getWidth();
                    var height = winObj.getHeight();
                    if (width < 10) return;
                    if (height < 10) return;
                    width = winObj.contentArea.offsetWidth - 2 * winObj.padding;
                    height = winObj.contentArea.offsetHeight - 2 * winObj.padding;

                    var theImage = this.browserWin.document.getElementById("prevImageId");
                    if (theImage) {
                        if (this.preferences.getScalePreviewImage().getValue()) {
                            theImage.style.height = height + "px";
                            theImage.style.width = null;
                            if (!this.preferences.getKeepAspectRatio().getValue()) {
                                theImage.style.width = width + "px";
                            } else {
                                if (theImage.offsetWidth > width) {
                                    theImage.style.height = null;
                                    theImage.style.width = width+ "px";
                                }
                            }
                        }
                    }
                }

                this.previewWindow.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.PHOTO_WINDOW, browserWin));
                this.previewWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.PHOTO_WINDOW,
                    vyho.lib.Utilities.runWith(this, this.onImageWindowHide, "", "")));
                //this.previewWindow.addVisibleListener(new WindowVisibleChangeListener(this, "onWindowVisibleChange"));
                this.layout.addComponent(this.previewWindow, vyho.lib.ui.DockLayout.RIGHT);

                this.previewWindow.setMinimizeTitle(minimizeTitle);
                this.previewWindow.setActiveBorderColor(activeWindowBorderColor);
                this.previewWindow.setInactiveBorderColor(inactiveWindowBorderColor);
                /*
                    var WindowClosingListener = function(windowName) {
                    this.windowName = windowName;
                    this.windowClosing = function(winObj, evt) {
                        winObj.setVisible(false);
                        return false;
                    }
                }*/

                if (this.infoWindow != null) {
                    this.infoWindow.destroy(null);
                }
                this.infoWindow = new vyho.lib.ui.MiniWin(this.INFO_WINDOW, 500, 400, "Details" + sess, null, this.browserWin.document, this.browserWin, this.winManager);

                //            this.infoWindow.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.INFO_WINDOW, browserWin));
                this.infoWindow.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.INFO_WINDOW, browserWin));
                this.infoWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.INFO_WINDOW, vyho.lib.Utilities.runWith(this, this.onDetailWindowHide, "", "")));
                //this.infoWindow.addVisibleListener(new WindowVisibleChangeListener(this, "onWindowVisibleChange"));
                this.layout.addComponent(this.infoWindow, vyho.lib.ui.DockLayout.RIGHT);

                this.infoWindow.setMinimizeTitle(minimizeTitle);
                this.infoWindow.setActiveBorderColor(activeWindowBorderColor);
                this.infoWindow.setInactiveBorderColor(inactiveWindowBorderColor);
                this.infoWindow.setBackgroundColor(this.preferences.getBackgroundColor().getValue());
                //this.infoWindow.setInactiveBordderColor(inactiveWindowBorderColor);

                if (this.templateWindow != null) {
                    this.templateWindow.destroy(null);
                }
                this.templateWindow = new vyho.lib.ui.MiniWin(this.TEMPLATE_WINDOW,
                    500, 400, "Email Template Manager" + sess, null, this.browserWin.document, this.browserWin, this.winManager);

                //            this.templateWindow.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.TEMPLATE_WINDOW, browserWin));
                this.templateWindow.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.TEMPLATE_WINDOW, browserWin));
                this.templateWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.TEMPLATE_WINDOW));
                this.templateWindow.addVisibleListener(new vyho.lib.ui.WindowHideListener());
                this.templateWindow.setMinimizeTitle(minimizeTitle);
                this.templateWindow.setActiveBorderColor(activeWindowBorderColor);
                this.templateWindow.setInactiveBorderColor(inactiveWindowBorderColor);

                this.layout.addComponent(this.templateWindow, vyho.lib.ui.DockLayout.LEFT);

                if (this.googleMap != null) {
                    this.googleMap.destroy(null);
                }
                this.googleMap = new vyho.lib.ui.MiniWin(this.GOOGLEMAP_WINDOW, 800, 600,
                    "Google Map" + sess, null, this.browserWin.document, this.browserWin, this.winManager);
                this.googleMap.setEnableFocusPane(true);
                //            this.googleMap.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.GOOGLEMAP_WINDOW, browserWin));
                this.googleMap.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.GOOGLEMAP_WINDOW, browserWin));
                this.googleMap.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.GOOGLEMAP_WINDOW));
                this.googleMap.addVisibleListener(new vyho.lib.ui.WindowHideListener());

                this.googleMap.setMinimizeTitle(minimizeTitle);
                this.googleMap.setActiveBorderColor(activeWindowBorderColor);
                this.googleMap.setInactiveBorderColor(inactiveWindowBorderColor);

                this.layout.addComponent(this.googleMap, vyho.lib.ui.DockLayout.LEFT);

                this.browserWin.addEventListener("resize", vyho.lib.Utilities.runWith(this.layout, this.layout.doLayout, null, null), true);

                //on visible that's when the layout should trigger
                //ideally, when all items are visible, then it will trigger
                //this.doLayout(null, null, null);

                //if true, then register event handler, and layout the windows



                //    emailWindow = new MiniWin("emailWindow", 800, 600, "Email", null, this.browserWin.document, this.browserWin);
                //    emailWindow.setBounds(
                //        vyho.lib.Utilities.pref_getValue(EMAIL_WINDOW + "_Top", 20),
                //        vyho.lib.Utilities.pref_getValue(EMAIL_WINDOW + "_Left", 20),
                //        vyho.lib.Utilities.pref_getValue(EMAIL_WINDOW + "_Width", 500),
                //        vyho.lib.Utilities.pref_getValue(EMAIL_WINDOW + "_Height", 400)
                //        );
                //    emailWindow.setVisible(false);
                //    emailWindow.addSizeChangeListener(new WindowSizeChangeListener(EMAIL_WINDOW));
                //    emailWindow.addClosingListener(new WindowClosingListener(EMAIL_WINDOW));
                this.googleMap.setVisible(false);
                this.templateWindow.setVisible(false);
                this.infoWindow.setVisible(false);
                this.preferenceWindow.setVisible(false);
                this.previewWindow.setVisible(false);
                this.favWindow.setVisible(false);
                this.bookmarkWindow.setVisible(false);

                this.listingWin = new vyho.lib.ui.MiniWin(this.LISTING_WINDOW,
                    500, 400, "Listing" + sess, null, this.browserWin.document, this.browserWin, this.winManager);

                //            this.listingWin.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.LISTING_WINDOW, browserWin));
                this.listingWin.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.LISTING_WINDOW, browserWin));
                //this.listingWin.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.LISTING_WINDOW,
                //    vyho.lib.Utilities.runWith(this, this.onDetailWindowHide, "", "")));
                this.listingWin.setMinimizeTitle(true);
                this.listingWin.setVisible(true);
                this.listingWin.setActiveBorderColor(activeWindowBorderColor);
                this.listingWin.setInactiveBorderColor(inactiveWindowBorderColor);
                this.listingWin.setMiniTitleVisible(false);

                ////////////////////////////////   One time init for styles ///////////////////////
               
                //div.detailAreaClass img { maxHeight: 100%; }
               
                //                var detailAreaClass = "{ width: 100%; height: 300px; overflow-y: scroll; " +
                //                    "overflow-x: hidden; word-wrap: break-word; white-space: normal;" +
                //                    "border: thin solid black;  border-bottom: thin solid lightgray;}";  // 
                //                var detailAreaClass = "{ width: 100%; height: 300px; overflow-y: scroll; " +
                //                    "overflow-x: hidden; word-wrap: break-word; white-space: normal;" +
                //                    "border: thin solid black;  border-bottom: thin solid lightgray;}";  // 
                //                
                //                vyho.lib.Utilities.createStyle(this.browserWin.document, ".detailAreaClass ", detailAreaClass);
                
                var entryGradientEndColor = this.preferences.getEntryGradientColor().getValue();	//#D8D8D8
                var entryClass = "{";
                entryClass += "background: #FFFFFF;\n";
                entryClass += "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FFFFFF', endColorstr='" + entryGradientEndColor + "');\n";
                entryClass += "background: -webkit-gradient(linear, left top, left bottom, from(#FFFFFF), to(" + entryGradientEndColor + "));\n";
                entryClass += "background: -moz-linear-gradient(top,  #FFFFFF,  " + entryGradientEndColor + "); \n";
                entryClass += "margin-top: 10px; \n";
                entryClass += "border-bottom: solid thin DarkGray; \n";
                //entryClass += "border-left: solid thin black; \n";
                //entryClass += "border-right: solid thin black; \n";
                entryClass += "width: 100% !important; margin-left: 0px !important;  margin-right: 0px !important; padding: 0px !important;\n";
                entryClass += "}";
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".entryClass", entryClass);
                
                var blockquoteClass = "{ width: 100% !important; margin: 0px !important; padding: 0px !important; }"; // border: solid thin red;
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".blockquoteClass", blockquoteClass);
                
                var filteredArea = "{ width: 100% !important; margin: 0px !important; padding: 0px !important; }";
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".filteredArea", filteredArea);
                
                var favoriteArea = "{ width: 100% !important; margin: 0px !important; padding: 0px !important; }";
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".favoriteArea", favoriteArea);
                
                //Note: this interferes with grid view
                //var pClass = "{ width: 100% !important; margin-left: 0px !important;  margin-right: 0px !important; padding: 0px !important; }";    // border: solid thin blue;
                //vyho.lib.Utilities.createStyle(this.browserWin.document, "blockquote p ", pClass);
                
                var spanIhClass = "{ display: none; }";
                vyho.lib.Utilities.createStyle(this.browserWin.document, "span.ih ", spanIhClass);
                
                var detailDivClass = "{ word-wrap: break-word !important; white-space: normal !important; }";
                vyho.lib.Utilities.createStyle(this.browserWin.document, "div.detailTextDiv ", detailDivClass);
                        
                var searchfieldset = "{ width: 98%;}";
                vyho.lib.Utilities.createStyle(this.browserWin.document, "#searchfieldset ", searchfieldset);
                
                var searchtable = "{ width: 98%;}";
                vyho.lib.Utilities.createStyle(this.browserWin.document, "#searchtable ", searchtable);
                
                //var postLinkClass = "{ word-wrap: break-word; white-space: pre; white-space: pre-wrap; white-space: pre-line; white-space: -pre-wrap; white-space: -o-pre-wrap; white-space: -moz-pre-wrap; }";
                
                var postLinkClass = "{ word-break: break-all !important; word-wrap: break-word; white-space: pre; white-space: pre-wrap; white-space: normal !important;}";
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".postLinkClass ", postLinkClass);
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, "p a ", postLinkClass);
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".entryClass a", postLinkClass);
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, "a:hover ", "{ background-color: #CCCCCC !important; color: red;}");
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, "#INFO_WINDOW a ", postLinkClass);
                vyho.lib.Utilities.createStyle(this.browserWin.document, "#INFO_WINDOW td, #INFO_WINDOW a, #INFO_WINDOW th, #INFO_WINDOW .hl ", "{ white-space: normal !important; }");
                vyho.lib.Utilities.createStyle(this.browserWin.document, "#FAV_WINDOW td, #FAV_WINDOW a, #FAV_WINDOW th, #FAV_WINDOW .hl ", "{ white-space: normal !important; }");
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, "@media print ", "{ .mediaHideWhenPrint { display: none !important; } }");
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".hideClass", "{display: none !important;}");
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".expandedSearchPanel", "{display: block !important;}");
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".collapsedSearchPanel", "{display: none !important; height: 0px !important;}");
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".embeddedControlAreaClass", "{width: 95%; position: relative; left: 0px; top: 0px; z-index: 99999; border: 1px solid black;}");
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".controlAreaClass", "{width: 95%; position: absolute; left: 0px; top: 0px; z-index: 99999; border: 1px solid black;}");
                // background: none !important; width: 0; height: 0px;
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".toc .modebtns button#mapview:after", "{display: inline-block !important; white-space: nowrap !important; overflow: hidden !important; float: none; clear:both;}");

                //.w1024 section.body { width: 980px; }
                vyho.lib.Utilities.createStyle(this.browserWin.document, "section.body", "{width: auto !important;}"); 
                
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".markedSpam", "{display: none;}");
                vyho.lib.Utilities.createStyle(this.browserWin.document, ".hiddenEntry", "{display: none;}");
                
                if (!this.preferences.getShowNativeFavButton().getValue()) {
                    vyho.lib.Utilities.createStyle(this.browserWin.document, "span.star", "{display: none !important;}");
                }

                vyho.lib.Utilities.createStyle(this.browserWin.document, "ul", "{list-style: disc !important; padding: 5 !important;}");

                vyho.lib.Utilities.createStyle(this.browserWin.document, "ul.ul, ol.ol", "{list-style: disc !important; padding: 5 !important;}");

                vyho.lib.Utilities.createStyle(this.browserWin.document, "ul li", "{padding-left: 5px !important; margin-left: 5px !important; list-style: circle !important; list-style-type: circle !important; }");

                vyho.lib.Utilities.createStyle(this.browserWin.document, ".liCssStyle", "{ padding-left: 5px !important; margin-left: 5px !important; list-style: disc !important; list-style-type: disc !important; }");
                
                ////////////////////////////////////////////////////////////////////////////////////
                this.setupListingWindow();

                if (this.searchWindow != null) {
                    this.searchWindow.destroy(null);
                }
                this.searchWindow = new vyho.lib.ui.MiniWin(this.AUTOSEARCH_WINDOW ,
                    500, 400, "SearchWindow", null, this.browserWin.document, this.browserWin, this.winManager);

                //            this.searchWindow.addSizeChangeListener(new vyho.lib.ui.WindowSizeChangeListener(this.AUTOSEARCH_WINDOW, browserWin));
                this.searchWindow.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(this.AUTOSEARCH_WINDOW, browserWin));
                this.searchWindow.addClosingListener(new vyho.lib.ui.WindowClosingListener(this.AUTOSEARCH_WINDOW, null));
                //this.previewWindow.addVisibleListener(new WindowVisibleChangeListener(this, "onWindowVisibleChange"));

                this.layout.addComponent(this.searchWindow, vyho.lib.ui.DockLayout.RIGHT);

                this.searchWindow.setMinimizeTitle(minimizeTitle);
                this.searchWindow.setActiveBorderColor(activeWindowBorderColor);
                this.searchWindow.setInactiveBorderColor(inactiveWindowBorderColor);
                this.searchWindow.setVisible(false);
                
                this.modifyListing(this.browserWin);

                this.layout.addComponent(this.listingWin, vyho.lib.ui.DockLayout.LEFT);

                var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);
                this.layout.prevWidth = dim[0];
                this.layout.prevHeight = dim[1];
                this.layout.enabled = true;
                this.layout.doLayout();

                //vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, this.layoutFirstTime, null, null), 500);
                this.layoutFirstTime();
                
                if (this.postInitialize) {
                    this.postInitialize();
                }
                
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to initialize Craigslist Fusion: ", err);
            }
        }
        
        this.layoutFirstTime = function(evt) {
            if (!this.hasLayoutPreferences()) {
                this.layoutWindows(null, 0.5, null);
            }
        }
        
        this.showBookmarks = function(browserWin, container) {
            try {
                if (this.bookmarkList.length == 0) {
                    return;
                }
                
                if (typeof container == "undefined" || container == null) {
                    var leftBar = browserWin.document.getElementById("leftbar");
                    if (!leftBar) {
                        return;
                    }

                    var postlks = browserWin.document.getElementById("postlks");
                    if (!postlks) {
                        return;
                    }
                    container = postlks;
                }
                
                var bm;
                var bmDiv;
                var link;
                
                var bookmarkDiv = vyho.lib.Utilities.addNewAfter("div", container);
                for (var i = 0; i < 4 && i < this.bookmarkList.length; i++) {
                    bm = this.bookmarkList[i];
                    bmDiv = vyho.lib.Utilities.addNew("div", bookmarkDiv);
                    //add link
                    link = vyho.lib.Utilities.addNew("a", bmDiv);
                    vyho.lib.Utilities.newText(bm.subject, link);
                    link.href = "javascript:void()";
                    link.addEventListener("click", vyho.lib.Utilities.runWith(this, function(evt, url, param2) {
                        if (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                        
                        browserWin.location.href = url;
                    }, bm.url, ""), false);
                //add remove button (not for the auto item)
                }
                
                if (this.bookmarkList.length > 4) {
                    //create a "Select"
                    var select = vyho.lib.Utilities.addNew("select", bookmarkDiv);
                    for (i = 4; i < this.bookmarkList.length; i++) {
                        bm = this.bookmarkList[i];
                        var option = new Option(bm.subject, bm.url, false, false);
                        select.options.add(option); 
                        //add link
                        /*
                        link = vyho.lib.Utilities.addNew("a", bmDiv);
                        vyho.lib.Utilities.newText(bm.subject, link);
                        link.href = "javascript:void()";
                        */
                        //todo, change to select change or select click
                        option.addEventListener("click", vyho.lib.Utilities.runWith(this, function(evt, url, param2) {
                            if (evt) {
                                evt.preventDefault();
                                evt.stopPropagation();
                            }

                            browserWin.location.href = url;
                        }, bm.url, ""), false);
                    //add remove button (not for the auto item)
                        
                    }
                }
                
            } catch (error) {
                alert("Failed to load bookmarks in the home page. " + error);
            }
        }
        
        this.initStyles = function() {
            
        }
        /*
        this.hasLayoutPreferences = function() {
            var value = vyho.lib.Utilities.pref_getValue("vyho.lib.pref.CheckLayoutPreferencesV4", null);
            vyho.lib.Utilities.pref_setValue("vyho.lib.pref.CheckLayoutPreferencesV4", "fusion_preferences");
            if (value == null) {
                return false;
            }
            return true;
        }
        */
        
        this.hasLayoutPreferences = function() {
            var value = vyho.lib.Utilities.pref_getValue("vyho.lib.craigslistFusion.CheckLayoutPreferencesV2", null);
            
            if (value == null) {
                vyho.lib.Utilities.pref_setValue("vyho.lib.craigslistFusion.CheckLayoutPreferencesV2", 0);
                return false;
            } else {
                if (value == 0 || value == 1) {
                    value = value + 1;
                    vyho.lib.Utilities.pref_setValue("vyho.lib.craigslistFusion.CheckLayoutPreferencesV2", value);
                    return false;
                }
                return true;
            }
        }

        this.setUpRefreshPage = function(evt, param1, param2) {
            try {
                this.activeUser = false;
                if (this.activeUserListener) {
                    this.browserWin.removeEventListener("mousemove", this.activeUserListener, true);
                }

                this.activeUserListener =  vyho.lib.Utilities.runWith(this, this.onMouseMoveListener, "", "");
                this.browserWin.addEventListener("mousemove", this.activeUserListener, false);

                this.setUpRefresh();
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to setup refresh page : " , err);
            }
        }

        this.setUpRefresh = function(evt, param1, param2) {
            var enableAutoRefresh = this.preferences.getEnableAutoRefresh().getValue();
            var refreshInterval;
            try {
                refreshInterval = parseInt(this.preferences.getRefreshInterval().getValue());
            } catch (err) {
                enableAutoRefresh = false;
            }

            if (refreshInterval < 1 || refreshInterval > 20) {
                enableAutoRefresh = false;
            }

            if (this.refreshHandle) {
                clearTimeout(this.refreshHandle);
                this.refreshHandle = null;
            }
            if (enableAutoRefresh) {   //in the future, can add a little rotating star, or somekind of clock
                this.refreshHandle = vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, this.refreshPage, "", ""),
                    refreshInterval * 60 * 1000);
            }
        }

        this.onMouseMoveListener = function(evt, param1, param2) {
            this.activeUser = true;
            this.setUpRefresh(null, null, null);
        }

        this.refreshPage = function(evt, param1, param2) {
            if (this.theForm) {
                this.theForm.submit();
            }
        }

        this.processGoogleMail = function() {
            var func = vyho.lib.Utilities.runWith(this, this.processGoogleMailDelay, null, null);
            vyho.lib.Utilities.runOnce(func, 3000);
        }

        this.processGoogleMailDelay = function(evt, param1, param2) {
            var doc = this.browserWin.document;

            var bs = doc.getElementsByTagName("b");
            var sendNode = null;
            if (bs != null && bs.length > 0) {
                for (var i = 0; i < bs.length; i++) {
                    var text = bs[i].textContent;
                    if (text == "Send") {
                        sendNode = bs[i];
                        bs[i].textContent = "My Send";
                        break;
                    }
                }
                try {
                    if (sendNode != null) {
                        var node = sendNode.parentNode;
                        var clickevent = doc.createEvent("MouseEvents");
                        //clickevent.initEvent("mouseup", true, true);
                        clickevent.initMouseEvent(
                            'mouseup',
                            false,
                            true,
                            this.browserWin,
                            1,
                            node.offsetLeft,
                            node.offsetTop,
                            node.offsetLeft,
                            node.offsetTop,
                            false,
                            false,
                            false,
                            false,
                            0,
                            null);

                        var count = 0;
                        while (node != null) {
                            count++;
                            node.dispatchEvent(clickevent);
                            node = node.parentNode;
                            if (count == 3) break;
                        }
                    }
                }
                catch (err) {
                }
            }
        }
        
        
        this.saveHideList = function() {
            try {
                var serializer = new vyho.lib.Serializer();
                var hide_ser = serializer.encode(this.hideList);
                if (hide_ser != null) {
                    vyho.lib.Utilities.pref_setValue(this.HIDE_LIST, hide_ser);
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }
        
        this.loadHideList = function() {
            try {
                var hide_ser = vyho.lib.Utilities.pref_getValue(this.HIDE_LIST, null);
                if (hide_ser != null) {
                    var serializer = new vyho.lib.Serializer();
                    var data = serializer.decode(hide_ser);
                    if (data != null) {
                        this.hideList = data;
                        for (var i = 0; i < this.hideList.length; i++) {
                            this.hideMap.put(this.hideList[i], ".");
                        }
                    } else {
                    }
                } else {
                }
            } catch (err) {
            }
        }
        
        this.importFavList = function(serializedData) {
            try {
                if (!vyho.lib.Utilities.isEmpty(serializedData, true)) {
                    var serializer = new vyho.lib.Serializer();
                    var data = serializer.decode(serializedData);
                    for (var i = 0; i < data.length; i++) {
                        this.favMap.put(data[i].postId, ".");
                        this.favList[this.favList.length] = data[i];
                    }
                    this.saveFavList();
                    return true;
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to import data.  Invalid data found.");
            }
            return false;
        }
        
        this.exportFavList = function() {
            try {
                var serializer = new vyho.lib.Serializer();
                var fav_ser = serializer.encode(this.favList);
                return fav_ser;
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
            return null;
        }
        
        this.exportBookmarkList = function() {
            try {
                var serializer = new vyho.lib.Serializer();
                var bm_ser = serializer.encode(this.bookmarkList);
                return bm_ser;
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
            return null;
        }
        
        this.saveBookmarkList = function() {
            try {
                var bm_ser = this.exportBookmarkList();
                if (bm_ser != null) {
                    vyho.lib.Utilities.pref_setValue(this.BOOKMARK_LIST, bm_ser);
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }

        this.loadBookmarkList = function() {
            try {
                var bm_ser = vyho.lib.Utilities.pref_getValue(this.BOOKMARK_LIST, null);
                if (bm_ser != null) {
                    var serializer = new vyho.lib.Serializer();
                    var data = serializer.decode(bm_ser);
                    if (data != null) {
                        this.bookmarkList = data;
                        for (var i = 0; i < this.bookmarkList.length; i++) {
                            this.bookmarkMap.put(this.bookmarkList[i].url, ".");
                        }
                    } else {
                    }
                } else {
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to load bookmark list: ", err);
            }
        }
        
        this.saveFavList = function() {
            try {
                var fav_ser = this.exportFavList();
                if (fav_ser != null) {
                    vyho.lib.Utilities.pref_setValue(this.FAV_LIST, fav_ser);
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }

        this.loadFavList = function() {
            try {
                var fav_ser = vyho.lib.Utilities.pref_getValue(this.FAV_LIST, null);
                if (fav_ser != null) {
                    var serializer = new vyho.lib.Serializer();
                    var data = serializer.decode(fav_ser);
                    if (data != null) {
                        this.favList = data;
                        for (var i = 0; i < this.favList.length; i++) {
                            this.favMap.put(this.favList[i].postId, ".");
                        }
                    } else {
                    }
                } else {
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to load fav list: ", err);
            }
        }

        this.saveSpamList = function() {
            try {
                var serializer = new vyho.lib.Serializer();
                var spam_ser = serializer.encode(this.spamList);
                if (spam_ser != null) {
                    vyho.lib.Utilities.pref_setValue(this.SPAM_LIST, spam_ser);
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }

        this.loadSpamList = function() {
            try {
                var spam_ser = vyho.lib.Utilities.pref_getValue(this.SPAM_LIST, null);
                if (spam_ser != null) {
                    var serializer = new vyho.lib.Serializer();
                    var spamData = serializer.decode(spam_ser);
                    if (spamData != null) {
                        this.spamList = spamData;
                        for (var i = 0; i < this.spamList.length; i++) {
                            this.spamMap.put(this.spamList[i], ".");
                        }
                    } else {
                    }
                } else {
                }
            } catch (err) {
            }
        }

        this.saveEmailedList = function() {
            try {
                var serializer = new vyho.lib.Serializer();
                var emailed_ser = serializer.encode(this.emailedList);
                if (emailed_ser != null) {
                    vyho.lib.Utilities.pref_setValue(this.EMAILED_LIST, emailed_ser);
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }

        this.loadEmailedList = function() {
            try {
                var emailed_ser = vyho.lib.Utilities.pref_getValue(this.EMAILED_LIST, null);
                if (emailed_ser != null) {
                    var serializer = new vyho.lib.Serializer();
                    var emailedData = serializer.decode(emailed_ser);
                    if (emailedData != null) {
                        this.emailedList = emailedData;
                        for (var i = 0; i < this.emailedList.length; i++) {
                            this.emailedMap.put(this.emailedList[i], ".");
                        }
                    } else {
                    }
                } else {
                }
            } catch (err) {
            }
        }
        
        this.getListingArea = function() {
            return this.listingWin.contentArea;
        }

        this.hideChildren = function(parentNode) {
            var childNodes = parentNode.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                vyho.lib.Utilities.addClass(childNodes[i], "hideClass");
            }
        }

        this.showChildren = function(parentNode) {
            var childNodes = parentNode.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                vyho.lib.Utilities.removeClass(childNodes[i], "hideClass");
            }
        }

        this.setupListingWindow = function() {
            //set up a blank for the form's show/hide header
            var i;
            
            this.theForm = vyho.lib.Utilities.findFirstItem("form", null, this.browserWin.document);

            var topPage = vyho.lib.Utilities.addNew("a", this.getListingArea());
            topPage.id = "toppage";
            
            this.controlArea = vyho.lib.Utilities.addNew("div", this.getListingArea());
            
            if (this.preferences.getEnableAutoHideForm().getValue()) {
                vyho.lib.Utilities.addClass(this.controlArea, "controlAreaClass");
            } else {
                vyho.lib.Utilities.addClass(this.controlArea, "embeddedControlAreaClass");
            }
            
            this.controlTitle = vyho.lib.Utilities.addNew("div", this.controlArea);

            this.controlTitle.setAttribute("style", "width: 100%; height: 20px; background-color:rgba(200, 200, 200,0.5); ");
            
            var titleDiv = vyho.lib.Utilities.addNew("div", this.controlTitle);
            titleDiv.setAttribute("style", "width: 250px; background-color: #AADDDD; float: right;");
            
            vyho.lib.Utilities.newText("Craigslist Fusion Toolbar", titleDiv);

            var commandDiv = vyho.lib.Utilities.addNew("div", this.controlArea);
            
            this.controlTitle.addEventListener("click", vyho.lib.Utilities.runWith(this, function(evt, commandDiv, p2) {
                evt.preventDefault();
                evt.stopPropagation();
                vyho.lib.Utilities.removeClass(commandDiv, "collapsedSearchPanel");
                vyho.lib.Utilities.addClass(commandDiv, "expandedSearchPanel");
                vyho.lib.Utilities.addClass(this.controlTitle, "collapsedSearchPanel");
                vyho.lib.Utilities.removeClass(this.controlTitle, "expandedSearchPanel");
            }, commandDiv), true);

            //
            //Set up links area
            commandDiv.style.maxWidth = "100%";
            commandDiv.style.width = "100%";
            //commandDiv.style.zIndex = 1;
            commandDiv.style.border = "solid";
            commandDiv.style.borderWidth = "0px";
            commandDiv.style.borderColor = "black";
            commandDiv.style.backgroundColor = "#DFDFDF";
            
            var table = vyho.lib.Utilities.addNew("table", commandDiv);

            var cmdStyle = "background-color: #D0D0D0 !important;";
            var tr = vyho.lib.Utilities.addNew("tr", table);
            var td = vyho.lib.Utilities.addNew("td", tr);
            var pref = vyho.lib.Utilities.addNew("a", td);
            pref.setAttribute("style", cmdStyle);
            pref.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("Preferences", pref);
            pref.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showPreference, this.browserWin, ""), false);
            td.style.width = "100px";
            
            td = vyho.lib.Utilities.addNew("td", tr);
            var fav = vyho.lib.Utilities.addNew("a", td);
            fav.setAttribute("style", cmdStyle);
            fav.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("Favs", fav);
            fav.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showFavorites, this.browserWin, ""), false);
            td.style.width = "100px";
            
            vyho.lib.Utilities.newText("  ", td);
            var searchLink = vyho.lib.Utilities.addNew("a", td);
            searchLink.setAttribute("style", cmdStyle);
            searchLink.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("Filters", searchLink);
            searchLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showFilterAndSearchWindow, 1.0, ""), false);
            
            td = vyho.lib.Utilities.addNew("td", tr);
            var sticky = vyho.lib.Utilities.addNew("a", td);
            sticky.setAttribute("style", cmdStyle);
            sticky.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("Sticky Mode", sticky);
            sticky.addEventListener("click", vyho.lib.Utilities.runWith(this, this.setStickyMode, this.browserWin, ""), false);
            td.style.width = "100px";
            
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            vyho.lib.Utilities.newText("Fit  ", td);
            var resizer = vyho.lib.Utilities.addNew("a", td);
            resizer.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("50%", resizer);
            resizer.setAttribute("style", "font-weight: bold; " + cmdStyle);
            resizer.addEventListener("click", vyho.lib.Utilities.runWith(this, this.layoutWindows, 0.5, ""), false);

            vyho.lib.Utilities.newText("  ", td);
            resizer = vyho.lib.Utilities.addNew("a", td);
            resizer.setAttribute("style", cmdStyle);
            resizer.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("60%", resizer);
            resizer.addEventListener("click", vyho.lib.Utilities.runWith(this, this.layoutWindows, 0.6, ""), false);

            vyho.lib.Utilities.newText("  ", td);
            resizer = vyho.lib.Utilities.addNew("a", td);
            resizer.setAttribute("style", cmdStyle);
            resizer.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("70%", resizer);
            resizer.addEventListener("click", vyho.lib.Utilities.runWith(this, this.layoutWindows, 0.7, ""), false);

            vyho.lib.Utilities.newText("  ", td);
            resizer = vyho.lib.Utilities.addNew("a", td);
            resizer.setAttribute("style", cmdStyle);
            resizer.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("100%", resizer);
            resizer.addEventListener("click", vyho.lib.Utilities.runWith(this, this.layoutWindows, 1.0, ""), false);

            td = vyho.lib.Utilities.addNew("td", tr);
            var bookmark = vyho.lib.Utilities.addNew("a", td);
            bookmark.setAttribute("style", cmdStyle);
            bookmark.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("+Page", bookmark);
            bookmark.addEventListener("click", vyho.lib.Utilities.runWith(this, this.addBookmark, false, ""), false);

            vyho.lib.Utilities.newText("  ", td);
            var showBookmarks = vyho.lib.Utilities.addNew("a", td);
            showBookmarks.setAttribute("style", cmdStyle);
            showBookmarks.href = "javascript:void(0)";
            vyho.lib.Utilities.newText("Links", showBookmarks);
            showBookmarks.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showBookmarkWindow, 
                null, ""), false);
            
            td = vyho.lib.Utilities.addNew("td", tr);
            vyho.lib.Utilities.newText("  ", td);
            //            var showMapWindow = vyho.lib.Utilities.addNew("a", td);
            //            showMapWindow.setAttribute("style", cmdStyle);
            //            showMapWindow.href = "javascript:void(0)";
            //            vyho.lib.Utilities.newText("Map", showMapWindow);
            //            showMapWindow.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showMapWindow, 1.0, ""), false);
            //
            //            vyho.lib.Utilities.newText("    ", td);
            var goTop = vyho.lib.Utilities.addNew("a", td);
            goTop.setAttribute("style", cmdStyle);
            goTop.href = "#toppage";
            vyho.lib.Utilities.newText("Go Top", goTop);
            
            //showMapWindow.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showMapWindow, 1.0, ""), false);


            td.style.width = "100px";

            table.style.width = "500px";
            
            var blank = vyho.lib.Utilities.addNew("div", this.getListingArea());
            
            if (this.preferences.getEnableAutoHideForm().getValue()) {
                blank.setAttribute("style", "height: 10px;");
            } else {
                vyho.lib.Utilities.addClass(blank, "expandedSearchPanel");
            }

            
            if (this.theForm) {
                commandDiv.appendChild(this.theForm);
            }
            
            var selCat = this.browserWin.document.getElementById("catAbb");
            
            if (this.preferences.getEnableAutoHideForm().getValue()) {
                            
                vyho.lib.Utilities.addClass(commandDiv, "collapsedSearchPanel");

                vyho.lib.Utilities.hover(this.controlArea, null, null, null,
                    vyho.lib.Utilities.runWith(this, function(evt, p1, p2) {
                        vyho.lib.Utilities.removeClass(commandDiv, "collapsedSearchPanel");
                        vyho.lib.Utilities.addClass(commandDiv, "expandedSearchPanel");
                        vyho.lib.Utilities.addClass(this.controlTitle, "collapsedSearchPanel");
                        vyho.lib.Utilities.removeClass(this.controlTitle, "expandedSearchPanel");
                    }),
                    vyho.lib.Utilities.runWith(this, function(evt, p1, p2) {
                        if (this.theForm) {
                            if (vyho.lib.Utilities.isDescendant(evt.target, this.theForm)) {
                                var nodeName = evt.target.nodeName;
                                if (nodeName == "INPUT" || nodeName == "SELECT") {
                                    return;
                                }
                            }
                            var node = this.browserWin.document.elementFromPoint(evt.pageX, evt.pageY);
                            if (node) {
                                if (vyho.lib.Utilities.isDescendant(node, this.controlArea)) {
                                    return;
                                }
                            }
                        }

                        vyho.lib.Utilities.removeClass(commandDiv, "expandedSearchPanel");
                        vyho.lib.Utilities.addClass(commandDiv, "collapsedSearchPanel");
                        vyho.lib.Utilities.removeClass(this.controlTitle, "collapsedSearchPanel");
                        vyho.lib.Utilities.addClass(this.controlTitle, "expandedSearchPanel");
                    })
                    );
            }
            
            var entryDiv = vyho.lib.Utilities.addNew("div", this.getListingArea());
            entryDiv.style.maxWidth = "98%";
            entryDiv.style.width = "98%";
            entryDiv.style.zIndex = 1;
            entryDiv.style.border = "solid";
            entryDiv.style.borderWidth = "0px";
            entryDiv.style.borderColor = "black";
            
            
            vyho.lib.Utilities.addNew("br", entryDiv);
            var head = vyho.lib.Utilities.findFirstItem("div", "bchead", this.browserWin.document);
            if (head) {
                head.style.width = "95%";
            }
            
            /*
            var head = this.findFirstItem("div", "bchead");
            if (head) {
              if (head.parentNode) {
                //head.parentNode.removeChild(head);
              }
              entryDiv.appendChild(head);
            }

            this.theForm = this.findFirstItem("form", null);
            if (theForm) {
              if (theForm.parentNode) {
                theForm.parentNode.removeChild(theForm);
              }
              entryDiv.appendChild(theForm);
            }

            var doc = this.browserWin.document;
            var items = doc.getElementsByTagName("blockquote");

            for(var i = 0; i < items.length; i++){
              if (items[i] && items[i].parentNode) {
                //items[i].parentNode.removeChild(items[i]);
              }
              entryDiv.appendChild(items[i]);
            }
            */
            try {
                if (this.theForm) {
                    var searchFieldSet = this.browserWin.document.getElementById("searchfieldset", this.browserWin.document);
                    if (searchFieldSet) {
                        searchFieldSet.className = "";
                        searchFieldSet.setAttribute("style", "margin: 2px; padding: 0px; width: 99% !important;");
                    }
                    var submit = vyho.lib.Utilities.findNode(this.theForm, "input", {
                        type: "submit",
                        value: "search"
                    });

                    if (submit) {
                        var searchFormTbl = this.browserWin.document.getElementById("searchtable");
                        
                        if (searchFormTbl) {
                            searchFormTbl.setAttribute("style", "padding: 2px; width: 100%;");
                            //create various rows:
                            //1. The query text row: label col, text field col
                            //2. The category col, the category
                            //3. title or entire poist and has image
                            //4. Price label, min/max col
                            //5. search button
                            var trQuery = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                            var tdQuery = vyho.lib.Utilities.addNew("td", trQuery);
                            tdQuery.style.width = "100px";
                            vyho.lib.Utilities.newText("Search for: ", tdQuery);
                            tdQuery = vyho.lib.Utilities.addNew("td", trQuery);
                            var query = this.browserWin.document.getElementById("query");
                            
                            if (query) {
                                tdQuery.appendChild(query);
                            }
                            
                            var trCat = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                            var tdCat = vyho.lib.Utilities.addNew("td", trCat);
                            vyho.lib.Utilities.newText("In: ", tdCat);    
                            tdCat = vyho.lib.Utilities.addNew("td", trCat);

                            if (selCat) {
                                tdCat.appendChild(selCat);
                            }
                            
                            var trOptions = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                            var tdOptions = vyho.lib.Utilities.addNew("td", trOptions);
                            vyho.lib.Utilities.newText("Options: ", tdOptions);    
                            tdOptions = vyho.lib.Utilities.addNew("td", trOptions);
                            var label;
                            var searchType = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                type: "checkbox",
                                name: "srchType",
                                value: "T"
                            });
                            if (searchType) {
                                label = vyho.lib.Utilities.addNew("label", tdOptions);
                                label.style.marginRight = "10px";
                                vyho.lib.Utilities.newText("in title", label);
                                label.appendChild(searchType);
                            }
                            searchType = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                type: "radio",
                                name: "srchType",
                                value: "A"
                            });
                            if (searchType) {
                                label = vyho.lib.Utilities.addNew("label", tdOptions);
                                label.style.marginRight = "15px";
                                vyho.lib.Utilities.newText("in entire post", label);
                                label.appendChild(searchType);
                            }
                            var hasImgChkbx = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                type: "checkbox",
                                name: "hasPic"
                            });
                            if (hasImgChkbx) {
                                label = vyho.lib.Utilities.addNew("label", tdOptions);
                                vyho.lib.Utilities.newText("has image(s)", label);
                                label.appendChild(hasImgChkbx);
                            }

                            //<select name="bedrooms">
                            //<input type="checkbox" value="purrr" name="addTwo">
                            //<input type="checkbox" value="wooof" name="addThree">
                            //<button type="button" id="hoodtitle">

                            var purrr = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                name: "addTwo"
                            });
                            if (purrr) {
                                formTr = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                formTd1 = vyho.lib.Utilities.addNew("td", formTr);
                                formTd2 = vyho.lib.Utilities.addNew("td", formTr);
                                label = vyho.lib.Utilities.addNew("label", formTd1);
                                vyho.lib.Utilities.newText("Cats:", label);
                                formTd2.appendChild(purrr);
                                purrr.setAttribute("id", "purrr");
                                label.setAttribute("for", purrr.id);
                            }
                            var wooof = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                name: "addThree"
                            });
                            if (wooof) {
                                formTr = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                formTd1 = vyho.lib.Utilities.addNew("td", formTr);
                                formTd2 = vyho.lib.Utilities.addNew("td", formTr);
                                label = vyho.lib.Utilities.addNew("label", formTd1);
                                vyho.lib.Utilities.newText("Dogs:", label);
                                formTd2.appendChild(wooof);
                                wooof.setAttribute("id", "woof");
                                label.setAttribute("for", wooof.id);
                            }

                            var formTr;
                            var formTd1;
                            var formTd2;
                            var bedrooms = vyho.lib.Utilities.findNode(this.theForm, "select", {
                                name: "bedrooms"
                            });
                            if (bedrooms) {
                                formTr = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                formTd1 = vyho.lib.Utilities.addNew("td", formTr);
                                formTd2 = vyho.lib.Utilities.addNew("td", formTr);
                                vyho.lib.Utilities.newText("Bed rooms:", formTd1);
                                formTd2.appendChild(bedrooms);
                            }
                            
                            var housingType = vyho.lib.Utilities.findNode(this.theForm, "select", {
                                name: "housing_type"
                            });
                            if (housingType) {
                                formTr = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                formTd1 = vyho.lib.Utilities.addNew("td", formTr);
                                formTd2 = vyho.lib.Utilities.addNew("td", formTr);
                                vyho.lib.Utilities.newText("Housing type:", formTd1);
                                formTd2.appendChild(housingType);
                            }

                            var neighborhood = vyho.lib.Utilities.findNode(this.theForm, "select", {
                                name: "nh", 
                                id: "nh"
                            });
                            var neighborhoodBtn = vyho.lib.Utilities.findNode(this.theForm, "button", {
                                id: "hoodtitle"
                            });
                            if (neighborhood && neighborhoodBtn) {
                                //.click(function(e){e.preventDefault;toggleHoods();})
                                formTr = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                formTd1 = vyho.lib.Utilities.addNew("td", formTr);
                                formTd2 = vyho.lib.Utilities.addNew("td", formTr);
                                vyho.lib.Utilities.newText("Neighborhoods:", formTd1);
                                //formTd1.appendChild(neighborhoodBtn);
                                //neighborhoodBtn.onclick = function(e) { //function(e){e.preventDefault();toggleHoods();}
                                //    e.preventDefault();
                                //avoid calling CL's func
                                //}
                                //formTd2.appendChild(neighborhood);

                                var neighborhood2 = vyho.lib.Utilities.addNew("select", formTd2);
                                neighborhood2.id = "nh2";
                                neighborhood2.setAttribute("id", "nh2");
                                neighborhood2.name = "nh";
                                neighborhood2.setAttribute("name", "nh");
                                neighborhood2.setAttribute("style", "display: block !important;");
                                neighborhood2.removeAttribute("disabled");
                                neighborhood2.setAttribute("multiple", "multiple");

                                //<option value="">all neighborhoods</option>
                                var option;
                                option = new Option("all", "", false, false);
                                neighborhood2.options.add(option);
                                for (var idx = 0; idx < neighborhood.options.length; idx++) {
                                    option = new Option(neighborhood.options[idx].text, neighborhood.options[idx].value, false, false);
                                    neighborhood2.options.add(option);    //[templateList.options.length] = option;
                                    option.selected = neighborhood.options[idx].selected;
                                }
                                vyho.lib.Utilities.removeNode(neighborhood);
                            }

                            var minAsk = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                name: "minAsk"
                            });
                            var maxAsk = vyho.lib.Utilities.findNode(this.theForm, "input", {
                                name: "maxAsk"
                            });

                            if (minAsk && maxAsk) {
                                var trPrice = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                var tdPrice = vyho.lib.Utilities.addNew("td", trPrice);
                                vyho.lib.Utilities.newText("Price:", tdPrice);
                                tdPrice = vyho.lib.Utilities.addNew("td", trPrice);
                                tdPrice.appendChild(minAsk);

                                tdPrice.appendChild(maxAsk);
                                submit.style.marginLeft = "50px";
                                tdPrice.appendChild(submit);
                            } else {
                                var trSubmit = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                                var tdSubmit = vyho.lib.Utilities.addNew("td", trSubmit);
                                tdSubmit = vyho.lib.Utilities.addNew("td", trSubmit);
                                tdSubmit.appendChild(submit);
                                submit.style.marginLeft = "200px";
                            }

                            var trCommandBtns = vyho.lib.Utilities.addNew("tr", searchFormTbl);
                            var tdCommandBtns = vyho.lib.Utilities.addNew("td", trCommandBtns);
                            tdCommandBtns.setAttribute("colSpan", "2");
                            tdCommandBtns.setAttribute("style", "word-wrap: normal !important; white-space: normal !important; ");
                            
                            var btnTabGroup = vyho.lib.Utilities.findNode(this.browserWin.document, "blockquote", {
                                "class": "modebtns"
                            });
                            if (btnTabGroup) {
                                if (this.nodes) {
                                    for (i = this.nodes.length - 1; i >= 0; i--) {
                                        if (this.nodes[i] == btnTabGroup) {
                                            this.nodes.splice(i, 1);
                                        }
                                    }
                                }
                                tdCommandBtns.appendChild(btnTabGroup);
                                btnTabGroup.setAttribute("style", "display: inline-block !important;");
                            }

                            var showHidden = vyho.lib.Utilities.addNew("a", tdCommandBtns);
                            showHidden.href = "javascript:void(0)";
                            vyho.lib.Utilities.newText("See All", showHidden);
                            showHidden.addEventListener("click", 
                                vyho.lib.Utilities.runWith(this, this.showHiddenEntries, 0.5, ""), false);
                            
                            var searchgroups = vyho.lib.Utilities.findNodes(searchFormTbl, "span", {
                                "class": "searchgroup"
                            });
                            for (i = 0; i < searchgroups.length; i++) {
                                //vyho.lib.Utilities.removeNode(searchgroup);
                                searchgroups[i].style.display = "none";
                            }    
                        }                     
                            
                    }
                    
                    var divBcHead = vyho.lib.Utilities.findNode(this.browserWin.document, "DIV", {
                        "class": "bchead"
                    });
                    //var bcHeadContent = vyho.lib.Utilities.findNode(divBcHead, "BLOCKQUOTE", {});
                    if (divBcHead) {
                        divBcHead.setAttribute("style", "width: 98% !important;");
                        divBcHead.className = "";
                    }
                    
                    if (!this.suppressedWarning) {
                        var messagetable = this.browserWin.document.getElementById("messagetable"); //blockquote#messagetable.blockquoteClass
                        if (messagetable) {
                            var messages = this.browserWin.document.getElementById("messages");
                            if (messages) {
                                //messagetable.setAttribute("style", "height: auto; margin: 0px; padding: 0px;");
                                //messages.style.display = "none";
                                messagetable.style.display = "none";
                                
                                var ef = this.browserWin.document.getElementById("ef");
                                if (ef) {
                                    var warning = vyho.lib.Utilities.addNew("a", ef);
                                    warning.href = "javascript:void(0)";

                                    vyho.lib.Utilities.newText("Toggle Warning", warning);
                                    warning.addEventListener("click", function(evt) {
                                        if (messagetable.style.display == "none") {
                                            messagetable.style.display = "block";
                                        } else {
                                            messagetable.style.display = "none";
                                        }
                                        evt.preventDefault();
                                        evt.stopPropagation();
                                        return false;
                                    }, false);
                                }
                            }
                        }
                        this.suppressedWarning = true;
                    }
                    
                    
                }
            } catch (error) {
                vyho.lib.Utilities.notify("Error (1) in setting up listing window: " + sess, error);
            }
            /*
            this.searchesDiv = vyho.lib.Utilities.addNew("div", entryDiv);
            this.searchesDiv.style.maxWidth = "98%";
            this.searchesDiv.style.width = "98%";
            this.searchesDiv.style.zIndex = 1;
            this.searchesDiv.style.border = "solid";
            this.searchesDiv.style.borderWidth = "0px";
            this.searchesDiv.style.borderColor = "black";
            */
            try {
                for (i = 0; i < this.nodes.length; i++) {
                    try {
                        if (this.nodes[i]) {
                            if (entryDiv != this.nodes[i]) {
                                if (this.nodes[i].nodeName == "BLOCKQUOTE") {
                                    vyho.lib.Utilities.addClass(this.nodes[i], "blockquoteClass");
                                }
                                entryDiv.appendChild(this.nodes[i]);
                            }
                        }
                    } catch (err) {
                    }
                }
            } catch (error) {
            }
            this.nodes = null;
            this.itemTable = entryDiv;
        }
        
        this.showHiddenEntries = function(evt, param1, param2) {
            var links = this.getListEntries(this.getListingArea());  //container pane
            var i;
            var entry;
            for (i = 0; i < links.length; i++) {
                var postId = this.getPostId(links[i]);
                if (postId == null) {
                    continue;
                }
                if (this.spamMap.contains(postId) || this.hideMap.contains(postId)) {
                    entry = vyho.lib.Utilities.findFirstParent(links[i], "P");
                    if (entry == null) {
                        entry = links[i].parentNode;
                    }
                    
                    vyho.lib.Utilities.removeClass(entry, "markedSpam");
                    vyho.lib.Utilities.removeClass(entry, "hiddenEntry");
                        
                    if (!vyho.lib.Utilities.hasClass(entry, "entryProcessed")) {
                        vyho.lib.Utilities.addClass(entry, "entryProcessed");
                        this.preProcessDetails(links[i], [entry, "main", postId]);
                    
                        var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                            method: "GET",
                            url: links[i].href,
                            headers: {
                                "Accept" : "text/html,text/xml,text/plain"
                            },
                            contentHandler: vyho.lib.Utilities.runWith(this, this.processDetails, links[i], [entry, "main", postId]),
                            data : null
                        });
                        req.send();
                    }
                }
            }
        }

        this.showFilterAndSearchWindow = function(evt, param1, param2) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }

            var searchData = vyho.lib.Utilities.pref_getValue("SEARCHES", "[]");
            var searches;
            var serializer;
            serializer = new vyho.lib.Serializer();
            searches = serializer.decode(searchData);

            var doc = this.browserWin.document;

            var contentArea = this.searchWindow.contentArea;
            vyho.lib.Utilities.removeAllChildren(contentArea);

            this.searchWindow.setVisible(true);
            this.searchWindow.requestFocus();
            //this.adjustWindow(this.searchWindow);

            contentArea.appendChild(doc.createElement("br"));
            contentArea.appendChild(doc.createElement("br"));

            var addNew = vyho.lib.Utilities.addNew;
            var table = addNew("table", contentArea);
            table.setAttribute("width", "100%");
            table.setAttribute("border", "0");

            var tr = addNew("tr", table);
            var td = addNew("td", tr);
            vyho.lib.Utilities.newText("Edit Searches:", td);
            td = addNew("td", tr);
            var select = addNew("select", td);
            select.id = "searchListId";
            var option = addNew("option", select);
            //option.setAttribute("value", "");
            vyho.lib.Utilities.newText("             ", td);
            var editButton = addNew("input", td);
            editButton.setAttribute("type", "button");
            editButton.setAttribute("value", "Edit");
            editButton.id = "editSearchId";

            var button = addNew("input", td);
            button.setAttribute("type", "button");
            button.setAttribute("value", "Delete");
            button.id = "deleteSearchId";
            button.addEventListener("click", vyho.lib.Utilities.runWith(this, this.deleteSearch, select, ""), false);

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Name *:", td);
            td = addNew("td", tr);
            var input = addNew("input", td);
            input.setAttribute("type", "text");
            input.setAttribute("value", "");
            //        input.setAttribute("size", "40");
            input.setAttribute("style", "width: 300px;");
            input.id = "searchNameId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("URL *:", td);
            td = addNew("td", tr, doc);
            input = addNew("input", td);
            input.setAttribute("type", "text");
            input.setAttribute("value", "");
            input.setAttribute("style", "width: 300px;");
            input.id = "searchUrlId";
            button = addNew("input", td);
            button.setAttribute("type", "button");
            button.setAttribute("value", "Current URL");
            button.id = "currentUrlId";
            button.addEventListener("click", vyho.lib.Utilities.runWith(this, this.setCurrentUrl, "", ""), false);

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Filter *:", td);
            td = addNew("td", tr);
            editButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.editSelectedSearch, select, td), false);

            //@todo: new field
            this.searchOrList = new Array();
            this.searchOrList[0] = new vyho.lib.ui.OrComponent(null, "", true);
            this.searchOrList[0].addAndComponent(new vyho.lib.ui.AndComponent(null, "", true));
            for (var i = 0; i < this.searchOrList.length; i++) {
                this.searchOrList[i].render(td);
                if (this.searchOrList[i].getAdd()) {
                    this.searchOrList[i].getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.addOrFilter, td, new Array(true)), false);
                } else {
                    this.searchOrList[i].getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeOrFilter, this.searchOrList[i], null), false);
                }
            }

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Min Price:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "text");
            input.setAttribute("style", "width: 300px;");
            input.id = "searchPriceMinId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Max Price:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "text");
            input.setAttribute("style", "width: 300px;");
            input.id = "searchPriceMaxId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Only send to my email:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "checkbox");
            input.setAttribute("checked", "true");
            input.id = "onlySendSelfId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Email body:", td);
            td = addNew("td", tr);
            input = addNew("textarea", td);
            //input.setAttribute("type", "checkbox");
            input.setAttribute("rows", "5");
            input.setAttribute("cols", "60");
            //        input.setAttribute("style", "width: 300px;");
            input.id = "emailSearchContentId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Enabled:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "checkbox");
            input.setAttribute("checked", "true");
            input.id = "searchEnabledId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Send Email:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "checkbox");
            input.setAttribute("checked", "true");
            input.id = "sendEmailEnabledId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText("Hide Post:", td);
            td = addNew("td", tr);
            input = addNew("input", td);
            input.setAttribute("type", "checkbox");
            //input.setAttribute("checked", "false");
            //input.setAttribute("checked", false);
            input.checked = false;
            input.id = "hidePostEnabledId";

            tr = addNew("tr", table);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText(" ", td);
            td = addNew("td", tr);
            vyho.lib.Utilities.newText(" ", td);

            button = addNew("input", td);
            button.setAttribute("type", "button");
            button.setAttribute("value", "Save");
            button.id = "editSearchOkId";
            button.addEventListener("click", vyho.lib.Utilities.runWith(this, this.editSearchOk, "", ""), false);

            this.updateSearchList(searches);
        }

        this.setCurrentUrl = function(evt, param1, param2) {
            var ele = this.browserWin.document.getElementById("searchUrlId");
            ele.value = this.browserWin.document.URL;
        }

        //@todo: move this to top
        this.filterForm = new Array();

        this.addOrFilter = function(evt, parent, params) {
            var addAnd = false;
            if (params != null && params.length > 0) {
                addAnd = params[0];
            }
            var orComponent = new vyho.lib.ui.OrComponent(null, "", true);
            if (this.searchOrList.length > 0) {
                orComponent.setAdd(false);
            }
            this.searchOrList[this.searchOrList.length] = orComponent;

            if (addAnd) {
                orComponent.addAndComponent(new vyho.lib.ui.AndComponent(null, "", true));
            }

            orComponent.render(parent);

            if (orComponent.getAdd()) {
                orComponent.getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.addOrFilter, parent, new Array(true)), false);
            } else {
                orComponent.getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeOrFilter, orComponent, null), false);
            }
            return orComponent;
        }

        //    this.addAndFilter = function(evt, orComp, params) {
        //        var andComp = new vyho.lib.ui.AndComponent(null, "", true);
        //        orComp.addAndComponent(andComp);
        //    }

        this.getUniqueId = function(prefix) {
            for (var iter = 0; iter < 100; iter++) {
                var element = this.browserWin.document.getElementById(prefix + iter);
                if (element == null) {
                    return (prefix + iter);
                }
            }
            return null;
        }

        this.removeOrFilter = function(evt, orComp, param2) {
            if (orComp == null) return;
            for (var i = this.searchOrList.length - 1; i >= 0; i--) {
                if (this.searchOrList[i] == orComp) {
                    this.searchOrList.splice(i, 1);
                }
            }
            orComp.getContainer().parentNode.removeChild(orComp.getContainer());
        }

        this.editSelectedSearch = function(evt, searchNames, filterTd) {
            var searchName = searchNames.value;
            if (searchName == null || searchName == "") {
                return;
            }
            var searchData = vyho.lib.Utilities.pref_getValue("SEARCHES", "[]");
            var searches;
            var serializer;
            serializer = new vyho.lib.Serializer();
            searches = serializer.decode(searchData);
            var i = 0;
            var search = null;
            for (i = 0; i < searches.length; i++) {
                search = searches[i];
                if (search.name == searchName) {
                    break;
                } else {
                    search = null;
                }
            }
            if (search != null) {
                vyho.lib.Utilities.$("searchNameId", this.browserWin.document).value = search.name;
                vyho.lib.Utilities.$("searchUrlId", this.browserWin.document).value = search.url;
                vyho.lib.Utilities.$("searchPriceMinId", this.browserWin.document).value = search.minPrice;
                vyho.lib.Utilities.$("searchPriceMaxId", this.browserWin.document).value = search.maxPrice;
                vyho.lib.Utilities.$("onlySendSelfId", this.browserWin.document).checked = (("true" == search.onlySendSelf)? true: false);
                //vyho.lib.Utilities.$("maxSendId", this.browserWin.document).value = search.maxSendCount;
                vyho.lib.Utilities.$("sendEmailEnabledId", this.browserWin.document).checked = (("true" == search.sendEmailEnabled)? true: false);
                
                vyho.lib.Utilities.$("hidePostEnabledId", this.browserWin.document).checked = (("true" == search.hidePost)? true: false);
                
                //            var element;
                vyho.lib.Utilities.removeAllChildren(filterTd);

                this.searchOrList = new Array();    //clear out the component list
                if (search.filters.length == 0) {
                    //add at least 1 filter:
                    search.filters[0] = {};
                }

                for (var oIndex = 0; oIndex < search.filters.length; oIndex++) {
                    var orFilter = search.filters[oIndex];
                    var orComp = this.addOrFilter(evt, filterTd, new Array(false));
                    if (orFilter.andList == null || orFilter.andList.length == 0) {
                        search.filters[oIndex].andList = new Array();
                        search.filters[oIndex].andList[0] = {};
                        search.filters[oIndex].andList[0].exclude = false;
                        search.filters[oIndex].andList[0].filter = "";
                    }
                    for (var aIndex = 0; aIndex < orFilter.andList.length; aIndex++) {
                        var andComp = new vyho.lib.ui.AndComponent(null, "", aIndex == 0);
                        orComp.addAndComponent(andComp);
                        var andFilter = orFilter.andList[aIndex];
                        andComp.setExclude((andFilter.exclude == "true")?true:false);
                        andComp.setFilterText(andFilter.filter);
                    }
                }

                vyho.lib.Utilities.$("emailSearchContentId", this.browserWin.document).value = search.emailBody;
                vyho.lib.Utilities.$("searchEnabledId", this.browserWin.document).checked = ((search.enabled == "true")?true:false);
            //vyho.lib.Utilities.$("emailSearchRegexId", this.browserWin.document).value = search[2];
            }
        }

        this.updateSearchList = function(searches) {
            var searchSel = vyho.lib.Utilities.$("searchListId", this.browserWin.document);
            if (searchSel == null) return;
            var i = 0;
            var search = null;
            for (i = searchSel.length -1; i > 0; i--) {
                searchSel.remove(i);
            }

            for (i = 0; i < searches.length; i++) {
                search = searches[i];
                var opt = this.browserWin.document.createElement("option");
                opt.text = search.name;
                opt.value = search.name;
                searchSel.add(opt, null);
            }
        }

        this.editSearchOk = function (evt, param1, param) {
            var name = vyho.lib.Utilities.$("searchNameId", this.browserWin.document).value;
            var url = vyho.lib.Utilities.$("searchUrlId", this.browserWin.document).value;
            var emailBody = vyho.lib.Utilities.$("emailSearchContentId", this.browserWin.document).value;
            var enabled = vyho.lib.Utilities.$("searchEnabledId", this.browserWin.document).checked;
            
            var minPrice = vyho.lib.Utilities.$("searchPriceMinId", this.browserWin.document).value;
            var maxPrice = vyho.lib.Utilities.$("searchPriceMaxId", this.browserWin.document).value;
            var onlySendSelf  = vyho.lib.Utilities.$("onlySendSelfId", this.browserWin.document).checked;
            var maxSendCount = 0;
            //vyho.lib.Utilities.$("maxSendId", this.browserWin.document).value;
            var sendEmailEnabled = vyho.lib.Utilities.$("sendEmailEnabledId", this.browserWin.document).checked;
            var hidePostEnabled = vyho.lib.Utilities.$("hidePostEnabledId", this.browserWin.document).checked;
            
            var regex = null;
            //regex = vyho.lib.Utilities.$("emailSearchRegexId", this.browserWin.document).value;
            if (name == "" || name == null) {    //@todo: trim it first here
                alert("The name must not be empty.");
                return;
            }
            if (url == "" || url == null) {    //@todo: trim it first here
                alert("The url must not be empty.");
                return;
            }
            var filters = new Array();
            for (var iter = 0; iter < this.searchOrList.length; iter++) {
                filters[iter] = {};
                filters[iter].andList = new Array();
                for (var andIndex = 0; andIndex < this.searchOrList[iter].getAndList().length; andIndex++) {
                    var andComp = this.searchOrList[iter].getAndList()[andIndex];
                    filters[iter].andList[andIndex] = {};
                    filters[iter].andList[andIndex].exclude = andComp.getExclude();
                    filters[iter].andList[andIndex].filter  = andComp.getFilterText();
                }
            }

            if (filters.length == 0) {
                alert("The filter must not be empty.");
                return;
            }

            //if (maxSendCount == "" || maxSendCount == null) {
            //    vyho.lib.Utilities.notify("The max number of emails can be sent per search must not be empty.");
            //    return;
            //}

            var bcEmail = this.preferences.getBcEmail().getValue();
            if (onlySendSelf && (bcEmail == null || bcEmail == "")) {
                alert("When only send to yourself is checked, BCC email address must be set in the preferences.");
                return;
            }

            if (sendEmailEnabled == true && (emailBody == "" || emailBody == null)) {    //@todo: trim it first here
                alert("The email content must not be empty if send email is enabled.");
                return;
            }

            var searchData = vyho.lib.Utilities.pref_getValue("SEARCHES", "[]");
            var searches;
            var serializer;
            serializer = new vyho.lib.Serializer();
            searches = serializer.decode(searchData);
            var i = 0;
            var search = null;
            for (i = 0; i < searches.length; i++) {
                search = searches[i];
                if (search.name == name) {
                    break;
                } else {
                    search = null;
                }
            }
            if (search == null) {
                search = {};
                searches.unshift(search);    //insert at index of 0
            }
            search.name = name;
            search.url = url;
            search.filters = filters;
            search.emailBody = emailBody;
            search.enabled = enabled;
            search.minPrice = minPrice;
            search.maxPrice = maxPrice;
            search.onlySendSelf = onlySendSelf;
            search.maxSendCount = maxSendCount;
            search.sendEmailEnabled = sendEmailEnabled;
            search.hidePost = hidePostEnabled;

            searchData = serializer.encode(searches);
            vyho.lib.Utilities.pref_setValue("SEARCHES", searchData);
            vyho.lib.Utilities.$("searchNameId", this.browserWin.document).value = "";
            //vyho.lib.Utilities.$("emailSearchRegexId", this.browserWin.document).value = "";
            this.updateSearchList(searches);
        }

        this.deleteSearch = function(evt, searchNames, param2) {
            var searchName = searchNames.value;
            if (searchName == null || searchName == "") {
                return;
            }
            var ans = confirm("Are you sure you want to delete search \"" + searchName + "\"?");
            if (!ans) {
                return;
            }
            var searchData = vyho.lib.Utilities.pref_getValue("SEARCHES", "[]");
            var searches;
            var serializer;
            serializer = new vyho.lib.Serializer();
            searches = serializer.decode(searchData);
            var i = -1;
            var search = null;
            for (i = 0; i < searches.length; i++) {
                search = searches[i];
                if (search.name == searchName) {
                    break;
                } else {
                    search = null;
                }
            }
            if (search != null && i >= 0) {
                searches.splice(i, 1);
                searchData = serializer.encode(searches);
                vyho.lib.Utilities.pref_setValue("SEARCHES", searchData);
                this.updateSearchList(searches);
            }
        }

        this.layoutWindows = function(evt, percent, param2) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }

            var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);

            var width = dim[0];
            var height = dim[1];
            var left = vyho.lib.Utilities.roundInt(percent * width);
            var right = width - left;
            var top = vyho.lib.Utilities.roundInt(height / 2);
            var bottom = height - top;

            var visible;
            if (this.layout) {
                this.layout.enabled = false;
            }
            var leftRight = this.preferences.getLeftRightLayout().getValue();
            if (this.favWindow) {
                visible = this.favWindow.isVisible();
                this.favWindow.setVisible(true);
                if (leftRight) {
                    this.favWindow.setBounds(0, 0, left, height);
                } else {
                    this.favWindow.setBounds(0, right, left, height);
                }
                this.favWindow.onResize(evt);
                this.favWindow.onLayoutChange(evt);
                this.favWindow.setVisible(visible);
            }

            if (this.listingWin) {
                visible = this.listingWin.isVisible();
                this.listingWin.setVisible(true);
                if (leftRight) {
                    this.listingWin.setBounds(0, 0, left, height);
                } else {
                    this.listingWin.setBounds(0, right, left, height);
                }
                this.listingWin.onResize(evt);
                this.listingWin.onLayoutChange(evt);
                this.listingWin.setVisible(visible);
            }
            var overlapped = this.preferences.getShowOverlappedDetails().getValue();
            
            if (this.infoWindow) {
                visible = this.infoWindow.isVisible();
                this.infoWindow.setVisible(true);
                if (percent == 1) {
                    this.infoWindow.setBounds(0, width - 600 - 40, 600, top);
                } else {
                    if (overlapped) {
                        if (leftRight) {
                            this.infoWindow.setBounds(0, left, right, 2 * top);
                        } else {
                            this.infoWindow.setBounds(0, 0, right, 2 * top);
                        }
                    } else {
                        if (leftRight) {
                            this.infoWindow.setBounds(0, left, right, top);
                        } else {
                            this.infoWindow.setBounds(0, 0, right, top);
                        }
                    }
                    
                }
                this.infoWindow.onResize(evt);
                this.infoWindow.onLayoutChange(evt);
                this.infoWindow.setVisible(visible);
            }
            if (this.previewWindow) {
                visible = this.previewWindow.isVisible();
                this.previewWindow.setVisible(true);
                if (percent == 1) {
                    this.previewWindow.setBounds(top, width - 600 - 40, 600, bottom);
                } else {
                    if (overlapped) {
                        if (leftRight) {
                            this.previewWindow.setBounds(0, left, right, 2 * bottom);
                        } else {
                            this.previewWindow.setBounds(0, 0, right, 2 * bottom);
                        }
                    } else {
                        if (leftRight) {
                            this.previewWindow.setBounds(top, left, right, bottom);
                        } else {
                            this.previewWindow.setBounds(top, 0, right, bottom);
                        }
                    }
                }
                this.previewWindow.onResize(evt);
                this.previewWindow.onLayoutChange(evt);
                this.previewWindow.setVisible(visible);
            }
            if (this.layout) {
                this.layout.enabled = true;
            }
        }

        this.onImageWindowHide = function(evt, param1, param2) {
            this.showImageWindow = false;
        }

        this.onDetailWindowHide = function(evt, param1, param2) {
            this.showDetailWindow = false;
        }

        this.setPreviewImageSize = function(width, height) {
            var theImage = this.browserWin.document.getElementById("prevImageId");
            if (theImage) {
                if (this.preferences.getScalePreviewImage().getValue()) {
                    theImage.style.height = height + "px";
                    theImage.style.width = null;
                    if (!this.preferences.getKeepAspectRatio().getValue()) {
                        theImage.style.width = width + "px";
                    } else {
                        if (theImage.offsetWidth > width) {
                            theImage.style.height = null;
                            theImage.style.width = width+ "px";
                        }
                    }
                }
            }
        }
        
        this.handleMouseClick = function(evt, param1, param2) {
            //evt.preventDefault();
            //evt.stopPropagation();
            /*
            var map = this.browserWin.document.getElementById("map");
            if (!map) {
                return;
            }
            
            var icon = this.locateMapNode(evt.target, false);
            if (!icon) {
                return;
            }
            */
            
            /*
            var nodeHolder = this.locateMapNode(evt.target, true);
            if (nodeHolder == null) {
                nodeHolder = icon;
            }
            var idTag = nodeHolder.getAttribute("idTag");
            if (idTag == null || typeof idTag == null) {
                newTagId = vyho.lib.Utilities.rand(6);
                icon.setAttribute("idTag", newTagId);
            } else {
                newTagId = idTag;
            }
            */
           
            var me = this;
            vyho.lib.Utilities.runOnce(function() { //call after the node is created
                //var ele =  me.browserWin.document.getElementById("popstuffs");
                var map = me.browserWin.document.getElementById("map");
                if (!map) {
                    return;
                }
                var ele = vyho.lib.Utilities.findNode(map, "div", {
                    "class": "leaflet-popup-content-wrapper"
                });
                
                if (!ele) {
                    return;
                }
                //var idTag = ele.getAttribute("idTag");
                me.handleMapPopUp(ele, evt);
            }, 30);
        }
        
        this.mapIcons = [];
        
        this.handleMapPopUp = function(container, evt) {
            //vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, function(event, container) {
            var map = this.browserWin.document.getElementById("map");
            if (!map) {
                return;
            }
                
            container = vyho.lib.Utilities.findNode(map, "div", {
                "class": "leaflet-popup-content-wrapper"
            });
            
            var parent = container.parentNode;
            var style = parent.getAttribute("style");
            if (!style) {
                style = "";
            }
            
            var styleMod = "width: 300px !important; height: 300px !important; border: 1px solid  !important; box-shadow: none !important;";
            
            container.setAttribute("style", styleMod);
            
            style += "; " + styleMod;
            parent.setAttribute("style", style);
                
                
            //var span = vyho.lib.Utilities.findNode(container, "span", {"class": "postingtitle"});
            var spans = vyho.lib.Utilities.findNodes(container, "span", {
                "class": "postingtitle"
            });
            if (!spans || spans.length == 0) {
                return;
            }
            var link = null;
            var postId = null;
            for (var i = 0; i < spans.length; i++) {
                link = vyho.lib.Utilities.findNode(spans[i], "a");   //target: _blank
                if (link) {
                    postId = this.getPostId(link);
                    if (postId && postId != null) {
                        break;
                    }
                //link = vyho.lib.Utilities.findNode(container, "a"); 
                }
            }
                
            if (postId == null) {
                return;
            }
                
            //add code to handle the link:
                
            //container.setAttribute("style", "width: 450px !important; ");
            //container.style.width = "450px";
            //container.style.height = "250px";
                
                
            if (this.hideMap.contains(postId) || this.spamMap.contains(postId)) {
            //vyho.lib.Utilities.removeNode(container.parentNode);
            //vyho.lib.Utilities.removeNode(evt.target.parentNode);
            //return;
            }       
                
            vyho.lib.Utilities.removeAllChildren(container);
            var newTagId = vyho.lib.Utilities.rand(6);
            container.setAttribute("idTag", newTagId);
            this.lastMapMouseX = evt.pageX;
            this.lastMapMouseY = evt.pageY;
            this.lastMapTag = newTagId;
                
                
            container.appendChild(link);
                
            try {
                this.preProcessDetails(link, [container, "main", postId]);
                var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                    method: "GET",
                    url: link.href,
                    headers: {
                        "Accept" : "text/html,text/xml,text/plain"
                    },
                    contentHandler: vyho.lib.Utilities.runWith(this, this.processDetails, link, [container, "main", postId]),
                    data : null
                });

                req.send();
            } catch (imgErr) {
                vyho.lib.Utilities.notify("error (2): " + imgErr + ", " + sess);
            }
        //}, container, null), 10);
        }
        
        this.locateMapNode = function(target, nodeHolder) {
            var divClass = "leaflet-marker-icon marker-cluster marker-cluster-small leaflet-clickable leaflet-zoom-animated";
            var div2Class = "leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-clickable leaflet-zoom-animated";
            var imgClass = "leaflet-marker-icon  leaflet-clickable leaflet-zoom-animated";
           
            var icon = null;
            var ele;
            if (target.nodeName == "DIV" &&
                (target.getAttribute("class") == divClass ||
                    target.getAttribute("class") == div2Class)) {
                icon = target;
            //console.log(target);
            } else if (target.nodeName == "IMG" &&
                (target.getAttribute("class") == imgClass)) {
                if (nodeHolder == false) {
                    icon = target;
                } else {
                    console.log("searching...");
                    try {
                        ele = vyho.lib.Utilities.searchParent(target, "DIV", {
                            "class": "leaflet-marker-icon"    // leaflet-marker-pane   leaflet-clickable
                        });
                        console.log("Searched: " + ele);
                        if (ele != null) {
                            icon = ele;
                        }
                    } catch (err) {
                        console.log("Failed to search: " + err);
                    }
                }
            } else if (target.nodeName == "SPAN") {
                ele = vyho.lib.Utilities.searchParent(target, "DIV", {
                    "class": "leaflet-marker-pane"    //leaflet-marker-pane
                });
                if (ele != null) {
                    icon = target;
                } else {
                    ele = vyho.lib.Utilities.searchParent(target, "DIV", {
                        "class": div2Class
                    });
                    if (ele != null) {
                        icon = target;
                    }
                }
            }
            return icon;
        }
        
        this.handleMouseOver = function(evt, param1, param2) {
            if (!evt.target) return;
            /*
            var ele =  vyho.lib.Utilities.findNode(evt.target, "div", {"id": "popstuffs"});   //target: _blank;
            
            if (!ele) {
                return;
            }
            */
            /*
           var ele = evt.target;
           if (ele.id != "popstuffs") {
               ele = vyho.lib.Utilities.searchParent(ele, "DIV", {"id": "popstuffs"});
               if (ele == null) {
                    return;
               }
           }
           this.handleMapPopUp(ele);
            */
            var icon = this.locateMapNode(evt.target, false);
            
            if (icon != null) { //todo: problem: a same container used twice, so it may not work
                //var map = this.browserWin.document.getElementById("map");
                //var container =  vyho.lib.Utilities.findNode(map, "div", {"id": "popstuffs"});
                var container =  this.browserWin.document.getElementById("popstuffs");
                if (container != null) {
                    //get tag:
                    var atag = container.getAttribute("idTag");
                    //console.log("Tag: " + atag + ", last tag: " + this.lastMapTag);
                    //check last position:
                    if (atag && this.lastMapMouseX && this.lastMapMouseY && this.lastMapTag) {
                        //if (this.lastMapTag == atag) {
                        //check the distance
                        var x = evt.pageX;
                        var y = evt.pageY;
                            
                        var squareDist = (Math.pow(x - this.lastMapMouseX, 2) + Math.pow(y - this.lastMapMouseY, 2));
                        if (squareDist <= 4 * 4) {
                            return;
                        }
                            
                    //}
                    }
                    
                /*
                    if (typeof atag != "undefined" && atag != null) {
                        var nodeHolder = this.locateMapNode(evt.target, true);
                        if (nodeHolder == null) {
                            nodeHolder = icon;
                        }
                        var otherTag = nodeHolder.getAttribute("idTag");
                        if (atag == otherTag) {
                            console.log("Matched tag: " + atag);
                            return;
                        } else {
                            console.log(nodeHolder);
                            console.log("Non match tag for container." + atag + ", " + otherTag);
                        }
                    } else {
                        console.log("No tag for container.");
                    }
                    */
                }
                //create a tag:
                //console.log("clicked");
                //if (typeof atag != "undefined" && atag != null) {
                //    nodeHolder.setAttribute("idTag", atag);
                //}
                icon.click(evt);
            }
            
        }
        
        this.firstShown = true;
        this.itemTable = null;
        
        this.getListEntries = function(container) {
            var links = container.getElementsByTagName("a");
            var linkMap = new vyho.lib.HashMap();
            var glinks = new Array();
            var i, index;
            for (i = 0; i < links.length; i++) {
                if (links[i].href) {
                    if (links[i].href.match(/.*craigslist.*\/\d+\.html$/)) {
                        index = linkMap.get(links[i].href);
                        if (index === null) {
                            index = glinks.length;
                            glinks[index] = links[i];
                            linkMap.put(links[i].href, index);
                        } else {
                            if (vyho.lib.Utilities.isEmpty(links[i].text) == false) {
                                glinks[index] = links[i];
                                linkMap.put(links[i].href, index);
                            }
                        }
                    }
                }
            }
            links = null;
            linkMap = null;
            return glinks;
        }

        this.modifyListing = function() {
            try {
                var i;
                //var tabBtn = vyho.lib.Utilities.findNode(this.browserWin.document, "button", {"id": "gridview"});  //<button id="gridview" class="down">
                
                var listViewBtn = this.browserWin.document.getElementById("listview");
                var picViewBtn = this.browserWin.document.getElementById("picview");
                var gridViewBtn = this.browserWin.document.getElementById("gridview");
                var mapViewBtn = this.browserWin.document.getElementById("mapview");
                
                var me = this;
                if (listViewBtn) listViewBtn.addEventListener("click", function() {
                    //if (flipCatAndSubmit) {
                    //flipCatAndSubmit(""); //NOTE - DONOT call page's script, elevated privilege
                    //me.modifyListing();
                    //}
                    //refresh page
                    if (me.theForm) {
                        vyho.lib.Utilities.runOnce(function() {
                            me.theForm.submit();
                        }, 20);
                    }
                }, true);
                if (picViewBtn) picViewBtn.addEventListener("click", function() {
                    //if (flipCatAndSubmit) {
                    //flipCatAndSubmit(""); //NOTE - DONOT call page's script, elevated privilege
                    //me.modifyListing();
                    //}
                    if (me.theForm) {
                        vyho.lib.Utilities.runOnce(function() {
                            me.theForm.submit();
                        }, 20);
                    }
                }, true);
                if (gridViewBtn) gridViewBtn.addEventListener("click", function() {
                    //if (flipCatAndSubmit) {
                    //flipCatAndSubmit(""); //NOTE - DONOT call page's script, elevated privilege
                    //me.modifyListing();
                    //}
                    if (me.theForm) {
                        vyho.lib.Utilities.runOnce(function() {
                            me.theForm.submit();
                        }, 20);
                    }
                }, true);
                
                //if (mapViewBtn) mapViewBtn.addEventListener("click", function() {
                //if (flipCatAndSubmit) {
                //flipCatAndSubmit(""); //NOTE - DONOT call page's script, elevated privilege
                //me.modifyListing();
                //}
                // if (me.theForm) {
                //                        vyho.lib.Utilities.runOnce(function() {
                //                            me.theForm.submit();
                //                        }, 20);
                //}
                //}, true);
                
                //determine the listing type:
                //get URL this.browserWin.document.URL
                //altView=imggrid
                
                //list of cookies
                var cookieStr = this.browserWin.document.cookie;
                var cookieMap =  new vyho.lib.HashMap();
                var cookies = cookieStr.split(";");
                for (i = 0; i < cookies.length; i++) {
                    var pair = cookies[i].split("=");
                    var name = vyho.lib.Utilities.trimText(pair[0]);
                    var value = unescape(vyho.lib.Utilities.trimText(pair[1]));
                    //console.log("cookie name: " + name + ", value: " + value);
                    cookieMap.put(name, value);
                }
                var url = this.browserWin.document.URL;
                var queryMap =  new vyho.lib.HashMap();
                var index = url.indexOf("?");
                if (index >= 0) {
                    var queryStr = url.substring(index + 1);    //todo: check length, ? not end of string
                    var pairs = queryStr.split("&");
                    if (typeof pairs != "undefined" && pairs != null && pairs.length > 0) {
                        for (var j = 0; j < pairs.length; j++) {
                            var tokens = pairs[j].split("=");
                            name = tokens[0];
                            value = tokens[1];
                            if (name != null) {
                                queryMap.put(name, value);
                            }
                        }
                    }
                }
                
                if (queryMap.get("useMap") == "1" || (cookieMap.get("cl_tocmode") != null && 
                    cookieMap.get("cl_tocmode").indexOf("sss:map") >= 0)) {
                    this.showImages = false;
                    //this.changeEntryClass = false;
                    this.doShowMapImageIcons = true;
                    
                    this.browserWin.document.addEventListener("click", vyho.lib.Utilities.runWith(this, this.handleMouseClick, null, null), true);
                    
                    var map = this.browserWin.document.getElementById("map");
                    if (map != null) {
                    //map.addEventListener("mouseover", vyho.lib.Utilities.runWith(this, this.handleMouseOver, null, null), true);
                    }
                    return;
                } else if (queryMap.get("altView") == "imggrid" || (cookieMap.get("cl_tocmode") !=  null &&
                        (cookieMap.get("cl_tocmode").indexOf("sss:grid") >= 0))) {
                        this.showImages = false;
                        this.showPreviewText = false;
                        this.changeEntryClass = false;
                        this.removeBreak = true;

                        this.doShowGridViewImageIcons = true;
                } else {    //normal listing
                }
                
                var glinks = this.getListEntries(this.browserWin.document);
                
                var waitTime = 10;  //miliseconds
                //schedule a dynamic rendering job:
                
                vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, this.dynamicProcessListing, glinks, [waitTime]), waitTime);
            /*
                var lowIndex = 0;
                var highIndex = 0;
                var incre = glinks.length;  //just do it all at once for now
                
                for (i = glinks.length - 1; i >= 0; i = i - incre) {
                    highIndex = i;
                    lowIndex = i - incre + 1;
                    if (lowIndex < 0) lowIndex = 0;
                    //vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, this.modifySubList, glinks, [lowIndex, highIndex]), waitTime);
                    this.modifySubList(null, glinks, [lowIndex, highIndex]);
               }
             */
            } catch (err) {
                alert("here")
                vyho.lib.Utilities.notify("Failed to show process listing, error: ", err);
                throw err;
            }
        }
        
        this.dynamicProcessListing = function(evt, linkList, data) {
            //var waitTime = data[0];
            
            //get low and high index
            var lowIndex = 0;
            var highIndex = linkList.length - 1;
            
            //todo: add a flag to stop processing (skip to new list)
            this.infoList = new Array();
            this.infoList.length = linkList.length;

            var item;
            for (var i = 0; i < linkList.length; i++) {
                item = {};
                this.infoList[i] = item;
                item.link = linkList[i];
                item.entry = vyho.lib.Utilities.findFirstParent(linkList[i], "P");
                if (item.entry == null) {
                    item.entry = linkList[i].parentNode;
                }
                item.processed = false;
            }
            
            this.job = null;
            if (this.preferences.getEnablePartialRendering().getValue()) {
                this.job = {};
                /*
                var winSize = vyho.lib.Utilities.getWindowSize(this.browserWin);
                var scrollLoc = vyho.lib.Utilities.getScrollPosition(this.browserWin);
//                var pageSize = vyho.lib.Utilities.getPageSize(this.browserWin);
                
                var viewportTop =  scrollLoc[1];
                
                //alert("view port top: " + viewportTop);
                
                var viewportBottom = scrollLoc[1] + winSize[1];
                
                var indexTop = this.findIndex(this.infoList, 0, this.infoList.length - 1, viewportTop);
                if (indexTop < 0) indexTop = 0;

                var indexBottom = this.findIndex(this.infoList, 0, this.infoList.length - 1, viewportBottom);
                if (indexBottom < 0) indexBottom = 0;
                
                lowIndex = indexTop;    //this.findLowIndex(linkList);
                highIndex = indexBottom;    //this.findHighIndex(linkList);
                */
               
                var container = this.listingWin.contentArea.parentNode;
                var eventHandler = {};
                eventHandler.eventHandle = vyho.lib.Utilities.runWith(this, this.scrollEventHandler, eventHandler, [this.listingWin.contentArea]);
                //todo: cancel this as needed
                
                //todo: this is not the browser win scroll, but rather the listing window
                //this.browserWin.addEventListener("scroll", eventHandler.eventHandle, true);
                
                container.addEventListener("scroll", eventHandler.eventHandle, true);
                var backGround = {};
                backGround.process = vyho.lib.Utilities.runWith(this, this.processJobs, null, [backGround, this.listingWin.contentArea]);
                backGround.intervalHandle = vyho.lib.Utilities.runRepeat(backGround.process, 500);
                
            } else {
                var processing = {};
                processing.done = false;
                this.processing = processing;
                this.modifySubList(null, this.infoList, [lowIndex, highIndex, processing]);
            }
        //vyho.lib.Utilities.runOnce(vyho.lib.Utilities.runWith(this, this.dynamicProcessListing, linkList, [job, processedList, waitTime]), waitTime);
        }
        
        this.scrollEventHandler = function(evt, eventHandler, data) {
            //add update task
            //var target = evt.target;
            //alert("target scroll top: " + target.scrollTop + ", id: " + target.id);
            this.job = {};
        }
        
        this.processJobs = function(evt, param1, data) {
            var job = this.job;
            if (this.job != null) {
                this.job = null;
            }
            if (job != null) {
                this.updateVisibleListItems(evt, data[0], data[1]);
            }
        }
        
        this.updateVisibleListItems = function(evt, eventHandler, container) {
            //todo: these may not be needed all the time
            if (this.processing) {
                this.processing.done = true;
            }
            // var winSize = vyho.lib.Utilities.getWindowSize(this.browserWin);
            // var scrollLoc = vyho.lib.Utilities.getScrollPosition(this.browserWin);
            //                var pageSize = vyho.lib.Utilities.getPageSize(this.browserWin);
            try {
                var viewportTop =  container.scrollTop;

                //alert("view port top: " + viewportTop);

                var viewportBottom = viewportTop + container.offsetHeight;  //todo: is the location relative to the window or just the container?

                var indexTop = this.findIndex(this.infoList, 0, this.infoList.length - 1, viewportTop);
                if (indexTop < 0) indexTop = 0;

                var indexBottom = this.findIndex(this.infoList, 0, this.infoList.length - 1, viewportBottom);
                if (indexBottom < 0) indexBottom = 0;

                var lowIndex = indexTop;    //this.findLowIndex(linkList);
                var highIndex = indexBottom;    //this.findHighIndex(linkList);
                

                var processing = {};
                processing.done = false;
                this.processing = processing;

                //todo: can check to see if there is any item needed to be processed here
                //vyho.lib.Utilities.notify("index: " + lowIndex + ", " + highIndex);
                //alert("index: " + lowIndex + ", " + highIndex + ", top: " + viewportTop + ", bottom: " + viewportBottom);
                
                var count = 0;
                var i;
                if (this.infoList.length > 0) {
                    for (i = lowIndex; i < highIndex; i++) {
                        if (!this.infoList[i].processed) {
                            count++;
                        }
                    }
                }
                if (count > 0) {
                    this.modifySubList(null, this.infoList, [lowIndex, highIndex, processing]);
                } else {
                    count = 0;
                    if (this.infoList.length > 0) {
                        for (i = 0; i < this.infoList.length; i++) {
                            if (!this.infoList[i].processed) {
                                count++;
                            }
                        }
                    }
                    if (count == 0) {
                        container.parentNode.removeEventListener("scroll", eventHandler.eventHandle);
                        
                    }
                //since cound is 0, maybe there is nothing left:
                //eventHandler.eventHandle
                //if so, cancel event handler
                }
            //is there any items left?  if not, remove event handler
            //todo: this code may cause more overhead than needed.
            //if there is no more item, remove the event handler eventHandler.eventHandle from the scroll event listener
            } catch (err) {
                vyho.lib.Utilities.notify("Error (3) updating listing: " + sess, err);
            }
        }
        
        this.findLowIndex = function(linkList) {
            return 0;
        }
        
        this.findHighIndex = function(linkList) {
            return linkList.length - 1;
        }
        
        this.findElementOffset = function (elem) {
            var curleft;
            var curtop = 0;
            if (elem.offsetParent) {
                curleft = elem.offsetLeft;
                curtop = elem.offsetTop;
                elem = elem.offsetParent;
                while (elem) {
                    curleft += elem.offsetLeft;
                    curtop += elem.offsetTop;
                    elem = elem.offsetParent
                }
            }
            return [curleft, curtop];
        }
        
        this.counter = 0;
        
        //todo: make sure the list is sorted properly before doing binary search
        //so before doing any of the stuffs, just do a sort by position first
        //also note about the problem of moving things around (due to filter for example)
        //so the location may not be stable, need to resolve this issue
        this.findIndex = function(elementList, lowIndex, highIndex, position) {
            if (lowIndex > highIndex) return -1;
            var midIndex = Math.floor((lowIndex + highIndex)/2);
            if (midIndex >= elementList.length) return -1;
            //check to see if it matches
            var elem = elementList[midIndex].entry;
            
            var pos = this.findElementOffset(elem);
            var offsetTop = pos[1];
            
            if (this.counter < 7) {
            //alert("offset top is: " + offsetTop + ", bottom : " + (offsetTop + elem.offsetHeight) + ", pos: " + position);
            //this.counter++;
            }
            
            if (offsetTop <= position && offsetTop + elem.offsetHeight >= position) {
                return midIndex;//found
            }
            
            if (offsetTop > position) {
                return this.findIndex(elementList, lowIndex, midIndex - 1, position);
            }
            return this.findIndex(elementList, midIndex + 1, highIndex, position);
            
        //find next. Todo, also check to see if it matches border of an element, which can be in between, and not accounted in the height
        //return -1;
        }
        
        this.modifySubList = function(evt, infoList, data) {
            var lowIndex = data[0];
            var highIndex = data[1];
            var processing = data[2];
            
            if (processing.done) {
                return;
            }

            if (this.infoList.length == 0) return;
            
            var postId = null;
            for (var i = lowIndex; i <= highIndex; i++) {
                if (processing.done) {
                    return;
                }
                if (infoList[i].processed) {
                    continue;
                }
                
                infoList[i].processed = true;
                
                var entry = infoList[i].entry;
                try {
                    if (entry != null) {
                        
                        postId = this.getPostId(infoList[i].link);
                        if (postId == null) {
                            continue;
                        }
                        if (this.spamMap.contains(postId)) {
                            vyho.lib.Utilities.addClass(entry, "markedSpam");
                            continue;
                        } else if (this.hideMap.contains(postId)) {
                            vyho.lib.Utilities.addClass(entry, "hiddenEntry");
                            continue;
                        }
                    }
                    if (!vyho.lib.Utilities.hasClass(entry, "entryProcessed")) {
                        vyho.lib.Utilities.addClass(entry, "entryProcessed");
                        this.preProcessDetails(infoList[i].link, [entry, "main", postId]);

                        var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                            method: "GET",
                            url: infoList[i].link.href,
                            headers: {
                                "Accept" : "text/html,text/xml,text/plain"
                            },
                            contentHandler: vyho.lib.Utilities.runWith(this, this.processDetails, infoList[i].link, [entry, "main", postId]),
                            data : null
                        });
                        req.send();
                    }
                } catch (err) {
                    vyho.lib.Utilities.notify("Failed to process entry, error: ", err);
                }
            }
        }

        this.adjustWindow = function(win) {
            var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);

            if (dim[0] > 0) {
                if (win.getLeft() + win.getWidth() > dim[0]) {
                    var left = dim[0] - win.getWidth();
                    if (left < 0) {
                        left = 0;
                    }
                    win.setLeft(left);
                }

                if (win.getWidth() > dim[0]) {
                    win.setWidth(dim[0]);
                }
            }
            if (win.getLeft() < 0) {
                win.setLeft(0);
            }

            if (dim[1] > 0) {
                if (win.getTop() + win.getHeight() > dim[1]) {
                    var top = dim[1] - win.getHeight();
                    if (top < 0) {
                        top = 0;
                    }
                    win.setTop(top);
                }

                if (win.getHeight() > dim[1]) {
                    win.setHeight(dim[1]);
                }
            }
            if (win.getTop() < 0) {
                win.setTop(0);
            }
        }
        
        this.preProcessDetails = function(link, data) {
            try {
                var postId = data[2];
                
                var dispType = data[1];
                
                var entry = data[0];

                if (entry != null) {
                    if (this.preferences.getPostTitleRightAlign().getValue()) {
                        //put it to the right
                        entry.style.float = "right";
                        entry.style.position = "relative";
                        entry.style.textAlign = "right";
                    }
                    if (this.changeEntryClass) {
                        vyho.lib.Utilities.addClass(entry, "entryClass");
                    }
                }
                
                var entrySubject = null;
                if (data.length > 2) {
                    entrySubject = data[2]; //@todo: postId was data[2], here, it's subject
                }

                link.target = "_blank";
                if (this.preferences.getConvertTextToLowerCase().getValue()) {
                    //link.text = this.toLowerCase(link.text);
                    var text = this.toLowerCase(link.text);
                    vyho.lib.Utilities.removeAllChildren(link);
                    vyho.lib.Utilities.newText(text, link);
                }
                
                var newTextNextTo;
                var newNodeNextTo;
                var newNodeBefore;
                if (this.preferences.getPostTitleRightAlign().getValue()) {
                    newTextNextTo = vyho.lib.Utilities.newTextBefore;
                    newNodeNextTo = vyho.lib.Utilities.addNewBefore;
                    newNodeBefore = vyho.lib.Utilities.addNewAfter;
                } else {
                    newTextNextTo = vyho.lib.Utilities.newTextAfter;
                    newNodeNextTo = vyho.lib.Utilities.addNewAfter;
                    newNodeBefore = vyho.lib.Utilities.addNewBefore;
                }
                var lastNode = link;
                    
                if (dispType == "main" && this.preferences.getShowHideButton().getValue()) {
                    var hideLink;
                    var params;
                    params = [entry, link, newNodeBefore, lastNode];
                    
                    if (!this.hideMap.contains(postId)) {    
                        hideLink = this.addPostAction(lastNode, vyho.lib.Resources.hideIcon,
                            "Hide post",
                            vyho.lib.Utilities.runWith(this, this.hideEntry, postId, params),
                            null,
                            newNodeBefore)[0];
                    } else {
                        hideLink = this.addPostAction(lastNode, vyho.lib.Resources.unHideIcon,
                            "Unhide post",
                            vyho.lib.Utilities.runWith(this, this.unHideEntry, postId, params),
                            null,
                            newNodeBefore)[0];
                    }
                    params[4] = hideLink;
                    lastNode = hideLink;
                }

                lastNode = link;
                
                if (this.removeBreak) {
                    if (typeof link.nextSibling != "undefined" && link.nextSibling != null) {
                        var iter = link.nextSibling;
                        while (iter != null && typeof iter != "undefined") {
                            if (iter.nodeName == "BR") {

                                var br = iter;
                                iter = iter.nextSibling;
                                vyho.lib.Utilities.removeNode(br);
                            } else {
                                iter = iter.nextSibling;
                            }
                        }

                    }
                }
                 
                var space = newTextNextTo("  ", lastNode);
                    
                if (dispType == "main") {
                    if (this.preferences.getShowFavButton().getValue()) {
                        if (this.favMap.contains(postId)) {
                            var favLink = this.addPostAction(lastNode, vyho.lib.Resources.markedFavIcon,
                                "Marked favorite", null, null,
                                newNodeNextTo)[0];
                            lastNode = favLink;
                        }
                    }
                }
                    
                if ((dispType == "favorite" || dispType == "main") && this.emailedMap.contains(postId)) {
                    var emailAction = this.addPostAction(lastNode, vyho.lib.Resources.emailIcon,
                        "Email sent",
                        null,
                        null,
                        newNodeNextTo);
                    lastNode = emailAction[0];
                }
                 
                if (dispType == "main") {
                    if (this.preferences.getShowSpamButton().getValue()) {
                        var spamLink;
                        if (!this.spamMap.contains(postId)) {
                            spamLink =  this.addPostAction(lastNode, vyho.lib.Resources.spamIcon,
                                "Mark as spam",
                                vyho.lib.Utilities.runWith(this, this.markSpam, postId, [entry]),
                                null,
                                newNodeNextTo)[0];
                            lastNode = spamLink;
                        } else {
                            spamLink =  this.addPostAction(lastNode, vyho.lib.Resources.markedSpamIcon,
                                "Marked as spam",
                                null,
                                null,
                                newNodeNextTo)[0];
                            lastNode = spamLink;
                        }
                    }
                }
                    
                if (dispType == "favorite") {
                    var delFavLink = this.addPostAction(lastNode, vyho.lib.Resources.delFav,
                        "Remove favorite",
                        vyho.lib.Utilities.runWith(this, this.deleteFavorite, postId, [entry, entrySubject]),
                        null,
                        newNodeBefore)[0];
                    lastNode = delFavLink;
                }
                    
                if (dispType == "favorite") {
                    lastNode = newNodeNextTo("br", link.parentNode.lastChild);
                }
                lastNode = link.parentNode.lastChild;
            } catch (err) {
                vyho.lib.Utilities.notify("Error (4): " + sess, err);
                throw err;
            }
        }
        
        this.getImageTableMaxWidth = function() {
            return (this.IMG_BAND_WIDTH + 2 * this.IMG_BAND_CTRL_WIDTH) + "px";
        }

        this.getSummaryTextWidth = function(entry, imageArea) {
            if (imageArea != null) {
                var width = entry.offsetWidth - imageArea.offsetWidth - 50;    //todo: this "50" needs adjustment due to shown/hide of the image band arrow buttons
                if (width > 200) {
                    return (width + "px");
                } else {
                    return "95%";
                }
            } else {
                return "95%";
            }
        }

        this.processDetails = function(details, link, data) {
            try {
                if (!details) {
                    return;
                }

                var postId = data[2];
                var responseText = details.responseText;
                
                var dispType = data[1];
                
                var entry = data[0];
                
                var func = data[3];
                var param4 = data[4];
                if (func && responseText) {
                    try {
                        func.apply(this, [param4, responseText]);
                    } catch (err) {
                        vyho.lib.Utilities.notify("Failed, err: ", err)
                    }
                }
                
                if (responseText) {
                    var detailText;
                    
                    var subject = null;
                    subject = this.getSubject(responseText);
                    subject = unescape(subject == null? link.text : subject);

                    var emailInfo = this.parseEmailInfo(responseText, link.href);
                    if (emailInfo != null) {
                        emailInfo.url = link.href;
                        emailInfo.subject = subject;
                    }
                    
                    var location = this.parseLocation(responseText);
                    detailText = this.parseDetailText(responseText);

                    var postingInfo = this.getPostingInfo(responseText);
                    if (postingInfo != null) {
                        detailText += postingInfo;
                    }

                    
                    var price = this.getPrice(subject);
                    
                    if (dispType == "main") {
                        var search = this.performFilterAndSearch(responseText, subject, location, link.href);
                        if (search != null) {
                            if (search.hidePost) {
                                //if (!this.hideMap.contains(postId)) {   //should not contain it, just check for sanity.  Should catch it above.
                                //add to map
                                this.hideEntry(null, postId, [entry, null]);
                                return;
                            //}
                            }
                            
                            //if (search.maxSendCount != null) {
                            //  if (search.sendCount >= search.maxSendCount) {
                            //don't send
                            //  }
                            //}
                            //add link to the list
                            //is the list created yet?
                            if (entry != null) {
                                if (typeof this.searchResult == "undefined") {
                                    var parentNode = vyho.lib.Utilities.searchParent(link, "SECTION", {"class": "body"});
                                    if (parentNode != null) {
                                        var table = vyho.lib.Utilities.findNextSibling(parentNode.firstChild, "TABLE");
                                        if (table != null) {
                                            this.searchResult = vyho.lib.Utilities.addNewAfter("fieldset", table);
                                        } else {
                                            this.searchResult = vyho.lib.Utilities.addNewAfter("fieldset", parentNode.firstChild);
                                        }
                                        vyho.lib.Utilities.addClass(this.searchResult, "filteredArea");
                                        var legend = vyho.lib.Utilities.addNew("legend", this.searchResult);
                                        vyho.lib.Utilities.newText("Your Filtered Results", legend);
                                    }
                                }
                                //@todo: mark items that have been sent
                                this.searchResult.appendChild(entry);
                            }

                            if (search.sendEmailEnabled && emailInfo != null && emailInfo.isReady()) {
                                this.sendEmail([search, link, emailInfo, postId]);
                            } else if (search.sendEmailEnabled && emailInfo != null) {
                                emailInfo.processEmail(this, this.sendEmail, [search, link, emailInfo, postId], null);
                            }
                        }
                    }
                    /*
                    if (entry != null) {
                        if (this.preferences.getPostTitleRightAlign().getValue()) {
                            //put it to the right
                            entry.style.float = "right";
                            entry.style.position = "relative";
                            entry.style.textAlign = "right";
                        }
                        vyho.lib.Utilities.addClass(entry, "entryClass");
                    }
                    */
                    link.target = "_blank";

                    var mapLink = null;
                    var driveToLink = null;

                    var newTextNextTo;
                    var newNodeNextTo;
                    if (this.preferences.getPostTitleRightAlign().getValue()) {
                        newTextNextTo = vyho.lib.Utilities.newTextBefore;
                        newNodeNextTo = vyho.lib.Utilities.addNewBefore;
                    } else {
                        newTextNextTo = vyho.lib.Utilities.newTextAfter;
                        newNodeNextTo = vyho.lib.Utilities.addNewAfter;
                    }
                    //var textNode = newTextNextTo(" - ", link);
                    //var lastNode = textNode;
                    var lastNode = link;

                    if (this.preferences.getShowElapsedTime().getValue()) {
                        
                        var postDate = this.parsePostDate(responseText);
                        if (postDate != null) {
                            var dateNode = newTextNextTo(" - " + postDate.elapseTime, lastNode);
                            lastNode = dateNode;
                        }
                    }

                    if (this.preferences.getShowUpdatedElapsedTime().getValue()) {
                        var updatedPostDate = this.getPostUpdateDuration(responseText);
                        if (updatedPostDate != null) {

                            var updatedDateNode = newTextNextTo(" - " + updatedPostDate.elapseTime, lastNode);
                            lastNode = updatedDateNode;
                        } else {

                        }
                    }
   
                    var detailLink = null;
                    var imageSrcs = [];
                    
                    //if (this.preferences.getDetailLinkOnPostTitle().getValue()) {
                    if (dispType == "favorite" || dispType == "main") {
                        detailLink = this.addPostAction(lastNode, vyho.lib.Resources.detailIcon,
                            "Show detail in a new window", null, link.href,
                            newNodeNextTo)[0];
                        lastNode = detailLink;
                        
                        //}
                        
                        var advInfo = {
                            "detailText": detailText, 
                            "location": location, 
                            "forceShow": true, 
                            "postId" : postId, 
                            "link" : link, 
                            "price":  price, 
                            "subject" : subject,
                            "firstSibling": link.parentNode.firstChild, 
                            "images": imageSrcs
                        };
                        if (this.preferences.getDetailLinkOnPostTitle().getValue()) {
                            detailLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showDetails,
                                emailInfo, advInfo), true);
                        } else {
                            link.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showDetails,
                                emailInfo, advInfo), true);
                        }
                        
                        vyho.lib.Utilities.hover(link, link, null, null,
                            vyho.lib.Utilities.runWith(this, this.showDetailsMouseOver,
                                emailInfo, advInfo),
                            vyho.lib.Utilities.runWith(this, this.handleDetailsMouseOut,
                                emailInfo, advInfo)
                            )
                    }
                    
                    if ((dispType == "favorite" || dispType == "main") && location.isEmpty == false) {
                        if (this.preferences.getShowMapButton().getValue()) {
                            mapLink = this.addPostAction(lastNode, vyho.lib.Resources.mapIcon,
                                "Show in map", vyho.lib.Utilities.runWith(this, this.locationInGoogleMap,
                                    location, this.browserWin), null,
                                newNodeNextTo)[0];
                            lastNode = mapLink;
                        }

                        if (this.preferences.getShowDirectionButton().getValue()) {
                            driveToLink = this.addPostAction(lastNode, vyho.lib.Resources.directionIcon,
                                "Drive direction", vyho.lib.Utilities.runWith(this, this.showDriveToInGoogleMap,
                                    location, null), null,
                                newNodeNextTo)[0];
                            lastNode = driveToLink;
                        }
                    }
                    var space = newTextNextTo("  ", lastNode);
                    
                    if (dispType == "main" && this.preferences.getShowFavButton().getValue()) {
                        if (!this.favMap.contains(postId)) {
                            var favAction = this.addPostAction(lastNode, vyho.lib.Resources.favIcon,
                                "Mark favorite",
                                null,
                                null,
                                newNodeNextTo);
                            var favLink = favAction[0];
                            var favIcon = favAction[1];
                            favLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.markFav, postId, [entry, favIcon, subject, link.href]),
                                false);
                            vyho.lib.Utilities.hover(favLink, favIcon, "1px solid blue", "1px solid white", null, null);
                            lastNode = favLink;
                        }
                    }
                    
                    //                    if (dispType == "favorite") {
                    //                        if (this.preferences.getShowFavButton().getValue()) {
                    //                            var delFavLink = this.addPostAction(lastNode, vyho.lib.Resources.delFav,
                    //                            "Remove favorite",
                    //                            vyho.lib.Utilities.runWith(this, this.deleteFavorite, postId, [entry, unescape(subject? subject : link.text), link.href]),
                    //                            null,
                    //                            newNodeNextTo)[0];
                    //                            lastNode = delFavLink;
                    //                        }
                    //                    }
                    
                    if (dispType == "favorite" || dispType == "favorite_print") {
                        lastNode = newNodeNextTo("br", link.parentNode.lastChild);
                    }
                    lastNode = entry.lastChild;
                    
                    if (location.isEmpty == false) {
                        if (subject.toLowerCase().indexOf(location.getLabel().toLowerCase()) < 0) {
                            lastNode = newTextNextTo(" - " + location.getLabel(), lastNode);
                        }
                    }

                    //var p = link.parentNode;
                    //p.className = "";
                    //p.style.padding = "0px";
                    //p.style.inset = "0px";
                    //p.style.margin = "0px";
                    
                    var imageRegExs = new Array();
                    imageRegExs[0] = /<img ([^>]+)>/gi;
                    // imageRegExs[1] = /<img ([^>]+)>/gi;

                    var matches = null;
                    for (var iter = 0; iter < imageRegExs.length; iter++) {
                        try {
                            matches = details.responseText.match(imageRegExs[iter]);
                            if (matches != null) {
                                break;
                            }
                        } catch (Err) {
                        }
                    }
                    
                    var imageScrollArea = null;
                    var imageArea = null;
                    var eventData;
                    var srcs = null;
                    if (matches) {
                        srcs = this.getEntryImages(matches);
                        if (this.doShowGridViewImageIcons) {
                            var p = vyho.lib.Utilities.searchParent(link, "P", {"class": "row"});
                            if (p) {
                                var gridImage = vyho.lib.Utilities.findNode(p, "img");
                                if (gridImage) {
                                    this.showGridViewImageIcons(srcs, gridImage, link, postId);
                                } else {
                                    console.log("Image not found.");
                                }
                            } else {
                                console.log("Paragraph not found.");
                                //vyho.lib.Utilities.notify("not found")
                            }
                        }

                        if (srcs != null && srcs.length > 0) {
                            for (var i = 0; i < srcs.length; i++) {
                                imageSrcs[imageSrcs.length] = srcs[i];
                            }
                        }
                        var img;
                        if (this.doShowMapImageIcons) {
                            //todo: find the grid image
                            //find div class="igi"
                            //find img
                            if (srcs != null && srcs.length > 0) {
                                img = vyho.lib.Utilities.addNewBefore("img", link.parentNode.firstChild);
                                vyho.lib.Utilities.addNewAfter("br", img);
                                img.className = this.THUMBNAIL_IMAGE;
                                img.style.display = "inline";
                                eventData = new Array(img, prevIcon, nextIcon);

                                img.src = srcs[0];

                                if (!this.keepAspectRatio) {
                                    img.style.maxWidth = this.size + "px";
                                }
                                img.style.maxHeight = this.size + "px";

                                //vyho.lib.Utilities.newText("\u00a0", div);
                                if (dispType == "favorite" || dispType == "main") {
                                    vyho.lib.Utilities.hover(img, img, null, null,
                                        vyho.lib.Utilities.runWith(this, this.showImagePreviewMouseOver,
                                            img.src, [false, link.parentNode.firstChild, postId]), 
                                        vyho.lib.Utilities.runWith(this, this.handleImageMouseOut,
                                            img.src, [true, link.parentNode.firstChild, postId]));
                                    img.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showImagePreview,
                                        img.src, [true, link.parentNode.firstChild, postId]), true);
                                }

                                this.showGridViewImageIcons(srcs, img, link, postId);
                            }
                        }
                        
                        if (this.showImages) {  //(dispType == "favorite" || dispType == "main") && 
                            
                            var div;
                            var scrollDiv;
                            var prevIcon;
                            var nextIcon;

                            var imageBandResizer = null;
                            var resizerData = new Array();
                            var images = new Array();
                            
                            if (srcs != null && srcs.length > 0) {
                                imageBandResizer = vyho.lib.Utilities.runWith(this, this.imageBandResizer, resizerData, null);
                                resizerData[0] = images;
                                resizerData[1] = 0; //image load count
                                
                                lastNode = newNodeNextTo("br", lastNode);

                                scrollDiv = newNodeNextTo("div", lastNode);
                                scrollDiv.setAttribute("style", "maxHeight: " + this.size + "px !important; maxWidth: 100% !important; \
                                    width: 100% ; display: inline-block; overflow: hidden; ");    //overflow-x: auto;
                                div = vyho.lib.Utilities.addNew("div", scrollDiv);
                                div.setAttribute("style", "maxHeight: " + this.size + "px; display: inline-block; width: auto !important; white-space: nowrap;");
                                div.style.position = "relative";
                                div.style.top = "0px";
                                div.style.left = "0px";
                                resizerData[2] = div;
                                resizerData[3] = scrollDiv;
                                resizerData[4] = div;
                               
                                lastNode = scrollDiv;
                                imageArea = div;
                               
                                imageScrollArea = scrollDiv;
                            }
                            
                            var maxNumberOfThumbnails = this.preferences.getMaxNumberOfThumbnails().getValue();
                            
                            eventData = new Array();
                            var showControlEventHandler = vyho.lib.Utilities.runWith(this, this.showImageBandControl, div, eventData);
                            eventData[0] = showControlEventHandler;
                            eventData[1] = imageBandResizer;
                            eventData[2] = 0;
                            eventData[3] = images;
                            eventData[4] = scrollDiv;
                            eventData[5] = div;
                            eventData[6] = entry;
            
                            for (var j = 0; j < srcs.length && j < maxNumberOfThumbnails; j++) {
                                var str = srcs[j];

                                img = vyho.lib.Utilities.addNew("img", div);
                                images[images.length] = img;
                                img.className = this.THUMBNAIL_IMAGE;
                                img.style.display = "inline";
                                
                                img.addEventListener("load", showControlEventHandler, true);

                                img.src = str;

                                if (!this.keepAspectRatio) {
                                    img.style.maxWidth = this.size + "px";
                                }
                                img.style.maxHeight = this.size + "px";

                                vyho.lib.Utilities.newText("\u00a0", div);
                                if (dispType == "favorite" || dispType == "main") {
                                    img.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showImagePreview,
                                        img.src, [true, link.parentNode.firstChild, postId]), true);

                                    vyho.lib.Utilities.hover(img, img, null, null,
                                        vyho.lib.Utilities.runWith(this, this.showImagePreviewMouseOver,
                                            img.src, [false, link.parentNode.firstChild, postId]),
                                        vyho.lib.Utilities.runWith(this, this.handleImageMouseOut,
                                            img.src, [true, link.parentNode.firstChild, postId])
                                        );
                                }
                            }
                        }
                    }
                    
                    /////////////////////////////////////////////////////////////////////
                    //detail text:
                    
                    if (this.showPreviewText && this.preferences.getShowTextPreview().getValue()) {
                        var detailTextDiv = vyho.lib.Utilities.addNewAfter("div", lastNode);
                        lastNode = detailTextDiv;
                        //detailTextDiv.setAttribute("style", "overflow-x: hidden; overflow-y: auto; border: none; word-wrap: break-word !important; word-break: break-all !important;");
                        //detailTextDiv.style.width = "80%";
                        //if (imageArea != null) {
                        //    detailTextDiv.setAttribute("style", "width: expression('200px'); overflow-x: hidden; overflow-y: auto; border: none; word-wrap: break-word !important; word-break: break-all !important;");
                        //} else {
                        detailTextDiv.setAttribute("style", "overflow-x: hidden; overflow-y: auto; border: none; word-wrap: break-word !important; word-break: break-all !important;");
                        //}

                        //detailTextDiv.style.maxWidth = 250 + "px";   //@todo: config   //todo: the width may reduce with image

                        detailTextDiv.style.width = this.getSummaryTextWidth(entry, imageArea);

                        detailTextDiv.className = "detailTextDiv";
                        detailTextDiv.style.display = "inline-block";
                        //detailTextDiv.style.height = this.size + "px";
                        if (imageArea != null) {
                            detailTextDiv.style.height = imageArea.style.height;
                        } else {
                            detailTextDiv.style.maxHeight = this.size + "px";
                        }

                        var subDetailText = this.removeTags(detailText);
                        
                        subDetailText = vyho.lib.Utilities.parseEntity(subDetailText);
                        
                        //remove all tags (what if escaped?)
                        var subTextLength = this.preferences.getPreviewTextLength().getValue();
                        
                        if (subDetailText.length > subTextLength) {    //@todo: config 
                            subDetailText = subDetailText.substring(0, subTextLength) + " ...";    //todo config
                        }
                        if (this.preferences.getConvertTextToLowerCase().getValue()) {
                            subDetailText = this.toLowerCase(subDetailText);
                        }
                        //detailTextDiv.textContent = subDetailText;
                        //var detailTextLink = vyho.lib.Utilities.addNew("a", detailTextDiv);
                        detailTextDiv.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showDetails,
                            emailInfo, advInfo), true);

                        vyho.lib.Utilities.newText(subDetailText, detailTextDiv);
                    
                        /////////////////////////////////////////////////////////////////

                        if (imageArea != null) {
                            var params = [detailTextDiv, entry, imageArea];
                            var eventListener = vyho.lib.Utilities.runWith(this, this.resizeSubText,
                                params, null);
                            params[3] = eventListener;
                            params[4] = images.length;
                            params[5] = 0;
                            params[6] = imageScrollArea;
                                    
                            for (i = 0; i < images.length; i++) {
                                images[i].addEventListener("load", eventListener, false);
                            }
                        }
                    }
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Error (5): " + sess, err);
                throw err;
            }
        }
        
        this.showGridViewImageIcons = function(srcs, img, link, postId) {
            var icon;
            var left = 0;
            var top = 0;
            var con = img.parentNode;
            if (con) {
                con = con.parentNode;
                if (!con) return;
            }
            for (var i = 0; i < srcs.length; i++) {
                icon = vyho.lib.Utilities.addNew("a", con);
                icon.href = "javascript:void(0)"; // srcs[i];
                //icon.text = "" + (i + 1);
                vyho.lib.Utilities.newText("" + (i + 1), icon);
                
                top = 5 + Math.floor(i / 5) * 20;
                if ((i % 5) == 0) {
                    left = 0;
                }
                
                icon.setAttribute("style", "width: 14px; background-color: gray; position: absolute; z-index: 9999 !important; left: " + 
                    left + "px; top: " + top + "px; background-color: transparent; color: red; text-shadow: 2px 2px 2px #000;");
                left += 20;
                
                if (link) {
                    if (link.parentNode) {
                        icon.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showImagePreview,
                            srcs[i], [true, link.parentNode.firstChild, postId]), true);
                        vyho.lib.Utilities.hover(icon, icon, null, null,
                            vyho.lib.Utilities.runWith(this, this.showImagePreviewMouseOver,
                                srcs[i], [false, link.parentNode.firstChild, postId]),
                            vyho.lib.Utilities.runWith(this, this.handleImageMouseOut,
                                srcs[i], [true, link.parentNode.firstChild, postId])
                            );
                    } else {
                    //console.log(link);
                    }
                }
            //img.parentNode
            //vyho.lib.Utilities.newText(" ", img.parentNode.parentNode);
            }
        //vyho.lib.Utilities.addNew("br", img.parentNode);
        }
        
        this.getEntryImages = function(matches) {
            var imageMap = new vyho.lib.HashMap();
            var images = [];
            for (var j = 0; j < matches.length; j++) {
                var str = matches[j];
                if (!str) continue;

                var index = str.indexOf("src=\"");
                str = str.substring(index + 5);
                index = str.indexOf("\"");
                str = str.substring(0, index);
                //replace the /thumbnails:
                str = str.replace("thumb/", "");
                
                if (str.indexOf("craigslist") >= 0) {
                    index = str.lastIndexOf("_");
                    if (index > 0) {
                        str = str.substring(0, index) + "_600x450.jpg";
                    }
                }
                var existed = imageMap.get(str);
                if (existed != null) {
                    continue;
                }
                imageMap.put(str, ".");
                images[images.length] = str;
            }
            return images;
        }

        this.resizeSubText = function(evt, data, param2) {
            
            var eventListener = data[3];
            var image = evt.target;
            image.removeEventListener("load", eventListener);
            
            var imagesLength = data[4];
            var counter = data[5];
            counter++;
            data[5] = counter;
            if (counter < imagesLength) {
                return;
            }
            var detailTextDiv = data[0];
            var entry = data[1];
            var imageArea = data[2];
            var imageScrollArea = data[6];

            var width = entry.offsetWidth - imageArea.offsetWidth - 20;    //todo: this "50" needs adjustment due to shown/hide of the image band arrow buttons
            if (width >= 190) {
                imageScrollArea.style.width = (imageArea.offsetWidth + 10) + "px";
                detailTextDiv.style.width = width + "px";
            } else {
                //@todo word break style doesn't work
                detailTextDiv.setAttribute("style", "width: 95%; overflow-x: hidden; overflow-y: auto; border: none; word-wrap: normal !important; white-space: normal !important;");
            }
        }

        this.removeTags = function(text) {
            var i;
            var res = "";
            var removed;
            if (text == null) return "";
            removed = false;
            for (i = 0; i < text.length; i++) {
                var ch = text.charAt(i);
                if (ch == '<') {
                    //start of tag
                    //remove all these
                    removed = true;
                }
                if (ch == '>') {    //end of tag
                    removed = false;
                    continue;
                }
                if (removed) continue;
                res += ch;
            }
            
            return res;
        }
        
        this.addPostAction = function(referenceNode, iconResource, actionHint, actionHandler, hrefUrl, insertMethod) {
            
            var link;
            if (actionHandler != null || hrefUrl != null) {
                link = insertMethod("a", referenceNode);
                if (hrefUrl) {
                    link.href = hrefUrl;
                    link.target = "_blank"; //@todo: does this work with all buttons?
                }
                else link.href = "javascript:void(0)";
            } else {
                link = insertMethod("span", referenceNode);
            }
            
            var icon = vyho.lib.Utilities.addNew("img", link);
            icon.src = iconResource;
            //icon.style.width = this.preferences.getButtonIconSize().getValue() + "px";
            //icon.style.height = this.preferences.getButtonIconSize().getValue() + "px";
            
            icon.setAttribute("title", actionHint);
            if (actionHandler != null) {
                link.addEventListener("click", actionHandler, false);
            }
            
            //vyho.lib.Utilities.newTextAfter("\u00a0", link);
            //also consider: 
            link.style.padding = "0px";
            //            link.style.paddingLeft = "0px";
            link.style.paddingRight = this.preferences.getButtonIconSpacing() + "px";
            //            link.style.paddingTop = "0px";
            //            link.style.paddingBottom = "0px";
            
            link.style.margin = "0px";
            //link.style.marginRight = this.preferences.getButtonIconSpacing() + "px";
            link.setAttribute("style", "margin: 0px 0px 0px 0px !important;");
            //vyho.lib.Utilities.notify("it is: " + this.preferences.getButtonIconSpacing().getValue());
            
            //icon.style.border = "1px";
            //icon.style.margin = "0px";
            //icon.style.marginRight = this.preferences.getButtonIconSpacing().getValue() + "px";
            icon.setAttribute("style", "border: 1px; width: " + 
                this.preferences.getButtonIconSize().getValue() + "px; height: " + 
                this.preferences.getButtonIconSize().getValue() + "px; margin: 0px " + 
                this.preferences.getButtonIconSpacing().getValue() + "px 0px 0px !important;");
            
            if (actionHandler != null || hrefUrl != null) {
                vyho.lib.Utilities.hover(link, icon, "1px solid blue", "1px solid white", null, null);
            }
            return [link, icon];
        }

        this.processEmailForm = function(response, infos, param) {
            var responseText = response.responseText;
            var address = infos[0];
            var search = infos[1];
            var link = infos[2];
            var emailInfo = infos[3];

            var action = "";
            var test = vyho.lib.Utilities.extractText(responseText, "<textarea name=body title=\"", "\"", 0);

            var login = true;
            if (test == null) {
                login = false;
            } else {
                var bodyTitle = test[0];
                if (bodyTitle == null || bodyTitle != "Message Body") {
                    login = false;
                }
            }

            if (!login) {
                vyho.lib.Utilities.newTextAfter(" - cannot send email.  Not login google email.", link);
                return;
            }

            var extracts = vyho.lib.Utilities.extractText(responseText, "<form action=\"", "\"", 0);
            if (extracts == null) return;

            action = extracts[0];

            address += action;
            var to = emailInfo.getEmailAddress();
            var bcEmail = this.preferences.getBcEmail().getValue();
            //enctype=multipart/form-data
            var body = search.emailBody + "\n\n" + link;
            var subject = vyho.lib.Utilities.escapeUrl(emailInfo.getSubject());

            var data = "nvp_bu_send=Send";
            data += "&body=" + vyho.lib.Utilities.escapeUrl(body);
            data += "&subject=" + subject;
            if (search.onlySendSelf) {
                if (bcEmail != null && bcEmail != "") {
                    data += "&to=" + bcEmail;
                }
            } else {
                data += "&to=" + to;
                if (bcEmail != null && bcEmail != "") {
                    data += "&bcc=" + bcEmail;
                }
            }
            try {
                var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                    "method" : "POST",
                    "url" : address,
                    "headers" : {
                        "Accept" : "text/html,text/xml,text/plain",
                        "Content-type" : "application/x-www-form-urlencoded"
                    },
                    "contentHandler" : vyho.lib.Utilities.runWith(this, this.processEmailFormSubmission,
                        infos,
                        ""),
                    "data" : data
                });
                req.send();
            } catch (err) {
                vyho.lib.Utilities.notify("error (6): " + sess, err);
                throw err;
            }
        }

        this.processEmailFormSubmission = function(response, infos, param) {
            //var search = infos[1];
            var link = infos[2];
            var postId = infos[4];

            if (this.emailedMap.contains(postId)) {
                return;
            }

            //emailIcon.src = vyho.lib.Resources.emailIcon;
            //problem: these variables are not updated because it's called
            //from the ajax
            
            this.trimList(this.emailedList, this.emailedMap, 1, this.MAX_EMAIL_ENTRIES);
            this.emailedMap.put(postId, ".");
            this.emailedList[this.emailedList.length] = postId;
            this.saveEmailedList();
            var space = vyho.lib.Utilities.newTextAfter("  ", link);
            var emailIcon = vyho.lib.Utilities.addNewAfter("img", space);
            emailIcon.src = vyho.lib.Resources.emailIcon;
            emailIcon.style.width = this.preferences.getButtonIconSize().getValue() + "px";
            emailIcon.setAttribute("title", "Email sent");
        }

        this.sendEmail = function(params) {
            var search = params[0];
            var link = params[1];
            var emailInfo = params[2];
            var postId = params[3];
            
            if (this.emailedMap.contains(postId)) {
                return;
            }
            var address = "https://mail.google.com/mail/h/" + vyho.lib.Utilities.rand(13) +
            "/?v=b&pv=tl&cs=b";
            try {
                var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                    method: "GET",
                    url: address,
                    headers: {
                        "Accept" : "text/html,text/xml,text/plain"
                    },
                    contentHandler: vyho.lib.Utilities.runWith(this, this.processEmailForm,
                        new Array(address, search, link, emailInfo, postId), ""),
                    data : null
                });
                req.send();
            } catch (err) {
                vyho.lib.Utilities.notify("error (7): " + sess, err);
                throw err;
            }
        }

        this.performFilterAndSearch = function(text, title, location, href) {
            if (this.searches == null) {
                var searchData = vyho.lib.Utilities.pref_getValue("SEARCHES", "[]");
                var serializer = new vyho.lib.Serializer();
                this.searches = serializer.decode(searchData);
            }
            if (this.searches.length == 0) {
                return null;
            }
            var orIndex;
            var index ;
            text = text.toUpperCase();
            title = title.toUpperCase();
            for (var i = 0; i < this.searches.length; i++) {
                var search = this.searches[i];
                if (search.enabled == false) continue;
                index  = this.browserWin.document.URL.indexOf(search.url);
                if (index < 0) {
                    continue;
                }
                var found = false;
                if (search.filters != null) {
                    try {
                        for (orIndex = 0; orIndex < search.filters.length ; orIndex++) {
                            var orFilter = search.filters[orIndex];
                            var matched = false;
                            if (orFilter.andList && orFilter.andList.length > 0) {
                                matched = true;
                                for (var andIter = 0; andIter < orFilter.andList.length; andIter++) {
                                    var andFilter = orFilter.andList[andIter];

                                    var key = andFilter.filter.toUpperCase();
                                    index = text.indexOf(key);
                                    if (index < 0) {
                                        index = title.indexOf(key);
                                    }
                                    if (!andFilter.exclude) {
                                        if (index >= 0) {
                                            continue;
                                        }
                                    } else {
                                        if (index < 0) {
                                            continue;
                                        }
                                    }
                                    matched = false;
                                    break;
                                }
                            }
                            if (matched) {
                                found = true;
                                break;  //good
                            }
                        }
                    } catch (err) {
                        found = false;
                    }
                    if (found) {
                        try {
                            var price = this.getPrice(title);
                            if (search.minPrice != null && search.minPrice != "") {
                                if (price == null) {
                                    found = false;
                                }
                                if (parseFloat(search.minPrice) > parseFloat(price)) {
                                    found = false;
                                }
                            }
                            if (search.maxPrice != null && search.maxPrice != "") {
                                if (price == null) {
                                    found = false;
                                }
                                if (parseFloat(search.maxPrice) < parseFloat(price)) {
                                    found = false;
                                }
                            }
                        } catch (err) {
                            found = false;
                        }
                        if (found) {
                            return search;
                        }
                    }
                }
            }
            return null;
        }

        // - $2450 / 2br - "Cozy Cottage" for RENT - PET FRIENDLY! (Fort Washington, MD)
        this.priceRegx = [
        new RegExp("\\$([\\s\\S]+?)\\s", "g")
        ];

        this.getPrice = function(subj) {
            try {
               
                var price = null;
                var content = null;
                for (var i = 0; i < this.priceRegx.length; i++) {
                    this.priceRegx[i].lastIndex = 0;
                    content = this.priceRegx[i].exec(unescape(subj));
                    if (content != null && content.length > 1) {
                        price = content[1];
                        break;
                    }
                }
                return price;
            } catch (error) {
                return null;
            }
        }
        /*
        this.getPrice = function(title) {
            var extracts = vyho.lib.Utilities.extractText(title, "%24", "%20", 0);
            if (extracts == null) return null;
            return extracts[0];
        }
        */
        /*
            search.name = name;
            search.url = url;
            search.filters = filters;
            search.emailBody = emailBody;
            search.enabled = enabled;
            search.minPrice = minPrice;
            search.maxPrice = maxPrice;
            search.onlySendSelf = onlySendSelf
            search.maxSendCount = maxSendCount;
            search.sendEmailEnabled = sendEmailEnabled;
    */

        this.getPostId = function(link) {
            var aurl = link.href;

            var idIndex = aurl.lastIndexOf("/");
            if (idIndex < 0) {
                return null;
            }
            var id = aurl.substring(idIndex + 1);

            var htmlIndex = id.indexOf(".html");
            if (htmlIndex > 0) {
                id = id.substring(0, htmlIndex);
            }
            return id;
        }

        this.showImageBandControl = function(event, div, data) {
            var img = event.target;
            var eventHandler = data[0];
            img.removeEventListener("load", eventHandler, false);
            
            var counter = data[2];
            counter++;
            data[2] = counter;
            var imagesLength = data[3].length;  //images
            if (counter < imagesLength) {
                return;
            }
            
            var imageArea = data[5];
            var entry = data[6];
            
            if (imageArea.offsetWidth <= entry.offsetWidth) {
                return;
            }
            
            var imageScroll = data[4];
            //console.log(imageScroll);
            imageScroll.style.position = "relative";
            
            var style = "border: 1px solid rgba(100, 255, 255,0.2); width: 30px; height: 30px; position: absolute; top: 3px; \
                background-color:rgba(255, 255, 255,0.2) !important; font-size: 34px !important; color: #ff0000; \
                text-shadow: 3px 3px 3px #990000; font-weight: bold; v-align: top; padding-top: 0px; margin: 2px; ";
            
            imageScroll.style.position = "relative";
            var prevDiv = vyho.lib.Utilities.addNew("div", imageScroll);
            prevDiv.setAttribute("style", style + "left: 10px !important;")
            var prevText = vyho.lib.Utilities.newText(" ", prevDiv); //<
            //prevDiv.style.display = "none";
            
            var nextDiv = vyho.lib.Utilities.addNew("div", imageScroll);
            nextDiv.setAttribute("style", style + "left: 50px !important;")
            var nextText = vyho.lib.Utilities.newText(">", nextDiv);
            
            nextDiv.addEventListener("click", vyho.lib.Utilities.runWith(this, this.flipImageBandPage,
                imageArea, new Array(-1, prevDiv, nextDiv, imageScroll)), true);
                
            vyho.lib.Utilities.hover(nextDiv, nextDiv, null, null,
                vyho.lib.Utilities.runWith(this, this.animateImageBand,
                    imageArea,  new Array(-2, prevDiv, nextDiv, imageScroll)),
                vyho.lib.Utilities.runWith(this, this.stopImageBandAnimation,
                    imageArea,  new Array(-2, prevDiv, nextDiv, imageScroll))
                );

            prevDiv.addEventListener("click", vyho.lib.Utilities.runWith(this, this.flipImageBandPage,
                imageArea,  new Array(1, prevDiv, nextDiv, imageScroll)), true);
            
            vyho.lib.Utilities.hover(prevDiv, prevDiv, null, null,
                vyho.lib.Utilities.runWith(this, this.animateImageBand,
                    imageArea,  new Array(2, prevDiv, nextDiv, imageScroll)),
                vyho.lib.Utilities.runWith(this, this.stopImageBandAnimation,
                    imageArea,  new Array(2, prevDiv, nextDiv))
                );
            
            //var prevIcon = data[1];
            //remove the event from the image
            /*
            if (nextIcon && nextIcon.style.display == "inline") {
                //return;
            }
            var width = div.offsetWidth;
            if (nextIcon && width > this.IMG_BAND_WIDTH) {
                nextIcon.style.display = "inline";
            }
            */
            var bandControlResizer = data[1];
            bandControlResizer(event);
        }

        this.imageBandResizer = function(evt, data, param2) {
            //        data[0] = images;
            //        data[1] = 0; //image load count
            //        data[2] = imgTable;
            //        data[3] = scrollDiv;
            //        data[4] = div;
            data[1] = data[1] + 1;
            var images = data[0];
            if (data[1] < images.length) {
                return;
            }
            var maxHeight = 0;
            for (var i = 0; i < images.length; i++) {
                //find out the image height
                if (maxHeight < images[i].offsetHeight) {
                    maxHeight = images[i].offsetHeight;
                }
            }
            data[2].style.height = maxHeight + "px";
            data[3].style.height = maxHeight + "px";
            data[4].style.height = maxHeight + "px";
        }

        this.stopImageBandAnimation = function(evt, div, param2) {
            if (this.imgAnimateId) {
                clearInterval(this.imgAnimateId);
                this.imgAnimateId = null;
            }
        }

        this.flipImageBandPage = function(evt, div, data) {
            if (data == null) {
                return;
            }
            var dir = data[0];
            var prevIcon = data[1];
            var nextIcon = data[2];
            var scrollArea = data[3];
            
            var width = div.offsetWidth;
            var pos = div.style.left;
            if (pos) {
                pos = parseInt(pos);
            } else {
                pos = 0;
            }
            var newPos = pos + dir * (scrollArea.offsetWidth / 2);
            if (newPos > 0) {
                newPos = 0;
            }
            
            
            var minPos = scrollArea.offsetWidth - width;
            if (minPos < 0 && newPos < minPos) {
                newPos = minPos;
            } else if (minPos > 0) {
                newPos = 0;
            }
            
            if (newPos == 0) {
                prevIcon.textContent = "";
            } else {
                prevIcon.textContent = "<";
            }
            if (newPos <= minPos) {
                nextIcon.textContent = "";
            } else {
                nextIcon.textContent = ">";
            }
            
            div.style.left = newPos + "px";
        }
        this.animateImageBand = function(event, div, data) {
            this.imgAnimatePos = 0;
            if (this.imgAnimateId) {
                clearInterval(this.imgAnimateId);
                this.imgAnimateId = null;
            }
            this.imgAnimateId = vyho.lib.Utilities.runRepeat(vyho.lib.Utilities.runWith(this, this.doAnimate, div, data), 5);
        }

        this.doAnimate = function(evt, div, data) {
            var incr = data[0];
            var prevIcon = data[1];
            var nextIcon = data[2];
            var scrollArea = data[3];
            
            //this.imgAnimatePos += incr;
            //var curPos = div.offsetLeft;
            //div.style.left = (curPos + incr) + "px";
            //div.style.left = 5 + "px";

            var width = div.offsetWidth;
            /*
            if (width) {
                    width = parseInt(div.style.width);
            } else {
                    width = this.IMG_BAND_WIDTH;
            }
            */
            
            var pos = div.style.left;
            if (pos) {
                pos = parseInt(pos);
            } else {
                pos = 0;
            }
            var newPos = pos + incr;
            if (newPos > 0) {
                newPos = 0;
                if (this.imgAnimateId) {
                    clearInterval(this.imgAnimateId);
                    this.imgAnimateId = null;
                }
            }

            var minPos = scrollArea.offsetWidth - width;
            if (minPos < 0 && newPos < minPos) {
                newPos = minPos;
                if (this.imgAnimateId) {
                    clearInterval(this.imgAnimateId);
                    this.imgAnimateId = null;
                }
            } else if (minPos > 0) {
                if (this.imgAnimateId) {
                    clearInterval(this.imgAnimateId);
                    this.imgAnimateId = null;
                }
                newPos = 0;
            }
            
            div.style.left = newPos + "px";
            if (newPos == 0) {
                prevIcon.textContent = "";
            //prevIcon.style.display = "none";
            } else {
                prevIcon.textContent = "<";
            //prevIcon.style.display = "block";
            }
            if (newPos <= minPos) {
                nextIcon.textContent = "";
            //nextIcon.style.display = "none";
            } else {
                nextIcon.textContent = ">";
            //nextIcon.style.display = "block";
            }
        }

        this.showImagePreviewMouseOver = function(evt, imgSource, data) {
            var showImageOnMouseOver = this.preferences.getImageMouseOver().getValue();
            if (showImageOnMouseOver) {
                this.showImagePreview(evt, imgSource, data);
            }
        }

        this.showImagePreview = function(evt, imgSource, data) {
            var forceShow = data[0];
            var lastPostHeaderNode = data[1];
            var postId = data[2];
            
            if (forceShow) {
                this.showImageWindow = true;
            }
            if (evt != null) {
            //evt.preventDefault();
            //evt.stopPropagation();
            }
            if (this.showImageWindow) {

                /*
                if (this.firstShown) {
                    this.firstShown = false;
                    if (this.stickyMode || this.stickyMode == "true") {
                        this.setStickyMode();
                    }
                }
                */
                if (this.renderImageDetail) {
                    this.renderImageDetail(postId, lastPostHeaderNode, imgSource);
                    return;
                }
                var img;
               
                //vyho.lib.Utilities.removeAllChildren(this.previewWindow.contentArea);
               
                var childNodes = new Array();
                childNodes.push.apply(childNodes, this.previewWindow.contentArea.childNodes);
                if (this.stickyMode || this.stickyMode == "true") {
                    this.layout.setEnabled(false);
                    if (this.stickyWindow != this.previewWindow) {
                        if (this.stickyWindow != null) {
                            this.stickyWindow.setVisible(false);
                        }
                    }
                    this.stickyWindow = this.previewWindow;
                    this.stickyWindow.setVisible(true);
                    
                    this.layout.setEnabled(true);
                } else {
                    this.previewWindow.setVisible(true);
                //this.previewWindow.setTransparent(1);
                }
                img = vyho.lib.Utilities.addNew("img", this.previewWindow.contentArea);
                img.setAttribute("style", "display: none;");
                img.setAttribute("id", "prevImageId");
                this.previewWindow.requestFocus();
                var me = this;
                img.addEventListener("load", function() {
                    vyho.lib.Utilities.removeNodes(me.previewWindow.contentArea, childNodes);
                    img.setAttribute("style", "display: block;");
                    me.setPreviewImageSize(me.previewWindow.contentArea.offsetWidth - 2 * me.previewWindow.padding,
                        me.previewWindow.contentArea.offsetHeight - 2 * me.previewWindow.padding);
                }, true);
                img.setAttribute("src", imgSource);
            }
        }
        
        this.handleImageMouseOut = function(evt, imgSource, notused) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            if (this.showImageWindow) {
                if (this.preferences.getImageMouseOut().getValue()) {
                    this.previewWindow.setVisible(false);
                //this.previewWindow.setTransparent(0.3);
                }
            }
        }
        
        this.postContentRegx = [
        new RegExp("<section id\\=\\\"postingbody\\\">([\\s\\S]*?)<\\/section>", "g"),
        new RegExp("<section id\\=\\\"userbody\\\">([\\s\\S]*?)<\\/section>", "g"),
        new RegExp("id\\=\\\"userbody\\\">([\\s\\S]*?)<script", "g"),
        new RegExp("id\\=\\\"userbody\\\">([\\s\\S]*?)<\\/section>", "g"),
        new RegExp("<div id\\=\\\"userbody\\\">([\\s\\S]*?)<script\\stype\\=\\\"text","g"),
        new RegExp("<div id\\=\\\"userbody\\\">([\\s\\S]*?)<ul>[\\s]*?<li>","g"),
        new RegExp("<div id\\=\\\"userbody\\\">([\\s\\S]*?)<ul class\\=\\\"blurbs\\\">"),
        ];

        this.parseDetailText = function(details) {
            if (!details) {
                return "No content found.";
            }

            var content = null;
            var search;
            for (var i = 0; i < this.postContentRegx.length; i++) {
                this.postContentRegx[i].lastIndex = 0;
                search = this.postContentRegx[i].exec(details);
                if (search != null && search.length > 1) {
                    content = search[1];
                    break;
                }
            }

            if ((content == null) || (content == null)) {
                return "No content found. ";
            //return this.parseDetailText2(details);
            }
            
            return content;
        }
        
        this.postContentRegx2 = [
        new RegExp("<section id\\=\\\"userbody\\\">", "gm"),
        new RegExp("id\\=\\\"userbody\\\">([\\s\\S]*?)", "gm"),
        new RegExp("id\\=\\\"userbody\\\">([\\s\\S]*?)", "gm"),
        new RegExp("<div id\\=\\\"userbody\\\">([\\s\\S]*?)","gm"),
        ];
        
        this.parseDetailText2 = function(details) {
            if (!details) {
                return "No content found.";
            }

            var content = null;
            var search;
            for (var i = 0; i < this.postContentRegx2.length; i++) {
                this.postContentRegx[i].lastIndex = 0;
                search = this.postContentRegx[i].exec(details);
                if (search != null && search.length > 1) {
                    content = search[1];
                    break;
                }
            }

            if ((content == null) || (content == null)) {
                return "No content found. ";
            //return details;
            }
            return content;
        }
        
        this.subjectRegx = [
        new RegExp("<h2 class=\\\"postingtitle\\\">[\\s\\S]*?<span class=\\\"star\\\"></span>([\\s\\S]*?)</h2>", "gm")
        ];

        this.getSubject = function(details) {
            if (!details) {
                return "No subject found.";
            }

            var content = null;
            var searchRes;
            for (var i = 0; i < this.subjectRegx.length; i++) {
                this.subjectRegx[i].lastIndex = 0;
                searchRes = this.subjectRegx[i].exec(details);
                if (searchRes != null && searchRes.length > 1) {
                    content = searchRes[1];
                    break;
                }
            }
            if (content == null) {
                return "No subject found. ";
            }
            return content;
        }
        this.replyTagRegex = [
        new RegExp("<span class\\=\\\"replylink\\\"><a href=\"([\\s\\S]*?)\\\">reply</a>", "g"),
        new RegExp("<span class\\=\\\"replylink\\\"><a href=\"([\\s\\S]*?)\\\">contact</a>", "g"),
        new RegExp("<span class\\=\\\"replytext\\\"><a href=\"([\\s\\S]*?)\\\">reply</a>", "g"),
        new RegExp("<span class\\=\\\"replytext\\\"><a href=\"([\\s\\S]*?)\\\">contact</a>", "g")
        ];

        this.parseEmailInfo = function(details, baseUrl) {
            //<span class="replytext"><a href="/reply/1111111">reply</a></span>

            var content = null;
            for (var i = 0; i < this.replyTagRegex.length; i++) {
                this.replyTagRegex[i].lastIndex = 0;
                content = this.replyTagRegex[i].exec(details);
                if (content != null && content.length > 1) {
                    content = content[1];
                    break;
                }
            }
            if (content != null) {
                //baseUrl = this.browserWin.location.href;
                var index = baseUrl.indexOf("//");
                if (index < 0) return null;
                index = baseUrl.indexOf("/", index + 2);
                baseUrl = baseUrl.substring(0, index);
                return new vyho.lib.net.EmailInfo(baseUrl + content);
            }

            return null;
        }
        
        this.parseEmailInfo2s = function(details) {
            var emailInfo = {};
            var emailStart = "<a class=\"replylink\" href=\"mailto:";
            var index = details.indexOf(emailStart);
            if (index < 0) {
                return null;
            }
            var email = details.substring(index + emailStart.length);
            var endIndex = email.indexOf("?subject=");
            if (endIndex < 0) {
                return null;
            }
            emailInfo.address = email.substring(0, endIndex);
            index = endIndex + "?subject=".length;
            var subject = email.substring(index);
            endIndex = subject.indexOf("body=");
            if (endIndex < 0) {
                return null;
            }
            emailInfo.subject = subject.substring(0, endIndex);
            return emailInfo;
        }

        this.postinginfosRegx = [
            new RegExp("<div class\\=\\\"postinginfos\\\">[\\s\\S]*?</div>", "g")
        ];

        this.getPostingInfo = function(details) {
            try {
            
                var postingInfo = null;
                var content = null;
                for (var i = 0; i < this.postinginfosRegx.length; i++) {
                    this.postinginfosRegx[i].lastIndex = 0;
                    content = this.postinginfosRegx[i].exec(details);
                    if (content != null && content.length > 0) {
                        postingInfo = content[0];
                        break;
                    }
                }
                if (postingInfo != null) {
                    postingInfo = postingInfo.replace(/\<p[^\>]*?>/g, "");
                    postingInfo = postingInfo.replace(/<\/p[^\>]*?>/g, "    ");
                    postingInfo = "<br><br>" + postingInfo;
                }
                return postingInfo;
            } catch (error) {
                return null;
            }
        }
        
        //        <p class="postinginfo">Updated: <date title="1372689844000">2013-07-01, 10:44AM EDT</date></p>
        this.updatedDateRegx = [
        new RegExp("<p class\\=\\\"postinginfo\\\">updated: <time datetime=\"([^\"]*?)\">[\\s\\S]*?</time></p>", "g"),
        new RegExp("<p class\\=\\\"postinginfo\\\">Updated: <time datetime=\"([^\"]*?)\">[\\s\\S]*?</time></p>", "g"),
        new RegExp("<p class\\=\\\"postinginfo\\\">Updated: <date title=\"[^\"]*?\">([\\s\\S]*?)</date></p>", "g")
        ];

        this.getPostUpdateDuration = function(details) {
            try {
            
                var date = "";
                var content = null;
                for (var i = 0; i < this.updatedDateRegx.length; i++) {
                    this.updatedDateRegx[i].lastIndex = 0;
                    content = this.updatedDateRegx[i].exec(details);
                    if (content != null && content.length > 1) {
                        date = content[1];
                        break;
                    }
                }

                //                var dateStr = date;
                return this.getElapsedTime(date);
            } catch (error) {
                return null;
            }
        }

        this.postDateRegx = [
        new RegExp("Posted: <time datetime=\"([^\"]*?)\">[\\s\\S]*?</time>", "g"),
        new RegExp("Posted: <date title=\"[^\"]*?\">([\\s\\S]*?)</date>", "g"),
        new RegExp("<date>([\\s\\S]*?)</date>", "g"),
        new RegExp("<div class\\=\\\"postingdate\\\">Date: <time>([\\s\\S]*?)</time></div>", "g"),
        new RegExp("<span class\\=\\\"postingdate\\\">Date: ([\\s\\S]*?)</span>", "g")
        ];

        this.parsePostDate = function(details) {
            try {
            
                var date = "";
                var content = null;
                for (var i = 0; i < this.postDateRegx.length; i++) {
                    this.postDateRegx[i].lastIndex = 0;
                    content = this.postDateRegx[i].exec(details);
                    if (content != null && content.length > 1) {
                        date = content[1];
                        break;
                    }
                }
                //vyho.lib.Utilities.notify("The date string is: " + date);
                //                var dateStr = date;

                return this.getElapsedTime(date);
            } catch (error) {
                return null;
            }
        }
                
        this.getElapsedTime = function(date) {
            try {
                
                var postDate = {};

                if (date == null || date.length == 0) {
                    return null;
                }
                /*
                date = date.replace(",", "");
                date = date.replace("AM", " AM");
                date = date.replace("PM", " PM");
                date = date.replace("  ", " ");
                date = date.replace(/\-/g, "/");
		*/
                date = Date.parse(date);
                if (date == null) return null;
                
                date = new Date(date);

                var secondInHour = 60 * 60;
                var secondInDay = 60 * 60 * 24;
                var secondInMinute = 60;

                var currentTime = new Date();
                var diff = (currentTime.getTime() - date.getTime())/1000.0;
                var day = Math.floor(diff/secondInDay);
                var hour = Math.floor((diff - day * secondInDay)/secondInHour);
                var minute = Math.floor((diff - day * secondInDay - hour * secondInHour)/secondInMinute);
                
                var shortDisplay = this.preferences.getShowShortTimeLabel().getValue();
                
                var timeFormat = this.preferences.getElapsedTimeFormat().getValue();
                var formatCount = 0;
                
                var mod;
                var elapseTime = "";
                if (day > 0 && formatCount < timeFormat) {
                    mod = " days";
                    if (day == 1) {
                        mod = " day";
                    }
                    if (shortDisplay) {
                        mod = "d";
                    }
                    elapseTime += day + mod;
                    formatCount++;
                }
                if (hour > 0 && formatCount < timeFormat) {
                    if (elapseTime != "") {
                        elapseTime += " "
                    }
                    mod = " hours";
                    if (hour == 1) {
                        mod = " hour";
                    }
                    if (shortDisplay) {
                        mod = "h";
                    }
                    elapseTime += hour + mod;
                    formatCount++;
                }
                if (minute > 0 && formatCount < timeFormat) {
                    if (elapseTime != "") {
                        elapseTime += " "
                    }
                    
                    mod = " minutes";
                    if (minute == 1) {
                        mod = " minute";
                    }
                    if (shortDisplay) {
                        mod = "m";
                    }
                    elapseTime += minute + mod;
                    formatCount++;
                }
                postDate.postDate = date;
                postDate.elapseTime = elapseTime + " ";   // + ", diff: " + diff + ", post date: " + date + ", str: " + dateStr;
                
                return postDate;
            } catch (err) {
                vyho.lib.Utilities.notify("The date string is: " + date + ", error: ", err);
                return null;
            }
        }
        //<h2 class="postingtitle">
        //    <span class="star"></span>
        //    Something - &#x0024;15000 (location)
        //    </h2>
        //<div id="map" class="viewposting" data-latitude="39.014200" data-longitude="-77.528500"></div>
        //<div class="mapaddress">Nevada Ave NW at Military Road NW</div>
        this.locationsRegx = [
            {
                "regx": new RegExp("<div id=\"map\" class=\"viewposting\" data-latitude=\"([\\s\\S]*?)\" data-longitude=\"([\\s\\S]*?)\"></div>", "g"),
                "type": "geoCoordinate"
            },
            {
                "regx": new RegExp("<div class=\"mapaddress\">([\\s\\S]*?)</div>", "g"),
                "type": "address"
            },
            {
                "regx": new RegExp("<h2 class=\"postingtitle\">[\\s\\S]*?(\\([\\s\\S]*?\\))[\\s\\S]*?</h2>", "g"),
                "type": "name"
            }
        ];

        //todo: some location has more than one type of information
        this.parseLocation = function(details) {
            var location = {"isEmpty": true};
            location.getLabel = function() {    //todo: inefficient, make a location Info class
                if (this.isEmpty) {
                    return "";
                }
                if (this.type == "address" || this.type == "name") {
                    return this.address;
                }
                if (this.type == "geoCoordinate") {
                    return this.latitude + "," + this.longitude;
                }
                return "";
            };
            try {
                var content = null;
                for (var i = 0; i < this.locationsRegx.length; i++) {
                    this.locationsRegx[i].regx.lastIndex = 0;
                    content = this.locationsRegx[i].regx.exec(details);
                    if (content != null && content.length > 1) {
                        location.type = this.locationsRegx[i].type;
                        if (location.type == "geoCoordinate") {
                            location.latitude = content[1];
                            location.longitude = content[2];    //todo: note check length above is not enforced for this
                        } else {
                            location.address = content[1];
                        }
                        location.isEmpty = false;
                        break;
                    }
                }
            } catch (error) {
                //todo: console.log
            }
            return location;
        }

        this.parseLocation_deprecated = function(details) {
            var location = null;
            var address = null;
            var name = null;
            var xstreet0 = null;
            var xstreet1 = null;
            var city = null;
            var region = null;


            var extract;
            var startIndex = 0;
            extract = vyho.lib.Utilities.extractText(details, "<!-- CLTAG xstreet0=", " -->", startIndex);
            if (extract != null) {
                xstreet0 = extract[0];
                startIndex = extract[1];
            }

            extract = vyho.lib.Utilities.extractText(details, "<!-- CLTAG xstreet1=", " -->", startIndex);
            if (extract != null) {
                xstreet1 = extract[0];
                startIndex = extract[1];
            }
            extract = vyho.lib.Utilities.extractText(details, "<!-- CLTAG city=", " -->", startIndex);
            if (extract != null) {
                city = extract[0];
                startIndex = extract[1];
            }
            extract= vyho.lib.Utilities.extractText(details, "<!-- CLTAG region=", " -->", startIndex);
            if (extract != null) {
                region = extract[0];
                startIndex = extract[1];
            }

            if (vyho.lib.Utilities.isEmpty(xstreet0) == false && vyho.lib.Utilities.isEmpty(city) == false) {
                address = xstreet0;
                if (vyho.lib.Utilities.isEmpty(xstreet1) == false && !xstreet0.match(/[\d]+ /)) {
                    address = xstreet0 + " and " +  xstreet1;	//address + " at " + 
                }

                address = address + ", " + city;

                if (vyho.lib.Utilities.isEmpty(region) == false) {
                    address = address + ", " + region;
                }
                
                extract= vyho.lib.Utilities.extractText(details, "<p class=\"mapaddress\">", "<small>", startIndex);
                if (extract != null) {
                    name = extract[0];
                } else {
                    extract= vyho.lib.Utilities.extractText(details, "-->", "<small>", startIndex);
                    if (extract != null) {
                        name = extract[0];
                    }
                }
            } else {
                extract = vyho.lib.Utilities.extractText(details, "<!-- CLTAG GeographicArea=", " -->", 0);
                if (extract != null) {
                    address = extract[0];
                    startIndex = extract[1];
                    extract= vyho.lib.Utilities.extractText(details, "-->", "<", startIndex);
                    if (extract != null) {
                        name = extract[0];
                        if (name != null && name.indexOf("Location:") >= 0) {
                            name = name.substring("Location:".length);
                        }
                    }
                } else {
                    return null;
                }
            }
            location = new Array();
            location[0] = address;
            location[1] = vyho.lib.Utilities.trimText(name);
            return location;
        }
        /*
        this.parseLocation = function(details) {
            var locationStart = "Location:";
            var index = details.indexOf(locationStart);
            if (index < 0) {
                return null;
            }
            var endIndex = details.indexOf("<li>", index);
            if (endIndex < 0) {
                return null;
            }
            var location = details.substring(index + locationStart.length, endIndex);

            return location;
        }
        */

        this.showDetailsMouseOver = function(evt, emailInfo, data) {
            if (this.preferences.getDetailMouseOver().getValue()) {
                this.showDetails(evt, emailInfo, data);
            }
        }

        this.handleDetailsMouseOut = function(evt, emailInfo, data) {
            //dim or hide?
            //var showDetailOnMouseOver = vyho.lib.Utilities.pref_getValue(this.SHOW_DETAIL_ON_MOUSE_OVER, true);
            //this.infoWindow.setVisible(false);
            //this.infoWindow.setTransparent(0.3);
            if (this.preferences.getDetailMouseOut().getValue()) {
                this.infoWindow.setVisible(false);
            }
        }
        
        this.getPostDetailArea = function(postId, refNode) {
            var contentArea = this.infoWindow.contentArea;
            vyho.lib.Utilities.removeAllChildren(contentArea);
            return contentArea;
        }

        this.showDetails = function(evt, emailInfo, data) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }

            var detailText = data.detailText;
            var location = data.location; //0: location, 1: name
            var forceShow = data.forceShow;
            var postId = data.postId;
            var link = data.link; //link.text: the post title
            var price = data.price;
            var subject = data.subject;
            var firstSibling = data.firstSibling;

            if (forceShow) {
                this.showDetailWindow = true;
            }

            if (!this.showDetailWindow) {
                return;
            }

            var addNew = vyho.lib.Utilities.addNew;
            var doc = this.browserWin.document;

            var detailArea = this.getPostDetailArea(postId, firstSibling);
            detailArea.scrollTop = 0;
            
            detailArea.style.color = this.preferences.getForegroundColor().getValue();
            detailArea.style.backgroundColor = this.preferences.getBackgroundColor().getValue();
            
            var table = addNew("table", detailArea);
            table.width = "100%";
            table.border = "0";
            
            var tr = addNew("tr", table);
            var td = addNew("td", tr);
            var emailTemplateLink;
            var textNode;

            if (emailInfo != null) {
                var emailLink = addNew("a", td);

                emailLink.href = "javascript:void(0)";
                //emailLink.style="background: #ffffff;";
                textNode = vyho.lib.Utilities.newText("Email:", emailLink);

                var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
                var emailTemplates;
                var serializer;
                serializer = new vyho.lib.Serializer();
                emailTemplates = serializer.decode(emailTemplateData);
                var i = 0;
                var template = null;
                if (emailTemplates != null && emailTemplates.length == 0) {
                    template = new Array();
                    emailTemplates[0] = template;
                    template[0] = "Email Template";
                    template[1] = "Hi,\n\nI want to buy it.  I can pick it up today.  My phone number is [(ddd) ddd-dddd].\n\nThanks, \n\n[My Name]"
                    template[2] = "";
                    emailTemplateData = serializer.encode(emailTemplates);
                    vyho.lib.Utilities.pref_setValue("EMAIL_TEMPLATES", emailTemplateData);
                }

                textNode = vyho.lib.Utilities.newText("    ", td);

                var templateList = addNew("select", td);
                templateList.id = "templateListId";
                for (i = 0; emailTemplates != null && i < emailTemplates.length; i++) {
                    template = emailTemplates[i];
                    var option = new Option(template[0], template[0], false, false);
                    templateList.options.add(option);    //[templateList.options.length] = option;
                }
                td = addNew("td", tr);
            } else {
                td.colspan = "2";
            }
            emailTemplateLink = addNew("a", td);
            emailTemplateLink.href = "javascript:void(0)";
            textNode = vyho.lib.Utilities.newText("Edit Templates", emailTemplateLink);

            emailTemplateLink.addEventListener("click",
                vyho.lib.Utilities.attach(this, "showEmailTemplates", this.browserWin, ""), false);
            if (emailInfo != null) {
                emailLink.addEventListener("click",
                    vyho.lib.Utilities.attach(this, "showEmailEditor", emailInfo, new Array(postId, link, emailLink)), false);
            }
            var advInfo = {};
            advInfo.price = price;
            advInfo.subject = subject;
            advInfo.images = data.images;
            this.renderDetailArea(link, detailArea, detailText, location, advInfo, doc);
        }

        this.renderDetailArea = function(link, detailArea, detailText, location, advInfo, doc) {
            var price = advInfo.price;
            if (typeof price == "undefined" || price == null) {
                price = "$?.??";
            } else {
                price = "$" + price;
            }
            var images = advInfo.images;

            vyho.lib.Utilities.addNew("br", detailArea);
            
            var subject = vyho.lib.Utilities.addNew("div", detailArea);
            //subject.style = "font-weight: bold";
            subject.setAttribute("style", "font-weight: bold");

            var subjText = advInfo.subject;
            if (this.preferences.getConvertTextToLowerCase().getValue()) {
                subjText = this.toLowerCase(subjText);
            }
            subjText = vyho.lib.Utilities.parseEntity(subjText);
            subjText = subjText.replace("&amp;", "");
            if (subjText.indexOf("$") < 0) {
                subjText += " - " + price;
            }
            
            if (location.isEmpty == false) {
                if (subjText.toLowerCase().indexOf(location.getLabel().toLowerCase()) < 0) {
                    subjText += " - " + location.getLabel();
                }
            }
            
            var textNode = vyho.lib.Utilities.newText(subjText, subject);

            if (location.isEmpty == false) {
                textNode = vyho.lib.Utilities.newText("  ", subject);

                var mapLink = vyho.lib.Utilities.addNew("a", subject);
                mapLink.href = "";
                var mapIcon = vyho.lib.Utilities.addNew("img", mapLink);
                mapIcon.src = vyho.lib.Resources.mapIcon;
                mapIcon.style.width = this.preferences.getButtonIconSize().getValue() + "px";
                mapIcon.setAttribute("title", "Show map of " + location.getLabel());
                mapLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.locationInGoogleMap,
                    location, this.browserWin), false);
                vyho.lib.Utilities.hover(mapLink, mapIcon, "1px solid blue", "1px solid white", null, null);

                textNode = vyho.lib.Utilities.newText("  ", subject);

                var driveToLink = vyho.lib.Utilities.addNew("a", subject);
                driveToLink.href = "";
                var directionIcon = vyho.lib.Utilities.addNew("img", driveToLink);
                directionIcon.src = vyho.lib.Resources.directionIcon;
                directionIcon.style.width = this.preferences.getButtonIconSize().getValue() + "px";
                directionIcon.setAttribute("title", "Drive to " + location.getLabel());
                driveToLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showDriveToInGoogleMap,
                    location, null), false);
                vyho.lib.Utilities.hover(driveToLink, directionIcon, "1px solid blue", "1px solid white", null, null);
            }
            
            vyho.lib.Utilities.addNew("br", detailArea);
            vyho.lib.Utilities.addNew("br", detailArea);

            var div = vyho.lib.Utilities.addNew("div", detailArea);
            //detailArea.setAttribute("style", "width: auto;");
            div.setAttribute("style", "word-wrap: break-word;");
                        
            //div.style.marginBottom = "5px";
            //div.style.paddingBottom = "5px";
            
            //div.setAttribute("style", "word-wrap: break-word; margin-bottom: 2px !important; padding-bottom: 2px !important;");
            
            var parsedNodes = null;
            if (this.preferences.getEnableHtmlInDetailsArea().getValue()) {
                parsedNodes = this.parseText(detailText);
                if (parsedNodes != null) {
                    this.renderHtmlNodes(parsedNodes, div, doc, 0);
                }
            }
            
            if (parsedNodes == null) {
                var textList = this.parseSimpleText(detailText);
                
                for (var i = 0; i < textList.length; i++) {
                    textNode = vyho.lib.Utilities.newText(textList[i], div);
                    //if (i < textList.length - 1) {
                    vyho.lib.Utilities.addNew("br", div);
                //}
                }
                textNode = vyho.lib.Utilities.newText("_._", div);
            }
            
            if (this.preferences.getShowImagesInDetails().getValue()) {
                var table = doc.createElement("table");
                table.setAttribute("style", "width: 100%; padding: 3px !important;");
                var td;
                var tr;
                div.appendChild(table);
                var imagesPerRow = this.preferences.getEmbedImagesPerRow().getValue();
                ;
                var imageHeight = this.preferences.getEmbedImageHeight().getValue();
                var count = 0;
                if (typeof images == "undefined" || images == null) {
                    images = [];
                }
                while (count < images.length) {
                    tr = doc.createElement("tr");
                    table.appendChild(tr);
                    for (var j = 0; j < imagesPerRow; j++) {
                        if (count >= images.length) {
                            break;
                        }
                        td = doc.createElement("td");
                        td.setAttribute("style", "padding: 3px !important;");
                        tr.appendChild(td);
                        var img = doc.createElement("img");
                        img.setAttribute("src", images[count]);
                        img.setAttribute("style", "height: " + imageHeight + "px");
                        td.appendChild(img);
                        count++;
                    }
                }
            }
            
            /*
            if (this.firstShown) {
                this.firstShown = false;
                if (this.stickyMode || this.stickyMode == "true") {
                    this.setStickyMode();
                }
            }
            */
            if (this.stickyMode || this.stickyMode == "true") {
                this.layout.setEnabled(false);
                if (this.stickyWindow != this.infoWindow) {
                    if (this.stickyWindow != null) {
                        this.stickyWindow.setVisible(false);
                    }
                }
                this.stickyWindow = this.infoWindow;
                this.stickyWindow.setVisible(true);
                this.stickyWindow.requestFocus();
                this.layout.setEnabled(true);
            } else {
                this.infoWindow.setVisible(true);
                //this.infoWindow.setTransparent(1);
                this.infoWindow.requestFocus();
            }
        }
        
        this.supportedKeys = new vyho.lib.HashMap();
        this.supportedKeys.put("div", "div");
        this.supportedKeys.put("table", "table");
        this.supportedKeys.put("tbody", "tbody");
        this.supportedKeys.put("tr", "tr");
        this.supportedKeys.put("td", "td");
        this.supportedKeys.put("img", "img");
        this.supportedKeys.put("src", "src");
        this.supportedKeys.put("a", "a");
        this.supportedKeys.put("href", "href");
        this.supportedKeys.put("style", "style");
        this.supportedKeys.put("width", "width");
        this.supportedKeys.put("height", "height");
        this.supportedKeys.put("border", "border");
        this.supportedKeys.put("li", "li");
        this.supportedKeys.put("ul", "ul");
        this.supportedKeys.put("ol", "ol");
        this.supportedKeys.put("br", "br");
        this.supportedKeys.put("rel", "rel");
        this.supportedKeys.put("font", "font");
        this.supportedKeys.put("size", "size");
        this.supportedKeys.put("color", "color");
        this.supportedKeys.put("align", "align");
        this.supportedKeys.put("cellpadding", "cellpadding");
        this.supportedKeys.put("cellspacing", "cellspacing");
        this.supportedKeys.put("bgcolor", "bgcolor");
        this.supportedKeys.put("valign", "valign");
        this.supportedKeys.put("alt", "alt");
        this.supportedKeys.put("strong", "strong");
        this.supportedKeys.put("colspan", "colspan");
        this.supportedKeys.put("rowspan", "rowspan");
        this.supportedKeys.put("p", "p");
        this.supportedKeys.put("span", "span");
        this.supportedKeys.put("face", "face");
        this.supportedKeys.put("i", "i");
        this.supportedKeys.put("hr", "hr");
        this.supportedKeys.put("b", "b");
        this.supportedKeys.put("noshade", "noshade");
        this.supportedKeys.put("center", "center");
        this.supportedKeys.put("background", "background");
        this.supportedKeys.put("th", "th");
        this.supportedKeys.put("clear", "clear");
        this.supportedKeys.put("h1", "h1");
        this.supportedKeys.put("h2", "h2");
        this.supportedKeys.put("h3", "h3");
        this.supportedKeys.put("h4", "h4");
        this.supportedKeys.put("u", "u");
        this.supportedKeys.put("big", "big");
        this.supportedKeys.put("small", "small");
        
        this.renderHtmlNodes = function(node, container, doc, counter) {
            counter++;
            if (counter > 10000) {
                return counter;
            }
            if (node == null || typeof node == "undefined") {
                return counter;
            }
            var i;
            var attrValue;
            if (this.supportedKeys.contains(node.nodeName)) {
                //create the HTML node
                var con = vyho.lib.Utilities.addNew(node.nodeName, container);
                container = con;
                //assign attributes
                if (typeof node.attributes != "undefined") {
                    for (i = 0; i < node.attributes.length; i++) {
                        if (this.supportedKeys.contains(node.attributes[i].name)) {
                            attrValue = node.attributes[i].value;
                            if (typeof attrValue == "undefined") {
                                attrValue = node.attributes[i].name;
                            }
                            //if (node.attributes[i].name == "width" && attrValue.indexOf("%") >= 0) {
                                
                            //} else if (node.attributes[i].name == "height" && attrValue.indexOf("%") >= 0) {
                                
                            //} else {
                            container.setAttribute(this.supportedKeys.get(node.attributes[i].name), vyho.lib.Utilities.parseEntity(attrValue));
                        //}
                        } else {
                            vyho.lib.parser.log("not supported attr: " + node.attributes[i].name);
                        }
                    }
                }
                if (node.nodeName == "a") {
                    container.setAttribute("target", "_blank");
                }
                if (node.nodeName == "li") {
                    container.className = "liCssStyle";
                }
                if (node.nodeName == "ul") {
                    container.setAttribute("style", "padding-left: 5px !important; margin-left: 5px !important;");
                }
            } else if (node.type == "text") {
                var text = node.text;
                if (!vyho.lib.Utilities.isEmpty(text)) {
                    if (this.preferences.getConvertTextToLowerCase().getValue()) {
                        text = this.toLowerCase(text);
                    }
                    vyho.lib.Utilities.newText(vyho.lib.Utilities.parseEntity(text), container);
                }
            } else {
                if (node.nodeName != "rootNode") vyho.lib.parser.log("not supported node: " + node.nodeName);
            }
            if (typeof node.childNodes != "undefined") {
                for (i = 0; i < node.childNodes.length; i++) {
                    counter = this.renderHtmlNodes(node.childNodes[i], container, doc, counter);
                }
            }
            return counter;
        }
        
        this.parseText = function(htmlText) {
            try {
                
                var escapedText = htmlText.replace(/(<\/br[^>]*?)>/gi, "", "gim");
                escapedText = htmlText.replace(/(<br[^>]*?([^\/]?))>/gi, "$1 />", "gim");
                escapedText = escapedText.replace(/(<\/hr[^>]*?)>/gi, "", "gim"); 
                escapedText = escapedText.replace(/(<hr[^>]*?([^\/]?))>/gi, "$1 />", "gim"); 
                escapedText = escapedText.replace(/(<\/img[^>]*?)>/gi, "", "gim");
                escapedText = escapedText.replace(/(<img[^>]*?([^\/]))>/gi, "$1 />", "gim");
                escapedText = escapedText.replace(/<!-- ([^>]+)>/gi, "", "gim"); 
                
                var res = vyho.lib.parser.parse(escapedText);
            } catch (err) {
                throw err;
            //return null;
            }
            
            return res;
        }
        
        this.parseSimpleText = function(htmlText) {
            var res = new Array();
            var escapedText = htmlText.replace("\u000a", "", "gim");    //zap new lines
            
            escapedText = escapedText.replace("<br>", "\u000a", "gim");
            escapedText = escapedText.replace("<p>", "\u000a\u000a", "gim");
            escapedText = escapedText.replace("<li>", "\u000a  *    ", "gim");
            
            escapedText = this.removeTags(escapedText);
            
            if (this.preferences.getConvertTextToLowerCase().getValue()) {
                escapedText = this.toLowerCase(escapedText);
            }
            
            res = escapedText.split("\u000a");
            
            return res;
        }
        
        this.toLowerCase = function(text) {
            var regx = /([A-Z]{2,})/g;
            text = text.replace(regx, function(match, param1) {
                return param1.toLowerCase();
            });
            return text;
        }

        this.locationInGoogleMap = function(evt, location, param2) {
            var address;
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            try {
                var loc = "";
                if (location.type == "name" || location.type == "address") {
                    loc = location.address;
                } else if (location.type == "geoCoordinate") {
                    loc = location.latitude + "," + location.longitude;
                }
                if (this.preferences.getUseEmbeddedMapWindow().getValue()) {
                    address = "http://maps.google.com/maps?f=q&hl=en&geocode=&output=embed&q=" + escape(loc);
                    this.googleMap.setVisible(true);
                    vyho.lib.Utilities.removeAllChildren(this.googleMap.contentArea);
                    var frame = vyho.lib.Utilities.addNew("iframe", this.googleMap.contentArea);
                    frame.setAttribute("height", "100%");
                    frame.setAttribute("scrolling", "no");
                    frame.setAttribute("marginheight", "0");
                    frame.setAttribute("marginwidth", "0");
                    frame.setAttribute("frameborder", "0");
                    frame.setAttribute("type", "content");
                    frame.setAttribute("style", "overflow: hidden; padding: 0px; inset: 0px; margin: 0px; width: 100%");
                    frame.setAttribute("src", address);

                    this.googleMap.requestFocus();
                } else {
                    address = "http://maps.google.com/maps?f=q&hl=en&geocode=&q=" + escape(loc);
                    this.browserWin.open(address, "googleMap");
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }
        }
        
        this.unHideEntry = function(evt, postId, data) {
            var entry = data[0];
            var link = data[1];
            var newNodeBefore = data[2];
            var lastNode = data[3];
            if (this.spamMap.contains(postId)) {
                alert("You cannot unhide an entry marked as spam.  You can mark favorite.");
                return;
            }
            
            if (entry) {
                vyho.lib.Utilities.removeClass(entry, "hiddenEntry");
                vyho.lib.Utilities.removeNode(data[4]);
                //replace the icon
                var params = [entry, link, newNodeBefore, lastNode];
                var hideLink = this.addPostAction(lastNode, vyho.lib.Resources.hideIcon,
                    "Hide post",
                    vyho.lib.Utilities.runWith(this, this.hideEntry, postId, params),
                    null,
                    newNodeBefore)[0];
                params[4] = hideLink;
            }
            this.hideMap.remove(postId);
            for (var i = this.hideList.length - 1; i >= 0; i--) {
                if (this.hideList[i] == postId) {
                    this.hideList.splice(i, 1);
                }
            }
            this.saveHideList();
        }
        
        this.hideEntry = function(evt, postId, data) {
            var entry = data[0];
            var link = data[1];
            var newNodeBefore = data[2];
            var lastNode = data[3];
            
            vyho.lib.Utilities.removeNode(data[4]);
            if (entry) {
                vyho.lib.Utilities.addClass(entry, "hiddenEntry");
                
                var params = [entry, link, newNodeBefore, lastNode];
                var hideLink = this.addPostAction(lastNode, vyho.lib.Resources.unHideIcon,
                    "Unhide post",
                    vyho.lib.Utilities.runWith(this, this.unHideEntry, postId, params),
                    null,
                    newNodeBefore)[0];
                params[4] = hideLink;
                
            }
            
            this.trimList(this.hideList, this.hideMap, 1, this.MAX_HIDE_ENTRIES);
            this.hideMap.put(postId, ".");
            this.hideList[this.hideList.length] = postId;
            this.saveHideList();
        }

        this.trimList = function(list, map, extra, max, trimEnd) {
            var diff = list.length + extra - max;
            var ids;
            if (diff > 0) {
                if (trimEnd) {
                    ids = list.splice(list.length - diff, diff);
                } else {
                    ids = list.splice(0, diff);
                }
                for (var id in ids) {
                    map.remove(id);
                }
            }
        }
        
        this.deleteFavorite = function(evt, postId, data) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            var entry = data[0];
            var subject = data[1];
            
            if (this.preferences.getConfirmOnFavDelete().getValue()) {
                var ans = confirm("Are you sure you want to remove \n\"" + subject + "\"\n from favorite?");
                if (!ans) return;
            }
            entry.setAttribute("style", "display: none;");

            if (this.favMap.contains(postId) == false) {
                return;
            }
            
            this.favMap.remove(postId);
            for (var i = this.favList.length - 1; i >= 0; i--) {
                if (this.favList[i].postId == postId) {
                    this.favList.splice(i, 1);
                    break;
                }
            }
            this.saveFavList();
        }
        
        this.markFav = function(evt, postId, data) {
            //vyho.lib.Resources.markFav
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            var favIcon = data[1];
            var entry = data[0];
            var subject = data[2];
            if (this.favMap.contains(postId)) {
                return;
            }
            favIcon.src = vyho.lib.Resources.markedFavIcon;
            favIcon.setAttribute("title", "Marked Favorite");
            this.trimList(this.favList, this.favMap, 1, this.MAX_FAV_ENTRIES);
            this.favMap.put(postId, ".");
            var fav = {};
            fav.postId = postId;
            fav.subject = subject;
            fav.url = data[3];
            this.favList[this.favList.length] = fav;
            this.saveFavList();
        }

        this.markSpam = function(evt, postId, data) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            var entry = data[0];
            
            var markSpamLink = "";
            if (this.spamMap.contains(postId)) {
                return;
            }

            markSpamLink = "http://washingtondc.craigslist.org/flag/?flagCode=15&postingID=" + postId;
            var spamFrame = vyho.lib.Utilities.$("spamFrameId", this.browserWin.document);
            if (!spamFrame) {
                spamFrame = vyho.lib.Utilities.addNew("iframe", entry);
                spamFrame.setAttribute("id", "spamFrameId");
                spamFrame.setAttribute("width", "1px");
                spamFrame.setAttribute("height", "1px");
                spamFrame.setAttribute("scrolling", "no");
                spamFrame.setAttribute("marginheight", "0");
                spamFrame.setAttribute("marginwidth", "0");
                spamFrame.setAttribute("frameborder", "0");

                spamFrame.setAttribute("type", "content");
                spamFrame.setAttribute("src", markSpamLink);
            } else {
                spamFrame.setAttribute("src", markSpamLink);
            }
            if (entry) {
                vyho.lib.Utilities.addClass(entry, "markedSpam");
            }
            //put in the date
            this.trimList(this.spamList, this.spamMap, 1, this.MAX_SPAM_ENTRIES);
            this.spamMap.put(postId, ".");
            this.spamList[this.spamList.length] = postId;
            this.saveSpamList();
        //vyho.lib.Utilities.pref_setValue("craigslist_fusion_spam_" + postId, ".");
        }

        this.showMapWindow = function(evt, param1, param2) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            this.googleMap.setVisible(true);
            this.googleMap.requestFocus();
            if (this.googleMap.contentArea.childNodes.length == 0) {
                var myLocation = this.preferences.getMyAddress().getValue();
                if (myLocation == null || myLocation == "") {
                    myLocation = "Did you forget to set your location in the preference?"
                }
                this.locationInGoogleMap(evt, myLocation, null);
            }
        }

        this.showDriveToInGoogleMap = function(evt, toLocation, fromLocation) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            
            if (fromLocation == null || typeof fromLocation == "undefined") {
                var myLocation = this.preferences.getMyAddress().getValue();

                if (myLocation == null || myLocation == "") {
                    alert("Please set your location in the \"Preferences\" or allow Share location request.");
                    //myLocation = "Did you forget to set your location in the preference?"
                    var me = this;
                    navigator.geolocation.getCurrentPosition(function(position) {
                        fromLocation = position.coords.latitude + "," + position.coords.longitude;
                        me.preferences.getMyAddress().setValue(fromLocation);
                        me.showDriveToInGoogleMap(evt, toLocation, fromLocation);
                        return;
                    }, function(error) {
                        switch(error.code) 
                        {
                            case error.PERMISSION_DENIED:
                                alert("User denied the request for Geolocation.");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                alert("Location information is unavailable.");
                                break;
                            case error.TIMEOUT:
                                alert("The request to get user location timed out.");
                                break;
                            case error.UNKNOWN_ERROR:
                                alert("An unknown error occurred.");
                                break;
                        }
                    });
                    return;
                }
                
                myLocation = escape(myLocation);
                fromLocation = myLocation;
            }
        
            var address;
            try {
                var location = toLocation;
                var loc = "";
                if (location.type == "name" || location.type == "address") {
                    loc = location.address;
                } else if (location.type == "geoCoordinate") {
                    loc = location.latitude + "," + location.longitude;
                }
                /*
                if (vyho.lib.Utilities.isEmpty(toLocation[1], false) == false) {
                    var modLoc = vyho.lib.Utilities.trimText(toLocation[1].toLowerCase());
                    if (toLocation[0].toLowerCase().indexOf(modLoc) < 0) {
                        modLoc = modLoc.replace(" at ", " and ");
                        if (toLocation[0].toLowerCase().indexOf(modLoc) < 0) {
                            location = modLoc + ", " + toLocation[0];
                        }
                    }
                }*/
                if (this.preferences.getUseEmbeddedMapWindow().getValue()) {
                    address = "http://maps.google.com/maps?output=embed&saddr=" + fromLocation + "&daddr=" + escape(loc);
                    this.googleMap.setVisible(true);
                    vyho.lib.Utilities.removeAllChildren(this.googleMap.contentArea);
                    var frame = vyho.lib.Utilities.addNew("iframe", this.googleMap.contentArea);
                    frame.setAttribute("height", "100%");
                    frame.setAttribute("scrolling", "no");
                    frame.setAttribute("marginheight", "0");
                    frame.setAttribute("marginwidth", "0");
                    frame.setAttribute("frameborder", "0");
                    frame.setAttribute("type", "content");
                    frame.setAttribute("style", "overflow: hidden; padding: 0px; inset: 0px; margin: 0px; width: 100%");
                    frame.setAttribute("src", address);
                    this.googleMap.requestFocus();
                } else {
                    address = "http://maps.google.com/maps?saddr=" + escape(fromLocation) + "&daddr=" + escape(loc);
                    this.browserWin.open(address, "googleMap");
                }
            } catch (err) {
                vyho.lib.Utilities.notify(err);
            }

        }

        this.getEmailTemplate = function(templateName) {
            var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
            var emailTemplates;
            var serializer;
            serializer = new vyho.lib.Serializer();
            emailTemplates = serializer.decode(emailTemplateData);
            var i = 0;
            var template = null;
            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                if (template[0] == templateName) {
                    return template;
                }
            }
            return null;
        }
        
        this.composeEmailUrl = function(emailInfo, bccOnly, templateName) {
            var emailServer = this.preferences.getWebMailServer().getValue();
            var bcEmail = this.preferences.getBcEmail().getValue();
            var body = "";

            var template = this.getEmailTemplate(templateName);
            if (template != null) {
                body = template[1];
            }
            
            if (emailServer != "Custom") {
                var config = this.preferences.getEmailServerConfig(emailServer);
                if (config == null) {
                    console.log("Null config for email server: " + emailServer);
                    return null; //should not be null
                }
                var separator = "&";
                
                var encoder = config.encoder;
                if (typeof encoder == "undefined" || encoder == null) {
                    encoder = vyho.lib.Utilities.escapeUrl;
                }
                
                var subjEncoder = config.subjEncoder;
                if (typeof subjEncoder == "undefined" || subjEncoder == null) {
                    subjEncoder = vyho.lib.Utilities.escapeUrl;
                }
                var url = config.url;
                if (bccOnly == false || bcEmail == "" || bcEmail == null) {
                    if (emailServer == "MailTo") {
                        url += encoder.call(this, emailInfo.getEmailAddress()) + "?";
                    } else {
                        url += config.to + "=" + encoder.call(this, emailInfo.getEmailAddress()) + separator;
                    }
                    
                    if (config.bcc != null && (bcEmail != null && bcEmail != "")) {
                        url += config.bcc + "=" + encoder.call(this, bcEmail) + separator;
                    }
                } else {
                    if (config.bcc != null && (bcEmail != null && bcEmail != "")) {
                        if (emailServer == "MailTo") {
                            url += encoder.call(this, bcEmail) + separator;
                        } else {
                            url += config.to + "=" + encoder.call(this, bcEmail) + separator;
                        }
                    } else {
                        return null;
                    }
                }
                if (config.subject != null) {
                    url += config.subject + "=" + subjEncoder.call(this, emailInfo.getSubject()) + separator;    //todo: escape needed
                }
                if (config.body != null) {
                    url += config.body + "=" + encoder.call(this,body + "\n\n\n" + emailInfo.url) + separator;
                }
                if (config.rand != null && typeof config.rand != "undefined") {
                    url += config.rand + "=" + vyho.lib.Utilities.rand(5);
                }
                return url;
            } else {
                return null;
            }
        }
        
        this.openComposeEmailClient = function(emailInfo, templateName) {
            /*
            var address = "https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&to=";
            address += vyho.lib.Utilities.escapeUrl(emailInfo.address);

            var body = "";

            var template = this.getEmailTemplate(templateName);
            if (template != null) {
                body = template[1];
            }

            address += "&body=" + vyho.lib.Utilities.escapeUrl(body + "\n\n\n" + emailInfo.url);
            address += "&su=" + emailInfo.getSubject();
            address += "&shva=1";

            var bcEmail = this.preferences.getBcEmail().getValue();
            if (bcEmail != null && bcEmail != "") {
                address += "&bcc=" + vyho.lib.Utilities.escapeUrl(bcEmail);
            }
            */
            var address = this.composeEmailUrl(emailInfo, false, templateName);
            if (address == null) return;
            if (this.preferences.getWebMailServer().getValue()  == "MailTo") {
                //create an "a" node, and click on it
                var a;
                a = this.browserWin.document.getElementById("mailtoEmailLink");
                if (!a) {
                    a = vyho.lib.Utilities.addNew("a", this.browserWin.document.body);
                    a.target = "_blank";
                    a.setAttribute("id", "mailtoEmailLink");
                }
                a.href = address;
                a.click();
            } else {
                var win = this.browserWin.open(address, "email" + vyho.lib.Utilities.rand(10));
            }
        }

        this.showEmailEditor = function(evt, emailInfo, infos) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }

            var postId = infos[0];
            var link = infos[1];
            this.trimList(this.emailedList, this.emailedMap, 1, this.MAX_EMAILED_ENTRIES);
            this.emailedMap.put(postId, ".");
            this.emailedList[this.emailedList.length] = postId;
            this.saveEmailedList();

            var space = vyho.lib.Utilities.newTextAfter("  ", link);
            var emailIcon = vyho.lib.Utilities.addNewAfter("img", space);
            emailIcon.src = vyho.lib.Resources.emailIcon;
            emailIcon.style.width = this.preferences.getButtonIconSize().getValue() + "px";
            emailIcon.setAttribute("title", "Email sent");

            var templateSel = vyho.lib.Utilities.$("templateListId", this.browserWin.document);
            var templateName = templateSel.value;
            
            if (emailInfo.isReady()) {
                this.openComposeEmailClient(emailInfo, templateName);
            } else {
                emailInfo.processEmail(this, this.openComposeEmailClient, emailInfo, templateName);
            }
            
        //    }
        }

        this.stickyModeMouseMoveListener = null;
        this.stickyModeMouseClickListener = null;
        this.lastPreviewX = 0;
        this.lastPreviewY = 0;

        this.setStickyMode = function(evt, param1, param2) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }

            this.stickyMode = true;

            this.lastPreviewX  = this.previewWindow.getLeft();
            this.lastPreviewY = this.previewWindow.getTop();
            this.lastPostDetailX  = this.infoWindow.getLeft();
            this.lastPostDetailY = this.infoWindow.getTop();

            if (this.stickyModeMouseMoveListener != null) {
                this.browserWin.document.removeEventListener("mousemove", this.stickyModeMouseMoveListener, false);
            }
            this.stickyModeMouseMoveListener = vyho.lib.Utilities.runWith(this, this.onStickyModeMouseMove, this.browserWin, "");
            this.browserWin.document.addEventListener("mousemove", this.stickyModeMouseMoveListener , false);
            if (this.stickyModeMouseClickListener != null) {
                this.browserWin.document.removeEventListener("click", this.stickyModeMouseClickListener, false);
            }
            this.stickyModeMouseClickListener =  vyho.lib.Utilities.runWith(this, this.onStickyModeMouseClick, this.browserWin, "");
            this.browserWin.document.addEventListener("click", this.stickyModeMouseClickListener , false);

            this.stickyWindow = null;
        }

        this.onStickyModeMouseClick = function(evt, param1, param2) {
            if (this.stickyMode || this.stickyMode == "true") {
                this.stickyMode = false;
                if (this.stickyModeMouseMoveListener != null) {
                    this.browserWin.document.removeEventListener("mousemove", this.stickyModeMouseMoveListener, false);
                }
                this.stickyWindow = null;
                this.stickyModeMouseMoveListener = null;
                this.previewWindow.setTop(this.lastPreviewY);
                this.previewWindow.setLeft(this.lastPreviewX);
                this.previewWindow.setVisible(true);
                this.infoWindow.setTop(this.lastPostDetailY);
                this.infoWindow.setLeft(this.lastPostDetailX);
                this.infoWindow.setVisible(true);
                this.layout.doLayout();
            }
        }

        this.onStickyModeMouseMove = function(evt, param1, param2) {
            var x = evt.pageX;
            var y = evt.pageY;
            if (evt != null) {


                evt.preventDefault();
                evt.stopPropagation();
            }

            if (this.stickyMode == false || this.stickyMode == "false") {
                return;
            }
            if (this.stickyWindow == null) {
                return
            }

            var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);

            var offsetX = this.browserWin.pageXOffset;
            var offsetY = this.browserWin.pageYOffset;
            var top = (y - offsetY - this.stickyWindow.getHeight()/2);
            if (top < 0) {
                top = 0;
            }
            if (top + this.stickyWindow.getHeight() > dim[1]) {
                top = dim[1] - this.stickyWindow.getHeight();
            }
            this.stickyWindow.setTop(top);
            this.stickyWindow.setLeft(x - offsetX + 100);
        }

        this.showPreference = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();
            this.showPreferences(evt);
            return false;
        }

        this.showEmailTemplates = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();
            this.editEmailTemplate();
            return false;
        }

        this.grabOffsetX = 0;
        this.grabOffsetY = 0;

        this.toggleScale = function(evt, param1, param2) {
            if (evt != null) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            var prevImage = vyho.lib.Utilities.$("prevImageId", this.browserWin.document);
            if (!prevImage) {
                return false;
            }

            var previewScaling = this.preferences.getScalePreviewImage().getValue();

            previewScaling = !previewScaling;

            this.preferences.getScalePreviewImage().setValue(previewScaling);

            if (previewScaling) {
                prevImage.style.height = this.previewWindow.contentArea.clientHeight + "px";
                if (!this.preferences.getKeepAspectRatio().getValue()) {
                    prevImage.style.width = this.previewWindow.contentArea.clientWidth + "px";
                } else {
                    if (prevImage.offsetWidth > this.previewWindow.contentArea.clientWidth) {
                        prevImage.style.height = null;
                        prevImage.style.width = this.previewWindow.contentArea.clientWidth + "px";
                    } else {
                        prevImage.style.width = null;
                    }
                }
            } else {
                prevImage.style.width = null;
                prevImage.style.height = null;
            }

            return false;
        }

        this.updateImageSizes = function() {
            var imgs = this.browserWin.document.getElementsByTagName("img");
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                if (img.className != this.THUMBNAIL_IMAGE) continue;
                if (!this.preferences.getKeepAspectRatio().getValue()) {
                    img.style.maxWidth = this.size + "px";
                }
                img.style.maxHeight = this.size + "px";
            }
        }

        this.printObj = function(obj) {
            for (var a in obj) {
                vyho.lib.Utilities.notify("" + a + " : " + obj[a]);
            }
        }

        this.editEmailTemplate = function() {
            var ans = this.confirmOnce("Please close the email template manager window as soon as possible after edit.\nIf not, your information may be at risk.", "TEMPLATE_EDIT_CAUTION");
            if (!ans) {
                return;
            }

            var contentArea = this.templateWindow.contentArea;
            vyho.lib.Utilities.removeAllChildren(contentArea);
            
            var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
            var emailTemplates;
            var serializer;
            serializer = new vyho.lib.Serializer();
            emailTemplates = serializer.decode(emailTemplateData);
            var i = 0;

            var template = null;

            vyho.lib.Utilities.addNew("br", contentArea);
            vyho.lib.Utilities.addNew("br", contentArea);
            
            var table = vyho.lib.Utilities.addNew("table", contentArea);
            table.setAttribute("width", "100%");
            table.setAttribute("border", "0");
            var tr = vyho.lib.Utilities.addNew("tr", table);
            var td = vyho.lib.Utilities.addNew("td", tr);
            var label = vyho.lib.Utilities.addNew("label",td);
            vyho.lib.Utilities.newText("Edit templates:", label);
            td = vyho.lib.Utilities.addNew("td", tr);
            var emailTemplateList = vyho.lib.Utilities.addNew("select", td);
            emailTemplateList.setAttribute("id", "emailTemplateListId");
            label.setAttribute("for", "emailTemplateListId");
            var option = new Option("", "");
            emailTemplateList.appendChild(option);
            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                option = new Option(template[0], template[0]);
                emailTemplateList.appendChild(option);
            }
            vyho.lib.Utilities.newText("      ", td);
            var deleteTemplateBtn = vyho.lib.Utilities.addNew("input", td);
            deleteTemplateBtn.setAttribute("type", "button");
            deleteTemplateBtn.setAttribute("value", "Delete");
            deleteTemplateBtn.setAttribute("id", "deleteTemplateId");
            
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            label = vyho.lib.Utilities.addNew("label",td);
            vyho.lib.Utilities.newText("Template name:", label);
            td = vyho.lib.Utilities.addNew("td", tr);
            var input = vyho.lib.Utilities.addNew("input", td);
            input.setAttribute("id", "emailTemplateNameId");
            label.setAttribute("for", "emailTemplateNameId");
            input.setAttribute("size", "40");
            
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            label = vyho.lib.Utilities.addNew("label",td);
            vyho.lib.Utilities.newText("Email body:", label);
            td = vyho.lib.Utilities.addNew("td", tr);
            var textarea = vyho.lib.Utilities.addNew("textarea", td);
            textarea.setAttribute("id", "emailContentId");
            label.setAttribute("for", "emailContentId");
            textarea.setAttribute("rows", "5");
            textarea.setAttribute("cols", "60");
            //
            //regular expression to use if matched.  Empty to match all
            //text += "<tr><td>Match text for the template:</td><td><input id=\"emailTemplateRegexId\" value=\"*\" size=\"40\"/></td></tr>";
            //show Add, Update, Cancel buttons
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            
            
            tr = vyho.lib.Utilities.addNew("tr", table);
            td = vyho.lib.Utilities.addNew("td", tr);
            td = vyho.lib.Utilities.addNew("td", tr);
            var editTemplateBtn = vyho.lib.Utilities.addNew("input", td);
            editTemplateBtn.setAttribute("type", "button");
            editTemplateBtn.setAttribute("value", "Save");
            editTemplateBtn.setAttribute("id", "editTemplateOkId");

            this.templateWindow.setVisible(true);
            this.templateWindow.requestFocus();

            editTemplateBtn.addEventListener("click", vyho.lib.Utilities.runWith(this, this.editTemplateOk, "", ""), false);
            deleteTemplateBtn.addEventListener("click", vyho.lib.Utilities.runWith(this, this.deleteTemplate, "", ""), false);
            emailTemplateList.addEventListener("click", vyho.lib.Utilities.runWith(this, this.editSelectedTemplate, "", ""), false);
        }

        this.editSelectedTemplate = function(evt, param1, param2) {
            var templateName = vyho.lib.Utilities.$("emailTemplateListId", this.browserWin.document).value;
            if (templateName == null || templateName == "") {
                return;
            }
            var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
            var emailTemplates;
            var serializer;
            serializer = new vyho.lib.Serializer();
            emailTemplates = serializer.decode(emailTemplateData);
            var i = 0;
            var template = null;
            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                if (template[0] == templateName) {
                    break;
                } else {
                    template = null;
                }
            }
            if (template != null) {
                vyho.lib.Utilities.$("emailTemplateNameId", this.browserWin.document).value = template[0];
                vyho.lib.Utilities.$("emailContentId", this.browserWin.document).value = template[1];
            //vyho.lib.Utilities.$("emailTemplateRegexId", this.browserWin.document).value = template[2];
            }
        }

        this.updateTemplateList = function(emailTemplates) {
            var templateSel = vyho.lib.Utilities.$("emailTemplateListId", this.browserWin.document);
            var i = 0;
            var template = null;
            for (i = templateSel.length -1; i > 0; i--) {
                templateSel.remove(i);
            }

            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                var opt = this.browserWin.document.createElement("option");
                opt.text = template[0];
                opt.value = template[0];
                templateSel.add(opt, null);
            }
        }

        this.editTemplateOk = function (evt, param1, param) {
            var name = vyho.lib.Utilities.$("emailTemplateNameId", this.browserWin.document).value;
            var emailBody = vyho.lib.Utilities.$("emailContentId", this.browserWin.document).value;
            var regex = null;
            //regex = vyho.lib.Utilities.$("emailTemplateRegexId", this.browserWin.document).value;
            if (name == "" || name == null) {    //@todo: trim it first here
                alert("The name must not be empty.");

                return;
            }
            if (emailBody == "" || emailBody == null) {    //@todo: trim it first here
                alert("The email content must not be empty.");
                return;
            }
            var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
            var emailTemplates;
            var serializer;
            serializer = new vyho.lib.Serializer();
            emailTemplates = serializer.decode(emailTemplateData);
            var i = 0;
            var template = null;
            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                if (template[0] == name) {
                    break;
                } else {
                    template = null;
                }
            }
            if (template == null) {
                template = new Array(name, emailBody, regex);
                emailTemplates.unshift(template);    //insert at index of 0
            } else {
                template[0] = name;
                template[1] = emailBody;
                template[2] = regex;
            }
            emailTemplateData = serializer.encode(emailTemplates);
            vyho.lib.Utilities.pref_setValue("EMAIL_TEMPLATES", emailTemplateData);
            vyho.lib.Utilities.$("emailTemplateNameId", this.browserWin.document).value = "";
            //vyho.lib.Utilities.$("emailTemplateRegexId", this.browserWin.document).value = "";
            this.updateTemplateList(emailTemplates);
        }

        this.deleteTemplate = function(evt, param1, param2) {
            var templateName = vyho.lib.Utilities.$("emailTemplateListId", this.browserWin.document).value;
            if (templateName == null || templateName == "") {
                return;
            }
            var ans = confirm("Are you sure you want to delete template \"" + templateName + "\"?");
            if (!ans) {
                return;
            }
            var emailTemplateData = vyho.lib.Utilities.pref_getValue("EMAIL_TEMPLATES", "[]");
            var emailTemplates;
            var serializer;
            serializer = new vyho.lib.Serializer();
            emailTemplates = serializer.decode(emailTemplateData);
            var i = -1;
            var template = null;
            for (i = 0; i < emailTemplates.length; i++) {
                template = emailTemplates[i];
                if (template[0] == templateName) {
                    break;
                } else {
                    template = null;
                }
            }
            if (template != null && i >= 0) {
                emailTemplates.splice(i, 1);
                emailTemplateData = serializer.encode(emailTemplates);
                vyho.lib.Utilities.pref_setValue("EMAIL_TEMPLATES", emailTemplateData);
                this.updateTemplateList(emailTemplates);
            }
        }

        this.confirmOnce = function(mesg, confirmName) {
            var confirmed = vyho.lib.Utilities.pref_getValue(confirmName, false);
            if (confirmed) {
                return true;
            }
            var ans = confirm(mesg);
            if (!ans) {
                return false;
            }
            vyho.lib.Utilities.pref_setValue(confirmName, true);
            return true;
        }
        
        this.doFavExport = function(evt, favExpLink, favImpLink) {
            var text = this.exportFavList();
            
            /*
            var favExportWin = this.browserWin.open("about:blank","_blank","width=800,height=600,scrollbars=1,resizable=1,menubar=yes")
            
            var doc = favExportWin.document;
            doc.open();
            doc.writeln(text);
            //vyho.lib.Utilities.newText(text, doc);
            doc.close();
            */
           
            var expTextArea = this.browserWin.document.getElementById("expTextAreaId");
            var importExportInstruction = null;
            if (!expTextArea) {
                var br = vyho.lib.Utilities.addNewAfter("br", favImpLink);
                br = vyho.lib.Utilities.addNewAfter("br", br);
                importExportInstruction = vyho.lib.Utilities.addNewAfter("label", br);
                importExportInstruction.setAttribute("id", "importExportInstruction");
                br = vyho.lib.Utilities.addNewAfter("br", importExportInstruction);
                expTextArea = vyho.lib.Utilities.addNewAfter("textarea", br);
                expTextArea.setAttribute("style", "width: 600px; height: 300px;");
                expTextArea.setAttribute("id", "expTextAreaId");
                br = vyho.lib.Utilities.addNewAfter("br", expTextArea);
                br = vyho.lib.Utilities.addNewAfter("br", br);
            }
            if (importExportInstruction == null) {
                importExportInstruction = this.browserWin.document.getElementById("importExportInstruction");
            }
            vyho.lib.Utilities.removeAllChildren(importExportInstruction);
            vyho.lib.Utilities.newText("Please copy the following text and save into a text file.", 
                importExportInstruction);
                
            expTextArea.value = text;
            expTextArea.select();
        }
        
        this.showFavImport = function(evt, favExpLink, favImpLink) {
            var expTextArea = this.browserWin.document.getElementById("expTextAreaId");
            var importExportInstruction = null;
            if (!expTextArea) {
                var br = vyho.lib.Utilities.addNewAfter("br", favImpLink);
                br = vyho.lib.Utilities.addNewAfter("br", br);
                importExportInstruction = vyho.lib.Utilities.addNewAfter("label", br);
                importExportInstruction.setAttribute("id", "importExportInstruction");
                br = vyho.lib.Utilities.addNewAfter("br", importExportInstruction);
                expTextArea = vyho.lib.Utilities.addNewAfter("textarea", br);
                expTextArea.setAttribute("style", "width: 600px; height: 300px;");
                expTextArea.setAttribute("id", "expTextAreaId");
                br = vyho.lib.Utilities.addNewAfter("br", expTextArea);
                br = vyho.lib.Utilities.addNewAfter("br", br);
            }
           
            expTextArea.value = "";
           
            if (importExportInstruction == null) {
                importExportInstruction = this.browserWin.document.getElementById("importExportInstruction");
            }
           
            vyho.lib.Utilities.removeAllChildren(importExportInstruction);
            vyho.lib.Utilities.newText("Please paste favorite export text and click on the \"Import Favorites\" button.", 
                importExportInstruction);
           
            var importFavButton = this.browserWin.document.getElementById("importFavButton");
            if (!importFavButton) {
                importFavButton = vyho.lib.Utilities.addNewAfter("input", expTextArea);
                importFavButton.setAttribute("id", "importFavButton");
                importFavButton.setAttribute("type", "button");
                importFavButton.setAttribute("value", "Import Favorites");
                importFavButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.doFavImport, expTextArea, ""), false);
            }
        }
        
        this.doFavImport = function(evt, expTextArea, param2) {
            if (vyho.lib.Utilities.isEmpty(expTextArea.value, true)) {
                alert("There is no data to import.");
                return;
            }
            if (this.importFavList(expTextArea.value)) {
                alert("Import successfully.");
                this.showFavorites(evt, expTextArea, param2);
            }
        }
        
        this.removeExpiredFavorites = function(evt, param1, param2) {
            try {
                var i;
                for (i = this.favList.length - 1; i >= 0; i--) {
                    var fav = this.favList[i];
                    if (fav.obsolete == true) {
                        this.favList.splice(i, 1);
                        this.favMap.remove(fav.postId);
                    }
                }
                this.saveFavList();
                this.showFavorites(evt, param1, param2);
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to remove expired favorites.");
            }
        }
        
        this.removeAllFavorites = function(evt, param1, param2) {
            var answer = confirm("Are you sure you want to delete all favorites?");
            if (!answer) return;
            try {
                this.favList = [];
                this.favMap.clearAll();
                this.saveFavList();
                this.showFavorites(evt, param1, param2);
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to remove all favorites.");
            }
        }
        
        this.deleteBookmark = function(evt, url, param2) {
            try {
                if (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                var bm;
                for (var i = this.bookmarkList.length - 1; i > 0; i--) {
                    bm = this.bookmarkList[i];
                    if (bm.url == url) {
                        this.bookmarkList.splice(i, 1);
                        this.bookmarkMap.remove(url);
                    }
                }
                this.saveBookmarkList();
                this.showBookmarkWindow();
                
            } catch (error) {
                vyho.lib.Utilities.notify("Failed to delete bookmark: ", error);
            }
        }
        
        this.addBookmark = function(evt, auto, param2) {
            try {
                if (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                
                var url = this.browserWin.location.href;
                var title = this.browserWin.document.title;
                if (typeof title == "undefined" || title == null) {
                    title = url;
                }
                title = "" + title;
                //will never add book mark due to auto book mark on each page
                //if (this.bookmarkMap.contains(url)) {
                //    if (!auto) {
                //        return;
                //    }
                //}
                
                if (auto) {
                    if (this.bookmarkList.length > 0) {
                        var firstBookmark = this.bookmarkList[0];
                        if (firstBookmark.auto) {
                            this.bookmarkList.splice(0, 1);
                            this.bookmarkMap.remove(firstBookmark.url);
                        }
                    }
                } else {
                    auto = false;
                    var bm;
                    for (var i = this.bookmarkList.length - 1; i > 0; i--) {
                        bm = this.bookmarkList[i];
                        if (bm.url == url) {
                            this.bookmarkList.splice(i, 1);
                            this.bookmarkMap.remove(url);
                        }
                    }
                }
                
                this.trimList(this.bookmarkList, this.bookmarkMap, 1, this.MAX_BOOKMARK_ENTRIES, true);
                this.bookmarkMap.put(url, ".");
                var bookmark = {};
                var cl = " - craigslist";
                title = title.replace(cl, "");
                title = title.replace("classifieds", ""); 
                
                bookmark.subject = title;
                bookmark.url = url;
                bookmark.auto = auto;
                if (auto || this.bookmarkList.length == 0) {
                    this.bookmarkList.splice(0, 0, bookmark);
                } else {
                    this.bookmarkList.splice(1, 0, bookmark);
                }
                this.saveBookmarkList();
                if (!auto) {
                    alert("Done adding \"" + title + "\"");
                }
            //this.showBookmarks(contentArea, false, doc, "bookmarks");

            } catch (error) {
                vyho.lib.Utilities.notify("Failed to add bookmark: ", error);
            }
        }
        
        this.removeAllBookmarks = function(evt, param1, param2) {
            var answer = confirm("Are you sure you want to delete all bookmarks?");
            if (!answer) return;
            try {
                //todo: should clear auto or not?
                this.bookmarkList = [];
                this.bookmarkMap.clearAll();
                //add book mark again for auto?
                
                this.saveBookmarkList();
            //this.showBookmarks(contentArea, false, doc, "bookmarks");
            } catch (err) {
                vyho.lib.Utilities.notify("Failed to remove all bookmarks.");
            }
        }
        
        this.showBookmarkWindow = function(evt, param1, param2) {
            try {
                if (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
                this.bookmarkWindow.setVisible(true);
                this.bookmarkWindow.requestFocus();
                
                var contentArea = this.bookmarkWindow.contentArea;
                
                vyho.lib.Utilities.removeAllChildren(contentArea);
                
                //add a list
                if (this.bookmarkList.length == 0) {
                    return;
                }
                
                var bm;
                var bmDiv;
                var link;
                
                var bookmarkDiv = vyho.lib.Utilities.addNew("div", contentArea);
                for (var i = 0; i < this.bookmarkList.length; i++) {
                    bm = this.bookmarkList[i];
                    bmDiv = vyho.lib.Utilities.addNew("div", bookmarkDiv);
                    
                    link = vyho.lib.Utilities.addNew("a", bmDiv);
                    //link.setAttribute("style", "color: red;");
                    //vyho.lib.Utilities.newText("x", link);
                    var img = vyho.lib.Utilities.addNew("img", link);
                    img.setAttribute("src", vyho.lib.Resources.hideIcon);
                    link.href = "javascript:void()";
                    link.addEventListener("click", vyho.lib.Utilities.runWith(this, function(evt, url, param2) {
                        if (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                        
                        this.deleteBookmark(evt, url, null);
                    }, bm.url, ""), false);
                    
                    vyho.lib.Utilities.newText(" - ", bmDiv);
                    
                    link = vyho.lib.Utilities.addNew("a", bmDiv);
                    vyho.lib.Utilities.newText(bm.subject, link);
                    link.href = "javascript:void()";
                    link.addEventListener("click", vyho.lib.Utilities.runWith(this, function(evt, url, param2) {
                        if (evt) {
                            evt.preventDefault();
                            evt.stopPropagation();
                        }
                        
                        browserWin.location.href = url;
                    }, bm.url, ""), false);
                }
            } catch (error) {
                vyho.lib.Utilities.notify("Failed to render favorite: ", error);
            }
        }
        
        this.showFavorites = function(evt, param1, param2) {
            try {
                evt.preventDefault();
                evt.stopPropagation();
            
                var doc = this.browserWin.document;

                this.favWindow.setVisible(true);
                this.favWindow.requestFocus();
                
                var contentArea = this.favWindow.contentArea;
                this.renderFavorites(contentArea, false, doc, "favorite");

            } catch (error) {
                vyho.lib.Utilities.notify("Failed to render favorite: ", error);
            }
        }
        
        this.showPrintFavorites = function(evt, param1, param2) {
            /*
            var favPrintWin = this.browserWin.open("about:blank","_blank","width=800,height=600,scrollbars=1,resizable=1,menubar=yes")
            
            var doc = favPrintWin.document;
            doc.open();
            doc.write("<html><body id=\"vyho.lib.ui.window\"></body></html>");
            doc.close();
            var contentArea = vyho.lib.Utilities.addNew("div".body, doc);
            contentArea.setAttribute("style", "width: 100%;");
            this.renderFavorites(contentArea, true, doc, "favorite_print");
            //favPrintWin.print();
            */
           
            var body = vyho.lib.Utilities.findFirstItem("body", null, this.browserWin.document);
           
            var docNodes = body.childNodes;
            var childNodes = new Array();
            childNodes.push.apply(childNodes, docNodes);
            var i;
           
            for (i = 0; i < childNodes.length; i++) {
                vyho.lib.Utilities.addClass(childNodes[i], "hideClass");
            }
            vyho.lib.Utilities.removeClass(this.browserWin.document.body, "hideClass");
           
            var printButton = vyho.lib.Utilities.addNew("input", this.browserWin.document.body);
            printButton.setAttribute("value", "Print");
            printButton.setAttribute("type", "button");
            vyho.lib.Utilities.addClass(printButton, "mediaHideWhenPrint");
           
            var cancelButton = vyho.lib.Utilities.addNew("input", this.browserWin.document.body);
            cancelButton.setAttribute("value", "Cancel");
            cancelButton.setAttribute("type", "button");
            vyho.lib.Utilities.addClass(cancelButton, "mediaHideWhenPrint");
           
            var contentArea = vyho.lib.Utilities.addNew("div", this.browserWin.document.body);
            contentArea.setAttribute("style", "width: 100%;");
            this.renderFavorites(contentArea, true, this.browserWin.document, "favorite_print");
           
            printButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.printPage, [printButton, cancelButton, contentArea, childNodes], ""), false);
            cancelButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.closePrintPage, [printButton, cancelButton, contentArea, childNodes], ""), false);
           
        }
        
        this.printPage = function(evt, param1, param2) {
            this.browserWin.print();
            this.closePrintPage(evt, param1, param2);
        }
        
        this.closePrintPage = function(evt, param1, param2) {
            var printButton = param1[0];
            var contentArea = param1[1];

            var cancelButton = param1[2];
           
            vyho.lib.Utilities.removeNode(printButton);
            vyho.lib.Utilities.removeNode(cancelButton);
            vyho.lib.Utilities.removeNode(contentArea);
           
            var childNodes = param1[3];
            var i;
            for (i = 0; i < childNodes.length; i++) {
                vyho.lib.Utilities.removeClass(childNodes[i], "hideClass");
            }
        }
        
        this.renderFavorites = function(contentArea, printView, doc, renderType) {
            try {
                vyho.lib.Utilities.removeAllChildren(contentArea);

                if (!printView) {
                    var printFavorites = vyho.lib.Utilities.addNew("a", contentArea);
                    printFavorites.setAttribute("style", "background-color: #DFDFDF !important;");
                    vyho.lib.Utilities.newText("Print", printFavorites);
                    printFavorites.href = "javascript:void(0)";
                    printFavorites.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showPrintFavorites, "", ""), false);
                    vyho.lib.Utilities.newText("   ", contentArea);
                    
                    var removeAllLinks = vyho.lib.Utilities.addNew("a", contentArea);
                    removeAllLinks.setAttribute("style", "background-color: #DFDFDF !important;");
                    vyho.lib.Utilities.newText("Remove All", removeAllLinks);
                    removeAllLinks.href = "javascript:void(0)";
                    removeAllLinks.addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeAllFavorites, "", ""), false);
                    vyho.lib.Utilities.newText("   ", contentArea);

                    var removeExpiredLinks = vyho.lib.Utilities.addNew("a", contentArea);
                    removeExpiredLinks.setAttribute("style", "background-color: #DFDFDF !important;");
                    vyho.lib.Utilities.newText("Remove Expires", removeExpiredLinks);
                    removeExpiredLinks.href = "javascript:void(0)";
                    removeExpiredLinks.addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeExpiredFavorites, "", ""), false);
                    vyho.lib.Utilities.newText("   ", contentArea);

                    var favExpLink = vyho.lib.Utilities.addNew("a", contentArea);
                    favExpLink.setAttribute("style", "background-color: #DFDFDF !important;");
                    vyho.lib.Utilities.newText("Export", favExpLink);
                    favExpLink.href = "javascript:void(0)";

                    vyho.lib.Utilities.newText("   ", contentArea);

                    var favImpLink = vyho.lib.Utilities.addNew("a", contentArea);
                    favImpLink.setAttribute("style", "background-color: #DFDFDF !important;");
                    vyho.lib.Utilities.newText("Import", favImpLink);
                    favImpLink.href = "javascript:void(0)";
                    favImpLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.showFavImport, favExpLink, favImpLink), false);

                    favExpLink.addEventListener("click", vyho.lib.Utilities.runWith(this, this.doFavExport, favExpLink, favImpLink), false);

                    contentArea.appendChild(doc.createElement("br"));
                    contentArea.appendChild(doc.createElement("br"));
                }
                
                var div = vyho.lib.Utilities.addNew("div", contentArea);
                
                vyho.lib.Utilities.addClass(div, "favoriteArea");
                div.setAttribute("style", "width: 98%; border: 0px;");
                if (printView) {
                    div.setAttribute("style", "width: 800px !important; border: 0px;");
                }
                var entry;
                for (var i = this.favList.length - 1; i >= 0; i--) {
                    try {
                        entry = vyho.lib.Utilities.addNew("div", div);
                        var link = vyho.lib.Utilities.addNew("a", entry);
                        link.href = this.favList[i].url;
                        vyho.lib.Utilities.newText(vyho.lib.Utilities.parseEntity(this.favList[i].subject), link);
                        try {
                            this.preProcessDetails(link, [entry, renderType, this.favList[i].postId]);
                            var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                                method: "GET",
                                url: link.href,
                                headers: {
                                    "Accept" : "text/html,text/xml,text/plain"
                                },
                                contentHandler: vyho.lib.Utilities.runWith(this, this.processDetails, link, [entry, renderType, this.favList[i].postId, this.setFavObsolete, this.favList[i]]),
                                data : null
                            });
                            req.send();
                        } catch (err) {
                            vyho.lib.Utilities.notify("error: ", err);
                        }
                    } catch (err) {
                        vyho.lib.Utilities.notify("Failed to render favorites, " + sess, err);
                    }
                }

                contentArea.appendChild(doc.createElement("br"));
                contentArea.appendChild(doc.createElement("br"));

            //this.favWindow.setBounds(50, 50, 300, 600);

            } catch (error) {
                vyho.lib.Utilities.notify("Failed to render favorite: " , error);
            }
        }
        
        this.setFavObsolete = function(fav, text) {
            if (typeof text == "undefined" || 
                text == null || 
                text.indexOf("This posting has expired") >= 0 || 
                text.indexOf("This posting has been deleted") >= 0 ||
                text.indexOf("This posting has been flagged for removal") >= 0
                ) {
                fav.obsolete = true;
            } else {
                fav.obsolete = false;
            }
        }

        //Show preference window
        this.showPreferences = function(evt, param1, param2) {
            try {
                var ans = this.confirmOnce("Please close the preference window as soon as possible after edit." +
                    "\nIf not, your information may be at risk.", "SHOW_PREFERENCES");
                if (!ans) {
                    return;
                }

                var doc = this.browserWin.document;

                vyho.lib.Utilities.removeAllChildren(this.preferenceWindow.contentArea);

                this.preferenceWindow.setVisible(true);
                this.preferenceWindow.requestFocus();

                var contentArea = this.preferenceWindow.contentArea;
                //            contentArea.id = "preferenceContentArea";
                //            contentArea.className = "preferenceContentArea";

                contentArea.appendChild(doc.createElement("br"));
                contentArea.appendChild(doc.createElement("br"));

                var table = vyho.lib.Utilities.addNew("table", contentArea);
                table.setAttribute("style", "width: 98%; border: 0px;");
                var tr;
                for (var i = 0; i < this.preferences.prefList.length; i++) {
                    try {
                        this.preferences.prefList[i].setStyle(
                            "width: 100%; left: 3px;",
                            "width: 100%; left: 3px;",
                            "display: block;"
                            );
                        
                        //entryClass
                        tr = vyho.lib.Utilities.addNew("tr", table);
                        this.preferences.prefList[i].render(tr, doc);
                        tr.className = "entryClass";
                    //                    contentArea.appendChild(doc.createElement("br"));
                    } catch (err) {
                        vyho.lib.Utilities.notify("Failed to render preference for : " + this.preferences.prefList[i].getName(), err);
                    }
                }

                contentArea.appendChild(doc.createElement("br"));

                var okButton = vyho.lib.Utilities.addNew("input", contentArea);
                okButton.type = "button";
                okButton.value = "Ok";
                //okButton.style = "display: block; margin-left: auto; margin-right: auto";
                okButton.id = "craigslistPrefOkId";

                var applyButton = vyho.lib.Utilities.addNew("input", contentArea);
                applyButton.type = "button";
                applyButton.value = "Apply";
                //applyButton.style = "display: block; margin-left: auto; margin-right: auto";
                applyButton.id = "craigslistPrefApplyId";

                contentArea.appendChild(doc.createElement("br"));
                contentArea.appendChild(doc.createElement("br"));

                //this.preferenceWindow.setBounds(50, 50, 300, 600);

                okButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.savePreference, "", ""), false);
                applyButton.addEventListener("click", vyho.lib.Utilities.runWith(this, this.applyPreference, "", ""), false);
            } catch (error) {
                vyho.lib.Utilities.notify("Failed to render preference: ", error);
            }
        }

        this.applyPreference = function(evt, param1, param2) {
            for (var i = 0; i < this.preferences.prefList.length; i++) {
                this.preferences.prefList[i].save();
            }
            return;
        }

        this.savePreference = function(evt, param1, param2) {
            for (var i = 0; i < this.preferences.prefList.length; i++) {
                this.preferences.prefList[i].save();
            }
            this.preferenceWindow.setVisible(false);
        }

        if (configs) {
            for (var item in configs) {
                this[item] = configs[item];
            }
            
        }


        this.initialize(browserWin);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    vyho.lib.apps.craigslist.Preferences = function() {
        this.prefList = new Array();
        var component;

        component = new vyho.lib.ui.CheckBox("keepAspectRatio", "Keep Image Scale Aspect Ratio:");
        var keepAspectRatio = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getKeepAspectRatio = function() {
            return keepAspectRatio;
        }

        component = new vyho.lib.ui.CheckBox("scalePreviewImage", "Scale Original Image:");
        var scalePreviewImage = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getScalePreviewImage = function() {
            return scalePreviewImage;
        }

        var scales = new Array();
        for (var i = 10; i <= 300; i += 10) {
            scales[scales.length] = i;
        }
        component = new vyho.lib.ui.Select("thumbnailSize", "Thumbnail Size:", scales , null);
        var thumbnailSize = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, 100);
        this.getThumbnailSize = function() {
            return thumbnailSize;
        }

        component = new vyho.lib.ui.CheckBox("stickyModeOnStart", "Set Sticky Mode on Start:");
        var stickyModeOnStart = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getStickyModeOnStart = function() {
            return stickyModeOnStart;
        }

        component = new vyho.lib.ui.CheckBox("showImageWindow", "Show Image Window:");
        var showImageWindow = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowImageWindow = function() {
            return showImageWindow;
        }

        component = new vyho.lib.ui.CheckBox("showPostingDetailWindow", "Show Posting Detail Window:");
        var showPostingDetailWindow = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowPostingDetailWindow = function() {
            return showPostingDetailWindow;
        }

        component = new vyho.lib.ui.CheckBox("minimizeWindowTitle", "Show Minimized Window Title:");
        var minimizeWindowTitle = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getMinimizeWindowTitle = function() {
            return minimizeWindowTitle;
        }

        component = new vyho.lib.ui.CheckBox("detailMouseOver", "Show Detail on Mouse Over:");
        var detailMouseOver = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getDetailMouseOver = function() {
            return detailMouseOver;
        }

        component = new vyho.lib.ui.CheckBox("detailMouseOut", "Hide Detail on Mouse Out:");
        var detailMouseOut = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getDetailMouseOut = function() {
            return detailMouseOut;
        }

        component = new vyho.lib.ui.CheckBox("imageMouseOver", "Show Image on Mouse Over:");
        var imageMouseOver = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getImageMouseOver = function() {
            return imageMouseOver;
        }

        component = new vyho.lib.ui.CheckBox("imageMouseOut", "Hide Image on Mouse Out:");
        var imageMouseOut = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getImageMouseOut = function() {
            return imageMouseOut;
        }

        component = new vyho.lib.ui.CheckBox("detailLinkOnPostTitle", "Link to Detail Page on Post Title:");
        var detailLinkOnPostTitle = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getDetailLinkOnPostTitle = function() {
            return detailLinkOnPostTitle;
        }

        component = new vyho.lib.ui.TextField("myAddress", "My Address (Google Map):");
        var myAddress = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "");
        this.getMyAddress = function() {
            return myAddress;
        }

        component = new vyho.lib.ui.TextField("bcEmail", "My Blind Carbon Copy Email (BCC):");
        var bcEmail = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "");
        this.getBcEmail = function() {
            return bcEmail;
        }

        //        var useEmbeddedEmailWindow = vyho.lib.Utilities.pref_getValue(EMBEDDED_EMAIL_WINDOW, true);
        //        text += "Use embedded email window: <input type=\"checkbox\" id=\"useEmbeddedEmailWindowId\"" +
        //        ((useEmbeddedEmailWindow == true)?"checked":"") + " /><br /><br />";

        component = new vyho.lib.ui.CheckBox("useEmbeddedMapWindow", "Use Embedded Map Window:");
        var useEmbeddedMapWindow = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getUseEmbeddedMapWindow = function() {
            return useEmbeddedMapWindow;
        }

        component = new vyho.lib.ui.TextField("backgroundColor", "Post Detail Background Color:");
        var backgroundColor = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "#EEEEFF");
        this.getBackgroundColor = function() {
            return backgroundColor;
        }

        component = new vyho.lib.ui.TextField("foregroundColor", "Post Detail Text Color:");
        var foregroundColor = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "#000000");
        this.getForegroundColor = function() {
            return foregroundColor;
        }

        component = new vyho.lib.ui.TextField("windowBorderColor", "Window Border Color:");
        var windowBorderColor = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "#4444FF");
        this.getWindowBorderColor = function() {
            return windowBorderColor;
        }

        component = new vyho.lib.ui.TextField("unfocusedWindowBorderColor", "Unfocused Window Border Color:");
        var unfocusedWindowBorderColor = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "#555555");
        this.getUnfocusedWindowBorderColor = function() {
            return unfocusedWindowBorderColor;
        }

        component = new vyho.lib.ui.CheckBox("enableAutoRefresh", "Auto Refresh Page:");
        var enableAutoRefresh = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getEnableAutoRefresh = function() {
            return enableAutoRefresh;
        }

        component = new vyho.lib.ui.TextField("refreshInterval", "Page Refresh Interval (in minutes):");
        var refreshInterval = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "5");
        this.getRefreshInterval = function() {
            return refreshInterval;
        }

        component = new vyho.lib.ui.CheckBox("postTitleRightAlign", "Post Title Right Alignment:");
        var postTitleRightAlign = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getPostTitleRightAlign = function() {
            return postTitleRightAlign;
        }

        component = new vyho.lib.ui.CheckBox("leftRightLayoutV2", "Left to Right Layout:");
        var leftRightLayout = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getLeftRightLayout = function() {
            return leftRightLayout;
        }
        
        component = new vyho.lib.ui.TextField("previewTextLength", "Preview Text Length:");
        var previewTextLength = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "200");
        this.getPreviewTextLength = function() {
            return previewTextLength;
        }

        component = new vyho.lib.ui.CheckBox("showTextPreview", "Show Text Preview:");
        var showTextPreview = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowTextPreview = function() {
            return showTextPreview;
        }

        component = new vyho.lib.ui.CheckBox("showHideButton", "Show Hide Button:");
        var showHideButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowHideButton = function() {
            return showHideButton;
        }

        component = new vyho.lib.ui.CheckBox("showSpamButton", "Show Spam Button:");
        var showSpamButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowSpamButton = function() {
            return showSpamButton;
        }

        component = new vyho.lib.ui.CheckBox("showFavButton", "Show Favorite Button:");
        var showFavButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowFavButton = function() {
            return showFavButton;
        }

        component = new vyho.lib.ui.CheckBox("showNativeFavButton", "Show Native Favorite Button:");
        var showNativeFavButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getShowNativeFavButton = function() {
            return showNativeFavButton;
        }

        component = new vyho.lib.ui.CheckBox("showMapButton", "Show Map Button:");
        var showMapButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getShowMapButton = function() {
            return showMapButton;
        }

        component = new vyho.lib.ui.CheckBox("showDirectionButton", "Show Direction Button:");
        var showDirectionButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowDirectionButton = function() {
            return showDirectionButton;
        }

        component = new vyho.lib.ui.CheckBox("showElapsedTime", "Show Elapsed Time:");
        var showElapsedTime = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowElapsedTime = function() {
            return showElapsedTime;
        }

        component = new vyho.lib.ui.CheckBox("showUpdatedElapsedTime", "Show Updated Elapsed Time:");
        var showUpdatedElapsedTime = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowUpdatedElapsedTime = function() {
            return showUpdatedElapsedTime;
        }
        
        component = new vyho.lib.ui.CheckBox("showShortTimeLabel", "Show Short Time Label:");
        var showShortTimeLabel = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowShortTimeLabel = function() {
            return showShortTimeLabel;
        }
        
        var elapsedFormats = ["Show all", "Show most 2 groups", "Show 1 group"];
        component = new vyho.lib.ui.Select("elapsedTimeFormat2", "Elapsed Time Format:", [3,2,1], elapsedFormats );
        var elapsedTimeFormat = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, 2);
        this.getElapsedTimeFormat = function() {
            return elapsedTimeFormat;
        }
        
        component = new vyho.lib.ui.CheckBox("showOverlappedDetails", "Show Overlapped Detail Windows:");
        var showOverlappedDetails = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowOverlappedDetails = function() {
            return showOverlappedDetails;
        }
        
        component = new vyho.lib.ui.CheckBox("enablePartialRendering", "Enable partial rendering:");
        var enablePartialRendering = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getEnablePartialRendering = function() {
            return enablePartialRendering;
        }
        
        component = new vyho.lib.ui.CheckBox("confirmOnFavDelete", "Confirm Favorite Entry Deletion:");
        var confirmOnFavDelete = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, false);
        this.getConfirmOnFavDelete = function() {
            return confirmOnFavDelete;
        }

        component = new vyho.lib.ui.TextField("buttonIconSpacing", "Small Button Icon Spacing (in pixels):");
        var buttonIconSpacing = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "10");
        this.getButtonIconSpacing = function() {
            return buttonIconSpacing;
        }

        component = new vyho.lib.ui.TextField("buttonIconSize", "Button Icon Size (in pixels):");
        var buttonIconSize = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "16");
        this.getButtonIconSize = function() {
            return buttonIconSize;
        }
    
        component = new vyho.lib.ui.TextField("maxNumberOfThumbnails2", "Max Number of Thumbnails:");
        var maxNumberOfThumbnails = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "15");
        this.getMaxNumberOfThumbnails = function() {
            return maxNumberOfThumbnails;
        }
        
        component = new vyho.lib.ui.CheckBox("convertTextToLowerCase", "Convert Text To Lowercase:");
        var convertTextToLowerCase = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getConvertTextToLowerCase = function() {
            return convertTextToLowerCase;
        }
        
        component = new vyho.lib.ui.CheckBox("enableHtmlInDetailsArea", "Enable HTML In Details Area:");
        var enableHtmlInDetailsArea = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getEnableHtmlInDetailsArea = function() {
            return enableHtmlInDetailsArea;
        }
        
        component = new vyho.lib.ui.CheckBox("enableAutoHideForm", "Enable Auto Hide Search Form:");
        var enableAutoHideForm = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getEnableAutoHideForm = function() {
            return enableAutoHideForm;
        }
        
        
        var emailServers = [
        {
            "name" : "Googlemail",
            "display": "Google mail",
            "url": "https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&",
            "to": "to",
            "cc": "cc",
            "bcc": "bcc",
            "subject": "su",
            "body": "body"
        },
        {
            "name" : "MailTo",
            "display": "MailTo (browser/system)",
            "url": "mailto:",  //todo here
            "to": "to",
            "cc": "cc",
            "bcc": "bcc",
            "subject": "subject",
            "body": "body",
            "encoder": function(val) {
                //val = val.replace(/\n/gi, "&lt;BR&gt;", "gim");
                val = vyho.lib.Utilities.escapeUrl(val);
                //val = encodeURIComponent(val);
                return val;
            },
            "subjEncoder": function(val) {
                //return vyho.lib.Utilities.escapeUrl(val);
                return val;
            }
        },
        {
            "name" : "Yahoo",
            "display": "Yahoo (beta)",
            "url" : "http://compose.mail.yahoo.com/?",
            "to": "To",
            "cc": "Cc",
            "bcc": "Bcc",
            "subject": "Subj",
            "body": "Body",
            "encoder": function(val) {
                //val = val.replace(/\n/gi, "&lt;BR&gt;", "gim");
                val = vyho.lib.Utilities.escapeUrl(val);
                //val = encodeURIComponent(val);
                val = vyho.lib.Utilities.escapeUrl(val);
                return val;
            },
            "rand": "rand",
            "subjEncoder": function(val) {
                return vyho.lib.Utilities.escapeUrl(val);
            }
        },
        {
            "name" : "Hotmail",
            "display": "Hotmail (beta)",
            "url": "https://mail.live.com/default.aspx?rru=compose&",
            "to": "to",
            "cc": "cc",
            "bcc": null,    //todo: research needed
            "subject": "subject",
            "body": "body"
        },
        {
            "name" : "Fastmail",
            "display": "Fastmail (alpha)",
            "url": "https://www.fastmail.fm/action/compose/?",
            "to": "to",
            "cc": "cc",
            "bcc": "bcc",
            "subject": "subject",
            "body": "body"
        }
            
        /*
             *
             *
            ,
            {
                "name" : "Aol",
                "display": "AOL",
                "url": "",
                "to": "to",
                "cc": "cc",
                "bcc": "bcc",
                "subject": "subject",
                "body": "body"
            },
            
            {
                "name" : "Zoho",
                "display": "Zoho",
                "url": "https://zmail.zoho.com/mail/compose.do?extsrc=mailto&mode=compose&tp=zb&",
                "to": "ct",
                "cc": null,//todo: what about these?
                "bcc": null,
                "subject": null,
                "body": null
            },
            
            {
                "name" : "Custom",
                "display": "Custom (use template below)",
                "url": "http://enter your custom URL here, changes as needed, to={to}&cc={cc}&bb={bb}&subject={subject}&body={body}"
            }
            */
        ];
        
        var webMails = new Array();
        var webMailLabels = new Array();
        for (i = 0; i < emailServers.length; i++) {
            webMails[webMails.length] = emailServers[i].name;
            webMailLabels[webMailLabels.length] = emailServers[i].display;
        }
        
        component = new vyho.lib.ui.Select("webMailServer", "Web Mail Server:", webMails , webMailLabels);
        var webMailServer = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "Googlemail");
        this.getWebMailServer = function() {
            return webMailServer;
        }
        /*
        component = new vyho.lib.ui.TextField("customEmailServer", "Custom eMail Server:");
        var customEmailServer = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, 
            component, "http://enter your custom URL here, changes as needed, to={to}&cc={cc}&bb={bb}&subject={subject}&body={body}");
        this.getCustomEMailServer = function() {
            return customEmailServer;
        }
        */
        
        //        component = new vyho.lib.ui.CheckBox("showPostDetailsButton", "Show post details button:");
        //        var showPostDetailsButton = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        //        this.getShowPostDetailsButton = function() {
        //            return showPostDetailsButton;
        //        }

        this.getEmailServers = function() {
            return emailServers;
        }
        
        this.getEmailServerConfig = function(name) {
            for (var i = 0; i < emailServers.length; i++) {
                if (emailServers[i].name == name) {
                    return emailServers[i];
                }
            }
            return null;
        }

        component = new vyho.lib.ui.TextField("entryGradientColor2", "Entry Background Gradient Color:");
        var entryGradientColor = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, "#EFEFDE");
        this.getEntryGradientColor = function() {
            return entryGradientColor;
        }

        component = new vyho.lib.ui.CheckBox("showImagesInDetails", "Show Images In Details:");
        var showImagesInDetails = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, true);
        this.getShowImagesInDetails = function() {
            return showImagesInDetails;
        }
        
        var imgesPerRowOptions = new Array();
        for (var i = 1; i <= 4; i += 1) {
            imgesPerRowOptions[imgesPerRowOptions.length] = i;
        }
        component = new vyho.lib.ui.Select("embedImagesPerRow", "Number Embed Images Per Row:", imgesPerRowOptions, null);
        var embedImagesPerRow = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, 1);
        this.getEmbedImagesPerRow = function() {
            return embedImagesPerRow;
        }

        
        var imageHeightOptions = new Array();
        for (var i = 100; i <= 800; i += 50) {
            imageHeightOptions[imageHeightOptions.length] = i;
        }
        component = new vyho.lib.ui.Select("embedImageHeight", "Embed Image Height:", imageHeightOptions, null);
        var embedImageHeight = this.prefList[this.prefList.length] = new vyho.lib.Preference(null, component, 500);
        this.getEmbedImageHeight = function() {
            return embedImageHeight;
        }

        this.get = function(keyName) {
            var preference = null;
            for (var i = 0; i < this.prefList.length; i++) {
                preference = this.prefList[i];
                if (preference.getName() == keyName) {
                    return preference;
                }
            }
            return null;
        }
    }

    vyho.lib.net.EmailInfo = function(sourceUrl) {
        this.ready = false;
        
        this.isReady = function() {
            return this.ready;
        }

        this.getSubject = function() {
            return vyho.lib.Utilities.parseEntity(this.subject);
        }

        this.getEmailAddress = function() {
            if (!this.ready) {
                this.getInformation();
            }
            return this.emailAddress;
        }
        
        this.processEmail = function(obj, func, param1, param2) {
            try {
                var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                    method: "GET",
                    url: sourceUrl,	//relative URL
                    headers: {
                        "Accept" : "text/html,text/xml,text/plain"
                    },
                    contentHandler: vyho.lib.Utilities.runWith(this, this.postActionHandler, obj, [func, param1, param2]),
                    data : null,
                    synchronous: false
                });
                req.send();
            } catch (err) {
                vyho.lib.Utilities.notify("error: ", err);
            }
        }
        
        this.postActionHandler = function(response, obj, params) {
            this.parseInfo(response);
            var func = params[0];
            var param1 = params[1];
            var param2 = params[2];
            if (func) {
                func.apply(obj, [param1, param2]);
            }
        }

        this.getInformation = function() {
            try {
                var req = vyho.lib.net.AjaxRequestFactory.getRequest({
                    method: "GET",
                    url: sourceUrl,	//relative URL
                    headers: {
                        "Accept" : "text/html,text/xml,text/plain"
                    },
                    contentHandler: vyho.lib.Utilities.runWith(this, this.parseInfo, null, []),
                    data : null,
                    synchronous: true
                });
                req.send();
            } catch (err) {
                vyho.lib.Utilities.notify("error: ", err);
            }

        }
        
        this.contactRegx = [
            new RegExp("<a href\\=\\\"mailto:([\\s\\S]*?)\\\"", "g")
        ];

        this.parseInfo = function(response, param1, param2) {
            //<span class="replytext"><a href="/reply/1111111">reply</a></span>
            var contentText = response.responseText;
            var content = null;
            for (var i = 0; i < this.contactRegx.length; i++) {
                this.contactRegx[i].lastIndex = 0;
                content = this.contactRegx[i].exec(contentText);
                if (content != null && content.length > 1) {
                    content = content[1];
                    break;
                }
            }
            if (content != null) {
                this.ready = true;
                this.emailAddress = unescape(content);
            } else {
                alert("not found: " + sourceUrl);
            }
        }

        this.parseInfo = function(response, param1, param2) {
            //vyho.lib.Utilities.notify(contentText);
            var mailToRegx = "<a href\\=\\\"mailto:([\\s\\S]*?)\\?";
            //var subjectRegx = "\\?subject\\=([\\s\\S]*?)&amp;";

            var addressRegxObj = new RegExp(mailToRegx, "g");
            //var subjectRegxObj = new RegExp(subjectRegx, "g");
          
            var contentText = response.responseText;
          
            var res = addressRegxObj.exec(contentText);
            if (res != null && res.length > 1) {
                this.emailAddress = unescape(res[1]);
            }

            //res = subjectRegxObj.exec(contentText);
            //if (res != null && res.length > 1) {
            //    this.subject = unescape(res[1]);
            //}

            this.ready = true;
        }
    }

    vyho.lib.Preference = function(aKeyName, component, defValue) {
        var changed = false;

        var keyName = aKeyName;
        if (keyName == null) {
            keyName = component.getId();
        }

        this.getName = function() {
            return keyName;
        }

        this.setStyle = function(fieldStyle, labelStyle, containerStyle) {
            if (typeof fieldStyle != "undefined" && fieldStyle != null) component.setFieldStyle(fieldStyle);
            if (typeof labelStyle != "undefined" && labelStyle != null) component.setLabelStyle(labelStyle);
            if (typeof containerStyle != "undefined" && containerStyle != null) component.setContainerStyle(containerStyle);
        }

        this.getValue = function() {
            return vyho.lib.Utilities.pref_getValue(keyName, defValue);
        }

        this.setValue = function(value) {
            vyho.lib.Utilities.pref_setValue(keyName, value);
        }

        this.render = function(parent, doc) {
            var td = vyho.lib.Utilities.addNew("td", parent);
            td.setAttribute("style", "width: 50%;");
            component.renderLabel(td);
            td = vyho.lib.Utilities.addNew("td", parent);
            td.setAttribute("style", "width: 50%;");
            component.renderField(td);
            component.setValue(this.getValue());
        }

        this.save = function() {
            var prevVal = this.getValue();
            this.setValue(component.getValue());
            if (prevVal != this.getValue()) {
                changed = true;
            } else {
                changed = false;
            }
        }

        this.isChanged = function() {
            return changed;
        }

        this.resetChange = function() {
            changed = false;
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // http://javascript-reference.info/correct-oop-for-javascript.htm

    vyho.lib.lang.setParent = function(child, parentClass) {
        child.prototype = parentClass;  //new parentClass();
        child.prototype.constructor = child;
    }

    vyho.lib.lang.initParent = function(self, parentClass) {
        if ( arguments.length > 2 ) {
            parentClass.apply(self, Array.prototype.slice.call(arguments, 2));
        } else {
            parentClass.call(self);
        }
    }

    vyho.lib.Namespace.defineNamespace(vyho, "lib.ui");

    vyho.lib.ui.Component = function(id, alabel) {
        var label = alabel;
        var validator;
        var selfId = id;
        var labelStyle;
        var fieldStyle;
        var containerStyle;
        var formField;

        this.render = function(parent) {
            this.renderLabel(parent);
            this.renderField(parent);
        }

        this.renderLabel = function(parent) {
            throw "Unimplemented error.";
        }

        this.renderField = function(parent) {
            throw "Unimplemented error.";
        }

        this.getValue = function() {
            throw "Unimplemented error.";
        }

        this.setValue = function(newValue) {
            throw "Unimplemented error.";
        }

        this.setField = function(newField) {
            formField = newField;
        }

        this.getField = function() {
            return formField;
        }

        this.setLabel = function(newLabel) {
            label = newLabel;
        }

        this.getLabel = function() {
            return label;
        }

        this.setLabelStyle = function(style) {
            labelStyle = style;
        }

        this.getLabelStyle = function() {
            return labelStyle;
        }

        this.setFieldStyle = function(style) {
            fieldStyle = style;
        }

        this.getFieldStyle = function() {
            return fieldStyle;
        }

        this.setContainerStyle = function(style) {
            containerStyle = style;
        }

        this.getContainerStyle = function() {
            return containerStyle;
        }

        this.setValidator = function(newValidator) {
            validator = newValidator;
        }

        this.getValidator = function() {
            return validator;
        }

        this.getId = function() {
            return selfId;
        }
    }

    vyho.lib.ui.OrComponent = function(id, label, add) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);
        var andList = new Array();
        var andDiv = null;
        var addRemove = null;
        var orDiv = null;

        this.getAddRemove = function() {
            return addRemove;
        }

        this.setAdd = function(value) {
            add = value;
        }

        this.getAdd = function() {
            return add;
        }

        this.addAndComponent = function(andComponent) {
            if (andList.length == 0) {
                andComponent.setAdd(true);
            } else {
                andComponent.setAdd(false);
            }
            andList[andList.length] = andComponent;

            if (andDiv != null) {
                andComponent.render(andDiv);
                if (andComponent.getAdd()) {
                    andComponent.getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.addAndHandler, null, null), false);
                } else {
                    andComponent.getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeAndHandler, andComponent, null), false);
                }
            }
        }

        this.addAndHandler = function(evt, param1, param2) {
            var andComp = new vyho.lib.ui.AndComponent(null, "", true);
            this.addAndComponent(andComp);
        }

        this.removeAndHandler = function(evt, andComponent) {
            andComponent.getContainer().parentNode.removeChild(andComponent.getContainer());
            for ( var i = andList.length - 1; i >= 0; i--) {
                if (andList[i] == andComponent) {
                    andList.splice(i, 1);
                }
            }
        }

        this.getAndList = function() {
            return andList;
        }

        this.clear = function() {
            andList = new Array();
        }

        this.render = function(parent) {
            var doc = parent.ownerDocument;
            var addNew = vyho.lib.Utilities.addNew;
            orDiv = addNew("fieldset", parent);
            //orDiv.setAttribute("style", "display: inline;");
            orDiv.setAttribute("style", "width: 400px; background-color: white;");

            andDiv = addNew("div", orDiv);
            //andDiv.setAttribute("style", "border: solid 1px black;");

            var legend = addNew("legend", orDiv);
            addRemove = addNew("input", legend);
            addRemove.setAttribute("style", "display: inline;");
            addRemove.setAttribute("type", "button");
            if (add) {
                addRemove.setAttribute("value", "+ OR");
            } else {
                addRemove.setAttribute("value", "- OR");
            }
            for (var i = 0; i < andList.length; i++) {
                andList[i].render(andDiv);
                //add event listener
                if (andList[i].getAdd()) {
                    andList[i].getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.addAndHandler, null, null), false);
                } else {
                    andList[i].getAddRemove().addEventListener("click", vyho.lib.Utilities.runWith(this, this.removeAndHandler, andList[i], null), false);
                }
            }
        }

        this.getContainer = function() {
            return orDiv;
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.OrComponent, vyho.lib.ui.Component);

    vyho.lib.ui.AndComponent = function(id, label, add) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);
        var notCheckBox = null;
        var filterTextField = null;
        var addRemove = null;
        var container = null;

        this.getContainer = function() {
            return container;
        }

        this.getAddRemove = function() {
            return addRemove;
        }

        this.setAdd = function(value) {
            add = value;
        }

        this.getAdd = function() {
            return add;
        }

        this.setExclude = function(exclude) {
            if (notCheckBox != null) notCheckBox.setValue(exclude);
        }

        this.getExclude = function() {
            if (notCheckBox != null) return notCheckBox.getValue();
            return false;
        }

        this.getFilterText = function() {
            if (filterTextField != null) return filterTextField.getValue();
            return "";
        }

        this.setFilterText = function(text) {
            if (filterTextField != null) filterTextField.setValue(text);
        }

        this.render = function(parent) {
            var addNew = vyho.lib.Utilities.addNew;
            var doc = parent.ownerDocument;

            container =  addNew("div", parent);

            var notLabel = vyho.lib.Utilities.newText("not: ", container);
            if (notCheckBox == null) {
                notCheckBox = new vyho.lib.ui.CheckBox(null, null);
            }

            notCheckBox.setFieldStyle("display: inline;");
            notCheckBox.setLabelStyle("display: inline;");
            notCheckBox.setContainerStyle("display: inline;");
            notCheckBox.render(container);

            if (filterTextField == null) {
                filterTextField = new vyho.lib.ui.TextField(null, null);
            }
            filterTextField.setFieldStyle("width: 300px; display: inline;");    //@todo: width is not for everything inside the text field
            filterTextField.setLabelStyle("display: inline;");
            filterTextField.setContainerStyle("display: inline;");
            filterTextField.render(container);

            //filterTextField.value = filterText;

            addRemove = addNew("input", container);
            addRemove.type = "button";
            addRemove.setAttribute("style", "display: inline;");
            if (add) {
                addRemove.value = "+ AND";
            } else {
                addRemove.value = "- AND";
            }
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.AndComponent, vyho.lib.ui.Component);

    vyho.lib.ui.CheckBox = function(id, label) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);

        this.render = function(parent) {
            var element = vyho.lib.Utilities.addNew("div", parent);
            if (this.getContainerStyle() != null) {
                element.setAttribute("style", this.getContainerStyle());
            }
            //        element.className = "componentContainer";
            //        labelSpan.className = "componentLabel";
            var label = this.renderLabel(element);
            this.renderField(element);

            //        this.formField.className = "component";
            //        label.htmlFor  = this.getId();
            return element;
        }

        this.renderLabel = function(parent) {
            var labelSpan = vyho.lib.Utilities.addNew("div", parent);
            var label = vyho.lib.Utilities.addNew("label", labelSpan);
            label.setAttribute("style", this.getLabelStyle());
            labelSpan.setAttribute("style", this.getLabelStyle());
            if (this.getLabel() != null) label.textContent = this.getLabel();
            label.htmlFor  = this.getId();
            return label;
        }

        this.renderField = function(parent) {
            var formField = vyho.lib.Utilities.addNew("input", parent);
            formField.id = this.getId();
            formField.type = "checkbox";
            formField.name = this.getId();
            if (this.getFieldStyle() != null) {
                formField.setAttribute("style", this.getFieldStyle());
            }
            this.setField(formField);
            return formField;
        }

        this.getValue = function() {
            return this.getField().checked;
        }

        this.setValue = function(value) {
            this.getField().checked = value;
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.CheckBox, vyho.lib.ui.Component);

    vyho.lib.ui.TextField = function(id, label) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);
        //    this.render = function(parent) {
        //        var element = vyho.lib.Utilities.addNew("div", parent);
        //        var formField = vyho.lib.Utilities.addNew("input", element);
        //        this.setField(formField);
        //        formField.id = this.getId();
        //        formField.type = "text";
        //        formField.name = this.getId();
        //        if (this.getFieldStyle() != null) {
        //            element.setAttribute("style", this.getFieldStyle());
        //            formField.setAttribute("style", this.getFieldStyle());
        //        }
        //        return element;
        //    }
        this.render = function(parent) {
            var element = vyho.lib.Utilities.addNew("div", parent);
            if (this.getContainerStyle() != null) {
                element.setAttribute("style", this.getContainerStyle());
            }
            var label = this.renderLabel(element);
            this.renderField(element);

            return element;
        }

        this.renderLabel = function(parent) {
            var labelSpan = vyho.lib.Utilities.addNew("div", parent);
            var label = vyho.lib.Utilities.addNew("label", labelSpan);
            label.setAttribute("style", this.getLabelStyle());
            labelSpan.setAttribute("style", this.getLabelStyle());
            if (this.getLabel() != null) label.textContent = this.getLabel();
            label.htmlFor  = this.getId();
            return label;
        }

        this.renderField = function(parent) {
            var formField = vyho.lib.Utilities.addNew("input", parent);
            formField.id = this.getId();
            formField.type = "text";
            formField.name = this.getId();
            if (this.getFieldStyle() != null) {
                formField.setAttribute("style", this.getFieldStyle());
            }
            this.setField(formField);
            return formField;
        }

        this.getValue = function() {
            return this.getField().value;
        }

        this.setValue = function(value) {
            this.getField().value = value;
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.TextField, vyho.lib.ui.Component);

    vyho.lib.ui.TextArea = function(id, label, rows, cols) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);

        this.render = function(parent) {
            var element = vyho.lib.Utilities.addNew("div", parent);
            if (this.getContainerStyle() != null) {
                element.setAttribute("style", this.getContainerStyle());
            }
            var label = this.renderLabel(element);
            this.renderField(element);
            return element;
        }

        this.renderLabel = function(parent) {
            var labelSpan = vyho.lib.Utilities.addNew("div", parent);
            var label = vyho.lib.Utilities.addNew("label", labelSpan);
            label.setAttribute("style", this.getLabelStyle());
            labelSpan.setAttribute("style", this.getLabelStyle());
            if (this.getLabel() != null) label.textContent = this.getLabel();
            label.htmlFor  = this.getId();
            return label;
        }

        this.renderField = function(parent) {
            var formField = vyho.lib.Utilities.addNew("textarea", parent);
            formField.id = this.getId();
            formField.name = this.getId();
            formField.cols = cols;
            formField.rows = rows;
            if (this.getFieldStyle() != null) {
                formField.setAttribute("style", this.getFieldStyle());
            }
            this.setField(formField);
            return formField;
        }

        this.getValue = function() {
            return this.getField().value
        }

        this.setValue = function(value) {
            this.getField().value = value;
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.TextArea, vyho.lib.ui.Component);

    vyho.lib.ui.Select = function(id, label, valueList, labelList) {
        vyho.lib.lang.initParent(this, vyho.lib.ui.Component, id, label);

        this.render = function(parent) {
            var element = vyho.lib.Utilities.addNew("div", parent);
            if (this.getContainerStyle() != null) {
                element.setAttribute("style", this.getContainerStyle());
            }
            var label = this.renderLabel(element);
            this.renderField(element);

            return element;
        }

        this.renderLabel = function(parent) {
            var labelSpan = vyho.lib.Utilities.addNew("div", parent);
            var label = vyho.lib.Utilities.addNew("label", labelSpan);
            label.setAttribute("style", this.getLabelStyle());
            labelSpan.setAttribute("style", this.getLabelStyle());
            if (this.getLabel() != null) label.textContent = this.getLabel();
            label.htmlFor  = this.getId();
            return label;
        }

        this.renderField = function(parent) {
            var formField = vyho.lib.Utilities.addNew("select", parent);
            formField.id = this.getId();
            formField.type = "text";
            formField.name = this.getId();
            if (this.getFieldStyle() != null) {
                formField.setAttribute("style", this.getFieldStyle());
            }
            formField.options.length = 0;
            for (var i = 0; i < valueList.length; i++) {
                var optionLabel = valueList[i];
                if (labelList) optionLabel = labelList[i];
                var option = new Option(optionLabel, valueList[i], false, false);
                formField.options.add(option);
            }
            this.setField(formField);
            return formField;
        }

        this.setValue = function(value) {
            this.getField().value = value;
        }

        this.getValue = function() {
            return this.getField().value;
        }
    }

    vyho.lib.lang.setParent(vyho.lib.ui.Select, vyho.lib.ui.Component);

    // -----------------------------------------------------------------

    vyho.lib.Utilities = function() {};

    vyho.lib.Utilities.$ = function(id, doc) {
        return doc.getElementById(id);
    }
    
    vyho.lib.Utilities.runOnce = function(func, delay) {
        return setTimeout(function() {
            func.call();
        }, delay);
    }
    
    vyho.lib.Utilities.runRepeat = function(func, interval) {
        return setInterval(function() {
            func.call();
        }, interval);
    }
    
    vyho.lib.Utilities.isDescendant = function(child, parent) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    
    vyho.lib.Utilities.findFirstParent = function(targetNode, tag) {
        if (targetNode == null) return null;
        var iter = targetNode.parentNode;
        while (iter != null) {
            if (iter.nodeName == tag) {
                return iter;
            }
            iter = iter.parentNode;
        }
        return null;
    }

    vyho.lib.Utilities.findFirstItem = function(tag, clazzName, doc) {
        var items;
        if (clazzName != null && typeof clazzName != "undefined") {
            clazzName = clazzName.replace(/\-/g, "\\-");
            items = (tag == "*" && doc.all)? doc.all : doc.getElementsByTagName(tag);
            var regExp = new RegExp("(^|\\s)" + clazzName + "(\\s|$)");
            var element;
            for(var i = 0; i< items.length; i++){
                element = items[i];
                if(regExp.test(element.getAttribute("class"))){
                    return element;
                }
            }
        } else {
            items = doc.getElementsByTagName(tag);
            if (items.length > 0) {
                return items[0];
            }
        }
        return null;
    }
    
    vyho.lib.Utilities.searchParent = function(childNode, tag, attributes) {
        if (typeof childNode == "undefined") {
            return null;
        }
        var element = childNode;
        var found = false;
        if (typeof attributes == "undefined") {
            attributes = {};
        }
        var attrExpectedVal;
        var attrVal;
        while (element != null && typeof element != "undefined") {
            if (element.nodeName == tag) {
                found = true;
                for (var attr in attributes) {
                    attrExpectedVal = attributes[attr];
                    attrVal = element.getAttribute(attr);
                    if (attr != "class") {
                        if (attrExpectedVal != attrVal) {
                            found = false;
                            break;
                        }
                    } else if (attr == "class") {
                        //var regExp = new RegExp("(^|\\s)" + attrExpectedVal + "(\\s|$)");
                        //if(!regExp.test(attrVal)){
                        if (attrVal == null || attrVal.indexOf(attrExpectedVal) < 0) {
                            found = false;
                            break;
                        }
                    }
                }
            }
            if (found) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    }

    vyho.lib.Utilities.findNode = function(parentNode, tag, attributes) {
        var items;
        if (typeof parentNode.getElementsByTagName == "undefined") {
            return null;
        }
        items = parentNode.getElementsByTagName(tag);
        var element;
        var found = false;
        for(var i = 0; i< items.length; i++){
            found = true;
            element = items[i];
            for (var attr in attributes) {
                var attrExpectedVal = attributes[attr];
                var attrVal = element.getAttribute(attr);
                if (attr != "class") {
                    if (attrExpectedVal != attrVal) {
                        found = false;
                        break;
                    }
                } else if (attr == "class") {
                    var regExp = new RegExp("(^|\\s)" + attrExpectedVal + "(\\s|$)");
                    if(!regExp.test(attrVal)){
                        //if (attrVal == null || attrVal.indexOf(attrExpectedVal) < 0) {
                        found = false;
                        break;
                    }
                } 
            }
            if (found) {
                return element;
            }
        }
        return null;
    }

    vyho.lib.Utilities.findNodes = function(parentNode, tag, attributes) {
        var items;
        if (typeof parentNode.getElementsByTagName == "undefined") {
            return null;
        }
        items = parentNode.getElementsByTagName(tag);
        var element;
        var found = false;
        var result = [];
        for(var i = 0; i< items.length; i++){
            found = true;
            element = items[i];
            for (var attr in attributes) {
                var attrExpectedVal = attributes[attr];
                var attrVal = element.getAttribute(attr);
                //console.log(attrVal);
                if (attrExpectedVal != attrVal) {
                    found = false;
                    break;
                }
            }
            if (found) {
                result[result.length] = element;
            }
        }
        return result;
    }

    vyho.lib.Utilities.findNextSibling = function(targetNode, tag) {
        var iter = targetNode;
        while (iter != null) {
            if (iter.nodeName == tag) {
                return iter;
            }
            iter = iter.nextSibling;
        }
        return null;
    }

    vyho.lib.Utilities.isEmpty = function(text, trim) {
        if (typeof text == "undefined") return true;
        if (text == null) return true;
        if (text == "") return true;
        if (trim) {
            var trimText = vyho.lib.Utilities.trimText(text);
            if (trimText == "") return true;
        }
        return false;
    }

    vyho.lib.Utilities.roundInt = function(number) {
        if (number >= 0.5 + Math.floor(number)) {
            return Math.floor(number) + 1;
        }
        return Math.floor(number);
    }

    vyho.lib.Utilities.getDoc = function(element) {
        return element.ownerDocument;
    }

    vyho.lib.Utilities.trimText = function(text) {
        if (text == null) {
            return "";
        }
        var trimText = "";
        var ch;
        var endIndex;
        for (endIndex = text.length - 1; endIndex >= 0; endIndex--) {
            ch = text.charAt(endIndex);
            if (ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r') {
                continue;
            }
            break;
        }
        var copy = false;
        for (var i = 0; i <= endIndex; i++) {
            ch = text.charAt(i);
            if (copy == false && (ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r')) {
                continue;
            }
            copy = true;
            trimText += ch;
        }
        return trimText;
    }

    vyho.lib.Utilities.removeAllChildren = function(parent) {
        if (parent == null) {
            return ;
        }
        while ( parent.hasChildNodes() ) {
            parent.removeChild(parent.firstChild);
        }
    }

    vyho.lib.Utilities.removeNodes = function(parent, nodes) {
        if (parent == null || nodes == null) {
            return ;
        }
        for (var i = nodes.length - 1; i >= 0; i--) {
            try {
                parent.removeChild(nodes[i]);
            } catch (err) {
            //ignore
            }
        }
    }

    vyho.lib.Utilities.extractText = function(text, beginMaker, endMarker, offset) {
        var beginMarkerIndex = offset;
        if (beginMaker) {
            beginMarkerIndex = text.indexOf(beginMaker, offset);
            if (beginMarkerIndex < 0) {
                return null;
            }
        }

        var endMarkerIndex = text.indexOf(endMarker, beginMarkerIndex + beginMaker.length);
        if (endMarkerIndex < 0) {
            return null;
        }
        return [text.substring(beginMarkerIndex + beginMaker.length, endMarkerIndex), beginMarkerIndex + beginMaker.length];
    }
    
    vyho.lib.Utilities.createStyle = function(doc, styleName, content) {
        try {
            var style = doc.createElement("style");
            style.type = "text/css";

            style.innerHTML = styleName + content; //" { border: solid 1px red;}";

            var heads = doc.getElementsByTagName("head");
            if (heads && (!(typeof heads == "undefined")) && heads != null && heads.length > 0) {
                heads[0].appendChild(style);
            } else {
                doc.body.appendChild(style);    //assume 1 body
            }
        } catch (err) {
            vyho.lib.Utilities.notify("Failed to set style information: ", err);
        }
    }
    
    vyho.lib.Utilities.removeToken = function(token, fromText) {
        var index = fromText.indexOf(token);
        var subLeft = fromText.substring(0, index);
        var subRight = "";
        if (fromText.length > token.length) {
            subRight = fromText.substring(index + token.length, fromText.length);
        }
        return vyho.lib.Utilities.trim(subLeft) + " " + vyho.lib.Utilities.trim(subRight);
    }

    vyho.lib.Utilities.trim = function(text) {
        if (text == null) {
            return "";
        }
        var trimText = "";
        var ch;
        var endIndex;
        for (endIndex = text.length - 1; endIndex >= 0; endIndex--) {
            ch = text.charAt(endIndex);
            if (ch == ' ' || ch == '\t') {
                continue;
            }
            break;
        }
        var copy = false;
        for (var i = 0; i <= endIndex; i++) {
            ch = text.charAt(i);
            if (copy == false && (ch == ' ' || ch == '\t')) {
                continue;
            }
            copy = true;
            trimText += ch;
        }
        return trimText;
    }
    
    vyho.lib.Utilities.hasClass = function(obj, name) {
        if (typeof obj == "undefined" || obj == null || typeof obj.className == "undefined") {
            return false;
        }
        var className = obj.className;
        return (className.indexOf(name) >= 0);
    }

    vyho.lib.Utilities.addClass = function(obj, name) {
        if (vyho.lib.Utilities.hasClass(obj,name)) {
            return;
        }
        if (typeof obj == "undefined" || obj == null) {
            return;
        }
        if (typeof obj.className == "undefined") {
            obj.className = name;
        } else {
            obj.className = obj.className + " " + name;
        }
    }

    vyho.lib.Utilities.removeClass = function(obj, className) {
        if (!vyho.lib.Utilities.hasClass(obj,className)) {
            return;
        }
        var currentClassName = obj.className;
        obj.className = vyho.lib.Utilities.removeToken(className, currentClassName);
    }

    vyho.lib.Utilities.pref_getValue = function(key, defVal) {
        var hasGmGetValue = false;
        var val = null;

        try {
            if ((typeof GM_getValue) != "undefined") {
                if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
                    hasGmGetValue = true;
                }
            }
        } catch (err) {
        }
        if (hasGmGetValue) {
            return GM_getValue(key, defVal);
        } else if (vyho.lib.Utilities.prefManager) {
            try {
                val = vyho.lib.Utilities.prefManager.getCharPref("extensions.vyho.lib.apps.cl." + key);
                if (typeof val == "undefined" || val == null) {
                    return defVal;
                } else {
                    if (val == "true") return true;
                    if (val == "false") return false;
                    return val;
                }
            } catch (err) {
                return defVal;
            }
        } else {
            //if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || window.opera) {
            if ((typeof localStorage) == "undefined" ) {
                vyho.lib.Utilities.notify("HTML5 local storage not supported.");
            } else {
                try {
                    val = localStorage.getItem("extensions.vyho.lib.apps.cl." + key);
                    if (typeof val == "undefined" || val == null) {
                        return defVal;
                    } else {
                        if (val == "true") return true;
                        if (val == "false") return false;
                        return val;
                    }
                } catch (e) {
                    return defVal;
                }
            }
        //}

        }
        return defVal;
    }

    vyho.lib.Utilities.pref_setValue = function(key, value) {
        var hasGmGetValue = false;
        try {
            if ((typeof GM_getValue) != "undefined") {
                if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
                    hasGmGetValue = true;
                }
            }
        } catch (err) {
        }
        try {
            if (hasGmGetValue) {
                GM_setValue(key, value);
                return;
            } else if (vyho.lib.Utilities.prefManager) {
                vyho.lib.Utilities.prefManager.setCharPref("extensions.vyho.lib.apps.cl." + key, value);
            } else {

                if ((typeof localStorage) == "undefined" ) {
                    vyho.lib.Utilities.notify("HTML5 localstorage not supported.");
                } else {
                    localStorage.setItem("extensions.vyho.lib.apps.cl." + key, value);
                }
            }
        } catch (err) {
        //vyho.lib.Utilities.notify("Local storage is: " + localStorage);
        //vyho.lib.Utilities.notify("Error setting preference for : " + key + ", and value: " + value, err);
        //if (err == QUOTA_EXCEEDED_ERR) {
        //}
        }
    }

    /**
     * Function to find the browser's window size
     * Return an array, 1st element is the width and 2nd is the height
     */
    vyho.lib.Utilities.getWindowSize = function(browserWin) {
        var width = 0;
        var height = 0;

        if (browserWin.innerHeight) {
            height = browserWin.innerHeight;
            width = browserWin.innerWidth;
        } else {
            if (browserWin.document.body && browserWin.document.body.clientHeight) {
                height = browserWin.document.body.clientHeight;
                width = browserWin.document.body.clientWidth;
            }
        }
        return [width, height];
    }

    vyho.lib.Utilities.getPageSize = function(browserWin) {
        var width, height;
        if (browserWin.innerHeight && browserWin.scrollMaxY) {
            width = browserWin.document.body.scrollWidth;
            height = browserWin.innerHeight + browserWin.scrollMaxY;
        } else if (browserWin.document.body.scrollHeight > browserWin.document.body.offsetHeight) {
            width = browserWin.document.body.scrollWidth;
            height = browserWin.document.body.scrollHeight;
        } else {
            width = browserWin.document.body.offsetWidth;
            height = browserWin.document.body.offsetHeight;
        }
        return [width, height];
    }
    
    vyho.lib.Utilities.getScrollPosition = function(browserWin) {
        var width, height;
        if (browserWin.innerHeight && browserWin.scrollMaxY) {
            width = browserWin.document.body.scrollWidth;
            height = browserWin.innerHeight + browserWin.scrollMaxY;
        } else if (browserWin.document.body.scrollHeight > browserWin.document.body.offsetHeight) {
            width = browserWin.document.body.scrollWidth;
            height = browserWin.document.body.scrollHeight;
        } else {
            width = browserWin.document.body.offsetWidth;
            height = browserWin.document.body.offsetHeight;
        }
        return [width, vyho.lib.Utilities.scrollTop(browserWin)];
    }
    
    vyho.lib.Utilities.scrollTop = function(browserWin) {
        return vyho.lib.Utilities.filterResults (
            browserWin.pageYOffset ? browserWin.pageYOffset : 0,
            browserWin.document.documentElement ? browserWin.document.documentElement.scrollTop : 0,
            browserWin.document.body ? browserWin.document.body.scrollTop : 0
            );
    }

    vyho.lib.Utilities.filterResults = function(n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
            n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
    }

    vyho.lib.Utilities.allowedNewTags = {
        "img": function(doc) {
            return doc.createElement("img")
        },
        "div": function(doc) {
            return doc.createElement("div")
        },
        "a": function(doc) {
            return doc.createElement("a")
        },
        "br": function(doc) {
            return doc.createElement("br")
        },
        "table": function(doc) {
            return doc.createElement("table")
        },
        "tr": function(doc) {
            return doc.createElement("tr")
        },
        "td": function(doc) {
            return doc.createElement("td")
        },
        "label": function(doc) {
            return doc.createElement("label")
        },
        "select": function(doc) {
            return doc.createElement("select")
        },
        "textarea": function(doc) {
            return doc.createElement("textarea")
        },
        "input": function(doc) {
            return doc.createElement("input")
        },
        "option": function(doc) {
            return doc.createElement("option")
        },
        "fieldset": function(doc) {
            return doc.createElement("fieldset")
        },
        "legend": function(doc) {
            return doc.createElement("legend")
        },
        "iframe": function(doc) {
            return doc.createElement("iframe")
        },
        "tbody": function(doc) {
            return doc.createElement("tbody")
        },
        "li": function(doc) {
            return doc.createElement("li")
        },
        "ul": function(doc) {
            return doc.createElement("ul")
        },
        "ol": function(doc) {
            return doc.createElement("ol")
        },
        "font": function(doc) {
            return doc.createElement("font")
        },
        "strong": function(doc) {
            return doc.createElement("strong")
        },
        "p": function(doc) {
            return doc.createElement("p")
        },
        "span": function(doc) {
            return doc.createElement("span")
        },
        "face": function(doc) {
            return doc.createElement("face")
        },
        "i": function(doc) {
            return doc.createElement("i")
        },
        "hr": function(doc) {
            return doc.createElement("hr")
        },
        "b": function(doc) {
            return doc.createElement("b")
        },
        "center": function(doc) {
            return doc.createElement("center")
        },
        "th": function(doc) {
            return doc.createElement("th")
        },
        "h1": function(doc) {
            return doc.createElement("h1")
        },
        "h2": function(doc) {
            return doc.createElement("h2")
        },
        "h3": function(doc) {
            return doc.createElement("h3")
        },
        "h4": function(doc) {
            return doc.createElement("h4")
        },
        "u": function(doc) {
            return doc.createElement("u")
        },
        "big": function(doc) {
            return doc.createElement("big")
        },
        "small": function(doc) {
            return doc.createElement("small")
        }
    };

    vyho.lib.Utilities.addNew = function(tag, parent) {
        if (!vyho.lib.Utilities.allowedNewTags.hasOwnProperty(tag)) {
            console.log("\"" + tag + "\",");
            throw "Unsupported new tag: " + tag;
        }
        var func = vyho.lib.Utilities.allowedNewTags[tag];
        var element = func(parent.ownerDocument);
        parent.appendChild(element);
        return element;
    }

    /**
     * String[text] (Node) -> Node
     * Creates a new text node.
     */
    vyho.lib.Utilities.newText = function(text, parent) {
        var e = parent.ownerDocument.createTextNode(text);
        parent.appendChild(e);
        return e;
    }

    /**
     * Node Node -> Void
     * Inserts newNode before target.
     * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
     */
    vyho.lib.Utilities.insertBefore = function(newNode, target) {
        var parent   = target.parentNode;
        var refChild = target; //target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
    }

    vyho.lib.Utilities.insertAfter = function(newNode, target) {
        if (newNode == null) return;
        var parent   = target.parentNode;
        var refChild = null;
        if (target) {
            refChild = target.nextSibling;
        }
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
    }

    vyho.lib.Utilities.addNewAfter = function(tag, target) {
        if (!vyho.lib.Utilities.allowedNewTags.hasOwnProperty(tag)) {
            console.log("\"" + tag + "\",");
            throw "Unsupported new tag: " + tag;
        }
        var func = vyho.lib.Utilities.allowedNewTags[tag];
        var newNode = func(target.ownerDocument);
        var parent   = target.parentNode;
        var refChild = target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
        return newNode;
    }

    vyho.lib.Utilities.addNewBefore = function(tag, target) {
        if (!vyho.lib.Utilities.allowedNewTags.hasOwnProperty(tag)) {
            console.log("\"" + tag + "\",");
            throw "Unsupported new tag: " + tag;
        }
        var func = vyho.lib.Utilities.allowedNewTags[tag];
        var newNode = func(target.ownerDocument);

        vyho.lib.Utilities.insertBefore(newNode, target);

        return newNode;
    }

    vyho.lib.Utilities.newTextBefore = function(text, target) {
        var newNode = target.ownerDocument.createTextNode(text);

        vyho.lib.Utilities.insertBefore(newNode, target);

        return newNode;
    }

    vyho.lib.Utilities.newTextAfter = function(text, target) {
        var newNode = target.ownerDocument.createTextNode(text);

        var parent   = target.parentNode;
        var refChild = target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);

        return newNode;
    }

    vyho.lib.Utilities.removeNode = function(node) {
        if (node == null) return;
        var parent   = node.parentNode;
        if (parent) parent.removeChild(node);
    }

    //todo: double check with built in function "escape"
    vyho.lib.Utilities.escapeUrl = function(data) {
        if (data == null) {
            return "";
        }
        if (true) {
            return escape(data);    //use builtin function
        }
        var text = "";
        for (var i = 0; i < data.length; i++) {
            var ch = data.charAt(i);
            if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
                (ch == '.') || (ch == '-')) {
                text += ch;
            } else if (ch == ' ') {
                text += "%20";
            } else {
                var ival = data.charCodeAt(i);
                var hex = ival.toString(16);
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
                text += "%" + hex;
            }
        }
        return text;
    }

    vyho.lib.Utilities.enclose = function(func, param1, param2) {
        return function(evt) {
            func.call(null, evt, param1, param2);
        }
    }

    vyho.lib.Utilities.attach = function(obj, funcName, param1, param2) {
        return function(evt) {
            obj[funcName](evt, param1, param2);
        }
    }

    vyho.lib.Utilities.runWith = function(obj, func, param1, param2) {
        return function(evt) {
            func.call(obj, evt, param1, param2);
        }
    }

    vyho.lib.Utilities.notify = function(message, objMesg) {
        if (typeof vyho.lib.Utilities.notifyCount == "undefined") {
            vyho.lib.Utilities.notifyCount = 0;
        }
        vyho.lib.Utilities.notifyCount++;
        
        if (vyho.lib.Utilities.notifyCount <= 100) {
            //alert(message);
            if (console && console.log) {
                console.log(message);
                if (typeof objMesg != "undefined") {
                    console.log(objMesg);
                }
            }
        }
    }

    vyho.lib.Utilities.getSelText = function(browserWin) {
        var txt = "";
        if (browserWin.document.getSelection) {
            txt = browserWin.document.getSelection();
        } else if (browserWin.document.getSelection) {
            txt = browserWin.document.getSelection();
        } else if (browserWin.document.selection) {
            txt = browserWin.document.selection.createRange().text;
        }
        return txt;
    }

    vyho.lib.Utilities.rand = function(num) {

        var text = "";
        for (var i = 0; i < num; i++) {
            text += Math.floor( Math.random() * 10);
        }
        return text;
    }

    vyho.lib.Utilities.EntityRegx = /&(#(?:x[0-9a-f]+|\d+)|[a-z]+[0-9]*);?/gi;
    //source: http://www.w3schools.com/tags/ref_entities.asp (note: there are more not yet supported)
    vyho.lib.Utilities.TextEntityMap = {
        "gt" : ">",
        "lt": "<",
        "eq": "=",
        "quot": "\"",
        "apos": "\'",
        "amp": "&",
        "cent": "¢",
        "pound": "£",
        "euro": "€",
        "sect": "§",
        "copy": "©",
        "reg": "®",
        "trade": "™",
        "sup2": "²",
        "sup3": "³",
        "hearts": "♥",
         "bull": "*",
        "nbsp": " "
    }

    vyho.lib.Utilities.parseEntity = function(text) {
        return text.replace(vyho.lib.Utilities.EntityRegx, function(group0, group1) {
            if (group1[0] === "#") {
                return String.fromCharCode(group1[1].toLowerCase() === "x" ? parseInt(group1.substr(2), 16)  : parseInt(group1.substr(1), 10));
            } else {
                return vyho.lib.Utilities.TextEntityMap.hasOwnProperty(group1) ? vyho.lib.Utilities.TextEntityMap[group1] : group0;
            }
        });
    }

    vyho.lib.Utilities.hover = function(evtObj, obj, hoverStyle, regularStyle, hoverFunc, regularFunc) {
        evtObj.addEventListener("mouseover", function(evt) {
            if (hoverStyle != null) obj.style.border = hoverStyle;
            if (hoverFunc != null) hoverFunc.call(null, evt);
        } , true);
        evtObj.addEventListener("mouseout", function(evt) {
            if (regularStyle != null) obj.style.border = regularStyle;
            if (regularFunc != null) regularFunc.call(null, evt);
        } , true);
        if (regularStyle != null && obj != null) obj.style.border = regularStyle;
    }

    vyho.lib.Utilities.closeIcon = "data:image/png;base64,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";
    vyho.lib.Utilities.closeIconHover = "data:image/png;base64,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";

    vyho.lib.Utilities.moveIcon = "data:image/png;base64,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";
    vyho.lib.Utilities.moveIconHover = "data:image/png;base64,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";

    vyho.lib.Utilities.titleIcon = "data:image/png;base64,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";
    vyho.lib.Utilities.titleIconHover = "data:image/png;base64,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";

    //------------------WINDOWING SYSTEM---------------------------//

    vyho.lib.ui.WinManager = function() {
        this.initialize = function(){
            this.childWindows = new Array();
        }

        this.addWindow = function(win) {
            for (var i = 0; i < this.childWindows.length; i++) {
                if (this.childWindows[i] == win) {
                    return;
                }
            }
            this.childWindows[this.childWindows.length] = win;
        }

        this.requestFocus = function(win) {
            var found = false;
            for (var i = this.childWindows.length - 1; i >= 0; i--) {
                if (this.childWindows[i] == win) {
                    this.childWindows.splice(i, 1);
                    found = true;
                }
            }
            if (found) {
                this.childWindows[this.childWindows.length] = win;
            }
            this.updateZIndex();
        }

        this.updateZIndex = function() {
            for (var i = 0; i < this.childWindows.length; i++) {
                this.childWindows[i].updateZIndex();
            }
        }

        this.getZIndex = function(win) {
            var curIndex = 1000;
            for (var i = 0; i < this.childWindows.length; i++) {
                if (win == this.childWindows[i]) {
                    return curIndex;
                }
                var childCount = this.childWindows[i].getChildCount();
                curIndex += childCount + 1;
            }
            return 0;
        }

        this.removeWindow = function(win) {
            for (var i = this.childWindows.length - 1; i >= 0; i--) {
                if (this.childWindows[i] == win) {
                    this.childWindows.splice(i, 1);
                }
            }
            this.updateZIndex();
        }

        this.initialize();
    }

    //@todo: this layout can work with any container (parent of window), not just browser window, all it needs is the bound of the window
    //layout is set for the parent window.  The parent window will call layout when its children are added, remove, resize, move, hide, show
    //container: must have left, right, width, height
    vyho.lib.ui.DockLayout = function(browserWin) {
        vyho.lib.ui.DockLayout.LEFT = "LEFT";
        vyho.lib.ui.DockLayout.RIGHT = "RIGHT";
        this.enabled = true;

        this.initialize = function(browserWin) {
            this.browserWin = browserWin;
            this.leftComponents = new Array();
            this.rightComponents = new Array();

        }

        this.addComponent = function(component, leftRight) {
            //note: not check for duplication
            if (leftRight == vyho.lib.ui.DockLayout.LEFT) {
                this.leftComponents[this.leftComponents.length] = component;
            } else {
                this.rightComponents[this.rightComponents.length] = component;
            }

            component.setLayoutManager(this);
            this.doLayout();
        }

        this.removeComponent = function(component) {
            var i;
            for (i = this.leftComponents.length - 1; i >= 0; i--) {
                if (this.leftComponents[i] == component) {
                    this.leftComponents.splice(i, 1);
                    component.setLayoutManager(null);
                    break;
                }
            }
            for (i = this.rightComponents.length -1; i >= 0; i--) {
                if (this.rightComponents[i] == component) {
                    this.rightComponents.splice(i, 1);

                    component.setLayoutManager(null);
                    break;
                }
            }
            this.doLayout();
        }

        this.removeAllComponents = function() {
            var i;
            for (i = this.leftComponents.length - 1; i >= 0; i--) {
                this.leftComponents[i].setLayoutManager(null);
            //this.leftComponents.splice(i, 1);
            }
            for (i = this.rightComponents.length - 1; i >= 0; i--) {
                this.rightComponents[i].setLayoutManager(null);
            //this.rightComponents.splice(i, 1);
            }
            this.leftComponents = new Array();
            this.rightComponents = new Array();
        }

        this.setEnabled = function(enabled) {
            this.enabled = enabled;
        }

        this.doLayout = function() {
            if (!this.enabled) {
                return;
            }
            this.doSideLayout(this.leftComponents, vyho.lib.ui.DockLayout.LEFT);
            this.doSideLayout(this.rightComponents, vyho.lib.ui.DockLayout.RIGHT);
        }

        this.doSideLayout = function(components, anchorOn) {
            var scrollBarSize = 0;
            //Note: need to find the scroll bar size.
            // for now, since there is no scroll bar (with the new listing window), set it to 0
            var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);
            var compCount = components.length;

            if (compCount == 0) {
                return;
            }
            var winHeight = dim[1];    //@todo find out what's going on with this 10 offset
            var height = winHeight/compCount;
            var curHeight = 0;
            for (var i = 0; i < components.length; i++) {
                var visible = components[i].visible;
                if (!visible) {
                    components[i].winHandle.style.display = "block";    //to get the width correctly
                }
                var width = components[i].getWidth();
                if (anchorOn == vyho.lib.ui.DockLayout.RIGHT) {
                    components[i].setLeft(dim[0] - width - scrollBarSize);
                } else {
                    components[i].setLeft(0);
                }
                components[i].setTop(curHeight);
                components[i].setHeight(height);

                if (visible) {
                    curHeight += height;
                } else {
                    components[i].winHandle.style.display = "none";
                }
            }
        }

        this.initialize(browserWin);
    }

    vyho.lib.ui.layoutConfig = {};
    vyho.lib.ui.layoutConfig.defaultTop = 0;
    vyho.lib.ui.layoutConfig.defaultHeight = 1.0 - vyho.lib.ui.layoutConfig.defaultTop;
    
    vyho.lib.ui.ScaleLayout = function(browserWin) {
        this.prevHeight = 0;
        this.prevWidth = 0;
        this.enabled = true;

        this.initialize = function() {
            this.components = new Array();
            this.componentRatios = new Array();
        }

        this.addComponent = function(component) {
            component.addLayoutChangeListener(new vyho.lib.ui.WindowLayoutListener(component.getId(), browserWin));
            this.components[this.components.length] = component;
            component.setLayoutManager(this);
            this.doLayout();
        }

        this.removeComponent = function(component) {
            for (var i = this.components.length - 1; i >= 0; i--) {
                if (this.components[i] == component) {
                    this.components.splice(i, 1);
                    component.setLayoutManager(null);
                    break;
                }
            }
            this.doLayout();
        }

        this.removeAllComponents = function() {
            for (var i = this.components.length - 1; i >= 0; i--) {
                this.components[i].setLayoutManager(null);
            }
            this.components = new Array();
        }

        this.setEnabled = function(enabled) {
            this.enabled = enabled;
        }

        this.doLayout = function() {
            if (!this.enabled) {
                return;
            }
            var dim = vyho.lib.Utilities.getWindowSize(browserWin);

            if (this.components.length == 0) {
                return;
            }

            for (var i = 0; i < this.components.length; i++) {
                //var visible = this.components[i].visible;
                //if (!visible) {
                //    this.components[i].winHandle.style.display = "block";    //to get the width correctly
                //}

                var widthRatio = vyho.lib.Utilities.pref_getValue(this.components[i].getId() + "_WidthRatio", 1);
                var heightRatio =  vyho.lib.Utilities.pref_getValue(this.components[i].getId() + "_HeightRatio", 
                    vyho.lib.ui.layoutConfig.defaultHeight);
                var topRatio =  vyho.lib.Utilities.pref_getValue(this.components[i].getId() + "_TopRatio", 
                    vyho.lib.ui.layoutConfig.defaultTop);
                var leftRatio =  vyho.lib.Utilities.pref_getValue(this.components[i].getId() + "_LeftRatio", 0);

                if (widthRatio != null && widthRatio != "") {
                    widthRatio = parseFloat(widthRatio);
                }
                if (heightRatio != null && heightRatio != "") {
                    heightRatio = parseFloat(heightRatio);
                }
                if (topRatio != null && topRatio != "") {
                    topRatio = parseFloat(topRatio);
                }
                if (leftRatio != null && leftRatio != "") {
                    leftRatio = parseFloat(leftRatio);
                }

                var width = vyho.lib.Utilities.roundInt(dim[0] * widthRatio);
                var height = vyho.lib.Utilities.roundInt(dim[1] * heightRatio );
                var left = vyho.lib.Utilities.roundInt(dim[0] * leftRatio);
                var top = vyho.lib.Utilities.roundInt(dim[1] *  topRatio);

                this.components[i].setLeft(left);
                this.components[i].setWidth(width);

                this.components[i].setTop(top);
                this.components[i].setHeight(height);

                /*
                var nwidth = this.components[i].getWidth();
                var nheight = this.components[i].getHeight();
                var nleft = this.components[i].getLeft();
                var ntop = this.components[i].getTop();

                    if (width != nwidth) {
                        var border = this.components[i].winHandle.style.borderWidth;

                    alert(this.components[i].title + ", w,h,l,t:" + width +
                                    " : " + nwidth + ", " + height + " : " + nheight + ", " +
                                        left + " : " + nleft + ", " + top + " : " + ntop);
                            }
                            */
                //if (!visible) {
                //    this.components[i].winHandle.style.display = "none";
                //}
                this.components[i].onResize(null);
            }
        }

        this.initialize();
    }

    vyho.lib.ui.WindowConfig = {};
    vyho.lib.ui.WindowConfig.smallTitleBarTop = 0;

    vyho.lib.ui.MiniWin = function(id, width, height, title, parentWin, doc, browserWin, winManager) {
        this.decorationColor = "#555555";
        this.selectedDecorationColor = "#4444FF";
        this.backgroundColor = "#FFFFFF";
        this.textColor = "#000000";
        this.borderWidth = 2;
        this.padding = 2;
        this.titleBarHeight = 30;
        this.titleIconSize = 26;
        this.miniTitleVisible = true;
        this.enableFocusPane = false;
        this.winManager = winManager;

        this.initialize = function(id, width, height, title, parentWin, doc, browserWin) {
            try {
                this.document = doc;
                this.browserWin = browserWin;
                this.parentWin = parentWin;
                this.id = id;
                this.winHandle = this.$(id);

                if (this.winHandle != null) {
                    //remove the handle:
                    this.winHandle.parentNode.removeChild(this.winHandle);
                    this.winHandle = null;
                }
                var dim = this.getWindowSize();

                if (!width) width = 600;
                if (!height) height = 550;

                this.winHandle = this.document.createElement("div");
                this.winHandle.id = id;
                if (parentWin) {
                    this.zIndex = parentWin.getZIndex() + 1;
                } else {
                    this.zIndex = 1001;
                }
                this.winHandle.style.zIndex = this.zIndex;
                //this.winHandle.style.height = height + "px";
                //this.winHandle.style.width = width + "px";
                this.winHandle.style.position = "fixed";
                this.winHandle.style.border = "solid";
                this.winHandle.style.borderWidth = this.borderWidth + "px";
                this.winHandle.style.borderColor = this.decorationColor;
                this.winHandle.style.margin="0px";    //this is the difference between offsetLeft and style.left
                //see http://www.w3.org/TR/CSS2/box.html
                //left + margin + border + padding => content
                this.winHandle.style.padding = "0px";
                this.winHandle.style.opacity = 1.0;
                this.winHandle.style.background = this.backgroundColor;
                this.document.body.appendChild(this.winHandle);

                this.winHandle.style.display = "block";
                //this.winHandle.style.top = (dim[1] - height)/2 + "px";
                //this.winHandle.style.left = (dim[0] - width)/2 + "px";
                this.setWidth(width);
                this.setHeight(height);
                this.setTop((dim[1] - height)/2);
                this.setLeft((dim[0] - width)/2);
                this.titleBar = vyho.lib.Utilities.addNew("div", this.winHandle);
                this.titleBar.style.height = this.titleBarHeight + "px";
                this.titleBar.style.width = "100%";
                this.titleBar.style.background = this.decorationColor;

                this.title = title;
                var titleId = "titleArea" + vyho.lib.Utilities.rand(10);
                //var text = "<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\" border=\"0\">";
                //text += "<tr><td><div id=\"" + titleId + "\" ></div></td>";
                //text += "<td width=\"22\"><div id=\"" + closeBtnId + "\" style=\"text-align: center; margin-left:auto; margin-right:auto;\"";
                //text += "></div></td></tr></table>";
                var table = vyho.lib.Utilities.addNew("table", this.titleBar);

                table.style.padding = "0px";
                table.style.borderSpacing = "0px";
                table.style.width = "100%";
                table.style.height = "100%";
                table.style.border = "0px";

                var tr = vyho.lib.Utilities.addNew("tr", table);

                var td;
                //////////////////////////////////////////////
                td = vyho.lib.Utilities.addNew("td", tr);
                td.style.width = this.titleBarHeight + "px";
                td.style.padding = "0px";
                this.minimizeBtn = this.createButton(td, "thinBtn" + vyho.lib.Utilities.rand(10), vyho.lib.Utilities.titleIcon, vyho.lib.Utilities.titleIconHover , this.onThinBtnMouseDown);

                ///////////////    Minimized title bar ///////////////////////////////////////
                this.minimizedTitleBar = vyho.lib.Utilities.addNew("div", this.winHandle);
                this.minimizedTitleBar.setAttribute("style", "position: absolute;");
                this.minimizedTitleBar.style.position = "absolute";
                this.minimizedTitleBar.style.zIndex = 10000;
                this.minimizedTitleBar.style.left = "50%";
                this.minimizedTitleBar.style.top = vyho.lib.ui.WindowConfig.smallTitleBarTop;
                this.minimizedTitleBar.style.float = "right";
                this.minimizedTitleBar.style.opacity = 1;
                this.minimizedTitleBar.style.display = "none";
                this.minimizedTitleBar.style.width = "80px";
                this.minimizedTitleBar.style.height = this.titleBarHeight + "px";
                //this.minimizedTitleBar.style.border = "thin solid black";
                this.minimizeTitle = true;

                var minBarTbl = vyho.lib.Utilities.addNew("table", this.minimizedTitleBar);
                minBarTbl.border = "0px";
                var miniBarTr = vyho.lib.Utilities.addNew("tr", minBarTbl);
                var miniBarTd = vyho.lib.Utilities.addNew("td", miniBarTr);
                this.restoreBtn = this.createButton(miniBarTd, "restoreBtn" + vyho.lib.Utilities.rand(10), vyho.lib.Utilities.titleIcon, vyho.lib.Utilities.titleIconHover, this.onNormalBtnMouseDown);
                miniBarTd = vyho.lib.Utilities.addNew("td", miniBarTr);
                /*
                    this.minimizedDragArea = vyho.lib.Utilities.addNew("div", miniBarTd);
                    this.minimizedDragArea.style.border = "thin solid black";
                    this.minimizedDragArea.style.width = "18px";
                    this.minimizedDragArea.style.height = "18px";
                    this.minimizedDragArea.style.background = "#ffffff";
                    this.minimizedDragArea.style.cursor = "move";
                    this.minimizedDragArea.textContent = "&lt;&gt;";
                    this.minimizedDragArea.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, this.onTitleAreaMouseDown, "", ""), false);
                    */
                this.minimizedDragArea = this.createButton(miniBarTd, "minimizedMoveBtn" + vyho.lib.Utilities.rand(10),
                    vyho.lib.Utilities.moveIcon, vyho.lib.Utilities.moveIconHover,null, "move");
                this.minimizedDragArea.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, 
                    this.onTitleAreaMouseDown, "", ""), false);

                miniBarTd = vyho.lib.Utilities.addNew("td", miniBarTr);
                this.minimizedCloseBtn = this.createButton(miniBarTd, "minimizedCloseBtn" + vyho.lib.Utilities.rand(10),
                    vyho.lib.Utilities.closeIcon, vyho.lib.Utilities.closeIconHover, this.oncloseBtnMouseDown);
                /////////////////////////////////////////////////

                td = vyho.lib.Utilities.addNew("td", tr);
                this.titleArea = vyho.lib.Utilities.addNew("div", td);
                this.titleArea.id = titleId;

                /////////////////////////////
                td = vyho.lib.Utilities.addNew("td", tr);
                td.style.width = this.titleBarHeight + "px";
                td.style.padding = "0px";

                if (this.title != null) {
                    this.titleArea.textContent = title;
                }

                this.closeBtn = this.createButton(td, "closeBtn" + vyho.lib.Utilities.rand(10), vyho.lib.Utilities.closeIcon, vyho.lib.Utilities.closeIconHover, this.oncloseBtnMouseDown);


                this.titleArea.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, this.onTitleAreaMouseDown, "", ""), false);
                this.titleArea.style.cursor = "move";
                this.titleArea.style.overflow = "hidden";
                this.titleBar.style.overflow = "hidden";

                var contentId = "contentArea" + vyho.lib.Utilities.rand(10);
                this.contentArea = vyho.lib.Utilities.addNew("div", this.winHandle);
                this.contentArea.id = contentId;
                this.contentArea.style.background = this.backgroundColor;
                this.contentArea.style.padding = this.padding + "px";
                this.contentArea.style.overflow = "auto";
                //this.contentArea.style.overflowX = "hidden";
                this.contentArea.style.width = "100% - " + (2 * this.padding);
                this.contentArea.style.height = (this.winHandle.offsetHeight - this.titleBar.offsetHeight - 2 * this.borderWidth -
                    2 * this.padding) + "px";

                //this.winHandle.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, this.onMouseDown, "", ""), false);
                //Note: add first so the event propagate to the other mouse move, etc

                vyho.lib.Utilities.hover(this.winHandle, null, null, null,
                    vyho.lib.Utilities.runWith(this, this.onWindowMouseOver, "", ""),
                    vyho.lib.Utilities.runWith(this, this.onWindowMouseOut, "", "")
                    );

                this.contentArea.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, this.onMouseDown, "", ""), false);
                this.winHandle.addEventListener("mousemove", vyho.lib.Utilities.runWith(this, this.onMouseMoveResizeSensor, "", ""), false);
                this.winHandle.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, this.onMouseDownResizeSensor, "", ""), false);
                    
                    
                //}
                this.childWindows = new Array();
                if (this.parentWin != null) {
                    this.parentWin.addWindow(this);
                } else {
                    this.winManager.addWindow(this);
                }
                this.sizeChangeListeners = new Array();
                this.closingListeners = new Array();
                this.closedListeners = new Array();
                this.visibleListeners = new Array();
                this.layoutChangeListeners = new Array();

                this.setVisible(true);
            } catch (err) {
                vyho.lib.Utilities.notify("initialize error ", err);
            }
        }

        this.getId = function() {
            return this.id;
        }

        this.setMiniTitleVisible = function(visible) {
            this.miniTitleVisible = visible;
        }

        this.setLayoutManager = function(layoutManager) {
            this.layoutManager = layoutManager;
        }

        this.createButton = function(container, id, src, hoverSrc, clickEventHandler, cursorStyle) {
            var button;
            /*
          button = vyho.lib.Utilities.addNew("div", container);
          button.id = id;
          button.style.textAlign = "center";
          button.style.marginLeft = "auto";
          button.style.marginRight = "auto";
          button.style.border = "thin solid black";
          button.style.height = 18 + "px";
          button.style.width = 18 + "px";
          button.style.background = "#FFFFFF";

          button.textContent = text;        //<span style=\"text-align: center; margin-left:auto; margin-right:auto;\">x</span>
          */

            button = vyho.lib.Utilities.addNew("img", container);

            button.style.height = this.titleIconSize + "px";
            button.style.width = this.titleIconSize + "px";
            button.id = id;
            container.appendChild(button);
            button.src = src;

            if (cursorStyle) {

                button.style.cursor = cursorStyle;
            } else {
                button.style.cursor = "default";
            }

            if (clickEventHandler) {
                button.addEventListener("mousedown", vyho.lib.Utilities.runWith(this, clickEventHandler, "", ""), false);
            }


            vyho.lib.Utilities.hover(button, null, null, null,
                function() {
                    //button.style.background = "#FF7700";
                    button.src = hoverSrc;
                },
                function() {
                    //button.style.background = "";
                    button.src = src;
                }
                );

            return button;
        }

        //        this.onWindowMouseDown = function(evt, param1, param2) {
        //            evt.preventDefault();
        //            evt.stopPropagation();
        //            this.requestFocus(null);
        //            if (this.miniTitleVisible) {
        //                if (this.minimizeTitle) {
        //                    this.minimizedTitleBar.style.display = "block !important";
        //                }
        //            }
        //        }

        this.onWindowMouseOver = function(evt, param1, param2) {
            if (this.miniTitleVisible) {
                if (this.minimizeTitle) {
                    this.minimizedTitleBar.style.display = "block";
                }
            }
        }

        this.onWindowMouseOut = function(evt, param1, param2) {
            //make sure it's actually out of the window, not on top of the glass pane
            if (this.glassPane == null) {   
                if (this.minimizeTitle) {
                    this.minimizedTitleBar.style.display = "none";
                }
            }
        }

        this.onThinBtnMouseDown = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();
            this.requestFocus();
            this.setMinimizeTitle(true);
            this.onResize(evt);
        }

        this.onNormalBtnMouseDown = function(evt, param1, param2) {
            this.requestFocus();
            this.setMinimizeTitle(false);
            this.onResize(evt);
        }

        this.setMinimizeTitle = function(minimize) {
            this.minimizeTitle = minimize;
            if (minimize) {
                this.titleBar.style.display = "none";
            //this.normalBtn.style.display = "block";
            } else {
                this.titleBar.style.display = "block";
                this.minimizedTitleBar.style.display = "none";
            }
        }

        this.onMouseMoveResizeSensor = function(evt, param1, param2) {
            var x = evt.pageX;
            var y = evt.pageY;

            var top = this.winHandle.offsetTop;
            var left = this.winHandle.offsetLeft;
            var width = this.winHandle.offsetWidth;
            var height = this.winHandle.offsetHeight;
            x -= this.browserWin.pageXOffset;
            y -= this.browserWin.pageYOffset;

            var cursor = this.resizeSensor(x, y, top, left, width, height);
            if (cursor == null) {
                cursor = "default";
            }
            this.winHandle.style.cursor = cursor;
        }

        this.onMouseDownResizeSensor = function(evt, param1, param2) {
            var x = evt.pageX;
            var y = evt.pageY;

            var top = this.winHandle.offsetTop;
            var left = this.winHandle.offsetLeft;
            var width = this.winHandle.offsetWidth;
            var height = this.winHandle.offsetHeight;
            x -= this.browserWin.pageXOffset;
            y -= this.browserWin.pageYOffset;
            this.resizeState = this.resizeSensor(x, y, top, left, width, height);
            if (this.resizeState == null) {
                this.resizeState = "default";
                return;
            }

            this.winHandle.style.cursor = this.resizeState;
            this.requestFocus(null);

            this.createGlassPane();
            this.glassPane.style.cursor = this.resizeState;

            this.deltaX = x - this.winHandle.offsetLeft;
            this.deltaY = y - this.winHandle.offsetTop;

            this.origWidth = width;
            this.origHeight = height;
            this.origLeft = left;
            this.origTop = top;
            this.origX = x;
            this.origY = y;

            if (this.windowMouseResizeListener != null) {
                this.document.removeEventListener("mousemove", this.windowMouseResizeListener, false);
            }
            this.windowMouseResizeListener = vyho.lib.Utilities.runWith(this, this.onResizeAreaMouseMove, "", "");
            this.document.addEventListener("mousemove", this.windowMouseResizeListener , false);

            if (this.windowMouseResizeUpListener != null) {
                this.document.removeEventListener("mouseup", this.windowMouseResizeUpListener, false);
            }
            this.windowMouseResizeUpListener = vyho.lib.Utilities.runWith(this, this.onResizeAreaMouseUp, "", "");
            this.document.addEventListener("mouseup", this.windowMouseResizeUpListener , false);
            evt.preventDefault();
            evt.stopPropagation();
        }

        this.resizeSensor = function(x, y, top, left, width, height) {
            var cornerSize = 20;
            var right = left + width - 1;
            var bottom = top + height - 1;
            //left

            if (x >= left && x <= left + this.borderWidth) {
                if (y >= top && y < top + cornerSize) {
                    return "nw-resize";
                }
                if (y < bottom && y > bottom - cornerSize) {
                    return "sw-resize";
                }
                return "w-resize";
            }
            //top
            if (y >= top && y < top + this.borderWidth) {
                if (x >= left && x < left + cornerSize) {
                    return "nw-resize";
                }
                if (x <= right && x > right - cornerSize) {
                    return "ne-resize";
                }
                return "n-resize";
            }

            if (x <= right && x > right - this.borderWidth) {
                if (y >= top && y < top + cornerSize) {
                    return "ne-resize";
                }
                if (y < bottom && y > bottom - cornerSize) {
                    return "se-resize";
                }
                return "e-resize";
            }

            if (y <= bottom && y > bottom - this.borderWidth) {
                if (x >= left && x < left + cornerSize) {
                    return "sw-resize";
                }
                if (x <= right && x > right - cornerSize) {
                    return "se-resize";
                }
                return "s-resize";
            }

            return null;
        }

        this.addSizeChangeListener = function(listener) {
            this.sizeChangeListeners[this.sizeChangeListeners.length] = listener;    //not check for dup
        }

        this.removeSizeChangeListener = function(listener) {
            this.removeListener(listener, this.sizeChangeListeners);
        }

        this.addVisibleListener = function(listener) {
            this.visibleListeners[this.visibleListeners.length] = listener;    //not check for dup
        }

        this.removeVisibleListener = function(listener) {
            this.removeListener(listener, this.visibleListeners);
        }

        this.addClosingListener = function(listener) {
            this.closingListeners[this.closingListeners.length] = listener;    //not check for dup
        }

        this.removeClosingListener = function(listener) {
            this.removeListener(listener, this.closingListeners);
        }

        this.addClosedListener = function(listener) {
            this.closedListeners[this.closedListeners.length] = listener;    //not check for dup
        }

        this.addLayoutChangeListener = function(listener) {
            this.layoutChangeListeners[this.layoutChangeListeners.length] = listener;    //not check for dup
        }

        this.removeClosedListener = function(listener) {
            this.removeListener(listener, this.closedListeners);
        }

        this.removeListener = function(listener, list) {
            for (var i = this.list.length - 1; i >= 0; i--) {
                if (this.list[i] == listener) {
                    this.list.splice(i, 1);
                }
            }
        }

        this.setContent = function(text) {
            this.contentArea.textContent = text;
        }

        this.onMouseDown = function(evt, param1, param2) {
            this.requestFocus(null);
        }

        this.addWindow = function(win) {
            for (var i = 0; i < this.childWindows.length; i++) {
                if (this.childWindows[i] == win) {
                    return;
                }
            }
            this.childWindows[this.childWindows.length] = win;
        }

        this.removeWindow = function(win) {
            for (var i = this.childWindows.length - 1; i >= 0; i--) {
                if (this.childWindows[i] == win) {
                    this.childWindows.splice(i, 1);
                }
            }
        }

        this.oncloseBtnMouseDown = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();
            this.close(evt);
        }

        this.close = function(evt) {
            if (!this.onWindowClosing(evt)) {
                return;
            }
            if (this.parentWin) {
                this.parentWin.removeWindow(this);
            } else {
                this.winManager.removeWindow(this);
            }
            for (var i = this.childWindows.length - 1; i >= 0; i--) {
                var win = this.childWindows[i];
                this.childWindows.splice(i,1);
                win.close();
            }
            this.winHandle.style.display = "none";
            this.document.body.removeChild(this.winHandle);
            this.onClosed(evt);
        }

        this.destroy = function(evt) {
            try {
                if (this.parentWin) {
                    this.parentWin.removeWindow(this);
                } else {
                    this.winManager.removeWindow(this);
                }
                for (var i = this.childWindows.length - 1; i >= 0; i--) {
                    var win = this.childWindows[i];
                    this.childWindows.splice(i,1);
                    win.destroy();
                }
                this.winHandle.style.display = "none";
                this.document.body.removeChild(this.winHandle);
                this.onClosed(evt);
            } catch (err) {
                //error handling here
                vyho.lib.Utilities.notify("err: ", err);
            }
        }

        this.onClosed = function(evt) {
            for (var i = 0; i < this.closedListeners.length; i++) {
                this.closedListeners[i].windowClosed(this, evt);
            }
            if (this.layoutManager) {
                this.layoutManager.doLayout();
            }
        }

        this.onWindowClosing = function(evt) {
            for (var i = 0; i < this.closingListeners.length; i++) {
                if (!this.closingListeners[i].windowClosing(this, evt)) {
                    return false;
                }
            }
            if (this.layoutManager) {
                this.layoutManager.doLayout();
            }
            return true;
        }

        this.setVisible = function(visible) {
            var prevVisible = this.visible;
            this.visible = visible;
            if (this.visible) {
                this.winHandle.style.display = "block";
            } else {
                this.winHandle.style.display = "none";
            }
            if (prevVisible != this.visible) {
                this.onVisible(this.visible);
            }
            if (visible) {
                var changed = false;
                var bounds = this.getBounds();
                if (bounds.top < 0) {
                    bounds.top = 0;
                    changed = true;
                }
                if (bounds.left < 0) {
                    bounds.left = 0;
                    changed = true;
                }
                if (bounds.width < 50) {
                    bounds.width = 50;
                    changed = true;
                }
                if (bounds.height < 50) {
                    bounds.height = 50;
                    changed = true;
                }
                if (changed) {
                    this.setBounds(bounds.top, bounds.left, bounds.width, bounds.height);
                }
            }
        }

        this.isVisible = function() {
            return this.visible;
        }

        this.setTransparent = function(level) {
            this.winHandle.style.opacity = level;
        }

        this.onVisible = function(visible) {
            for (var i = 0; i < this.visibleListeners.length; i++) {
                this.visibleListeners[i].onVisible(this, visible);
            }
            if (this.layoutManager) {
                this.layoutManager.doLayout();
            }
        }

        this.requestFocus = function(win) {
            if (win != null) {
                var found = false;
                for (var i = this.childWindows.length - 1; i >= 0; i--) {
                    if (this.childWindows[i] == win) {
                        this.childWindows.splice(i, 1);
                        found = true;
                    }
                }
                if (found) {
                    this.childWindows[this.childWindows.length] = win;    //add at the end as the focused item
                }
            }
            if (this.parentWin != null) {
                this.parentWin.requestFocus(this);
            } else {
                this.winManager.requestFocus(this);
            }
            //if this doesn't have children, then it's the focused window, and will have its window painted as such
            if (this.childWindows.length == 0) {
                this.titleBar.style.background = this.selectedDecorationColor;
                this.winHandle.style.borderColor = this.selectedDecorationColor;
                if (this.focusPane) {
                    this.winHandle.removeChild(this.focusPane);
                    this.focusPane = null;
                }
            } else {
                var child = this.childWindows[this.childWindows.length - 1];
                while (child.childWindows.length > 0) {
                    child = child.childWindows[child.childWindows.length - 1];
                }
                child.titleBar.style.background = child.selectedDecorationColor;
                child.winHandle.style.borderColor = child.selectedDecorationColor;
                if (child.focusPane) {
                    this.winHandle.removeChild(child.focusPane);
                    child.focusPane = null;
                }
            }
        }

        this.setEnableFocusPane = function(enable) {
            this.enableFocusPane = enable;
        }

        this.createFocusPane = function() {
            try {
                if (!this.enableFocusPane) {
                    return;
                }
                if (!this.focusPane) {
                    this.focusPane = vyho.lib.Utilities.addNew("div", this.winHandle);
                    this.focusClick = vyho.lib.Utilities.runWith(this, this.onFocusClick, "", "");
                    this.focusPane.addEventListener("mousedown", this.focusClick, false);
                }
                this.focusPane.style.zIndex = this.zIndex + 1000;
                this.focusPane.style.height = "100%";
                this.focusPane.style.width = "100%";
                this.focusPane.style.position = "absolute";
                this.focusPane.style.border = "0px";
                this.focusPane.style.margin="0px";    //this is the difference between offsetLeft and style.left
                this.focusPane.style.opacity = 0.1; // 0.01;
                this.focusPane.style.background = "#FFFFFF";
                this.focusPane.style.left = "0px";
                this.focusPane.style.top = "0px";
            } catch (error) {
                vyho.lib.Utilities.notify(error.getMessage() + ", this title: " + this.title);
            }
        }

        this.onFocusClick = function(evt, param1, param2) {
            this.requestFocus(null);
        }

        this.setActiveBorderColor = function(color) {
            try {
                this.selectedDecorationColor = color;
                this.titleBar.style.background = color;
                this.winHandle.style.borderColor = color;
            } catch (error) {
                vyho.lib.Utilities.notify(error.getMessage() + ", this title: " + this.title);
            }
        }

        this.setInactiveBorderColor = function(color) {
            try {
                this.decorationColor = color;
                this.titleBar.style.background = color;
                this.winHandle.style.borderColor = color;
            } catch (error) {
                vyho.lib.Utilities.notify(error.getMessage() + ", this title: " + this.title);
            }
        }

        this.setBackgroundColor = function(color) {
            try {
                this.backgroundColor = color;
                this.contentArea.style.background = color;
            } catch (error) {
                vyho.lib.Utilities.notify(error.getMessage() + ", this title: " + this.title);
            }
        }

        this.updateZIndex = function() {
            if (this.parentWin != null) {
                this.zIndex = this.parentWin.getChildZIndex(this);
            } else {
                this.zIndex = this.winManager.getZIndex(this);
            }
            try {
                if (this.winHandle && this.winHandle.style) {
                    this.winHandle.style.zIndex = this.zIndex;
                    this.winHandle.style.borderColor = this.decorationColor;
                }
                if (this.titleBar && this.titleBar.style) {
                    this.titleBar.style.background = this.decorationColor;
                }
            } catch (error) {
                vyho.lib.Utilities.notify(error.getMessage() + ", this title: " + this.title);
            }
            //set the titleBar background:
            
            for (var i = 0; i < this.childWindows.length; i++) {
                this.childWindows[i].updateZIndex();
            }
            this.createFocusPane();
        }

        this.getZIndex = function() {
            return this.zIndex;
        }

        this.getChildZIndex = function(win) {
            var curIndex = this.getZIndex() + 1;
            for (var i = 0; i < this.childWindows.length; i++) {
                if (this.childWindows[i] == win) {
                    return curIndex;
                }
                var childCount = this.childWindows[i].getChildCount();
                curIndex += childCount + 1;
            }
            return 0;
        }

        this.getChildCount = function() {
            var count = 0;
            for (var i = 0; i < this.childWindows.length; i++) {
                count += this.childWindows[i].getChildCount() + 1;
            }
            return count;
        }

        this.onResizeAreaMouseMove = function(evt, param1, param2) {
            var x = evt.pageX;
            var y = evt.pageY;
            x -= this.browserWin.pageXOffset;
            y -= this.browserWin.pageYOffset;

            evt.preventDefault();
            evt.stopPropagation();

            var deltaX = x - this.origX;
            var deltaY = y - this.origY;

            var newWidth = 0;
            var newHeight = 0;
            var dim = this.getWindowSize();
            var maxWidth = dim[0];
            var maxHeight = dim[1];
            if ((this.resizeState == "sw-resize") ||
                (this.resizeState == "se-resize")) {
                if (this.resizeState == "se-resize") {
                    newWidth = this.origWidth + deltaX;
                } else {
                    newWidth = this.origWidth - deltaX;
                }
                newHeight = this.origHeight + deltaY;
                if (newWidth >= 100 && newWidth < maxWidth) {
                    if (this.resizeState == "sw-resize") {
                        this.winHandle.style.left = this.origLeft + deltaX + "px";
                    }
                }
            }

            if ((this.resizeState == "nw-resize") ||
                (this.resizeState == "ne-resize")) {
                if (this.resizeState == "ne-resize") {
                    newWidth = this.origWidth + deltaX;
                } else {
                    newWidth = this.origWidth - deltaX;
                }

                newHeight = this.origHeight - (deltaY - this.deltaY);
                if (newWidth >= 100 && newWidth < maxWidth) {
                    if (this.resizeState == "nw-resize") {
                        this.winHandle.style.left = this.origLeft + deltaX + "px";
                    }
                }
                if (newHeight >= 100 && newHeight < maxHeight && (this.origTop + deltaY >= 0)) {
                    this.winHandle.style.top = this.origTop + deltaY + "px";
                }
            }

            if (this.resizeState == "w-resize") {
                newWidth = this.origWidth - deltaX;
                if (newWidth >= 100 && newWidth < maxWidth) {
                    this.winHandle.style.left = this.origLeft + deltaX + "px";
                }
            } else if (this.resizeState == "e-resize") {
                newWidth = this.origWidth + deltaX;
            } else if (this.resizeState == "n-resize") {
                var delta = deltaY;
                if (this.origTop + delta < 0) {
                    delta = 0 - this.origTop;
                }
                newHeight = this.origHeight - delta;
                if (newHeight >= 100 && newHeight < maxHeight) {
                    this.winHandle.style.top = this.origTop + delta + "px";
                }
            } else if (this.resizeState == "s-resize") {
                newHeight = this.origHeight + deltaY;
            }

            //adjusted for the difference between offsetWidth and style.width
            var styleWidth = parseInt(this.winHandle.style.width);
            var adjusted = 0;    //usually, it's 2 * border + 2 + padding  (but the reality when padding is 0, its 2 * border - 1
            if (styleWidth) {
                adjusted = styleWidth - this.winHandle.offsetWidth;
            }
            newHeight += adjusted;
            newWidth += adjusted;
            if (newHeight >= 100 && newHeight < maxHeight) {
                this.winHandle.style.height = newHeight + "px";
            }
            if (newWidth >= 100 && newWidth < maxWidth) {
                this.winHandle.style.width = newWidth + "px";
            }

            this.onResize(evt);
            this.onLayoutChange(evt);
        }

        this.onResize = function(evt) {

            try {
                if (this.sizeChangeListeners == null) {
                    return;
                }
                //question: why 5, it should be 2 * the border width, which is 6
                if (this.contentArea) {
                    this.contentArea.style.height = (this.winHandle.offsetHeight - this.titleBar.offsetHeight -
                        2 * this.borderWidth - 2 * this.padding) + "px";
                }
                for (var i = 0; i < this.sizeChangeListeners.length; i++) {
                    this.sizeChangeListeners[i].sizeChanged(this, evt);
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Error (8) on resize: ", err);
            }

        //if (this.layoutManager) {
        //  this.layoutManager.doLayout();
        //}
        }

        this.onLayoutChange = function(evt) {
            try {
                if (this.layoutChangeListeners == null) {
                    return;
                }
                for (var i = 0; i < this.layoutChangeListeners.length; i++) {
                    this.layoutChangeListeners[i].layoutChanged(this, evt);
                }
            } catch (err) {
                vyho.lib.Utilities.notify("Error (9) on layout change: ", err);
            }
        }

        this.onResizeAreaMouseUp = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();
            this.resizeState = "default";
            this.document.removeEventListener("mousemove", this.windowMouseResizeListener, false);
            this.document.removeEventListener("mouseup", this.windowMouseResizeUpListener, false);
            this.windowMouseResizeListener = null;
            this.windowMouseResizeUpListener = null;
            if (this.glassPane) {
                this.document.body.removeChild(this.glassPane);
                this.glassPane = null;
            }
            this.onResize(evt);
        }

        this.createGlassPane = function() {
            var dim = this.getWindowSize();
            if (this.glassPane) {
                this.document.body.removeChild(this.glassPane);
                this.glassPane = null;

            }
            this.glassPane = this.document.createElement("div");

            this.glassPane.style.zIndex = 5001;    //theoretically, get the largest value
            this.glassPane.style.height = dim[1] + "px";
            this.glassPane.style.width = dim[0] + "px";
            this.glassPane.style.position = "fixed";
            this.glassPane.style.border = "0px";
            this.glassPane.style.margin="0px";    //this is the difference between offsetLeft and style.left
            this.glassPane.style.opacity = 0.01;
            this.glassPane.style.background = "#FFFFFF";
            this.document.body.appendChild(this.glassPane);
            this.glassPane.style.left = "0px";
            this.glassPane.style.top = "0px";
        }

        this.onTitleAreaMouseDown = function(evt, param1, param2) {
            this.requestFocus(null);
            this.dragState = "DRAG";
            var x = evt.pageX;
            var y = evt.pageY;

            evt.preventDefault();
            evt.stopPropagation();

            this.createGlassPane();

            this.grabOffsetX = x - this.winHandle.offsetLeft;
            this.grabOffsetY = y - this.winHandle.offsetTop;

            if (this.windowMouseListener != null) {
                this.document.removeEventListener("mousemove", this.windowMouseListener, false);
            }
            this.windowMouseMoveListener = vyho.lib.Utilities.runWith(this, this.onTitleAreaMouseMove, "", "");
            this.document.addEventListener("mousemove", this.windowMouseMoveListener , false);

            if (this.windowMouseUpListener != null) {
                this.document.removeEventListener("mouseup", this.windowMouseUpListener, false);
            }
            this.windowMouseUpListener = vyho.lib.Utilities.runWith(this, this.onTitleAreaMouseUp, "", "");
            this.document.addEventListener("mouseup", this.windowMouseUpListener , false);
        }

        this.onTitleAreaMouseUp = function(evt, param1, param2) {
            evt.preventDefault();
            evt.stopPropagation();

            this.dragState = "NONE";
            this.document.removeEventListener("mousemove", this.windowMouseMoveListener, false);
            this.document.removeEventListener("mouseup", this.windowMouseUpListener, false);
            this.windowMouseMoveListener = null;
            this.windowMouseUpListener = null;
            if (this.glassPane) {
                this.document.body.removeChild(this.glassPane);
                this.glassPane = null;
            }
        }

        this.onTitleAreaMouseMove = function(evt, param1, param2) {
            if (this.dragState == "DRAG") {
                var x = evt.pageX;
                var y = evt.pageY;

                evt.preventDefault();
                evt.stopPropagation();

                var left = x - this.grabOffsetX;
                var top = y - this.grabOffsetY;
                var dim = this.getWindowSize();
                if (!dim) {
                    return;
                }
                if (left < 0) {
                    left = 0;
                }
                if (left + this.getWidth() >= dim[0]) {
                    left = dim[0] - this.getWidth();
                }
                if (top < 0) {
                    top = 0;
                }
                if (top + this.titleBar.offsetHeight >= dim[1]) {
                    top = dim[1] - this.titleBar.offsetHeight;
                }
                this.winHandle.style.left = left + "px";
                this.winHandle.style.top = top + "px";

                this.onResize(evt);
                this.onLayoutChange(evt);
            //if (this.layoutManager) {
            //this.layoutManager.removeComponent(this);
            //}
            }
        }

        this.getWindowSize = function() {
            var width = 0;
            var height = 0;
            if (this.browserWin.innerHeight) {
                height = this.browserWin.innerHeight;
                width = this.browserWin.innerWidth;
            } else {
                if (this.browserWin.document && this.browserWin.document.body && this.browserWin.document.body.clientHeight) {
                    height = this.browserWin.document.body.clientHeight;
                    width = this.browserWin.document.body.clientWidth;
                }
            }
            return [width, height];
        }

        this.$ = function(id) {
            return this.document.getElementById(id);
        }

        this.setTitle = function(title) {
            this.title = title;
            if (this.title != null) {
                this.titleArea.textContent = title;
            } else {
                this.titleArea.textContent = "";
            }
        }

        this.getWidth = function() {

            //var adjusted = 0;
            //adjusted = styleWidth - this.winHandle.offsetWidth;
            //var styleWidth = parseInt(this.winHandle.style.width);
            //if (styleWidth) {
            //    return styleWidth;
            //} else {
            //    return this.winHandle.offsetWidth;
            //}
            return this.winHandle.offsetWidth;
        }

        this.getHeight = function() {
            /*
            var styleHeight = parseInt(this.winHandle.style.height);
            if (styleHeight) {
                return styleHeight;
            } else {
                return this.winHandle.offsetHeight;
            }
                    */
            return this.winHandle.offsetHeight;
        }

        this.getTop = function() {
            /*
            var styleTop = parseInt(this.winHandle.style.top);
            if (styleTop) {
                return styleTop;
            } else {
                return this.winHandle.offsetTop;
            }
                    */
            return this.winHandle.offsetTop;
        }

        this.getLeft = function() {
            /*
            var styleLeft = parseInt(this.winHandle.style.left);
            if (styleLeft) {
                return styleLeft;
            } else {
                return this.winHandle.offsetLeft;
            }
                    */
            return this.winHandle.offsetLeft;
        }

        this.setTop = function(top) {
            this.winHandle.style.top = (0 * this.borderWidth + top) + "px";
        }

        this.setLeft = function(left) {
            this.winHandle.style.left = (0 * this.borderWidth + left) + "px";
        }

        this.setWidth = function(width) {
            var iwidth = parseInt("" + width);
            var dim = this.getWindowSize();
            if (iwidth > dim[0]) {
                iwidth = dim[0];
            }
            if (iwidth <= 0) {
                iwidth = 50;
            }
            this.winHandle.style.width = (0 - 2 * this.borderWidth + iwidth) + "px";
            if (this.winHandle.offsetWidth != iwidth) {
                var diff = iwidth - this.winHandle.offsetWidth;
                this.winHandle.style.width = (diff + iwidth - 2 * this.borderWidth) + "px";
            }
            this.onResize(null);
        }

        this.setHeight = function(height) {
            var iheight = parseInt("" + height);
            var dim = this.getWindowSize();
            if (iheight > dim[1]) {
                iheight = dim[1];
            }
            if (iheight <= 0) {
                iheight = 50;
            }
            this.winHandle.style.height = (0 - 2 * this.borderWidth + iheight) + "px";
            if (this.winHandle.offsetHeight != iheight) {
                var diff = iheight - this.winHandle.offsetHeight;
                this.winHandle.style.height = (diff + iheight - 2 * this.borderWidth) + "px";
            }
            this.onResize(null);
        }

        this.setBounds = function(top, left, width, height) {
            //var visible = this.isVisible();
            //this.setVisible(true);
            var dim = this.getWindowSize();
            if (left >= dim[0] || left < 0) {
                left = 20;
            }
            if (top < 0 || top >= dim[1]) {
                top = 20;
            }
            if (width > dim[0]) {
                width = dim[0];
            }
            if (height > dim[1]) {
                height = dim[1];
            }
            if (width < 50) {
                width = 50;
            }
            if (height < 50) {
                height = 50;
            }
            this.setLeft(left);
            this.setTop(top);
            this.setHeight(height);
            this.setWidth(width);

            this.onResize(null);
        //this.setVisible(visible);
        }

        this.getBounds = function() {
            return {
                top : this.getTop(), 
                left : this.getLeft(), 
                width : this.getWidth(), 
                height : this.getHeight()
            };
        }

        this.initialize(id, width, height, title, parentWin, doc, browserWin);
    }
    //--------------------------------------------------------------//

    vyho.lib.Serializer = function() {
        this.escapeChar = "Z";
        this.arrayStart = "[";
        this.arrayEnd = "]";
        this.objStart = "{";
        this.objEnd = "}";
        this.nameValSep = "=";
        this.separator = ",";
        this.nullChar = "n";
        this.emptyChar = "e";
        this.curIndex = 0;
        this.dataObject = null;
        this.error = null;

        this.initialize = function() {

        }

        this.escapeString = function(sdata) {
            if (sdata == null) {
                return this.escapeChar + this.nullChar;    //n = > null
            }
            if (sdata == "") {
                return this.escapeChar + this.emptyChar;
            }
            var res = "";
            if (isNaN(sdata) && sdata.length) {
                for (var i = 0; i < sdata.length; i++) {
                    var ch = sdata.charAt(i);

                    if (ch == this.arrayStart || ch == this.arrayEnd || ch == this.escapeChar ||
                        ch == this.separator || ch == this.nameValSep || ch == this.objEnd) {
                        res = res + this.escapeChar + ch;
                    } else {
                        res = res + ch;
                    }
                }
            } else {
                return "" + sdata;
            }
            return res;
        }

        //take a string and return into data array
        this.decode = function (sdata) {
            return this.decodeWithFactory(sdata, null);
        }

        this.decodeWithFactory = function (sdata, factory) {
            this.curIndex = 0;
            this.error = null;
            if (sdata == null) {
                this.dataObject = null;
                return this.dataObject;
            }
            this.dataObject = this.recursiveDecoder(sdata, factory);
            return this.dataObject;
        }

        this.printDataObject = function() {
            return this.printData(this.dataObject);
        }

        this.printData = function(dataObject) {
            var text = "";
            if (dataObject == null) {
                return "null";
            }
            if (this.isArray(dataObject)) {
                text = "[";
                for (var i = 0; i < dataObject.length; i++) {
                    if (i > 0) {
                        text += ", ";
                    }
                    text += this.printData(dataObject[i]);
                }
                text += "]";
            } else {
                text = dataObject;
            }
            return text;
        }

        this.recursiveDecoder = function (sdata, factory) {
            var res;
            if (sdata == null) {
                return null;
            }
            if (this.matchArray(sdata, this.curIndex)) {
                var array = new Array();
                this.curIndex++;
                var nextIndex;
                while (true) {
                    nextIndex = this.curIndex;
                    res = this.recursiveDecoder(sdata, factory);
                    if (nextIndex == this.curIndex) {
                        break;    //error condition
                    } else {
                        array[array.length] = res;
                    }
                    if (this.match(sdata, this.curIndex, this.arrayEnd)) {
                        this.curIndex++;
                        break;    //end of the array
                    }
                    if (this.match(sdata, this.curIndex, this.separator)) {
                        this.curIndex++;
                    } else {
                        //error?
                        break;
                    }
                }
                return array;
            } else if (this.matchObj(sdata, this.curIndex)) {
                var obj = {};
                if (factory != null) {
                    //@todo: based on class name, get the correct classes here
                    obj = factory.get("classNameGoesHere");
                }
                this.curIndex++;
                while (true) {
                    if (this.match(sdata, this.curIndex, this.objEnd)) {
                        this.curIndex++;
                        break;    //end of the array
                    }
                    var name = this.extractString(sdata);
                    if (name == null) {    //error, nothing found
                        break;
                    }
                    if (this.match(sdata, this.curIndex, this.nameValSep)) {
                        this.curIndex++;
                    } else {
                        break;
                    }
                    nextIndex = this.curIndex;
                    res = this.recursiveDecoder(sdata, factory);
                    if (nextIndex == this.curIndex) {
                        break;    //error condition
                    } else {
                        obj[name] = res;
                    }

                    if (this.match(sdata, this.curIndex, this.separator)) {
                        this.curIndex++;
                    } else {
                        continue;
                    }
                }
                return obj;
            } else if (this.match(sdata, 0, this.separator)) {
                //unexpected here
                return null;
            } else {
                var text = this.extractString(sdata);
                return text;
            }
        }

        this.extractString = function(sdata) {
            var i = this.curIndex;
            var text = "";
            var prevChar = null;
            for (i = this.curIndex; i < sdata.length; i++) {
                var ch = sdata.charAt(i);
                if (this.match(sdata, i, this.arrayEnd) ||
                    this.match(sdata, i, this.objEnd) ||
                    this.match(sdata, i, this.nameValSep) ||
                    this.match(sdata, i, this.separator)) {
                    if (prevChar != this.escapeChar) {
                        break;
                    }
                }
                if (prevChar == this.escapeChar) {
                    if (this.match(sdata, i, this.nullChar)) {
                        text = null;
                        i++;
                        break;
                    }
                    if (this.match(sdata, i, this.emptyChar)) {
                        text = "";
                        i++;
                        break;
                    }
                }
                if (ch == this.escapeChar && prevChar != this.escapeChar) {
                    prevChar = ch;
                    continue;
                }
                text += ch;
                if (prevChar != this.escapeChar) {
                    prevChar = ch;
                } else {
                    prevChar = null;
                }
            }
            this.curIndex = i;
            return text;
        }

        this.matchArray = function(sdata, idx) {
            return this.match(sdata, idx, this.arrayStart);
        }

        this.matchObj = function(sdata, idx) {
            return this.match(sdata, idx, this.objStart);
        }

        this.match = function(sdata, idx, token) {
            if (sdata.length > idx) {
                var ch = sdata.charAt(idx);
                if (ch == token) {
                    return true;
                }
            } else {
                if (token == null) {
                    return true;    //match the end
                }
            }
            return false;
        }

        this.encodeObj = function(adata) {
            if (adata == null) {
                return this.escapeString(adata);
            }
            var obj = new Object();
            var res = this.objStart;
            var i = 0;
            for (var field in adata) {
                if (typeof field == "function") {
                //continue;
                }
                if (i > 0) {
                    res += this.separator;
                }
                res += field;
                res += this.nameValSep;    //@todo: make sure to escape and make constant var for this
                res += this.encode(adata[field]);
                i++;
            }
            res = res + this.objEnd;
            return res;
        }

        this.encode = function(adata) {
            if (adata == null) {
                return this.escapeString(adata);
            }
            if (this.isArray(adata)) {

                return this.encodeArray(adata);
            } else if (this.isFuncObj(adata)) {
                return this.encodeObj(adata);
            } else if (this.isObj(adata)) {
                return this.encodeObj(adata);
            }
            return this.escapeString(adata);
        }
        this.encodeArray = function(adata) {
            if (!adata) {
                return "";
            }
            var res = this.arrayStart;
            for (var i = 0; i < adata.length; i++) {
                var arrayElement = adata[i];
                if (i > 0) {
                    res += this.separator;
                }
                if (this.isArray(arrayElement)) {
                    res += this.encode(arrayElement);
                } else {
                    res += this.encode(arrayElement);
                }
            }
            res = res + this.arrayEnd;
            return res;
        }

        this.isArray = function(data) {
            if (data == null) {
                return false;
            }
            if (data instanceof Array) {
                return true;
            }
            return false;
        }

        this.isFuncObj = function(data) {
            if (data == null) {
                return false;
            }

            if (typeof data == "function") {
                return true;
            }
            return false;
        }

        this.isObj = function(data) {
            if (data == null) {
                return false;
            }

            if (typeof data == "object") {
                return true;
            }
            return false;
        }

        this.restoreString = function(sdata) {
            if (sdata == null) {
                return null;
            }
            var res = "";
            for (var i = 0; i < sdata.length; i++) {
                var ch = sdata.charAt(i);
                if (ch == this.escapeChar) {
                    i++;
                    if (i < sdata.length) {
                        ch = sdata.charAt(i);
                        res = res + ch;
                    }
                    continue;
                } else {
                    res = res + ch;
                }
            }
            return res;
        }

        this.initialize();
    }

    //------------------------------------------------------------------------------//
    vyho.lib.net.StandardAjaxRequest = function (paramArray) {

        this.initialize = function(paramArray) {
            this.url = paramArray.url;
            this.method = paramArray.method;
            this.headers  = paramArray.headers;
            this.contentHandler = paramArray.contentHandler;
            this.data = paramArray.data;
            if (typeof paramArray.synchronous == "undefined" || paramArray.synchronous == false) {
                this.synchronous = false;
            } else {
                this.synchronous = true;
            }
        }

        this.send = function() {
            this.connection = new XMLHttpRequest();
            if (this.synchronous == false) {
                this.connection.onreadystatechange = vyho.lib.Utilities.runWith(this, this.handleReadyState);
            }

            try {
                this.connection.open(this.method, this.url, this.synchronous == false);

                if (this.headers) {
                    for (var header in this.headers) {
                        this.connection.setRequestHeader(header, this.headers[header]);
                    }
                }
                    
                var resp = this.connection.send(this.data);
                if (this.synchronous) {
                    this.contentHandler.apply(null, [this.connection]);
                }
            } catch (error) {
            //alert("Failed to connect, error: " + error);
            }
        }

        this.handleReadyState = function() {
            if (this.connection.readyState == 4) {
                if (this.connection.status == 200) {
                    this.contentHandler(this.connection);
                }
            }
        }
        this.initialize(paramArray);
    }

    vyho.lib.net.GmAjaxRequest = function(paramArray) {
        this.initialize = function(paramArray) {
            this.url = paramArray.url;
            this.method = paramArray.method;
            this.headers  = paramArray.headers;
            this.contentHandler = paramArray.contentHandler;
            this.data = paramArray.data;
            if (typeof paramArray.synchronous == "undefined" || paramArray.synchronous == false) {
                this.synchronous = false;
            } else {
                this.synchronous = true;
            }
        }
        this.send = function() {
            var onload = vyho.lib.Utilities.runWith(this, this.handleReadyState);
            if (this.synchronous) {
                onload = null;
            }
            var resp = GM_xmlhttpRequest({
                method : this.method,
                url : this.url,
                headers : this.headers,
                onload : onload,
                data : this.data,
                synchronous: this.synchronous
            });
            if (this.synchronous) {
                this.handleReadyState(resp);
            }
        }
        this.handleReadyState = function(responseDetails, param1, param2) {
            if (responseDetails.readyState == 4) {
                if (responseDetails.status == 200) {
                    this.contentHandler(responseDetails);
                }
            }
        }
        this.initialize(paramArray);
    }

    vyho.lib.net.AjaxRequestFactory = {};
    vyho.lib.net.AjaxRequestFactory.getRequest = function(params) {
        var request;
        if (typeof GM_xmlhttpRequest != "undefined") {
            request = new vyho.lib.net.GmAjaxRequest(params);
        } else {
            request = new vyho.lib.net.StandardAjaxRequest(params);
        }
        return request;
    }

    //----------------------------------------------------------------------------------------//
    vyho.lib.ui.WindowHideListener = function() {
        this.onVisible = function(winObj, visible) {
            if (!visible) {
                winObj.setContent("");
            }
        }
    }

    vyho.lib.ui.WindowVisibleChangeListener = function(obj, method) {
        this.onVisible = function(winObj, visible) {
            obj[method](visible);
        }
    }

    vyho.lib.ui.WindowLayoutListener = function(windowName, browserWin) {
        this.browserWin = browserWin;
        this.windowName = windowName;

        this.layoutChanged = function(winObj, evt) {
            try {
                var width = winObj.getWidth();
                var height = winObj.getHeight();
                var top = winObj.getTop();
                var left = winObj.getLeft();
                if (width < 20) return;
                if (height < 20) return;

                var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);

                var widthRatio = 1;
                var heightRatio = 1;
                var leftRatio = 0;
                var topRatio = 0;


                if (dim[0] <= 0) {
                    widthRatio = 1;
                    leftRatio = 0;
                } else {
                    widthRatio = width / dim[0];
                    leftRatio = left / dim[0];
                }

                if (dim[1] <= 0) {
                    heightRatio = 1;
                    topRatio = 0;
                } else {
                    heightRatio = height / dim[1];
                    topRatio = top / dim[1];
                }

                //alert("Dim 0 is: " + dim[0] + " , dim1 is: " + dim[1] + " , width ratio : " + widthRatio);

                vyho.lib.Utilities.pref_setValue(windowName + "_LeftRatio", "" + leftRatio);
                vyho.lib.Utilities.pref_setValue(windowName + "_TopRatio", "" + topRatio);
                vyho.lib.Utilities.pref_setValue(windowName + "_WidthRatio", "" + widthRatio);
                vyho.lib.Utilities.pref_setValue(windowName + "_HeightRatio", "" + heightRatio);

                if (windowName == "PHOTO_WINDOW") { //@todo: set the name here to the correct one, and the next function should be called on CraigslistFusion
                //setPreviewImageSize(winObj.contentArea, winObj.browserWin);
                }
            } catch (error) {
                vyho.lib.Utilities.notify("Failed to save layout change for : " + windowName, error);
            }
        }
    }

    vyho.lib.ui.WindowSizeChangeListener = function(windowName, browserWin) {
        this.browserWin = browserWin;
        this.windowName = windowName;
        this.sizeChanged = function(winObj, evt) {
            var width = winObj.getWidth();
            var height = winObj.getHeight();
            var top = winObj.getTop();
            var left = winObj.getLeft();
            if (width < 20) return;
            if (height < 20) return;

            var dim = vyho.lib.Utilities.getWindowSize(this.browserWin);

            if (left >= 0 && left < dim[0]) {
                vyho.lib.Utilities.pref_setValue(windowName + "_Left", winObj.getLeft());
            }
            if (top >= 0 && top < dim[1]) {
                vyho.lib.Utilities.pref_setValue(windowName + "_Top", winObj.getTop());
            }
            vyho.lib.Utilities.pref_setValue(windowName + "_Width", winObj.getWidth());
            vyho.lib.Utilities.pref_setValue(windowName + "_Height", winObj.getHeight());

            if (windowName == "PHOTO_WINDOW") { //@todo: set the name here to the correct one, and the next function should be called on CraigslistFusion
            //setPreviewImageSize(winObj.contentArea, winObj.browserWin);
            }
        }
    }

    vyho.lib.ui.WindowClosingListener = function(windowName, handler) {
        this.windowName = windowName;
        this.handler = handler;
        this.windowClosing = function(winObj, evt) {
            winObj.setVisible(false);
            if (this.handler != null) {
                this.handler();
            }
            return false;
        }
    }

    vyho.lib.HashMap = function() {
        this.init = function() {
            this.data = new Object();
        }

        this.getSize = function() {
            var count = 0;
            for (var iter in this.data) {
                if (this.data[iter] != null) {
                    count++;
                }
            }
            return count;
        }

        this.compress = function() {
            var ndata = new Object();
            for (var iter in this.data) {
                if (this.data[iter] != null) {
                    ndata[iter] = this.data[iter];
                }
            }
            this.data = ndata;
        }

        this.put = function(key, item) {
            if (key == null) {
                return;
            }
            this.data["x_" + key] = item;
        }

        this.get = function(key) {
            if (this.contains(key)) {
                return this.data["x_" + key];
            }
            return null;
        }

        this.remove = function(key) {
            var item = null;
            if (this.contains(key)) {
                item = this.data["x_" + key];
                this.data["x_" + key] = null;    //better implementation would be to splice it, but then it would
            //cost time
            }
            return item;
        }

        this.clearAll = function() {
            this.data = new Object();
        }

        this.contains = function(key) {
            if (this.data["x_" + key] == null) {
                return false;
            }
            return true;
        }
        this.init();
    }

    vyho.lib.Resources = {};
    vyho.lib.Resources.detailIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMhBMepEHkAAALvSURBVDhPRdNNa1xVHIDx55x77rkzd5Lp5HXRNrZBDdVChaIuXARBCi4U6s4P4MKFNOI3ESVE8BuIq67ElVCqSF8EMYjFNm0SJclkJskk9+W8/V0U6Rf4rZ5HiYgAwBkxlpApspTAabAQtGBooIVYdBGgBXpyyiSUqP+BE6CfPPs656Mv73HUXcCdjshzi6iCPBPufvoqHQURUAJWTl8AeLixcYet1OOdyyXXVpbJsOhWSN3Iz3/us7l9TD+ecWftTVTyENsXwMsbj7k+b1i5/BLbx5AcROcxXYNSwqDQnJ+D+4+esLlT8eCzqxQRlPhGrq4/4o2lWfpzM6yvdlBJIdrhsXzwPfx4s+bG7cj5wRQLtuFwOObuk4bf1pbRI1OACryyNMXOUYtDkTToECgk4I6PAMMPN2G0O2Z4mriwNCBD6KYG/eFXP/HaxUV2xorW9eiIJ/kIugtKI6qiynK0dLj98Qzj1rN34Lh2ybDyzVPMoZpndXmBx/94pG5AOug8A4FKFIfR8O63/1J7y7npRGENfWpWLvXY3G0wBks1GbIXp3HhFNE9IkDjKfOWB58sUggg4AXe/+6IZ2qObjRUYRdttEdh6DQjEpEKTQZkNiBiKcQRFIgO6AwO2wnaVVBVmHIKbc4cVTHAUdImRQlkCdCGOrcgDYYjlIAGdAsWR986VN2gfWH5e2ufYBNO16h4TNTgydAA0qdiQFARFeDAThNp+WMr0qVB/3rrdZ4OHf3pWYq6gSwjA/Kg6CRIQSgA4wsgYNyY3qDk2XDE/VvXMSoJF5stJvst3UFJwxQdgEzReiiKMypKbK7J0Fw4p9kdOwpaVGyel3hsCt7b+B3pDJjqnLBdl8T2hIkoZhqP7/bJy8CsLemFRHUw5Je1t9CAkrYWrKVNmrfX/6LIHaFnmF0c0KSMRGQ6c4z2atpKCBU8/PwKOiS00c9nipwBPUJyJG1Z/foeB3qe2djgU4GKFpjw8IsrZCERRGPymkDBf61FgHo9uoXNAAAAAElFTkSuQmCC";
    //vyho.lib.Resources.mapIcon = "data:image/png;base64,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";
    vyho.lib.Resources.mapIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMlKwgU6CQAAAMBSURBVDhPRdNNa1xVHIDx55x7zrlzM5l00kxq0lathlr7goJIIagrVy60uBDcuhRSC/o9BFsRdCHoxqVduRdEaINCqw3iC41VknQyk8lk5s59Oefcv4si/QK/1fMoEREA8IRoIQEjNXgFzlITcETwQrQtlEAh0NZTjmIb9T9QAan3HFrLlU9uMTRdYj3FOUcMGrGWW+8/xzxQK4gCmZo+Bmjgtes/sGN6rD/V4dLaKVIHUkC0BZu/j9h6cMiCn/Ljh5dBAkj1GDj7+RYvP2F5fu0M9wcBQ0asIkUoSZKEOWc4s2z45c/73Nsp2Ny4QEtAiS/l4md/8OKTx1lZPcn+QcnXb3je+iYlZJHv3k5RIVIaePemsLKYMOzvsvVwzN2Ni5gDk4IKPP3sErsHFYeVplEdvn0HogVBUFgMcPNKoJGEq5un+He3z0w8+s0b33P+9Akm+w35UUVeVUTAKDAAUhINmKaiEYNWMNndp3tyldc/vYceqh5nn1lmp66pXIbH4qTBAwke0CQCQafoJpAL7BWGl9Z6jKWLMThmkwFlqUmSgA8afIJ2Gg+8+uUAZzvMYs5P73WxGEobOSgsc3GAMdqjMNR0GEfB+D1IWlz6YsSSLbGLxzFqhkiHV77agyQjTQMSpgRzDG3ymlnaZaIGzKt9chyoDGumyHwbFQpMpTEyRs+1IVMUqs0szch0g/ap46/tPl2dMigdMeTUGvIAdYCpRPpS0oSaA7HUZeCYHTHc2WFWDNG3P7jA34MaN9fB6Bm6ANdA22uqqsJjaBqovaXth0xTj273+Gf7kF8/uoxWjXC63KYeP6Cz0CXMlYw0DGxF1c5R9UNGUiMSmGjLapKSjAYonUJMHpU4Ninr1++w2OuQLPQIowl9XxOlphMzdNqmnPcsZwluXLPXn/LztXOkEZRUheAcFZr1G7eZSIeVJUU40cOqitBoWroh7B8xGjSo0HBn4xzeOhzFo5kiOUKLQEMLywsf/0awgczO4/MxZAtQl9y9dh6vwAIzBEXBf9tvkbyIv7GGAAAAAElFTkSuQmCC";
    //vyho.lib.Resources.directionIcon = "data:image/png;base64,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";
    vyho.lib.Resources.directionIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMlDzQXDPUAAAMISURBVDhPRZRLa1xlAIaf73K+M+fMTG4zgdY2YpsmYBt14yrgKu5FxIX/QKRWf0oRqYKguBPc+QOkKmgR8VqsoiXRGJImk0kmc+ZcvvNduojiH3iezfu8IsYYASog8wWnqsfLt+9xaIa01ZSO6SG8JqaOr19fIxNgAQ0koUD8Bwgett79kn0GbF5ZYH31ElKCaQHluPfwiF93J8yHkrs3n0URITT/A67e2eaFCynXV59gb3pusXWN0h6DwCQ5wz78vLPN/b9Lvrt5gyyCiG0db9z5g+dWlrh2ccDBVFLohG47QWlDGRIEChkqdKboJ4Hd/YKdvSO+eWMNOdYpCMeTK0vslBGhGhrbchYTTn1C7TzTqqVyHYqiZTRzXFudp3EK6RPE5jt348XLa/TnF6mKikrm5J0U2xbE0FI6zWcv5Wx9allONMrAQBUcVDN+H9XIYzFk7coyRyHhRBhsPWNv/4BxqSimgsP9GuMjX72Sc2AdVd1yFiQblwxJOUNrDOV0hBwbWt/h89cWCbbBmowOClA4NDrUfPFqzoufnBLjmCK5ShAjpJYtAk2RKJpYUfhANBkagIQ2aLSHKC1BQO0bTvUKZ9OSVlRoPbOU6QI2nhFFYOvjfyiDRkSHxlOVLQ/eWkGEnI2P/mRBK/LoGYhIz+XoNjU83Dkk7VjGrSHppSRRoxwEPU8iZzR0efr9XYa9OVwnYon8uBeZqQT57a3r/DWydLpLSEps28e1DVPZIa0mROPY+PCELJegppSiptfv8mj/kN/efAopQuRyvUM5OmHQzSnkEVY6hLNMRIZFofUBQhdMFVxQIE8eoVQXXHK+xIlO2br9A9lyRjbssz0J5M5TTApiLwPjMGqR5VygT2qOjiu+v7WO8SBiU0WMwXvJ8+89QGCQQ83cICOQU+kZ885THZacHjtk8Px0cx2rEwyz85g8MxxdUs4o2zk2P7hPFR1z3jMWHQY2oVINv7z9DO7flEvOT0DEEKMXLcpFGmFIBSADLZEA6POUsEBrS1KTo9wMtEF4x2ON+5RGTBOrdAAAAABJRU5ErkJggg==";
    vyho.lib.Resources.spamIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMjOjT+b1AAAAMdSURBVDhPRdNNb1RVAIDh93zcc+fODNNpKzK0jaXEVktJQDBp3GHCFl2YmJhooguMoOLCf6EJm2JjunCh/gBXboxGkRhjhGJSPrRqSzpIW/rhzNx7Z+7HOccFMfyBZ/W+wnvvAaCkKDQyAOUsFIBR5AIMDrIMG0Z4IANqPqZXVhH/A6mHqs34V4ecu/wj+1GLskhQApSQoCJ+emeaigALCA/Gx48B6+DswjUeiBbzT0XMPtsCoSAtCKuKn+9ucnujQ8MmXPvgeYQrwGaPgaNLvzM/LHju2DRre5D0Bf1+DtITKU2zrhgbheura9xup9x4b47QgvDFwM8trnJ6fAJ9uEmRxtzr1Lj6igck5AMwhjNflbScZfJQxP1/2tzYT7n5dgu9p0MQJTNH4NZWyednJYFJGNg6gQJpDCWC71824Ape+rrPiakhlu/HGN9An1v4gdmJadZ2BrR3Ld6MgoOKLzn5WYehhsannquvGxCezu6AdnWI6ak6xxf+QO6KJ5ieOsh6WuHbN0YxJVgLVkuW32piUk8jKnjhSwvU+O7NIe519zg1NoJGIDWGtLdDEgsMYIVn/otNEiQexTevNdjMq/SdAlmgnKKMPRtOU5IgtSwQaHQRk3tQokdPCl5cWkOKElTKr68akqRHbgO8tHSlx+QZjgipk5w0bJIFPQIAX0cXHVRFcPKTLUpRJw8C7rw7iiFGWE+UZwgzwJgUWYSGv9a3UY0mM1f+BiQr52fYjkv2lWH24z+ReLTXoOqML7aJmoaVDQFpgP7l0jHmFteYfaZOv+qwCryHuxefpuJjCjGCcAJwZEIyEsWEzQYPVra4eekoWjjPxGCd9OEkleE6x5dWeJhKdi4cAVUhkAovLIcvr3KoEdI8+CT5XpduWSfT1UcldnTImSvLjLbGKFWHbnGAva4lTWMi20cOhURhlfHhBoNul/39gpXzk4BH+KzvMYYBklMf3UE2BAdqEfWWJFcVysJRDTSD3R7t7S41p/jt/TmUA1f4RzNZEpSrgSxwPuDEp7fIcgiDAmsDAuvB9rn+4Wmc83gUIeAl/Acdv3x3lPzPSgAAAABJRU5ErkJggg==";
    vyho.lib.Resources.markedSpamIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90EBBE4L7k83CMAAAKqSURBVDjLVZS9SitRFIW/PTMncYgxRQKmMtFCC3vB5/AJLAQFsbFIQAcvIYmNCIK1nU/gE9j4BCJipQERf6MZYsbJmXNuEWcud7f77MVaa699xFpr+a3xeIzneVhrSZIEz/MAEBHiOEYpBUA6orVGUoAkSVIc2u02nucxHo8RERzHwXVdGo0GjuP8B5IBGGPodrskScLCwgJLS0uICFEU4fs+Nzc3PDw8ABAEAcYYjDH/ADqdDtVqleXlZd7e3hiNRkRRhIjgeR7FYpFyuczt7S29Xo8gCLDWIlpr2263qdfrVCoVRqMR/X6fjY2NzBelFGdnZ7iuS7Va5fHxkefnZxqNBl6qpVar8fT0xNraGkoptNa4rotSCmst6+vrGGM4Pz+nXq/T6/UQEdxcLvdnbm6OOI55fX1ldXU1M/P4+Jjr62uurq5YWVlBRLi8vCSfz+P7PhcXFzjGGObn5wnDkO3tbYwxJEmC4zjs7u4SxzG+73N6eoqIsLOzw8fHB7VaDQBHRAjDkOFwiIgAcHJygjEGgM3NTaIomuxcBGttZrC1Fifdq9Z6spbfR0dHR1kGtra2GA6HJEmCiGQsAZwoivA8DxHJGGityefzdDodAFzXZX9/nzQvaUqVUjhKKe7v75menqbVagHQbDYZDAZYa7PBFKjVajEzM0Ov1+Pn5wcvCALa7TaLi4v0+/2MYjqYSkrL932KxSJ3d3cEQYCXRvL9/Z1SqcTh4SHD4ZCDgwNc182k7e3tUSqVqFQqfH19MR6PJ32ttQXodrvMzs5mlzcYDPj+/sZaS6FQYGpqinK5TBiGfH5+0mw2JwzjOLZKKYwxBEFAoVCgUChQqVQQEbTW5HI5+v0+Ly8viAhBEGQxFzup//R2u93s/pMkyf6HVquV5cNxHESEvzFJgNJWtQhTAAAAAElFTkSuQmCC";
    vyho.lib.Resources.emailIcon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMiFYY0Y0gAAAMQSURBVDhPRdPdbhVVHIbxZ61Za2Z/2tqPpIWmtLQbkrbhSKMSiQfGeMw9eKAEQxPDVRArgiUhnnjgDRhugJgIRCVRAiWh6UfoLoXa7+nee2bWmvX3oBpu4PecvK8SEQEAhxOLVhCFHpQWsYYcT4USCqGMKwhQADU5phMaqP+BHlAtjzmIGly++YjteAjXS6nEDVRpkMTz4MsWVXUCGMCG47dAKOHTH35li0EuTvZzbuo0WkPsgMjzaOUfljYO6Qtd7l+9QIRAyN8CZ++scWkkYWbqFJvpSaXIMiJTEqOIbY2hJjxZX+Ppyy5/Xp2lKqDEZTJ7Z5nZsUlmTlnanRinHeItJFD4QI19ulGdhlQYqjjW3mzzZPWY5/PnMXsmAeWZHg38vdul40tM4bA2J+wFAPYrA1if4kPBGyvMToyyvP6cIKAu3rovo2MtarUaP332DkEHFAYBjCvw1mACZFpTKcFruPzLIe+qHf7YDOhdNURrcpitPU2hNR/c3Sfy4EMBRjCiCVowlHx4dw8TwGc5AxOTBJ2jDTHddIeuS7HA4y8GmftxkwoxpUoIIUeHiI++X+O3KwM4Da9UA1Nk6EzQRjsUhqKsAB6C5vFXp5m49QpND60TZm6v8/DaNBEOqzz9nZcUnQOsUmjTKegm/TT9azQGlOe9716wNj/CmW9XObO4wdLXw5xfWCXDkmHYsZNUYkVhYoxLYlbWt3ndGKYLTC+ssnX9HELO2jezKAEnsDJ/ltaNJV5cn6IednjWdvhQh0xEphZX5fN7bXEiIq4Uka5k4kVKkRBEnBQSRKR0XiQ4uXQvldbiUwmliFFBGMvWyQ/G+fjnNu0UtMvBJKg8xVhFrmK076KrfYzXPVY8NRS5/m+Jhybhk5u/Ux0boa8Ou0eQFpbMO2x5RL8NFM0+xiPFntOk7V3+mp9D4VCS94Q4RtBcWFgmTxTDA56BwSa9qI9edgTNKsVGmzRtIrnj2bUWRnog1ZMzlXQoqRJ7ITcR799+SGqa1LKcxNQ40pp+yXhwZY5YhE5kqIcOQp1/Aef7qK+gcr+QAAAAAElFTkSuQmCC";
    vyho.lib.Resources.favIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMeKK2vVqYAAAMHSURBVDhPRZNLa1xlAEDP97wzd6ZO0kxKW1trE2tJo936ogvRrYJb1y4Ug/0rRW3BhRuX4sKfoCISRQSDVNGWPDQ0ySQzmdd9fI/7uQjiHzhnc45IKSWAEmjHGaeqyzv3NjmyfXw5pWW7iKhJWeCH92/QFuAADZhmhvgP0ER449PveMISr15f4PnVp5ESrAdUYPPxgId/j+k1Bd9s3EaRoKn/B6w82ObOxYxbq5fZn55ZXFWhdMQisCanfw62drb5ba/g54112glE8lVaf/AXL1w7z8qlHoOpJomGqWvh9ZwqdLmaRhQmo2MVrSxj72SHR7uHbH3wEnKoMxCB21fb/DmSmJAY1S3MvOKr19t8/SYcpi4mKSZFYjwMrPWvkbsMB8i3PvmWtSsX+ON0kZjV7KcZEBi6FkklMu2pRyVDl+FdyVxEjmrH5WeWefneFvJE9LlxfZliNqGsNGUpeDKeMD3dRZGoG8Np4ZhNpoSqZFJO2Z8XrK8sMjc5WmMppsfU6SnmhxO+f/ciUQtUWAI8WsLme31K4dGc4+0vx7gYKGaCXl0gtfQINKWLGKNwUqBiDdITUk0ASAFDQPuKiSvxLcNcwlh30HruKLIFqmxEVcNrXwzweshgYtj+cIWsCTx3/xEq79HTksYWyKZBSUVmp0ifWR7vHKFFQCqPbGmMUCzpDgZoGk2Wd+i1DNZaBIbzPrH9T2Ls28ifPrrF7rGjl0ucCDRBUaY2UY5JJIKuCVVGlSpcc8LMRGTvHPt7A/Y2VtGiSVypdiiGy/QWljkYjjFxTtXKefazHbIUkDmkZJgqwyVlUaNjhMwgqrMSxzrjzv3fWVjsknciB75FOUuI5BCqQieD7+YstxV27Dg4mvHL3ZtkEUSqy4S1NEHy4ucPUc7QWeqSX5DEmKhiQd92mQxOGB03iNDw68ZNvLFYyrOZInMklgpHosMrH/9IbZYwoabuWDpDTdQVW3fX8AIMUJAQlIjUpBSFR1UGMoBAFBoVHUhLEiCSxwlD8CXWtNGxICmDCJ5/AdBsmFCMCxLRAAAAAElFTkSuQmCC";
    vyho.lib.Resources.markedFavIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMgAjfRhA0AAAMUSURBVDhPRZPJbhxFAEBfLV3d09PjeJkJxPEhTjCRbYTEJYdICCG+ALggceIUhCzyKxZLIiTCiX+AGxEHlCALYoPYrBA7wcQ4Y3vsnumtuqo4WIgfeO/yngghBIAS6LgxI5Xx5vo9DkwfW+YkJkM4TYhbvnt/iY6ABtBA5MeI/wDewRuffMtT5ri+OM2LVy4iJRgLqJZ7D5/xy5MTzvmCu2svowjg6/8Bl2894tXnY1auzLOXn1maqkJph0FgopR+D7Z2HvHz44KNtVU6AUSwVVi9tc3q4gKXnks4LBIaC0rX2MYTR4YWDz4gI8Ogc8yvRxW722M2P1hCHukYRMvKwHOclzTVIT07opxURGlMUzY0fkJrJZNhyc4wY3VuDu8ckhZx/aO74cLCEnNTs/wpEqbqU2LR0BjDsZ3ifGhomoqjouKbt1NClPHWVxO65T4bew3yUPRZWhwwdC0de0xeZ+Rulqqo6dlT8rLg77zl63f6uCjD2Zq6nDC4vIiNDFpjKPIhw6JHah1lM8Lj8ZkniIpiGHP/vWlsK1ESXvsyx8xOo/IR3apBa2kRaKDgsFXcf3cW0cLynT00LVs3zoO3CCm59sVTVJrg21MqHSOEQOtJQxFPE1dDGjcC36PVhgc3LqICWB8wMuLaZ9skmcTJltCdwbUnjKVC2tjwcOeAkGac+ozlO3+hAePOajNC8MLt3wjJNONogAyGOD/gybOCFJDff7jC7rAhTTVRpEgSz/zHf+AUBAEvrT8gyvo4VZPYA0aqJJ7p83i34qe1RbTwgYVqh3xfkvZTisPAuazLpU836Jku9cw8Tv3DlOuSq4gLyqCOhwgZg1NnJZ7omNdv/0g6E9NNE/brHmXVQGWRMsVEOU23y6CjMCcN+wdjfrh5ldiBCHUZMAZqycrnv6NFSzY7y8xcTd5qtEopkhqzN+J46BGtZ3PtKjYyGMqzmRwTVOgShKUk4pX1TehokuBoLbgowlSwdXMZKyACCgKCEhF8CE5YVIjAOVohQQV062mExkigsjSdiNaWmKiDdgVBRYjW8i/zvI73M96GwAAAAABJRU5ErkJggg==";
    vyho.lib.Resources.delFav = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMfGwtkBvEAAAL1SURBVDhPRZPbalxlAEbXf9r/7DlkkjSRHgKSxlrbgjdFxIIKei945SsoBPsqIrX0AbzyKYoXEkQEQ82N1kzS1kMyyWSSvWfv/R+9COILrO9ifUvknDNAA5Sx4kwN+fSrHY6KNXxzQa8YIqIm28APn9+iFOAADZhUIf4DpAgfP/qev7jCg81l3ty6gZRQeEAFdp4fs/dizjgteLr9NooMqfsfcPPxPu9ftdzdus6ri8sV17YoHSkQFKbP2gh2J/s8O1zw0/Y9ygwi+zbfe/wb71zvs/TGJotp4EwrVrqOYAWqUTgbSSkxKBQ9azk8mfD7wT/sfvEu8lRbEIGNtzaYHEdMSliXmIYSFzraoqOLCZMV54vM/DRwZ+11+s7iAPHg66f52sYtVpZKKtejiw5daHKyEFqSTcTUI4cCE2eIos94ACfTKZODE/SJWOODzXX2XmbaLDGx5ujsDCOvQA4oEYk4pLCMVEMTIxWK+zdX+PXPBq0pWFxMyVEwryM7n92AXBLUAC1qSMtkCS0ezYhPvpvjYmBRCcbdAqmlR6A5dX2SljQCsrbIDD5J4NKIIaB9y7lr8D1DLWGuB2hdOxZ2Gas8oWv58NsJ5ymyFCytNpR+hk81tR4y1pJULJApoaTCFhdobwueT47o+prYGGSvZOgdGIXSgbbXYPQS405RSEWHY9Vn9l9m5r5E/vjlXQ6mjhVrcGpOFSWN8NQiM6gbSIrKlbS5xaUTKhOR4xGvDo853N5CipTZaCecT0+5ujTG5TO64HBdw0z1cdlAeEHOgQtpuKYsajZFSAtRXT5xri0ffbPLYMUyWB3yxzxR5EQ1r6Dfo1ABYcesl4pi7vj7qOLnh7exEUTumkxREJLk/qM9dDbI13qM1vuE3KOVNaspsZjOmE0TIiR+2b6NNwUFzWVMkRrPAEtFHYe89+QZbQqsZ8FUGEbO4FVg9+EdvAADLMgIGkROOUfhUQ68MRgBGchEQJIRZCABwTcUpkTHBVkZRPD8C0abmwb51CpIAAAAAElFTkSuQmCC";
    vyho.lib.Resources.hideIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwMgH1TX6NQAAAMZSURBVDhPRZNNa1xVAEDP/XjvzZt5M9Mkk6TWJjKWBJqKFXRRBN3UhRS6UEQQl8Uq0upfEZoGF8VFt1LQrVBRF1JrVo0WY4yNtiFmMjOdr/fmfd17XQTxD5yzOUc45xzAFAjNhIGKeOuze3T8FsV0TMWPEEbjgpIfP1ohFJADGvDsBPEfwBq4uP4DB8zxavsEq2eeRUrwC0CV3Ns94uHjIU2b8N21F1E4sNn/gOc3HvHayYC1M6fYHx9b8jRFaYOPwPeqtOrwYO8Rv/ydsHntHKED4YrUndvY4fzyMyy05uiMpsQmIAwlDTJyZYkNqImiqBa0o5D9zgGb+yk7H7fRfR2AKGkv1/jtn6fcedMH4OKdCWXVx88Mfedx922fTPi899WAs0uL/P54C4oYefnG95w9vcDeJKaX+MSyBtJw952Io0FML8/45nIAFoyFoBjTGWcsLi/xwueHyJ5osdKeJ0sC6hXNpdtjMJJcwLfvN/n63RmUX2AcXPqyR696iv4458KSJkUhNT7JuEs2GVE4S6OSc+GLp/iUCAuelCRo3rjdxfqWwmSUhWOQlbRcF6llgUAz9EPSLGFqpxw6h3EaWVoUUDWWbpxRoMFM6BMxspqRjJA6zkmCE9iyIDUJ42HCn1fnUSIj1wosOKXYur5A/6jApgNc2WNWC0rpIYvAZ3evg9Y+g1GFn66cJAdi53F+Y5v2zT8QZABsf7DAUWwhavDrbhdhp8j7n6zxVzenGdaQ8ghkAwWsbOxQjerUm4rlG4dgFCUQSEs9THnSTdm+vooW1nE63WPQNdQW51i7tY3NM8KZGZIyw+Eh6znP3XpCJAuqMw3y/ojENCgJjksc6oDXb26x2KihmjUOMo88iUlciYehokF7IfNRhel4zPBpwYMrSyAFwmVTh++TI3ll/SG5qjDbrNCYnVJqjSvrlNpiO0MO+wmRDtj8cBXpwDqOZzLEKAJsJigCxcvrPzP1WoRFl0RAKGbQxYj7n76EcRZpNRUBCBDOOmdEgcqh9D1sOUXqEI2FUgKAsORKogqLkikon9RpnIN/AcqljpfN7k/AAAAAAElFTkSuQmCC";  // vyho.lib.Resources.delFav;  //can consider to use the same spam button for this.
    vyho.lib.Resources.unHideIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90EBBQCKXM9ZYQAAALqSURBVDjLZZPNa1xVGMZ/5z3nzMzNfIGMQoUMDMm0pWApFhduRDfWnUsXbkUEwYUo+cB8mInWbtzEhbjzD3AlFhUUUVxIRSkKSmhgJkgWzqSZm/nIvXPvOcdF6Ij22T3wvj94Ht5XhRACwBkQuTFDXWGv00EpRZIkFItFvPdYa3ljbZ1IwQwwgPVj1AOAd/D+zV3yPKfdbrO0tISI4JxDRNjf36fX66GUYnV9BU0An/4L6HQ6NJtNlpeXieOYEAJJkqC1RkSw1lKr1Tg4OKDb7fL25iZRABWyJLz73ge0Wi0ajQZxHJPnOVEUISIopciyjDRNsdYye/Qy4a+79Ho9Njfewdw3RQAWFxc5Ojrii5c/A+DZT16gXC6T5zlZlvHtK7cBuPHpizSbTQ4PDyGboKvGbDebTQCGwyHd6/cA6F6/x2M/PI5zju9e/ZIHav3SRkQoFAp8fvsrxHtPrX2NJEmIooin956bD//4+jd8/9rXc//Mx89jrWU0GnFh6RLee0QpxXh0ymQywXtPqVTi0oc3+L9aH72E1noe6SxJERFERHgkP0VESNOUPM+xyfFDgNLJPgDOOZxzmHQMgCRJgjFmTj49PeX39Z8fAvyx8SuDwYD7mZDnOcPKBZRSiLWWbreLMYbRaMTdlZ/mS5d3rnFx++rc/7Z2Bx//zcLCAuM/75x3sLK5Sb/fp1wuo5SaD1/cvkqlUqFWq/0HorWmVCrR7/fZ2lrFKB/w3jMYDGg0Gjxx8ymyLKNSq+C9RylFFEVc2X0SYwyVeoU4jnHOkVM8v8TYFNnb3aVer1OtVplOp0ynU5xzKKWw1mKtpVqtMh6PieOY9bfeBFGokJ4FCgVmCLc6HUSEer1OvV5HRM5zinBycsLx8TGFQoGV1TUkgA+cP5NjgqaITxVZUXNrZwetNc45vPcYY3DOsbq1gQse8YaSAhSo4ENwKkPPIC9YfH6GmAiDh1zOm1OemRZ05tGSgC6QBEMI8A+0YGRvsveXEAAAAABJRU5ErkJggg==";

    vyho.lib.Namespace.defineNamespace(vyho, "lib.parser");

    vyho.lib.parser.Optional = function(list) {
        this.definitions = list;
        this.getType = function() {
            return "Optional";
        }

        this.print = function() {
            var text = "";
            for (var i = 0; i < this.definitions.length; i++) {
                text += this.definitions[i].print();
            }
            return this.getType() + ": " + text;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());

            var res = [];
            var nIndex = index;
            for (var i = 0; i < this.definitions.length; i++) {
                var def = this.definitions[i];

                var defProcess = def.process;
                if (typeof def.process == "undefined" || def.process == null) {
                    if (this.process && this.process.recur) {
                        def.process = this.process; 
                    }
                }
                try {
                    var node = {};
                    nIndex = def.match(text, nIndex, node, grammar);
                    if (nIndex >= 0) {
                        res[res.length] = node;
                    } else {
                        return index;
                    }
                } catch (err) { //todo: check the type of error
                    //try next
                    throw err;
                } finally {
                    def.process = defProcess;
                }
            }

            result.type = this.getType();
            result.value = res;
            result.process = this.process;
            return nIndex;
        }
    }

    vyho.lib.parser.ConstRange = function(ranges, multi, process) {
        this.ranges = [];
        this.multi = multi;
        
        if (typeof multi == "undefined") {
            this.multi = true;
        }
        
        this.process = process;
        for (var i = 0; i < ranges.length; i++) {
            this.ranges[i] = {};
            this.ranges[i].lo = ranges[i].lo;
            this.ranges[i].hi = ranges[i].hi;
        }

        this.getType = function() {
            return "ConstRange";
        }

        this.print = function() {
            var text = this.getType() + ": ";
            for (var i = 0; i < this.ranges.length; i++) {
                text += "{lo: " + this.ranges[i].lo + "," + "hi: " + this.ranges[i].hi + "} ";
            }
            return text;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            try {
                if (text.length <= index) {
                    return -1;
                }
                var value = "";
                var newIndex = index;
                while (newIndex < text.length) {
                    if (this.isMatch(text, newIndex)) {
                        value += text.charAt(newIndex);
                        newIndex++;
                        if (!this.multi) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                if (newIndex == index) {
                    return -1;
                }
                result.type = this.getType();
                result.value = value;
                result.process = this.process;
                return newIndex;
            } catch (err) { //todo: check the type of error
                //try next
                throw err;
            }
            return -1;
        }
        
        this.isMatch = function(text, index) {
            var charCode = text.charCodeAt(index);
            for (var i = 0; i < this.ranges.length; i++) {
                var range = this.ranges[i];
                if (range.lo.charCodeAt(0) <= charCode && charCode <= range.hi.charCodeAt(0)) {
                    return true;
                }
            }
            return false;
        }
    }

    vyho.lib.parser.ConstSet = function(constext, multi, process) {
        
        this.init = function() {
            if (typeof multi == "undefined") {
                this.multi = true;
            } else {
                this.multi = multi;
            }
            this.constmap = {};
            if (typeof constext != "undefined") {
                for (var i = 0; i < constext.length; i++) {
                    this.constmap["_" + constext.charAt(i)] = true;
                }
            }
            this.process = process;
        }

        this.getType = function() {
            return "ConstSet";
        }

        this.print = function() {

            return constext;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            try {
                if (text.length <= index) {
                    return -1;
                }
                var value = "";
                var newIndex = index;
                while (newIndex < text.length) {
                    if (this.isMatch(text, newIndex)) {
                        value += text.charAt(newIndex);
                        newIndex++;
                        if (!this.multi) {
                            break;
                        }
                    } else {
                        break;
                    }
                }
                if (newIndex == index) {
                    return -1;
                }
                result.type = this.getType();
                result.value = value;
                result.process = this.process;
                return newIndex;
            } catch (err) { //todo: check the type of error
                //try next
                throw err;
            }
            return -1;
        }
        
        this.isMatch = function(text, index) {
            var ch = text.charAt(index);
            if (typeof this.constmap["_" + ch] == "undefined") return false;
            //return this.constmap["_" + ch];
            return true;
        }
        
        this.init();
    }

    vyho.lib.parser.StringSet = function(strList, process) {
        this.init = function() {
            this.strList = [];
            if (typeof strList != "undefined") {
                for (var i = 0; i < strList.length; i++) {
                    this.strList[i] = strList[i];
                }
            }
            this.process = process;
        }

        this.getType = function() {
            return "StringSet";
        }

        this.print = function() {

            return constext;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            try {
                for (var i = 0 ; i < this.strList.length; i++) {
                    var str = this.strList[i];
                    if (text.length >= index + str.length) {
                        if (str == text.substr(index, str.length)) {
                            result.type = this.getType();
                            result.value = str;
                            result.process = this.process;
                            return index + str.length;
                        }
                    }
                }
                return -1;
            } catch (err) { //todo: check the type of error
                //try next
                throw err;
            }
            return -1;
        }
        
        this.init();
    }

    vyho.lib.parser.AllChars = function(excludes, process) {
        this.excludes = excludes;
        this.process = process;

        this.getType = function() {
            return "AllChars";
        }

        this.print = function() {
            var text = this.getType() + ": " + this.excludes;
            return text;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            try {
                if (text.length <= index) {
                    return -1;
                }
                var newIndex = index;
                var value = "";
                while (text.length > newIndex) {
                    if (this.isMatch(text, newIndex)) {
                        value += text.charAt(newIndex);
                        newIndex++;
                    } else {
                        break;
                    }
                }
                if (newIndex == index) {
                    return -1;
                }
                result.type = this.getType();
                result.value = value;
                result.process = this.process;
                return newIndex;
            } catch (err) {
                throw err;
            }
            return -1;
        }

        this.isMatch = function(text, index) {
            var charCode = text.charCodeAt(index);
            for (var i = 0; i < this.excludes.length; i++) {
                var exc = this.excludes.charCodeAt(i);
                if (exc == charCode) {
                    return false;
                }
            }
            return true;
        }
    }

    vyho.lib.parser.Const = function(value, process) {
        this.process = process;
        this.value = value;
        this.getType = function() {
            return "Const";
        }

        this.print = function() {
            return this.getType() + ": " + this.value;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            //log(this.print());
            try {
                if (text.length > index) {
                    var c = text.charAt(index);
                    if (this.value == c) {
                        result.type = this.getType();
                        result.value = c;
                        result.process = this.process;
                        //log("Const match: " + this.value);
                        return index + 1;
                    }
                }
                return -1;
            } catch (err) { //todo: check the type of error
                //try next
                throw err;
            }
            return -1;
        }
    }

    vyho.lib.parser.getConstList = function(list) {
        var items = new Array();
        for (var i = 0; i < list.length; i++) {
            items[i] = new vyho.lib.parser.Const(list[i]);
        }
        return items;
    }

    vyho.lib.parser.range = function(beg, end) {
        var arr = [];
        for (var i = beg.charCodeAt(0); i <= end.charCodeAt(0); i++) {
            arr[arr.length] = String.fromCharCode(i);
        }
        return arr;
    }

    vyho.lib.parser.join = function() {
        var arr = [];
        for (var j = 0; j < arguments.length; j++) {
            var a = arguments[j];
            for (var i = 0; i < a.length; i++) {
                arr[arr.length] = a[i];
            }
        }
        return arr;
    }

    vyho.lib.parser.Token = function(name, process) {
        this.process = process;
        this.name = name;
        this.getType = function() {
            return "Token";
        }

        this.print = function() {
            return this.getType() + ": " + name;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());

            var def = grammar.getDef(this.name);
            var defProcess = def.process;
            if (typeof def.process == "undefined" || def.process == null) {
                if (this.process && this.process.recur) {
                    def.process = this.process; 
                }
            }

            try {
                var node = {};
                var nIndex = def.match(text, index, node, grammar);
                if (nIndex >= 0) {
                    result.type = this.getType();
                    result.value = node;
                    result.name = this.name;
                    result.process = this.process;
                    return nIndex;
                } else {
                    return -1;
                }
            } catch (err) { //todo: check the type of error
                //try next
                throw err;
            } finally {
                def.process = defProcess;
            }
            return -1;
        }
    }

    vyho.lib.parser.And = function(list, process) {
        this.process = process;
        this.definitions = list;

        this.getType = function() {
            return "And";
        }

        this.print = function() {
            var text = "";
            for (var i = 0; i < this.definitions.length; i++) {
                text += this.definitions[i].print();
            }
            return this.getType() + ": " + text;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            //log(this.print());
            var res = [];
            var nIndex = index;
            for (var i = 0; i < this.definitions.length; i++) {
                var def = this.definitions[i];

                var defProcess = def.process;
                if (typeof def.process == "undefined" || def.process == null) {
                    if (this.process && this.process.recur) {
                        def.process = this.process; 
                    }
                }

                try {
                    var node = {};
                    nIndex = def.match(text, nIndex, node, grammar);
                    if (nIndex >= 0) {
                        res[res.length] = node;
                    } else {
                        return -1;
                    }
                } catch (err) { //todo: check the type of error
                    //try next
                    throw err;
                } finally {
                    def.process = defProcess;
                }
            }
            //log("And match ");
            result.type = this.getType();
            result.value = res;
            result.process = this.process;
            return nIndex;
        }
    }

    vyho.lib.parser.Or = function(list) {
        this.definitions = list;
        this.getType = function() {
            return "Or";
        }

        this.print = function() {
            var text = "";
            for (var i = 0; i < this.definitions.length; i++) {
                text += this.definitions[i].print();
            }
            return this.getType() + ": " + text;
        }

        this.match = function(text, index, result, grammar) {
            vyho.lib.parser.stat.monitor(this.getType());
            for (var i = 0; i < this.definitions.length; i++) {
                var def = this.definitions[i];
                var defProcess = def.process;
                if (typeof defProcess == "undefined" || defProcess == null) {
                    if (this.process && this.process.recur) {
                        def.process = this.process;
                    }
                }

                try {
                    var node = {};
                    var nIndex = def.match(text, index, node, grammar);
                    if (nIndex >= 0) {
                        result.type = this.getType();
                        result.value = node;
                        result.process = this.process;
                        return nIndex;
                    }
                } catch (err) { //todo: check the type of error
                    //try next
                    throw err;
                } finally {
                    def.process = defProcess;   //this may not work with recursive calls, since it's too late at this point for restoration
                }
            }
            return -1;
        }
    }

    //vyho.lib.parser.count = 0;
    vyho.lib.parser.log = function(msg) {
        //vyho.lib.parser.count++;
        //if ( (window.console && console.log) && vyho.lib.parser.count > 1000) {
        //    console.log("Failed, count: " + vyho.lib.parser.count);
        //    throw "Failed, count: " + vyho.lib.parser.count;
        //}
        if (window.console && console.log) {
            console.log(msg);
        }
    }

    /*
    vyho.lib.parser.getValue = function(node, name) {
        var text = "";
        var i;
        if (typeof node == "string") {
            return node;
        } else if (typeof node == "object" && (node instanceof Array)) {
            for (i = 0; i < node.length; i++) {
                text += vyho.lib.parser.getValue(node[i]);
            }
        } else {
            for (i in node) {
                if (text != "") {
                    text += ", ";
                }
                //text = text + i + ": ";
                text += vyho.lib.parser.getValue(node[i], i);
            }
        }

        return text;
    }
    */

    vyho.lib.parser.Processor = function() {

        this.init = function() {
            this.rootNode = this.createNewNode("root node", "rootNode", null);
            this.currentNode = this.rootNode;
        }

        this.createNewNode = function(type, nodeName, parent){
            var node = {};
            node.type = type;
            node.parent = parent;
            node.nodeName = nodeName;
            node.endTagName = null;
            node.childNodes = [];
            node.attributes = [];
            return node;
        }

        this.setText = function( result) {
            var node = this.currentNode;
            var lastChild = null;
            if (node.childNodes && node.childNodes.length > 0) {
                lastChild = node.childNodes[node.childNodes.length - 1];
            }
            if (lastChild == null || lastChild.type != "text") {
                lastChild = this.createNewNode("text", "text", this.currentNode);
                lastChild.text = "";
                node.childNodes[node.childNodes.length] = lastChild;
            }

            var value = "";
            if (result.type == "AllChars" || result.type == "Const" || result.type == "ConstRange" || result.type == "ConstSet" || result.type == "StringSet") {
                if (typeof result.value == "undefined") {
                    value = "";
                }
                value = result.value;
            }
            lastChild.text += value;
        }

        this.setEndTagName = function( result ) {
            var node = this.currentNode;
            if (node.endTagName == null) node.endTagName = "";

            var value = "";
            if (result.type == "Const" || result.type == "ConstRange" || result.type == "ConstSet" || result.type == "StringSet") {
                if (typeof result.value == "undefined") {
                    value = "";
                }
                value = result.value;
            }

            node.endTagName = node.endTagName + value;
        }

        this.setNodeName = function( result ) {
            var node = this.currentNode;
            if (node.nodeName == null) node.nodeName = "";

            var value = "";
            if (result.type == "Const" || result.type == "ConstRange" || result.type == "ConstSet" || result.type == "StringSet") {
                if (typeof result.value == "undefined") {
                    value = "";
                }
                value = result.value;
            }

            node.nodeName = node.nodeName + value;
        }

        this.startAttribute = function() {
            var node = this.currentNode;
            var attr = this.createNewNode("attribute", "<attr>", node);
            node.attributes[node.attributes.length] = attr;
            this.currentNode = attr;
        }

        this.endAttribute= function(result) {
            //switch back to node
            var attr = this.currentNode;
            this.currentNode = attr.parent;
        }

        this.setAttrName = function( result) {
            var attr = this.currentNode;   //can assert it's an attribute
            if (attr.name == null) attr.name = "";

            var value = "";
            if (result.type == "Const" || result.type == "ConstRange" || result.type == "ConstSet" || result.type == "StringSet") {
                if (typeof result.value == "undefined") {
                    value = "";
                }
                value = result.value;
            }

            attr.name += value;
        }

        this.setAttrValue = function( result) {
            var attr = this.currentNode;   //can assert it's an attribute
            if (attr.value == null) attr.value = "";
            var value = "";
            if (result.type == "AllChars" || result.type == "Const" || result.type == "ConstRange") {
                if (typeof result.value == "undefined") {
                    value = "";
                }
                value = result.value;
            }
            attr.value += value;
        }

        this.startNode = function(result) {
            var node = this.currentNode;
            if (typeof node.childNodes == "undefined" || node.childNodes == null) node.childNodes = [];
            var childNode = this.createNewNode("node", "", node);
            node.childNodes[node.childNodes.length] = childNode;
            this.currentNode = childNode;
        }

        this.endNode= function(result) {
            //set the context to the parent node (node.parent)
            var node = this.currentNode;
            
            if (node.endTagName != null) {
                if (node.endTagName != node.nodeName) {
                    if (node.parent && node.endTagName == node.parent.endTagName) {
                        this.currentNode = node.parent;
                        this.currentNode = this.currentNode.parent;
                    }
                } else {
                    this.currentNode = node.parent;
                }
            } else {
                this.currentNode = node.parent;
                if (node.parent == null || typeof node.parent == "undefined") {
                    vyho.lib.Utilities.notify("undefined parent");
                }
            }
        }
        
        this.logNoEndTag = function() {
            vyho.lib.parser.log("end tag not found.");
        }

        this.init();

    }

    vyho.lib.parser.Grammar = function(processor) {
        this.getBegin = function() {
            return "entity";
        }

        this.getDef = function(name) {
            return this.definitions[name];
        }

        this.definitions = {
            entity: 
            new vyho.lib.parser.And([
                new vyho.lib.parser.Or([
                    new vyho.lib.parser.And([
                        new vyho.lib.parser.Token("tagBegin"),
                        new vyho.lib.parser.Optional([new vyho.lib.parser.Token("entity")]),
                        new vyho.lib.parser.Token("tagEnd")    //todo: check matching name?
                        ], {
                            f: processor.startNode, 
                            recur: false
                        }),
                    //new vyho.lib.parser.Token("tag", {f: processor.startNode, recur: false}),
                    new vyho.lib.parser.AllChars("<>", {
                        f: processor.setText, 
                        recur: true
                    }) ,
                    new vyho.lib.parser.Token("abbreTag", {
                        f: processor.startNode, 
                        recur: false
                    }),
                    ]),
                new vyho.lib.parser.Optional([new vyho.lib.parser.Token("entity")])
                ]),
            constText: //new vyho.lib.parser.Or(
            //join([
            //new vyho.lib.parser.ConstRange(
            //{lo:'a',hi: 'z'}, 
            //{lo:'A',hi: 'Z'}, 
            //{lo:'0',hi: '9'})
            //],
            //vyho.lib.parser.getConstList(" \t\n".split("")))
            //),
            new vyho.lib.parser.AllChars("<>"),
            text: new vyho.lib.parser.Or([
                new vyho.lib.parser.And([
                    new vyho.lib.parser.AllChars("<>"),
                    new vyho.lib.parser.Token("text")
                    ]),
                new vyho.lib.parser.AllChars("<>")
                ]),
            tag: new vyho.lib.parser.And([
                new vyho.lib.parser.Token("tagBegin"),
                new vyho.lib.parser.Optional([new vyho.lib.parser.Token("entity")]),
                new vyho.lib.parser.Token("tagEnd")    //todo: check matching name?
                ]), //this is not an OR, but an AND, so need to change
            tagBegin: new vyho.lib.parser.And([
                new vyho.lib.parser.Const("<"), 
                //new vyho.lib.parser.Optional([
                //    new vyho.lib.parser.Token("space")
                //]),
                new vyho.lib.parser.Token("name", {
                    f: processor.setNodeName, 
                    recur: true
                }), 
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r"),
                    new vyho.lib.parser.Token("attrList")
                    ]),
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r")
                    ]), 
                new vyho.lib.parser.Const(">")
                ]),
            tagEnd: new vyho.lib.parser.And([
                new vyho.lib.parser.Const("<"),
                new vyho.lib.parser.Const("/"),
                new vyho.lib.parser.Token("name", {
                    f: processor.setEndTagName, 
                    recur: true
                }),
                new vyho.lib.parser.Const(">", {
                    f: processor.endNode, 
                    recur: false
                })
                ]),
            abbreTag: new vyho.lib.parser.And([
                new vyho.lib.parser.Const("<"),
                //new vyho.lib.parser.Optional([
                //    new vyho.lib.parser.Token("space")
                //]),
                new vyho.lib.parser.Token("name", {
                    f: processor.setNodeName, 
                    recur: true
                }),
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r"),
                    new vyho.lib.parser.Token("attrList")
                    ]),
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r")
                    ]),
                new vyho.lib.parser.Const("/"),  
                new vyho.lib.parser.Const(">", {
                    f: processor.endNode, 
                    recur: false
                })
                ]),
            specialTagNames: new vyho.lib.parser.Or([
                new vyho.lib.parser.StringSet(["img", "br", "hr"])
                ]),
            specialTag: new vyho.lib.parser.And([
                new vyho.lib.parser.Const("<"),
                //new vyho.lib.parser.Optional([
                //    new vyho.lib.parser.Token("space")
                //]),
                new vyho.lib.parser.StringSet(["img", "br", "hr"], {
                    f: processor.setNodeName, 
                    recur: true
                }),
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r"),
                    new vyho.lib.parser.Token("attrList")
                    ]),
                new vyho.lib.parser.Optional([
                    new vyho.lib.parser.ConstSet(" \t\n\r")
                    ]),
                new vyho.lib.parser.Const(">", {
                    f: processor.endNode, 
                    recur: false
                })
                ]),
            
            name: /*
            new vyho.lib.parser.Or([
                new vyho.lib.parser.And([
                    new vyho.lib.parser.ConstRange(
                    {lo:'a',hi: 'z'}, 
                    {lo:'A',hi: 'Z'}), 
                    new vyho.lib.parser.Token("name")
                ]), 
                new vyho.lib.parser.ConstRange(
                {lo:'a',hi: 'z'}, 
                {lo:'A',hi: 'Z'}, 
                {lo:'0',hi: '9'})
            ])
            */
            //new vyho.lib.parser.Or([
            new vyho.lib.parser.And([
                new vyho.lib.parser.ConstRange([
                {
                    lo:'a',
                    hi: 'z'
                }, 

                {
                    lo:'A',
                    hi: 'Z'
                },
                
                {
                    lo: '-',
                    hi: '-'
                }
                ], true), 
                new vyho.lib.parser.Optional([new vyho.lib.parser.ConstRange([
                {
                    lo:'a',
                    hi: 'z'
                }, 

                {
                    lo:'A',
                    hi: 'Z'
                }, 

                {
                    lo:'0',
                    hi: '9'
                }
                ])])
                ])
            //,
            //new vyho.lib.parser.ConstRange([
            //    {lo:'a',hi: 'z'}, 
            //    {lo:'A',hi: 'Z'}, 
            //    {lo:'0',hi: '9'}
            //    ])
            //])
            ,
            attrValue: new vyho.lib.parser.Or([
                new vyho.lib.parser.And([
                    new vyho.lib.parser.AllChars("\'\"<>"),
                    new vyho.lib.parser.Token("attrValue")
                    ]), new vyho.lib.parser.AllChars("\'\"<>")
                ]),
            space: 
            /*
                new vyho.lib.parser.Or([ //ConstSet
                    new vyho.lib.parser.And([
                        new vyho.lib.parser.Or(vyho.lib.parser.getConstList(" \t\n\r".split(""))), 
                        new vyho.lib.parser.Token("space")
                    ]), 
                    new vyho.lib.parser.Or(vyho.lib.parser.getConstList(" \t\n\r".split("")))
                ])
                */
            new vyho.lib.parser.ConstSet(" \t\n\r")
            ,
            attr: new vyho.lib.parser.And([
                new vyho.lib.parser.Token("name", {
                    f: processor.setAttrName, 
                    recur: true
                }), 
                new vyho.lib.parser.Optional([
                    //new vyho.lib.parser.Optional([
                    //    new vyho.lib.parser.Token("space")
                    //]),
                    new vyho.lib.parser.Const("="), 
                    //new vyho.lib.parser.Optional([
                    //    new vyho.lib.parser.Token("space")
                    //]),
                    new vyho.lib.parser.Const("\""), 
                    new vyho.lib.parser.Optional([new vyho.lib.parser.AllChars("\'\"<>", {
                        f: processor.setAttrValue, 
                        recur: true
                    })]), 
                    new vyho.lib.parser.Const("\"")
                    ])
                ], {
                    f: processor.startAttribute, 
                    recur: false, 
                    f_e: processor.endAttribute
                }),
            attrList: new vyho.lib.parser.And([
                new vyho.lib.parser.Token("attr"), 
                new vyho.lib.parser.Optional(
                    [new vyho.lib.parser.ConstSet(" \t\n\r"),  
                    new vyho.lib.parser.Token("attrList")])
                ])
        }

        this.print = function() {
            for (var i in this.definitions) {
                var token = this.getDef(i);
                vyho.lib.Utilities.notify("" + i + " : " + token.print());
            }
        }
    }

    vyho.lib.parser.Parser = function(grammar) {
        this.parse = function(text) {
            var beg = grammar.getDef(grammar.getBegin());

            var res = {};   // new ParserResult();
            var index = beg.match(text, 0, res, grammar);
            if (index >= 0) {
                return res;
            } else {
            }
            return null;
        }
    }

    vyho.lib.parser.printValue = function(node, name, tab, res, parent) {
        var text = "";
        var i;
        if (typeof node == "undefined" ) {
            return "";
        }
        if (node.type == "Const" || node.type == "ConstRange") {
            if (typeof node.value == "undefined") {
                return "";
            }
            return node.value;
        } else if (typeof node.value == "object" && (node.value instanceof Array)) {
            text += "\n";
            for (i = 0; i < node.value.length; i++) {
                text += tab + vyho.lib.parser.printValue(node.value[i], "", tab + "");
            }
        } else {
            text += tab + printValue(node.value, i, tab + "");
        }

        return text;
    }
    
    vyho.lib.parser.printProcessResult = function(node, tab) {
        if (node == null || typeof node == "undefined") {
            return "";
        }
        var text = "";
        var i;
        if (node.type != "text" || (vyho.lib.Utilities.isEmpty(node.text, true) == false)) {
            text = tab + ">> Name: " + node.nodeName + "\n";
            if (node.type == "text" && node.text != null && node.text != "") {
                text += tab + node.text + "\n";
            }
        }
        
        if (typeof node.attributes != "undefined" && node.attributes.length > 0) {
            text +=  tab + "attr(s): ";
            for (i = 0; i < node.attributes.length; i++) {
                text += node.attributes[i].name + "=" + node.attributes[i].value + ", ";
            }
        }

        if (typeof node.childNodes != "undefined") {
            for (i = 0; i < node.childNodes.length; i++) {
                text += "\n";
                text += vyho.lib.parser.printProcessResult(node.childNodes[i], tab + "  ");
            }
        }
        if (node.type != "text") {
            var endTagName = node.endTagName;
            if (endTagName == null) {
                endTagName = "/>";
            }
        
            text += "\n" + tab + ">> End: " + endTagName + "\n";
        }
        
        return text;
    }

    vyho.lib.parser.processResult = function(node, processor) {
        if (typeof node == "undefined" ) {
            return;
        }

        if (node.process) {
            node.process.f.apply(processor, [node]);
        }

        if (node.type == "Const" || node.type == "ConstRange") {
            //if (typeof node.value == "undefined") {
            //    return;
            //}
            return;
        } else if (typeof node.value == "object" && (node.value instanceof Array)) {
            for (var i = 0; i < node.value.length; i++) {
                vyho.lib.parser.processResult(node.value[i], processor);
            }
        } else {
            vyho.lib.parser.processResult(node.value, processor);
        }
        if (node.process && node.process.f_e) {
            node.process.f_e.apply(processor, [node]);
        }

        return ;
    }
    
    vyho.lib.parser.Stat = function(enabled) {
        
        this.init = function() {
            this.enabled = enabled;
            this.stats = {};
        }
        
        this.count = function(name) {
            if (typeof this.stats["_" + name] == "undefined") {
                this.stats["_" + name] = 1;
            } else {
                this.stats["_" + name] += 1;
            }
        }
        
        this.print = function() {
            var text = "";
            for (var i in this.stats) {
                text += "\n";
                text += i + " : " + this.stats[i];
            }
            return text;
        }
        
        this.monitor = function(type) {
            if (!this.enabled) return;
            this.count(type);
            vyho.lib.parser.counter++;
            if (vyho.lib.parser.counter > vyho.lib.parser.countLimit) {
                throw "Parser counter limit reached: " + vyho.lib.parser.counter;
            }
        }
        
        this.init();
    }
    
    vyho.lib.parser.countLimit = 100000;
    vyho.lib.parser.counter = 0;
    
    vyho.lib.parser.parse = function(text) {
        vyho.lib.parser.counter = 0; 
        vyho.lib.parser.stat = new vyho.lib.parser.Stat(false);
        
        var processor = new vyho.lib.parser.Processor();
        var grammar = new vyho.lib.parser.Grammar(processor);

        var parser = new vyho.lib.parser.Parser(grammar);
        var res = parser.parse(text);
        if (res != null) {
            //vyho.lib.parser.log(res);               
            vyho.lib.parser.processResult(res, processor);
            // vyho.lib.parser.log("Matched: " + logText);
            //var logText = vyho.lib.parser.printProcessResult(processor.rootNode, "");
            //vyho.lib.parser.log("Results:  " + logText);

            //vyho.lib.parser.log(processor.rootNode);
            //vyho.lib.parser.log(vyho.lib.parser.stat.print());
            return processor.rootNode;
        }
        //vyho.lib.parser.log(vyho.lib.parser.stat.print());
        return null;
    }

    try {
        var chrome_browser = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (chrome_browser) {
            new vyho.lib.apps.CraigslistFusion(window);
            return;
        }
        
        var isGreaseMonkeyScript = false;
        try {
            if (typeof GM_getValue != "undefined") {
                isGreaseMonkeyScript = true;
            }
        } catch (err) {
        }
        
        
        if (isGreaseMonkeyScript) {
            window.addEventListener("load", function() {
                new vyho.lib.apps.CraigslistFusion(window);
            }, true);
            return;
        }
        if (window.opera) {
            new vyho.lib.apps.CraigslistFusion(window);
            return;
        }
        //mozilla plugin
        this.vyho = vyho;
        
    } catch (e) {
    }
})();
