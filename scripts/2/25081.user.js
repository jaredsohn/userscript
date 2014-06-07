// ==UserScript==
// @author      Oscar Hierro
// @email	    oscahie@gmx.net
// @namespace	http://userscripts.org/
// @name		vBulletin Dev Tracker
// @description	A client side dev tracker for vBulletin forums where this feature is disabled
// @include     http://forum.mysite.com/*
// @version     0.93
// ==/UserScript==

/**
 * This script offers the possibility to have a custom Dev Tracker for your favourite
 * vBulletin based forum. You can see the latest posts of those forum users in your track
 * list with just a single mouse click.
 *
 * First of all you *must* edit the Included Pages list in Greasemonkey by going to the
 * 'Manage User Scripts' menu and adding the URL of the forum ending in an asterisk, like this:
 *
 *      http://forum.mysite.com/*   or   http://www.mysite.com/forum/*
 *
 * And obviously don't forget to edit the tracked users list! To do this, first navigate to the
 * forum and once there right click on the monkey's head (on the right side of the status bar
 * of you browser). Then select the following menu:
 *
 *      'User Scripts Commands' -> 'Edit Tracked Users list'
 *
 * And add the usernames you'd like to track. Remember to keep the names separated by commas.
 * Don't add too many names or the script's performance will drop and you might overload
 * the forum. 
 *
 * How it works is pretty simple: given a list of usernames to track, the script will run
 * a search in brackground to retrieve each user's latest posts. The results are
 * displayed all together in the same screen and sorted by posting date.
 *
 * A 'Dev Tracker' link is automatically added to the Search popup menu.
 *
 * Searchs are limited to posts from the last 24h, just to avoid overloading the forum/database.
 * 
 * Note: the script will not work well if the forum has some kind of search restrictions, like
 * when you have to wait X seconds between searches.
 *
 */

/** Force all links in results page to open in a new window/tab */
var openResultsInNewTab = true;

/** Search URL, you can modify it only if you know what you're doing - Do NOT change showposts param */
var searchURL = 'search.php?do=process&searchdate=1&showposts=1&exactname=1&searchuser=${username}';


/** Global vars, do not change! */
var LOG_LEVEL = 3;
var results = 0;
var searchResultsIndex = new Array();
var searchInProgress = new Array();
var usersTrackedList = new Array();
var currentForumId = 'unknown';
var timerId;


/** Logs messages to the Error Console */
function log(msg, level) {
    if (typeof(level) == 'undefined') {
        level = 0;
    }
    if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) {
        GM_log(msg);
    }
}

/** Performs XPath queries over the given DOM object */
function xpath(query, object) {
	if (typeof(object) == 'undefined') {
        object = document;
    }
    return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/** Performs XPath queries in the hidden div used to store search results temporarily */
function xpathDev(query, object) {
    return xpath("//div[@id='dev_tracker_div']" + query, object);
}

/** Creates a new Element and sets the content as innerHTML */
function elem(tag, content){
    var ret = document.createElement(tag);
    ret.innerHTML = content;
    return ret;
}

/** Removes trailing and ceiling spaces */
function TrimString(sInString) {
    sInString = sInString.replace(/^\s+/g, "");
    return sInString.replace(/\s+$/g, "");
}

/** Inserts a row at given table index */
function insertRow(table, rowIndex, cellContent) {
	try {
		var newRow = table.insertRow(rowIndex);
		var newCell = newRow.insertCell(0);
		newCell.appendChild(cellContent);
	} catch (ex) {}
}

/** Cusmtom strip function, just to disable javascript code. Is dirty, I know :) */
function stripScripts(text) {
    var re = /(<script[^><]*>)|(<\/script>)/g;
    return text.replace(re, "");
}

/** get sorted array as input and returns the same array without duplicates */
function removeDuplicates(arr) {
    var result = new Array();
    var lastValue = "";
    for (var i = 0; i < arr.length; i++) {
        var curValue = arr[i];
        if (curValue != lastValue)
        {
            result[result.length] = curValue;
        }
        lastValue = curValue;
    }
    return result;
}

/** Performs an AJAX get request */
function get(url, callback, options) {
	var httpRequest = new XMLHttpRequest();
    if (callback) {
		httpRequest.onreadystatechange = function() { callback(httpRequest, options); };
	}
    httpRequest.open("GET", url, true);
	httpRequest.send(null);
    
    log('GET ' + url, 3);
}

/** AJAX response handler - sends the results page to be parsed */
function handleSearchResult(httpRequest, username) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            var response = stripScripts(httpRequest.responseText);            
            var hiddenDiv = document.getElementById('dev_tracker_div');
            if (hiddenDiv) {
                // add search results to the DOM, parse them and remove
                var tempDiv = elem('div', response);
                hiddenDiv.appendChild(tempDiv);
                parseResultsPage(tempDiv, username);
                hiddenDiv.removeChild(tempDiv);

                // set this search as finished
                searchInProgress.pop(username);
            }
            else {
                log('ERROR: hidden div not found, can\'t store search results');
            }
        }
        else {
            log('Search for user ' + username + ' failed with error ' + httpRequest.status);
        }
    }
}

/** Parses search results page returned looking for posts */
function parseResultsPage(basedoc, username) {
    var postList = xpathDev("//table[contains(@id, 'post')]", basedoc);
    if (postList.snapshotLength > 0) {
        log('parsing results page, ' + postList.snapshotLength + ' items found for user ' + username, 3)
        for (var i = 0; i < postList.snapshotLength; i++) {
            addSearchResult(postList.snapshotItem(i));
        }
        results = results + postList.snapshotLength; // total counter
    }
    else {
        log('no results returned for user ' + username, 3);
    }
}

/** Adds a forum post to the list of results ordered by posting date */
function addSearchResult(postItem) {    
    if (openResultsInNewTab) {
        // set links top open in new window
        var anchors = postItem.getElementsByTagName('a');
        for (var i=0; i<anchors.length; i++) {
            anchors[i].setAttribute('target', '_blank');
        }
    }
    
    var container = document.getElementById('results_container');
    if (container) {
        try {
            var postDate = TrimString(postItem.getElementsByTagName('TD')[0].lastChild.nodeValue);
        }
        catch (err) {
            var postDate = 'Today, 00:00 AM';  // default value
        }
        var mtime = forumDateParser(postDate).getTime();
        searchResultsIndex.push(mtime);
        // sort list of key dates in desc order
        searchResultsIndex.sort();
        searchResultsIndex.reverse();

        // insert a new tow in the search result table
        var position = searchResultsIndex.indexOf(mtime);
        insertRow(container, position, postItem);
        //log('added search result: ' + postItem.innerHTML);
    }
}

/** Obtains a valid Date object from the String returned by vBulletin on search results */
function forumDateParser(forumDate) {
    var d = new Date();

    try {
        var date = TrimString(forumDate.split(',')[0]);
        var time = TrimString(forumDate.split(',')[1]);
        var hhmm = TrimString(time.split(' ')[0]);
        var ampm = TrimString(time.split(' ')[1]);
        var hour = TrimString(hhmm.split(':')[0]);
        var min = TrimString(hhmm.split(':')[1]);
        
        switch (date) {
            case 'Today': {
                break;
            }
            case 'Yesterday': {
                d.setDate(d.getDate() - 1);
                break;
            }
            default: { //format 03-08-2008                
                var day = parseInt(date.split('-')[1], 10);
                var month = parseInt(date.split('-')[0], 10);
                var year = parseInt(date.split('-')[2], 10);
                d.setDate(day);
                d.setMonth(month-1);
                d.setFullYear(year);
            }
        }

        // convert from AM/PM to 24h format
        if (ampm == 'AM') {
           if (hour == '12') hour = '00'; 
        }
        if (ampm == 'PM') {
            if (hour != '12') {
                hour = parseInt(hour, 10) + 12;
            }
        }

        if (hour != ''){
            d.setHours(hour);
        }
        if (min != '') {
            d.setMinutes(min);
        }        
    }
    catch (err) {
        log('Error parsing posting date: ' + err);
    }
    
    //log (date + "/" + time + "/" + hhmm + "/" + ampm + "/" + hour + "/" + min + " -> " + d.toLocaleString());
    return d;
}

/** Sets the given text in the devtracker_status div */
function setStatusText(text) {
    var status = document.getElementById('devtracker_status');
    if (status) {
        status.innerHTML = text;
    }
}

/** Adds a link to call the dev tracker in the search popup menu */
function insertDevTrackerLink() {
    var searchMenu = xpath("//div[@id='navbar_search_menu']//table").snapshotItem(0);
    if (searchMenu) {
        var link = elem("a", "Dev Tracker");
        link.href = 'search.php?devtracker';
        var newRow = searchMenu.insertRow(searchMenu.rows.length);
		var newCell = newRow.insertCell(0);
		newCell.appendChild(link);
        newCell.setAttribute('class', 'vbmenu_option vbmenu_option_alink');
    }
    else {
        log('ERROR: failed to setup dev tracker menu!');
    }
}

/** Removes the regular search form and prepares the screen to show Dev Tracker results */
function prepareResultsDiv() {
    var searchTable = xpath("//form[@id='searchform']/table").snapshotItem(0);

    if (searchTable) {
        // remove current table rows and set header
        var rows = searchTable.rows;
        for (var i=1; i<rows.length; i++) {
            searchTable.deleteRow(i);
        }
        var headerCell = rows[0].getElementsByTagName('TD')[0];
        headerCell.innerHTML = 'Dev Tracker &nbsp;&nbsp;[ <span id="devtracker_status" style="font-weight: normal">searching...</span> ]';

        // insert our own results table
        var container = document.createElement('table');
        container.setAttribute('id', 'results_container');
        container.setAttribute('width', '100%');
        container.setAttribute('cellspacing', '0');
        searchTable.parentNode.appendChild(container);

        var foot = searchTable.parentNode.getElementsByTagName('P')[0];
        searchTable.parentNode.removeChild(foot);
        searchTable.parentNode.appendChild(foot);

        // set up the hidden div to temp store results to be parsed
        var hiddenDiv = document.createElement('div');
        hiddenDiv.setAttribute('id', 'dev_tracker_div');
        hiddenDiv.setAttribute('style', 'display: none');
        document.body.appendChild(hiddenDiv);
    }
    else {
        log('ERROR: Failed to setup dev tracker results page');
    }
}

/** Checks whether all the searches have finished and if so display total results count */
function checkIfSearchFinished(startTime) {
    var now = new Date().getTime;
    var timeout = false;
    var finished = searchInProgress.length == 0;
    
    if (now > startTime + 15000) {
        log('Search timed out');
        timeout = true;
    }

    if (finished || timeout) {
        if (timerId) {
            clearInterval(timerId);
        }
        log('Search finished, took ' + ((now - startTime)/1000) + 'secs', 1);
        setStatusText('done, ' + results + ' results for ' + usersTrackedList.length + ' users tracked');
    }
}

/**
 * Performs the actual search for each developer listed
 */
function doDevTracker() {
    prepareResultsDiv();

    var startTime = new Date().getTime();
    
    log('Searching for tracked users posts...', 1);
    for (var i=0; i<usersTrackedList.length; i++) {
        var username = usersTrackedList[i];
        if (username.length != '') {
            var url = searchURL.replace('${username}', username)
            get(url, handleSearchResult, username);
            searchInProgress.push(username);
        }
    }
    
    // start timer to show results counter when all searches have finished
    timerId = setInterval(function() { checkIfSearchFinished(startTime); }, 1000);
}

/** Shows the menu that prompts the user for the list of usernames to track */
function editTrackedUsers() {
    var newList = prompt('Current list of usernames in track list (remember names have to be sepparated by commas)', usersTrackedList.join(','));
    if (newList != null) {
        // sort list and remove blank spaces and duplicates
        newList = newList.replace(/\s+/g, '');
        var listAsArray = newList.split(',').sort();
        listAsArray = removeDuplicates(listAsArray);

        // save list permanently
        GM_setValue(currentForumId + '_vb_dev_tracker_list', listAsArray.join(','));
        usersTrackedList = listAsArray;
        log('New list of tracked users: ' + newList, 1);
    }
}

/** Loads the list of tracked users from GM registry */
function loadTrackedUsersList() {
    var re = new RegExp("^http://([^\/]+)(\/.*)?$", "i");
    var domainName = re.exec(location.href)[1];
    if (domainName != '') {
        currentForumId = domainName;
    }

    var userList = GM_getValue(currentForumId + '_vb_dev_tracker_list', '').replace(/\s+/g, '');

    if (userList != '') {
        usersTrackedList = userList.split(',');
    }

    // register GM menu to edit list
    GM_registerMenuCommand("DevTracker: Edit Tracker Users list", editTrackedUsers);
}

/** Initializacion function */
function onLoad() {
    loadTrackedUsersList();
    insertDevTrackerLink();
    
    log('vBulletin Dev Tracker loaded for ' + currentForumId);
    
    if (location.href.match(/search\.php\?devtracker/)) {
        doDevTracker()
    }
}

window.addEventListener('load', onLoad, false);