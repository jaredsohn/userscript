// ==UserScript==
// @name           Google Reader Sanity Plus
// @namespace      JuestChaOS
// @description    Change your Google Reader interface easier to use. -=Compared to the original, an increase of button for Mark belows read=-
// @icon           https://www.google.com/reader/ui/352024653-app-icon-32.png
// @icon64         https://www.google.com/reader/ui/3068170011-app-icon-64.png
// @version        1.6.1
// @history (1.6.1)Fix some UI bug,for Chrome,When you adjust the browser window size, width below a certain value, it will lead to dislocation of reading list, and now fixes this problem.
// @history (1.6.0)New features:Update notification code
// @history (1.5.1)Updated to keep pace with the original script 2.3.2
// @history (1.5.1)Fix some UI bug,for Chrome or 360Chrome
// @history (1.5.0)Updated to keep pace with the original script
// @history (1.4.1)New features: Fix Fixes some UI issues, and adding a compatible problem for more than FF3.6 and FF9.1
// @history (1.4.0)New features:Updated to keep pace with the original script
// @history (1.3.0)New features:Added a new feature about 'unread count',you could see anytime Now.
// @history (1.2.3)Fix some UI bug,but it don't seem to fit to any versions
// @history (1.2.2)Optimize this script for loading, this small version, to cancel the loading of the logo, as well as feed icon load, reducing the load of more than 250 icons.
// @history (1.2.1)Oops,Temporarily turn off the automatic update feature
// @history (1.2.0)New features: Added in the option interface graphical options, and friends of those controls do not like floating container via a checkbox to the free choice
// @history (1.1.1)The reader's top bar is occupied by a high degree of too much, now adjusted to by 72px 46px
// @history (1.1.0)New features: Taking into account the page of google reader, 'controls the container' occupies too large, so in this version added controls the container floating
// @history (1.0.1)Fixed the current entry item will be opened when you click the Mark belows read
// @history (1.0.0)Add the Mark belows read button
// @updateURL      http://userscripts.org/scripts/source/124761.meta.js
// @downloadURL    http://userscripts.org/scripts/source/124761.user.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        http://www.google.tld/reader/view/*
// @match          http://www.google.com/reader/view/*
// @include        https://www.google.tld/reader/view/*
// @match          https://www.google.com/reader/view/*
// ==/UserScript==

// This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to
// Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

version = '1.6.1';
storage = 'none';
scriptid = '124761';

try {
    if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
        GM_setValue('testkey', 'testvalue');
        if (GM_getValue('testkey', false) === 'testvalue') {
            storage = 'greasemonkey';
        }
    }
} catch (x) {}
if (storage == 'none' && typeof localStorage == 'object') {
    storage = 'localstorage';
}

function setValue(key, value) {
    switch (storage) {
    case 'greasemonkey':
        GM_setValue('0-' + key, value);
        break;
    case 'localstorage':
        localStorage['femotbar-0-' + key] = value;
        break;
    }
}

function getValue(key, value) {
    switch (storage) {
    case 'greasemonkey':
        return GM_getValue('0-' + key, value);
    case 'localstorage':
        var val = localStorage['femotbar-0-' + key];
        if (val == 'true') {
            return true;
        } else if (val == 'false') {
            return false;
        } else if (val) {
            return val;
        }
        break;
    }
    return value;
}

function xmlhttpRequest(params, callBack) {
    if (typeof GM_xmlhttpRequest !== 'undefined') {
        params['onload'] = callBack;
        return GM_xmlhttpRequest(params);
    }
    return null;
}

function openInTab(url) {
    if (typeof GM_openInTab !== 'undefined') {
        GM_openInTab(url);
    } else {
        window.open(url);
    }
}

function UpdateCheck() {
    if (parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
        try {
            xmlhttpRequest({
                method: 'GET',
                url: 'https://userscripts.org/scripts/source/' + scriptid + '.meta.js?' + new Date().getTime(),
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }, handleUpdateResponse);
        } catch (err) {
            alert('An error occurred while checking for updates:\n' + err);
        }
    }
}

function handleUpdateResponse(r) {
    setValue('LastUpdate', new Date().getTime() + '');
    if (r.responseText.match(/@version\s+((\d+\.)?(\d+\.)?(\*|\d+))/)[1] > version) {
        if (confirm("There's an update available for 'Google Reader Sanity'.\n \n" + "Your version: " + version + "\n" + "New version: " + r.responseText.match(/@version\s+((\d+\.)?(\d+\.)?(\*|\d+))/)[1] + "\n \n" + "Changelog: " + r.responseText.match(/@history\s+(.*)/)[1] + "\n \n" + "Do you wish to install it?")) openInTab('https://userscripts.org/scripts/source/' + scriptid + '.user.js');
    }
}
UpdateCheck();

    var labelunread = document.createElement("span");
    labelunread.setAttribute("id","labelallitems");
    labelunread.setAttribute("class","label");
    labelunread.innerHTML = 'All Items';
    var galleryEl = document.getElementById("lhn-add-subscription-section"); //
    galleryEl.appendChild(labelunread,galleryEl);

    var u=navigator.userAgent.toLowerCase();
    var ff35 = u.indexOf("firefox/3.6")>-1;
    //var ff36 = u.indexOf("firefox/9.1")>-1;

    if(ff35) {
        //  FF 3.6DOM
        labelunread.setAttribute("Style","margin-left:119px;margin-top: 7%;font-family:arial;font-size:15;font-weight:700;display:inline-block");
        GM_addStyle(" \
        #gbx1, #gbx2 { height: 51px !important; } \
        #lhn-add-subscription { margin-top:-21px !important; } \
        #viewer-top-controls-container{ margin-top:-15px !important; } \
        ");
    } else {
        //  FF 3.6DOM
        labelunread.setAttribute("Style","margin-left:42%;margin-top: 8%;font-family:arial;font-size:15;font-weight:700;display:inline-block");
        GM_addStyle(" \
        #logo-section + #lhn-add-subscription-section #lhn-add-subscription {top: 25px;} \
        #lhn-add-subscription { margin-top:-15px !important; } \
        #viewer-top-controls-container{ margin-top:-15px !important; } \
        ");
   }

   if(navigator.userAgent.indexOf("Chrome")>0){
   GM_addStyle(" \
        #chrome {margin-left: 270px;} \
        ");
   }
   
    var labelunread2 = document.createElement("span");
    // labelunread 
    labelunread2.setAttribute("id","reading-list-unread-count");
    labelunread2.setAttribute("class","unread-count2");
    labelunread2.setAttribute("Style","margin-left:5px;font-family:arial;font-size:15;font-weight:700");
   
    //
    galleryEl = document.getElementById("lhn-add-subscription-section");
    galleryEl.appendChild(labelunread2,galleryEl); //ingElgalleryEl

// Add button to mark previous items read
function markPreviousItemsAsRead() {
    collapse_selected_item = true;
    // Get the selected item in the visible list
    var selectedItem = document.getElementById('current-entry');
    // For each item above the selected item in the visible list, click it to mark it as read
    var divElements = document.getElementsByTagName('div');
    for (var i = 0; i < divElements.length; i++) {
        if (divElements[i].className.match(/entry-\d+/)) {
            if (parseInt(divElements[i].className.match(/\d+/)) <= parseInt(selectedItem.className.match(/\d+/))) {
                click(divElements[i].childNodes[0]);
            } else {
                break;
            }
        }
    }
    // Collapse the selected item
    if (collapse_selected_item) {
        click(selectedItem.childNodes[0]);
    }
}

function getAllEntries(){
    var allDivs = document.getElementsByTagName('div');
    var allEntries = new Array();
    for(var i=0;i<allDivs.length;i++){   
        if(typeof(allDivs[i].className) != 'undefined' &&
                (allDivs[i].className.match('entry ') != null && allDivs[i].className.match("read") == null)
                || allDivs[i].id == 'current-entry'){
            allEntries.push(allDivs[i]);
        }
    }
    return allEntries;
}

function getEntryIconDiv(entry){
    var divs = entry.getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){
        if(typeof(divs[i].className) != 'undefined' &&
                divs[i].className == 'entry-icons')
            return divs[i];
    }
    return null;
}

// Add button to mark belows items read
function markbelowItemsAsRead() {

    COLLAPSE_SELECTED_ITEM = true;
 
    var currentElement = document.getElementById('current-entry');
    var allEntries = getAllEntries();
    var selectedItem = document.getElementById('current-entry');
 
    for(var i=allEntries.length - 1;i>=0;i--){
        var entryIcon = getEntryIconDiv(allEntries[i]);
        if(allEntries[i] == currentElement){
            break;
        }
       click(entryIcon);
    }
    click(currentElement.childNodes[0]);
 
    // Collapse the selected item
    if (COLLAPSE_SELECTED_ITEM) {
        click(selectedItem.childNodes[0]);
    }
}

function click(element) {
    // Click the specified element
    var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('click', true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(mouseEvent);
}

function adjustHorizontalSpace() {
    // Reduce width and right margin of the refresh button
    var buttonRefresh = document.getElementById('viewer-refresh');
    buttonRefresh.style.paddingRight = '0px';
    buttonRefresh.style.paddingLeft = '0px';
    buttonRefresh.style.marginRight = '6px';

    // Reduce right margin of the view options button
    var buttonViewOptions = document.getElementById('viewer-view-options');
    buttonViewOptions.style.marginRight = '8px';

    // Shorten text of and reduce right margin of the "Mark all as read" button
    var buttonMarkAllRead = document.getElementById('mark-all-as-read-split-button');
    buttonMarkAllRead.firstChild.innerHTML = 'Mark all read';
    buttonMarkAllRead.style.marginRight = '8px';

    // Reduce right margin of the stream preferences button
    var buttonStreamPrefs = document.getElementById('stream-prefs-menu');
    buttonStreamPrefs.style.marginRight = '8px';

    // Reduce right margin of the list view button
    var buttonListView = document.getElementById('stream-view-options-container').childNodes[2];
    buttonListView.style.marginRight = '7px';

    // Reduce right margin of the down arrow button
    var buttonDown = document.getElementById('entries-down');
    buttonDown.style.marginRight = '5px';

    // Reduce width and right margin of the settings button
    var buttonSettings = document.getElementById('settings-button');
    buttonSettings.style.paddingRight = '0px';
    buttonSettings.style.paddingLeft = '0px';
    buttonSettings.style.marginRight = '0px';

    // Reduce right margin and set minimum width of the viewer header
    var viewerHeader = document.getElementById('viewer-header');
    viewerHeader.style.marginRight = '3px';
    viewerHeader.style.minWidth = '761px'; // This keeps the Expanded/List view button pair from wrapping!
}

// Create the "Mark previous read" button based on the stream preferences button
    var buttonStreamPrefs = document.getElementById('stream-prefs-menu');
    var buttonMarkPreviousAsRead = buttonStreamPrefs.cloneNode(true);
    buttonMarkPreviousAsRead.id = 'mark-previous-as-read-button';
    buttonMarkPreviousAsRead.getElementsByClassName('goog-button-base-content')[0].innerHTML = 'Mark previous read';
    buttonMarkPreviousAsRead.getElementsByClassName('goog-button-base-content')[0].style.paddingLeft = '7px';
    buttonMarkPreviousAsRead.getElementsByClassName('goog-button-base-content')[0].style.paddingRight = '9px';
    buttonMarkPreviousAsRead.title = null;
    buttonMarkPreviousAsRead.style.marginRight = '10px';
    buttonMarkPreviousAsRead.addEventListener('click', markPreviousItemsAsRead, true);
    document.getElementById('viewer-top-controls').insertBefore(buttonMarkPreviousAsRead, buttonStreamPrefs);

// Create the "Mark belows read" button based on the stream preferences button
    var buttonStreamPrefs = document.getElementById('stream-prefs-menu');
    var buttonMarkbelowAsRead = buttonStreamPrefs.cloneNode(true);
    buttonMarkbelowAsRead.id = 'mark-belows-as-read-button';
    buttonMarkbelowAsRead.getElementsByClassName('goog-button-base-content')[0].innerHTML = 'Mark belows read';
    buttonMarkbelowAsRead.getElementsByClassName('goog-button-base-content')[0].style.paddingLeft = '7px';
    buttonMarkbelowAsRead.getElementsByClassName('goog-button-base-content')[0].style.paddingRight = '9px';
    buttonMarkbelowAsRead.title = null;
    buttonMarkbelowAsRead.style.marginRight = '10px';
    buttonMarkbelowAsRead.addEventListener('click', markbelowItemsAsRead, true);
    document.getElementById('viewer-top-controls').insertBefore(buttonMarkbelowAsRead, buttonStreamPrefs);

// Adust the width and spacing of the buttons to provide more room for the new button
    adjustHorizontalSpace();

// Initiate custom CSS function
function GM_addStyle(css) {
    var parent = document.getElementsByTagName("head")[0];
    if (!parent) {
        parent = document.documentElement;
    }
    var style = document.createElement("style");
    style.type = "text/css";
    var textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
}

// Custom CSS interface styling
GM_addStyle(" \
#reading-list-unread-count.unread-count { visibility:hidden !important;display:none !important;} \
a { color: #0022aa !important } \
a.entry-title-link { color: #4266A9 !important; } \
a:hover .tree-item-action-container, .scroll-tree li a.menu-open { background-color: #E5E5FF !important; } \
a.tree-link-selected .name { color: #D14836 !important; font-weight: bold !important; } \
.card { margin-left: 6px !important; padding-right: 8px !important; -webkit-border-radius: 6px !important; -moz-border-radius: 6px !important; border-radius: 6px !important; -webkit-box-shadow: 4px 4px 8px #999 !important; -moz-box-shadow: 4px 4px 8px #999 !important; box-shadow: 4px 4px 8px #999 !important; } \
.cards .entry { padding: 0px 11px 0 3px !important; } \
.card-bottom { margin-left: -14px !important; margin-right: -9px !important; } \
.collapsed { line-height:2.2ex !important; padding:0px 0 !important; font-size: 9pt !important; } \
.display-none { display:none !important; } \
.entry .star { height: 15px !important; } \
.entry .entry-body, .entry .entry-title, .entry .entry-likers { max-width: 90% !important; } \
.entry .entry-actions { padding: 6px 19px !important; } \
.entry .entry-actions .sharebox { background: transparent url(/reader/ui/3904077461-entry-action-icons.png) no-repeat !important; background-position: -129px -256px !important; padding: 1px 0 1px 15px !important; margin: 0 16px 0 10px !important; white-space: nowrap !important; } \
.entry .entry-container { padding-bottom: 0 !important; } \
.entry-body a { color: #4266A9 !important; } \
.entry-icons { top:0 !important } \
.entry-title { max-width:800px !important } \
.entry-source-title { top:2px !important } \
.entry-secondary { top:1px !important } \
.entry-main .entry-original { top:4px !important } \
.folder .folder .folder-toggle { margin-left:7px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:20px !important } \
.folder .folder>ul .icon { margin-left:27px !important; } \
.folder .folder .name-text { max-width: 168px !important; } \
.folder .name-text, #reading-list-selector .label { max-width:168px !important; } \
.folder.unselectable.unread.expanded { margin-bottom: 7px !important; } \
.folder-icon, .sub-icon, .tag-icon { opacity: .8 !important; } \
.goog-flat-menu-button, #lhn-add-subscription, .goog-button-base-inner-box, .jfk-button { height: 22px !important; line-height: 22px !important } \
.goog-button-base-content { padding-top: 3px !important } \
.goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem { padding: 3px 7em 3px 30px !important; } \
.goog-menuitem-highlight, goog-menuitem-hover { padding-top: 2px !important; padding-bottom: 2px !important; } \
.jfk-button-primary, .jfk-button-action { background: #95A9D6 !important; background-image: -webkit-linear-gradient(top,#A7B7DD,#95A9D6) !important; border-color: #708AC7 !important; } \
.jfk-button-primary.jfk-button-hover { background-color: #E2786E !important; background-image: -webkit-linear-gradient(top,#E78C84,#E2786E) !important; border: 1px solid #E45D4E !important; } \
.jfk-button-action.jfk-button-hover { background-color: #E2786E !important; background-image: -webkit-linear-gradient(top,#E78C84,#E2786E) !important; border: 1px solid #E45D4E !important; } \
.jfk-textinput { height: 20px !important } \
.lhn-section { line-height: normal !important ; background: transparent !important; } \
.lhn-section-primary { line-height: 20px !important; font-size: 9pt !important; } \
.overview-section-header { color: #4266A9 !important; font-size: 165% !important; font-weight: bold !important; line-height: 37px !important; padding: 0 .7em !important; } \
.previewLink { background: transparent url(/reader/ui/3904077461-entry-action-icons.png) no-repeat !important; background-position: -208px -416px !important; padding: 2px 0px 0px 15px !important; margin-right: 8px !important; white-space: nowrap !important; text-decoration: none !important;} \
.read a.entry-title-link { color: #999 !important; } \
.read .card { border: #ccc solid 2px !important; background: transparent !important; } \
.samedir { background-color: white !important; } \
.scroll-tree { font-size: 9pt !important; } \
.scroll-tree { background-position: 0px 0px !important; } \
.scroll-tree .icon, .scroll-tree .favicon { width: 17px !important; height: 17px !important; } \
.scroll-tree li.sub { height: 18px; padding: 1px 0 !important; } \
.scroll-tree li .cursor { background-color: #E5E5FF !important; } \
.scroll-tree li a:hover { background-color: #E5E5FF !important; } \
.scroll-tree li { background: transparent !important; margin: 2px 0 !important; } \
.scroll-tree li a.tree-link-selected .name, .scroll-tree li a.tree-link-selected:hover .name { color: #D63C2E !important; } \
.section-header { display: none !important; } \
.section-minimize { top: 0; left: 0px !important } \
.selectors-footer { margin-bottom: 0 !important ; padding-bottom: 5px !important } \
.selector:hover, #lhn-selectors .selector:hover { background-color: #F0F3F9 !important; } \
.tree-link-selected { border-left: 3px solid #D14836 !important; background-color: #E5E5FF !important; } \
.unread-count { padding: 0 0 0 8px !important; font-size: 100% !important; font-weight: bold !important; color: #666 !important; } \
#chrome-title { padding-left: 5px !important; color: #355089 !important; font-size: 18px !important; line-height: 20px !important; } \
#chrome-title a { color: #355089 !important; font-size: 17px !important; } \
#current-entry .card, .card { border: 2px solid #95A9D6 !important; } \
#current-entry .entry-title-link { color: #4266A9 !important; } \
#entries { padding:0 !important; } \
#entries .collapsed .entry-title { color: #4266A9 !important; } \
#entries .entry, #entries.list .entry-container { background: transparent !important } \
#entries.list .collapsed .entry-icons, #entries.list .collapsed .entry-main .entry-original { margin-top: 5px; } \
#entries.list .collapsed .entry-secondary { color: #333 !important; } \
#entries.list .collapsed .entry-main .entry-source-title { color: #333 !important; font-weight: bold !important; } \
#entries.list #current-entry.expanded .entry-actions { border-bottom-width: 0px !important; } \
#entries.list .entry .collapsed { height: 30px!important;border-width: 0px !important; } \
#entries.cards .entry { margin: 0px !important; margin-top: 15px !important; } \
#entries.cards .card-content { padding: 5px 0px 5px 7px !important; } \
#gbx1.gbt gbes{height: 30px !important; } \
#gbx2.gbt gbes{height: 30px !important; } \
#home-section { font-size: 9pt !important; } \
#lhn-add-subscription-section { height:40px !important; } \
#lhn-selectors { font-size: 9pt !important; } \
#lhn-friends { font-size: 9pt !important; } \
#lhn-recommendations { font-size: 9pt !important; } \
#logo-link { margin-top: -13px !important; height: 30px !important; } \
#logo-section { height: 0px !important; padding: 0px 0 !important; border-bottom: none !important; } \
#logo-section + #lhn-add-subscription-section #lhn-add-subscription { top: 15px !important; left: 40% !important; } \
#logo-section + #lhn-add-subscription-section { border-bottom: 1px solid #EDEDED !important; } \
#main { background: #fff !important } \
#nav { width: 270px !important;} \
#nav, #logo-container, #lhn-add-subscription-section, #scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow { width: 270px !important; } \
#overview { padding-right: 20px !important; margin-right: 2em !important; border-right: 1px solid #EBEBEB !important; } \
#overview .title a { color: #5D80C0 !important; font-size: 80% !important; } \
#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, \
#reading-list-unread-count { line-height: 15px !important; margin-top: 0 !important } \
#reading-list-selector .label { display:inline !important } \
#recent-activity .recent h4 a { color: #5D80C0 !important; margin: 0 !important; font-weight: bold !important; font-size: 120% !important; } \
#recommendations-tree .sub-icon { background-position: -31px 0px !important; } \
#scrollable-sections { padding-bottom: 12px !important; overflow: auto !important; border-right: 1px #ebebeb solid !important ; background: transparent !important; } \
#scrollable-sections-holder { border-right: #E5E5FF solid 0px !important;} \
#search { padding:8px 0 !important; } \
#sections-header { height: 43px !important; margin-bottom: 1em !important; } \
#sub-tree-header { padding-left: 15px !important; } \
#title-and-status-holder { padding:0.3ex 0 0 0.5em !important; background: #DEDEDE !important ; margin-right: 0 !important } \
#top-bar { height:45px !important; background: #fff !important } \
#viewer-entries-container { padding-bottom: 12px !important; } \
#viewer-header { z-index: 1; background: transparent !important; height:40px !important; -webkit-box-shadow: 0px 14px 10px -10px #999 !important; -moz-box-shadow: 0px 14px 10px -10px #999 !important; box-shadow: 0px 14px 10px -10px #999 !important; margin-top:0.2% !important;} \
::-webkit-scrollbar{ width:14px !important; height: 14px !important; } \
::-webkit-scrollbar-thumb{ background-color: rgba(0, 0, 0, .03) !important; border-width:0 !important; -webkit-border-radius:32px !important; -moz-border-radius :32px !important; border-radius :32px !important; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); } \
::-webkit-scrollbar-thumb:hover { background-color: rgba(0, 0, 0, .08) !important; border-width:0 !important; -webkit-border-radius:32px !important; -moz-border-radius :32px !important; border-radius :32px !important; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); } \
::-webkit-scrollbar-track{ border-width:0 !important; -webkit-border-radius:32px !important; -moz-border-radius :32px !important; border-radius :32px !important; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); } \
::-webkit-scrollbar-track:hover{ background-color: rgba(0, 0, 0, 0) !important; border-width:0 !important; -webkit-border-radius:32px !important; -moz-border-radius :32px !important; border-radius :32px !important; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); } \
\ ");

var overrideCSS = " \
#reading-list-unread-count.unread-count { visibility:hidden !important;display:none !important;} \
#gbx1.gbes {height: 30px !important; } \
#gbx2.gbes {height: 30px !important; } \
#top-bar { height:45px !important; } \
#search { padding:8px 0 !important; } \
.list .collapsed .entry-main .entry-source-title { color: #333 !important; font-weight: bold !important; } \
#sections-header { height:43px !important; } \
#viewer-header { height:40px !important; } \
#viewer-header-container { height:8px !important; border:none !important;margin-top:5.5% !important; } \
#chrome-fullscreen-top-page-view { width:95% !important; box-shadow: none !important; } \
#lhn-add-subscription-section { height:40px !important; } \
.lhn-section-primary { line-height: 21px !important; } \
#entries { padding:0 !important; } \
#entries.list .entry.read .entry-secondary .snippet { color: inherit } \
#entries.list .entry.read .entry-main .entry-source-title \
{color: #666 !important} \
#title-and-status-holder { padding:0.3ex 0 0 0.5em !important; } \
.entry-source-title { top:2px !important } \
.entry-secondary { top:2px !important } \
#entries.list .entry .collapsed { height: 30px !important; } \
.entry-main .entry-original { margin-top: 1px !important; } \
.section-minimize { left: 0px !important; top: 3px !important } \
#lhn-recommendations .section-minimize { top: 5px !important } \
#overview-selector, #lhn-selectors .selector, .folder .name.name-d-0, \
#sub-tree-header \
{ padding-left: 15px !important; } \
.folder .folder .folder-toggle { margin-left:13px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important } \
.folder .folder>ul .icon { margin-left:34px !important } \
.folder .folder .name-text { max-width:160px; !important } \
#reading-list-selector .label, #reading-list-unread-count \
{ display:inline } \
.scroll-tree .toggle { top: 2px !important; } \
";

var GM_config = {
    storage: 'GM_config_G_R_S2.1.2',
    // This needs to be changed to something unique for localStorage
    init: function () {
        // loop through GM_config.init() arguements
        for (var i = 0, l = arguments.length, arg; i < l; ++i) {
            arg = arguments[i];
            switch (typeof arg) {
            case 'object':
                for (var j in arg) { // could be a callback functions or settings object
                    switch (j) {
                    case "open":
                        GM_config.onOpen = arg[j];
                        delete arg[j];
                        break; // called when frame is gone
                    case "close":
                        GM_config.onClose = arg[j];
                        delete arg[j];
                        break; // called when settings have been saved
                    case "save":
                        GM_config.onSave = arg[j];
                        delete arg[j];
                        break; // store the settings objects
                    default:
                        var settings = arg;
                    }
                }
                break;
            case 'function':
                GM_config.onOpen = arg;
                break; // passing a bare function is set to open
                // could be custom CSS or the title string
            case 'string':
                if (arg.indexOf('{') != -1 && arg.indexOf('}') != -1) var css = arg;
                else GM_config.title = arg;
                break;
            }
        }
        //Google Reader Sanity Plus Options title set
        if (!GM_config.title) GM_config.title = 'Google Reader Sanity Plus Options'; // if title wasn't passed through init()
        // if title wasn't passed through init()
        var stored = GM_config.read(); // read the stored settings
        GM_config.passed_values = {};
        for (var i in settings) {
            GM_config.doSettingValue(settings, stored, i, null, false);
            if (settings[i].kids) for (var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
        }
        GM_config.values = GM_config.passed_values;
        GM_config.settings = settings;
        if (css) GM_config.css.stylish = css;
    },
    open: function () {
        if (document.evaluate("//iframe[@id='GM_config']", document, null, 9, null).singleNodeValue) return;
        // Create frame
        document.body.appendChild((GM_config.frame = GM_config.create('iframe', {
            id: 'GM_config',
            style: 'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:65%; max-height:95%; max-width:95%; overflow:auto;'
        })));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
        GM_config.frame.addEventListener('load', function () {
            var obj = GM_config,
                frameBody = this.contentDocument.getElementsByTagName('body')[0],
                create = obj.create,
                settings = obj.settings;
            obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(obj.create('style', {
                type: 'text/css',
                textContent: obj.css.basic + obj.css.stylish
            }));

            // Add header and title
            frameBody.appendChild(obj.create('div', {
                id: 'header',
                className: 'config_header block center',
                innerHTML: obj.title
            }));

            // Append elements
            var anch = frameBody,
                secNo = 0; // anchor to append elements
            for (var i in settings) {
                var type, field = settings[i],
                    value = obj.values[i];
                if (field.section) {
                    anch = frameBody.appendChild(create('div', {
                        className: 'section_header_holder',
                        kids: new Array(
                        create('div', {
                            className: 'section_header center',
                            innerHTML: field.section[0]
                        })),
                        id: 'section_' + secNo
                    }));
                    if (field.section[1]) anch.appendChild(create('p', {
                        className: 'section_desc center',
                        innerHTML: field.section[1]
                    }));
                    secNo++;
                }
                anch.appendChild(GM_config.addToFrame(field, i, false));
            }
                     
            // Add save and close buttons
            frameBody.appendChild(obj.create('div', {
                id: 'buttons_holder',
                kids: new Array(
                obj.create('button', {
                    id: 'saveBtn',
                    textContent: 'Save',
                    title: 'Save options and close window',
                    className: 'saveclose_buttons',
                    onclick: function () {
                        GM_config.close(true)
                    }
                }), obj.create('button', {
                    id: 'cancelBtn',
                    textContent: 'Cancel',
                    title: 'Close window',
                    className: 'saveclose_buttons',
                    onclick: function () {
                        GM_config.close(false)
                    }
                }), obj.create('div', {
                    className: 'reset_holder block',
                    kids: new Array(
                    obj.create('a', {
                        id: 'resetLink',
                        textContent: 'Restore to default',
                        href: '#',
                        title: 'Restore settings to default configuration',
                        className: 'reset',
                        onclick: obj.reset
                    }))
                }))
            }));

            obj.center(); // Show and center it
            window.addEventListener('resize', obj.center, false); // Center it on resize
            if (obj.onOpen) obj.onOpen(); // Call the open() callback function
            // Close frame on window close
            window.addEventListener('beforeunload', function () {
                GM_config.remove(this);
            }, false);
        }, false);
    },
    close: function (save) {
        if (save) {
            var type, fields = GM_config.settings,
                typewhite = /radio|text|hidden|checkbox/;
            for (f in fields) {
                var field = GM_config.frame.contentDocument.getElementById('field_' + f),
                    kids = fields[f].kids;
                if (typewhite.test(field.type)) type = field.type;
                else type = field.tagName.toLowerCase();
                GM_config.doSave(f, field, type);
                if (kids) for (var kid in kids) {
                    var field = GM_config.frame.contentDocument.getElementById('field_' + kid);
                    if (typewhite.test(field.type)) type = field.type;
                    else type = field.tagName.toLowerCase();
                    GM_config.doSave(kid, field, type, f);
                }
            }
            if (GM_config.onSave) GM_config.onSave(); // Call the save() callback function
            GM_config.save();
        }
        if (GM_config.frame) GM_config.remove(GM_config.frame);
        delete GM_config.frame;
        if (GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
    },
    set: function (name, val) {
        GM_config.values[name] = val;
    },
    get: function (name) {
        return GM_config.values[name];
    },
    isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
    log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
    save: function (store, obj) {
        try {
            var val = JSON.stringify(obj || GM_config.values);
            (GM_config.isGM ? GM_setValue : (function (name, value) {
                return localStorage.setItem(name, value)
            }))((store || GM_config.storage), val);
        } catch (e) {
            GM_config.log("GM_config failed to save settings!");
        }
    },
    read: function (store) {
        try {
            var val = (GM_config.isGM ? GM_getValue : (function (name, def) {
                return localStorage.getItem(name) || def
            }))((store || GM_config.storage), '{}'),
                rval;
            rval = JSON.parse(val);
        } catch (e) {
            GM_config.log("GM_config failed to read saved settings!");
            rval = {};
        }
        return rval;
    },
    reset: function (e) {
        e.preventDefault();
        var type, obj = GM_config,
            fields = obj.settings;
        for (f in fields) {
            var field = obj.frame.contentDocument.getElementById('field_' + f),
                kids = fields[f].kids;
            if (field.type == 'radio' || field.type == 'text' || field.type == 'checkbox') type = field.type;
            else type = field.tagName.toLowerCase();
            GM_config.doReset(field, type, null, f, null, false);
            if (kids) for (var kid in kids) {
                var field = GM_config.frame.contentDocument.getElementById('field_' + kid);
                if (field.type == 'radio' || field.type == 'text' || field.type == 'checkbox') type = field.type;
                else type = field.tagName.toLowerCase();
                GM_config.doReset(field, type, f, kid, true);
            }
        }
    },
    addToFrame: function (field, i, k) {
        var elem, obj = GM_config,
            anch = GM_config.frame,
            value = obj.values[i],
            Options = field.options,
            label = field.label,
            create = GM_config.create,
            isKid = k != null && k === true;
        switch (field.type) {
        case 'textarea':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('textarea', {
                    id: 'field_' + i,
                    innerHTML: value,
                    cols: (field.cols ? field.cols : 20),
                    rows: (field.rows ? field.rows : 2)
                })),
                className: 'config_var'
            });
            break;
        case 'radio':
            var boxes = new Array();
            for (var j = 0, len = Options.length; j < len; j++) {
                boxes.push(create('span', {
                    textContent: Options[j]
                }));
                boxes.push(create('input', {
                    value: Options[j],
                    type: 'radio',
                    name: i,
                    checked: Options[j] == value ? true : false
                }));
            }
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('span', {
                    id: 'field_' + i,
                    kids: boxes
                })),
                className: 'config_var'
            });
            break;
        case 'select':
            var options = new Array();
            if (!Options.inArray) for (var j in Options) options.push(create('option', {
                textContent: Options[j],
                value: j,
                selected: (j == value)
            }));
            else options.push(create("option", {
                textContent: "Error - options needs to be an object type, not an array.",
                value: "error",
                selected: true
            }));
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('select', {
                    id: 'field_' + i,
                    kids: options
                })),
                className: 'config_var'
            });
            break;
        case 'checkbox':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('label', {
                    textContent: label,
                    className: 'field_label',
                    "for": 'field_' + i
                }), create('input', {
                    id: 'field_' + i,
                    type: 'checkbox',
                    value: value,
                    checked: value
                })),
                className: 'config_var'
            });
            break;
        case 'button':
            var tmp;
            elem = create(isKid ? "span" : "div", {
                kids: new Array((tmp = create('input', {
                    id: 'field_' + i,
                    type: 'button',
                    value: label,
                    size: (field.size ? field.size : 25),
                    title: field.title || ''
                }))),
                className: 'config_var'
            });
            if (field.script) obj.addEvent(tmp, 'click', field.script);
            break;
        case 'hidden':
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('input', {
                    id: 'field_' + i,
                    type: 'hidden',
                    value: value
                })),
                className: 'config_var'
            });
            break;
        default:
            elem = create(isKid ? "span" : "div", {
                title: field.title || '',
                kids: new Array(
                create('span', {
                    textContent: label,
                    className: 'field_label'
                }), create('input', {
                    id: 'field_' + i,
                    type: 'text',
                    value: value,
                    size: (field.size ? field.size : 25)
                })),
                className: 'config_var'
            });
        }
        if (field.kids) {
            var kids = field.kids;
            for (var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
        }
        return elem;
    },
    doSave: function (f, field, type, oldf) {
        var isNum = /^[\d\.]+$/,
            set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
        switch (type) {
        case 'text':
            GM_config.values[f] = ((set[f].type == 'text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf("," + set[f].type) != -1) ? parseFloat(field.value) : false));
            if (set[f] === false) {
                alert('Invalid type for field: ' + f + '\nPlease use type: ' + set[f].type);
                return;
            }
            break;
        case 'hidden':
            GM_config.values[f] = field.value.toString();
            break;
        case 'textarea':
            GM_config.values[f] = field.value;
            break;
        case 'checkbox':
            GM_config.values[f] = field.checked;
            break;
        case 'select':
            GM_config.values[f] = field[field.selectedIndex].value;
            break;
        case 'span':
            var radios = field.getElementsByTagName('input');
            if (radios.length > 0) for (var i = radios.length - 1; i >= 0; i--) {
                if (radios[i].checked) GM_config.values[f] = radios[i].value;
            }
            break;
        }
    },
    doSettingValue: function (settings, stored, i, oldi, k) {
        var set = k != null && k == true && oldi != null ? settings[oldi]["kids"][i] : settings[i];
        if (",save,open,close".indexOf("," + i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            //         else use the stored value
            var value = typeof stored[i] == "undefined" ? (typeof set['defval'] == "undefined" ? null : set['defval']) : stored[i];

            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch (set["type"]) {
                case 'radio':
                case 'select':
                    value = set.options[0];
                    break;
                case 'checkbox':
                    value = false;
                    break;
                case 'int':
                case 'float':
                    value = 0;
                    break;
                default:
                    value = (typeof stored[i] == "function") ? stored[i] : "";
                }
            }

        }
        GM_config.passed_values[i] = value;
    },
    doReset: function (field, type, oldf, f, k) {
        var isKid = k != null && k == true,
            obj = GM_config,
            set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
        switch (type) {
        case 'text':
            field.value = set['defval'] || '';
            break;
        case 'hidden':
            field.value = set['defval'] || '';
            break;
        case 'textarea':
            field.value = set['defval'] || '';
            break;
        case 'checkbox':
            field.checked = set['defval'] || false;
            break;
        case 'select':
            if (set['defval']) {
                for (var i = field.options.length - 1; i >= 0; i--)
                if (field.options[i].value == set['defval']) field.selectedIndex = i;
            } else field.selectedIndex = 0;
            break;
        case 'span':
            var radios = field.getElementsByTagName('input');
            if (radios.length > 0) for (var i = radios.length - 1; i >= 0; i--) {
                if (radios[i].value == set['defval']) radios[i].checked = true;
            }
            break;
        }
    },
    values: {},
    settings: {},
    css: {
        basic: 'body {background:#95A9D6;}\n' + '.indent40 {margin-left:40%;}\n' + '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' + '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' + '.block {display:block;}\n' + '.saveclose_buttons {\n' + 'margin:16px 10px 10px 10px;\n' + 'padding:2px 12px 2px 12px;\n' + '}\n' + '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' + '.config_header {font-size:20pt; margin:0;}\n' + '.config_desc, .section_desc, .reset {font-size:9pt;}\n' + '.center {text-align:center;}\n' + '.section_header_holder {margin-top:8px;}\n' + '.config_var {margin:0 0 4px 0; display:block;}\n' + '.section_header {font-size:13pt; background:#204060; color:#FFFFFF; margin:0;}\n' + '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' + 'input[type="radio"] {margin-right:8px;}',
        stylish: ''
    },
    create: function (a, b) {
        var ret = window.document.createElement(a);
        if (b) for (var prop in b) {
            if (prop.indexOf('on') == 0) ret.addEventListener(prop.substring(2), b[prop], false);
            else if (prop == "kids" && (prop = b[prop])) for (var i = 0; i < prop.length; i++) ret.appendChild(prop[i]);
            else if (",style,accesskey,id,name,src,href,for".indexOf("," + prop.toLowerCase()) != -1) ret.setAttribute(prop, b[prop]);
            else ret[prop] = b[prop];
        }
        return ret;
    },
    center: function () {
        var node = GM_config.frame,
            style = node.style,
            beforeOpacity = style.opacity;
        if (style.display == 'none') style.opacity = '0';
        style.display = '';
        style.top = Math.floor((window.innerHeight / 2) - (node.offsetHeight / 2)) + 'px';
        style.left = Math.floor((window.innerWidth / 2) - (node.offsetWidth / 2)) + 'px';
        style.opacity = '1';
    },
    run: function () {
        var script = GM_config.getAttribute('script');
        if (script && typeof script == 'string' && script != '') {
            func = new Function(script);
            window.setTimeout(func, 0);
        }
    },
    addEvent: function (el, ev, scr) {
        el.addEventListener(ev, function () {
            typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr)
        }, false);
    },
    remove: function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }
};
// End of GM_config code

// GM_config_extender code
GM_config.fade = function () {
    var e = arguments[0],
        dir = arguments[1],
        s = arguments[2] || 'medium',
        minOpa = arguments[3] || .5,
        maxOpa = arguments[4] || 1;
    if (!e || !dir || typeof dir != 'string' || (dir != 'out' && dir != 'in')) {
        return;
    } // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
    dir = dir.toLowerCase();
    s = s.toLowerCase(); // Fix case sensitive bug
    var node = (typeof e == 'string') ? $(e) : e,
        // Define node to be faded
        speed = {
            slow: 400,
            medium: 200,
            fast: 50
        };
    if (!s) var s = 'medium'; // Make speed medium if not specified
    if (s != 'slow' && s != 'medium' && s != 'fast') s = 'medium'; // Set speed to medium if specified speed not supported
    if (dir == 'in') node.style.opacity = minOpa.toString();
    else if (dir == 'out') node.style.opacity = maxOpa.toString();
    //node.style.display='';
    var intv = setInterval(function () {
        if (dir == 'out') {
            if (parseFloat(node.style.opacity) > minOpa) node.style.opacity = (parseFloat(node.style.opacity) - .1).toString();
            else {
                clearInterval(intv);
                node.style.background = 'transparent none repeat scroll 0 0';
                //node.style.display='none';
            }
        } else if (dir == 'in') {
            if (parseFloat(node.style.opacity) < maxOpa) node.style.opacity = (parseFloat(node.style.opacity) + .1).toString();
            else {
                clearInterval(intv);
            }
        }
    }, speed[s]);
}

// FadeOut
GM_config.fadeOut = function () {
    var styl = document.createElement('style');
    styl.innerHTML = arguments[0] || GM_config.fadeCSS;
    styl.setAttribute('id', 'GM_config_menu_css');
    document.getElementsByTagName('head')[0].appendChild(styl);
    window.document.body.appendChild((this.tframe = this.create('iframe', {
        id: 'GM_transparency_filter',
        src: 'about:blank',
        style: 'position:fixed; top:0; left:0; opacity:0; z-index:998; width:100%; height:100%; max-height:100%; max-width:100%; border:none; overflow:auto;'
    })));
    this.fade(this.tframe, 'in', 'fast', 0, .7);
    var ifras = document.getElementsByTagName('iframe');
    for (i = 0; i < ifras.length; i++) {
        if (/GM_config/.exec(ifras[i].id)) {
            this.fade(ifras[i], 'in', 'fast', 0, 1);
        }
    }
}

// FadeIn
GM_config.fadeIn = function () {
    this.fade(this.tframe, 'out', 'fast', 0, .8);
    var intv = setTimeout(function () {
        document.getElementById('GM_config_menu_css').parentNode.removeChild(document.getElementById('GM_config_menu_css'));
        GM_config.remove(GM_config.tframe);
        delete GM_config.tframe;
    }, 400);
}
// End of GM_config_extender code

// Begin Google Reader Sanity Compact code
GM_config.init("Google Reader Sanity Plus Options", {
    hideGoogNav: {
        section: ['Hide the following items:'],
        label: "Google Universal Header",

        type: "checkbox",
        defval: false
    },
    hideGoogHead: {
       label:"Logo and search bar",
       type:"checkbox",
       defval:false
    },
    hidePostContainerHeader: {
        label: "Header for Post Container",
        type: "checkbox",
        defval: true
    },
    hidePlusOne: {
        label: "Google +1 Button",
        type: "checkbox",
        defval: true
    },
    shrinkListView: {
        section: ['Other changes:'],
        label: "Enable 'Super Compact' List View",
        type: "checkbox",
        defval: false
    },
    enableDimRead: {
        label: "Enable Dim Read Feeds",
        type: "checkbox",
        defval: true
    },
    enableEnclosures: {
        label: "Enable image enclosure fix (great for DX and Flickr feeds)",
        type: "checkbox",
        defval: true
    },
    enableTrueUnreadCount: {
        label: "Enable True Unread Count",
        type: "checkbox",
        defval: true
    },
    enablePostPreviews: {
        label: "Enable Post Previews",
        type: "checkbox",
        defval: true
    },
    enablePurgePost: {
        label: "Enable Read Post Purging",
        type: "checkbox",
        defval: true
    },
    enableReadItLater: {
        label: "Enable 'Read It Later' integration",
        type: "checkbox",
        defval: false
    },
    //entry  
    enableFloatingControlPanel: {
       label:"Enable Floating Control Panel",
       type:"checkbox",

       defval:false
    }
}, " \
.indent40 { margin-left: auto !important; text-align: center !important; } \
.config_header { font-size: 17pt !important; } \
.section_header { margin:5px 0 5px 0 !important; } \
div.section_header_holder { margin-top: 0 !important; } \
h2.section_header { text-align: left !important; } \
.config_var { padding-left:20px; } \
.config_var .field_label { margin-left: 23px !important; } \
.config_var input[type='checkbox'] { position: absolute !important; left: 27px !important; } \
#field_customCSS{ display: block; font: 12px monospace; margin-left: 25px; } ", {
    open: function () {
        GM_config.fadeOut('#GM_transparency_filter { background-color: #000000;} #GM_config { opacity: 1.0 !important; background-color: #ffffff !important; }');
    },

    save: function() {
        location.reload();
    },
    close: function () {
        GM_config.fadeIn();
    }
});

// #logo-section + #lhn-add-subscription-section #lhn-add-subscription { left: 100px !important; } \
//#lhn-add-subscription-section {background: none !important;} \

function applyFeatures() {

    GM_addStyle(cssDefault);
    if (GM_config.get("hideGoogNav")) {
        GM_addStyle(cssGoogNav);
     }
//#gbq1 { margin-left: 16px !important; } \     
     else {
    //delete?
	GM_addStyle("#gbx1, #gbx2 { height: 51px !important; background: #FFF !important; } \
    #gbql { margin-top: -18px; width: 120px !important;  } \
    #gbu { padding-bottom: 11px; padding-top: 10px; } \
    #gbq, #gbu { top: 20px; } \
    #gb, .gbem#gb, .gbemi#gb { height: 35px; } \
    #gbq2 {padding-top:10px;}\
    ");
    }
    if (GM_config.get("hideSearchBar")) {
        GM_addStyle(cssGoogHead);
    }else {
	GM_addStyle("#lhn-add-subscription-section {background: none !important;} \
#logo-section + #lhn-add-subscription-section #lhn-add-subscription { left: 100px !important; } \
#gbql { margin-top: 1px; width: 120px !important; } \
#gbx1, #gbx2 { height: 36px !important; background: #FFF !important; border-bottom: none; } \
#gbu { padding-bottom: 6px; padding-top: 5px; } \
#gbq, #gbu { top: 15px; } \
#gb, .gbem#gb, .gbemi#gb { height: 74px; } \
#gbq1 { margin-left: 16px !important; } \
#gbq2 { padding-top: 5px; } \
#gbqlw { height: 53px; } \
#gbqfqw { -webkit-border-radius: 6px; border-radius: 6px; height: 26px; }");
	}
    if (GM_config.get("hidePostContainerHeader")) {
        GM_addStyle(cssPostContainerHeader);
    }
    if (GM_config.get("hidePlusOne")) {
        GM_addStyle(".item-plusone { display: none !important; }");
    }
    if (GM_config.get("shrinkListView")) {
        GM_addStyle(cssListView);
    }
        //GM_addStyle(overrideCSS);
 
    if (GM_config.get("enableDimRead")) {
        // Dim read folders
        (function () {

            // resets the opacity every few seconds (checks for updates)
            jQuery('.folder-name-text').parent().css('opacity', '1.0');
            jQuery('.folder-name-text').not('.name-unread').parent().css({
                'opacity': '0.4',
                'font-weight': 'bold'
            });

            jQuery('.tag-name-text').parent().css('opacity', '1.0');
            jQuery('.tag-name-text').not('.name-unread').parent().css({
                'opacity': '0.4',
                'font-weight': 'bold'
            });

            jQuery('.link').find('.sub-name-text').parent().css('opacity', '1.0');
            jQuery('.link').find('.sub-name-text').not('.name-unread').parent().css({
                'opacity': '0.4',
                'font-weight': 'bold'
            });


            setTimeout(arguments.callee, 1000);
        })();
    }
    if (GM_config.get("enableTrueUnreadCount")) {
        //Fix Unread Count to show actual unread instead of 1000+
        (function () {
            var isChrome = false;
            var isSafari = false;
            // features switch
            var hasDOMSubtreeModified = false;
            var unreadCountElement = null;

            function init() {
                if (navigator.userAgent.match(/Chrome/)) {
                    isChrome = true;
                } else if (navigator.userAgent.match(/Safari/)) {
                    isSafari = true;
                }
                hasDOMSubtreeModified = !isChrome && !isSafari;
                if (document.body) waitForReady();
            }
            // Wait for the dom ready

            function waitForReady() {
                if (unreadCountElement = document.getElementById('reading-list-unread-count')) {
                    if (hasDOMSubtreeModified) {
                        var res = document.evaluate("//span[contains(@class, 'unread-count') and contains(@class, 'sub-unread-count') and not(contains(@class, 'folder-unread-count'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        for (var i = 0; i < res.snapshotLength; i++) {
                            res.snapshotItem(i).parentNode.addEventListener('DOMSubtreeModified', modifySubtree, false);
                        }
                        window.addEventListener("DOMTitleChanged", calcUnread, false);
                    } else {
                        window.setInterval(calcUnread, 3000);
                    }
                    calcUnread();
                } else {
                    window.setTimeout(waitForReady, 500);
                }
            }

            function modifySubtree() {
                if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
                    calcUnread();
                }
            }

            function findItemUnread(checkDuplicated, item) {
                var hasplus = false;
                var count = 0;
                var alreadyCounted = false;
                var countres = item.innerHTML.match(/\((\d*)\+?\)/);
                if (countres) {
                    count = parseInt(countres[1], 10);
                    if (item.innerHTML.match(/\(1000\+\)/)) {
                        hasplus = true;
                    }
                    var nodeTitle = item.parentNode.getAttribute('title');
                    if (nodeTitle) {
                        if (checkDuplicated.indexOf(nodeTitle) < 0) {
                            checkDuplicated.push(nodeTitle);
                        } else {
                            alreadyCounted = true;
                        }
                    }
                }

                return {
                    count: count,
                    hasplus: hasplus,
                    alreadyCounted: alreadyCounted
                };
            }

            function calcUnread() {
                var checkDuplicated = [];
                var total = 0;
                var totalplus = false;
                var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var i = 0; i < res.snapshotLength; i++) {
                    var res2 = document.evaluate(".//li[contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    var subtotal = 0;
                    var subtotalplus = false;
                    for (var j = 0; j < res2.snapshotLength; j++) {
                        var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
                        if (result.hasplus) {
                            totalplus = true;
                            subtotalplus = true;
                        }
                        subtotal += result.count;
                        if (!result.alreadyCounted) {
                            total += result.count;
                        }
                    }
                    if (subtotal > 0) {
                        var resfolder = document.evaluate(".//a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        if (resfolder) {
                            resfolder.innerHTML = '(' + subtotal + (subtotalplus ? '+' : '') + ')';
                        }
                    }
                }

                // untagged items
                var res2 = document.evaluate("//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                for (var j = 0; j < res2.snapshotLength; j++) {
                    var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
                    if (result.hasplus) {
                        totalplus = true;
                    }
                    if (!result.alreadyCounted) {
                        total += result.count;
                    }
                }

                if (total > 0) {
                    var totaltext = total + (totalplus ? '+' : '');
                    unreadCountElement.innerHTML = ' (' + totaltext + ')';

                    // update windows title as well
                    if (totaltext) {
                        var newTitle = '(' + totaltext + ') ' + document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');;
                        if (document.title != newTitle) {
                            document.title = newTitle;
                        }
                    }
                }
            }

            init();

        })();
    }
    if (GM_config.get("enablePostPreviews")) {
        // Setup and enable previews

        function getFirstElementMatchingClassName(root, tag, classN) {
            var elements = root.getElementsByTagName(tag);
            var i = 0;
            while (elements[i] && !elements[i].className.match(classN)) {
                i++;
            }
            return ((!elements[i]) ? null : (elements[i]));
        }

        function getElementsByClassName(root, tag, classN) {
            var elements = root.getElementsByTagName(tag);
            var results = new Array();
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].className.indexOf(classN) > -1) {
                    results.push(elements[i]);
                }
            }
            return (results);
        }

        function findParentNode(el, tag, classN) {
            el = el.parentNode;
            if (arguments.length == 3) {
                // Find first element's parent node matching tag and className
                while (el.nodeName.toLowerCase() != 'body' && (el.nodeName.toLowerCase() != tag || (el.className != classN && el.className.indexOf(classN + ' ') == -1))) {
                    el = el.parentNode;
                }
                return ((el.nodeName.toLowerCase() != 'body') ? el : false);
            } else {
                // Find first element's parent node matching tag
                while (el.nodeName.toLowerCase() != 'body' && el.nodeName.toLowerCase() != tag) {
                    el = el.parentNode;
                }
                return ((el.nodeName.toLowerCase() != 'body') ? el : false);
            }
        }

        function addStyles(css) {
            var head = document.getElementsByTagName('head')[0];
            if (head) {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = css;
                head.appendChild(style);
            }
        }

        function catchEntryAdded(e) {
            var el = e.target;
            if (el.nodeName == 'DIV' && el.className.indexOf('entry') > -1) {
                if (el.className.indexOf('entry-actions') > -1) {
                    // Expanding article in list view
                    addPreviewButton(el);
                } else if (getFirstElementMatchingClassName(el, 'div', 'card-bottom')) {
                    // Adding article in expanded view
                    addPreviewButton(getFirstElementMatchingClassName(el, 'div', 'entry-actions'));
                }
            }
        }

        function addPreviewButton(el) {
            // Top link
            //var entry = findParentNode(el, 'div', 'entry');
            //var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
            //link.addEventListener('click', previewMouseClick, false);
            //link.addEventListener('click', function (e) {
            //    if (!e.ctrlKey) {
            //        previewMouseClick(e);
            //    }

            //}, false);
            // Bottom button
            var preview = document.createElement('span');
            preview.className = 'item-preview preview link';
            preview.innerHTML = 'Preview';
            el.appendChild(preview);
            preview.addEventListener('click', previewMouseClick, false);
        }

        function calcEntryIndex(e) {
            var index = 0;
            while (e.previousSibling) {
                index++;
                e = e.previousSibling;
            }
            return index;
        }

        function previewMouseClick(e) {
            var el = e.target;
            var entry = findParentNode(el, 'div', 'entry');

            var index = calcEntryIndex(entry);
            preview(entry, index);

            e.preventDefault();
        }

        function previewShortcut() {
            preview(document.getElementById('current-entry'))
        }

        function preview(entry) {
            var preview;

            // Update entry with preview mode, need to do it before scrolling, because scrolling will repaint preview button (list view only)
            if (entry.className.indexOf('preview') == -1) {
                entry.className = entry.className + ' preview';
                preview = true;
            } else {
                entry.className = entry.className.replace('preview', '');
                preview = false;
            }

            // Need to scroll before changing entry-body, because scrolling repaints article from scratch (list view only)
            scrollTo(entry);

            var body = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
            var entryBody = getFirstElementMatchingClassName(body, 'div', 'item-body');

            if (preview) {
                // classic mode-> preview mode
                // hide rss item
                entryBody.style.display = 'none';

                // iframe creation/display
                var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
                if (iframe) {
                    // iframe already in document, display it
                    iframe.style.display = 'block';
                } else {
                    // iframe not in document, create it
                    iframeHeight = (document.getElementById('viewer-container').clientHeight - entry.clientHeight - 7);
                    if (iframeHeight < 300) iframeHeight = 300;
                    iframe = document.createElement('iframe');
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('height', iframeHeight + 'px');
                    iframe.setAttribute('src', getFirstElementMatchingClassName(entry, 'a', 'entry-title-link'));
                    iframe.className = 'preview';
                    body.appendChild(iframe);
                }

                // Scale article container to fullwidth
                body.setAttribute('style', 'max-width: 98%');
                entry.scrollIntoView();
                GM_addStyle(".entry .entry-body, .entry .entry-title, .entry .entry-likers { max-width: 100% !important; }");
            } else {
                // preview mode -> classic mode
                // hide iframe
                var iframe = getFirstElementMatchingClassName(entry, 'iframe', 'preview');
                if (iframe) iframe.style.display = 'none';
                jQuery("iframe").remove();
                // show rss item
                entryBody.style.display = 'block';

                // Go back to initial width
                body.removeAttribute('style', '');
                GM_addStyle(".entry .entry-body, .entry .entry-title, .entry .entry-likers { max-width: 95% !important; }");
            }
        }

        function handleKeypress(e) {
            // Handle a Shift-V keypress
            if (e.target.nodeName.toLowerCase() != 'input' && e.shiftKey && e.keyCode == 86) {
                previewShortcut();
                e.preventDefault();
            }
        }

        function getEntryDOMObject(index) {
            // Because of repaint, entry doesn't point to correct DOM object, we need to find entry using index
            var entries = document.getElementById('entries');
            var i = 0;
            entry = entries.firstChild;
            while ((i++) < index) {
                entry = entry.nextSibling;
            }
            return entry;
        }

        function scrollTo(entry) {
            // Force scrolling to top of article
            try {
                // Navigate through DOM until reaching "entries" item, in order to compute current entry's top coordinate relative to entries'  container
                var top = 0;
                while (entry.id != 'entries') {
                    top += entry.offsetTop;
                    entry = entry.parentNode;
                }
                document.getElementById('entries').scrollTop = top;
            } catch (err) {}
        }

        function restyle() {
            // Overwrites Better GReader extension css modifications regarding entry-actions class.
            // Indeed, entry-actions was set to "float : right", thus div was not in document flow.
            // Then, clicking on preview button let entry actions div in place instead of going down automatically when iframe was added.
            // That's why I use here text-align: right. That has the same effect, but keeps div in document flow.
            // restyle() is called after document load, in order to ensure that Better GReader has already added its styles modifications
            var styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
            var i = 0;

            while (i < styles.length) {
                if (styles[i].innerHTML.indexOf('.entry-actions { float:right !important; }') > -1) {
                    styles[i].innerHTML = styles[i].innerHTML.replace('.entry-actions { float:right !important; }', '.entry-actions { text-align: right; !important; }');
                }
                i++;
            }
        }
        //new insert  url
        function init() {
            restyle();
            //addStyles('span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat; padding-left: 16px; margin-right: 16px; } div.entry.preview span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%A2%05%00%D8%D8%D8%DB%DB%DB%AD%AD%AD%CC%CC%CC%FE%9A%20%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%10%00%10%00%00%03%3BX%BA%DC%FE0%B60%AA%BDa%05%C1%BB%E7Y1%08Di%9E%C2%A0%8C%A6%D7%AA%22Y%CA2%91%AE%B5%3B%C3%EC%7C%EE%B8%D6%CF%C6%AB%0D%89%0A%C0g)%00h.%D0AHB%A5%26%00%00%3B") no-repeat; padding-left: 16px; margin-right: 16px; }');
        }

        document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
        document.addEventListener('keydown', handleKeypress, false);
        window.addEventListener('load', init, false);
    }
    if (GM_config.get("enablePurgePost")) {
        // Regularly purge elements from memory to speed up browsing experience
        var intPurgeTimeout = 5000; // set the timeout in ms to run the check for elements to purge

        function purgeRead() {
            var intPastRead = 10; // how many old elements to keep
            var objCurrent = document.getElementById('current-entry');
            if (objCurrent != undefined) {
                var intPast = 0;
                var objP = objCurrent;
                while (intPast <= intPastRead && objP != undefined) {
                    objP = objP.previousSibling;
                    intPast++;
                }
                while (objP != undefined) {
                    var arrClasses = objP.className.split(' ');
                    var intClasses = arrClasses.length;
                    var boolPurged = false;
                    var boolRead = false;
                    for (var i = 0; i < intClasses; i++) {
                        if (arrClasses[i] == 'read') {
                            boolRead = true;
                        }
                        if (arrClasses[i] == 'purged') {
                            boolPurged = true;
                        }
                    }
                    if (boolRead == true && boolPurged == false) {
                        console.log('Google Reader Skim Purge: Removing item with class of "' + objP.className + '"');
                        objP.className = objP.className + ' purged';
                        //var objRemoves = objP.childNodes;
                        var objRemoves = objP.getElementsByClassName('entry-body');
                        for (var i = objRemoves.length; i > 0; i--) {
                            objRemoves[i - 1].parentNode.style.height = objRemoves[i - 1].parentNode.clientHeight + 'px';

                            objRemoves[i - 1].innerHTML = 'Entry body removed by Google Reader Skim Purge';
                            objRemoves[i - 1].parentNode.removeChild(objRemoves[i - 1]);
                        }
                    }
                    objP = objP.previousSibling;
                }
            }
        }

        console.log('Google Reader Skim Purge: Initilizing purger to ' + intPurgeTimeout + ' millisecond interval.');
        setInterval(purgeRead, intPurgeTimeout);
    }
    if (GM_config.get("enableEnclosures")) {
        // Fix the image enclosure not displayed by Google Reader
        (function () {
            //object constructor

            function GoogleReaderFixer() {
                this.fixEnclosures();
            };
            GoogleReaderFixer.prototype.fixEnclosures = function () {
                var nodes, o, img, src;
                nodes = document.evaluate("//a[span[@class='view-enclosure']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                //alert('count='+nodes.snapshotLength);
                if (nodes) {
                    for (var i = 0; i < nodes.snapshotLength; i++) {
                        o = nodes.snapshotItem(i);
                        div = document.createElement('div');
                        div.className = "item-pict";
                        img = document.createElement('img');
                        div.appendChild(img);
                        img.src = o.href;
                        var p = o.parentNode.parentNode;
                        p.parentNode.replaceChild(div, p);
                    }
                }
            }
            //instantiate and run
            document.getElementById('entries').addEventListener('DOMNodeInserted', function () {
                new GoogleReaderFixer();
            }, true);
        })();
    }
    if (GM_config.get("enableReadItLater")) {
        // Enable 'Read It Later' integration
        (function () {

            var readItLaterIcon = "data:image/png;base64,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";
            
			var iconImg = "<img src=\"" + readItLaterIcon + "\" border=\"0px\" style=\"opacity: .3; height: 11px; width: 14px; padding: 0 2px 0 0; \" />Read It Later";
            var link = "https://readitlaterlist.com/edit?BL=1&title=jQuery{title}&url=jQuery{url}";
            var titleSelector = ":not(:has(span.read-it-later))";
            var a = "<a href=\"javascript:(function(){window.open(\'jQuery{link}\', \'_blank\', \'status=no,toolbar=no,width=320,height=220,resizable=yes\');})()\">jQuery{image}</a>";
            // add read it later coin
            setInterval(function () {
                jQuery(".entry-actions:not(:has(span.read-it-later))").each(function () {
                    var entry = jQuery(this);
                    var title_link = jQuery(this).parentsUntil('#entries').find('.entry-title-link');
                    var entry_title = title_link.text();
                    var url = jQuery(this).parentsUntil('#entries').find('.entry-title-link').attr('href');
                    var content = a.replace("jQuery{link}", link.replace("jQuery{title}", entry_title).replace("jQuery{url}", url)).replace("jQuery{image}", iconImg);
                    entry.append("<span class=\"read-it-later\">" + content + "</span>");
                    GM_addStyle(".read-it-later a { color: #444 !important; }");
                });
            }, 2000);
        })();


    }
    //entry  
    if (GM_config.get("enableFloatingControlPanel")){
    GM_addStyle(overrideCSS);
    //document.querySelector("#lhn-add-subscription-section").classList.add('hidden');
    document.querySelector("#chrome-viewer").classList.add('fullscreen');
    document.querySelector("#viewer-header").classList.add('hidden');
    document.querySelector("#chrome-fullscreen-top-toggle").classList.remove('hidden');
    }
}

GM_registerMenuCommand('Google Reader Sanity Config', function() {GM_config.open()});

jQuery.noConflict();
jQuery(document).bind('keydown', function (e) {
    // pressing 'shift z' will open the options config
    if (e.target.nodeName.toLowerCase() != 'input' && e.shiftKey && e.keyCode == 90) {
        GM_config.open();
    }
});

function ShowCustomizeDialog() {
    var settingsMenu = document.getElementById("cust-menu-item-inner").parentNode;
    settingsMenu.setAttribute("style", "display: none");
    GM_config.open();
}

function AddCustomizeMenu() {
    if (!document.getElementById("cust-menu-item-inner")) {
        var settingsMenu = document.getElementById(":5").parentNode;
        var newSeparator = settingsMenu.appendChild(document.createElement("div"));
        newSeparator.setAttribute("class", "goog-menuseparator");
        newSeparator.setAttribute("style", "-moz-user-select: none;");
        newSeparator.setAttribute("role", "separator");
        var customizeMenuItemOuter = settingsMenu.appendChild(document.createElement("div"));
        customizeMenuItemOuter.setAttribute("class", "goog-menuitem");
        customizeMenuItemOuter.setAttribute("role", "menuitem");
        customizeMenuItemOuter.setAttribute("style", "-moz-user-select: none;");
        customizeMenuItemOuter.setAttribute("id", "cust-menu-item-inner");
        customizeMenuItemOuter.addEventListener("mouseover", function () {
            this.setAttribute("class", "goog-menuitem goog-menuitem-highlight")
        }, false);
        customizeMenuItemOuter.addEventListener("mouseout", function () {
            this.setAttribute("class", "goog-menuitem")
        }, false);
        var customizeMenuItemInner = customizeMenuItemOuter.appendChild(document.createElement("div"));
        customizeMenuItemInner.setAttribute("class", "goog-menuitem-content");
        customizeMenuItemInner.setAttribute("id", "cust-menu-item-inner");
        customizeMenuItemInner.innerHTML = "Sanity Config";
        customizeMenuItemInner.addEventListener("click", ShowCustomizeDialog, false);
    }
}

settingsMenuButton = document.getElementById("settings-button");
settingsMenuButton.addEventListener("click", AddCustomizeMenu, false);
//GM_Config height and width
var cssDefault = "#GM_config { width: 430px !important; height: 430px !important; -webkit-border-radius: 35px; -moz-border-radius: 35px; border-radius: 35px; -moz-box-shadow: 4px 4px 14px #000; -webkit-box-shadow: 4px 4px 14px #000; box-shadow: 4px 4px 14px #000; }";
var cssGoogNav = "#gb { display: none !important; }";
var cssPostContainerHeader = "#title-and-status-holder { display: none !important; }";
var cssListView = ".card { -webkit-box-shadow: none !important; -moz-box-shadow: none !important; box-shadow: none !important; } \
.cust-favicon-div { margin: 1px 5px 0 0 !important; } \
.samedir #entries.list .collapsed .entry-secondary { margin: 0 8em 0 14em !important; } \
.samedir #entries.list .collapsed .entry-icons { left: .3em !important; } \
#entries.list .collapsed .entry-icons, #entries.list .collapsed .entry-main .entry-original { margin-top: 2px !important; } \
#entries.list .entry .collapsed { height: 21px !important; } \
#entries.list .collapsed .entry-source-title { line-height:21px !important; font-size: 8.5pt !important; } \
#entries.list .collapsed .entry-title { line-height:21px !important; font-size: 8.5pt !important; } \
#entries.list .collapsed .entry-date { line-height:21px !important; font-size: 8.5pt !important; } \
#entries.list .collapsed .snippet { line-height:21px !important; font-size: 8.5pt !important; } ";

applyFeatures();

// Auto update notification for Firefox browser
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
 
    //Add favicons to post titles in 'List View'

    const mainClass = "cust-favicon-div";
    const mainSingleClass = "cust-favicon-div-single";
    const mainClassCSS = "{float: left; width: 16px; height: 16px; margin: 5px 5px 0 0;}";
    const faviconBaseClass = "lespea-favicon-num";

    const googleFaviconClass = "favicon";
    const googleSubID = "sub-tree-container";
    const googleEntriesID = "entries";
    const googleInsertClass = "entry-source-title";
    const googleInsertParentClass = "entry-main";

    const fixHiddenCSS = ".samedir #entries.single-source .collapsed ." + mainSingleClass + "{margin-left: 2em !important;}" + ".samedir #entries.single-source .collapsed .entry-secondary{margin-left: 3.5em !important;}";

    var classIdFor = {};
    var curElement = 0;

    // function makeFaviconFor(url) {
        // var className = faviconBaseClass + curElement++;
        // var css = "." + className + "{background-image: " + url + ";}";
        // GM_addStyle(css);
        // return className;
    // }

    // function getIconFrom(node) {
        // if (node && node.style) {
            // var icon_url = node.style.backgroundImage;
            // var feed_name = document.getElementById(node.id.replace(/icon$/i, "name")).textContent;

            // var className = makeFaviconFor(icon_url);
            // classIdFor[feed_name] = className;
        // }
    // }

    // function addIcon(rootNode, faviconTemplate) {
        // var entries = rootNode.getElementsByClassName(googleInsertClass);
        // var i;
        // for (i in entries) {
            // var entry = entries[i];
            // if (entry.parentNode && entry.parentNode.className == googleInsertParentClass) {
                // if (entry.getElementsByClassName(faviconBaseClass).length == 0) {
                    // var node = faviconTemplate.cloneNode(false);
                    // var iconClass = classIdFor[entry.textContent];
                    // if (iconClass) {
                        // node.className += " " + iconClass;
                    // }

                    // var container = document.getElementById(googleEntriesID);
                    // var samedir = container.className.indexOf("single-source") != -1;
                    // if (container && samedir) {
                        // node.className += " " + mainSingleClass;
                        // entry.parentNode.insertBefore(node, entry);
                    // } else {
                        // entry.insertBefore(node, entry.firstChild);
                    // }
                // }
            // }
        // }
    // }

    // function setupWatcher(subContainer, icons) {
        // GM_log("Found " + icons.length + " favicons");

        // var icon;
        // for (icon in icons) {
            // getIconFrom(icons[icon]);
        // }

        // GM_addStyle("." + mainClass + mainClassCSS);
        // GM_addStyle(fixHiddenCSS);

        // var faviconTemplate = document.createElement('div');
        // faviconTemplate.className = mainClass;

        // var listener = {
            // handleEvent: function (evt) {
                // addIcon(evt.target, faviconTemplate);
            // }
        // }

        // document.getElementById(googleEntriesID).addEventListener("DOMNodeInserted", listener, false);
        // addIcon(document.getElementById(googleEntriesID));
    // }

   // function go() {
       // var subContainer = document.getElementById(googleSubID);
       // var icons = subContainer.getElementsByClassName(googleFaviconClass);
       // if (subContainer && icons.length > 0) {
           // setupWatcher(subContainer, icons);
       // } else {
           // var listener = {
               // handleEvent: function (evt) {
                   // subContainer = document.getElementById(googleSubID)
                   // icons = subContainer.getElementsByClassName(googleFaviconClass);
                   // if (subContainer && icons.length > 0) {
                       // document.removeEventListener("DOMNodeInserted", listener, false);
                       // setupWatcher(subContainer, icons);
                   // }
               // }
           // }
           // document.addEventListener("DOMNodeInserted", listener, false);
       // }
   // }
   // go();
}

(function () {
    var orig_button = jQuery('#entries-up');
    var new_button = orig_button.clone();
    new_button.attr('id', 'open-in-background').attr('title', 'Open item')
    orig_button.after(new_button);
    var click_open = function () {
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                var cur = jQuery('#current-entry');
                if (cur.length) {
                    GM_openInTab(cur.find('a.entry-title-link').attr('href'));
                }
            } else {
                href = jQuery("#current-entry a[class='entry-title-link']").attr("href");
                if (href) {
                    window.open(href);
                    window.focus();
                }
            }
        };
    new_button.click(click_open);
    //new insert
    GM_addStyle("#open-in-background .jfk-button-img { opacity: 0 !important; }");
    //GM_addStyle("#open-in-background { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAcCAYAAADr9QYhAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAAAd0SU1FB9sKHAA3CQ2JrloAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjlAPLDLAAAAr0lEQVRYR+2W0QnAIAxE2zFdwnnctu1JLUGq5vwxSALSn2t4uUTJGUI4zARgrBwzILlDVlxxmF4ntmjT9VSoOVSxlPgFwD8aEGio/JS4BXNVIWCp/JS450xK6UNaClNAyncZjAQBBGIJTA3yM9jUGFBiOTMxxuwCgDq3i8pPiesBBtDgmlP5KbHVd4YtQqVXicRLOmrL9E3yFWL7FYKdNZVeJWJXgVm9w7Scc2daztyYiHEp4NgupgAAAABJRU5ErkJggg==) !important; }");


    function key_open() {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            var cur = jQuery('#current-entry');
            if (cur.length) {
                GM_openInTab(cur.find('a.entry-title-link').attr('href'));
            }
        } else {
            href = jQuery("#current-entry a[class='entry-title-link']").attr("href");
            if (href) {
                window.open(href);
                window.focus();
            }
        }
    };

    jQuery(document).keydown(function (e) {
        element = e.target;
        if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
        tecla = String.fromCharCode(e.which).toLowerCase();
        if (tecla == "b") {
            key_open();
        }
    });

})();