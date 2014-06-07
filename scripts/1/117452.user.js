// ==UserScript==
// @author      Michael Mangino
// @name        Google Reader - Mark previous as read
// @namespace   http://mangino.net/greasemonkey
// @description Adds a button to Google Reader that marks items above the current item "as read".
// @include     https://www.google.com/reader*
// @include     http://www.google.com/reader*
// @icon        http://img94.imageshack.us/img94/8798/googlereadermarkpreviou.png
// @version     1.6
// ==/UserScript==


// The latest version of this script (and version history) can be found at http://userscripts.org/scripts/show/117452


/////////////////////////////////////////////////////////////////////////////
// C O N F I G U R A T I O N
/////////////////////////////////////////////////////////////////////////////

COLLAPSE_SELECTED_ITEM = false;


/////////////////////////////////////////////////////////////////////////////
// F U N C T I O N S
/////////////////////////////////////////////////////////////////////////////

function markPreviousItemsAsRead() {
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


/////////////////////////////////////////////////////////////////////////////
// M A I N
/////////////////////////////////////////////////////////////////////////////

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

// Adust the width and spacing of the buttons to provide more room for the new button
adjustHorizontalSpace();
